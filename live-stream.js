/* Anisha & Srivatsan — additive Watch Live slide.
   When the YouTube link is available, paste it between the quotes below. */
const WEDDING_LIVE_STREAM_URL = '';

(function addWeddingLiveStream() {
  const rsvp = document.getElementById('rsvp');
  if (!rsvp || document.getElementById('live-stream')) return;

  const style = document.createElement('style');
  style.textContent = `
    .wedding-live-section{position:relative;min-height:82svh;padding:110px 24px;box-sizing:border-box;display:grid;place-items:center;text-align:center;color:#f7f3ea;background:#30483d;overflow:hidden}
    .wedding-live-section:before{content:"";position:absolute;inset:0;opacity:.18;background-image:linear-gradient(45deg,transparent 47%,rgba(184,154,90,.24) 48%,rgba(184,154,90,.24) 49%,transparent 50%),linear-gradient(-45deg,transparent 47%,rgba(184,154,90,.2) 48%,rgba(184,154,90,.2) 49%,transparent 50%);background-size:155px 155px}
    .wedding-live-card{position:relative;z-index:1;width:min(720px,92vw);padding:62px 44px 58px;border:1px solid rgba(213,187,128,.58);border-radius:38px;background:rgba(37,58,49,.92);box-shadow:0 28px 90px rgba(15,27,22,.32)}
    .wedding-live-label{display:flex;align-items:center;justify-content:center;gap:12px;color:#d9bd7e;font:700 12px Inter,Arial,sans-serif;letter-spacing:.18em}
    .wedding-live-dot{width:12px;height:12px;border-radius:50%;background:#d64a4f;box-shadow:0 0 16px rgba(214,74,79,.65);animation:weddingLivePulse 1.8s ease-in-out infinite}
    .wedding-live-divider{display:flex;align-items:center;gap:15px;width:min(390px,76%);margin:35px auto;color:#d7aa50}
    .wedding-live-divider:before,.wedding-live-divider:after{content:"";height:1px;flex:1;background:rgba(215,170,80,.6)}
    .wedding-live-section h2{margin:0 0 22px;font:500 clamp(48px,7vw,76px)/1 "Cormorant Garamond",Georgia,serif;color:#f7f3ea}
    .wedding-live-copy{max-width:540px;margin:0 auto 32px;color:#ddd7c9;font:400 clamp(17px,2vw,21px)/1.65 "Cormorant Garamond",Georgia,serif}
    .wedding-live-button{display:inline-flex;align-items:center;justify-content:center;gap:11px;min-width:min(320px,80vw);padding:17px 28px;border:1px solid #d5bb80;border-radius:999px;background:#b89a5a;color:white;font:700 12px Inter,Arial,sans-serif;letter-spacing:.13em;cursor:pointer;box-shadow:0 12px 28px rgba(20,35,29,.25);transition:transform .2s,filter .2s}
    .wedding-live-button:hover{transform:translateY(-2px);filter:brightness(1.06)}
    .wedding-live-button svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:1.8}
    .wedding-live-note{margin:26px 0 0;color:#c1baab;font:400 16px/1.5 "Cormorant Garamond",Georgia,serif}
    .wedding-live-section .wedding-live-down{position:absolute;z-index:2;bottom:18px;left:50%;transform:translateX(-50%);color:#f7f3ea;text-decoration:none}
    .wedding-live-down span{display:grid;place-items:center;width:42px;height:42px;border:1px solid rgba(218,184,111,.72);border-radius:50%;background:rgba(37,58,49,.88)}
    .wedding-live-down svg{width:19px;height:19px;fill:none;stroke:currentColor;stroke-width:1.35;stroke-linecap:round;stroke-linejoin:round}
    .wedding-live-modal{position:fixed;inset:0;z-index:5000;display:none;align-items:center;justify-content:center;padding:22px;background:rgba(24,38,32,.97);color:#f7f3ea;text-align:center;overflow:auto;isolation:isolate}
    .wedding-live-modal.show{display:flex}
    .wedding-live-galaxy{position:fixed;z-index:-2;left:-15vw;top:14%;width:130vw;height:52vh;pointer-events:none;opacity:.48;filter:blur(24px);background:radial-gradient(ellipse at center,rgba(247,243,234,.16) 0%,rgba(184,154,90,.11) 26%,rgba(78,112,96,.12) 48%,transparent 72%);transform:rotate(-12deg);animation:weddingGalaxyDrift 18s ease-in-out infinite alternate}
    .wedding-live-stars{position:fixed;z-index:-1;inset:0;pointer-events:none;overflow:hidden}
    .wedding-live-star{position:absolute;left:var(--x);top:var(--y);width:var(--s);height:var(--s);border-radius:50%;background:var(--c);box-shadow:0 0 9px 2px rgba(231,199,127,.38);opacity:.2;animation:weddingStarTwinkle var(--d) ease-in-out var(--delay) infinite}
    .wedding-live-modal-card{position:relative;z-index:1;width:min(680px,94vw);padding:60px 42px 46px;border:1px solid rgba(213,187,128,.45);border-radius:24px;background:radial-gradient(circle at 50% 16%,rgba(184,154,90,.15),transparent 31%),rgba(48,72,61,.9);box-shadow:0 28px 90px rgba(10,24,18,.58);backdrop-filter:blur(3px)}
    .wedding-live-modal.show .wedding-live-modal-card{animation:weddingLiveEnter .48s cubic-bezier(.2,.8,.2,1) both}
    .wedding-live-close{position:absolute;right:18px;top:12px;border:0;background:none;color:#d7ad59;font-size:30px;cursor:pointer}
    .wedding-live-rings{display:grid;place-items:center;width:130px;height:130px;margin:0 auto 24px;border:1px solid rgba(207,163,75,.55);border-radius:50%;box-shadow:0 0 0 22px rgba(207,163,75,.08),0 0 0 44px rgba(207,163,75,.06);color:#d7ad59}
    .wedding-live-rings svg{width:38px;height:38px;fill:none;stroke:currentColor;stroke-width:1.5}
    .wedding-live-modal-label{font:600 14px Inter,Arial,sans-serif;letter-spacing:.28em;color:#ded8cb}
    .wedding-live-modal h3{margin:28px 0 34px;font:500 clamp(50px,8vw,76px)/1 "Cormorant Garamond",Georgia,serif;color:transparent;background:linear-gradient(90deg,#b77d27 0%,#f7dc91 45%,#fff0b7 50%,#f7dc91 55%,#b77d27 100%);background-size:220% 100%;-webkit-background-clip:text;background-clip:text;filter:drop-shadow(0 0 10px rgba(216,170,78,.18));animation:weddingLiveShimmer 3s linear infinite,weddingLiveBreathe 2.4s ease-in-out infinite}
    .wedding-live-modal-main{margin:0 auto 14px;max-width:570px;font:500 clamp(18px,2.3vw,23px)/1.55 Inter,Arial,sans-serif;color:#f7f3ea}
    .wedding-live-modal-main strong{color:#dfbf78}
    .wedding-live-modal-sub{margin:0 auto 34px;max-width:590px;font:400 17px/1.55 Inter,Arial,sans-serif;color:#d1cabd}
    .wedding-live-time{display:flex;align-items:center;justify-content:center;gap:18px;width:min(470px,90%);margin:0 auto 34px;padding:18px;border:1px solid rgba(213,187,128,.34);border-radius:16px;background:rgba(184,154,90,.14);text-align:left}
    .wedding-live-clock{display:grid;place-items:center;flex:0 0 48px;height:48px;border-radius:50%;background:rgba(206,161,70,.2);color:#d8aa4e;font-size:25px}
    .wedding-live-time span{display:block;color:#c5bdaf;font:600 12px Inter,Arial,sans-serif;letter-spacing:.08em}
    .wedding-live-time strong{display:block;margin-top:5px;color:#e2c581;font:500 17px Inter,Arial,sans-serif}
    .wedding-live-back{display:inline-flex;align-items:center;gap:12px;padding:15px 27px;border:0;border-radius:10px;background:#b89a5a;color:#fff;font:600 16px Inter,Arial,sans-serif;cursor:pointer;box-shadow:0 10px 30px rgba(25,40,34,.28)}
    @keyframes weddingLivePulse{50%{opacity:.55;transform:scale(.86)}}
    @keyframes weddingLiveEnter{from{opacity:0;transform:translateY(18px) scale(.97)}to{opacity:1;transform:none}}
    @keyframes weddingLiveShimmer{to{background-position:-220% 0}}
    @keyframes weddingLiveBreathe{50%{filter:drop-shadow(0 0 18px rgba(239,194,94,.5));transform:scale(1.018)}}
    @keyframes weddingGalaxyDrift{to{transform:translate3d(3vw,-2vh,0) rotate(-8deg) scale(1.05);opacity:.6}}
    @keyframes weddingStarTwinkle{0%,100%{opacity:.16;transform:scale(.65)}50%{opacity:.95;transform:scale(1.45)}}
    @media(max-width:600px){.wedding-live-section{min-height:88svh;padding:82px 18px}.wedding-live-card{padding:44px 18px 46px;border-radius:25px}.wedding-live-button{min-width:0;width:100%;box-sizing:border-box}.wedding-live-modal{padding:12px}.wedding-live-modal-card{padding:52px 18px 32px}.wedding-live-rings{width:94px;height:94px;box-shadow:0 0 0 15px rgba(207,163,75,.08),0 0 0 30px rgba(207,163,75,.06)}.wedding-live-modal h3{margin-bottom:26px}.wedding-live-time{width:100%;box-sizing:border-box}.wedding-live-back{width:100%;justify-content:center}}
    @media(prefers-reduced-motion:reduce){.wedding-live-dot,.wedding-live-modal.show .wedding-live-modal-card,.wedding-live-modal h3,.wedding-live-galaxy,.wedding-live-star{animation:none}.wedding-live-modal h3{background:none;color:#d8aa4e;filter:none}.wedding-live-star{opacity:.45}}
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
    <div class="wedding-live-galaxy" aria-hidden="true"></div>
    <div class="wedding-live-stars" id="weddingLiveStars" aria-hidden="true"></div>
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

  const stars = document.getElementById('weddingLiveStars');
  const starColours = ['#f7f3ea', '#e4c986', '#b89a5a'];
  for (let i = 0; i < 28; i += 1) {
    const star = document.createElement('span');
    star.className = 'wedding-live-star';
    star.style.setProperty('--x', ((i * 37) % 97 + 1) + '%');
    star.style.setProperty('--y', ((i * 61) % 91 + 3) + '%');
    star.style.setProperty('--s', (i % 5 === 0 ? 4 : i % 3 === 0 ? 3 : 2) + 'px');
    star.style.setProperty('--d', (2.8 + (i % 7) * .55) + 's');
    star.style.setProperty('--delay', (-i * .31) + 's');
    star.style.setProperty('--c', starColours[i % starColours.length]);
    stars.appendChild(star);
  }

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
