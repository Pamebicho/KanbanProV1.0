(() => {
  const btn = document.getElementById("sidebarToggle");
  if (!btn) return;

  // Overlay
  let overlay = document.querySelector(".sidebar-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "sidebar-overlay";
    document.body.appendChild(overlay);
  }

  const closeSidebar = () => document.body.classList.remove("sidebar-open");
  const toggleSidebar = () => document.body.classList.toggle("sidebar-open");

  btn.addEventListener("click", toggleSidebar);
  overlay.addEventListener("click", closeSidebar);

  // Cerrar con ESC
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSidebar();
  });

  // Si cambia a escritorio, limpiar estado
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) closeSidebar();
  });
})();
