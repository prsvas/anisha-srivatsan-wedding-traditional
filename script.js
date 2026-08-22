/* Anisha & Srivatsan — Wedding Invitation interactions */

const GOOGLE_RSVP_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf7F9U-8WirBwNMF10VO0LnKeDXTvqlBp_xLOjisa4AF6TtcQ/viewform";
const WEDDING_TARGET = new Date("2026-10-25T08:00:00+05:30").getTime();

function updateCountdown() {
  const hero = document.getElementById("countdown");
  const closing = document.getElementById("closingCountdown");

  const remaining = WEDDING_TARGET - Date.now();

  let text;
  if (remaining <= 0) {
    text = "The day has arrived";
  } else {
    const total = Math.floor(remaining / 1000);
    const days = Math.floor(total / 86400);
    const hours = Math.floor((total % 86400) / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const seconds = total % 60;

    text = `${days} days · ${String(hours).padStart(2,"0")}h ${String(minutes).padStart(2,"0")}m ${String(seconds).padStart(2,"0")}s`;
  }

  if (hero) hero.textContent = text;
  if (closing) closing.textContent = text;
}

/* Run immediately, then every second. This intentionally does not depend
   on DOMContentLoaded because script.js is loaded at the end of index.html. */
updateCountdown();
setInterval(updateCountdown, 1000);

function initNavigation(){
  const header=document.querySelector("header");
  const onScroll=()=>header?.classList.toggle("scrolled",window.scrollY>30);
  window.addEventListener("scroll",onScroll,{passive:true});
  onScroll();

  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{
    const id=a.getAttribute("href");
    if(!id||id==="#")return;
    const target=document.querySelector(id);
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:"smooth",block:"start"});
    }
  }));
}

function initReveal(){
  const items=document.querySelectorAll(".reveal,.fade");
  if(!("IntersectionObserver" in window)){
    items.forEach(x=>x.classList.add("visible"));
    return;
  }

  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  }),{threshold:.12});

  items.forEach(x=>observer.observe(x));
}

function initWeddingMusic(){
  const music=document.getElementById("weddingMusic");
  const toggle=document.getElementById("musicToggle");
  if(!music||!toggle)return;

  const setState=(playing)=>{
    toggle.classList.toggle("playing",playing);
    toggle.setAttribute("aria-pressed",String(playing));
    toggle.setAttribute("aria-label",playing?"Pause wedding music":"Play wedding music");
  };

  toggle.addEventListener("click",async()=>{
    if(music.paused){
      try{
        await music.play();
        setState(true);
      }catch(e){
        console.warn("Wedding music could not start:",e);
      }
    }else{
      music.pause();
      setState(false);
    }
  });

  music.addEventListener("ended",()=>setState(false));
}

function initPrintInvitation(){
  const printButton=document.getElementById("printInvitation");
  const modal=document.getElementById("printOptions");
  const close=document.getElementById("printOptionsClose");
  const prepare=document.getElementById("preparePrint");
  const nameInput=document.getElementById("recipientName");
  if(!printButton||!modal||!close||!prepare||!nameInput)return;

  const open=()=>{
    modal.classList.add("show");
    modal.setAttribute("aria-hidden","false");
    document.body.classList.add("modal-open");
    setTimeout(()=>nameInput.focus(),80);
  };

  const hide=()=>{
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden","true");
    document.body.classList.remove("modal-open");
  };

  printButton.addEventListener("click",e=>{e.preventDefault();open()});
  close.addEventListener("click",hide);
  modal.addEventListener("click",e=>{if(e.target===modal)hide()});

  const getLanguage=()=>document.querySelector('input[name="invitationLanguage"]:checked')?.value||"english";
  const safeFileName=name=>name.replace(/[^a-z0-9\-_ ]/gi," ").trim().replace(/\s+/g,"_").slice(0,70)||"Recipient";

  prepare.addEventListener("click",async()=>{
    const name=nameInput.value.trim();
    if(!name){
      nameInput.focus();
      alert("Please enter the recipient's name.");
      return;
    }

    if(!window.PDFLib){
      alert("The invitation PDF engine is still loading. Please wait a moment and try again.");
      return;
    }

    const language=getLanguage();
    const source=language==="tamil"
      ? "assets/Anisha_Srivatsan_Wedding_Invitation_Tamil.pdf"
      : "assets/Anisha_Srivatsan_Wedding_Invitation_English.pdf";
    const label=language==="tamil"?"Tamil":"English";
    const original=prepare.textContent;

    prepare.disabled=true;
    prepare.textContent="PREPARING INVITATION…";

    try{
      const bytes=await fetch(source,{cache:"no-store"}).then(r=>{
        if(!r.ok)throw new Error("Could not load the selected invitation PDF.");
        return r.arrayBuffer();
      });

      const pdf=await PDFLib.PDFDocument.load(bytes);
      const page=pdf.getPages()[0];
      const font=await pdf.embedFont(PDFLib.StandardFonts.Helvetica);

      let size=20;
      while(font.widthOfTextAtSize(name,size)>270 && size>15)size-=0.5;

      page.drawText(name,{
        x:195,
        y:430,
        size,
        color:PDFLib.rgb(0.20,0.28,0.55),
        font
      });

      const out=await pdf.save({useObjectStreams:false});
      const blob=new Blob([out],{type:"application/pdf"});
      const url=URL.createObjectURL(blob);
      const a=document.createElement("a");

      a.href=url;
      a.download=`Anisha_Srivatsan_Wedding_Invitation_${label}_${safeFileName(name)}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      hide();

      setTimeout(()=>{
        const w=window.open(url,"_blank","noopener,noreferrer");
        if(!w)alert("The invitation PDF was generated and downloaded. Please open the downloaded PDF to print it.");
      },250);

      setTimeout(()=>URL.revokeObjectURL(url),120000);
    }catch(err){
      console.error(err);
      alert("Unable to generate the invitation. Please check your connection and try again.");
    }finally{
      prepare.disabled=false;
      prepare.textContent=original;
    }
  });
}

function initCalendar(){
  const openBtn=document.getElementById("addToCalendar");
  const menu=document.getElementById("calendarMenu");
  const closeBtn=document.getElementById("calendarClose");
  const googleBtn=document.getElementById("googleCalendar");
  const icsBtn=document.getElementById("icsCalendar");

  if(!openBtn||!menu||!closeBtn||!googleBtn||!icsBtn)return;

  const title="Anisha & Srivatsan — Wedding";
  const startUTC="20261025T023000Z";
  const endUTC="20261025T040000Z";
  const location="Haryana Bhavan, 1-8-179, Opposite LIC Building, Near HDFC Bank, Sarojini Devi Road, Secunderabad, Telangana, India";
  const description="Wedding ceremony of Anisha & Srivatsan. #AnishaSrivatsanTirumanaVizaha";

  const open=()=>{
    menu.classList.add("show");
    menu.setAttribute("aria-hidden","false");
    document.body.classList.add("modal-open");
  };

  const close=()=>{
    menu.classList.remove("show");
    menu.setAttribute("aria-hidden","true");
    document.body.classList.remove("modal-open");
  };

  openBtn.addEventListener("click",open);
  closeBtn.addEventListener("click",close);
  menu.addEventListener("click",e=>{if(e.target===menu)close()});

  googleBtn.addEventListener("click",()=>{
    const u="https://calendar.google.com/calendar/render?action=TEMPLATE&text="+
      encodeURIComponent(title)+"&dates="+startUTC+"/"+endUTC+
      "&details="+encodeURIComponent(description)+
      "&location="+encodeURIComponent(location);

    window.open(u,"_blank","noopener,noreferrer");
    close();
  });

  icsBtn.addEventListener("click",()=>{
    const esc=s=>String(s).replace(/\\/g,"\\\\").replace(/\n/g,"\\n").replace(/,/g,"\\,").replace(/;/g,"\\;");

    const ics=[
      "BEGIN:VCALENDAR","VERSION:2.0",
      "PRODID:-//Anisha & Srivatsan//Wedding Invitation//EN",
      "CALSCALE:GREGORIAN","METHOD:PUBLISH","BEGIN:VEVENT",
      "UID:anisha-srivatsan-wedding-20261025@prsvas.github.io",
      "DTSTAMP:20260821T000000Z",
      "DTSTART:"+startUTC,
      "DTEND:"+endUTC,
      "SUMMARY:"+esc(title),
      "LOCATION:"+esc(location),
      "DESCRIPTION:"+esc(description),
      "STATUS:CONFIRMED","END:VEVENT","END:VCALENDAR"
    ].join("\r\n");

    const url=URL.createObjectURL(new Blob([ics],{type:"text/calendar;charset=utf-8"}));
    const a=document.createElement("a");
    a.href=url;
    a.download="Anisha-Srivatsan-Wedding.ics";
    document.body.appendChild(a);
    a.click();
    a.remove();

    setTimeout(()=>URL.revokeObjectURL(url),1000);
    close();
  });
}

document.addEventListener("DOMContentLoaded",()=>{
  const formLink=document.getElementById("googleRsvp");
  if(formLink)formLink.href=GOOGLE_RSVP_URL;

  initNavigation();
  initReveal();
  initWeddingMusic();
  initPrintInvitation();
  initCalendar();

  document.querySelectorAll(".slide-down").forEach(link=>link.addEventListener("click",e=>{
    const id=link.getAttribute("href");
    const target=id?document.querySelector(id):null;
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:"smooth",block:"start"});
    }
  }));
});
