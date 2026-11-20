/* =============== 1.1 What colorectal cancer is =============== */
/* Six scenes on one scrubber. Each step carries an incidence note and, where the sources give
   death figures, a mortality note (mort); steps without one append a line saying so. */
const WH_STEPS=[
 {from:0,at:.06,k:'Worldwide · GLOBOCAN 2022 and 2024',t:'A common cancer worldwide',
  txt:`In GLOBOCAN 2022, colorectal cancer was the third most diagnosed cancer in the world: 9.6% of all new cancers, after lung (12.4%) and female breast (11.6%). The 2024 estimates, published in 2026, count 2,041,007 new cases (rank 3): 1,138,656 in men and 902,351 in women. The age-standardised rate is 22.4 per 100,000 in men and 15.3 in women, and the cumulative risk from birth to 74 is 2.58% and 1.72%. [[Bray2024,Sung2026]]`,
  pt:`About 2 million people in the world learn they have bowel cancer each year. [[Sung2026]]`,
  hook:`CRC is the third most common cancer and the second leading cause of cancer death worldwide. [[Bray2024,Sung2026]]`,
  mort:{txt:`Colorectal cancer was the second leading cause of cancer death in GLOBOCAN 2022: 9.3% of cancer deaths, after lung (18.7%). In 2024 it caused an estimated 917,895 deaths (rank 2): 504,807 men and 413,088 women, age-standardised 9.6 and 6.3 per 100,000. [[Bray2024,Sung2026]]`,
   pt:`Only lung cancer kills more people with cancer worldwide. [[Bray2024]]`}},
 {from:.15,at:.255,k:'Worldwide · 2020 → 2040',t:'A growing burden',
  txt:`GLOBOCAN 2020 counted over 1.9 million new cases; the 2024 round counts 2,041,007. A projection from the 2020 estimates expects 3.2 million new cases a year by 2040, mostly in countries with a high or very high Human Development Index (HDI). Japan's incidence quadrupled between 1970 and 1990 alongside post-war economic development, and similar rises are now seen in many transitioning countries <span class="ev est">Established</span>. [[Morgan2023,Sung2026]]`,
  pt:`Ageing populations, Western diets, obesity, inactivity and smoking are pushing the numbers up. [[Dekker2019]]`,
  hook:`2040 projection: 3.2 million new cases and 1.6 million deaths a year. [[Morgan2023]]`,
  mort:{txt:`GLOBOCAN 2020 counted 930,000 deaths and the 2024 round 917,895. They come from different estimation rounds, so the small difference is not a trend. The 2040 projection is 1.6 million deaths a year. About 10% of new cases worldwide are attributed to modifiable risk factors (in men: smoking, alcohol, high BMI and inactivity); a US study with a broader set of factors estimated that up to 55% could be prevented. [[Morgan2023,Sung2026]]`,
   pt:`Deaths are expected to rise with the number of cases, unless prevention and screening reach more people. [[Morgan2023,Sung2026]]`}},
 {from:.32,at:.385,k:'Worldwide · rates per 100,000',t:'Five- to six-fold variation',
  txt:`Incidence varies five- to six-fold between regions. The highest rates are in Europe, Australia/New Zealand and Northern America (30–40 per 100,000 in men, 24–32 in women); the lowest are in Eastern, Western and Middle Africa and South-Central Asia (5–8). In 2020 the extremes were 40.6 (men, Australia/New Zealand and European regions) and 4.4 (women, Southern Asia). Incidence is up to four times higher in higher-HDI countries. [[Sung2026,Morgan2023]]`,
  pt:`Bowel cancer is far more common in richer countries, but people diagnosed in poorer countries are more likely to die of it. [[Sung2026]]`,
  hook:`Higher-HDI countries: higher incidence. Lower-HDI countries: higher case fatality, so mortality varies less. [[Sung2026]]`,
  mort:{txt:`Death rates vary less than case rates, because case fatality is higher in lower-HDI countries. In 2020, mortality ranged from 20.2 per 100,000 (men, Eastern Europe) to 2.5 (women, Southern Asia). Long-standing falls in incidence and mortality in historically high-risk countries in Europe, Oceania and Northern America reflect lifestyle change, such as less smoking, and screening, which has sped up progress since the early 2000s <span class="ev est">Established</span>. [[Sung2026,Morgan2023]]`}},
 {from:.47,at:.555,k:'Where in the bowel · US 2018–2022',t:'Where in the bowel',
  txt:`Colorectal cancer can start anywhere from the caecum to the rectum. US incidence by subsite (per 100,000, all ages, 2018–2022) is 13.3 for the proximal colon, 8.7 for the distal colon, 11.1 for the rectum and 2.2 not otherwise specified. As shares, that is about 38% proximal, 25% distal, 31% rectum and 6% unspecified: these shares are derived from ACS incidence rates, not published as such. Rectal cancer made up 32% of all colorectal cancer in 2022, up from 27% in 2004, and its incidence rose 1% a year from 2018 to 2022. [[Siegel2026CRC]]`,
  pt:`About two in three bowel cancers start in the colon and one in three in the rectum, the last part of the bowel before the anus. [[Siegel2026CRC]]`,
  hook:`Men's excess grows along the bowel: incidence 9% higher than women's for the proximal colon, 41% for the distal colon, 57% for the rectum. [[Siegel2026CRC]]`,
  mortNote:'The sources give no death rates by subsite, so this scene shows incidence in both modes.'},
 {from:.63,at:.715,k:'Age · US 2026 projection',t:'Mostly after 50, rising younger',
  txt:`Of the 158,850 US cases projected for 2026, 24,640 (16%) are in people under 50, 47,600 (30%) at 50–64 and 86,610 (55%) at 65 or older. From 2002 to 2012 incidence at 65 and older fell 4–5% a year, credited to widespread colonoscopy after Medicare expanded coverage in 2001. From 2013 to 2022 it fell 2.5% a year at 65 and older but rose 0.4% a year at 50–64 and 3% a year at 20–49. 45% of new diagnoses are now in people under 65, up from 27% in 1995. [[Siegel2026CRC]]`,
  pt:`Most bowel cancer happens in people over 50, but it is becoming more common in younger adults. Doctors do not yet know why. [[Siegel2026CRC]]`,
  hook:`US lifetime risk: about 1 in 24 men and 1 in 26 women; 0.4% before age 50. [[Siegel2025]]`,
  mort:{txt:`Of 55,230 US deaths projected for 2026, 3,890 (7%) are under 50, 13,480 (24%) at 50–64 and 37,860 (69%) at 65 or older. Death rates have risen 1% a year under 50 since 2004 and 1.2% a year at 50–64 from 2019 to 2023, but fallen 2.3% a year at 65 and older since 2012. In the late 1990s colorectal cancer was the fourth leading cause of cancer death in adults under 50; it now ranks first. [[Siegel2026CRC,Siegel2024]]`,
   hook:`CRC is now the leading cause of cancer death in US adults under 50. [[Siegel2026CRC]]`}},
 {from:.8,at:.97,k:'Birth cohort · US SEER 1974–2013',t:'Born later, higher risk',
  txt:`Risk tracks when you were born more than when you were diagnosed <span class="ev est">Established</span>. In US SEER data (490,305 cases, 1974–2013), people born around 1990 had about double the colon cancer risk (incidence rate ratio 2.40, 95% CI 1.11–5.19) and four times the rectal cancer risk (IRR 4.32, 2.19–8.51) of people born around 1950. Risk is rising in every US generation born after about 1950, and after about 1960 in Canada, Australia and England. Under 50, the distribution tilts to the left side: rectum 5.7, distal colon 4.1 and proximal colon 2.9 per 100,000, while at 65 and older the proximal colon dominates. [[Siegel2017,Siegel2026CRC]]`,
  pt:`Someone born in 1990 has a higher chance of bowel cancer at a given age than someone born in 1950 had at that age. [[Siegel2017]]`,
  hook:`Born ~1990 vs ~1950: colon IRR 2.40, rectal IRR 4.32. The young-onset rise is led by the distal colon and rectum. [[Siegel2017,Siegel2026CRC]]`,
  mortNote:'Birth-cohort ratios in the sources are for incidence; this scene shows incidence in both modes.'}
];
const WH_SURV_STEPS=[
 {from:0,at:.58,k:'US five-year relative survival',t:'Better over five decades',
  txt:`Five-year relative survival for colorectal cancer in the US rose from 50% for people diagnosed in 1975–77 to 61% in 1995–97 and 65% in 2015–2021 (64% in the 2014–20 table). Regional-stage survival rose from 52% to 74% and distant-stage survival from 5% to 15%. Distant-stage rectal cancer had one of the largest gains of any cancer, from 8% in the mid-1990s to 18%. New treatment options have doubled overall survival for advanced disease to about 3 years. [[Siegel2025,Siegel2026,Siegel2026CRC,Dekker2019]]`,
  pt:`More people survive bowel cancer than 50 years ago. These are averages across many people, not a promise for any one person. [[Siegel2026CRC]]`,
  hook:`US 5-year relative survival: 50% (1975–77) → 65% (2015–21). [[Siegel2026CRC]]`},
 {from:.62,at:1,k:'By SEER summary stage, 2015–2021',t:'Stage at diagnosis',
  txt:`Stage is the strongest predictor: 91% for localized disease, 74% for regional and 15% for distant. Regional-stage survival ranges from 81% under 50 to 69% at 65 and older; distant-stage survival is 23% under 50, 17% at 50–64 and 10% at 65 or older. Yet 60% of US cases were diagnosed at an advanced (regional or distant) stage in 2019, up from 52% in the mid-2000s. Internationally, CONCORD-3 found the highest colon cancer survival in South Korea (71.8%, 2010–14). How stage is defined: <a href="#staging" data-go="staging">Staging: TNM calculator</a>. [[Siegel2026,Siegel2026CRC,Siegel2023CRC,Allemani2018]]`,
  pt:`Cancer found early is much easier to treat. In the US, about 9 in 10 people with cancer that has not spread are alive 5 years later. These are averages, not a promise for any one person. [[Siegel2026CRC]]`,
  hook:`5-year relative survival by stage: localized 91%, regional 74%, distant 15%. [[Siegel2026]]`}
];

inits.what=()=>{
  const svg=$('#whSvg'),rg=$('#whT');let M='inc',setSt=()=>{};
  const fmt=n=>Math.round(n).toLocaleString('en-US');
  const T=(x,y,s,c='t-sm',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${s}</text>`;
  const R=(x,y,w,h,st)=>`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(Math.max(0,w))}" height="${f1(Math.max(0,h))}" style="${st}"/>`;
  const Ln=(x1,y1,x2,y2,st)=>`<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" style="${st}"/>`;
  const lines=(x,y,arr,c='t-sm',dy=15,st='')=>arr.map((l,i)=>T(x,y+i*dy,l,c,st)).join('');
  const loc=(ph,t)=>{const a=WH_STEPS[ph].from,b=ph<WH_STEPS.length-1?WH_STEPS[ph+1].from:1.04;return ease(clamp((t-a)/((b-a)*.75)))};
  const head=(x,y,s)=>T(x,y,s,'t-sm','fill:var(--tumour);font-weight:600');
  const incOnly=(N)=>M==='mort'?T(N?380:700,N?548:372,'deaths not broken down here: showing incidence','t-xs t-end','fill:var(--warn)'):'';

  /* ---- scene 0: rank and 2024 counts ---- */
  function s0(N,p){const inc=M==='inc';let s='';
    const bars=inc?[['Lung',12.4],['Female breast',11.6],['Colorectum',9.6]]:[['Lung',18.7],['Colorectum',9.3]];
    const bx0=N?112:130,bx1=N?350:400,by=N?62:86,gap=N?42:62,X=v=>bx0+(bx1-bx0)*v/25;
    s+=head(20,N?30:40,inc?'SHARE OF ALL NEW CANCERS · WORLD 2022':'SHARE OF ALL CANCER DEATHS · WORLD 2022');
    const yb=by+gap*3-10;
    [0,5,10,15,20,25].forEach(v=>{s+=Ln(X(v),by-10,X(v),yb,v?'stroke:var(--line);stroke-dasharray:2 4':'stroke:var(--line)')+T(X(v),yb+14,v+'%','t-xs t-mid')});
    bars.forEach(([n,v],i)=>{const y=by+i*gap,crc=n==='Colorectum',k=clamp(p*1.7-i*.25);
      s+=T(bx0-8,y+15,n,'t-lbl t-end',crc?'fill:var(--tumour)':'');
      s+=R(bx0,y,(X(v)-bx0)*k,22,`fill:${crc?'var(--tumour)':'var(--muted)'};opacity:${crc?1:.4}`);
      if(k>.97)s+=T(X(v)+6,y+16,f1(v)+'%  #'+(i+1),'t-sm',crc?'fill:var(--tumour);font-weight:600':'')});
    const rx=N?20:462,ry=N?266:62,W=N?360:236;
    const tot=inc?2041007:917895,men=inc?1138656:504807,wom=inc?902351:413088,am=inc?22.4:9.6,aw=inc?15.3:6.3,k=ramp(p,.15,.85);
    s+=head(rx,ry,inc?'NEW CASES · WORLD 2024':'DEATHS · WORLD 2024');
    s+=T(rx,ry+44,fmt(tot*k),'t-big','font-size:36px;fill:'+(inc?'var(--tumour)':'var(--ink)'));
    s+=T(rx,ry+66,inc?'rank 3 among all cancers':'rank 2 among cancer deaths','t-sm');
    const by2=ry+92,wm=W*men/tot*k,ww=W*wom/tot*k;
    s+=R(rx,by2,wm,24,'fill:var(--accent)')+R(rx+wm+2,by2,ww,24,'fill:var(--brand)');
    if(k>.97){s+=T(rx,by2+42,'Men '+fmt(men),'t-sm','fill:var(--accent);font-weight:600')+T(rx,by2+58,'ASR '+am,'t-xs');
      s+=T(rx+W,by2+42,'Women '+fmt(wom),'t-sm t-end','fill:var(--brand);font-weight:600')+T(rx+W,by2+58,'ASR '+aw,'t-xs t-end');
      s+=lines(rx,by2+86,['ASR: age-standardised rate per 100,000,','world standard population'],'t-xs',13)}
    if(p>.6){const cy=N?526:350;s+=T(20,cy,'Cumulative risk, birth to 74 (2024): ','t-sm')+T(N?20:262,N?cy+20:cy,inc?'men 2.58% · women 1.72%':'men 1.00% · women 0.64%','t-lbl',inc?'fill:var(--tumour)':'')}
    return s}

  /* ---- scene 1: 2020 → 2024 → 2040 ---- */
  function s1(N,p){const inc=M==='inc';let s='';
    const D=inc?[[2020,1.9,'over 1.9 M'],[2024,2.041,'2.04 M'],[2040,3.2,'3.2 M']]:[[2020,.93,'930,000'],[2024,.918,'917,895'],[2040,1.6,'1.6 M']];
    const x0=N?56:76,x1=N?384:440,y0=N?62:64,y1=N?300:318,Y=v=>y1-(y1-y0)*v/3.5;
    s+=head(20,N?30:40,inc?'NEW CASES A YEAR, WORLD':'DEATHS A YEAR, WORLD');
    [0,1,2,3].forEach(v=>s+=Ln(x0,Y(v),x1,Y(v),v?'stroke:var(--line);stroke-dasharray:2 4':'stroke:var(--line)')+T(x0-8,Y(v)+4,v?v+' M':'0','t-xs t-end'));
    const step=(x1-x0)/3,bw=N?64:78;
    D.forEach(([yr,v,l],i)=>{const k=ease(clamp(p*3.2-i*1.05)),cx=x0+step*(i+.5),h=(y1-Y(v))*k,proj=yr===2040;
      const col=inc?'var(--tumour)':'var(--ink)';
      s+=R(cx-bw/2,y1-h,bw,h,`fill:${col};opacity:${proj?.22:.85}`);
      if(proj&&k>0)s+=R(cx-bw/2,y1-h,bw,h,`fill:none;stroke:${col};stroke-width:1.6;stroke-dasharray:5 4`);
      s+=T(cx,y1+18,yr,'t-lbl t-mid')+T(cx,y1+32,proj?'projected':i?'GLOBOCAN 2024':'GLOBOCAN 2020','t-xs t-mid');
      if(k>.96)s+=T(cx,Y(v)-9,l,'t-lbl t-mid',`fill:${col}`)});
    const tx=N?20:478,ty=N?372:90;
    const L=inc?['2040 projection (from 2020):','3.2 million new cases a year,','mostly in high or very high','HDI countries.','','2020 and 2024 are separate','estimation rounds, not one','series.']
      :['2040 projection (from 2020):','1.6 million deaths a year.','','About 10% of cases worldwide','are attributed to modifiable','risk factors.','','2020 and 2024 are separate','estimation rounds.'];
    if(p>.7)s+=`<g style="opacity:${f1(ramp(p,.7,.9))}">${lines(tx,ty,L,'t-sm',17)}</g>`;
    return s}

  /* ---- scene 2: regional variation ---- */
  function s2(N,p){const inc=M==='inc';let s='';
    const rows=inc?[['Highest 2020: men, Aus/NZ & Europe',40.6],['Highest regions 2024: men',30,40],['Highest regions 2024: women',24,32],['World average 2024: men',22.4],['World average 2024: women',15.3],['Lowest regions 2024 (Africa, S-C Asia)',5,8],['Lowest 2020: women, Southern Asia',4.4]]
      :[['Highest 2020: men, Eastern Europe',20.2],['World average 2024: men',9.6],['World average 2024: women',6.3],['Lowest 2020: women, Southern Asia',2.5]];
    s+=head(20,N?30:40,inc?'INCIDENCE PER 100,000 (AGE-STANDARDISED)':'MORTALITY PER 100,000 (AGE-STANDARDISED)');
    const ax0=N?24:300,ax1=N?372:690,X=v=>ax0+(ax1-ax0)*v/45,ry0=N?70:70,dy=N?(inc?64:90):(inc?38:56);
    const yb=N?510:inc?330:300;
    [0,10,20,30,40].forEach(v=>s+=Ln(X(v),ry0-14,X(v),yb-12,v?'stroke:var(--line);stroke-dasharray:2 4':'stroke:var(--line)')+T(X(v),yb+2,v,'t-xs t-mid'));
    const col=inc?'var(--tumour)':'var(--ink)';
    rows.forEach((r,i)=>{const k=clamp(p*2.4-i*.22),y=ry0+i*dy;if(k<=0)return;
      if(N)s+=T(ax0,y-8,r[0],'t-sm');else s+=T(ax0-12,y+4,r[0],'t-sm t-end');
      const yy=N?y+6:y;
      if(r.length>2){s+=R(X(r[1]),yy-6,(X(r[2])-X(r[1]))*k,12,`fill:${col};opacity:.75;rx:6`);if(k>.97)s+=T(X(r[2])+8,yy+4,r[1]+'–'+r[2],'t-sm',`fill:${col}`)}
      else{s+=`<circle cx="${f1(X(r[1]))}" cy="${f1(yy)}" r="${f1(6.5*k)}" style="fill:${/World/.test(r[0])?'var(--panel)':col};stroke:${col};stroke-width:2"/>`;if(k>.97)s+=T(X(r[1])+11,yy+4,r[1],'t-sm',`fill:${col}`)}});
    if(p>.75)s+=T(N?20:ax0,N?545:yb+30,inc?'Incidence up to 4× higher in higher- than lower-HDI countries':'Case fatality is higher in lower-HDI countries, so death rates vary less','t-sm','fill:var(--ink)');
    return s}

  /* ---- scene 3: where in the bowel ---- */
  function s3(N,p){let s='';
    const cx=N?40:46,cy=N?52:66,sc=N?1.07:1.02;
    s+=head(20,N?30:40,'WHERE IT STARTS · US, ALL AGES, 2018–2022');
    const C=colon(cx,cy,sc,{w:24});s+=C.svg;
    const seg=(u0,u1,col,op,w)=>{let d='';for(let i=0;i<=50;i++){const q=C.at(lerp(u0,u1,i/50));d+=(i?'L':'M')+f1(q[0])+' '+f1(q[1])}return `<path d="${d}" style="fill:none;stroke:${col};stroke-width:${w};stroke-linecap:round;stroke-linejoin:round;opacity:${f1(op)}"/>`};
    const G=[{n:'Proximal colon',u:[0,.55],v:13.3,sh:38,c:'var(--accent)'},{n:'Distal colon',u:[.55,.89],v:8.7,sh:25,c:'var(--polyp)'},{n:'Rectum',u:[.89,1],v:11.1,sh:31,c:'var(--tumour)'},{n:'Not specified',v:2.2,sh:6,c:'var(--muted)'}];
    G.forEach((g,i)=>{const k=clamp(p*4.2-i*.95);g.k=k;if(g.u&&k>0)s+=seg(g.u[0],g.u[0]+(g.u[1]-g.u[0])*k,g.c,.35+.55*g.sh/38,17)});
    const P=(u)=>C.at(u);
    if(G[0].k>.9){const a=P(.38);s+=T(a[0],a[1]+40,'Proximal','t-lbl t-mid','fill:var(--accent)')+T(a[0],a[1]+54,'(right) colon','t-xs t-mid')}
    if(G[1].k>.9){const a=P(.64);s+=T(a[0]-24,a[1]+4,'Distal','t-lbl t-end','fill:var(--polyp-line)')+T(a[0]-24,a[1]+18,'(left) colon','t-xs t-end')}
    if(G[2].k>.9){const a=P(.95);s+=T(a[0]+20,a[1]+4,'Rectum','t-lbl','fill:var(--tumour)')}
    const c0=P(0);s+=T(c0[0]+20,c0[1]+38,'caecum','t-xs');
    const bx=N?20:420,by=N?352:78,dy=N?48:64,bw=N?250:200;
    G.forEach((g,i)=>{const y=by+i*dy,k=g.k;
      s+=T(bx,y,g.n,'t-lbl',`fill:${g.c==='var(--muted)'?'var(--ink)':g.c==='var(--polyp)'?'var(--polyp-line)':g.c}`);
      s+=R(bx,y+7,bw*g.sh/40*k,16,`fill:${g.c};opacity:.85`);
      if(k>.97)s+=T(bx+bw*g.sh/40+8,y+20,'≈'+g.sh+'% · '+g.v,'t-sm')});
    s+=lines(bx,by+4*dy+4,N?['Shares derived from ACS incidence rates','(per 100,000), not published as shares.']:['Shares derived from ACS incidence rates;','numbers after the share are per 100,000.'],'t-xs',13,'fill:var(--warn)');
    return s+incOnly(N)}

  /* ---- scene 4: age ---- */
  function s4(N,p){const inc=M==='inc';let s='';
    s+=head(20,N?30:40,'US 2026 PROJECTION BY AGE');
    const x0=N?78:96,W=N?300:590,ys=N?[70,128]:[72,124];
    const A=[{n:'Under 50',c:'var(--tumour)'},{n:'50–64',c:'var(--gold)'},{n:'65+',c:'var(--accent)'}];
    const B=[{l:'Cases',v:[24640,47600,86610],pc:[16,30,55],on:inc},{l:'Deaths',v:[3890,13480,37860],pc:[7,24,69],on:!inc}];
    const k=ease(clamp(p*1.6));
    B.forEach((b,bi)=>{const y=ys[bi],tot=b.v.reduce((a,c)=>a+c,0);let xx=x0;
      s+=T(x0-10,y+17,b.l,'t-lbl t-end',b.on?'':'fill:var(--muted)');
      b.v.forEach((v,i)=>{const w=W*v/tot*k;s+=R(xx,y,w-1.5,24,`fill:${A[i].c};opacity:${b.on?.9:.3}`);
        if(k>.97){s+=T(xx+w/2,y+40,b.pc[i]+'%','t-sm t-mid',b.on?'fill:var(--ink);font-weight:600':'');if(bi===0)s+=T(xx+w/2,y-6,A[i].n,'t-xs t-mid')}
        xx+=w})});
    const tr=inc?[{a:'Ages 20–49',v:3,per:'a year, 2013–2022'},{a:'Ages 50–64',v:.4,per:'a year, 2013–2022'},{a:'65 and older',v:-2.5,per:'a year, 2013–2022'}]
      :[{a:'Under 50',v:1,per:'a year since 2004'},{a:'Ages 50–64',v:1.2,per:'a year, 2019–2023'},{a:'65 and older',v:-2.3,per:'a year since 2012'}];
    const kt=ramp(p,.35,.85),ty=N?218:214;
    s+=T(20,ty,inc?'INCIDENCE TREND':'DEATH-RATE TREND','t-sm','fill:var(--muted);font-weight:600');
    tr.forEach((r,i)=>{const cx=N?20:20+i*235,cy=N?ty+28+i*84:ty+30,w=N?150:150,base=cy+46,col=r.v>0?'var(--bad)':'var(--good)';
      s+=T(cx,cy,r.a,'t-lbl',`fill:${A[i].c}`)+T(N?cx+110:cx,N?cy:cy+15,r.per,'t-xs');
      s+=Ln(cx,base,cx+w,base,'stroke:var(--line)');
      s+=Ln(cx,base,cx+w*kt,base-r.v*9*kt,`stroke:${col};stroke-width:3;stroke-linecap:round`);
      if(kt>.97){const lx=N?cx+w+16:cx+w+8;s+=T(lx,base-r.v*9+4,(r.v>0?'+':'−')+Math.abs(r.v)+'%','t-lbl',`fill:${col}`)}});
    if(p>.8)s+=T(20,N?548:368,inc?'45% of new US diagnoses are now under 65 (27% in 1995)':'Now the leading cause of cancer death in US adults under 50','t-sm','fill:var(--ink)');
    s+=T(N?380:700,N?190:186,'slopes drawn from the stated annual change','t-xs t-end');
    return s}

  /* ---- scene 5: birth cohort ---- */
  function s5(N,p){let s='';
    s+=head(20,N?30:40,'RISK VS PEOPLE BORN ~1950 · US SEER 1974–2013');
    const x0=N?92:100,x1=N?372:390,lv=v=>Math.log(v/.7)/Math.log(10/.7),X=v=>x0+(x1-x0)*lv(v);
    const yA=N?62:70,rows=[{n:'Colon',v:2.4,lo:1.11,hi:5.19,c:'var(--polyp)'},{n:'Rectum',v:4.32,lo:2.19,hi:8.51,c:'var(--tumour)'}];
    const k=ease(clamp(p*1.5)),yAx=yA+112;
    [1,2,4,8].forEach(v=>s+=Ln(X(v),yA-6,X(v),yAx-12,v===1?'stroke:var(--ink);stroke-width:1.4;stroke-dasharray:4 3':'stroke:var(--line);stroke-dasharray:2 4')+T(X(v),yAx,v+'×','t-xs t-mid'));
    s+=T(X(1)-4,yA-12,'born ~1950 = 1','t-xs t-end');
    rows.forEach((r,i)=>{const y=yA+12+i*46,vk=Math.exp(Math.log(r.v)*k);
      s+=T(x0-10,y+15,r.n,'t-lbl t-end',`fill:${r.c==='var(--polyp)'?'var(--polyp-line)':r.c}`);
      s+=R(X(1),y,X(vk)-X(1),22,`fill:${r.c};opacity:.85`);
      if(k>.97){s+=Ln(X(r.lo),y+11,X(r.hi),y+11,'stroke:var(--ink);stroke-width:1.4')+Ln(X(r.lo),y+5,X(r.lo),y+17,'stroke:var(--ink);stroke-width:1.4')+Ln(X(r.hi),y+5,X(r.hi),y+17,'stroke:var(--ink);stroke-width:1.4');
        s+=T(X(r.v),y-4,r.v.toFixed(2)+'×','t-lbl t-mid',`fill:${r.c==='var(--polyp)'?'var(--polyp-line)':r.c}`)}});
    s+=T(x0,yAx+16,k>.97?'born ~1990 vs ~1950, with 95% CI · bars grow for effect, ends are data':'born ~1950 → ~1990 …','t-xs');
    /* early-onset 1998 → 2022 */
    const sy=N?240:262,sx0=N?60:90,sx1=N?250:280,sH=N?70:62,V=v=>sy+sH-sH*v/7,k2=ramp(p,.3,.75);
    s+=T(20,sy-14,'AGES 20–49, PER 100,000: 1998 → 2022','t-sm','fill:var(--muted);font-weight:600');
    s+=Ln(sx0,sy+sH,sx1,sy+sH,'stroke:var(--line)')+T(sx0,sy+sH+14,'1998','t-xs t-mid')+T(sx1,sy+sH+14,'2022','t-xs t-mid');
    [['Rectum',3.6,6.6,'var(--tumour)'],['Sigmoid',2.1,3.7,'var(--polyp)']].forEach(([n,a,b,c])=>{
      s+=Ln(sx0,V(a),lerp(sx0,sx1,k2),V(lerp(a,b,k2)),`stroke:${c};stroke-width:3;stroke-linecap:round`)+`<circle cx="${sx0}" cy="${f1(V(a))}" r="3.5" style="fill:${c}"/>`+T(sx0-8,V(a)+4,a,'t-xs t-end');
      if(k2>.97)s+=`<circle cx="${sx1}" cy="${f1(V(b))}" r="3.5" style="fill:${c}"/>`+T(sx1+8,V(b)+4,n+' '+b,'t-sm',`fill:${c==='var(--polyp)'?'var(--polyp-line)':c}`)});
    if(k2>.97)s+=T(sx1+8,sy+sH-2,'proximal +26%','t-xs');
    /* subsite by age */
    const bx=N?20:450,by=N?380:84,k3=ramp(p,.5,.95),bw=N?220:170;
    s+=T(bx,by-14,N?'BY SUBSITE, 2018–2022 (per 100,000)':'BY SUBSITE, 2018–2022','t-sm','fill:var(--muted);font-weight:600');
    const grp=[{n:'Under 50 (ages 20–49)',mx:6,r:[['Rectum',5.7,'var(--tumour)'],['Distal colon',4.1,'var(--polyp)'],['Proximal colon',2.9,'var(--accent)']]},
      {n:'65 and older',mx:75,r:[['Proximal colon',73.1,'var(--accent)'],['Rectum',36.6,'var(--tumour)'],['Distal colon',31.5,'var(--polyp)']]}];
    grp.forEach((g,gi)=>{const gy=by+gi*(N?84:128);s+=T(bx,gy+4,g.n,'t-lbl');
      g.r.forEach(([n,v,c],i)=>{const y=gy+14+i*(N?20:30);s+=T(bx,y+(N?12:10),n,'t-xs');
        const bx2=bx+(N?96:0),yy=N?y+3:y+14;s+=R(bx2,yy,bw*v/g.mx*k3,N?11:10,`fill:${c};opacity:.85`);
        if(k3>.97)s+=T(bx2+bw*v/g.mx+6,yy+(N?10:9),v,'t-xs','fill:var(--ink)')})});
    if(!N)s+=T(bx,by+250,'separate scales for each age group','t-xs');
    return s+incOnly(N)}

  const SC=[s0,s1,s2,s3,s4,s5];
  const READ=[
    ()=>M==='inc'?'<span>world 2024 <b>2,041,007 cases</b></span><span>rank <b>3</b></span><span>men <b>1,138,656</b> · women <b>902,351</b></span>':'<span>world 2024 <b>917,895 deaths</b></span><span>rank <b>2</b></span>',
    ()=>M==='inc'?'<span>2020 <b>&gt;1.9 M</b></span><span>2024 <b>2.04 M</b></span><span>2040 <b>3.2 M (projected)</b></span>':'<span>2020 <b>930,000</b></span><span>2024 <b>917,895</b></span><span>2040 <b>1.6 M (projected)</b></span>',
    ()=>M==='inc'?'<span>range <b>5–8 to 30–40</b> per 100,000</span><span>2020 extremes <b>4.4 → 40.6</b></span>':'<span>2020 extremes <b>2.5 → 20.2</b> per 100,000</span>',
    ()=>'<span>proximal <b>≈38%</b></span><span>distal <b>≈25%</b></span><span>rectum <b>≈31%</b></span><span>unspecified <b>≈6%</b></span><span>(derived)</span>',
    ()=>M==='inc'?'<span>under 50 <b>16%</b> of cases</span><span>20–49 trend <b>+3%/yr</b></span>':'<span>under 50 <b>7%</b> of deaths</span><span>under-50 trend <b>+1%/yr</b></span>',
    ()=>'<span>colon IRR <b>2.40</b></span><span>rectal IRR <b>4.32</b></span><span>born ~1990 vs ~1950</span>'];
  function draw(t){const N=vb(svg,'720 380','400 560'),ph=phaseOf(WH_STEPS,t),p=loc(ph,t);
    svg.innerHTML=SC[ph](N,p);
    setSt(ph);
    const S=WH_STEPS[ph];let P=S;
    if(M==='mort'){if(S.mort)P=Object.assign({},S,S.mort);else if(S.mortNote)P=Object.assign({},S,{txt:S.txt+` <i>${S.mortNote}</i>`})}
    $('#whNote').innerHTML=noteHTML(P);
    $('#whRead').innerHTML=READ[ph]()}
  const stop=playWire(rg,$('#whPlay'),draw,30000,'%t:player.replay%','what');
  setSt=stepWire($('#whSteps'),WH_STEPS,rg,draw,stop);
  $$('[data-wh-m]').forEach(b=>b.addEventListener('click',()=>{M=b.dataset.whM;$$('[data-wh-m]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---- survival over time, then by stage ---- */
  const sv=$('#whSurv'),sr=$('#whSurvT');let setS=()=>{};
  const SER=[{n:'Regional stage',c:'var(--polyp)',lc:'var(--polyp-line)',p:[[1976,52],[1996,66],[2018,74]]},{n:'All stages',c:'var(--tumour)',lc:'var(--tumour)',p:[[1976,50],[1996,61],[2018,65]]},{n:'Distant stage',c:'var(--ink)',lc:'var(--ink)',p:[[1976,5],[1996,8],[2018,15]]}];
  function drawS(t){const N=vb(sv,'720 300','400 480');let s='';
    const x0=N?46:60,x1=N?330:370,y0=N?36:34,y1=N?206:240,X=y=>x0+(x1-x0)*(y-1970)/(2025-1970),Y=v=>y1-(y1-y0)*v/100;
    const yc=lerp(1974,2020,ramp(t,0,.56));
    s+=T(x0-40,y0-14,'5-YEAR RELATIVE SURVIVAL, US','t-sm','fill:var(--tumour);font-weight:600');
    [0,25,50,75,100].forEach(v=>s+=Ln(x0,Y(v),x1,Y(v),v?'stroke:var(--line);stroke-dasharray:2 4':'stroke:var(--line)')+T(x0-6,Y(v)+4,v+'%','t-xs t-end'));
    [[1976,'1975–77'],[1996,'1995–97'],[2018,'2015–21']].forEach(([y,l])=>s+=T(X(y),y1+16,l,'t-xs t-mid'));
    s+=T(x1,y1+30,'year of diagnosis','t-xs t-end');
    SER.forEach(S=>{const pts=S.p.filter(q=>q[0]<=yc);let d='';
      S.p.forEach((q,i)=>{if(i===0||q[0]<=yc){d+=(i?'L':'M')+f1(X(q[0]))+' '+f1(Y(q[1]))}else if(S.p[i-1][0]<yc){const a=S.p[i-1],u=(yc-a[0])/(q[0]-a[0]);d+='L'+f1(X(yc))+' '+f1(Y(lerp(a[1],q[1],u)))}});
      if(yc>=1976)s+=`<path d="${d}" style="fill:none;stroke:${S.c};stroke-width:2.6;stroke-linejoin:round"/>`;
      pts.forEach(q=>s+=`<circle cx="${f1(X(q[0]))}" cy="${f1(Y(q[1]))}" r="4" style="fill:var(--panel);stroke:${S.c};stroke-width:2"/>`+(q[0]>2010?T(X(q[0])+9,Y(q[1])+(S.n==='Regional stage'?0:S.n==='All stages'?10:4),q[1]+'% '+({'Regional stage':'regional','All stages':'all stages','Distant stage':'distant'})[S.n],'t-sm',`fill:${S.lc};font-weight:600`):T(X(q[0]),Y(q[1])-(S.n==='Regional stage'?9:-16),q[1]+'%','t-sm t-mid',`fill:${S.lc};font-weight:600`)))});
    s+=Ln(X(yc),y0,X(yc),y1,'stroke:var(--ink);opacity:.25');
    /* by stage */
    const k=ease(ramp(t,.62,.9)),k2=ramp(t,.88,1);
    const bx0=N?60:470,bx1=N?370:700,by0=N?284:y0,by1=N?434:y1,BY=v=>by1-(by1-by0)*v/100;
    s+=T(bx0-(N?40:10),by0-14,'BY STAGE, 2015–2021','t-sm',`fill:var(--tumour);font-weight:600;opacity:${t<.6?.35:1}`);
    s+=Ln(bx0,by1,bx1,by1,'stroke:var(--line)');
    const ST=[['Localized',91,'var(--good)'],['Regional',74,'var(--polyp)'],['Distant',15,'var(--tumour)']],bw=N?54:48,gp=(bx1-bx0)/3;
    ST.forEach(([n,v,c],i)=>{const cx=bx0+gp*(i+.5),h=(by1-BY(v))*k;
      s+=R(cx-bw/2,by1-h,bw,h,`fill:${c};opacity:.85`)+T(cx,by1+16,n,'t-xs t-mid');
      if(k>.97)s+=T(cx,BY(v)-8,v+'%','t-lbl t-mid')});
    if(k2>0){const g=`opacity:${f1(k2)}`;
      s+=`<g style="${g}">`+T(bx0+gp*1.5,by1+30,'81% under 50 · 69% at 65+','t-xs t-mid')+T(bx0+gp*2.5,BY(15)-26,'<50: 23%','t-xs t-mid')+T(bx0+gp*2.5,BY(15)-40,'50–64: 17%','t-xs t-mid')+T(bx0+gp*2.5,BY(15)-54,'65+: 10%','t-xs t-mid')+'</g>'}
    sv.innerHTML=s;
    const ph=phaseOf(WH_SURV_STEPS,t);setS(ph);$('#whSurvNote').innerHTML=noteHTML(WH_SURV_STEPS[ph])}
  const stopS=playWire(sr,$('#whSurvPlay'),drawS,12000,'%t:player.replay%','what');
  setS=stepWire($('#whSurvSteps'),WH_SURV_STEPS,sr,drawS,stopS);
  drawS(+sr.value);
};
