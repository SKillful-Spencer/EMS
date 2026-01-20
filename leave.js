document.addEventListener("DOMContentLoaded", () => {
  const leaveForm = document.getElementById("leaveForm");

  leaveForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const reason = document.getElementById("reason").value.trim();

    const userId = localStorage.getItem("userId");
    const userRole = localStorage.getItem("userRole");

    if (!userId || userRole !== "employee") {
      alert("Access denied. Please log in as an employee.");
      window.location.href = "index.html";
      return;
    }

    if (!startDate || !endDate || !reason) {
      alert("Please fill in all fields.");
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      alert("End date cannot be earlier than start date.");
      return;
    }

    const leaveRequest = {
      id: Date.now(), // unique leave request ID
      employeeId: userId,
      startDate,
      endDate,
      reason,
      status: "pending",
      appliedAt: new Date().toISOString()
    };

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem("leaveApplications")) || [];
    existing.push(leaveRequest);
    localStorage.setItem("leaveApplications", JSON.stringify(existing));

    alert("Leave request submitted successfully!");
    leaveForm.reset();
  });
});
