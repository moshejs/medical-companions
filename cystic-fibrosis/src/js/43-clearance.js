/* =============== 4.3 Airway clearance & inhaled therapies =============== */
/* One airway lining, treated in a teaching sequence (bronchodilator, hypertonic saline, dornase alfa, an airway
   clearance technique, an inhaled antibiotic). Each step shows the trial result that tested that treatment, as
   published. The order is a teaching order for the animation, not a prescribed routine. */
inits.clearance=()=>{
  const svg=$('#clSvg'),rg=$('#clT'),pb=$('#clPlay'),note=$('#clNote'),stEl=$('#clSteps');
  const STEPS=[
    {from:0,at:.1,k:'Step 1 · before the mist',t:'Bronchodilator',
      txt:'In the Elkins 2006 hypertonic saline trial, every dose was preceded by a bronchodilator [[Elkins2006HS]]. The Cayston (aztreonam lysine) label states a bronchodilator before each dose [[FDA-Cayston]], and the TOBI label lists bronchospasm among its warnings [[FDA-TOBI]]. Taken as a long-term treatment in its own right, the CFF 2013 chronic-medications guideline graded inhaled β2-agonists <b>I</b>: insufficient evidence [[Mogayzel2013Pulm]].',
      pt:'In the trials and labels here, the bronchodilator is the warm-up before some inhaled treatments, not a treatment for the mucus itself.',
      hook:'CFF 2013: inhaled β2-agonists and inhaled anticholinergics as chronic therapy are grade I (insufficient evidence) [[Mogayzel2013Pulm]].'},
    {from:.2,at:.3,k:'Step 2 · water into the liquid layer',t:'Hypertonic saline',
      txt:'In 24 people with CF, 7% saline four times a day raised mucus clearance for at least 8 hours: 14.0% cleared in one hour, against 7.0% when amiloride was given first (P = 0.02). The authors put the benefit down to sustained hydration of the airway surface <span class="ev est">Established</span> [[Donaldson2006]]. In Elkins 2006 (164 people aged 6 and over, 48 weeks), exacerbations fell by 56% and 76% stayed exacerbation-free against 62% on 0.9% saline, although the primary lung-function outcome did not differ (P = 0.79) [[Elkins2006HS]]. In children under 6 (ISIS, 321 children), the exacerbation rate was 2.3 per person-year in both groups [[Rosenfeld2012ISIS]]. CFF 2013 grade: <b>B</b> from age 6 [[Mogayzel2013Pulm]].',
      pt:'Salty-water mist pulls water into the airways and thins the mucus [[Donaldson2006]].',
      hook:'Amiloride blocks the benefit of hypertonic saline: the effect is osmotic [[Donaldson2006]]. 56% fewer exacerbations at age ≥6 [[Elkins2006HS]], no change under 6 (rate ratio 0.98) [[Rosenfeld2012ISIS]].'},
    {from:.4,at:.5,k:'Step 3 · cutting the DNA',t:'Dornase alfa',
      txt:'Dornase alfa (rhDNase) cleaves the extracellular DNA in purulent sputum [[Fuchs1994Dornase]]. Fuchs 1994 randomised 968 people for 24 weeks: one or more exacerbations needing IV antibiotics in 27% on placebo, 22% once daily and 19% twice daily, an age-adjusted risk fall of 28% and 37%. FEV1 rose by a mean 5.8% (once daily) [[Fuchs1994Dornase]]. The Cochrane review (19 trials, 2,565 people) found it probably improves FEV1 and probably reduces exacerbations (moderate-quality evidence) [[Yang2021Dornase]]. The US label states 2.5 mg inhaled once daily, and "some patients may benefit from twice daily administration" [[FDA-Pulmozyme]]. CFF 2013: <b>A</b> for moderate-to-severe disease, <b>B</b> for mild [[Mogayzel2013Pulm]].',
      pt:'Dornase alfa is a mist that breaks up DNA in thick mucus, so it is easier to cough out [[Fuchs1994Dornase]].',
      hook:'Fuchs 1994: exacerbation risk −28% once daily, FEV1 +5.8% [[Fuchs1994Dornase]]. Side effects seen more often: voice alteration and rash [[Yang2021Dornase]].'},
    {from:.6,at:.7,k:'Step 4 · moving it out',t:'Airway clearance',
      txt:'The CFF 2009 guideline recommends airway clearance "on a regular basis in all patients". It states no technique has been shown superior, so the choice is individualised [[Flume2009ACT]]. In a 1-year Canadian trial (107 people), a PEP mask gave fewer exacerbations than the high-frequency chest wall oscillation vest: 1.14 against 2.0 per person, and 220 against 115 days to the first one (p = 0.02). Lung function and quality of life did not differ [[McIlwaine2013HFCWO]]. The Cochrane overview advises choosing by comfort, convenience, flexibility, practicality and cost [[Wilson2019ACT]].',
      pt:'There is no single "best" airway clearance method. The best one is the one you can do well and keep doing, chosen with your care team [[Wilson2019ACT]].',
      hook:'No airway clearance technique has been shown superior [[Flume2009ACT,Wilson2019ACT]]. One long RCT favoured the PEP mask over the vest on exacerbations [[McIlwaine2013HFCWO]].'},
    {from:.8,at:.92,k:'Step 5 · the germs in the mucus',t:'Inhaled antibiotic',
      txt:'Ramsey 1999 (520 people with Pseudomonas aeruginosa) gave inhaled tobramycin 300 mg twice daily in three 28-days-on, 28-days-off cycles. At week 20 FEV1 had risen 10% against a 2% fall on placebo, sputum Pseudomonas density fell 0.8 log10, and hospitalisation was 26% less likely. Isolates with a tobramycin MIC ≥8 μg/mL rose from 25% to 32% [[Ramsey1999TOBI]]. The TOBI label states "alternating periods of 28 days on drug, followed by 28 days off drug" from age 6 [[FDA-TOBI]]. CFF 2013: inhaled tobramycin and aztreonam for persistent Pseudomonas, <b>A</b> for moderate-to-severe disease [[Mogayzel2013Pulm]]. Infections and antibiotics have their own module, 4.4.',
      pt:'Some inhaled antibiotics are taken in cycles of 4 weeks on and 4 weeks off, to keep germs like Pseudomonas down while limiting side effects [[FDA-TOBI]].',
      hook:'TOBI: 28 days on, 28 days off [[FDA-TOBI,Ramsey1999TOBI]]. CFF grade A chronic therapies for moderate-to-severe disease: dornase alfa, inhaled tobramycin, inhaled aztreonam [[Mogayzel2013Pulm]].'}];
  const setA=stepWire(stEl,STEPS,rg,draw,()=>stop());
  /* horizontal bars: items [{l,v,col}] over [mn,mx]; g = 0..1 growth */
  function bars(x,y,w,items,o){const mn=o.mn||0,mx=o.mx,bh=o.bh||16,gap=o.gap||8,lw=o.lw||92,g=o.g==null?1:o.g,X=v=>x+lw+(w-lw-36)*(v-mn)/(mx-mn);let s='';
    if(o.title)s+=`<text x="${x}" y="${y-8}" class="t-lbl">${o.title}</text>`;
    const z=X(Math.max(mn,0));
    items.forEach((it,i)=>{const yy=y+i*(bh+gap),v=it.v*g,a=Math.min(z,X(v)),b=Math.max(z,X(v));
      s+=`<text x="${x+lw-6}" y="${f1(yy+bh*.7)}" class="t-sm t-end" style="fill:var(--ink)">${it.l}</text>`;
      s+=`<rect x="${x+lw}" y="${f1(yy)}" width="${f1(w-lw-36)}" height="${bh}" rx="4" style="fill:var(--panel-2)"/>`;
      s+=`<rect x="${f1(a)}" y="${f1(yy)}" width="${f1(Math.max(.5,b-a))}" height="${bh}" rx="4" style="fill:${it.col}"/>`;
      s+=`<text x="${f1((v<0?a-4:b+4))}" y="${f1(yy+bh*.72)}" class="t-sm${v<0?' t-end':''}" style="fill:var(--ink);font-weight:700;opacity:${f1(ramp(g,.6,1))}">${(o.fmt||(q=>q))(it.v)}</text>`});
    if(mn<0)s+=`<line x1="${f1(z)}" x2="${f1(z)}" y1="${y-3}" y2="${f1(y+items.length*(bh+gap)-gap+3)}" style="stroke:var(--ink);stroke-width:1.2"/>`;
    return {svg:s,h:items.length*(bh+gap)}}
  function mist(x,y,w,h,col,a,ph,n=14){let s='';if(a<=.01)return s;const r=rng(9);
    for(let i=0;i<n;i++){const u=((r()+ph*.9)%1),px=x+w*r(),py=y+h*u;s+=`<circle cx="${f1(px+Math.sin(u*9+i)*4)}" cy="${f1(py)}" r="${f1(1.6+r()*1.8)}" style="fill:${col};opacity:${f1(a*(.35+.6*(1-u)))}"/>`}return s}
  function draw(t){const N=vb(svg,'720 380','400 620'),p=phaseOf(STEPS,t);setA(p);note.innerHTML=noteHTML(STEPS[p]);
    const bd=ramp(t,.03,.15),hs=ramp(t,.22,.36),dn=ramp(t,.42,.56),act=ramp(t,.62,.78),ab=ramp(t,.82,.96);
    const asl=lerp(.12,.85,hs),thick=lerp(.95,.3,dn)-.1*act,mucus=lerp(.95,.75,dn)-.4*act,bact=lerp(.85,.12,ab);
    const L=N?{ex:14,ey:40,ew:372,eh:250,rx:14,ry:328,rw:372}:{ex:16,ey:40,ew:410,eh:300,rx:446,ry:40,rw:262};
    let s=`<defs>${marker('clAr','var(--muted)',6)}</defs>`;
    s+=`<text x="${L.ex}" y="24" class="t-big">${STEPS[p].t}</text>${N?'':`<text x="${L.ex+170}" y="24" class="t-sm">${STEPS[p].k}</text>`}`;
    const E=epithelium(L.ex,L.ey,L.ew,L.eh,{n:N?6:6,asl,mucus:clamp(mucus),thick:clamp(thick),beat:clamp(asl*1.1),ph:t*10,bact,inflam:lerp(.6,.25,ab),move:act,labels:true,seed:4});
    s+=E.svg;const A=E.at;
    /* the mist for the active step */
    const mcol=['var(--rx)','var(--water)','var(--cftr)','var(--muted)','var(--pot)'][p],mOn=p===3?0:bump(t,STEPS[p].from,STEPS[p].from+.2);
    s+=mist(L.ex+20,L.ey+8,L.ew-40,A.mucTop-L.ey-12,mcol,mOn,t*14);
    if(mOn>.2&&p!==3)s+=`<text x="${L.ex+L.ew-8}" y="${L.ey+18}" class="t-sm t-end" style="fill:var(--ink);opacity:${f1(mOn)}">inhaled mist</text>`;
    /* hypertonic saline: water drawn out of the cells into the liquid layer */
    const hw=bump(t,.2,.4);if(hw>.02)A.cells.forEach(([cx],c)=>{for(let i=0;i<2;i++){const u=((t*9+i*.5+c*.21)%1);s+=ion(cx+(i?7:-7),A.cellTop+14-u*(A.cellTop+14-A.aslTop),'h2o',{r:3.4,op:hw*Math.min(1,(1-u)*2.5)})}});
    if(hw>.3)s+=`<text x="${L.ex+8}" y="${f1(A.cellTop+30)}" class="t-sm" style="fill:var(--ink);font-weight:700;opacity:${f1(hw)}">water drawn up into the liquid layer</text>`;
    /* dornase: DNA strands in the mucus, cut as dornase arrives, then carried off by clearance */
    const dnaOp=clamp(1-act*1.2);if(dnaOp>.02){const r=rng(21),mh=A.aslTop-A.mucTop;for(let i=0;i<5;i++){const x0=L.ex+L.ew*(.06+.18*i+r()*.04),y0=A.mucTop+mh*(.35+.3*r()),len=L.ew*.13,cut=dn,gp=cut*7;
        const seg=(a,b,dx)=>{let d='';for(let k=0;k<=10;k++){const u=lerp(a,b,k/10);d+=(k?'L':'M')+f1(x0+len*u+dx)+' '+f1(y0+Math.sin(u*14+i)*3)}return d};
        s+=`<path d="${seg(0,.5,-gp)}" style="fill:none;stroke:var(--dna);stroke-width:1.7;opacity:${f1(dnaOp*.9)}"/><path d="${seg(.5,1,gp)}" style="fill:none;stroke:var(--dna);stroke-width:1.7;opacity:${f1(dnaOp*.9)}"/>`}
      if(p===2)s+=`<text x="${L.ex+8}" y="${f1(A.mucTop-8)}" class="t-sm" style="fill:var(--ink);font-weight:700">${dn>.5?'DNA strands cut: the mucus loosens':'DNA strands in purulent mucus'}</text>`}
    /* airway clearance: blobs of mucus lifted and carried out of the frame, a pressure wave from the device */
    if(act>.01&&ab<.5){const r=rng(5);for(let i=0;i<4;i++){const u=clamp(act*1.3-i*.12),bx=L.ex+L.ew*(.12+.2*i)+u*L.ew*.5,by=lerp(A.mucTop+6,L.ey+40,u);
        if(bx<L.ex+L.ew-12)s+=mucusPlug(bx,by,9+r()*4,{thick:thick,seed:i+3,wob:t*3})}
      const wv=bump(t,.6,.8);for(let k=0;k<3;k++){const q=((t*12+k/3)%1);s+=`<path d="M${f1(L.ex+30)} ${f1(L.ey+60-q*22)}q${f1(L.ew*.18)} -14 ${f1(L.ew*.36)} 0" style="fill:none;stroke:var(--rx);stroke-width:1.6;opacity:${f1(wv*(1-q))}"/>`}
      if(p===3)s+=`<text x="${L.ex+8}" y="${L.ey+20}" class="t-sm" style="fill:var(--ink);font-weight:700">PEP · oscillation · huffing · exercise</text>`}
    if(p===4&&ab>.4)s+=`<text x="${L.ex+8}" y="${f1(A.mucTop-8)}" class="t-sm" style="fill:var(--ink);font-weight:700">fewer bacteria in the mucus</text>`;
    /* the result panel */
    const R=L.rx,Y=L.ry,W=L.rw;let r='';
    r+=`<rect x="${R-6}" y="${Y-6}" width="${W+12}" height="${N?262:312}" rx="12" style="fill:var(--panel);stroke:var(--line)"/>`;
    r+=`<text x="${R+6}" y="${Y+14}" class="t-sm" style="fill:var(--rx);font-weight:700">WHAT THE TRIAL FOUND</text>`;
    const g=ramp(t,STEPS[p].from+.02,STEPS[p].from+.14);
    if(p===0){const cx=R+W/2,cy=Y+(N?120:130),ro=58,ri=lerp(16,34,bd);
      r+=`<circle cx="${cx}" cy="${cy}" r="${ro}" style="fill:var(--airway-soft);stroke:var(--airway);stroke-width:2"/>`;
      r+=`<circle cx="${cx}" cy="${cy}" r="${f1(ri+12)}" style="fill:none;stroke:var(--inflamed);stroke-width:${f1(lerp(9,3,bd))};opacity:.55"/>`;
      r+=`<circle cx="${cx}" cy="${cy}" r="${f1(ri+4)}" style="fill:var(--mucus);opacity:.8"/><circle cx="${cx}" cy="${cy}" r="${f1(ri)}" style="fill:var(--field)"/>`;
      r+=`<text x="${cx}" y="${cy+ro+18}" class="t-sm t-mid" style="fill:var(--ink)">${bd>.6?'muscle relaxed, airway wider':'airway muscle tight'}</text><text x="${cx}" y="${cy+ro+32}" class="t-xs t-mid">cross-section, schematic</text>`;
      r+=`<text x="${R+6}" y="${Y+36}" class="t-sm" style="fill:var(--ink)">Elkins 2006: bronchodilator</text><text x="${R+6}" y="${Y+50}" class="t-sm" style="fill:var(--ink)">before every saline dose</text>`;
      r+=`<text x="${R+6}" y="${Y+(N?240:262)}" class="t-sm" style="fill:var(--ink)">CFF 2013 as chronic therapy:</text><text x="${R+6}" y="${Y+(N?254:278)}" class="t-lbl" style="fill:var(--warn)">grade I, insufficient evidence</text>`}
    if(p===1){r+=bars(R+6,Y+50,W-6,[{l:'0.9% saline',v:62,col:'var(--muted)'},{l:'7% saline',v:76,col:'var(--water)'}],{mx:100,g,title:'Exacerbation-free, 48 wk',fmt:v=>Math.round(v)+'%',lw:84}).svg;
      r+=bars(R+6,Y+140,W-6,[{l:'HS + amiloride',v:7,col:'var(--muted)'},{l:'HS + placebo',v:14,col:'var(--water)'}],{mx:20,g,title:'Mucus cleared in 1 hour',fmt:v=>f1(v)+'%',lw:84}).svg;
      r+=`<text x="${R+6}" y="${Y+222}" class="t-sm" style="fill:var(--ink)">Under 6 years (ISIS): 2.3 vs 2.3</text><text x="${R+6}" y="${Y+236}" class="t-sm" style="fill:var(--ink)">exacerbations per person-year</text>`;
      if(!N)r+=`<text x="${R+6}" y="${Y+262}" class="t-xs">Elkins 2006 · Donaldson 2006 · ISIS 2012</text>`}
    if(p===2){r+=bars(R+6,Y+50,W-6,[{l:'placebo',v:27,col:'var(--muted)'},{l:'once daily',v:22,col:'var(--cftr)'},{l:'twice daily',v:19,col:'var(--cftr)'}],{mx:40,g,title:'≥1 exacerbation in 24 weeks',fmt:v=>Math.round(v)+'%',lw:76}).svg;
      r+=`<text x="${R+6}" y="${Y+156}" class="t-sm">mean FEV1 rise, once daily</text><text x="${R+6}" y="${Y+190}" class="t-big" style="font-size:30px;fill:var(--cftr);opacity:${f1(ramp(g,.3,1))}">+5.8%</text>`;
      r+=`<text x="${R+6}" y="${Y+222}" class="t-sm" style="fill:var(--ink)">risk of exacerbation: −28% once</text><text x="${R+6}" y="${Y+236}" class="t-sm" style="fill:var(--ink)">daily, −37% twice daily</text>`;
      if(!N)r+=`<text x="${R+6}" y="${Y+262}" class="t-xs">Fuchs 1994, 968 people</text>`}
    if(p===3){r+=bars(R+6,Y+50,W-6,[{l:'PEP mask',v:1.14,col:'var(--rx)'},{l:'vest',v:2,col:'var(--muted)'}],{mx:2.5,g,title:'Exacerbations per person, 1 yr',fmt:v=>v.toFixed(2),lw:70}).svg;
      r+=bars(R+6,Y+140,W-6,[{l:'PEP mask',v:220,col:'var(--rx)'},{l:'vest',v:115,col:'var(--muted)'}],{mx:260,g,title:'Days to first exacerbation',fmt:v=>Math.round(v),lw:70}).svg;
      r+=`<text x="${R+6}" y="${Y+222}" class="t-sm" style="fill:var(--ink)">Lung function, quality of life:</text><text x="${R+6}" y="${Y+236}" class="t-sm" style="fill:var(--ink)">no difference</text>`;
      if(!N)r+=`<text x="${R+6}" y="${Y+262}" class="t-xs">McIlwaine 2013, 107 people</text>`}
    if(p===4){r+=bars(R+6,Y+50,W-6,[{l:'placebo',v:-2,col:'var(--muted)'},{l:'tobramycin',v:10,col:'var(--pot)'}],{mn:-5,mx:14,g,title:'FEV1 change at week 20',fmt:v=>(v>0?'+':'')+Math.round(v)+'%',lw:78}).svg;
      r+=bars(R+6,Y+140,W-6,[{l:'week 0',v:25,col:'var(--muted)'},{l:'week 24',v:32,col:'var(--warn)'}],{mx:50,g,title:'Tobramycin arm: MIC ≥8 μg/mL',fmt:v=>Math.round(v)+'%',lw:78}).svg;
      r+=`<text x="${R+6}" y="${Y+222}" class="t-sm" style="fill:var(--ink)">28 days on · 28 days off,</text><text x="${R+6}" y="${Y+236}" class="t-sm" style="fill:var(--ink)">three cycles</text>`;
      if(!N)r+=`<text x="${R+6}" y="${Y+262}" class="t-xs">Ramsey 1999, 520 people</text>`}
    /* progress through the sequence */
    const py=N?606:368,px0=N?14:16,pw=N?372:410;
    s+=`<line x1="${px0}" x2="${px0+pw}" y1="${py}" y2="${py}" style="stroke:var(--line);stroke-width:3;stroke-linecap:round"/>`;
    STEPS.forEach((q,i)=>{const xx=px0+pw*(i+.5)/5;s+=`<circle cx="${f1(xx)}" cy="${py}" r="${i===p?6:4}" style="fill:${i<=p?'var(--rx)':'var(--panel-2)'};stroke:var(--rx);stroke-width:1.2"/>`;
});
    svg.innerHTML=s+r}
  const stop=playWire(rg,pb,draw,16000,'Replay','clearance');
  draw(+rg.value);

  /* ---------- SIMPLIFY: stopping hypertonic saline or dornase alfa on ETI ---------- */
  const sv=$('#clSimSvg'),sbt=$$('#clSimBtns [data-sim]'),sout=$('#clSimOut');
  const SIM={hs:{n:370,name:'Hypertonic saline trial',stop:-.19,cont:.14,d:-.32,lo:-1.25,hi:.60},
             dn:{n:477,name:'Dornase alfa trial',stop:.18,cont:-.16,d:.35,lo:-.45,hi:1.14}};
  let simK='hs',simStop=null;
  function simDraw(k,g){const N=vb(sv,'720 250','400 290'),S=SIM[k],W=N?372:420,x0=N?14:250,X=v=>x0+W*(v+4)/6;
    let s='';
    /* left: the two arms */
    const bx=N?14:16,bw=N?372:210;s+=`<text x="${bx}" y="20" class="t-lbl">${S.name} · ${S.n} randomised</text>`;
    const Bb=v=>bx+96+(bw-130)*(v+.4)/.8;
    [['stopped',S.stop,'var(--rx)'],['continued',S.cont,'var(--muted)']].forEach(([l,v,c],i)=>{const yy=40+i*26,z=Bb(0),e=Bb(v*g);
      s+=`<text x="${bx+90}" y="${yy+12}" class="t-sm t-end" style="fill:var(--ink)">${l}</text><rect x="${f1(Math.min(z,e))}" y="${yy}" width="${f1(Math.max(.6,Math.abs(e-z)))}" height="16" rx="3" style="fill:${c}"/><text x="${f1(v<0?Math.min(z,e)-4:Math.max(z,e)+4)}" y="${yy+12}" class="t-sm${v<0?' t-end':''}" style="fill:var(--ink);font-weight:700">${(v>0?'+':'')+(v*g).toFixed(2)}</text>`});
    s+=`<line x1="${f1(Bb(0))}" x2="${f1(Bb(0))}" y1="34" y2="88" style="stroke:var(--ink)"/><text x="${bx}" y="104" class="t-xs">6-week change in ppFEV1, points</text>`;
    /* right (or below): the difference and its CI against the -3 margin */
    const fy=N?176:150;
    s+=`<rect x="${f1(X(-4))}" y="${fy-36}" width="${f1(X(-3)-X(-4))}" height="72" style="fill:var(--bad-soft)"/>`;
    s+=`<line x1="${f1(X(-3))}" x2="${f1(X(-3))}" y1="${fy-40}" y2="${fy+40}" style="stroke:var(--bad);stroke-width:2;stroke-dasharray:5 4"/><text x="${f1(X(-3)+4)}" y="${fy-44}" class="t-sm" style="fill:var(--bad);font-weight:700">margin −3</text>`;
    s+=`<line x1="${f1(X(0))}" x2="${f1(X(0))}" y1="${fy-40}" y2="${fy+40}" style="stroke:var(--ink);stroke-width:1"/>`;
    for(let v=-4;v<=2;v++)s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${fy+40}" y2="${fy+45}" class="axis"/><text x="${f1(X(v))}" y="${fy+58}" class="t-xs t-mid">${v}</text>`;
    const lo=lerp(S.d,S.lo,g),hi=lerp(S.d,S.hi,g);
    s+=`<line x1="${f1(X(lo))}" x2="${f1(X(hi))}" y1="${fy}" y2="${fy}" style="stroke:var(--rx);stroke-width:3"/><line x1="${f1(X(lo))}" x2="${f1(X(lo))}" y1="${fy-8}" y2="${fy+8}" style="stroke:var(--rx);stroke-width:2"/><line x1="${f1(X(hi))}" x2="${f1(X(hi))}" y1="${fy-8}" y2="${fy+8}" style="stroke:var(--rx);stroke-width:2"/>`;
    s+=`<rect x="${f1(X(S.d)-6)}" y="${fy-6}" width="12" height="12" style="fill:var(--rx)"/>`;
    s+=`<text x="${f1(X(S.d))}" y="${fy-16}" class="t-sm t-mid" style="fill:var(--ink);font-weight:700">${(S.d>0?'+':'')+S.d.toFixed(2)} (${S.lo.toFixed(2)} to ${S.hi.toFixed(2)})</text>`;
    s+=`<text x="${f1(X(-1))}" y="${fy+76}" class="t-xs t-mid">difference, stopped minus continued (95% CI)</text>`;
    sv.innerHTML=s;
    sout.innerHTML=`<b>${S.name}:</b> the whole confidence interval sits to the right of the −3 point margin, so stopping was <b>non-inferior</b> to continuing over 6 weeks in this population [[MayerHamblett2023SIMPLIFY]].`;}
  function simGo(k){simK=k;sbt.forEach(b=>b.setAttribute('aria-pressed',b.dataset.sim===k));if(simStop)simStop();simStop=animate(900,q=>simDraw(k,ease(q)),()=>{simStop=null})}
  sbt.forEach(b=>b.addEventListener('click',()=>simGo(b.dataset.sim)));
  simDraw('hs',1);
  onHide.clearance=(prev=>()=>{prev&&prev();if(simStop){simStop();simStop=null}})(onHide.clearance);
  redraws.clearance=(prev=>()=>{prev&&prev();simDraw(simK,1)})(redraws.clearance);
};
