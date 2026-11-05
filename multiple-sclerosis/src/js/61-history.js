/* =============== 6.1 history & people =============== */
const HIS_LANES=[['People','var(--orange)'],['Clinic & pathology','var(--attack)'],['Laboratory & imaging','var(--brand)'],['Criteria & scales','var(--gold)'],['Treatment','var(--rx)']];
const HIS_EV=[
 {y:1822,l:0,c:`d'Esté's diary: optic neuritis`,h:`Augustus d'Esté's diary begins`,t:'1822 · A patient writes it down',
  txt:`Sir Augustus d'Esté (1794–1848), a grandson of King George III, kept a diary that is regarded as perhaps the first personal record of MS. It describes onset in 1822 with optic neuritis in both eyes, later relapses, and eventually weakness of both legs with bladder and bowel problems. [[Landtblom2010]]`,
  pt:'The earliest known account of MS comes from a person living with it, not from a doctor.'},
 {y:1838,l:1,c:`Carswell's atlas shows lesions`,h:'Carswell draws MS lesions',t:'1838 · Carswell draws the lesions',
  txt:`Robert Carswell's pathological atlas, completed by 1838, depicts MS lesions (plate 4, figure 1). Compston dates this before Cruveilhier's depiction. [[Compston1988]]`},
 {y:1841,l:1,c:'Cruveilhier: 1841 or later',h:'Cruveilhier: 1841 or later, disputed',t:'1841 or later · Cruveilhier, and a dispute',
  txt:`Jean Cruveilhier also drew MS lesions. Compston argues his depiction cannot have appeared earlier than 1841, after Carswell's. Zalc agrees about one Cruveilhier plate but says doubt remains over the other, so who drew MS first is still debated. [[Compston1988,Zalc2018]]`,
  hook:'Who first depicted MS? Usually Carswell (1838), then Cruveilhier (1841 or later); the dating of one Cruveilhier plate is disputed.'},
 {y:1856,l:1,c:'Frerichs & Valentiner: 15 cases',h:'Frerichs and Valentiner: 15 cases',t:'1856 · Close, before Charcot',
  txt:`Others came close before Charcot, including Frerichs and Valentiner, who reported 15 cases in 1856. [[Zalc2018,Murray2009]]`},
 {y:1866,l:1,c:'Vulpian publishes joint cases',h:'Vulpian publishes the joint cases',t:'1866 · Vulpian',
  txt:`Alfred Vulpian, who worked with Charcot at La Salpêtrière, published their joint cases in 1866. [[Zalc2018]]`},
 {y:1868,l:1,c:'Charcot: "sclérose en plaques"',h:'Charcot names "sclérose en plaques"',t:'1868 · Charcot names a disease',
  txt:`Jean-Martin Charcot (1825–93) lectured on "sclérose en plaques" at La Salpêtrière and established it as a distinct disease. His description included the "classic triad" of nystagmus, dysarthria and ataxia with intention tremor, as well as cognitive features and spinal signs. [[Zalc2018]]`,
  pt:'Charcot gave MS its name and its first clear clinical picture, in lectures at a Paris hospital.',
  hook:`Charcot's triad (1868): nystagmus, dysarthria, and ataxia with intention tremor. [[Zalc2018]]`},
 {y:1916,l:1,c:'Dawson: "disseminated sclerosis"',h:'Dawson: the histology of disseminated sclerosis',t:'1916 · Dawson under the microscope',
  txt:`James W. Dawson published "The histology of disseminated sclerosis" in the Transactions of the Royal Society of Edinburgh (volume 50, pages 517–740). Disseminated sclerosis is one of the disease's former names. [[Dawson1916]]`},
 {y:1933,l:2,c:'Rivers: myelin damage in monkeys',h:'Rivers: brain tissue injections in monkeys',t:'1933 · The animal model begins',
  txt:`Rivers and colleagues showed that repeated injections of normal rabbit brain tissue caused encephalomyelitis with myelin destruction in monkeys. This work is the origin of experimental autoimmune encephalomyelitis (EAE), which has been central to MS drug development. [[Rivers1933,Constantinescu2011]]`},
 {y:1935,l:2,c:'EAE in 7 of 8 monkeys',h:'Rivers and Schwentker: 7 of 8 monkeys',t:'1935 · EAE confirmed',
  txt:`Rivers and Schwentker repeated the injections: 7 of 8 monkeys developed encephalomyelitis with myelin destruction. EAE remains debated as a model, since no animal model reproduces the full pathology of MS. [[Rivers1935,Sriram2005,Reich2018]]`},
 {y:1935.4,l:4,c:'a review lists 158 treatments',h:'A review counts 158 treatments',t:'1935 · 158 treatments',
  txt:`A 1935 review counted 158 treatments then used in MS. [[Murray2009]]`,
  pt:'A long list of remedies usually means none of them works well.'},
 {y:1946,l:0,c:'Lawry founds a society (unverified)',h:'Sylvia Lawry founds a society (unverified)',t:'1946 · A patient society (unverified)',
  txt:`Sylvia Lawry is reported to have founded the society now called the US National MS Society in New York on 11 March 1946, as the Association for Advancement of Research on Multiple Sclerosis. This rests only on society and encyclopaedia pages, so it is marked unverified here. [[NMSS-Lawry]]`},
 {y:1965,l:3,c:'Schumacher criteria',h:'Schumacher criteria for trials',t:'1965 · Criteria for trials',
  txt:`A panel led by G.A. Schumacher published criteria for trials of MS therapy, known as the Schumacher criteria. [[Schumacher1965]]`},
 {y:1971,l:4,c:'copolymer 1 suppresses EAE',h:'Copolymer 1 suppresses EAE',t:'1971 · From the model to a molecule',
  txt:`Teitelbaum, Meshorer, Hirshfeld, Arnon and Sela reported that a synthetic polypeptide, copolymer 1 (later glatiramer acetate), suppressed EAE. It reached FDA approval as Copaxone 25 years later. [[Teitelbaum1971,FDA-Copaxone]]`},
 {y:1972,l:2,c:'delayed visual evoked response',h:'Halliday: the delayed visual evoked response',t:'1972 · Slowed signals, measured',
  txt:`Halliday, McDonald and Mushin first reported the delayed (prolonged-latency) visual evoked response in optic neuritis: the electrical signature of slowed conduction in a demyelinated optic nerve. [[Halliday1972]]`},
 {y:1981,l:2,c:'first MRI: 112 lesions CT missed',h:'Young: the first MRI of MS',t:'1981 · MRI sees the lesions',
  txt:`The first MRI ("NMR") study of MS, in 10 patients, found 112 lesions in addition to the 19 seen on CT. MRI showed abnormalities "on a scale not previously seen except at necropsy". [[Young1981]]`,
  pt:'For the first time, doctors could see the patches of damage in a living person.'},
 {y:1983,l:3,c:'Poser criteria',h:'Poser criteria',t:'1983 · Poser criteria',
  txt:`The Poser criteria followed as guidelines for research protocols. The McDonald 2001 criteria later dropped their terms "clinically definite" and "probable MS". [[Poser1983,McDonald2001]]`},
 {y:1983.6,l:3,c:`Kurtzke's EDSS`,h:`Kurtzke's Expanded Disability Status Scale`,t:'1983 · The EDSS',
  txt:`Kurtzke expanded his earlier 0–10 Disability Status Scale into the EDSS by splitting each step into half-steps, built on eight Functional Systems. [[Kurtzke1983]] <a href="#edss" data-go="edss">Explore the EDSS</a>.`},
 {y:1993,l:4,c:'Betaseron approved, 23 July',h:'Interferon beta-1b: Betaseron approved',t:'1993 · Interferon beta-1b',
  txt:`In the pivotal interferon beta-1b trial (372 people), 8 MIU every other day reduced the annual relapse rate from 1.27 on placebo to 0.84. The FDA approved Betaseron on 23 July 1993. [[IFNB1993,FDA-Betaseron]]`,
  hook:'Approval dates: Betaseron (interferon beta-1b) 23 July 1993; Copaxone (glatiramer acetate) 20 December 1996. [[FDA-Betaseron,FDA-Copaxone]]'},
 {y:1995,l:4,c:'copolymer 1: relapses down 29%',h:'Copolymer 1 phase III trial',t:'1995 · Copolymer 1 works in people',
  txt:`In the phase III copolymer 1 trial (251 people), the 2-year relapse rate fell by 29%: 1.19 vs 1.68 on placebo (p = 0.007). Per year, the placebo figure is 0.84. The drawing uses the 2-year figures the trial reported, so these bars are not on the same time base as the yearly interferon bars. [[Johnson1995]]`},
 {y:1996.97,l:4,c:'Copaxone approved, 20 December',h:'Glatiramer acetate: Copaxone approved',t:'1996 · Glatiramer acetate',
  txt:`The FDA approved Copaxone (glatiramer acetate) on 20 December 1996, 25 years after copolymer 1 was first shown to suppress EAE. [[FDA-Copaxone,Teitelbaum1971]]`},
 {y:2001,l:3,c:'McDonald criteria: MRI enters',h:'McDonald criteria (2001)',t:'2001 · MRI enters the diagnosis',
  txt:`The McDonald criteria brought MRI into the diagnosis of MS, with outcomes of "MS", "possible MS" or "not MS". [[McDonald2001]] <a href="#dx" data-go="dx">Try the criteria</a>.`,
  pt:'From 2001, a scan could help confirm MS earlier, without waiting for a second attack.'},
 {y:2005,l:3,c:'2005: timing, cord, PPMS',h:'McDonald 2005 revision',t:'2005 · First revision',
  txt:`The 2005 revision clarified dissemination in time, the use of spinal cord lesions, and the diagnosis of primary progressive MS. [[Polman2005]]`},
 {y:2010,l:3,c:'2010: one scan can be enough',h:'McDonald 2010 revision',t:'2010 · One scan',
  txt:`The 2010 revision allowed dissemination in space and time to be shown on a single scan in some circumstances. [[Polman2011]]`},
 {y:2017,l:3,c:'2017: CSF bands for timing',h:'McDonald 2017 revision',t:'2017 · Oligoclonal bands',
  txt:`The 2017 revision allowed CSF-specific oligoclonal bands to substitute for dissemination in time, and let symptomatic and cortical lesions count toward dissemination. [[Thompson2018]]`},
 {y:2022,l:2,c:'EBV: risk up 32-fold',h:'Epstein-Barr virus: a 32-fold risk',t:'2022 · Epstein-Barr virus',
  txt:`In more than 10 million young adults on US military duty (955 later diagnosed with MS), MS risk rose 32-fold after EBV infection (HR 32.4, 95% CI 4.3–245.3), but not after other viruses. Most reviews now call EBV a probable necessary but not sufficient cause. [[Bjornevik2022,Kettunen2024,Aloisi2023]] <a href="#risk" data-go="risk">More on EBV</a>.`,
  pt:'Almost everyone with MS has had the glandular-fever virus first, yet most people who catch it never get MS.'},
 {y:2024,l:3,c:'2024: optic nerve, all ages',h:'McDonald 2024 revision',t:'2024 · One approach for all',
  txt:`The 2024 McDonald revision (published 2025) is one approach for relapsing and progressive courses at all ages. It adds the optic nerve as a fifth location and accepts the central vein sign, paramagnetic rim lesions and CSF kappa free light chains as supporting evidence. In certain cases, radiologically isolated syndrome can fulfil a diagnosis. [[Montalban2025]]`}
];
const HIS_ERA=[{f:1820,a:1822,t:'A diary and an atlas'},{f:1850,a:1868,t:'Charcot names it'},{f:1900,a:1916,t:'Pathology and a model'},{f:1960,a:1965,t:'Criteria and scanners'},{f:1990,a:1993,t:'The first treatments'},{f:2000,a:2001,t:'MRI criteria and EBV'}];
const HIS_NAMES=[['Sclérose en plaques',1868],['Disseminated sclerosis',1916],['Multiple sclerosis',null]];
inits.history=()=>{
  const svg=$('#hiSvg'),rg=$('#hiT');
  /* piecewise axis: 1820–1870, 1870–1960, 1960–1990, 1990–2025 */
  const BR=[ [1820,0],[1870,.24],[1960,.40],[1990,.60],[2025,1] ];
  const fx=y=>{for(let i=1;i<BR.length;i++)if(y<=BR[i][0]||i===BR.length-1)return lerp(BR[i-1][1],BR[i][1],clamp((y-BR[i-1][0])/(BR[i][0]-BR[i-1][0])));return 1};
  const fy=u=>{for(let i=1;i<BR.length;i++)if(u<=BR[i][1]||i===BR.length-1)return lerp(BR[i-1][0],BR[i][0],clamp((u-BR[i-1][1])/(BR[i][1]-BR[i-1][1])));return 2025};
  const tOfY=y=>clamp(fx(y));
  let XA=150,XB=700;const xOf=y=>XA+(XB-XA)*fx(y);
  const steps=HIS_ERA.map((E,i)=>({from:i?tOfY(E.f):0,at:Math.min(1,tOfY(E.a)+.004),t:E.t}));
  const eraOf=y=>{let e=0;HIS_ERA.forEach((E,i)=>{if(y>=E.f)e=i});return e};
  const T=(x,y,c,st,v)=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${v}</text>`;
  const RC=(x,y,w,h,st,r=4)=>`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="${r}" style="${st}"/>`;
  const LN=(x1,y1,x2,y2,st)=>`<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" style="${st}"/>`;
  const PANEL='fill:var(--panel);stroke:var(--line)';
  const eye=(x,y,r,off,st)=>`<path d="M${f1(x-r*1.6)} ${f1(y)} Q${f1(x)} ${f1(y-r*1.3)} ${f1(x+r*1.6)} ${f1(y)} Q${f1(x)} ${f1(y+r*1.3)} ${f1(x-r*1.6)} ${f1(y)}Z" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.4"/><circle cx="${f1(x+off)}" cy="${f1(y)}" r="${f1(r*.55)}" style="${st||'fill:var(--brand)'}"/><circle cx="${f1(x+off)}" cy="${f1(y)}" r="${f1(r*.22)}" style="fill:var(--ink)"/>`;
  const doc=(x,y,w,h,ttl,c)=>RC(x,y,w,h,PANEL,5)+LN(x+8,y+14,x+w-8,y+14,`stroke:${c};stroke-width:2`)+LN(x+8,y+24,x+w-14,y+24,'stroke:var(--line);stroke-width:2')+LN(x+8,y+33,x+w-10,y+33,'stroke:var(--line);stroke-width:2')+T(x+w/2,y+h-7,'t-xs t-mid',`fill:${c};font-weight:700`,ttl);

  /* ---------- scenes: one drawing per era; every caption repeats a cited milestone ---------- */
  function diary(A,yr,N,t){let s='';
    const bx=A.x+8,by=A.y+18,bw=N?150:160,bh=104;
    s+=RC(bx,by,bw,bh,'fill:var(--gold-soft);stroke:var(--gold)',4)+LN(bx+bw/2,by,bx+bw/2,by+bh,'stroke:var(--gold);stroke-width:1.5');
    for(let k=0;k<6;k++){s+=`<path d="M${bx+8} ${by+22+k*13} q10 -4 20 0 t20 0 t20 0" style="fill:none;stroke:var(--muted);stroke-width:1;opacity:.6"/>`;
      s+=`<path d="M${bx+bw/2+8} ${by+22+k*13} q10 -4 20 0 t20 0 t20 0" style="fill:none;stroke:var(--muted);stroke-width:1;opacity:${k<4?.6:.25}"/>`}
    s+=T(bx+10,by+14,'t-xs','fill:var(--gold);font-weight:700','1822');
    s+=T(bx,by+bh+16,'t-xs','',`a diary (d'Esté)`);
    const ex=A.x+(N?58:64),ey=A.y+184,bl=yr>=1822?1.5+Math.sin(t*400)*.8:0;
    s+=`<g style="filter:blur(${f1(bl)}px)">${eye(ex-22,ey,10,0)}${eye(ex+22,ey,10,0)}</g>`;
    if(yr>=1822)s+=T(ex-38,ey+30,'t-xs','fill:var(--attack)','optic neuritis in both eyes');
    const plate=(x,w,ttl,q)=>{const y=A.y+12,h=148;let p=RC(x,y,w,h,'fill:var(--cell);stroke:var(--cell-line);stroke-width:1.4',3)+RC(x+6,y+6,w-12,h-36,'fill:none;stroke:var(--cell-line);stroke-width:.8',2);
      const cx=x+w/2,cy=y+60;p+=`<path d="M${f1(cx-26)} ${cy-34} Q${f1(cx)} ${cy-48} ${f1(cx+26)} ${cy-34} L${f1(cx+14)} ${cy+30} Q${f1(cx)} ${cy+40} ${f1(cx-14)} ${cy+30}Z" style="fill:var(--myelin);stroke:var(--cell-line);stroke-width:1.2;opacity:.85"/>`;
      [ [-10,-18,7],[9,-6,6],[-4,14,5],[12,-26,4] ].forEach(([dx,dy,r])=>{p+=`<ellipse cx="${f1(cx+dx)}" cy="${cy+dy}" rx="${r}" ry="${f1(r*.75)}" style="fill:var(--mac);opacity:.7"/>`});
      p+=T(cx,y+h-14,'t-xs t-mid','fill:var(--ink);font-weight:700',ttl)+T(cx,y+h-3,'t-xs t-mid','',q);return p};
    const px=A.x+(N?172:194),pw=N?92:100;
    if(yr>=1838)s+=plate(px,pw,'Carswell','by 1838');
    if(yr>=1841)s+=plate(px+pw+(N?10:14),pw,'Cruveilhier','1841 or later?');
    if(yr<1838)s+=T(px,A.y+80,'t-xs','','no drawing of the lesions yet');
    return s}
  function charcot(A,yr,N,t){let s='';
    if(yr>=1856){for(let k=0;k<15;k++)s+=`<circle cx="${A.x+14+(k%5)*14}" cy="${A.y+20+Math.floor(k/5)*14}" r="4.5" style="fill:var(--attack);opacity:.75"/>`;
      s+=T(A.x+8,A.y+74,'t-xs','','15 cases, 1856')}
    if(yr>=1866)s+=doc(A.x+(N?110:120),A.y+10,70,62,'Vulpian 1866','var(--attack)');
    if(yr>=1868){s+=T(A.x+(N?200:216),A.y+34,'t-big','font:italic 700 '+(N?17:20)+'px Georgia,serif;fill:var(--attack)','sclérose');
      s+=T(A.x+(N?200:216),A.y+58,'t-big','font:italic 700 '+(N?17:20)+'px Georgia,serif;fill:var(--attack)','en plaques');
      s+=T(A.x+(N?200:216),A.y+74,'t-xs','','Charcot, La Salpêtrière, 1868');
      const w=A.w/3,y=A.y+150;
      // nystagmus: a darting eye
      const off=Math.sin(t*2600)*4;s+=eye(A.x+w*.5,y,13,off)+T(A.x+w*.5,y+44,'t-xs t-mid','fill:var(--ink)','nystagmus');
      s+=`<path d="M${f1(A.x+w*.5-26)} ${y-22} h10 M${f1(A.x+w*.5+16)} ${y-22} h10" style="stroke:var(--attack);stroke-width:1.6" marker-end="url(#hiAr)"/>`;
      // dysarthria: a speech bubble with broken syllables
      const bx=A.x+w*1.5;s+=`<path d="M${f1(bx-40)} ${y-24} h80 a8 8 0 0 1 8 8 v24 a8 8 0 0 1 -8 8 h-50 l-10 10 v-10 h-20 a8 8 0 0 1 -8 -8 v-24 a8 8 0 0 1 8 -8z" style="${PANEL}"/>`;
      s+=T(bx,y-4,'t-sm t-mid','fill:var(--ink)','da · da · da')+T(bx,y+44,'t-xs t-mid','fill:var(--ink)','dysarthria');
      // intention tremor: a hand reaching for a dot, wobbling more near it
      const hx=A.x+w*2.5-22;let d=`M${f1(hx)} ${y+14}`;for(let k=1;k<=24;k++){const u=k/24;d+=` L${f1(hx+u*44)} ${f1(y+14-u*28+Math.sin(k*1.7+t*900)*u*6)}`}
      s+=`<path d="${d}" style="fill:none;stroke:var(--attack);stroke-width:1.8"/><circle cx="${f1(hx+48)}" cy="${y-16}" r="5" style="fill:var(--ink)"/>`+T(A.x+w*2.5,y+44,'t-xs t-mid','fill:var(--ink)',N?'intention tremor':'ataxia, intention tremor')}
    else if(yr<1856)s+=T(A.x+8,A.y+120,'t-xs','','descriptions scattered, no agreed disease');
    return s}
  function lab(A,yr,N,t){let s='';
    if(yr>=1916){const sx=A.x+8,sy=A.y+12,sw=N?132:170;
      s+=RC(sx,sy,sw,64,'fill:var(--csf);stroke:var(--line)',4);
      s+=`<path d="M${sx+sw*.5} ${sy+6} q8 26 0 52" style="fill:none;stroke:var(--vessel);stroke-width:3"/>`;
      s+=`<ellipse cx="${sx+sw*.5+3}" cy="${sy+32}" rx="${sw*.22}" ry="20" style="fill:var(--attack-soft);stroke:var(--attack);stroke-width:1;opacity:.85"/>`;
      s+=T(sx,sy+78,'t-xs','','Dawson 1916: the histology')}
    if(yr>=1933){const mx=A.x+(N?176:200),my=A.y+24;
      for(let k=0;k<8;k++){const x=mx+(k%4)*(N?44:50),y=my+Math.floor(k/4)*42,sick=yr>=1935&&k<7;
        s+=`<circle cx="${x-9}" cy="${y-6}" r="5" style="fill:var(--mac);opacity:.6"/><circle cx="${x+9}" cy="${y-6}" r="5" style="fill:var(--mac);opacity:.6"/><circle cx="${x}" cy="${y}" r="12" style="fill:${sick?'var(--attack-soft)':'var(--cell)'};stroke:${sick?'var(--attack)':'var(--mac)'};stroke-width:1.6"/><circle cx="${x-4}" cy="${y-2}" r="1.6" style="fill:var(--ink)"/><circle cx="${x+4}" cy="${y-2}" r="1.6" style="fill:var(--ink)"/>`}
      s+=T(mx-12,my+86,'t-xs','',yr>=1935?'EAE: 7 of 8 monkeys, 1935':'injections of brain tissue, 1933')}
    if(yr>=1935.4){const lx=A.x+8,ly=A.y+(N?118:120);
      s+=RC(lx,ly,N?120:130,64,'fill:var(--gold-soft);stroke:var(--gold)',6)+T(lx+(N?60:65),ly+30,'t-big t-mid','fill:var(--gold);font-size:22px','158')+T(lx+(N?60:65),ly+48,'t-xs t-mid','','treatments, 1935')}
    if(yr>=1946){const ox=A.x+(N?176:200),oy=A.y+130;
      s+=`<path d="M${ox} ${oy+20} l40 -22 l40 22 z" style="${PANEL}"/>`+RC(ox+6,oy+20,68,40,PANEL,2);
      [0,1,2].forEach(k=>{s+=RC(ox+14+k*20,oy+28,10,24,'fill:var(--orange-soft);stroke:var(--orange)',2)});
      s+=T(ox,oy+76,'t-xs','fill:var(--orange)','a society, 1946')+T(ox,oy+88,'t-xs','','(unverified)')}
    if(yr<1916)s+=T(A.x+8,A.y+120,'t-xs','','the century turns; the microscope comes next');
    return s}
  function scan(A,yr,N,t){let s='';
    if(yr>=1965)s+=doc(A.x+(N?236:262),A.y+8,62,58,'Schumacher','var(--gold)');
    if(yr>=1983)s+=doc(A.x+(N?236:262),A.y+74,62,58,'Poser','var(--gold)');
    if(yr>=1983.6){const ex=A.x+(N?318:346),ey=A.y+10,eh=150;s+=RC(ex,ey,18,eh,'fill:var(--panel-2);stroke:var(--line)',4);
      for(let k=0;k<=10;k+=2){const y=ey+eh-k*eh/10;s+=LN(ex,y,ex+18,y,'stroke:var(--muted)')+T(ex+24,y+3,'t-xs','',k)}
      s+=T(ex-4,ey+eh+14,'t-xs','fill:var(--gold);font-weight:700','EDSS')}
    if(yr>=1971&&yr<1981||yr>=1981&&!N){const fx2=A.x+(N?236:262),fy2=A.y+(N?168:150);
      s+=`<path d="M${fx2+10} ${fy2} v18 l-12 26 h44 l-12 -26 v-18z" style="fill:var(--rx-soft);stroke:var(--rx);stroke-width:1.6"/>`+T(fx2-2,fy2+58,'t-xs','fill:var(--rx)','copolymer 1, 1971')}
    if(yr>=1972){const vx=A.x+8,vy=A.y+(yr>=1981?178:40),vw=N?150:170;
      s+=T(vx,vy-8,'t-xs','','visual evoked response');
      const tr=(dl,c)=>{let d='';for(let k=0;k<=40;k++){const u=k/40,p=u-.35-dl;d+=(k?'L':'M')+f1(vx+u*vw)+' '+f1(vy+18-24*Math.exp(-p*p*120)+10*Math.exp(-Math.pow(p-.12,2)*160))}return `<path d="${d}" style="fill:none;stroke:${c};stroke-width:1.6"/>`};
      s+=tr(0,'var(--muted)')+tr(.12,'var(--brand)')+T(vx+vw*.47,vy+38,'t-xs','fill:var(--brand)','delayed')}
    if(yr>=1981){const mx=A.x+8,my=A.y+8,mw=N?112:120;
      s+=RC(mx,my,mw,mw*.9,'fill:var(--mri-bg)',6)+`<ellipse cx="${mx+mw/2}" cy="${my+mw*.45}" rx="${mw*.4}" ry="${mw*.36}" style="fill:var(--mri-wm)"/><ellipse cx="${mx+mw/2}" cy="${my+mw*.45}" rx="${mw*.1}" ry="${mw*.16}" style="fill:var(--mri-csf)"/>`;
      [ [-18,-12,4],[16,-8,5],[-12,14,3.5],[20,12,4],[0,-26,3],[-26,4,3] ].forEach(([dx,dy,r],k)=>{s+=lesion(mx+mw/2+dx,my+mw*.45+dy,r,k+3,1)});
      s+=`<text x="${mx+6}" y="${f1(my+mw*.9-6)}" class="t-mri">MRI, 1981</text>`;
      const bx=mx+mw+12,by=my+10,bw=N?96:110;
      s+=T(bx,by,'t-xs','fill:var(--ink)',N?'lesions (n=10)':'lesions in 10 people');
      s+=RC(bx,by+8,bw*19/131,12,'fill:var(--muted)',2)+T(bx,by+34,'t-xs','','CT: 19');
      s+=RC(bx,by+42,bw*112/131,12,'fill:var(--brand)',2)+T(bx,by+68,'t-xs','fill:var(--brand)','MRI: 112 more')}
    return s}
  function rx(A,yr,N,t){let s='';
    const C={x:A.x+(N?30:40),y:A.y+46,h:130,w:N?170:200};
    s+=T(A.x+8,A.y+14,'t-xs','fill:var(--ink)','relapse rates, placebo vs drug');
    if(yr>=1995)s+=T(A.x+8,C.y+C.h+40,'t-xs','',N?'1.68 over 2 years = 0.84 a year':'different time bases: 1.68 over 2 years = 0.84 a year');
    s+=LN(C.x,C.y+C.h,C.x+C.w,C.y+C.h,'stroke:var(--muted)');
    const Yb=v=>C.y+C.h-C.h*v/1.8;
    const grp=(x,a,b,lab,sub,go)=>{let g='';const ga=clamp(go);
      g+=RC(x,Yb(a*ga),26,C.y+C.h-Yb(a*ga),'fill:var(--muted);opacity:.6',2)+RC(x+30,Yb(b*ga),26,C.y+C.h-Yb(b*ga),'fill:var(--rx)',2);
      if(ga>.95)g+=T(x+13,Yb(a)-4,'t-xs t-mid','fill:var(--ink)',a.toFixed(2))+T(x+43,Yb(b)-4,'t-xs t-mid','fill:var(--rx);font-weight:700',b.toFixed(2));
      g+=T(x+28,C.y+C.h+13,'t-xs t-mid','fill:var(--ink)',lab)+T(x+28,C.y+C.h+25,'t-xs t-mid','',sub);return g};
    if(yr>=1993)s+=grp(C.x+8,1.27,.84,'IFN beta-1b','yearly, 1993',(yr-1993)*3+.2);
    if(yr>=1995)s+=grp(C.x+(N?96:110),1.68,1.19,'copolymer 1','2-year, 1995',(yr-1995)*3+.2);
    s+=`<rect x="${C.x}" y="${C.y-14}" width="8" height="8" style="fill:var(--muted);opacity:.6"/>`+T(C.x+12,C.y-7,'t-xs','','placebo')+`<rect x="${C.x+66}" y="${C.y-14}" width="8" height="8" style="fill:var(--rx)"/>`+T(C.x+78,C.y-7,'t-xs','fill:var(--rx)','drug');
    const stamp=(x,y,l1,l2,l3)=>`<g transform="rotate(-6 ${x+55} ${y+30})">${RC(x,y,110,60,'fill:none;stroke:var(--rx);stroke-width:2.2',6)}${T(x+55,y+18,'t-xs t-mid','fill:var(--rx);font-weight:700','FDA APPROVED')}${T(x+55,y+35,'t-sm t-mid','fill:var(--rx);font-weight:700',l2)}${T(x+55,y+50,'t-xs t-mid','fill:var(--rx)',l3)}</g>`;
    const sx=A.x+(N?244:280);
    if(yr>=1993.56)s+=stamp(sx,A.y+20,'','Betaseron','23 July 1993');
    if(yr>=1996.97)s+=stamp(sx,A.y+104,'','Copaxone','20 December 1996');
    return s}
  function crit(A,yr,N,t){let s='';
    const D=[ [2001,'MRI in'],[2005,'cord, PPMS'],[2010,'one scan'],[2017,'CSF bands'],[2024,'optic nerve'] ],dw=N?64:70,gap=N?6:10;
    s+=T(A.x+8,A.y+12,'t-xs','fill:var(--ink)','McDonald criteria and revisions');
    D.forEach(([y,l],k)=>{if(yr<y)return;const x=A.x+8+k*(dw+gap),yy=A.y+20;
      s+=doc(x,yy,dw,62,String(y),'var(--gold)')+T(x+dw/2,yy+76,'t-xs t-mid','fill:var(--ink)',l)});
    if(yr>=2022){const ex=A.x+8,ey=A.y+130,ew=N?250:300;
      s+=T(ex,ey,'t-xs','fill:var(--ink)','MS risk after EBV infection (hazard ratio)');
      s+=RC(ex,ey+10,ew/32.4,14,'fill:var(--muted)',2)+T(ex+ew/32.4+6,ey+21,'t-xs','','1 · reference: no EBV infection');
      const g=clamp((yr-2022)*2+.3);s+=RC(ex,ey+32,ew*g,14,'fill:var(--brand)',2);
      if(g>.95)s+=T(ex,ey+62,'t-xs','fill:var(--brand);font-weight:700','32.4 after (95% CI 4.3–245.3)')}
    return s}
  const SCENE=[diary,charcot,lab,scan,rx,crit];

  function draw(t){
    const N=vb(svg,'720 672','400 812');
    const L=N
      ? {XA:20,XB:386,yrX:8,yrY:26,hX:8,hY:46,sc:[6,54,388,378],A:{x:14,y:62,w:372,h:232},C:{x:14,y:302,w:372,h:122},
         LY:i=>460+i*46,bandH:26,labUp:1,axY:680,tkY:698,brY:686,ticks:[1820,1870,1960,1990,2010,2025],
         obLX:4,obLY:722,obY:730,obMk:776,phTop:441,phBot:762,yY:796}
      : {XA:150,XB:700,yrX:10,yrY:24,hX:80,hY:23,sc:[6,34,708,250],A:{x:16,y:40,w:416,h:238},C:{x:446,y:40,w:262,h:238},
         LY:i=>314+i*50,bandH:46,labUp:0,axY:550,tkY:568,brY:556,ticks:[1820,1850,1870,1900,1930,1960,1980,1990,2000,2010,2025],
         obLX:10,obLY:602,obY:590,obMk:636,phTop:285,phBot:622,yY:656};
    XA=L.XA;XB=L.XB;
    const xp=lerp(XA,XB,t),yr=fy(t);
    let s=`<defs>${marker('hiAr','var(--attack)')}</defs>`;
    const done=HIS_EV.filter(e=>e.y<=yr+.01),cur=done.length?done[done.length-1]:null,ph=phaseOf(steps,t);
    if(cur)s+=T(L.yrX,L.yrY,'t-big',`font-size:22px;fill:${HIS_LANES[cur.l][1]}`,Math.floor(cur.y))+T(L.hX,L.hY,'t-lbl','',cur.h);
    else s+=T(L.yrX,L.yrY,'t-lbl','fill:var(--muted)','Press play: the first milestone is 1822');
    s+=RC(L.sc[0],L.sc[1],L.sc[2],L.sc[3],'fill:var(--field);stroke:var(--line)',12);
    s+=SCENE[ph](L.A,yr,N,t);
    s+=LN(N?L.C.x:L.C.x-12,N?L.C.y-8:L.A.y,N?L.C.x+L.C.w:L.C.x-12,N?L.C.y-8:L.A.y+L.A.h,'stroke:var(--line)');
    s+=T(L.C.x,L.C.y+12,'t-sm','fill:var(--ink)',HIS_ERA[ph].t.toUpperCase());
    const inEra=HIS_EV.filter(e=>eraOf(e.y)===ph&&e.y<=yr+.01);
    inEra.forEach((e,k)=>{const y=L.C.y+32+k*(N?15:20);
      s+=`<circle cx="${L.C.x+5}" cy="${y-4}" r="4" style="fill:${HIS_LANES[e.l][1]}"/>`;
      s+=`<text x="${L.C.x+16}" y="${y}" class="t-xs"><tspan style="fill:var(--ink);font-weight:700">${Math.floor(e.y)}</tspan>  ${e.c}</text>`});
    if(!inEra.length)s+=T(L.C.x+16,L.C.y+32,'t-xs','','the playhead has not reached this era yet');
    HIS_LANES.forEach(([n,c],i)=>{const y=L.LY(i);
      s+=RC(XA-4,y-L.bandH/2,XB-XA+10,L.bandH,`fill:var(--panel-2);opacity:${i%2?.35:.7}`,8);
      s+=T(L.labUp?XA-4:10,L.labUp?y-L.bandH/2-6:y+4,'t-sm',`fill:${c}`,n);
      s+=LN(XA,y,XB,y,`stroke:${c};stroke-width:1;opacity:.35`)});
    s+=`<line x1="${XA}" x2="${XB}" y1="${L.axY}" y2="${L.axY}" class="axis" style="stroke:var(--muted)"/>`;
    L.ticks.forEach(y=>{const x=xOf(y);s+=LN(x,L.axY-4,x,L.axY+4,'stroke:var(--muted)')+T(x,L.tkY,'t-xs t-mid','',y)});
    [1870,1960,1990].forEach(y=>{const x=xOf(y);s+=`<path d="M${f1(x-4)} ${L.brY} l4 -12 M${f1(x)} ${L.brY} l4 -12" style="stroke:var(--muted);stroke-width:1"/>`});
    const gapMin=12*(XB-XA)/550,dyO=N?7:9,last={};
    HIS_EV.forEach(e=>{const x=xOf(e.y),p=last[e.l];e.dy=p&&x-p.x<gapMin?(p.dy>0?-dyO:dyO):0;if(e.dy&&p&&!p.dy)p.dy=-e.dy;last[e.l]={x,dy:e.dy}});
    HIS_EV.forEach(e=>{const x=xOf(e.y),y=L.LY(e.l)+e.dy,c=HIS_LANES[e.l][1],pass=e.y<=yr+.01;
      if(!pass)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="4.5" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.2;opacity:.6"/>`;
      else if(e===cur){const k=ramp(xp-x,0,26);s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(8+(N?7:12)*k)}" style="fill:none;stroke:${c};stroke-width:2;opacity:${f1(.8*(1-k))}"/><circle cx="${f1(x)}" cy="${f1(y)}" r="8" style="fill:${c};stroke:var(--ink);stroke-width:2"/>`}
      else s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="5" style="fill:${c}"/>`;
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="10" class="clk" data-hy="${e.y}" style="fill:transparent"/>`});
    // treatment band: qualitative
    s+=T(L.obLX,L.obLY,'t-sm','','Treatment')+T(L.obLX+(N?74:0),L.obLY+(N?0:14),'t-xs','','qualitative');
    s+=RC(XA,L.obY,XB-XA,28,'fill:var(--panel-2)',6);
    const x93=xOf(1993);
    s+=RC(XA,L.obY,Math.max(0,Math.min(xp,x93)-XA),28,'fill:var(--muted);opacity:.45',6);
    if(xp>x93)s+=RC(x93,L.obY,xp-x93,28,'fill:var(--rx);opacity:.85',6);
    s+=`<clipPath id="hiClip"><rect x="${XA}" y="${L.obY}" width="${f1(Math.max(0,xp-XA))}" height="28"/></clipPath><g clip-path="url(#hiClip)">${T(XA+8,L.obY+18,'t-xs','fill:var(--ink);font-weight:700',N?'no approved DMT':'no approved disease-modifying drug')}${T(x93+6,L.obY+18,'t-xs','fill:var(--panel);font-weight:700',N?'DMTs':'approved DMTs')}</g>`;
    if(xp>x93)s+=LN(x93,L.obY-4,x93,L.obY+32,'stroke:var(--ink);stroke-width:1.5')+T(x93-4,L.obMk,'t-xs t-end','','1993: Betaseron approved');
    s+=LN(xp,L.phTop,xp,L.phBot,'stroke:var(--ink);stroke-width:1.4;opacity:.55')+`<path d="M${f1(xp-5)} ${L.axY} L${f1(xp+5)} ${L.axY} L${f1(xp)} ${L.axY-8}Z" style="fill:var(--ink)"/>`;
    s+=T(Math.min(XB-6,Math.max(XA+6,xp)),L.yY,'t-xs t-mid','fill:var(--ink)',Math.floor(yr));
    svg.innerHTML=s;
    setSt(ph);
    $('#hiRead').innerHTML=`<span>year <b>${Math.floor(yr)}</b></span><span>milestones passed <b>${done.length} of ${HIS_EV.length}</b></span><span>era <b>${HIS_ERA[ph].t}</b></span>`;
    $('#hiNote').innerHTML=cur?`<div class="kicker">${HIS_LANES[cur.l][0]}</div>`+noteHTML({t:cur.t,txt:cur.txt,pt:cur.pt,hook:cur.hook}).replace('<div class="kicker"></div>',''):noteHTML({k:'1820',t:'Before the first record',txt:'No one had yet described the disease. Press play, drag the timeline, or click any dot.',pt:'The story starts with a young man losing his sight in 1822.'});
  }
  const stop=playWire(rg,$('#hiPlay'),draw,26000,'Replay','history');
  const setSt=stepWire($('#hiSteps'),steps,rg,draw,stop);
  const jump=y=>{stop();const t=clamp(tOfY(y)+.002);rg.value=t;draw(t)};
  svg.addEventListener('click',e=>{const d=e.target.closest('[data-hy]');if(d)jump(+d.dataset.hy)});
  $('#hiYears').innerHTML=HIS_EV.map(e=>`<button class="tag" data-hy2="${e.y}"><b style="font-weight:700">${Math.floor(e.y)}</b>&nbsp;${e.h.replace(/&/g,'&amp;').replace(/</g,'&lt;')}</button>`).join('');
  $('#hiYears').addEventListener('click',ev=>{const b=ev.target.closest('[data-hy2]');if(b){jump(+b.dataset.hy2);$('#hiSvg').scrollIntoView({block:'nearest',behavior:RM?'auto':'smooth'})}});
  $('#hiChips').innerHTML=HIS_NAMES.map(([n,y])=>y?`<button class="tag" data-hn="${y}">${n}<small>${y}</small></button>`:`<span class="tag">${n}</span>`).join('');
  $('#hiChips').addEventListener('click',e=>{const b=e.target.closest('[data-hn]');if(b){jump(+b.dataset.hn);$('#hiSvg').scrollIntoView({block:'nearest',behavior:RM?'auto':'smooth'})}});
  $('#hiCards').innerHTML=`
   <div class="card"><span class="tag warn">Controversy</span><h4>Who drew MS first?</h4><p>Compston dates Carswell's plate (by 1838) before Cruveilhier's (1841 or later). Zalc agrees about one Cruveilhier plate but says doubt remains over the other. [[Compston1988,Zalc2018]]</p></div>
   <div class="card"><h4>Charcot's triad</h4><p>Nystagmus, dysarthria, and ataxia with intention tremor. Charcot's 1868 description also covered cognitive features and spinal signs, and built on cases he had shared with Vulpian. [[Zalc2018]] <a href="#symptoms" data-go="symptoms">Today's symptom map</a>.</p></div>
   <div class="card"><h4>From a model to a medicine</h4><p>EAE began with injections of brain tissue into monkeys in the 1930s. Copolymer 1 suppressed EAE in 1971, cut relapses by 29% in a 1995 trial, and was approved as Copaxone in December 1996. [[Rivers1935,Teitelbaum1971,Johnson1995,FDA-Copaxone]]</p></div>
   <div class="card"><h4>Seeing the damage</h4><p>Before 1981 most lesions were seen only at autopsy. The first MRI study found 112 lesions that CT had missed, and twenty years later the McDonald criteria made MRI part of the diagnosis. [[Young1981,McDonald2001]]</p></div>
   <div class="card"><h4>Criteria keep changing</h4><p>Schumacher (1965) and Poser (1983) were written for research. McDonald 2001 was revised in 2005, 2010, 2017 and 2024, each time letting MRI or CSF findings do more of the work. <a href="#dx" data-go="dx">Compare 2017 and 2024</a>. [[Schumacher1965,Poser1983,Polman2005,Polman2011,Thompson2018,Montalban2025]]</p></div>
   <div class="card"><span class="tag">Unverified</span><h4>Sylvia Lawry, 1946</h4><p>The founding of the US society now called the National MS Society by Sylvia Lawry on 11 March 1946 is widely repeated, but our only sources are society and encyclopaedia pages. [[NMSS-Lawry]]</p></div>`;
  draw(+rg.value);
};
