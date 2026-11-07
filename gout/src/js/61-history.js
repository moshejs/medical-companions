/* =============== 6.1 history & people =============== */
const hiWrap=(txt,n)=>{const ws=String(txt).split(' '),o=[];let l='';ws.forEach(w=>{if(l&&(l+' '+w).length>n){o.push(l);l=w}else l=l?l+' '+w:w});if(l)o.push(l);return o};
const HI_LANES=[['Clinic & names','var(--terra)'],['Treatment','var(--crocus)'],['Chemistry & crystals','var(--xtal)'],['Mechanism','var(--gold)'],['Criteria & guides','var(--good)']];
/* y: position on the axis; d: how the date is written */
const HI_EV=[
 {y:-400,d:'c. 400 BCE',l:0,c:'Hippocrates on podagra',h:'Hippocrates: podagra',t:'5th century BCE · Podagra',
  txt:'Podagra, gout of the big toe joint, was described by the Egyptians in 2640 BC and by Hippocrates in the 5th century BC, who called it "the unwalkable disease". His aphorisms say eunuchs do not get gout, nor a woman before her menses stop, and that it is active in spring and autumn. [[Nuki2006]]',
  pt:'Doctors in ancient Greece already knew gout well, and knew it mostly struck men.',
  hook:'Hippocrates\' aphorisms predate the explanation by 2,000 years: <b>eunuchs and premenopausal women rarely get gout</b>. [[Nuki2006]]'},
 {y:170,d:'2nd century',l:0,c:'Galen: tophi, a family trait',h:'Galen describes tophi',t:'2nd century · Galen',
  txt:'Galen first described tophi and noted a hereditary trait. Hippocrates had called podagra an "arthritis of the rich". [[Nuki2006]]'},
 {y:550,d:'6th century',l:1,c:'colchicum used for gout',h:'Alexander of Tralles: colchicum',t:'6th century · Colchicum',
  txt:'Colchicum, the autumn crocus, was a purgative in ancient Greece; its first use as a specific treatment for gout is credited to Alexander of Tralles in the 6th century AD. [[Nuki2006]]',
  pt:'A flower, the autumn crocus, was used for gout 1,500 years ago. Colchicine still comes from it.'},
 {y:1230,d:'13th century',l:0,c:'"gout", from gutta, a drop',h:'The word "gout", from gutta',t:'13th century · A drop',
  txt:'The word "gout" was first used by Randolphus of Bocking (1197–1258), from the Latin gutta, a drop, after the medieval idea of a humour dropping into a joint. [[Nuki2006]]',
  hook:'"Gout" comes from <b>gutta</b>, a drop of humour falling into the joint. [[Nuki2006]]'},
 {y:1679,d:'1679',l:2,c:'needle crystals seen in a tophus',h:'van Leeuwenhoek sees crystals',t:'1679 · Needles under a lens',
  txt:'Antonie van Leeuwenhoek described needle-shaped crystals from a tophus in 1679, without knowing what they were made of. [[McCarty1970,Nuki2006]]',
  pt:'With one of the first microscopes, a Dutch lens-maker saw tiny needles in material from a gout lump.'},
 {y:1683,d:'1683',l:0,c:'Sydenham, Tractatus de Podagra',h:'Sydenham: Tractatus de Podagra',t:'1683 · Sydenham',
  txt:'Thomas Sydenham, himself disabled by gout, described the night-time great-toe flare in his Tractatus de Podagra et Hydrope (1683). His rejection of purgatives kept colchicum out of use for about 150 years. [[Nuki2006]]',
  hook:'The classic description of a flare starting at night in the big toe is <b>Sydenham\'s, from his own flares</b>. [[Nuki2006]]'},
 {y:1763,d:'1763',l:1,c:'von Störck revives colchicum',h:'Colchicum revived in Vienna',t:'1763 · Colchicum returns',
  txt:'Von Störck revived colchicum in Vienna in 1763, ending the long gap that followed Sydenham\'s rejection of purgatives. [[Nuki2006]]'},
 {y:1776,d:'1776',l:2,c:'uric acid found in a kidney stone',h:'Scheele: uric acid in a stone',t:'1776 · Uric acid',
  txt:'Scheele identified uric acid in a kidney stone in 1776. [[Nuki2006]]'},
 {y:1797,d:'1797',l:2,c:'urate found in a tophus',h:'Wollaston: urate in a tophus',t:'1797 · Urate in a tophus',
  txt:'Wollaston showed urate in a tophus from his own ear in 1797, linking the chemical to the disease. [[Nuki2006]]'},
 {y:1819,d:'1819',l:1,c:'colchicine isolated',h:'Pelletier & Caventou isolate colchicine',t:'1819 · The alkaloid',
  txt:'Pelletier and Caventou isolated the active substance from Colchicum autumnale in 1819 (often misdated to 1820). Geiger named it colchicine in 1833, and Houdé produced pure crystalline granules in 1884. [[Karamanou2018]]',
  hook:'Colchicine was isolated in <b>1819</b> by Pelletier and Caventou, and named by Geiger in 1833. [[Karamanou2018]]'},
 {y:1848,d:'1848',l:2,c:'thread test: raised urate in blood',h:'Garrod: the thread test',t:'1848 · Garrod\'s thread',
  txt:'Alfred Baring Garrod measured raised uric acid in the blood of people with gout and devised the "thread test", called the first clinical chemistry test. [[Garrod1848,Nuki2006]]',
  pt:'A London doctor showed that people with gout have too much urate in their blood, using a thread that collected crystals.',
  hook:'Garrod\'s thread test (1848) is called the <b>first clinical chemistry test</b>. [[Nuki2006]]'},
 {y:1859,d:'1859',l:3,c:'deposits cause the inflammation',h:'Garrod: cause, not effect',t:'1859 · Cause, not effect',
  txt:'In 1859 Garrod proposed that deposited sodium urate is the cause of gouty inflammation, not its effect. [[Nuki2006]]'},
 {y:1877,d:'1877',l:1,c:'salicylate: the first uricosuric',h:'See: high-dose salicylate',t:'1877 · The first uricosuric',
  txt:'High-dose salicylate (See, 1877) was the first uricosuric, later replaced by probenecid, sulfinpyrazone and benzbromarone. [[Nuki2006]]'},
 {y:1899,d:'1899',l:3,c:'injected crystals cause arthritis',h:'Freudweiler: injected crystals',t:'1899 · An overlooked experiment',
  txt:'Freudweiler caused gout-like arthritis by injecting urate microcrystals in 1899. The finding was overlooked for 60 years. [[Nuki2006]]'},
 {y:1951,d:'1951',l:1,c:'probenecid (Benemid) in gout',h:'Probenecid in gout',t:'1951 · Probenecid',
  txt:'The clinical and metabolic effects of probenecid (Benemid) in gout were reported in 1951. [[Talbott1951,Nuki2006]]'},
 {y:1957,d:'1957',l:1,c:'uricase first given to humans',h:'Uricase given to two people',t:'1957 · Uricase',
  txt:'Purified uricase was first given to humans in 1957, by London and Hudson. Humans lack the enzyme, which turns urate into soluble allantoin; pegloticase is its modern, PEGylated form. [[London1957,Nuki2006,Chen2016,Sundy2011]]'},
 {y:1961,d:'1961',l:2,c:'polarised light identifies MSU',h:'McCarty & Hollander: polarised light',t:'1961 · Polarised light',
  txt:'McCarty and Hollander used compensated polarised light microscopy to identify monosodium urate crystals in gouty synovial fluid, 62 years after Freudweiler\'s overlooked experiment. Seeing these crystals is still the reference test. [[McCarty1961,Nuki2006]] <a href="#dx" data-go="dx">See the diagnosis</a>',
  pt:'Special light made the urate needles easy to recognise in fluid taken from a joint.',
  hook:'1961, McCarty and Hollander: <b>compensated polarised light</b> identifies urate crystals. [[McCarty1961]]'},
 {y:1965,d:'1965',l:1,c:'allopurinol works in gout',h:'Klinenberg: allopurinol trial',t:'1965 · Allopurinol',
  txt:'Allopurinol, the first xanthine oxidase inhibitor, came from Hitchings and Elion\'s purine research. A clinical report of its effectiveness in gout appeared in 1965. An earlier 1963 report by Rundles and colleagues is cited in reviews but could not be verified here. [[Klinenberg1965,Elion1989,Nuki2006]]'},
 {y:1966,d:'1966',l:1,c:'Zyloprim approved by the FDA',h:'Allopurinol approved in the US',t:'1966 · Zyloprim',
  txt:'Zyloprim (allopurinol) was approved by the FDA on 19 August 1966. It remains first-line urate-lowering therapy. [[DrugsFDA-Zyloprim,FitzGerald2020]]',
  pt:'From 1966 doctors had a daily pill that lowers urate enough to dissolve crystals.'},
 {y:1967,d:'1967',l:3,c:'HPRT deficiency: an inherited gout',h:'Seegmiller: HPRT deficiency',t:'1967 · An enzyme defect',
  txt:'Seegmiller, Rosenbloom and Kelley described the first purine enzyme defect, HPRT deficiency, causing a rare inherited form of gout. [[Seegmiller1967,Nuki2006]]'},
 {y:1988,d:'1988',l:1,c:'Nobel Prize to Elion and Hitchings',h:'Nobel Prize: Elion & Hitchings',t:'1988 · The Nobel Prize',
  txt:'Gertrude Elion and George Hitchings, whose purine research produced allopurinol, shared the 1988 Nobel Prize. [[Elion1989,Nuki2006]]',
  hook:'Allopurinol came from <b>Elion and Hitchings</b>, Nobel Prize 1988. [[Nuki2006,Elion1989]]'},
 {y:2006,d:'2006',l:3,c:'urate crystals activate NALP3',h:'Martinon: crystals activate NALP3',t:'2006 · The inflammasome',
  txt:'Martinon, Tschopp and colleagues showed that urate crystals activate the NALP3 (NLRP3) inflammasome, releasing active IL-1β and IL-18; mice lacking inflammasome parts or the IL-1 receptor had impaired crystal-induced neutrophil influx. [[Martinon2006]] <a href="#flare" data-go="flare">See it animated</a>',
  pt:'Scientists found the alarm switch inside immune cells that the crystals flip on.',
  hook:'Martinon 2006: MSU crystals activate the <b>NALP3 inflammasome</b>, which is why IL-1 blockers work. [[Martinon2006]]'},
 {y:2008.3,d:'2008–09',l:1,c:'febuxostat: EU 2008, US 2009',h:'Febuxostat approved',t:'2008–09 · Febuxostat and Colcrys',
  txt:'Febuxostat was authorised in the EU on 21 April 2008 and approved in the US as Uloric on 13 February 2009, after the FACT trial reached urate below 6 mg/dL in 53% (80 mg) and 62% (120 mg) against 21% on allopurinol 300 mg. Colchicine was first approved as a single-ingredient FDA product, Colcrys, on 29 July 2009. [[EMA-Adenuric,DrugsFDA-Uloric,Becker2005,DrugsFDA-Colcrys]]'},
 {y:2010,d:'2010',l:1,c:'pegloticase approved',h:'Pegloticase approved',t:'2010 · Pegloticase',
  txt:'Pegloticase was approved in the US as Krystexxa on 14 September 2010. In two pooled trials, 42% (every 2 weeks) and 35% (monthly) met the urate response against 0% on placebo. [[DrugsFDA-Krystexxa,Sundy2011]]'},
 {y:2012,d:'2012',l:4,c:'ACR guidelines',h:'ACR 2012 guidelines',t:'2012 · ACR guidelines',
  txt:'The 2012 ACR guidelines recommended checking urate every 2–5 weeks during titration and every 6 months once at target, and made patient education a core measure. [[Khanna2012P1]]'},
 {y:2013,d:'2013',l:1,c:'canakinumab for flares, EU',h:'Canakinumab: EU approval for flares',t:'2013 · An IL-1β antibody',
  txt:'Canakinumab, an anti-IL-1β antibody, gained an EU indication for frequent gout flares in February 2013, for adults in whom NSAIDs and colchicine are unsuitable. US approval followed on 25 August 2023. [[EMA-IlarisGout2013,FDA-IlarisGout2023]]'},
 {y:2015,d:'2015',l:4,c:'ACR/EULAR classification criteria',h:'ACR/EULAR 2015 criteria',t:'2015 · Classification criteria',
  txt:'The 2015 ACR/EULAR criteria have an entry criterion of at least one episode of peripheral joint or bursa swelling, pain or tenderness; urate crystals in a symptomatic joint or tophus are sufficient on their own; otherwise 8 or more points classifies as gout. [[Neogi2015]] <a href="#dx" data-go="dx">Try the calculator</a>'},
 {y:2016.6,d:'2016',l:4,c:'EULAR: urate < 6 mg/dL',h:'EULAR 2016 recommendations',t:'2016 · EULAR recommendations',
  txt:'The updated EULAR recommendations keep serum urate below 6 mg/dL (360 µmol/L), or below 5 mg/dL (300 µmol/L) in severe gout, with allopurinol first line. [[Richette2017]]'},
 {y:2020,d:'2020',l:4,c:'ACR guideline: treat to target',h:'ACR 2020 guideline',t:'2020 · ACR guideline',
  txt:'The 2020 ACR guideline has 42 recommendations, 16 of them strong, including treat-to-target with serum urate below 6 mg/dL and allopurinol first line. [[FitzGerald2020]] <a href="#t2t" data-go="t2t">Treat to target</a>'},
 {y:2025,d:'2025',l:1,c:'firsekibart approved in China',h:'Firsekibart approved in China',t:'2025 · A second IL-1β antibody',
  txt:'Firsekibart, an anti-IL-1β antibody, was approved by China\'s NMPA in June 2025 for gouty arthritis in adults who cannot use NSAIDs or colchicine. [[Crescioli2026]] <a href="#cure" data-go="cure">The pipeline</a>'}
];
const HI_ERA=[{f:-500,a:-400,t:'The ancient disease'},{f:1650,a:1679,t:'Microscope & bedside'},{f:1770,a:1776,t:'The chemistry of urate'},{f:1950,a:1951,t:'Lowering urate'},{f:2000,a:2006,t:'The inflammasome'},{f:2011.5,a:2012,t:'Targets & guidelines'}];
const HI_NAMES=[['Podagra (the big toe)',-400],['Gutta → gout',1230],['The disease of kings',null],['Chiragra (hand) · unverified',null],['Gonagra (knee) · unverified',null],['Urate crystal arthritis (proposed)',null]];
const hiFmt=y=>y<0?Math.round(-y)+' BCE':String(Math.floor(y));
inits.history=()=>{
  const svg=$('#hiSvg'),rg=$('#hiT');
  /* compressed before 1650, stretched after 1900 and 1990; fx() maps a year to the axis fraction */
  const fx=y=>y<=1650?lerp(0,.16,(y+500)/2150):y<=1900?lerp(.16,.46,(y-1650)/250):y<=1990?lerp(.46,.74,(y-1900)/90):lerp(.74,1,(y-1990)/36);
  const fy=u=>u<=.16?-500+u/.16*2150:u<=.46?1650+(u-.16)/.3*250:u<=.74?1900+(u-.46)/.28*90:1990+(u-.74)/.26*36;
  const tOfY=y=>clamp(fx(y));
  let XA=150,XB=700;
  const xOf=y=>XA+(XB-XA)*fx(y);
  const steps=HI_ERA.map((E,i)=>({from:i===0?0:tOfY(E.f),at:Math.min(1,tOfY(E.a)+.004),t:E.t}));
  const eraOf=y=>{let e=0;HI_ERA.forEach((E,i)=>{if(y>=E.f)e=i});return e};
  const T=(x,y,c,st,v)=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${v}</text>`;
  const RC=(x,y,w,h,st,r=4)=>`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="${r}" style="${st}"/>`;
  const LN=(x1,y1,x2,y2,st)=>`<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" style="${st}"/>`;
  const PANEL='fill:var(--panel);stroke:var(--line)';
  const TW=(x,y,txt,n,c='t-xs',st='')=>hiWrap(txt,n).map((l,i)=>T(x,y+i*12,c,st,l)).join('');
  const crocus=(x,y,s=1)=>{let o=LN(x,y,x,y+34*s,'stroke:var(--good);stroke-width:2');
    for(let k=0;k<6;k++){const a=-Math.PI/2+(k-2.5)*.42;o+=`<ellipse cx="${f1(x+Math.cos(a)*10*s)}" cy="${f1(y+Math.sin(a)*10*s)}" rx="${f1(4*s)}" ry="${f1(10*s)}" transform="rotate(${f1(a*180/Math.PI+90)} ${f1(x+Math.cos(a)*10*s)} ${f1(y+Math.sin(a)*10*s)})" style="fill:var(--crocus);opacity:.8"/>`}
    return o+`<circle cx="${x}" cy="${y}" r="${f1(3*s)}" style="fill:var(--gold)"/>`};
  const bottle=(x,y,c,lbl)=>RC(x+8,y,18,8,`fill:${c};opacity:.85`,2)+RC(x,y+8,34,40,`fill:var(--panel);stroke:${c};stroke-width:1.6`,5)+RC(x+5,y+20,24,12,`fill:${c};opacity:.25`,2)+T(x+17,y+62,'t-xs t-mid','',lbl);
  const field=(x,y,r,n,seed,o=1)=>{const R=rng(seed);let s=`<circle cx="${x}" cy="${y}" r="${r}" style="fill:var(--panel-2);stroke:var(--line);stroke-width:2"/>`;
    for(let i=0;i<n;i++){const a=R()*6.283,rr=Math.sqrt(R())*r*.75;s+=needle(x+Math.cos(a)*rr,y+Math.sin(a)*rr,r*.28,R()*180,o)}return s};

  /* ---------- the scene: one drawing per era, both layouts ---------- */
  function ancient(A,yr,N){let s='';
    const fx0=A.x+12,fy0=A.y+20,sc=.8;
    s+=`<g transform="translate(${fx0} ${fy0}) scale(${sc})"><path d="M48 232 C20 230 14 196 18 160 C22 120 14 92 22 64 C28 44 46 34 70 36 C96 38 116 44 122 62 C128 84 118 118 112 150 C106 186 102 226 74 232 Z" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.6"/>`;
    s+=`<ellipse cx="40" cy="22" rx="13" ry="17" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.6"/>`;
    [[66,17,8],[86,21,7],[102,29,6],[115,41,5]].forEach(([a,b,r])=>s+=`<circle cx="${a}" cy="${b}" r="${r}" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.4"/>`);
    s+=`<circle cx="40" cy="56" r="22" style="fill:var(--terra);opacity:.28"/><circle cx="40" cy="56" r="11" style="fill:var(--terra-soft);stroke:var(--terra);stroke-width:2.4"/>`;
    if(yr>=170)[[22,118],[20,140],[28,160]].forEach(([a,b])=>s+=`<circle cx="${a}" cy="${b}" r="7" style="fill:var(--field);stroke:var(--xtal);stroke-width:1.6"/>`);
    s+='</g>';
    const x0=A.x+(N?132:150),w=N?36:40;
    s+=T(x0,A.y+28,'t-sm','fill:var(--terra)','PODAGRA')+T(x0,A.y+44,'t-xs','','gout of the big toe joint');
    if(yr>=170)s+=T(x0,A.y+74,'t-sm','fill:var(--xtal)','TOPHI')+T(x0,A.y+90,'t-xs','','Galen, 2nd century');
    if(yr>=550){s+=crocus(A.x+A.w-(N?26:36),A.y+(N?186:150),N?.9:1.1)+T(x0,A.y+120,'t-sm','fill:var(--crocus)','COLCHICUM')+TW(x0,A.y+136,'Alexander of Tralles, 6th century',w)}
    if(yr>=1230){const dx=x0,dy=A.y+178;s+=`<path d="M${dx+6} ${dy-12} q6 9 0 14 q-6 -5 0 -14z" style="fill:var(--sea)"/>`+T(dx+18,dy,'t-sm','fill:var(--sea)','GUTTA')+T(dx+18,dy+16,'t-xs','','a drop: the word "gout"')}
    s+=T(A.x+8,A.y+A.h-6,'t-xs','','Hippocrates: "the unwalkable disease"');
    return s}

  function microscope(A,yr,N){let s='';
    const mx=A.x+(N?36:50),my=A.y+30;
    s+=`<ellipse cx="${mx}" cy="${my+108}" rx="34" ry="9" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    s+=RC(mx-6,my+44,12,62,'fill:var(--panel-2);stroke:var(--line)',4);
    s+=`<path d="M${mx+6} ${my+54} q26 8 22 38" style="fill:none;stroke:var(--muted);stroke-width:5;stroke-linecap:round"/>`;
    s+=RC(mx+16,my+6,16,48,'fill:var(--panel);stroke:var(--muted);stroke-width:1.6',5)+RC(mx+13,my-6,22,12,'fill:var(--panel-2);stroke:var(--muted)',3);
    s+=RC(mx-18,my+66,56,8,'fill:var(--panel-2);stroke:var(--line)',2);
    const fxc=A.x+(N?150:170),fyc=A.y+82;
    if(yr>=1679){s+=field(fxc,fyc,48,9,5)+TW(fxc-50,fyc+66,'needles from a tophus, 1679',22,'t-xs','fill:var(--xtal)')}
    else s+=`<circle cx="${fxc}" cy="${fyc}" r="48" style="fill:var(--panel-2);stroke:var(--line);stroke-width:2;opacity:.5"/>`;
    const bx=A.x+A.w-(N?96:112),by=A.y+18;
    if(yr>=1683){s+=RC(bx,by,N?84:96,70,'fill:var(--terra-soft);stroke:var(--terra);stroke-width:1.6',4)+LN(bx+8,by,bx+8,by+70,'stroke:var(--terra)');
      s+=T(bx+16,by+26,'t-xs','fill:var(--ink);font-weight:700','Tractatus')+T(bx+16,by+40,'t-xs','fill:var(--ink);font-weight:700','de Podagra')+T(bx+16,by+58,'t-xs','','Sydenham')}
    if(yr>=1763){s+=crocus(bx+30,by+120,.9)+TW(bx-4,by+172,'colchicum revived, 1763',N?16:18,'t-xs','fill:var(--crocus)')}
    return s}

  function chemistry(A,yr,N){let s='';
    const cw=(A.w-8)/3,ch=(A.h-8)/2,n=N?19:22;
    const cell=(k,on,draw,lbl,col)=>{const cx=A.x+4+(k%3)*cw+cw/2,cy=A.y+4+Math.floor(k/3)*ch+36;
      if(!on){s+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="14" style="fill:none;stroke:var(--line);stroke-dasharray:3 3"/>`;return}
      s+=draw(cx,cy);s+=TW(cx-cw/2+6,cy+44,lbl,n,'t-xs',`fill:${col}`)};
    cell(0,yr>=1776,(x,y)=>`<path d="M${x-22} ${y+4} q4 -24 24 -20 q22 2 20 20 q-4 18 -24 16 q-22 2 -20 -16z" style="fill:var(--gold-soft);stroke:var(--gold);stroke-width:1.6"/>`,'uric acid in a kidney stone, 1776','var(--gold)');
    cell(1,yr>=1797,(x,y)=>`<path d="M${x-6} ${y-26} q26 -4 24 22 q-2 18 -16 22 q-6 2 -8 12 q-4 6 -10 0" style="fill:none;stroke:var(--muted);stroke-width:2"/><circle cx="${x+10}" cy="${y-16}" r="6" style="fill:var(--field);stroke:var(--xtal);stroke-width:1.6"/>`,'urate in a tophus from an ear, 1797','var(--xtal)');
    cell(2,yr>=1819,(x,y)=>RC(x-8,y-28,16,8,'fill:var(--crocus)',2)+RC(x-12,y-20,24,40,'fill:var(--crocus-soft);stroke:var(--crocus);stroke-width:1.6',5),'colchicine isolated, 1819','var(--crocus)');
    cell(3,yr>=1848,(x,y)=>`<ellipse cx="${x}" cy="${y+6}" rx="30" ry="9" style="fill:var(--panel-2);stroke:var(--line)"/>`+LN(x-26,y-2,x+26,y-2,'stroke:var(--ink);stroke-width:1.4')+[0,1,2,3,4].map(k=>needle(x-20+k*10,y-2,8,60+k*25,.9)).join(''),'Garrod\'s thread test, 1848','var(--xtal)');
    cell(4,yr>=1859,(x,y)=>needle(x-18,y,16,30)+`<path d="M${x-6} ${y} h14" style="stroke:var(--muted);stroke-width:1.6"/><path d="M${x+14} ${y+10} q-6 -10 2 -20 q2 8 8 4 q4 10 -4 16z" style="fill:var(--terra);opacity:.85"/>`,'deposits cause the inflammation, 1859','var(--gold)');
    cell(5,yr>=1899,(x,y)=>RC(x-24,y-6,36,12,'fill:var(--panel);stroke:var(--muted)',3)+LN(x+12,y,x+26,y,'stroke:var(--muted);stroke-width:1.4')+needle(x-14,y,8,0)+needle(x-4,y,8,0),'injected crystals inflame a joint, 1899','var(--gold)');
    return s}

  function lowering(A,yr,N){let s='';
    const px=A.x+(N?60:70),py=A.y+76;
    if(yr>=1961){s+=field(px,py,54,10,9)+`<path d="M${px-46} ${py+46} L${px+46} ${py-46}" style="stroke:var(--muted);stroke-width:1;stroke-dasharray:3 3"/>`+TW(px-56,py+72,'compensated polarised light, 1961',N?20:22,'t-xs','fill:var(--xtal)')}
    else s+=`<circle cx="${px}" cy="${py}" r="54" style="fill:var(--panel-2);stroke:var(--line);stroke-width:2;opacity:.5"/>`;
    const x0=A.x+(N?132:156),sp=(A.x+A.w-x0-60)/2;
    if(yr>=1951)s+=bottle(x0,A.y+16,'var(--sea)','probenecid');
    if(yr>=1957)s+=bottle(x0+sp,A.y+16,'var(--sea)','uricase');
    if(yr>=1965)s+=bottle(x0+2*sp,A.y+16,'var(--sea)','allopurinol');
    if(yr>=1966)s+=T(x0+2*sp+17,A.y+92,'t-xs t-mid','fill:var(--sea);font-weight:700','FDA 1966');
    if(yr>=1967)s+=TW(x0,A.y+124,'HPRT deficiency: an inherited gout, 1967',N?36:40,'t-xs','fill:var(--gold)');
    if(yr>=1988){const mx=x0+14,my=A.y+176;s+=`<circle cx="${mx}" cy="${my}" r="14" style="fill:var(--warn-soft);stroke:var(--warn);stroke-width:2"/><path d="M${mx-6} ${my+12} l-4 16 l10 -6 l10 6 l-4 -16" style="fill:var(--warn);opacity:.6"/>`+TW(mx+22,my-2,'Nobel 1988: Elion and Hitchings',N?26:32,'t-xs','fill:var(--ink)')}
    return s}

  function inflammasome(A,yr,N){let s='';
    const cx=A.x+A.w*(N?.3:.32),cy=A.y+A.h*.44,rx=A.w*(N?.27:.28),ry=A.h*.36;
    s+=T(A.x+6,A.y+12,'t-xs','','INSIDE A MACROPHAGE');
    s+=`<ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="${f1(rx)}" ry="${f1(ry)}" style="fill:var(--cyto);stroke:var(--memb);stroke-width:3"/>`;
    s+=needle(cx-rx*.45,cy-ry*.25,22,35)+needle(cx-rx*.35,cy-ry*.05,16,-20);
    for(let k=0;k<10;k++){const a=k/10*6.283;s+=`<circle cx="${f1(cx+12+Math.cos(a)*13)}" cy="${f1(cy+Math.sin(a)*13)}" r="3.2" style="fill:var(--terra);opacity:.85"/>`}
    s+=T(cx+12,cy+30,'t-xs t-mid','fill:var(--terra)','NLRP3');
    for(let k=0;k<4;k++)s+=`<circle cx="${f1(cx+rx*.55+k*12)}" cy="${f1(cy-ry*.4+k*6)}" r="3.5" style="fill:var(--terra)"/>`;
    s+=T(cx+rx*.6,cy-ry*.5,'t-xs','fill:var(--terra)','IL-1β');
    s+=neutro(cx+rx+8,cy+ry*.55,12,1);
    s+=TW(A.x+6,A.y+A.h-20,'crystals switch on NALP3, 2006',N?30:34,'t-xs','fill:var(--gold)');
    const rx0=A.x+A.w-(N?104:124);
    if(yr>=2008.3){s+=`<rect x="${rx0}" y="${A.y+22}" width="30" height="14" rx="7" style="fill:var(--sea-soft);stroke:var(--sea);stroke-width:1.6"/><line x1="${rx0+15}" x2="${rx0+15}" y1="${A.y+22}" y2="${A.y+36}" style="stroke:var(--sea)"/>`+TW(rx0,A.y+52,'febuxostat: EU 2008, US 2009',N?18:22,'t-xs','fill:var(--sea)')}
    if(yr>=2010){const by=A.y+112;s+=`<path d="M${rx0} ${by} h28 v34 q-14 10 -28 0z" style="fill:var(--sea-soft);stroke:var(--sea);stroke-width:1.6"/><line x1="${rx0+14}" x2="${rx0+14}" y1="${by+40}" y2="${by+54}" style="stroke:var(--sea);stroke-width:1.6"/>`+TW(rx0,by+70,'pegloticase, 2010',N?18:22,'t-xs','fill:var(--sea)')}
    return s}

  function guides(A,yr,N){let s='';
    const D=[[2012,'ACR 2012','urate tests'],[2015,'ACR/EULAR','≥ 8 points'],[2016.6,'EULAR 2016','< 6 mg/dL'],[2020,'ACR 2020','to target']];
    const dw=(A.w-12)/4;
    D.forEach(([y,t1,t2],k)=>{const x=A.x+6+k*dw,yy=A.y+12,w=dw-8,on=yr>=y;
      s+=RC(x,yy,w,64,on?PANEL:'fill:none;stroke:var(--line);stroke-dasharray:3 3',6);
      if(on){s+=LN(x+8,yy+16,x+w-8,yy+16,'stroke:var(--good);stroke-width:2')+LN(x+8,yy+28,x+w-20,yy+28,'stroke:var(--line);stroke-width:2')+T(x+w/2,yy+46,'t-xs t-mid','fill:var(--good);font-weight:700',t1)+T(x+w/2,yy+58,'t-xs t-mid','',t2)}});
    if(yr>=2016.6){const gx=A.x+10,gy=A.y+108,gw=A.w*(N?.9:.55);
      s+=T(gx,gy-8,'t-xs','','serum urate, mg/dL');
      s+=RC(gx,gy,gw,12,'fill:var(--panel-2)',6)+RC(gx,gy,gw*.6,12,'fill:var(--sea-soft)',6);
      s+=LN(gx+gw*.6,gy-4,gx+gw*.6,gy+16,'stroke:var(--sea);stroke-width:2.4')+T(gx+gw*.6,gy+30,'t-xs t-mid','fill:var(--sea);font-weight:700','target < 6 (360 µmol/L)');
      [0,10].forEach((v,i)=>s+=T(gx+gw*v/10,gy+30,'t-xs '+(i?'t-end':''),'',v))}
    const sx=A.x+(N?10:A.w*.62+8),sy=A.y+(N?160:120);
    if(yr>=2013){s+=RC(sx,sy,46,12,'fill:var(--panel);stroke:var(--crocus)',3)+LN(sx+46,sy+6,sx+62,sy+6,'stroke:var(--crocus);stroke-width:1.4')+RC(sx+6,sy+2,22,8,'fill:var(--crocus);opacity:.4',2);
      s+=TW(sx,sy+28,'IL-1β antibody: EU 2013'+(yr>=2023?', US 2023':'')+(yr>=2025?'; a second, China 2025':''),N?40:26,'t-xs','fill:var(--crocus)')}
    return s}
  const SCENE=[ancient,microscope,chemistry,lowering,inflammasome,guides];

  function draw(t){
    const N=vb(svg,'720 672','400 848');
    const L=N
      ? {XA:20,XB:386,yrX:8,yrY:26,hX:8,hY:46,
         sc:[6,54,388,412],A:{x:14,y:62,w:372,h:220},C:{x:14,y:292,w:372,h:170},
         LY:i=>500+i*46,bandH:26,labUp:1,lineH:16,
         axY:722,tkY:740,brY:728,ticks:[-400,600,1650,1750,1850,1950,1990,2025],
         obLX:4,obLY:764,obY:772,obMk:818,phTop:481,phBot:804,yY:838,
         o1:'urate could not be lowered',o2:'can be dissolved'}
      : {XA:150,XB:700,yrX:10,yrY:24,hX:150,hY:23,
         sc:[6,34,708,250],A:{x:16,y:40,w:416,h:238},C:{x:446,y:40,w:262,h:238},
         LY:i=>314+i*50,bandH:46,labUp:0,lineH:20,
         axY:550,tkY:568,brY:556,ticks:[-400,600,1650,1750,1850,1900,1950,1990,2010,2025],
         obLX:10,obLY:602,obY:590,obMk:636,phTop:285,phBot:622,yY:656,
         o1:'crystals known, urate could not be lowered',o2:'crystals can be dissolved'};
    XA=L.XA;XB=L.XB;
    const xp=lerp(XA,XB,t),yr=fy(t);
    let s=`<defs><linearGradient id="hiGrad" gradientUnits="userSpaceOnUse" x1="${f1(xOf(1951))}" x2="${f1(xOf(1966))}" y1="0" y2="0"><stop offset="0" style="stop-color:var(--bad)"/><stop offset="1" style="stop-color:var(--good)"/></linearGradient></defs>`;
    const done=HI_EV.filter(e=>e.y<=yr+.01),cur=done.length?done[done.length-1]:null,ph=phaseOf(steps,t);
    if(cur)s+=T(L.yrX,L.yrY,'t-big',`font-size:${N?20:18}px;fill:${HI_LANES[cur.l][1]}`,cur.d)+T(N?L.hX:L.hX,L.hY,'t-lbl','',cur.h);
    else s+=T(L.yrX,L.yrY,'t-lbl','fill:var(--muted)','Press play: the first milestone is Hippocrates');
    s+=RC(L.sc[0],L.sc[1],L.sc[2],L.sc[3],'fill:var(--field);stroke:var(--line)',12);
    s+=SCENE[ph](L.A,yr,N);
    s+=LN(N?L.C.x:L.C.x-12,N?L.C.y-6:L.A.y,N?L.C.x+L.C.w:L.C.x-12,N?L.C.y-6:L.A.y+L.A.h,'stroke:var(--line)');
    s+=T(L.C.x,L.C.y+12,'t-sm','fill:var(--ink)',HI_ERA[ph].t.toUpperCase());
    const inEra=HI_EV.filter(e=>eraOf(e.y)===ph&&e.y<=yr+.01);
    inEra.forEach((e,k)=>{const y=L.C.y+32+k*L.lineH;
      s+=`<circle cx="${L.C.x+5}" cy="${y-4}" r="4" style="fill:${HI_LANES[e.l][1]}"/>`;
      s+=`<text x="${L.C.x+16}" y="${y}" class="t-xs"><tspan style="fill:var(--ink);font-weight:700">${e.d}</tspan>  ${e.c}</text>`});
    if(!inEra.length)s+=T(L.C.x+16,L.C.y+32,'t-xs','','the playhead has not reached this era yet');
    HI_LANES.forEach(([n,c],i)=>{const y=L.LY(i);
      s+=RC(XA-4,y-L.bandH/2,XB-XA+10,L.bandH,`fill:var(--panel-2);opacity:${i%2?.35:.7}`,8);
      s+=T(L.labUp?XA-4:10,L.labUp?y-L.bandH/2-6:y+4,'t-sm',`fill:${c}`,n);
      s+=LN(XA,y,XB,y,`stroke:${c};stroke-width:1;opacity:.35`)});
    s+=`<line x1="${XA}" x2="${XB}" y1="${L.axY}" y2="${L.axY}" class="axis" style="stroke:var(--muted)"/>`;
    L.ticks.forEach(y=>{const x=xOf(y);s+=LN(x,L.axY-4,x,L.axY+4,'stroke:var(--muted)')+T(x,L.tkY,'t-xs t-mid','',y<0?'−'+(-y):y)});
    [1650,1900,1990].forEach(y=>{const x=xOf(y);s+=`<path d="M${f1(x-4)} ${L.brY} l4 -12 M${f1(x)} ${L.brY} l4 -12" style="stroke:var(--muted);stroke-width:1"/>`});
    const gapMin=12*(XB-XA)/550,dyO=N?7:8,last={};
    HI_EV.forEach(e=>{const x=xOf(e.y),p=last[e.l];e.dy=p&&x-p.x<gapMin?(p.dy>0?-dyO:dyO):0;if(e.dy&&p&&!p.dy)p.dy=-e.dy;last[e.l]={x,dy:e.dy}});
    HI_EV.forEach(e=>{const x=xOf(e.y),y=L.LY(e.l)+e.dy,c=HI_LANES[e.l][1],pass=e.y<=yr+.01;
      if(!pass)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="4.5" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.2;opacity:.6"/>`;
      else if(e===cur){const k=ramp(xp-x,0,26);s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(8+(N?7:12)*k)}" style="fill:none;stroke:${c};stroke-width:2;opacity:${f1(.8*(1-k))}"/><circle cx="${f1(x)}" cy="${f1(y)}" r="7" style="fill:${c};stroke:var(--ink);stroke-width:2"/>`}
      else s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="5" style="fill:${c}"/>`;
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="9" class="clk" data-hy="${e.y}" style="fill:transparent"/>`});
    s+=T(L.obLX,L.obLY,'t-sm','','Outlook')+T(L.obLX+(N?62:0),L.obLY+(N?0:14),'t-xs','','qualitative');
    s+=RC(XA,L.obY,XB-XA,28,'fill:var(--panel-2)',6)+RC(XA,L.obY,Math.max(0,xp-XA),28,'fill:url(#hiGrad);opacity:.85',6);
    s+=`<clipPath id="hiClip"><rect x="${XA}" y="${L.obY}" width="${f1(Math.max(0,xp-XA))}" height="28"/></clipPath><g clip-path="url(#hiClip)">${T(XA+8,L.obY+18,'t-xs','fill:var(--panel);font-weight:700',L.o1)}${T(xOf(1966)+6,L.obY+18,'t-xs','fill:var(--panel);font-weight:700',L.o2)}</g>`;
    if(xp>xOf(1951))s+=LN(xOf(1951),L.obY-4,xOf(1951),L.obY+32,'stroke:var(--ink);stroke-width:1.5')+T(xOf(1951)-4,L.obMk,'t-xs t-end','','1951: probenecid');
    if(xp>xOf(1966))s+=LN(xOf(1966),L.obY-4,xOf(1966),L.obY+32,'stroke:var(--ink);stroke-width:1.5')+T(xOf(1966)+4,L.obMk,'t-xs','','1966: allopurinol');
    s+=LN(xp,L.phTop,xp,L.phBot,'stroke:var(--ink);stroke-width:1.4;opacity:.55')+`<path d="M${f1(xp-5)} ${L.axY} L${f1(xp+5)} ${L.axY} L${f1(xp)} ${L.axY-8}Z" style="fill:var(--ink)"/>`;
    s+=T(Math.min(XB-14,Math.max(XA+14,xp)),L.yY,'t-xs t-mid','fill:var(--ink)',hiFmt(yr));
    svg.innerHTML=s;
    setSt(ph);
    $('#hiRead').innerHTML=`<span>year <b>${hiFmt(yr)}</b></span><span>milestones passed <b>${done.length} of ${HI_EV.length}</b></span><span>era <b>${HI_ERA[ph].t}</b></span>`;
    $('#hiNote').innerHTML=cur?`<div class="kicker">${HI_LANES[cur.l][0]}</div>`+noteHTML({t:cur.t,txt:cur.txt,pt:cur.pt,hook:cur.hook}).replace('<div class="kicker"></div>',''):noteHTML({k:'Before 400 BCE',t:'Before the first descriptions',txt:'Podagra was described by the Egyptians in 2640 BC, long before the first Greek texts. Press play, drag the timeline, or click any dot. [[Nuki2006]]',pt:'The story starts with the big toe.'});
  }
  const stop=playWire(rg,$('#hiPlay'),draw,26000,'Replay','history');
  const setSt=stepWire($('#hiSteps'),steps,rg,draw,stop);
  const jump=y=>{stop();const t=clamp(tOfY(y)+.002);rg.value=t;draw(t)};
  svg.addEventListener('click',e=>{const d=e.target.closest('[data-hy]');if(d)jump(+d.dataset.hy)});
  $('#hiYears').innerHTML=HI_EV.map(e=>`<button class="tag sea" data-hy2="${e.y}"><b style="font-weight:700">${e.d}</b>&nbsp;${e.h.replace(/&/g,'&amp;').replace(/</g,'&lt;')}</button>`).join('');
  $('#hiYears').addEventListener('click',ev=>{const b=ev.target.closest('[data-hy2]');if(b){jump(+b.dataset.hy2);$('#hiSvg').scrollIntoView({block:'nearest',behavior:RM?'auto':'smooth'})}});
  $('#hiNamesLede').innerHTML=`<p>Podagra, gout of the big toe joint, is the oldest name; the word "gout" comes from the Latin gutta, a drop. The "disease of kings" label comes from gout's link with rich food and drink that only the affluent could afford. [[Nuki2006]] Chiragra (the hand) and gonagra (the knee) are often listed as older regional names, but this guide could not check them against a readable scholarly source, so they are marked unverified. Renaming gout "urate crystal arthritis" made members of the public see it as less under personal control and better suited to long-term treatment. <span class="ev early">Early evidence</span> [[Coleshill2021]] Click a dated name to jump the timeline.</p>`;
  $('#hiChips').innerHTML=HI_NAMES.map(([n,y])=>y!=null?`<button class="tag sea" data-hn="${y}">${n}<small>${hiFmt(y)}</small></button>`:`<span class="tag">${n}</span>`).join('');
  $('#hiChips').addEventListener('click',e=>{const b=e.target.closest('[data-hn]');if(b){jump(+b.dataset.hn);$('#hiSvg').scrollIntoView({block:'nearest',behavior:RM?'auto':'smooth'})}});
  $('#hiCards').innerHTML=`
   <div class="card"><h4>Colchicum's long detour</h4><p>Used for gout by Alexander of Tralles in the 6th century, dropped for about 150 years after Sydenham rejected purgatives, revived by von Störck in 1763, isolated by Pelletier and Caventou in 1819 and named colchicine by Geiger in 1833. The isolation is often dated 1820; the history of the alkaloid gives 1819. [[Nuki2006,Karamanou2018]] <a href="#colin" data-go="colin">Colchicine inside the cell</a></p></div>
   <div class="card"><h4>Garrod's thread</h4><p>In 1848 Garrod showed raised uric acid in the blood of people with gout, with a test often called the first clinical chemistry test. In 1859 he argued that urate deposits cause the inflammation rather than result from it. A century later, polarised light identified the crystals in gouty joint fluid. [[Garrod1848,Nuki2006,McCarty1961]]</p></div>
   <div class="card"><h4>From purine chemistry to a Nobel</h4><p>Allopurinol came out of Hitchings and Elion's work on purines. Its effectiveness in gout was reported in 1965, the FDA approved it on 19 August 1966, and Elion and Hitchings shared the 1988 Nobel Prize. It is still first-line. [[Elion1989,Klinenberg1965,DrugsFDA-Zyloprim,Nuki2006,FitzGerald2020]]</p></div>
   <div class="card"><h4>The disease of kings, and its shadow <span class="ev early">Early evidence</span></h4><p>The old image of gout as a disease of excess persists. Rheumatologists shown gout vignettes with stereotyped lifestyle profiles judged the patients more responsible and less likely to adhere to or benefit from drug treatment than identical non-gout cases. [[Nuki2006,Vitriol2025]] <a href="#living" data-go="living">Living with gout</a></p></div>`;
  draw(+rg.value);
};
