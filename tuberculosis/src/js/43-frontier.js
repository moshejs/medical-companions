/* =============== 4.3 Ending TB: targets & research =============== */
/* % change vs 2015. tg = End TB milestones/targets; act = the actual trajectory as published (p: a published
   point, d: derived here from a published year-on-year change); gbd = the independent GBD 2021 estimate for 2020 */
const RE_M={
 inc:{n:'TB incidence rate',tg:[[2015,0],[2020,-20],[2025,-50],[2030,-80],[2035,-90]],
  act:[[2015,0,'p'],[2020,-12.8,'p'],[2023,-10.8,'d'],[2024,-12.3,'p']],gbd:-6.26,
  cap:`Actual line: WHO database rates (148 per 100,000 in 2015, 129 in 2020) and the report's net −12.3% for 2024; 2023 is worked back from the 1.7% fall between 2023 and 2024. Years between these points are drawn straight. The hollow diamond is the independent GBD 2021 estimate for 2015–2020 (−6.26%). Dashed: the 2015–2024 average pace extended in a straight line, drawn here, not a WHO projection. [[WHO-GTR2025,GBD2021TB2024,Floyd2018]]`},
 death:{n:'TB deaths',tg:[[2015,0],[2020,-35],[2025,-75],[2030,-90],[2035,-95]],
  act:[[2015,0,'p'],[2019,-19.3,'p'],[2021,-17.6,'d'],[2023,-26.8,'d'],[2024,-29,'p']],gbd:-11.9,
  cap:`Actual line: summed WHO database deaths (HIV-negative plus with HIV: 1.73 million in 2015, 1.40 million in 2019) and the report's net −29% for 2024; 2021 and 2023 are worked back from the published 13.8% and 3% falls to 2024. The hollow diamond is GBD 2021 for 2015–2020 (−11.9%). Dashed: the 2015–2024 pace extended, drawn here, not a WHO projection. [[WHO-GTR2025,GBD2021TB2024,Floyd2018]]`},
 cost:{n:'Households facing catastrophic costs',
  cap:`Catastrophic costs are total costs above 20% of annual household income or expenditure. Survey estimates are weighted pooled results from national patient cost surveys (40 countries for all TB, 37 for drug-resistant TB); the modelled estimate covers 135 low- and middle-income countries. Survey years differ by country, so the points are placed at the latest report, not at one year. [[WHO-GTR2025,Portnoy2023]]`}
};
const RE_Y0=2015,RE_Y1=2035,reYr=t=>lerp(RE_Y0,RE_Y1,t),reT=y=>(y-RE_Y0)/(RE_Y1-RE_Y0);
const RE_MX={
 inc:{1:` For incidence the 2020 milestone (−20%) was missed globally: the WHO database rate fell from 148 to 129 per 100,000 (about −13%); 101 countries passed it on their own. [[WHO-GTR2025]]`,3:` The incidence rate fell 1.7% between 2023 and 2024, back to the 2020 level, for a net −12.3% since 2015. [[WHO-GTR2025]]`},
 death:{1:` For deaths the 2020 milestone (−35%) was missed: 65 countries passed it. [[WHO-GTR2025]]`,3:` Deaths fell about 3% between 2023 and 2024 and 13.8% compared with 2021, a net −29% since 2015. [[WHO-GTR2025]]`},
 cost:{1:` For costs there is no milestone date to read off: the target is that no TB-affected household faces catastrophic costs. [[WHO-GTR2025]]`,3:` Pooled national surveys: 47% of people treated for TB and their households faced catastrophic costs, 82% with drug-resistant TB; country estimates ranged from 13% (El Salvador) to 92% (Solomon Islands). [[WHO-GTR2025]]`}
};
const RE_STEPS=[
 {from:0,at:reT(2015.3),k:'2015 · the baseline',t:'The End TB Strategy',
  txt:`Adopted by all WHO Member States in 2014, the strategy measures everything against 2015. Its 2035 targets: a 90% lower TB incidence rate, 95% fewer TB deaths, and no TB-affected household facing catastrophic costs. The milestones on the way were −20% and −35% by 2020, and −50% and −75% by 2025. [[WHO-GTR2025]] The 2030 targets are −80% and −90%. [[Floyd2018]]`,
  pt:`In 2014 the world agreed a plan: by 2035, 90% fewer people falling ill with TB and 95% fewer dying.`,
  hook:`End TB 2035: incidence −90%, deaths −95% vs 2015, zero catastrophic costs.`},
 {from:reT(2019.6),at:reT(2020.2),k:'2020 · first milestones',t:'Missed, globally',
  txt:`The independent GBD 2021 analysis also found the 2020 milestones missed, estimating incidence down 6.26% and deaths down 11.9% between 2015 and 2020. [[GBD2021TB2024]]`,
  mx:1,pt:`The first checkpoint, in 2020, was missed for the world as a whole, though many countries met it.`,
  hook:`2020 milestones: −20% incidence, −35% deaths. Missed globally; met by 101 and 65 countries.`},
 {from:reT(2020.6),at:reT(2022.5),k:'2020–2023 · COVID-19',t:'The pandemic setback',
  txt:`Notifications of people newly diagnosed with TB fell from 7.1 million in 2019 to 5.8 million in 2020. WHO assumes that more people went undiagnosed and untreated, raising transmission and pushing incidence up in 2021–2023; deaths rose in 2020–2021. [[WHO-GTR2025]] A 2021 review confirmed large disruptions to TB services but limited evidence on transmission itself. [[McQuaid2021]]`,
  pt:`During COVID-19, many people with TB were not diagnosed. More illness and more deaths followed.`,
  hook:`Notifications: 7.1 million (2019) → 5.8 million (2020). Incidence rose 2021–2023.`},
 {from:reT(2023.6),at:reT(2024.05),k:'2024 · the latest data',t:'10.7 million ill, 1.23 million deaths',
  txt:`In 2024 an estimated 10.7 million people fell ill with TB (131 per 100,000) and about 1.23 million died. [[WHO-GTR2025,Zenner2027]] The European Region cut incidence by 39% and the African Region by 28% since 2015, while incidence rose in the Americas (+13%). [[WHO-GTR2025]]`,
  mx:1,pt:`Things are improving again, but slowly: the TB rate is about 12% lower than in 2015, not the 50% planned for 2025.`,
  hook:`2015→2024: incidence −12.3%, deaths −29% (2025 milestones: −50%, −75%).`},
 {from:reT(2024.6),at:reT(2025.2),k:'2025 · second milestones',t:'Far off track',
  txt:`With 2024 data at −12.3% for incidence and −29% for deaths, the world is far from the 2025 milestones of −50% and −75%. [[WHO-GTR2025]] South Africa is the one high-burden country estimated to have reached the 2025 incidence milestone; Kenya, Tanzania and Zambia were close. [[WHO-GTR2025]]`,
  pt:`The 2025 checkpoint is being missed by a wide margin, though a few countries are close.`,
  hook:`South Africa: the only high-burden country estimated to reach the 2025 incidence milestone.`},
 {from:reT(2029),at:1,k:'2030–2035 · the targets',t:'Only a breakthrough closes the gap',
  txt:`WHO states that the 2035 targets can only be met with technological breakthroughs such as a new TB vaccine. [[WHO-GTR2025]] Even with no new infections after 2015, existing infection alone was modelled to produce about 16.5 cases per 100,000 a year in 2035 (Hypothesis: model projection). [[Houben2016]] Scroll down for the research routes, each with its evidence label.`,
  pt:`At today's pace the 2035 goals will not be reached. New vaccines, shorter treatment and better tests are needed.`,
  hook:`End TB needs a vaccine-level breakthrough (WHO GTR 2025); M72/AS01E is in phase 3.`}
];

inits.frontier=()=>{
  const svg=$('#reSvg'),rg=$('#reT');let ms='inc';
  const tgAt=(M,y)=>{const g=M.tg;for(let i=1;i<g.length;i++)if(y<=g[i][0])return lerp(g[i-1][1],g[i][1],(y-g[i-1][0])/(g[i][0]-g[i-1][0]));return g[g.length-1][1]};
  const actAt=(M,y)=>{const a=M.act;if(y>=2024)return a[a.length-1][1];for(let i=1;i<a.length;i++)if(y<=a[i][0])return lerp(a[i-1][1],a[i][1],(y-a[i-1][0])/(a[i][0]-a[i-1][0]));return 0};
  function draw(t){const N=vb(svg,'720 400','400 495');const Y=reYr(t),M=RE_M[ms];let s='';
    const L=N?{x0:44,x1:384,y0:56,y1:430}:{x0:62,x1:600,y0:46,y1:340};
    const X=y=>lerp(L.x0,L.x1,(y-RE_Y0)/(RE_Y1-RE_Y0));
    s+=`<text x="${L.x0-34}" y="22" class="t-sm" style="fill:var(--vax)">${ms==='cost'?(N?'HOUSEHOLDS, CATASTROPHIC COSTS':'HOUSEHOLDS FACING CATASTROPHIC COSTS (%)'):(M.n.toUpperCase()+(N?' vs 2015':' · CHANGE vs 2015'))}</text>`;
    [2015,2020,2025,2030,2035].forEach(y=>s+=`<line x1="${f1(X(y))}" x2="${f1(X(y))}" y1="${L.y0}" y2="${L.y1}" class="grid"/><text x="${f1(X(y))}" y="${L.y1+15}" class="t-xs t-mid">${y}</text>`);
    if(ms!=='cost'){const V=v=>lerp(L.y0,L.y1,-v/100);
      [0,-25,-50,-75,-100].forEach(v=>s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${f1(V(v))}" y2="${f1(V(v))}" class="${v?'grid':'axis'}"/><text x="${L.x0-6}" y="${f1(V(v)+3)}" class="t-xs t-end">${v?v+'%':'0'}</text>`);
      /* gap shading up to the playhead (to 2024 at most) */
      const ye=Math.min(Y,2024);if(ye>2015){let up='',dn='';for(let y=2015;y<=ye+1e-6;y+=.25){up+=(up?'L':'M')+f1(X(y))+' '+f1(V(actAt(M,y)))}for(let y=ye;y>=2015-1e-6;y-=.25)dn+='L'+f1(X(y))+' '+f1(V(tgAt(M,y)));s+=`<path d="${up}${dn}Z" style="fill:var(--bad);opacity:.12"/>`}
      /* target line, full, faint ahead of the playhead */
      let tp='';for(let y=2015;y<=2035;y+=.5)tp+=(tp?'L':'M')+f1(X(y))+' '+f1(V(tgAt(M,y)));
      s+=`<path d="${tp}" style="fill:none;stroke:var(--vax);stroke-width:2;stroke-dasharray:6 4"/>`;
      if(!N)s+=`<text x="${f1(X(2035)+6)}" y="${f1(V(M.tg[4][1])+4)}" class="t-xs" style="fill:var(--vax)">target ${M.tg[4][1]}%</text>`;
      /* actual */
      if(Y>2015){let ap='';const ye2=Math.min(Y,2024);for(let y=2015;y<=ye2+1e-6;y+=.1)ap+=(ap?'L':'M')+f1(X(y))+' '+f1(V(actAt(M,y)));s+=`<path d="${ap}" style="fill:none;stroke:var(--bad);stroke-width:2.8;stroke-linejoin:round"/>`;
        M.act.forEach(a=>{if(a[0]>Y)return;s+=a[2]==='p'?`<circle cx="${f1(X(a[0]))}" cy="${f1(V(a[1]))}" r="4.5" style="fill:var(--panel);stroke:var(--bad);stroke-width:2"/>`:`<rect x="${f1(X(a[0])-3.5)}" y="${f1(V(a[1])-3.5)}" width="7" height="7" style="fill:var(--panel);stroke:var(--bad);stroke-width:1.6"/>`});
        if(Y>=2020)s+=`<path d="M${f1(X(2020))} ${f1(V(M.gbd)-6)}l6 6l-6 6l-6 -6z" style="fill:none;stroke:var(--muted);stroke-width:1.4"/><text x="${f1(X(2020)+9)}" y="${f1(V(M.gbd)-4)}" class="t-xs">GBD</text>`;
        if(Y>2024){const last=M.act[M.act.length-1][1],pace=last/9,ye3=Math.min(Y,2035);s+=`<line x1="${f1(X(2024))}" y1="${f1(V(last))}" x2="${f1(X(ye3))}" y2="${f1(V(last+pace*(ye3-2024)))}" style="stroke:var(--bad);stroke-width:1.8;stroke-dasharray:3 4;opacity:.7"/>`;
          if(Y>=2034.5)s+=`<text x="${f1(N?X(2035)-6:X(2035)+6)}" y="${f1(V(last+pace*11)+(N?-8:4))}" class="t-xs${N?' t-end':''}" style="fill:var(--bad)">${N?'':'pace: '}${Math.round(last+pace*11)}%</text>`}}
      /* milestone markers */
      M.tg.slice(1).forEach(([y,v])=>{const x=X(y),cy=V(v),past=Y>=y-.05,data=y<=2024.5;
        let st,col;if(!past){st='ahead';col='var(--muted)'}else if(y===2020){st='missed';col='var(--bad)'}else if(y===2025){st='off track';col='var(--bad)'}else{st='needs breakthrough';col='var(--warn)'}
        s+=`<circle cx="${f1(x)}" cy="${f1(cy)}" r="7" style="fill:var(--panel);stroke:${col};stroke-width:2"/>`;
        if(past&&(y===2020||y===2025))s+=`<path d="M${f1(x-3.5)} ${f1(cy-3.5)}l7 7M${f1(x+3.5)} ${f1(cy-3.5)}l-7 7" style="stroke:var(--bad);stroke-width:2"/>`;
        const lx=y===2035?x-10:x+10,anc=y===2035?' t-end':'';
        s+=`<text x="${f1(lx)}" y="${f1(cy+(y===2035?-12:16))}" class="t-xs${anc}" style="fill:${col}">${v}%${past&&!N?' · '+st:''}</text>`});
      /* playhead readout */
      if(Y<2025){const a=actAt(M,Y);s+=`<text x="${f1(X(Y))}" y="${f1(V(a)-10)}" class="t-xs t-mid" style="fill:var(--bad);font-weight:700">${a.toFixed(1)}%</text>`}
      /* legend */
      const lgY=N?L.y1+34:L.y1+34;s+=`<line x1="${L.x0}" x2="${L.x0+24}" y1="${lgY-4}" y2="${lgY-4}" style="stroke:var(--vax);stroke-width:2;stroke-dasharray:6 4"/><text x="${L.x0+30}" y="${lgY}" class="t-xs">End TB target</text><line x1="${L.x0+(N?120:130)}" x2="${L.x0+(N?144:154)}" y1="${lgY-4}" y2="${lgY-4}" style="stroke:var(--bad);stroke-width:2.8"/><text x="${L.x0+(N?150:160)}" y="${lgY}" class="t-xs">actual (WHO)</text>`;
      if(!N)s+=`<text x="${L.x0+260}" y="${lgY}" class="t-xs">○ published · □ worked back · shaded = the gap</text>`;
      else s+=`<text x="${L.x0}" y="${lgY+16}" class="t-xs">○ published · □ worked back · shaded = gap</text>`;
      if(!N){/* side panel: where the world stands at the playhead */
        const tv=tgAt(M,Y),av=Y<2025?actAt(M,Y):null;s+=`<text x="612" y="70" class="t-sm">AT ${Math.floor(Y)}</text><text x="612" y="92" class="t-xs">target</text><text x="612" y="112" class="t-big" style="fill:var(--vax)">${tv.toFixed(0)}%</text><text x="612" y="136" class="t-xs">actual</text><text x="612" y="156" class="t-big" style="fill:var(--bad)">${av==null?'no data':av.toFixed(1)+'%'}</text>`;
        if(av!=null)s+=`<text x="612" y="180" class="t-xs">gap</text><text x="612" y="200" class="t-big">${(av-tv).toFixed(1)} pts</text>`}
    }else{/* catastrophic costs */
      const V=v=>lerp(L.y1,L.y0,v/100);
      [0,25,50,75,100].forEach(v=>s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${f1(V(v))}" y2="${f1(V(v))}" class="${v?'grid':'axis'}"/><text x="${L.x0-6}" y="${f1(V(v)+3)}" class="t-xs t-end">${v}%</text>`);
      s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${f1(V(0))}" y2="${f1(V(0))}" style="stroke:var(--vax);stroke-width:3;stroke-dasharray:6 4"/><text x="${L.x1}" y="${f1(V(0)-6)}" class="t-xs t-end" style="fill:var(--vax)">End TB target: 0 households</text>`;
      /* social protection coverage grows 43% → 52% */
      if(Y>2015){const ye=Math.min(Y,2024),v=lerp(43,52,(ye-2015)/9);s+=`<line x1="${f1(X(2015))}" y1="${f1(V(43))}" x2="${f1(X(ye))}" y2="${f1(V(v))}" style="stroke:var(--rx);stroke-width:2.4"/><circle cx="${f1(X(2015))}" cy="${f1(V(43))}" r="4" style="fill:var(--panel);stroke:var(--rx);stroke-width:2"/><text x="${f1(X(2015)+6)}" y="${f1(V(43)+16)}" class="t-xs" style="fill:var(--rx)">${N?'social protection':'social protection coverage'} 43%${ye>=2024?' → 52%':''}</text>`}
      const pts=[{y:2024,v:47,lo:37,hi:58,l:'all TB, surveys 47%',c:'var(--bad)',at:2023},{y:2024.8,v:82,lo:71,hi:93,l:'drug-resistant TB 82%',c:'var(--bad)',at:2024},{y:2023.2,v:54.9,lo:47,hi:63.2,l:'modelled, 135 LMICs 54.9%',c:'var(--warn)',at:2022},{y:N?2026.2:2027.6,v:75.2,l:'poorest fifth 75.2%',c:'var(--warn)',at:2025},{y:N?2026.2:2027.6,v:42.5,l:'richest fifth 42.5%',c:'var(--warn)',at:2025}];
      pts.forEach(p=>{if(Y<p.at)return;const x=X(p.y);if(p.lo!=null)s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${f1(V(p.lo))}" y2="${f1(V(p.hi))}" style="stroke:${p.c};stroke-width:1.6"/>`;
        s+=`<circle cx="${f1(x)}" cy="${f1(V(p.v))}" r="5" style="fill:${p.c}"/><text x="${f1(x+9)}" y="${f1(V(p.v)+4)}" class="t-xs" style="fill:var(--ink)">${p.l}</text>`});
      if(Y>=2025.5){const x=X(N?2030.3:2034);s+=`<rect x="${f1(x-5)}" y="${f1(V(92))}" width="10" height="${f1(V(13)-V(92))}" rx="4" style="fill:var(--bad);opacity:.25"/><text x="${f1(x)}" y="${f1(V(92)-6)}" class="t-xs t-mid">92%</text><text x="${f1(x)}" y="${f1(V(13)+14)}" class="t-xs t-mid">13%</text><text x="${f1(N?x+9:x-9)}" y="${f1(V(N?52:25))}" class="t-xs${N?'':' t-end'}">${N?'countries':'range across countries'}</text>`}
      if(!N)s+=`<text x="612" y="70" class="t-sm">TARGET</text><text x="612" y="92" class="t-big" style="fill:var(--vax)">0%</text><text x="612" y="120" class="t-sm">SURVEYS</text><text x="612" y="142" class="t-big" style="fill:var(--bad)">${Y>=2023?'47%':'—'}</text>`}
    s+=`<line x1="${f1(X(Y))}" x2="${f1(X(Y))}" y1="${L.y0-6}" y2="${L.y1}" style="stroke:var(--ink);stroke-width:1.2;opacity:.4"/><rect x="${f1(X(Y)-20)}" y="${L.y0-20}" width="40" height="14" rx="3" style="fill:var(--ink)"/><text x="${f1(X(Y))}" y="${L.y0-9}" class="t-xs t-mid" style="fill:var(--bg)">${Math.floor(Y)}</text>`;
    svg.innerHTML=s;
    const ph=phaseOf(RE_STEPS,t);setSt(ph);const P=Object.assign({},RE_STEPS[ph]);if(P.mx&&RE_MX[ms][ph])P.txt+=RE_MX[ms][ph];$('#reNote').innerHTML=noteHTML(P);
    $('#reCap').innerHTML=M.cap;
    if(ms==='cost')$('#reRead').innerHTML=`<span>year <b>${Math.floor(Y)}</b></span><span>target <b>no household</b></span><span>latest surveys <b>47%</b> (drug-resistant TB <b>82%</b>)</span>`;
    else{const tv=tgAt(M,Y);$('#reRead').innerHTML=`<span>year <b>${Math.floor(Y)}</b></span><span>target <b>${tv.toFixed(0)}%</b></span><span>actual <b>${Y<2025?actAt(M,Y).toFixed(1)+'%':'latest −'+Math.abs(M.act[M.act.length-1][1])+'% (2024)'}</b></span>`}
  }
  const stop=playWire(rg,$('#rePlay'),draw,20000,'Replay','frontier');
  const setSt=stepWire($('#reSteps'),RE_STEPS,rg,draw,stop);
  $$('[data-rem]').forEach(b=>b.addEventListener('click',()=>{ms=b.dataset.rem;$$('[data-rem]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---- funding bars ---- */
  const fd=$('#reFund');
  function drawF(){const N=vb(fd,'720 170','400 250');let s='';const x0=N?12:200,x1=N?388:640;
    const B=[{l:'TB services, 2024',a:5.9,g:22,u:'US$ billion a year'},{l:'TB research, 2023',a:1.2,g:5,u:'US$ billion a year'}];
    B.forEach((b,i)=>{const y=N?30+i*104:36+i*62,X=v=>x0+(x1-x0)*v/b.g;
      s+=N?`<text x="${x0}" y="${y-8}" class="t-sm" style="fill:var(--ink)">${b.l}</text>`:`<text x="${x0-12}" y="${y+16}" class="t-sm t-end" style="fill:var(--ink)">${b.l}</text>`;
      s+=`<rect x="${x0}" y="${y}" width="${x1-x0}" height="24" rx="5" style="fill:none;stroke:var(--vax);stroke-width:1.4;stroke-dasharray:5 4"/><rect x="${x0}" y="${y}" width="${f1(X(b.a)-x0)}" height="24" rx="5" style="fill:var(--vax)"/>`;
      s+=`<text x="${f1(X(b.a)+8)}" y="${y+16}" class="t-xs" style="fill:var(--ink)">${b.a} available (${Math.round(b.a/b.g*100)}%)</text><text x="${x1}" y="${y+40}" class="t-xs t-end">2027 target ${b.g} · ${b.u}</text>`});
    fd.innerHTML=s}
  drawF();const prevR=redraws.frontier;redraws.frontier=()=>{prevR&&prevR();drawF()};

  /* ---- board filters ---- */
  let fe='all',fk='all';
  function filt(){let n=0;const C=$$('#reBoard .card');C.forEach(c=>{const ok=(fe==='all'||c.dataset.ev===fe)&&(fk==='all'||c.dataset.k===fk);c.hidden=!ok;if(ok)n++});$('#reCount').textContent=n+' of '+C.length+' shown'}
  $$('[data-ref]').forEach(b=>b.addEventListener('click',()=>{fe=b.dataset.ref;$$('[data-ref]').forEach(x=>x.setAttribute('aria-pressed',x===b));filt()}));
  $$('[data-rek]').forEach(b=>b.addEventListener('click',()=>{fk=b.dataset.rek;$$('[data-rek]').forEach(x=>x.setAttribute('aria-pressed',x===b));filt()}));
  filt();
};
