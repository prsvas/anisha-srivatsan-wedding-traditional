/* ANISHA & SRIVATSAN — FINAL EVENT ORDER FIX
   Correct order: Kasi Yathra -> Malai Maatral -> Oonjal
*/
(function () {
  function fixWeddingOrder() {
    // 1) Sacred Traditions: physically reorder the existing cards.
    const events = document.querySelector('.events');
    if (events) {
      const cards = Array.from(events.querySelectorAll(':scope > .event'));
      const byTitle = title => cards.find(card => {
        const h = card.querySelector('h3');
        return h && h.textContent.trim().toLowerCase() === title.toLowerCase();
      });

      const kasi = byTitle('Kasi Yathra');
      const malai = byTitle('Malai Maatral');
      const oonjal = byTitle('Oonjal');

      if (kasi && malai && oonjal) {
        // Place Oonjal immediately after Malai Maatral.
        events.insertBefore(oonjal, malai.nextSibling);

        // Ensure the first three are exactly Kasi, Malai, Oonjal.
        events.insertBefore(kasi, events.firstElementChild);
        events.insertBefore(malai, kasi.nextSibling);
        events.insertBefore(oonjal, malai.nextSibling);

        // Renumber all cards in their final DOM order.
        Array.from(events.querySelectorAll(':scope > .event')).forEach((card, i) => {
          const n = card.querySelector('.event-number');
          if (n) n.textContent = String(i + 1).padStart(2, '0');
        });

        // Preserve alternating image/text layout after reorder.
        Array.from(events.querySelectorAll(':scope > .event')).forEach((card, i) => {
          card.classList.toggle('reverse', i % 2 === 1);
        });
      }
    }

    // 2) Muhurtham: replace the displayed programme rows with the exact order.
    const card = document.querySelector('.muhurtham-card');
    if (card) {
      const rows = Array.from(card.querySelectorAll('.muhurtham-row'));
      const findRow = name => rows.find(row =>
        row.textContent.toLowerCase().includes(name.toLowerCase())
      );

      const kasi = findRow('Kasi Yathra');
      const malai = findRow('Malai Maatral');
      const oonjal = findRow('Oonjal');

      if (kasi && malai && oonjal) {
        const title = card.querySelector('.muhurtham-program-title');
        if (title) {
          // Move the three rows immediately after BEFORE THE MUHURTHAM title.
          title.after(kasi, malai, oonjal);
        }
        [kasi, malai, oonjal].forEach((row, i) => {
          const b = row.querySelector('b');
          if (b) b.textContent = String(i + 1).padStart(2, '0');
        });
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixWeddingOrder);
  } else {
    fixWeddingOrder();
  }
})();
