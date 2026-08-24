/* Anisha & Srivatsan — Wedding Invitation interactions */
const GOOGLE_RSVP_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf7F9U-8WirBwNMF10VO0LnKeDXTvqlBp_xLOjisa4AF6TtcQ/viewform";
const WHATSAPP_CONTACTS = {
  father: "917730097225",
  mother: "919701897225"
};
const WHATSAPP_MESSAGE = "Dear Anisha & Srivatsan, thank you for inviting us. We are delighted to celebrate your wedding with you!";

function initWhatsAppChooser(){
  const chooser=document.getElementById("whatsappChooser");
  const open=document.getElementById("whatsappRsvpBtn");
  const close=document.getElementById("whatsappClose");
  const father=document.getElementById("whatsappFather");
  const mother=document.getElementById("whatsappMother");
  if(!chooser||!open)return;
  const text=encodeURIComponent(WHATSAPP_MESSAGE);
  father.href=`https://wa.me/${WHATSAPP_CONTACTS.father}?text=${text}`;
  mother.href=`https://wa.me/${WHATSAPP_CONTACTS.mother}?text=${text}`;
  const hide=()=>{chooser.hidden=true;document.body.classList.remove("modal-open");open.focus();};
  open.addEventListener("click",()=>{chooser.hidden=false;document.body.classList.add("modal-open");close?.focus();});
  close?.addEventListener("click",hide);
  chooser.addEventListener("click",e=>{if(e.target===chooser)hide();});
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!chooser.hidden)hide();});
}

function initNavigation(){
  const header=document.querySelector("header");
  const onScroll=()=>header?.classList.toggle("scrolled",window.scrollY>30);
  window.addEventListener("scroll",onScroll,{passive:true}); onScroll();
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    // OPEN INVITATION has its own controlled action below; do not let the
    // generic navigation handler move it to a later section.
    if((a.textContent||"").trim().toUpperCase().includes("OPEN INVITATION")) return;
    a.addEventListener("click",e=>{
      const id=a.getAttribute("href"); if(!id||id==="#")return;
      const target=document.querySelector(id); if(target){e.preventDefault();target.scrollIntoView({behavior:"smooth",block:"start"});}
    });
  });
}

function initReveal(){
  const items=document.querySelectorAll(".reveal,.fade");
  if(!("IntersectionObserver" in window)){items.forEach(x=>x.classList.add("visible"));return;}
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}}),{threshold:.12});
  items.forEach(x=>observer.observe(x));
}

function initCounters(){
  const el=document.getElementById("countdown");
  if(!el)return;
  const target=new Date("2026-10-25T08:00:00+05:30").getTime();
  const tick=()=>{
    const d=target-Date.now(); if(d<=0){el.textContent="The day has arrived";return;}
    const days=Math.floor(d/86400000),hours=Math.floor(d%86400000/3600000),mins=Math.floor(d%3600000/60000),secs=Math.floor(d%60000/1000);
    el.textContent=`${days} days · ${String(hours).padStart(2,"0")}h ${String(mins).padStart(2,"0")}m ${String(secs).padStart(2,"0")}s`;
  };
  tick();setInterval(tick,1000);
}

document.addEventListener("DOMContentLoaded",()=>{
  const formLink=document.getElementById("googleRsvp"); if(formLink)formLink.href=GOOGLE_RSVP_URL;
  initWhatsAppChooser(); initNavigation(); initReveal(); initCounters(); initOpenInvitation();
});

function initOpenInvitation(){
  const hero=document.getElementById("home");
  const target=document.getElementById("tradition");
  const music=document.getElementById("weddingMusic");
  const toggle=document.getElementById("musicToggle");
  if(!hero || !target) return;

  // Create the button here, rather than relying on another JS file.
  // It is a BUTTON (not an anchor), so it cannot trigger the site's generic
  // #anchor navigation and cannot jump to the Couple section.
  let openButton=document.getElementById("openInvitation");
  if(!openButton){
    openButton=document.createElement("button");
    openButton.id="openInvitation";
    openButton.type="button";
    openButton.className="open-invitation-button";
    openButton.textContent="OPEN INVITATION";
    openButton.setAttribute("aria-label","Open Invitation");
    const heroContent=hero.querySelector(".hero-content");
    (heroContent || hero).appendChild(openButton);
  }

  const setMusicState=(playing)=>{
    if(!toggle)return;
    toggle.classList.toggle("playing",playing);
    toggle.setAttribute("aria-pressed",String(playing));
    toggle.setAttribute("aria-label",playing?"Turn wedding music off":"Turn wedding music on");
    toggle.title=playing?"Music ON — click to switch off":"Music OFF — click to switch on";
    const icon=toggle.querySelector("span");
    if(icon) icon.textContent=playing?"♫":"🔇";
  };

  if(music){
    music.volume=1;
    music.autoplay=true;
    // Attempt audible autoplay. Browsers may block this until interaction.
    music.play().then(()=>setMusicState(true)).catch(()=>setMusicState(false));
    music.addEventListener("play",()=>setMusicState(true));
    music.addEventListener("pause",()=>setMusicState(false));
    music.addEventListener("ended",()=>setMusicState(false));
  }

  if(toggle && music){
    toggle.addEventListener("click",async e=>{
      e.preventDefault();
      e.stopPropagation();
      if(music.paused){
        try{await music.play();setMusicState(true);}catch(err){setMusicState(false);}
      }else{
        music.pause();
        setMusicState(false);
      }
    });
  }

  openButton.addEventListener("click",async e=>{
    e.preventDefault();
    e.stopPropagation();
    if(music){
      try{await music.play();setMusicState(true);}catch(err){}
    }
    // ONLY the immediately following section. Never target #couple.
    target.scrollIntoView({behavior:"smooth",block:"start"});
  });

  const style=document.createElement("style");
  style.textContent=`
    .open-invitation-button{
      position:relative!important;
      z-index:999!important;
      display:inline-flex!important;
      align-items:center!important;
      justify-content:center!important;
      margin:28px auto 0!important;
      padding:14px 30px!important;
      min-width:190px!important;
      border:1px solid #e4d3a3!important;
      border-radius:3px!important;
      background:rgba(48,72,61,.94)!important;
      color:#fff!important;
      font:600 11px Inter,Arial,sans-serif!important;
      letter-spacing:.18em!important;
      cursor:pointer!important;
      box-shadow:0 8px 24px rgba(0,0,0,.22)!important;
    }
    .open-invitation-button:hover{transform:translateY(-2px)!important;background:#30483d!important}
    .open-invitation-button:focus-visible{outline:2px solid #e4d3a3!important;outline-offset:4px!important}
  `;
  document.head.appendChild(style);
}
