// Verbatim Lockheed 10-E schematic SVGs, extracted from the approved Claude Design file.
// These are static markup (no interpolation); rendered via dangerouslySetInnerHTML to
// guarantee pixel-perfect fidelity of the hand-built SVG geometry.
/* eslint-disable */

export const PLAN_SVG = `
      <div style="display:flex;justify-content:space-between;font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:#756f64;margin-bottom:6px;">
        <span>Fig. 01 &mdash; Plan View</span><span>Not to scale</span>
      </div>
      <svg viewBox="0 0 1100 720" style="width:100%;height:auto;display:block;" font-family="'IBM Plex Mono', monospace">
        <defs>
          <pattern id="elgrid" width="26" height="26" patternUnits="userSpaceOnUse">
            <path d="M26 0H0V26" fill="none" stroke="rgba(28,27,24,0.06)" stroke-width="1"></path>
          </pattern>
        </defs>
        <rect x="0" y="0" width="1100" height="720" fill="url(#elgrid)"></rect>
        <!-- corner ticks -->
        <g stroke="#1c1b18" stroke-width="1.4" fill="none">
          <path d="M14 30V14H30"></path><path d="M1086 30V14H1070"></path>
          <path d="M14 690V706H30"></path><path d="M1086 690V706H1070"></path>
        </g>

        <!-- wing + tailplane (behind) -->
        <g stroke="#1c1b18" stroke-width="1.6" fill="#EEEAE1" stroke-linejoin="round">
          <rect x="175" y="238" width="750" height="92" rx="16"></rect>
          <rect x="438" y="556" width="224" height="56" rx="14"></rect>
        </g>
        <!-- nacelles (on the wing) -->
        <g stroke="#1c1b18" stroke-width="1.6" fill="#E3DED4" stroke-linejoin="round">
          <rect x="378" y="210" width="44" height="152" rx="20"></rect>
          <rect x="678" y="210" width="44" height="152" rx="20"></rect>
        </g>
        <!-- fuselage (on top) -->
        <g stroke="#1c1b18" stroke-width="1.7" fill="#DDD7CB" stroke-linejoin="round">
          <rect x="523" y="84" width="54" height="524" rx="27"></rect>
        </g>
        <!-- twin fins -->
        <g fill="#1c1b18"><rect x="440" y="548" width="34" height="12" rx="3"></rect><rect x="626" y="548" width="34" height="12" rx="3"></rect></g>
        <!-- cockpit + nose -->
        <line x1="534" y1="124" x2="566" y2="124" stroke="#1c1b18" stroke-width="1"></line>
        <circle cx="550" cy="88" r="4" fill="#B23A33"></circle>
        <!-- propellers (accent, facing forward) -->
        <g stroke="#B23A33" stroke-width="1.8"><line x1="360" y1="204" x2="440" y2="204"></line><line x1="660" y1="204" x2="740" y2="204"></line></g>
        <g fill="#B23A33"><circle cx="400" cy="204" r="4.5"></circle><circle cx="700" cy="204" r="4.5"></circle></g>

        <!-- wingspan dimension (horizontal) -->
        <g stroke="#1c1b18" stroke-width="1">
          <line x1="175" y1="168" x2="925" y2="168"></line>
          <line x1="175" y1="162" x2="175" y2="174"></line><line x1="925" y1="162" x2="925" y2="174"></line>
          <line x1="175" y1="238" x2="175" y2="168" stroke-dasharray="3 5" opacity="0.45"></line>
          <line x1="925" y1="238" x2="925" y2="168" stroke-dasharray="3 5" opacity="0.45"></line>
        </g>
        <text x="550" y="156" text-anchor="middle" font-size="14.5" fill="#1c1b18" letter-spacing="1">WINGSPAN &mdash; 55 ft 0 in &middot; 16.76 m</text>

        <!-- length dimension (vertical) -->
        <g stroke="#1c1b18" stroke-width="1">
          <line x1="118" y1="84" x2="118" y2="608"></line>
          <line x1="112" y1="84" x2="124" y2="84"></line><line x1="112" y1="608" x2="124" y2="608"></line>
          <line x1="523" y1="88" x2="118" y2="88" stroke-dasharray="3 5" opacity="0.4"></line>
          <line x1="523" y1="604" x2="118" y2="604" stroke-dasharray="3 5" opacity="0.4"></line>
        </g>
        <text x="100" y="346" transform="rotate(-90 100 346)" text-anchor="middle" font-size="14.5" fill="#1c1b18" letter-spacing="1">LENGTH &mdash; 38 ft 7 in &middot; 11.76 m</text>

        <!-- callouts -->
        <g stroke="#B23A33" stroke-width="1" fill="none"><path d="M722 300H840"></path></g>
        <g fill="#B23A33"><circle cx="722" cy="300" r="2.6"></circle></g>
        <text x="848" y="296" font-size="13" fill="#1c1b18">2 &times; P&amp;W R-1340 Wasp</text>
        <text x="848" y="314" font-size="11" fill="#756f64">600 hp radial, each</text>

        <g stroke="#B23A33" stroke-width="1" fill="none"><path d="M577 430H840"></path></g>
        <g fill="#B23A33"><circle cx="577" cy="430" r="2.6"></circle></g>
        <text x="848" y="426" font-size="13" fill="#1c1b18">Cabin fuel tanks</text>
        <text x="848" y="444" font-size="11" fill="#756f64">windows removed for range</text>

        <g stroke="#B23A33" stroke-width="1" fill="none"><path d="M660 554H840"></path></g>
        <g fill="#B23A33"><circle cx="660" cy="554" r="2.6"></circle></g>
        <text x="848" y="550" font-size="13" fill="#1c1b18">Twin tail</text>
        <text x="848" y="568" font-size="11" fill="#756f64">Kelly Johnson's idea</text>

        <g stroke="#B23A33" stroke-width="1" fill="none"><path d="M400 204V150H308"></path></g>
        <text x="300" y="146" text-anchor="end" font-size="13" fill="#1c1b18">Hamilton Standard props</text>
        <text x="300" y="164" text-anchor="end" font-size="11" fill="#756f64">two-blade, constant-speed</text>
      </svg>
`;

export const BLUEPRINT_SVG = `
      <div style="border:1.5px solid #1c1b18;background:#F3F1EB;border-radius:2px;">
  <div style="border:1px solid rgba(28,27,24,0.28);margin:6px;">
    <div style="position:relative;padding:10px 14px 2px;">
      <div style="position:absolute;top:14px;right:18px;font-family:'IBM Plex Mono', monospace;font-size:10.5px;color:#1c1b18;line-height:1.5;width:248px;">
        <div style="font-weight:500;letter-spacing:0.12em;border-bottom:1px solid rgba(28,27,24,0.3);padding-bottom:3px;margin-bottom:5px;">TECHNICAL NOTES</div>
        <div>1&nbsp;&nbsp;All dimensions approximate, after TIGHAR.</div>
        <div>2&nbsp;&nbsp;Powerplant 2 &times; P&amp;W Wasp S3H1, 600 hp.</div>
        <div>3&nbsp;&nbsp;Cabin tanks fitted in lieu of seats.</div>
      </div>
      <svg viewBox="0 0 1100 430" style="width:100%;height:auto;display:block;"><defs><pattern id="sgrid" width="26" height="26" patternUnits="userSpaceOnUse"><path d="M26 0H0V26" fill="none" stroke="rgba(28,27,24,0.06)" stroke-width="1"></path></pattern></defs><rect x="0" y="0" width="1100" height="430" fill="url(#sgrid)"></rect><line x1="60" y1="366" x2="1010" y2="366" stroke="#1c1b18" stroke-width="0.8" opacity="0.4" stroke-dasharray="2 5"></line><path d="M214 182 C190 150 162 120 142 112 C128 108 119 117 118 129 C117 150 126 174 142 196 L158 200 Z" fill="none" stroke="#1c1b18" stroke-width="1" opacity="0.3" stroke-dasharray="3 3" transform="translate(11 7)"></path><path d="M906 238 C906 213 884 186 846 174 C764 152 600 146 470 150 C360 153 252 162 198 178 L150 196 C150 198 151 200 154 206 L200 214 C300 240 470 268 600 276 C722 282 824 274 878 258 C898 251 906 246 906 238 Z" fill="rgba(28,27,24,0.05)" stroke="#1c1b18" stroke-width="1.6" stroke-linejoin="round"></path><path d="M204 178 C180 148 152 120 134 113 C120 109 111 118 110 130 C109 151 118 175 134 196 L158 200 Z" fill="rgba(28,27,24,0.06)" stroke="#1c1b18" stroke-width="1.5" stroke-linejoin="round"></path><path d="M126 140 C133 162 140 182 150 198" fill="none" stroke="#1c1b18" stroke-width="0.8" opacity="0.5"></path><path d="M158 202 C122 197 96 199 84 204 C98 209 124 212 160 209 Z" fill="rgba(28,27,24,0.05)" stroke="#1c1b18" stroke-width="1.4" stroke-linejoin="round"></path><line x1="172" y1="214" x2="170" y2="240" stroke="#1c1b18" stroke-width="1.3"></line><circle cx="169" cy="247" r="8" fill="none" stroke="#1c1b18" stroke-width="1.4"></circle><circle cx="169" cy="247" r="2" fill="#1c1b18"></circle><path d="M520 286 C560 282 690 282 716 286 C690 290 560 290 520 286 Z" fill="rgba(28,27,24,0.04)" stroke="#1c1b18" stroke-width="1" opacity="0.7"></path><path d="M610 222 C598 230 598 268 612 280 C656 296 698 290 710 270 C718 256 716 240 703 229 C688 217 634 214 610 222 Z" fill="rgba(28,27,24,0.08)" stroke="#1c1b18" stroke-width="1.5" stroke-linejoin="round"></path><path d="M690 222 C701 236 701 266 690 280" fill="none" stroke="#1c1b18" stroke-width="0.9" opacity="0.55"></path><path d="M614 224 C604 238 604 266 615 279" fill="none" stroke="#1c1b18" stroke-width="0.8" opacity="0.4"></path><ellipse cx="719" cy="249" rx="6.5" ry="86" fill="none" stroke="#B23A33" stroke-width="1.4"></ellipse><line x1="712" y1="249" x2="721" y2="249" stroke="#B23A33" stroke-width="1.4"></line><circle cx="716" cy="249" r="4" fill="#B23A33"></circle><line x1="634" y1="288" x2="648" y2="338" stroke="#1c1b18" stroke-width="1.5"></line><line x1="676" y1="286" x2="652" y2="338" stroke="#1c1b18" stroke-width="1.5"></line><circle cx="650" cy="346" r="18" fill="rgba(28,27,24,0.06)" stroke="#1c1b18" stroke-width="1.6"></circle><circle cx="650" cy="346" r="5" fill="none" stroke="#1c1b18" stroke-width="1.2"></circle><path d="M632 332 C640 322 662 322 672 330" fill="none" stroke="#1c1b18" stroke-width="1" opacity="0.6"></path><path d="M810 176 L840 178 L836 192 L804 190 Z" fill="none" stroke="#1c1b18" stroke-width="1.1"></path><line x1="820" y1="177" x2="817" y2="191" stroke="#1c1b18" stroke-width="0.8"></line><rect x="746" y="183" width="13" height="13" rx="3" fill="none" stroke="#1c1b18" stroke-width="1"></rect><rect x="710" y="183" width="13" height="13" rx="3" fill="none" stroke="#1c1b18" stroke-width="1"></rect><rect x="674" y="183" width="13" height="13" rx="3" fill="none" stroke="#1c1b18" stroke-width="1"></rect><rect x="638" y="183" width="13" height="13" rx="3" fill="none" stroke="#1c1b18" stroke-width="1"></rect><rect x="602" y="183" width="13" height="13" rx="3" fill="none" stroke="#1c1b18" stroke-width="1"></rect><rect x="566" y="183" width="13" height="13" rx="3" fill="none" stroke="#1c1b18" stroke-width="1"></rect><rect x="530" y="183" width="13" height="13" rx="3" fill="none" stroke="#1c1b18" stroke-width="1"></rect><rect x="494" y="183" width="13" height="13" rx="3" fill="none" stroke="#1c1b18" stroke-width="1"></rect><rect x="458" y="183" width="13" height="13" rx="3" fill="none" stroke="#1c1b18" stroke-width="1"></rect><rect x="452" y="198" width="26" height="50" rx="3" fill="none" stroke="#1c1b18" stroke-width="1" opacity="0.7"></rect><g font-family="'IBM Plex Mono', monospace" font-size="12" fill="#1c1b18" letter-spacing="0.5"><path d="M470 189 V120" fill="none" stroke="#1c1b18" stroke-width="0.8"></path><circle cx="470" cy="189" r="1.7" fill="none" stroke="#1c1b18" stroke-width="0.9"></circle><text x="470" y="112" text-anchor="middle" font-size="12">CABIN FUEL TANKS</text><path d="M138 150 V118 H96" fill="none" stroke="#1c1b18" stroke-width="0.8"></path><circle cx="138" cy="150" r="1.7" fill="none" stroke="#1c1b18" stroke-width="0.9"></circle><text x="90" y="114" text-anchor="end" font-size="12">TWIN FIN</text><path d="M340 256 V322 H300" fill="none" stroke="#1c1b18" stroke-width="0.8"></path><circle cx="340" cy="256" r="1.7" fill="none" stroke="#1c1b18" stroke-width="0.9"></circle><text x="294" y="326" text-anchor="end" font-size="12">MONOCOQUE FUSELAGE</text><path d="M704 232 V322 H760" fill="none" stroke="#1c1b18" stroke-width="0.8"></path><circle cx="704" cy="232" r="1.7" fill="none" stroke="#1c1b18" stroke-width="0.9"></circle><text x="766" y="319" font-size="12">RADIAL ENGINE</text><text x="766" y="333" font-size="10" fill="#756f64">P&amp;W WASP &middot; 600 HP</text><path d="M668 350 V360 H760" fill="none" stroke="#1c1b18" stroke-width="0.8"></path><circle cx="668" cy="350" r="1.7" fill="none" stroke="#1c1b18" stroke-width="0.9"></circle><text x="766" y="363" font-size="12">RETRACTABLE GEAR</text><text x="250" y="172" font-size="12" fill="#1c1b18" letter-spacing="1">NR 16020</text><g stroke="#1c1b18" stroke-width="0.9"><line x1="150" y1="402" x2="906" y2="402"></line><line x1="150" y1="396" x2="150" y2="408"></line><line x1="906" y1="396" x2="906" y2="408"></line></g><text x="528" y="420" text-anchor="middle" font-size="12" letter-spacing="1">38 ft 7 in &middot; 11.76 m</text></g></svg>
    </div>
    <div style="display:flex;border-top:1.5px solid #1c1b18;">
      <div style="flex:0 0 auto;padding:13px 18px;border-right:1px solid rgba(28,27,24,0.3);display:flex;flex-direction:column;gap:7px;justify-content:center;">
        <div style="font-family:'IBM Plex Mono', monospace;font-size:10px;letter-spacing:0.16em;color:#756f64;">SCALE 1:72</div>
        <div style="display:flex;"><div style="width:14px;height:7px;background:#1c1b18;border:0.5px solid #1c1b18;"></div><div style="width:14px;height:7px;background:transparent;border:0.5px solid #1c1b18;"></div><div style="width:14px;height:7px;background:#1c1b18;border:0.5px solid #1c1b18;"></div><div style="width:14px;height:7px;background:transparent;border:0.5px solid #1c1b18;"></div><div style="width:14px;height:7px;background:#1c1b18;border:0.5px solid #1c1b18;"></div><div style="width:14px;height:7px;background:transparent;border:0.5px solid #1c1b18;"></div><div style="width:14px;height:7px;background:#1c1b18;border:0.5px solid #1c1b18;"></div><div style="width:14px;height:7px;background:transparent;border:0.5px solid #1c1b18;"></div></div>
        <div style="font-family:'IBM Plex Mono', monospace;font-size:9px;color:#756f64;display:flex;justify-content:space-between;width:112px;"><span>0</span><span>5</span><span>10 m</span></div>
      </div>
      <div style="flex:1;padding:13px 22px;border-right:1px solid rgba(28,27,24,0.3);display:flex;flex-direction:column;justify-content:center;">
        <div style="font-family:'Newsreader',serif;font-size:23px;letter-spacing:0.04em;line-height:1.05;">LOCKHEED MODEL 10-E ELECTRA</div>
        <div style="font-family:'IBM Plex Mono', monospace;font-size:10px;letter-spacing:0.16em;color:#756f64;margin-top:5px;">GENERAL ARRANGEMENT &middot; SIDE ELEVATION</div>
      </div>
      <div style="flex:0 0 auto;padding:13px 20px;display:flex;flex-direction:column;justify-content:center;gap:6px;font-family:'IBM Plex Mono', monospace;font-size:10px;color:#1c1b18;white-space:nowrap;">
        <div><span style="color:#756f64;">REG&nbsp;&nbsp;</span>NR 16020</div>
        <div><span style="color:#756f64;">DWG&nbsp;&nbsp;</span>10E-GA-01</div>
        <div><span style="color:#756f64;">REV&nbsp;&nbsp;</span>A &mdash; 1937</div>
      </div>
    </div>
  </div>
</div>
`;

export const PERSPECTIVE_SVG = `
      <div style="display:flex;justify-content:space-between;font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:#756f64;margin-bottom:6px;"><span>Fig. 02 &mdash; Three-Quarter Perspective</span><span>Isometric</span></div>
      <svg viewBox="0 0 1100 640" style="width:100%;height:auto;display:block;"><defs><pattern id="pgrid" width="26" height="26" patternUnits="userSpaceOnUse"><path d="M26 0H0V26" fill="none" stroke="rgba(28,27,24,0.06)" stroke-width="1"></path></pattern></defs><rect x="0" y="0" width="1100" height="640" fill="url(#pgrid)"></rect><path d="M501.2 253.6 L624.3 323.5 L975.5 112.1 L917.3 78.8 Z" fill="rgba(28,27,24,0.035)" stroke="#1c1b18" stroke-width="1.3" stroke-linejoin="round"></path><path d="M426.3 296.9 L547.8 366.8 L183.3 569.8 L125.0 536.5 Z" fill="rgba(28,27,24,0.05)" stroke="#1c1b18" stroke-width="1.4" stroke-linejoin="round"></path><g fill="none" stroke="#1c1b18" stroke-width="0.9" opacity="0.42"><path d="M283.1 132.1 L283.1 128.8 L284.8 125.4 L286.5 122.1 L289.8 120.5 L291.5 118.8 L294.8 118.8 L296.4 118.8 L298.1 122.1 L298.1 123.8 L298.1 128.8 L296.4 132.1 L294.8 135.4 L291.5 137.1 L289.8 138.8 L286.5 138.8 L284.8 138.8 L283.1 135.4 L283.1 132.1"></path><path d="M294.8 158.7 L296.4 147.1 L301.4 135.4 L306.4 123.8 L314.8 115.5 L323.1 110.5 L331.4 110.5 L338.1 113.8 L343.1 120.5 L344.7 132.1 L343.1 143.8 L338.1 155.4 L331.4 167.1 L323.1 175.4 L314.8 180.4 L306.4 180.4 L301.4 177.0 L296.4 170.4 L294.8 160.4"></path><path d="M311.4 183.7 L313.1 165.4 L319.8 147.1 L329.7 130.4 L341.4 117.1 L354.7 108.8 L366.4 108.8 L376.3 113.8 L383.0 125.4 L386.3 140.4 L383.0 158.7 L376.3 177.0 L366.4 193.7 L354.7 207.0 L341.4 215.3 L329.7 215.3 L319.8 210.3 L313.1 198.7 L311.4 183.7"></path><path d="M344.7 213.7 L348.0 190.4 L356.4 168.7 L368.0 147.1 L383.0 132.1 L399.6 122.1 L414.6 120.5 L426.3 127.1 L434.6 140.4 L437.9 160.4 L434.6 183.7 L426.3 205.3 L414.6 227.0 L399.6 242.0 L383.0 251.9 L368.0 253.6 L356.4 246.9 L348.0 233.6 L344.7 213.7"></path><path d="M398.0 248.6 L401.3 225.3 L411.3 200.3 L424.6 177.0 L439.6 158.7 L457.9 148.7 L474.5 147.1 L487.9 155.4 L496.2 170.4 L499.5 190.4 L496.2 215.3 L487.9 240.3 L474.5 263.6 L457.9 281.9 L439.6 291.9 L424.6 293.5 L411.3 285.2 L401.3 270.2 L398.0 250.3"></path><path d="M469.5 291.9 L472.9 266.9 L481.2 240.3 L496.2 218.7 L512.8 200.3 L529.5 190.4 L546.1 188.7 L561.1 195.3 L569.4 210.3 L572.7 232.0 L569.4 256.9 L561.1 283.6 L546.1 305.2 L529.5 323.5 L512.8 333.5 L496.2 335.2 L481.2 328.5 L472.9 313.5 L469.5 291.9"></path><path d="M542.8 331.8 L546.1 308.5 L554.4 283.6 L567.7 260.3 L584.4 243.6 L602.7 233.6 L617.7 232.0 L631.0 238.6 L639.3 253.6 L642.6 275.2 L639.3 298.5 L631.0 323.5 L617.7 346.8 L602.7 363.5 L584.4 373.4 L567.7 375.1 L554.4 368.4 L546.1 353.5 L542.8 331.8"></path><path d="M622.7 370.1 L624.3 348.5 L632.7 326.8 L644.3 308.5 L657.6 293.5 L672.6 283.6 L687.6 283.6 L699.2 288.6 L705.9 301.9 L709.2 320.2 L705.9 341.8 L699.2 363.5 L687.6 381.8 L672.6 396.7 L657.6 406.7 L644.3 406.7 L632.7 401.7 L624.3 388.4 L622.7 370.1"></path><path d="M689.2 398.4 L692.6 381.8 L697.6 365.1 L705.9 350.1 L717.5 338.5 L729.2 331.8 L739.2 330.2 L749.2 335.2 L754.2 345.1 L755.8 358.5 L754.2 375.1 L749.2 391.7 L739.2 406.7 L729.2 418.4 L717.5 425.0 L705.9 426.7 L697.6 421.7 L692.6 411.7 L689.2 398.4"></path><path d="M760.8 423.4 L762.5 413.4 L765.8 403.4 L770.8 395.1 L777.5 386.8 L784.1 383.4 L790.8 383.4 L795.8 385.1 L799.1 391.7 L800.8 400.1 L799.1 410.1 L795.8 420.0 L790.8 428.4 L784.1 436.7 L777.5 440.0 L770.8 440.0 L765.8 438.3 L762.5 431.7 L760.8 423.4"></path><path d="M844.0 451.7 L844.0 450.0 L844.0 448.3 L845.7 446.7 L845.7 445.0 L847.4 445.0 L849.0 445.0 L849.0 445.0 L850.7 446.7 L850.7 448.3 L850.7 450.0 L849.0 451.7 L849.0 453.3 L847.4 455.0 L845.7 455.0 L845.7 455.0 L844.0 455.0 L844.0 453.3 L844.0 451.7"></path></g><g fill="none" stroke="#1c1b18" stroke-width="1.2" stroke-linecap="round" opacity="0.9"><path d="M289.8 118.8 L319.8 112.1 L348.0 112.1 L391.3 125.4 L449.6 153.7 L521.1 193.7 L592.7 237.0 L665.9 288.6 L722.5 335.2 L780.8 385.1 L847.4 445.0"></path><path d="M289.8 138.8 L319.8 178.7 L348.0 212.0 L391.3 248.6 L449.6 286.9 L521.1 330.2 L592.7 370.1 L665.9 401.7 L722.5 421.7 L780.8 438.3 L847.4 455.0"></path><path d="M283.1 132.1 L294.8 158.7 L311.4 183.7 L344.7 213.7 L398.0 248.6 L469.5 291.9 L542.8 331.8 L622.7 370.1 L689.2 398.4 L760.8 423.4 L844.0 451.7"></path><path d="M298.1 123.8 L344.7 132.1 L386.3 140.4 L437.9 160.4 L499.5 190.4 L572.7 232.0 L642.6 275.2 L709.2 320.2 L755.8 358.5 L800.8 400.1 L850.7 448.3"></path><path d="M296.4 118.8 L338.1 113.8 L376.3 113.8 L426.3 127.1 L487.9 155.4 L561.1 195.3 L631.0 238.6 L699.2 288.6 L749.2 335.2 L795.8 385.1 L849.0 445.0"></path><path d="M284.8 125.4 L299.8 135.4 L319.8 147.1 L356.4 168.7 L409.6 200.3 L481.2 242.0 L554.4 283.6 L632.7 328.5 L697.6 365.1 L765.8 403.4 L844.0 448.3"></path></g><path d="M802.4 395.1 L865.7 431.7 L957.2 376.8 L917.3 353.5 Z" fill="rgba(28,27,24,0.035)" stroke="#1c1b18" stroke-width="1.3" stroke-linejoin="round"></path><path d="M759.1 420.0 L822.4 456.7 L725.9 509.9 L687.6 486.6 Z" fill="rgba(28,27,24,0.05)" stroke="#1c1b18" stroke-width="1.3" stroke-linejoin="round"></path><path d="M899.0 343.5 L913.9 290.2 L942.2 305.2 L957.2 376.8" fill="none" stroke="#1c1b18" stroke-width="1.3" stroke-linejoin="round"></path><path d="M667.6 476.6 L682.6 423.4 L710.9 438.3 L727.5 509.9" fill="none" stroke="#1c1b18" stroke-width="1.3" stroke-linejoin="round"></path><g fill="none" stroke="#1c1b18" stroke-width="1.3" stroke-linejoin="round"><path d="M536.1 183.7 L536.1 173.7 L541.1 162.1 L546.1 152.1 L552.8 145.4 L561.1 140.4 L567.7 140.4 L574.4 143.8 L577.7 150.4 L579.4 158.7 L577.7 168.7 L574.4 180.4 L567.7 190.4 L561.1 197.0 L552.8 202.0 L546.1 202.0 L541.1 198.7 L536.1 192.0 L536.1 183.7"></path><path d="M665.9 258.6 L665.9 248.6 L670.9 237.0 L675.9 227.0 L682.6 220.3 L690.9 215.3 L697.6 215.3 L704.2 218.7 L707.5 225.3 L709.2 233.6 L707.5 243.6 L704.2 255.3 L697.6 265.3 L690.9 271.9 L682.6 276.9 L675.9 276.9 L670.9 273.6 L665.9 266.9 L665.9 258.6"></path><path d="M557.8 142.1 L687.6 217.0"></path><path d="M557.8 200.3 L687.6 275.2"></path><path d="M536.1 183.7 L665.9 258.6"></path><path d="M579.4 158.7 L709.2 233.6"></path><path d="M276.5 333.5 L278.1 323.5 L281.5 311.9 L286.5 301.9 L294.8 295.2 L301.4 290.2 L308.1 290.2 L314.8 293.5 L318.1 300.2 L319.8 308.5 L318.1 318.5 L314.8 330.2 L308.1 340.1 L301.4 346.8 L294.8 351.8 L286.5 351.8 L281.5 348.5 L278.1 341.8 L276.5 333.5"></path><path d="M406.3 408.4 L408.0 398.4 L411.3 386.8 L416.3 376.8 L422.9 370.1 L431.3 365.1 L437.9 365.1 L444.6 368.4 L447.9 375.1 L449.6 383.4 L447.9 393.4 L444.6 405.1 L437.9 415.0 L431.3 421.7 L422.9 426.7 L416.3 426.7 L411.3 423.4 L408.0 416.7 L406.3 408.4"></path><path d="M298.1 291.9 L427.9 366.8"></path><path d="M298.1 350.1 L427.9 425.0"></path><path d="M276.5 333.5 L406.3 408.4"></path><path d="M319.8 308.5 L449.6 383.4"></path></g><g fill="none" stroke="#B23A33" stroke-width="1.4" stroke-linejoin="round"><path d="M481.2 203.7 L482.9 180.4 L489.5 153.7 L499.5 130.4 L514.5 108.8 L529.5 90.5 L547.8 77.2 L564.4 70.5 L581.1 70.5 L594.4 75.5 L604.4 88.8 L611.0 105.5 L612.7 127.1 L611.0 150.4 L604.4 177.0 L594.4 200.3 L581.1 222.0 L564.4 240.3 L547.8 253.6 L529.5 260.3 L514.5 260.3 L499.5 255.3 L489.5 242.0 L482.9 225.3 L481.2 203.7"></path><path d="M547.8 165.4L547.8 80.5"></path><path d="M547.8 165.4L547.8 250.3"></path><path d="M547.8 165.4L491.2 157.1"></path><path d="M547.8 165.4L602.7 173.7"></path><path d="M221.6 353.5 L223.2 330.2 L229.9 303.5 L241.5 280.2 L254.8 258.6 L269.8 240.3 L288.1 227.0 L304.8 220.3 L321.4 220.3 L334.7 225.3 L344.7 238.6 L351.4 255.3 L354.7 276.9 L351.4 300.2 L344.7 326.8 L334.7 350.1 L321.4 371.8 L304.8 390.1 L288.1 403.4 L269.8 410.1 L254.8 410.1 L241.5 405.1 L229.9 391.7 L223.2 375.1 L221.6 353.5"></path><path d="M288.1 315.2L288.1 230.3"></path><path d="M288.1 315.2L288.1 400.1"></path><path d="M288.1 315.2L231.5 306.9"></path><path d="M288.1 315.2L343.1 323.5"></path></g><g fill="#B23A33"><circle cx="547.1" cy="165.4" r="3.5"></circle><circle cx="287.7" cy="315.2" r="3.5"></circle></g><g font-family="'IBM Plex Mono', monospace"><g stroke="#1c1b18" stroke-width="0.9"><line x1="210" y1="230" x2="210" y2="400"></line><line x1="205" y1="230" x2="215" y2="230"></line><line x1="205" y1="400" x2="215" y2="400"></line></g><text x="198" y="315" transform="rotate(-90 198 315)" text-anchor="middle" font-size="12.5" fill="#1c1b18">PROP &#8960; 2.74 m</text><path d="M298 126 L356 96" fill="none" stroke="#B23A33" stroke-width="0.9"></path><circle cx="298" cy="126" r="2.4" fill="#B23A33"></circle><text x="362" y="92" font-size="13" fill="#1c1b18">NR 16020</text><path d="M372 360 L372 430 H300" fill="none" stroke="#B23A33" stroke-width="0.9"></path><circle cx="372" cy="360" r="2.4" fill="#B23A33"></circle><text x="292" y="427" text-anchor="end" font-size="13" fill="#1c1b18">P&amp;W Wasp S3H1</text><text x="292" y="444" text-anchor="end" font-size="11" fill="#756f64">600 hp radial, each</text><path d="M712 450 H840" fill="none" stroke="#B23A33" stroke-width="0.9"></path><circle cx="712" cy="450" r="2.4" fill="#B23A33"></circle><text x="848" y="446" font-size="13" fill="#1c1b18">Twin tail</text><text x="848" y="463" font-size="11" fill="#756f64">Kelly Johnson's idea</text><text x="120" y="468" font-size="11" fill="#756f64" letter-spacing="1">ISOMETRIC PROJECTION &#183; NOT TO SCALE</text></g></svg>
`;
