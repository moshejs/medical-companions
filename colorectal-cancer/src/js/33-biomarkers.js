/* =============== 3.3 Tumour biomarkers =============== */
const BM_DEF={mmr:'p',ras:'wt',g12c:'no',braf:'wt',her2:'neg',side:'left'};
/* tree geometry: boxes {x,y,w,h,t:[lines]} for the wide and narrow layouts */
const BM_GW={root:{x:8,y:176,w:100,h:46,t:['mCRC:','tumour tested']},mmr:{x:136,y:176,w:96,h:46,t:['MMR / MSI']},ras:{x:262,y:226,w:96,h:46,t:['RAS','KRAS + NRAS']},
 braf:{x:386,y:140,w:90,h:46,t:['BRAF','V600E?']},side:{x:494,y:186,w:62,h:46,t:['Side']},g12c:{x:386,y:290,w:90,h:46,t:['KRAS','G12C?']},her2:{x:262,y:340,w:96,h:46,t:['HER2','IHC + ISH']},
 L1:{x:596,y:20,w:118,h:40,t:['Immunotherapy','PD-1 ± CTLA-4']},L2:{x:596,y:74,w:118,h:40,t:['BRAF inhibitor','+ anti-EGFR']},L3:{x:596,y:128,w:118,h:40,t:['Chemo +','anti-EGFR']},
 L4:{x:596,y:182,w:118,h:40,t:['Chemo +','anti-VEGF']},L5:{x:596,y:236,w:118,h:40,t:['Chemo ± anti-VEGF','no anti-EGFR']},L6:{x:596,y:290,w:118,h:40,t:['G12C inhibitor','+ anti-EGFR']},L7:{x:596,y:344,w:118,h:40,t:['HER2-targeted','later line']}};
const BM_GN={root:{x:30,y:8,w:112,h:40,t:['mCRC:','tumour tested']},mmr:{x:30,y:76,w:112,h:40,t:['MMR / MSI']},ras:{x:30,y:150,w:112,h:40,t:['RAS','KRAS + NRAS']},
 braf:{x:30,y:224,w:112,h:40,t:['BRAF V600E?']},side:{x:30,y:298,w:112,h:40,t:['Side']},g12c:{x:30,y:420,w:112,h:40,t:['KRAS G12C?']},her2:{x:30,y:560,w:112,h:40,t:['HER2','IHC + ISH']},
 L1:{x:196,y:76,w:196,h:40,t:['Immunotherapy','PD-1 ± CTLA-4']},L2:{x:196,y:224,w:196,h:40,t:['BRAF inhibitor','+ anti-EGFR']},L3:{x:196,y:280,w:196,h:40,t:['Chemo + anti-EGFR']},
 L4:{x:196,y:330,w:196,h:40,t:['Chemo + anti-VEGF']},L5:{x:196,y:404,w:196,h:40,t:['Chemo ± anti-VEGF','no anti-EGFR']},L6:{x:196,y:454,w:196,h:40,t:['G12C inhibitor','+ anti-EGFR']},L7:{x:196,y:560,w:196,h:40,t:['HER2-targeted','later line']}};
const bmR=b=>[b.x+b.w,b.y+b.h/2],bmL=b=>[b.x,b.y+b.h/2],bmB=b=>[b.x+b.w/2,b.y+b.h],bmTp=b=>[b.x+b.w/2,b.y];
const bmEl=(a,b,mx)=>{mx=mx==null?(a[0]+b[0])/2:mx;return[a,[mx,a[1]],[mx,b[1]],b]};
/* edges: id, points, label [x,y,anchor,text] */
function bmEdges(G,N){const E={};
  if(!N){E.e0=[[bmR(G.root),bmL(G.mmr)],null];E.eD=[[bmTp(G.mmr),[bmTp(G.mmr)[0],40],bmL(G.L1)],[390,34,'mid','dMMR / MSI-H']];
    E.eP=[bmEl(bmR(G.mmr),bmL(G.ras)),[243,236,'end','pMMR']];E.eRw=[bmEl(bmR(G.ras),bmL(G.braf)),[368,206,'end','wild-type']];E.eRm=[bmEl(bmR(G.ras),bmL(G.g12c)),[368,292,'end','mutant']];
    E.eBv=[bmEl(bmR(G.braf),bmL(G.L2),536),[540,128,'start','V600E']];E.eBw=[bmEl(bmR(G.braf),bmL(G.side),486),[484,236,'mid','WT']];
    E.eSl=[bmEl(bmR(G.side),bmL(G.L3),576),[572,178,'end','left']];E.eSr=[bmEl(bmR(G.side),bmL(G.L4),576),[572,246,'end','right']];
    E.eGn=[bmEl(bmR(G.g12c),bmL(G.L5),536),[540,276,'start','other']];E.eGy=[bmEl(bmR(G.g12c),bmL(G.L6),536),[540,328,'start','G12C']];
    E.eH0=[[bmB(G.root),[bmB(G.root)[0],bmL(G.her2)[1]],bmL(G.her2)],[64,300,'start','also tested']];E.eH1=[[bmR(G.her2),bmL(G.L7)],[470,358,'mid','HER2-positive']]}
  else{const c=90;E.e0=[[bmB(G.root),bmTp(G.mmr)],null];E.eD=[[bmR(G.mmr),bmL(G.L1)],[173,90,'mid','dMMR']];
    E.eP=[[bmB(G.mmr),bmTp(G.ras)],[92,137,'start','pMMR']];E.eRw=[[bmB(G.ras),bmTp(G.braf)],[92,211,'start','wild-type']];
    E.eRm=[[bmL(G.ras),[16,bmL(G.ras)[1]],[16,bmL(G.g12c)[1]],bmL(G.g12c)],[20,412,'start','mutant']];
    E.eBv=[[bmR(G.braf),bmL(G.L2)],[173,238,'mid','V600E']];E.eBw=[[bmB(G.braf),bmTp(G.side)],[92,285,'start','WT']];
    E.eSl=[bmEl(bmR(G.side),bmL(G.L3)),[171,312,'end','left']];E.eSr=[bmEl(bmR(G.side),bmL(G.L4)),[171,346,'end','right']];
    E.eGn=[bmEl(bmR(G.g12c),bmL(G.L5)),[171,434,'end','other']];E.eGy=[bmEl(bmR(G.g12c),bmL(G.L6)),[171,468,'end','G12C']];
    E.eH0=[[bmL(G.root),[6,bmL(G.root)[1]],[6,bmL(G.her2)[1]],bmL(G.her2)],[12,546,'start','also tested']];E.eH1=[[bmR(G.her2),bmL(G.L7)],[173,574,'mid','HER2+']];void c}
  return E}
/* the lit path for a set of results: edges in order, leaves reached */
function bmPath(S){const e=['e0'],lv=[];
  if(S.mmr==='d'){e.push('eD');lv.push('L1')}
  else{e.push('eP');
    if(S.ras==='mut'){e.push('eRm');if(S.g12c==='yes'){e.push('eGy');lv.push('L6')}else{e.push('eGn');lv.push('L5')}}
    else{e.push('eRw');if(S.braf==='v600e'){e.push('eBv');lv.push('L2')}else{e.push('eBw');if(S.side==='left'){e.push('eSl');lv.push('L3')}else{e.push('eSr');lv.push('L4')}}}}
  if(S.her2==='pos'){e.push('eH0','eH1');lv.push('L7')}
  return{e,lv}}
const BM_NODE_OF={eD:'L1',eP:'ras',eRw:'braf',eRm:'g12c',eBv:'L2',eBw:'side',eSl:'L3',eSr:'L4',eGn:'L5',eGy:'L6',eH0:'her2',eH1:'L7',e0:'mmr'};
/* drug classes: status for the current results; st: open | partner | closed | na */
function bmDrugs(S){const ras=S.ras==='mut',d=S.mmr==='d',v=S.braf==='v600e',left=S.side==='left',D=[];
  D.push({n:'Immunotherapy (PD-1 blockade, ± CTLA-4)',st:d?'open':'closed',
    tx:d?'First-line for MSI-H/dMMR mCRC: pembrolizumab doubled median PFS (16.5 vs 8.2 months); nivolumab plus ipilimumab gave 72% 24-month PFS vs 14% with chemotherapy. [[Andre2020,Andre2024,FDA-Keytruda]]':'Not effective in pMMR tumours: in the first trial, 0 of 18 pMMR vs 4 of 10 dMMR colorectal cancers responded to pembrolizumab. [[Le2015]]'});
  D.push({n:'Anti-EGFR (cetuximab, panitumumab)',st:ras?(S.g12c==='yes'?'partner':'closed'):d?'na':v?'partner':left?'open':'closed',
    tx:ras?(S.g12c==='yes'?'Closed on its own for RAS-mutant cancer; panitumumab is labelled with sotorasib, and cetuximab is used with adagrasib, for KRAS G12C. [[FDA-Vectibix,Yaeger2023]]':'Closed: cetuximab is "not indicated for treatment of Ras-mutant colorectal cancer"; panitumumab likewise needs RAS wild-type. [[FDA-Erbitux,FDA-Vectibix]]')
      :d?'RAS wild-type keeps it possible, but dMMR first-line goes to checkpoint inhibitors. [[Morris2023]]'
      :v?'Used as the partner of encorafenib for BRAF V600E. [[FDA-Erbitux,Kopetz2019]]'
      :left?'Open first-line with chemotherapy for left-sided RAS wild-type pMMR disease (ASCO 2023). Benefit is concentrated on the left: OS HR 0.75. [[Morris2023,Arnold2017]]'
      :'Little benefit on the right (OS HR 1.12, retrospective subgroups); ASCO 2023 recommends chemotherapy plus anti-VEGF first-line here. [[Arnold2017,Morris2023]]'});
  D.push({n:'Anti-VEGF (bevacizumab)',st:(!d&&((ras&&S.g12c!=='yes')||(!ras&&!v&&!left)))?'open':'avail',
    tx:'No biomarker needed: labelled with fluorouracil-based chemotherapy for mCRC. The usual first-line partner for tumours outside the other groups. [[FDA-Avastin,Morris2023]]'});
  D.push({n:'BRAF-targeted (encorafenib + cetuximab)',st:v&&!ras&&!d?'open':v?'partner':'na',
    tx:v?`Open: BEACON (previously treated) median OS 9.0 vs 5.4 months; BREAKWATER first-line with mFOLFOX6, 30.3 vs 15.1 months at interim. ${ras?'RAS and BRAF mutations are largely mutually exclusive, so this combination is unusual. ':''}${d?'With dMMR, first-line still goes to immunotherapy in the published order. ':''}[[Kopetz2019,Elez2025,Sepulveda2017]]`:'Only for BRAF V600E. [[FDA-Braftovi]]'});
  D.push({n:'KRAS G12C inhibitor + anti-EGFR',st:S.g12c==='yes'&&!d?'open':S.g12c==='yes'?'partner':'na',
    tx:S.g12c==='yes'?'After fluoropyrimidine, oxaliplatin and irinotecan: sotorasib plus panitumumab (PFS 5.6 vs 2.2 months) or adagrasib plus cetuximab (response 46% vs 19% alone). [[Fakih2023,Yaeger2023,FDA-Lumakras,FDA-Krazati]]':'Only for KRAS G12C (3–4% of mCRC). [[Fakih2023]]'});
  D.push({n:'HER2-targeted (tucatinib + trastuzumab; trastuzumab deruxtecan)',st:S.her2==='pos'?(ras?'partner':'open'):'na',
    tx:S.her2==='pos'?(ras?'The tucatinib label covers RAS wild-type, HER2-positive mCRC only. Trastuzumab deruxtecan has a tumour-agnostic label for HER2 IHC 3+ after prior treatment. [[FDA-Tukysa,FDA-Enhertu]]':'Later line: tucatinib plus trastuzumab gave a 38.1% response rate in MOUNTAINEER; trastuzumab deruxtecan 45.3% in HER2-positive tumours. [[Strickler2023,Yoshino2023,FDA-Tukysa]]'):'Only for HER2-positive tumours. [[SartoreBianchi2016]]'});
  return D}
const BM_ST={open:['good','Opens'],partner:['warn','Conditional'],closed:['bad','Closed'],na:['','Not relevant'],avail:['','Available']};
/* universal testing cases: lost proteins, BRAF, methylation, outcome */
const BM_CASES={a:{lost:['MLH1','PMS2'],braf:true,meth:true,out:'O1',lab:'MLH1 + PMS2 lost'},b:{lost:['MLH1','PMS2'],braf:false,meth:false,out:'O2',lab:'MLH1 + PMS2 lost'},c:{lost:['MSH2','MSH6'],out:'O2',lab:'MSH2 + MSH6 lost'},d:{lost:[],out:'O3',lab:'All 4 retained'}};
const BM_PROT=['MLH1','PMS2','MSH2','MSH6'];
const BM_TSTEPS=[
 {from:0,at:.09,k:'Universal testing',t:'Tissue from the tumour',
  txt:`Thin slices are cut from the biopsy or the resected tumour. Guidelines say clinicians should order MMR testing in patients with CRC, to identify those at high risk of Lynch syndrome and for prognosis; EGAPP found enough evidence to offer Lynch testing to everyone with newly diagnosed CRC, to protect relatives. [[Sepulveda2017,EGAPP2009]]`,
  pt:`The same piece of tumour that confirmed the cancer is used again. No extra procedure is needed.`,
  hook:`Test every new colorectal cancer for MMR, not just young patients or strong family histories.`},
 {from:.18,at:.36,k:'Immunohistochemistry',t:'Stain four proteins',
  txt:`ESMO recommends immunohistochemistry (IHC) for MLH1, MSH2, MSH6 and PMS2 as the first test; PCR of microsatellite markers (five markers including at least BAT-25 and BAT-26) is the second method. A brown nucleus means the protein is there; a nucleus that stays blue in the tumour means it is lost. [[Luchini2019]]`,
  pt:`Four stains, one for each repair protein. If a protein is missing from the cancer cells, its stain stays blank in them.`,
  hook:`IHC first (MLH1, MSH2, MSH6, PMS2); MSI PCR second.`},
 {from:.45,at:.55,k:'Reading the slides',t:'Which proteins are lost?',
  txt:`The proteins work in pairs: MLH1 with PMS2 (MutLα), MSH2 with MSH6 (MutSα). About 15% of CRCs are MSI: roughly 3% from Lynch syndrome and 12% from sporadic MLH1 promoter hypermethylation. dMMR occurs in 15–20% of CRCs, about three-quarters of them from MLH1 silencing. [[Vilar2010,Boland2010,Sepulveda2017]]`,
  pt:`Which stains are blank tells the lab which repair partnership is broken.`,
  hook:`MLH1 pairs with PMS2; MSH2 pairs with MSH6.`},
 {from:.62,at:.72,k:'Reflex test',t:'MLH1 lost: BRAF or methylation',
  txt:`Tumours with MLH1 loss should have BRAF V600 or MLH1 promoter-methylation testing. About three-quarters of CRCs with MSI from MLH1 promoter hypermethylation also carry an acquired BRAF mutation. MSH2 or MSH6 loss is not explained this way. [[Syngal2015,Sepulveda2017]]`,
  pt:`Most MLH1 losses happen by chance inside the tumour: the gene is switched off by chemical tags, often alongside a BRAF mutation.`,
  hook:`BRAF V600E in an MLH1-deficient tumour points to sporadic cancer, not Lynch.`},
 {from:.8,at:.92,k:'The answer',t:'Sporadic, or test for Lynch?',
  txt:`A BRAF mutation strongly favours sporadic disease, but its absence does not exclude Lynch syndrome. Fewer than one-third of people with dMMR/MSI CRC have a germline mutation in MLH1, MSH2, MSH6 or PMS2 (or, rarely, an EPCAM deletion). Relatives who inherit one have about a 45% risk of CRC by age 70. [[Sepulveda2017,EGAPP2009]]`,
  pt:`If the lab cannot explain the missing protein by chance changes in the tumour, the next step is a blood or saliva test for an inherited cause, with genetic counselling.`,
  hook:`dMMR ≠ Lynch: under one-third of dMMR CRCs are Lynch syndrome.`}
];
/* a slide of tissue: glands of tumour nuclei and scattered stromal nuclei */
function bmSlide(x,y,w,h,stain,lost,hl,seed){const rr=rng(seed);let s=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="8" style="fill:var(--cell);stroke:${hl?'var(--bad)':'var(--line)'};stroke-width:${hl?2.4:1}"/>`;
  const nuc=(cx,cy,rx,ry,brown)=>`<ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="${rx}" ry="${ry}" style="fill:var(--goblet);opacity:.85"/>`+(brown>0?`<ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="${rx}" ry="${ry}" style="fill:var(--liver);opacity:${f1(brown)}"/>`:'');
  [[.32,.42,.2],[.7,.6,.17]].forEach(([gx,gy,gr])=>{const cx=x+w*gx,cy=y+h*gy,R=Math.min(w,h)*gr;
    s+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(R*1.25)}" style="fill:var(--mucosa);opacity:.35"/><circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(R*.55)}" style="fill:var(--field)"/>`;
    for(let i=0;i<12;i++){const a=i/12*Math.PI*2;s+=nuc(cx+Math.cos(a)*R*.9,cy+Math.sin(a)*R*.9,4.2,3,lost?0:stain)}});
  for(let i=0;i<11;i++){const px=x+8+rr()*(w-16),py=y+8+rr()*(h-16);s+=nuc(px,py,2.4,2.4,stain)}
  return s}
function bmBox(b,lines,on,col,soft){let s=`<rect x="${f1(b.x)}" y="${f1(b.y)}" width="${b.w}" height="${b.h}" rx="9" style="fill:${on?soft:'var(--panel)'};stroke:${on?col:'var(--line)'};stroke-width:${on?2:1}"/>`;
  const n=lines.length;lines.forEach((l,i)=>s+=`<text x="${f1(b.x+b.w/2)}" y="${f1(b.y+b.h/2+4+(i-(n-1)/2)*14)}" class="t-sm t-mid" style="${on?'fill:var(--ink);font-weight:700':'fill:var(--ink)'}">${l}</text>`);return s}
inits.biomarkers=()=>{
  /* ---- decision tree ---- */
  const svg=$('#bmSvg'),S={...BM_DEF};let tp=1,tStop=null;
  function plen(P){let L=0;for(let i=1;i<P.length;i++)L+=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);return L}
  function partial(P,f){if(f>=1)return P;const tot=plen(P)*f,out=[P[0]];let acc=0;for(let i=1;i<P.length;i++){const d=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);if(acc+d>=tot){const k=(tot-acc)/(d||1);out.push([lerp(P[i-1][0],P[i][0],k),lerp(P[i-1][1],P[i][1],k)]);return out}acc+=d;out.push(P[i])}return out}
  const pd=P=>'M'+P.map(p=>f1(p[0])+' '+f1(p[1])).join('L');
  function drawTree(){const N=vb(svg,'720 400','400 610'),G=N?BM_GN:BM_GW,E=bmEdges(G,N),{e:path,lv}=bmPath(S);let s='';
    const n=path.length,lit=new Set();
    Object.keys(E).forEach(id=>{s+=`<path d="${pd(E[id][0])}" style="fill:none;stroke:var(--line);stroke-width:1.6;${id.startsWith('eH')?'stroke-dasharray:4 3':''}"/>`});
    let head=null;
    path.forEach((id,i)=>{const f=clamp(tp*n-i);if(f<=0)return;const P=partial(E[id][0],f);s+=`<path d="${pd(P)}" style="fill:none;stroke:${id.startsWith('eH')?'var(--warn)':'var(--brand)'};stroke-width:3.2;stroke-linejoin:round;stroke-linecap:round"/>`;
      if(f<1)head=P[P.length-1];if(f>=1)lit.add(BM_NODE_OF[id])});
    if(head)s+=`<circle cx="${f1(head[0])}" cy="${f1(head[1])}" r="5.5" style="fill:var(--brand);stroke:var(--panel);stroke-width:1.5"/>`;
    Object.keys(E).forEach(id=>{const lb=E[id][1];if(!lb)return;const on=path.includes(id);s+=`<text x="${lb[0]}" y="${lb[1]}" class="t-xs ${lb[2]==='mid'?'t-mid':lb[2]==='end'?'t-end':''}" style="${on?'fill:var(--ink);font-weight:700':''}">${lb[3]}</text>`});
    lit.add('root');
    ['root','mmr','ras','braf','side','g12c','her2'].forEach(k=>s+=bmBox(G[k],G[k].t,lit.has(k),k==='her2'?'var(--warn)':'var(--brand)',k==='her2'?'var(--warn-soft)':'var(--brand-soft)'));
    ['L1','L2','L3','L4','L5','L6','L7'].forEach(k=>{const on=lv.includes(k)&&lit.has(k);s+=bmBox(G[k],G[k].t,on,'var(--rx)','var(--rx-soft)');
      if(on)s+=`<circle cx="${f1(G[k].x+G[k].w-8)}" cy="${f1(G[k].y+8)}" r="4" style="fill:var(--rx)"/>`});
    svg.innerHTML=s}
  function note(){const D=bmDrugs(S),{lv}=bmPath(S);
    const warn=S.ras==='mut'&&S.braf==='v600e'?'<p class="stage-cap">RAS and BRAF mutations are largely mutually exclusive, so this combination is rare; the tree follows RAS first. [[Sepulveda2017]]</p>':'';
    const dm=S.mmr==='d'?`<p>dMMR is ${S.side==='left'?'uncommon on the left (3% of left-sided colon, 1% of rectal tumours)':'much commoner on the right (26% of right-sided colon tumours)'}, and 34.6% of dMMR metastatic tumours also carry BRAF, against 6.8% of pMMR. [[Hutchins2011,Venderbosch2014]]</p>`:'';
    $('#bmNote').innerHTML=`<div class="kicker">${lv.length} branch${lv.length>1?'es':''} lit</div><h4>What these results open</h4>${dm}${warn}<ul class="bmdrug">${D.map(d=>`<li><span class="hd"><span class="tag ${BM_ST[d.st][0]}">${BM_ST[d.st][1]}</span>${d.n}</span><span>${d.tx}</span></li>`).join('')}</ul>
      <div class="hook"><b>Exam hook</b>Extended RAS (KRAS and NRAS exons 2, 3, 4) before any anti-EGFR; anti-EGFR benefit sits in left-sided RAS wild-type; dMMR → checkpoint inhibitor. [[Sepulveda2017,Arnold2017,Andre2020]]</div>`}
  function run(){if(tStop)tStop();tp=0;tStop=animate(1300,p=>{tp=p;drawTree()},()=>{tStop=null})}
  function setBtn(){$$('[data-bm]').forEach(b=>b.setAttribute('aria-pressed',S[b.dataset.bm]===b.dataset.v))}
  $('#bmToggles').addEventListener('click',e=>{const b=e.target.closest('[data-bm]');if(!b)return;const k=b.dataset.bm,v=b.dataset.v;S[k]=v;
    if(k==='g12c'&&v==='yes')S.ras='mut';if(k==='ras'&&v==='wt')S.g12c='no';
    setBtn();note();run()});
  $('#bmTreePlay').addEventListener('click',run);
  $('#bmTreeReset').addEventListener('click',()=>{Object.assign(S,BM_DEF);setBtn();note();run()});
  setBtn();note();drawTree();

  /* ---- universal testing scrubber ---- */
  const isv=$('#bmIhc'),rg=$('#bmT');let cs='a',setSt=()=>{};
  function draw(t){const N=vb(isv,'720 380','400 640'),C=BM_CASES[cs],stain=ramp(t,.2,.42),read=t>=.45,test=t>=.62,ans=t>=.8;let s='';
    /* four slides fly out of the block, then stain */
    const fly=ease(ramp(t,.02,.16));
    const bx=N?200:360,by=N?190:105;
    if(fly<1)s+=`<rect x="${bx-34}" y="${by-24}" width="68" height="48" rx="6" style="fill:var(--gold-soft);stroke:var(--gold);stroke-width:1.5;opacity:${f1(1-fly)}"/><text x="${bx}" y="${by+4}" class="t-xs t-mid" style="opacity:${f1(1-fly)}">tissue block</text>`;
    BM_PROT.forEach((pn,i)=>{const P=N?{x:14+(i%2)*192,y:40+Math.floor(i/2)*170,w:180,h:140}:{x:16+i*176,y:30,w:160,h:150};
      const x=lerp(bx-P.w/2,P.x,fly),y=lerp(by-P.h/2,P.y,fly),lost=C.lost.includes(pn);
      s+=`<g style="opacity:${f1(.25+.75*fly)}">${bmSlide(x,y,P.w,P.h,stain,lost,read&&lost,9)}</g>`;
      s+=`<text x="${f1(x)}" y="${f1(y-8)}" class="t-sm" style="fill:var(--ink);font-weight:700;opacity:${f1(fly)}">${pn}</text>`;
      if(read)s+=`<text x="${f1(P.x+P.w)}" y="${f1(P.y-8)}" class="t-xs t-end" style="fill:${lost?'var(--bad)':'var(--good)'};font-weight:700">${lost?'LOST in tumour':'retained'}</text>`});
    /* flow chart */
    const F=N?{A:{x:14,y:390,w:180,h:46},B:{x:206,y:390,w:180,h:46},C:{x:206,y:466,w:180,h:62},O3:{x:14,y:466,w:180,h:46},O1:{x:14,y:560,w:180,h:58},O2:{x:206,y:560,w:180,h:72}}
             :{A:{x:16,y:230,w:150,h:50},B:{x:196,y:230,w:150,h:50},C:{x:378,y:214,w:170,h:66},O1:{x:574,y:208,w:138,h:58},O2:{x:574,y:296,w:138,h:72},O3:{x:16,y:316,w:150,h:46}};
    const route={a:['A','B','C','O1'],b:['A','B','C','O2'],c:['A','B','O2'],d:['A','O3']}[cs];
    const stage=ans?4:test?3:read?2:t>=.18?1:0;
    const on=k=>{const i=route.indexOf(k);return i>=0&&i<stage};
    const ed=N?{AB:[bmR(F.A),bmL(F.B)],BC:[bmB(F.B),bmTp(F.C)],BO2:[bmR(F.B),[394,bmR(F.B)[1]],[394,bmR(F.O2)[1]],bmR(F.O2)],CO1:[[260,F.C.y+F.C.h],[260,544],[104,544],bmTp(F.O1)],CO2:[[330,F.C.y+F.C.h],bmTp(F.O2)],AO3:[bmB(F.A),bmTp(F.O3)]}
               :{AB:[bmR(F.A),bmL(F.B)],BC:bmEl(bmR(F.B),bmL(F.C)),BO2:[[346,270],[364,270],[364,350],[574,350]],CO1:bmEl(bmR(F.C),bmL(F.O1)),CO2:[[530,F.C.y+F.C.h],[530,318],[574,318]],AO3:[bmB(F.A),bmTp(F.O3)]};
    const eOn={AB:on('B'),BC:on('C'),BO2:cs==='c'&&on('O2'),CO1:on('O1')&&route.includes('C'),CO2:cs==='b'&&on('O2'),AO3:on('O3')};
    const eLab=N?{BC:[302,458,'start','MLH1 lost'],BO2:[390,500,'end','MSH2/6'],CO1:[180,540,'end','yes'],CO2:[336,550,'start','no'],AO3:[110,458,'start','none lost']}
                :{BC:[362,206,'mid','MLH1 lost'],BO2:[372,344,'start','MSH2 / MSH6 lost'],CO1:[561,232,'mid','yes'],CO2:[536,312,'start','no'],AO3:[96,302,'start','none lost']};
    Object.keys(ed).forEach(k=>{s+=`<path d="${'M'+ed[k].map(p=>f1(p[0])+' '+f1(p[1])).join('L')}" style="fill:none;stroke:${eOn[k]?'var(--brand)':'var(--line)'};stroke-width:${eOn[k]?3:1.4}"/>`;
      if(eLab[k]){const l=eLab[k];s+=`<text x="${l[0]}" y="${l[1]}" class="t-xs ${l[2]==='mid'?'t-mid':l[2]==='end'?'t-end':''}" style="${eOn[k]?'fill:var(--ink);font-weight:700':''}">${l[3]}</text>`}});
    s+=bmBox(F.A,['IHC result',read?C.lab:'…'],on('A'),'var(--brand)','var(--brand-soft)');
    s+=bmBox(F.B,['Is MLH1 lost?'],on('B'),'var(--brand)','var(--brand-soft)');
    const tested=on('C');
    s+=bmBox({...F.C,h:F.C.h-18},['BRAF V600E or','MLH1 methylation'],tested,'var(--brand)','var(--brand-soft)');
    s+=`<rect x="${F.C.x}" y="${F.C.y+F.C.h-18}" width="${F.C.w}" height="18" rx="4" style="fill:${tested?'var(--brand-soft)':'var(--panel)'};stroke:${tested?'var(--brand)':'var(--line)'}"/>`;
    for(let i=0;i<7;i++){const lx=F.C.x+12+i*13,ly=F.C.y+F.C.h-9,m=tested&&C.meth&&ramp(t,.64,.72)>i/7;s+=`<line x1="${lx}" x2="${lx}" y1="${ly}" y2="${ly-5}" style="stroke:var(--muted)"/><circle cx="${lx}" cy="${ly-6}" r="3.2" style="fill:${m?'var(--ink)':'var(--panel)'};stroke:var(--ink);stroke-width:1"/>`}
    s+=`<text x="${F.C.x+F.C.w-6}" y="${F.C.y+F.C.h-5}" class="t-xs t-end" style="${tested?'fill:var(--ink);font-weight:700':''}">${tested&&t>=.7?(C.braf?'V600E · methyl.':'WT · unmethyl.'):'promoter'}</text>`;
    s+=bmBox(F.O1,N?['Sporadic dMMR','(BRAF / methylation)']:['Sporadic dMMR','BRAF-mutant or','methylated'],on('O1'),'var(--good)','var(--good-soft)');
    s+=bmBox(F.O2,['Lynch not excluded:','genetic counselling','+ germline MMR test'],on('O2'),'var(--warn)','var(--warn-soft)');
    s+=bmBox(F.O3,['pMMR: repair intact'],on('O3'),'var(--good)','var(--good-soft)');
    isv.innerHTML=s;
    const p=phaseOf(BM_TSTEPS,t);setSt(p);
    rg.setAttribute('aria-valuetext',`Step ${p+1}: ${BM_TSTEPS[p].t}`);
    const res={a:'Sporadic: the MLH1 loss is explained by promoter methylation, with a BRAF V600E mutation in the tumour.',b:'Neither BRAF V600E nor methylation explains the MLH1 loss, so Lynch syndrome is not excluded: genetic counselling and germline testing come next.',c:'MSH2/MSH6 loss is not explained by MLH1 methylation, so the next step is genetic counselling and germline testing.',d:'All four proteins are present: the tumour is mismatch-repair proficient (pMMR).'}[cs];
    $('#bmIhcNote').innerHTML=noteHTML(BM_TSTEPS[p])+`<div class="kv"><div><dt>This example · ${C.lab}</dt><dd>${ans?res:'Scrub on to see where this tumour ends up.'} [[Sepulveda2017,Syngal2015]]</dd></div>${cs!=='d'?`<div><dt>Also for treatment</dt><dd>A dMMR result also matters for treatment: no fluorouracil alone in stage II, immunotherapy if metastatic. [[Baxter2022,Andre2020]]</dd></div>`:''}</div>`}
  const stop=playWire(rg,$('#bmPlay'),draw,18000,'%t:player.replay%','biomarkers');
  setSt=stepWire($('#bmSteps'),BM_TSTEPS,rg,draw,stop);
  $$('[data-bmcase]').forEach(b=>b.addEventListener('click',()=>{cs=b.dataset.bmcase;$$('[data-bmcase]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---- dMMR frequency bars ---- */
  const fs=$('#bmFreq');
  function drawF(){const NF=vb(fs,'720 300','400 380');const rows=[['Right colon (QUASAR)',26,26,'var(--tumour)'],['Left colon (QUASAR)',3,3,'var(--accent)'],['Rectum (QUASAR)',1,1,'var(--accent)'],['All colorectal cancer',15,15,'var(--brand)'],['Stage II–III trial cohorts',15,16.7,'var(--brand)'],['Metastatic',3.5,5,'var(--lymph)']];
    const G=NF?{lx:14,x0:14,x1:360,y0:24,dy:58,bh:16,ty:-6}:{lx:20,x0:250,x1:640,y0:30,dy:44,bh:20,ty:15};const X=v=>lerp(G.x0,G.x1,v/30);let s='';
    [0,10,20,30].forEach(v=>s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${G.y0-8}" y2="${G.y0+6*G.dy-10}" class="grid"/><text x="${f1(X(v))}" y="${G.y0+6*G.dy+4}" class="t-xs t-mid">${v}%</text>`);
    rows.forEach(([n,a,b,c],i)=>{const y=G.y0+i*G.dy+(NF?14:0);s+=`<text x="${G.lx}" y="${y+G.ty}" class="t-sm" style="fill:var(--ink)">${n}</text>`;
      s+=`<rect x="${G.x0}" y="${y}" width="${f1(X(a)-G.x0)}" height="${G.bh}" rx="4" style="fill:${c};opacity:.85"/>`;
      if(b>a)s+=`<rect x="${f1(X(a))}" y="${y}" width="${f1(X(b)-X(a))}" height="${G.bh}" rx="4" style="fill:${c};opacity:.35"/>`;
      s+=`<text x="${f1(X(b)+6)}" y="${y+G.bh-4}" class="t-lbl">${b>a?a+'–'+b:a}%</text>`});
    fs.innerHTML=s}
  drawF();
  const prevR=redraws.biomarkers;redraws.biomarkers=()=>{prevR&&prevR();drawTree();drawF()};
};
