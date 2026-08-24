/* Anisha & Srivatsan Wedding Invitation — FINAL EVENT ORDER FIX
   Required order:
   Kasi Yathra → Malai Maatral → Oonjal → Kanyadanam → ...

   Applies to BOTH:
   1) The Sacred Wedding Ceremony / Muhurtham card
   2) Sacred Traditions — images + headings + write-ups
*/
(function () {
  "use strict";

  const clean = el => (el?.textContent || "").replace(/\s+/g, " ").trim();

  function reorderMuhurtham() {
    const card = document.querySelector(".muhurtham-card");
    if (!card) return;

    const rows = Array.from(card.querySelectorAll(".muhurtham-row"));
    const find = name => rows.find(row => new RegExp(name, "i").test(clean(row)));

    const kasi = find("Kasi Yathra");
    const malai = find("Malai Maatral");
    const oonjal = find("Oonjal");
    if (!kasi || !malai || !oonjal) return;

    // Put the three pre-Muhurtham functions immediately after the
    // BEFORE THE MUHURTHAM heading, in the required order.
    const beforeTitle = Array.from(card.querySelectorAll(".muhurtham-program-title"))
      .find(el => /BEFORE THE MUHURTHAM/i.test(clean(el)));
    if (!beforeTitle) return;

    let anchor = beforeTitle;
    [kasi, malai, oonjal].forEach(row => {
      anchor.after(row);
      anchor = row;
    });

    // Renumber all Muhurtham rows continuously.
    card.querySelectorAll(".muhurtham-row").forEach((row, i) => {
      const number = row.querySelector("b");
      if (number) number.textContent = String(i + 1).padStart(2, "0");
    });
  }

  function reorderSacredTraditions() {
    const events = document.querySelector(".events");
    if (!events) return;

    const cards = Array.from(events.querySelectorAll(":scope > .event"));
    const find = name => cards.find(card => new RegExp(name, "i").test(clean(card)));

    const kasi = find("Kasi Yathra");
    const malai = find("Malai Maatral");
    const oonjal = find("Oonjal");
    if (!kasi || !malai || !oonjal) return;

    // Keep every other card in its original relative order, but replace
    // the first three positions with Kasi → Malai → Oonjal.
    const firstThree = cards.slice(0, 3);
    const reordered = [kasi, malai, oonjal];
    const moved = new Set(reordered);
    const remaining = cards.filter(card => !moved.has(card));
    const finalOrder = [...reordered, ...remaining];

    finalOrder.forEach(card => events.appendChild(card));

    // Preserve the alternating visual layout after the reorder:
    // 1st left image, 2nd right image, 3rd left image, etc.
    finalOrder.forEach((card, i) => {
      card.classList.toggle("reverse", i % 2 === 1);
      const number = card.querySelector(".event-number");
      if (number) number.textContent = String(i + 1).padStart(2, "0");
    });
  }

  function apply() {
    reorderMuhurtham();
    reorderSacredTraditions();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply, { once: true });
  } else {
    apply();
  }
})();
