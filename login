<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Login - Inventaris Barang</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Inter', sans-serif;
    }
    body {
      background-color: #fefae0;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
    .login-container {
      background-color: #fff8e1;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 400px;
    }
    h2 {
      text-align: center;
      color: #4e342e;
      margin-bottom: 20px;
    }
    input {
      width: 100%;
      padding: 12px;
      margin-bottom: 16px;
      border: 1px solid #d7ccc8;
      border-radius: 5px;
    }
    button {
      width: 100%;
      padding: 12px;
      background-color: #8d6e63;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    button:hover {
      background-color: #6d4c41;
    }
    .error {
      color: red;
      font-size: 14px;
      margin-bottom: 10px;
      display: none;
    }
  </style>
</head>
<body>
  <div class="login-container">
    <h2>Login Admin</h2>
    <div class="error" id="errorMsg">Username atau password salah!</div>
    <input type="text" id="username" placeholder="Username">
    <input type="password" id="password" placeholder="Password">
    <button onclick="login()">Login</button>
  </div>

  <script>
    function login() {
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const error = document.getElementById("errorMsg");

      // Ganti dengan username dan password sesuai kebutuhan
      if (username === "admin" && password === "12345") {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "dashboard.html"; // ubah ke nama file dashboard kamu
      } else {
        error.style.display = "block";
      }
    }
  </script>
</body>
</html>
