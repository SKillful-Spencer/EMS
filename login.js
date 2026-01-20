document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const idInput = document.getElementById("username").value.trim();
  const nameInput = document.getElementById("password").value.trim(); // using this field for name
  const role = document.getElementById("role").value;

  if (role === "admin") {
    if (idInput === "admin" && nameInput === "admin123") {
      localStorage.setItem("userRole", "admin");
      localStorage.setItem("userId", "admin01");
      window.location.href = "admin.html";
    } else {
      showError("Invalid admin credentials");
    }
  } else if (role === "employee") {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];

    const match = employees.find(emp =>
      emp.id === idInput && emp.name.toLowerCase() === nameInput.toLowerCase()
    );

    if (match) {
      localStorage.setItem("userRole", "employee");
      localStorage.setItem("userId", match.id);
      window.location.href = "employee.html";
    } else {
      showError("Invalid Employee ID or Name");
    }
  } else {
    showError("Please select a role");
  }
});

function showError(msg) {
  document.getElementById("error-msg").textContent = msg;
}
