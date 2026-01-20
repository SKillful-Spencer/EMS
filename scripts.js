document.addEventListener("DOMContentLoaded", () => {
  fetch("data/employees.json")
    .then(response => response.json())
    .then(data => renderEmployees(data))
    .catch(error => console.error("Error loading employee data:", error));
});

function renderEmployees(employees) {
  const tableBody = document.querySelector("#employee-table tbody");
  tableBody.innerHTML = ""; // Clear any existing data

  employees.forEach(emp => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${emp.id}</td>
      <td>${emp.name}</td>
      <td>${emp.department}</td>
      <td>${emp.role}</td>
      <td>${emp.doj}</td>
      <td>${emp.performance}</td>
      <td>${emp.hoursWorked}</td>
    `;

    tableBody.appendChild(row);
  });
}
let employees = []; // global array

document.addEventListener("DOMContentLoaded", () => {
  fetch("data/employees.json")
    .then(res => res.json())
    .then(data => {
      employees = data;
      renderEmployees(employees);
    })
    .catch(err => console.error("Error loading JSON:", err));

  document.getElementById("employee-form").addEventListener("submit", addEmployee);
});

function renderEmployees(employeeList) {
  const tbody = document.querySelector("#employee-table tbody");
  tbody.innerHTML = "";

  employeeList.forEach(emp => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${emp.id}</td>
      <td>${emp.name}</td>
      <td>${emp.department}</td>
      <td>${emp.role}</td>
      <td>${emp.doj}</td>
      <td>${emp.performance}</td>
      <td>${emp.hoursWorked}</td>
    `;
    tbody.appendChild(row);
  });
}

function addEmployee(e) {
  e.preventDefault();

  const newEmployee = {
    id: document.getElementById("emp-id").value.trim(),
    name: document.getElementById("emp-name").value.trim(),
    department: document.getElementById("emp-dept").value.trim(),
    role: document.getElementById("emp-role").value.trim(),
    doj: document.getElementById("emp-doj").value,
    performance: parseFloat(document.getElementById("emp-performance").value),
    hoursWorked: parseInt(document.getElementById("emp-hours").value)
  };

  employees.push(newEmployee);       // Add to in-memory array
  renderEmployees(employees);        // Re-render the table

  e.target.reset(); // Clear the form
}

let leaves = []; // Store leave applications

// Handle Leave Form
document.getElementById("leave-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const newLeave = {
    employeeId: document.getElementById("leave-emp-id").value.trim(),
    fromDate: document.getElementById("leave-from").value,
    toDate: document.getElementById("leave-to").value,
    status: document.getElementById("leave-status").value
  };

  leaves.push(newLeave);
  renderLeaves(leaves);
  checkUpcomingLeaves(); // Show alerts if any
  e.target.reset();
});

// Render Leave Table
function renderLeaves(leaveList) {
  const tbody = document.querySelector("#leave-table tbody");
  tbody.innerHTML = "";

  leaveList.forEach(leave => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${leave.employeeId}</td>
      <td>${leave.fromDate}</td>
      <td>${leave.toDate}</td>
      <td>${leave.status}</td>
    `;
    tbody.appendChild(row);
  });
}

// Notify for upcoming leaves (next 3 days)
function checkUpcomingLeaves() {
  const today = new Date();

  leaves.forEach(leave => {
    const from = new Date(leave.fromDate);
    const diffDays = (from - today) / (1000 * 60 * 60 * 24);

    if (diffDays >= 0 && diffDays <= 3 && leave.status === "Approved") {
      alert(`Reminder: Employee ${leave.employeeId} is going on leave soon (${leave.fromDate})`);
    }
  });
}

// Update the summary stats
function updateSummary(employeesList) {
  const totalEmployees = employeesList.length;
  const avgPerformance = (
    employeesList.reduce((sum, emp) => sum + emp.performance, 0) / (totalEmployees || 1)
  ).toFixed(2);

  const totalHours = employeesList.reduce((sum, emp) => sum + emp.hoursWorked, 0);

  document.getElementById("total-employees").textContent = totalEmployees;
  document.getElementById("avg-performance").textContent = avgPerformance;
  document.getElementById("total-hours").textContent = totalHours;
}

// Filter employees by department
function filterByDepartment(dept) {
  return dept ? employees.filter(emp => emp.department === dept) : employees;
}

// Sort employees by performance
function sortByPerformance(list, order) {
  if (!order) return list;

  return [...list].sort((a, b) =>
    order === "asc" ? a.performance - b.performance : b.performance - a.performance
  );
}

// Event listeners for filter and sort
document.getElementById("filter-dept").addEventListener("change", function () {
  const dept = this.value;
  const sortedOrder = document.getElementById("sort-performance").value;
  let filtered = filterByDepartment(dept);
  filtered = sortByPerformance(filtered, sortedOrder);
  renderEmployees(filtered);
  updateSummary(filtered);
});

document.getElementById("sort-performance").addEventListener("change", function () {
  const order = this.value;
  const dept = document.getElementById("filter-dept").value;
  let filtered = filterByDepartment(dept);
  filtered = sortByPerformance(filtered, order);
  renderEmployees(filtered);
  updateSummary(filtered);
});

// Update summary after employees are initially loaded or updated
function onEmployeesUpdate() {
  const dept = document.getElementById("filter-dept").value;
  const order = document.getElementById("sort-performance").value;
  let filtered = filterByDepartment(dept);
  filtered = sortByPerformance(filtered, order);
  renderEmployees(filtered);
  updateSummary(filtered);
}

// Replace renderEmployees call in initial fetch and after adding employee:
fetch("data/employees.json")
  .then(res => res.json())
  .then(data => {
    employees = data;
    onEmployeesUpdate();
  })
  .catch(err => console.error("Error loading JSON:", err));

// After adding a new employee, call onEmployeesUpdate() instead of renderEmployees()
function addEmployee(e) {
  e.preventDefault();

  const newEmployee = {
    id: document.getElementById("emp-id").value.trim(),
    name: document.getElementById("emp-name").value.trim(),
    department: document.getElementById("emp-dept").value.trim(),
    role: document.getElementById("emp-role").value.trim(),
    doj: document.getElementById("emp-doj").value,
    performance: parseFloat(document.getElementById("emp-performance").value),
    hoursWorked: parseInt(document.getElementById("emp-hours").value)
  };

  employees.push(newEmployee);
  onEmployeesUpdate();

  e.target.reset();
}
