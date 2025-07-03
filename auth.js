// Data login yang disimpan manual
const userData = {
  username: "admin",
  password: "123456"
};

document.getElementById("form-login").addEventListener("submit", function (e) {
  e.preventDefault();
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === userData.username && pass === userData.password) {
    // simpan status login
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "index.html"; // masuk ke inventaris
  } else {
    document.getElementById("error-msg").textContent = "Username atau password salah!";
  }
});
