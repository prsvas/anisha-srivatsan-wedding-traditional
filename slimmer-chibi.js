/* SLIMMER CHIBI RITUAL ARTWORK — 2026-08-24
   Existing ritual artwork replacement + wedding invitation open/music enhancement.
   No existing photos, sections, wording, layout or invitation functionality is changed.
*/
document.addEventListener("DOMContentLoaded", () => {
  const map = {
    "kasi": "assets/kasi-yathra.jpg",
    "oonjal": "assets/oonjal.jpg",
    "malai": "assets/malai-maatral.jpg",
    "kanya": "assets/kanyadanam.jpg",
    "mangalya": "assets/mangalya-dharanam.jpg",
    "sapthapadi": "assets/sapthapadi.jpg",
    "ammi": "assets/ammi-midhithal.jpg",
    "metti": "assets/metti-dharanam.jpg",
    "arundhati": "assets/arundhati-darshan.jpg",
    "asirvadam": "assets/asirvadam.jpg",
    "bhojanam": "assets/tamil-iyer-bhojanam.jpg",
    "nelangu": "assets/nelangu.jpg"
  };

  Object.entries(map).forEach(([key, src]) => {
    const block = document.querySelector(`.event-photo.${key}`);
    const img = block?.querySelector("img");
    if (img) {
      img.src = src;
      img.removeAttribute("srcset");
      img.loading = "lazy";
      img.decoding = "async";
    }
  });

  /* OPEN INVITATION — first-page action only. */
  const hero = document.querySelector(".hero");
  const couple = document.getElementById("couple");
  const music = document.getElementById("weddingMusic");
  const toggle = document.getElementById("musicToggle");

  if (hero && couple && !document.getElementById("openInvitation")) {
    const button = document.createElement("button");
    button.id = "openInvitation";
    button.type = "button";
    button.className = "open-invitation-button";
    button.textContent = "OPEN INVITATION";
    button.setAttribute("aria-label", "Open Invitation");

    const heroContent = hero.querySelector(".hero-content");
    (heroContent || hero).appendChild(button);

    button.addEventListener("click", async () => {
      couple.scrollIntoView({ behavior: "smooth", block: "start" });
      if (music) {
        try {
          await music.play();
          setMusicState(true);
        } catch (e) {
          console.warn("Wedding music could not start automatically:", e);
        }
      }
    });
  }

  function setMusicState(playing) {
    if (!toggle) return;
    toggle.classList.toggle("playing", playing);
    toggle.setAttribute("aria-pressed", String(playing));
    toggle.setAttribute("aria-label", playing ? "Turn wedding music off" : "Turn wedding music on");
    const icon = toggle.querySelector("span");
    if (icon) icon.textContent = playing ? "♫" : "🔇";
    toggle.title = playing ? "Music ON — click to switch off" : "Music OFF — click to switch on";
  }

  /* Music is ON by default where the browser permits audible autoplay.
     The Open Invitation button is the guaranteed user-gesture fallback. */
  if (music) {
    music.volume = 1;
    const startMusic = async () => {
      try {
        await music.play();
        setMusicState(true);
      } catch (e) {
        setMusicState(false);
        console.info("Autoplay blocked by browser; Open Invitation will start the music.");
      }
    };
    startMusic();

    /* Keep the existing toggle behavior but make the state explicitly ON/OFF. */
    if (toggle) {
      toggle.addEventListener("click", async (event) => {
        event.stopImmediatePropagation();
        if (music.paused) {
          try {
            await music.play();
            setMusicState(true);
          } catch (e) {
            setMusicState(false);
          }
        } else {
          music.pause();
          setMusicState(false);
        }
      }, true);
    }
  }

  const style = document.createElement("style");
  style.id = "open-invitation-music-enhancement";
  style.textContent = `
    .open-invitation-button{
      position:relative;
      z-index:3;
      display:inline-flex;
      align-items:center;
      justify-content:center;
      margin-top:28px;
      padding:14px 30px;
      border:1px solid #e4d3a3;
      border-radius:2px;
      background:rgba(48,72,61,.82);
      color:#fff;
      font:600 10px Inter,Arial,sans-serif;
      letter-spacing:.18em;
      cursor:pointer;
      box-shadow:0 8px 24px rgba(0,0,0,.18);
      transition:transform .25s ease,background .25s ease,box-shadow .25s ease;
    }
    .open-invitation-button:hover{transform:translateY(-2px);background:#30483d;box-shadow:0 10px 28px rgba(0,0,0,.24)}
    .open-invitation-button:focus-visible{outline:2px solid #e4d3a3;outline-offset:4px}
    .music-toggle.playing{opacity:1}
  `;
  document.head.appendChild(style);
});
