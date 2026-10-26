/* =============== 1.2 The colon & its lining =============== */
/* the tour: u along the bowel (0 caecum .. 1 anal verge) is t/.7; the wall zoom fills t .7..1 */
const CL_SEGS=[
 {id:'caecum',n:'Caecum',o:'Midgut',a:'SMA',side:'Right',f:'Where the small bowel joins the colon'},
 {id:'ascending',n:'Ascending colon',o:'Midgut',a:'SMA',side:'Right',f:'MSI and CIMP tumours lean right'},
 {id:'transverse',n:'Transverse colon',o:'Midgut, then hindgut',a:'SMA, then IMA (distal third)',side:'Right, then left',f:'Griffith point: a watershed at the splenic flexure'},
 {id:'descending',n:'Descending colon',o:'Hindgut',a:'IMA',side:'Left',f:'CIN and FAP tumours lean left'},
 {id:'sigmoid',n:'Sigmoid colon',o:'Hindgut',a:'IMA',side:'Left',f:'Shares the hindgut supply, nerves and lymph'},
 {id:'rectum',n:'Rectum',o:'Hindgut',a:'IMA (superior rectal artery)',side:'Left',f:'Share of US colorectal cancers in the rectum'}
];
const CL_STEPS=[
 {from:0,at:.04,k:'Right colon · midgut',t:'Caecum & ascending colon',
  txt:`The large intestine runs from the caecum, where the small bowel joins it, through the colon and rectum to the anal canal. It is shorter than the small intestine but wider, and is marked by three longitudinal muscle bands (teniae coli), pouches (haustra) and fat-filled tags. Its main job is to absorb water, vitamins and electrolytes. The caecum, ascending colon and first part of the transverse colon come from the embryonic midgut and are supplied by the superior mesenteric artery (SMA), which arises at L1. [[Omole2025,Azzouz2023,Omole2026b]]`,
  pt:`The large bowel is a wide tube about 1.5 metres long. Its main job is to take water back out of what we cannot digest.`,
  hook:`Right colon (caecum, ascending, proximal transverse) = midgut = SMA. Right-sided tumours are more often MSI and CIMP. [[Iacopetta2002]]`},
 {from:.19,at:.29,k:'Across the top',t:'Transverse colon',
  txt:`The transverse colon crosses from right to left. Its first two-thirds belong to the midgut (SMA); its distal third belongs to the hindgut, supplied by the inferior mesenteric artery (IMA, arising at L3). The marginal artery of Drummond links the two territories, but fewer than 50% of people have a fully continuous channel around the splenic flexure (Griffith point), a watershed for ischaemia. [[Omole2026a,Omole2026b]]`,
  pt:`Two main arteries feed the colon, one for the right side and one for the left. They meet near the upper left corner.`,
  hook:`Griffith point = splenic flexure watershed between SMA and IMA territory; the marginal artery is incomplete there in more than half of people.`},
 {from:.385,at:.48,k:'Left colon · hindgut',t:'Descending & sigmoid colon',
  txt:`The descending and sigmoid colon are hindgut structures. The IMA supplies them through its left colic and sigmoid branches, and the sigmoid shares the hindgut's nerves and lymphatic drainage. Lymph drains along the supplying vessels, which is why standard cancer surgery removes the mesocolon as an intact envelope with its lymph nodes and ties the vessels at their roots (complete mesocolic excision). In one centre this went with a fall in 5-year local recurrence from 6.5% to 3.6% (historical comparison). [[Omole2026a,Harkins2023,Hohenberger2009]]`,
  pt:`Lymph from each part of the bowel drains along its blood vessels. Surgeons remove the bowel with that whole envelope of fat and lymph nodes.`,
  hook:`Left colon = hindgut = IMA. Left-sided tumours are more often CIN; FAP tumours occur mainly on the left. [[Iacopetta2002]]`},
 {from:.623,at:.66,k:'The last segment',t:'Rectum',
  txt:`The rectum is the most distal part of the large intestine, between the sigmoid colon and the anal canal, and the most posterior organ in the pelvis. The IMA ends here as the superior rectal artery. In the US, the rectum's share of colorectal cancers rose from 27% in 1995 to 31% in 2019. Rectal cancers spread to the lungs more often than colon cancers (odds ratio 2.80 for synchronous lung metastases). [[Wang2023,Omole2026a,Siegel2023CRC,Mitry2010]]`,
  pt:`The rectum is the last part of the bowel before the back passage. A growing share of bowel cancers start here.`,
  hook:`US data show a shift to the left: rectal cancer rose from 27% to 31% of CRC between 1995 and 2019. [[Siegel2023CRC]]`},
 {from:.72,at:.94,k:'Zoom in',t:'The wall in layers',
  txt:`Cut through the wall and it has layers: the mucosa on the inside (the lining, folded into crypts), the submucosa, the muscularis propria, the subserosa and serosa, and fat beyond the wall. How far a cancer has grown through these layers is the "T" of its stage: see <a href="#staging" data-go="staging">Staging: TNM calculator</a>. Almost every colorectal cancer starts in the mucosa, in a crypt, which is where the next animation goes. [[Humphries2008,Fearon1990]]`,
  pt:`The bowel wall is built in layers like a sandwich. Cancer starts in the thin inner lining and can grow outwards through the others.`,
  hook:`The intestinal epithelium is the most rapidly self-renewing tissue in adult mammals. [[Barker2007]]`}
];
const CL_CR_N=[
 {from:0,at:.03,k:'Day 0',t:'Stem cells at the base',
  txt:`At the bottom of each crypt sit a few stem cells, marked by Lgr5, a Wnt target gene. In mouse lineage tracing a single Lgr5+ cell made every type of lining cell over 60 days. Human colonic crypts hold 5 to 10 active stem cells (mean 7); mitochondrial lineage tracing gives a "functional" number of 5 to 6. They replace one another about 1.3 times per crypt per year, by neutral drift. [[Barker2007,Nicholson2018,Baker2014]]`,
  pt:`Each pit in the lining has a handful of stem cells at the bottom. They keep making new lining cells all your life.`,
  hook:`Lgr5 marks crypt-base stem cells (Clevers lab, 2007). Human colonic crypts: about 7 active stem cells each. [[Barker2007,Nicholson2018]]`},
 {from:.15,at:.4,k:'Days 1–3',t:'Daughters climb as Wnt fades',
  txt:`The Wnt signal is strongest at the crypt base and fades towards the top (shaded band). Wnts drive most adult tissue stem cells. Daughter cells pushed upward leave the Wnt-rich niche, stop dividing and mature, many into mucus-making goblet cells: about 72 to 75 per crypt section in adults up to 60, and 51 to 54 in adults aged 67 or older. [[Nusse2017,Clevers2012,Baidoo2024]]`,
  pt:`New cells are pushed up the wall like a slow escalator. As they leave the bottom, they stop dividing and take on their adult jobs.`,
  hook:`Wnt high at the base keeps cells dividing; low Wnt near the top lets them differentiate.`},
 {from:.6,at:.7,k:'The brake',t:'A destruction complex',
  txt:`Inside each cell, without a Wnt signal, a "destruction complex" breaks β-catenin down. Axin scaffolds the kinases GSK-3 and CK1, which phosphorylate a motif near β-catenin's N-terminus; with APC and PP2A in the complex, β-TrCP recognises the phosphorylated motif and ubiquitinates it, and the proteasome degrades it. The inset shows this cycle. [[Stamos2013]]`,
  pt:`Each cell has a shredder that keeps a growth signal, β-catenin, switched off. APC is one of the shredder's key parts.`,
  hook:`Destruction complex = APC + Axin + GSK-3 + CK1 (+ PP2A); β-TrCP ubiquitinates phosphorylated β-catenin. [[Stamos2013]]`},
 {from:.85,at:.95,k:'Days 4–5',t:'Shed after 4–5 days',
  txt:`The traced cell reaches the mouth of the crypt and is shed into the bowel. The single layer of lining cells is renewed every 4 to 5 days, which makes the intestinal epithelium the most rapidly self-renewing tissue in adult mammals. Because stem cells keep dividing all life, a tumour in a 90-year-old has nearly twice as many passenger mutations as an identical tumour in a 45-year-old. [[VanDerFlier2009,Barker2007,Vogelstein2013]]`,
  pt:`Your bowel lining replaces itself every few days. All that copying of DNA is why small mistakes add up with age.`,
  hook:`Epithelial turnover: 4–5 days. Crypt fission, by contrast, is rare in normal colon (about once every 30–40 years per crypt). [[VanDerFlier2009,Baker2014]]`}
];
const CL_CR_A=[
 {from:0,at:.04,k:'The first hit',t:'One stem cell loses APC',
  txt:`APC mutations occur early: they were found in 63% of adenomas and 60% of carcinomas, including adenomas as small as 0.5 cm, and the frequency stayed the same from benign to malignant stages. In Vogelstein's summary, an APC mutation in the colon gives a microscopic clone that grows into a slow-growing small adenoma. [[Powell1992,Vogelstein2013]]`,
  pt:`One stem cell picks up a fault in the APC gene, the gene that normally keeps the growth signal switched off.`,
  hook:`APC is the "gatekeeper": mutated early, and no more often in cancers than in adenomas. [[Powell1992]]`},
 {from:.15,at:.35,k:'Years (schematic)',t:'The clone takes over the crypt',
  txt:`A mutation becomes fixed in a crypt in two steps: one of about 7 stem cells is hit, then its progeny take over the whole crypt by drift and selection, which takes several years. The amber cells are the mutant clone. In adenomas, crypt fission speeds up by at least an order of magnitude, so the clone spreads to neighbouring crypts. [[Nicholson2018,Baker2014]]`,
  pt:`The faulty stem cell's offspring gradually take over the whole pit, and then start to spread to the pits next door.`,
  hook:`Fixation = hit one stem cell, then win the crypt (years). Adenomas divide crypts at least 10 times faster. [[Nicholson2018,Baker2014]]`},
 {from:.45,at:.55,k:'Inside the mutant cells',t:'β-catenin switches genes on',
  txt:`Without APC the destruction complex fails. β-catenin builds up, enters the nucleus and binds TCF-4 (TCF7L2): APC-deficient colon cancer cells carry a permanently active β-catenin–TCF-4 complex, and putting APC back removes β-catenin from TCF-4. Tumours with intact APC instead carry activating β-catenin (CTNNB1) mutations at its phosphorylation sites. In TCGA, 93% of colorectal cancers had a deregulated Wnt pathway, about 80% through APC or CTNNB1. [[Korinek1997,Morin1997,TCGA2012]]`,
  pt:`With the shredder broken, the growth signal piles up and reaches the cell's control centre, telling it to keep dividing.`,
  hook:`APC loss → β-catenin stabilised → β-catenin/TCF4 → Wnt target genes on, whatever the Wnt signal outside. [[Korinek1997,Morin1997]]`},
 {from:.7,at:.92,k:'Cells stop leaving',t:'Cells pile up: a microscopic clone',
  txt:`Mutant cells behave as if they were still in the Wnt-rich base: they keep dividing, and instead of being shed they crowd the crypt mouth. Pathologists call such an early lesion an aberrant crypt focus; Vogelstein describes it as a microscopic clone that can grow into a small adenoma. Further hits are needed for cancer: see <a href="#sequence" data-go="sequence">From polyp to cancer</a>. [[Vogelstein2013,Fearon1990]]`,
  pt:`The cells that should have been shed stay and pile up. This tiny lump is the very first step towards a polyp.`,
  hook:`Most colorectal cancers start with a Wnt hit (APC or CTNNB1), then gather KRAS, SMAD4/18q and TP53/17p changes. [[TCGA2012,Vogelstein1988]]`}
];
/* the kit's crypt path, reproduced so a traced cell can travel along it */
function clCryptAt(x,y,w,h,u){const cw=w*.34,L=h-w/2,arc=Math.PI*w/2*.5,tot=2*L+arc,d=u*tot;
  if(d<L)return[x-w/2+cw/2,y+d];if(d<L+arc){const a=Math.PI-(d-L)/arc*Math.PI;return[x+Math.cos(a)*(w/2-cw/2),y+L+Math.sin(a)*(w/2-cw/2)]}return[x+w/2-cw/2,y+L-(d-L-arc)]}
function clWrap(t,n){const w=t.split(' '),L=[];let l='';w.forEach(x=>{if((l+' '+x).trim().length>n){L.push(l);l=x}else l=(l+' '+x).trim()});if(l)L.push(l);return L}
const clFmt=n=>Math.round(n).toLocaleString('en-GB');

inits.colon=()=>{
  /* ---------- 1. the bowel tour ---------- */
  const svg=$('#clSvg'),rg=$('#clT');let setSt=()=>{};
  function draw(t){
    const N=vb(svg,'720 380','400 640');
    const C=N?{x:52,y:40,s:.95}:{x:44,y:44,s:1.08};
    const zoom=ramp(t,.7,.8),u=clamp(t/.7);
    const col=colon(C.x,C.y,C.s,{hl:null});
    const SEG=col.seg;let si=0;CL_SEGS.forEach((S,i)=>{if(u>=SEG[S.id][0])si=i});
    const S=CL_SEGS[si];
    let s=`<defs>${marker('clArr','var(--muted)')}</defs>`;
    s+=`<g style="opacity:${f1(1-zoom*.55)}">`;
    /* arteries: the aorta with the SMA (right colon) and the IMA (left colon) */
    const W=300*C.s,H=240*C.s,ax=C.x+W*.45,mid=si<=2,ima=si>=2;
    const art=(d,on)=>`<path d="${d}" style="fill:none;stroke:var(--vessel);stroke-width:${on?3.2:1.6};opacity:${on?1:.35};stroke-linecap:round"/>`;
    s+=`<path d="M${f1(ax)} ${f1(C.y+H*.22)}V${f1(C.y+H*1.02)}" style="stroke:var(--vessel);stroke-width:5;opacity:.55;stroke-linecap:round"/>`;
    s+=art(`M${f1(ax)} ${f1(C.y+H*.34)}Q${f1(C.x+W*.2)} ${f1(C.y+H*.3)} ${f1(C.x+W*.04)} ${f1(C.y+H*.55)}M${f1(ax)} ${f1(C.y+H*.34)}Q${f1(C.x+W*.3)} ${f1(C.y+H*.12)} ${f1(C.x+W*.3)} ${f1(C.y+H*.04)}`,mid&&t<.7);
    s+=art(`M${f1(ax)} ${f1(C.y+H*.62)}Q${f1(C.x+W*.8)} ${f1(C.y+H*.5)} ${f1(C.x+W*.96)} ${f1(C.y+H*.42)}M${f1(ax)} ${f1(C.y+H*.62)}Q${f1(C.x+W*.68)} ${f1(C.y+H*.66)} ${f1(C.x+W*.74)} ${f1(C.y+H*.74)}M${f1(ax)} ${f1(C.y+H*.62)}Q${f1(C.x+W*.56)} ${f1(C.y+H*.74)} ${f1(C.x+W*.56)} ${f1(C.y+H*.9)}M${f1(ax)} ${f1(C.y+H*.34)}Q${f1(C.x+W*.62)} ${f1(C.y+H*.2)} ${f1(C.x+W*.74)} ${f1(C.y+H*.04)}`,ima&&t<.7);
    s+=`<text x="${f1(ax-6)}" y="${f1(C.y+H*.34-6)}" class="t-sm t-end" style="fill:var(--vessel)">SMA</text>`;
    s+=`<text x="${f1(ax+7)}" y="${f1(C.y+H*.62+14)}" class="t-sm" style="fill:var(--vessel)">IMA</text>`;
    s+=`<text x="${f1(ax+7)}" y="${f1(C.y+H*.24)}" class="t-xs">aorta</text>`;
    s+=col.svg;
    /* every segment already passed keeps a faint glow; the current one is bright */
    CL_SEGS.forEach((Q,i)=>{if(i>si||t>=.7&&Q.id!=='descending')return;const [a,b]=SEG[Q.id];let d='';const b2=i===si?Math.min(b,Math.max(a+.01,u)):b;
      for(let k=0;k<=24;k++){const p=col.at(lerp(a,b2,k/24));d+=(k?'L':'M')+f1(p[0])+' '+f1(p[1])}
      s+=`<path d="${d}" style="fill:none;stroke:var(--tumour);stroke-width:${f1(22*C.s*(i===si?.55:.3))};stroke-linecap:round;stroke-linejoin:round;opacity:${i===si?.75:.25}"/>`});
    /* segment labels */
    const lab=[['Caecum',.01,14,22,''],['Ascending',.16,16,0,''],['Transverse',.41,0,30,'t-mid'],['Descending',.64,-16,0,'t-end'],['Sigmoid',.8,-6,-20,'t-end'],['Rectum',.95,16,4,'']];
    lab.forEach(([n,uu,dx,dy,cl],i)=>{const p=col.at(uu);s+=`<text x="${f1(p[0]+dx)}" y="${f1(p[1]+dy)}" class="${i===si&&t<.7?'t-lbl':'t-sm'} ${cl}">${n}</text>`});
    if(si===2&&t<.7){const p=col.at(.55);s+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="${f1(20*C.s)}" style="fill:none;stroke:var(--gold);stroke-width:2;stroke-dasharray:4 3"/><text x="${f1(p[0]-8)}" y="${f1(p[1]-26)}" class="t-sm t-mid" style="fill:var(--gold)">Griffith point</text>`}
    /* the travelling marker */
    if(t<.7){const p=col.at(u);s+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="7" style="fill:var(--gold);stroke:var(--panel);stroke-width:2"/>`}
    s+='</g>';
    /* ---- right (or lower) panel: segment card, then the wall ---- */
    const P=N?{x:20,y:318,w:360}:{x:420,y:44,w:290};
    if(zoom<1){s+=`<g style="opacity:${f1(1-zoom)}">`;
      s+=`<rect x="${P.x}" y="${P.y}" width="${P.w}" height="${N?300:290}" rx="12" style="fill:var(--panel-2)"/>`;
      let yy=P.y+26;s+=`<text x="${P.x+16}" y="${yy}" class="t-xs">SEGMENT ${si+1} OF 6</text>`;yy+=26;
      s+=`<text x="${P.x+16}" y="${yy}" class="t-big">${S.n}</text>`;yy+=28;
      [['Embryo',S.o],['Artery',S.a],['Side',S.side]].forEach(([k,v])=>{s+=`<text x="${P.x+16}" y="${yy}" class="t-xs">${k.toUpperCase()}</text><text x="${P.x+82}" y="${yy}" class="t-lbl" style="font-size:12.5px">${v}</text>`;yy+=22});
      yy+=4;clWrap(S.f,N?44:38).forEach(l=>{s+=`<text x="${P.x+16}" y="${yy}" class="t-sm" style="fill:var(--ink)">${l}</text>`;yy+=16});yy+=2;
      if(S.id==='rectum'){const bw=P.w-120;[[1995,27],[2019,31]].forEach(([yr,v],i)=>{const by=yy+6+i*24;s+=`<text x="${P.x+16}" y="${by+11}" class="t-sm">${yr}</text><rect x="${P.x+56}" y="${by}" width="${f1(bw*v/50*ramp(t,.62,.68))}" height="14" rx="3" style="fill:var(--tumour);opacity:${i?1:.55}"/><text x="${f1(P.x+62+bw*v/50*ramp(t,.62,.68))}" y="${by+11}" class="t-sm" style="fill:var(--ink)">${v}%</text>`});yy+=54}
      /* the length bar: published mean and range */
      const ly=P.y+(N?270:256),lx=P.x+16,lw=P.w-32,sc=v=>lx+lw*(v-100)/(200-100);
      s+=`<text x="${lx}" y="${ly-14}" class="t-xs">MEASURED COLON LENGTH (CT, 295 ADULTS)</text>`;
      s+=`<line x1="${lx}" x2="${lx+lw}" y1="${ly}" y2="${ly}" class="axis"/><rect x="${f1(sc(109.7))}" y="${ly-5}" width="${f1(sc(195.9)-sc(109.7))}" height="10" rx="5" style="fill:var(--mucosa);opacity:.7"/>`;
      s+=`<line x1="${f1(sc(150.3))}" x2="${f1(sc(150.3))}" y1="${ly-9}" y2="${ly+9}" style="stroke:var(--ink);stroke-width:2.5"/><text x="${f1(sc(150.3))}" y="${ly+22}" class="t-sm t-mid" style="fill:var(--ink)">150.3 cm mean</text>`;
      s+=`<text x="${f1(sc(109.7))}" y="${ly+22}" class="t-xs t-mid">110</text><text x="${f1(sc(195.9))}" y="${ly+22}" class="t-xs t-mid">196</text>`;
      s+='</g>'}
    if(zoom>0){
      const p=col.at(.62),Wx=N?{x:30,y:338,w:170,h:220}:{x:430,y:70,w:140,h:250};
      s+=`<g style="opacity:${f1(zoom)}">`;
      s+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="16" style="fill:none;stroke:var(--ink);stroke-width:2"/>`;
      s+=`<path d="M${f1(p[0]+(N?-6:12))} ${f1(p[1]+(N?15:-10))}L${Wx.x} ${Wx.y}M${f1(p[0]+(N?6:12))} ${f1(p[1]+(N?15:10))}L${Wx.x} ${Wx.y+Wx.h}" style="stroke:var(--muted);stroke-width:1;stroke-dasharray:3 3"/>`;
      const wl=wall(Wx.x,Wx.y,Wx.w,{h:Wx.h});s+=wl.svg;
      const rev=lerp(Wx.y,wl.y.bottom+2,ramp(t,.76,.92));
      s+=`<rect x="${Wx.x-2}" y="${f1(rev)}" width="${N?372:290}" height="${f1(Math.max(0,wl.y.bottom+4-rev))}" style="fill:var(--panel)"/>`;
      s+=`<text x="${Wx.x}" y="${Wx.y-12}" class="t-sm" style="fill:var(--ink)">Lumen (inside of the bowel)</text>`;
      if(t>.9){s+=`<path d="M${Wx.x+Wx.w*.5} ${f1(wl.y.submucosa+16)}V${f1(wl.y.submucosa+3)}" style="stroke:var(--ink);stroke-width:1.4" marker-end="url(#clArr)"/>`;
        s+=`<text x="${Wx.x+Wx.w*.5}" y="${f1(wl.y.submucosa+28)}" class="t-xs t-mid" style="fill:var(--ink)">crypts in the mucosa</text>`}
      s+='</g>'}
    svg.innerHTML=s;
    const ph=phaseOf(CL_STEPS,t);setSt(ph);$('#clNote').innerHTML=noteHTML(CL_STEPS[ph]);
    $('#clRead').innerHTML=t<.7?`<span>Segment <b>${S.n}</b></span><span>Origin <b>${S.o}</b></span><span>Artery <b>${S.a}</b></span>`:`<span>View <b>the bowel wall in section</b></span><span>Layers shown <b>${Math.min(6,1+Math.floor(ramp(t,.76,.92)*6))} of 6</b></span>`;
  }
  const stop=playWire(rg,$('#clPlay'),draw,16000,'%t:player.replay%','colon');
  setSt=stepWire($('#clSteps'),CL_STEPS,rg,draw,stop);draw(+rg.value);

  /* ---------- 2. the crypt ---------- */
  const cs=$('#clCrypt'),cr=$('#clCrT');let apc=false,setCr=()=>{};
  const RATE=12.5/4.5;/* cell slots climbed per day: base to mouth in about 4.5 days */
  function inset(t,apcLost){
    let g=`<rect x="0" y="0" width="300" height="300" rx="12" style="fill:var(--panel-2)"/>`;
    g+=`<text x="14" y="22" class="t-xs">INSIDE EACH LINING CELL</text>`;
    /* the complex */
    const dim=apcLost?.35:1;
    const parts=[['Axin',95,98,17,'var(--accent-soft)'],['APC',62,72,15,'var(--brand-soft)'],['GSK-3',130,70,15,'var(--gold-soft)'],['CK1',128,126,12,'var(--gold-soft)']];
    parts.forEach(([n,x,y,r,c])=>{const isA=n==='APC';g+=`<circle cx="${x}" cy="${y}" r="${r}" style="fill:${c};stroke:var(--muted);stroke-width:1.2;opacity:${isA&&apcLost?.45:dim}"/><text x="${x}" y="${y+3.5}" class="t-xs t-mid" style="fill:var(--ink);opacity:${isA&&apcLost?.5:1}">${n}</text>`});
    if(apcLost)g+=`<path d="M50 60L74 84M74 60L50 84" style="stroke:var(--bad);stroke-width:3;stroke-linecap:round"/>`;
    g+=`<text x="95" y="160" class="t-xs t-mid">destruction complex</text>`;
    /* proteasome */
    g+=`<rect x="214" y="80" width="54" height="36" rx="10" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.4;opacity:${dim}"/>`;
    for(let k=1;k<4;k++)g+=`<line x1="${214+k*13.5}" x2="${214+k*13.5}" y1="82" y2="114" style="stroke:var(--line);stroke-width:1"/>`;
    g+=`<text x="241" y="134" class="t-xs t-mid">proteasome</text>`;
    /* nucleus */
    g+=`<ellipse cx="150" cy="218" rx="134" ry="50" style="fill:var(--field);stroke:var(--nuc);stroke-width:1.6"/><text x="40" y="214" class="t-xs" style="fill:var(--nuc)">NUCLEUS</text>`;
    g+=`<path d="${pathFn(v=>.5+.35*Math.sin(v*Math.PI*10),30,270,230,242,80)}" style="fill:none;stroke:var(--nuc);stroke-width:1.6;opacity:.7"/>`;
    g+=`<rect x="128" y="220" width="44" height="18" rx="5" style="fill:var(--panel);stroke:var(--nuc);stroke-width:1.2"/><text x="150" y="233" class="t-xs t-mid" style="fill:var(--ink)">TCF4</text>`;
    const bc=(x,y,o=1,p=0)=>`<circle cx="${f1(x)}" cy="${f1(y)}" r="9" style="fill:var(--accent);opacity:${f1(o)}"/>`+(p?`<circle cx="${f1(x+8)}" cy="${f1(y-7)}" r="4.5" style="fill:var(--gold)"/><text x="${f1(x+8)}" y="${f1(y-4.6)}" class="t-xs t-mid" style="fill:var(--panel);font-size:7px">P</text>`:'');
    if(!apcLost){
      const c=(t*5)%1;
      if(c<.3){const k=ease(c/.3);g+=bc(lerp(12,92,k),lerp(90,98,k))}
      else if(c<.5){g+=bc(95,98,1,1)}
      else if(c<.72){const k=ease((c-.5)/.22),x=lerp(95,206,k),y=lerp(98,98,k);g+=bc(x,y,1,1);for(let j=0;j<3;j++)g+=`<circle cx="${f1(x-12-j*7)}" cy="${f1(y+8)}" r="3.4" style="fill:var(--brand)"/>`}
      else{const k=(c-.72)/.28;for(let j=0;j<4;j++){const a=-.9+j*.6;g+=`<rect x="${f1(272+k*26*Math.cos(a))}" y="${f1(96+k*26*Math.sin(a))}" width="5" height="5" style="fill:var(--accent);opacity:${f1(1-k)}"/>`}}
      g+=`<text x="150" y="290" class="t-sm t-mid">Wnt target genes: off</text>`;
      g+=`<text x="14" y="40" class="t-xs">β-catenin is tagged, then destroyed</text>`;
    }else{
      const rr=rng(31),k=1+Math.floor(ramp(t,0,.7)*7);
      for(let j=0;j<k;j++)g+=bc(150+rr()*48,62+rr()*90,.9);
      const nin=Math.floor(ramp(t,.25,.9)*4);
      for(let j=0;j<nin;j++)g+=bc(110+j*20,202,1);
      const c=(t*5)%1;if(c<.6)g+=bc(lerp(12,170,c/.6),lerp(92,205,ease(c/.6)),.8);
      g+=`<path d="M176 229h46" style="stroke:var(--tumour);stroke-width:2.4" marker-end="url(#clArr2)"/>`;
      g+=`<text x="150" y="290" class="t-sm t-mid" style="fill:var(--tumour)">${nin?'Growth genes ON (β-catenin + TCF4)':'β-catenin is building up'}</text>`;
      g+=`<text x="14" y="40" class="t-xs" style="fill:var(--bad)">APC lost: the complex cannot work</text>`;
    }
    return g}
  function crDraw(t){
    const N=vb(cs,'720 400','400 766');
    const steps=apc?CL_CR_A:CL_CR_N;
    const K=N?{x:190,y:96,w:112,h:256,wb:96,lx:258}:{x:200,y:100,w:124,h:276,wb:100,lx:272};
    const day=t*5;
    const Nn=11,st=3,NC=2*Nn+st,mid=(NC-1)/2;
    let mut=[],crowd=0,sh=0;
    if(apc){const m=Math.round(lerp(1,NC,ramp(t,.04,.55)));for(let i=0;i<NC;i++)if(Math.abs(i-mid)<=(m-1)/2)mut.push(i);crowd=ramp(t,.62,1)}
    else sh=(day*RATE)%1;
    let s=`<defs>${marker('clArr2','var(--tumour)')}<linearGradient id="clWnt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--accent);stop-opacity:.04"/><stop offset="1" style="stop-color:var(--accent);stop-opacity:.85"/></linearGradient></defs>`;
    /* lumen and surface */
    s+=`<rect x="${K.x-140}" y="${K.y-58}" width="${N?320:330}" height="58" rx="10" style="fill:var(--field)"/>`;
    s+=`<text x="${K.x-130}" y="${K.y-42}" class="t-xs">LUMEN</text>`;
    s+=`<rect x="${K.x-140}" y="${K.y}" width="${N?320:330}" height="${K.h+4}" rx="4" style="fill:var(--submucosa);opacity:.4"/>`;
    /* Wnt band */
    s+=`<rect x="${K.wb}" y="${K.y}" width="16" height="${K.h}" rx="6" style="fill:url(#clWnt)"/>`;
    if(apc&&mut.length>4)s+=`<rect x="${K.wb}" y="${K.y}" width="16" height="${K.h}" rx="6" style="fill:var(--polyp);opacity:${f1(.6*ramp(t,.3,.6))}"/>`;
    s+=`<text transform="translate(${K.wb-6} ${K.y+K.h/2}) rotate(-90)" class="t-sm t-mid">Wnt signal</text>`;
    s+=`<text x="${K.wb+8}" y="${K.y-6}" class="t-xs t-mid">low</text><text x="${K.wb+8}" y="${K.y+K.h+14}" class="t-xs t-mid">high</text>`;
    const cy=crypt(K.x,K.y,K.w,K.h,{n:Nn,stem:st,shift:sh,mut,crowd});s+=cy.svg;
    /* β-catenin in mutant nuclei */
    if(apc&&t>.4)cy.cells.forEach(c=>{if(mut.includes(c.i))s+=`<circle cx="${f1(c.x)}" cy="${f1(c.y)}" r="3" style="fill:var(--accent);opacity:${f1(ramp(t,.4,.6))}"/>`});
    const r=Math.min(K.w*.34*.48,K.h/(Nn*2.1));
    if(!apc){
      /* cells shed at the mouth float into the lumen */
      for(let k=0;k<3;k++){const ph=((day*RATE)+k)/3%1;[-1,1].forEach(sd=>{const x=K.x+sd*(K.w/2-K.w*.17)+sd*ph*18,y=K.y-r-ph*50;
        s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r*.9)}" style="fill:var(--mucosa);stroke:var(--mucosa-line);opacity:${f1(.9*(1-ph))}"/>`})}
      /* the traced cell */
      const slots=day*RATE,uu=.5-slots/NC;let p;
      if(uu>=0)p=clCryptAt(K.x,K.y,K.w,K.h,uu);else{const q=clCryptAt(K.x,K.y,K.w,K.h,0);p=[q[0]-(slots-mid-.5)*6,K.y-r-(slots-mid-.5)*14]}
      const op=uu>=0?1:clamp(1-(slots-mid-.5)/2.5);
      s+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="${f1(r+3)}" style="fill:none;stroke:var(--ink);stroke-width:2.4;opacity:${f1(op)}"/>`;
      if(op>.05)s+=uu>=0?`<text x="${K.x}" y="${f1(Math.min(p[1]+4,K.y+K.h-K.w*.5))}" class="t-xs t-mid" style="fill:var(--ink)">traced</text>`:`<text x="${f1(p[0]+r+6)}" y="${f1(p[1]+4)}" class="t-xs" style="fill:var(--ink);opacity:${f1(op)}">shed</text>`;
    }
    /* labels */
    s+=`<text x="${K.lx}" y="${K.y+K.h-4}" class="t-sm" style="fill:var(--stem)">Stem cells (Lgr5+)</text>`;
    if(!apc){s+=`<text x="${K.lx}" y="${K.y+K.h*.45}" class="t-sm">Maturing cells</text><text x="${K.lx}" y="${K.y+K.h*.45+14}" class="t-xs">climb towards the top</text>`;
      s+=`<text x="${K.lx}" y="${K.y-30}" class="t-sm">Old cells shed</text>`}
    else{s+=`<text x="${K.lx}" y="${K.y+K.h*.45}" class="t-sm" style="fill:var(--polyp-line)">APC-mutant clone</text><text x="${K.lx}" y="${K.y+K.h*.45+14}" class="t-xs">${mut.length}/${NC} cells mutant</text>`;
      if(crowd>.2)s+=`<text x="${K.lx}" y="${K.y+K.h*.2}" class="t-sm" style="fill:var(--polyp-line)">Cells pile up,</text><text x="${K.lx}" y="${K.y+K.h*.2+14}" class="t-sm" style="fill:var(--polyp-line)">none are shed</text>`}
    const title=apc?(t<.15?'One stem cell loses APC':t<.45?'The clone takes over':t<.7?'β-catenin reaches the nucleus':'An aberrant crypt focus'):`Day ${day.toFixed(1)} of a 4–5 day cycle`;
    s+=`<text x="${N?20:20}" y="${N?24:26}" class="t-big" style="fill:${apc?'var(--polyp-line)':'var(--ink)'}">${title}</text>`;
    s+=`<g transform="translate(${N?12:405} ${N?384:56}) scale(${N?1.25:1})">${inset(t,apc)}</g>`;
    cs.innerHTML=s;
    const ph=phaseOf(steps,t);setCr(ph);$('#clCrNote').innerHTML=noteHTML(steps[ph]);
    $('#clCrRead').innerHTML=apc?`<span>Mode <b>APC lost</b></span><span>Mutant cells <b>${mut.length}/${NC}</b></span><span>Shedding <b>stopped</b></span>`:
      `<span>Day <b>${day.toFixed(1)}</b></span><span>Traced cell <b>${day<4.5?'climbing':'shed'}</b></span><span><i style="display:inline-block;width:10px;height:10px;border-radius:50%;background:var(--stem);vertical-align:middle"></i> stem <i style="display:inline-block;width:10px;height:10px;border-radius:50%;background:var(--mucosa);vertical-align:middle;margin-left:6px"></i> lining <i style="display:inline-block;width:10px;height:10px;border-radius:50%;background:var(--accent);vertical-align:middle;margin-left:6px"></i> β-catenin</span>`;
  }
  const crStop=playWire(cr,$('#clCrPlay'),crDraw,14000,'%t:player.replay%','colon');
  function crWire(){const old=$('#clCrSteps'),nu=old.cloneNode(false);old.replaceWith(nu);setCr=stepWire(nu,apc?CL_CR_A:CL_CR_N,cr,crDraw,crStop)}
  $('#clApc').addEventListener('click',()=>{crStop();apc=!apc;$('#clApc').setAttribute('aria-pressed',apc);
    $('#clCrLbl').textContent=apc?'Years (schematic)':'Days';
    $('#clCrCap').innerHTML=apc?'Schematic, not to scale. The time axis is not measured: fixing a mutation in a crypt takes several years. [[Nicholson2018]]':'Schematic, not to scale. A real crypt holds far more cells; about 7 of them are active stem cells. [[Nicholson2018,Baker2014]]';
    cr.value=apc?.04:.05;crWire();crDraw(+cr.value)});
  crWire();crDraw(+cr.value);

  /* ---------- 3. a lifetime of renewal ---------- */
  const ag=$('#clAge');
  function calc(){const a=+ag.value;$('#clAgeOut').textContent=a;
    const gob=a<=60?'72 / 75':a>=67?'51 / 54':'between the groups';
    const cards=[
      [`${clFmt(a*365/5)}–${clFmt(a*365/4)}`,`times the lining has been rebuilt, at one renewal every 4–5 days`],
      [`${f1(a*.65)}–${f1(a*2.7)}`,`stem-cell replacements inside one crypt (mean ${f1(a*1.3)}), at 0.65–2.7 a year`],
      [`${f1(a/40)}–${f1(a/30)}`,`crypt fissions per crypt at one per 30–40 years (Baker 2014)`],
      [`${f1(a*.007)} or ${f1(a*.011)}`,`fissions per crypt at 0.7% a year (Nicholson 2018) or 0.011 a year (Baker 2019): estimates differ several-fold`],
      [gob,`goblet cells per crypt section, ascending / descending colon (published groups: up to 60, and 67 or older)`],
      [a>=67?'nearly 2×':a>=45?'more':'fewer',`passenger mutations than in a tumour at 45: a tumour at 90 carries nearly twice as many`]];
    $('#clNums').innerHTML=cards.map(([b,s])=>`<div class="clnum"><b>${b}</b><span>${s}</span></div>`).join('')}
  ag.addEventListener('input',calc);calc();
  $('#clAgeCap').innerHTML='Rates: renewal every 4–5 days; stem-cell replacement 1.3 per crypt per year (0.65–2.7); crypt fission once every 30–40 years, 0.7% of crypts a year, or 0.011 a year (Early evidence); goblet-cell counts by age group; passenger mutations by age. [[VanDerFlier2009,Nicholson2018,Baker2014,Baker2019,Baidoo2024,Vogelstein2013]]';
};
