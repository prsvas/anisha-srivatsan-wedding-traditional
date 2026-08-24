/* SLIMMER CHIBI RITUAL ARTWORK — existing image replacement only.
   The Open Invitation and music controls are handled by script.js.
   Do not alter existing invitation layout or photos. */
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
});
