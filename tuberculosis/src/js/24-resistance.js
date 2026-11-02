/* =============== 2.4 Drug resistance =============== */
/* a resistant mutant rod: ty 'h' isoniazid-resistant (--dH), 'r' rifampicin-resistant (--dR), 'm' both (MDR) */
function rsRod(x,y,len,ang,ty,op=1){
  if(ty==='s')return `<g style="opacity:${f1(op)}">${bacillus(x,y,len,ang)}</g>`;
  const col=ty==='h'?'var(--dH)':ty==='r'?'var(--dR)':'var(--dR)',ring=ty==='m'?'var(--dH)':col,L=len*1.12,w=L*.34;
  return `<g style="opacity:${f1(op)}"><rect x="${f1(x-L/2)}" y="${f1(y-w/2)}" width="${f1(L)}" height="${f1(w)}" rx="${f1(w/2)}" transform="rotate(${f1(ang)} ${f1(x)} ${f1(y)})" style="fill:${col};stroke:var(--ink);stroke-width:.7"/><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(L*.66)}" style="fill:none;stroke:${ring};stroke-width:1.3;stroke-dasharray:2.5 2"/></g>`}
const RS_DRUG={H:['var(--dH)','isoniazid'],R:['var(--dR)','rifampicin'],Z:['var(--dZ)','pyrazinamide'],E:['var(--dE)','ethambutol']};
const RS_ON=.17,RS_STOP=.31;
/* scaled-down population: 96 rods, 3 isoniazid-resistant and 1 rifampicin-resistant mutant at fixed spots */
const RS_O=(()=>{const r=rng(2404),P=[ [-.52,-.34],[.38,.46],[.62,-.18],[-.08,.12]];
  let guard=0;while(P.length<96&&guard++<20000){const a=r()*Math.PI*2,d=Math.sqrt(r())*.9,u=Math.cos(a)*d,v=Math.sin(a)*d;
    if(P.every(p=>Math.hypot(p[0]-u,(p[1]-v)*1.25)>.115))P.push([u,v])}
  return P.map((p,i)=>({u:p[0],v:p[1],a:r()*180,i}))})();
const RS_G=(()=>{const r=rng(818),P=[];let guard=0;while(P.length<100&&guard++<20000){const a=r()*Math.PI*2,d=Math.sqrt(r())*.9,u=Math.cos(a)*d,v=Math.sin(a)*d;
    if(RS_O.every(p=>Math.hypot(p.u-u,(p.v-v)*1.25)>.05)&&P.every(p=>Math.hypot(p[0]-u,(p[1]-v)*1.25)>.075))P.push([u,v])}
  /* regrowth spreads outward from the middle */
  return P.map(p=>({u:p[0],v:p[1],a:r()*180})).sort((A,B)=>Math.hypot(A.u,A.v)-Math.hypot(B.u,B.v))})();
function rsModel(sc){const r=rng(sc==='single'?5:sc==='combo'?6:7);
  const O=RS_O.map((p,i)=>{const ty=i<3?'h':i===3?'r':'s',dorm=ty==='s'&&i%17===5;let d=Infinity;
    const tk=ty==='s'?.19+r()*.15:.27+r()*.12;
    if(sc==='single'){if(ty!=='h')d=tk}
    else if(sc==='combo'){d=dorm?.44+r()*.14:tk}
    else{if(!dorm&&tk<RS_STOP)d=tk}
    return Object.assign({},p,{ty,d,dorm})});
  const surv=O.filter(o=>o.d===Infinity);
  const G=RS_G.map((p,j)=>{let ty=null,b=Infinity;
    if(sc==='single'){ty='h';b=.4+j/RS_G.length*.2}
    else if(sc==='interrupt'&&surv.length){ty=surv[j%surv.length].ty;b=.42+j/RS_G.length*.2}
    return Object.assign({},p,{ty,b})});
  return {O,G,regs:sc==='single'?['H']:['H','R','Z','E']}}
function rsCount(M,t){const c={s:0,h:0,r:0};M.O.forEach(o=>{if(o.d>t)c[o.ty]++});M.G.forEach(g=>{if(g.b<=t)c[g.ty]++});return c}

const RS_S0={from:0,at:.08,k:'Before any drug',t:'A few mutants, already there',
  txt:`In fluctuation tests, <i>M. tuberculosis</i> mutated to drug resistance spontaneously and at random, before any drug was given. Average rates per bacterium per generation were 2.56 × 10⁻⁸ for isoniazid, 2.95 × 10⁻⁸ for streptomycin, 10⁻⁷ for ethambutol and 2.25 × 10⁻¹⁰ for rifampicin [[David1970]]. That is about 1 in 39 million divisions for isoniazid and 1 in 4.4 billion for rifampicin (calculated here). The drawing is scaled down: 96 rods with 3 isoniazid-resistant and 1 rifampicin-resistant mutant, far more than the real ratio, so you can see them. In people operated on for TB, numerous bacilli were found at the surface of cavities, and additional drug resistance was preferentially acquired there [[Kaplan2003]].`,
  pt:`Among billions of TB germs, a tiny number are born able to survive one medicine. Nobody caused this: it happens by chance.`,
  hook:`Rifampicin has the lowest spontaneous mutation rate of the first-line drugs: about 2.25 × 10⁻¹⁰ per bacterium per generation [[David1970]].`};
const RS_S4={from:.8,at:.93,k:'Person to person',t:'Resistance can be passed on',
  txt:`<span class="ev est">Established</span> A resistant strain spreads like any other: drug-resistant TB can be as transmissible as drug-susceptible TB [[Dheda2024]]. A transmission model fitted to national data put the share of incident MDR-TB caused by transmission, not by treatment, at a median 95.9% (95% uncertainty range 68.0–99.6), and 61.3% even among previously treated people [[Kendall2015]]. In KwaZulu-Natal, 69% of 404 people with XDR-TB had never been treated for MDR-TB, and 84% of genotyped isolates fell into clusters [[Shah2017NEJM]]. In Tugela Ferry (2005–2006), 52 of 53 people with XDR-TB died, 55% had never been treated for TB, and 67% had recently been in hospital [[Gandhi2006]].`,
  pt:`Most people with drug-resistant TB caught it from someone else. Having it does not mean anyone did something wrong.`,
  hook:`Most MDR-TB is transmitted, not acquired: a median 95.9% in a global model. Finding and treating MDR-TB matters more than better first-line treatment alone [[Kendall2015]].`};
const RS_STEPS={
 single:[RS_S0,
  {from:.15,at:.27,k:'Isoniazid alone',t:'One drug kills almost everything',
   txt:`Isoniazid alone kills the susceptible rods quickly, and the person may feel better. The 3 isoniazid-resistant mutants are untouched. The rifampicin-resistant mutant is still killed, because isoniazid works on it. Giving one drug, or one effective drug in a failing regimen, is the classic way resistance is selected: the drug does not create the mutants, it removes their competition [[David1970,Dheda2024]].`,
   pt:`The medicine clears most germs, but the few it cannot kill are left behind.`,
   hook:`A single drug selects mutants that were already there. It does not cause the mutation.`},
  {from:.36,at:.5,k:'Weeks later',t:'The resistant clone takes over',
   txt:`With isoniazid still the only drug, the survivors multiply and refill the cavity. Now every rod is isoniazid-resistant: this is <b>acquired</b> resistance. WHO lists three causes of acquired resistance: incorrect prescribing, poor-quality drugs and people stopping treatment early [[WHO-GTR2025,Kendall2015]].`,
   pt:`The germs that grow back are all the kind the medicine cannot touch.`,
   hook:`Acquired resistance = selected during treatment. Transmitted (primary) resistance = caught already resistant.`},
  {from:.6,at:.7,k:'A new label',t:'Isoniazid-resistant TB (Hr-TB)',
   txt:`Isoniazid-resistant, rifampicin-susceptible TB is Hr-TB. WHO recommends rifampicin, ethambutol, pyrazinamide and levofloxacin for 6 months for it [[WHO-Mod4-2025]]. If the same selection happened again with rifampicin, the strain would resist both drugs: by WHO definition, MDR-TB [[WHO-Mod4-2025]]. Resistance to each drug arises independently, so a strain collects resistances one at a time [[David1970]].`,
   pt:`Hr-TB is still curable with a different mix of medicines.`,
   hook:`Hr-TB regimen (WHO): 6 months of rifampicin, ethambutol, pyrazinamide and levofloxacin [[WHO-Mod4-2025]].`},
  RS_S4],
 combo:[RS_S0,
  {from:.15,at:.29,k:'Four drugs together',t:'Every mutant meets a drug that works',
   txt:`<span class="ev est">Established</span> With isoniazid, rifampicin, pyrazinamide and ethambutol together, an isoniazid-resistant mutant is killed by rifampicin and a rifampicin-resistant one by isoniazid. Because resistance to each drug arises independently, the chance of one bacillus resisting two drugs at once is roughly the product of the single-drug rates [[David1970,Dheda2024]]: for isoniazid and rifampicin about 5.8 × 10⁻¹⁸, or 1 in 170 million billion (calculated here). That is the logic of combination therapy.`,
   pt:`Each medicine covers the gaps of the others, so no germ survives all of them.`,
   hook:`Combination therapy works because double-resistant mutants are a product of two tiny probabilities.`},
  {from:.36,at:.5,k:'The slow last phase',t:'Mopping up the survivors',
   txt:`A few slow, dormant rods (drawn pale) outlast the first wave. In 100 people given 22 regimens, the fast killing of the first 2 days came mainly from isoniazid and rifampicin, while sterilising activity on days 2 to 14 came from rifampicin and streptomycin, not from isoniazid or pyrazinamide [[Jindani2003]]. This is why treatment continues long after symptoms fade.`,
   pt:`Feeling better comes early. The last germs take months to clear, so the full course matters.`,
   hook:`Early bactericidal activity: isoniazid. Sterilising activity: rifampicin [[Jindani2003]].`},
  {from:.6,at:.7,k:'End of treatment',t:'Cleared, with no resistance selected',
   txt:`The cavity is empty and no mutant had the chance to take over. Treatment success for drug-susceptible TB was 88% in the 2023 cohort worldwide, a population figure that includes people lost to follow-up and deaths [[WHO-GTR2025]]. For the regimens themselves, see <a href="#regimen" data-go="regimen">Treating TB disease</a>.`,
   pt:`Taking all the medicines together, for the whole course, is what keeps resistance from appearing.`,
   hook:`Drug-susceptible TB treatment success: 88% (2023 cohort) [[WHO-GTR2025]].`},
  RS_S4],
 interrupt:[RS_S0,
  {from:.15,at:.27,k:'Treatment starts, then stops',t:'Stopping early leaves survivors',
   txt:`The four drugs start well, but treatment stops at the dashed line. Most susceptible rods are already gone, yet the mutants (which die later in the drawing because a single drug covers each) and the dormant rods are still there. WHO lists people stopping treatment early as one of the three causes of acquired resistance, with incorrect prescribing and poor-quality drugs [[WHO-GTR2025]].`,
   pt:`Stopping when you feel better leaves germs behind. Clinics offer support to help people finish: see <a href="#living" data-go="living">Living with TB</a>.`,
   hook:`Causes of acquired resistance (WHO): incorrect prescribing, poor-quality drugs, stopping treatment early [[WHO-GTR2025]].`},
  {from:.36,at:.5,k:'Weeks after stopping',t:'The population rebounds',
   txt:`With no drug pressure, the survivors multiply and TB disease returns. In this drawing the mutants are a larger share of what grows back than they were at the start, because the susceptible rods were cleared first. Recurrence after treatment is more common in high-incidence settings (4.10 per 100 person-years, against 1.47 in low-incidence settings, after successful treatment) [[Vega2021]].`,
   pt:`The illness can come back, sometimes harder to treat than before.`,
   hook:`Interrupted treatment risks relapse and selects mutants among the survivors.`},
  {from:.6,at:.7,k:'Restarting',t:'Testing before treating again',
   txt:`When TB returns, drug-susceptibility testing comes first. Among previously treated people, 16% had MDR/RR-TB in 2024, against 3.2% of people never treated before [[WHO-GTR2025]]. In 2024, 83% of people with bacteriologically confirmed TB were tested for rifampicin resistance [[WHO-GTR2025]].`,
   pt:`Before starting medicines again, the clinic checks which ones still work.`,
   hook:`Previous TB treatment is a red flag for resistance: MDR/RR-TB in 16% of previously treated vs 3.2% of new patients (2024) [[WHO-GTR2025]].`},
  RS_S4]};

inits.resistance=()=>{
  const svg=$('#rsSvg'),rg=$('#rsT');let sc='single',M=rsModel(sc),setSt=()=>{};
  const TT={single:['A few mutants, already there','Isoniazid alone','The resistant clone regrows','Now isoniazid-resistant TB','Passed on to a contact'],
    combo:['A few mutants, already there','Four drugs together','Mopping up the survivors','Cleared: no resistance selected','Passed on to a contact'],
    interrupt:['A few mutants, already there','Treatment starts, then stops','The population rebounds','Test before treating again','Passed on to a contact']};
  const SUB={single:['96 rods drawn; 4 are resistant mutants','susceptible rods die; mutants survive','acquired resistance','Hr-TB: isoniazid no longer works','transmitted resistance'],
    combo:['96 rods drawn; 4 are resistant mutants','each mutant is killed by another drug','dormant rods clear slowly','the cavity heals','someone else\'s strain can still spread'],
    interrupt:['96 rods drawn; 4 are resistant mutants','the drugs stop too soon','survivors refill the cavity','mutants are a bigger share now','resistant strains spread too']};
  function draw(t){const N=vb(svg,'720 400','400 600');const ph=phaseOf(RS_STEPS[sc],t);
    const L=N?{cx:200,cy:172,rx:166,ry:106,len:10,lgY:300,lgX:16,chX0:16,chY:344,cX0:46,cX1:384,cY0:400,cY1:460,tY:482,pS:54,pA:66,pB:300}
             :{cx:222,cy:204,rx:188,ry:126,len:12,lgY:356,lgX:34,chX0:452,chY:64,cX0:478,cX1:700,cY0:138,cY1:222,tY:246,pS:62,pA:490,pB:668};
    let s=`<defs>${marker('rsArr','var(--muted)')}</defs>`;
    s+=`<text x="${N?16:24}" y="24" class="t-big">${TT[sc][ph]}</text><text x="${N?16:24}" y="42" class="t-sm">${SUB[sc][ph]}</text>`;
    /* the cavity: a caseous wall around an air-filled space, open to an airway at the top */
    const heal=sc==='combo'?ramp(t,.58,.78):0;
    s+=`<path d="${blob(L.cx,L.cy,L.ry+14,31,L.rx/L.ry*.97,1,16,.12)}" style="fill:var(--caseum);fill-opacity:${f1(.35-.2*heal)};stroke:${heal>.5?'var(--fibro)':'var(--mac-line)'};stroke-width:${f1(1.5+2*heal)}"/>`;
    s+=`<path d="${blob(L.cx,L.cy,L.ry,32,L.rx/L.ry,1,16,.1)}" style="fill:var(--field);stroke:var(--mac-line);stroke-width:1"/>`;
    s+=`<path d="M${f1(L.cx-12)} ${f1(L.cy-L.ry+2)}L${f1(L.cx-9)} ${f1(L.cy-L.ry-18)}M${f1(L.cx+12)} ${f1(L.cy-L.ry+2)}L${f1(L.cx+9)} ${f1(L.cy-L.ry-18)}" style="stroke:var(--airway);stroke-width:2.4;stroke-linecap:round"/>`;
    s+=`<text x="${f1(L.cx-18)}" y="${f1(L.cy-L.ry-10)}" class="t-xs t-end">airway</text><text x="${f1(L.cx+L.rx-4)}" y="${f1(L.cy+L.ry+11)}" class="t-xs t-end">cavity wall (caseum)</text>`;
    const P=p=>[L.cx+p.u*L.rx,L.cy+p.v*L.ry];
    /* original rods */
    M.O.forEach(o=>{const [x,y]=P(o);
      if(t<o.d)s+=o.dorm?`<g style="opacity:.8">${bacillus(x,y,L.len,o.a,{dormant:true})}</g>`:rsRod(x,y,L.len,o.a,o.ty);
      else if(t<o.d+.1)s+=`<g style="opacity:${f1(1-(t-o.d)/.1)}">${bacillus(x,y,L.len,o.a,{dead:true})}</g>`});
    /* regrowth */
    M.G.forEach(g=>{if(t<g.b)return;const [x,y]=P(g),k=ramp(t,g.b,g.b+.025);s+=rsRod(x,y,L.len*(.4+.6*k),g.a,g.ty,k)});
    /* labels for the first mutants */
    if(t<.17){const op=1-ramp(t,.13,.17);const [hx,hy]=P(M.O[0]),[rx,ry]=P(M.O[3]);
      s+=`<g style="opacity:${f1(op)}"><path d="M${f1(hx-8)} ${f1(hy-8)}L${f1(hx-30)} ${f1(hy-30)}" class="arrow" style="stroke:var(--dH)"/><text x="${f1(hx-32)}" y="${f1(hy-34)}" class="t-xs t-mid" style="fill:var(--ink);paint-order:stroke;stroke:var(--field);stroke-width:3">isoniazid-resistant</text>`;
      s+=`<path d="M${f1(rx+8)} ${f1(ry+8)}L${f1(rx+28)} ${f1(ry+28)}" class="arrow" style="stroke:var(--dR)"/><text x="${f1(rx+30)}" y="${f1(ry+40)}" class="t-xs t-mid" style="fill:var(--ink);paint-order:stroke;stroke:var(--field);stroke-width:3">rifampicin-resistant</text></g>`}
    /* legend */
    const lg=[ ['s','susceptible'],['h','isoniazid-resistant'],['r','rifampicin-resistant'],['d','killed']];
    let lx=L.lgX,ly=L.lgY;const lmax=N?384:430;
    lg.forEach(it=>{const wdt=it[1].length*5.8+28;if(lx+wdt>lmax){lx=L.lgX;ly+=15}
      s+=(it[0]==='d'?bacillus(lx+6,ly-3,11,0,{dead:true}):rsRod(lx+6,ly-3,10,0,it[0]))+`<text x="${lx+16}" y="${ly+1}" class="t-xs">${it[1]}</text>`;lx+=wdt});
    /* drugs */
    const on=t>=RS_ON&&(sc!=='interrupt'||t<RS_STOP),stopped=sc==='interrupt'&&t>=RS_STOP;
    s+=`<text x="${L.chX0}" y="${L.chY-8}" class="t-sm">${t<RS_ON?'NO TREATMENT YET':stopped?'TREATMENT STOPPED':'DRUGS ACTING'}</text>`;
    M.regs.forEach((d,i)=>{const x=L.chX0+i*52,y=L.chY;const op=t<RS_ON?.25:stopped?.3:1;
      s+=`<g style="opacity:${op}"><rect x="${x}" y="${y}" width="46" height="22" rx="11" style="fill:${RS_DRUG[d][0]};stroke:var(--ink);stroke-opacity:.35"/><text x="${x+23}" y="${y+15}" class="t-lbl t-mid" style="fill:#1a1a1a">${d}</text></g>`;
      if(stopped)s+=`<line x1="${x+4}" x2="${x+42}" y1="${y+20}" y2="${y+2}" style="stroke:var(--bad);stroke-width:2"/>`});
    if(!N)s+=`<text x="${L.chX0+M.regs.length*52+4}" y="${L.chY+15}" class="t-xs">${M.regs.length===1?'isoniazid only':'H R Z E'}</text>`;
    /* population chart */
    const ymax=130,X=u=>lerp(L.cX0,L.cX1,u),Y=v=>lerp(L.cY1,L.cY0,v/ymax);
    s+=`<text x="${L.cX0-30}" y="${L.cY0-10}" class="t-sm">${N?'RODS IN THE DRAWING':'RODS ALIVE IN THE DRAWING'}</text>`;
    [0,50,100].forEach(v=>s+=`<line x1="${L.cX0}" x2="${L.cX1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="${v?'grid':'axis'}"/><text x="${L.cX0-5}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}</text>`);
    s+=`<line x1="${f1(X(RS_ON))}" x2="${f1(X(RS_ON))}" y1="${L.cY0}" y2="${L.cY1}" style="stroke:var(--rx);stroke-width:1.2"/><text x="${f1(X(RS_ON)+3)}" y="${L.cY0+8}" class="t-xs" style="fill:var(--rx)">drugs start</text>`;
    if(sc==='interrupt')s+=`<line x1="${f1(X(RS_STOP))}" x2="${f1(X(RS_STOP))}" y1="${L.cY0}" y2="${L.cY1}" style="stroke:var(--bad);stroke-width:1.2;stroke-dasharray:4 3"/><text x="${f1(X(RS_STOP)+3)}" y="${L.cY0+30}" class="t-xs" style="fill:var(--bad)">stopped</text>`;
    const series=[ ['s','var(--tb)'],['h','var(--dH)'],['r','var(--dR)']];
    series.forEach(([k,c])=>{let d='';const n=Math.max(2,Math.round(t*90));for(let i=0;i<=n;i++){const u=t*i/n;d+=(i?'L':'M')+f1(X(u))+' '+f1(Y(rsCount(M,u)[k]))}
      s+=`<path d="${d}" style="fill:none;stroke:${c};stroke-width:${k==='s'?2:2.4}"/>`});
    s+=`<line x1="${f1(X(t))}" x2="${f1(X(t))}" y1="${L.cY0}" y2="${L.cY1}" style="stroke:var(--ink);opacity:.35"/><text x="${L.cX1}" y="${L.cY1+12}" class="t-xs t-end">time (schematic)</text>`;
    /* bottom-right: the ratio box, then transmission */
    const tr=ramp(t,.8,.86);
    if(tr<1){const op=1-tr,bx=N?16:452,by=L.tY;
      s+=`<g style="opacity:${f1(op)}"><rect x="${bx}" y="${by}" width="${N?368:252}" height="${N?114:122}" rx="10" style="fill:var(--panel-2);stroke:var(--line)"/>`;
      s+=`<text x="${bx+12}" y="${by+20}" class="t-sm" style="fill:var(--warn)">NOT TO SCALE</text>`;
      [ ['Drawn: 4 mutants in 96 rods.','var(--ink)'],['Real mutation odds per division:','var(--muted)'],['isoniazid  ~1 in 39 million','var(--dH)'],['rifampicin ~1 in 4.4 billion','var(--dR)'],['both       ~1 in 170 million billion','var(--good)'] ].forEach(([l,c],k)=>{s+=`<text x="${bx+12}" y="${by+40+k*16}" class="t-xs" style="fill:${c};white-space:pre">${l}</text>`});
      s+=`</g>`}
    if(tr>0){const ax=L.pA,bxp=L.pB,py=L.tY+8,ps=L.pS,mty=sc==='single'?'h':'m';
      s+=`<g style="opacity:${f1(tr)}">`;
      s+=person(ax,py,ps,'var(--tb)',{cough:Math.sin(t*120)>0,face:1})+person(bxp,py,ps,'var(--muted)',{face:-1});
      s+=`<text x="${ax}" y="${py+ps+13}" class="t-xs t-mid">${sc==='single'?'this person, Hr-TB':'someone with MDR-TB'}</text><text x="${bxp}" y="${py+ps+13}" class="t-xs t-mid">${sc==='single'?'Hr-TB from day one':'MDR-TB from day one'}</text>`;
      for(let i=0;i<5;i++){const k=ramp(t,.83+i*.025,.93+i*.015);if(k<=0||k>=1)continue;
        const x=lerp(ax+ps*.25,bxp-ps*.2,k),y=py+ps*.22+Math.sin(k*Math.PI)*(-14+i*7);s+=droplet(x,y,6.5)+rsRod(x,y,7,30+i*20,mty)}
      const sy=py+ps+24,sw=bxp-ax+40,sx=ax-20;
      s+=`<rect x="${sx}" y="${sy}" width="${f1(sw)}" height="12" rx="6" style="fill:var(--panel-2);stroke:var(--line)"/><rect x="${sx}" y="${sy}" width="${f1(sw*.959*ramp(t,.86,.95))}" height="12" rx="6" style="fill:var(--warn)"/>`;
      s+=`<text x="${sx}" y="${sy+26}" class="t-xs" style="fill:var(--ink)">MDR-TB from transmission: median 95.9%</text></g>`}
    svg.innerHTML=s;setSt(ph);
    const c=rsCount(M,t);
    $('#rsRead').innerHTML=`<span>scenario <b>${{single:'one drug',combo:'four drugs',interrupt:'stopped early'}[sc]}</b></span><span>susceptible <b>${c.s}</b></span><span>isoniazid-resistant <b>${c.h}</b></span><span>rifampicin-resistant <b>${c.r}</b></span><span>drawn rods, not real counts</span>`;
    $('#rsNote').innerHTML=noteHTML(RS_STEPS[sc][ph]);
  }
  const stop=playWire(rg,$('#rsPlay'),draw,22000,'Replay','resistance');
  function wire(){const old=$('#rsSteps'),nu=old.cloneNode(false);old.replaceWith(nu);setSt=stepWire(nu,RS_STEPS[sc],rg,draw,stop)}
  $$('[data-rs]').forEach(b=>b.addEventListener('click',()=>{stop();sc=b.dataset.rs;M=rsModel(sc);$$('[data-rs]').forEach(x=>x.setAttribute('aria-pressed',x===b));wire();draw(+rg.value)}));
  wire();draw(+rg.value);

  /* ---- the arithmetic of combinations ---- */
  const sel=$('#rsPop');
  function calc(){const n=Math.pow(10,+sel.value),rows=[ ['isoniazid',2.56e-8,'2.56 × 10⁻⁸'],['rifampicin',2.25e-10,'2.25 × 10⁻¹⁰'],['ethambutol',1e-7,'10⁻⁷'],['isoniazid and rifampicin together',2.56e-8*2.25e-10,'≈ 5.8 × 10⁻¹⁸, the product (calculated here)']];
    const fmt=x=>x>=100?Math.round(x).toLocaleString('en-GB'):x>=1?x.toFixed(1):x>=1e-3?x.toPrecision(2):x.toExponential(1).replace('e-',' × 10^-').replace(/\^-(\d+)/,(m,d)=>'⁻'+[...d].map(c=>'⁰¹²³⁴⁵⁶⁷⁸⁹'[c]).join(''));
    $('#rsCalcOut').innerHTML=rows.map(([k,r,rs],i)=>`<div class="card"><span class="kicker">${k}</span><b class="big-num" style="font-size:30px;${i===3?'color:var(--good)':''}">${fmt(n*r)}</b><p>new mutants expected per generation in 10<sup>${sel.value}</sup> dividing bacilli (rate ${rs})</p></div>`).join('');
  }
  sel.addEventListener('change',calc);calc();

  /* ---- WHO 2021 category classifier ---- */
  const lad=$('#rsLad');
  const CAT=[{id:'none',n:'Rifampicin-susceptible',d:'no resistance, or Hr-TB'},{id:'rr',n:'RR-TB / MDR-TB',d:'rifampicin (± isoniazid)'},{id:'pre',n:'pre-XDR-TB',d:'+ a fluoroquinolone'},{id:'xdr',n:'XDR-TB',d:'+ bedaquiline or linezolid'}];
  function classify(){const v=k=>$('#rsC'+k).checked,R=v('R'),H=v('H'),F=v('F'),B=v('B'),Lz=v('L');
    let lvl=0,name,txt,cls='maybe';
    if(R){if(F&&(B||Lz)){lvl=3;name='XDR-TB';cls='no';txt=`Rifampicin-resistant, resistant to at least one fluoroquinolone (levofloxacin or moxifloxacin), and to at least one other Group A drug (bedaquiline or linezolid) [[WHO-Mod4-2025,Viney2021]]. Treatment is individualised by specialists; WHO keeps longer regimens (18–20 months for most people) as a last resort [[WHO-Mod4-2025]].`}
      else if(F){lvl=2;name='pre-XDR-TB';cls='no';txt=`Rifampicin-resistant (possibly also isoniazid-resistant) and resistant to at least one fluoroquinolone [[WHO-Mod4-2025,Viney2021]]. An estimated 18% of MDR/RR-TB in 2024 was pre-XDR [[WHO-GTR2025]]. WHO uses BPaL, without moxifloxacin, when fluoroquinolone resistance is documented [[WHO-Mod4-2025]].`}
      else{lvl=1;name=H?'MDR-TB':'RR-TB';cls='maybe';txt=(H?`Resistant to both rifampicin and isoniazid. `:`Resistant to rifampicin, with or without isoniazid resistance. `)+`MDR-TB and RR-TB are reported together as MDR/RR-TB [[WHO-Mod4-2025]]. For fluoroquinolone-susceptible MDR/RR-TB, WHO suggests the 6-month BPaLM regimen [[WHO-Mod4-2025]].`+((B||Lz)?` Resistance to bedaquiline or linezolid without a fluoroquinolone does not move it up a category: XDR needs both.`:'')}}
    else if(H){lvl=0;name='Hr-TB';cls='maybe';txt=`Isoniazid-resistant, rifampicin-susceptible TB [[WHO-Mod4-2025]]. WHO recommends rifampicin, ethambutol, pyrazinamide and levofloxacin for 6 months [[WHO-Mod4-2025]].`+((F||B||Lz)?` The other ticks do not create a named WHO category: pre-XDR and XDR both start from rifampicin resistance.`:'')}
    else if(F||B||Lz){lvl=0;name='Not a named category';cls='maybe';txt=`Without rifampicin resistance, resistance to a fluoroquinolone, bedaquiline or linezolid is not pre-XDR or XDR: both definitions start from rifampicin resistance [[WHO-Mod4-2025,Viney2021]]. Treatment choices still depend on the full drug-susceptibility result.`}
    else{lvl=-1;name='No resistance ticked';cls='yes';txt=`Tick the drugs the strain resists. Rifampicin is the gate: every category above Hr-TB starts with it.`}
    $('#rsVerdict').className='verdict '+cls;$('#rsVerdict').innerHTML=`${name}`;
    $('#rsCatTxt').innerHTML=txt+` See <a href="#drtb" data-go="drtb">Treating drug-resistant TB</a>.`;
    const NL=vb(lad,'720 230','400 400');let s='';
    CAT.forEach((c,i)=>{const on=i===lvl||(lvl<0&&false),past=i<lvl;
      const g=NL?{x:20+i*22,y:326-i*78,w:280,h:62}:{x:20+i*172,y:150-i*36,w:160,h:58};
      const col=i===0?'var(--accent)':i===1?'var(--warn)':i===2?'var(--dR)':'var(--bad)';
      s+=`<rect x="${g.x}" y="${g.y}" width="${g.w}" height="${g.h}" rx="10" style="fill:${on?col:'var(--panel-2)'};fill-opacity:${on?.9:1};stroke:${on||past?col:'var(--line)'};stroke-width:${on?2.4:1.2}"/>`;
      s+=`<text x="${g.x+12}" y="${g.y+24}" class="t-lbl" style="fill:${on?'#141414':'var(--ink)'}">${c.n}</text><text x="${g.x+12}" y="${g.y+44}" class="t-xs" style="fill:${on?'#141414':'var(--muted)'}">${c.d}</text>`;
      if(i<3){const a=NL?{x1:g.x+g.w-30,y1:g.y,x2:g.x+g.w-8,y2:g.y-20}:{x1:g.x+g.w/2,y1:g.y,x2:g.x+g.w+30,y2:g.y-12};s+=`<path d="M${a.x1} ${a.y1}L${a.x2} ${a.y2}" class="arrow" marker-end="url(#rsArr2)"/>`}});
    s=`<defs>${marker('rsArr2','var(--muted)')}</defs><text x="20" y="${NL?24:24}" class="t-sm">WHO 2021 DEFINITIONS · each step adds a resistance</text>`+s;
    s+=`<text x="20" y="62" class="t-big" style="fill:${lvl<0?'var(--muted)':'var(--ink)'}">${name}</text>`;
    lad.innerHTML=s;
  }
  $$('#rsClass input').forEach(i=>i.addEventListener('change',classify));classify();
  redraws.resistance=(p=>()=>{p&&p();classify()})(redraws.resistance);
};
