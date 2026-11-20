/* =============== 5.1 Rehabilitation & recovery =============== */
/* Widgets: recovery curve scrubber with a plasticity drawing on one timeline; proportional recovery explorer with a
   simulated mathematical-coupling demo; deficit tabs with small charts; CPASS timing player; fluoxetine player.
   Every number comes from research pass H. Lines between published points are schematic and labelled so. */
const RHB_DOMS={
 adl:{b:'Daily activities',src:'[[Jorgensen1995]]',groups:[
  {id:'all',b:'All strokes',pts:[ [6,80],[12.5,95] ]},
  {id:'mild',b:'Mild',pts:[ [3,80] ],best:8.5},
  {id:'mod',b:'Moderate',pts:[ [7,80] ],best:13},
  {id:'sev',b:'Severe',pts:[ [11.5,80] ],best:17},
  {id:'vsev',b:'Very severe',pts:[ [11.5,80] ],best:20}]},
 arm:{b:'Arm',src:'[[Nakayama1994]]',groups:[
  {id:'all',b:'All strokes',pts:[ [3,80],[9,95] ]},
  {id:'mild',b:'Mild weakness',pts:[ [3,80],[6,95] ]},
  {id:'sev',b:'Severe weakness',pts:[ [6,80],[11,95] ]}]},
 walk:{b:'Walking',src:'[[Jorgensen1995Walking]]',groups:[
  {id:'all',b:'All strokes',pts:[ [11,95] ]}]},
 lang:{b:'Language',src:'[[Pedersen1995]]',groups:[
  {id:'mild',b:'Mild aphasia',pts:[ [2,95] ]},
  {id:'mod',b:'Moderate aphasia',pts:[ [6,95] ]},
  {id:'sev',b:'Severe aphasia',pts:[ [10,95] ]}]}};
const RHB_STEPS=[
 {from:0,at:.03,k:'First days',t:'A sudden loss',
  txt:'The Copenhagen Stroke Study followed 1197 consecutive people with acute stroke from a catchment of 239,886, examined weekly. Initial severity was very severe in 19%, severe in 14%, moderate in 26%, mild in 41% [[Jorgensen1995,Jorgensen1995Part1]]. Neuroplasticity is the nervous system\'s ability to reorganise structure, function and connections. Its common themes are experience dependence, time sensitivity, motivation and attention <span class="ev est">Established</span> [[Cramer2011]].',
  pt:'After a stroke, your brain can rewire itself. Practice helps it do this [[Cramer2011,Murphy2009]].'},
 {from:.13,at:.217,k:'Week 6',t:'80% at their best',
  txt:'In all strokes together, 80% reached their best in daily activities within 6 weeks (95% CI 5.3 to 6.7). Neurological recovery ran ahead by 2 weeks on average [[Jorgensen1995]]. In animal models, a time-limited window of plasticity opens, with activity-dependent rewiring and strengthening of synapses <span class="ev est">Established in animals</span> [[Murphy2009]].',
  hook:'80% reach best ADL function by 6 weeks and 95% by 12.5 weeks [[Jorgensen1995]].'},
 {from:.32,at:.448,k:'Week 12.5',t:'95% at their best',
  txt:'Functional recovery was complete within 12.5 weeks (95% CI 11.6 to 13.4) in 95%. Time alone explained 16% to 42% of the improvement in the first 6 to 10 weeks in another study: 42% of Barthel change, 22% of walking categories, 19% of the Action Research Arm Test [[Jorgensen1995,Kwakkel2006]].',
  pt:'"Reached their best" is about each person\'s own best. It does not mean everyone is back to where they were.'},
 {from:.52,at:.61,k:'Up to week 20',t:'Bigger strokes take longer',
  txt:'Best function was reached within 8.5 weeks after a mild stroke, 13 after moderate, 17 after severe and 20 after very severe. The authors warned their tables should not be used to select who gets rehabilitation, because "even the most severe cases regularly experience meaningful improvement" [[Jorgensen1995,Jorgensen1995Part1]].',
  pt:'Try the Severe and Very severe buttons above. The line reaches its top later, and there is still a climb.'},
 {from:.7,at:.8,k:'About 5 months',t:'The old stopping point',
  txt:'The same authors wrote that recovery "should not be expected after the first 5 months" [[Jorgensen1995]]. Later data challenge this. Decline is real too: in Sweden, dependency rose from 16.2% at 3 months to 28.3% at 12 months [[Ullberg2015]].'},
 {from:.87,at:.95,k:'Months and years later',t:'Still room to gain',
  txt:'Queen Square: 90 hours over 3 weeks in 224 people, median 18 months after stroke. Median Fugl-Meyer Upper Limb 26 to 37 and ARAT 18 to 27 from admission to 6 months, with no control group described in the abstract [[Ward2019]]. VNS-REHAB and FCET2EC, both randomised, also found gains long after stroke [[Dawson2021,Breitenstein2017]]. Language recovery continued, less, beyond 6 months [[RELEASE2021]].',
  pt:'Getting better can continue with the right practice, even long after the stroke [[Ward2019]].'}];
const RHB_PR_NOTES={
 rule:{k:'The rule',t:'About 70% of what was lost',
  txt:'In 41 people with ischaemic stroke, clinical variables explained 47% of variance in arm recovery. With a set of severe, poorly recovering outliers removed, this rose to 89%, and recovery approximated 0.70 x initial impairment [[Prabhakaran2008]]. A replication gave predicted change = 0.7 x (66 - initial score) + 0.4. In 211 people, about 70% (n=146) showed recovery of about 78%, and 65 did worse than predicted [[Winters2015]].',
  hook:'Proportional recovery: about 0.7 of initial impairment, except a subgroup with severe impairment [[Prabhakaran2008,Winters2015]].'},
 crit:{k:'The critique',t:'Could it be arithmetic?',
  txt:'Hope and colleagues argued that headline correlations are "likely inflated". Recovery is final score minus start score, so the start score is built into it. Correlations between baseline and recovery become extreme when outcomes vary less than baselines, regardless of the true relationship [[Hope2019]]. The dots here are simulated: final scores are drawn at random, with no link to the start score. Move the lower slider and watch the left-hand strength.',
  hook:'Statistical coupling may inflate the proportional recovery correlation [[Hope2019]].'},
 rej:{k:'The rejoinder',t:'True for groups, not for one person',
  txt:'Kundert and colleagues replied that existing data are "largely consistent" with the rule as a population-level model for arm motor recovery, and that reports of its demise "are exaggerated" because they focus on individual prediction. About 30% with severe paresis do not follow it [[Kundert2019]].',
  pt:'This rule describes groups. It cannot tell one person how far they will get.'}};
const RHB_CP_STEPS=[
 {from:0,at:.14,k:'In animals',t:'A window in rats',
  txt:'Rats given 5 weeks of enriched rehabilitation starting at 5 days improved markedly, at 14 days somewhat less, and at 30 days no better than social housing. Dendritic growth in undamaged motor cortex tracked this [[Biernaskie2004]].'},
 {from:.2,at:.625,k:'In people',t:'CPASS: 20 extra hours',
  txt:'20 extra hours of self-selected task-specific therapy. By 1 year, the Action Research Arm Test difference versus controls was +5.25 ± 2.59 (P=0.043) when begun at 30 days or less, +6.87 ± 2.63 (P=0.009) at 2 to 3 months, and +2.41 ± 2.25 (P=0.29) at 6 months or later [[Dromerick2021]].',
  hook:'CPASS: extra therapy worked best at 2 to 3 months [[Dromerick2021]].'},
 {from:.63,at:.67,k:'Reading it well',t:'Phase II, not the last word',
  txt:'<span class="ev early">Early evidence</span> CPASS is a phase II trial [[Dromerick2021]]. It suggests timing matters. It does not show that therapy stops helping later on, and the 2026 guideline still states that uncertainty remains on timing and dosing [[Richards2026]].',
  pt:'If you are past 6 months, this does not mean the door has closed. Read on.'},
 {from:.7,at:.92,k:'A counterpoint',t:'Queen Square',
  txt:'90 hours over 3 weeks in 224 people, median 18 months after stroke. Median scores, admission to 6 months: Fugl-Meyer Upper Limb 26 to 37, ARAT 18 to 27, CAHAI 40 to 52, ArmA-A 8 to 3, ArmA-B 38 to 19 (lower ArmA is better). Gains continued during follow-up. No control group is described in the abstract [[Ward2019]].'}];
const RHB_FL_STEPS=[
 {from:0,at:.16,k:'2011 · FLAME',t:'A hopeful small trial',
  txt:'118 people with moderate to severe motor deficit. Fugl-Meyer improvement at day 90 was 34.0 points with fluoxetine 20 mg versus 24.3 with placebo (p=0.003) [[Chollet2011]].',
  pt:'Fluoxetine is an antidepressant. It was once hoped to help movement recover.'},
 {from:.24,at:.5,k:'2019 to 2020',t:'Three large trials',
  txt:'FOCUS (n=3127), AFFINITY (n=1280) and EFFECTS (n=1500) all looked at the modified Rankin Scale. Common odds ratios 0.951, 0.94 and 0.94, and every confidence interval crosses 1 [[Dennis2019,Hankey2020,Lundstrom2020]].'},
 {from:.52,at:.74,k:'Benefit and harm',t:'Less depression, more fractures',
  txt:'New depression fell, in FOCUS 13.43% versus 17.21% and in EFFECTS 7% versus 11%. Fractures rose in all three. AFFINITY also found more falls and seizures, and EFFECTS more hyponatraemia [[Dennis2019,Hankey2020,Lundstrom2020]].',
  pt:'Big trials found it did not help movement recover, and it raised the chance of broken bones [[Dennis2019]].'},
 {from:.8,at:.92,k:'The lesson',t:'Why three trials agree',
  txt:'<span class="ev est">Established</span> FOCUS, AFFINITY and EFFECTS were designed collaboratively with the same basic protocol, so their agreement is strong evidence [[Mead2020,Dennis2019,Hankey2020,Lundstrom2020]]. Cochrane 2021 (76 studies, 13,029 participants): in low risk of bias studies, no difference in disability (SMD -0.0, -0.05 to 0.05) or independence (RR 0.98, 0.93 to 1.03), less depression (RR 0.75, 0.65 to 0.86), more fractures (RR 2.35, 1.62 to 3.41) and seizures (RR 1.40, 1.00 to 1.98). "When all studies, irrespective of risk of bias, were included", SSRIs reduced disability scores but not the proportion independent [[Legg2021]]. The 2026 guideline cites a meta-analysis of the three trials (n=5907): no effect on mRS, with very low absolute risks of the harms [[Richards2026]].',
  hook:'Fluoxetine: no functional benefit, less depression, more fractures [[Dennis2019,Hankey2020,Lundstrom2020,Legg2021]].'}];
/* charts for the tabs, values all from research: h = heading; v = one bar; lo/hi = a range; segs = stacked (mrs index i) */
const RHB_CHARTS={
 arm:[{h:'Full arm function reached, Copenhagen'},{l:'Mild weakness',v:79,txt:'79%'},{l:'Severe weakness',v:18,txt:'18%'},
  {h:'RATULS: ARAT success at 3 months'},{l:'Robot training',v:44,txt:'44%'},{l:'Enhanced therapy',v:50,txt:'50%'},{l:'Usual care',v:42,txt:'42%'}],
 walk:[{h:'Walking, Copenhagen (804 people)'},
  {l:'At onset: cannot walk, with help, independent',segs:[{v:51,i:5},{v:12,i:3},{v:37,i:1}]},
  {l:'End of rehabilitation: died, cannot walk, with help, independent',ln:'End of rehab: died, cannot walk, with help, independent',segs:[{v:21,i:6},{v:18,i:5},{v:11,i:3},{v:50,i:1}]}],
 aph:[{h:'Aphasia, Copenhagen (881 people)'},{l:'At admission',v:38,txt:'38%'},{l:'At discharge',v:18,txt:'18%'},
  {h:'Median frequency, mixed stroke (review)'},{l:'Acute',v:30,txt:'30%'},{l:'Rehabilitation',v:34,txt:'34%'}],
 swl:[{h:'Dysphagia depends on how you look for it'},{l:'Cursory screening',lo:37,hi:45,txt:'37% to 45%'},{l:'Clinical testing',lo:51,hi:55,txt:'51% to 55%'},{l:'Instrumental testing',lo:64,hi:78,txt:'64% to 78%'},
  {h:'At 6 months, among survivors (128 people at start)'},{l:'Back on their prestroke diet',v:87,txt:'87%'}],
 spa:[{h:'Spasticity prevalence, range across studies'},{l:'1 to 4 weeks',lo:4,hi:27,txt:'4% to 27%'},{l:'1 to 3 months',lo:19,hi:26.7,txt:'19% to 26.7%'},{l:'Beyond 3 months',lo:17,hi:42.6,txt:'17% to 42.6%'},{l:'Disabling spasticity',lo:2,hi:13,txt:'2% to 13%'}],
 vis:[{h:'Spatial neglect (6324 people, 41 articles)'},{l:'After right brain damage',v:38,txt:'38%'},{l:'After left brain damage',v:18,txt:'18%'},
  {h:'Visual field loss at follow-up'},{l:'Full recovery, improvement, no recovery',segs:[{v:7.5,i:1},{v:39,i:3},{v:52,i:4}]}],
 avert:[{h:'AVERT: favourable outcome at 3 months'},{l:'Very early, higher dose',v:46,txt:'46%'},{l:'Usual care',v:50,txt:'50%'},
  {h:'AVERT: mobilised within 24 hours'},{l:'Very early, higher dose',v:92,txt:'92%'},{l:'Usual care',v:59,txt:'59%'}]};
/* shared with 5.2: draws heading, bar, range and stacked rows into an svg, each row's label on its own line */
function rhbBars(svg,rows,o={}){
  const col=o.col||'var(--rec)',N=NARROW()||o.W===400,W=N?400:720,x0=4,bw=W-x0-92,X=v=>x0+bw*v/100;let y=2,s='';
  rows.forEach(r=>{
    if(r.h){y+=y>2?14:0;s+=`<text x="${x0}" y="${f1(y+12)}" class="t-lbl">${r.h}</text>`;y+=22;return}
    const lab=N&&r.ln?r.ln:r.l;
    s+=`<text x="${x0}" y="${f1(y+11)}" class="t-sm">${lab}</text>`;
    const by=y+16,bh=14;
    s+=`<rect x="${x0}" y="${by}" width="${f1(r.segs?W-x0*2:bw)}" height="${bh}" rx="3" style="fill:var(--panel-2)"/>`;
    if(r.segs){const tot=r.segs.reduce((a,g)=>a+g.v,0),full=W-x0*2;let cx=x0;
      r.segs.forEach(g=>{const w=full*g.v/tot;s+=`<rect x="${f1(cx)}" y="${by}" width="${f1(Math.max(0,w-1))}" height="${bh}" style="fill:var(--mrs${g.i})"/><text x="${f1(cx+w/2)}" y="${by+11}" class="t-sm t-mid" style="fill:var(--mrs-on${g.i})">${g.v}%</text>`;cx+=w})}
    else if(r.lo!=null){s+=`<rect x="${f1(X(r.lo))}" y="${by}" width="${f1(X(r.hi)-X(r.lo))}" height="${bh}" rx="3" style="fill:${col}"/><text x="${f1(X(r.hi)+6)}" y="${by+11}" class="t-sm" style="fill:var(--ink)">${r.txt}</text>`}
    else{s+=`<rect x="${x0}" y="${by}" width="${f1(X(r.v)-x0)}" height="${bh}" rx="3" style="fill:${col}"/><text x="${f1(X(r.v)+6)}" y="${by+11}" class="t-sm" style="fill:var(--ink)">${r.txt}</text>`}
    y+=38});
  svg.setAttribute('viewBox',`0 0 ${W} ${f1(y+2)}`);svg.innerHTML=s}
/* a label with a halo, for use over plotted lines */
function rhbLab(x,y,t,o={}){return `<text x="${f1(x)}" y="${f1(y)}" class="${o.c||'t-sm'}${o.a?' '+o.a:''}" style="fill:var(--ink);paint-order:stroke;stroke:var(--panel);stroke-width:3px;stroke-linejoin:round;${o.st||''}">${t}</text>`}
/* plasticity panel: a small brain for context, then neurons around a lesion. Lost links go faint, new routes grow round it. */
const RHB_NEU=[ [.1,.2],[.36,.1],[.66,.1],[.9,.22],[.1,.8],[.36,.92],[.66,.92],[.9,.78] ];
const RHB_LOST=[ [1,6],[2,5],[0,7] ];
const RHB_ROUTES=[ {a:1,b:5,c:[.06,.5],w0:1.5,w1:8},{a:2,b:6,c:[.94,.5],w0:2.5,w1:10},{a:0,b:3,c:[.5,.2],w0:5,w1:14},{a:4,b:7,c:[.5,.8],w0:7,w1:19} ];
function rhbPlastic(L,wk,lat,t){
  const {px,py,pw,ph}=L,nb={x:px+12,y:py+94,w:pw-24,h:ph-138};
  const P=q=>[nb.x+nb.w*q[0],nb.y+nb.h*q[1]];
  let s=`<rect x="${px}" y="${py}" width="${pw}" height="${ph}" rx="10" style="fill:var(--field);stroke:var(--line)"/>`;
  const les=ramp(t,0,.02),lc=P([.5,.5]),lr=Math.min(nb.w,nb.h)*.19*les;
  const br=brainSide(px+8,py+8,.28,{lesion:{core:30*les,penumbra:0,mca:true},id:'rhbbr'});
  s+=br.svg;
  s+=`<text x="${px+102}" y="${py+30}" class="t-lbl">Beside the injury</text><text x="${px+102}" y="${py+47}" class="t-sm">zoomed in, schematic</text>`;
  /* links lost when the lesion formed */
  RHB_LOST.forEach(([a,b])=>{const A=P(RHB_NEU[a]),B=P(RHB_NEU[b]);
    s+=`<line x1="${f1(A[0])}" y1="${f1(A[1])}" x2="${f1(B[0])}" y2="${f1(B[1])}" style="stroke:var(--muted);stroke-width:1.3;stroke-dasharray:${les>=1?'3 4':'none'};opacity:${f1(lerp(.9,.35,ramp(wk,0,10)))}"/>`});
  if(les>0){s+=`<path d="${blob(lc[0],lc[1],lr,5,{n:18,rough:.14})}" style="fill:var(--core);fill-opacity:.22;stroke:var(--core);stroke-width:1.6"/>`;
    if(les>=1){s+=neuron(lc[0]-14,lc[1]-10,8,{state:'dead',axon:0,seed:3})+neuron(lc[0]+14,lc[1]-4,8,{state:'dead',axon:0,seed:8})}}
  /* new routes */
  const qp=(R,u)=>{const A=P(RHB_NEU[R.a]),B=P(RHB_NEU[R.b]),C=P(R.c),m=1-u;return [m*m*A[0]+2*m*u*C[0]+u*u*B[0],m*m*A[1]+2*m*u*C[1]+u*u*B[1]]};
  RHB_ROUTES.forEach((R,i)=>{const g=ramp(wk,R.w0,R.w1);if(g<=0)return;
    const A=P(RHB_NEU[R.a]),B=P(RHB_NEU[R.b]),C=P(R.c),sw=1.8+lat*1.8;
    s+=`<path d="M${f1(A[0])} ${f1(A[1])}Q${f1(C[0])} ${f1(C[1])} ${f1(B[0])} ${f1(B[1])}" pathLength="1" style="fill:none;stroke:var(--rec);stroke-width:${f1(sw)};stroke-linecap:round;stroke-dasharray:${g.toFixed(3)} 1.2"/>`;
    if(g<1){const q=qp(R,g);s+=`<circle cx="${f1(q[0])}" cy="${f1(q[1])}" r="3.4" style="fill:var(--rec);stroke:var(--panel);stroke-width:1"/>`}
    else{const q=qp(R,(t*26+i*.27)%1);s+=`<circle cx="${f1(q[0])}" cy="${f1(q[1])}" r="3.2" style="fill:var(--gold);stroke:var(--panel);stroke-width:1"/>`;
      s+=`<circle cx="${f1(B[0])}" cy="${f1(B[1])}" r="${f1(11)}" style="fill:none;stroke:var(--rec);stroke-width:1;opacity:.5"/>`}});
  RHB_NEU.forEach((q,i)=>{const p=P(q),near=i===1||i===2||i===5||i===6;
    s+=neuron(p[0],p[1],7.5,{state:near&&wk<2&&les>0?'stressed':'alive',axon:0,seed:i+2})});
  if(les>=1)s+=rhbLab(lc[0],lc[1]+22,'lesion',{a:'t-mid',c:'t-xs'});
  /* legend, with line samples so it does not rely on colour */
  const ly=py+ph-16,lx=px+14;
  s+=`<line x1="${lx}" x2="${lx+24}" y1="${ly-3}" y2="${ly-3}" style="stroke:var(--muted);stroke-width:1.3;stroke-dasharray:3 4"/><text x="${lx+30}" y="${ly}" class="t-sm">lost link</text>`;
  s+=`<line x1="${lx+106}" x2="${lx+130}" y1="${ly-3}" y2="${ly-3}" style="stroke:var(--rec);stroke-width:2.4"/><text x="${lx+136}" y="${ly}" class="t-sm">new route</text>`;
  return s}
inits.rehab=()=>{
  /* ---- recovery curve ---- */
  const svg=$('#rhbSvg'),rg=$('#rhbT');let dom='adl',grp='all';
  const domEl=$('#rhbDom'),grpEl=$('#rhbGrp');
  function pickerHTML(){domEl.innerHTML='<span class="stage-cap">Kind</span>'+Object.keys(RHB_DOMS).map(k=>`<button class="btn" data-d="${k}" aria-pressed="${k===dom}">${RHB_DOMS[k].b}</button>`).join('');
    grpEl.innerHTML='<span class="stage-cap">Group</span>'+RHB_DOMS[dom].groups.map(g=>`<button class="btn" data-g="${g.id}" aria-pressed="${g.id===grp}">${g.b}</button>`).join('')}
  const seriesPts=g=>{const P=[ [0,0],...g.pts ];if(g.best)P.push([g.best,98]);return P};
  function draw(t){
    const N=vb(svg,'720 400','400 770');
    const L=N?{cx:44,cy:40,cw:340,ch:240,px:6,py:322,pw:388,ph:440}:{cx:46,cy:34,cw:352,ch:306,px:424,py:8,pw:290,ph:384};
    const lim=.86,wk=t<=lim?t/lim*24:24,lat=ramp(t,lim,1),X=w=>L.cx+L.cw*.84*w/24,Y=v=>L.cy+L.ch-L.ch*v/100;
    const D=RHB_DOMS[dom],G=D.groups.find(g=>g.id===grp)||D.groups[0];
    let s=`<text x="${L.cx-34}" y="${L.cy-16}" class="t-lbl">Share of people at their best so far</text>`;
    const zx=X(24),zr=L.cx+L.cw;
    s+=`<rect x="${f1(zx)}" y="${L.cy}" width="${f1(zr-zx)}" height="${L.ch}" style="fill:var(--rec-soft)"/>`;
    [0,20,40,60,80,100].forEach(v=>{s+=`<line x1="${L.cx}" x2="${zr}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/><text x="${L.cx-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}%</text>`});
    [0,4,8,12,16,20,24].forEach(w=>{s+=`<text x="${f1(X(w))}" y="${L.cy+L.ch+14}" class="t-xs t-mid">${w}</text>`});
    s+=`<text x="${f1((zx+zr)/2)}" y="${L.cy+L.ch+14}" class="t-xs t-mid">later</text><text x="${f1(X(12))}" y="${L.cy+L.ch+30}" class="t-sm t-mid">weeks after stroke</text>`;
    s+=`<line x1="${L.cx}" x2="${zr}" y1="${L.cy+L.ch}" y2="${L.cy+L.ch}" class="axis"/><line x1="${L.cx}" x2="${L.cx}" y1="${L.cy}" y2="${L.cy+L.ch}" class="axis"/>`;
    const pathOf=(g,up)=>{const P=seriesPts(g),f=monoFn(P),end=Math.min(up,P[P.length-1][0]);let d='';for(let i=0;i<=50;i++){const w=end*i/50;d+=(i?'L':'M')+f1(X(w))+' '+f1(Y(clamp(f(w),0,100)))}return d};
    D.groups.forEach(g=>{if(g.id!==G.id)s+=`<path d="${pathOf(g,99)}" style="fill:none;stroke:var(--muted);stroke-width:1;opacity:.45"/>`});
    if(wk>0)s+=`<path d="${pathOf(G,wk)}" style="fill:none;stroke:var(--rec);stroke-width:2.6;stroke-dasharray:6 4;stroke-linecap:round"/>`;
    G.pts.forEach(p=>{const on=wk>=p[0];s+=`<circle cx="${f1(X(p[0]))}" cy="${f1(Y(p[1]))}" r="5.5" style="fill:${on?'var(--rec)':'var(--panel)'};stroke:var(--rec);stroke-width:2"/>`;
      if(on)s+=rhbLab(X(p[0])+9,Y(p[1])+16,`${p[1]}% by ${p[0]} wk`)});
    if(G.best){const on=wk>=G.best;s+=`<path d="M${f1(X(G.best))} ${L.cy}v12" style="stroke:var(--rec);stroke-width:2.4"/>`;
      if(on)s+=rhbLab(X(G.best)+6,L.cy+13,`best by ${G.best} wk`)}
    const cx=t<=lim?X(wk):lerp(zx,zr-3,lat);
    s+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${L.cy}" y2="${L.cy+L.ch}" style="stroke:var(--ink);stroke-width:1.2"/>`;
    const wl=t<=lim?`week ${wk<9.95?(Math.round(wk*2)/2):Math.round(wk)}`:'months, years later';
    s+=rhbLab(cx>L.cx+L.cw*.55?cx-5:cx+5,L.cy+L.ch-8,wl,{a:cx>L.cx+L.cw*.55?'t-end':''});
    if(lat>0)s+=`<g style="opacity:${f1(ramp(lat,.1,.6))}">${rhbLab(zx-8,Y(44),'gains reported with',{a:'t-end'})}${rhbLab(zx-8,Y(44)+15,'intensive practice',{a:'t-end'})}</g>`;
    s+=rhbPlastic(L,wk,lat,t);
    svg.innerHTML=s;
    const pub=G.pts.map(p=>`${p[1]}% by ${p[0]} weeks`).join(', ')+(G.best?`; best by ${G.best} weeks`:'');
    $('#rhbRead').innerHTML=`<span>${D.b}: <b>${G.b}</b></span><span>Published: <b>${pub}</b> ${D.src}</span>`;
    const p=phaseOf(RHB_STEPS,t);setSt(p);$('#rhbNote').innerHTML=noteHTML(RHB_STEPS[p]);
  }
  const stop=playWire(rg,$('#rhbPlay'),draw,22000,'%t:player.replay%','rehab');
  const setSt=stepWire($('#rhbSteps'),RHB_STEPS,rg,draw,stop);
  domEl.addEventListener('click',e=>{const b=e.target.closest('[data-d]');if(!b)return;dom=b.dataset.d;grp=RHB_DOMS[dom].groups[0].id;pickerHTML();draw(+rg.value)});
  grpEl.addEventListener('click',e=>{const b=e.target.closest('[data-g]');if(!b)return;grp=b.dataset.g;pickerHTML();draw(+rg.value)});
  pickerHTML();draw(+rg.value);

  /* ---- proportional recovery ---- */
  const prS=$('#rhbPrSvg'),prX=$('#rhbPrX'),prV=$('#rhbPrV'),prSp=$('#rhbPrS');let prView='rule';
  prV.innerHTML=[['rule','The rule'],['crit','The critique'],['rej','The rejoinder']].map(([k,b])=>`<button class="btn" data-v="${k}" aria-pressed="${k===prView}">${b}</button>`).join('');
  const prR=rng(11),prD=[];for(let i=0;i<60;i++)prD.push({b:4+42*prR(),e:prR(),off:prR(),sev:prR()});
  const rhbCorr=(A,B)=>{const n=A.length,ma=A.reduce((x,y)=>x+y,0)/n,mb=B.reduce((x,y)=>x+y,0)/n;let c=0,xa=0,xb=0;for(let i=0;i<n;i++){c+=(A[i]-ma)*(B[i]-mb);xa+=(A[i]-ma)**2;xb+=(B[i]-mb)**2}return c/Math.sqrt(xa*xb)};
  const prF=x=>.7*(66-x)+.4;
  function prScatter(B,xs,ys,y0,y1,title,yl,rv){const X=v=>B.x+B.w*v/66,Y=v=>B.y+B.h-B.h*(v-y0)/(y1-y0);
    let g=`<text x="${B.x}" y="${B.y-8}" class="t-sm" style="fill:var(--ink)">${title}: <tspan style="font-weight:700">r = ${rv.toFixed(2).replace('-','−')}</tspan></text>`;
    g+=`<rect x="${B.x}" y="${B.y}" width="${B.w}" height="${B.h}" style="fill:var(--field)"/><line x1="${B.x}" x2="${B.x+B.w}" y1="${B.y+B.h}" y2="${B.y+B.h}" class="axis"/><line x1="${B.x}" x2="${B.x}" y1="${B.y}" y2="${B.y+B.h}" class="axis"/>`;
    xs.forEach((v,i)=>{g+=`<circle cx="${f1(X(v))}" cy="${f1(Y(clamp(ys[i],y0,y1)))}" r="2.8" style="fill:var(--rec);opacity:.75"/>`});
    g+=`<text x="${B.x+B.w}" y="${B.y+B.h+13}" class="t-xs t-end">start score</text>`;return g}
  function drawPr(){
    const N=vb(prS,'720 360','400 760'),x0=+prX.value,s0=+prSp.value;
    const A=N?{x:44,y:30,w:340,h:256}:{x:44,y:30,w:310,h:276},R=N?{x:14,y:360,w:372}:{x:392,y:22,w:316};
    const X=v=>A.x+A.w*v/66,Y=v=>A.y+A.h-A.h*v/66;
    let s=`<text x="${A.x-30}" y="${A.y-14}" class="t-lbl">Change in arm score, by start score</text>`;
    s+=`<rect x="${A.x}" y="${A.y}" width="${A.w}" height="${A.h}" style="fill:var(--field)"/>`;
    [0,22,44,66].forEach(v=>{s+=`<line x1="${A.x}" x2="${A.x+A.w}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/><text x="${A.x-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}</text><text x="${f1(X(v))}" y="${A.y+A.h+14}" class="t-xs t-mid">${v}</text>`});
    s+=`<line x1="${A.x}" x2="${A.x+A.w}" y1="${A.y+A.h}" y2="${A.y+A.h}" class="axis"/><line x1="${A.x}" x2="${A.x}" y1="${A.y}" y2="${A.y+A.h}" class="axis"/><text x="${f1(A.x+A.w/2)}" y="${A.y+A.h+30}" class="t-sm t-mid">start score on the Fugl-Meyer arm scale</text>`;
    s+=`<line x1="${f1(X(0))}" y1="${f1(Y(66))}" x2="${f1(X(66))}" y2="${f1(Y(0))}" style="stroke:var(--muted);stroke-width:1.3;stroke-dasharray:3 4"/>`;
    s+=`<line x1="${f1(X(0))}" y1="${f1(Y(prF(0)))}" x2="${f1(X(66))}" y2="${f1(Y(prF(66)))}" style="stroke:var(--rec);stroke-width:2.6"/>`;
    if(prView==='rej'){prD.forEach(d=>{const sx=d.b*(66/46),dv=d.sev<.3&&sx<22?d.off*5:prF(sx)+(d.off-.5)*12;s+=`<circle cx="${f1(X(sx))}" cy="${f1(Y(clamp(dv,0,66)))}" r="2.8" style="fill:var(--brand);opacity:.6"/>`});
      s+=rhbLab(X(44),Y(44),'dots: simulated',{c:'t-sm'})}
    s+=rhbLab(X(14),Y(60),'solid: the rule, 0.7 x (66 - start) + 0.4',{c:'t-xs'})+rhbLab(X(18),Y(54),'dotted: the most the scale allows',{c:'t-xs'});
    const pc=prF(x0),py=Math.min(66,x0+pc);
    s+=`<line x1="${f1(X(x0))}" x2="${f1(X(x0))}" y1="${A.y}" y2="${A.y+A.h}" style="stroke:var(--ink);stroke-width:1.1"/><circle cx="${f1(X(x0))}" cy="${f1(Y(pc))}" r="6" style="fill:var(--rec);stroke:var(--panel);stroke-width:2"/>`;
    if(prView==='crit'){
      const bs=prD.map(d=>d.b),os=prD.map(d=>62-s0*d.e),ch=os.map((o,i)=>o-bs[i]);
      s+=prScatter({x:R.x+20,y:R.y+22,w:R.w-34,h:N?130:118},bs,ch,-20,66,'Start vs recovery','recovery',rhbCorr(bs,ch));
      s+=prScatter({x:R.x+20,y:R.y+(N?202:186),w:R.w-34,h:N?130:118},bs,os,0,66,'Start vs final score','final score',rhbCorr(bs,os));
      s+=`<text x="${R.x+20}" y="${R.y+(N?372:326)}" class="t-sm" style="fill:var(--ink)">Simulated dots, not patient data.</text>`;
    }else if(prView==='rule'){
      const tw=R.w-20,TX=v=>R.x+10+tw*v/66,ty=R.y+44,ax=TX(x0),bx=TX(py);
      s+=`<text x="${R.x+10}" y="${R.y+14}" class="t-lbl">What the formula gives</text>`;
      s+=`<rect x="${R.x+10}" y="${ty}" width="${tw}" height="14" rx="7" style="fill:var(--panel-2)"/><rect x="${f1(ax)}" y="${ty}" width="${f1(Math.max(0,bx-ax))}" height="14" style="fill:var(--rec)"/>`;
      s+=`<text x="${R.x+10}" y="${ty+30}" class="t-xs">0</text><text x="${R.x+10+tw}" y="${ty+30}" class="t-xs t-end">66</text>`;
      const startA=x0>33,startEnd=x0>52;
      s+=`<text x="${f1(ax)}" y="${ty-6}" class="t-sm ${startEnd?'t-end':startA?'t-mid':''}" style="fill:var(--ink)">start ${x0}</text>`;
      s+=`<text x="${f1(R.x+10+tw/2)}" y="${ty+30}" class="t-sm t-mid" style="fill:var(--ink)">predicted score ${py.toFixed(1)}</text>`;
      const by=R.y+(N?118:112);
      s+=`<text x="${R.x+10}" y="${by-10}" class="t-lbl">Who fitted, in 211 people</text>`;
      const w1=tw*146/211;
      s+=`<rect x="${R.x+10}" y="${by}" width="${f1(w1-1)}" height="24" style="fill:var(--mrs1)"/><rect x="${f1(R.x+10+w1)}" y="${by}" width="${f1(tw-w1)}" height="24" style="fill:var(--mrs4)"/>`;
      s+=`<text x="${f1(R.x+10+w1/2)}" y="${by+16}" class="t-sm t-mid" style="fill:var(--mrs-on1)">146: about 78%</text><text x="${f1(R.x+10+w1+(tw-w1)/2)}" y="${by+16}" class="t-sm t-mid" style="fill:var(--mrs-on4)">65: worse</text>`;
      ['Not fitting went with:','no finger extension, facial palsy,','more severe leg paresis,','more severe Bamford stroke type.'].forEach((l,i)=>{s+=`<text x="${R.x+10}" y="${by+50+i*16}" class="${i?'t-sm':'t-lbl'}">${l}</text>`});
    }else{
      const tw=R.w-20;
      s+=`<text x="${R.x+10}" y="${R.y+14}" class="t-lbl">One line, many people</text>`;
      ['The rule may describe a group well.','One person can sit well off the line.'].forEach((l,i)=>{s+=`<text x="${R.x+10}" y="${R.y+34+i*16}" class="t-sm">${l}</text>`});
      const by=R.y+92;
      s+=`<text x="${R.x+10}" y="${by-8}" class="t-sm" style="fill:var(--ink)">Severe paresis: do not follow it, about 30%</text>`;
      s+=`<rect x="${R.x+10}" y="${by}" width="${tw}" height="16" rx="3" style="fill:var(--panel-2)"/><rect x="${R.x+10}" y="${by}" width="${f1(tw*.3)}" height="16" rx="3" style="fill:var(--brand)"/>`;
      s+=`<text x="${R.x+10}" y="${by+44}" class="t-sm" style="fill:var(--ink)">PREP2: arm prediction correct, 75%</text>`;
      s+=`<rect x="${R.x+10}" y="${by+52}" width="${tw}" height="16" rx="3" style="fill:var(--panel-2)"/><rect x="${R.x+10}" y="${by+52}" width="${f1(tw*.75)}" height="16" rx="3" style="fill:var(--brand)"/>`;
      ['Even a tool built to predict, using brain','signals, was wrong for a quarter of people.'].forEach((l,i)=>{s+=`<text x="${R.x+10}" y="${by+92+i*16}" class="t-sm">${l}</text>`});
    }
    prS.innerHTML=s;
    $('#rhbPrRead').innerHTML=`<span>Start <b>${x0}</b></span><span>Formula's change <b>${pc.toFixed(1)}</b></span><span>Score it implies <b>${py.toFixed(1)}</b> of 66</span>`;
    $('#rhbPrCap').innerHTML=prView==='crit'?'<b>Simulated.</b> Each dot is generated here, not a person. Baseline scores spread widely, final scores cluster near the top, and that alone makes start and recovery look tightly linked.':'<b>Formula from Winters 2015</b> [[Winters2015]], applied to non-severe impairment only. Not a tool for individual prognosis.';
    $('#rhbPrSW').hidden=prView!=='crit';
    $('#rhbPrNote').innerHTML=noteHTML(RHB_PR_NOTES[prView]);
  }
  prV.addEventListener('click',e=>{const b=e.target.closest('[data-v]');if(!b)return;prView=b.dataset.v;$$('[data-v]',prV).forEach(k=>k.setAttribute('aria-pressed',k===b));drawPr()});
  prX.addEventListener('input',drawPr);prSp.addEventListener('input',drawPr);drawPr();

  /* ---- deficit tabs and their charts ---- */
  const tabs=$('#rhbTabs');let tab='arm';
  const drawTab=()=>{const el=$('#rhbC-'+tab);if(el)rhbBars(el,RHB_CHARTS[tab])};
  tabs.addEventListener('click',e=>{const b=e.target.closest('[data-tab]');if(!b)return;tab=b.dataset.tab;
    $$('[data-tab]',tabs).forEach(k=>k.setAttribute('aria-pressed',k===b));
    $$('.rhbpanel',$('#m-rehab')).forEach(p=>p.hidden=p.id!=='rhbP-'+tab);drawTab()});
  const drawAvert=()=>rhbBars($('#rhbC-avert'),RHB_CHARTS.avert,{W:400});
  drawTab();drawAvert();

  /* ---- CPASS timing ---- */
  const cp=$('#rhbCpSvg'),cpT=$('#rhbCpT');
  const CP_BARS=[{l:'30 days or less',v:5.25,e:2.59,p:'P=0.043'},{l:'2 to 3 months',v:6.87,e:2.63,p:'P=0.009'},{l:'6 months or later',v:2.41,e:2.25,p:'P=0.29'}];
  const CP_SL=[{n:'Fugl-Meyer UL',a:26,b:37},{n:'ARAT',a:18,b:27},{n:'CAHAI',a:40,b:52}];
  const CP_RAT=[['Day 5','improved markedly',''],['Day 14','somewhat less',''],['Day 30','no better than','social housing']];
  function drawCp(t){
    const N=vb(cp,'720 380','400 800');
    const L=N?{rx:8,ry:30,rw:124,rg:6,bx:42,by:150,bw:350,bh:270,wx:10,wy:490,ww:380,wh:290}:{rx:14,ry:30,rw:140,rg:8,bx:46,by:136,bw:416,bh:200,wx:486,wy:22,ww:226,wh:338};
    let s=`<text x="${L.rx}" y="${L.ry-10}" class="t-lbl">Rats: enriched rehabilitation, by start day</text>`;
    CP_RAT.forEach((r,i)=>{const x=L.rx+i*(L.rw+L.rg),op=ramp(t,i*.04,.06+i*.04);
      s+=`<g style="opacity:${f1(op)}"><rect x="${x}" y="${L.ry}" width="${L.rw}" height="62" rx="8" style="fill:var(--rec-soft);stroke:var(--line)"/><text x="${x+9}" y="${L.ry+19}" class="t-lbl">${r[0]}</text><text x="${x+9}" y="${L.ry+36}" class="t-sm" style="fill:var(--ink)">${r[1]}</text><text x="${x+9}" y="${L.ry+50}" class="t-sm" style="fill:var(--ink)">${r[2]}</text></g>`});
    const Y=v=>L.by+L.bh-L.bh*v/12,hg=ramp(t,.22,.4);
    s+=`<text x="${L.bx-38}" y="${L.by-14}" class="t-lbl" style="opacity:${f1(ramp(t,.18,.24))}">People, CPASS: arm score gain at 1 year</text>`;
    s+=`<g style="opacity:${f1(ramp(t,.18,.24))}">`;
    [0,4,8,12].forEach(v=>{s+=`<line x1="${L.bx}" x2="${L.bx+L.bw}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/><text x="${L.bx-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}</text>`});
    s+=`<line x1="${L.bx}" x2="${L.bx+L.bw}" y1="${L.by+L.bh}" y2="${L.by+L.bh}" class="axis"/></g>`;
    /* the schematic idea of a window */
    if(hg>0){const f=monoFn([ [0,1],[.3,8],[.5,9],[.85,3],[1,1.6] ]);let d=`M${L.bx} ${f1(Y(0))}`;for(let i=0;i<=40;i++){const u=i/40;d+=`L${f1(L.bx+L.bw*u)} ${f1(Y(f(u)))}`}d+=`L${L.bx+L.bw} ${f1(Y(0))}Z`;
      s+=`<path d="${d}" style="fill:var(--rec);opacity:${f1(.14*hg)}"/>`}
    const cw=L.bw/3;
    CP_BARS.forEach((b,i)=>{const g=ease(ramp(t,.26+i*.12,.38+i*.12)),cx=L.bx+cw*(i+.5),w=N?54:64;
      s+=`<text x="${f1(cx)}" y="${L.by+L.bh+16}" class="t-sm t-mid" style="fill:var(--ink);opacity:${f1(ramp(t,.18,.24))}">${b.l}</text>`;
      if(g<=0)return;
      s+=`<rect x="${f1(cx-w/2)}" y="${f1(Y(b.v*g))}" width="${w}" height="${f1(Y(0)-Y(b.v*g))}" rx="3" style="fill:${i===2?'var(--muted)':'var(--rec)'}"/>`;
      if(g>=1){const yu=Y(b.v+b.e),yd=Y(Math.max(0,b.v-b.e));s+=`<path d="M${f1(cx)} ${f1(yu)}V${f1(yd)}M${f1(cx-6)} ${f1(yu)}h12M${f1(cx-6)} ${f1(yd)}h12" style="fill:none;stroke:var(--ink);stroke-width:1.5"/>`;
        s+=`<text x="${f1(cx)}" y="${f1(yu-20)}" class="t-big t-mid">+${b.v}</text><text x="${f1(cx)}" y="${f1(yu-6)}" class="t-xs t-mid" style="fill:var(--ink)">± ${b.e}, ${b.p}</text>`}});
    /* counterpoint: Queen Square medians */
    const w=ramp(t,.7,.84);
    if(w>0){const a=L.wx+16,bX=a+(N?170:90),y0=L.wy+66,h=L.wh-120,YS=v=>y0+h-h*v/60;
      s+=`<g style="opacity:${f1(ramp(t,.7,.74))}"><text x="${L.wx}" y="${L.wy+12}" class="t-lbl">Queen Square, chronic phase</text><text x="${L.wx}" y="${L.wy+30}" class="t-sm">224 people, median 18 months on</text><text x="${L.wx}" y="${L.wy+46}" class="t-sm">90 hours over 3 weeks</text>`;
      s+=`<line x1="${a}" x2="${a}" y1="${y0}" y2="${y0+h}" class="grid"/><line x1="${bX}" x2="${bX}" y1="${y0}" y2="${y0+h}" class="grid"/><text x="${a}" y="${y0+h+15}" class="t-xs t-mid">admission</text><text x="${bX}" y="${y0+h+15}" class="t-xs t-mid">6 months</text>`;
      CP_SL.forEach(q=>{const xe=lerp(a,bX,ease(w)),ye=lerp(YS(q.a),YS(q.b),ease(w));
        s+=`<line x1="${a}" y1="${f1(YS(q.a))}" x2="${f1(xe)}" y2="${f1(ye)}" style="stroke:var(--rec);stroke-width:2.2"/><circle cx="${a}" cy="${f1(YS(q.a))}" r="3.6" style="fill:var(--rec)"/><text x="${a+7}" y="${f1(YS(q.a)+14)}" class="t-xs" style="fill:var(--ink)">${q.a}</text>`;
        if(w>=1)s+=`<circle cx="${bX}" cy="${f1(YS(q.b))}" r="3.6" style="fill:var(--rec)"/><text x="${bX+8}" y="${f1(YS(q.b)+4)}" class="t-sm" style="fill:var(--ink)">${q.b} ${q.n}</text>`});
      s+=`<text x="${L.wx}" y="${y0+h+38}" class="t-sm" style="fill:var(--ink)">Medians. No control group</text><text x="${L.wx}" y="${y0+h+52}" class="t-sm" style="fill:var(--ink)">described in the abstract.</text></g>`}
    cp.innerHTML=s;
    const p=phaseOf(RHB_CP_STEPS,t);setCp(p);$('#rhbCpNote').innerHTML=noteHTML(RHB_CP_STEPS[p]);
  }
  const stopCp=playWire(cpT,$('#rhbCpPlay'),drawCp,16000,'%t:player.replay%','rehab');
  const setCp=stepWire($('#rhbCpSteps'),RHB_CP_STEPS,cpT,drawCp,stopCp);
  drawCp(+cpT.value);

  /* ---- fluoxetine ---- */
  const fl=$('#rhbFlSvg'),flT=$('#rhbFlT');
  const FL_FOR=[{n:'FOCUS',m:.951,a:.839,b:1.079,t:'0.951 (0.839 to 1.079)'},{n:'AFFINITY',m:.94,a:.76,b:1.15,t:'0.94 (0.76 to 1.15)'},{n:'EFFECTS',m:.94,a:.78,b:1.13,t:'0.94 (0.78 to 1.13)'}];
  const FL_DEP=[{n:'FOCUS',f:13.43,p:17.21},{n:'EFFECTS',f:7,p:11}];
  const FL_FRX=[{n:'FOCUS',f:2.88,p:1.47},{n:'AFFINITY',f:3,p:1},{n:'EFFECTS',f:4,p:2}];
  function flDumb(B,rows,mx,title,op){const nw=66,X=v=>B.x+nw+(B.w-nw-26)*v/mx;
    let g=`<g style="opacity:${f1(op)}"><text x="${B.x}" y="${B.y+12}" class="t-lbl">${title}</text>`;
    rows.forEach((r,i)=>{const y=B.y+42+i*34,lo=Math.min(r.f,r.p),hi=Math.max(r.f,r.p);
      g+=`<text x="${B.x}" y="${y+4}" class="t-sm" style="fill:var(--ink)">${r.n}</text><line x1="${f1(X(0))}" x2="${f1(X(mx))}" y1="${y}" y2="${y}" class="grid"/><line x1="${f1(X(lo))}" x2="${f1(X(hi))}" y1="${y}" y2="${y}" style="stroke:var(--muted);stroke-width:2"/>`;
      g+=`<circle cx="${f1(X(r.p))}" cy="${y}" r="5.5" style="fill:var(--panel);stroke:var(--ink);stroke-width:2"/><circle cx="${f1(X(r.f))}" cy="${y}" r="5.5" style="fill:var(--rec);stroke:var(--panel);stroke-width:1"/>`;
      g+=`<text x="${f1(X(lo)-9)}" y="${y-8}" class="t-xs t-end" style="fill:var(--ink)">${(lo===r.f?'F ':'P ')+lo}</text><text x="${f1(X(hi)+9)}" y="${y-8}" class="t-xs" style="fill:var(--ink)">${(hi===r.f?'F ':'P ')+hi}</text>`});
    return g+'</g>'}
  function drawFl(t){
    const N=vb(fl,'720 440','400 880');
    const L=N?{ax:14,ay:30,aw:372,bx:14,by:188,bw:372,cx:14,cy:400,cw:372,dx:14,dy:540,dw:372,ly:742}:{ax:14,ay:30,aw:262,bx:300,by:30,bw:410,cx:14,cy:232,cw:336,dx:376,dy:232,dw:336,ly:414};
    const pa=ramp(t,0,.1);let s=`<g style="opacity:${f1(pa)}"><text x="${L.ax}" y="${L.ay-8}" class="t-lbl">FLAME, 2011: Fugl-Meyer gain, day 90</text>`;
    const fw=(L.aw-92);
    [['Fluoxetine',34.0,'var(--rec)'],['Placebo',24.3,'var(--muted)']].forEach(([n,v,c],i)=>{const y=L.ay+16+i*50,g=ease(pa);
      s+=`<text x="${L.ax}" y="${y}" class="t-sm" style="fill:var(--ink)">${n}</text><rect x="${L.ax}" y="${y+6}" width="${f1(fw*v/40*g)}" height="18" rx="3" style="fill:${c}"/><text x="${f1(L.ax+fw*v/40*g+6)}" y="${y+20}" class="t-big">${v.toFixed(1)}</text>`});
    s+=`<text x="${L.ax}" y="${L.ay+120}" class="t-sm">118 people. p=0.003</text></g>`;
    /* forest plot */
    const pb=ramp(t,.2,.26),nw=N?74:80,vw=N?120:124,fx=L.bx+nw,fwd=L.bw-nw-vw-8,XO=v=>fx+fwd*(Math.log(v)-Math.log(.6))/(Math.log(1.4)-Math.log(.6));
    s+=`<g style="opacity:${f1(pb)}"><text x="${L.bx}" y="${L.by-8}" class="t-lbl">Then: mRS common odds ratio (95% CI)</text>`;
    const fy=L.by+6,fh=132;
    s+=`<line x1="${f1(XO(1))}" x2="${f1(XO(1))}" y1="${fy}" y2="${fy+fh}" style="stroke:var(--ink);stroke-width:1.3;stroke-dasharray:4 3"/><text x="${f1(XO(1))}" y="${fy+fh+14}" class="t-xs t-mid" style="fill:var(--ink)">1 = no difference</text>`;
    [.6,1.4].forEach(v=>{s+=`<text x="${f1(XO(v))}" y="${fy+fh+14}" class="t-xs t-mid">${v}</text>`});
    s+=`<line x1="${fx}" x2="${fx+fwd}" y1="${fy+fh}" y2="${fy+fh}" class="axis"/></g>`;
    FL_FOR.forEach((r,i)=>{const g=ease(ramp(t,.26+i*.07,.33+i*.07)),y=fy+24+i*40;if(g<=0)return;
      s+=`<g style="opacity:${f1(g)}"><text x="${L.bx}" y="${y+4}" class="t-sm" style="fill:var(--ink)">${r.n}</text><line x1="${f1(XO(r.a))}" x2="${f1(XO(r.b))}" y1="${y}" y2="${y}" style="stroke:var(--rec);stroke-width:2.4"/><rect x="${f1(XO(r.m)-5)}" y="${y-5}" width="10" height="10" style="fill:var(--rec)"/><text x="${L.bx+L.bw}" y="${y+4}" class="t-xs t-end" style="fill:var(--ink)">${r.t}</text></g>`});
    /* harms */
    s+=flDumb({x:L.cx,y:L.cy,w:L.cw},FL_DEP,20,'New depression (%)',ramp(t,.52,.6));
    s+=flDumb({x:L.dx,y:L.dy,w:L.dw},FL_FRX,6,'Fractures (%)',ramp(t,.6,.68));
    const pc=ramp(t,.52,.6);
    s+=`<text x="${L.cx}" y="${L.ly-(N?-18:0)}" class="t-sm" style="fill:var(--ink);opacity:${f1(pc)}">F, filled: fluoxetine. P, hollow: placebo.</text>`;
    const pd=ramp(t,.8,.86);
    s+=`<text x="${N?L.cx:L.cx+300}" y="${N?L.ly+48:L.ly}" class="t-lbl" style="opacity:${f1(pd)}">Same basic protocol. Three trials. One answer.</text>`;
    fl.innerHTML=s;
    const p=phaseOf(RHB_FL_STEPS,t);setFl(p);$('#rhbFlNote').innerHTML=noteHTML(RHB_FL_STEPS[p]);
  }
  const stopFl=playWire(flT,$('#rhbFlPlay'),drawFl,16000,'%t:player.replay%','rehab');
  const setFl=stepWire($('#rhbFlSteps'),RHB_FL_STEPS,flT,drawFl,stopFl);
  drawFl(+flT.value);

  const prev=redraws.rehab;redraws.rehab=()=>{prev&&prev();drawPr();drawTab();drawAvert()};
};
