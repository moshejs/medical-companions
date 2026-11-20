/* =============== 2.2 Fatty liver disease (MASLD & MASH) =============== */
inits.masld=()=>{
  const T=(x,y,s,c='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${s}</text>`;
  const MEAS={a:{n:'Death or liver transplant, hazard ratio vs F0',v:[1,1.88,2.89,3.76,10.9],max:12,ref:'Angulo 2015, 619 people'},
              d:{n:'Liver-related death, mortality rate ratio vs F0',v:[1,1.41,9.57,16.69,42.30],max:46,ref:'Dulai 2017, 1,495 people'}};
  let meas='a';
  const STEPS=[
    {from:0,at:.07,k:'Before the fat',t:'Metabolic risk builds',
     txt:`MASLD needs fat in the liver plus at least 1 of 5 cardiometabolic risk factors. The paper names body-mass index, waist circumference, blood pressure and HDL cholesterol among them. Type 2 diabetes is a strong link: 55.5% of people with type 2 diabetes had NAFLD in a meta-analysis of 80 studies. [[Rinella2023MASLD,Younossi2019T2D]]`,
     pt:`Things like a large waist, high blood pressure, high blood sugar and low "good" cholesterol make fat build up in the liver.`,
     hook:`MASLD = steatosis + ≥1 of 5 cardiometabolic criteria. [[Rinella2023MASLD]]`},
    {from:.15,at:.27,k:'Steatotic liver disease',t:'Fat builds up: MASLD',
     txt:`"Steatotic liver disease" (SLD) is the umbrella term; with a cardiometabolic risk factor it is metabolic dysfunction-associated steatotic liver disease (MASLD), formerly NAFLD. Global prevalence in 92 population studies was 30.05%, rising from 25.26% (1990–2006) to 38.00% (2016–2019). It was highest in Latin America (44.37%). [[Rinella2023MASLD,Younossi2023Hepatology]]`,
     pt:`About 3 in 10 adults worldwide have extra fat in the liver linked to metabolism, and the number is growing.`,
     hook:`Global MASLD/NAFLD prevalence ≈ 30% (30.05%), up from 25% to 38% over three decades. [[Younossi2023Hepatology]]`},
    {from:.35,at:.45,k:'Inflammation',t:'MASH: steatohepatitis',
     txt:`MASLD with inflammation and liver-cell injury is called MASH, formerly NASH. A 2015 review estimated NAFLD in about 30% and NASH in about 5% of the US population. On paired biopsies, fibrosis advanced about one stage every 14.3 years in simple steatosis but every 7.1 years in NASH. [[Rinella2023MASLD,Rinella2015JAMA,Singh2015]]`,
     pt:`In some people the fatty liver becomes inflamed. This speeds up scarring.`,
     hook:`Fibrosis progression: about 1 stage per 14.3 years (steatosis) vs 7.1 years (steatohepatitis). [[Singh2015]]`},
    {from:.52,at:.63,k:'Scar',t:'Fibrosis: the stage that predicts the future',
     txt:`In 619 people followed for a median 12.6 years, fibrosis stage, "but no other histologic features", predicted death or transplant. Over follow-up of paired biopsies, 33.6% of people progressed, 43.1% were stable and 22.3% improved. Press the buttons above the stepper to switch between all deaths and liver-related deaths. [[Angulo2015,Singh2015]]`,
     pt:`What matters most for the future is how much scar the liver has, not how much fat it holds.`,
     hook:`In MASLD, fibrosis stage, not inflammation activity, is the strongest predictor of death. [[Angulo2015,Dulai2017]]`},
    {from:.72,at:.81,k:'Stage F4',t:'Cirrhosis',
     txt:`At F4 the hazard of death or transplant was 10.9 times that at F0, and liver-related events 51.5 times. In a meta-analysis of 5 cohorts, liver-related mortality was 42.30 times that at F0. In the NASH CRN cohort, hepatic encephalopathy occurred at 2.39 and ascites at 1.20 per 100 person-years at F4, against 0.02 and 0.04 at F0–F2. [[Angulo2015,Dulai2017,Sanyal2021NAFLD]]`,
     pt:`Once scarring reaches cirrhosis, the risk of serious liver problems climbs steeply.`,
     hook:`Liver-related mortality rate ratio vs F0: F2 9.57, F3 16.69, F4 42.30. [[Dulai2017]]`},
    {from:.88,at:.95,k:'Two causes at once',t:'MetALD and the other names',
     txt:`MetALD is MASLD plus greater alcohol intake: 140–350 g a week for women and 210–420 g a week for men, with a continuum of how much each cause contributes. Steatosis with no metabolic risk factor and no known cause is "cryptogenic" SLD. Most people with alcohol-related liver disease also have cardiometabolic risk factors. [[Rinella2023MASLD]]`,
     pt:`Some people have both a metabolic cause and a drinking cause. The new name MetALD covers that overlap.`,
     hook:`MetALD = MASLD + 140–350 g/week (women) or 210–420 g/week (men) of alcohol. [[Rinella2023MASLD]]`}];
  const svg=$('#maSvg'),rg=$('#maT');let setSt=()=>{};
  function draw(t){
    const N=vb(svg,'720 380','400 560');const p=phaseOf(STEPS,t);
    const risk=ramp(t,0,.12),fat=ramp(t,.14,.3),hurt=ramp(t,.35,.48),fib=4*ease(ramp(t,.5,.8));
    let s='';
    const L=N?{x:200,y:88,s:1.1}:{x:172,y:112,s:1.35};
    s+=liver(L.x,L.y,L.s,{fib,seed:21}).svg;
    if(fat>.05){const r=rng(9);for(let i=0;i<30;i++){const d=r(),px=L.x+(r()*150-80)*L.s*.8,py=L.y+(r()*70-40)*L.s*.8;s+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="${f1((1.4+2.6*d)*L.s*fat)}" style="fill:var(--accent-soft);stroke:var(--bile);stroke-width:.6;opacity:${f1(.85*fat)}"/>`}}
    s+=T(L.x,N?26:28,['Liver at risk','MASLD','MASH','Fibrosis F'+Math.min(3,Math.max(1,Math.round(fib))),'Cirrhosis (F4)','MetALD: alcohol on top'][p],'t-lbl t-mid');
    const cy=N?208:286,cx=N?[110,200,290]:[92,172,252],cs=N?48:56;
    cx.forEach((x,i)=>{const h=clamp(hurt*(.55+i*.25));s+=hepatocyte(x,cy,cs,{fat:clamp(fat*(1.1-i*.1)),hurt:h,seed:7+i});
      if(h>.3)for(let k=0;k<3;k++){const a=k*2.1+i;s+=`<circle cx="${f1(x+Math.cos(a)*cs*.62)}" cy="${f1(cy+Math.sin(a)*cs*.5)}" r="3" style="fill:var(--nh3-fill);opacity:${f1(h)}"/>`}});
    if(fib>1)s+=collagen(cx[0]+cs*.45,cy+cs*.42,cx[2]-cs*.45,cy+cs*.42,{op:ramp(fib,1,3),amp:2.5});
    s+=T(cx[1],cy+cs*.62+14,'magnified liver cells','t-xs t-mid');
    /* risk badges around the liver */
    const RB=[['waist','var(--accent)'],['blood pressure','var(--bad)'],['blood sugar','var(--nh3)'],['HDL cholesterol','var(--portal)']];
    RB.forEach(([n,c],i)=>{const v=ramp(risk,i*.2,i*.2+.4);if(v<=0)return;const w=n.length*5.8+16,row=i>>1,pair=RB.slice(row*2,row*2+2).map(r=>r[0].length*5.8+16),tot=pair[0]+pair[1]+8,x0=L.x-tot/2+(i%2?pair[0]+8:0),y0=(N?L.y+62:L.y+78)+row*19;
      s+=`<g style="opacity:${f1(v)}"><rect x="${f1(x0)}" y="${f1(y0)}" width="${f1(w)}" height="16" rx="8" style="fill:var(--panel-2);stroke:${c};stroke-width:1.2"/>`+T(x0+w/2,y0+11.5,n,'t-xs t-mid','fill:var(--ink)')+'</g>'});
    /* right-hand panel */
    const R=N?{x:20,y:276,w:360,h:270}:{x:372,y:30,w:330,h:330};
    if(p===0){s+=T(R.x+R.w/2,R.y+14,'MASLD needs steatosis plus ≥ 1 of 5','t-sm t-mid','fill:var(--ink)')+T(R.x+R.w/2,R.y+30,'cardiometabolic risk factors','t-sm t-mid','fill:var(--ink)');
      const ab=abdomen(R.x+R.w/2,R.y+48,N?.95:1.05,{liver:true,fib:0});s+=ab.svg;
      s+=T(R.x+R.w/2,R.y+(N?262:290),'In type 2 diabetes: 55.5% had NAFLD','t-sm t-mid','fill:var(--nh3)');}
    else if(p<=2){const n=Math.round(30*ease(ramp(t,.16,.27)));const ox=R.x+(N?42:30),dx=N?28:28,dy=N?22:26,ps=N?17:20;
      s+=T(R.x+R.w/2,R.y+14,'100 adults worldwide','t-sm t-mid','fill:var(--ink)');
      for(let i=0;i<100;i++){const r=Math.floor(i/10),c=i%10;s+=person(ox+c*dx,R.y+28+r*dy,ps,i<n?(p===2&&i<5?'var(--liver)':'var(--bile)'):'var(--muted)',{op:i<n?1:.3})}
      s+=T(R.x+R.w/2,R.y+28+10*dy+14,p===2?'about 30 with MASLD; in the US about 5 in 100 have MASH (red)':`${n} of 100 with MASLD (30.05%)`,'t-xs t-mid','fill:var(--ink)');}
    else if(p<=4){const M=MEAS[meas],B={x:R.x+34,y:R.y+40,w:R.w-50,h:R.h-90};const bw=B.w/5*.62,lit=p===3?Math.min(3,Math.max(1,Math.round(fib))):4;
      s+=T(R.x+R.w/2,R.y+14,M.n,'t-sm t-mid','fill:var(--ink)')+T(R.x+R.w/2,R.y+28,M.ref,'t-xs t-mid');
      s+=`<line x1="${B.x}" x2="${B.x+B.w}" y1="${B.y+B.h}" y2="${B.y+B.h}" class="axis"/>`;
      const Yb=v=>B.y+B.h-B.h*v/M.max;s+=`<line x1="${B.x}" x2="${B.x+B.w}" y1="${f1(Yb(1))}" y2="${f1(Yb(1))}" class="grid"/>`+T(B.x-4,Yb(1)+3,'1','t-xs t-end');
      M.v.forEach((v,i)=>{const on=i<=lit,x=B.x+i*B.w/5+(B.w/5-bw)/2,h=B.h*v/M.max*(i<4?ease(ramp(t,.52+i*.03,.6+i*.03)):ease(ramp(t,.72,.78)));
        if(on){s+=`<rect x="${f1(x)}" y="${f1(B.y+B.h-h)}" width="${f1(bw)}" height="${f1(h)}" rx="3" style="fill:${i===4?'var(--liver)':'var(--scar-line)'}"/>`+T(x+bw/2,B.y+B.h-h-6,v,'t-sm t-mid','fill:var(--ink);font-weight:700')}
        s+=T(x+bw/2,B.y+B.h+15,'F'+i,'t-sm t-mid',on?'fill:var(--ink)':'')});}
    else{const cx0=R.x+R.w/2,y0=R.y+16;const node=(x,y,w,l1,l2,col)=>`<rect x="${f1(x-w/2)}" y="${f1(y)}" width="${f1(w)}" height="40" rx="9" style="fill:var(--panel);stroke:${col};stroke-width:1.8"/>`+T(x,y+17,l1,'t-sm t-mid','fill:var(--ink);font-weight:700')+T(x,y+31,l2,'t-xs t-mid');
      const g=ease(ramp(t,.88,.94));s+=`<g style="opacity:${f1(.3+.7*g)}">`;
      s+=node(cx0,y0,200,'Steatotic liver disease','SLD: the umbrella','var(--muted)');
      const kids=[[cx0-R.w*.33,'MASLD','+ metabolic risk','var(--bile)'],[cx0,'MetALD','MASLD + alcohol','var(--liver)'],[cx0+R.w*.33,'Cryptogenic','no known cause','var(--muted)']];
      kids.forEach(([x,a,b,c])=>{s+=`<path d="M${f1(cx0)} ${y0+40}V${y0+62}H${f1(x)}V${y0+84}" style="fill:none;stroke:var(--line);stroke-width:1.5"/>`+node(x,y0+84,R.w*.31,a,b,c)});
      s+=`<path d="M${f1(kids[0][0])} ${y0+124}V${y0+150}" style="stroke:var(--line);stroke-width:1.5"/>`+node(kids[0][0],y0+150,R.w*.31,'MASH','steatohepatitis','var(--liver)');
      s+=`<rect x="${f1(cx0-R.w*.1)}" y="${y0+154}" width="${f1(R.w*.6)}" height="70" rx="9" style="fill:var(--liver-soft)"/>`;
      ['MetALD alcohol band:','women 140–350 g a week','men 210–420 g a week'].forEach((l,i)=>{if(l)s+=T(cx0+R.w*.2,y0+174+i*17,l,'t-sm t-mid','fill:var(--liver)')});
      s+='</g>';}
    svg.innerHTML=s;
    $('#maNote').innerHTML=noteHTML(STEPS[p]);setSt(p);
    $('#maRead').innerHTML=`<span>Fat: <b>${Math.round(fat*100)}%</b> (schematic)</span><span>Inflammation: <b>${hurt>.5?'yes':'no'}</b></span><span>Scar stage: <b>F${Math.round(fib)}</b></span>`;
  }
  const stop=playWire(rg,$('#maPlay'),draw,24000,'Replay','masld');
  setSt=stepWire($('#maSteps'),STEPS,rg,draw,stop);draw(+rg.value);
  $$('[data-mameas]').forEach(b=>b.addEventListener('click',()=>{meas=b.dataset.mameas;$$('[data-mameas]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));

  /* ---------- naming tool ---------- */
  const q={st:1,cm:1,al:0};
  function name(){let h;
    if(!q.st)h=['maybe','Not steatotic liver disease','Without fat in the liver, none of these names applies. Other causes of liver disease are covered in parts 2.1 to 2.4.'];
    else if(q.cm&&!q.al)h=['yes','MASLD','Steatosis with at least one cardiometabolic risk factor and little or no alcohol. With inflammation and liver-cell injury on biopsy it is MASH.'];
    else if(q.cm&&q.al)h=['maybe','MetALD','MASLD plus 140–350 g of alcohol a week (women) or 210–420 g (men). Each cause may contribute more or less: the paper describes a continuum.'];
    else if(!q.cm&&!q.al)h=['maybe','Cryptogenic steatotic liver disease','Steatosis with no metabolic risk factor and no known cause.'];
    else h=['no','Neither MASLD nor MetALD','Both need at least one cardiometabolic risk factor. With fat in the liver and this much alcohol, alcohol-related liver disease is the cause to think about: see 2.1.'];
    $('#maName').className='verdict '+h[0];$('#maName').innerHTML=`<b>${h[1]}</b>${h[2]} [[Rinella2023MASLD]]`;}
  $$('[data-maq]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.maq;q[k]=+b.dataset.v;$$(`[data-maq="${k}"]`).forEach(x=>x.setAttribute('aria-pressed',x===b));name()}));
  name();

  /* ---------- weight loss bands ---------- */
  const ws=$('#maWl'),wr=$('#maWlT');
  const BAND=[
    {k:'Under 5% weight loss',t:'The whole programme',txt:`Across all 293 participants, whatever their weight loss, 25% had NASH resolution and 19% had fibrosis regression after 52 weeks. Only 30% of participants reached 5% or more. Results for the under-5% group alone are not given here. [[VilarGomez2015]]`,
      pt:`Losing weight is hard, and most people in the programme lost less than 5%. Small changes still count toward heart health.`,res:25,reg:19,regLab:'19%',lab:'all participants'},
    {k:'5% or more',t:'NASH resolved in more than half',txt:`With at least 5% weight loss, NASH resolved in 58%. For an 80 kg person, 5% is 4 kg. The paper reports fibrosis regression for this band only as part of the overall result. [[VilarGomez2015]]`,
      pt:`Losing about 1 in every 20 kg of body weight calmed the liver inflammation in more than half of people.`,hook:`≥5% weight loss: NASH resolution in 58%. [[VilarGomez2015]]`,res:58,reg:null,lab:'≥5% loss'},
    {k:'10% or more',t:'Inflammation resolved in 9 in 10',txt:`Everyone who lost at least 10% of body weight had a lower NAFLD activity score: 90% had NASH resolution and 45% had fibrosis regression. EASL–EASD–EASO 2024 also names incretin-based medicines and bariatric surgery where they are indicated for diabetes or obesity. [[VilarGomez2015,EASL2024MASLD]]`,
      pt:`Losing about 1 in every 10 kg of body weight calmed inflammation in 9 in 10 people and reduced scarring in almost half.`,hook:`≥10% weight loss: NASH resolution 90%, fibrosis regression 45%. [[VilarGomez2015]]`,res:90,reg:45,regLab:'45%',lab:'≥10% loss'}];
  function drawWl(t){
    const N=vb(ws,'720 300','400 520');const wl=t*12,b=wl<5?0:wl<10?1:2,B=BAND[b];let s='';
    /* body outline slims */
    const bx=N?110:110,by=N?30:40,sc=N?.95:1.05,wid=1-wl/12*.22;
    s+=`<g transform="translate(${f1(bx)} ${f1(by)}) scale(${f1(wid*sc)} ${f1(sc)}) translate(${f1(-bx)} ${f1(-by)})">`+abdomen(bx,by,1,{liver:false}).svg+'</g>';
    const lv=liver(bx-4,by+92*sc,.48*sc,{fib:b===2?1:1.6,gb:false,seed:3});s+=lv.svg;
    const f=clamp(1-wl/12*.85);const r=rng(4);for(let i=0;i<14;i++){s+=`<circle cx="${f1(bx-4+(r()*70-38)*sc)}" cy="${f1(by+92*sc+(r()*30-18)*sc)}" r="${f1((1+r()*2.4)*f*sc*1.4)}" style="fill:var(--accent-soft);stroke:var(--bile);stroke-width:.6"/>`}
    s+=T(bx,by+248*sc,`${wl.toFixed(1)}% of body weight lost`,'t-sm t-mid','fill:var(--ink);font-weight:700');
    /* bars */
    const G=N?{x:40,y:330,w:320,h:150}:{x:270,y:40,w:410,h:200};
    s+=T(G.x,G.y-14,`Band: ${B.lab}`,'t-sm','fill:var(--ink);font-weight:700');
    [['NASH resolution',B.res,'var(--rx)',B.res+'%'],['Fibrosis regression',B.reg,'var(--scar-line)',B.reg==null?'not reported for this band':B.regLab]].forEach(([n,v,c,l],i)=>{const y=G.y+10+i*(G.h/2);
      s+=T(G.x,y,n,'t-sm','fill:var(--ink)')+`<rect x="${G.x}" y="${y+8}" width="${G.w}" height="26" rx="6" style="fill:var(--panel-2)"/>`;
      if(v!=null)s+=`<rect x="${G.x}" y="${y+8}" width="${f1(G.w*v/100)}" height="26" rx="6" style="fill:${c}"/>`;
      s+=T(v!=null&&v>70?G.x+G.w*v/100-8:G.x+(v||0)*G.w/100+8,y+26,l,'t-sm'+(v!=null&&v>70?' t-end':''),v!=null&&v>70?'fill:var(--panel);font-weight:700':'fill:var(--ink);font-weight:700')});
    /* band ticks */
    const TX=v=>G.x+G.w*v/12;s+=`<line x1="${G.x}" x2="${G.x+G.w}" y1="${G.y+G.h+18}" y2="${G.y+G.h+18}" class="axis"/>`;
    [0,5,10,12].forEach(v=>{s+=`<line x1="${f1(TX(v))}" x2="${f1(TX(v))}" y1="${G.y+G.h+14}" y2="${G.y+G.h+22}" class="axis"/>`+T(TX(v),G.y+G.h+34,v+'%','t-xs t-mid')});
    s+=`<circle cx="${f1(TX(wl))}" cy="${G.y+G.h+18}" r="6" style="fill:var(--liver)"/>`;
    ws.innerHTML=s;$('#maWlNote').innerHTML=noteHTML(B);
  }
  playWire(wr,$('#maWlPlay'),drawWl,8000,'Replay','masld');drawWl(+wr.value);
};
