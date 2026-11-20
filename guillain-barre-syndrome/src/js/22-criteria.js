/* =============== 2.2 Diagnostic criteria =============== */
/* The main player ticks a schematic case file and climbs the Brighton ladder (level 4 up to level 1), then shows
   when the tests were done (Mexican cohort medians) and how a Dutch cohort spread across the levels.
   The calculator applies the grid as reproduced by LopezHernandez2022 and Ghazanfar2020 (the original, Sejvar 2011,
   could not be read by the research pass), and highlights the level in six cohorts. */
const CR_STEPS=[
 {from:0,at:.06,k:'Step 1 · why',sv:'Why case definitions exist',sub:'a shared yardstick for research and safety studies',
  t:'Why case definitions exist',
  txt:`The Brighton Collaboration published case definitions for GBS and Fisher syndrome for collecting and analysing immunisation safety data [[Sejvar2011Brighton]]. The NINDS criteria and Brighton were both designed to study epidemiological links between GBS and vaccination; a consensus panel judged NINDS better suited to clinicians and Brighton useful for grading certainty [[Leonhard2019]]. The original Brighton paper could not be read for this guide, so the grid follows two published reproductions [[LopezHernandez2022,Ghazanfar2020]].`,
  pt:`Doctors and researchers use checklists so that "GBS" means the same thing in different hospitals and studies.`,
  hook:`NINDS suits clinicians; Brighton grades certainty [[Leonhard2019]].`},
 {from:.16,at:.33,k:'Step 2 · clinical core',sv:'The clinical core: level 3',sub:'four items from the bedside alone',
  t:'The clinical core reaches level 3',
  txt:`Level 4 needs only that no alternative diagnosis has been found, with any other item present or absent. Levels 1, 2 and 3 all require bilateral flaccid limb weakness, reduced or absent reflexes in the weak limbs, a single phase with 12 hours to 28 days from onset to the worst point, and no alternative diagnosis. Level 3 needs these clinical features only [[LopezHernandez2022,Ghazanfar2020]].`,
  pt:`Weak arms or legs on both sides, missing reflexes and the right time course are enough for the lowest levels of certainty.`,
  hook:`Brighton time window: 12 hours to 28 days from onset to nadir [[LopezHernandez2022,Ghazanfar2020]].`},
 {from:.4,at:.48,k:'Step 3 · spinal fluid',sv:'Spinal fluid: level 2',sub:'fewer than 50 cells per µl',
  t:'A CSF cell count under 50 reaches level 2',
  txt:`Level 2 adds a CSF cell count under 50/µl, with raised protein optional. If CSF was not collected or is unavailable, nerve conduction must be consistent with GBS instead [[LopezHernandez2022]]. A count above 50 is a red flag that prompts a search for other causes [[Leonhard2019]].`,
  pt:`A lumbar puncture that shows few white cells in the spinal fluid adds certainty.`,
  hook:`Level 2: cells under 50/µl, protein optional; or, without CSF, consistent nerve conduction [[LopezHernandez2022]].`},
 {from:.56,at:.66,k:'Step 4 · protein and nerves',sv:'Protein and nerve tests: level 1',sub:'the highest certainty needs both',
  t:'Raised protein plus consistent nerve conduction: level 1',
  txt:`Level 1 adds a CSF cell count under 50/µl, CSF protein above normal, and nerve conduction consistent with a GBS subtype [[LopezHernandez2022,Ghazanfar2020]]. Nerve conduction was compatible with a neuropathy in 99% of a Dutch cohort, yet only 59% met criteria for a distinct subtype [[Fokke2014]].`,
  pt:`The highest level needs both a spinal fluid result and nerve tests that fit GBS.`,
  hook:`Brighton level 1 needs both CSF and nerve conduction support; level 3 is clinical only [[LopezHernandez2022]].`},
 {from:.72,at:.8,k:'Step 5 · timing',sv:'Timing changes the level',sub:'tests done later show more',
  t:'Timing shapes the level',
  txt:`In 248 Mexican patients, those who reached level 1 had their lumbar puncture later (median day 8 against day 4) and nerve conduction later (median day 9 against day 6) than the others [[LopezHernandez2022]]. CSF protein can be normal early, and nerve conduction may be normal in the first days [[Doets2018,vanDoorn2023]].`,
  pt:`Tests done in the first days can still look normal, so an early test can leave the level lower than it would be a week later.`,
  hook:`A normal CSF protein in week 1 does not rule out GBS [[Doets2018]].`},
 {from:.86,at:.94,k:'Step 6 · certainty',sv:'Certainty, not severity',sub:'how a Dutch cohort spread across levels',
  t:'Level reflects certainty, not severity',
  txt:`Among Dutch adults with complete data (n=335), 61% reached level 1, 33% level 2, none level 3 and 6% level 4. People at different levels did not differ in preceding events, first symptoms or outcome [[Fokke2014]]. And the grid is not fully specific: 8% of children with acute flaccid myelitis met it when the "no alternative diagnosis" item was left out [[Helfferich2022]].`,
  pt:`A lower Brighton level means less test evidence, not a milder illness.`,
  hook:`Most Dutch adults reached level 1 or 2 (61% and 33%) [[Fokke2014]].`}];
/* the case file: g = group header index, at = t when the box ticks */
const CR_GROUPS=['Clinical core','Spinal fluid','Nerve conduction'];
const CR_ITEMS=[
 {l:'No alternative diagnosis',sl:'No alternative diagnosis',g:0,at:.2},
 {l:'Bilateral flaccid limb weakness',sl:'Bilateral flaccid weakness',g:0,at:.24},
 {l:'Reflexes reduced or absent in weak limbs',sl:'Reduced or absent reflexes',g:0,at:.28},
 {l:'One phase, 12 h to 28 days to worst point',sl:'One phase, 12 h to 28 days',g:0,at:.32},
 {l:'CSF white cells under 50/µl',sl:'CSF cells under 50/µl',g:1,at:.46},
 {l:'CSF protein above normal',sl:'CSF protein raised',g:1,at:.6},
 {l:'Consistent with a GBS subtype',sl:'Consistent with GBS',g:2,at:.64}];
const CR_FOKKE=[61,33,0,6];  /* levels 1..4, Dutch adults [[Fokke2014]] */
const CR_TXT={file:'Case file',ladder:'Brighton level reached',none:'no level yet',day:'days from weakness onset',
  r1:'reached level 1',r2:'other levels',lp:'LP',ncs:'NCS',lvl:'Level',fokke:'Dutch adults'};
/* Mexican cohort medians (days): lumbar puncture and nerve conduction [[LopezHernandez2022]] */
const CR_TIMES={l1:{lp:8,ncs:9},oth:{lp:4,ncs:6}};

/* calculator: the six cohorts and their level shares (null = not given in the source) */
const CR_COH=[
 {n:'Dutch adults',m:'n=335, complete data',v:[61,33,0,6]},
 {n:'Malaysian GBS',m:'n=84',v:[67,25,4,5]},
 {n:'Malaysian MFS',m:'n=25',v:[20,56,8,16]},
 {n:'Single hospital',m:'n=61, classic GBS',v:[60.66,34.42,4.92,0]},
 {n:'Mexican GBS',m:'n=173, complete data',v:[54.6,45,null,.6]},
 {n:'Iranian cohort',m:'level 3 not given',v:[41.4,51.6,null,7]}];
const CR_LVCOL=[ ['var(--dx-soft)','var(--dx)'],['var(--care-soft)','var(--care)'],['var(--accent-soft)','var(--accent)'],['var(--panel-2)','var(--muted)'] ];
const CR_OUT={
 0:{h:'No Brighton level',b:`Every level, including level 4, requires that no alternative diagnosis has been found [[LopezHernandez2022,Ghazanfar2020]]. When another cause explains the picture, the case definition does not apply.`},
 4:{h:'Level 4',b:`Level 4 requires only that no alternative diagnosis has been found, with any other item present or absent [[LopezHernandez2022,Ghazanfar2020]]. Here at least one of the clinical core items is missing, so levels 1 to 3 are out of reach.`},
 3:{h:'Level 3',b:`The clinical core is met: bilateral flaccid weakness, reduced or absent reflexes, one phase of 12 hours to 28 days, and no alternative diagnosis. Level 3 needs these clinical features only, with CSF and nerve conduction not contributing [[LopezHernandez2022,Ghazanfar2020]].`},
 2:{h:'Level 2',b:`The clinical core plus a CSF cell count under 50/µl, with raised protein optional; or, if CSF was not collected, nerve conduction consistent with GBS [[LopezHernandez2022]].`},
 1:{h:'Level 1',b:`The clinical core, CSF cells under 50/µl, CSF protein above normal and nerve conduction consistent with a GBS subtype: the highest level of diagnostic certainty [[LopezHernandez2022,Ghazanfar2020]].`},
 cells:`A count of 50/µl or more keeps the case out of levels 1 and 2 in this grid, and it is a red flag that prompts a thorough search for other causes [[Leonhard2019,AlHakem2023]].`,
 early:`If the lumbar puncture or nerve conduction was done in the first days, a normal result is common in GBS, and repeating them later can change the level [[Doets2018,vanDoorn2023,LopezHernandez2022]].`,
 pop:`In Dutch adults with complete data, the share at this level was`};

inits.criteria=()=>{
  const T=(x,y,s,c='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${s}</text>`;
  const INK='fill:var(--ink);font-weight:700';
  /* ---------- main player ---------- */
  const svg=$('#crSvg'),rg=$('#crT'),note=$('#crNote');let setSt=()=>{};
  function levelAt(t){const on=CR_ITEMS.map(it=>t>=it.at);if(!on[0])return 0;if(!(on[1]&&on[2]&&on[3]))return 4;if(on[5]&&on[6])return 1;if(on[4])return 2;return 3}
  function draw(t){const N=vb(svg,'720 400','400 690'),p=phaseOf(CR_STEPS,t),P=CR_STEPS[p];
    const L=N?{tx:12,ty:22,cx:14,cy:62,cw:372,hx:14,lx:20,ly:318,lw:360,lh:176,tlx:96,tlw:286,tly:612,dmax:10,pw:26}
             :{tx:16,ty:24,cx:16,cy:66,cw:340,hx:16,lx:392,ly:62,lw:312,lh:220,tlx:120,tlw:584,tly:356,dmax:14,pw:30};
    const lv=levelAt(t);
    let s=T(L.tx,L.ty,P.sv,'t-big')+T(L.tx,L.ty+16,P.sub,'t-sm');
    /* the case file */
    const dimFile=p===4?.45:1;let y=L.cy,g=`<g style="opacity:${dimFile}">`+T(L.cx,y,CR_TXT.file.toUpperCase(),'t-xs','letter-spacing:.1em;font-weight:700');y+=8;let lastG=-1;
    CR_ITEMS.forEach((it,i)=>{if(it.g!==lastG){lastG=it.g;y+=18;g+=T(L.cx,y,CR_GROUPS[it.g],'t-xs','fill:var(--dx);font-weight:700')}
      y+=24;const a=ramp(t,it.at,it.at+.02),on=a>=1;
      g+=`<rect x="${f1(L.cx)}" y="${f1(y-13)}" width="16" height="16" rx="4" style="fill:${on?'var(--dx)':'var(--panel)'};stroke:${on?'var(--dx)':'var(--line)'};stroke-width:1.5"/>`;
      if(a>0)g+=`<path d="M${f1(L.cx+3.5)} ${f1(y-5)}l3.5 3.5l6 -7" style="fill:none;stroke:var(--panel);stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:16;stroke-dashoffset:${f1(16*(1-a))}"/>`;
      g+=T(L.cx+26,y,N?it.sl:it.l,'t-sm',on?'fill:var(--ink);font-weight:700':'')});
    s+=g+'</g>';
    /* the ladder: level 4 lowest (left) up to level 1 (right) */
    const sw=L.lw/4,sh=(L.lh-34)/4;s+=T(L.lx,L.ly,CR_TXT.ladder,'t-xs',INK);
    const baseY=L.ly+L.lh;
    for(let i=0;i<4;i++){const level=4-i,x=L.lx+i*sw,top=baseY-(i+1)*sh,on=lv&&lv<=level,cur=lv===level;
      const C=CR_LVCOL[level-1];
      s+=`<rect x="${f1(x+2)}" y="${f1(top)}" width="${f1(sw-6)}" height="${f1(baseY-top)}" rx="7" style="fill:${on?C[0]:'var(--panel)'};stroke:${cur?C[1]:'var(--line)'};stroke-width:${cur?2.4:1.2}"/>`;
      s+=T(x+sw/2-1,top+16,CR_TXT.lvl+' '+level,'t-sm t-mid',on?'fill:var(--ink);font-weight:700':'');
      if(p===5){const v=CR_FOKKE[level-1],a=ramp(t,.87,.9);s+=`<g style="opacity:${f1(a)}">`+T(x+sw/2-1,top+36,v+'%','t-lbl t-mid')+'</g>'}}
    if(p===5)s+=T(L.lx+L.lw,baseY+16,CR_TXT.fokke+', n=335','t-xs t-end');
    if(lv){const i=4-lv,x=L.lx+i*sw+sw/2-1,top=baseY-(i+1)*sh;const bob=Math.sin(t*40)*1.2;s+=person(x,top-30+bob,26,'var(--ink)')}
    else s+=T(L.lx,baseY+16,CR_TXT.none,'t-xs');
    /* the timeline of tests (Mexican medians) */
    const X=d=>L.tlx+L.tlw*d/L.dmax,ty=L.tly,tla=p>=4?1:.4;
    let tl=`<g style="opacity:${tla}">`+tline(L.tlx,ty,L.tlw,{min:0,max:L.dmax,step:2,fmt:v=>v}).svg+T(L.tlx+L.tlw,ty+30,CR_TXT.day,'t-xs t-end');
    const cur=p===4?lerp(0,L.dmax,ramp(t,.72,.84)):p>4?L.dmax:0;
    [ ['l1',ty-38,CR_TXT.r1],['oth',ty-18,CR_TXT.r2] ].forEach(([k2,yy,lab])=>{tl+=T(L.hx,yy+4,lab,'t-xs',INK);
      ['lp','ncs'].forEach(e=>{const d=CR_TIMES[k2][e],vis=cur>=d||p<4;const xx=X(d);
        tl+=`<g style="opacity:${vis?1:.25}"><rect x="${f1(xx-L.pw/2)}" y="${f1(yy-7)}" width="${L.pw}" height="15" rx="7.5" style="fill:${k2==='l1'?'var(--dx-soft)':'var(--panel-2)'};stroke:${k2==='l1'?'var(--dx)':'var(--line)'}"/>`+T(xx,yy+4,CR_TXT[e],'t-xs t-mid','fill:var(--ink);font-weight:700')+'</g>'})});
    if(p===4)tl+=`<line x1="${f1(X(cur))}" x2="${f1(X(cur))}" y1="${f1(ty-50)}" y2="${f1(ty+4)}" style="stroke:var(--dx);stroke-width:2"/><circle cx="${f1(X(cur))}" cy="${f1(ty)}" r="5" style="fill:var(--dx)"/>`;
    s+=tl+'</g>';
    svg.innerHTML=s;setSt(p);note.innerHTML=noteHTML(P)}
  const stop=playWire(rg,$('#crPlay'),draw,16000,'%t:player.replay%','criteria');
  setSt=stepWire($('#crSteps'),CR_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- Brighton teaching calculator ---------- */
  const coh=$('#crCoh'),out=$('#crOut'),ids=['crW','crR','crM','crA','crC','crN'];
  function calc(){const v=Object.fromEntries(ids.map(i=>[i,$('#'+i).value]));
    if(v.crA!=='1')return {lv:0,v};
    const core=v.crW==='1'&&v.crR==='1'&&v.crM==='1';
    if(!core)return {lv:4,v};
    if(v.crC==='raised'&&v.crN==='yes')return {lv:1,v};
    if(v.crC==='raised'||v.crC==='normal')return {lv:2,v};
    if(v.crC==='none'&&v.crN==='yes')return {lv:2,v};
    return {lv:3,v}}
  function drawCoh(lv){const N=vb(coh,'720 300','400 440');
    const L=N?{lx:14,bx:14,bw:372,y0:18,rh:70,bh:24,lab:1}:{lx:16,bx:220,bw:484,y0:22,rh:44,bh:26,lab:0};
    let s='';
    CR_COH.forEach((c,i)=>{const y=L.y0+i*L.rh,by=L.lab?y+22:y;
      s+=T(L.lx,L.lab?y+8:by+11,c.n,'t-sm','fill:var(--ink);font-weight:700')+T(L.lab?L.lx+c.n.length*6.8+8:L.lx,L.lab?y+8:by+24,c.m,'t-xs');
      let x=L.bx;c.v.forEach((v,j)=>{if(v==null||v<=0)return;const w=L.bw*v/100,C=CR_LVCOL[j],sel=lv===j+1;
        s+=`<rect x="${f1(x)}" y="${f1(by)}" width="${f1(Math.max(1,w-1))}" height="${L.bh}" rx="4" style="fill:${C[0]};stroke:${C[1]};stroke-width:${sel?2.6:1};opacity:${lv&&!sel?.45:1}"/>`;
        const lab=w>=74?`L${j+1} ${v}%`:w>=36?v+'%':'';
        if(lab)s+=T(x+w/2,by+L.bh/2+3.5,lab,'t-xs t-mid',`fill:${j===3?'var(--ink)':C[1]};font-weight:700;opacity:${lv&&!sel?.6:1}`);
        x+=w})});
    coh.innerHTML=s}
  function upd(){const r=calc(),O=CR_OUT[r.lv];let h=`<div class="kicker">Brighton grid, as reproduced</div><p class="big-num">${O.h}</p><p>${O.b}</p>`;
    if(r.lv&&r.lv<=3){const pct=CR_FOKKE[r.lv-1];h+=`<p>${CR_OUT.pop} <b>${pct}%</b> [[Fokke2014]].</p>`}
    if(r.v.crC==='cells')h+=`<div class="hook"><b>Red flag</b>${CR_OUT.cells}</div>`;
    if(r.lv>=2&&(r.v.crC==='normal'||r.v.crN==='no'||r.v.crC==='none'||r.v.crN==='none'))h+=`<p class="stage-cap">${CR_OUT.early}</p>`;
    out.innerHTML=h;drawCoh(r.lv)}
  ids.forEach(i=>$('#'+i).addEventListener('change',upd));
  upd();
  const prev=redraws.criteria;redraws.criteria=()=>{prev&&prev();upd()};
};
