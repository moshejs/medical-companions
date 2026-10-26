/* =============== 4.1 Surgery =============== */
/* word-wrap a plain string into lines of at most n characters */
function suWrap(s,n){const w=s.split(' '),L=[];let c='';w.forEach(x=>{if((c+' '+x).trim().length>n){if(c)L.push(c);c=x}else c=(c+' '+x).trim()});if(c)L.push(c);return L}
/* operations by tumour site. seg: the resected stretch of bowel in colon() units (0 caecum .. 1 anal verge) */
const SU_OPS={
 right:{site:'Caecum / ascending colon',op:'Right hemicolectomy',seg:[0,.31],tu:.08,ties:['ileocolic','right colic'],cut:['ileocolic','right colic'],ileum:true,recon:'join',reconTxt:'ileum joined to transverse colon',
  key:'CME: 5-y local recurrence 6.5% → 3.6%',
  read:`Right hemicolectomy: the caecum, ascending colon and the end of the ileum come out, with the ileocolic and right colic vessels tied at their roots. In Erlangen, adopting complete mesocolic excision went with 5-year local recurrence falling from 6.5% to 3.6% (single-centre before–after data). [[Hohenberger2009]]`},
 transverse:{site:'Transverse colon',op:'Transverse colectomy',seg:[.31,.51],tu:.41,ties:['middle colic'],cut:['middle colic'],recon:'join',reconTxt:'colon joined to colon',
  key:'Lap vs open colon: 3-y recurrence 16% vs 18%',
  read:`Transverse colon: the segment comes out with the middle colic vessels and their nodes. Across colon cancer, laparoscopic surgery matched open surgery in COST (3-year recurrence 16% vs 18%; overall survival 86% vs 85%). [[COST2004]]`},
 left:{site:'Descending colon',op:'Left hemicolectomy',seg:[.53,.75],tu:.64,ties:['left colic'],cut:['left colic'],recon:'join',reconTxt:'colon joined to colon',
  key:'COLOR: median stay shorter after keyhole surgery',
  read:`Left hemicolectomy: the descending colon comes out with the left colic vessels. Right, left and sigmoid cancers made up the COLOR trial; keyhole surgery meant less blood loss (100 vs 175 mL), earlier bowel recovery and a shorter stay, with 17% converted to open. [[Veldkamp2005]]`},
 sigmoid:{site:'Sigmoid colon',op:'Sigmoid colectomy',seg:[.74,.885],tu:.81,ties:['sigmoid'],cut:['sigmoid'],recon:'join',reconTxt:'colon joined to upper rectum',
  key:'Nodes examined: median 11 (range 1–87)',
  read:`Sigmoid colectomy: the sigmoid comes out with its arteries and nodes. In INT-0089 (3,411 stage II–III patients) the median node harvest was 11, and survival rose as more nodes were examined, even in node-negative disease. [[LeVoyer2003,Veldkamp2005]]`},
 upper:{site:'Upper rectum',op:'High anterior resection',seg:[.78,.95],tu:.915,ties:['IMA'],cut:['sigmoid','superior rectal','trunk'],recon:'join',reconTxt:'colon joined to the rectal stump',
  key:'ROLARR: high anterior resection for the upper rectum',
  read:`Upper rectum: a high anterior resection, as described in ROLARR, removes the upper rectum with its mesorectum; the inferior mesenteric (IMA) trunk is tied centrally. [[Jayne2017]] Heald found cancer deposits in the mesorectum several centimetres below the visible tumour, which is why the envelope matters. [[Heald1982]]`},
 lar:{site:'Low rectum',op:'Low anterior resection (TME)',seg:[.78,.99],tu:.965,ties:['IMA'],cut:['sigmoid','superior rectal','trunk'],recon:'lar',reconTxt:'low join + temporary loop ileostomy',
  key:'Leak 28.0% without vs 10.3% with a stoma',
  read:`Low anterior resection with total mesorectal excision: the whole rectum and mesorectum come out and the colon is joined just above the anal canal. In a Swedish trial, a defunctioning stoma cut symptomatic leaks from 28.0% to 10.3% and urgent reoperation from 25.4% to 8.6%. In ACOSOG Z6051, 76.7% had a low anterior resection. [[Matthiessen2007,Fleshman2015]]`},
 apr:{site:'Low rectum, involving the sphincters',op:'Abdominoperineal resection',seg:[.78,1],tu:.985,ties:['IMA'],cut:['sigmoid','superior rectal','trunk'],recon:'apr',reconTxt:'permanent end colostomy',
  key:'Heald: APR kept to 11% of resections',
  read:`Abdominoperineal resection removes the rectum, anal canal and sphincters through the abdomen and the perineum, so the colon ends as a permanent colostomy. In Heald's series, low anterior resections kept APR with a permanent colostomy to 11%; in ACOSOG Z6051 it was 23.3%. [[Heald1986,Fleshman2015,Jayne2017]]`}
};
/* vessels: o = origin (S superior mesenteric, I inferior mesenteric, B IMA branch point), u = where they meet the bowel */
const SU_V={ileocolic:{o:'S',u:.025},'right colic':{o:'S',u:.17},'middle colic':{o:'S',u:.41},'left colic':{o:'I',u:.63},sigmoid:{o:'B',u:.81},'superior rectal':{o:'B',u:.93}};
const SU_STEPS=[
 {from:0,at:.1,k:'Step 1 · where is it?',t:'The site decides the operation',
  txt:`For non-metastatic bowel cancer, curative treatment ranges from endoscopic and local excision for early lesions to extensive surgery for locoregional disease, sometimes after radiotherapy or drugs to shrink the tumour. Survival is best when the cancer has not spread. The operation is named after the stretch of bowel it removes: choose a site above. [[Dekker2019]]`,
  pt:`The surgeon removes the part of the bowel that holds the tumour, together with the fatty tissue and glands that drain it.`,
  hook:`Colon: right hemicolectomy, left hemicolectomy, sigmoid colectomy. Rectum: high anterior, low anterior or abdominoperineal resection. [[Veldkamp2005,Jayne2017]]`},
 {from:.2,at:.3,k:'Step 2 · central vascular ligation',t:'Tie the vessels at their roots',
  txt:`In complete mesocolic excision (CME), the surgeon separates the mesocolic plane from the parietal plane and ties the supplying arteries and draining veins "right at their roots". The aim is one intact package of tumour plus its lymphatic drainage, the colon's version of total mesorectal excision. [[Hohenberger2009]]`,
  pt:`The blood vessels to this part of the bowel are tied off close to where they start, so everything they drain can come out together.`,
  hook:`CME = mesocolic plane + central ligation: TME's colon analogue. <span class="ev early">Early evidence</span> [[Hohenberger2009]]`},
 {from:.4,at:.5,k:'Step 3 · the lymph-node field',t:'The nodes travel with the vessels',
  txt:`Lymph drains along the blood vessels, so tying them centrally takes the whole chain of nodes in the fan of fat (violet). How many nodes the pathologist examines is itself prognostic: in INT-0089 (3,411 stage II–III patients) the median was 11 (range 1–87), and survival rose as more nodes were analysed, even when none held cancer. In MERCURY the median rectal harvest was 12. [[LeVoyer2003,MERCURY2006]]`,
  pt:`The glands are checked under the microscope. Finding cancer in them, or not, is what decides whether chemotherapy is offered.`,
  hook:`More nodes examined, better survival, even in node-negative patients (INT-0089, P=.0005). [[LeVoyer2003]]`},
 {from:.6,at:.7,k:'Step 4 · the specimen',t:'One intact package',
  txt:`The segment comes out with its vessels, fat and nodes in one piece. In Erlangen, as CME was adopted, cancer-related 5-year survival after curative resection rose from 82.1% to 89.1% (before–after data from one centre). For the rectum the same idea is total mesorectal excision: see the cross-section below. [[Hohenberger2009,Heald1986]]`,
  pt:`What comes out goes to the pathology lab, where it is measured, sliced and staged.`,
  hook:`Rectum: an intact mesorectum matters. Incomplete mesorectum: recurrence 36.1% vs 20.3% with a complete one. [[Nagtegaal2002]]`},
 {from:.8,at:.95,k:'Step 5 · reconstruction',t:'Join the ends, or make a stoma',
  txt:`Usually the two ends are joined (an anastomosis). After a very low join, a temporary loop ileostomy protects it: in a Swedish trial of 234 people, symptomatic leaks were 10.3% with a defunctioning stoma vs 28.0% without. At a median 42 months, 13.8% and 16.9% still had a stoma of some kind. When the sphincters must go, the colon ends as a permanent colostomy. [[Matthiessen2007]]`,
  pt:`Most people are joined back up. After a very low join, a temporary bag rests the join while it heals and makes a dangerous leak less likely.`,
  hook:`Defunctioning stoma after low anterior resection: symptomatic leak 28.0% → 10.3% (OR 3.4). [[Matthiessen2007]]`}
];
const SU_TSTEPS=[
 {from:0,at:.1,k:'Anatomy',t:'The rectum in its envelope',
  txt:`The rectum is wrapped in a cuff of fat, the mesorectum, that carries its lymph nodes and is bounded by a thin fascia. In 1982 Heald found minute deposits of cancer in the mesorectum several centimetres below the visible lower edge of the tumour in 5 cases, and began removing the whole mesorectum. [[Heald1982]]`,
  pt:`The back passage sits inside a fatty sleeve. Cancer can spread into that sleeve, so the whole sleeve is taken.`,
  hook:`TME = sharp dissection removing the rectum with its intact mesorectal envelope. [[Heald1986]]`},
 {from:.2,at:.38,k:'Tumour growth',t:'T3: through the wall into the fat',
  txt:`A T3 tumour grows through the muscle into the mesorectal fat. The distance left between tumour and fascia predicts the circumferential margin. In MERCURY (408 people), MRI predicted a clear margin with 92% specificity: 327 of the 349 cases MRI called clear were clear at surgery. [[MERCURY2006]]`,
  pt:`The scan before surgery shows how close the tumour is to the edge of the sleeve. That shapes the whole plan.`,
  hook:`MRI-predicted CRM is the key measurement on rectal staging MRI (MERCURY: specificity 92%). [[MERCURY2006]]`},
 {from:.45,at:.56,k:'The operation',t:'Dissecting in the "holy plane"',
  txt:`The surgeon cuts along the shiny plane just outside the fascia, so the envelope comes out whole. In Heald's series, an average of 4.2 years after TME there were 3 pelvic recurrences and no staple-line recurrences after curative surgery; corrected 5-year survival was 87%. With the mesorectum intact, the distal margin on the bowel could often be short enough to save the sphincters (39 had margins under 2.5 cm). [[Heald1986]]`,
  pt:`The surgeon follows a natural layer around the fatty sleeve, like peeling an orange with its pith intact.`,
  hook:`Heald 1986: 87% corrected 5-year survival after TME; no staple-line recurrences. [[Heald1986]]`},
 {from:.65,at:.76,k:'Pathology',t:'Ink the surface, measure the margin',
  txt:`The pathologist inks the outer surface of the specimen and slices it across. In Quirke's 1986 study of 52 rectal cancers, tumour reached the circumferential margin in 14 (27%), and 12 of those 14 developed pelvic recurrence. As a predictor of recurrence, margin involvement had a sensitivity of 95% and a specificity of 92%. The pathologist also grades the mesorectum as complete or not. [[Quirke1986,Nagtegaal2002]]`,
  pt:`If cancer cells touch the inked edge, some may have been left behind.`,
  hook:`Quirke 1986: involved CRM in 14/52; 12 of 14 recurred in the pelvis. [[Quirke1986]]`},
 {from:.85,at:.95,k:'Why it matters',t:'Margin and plane predict recurrence',
  txt:`Across more than 17,500 patients, an involved CRM predicted local recurrence (HR 6.3 after neoadjuvant therapy, 2.0 without), distant metastases (HR 2.8) and survival (HR 1.7). In the Dutch TME trial, recurrence was 36.1% with an incomplete mesorectum vs 20.3% with a complete one. In ACOSOG Z6051, a positive CRM worsened disease-free survival (HR 2.31). [[Nagtegaal2008,Nagtegaal2002,Fleshman2019]]`,
  pt:`A clean edge and an intact sleeve are the best protection against the cancer coming back in the pelvis.`,
  hook:`Involved CRM after neoadjuvant therapy: local recurrence HR 6.3. [[Nagtegaal2008]]`}
];

inits.surgery=()=>{
  /* ---------------- 1. the operation by site ---------------- */
  const svg=$('#suSvg'),rg=$('#suT');let site='right',setSt=()=>{};
  const qp=(a,c,b,f)=>[ (1-f)*(1-f)*a[0]+2*(1-f)*f*c[0]+f*f*b[0], (1-f)*(1-f)*a[1]+2*(1-f)*f*c[1]+f*f*b[1] ];
  function draw(t){
    const N=vb(svg,'720 330','400 540');const O=SU_OPS[site],ph=phaseOf(SU_STEPS,t);
    const G=N?{x:56,y:44,s:.96,px:20,py:340,pw:360}:{x:44,y:46,s:1,px:396,py:40,pw:316};
    const S=G.s,W=20*S,C=colon(G.x,G.y,S,{w:W}),A=(a,b)=>[G.x+a*300*S,G.y+b*240*S];
    const kV=ramp(t,.18,.34),kN=ramp(t,.38,.54),kR=ease(ramp(t,.6,.76)),kJ=ramp(t,.8,.94);
    let s=`<defs>${marker('suAr','var(--muted)')}</defs>`;
    /* abdominal wall */
    const ab=[A(-.12,-.1),A(1.1,1.14)];
    s+=`<rect x="${f1(ab[0][0])}" y="${f1(ab[0][1])}" width="${f1(ab[1][0]-ab[0][0])}" height="${f1(ab[1][1]-ab[0][1])}" rx="38" style="fill:none;stroke:var(--line);stroke-width:2;stroke-dasharray:6 5"/>`;
    s+=`<text x="${f1(ab[0][0]+8)}" y="${f1(ab[0][1]-6)}" class="t-xs">patient's right</text><text x="${f1(ab[1][0]-8)}" y="${f1(ab[0][1]-6)}" class="t-xs t-end">patient's left</text>`;
    /* aorta and origins */
    const S0=A(.43,.17),I0=A(.43,.47),B0=A(.5,.6);
    s+=`<line x1="${f1(A(.43,.02)[0])}" y1="${f1(A(.43,.02)[1])}" x2="${f1(A(.43,.86)[0])}" y2="${f1(A(.43,.86)[1])}" style="stroke:var(--vessel);stroke-width:${f1(7*S)};stroke-linecap:round;opacity:.55"/>`;
    s+=`<text x="${f1(A(.43,.86)[0])}" y="${f1(A(.43,.86)[1]+14)}" class="t-xs t-mid">aorta</text>`;
    const org={S:S0,I:I0,B:B0};
    const vEnd=u=>{const p=C.at(u),c=[G.x+150*S,G.y+120*S],d=Math.hypot(c[0]-p[0],c[1]-p[1])||1;return[p[0]+(c[0]-p[0])/d*W*.55,p[1]+(c[1]-p[1])/d*W*.55]};
    const vPath=n=>{const v=SU_V[n],o=org[v.o],e=vEnd(v.u),c=[o[0]+(e[0]-o[0])*.25,o[1]+(e[1]-o[1])*.85];return{o,c,e}};
    const cut=O.cut,inSpec=n=>cut.includes(n);
    /* bowel (with the gap once the specimen is lifted) */
    if(O.ileum||site==='right'){}
    const il0=A(.3,1.0),ilC=A(.12,1.02),il1=A(.035,.86);
    const ileumPath=`M${f1(il0[0])} ${f1(il0[1])}Q${f1(ilC[0])} ${f1(ilC[1])} ${f1(il1[0])} ${f1(il1[1])}`;
    s+=`<path d="${ileumPath}" style="fill:none;stroke:var(--mucosa-line);stroke-width:${f1(W*.7+3)};stroke-linecap:round"/><path d="${ileumPath}" style="fill:none;stroke:var(--mucosa);stroke-width:${f1(W*.7)};stroke-linecap:round"/>`;
    if(!N||true)s+=`<text x="${f1(il0[0]+6)}" y="${f1(il0[1]+4)}" class="t-xs">ileum</text>`;
    s+=C.svg;
    const segPath=(u0,u1)=>{let d='';for(let i=0;i<=30;i++){const p=C.at(lerp(u0,u1,i/30));d+=(i?'L':'M')+f1(p[0])+' '+f1(p[1])}return d};
    /* anus marker */
    const an=C.at(1);s+=`<text x="${f1(an[0]+W*.8)}" y="${f1(an[1]+3)}" class="t-xs">anus</text>`;
    /* vessels not in the specimen */
    Object.keys(SU_V).forEach(n=>{if(inSpec(n)&&kR>0)return;const P=vPath(n);s+=`<path d="M${f1(P.o[0])} ${f1(P.o[1])}Q${f1(P.c[0])} ${f1(P.c[1])} ${f1(P.e[0])} ${f1(P.e[1])}" style="fill:none;stroke:var(--vessel);stroke-width:${f1(2.6*S)};stroke-linecap:round"/>`});
    if(!(inSpec('trunk')&&kR>0))s+=`<line x1="${f1(I0[0])}" y1="${f1(I0[1])}" x2="${f1(B0[0])}" y2="${f1(B0[1])}" style="stroke:var(--vessel);stroke-width:${f1(3.4*S)};stroke-linecap:round"/>`;
    else s+=`<line x1="${f1(I0[0])}" y1="${f1(I0[1])}" x2="${f1(lerp(I0[0],B0[0],.4))}" y2="${f1(lerp(I0[1],B0[1],.4))}" style="stroke:var(--vessel);stroke-width:${f1(3.4*S)};stroke-linecap:round"/>`;
    s+=`<text x="${f1(S0[0]+7)}" y="${f1(S0[1]-4)}" class="t-xs" style="fill:var(--vessel)">SMA</text><text x="${f1(I0[0]-7)}" y="${f1(I0[1]-3)}" class="t-xs t-end" style="fill:var(--vessel)">IMA</text>`;
    /* ties */
    const tiePts=O.ties.map(n=>{if(n==='IMA')return[lerp(I0[0],B0[0],.42),lerp(I0[1],B0[1],.42),Math.atan2(B0[1]-I0[1],B0[0]-I0[0])];const P=vPath(n),p=qp(P.o,P.c,P.e,.16),q=qp(P.o,P.c,P.e,.2);return[p[0],p[1],Math.atan2(q[1]-p[1],q[0]-p[0])]});
    /* the specimen: field, segment, cut vessels, nodes, tumour */
    const u0=O.seg[0],u1=O.seg[1],tp=tiePts[0];
    let sp='';
    if(kN>0){let d=`M${f1(tp[0])} ${f1(tp[1])}`;for(let i=0;i<=24;i++){const p=C.at(lerp(u0,u1,i/24));d+=`L${f1(p[0])} ${f1(p[1])}`}
      tiePts.slice(1).forEach(q=>d+=`L${f1(q[0])} ${f1(q[1])}`);
      sp+=`<path d="${d}Z" style="fill:var(--lymph-soft);stroke:var(--lymph);stroke-width:1.4;stroke-dasharray:4 3;opacity:${f1(.25+.6*kN)}"/>`}
    if(kR>0){sp+=`<path d="${segPath(u0,u1)}" style="fill:none;stroke:var(--mucosa-line);stroke-width:${f1(W+3)};stroke-linecap:round;stroke-linejoin:round"/><path d="${segPath(u0,u1)}" style="fill:none;stroke:var(--mucosa);stroke-width:${f1(W)};stroke-linecap:round;stroke-linejoin:round"/>`;
      if(site==='right'){const c=C.at(0);sp+=`<circle cx="${f1(c[0])}" cy="${f1(c[1]+W*.3)}" r="${f1(W*.62)}" style="fill:var(--mucosa);stroke:var(--mucosa-line);stroke-width:1.5"/><path d="M${f1(A(.13,1.01)[0])} ${f1(A(.13,1.01)[1])}Q${f1(A(.07,.98)[0])} ${f1(A(.07,.98)[1])} ${f1(il1[0])} ${f1(il1[1])}" style="fill:none;stroke:var(--mucosa);stroke-width:${f1(W*.7)};stroke-linecap:round"/>`}
      cut.forEach(n=>{if(n==='trunk'){sp+=`<line x1="${f1(lerp(I0[0],B0[0],.46))}" y1="${f1(lerp(I0[1],B0[1],.46))}" x2="${f1(B0[0])}" y2="${f1(B0[1])}" style="stroke:var(--vessel);stroke-width:${f1(3.4*S)};stroke-linecap:round"/>`;return}
        const P=vPath(n),p=qp(P.o,P.c,P.e,.22);sp+=`<path d="M${f1(p[0])} ${f1(p[1])}Q${f1(lerp(p[0],P.c[0],.6))} ${f1(lerp(p[1],P.c[1],.6))} ${f1(P.e[0])} ${f1(P.e[1])}" style="fill:none;stroke:var(--vessel);stroke-width:${f1(2.6*S)};stroke-linecap:round"/>`})}
    if(kN>0){const rr=rng(7+u0*100);const nn=[];
      cut.forEach(n=>{if(n==='trunk'){nn.push([lerp(I0[0],B0[0],.75),lerp(I0[1],B0[1],.75)]);return}const P=vPath(n);[.4,.65,.88].forEach(f=>{const p=qp(P.o,P.c,P.e,f);nn.push([p[0]+(rr()-.5)*8,p[1]+(rr()-.5)*8])})});
      for(let i=0;i<3;i++){const p=C.at(lerp(u0,u1,.2+i*.3)),d=Math.hypot(tp[0]-p[0],tp[1]-p[1])||1;nn.push([p[0]+(tp[0]-p[0])/d*W*1.1,p[1]+(tp[1]-p[1])/d*W*1.1])}
      nn.forEach((p,i)=>{const show=ramp(kN,i/nn.length*.7,i/nn.length*.7+.3);if(show>0)sp+=node(p[0],p[1],5.5*S*show,i===nn.length-2&&kN>.9?.6:0)})}
    {const p=C.at(O.tu);sp+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="${f1(W*.62*(1+.12*Math.sin(t*40)*(ph===0?1:0)))}" style="fill:var(--tumour);stroke:var(--panel);stroke-width:1.5"/>`}
    /* gap left in the bowel, then the specimen lifted away */
    if(kR>0){s+=`<path d="${segPath(u0+.006,Math.min(1,u1-.004))}" style="fill:none;stroke:var(--panel);stroke-width:${f1(W+6)};stroke-linecap:butt;stroke-linejoin:round"/>`;
      if(site==='right'){const c=C.at(0);s+=`<circle cx="${f1(c[0])}" cy="${f1(c[1]+W*.3)}" r="${f1(W*.62+3)}" style="fill:var(--panel)"/><path d="M${f1(A(.14,1.012)[0])} ${f1(A(.14,1.012)[1])}Q${f1(A(.07,.98)[0])} ${f1(A(.07,.98)[1])} ${f1(il1[0])} ${f1(il1[1])}" style="fill:none;stroke:var(--panel);stroke-width:${f1(W*.7+6)}"/>`}
      if(O.recon==='apr')s+=`<circle cx="${f1(an[0])}" cy="${f1(an[1])}" r="${f1(W*.7)}" style="fill:var(--panel)"/>`;
      /* dashed ghost where the segment was */
      s+=`<path d="${segPath(u0,u1)}" style="fill:none;stroke:var(--muted);stroke-width:1;stroke-dasharray:3 4;opacity:${f1(.6*kR)}"/>`}
    const mid=C.at((u0+u1)/2),cx=G.x+150*S,cy=G.y+120*S,dd=Math.hypot(mid[0]-cx,mid[1]-cy)||1;
    const dx=(mid[0]-cx)/dd*16*kR,dy=(mid[1]-cy)/dd*16*kR+(site==='lar'||site==='apr'||site==='upper'?26*kR:14*kR);
    s+=`<g transform="translate(${f1(dx)} ${f1(dy)})" style="opacity:${f1(1-.15*kR)}">${sp}</g>`;
    if(kR>.6){s+=`<text x="${f1(mid[0]+dx)}" y="${f1(mid[1]+dy+(mid[1]<G.y+40?-W-4:W+14))}" class="t-xs t-mid" style="fill:var(--ink)">specimen</text>`}
    /* ties drawn on top */
    if(kV>0)tiePts.forEach(p=>{const a=p[2]+Math.PI/2,L=7*S,o=Math.cos(p[2])*3,q=Math.sin(p[2])*3;
      [-1,1].forEach(k=>s+=`<line x1="${f1(p[0]+k*o-Math.cos(a)*L*kV)}" y1="${f1(p[1]+k*q-Math.sin(a)*L*kV)}" x2="${f1(p[0]+k*o+Math.cos(a)*L*kV)}" y2="${f1(p[1]+k*q+Math.sin(a)*L*kV)}" style="stroke:var(--ink);stroke-width:2.4;stroke-linecap:round"/>`)});
    /* reconstruction */
    if(kJ>0){const e0=O.ileum?A(.14,1.012):C.at(u0),e1=O.recon==='apr'?A(.98,.98):C.at(Math.min(1,u1)),mm=[(e0[0]+e1[0])/2,(e0[1]+e1[1])/2+(O.recon==='apr'?0:18)];
      const bp=`M${f1(e0[0])} ${f1(e0[1])}Q${f1(mm[0])} ${f1(mm[1])} ${f1(e1[0])} ${f1(e1[1])}`,len=Math.hypot(e1[0]-e0[0],e1[1]-e0[1])*1.2+20;
      s+=`<path d="${bp}" style="fill:none;stroke:var(--mucosa-line);stroke-width:${f1(W*.75+3)};stroke-linecap:round;stroke-dasharray:${f1(len*kJ)} ${f1(len)}"/><path d="${bp}" style="fill:none;stroke:var(--mucosa);stroke-width:${f1(W*.75)};stroke-linecap:round;stroke-dasharray:${f1(len*kJ)} ${f1(len)}"/>`;
      if(kJ>.95){if(O.recon==='apr'){s+=`<circle cx="${f1(e1[0])}" cy="${f1(e1[1])}" r="${f1(W*.55)}" style="fill:var(--brand-soft);stroke:var(--brand);stroke-width:2"/><text x="${f1(e1[0]-4)}" y="${f1(e1[1]+W+12)}" class="t-xs t-end" style="fill:var(--brand)">end colostomy</text>`;
          s+=`<path d="M${f1(an[0]-6)} ${f1(an[1]-6)}l12 12M${f1(an[0]+6)} ${f1(an[1]-6)}l-12 12" style="stroke:var(--bad);stroke-width:2.2"/><text x="${f1(an[0]-10)}" y="${f1(an[1]+4)}" class="t-xs t-end" style="fill:var(--bad)">anus closed</text>`}
        else{const j=O.ileum?e1:e1;s+=`<circle cx="${f1(j[0])}" cy="${f1(j[1])}" r="${f1(W*.5)}" style="fill:none;stroke:var(--rx);stroke-width:2;stroke-dasharray:2 2"/>`;
          s+=`<text x="${f1(j[0]+(j[0]>cx?-W:W))}" y="${f1(j[1]+(j[1]>cy?W+8:W+16))}" class="t-xs${j[0]>cx?' t-end':''}" style="fill:var(--rx)">anastomosis</text>`}
        if(O.recon==='lar'){const st=A(.05,1.0);s+=`<circle cx="${f1(st[0])}" cy="${f1(st[1])}" r="${f1(W*.5)}" style="fill:var(--brand-soft);stroke:var(--brand);stroke-width:2"/><text x="${f1(st[0])}" y="${f1(st[1]+W+10)}" class="t-xs t-mid" style="fill:var(--brand)">loop ileostomy</text>`}}}
    /* ---- information panel ---- */
    let y=G.py;const px=G.px,cw=N?40:33;
    s+=`<text x="${px}" y="${y}" class="t-sm" style="fill:var(--rx)">${O.site.toUpperCase()}</text>`;y+=22;
    s+=`<text x="${px}" y="${y}" class="t-big">${O.op}</text>`;y+=N?18:24;
    const rows=[[kV,'Tie',O.ties.map(n=>n==='IMA'?'inferior mesenteric (IMA) trunk':n+' vessels').join(' + ')+', at the root'],[kN,'Nodes','the fan of fat and nodes along the tied vessels'],[kR,'Remove',site==='right'?'caecum, ascending colon, end of ileum':site==='lar'?'rectum with the whole mesorectum (TME)':site==='apr'?'rectum, anal canal and sphincters':site==='upper'?'sigmoid end + upper rectum and its mesorectum':'the '+O.site.toLowerCase()+' with its mesentery'],[kJ,'Rebuild',O.reconTxt]];
    rows.forEach(([k,h,v])=>{const on=k>0;s+=`<text x="${px}" y="${y}" class="t-sm" style="fill:${on?'var(--rx)':'var(--muted)'};font-weight:700">${on?'✓':'○'} ${h.toUpperCase()}</text>`;
      suWrap(v,cw).forEach((l,i)=>{s+=`<text x="${px+80}" y="${y+i*15}" class="t-sm" style="fill:${on?'var(--ink)':'var(--muted)'};opacity:${on?1:.6}">${l}</text>`;});y+=15*Math.max(1,suWrap(v,cw).length)+(N?7:10)});
    y+=N?2:8;
    s+=`<rect x="${px}" y="${y}" width="${G.pw}" height="${N?30:34}" rx="8" style="fill:var(--rx-soft)"/><text x="${px+10}" y="${y+(N?19:21)}" class="t-sm" style="fill:var(--rx)">${O.key}</text>`;
    svg.innerHTML=s;
    setSt(ph);
    const P=SU_STEPS[ph];
    $('#suNote').innerHTML=noteHTML(P);
    $('#suRead').innerHTML=`<span>${O.read}</span>`;
  }
  const stop=playWire(rg,$('#suPlay'),draw,16000,'%t:player.replay%','surgery');
  setSt=stepWire($('#suSteps'),SU_STEPS,rg,draw,stop);
  $$('[data-su-site]').forEach(b=>b.addEventListener('click',()=>{stop();site=b.dataset.suSite;$$('[data-su-site]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---------------- 2. TME cross-section ---------------- */
  const tv=$('#suTme'),tr=$('#suTmeT');let mode='clear',breach=false,setT=()=>{};
  function drawT(t){
    const N=vb(tv,'720 340','400 580');const ph=phaseOf(SU_TSTEPS,t);
    const cx=N?200:200,cy=N?176:168,FX=N?128:132,FY=N?100:104,RW=46,RM=33,RL=20;
    const kG=ease(ramp(t,.2,.42)),kD=ramp(t,.45,.6),kP=ramp(t,.65,.78),kW=ramp(t,.85,.95);
    const ta=-Math.PI*.74,tw=.62;/* tumour centred toward the front-left */
    const fR=a=>1/Math.sqrt(Math.pow(Math.cos(a)/FX,2)+Math.pow(Math.sin(a)/FY,2));
    const maxD=mode==='threat'?fR(ta)-RM-1:fR(ta)-RM-22;
    const depth=lerp(4,maxD,kG);
    const mmPer=.2,crm=Math.max(0,(fR(ta)-RM-depth)*mmPer);
    let s='';
    /* pelvis: sacrum behind (bottom), side walls */
    s+=`<path d="M${cx-FX-34} ${cy+FY+44}Q${cx} ${cy+FY+6} ${cx+FX+34} ${cy+FY+44}L${cx+FX+34} ${cy+FY+66}Q${cx} ${cy+FY+28} ${cx-FX-34} ${cy+FY+66}Z" style="fill:var(--serosa);stroke:var(--muted);stroke-width:1"/>`;
    s+=`<text x="${cx}" y="${cy+FY+58}" class="t-xs t-mid">sacrum (back)</text><text x="${cx}" y="${cy-FY-22}" class="t-xs t-mid">front (bladder, prostate or vagina)</text>`;
    /* mesorectum + fascia, with a breach notch */
    const bA=Math.PI*.18;
    let mp='';for(let i=0;i<=72;i++){const a=i/72*Math.PI*2;let r=fR(a);if(breach&&kD>0){const da=Math.atan2(Math.sin(a-bA),Math.cos(a-bA));if(Math.abs(da)<.32)r-=(1-Math.abs(da)/.32)*30*Math.min(1,kD*2)}mp+=(i?'L':'M')+f1(cx+Math.cos(a)*r)+' '+f1(cy+Math.sin(a)*r)}
    const sx=(kP>0?-(N?0:0):0);
    if(breach&&kD>0){/* fat left behind in the pelvis */let lb='';for(let i=0;i<=20;i++){const a=bA-.32+i/20*.64,r=fR(a);lb+=(i?'L':'M')+f1(cx+Math.cos(a)*r)+' '+f1(cy+Math.sin(a)*r)}
      for(let i=20;i>=0;i--){const a=bA-.32+i/20*.64,da=Math.atan2(Math.sin(a-bA),Math.cos(a-bA)),r=fR(a)-(1-Math.abs(da)/.32)*30*Math.min(1,kD*2);lb+='L'+f1(cx+Math.cos(a)*r)+' '+f1(cy+Math.sin(a)*r)}
      s+=`<path d="${lb}Z" style="fill:var(--fat);stroke:var(--bad);stroke-width:1.4"/>`;
      const la=bA,lr=fR(la)+12;s+=`<text x="${f1(cx+Math.cos(la)*lr+4)}" y="${f1(cy+Math.sin(la)*lr+4)}" class="t-xs" style="fill:var(--bad)">${N?'fat left behind':'mesorectum left behind'}</text>`}
    s+=`<path d="${mp}Z" style="fill:var(--fat);stroke:${kP>0?'var(--accent)':'var(--muted)'};stroke-width:${kP>0?f1(1.2+3*kP):1.2}"/>`;
    if(kP>0)s+=`<text x="${f1(cx-FX-6)}" y="${f1(cy-FY*.55)}" class="t-xs t-end" style="fill:var(--accent)">ink</text>`;
    /* nodes */
    const nodes=[[-.75,.55],[.65,.6],[.2,-.72],[-.15,.78],[.8,-.2],[-.85,-.1]];
    nodes.forEach(([a,b],i)=>{const x=cx+a*FX*.82,y=cy+b*FY*.82;s+=node(x,y,7,mode==='threat'&&i===5&&kG>.7?.7:0)});
    /* rectal wall layers */
    s+=`<circle cx="${cx}" cy="${cy}" r="${RW}" style="fill:var(--muscle);opacity:.85;stroke:var(--mucosa-line);stroke-width:1"/><circle cx="${cx}" cy="${cy}" r="${RM}" style="fill:var(--mucosa);stroke:var(--mucosa-line)"/><circle cx="${cx}" cy="${cy}" r="${RL}" style="fill:var(--field)"/>`;
    /* tumour wedge */
    {let d='';const rr=rng(9),n=16;for(let i=0;i<=n;i++){const a=ta-tw/2+i/n*tw,bump0=Math.sin(i/n*Math.PI),r=RM+depth*(0.55+.45*bump0)*(1+(rr()-.5)*.12);d+=(i?'L':'M')+f1(cx+Math.cos(a)*r)+' '+f1(cy+Math.sin(a)*r)}
      for(let i=n;i>=0;i--){const a=ta-tw/2+i/n*tw;d+='L'+f1(cx+Math.cos(a)*(RL+3))+' '+f1(cy+Math.sin(a)*(RL+3))}
      s+=`<path d="${d}Z" style="fill:var(--tumour);opacity:.9;stroke:var(--tumour);stroke-linejoin:round"/>`}
    /* dissection line traced around the fascia */
    if(kD>0){let dp='';for(let i=0;i<=72;i++){const a=Math.PI/2+i/72*Math.PI*2;let r=fR(a)+5;if(breach){const da=Math.atan2(Math.sin(a-bA),Math.cos(a-bA));if(Math.abs(da)<.32)r-=(1-Math.abs(da)/.32)*35}dp+=(i?'L':'M')+f1(cx+Math.cos(a)*r)+' '+f1(cy+Math.sin(a)*r)}
      const L=2*Math.PI*Math.max(FX,FY)+60;s+=`<path d="${dp}" style="fill:none;stroke:${breach?'var(--bad)':'var(--rx)'};stroke-width:2;stroke-dasharray:${f1(L*kD)} ${f1(L)}"/>`;
      const sc=[cx+Math.cos(Math.PI/2+kD*Math.PI*2)*(fR(Math.PI/2+kD*Math.PI*2)+5),cy+Math.sin(Math.PI/2+kD*Math.PI*2)*(fR(Math.PI/2+kD*Math.PI*2)+5)];
      if(kD<1)s+=`<circle cx="${f1(sc[0])}" cy="${f1(sc[1])}" r="4" style="fill:var(--rx)"/>`}
    /* margin ruler */
    if(kG>.3){const r1=RM+depth,r2=fR(ta),p1=[cx+Math.cos(ta)*r1,cy+Math.sin(ta)*r1],p2=[cx+Math.cos(ta)*r2,cy+Math.sin(ta)*r2];
      s+=`<line x1="${f1(p1[0])}" y1="${f1(p1[1])}" x2="${f1(p2[0])}" y2="${f1(p2[1])}" style="stroke:var(--ink);stroke-width:1.4"/><circle cx="${f1(p2[0])}" cy="${f1(p2[1])}" r="2.5" style="fill:var(--ink)"/>`;
      s+=`<text x="${f1(p2[0]-6)}" y="${f1(p2[1]-6)}" class="t-sm t-end" style="fill:${crm<=1?'var(--bad)':'var(--ink)'}">CRM ${crm<=.05?'0':f1(crm)} mm</text>`}
    /* labels */
    if(!N||true){s+=`<text x="${cx}" y="${cy+4}" class="t-xs t-mid">lumen</text>`;
      const la=Math.PI*.82,lr=FX*.98;s+=`<text x="${f1(cx+Math.cos(la)*lr-8)}" y="${f1(cy+Math.sin(la)*lr+30)}" class="t-xs t-end">mesorectum</text>`;
      s+=`<text x="${f1(cx+FX+8)}" y="${f1(cy+6)}" class="t-xs">fascia</text>`}
    /* side panel */
    const px=N?20:400,py=N?378:36,pw=N?360:300;let y=py;
    s+=`<text x="${px}" y="${y}" class="t-sm" style="fill:var(--rx)">${SU_TSTEPS[ph].k.toUpperCase()}</text>`;y+=24;
    const verdict=crm<=1?(mode==='threat'?'CRM involved (≤1 mm)':'margin narrowing'):'CRM clear';
    s+=`<text x="${px}" y="${y}" class="t-big" style="fill:${crm<=1&&mode==='threat'?'var(--bad)':'var(--ink)'}">${kG>.3?verdict:'Rectum, mesorectum, fascia'}</text>`;y+=22;
    s+=`<text x="${px}" y="${y}" class="t-xs">plane: ${breach?'breached (incomplete mesorectum)':'intact (complete mesorectum)'}</text>`;y+=24;
    if(ph>=3){/* Quirke: 14 margin-positive cases, 12 recurred */
      s+=`<text x="${px}" y="${y}" class="t-xs" style="fill:var(--ink)">Quirke 1986: 14 of 52 had an involved margin;</text>`;y+=13;s+=`<text x="${px}" y="${y}" class="t-xs" style="fill:var(--ink)">12 of those 14 recurred in the pelvis</text>`;y+=12;
      const n=Math.round(14*(ph===3?kP:1));for(let i=0;i<14;i++){const x=px+8+i*(N?24:20);s+=person(x,y,16,i<n?(i<12?'var(--bad)':'var(--good)'):'var(--line)')}y+=32}
    if(ph>=4){const bars=breach?[['incomplete mesorectum',36.1,'var(--bad)'],['complete mesorectum',20.3,'var(--good)']]:[['CRM involved, after neoadjuvant Rx','HR 6.3','var(--bad)'],['CRM involved, no neoadjuvant Rx','HR 2.0','var(--warn)']];
      s+=`<text x="${px}" y="${y}" class="t-xs" style="fill:var(--ink)">${breach?'Dutch TME trial: recurrence':'Local recurrence risk, involved vs clear CRM'}</text>`;y+=8;
      bars.forEach(([l,v,c])=>{const w=(pw-10)*(typeof v==='number'?v/40:(parseFloat(v.slice(3))/7))*kW;s+=`<rect x="${px}" y="${y}" width="${f1(Math.max(2,w))}" height="14" rx="3" style="fill:${c};opacity:.8"/><text x="${px+4}" y="${y+26}" class="t-xs">${l}: <tspan style="fill:var(--ink);font-weight:700">${typeof v==='number'?v+'%':v}</tspan></text>`;y+=34})}
    tv.innerHTML=s;setT(ph);$('#suTmeNote').innerHTML=noteHTML(SU_TSTEPS[ph]);
  }
  const stopT=playWire(tr,$('#suTmePlay'),drawT,14000,'%t:player.replay%','surgery');
  setT=stepWire($('#suTmeSteps'),SU_TSTEPS,tr,drawT,stopT);
  $$('[data-su-tme]').forEach(b=>b.addEventListener('click',()=>{stopT();mode=b.dataset.suTme;$$('[data-su-tme]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawT(+tr.value)}));
  $('#suBreach').addEventListener('click',()=>{breach=!breach;$('#suBreach').setAttribute('aria-pressed',breach);drawT(+tr.value)});
  drawT(+tr.value);

  /* ---------------- 3. leaks and stomas: 100 people ---------------- */
  const LK={noStoma:{v:28.0,c:'var(--bad)',w:'symptomatic anastomotic leak',t:'Low join without a defunctioning stoma',
     txt:`In the Swedish randomised trial (234 people having low anterior resection; median join 5 cm from the anal verge; 79% had radiotherapy first), 28.0% of those without a defunctioning stoma had a symptomatic leak, and 25.4% needed urgent reoperation. [[Matthiessen2007]]`,pt:`About 28 in 100 had a leak from the join when it was not protected.`},
   stoma:{v:10.3,c:'var(--bad)',w:'symptomatic anastomotic leak',t:'Low join protected by a loop stoma',
     txt:`With a temporary defunctioning stoma, symptomatic leaks fell to 10.3% (OR 3.4; 95% CI 1.6–6.9) and urgent reoperation to 8.6%. The stoma is usually closed later; at a median 42 months, 13.8% of this group still had a stoma of some kind. [[Matthiessen2007]]`,pt:`A temporary bag cut leaks to about 10 in 100.`},
   emerg:{v:67.9,c:'var(--brand)',w:'had a stoma formed',t:'Obstructing cancer: emergency surgery',
     txt:`In CReST (245 people with left-sided malignant obstruction), 67.9% of those treated with curative intent who went straight to emergency surgery had a stoma formed. 30-day mortality was 5.6%. [[CReST2022]]`,pt:`About 68 in 100 needed a stoma when the blocked bowel was operated on as an emergency.`},
   stent:{v:47.5,c:'var(--brand)',w:'had a stoma formed',t:'Obstructing cancer: stent, then planned surgery',
     txt:`A stent relieved obstruction in 82.4% of attempts. Stent-then-elective surgery led to a stoma in 47.5% (P=.003 vs emergency surgery), with 30-day mortality 3.6% (not significantly different) and no difference in 3-year recurrence. [[CReST2022]]`,pt:`A stent first meant fewer people needed a stoma: about 48 in 100.`}};
  const lv=$('#suLeak');let lk='noStoma',stopL=null;
  function drawL(k){const N=vb(lv,'520 250','400 300'),D=LK[lk],n=Math.round(D.v);let s='';const cols=N?10:20,sz=N?22:18,gx=N?36:24,gy=N?26:30,x0=N?14:22,y0=N?40:40;
    s+=`<text x="${x0}" y="22" class="t-sm" style="fill:${D.c}">${f1(D.v)} IN 100 ${D.w.toUpperCase()}</text>`;
    for(let i=0;i<100;i++){const r=Math.floor(i/cols),c=i%cols,on=i<n*k;s+=person(x0+gx*c+gx/2,y0+r*gy,sz,on?D.c:'var(--line)')}
    lv.innerHTML=s}
  function showL(){$('#suLeakNote').innerHTML=noteHTML({k:'Trial arm',t:LK[lk].t,txt:LK[lk].txt,pt:LK[lk].pt,hook:lk==='noStoma'||lk==='stoma'?'Defunctioning stoma after low anterior resection: leak 28.0% → 10.3%. [[Matthiessen2007]]':'CReST: stent as a bridge cut stoma formation from 67.9% to 47.5%. [[CReST2022]]'});
    if(stopL)stopL();stopL=animate(900,p=>drawL(ease(p)))}
  $$('[data-su-leak]').forEach(b=>b.addEventListener('click',()=>{lk=b.dataset.suLeak;$$('[data-su-leak]').forEach(x=>x.setAttribute('aria-pressed',x===b));showL()}));
  drawL(1);showL();
  onHide.surgery=(f=>()=>{f&&f();if(stopL)stopL()})(onHide.surgery);
  const prevR=redraws.surgery;redraws.surgery=()=>{prevR&&prevR();drawL(1);drawH()};

  /* ---------------- 4. Haggitt levels ---------------- */
  const hv=$('#suHag');let lev=4;
  const HG=[{n:'Level 0',t:'Carcinoma confined to the mucosa',d:'Intramucosal carcinoma: none of 65 patients with carcinoma confined to the mucosa had an adverse outcome over a mean 81 months.',pt:'Cancer cells are still only in the surface layer of the polyp. Removing the polyp is expected to be enough.'},
   {n:'Level 1',t:'Invasion into the head',d:'Carcinoma has crossed into the submucosa of the polyp head. Of 64 patients with invasive carcinoma, 8 had an adverse outcome overall.',pt:'The cancer has gone a little deeper, but is still in the top of the polyp.'},
   {n:'Level 2',t:'Invasion to the neck',d:'Invasion reaches the junction of head and stalk. Level 4 invasion and rectal location were the only significant adverse factors.',pt:'The cancer reaches where the head meets the stalk.'},
   {n:'Level 3',t:'Invasion into the stalk',d:'Invasion reaches the stalk but not the bowel wall below it.',pt:'The cancer is in the stalk, still above the bowel wall.'},
   {n:'Level 4',t:'Invasion into the bowel wall',d:'Invasion reaches the submucosa of the bowel wall below the stalk (as in any sessile polyp with invasion). Seven of 28 level-4 lesions had an adverse outcome. With rectal location, this was the only significant adverse factor.',pt:'The cancer has reached the bowel wall under the polyp. Surgery to remove that part of the bowel is usually discussed.'}];
  function drawH(){const N=vb(hv,'520 300','400 330');let s='';const cx=N?150:170,base=N?222:206,W0=N?250:280,x0=cx-W0/2;
    const w=wall(x0,base,W0,{h:N?100:90,labels:false});s+=w.svg;
    const hy=N?92:84,hr=N?62:64,hh=N?48:46,neck=hy+hh*.78;
    /* stalk */
    s+=`<path d="M${cx-14} ${base}C${cx-12} ${base-30} ${cx-16} ${neck+20} ${cx-22} ${neck}L${cx+22} ${neck}C${cx+16} ${neck+20} ${cx+12} ${base-30} ${cx+14} ${base}Z" style="fill:var(--submucosa);stroke:var(--mucosa-line);stroke-width:1.4"/>`;
    s+=`<ellipse cx="${cx}" cy="${hy}" rx="${hr}" ry="${hh}" style="fill:var(--polyp);stroke:var(--polyp-line);stroke-width:1.6"/><ellipse cx="${cx}" cy="${hy+4}" rx="${hr-9}" ry="${hh-9}" style="fill:var(--submucosa);opacity:.8"/>`;
    /* cancer extent */
    const yl=[hy-hh+6,hy+6,neck+2,base-6,base+w.y.muscularis-w.y.mucosa-4][lev];
    s+=`<clipPath id="suHclip"><rect x="0" y="0" width="520" height="${f1(yl)}"/></clipPath>`;
    s+=`<g clip-path="url(#suHclip)"><path d="M${cx-30} ${hy-hh+2}Q${cx} ${hy-hh-6} ${cx+30} ${hy-hh+2}L${cx+18} ${hy+hh}L${cx+8} ${base+40}L${cx-8} ${base+40}L${cx-18} ${hy+hh}Z" style="fill:var(--tumour);opacity:.85"/></g>`;
    /* level guide lines */
    const LY=[hy-hh+4,hy-6,neck,(neck+base)/2,base+(w.y.submucosa-w.y.mucosa)+8],nm=['0 mucosa','1 head','2 neck','3 stalk','4 wall submucosa'];
    LY.forEach((y,i)=>{const on=i===lev;s+=`<line x1="${cx+hr*.4}" x2="${N?x0+W0+4:cx+W0/2+10}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:${on?'var(--tumour)':'var(--muted)'};stroke-width:${on?1.8:1};stroke-dasharray:3 3"/><text x="${N?x0+W0+8:cx+W0/2+14}" y="${f1(y+4)}" class="t-sm" style="fill:${on?'var(--tumour)':'var(--muted)'};font-weight:${on?700:500}">${N?nm[i].split(' ')[0]+' '+nm[i].split(' ')[1]:nm[i]}</text>`});
    s+=`<text x="${x0}" y="${base+(N?96:84)}" class="t-xs">bowel wall: mucosa, submucosa, muscle</text>`;
    hv.innerHTML=s;
    const H=HG[lev];$('#suHagNote').innerHTML=noteHTML({k:H.n+' · Haggitt 1985',t:H.t,txt:H.d+' [[Haggitt1985]]',pt:H.pt,hook:'Haggitt levels: 0 mucosa, 1 head, 2 neck, 3 stalk, 4 submucosa of the wall below the stalk. Level 4 and rectal site predicted adverse outcome. [[Haggitt1985]]'})}
  $$('[data-su-hag]').forEach(b=>b.addEventListener('click',()=>{lev=+b.dataset.suHag;$$('[data-su-hag]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawH()}));
  drawH();
};
