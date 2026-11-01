/* =============== 6.1 History & people =============== */
/* kind: d description, m medicine, x manual or classification, s study or consensus */
const HI_EV=[
 {y:1798,k:'d',c:'Crichton: "mental restlessness"',who:'Sir Alexander Crichton, Scottish physician',t:'1798 · Mental restlessness',
  txt:`Crichton described "mental restlessness", an incapacity to attend "with a necessary degree of constancy to any one object", which could be present from birth and "generally diminished with age". Earlier still, in 1775, the German physician Melchior Adam Weikard described attention deficits in a medical textbook, proposed as the earliest known description. [[Lange2010,Palmer2001,Barkley2012Weikard]]`,
  pt:`Doctors noticed people who could not keep their attention on one thing more than 200 years ago.`,
  hook:`Weikard 1775, Crichton 1798 and Still 1902 are all proposed as "first"; historians caution that each only partly matches ADHD. [[Lange2010,MartinezBadia2015]]`},
 {y:1845,k:'d',c:'Hoffmann: "Fidgety Philip"',who:'Heinrich Hoffmann, Frankfurt physician',t:'1845 · Fidgety Philip',
  txt:`Hoffmann published "Struwwelpeter", drawn in 1844 for his 3-year-old son. Its stories "Fidgety Philip" and "Johnny Look-in-the-air" (added in 1847) depict restlessness and inattention. [[Lange2010,Thome2004,Faraone2021]]`,
  pt:`A children's picture book from 1845 shows a boy who cannot sit still at the table and another who never looks where he is going.`},
 {y:1887,k:'d',c:'Bourneville and French clinicians',who:'Désiré-Magloire Bourneville and colleagues',t:'1887–1901 · French clinicians',
  txt:`French clinicians including Bourneville described an equivalent of ADHD in medical and educational writing between 1887 and 1901. [[Faraone2021,MartinezBadia2015]]`},
 {y:1902,k:'d',c:'Still: Goulstonian Lectures',who:'George Frederic Still, British paediatrician',t:'1902 · Still\'s lectures',
  txt:`Still gave three Goulstonian Lectures to the Royal College of Physicians, "On some abnormal psychical conditions in children", published in the Lancet. He described 20 children with a "defect of moral control" without intellectual impairment or physical disease: 15 boys and 5 girls, with onset before age 7 in 7 of the 9 whose onset was known. His concept is not the same as ADHD, but his cases include clear inattention and impulsivity. [[Still1902,Lange2010]]`,
  pt:`A London children's doctor described 20 children who could not control their behaviour, though they were bright and physically well.`,
  hook:`Still 1902: "defect of moral control", 15 boys and 5 girls. [[Lange2010]]`},
 {y:1917,k:'d',c:'Encephalitis epidemic, 1917–1928',who:'Survivors of encephalitis lethargica',t:'1917–1928 · After the epidemic',
  txt:`The encephalitis lethargica epidemic affected about 20 million people. Many children who survived showed a "postencephalitic behaviour disorder" with hyperactivity and impulsivity, which pushed the idea that brain injury could cause these behaviours. [[Lange2010]]`},
 {y:1932,k:'d',c:'Kramer & Pollnow: hyperkinetic disease',who:'Franz Kramer and Hans Pollnow, German physicians',t:'1932 · Hyperkinetic disease',
  txt:`Kramer and Pollnow described a "hyperkinetic disease of infancy", with onset at 3–4 years and a peak at 6. The term "hyperkinetic disorder" was later adopted by the WHO. [[Lange2010,Faraone2021]]`},
 {y:1937,k:'m',c:'Bradley: Benzedrine',who:'Charles Bradley, Emma Pendleton Bradley Home, Rhode Island',t:'1937 · Benzedrine by chance',
  txt:`Bradley gave Benzedrine, an amphetamine, to children to treat headaches after pneumoencephalography and noticed better behaviour and school performance. In his 30 children, "the remarkably improved school performance of approximately half the children" was the most striking change. The findings were largely ignored for about 25 years. [[Bradley1937,Strohl2011,Lange2010]] See <a href="#stimulants" data-go="stimulants">How stimulants work</a>.`,
  pt:`The first stimulant for children's behaviour was found by accident, while treating headaches.`,
  hook:`Bradley 1937: Benzedrine improved behaviour and school performance. [[Strohl2011]]`},
 {y:1944,k:'m',c:'Methylphenidate synthesised',who:'Leandro Panizzon, chemist; Ciba',t:'1944 · Methylphenidate',
  txt:`Methylphenidate was first synthesised by Leandro Panizzon in 1944. It was named Ritalin after his wife and marketed by Ciba in 1954. The Drugs@FDA record gives 5 December 1955 as the original US approval date of RITALIN, and the FDA approved methylphenidate for behavioural disorders in children in the 1960s. [[Lange2010,FDA-Ritalin,Faraone2021]]`},
 {y:1957,k:'d',c:'Laufer: hyperkinetic impulse disorder',who:'Maurice Laufer and colleagues',t:'1957 · Hyperkinetic impulse disorder',
  txt:`Laufer and colleagues described a "hyperkinetic impulse disorder". [[Lange2010]]`},
 {y:1963,k:'d',c:'"Minimal brain dysfunction"',who:'Oxford International Study Group of Child Neurology; Clements task force (1966)',t:'1963–1966 · Minimal brain dysfunction',
  txt:`In the 1940s and 1950s, "minimal brain damage" assumed brain injury from behaviour alone. In 1963 the Oxford International Study Group argued that brain damage should not be inferred from behaviour and favoured "minimal brain dysfunction". In 1966 a US task force led by Clements defined it in children of near-average or higher intelligence with problems including "control of attention, impulse or motor function". [[Lange2010]]`,
  hook:`1963: "minimal brain dysfunction" replaced "minimal brain damage". [[Lange2010]]`},
 {y:1968,k:'x',c:'DSM-II: Hyperkinetic Reaction',who:'American Psychiatric Association',t:'1968 · DSM-II',
  txt:`DSM-II named "Hyperkinetic Reaction of Childhood", defined in two sentences focused on overactivity and noting that the behaviour "usually diminishes by adolescence". [[Lange2010,Epstein2013]]`},
 {y:1972,k:'d',c:'Douglas: attention matters most',who:'Virginia Douglas, psychologist',t:'1972 · Attention takes centre stage',
  txt:`Virginia Douglas argued that deficits in sustained attention and impulse control mattered more than hyperactivity. [[Lange2010]]`,
  pt:`A researcher pointed out that the hardest part is often keeping attention, not moving too much.`},
 {y:1980,k:'x',c:'DSM-III: Attention Deficit Disorder',who:'American Psychiatric Association',t:'1980 · DSM-III',
  txt:`DSM-III renamed the condition "Attention Deficit Disorder (with or without hyperactivity)", with separate symptom lists for inattention, impulsivity and hyperactivity. [[Lange2010,Epstein2013]]`,
  hook:`DSM-III (1980): "Attention Deficit Disorder with or without hyperactivity". [[Lange2010]]`},
 {y:1987,k:'x',c:'DSM-III-R: ADHD',who:'American Psychiatric Association',t:'1987 · DSM-III-R',
  txt:`DSM-III-R renamed it "Attention-deficit Hyperactivity Disorder (ADHD)" and dropped the two subtypes. [[Lange2010]]`},
 {y:1990,k:'s',c:'Adults: it can persist',who:'Clinicians and researchers in the 1990s',t:'1990s · Not only a childhood disorder',
  txt:`Until the 1990s, ADHD was widely seen as a childhood disorder that children "grow out" of at puberty. In the 1990s it was recognised to persist into adulthood in many cases. [[Lange2010]] At age 25, about 15% still meet full criteria and about 65% when partial remission is counted. [[Faraone2006]]`,
  pt:`For a long time people thought children grew out of ADHD. Now we know many adults still have it.`},
 {y:1994,k:'x',c:'DSM-IV: three subtypes',who:'American Psychiatric Association',t:'1994 · DSM-IV',
  txt:`DSM-IV introduced three subtypes (predominantly inattentive, predominantly hyperactive-impulsive and combined), based on a large field trial of children and adolescents up to age 17. It required impairing symptoms before age 7. [[Lange2010,Epstein2013]]`},
 {y:1999,k:'s',c:'The MTA trial',who:'The MTA Cooperative Group',t:'1999 · The MTA study',
  txt:`In the 14-month MTA trial of 579 children aged 7 to 9.9, carefully managed medication was better for core ADHD symptoms than intensive behavioural treatment and community care; combined treatment was not better than medication alone for core symptoms. [[MTA1999]] See <a href="#mta" data-go="mta">The MTA study</a>.`,
  hook:`MTA 1999: 579 children, 14 months; medication management beat behavioural treatment and community care on core symptoms. [[MTA1999]]`},
 {y:2000,k:'x',c:'DSM-IV-TR',who:'American Psychiatric Association',t:'2000 · DSM-IV-TR',
  txt:`DSM-IV-TR was a text revision, with changes mostly confined to the descriptive text. [[Lange2010]]`},
 {y:2013,k:'x',c:'DSM-5: onset before 12',who:'American Psychiatric Association',t:'2013 · DSM-5',
  txt:`DSM-5 moved the onset rule to several symptoms before age 12 instead of 7, set 5 symptoms for older adolescents and adults, required symptoms (not impairment) in two or more settings, replaced "types" with "presentations", allowed ADHD alongside autism, and added severity and partial-remission specifiers. [[Epstein2013]]`,
  pt:`In 2013 the rules were adjusted so that adults and people whose symptoms began a little later could be recognised.`,
  hook:`DSM-5: onset before 12 (was 7); 5 symptoms at 17 and over; "presentations"; autism no longer excludes ADHD. [[Epstein2013]]`},
 {y:2019,k:'x',c:'ICD-11: neurodevelopmental',who:'World Health Organization; World Health Assembly',t:'2019 · ICD-11',
  txt:`ICD-11 was approved by the World Health Assembly in May 2019, and reporting with it began on 1 January 2022. [[Reed2019ICD11]] It moved ADHD from disruptive to neurodevelopmental disorders, replaced "hyperkinetic disorder" with ADHD, uses presentations, and gives no precise age of onset, duration or symptom count. [[Posner2020]] The code is 6A05 (ICD-10: F90). [[TebartzVanElst2025]]`,
  hook:`ICD-11 code for ADHD: 6A05 (ICD-10 F90). [[TebartzVanElst2025]]`},
 {y:2021,k:'s',c:'World Federation consensus',who:'80 authors from 27 countries',t:'2021 · The International Consensus Statement',
  txt:`The World Federation of ADHD International Consensus Statement listed 208 evidence-based conclusions, approved by 80 authors from 27 countries on 6 continents. It was written because misconceptions "stigmatize affected people, reduce credibility of providers, and prevent/delay treatment". [[Faraone2021]]`},
 {y:2022,k:'x',c:'DSM-5-TR',who:'American Psychiatric Association',t:'2022 · DSM-5-TR',
  txt:`The American Psychiatric Association published DSM-5-TR, the text revision of DSM-5. [[APA2022DSM]] Its threshold is 6 or more symptoms in a domain up to age 16 and 5 or more from age 17. [[APA2022DSM,Posner2020]]`,
  pt:`Today's manual keeps the 2013 rules and updates the text around them.`}
];
/* the name on screen, from its year */
const HI_NAMES=[[1798,'"Mental restlessness"','Crichton'],[1902,'"Defect of moral control"','Still'],[1917,'Postencephalitic behaviour disorder','after encephalitis lethargica'],[1932,'Hyperkinetic disease of infancy','Kramer & Pollnow'],[1957,'Hyperkinetic impulse disorder','Laufer'],[1963,'Minimal brain dysfunction','Oxford group, then Clements'],[1968,'Hyperkinetic Reaction of Childhood','DSM-II'],[1980,'Attention Deficit Disorder (with or without hyperactivity)','DSM-III'],[1987,'Attention-deficit Hyperactivity Disorder','DSM-III-R'],[1994,'ADHD: three subtypes','DSM-IV'],[2013,'ADHD: three presentations','DSM-5'],[2019,'ADHD (6A05), neurodevelopmental','ICD-11'],[2022,'ADHD','DSM-5-TR']];
const HI_BOOKS=[[1968,'II'],[1980,'III'],[1987,'III-R'],[1994,'IV'],[2000,'IV-TR'],[2013,'5'],[2019,'ICD-11'],[2022,'5-TR']];
const HI_ERA=[[1790,1798,'Early descriptions'],[1917,1917,'Brain injury & stimulants'],[1963,1963,'From MBD to DSM-II'],[1980,1980,'Attention takes centre stage'],[1999,1999,'Trials, adults & DSM-5'],[2019,2019,"Today's manuals"]];
inits.history=()=>{
  const svg=$('#hiSvg'),rg=$('#hiT');
  const BR=[[1790,0],[1900,.2],[1960,.42],[2000,.78],[2023,1]];
  const fx=y=>{for(let i=1;i<BR.length;i++)if(y<=BR[i][0]||i===BR.length-1)return lerp(BR[i-1][1],BR[i][1],clamp((y-BR[i-1][0])/(BR[i][0]-BR[i-1][0])));return 1};
  const fy=u=>{for(let i=1;i<BR.length;i++)if(u<=BR[i][1]||i===BR.length-1)return lerp(BR[i-1][0],BR[i][0],clamp((u-BR[i-1][1])/(BR[i][1]-BR[i-1][1])));return 2023};
  const steps=HI_ERA.map(([f,a,t],i)=>({from:i?fx(f):0,at:Math.min(1,fx(a)+.004),t}));
  const KC={d:'var(--brand)',m:'var(--rx)',x:'var(--dx)',s:'var(--beh)'};
  const T=(x,y,c,v,st)=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${v}</text>`;
  const wrap=(s,n)=>{const w=s.split(' '),L=[''];w.forEach(x=>{if((L[L.length-1]+' '+x).trim().length>n)L.push(x);else L[L.length-1]=(L[L.length-1]+' '+x).trim()});return L};
  /* chips and cards */
  $('#hiYears').innerHTML=HI_EV.map((E,i)=>`<button class="tag" data-hy="${i}"><small>${E.y}</small>${E.c}</button>`).join('');
  $('#hiCards').innerHTML=HI_EV.map(E=>`<div class="card"><span class="tag ${{d:'brand',m:'rx',x:'dx',s:'beh'}[E.k]}">${E.y}${E.y===1917?'–1928':E.y===1887?'–1901':''}</span><h4>${E.t.replace(/^[^·]*· /,'')}</h4><p class="hi-who">${E.who}</p><p>${E.txt}</p></div>`).join('');
  let setStep=null;
  function draw(t){const N=vb(svg,'720 420','400 640'),yr=fy(t);let s='';
    const L=N?{nx:200,ny:44,nw:24,sh:[16,200,384,280],g:[16,384,380],ax:[24,376],ay:520}:{nx:360,ny:44,nw:46,sh:[20,128,330,232],g:[372,700,170],ax:[30,690],ay:340};
    /* name morph */
    let ni=0;HI_NAMES.forEach((n,i)=>{if(yr>=n[0]-.6)ni=i});
    s+=T(L.nx,18,'t-xs t-mid','WHAT IT WAS CALLED','fill:var(--brand)');
    HI_NAMES.forEach((n,i)=>{const nextY=(HI_NAMES[i+1]||[3000])[0];const op=(i?ramp(yr,n[0]-1,n[0]-.2):1)*(1-ramp(yr,nextY-1,nextY-.2));
      if(op<=.01)return;const dy=(1-op)*8;const lines=wrap(n[1],L.nw);
      lines.forEach((l,j)=>{s+=T(L.nx,L.ny+dy+j*24-(lines.length-1)*8,'t-big t-mid',l,`font-size:${N?19:22}px;opacity:${f1(op)}`)});
      s+=T(L.nx,L.ny+dy+lines.length*24-(lines.length-1)*8+(N?2:0),'t-sm t-mid',`${n[0]} · ${n[2]}`,`opacity:${f1(op)}`)});
    /* manual shelf */
    const [sx0,sy0,sx1,sy1]=L.sh;
    s+=T(sx0,sy0-8,'t-xs','THE MANUALS','fill:var(--dx)');
    s+=`<line x1="${sx0}" x2="${sx1}" y1="${sy1}" y2="${sy1}" style="stroke:var(--desk);stroke-width:4;stroke-linecap:round"/>`;
    const bw=(sx1-sx0)/HI_BOOKS.length;
    HI_BOOKS.forEach(([y,l],i)=>{const p=ease(ramp(yr,y-1,y+.5)),bx=sx0+i*bw+3,w=bw-6;const hh=Math.min(sy1-sy0-6,(sy1-sy0)*(.55+i*.055));
      if(p<=0){s+=`<rect x="${f1(bx)}" y="${f1(sy1-hh)}" width="${f1(w)}" height="${f1(hh)}" rx="3" style="fill:none;stroke:var(--line);stroke-dasharray:3 3"/>`;return}
      const icd=l==='ICD-11';s+=`<rect x="${f1(bx)}" y="${f1(sy1-hh*p)}" width="${f1(w)}" height="${f1(hh*p)}" rx="3" style="fill:${icd?'var(--accent)':'var(--dx)'};opacity:${f1(.35+.6*p)}"/>`;
      s+=T(bx+w/2,sy1-hh*p+16,'t-xs t-mid',icd?'ICD':'DSM','fill:var(--panel);font-weight:700')+T(bx+w/2,sy1-hh*p+29,'t-xs t-mid',icd?'11':l,'fill:var(--panel);font-weight:700')+T(bx+w/2,sy1+14,'t-xs t-mid',String(y))});
    if(yr<1968)s+=T((sx0+sx1)/2,sy1-30,'t-xs t-mid','no ADHD entry in a manual yet');
    /* gauges: onset rule and adult threshold */
    const [gx0,gx1,gy0]=L.g,gw=gx1-gx0;
    s+=T(gx0,gy0-60,'t-xs','SYMPTOMS MUST START BEFORE AGE','fill:var(--dx)');
    const ax=v=>gx0+gw*v/18,gy=gy0-40;s+=`<rect x="${gx0}" y="${gy}" width="${gw}" height="10" rx="5" style="fill:var(--panel-2)"/>`;
    [0,3,6,9,12,15,18].forEach(v=>{s+=T(ax(v),gy+24,'t-xs t-mid',v)});
    const on=yr>=1994,onset=yr>=2013?lerp(7,12,ease(ramp(yr,2012,2013.5))):7;
    if(on){s+=`<rect x="${gx0}" y="${gy}" width="${f1(ax(onset)-gx0)}" height="10" rx="5" style="fill:var(--dx);opacity:.7"/><path d="M${f1(ax(onset))} ${gy-3}v16" style="stroke:var(--ink);stroke-width:2.4"/>`+T(ax(onset),gy-8,'t-sm t-mid',`${Math.round(onset)}`,'fill:var(--ink);font-weight:700');
      if(yr>=2019)s+=T(gx1,gy0-60,'t-xs t-end','ICD-11: no precise age','fill:var(--accent)')}
    else s+=T(gx0+gw/2,gy-6,'t-xs t-mid',yr>=1968?'not stated in this guide\'s sources':'—');
    const ay=gy0+12;s+=T(gx0,ay-12,'t-xs','SYMPTOMS NEEDED IN A DOMAIN, AGE 17+','fill:var(--dx)');
    for(let i=0;i<9;i++){const need=5,act=yr>=2013;const cx=gx0+8+i*(gw-16)/8;
      s+=`<circle cx="${f1(cx)}" cy="${ay+6}" r="${N?8:9}" style="fill:${act&&i<need?'var(--dx)':'var(--panel)'};stroke:var(--dx);stroke-width:1.2;opacity:${act?1:.3}"/>`}
    s+=T(gx0,ay+32,'t-xs',yr>=2013?'DSM-5 onward: 5 of 9 at 17 and over (6 up to 16)':'no separate adult threshold before DSM-5','fill:var(--ink)');
    /* timeline */
    const [x0,x1]=L.ax,Y=L.ay,X=y=>lerp(x0,x1,fx(y));
    s+=`<line x1="${x0}" x2="${x1}" y1="${Y}" y2="${Y}" style="stroke:var(--line);stroke-width:4;stroke-linecap:round"/><line x1="${x0}" x2="${f1(X(yr))}" y1="${Y}" y2="${Y}" style="stroke:var(--brand);stroke-width:4;stroke-linecap:round"/>`;
    [1800,1850,1900,1950,1980,2000,2020].forEach(y=>{s+=`<line x1="${f1(X(y))}" x2="${f1(X(y))}" y1="${Y+6}" y2="${Y+11}" class="axis"/>`+T(X(y),Y+23,'t-xs t-mid',y)});
    let ei=0;HI_EV.forEach((E,i)=>{if(yr>=E.y-.3)ei=i});
    HI_EV.forEach((E,i)=>{const past=yr>=E.y-.3;s+=`<circle cx="${f1(X(E.y))}" cy="${Y}" r="${i===ei?7:4.5}" style="fill:${past?KC[E.k]:'var(--panel)'};stroke:${KC[E.k]};stroke-width:1.6"/>`});
    const E=HI_EV[ei],ex=X(E.y),lines=wrap(E.c,N?30:34),bwid=Math.max(...lines.map(l=>l.length))*6.3+20,bh=lines.length*13+22;
    const bx=clamp(ex-bwid/2,x0-10,x1+10-bwid),by=Y-bh-18;
    s+=`<rect x="${f1(bx)}" y="${f1(by)}" width="${f1(bwid)}" height="${bh}" rx="8" style="fill:var(--panel);stroke:${KC[E.k]};stroke-width:1.4"/><path d="M${f1(ex)} ${Y-8}L${f1(ex)} ${f1(by+bh)}" style="stroke:${KC[E.k]};stroke-width:1.4"/>`;
    s+=T(bx+10,by+15,'t-xs',`${E.y}${E.y===1917?'–1928':E.y===1887?'–1901':''}`,`fill:${KC[E.k]};font-weight:700`);
    lines.forEach((l,j)=>{s+=T(bx+10,by+29+j*13,'t-xs',l,'fill:var(--ink)')});
    if(E.k==='m')s+=pill(bx+bwid-18,by+14,20,E.y===1937?'tab':'cap');
    s+=`<path d="M${f1(X(yr)-6)} ${Y+32}h12l-6 -8z" style="fill:var(--ink)"/>`+T(X(yr),Y+46,'t-sm t-mid',Math.floor(yr),'fill:var(--ink);font-weight:700');
    /* key */
    const ky=N?Y+70:Y+66;[['description','d'],['medicine','m'],['manual','x'],['study or consensus','s']].forEach(([l,k],i)=>{const kx=N?16+(i%2)*190:x0+i*150,yy=N?ky+Math.floor(i/2)*16:ky;s+=`<circle cx="${kx+5}" cy="${yy-4}" r="5" style="fill:${KC[k]}"/>`+T(kx+15,yy,'t-xs',l)});
    svg.innerHTML=s;
    $('#hiNote').innerHTML=noteHTML({k:`${E.y} · ${HI_ERA[phaseOf(steps,t)][2]}`,t:E.t,txt:`<span class="hi-who" style="font:500 12px var(--mono);color:var(--muted)">${E.who}</span><br>${E.txt}`,pt:E.pt,hook:E.hook});
    $('#hiRead').innerHTML=`<span>Year <b>${Math.floor(yr)}</b></span><span>Name <b>${HI_NAMES[ni][1]}</b></span>`;
    $$('#hiYears [data-hy]').forEach(b=>b.classList.toggle('brand',+b.dataset.hy===ei));
    setStep&&setStep(phaseOf(steps,t))}
  const stop=playWire(rg,$('#hiPlay'),draw,30000,'Replay','history');
  setStep=stepWire($('#hiSteps'),steps,rg,draw,stop);
  $('#hiYears').addEventListener('click',e=>{const b=e.target.closest('[data-hy]');if(!b)return;stop();const v=Math.min(1,fx(HI_EV[+b.dataset.hy].y)+.002);rg.value=v;draw(v);$('#hiSvg').scrollIntoView({block:'center',behavior:RM?'auto':'smooth'})});
  draw(+rg.value);
};
