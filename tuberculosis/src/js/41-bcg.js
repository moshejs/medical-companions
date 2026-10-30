/* =============== 4.1 BCG & new vaccines =============== */
/* forest plot rows: h = a header line; rr with 95% CI; pop: inf | adu | all; blk groups rows for the latitude re-ordering */
const BC_ROWS=[
 {h:'MENINGEAL & MILIARY TB · Mangtani 2014',blk:'sev'},
 {n:'Infants',rr:.1,lo:.01,hi:.77,pop:'inf',blk:'sev'},
 {n:'Children, tuberculin-tested',rr:.08,lo:.03,hi:.25,pop:'inf',blk:'sev'},
 {h:'PULMONARY TB · Mangtani 2014',blk:'pul'},
 {n:'Infants',rr:.41,lo:.29,hi:.58,pop:'inf',blk:'pul'},
 {n:'Children, tuberculin-tested',rr:.26,lo:.18,hi:.37,pop:'inf',blk:'pul'},
 {n:'Children, not strictly tested',rr:.59,lo:.35,hi:1.01,pop:'inf',blk:'pul'},
 {n:'Older, tuberculin-tested',rr:.88,lo:.59,hi:1.31,pop:'adu',blk:'pul'},
 {n:'Older, not strictly tested',rr:.81,lo:.55,hi:1.22,pop:'adu',blk:'pul'},
 {h:'SINGLE TRIALS · Abubakar 2013',blk:'tri'},
 {n:'Chingleput, India (near equator)',rr:1.05,lo:.88,hi:1.25,pop:'adu',blk:'tri',lat:0},
 {n:'UK MRC (farther from equator)',rr:.22,lo:.16,hi:.31,pop:'adu',blk:'tri',lat:1},
 {h:'INFECTION · Roy 2014',blk:'inf'},
 {n:'Infection (IGRA), exposed children',rr:.81,lo:.71,hi:.92,pop:'inf',blk:'inf'},
 {n:'Progression once infected',rr:.42,lo:.23,hi:.77,pop:'inf',blk:'inf'},
 {h:'POOLED · Colditz 1994',blk:'pool'},
 {n:'All TB, 14 trials',rr:.49,lo:.34,hi:.70,pop:'all',blk:'pool',dia:1}
];
const BC_GX={
 inf:` <b>Infants and children:</b> this is where BCG works best. In newborns and infants, protection was 64% against TB meningitis and 78% against disseminated TB. [[Colditz1995]]`,
 adu:` <b>Adolescents and adults:</b> protection against pulmonary TB ranged from strong in the UK MRC trial (rate ratio 0.22) to none of clinical importance in Chingleput, India (1.05), and in Mangtani's pooled trials it was absent in older people. [[Abubakar2013,Mangtani2014]]`
};
const BC_STEPS=[
 {from:0,at:.06,k:'Day 0 · the injection',t:'A live, weakened bacterium',
  txt:`BCG (bacille Calmette-Guérin) is a live attenuated strain of <i>Mycobacterium bovis</i>, first given to a newborn in Paris in 1921 and still the only licensed TB vaccine. [[Lange2022]] The standard route puts it into the skin (intradermal), forming a small pale bleb; intravenous and aerosol routes are research comparisons. [[Darrah2020]] BCG lacks the RD1 region and so cannot make ESAT-6, the main reason it is attenuated. [[Mahairas1996,Hsu2003]]`,
  pt:`A tiny injection into the skin raises a small bump. It contains a weakened cousin of the TB germ that teaches the immune system.`,
  hook:`BCG = live attenuated <i>M. bovis</i>; RD1 (ESAT-6, CFP-10) is deleted. That is why IGRAs stay specific after BCG.`},
 {from:.12,at:.2,k:'The local reaction',t:'A papule forms',
  txt:`Macrophages take up the bacteria and T cells gather around them: a small raised papule. In 2,435 French children followed for 12 months after BCG-SSI, erythema was reported in 12.4% and induration in 12.2%. Adverse events were less likely when a visible papule formed, when BCG was given before age 1, and with a lower dose. [[Dommergues2009]]`,
  pt:`A small red bump at the injection site is the expected reaction, not a problem.`,
  hook:`Local reaction to BCG is expected; a visible papule went with fewer adverse events (Dommergues 2009).`},
 {from:.28,at:.34,k:'Ulcer, then healing',t:'A small sore',
  txt:`The centre of the papule can break down into a small sore that crusts and heals. Ulceration was reported as an adverse event in 0.9%, abscess in 2.5% and lymphadenitis (a swollen nearby lymph node) in 0.1%; reactions were frequent but rarely severe. [[Dommergues2009]] As a live vaccine, BCG can cause local or disseminated infection when immunity is weak. [[Lange2022]]`,
  pt:`Some babies get a small sore that heals by itself. A large abscess or a swollen gland in the armpit should be shown to a clinician.`,
  hook:`BCG adverse events (Dommergues 2009): abscess 2.5%, ulcer 0.9%, lymphadenitis 0.1%. Disseminated BCG: infants with HIV.`},
 {from:.42,at:.47,k:'Months later',t:'A scar, and primed T cells',
  txt:`The site heals, usually to a small flat scar. What matters is invisible: in 14 studies of 3,855 recently exposed children, vaccinated children were less often infected (RR 0.81, 19% protection), and among infected children BCG protected 58% against progression to disease (RR 0.42). [[Roy2014]] In infants with HIV, disseminated BCG disease occurred in 992 per 100,000 vaccinated in multicentre surveillance. [[Hesseling2009BWHO]]`,
  pt:`The scar is a sign of the vaccine, not a guarantee. BCG mostly stops infection from turning into serious illness.`,
  hook:`Roy 2014: BCG lowers infection by 19–27% and progression once infected by 58%.`},
 {from:.53,at:.66,k:'The evidence · severe TB',t:'Meningitis and miliary TB',
  txt:`In randomised trials, protection against meningeal and miliary TB was high in infants (RR 0.1; 95% CI 0.01–0.77) and in children tuberculin-tested before vaccination (RR 0.08). [[Mangtani2014]] Trunz estimated that the 100.5 million infant doses given in 2002 would prevent 29,729 cases of TB meningitis in the first 5 years of life, one per 3,435 vaccinations, and 11,486 cases of miliary TB. [[Trunz2006]]`,
  gx:1,pt:`BCG is very good at protecting babies and young children from the most dangerous kinds of TB.`,
  hook:`BCG's most consistent benefit: TB meningitis and miliary TB in young children (≈1 meningitis case prevented per 3,435 infant doses).`},
 {from:.78,at:1,k:'The evidence · lung TB',t:'Age, prior exposure, latitude',
  txt:`Against pulmonary TB, protection was greatest in children stringently tuberculin-tested (RR 0.26) and infants (RR 0.41), weaker in children not stringently tested (0.59) and absent in older people (0.81–0.88). Protection was higher further from the equator and in trials with less detection bias. [[Mangtani2014]] Across 14 trials the pooled RR was 0.49, and latitude plus study validity explained 66% of the heterogeneity. [[Colditz1994]] Press <b>Order trials by latitude</b>.`,
  gx:1,pt:`For lung TB in teenagers and adults, BCG helps much less, and how much depends on where people live.`,
  hook:`Prior sensitisation (infection or environmental mycobacteria) and nearness to the equator explain most of BCG's variable efficacy. Strain does not.`}
];

inits.bcg=()=>{
  const svg=$('#bcSvg'),rg=$('#bcT');let pop='inf',lat=false;
  /* skin cross-section in the box (x,y,w,h); st 0..1 = injection, papule, ulcer, scar */
  function skin(x,y,w,h,st,N){let s='';const cx=x+w*.46,top=y+h*.2;
    const bleb=bump(st,.02,.3)*.9,pap=bump(st,.18,.62),ulc=bump(st,.42,.82),scar=ramp(st,.75,.95);
    const dome=14*bleb+12*pap-6*ulc-2*scar,dw=w*.16*(1+pap*.5);
    const surf=xx=>{const d=(xx-cx)/dw;return top-dome*Math.exp(-d*d*2.2)};
    const pts=[];for(let i=0;i<=60;i++){const xx=x+w*i/60;pts.push([xx,surf(xx)])}
    const line=pts.map((p,i)=>(i?'L':'M')+f1(p[0])+' '+f1(p[1])).join('');
    const eD=10,dB=top+h*.36;
    /* subcutis fat lobules */
    s+=`<rect x="${x}" y="${f1(dB)}" width="${w}" height="${f1(y+h-dB)}" style="fill:var(--caseum);opacity:.35"/>`;
    const q=rng(41);for(let i=0;i<14;i++){const fx=x+10+q()*(w-20),fy=dB+12+q()*(y+h-dB-24);s+=`<ellipse cx="${f1(fx)}" cy="${f1(fy)}" rx="${f1(10+q()*6)}" ry="${f1(7+q()*4)}" style="fill:var(--panel);stroke:var(--mac-line);stroke-width:.6;opacity:.75"/>`}
    /* dermis and epidermis */
    s+=`<path d="${line}L${x+w} ${f1(dB)}L${x} ${f1(dB)}Z" style="fill:var(--skin);opacity:.5"/>`;
    s+=`<path d="${line}" style="fill:none;stroke:var(--skin-line);stroke-width:${eD};stroke-linejoin:round;opacity:.55"/><path d="${line}" style="fill:none;stroke:var(--skin-line);stroke-width:1.4"/>`;
    /* a vessel and a lymphatic to the node */
    s+=`<path d="M${x} ${f1(dB-14)}Q${f1(x+w*.5)} ${f1(dB-4)} ${x+w} ${f1(dB-18)}" style="fill:none;stroke:var(--vessel);stroke-width:2;opacity:.4"/>`;
    const nx=x+w*.86,ny=dB+28,nr=13+5*ulc;
    s+=`<path d="M${f1(cx+20)} ${f1(top+30)}Q${f1(nx-20)} ${f1(top+40)} ${f1(nx)} ${f1(ny-nr)}" style="fill:none;stroke:var(--tcell);stroke-width:1.2;stroke-dasharray:3 3;opacity:.7"/><ellipse cx="${f1(nx)}" cy="${f1(ny)}" rx="${f1(nr)}" ry="${f1(nr*.7)}" style="fill:var(--tcell);fill-opacity:.25;stroke:var(--tcell)"/><text x="${f1(nx)}" y="${f1(ny+nr+12)}" class="t-xs t-mid">lymph node</text>`;
    /* inflammation tint */
    if(pap>.05)s+=`<ellipse cx="${f1(cx)}" cy="${f1(top+18)}" rx="${f1(dw*1.6)}" ry="${f1(22+10*pap)}" style="fill:var(--blood);opacity:${f1(.18*pap+.08*ulc)}"/>`;
    /* bacilli in the bleb, then fewer */
    const nb=Math.round(lerp(14,3,ramp(st,.2,.8)));if(st>.04&&scar<1)s+=clump(cx,top+16,nb,16,{len:7,seed:7});
    /* cells gather */
    const ncell=Math.round(10*ramp(st,.12,.4)*(1-.6*scar));const r2=rng(53);
    for(let i=0;i<ncell;i++){const a=i/10*Math.PI*2,d=26+r2()*10;s+=i%2?macrophage(cx+Math.cos(a)*d*1.2,top+18+Math.sin(a)*d*.6,8,{seed:i+2}):tcell(cx+Math.cos(a)*d*1.3,top+18+Math.sin(a)*d*.65,3.6,{act:pap>.4})}
    /* ulcer crater and crust; scar fibrosis */
    if(ulc>.1){s+=`<ellipse cx="${f1(cx)}" cy="${f1(surf(cx)+3)}" rx="${f1(9*ulc+2)}" ry="${f1(4*ulc+1)}" style="fill:var(--field);stroke:var(--tb);stroke-width:1"/>`;if(st>.6)s+=`<ellipse cx="${f1(cx)}" cy="${f1(surf(cx)+1)}" rx="${f1(8*ramp(st,.6,.8))}" ry="3" style="fill:var(--caseum);stroke:var(--mac-line);stroke-width:.8"/>`}
    if(scar>0)s+=`<path d="M${f1(cx-dw)} ${f1(top+8)}Q${f1(cx)} ${f1(top+14)} ${f1(cx+dw)} ${f1(top+8)}" style="fill:none;stroke:var(--fibro);stroke-width:${f1(6*scar)};stroke-linecap:round;opacity:.9"/>`;
    /* needle */
    const nd=ramp(st,0,.06)*(1-ramp(st,.08,.14));
    if(nd>0){const tipx=cx+8,tipy=top+14,ang=-.42,L=110,dx=Math.cos(ang),dy=Math.sin(ang),bx=tipx+(L+40*(1-nd))*dx*-1*-1;
      const sx=tipx+(40*(1-nd)),sy=tipy-(40*(1-nd))*.45;s+=`<g style="opacity:${f1(Math.min(1,nd*3))}"><line x1="${f1(sx)}" y1="${f1(sy)}" x2="${f1(sx+L)}" y2="${f1(sy-L*.45)}" style="stroke:var(--muted);stroke-width:2.2;stroke-linecap:round"/><rect x="${f1(sx+L-4)}" y="${f1(sy-L*.45-9)}" width="44" height="16" rx="3" transform="rotate(-24 ${f1(sx+L)} ${f1(sy-L*.45)})" style="fill:var(--panel-2);stroke:var(--line)"/></g>`}
    /* layer labels */
    s+=`<text x="${x+4}" y="${f1(top-14)}" class="t-xs">${N?'skin surface':'epidermis'}</text><text x="${x+4}" y="${f1(dB-22)}" class="t-xs">dermis</text><text x="${x+4}" y="${f1(y+h-6)}" class="t-xs">fat (subcutis)</text>`;
    return s}
  function stageLbl(st){return st<.16?['Intradermal bleb','BCG placed in the dermis']:st<.42?['Papule','erythema 12.4% · induration 12.2%']:st<.74?['Ulcer, crust','ulceration 0.9% · abscess 2.5%']:['Scar','primed T cells, no live vaccine visible']}
  function rowsOrdered(){if(!lat)return BC_ROWS;const tri=BC_ROWS.filter(r=>r.blk==='tri'),rest=BC_ROWS.filter(r=>r.blk!=='tri');return tri.concat(rest)}
  function forest(x0,y0,w,rowH,t,N){let s='';const R=rowsOrdered();
    const lab=N?0:190,valW=N?0:80,px0=x0+lab,px1=x0+w-valW,lg=v=>Math.log10(v),X=v=>lerp(px0,px1,(lg(clamp(v,.01,2))+2)/(lg(2)+2));
    const yEnd=y0+R.length*rowH;
    s+=`<text x="${x0}" y="${y0-16}" class="t-sm" style="fill:var(--vax)">RELATIVE RISK OF TB, BCG vs NONE (log scale)</text>`;
    [.01,.1,.25,1,2].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${y0-6}" y2="${f1(yEnd)}" class="${v===1?'axis':'grid'}" ${v===1?'style="stroke:var(--ink);opacity:.5"':''}/><text x="${f1(X(v))}" y="${f1(yEnd+13)}" class="t-xs t-mid">${v}</text>`});
    s+=`<text x="${f1(X(1)-4)}" y="${f1(yEnd+27)}" class="t-xs t-end" style="fill:var(--good)">← BCG protects</text><text x="${f1(X(1)+4)}" y="${f1(yEnd+27)}" class="t-xs">${N?'none →':'no effect →'}</text>`;
    let k=0;const nShow=Math.floor(ramp(t,.5,.97)*R.length+.001);
    R.forEach((r,i)=>{const y=y0+i*rowH+rowH*.6;if(i>=nShow&&!(t>=.995))return;
      if(r.h){s+=`<text x="${x0}" y="${f1(y+2)}" class="t-xs" style="fill:var(--vax);font-weight:700">${r.h}</text>`;
        if(lat&&r.blk==='tri')s+=`<text x="${x0+w}" y="${f1(y+2)}" class="t-xs t-end" style="fill:var(--accent)">near equator ↓ farther</text>`;return}
      const on=r.pop==='all'||r.pop===pop||(lat&&r.blk==='tri'),op=on?1:.25,col=r.blk==='tri'&&lat?'var(--accent)':r.rr<1&&r.hi<1?'var(--good)':'var(--muted)';
      const ly=N?y-6:y+3.5,by=N?y+4:y;
      s+=`<g style="opacity:${op}">`;
      s+=`<text x="${N?x0:x0+8}" y="${f1(ly)}" class="t-xs" style="fill:var(--ink)">${r.n}${N?'  ·  '+r.rr+' ('+r.lo+'–'+r.hi+')':''}</text>`;
      s+=`<line x1="${f1(X(r.lo))}" x2="${f1(X(r.hi))}" y1="${f1(by)}" y2="${f1(by)}" style="stroke:${col};stroke-width:1.8"/>`;
      if(r.dia)s+=`<path d="M${f1(X(r.lo))} ${f1(by)}L${f1(X(r.rr))} ${f1(by-5)}L${f1(X(r.hi))} ${f1(by)}L${f1(X(r.rr))} ${f1(by+5)}Z" style="fill:${col}"/>`;
      else s+=`<rect x="${f1(X(r.rr)-4)}" y="${f1(by-4)}" width="8" height="8" style="fill:${col}"/>`;
      if(!N)s+=`<text x="${x0+w}" y="${f1(y+3.5)}" class="t-xs t-end">${r.rr} (${r.lo}–${r.hi})</text>`;
      s+='</g>'});
    return s}
  function draw(t){const N=vb(svg,'720 410','400 880');let s='';
    const st=ramp(t,0,.5),SL=stageLbl(st);
    if(N){s+=`<text x="12" y="20" class="t-sm" style="fill:var(--vax)">ONE BCG INJECTION, IN SECTION</text><text x="12" y="40" class="t-big">${SL[0]}</text><text x="12" y="56" class="t-xs" style="fill:var(--ink)">${SL[1]}</text>`;
      s+=skin(12,66,376,250,st,N);s+=forest(12,372,376,28.5,t,N)}
    else{s+=`<text x="12" y="20" class="t-sm" style="fill:var(--vax)">ONE BCG INJECTION, IN SECTION</text><text x="12" y="44" class="t-big">${SL[0]}</text><text x="12" y="60" class="t-xs" style="fill:var(--ink)">${SL[1]}</text>`;
      s+=skin(12,74,252,300,st,N);
      s+=`<line x1="276" x2="276" y1="10" y2="398" class="grid"/>`;
      s+=forest(288,48,424,18.2,t,N)}
    /* stage dots */
    const sx=12,sy=N?334:394;['bleb','papule','ulcer','scar'].forEach((n,i)=>{const a=st>=[0,.16,.42,.74][i];s+=`<circle cx="${sx+6+i*(N?92:62)}" cy="${sy-4}" r="4" style="fill:${a?'var(--vax)':'none'};stroke:var(--vax)"/><text x="${sx+14+i*(N?92:62)}" y="${sy}" class="t-xs">${n}</text>`});
    svg.innerHTML=s;
    const ph=phaseOf(BC_STEPS,t);setSt(ph);const P=Object.assign({},BC_STEPS[ph]);if(P.gx)P.txt+=BC_GX[pop];$('#bcNote').innerHTML=noteHTML(P);
    $('#bcRead').innerHTML=`<span>skin <b>${SL[0].toLowerCase()}</b></span><span>forest rows <b>${t>=.995?12:rowsOrdered().slice(0,Math.floor(ramp(t,.5,.97)*BC_ROWS.length+.001)).filter(r=>!r.h).length}</b> of 12</span><span>showing <b>${pop==='inf'?'infants & children':'adolescents & adults'}</b>${lat?' · <b>by latitude</b>':''}</span>`;
  }
  const stop=playWire(rg,$('#bcPlay'),draw,24000,'Replay','bcg');
  const setSt=stepWire($('#bcSteps'),BC_STEPS,rg,draw,stop);
  $$('[data-bcp]').forEach(b=>b.addEventListener('click',()=>{pop=b.dataset.bcp;$$('[data-bcp]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  $('#bcLat').addEventListener('click',()=>{lat=!lat;$('#bcLat').setAttribute('aria-pressed',lat);if(lat&&+rg.value<.97){stop();rg.value=1}draw(+rg.value)});
  draw(+rg.value);

  /* ---- pipeline bars ---- */
  const pp=$('#bcPipe');
  function drawP(){const N=vb(pp,'720 120','400 170');let s='';const x0=N?12:90,x1=N?388:700,u=(x1-x0)/18;
    const bars=[{y:N?30:22,l:'2024',seg:[[15,'15 candidates','var(--vax)',.5]]},{y:N?96:66,l:'Aug 2025',seg:[[4,'phase 1: 4','var(--vax)',.35],[8,'phase 2: 8','var(--vax)',.6],[6,'phase 3: 6','var(--vax)',1]]}];
    bars.forEach(b=>{let x=x0;if(N)s+=`<text x="${x0}" y="${b.y-6}" class="t-xs" style="fill:var(--ink)">${b.l}</text>`;else s+=`<text x="${x0-10}" y="${b.y+17}" class="t-xs t-end" style="fill:var(--ink)">${b.l}</text>`;
      b.seg.forEach(g=>{const w=g[0]*u;s+=`<rect x="${f1(x)}" y="${b.y}" width="${f1(w-2)}" height="26" rx="4" style="fill:${g[2]};opacity:${g[3]}"/><text x="${f1(x+6)}" y="${b.y+17}" class="t-xs" style="fill:${g[3]>.55?'var(--bg)':'var(--ink)'}">${g[1]}</text>`;x+=w})});
    s+=`<text x="${x1}" y="${N?164:112}" class="t-xs t-end">TB vaccine candidates in clinical trials (WHO)</text>`;pp.innerHTML=s}
  drawP();const prevR=redraws.bcg;redraws.bcg=()=>{prevR&&prevR();drawP()};

  /* ---- board filters ---- */
  let fe='all',fw='all';
  function filt(){let n=0;$$('#bcBoard .card').forEach(c=>{const ok=(fe==='all'||c.dataset.ev===fe)&&(fw==='all'||c.dataset.who.split(' ').includes(fw));c.hidden=!ok;if(ok)n++});$('#bcCount').textContent=n+' of '+$$('#bcBoard .card').length+' shown'}
  $$('[data-bcf]').forEach(b=>b.addEventListener('click',()=>{fe=b.dataset.bcf;$$('[data-bcf]').forEach(x=>x.setAttribute('aria-pressed',x===b));filt()}));
  $$('[data-bcw]').forEach(b=>b.addEventListener('click',()=>{fw=b.dataset.bcw;$$('[data-bcw]').forEach(x=>x.setAttribute('aria-pressed',x===b));filt()}));
  filt();
};
