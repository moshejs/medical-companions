/* =============== 6.1 History & people =============== */
const HI_Y0=1905,HI_Y1=2026,hiT=y=>(y-HI_Y0)/(HI_Y1-HI_Y0);
/* lanes: s surgery & pathology, g heredity & genes, c screening & endoscopy, d drugs, r guidelines */
const HI_LANE={s:['Surgery & pathology','var(--tumour)'],g:['Heredity & genes','var(--lymph)'],c:['Screening & endoscopy','var(--accent)'],d:['Drugs','var(--rx)'],r:['Guidelines','var(--gold)']};
const HI_EV=[
 {y:1908,l:'s',t:'Miles: abdominoperineal excision',txt:`W. Ernest Miles described abdominoperineal excision for carcinoma of the rectum and the terminal pelvic colon in The Lancet. A historical review dates his first radical operation to 1907; abdominoperineal resection became a gold standard for many years. [[Miles1908,Lirici2016]]`},
 {y:1913,l:'g',t:'Warthin: Family G',txt:`Aldred Scott Warthin published "Heredity with reference to carcinoma", describing his "Family G" from cases seen since 1895, when the seamstress Pauline Gross told him her family history. Family G is now recognised as the first reported Lynch syndrome family; by 2005 it had 929 known descendants and a confirmed MSH2 splice-site mutation. [[Warthin1913,Campos2024,Douglas2005]]`},
 {y:1925,l:'g',t:'Lockhart-Mummery: Cancer and heredity',txt:`P. Lockhart-Mummery published "Cancer and heredity" in The Lancet. [[LockhartMummery1925]]`},
 {y:1932,l:'s',t:'Dukes classification',txt:`Cuthbert Dukes published his classification of cancer of the rectum, the basis of "Dukes stage". It was still used in later surgical series: Heald's 1986 total mesorectal excision results reported tumour-free survival by Dukes A, B and C. The picture above shows the stages as they are usually summarised (growth within the wall, through the wall, and to lymph nodes); the original paper was not read for this guide. [[Dukes1932,Heald1986]]`},
 {y:1939,l:'g',t:'Familial adenomatosis',txt:`Lockhart-Mummery and Dukes reported on familial adenomatosis of the colon and rectum, the condition now called familial adenomatous polyposis (FAP). [[LockhartMummery1939,Nishisho1991]]`},
 {y:1951,l:'g',t:'Gardner: polyposis',txt:`Eldon Gardner published a genetic and clinical study of intestinal polyposis as a predisposing factor for carcinoma of the colon and rectum. In 1953, Gardner and Richards described skin and soft-tissue lesions together with hereditary polyposis and osteomatosis, later known as Gardner syndrome. [[Gardner1951,Gardner1953,Nishisho1991]]`},
 {y:1957,l:'d',t:'5-fluorouracil',txt:`Heidelberger and colleagues reported the fluorinated pyrimidines, including 5-fluorouracil, as a new class of tumour-inhibitory compounds. Fluorouracil remains the backbone of colorectal chemotherapy: see <a href="#chemo" data-go="chemo">Chemotherapy after surgery</a>. [[Heidelberger1957]]`},
 {y:1966,l:'g',t:'Lynch: two kindreds',txt:`Henry Lynch and colleagues described two large Midwestern kindreds with hereditary cancer. The condition first called "cancer family syndrome" was later renamed Lynch syndrome in recognition of his work. [[Lynch1966,Campos2024]]`},
 {y:1967,l:'c',t:'Greegor: occult blood',txt:`Greegor published "Diagnosis of large-bowel cancer in the asymptomatic patient", an early report on finding colorectal cancer before symptoms appear. [[Greegor1967]]`},
 {y:1973,l:'c',t:'Colonoscopic polypectomy',txt:`Wolff and Shinya reported polypectomy through the fibreoptic colonoscope, removing neoplasms beyond the reach of the sigmoidoscope. [[Wolff1973NEJM,Wolff1973AnnSurg]]`},
 {y:1975,l:'s',t:'Polyp-to-cancer sequence',txt:`Muto, Bussey and Morson presented evidence that most colorectal cancers evolve through a polyp-to-cancer sequence. Malignant potential rises with adenoma size, villous histology and degree of atypia, but most adenomas never become cancer. [[Muto1975]]`},
 {y:1982,l:'s',t:'Heald: total mesorectal excision',txt:`Heald, Husband and Ryall found tumour foci in the mesorectum several centimetres beyond the visible tumour edge and proposed total excision of the mesorectum (TME). In 50 curative resections followed for over 2 years there was no pelvic or staple-line recurrence. In 1986 Heald reported 5-year survival of 87%, tumour-free survival of 94%, 87% and 58% for Dukes A, B and C, and permanent colostomy in 11%. TME is now the gold standard for rectal cancer surgery. [[Heald1982,Heald1986,Lirici2016]]`},
 {y:1984,l:'g',t:'Boland & Troncale',txt:`Boland and Troncale described "familial colonic cancer without antecedent polyposis", the pattern later called hereditary non-polyposis colorectal cancer (HNPCC). [[Boland1984,Fishel1993]]`},
 {y:1988,l:'g',t:'Vogelstein: genes accumulate',txt:`Vogelstein and colleagues showed four genetic alterations accumulating along with clinical tumour progression in 172 tumours: ras mutations in 9% of adenomas under 1 cm vs 58% over 1 cm, chromosome 18q loss in 47% of advanced adenomas and 73% of carcinomas, and 17p (TP53) loss in 75% of carcinomas. [[Vogelstein1988]]`},
 {y:1990,l:'g',t:'Fearon–Vogelstein model',txt:`Fearon and Vogelstein proposed their genetic model of multistep colorectal tumorigenesis: activation of oncogenes plus inactivation of several tumour-suppressor genes, where the accumulation of changes matters more than their exact order <span class="ev est">Established</span>. The model is animated in <a href="#sequence" data-go="sequence">From polyp to cancer</a>. [[Fearon1990]]`},
 {y:1990.4,l:'d',t:'Adjuvant 5-FU + levamisole',txt:`Adjuvant fluorouracil plus levamisole for resected stage C (node-positive) colon cancer cut recurrence by 41% and overall deaths by 33%; the authors concluded it should be standard treatment for stage C colon cancer. [[Moertel1990]]`},
 {y:1991,l:'g',t:'APC gene identified',txt:`The APC gene on chromosome 5q21 was identified, and germline APC mutations were shown to cause both FAP and Gardner syndrome. APC mutations occur early: in 63% of adenomas and 60% of carcinomas, including adenomas as small as 0.5 cm. [[Kinzler1991,Groden1991,Nishisho1991,Powell1992]]`},
 {y:1992,l:'d',t:'Leucovorin + 5-FU',txt:`A meta-analysis of nine trials showed that leucovorin doubled the tumour response to fluorouracil in advanced colorectal cancer (23% vs 11%), with no detectable difference in overall survival. [[ACCMAP1992]]`},
 {y:1993,l:'g',t:'MSH2 and microsatellite instability',txt:`A predisposition locus was mapped to chromosome 2, familial tumours showed widespread microsatellite alterations (also in 13% of sporadic cancers), and MSH2 was identified as the first HNPCC mismatch-repair gene. MLH1 followed in 1994. Separately, about 12% of colorectal carcinomas carried a "mutator" signature, and microsatellite instability went with proximal location and longer survival. [[Peltomaki1993,Aaltonen1993,Fishel1993,Leach1993,Bronner1994,Ionov1993,Thibodeau1993]]`},
 {y:1993.4,l:'c',t:'Minnesota trial & National Polyp Study',txt:`In the Minnesota trial (46,551 people aged 50–80), annual guaiac faecal occult blood testing with rehydration cut 13-year colorectal cancer mortality by 33% (5.88 vs 8.83 per 1,000). In the National Polyp Study, colorectal cancer incidence after adenoma removal was 76–90% lower than in three reference groups. [[Mandel1993,Winawer1993]]`},
 {y:1996,l:'c',t:'Nottingham & Funen trials',txt:`Biennial guaiac testing cut colorectal cancer mortality by 15% in Nottingham (about 150,000 people; OR 0.85) and gave a mortality ratio of 0.82 in Funen, Denmark (61,933 people). At 19.5 years, Nottingham's reduction was 13%, with no significant fall in incidence. [[Hardcastle1996,Kronborg1996,Scholefield2012]]`},
 {y:2004,l:'d',t:'MOSAIC, bevacizumab, cetuximab',txt:`MOSAIC: adding oxaliplatin to 5-FU/leucovorin after resection of stage II–III colon cancer improved 3-year disease-free survival (78.2% vs 72.9%; HR 0.77). Bevacizumab plus IFL raised median survival in metastatic colorectal cancer from 15.6 to 20.3 months (HR 0.66). In BOND, cetuximab plus irinotecan gave a 22.9% response rate in irinotecan-refractory disease vs 10.8% with cetuximab alone. [[Andre2004,Hurwitz2004,Cunningham2004]]`},
 {y:2012,l:'c',t:'Polypectomy prevents deaths',txt:`Long-term National Polyp Study follow-up: after adenoma removal there were 12 colorectal cancer deaths against 25.4 expected (standardised incidence-based mortality ratio 0.47), suggesting a 53% reduction. In 2013, Minnesota's 30-year results showed mortality relative risks of 0.68 (annual) and 0.78 (biennial). [[Zauber2012,Shaukat2013]]`},
 {y:2015,l:'d',t:'PD-1 blockade in dMMR',txt:`Pembrolizumab achieved a 40% immune-related response rate in mismatch-repair-deficient colorectal cancer against 0% in mismatch-repair-proficient cancer. The same year, six expression-based classifications converged on four consensus molecular subtypes (CMS1–4). [[Le2015,Guinney2015]]`},
 {y:2017,l:'s',t:'AJCC 8th edition TNM',txt:`The AJCC 8th edition, published in 2017, is the current reference TNM system for colon and rectum. TNM is preferred over Dukes because it records depth (T), the number of positive nodes (N) and metastatic sites (M) separately; the main change from the 7th edition was a new M1c category for peritoneal metastasis. Also in 2017, a SEER analysis showed that people born around 1990 had about double the colon cancer risk and four times the rectal cancer risk of those born around 1950. [[Amin2017AJCC,Tong2018,Gunderson2010,Siegel2017]]`},
 {y:2018,l:'r',t:'ACS: screen from 45',txt:`The American Cancer Society lowered its recommended starting age for average-risk screening to 45. [[Wolf2018]]`},
 {y:2020,l:'d',t:'KEYNOTE-177',txt:`First-line pembrolizumab against chemotherapy in MSI-H/dMMR metastatic colorectal cancer doubled median progression-free survival (16.5 vs 8.2 months; HR 0.60), with grade 3 or worse treatment-related adverse events in 22% vs 66%. [[Andre2020]]`},
 {y:2021,l:'r',t:'USPSTF: 45 to 49 added',txt:`The US Preventive Services Task Force recommended screening at 50–75 (grade A) and added ages 45–49 (grade B). [[USPSTF2021]]`},
 {y:2022,l:'d',t:'Dostarlimab in dMMR rectal cancer',txt:`Dostarlimab alone in 12 patients with mismatch-repair-deficient locally advanced rectal cancer gave a 100% clinical complete response; none needed chemoradiotherapy or surgery during 6–25 months of follow-up <span class="ev early">Early evidence: 12 patients</span>. See <a href="#rectal" data-go="rectal">Rectal cancer pathway</a>. [[Cercek2022]]`},
 {y:2026,l:'r',t:'ACS 2026 update',txt:`The ACS reaffirmed screening from 45 through 75, added next-generation multitarget stool DNA and multitarget stool RNA tests as preferred stool options every 3 years, and recommended blood-based tests only for people who decline the preferred tests. The same year's statistics report colorectal cancer as the leading cause of cancer death in US adults under 50. [[Wolf2026,Siegel2026CRC]]`}
];
const HI_STEPS=[
 {from:0,at:hiT(1908),k:'1908–1939',t:'Surgeons & pathologists',
  pt:`A hundred years ago the main treatment was an operation, and pathologists began sorting cancers by how far they had spread. [[Miles1908,Dukes1932]]`,
  hook:`Dukes (1932) gave the first staging of rectal cancer; Heald's 1986 series still reported survival by Dukes stage. [[Dukes1932,Heald1986]]`},
 {from:hiT(1945),at:hiT(1951),k:'1951–1967',t:'Families & a first drug',
  pt:`Doctors noticed that bowel cancer runs in some families long before anyone knew about genes. [[Warthin1913,Lynch1966,Campos2024]]`,
  hook:`Gardner syndrome = hereditary polyposis + osteomas + skin and soft-tissue lesions; germline APC mutations cause both FAP and Gardner syndrome. [[Gardner1953,Nishisho1991]]`},
 {from:hiT(1970),at:hiT(1975),k:'1973–1986',t:'Polyps, scopes & TME',
  pt:`Most bowel cancers grow slowly from small growths called polyps. Removing polyps during a colonoscopy can stop cancer before it starts. [[Muto1975,Winawer1993]]`,
  hook:`Muto, Bussey and Morson (1975): the polyp-to-cancer sequence. Heald (1982): total mesorectal excision. [[Muto1975,Heald1982]]`},
 {from:hiT(1987.5),at:hiT(1991),k:'1988–1996',t:'Genes & trials',
  pt:`Scientists found the genes that go wrong, and trials showed that a simple stool test could save lives. [[Fearon1990,Mandel1993]]`,
  hook:`Minnesota trial: annual guaiac FOBT cut CRC mortality by 33% at 13 years. [[Mandel1993]]`},
 {from:hiT(2000),at:hiT(2004),k:'2004–2015',t:'Drugs & prevention',
  pt:`New drugs added to chemotherapy helped people with advanced bowel cancer live longer. [[Hurwitz2004]]`,
  hook:`MOSAIC (2004): FOLFOX after surgery, 3-year DFS 78.2% vs 72.9%. [[Andre2004]]`},
 {from:hiT(2016.5),at:hiT(2020),k:'2017–2026',t:'Immunotherapy & age 45',
  pt:`In the US, adults at average risk are advised to start screening at age 45. [[USPSTF2021,Wolf2026]]`,
  hook:`KEYNOTE-177 (2020): first-line pembrolizumab for MSI-H/dMMR metastatic CRC; median PFS 16.5 vs 8.2 months. [[Andre2020]]`}
];

inits.history=()=>{
  const svg=$('#hiSvg'),rg=$('#hiT');let pick=null,setSt=()=>{};
  const T=(x,y,s,c='t-sm',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${s}</text>`;
  const Ln=(x1,y1,x2,y2,st)=>`<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" style="${st}"/>`;
  const head=(x,y,s)=>T(x,y,s,'t-sm','fill:var(--brand);font-weight:600');
  const yearOf=t=>lerp(HI_Y0,HI_Y1,t);
  const curEv=Y=>{let i=-1;HI_EV.forEach((e,k)=>{if(e.y<=Y+1e-6)i=k});return i};

  /* the era picture: a teaching drawing that changes with the year */
  function picture(N,Y,x,y,w,h){let s='';
    if(Y<1932){s+=head(x,y,'1908 · AN OPERATION, NO STAGING YET');
      const C=colon(x+20,y+18,N?.62:.56,{w:14});s+=C.svg;
      let d='';for(let i=0;i<=30;i++){const q=C.at(lerp(.8,1,i/30));d+=(i?'L':'M')+f1(q[0])+' '+f1(q[1])}
      s+=`<path d="${d}" style="fill:none;stroke:var(--tumour);stroke-width:16;stroke-linecap:round;opacity:.55"/>`;
      const q=C.at(.96);s+=T(q[0]+22,q[1]+4,'rectum and end of the','t-xs','fill:var(--ink)')+T(q[0]+22,q[1]+16,'pelvic colon removed','t-xs','fill:var(--ink)');
      return s}
    if(Y<1975){s+=head(x,y,'1932 · DUKES STAGES (AS USUALLY SUMMARISED)');
      const W=wall(x,y+34,w*.78,{h:h-52,labels:false});s+=W.svg;const yy=W.y;
      const st=[['A','within the wall',yy.muscularis+ (yy.subserosa-yy.muscularis)*.5],['B','through the wall',yy.fat+ (W.y.bottom-yy.fat)*.4],['C','+ lymph nodes',yy.fat+(W.y.bottom-yy.fat)*.4]];
      st.forEach(([l,txt,dep],i)=>{const cx=x+w*.78*(i+.5)/3;
        s+=`<path d="M${f1(cx-18)} ${f1(yy.mucosa)}Q${f1(cx-16)} ${f1(dep)} ${f1(cx)} ${f1(dep)}Q${f1(cx+16)} ${f1(dep)} ${f1(cx+18)} ${f1(yy.mucosa)}Z" style="fill:var(--tumour);opacity:.85"/>`;
        if(i===2)s+=node(cx+30,W.y.bottom-10,8,1);
        s+=T(cx,yy.mucosa-6,'Dukes '+l,'t-lbl t-mid','fill:var(--tumour)')+T(cx,W.y.bottom+12,txt,'t-xs t-mid','fill:var(--ink)')});
      s+=T(x+w*.78+6,yy.mucosa+10,'mucosa','t-xs')+T(x+w*.78+6,yy.muscularis+12,'muscle','t-xs')+T(x+w*.78+6,yy.fat+10,'fat','t-xs');
      return s}
    const gen=Y>=1988,tnm=Y>=2017;
    if(!tnm){s+=head(x,y,gen?'1988–1991 · THE SEQUENCE AND ITS GENES':'1975 · POLYP TO CANCER');
      const base=y+h*.62;s+=Ln(x,base,x+w,base,'stroke:var(--mucosa-line);stroke-width:2');
      const G=[['APC','63% adenomas'],['KRAS','ras 9%→58%'],['18q loss','47% adv. ad.'],['TP53/17p','75% cancers']];
      [0,.4,.75,1].forEach((k,i)=>{const cx=x+w*(i+.5)/4;s+=polyp(cx,base,N?44:40,k,{seed:3+i});
        s+=T(cx,base+30,['small adenoma','large adenoma','high-grade','carcinoma'][i],'t-xs t-mid','fill:var(--ink)');
        if(gen){s+=T(cx,y+20,G[i][0],'t-lbl t-mid','fill:var(--lymph)')+T(cx,y+34,G[i][1],'t-xs t-mid')}
        if(i<3)s+=`<path d="M${f1(cx+w/8-8)} ${f1(base-16)}l12 0" style="stroke:var(--muted);stroke-width:1.6" marker-end="url(#hiArr)"/>`});
      if(!gen)s+=T(x,y+24,'most adenomas never become cancer','t-xs','fill:var(--ink)');
      return s}
    s+=head(x,y,'2017 · AJCC 8TH EDITION: T, N AND M');
    const W=wall(x,y+34,w*.6,{h:h-52,labels:false});s+=W.svg;const yy=W.y;
    const T4=[['T1',yy.submucosa+(yy.muscularis-yy.submucosa)*.6],['T2',yy.muscularis+(yy.subserosa-yy.muscularis)*.6],['T3',yy.subserosa+(yy.serosa-yy.subserosa)*.7],['T4',yy.fat+6]];
    T4.forEach(([l,dep],i)=>{const cx=x+w*.6*(i+.5)/4;s+=`<path d="M${f1(cx-12)} ${f1(yy.mucosa)}Q${f1(cx-10)} ${f1(dep)} ${f1(cx)} ${f1(dep)}Q${f1(cx+10)} ${f1(dep)} ${f1(cx+12)} ${f1(yy.mucosa)}Z" style="fill:var(--tumour);opacity:.85"/>`+T(cx,yy.mucosa-6,l,'t-lbl t-mid','fill:var(--tumour)')});
    const nx=x+w*.68;s+=node(nx+10,y+50,9,.7)+T(nx+26,y+54,'N: how many nodes','t-xs','fill:var(--ink)');
    s+=liver(nx+40,y+h-36,.42,2,5)+T(nx+26,y+h-6,'M: spread to organs','t-xs','fill:var(--ink)');
    return s}
  /* US survival and death rate */
  function chart(N,Y,x,y,w,h){let s='';const X=v=>x+w*(v-1970)/(2026-1970),V=v=>y+h-h*v/100;
    s+=head(x,y-10,'US · 5-YEAR SURVIVAL & DEATH RATE');
    [0,50,100].forEach(v=>s+=Ln(x,V(v),x+w,V(v),v?'stroke:var(--line);stroke-dasharray:2 4':'stroke:var(--line)')+T(x-4,V(v)+4,v+'%','t-xs t-end'));
    [1970,1990,2010].forEach(v=>s+=T(X(v),y+h+13,v,'t-xs t-mid'));
    if(Y<1970){s+=T(x+w/2,y+h/2,'series start in 1970','t-xs t-mid');return s}
    const line=(pts,col,dash)=>{const P=[];for(let i=0;i<pts.length;i++){const q=pts[i];if(q[0]<=Y)P.push(q);else{if(i>0&&pts[i-1][0]<=Y){const a=pts[i-1];P.push([Y,lerp(a[1],q[1],(Y-a[0])/(q[0]-a[0]))])}break}}
      if(P.length<2)return '';return `<path d="${P.map((q,i)=>(i?'L':'M')+f1(X(q[0]))+' '+f1(V(q[1]))).join('')}" style="fill:none;stroke:${col};stroke-width:2.4;${dash?'stroke-dasharray:5 3':''}"/>`};
    const sv=[[1976,50],[1996,61],[2018,65]],mr=[[1970,29.1],[2023,12.7]];
    s+=line(sv,'var(--good)')+line(mr,'var(--tumour)',1);
    sv.forEach(q=>{if(q[0]<=Y)s+=`<circle cx="${f1(X(q[0]))}" cy="${f1(V(q[1]))}" r="3.5" style="fill:var(--good)"/>`+T(X(q[0]),V(q[1])-7,q[1]+'%','t-xs t-mid','fill:var(--good)')});
    s+=T(X(1970),V(29.1)-6,'29.1','t-xs','fill:var(--tumour)');if(Y>=2023)s+=T(X(2023),V(12.7)-6,'12.7','t-xs t-end','fill:var(--tumour)');
    s+=T(x+w,y+h+26,'— survival  - - deaths per 100,000','t-xs t-end');
    return s}
  function lanes(N,Y,x,y,w,ci){let s='';const X=v=>x+w*(v-HI_Y0)/(HI_Y1-HI_Y0),keys=Object.keys(HI_LANE),lh=N?24:22;
    keys.forEach((k,i)=>{const ly=y+i*lh;s+=Ln(x,ly,x+w,ly,'stroke:var(--line)');if(!N)s+=T(x-8,ly+3,HI_LANE[k][0],'t-xs t-end')});
    [1910,1930,1950,1970,1990,2010].forEach(v=>s+=Ln(X(v),y-10,X(v),y+lh*4+10,'stroke:var(--line);stroke-dasharray:2 4')+T(X(v),y+lh*4+24,v,'t-xs t-mid'));
    HI_EV.forEach((e,i)=>{const ly=y+keys.indexOf(e.l)*lh,on=i===ci,past=e.y<=Y+1e-6,col=HI_LANE[e.l][1];
      s+=`<circle cx="${f1(X(e.y))}" cy="${ly}" r="${on?7:4.2}" style="fill:${past?col:'var(--panel)'};stroke:${col};stroke-width:${on?2.5:1.4}"/>`});
    s+=Ln(X(Y),y-16,X(Y),y+lh*4+12,'stroke:var(--ink);stroke-width:1.6');
    s+=T(X(Y),y-20,Math.floor(Y),'t-lbl t-mid','fill:var(--ink)');
    if(ci>=0){const e=HI_EV[ci],ex=X(e.y),ly=y+keys.indexOf(e.l)*lh,anchor=ex>x+w*.62?'t-end':ex<x+w*.3?'':'t-mid';
      s+=T(ex+(anchor==='t-end'?-10:anchor===''?10:0),y+lh*4+42,`${Math.floor(e.y)} · ${e.t}`,'t-lbl '+anchor,`fill:${HI_LANE[e.l][1]}`)}
    if(N)s+=T(x,y+lh*4+60,'lanes: surgery · genes · screening · drugs · guidelines','t-xs');
    return s}
  function draw(t){const N=vb(svg,'720 400','400 600'),Y=yearOf(t);let ci=curEv(Y);if(pick!=null&&HI_EV[pick].y<=Y+1e-6&&Math.abs(HI_EV[pick].y-Y)<1)ci=pick;
    let s=`<defs>${marker('hiArr','var(--muted)')}</defs>`;
    if(N){s+=picture(N,Y,20,26,360,190)+chart(N,Y,50,262,320,110)+lanes(N,Y,20,442,360,ci)}
    else{s+=picture(N,Y,20,26,380,180)+chart(N,Y,462,40,236,140)+lanes(N,Y,170,250,530,ci)}
    svg.innerHTML=s;
    const ph=phaseOf(HI_STEPS,t);setSt(ph);
    const e=ci>=0?HI_EV[ci]:null,S=HI_STEPS[ph];
    $('#hiNote').innerHTML=noteHTML(e?{k:Math.floor(e.y)+' · '+HI_LANE[e.l][0],t:e.t,txt:e.txt,pt:S.pt,hook:S.hook}:{k:'1905',t:'Before the timeline',txt:'Press Play or pick a year.',pt:S.pt,hook:S.hook});
    $$('#hiYears .tag').forEach((b,i)=>b.setAttribute('aria-pressed',i===ci));
    const past=HI_EV.filter(x=>x.y<=Y+1e-6).length;
    $('#hiRead').innerHTML=`<span>year <b>${Math.floor(Y)}</b></span><span>milestones so far <b>${past} of ${HI_EV.length}</b></span>${Y>=1976?`<span>US 5-year survival <b>${Y>=2018?65:Y>=1996?61:50}%</b> (latest published era)</span>`:''}`}
  $('#hiYears').innerHTML=HI_EV.map((e,i)=>`<button class="tag" data-hi-ev="${i}" aria-pressed="false"><b style="color:${HI_LANE[e.l][1]}">${Math.floor(e.y)}</b> ${e.t}</button>`).join('');
  const stop=playWire(rg,$('#hiPlay'),t=>{pick=null;draw(t)},40000,'%t:player.replay%','history');
  setSt=stepWire($('#hiSteps'),HI_STEPS,rg,t=>{pick=null;draw(t)},stop);
  $('#hiYears').addEventListener('click',ev=>{const b=ev.target.closest('[data-hi-ev]');if(!b)return;stop();pick=+b.dataset.hiEv;const t=hiT(HI_EV[pick].y)+1e-4;rg.value=t;draw(t)});
  draw(+rg.value);
};
