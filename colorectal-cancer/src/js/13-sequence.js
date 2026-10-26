/* =============== 1.3 From polyp to cancer =============== */
const SQ_Y=22;/* schematic years on the scrubber */
const sqT=y=>y/SQ_Y;
const SQ_STEPS={
 conv:[
  {from:0,at:sqT(.9),k:'The first hit · timing not measured',t:'APC: the gatekeeper',
   txt:`The sequence usually starts with a Wnt-pathway hit. APC mutations were found in 63% of adenomas, including ones as small as 0.5 cm, and in 60% of carcinomas: the frequency does not rise from benign to malignant, so the hit comes first. In Vogelstein's summary, an APC mutation gives a microscopic clone that grows into a slow-growing small adenoma. In TCGA, 93% of colorectal cancers had a deregulated Wnt pathway. [[Powell1992,Vogelstein2013,TCGA2012]]`,
   pt:`It usually starts when one cell in the bowel lining loses a gene called APC, which normally keeps cell growth in check.`,
   hook:`APC = gatekeeper: mutated early (63% of adenomas), not more often in cancers (60%). [[Powell1992]]`},
  {from:sqT(1.5),at:sqT(2.3),k:'A small polyp',t:'Small adenoma (under 1 cm)',
   txt:`A small adenoma, under 1 cm. At this stage few carry the later changes: ras mutations in 9% and 18q loss in 11–13% (Vogelstein 1988, 172 tumours). Pooled screening studies found an adenoma in 30.2% of average-risk North Americans. Small polyps do not all grow: of 6–9 mm polyps watched by CT colonography for a mean 4.7 years, 24.9% grew, 62.0% stayed stable and 13.1% shrank, and the growing ones more often had advanced histology (23.2% vs 7.0%). [[Vogelstein1988,Heitman2009,Pooler2023]]`,
   pt:`About 3 in 10 adults of screening age have at least one small, harmless polyp of this kind. Most never become cancer.`,
   hook:`Small polyps (6–9 mm) over about 5 years: a quarter grew, most stayed the same, about 1 in 8 shrank. [[Pooler2023]]`},
  {from:sqT(3),at:sqT(7.5),k:'Second clonal expansion',t:'KRAS: a large adenoma',
   txt:`A second mutation such as KRAS unleashes a second clonal expansion. ras mutations rose from 9% of adenomas under 1 cm to 58% of adenomas over 1 cm (47% of carcinomas). From here the comparative-sequencing clock runs: about 17 years for a large benign tumour to evolve into an advanced cancer. Of polyps of 10 mm or more left in place in the Mayo series, 37% enlarged. [[Vogelstein2013,Vogelstein1988,Jones2008,Stryker1987]]`,
   pt:`A second gene change makes the polyp grow bigger. This usually takes years, which is the window that screening uses.`,
   hook:`KRAS appears as adenomas grow: 9% under 1 cm vs 58% over 1 cm. [[Vogelstein1988]]`},
  {from:sqT(12),at:sqT(14.5),k:'Advanced adenoma',t:'18q/SMAD4 loss: high-grade dysplasia',
   txt:`Loss of chromosome 18q, which carries SMAD4, marks the advanced adenoma: 11–13% of early adenomas, 47% of advanced adenomas and 73% of carcinomas. The cells look increasingly abnormal (high-grade dysplasia). In German screening data, advanced adenomas became cancer at about 2.6% a year at ages 55–59, rising to 5.6% (women) and 5.1% (men) at 80 or over. Advanced adenomas were found in 5.7% of average-risk adults. [[Vogelstein1988,Brenner2007,Heitman2009]]`,
   pt:`The polyp is now large and its cells look more abnormal. Each year, a few of these become cancer, more often in older people.`,
   hook:`Advanced adenoma → cancer: 2.6–5.6% per year (annual rates, not lifetime risks). [[Brenner2007]]`},
  {from:sqT(17),at:sqT(18.6),k:'The line is crossed',t:'TP53/17p: invasive carcinoma',
   txt:`Loss of 17p, with TP53, was found in 75% of carcinomas and usually only in carcinomas. The tumour breaks through the muscularis mucosae into the submucosa and becomes an invasive cancer. Further mutations (PIK3CA, SMAD4, TP53) make a malignant, invasive tumour; a typical one carries 2–8 driver mutations. The accumulation of changes matters more than their exact order. Cancer can be found by screening for a mean of 4.5 to 5.8 years before it causes symptoms. [[Vogelstein1988,Vogelstein2013,Fearon1990,Brenner2011]]`,
   pt:`The growth breaks through the thin muscle under the lining. That is the moment it becomes a cancer.`,
   hook:`Fearon–Vogelstein: APC → KRAS → 18q/SMAD4 → 17p/TP53; the accumulation, not the order, matters most. [[Fearon1990,Vogelstein1988]]`},
  {from:sqT(20),at:sqT(21.4),k:'Under 2 years more',t:'A metastatic clone',
   txt:`Comparative lesion sequencing suggested that cells within an advanced cancer gain the ability to metastasise in under 2 years, with few if any extra selective events. Other modelling suggests seeding is often much earlier (Early evidence), and primary and metastasis differ little genetically. Colorectal cancer spreads most often to the liver: synchronous liver metastases in 14.5–17.7% in registries, about a quarter at any time. Rectal cancers reach the lungs more often (synchronous OR 2.80). [[Jones2008,Hu2019,Manfredi2006,Hackl2014,Mitry2010]]`,
   pt:`Some cancer cells get into the blood and settle in other organs, most often the liver. Cancers low in the rectum reach the lungs more often.`,
   hook:`About 17 years from large adenoma to advanced cancer, but under 2 years to a metastatic clone. [[Jones2008]]`}],
 serr:[
  {from:0,at:sqT(.9),k:'A different first hit',t:'BRAF V600E',
   txt:`The serrated pathway starts differently: RAS or RAF mutations (in most cases BRAF), disrupted Wnt signalling and widespread CpG island methylation. WHO 2019 groups serrated polyps into hyperplastic polyps, traditional serrated adenomas and sessile serrated lesions (SSLs); TSAs and SSLs are cancer precursors. [[Crockett2019]]`,
   pt:`Here the first change is in a different gene, BRAF. The polyp it makes has a saw-tooth edge under the microscope.`,
   hook:`Serrated pathway = BRAF (or KRAS) + CIMP, often ending in MSI through MLH1 methylation. [[Crockett2019,Weisenberger2006]]`},
  {from:sqT(1.5),at:sqT(5),k:'Flat and right-sided',t:'A sessile serrated lesion',
   txt:`Serrated-class polyps are found in 20–40% of average-risk people, mostly hyperplastic. SSLs, the commonest premalignant type, are found in up to 15% by high-detecting endoscopists. They are flat and mostly proximal: 86.5% of SSLs with dysplasia or carcinoma were in the proximal colon (median size 9 mm). Risk factors include white race, a family history of colorectal cancer, smoking and alcohol. [[Crockett2019,Bettington2017]]`,
   pt:`These polyps are flat, pale and often on the right side of the bowel, so they are easier to miss during colonoscopy.`,
   hook:`SSL: proximal, flat, BRAF-mutant, CIMP-positive, and the main precursor of sporadic MSI cancer. [[Bettington2017]]`},
  {from:sqT(6),at:sqT(9),k:'Promoters go silent',t:'CIMP: methylation spreads',
   txt:`The CpG island methylator phenotype (CIMP) silences many gene promoters. CIMP-positive tumours include almost all BRAF-mutant colorectal cancers (odds ratio 203). Of 30 loci studied, 19 became methylated with age in normal colon and 7 only in cancers; the cancer-specific set defined CIMP. In SSLs with dysplasia or cancer, 92.7% were BRAF-mutant and 94.0% CIMP-positive. [[Weisenberger2006,Toyota1999,Bettington2017]]`,
   pt:`Chemical tags pile up on the DNA and switch many genes off, without changing the genetic code itself.`,
   hook:`CIMP and BRAF go together (OR 203). [[Weisenberger2006]]`},
  {from:sqT(14),at:sqT(15),k:'A fast turn · Early evidence',t:'MLH1 silenced: dysplasia',
   txt:`Methylation of the MLH1 promoter silences the MLH1 protein and with it mismatch repair; demethylation restored MLH1 and repair in cell lines. 74.5% of SSLs with dysplasia or carcinoma had lost MLH1. These "caught in the act" lesions are rare and occur at a similar age to SSLs with carcinoma, which suggests a long dwell as a non-dysplastic SSL and then a rapid transition once dysplasia appears (Early evidence). [[Herman1998,Bettington2017]]`,
   pt:`When the polyp switches off a DNA repair gene, mistakes pile up fast and it can turn into cancer quickly.`,
   hook:`Sporadic MSI with BRAF V600E points to MLH1 methylation within CIMP, not Lynch syndrome. [[Weisenberger2006,Herman1998]]`},
  {from:sqT(16),at:sqT(18),k:'Invasion',t:'Serrated carcinoma',
   txt:`The share of colorectal cancers that arise this way is disputed: at least 15% in some estimates, about 35% in another. Cancers from serrated lesions are not prevented by removing conventional adenomas and may be missed in routine screening; post-colonoscopy cancers may arise from serrated polyps even more often. MSI tumours tend to be proximal, with a lymphocytic infiltrate and a mucinous or poorly differentiated look, and a slightly better prognosis. [[IJspeert2015,Snover2011,Boland2010]]`,
   pt:`Some bowel cancers grow from these flat polyps. That is one reason a careful, high-quality colonoscopy matters.`,
   hook:`Serrated share of CRC: ≥15% vs about 35%; estimates are indirect. [[IJspeert2015,Snover2011]]`},
  {from:sqT(19.5),at:sqT(21.4),k:'Spread',t:'BRAF-mutant spread',
   txt:`BRAF-mutant tumours were 11% of metastatic colorectal cancer in a two-centre cohort, linked to right-sided primaries and MSI, and to shorter median survival (10.4 vs 34.7 months). They have a distinct pattern of metastatic spread. Right-sided colon cancer also predicted metachronous peritoneal spread (HR 1.77). [[Tran2011,Segelman2012]]`,
   pt:`Cancers with the BRAF change can be harder to treat once they spread. Doctors test for it to plan treatment.`,
   hook:`BRAF V600E in metastatic CRC: about 11%, right-sided, MSI-linked, median survival 10.4 vs 34.7 months. [[Tran2011]]`}]
};
const SQ_COMBO={
 'conv-cin':`<b>Conventional + CIN.</b> The classic route: most colorectal cancers arise through chromosomal instability, with arm losses such as 18q and 17p. CIN tumours lean to the left colon, as do FAP tumours. [[Pino2010,TCGA2012,Iacopetta2002]]`,
 'conv-msi':`<b>Conventional + MSI.</b> The Lynch-syndrome route: an inherited mismatch-repair fault, about 3% of all colorectal cancers. Lynch tumours occur mainly in the right colon. Hypermutated tumours carried APC (51% vs 81%) and TP53 (20% vs 60%) mutations less often than other tumours. [[Boland2010,Iacopetta2002,TCGA2012]]`,
 'serr-msi':`<b>Serrated + MSI.</b> CIMP silences MLH1 by promoter methylation: the sporadic MSI route, about 12% of all colorectal cancers. [[Boland2010,Weisenberger2006,Herman1998]]`,
 'serr-cin':`<b>Serrated, microsatellite stable.</b> Not every serrated cancer loses mismatch repair: about a quarter of SSLs with dysplasia or carcinoma had kept MLH1 (74.5% had lost it). [[Bettington2017]]`};
const SQ_CAP={conv:'Schematic, not to scale. Years before the large adenoma are not measured; the bars are from different studies (ras, 18q, 17p: Vogelstein 1988, 172 tumours; APC: Powell 1992, 41 tumours). [[Vogelstein1988,Powell1992,Jones2008]]',
 serr:'Schematic, not to scale. No study has followed single serrated lesions over time, so the timeline is drawn, not measured; bars are from 137 SSLs with dysplasia or carcinoma. [[Bettington2017,IJspeert2015]]'};

inits.sequence=()=>{
  const svg=$('#sqSvg'),rg=$('#sqT');let pw='conv',inst='cin',setSt=()=>{};
  const lab=(x,y,t,c='t-sm',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}" ${st?`style="${st}"`:''}>${t}</text>`;
  /* stage of the lesion for the kit's polyp(): size (base width) and stage 0..1 */
  function lesion(y){
    if(pw==='conv'){
      if(y<1.5)return{s:0,k:0,name:'Aberrant crypt',col:'var(--polyp-line)'};
      if(y<3)return{s:lerp(18,30,ramp(y,1.5,3)),k:0,name:'Small adenoma (<1 cm)',col:'var(--polyp-line)'};
      if(y<12)return{s:lerp(30,62,ramp(y,3,12)),k:.5*ramp(y,3,12),name:'Large adenoma (>1 cm)',col:'var(--polyp-line)'};
      if(y<17)return{s:lerp(62,78,ramp(y,12,17)),k:lerp(.55,.82,ramp(y,12,17)),name:'Advanced adenoma, high-grade dysplasia',col:'var(--dysplasia)'};
      return{s:lerp(78,92,ramp(y,17,21)),k:lerp(.87,1,ramp(y,17,19.5)),name:y<20?'Invasive carcinoma':'Carcinoma with a metastatic clone',col:'var(--tumour)'}}
    if(y<1.5)return{s:0,k:0,name:'BRAF-mutant crypt',col:'var(--polyp-line)'};
    if(y<14)return{s:lerp(32,80,ramp(y,1.5,14)),k:0,name:'Sessile serrated lesion',col:'var(--polyp-line)'};
    if(y<16)return{s:lerp(80,84,ramp(y,14,16)),k:lerp(.6,.82,ramp(y,14,16)),name:'SSL with dysplasia',col:'var(--dysplasia)'};
    return{s:lerp(84,96,ramp(y,16,21)),k:lerp(.87,1,ramp(y,16,18.5)),name:y<19.5?'Invasive carcinoma':'Carcinoma, spreading',col:'var(--tumour)'}}
  const GENES={conv:[{n:'APC',y:.5},{n:'KRAS',y:3},{n:'18q/SMAD4',y:12},{n:'17p/TP53',y:17}],
    serr:[{n:'BRAF V600E',y:.4},{n:'Proximal',y:1.5},{n:'CIMP',y:6},{n:'MLH1 meth.',y:14}]};
  /* Vogelstein 1988 (ras, 18q, 17p) and Powell 1992 (APC): % of tumours, by stage */
  const BARS_C=[{n:'APC',v:[63,63,60],l:['63','63','60']},{n:'ras',v:[9,58,47]},{n:'18q',v:[12,47,73],l:['11–13','47','73']},{n:'17p',v:[0,0,75],l:['–','–','75']}];
  const BARS_S=[{n:'BRAF',v:92.7,y:.4},{n:'Proximal',v:86.5,y:1.5},{n:'CIMP+',v:94.0,y:6},{n:'MLH1 lost',v:74.5,y:14}];
  function right(y,PW,N_){let g='';const G=GENES[pw],bw=(PW-3*6)/4;
    /* gene badges */
    G.forEach((b,i)=>{let on=y>=b.y;let txt=b.n;if(pw==='serr'&&i===3&&inst==='cin'){txt='MLH1 kept';on=on}
      const x=i*(bw+6),c=pw==='serr'&&i===3&&inst==='cin'?'var(--muted)':i===3||pw==='serr'&&i===0?'var(--tumour)':'var(--polyp-line)';
      g+=`<rect x="${f1(x)}" y="0" width="${f1(bw)}" height="26" rx="13" style="fill:${on?c:'none'};stroke:${on?c:'var(--line)'};stroke-width:1.4;opacity:${on?1:.9}"/>`;
      g+=`<text x="${f1(x+bw/2)}" y="16.5" class="t-xs t-mid" style="fill:${on?'var(--panel)':'var(--muted)'};font-weight:600;font-size:${N_?11:10}px">${txt}</text>`});
    const bx=62,bl=PW-bx-44;
    if(pw==='conv'){
      const col=y<3?0:y<17?1:2;
      g+=lab(0,48,'% OF TUMOURS WITH THE CHANGE, BY STAGE','t-xs');
      ['<1 cm','>1 cm','cancer'].forEach((h,j)=>{g+=`<rect x="${f1(bx+j*76)}" y="56" width="10" height="10" rx="2" style="fill:var(--tumour);opacity:${[.35,.65,1][j]}"/>`+lab(bx+j*76+14,65,h,'t-xs',j===col?'fill:var(--ink);font-weight:700':'')});
      BARS_C.forEach((B,i)=>{const yy=76+i*38;g+=lab(0,yy+19,B.n,'t-lbl');
        B.v.forEach((v,j)=>{const by=yy+j*12,shown=j<=col,w=bl*v/100*(j<col?1:j===col?ramp(y,[0,3,17][j],[0,3,17][j]+1.2):0);
          g+=`<rect x="${bx}" y="${by}" width="${f1(bl)}" height="9" rx="3" style="fill:var(--panel-2)"/>`;
          if(shown&&v>0)g+=`<rect x="${bx}" y="${by}" width="${f1(w)}" height="9" rx="3" style="fill:var(--tumour);opacity:${[.35,.65,1][j]}"/>`;
          if(shown)g+=lab(bx+bl+5,by+8.5,(B.l?B.l[j]:v)+(v>0?'%':''),'t-xs',j===col?'fill:var(--ink)':'')})});
    }else{
      g+=lab(0,48,'% OF 137 SSLs WITH DYSPLASIA OR CANCER','t-xs');
      BARS_S.forEach((B,i)=>{const yy=66+i*36,on=y>=B.y,w=bl*B.v/100*ramp(y,B.y,B.y+1.2);
        g+=lab(0,yy+13,B.n,'t-lbl');g+=`<rect x="${bx}" y="${yy+2}" width="${f1(bl)}" height="14" rx="4" style="fill:var(--panel-2)"/>`;
        if(on)g+=`<rect x="${bx}" y="${yy+2}" width="${f1(w)}" height="14" rx="4" style="fill:${i===3&&inst==='cin'?'var(--muted)':'var(--tumour)'}"/>`+lab(bx+bl+5,yy+13,B.v+'%','t-xs','fill:var(--ink)')});
      if(inst==='cin'&&y>=14)g+=lab(0,214,'This tumour kept MLH1: about 1 in 4 do','t-xs','fill:var(--ink)');
    }
    /* genome panel */
    const gy=230;g+=`<line x1="0" x2="${PW}" y1="${gy-8}" y2="${gy-8}" class="axis"/>`;
    g+=lab(0,gy+8,inst==='cin'?'CHROMOSOMES (CIN)':'NEAR-DIPLOID (MSI)','t-xs');
    const ch=(x,yb,h,o={})=>{const w=7,cp=yb+h*.4;let s=`<rect x="${f1(x)}" y="${f1(yb)}" width="${w}" height="${f1(h*.4-1.5)}" rx="3.5" style="fill:${o.c||'var(--lymph)'};opacity:${o.lp?.2:.85}${o.lp?';stroke:var(--lymph);stroke-dasharray:2 2':''}"/>`;
      s+=`<rect x="${f1(x)}" y="${f1(cp+1.5)}" width="${w}" height="${f1(h*.6-1.5)}" rx="3.5" style="fill:${o.c||'var(--lymph)'};opacity:${o.lq?.2:.85}"/>`;return s};
    const cin=inst==='cin',L18=cin&&(pw==='conv'?y>=12:y>=16),L17=cin&&(pw==='conv'?y>=17:y>=17.5),GAIN=cin&&y>=(pw==='conv'?15:17);
    const cy0=gy+16,H=40;
    [['17',0],['18',1],['',2],['',3]].forEach(([n,i])=>{const x=8+i*34;
      g+=ch(x,cy0,H,{lp:n==='17'&&L17,lq:n==='18'&&L18});g+=ch(x+10,cy0,H);
      if(n==='' &&i===2&&GAIN)g+=ch(x+20,cy0,H,{c:'var(--gold)'});
      g+=lab(x+8,cy0+H+12,n||'·','t-xs t-mid')});
    const lost=[L18?'18q':'',L17?'17p':''].filter(Boolean);
    g+=lab(0,cy0+H+26,lost.length?lost.join(' + ')+' lost':cin?'no arm losses yet':'chromosomes intact','t-xs',lost.length?'fill:var(--tumour)':'');
    if(GAIN)g+=lab(0,cy0+H+38,'+1 whole chromosome','t-xs','fill:var(--gold)');
    /* mutation dots: each dot about 20 mutations; mean 73 (pMMR) vs 1,782 (dMMR) */
    const tgt=cin?73:1782,k=ramp(y,0,pw==='conv'?18:16),m=Math.round(!cin&&pw==='serr'?(y<14?73*ramp(y,0,14):lerp(73,1782,ramp(y,14,17))):tgt*k),nd=Math.round(m/20);
    const dx=146,cols=Math.floor((PW-dx)/7.5);
    for(let i=0;i<nd;i++)g+=`<circle cx="${f1(dx+3+(i%cols)*7.5)}" cy="${f1(cy0+2+Math.floor(i/cols)*7.5)}" r="2.6" style="fill:${cin?'var(--muted)':'var(--accent)'}"/>`;
    g+=lab(dx,cy0+H+26,`${m.toLocaleString('en-GB')} mutations`,'t-xs','fill:var(--ink)');
    g+=lab(dx,cy0+H+38,'mean pMMR 73 · dMMR 1,782','t-xs');g+=lab(dx,cy0+H+50,'1 dot ≈ 20 mutations','t-xs');
    return g}
  function timeline(y,x0,x1,ty,N){let g='';const X=v=>lerp(x0,x1,v/SQ_Y);
    g+=`<line x1="${x0}" x2="${x1}" y1="${ty}" y2="${ty}" class="axis"/>`;
    for(let v=0;v<=SQ_Y;v+=2)g+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${ty-3}" y2="${ty+3}" class="axis"/>`+lab(X(v),ty+15,v,'t-xs t-mid');
    const br=(a,b,yy,t,c,up=1,an)=>`<path d="M${f1(X(a))} ${yy+4*up}V${yy}H${f1(X(b))}V${yy+4*up}" style="fill:none;stroke:${c};stroke-width:1.6"/>`+lab(an?X(b):(X(a)+X(b))/2,yy-4*up+(up<0?10:0),t,an?'t-xs t-end':'t-xs t-mid',`fill:${c}`);
    if(pw==='conv'){
      g+=`<rect x="${f1(X(0))}" y="${ty-6}" width="${f1(X(3)-X(0))}" height="12" style="fill:var(--line);opacity:.5"/>`;
      g+=br(0,3,ty-14,N?'?':'not measured','var(--muted)');
      g+=br(3,20,ty-14,N?'~17 years to advanced cancer':'~17 years: large adenoma → advanced cancer','var(--polyp-line)');
      g+=br(20,22,ty-14,'<2 y','var(--tumour)');
      g+=br(17,22,ty+24,'screen-detectable before symptoms: mean 4.5–5.8 y','var(--accent)',-1,1);
    }else{
      g+=br(1.5,14,ty-14,N?'long dwell (not measured)':'long dwell as an SSL (not measured)','var(--polyp-line)');
      g+=br(14,17,ty-14,'rapid','var(--tumour)');
      g+=br(17,22,ty+24,'screen-detectable before symptoms: mean 4.5–5.8 y','var(--accent)',-1,1);
    }
    g+=`<circle cx="${f1(X(y))}" cy="${ty}" r="6" style="fill:var(--tumour);stroke:var(--panel);stroke-width:2"/>`;
    return g}
  function draw(t){
    const N=vb(svg,'720 460','400 840'),y=t*SQ_Y,L=lesion(y);
    const x0=N?10:14,W1=N?380:390,wy=150,cx=x0+W1*.48;
    let s=`<defs>${marker('sqArr','var(--tumour)')}</defs>`;
    s+=lab(x0,24,L.name,'t-big',`fill:${L.col}`);
    s+=lab(x0,42,`Year ${y.toFixed(1)} of a schematic ${SQ_Y}`,'t-sm');
    s+=`<rect x="${x0}" y="52" width="${W1}" height="${wy-52}" rx="10" style="fill:var(--field)"/>`+lab(x0+8,66,'LUMEN','t-xs');
    const w=wall(x0,wy,W1,{h:200,labels:false});s+=w.svg;
    const Y=w.y;
    /* layer names on the left edge */
    [['Mucosa',Y.mucosa,Y.submucosa],['Submucosa',Y.submucosa,Y.muscularis],['Muscularis propria',Y.muscularis,Y.subserosa],['Subserosa',Y.subserosa,Y.serosa]].forEach(([n,a,b])=>{s+=lab(x0+6,(a+b)/2+3.5,n,'t-xs','fill:var(--ink);opacity:.8')});
    /* muscularis mucosae: a thin line under the mucosa, broken by invasion */
    const inv=L.k>.86?ramp(L.k,.86,1):0,gap=L.s*.42*inv;
    const mmY=Y.submucosa-1.5;
    s+=`<path d="M${x0} ${mmY}H${f1(cx-gap)}M${f1(cx+gap)} ${mmY}H${x0+W1}" style="stroke:var(--muscle);stroke-width:2.6"/>`;
    s+=lab(x0+W1-6,mmY-4,'muscularis mucosae','t-xs t-end','fill:var(--ink)');
    /* the lesion */
    if(L.s===0){const k=ramp(y,0,1.5);s+=`<rect x="${f1(cx-5)}" y="${f1(Y.mucosa)}" width="10" height="${f1((Y.submucosa-Y.mucosa)*.85)}" rx="4" style="fill:var(--polyp);opacity:${f1(.3+.7*k)}"/>`;
      s+=`<ellipse cx="${f1(cx)}" cy="${Y.mucosa}" rx="${f1(6+6*k)}" ry="${f1(3+3*k)}" style="fill:var(--polyp);stroke:var(--polyp-line)"/>`;
      s+=`<path d="M${f1(cx+40)} ${Y.mucosa-34}L${f1(cx+10)} ${Y.mucosa-8}" style="stroke:var(--muted);stroke-width:1.2"/>`+lab(cx+44,Y.mucosa-36,pw==='conv'?'one crypt, APC lost':'one crypt, BRAF mutant','t-xs','fill:var(--ink)')}
    else{
      /* deeper invasion strands, drawn below the kit's own */
      if(inv>0){const rr=rng(9),dep=lerp(Y.submucosa+6,y>=19.5?Y.subserosa-4:Y.muscularis+10,ramp(y,pw==='conv'?17:16,21));
        const hw=L.s*.42;let d=`M${f1(cx-hw)} ${f1(Y.mucosa)}`;const M=9;
        for(let i=0;i<=M;i++){const u=i/M,xx=cx-hw*1.15+hw*2.3*u,bulge=Math.sin(Math.PI*u),yy=lerp(Y.mucosa+8,dep,bulge)+(i%2?-8:6)*bulge*rr();d+=`L${f1(xx)} ${f1(yy)}`}
        d+=`L${f1(cx+hw)} ${f1(Y.mucosa)}Z`;s+=`<path d="${d}" style="fill:var(--tumour);opacity:.85;stroke:var(--tumour);stroke-width:1.5;stroke-linejoin:round"/>`;
        for(let i=0;i<5;i++){const xx=cx+(rr()-.5)*hw*2.4,yy=lerp(Y.mucosa+14,dep+6,rr());s+=`<circle cx="${f1(xx)}" cy="${f1(yy)}" r="${f1(2+rr()*2)}" style="fill:var(--tumour)"/>`}}
      {const sq=pw==='serr'&&L.k<.85?.6:.72;s+=`<g transform="translate(0 ${f1(Y.mucosa*(1-sq))}) scale(1 ${sq})">${polyp(cx,Y.mucosa,L.s,L.k,{serrated:pw==='serr',seed:pw==='conv'?5:8})}</g>`}}
    /* a vessel in the submucosa, and spread to the liver */
    const vx=x0+W1*.82,vy=(Y.submucosa+Y.muscularis)/2;
    s+=`<ellipse cx="${f1(vx)}" cy="${f1(vy)}" rx="16" ry="9" style="fill:var(--vessel-soft);stroke:var(--vessel);stroke-width:1.4"/>`+lab(vx,vy+22,'vein','t-xs t-mid');
    const met=pw==='conv'?20:19.5;
    if(y>=met){const k=ramp(y,met,SQ_Y);for(let i=0;i<4;i++){const ph=(k*3+i/4)%1,px=lerp(cx+L.s*.25,vx,Math.min(1,ph*1.4)),py=lerp(Y.submucosa+8,vy,Math.min(1,ph*1.4));
        s+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="3.4" style="fill:var(--tumour);opacity:${f1(ph<.7?1:1-(ph-.7)/.3)}"/>`}
      const lx=x0+W1-62,ly=96;s+=`<rect x="${lx-52}" y="58" width="108" height="78" rx="10" style="fill:var(--panel);stroke:var(--line)"/>`+liver(lx,ly+6,.62,Math.round(1+k*4),4)+lab(lx,72,'Liver (portal blood)','t-xs t-mid','fill:var(--ink)');
      s+=`<path d="M${f1(vx)} ${f1(vy-12)}C${f1(vx)} ${f1(Y.mucosa-20)} ${f1(lx-30)} 150 ${f1(lx-30)} 138" style="fill:none;stroke:var(--tumour);stroke-width:1.6;stroke-dasharray:4 3" marker-end="url(#sqArr)"/>`}
    /* right panel */
    const RP=N?{x:10,y:378,w:380}:{x:428,y:24,w:280};
    s+=`<g transform="translate(${RP.x} ${RP.y})">${right(y,RP.w,N)}</g>`;
    s+=timeline(y,N?24:30,N?376:700,N?790:404,N);
    svg.innerHTML=s;
    const ST=SQ_STEPS[pw],ph=phaseOf(ST,t);setSt(ph);$('#sqNote').innerHTML=noteHTML(ST[ph]);
    const lit=GENES[pw].filter(b=>y>=b.y).map(b=>b.n.split(' ')[0]).join(' → ')||'none yet';
    $('#sqRead').innerHTML=`<span>Year <b>${y.toFixed(1)}</b></span><span>Stage <b>${L.name}</b></span><span>Changes <b>${lit}</b></span>`;
  }
  const stop=playWire(rg,$('#sqPlay'),draw,24000,'%t:player.replay%','sequence');
  function wire(){const old=$('#sqSteps'),nu=old.cloneNode(false);old.replaceWith(nu);setSt=stepWire(nu,SQ_STEPS[pw],rg,draw,stop)}
  function meta(){$('#sqCombo').innerHTML=SQ_COMBO[pw+'-'+inst];$('#sqCap').innerHTML=SQ_CAP[pw]}
  $$('[data-sqpw]').forEach(b=>b.addEventListener('click',()=>{stop();pw=b.dataset.sqpw;$$('[data-sqpw]').forEach(x=>x.setAttribute('aria-pressed',x===b));
    inst=pw==='serr'?'msi':'cin';$$('[data-sqin]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.sqin===inst));meta();wire();draw(+rg.value)}));
  $$('[data-sqin]').forEach(b=>b.addEventListener('click',()=>{stop();inst=b.dataset.sqin;$$('[data-sqin]').forEach(x=>x.setAttribute('aria-pressed',x===b));meta();draw(+rg.value)}));
  meta();wire();draw(+rg.value);

  /* ---------- progression risk ---------- */
  const rs=$('#sqRisk'),rr=$('#sqRiskT');let age='55',sex='w';
  const STRY=[[0,0],[5,2.5],[10,8],[20,24]];
  const BREN={w:{'55':[2.6,25.4],'80':[5.6,42.9]},m:{'55':[2.6,25.2],'80':[5.1,39.7]}};
  const interp=(P,x)=>{for(let i=1;i<P.length;i++)if(x<=P[i][0]){const a=P[i-1],b=P[i];return a[1]+(b[1]-a[1])*(x-a[0])/(b[0]-a[0])}return P[P.length-1][1]};
  function drawR(t){const N=vb(rs,'720 330','400 420'),Yr=t*20;
    const px0=N?44:60,px1=N?380:690,py0=N?30:24,py1=N?340:270,X=v=>lerp(px0,px1,v/20),Yv=v=>lerp(py1,py0,v/60);
    let s='';
    for(let v=0;v<=60;v+=10)s+=`<line x1="${px0}" x2="${px1}" y1="${f1(Yv(v))}" y2="${f1(Yv(v))}" class="grid"/>`+lab(px0-8,Yv(v)+4,v+'%','t-xs t-end');
    for(let v=0;v<=20;v+=5)s+=lab(X(v),py1+16,v+' y','t-xs t-mid');
    s+=`<line x1="${px0}" x2="${px1}" y1="${py1}" y2="${py1}" class="axis"/>`;
    s+=lab(px0,py1+(N?36:40),'Years after the polyp was found','t-sm');
    /* Stryker: up to the current year */
    let d='';for(let k=0;k<=80;k++){const v=Yr*k/80;d+=(k?'L':'M')+f1(X(v))+' '+f1(Yv(interp(STRY,v)))}
    s+=`<path d="${d}" style="fill:none;stroke:var(--tumour);stroke-width:3;stroke-linejoin:round"/>`;
    STRY.slice(1).forEach(([a,b])=>{if(Yr>=a)s+=`<circle cx="${f1(X(a))}" cy="${f1(Yv(b))}" r="5.5" style="fill:var(--panel);stroke:var(--tumour);stroke-width:2.4"/>`+lab(X(a)-(a===20?8:0),Yv(b)-12,b+'%',a===20?'t-sm t-end':'t-sm t-mid','fill:var(--tumour);font-weight:700')});
    /* Brenner: projected 10-year risk */
    const B=BREN[sex][age],bk=clamp(Yr/10);
    s+=`<path d="M${X(0)} ${Yv(0)}L${f1(X(10*bk))} ${f1(Yv(B[1]*bk))}" style="stroke:var(--accent);stroke-width:2.4;stroke-dasharray:6 4"/>`;
    if(Yr>=10)s+=`<circle cx="${f1(X(10))}" cy="${f1(Yv(B[1]))}" r="5.5" style="fill:var(--panel);stroke:var(--accent);stroke-width:2.4"/>`+lab(X(10)+10,Yv(B[1])-6,B[1]+'% at 10 y','t-sm','fill:var(--accent);font-weight:700');
    /* legend */
    const lgx=px0+12,lgy=py0+10;
    s+=`<line x1="${lgx}" x2="${lgx+24}" y1="${lgy}" y2="${lgy}" style="stroke:var(--tumour);stroke-width:3"/>`+lab(lgx+30,lgy+4,'Untreated polyps ≥10 mm (Mayo, 1987)','t-sm','fill:var(--ink)');
    s+=`<line x1="${lgx}" x2="${lgx+24}" y1="${lgy+18}" y2="${lgy+18}" style="stroke:var(--accent);stroke-width:2.4;stroke-dasharray:6 4"/>`+lab(lgx+30,lgy+22,`Advanced adenoma, ${sex==='w'?'women':'men'} ${age} (Germany, 2007)`,'t-sm','fill:var(--ink)');
    s+=`<line x1="${f1(X(Yr))}" x2="${f1(X(Yr))}" y1="${py0+34}" y2="${py1}" style="stroke:var(--muted);stroke-width:1;stroke-dasharray:2 3"/>`;
    rs.innerHTML=s;
    const st=interp(STRY,Yr);
    $('#sqRiskNote').innerHTML=noteHTML({k:`Year ${Yr.toFixed(1)}`,t:`${f1(st)}% by year ${Math.round(Yr)} (polyps ≥10 mm)`,
      txt:`In the Mayo series (226 people, barium-enema era), the cumulative risk of cancer at the polyp site was 2.5% at 5 years, 8% at 10 years and 24% at 20 years; invasive cancers appeared at a mean of 108 months. Values between the circles are drawn straight. In German screening data, an advanced adenoma at age ${age==='55'?'55–59':'80 or over'} became cancer at about ${B[0]}% a year in ${sex==='w'?'women':'men'}, a projected ${B[1]}% over 10 years at age ${age}. These are annual transition rates and projections, not lifetime risks. [[Stryker1987,Brenner2007]]`,
      pt:`Most large polyps do not turn into cancer quickly, but the risk builds up over the years. Removing them takes that risk away.`,
      hook:`Untreated polyps ≥10 mm: 2.5% / 8% / 24% cancer at 5 / 10 / 20 years (Stryker 1987).`})}
  playWire(rr,$('#sqRiskPlay'),drawR,9000,'%t:player.replay%','sequence');
  $$('[data-sqage]').forEach(b=>b.addEventListener('click',()=>{age=b.dataset.sqage;$$('[data-sqage]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawR(+rr.value)}));
  $$('[data-sqsex]').forEach(b=>b.addEventListener('click',()=>{sex=b.dataset.sqsex;$$('[data-sqsex]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawR(+rr.value)}));
  drawR(+rr.value);

  /* ---------- prevalence: 1,000 dots ---------- */
  const ps=$('#sqPrev');let grp='any';
  const ORDER=(()=>{const a=[...Array(1000).keys()],r=rng(77);for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a})();
  const RANK=new Array(1000);ORDER.forEach((v,i)=>RANK[v]=i);
  const PREV={any:[302,'var(--polyp)','any adenoma, 30.2%'],adv:[57,'var(--dysplasia)','an advanced adenoma, 5.7%'],ca:[3,'var(--tumour)','colorectal cancer, 0.3%']};
  function drawP(){const N=vb(ps,'720 300','400 642'),cols=N?25:50,sp=N?14.6:13.8,r=N?5:4.8,ox=N?(400-cols*sp)/2+sp/2:(720-cols*sp)/2+sp/2,oy=N?20:18;
    const [n,c,l]=PREV[grp];let s='';
    for(let i=0;i<1000;i++){const x=ox+(i%cols)*sp,y=oy+Math.floor(i/cols)*sp,on=RANK[i]<n;
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${on&&grp==='ca'?r+1.5:r}" style="fill:${on?c:'var(--panel-2)'};${on?'':'stroke:var(--line);stroke-width:.8'}"/>`}
    if(N){s+=lab(200,616,`${n} of 1,000 average-risk adults screened`,'t-sm t-mid','fill:var(--ink)')+lab(200,632,`had ${l}`,'t-sm t-mid','fill:var(--ink)')}else s+=lab(360,294,`${n} of 1,000 average-risk adults screened had ${l}`,'t-sm t-mid','fill:var(--ink)');
    ps.innerHTML=s;
    $('#sqPrevCap').innerHTML=`Pooled prevalence: any adenoma 30.2%, non-advanced adenoma 17.7%, advanced adenoma 5.7%, cancer 0.3%; higher in cohorts with a mean age of 65 or more. [[Heitman2009]]`}
  $$('[data-sqprev]').forEach(b=>b.addEventListener('click',()=>{grp=b.dataset.sqprev;$$('[data-sqprev]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawP()}));
  drawP();
  const pr=redraws.sequence;redraws.sequence=()=>{pr&&pr();drawP()};
};
