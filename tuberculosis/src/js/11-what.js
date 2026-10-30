/* =============== 1.1 What TB is =============== */
const WH_STEPS=[
 {from:0,at:.16,k:'Scene 1 · 2024',t:'Fell ill, found, died',
  txt:`In 2024 an estimated 10.7 million people (95% UI 9.9–11.5 million) fell ill with TB, 131 per 100,000 people. 8.3 million were diagnosed and notified: 78% of the estimate. The gap of about 2.4 million people who were not diagnosed or not reported was down from 2.6 million in 2023, and from 4.5 million in 2020. About 1.23 million people died: 1.08 million HIV-negative people and 150,000 people with HIV. WHO counts TB deaths in people with HIV as HIV deaths, which is why some totals leave out the 150,000. [[WHO-GTR2025]]`,
  pt:`About 11 million people get sick with TB each year, and about 1 in 5 of them are never found or reported. Finding people early helps them and protects their families.`,
  hook:`2024: 10.7 million ill (131/100,000), 8.3 million notified (78%), 1.23 million deaths including 150,000 people with HIV.`},
 {from:.25,at:.4,k:'Scene 2 · WHO regions',t:'Where TB occurs',
  txt:`By WHO region, new cases in 2024 were 34% South-East Asia, 27% Western Pacific, 25% Africa, 8.6% Eastern Mediterranean, 3.3% the Americas and 1.9% Europe. In WHO's grouping Indonesia is in the Western Pacific. The rate per 100,000 is highest in Africa. HIV-negative TB deaths were 40% in South-East Asia and 29% in Africa, and most deaths of people with HIV were in Africa (108,000 of 150,000). [[WHO-GTR2025]]`,
  pt:`Most people who get TB live in Asia and Africa. In Africa, many of the people who die of TB also have HIV.`,
  hook:`Cases: SEA 34% > W Pacific 27% > Africa 25%. Highest rate: Africa (about 207/100,000, database sum).`},
 {from:.5,at:.66,k:'Scene 3 · countries',t:'Eight countries, two-thirds of cases',
  txt:`Eight countries had 67% of the world's cases in 2024: India 25%, Indonesia 10%, the Philippines 6.8%, China 6.5%, Pakistan 6.3%, Nigeria 4.8%, the Democratic Republic of the Congo 3.9% and Bangladesh 3.6%. The top five had 55%, and the 30 high TB burden countries 87%. Ten countries also had 63% of the global gap between estimated and notified cases. [[WHO-GTR2025]]`,
  pt:`A handful of countries carry most of the world's TB. Progress there decides whether TB falls worldwide.`,
  hook:`Two-thirds of cases in 8 countries; India alone 25%. 30 high-burden countries = 87%.`},
 {from:.74,at:1,k:'Scene 4 · 2000–2024',t:'25 years, the COVID-19 dip and End TB',
  txt:`Progress has been slow: about 11.6 million cases (188 per 100,000) in 2000 against about 10.6 million (130 per 100,000) in 2024, and deaths from about 2.9 million to 1.2 million (database sums). Notifications fell from 7.1 million in 2019 to 5.8 million in 2020 as COVID-19 disrupted services, and WHO assumes the missed diagnoses raised transmission and incidence in 2021–2023. Against 2015, the incidence rate was down a net 12.3% and deaths 29% by 2024, far from the End TB milestones of 50% and 75% for 2025. [[WHO-GTR2025]] The targets were endorsed by all WHO Member States in 2014. [[Floyd2018]]`,
  pt:`TB is falling, but far too slowly. When COVID-19 closed clinics in 2020, fewer people were diagnosed, and more people fell ill in the years after.`,
  hook:`End TB by 2024: incidence −12.3% and deaths −29% vs 2015, against 2025 milestones of −50% and −75%. Notifications 7.1 → 5.8 million (2019 → 2020).`}
];
inits.what=()=>{
  const svg=$('#whSvg'),rg=$('#whT');let meas='ill',pop='all',setSt=()=>{};
  const REG=[{n:'South-East Asia',c:34,r:194,d:433,dh:13,ds:40},{n:'Western Pacific',c:27,r:131,d:211,dh:17,ds:19},{n:'Africa',c:25,r:207,d:315,dh:108,ds:29},
    {n:'Eastern Mediterranean',c:8.6,r:112,d:85,dh:1.3,ds:7.9},{n:'Americas',c:3.3,r:34,d:22,dh:7.8,ds:2.1},{n:'Europe',c:1.9,r:22,d:15,dh:3.8,ds:1.4}];
  /* squares are rounded shares (largest remainder) so the 8 countries fill 67 of 100 */
  const CT=[['India',25,25,'var(--tb)'],['Indonesia',10,10,'var(--brand)'],['Philippines',6.8,7,'var(--accent)'],['China',6.5,6,'var(--rx)'],
    ['Pakistan',6.3,6,'var(--vax)'],['Nigeria',4.8,5,'var(--gold)'],['DR Congo',3.9,4,'var(--dH)'],['Bangladesh',3.6,4,'var(--dE)']];
  const INC=[[2000,11.57],[2005,12.05],[2010,11.67],[2015,11.02],[2019,10.31],[2020,10.17],[2021,10.32],[2022,10.6],[2023,10.65],[2024,10.55]];
  const NOT=[[2000,3.75],[2005,5.15],[2010,5.79],[2015,6.16],[2019,7.1],[2020,5.8],[2021,6.4],[2022,7.49],[2023,8.2],[2024,8.3]];
  const DN=[[2000,2.07],[2010,1.49],[2015,1.32],[2019,1.15],[2021,1.2],[2024,1.05]];
  const DH=[[2000,.878],[2010,.619],[2015,.411],[2019,.247],[2024,.149]];
  const fmtM=v=>v>=1?f1(v)+' million':Math.round(v*1000).toLocaleString('en')+',000';
  const fmtK=v=>v>=1000?f1(v/1000)+' million':(v>=10?Math.round(v):f1(v))+(v<1000?',000':'');
  /* rows for scene 1, by toggle */
  function cascade(){
    if(pop==='hiv')return{t:'TB and HIV, 2024',s:'People with HIV who fell ill with TB, and who died',max:.619,rows:[
      {l:'Fell ill with TB',v:.619,c:'var(--tb)',val:'about 619,000 · 5.8% of all cases',hi:meas==='ill'},
      {l:'Died of TB',v:.15,c:'var(--bad)',val:'150,000 (95% UI 120,000–183,000)',hi:meas==='deaths'}],
      pct:[{l:'On ART, of those notified and known to have HIV',s:'On ART: notified, known HIV',p:91,c:'var(--rx)'},{l:'On ART, of everyone estimated to have HIV and TB',s:'On ART: all estimated',p:61,c:'var(--warn)'},{l:'Treatment success, people with HIV (2023 cohort)',s:'Treatment success (2023)',p:79,c:'var(--good)'}]};
    if(meas==='deaths')return{t:'Who died of TB, 2024',s:'1.23 million deaths, by group',max:1.23,rows:[
      {l:'All TB deaths',v:1.08,v2:.15,c:'var(--bad)',val:'1.23 million · 1.08 HIV-negative + 0.15 with HIV',hi:true},
      {l:'Adult men',v:.614,c:'var(--bad)',val:'614,000'},{l:'Adult women',v:.442,c:'var(--bad)',val:'442,000'},{l:'Children under 15',v:.174,c:'var(--bad)',val:'174,000'}],
      pct:[{l:'Case fatality: share of everyone who fell ill who died',s:'Case fatality, all who fell ill',p:11.5,c:'var(--bad)'}]};
    return{t:'A year of TB worldwide, 2024',s:'Estimated people who fell ill, were notified, and died',max:10.7,rows:[
      {l:'Fell ill with TB',v:10.7,c:'var(--tb)',val:'10.7 million · 131 per 100,000',hi:true},
      {l:'Diagnosed and notified',v:8.3,gap:2.4,c:'var(--accent)',val:'8.3 million · 78%'},
      {l:'Died of TB',v:1.08,v2:.15,c:'var(--bad)',val:'1.23 million'}],
      pct:[{l:'Treatment success, drug-susceptible TB (2023 cohort)',s:'Treatment success, 2023 cohort',p:88,c:'var(--good)'}]};
  }
  function bars(L,k,N){const C=cascade();let s=hdr(C.t,C.s,N),y=L.y0;const W=L.w,x0=L.x0;
    C.rows.forEach((r,i)=>{const g=ease(ramp(k,i*.16,i*.16+.4));const w=W*r.v/C.max*g,w2=r.v2?W*r.v2/C.max*g:0;
      s+=`<text x="${x0}" y="${y}" class="t-lbl" style="${r.hi?'':'font-weight:500'}">${r.l}</text><text x="${x0+W}" y="${N?y+44:y}" class="t-sm t-end" style="fill:var(--ink)">${g>.05?r.val:''}</text>`;
      s+=`<rect x="${x0}" y="${y+6}" width="${W}" height="22" rx="4" style="fill:var(--panel-2)"/>`;
      if(w>0)s+=`<rect x="${x0}" y="${y+6}" width="${f1(w)}" height="22" rx="4" style="fill:${r.c};opacity:${r.hi||!N?.95:.85}"/>`;
      if(w2>0)s+=`<rect x="${f1(x0+w)}" y="${y+6}" width="${f1(w2)}" height="22" style="fill:${r.c};opacity:.45"/><text x="${f1(x0+w+w2+4)}" y="${y+21}" class="t-xs">${pop==='hiv'?'':'with HIV'}</text>`;
      if(r.gap){const gk=ease(ramp(k,.42,.7)),gw=W*r.gap/C.max*gk;
        if(gw>0){s+=`<rect x="${f1(x0+w)}" y="${y+6}" width="${f1(gw)}" height="22" style="fill:url(#whHatch);stroke:var(--tb);stroke-width:1;stroke-dasharray:3 2"/>`;
          if(gk>.6)s+=`<text x="${N?x0:f1(x0+W)}" y="${y+46}" class="t-sm ${N?'':'t-end'}" style="fill:var(--tb)">${N?'2.4 million missing':'2.4 million missing: not diagnosed or not reported'}</text>`}}
      y+=(r.gap?76:62)+(N?14:0)});
    y+=6;s+=`<line x1="${x0}" x2="${x0+W}" y1="${y-14}" y2="${y-14}" class="grid"/>`;
    C.pct.forEach((p,i)=>{const g=ease(ramp(k,.55+i*.1,.85+i*.05));
      const pv=(g>.05?f1(p.p*g).replace('.0',''):'0')+'%';
      s+=`<text x="${x0}" y="${y}" class="t-sm" style="fill:var(--ink)">${N?p.s||p.l:p.l}</text><text x="${x0+W}" y="${N?y+34:y}" class="t-lbl t-end" style="fill:${p.c}">${pv}</text>`;
      s+=`<rect x="${x0}" y="${y+6}" width="${W}" height="10" rx="5" style="fill:var(--panel-2)"/><rect x="${x0}" y="${y+6}" width="${f1(W*p.p/100*g)}" height="10" rx="5" style="fill:${p.c}"/>`;
      y+=N?58:48});
    return s}
  function hdr(t,sub,N){return `<text x="${N?20:30}" y="30" class="t-big">${t}</text><text x="${N?20:30}" y="48" class="t-sm">${sub}</text>`}
  function regions(L,k,N){const dh=pop==='hiv',dd=meas==='deaths'||dh;
    const T=dh?'TB deaths of people with HIV, by WHO region':dd?'HIV-negative TB deaths, by WHO region':'New TB cases, by WHO region';
    const S=dh?'2024, thousands of deaths (no regional split of cases in people with HIV here)':dd?'2024, share of 1.08 million deaths':'2024, share of 10.7 million cases · rate per 100,000';
    let s=hdr(T,N&&!dh?(dd?'2024, share of HIV-negative deaths':'2024, share of cases · rate per 100,000'):N?'2024, thousands of deaths':S,N);
    const vals=REG.map(r=>dh?r.dh:dd?r.ds:r.c),mx=dh?120:dd?48:40;
    REG.forEach((r,i)=>{const g=ease(ramp(k,i*.08,i*.08+.45)),v=vals[i];
      const y=N?L.y0+i*72:L.y0+i*46,lx=N?L.x0:L.x0,bx=N?L.x0:L.x0+170,bw=N?L.w-70:L.w-260,w=bw*v/mx*g;
      s+=`<text x="${lx}" y="${N?y:y+16}" class="t-lbl">${r.n}</text>`;
      const by=N?y+8:y;
      s+=`<rect x="${bx}" y="${by}" width="${f1(w)}" height="22" rx="4" style="fill:${dd?'var(--bad)':'var(--tb)'};opacity:${f1(.55+.4*v/mx)}"/>`;
      s+=`<text x="${f1(bx+w+6)}" y="${by+16}" class="t-lbl">${g>.05?(dh?fmtK(v*g):f1(v*g).replace('.0','')+'%'):''}</text>`;
      if(!dd&&g>.6){const rx=N?L.x0+L.w:L.x0+L.w;s+=`<text x="${rx}" y="${by+16}" class="t-sm t-end">${r.r}/100k</text>`}
      if(dd&&!dh&&g>.6){s+=`<text x="${N?L.x0+L.w:L.x0+L.w}" y="${by+16}" class="t-sm t-end">${r.d}k · HIV ${r.dh}k</text>`}});
    if(!dd)s+=`<text x="${L.x0+L.w}" y="${N?L.y0-20:L.y0-14}" class="t-xs t-end">rate (database sum)</text>`;
    return s}
  function countries(L,k,N){let s=hdr('Eight countries, two-thirds of cases',N?'2024 · each square ≈ 1% of cases':'2024 · each square ≈ 1% of the world\'s new cases (rounded)',N);
    const cols=10,sz=N?27:24,gp=N?3:3,gx=L.gx,gy=L.gy,nf=Math.floor(ease(k)*100.5);
    const own=[];CT.forEach((c,ci)=>{for(let j=0;j<c[2];j++)own.push(ci)});
    for(let i=0;i<100;i++){const x=gx+(i%cols)*(sz+gp),y=gy+Math.floor(i/cols)*(sz+gp);let f='var(--panel-2)',st='var(--line)',op=1;
      if(i<nf){if(i<67)f=CT[own[i]][3];else if(i<87){f='var(--tb-soft)';st='var(--tb)'}else{f='var(--panel-2)'}}
      else op=.5;
      s+=`<rect x="${x}" y="${y}" width="${sz}" height="${sz}" rx="3" style="fill:${f};stroke:${st};stroke-width:${i>=67&&i<87&&i<nf?1.2:.8};opacity:${op}"/>`}
    let acc=0;const lx=L.lx,ly=L.ly;
    CT.forEach((c,i)=>{acc+=c[2];const on=nf>=acc-c[2]+1;const px=N?lx+(i%2)*180:lx,py=N?ly+Math.floor(i/2)*24:ly+i*25;
      s+=`<g style="opacity:${on?1:.3}"><rect x="${px}" y="${py-11}" width="13" height="13" rx="2" style="fill:${c[3]}"/><text x="${px+20}" y="${py}" class="t-lbl" style="font-weight:${on?700:500}">${c[0]}</text><text x="${px+(N?160:200)}" y="${py}" class="t-sm t-end" style="fill:var(--ink)">${c[1]}%</text></g>`});
    const py2=N?ly+4*24+8:ly+8*25+6;
    s+=`<g style="opacity:${nf>67?1:.3}"><rect x="${lx}" y="${py2-11}" width="13" height="13" rx="2" style="fill:var(--tb-soft);stroke:var(--tb)"/><text x="${lx+20}" y="${py2}" class="t-sm" style="fill:var(--ink)">22 other high-burden countries: 30 together = 87%</text></g>`;
    s+=`<g style="opacity:${nf>87?1:.3}"><rect x="${lx}" y="${py2+14}" width="13" height="13" rx="2" style="fill:var(--panel-2);stroke:var(--line)"/><text x="${lx+20}" y="${py2+25}" class="t-sm" style="fill:var(--ink)">rest of the world: 13%</text></g>`;
    const tot=Math.min(67,nf);s+=`<text x="${lx}" y="${py2+60}" class="t-big" style="fill:var(--tb)">${tot}%</text><text x="${lx+50}" y="${py2+60}" class="t-sm">of cases in the 8 countries so far</text>`;
    return s}
  function trends(L,k,N){const dh=pop==='hiv',dd=meas==='deaths'||dh;
    let s=hdr(dh?'TB deaths of people with HIV, 2000–2024':dd?'TB deaths, 2000–2024':'Cases and notifications, 2000–2024',N?'millions · WHO database sums':'millions · WHO database country sums (2019–21, 2023–24 notifications: report)',N);
    const Y=lerp(2000,2024,ease(ramp(k,0,.62))),x0=L.cx0,x1=L.cx1,y0=L.cy0,y1=L.cy1,ymax=dd?(dh?1:2.5):13;
    const X=yr=>lerp(x0,x1,(yr-2000)/24),V=v=>lerp(y1,y0,v/ymax);
    const ticks=dd?(dh?[0,.25,.5,.75,1]:[0,.5,1,1.5,2,2.5]):[0,2,4,6,8,10,12];
    ticks.forEach(v=>s+=`<line x1="${x0}" x2="${x1}" y1="${f1(V(v))}" y2="${f1(V(v))}" class="${v?'grid':'axis'}"/><text x="${x0-6}" y="${f1(V(v)+3)}" class="t-xs t-end">${v}</text>`);
    [2000,2005,2010,2015,2020,2024].forEach(yr=>s+=`<text x="${f1(X(yr))}" y="${y1+15}" class="t-xs t-mid">${yr}</text>`);
    /* the 2015 End TB baseline and the COVID-19 year */
    s+=`<line x1="${f1(X(2015))}" x2="${f1(X(2015))}" y1="${y0}" y2="${y1}" style="stroke:var(--vax);stroke-dasharray:4 3;opacity:.8"/><text x="${f1(X(2015)-4)}" y="${y0+10}" class="t-xs t-end" style="fill:var(--vax)">2015 baseline</text>`;
    if(Y>=2019.5)s+=`<rect x="${f1(X(2019.6))}" y="${y0}" width="${f1(X(2021)-X(2019.6))}" height="${y1-y0}" style="fill:var(--warn-soft);opacity:.7"/><text x="${f1(X(2020.3))}" y="${y0+10}" class="t-xs t-mid" style="fill:var(--warn)">COVID-19</text>`;
    const seg=(P)=>{let d='';P.forEach(([yr,v],i)=>{if(yr>Y&&i>0){const [py,pv]=P[i-1];if(py<Y){const u=(Y-py)/(yr-py);d+=`L${f1(X(Y))} ${f1(V(lerp(pv,v,u)))}`}return}d+=(d?'L':'M')+f1(X(yr))+' '+f1(V(v))});return d};
    const at=(P,yr)=>{for(let i=1;i<P.length;i++)if(yr<=P[i][0]){const a=P[i-1],b=P[i];return lerp(a[1],b[1],(yr-a[0])/(b[0]-a[0]))}return P[P.length-1][1]};
    if(!dd){/* shaded gap between estimated cases and notifications */
      let d='';const ys=[];for(let yr=2000;yr<=Y+1e-6;yr+=.25)ys.push(yr);if(ys[ys.length-1]<Y)ys.push(Y);
      if(ys.length>1){ys.forEach((yr,i)=>d+=(i?'L':'M')+f1(X(yr))+' '+f1(V(at(INC,yr))));ys.slice().reverse().forEach(yr=>d+='L'+f1(X(yr))+' '+f1(V(at(NOT,yr))));s+=`<path d="${d}Z" style="fill:url(#whHatch);opacity:.8"/>`}
      s+=`<path d="${seg(INC)}" style="fill:none;stroke:var(--tb);stroke-width:2.6"/><path d="${seg(NOT)}" style="fill:none;stroke:var(--accent);stroke-width:2.6"/>`;
      const e=Y;s+=`<circle cx="${f1(X(e))}" cy="${f1(V(at(INC,e)))}" r="4" style="fill:var(--tb)"/><circle cx="${f1(X(e))}" cy="${f1(V(at(NOT,e)))}" r="4" style="fill:var(--accent)"/>`;
      s+=`<text x="${f1(X(e)>x1-120?X(e)-8:X(e)+6)}" y="${f1(V(at(INC,e))-8)}" class="t-sm ${X(e)>x1-120?'t-end':''}" style="fill:var(--tb)">fell ill ${f1(at(INC,e))}</text><text x="${f1(X(e)>x1-120?X(e)-8:X(e)+6)}" y="${f1(V(at(NOT,e))+16)}" class="t-sm ${X(e)>x1-120?'t-end':''}" style="fill:var(--accent)">notified ${f1(at(NOT,e))}</text>`;
      if(Y>=2020)s+=`<circle cx="${f1(X(2020))}" cy="${f1(V(5.8))}" r="5.5" style="fill:none;stroke:var(--ink);stroke-width:1.5"/><text x="${f1(X(2020))}" y="${f1(V(5.8)+20)}" class="t-xs t-mid" style="fill:var(--ink)">5.8 (2020)</text>`}
    else{if(!dh)s+=`<path d="${seg(DN)}" style="fill:none;stroke:var(--bad);stroke-width:2.6"/>`;
      s+=`<path d="${seg(DH)}" style="fill:none;stroke:var(--warn);stroke-width:2.6;stroke-dasharray:${dh?'0':'6 3'}"/>`;
      const e=Y;if(!dh)s+=`<circle cx="${f1(X(e))}" cy="${f1(V(at(DN,e)))}" r="4" style="fill:var(--bad)"/><text x="${f1(X(e)>x1-120?X(e)-8:X(e)+6)}" y="${f1(V(at(DN,e))-8)}" class="t-sm ${X(e)>x1-120?'t-end':''}" style="fill:var(--bad)">HIV-negative ${f1(at(DN,e)*100/100)}</text>`;
      s+=`<circle cx="${f1(X(e))}" cy="${f1(V(at(DH,e)))}" r="4" style="fill:var(--warn)"/><text x="${f1(X(e)>x1-120?X(e)-8:X(e)+6)}" y="${f1(V(at(DH,e))+(dh?-8:16))}" class="t-sm ${X(e)>x1-120?'t-end':''}" style="fill:var(--warn)">with HIV ${(at(DH,e)).toFixed(2)}</text>`;
      if(dh)s+=`<text x="${x1}" y="${y0+26}" class="t-sm t-end" style="fill:var(--ink)">share of new TB in people with HIV: 17% (2000) → 5.8% (2024)</text>`}
    s+=`<line x1="${f1(X(Y))}" x2="${f1(X(Y))}" y1="${y0}" y2="${y1}" style="stroke:var(--ink);opacity:.3"/><text x="${f1(X(Y))}" y="${y1+30}" class="t-sm t-mid" style="fill:var(--ink)">${Math.round(Y)}</text>`;
    /* End TB scorecard */
    const sk=ease(ramp(k,.6,.95));
    if(sk>0){const bx=L.sx,by=L.sy,bw=L.sw;s+=`<g style="opacity:${f1(ramp(k,.6,.7))}"><text x="${bx}" y="${by}" class="t-lbl" style="fill:var(--vax)">End TB: 2015 → 2024</text><text x="${bx}" y="${by+16}" class="t-xs">fall achieved vs 2025 milestone</text>`;
      [['Incidence rate',12.3,50],['Deaths',29,75]].forEach(([l,a,m],i)=>{const y=by+40+i*58;
        s+=`<text x="${bx}" y="${y}" class="t-sm" style="fill:var(--ink)">${l}</text>`;
        s+=`<rect x="${bx}" y="${y+6}" width="${bw}" height="16" rx="3" style="fill:var(--panel-2)"/><rect x="${bx}" y="${y+6}" width="${f1(bw*m/100)}" height="16" rx="3" style="fill:none;stroke:var(--vax);stroke-width:1.4;stroke-dasharray:4 2"/>`;
        s+=`<rect x="${bx}" y="${y+6}" width="${f1(bw*a/100*sk)}" height="16" rx="3" style="fill:var(--vax)"/>`;
        s+=`<text x="${bx}" y="${y+36}" class="t-xs" style="fill:var(--ink)">−${f1(a*sk).replace('.0','')}% achieved · milestone −${m}%</text>`});
      s+='</g>'}
    return s}
  function draw(t){const N=vb(svg,'720 400','400 560');const ph=phaseOf(WH_STEPS,t);
    const nx=[.25,.5,.74,1],f0=WH_STEPS[ph].from,k=ramp(t,f0,f0+(nx[ph]-f0)*.72);
    let s=`<defs><pattern id="whHatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="7" height="7" style="fill:var(--tb-soft)"/><line x1="0" y1="0" x2="0" y2="7" style="stroke:var(--tb);stroke-width:2.2;opacity:.45"/></pattern></defs>`;
    if(ph===0)s+=bars(N?{x0:20,w:360,y0:92}:{x0:30,w:600,y0:88},k,N);
    else if(ph===1)s+=regions(N?{x0:20,w:360,y0:100}:{x0:30,w:660,y0:84},k,N);
    else if(ph===2)s+=countries(N?{gx:50,gy:66,lx:20,ly:385}:{gx:36,gy:72,lx:340,ly:92},k,N);
    else s+=trends(N?{cx0:44,cx1:380,cy0:70,cy1:300,sx:20,sy:368,sw:360}:{cx0:56,cx1:470,cy0:70,cy1:340,sx:500,sy:120,sw:190},k,N);
    /* scene dots */
    WH_STEPS.forEach((st,i)=>{const cx=(N?400:720)-20-(3-i)*16;s+=`<circle cx="${cx}" cy="22" r="5" style="fill:${i===ph?'var(--tb)':'var(--line)'}"/>`});
    svg.innerHTML=s;setSt(ph);
    const R=[
      pop==='hiv'?`<span>people with HIV who fell ill <b>≈619,000</b></span><span>died <b>150,000</b></span><span>on ART (all estimated) <b>61%</b></span>`:meas==='deaths'?`<span>deaths <b>1.23 million</b></span><span>case fatality <b>11.5%</b> (13.6% in 2019)</span>`:`<span>fell ill <b>10.7 million</b></span><span>notified <b>8.3 million</b></span><span>missing <b>2.4 million</b></span><span>died <b>1.23 million</b></span>`,
      `<span>highest share <b>South-East Asia 34%</b></span><span>highest rate <b>Africa ≈207/100k</b></span><span>lowest rate <b>Europe ≈22/100k</b></span>`,
      `<span>8 countries <b>67%</b></span><span>top 5 <b>55%</b></span><span>30 high-burden <b>87%</b></span>`,
      `<span>incidence rate 2015→2024 <b>−12.3%</b></span><span>deaths <b>−29%</b></span><span>COVID-19 notifications <b>7.1 → 5.8 million</b></span>`];
    $('#whRead').innerHTML=R[ph];
    $('#whNote').innerHTML=noteHTML(WH_STEPS[ph]);
  }
  const stop=playWire(rg,$('#whPlay'),draw,24000,'%t:player.replay%','what');
  setSt=stepWire($('#whSteps'),WH_STEPS,rg,draw,stop);
  $$('[data-wm]').forEach(b=>b.addEventListener('click',()=>{meas=b.dataset.wm;$$('[data-wm]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  $$('[data-wp]').forEach(b=>b.addEventListener('click',()=>{pop=b.dataset.wp;$$('[data-wp]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---- TB infection in 100 people ---- */
  const ico=$('#whIco'),ir=$('#whIT');let est='h',clear=false;
  const EST={h:{p:23.0,n:'2014 model of 131 surveys',c:`[[Houben2016]]`},ig:{p:24.8,n:'meta-analysis, IGRA studies',c:`[[Cohen2019ERJ]]`},
    ts:{p:21.2,n:'meta-analysis, 10 mm skin test',c:`[[Cohen2019ERJ]]`},w:{p:33.3,n:'WHO 1999, later revised',c:`[[Cohen2019ERJ]]`}};
  const ORD=(()=>{const q=rng(1950),a=[...Array(100).keys()];for(let i=99;i>0;i--){const j=Math.floor(q()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a})();
  function drawI(t){const N=vb(ico,'720 330','400 600'),E=EST[est];
    const n=Math.round(E.p),k1=ramp(t,0,.32),k2=ramp(t,.36,.62),k3=ramp(t,.68,.92);
    const nInf=Math.round(n*k1),nClrAll=clear?Math.round(n*.731):0,nClr=Math.round(nClrAll*k2);
    const live=E.p*(clear?1-.731:1),risk=clear?.17:.075,dis=live*risk,nDis=k3>0?Math.max(1,Math.round(dis)):0,nDisNow=Math.round(nDis*Math.min(1,k3*1.6));
    const rank={};ORD.forEach((p,i)=>rank[p]=i);
    /* infected = first n in ORD; cleared = first nClr of them; disease = last of the infected who are not cleared */
    let s='';const cols=10,cw=N?34:28,ch=N?40:30,gx=N?30:28,gy=N?24:22,ps=N?28:22;
    for(let i=0;i<100;i++){const x=gx+(i%cols)*cw+cw/2,y=gy+Math.floor(i/cols)*ch,r=rank[i];let f='var(--fibro)',op=.38,o={};
      if(r<nInf){f='var(--tb)';op=.62}
      if(r<n&&r<nClr){f='var(--accent)';op=.5}
      if(r<n&&r>=n-nDisNow&&r>=nClrAll){f='var(--tb)';op=1;o.cough=true}
      if(r<n&&r>=n-nDisNow&&r>=nClrAll)s+=`<circle cx="${f1(x)}" cy="${f1(y+ps*.55)}" r="${f1(ps*.62)}" style="fill:none;stroke:var(--tb);stroke-width:1.6"/>`;
      o.op=op;s+=person(x,y,ps,f,o)}
    const tx=N?20:340,ty=N?448:40;
    const L=[[`${nInf}`,'in 100 have TB infection','var(--tb)',k1>0],
      [clear?`${nClr}`:'—',clear?'have cleared it (test may stay positive)':'self-clearance not modelled','var(--accent)',clear&&k2>0],
      [k3>0?`≈${dis<1.5?f1(dis):Math.round(dis)}`:'·','develop TB disease over a lifetime','var(--tb)',k3>0]];
    L.forEach(([a,b,c,on],i)=>{const y=ty+(N?i*40:i*58)+(N?0:24);s+=`<g style="opacity:${on?1:.35}"><text x="${tx}" y="${y}" class="t-big" style="fill:${c};font-size:${N?22:28}px">${a}</text><text x="${tx+(N?62:70)}" y="${y-(N?3:6)}" class="t-sm" style="fill:var(--ink)">${b}</text></g>`});
    const why=clear?`17.0% lifetime risk for each truly infected person (2021 model)`:`5–10% lifetime risk, as WHO has quoted it (7.5% used)`;
    s+=`<text x="${tx}" y="${N?ty+128:ty+220}" class="t-xs">${E.n}: ${E.p}%</text><text x="${tx}" y="${N?ty+144:ty+236}" class="t-xs">${why}</text>`;
    s+=`<text x="${tx}" y="${N?ty+160:ty+252}" class="t-xs" style="fill:var(--warn)">ILLUSTRATIVE ARITHMETIC · population figures</text>`;
    if(!N)s+=`<text x="${tx}" y="${ty}" class="t-sm" style="fill:var(--muted)">${k3>0?'LIFETIME':k2>0&&clear?'CLEARING':'INFECTED'}</text>`;
    ico.innerHTML=s;
    $('#whICap').innerHTML=`Each figure is 1 in 100 people. The infection share is from ${E.n} ${E.c}; the lifetime risk is ${clear?'from the self-clearance model [[Emery2021]]':'the WHO figure quoted by Behr and colleagues [[Behr2018]]'}. Combining figures from different studies is a teaching device, not an estimate.`;
    const ph=k3>0?2:(k2>0&&clear)?1:0;
    const NOTES=[{k:'TB infection',t:`About ${E.p>30?'one in three':'one in four'} people`,
      txt:`A model of 131 infection surveys (1950–2011) estimated that 23.0% of the world's population, about 1.7 billion people, had TB infection in 2014; about 80% of them lived in the South-East Asia, Western Pacific and African regions, and 0.8% of the world had been infected in the past 2 years, the group at highest risk. A meta-analysis of 88 studies found 24.8% by IGRA and 21.2% by a 10 mm skin test. WHO's 1999 estimate was one-third. [[Houben2016,Cohen2019ERJ]]`,
      pt:`About 1 in 4 people in the world may have met the TB germ without being sick. This is TB infection, and it is not contagious.`,
      hook:`≈ a quarter of humanity: 23.0% (≈1.7 billion) by model, 24.8% by IGRA meta-analysis.`},
     {k:'Self-clearance',t:'Many may have cleared it',
      txt:`<span class="ev early">Early evidence</span> Modelling that allows the immune system to clear the bacteria estimates that 24.4% of infected people clear it within 10 years and 73.1% over a lifetime. Skin and blood tests can stay positive after the bacteria are gone: in one trial, people stayed tuberculin-positive up to 9 years after treatment. [[Emery2021,Behr2019]]`,
      pt:`A positive TB test shows the body remembers the germ. It does not prove the germ is still alive.`,
      hook:`Tests measure immune memory, not live bacteria. Self-clearance model: 73.1% clear over a lifetime.`},
     {k:'Progression',t:'Only a few ever fall ill',
      txt:`WHO's resource page has stated that "on average, 5-10%" of infected people develop TB disease over their lifetime. If self-clearance is real, fewer people are truly infected but each faces a higher risk, 17.0% rather than 12.6%: the number who fall ill changes far less than the number "infected". Most disease appears within two years of infection, which is why recent contacts are a priority for <a href="#tpt" data-go="tpt">preventive treatment</a>. [[Behr2018,Emery2021]]`,
      pt:`Most people with TB infection never get sick. The risk is highest in the first year or two, and short preventive treatment lowers it further.`,
      hook:`Lifetime risk after infection: "5–10%" (WHO, as quoted); 17.0% of the truly infected once self-clearance is allowed for. Risk is front-loaded: most disease within 2 years.`}];
    $('#whINote').innerHTML=noteHTML(NOTES[ph]);
  }
  playWire(ir,$('#whIPlay'),drawI,9000,'%t:player.replay%','what');
  $$('[data-wi]').forEach(b=>b.addEventListener('click',()=>{est=b.dataset.wi;$$('[data-wi]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawI(+ir.value)}));
  $('#whClear').addEventListener('click',()=>{clear=!clear;$('#whClear').setAttribute('aria-pressed',clear);drawI(+ir.value)});
  drawI(+ir.value);
};
