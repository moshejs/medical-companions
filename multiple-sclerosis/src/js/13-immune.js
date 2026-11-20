
/* =============== 1.3 immune: the immune attack =============== */
const IM_STEPS=[
 {from:0,at:.12,k:'Step 1 · Lymph node',t:'Activation in the lymph node',
  txt:`<span class="ev est">Established model</span> Early in MS, a peripheral immune response aimed at the brain and spinal cord drives the disease; later, reactions confined within the CNS dominate. [[Hemmer2015]] In a lymph node, an antigen-presenting cell (APC) shows a peptide on MHC class II to CD4 helper T cells, which become Th1 and Th17 effector cells and multiply; CD8 T cells and B cells are activated too. Myelin-reactive T cells occur in similar proportions in people with and without MS, so either they are dysfunctional in MS or other immune factors are needed. [[Reich2018]] Weak regulatory T cells (CD4+CD25+FoxP3+) are proposed to let the response run unchecked. [[Kieseier2011]] MS risk genes point mainly to T-helper-cell differentiation and are enriched in every major peripheral immune cell type. [[IMSGC2011,IMSGC2019]]`,
  pt:`Immune cells that should ignore the brain are switched on in a lymph node, far away from it, and copy themselves.`,
  hook:`"Outside-in" model: autoreactive CD4 T cells (Th1, Th17) are activated in the periphery first. Myelin-reactive T cells are also found in healthy people.`},
 {from:.17,at:.28,k:'Step 2 · Exit',t:'Leaving the node (S1P)',
  txt:`T and B lymphocytes need the receptor S1P1 to leave a lymph node. They follow sphingosine-1-phosphate (S1P), which is lower inside the node than in lymph and blood. S1P1 is switched down during activation, which holds cells in the node for a while; in mice, FTY720 (fingolimod) created a temporary "S1P1-null" state that trapped lymphocytes. [[Matloubian2004]] The cells reach the blood through the efferent lymph.`,
  pt:`To leave the lymph node, the cells follow a chemical trail out into the lymph and then the blood.`,
  hook:`Egress needs S1P1 on the lymphocyte. Fingolimod-phosphate activates, then down-regulates S1P1 (functional antagonism): cells are trapped in nodes and the blood lymphocyte count falls. [[Chun2010]]`},
 {from:.33,at:.39,k:'Step 3 · Entry',t:'Crossing the barrier (VLA-4)',
  txt:`On inflamed brain vessels, lymphocytes and monocytes grip VCAM-1 with the integrin VLA-4 (α4β1). An anti-α4 antibody blocked this binding, prevented immune cells from collecting in the CNS and prevented EAE in rats. [[Yednock1992]] Th17 cells release IL-17 and IL-22, which loosen the tight junctions between endothelial cells; human Th17 cells cross the barrier efficiently. [[Kebir2007]] Two-photon imaging in rat EAE shows effector T cells arresting on meningeal vessels and crawling against blood flow before they cross. [[Bartholomaus2009]] <b>Aside:</b> the choroid plexus makes the chemokine CCL20, and in mouse EAE CCR6+ Th17 cells enter there first, then trigger a second, CCR6-independent wave across parenchymal vessels. [[Reboldi2009]]`,
  pt:`The cells grab hooks on the inside wall of a brain blood vessel, hold on, and squeeze through.`,
  hook:`VLA-4 (α4β1 integrin) on the lymphocyte binds VCAM-1 on the endothelium. Natalizumab blocks α4. Th17 cells (CCR6+) can also enter through the choroid plexus via CCL20.`},
 {from:.5,at:.62,k:'Step 4 · Attack',t:'Reactivation and myelin damage',
  txt:`Inside, T cells meet phagocytes presenting myelin antigen and are reactivated (rat EAE). [[Bartholomaus2009]] Activated Th1, Th17 and CD8 T cells release proinflammatory cytokines. [[Kieseier2011]] Blood-borne macrophages and activated microglia strip and swallow myelin; on average 45% of the macrophage-like cells in active lesions are resident microglia. [[Reich2018,Zrzavy2017]] CD8 T cells dominate lesions in all disease courses and stages, often as a few expanded clones; CD4 cells gather in the perivascular cuff. [[MachadoSantos2018,Babbe2000,Reich2018]] Gadolinium leaks through the opened barrier, so the new lesion enhances on MRI: first near its centre, days later at its edge. [[Reich2018]] Axons are cut too: 11,236 transected axons per mm³ were counted in active lesions. [[Trapp1998]]`,
  pt:`Once inside, the cells are switched on again. Scavenger cells strip the insulation off nerve fibres. The leaky vessel lets MRI dye in, which is why a new lesion lights up.`,
  hook:`CD8 outnumber CD4 T cells in MS lesions (CD4 perivascular, CD8 throughout the tissue). Gadolinium enhancement marks blood-brain-barrier breakdown in an active lesion.`},
 {from:.67,at:.77,k:'Step 5 · B cells',t:'Antigen presentation and antibodies',
  txt:`<span class="ev est">Established</span> After B-cell depletion the response comes fast, as early as 8–12 weeks, before circulating immunoglobulin falls. So B cells are thought to matter most as antigen-presenting cells for helper T cells and as cytokine sources, rather than through antibody. [[Reich2018]] People with MS have more proinflammatory memory B cells that make GM-CSF and activate myeloid cells. [[Li2015]] Many plasmablasts and long-lived plasma cells lack CD20, so anti-CD20 therapy does not directly remove them, and the oligoclonal bands in spinal fluid do not appear to change. [[Greenfield2018,Comi2021]] Antibody and complement do sit with macrophages at sites of active demyelination, so they may matter in some lesions. [[Breij2008]]`,
  pt:`B cells show the target to T cells and send out alarm signals. Removing them calms the attack within weeks, long before antibody levels change.`,
  hook:`Anti-CD20 works before IgG falls: B cells act as APCs and cytokine sources. Plasma cells are CD20-negative, so oligoclonal bands persist on anti-CD20.`},
 {from:.83,at:.95,k:'Step 6 · Smouldering',t:'Trapped inflammation behind a closed barrier',
  txt:`In progressive MS inflammation persists but sits at least partly behind a closed blood-brain barrier, which makes it harder to treat. [[Lassmann2012]] Lesional CD8 T cells become tissue-resident: they gain CD103 and lose the exit molecules S1P1 and CCR7, while B cells gradually become plasma cells. [[MachadoSantos2018]] Meningeal B-cell follicles were found in 41.4% of 29 secondary progressive cases, and every follicle lay next to a large subpial cortical lesion. [[Magliozzi2007]] Iron collects in proinflammatory microglia at the edge of slowly expanding lesions [[DalBianco2017]]; 56% of patients had at least one such rim lesion on MRI, and rim lesions stayed stable or grew by 2.2% a year while rimless ones shrank by 3.6%. [[Absinta2019]] <span class="ev hyp">Hypothesis</span> Microglial oxidative injury and mitochondrial damage drive slow axon loss. [[Mahad2015]]`,
  pt:`Later the fire smoulders inside the brain, behind a vessel wall that has closed again. MRI dye no longer gets in, and most drugs reach it poorly.`,
  hook:`Paramagnetic (iron) rim lesions on MRI are a candidate marker of chronic active, smouldering lesions. Meningeal B-cell follicles go with subpial cortical damage in secondary progressive MS.`}
];
/* drug classes acting at each step: n = name, w = what (shown in the drawing), c = citations (note panel only) */
const IM_RX=[
 [{n:'Glatiramer acetate',w:'competes with myelin antigens for MHC',c:'[[Arnon2004]]'},
  {n:'Teriflunomide',w:'slows dividing T and B cells (DHODH)',c:'[[BarOr2014]]'},
  {n:'Cladribine, alemtuzumab',w:'deplete lymphocytes',c:'[[Leist2011,LemtradaLabel2025]]'}],
 [{n:'S1P receptor modulators',w:'S1P1 down-regulated: cells stay in the node',c:'[[Chun2010,MayzentLabel2026]]'}],
 [{n:'Natalizumab',w:'blocks α4 integrin (VLA-4) binding VCAM-1',c:'[[TyrukoLabel2025]]'},
  {n:'Interferon-β',w:'may reduce trafficking across the barrier',c:'[[Kieseier2011]]'}],
 [{n:'Fumarates',w:'Nrf2 antioxidant pathway, HCAR2',c:'[[Linker2011,Chen2014]]'},
  {n:'Interferon-β',w:'shifts cytokines to anti-inflammatory',c:'[[Kieseier2011]]'}],
 [{n:'Anti-CD20 antibodies',w:'remove CD20+ B cells; plasma cells spared',c:'[[OcrevusLabel2026,Greenfield2018]]'}],
 [{n:'BTK inhibitors (mostly in trials)',w:'aim at B cells and microglia behind the barrier',c:'[[Kramer2023]] Tolebrutinib was authorised in the EU in June 2026 for SPMS without relapses in the last 2 years; the FDA issued a complete response letter. [[EMA2026Cenrifki,Sanofi2025CRL]]'}]
];
/* a dendritic antigen-presenting cell with an MHC cup holding a peptide */
function imAPC(x,y,r=14,o=1){let g=`<g transform="translate(${f1(x)} ${f1(y)})" style="opacity:${(+o).toFixed(2)}">`;
  for(let i=0;i<7;i++){const a=i/7*Math.PI*2+.2,a2=a+.35;g+=`<path d="M${f1(Math.cos(a)*r*.7)} ${f1(Math.sin(a)*r*.7)} Q${f1(Math.cos(a)*r*1.5)} ${f1(Math.sin(a)*r*1.5)} ${f1(Math.cos(a2)*r*1.75)} ${f1(Math.sin(a2)*r*1.75)}" style="fill:none;stroke:var(--gold);stroke-width:2.2;stroke-linecap:round"/>`}
  g+=`<circle r="${r}" style="fill:var(--gold-soft);stroke:var(--gold);stroke-width:1.8"/><circle cx="${f1(-r*.2)}" r="${f1(r*.42)}" style="fill:var(--gold);opacity:.7"/>`;
  g+=`<path d="M${f1(r*.45)} ${f1(-r*.25)} v${f1(r*.5)} h${f1(r*.45)} v${f1(-r*.5)}" style="fill:none;stroke:var(--ink);stroke-width:1.4"/><circle cx="${f1(r*.68)}" cy="${f1(-r*.05)}" r="${f1(r*.14)}" style="fill:var(--attack)"/>`;
  return g+'</g>'}
function imBadge(x,y,n){return `<g><circle cx="${f1(x)}" cy="${f1(y)}" r="9" style="fill:var(--rx);stroke:var(--panel);stroke-width:1.5"/><text x="${f1(x)}" y="${f1(y+3.6)}" class="t-mid" style="font:700 10.5px var(--mono);fill:var(--panel)">${n}</text></g>`}
/* point at fraction p along a polyline */
function imAlong(P,p){let tot=0;const d=[];for(let i=1;i<P.length;i++){const l=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);d.push(l);tot+=l}
  let s=clamp(p)*tot;for(let i=0;i<d.length;i++){if(s<=d[i]||i===d.length-1){const u=d[i]?clamp(s/d[i]):1;return [lerp(P[i][0],P[i+1][0],u),lerp(P[i][1],P[i+1][1],u)]}s-=d[i]}return P[P.length-1]}
inits.immune=()=>{
  const svg=$('#imSvg'),rg=$('#imT'),rxBtn=$('#imRx');let showRx=false;
  const R=rng(13);const GD=Array.from({length:26},()=>[R(),R()]);
  const CY=Array.from({length:10},(_,i)=>({a:i/10*Math.PI*2+R()*.4,sp:.5+R()*.6}));
  const WIDE={W:720,H:460,
    hdr:[ [14,18,'1 · LYMPH NODE'],[232,18,'2 · BLOOD VESSEL'],[404,18,'3 · BRAIN & SPINAL CORD'] ],
    node:{cx:112,cy:215,rx:94,ry:138}, apc:[70,160], apcL:[70,194],
    home:{th17:[122,122],th1:[132,178],cd8a:[150,240],cd8b:[118,262],b:[80,300]}, clone:[ [152,104],[164,196] ],
    exit:[204,215], eff:[236,130], entry:[292,64],
    ves:'v', lumen:[262,30,88,368], wall:[350,30,14,368],
    bind:{th17:150,th1:210,cd8a:270,cd8b:320,b:362},
    dest:{th17:[452,278],th1:[478,372],cd8a:[652,192],cd8b:[682,280],b:[430,372]},
    cns:[364,26,356,374], men:[404,26,316,34], menL:[410,47], fol:[630,43], folL:[592,47],
    fy:[150,235,320], fx:[404,708],
    m1:[505,278], m2a:[372,236], m2:[540,192], plasma:[552,384],
    rim:{cx:560,cy:236,rx:80,ry:62},
    gd:[372,180,66,150],
    s1p:{x0:24,x1:250,y:372}, flow:[306,392],
    lab:{vla:[370,132,'start'],gd:[370,172,'start'],mg:[505,303],mac:[540,219],cd8:[708,80,'end'],cd8to:[652,176],les:[540,128],bL:[430,399],pL:[552,401],
         aside:[410,80],vcam:[344,46,'end'],ol:[676,108,'end']}, oligo:[692,104],
    rx:[ [ [92,138],[172,90],[102,322] ],[ [218,238] ],[ [322,232],[382,112] ],[ [524,256],[436,254] ],[ [412,350] ],[ [470,212],[700,43] ] ],
    band:{y:410,h:46,wide:true}};
  const NAR={W:400,H:966,
    hdr:[ [14,18,'1 · LYMPH NODE'],[66,322,'2 · BLOOD VESSEL'],[14,456,'3 · BRAIN & SPINAL CORD'] ],
    node:{cx:200,cy:150,rx:178,ry:100}, apc:[150,140], apcL:[150,174],
    home:{th17:[210,96],th1:[262,150],cd8a:[300,200],cd8b:[250,212],b:[100,190]}, clone:[ [246,78],[302,128] ],
    exit:[70,225], eff:[40,300], entry:[40,372],
    ves:'h', lumen:[6,340,388,66], wall:[6,406,388,14],
    bind:{th17:140,th1:200,cd8a:260,cd8b:320,b:90},
    dest:{th17:[80,654],th1:[140,770],cd8a:[330,566],cd8b:[352,655],b:[80,770]},
    cns:[0,420,400,476], men:[8,850,384,36], menL:[16,873], fol:[306,868], folL:[256,873],
    fy:[520,610,700], fx:[16,384],
    m1:[143,654], m2a:[220,440], m2:[182,566], plasma:[252,775],
    rim:{cx:200,cy:610,rx:82,ry:62},
    gd:[190,426,110,64],
    s1p:{x0:96,x1:380,y:270}, flow:[330,392],
    lab:{vla:[386,446,'end'],gd:[16,474,'start'],mg:[143,682],mac:[182,592],cd8:[392,729,'end'],les:[200,503],bL:[80,800],pL:[252,804],
         aside:[16,822],vcam:[386,334,'end'],ol:[392,470,'end']}, oligo:[366,488],
    rx:[ [ [172,120],[268,62],[122,212] ],[ [92,240] ],[ [140,372],[20,413] ],[ [166,636],[60,632] ],[ [58,750] ],[ [100,590],[372,868] ] ],
    band:{y:896,h:70,wide:false}};
  const CELLS=[
    {id:'th17',k:'t',l:'Th17',s:.17,c:.36},
    {id:'th1',k:'t',l:'Th1',s:.18,c:.38},
    {id:'cd8a',k:'t',l:'CD8',s:.19,c:.40},
    {id:'cd8b',k:'t',l:'CD8',s:.20,c:.42,born:.08},
    {id:'b',k:'b',l:'',s:.21,c:.44}];
  function pos(L,c,t){
    const h=L.home[c.id],by=L.bind[c.id],d=L.dest[c.id];
    let A,B;
    if(L.ves==='v'){A=[h,L.exit,L.eff,L.entry,[306,by-34],[337,by]];B=[ [337,by],[357,by],[380,by],d]}
    else{A=[h,L.exit,L.eff,L.entry,[by-34,370],[by,394]];B=[ [by,394],[by,413],[by,436],d]}
    const pa=ease(ramp(t,c.s,c.s+.12)),pb=ease(ramp(t,c.c,c.c+.07));
    if(pb>0)return {p:imAlong(B,pb),ph:2};
    if(pa>0)return {p:imAlong(A,pa),ph:pa<1?1:1.5};
    const j=Math.sin(t*40+h[0])*1.5;return {p:[h[0]+j,h[1]-j],ph:0};
  }
  function draw(t){
    const N=vb(svg,'720 460','400 966'),L=N?NAR:WIDE;
    const step=phaseOf(IM_STEPS,t);
    const open=ramp(t,.4,.5)*(1-ramp(t,.84,.9)), gdO=ramp(t,.5,.56)*(1-ramp(t,.84,.9));
    const loss=ramp(t,.55,.67), smoul=ramp(t,.84,.94), fade=1-.6*smoul;
    let s=`<defs>${marker('imA')}${marker('imAr','var(--rx)')}</defs>`;
    /* zone backgrounds */
    const [cx0,cy0,cw,ch]=L.cns;
    s+=`<rect x="${cx0}" y="${cy0}" width="${cw}" height="${ch}" rx="12" style="fill:var(--axon-soft);opacity:.45"/>`;
    s+=`<rect x="${L.men[0]}" y="${L.men[1]}" width="${L.men[2]}" height="${L.men[3]}" rx="8" style="fill:var(--csf);stroke:var(--line)"/><text x="${L.menL[0]}" y="${L.menL[1]}" class="t-xs">meninges</text>`;
    L.hdr.forEach(([x,y,tx])=>{s+=`<text x="${x}" y="${y}" class="t-sm" style="font-weight:600;fill:var(--ink)">${tx}</text>`});
    /* lymph node */
    const nd=L.node;
    s+=`<ellipse cx="${nd.cx}" cy="${nd.cy}" rx="${nd.rx}" ry="${nd.ry}" style="fill:var(--lymph);stroke:var(--bcell);stroke-width:1.6;opacity:.95"/>`;
    s+=`<ellipse cx="${nd.cx}" cy="${nd.cy}" rx="${nd.rx-10}" ry="${nd.ry-10}" style="fill:none;stroke:var(--bcell);stroke-width:1;stroke-dasharray:3 5;opacity:.5"/>`;
    /* S1P gradient bar */
    const sp=L.s1p,hiS=step===1?1:.55;
    s+=`<defs><linearGradient id="imS1p" x1="0" x2="1"><stop offset="0" style="stop-color:var(--rx);stop-opacity:.08"/><stop offset="1" style="stop-color:var(--rx);stop-opacity:.9"/></linearGradient></defs>`;
    s+=`<g style="opacity:${hiS}"><text x="${sp.x0}" y="${sp.y-5}" class="t-xs" style="fill:var(--ink)">S1P gradient</text><rect x="${sp.x0}" y="${sp.y}" width="${sp.x1-sp.x0}" height="7" rx="3.5" style="fill:url(#imS1p);stroke:var(--line)"/>`;
    s+=`<text x="${sp.x0}" y="${sp.y+18}" class="t-xs">low (node)</text><text x="${sp.x1}" y="${sp.y+18}" class="t-xs t-end">high (lymph, blood)</text></g>`;
    /* efferent lymphatic */
    const [ex,ey]=L.exit,[fx,fy]=L.eff,[nx,ny]=L.entry;
    s+=`<path d="M${ex} ${ey} Q${fx} ${fy} ${nx} ${ny}" style="fill:none;stroke:var(--lymph);stroke-width:16;stroke-linecap:round"/><path d="M${ex} ${ey} Q${fx} ${fy} ${nx} ${ny}" style="fill:none;stroke:var(--bcell);stroke-width:1;stroke-dasharray:4 4;opacity:.6"/>`;
    /* blood vessel and endothelium */
    const [lx,ly,lw,lh]=L.lumen,[wx,wy,ww,wh]=L.wall;
    s+=`<rect x="${lx}" y="${ly}" width="${lw}" height="${lh}" rx="6" style="fill:var(--vessel-soft)"/>`;
    if(L.ves==='v')s+=`<line x1="${lx}" x2="${lx}" y1="${ly}" y2="${ly+lh}" style="stroke:var(--vessel);stroke-width:3"/>`;
    else s+=`<line x1="${lx}" x2="${lx+lw}" y1="${ly}" y2="${ly}" style="stroke:var(--vessel);stroke-width:3"/>`;
    for(let i=0;i<7;i++){const u=((i/7)+t*1.6)%1;const [rx,ry]=L.ves==='v'?[lx+16+((i*29)%56),ly+10+u*(lh-20)]:[lx+10+u*(lw-20),ly+12+((i*23)%42)];
      s+=`<ellipse cx="${f1(rx)}" cy="${f1(ry)}" rx="${L.ves==='v'?5:7}" ry="${L.ves==='v'?7:5}" style="fill:var(--vessel);opacity:.35"/>`}
    s+=`<text x="${L.flow[0]}" y="${L.flow[1]}" class="t-xs t-mid">${L.ves==='v'?'blood flow ↓':'blood flow →'}</text>`;
    const nCell=Math.floor((L.ves==='v'?wh:ww)/30);
    for(let i=0;i<nCell;i++){
      const gap=2+6*open;
      if(L.ves==='v'){const y=wy+i*30;s+=`<rect x="${wx}" y="${f1(y+gap/2)}" width="${ww}" height="${f1(30-gap)}" rx="4" style="fill:var(--cell);stroke:var(--vessel);stroke-width:1.2"/>`;
        s+=`<rect x="${wx+3}" y="${f1(y-1.5)}" width="${ww-6}" height="3" style="fill:var(--vessel);opacity:${f1(1-open)}"/>`;
        s+=`<line x1="${wx}" x2="${wx-5}" y1="${y+15}" y2="${y+15}" style="stroke:var(--gold);stroke-width:1.4"/><circle cx="${wx-6}" cy="${y+15}" r="2.2" style="fill:var(--gold)"/>`}
      else{const x=wx+i*30;s+=`<rect x="${f1(x+gap/2)}" y="${wy}" width="${f1(30-gap)}" height="${wh}" rx="4" style="fill:var(--cell);stroke:var(--vessel);stroke-width:1.2"/>`;
        s+=`<rect x="${f1(x-1.5)}" y="${wy+3}" width="3" height="${wh-6}" style="fill:var(--vessel);opacity:${f1(1-open)}"/>`;
        s+=`<line y1="${wy}" y2="${wy-5}" x1="${x+15}" x2="${x+15}" style="stroke:var(--gold);stroke-width:1.4"/><circle cy="${wy-6}" cx="${x+15}" r="2.2" style="fill:var(--gold)"/>`}
    }
    const lv=L.lab;
    s+=`<text x="${lv.vcam[0]}" y="${lv.vcam[1]}" class="t-xs${lv.vcam[2]==='end'?' t-end':''}" style="fill:var(--gold)">${N?'gold lollipops: VCAM-1 · wall: endothelium':'VCAM-1 →'}</text>`;
    /* gadolinium leak */
    if(gdO>0){const [gx,gy,gw,gh]=L.gd;GD.forEach(([a,b],i)=>{const dd=ramp(t,.5+i*.002,.6);const x=L.ves==='v'?gx+a*gw*dd:gx+a*gw,y=L.ves==='v'?gy+b*gh:gy+b*gh*dd;
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="2.4" style="fill:var(--gd);stroke:var(--gold);stroke-width:.7;opacity:${f1(gdO)}"/>`});
      s+=`<text x="${lv.gd[0]}" y="${lv.gd[1]}" class="t-xs${lv.gd[2]==='end'?' t-end':''}" style="fill:var(--gold);opacity:${f1(gdO)}">${N?'Gd leaks in':'gadolinium leaks in: lesion enhances'}</text>`}
    if(smoul>0)s+=`<text x="${lv.gd[0]}" y="${lv.gd[1]}" class="t-xs${lv.gd[2]==='end'?' t-end':''}" style="fill:var(--ink);opacity:${f1(smoul)}">barrier closed again</text>`;
    /* nerve fibres */
    const fl=loss*(1-.0*smoul);
    L.fy.forEach((y,i)=>{const o={seg:N?36:40,gap:6,h:13,demy:[ [.3,.7] ],loss:fl};if(i===1&&t>.92)o.cut=.62;s+=fiber(L.fx[0],L.fx[1],y,o).svg});
    if(loss>0&&smoul<1)s+=`<text x="${lv.les[0]}" y="${lv.les[1]}" class="t-xs t-mid" style="fill:var(--attack);opacity:${f1(ramp(t,.58,.64)*(1-smoul))}">myelin stripped from the axons</text>`;
    /* an oligodendrocyte: one cell makes sheaths on several axons */
    {const [ox,oy]=L.oligo,fy0=L.fy[0]-6,oo=1-.4*loss;
      [-26,0,22].forEach(dx=>{s+=`<path d="M${ox} ${oy} Q${ox+dx*.4} ${oy+16} ${ox+dx} ${fy0}" style="fill:none;stroke:var(--myelin-line);stroke-width:1.5;opacity:${f1(oo)}"/>`});
      s+=`<circle cx="${ox}" cy="${oy}" r="7" style="fill:var(--myelin);stroke:var(--myelin-line);stroke-width:1.4;opacity:${f1(oo)}"/><circle cx="${ox}" cy="${oy}" r="3" style="fill:var(--nuc);opacity:${f1(oo)}"/>`;
      s+=`<text x="${lv.ol[0]}" y="${lv.ol[1]}" class="t-xs t-end">oligodendrocyte</text>`}
    /* iron rim (smouldering) */
    if(smoul>0){const r=L.rim;s+=`<ellipse cx="${r.cx}" cy="${r.cy}" rx="${r.rx}" ry="${r.ry}" style="fill:none;stroke:var(--gold);stroke-width:2;stroke-dasharray:5 4;opacity:${f1(smoul)}"/>`;
      for(let i=0;i<9;i++){const a=i/9*Math.PI*2+.5;const x=r.cx+Math.cos(a)*r.rx,y=r.cy+Math.sin(a)*r.ry;if(Math.hypot(x-L.m1[0],y-L.m1[1])<22)continue;
        s+=mac(x,y,7,smoul,1,20+i)+`<circle cx="${f1(x+4)}" cy="${f1(y-3)}" r="2" style="fill:var(--gold);opacity:${f1(smoul)}"/>`}
      s+=`<text x="${lv.les[0]}" y="${lv.les[1]}" class="t-xs t-mid" style="fill:var(--gold);font-weight:600;opacity:${f1(smoul)}">iron-rim lesion: slowly expanding edge</text>`}
    /* meningeal B-cell follicle */
    if(smoul>0){const [fx0,fy0]=L.fol;[[-28,-6],[-14,6],[0,-6],[14,6],[28,-6]].forEach(([dx,dy],i)=>{s+=bcell(fx0+dx,fy0+dy,6,smoul)});s+=plasma(fx0+44,fy0,6,smoul);
      s+=`<text x="${L.folL[0]}" y="${L.folL[1]}" class="t-xs t-end" style="fill:var(--bcell);font-weight:600;opacity:${f1(smoul)}">B-cell follicle →</text>`}
    /* antigen-presenting cell */
    s+=imAPC(L.apc[0],L.apc[1],13,1-.4*ramp(t,.3,.5));
    s+=`<text x="${L.apcL[0]}" y="${L.apcL[1]}" class="t-xs t-mid">APC</text>`;
    /* clones left behind in the node (proliferation) */
    L.clone.forEach(([x,y],i)=>{const o=ramp(t,.06+i*.02,.12+i*.02)*(1-.5*ramp(t,.3,.5));if(o>0)s+=tcell(x,y,8,o,i?'Th1':'Th17')});
    /* microglia (resident) and a blood-borne macrophage */
    const mAct=ramp(t,.52,.56);
    s+=mac(L.m1[0],L.m1[1],12,1,mAct>.5?1:0,7);
    s+=`<text x="${lv.mg[0]}" y="${lv.mg[1]}" class="t-xs t-mid" style="opacity:${f1(1-smoul)}">${mAct>.5?'activated microglia':'microglia'}</text>`;
    const m2p=ease(ramp(t,.5,.58)),m2o=ramp(t,.5,.52)*(1-ramp(t,.86,.95));
    if(m2o>0){const x=lerp(L.m2a[0],L.m2[0],m2p),y=lerp(L.m2a[1],L.m2[1],m2p);s+=mac(x,y,11,m2o,m2p>.9?1:0,4);
      if(m2p>.9)s+=`<text x="${lv.mac[0]}" y="${lv.mac[1]}" class="t-xs t-mid" style="opacity:${f1(m2o)}">macrophage</text>`}
    /* cell positions */
    const P={};CELLS.forEach(c=>{P[c.id]=pos(L,c,t)});
    /* contacts: APC → T cells (activation) */
    const act=bump(t,0,.17);
    if(act>0)['th17','th1'].forEach(id=>{const [x,y]=P[id].p;s+=`<line x1="${L.apc[0]}" y1="${L.apc[1]}" x2="${f1(x)}" y2="${f1(y)}" style="stroke:var(--attack);stroke-width:2;stroke-dasharray:3 3;opacity:${f1(act)}"/>`});
    /* reactivation contact T ↔ microglia, and cytokines */
    const re=ramp(t,.5,.54)*(1-ramp(t,.66,.7));
    if(re>0){const [x,y]=P.th17.p;s+=`<line x1="${f1(x)}" y1="${f1(y)}" x2="${L.m1[0]}" y2="${L.m1[1]}" style="stroke:var(--attack);stroke-width:2;stroke-dasharray:3 3;opacity:${f1(re)}"/>`;
      ['th17','cd8a','cd8b'].forEach((id,k)=>{const [cx,cy]=P[id].p;CY.forEach((q,j)=>{if(j%3!==k%3)return;const rr=14+((t*q.sp*30+j)%1)*26;s+=`<circle cx="${f1(cx+Math.cos(q.a)*rr)}" cy="${f1(cy+Math.sin(q.a)*rr)}" r="2" style="fill:var(--attack);opacity:${f1(re*.8)}"/>`})})}
    /* B cell presents to Th1; plasma cell and antibodies */
    const bp=ramp(t,.68,.72)*(1-ramp(t,.82,.86));
    if(bp>0){const [x1,y1]=P.b.p,[x2,y2]=P.th1.p;s+=`<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" style="stroke:var(--bcell);stroke-width:2;stroke-dasharray:3 3;opacity:${f1(bp)}"/>`;
      CY.forEach((q,j)=>{if(j%2)return;const rr=14+((t*q.sp*30+j)%1)*22;s+=`<circle cx="${f1(x1+Math.cos(q.a)*rr)}" cy="${f1(y1+Math.sin(q.a)*rr)}" r="1.8" style="fill:var(--bcell);opacity:${f1(bp*.8)}"/>`})}
    const plO=ramp(t,.7,.74);
    if(plO>0){s+=plasma(L.plasma[0],L.plasma[1],10,plO);
      for(let k=0;k<4;k++){const u=ease(ramp(t,.72+k*.02,.8+k*.02));if(u<=0)continue;const x=L.plasma[0]+10+k*10,y=lerp(L.plasma[1]-12,L.fy[2]+12,u);s+=ab(x,y,5,180,'var(--plasma)')}}
    if(t>.68){const o=ramp(t,.68,.72);s+=`<text x="${lv.bL[0]}" y="${lv.bL[1]}" class="t-xs t-mid" style="fill:var(--bcell);opacity:${f1(o)}">B cell · CD20+</text>`;
      if(plO>0)s+=`<text x="${lv.pL[0]}" y="${lv.pL[1]}" class="t-xs t-mid" style="fill:var(--plasma);opacity:${f1(plO)}">plasma cell · CD20−</text>`}
    /* the travelling cells */
    CELLS.forEach(c=>{const {p:[x,y],ph}=P[c.id];
      let o=c.born!=null?ramp(t,c.born,c.born+.05):1;
      if((c.id==='th17'||c.id==='th1'))o*=fade;
      if(o<=0)return;
      if(act>0&&(c.id==='th17'||c.id==='th1')||re>0&&c.id!=='b'&&c.id!=='th1')s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="17" style="fill:var(--attack);opacity:${f1(.18*o)}"/>`;
      s+=c.k==='t'?tcell(x,y,11,o,c.l):bcell(x,y,11,o);
      /* VLA-4 bond while gripping the wall */
      const bound=t>=c.s+.12&&t<c.c+.02;
      if(bound){const [bx,by]=L.ves==='v'?[x+12,y]:[x,y+12];const [vx,vy]=L.ves==='v'?[L.wall[0]-6,y]:[x,L.wall[1]-6];
        s+=`<line x1="${f1(bx)}" y1="${f1(by)}" x2="${f1(vx)}" y2="${f1(vy)}" style="stroke:var(--gold);stroke-width:3;stroke-linecap:round"/>`}
      if(ph===1&&step===1&&c.id==='th17')s+=`<text x="${f1(x)}" y="${f1(y-18)}" class="t-xs t-mid" style="fill:var(--rx);font-weight:600">S1P1</text>`;
    });
    if(t>.3&&t<.5)s+=`<text x="${lv.vla[0]}" y="${lv.vla[1]}" class="t-xs${lv.vla[2]==='end'?' t-end':''}" style="fill:var(--gold);font-weight:600;opacity:${f1(bump(t,.3,.5)*1.4>1?1:bump(t,.3,.5)*1.4)}">VLA-4 grips VCAM-1, cells squeeze through</text>`;
    if(t>.35&&t<.5){const o=bump(t,.35,.5);s+=`<g style="opacity:${f1(Math.min(1,o*1.5))}"><text x="${lv.aside[0]}" y="${lv.aside[1]}" class="t-xs" style="fill:var(--ink)">Aside: CCR6+ Th17 cells can also enter</text><text x="${lv.aside[0]}" y="${lv.aside[1]+13}" class="t-xs" style="fill:var(--ink)">through the choroid plexus (CCL20)</text></g>`}
    if(smoul>0){s+=`<text x="${lv.cd8[0]}" y="${lv.cd8[1]}" class="t-xs t-end" style="fill:var(--tcell);font-weight:600;opacity:${f1(smoul)}">CD8 tissue-resident: CD103+, S1P1−</text>`;
      if(lv.cd8to)s+=`<line x1="${lv.cd8[0]-40}" y1="${lv.cd8[1]+4}" x2="${lv.cd8to[0]}" y2="${lv.cd8to[1]}" style="stroke:var(--tcell);stroke-width:1;stroke-dasharray:2 3;opacity:${f1(smoul)}"/>`}
    /* drug overlay */
    if(showRx){const rx=IM_RX[step],B=L.band;
      (L.rx[step]||[]).forEach(([x,y],i)=>{s+=imBadge(x,y,Math.min(i,rx.length-1)+1)});
      s+=`<rect x="6" y="${B.y}" width="${L.W-12}" height="${B.h}" rx="10" style="fill:var(--rx-soft);stroke:var(--rx);stroke-width:1"/>`;
      s+=`<text x="16" y="${B.y+15}" class="t-xs" style="fill:var(--rx);font-weight:600">WHERE DRUGS ACT AT THIS STEP</text>`;
      rx.forEach((d,i)=>{s+=`<text x="16" y="${B.y+(B.wide?28:30)+i*(B.wide?12:13)}" class="t-xs" style="fill:var(--ink)"><tspan style="fill:var(--rx);font-weight:700">${i+1}</tspan> ${d.n}${B.wide?': '+d.w:''}</text>`});
      if(!B.wide&&rx.length<3)s+=`<text x="16" y="${B.y+30+rx.length*13}" class="t-xs">Details in the note below.</text>`;
    }
    svg.innerHTML=s;
    setSt(step);
    const P0=IM_STEPS[step];
    let extra='';
    if(showRx)extra=`<div class="imrx"><b class="h">Where drugs act at this step</b><ul>${IM_RX[step].map((d,i)=>`<li><b>${i+1} · ${d.n}</b>: ${d.w}. ${d.c}</li>`).join('')}</ul><a href="#dmt" data-go="dmt">How each drug works and what the trials found →</a></div>`;
    $('#imNote').innerHTML=noteHTML(P0)+extra;
  }
  const stop=playWire(rg,$('#imPlay'),draw,22000,'Replay','immune');
  const setSt=stepWire($('#imSteps'),IM_STEPS,rg,draw,stop);
  rxBtn.addEventListener('click',()=>{showRx=!showRx;rxBtn.setAttribute('aria-pressed',showRx);draw(+rg.value)});
  draw(+rg.value);

  /* ---- B-cell depletion time course ---- */
  const bsvg=$('#imBSvg'),brg=$('#imBT');
  const WK=48;
  const ROWS=[
    {n:'CD20+ B cells in blood',c:'var(--bcell)',f:w=>w<=0?1:Math.max(.03,1-ease(clamp(w/2))*.97)},
    {n:'New Gd-enhancing lesions',c:'var(--attack)',f:w=>w<2?.9:lerp(.9,.15,ease(clamp((w-2)/9)))},
    {n:'Total IgG (antibody level)',c:'var(--gold)',f:()=>.8},
    {n:'Plasma cells (CD20−)',c:'var(--plasma)',f:()=>.7}];
  function bdraw(t){
    const N=vb(bsvg,'720 300','400 440');const wk=t*WK;
    const L=N?{x0:16,x1:384,top:44,rh:84,lab:'above',ax:388}:{x0:220,x1:700,top:22,rh:58,lab:'left',ax:270};
    let s='';const X=w=>lerp(L.x0,L.x1,w/WK);
    ROWS.forEach((r,i)=>{const y0=L.top+i*L.rh+(N?22:0),h=N?46:40;
      s+=`<rect x="${L.x0}" y="${y0}" width="${L.x1-L.x0}" height="${h}" rx="6" style="fill:var(--panel-2);opacity:.6"/>`;
      if(N)s+=`<text x="${L.x0}" y="${y0-7}" class="t-lbl">${r.n}</text>`;
      else s+=`<text x="${L.x0-10}" y="${y0+h/2+4}" class="t-lbl t-end">${r.n}</text>`;
      const d=pathFn(u=>r.f(u*wk),L.x0,X(Math.max(wk,.01)),y0+h,y0+4,90);
      s+=`<path d="${d}" style="fill:none;stroke:${r.c};stroke-width:3;stroke-linecap:round"/>`;
      const v=r.f(wk);s+=`<circle cx="${f1(X(wk))}" cy="${f1(lerp(y0+h,y0+4,v))}" r="4.5" style="fill:${r.c}"/>`;
      if(i===1&&wk>=1)s+=`<text x="${L.x1-4}" y="${y0+12}" class="t-xs t-end">schematic</text>`;
    });
    const yb=L.top+ROWS.length*L.rh+(N?10:6);
    s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${yb}" y2="${yb}" class="axis"/>`;
    [0,2,8,12,24,36,48].forEach(w=>{if(N&&(w===8))return;s+=`<line x1="${f1(X(w))}" x2="${f1(X(w))}" y1="${yb}" y2="${yb+4}" class="axis"/><text x="${f1(X(w))}" y="${yb+16}" class="t-xs t-mid">${w}</text>`});
    s+=`<text x="${L.x1}" y="${yb+30}" class="t-xs t-end">weeks after the first infusion</text>`;
    /* anchor bands */
    s+=`<rect x="${f1(X(8))}" y="${L.top-4}" width="${f1(X(12)-X(8))}" height="${f1(yb-L.top+4)}" style="fill:var(--good);opacity:.12"/>`;
    s+=`<line x1="${f1(X(2))}" x2="${f1(X(2))}" y1="${N?10:L.top-4}" y2="${yb}" style="stroke:var(--bcell);stroke-dasharray:3 3"/>`;
    s+=`<text x="${f1(X(2)+4)}" y="${N?20:L.top+6}" class="t-xs" style="fill:var(--bcell)">day 14</text><text x="${f1(X(12)+4)}" y="${N?20:L.top+6}" class="t-xs" style="fill:var(--good)">weeks 8–12</text>`;
    s+=`<line x1="${f1(X(wk))}" x2="${f1(X(wk))}" y1="${N?10:L.top-4}" y2="${yb}" style="stroke:var(--ink);stroke-width:1.2;opacity:.5"/>`;
    bsvg.innerHTML=s;
    const w=Math.round(wk);
    let k,ti,tx;
    if(wk<2){k='Weeks 0–2';ti='B cells are being removed';tx=`Anti-CD20 antibodies bind CD20 on pre-B and mature B cells and kill them by antibody-dependent cellular cytolysis and complement. Ocrelizumab lowers blood B cells by day 14. [[OcrevusLabel2026]]`}
    else if(wk<8){k='Weeks 2–8';ti='B cells gone, antibodies unchanged';tx=`Blood B cells stay low. Many plasmablasts and long-lived plasma cells lack CD20, so existing antibody production goes on: IgG generally does not change with initial courses, although IgM can fall a little. [[Greenfield2018]]`}
    else if(wk<=12.5){k='Weeks 8–12';ti='The response is already visible';tx=`The response to B-cell depletion comes as early as 8–12 weeks, before circulating immunoglobulin falls. [[Reich2018]] In a phase 2 trial a single course of rituximab cut new gadolinium-enhancing lesions (P<0.001), and 20.3% versus 40.0% on placebo had relapses by week 48. [[Hauser2008]]`}
    else{k='Weeks 12–48';ti='Less inflammation, same antibodies';tx=`IgG levels generally do not change with initial courses, [[Greenfield2018]] and the abnormal spinal-fluid antibody pattern (oligoclonal bands) does not appear to change, consistent with a benefit that does not depend on antibody. [[Comi2021]] After the last ocrelizumab infusion, B cells took a median of 72 weeks to return. [[OcrevusLabel2026,Hauser2017]]`}
    $('#imBNote').innerHTML=noteHTML({k:`${k} · now week ${w}`,t:ti,txt:tx,
      pt:'Removing B cells calms the attack within weeks, while the body\'s stock of antibodies stays the same. So B cells must be doing something other than making antibodies.',
      hook:'Fast effect, unchanged IgG, persistent oligoclonal bands: the case that B cells act as antigen presenters and cytokine sources.'});
    brg.setAttribute('aria-valuetext',`Week ${w} of 48`);
  }
  playWire(brg,$('#imBPlay'),bdraw,9000,'Replay','immune');
  bdraw(+brg.value);

  $('#imCards').innerHTML=`
   <div class="card"><span class="ev early">Controversy</span><h4>Outside-in or inside-out?</h4><p>The classical model has peripheral autoreactive lymphocytes crossing the barrier first. [[Hemmer2015,Yednock1992]] But in people who died during or soon after a relapse, 7 of 12 showed widespread oligodendrocyte death and microglial activation with few or no lymphocytes, suggesting a process that starts inside the CNS. [[Barnett2004]] The question is open; both views fit a CNS-compartmentalised response later on. [[MachadoSantos2018]]</p></div>
   <div class="card"><span class="ev early">Controversy</span><h4>Why does anti-CD20 work?</h4><p>One view: through antigen presentation and cytokines, since the effect comes before immunoglobulin falls and oligoclonal bands persist. [[Reich2018,Comi2021,Li2015]] The other: antibody and complement do take part in demyelination in at least some lesions. [[Breij2008,Lucchinetti2000]] Both may operate, weighted differently by lesion and person.</p></div>
   <div class="card"><span class="ev early">Controversy</span><h4>One disease pattern, or four?</h4><p>Lucchinetti 2000 described four lesion patterns (I: like T-cell-mediated EAE; II: like T-cell plus antibody and complement EAE; III and IV: suggesting a primary oligodendrocyte problem), different between people but uniform within one person. [[Lucchinetti2000]] 21 of 22 people sampled at two or more time points kept the same pattern. [[Metz2014]] Active lesions in established MS at autopsy looked uniform instead. [[Breij2008]] Unresolved; biopsy and autopsy cohorts differ.</p></div>
   <div class="card"><span class="ev est">Established</span><h4>EAE: useful but partial</h4><p>Experimental autoimmune encephalomyelitis reproduces inflammation, demyelination, axon loss and repair, and many MS drugs were developed or validated in it. [[Constantinescu2011]] It is driven mainly by T cells, while MS also involves B cells, antibodies and innate immunity, and no model reproduces all of MS. [[Reich2018]] Critics call it a model of acute CNS inflammation rather than of MS. [[Sriram2005]]</p></div>
   <div class="card"><span class="ev est">Established</span><h4>The genes point to immune cells</h4><p>The 2019 genomic map (47,429 people with MS) found susceptibility genes enriched in every major peripheral immune cell type and, in the brain, in microglia but not in astrocytes or neurons. The authors read this as MS being triggered first in the peripheral immune system. [[IMSGC2019]] More in <a href="#risk" data-go="risk">Genes &amp; risk factors</a>.</p></div>`;
};
