const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email exists" });

    const hashed = await bcrypt.hash(password, 10);
    const token = crypto.randomBytes(32).toString("hex");

    await User.create({
      name,
      email,
      password: hashed,
      role: role || "user",
      verificationToken: token
    });

    await sendEmail(
      email,
      "Verify Email",
      `http://localhost:5173/verify/${token}`
    );

    res.json({ message: "Registered. Verify email." });
  } catch (err) {
    res.status(500).json({ message: "Register failed" });
  }
};

exports.verifyEmail = async (req, res) => {
  const user = await User.findOne({ verificationToken: req.params.token });
  if (!user) return res.status(400).send("Invalid token");

  user.isVerified = true;
  user.verificationToken = null;
  await user.save();

  res.send("Email verified");
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  if (!user.isVerified)
    return res.status(401).json({ message: "Email not verified" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Wrong password" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token, role: user.role });
};

exports.forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const token = crypto.randomBytes(32).toString("hex");
  user.resetToken = token;
  await user.save();

  await sendEmail(
    user.email,
    "Reset Password",
    `http://localhost:5173/reset/${token}`
  );

  res.json({ message: "Reset link sent" });
};

exports.resetPassword = async (req, res) => {
  const user = await User.findOne({ resetToken: req.params.token });
  if (!user) return res.status(400).json({ message: "Invalid token" });

  user.password = await bcrypt.hash(req.body.password, 10);
  user.resetToken = null;
  await user.save();

  res.json({ message: "Password reset success" });
};
