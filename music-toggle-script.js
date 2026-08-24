
/* FINAL MUSIC TOGGLE + AUTOPLAY FIX */
function initWeddingMusic(){
  const music=document.getElementById("weddingMusic");
  const toggle=document.getElementById("musicToggle");
  if(!music)return;

  const setState=(playing)=>{
    if(!toggle)return;
    toggle.classList.toggle("playing",playing);
    toggle.setAttribute("aria-pressed",String(playing));
    toggle.setAttribute("aria-label",playing?"Music ON — click to turn music off":"Music OFF — click to turn music on");
    toggle.title=playing?"Music ON — click to switch off":"Music OFF — click to switch on";
    toggle.textContent=playing?"MUSIC ON":"MUSIC OFF";
  };

  /* Default visual state requested by the user. */
  setState(true);
  music.volume=1;

  const removeFallback=()=>{
    window.removeEventListener("pointerdown",startFirstInteraction,true);
    window.removeEventListener("touchstart",startFirstInteraction,true);
    window.removeEventListener("keydown",startFirstInteraction,true);
  };

  const startFirstInteraction=async()=>{
    if(!music.paused){
      setState(true);
      removeFallback();
      return;
    }
    try{
      await music.play();
      setState(true);
      removeFallback();
    }catch(e){
      setState(false);
    }
  };

  toggle?.addEventListener("click",async(e)=>{
    e.stopPropagation();
    if(music.paused){
      try{
        await music.play();
        setState(true);
        removeFallback();
      }catch(e){
        setState(false);
      }
    }else{
      music.pause();
      setState(false);
    }
  });

  music.addEventListener("play",()=>setState(true));
  music.addEventListener("pause",()=>setState(false));

  music.play()
    .then(()=>{
      setState(true);
      removeFallback();
    })
    .catch(()=>{
      /* Browser may block audible autoplay.
         Keep the switch visually ON and start on first interaction. */
      setState(true);
      window.addEventListener("pointerdown",startFirstInteraction,true);
      window.addEventListener("touchstart",startFirstInteraction,true);
      window.addEventListener("keydown",startFirstInteraction,true);
    });
}

document.addEventListener("DOMContentLoaded",initWeddingMusic);
