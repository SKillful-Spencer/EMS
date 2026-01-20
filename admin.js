document.addEventListener("DOMContentLoaded", () => {
  const role = localStorage.getItem("userRole");

  // Check if user is admin, otherwise redirect
  if (!role || role !== "admin") {
    alert("Access denied. Admins only.");
    window.location.href = "index.html";
    return;
  }

  // Logout handler
  const logoutBtn = document.getElementById("logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.clear();
      window.location.href = "index.html";
    });
  }

  // Optional: You can add more admin-specific JS here if needed
});
