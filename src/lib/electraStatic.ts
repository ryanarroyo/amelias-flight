// Verbatim static Electra-page markup, extracted from the approved Claude Design file.
// Rendered via dangerouslySetInnerHTML for pixel-perfect fidelity (no interpolation/state).
/* eslint-disable */

export const ELECTRA_HEADER = `
    <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-end;gap:18px;border-bottom:1.5px solid #1c1b18;padding-bottom:22px;">
      <div>
        <div style="font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#B23A33;margin-bottom:14px;">The Aircraft</div>
        <h1 style="font-family:'Newsreader',serif;font-weight:400;font-size:clamp(34px,5.6vw,68px);line-height:1.0;letter-spacing:-0.02em;margin:0;">Lockheed Model 10-E Electra</h1>
      </div>
      <div style="font-family:'IBM Plex Mono',monospace;font-size:11px;line-height:1.7;color:#756f64;text-align:right;">
        <div style="color:#1c1b18;">REG. NR16020</div>
        <div>&ldquo;10E Special&rdquo;</div>
        <div>c/n 1055 &middot; 1936</div>
      </div>
    </div>

    <p style="font-family:'Newsreader',serif;font-size:clamp(18px,2.1vw,24px);line-height:1.5;max-width:680px;margin:26px 0 0;color:#2b2924;">An all-metal twin-engine monoplane, fast and modern for its day — and, in Earhart's hands, stripped of its passenger cabin and packed with fuel for an attempt at the whole world.</p>
`;

export const ELECTRA_BODY = `
    <!-- PERFORMANCE GAUGES -->
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:1px;background:rgba(28,27,24,0.12);border:1px solid rgba(28,27,24,0.12);border-radius:5px;overflow:hidden;margin-top:40px;">
      <div style="background:#F6F4EF;padding:24px 22px;"><div style="font-family:'Newsreader',serif;font-size:clamp(30px,4vw,44px);line-height:1;color:#B23A33;">202<span style="font-size:16px;color:#756f64;"> mph</span></div><div style="font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#756f64;margin-top:9px;">Top speed</div></div>
      <div style="background:#F6F4EF;padding:24px 22px;"><div style="font-family:'Newsreader',serif;font-size:clamp(30px,4vw,44px);line-height:1;color:#B23A33;">~4,500<span style="font-size:16px;color:#756f64;"> mi</span></div><div style="font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#756f64;margin-top:9px;">Range, with cabin tanks</div></div>
      <div style="background:#F6F4EF;padding:24px 22px;"><div style="font-family:'Newsreader',serif;font-size:clamp(30px,4vw,44px);line-height:1;color:#B23A33;">19,400<span style="font-size:16px;color:#756f64;"> ft</span></div><div style="font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#756f64;margin-top:9px;">Service ceiling</div></div>
      <div style="background:#F6F4EF;padding:24px 22px;"><div style="font-family:'Newsreader',serif;font-size:clamp(30px,4vw,44px);line-height:1;color:#B23A33;">1,200<span style="font-size:16px;color:#756f64;"> hp</span></div><div style="font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#756f64;margin-top:9px;">Total power</div></div>
    </div>

    <!-- SPEC TABLE + FEATURES -->
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:clamp(30px,5vw,64px);margin-top:54px;">

      <div>
        <div style="font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#B23A33;margin-bottom:18px;">Specifications</div>
        <div style="display:flex;flex-direction:column;">
          <div style="display:flex;justify-content:space-between;gap:12px;padding:11px 0;border-bottom:1px solid rgba(28,27,24,0.1);"><span style="color:#756f64;font-size:13.5px;">Length</span><span style="font-family:'IBM Plex Mono',monospace;font-size:12.5px;text-align:right;">38 ft 7 in &middot; 11.76 m</span></div>
          <div style="display:flex;justify-content:space-between;gap:12px;padding:11px 0;border-bottom:1px solid rgba(28,27,24,0.1);"><span style="color:#756f64;font-size:13.5px;">Wingspan</span><span style="font-family:'IBM Plex Mono',monospace;font-size:12.5px;text-align:right;">55 ft 0 in &middot; 16.76 m</span></div>
          <div style="display:flex;justify-content:space-between;gap:12px;padding:11px 0;border-bottom:1px solid rgba(28,27,24,0.1);"><span style="color:#756f64;font-size:13.5px;">Height</span><span style="font-family:'IBM Plex Mono',monospace;font-size:12.5px;text-align:right;">10 ft 1 in &middot; 3.07 m</span></div>
          <div style="display:flex;justify-content:space-between;gap:12px;padding:11px 0;border-bottom:1px solid rgba(28,27,24,0.1);"><span style="color:#756f64;font-size:13.5px;">Wing area</span><span style="font-family:'IBM Plex Mono',monospace;font-size:12.5px;text-align:right;">458 sq ft &middot; 42.6 m&sup2;</span></div>
          <div style="display:flex;justify-content:space-between;gap:12px;padding:11px 0;border-bottom:1px solid rgba(28,27,24,0.1);"><span style="color:#756f64;font-size:13.5px;">Gross weight</span><span style="font-family:'IBM Plex Mono',monospace;font-size:12.5px;text-align:right;">~10,500 lb &middot; 4,760 kg</span></div>
          <div style="display:flex;justify-content:space-between;gap:12px;padding:11px 0;border-bottom:1px solid rgba(28,27,24,0.1);"><span style="color:#756f64;font-size:13.5px;">Powerplant</span><span style="font-family:'IBM Plex Mono',monospace;font-size:12.5px;text-align:right;">2 &times; P&amp;W R-1340 Wasp</span></div>
          <div style="display:flex;justify-content:space-between;gap:12px;padding:11px 0;border-bottom:1px solid rgba(28,27,24,0.1);"><span style="color:#756f64;font-size:13.5px;">Standard range</span><span style="font-family:'IBM Plex Mono',monospace;font-size:12.5px;text-align:right;">810 mi &middot; 1,300 km</span></div>
          <div style="display:flex;justify-content:space-between;gap:12px;padding:11px 0;border-bottom:1px solid rgba(28,27,24,0.1);"><span style="color:#756f64;font-size:13.5px;">Crew / seats</span><span style="font-family:'IBM Plex Mono',monospace;font-size:12.5px;text-align:right;">2 &middot; up to 10 pax</span></div>
          <div style="display:flex;justify-content:space-between;gap:12px;padding:11px 0;border-bottom:1px solid rgba(28,27,24,0.1);"><span style="color:#756f64;font-size:13.5px;">First flight</span><span style="font-family:'IBM Plex Mono',monospace;font-size:12.5px;text-align:right;">Feb 23, 1934</span></div>
          <div style="display:flex;justify-content:space-between;gap:12px;padding:11px 0;"><span style="color:#756f64;font-size:13.5px;">Total built</span><span style="font-family:'IBM Plex Mono',monospace;font-size:12.5px;text-align:right;">149 &middot; 15 were 10-E</span></div>
        </div>
        <div style="margin-top:20px;aspect-ratio:3/2;border:1px solid rgba(28,27,24,0.12);background:repeating-linear-gradient(45deg,#efece6,#efece6 9px,#e8e4dc 9px,#e8e4dc 18px);display:flex;align-items:flex-end;padding:11px;border-radius:3px;">
          <div style="font-family:'IBM Plex Mono',monospace;font-size:10px;color:#756f64;background:rgba(246,244,239,0.85);padding:4px 8px;border-radius:2px;">NR16020 at Burbank, 1937 &mdash; archival photo to be added</div>
        </div>
      </div>

      <div>
        <div style="font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#B23A33;margin-bottom:18px;">In the Metal</div>
        <div style="display:flex;flex-direction:column;gap:22px;">
          <div><h3 style="font-family:'Newsreader',serif;font-weight:500;font-size:19px;margin:0 0 6px;">First of its kind for Lockheed</h3><p style="font-size:14px;line-height:1.62;color:#3a372f;margin:0;">The Electra was Lockheed's first all-metal, twin-engined aircraft, built to compete with the Boeing 247 and Douglas DC-2 in the new age of fast metal airliners.</p></div>
          <div><h3 style="font-family:'Newsreader',serif;font-weight:500;font-size:19px;margin:0 0 6px;">Named for a star</h3><p style="font-size:14px;line-height:1.62;color:#3a372f;margin:0;">&ldquo;Electra&rdquo; is one of the Pleiades &mdash; the seven sisters &mdash; continuing Lockheed's habit of naming its aircraft for stars.</p></div>
          <div><h3 style="font-family:'Newsreader',serif;font-weight:500;font-size:19px;margin:0 0 6px;">A young Kelly Johnson</h3><p style="font-size:14px;line-height:1.62;color:#3a372f;margin:0;">Wind-tunnel testing at the University of Michigan was run in part by a student named Kelly Johnson, who urged the twin tail (a future Lockheed trademark) and went on to lead the Skunk Works and the SR-71.</p></div>
          <div><h3 style="font-family:'Newsreader',serif;font-weight:500;font-size:19px;margin:0 0 6px;">Built for a new rule</h3><p style="font-size:14px;line-height:1.62;color:#3a372f;margin:0;">When the U.S. barred single-engine aircraft from carrying paying passengers in late 1934, the twin-engine Electra was ready and waiting.</p></div>
          <div><h3 style="font-family:'Newsreader',serif;font-weight:500;font-size:19px;margin:0 0 6px;">Earhart's Special</h3><p style="font-size:14px;line-height:1.62;color:#3a372f;margin:0;">Her 10-E was modified with extra fuel tanks filling the cabin in place of passenger seats and windows &mdash; turning a short-haul airliner into a long-range machine for the Pacific.</p></div>
        </div>
      </div>
    </div>

    <p style="font-size:12.5px;line-height:1.7;color:#756f64;margin:46px 0 0;border-top:1px solid rgba(28,27,24,0.1);padding-top:22px;">Airframe figures from <em>Jane's All the World's Aircraft, 1937</em>, via Wikipedia. Performance figures are typical published values for the 600 hp Model 10-E and vary across sources; Earhart's ferry range reflects her aircraft's added cabin tankage. Schematic is diagrammatic and not to scale.</p>
    <div style="font-family:'Newsreader',serif;font-style:italic;font-size:15px;color:#756f64;margin-top:18px;">Built as a tribute.</div>
`;
