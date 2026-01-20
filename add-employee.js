document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("employeeForm");
  const listContainer = document.getElementById("employeeListContainer");

  // Render all employees in a table
  function renderEmployeeList() {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];

    if (employees.length === 0) {
      listContainer.innerHTML = "<p>No employees added yet.</p>";
      return;
    }

    let tableHTML = `
      <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
        <thead style="background-color:#f0f0f0;">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Role</th>
            <th>Joining Date</th>
            <th>Performance</th>
            <th>Hours Worked</th>
          </tr>
        </thead>
        <tbody>
    `;

    employees.forEach(emp => {
      tableHTML += `
        <tr>
          <td>${emp.id}</td>
          <td>${emp.name}</td>
          <td>${emp.department}</td>
          <td>${emp.role}</td>
          <td>${emp.joining}</td>
          <td>${emp.performance}</td>
          <td>${emp.hoursWorked}</td>
        </tr>
      `;
    });

    tableHTML += "</tbody></table>";
    listContainer.innerHTML = tableHTML;
  }

  // Form submission handler
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const id = document.getElementById("id").value.trim();
    const name = document.getElementById("name").value.trim();
    const department = document.getElementById("department").value.trim();
    const role = document.getElementById("role").value.trim();
    const joining = document.getElementById("joining").value;
    const performance = parseInt(document.getElementById("performance").value);
    const hours = parseInt(document.getElementById("hours").value);

    if (!id || !name || !department || !role || !joining || isNaN(performance) || isNaN(hours)) {
      alert("Please fill in all fields correctly.");
      return;
    }

    const employee = {
      id,
      name,
      department,
      role,
      joining,
      performance,
      hoursWorked: hours
    };

    let employees = JSON.parse(localStorage.getItem("employees")) || [];

    const duplicate = employees.find(emp => emp.id === id);
    if (duplicate) {
      alert("Employee ID already exists.");
      return;
    }

    employees.push(employee);
    localStorage.setItem("employees", JSON.stringify(employees));
    alert("Employee added successfully!");
    form.reset();
    renderEmployeeList();
  });

  // Initial load
  renderEmployeeList();
});
