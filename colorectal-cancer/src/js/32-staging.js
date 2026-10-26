/* =============== 3.2 Staging: TNM calculator =============== */
const ST_T=['Tis','T1','T2','T3','T4a','T4b'];
const ST_N=['N0','N1a','N1b','N1c','N2a','N2b'];
const ST_M=['M0','M1a','M1b','M1c'];
/* AJCC 8th edition stage groups: the research pass's machine-readable table, evaluated in order; M overrides T and N */
const ST_ROWS=[['0','Tis','N0','M0'],['I','T1|T2','N0','M0'],['IIA','T3','N0','M0'],['IIB','T4a','N0','M0'],['IIC','T4b','N0','M0'],
 ['IIIA','T1|T2','N1a|N1b|N1c','M0'],['IIIA','T1','N2a','M0'],['IIIB','T3|T4a','N1a|N1b|N1c','M0'],['IIIB','T2|T3','N2a','M0'],['IIIB','T1|T2','N2b','M0'],
 ['IIIC','T4a','N2a','M0'],['IIIC','T3|T4a','N2b','M0'],['IIIC','T4b','N1a|N1b|N1c|N2a|N2b','M0'],
 ['IVA','any','any','M1a'],['IVB','any','any','M1b'],['IVC','any','any','M1c']];
function stStage(T,N,M){const ok=(p,v)=>p==='any'||p.split('|').includes(v);for(const r of ST_ROWS)if(ok(r[1],T)&&ok(r[2],N)&&ok(r[3],M))return r[0];return null}
const ST_LADDER=['0','I','IIA','IIB','IIC','IIIA','IIIB','IIIC','IVA','IVB','IVC'];
const stGrp=s=>s==null?-1:s==='0'?0:s==='I'?1:s.startsWith('IV')?4:s.startsWith('III')?3:2;
const ST_GC=['var(--good)','var(--good)','var(--warn)','var(--lymph)','var(--tumour)'];
const ST_GS=['var(--good-soft)','var(--good-soft)','var(--warn-soft)','var(--lymph-soft)','var(--tumour-soft)'];
const stCol=s=>stGrp(s)<0?'var(--muted)':ST_GC[stGrp(s)], stSoft=s=>stGrp(s)<0?'var(--panel-2)':ST_GS[stGrp(s)];
const ST_TD={Tis:'carcinoma in situ or intramucosal carcinoma: limited to the epithelium or lamina propria',T1:'invades the submucosa',T2:'invades the muscularis propria',T3:'grows through the muscularis propria into pericolorectal tissues',T4a:'penetrates the visceral peritoneum',T4b:'directly invades or adheres to other organs or structures'};
const ST_ND={N0:'no regional lymph-node metastasis and no tumour deposits',N1a:'metastasis in 1 regional lymph node',N1b:'metastasis in 2–3 regional lymph nodes',N1c:'no positive nodes, but tumour deposits in the subserosa, mesentery or non-peritonealised pericolic or perirectal tissue',N2a:'metastasis in 4–6 regional lymph nodes',N2b:'metastasis in 7 or more regional lymph nodes'};
const ST_MD={M0:'no distant metastasis',M1a:'metastasis confined to one organ or site (for example liver, lung, ovary or a non-regional node), without peritoneal metastasis',M1b:'metastasis to two or more organs or sites, without peritoneal metastasis',M1c:'metastasis to the peritoneal surface, alone or with other sites'};
/* 5-year overall survival by 8th-edition stage in one single-centre cohort (n=1,090); IVB and IVC groups were very small */
const ST_TONG={'0':100,I:98.5,IIA:82.6,IIB:76.8,IIC:67.7,IIIA:65.4,IIIB:60,IIIC:44.9,IVA:8.3};
const ST_STEPS=[
 {from:0,at:.06,k:'T · primary tumour',t:'Tis: in situ',
  txt:`Every colorectal cancer starts in the mucosa, the lining layer. Tis is carcinoma in situ or intramucosal carcinoma: tumour limited to the epithelium or invading the lamina propria, without extension through the muscularis mucosae. With N0 M0 this is stage 0. [[Amin2017AJCC,Tong2018]]`,
  pt:`The cancer cells are still only in the inner lining of the bowel.`,
  hook:`T is about depth, not size. The layers in order: mucosa, submucosa, muscularis propria, subserosa, serosa.`},
 {from:.1,at:.17,k:'T · primary tumour',t:'T1: submucosa',
  txt:`T1 tumours break through the muscularis mucosae into the submucosa but not into the muscularis propria. The submucosa holds lymphatics and vessels, which is why depth starts to matter here: in pT1 cancers, tumour budding at the invasive front independently predicts lymph-node metastasis. T1 N0 M0 is stage I. [[Amin2017AJCC,Tong2018,Lugli2017]]`,
  pt:`The tumour has reached the second layer, which has small blood and lymph vessels.`,
  hook:`T1 = submucosa. A tumour bud = 1–4 tumour cells at the invasive front.`},
 {from:.2,at:.27,k:'T · primary tumour',t:'T2: muscle layer',
  txt:`T2 tumours invade the muscularis propria, the thick muscle coat that moves bowel contents along. T2 N0 M0 is still stage I. Stage I colon cancer had 93.2% 5-year survival in SEER under the 6th edition (population figure, diagnoses 1991–2000). [[Amin2017AJCC,Tong2018,OConnell2004]]`,
  pt:`The tumour is in the muscle of the bowel wall but has not gone through it.`,
  hook:`T1–T2 N0 M0 = stage I.`},
 {from:.3,at:.37,k:'T · primary tumour',t:'T3: through the wall',
  txt:`T3 tumours grow through the muscularis propria into the pericolorectal tissues (the subserosa and fat around the bowel). T3 N0 M0 is stage IIA. CT detects growth beyond the wall (T3–T4) with pooled sensitivity 90% and specificity 69%. [[Amin2017AJCC,Tong2018,Nerad2016]]`,
  pt:`The tumour has grown all the way through the muscle into the fatty tissue around the bowel.`,
  hook:`T3 N0 M0 = IIA; T4a N0 = IIB; T4b N0 = IIC.`},
 {from:.4,at:.47,k:'T · primary tumour',t:'T4a: serosa',
  txt:`T4a tumours penetrate the visceral peritoneum, the serosa that covers the bowel. The AJCC also counts gross perforation through tumour, and continuous invasion through inflammation to the peritoneal surface, as T4a. T4a N0 M0 is stage IIB. ASCO 2022: people with T4 tumours are at higher risk of recurrence and should be offered adjuvant chemotherapy. [[Amin2017AJCC,Tong2018,Baxter2022]]`,
  pt:`The tumour has broken through the bowel's thin outer covering.`,
  hook:`T4a = visceral peritoneum (serosa). T4 is the strongest high-risk feature in stage II.`},
 {from:.5,at:.57,k:'T · primary tumour',t:'T4b: other organ',
  txt:`T4b tumours directly invade or stick to other organs or structures. T4b N0 M0 is stage IIC. T categories did not change between the 7th and 8th editions; the SEER and NCDB data behind them showed that T4a does better than T4b within each N category. [[Amin2017AJCC,Tong2018,Gunderson2010]]`,
  pt:`The tumour has grown into a neighbouring organ, such as another loop of bowel.`,
  hook:`T4b = adjacent organ. T4b with any positive node is IIIC.`},
 {from:.6,at:.705,k:'N · regional nodes',t:'N1: 1–3 nodes or deposits',
  txt:`Tumour cells travel along lymph vessels to the regional nodes. N1a is 1 positive node, N1b is 2–3. N1c means no positive node but tumour deposits: nodules of tumour in the subserosa, mesentery or pericolic fat with no node structure. Deposits never change T, and once any node is positive they are not added to the count. [[Amin2017AJCC,Tong2018]]`,
  pt:`Lymph nodes are small filters along the bowel's drainage. Here 1 to 3 of them contain cancer, or there are cancer nodules in the nearby fat.`,
  hook:`N1a = 1 node; N1b = 2–3; N1c = deposits with no positive nodes.`},
 {from:.72,at:.81,k:'N · regional nodes',t:'N2: 4 or more nodes',
  txt:`N2a is 4–6 positive nodes; N2b is 7 or more. The pathologist should examine at least 12 nodes: in a 17-study review, 16 found that survival in stage II rose with the number of nodes evaluated. Any positive node with M0 makes the cancer stage III, and the exact substage depends on T. [[Amin2017AJCC,Tong2018,Chang2007,Baxter2022]]`,
  pt:`Four or more lymph nodes contain cancer. Checking at least 12 nodes makes sure none is missed.`,
  hook:`N2a = 4–6; N2b = 7 or more. Look for ≥12 nodes.`},
 {from:.84,at:.99,k:'M · distant spread',t:'M1: distant organs',
  txt:`M1a is spread to one organ or site (such as the liver, lung, ovary or a non-regional node) without peritoneum; M1b is two or more organs; M1c is the peritoneal surface, alone or with other sites. M1c and stage IVC were the main change in the 8th edition: in the 7th, peritoneal disease sat in M1b. Any M1 is stage IV, whatever T and N. [[Amin2017AJCC,Tong2018,Weiser2018]]`,
  pt:`The cancer has spread through the blood or across the belly lining to places far from the bowel.`,
  hook:`M1a = one organ; M1b = two or more; M1c = peritoneum (new in the 8th edition, stage IVC).`}
];
/* the animation's own state at time t: T index and growth, N category and positive-node count, deposits, M category */
function stState(t){
  const ti=t<.6?Math.min(5,Math.floor(t/.1)):5,tg=t<.6?ease(ramp(t-ti*.1,0,.07)):1;
  let N='N0',kf=0,dep=0;
  const sub=(a,b,lo,hi)=>lerp(lo-1,hi,ramp(t,a,a+(b-a)*.75));
  if(t>=.6&&t<.64){N='N1a';kf=sub(.6,.64,1,1)}
  else if(t>=.64&&t<.68){N='N1b';kf=sub(.64,.68,2,3)}
  else if(t>=.68&&t<.72){N='N1c';kf=0;dep=ramp(t,.68,.695)}
  else if(t>=.72&&t<.78){N='N2a';kf=sub(.72,.78,4,6);dep=1}
  else if(t>=.78){N='N2b';kf=sub(.78,.84,7,9);dep=1}
  const lo={N0:0,N1a:1,N1b:2,N1c:0,N2a:4,N2b:7}[N],hi={N0:0,N1a:1,N1b:3,N1c:0,N2a:6,N2b:9}[N];
  const k=clamp(Math.ceil(kf-.001),lo,hi);
  const M=t<.84?'M0':t<.89?'M1a':t<.94?'M1b':'M1c';
  return {ti,tg,T:ST_T[ti],N,kf,k,dep,M,liv:ramp(t,.845,.875),lun:ramp(t,.895,.925),per:ramp(t,.945,.98)}}
function stLung(x,y,s,mets){let g=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})"><path d="M0 -40V-14M0 -14L-8 -6M0 -14L8 -6" style="fill:none;stroke:var(--mucosa-line);stroke-width:3;stroke-linecap:round"/>`;
  g+=`<path d="M-8 -8C-26 -16 -42 6 -40 28C-38 42 -20 44 -10 36C-5 30 -5 6 -8 -8Z" style="fill:var(--mucosa);opacity:.75;stroke:var(--mucosa-line);stroke-width:1.5"/><path d="M8 -8C26 -16 42 6 40 28C38 42 20 44 10 36C5 30 5 6 8 -8Z" style="fill:var(--mucosa);opacity:.75;stroke:var(--mucosa-line);stroke-width:1.5"/>`;
  [[-24,8],[22,18],[-18,28]].slice(0,mets).forEach(([a,b])=>g+=`<circle cx="${a}" cy="${b}" r="5" style="fill:var(--cell);stroke:var(--tumour);stroke-width:2"/>`);
  return g+'</g>'}
function stPerit(x,y,s,seed){let g=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})"><path d="M-36 -24Q-40 10 -14 30Q10 44 34 24Q44 4 34 -24" style="fill:var(--fat);opacity:.6;stroke:var(--serosa);stroke-width:3"/><path d="M-18 -6q6 -10 12 0t12 0t12 0M-20 12q6 -10 12 0t12 0t12 0" style="fill:none;stroke:var(--mucosa-line);stroke-width:4;stroke-linecap:round;opacity:.6"/>`;
  const pts=[[-34,-10],[-30,16],[-12,30],[10,36],[30,20],[36,-4],[-36,4]];
  pts.slice(0,Math.round(seed*pts.length)).forEach(([a,b])=>g+=`<circle cx="${a}" cy="${b}" r="3.6" style="fill:var(--tumour)"/>`);
  return g+'</g>'}
function stTumour(cx,y0,D,hw,bh){const rr=rng(11),pts=[];
  for(let i=0;i<=16;i++){const a=Math.PI+i/16*Math.PI,j=1+(rr()-.5)*.14;pts.push([cx+Math.cos(a)*hw*1.04*j,y0+Math.sin(a)*bh*j])}
  const dep=Math.max(4,D-y0),n=12;
  for(let i=1;i<=n;i++){const u=i/n,w=hw*(1-.55*u)*(1+(rr()-.5)*.3);pts.push([cx+w,y0+dep*u])}
  for(let i=n;i>=1;i--){const u=i/n,w=hw*(1-.55*u)*(1+(rr()-.5)*.3);pts.push([cx-w,y0+dep*u])}
  let s=`<path d="M${pts.map(p=>f1(p[0])+' '+f1(p[1])).join('L')}Z" style="fill:var(--tumour);opacity:.9;stroke:var(--tumour);stroke-width:1.5;stroke-linejoin:round"/>`;
  for(let i=0;i<9;i++){const u=rr(),px=cx+(rr()-.5)*hw*(1-.5*u)*1.2,py=y0-bh*.6+(dep+bh*.6)*u;s+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="2.2" style="fill:var(--cell);opacity:.55"/>`}
  return s}
inits.staging=()=>{
  const svg=$('#stSvg'),rg=$('#stT');let setSt=()=>{};
  function draw(t){
    const Nn=vb(svg,'720 380','400 560'),S=stState(t);
    const L=Nn?{wx:14,wy:44,ww:196,wh:180,lx:218,dh:[14,282],liv:[60,322,.5],lun:[180,322,.62],per:[310,322,.62],dl:362,nh:[14,384],tr:[30,386,430],nx:[92,50],ny:[408,452],nr:9,dep:[50,430],vx:6,sy:486,sc:[14,62,494,54]}
                :{wx:20,wy:44,ww:230,wh:220,lx:258,dh:[440,40],liv:[486,92,.62],lun:[592,92,.7],per:[672,92,.72],dl:146,nh:[440,176],tr:[432,708,222],nx:[470,44],ny:[198,246],nr:10,dep:[446,222],vx:420,sy:318,sc:[20,115,326,46]};
    const W=wall(L.wx,L.wy,L.ww,{h:L.wh,labels:false}),Y=W.y;let s=W.svg;
    /* layer labels with the T letter each layer defines */
    const lab=[['Mucosa · Tis',(Y.mucosa+Y.submucosa)/2,0],['Submucosa · T1',(Y.submucosa+Y.muscularis)/2,1],['Muscularis propria · T2',(Y.muscularis+Y.subserosa)/2,2],['Subserosa · T3',(Y.subserosa+Y.serosa)/2,3],['Serosa · T4a',(Y.serosa+Y.fat)/2+5,4],['Beyond the serosa',Y.fat+(Y.bottom-Y.fat)*.42,-1]];
    lab.forEach(([n,y,i])=>s+=`<text x="${L.lx}" y="${f1(y+4)}" class="t-sm" style="${i===S.ti?'fill:var(--tumour);font-weight:700':''}">${n}</text>`);
    /* adjacent organ for T4b */
    const oy=Y.bottom+6,oh=Nn?24:26,orgHit=S.ti===5?S.tg:0;
    s+=`<rect x="${L.wx+8}" y="${f1(oy)}" width="${L.ww-16}" height="${oh}" rx="12" style="fill:var(--mucosa);opacity:${f1(.3+.25*orgHit)};stroke:${orgHit>0?'var(--tumour)':'var(--mucosa-line)'};stroke-width:${orgHit>0?2:1}"/>`;
    s+=`<text x="${L.lx}" y="${f1(oy+oh/2+4)}" class="t-sm" style="${S.ti===5?'fill:var(--tumour);font-weight:700':''}">Other organ · T4b</text>`;
    /* tumour depth by T */
    const mid=(a,b,f)=>a+(b-a)*f;
    const DEP=[mid(Y.mucosa,Y.submucosa,.72),mid(Y.submucosa,Y.muscularis,.62),mid(Y.muscularis,Y.subserosa,.66),mid(Y.subserosa,Y.serosa,.8),mid(Y.fat,Y.bottom,.4),oy+oh*.55];
    const D=S.ti===0?lerp(Y.mucosa+3,DEP[0],S.tg):lerp(DEP[S.ti-1],DEP[S.ti],S.tg);
    const cx=L.wx+L.ww*.4,hw=L.ww*(.09+.022*(S.ti+S.tg)),bh=6+2.6*(S.ti+S.tg);
    s+=stTumour(cx,Y.mucosa,D,hw,bh);
    if(S.ti>=1)[[-.28,6],[.3,4],[.05,9]].forEach(([a,b])=>s+=`<circle cx="${f1(cx+a*hw)}" cy="${f1(D+b)}" r="2.4" style="fill:var(--tumour);opacity:${f1(.8*(D<Y.fat?1:.4))}"/>`);
    if(S.ti>=4){const by=Y.serosa+2;s+=`<path d="M${f1(cx-hw*.7)} ${f1(by)}L${f1(cx-hw*.95)} ${f1(by-6)}M${f1(cx+hw*.7)} ${f1(by)}L${f1(cx+hw*.95)} ${f1(by-6)}" style="stroke:var(--gold);stroke-width:2;stroke-linecap:round"/>`}
    /* header readout */
    const st=stStage(S.T,S.N,S.M);
    s+=`<text x="${L.wx}" y="28" class="t-big"><tspan style="fill:${S.ti<6&&t<.6?'var(--tumour)':'var(--ink)'}">${S.T}</tspan> <tspan style="fill:${S.N!=='N0'?'var(--lymph)':'var(--ink)'}">${S.N}</tspan> <tspan style="fill:${S.M!=='M0'?'var(--tumour)':'var(--ink)'}">${S.M}</tspan><tspan style="fill:var(--muted)"> → </tspan><tspan style="fill:${stCol(st)}">Stage ${st}</tspan></text>`;
    /* distant sites */
    s+=`<text x="${L.dh[0]}" y="${L.dh[1]}" class="t-sm" style="${S.M!=='M0'?'fill:var(--tumour);font-weight:700':''}">DISTANT SITES · ${S.M}</text>`;
    s+=liver(L.liv[0],L.liv[1],L.liv[2],Math.round(S.liv*4),4);
    s+=stLung(L.lun[0],L.lun[1],L.lun[2],Math.round(S.lun*3));
    s+=stPerit(L.per[0],L.per[1],L.per[2],S.per);
    [['Liver',L.liv[0],S.liv],['Lung',L.lun[0],S.lun],['Peritoneum',L.per[0],S.per]].forEach(([n,x,v])=>s+=`<text x="${x}" y="${L.dl}" class="t-xs t-mid" style="${v>0?'fill:var(--tumour);font-weight:700':''}">${n}</text>`);
    /* a travelling tumour cell toward the organ being seeded */
    const fly=(p,tx,ty)=>{if(p<=0||p>=1)return'';const sx=cx,sy=Y.muscularis,qx=(sx+tx)/2,qy=Math.min(sy,ty)-40,x=(1-p)*(1-p)*sx+2*(1-p)*p*qx+p*p*tx,y=(1-p)*(1-p)*sy+2*(1-p)*p*qy+p*p*ty;return `<circle cx="${f1(x)}" cy="${f1(y)}" r="4" style="fill:var(--tumour);stroke:var(--panel);stroke-width:1.2"/>`};
    s+=fly(ramp(t,.84,.86),L.liv[0],L.liv[1])+fly(ramp(t,.89,.91),L.lun[0],L.lun[1])+fly(ramp(t,.94,.96),L.per[0],L.per[1]);
    /* regional nodes: a lymph vessel from the tumour to a trunk with 12 nodes */
    const vy=Y.fat+(Y.bottom-Y.fat)*.78,[t0,t1,ty]=L.tr;
    const vpath=Nn?`M${f1(cx)} ${f1(D)}L${f1(cx)} ${f1(vy)}H${L.vx}V${ty}H${t1}`:`M${f1(cx)} ${f1(D)}L${f1(cx)} ${f1(vy)}H${L.vx}V${ty}H${t1}`;
    s+=`<path d="${vpath}" style="fill:none;stroke:var(--lymph);stroke-width:1.6;opacity:${t>=.58?.8:.3};stroke-dasharray:${t>=.58?'0':'3 3'}"/>`;
    s+=`<text x="${L.nh[0]}" y="${L.nh[1]}" class="t-sm" style="${S.N!=='N0'?'fill:var(--lymph);font-weight:700':''}">REGIONAL NODES · ${S.k} of 12 positive</text>`;
    for(let i=0;i<12;i++){const col=i%6,row=Math.floor(i/6),x=L.nx[0]+col*L.nx[1],y=L.ny[row],ord=col*2+row,fill=clamp(S.kf-ord);
      s+=`<line x1="${x}" x2="${x}" y1="${y}" y2="${ty}" style="stroke:var(--lymph);stroke-width:1.2;opacity:.6"/>`+node(x,y,L.nr,fill)}
    /* travelling cell along the trunk to the node being filled */
    if(S.kf>0&&S.kf<9){const ord=Math.floor(S.kf),fr=S.kf-ord;if(fr>.02&&fr<.98){const col=Math.floor(ord/2),x=lerp(t0,L.nx[0]+col*L.nx[1],fr);s+=`<circle cx="${f1(x)}" cy="${ty}" r="3.6" style="fill:var(--tumour)"/>`}}
    if(S.dep>0){const [dx,dy]=L.dep;s+=`<path d="M${dx-7} ${dy-2}Q${dx-6} ${dy-9} ${dx} ${dy-8}Q${dx+8} ${dy-7} ${dx+7} ${dy}Q${dx+6} ${dy+8} ${dx-1} ${dy+7}Q${dx-8} ${dy+6} ${dx-7} ${dy-2}Z" style="fill:var(--tumour);opacity:${f1(S.dep*(S.N==='N1c'?.95:.4))}"/>`;
      s+=`<text x="${dx}" y="${dy+(Nn?24:-14)}" class="t-xs t-mid" style="fill:var(--tumour);opacity:${f1(S.N==='N1c'?1:.7)}">${S.N==='N1c'?'deposit':'not counted'}</text>`}
    /* strip: the stage each T would give with the current N and M */
    const [sx0,cw,sy0,ch]=L.sc;
    s+=`<text x="${sx0}" y="${L.sy}" class="t-sm">STAGE FOR EACH T WITH ${S.N} ${S.M}</text>`;
    ST_T.forEach((T,i)=>{const g=stStage(T,S.N,S.M),x=sx0+i*cw,on=i===S.ti;
      s+=`<rect x="${x+1}" y="${sy0}" width="${cw-4}" height="${ch}" rx="7" style="fill:${stSoft(g)};stroke:${on?'var(--ink)':stCol(g)};stroke-width:${on?2.2:1}"/>`;
      s+=`<text x="${f1(x+cw/2-1)}" y="${sy0+15}" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:700':''}">${T}</text><text x="${f1(x+cw/2-1)}" y="${sy0+ch-9}" class="t-big t-mid" style="fill:${stCol(g)}">${g||'n/a'}</text>`});
    svg.innerHTML=s;
    const p=phaseOf(ST_STEPS,t);setSt(p);
    rg.setAttribute('aria-valuetext',`${S.T} ${S.N} ${S.M}, stage ${st}`);
    $('#stRead').innerHTML=`<span><b>${S.T}</b> ${ST_TD[S.T]}</span><span><b>${S.N}</b> ${ST_ND[S.N]}</span><span><b>${S.M}</b> ${ST_MD[S.M]}</span>`;
    $('#stNote').innerHTML=noteHTML(ST_STEPS[p])+`<div class="kv"><div><dt>Now: ${S.T} ${S.N} ${S.M} → stage ${st}</dt><dd>${S.N==='N1c'?'The deposit counts only because no node is positive. ':''}${S.N.startsWith('N2')?'The deposit is still there, but with positive nodes it is not added to the count. ':''}The strip under the picture shows how the same N and M would stage with each depth. [[Amin2017AJCC,Tong2018]]</dd></div></div>`;
  }
  const stop=playWire(rg,$('#stPlay'),draw,26000,'%t:player.replay%','staging');
  setSt=stepWire($('#stSteps'),ST_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- calculator ---- */
  const C={T:'T3',N:'N1b',M:'M0'};
  const mk=(el,arr,key)=>{$(el).innerHTML=arr.map(v=>`<button class="btn" data-stc="${key}" data-v="${v}" aria-pressed="${C[key]===v}">${v}</button>`).join(' ')};
  mk('#stCT',ST_T,'T');mk('#stCN',ST_N,'N');mk('#stCM',ST_M,'M');
  const lad=$('#stLad');let ladP=1,ladStop=null;
  function drawL(){const NL=vb(lad,'720 210','400 230'),st=stStage(C.T,C.N,C.M),ci=ST_LADDER.indexOf(st);
    const G=NL?{x0:14,dx:34,w:29,b:184,h0:16,dh:11.5,ly:200,gy:220}:{x0:34,dx:62,w:52,b:166,h0:18,dh:12.5,ly:184,gy:202};let s='';
    ST_LADDER.forEach((r,i)=>{const x=G.x0+i*G.dx,h=G.h0+i*G.dh,on=i===ci;
      s+=`<rect x="${x}" y="${f1(G.b-h)}" width="${G.w}" height="${f1(h)}" rx="4" style="fill:${on?stCol(r):stSoft(r)};stroke:${stCol(r)};stroke-width:${on?2:1}"/>`;
      s+=`<text x="${f1(x+G.w/2)}" y="${G.ly}" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:700':''}">${r}</text>`});
    [['Stage 0–I',0,1],['Stage II',2,4],['Stage III',5,7],['Stage IV',8,10]].forEach(([n,a,b])=>{const xa=G.x0+a*G.dx,xb=G.x0+b*G.dx+G.w;
      s+=`<line x1="${xa}" x2="${xb}" y1="${G.gy-12}" y2="${G.gy-12}" style="stroke:${stCol(ST_LADDER[a+(a===0?1:0)])};stroke-width:2"/><text x="${f1((xa+xb)/2)}" y="${G.gy}" class="t-xs t-mid">${n}</text>`});
    if(ci>=0){const x=G.x0+ci*G.dx+G.w/2,h=G.h0+ci*G.dh,yy=G.b-h-8-14*(1-ladP);
      s+=`<path d="M${f1(x-7)} ${f1(yy-12)}L${f1(x+7)} ${f1(yy-12)}L${f1(x)} ${f1(yy-1)}Z" style="fill:var(--ink)"/>`;
      const tx=clamp(x,NL?44:60,NL?356:660);s+=`<text x="${f1(tx)}" y="${f1(yy-18)}" class="t-lbl t-mid">Stage ${st}</text>`}
    else s+=`<text x="${NL?200:360}" y="${NL?40:36}" class="t-lbl t-mid">${C.T} ${C.N} ${C.M}: not in the AJCC table</text>`;
    lad.innerHTML=s}
  function calc(anim){const st=stStage(C.T,C.N,C.M);
    $$('[data-stc]').forEach(b=>b.setAttribute('aria-pressed',C[b.dataset.stc]===b.dataset.v));
    const tong=ST_TONG[st];
    const surv=st==null?'':tong!=null?`In one single-centre cohort staged by the 8th edition (1,090 patients), 5-year overall survival for stage ${st} was ${tong}%. One hospital's patients, treated in one era: a population statistic, not a prediction for any one person. [[Tong2018]]`:`In the single-centre 8th-edition cohort, the IVB and IVC groups were too small for a meaningful figure. US 5-year relative survival for distant-stage colorectal cancer is 15% overall (diagnosed 2015–2021), and distant-stage survival has tripled since the 1970s. [[Tong2018,Siegel2026]]`;
    const why=st==null?`The AJCC 8th-edition stage-group table has no row for Tis with positive nodes, so no stage is given.`:
      C.M!=='M0'?`Any M1 makes it stage IV, whatever T and N: ${C.M} gives stage ${st}.`:
      C.N==='N0'?`No nodes and no distant spread, so depth alone decides: ${C.T} N0 is stage ${st}.`:
      `A positive node (or a deposit) with M0 makes it stage III; depth and node count together choose the substage.`;
    const hrisk=st&&st.startsWith('II')&&!st.startsWith('III')?`<div><dt>Stage II</dt><dd>Adjuvant chemotherapy is not routine for stage II colon cancer outside a high-risk subgroup (ASCO 2022); see the checklist below. [[Baxter2022]]</dd></div>`:'';
    const para=(st==='IIB'||st==='IIC'||st==='IIIA')?`<div><dt>Paradox</dt><dd>In SEER, IIIA has done better than IIB and IIC: 3-year cancer-specific survival 91.0% vs 73.1% and 70.3% (2018–2021). [[Yu2024]]</dd></div>`:'';
    $('#stCalcNote').innerHTML=`<div class="kicker">AJCC 8th edition stage group</div><div class="stbig" style="color:${stCol(st)}">${st==null?'—':'Stage '+st}<small>${C.T} ${C.N} ${C.M}</small></div><p>${why} [[Amin2017AJCC,Tong2018]]</p>
      <div class="kv"><div><dt>${C.T}</dt><dd>${ST_TD[C.T]}</dd></div><div><dt>${C.N}</dt><dd>${ST_ND[C.N]}</dd></div><div><dt>${C.M}</dt><dd>${ST_MD[C.M]}</dd></div>${hrisk}${para}${surv?`<div><dt>Survival, population statistic</dt><dd>${surv}</dd></div>`:''}</div>
      <div class="hook"><b>Exam hook</b>Stage III = any N+ with M0. Stage IV = any M1. T4b with any N+ = IIIC; T1 with N2a is still IIIA.</div>`;
    if(anim){if(ladStop)ladStop();ladStop=animate(420,p=>{ladP=ease(p);drawL()})}else{ladP=1;drawL()}}
  $('#m-staging .stcalc').addEventListener('click',e=>{const b=e.target.closest('[data-stc]');if(!b)return;C[b.dataset.stc]=b.dataset.v;calc(true)});
  $('#stCalcReset').addEventListener('click',()=>{C.T='T3';C.N='N1b';C.M='M0';calc(true)});
  $('#stCalcShow').addEventListener('click',()=>{stop();const ti=ST_T.indexOf(C.T);let tt=ti*.1+.075;
    if(C.M!=='M0')tt={M1a:.87,M1b:.92,M1c:.985}[C.M];else if(C.N!=='N0')tt={N1a:.635,N1b:.675,N1c:.715,N2a:.775,N2b:.835}[C.N];
    rg.value=tt;draw(tt);svg.scrollIntoView({behavior:RM?'auto':'smooth',block:'center'})});
  calc(false);

  /* ---- SEER summary stage ---- */
  const SEER={crc:[91,74,15],colon:[91,74,14],rectum:[90,74,18]},TREND=[[82,89],[52,66],[5,8]];
  const seer=$('#stSeer');let which='crc',sp=1,sStop=null;
  function drawS(){const NS=vb(seer,'400 330','400 330'),v=SEER[which];
    const G=NS?{x0:30,dx:124,w:84,b:250,h:190,ly:270,dy:286,dy2:300}:{x0:80,dx:210,w:130,b:236,h:190,ly:258,dy:276,dy2:290};let s='';
    [0,25,50,75,100].forEach(p=>{const y=G.b-G.h*p/100;s+=`<line x1="${G.x0-14}" x2="${G.x0+2*G.dx+G.w+10}" y1="${f1(y)}" y2="${f1(y)}" class="grid"/><text x="${G.x0-18}" y="${f1(y+4)}" class="t-xs t-end">${p}</text>`});
    const nm=['Localized','Regional','Distant'],ds=NS?[['only in','the bowel'],['nearby tissue','or nodes'],['spread','far']]:[['found only in','the bowel'],['reached nearby','tissue or nodes'],['spread to','distant sites']],cc=['var(--good)','var(--lymph)','var(--tumour)'];
    v.forEach((val,i)=>{const x=G.x0+i*G.dx,h=G.h*val/100*sp;
      s+=`<rect x="${x}" y="${f1(G.b-h)}" width="${G.w}" height="${f1(h)}" rx="5" style="fill:${cc[i]};opacity:.85"/><text x="${f1(x+G.w/2)}" y="${f1(G.b-h-8)}" class="t-big t-mid">${Math.round(val*sp)}%</text>`;
      s+=`<text x="${f1(x+G.w/2)}" y="${G.ly}" class="t-lbl t-mid">${nm[i]}</text><text x="${f1(x+G.w/2)}" y="${G.dy}" class="t-xs t-mid">${ds[i][0]}</text><text x="${f1(x+G.w/2)}" y="${G.dy2}" class="t-xs t-mid">${ds[i][1]}</text>`;
      if(which==='crc')TREND[i].forEach((tv,k)=>{const y=G.b-G.h*tv/100;s+=`<line x1="${x-6}" x2="${x+G.w+6}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:var(--ink);stroke-width:1.6;stroke-dasharray:4 3;opacity:${f1(.35+.25*k)}"/>`;
        if(!NS)s+=`<text x="${x+G.w+10}" y="${f1(y+(i===2&&k===0?10:4))}" class="t-xs">${k?'1995–97':'1975–77'}: ${tv}%</text>`})});
    if(NS&&which==='crc')s+=`<text x="${G.x0-14}" y="16" class="t-xs">dashed: 1975–77 and 1995–97</text>`;
    seer.innerHTML=s}
  $$('[data-sts]').forEach(b=>b.addEventListener('click',()=>{which=b.dataset.sts;$$('[data-sts]').forEach(x=>x.setAttribute('aria-pressed',x===b));if(sStop)sStop();sStop=animate(500,p=>{sp=ease(p);drawS()})}));
  drawS();

  /* ---- the paradox ---- */
  const PAR={css:[73.1,70.3,91.0],os:[64.9,63.0,83.1]},par=$('#stPar');let pm='css',pp=1,pStop=null;
  function drawP(){const NP=vb(par,'400 330','400 330'),v=PAR[pm];
    const G=NP?{x0:40,dx:118,w:84,b:262,h:200,ly:284}:{x0:90,dx:200,w:120,b:250,h:190,ly:274};let s='';
    [0,25,50,75,100].forEach(p=>{const y=G.b-G.h*p/100;s+=`<line x1="${G.x0-14}" x2="${G.x0+2*G.dx+G.w+10}" y1="${f1(y)}" y2="${f1(y)}" class="grid"/><text x="${G.x0-18}" y="${f1(y+4)}" class="t-xs t-end">${p}</text>`});
    ['IIB','IIC','IIIA'].forEach((n,i)=>{const x=G.x0+i*G.dx,h=G.h*v[i]/100*pp;
      s+=`<rect x="${x}" y="${f1(G.b-h)}" width="${G.w}" height="${f1(h)}" rx="5" style="fill:${stCol(n)};opacity:.85"/><text x="${f1(x+G.w/2)}" y="${f1(G.b-h-8)}" class="t-big t-mid">${(v[i]*pp).toFixed(1)}%</text><text x="${f1(x+G.w/2)}" y="${G.ly}" class="t-lbl t-mid">Stage ${n}</text>`});
    const ax=G.x0+G.w+8,bx=G.x0+2*G.dx-8,ay=G.b-G.h*v[0]/100-34,by=G.b-G.h*v[2]/100-30;
    s+=`<defs>${marker('stArr','var(--ink)')}</defs><path d="M${ax} ${f1(ay)}Q${f1((ax+bx)/2)} ${f1(Math.min(ay,by)-26)} ${bx} ${f1(by)}" style="fill:none;stroke:var(--ink);stroke-width:1.5;opacity:${f1(pp)}" marker-end="url(#stArr)"/>`;
    s+=`<text x="${f1((ax+bx)/2)}" y="${f1(Math.min(ay,by)-30)}" class="t-xs t-mid" style="fill:var(--ink);opacity:${f1(pp)}">stage III, yet higher</text>`;
    par.innerHTML=s}
  $$('[data-stp]').forEach(b=>b.addEventListener('click',()=>{pm=b.dataset.stp;$$('[data-stp]').forEach(x=>x.setAttribute('aria-pressed',x===b));if(pStop)pStop();pStop=animate(500,p=>{pp=ease(p);drawP()})}));
  drawP();

  /* ---- high-risk stage II checklist (ASCO 2022 wording) ---- */
  const HR=[['t4','T4 tumour (T4a or T4b)'],['ln','Fewer than 12 lymph nodes sampled'],['pni','Perineural invasion'],['lvi','Lymphovascular invasion'],['gr','Poorly differentiated or undifferentiated grade'],['obs','Intestinal obstruction'],['perf','Tumour perforation'],['bd3','Grade BD3 tumour budding'],['dmmr','Tumour is dMMR/MSI (not a risk factor; changes the advice)']];
  $('#stChk').innerHTML=HR.map(([k,n])=>`<label for="stHr_${k}"><input type="checkbox" id="stHr_${k}" data-sthr="${k}"><span>${n}</span></label>`).join('');
  function chk(){const on=HR.filter(([k])=>$('#stHr_'+k).checked).map(([k])=>k),risk=on.filter(k=>k!=='dmmr'),dm=on.includes('dmmr');
    let h;
    if(!risk.length)h=`<p><b>No listed high-risk feature ticked.</b> ASCO 2022: adjuvant chemotherapy is not routine for stage II colon cancer outside a high-risk subgroup.${dm?' ASCO 2022 also says people with dMMR/MSI tumours should not routinely be offered adjuvant chemotherapy; in pooled trial data, stage II dMMR tumours did not benefit from fluorouracil alone.':''} ${dm?'[[Baxter2022,Sargent2010]]':'[[Baxter2022]]'}</p>`;
    else h=`<p><b>${risk.length} high-risk feature${risk.length>1?'s':''} ticked.</b> ${risk.includes('t4')?'ASCO 2022: patients with T4 tumours are at higher risk of recurrence and should be offered adjuvant chemotherapy. ':''}${risk.some(k=>k!=='t4')?'ASCO 2022 lists the other ticked features as high-risk factors that may lead to an offer of adjuvant chemotherapy. ':''}${dm?'With dMMR plus high-risk features, if chemotherapy is offered, ASCO 2022 recommends an oxaliplatin-containing regimen.':''} [[Baxter2022]]</p>`;
    $('#stChkOut').innerHTML=h+`<p class="stage-cap">Guideline statements as published, not advice for any one person. Treatment detail: <button class="stlink" data-go="chemo">chemotherapy after surgery</button>.</p>`}
  $('#stChk').addEventListener('change',chk);chk();

  /* ---- CEA threshold ---- */
  const CEA=[{th:'2.5',se:82,sc:'78–86',sp:80,pc:'59–92',n:7},{th:'5',se:71,sc:'64–76',sp:88,pc:'84–92',n:23},{th:'10',se:68,sc:'53–79',sp:97,pc:'90–99',n:7}];
  const cs=$('#stCeaSvg'),cr=$('#stCea');let cStop=null,cCur={se:71,fa:12};
  function drawC(){const NC=vb(cs,'720 250','400 480'),c=CEA[clamp(Math.round(+cr.value),0,2)];
    const G=NC?[{x:20,y:84,tx:200},{x:20,y:314,tx:200}]:[{x:30,y:78,tx:215},{x:390,y:78,tx:575}],dd=NC?16:16.5;let s='';
    const se=Math.round(cCur.se),fa=Math.round(cCur.fa);
    const grid=(g,n,col,title,sub)=>{s+=`<text x="${g.x}" y="${g.y-30}" class="t-sm">${title}</text><text x="${g.x}" y="${g.y-16}" class="t-xs">${sub}</text>`;
      for(let i=0;i<100;i++){const r=Math.floor(i/10),q=i%10,on=i<n;s+=`<circle cx="${f1(g.x+6+q*dd)}" cy="${f1(g.y+6+r*dd)}" r="5.6" style="fill:${on?col:'var(--panel-2)'};stroke:${on?col:'var(--line)'};stroke-width:1"/>`}};
    grid(G[0],se,'var(--tumour)','100 PEOPLE WHOSE CANCER CAME BACK','filled: CEA above the threshold');
    grid(G[1],fa,'var(--warn)','100 PEOPLE WITHOUT RECURRENCE','filled: false alarm');
    const big=(g,n,a,b,col)=>{s+=`<text x="${g.tx}" y="${g.y+40}" style="font:800 34px var(--display);fill:${col}">${n}</text><text x="${g.tx}" y="${g.y+62}" class="t-lbl">${a}</text><text x="${g.tx}" y="${g.y+80}" class="t-xs">${b}</text>`};
    big(G[0],se,'flagged','sensitivity '+c.se+'% ('+c.sc+')','var(--tumour)');big(G[1],fa,'false alarms','specificity '+c.sp+'% ('+c.pc+')','var(--warn)');
    s+=`<text x="${G[0].tx}" y="${G[0].y+108}" class="t-xs">missed: ${100-se}</text><text x="${G[1].tx}" y="${G[1].y+108}" class="t-xs">correctly reassured: ${100-fa}</text>`;
    s+=`<text x="${NC?20:30}" y="${NC?20:22}" class="t-big">Threshold ${c.th} µg/L</text>`;
    cs.innerHTML=s;
    cr.setAttribute('aria-valuetext',`${c.th} micrograms per litre: sensitivity ${c.se}%, specificity ${c.sp}%`);
    $('#stCeaRead').innerHTML=CEA.map(x=>`<span${x===c?' style="color:var(--ink)"':''}>≥${x.th} µg/L <b>${x.se}% / ${x.sp}%</b> (${x.n} studies)</span>`).join('');
    $('#stCeaNote').innerHTML=noteHTML({k:'Cochrane review · 52 studies',t:`CEA ≥${c.th} µg/L`,
      txt:`Pooled sensitivity ${c.se}% (95% CI ${c.sc}) and specificity ${c.sp}% (${c.pc}) for detecting recurrence after curative treatment. A lower threshold catches more recurrences but raises more false alarms; a higher one does the reverse. Cochrane concluded that CEA is not sensitive enough to use alone, even at a low threshold, and recommended monitoring with more than one modality, using the highest cut-off assessed (10 µg/L). ASCO 2006 set no specific threshold. [[Nicholson2015,Locker2006]]`,
      pt:`A blood marker that rises with some recurrences. Set the alarm low and it catches more but also worries more people needlessly.`,
      hook:`CEA is not a screening test. Recurrence: 2.5 µg/L → 82%/80%; 10 µg/L → 68%/97% (sensitivity/specificity).`})}
  cr.addEventListener('input',()=>{const c=CEA[clamp(Math.round(+cr.value),0,2)],a={...cCur};if(cStop)cStop();cStop=animate(450,p=>{const e=ease(p);cCur={se:lerp(a.se,c.se,e),fa:lerp(a.fa,100-c.sp,e)};drawC()})});
  drawC();
  const prevR=redraws.staging;redraws.staging=()=>{prevR&&prevR();drawL();drawS();drawP();drawC()};
};
