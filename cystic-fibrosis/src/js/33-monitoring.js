/* =============== 3.3 Lung function & monitoring =============== */
/* Main scrubber: one forced exhalation drawn live with the kit's spiro() as a volume–time curve and a
   flow–volume curve, lungs emptying beside them; then percent predicted, then an obstructed (scooped)
   blow over a dashed ghost of the first. The curve shapes are drawing proportions, and the litres in the
   percent-predicted panel are made-up numbers for the arithmetic, labelled as such on screen. */
const MO_STEPS=[
 {from:0,at:.1,k:'Step 1 · get ready',t:'Breathe all the way in',sub:'sitting up, nose clip on, lips sealed',short:'Breathe in',
  txt:`Spirometry asks for the biggest breath in that a person can take, then the hardest and longest blow out. ATS and ERS updated the technical standards for doing it in 2019, and their interpretation standards (reference equations, limits of normal, severity) in 2022. [[Graham2019,Stanojevic2022]] It needs practice and cooperation: in the Wisconsin cohort, serial spirometry was not reliable with acceptable quality until after age 7, and chest radiograph scoring picked up disease earlier. [[Farrell2003PP]]`,
  pt:`Spirometry measures how much air you can blow out, and how fast. It is a breathing test, not a scan or a needle. [[Quanjer2012,Bowerman2023]]`,
  hook:`Spirometry is hard to do reliably in young children: in Wisconsin, not until after age 7. [[Farrell2003PP]]`},
 {from:.2,at:.3,k:'Step 2 · the first second',t:'Blast out: FEV1',sub:'the volume blown out in the first second',short:'FEV1',
  txt:`FEV1, the forced expiratory volume in one second, is the established marker of progression in CF lung disease and has been the key endpoint in pivotal trials. For 50 years its decline has been linked to death, exacerbations, hospital stays and <i>P. aeruginosa</i> infection. [[Szczesniak2017]] On the flow–volume curve the first second is the steep part: flow peaks almost at once and then falls.`,
  pt:`FEV1 is how much air you can blow out in one second. [[Quanjer2012,Bowerman2023]]`,
  hook:`FEV1 is the key lung-function endpoint in CF trials and the established marker of progression. [[Szczesniak2017]]`},
 {from:.4,at:.54,k:'Step 3 · keep going',t:'Keep blowing: FVC',sub:'everything that can be blown out',short:'FVC',
  txt:`The blow continues until no more air comes out. The total is the forced vital capacity (FVC), and the share of it blown out in the first second, FEV1/FVC, tells an obstructive pattern from a restrictive one. Both are defined and quality-graded by the ATS/ERS standards. [[Graham2019,Stanojevic2022]] Here the volume–time curve flattens toward FVC while the flow–volume curve runs down to zero flow.`,
  pt:`FVC is all the air you can blow out after a full breath in, however long it takes.`,
  hook:`Two pictures of one blow: volume against time (FEV1 at 1 s, FVC at the plateau) and flow against volume (peak flow, then the fall).`},
 {from:.6,at:.7,k:'Step 4 · compare',t:'Percent predicted',sub:'the result as a share of a healthy reference',short:'% predicted',
  txt:`A measured FEV1 is compared with what is predicted for a healthy person of the same age, sex and height. The GLI 2012 equations for ages 3–95 were built from 97,759 records of healthy non-smokers. [[Quanjer2012]] CF studies once used Wang equations in childhood and Hankinson in adulthood, which created a jump in percent predicted at the switch; GLI equations avoid it and also give z-scores. [[Szczesniak2017]] GLI Global (2022) needs no race or ethnicity input, and the 2023 ATS statement names it as the recommended equation, with a caution about uncertain effects. [[Bowerman2023,Bhakta2023]]`,
  pt:`Your FEV1 is compared with healthy people of the same age, sex and height. 100% means the same as the average; 80% means four-fifths of it. [[Quanjer2012,Bowerman2023]]`,
  hook:`GLI 2012: 97,759 healthy records, ages 3–95. GLI Global is race-neutral and recommended by the ATS (2023). [[Quanjer2012,Bhakta2023]]`},
 {from:.8,at:.92,k:'Step 5 · in CF',t:'Narrowed airways: a scooped curve',sub:'air leaves more slowly, FEV1 falls first',short:'Obstruction',
  txt:`When mucus and inflammation narrow the airways, air leaves more slowly: the volume–time curve rises less steeply, FEV1 falls more than FVC and the flow–volume curve becomes scooped (drawn here over a dashed ghost of the first blow). In an epidemiologic cohort, mean FEV1 fell by 1.12 % predicted a year at ages 6–8, 2.39 at 9–12 and 2.34 at 13–17, and a high baseline was itself a risk factor for faster decline: clinicians "should not be reassured by high lung function". [[Konstan2007]] After an exacerbation treated with IV antibiotics, 25% of 8,479 exacerbations did not recover to 90% of baseline FEV1. [[Sanders2010]]`,
  pt:`In CF the airways can get narrower over time, so less air comes out in the first second. Regular tests catch a drop early, so it can be treated.`,
  hook:`25% of IV-treated exacerbations do not recover to baseline FEV1. [[Sanders2010]]`}
];
const MO_BANDS=[{lo:0,hi:40,lab:'severe <40%',col:'var(--bad)'},{lo:40,hi:70,lab:'moderate 40–69%',col:'var(--warn)'},{lo:70,hi:130,lab:'mild >70%',col:'var(--good)'}];
inits.monitoring=()=>{
  const svg=$('#moSvg'),rg=$('#moT'),note=$('#moNote'),rd=$('#moRead');
  let setSt=()=>{};
  const lastPath=str=>{const m=str.match(/<path d="([^"]+)"[^>]*\/>$/);return m?m[1]:''};
  function draw(t){const N=vb(svg,'720 400','400 640'),p=phaseOf(MO_STEPS,t),S=MO_STEPS[p];
    const L=N?{lu:{x:16,y:56,w:150,h:170},vt:{x:184,y:62,w:200,h:150},fv:{x:40,y:262,w:344,h:150},pp:{x:16,y:452,w:368,h:120},sy:618}
             :{lu:{x:16,y:56,w:170,h:236},vt:{x:226,y:70,w:220,h:190},fv:{x:484,y:70,w:220,h:190},pp:{x:16,y:304,w:688,h:56},sy:386};
    let s=`<text x="16" y="26" class="t-big" style="fill:var(--dx)">${S.t}</text><text x="16" y="42" class="t-sm">${S.sub}</text>`;
    /* blow parameters */
    const obs=ease(ramp(t,.8,.9)),ratio=lerp(.8,.55,obs),fvc=lerp(.86,.76,obs);
    const tau=-1/Math.log(1-ratio),Vf=sec=>(1-Math.exp(-sec/tau))/(1-Math.exp(-6/tau));
    let up;if(p===0)up=0;else if(p===1)up=ramp(t,.2,.36)/6;else if(p===2)up=1/6+(5/6)*ease(ramp(t,.4,.56));else if(p===3)up=1;else up=ramp(t,.8,.96);
    const sec=up*6,exh=up>0?Vf(sec):0,inh=p===0?ease(ramp(t,0,.15)):1;
    /* lungs */
    const LU=L.lu,ls=(N?.6:.72)*lerp(.74,1.1,inh*(1-exh*.9));
    s+=`<rect x="${LU.x}" y="${LU.y}" width="${LU.w}" height="${LU.h}" rx="12" style="fill:var(--panel);stroke:var(--line)"/>`;
    s+=lungs(LU.x+LU.w/2,LU.y+LU.h*.56,ls,{plugs:obs*.6,inflam:obs*.3,id:'moLg'}).svg;
    const air=p===0?'breathing in':up>=1?'blow finished':'blowing out';
    s+=`<text x="${LU.x+10}" y="${LU.y+18}" class="t-xs" style="fill:var(--ink);font-weight:600">${air}</text>`;
    if(p>0&&up<1){for(let i=0;i<4;i++){const u=(t*14+i/4)%1;s+=`<path d="M${f1(LU.x+LU.w-40+i*6)} ${f1(LU.y+30-u*14)}l3 -6" style="stroke:var(--dx);stroke-width:1.6;opacity:${f1(1-u)}"/>`}}
    if(p===0){for(let i=0;i<4;i++){const u=(t*14+i/4)%1;s+=`<path d="M${f1(LU.x+LU.w-40+i*6)} ${f1(LU.y+16+u*14)}l3 6" style="stroke:var(--rx);stroke-width:1.6;opacity:${f1(1-u)}"/>`}}
    /* the two curves */
    const VT=L.vt,FV=L.fv,col=obs>.05?'var(--bad)':'var(--dx)';
    const A=spiro(VT.x,VT.y,VT.w,VT.h,{mode:'vt',ratio,fvc,upto:up,col}),B=spiro(FV.x,FV.y,FV.w,FV.h,{mode:'fv',ratio,fvc,upto:exh,col});
    s+=A.svg+B.svg;
    if(obs>0){const g1=spiro(VT.x,VT.y,VT.w,VT.h,{mode:'vt',ratio:.8,fvc:.86,marks:false}),g2=spiro(FV.x,FV.y,FV.w,FV.h,{mode:'fv',ratio:.8,fvc:.86,marks:false});
      s+=`<g style="opacity:${f1(obs)}"><path d="${lastPath(g1.svg)}" style="fill:none;stroke:var(--muted);stroke-width:1.6;stroke-dasharray:4 4"/><path d="${lastPath(g2.svg)}" style="fill:none;stroke:var(--muted);stroke-width:1.6;stroke-dasharray:4 4"/></g>`;
      s+=`<text x="${FV.x+FV.w-4}" y="${FV.y+14}" class="t-xs t-end" style="opacity:${f1(obs)}">dashed: the first blow</text>`}
    s+=`<text x="${VT.x}" y="${VT.y-6}" class="t-xs" style="fill:var(--ink);font-weight:600">volume–time</text><text x="${FV.x}" y="${FV.y-6}" class="t-xs" style="fill:var(--ink);font-weight:600">flow–volume</text>`;
    if(up>0&&up<1){const pv=A.fvc;/* pen dot on vt */const X=VT.x+VT.w*up,Y=VT.y+VT.h-VT.h*fvc*Vf(sec);s+=`<circle cx="${f1(X)}" cy="${f1(Y)}" r="4.5" style="fill:${col};stroke:var(--panel);stroke-width:2"/>`}
    if(p>=1&&sec>=1&&p<3)s+=`<text x="${f1(A.fev1[0]+6)}" y="${f1(A.fev1[1]+26)}" class="t-xs" style="fill:var(--dx)">in 1 second</text>`;
    /* percent predicted */
    const P=L.pp,po=ramp(t,.6,.68);
    if(po<1)s+=`<rect x="${P.x}" y="${P.y}" width="${P.w}" height="${P.h}" rx="10" style="fill:none;stroke:var(--line);stroke-dasharray:4 4;opacity:${f1(1-po)}"/><text x="${P.x+P.w/2}" y="${P.y+P.h/2+4}" class="t-xs t-mid" style="opacity:${f1(1-po)}">step 4 compares the result with a healthy reference: percent predicted</text>`;
    if(po>0){const pred=3.0,meas=lerp(2.4,1.8,obs),pc=Math.round(meas/pred*100),bx=P.x+(N?110:150),bw=P.w-(N?170:430),sc=v=>bw*v/3.4;
      s+=`<g style="opacity:${f1(po)}"><rect x="${P.x}" y="${P.y}" width="${P.w}" height="${P.h}" rx="10" style="fill:var(--dx-soft)"/>`;
      [['predicted (GLI)',pred,'var(--muted)'],['measured FEV1',meas,col]].forEach((r,i)=>{const y=P.y+(N?14:8)+i*(N?26:22);
        s+=`<text x="${P.x+10}" y="${y+12}" class="t-xs" style="fill:var(--ink);font-weight:600">${r[0]}</text><rect x="${bx}" y="${y}" width="${f1(sc(r[1])*ease(po))}" height="16" rx="4" style="fill:${r[2]};opacity:.85"/><text x="${f1(bx+sc(r[1])+6)}" y="${y+12}" class="t-xs" style="fill:var(--ink)">${r[1].toFixed(1)} L</text>`});
      const tx=N?P.x+10:P.x+P.w-236,ty=N?P.y+P.h-34:P.y+24;
      s+=`<text x="${tx}" y="${ty}" class="t-lbl" style="fill:var(--dx)">${meas.toFixed(1)} / ${pred.toFixed(1)} L = ${pc}% predicted</text><text x="${tx}" y="${ty+16}" class="t-xs">made-up litres, to show the arithmetic</text></g>`}
    /* strip */
    const SW=N?368:688,sw=SW/5;MO_STEPS.forEach((q,j)=>{const on=j===p,xx=16+j*sw;s+=`<rect x="${f1(xx+1)}" y="${L.sy}" width="${f1(sw-2)}" height="6" rx="3" style="fill:${on?'var(--dx)':'var(--panel-2)'}"/><text x="${f1(xx+sw/2)}" y="${L.sy-6}" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:600':''}">${q.short}</text>`});
    s+=`<circle cx="${f1(16+SW*t)}" cy="${L.sy+3}" r="5.5" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;
    svg.innerHTML=s;
    rd.innerHTML=`<span>Time blowing <b>${p===0?'—':sec.toFixed(1)+' s'}</b></span><span>FEV1 <b>${sec>=1?'marked':'not yet'}</b></span><span>FVC <b>${up>=.99?'reached':'not yet'}</b></span><span>Pattern <b>${obs>.3?'obstructed (scooped)':'healthy shape'}</b></span>`;
    note.innerHTML=noteHTML(S);setSt(p)}
  const stop=playWire(rg,$('#moPlay'),draw,34000,'%t:player.replay%','monitoring');
  setSt=stepWire($('#moSteps'),MO_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- FEV1 % predicted bands ---------- */
  const fs=$('#moFevSvg'),fi=$('#moFev'),fv=$('#moFevV');
  function fev(){const v=+fi.value,N=vb(fs,'720 120','400 130');$('#moFevV2').textContent=v+'%';
    const x0=16,w=N?368:688,X=q=>x0+w*q/130,y=N?40:34;let s='';
    MO_BANDS.forEach(b=>{const on=b.lo===70?v>70:v>=b.lo&&v<b.hi;s+=`<rect x="${f1(X(b.lo))}" y="${y}" width="${f1(X(b.hi)-X(b.lo))}" height="28" style="fill:${b.col};opacity:${on?.55:.16}"/><text x="${f1((X(b.lo)+X(b.hi))/2)}" y="${y+18}" class="t-xs t-mid" style="fill:var(--ink);font-weight:${on?700:500}">${b.lab}</text>`});
    [0,30,40,70,100,130].forEach(q=>{s+=`<text x="${f1(X(q))}" y="${y+44}" class="t-xs t-mid">${q}</text>`});
    s+=`<line x1="${f1(X(30))}" x2="${f1(X(30))}" y1="${y-6}" y2="${y+32}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:3 3"/><text x="${f1(X(30)+4)}" y="${y-8}" class="t-xs">${N?'30%: Kerem 1992':'30%: historic Kerem 1992 marker'}</text>`;
    const xv=X(v);s+=`<path d="M${f1(xv-7)} ${y-18}h14l-7 10z" style="fill:var(--ink)"/><line x1="${f1(xv)}" x2="${f1(xv)}" y1="${y-8}" y2="${y+30}" style="stroke:var(--ink);stroke-width:3"/>`;
    s+=`<text x="16" y="${N?y+72:y+66}" class="t-xs">FEV1 % predicted · bands as used in CF research (Gee 2003)</text>`;
    fs.innerHTML=s;
    const k=v<40?0:v<70?1:v===70?3:2;
    fv.className='verdict '+['no','maybe','yes','maybe'][k];
    fv.textContent=k===3?'70% sits on the boundary as published: moderate is 40–69% and mild is above 70%.':`${v}% predicted falls in the published "${['severe','moderate','mild'][k]}" band.${v<30?' Below 30%: in a historic Toronto cohort (1977–1989) this went with a 2-year mortality above 50%, before modern treatment.':''}`}
  fi.addEventListener('input',fev);fev();

  /* ---------- Konstan 2007: mean decline by age group ---------- */
  const ks=$('#moKonSvg');
  const KON=[[6,8.99,88.4,-1.12,'6–8'],[9,12.99,85.3,-2.39,'9–12'],[13,17.99,78.4,-2.34,'13–17']];
  function kon(){const N=vb(ks,'720 220','400 260'),x0=N?44:60,x1=N?384:700,y0=16,y1=N?220:184,X=a=>x0+(x1-x0)*(a-6)/12,Y=v=>y1-(y1-y0)*(v-60)/40;
    let s='';[60,70,80,90,100].forEach(v=>{s+=`<line x1="${x0}" x2="${x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/><text x="${x0-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}</text>`});
    [6,9,13,18].forEach(a=>{s+=`<text x="${f1(X(a))}" y="${y1+16}" class="t-xs t-mid">${a}</text>`});
    s+=`<text x="${x1}" y="${y1+30}" class="t-xs t-end">age, years</text><text x="${x0}" y="${y0-4}" class="t-xs">FEV1 % predicted</text>`;
    KON.forEach(k=>{const a0=k[0],a1=k[1]+.01,v0=k[2],v1=v0+k[3]*(a1-a0);
      s+=`<line x1="${f1(X(a0))}" x2="${f1(X(a1))}" y1="${f1(Y(v0))}" y2="${f1(Y(v1))}" style="stroke:var(--dx);stroke-width:3.2;stroke-linecap:round"/><circle cx="${f1(X(a0))}" cy="${f1(Y(v0))}" r="4.5" style="fill:var(--dx)"/>`;
      s+=`<text x="${f1(X(a0)+4)}" y="${f1(Y(v0)-10)}" class="t-xs" style="fill:var(--ink);font-weight:600">${k[4]}: ${v0}%, ${k[3]}/yr</text>`});
    s+=`<text x="${x1}" y="${f1(Y(62))}" class="t-xs t-end">${N?'segments: each group\'s mean':'each segment: one age group\'s mean baseline and yearly decline'}</text>`;
    ks.innerHTML=s}
  kon();

  /* ---------- LCI vs FEV1 ---------- */
  const lc=$('#moLciSvg'),ln=$('#moLciNote');let lk='pre',stopL=null;
  const LCI={pre:{t:'Preschool children with CF (n=48)',rows:[['LCI abnormal',73,'var(--dx)'],['FEV1 abnormal',10,'var(--muted)']],txt:'At preschool age, 35 of 48 children with CF (73%) had an abnormal LCI but only 5 had an abnormal FEV1. An abnormal preschool LCI predicted an abnormal school-age result with a positive predictive value of 94%. [[Aurora2011]]'},
    age7:{t:'Children with CF, mean age 7.8 (n=60)',rows:[['LCI abnormal',84,'var(--dx)'],['HRCT abnormal',85,'var(--brand)'],['spirometry abnormal',47,'var(--muted)']],txt:'In 60 children with CF (mean age 7.8 years), LCI was abnormal in 84%, HRCT in 85% and spirometry in 47%. CT score correlated with LCI (r=0.77) better than with spirometry (r=−0.43). [[Owens2011]]'}};
  function lci(g){const N=vb(lc,'720 210','400 310'),D=LCI[lk];let s='';
    /* schematic washout: tracer gas falls breath by breath, slower when ventilation is uneven */
    const W=N?{x:30,y:28,w:344,h:110}:{x:40,y:30,w:250,h:140};
    s+=`<text x="${W.x}" y="${W.y-10}" class="t-xs" style="fill:var(--ink);font-weight:600">washout (schematic): tracer gas left</text>`;
    s+=curve(W.x,W.y,W.w,W.h,u=>Math.exp(-u*7),{col:'var(--good)',lw:2}).svg;
    s+=`<path d="${pathFn(u=>1-(.45*Math.exp(-u*8)+.55*Math.exp(-u*2.2)),W.x,W.x+W.w,W.y,W.y+W.h)}" style="fill:none;stroke:var(--bad);stroke-width:2"/>`;
    s+=`<text x="${W.x+W.w*.3}" y="${W.y+W.h*.83}" class="t-xs" style="fill:var(--good)">even</text><text x="${W.x+W.w*.42}" y="${W.y+W.h*.38}" class="t-xs" style="fill:var(--bad)">uneven: more breaths</text><text x="${W.x+W.w}" y="${W.y+W.h+14}" class="t-xs t-end">breaths →</text>`;
    const bx=N?30:350,by=N?190:40,bw=N?250:250;s+=`<text x="${bx}" y="${by-14}" class="t-xs" style="fill:var(--ink);font-weight:600">${D.t}</text>`;
    D.rows.forEach((r,i)=>{const y=by+i*36,v=r[1]*g;s+=`<text x="${bx}" y="${y+4}" class="t-xs">${r[0]}</text><rect x="${bx}" y="${y+8}" width="${bw}" height="14" rx="5" style="fill:var(--panel-2)"/><rect x="${bx}" y="${y+8}" width="${f1(bw*v/100)}" height="14" rx="5" style="fill:${r[2]}"/><text x="${f1(bx+bw*v/100+6)}" y="${y+19}" class="t-sm" style="fill:var(--ink);font-weight:700">${Math.round(v)}%</text>`});
    lc.innerHTML=s;ln.innerHTML=D.txt}
  $$('#moLciBtns [data-lc]').forEach(b=>b.addEventListener('click',()=>{lk=b.dataset.lc;$$('#moLciBtns [data-lc]').forEach(x=>x.setAttribute('aria-pressed',x===b));if(stopL)stopL();stopL=animate(800,q=>lci(ease(q)))}));
  lci(1);

  /* ---------- what is checked, by age ---------- */
  const as=$('#moAgeSvg'),ai=$('#moAge'),al=$('#moAgeList');
  function age(){const a=+ai.value/2,N=vb(as,'360 300','360 300');$('#moAgeV').textContent=a<1?Math.round(a*12)+' months':a+' years';
    const visits=a<.5?12:a<1?6:4,cx=180,cy=150,r=104;let s=`<circle cx="${cx}" cy="${cy}" r="${r}" style="fill:none;stroke:var(--line);stroke-width:14"/>`;
    for(let m=0;m<12;m++){const an=(m/12)*2*Math.PI-Math.PI/2;s+=`<text x="${f1(cx+(r+24)*Math.cos(an))}" y="${f1(cy+(r+24)*Math.sin(an)+3)}" class="t-xs t-mid">${'JFMAMJJASOND'[m]}</text>`}
    for(let k=0;k<visits;k++){const an=((k+.5)/visits)*2*Math.PI-Math.PI/2;s+=`<circle cx="${f1(cx+r*Math.cos(an))}" cy="${f1(cy+r*Math.sin(an))}" r="8" style="fill:var(--dx);stroke:var(--panel);stroke-width:2"/>`}
    s+=`<text x="${cx}" y="${cy-18}" class="t-xs t-mid">clinic visits in a year</text><text x="${cx}" y="${cy+12}" class="t-big t-mid" style="font-size:30px;fill:var(--dx)">${a<1&&a>=.5?'6–12':a<.5?'12':'≥4'}</text><text x="${cx}" y="${cy+32}" class="t-xs t-mid">${a<.5?'monthly':a<1?'every 1–2 months':'with 4 cultures, 2 PFTs'}</text>`;
    as.innerHTML=s;
    const I=[];
    if(a<.5)I.push('CF Center visits once a month for the first 6 months. [[Borowitz2009]]');
    else if(a<1)I.push('CF Center visits every 1–2 months for the rest of the first year. [[Borowitz2009]]');
    else I.push('Clinic visits at least 4 times a year, with 4 respiratory cultures and 2 pulmonary function tests (CF Foundation recommendation; met by 57.4% of US patients in 2012). [[Wooldridge2015]]');
    if(a<2)I.push('Under 2 years: "oropharyngeal cultures should be performed at least quarterly", more often with respiratory symptoms. [[Borowitz2009]]');
    if(a>=2&&a<6)I.push('Ages 2–5: lung disease often progresses silently, so sensitive objective tests matter (CF Foundation preschool guideline). [[Lahiri2016]]');
    if(a<7)I.push('Spirometry may not yet be reliable: in Wisconsin, not with acceptable quality until after age 7. LCI can be done across a wider age range. [[Farrell2003PP,Robinson2013]]');
    if(a>=8)I.push('Bone mineral density testing from age 8–10. [[Turck2016Nutrition]]');
    if(a>=10)I.push('CFRD: "Annual screening for CFRD should begin by age 10 years in all CF patients who do not have CFRD", with a 2-hour 75 g OGTT; A1C is not recommended as a screening test. [[Moran2010CFRD]]');
    I.push('Every year: screening for liver disease. [[Debray2011]] Regular monitoring of fat-soluble vitamins, and annual faecal elastase in pancreatic-sufficient patients. [[Turck2016Nutrition]]');
    al.innerHTML=I.map(x=>`<li>${x}</li>`).join('')}
  ai.addEventListener('input',age);age();
  redraws.monitoring=(()=>{const prev=redraws.monitoring;return()=>{prev&&prev();fev();kon();lci(1);age()}})();
};
