/* FINAL DIRECT HTML ORDER FIX
   Use only if you do not replace index.html directly.
   Required:
   Kasi Yathra -> Malai Maatral -> Oonjal
*/
(function () {
  function reorder() {
    const events = document.querySelector('.events');
    if (!events) return;

    const card = name => Array.from(events.children).find(x =>
      x.matches('.event') && x.querySelector('h3') &&
      x.querySelector('h3').textContent.trim().toLowerCase() === name.toLowerCase()
    );

    const kasi = card('Kasi Yathra');
    const malai = card('Malai Maatral');
    const oonjal = card('Oonjal');

    if (kasi && malai && oonjal) {
      events.insertBefore(kasi, events.firstElementChild);
      events.insertBefore(malai, kasi.nextElementSibling);
      events.insertBefore(oonjal, malai.nextElementSibling);

      Array.from(events.children).filter(x => x.matches('.event')).forEach((x,i) => {
        const n=x.querySelector('.event-number');
        if(n)n.textContent=String(i+1).padStart(2,'0');
        x.classList.toggle('reverse', i%2===1);
      });
    }

    const mc = document.querySelector('.muhurtham-card');
    if (!mc) return;
    const rows = Array.from(mc.querySelectorAll('.muhurtham-row'));
    const row = name => rows.find(x => x.textContent.toLowerCase().includes(name.toLowerCase()));
    const heading = Array.from(mc.querySelectorAll('.muhurtham-program-title'))
      .find(x => x.textContent.trim().toLowerCase() === 'before the muhurtham');

    const a=row('Kasi Yathra'), b=row('Malai Maatral'), c=row('Oonjal');
    if (heading && a && b && c) {
      heading.after(a,b,c);
      [a,b,c].forEach((x,i)=>{const n=x.querySelector('b');if(n)n.textContent=String(i+1).padStart(2,'0')});
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',reorder);
  else reorder();
})();
