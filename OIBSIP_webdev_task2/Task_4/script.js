function register() {
  let user = document.getElementById("regUser").value;
  let pass = document.getElementById("regPass").value;
  let pass2 = document.getElementById("regPass2").value;

  if (user === "" || pass === "") {
    alert("Please fill all fields!");
    return;
  }

  if (pass !== pass2) {
    alert("Passwords do not match!");
    return;
  }

  // Save to localStorage
  localStorage.setItem("username", user);
  localStorage.setItem("password", pass);

  alert("Registration successful!");
  window.location.href = "index.html";
}

function login() {
  let user = document.getElementById("loginUser").value;
  let pass = document.getElementById("loginPass").value;

  let storedUser = localStorage.getItem("username");
  let storedPass = localStorage.getItem("password");

  if (user === storedUser && pass === storedPass) {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "home.html";
  } else {
    alert("Incorrect username or password!");
  }
}

function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "index.html";
}

// Protect Secured Page
if (window.location.pathname.includes("home.html")) {
  if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "index.html";
  }
}
