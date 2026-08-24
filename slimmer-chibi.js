/* FINAL LIVE ORDER FIX — loaded by the existing index.html */
document.addEventListener("DOMContentLoaded", function () {
  /* Keep the existing ritual image replacements. */
  const map = {
    kasi:"assets/kasi-yathra.jpg",
    oonjal:"assets/oonjal.jpg",
    malai:"assets/malai-maatral.jpg",
    kanya:"assets/kanyadanam.jpg",
    mangalya:"assets/mangalya-dharanam.jpg",
    sapthapadi:"assets/sapthapadi.jpg",
    ammi:"assets/ammi-midhithal.jpg",
    metti:"assets/metti-dharanam.jpg",
    arundhati:"assets/arundhati-darshan.jpg",
    asirvadam:"assets/asirvadam.jpg",
    bhojanam:"assets/tamil-iyer-bhojanam.jpg",
    nelangu:"assets/nelangu.jpg"
  };

  Object.entries(map).forEach(([key,src])=>{
    const block=document.querySelector(".event-photo."+key);
    const img=block && block.querySelector("img");
    if(img){img.src=src;img.removeAttribute("srcset");img.loading="lazy";img.decoding="async";}
  });

  /* SACRED TRADITIONS
     Physically move complete cards:
     Kasi Yathra -> Malai Maatral -> Oonjal
  */
  const events=document.querySelector(".events");
  if(events){
    const cards=[...events.querySelectorAll(":scope > .event")];
    const find=name=>cards.find(c=>{
      const h=c.querySelector("h3");
      return h && h.textContent.trim().toLowerCase()===name.toLowerCase();
    });
    const kasi=find("Kasi Yathra");
    const malai=find("Malai Maatral");
    const oonjal=find("Oonjal");

    if(kasi && malai && oonjal){
      events.insertBefore(kasi,events.firstElementChild);
      events.insertBefore(malai,kasi.nextElementSibling);
      events.insertBefore(oonjal,malai.nextElementSibling);

      [...events.querySelectorAll(":scope > .event")].forEach((card,i)=>{
        const n=card.querySelector(".event-number");
        if(n)n.textContent=String(i+1).padStart(2,"0");
        card.classList.toggle("reverse",i%2===1);
      });
    }
  }

  /* SACRED WEDDING CEREMONY / MUHURTHAM
     Kasi Yathra -> Malai Maatral -> Oonjal
  */
  const mc=document.querySelector(".muhurtham-card");
  if(mc){
    const rows=[...mc.querySelectorAll(".muhurtham-row")];
    const findRow=name=>rows.find(r=>r.textContent.trim().toLowerCase().includes(name.toLowerCase()));
    const title=[...mc.querySelectorAll(".muhurtham-program-title")]
      .find(x=>x.textContent.trim().toLowerCase()==="before the muhurtham");

    const kasiRow=findRow("Kasi Yathra");
    const malaiRow=findRow("Malai Maatral");
    const oonjalRow=findRow("Oonjal");

    if(title && kasiRow && malaiRow && oonjalRow){
      title.after(kasiRow);
      kasiRow.after(malaiRow);
      malaiRow.after(oonjalRow);
      [kasiRow,malaiRow,oonjalRow].forEach((r,i)=>{
        const n=r.querySelector("b");
        if(n)n.textContent=String(i+1).padStart(2,"0");
      });
    }
  }
});
