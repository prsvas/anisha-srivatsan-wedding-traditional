/* Anisha & Srivatsan Wedding Invitation — FINAL EVENT ORDER FIX
   Changes:
   1) Sacred Wedding Ceremony (The Muhurtham): Kasi Yathra → Malai Maatral → Oonjal
   2) Sacred Traditions: Kasi Yathra → Malai Maatral → Oonjal → Kanyadanam...
   3) Renumbers the affected Sacred Traditions and Muhurtham rows automatically.
*/
(function () {
  "use strict";

  function textOf(el) {
    return (el && el.textContent || "").replace(/\s+/g, " ").trim();
  }

  function reorderMuhurtham() {
    const card = document.querySelector(".muhurtham-card");
    if (!card) return;

    const rows = Array.from(card.querySelectorAll(".muhurtham-row"));
    const beforeTitle = Array.from(card.querySelectorAll(".muhurtham-program-title"))
      .find(el => /BEFORE THE MUHURTHAM/i.test(textOf(el)));
    if (!beforeTitle) return;

    const divider = beforeTitle.nextElementSibling &&
      beforeTitle.nextElementSibling.nextElementSibling &&
      beforeTitle.nextElementSibling.nextElementSibling.nextElementSibling;

    // Find the first three ritual rows directly following BEFORE THE MUHURTHAM.
    const firstRows = rows.filter(row => {
      const n = parseInt((row.querySelector("b") || {}).textContent || "", 10);
      return n >= 1 && n <= 3;
    });

    if (firstRows.length < 3) return;

    const byName = name => firstRows.find(row => new RegExp(name, "i").test(textOf(row)));
    const kasi = byName("Kasi Yathra");
    const malai = byName("Malai Maatral");
    const oonjal = byName("Oonjal");

    if (!kasi || !malai || !oonjal) return;

    // Place them in the required order immediately after the section title.
    const anchor = beforeTitle;
    [kasi, malai, oonjal].forEach(row => anchor.parentNode.insertBefore(row, anchor.nextSibling));

    // Re-number all Muhurtham rows in sequence.
    Array.from(card.querySelectorAll(".muhurtham-row")).forEach((row, i) => {
      const b = row.querySelector("b");
      if (b) b.textContent = String(i + 1).padStart(2, "0");
    });
  }

  function reorderSacredTraditions() {
    const events = document.querySelector(".events");
    if (!events) return;

    const cards = Array.from(events.querySelectorAll(":scope > .event"));
    const kasi = cards.find(el => /Kasi Yathra/i.test(textOf(el)));
    const malai = cards.find(el => /Malai Maatral/i.test(textOf(el)));
    const oonjal = cards.find(el => /Oonjal/i.test(textOf(el)));

    if (!kasi || !malai || !oonjal) return;

    // Keep the existing visual alternation classes; only change the sequence.
    const firstEvent = cards[0];
    [kasi, malai, oonjal].forEach(el => events.insertBefore(el, firstEvent));

    // Restore correct numbering 01–12 after the reorder.
    Array.from(events.querySelectorAll(":scope > .event")).forEach((event, i) => {
      const number = event.querySelector(".event-number");
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
