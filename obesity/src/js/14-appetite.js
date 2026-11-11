/* =============== 1.4 Appetite: the gut-brain loop =============== */
/* The main player follows one loop: the stomach, gut and fat tissue send hormones (drawn as particles, each with its own
   colour and shape) to the hypothalamus, where POMC (fullness) and AgRP (hunger) neurons in the arcuate nucleus act on
   MC4R in the paraventricular nucleus. Particle counts and meter levels are schematic: they show direction and balance,
   never measured amounts. The published numbers sit in the notes and in the meter's fact lines (research pass C). */
const AP_STEPS=[
 {from:0,at:.1,k:'Before a meal',t:'Fasting: ghrelin rises',
  txt:'Ghrelin is a 28-amino-acid peptide from the stomach whose activity needs an octanoyl group on serine 3. [[Kojima1999]] Across 24 hours, plasma ghrelin rose nearly twofold just before each meal. [[Cummings2001]] It switches on the hunger neurons: in rodents it activated NPY/AgRP neurons, and blocking them abolished ghrelin-induced feeding. [[Nakazato2001]] In 9 volunteers, a ghrelin infusion raised buffet intake by 28% and everyone ate more. [[Wren2001]]',
  pt:'Ghrelin comes from the stomach. It rises before meals and drops after you eat, which is one reason hunger follows a rhythm. [[Cummings2001]]',
  hook:'Ghrelin: 28 amino acids, octanoylated at serine 3, from the stomach; it rises nearly twofold before meals and acts on arcuate NPY/AgRP neurons. [[Kojima1999,Cummings2001,Nakazato2001]]'},
 {from:.17,at:.28,k:'A meal arrives',t:'Eating: ghrelin falls, CCK rises',
  txt:'Within 1 hour of eating, ghrelin fell to its trough, the reverse of insulin\'s pattern. [[Cummings2001]] The gut-brain axis works through stomach stretch, satiety peptides from the intestine and pancreas, and ghrelin, with gut endocrine cells sensing nutrients. [[Cummings2007]] CCK reduces food intake: an infusion of its C-terminal octapeptide cut intake by an average of 122 g in 12 lean men, who stopped eating sooner. [[Gibbs1973,Kissileff1981]]',
  pt:'As food arrives, the stomach stops sending its hunger signal and the first fullness signals start. [[Cummings2001,Cummings2007]]',
  hook:'Ghrelin falls to its trough within 1 hour of eating; CCK shortens the meal. [[Cummings2001,Kissileff1981]]'},
 {from:.34,at:.45,k:'After the meal',t:'Fullness: GLP-1 and PYY',
  txt:'PYY(3-36) is released after meals in proportion to the calories eaten and acts on Y2 receptors on arcuate NPY neurons; infusing post-meal levels cut food intake by 33% over 24 hours. [[Batterham2002]] GLP-1 from intestinal L cells is released after meals [[Holst2007]], slows gastric emptying even at a physiological dose [[Nauck1997]] and cut lunch intake by 12% in healthy men. [[Flint1998]] POMC neurons release alpha-MSH, which activates MC4R; mice lacking MC4R overeat and develop obesity. [[Huszar1997]]',
  pt:'After a meal, your gut releases PYY, CCK and GLP-1, which help you feel full. GLP-1 also slows how fast your stomach empties. [[Batterham2002,Kissileff1981,Flint1998,Nauck1997]]',
  hook:'POMC → alpha-MSH → MC4R in the paraventricular nucleus = fullness. PYY(3-36) acts on Y2 receptors on NPY neurons. [[Huszar1997,Batterham2002]]'},
 {from:.5,at:.61,k:'The long-term signal',t:'Leptin reports the stores',
  txt:'Leptin, the product of the ob gene, was cloned in 1994. [[Zhang1994]] Serum leptin rises with fat mass: 31.3 ng/mL on average in 139 people with obesity against 7.5 ng/mL in 136 without, with r = 0.85 against percentage body fat. [[Considine1996]] Leptin excites POMC neurons and reduces inhibition from neighbouring NPY/GABA neurons. [[Cowley2001]] The hindbrain\'s nucleus tractus solitarius combines vagal gut signals with hormones, so appetite control is spread across the brain. [[Grill2012]]',
  pt:'Leptin is made by fat. More fat usually means more leptin, a slow, steady report on how much energy is stored. [[Considine1996]]',
  hook:'Leptin excites POMC neurons and inhibits NPY/AgRP input; serum leptin tracks body fat (r = 0.85). [[Cowley2001,Considine1996]]'},
 {from:.67,at:.78,k:'In common obesity',t:'Leptin resistance',
  txt:'Most people with obesity have high leptin and appear insensitive to it. [[Considine1996]] Serum leptin was 318% higher in obesity (40.2 vs 9.6 ng/mL), but leptin in the cerebrospinal fluid was only about 30% higher (0.337 vs 0.259 ng/mL): the CSF/serum ratio was 4.3-fold lower. [[Caro1996]] Obesity itself weakens leptin signalling inside cells, so cause and effect are hard to separate. [[Myers2010]] In common obesity, leptin injections gave modest, variable weight change (−0.7 to −7.1 kg over 24 weeks). [[Heymsfield1999]]',
  pt:'In most people with obesity the brain hears the leptin signal less well, a bit like a radio turned down. [[Considine1996,Caro1996]]',
  hook:'High leptin in common obesity means resistance, not deficiency; the CSF/serum leptin ratio is 4.3-fold lower. [[Considine1996,Caro1996]]'},
 {from:.84,at:.95,k:'When one gene breaks',t:'Leptin deficiency and MC4R',
  txt:'Two children from one family had very low leptin despite high fat mass, from a homozygous frameshift in the leptin gene: the first genetic proof that leptin regulates human energy balance. [[Montague1997]] Leptin treatment reduces their hyperphagia and obesity. [[Farooqi1999Leptin,Farooqi2002Leptin]] MC4R mutations, the most common monogenic cause, were found in 5.8% of 500 people with severe childhood obesity, with hyperphagia and codominant inheritance. [[Farooqi2003MC4R]] The MC4R agonist setmelanotide gave ≥10% weight loss in 80% (POMC deficiency) and 45% (LEPR deficiency) at about a year. [[Clement2020]]',
  pt:'When one key link in the loop is missing, hunger can be intense and constant. That is a medical cause, not a lack of willpower. [[Farooqi2003MC4R,Montague1997]]',
  hook:'Congenital leptin deficiency: very low leptin, severe early obesity, treatable with leptin. MC4R deficiency: 5.8% of severe childhood obesity, codominant. [[Montague1997,Farooqi2003MC4R]]'}
];
/* meter rows: hormone kind, name, where from, and a short published fact per step group (no citations inside the SVG) */
const AP_METER=[
 {k:'ghrelin',n:'ghrelin',src:'stomach'},
 {k:'cck',n:'CCK',src:'duodenum'},
 {k:'glp1',n:'GLP-1',src:'L cells'},
 {k:'pyy',n:'PYY',src:'L cells'},
 {k:'leptin',n:'leptin',src:'fat'}];
const AP_FACT=['ghrelin rises nearly twofold before a meal','ghrelin falls to its trough within 1 hour','PYY infusion: −33% food over 24 h','leptin tracks body fat (r = 0.85)','CSF/serum leptin ratio 4.3-fold lower','MC4R: 5.8% of severe childhood obesity'];
/* signal levels along the loop, 0..1: schematic */
function apLv(t){const ph=phaseOf(AP_STEPS,t);
  const ghr=t<.17?lerp(.35,1,ease(ramp(t,0,.14))):t<.5?lerp(1,.12,ease(ramp(t,.18,.3))):ph===5?.4:.3;
  const cck=bump(t,.18,.44),glp=bump(t,.26,.52)*.95,pyy=bump(t,.28,.54)*.9;
  const lep=ph<3?.25:ph===3?lerp(.25,.75,ease(ramp(t,.5,.58))):ph===4?lerp(.75,1,ramp(t,.67,.74)):lerp(1,0,ramp(t,.84,.88));
  const brainLep=ph===4?lerp(.75,.3,ramp(t,.67,.76)):ph===5?lep*.3:lep;
  const food=t>.17&&t<.5?ramp(t,.17,.5)*.55:null,fill=bump(t,.16,.46);
  let pomc=clamp(Math.max(cck*.6,glp,pyy)*.95+brainLep*.6-ghr*.15),agrp=clamp(ghr*1.05-Math.max(glp,pyy)*.4-brainLep*.3);
  if(ph===4){agrp=Math.max(agrp,.45);pomc=Math.min(pomc,.45)}
  if(ph===5){agrp=lerp(agrp,.95,ramp(t,.84,.9));pomc=lerp(pomc,.25,ramp(t,.84,.9))}
  const mc4r=ph===5?lerp(pomc,0,ramp(t,.88,.93)):clamp(pomc*(1-agrp*.6));
  return {ghr:clamp(ghr),cck:clamp(cck),glp1:clamp(glp),pyy:clamp(pyy),leptin:clamp(lep),brainLep:clamp(brainLep),food,fill,pomc,agrp,mc4r}}

/* the 24-hour ghrelin day: schematic shape built from the published pattern [[Cummings2001]] */
const AP_MEALS=[8,12.5,18.5];
const AP_MODES={
 typical:{lab:'Typical day',k:'24 hours of ghrelin',t:'A rise before every meal',
  txt:'In 10 healthy adults sampled 38 times over 24 hours on fixed meals, plasma ghrelin rose nearly twofold just before each meal and fell to its trough within 1 hour after eating, the reverse of insulin. Between meals it followed a daily rhythm, peaking at 01:00 and lowest at 09:00. [[Cummings2001]] The meal times drawn here are illustrative.',
  pt:'Ghrelin builds as a meal gets closer, drops soon after eating, and is highest in the middle of the night. [[Cummings2001]]',
  hook:'Pre-meal ghrelin surge nearly twofold; trough within 1 hour after eating; diurnal peak 01:00, nadir 09:00. [[Cummings2001]]'},
 diet:{lab:'After diet-induced weight loss',k:'After 17% weight loss by diet',t:'Ghrelin goes up',
  txt:'After diet-induced weight loss of 17%, the 24-hour ghrelin area under the curve rose by 24% compared with before the diet. [[Cummings2002]] One year after a 10-week diet programme, ghrelin and hunger were still above baseline, and leptin, PYY and CCK still below. [[Sumithran2011]] The rise is drawn here as the whole day scaled by 1.24.',
  pt:'After weight loss, the body fights back. Hunger hormones rise and can stay up for a long time. That is biology, not a lack of willpower. [[Sumithran2011]]',
  hook:'Diet-induced weight loss: ghrelin AUC +24%. One year on, ghrelin and hunger still high, leptin, PYY and CCK still low. [[Cummings2002,Sumithran2011]]'},
 bypass:{lab:'After gastric bypass',k:'After Roux-en-Y gastric bypass',t:'Ghrelin falls and flattens',
  txt:'After Roux-en-Y gastric bypass with 36% weight loss, the 24-hour ghrelin area under the curve was 77% lower than in normal-weight controls and 72% lower than in matched controls with obesity, and the meal-related swings disappeared. [[Cummings2002]] After bypass, post-meal PYY and GLP-1 were also higher than in lean controls, a rise not seen after a gastric band. [[leRoux2006]]',
  pt:'Bypass surgery changes the hunger signals themselves: much less ghrelin and more of the fullness hormones. [[Cummings2002,leRoux2006]]',
  hook:'Gastric bypass: ghrelin AUC 77% below normal-weight controls, with no meal swings; post-meal PYY and GLP-1 rise. [[Cummings2002,leRoux2006]]'}
};

inits.appetite=()=>{
  const T=(x,y,s,cls='t-sm',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`;
  const INK='fill:var(--ink);font-weight:700';
  /* particles along a quadratic curve from a to b */
  const stream=(a,b,bend,kind,n,lv,ph,r,dashOp=.5)=>{if(lv<=.03)return '';const c=[(a[0]+b[0])/2+bend[0],(a[1]+b[1])/2+bend[1]];
    let s=`<path d="M${f1(a[0])} ${f1(a[1])}Q${f1(c[0])} ${f1(c[1])} ${f1(b[0])} ${f1(b[1])}" style="fill:none;stroke:${HORMONE_INFO[kind].col};stroke-width:1.3;stroke-dasharray:2 4;opacity:${f1(lv*dashOp)}"/>`;
    const m=Math.max(1,Math.round(n*lv));
    for(let i=0;i<m;i++){const u=((i/m)+ph)%1,q=1-u,x=q*q*a[0]+2*q*u*c[0]+u*u*b[0],y=q*q*a[1]+2*q*u*c[1]+u*u*b[1];
      s+=hormoneDot(x,y,kind,{r,op:clamp(lv*1.5)*(u<.08?u/.08:u>.92?(1-u)/.08:1)})}
    return s};
  const cross=(x,y,r=9)=>`<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" style="fill:var(--panel);stroke:var(--risk);stroke-width:2"/><path d="M${f1(x-4)} ${f1(y-4)}l8 8m0-8l-8 8" style="stroke:var(--risk);stroke-width:2.2;stroke-linecap:round"/>`;

  /* ---------- the loop player ---------- */
  const svg=$('#apSvg'),rg=$('#apT');
  function draw(t){
    const N=vb(svg,'720 400','400 680'),p=phaseOf(AP_STEPS,t),P=AP_STEPS[p],V=apLv(t),ph=RM?.3:(t*16)%1;
    const L=N?{hx:14,hy:24,bx:4,by:52,bs:1.3,gx:4,gy:290,gs:.98,fx:222,fy:420,fw:164,fh:84,mx:14,my:556,mw:372,r:5.2}
             :{hx:16,hy:26,bx:262,by:20,bs:1.12,gx:14,gy:90,gs:1.06,fx:262,fy:290,fw:150,fh:80,mx:448,my:236,mw:258,r:4.8};
    let s=T(L.hx,L.hy,P.t,'t-big','font-size:18px')+T(L.hx,L.hy+16,P.k,'t-sm');
    const G=gutTract(L.gx,L.gy,L.gs,{fill:V.fill,food:V.food,glow:{stomach:V.ghr*.9,duo:V.cck,ileum:Math.max(V.glp1,V.pyy)}});
    s+=G.svg;
    const F=adiposeTissue(L.fx,L.fy,L.fw,L.fh,{size:p>=3?.75:.55,seed:6,frame:true,cell:24});
    s+=F.svg+kitLabel(L.fx+L.fw/2,L.fy+L.fh+13,'fat tissue',{a:'m'});
    s+=kitLabel(G.at.stomach[0]+8,G.at.stomach[1]-22,'stomach',{a:'m'})+kitLabel(G.at.duo[0]-4,G.at.duo[1]+4,'duodenum',{a:'e'})+kitLabel(G.at.ileum[0],G.at.ileum[1]+24,'ileum (L cells)',{a:'m'});
    const B=brainHypothalamus(L.bx,L.by,L.bs,{pomc:V.pomc,agrp:V.agrp,mc4r:V.mc4r,labels:true});
    s+=B.svg;
    const tgt=B.at.bloodIn,hy=B.at.hypo;
    /* streams to the hypothalamus inset */
    s+=stream(G.at.stomach,tgt,[N?-60:-30,N?-70:-60],'ghrelin',9,V.ghr,ph,L.r);
    s+=stream(G.at.duo,tgt,[N?-80:-40,-30],'cck',7,V.cck,(ph+.33)%1,L.r);
    s+=stream(G.at.ileum,tgt,[N?-40:30,N?-60:-20],'glp1',8,V.glp1,(ph+.15)%1,L.r);
    s+=stream([G.at.ileum[0]+12,G.at.ileum[1]+6],tgt,[N?-10:60,N?-40:0],'pyy',7,V.pyy,(ph+.6)%1,L.r);
    /* leptin: from fat; in resistance only a share crosses into the brain */
    const fatOut=[L.fx+L.fw*.6,L.fy];
    if(p===4){const gate=[lerp(fatOut[0],tgt[0],.78),lerp(fatOut[1],tgt[1],.78)];
      s+=stream(fatOut,gate,[N?30:40,-10],'leptin',10,V.leptin,(ph+.4)%1,L.r);
      s+=stream(gate,tgt,[0,0],'leptin',3,V.brainLep,(ph*1.3)%1,L.r,.8);
      const ang=Math.atan2(tgt[1]-gate[1],tgt[0]-gate[0])+Math.PI/2,dx=Math.cos(ang)*22,dy=Math.sin(ang)*22;
      s+=`<line x1="${f1(gate[0]-dx)}" y1="${f1(gate[1]-dy)}" x2="${f1(gate[0]+dx)}" y2="${f1(gate[1]+dy)}" style="stroke:var(--ink);stroke-width:3;stroke-dasharray:4 3;opacity:${f1(ramp(t,.67,.72))}"/>`;
      s+=kitLabel(gate[0]+(N?-26:26),gate[1]+(N?-8:4),'into the brain',{a:N?'e':''})}
    else s+=stream(fatOut,tgt,[N?30:40,-10],'leptin',9,V.leptin,(ph+.4)%1,L.r);
    if(p===5){const o=ramp(t,.86,.9);
      s+=`<g style="opacity:${f1(o)}">`+cross(fatOut[0],fatOut[1]-12)+kitLabel(fatOut[0]+14,fatOut[1]-24,'no leptin',{})+'</g>';
      if(B.at.inset){const pv=B.at.pvn;s+=`<g style="opacity:${f1(ramp(t,.88,.93))}">`+cross(pv[0]+B.at.inset[2]*.55,pv[1]-B.at.inset[2]*.25)+'</g>'}}
    /* hunger vs fullness readout near the brain */
    const bal=V.pomc-V.agrp,bx=N?214:534,by=N?272:214;
    s+=T(bx,by,bal>.12?'fullness winning':bal<-.12?'hunger winning':'in balance','t-sm t-mid',`font-weight:700;fill:${bal>.12?'var(--brand)':bal<-.12?'var(--accent)':'var(--muted)'}`);
    /* meter */
    const M=L,rowH=N?18:20;
    s+=`<rect x="${M.mx-8}" y="${M.my-18}" width="${M.mw+16}" height="${AP_METER.length*rowH+44}" rx="10" style="fill:var(--panel);stroke:var(--line)"/>`;
    s+=T(M.mx,M.my-3,'signal level (schematic)','t-xs',INK);
    AP_METER.forEach((m,i)=>{const y=M.my+8+i*rowH,v=m.k==='leptin'?V.leptin:V[m.k],bw=M.mw-150;
      s+=hormoneDot(M.mx+5,y,m.k,{r:4.5})+T(M.mx+16,y+4,m.n,'t-xs',INK)+T(M.mx+60,y+4,m.src,'t-xs');
      s+=`<rect x="${M.mx+120}" y="${y-5}" width="${bw}" height="10" rx="3" style="fill:var(--panel-2)"/><rect x="${M.mx+120}" y="${y-5}" width="${f1(Math.max(1,bw*v))}" height="10" rx="3" style="fill:${HORMONE_INFO[m.k].col}"/>`});
    s+=T(M.mx,M.my+8+AP_METER.length*rowH+6,AP_FACT[p],'t-xs',`fill:var(--ink)`);
    svg.innerHTML=s;
    setSt(p);$('#apNote').innerHTML=noteHTML(P);
  }
  const stop=playWire(rg,$('#apPlay'),draw,26000,'%t:player.replay%','appetite');
  const setSt=stepWire($('#apSteps'),AP_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- the 24-hour ghrelin curve ---------- */
  const gsv=$('#apGh'),grg=$('#apGhT'),gbt=$('#apGhModes'),gins=$('#apGhIns'),gread=$('#apGhRead'),gnote=$('#apGhNote');
  let mode='typical';
  gbt.innerHTML=Object.keys(AP_MODES).map(k=>`<button class="btn" data-gm="${k}" aria-pressed="${k===mode}">${AP_MODES[k].lab}</button>`).join('');
  /* clock hours run 6 → 30 (06:00 to 06:00 next day) */
  const base=h=>{const hh=((h%24)+24)%24;/* intermeal rhythm: lowest 09:00, highest 01:00 */
    const d=(hh-9+24)%24;return d<=16?lerp(.42,.62,(1-Math.cos(Math.PI*d/16))/2):lerp(.62,.42,(1-Math.cos(Math.PI*(d-16)/8))/2)};
  const pre=h=>{let v=0;AP_MEALS.forEach(m=>{if(h>m-3&&h<=m)v=Math.max(v,Math.pow((h-(m-3))/3,2));else if(h>m&&h<m+1)v=Math.max(v,1-(h-m))});return v};
  const dip=h=>{let v=0;AP_MEALS.forEach(m=>{v=Math.max(v,bump(h,m+.4,m+2.6))});return v};
  const ghT=h=>base(h)*(.9+pre(h)*.92-dip(h)*.12);
  let MEAN=0;for(let i=0;i<=240;i++)MEAN+=ghT(6+24*i/240);MEAN/=241;
  const gh=(h,md)=>md==='diet'?ghT(h)*1.24:md==='bypass'?MEAN*.23*(1+.04*Math.sin((h-1)/24*Math.PI*2)):ghT(h);
  const ins=h=>{let v=.06;AP_MEALS.forEach(m=>{v+=bump(h,m,m+3)*.55*(h<m+.8?1:1)});return v};
  const clock=h=>{const hh=((Math.floor(h)%24)+24)%24,mm=Math.round((h-Math.floor(h))*60);return String(hh).padStart(2,'0')+':'+String(mm===60?0:mm).padStart(2,'0')};
  function drawGh(t){
    const N=vb(gsv,'720 320','400 440'),h=6+24*t,md=mode,showI=gins.checked;
    const L=N?{x:46,y:44,w:338,h:300}:{x:60,y:36,w:640,h:220};
    const C=curveAxes(L.x,L.y,L.w,L.h,{x0:6,x1:30,y0:0,y1:1.6,xt:N?[6,12,18,24,30]:[6,9,12,15,18,21,24,27,30],yt:[0,.5,1,1.5],xfmt:v=>String(v%24).padStart(2,'0')+':00',yfmt:v=>v.toFixed(1),ylabel:'ghrelin, relative to the day\'s average (schematic)'});
    let s=C.svg;
    /* night band */
    s+=`<rect x="${f1(C.X(22))}" y="${L.y}" width="${f1(C.X(30)-C.X(22))}" height="${L.h}" style="fill:var(--panel-2);opacity:.6"/>`+T(C.X(26),L.y+14,'night','t-xs t-mid');
    AP_MEALS.forEach((m,i)=>{const x=C.X(m);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${L.y}" y2="${L.y+L.h}" style="stroke:var(--accent);stroke-width:1.2;stroke-dasharray:3 3"/>`+T(x,L.y-6,['breakfast','lunch','dinner'][i],'t-xs t-mid',`fill:var(--accent);font-weight:700`)});
    const nrm=v=>v/MEAN;
    const path=(f,a,b)=>{let q='';const n=200;for(let i=0;i<=n;i++){const hh=lerp(a,b,i/n);q+=(i?'L':'M')+f1(C.X(hh))+' '+f1(C.Y(Math.min(1.6,nrm(f(hh)))))}return q};
    if(md!=='typical')s+=`<path d="${path(ghT,6,30)}" style="fill:none;stroke:var(--ghrelin);stroke-width:1.6;stroke-dasharray:5 4;opacity:.55"/>`+T(C.X(29.6),C.Y(nrm(ghT(29.6)))-6,'typical day','t-xs t-end');
    if(showI)s+=`<path d="${path(ins,6,30)}" style="fill:none;stroke:var(--insulin);stroke-width:2;stroke-dasharray:2 3"/>`;
    const f=hh=>gh(hh,md);
    s+=`<path d="${path(f,6,h)}L${f1(C.X(h))} ${f1(C.Y(0))}L${f1(C.X(6))} ${f1(C.Y(0))}Z" style="fill:var(--ghrelin);opacity:.14"/>`;
    s+=`<path d="${path(f,6,h)}" style="fill:none;stroke:var(--ghrelin);stroke-width:3;stroke-linejoin:round"/>`;
    const cy=C.Y(Math.min(1.6,nrm(f(h))));
    s+=`<line x1="${f1(C.X(h))}" x2="${f1(C.X(h))}" y1="${L.y}" y2="${L.y+L.h}" style="stroke:var(--ink);stroke-width:1;stroke-dasharray:3 3;opacity:.6"/>`+hormoneDot(C.X(h),cy,'ghrelin',{r:6});
    /* legend */
    const lg=N?[L.x,L.y+L.h+44]:[L.x,L.y+L.h+44];
    s+=hormoneDot(lg[0]+5,lg[1]-4,'ghrelin',{r:5})+T(lg[0]+14,lg[1],md==='typical'?'ghrelin':md==='diet'?'ghrelin after diet (×1.24)':'ghrelin after bypass (77% lower, flat)','t-xs',INK);
    if(showI)s+=`<line x1="${f1(lg[0]+(N?0:250))}" x2="${f1(lg[0]+(N?14:264))}" y1="${lg[1]+(N?14:-4)}" y2="${lg[1]+(N?14:-4)}" style="stroke:var(--insulin);stroke-width:2;stroke-dasharray:2 3"/>`+T(lg[0]+(N?20:270),lg[1]+(N?18:0),'insulin (schematic: the reverse pattern)','t-xs',INK);
    gsv.innerHTML=s;
    /* readout */
    let near=null;AP_MEALS.forEach(m=>{if(h>m-3&&h<=m)near=['before',m];else if(h>m&&h<m+1.2)near=['after',m]});
    const nm=m=>['breakfast','lunch','dinner'][AP_MEALS.indexOf(m)];
    const st=md==='bypass'?'low and flat: no meal swings':near?(near[0]==='before'?`rising before ${nm(near[1])}`:`falling after ${nm(near[1])}`):(((h%24)+24)%24)>=22||(((h%24)+24)%24)<6?'overnight: the daily peak is near 01:00':'between meals';
    gread.innerHTML=`<span>Time <b>${clock(h)}</b></span><span>Ghrelin: <b>${st}</b></span><span>Level <b>${nrm(f(h)).toFixed(2)}×</b> the typical day's average (schematic)</span>`;
  }
  function setMode(m){mode=m;$$('[data-gm]',gbt).forEach(b=>b.setAttribute('aria-pressed',b.dataset.gm===m));gnote.innerHTML=noteHTML(AP_MODES[m]);drawGh(+grg.value)}
  const stopG=playWire(grg,$('#apGhPlay'),drawGh,12000,'%t:player.replay%','appetite');
  gbt.addEventListener('click',e=>{const b=e.target.closest('[data-gm]');if(!b)return;stopG();setMode(b.dataset.gm)});
  gins.addEventListener('change',()=>drawGh(+grg.value));
  setMode(mode);
};
