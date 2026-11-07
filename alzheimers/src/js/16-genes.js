
/* =============== 1.6 genes and inheritance =============== */
const GN_AL=[
 {a:2,n:'ε2',h:7,d:4,f:['fewer than 1% are ε2/ε2','<1% are ε2/ε2']},
 {a:3,n:'ε3',h:79,d:58,f:['the most common version','most common']},
 {a:4,n:'ε4',h:14,d:38,f:['9–20% across populations','range 9–20%']}];
const GN_GT=[
 {id:'e2e2',l:'ε2/ε2',a:[2,2],far:[0.6,0.2,2.0],rei:0.13,
  txt:'Two copies of ε2. In the 2020 autopsy-confirmed study, ε2/ε2 had an odds ratio of 0.13 against ε3/ε3, and 0.004 against ε4/ε4. Fewer than 1% of people are ε2/ε2. The 1997 clinical estimate, 0.6, had a wide interval (0.2–2.0) because the group is so small. [[Reiman2020,Farrer1997]]'},
 {id:'e2e3',l:'ε2/ε3',a:[2,3],far:[0.6,0.5,0.8],rei:0.39,
  anc:{h:['ε2 BY ANCESTRY, 2023 (AS REPORTED)','ε2 BY ANCESTRY, 2023'],rows:[['White',0.53],['Black',0.69],['Hispanic (not significant)',0.89],['East Asian (not significant)',0.97]]},
  txt:'One protective copy. Odds ratio 0.6 (0.5–0.8) in the 1997 meta-analysis and 0.39 in autopsy-confirmed cases. In a 2023 analysis of 68,756 people, ε2 was protective in White (0.53) and Black (0.69) participants but showed no significant association in Hispanic (0.89) or East Asian (0.97) participants. [[Farrer1997,Reiman2020,Belloy2023]]'},
 {id:'e3e3',l:'ε3/ε3',a:[3,3],far:[1],rei:1,
  txt:'The reference group, so its odds ratio is 1 by definition. ε3 makes up 79% of APOE alleles in cognitively healthy people. Alzheimer\'s still occurs with ε3/ε3: most APOE alleles in people with Alzheimer\'s are not ε4. [[Yamazaki2019]]'},
 {id:'e2e4',l:'ε2/ε4',a:[2,4],far:[2.6,1.6,4.0],rei:2.68,
  txt:'One protective and one risk copy. Odds ratio 2.6 (1.6–4.0) in the 1997 meta-analysis and 2.68 in autopsy-confirmed cases. [[Farrer1997,Reiman2020]]'},
 {id:'e3e4',l:'ε3/ε4',a:[3,4],far:[3.2,2.8,3.8],rei:6.13,
  anc:{h:['ε3/ε4 BY ANCESTRY','ε3/ε4 BY ANCESTRY'],rows:[['Japanese, 1997',5.6],['East Asian, 2023',4.54],['White, 2023',3.46],['Black, 2023',2.18],['Hispanic, 2023',1.90]]},
  txt:'The commonest risk genotype. Odds ratio 3.2 (2.8–3.8) in 1997 and 6.13 in autopsy-confirmed cases. A review puts one ε4 at about 3–4-fold risk and 2–5 years earlier onset. The effect is strongest in East Asian and weakest in Hispanic participants, and in 1997 it weakened after age 70. [[Farrer1997,Reiman2020,Yamazaki2019,Belloy2023]]'},
 {id:'e4e4',l:'ε4/ε4',a:[4,4],far:[14.9,10.8,20.6],rei:31.22,
  anc:{h:['ε4/ε4 BY ANCESTRY','ε4/ε4 BY ANCESTRY'],rows:[['Japanese, 1997',33.1],['White, 1997',14.9],['European (quoted, 2024)',13],['African ancestry (quoted)',6.5]]},
  txt:'Odds ratio 14.9 (10.8–20.6) in 1997 and 31.22 in autopsy-confirmed cases, against 10.70 in clinically diagnosed groups, where misdiagnosis dilutes the effect. About 2–3% of people and about 15% of people with Alzheimer\'s are ε4/ε4. The European and African figures are approximate values quoted in a 2024 news report. [[Farrer1997,Reiman2020,AlzforumNews2024]]',
  hook:'In 2024, Fortea and colleagues proposed ε4/ε4 as a distinct genetic form of Alzheimer\'s. Critics: near-full penetrance of the biology is not near-full penetrance of dementia. [[Fortea2024,AlzforumNews2024]]'}];
const GN_LIFE=[
 {g:['e4e4'],l:'ε4/ε4 · case-control based',s:'Alzheimer\'s by age 85, European ancestry',a:51,b:60,c:68,v:'51–60%; 68% for women with French incidence data',src:'[[Genin2011]]'},
 {g:['e4e4'],l:'ε4/ε4 · population cohorts',s:'MCI or dementia by 80–85 (Framingham, Rotterdam)',a:31,b:40,v:'about 31–40%',src:'[[Qian2017]]'},
 {g:['e3e4'],l:'ε3/ε4 · case-control based',s:'Alzheimer\'s by age 85, European ancestry',a:23,b:30,c:35,v:'23–30%; 35% for women with French incidence data',src:'[[Genin2011]]'},
 {g:['e3e3','e2e3','e2e2','e2e4'],l:'Everyone, any genotype',s:'Alzheimer\'s by age 85, European ancestry',a:11,b:14,v:'11% of men, 14% of women',src:'[[Genin2011]]'}];
const GN_STEPS=[
 {from:0,at:.04,k:'Step 1 · The family',t:'One parent carries the mutation',
  txt:'In this family one parent carries a mutation in a dominant Alzheimer\'s gene. Apart from the earlier onset, dominantly inherited Alzheimer\'s is clinically and pathologically very similar to the common late-onset form. [[Bateman2011]]',
  pt:'One parent has a rare gene change that causes Alzheimer\'s at a younger age.'},
 {from:.14,at:.24,k:'Step 2 · Two copies',t:'Each child gets one of two copies',
  txt:'The carrier parent has one changed copy (M) and one usual copy (+). Each child gets one of the two at random, so each child has a 50% chance of inheriting the mutation. Where no mutation has been found in a family, the guideline notes the risk "may be less" than 50%. [[Goldman2011]]',
  pt:'Every child is a separate coin toss: heads they inherit the gene change, tails they do not.',
  hook:'Autosomal dominant: one copy is enough; each child of a carrier has a 50% chance, independent of brothers and sisters.'},
 {from:.34,at:.46,k:'Step 3 · The children',t:'A separate 50% for each child',
  txt:'Each child\'s chance is 50% on its own, so a family of four can have none, some or all carriers. The penetrance is near complete: a 1963 series found early-onset Alzheimer\'s in 11 of 26 children of an affected parent and none in branches without one, and a 2026 trial report calls PSEN1 mutations "fully penetrant". [[Bateman2011,Tariot2026]]',
  pt:'Chance does not keep score. Press "Another family" to see how the same 50% plays out differently.'},
 {from:.5,at:.56,k:'Step 4 · Age at onset',t:'When symptoms start',txt:'',
  pt:'The age a parent first showed symptoms, together with the exact gene change, gives a rough guide to when a child who carries it will.'},
 {from:.62,at:.8,k:'Step 5 · DIAN',t:'Changes start 25 years early',
  txt:'The Dominantly Inherited Alzheimer Network set each person on a clock running from their parent\'s age at onset. Across 128 people, CSF amyloid β42 began falling about 25 years before expected onset; amyloid PET, CSF tau and atrophy appeared at about 15 years; hypometabolism and episodic memory loss at 10; global cognitive decline at 5. Dementia criteria were met on average 3 years after expected onset. [[Bateman2012]] Later longitudinal DIAN data confirmed that amyloid changes first, but placed the CSF tau rise more than 10 years later than this cross-sectional estimate. [[McDade2018]]',
  pt:'Brain changes begin about 25 years before the age the parent became ill, long before any symptoms.',
  hook:'DIAN: CSF Aβ42 −25 y → amyloid PET −15 → hypometabolism and memory −10 → global cognition −5 → dementia +3. Longitudinal data confirm amyloid changes first. [[Bateman2012,McDade2018]]'},
 {from:.88,at:.95,k:'Step 6 · How common?',t:'A small share of all Alzheimer\'s',
  txt:'Sources disagree on the exact share. A 2011 DIAN review says dominantly inherited Alzheimer\'s is fewer than 1% of all cases. The ACMG/NSGC guideline puts it under 5%, and notes that not all early-onset Alzheimer\'s is dominant. [[Bateman2011,Goldman2011]] Alzforum listed 383 PSEN1, 120 APP and 92 PSEN2 variants in October 2026, including benign and uncertain ones. [[Alzforum2026]]',
  pt:'Families like this are rare. Most Alzheimer\'s does not follow this pattern.'}];
const GN_ONSET={
 APP:{l:['Typical onset in the 50s','range about 45–60'],t:'APP families typically begin in their 50s, range about 45–60. Duplicating the whole APP gene also causes dominant early-onset Alzheimer\'s, with amyloid in vessel walls. [[Bateman2011,RoveletLecrux2006]]'},
 PSEN1:{l:['Typical onset 30–50','some families in their 20s'],t:'PSEN1 gives the youngest onsets, typically 30 to 50 and in some families the 20s. PSEN1 and PSEN2 encode parts of gamma-secretase; their mutations raise amyloid β42. [[Bateman2011]]'},
 PSEN2:{l:['Wide range of onset,','some relatively late'],t:'PSEN2 has a wide range of onset, including some relatively late cases, and onset is significantly later than with PSEN1 or APP. No PSEN2 penetrance figure could be verified for this app. [[Bateman2011,Ryman2014]]'}};
const GN_DIAN=[[-25,'CSF Aβ42 starts','to fall'],[-15,'Amyloid PET +,','CSF tau, atrophy'],[-10,'Hypometabolism,','episodic memory'],[-5,'Global cognition','(MMSE, CDR)'],[0,'Expected onset',''],[3,'Dementia','criteria met']];
const GN_DS=[
 {a:20,b:29,l:'20s: CSF Aβ42/40 and plasma NfL change',c:'Fortea2020'},
 {a:30,b:39,l:'30s: amyloid PET turns positive',c:'Fortea2020'},
 {a:40,l:'By 40: AD pathology in virtually all',c:'LottHead2019'},
 {a:50.2,l:'50.2: median age, prodromal AD',c:'Fortea2020'},
 {a:53.7,l:'53.7: median age, AD dementia',c:'Fortea2020'},
 {a:55,l:'55: mean dementia age, Irish cohort',c:'McCarron2017'},
 {a:60,b:69,l:'60s: symptomatic AD in 90–100%',c:'Fortea2020'}];
/* push labels apart so none overlap; keeps order, adds leader lines */
function gnRelax(ys,gap){const out=[];ys.forEach((y,i)=>{out.push(i?Math.max(y,out[i-1]+gap):y)});return out}
inits.genes=()=>{
  /* ---------------- APOE odds ratios ---------------- */
  const asv=$('#gnApoe');let gi=4,cur={f:GN_GT[4].far[0],r:GN_GT[4].rei},stopA=null,ap=1,lastA='';
  const lg=v=>Math.log10(v);
  $('#gnGeno').insertAdjacentHTML('beforeend',GN_GT.map((g,i)=>`<button class="btn" data-gi="${i}" aria-pressed="${i===gi}">${g.l}</button>`).join(''));
  function drawA(){
    const N=vb(asv,'720 480','400 492'),G=GN_GT[gi];
    const L=N?{cx:i=>4+i*132,cw:126,x0:16,x1:318,fy:188,ry:234,fl:182,rl:228,ax:264,tl:278,at:306,ar:322,rs:34,bh:16}
             :{cx:i=>20+i*232,cw:216,x0:200,x1:630,fy:190,ry:236,fl:196,rl:242,ax:270,tl:286,at:318,ar:332,rs:26,bh:18};
    const X=v=>L.x0+(lg(v)+1)/(lg(50)+1)*(L.x1-L.x0);
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    // allele cards
    GN_AL.forEach((A,i)=>{const x=L.cx(i),y=10,w=L.cw,c=G.a.filter(a=>a===A.a).length;
      s+=`<rect x="${x}" y="${y}" width="${w}" height="118" rx="10" style="fill:var(--panel);stroke:${c?'var(--rose)':'var(--line)'};stroke-width:${c?3:1}"/>`;
      s+=`<text x="${x+(N?8:14)}" y="${y+28}" class="t-big">${N?A.n:'APOE '+A.n}</text>`;
      s+=`<text x="${N?x+8:x+w-12}" y="${y+(N?44:26)}" class="t-xs${N?'':' t-end'}" style="fill:${c?'var(--rose)':'var(--muted)'}">${c?(c===2?'2 copies':'1 copy'):(N?'0 copies':'not in pair')}</text>`;
      [['healthy',A.h,N?66:60],[N?'AD':'with AD',A.d,N?88:84]].forEach(([lab,v,yy])=>{const bx=x+(N?50:70),bw=(N?44:120)*v/90;
        s+=`<text x="${x+(N?8:14)}" y="${y+yy}" class="t-xs">${lab}</text><rect x="${bx}" y="${y+yy-9}" width="${f1(bw)}" height="11" rx="3" style="fill:${lab==='healthy'?'var(--sage)':'var(--rose)'}"/><text x="${f1(bx+bw+4)}" y="${y+yy}" class="t-xs" style="fill:var(--ink)">${v}%</text>`});
      s+=`<text x="${x+(N?8:14)}" y="${y+110}" class="t-xs">${A.f[N?1:0]}</text>`});
    s+=`<text x="${N?16:20}" y="${N?150:154}" class="t-xs">${N?'Allele share, healthy vs AD [pooled]':'Share of APOE alleles in cognitively healthy people and in people with Alzheimer\'s (pooled)'}</text>`;
    // OR axis and grid
    s+=`<text x="${N?16:20}" y="${N?170:172}" class="t-sm">ODDS RATIO VS ε3/ε3 · LOG SCALE</text>`;
    const gy1=L.ar+(G.anc?G.anc.rows.length:1)*L.rs;
    [0.1,0.2,0.5,1,2,5,10,20,50].forEach(v=>{const x=f1(X(v));if(v===1)s+=`<path d="M${x} ${L.tl+6} V${gy1}" style="stroke:var(--ink);stroke-width:1.5"/>`;s+=`<path d="M${x} ${L.fy-8} V${L.ax}" class="${v===1?'axis':'grid'}" style="${v===1?'stroke:var(--ink);stroke-width:1.5':''}"/><text x="${x}" y="${L.tl}" class="t-xs t-mid">${v}</text>`});
    s+=`<path d="M${L.x0} ${L.ax} H${L.x1}" class="axis"/>`;
    s+=`<text x="${f1(X(1)-4)}" y="${L.ax-4}" class="t-xs t-end">← lower odds</text><text x="${f1(X(1)+4)}" y="${L.ax-4}" class="t-xs">higher odds →</text>`;
    const bar=(v,y,h,col,lab,ci)=>{const x1=X(1),xv=X(v);let o=`<rect x="${f1(Math.min(x1,xv))}" y="${y}" width="${f1(Math.max(1.5,Math.abs(xv-x1)))}" height="${h}" rx="3" style="fill:${col}"/>`;
      let lx=Math.max(xv,x1)+5;
      if(ci&&ap>.98){const a=X(ci[0]),b=X(ci[1]),cy=y+h/2;o+=`<path d="M${f1(a)} ${cy} H${f1(b)} M${f1(a)} ${cy-5} v10 M${f1(b)} ${cy-5} v10" style="stroke:var(--ink);stroke-width:1.5"/>`;lx=Math.max(lx,b+5)}
      return o+`<text x="${f1(lx)}" y="${y+h-4}" class="${N?'t-xs':'t-sm'}" style="fill:var(--ink)">${lab}</text>`};
    const fl=G.far.length>1?`${G.far[0]} (${G.far[1]}–${G.far[2]})`:'1 (reference)';
    s+=N?`<text x="16" y="${L.fl}" class="t-xs" style="stroke:var(--field);stroke-width:4;paint-order:stroke;stroke-linejoin:round">Clinic + autopsy series, white, 1997</text><text x="16" y="${L.rl}" class="t-xs" style="stroke:var(--field);stroke-width:4;paint-order:stroke;stroke-linejoin:round">Autopsy-confirmed, 5,000+ people, 2020</text>`
        :`<text x="20" y="${L.fl}" class="t-xs">Clinic + autopsy series,</text><text x="20" y="${L.fl+12}" class="t-xs">white people, 1997</text><text x="20" y="${L.rl}" class="t-xs">Autopsy-confirmed,</text><text x="20" y="${L.rl+12}" class="t-xs">5,000+ people, 2020</text>`;
    s+=bar(cur.f,L.fy,L.bh,'var(--amber)',ap>.98?fl:f1(cur.f),G.far.length>1?[G.far[1],G.far[2]]:null);
    s+=bar(cur.r,L.ry,L.bh,'var(--rose)',ap>.98?(G.rei===1?'1 (reference)':String(G.rei)):f1(cur.r));
    // ancestry
    s+=`<text x="${N?16:20}" y="${L.at}" class="t-sm">${G.anc?G.anc.h[N?1:0]:'BY ANCESTRY'}</text>`;
    if(G.anc)G.anc.rows.forEach(([lab,v],i)=>{const y=L.ar+i*L.rs,vv=Math.exp(Math.log(v)*ease(ap));
      s+=N?`<text x="16" y="${y}" class="t-xs" style="stroke:var(--field);stroke-width:4;paint-order:stroke;stroke-linejoin:round">${lab}</text>`+bar(vv,y+5,12,'var(--violet)',ap>.98?String(v):'')
          :`<text x="20" y="${y+11}" class="t-xs">${lab}</text>`+bar(vv,y,14,'var(--violet)',ap>.98?String(v):'')});
    else s+=`<text x="${N?16:20}" y="${L.ar+(N?4:12)}" class="t-xs">${N?'No ancestry breakdown in these sources.':'No ancestry breakdown for this genotype in the sources used here.'}</text>`;
    asv.innerHTML=s;
    const html=noteHTML({k:'APOE '+G.l,t:G.id==='e3e3'?'The reference genotype':(G.rei<1?'Lower odds than ε3/ε3':'Higher odds than ε3/ε3'),txt:G.txt,
      pt:'These numbers compare groups. A longer bar to the right means the pair is found more often in people with Alzheimer\'s. It does not say what will happen to any one person.',
      hook:G.hook||'Why the two bars differ: clinically diagnosed groups include some people misdiagnosed with Alzheimer\'s, which dilutes the effect. Autopsy confirmation makes the odds ratios larger. [[Reiman2020]]'});
    if(html!==lastA){$('#gnApoeNote').innerHTML=html;lastA=html}
    $$('.gn-row[data-g]',$('#gnLife')).forEach(r=>r.classList.toggle('on',r.dataset.g.split(' ').includes(G.id)));
  }
  function pick(i){if(i===gi)return;const from={...cur},G=GN_GT[i];gi=i;
    $$('[data-gi]',$('#gnGeno')).forEach(b=>b.setAttribute('aria-pressed',+b.dataset.gi===i));
    if(stopA)stopA();stopA=animate(800,p=>{ap=p;const e=ease(p);cur={f:Math.exp(lerp(Math.log(from.f),Math.log(G.far[0]),e)),r:Math.exp(lerp(Math.log(from.r),Math.log(G.rei),e))};drawA()},()=>{stopA=null;ap=1;drawA()})}
  $('#gnGeno').addEventListener('click',e=>{const b=e.target.closest('[data-gi]');if(b)pick(+b.dataset.gi)});
  // lifetime risk rows
  $('#gnLife').innerHTML=GN_LIFE.map(r=>`<div class="gn-row" data-g="${r.g.join(' ')}"><div class="gl"><b>${r.l}</b>${r.s} ${r.src}</div><div class="gn-track" role="img" aria-label="${r.l}: ${r.v}"><i data-l="${r.a}" data-w="${r.b-r.a}" style="left:0;width:0"></i>${r.c?`<i class="x" data-l="${r.b}" data-w="${r.c-r.b}" style="left:0;width:0"></i>`:''}<span data-l="${(r.c||r.b)+1.5}" style="left:0">${r.c||r.b}%</span></div><div class="gv">${r.v}</div></div>`).join('')
    +`<div class="gn-row"><div class="gl"></div><div class="gn-axis" aria-hidden="true"><span>0%</span><span>25%</span><span>50%</span><span>75%</span><span>100%</span></div></div>`;
  const growLife=()=>setTimeout(()=>{$$('#gnLife [data-l]').forEach(el=>{el.style.left=el.dataset.l+'%';if(el.dataset.w)el.style.width=el.dataset.w+'%'})},60);
  const prevS=onShow.genes;onShow.genes=()=>{prevS&&prevS();growLife()};growLife();

  /* ---------------- dominant pedigree + DIAN ---------------- */
  const svg=$('#gnPed'),rg=$('#gnT');let gene='PSEN1',seed=3,fam=[];
  const roll=()=>{const r=rng(seed*7919+11);fam=[0,1,2,3].map(()=>r()<.5)};roll();
  function draw(t){
    const N=vb(svg,'720 430','400 822');
    const L=N?{pa:[140,60],pb:[260,60],dx:200,sib:104,kids:[65,155,245,335],ky:150,lab:184,cnt:214,on:[240,256],gI:[14,64],gII:[14,154],
        pun:{t:[16,296],cp:[250,318],ch:[205,295],chy:336,gx:160,gy:344,cw:90,chh:70,rh:148,op:[16,418],res:[200,508]},
        waf:{t:[16,296],x:116,y:312,l1:[16,500],l2:[16,516]}}
             :{pa:[130,70],pb:[250,70],dx:190,sib:120,kids:[70,150,230,310],ky:170,lab:205,cnt:232,on:[256,272],gI:[24,75],gII:[24,175],
        pun:{t:[400,34],cp:[590,50],ch:[545,635],chy:66,gx:500,gy:74,cw:90,chh:70,rh:488,op:[400,150],res:[590,240]},
        waf:{t:[400,34],x:470,y:48,l1:[420,240],l2:[420,256]}};
    let s=`<defs>${marker('gnA')}</defs><rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    const person=(x,y,sq,st,o)=>{const fill=st==='c'?'var(--rose)':st==='n'?'var(--panel)':'var(--panel-2)';
      let g=sq?`<rect x="${x-15}" y="${y-15}" width="30" height="30" rx="2" style="fill:${fill};stroke:var(--ink);stroke-width:1.8;opacity:${f1(o)}"/>`
              :`<circle cx="${x}" cy="${y}" r="16" style="fill:${fill};stroke:var(--ink);stroke-width:1.8;opacity:${f1(o)}"/>`;
      if(st==='u')g+=`<text x="${x}" y="${y+4}" class="t-sm t-mid" style="opacity:${f1(o)}">?</text>`;
      if(st==='c')g+=`<text x="${x}" y="${y+4}" class="t-sm t-mid" style="fill:var(--bg);font-weight:700;opacity:${f1(o)}">M</text>`;
      return g};
    // generation I
    const [ax,ay]=L.pa,[bx,by]=L.pb;
    s+=`<text x="${L.gI[0]}" y="${L.gI[1]}" class="t-sm">I</text><text x="${L.gII[0]}" y="${L.gII[1]}" class="t-sm">II</text>`;
    s+=`<path d="M${ax+16} ${ay} H${bx-16} M${L.dx} ${ay} V${L.sib} M${L.kids[0]} ${L.sib} H${L.kids[3]}" style="stroke:var(--ink);stroke-width:1.6;fill:none"/>`;
    L.kids.forEach(x=>{s+=`<path d="M${x} ${L.sib} V${L.ky-16}" style="stroke:var(--ink);stroke-width:1.6"/>`});
    s+=person(ax,ay,true,'c',1)+person(bx,by,false,'n',1);
    s+=`<text x="${ax}" y="${ay+34}" class="t-xs t-mid" style="fill:var(--ink)">${gene} carrier</text><text x="${bx}" y="${by+34}" class="t-xs t-mid">no copy</text>`;
    // generation II
    const kidT=j=>.38+j*.025;
    L.kids.forEach((x,j)=>{const k=ramp(t,kidT(j)+.02,kidT(j)+.04),sq=j%2===0;
      if(k<1)s+=person(x,L.ky,sq,'u',lerp(.45,1,ramp(t,.3,.36))*(1-k));
      if(k>0)s+=person(x,L.ky,sq,fam[j]?'c':'n',k);
      if(k>0)s+=`<text x="${x}" y="${L.lab}" class="t-xs t-mid" style="opacity:${f1(k)};fill:${fam[j]?'var(--rose)':'var(--muted)'}">${fam[j]?'carrier':'no copy'}</text>`;
      const tk=ramp(t,kidT(j)-.04,kidT(j)+.02);
      if(tk>0&&tk<1){const e=ease(tk),tx=lerp(ax,x,e),ty=lerp(ay,L.ky,e);
        s+=`<rect x="${f1(tx-9)}" y="${f1(ty-9)}" width="18" height="18" rx="5" style="fill:${fam[j]?'var(--rose)':'var(--panel-2)'};stroke:var(--ink);stroke-width:1"/><text x="${f1(tx)}" y="${f1(ty+4)}" class="t-xs t-mid" style="fill:${fam[j]?'var(--bg)':'var(--ink)'};font-weight:700">${fam[j]?'M':'+'}</text>`}});
    const nc=fam.filter(Boolean).length,co=ramp(t,.48,.5);
    if(co>0)s+=`<text x="${L.dx}" y="${L.cnt}" class="t-lbl t-mid" style="opacity:${f1(co)}">This family: ${nc} of 4 children carry it</text>`;
    const oo=ramp(t,.5,.56);
    if(oo>0)GN_ONSET[gene].l.forEach((l,i)=>{s+=`<text x="${L.dx}" y="${L.on[i]}" class="t-sm t-mid" style="opacity:${f1(oo)};fill:var(--ink)">${l}</text>`});
    // Punnett square, then the waffle
    const wf=ramp(t,.88,.93),pu=ramp(t,.14,.18)*(1-wf),P=L.pun;
    if(pu>0){s+=`<g style="opacity:${f1(pu)}"><text x="${P.t[0]}" y="${P.t[1]}" class="t-sm">EACH CHILD, EACH TIME</text>`;
      s+=`<text x="${P.cp[0]}" y="${P.cp[1]}" class="t-xs t-mid">carrier parent's copies</text>`;
      ['M','+'].forEach((h,c)=>{s+=`<text x="${P.ch[c]}" y="${P.chy}" class="t-lbl t-mid" style="fill:${h==='M'?'var(--rose)':'var(--ink)'}">${h}</text>`});
      [0,1].forEach(r=>{s+=`<text x="${P.rh}" y="${P.gy+r*P.chh+P.chh/2+5}" class="t-lbl t-end">+</text>`});
      s+=`<text x="${P.op[0]}" y="${P.op[1]}" class="t-xs">other parent</text>`;
      for(let r=0;r<2;r++)for(let c=0;c<2;c++){const k=r*2+c,f=ramp(t,.18+k*.035,.22+k*.035),x=P.gx+c*P.cw,y=P.gy+r*P.chh,car=c===0;
        s+=`<rect x="${x}" y="${y}" width="${P.cw}" height="${P.chh}" style="fill:${f>0?(car?'var(--rose-soft)':'var(--panel)'):'var(--panel)'};stroke:var(--line);stroke-width:1.5"/>`;
        if(f>0)s+=`<text x="${x+P.cw/2}" y="${y+30}" class="t-lbl t-mid" style="opacity:${f1(f)}">${car?'M / +':'+ / +'}</text><text x="${x+P.cw/2}" y="${y+48}" class="t-xs t-mid" style="opacity:${f1(f)};fill:${car?'var(--rose)':'var(--muted)'}">${car?'carrier':'no copy'}</text>`}
      const rs=ramp(t,.3,.34);if(rs>0)s+=`<text x="${P.res[0]}" y="${P.res[1]}" class="t-lbl t-mid" style="opacity:${f1(rs)}">2 of 4 boxes: a 50% chance</text>`;
      s+='</g>'}
    if(wf>0){const W=L.waf;s+=`<g style="opacity:${f1(wf)}"><text x="${W.t[0]}" y="${W.t[1]}" class="t-sm">${N?'SHARE OF ALL ALZHEIMER\'S':'SHARE OF ALL ALZHEIMER\'S · 100 SQUARES'}</text>`;
      for(let i=0;i<100;i++){const x=W.x+(i%10)*17,y=W.y+Math.floor(i/10)*17,on=ramp(wf,.3+i*.004,.5+i*.004);
        s+=i===0?`<rect x="${x}" y="${y}" width="15" height="15" rx="2" style="fill:var(--rose)"/>`
          :i<5?`<rect x="${x+.75}" y="${y+.75}" width="13.5" height="13.5" rx="2" style="fill:var(--rose-soft);stroke:var(--rose);stroke-width:1.5;stroke-dasharray:3 2;opacity:${f1(on)}"/>`
          :`<rect x="${x}" y="${y}" width="15" height="15" rx="2" style="fill:var(--panel-2)"/>`}
      s+=`<rect x="${W.l1[0]}" y="${W.l1[1]-10}" width="11" height="11" rx="2" style="fill:var(--rose)"/><text x="${W.l1[0]+16}" y="${W.l1[1]}" class="t-xs" style="fill:var(--ink)">1 square: fewer than 1% (DIAN review)</text>`;
      s+=`<rect x="${W.l2[0]}" y="${W.l2[1]-10}" width="11" height="11" rx="2" style="fill:var(--rose-soft);stroke:var(--rose);stroke-dasharray:3 2"/><text x="${W.l2[0]+16}" y="${W.l2[1]}" class="t-xs" style="fill:var(--ink)">4 more: under 5% (ACMG/NSGC)</text></g>`}
    // DIAN timeline
    const tY=lerp(-27,5,ramp(t,.62,.86)),tl=lerp(.35,1,ramp(t,.58,.64));
    s+=`<g style="opacity:${f1(tl)}">`;
    if(!N){const X=y=>lerp(50,690,(y+27)/32),ay2=392;
      s+=`<text x="20" y="292" class="t-sm">DIAN · YEARS FROM EXPECTED ONSET (PARENT'S AGE AT ONSET)</text>`;
      s+=`<path d="M${X(-27)} ${ay2} H${X(5)}" class="axis" style="stroke:var(--muted);stroke-width:2"/>`;
      if(t>.62)s+=`<path d="M${X(-27)} ${ay2} H${f1(X(tY))}" style="stroke:var(--rose);stroke-width:5;stroke-linecap:round"/>`;
      for(let y=-25;y<=5;y+=5)s+=`<path d="M${X(y)} ${ay2-4} v8" class="axis"/><text x="${X(y)}" y="${ay2+18}" class="t-xs t-mid" style="${y===0?'fill:var(--ink);font-weight:700':''}">${y>0?'+'+y:y===0?'0':'−'+(-y)}</text>`;
      GN_DIAN.forEach(([y,a,b],i)=>{const on=t>.62&&tY>=y?1:t>.86?1:0,hi=[0,2,5].includes(i),ly=hi?332:362;
        s+=`<g style="opacity:${on?1:.25}"><path d="M${X(y)} ${ly+(b?16:4)} V${ay2}" style="stroke:var(--rose);stroke-width:1.2;stroke-dasharray:${y===0?'3 3':'none'}"/><circle cx="${X(y)}" cy="${ay2}" r="5" style="fill:${on?'var(--rose)':'var(--panel)'};stroke:var(--rose);stroke-width:1.5"/>`;
        s+=`<text x="${X(y)}" y="${ly-8}" class="t-xs ${i===5?'t-end':'t-mid'}" style="fill:var(--ink)">${a}</text>${b?`<text x="${X(y)}" y="${ly+4}" class="t-xs ${i===5?'t-end':'t-mid'}">${b}</text>`:''}</g>`});
    }else{const Y=y=>lerp(586,796,(y+27)/32),axx=96;
      s+=`<text x="16" y="560" class="t-sm">DIAN · YEARS FROM EXPECTED ONSET</text>`;
      s+=`<path d="M${axx} ${Y(-27)} V${Y(5)}" class="axis" style="stroke:var(--muted);stroke-width:2"/>`;
      if(t>.62)s+=`<path d="M${axx} ${Y(-27)} V${f1(Y(tY))}" style="stroke:var(--rose);stroke-width:5;stroke-linecap:round"/>`;
      for(let y=-25;y<=5;y+=5)s+=`<path d="M${axx-4} ${Y(y)} h8" class="axis"/><text x="${axx-10}" y="${f1(Y(y)+4)}" class="t-xs t-end" style="${y===0?'fill:var(--ink);font-weight:700':''}">${y>0?'+'+y:y===0?'0':'−'+(-y)}</text>`;
      const ly=gnRelax(GN_DIAN.map(d=>Y(d[0])),30);
      GN_DIAN.forEach(([y,a,b],i)=>{const on=t>.62&&tY>=y?1:t>.86?1:0,yy=ly[i];
        s+=`<g style="opacity:${on?1:.25}"><circle cx="${axx}" cy="${f1(Y(y))}" r="5" style="fill:${on?'var(--rose)':'var(--panel)'};stroke:var(--rose);stroke-width:1.5"/><path d="M${axx+6} ${f1(Y(y))} L${axx+18} ${f1(yy)}" style="stroke:var(--rose);stroke-width:1"/>`;
        s+=`<text x="${axx+22}" y="${f1(yy+3)}" class="t-xs" style="fill:var(--ink)">${a}${b?' '+b:''}</text></g>`});
    }
    s+='</g>';
    svg.innerHTML=s;
    const p=phaseOf(GN_STEPS,t);setSt(p);
    let S={...GN_STEPS[p]};
    if(p===3)S.txt=GN_ONSET[gene].t+' Across 387 families the mean onset was 46.2 years; the parent\'s age at onset and the mutation together explained a substantial share of a person\'s onset age (r² above 0.38), and APOE did not significantly shift it. [[Ryman2014]]';
    $('#gnNote').innerHTML=noteHTML(S);
    $('#gnRead').innerHTML=`Gene <b>${gene}</b> · This family <b>${nc} of 4</b> children carry it · Each child's chance <b>50%</b>${t>.62?` · Clock <b>${tY>=0?'+':''}${Math.round(tY)} years</b>`:''}`;
  }
  const stop=playWire(rg,$('#gnPlay'),draw,20000,'Replay','genes');
  const setSt=stepWire($('#gnSteps'),GN_STEPS,rg,draw,stop);
  const setGene=g=>{gene=g;[['APP','#gnAPP'],['PSEN1','#gnPS1'],['PSEN2','#gnPS2']].forEach(([k,id])=>$(id).setAttribute('aria-pressed',k===g));draw(+rg.value)};
  $('#gnAPP').onclick=()=>setGene('APP');$('#gnPS1').onclick=()=>setGene('PSEN1');$('#gnPS2').onclick=()=>setGene('PSEN2');
  $('#gnRoll').onclick=()=>{seed++;roll();if(+rg.value<.5){rg.value=.5}draw(+rg.value)};

  /* ---------------- Down syndrome ---------------- */
  const dsv=$('#gnDs'),drg=$('#gnDsT');let part=false,lastD='';
  function drawD(t){
    const N=vb(dsv,'720 340','400 612'),age=20+60*t;
    const L=N?{cx:[70,130,190],top:30,app:[112,124],qb:200,lbl:226,rd:[16,256],rd2:272,ax:60,y0:312,y1:582,tx:76,big:[390,34]}
             :{cx:[60,120,180],top:56,app:[138,150],qb:226,lbl:252,rd:[30,286],rd2:304,ax:360,y0:52,y1:316,tx:378,big:[330,30]};
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    const A=y=>lerp(L.y0,L.y1,(y-20)/60);
    // chromosomes 21 (acrocentric: tiny p arm, long q arm), APP band on q
    L.cx.forEach((x,i)=>{const third=i===2,pp=third&&part;
      const pTop=L.top,cen=L.top+22,qTop=L.top+28,qBot=L.qb,cut=L.app[1]+26;
      if(pp){s+=`<rect x="${x-11}" y="${qTop}" width="22" height="${cut-qTop}" rx="10" style="fill:none;stroke:var(--muted);stroke-width:1.2;stroke-dasharray:3 3"/><rect x="${x-11}" y="${cut}" width="22" height="${qBot-cut}" rx="10" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2"/>`}
      else{s+=`<rect x="${x-8}" y="${pTop}" width="16" height="18" rx="7" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2"/><path d="M${x} ${pTop+18} V${qTop}" style="stroke:var(--cell-line);stroke-width:4"/><rect x="${x-11}" y="${qTop}" width="22" height="${qBot-qTop}" rx="10" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2"/>`;
        s+=`<rect x="${x-11}" y="${L.app[0]}" width="22" height="${L.app[1]-L.app[0]}" style="fill:var(--amber)"/>`}
      s+=`<text x="${x}" y="${L.lbl}" class="t-xs t-mid">copy ${i+1}</text>`});
    s+=`<path d="M${L.cx[2]+14} ${(L.app[0]+L.app[1])/2} h16" style="stroke:var(--amber);stroke-width:1.5"/><text x="${L.cx[2]+34}" y="${(L.app[0]+L.app[1])/2+4}" class="t-lbl" style="fill:var(--amber)">${part?'APP region missing':'APP'}</text>`;
    s+=`<text x="${L.rd[0]}" y="${L.rd[1]}" class="t-lbl">APP copies: ${part?2:3}</text><text x="${L.rd[0]}" y="${L.rd2}" class="t-xs">${part?'same dose as in most people':'extra APP is overexpressed'}</text>`;
    // age ladder
    s+=`<text x="${L.big[0]}" y="${L.big[1]}" class="t-big${N?' t-end':''}" style="font-size:24px">Age ${Math.round(age)}</text>`;
    s+=`<path d="M${L.ax} ${L.y0} V${L.y1}" class="axis" style="stroke:var(--muted);stroke-width:2"/><path d="M${L.ax} ${L.y0} V${f1(A(age))}" style="stroke:var(--rose);stroke-width:5;stroke-linecap:round"/>`;
    for(let a=20;a<=80;a+=10)s+=`<path d="M${L.ax-4} ${f1(A(a))} h8" class="axis"/><text x="${L.ax-8}" y="${f1(A(a)+4)}" class="t-xs t-end">${a}</text>`;
    const M=part?[{a:78,l:'78: no AD on tests, MRI or autopsy (1 woman)'}]:GN_DS;
    const ly=gnRelax(M.map(m=>A(m.a)),17);
    M.forEach((m,i)=>{const on=age>=m.a,o=on?1:.22;
      if(m.b)s+=`<rect x="${L.ax+6}" y="${f1(A(m.a))}" width="5" height="${f1(A(Math.min(Math.max(age,m.a),m.b+1))-A(m.a))}" style="fill:var(--rose)"/>`;
      s+=`<g style="opacity:${o}"><circle cx="${L.ax}" cy="${f1(A(m.a))}" r="4" style="fill:${on?(part?'var(--good)':'var(--rose)'):'var(--panel)'};stroke:${part?'var(--good)':'var(--rose)'};stroke-width:1.5"/><path d="M${L.ax+11} ${f1(A(m.a))} L${L.tx-4} ${f1(ly[i]-3)}" style="stroke:var(--muted);stroke-width:1"/><text x="${L.tx}" y="${f1(ly[i])}" class="t-xs" style="fill:var(--ink)">${m.l}</text></g>`});
    dsv.innerHTML=s;
    drg.setAttribute('aria-valuetext','Age '+Math.round(age));
    const done=M.filter(m=>age>=m.a);
    const P=part?{k:'Partial trisomy 21 · one case',t:'Two APP copies, no Alzheimer\'s',
        txt:'A 78-year-old woman with Down syndrome caused by partial trisomy 21 had only two copies of APP. She showed no Alzheimer\'s on neuropsychological testing, MRI or neuropathology, which supports the extra APP copy as the key driver. [[Prasher1998]] This is a single case report.'+(age>=78?' The ladder has reached her age.':''),
        pt:'One woman had Down syndrome but not the extra APP gene. She did not develop Alzheimer\'s, even at 78.'}
      :{k:'Down syndrome · age '+Math.round(age),t:done.length?done[done.length-1].l.replace(/^[^:]+: /,''):'Before the changes',
        txt:'Virtually all adults with Down syndrome show Alzheimer\'s pathology by age 40, partly because APP lies on chromosome 21 and is overexpressed. [[LottHead2019]] In 388 adults, spinal-fluid and blood markers changed in the 20s and amyloid PET in the 30s; prodromal Alzheimer\'s was diagnosed at a median 50.2 years and dementia at 53.7, and symptomatic Alzheimer\'s reached 90–100% in the 60s. [[Fortea2020]] In an Irish cohort followed for 20 years, 75 of 77 people (97.4%) developed dementia, at a mean age of 55. [[McCarron2017]] It is now described as a genetic form of Alzheimer\'s and the leading cause of death in adults with Down syndrome. [[Fortea2021]]',
        pt:'People with Down syndrome have an extra copy of the gene that makes amyloid. Almost all develop the brain changes of Alzheimer\'s by 40, and most develop dementia in their 50s.',
        hook:'APP is on chromosome 21: trisomy 21 = three APP copies = early, near-universal amyloid. Partial trisomy without the extra APP: no Alzheimer\'s (case report). [[LottHead2019,Prasher1998]]'};
    const html=noteHTML(P);if(html!==lastD){$('#gnDsNote').innerHTML=html;lastD=html}
  }
  playWire(drg,$('#gnDsPlay'),drawD,12000,'Replay','genes');
  const setPart=v=>{part=v;$('#gnDsFull').setAttribute('aria-pressed',!v);$('#gnDsPart').setAttribute('aria-pressed',v);drawD(+drg.value)};
  $('#gnDsFull').onclick=()=>setPart(false);$('#gnDsPart').onclick=()=>setPart(true);
  const prevR=redraws.genes;redraws.genes=()=>{prevR&&prevR();drawA()};
  drawA();draw(+rg.value);drawD(+drg.value);
};
