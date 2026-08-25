/* Anisha & Srivatsan — Wedding Invitation interactions */

const GOOGLE_RSVP_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf7F9U-8WirBwNMF10VO0LnKeDXTvqlBp_xLOjisa4AF6TtcQ/viewform";

function initNavigation(){
  const header=document.querySelector("header");
  const onScroll=()=>header?.classList.toggle("scrolled",window.scrollY>30);
  window.addEventListener("scroll",onScroll,{passive:true}); onScroll();
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{
    const id=a.getAttribute("href"); if(!id||id==="#")return;
    const target=document.querySelector(id);
    if(target){e.preventDefault();target.scrollIntoView({behavior:"smooth",block:"start"});}
  }));
}

function initReveal(){
  const items=document.querySelectorAll(".reveal,.fade");
  if(!("IntersectionObserver" in window)){items.forEach(x=>x.classList.add("visible"));return;}
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}
  }),{threshold:.12});
  items.forEach(x=>observer.observe(x));
}

function initCounters(){
  const heroEl=document.getElementById("countdown");
  const closingEl=document.getElementById("closingCountdown");
  if(!heroEl && !closingEl)return;

  const target=Date.parse("2026-10-25T08:00:00+05:30");
  const format=(ms)=>{
    if(ms<=0)return "The day has arrived";
    const totalSeconds=Math.floor(ms/1000);
    const days=Math.floor(totalSeconds/86400);
    const hours=Math.floor((totalSeconds%86400)/3600);
    const mins=Math.floor((totalSeconds%3600)/60);
    const secs=totalSeconds%60;
    return `${days} days · ${String(hours).padStart(2,"0")}h ${String(mins).padStart(2,"0")}m ${String(secs).padStart(2,"0")}s`;
  };
  const tick=()=>{
    const text=format(target-Date.now());
    if(heroEl)heroEl.textContent=text;
    if(closingEl)closingEl.textContent=text;
  };
  tick();
  window.setInterval(tick,1000);
}

document.addEventListener("DOMContentLoaded",()=>{
  const formLink=document.getElementById("googleRsvp");
  if(formLink)formLink.href=GOOGLE_RSVP_URL;
  initNavigation();
  initReveal();
  initCounters();
});

/* Wedding music — user-initiated ON/OFF toggle */
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
      try{await music.play();setState(true);}
      catch(e){console.warn("Wedding music could not start:",e);}
    }else{
      music.pause();
      setState(false);
    }
  });
  music.addEventListener("ended",()=>setState(false));
}

document.addEventListener("DOMContentLoaded",initWeddingMusic);

/* Section down-arrow navigation */
document.querySelectorAll(".slide-down").forEach(link=>link.addEventListener("click",e=>{
  const id=link.getAttribute("href");
  const target=id?document.querySelector(id):null;
  if(target){e.preventDefault();target.scrollIntoView({behavior:"smooth",block:"start"});}
}));

/*
 * PRINT / DOWNLOAD — SINGLE INVITATION ONLY
 *
 * The uploaded four-page PDF is the sole printable invitation.
 * No English/Tamil selection is offered.
 * The recipient's name is written onto page 1 immediately to the right of
 * "Smt. & Sri" and above the first blue writing line.
 */
document.addEventListener("DOMContentLoaded",()=>{
  const printButton=document.getElementById("printInvitation");
  const modal=document.getElementById("printOptions");
  const close=document.getElementById("printOptionsClose");
  const prepare=document.getElementById("preparePrint");
  const nameInput=document.getElementById("recipientName");

  if(!printButton||!modal||!close||!prepare||!nameInput)return;

  /* Remove the old English/Tamil choice completely from the user interface. */
  const languageOptions=modal.querySelector(".language-options");
  if(languageOptions)languageOptions.remove();

  printButton.innerHTML='<span aria-hidden="true">♧</span> PRINT / DOWNLOAD INVITATION';
  printButton.setAttribute("aria-label","Print or download invitation");

  const heading=modal.querySelector(".print-options-card h3");
  if(heading)heading.textContent="Print / Download Invitation";

  const label=modal.querySelector('label[for="recipientName"]');
  if(label)label.textContent="Name of the Person";

  nameInput.placeholder="Enter the name of the person";

  const note=modal.querySelector(".print-options-note");
  if(note)note.textContent='The name entered will appear on page 1 next to “Smt. & Sri”, one line above the first blue writing line.';

  prepare.textContent="PRINT / DOWNLOAD INVITATION";

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

  printButton.addEventListener("click",e=>{
    e.preventDefault();
    open();
  });
  close.addEventListener("click",hide);
  modal.addEventListener("click",e=>{
    if(e.target===modal)hide();
  });

  const safeFileName=name=>name
    .replace(/[^a-z0-9\-_ &.]/gi," ")
    .trim()
    .replace(/\s+/g,"_")
    .slice(0,70) || "Recipient";

  prepare.addEventListener("click",async()=>{
    const name=nameInput.value.trim();
    if(!name){
      alert("Please enter the name of the person.");
      nameInput.focus();
      return;
    }

    if(!window.PDFLib){
      alert("The invitation PDF engine is still loading. Please wait a moment and try again.");
      return;
    }

    const original=prepare.textContent;
    prepare.disabled=true;
    prepare.textContent="PREPARING INVITATION…";

    try{
      const source="assets/Anisha_Srivatsan_Wedding_Invitation.pdf";

      const response=await fetch(source,{cache:"no-store"});
      if(!response.ok)throw new Error("Could not load the invitation PDF.");

      const bytes=await response.arrayBuffer();
      const pdf=await PDFLib.PDFDocument.load(bytes);
      const page=pdf.getPages()[0];

      const font=await pdf.embedFont(PDFLib.StandardFonts.HelveticaBold);

      /*
       * A4 source: 595 x 842 points.
       * The first blue line begins around x=200 and y=432.
       * The name is intentionally placed ABOVE that line, beside
       * "Smt. & Sri", matching the supplied physical invitation.
       */
      const x=200;
      const y=442;
      const maxWidth=265;

      let size=14;
      while(font.widthOfTextAtSize(name,size)>maxWidth && size>9){
        size-=0.5;
      }

      page.drawText(name,{
        x,
        y,
        size,
        font,
        color:PDFLib.rgb(0.08,0.12,0.30)
      });

      const output=await pdf.save({useObjectStreams:false});
      const blob=new Blob([output],{type:"application/pdf"});
      const url=URL.createObjectURL(blob);

      const link=document.createElement("a");
      link.href=url;
      link.download=`Anisha_Srivatsan_Wedding_Invitation_${safeFileName(name)}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      hide();

      /* Open the generated personalised PDF for immediate printing. */
      setTimeout(()=>{
        const win=window.open(url,"_blank","noopener,noreferrer");
        if(!win){
          alert("The personalised invitation has been downloaded. Open the downloaded PDF to print it.");
        }
      },250);

      setTimeout(()=>URL.revokeObjectURL(url),120000);

    }catch(err){
      console.error(err);
      alert("Unable to generate the personalised invitation. Please try again.");
    }finally{
      prepare.disabled=false;
      prepare.textContent=original;
    }
  });
});

/* ADD TO CALENDAR — additive only */
document.addEventListener("DOMContentLoaded",()=>{
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
  menu.addEventListener("click",e=>{
    if(e.target===menu)close();
  });

  googleBtn.addEventListener("click",()=>{
    const u="https://calendar.google.com/calendar/render?action=TEMPLATE&text="+
      encodeURIComponent(title)+"&dates="+startUTC+"/"+endUTC+
      "&details="+encodeURIComponent(description)+
      "&location="+encodeURIComponent(location);
    window.open(u,"_blank","noopener,noreferrer");
    close();
  });

  icsBtn.addEventListener("click",()=>{
    const esc=s=>String(s)
      .replace(/\\/g,"\\\\")
      .replace(/\n/g,"\\n")
      .replace(/,/g,"\\,")
      .replace(/;/g,"\\;");

    const ics=[
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Anisha & Srivatsan//Wedding Invitation//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      "UID:anisha-srivatsan-wedding-20261025@prsvas.github.io",
      "DTSTAMP:20260821T000000Z",
      "DTSTART:"+startUTC,
      "DTEND:"+endUTC,
      "SUMMARY:"+esc(title),
      "LOCATION:"+esc(location),
      "DESCRIPTION:"+esc(description),
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR"
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
});
