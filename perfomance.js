document.addEventListener("DOMContentLoaded", () => {
  // Verify admin role
  const role = localStorage.getItem("userRole");
  if (!role || role !== "admin") {
    alert("Access denied. Admins only.");
    window.location.href = "index.html";
    return;
  }

  // Logout button
  const logoutBtn = document.getElementById("logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.clear();
      window.location.href = "index.html";
    });
  }

  const employees = JSON.parse(localStorage.getItem("employees")) || [];

  const container = document.getElementById("performanceReport");

  if (employees.length === 0) {
    container.innerHTML = "<p>No employee data available.</p>";
    return;
  }

  // Calculate average performance and total hours
  const totalPerformance = employees.reduce((sum, emp) => sum + Number(emp.performance || 0), 0);
  const totalHours = employees.reduce((sum, emp) => sum + Number(emp.hoursWorked || 0), 0);
  const avgPerformance = (totalPerformance / employees.length).toFixed(2);

  // Build HTML report
  let html = `
    <h2>Performance Summary</h2>
    <p><strong>Average Performance Score:</strong> ${avgPerformance}</p>
    <p><strong>Total Hours Worked by All Employees:</strong> ${totalHours}</p>

    <h3>Employee Performance Details</h3>
    <table border="1" cellpadding="8" cellspacing="0">
      <thead>
        <tr>
          <th>ID</th><th>Name</th><th>Department</th><th>Role</th><th>Performance</th><th>Hours Worked</th>
        </tr>
      </thead>
      <tbody>
  `;

  employees.forEach(emp => {
    html += `
      <tr>
        <td>${emp.id}</td>
        <td>${emp.name}</td>
        <td>${emp.department}</td>
        <td>${emp.role}</td>
        <td>${emp.performance || "N/A"}</td>
        <td>${emp.hoursWorked || 0}</td>
      </tr>
    `;
  });

  html += "</tbody></table>";

  container.innerHTML = html;
});
