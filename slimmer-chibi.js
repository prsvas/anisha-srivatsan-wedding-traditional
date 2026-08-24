/* SLIMMER CHIBI RITUAL ARTWORK — 2026-08-24
   Replaces only the 12 illustrated ritual event artworks.
   The Auspicious Beginning is a complete image in index.html, so no
   separate JavaScript replacement or duplicate text is used there.
   Regular bride/groom photographs and all other invitation imagery remain untouched.
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
});
