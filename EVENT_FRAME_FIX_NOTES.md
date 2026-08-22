# Event Photo Frame Fix

Checked the 12 event images. The page CSS already uses `object-fit: contain` and therefore was not causing the missing heads. The affected artwork itself was tightly cropped at the source level.

Updated the first five affected event assets with full-frame versions: Kasi Yathra, Oonjal, Malai Maatral, Kanyadanam and Mangalya Dharanam. The remaining seven event images were left unchanged because their subjects are fully inside the supplied artwork.

Also retained the previously requested recipient-name lift in `script.js` (`y:430`).
