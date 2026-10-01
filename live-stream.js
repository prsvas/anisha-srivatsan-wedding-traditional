/* Anisha & Srivatsan — additive Watch Live slide.
   When the YouTube link is available, paste it between the quotes below. */
const WEDDING_LIVE_STREAM_URL = '';

(function addWeddingLiveStream() {
  const rsvp = document.getElementById('rsvp');
  if (!rsvp || document.getElementById('live-stream')) return;

  const style = document.createElement('style');
  style.textContent = `
    .wedding-live-section{position:relative;min-height:82svh;padding:110px 24px;box-sizing:border-box;display:grid;place-items:center;text-align:center;color:#f7f0df;background:#10091b;overflow:hidden}
    .wedding-live-section:before{content:"";position:absolute;inset:0;opacity:.2;background-image:linear-gradient(45deg,transparent 47%,rgba(203,168,94,.22) 48%,rgba(203,168,94,.22) 49%,transparent 50%),linear-gradient(-45deg,transparent 47%,rgba(203,168,94,.18) 48%,rgba(203,168,94,.18) 49%,transparent 50%);background-size:155px 155px}
    .wedding-live-card{position:relative;z-index:1;width:min(720px,92vw);padding:62px 44px 58px;border:1px solid rgba(205,174,112,.48);border-radius:38px;background:rgba(18,10,31,.82);box-shadow:0 28px 90px rgba(0,0,0,.26)}
    .wedding-live-label{display:flex;align-items:center;justify-content:center;gap:12px;color:#e1be74;font:700 12px Inter,Arial,sans-serif;letter-spacing:.18em}
    .wedding-live-dot{width:12px;height:12px;border-radius:50%;background:#d64a4f;box-shadow:0 0 16px rgba(214,74,79,.65);animation:weddingLivePulse 1.8s ease-in-out infinite}
    .wedding-live-divider{display:flex;align-items:center;gap:15px;width:min(390px,76%);margin:35px auto;color:#d7aa50}
    .wedding-live-divider:before,.wedding-live-divider:after{content:"";height:1px;flex:1;background:rgba(215,170,80,.6)}
    .wedding-live-section h2{margin:0 0 22px;font:500 clamp(48px,7vw,76px)/1 "Cormorant Garamond",Georgia,serif;color:#fff8e8}
    .wedding-live-copy{max-width:540px;margin:0 auto 32px;color:#cfc5bc;font:400 clamp(17px,2vw,21px)/1.65 "Cormorant Garamond",Georgia,serif}
    .wedding-live-button{display:inline-flex;align-items:center;justify-content:center;gap:11px;min-width:min(320px,80vw);padding:17px 28px;border:1px solid #e3b75f;border-radius:999px;background:linear-gradient(90deg,#ae5874,#d49a48);color:white;font:700 12px Inter,Arial,sans-serif;letter-spacing:.13em;cursor:pointer;box-shadow:0 12px 28px rgba(0,0,0,.22);transition:transform .2s,filter .2s}
    .wedding-live-button:hover{transform:translateY(-2px);filter:brightness(1.06)}
    .wedding-live-button svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:1.8}
    .wedding-live-note{margin:26px 0 0;color:#9e948f;font:400 16px/1.5 "Cormorant Garamond",Georgia,serif}
    .wedding-live-section .wedding-live-down{position:absolute;z-index:2;bottom:18px;left:50%;transform:translateX(-50%);color:#f7f3ea;text-decoration:none}
    .wedding-live-down span{display:grid;place-items:center;width:42px;height:42px;border:1px solid rgba(218,184,111,.72);border-radius:50%;background:rgba(18,10,31,.78)}
    .wedding-live-down svg{width:19px;height:19px;fill:none;stroke:currentColor;stroke-width:1.35;stroke-linecap:round;stroke-linejoin:round}
    .wedding-live-modal{position:fixed;inset:0;z-index:5000;display:none;align-items:center;justify-content:center;padding:22px;background:rgba(5,4,10,.94);color:#f4efe6;text-align:center;overflow:auto}
    .wedding-live-modal.show{display:flex}
    .wedding-live-modal-card{position:relative;width:min(680px,94vw);padding:60px 42px 46px;border:1px solid rgba(206,161,70,.32);border-radius:24px;background:radial-gradient(circle at 50% 16%,rgba(202,151,53,.1),transparent 30%),#090a10;box-shadow:0 28px 90px rgba(0,0,0,.55)}
    .wedding-live-close{position:absolute;right:18px;top:12px;border:0;background:none;color:#d7ad59;font-size:30px;cursor:pointer}
    .wedding-live-rings{display:grid;place-items:center;width:130px;height:130px;margin:0 auto 24px;border:1px solid rgba(207,163,75,.55);border-radius:50%;box-shadow:0 0 0 22px rgba(207,163,75,.08),0 0 0 44px rgba(207,163,75,.06);color:#d7ad59}
    .wedding-live-rings svg{width:38px;height:38px;fill:none;stroke:currentColor;stroke-width:1.5}
    .wedding-live-modal-label{font:600 14px Inter,Arial,sans-serif;letter-spacing:.28em;color:#c9c4be}
    .wedding-live-modal h3{margin:28px 0 34px;font:500 clamp(50px,8vw,76px)/1 "Cormorant Garamond",Georgia,serif;color:#d8aa4e}
    .wedding-live-modal-main{margin:0 auto 14px;max-width:570px;font:500 clamp(18px,2.3vw,23px)/1.55 Inter,Arial,sans-serif;color:#f4efe6}
    .wedding-live-modal-main strong{color:#ddb454}
    .wedding-live-modal-sub{margin:0 auto 34px;max-width:590px;font:400 17px/1.55 Inter,Arial,sans-serif;color:#aaa7a5}
    .wedding-live-time{display:flex;align-items:center;justify-content:center;gap:18px;width:min(470px,90%);margin:0 auto 34px;padding:18px;border:1px solid rgba(206,161,70,.3);border-radius:16px;background:rgba(186,125,48,.11);text-align:left}
    .wedding-live-clock{display:grid;place-items:center;flex:0 0 48px;height:48px;border-radius:50%;background:rgba(206,161,70,.2);color:#d8aa4e;font-size:25px}
    .wedding-live-time span{display:block;color:#a9a5a0;font:600 12px Inter,Arial,sans-serif;letter-spacing:.08em}
    .wedding-live-time strong{display:block;margin-top:5px;color:#dfbb68;font:500 17px Inter,Arial,sans-serif}
    .wedding-live-back{display:inline-flex;align-items:center;gap:12px;padding:15px 27px;border:0;border-radius:10px;background:#d5a947;color:#15100a;font:600 16px Inter,Arial,sans-serif;cursor:pointer;box-shadow:0 10px 30px rgba(213,169,71,.2)}
    @keyframes weddingLivePulse{50%{opacity:.55;transform:scale(.86)}}
    @media(max-width:600px){.wedding-live-section{min-height:88svh;padding:82px 18px}.wedding-live-card{padding:44px 18px 46px;border-radius:25px}.wedding-live-button{min-width:0;width:100%;box-sizing:border-box}.wedding-live-modal{padding:12px}.wedding-live-modal-card{padding:52px 18px 32px}.wedding-live-rings{width:94px;height:94px;box-shadow:0 0 0 15px rgba(207,163,75,.08),0 0 0 30px rgba(207,163,75,.06)}.wedding-live-modal h3{margin-bottom:26px}.wedding-live-time{width:100%;box-sizing:border-box}.wedding-live-back{width:100%;justify-content:center}}
    @media(prefers-reduced-motion:reduce){.wedding-live-dot{animation:none}}
    @media print{.wedding-live-section,.wedding-live-modal{display:none!important}}
  `;
  document.head.appendChild(style);

  const section = document.createElement('section');
  section.className = 'wedding-live-section';
  section.id = 'live-stream';
  section.innerHTML = `
    <div class="wedding-live-card">
      <div class="wedding-live-label"><span class="wedding-live-dot"></span> LIVE STREAM</div>
      <div class="wedding-live-divider" aria-hidden="true">♦</div>
      <h2>Watch Live</h2>
      <p class="wedding-live-copy">Can’t make it in person? Join us virtually as we celebrate this beautiful moment together.</p>
      <button class="wedding-live-button" id="weddingLiveButton" type="button">
        <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6" width="13" height="12" rx="2"></rect><path d="m16 10 5-3v10l-5-3z"></path></svg>
        JOIN LIVE STREAM
      </button>
      <p class="wedding-live-note">The live stream will be available approximately 1 hour before the ceremony.</p>
    </div>
    <a class="wedding-live-down" href="#rsvp" aria-label="Scroll to RSVP"><span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v14M6 12l6 6 6-6"></path></svg></span></a>
  `;
  rsvp.parentNode.insertBefore(section, rsvp);

  const modal = document.createElement('div');
  modal.className = 'wedding-live-modal';
  modal.id = 'weddingLiveModal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'weddingLiveModalTitle');
  modal.innerHTML = `
    <div class="wedding-live-modal-card">
      <button class="wedding-live-close" id="weddingLiveClose" type="button" aria-label="Close">×</button>
      <div class="wedding-live-rings" aria-hidden="true"><svg viewBox="0 0 48 48"><rect x="8" y="14" width="24" height="20" rx="4"></rect><path d="m32 20 8-5v18l-8-5z"></path><path d="m18 20 8 4-8 4z"></path></svg></div>
      <div class="wedding-live-modal-label">LIVE STREAM</div>
      <h3 id="weddingLiveModalTitle">Coming Soon</h3>
      <p class="wedding-live-modal-main">The live wedding ceremony broadcast will begin <strong>approximately 1 hour before the wedding starts.</strong></p>
      <p class="wedding-live-modal-sub">Please check the invitation for the exact ceremony timing and return here closer to the event.</p>
      <div class="wedding-live-time"><div class="wedding-live-clock">◷</div><div><span>WHEN TO RETURN</span><strong>1 hour before the ceremony begins</strong></div></div>
      <button class="wedding-live-back" id="weddingLiveBack" type="button">← &nbsp; Back to Invitation</button>
    </div>
  `;
  document.body.appendChild(modal);

  const venueDown = document.querySelector('#venue .slide-down');
  if (venueDown) {
    venueDown.href = '#live-stream';
    venueDown.setAttribute('aria-label', 'Scroll to Live Stream');
  }

  const nav = document.querySelector('header nav');
  if (nav && !nav.querySelector('a[href="#live-stream"]')) {
    const rsvpLink = nav.querySelector('a[href="#rsvp"]');
    const liveLink = document.createElement('a');
    liveLink.href = '#live-stream';
    liveLink.textContent = 'Live';
    nav.insertBefore(liveLink, rsvpLink || null);
  }

  const openComingSoon = () => {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    document.getElementById('weddingLiveBack').focus();
  };
  const closeComingSoon = () => {
    modal.classList.remove('show');
    document.body.style.overflow = '';
    document.getElementById('weddingLiveButton').focus();
  };

  document.getElementById('weddingLiveButton').addEventListener('click', () => {
    const url = WEDDING_LIVE_STREAM_URL.trim();
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
    else openComingSoon();
  });
  document.getElementById('weddingLiveClose').addEventListener('click', closeComingSoon);
  document.getElementById('weddingLiveBack').addEventListener('click', closeComingSoon);
  modal.addEventListener('click', event => {
    if (event.target === modal) closeComingSoon();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modal.classList.contains('show')) closeComingSoon();
  });
})();
