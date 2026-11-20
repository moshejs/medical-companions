
/* =============== 1.1 what MS is =============== */
const WH_STEPS=[
 {from:0,at:.2,k:'Step 1 · The numbers',t:'About 2.8 to 3.1 million people',
  txt:'The Atlas of MS, 3rd edition (country survey 2019–2020, 115 countries covering 87% of the world population) estimated <b>2.8 million</b> people living with MS, a prevalence of 35.9 per 100,000. MSIF\'s 2024 update (133 countries, 93% of the world population) estimated <b>3.1 million</b> and 38.1 per 100,000. They are two estimates made with different coverage and methods, not one count that grew by 300,000. [[Walton2020,King2026]] Among countries that reported in both 2013 and 2020, prevalence by WHO region in 2020 ran from 142.8 per 100,000 in Europe to 4.8 in the Western Pacific. [[Walton2020]]',
  pt:'Roughly three million people in the world live with MS. It is far more common in Europe and the Americas than in Africa or East Asia.',
  hook:'Atlas of MS 2020: <b>2.8 million, 35.9 per 100,000</b>. MSIF 2024 update: <b>3.1 million, 38.1 per 100,000</b>. Incidence 2.1 per 100,000 a year: a new diagnosis about every 5 minutes. [[Walton2020,King2026]]'},
 {from:.25,at:.45,k:'Step 2 · Who',t:'Mostly women, mostly young adults',
  txt:'Worldwide, women are about twice as likely as men to have MS, and in some countries the ratio reaches 4 to 1. [[Walton2020]] In the US in 2010 it was 2.8. [[Wallin2019]] Among 27,074 Canadians with MS the ratio rose with birth year for at least 50 years, past 3.2 to 1, which the authors put down to environmental causes. [[Orton2006]] The mean age at diagnosis is 32, with country means from 20 to 50. [[Walton2020]] About 3–5% of people with MS have their first attack in childhood. [[Bigi2012]] The progressive phase starts at a median age of about 39–40, whether it follows relapses or is there from onset. [[Confavreux2006]]',
  pt:'MS usually starts in young adulthood, and women get it two to three times as often as men. Children and older adults can get it too, but less often.',
  hook:'Female to male about <b>2–3 : 1</b> and rising. Mean age at diagnosis <b>32</b>. [[Walton2020,Wallin2019,Orton2006]]'},
 {from:.5,at:.7,k:'Step 3 · Where people live',t:'Further from the equator, more MS',
  txt:'<span class="ev est">Established</span> A meta-analysis of 880 prevalence points found that prevalence rises by 5.27 per 100,000 for each degree of latitude (4.34 after age standardisation), and that the gradient has grown stronger since 2011. [[Simpson2019]] In the US the rise was 16.3 per 100,000 per degree, after adjusting for race, ethnicity, age and sex. [[Hittle2023]] Israel has no national registry. In the Clalit Health Services database, prevalence was 68 per 100,000 at the end of 2011, 82 in 2016 and 95 in 2021. [[Hurani2024]] Incidence rose from 3.6 to 5.2 per 100,000 a year between 2010 and 2021, and among Arab women it rose steeply to a rate close to that of Jewish women. [[Spierer2025]]',
  pt:'MS is more common the further people live from the equator. In Israel, as in many countries, the number of people living with MS keeps rising.',
  hook:'Latitude gradient: <b>+5.27 per 100,000 per degree</b>. Rising prevalence partly reflects longer survival and better case-finding, not only more new cases. [[Simpson2019,Lunde2017,Wallin2019]]'},
 {from:.75,at:.96,k:'Step 4 · Where in the body',t:'Optic nerve, spinal cord, brainstem',
  txt:'MS affects the central nervous system: brain, optic nerves, brainstem and spinal cord. In about 85% of young adults with MS it begins as a clinically isolated syndrome of the optic nerve, brainstem or spinal cord. [[Miller2005]] In the Barcelona first-attack cohort (1,128 people, mean age 32.1, 69.2% women), the first attack involved the optic nerve in 34.1%, the spinal cord in 29.5%, the brainstem in 25.1% and other sites in 10.7%. [[Tur2023]]',
  pt:'The first episode usually hits one spot: an optic nerve, the spinal cord or the brainstem. That spot decides what the person notices first.',
  hook:'First attack (Barcelona cohort): <b>optic nerve 34.1% · spinal cord 29.5% · brainstem 25.1%</b>. [[Tur2023]]'}
];
const WH_REG=[['Europe',142.8],['Americas',117.5],['Eastern Mediterranean',33.0],['Africa',8.8],['South-East Asia',8.6],['Western Pacific',4.8]];
const WH_SEX=[{l:'Worldwide (Atlas 2020)',r:2,v:'2 : 1'},{l:'United States (2010)',r:2.8,v:'2.8 : 1'},{l:'Canada, latest birth years',r:3.2,v:'> 3.2 : 1'},{l:'Some countries',r:4,v:'up to 4 : 1'}];
const WH_FIRST=[{n:'Optic nerve',v:34.1,s:['optic']},{n:'Spinal cord',v:29.5,s:['cord']},{n:'Brainstem',v:25.1,s:['brainstem']},{n:'Other sites',v:10.7,s:[]}];
const WH_SITE_N={cerebrum:'Brain',optic:'Optic nerve',cerebellum:'Cerebellum',brainstem:'Brainstem',cord:'Spinal cord',periph:'Peripheral nerve'};
/* anchor points of each site in the glyph's own 220 x 330 coordinates */
const WH_ANC={optic:[78,101],brainstem:[130,150],cord:[141,240],cerebrum:[120,52],cerebellum:[176,134],periph:[70,282]};
const WH_CHIPS=[
 {s:'optic',n:'Blurred, dim or painful vision in one eye',
  txt:'This is optic neuritis, inflammation of the optic nerve. It was the first attack in 34.1% of the Barcelona cohort. [[Tur2023]] In the Optic Neuritis Treatment Trial the 15-year risk of MS after optic neuritis was 50%: 25% with no brain lesions on the first MRI and 72% with at least one. [[ONSG2008]] At 15 years, 72% of affected eyes saw 20/20 or better. [[ONSG2008Vision]]'},
 {s:'brainstem',n:'Double vision, vertigo or a numb face',
  txt:'The brainstem packs the pathways for eye movements, balance and facial feeling into a small space, so one lesion there can cause double vision, vertigo or facial numbness (general background). Brainstem syndromes were the first attack in 25.1% of the Barcelona cohort. [[Tur2023]] Trigeminal neuralgia, a stabbing facial pain, was reported in 3.8% of people with MS in a meta-analysis. [[Foley2013]]'},
 {s:'cord',n:'Numbness, tingling or a tight band around the body',
  txt:'Sensory pathways run up the spinal cord, so a cord lesion often causes numbness or tingling below one level, sometimes felt as a band around the chest or belly (general background). Spinal cord syndromes were the first attack in 29.5% of the Barcelona cohort. [[Tur2023]]'},
 {s:'cord',n:'Weak, stiff or heavy legs',x:'cerebrum',
  txt:'The motor pathway runs from the brain down through the spinal cord, so lesions anywhere along it can cause weakness and stiffness (spasticity). In the NARCOMS registry, 16% reported no spasticity and 34% reported moderate, severe or total spasticity. [[Rizzo2004]]'},
 {s:'cord',n:'Needing to pass urine urgently or often',
  txt:'Bladder control depends on pathways through the spinal cord. In a meta-analysis, 68.4% of people with MS reported lower urinary tract symptoms; frequency (73.5%) and urgency (63.9%) were the commonest. [[AlDandan2020]]'},
 {s:'cord',n:'An electric shock down the spine on bending the neck',
  txt:'This is Lhermitte\'s sign, linked to the neck part of the spinal cord. It is a "positive" symptom: demyelinated axons can fire on their own and are sensitive to stretch. [[Smith1999]] A meta-analysis found it in 16% of people with MS. [[Foley2013]]'},
 {s:'cerebellum',n:'Unsteadiness, tremor or slurred speech',
  txt:'The cerebellum and its connections coordinate movement. Charcot\'s 1868 description of MS included what became the classic triad: nystagmus, slurred speech (dysarthria) and ataxia with intention tremor. [[Zalc2018]] A meta-analysis put the frequency of tremor at 33.3%. [[Vaheb2025]]'},
 {s:'cerebrum',n:'Fatigue or slower thinking',
  txt:'Fatigue and slowed thinking are not tied to one spot. A global meta-analysis put MS fatigue at 59.1%, [[Yi2024]] and cognitive impairment was found in 32.5% of adults with relapsing-remitting MS. [[Wu2025]] Heat and stress can bring fatigue on. [[NICE2022]]'},
 {s:'periph',n:'Not MS: the peripheral nerves',
  txt:'Nerves outside the brain and spinal cord are myelinated by Schwann cells; central myelin is made by oligodendrocytes. [[Kister2022]] MS targets central myelin, so the peripheral nerves are spared (general background). That is what makes MS a disease of the central nervous system.'}
];
/* side view of the head and spine, in a 220 x 330 box facing left. H: highlight 0..1 per site */
function whCNS(H,ring){
  const h=k=>clamp(H[k]||0);
  let s=`<ellipse cx="118" cy="88" rx="92" ry="80" style="fill:var(--panel-2)"/><path d="M32 76 L14 104 L32 116 Z" style="fill:var(--panel-2)"/>`;
  s+=`<path d="M122 150 L190 150 L198 330 L120 330 Z" style="fill:var(--panel-2);opacity:.8"/>`;
  /* peripheral nerves, drawn faint: not the MS target */
  s+=`<path d="M140 236 C 110 246, 80 262, 56 300M144 286 C 120 300, 98 314, 82 330" style="fill:none;stroke:var(--muted);stroke-width:2;stroke-dasharray:4 3;opacity:.7"/>`;
  s+=`<g class="wh-hl" data-hl="periph" style="opacity:${f1(h('periph'))}"><path d="M140 236 C 110 246, 80 262, 56 300M144 286 C 120 300, 98 314, 82 330" style="fill:none;stroke:var(--ink);stroke-width:3.5;stroke-linecap:round"/></g>`;
  /* brain */
  s+=`<ellipse cx="120" cy="78" rx="72" ry="52" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.4"/>`;
  s+=`<path d="M70 62q10 -12 22 0M100 44q12 -10 24 0M142 46q12 -8 22 4M80 94q12 8 24 0M150 82q10 10 22 2M110 68q10 -10 20 0M60 84q8 8 16 2" style="fill:none;stroke:var(--line);stroke-width:1.6;stroke-linecap:round"/>`;
  s+=`<g class="wh-hl" data-hl="cerebrum" style="opacity:${f1(h('cerebrum'))}"><ellipse cx="120" cy="78" rx="72" ry="52" style="fill:var(--attack);opacity:.12"/><ellipse cx="112" cy="86" rx="9" ry="5" style="fill:var(--attack)"/><ellipse cx="136" cy="74" rx="7" ry="4" style="fill:var(--attack)"/><ellipse cx="92" cy="70" rx="6" ry="4" style="fill:var(--attack)"/><ellipse cx="152" cy="60" rx="5" ry="3" style="fill:var(--attack)"/></g>`;
  /* cerebellum */
  s+=`<ellipse cx="164" cy="134" rx="28" ry="17" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.4"/><path d="M142 130q22 -8 44 0M140 138q24 -6 48 0" style="fill:none;stroke:var(--line);stroke-width:1.4"/>`;
  s+=`<g class="wh-hl" data-hl="cerebellum" style="opacity:${f1(h('cerebellum'))}"><ellipse cx="164" cy="134" rx="28" ry="17" style="fill:var(--attack);opacity:.55"/></g>`;
  /* brainstem */
  const bs='M116 112 Q120 148 128 186 L146 186 Q140 148 138 112 Z';
  s+=`<path d="${bs}" style="fill:var(--axon-soft);stroke:var(--muted);stroke-width:1.2"/>`;
  s+=`<g class="wh-hl" data-hl="brainstem" style="opacity:${f1(h('brainstem'))}"><path d="${bs}" style="fill:var(--attack);opacity:.65"/></g>`;
  /* spinal cord and vertebrae */
  const cd='M137 186 C 139 230, 142 280, 146 328';
  for(let y=194;y<320;y+=18){const cx=137+(y-186)*9/142;s+=`<rect x="${f1(cx+11)}" y="${y}" width="14" height="13" rx="3" style="fill:none;stroke:var(--line);stroke-width:1.2"/>`}
  s+=`<path d="${cd}" style="fill:none;stroke:var(--muted);stroke-width:13;stroke-linecap:round"/><path d="${cd}" style="fill:none;stroke:var(--axon-soft);stroke-width:10;stroke-linecap:round"/>`;
  s+=`<g class="wh-hl" data-hl="cord" style="opacity:${f1(h('cord'))}"><path d="M138 200 C 139 228, 141 256, 142 272" style="fill:none;stroke:var(--attack);stroke-width:12;stroke-linecap:round;opacity:.55"/><ellipse cx="139" cy="214" rx="4" ry="6" style="fill:var(--attack)"/><ellipse cx="141" cy="254" rx="4" ry="6" style="fill:var(--attack)"/></g>`;
  /* eye and optic nerve */
  const on='M50 98 C 66 100, 80 104, 98 104';
  s+=`<path d="${on}" style="fill:none;stroke:var(--muted);stroke-width:6;stroke-linecap:round"/><path d="${on}" style="fill:none;stroke:var(--axon-soft);stroke-width:4;stroke-linecap:round"/>`;
  s+=`<circle cx="38" cy="96" r="12" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.4"/><circle cx="31" cy="96" r="5" style="fill:var(--nuc)"/>`;
  s+=`<g class="wh-hl" data-hl="optic" style="opacity:${f1(h('optic'))}"><path d="${on}" style="fill:none;stroke:var(--attack);stroke-width:8;stroke-linecap:round;opacity:.6"/><ellipse cx="76" cy="101" rx="6" ry="4" style="fill:var(--attack)"/></g>`;
  /* a pulsing ring on the lit sites (main animation only) */
  if(ring!=null)Object.keys(WH_ANC).forEach(k=>{if(h(k)<.05||k==='periph')return;const [x,y]=WH_ANC[k];
    s+=`<circle cx="${x}" cy="${y}" r="${f1(9+5*ring)}" style="fill:none;stroke:var(--attack);stroke-width:1.6;opacity:${f1(h(k)*(1-ring)*.9)}"/>`});
  return s;
}
inits.what=()=>{
  /* ---------- 1. four scenes on one timeline ---------- */
  const svg=$('#whSvg'),rg=$('#whT');
  const SC=[ [0,.25],[.25,.5],[.5,.75],[.75,1.01] ];
  const scO=(i,t)=>{const [a,b]=SC[i];return Math.min(i?ramp(t,a-.01,a+.02):1,i<3?1-ramp(t,b-.04,b-.01):1)};
  const lpOf=(i,t)=>ramp(t,SC[i][0],Math.min(1,SC[i][1]-.05));
  const person=(x,y,sc,fill,frac=1,id='')=>{
    let g=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${sc})">`;
    const shape=c=>`<circle cy="-9" r="4.2" style="fill:${c}"/><path d="M-6 8v-5a6 6 0 0 1 12 0v5z" style="fill:${c}"/>`;
    if(frac<1){g+=shape('var(--line)')+`<defs><clipPath id="${id}"><rect x="-7" y="-15" width="${f1(14*frac)}" height="25"/></clipPath></defs><g clip-path="url(#${id})">${shape(fill)}</g>`}
    else g+=shape(fill);
    return g+'</g>'};
  function draw(t){
    const N=vb(svg,'720 420','400 620');
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    /* scene 1: the numbers */
    let o=scO(0,t);
    if(o>0){const lp=lpOf(0,t),L=N
        ?{x:20,k:30,n1:78,l1:104,s1:120,n2:168,l2:194,s2:210,two:232,ck:[42,274],cx:74,cy:[270,286],bx:20,bw:300,bt:322,by:i=>350+i*40,bh:14,gl:592,gTop:334}
        :{x:30,k:44,n1:102,l1:124,s1:140,n2:200,l2:222,s2:238,two:266,ck:[60,336],cx:96,cy:[332,348],bx:350,bw:300,bt:44,by:i=>80+i*48,bh:16,gl:384,gTop:60};
      const c1=ease(ramp(lp,0,.3)),c2=ease(ramp(lp,.3,.5)),big=N?38:44;
      s+=`<g style="opacity:${f1(o)}"><text x="${L.x}" y="${L.k}" class="t-sm">PEOPLE LIVING WITH MS</text>`;
      s+=`<text x="${L.x}" y="${L.n1}" style="font:800 ${big}px var(--display);fill:var(--ink)">${f1(2.8*c1)} million</text>`;
      s+=`<text x="${L.x}" y="${L.l1}" class="t-lbl">Atlas of MS, 3rd edition (2020)</text><text x="${L.x}" y="${L.s1}" class="t-sm">35.9 per 100,000 · 115 countries</text>`;
      s+=`<g style="opacity:${f1(ramp(lp,.28,.34))}"><text x="${L.x}" y="${L.n2}" style="font:800 ${big}px var(--display);fill:var(--attack)">${f1(3.1*c2)} million</text>`;
      s+=`<text x="${L.x}" y="${L.l2}" class="t-lbl">MSIF update (2024)</text><text x="${L.x}" y="${L.s2}" class="t-sm">38.1 per 100,000 · 133 countries</text>`;
      s+=`<text x="${L.x}" y="${L.two}" class="t-xs" style="fill:var(--brand)">two estimates, different coverage and methods</text></g>`;
      /* a clock: one new diagnosis about every 5 minutes */
      const a=t*360*9*Math.PI/180,[kx,ky]=L.ck;
      s+=`<g style="opacity:${f1(ramp(lp,.45,.55))}"><circle cx="${kx}" cy="${ky}" r="20" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.6"/>`;
      for(let i=0;i<12;i++){const q=i/12*Math.PI*2;s+=`<line x1="${f1(kx+Math.sin(q)*16)}" y1="${f1(ky-Math.cos(q)*16)}" x2="${f1(kx+Math.sin(q)*19)}" y2="${f1(ky-Math.cos(q)*19)}" style="stroke:var(--line);stroke-width:1.4"/>`}
      s+=`<line x1="${kx}" y1="${ky}" x2="${f1(kx+Math.sin(a)*15)}" y2="${f1(ky-Math.cos(a)*15)}" style="stroke:var(--attack);stroke-width:2.4;stroke-linecap:round"/><circle cx="${kx}" cy="${ky}" r="2.5" style="fill:var(--ink)"/>`;
      s+=`<text x="${L.cx}" y="${L.cy[0]}" class="t-xs" style="fill:var(--ink)">a new diagnosis about every 5 minutes</text><text x="${L.cx}" y="${L.cy[1]}" class="t-xs">incidence 2.1 per 100,000 a year</text></g>`;
      /* prevalence by WHO region */
      s+=`<text x="${L.bx}" y="${L.bt}" class="t-sm">PREVALENCE PER 100,000 · WHO REGION, 2020</text>`;
      const gx=L.bx+35.9/150*L.bw;
      s+=`<line x1="${f1(gx)}" x2="${f1(gx)}" y1="${L.gTop}" y2="${L.gl-14}" class="grid" style="opacity:${f1(ramp(lp,.2,.3))}"/><text x="${f1(gx)}" y="${L.gl}" class="t-xs t-mid" style="opacity:${f1(ramp(lp,.2,.3))}">world 35.9</text>`;
      WH_REG.forEach(([n,v],i)=>{const y=L.by(i),g=ease(ramp(lp,.05+i*.07,.4+i*.07)),w=Math.max(2,v/150*L.bw*g);
        s+=`<text x="${L.bx}" y="${y-5}" class="t-lbl">${n}</text><rect x="${L.bx}" y="${y}" width="${f1(w)}" height="${L.bh}" rx="4" style="fill:var(--attack);opacity:${f1(.35+.5*(v/142.8))}"/>`;
        s+=`<text x="${f1(L.bx+w+6)}" y="${y+L.bh-3}" class="t-sm" style="fill:var(--ink);opacity:${f1(ramp(g,.6,1))}">${f1(v)}</text>`});
      s+='</g>'}
    /* scene 2: women and young adults */
    o=scO(1,t);
    if(o>0){const lp=lpOf(1,t),L=N
        ?{x:16,k:26,lg:42,row:i=>68+i*66,vx:220, ax0:30,ax1:370,ak:336,bigY:386,bl:404,bY:432,axY:486,tkY:502,prY:530,chY:546,tr:592}
        :{x:30,k:44,lg:60,row:i=>88+i*72,vx:208, ax0:390,ax1:690,ak:44,bigY:108,bl:126,bY:168,axY:228,tkY:244,prY:272,chY:288,tr:336};
      s+=`<g style="opacity:${f1(o)}"><text x="${L.x}" y="${L.k}" class="t-sm">WOMEN FOR EACH MAN WITH MS</text><text x="${L.x}" y="${L.lg}" class="t-xs">grey figure = 1 man · orange figures = women</text>`;
      WH_SEX.forEach((r,i)=>{const y=L.row(i),ro=ramp(lp,i*.12,i*.12+.08);if(ro<=0)return;
        s+=`<g style="opacity:${f1(ro)}"><text x="${L.x}" y="${y}" class="t-lbl">${r.l}</text>`;
        s+=person(L.x+14,y+34,1.6,'var(--muted)');s+=`<text x="${L.x+34}" y="${y+38}" class="t-big">:</text>`;
        const nW=Math.ceil(r.r-1e-9);
        for(let j=0;j<nW;j++){const p=ramp(lp,i*.12+.02+j*.02,i*.12+.05+j*.02);if(p<=0)continue;const fr=Math.min(1,r.r-j);
          s+=`<g style="opacity:${f1(p)}">`+person(L.x+56+j*26,y+34,1.6,'var(--orange)',fr,'whW'+i+'_'+j)+'</g>'}
        s+=`<text x="${L.vx}" y="${y+38}" class="t-big" style="fill:var(--orange)">${r.v}</text>`;
        s+='</g>'});
      /* age axis 0-70 */
      const ax=a=>lerp(L.ax0,L.ax1,a/70),ao=ramp(lp,.45,.52);
      if(ao>0){s+=`<g style="opacity:${f1(ao)}"><text x="${L.ax0-(N?14:0)}" y="${L.ak}" class="t-sm">AGE (YEARS)</text>`;
        s+=`<line x1="${L.ax0}" x2="${L.ax1}" y1="${L.axY}" y2="${L.axY}" style="stroke:var(--muted);stroke-width:1.4"/>`;
        for(let a=0;a<=70;a+=10)s+=`<line x1="${f1(ax(a))}" x2="${f1(ax(a))}" y1="${L.axY-4}" y2="${L.axY+4}" style="stroke:var(--muted)"/><text x="${f1(ax(a))}" y="${L.tkY}" class="t-xs t-mid">${a}</text>`;
        const m=ease(ramp(lp,.5,.62)),x32=ax(32);
        s+=`<g style="opacity:${f1(m)}"><line x1="${f1(x32)}" x2="${f1(x32)}" y1="${L.bl+8}" y2="${L.axY}" style="stroke:var(--attack);stroke-width:2"/><circle cx="${f1(x32)}" cy="${L.axY}" r="5" style="fill:var(--attack)"/>`;
        s+=`<text x="${f1(x32)}" y="${L.bigY}" class="t-mid" style="font:800 30px var(--display);fill:var(--attack)">32</text><text x="${f1(x32)}" y="${L.bl}" class="t-sm t-mid">mean age at diagnosis</text></g>`;
        const b=ease(ramp(lp,.62,.74));
        s+=`<g style="opacity:${f1(b)}"><rect x="${f1(ax(20))}" y="${L.bY}" width="${f1((ax(50)-ax(20))*b)}" height="16" rx="5" style="fill:var(--brand-soft);stroke:var(--brand)"/><text x="${f1(ax(50)+8)}" y="${L.bY+7}" class="t-xs" style="fill:var(--brand)">country means</text><text x="${f1(ax(50)+8)}" y="${L.bY+19}" class="t-xs" style="fill:var(--brand)">from 20 to 50</text></g>`;
        const c=ease(ramp(lp,.72,.84));
        s+=`<g style="opacity:${f1(c)}"><rect x="${f1(ax(0))}" y="${L.chY}" width="${f1((ax(18)-ax(0))*c)}" height="14" rx="4" style="fill:var(--attack-soft);stroke:var(--attack)"/><text x="${f1(ax(18)+8)}" y="${L.chY+11}" class="t-xs" style="fill:var(--attack)">first attack in childhood: 3–5%</text></g>`;
        const d=ease(ramp(lp,.82,.94)),xp=ax(39.6);
        s+=`<g style="opacity:${f1(d)}"><path d="M${f1(xp)} ${L.tkY+3}l-5 9h10z" style="fill:var(--orange)"/><text x="${f1(xp)}" y="${L.prY}" class="t-xs t-mid" style="fill:var(--orange)">progressive phase starts: median 39–40</text></g>`;
        s+=`<text x="${L.ax0}" y="${L.tr}" class="t-xs" style="opacity:${f1(ramp(lp,.9,1))}">mean age at diagnosis: 30 in the 2013 Atlas, 32 in 2020</text>`;
        s+='</g>'}
      s+='</g>'}
    /* scene 3: latitude and one national example */
    o=scO(2,t);
    if(o>0){const lp=lpOf(2,t),L=N
        ?{k:24,cx:130,cy:170,r:112,Lmax:150,t1:304,t2:320, ix:20,ik:356,is:372,base:530,sc:1.4,bx:[60,170,280],bw:60,yr:546,it:[570,586,602]}
        :{k:40,cx:150,cy:214,r:140,Lmax:150,t1:378,t2:396, ix:430,ik:40,is:56,base:300,sc:1.9,bx:[446,540,634],bw:54,yr:318,it:[346,362,378]};
      s+=`<g style="opacity:${f1(o)}"><text x="${N?16:20}" y="${L.k}" class="t-sm">FURTHER FROM THE EQUATOR, MORE MS</text>`;
      s+=`<circle cx="${L.cx}" cy="${L.cy}" r="${L.r}" style="fill:var(--csf);stroke:var(--line);stroke-width:1.4"/><ellipse cx="${L.cx}" cy="${L.cy}" rx="${f1(L.r*.38)}" ry="${L.r}" style="fill:none;stroke:var(--line)"/>`;
      [0,20,40,60].forEach((lat,li)=>{[1,-1].forEach(sg=>{if(!lat&&sg<0)return;
        const y=L.cy-sg*L.r*Math.sin(lat*Math.PI/180),hw=L.r*Math.cos(lat*Math.PI/180);
        s+=`<line x1="${f1(L.cx-hw)}" x2="${f1(L.cx+hw)}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:var(--muted);stroke-width:${lat?1:1.6};${lat?'stroke-dasharray:3 4;':''}opacity:.8"/>`;
        s+=`<text x="${f1(L.cx-hw+(lat?10:22))}" y="${f1(y-4)}" class="t-xs">${lat?lat+'°'+(sg>0?'N':'S'):'equator'}</text>`;
        if(lat){const g=ease(ramp(lp,.08+li*.12,.32+li*.12)),x0=L.cx+hw+6,len=lat/60*L.Lmax*g;
          s+=`<rect x="${f1(x0)}" y="${f1(y-6)}" width="${f1(Math.max(0,len))}" height="12" rx="5" style="fill:var(--attack);opacity:.8"/>`}})});
      s+=`<text x="${N?16:20}" y="${L.t1}" class="t-sm" style="fill:var(--ink)">+5.27 per 100,000 per degree (meta-analysis)</text><text x="${N?16:20}" y="${L.t2}" class="t-xs">United States: +16.3 per degree · bars schematic</text>`;
      /* Israel */
      const io=ramp(lp,.35,.42);
      if(io>0){s+=`<g style="opacity:${f1(io)}"><text x="${L.ix}" y="${L.ik}" class="t-sm">ONE NATIONAL EXAMPLE: ISRAEL</text><text x="${L.ix}" y="${L.is}" class="t-xs">Clalit Health Services, prevalence per 100,000</text>`;
        s+=`<line x1="${L.bx[0]-14}" x2="${L.bx[2]+L.bw+14}" y1="${L.base}" y2="${L.base}" class="axis"/>`;
        [[2011,68],[2016,82],[2021,95]].forEach(([yr,v],i)=>{const g=ease(ramp(lp,.42+i*.1,.62+i*.1)),hh=v*L.sc*g,x=L.bx[i];
          s+=`<rect x="${x}" y="${f1(L.base-hh)}" width="${L.bw}" height="${f1(hh)}" rx="4" style="fill:var(--brand);opacity:${f1(.45+.2*i)}"/>`;
          s+=`<text x="${x+L.bw/2}" y="${f1(L.base-hh-6)}" class="t-lbl t-mid" style="opacity:${f1(ramp(g,.5,1))}">${v}</text><text x="${x+L.bw/2}" y="${L.yr}" class="t-sm t-mid">${yr}</text>`});
        const tt=ramp(lp,.75,.85);
        s+=`<g style="opacity:${f1(tt)}"><text x="${L.ix}" y="${L.it[0]}" class="t-xs" style="fill:var(--ink)">Incidence 3.6 → 5.2 per 100,000 a year, 2010–2021</text><text x="${L.ix}" y="${L.it[1]}" class="t-xs">steep rise among Arab women</text><text x="${L.ix}" y="${L.it[2]}" class="t-xs">no national registry: first validated estimates</text></g>`;
        s+='</g>'}
      s+='</g>'}
    /* scene 4: where in the CNS */
    o=scO(3,t);
    if(o>0){const lp=lpOf(3,t),L=N
        ?{ox:14,oy:16,sc:.95,LX:226,ly:{cerebrum:65,optic:110,cerebellum:140,brainstem:168,cord:244},bx:20,bt:[360,376],row:i=>404+i*46,bw:250,ft:[594,610]}
        :{ox:40,oy:40,sc:1.08,LX:300,ly:{cerebrum:96,optic:149,cerebellum:180,brainstem:212,cord:299},bx:420,bt:[60,76],row:i=>122+i*62,bw:230,ft:[372,388]};
      const H={},grow=WH_FIRST.map((f,i)=>ease(ramp(lp,.05+i*.16,.25+i*.16)));
      WH_FIRST.forEach((f,i)=>f.s.forEach(k=>H[k]=Math.max(H[k]||0,grow[i]*(k==='cerebrum'||k==='cerebellum'?.7:1))));
      const ring=(t*14)%1;
      s+=`<g style="opacity:${f1(o)}"><g transform="translate(${L.ox} ${L.oy}) scale(${L.sc})">${whCNS(H,ring)}</g>`;
      Object.keys(L.ly).forEach(k=>{const [ax,ay]=WH_ANC[k],X=L.ox+ax*L.sc,Y=L.oy+ay*L.sc,ly=L.ly[k],on=(H[k]||0)>.05;
        s+=`<path d="M${f1(X)} ${f1(Y)}L${L.LX-8} ${ly-4}" style="fill:none;stroke:${on?'var(--attack)':'var(--line)'};stroke-width:1"/><text x="${L.LX}" y="${ly}" class="t-sm" style="fill:${on?'var(--attack)':'var(--muted)'};${on?'font-weight:700':''}">${WH_SITE_N[k]}</text>`});
      s+=`<text x="${L.bx}" y="${L.bt[0]}" class="t-sm">FIRST ATTACK SITE</text><text x="${L.bx}" y="${L.bt[1]}" class="t-xs">Barcelona cohort, 1,128 people</text>`;
      WH_FIRST.forEach((f,i)=>{const y=L.row(i),w=Math.max(2,f.v/40*L.bw*grow[i]);
        s+=`<text x="${L.bx}" y="${y}" class="t-lbl">${f.n}</text><rect x="${L.bx}" y="${y+8}" width="${f1(w)}" height="18" rx="5" style="fill:var(--attack);opacity:${i===3?.45:.8}"/>`;
        s+=`<text x="${f1(L.bx+w+8)}" y="${y+22}" class="t-sm" style="fill:var(--ink);opacity:${f1(ramp(grow[i],.6,1))}">${f1(f.v)}%</text>`});
      s+=`<g style="opacity:${f1(ramp(lp,.75,.85))}"><text x="${L.bx}" y="${L.ft[0]}" class="t-xs" style="fill:var(--ink)">About 85% of young adults with MS start with</text><text x="${L.bx}" y="${L.ft[1]}" class="t-xs" style="fill:var(--ink)">one episode in the optic nerve, brainstem or cord.</text></g>`;
      s+='</g>'}
    svg.innerHTML=s;
    const p=phaseOf(WH_STEPS,t);setSt(p);$('#whNote').innerHTML=noteHTML(WH_STEPS[p]);
  }
  const stop=playWire(rg,$('#whPlay'),draw,26000,'Replay','what');
  const setSt=stepWire($('#whSteps'),WH_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- 2. symptom chips light the CNS ---------- */
  const cns=$('#whCns');let sel=0,prev=null;
  const OX=10,OY=14;
  function hiOf(i){const c=WH_CHIPS[i],H={};H[c.s]=1;if(c.x)H[c.x]=.6;return H}
  function buildCns(){
    let s=`<g transform="translate(${OX} ${OY})">${whCNS({})}</g>`;
    Object.keys(WH_ANC).forEach(k=>{if(k==='periph')return;const [ax,ay]=WH_ANC[k],X=OX+ax,Y=OY+ay,ly={cerebrum:66,optic:116,cerebellum:150,brainstem:180,cord:256}[k];
      s+=`<g data-lbl="${k}"><path d="M${X} ${Y}L214 ${ly-4}" style="fill:none;stroke:var(--line);stroke-width:1"/><text x="220" y="${ly}" class="t-sm">${WH_SITE_N[k]}</text></g>`});
    s+=`<g data-lbl="periph"><text x="14" y="362" class="t-sm">Peripheral nerves (spared)</text></g>`;
    cns.innerHTML=s}
  function paint(){const i=prev!=null?prev:sel,H=hiOf(i);
    $$('[data-hl]',cns).forEach(g=>g.style.opacity=f1(H[g.dataset.hl]||0));
    $$('[data-lbl]',cns).forEach(g=>{const on=(H[g.dataset.lbl]||0)>0,tx=$('text',g),ln=$('path',g);
      tx.style.fill=on?'var(--attack)':'var(--muted)';tx.style.fontWeight=on?'700':'500';if(ln)ln.style.stroke=on?'var(--attack)':'var(--line)'});
    $$('.wh-chip',$('#whChips')).forEach((b,k)=>b.setAttribute('aria-pressed',k===sel));
    const c=WH_CHIPS[sel];
    $('#whCnsNote').innerHTML=`<span class="kicker">${WH_SITE_N[c.s]}${c.x?' and brain':''}</span><h4>${c.n}</h4><p>${c.txt}</p>`}
  $('#whChips').innerHTML=WH_CHIPS.map((c,i)=>`<button class="wh-chip" data-chip="${i}" data-site="${c.s}" aria-pressed="false"><span class="dot" aria-hidden="true"></span><span>${c.n}<small>${WH_SITE_N[c.s]}${c.x?' and brain':''}</small></span></button>`).join('');
  const box=$('#whChips');
  box.addEventListener('click',e=>{const b=e.target.closest('[data-chip]');if(!b)return;sel=+b.dataset.chip;prev=null;paint()});
  box.addEventListener('mouseover',e=>{const b=e.target.closest('[data-chip]');if(!b)return;prev=+b.dataset.chip;paint()});
  box.addEventListener('mouseleave',()=>{prev=null;paint()});
  box.addEventListener('focusin',e=>{const b=e.target.closest('[data-chip]');if(!b)return;prev=+b.dataset.chip;paint()});
  box.addEventListener('focusout',()=>{prev=null;paint()});
  buildCns();paint();

  /* ---------- 3. key facts ---------- */
  $('#whCards').innerHTML=`
   <div class="card"><span class="kicker">Worldwide</span><span class="big">2.8–3.1 million</span><p>The Atlas of MS (2020) and MSIF's 2024 update. [[Walton2020,King2026]] The Global Burden of Disease study, another method, counted about 2.2 million for 2016. [[GBD2019]]</p></div>
   <div class="card"><span class="kicker">New diagnoses</span><span class="big">~120,000 a year</span><p>in the 2024 update, from incidence data in 91 countries. [[King2026]] The 2020 Atlas pooled 2.1 new cases per 100,000 people a year. [[Walton2020]]</p></div>
   <div class="card"><span class="kicker">Women</span><span class="big">2–3 : 1</span><p>About 2 : 1 worldwide, up to 4 : 1 in some countries [[Walton2020]], 2.8 : 1 in the US [[Wallin2019]], and rising past 3.2 : 1 by birth year in Canada [[Orton2006]].</p></div>
   <div class="card"><span class="kicker">Age</span><span class="big">32</span><p>is the mean age at diagnosis worldwide. [[Walton2020]] Children get MS too: 47 countries reported 30,000 or more cases diagnosed before 18 in 2020 [[Walton2020]], and the 2024 update counted more than 40,000. [[King2026]]</p></div>
   <div class="card"><span class="kicker">How it starts</span><span class="big">~85%</span><p>of young adults with MS begin with one episode in the optic nerve, brainstem or spinal cord. [[Miller2005]] A course that is progressive from onset is less common: 15% in the Lyon cohort, 28–33% in London, Ontario. [[Confavreux2006,Weinshenker1989]] See <a href="#course" data-go="course">Relapse &amp; remission over time</a>.</p></div>
   <div class="card"><span class="kicker">Israel</span><span class="big">95 per 100,000</span><p>in 2021 in the Clalit database, up from 68 in 2011. [[Hurani2024]] Incidence also rose, fastest among Arab women. [[Spierer2025]] Israel was an early setting for studies of MS in migrants, in 1962. [[Alter1962]]</p></div>
   <div class="card"><span class="kicker">In families</span><span class="big">~2–3%</span><p>is the age-adjusted risk for a sibling (2.55%) or child (2.03%) of a person with MS in Swedish registries, and 17.3% for an identical twin. [[Westerlind2014]] Genes raise the risk but do not decide it. See <a href="#risk" data-go="risk">Genes &amp; risk factors</a>.</p></div>
   <div class="card"><span class="kicker">Life expectancy</span><span class="big">~7 years</span><p>shorter in a 60-year Norwegian cohort (74.7 vs 81.8 years). The mortality ratio fell over time, from 3.1 for onset in 1953–1974 to 0.7 for onset in 1997–2012. [[Lunde2017]]</p></div>
   <div class="card"><span class="kicker">Controversy</span><h4>Is MS becoming more common?</h4><p>Atlas estimates rose from 2.8 to 3.1 million, but the authors stress changes in method and gaps in data from lower-income countries. GBD found a 10.4% rise in age-standardised prevalence from 1990 to 2016. Longer survival and better case-finding also raise prevalence. [[Walton2020,King2026,GBD2019,Lunde2017,Wallin2019]]</p></div>`;
};
