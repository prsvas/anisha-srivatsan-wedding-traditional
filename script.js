/* Anisha & Srivatsan — Wedding Invitation interactions */
const GOOGLE_RSVP_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf7F9U-8WirBwNMF10VO0LnKeDXTvqlBp_xLOjisa4AF6TtcQ/viewform";
const WHATSAPP_CONTACTS = { father: "917730097225", mother: "919701897225" };
const WHATSAPP_MESSAGE = "Dear Anisha & Srivatsan, thank you for inviting us. We are delighted to celebrate your wedding with you!";

function initWhatsAppChooser(){
  const chooser=document.getElementById("whatsappChooser"),open=document.getElementById("whatsappRsvpBtn"),
    close=document.getElementById("whatsappClose"),father=document.getElementById("whatsappFather"),mother=document.getElementById("whatsappMother");
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
  window.addEventListener("scroll",onScroll,{passive:true});onScroll();
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{
    const id=a.getAttribute("href");if(!id||id==="#")return;
    const target=document.querySelector(id);if(target){e.preventDefault();target.scrollIntoView({behavior:"smooth",block:"start"});}
  }));
}
function initReveal(){
  const items=document.querySelectorAll(".reveal,.fade");
  if(!("IntersectionObserver" in window)){items.forEach(x=>x.classList.add("visible"));return;}
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}}),{threshold:.12});
  items.forEach(x=>observer.observe(x));
}
function initCounters(){
  const el=document.getElementById("countdown");if(!el)return;
  const target=new Date("2026-10-25T08:00:00+05:30").getTime();
  const tick=()=>{const d=target-Date.now();if(d<=0){el.textContent="The day has arrived";return;}
    const days=Math.floor(d/86400000),hours=Math.floor(d%86400000/3600000),mins=Math.floor(d%3600000/60000),secs=Math.floor(d%60000/1000);
    el.textContent=`${days} days · ${String(hours).padStart(2,"0")}h ${String(mins).padStart(2,"0")}m ${String(secs).padStart(2,"0")}s`;
  };tick();setInterval(tick,1000);
}
document.addEventListener("DOMContentLoaded",()=>{
  const formLink=document.getElementById("googleRsvp");if(formLink)formLink.href=GOOGLE_RSVP_URL;
  initWhatsAppChooser();initNavigation();initReveal();initCounters();
});

/* Wedding music — default UI is SOUND ON; toggle switches ON/OFF. */
function initWeddingMusic(){
  const music=document.getElementById("weddingMusic"),toggle=document.getElementById("musicToggle");
  if(!music)return;

  const setState=(playing)=>{
    if(!toggle)return;
    toggle.classList.toggle("playing",playing);
    toggle.setAttribute("aria-pressed",String(playing));
    toggle.setAttribute("aria-label",playing?"Sound on — click to turn sound off":"Sound off — click to turn sound on");
    toggle.title=playing?"SOUND ON — click to switch off":"SOUND OFF — click to switch on";
    toggle.textContent=playing?"SOUND ON":"SOUND OFF";
  };

  if(toggle){
    toggle.textContent="SOUND ON";
    toggle.classList.add("playing");
    toggle.setAttribute("aria-pressed","true");
    toggle.setAttribute("aria-label","Sound on — click to turn sound off");
    toggle.title="SOUND ON — click to switch off";
  }

  music.volume=1;

  const removeFallback=()=>{
    window.removeEventListener("pointerdown",startFirstInteraction,true);
    window.removeEventListener("touchstart",startFirstInteraction,true);
    window.removeEventListener("keydown",startFirstInteraction,true);
  };
  const startFirstInteraction=async()=>{
    if(!music.paused){removeFallback();return;}
    try{await music.play();setState(true);removeFallback();}catch(e){}
  };

  toggle?.addEventListener("click",async e=>{
    e.stopPropagation();
    if(music.paused){
      try{await music.play();setState(true);removeFallback();}catch(e){setState(false);}
    }else{
      music.pause();setState(false);
    }
  });

  music.addEventListener("play",()=>setState(true));
  music.addEventListener("pause",()=>setState(false));

  music.play().then(()=>{
    setState(true);removeFallback();
  }).catch(()=>{
    setState(true);
    window.addEventListener("pointerdown",startFirstInteraction,true);
    window.addEventListener("touchstart",startFirstInteraction,true);
    window.addEventListener("keydown",startFirstInteraction,true);
  });
}
document.addEventListener("DOMContentLoaded",initWeddingMusic);

/* PRINT / SAVE TRADITIONAL INVITATION — corrected recipient-name placement + print/download */
function initPrintInvitation(){
  const button =
    document.getElementById("printInvitation") ||
    document.getElementById("printInvitationBtn") ||
    document.querySelector('[data-action="print-invitation"]') ||
    document.querySelector('[data-print-invitation]');
  if(!button || button.dataset.printHandlerAttached==="true") return;
  button.dataset.printHandlerAttached="true";

  const englishPdf="assets/Anisha_Srivatsan_Wedding_Invitation_English.pdf";
  const tamilPdf="assets/Anisha_Srivatsan_Wedding_Invitation_Tamil.pdf";

  const modal=document.createElement("div");
  modal.id="printInvitationModal";
  modal.hidden=true;
  modal.innerHTML=`
    <div class="print-invitation-backdrop" data-print-close></div>
    <div class="print-invitation-dialog" role="dialog" aria-modal="true" aria-labelledby="printInvitationTitle">
      <button type="button" class="print-invitation-close" data-print-close aria-label="Close">×</button>
      <h2 id="printInvitationTitle">Traditional Wedding Invitation</h2>
      <p>Enter the recipient name and select the invitation language.</p>
      <label for="printRecipientName">Recipient Name</label>
      <input id="printRecipientName" type="text" autocomplete="name" placeholder="Enter recipient name">
      <div class="print-language-options">
        <button type="button" data-print-language="english">Option 1 — English</button>
        <button type="button" data-print-language="tamil">Option 2 — Tamil</button>
      </div>
      <div id="printInvitationStatus" class="print-invitation-status" aria-live="polite"></div>
    </div>`;
  document.body.appendChild(modal);

  const input=modal.querySelector("#printRecipientName");
  const status=modal.querySelector("#printInvitationStatus");
  const show=()=>{modal.hidden=false;document.body.classList.add("modal-open");status.textContent="";setTimeout(()=>input.focus(),20)};
  const hide=()=>{modal.hidden=true;document.body.classList.remove("modal-open")};
  const message=(s,error=false)=>{status.textContent=s;status.classList.toggle("error",error)};


  function loadPdfLib(){
    return new Promise((resolve,reject)=>{
      if(window.PDFLib && window.PDFLib.PDFDocument){resolve();return}
      const existing=document.querySelector('script[data-pdf-lib="invitation"]');
      if(existing){
        existing.addEventListener("load",resolve,{once:true});
        existing.addEventListener("error",()=>reject(new Error("Unable to load PDF library")),{once:true});
        return;
      }
      const tag=document.createElement("script");
      tag.src="https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js";
      tag.async=true;
      tag.dataset.pdfLib="invitation";
      tag.onload=resolve;
      tag.onerror=()=>reject(new Error("Unable to load PDF library"));
      document.head.appendChild(tag);
    });
  }

  async function prepare(language){
    const name=input.value.trim();
    if(!name){message("Please enter the recipient name.",true);input.focus();return}
    const url=language==="tamil"?tamilPdf:englishPdf;
    message("Preparing the invitation…");
    try{
      const r=await fetch(url,{cache:"no-store"});
      if(!r.ok) throw new Error("PDF unavailable");
      const bytes=new Uint8Array(await r.arrayBuffer());

      /* Ensure PDF-LIB is available. The previous version silently skipped
         the name overlay when PDF-LIB was not loaded, which is why the typed
         name was not visible in the generated PDF. */
      if(!window.PDFLib || !window.PDFLib.PDFDocument){
        await loadPdfLib();
      }

      let output=bytes;
      if(window.PDFLib && window.PDFLib.PDFDocument){
        const {PDFDocument,StandardFonts,rgb}=window.PDFLib;
        const doc=await PDFDocument.load(bytes);
        const page=doc.getPages()[0];
        const font=await doc.embedFont(StandardFonts.HelveticaBold);

        /* Exact recipient-name position on the supplied A4 artwork:
           immediately to the right of “Smt. & Sri” and one line above the
           first blue writing line. */
        let size=15;
        const startX=page.getWidth()*.33;
        const maxWidth=page.getWidth()*.45;
        while(font.widthOfTextAtSize(name,size)>maxWidth && size>10) size--;
        const textWidth=font.widthOfTextAtSize(name,size);

        page.drawText(name,{
          x:startX,
          y:page.getHeight()*.505,
          size,
          font,
          color:rgb(.12,.12,.12)
        });

        output=new Uint8Array(await doc.save());
      }

      const blob=new Blob([output],{type:"application/pdf"});
      const objectUrl=URL.createObjectURL(blob);
      const safe=name.replace(/[<>:"/\\\\|?*\\x00-\\x1F]/g,"").replace(/\\s+/g,"_").slice(0,80)||"Guest";
      const a=document.createElement("a");
      a.href=objectUrl;
      a.download=`Anisha_Srivatsan_Wedding_Invitation_${safe}.pdf`;
      document.body.appendChild(a);a.click();a.remove();

      const w=window.open(objectUrl,"_blank");
      message(w?"PDF downloaded and opened for printing.":"PDF downloaded. Open the downloaded PDF to print.");
      setTimeout(()=>URL.revokeObjectURL(objectUrl),120000);
    }catch(e){
      console.error(e);
      message("Unable to prepare the invitation. Please try again.",true);
    }
  }

  button.addEventListener("click",e=>{e.preventDefault();show()});
  modal.querySelectorAll("[data-print-close]").forEach(x=>x.addEventListener("click",hide));
  modal.querySelectorAll("[data-print-language]").forEach(x=>x.addEventListener("click",()=>prepare(x.dataset.printLanguage)));
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!modal.hidden)hide()});

  const style=document.createElement("style");
  style.textContent=`
    .print-invitation-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:9998}
    .print-invitation-dialog{position:fixed;z-index:9999;left:50%;top:50%;transform:translate(-50%,-50%);width:min(92vw,480px);padding:28px;border-radius:16px;background:#fff;box-shadow:0 20px 60px rgba(0,0,0,.3);font-family:inherit}
    .print-invitation-dialog h2{margin:0 32px 10px 0}.print-invitation-dialog label{display:block;margin:18px 0 7px;font-weight:600}
    #printRecipientName{width:100%;box-sizing:border-box;padding:12px 14px;border:1px solid #ccc;border-radius:8px;font-size:16px}
    .print-language-options{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}.print-language-options button{flex:1 1 180px;padding:12px 14px;border:0;border-radius:8px;cursor:pointer;font-weight:600}
    .print-invitation-close{position:absolute;right:14px;top:10px;border:0;background:transparent;font-size:28px;cursor:pointer}
    .print-invitation-status{margin-top:15px;min-height:1.3em}.print-invitation-status.error{color:#a32626}`;
  document.head.appendChild(style);
}
document.addEventListener("DOMContentLoaded",initPrintInvitation);
