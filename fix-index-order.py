from pathlib import Path
p = Path("index.html")
s = p.read_text(encoding="utf-8")

old = """    <div class="muhurtham-row"><span><b>01</b> Kasi Yathra</span></div>
    <div class="muhurtham-row"><span><b>02</b> Oonjal</span></div>
    <div class="muhurtham-row"><span><b>03</b> Malai Maatral</span></div>"""
new = """    <div class="muhurtham-row"><span><b>01</b> Kasi Yathra</span></div>
    <div class="muhurtham-row"><span><b>02</b> Malai Maatral</span></div>
    <div class="muhurtham-row"><span><b>03</b> Oonjal</span></div>"""
if old not in s:
    raise SystemExit("Muhurtham block not found; no change made.")
s=s.replace(old,new,1)

old = """<article class="event reverse reveal"><div class="event-photo oonjal"><img src="assets/hq-oonjal.jpg" alt="" loading="lazy" decoding="async"></div><div class="event-number">02</div><div><div class="eyebrow">FAMILY TRADITION</div><h3>Oonjal</h3><div class="place">A joyful family ceremony</div><p>The gentle swing celebrates balance, companionship and the promise of standing together through every season of life.</p></div></article>
<article class="event reveal"><div class="event-photo malai"><img src="assets/hq-malai-maatral.jpg" alt="" loading="lazy" decoding="async"></div><div class="event-number">03</div><div><div class="eyebrow">JOYFUL UNION</div><h3>Malai Maatral</h3><div class="place">Exchange of garlands</div><p>The bride and groom exchange garlands in a joyful expression of mutual acceptance, witnessed by their families and loved ones.</p></div></article>"""
new = """<article class="event reveal"><div class="event-photo malai"><img src="assets/hq-malai-maatral.jpg" alt="" loading="lazy" decoding="async"></div><div class="event-number">02</div><div><div class="eyebrow">JOYFUL UNION</div><h3>Malai Maatral</h3><div class="place">Exchange of garlands</div><p>The bride and groom exchange garlands in a joyful expression of mutual acceptance, witnessed by their families and loved ones.</p></div></article>
<article class="event reverse reveal"><div class="event-photo oonjal"><img src="assets/hq-oonjal.jpg" alt="" loading="lazy" decoding="async"></div><div class="event-number">03</div><div><div class="eyebrow">FAMILY TRADITION</div><h3>Oonjal</h3><div class="place">A joyful family ceremony</div><p>The gentle swing celebrates balance, companionship and the promise of standing together through every season of life.</p></div></article>"""
if old not in s:
    raise SystemExit("Sacred Traditions block not found; no change made.")
s=s.replace(old,new,1)
p.write_text(s,encoding="utf-8")
print("Corrected index.html successfully.")
