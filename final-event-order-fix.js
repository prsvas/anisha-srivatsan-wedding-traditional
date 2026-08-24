/* FINAL FIX — DO NOT CHANGE EVENT CONTENT, ONLY ORDER IT.
   Required order:
   Sacred Traditions: Kasi Yathra → Malai Maatral → Oonjal → Kanyadanam → ...
   Muhurtham:         Kasi Yathra → Malai Maatral → Oonjal → Kanyadanam → ...
*/
(function () {
  'use strict';

  const wanted = [
    'Kasi Yathra',
    'Malai Maatral',
    'Oonjal',
    'Kanyadanam',
    'Mangalya Dharanam',
    'Sapthapadi',
    'Ammi Midhithal',
    'Metti Dharanam',
    'Arundhati Darshan',
    'Asirvadam',
    'Traditional Tamil Iyer Bhojanam',
    'Nelangu'
  ];

  function norm(s) {
    return (s || '').replace(/\s+/g, ' ').trim().toLowerCase();
  }

  function fixSacredTraditions() {
    const events = document.querySelector('.events');
    if (!events) return false;

    const cards = Array.from(events.children).filter(el => el.classList.contains('event'));
    if (cards.length < 3) return false;

    const map = new Map();
    cards.forEach(card => {
      const h = card.querySelector('h3');
      if (h) map.set(norm(h.textContent), card);
    });

    // Rebuild the event sequence physically. This moves each complete
    // image + heading + description card together.
    let previous = null;
    wanted.forEach((name, index) => {
      const card = map.get(norm(name));
      if (!card) return;
      if (previous) previous.after(card);
      else events.insertBefore(card, events.firstElementChild);
      previous = card;

      const number = card.querySelector('.event-number');
      if (number) number.textContent = String(index + 1).padStart(2, '0');

      // Alternate layout according to the new order.
      card.classList.toggle('reverse', index % 2 === 1);
    });

    return true;
  }

  function fixMuhurtham() {
    const card = document.querySelector('.muhurtham-card');
    if (!card) return false;

    const rows = Array.from(card.querySelectorAll('.muhurtham-row'));
    const map = new Map();

    rows.forEach(row => {
      const text = norm(row.textContent);
      wanted.forEach(name => {
        if (text.includes(norm(name))) map.set(norm(name), row);
      });
    });

    const heading = Array.from(card.querySelectorAll('.muhurtham-program-title'))
      .find(el => norm(el.textContent).includes('before the muhurtham'));

    if (!heading) return false;

    // Only reorder the three pre-Muhurtham ceremonies here.
    const firstThree = wanted.slice(0, 3).map(name => map.get(norm(name))).filter(Boolean);
    if (firstThree.length !== 3) return false;

    firstThree.forEach((row, i) => {
      const b = row.querySelector('b');
      if (b) b.textContent = String(i + 1).padStart(2, '0');
    });

    // Place them directly after BEFORE THE MUHURTHAM.
    let anchor = heading;
    firstThree.forEach(row => {
      anchor.after(row);
      anchor = row;
    });

    return true;
  }

  function apply() {
    fixSacredTraditions();
    fixMuhurtham();
  }

  // Run repeatedly for a short period because the invitation may populate
  // or modify sections after initial DOM load.
  function start() {
    apply();
    let count = 0;
    const timer = setInterval(function () {
      apply();
      if (++count >= 20) clearInterval(timer);
    }, 250);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
