let draggedCardId = null;

function qs(sel, root = document) {
  return root.querySelector(sel);
}
function qsa(sel, root = document) {
  return Array.from(root.querySelectorAll(sel));
}

function updateBadges() {
  qsa(".kanban-col").forEach((col) => {
    const body = qs(".kanban-col-body[data-list-id]", col);
    const badge = qs(".count-badge", col);
    if (!body || !badge) return;

    const count = qsa(".task-card", body).length;
    badge.textContent = count;
  });
}

function ensureEmptyPlaceholder(zone) {
  const hasCards = qsa(".task-card", zone).length > 0;
  const existingEmpty = qs(".empty-col", zone);

  if (hasCards) {
    // Si ya hay cards, el placeholder sobra
    if (existingEmpty) existingEmpty.remove();
  } else {
    // Si no hay cards, debe existir placeholder
    if (!existingEmpty) {
      const div = document.createElement("div");
      div.className = "empty-col text-muted small";
      div.textContent = "Sin tareas por ahora.";
      zone.appendChild(div);
    }
  }
}

function refreshEmptyPlaceholders() {
  qsa(".kanban-col-body[data-list-id]").forEach(ensureEmptyPlaceholder);
}

function attachDnD() {
  // Cards draggable
  qsa(".task-card[draggable='true']").forEach((card) => {
    card.addEventListener("dragstart", (e) => {
      draggedCardId = card.dataset.cardId;
      card.classList.add("dragging");
      e.dataTransfer.effectAllowed = "move";
    });

    card.addEventListener("dragend", () => {
      card.classList.remove("dragging");
      draggedCardId = null;
      qsa(".kanban-col-body").forEach((z) =>
        z.classList.remove("drop-highlight"),
      );
    });
  });

  // Dropzones
  qsa(".kanban-col-body[data-list-id]").forEach((zone) => {
    zone.addEventListener("dragover", (e) => {
      e.preventDefault();
      zone.classList.add("drop-highlight");
      e.dataTransfer.dropEffect = "move";
    });

    zone.addEventListener("dragleave", () => {
      zone.classList.remove("drop-highlight");
    });

    zone.addEventListener("drop", async (e) => {
      e.preventDefault();
      zone.classList.remove("drop-highlight");

      if (!draggedCardId) return;

      const toListId = zone.dataset.listId;
      const cardEl = qs(`[data-card-id="${draggedCardId}"]`);
      if (!cardEl) return;

      // Detectar columna origen (antes de mover)
      const fromZone = cardEl.closest(".kanban-col-body[data-list-id]");

      // 1) Mover en DOM instantáneo
      zone.prepend(cardEl);

      // 2) Actualizar placeholders + contadores
      ensureEmptyPlaceholder(zone);
      if (fromZone && fromZone !== zone) ensureEmptyPlaceholder(fromZone);
      updateBadges();

      // 3) Guardar en servidor
      try {
        const resp = await fetch("/tareas/mover", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cardId: draggedCardId, toListId }),
        });

        const result = await resp.json();

        if (!result.ok) {
          alert(
            result.message ||
              "No se pudo guardar el movimiento. Se recargará la página.",
          );
          location.reload();
        }
      } catch (err) {
        alert(
          "Error de red. Se recargará la página para evitar inconsistencias.",
        );
        location.reload();
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  attachDnD();
  updateBadges();
  refreshEmptyPlaceholders(); // deja consistente el estado inicial
});
