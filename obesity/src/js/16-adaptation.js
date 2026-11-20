/* =============== 1.6 why lost weight comes back =============== */
/* Time axis: the first 30 weeks (the competition) take the first 45% of the slider, then weeks 30 to 312 (6 years).
   Dots are the published group means of the "Biggest Loser" cohort [[Johannsen2012,Fothergill2016]]; curves between
   them are schematic. */
const AA_T30=.45,AA_END=312;
function aaWk(t){return t<=AA_T30?30*t/AA_T30:30+(AA_END-30)*(t-AA_T30)/(1-AA_T30)}
function aaTOf(w){return w<=30?w/30*AA_T30:AA_T30+(1-AA_T30)*(w-30)/(AA_END-30)}
const AA_STEPS=[
 {from:0,at:.2,k:'Weeks 0 to 30',t:'Weight comes off',
  txt:'Sixteen contestants in a televised weight-loss competition (baseline BMI 49.4) lost 38 ± 9% of their weight by week 30, 83% of it fat. [[Johannsen2012]] The mean loss was 58.3 kg. [[Fothergill2016]] On the see-saw, energy out outweighs energy in, so stored fat is used up.',
  pt:'For a while, the body uses more energy than it takes in, and weight falls. [[Johannsen2012]]',
  hook:'Huge losses in this small cohort: 58.3 kg on average by week 30. [[Fothergill2016]]'},
 {from:.3,at:.43,k:'Week 6 to 30',t:'Burning less than predicted',
  txt:'Resting metabolic rate fell more than the change in body size predicted: metabolic adaptation was −244 ± 231 kcal/day at week 6 and −504 ± 171 kcal/day at week 30, despite vigorous exercise. [[Johannsen2012]] In a classic study, holding weight 10% below usual lowered total energy expenditure by 6 to 8 kcal per kg fat-free mass per day. [[Leibel1995]] Muscle works more efficiently, and sympathetic tone, leptin and thyroid hormones fall. [[Rosenbaum2005]]',
  pt:'A smaller body needs less energy, but after weight loss it uses even less than its new size would predict. [[Johannsen2012,Leibel1995]]',
  hook:'Leibel 1995: TEE falls about 6 to 8 kcal/kg FFM/day below prediction at 10% lower weight. [[Leibel1995]]'},
 {from:.47,at:.55,k:'After the loss',t:'Hunger turns up',
  txt:'In another study, a year after a mean 13.5 kg loss, leptin, PYY, CCK and insulin were still lower and ghrelin and hunger still higher than at the start. [[Sumithran2011]] Ghrelin over 24 hours rose 24% after a 17% diet-induced loss. [[Cummings2002]] Modelling suggests intake rises by about 100 kcal/day for every kg lost, more than three times the fall in expenditure. [[Polidori2016]] The see-saw tips the other way.',
  pt:'After weight loss, the hormones that make you hungry go up and the ones that make you feel full go down. You really do feel hungrier. [[Sumithran2011]]',
  hook:'Appetite push-back (~100 kcal/day per kg lost) is about three times the metabolic slowdown. [[Polidori2016]]'},
 {from:.62,at:.75,k:'Years 1 to 4',t:'Weight returns',
  txt:'Rosenbaum and Leibel report a relapse rate of over 80% to pre-weight-loss body fat after otherwise successful weight loss, from coordinated metabolic, behavioural, neuroendocrine and autonomic responses. [[Rosenbaum2010]] The Endocrine Society notes that most people who complete behavioural and dietary programmes eventually regain most of the weight lost. [[Schwartz2017EndoSoc]] The same happens after medicines stop: in a STEP 1 extension, 11.6 of 17.3 percentage points of loss returned within a year of stopping semaglutide. [[Wilding2022STEP1ext]]',
  pt:'Regaining weight is biology at work, not a lack of willpower. It is a main reason obesity is treated as a long-term condition. [[Schwartz2017EndoSoc,Wilding2022STEP1ext]]',
  hook:'Over 80% relapse to pre-loss body fat after successful weight loss. [[Rosenbaum2010]]'},
 {from:.88,at:.99,k:'Year 6',t:'Six years on',
  txt:'Fourteen of the 16 were measured at 6 years. 41.0 ± 31.3 kg of the 58.3 kg lost had returned, yet resting metabolic rate was still 704 ± 427 kcal/day below baseline and metabolic adaptation was −499 ± 207 kcal/day. [[Fothergill2016]] Adaptation at week 30 did not predict regain (r = −0.1); those who kept off more weight showed more slowing (r = 0.59), read as a response to ongoing efforts to hold weight down. [[Fothergill2016]] A study of more modest loss measured little lasting adaptation (−54 kcal/day), so size depends on the setting. [[Martins2020]]',
  pt:'Even six years later, the bodies of these people were still burning less energy than expected. The body keeps defending its old weight. [[Fothergill2016]]',
  hook:'Biggest Loser at 6 years: metabolic adaptation still −499 kcal/day. [[Fothergill2016]]'}
];
const AA_W=[[0,0],[30,-58.3],[312,-17.3]];                 /* kg; 312 wk = 58.3 lost minus 41.0 regained [[Fothergill2016]] */
const AA_MA=[[0,0],[6,-244],[30,-504],[312,-499]];          /* kcal/day [[Johannsen2012,Fothergill2016]] */
const AA_RMR=[[30,-610],[312,-704]];                       /* kcal/day vs baseline [[Fothergill2016]] */
const AA_LBL={inn:'energy in',out:'energy out',hunger:'hunger (schematic)',w:'weight change, kg',ma:'metabolic adaptation, kcal/day',rmr:'resting rate vs baseline',
  wk:'week',yr:'year',x:'weeks 0–30, then years',lep:'leptin',ghr:'ghrelin',pyy:'PYY'};

/* Sumithran 2011: directions at 10 and 62 weeks, and P at 62 weeks [[Sumithran2011]] */
const AA_H=[
 {n:'Leptin',kind:'leptin',d:[-1,-1],p:'P<0.001',txt:'Leptin fell with weight loss and was still lower at 62 weeks (P<0.001). [[Sumithran2011]] Restoring leptin with injections in people holding a 10% loss brought energy expenditure and thyroid hormones back to pre-loss values, so the reduced-weight state behaves like relative leptin deficiency. [[Rosenbaum2005]]'},
 {n:'PYY',kind:'pyy',d:[-1,-1],p:'P<0.001',txt:'PYY, a fullness hormone from the gut, was lower at 10 weeks and still lower at 62 weeks (P<0.001). [[Sumithran2011]]'},
 {n:'CCK',kind:'cck',d:[-1,-1],p:'P=0.04',txt:'Cholecystokinin, a fullness hormone from the upper gut, was lower at 10 weeks and still lower at 62 weeks (P=0.04). [[Sumithran2011]]'},
 {n:'Insulin',kind:'insulin',d:[-1,-1],p:'P=0.01',txt:'Insulin was lower at 10 weeks and still lower at 62 weeks (P=0.01). [[Sumithran2011]]'},
 {n:'Amylin',kind:null,d:[-1,0],p:'',txt:'Amylin fell at 10 weeks. It is not among the changes the abstract lists as still different at 62 weeks. [[Sumithran2011]]'},
 {n:'Ghrelin',kind:'ghrelin',d:[1,1],p:'P<0.001',txt:'Ghrelin, the hunger hormone from the stomach, rose and was still higher at 62 weeks (P<0.001). [[Sumithran2011]] In another study, ghrelin over 24 hours rose 24% after a 17% diet-induced weight loss. [[Cummings2002]]'},
 {n:'GIP',kind:'gip',d:[1,1],p:'P<0.001',txt:'GIP rose and was still higher at 62 weeks (P<0.001). [[Sumithran2011]]'},
 {n:'Pancreatic polypeptide',kind:null,d:[1,1],p:'P=0.002',txt:'Pancreatic polypeptide rose and was still higher at 62 weeks (P=0.002). [[Sumithran2011]]'},
 {n:'Hunger',kind:null,d:[1,1],p:'P<0.001',txt:'Subjective appetite rose and hunger was still higher at 62 weeks (P<0.001): the hormonal push toward regain had not reverted. [[Sumithran2011]] Modelling suggests appetite rises by about 100 kcal/day for each kg lost. [[Polidori2016]]'}
];
const AA_HT={base:'baseline',w10:'10 weeks',w62:'62 weeks',dir:'direction only',grid:'all measures',np:'not reported as persisting'};

inits.adaptation=()=>{
  /* ---------- the main player ---------- */
  const svg=$('#aaSvg'),rg=$('#aaT');
  const MA=monoFn(AA_MA);
  const wt=w=>w<=30?-58.3*(1-Math.pow(1-w/30,1.6)):-58.3+41*(1-Math.pow(1-(w-30)/(AA_END-30),1.8));
  const TK=[{w:0,l:'0'},{w:10,l:'10'},{w:20,l:'20'},{w:30,l:'30 wk'},{w:104,l:'2 y'},{w:208,l:'4 y'},{w:312,l:'6 y'}];
  function draw(t){
    const N=vb(svg,'720 380','400 600');
    const L=N?{rx:16,ry:30,hx:16,hy:62,gx:96,hb:150,sx:300,sy:236,sw:150,ax:58,aw:322,wy:282,wh:120,my:442,mh:100,ty:560}
             :{rx:20,ry:34,hx:20,hy:76,gx:104,hb:184,sx:130,sy:350,sw:196,ax:330,aw:370,wy:38,wh:128,my:212,mh:116,ty:346};
    const w=aaWk(t),p=phaseOf(AA_STEPS,t),P=AA_STEPS[p],after=ramp(w,30,60);
    let s='';
    /* readout */
    const lab=w<=30?`${AA_LBL.wk} ${Math.round(w)}`:`${AA_LBL.yr} ${(w/52).toFixed(1)}`;
    s+=`<text x="${L.rx}" y="${L.ry}" class="t-big" style="font-size:24px">${lab}</text><text x="${L.rx}" y="${L.ry+18}" class="t-sm" style="fill:var(--ink)">${P.k} · ${f1(wt(w))} kg</text>`;
    /* hormone markers (schematic counts) */
    const lossOn=ramp(w,2,12);
    const HR=[{k:'leptin',n:AA_LBL.lep,c:Math.round(6-3*lossOn),dir:lossOn>.3?'▼':''},{k:'pyy',n:AA_LBL.pyy,c:Math.round(5-2*lossOn),dir:lossOn>.3?'▼':''},{k:'ghrelin',n:AA_LBL.ghr,c:Math.round(3+3*lossOn),dir:lossOn>.3?'▲':''}];
    HR.forEach((h,i)=>{const y=L.hy+i*26;s+=`<text x="${L.hx}" y="${y+4}" class="t-xs" style="fill:var(--ink)">${h.n} ${h.dir}</text>`;
      for(let j=0;j<h.c;j++)s+=hormoneDot(L.gx+j*15,y,h.k,{r:5});});
    const hun=lerp(.35,.85,ramp(w,4,40));
    s+=`<text x="${L.hx}" y="${L.hb}" class="t-xs" style="fill:var(--ink)">${AA_LBL.hunger}</text><rect x="${L.hx}" y="${L.hb+6}" width="${N?180:200}" height="10" rx="3" style="fill:var(--panel-2)"/><rect x="${L.hx}" y="${L.hb+6}" width="${f1((N?180:200)*hun)}" height="10" rx="3" style="fill:var(--ghrelin)"/>`;
    /* see-saw: positive tilt = energy out heavier */
    const tilt=w<30?lerp(0,.75,ramp(w,0,3)):lerp(.75,-.6,ramp(w,30,50))*(1-ramp(w,120,312))+(-.18)*ramp(w,120,312);
    const lw=w<30?.4:lerp(.4,.9,after),rw=w<30?.9:lerp(.9,.55,ramp(w,30,80));
    s+=seesaw(L.sx,L.sy,L.sw,{tilt,lw,rw,left:AA_LBL.inn,right:AA_LBL.out}).svg;
    /* charts */
    const X=tt=>L.ax+L.aw*tt;
    const panel=(y,h,y0,y1,yt,ttl)=>{const Y=v=>y+h-h*(v-y0)/(y1-y0);let q=`<rect x="${L.ax}" y="${y}" width="${L.aw}" height="${h}" style="fill:var(--field)"/>`;
      TK.forEach(k=>{q+=`<line x1="${f1(X(aaTOf(k.w)))}" x2="${f1(X(aaTOf(k.w)))}" y1="${y}" y2="${y+h}" class="grid"/>`});
      yt.forEach(v=>{q+=`<line x1="${L.ax}" x2="${L.ax+L.aw}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/><text x="${L.ax-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}</text>`});
      q+=`<line x1="${L.ax}" x2="${L.ax+L.aw}" y1="${f1(Y(0))}" y2="${f1(Y(0))}" class="axis"/><text x="${L.ax}" y="${y-7}" class="t-xs" style="fill:var(--ink);font-weight:700">${ttl}</text>`;
      return {q,Y}};
    const curve=(f,Y,t1)=>{let d='';const n=Math.max(2,Math.round(200*t1));for(let i=0;i<=n;i++){const tt=t1*i/n;d+=(i?'L':'M')+f1(X(tt))+' '+f1(Y(f(aaWk(tt))))}return d};
    const A=panel(L.wy,L.wh,-65,5,[0,-30,-60],AA_LBL.w);s+=A.q;
    s+=`<path d="${curve(wt,A.Y,1)}" style="fill:none;stroke:var(--figure-line);stroke-width:1.4;stroke-dasharray:3 4;opacity:.6"/><path d="${curve(wt,A.Y,t)}" style="fill:none;stroke:var(--brand);stroke-width:3;stroke-linejoin:round"/>`;
    AA_W.forEach(q=>{const on=w>=q[0];s+=`<circle cx="${f1(X(aaTOf(q[0])))}" cy="${f1(A.Y(q[1]))}" r="4" style="fill:${on?'var(--brand)':'var(--panel)'};stroke:var(--brand);stroke-width:1.6"/>`});
    if(w>=30)s+=kitLabel(X(aaTOf(30))+6,A.Y(-58.3)+4,'−58.3 kg',{});
    if(w>=AA_END-1)s+=kitLabel(X(1)-4,A.Y(-48),'41.0 of 58.3 kg regained',{a:'e'});
    const B=panel(L.my,L.mh,-800,50,[0,-400,-800],AA_LBL.ma);s+=B.q;
    s+=`<path d="${curve(MA,B.Y,1)}" style="fill:none;stroke:var(--figure-line);stroke-width:1.4;stroke-dasharray:3 4;opacity:.6"/><path d="${curve(MA,B.Y,t)}" style="fill:none;stroke:var(--accent);stroke-width:3;stroke-linejoin:round"/>`;
    AA_MA.forEach(q=>{const on=w>=q[0];s+=`<circle cx="${f1(X(aaTOf(q[0])))}" cy="${f1(B.Y(q[1]))}" r="4" style="fill:${on?'var(--accent)':'var(--panel)'};stroke:var(--accent);stroke-width:1.6"/>`});
    AA_RMR.forEach(q=>{const on=w>=q[0];s+=`<rect x="${f1(X(aaTOf(q[0]))-4)}" y="${f1(B.Y(q[1])-4)}" width="8" height="8" style="fill:${on?'var(--ink)':'var(--panel)'};stroke:var(--ink);stroke-width:1.4"/>`});
    if(w>=30)s+=kitLabel(X(aaTOf(30))+8,B.Y(-504)-6,'−504',{})+kitLabel(X(aaTOf(30))+8,B.Y(-610)+12,'−610 '+(N?'RMR':AA_LBL.rmr),{});
    if(w>=AA_END-1)s+=kitLabel(X(1)-8,B.Y(-499)-6,'−499',{a:'e'})+kitLabel(X(1)-8,B.Y(-704)+14,'−704',{a:'e'});
    /* now line and ticks */
    s+=`<line x1="${f1(X(t))}" x2="${f1(X(t))}" y1="${L.wy-2}" y2="${L.my+L.mh+2}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:4 3"/>`;
    TK.forEach(k=>{if(N&&(k.w===10||k.w===20))return;const x=X(aaTOf(k.w)),last=k.w===AA_END;s+=`<text x="${f1(last?x+2:x)}" y="${L.ty}" class="t-xs ${last?'t-end':'t-mid'}">${k.l}</text>`});
    s+=`<text x="${L.ax+L.aw}" y="${L.ty+16}" class="t-xs t-end">${AA_LBL.x}</text>`;
    svg.innerHTML=s;
    setSt(p);$('#aaNote').innerHTML=noteHTML(P);
  }
  const stop=playWire(rg,$('#aaPlay'),draw,22000,'%t:player.replay%','adaptation');
  const setSt=stepWire($('#aaSteps'),AA_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- Sumithran comparator ---------- */
  const hs=$('#aaHSvg'),hb=$('#aaHBtns'),hn=$('#aaHNote');let hi=0,grow=1,stopH=null;
  hb.innerHTML=AA_H.map((h,i)=>`<button class="btn" data-h="${i}" aria-pressed="${i===0}">${h.n}</button>`).join('');
  function drawH(){
    const N=vb(hs,'720 300','400 580'),H=AA_H[hi];
    const L=N?{bx:40,by:56,bh:170,bw:70,gap:40,gx:16,gy:330,rh:26,c1:250,c2:330}:{bx:50,by:56,bh:180,bw:70,gap:30,gx:400,gy:44,rh:27,c1:600,c2:672};
    const base=L.by+L.bh;let s='';
    s+=`<text x="${N?16:20}" y="26" class="t-big">${H.n}</text>`;
    if(H.kind)s+=hormoneDot(N?16+H.n.length*9.5+16:20+H.n.length*9.5+16,21,H.kind,{r:6});
    s+=`<text x="${N?16:20}" y="44" class="t-xs">${AA_HT.dir}</text>`;
    s+=`<line x1="${L.bx-10}" x2="${L.bx+3*L.bw+2*L.gap+10}" y1="${base}" y2="${base}" class="axis"/>`;
    const lv=[1,1+H.d[0]*.42*grow,H.d[1]?1+H.d[1]*.32*grow:null],nm=[AA_HT.base,AA_HT.w10,AA_HT.w62],unit=L.bh/1.55;
    const ref=base-unit;
    s+=`<line x1="${L.bx-10}" x2="${L.bx+3*L.bw+2*L.gap+10}" y1="${f1(ref)}" y2="${f1(ref)}" style="stroke:var(--ink);stroke-width:1;stroke-dasharray:4 3;opacity:.5"/>`;
    lv.forEach((v,i)=>{const x=L.bx+i*(L.bw+L.gap);
      if(v==null){s+=`<rect x="${x}" y="${f1(ref)}" width="${L.bw}" height="${f1(unit)}" rx="4" style="fill:none;stroke:var(--muted);stroke-width:1.4;stroke-dasharray:4 3"/><text x="${x+L.bw/2}" y="${f1(ref-8)}" class="t-xs t-mid">?</text>`}
      else{const h=unit*v,col=i===0?'var(--figure)':H.d[0]>0?'var(--ghrelin)':'var(--glp1)';
        s+=`<rect x="${x}" y="${f1(base-h)}" width="${L.bw}" height="${f1(h)}" rx="4" style="fill:${col}"/>`;
        if(i>0)s+=`<text x="${x+L.bw/2}" y="${f1(base-h-8)}" class="t-lbl t-mid">${(i===1?H.d[0]:H.d[1])>0?'▲':'▼'}</text>`}
      s+=`<text x="${x+L.bw/2}" y="${base+16}" class="t-xs t-mid" style="fill:var(--ink)">${nm[i]}</text>`});
    s+=`<text x="${L.bx+2*(L.bw+L.gap)+L.bw/2}" y="${base+30}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">${H.d[1]?H.p:AA_HT.np}</text>`;
    /* grid of all measures */
    s+=`<text x="${L.gx}" y="${L.gy-6}" class="t-xs" style="fill:var(--ink);font-weight:700">${AA_HT.grid}</text><text x="${L.c1}" y="${L.gy-6}" class="t-xs t-mid">${AA_HT.w10}</text><text x="${L.c2}" y="${L.gy-6}" class="t-xs t-mid">${AA_HT.w62}</text>`;
    AA_H.forEach((h,i)=>{const y=L.gy+i*L.rh,sel=i===hi;
      s+=`<rect x="${L.gx}" y="${y}" width="${L.c2+36-L.gx}" height="${L.rh-3}" rx="5" style="fill:${sel?'var(--brand-soft)':'var(--panel-2)'};${sel?'stroke:var(--brand);stroke-width:1.2':''}"/>`;
      s+=`<text x="${L.gx+8}" y="${y+16}" class="t-sm" style="fill:var(--ink);font-weight:${sel?700:500}">${h.n}</text>`;
      const ar=d=>d>0?'▲':d<0?'▼':'–';
      s+=`<text x="${L.c1}" y="${y+16}" class="t-sm t-mid" style="fill:var(--ink)">${ar(h.d[0])}</text><text x="${L.c2}" y="${y+16}" class="t-sm t-mid" style="fill:var(--ink)">${ar(h.d[1])}</text>`});
    hs.innerHTML=s;
    hn.innerHTML=`<div class="kicker">${H.d[0]>0?'Rose':'Fell'} with weight loss</div><h4>${H.n}: ${H.d[1]?'still '+(H.d[1]>0?'higher':'lower')+' a year later':'changed at 10 weeks'}</h4><p>${H.txt}</p>`;
  }
  hb.addEventListener('click',e=>{const b=e.target.closest('[data-h]');if(!b)return;hi=+b.dataset.h;$$('[data-h]',hb).forEach(x=>x.setAttribute('aria-pressed',x===b));
    stopH&&stopH();stopH=animate(600,q=>{grow=ease(q);drawH()},()=>{stopH=null;grow=1;drawH()})});
  drawH();
  const pr=redraws.adaptation;redraws.adaptation=()=>{pr&&pr();drawH()};
};
