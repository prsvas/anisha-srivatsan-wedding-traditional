# Version 2 — Print Invitation

The PRINT / SAVE TRADITIONAL INVITATION control now:

1. asks for the recipient name;
2. offers Option 1 — English and Option 2 — Tamil;
3. loads the supplied original PDF for the selected language;
4. prints the entered name on page 1 immediately after “Smt. & Sri”;
5. generates a new PDF preserving all pages of the selected source file;
6. downloads the generated PDF and opens it in a new browser tab for printing.

Source files included in `assets/`:
- `Anisha_Srivatsan_Wedding_Invitation_English.pdf`
- `Anisha_Srivatsan_Wedding_Invitation_Tamil.pdf`

The Tamil selection uses the Tamil PDF. The English selection uses the English PDF.

Name placement update: recipient name is rendered in a larger font (18 pt, reduced only for long names) and positioned one row above the first writing line on Page 1, so it does not overlap the line.


## Final fixes applied
- Recipient name: 20 pt, positioned above the first blue writing line.
- Invitation PDFs: content margins reduced and Tamil invitation page 3 presented in landscape orientation to use the page more effectively.
- Event images: natural aspect ratio, no fixed-height crop, no forced stretching, high-resolution assets, eager loading for sharper presentation.
