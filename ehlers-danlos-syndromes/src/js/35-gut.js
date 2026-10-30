/* =============== 3.5 Gut, bladder & MCAS =============== */
/* evidence label colours: est = Established, early = Early evidence, hyp = Hypothesis */
const GU_EV={est:{n:'Established',c:'var(--good)',s:'var(--good-soft)'},early:{n:'Early evidence',c:'var(--warn)',s:'var(--warn-soft)'},hyp:{n:'Hypothesis',c:'var(--rx)',s:'var(--rx-soft)'}};
/* the seven stops. Numbers are published figures from clinic cohorts (see the note text for each source). */
const GU_S=[
 {o:'oes',n:'Oesophagus',tt:['Reflux, heartburn','and swallowing problems'],big:37.6,u:'%',bl:['had heartburn: 687 people with EDS,','Mayo Clinic, over 20 years'],ex:['GI clinic: undiagnosed hypermobility','raised the odds of heartburn (OR 1.66)'],ev:'early',p:[121,55]},
 {o:'sto',n:'Stomach',tt:['Slow or fast','stomach emptying'],big:22.3,u:'%',bl:['abnormal gastric emptying in those tested','(11.8% delayed, 10.5% accelerated)'],ex:['Delayed emptying is the most common','gut motility finding in POTS'],ev:'early',p:[166,126]},
 {o:'sb',n:'Small bowel',tt:['IBS-type symptoms','and functional dyspepsia'],big:39.0,u:'%',bl:['had joint hypermobility syndrome among','people with functional GI disorders'],cmp:[39.0,27.5,'functional GI','organic GI disease'],ex:['adjusted OR 1.51 (95% CI 1.07–2.12)'],ev:'est',p:[126,206]},
 {o:'col',n:'Colon',tt:['Constipation and','slow colonic transit'],big:38.6,u:'%',bl:['had constipation (Mayo EDS cohort);','61% of 435 children and young adults'],ex:['Colonic transit was abnormal in 28.3%','of those tested'],ev:'early',p:[188,222]},
 {o:'rec',n:'Rectum',tt:['Evacuatory dysfunction:','hard to empty the rectum'],big:32,u:'%',bl:['had joint hypermobility among 200 people','with rectal evacuatory dysfunction'],cmp:[32,14,'patients','controls'],ex:['Confirmed in 18 of 30 who had','anorectal manometry (Mayo)'],ev:'est',p:[138,300]},
 {o:'pf',n:'Pelvic floor',tt:['Pelvic organ','prolapse'],big:2.37,u:'×',pre:'OR ',bl:['pooled odds of prolapse with joint','hypermobility, 14 studies'],ex:['High heterogeneity (I² 77%);','six studies at high risk of bias'],ev:'est',p:[150,319]},
 {o:'bl',n:'Bladder',tt:['Urinary','incontinence'],big:73.3,u:'%',bl:['of 60 women with benign joint','hypermobility syndrome'],cmp:[73.3,48.3,'hypermobility','matched controls'],ex:['Anterior vaginal wall prolapse','was also more severe'],ev:'early',p:[102,292]}
];
const GU_AT=[.08,.22,.36,.51,.66,.8,.95];
/* routes between stops, in the body's own coordinates */
const GU_R=[
 [[120,4],[121,55]],
 [[121,55],[124,88],[129,104],[150,100],[166,126]],
 [[166,126],[160,146],[132,154],[114,152],[110,172],[130,186],[150,196],[126,206]],
 [[126,206],[96,216],[124,230],[148,240],[110,252],[72,264],[64,226],[66,190],[84,172],[168,172],[188,190],[188,222]],
 [[188,222],[188,252],[164,276],[138,280],[138,300]],
 [[138,300],[150,319]],
 [[150,319],[122,323],[102,292]]
];
function guAlong(pts,u){let tot=0;const seg=[];for(let i=1;i<pts.length;i++){const l=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);seg.push(l);tot+=l}
  let d=u*tot;for(let i=0;i<seg.length;i++){if(d<=seg[i]||i===seg.length-1){const f=seg[i]?clamp(d/seg[i]):0;return[lerp(pts[i][0],pts[i+1][0],f),lerp(pts[i][1],pts[i+1][1],f)]}d-=seg[i]}return pts[pts.length-1]}
const GU_STEPS=[
 {from:0,at:GU_AT[0],k:'Stop 1 of 7 · oesophagus',t:'Oesophagus',
  txt:`Of 687 people with EDS seen at Mayo Clinic over 20 years, 56% had gastrointestinal symptoms; heartburn was reported by 37.6%. In 552 new GI-clinic patients, a third had previously undiagnosed joint hypermobility syndrome, and they reported more heartburn (OR 1.66) and water brash (OR 2.02). In 435 children and young adults with hEDS or JHS, 32% had dysphagia and 21% eosinophilic oesophagitis. <span class="ev early">Early evidence</span> [[Nelson2015Mayo,Fikree2014,Sood2024]]`,
  pt:`These are problems seen more often in EDS clinics. They are associations, not features everyone with EDS has.`},
 {from:GU_AT[1]-.06,at:GU_AT[1],k:'Stop 2 of 7 · stomach',t:'Stomach',
  txt:`At Mayo, gastric emptying was abnormal in 22.3% of those tested: 11.8% delayed and 10.5% accelerated. In 12 of 17 hypermobility-syndrome patients with upper GI symptoms at a tertiary centre, emptying was delayed. Delayed gastric emptying is the most commonly reported GI motility abnormality in POTS, and the AGA (2025) advises timely gastric-function testing in hEDS/HSD with POTS and chronic upper GI symptoms. <span class="ev early">Early evidence</span> [[Nelson2015Mayo,Zarate2010,Mehr2018,Aziz2025]]`,
  pt:`The stomach can empty too slowly or too fast. Tests are advised when someone has POTS and ongoing upper-gut symptoms.`,
  hook:`Gastric emptying in EDS can be delayed <b>or</b> accelerated (Mayo: 11.8% vs 10.5% of those tested).`},
 {from:GU_AT[2]-.06,at:GU_AT[2],k:'Stop 3 of 7 · small bowel',t:'Small bowel',
  txt:`Joint hypermobility syndrome was more common in functional GI disorders than in organic GI disease (39.0% vs 27.5%; adjusted OR 1.51), and in 51% of those with postprandial distress syndrome. In 1,044 people with hEDS/HSD, 466 had functional foregut disorders plus IBS, 180 IBS alone and 337 no disorder of gut-brain interaction. The AGA suggests considering coeliac testing earlier in hEDS/HSD. <span class="ev est">Established</span> in clinic populations. [[Fikree2015,Choudhary2025,Aziz2025]]`,
  pt:`Pain, bloating and fullness after meals without a visible cause on tests are common. The gut is real and sensitive, not imagined.`,
  hook:`Hypermobility is more common in functional than organic GI disorders: 39.0% vs 27.5%, aOR 1.51.`},
 {from:GU_AT[3]-.06,at:GU_AT[3],k:'Stop 4 of 7 · colon',t:'Colon',
  txt:`At Mayo, 38.6% of people with EDS had constipation and colonic transit was abnormal in 28.3% of those tested. In 435 children and young adults with hEDS or JHS, constipation was present in 61%. <span class="ev early">Early evidence</span> [[Nelson2015Mayo,Sood2024]]`,
  pt:`Constipation is one of the most common gut problems reported, especially in children and young people.`},
 {from:GU_AT[4]-.06,at:GU_AT[4],k:'Stop 5 of 7 · rectum',t:'Rectum',
  txt:`Joint hypermobility was found in 32% of 200 patients with rectal evacuatory dysfunction vs 14% of controls; on proctography, 86% of the hypermobile patients had structural abnormalities vs 64% without hypermobility. At Mayo, a rectal evacuation disorder was confirmed in 18 of 30 who had anorectal manometry. The AGA advises testing for functional defecation disorders in hEDS/HSD with lower GI symptoms, "given the high prevalence of pelvic floor dysfunction". <span class="ev est">Established</span> [[Mohammed2010,Nelson2015Mayo,Aziz2025]]`,
  pt:`Sometimes the problem is not a slow bowel but difficulty emptying at the end. That needs different tests and treatment.`,
  hook:`AGA 2025: test for a functional defecation disorder in hEDS/HSD with lower GI symptoms (rectal hyposensitivity is common).`},
 {from:GU_AT[5]-.06,at:GU_AT[5],k:'Stop 6 of 7 · pelvic floor',t:'Pelvic floor',
  txt:`A meta-analysis of 14 studies found joint hypermobility associated with pelvic organ prolapse (pooled OR 2.37, 95% CI 1.54–3.64). Heterogeneity was high (I² 77%) and six studies were at high risk of bias, so the size of the effect is uncertain even though the direction is consistent. <span class="ev est">Established</span> [[VeitRubin2016]]`,
  pt:`The pelvic floor is a sling of muscle and connective tissue. When the tissue is more stretchy, organs can sag more easily.`,
  hook:`Joint hypermobility and pelvic organ prolapse: pooled OR 2.37 (14 studies, I² 77%).`},
 {from:GU_AT[6]-.06,at:GU_AT[6],k:'Stop 7 of 7 · bladder',t:'Bladder',
  txt:`Urinary incontinence affected 73.3% of 60 women with benign joint hypermobility syndrome vs 48.3% of matched controls, and anterior vaginal wall prolapse was more severe. A pilot study of 21 people with EDS hypermobility type described gastrointestinal and pelvic dysfunction as characteristic additional features. <span class="ev early">Early evidence</span> [[Mastoroudes2013,Castori2010]]`,
  pt:`Leaking urine is more common, and it is worth mentioning: pelvic-floor assessment and treatment exist.`,
  hook:`Urinary incontinence: 73.3% in women with BJHS vs 48.3% of controls.`}
];
/* the MCAS scale: original studies are weights sized by participants; reviews and guidance hang as tags with no weight */
const GU_W=[
 {s:0,k:'Wang2021AAP',lab:'Wang 2021',n:195,nl:'195 people',ev:'early',d:`A retrospective coded-records study: MCAS was recorded in 31% of people with POTS plus EDS vs 2% of others (OR 32.46). Coding-based ascertainment limits the finding. [[Wang2021AAP]]`},
 {s:0,k:'Lyons2016',lab:'Lyons 2016',n:35,nl:'35 families',ev:'early',d:`Hereditary alpha-tryptasemia (extra TPSAB1 copies) was first linked to raised basal tryptase, dysautonomia, IBS-like symptoms and joint hypermobility in 35 families. Raised basal tryptase is present in 4–6% of the general population. [[Lyons2016]]`},
 {s:1,k:'Vazquez2022',lab:'Vazquez 2022',n:266,nl:'266 people',ev:'early',d:`132 people with HSD, 78 with hEDS and 56 with axial hypermobility were genotyped. Hereditary alpha-tryptasemia was no more common than in the general population (5–7% of Western populations); it was linked to dysphagia and retained primary teeth. [[Vazquez2022]]`},
 {s:1,k:'Valdez2026',lab:'Valdez 2026',n:0,nl:'numbers not checked',ev:'early',d:`A 2026 Mayo Clinic study titled "Lack of evidence for increased mast cell activation syndrome prevalence in POTS and/or hEDS". No abstract was available to check its numbers, so it carries no weight here. [[Valdez2026]]`},
 {s:0,k:'Seneviratne2017',lab:'Seneviratne 2017',rv:1,ev:'hyp',d:`An EDS consortium review of mast-cell biology. It proposes mast-cell dysregulation as a factor in a cluster of EDS, non-IgE hypersensitivity and dysautonomia. [[Seneviratne2017]]`},
 {s:0,k:'Monaco2022',lab:'Monaco 2022',rv:1,ev:'hyp',d:`A supportive review proposing that mast-cell mediators could disrupt connective tissue and explain multisystem symptoms in hEDS/HSD. [[Monaco2022]]`},
 {s:0,k:'Hakim2024GeneReviews',lab:'GeneReviews',rv:1,ev:'hyp',d:`The GeneReviews hEDS chapter lists inflammation from mast cell activation disorders among common features of hEDS: expert-level guidance, not a controlled study. [[Hakim2024GeneReviews]]`},
 {s:1,k:'Kucharik2020',lab:'Kucharik 2020',rv:1,ev:'hyp',d:`A systematic search on the hEDS-POTS-MCAS "triad" found only 4 (narrow) to 9 (broad) original research articles, none studying all three together. It judged the evidence inadequate: overlapping vague symptoms and biased or outdated-criteria studies. [[Kucharik2020]]`},
 {s:1,k:'Aziz2025',lab:'AGA 2025',rv:1,ev:'hyp',d:`The American Gastroenterological Association calls mechanistic evidence linking hEDS/HSD with POTS and MCAS limited and evolving, and does not support universal POTS or MCAS testing in hEDS/HSD. [[Aziz2025]]`}
];
inits.gut=()=>{
  const svg=$('#guSvg'),rg=$('#guT');let cert=false;
  const idxAt=t=>{let i=-1;GU_AT.forEach((a,k)=>{if(t>=a)i=k});return i};
  function bolus(t){if(t<GU_AT[0])return guAlong(GU_R[0],ease(ramp(t,0,GU_AT[0])));
    const i=idxAt(t);if(i>=GU_AT.length-1)return GU_S[6].p;
    const a=GU_AT[i],b=GU_AT[i+1];return guAlong(GU_R[i+1],ease(ramp(t,a+(b-a)*.35,b)))}
  function organ(i,cur,vis){const S=GU_S[i],E=GU_EV[S.ev];
    if(cert)return{st:E.c,fi:E.s,w:cur?1.25:1};
    if(cur)return{st:'var(--vas)',fi:'var(--vas-soft)',w:1.25};
    return{st:vis?'var(--vas)':'var(--muted)',fi:vis?'var(--vas-soft)':'var(--panel-2)',w:1,op:vis?.75:1}}
  function tube(d,w,c,extra=''){return `<path d="${d}" style="fill:none;stroke:${c.st};stroke-width:${f1(w*c.w+2.4)};stroke-linecap:round;stroke-linejoin:round;opacity:${c.op||1}"/><path d="${d}" style="fill:none;stroke:${c.fi};stroke-width:${f1(w*c.w)};stroke-linecap:round;stroke-linejoin:round"/>${extra}`}
  function body(ci){const C=i=>organ(i,i===ci,i<ci);let s='';
    s+=`<path d="M100 0L100 18Q60 22 26 40Q14 46 16 70L22 170Q30 210 34 250Q22 290 34 342L206 342Q218 290 206 250Q210 210 218 170L224 70Q226 46 214 40Q180 22 140 18L140 0" style="fill:var(--panel);stroke:var(--line);stroke-width:1.4"/>`;
    s+=tube('M120 2C121 40 118 70 128 104',8,C(0));
    s+=tube('M130 106C160 94 182 112 174 138C166 158 134 160 114 150',18,C(1));
    s+=tube('M114 150C104 166 112 182 130 186C156 190 162 200 146 206C116 214 90 206 94 220C98 232 150 224 152 238C154 252 104 246 100 256C98 262 84 266 70 264',7,C(2));
    s+=tube('M66 268L64 190Q64 172 82 172L168 172Q188 172 188 190L188 252Q188 274 162 276L136 278',13,C(3));
    s+=tube('M136 278C141 288 140 300 134 314',11,C(4));
    const pf=C(5);s+=`<path d="M58 304Q120 346 182 304" style="fill:none;stroke:${pf.st};stroke-width:${f1(5*pf.w)};stroke-linecap:round;opacity:${pf.op||1}"/>`;
    const bl=C(6);s+=`<ellipse cx="102" cy="292" rx="21" ry="13" style="fill:${bl.fi};stroke:${bl.st};stroke-width:${f1(1.8*bl.w)};opacity:.92"/>`;
    return s}
  function draw(t){
    const N=vb(svg,'720 380','400 690'),ci=Math.max(0,idxAt(t+1e-6)),p=phaseOf(GU_STEPS,t),S=GU_S[p],E=GU_EV[S.ev];
    const B=N?{x:80,y:14,k:1}:{x:34,y:20,k:1},P=N?{x:14,y:396,w:372,h:288}:{x:300,y:14,w:408,h:352};
    let s=`<rect x="${N?6:8}" y="${N?6:8}" width="${N?388:282}" height="${N?380:364}" rx="10" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=`<g transform="translate(${B.x} ${B.y}) scale(${B.k})">${body(t>=GU_AT[0]-.001?p:-1)}`;
    /* the travelling marker and stop dots */
    GU_S.forEach((st,i)=>{const on=i<=p&&t>=GU_AT[0]-.06;s+=`<circle cx="${st.p[0]}" cy="${st.p[1]}" r="3" style="fill:${on?(cert?GU_EV[st.ev].c:'var(--vas)'):'var(--muted)'};opacity:${on?1:.5}"/>`});
    const bp=bolus(t);s+=`<circle cx="${f1(bp[0])}" cy="${f1(bp[1])}" r="7" style="fill:var(--gold);stroke:var(--panel);stroke-width:2"/>`;
    /* label for the current stop beside the body */
    const lx=S.p[0]>130?S.p[0]+24:S.p[0]-24;
    s+=`<text x="${f1(lx)}" y="${f1(S.p[1]+4)}" class="t-lbl ${S.p[0]>130?'':'t-end'}" style="fill:${cert?E.c:'var(--vas)'}">${S.n}</text>`;
    s+=`</g>`;
    if(cert)s+=guLegend(N?16:20,N?376:362);
    /* the panel */
    s+=`<rect x="${P.x}" y="${P.y}" width="${P.w}" height="${P.h}" rx="10" style="fill:var(--panel-2);opacity:.55"/>`;
    let y=P.y+24;const x=P.x+16;
    s+=`<text x="${x}" y="${y}" class="t-sm">STOP ${p+1} OF 7 · ${S.n.toUpperCase()}</text>`;y+=26;
    S.tt.forEach(l=>{s+=`<text x="${x}" y="${y}" style="font:400 ${N?19:21}px var(--display);fill:var(--ink)">${l}</text>`;y+=N?22:25});
    const f=ramp(t,GU_STEPS[p].from,GU_STEPS[p].at),val=S.big*ease(f);
    y+=N?24:30;s+=`<text x="${x}" y="${y}" style="font:400 ${N?36:42}px var(--display);fill:${cert?E.c:'var(--vas)'}">${S.pre||''}${S.big<10?val.toFixed(2):val.toFixed(1).replace(/\.0$/,'')}${S.u==='%'?'%':''}</text>`;
    y+=N?18:20;S.bl.forEach(l=>{s+=`<text x="${x}" y="${y}" class="t-sm" style="fill:var(--ink)">${l}</text>`;y+=14});
    if(S.cmp){y+=6;const bw=P.w-32-(N?110:120),[a,b,la,lb]=S.cmp;
      [[a,la,cert?E.c:'var(--vas)'],[b,lb,'var(--muted)']].forEach(([v,l,c])=>{const w=bw*v/100*ease(f);
        s+=`<text x="${x}" y="${y+10}" class="t-xs">${l}</text><rect x="${x+(N?110:120)}" y="${y}" width="${f1(bw)}" height="12" rx="3" style="fill:var(--panel)"/><rect x="${x+(N?110:120)}" y="${y}" width="${f1(w)}" height="12" rx="3" style="fill:${c}"/><text x="${f1(x+(N?110:120)+w+5)}" y="${y+10}" class="t-xs" style="fill:var(--ink)">${(v*ease(f)).toFixed(1)}%</text>`;y+=18})}
    y+=8;S.ex.forEach(l=>{s+=`<text x="${x}" y="${y}" class="t-xs">${l}</text>`;y+=13});
    const cw=E.n.length*7.2+18,cy=P.y+P.h-34;
    s+=`<rect x="${x}" y="${cy}" width="${f1(cw)}" height="22" rx="5" style="fill:${E.s}"/><text x="${f1(x+cw/2)}" y="${cy+15}" class="t-sm t-mid" style="fill:${E.c};font-weight:600">${E.n.toUpperCase()}</text>`;
    s+=`<text x="${f1(x+cw+10)}" y="${cy+15}" class="t-xs">association in clinic cohorts</text>`;
    svg.innerHTML=s;
    $('#guNote').innerHTML=noteHTML(GU_STEPS[p]);setSt(p)}
  function guLegend(x,y){let s='';let xx=x;[['est','Established'],['early','Early evidence']].forEach(([k,l])=>{const E=GU_EV[k];
    s+=`<rect x="${xx}" y="${y-9}" width="12" height="10" rx="2" style="fill:${E.s};stroke:${E.c}"/><text x="${xx+16}" y="${y}" class="t-xs" style="fill:${E.c}">${l}</text>`;xx+=l.length*6.2+34});return s}
  const stop=playWire(rg,$('#guPlay'),draw,22000,'Replay','gut');
  const setSt=stepWire($('#guSteps'),GU_STEPS,rg,draw,stop);
  $('#guCert').addEventListener('click',e=>{cert=!cert;e.currentTarget.setAttribute('aria-pressed',cert);draw(+rg.value)});
  draw(+rg.value);

  /* ---- MCAS balance ---- */
  const msvg=$('#guScaleSvg');let showRv=false,sel=0,ang=0;
  const mass=s=>GU_W.filter(w=>w.s===s&&!w.rv).reduce((a,w)=>a+w.n,0);
  const target=()=>clamp((mass(1)-mass(0))/(mass(0)+mass(1))*30,-12,12);
  function drawS(){const N=vb(msvg,'720 340','400 400');
    const cx=N?200:360,py=N?150:118,half=N?150:250,a=ang*Math.PI/180,ca=Math.cos(a),sa=Math.sin(a);
    const end=sd=>[cx+sd*half*ca,py+sd*half*sa];
    let s=`<path d="M${cx-20} ${N?300:290}L${cx} ${py+6}L${cx+20} ${N?300:290}Z" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.2"/><line x1="${cx-(N?30:60)}" x2="${cx+(N?30:60)}" y1="${N?300:290}" y2="${N?300:290}" class="axis"/>`;
    s+=`<line x1="${f1(end(-1)[0])}" y1="${f1(end(-1)[1])}" x2="${f1(end(1)[0])}" y2="${f1(end(1)[1])}" style="stroke:var(--ink);stroke-width:4;stroke-linecap:round"/><circle cx="${cx}" cy="${py}" r="5" style="fill:var(--ink)"/>`;
    const heads=[['Reports a link','var(--vas)'],['No link, or evidence inadequate','var(--dx)']];
    [-1,1].forEach((sd,si)=>{const [ex,ey]=end(sd),pw=N?120:180,pyy=ey+(N?54:58);
      s+=`<line x1="${f1(ex)}" y1="${f1(ey)}" x2="${f1(ex-pw/2+8)}" y2="${f1(pyy)}" style="stroke:var(--muted)"/><line x1="${f1(ex)}" y1="${f1(ey)}" x2="${f1(ex+pw/2-8)}" y2="${f1(pyy)}" style="stroke:var(--muted)"/>`;
      s+=`<path d="M${f1(ex-pw/2)} ${f1(pyy)}Q${f1(ex)} ${f1(pyy+16)} ${f1(ex+pw/2)} ${f1(pyy)}Z" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.2"/>`;
      const hx=clamp(ex,N?70:110,N?330:610);
      s+=`<text x="${f1(hx)}" y="${N?22:22}" class="t-lbl t-mid" style="fill:${heads[si][1]}">${N&&si?'No link / inadequate':heads[si][0]}</text>`;
      /* weights on the pan */
      let wx=ex-pw/2+10;GU_W.filter(w=>w.s===si&&!w.rv).forEach(w=>{const i=GU_W.indexOf(w),sz=w.n?Math.max(18,Math.sqrt(w.n)*(N?2.6:3.3)):22,on=i===sel;
        s+=`<g class="clk" data-gw="${i}"><rect x="${f1(wx)}" y="${f1(pyy-sz)}" width="${f1(sz)}" height="${f1(sz)}" rx="4" style="fill:${w.n?(si?'var(--dx-soft)':'var(--vas-soft)'):'none'};stroke:${on?'var(--ink)':si?'var(--dx)':'var(--vas)'};stroke-width:${on?2.4:1.4};${w.n?'':'stroke-dasharray:3 3'}"/>`;
        s+=`<text x="${f1(wx+sz/2)}" y="${f1(pyy-sz/2+4)}" class="t-xs t-mid" style="fill:var(--ink)">${w.n||'?'}</text></g>`;
        s+=`<text x="${f1(wx+sz/2)}" y="${f1(pyy+(N?28:30))}" class="t-xs t-mid" style="fill:var(--ink)">${w.lab.split(' ')[0]}</text>`;wx+=sz+(N?16:12)});
      /* review tags hang from the beam, adding no weight */
      if(showRv){let k=0;GU_W.filter(w=>w.s===si&&w.rv).forEach(w=>{const i=GU_W.indexOf(w),tx=N?cx+sd*(k%2?118:72):lerp(cx,ex,.2+k*.22),ty=py+(tx-cx)*Math.tan(a),on=i===sel,ly=N?262+k*24:ty+44+k*26;
        s+=`<line x1="${f1(tx)}" y1="${f1(ty)}" x2="${f1(tx)}" y2="${f1(ly-12)}" style="stroke:var(--muted);stroke-dasharray:2 2"/>`;
        const tw=w.lab.length*(N?5.6:6.4)+12;s+=`<g class="clk" data-gw="${i}"><rect x="${f1(tx-tw/2)}" y="${f1(ly-12)}" width="${f1(tw)}" height="17" rx="8" style="fill:var(--panel);stroke:${on?'var(--ink)':'var(--rx)'};stroke-width:${on?2:1}"/><text x="${f1(tx)}" y="${f1(ly)}" class="t-xs t-mid" style="fill:var(--rx)">${w.lab}</text></g>`;k++})}
    });
    const lab=Math.abs(ang)<4?'Nearly level: unsettled':'Tilted';
    s+=`<text x="${cx}" y="${N?348:316}" class="t-lbl t-mid">${lab}</text>`;
    s+=`<text x="${cx}" y="${N?366:332}" class="t-xs t-mid">Weights = participants only; the scale ignores study quality.</text>`;
    if(N)s+=`<text x="${cx}" y="${382}" class="t-xs t-mid">Tap a weight${showRv?' or tag':''} for details.</text>`;
    msvg.innerHTML=s;
    const W=GU_W[sel];$('#guScaleNote').innerHTML=`<div class="kicker">${W.rv?'Review or guidance · adds no participants':'Original study · '+W.nl}</div><h4>${W.lab}</h4><p><span class="ev ${W.ev}">${GU_EV[W.ev].n}</span></p><p>${W.d}</p>`;
    $$('[data-gwb]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.gwb===sel))}
  msvg.addEventListener('click',e=>{const g=e.target.closest('[data-gw]');if(!g)return;sel=+g.dataset.gw;drawS()});
  $('#guRv').addEventListener('click',e=>{showRv=!showRv;e.currentTarget.setAttribute('aria-pressed',showRv);drawS()});
  $('#guWts').innerHTML=GU_W.map((w,i)=>`<button class="btn ${w.rv?'ghost':''}" data-gwb="${i}" aria-pressed="${i===sel}">${w.lab}</button>`).join('');
  $('#guWts').addEventListener('click',e=>{const b=e.target.closest('[data-gwb]');if(!b)return;sel=+b.dataset.gwb;if(GU_W[sel].rv&&!showRv){showRv=true;$('#guRv').setAttribute('aria-pressed','true')}drawS()});
  ang=target();drawS();

  /* ---- the 20% + 2 tryptase formula ---- */
  function tr(){const b=parseFloat($('#guTry').value);const o=$('#guTryOut');
    if(!isFinite(b)||b<0){o.innerHTML='Enter a baseline tryptase in ng/mL.';return}
    const th=b*1.2+2;o.innerHTML=`Baseline <b>${f1(b)}</b> ng/mL → an event-related level of at least <b class="big-num" style="font-size:30px">${th.toFixed(1)}</b> ng/mL would meet the consensus rise (${f1(b)} × 1.2 + 2).`}
  $('#guTry').addEventListener('input',tr);tr();
  const prevR=redraws.gut;redraws.gut=()=>{prevR&&prevR();drawS()};
};
