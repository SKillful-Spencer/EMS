document.addEventListener("DOMContentLoaded", () => {
  const role = localStorage.getItem("userRole");
  const userId = localStorage.getItem("userId");

  // Ensure only employees access this page
  if (!role || role !== "employee" || !userId) {
    alert("Access denied. Please log in as an employee.");
    window.location.href = "index.html";
    return;
  }

  const employees = JSON.parse(localStorage.getItem("employees")) || [];
  const employee = employees.find(emp => emp.id === userId);

  if (!employee) {
    alert("Employee data not found.");
    window.location.href = "index.html";
    return;
  }

  // Display employee name
  document.getElementById("employeeName").textContent = employee.name;

  // Logout function (if your HTML has an element with id="logout")
  const logoutBtn = document.getElementById("logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.clear();
      window.location.href = "index.html";
    });
  }
});
