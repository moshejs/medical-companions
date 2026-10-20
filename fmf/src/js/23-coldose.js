/* =============== 2.3 dosing, safety, interactions =============== */
const CD_STEPS=[
 {from:0,at:.12,k:'Days 0–3',t:'Building to a steady level',
  txt:`After a 0.6 mg tablet, plasma colchicine peaks in 1–2 hours (mean Cmax 2.5 ng/mL); mean oral bioavailability is about 45%. The published half-lives do not agree: the US label reports 26.6–31.2 hours on repeated 0.6 mg twice-daily dosing, one intravenous study found a terminal half-life of 57.8 hours, and older oral studies and reviews report about 7–16 hours. The sources do not reconcile that spread, so half-life is best read as a range, not one settled number. Either way each dose adds to what is left of the last until levels settle into a daily rise and fall. Colchicine leaves the body through two exits: P-glycoprotein (P-gp) pumps in gut, liver and kidney, and the CYP3A4 enzyme in gut and liver. [[FDA-Colcrys,Ferron1996,BenChetrit2018Textbook,Slobodnick2018,Leung2015]]`,
  pt:`Each day's tablet adds to what is left from yesterday until the level settles into a steady daily wave. How long one dose lasts is disputed: published half-lives run from a few hours to over two days.`,
  hook:`Two exits: <b>P-gp</b> pumps and <b>CYP3A4</b>. Block either one and colchicine builds up. Half-life: a <b>disputed range</b>, not one number.`},
 {from:.29,at:.31,k:'Day 3',t:'An interacting drug is added',
  txt:`Strong CYP3A4 inhibitors and P-gp inhibitors close those exits. Life-threatening and fatal interactions have been reported, and the label contraindicates these combinations in people with kidney or liver impairment. The heights here come from the label's single-dose interaction studies, scaled schematically to daily dosing. [[FDA-Colcrys,Terkeltaub2011]]`,
  pt:`Some medicines block the body's way of clearing colchicine, so the same daily tablet leaves more drug behind.`,
  hook:`Clarithromycin, ketoconazole, ritonavir and cyclosporine raised single-dose exposure by <b>212–296%</b>.`},
 {from:.4,at:.62,k:'Days 4–10',t:'A slow climb to a new plateau',
  txt:`Because clearance slows, the level keeps climbing for days after the inhibitor starts, so risk grows with the length of the overlap. In the clarithromycin study a longer overlap, baseline kidney impairment and pancytopenia predicted death. [[Hung2005]]`,
  pt:`The extra drug piles up day after day, so a week-long antibiotic course can matter more than a single dose.`,
  hook:`Hung 2005: deaths <b>10.2%</b> with clarithromycin given together vs <b>3.6%</b> given sequentially.`},
 {from:.85,at:.97,k:'What the label publishes',t:'FMF dose caps',
  txt:`When there is no alternative to the interacting drug, the US label caps the FMF dose at 0.6 mg/day with strong CYP3A4 or P-gp inhibitors and 1.2 mg/day with moderate CYP3A4 inhibitors. The caps also apply within 14 days of taking the interacting drug. Press "Apply the label's FMF dose cap" to see the effect. [[FDA-Colcrys]]`,
  pt:`If two drugs must be taken together, the label lowers the colchicine ceiling so that levels stay closer to normal.`,
  hook:`Label FMF caps: <b>0.6 mg/day</b> (strong CYP3A4 or P-gp) and <b>1.2 mg/day</b> (moderate CYP3A4).`}
];
const CD_DRUGS={
 none:{n:'No interacting drug',sh:'nothing added',f:1,pct:'none',cap:null,capTxt:'not needed',
  txt:`Without an interaction, levels settle into the usual daily wave within about a week. [[FDA-Colcrys]]`},
 clari:{n:'Clarithromycin',sh:'clarithromycin',f:3.82,pct:'+282%',cap:.6,capTxt:'0.6 mg/day',
  txt:`A strong CYP3A4 inhibitor. In the label's single-dose study it raised colchicine AUC by 282%. In a retrospective study, 9 of 88 patients (10.2%) given both drugs together died, versus 1 of 28 (3.6%) given them one after the other. Azithromycin raised exposure much less and is suggested as the safer macrolide. [[FDA-Colcrys,Hung2005,Terkeltaub2011,BenChetrit2018Textbook]]`},
 keto:{n:'Ketoconazole / itraconazole',sh:'ketoconazole',f:3.12,pct:'+212% (ketoconazole)',cap:.6,capTxt:'0.6 mg/day',
  txt:`Strong CYP3A4 inhibitors. Ketoconazole raised colchicine AUC by 212% in the label study; itraconazole sits in the same label group, and the curve uses the ketoconazole figure. [[FDA-Colcrys]]`},
 rito:{n:'Ritonavir',sh:'ritonavir',f:3.96,pct:'+296%',cap:.6,capTxt:'0.6 mg/day',
  txt:`A strong CYP3A4 inhibitor, the largest increase in the label's table (+296%). Most HIV protease inhibitors are in the same label group. [[FDA-Colcrys]]`},
 cyclo:{n:'Cyclosporine',sh:'cyclosporine',f:3.59,pct:'+259%',cap:.6,capTxt:'0.6 mg/day',
  txt:`A P-gp inhibitor that raised colchicine AUC by 259%. Cyclosporine can bring on colchicine neuromyopathy within weeks and may mask the gut warning signs of toxicity. [[FDA-Colcrys,BenChetrit2018Textbook]]`},
 vera:{n:'Verapamil',sh:'verapamil',f:2.03,pct:'+103%',cap:1.2,capTxt:'1.2 mg/day',
  txt:`A moderate CYP3A4 inhibitor in the label's list; colchicine AUC rose by 103%. [[FDA-Colcrys]]`},
 dilt:{n:'Diltiazem',sh:'diltiazem',f:1.93,pct:'+93%',cap:1.2,capTxt:'1.2 mg/day',
  txt:`A moderate CYP3A4 inhibitor in the label's list; colchicine AUC rose by 93%. [[FDA-Colcrys]]`},
 azi:{n:'Azithromycin',sh:'azithromycin',f:1.57,pct:'+57%',cap:null,capTxt:'none listed in our sources',
  txt:`Raised colchicine AUC by 57%, far less than clarithromycin, which is why reviews suggest it as the safer macrolide. It is not in the label cap lists we cite, so the cap button has no effect here. [[FDA-Colcrys,Terkeltaub2011,BenChetrit2018Textbook]]`},
 grape:{n:'Grapefruit juice',sh:'grapefruit juice',f:1,pct:'no mean change in the label study',cap:1.2,capTxt:'1.2 mg/day (label: avoid)',
  txt:`The label contradicts itself here. It lists grapefruit juice in its table of moderate CYP3A4 inhibitors and tells patients to avoid it, yet its own interaction study (240 mL twice daily for 4 days) found mean Cmax and AUC each changed by under 3%, which is no meaningful change. Both statements sit in the same document and neither source resolves the conflict. The curve therefore does not move; the effect may still vary with product and person. [[FDA-Colcrys,Leung2015]]`},
 renal:{n:'Severe kidney impairment',sh:'severe kidney impairment',f:4.3,renal:true,pct:'clearance −75% on dialysis',cap:.3,capTxt:'start at 0.3 mg/day',
  txt:`Shown as if it began on day 3 only for comparison. This height is not from an AUC study: it is derived from the reported clearance figure, so it is the roughest curve here. In FMF patients on dialysis, colchicine clearance was 75% lower (0.17 vs 0.73 L/h/kg) and dialysis does not remove the drug. For CrCl below 30 mL/min or dialysis the label (FMF) starts at 0.3 mg/day and increases only with close monitoring. [[FDA-Colcrys]]`}
};
const CD_ORG={
 gut:{n:'Gut',rep:`Cramping, nausea, diarrhoea, abdominal pain and vomiting are the most common effects. The label reports them in up to 20% of patients starting FMF treatment, usually within 24 hours, and says severe gut effects can herald more serious toxicity. Long-term use lowers intestinal lactase, sucrase and maltase and can impair vitamin B12 absorption. [[FDA-Colcrys,Ozen2017,BenChetrit2018Textbook]]`,
  mon:`Symptoms are reviewed at each visit. Reviews note that dividing the daily dose can reduce gut effects, and that avoiding lactose or lowering the dose can help. [[Ozen2017,BenChetrit2018Textbook]]`},
 muscle:{n:'Muscle',rep:`Colchicine myopathy causes weakness of the hip and shoulder muscles with a raised CK, typically with reduced kidney function. It can be mistaken for polymyositis and remits within 3–4 weeks of stopping. The label warns of rhabdomyolysis at therapeutic doses, especially with kidney impairment, older age, statins or fibrates. [[Kuncl1987,FDA-Colcrys]]`,
  mon:`CPK (CK) is in the EULAR 2016 monitoring set; in reduced kidney function the guideline advises close watch, CK checks and a lower dose. The label notes CK monitoring will not necessarily prevent severe myopathy with statins or fibrates. [[Ozen2016,Ozen2017,FDA-Colcrys]]`},
 nerves:{n:'Nerves',rep:`A mild axonal polyneuropathy often comes with the myopathy (myoneuropathy). It resolves more slowly than the muscle weakness after the drug is stopped. Cyclosporine can bring on neuromyopathy within weeks. [[Kuncl1987,BenChetrit2018Textbook]]`,
  mon:`No nerve test is in the guideline monitoring set (SAA/CRP, blood count, liver enzymes, kidney function, CPK, urinalysis), so nerve symptoms are picked up clinically alongside the CK check. [[Ozen2016]]`},
 marrow:{n:'Bone marrow',rep:`Myelosuppression, leukopenia, granulocytopenia, thrombocytopenia, pancytopenia and aplastic anaemia have been reported at therapeutic doses, but leukopenia is very rare at standard FMF doses. In the clarithromycin study, pancytopenia predicted death. [[FDA-Colcrys,BenChetrit2018Textbook,Hung2005]]`,
  mon:`A blood count is in the EULAR 2016 monitoring set. The German consensus advises further work-up and a lower dose if counts become abnormal. [[Ozen2016,Ehlers2023]]`},
 liver:{n:'Liver',rep:`The liver metabolizes colchicine (CYP3A4 makes 2- and 3-demethylcolchicine) and pumps it into bile through P-gp. In chronic liver disease clearance may be much lower and the half-life longer, with wide variation between people. [[FDA-Colcrys,Slobodnick2018]]`,
  mon:`EULAR 2016 advises checking liver enzymes regularly, and reducing colchicine and investigating the cause if they exceed twice the upper limit of normal. The label (FMF) advises close monitoring in mild to moderate liver impairment and considering a dose reduction in severe disease. [[Ozen2016,Ozen2017,FDA-Colcrys]]`},
 kidney:{n:'Kidney',rep:`How much leaves by the kidney is disputed: the US label reports 40–65% of an oral dose recovered unchanged in urine, while a review puts renal elimination at 10–20% and treats the biliary and faecal route as the main one. The sources do not explain the gap. Both agree dialysis does not remove colchicine. Reduced kidney function is the usual setting for myopathy and for fatal interactions. [[FDA-Colcrys,BenChetrit2018Textbook,Kuncl1987,Hung2005]]`,
  mon:`Kidney function is in the EULAR 2016 set; with reduced function the guideline advises close watch, CK checks and a lower dose. Urinalysis at every visit looks for proteinuria, the first sign of amyloidosis (a disease complication, not a drug effect). [[Ozen2016,Ozen2017]]`}
};
inits.coldose=()=>{
  /* ---------- 1. exposure window ---------- */
  const svg=$('#cdSvg'),rg=$('#cdT');let dk='clari',capOn=false;
  const DT=.25,NH=240,NI=NH/DT,KE=Math.LN2/29,KA=Math.LN2/.6,NORM=KE*24,BASE=1.8,I72=72/DT;
  Object.values(CD_DRUGS).forEach(D=>{D.fb=D.renal?1:Math.sqrt(D.f);D.fc=D.f/D.fb});
  function sim(fb,fc,df){const a=new Float32Array(NI+1);let g=0,c=0;
    for(let i=0;i<=NI;i++){const h=i*DT;if(i%(24/DT)===0&&h<NH)g+=h>=72?fb*df:1;
      const k=h>=72?KE/fc:KE,ab=KA*g*DT;g-=ab;c+=ab-k*c*DT;a[i]=c*NORM}return a}
  const cache={};
  function get(key,capped){const id=key+(capped?'c':'');if(cache[id])return cache[id];const D=CD_DRUGS[key];return cache[id]=sim(D.fb,D.fc,capped&&D.cap?D.cap/BASE:1)}
  let X0=64,X1=700,Y0=322,Y1=46;const VM=5;
  const xh=h=>X0+(X1-X0)*h/NH,yv=v=>Y0-(Y0-Y1)*Math.min(v,VM+.15)/VM;
  function pth(a,i0,i1){let d='';for(let i=i0;i<=i1;i+=2)d+=(d?'L':'M')+f1(xh(i*DT))+' '+f1(yv(a[i]));if(i1>i0&&(i1-i0)%2)d+='L'+f1(xh(i1*DT))+' '+f1(yv(a[i1]));return d}
  function draw(t){
    /* narrow: same chart, full 400 wide and taller; axis notes and the day-3
       annotation stack instead of sitting side by side, so the longest drug
       names cannot run off the right edge. */
    const N=vb(svg,'720 372','400 452');
    X0=N?40:64;X1=N?384:700;Y0=N?372:322;Y1=N?74:46;
    const D=CD_DRUGS[dk],hasCap=capOn&&D.cap!=null,A=get(dk,hasCap),R=get('none',false),U=hasCap?get(dk,false):null;
    const iN=Math.round(t*NI),hN=iN*DT,df=hasCap?D.cap/BASE:1,fEff=D.f*df;
    const col=fEff>2.2?'var(--bad)':fEff>1.6?'var(--warn)':'var(--crocus)';
    let s=`<defs><linearGradient id="cdTox" x1="0" y1="1" x2="0" y2="0"><stop offset="0" style="stop-color:var(--bad);stop-opacity:0"/><stop offset="1" style="stop-color:var(--bad);stop-opacity:.34"/></linearGradient></defs>`;
    s+=`<rect x="${X0}" y="${Y1}" width="${X1-X0}" height="${f1(yv(2.2)-Y1)}" style="fill:url(#cdTox)"/>`;
    s+=`<rect x="${X0}" y="${f1(yv(1.55))}" width="${X1-X0}" height="${f1(yv(.55)-yv(1.55))}" style="fill:var(--good-soft);opacity:.85"/>`;
    for(let v=0;v<=VM;v++)s+=`<line x1="${X0}" x2="${X1}" y1="${f1(yv(v))}" y2="${f1(yv(v))}" class="grid"/><text x="${X0-6}" y="${f1(yv(v)+3)}" class="t-xs t-end">${v}×</text>`;
    for(let d=0;d<=10;d+=(N?2:1))s+=`<text x="${f1(xh(d*24))}" y="${Y0+16}" class="t-xs t-mid">${d}</text>`;
    if(N)s+=`<text x="${f1((X0+X1)/2)}" y="${Y0+32}" class="t-xs t-mid">days of once-daily dosing</text><text x="${X0}" y="${Y0+50}" class="t-xs">exposure vs usual average</text><text x="${X0}" y="${Y0+63}" class="t-xs">schematic model, not measured data</text>`;
    else s+=`<text x="${X1}" y="${Y0+34}" class="t-xs t-end">days of once-daily dosing</text><text x="${X0}" y="${Y0+34}" class="t-xs">exposure vs usual average · schematic model, not measured data</text>`;
    s+=`<text x="${N?X0:X1-6}" y="${N?22:Y1+14}" class="t-sm ${N?'':'t-end'}" style="fill:var(--bad)">toxicity risk rises · no sharp threshold</text>`;
    s+=`<text x="${X0+6}" y="${f1(yv(1.55)+12)}" class="t-xs" style="fill:var(--good)">usual range (schematic)</text>`;
    const x3=xh(72);
    s+=`<line x1="${f1(x3)}" x2="${f1(x3)}" y1="${Y1-14}" y2="${Y0}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:3 4;opacity:.55"/>`;
    if(N){s+=`<text x="${f1(x3+6)}" y="${Y1-26}" class="t-lbl">day 3: ${dk==='none'?'nothing added':'+ '+D.sh}</text>`;
      if(hasCap)s+=`<text x="${f1(x3+6)}" y="${Y1-10}" class="t-xs" style="fill:${col}">label cap ${D.cap} mg/day</text>`}
    else s+=`<text x="${f1(x3+6)}" y="${Y1-6}" class="t-lbl">day 3: ${dk==='none'?'nothing added':'+ '+D.sh}${hasCap?' · label cap '+D.cap+' mg/day':''}</text>`;
    // dose markers
    for(let d=0;d<10;d++){const h=d*24;if(h>hN+.01)break;const fr=h>=72&&hasCap?df:1;s+=`<rect x="${f1(xh(h)-3)}" y="${f1(Y0-2-16*fr)}" width="6" height="${f1(16*fr)}" rx="2" style="fill:var(--crocus);opacity:.75"/>`}
    // curves
    if(iN>1)s+=`<path d="${pth(R,0,iN)}" style="fill:none;stroke:var(--muted);stroke-width:1.4;stroke-dasharray:5 4"/>`;
    if(U&&iN>I72)s+=`<path d="${pth(U,I72,iN)}" style="fill:none;stroke:var(--bad);stroke-width:1.6;opacity:.35"/>`;
    if(iN>1)s+=`<path d="${pth(A,0,Math.min(iN,I72))}" style="fill:none;stroke:var(--crocus);stroke-width:2.6;stroke-linejoin:round"/>`;
    if(iN>I72)s+=`<path d="${pth(A,I72,iN)}" style="fill:none;stroke:${col};stroke-width:2.8;stroke-linejoin:round"/>`;
    if(dk!=='none'&&Math.abs(fEff-1)>.05&&hN>72){const yy=yv(fEff);
      s+=`<line x1="${f1(x3)}" x2="${X1}" y1="${f1(yy)}" y2="${f1(yy)}" style="stroke:${col};stroke-width:1.2;stroke-dasharray:2 4"/><text x="${f1(x3+8)}" y="${f1(yy-6)}" class="t-xs" style="fill:${col}">average if continued ≈ ${f1(fEff)}×</text>`}
    if(iN>0){const v=A[iN],cx=xh(hN);s+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${Y1}" y2="${Y0}" style="stroke:var(--ink);opacity:.22"/><circle cx="${f1(cx)}" cy="${f1(yv(v))}" r="5.5" style="fill:${hN>72?col:'var(--crocus)'};stroke:var(--panel);stroke-width:2"/>`}
    svg.innerHTML=s;
    $('#cdRead').innerHTML=`<span>day <b>${f1(hN/24)}</b></span><span>exposure now <b>${f1(A[iN])}×</b> usual average</span><span>label AUC change <b>${D.pct}</b></span><span>label FMF cap <b>${D.capTxt}</b></span>`;
    const p=phaseOf(CD_STEPS,t);setSt(p);
    $('#cdNote').innerHTML=noteHTML(CD_STEPS[p])+`<div class="kv"><div><dt>${D.n}${hasCap?' · capped':''}</dt><dd>${D.txt}</dd></div></div>`;
  }
  const stop=playWire(rg,$('#cdPlay'),draw,15000,'Replay','coldose');
  const setSt=stepWire($('#cdSteps'),CD_STEPS,rg,draw,stop);
  $$('[data-cd]').forEach(b=>b.onclick=()=>{dk=b.dataset.cd;$$('[data-cd]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)});
  $('#cdCap').onclick=()=>{capOn=!capOn;$('#cdCap').setAttribute('aria-pressed',capOn);draw(+rg.value)};
  draw(+rg.value);

  /* ---------- 2. published dose by age ---------- */
  const ag=$('#cdAge'),asv=$('#cdAgeSvg');let cur=null,stopT=null;
  function target(a){const child=a<18,e=a<5?[0,.5]:a<=10?[.5,1]:[1,1.5],l=a<4?null:a<6?[.3,1.8]:a<=12?[.9,1.8]:[1.2,2.4];
    return{e0:e[0],e1:e[1],mx:child?2:3,l0:l?l[0]:0,l1:l?l[1]:0,hasL:!!l,child,es:a<5?'≤0.5':a<=10?'0.5–1.0':'1.0–1.5',ls:l?l[0]+'–'+l[1]:''}}
  let AX0=170,AX1=690;const MXS=3.5,xm=m=>AX0+(AX1-AX0)*m/MXS;
  function drawAge(v,T,a){
    /* narrow: the two bars and the step note stack down the page, each with its
       own heading above it, so the mg/day figures keep their full size. */
    const N=vb(asv,'720 226','400 392');
    AX0=N?24:170;AX1=N?376:690;
    const LX=N?16:10,EB=N?80:44,LB=N?200:122,CY=N?352:88;
    let s='';
    for(let m=0;m<=MXS+.01;m+=.5)s+=`<line x1="${f1(xm(m))}" x2="${f1(xm(m))}" y1="${N?56:24}" y2="${N?232:188}" class="grid"/><text x="${f1(xm(m))}" y="${N?248:204}" class="t-xs t-mid">${m}</text>`;
    s+=`<text x="${AX1}" y="${N?264:220}" class="t-xs t-end">mg per day</text>`;
    s+=`<text x="${LX}" y="${N?30:58}" class="t-lbl">EULAR 2016</text><text x="${LX}" y="${N?44:73}" class="t-xs">same ceilings in 2024</text>`;
    s+=`<text x="${LX}" y="${CY}" class="t-xs" style="fill:var(--muted)">the sources give no age</text><text x="${LX}" y="${CY+11}" class="t-xs" style="fill:var(--muted)">cut-off: 18 is this app's</text><text x="${LX}" y="${CY+22}" class="t-xs" style="fill:var(--muted)">assumption</text>`;
    s+=`<rect x="${f1(xm(v.e1))}" y="${EB+4}" width="${f1(Math.max(0,xm(v.mx)-xm(v.e1)))}" height="20" rx="4" style="fill:var(--crocus-soft);stroke:var(--crocus);stroke-opacity:.3"/>`;
    for(let m=v.e1+.25;m<v.mx-.05;m+=.25)s+=`<line x1="${f1(xm(m))}" x2="${f1(xm(m))}" y1="${EB+8}" y2="${EB+20}" style="stroke:var(--crocus);opacity:.4"/>`;
    s+=`<rect x="${f1(xm(v.e0))}" y="${EB}" width="${f1(Math.max(5,xm(v.e1)-xm(v.e0)))}" height="28" rx="5" style="fill:var(--crocus)"/>`;
    s+=`<line x1="${f1(xm(v.mx))}" x2="${f1(xm(v.mx))}" y1="${EB-2}" y2="${EB+34}" style="stroke:var(--bad);stroke-width:3"/>`;
    s+=`<text x="${f1(xm(v.e0))}" y="${EB-10}" class="t-sm" style="fill:var(--crocus)">start ${T.es} mg/day</text>`;
    s+=`<text x="${f1(xm(v.mx)+7)}" y="${EB+19}" class="t-sm" style="fill:var(--bad)">max ${T.mx}</text>`;
    if(T.child)s+=`<line x1="${f1(xm(2.5))}" x2="${f1(xm(2.5))}" y1="${EB+2}" y2="${EB+32}" style="stroke:var(--muted);stroke-width:1.5;stroke-dasharray:3 3"/><text x="${f1(xm(2.5))}" y="${EB+48}" class="t-xs t-mid">2007 paediatric consensus: 2.5</text>`;
    s+=`<text x="${LX}" y="${N?156:132}" class="t-lbl">US label (FMF)</text><text x="${LX}" y="${N?170:147}" class="t-xs">COLCRYS</text>`;
    if(T.hasL){s+=`<rect x="${f1(xm(v.l0))}" y="${LB}" width="${f1(Math.max(4,xm(v.l1)-xm(v.l0)))}" height="26" rx="5" style="fill:var(--sea);opacity:.85"/><text x="${f1(xm(v.l0))}" y="${LB-8}" class="t-sm" style="fill:var(--sea)">label range ${T.ls} mg/day</text>`}
    else s+=`<text x="${N?LX:AX0}" y="${LB+17}" class="t-sm">The label ranges in our source start at age 4.</text>`;
    if(N)s+=`<text x="${LX}" y="290" class="t-lbl">Steps</text><text x="${LX}" y="306" class="t-xs">EULAR 2016: 0.5 mg/day</text><text x="${LX}" y="318" class="t-xs">German consensus: 0.25 or 0.5 mg</text><text x="${LX}" y="330" class="t-xs">label: 0.3 mg/day</text>`;
    else s+=`<text x="10" y="178" class="t-lbl">Steps</text><text x="${AX0}" y="178" class="t-xs">EULAR 2016: 0.5 mg/day · German consensus: 0.25 or 0.5 mg · label: 0.3 mg/day</text>`;
    asv.innerHTML=s;
    $('#cdAgeOut').textContent=a+' y';
    $('#cdAgeRead').innerHTML=`<span>age <b>${a} y</b> (${T.child?'child':'adult'})</span><span>EULAR start <b>${T.es} mg/day</b></span><span>EULAR max <b>${T.mx} mg/day</b></span><span>US label <b>${T.hasL?T.ls+' mg/day':'no range under 4'}</b></span>`;
  }
  function setAge(a,inst){const T=target(a),to={e0:T.e0,e1:T.e1,mx:T.mx,l0:T.l0,l1:T.l1};
    if(stopT)stopT();if(!cur||inst){cur=to;drawAge(cur,T,a);return}
    const from={...cur};stopT=animate(450,p=>{const e=ease(p);cur={};for(const k in to)cur[k]=lerp(from[k],to[k],e);drawAge(cur,T,a)},()=>{stopT=null})}
  ag.addEventListener('input',()=>setAge(+ag.value));
  setAge(+ag.value,true);

  /* ---------- 3. organ map ---------- */
  const osv=$('#cdOrgSvg');let org='gut';
  function drawOrg(){
    /* narrow: the body stays central in a full-width 400 stage and the two label
       columns move outward with it; every organ group keeps its own hit area. */
    const N=vb(osv,'360 430','400 440');
    const DX=N?20:0,LLX=N?96:58,RLX=N?304:300;
    const on=k=>k===org;
    const st=k=>on(k)?'fill:var(--bad-soft);stroke:var(--bad);stroke-width:2.4':'fill:var(--panel);stroke:var(--muted);stroke-width:1.2';
    let s=`<g transform="translate(${DX} 0)">`;
    // body
    s+=`<g style="fill:var(--panel-2);stroke:var(--line);stroke-width:1.5"><circle cx="180" cy="46" r="30"/><rect x="166" y="72" width="28" height="18"/><rect x="118" y="86" width="124" height="190" rx="32"/><rect x="86" y="96" width="30" height="176" rx="14"/><rect x="244" y="96" width="30" height="176" rx="14"/><rect x="126" y="262" width="50" height="160" rx="18"/><rect x="184" y="262" width="50" height="160" rx="18"/></g>`;
    const G=(k,inner,cx,cy,r)=>`<g class="clk" data-org="${k}" role="button" tabindex="0" aria-label="${CD_ORG[k].n}">${on(k)?`<circle class="cd-pulse" cx="${cx}" cy="${cy}" r="${r}" style="fill:var(--bad)"/>`:''}${inner}</g>`;
    // muscle: upper arm + thigh
    s+=G('muscle',`<ellipse cx="101" cy="150" rx="11" ry="34" style="${st('muscle')}"/><ellipse cx="151" cy="318" rx="19" ry="40" style="${st('muscle')}"/>`,151,318,34);
    // marrow: femur
    s+=G('marrow',`<rect x="201" y="282" width="16" height="96" rx="8" style="${st('marrow')}"/><rect x="206" y="296" width="6" height="68" rx="3" style="fill:${on('marrow')?'var(--bad)':'var(--terra-soft)'}"/>`,209,330,30);
    // nerves: right arm and lower legs
    const nv=on('nerves')?'var(--bad)':'var(--gold)',nw=on('nerves')?2.6:1.6;
    s+=G('nerves',`<path d="M259 100 L259 266 M259 150 L266 176 M259 210 L252 236 M151 362 L151 418 M151 380 L143 404 M209 382 L209 418 M209 392 L217 412" style="fill:none;stroke:${nv};stroke-width:${nw};stroke-linecap:round"/><rect x="246" y="96" width="26" height="176" style="fill:transparent"/>`,259,190,26);
    // liver (person's right = viewer's left)
    s+=G('liver',`<path d="M128 146 C140 128 196 126 206 142 C204 160 168 168 132 168 C124 162 124 152 128 146Z" style="${st('liver')}"/>`,162,150,30);
    // kidneys
    s+=G('kidney',`<ellipse cx="142" cy="196" rx="10" ry="16" style="${st('kidney')}"/><ellipse cx="218" cy="196" rx="10" ry="16" style="${st('kidney')}"/>`,180,196,40);
    // gut
    let gi='';[[166,214],[184,212],[202,216],[160,232],[178,234],[196,232],[170,250],[190,250]].forEach(([x,y])=>gi+=`<circle cx="${x}" cy="${y}" r="9" style="${st('gut')}"/>`);
    s+=G('gut',gi,181,232,34);
    s+=`</g>`;
    // labels with leaders (organ end of the leader follows the body's shift)
    const L=(k,x,y,tx,ty,anchor)=>`<line x1="${x+DX}" y1="${y}" x2="${tx+(anchor==='end'?4:-4)}" y2="${ty-4}" style="stroke:var(--muted);stroke-width:1"/><text x="${tx}" y="${ty}" class="t-sm ${anchor==='end'?'t-end':''}" style="fill:${on(k)?'var(--bad)':'var(--muted)'};font-weight:${on(k)?700:500}">${CD_ORG[k].n.toLowerCase()}</text>`;
    s+=L('muscle',96,130,LLX,118,'end')+L('liver',132,154,LLX,160,'end')+L('gut',156,240,LLX,246,'end')+L('nerves',262,128,RLX,118,'')+L('kidney',226,198,RLX,200,'')+L('marrow',216,340,RLX,334,'');
    osv.innerHTML=s;
    const O=CD_ORG[org];
    $('#cdOrgNote').innerHTML=`<div class="kicker">Toxicity map</div><h4>${O.n}</h4><dl class="kv"><div><dt>What is reported</dt><dd>${O.rep}</dd></div><div><dt>What is monitored</dt><dd>${O.mon}</dd></div></dl>`;
    $$('#m-coldose button[data-org]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.org===org));
  }
  function pick(k){org=k;drawOrg()}
  $$('#m-coldose button[data-org]').forEach(b=>b.onclick=()=>pick(b.dataset.org));
  osv.addEventListener('click',e=>{const g=e.target.closest('[data-org]');if(g)pick(g.dataset.org)});
  osv.addEventListener('keydown',e=>{const g=e.target.closest('[data-org]');if(g&&(e.key==='Enter'||e.key===' ')){e.preventDefault();pick(g.dataset.org)}});
  drawOrg();

  /* ---------- 4. kidney gauge ---------- */
  const cr=$('#cdCr'),rsv=$('#cdRenSvg'),dial=$('#cdDial');let dOn=false,ptr=null,stopR=null;
  let GX0=16,GX1=444;const gx=c=>GX0+(GX1-GX0)*clamp(c/120);
  function cat(c){if(dOn)return{k:'dialysis',n:'On dialysis',col:'var(--bad)'};if(c<30)return{k:'severe',n:'Severe (<30)',col:'var(--bad)'};if(c<50)return{k:'moderate',n:'Moderate (30–50)',col:'var(--warn)'};if(c<=80)return{k:'mild',n:'Mild (50–80)',col:'var(--gold)'};return{k:'normal',n:'Above 80',col:'var(--good)'}}
  const REN={
   normal:`Above 80 mL/min the label's kidney-impairment advice does not apply. [[FDA-Colcrys]]`,
   mild:`Label (FMF): patients with mild impairment (CrCl 50–80) are monitored closely, and the dose may need reducing. [[FDA-Colcrys]]`,
   moderate:`Label (FMF): patients with moderate impairment (CrCl 30–50) are monitored closely, and the dose may need reducing. One review cites a suggested 50% dose reduction below 50 mL/min. [[FDA-Colcrys,Leung2015]]`,
   severe:`Label (FMF): with CrCl below 30 mL/min, start at 0.3 mg/day and increase only with close monitoring. One review cites a 50% reduction below 50 mL/min; another reports a half-life 2–3 times longer in severe kidney failure. [[FDA-Colcrys,Leung2015,BenChetrit2018Textbook]]`,
   dialysis:`Label (FMF): start at 0.3 mg/day and increase only with close monitoring. Dialysis does not remove colchicine. In FMF patients on dialysis, clearance was 75% lower (0.17 vs 0.73 L/h/kg) and half-life longer (18.8 vs 4.4 h) than with normal kidneys, in that study's design. [[FDA-Colcrys]]`};
  function drawRen(p,c){const C=cat(c);let s='';
    const NR=vb(rsv,'460 200','400 240');GX0=NR?12:16;GX1=NR?388:444;
    [[0,30,'var(--bad-soft)','severe'],[30,50,'var(--warn-soft)',NR?'mod.':'moderate'],[50,80,'var(--gold-soft)','mild'],[80,120,'var(--good-soft)',NR?'none':'no adjustment']].forEach(([a,b,f,l])=>{s+=`<rect x="${f1(gx(a))}" y="60" width="${f1(gx(b)-gx(a))}" height="34" style="fill:${f}"/><text x="${f1((gx(a)+gx(b))/2)}" y="81" class="t-xs t-mid">${l}</text>`});
    s+=`<rect x="${GX0}" y="60" width="${GX1-GX0}" height="34" rx="3" style="fill:none;stroke:var(--line)"/>`;
    [0,30,50,80,120].forEach(v=>s+=`<text x="${f1(gx(v))}" y="112" class="t-xs t-mid">${v}</text>`);
    s+=`<text x="${GX1}" y="128" class="t-xs t-end">mL/min</text>`;
    const px=gx(p);s+=`<path d="M${f1(px)} 56 l-8 -14 h16z" style="fill:${C.col}"/><line x1="${f1(px)}" x2="${f1(px)}" y1="56" y2="98" style="stroke:var(--ink);stroke-width:2"/>`;
    s+=`<text x="${GX0}" y="28" class="t-big">${dOn?'On dialysis':'CrCl '+Math.round(c)+' mL/min'}</text><text x="${GX1}" y="30" class="t-sm t-end" style="fill:${C.col}">${dOn?'clearance −75%':C.n}</text>`;
    if(dOn){const bx=GX0,by=NR?168:150,w=GX1-GX0;s+=`<text x="${bx}" y="${by}" class="t-xs">COLCHICINE CLEARANCE IN FMF (label study, L/h/kg)</text><rect x="${bx}" y="${by+8}" width="${f1(w*.73/.8)}" height="12" rx="3" style="fill:var(--good)"/><text x="${f1(bx+w*.73/.8-4)}" y="${by+18}" class="t-xs t-end" style="fill:var(--panel)">normal kidneys 0.73</text><rect x="${bx}" y="${by+26}" width="${f1(w*.17/.8)}" height="12" rx="3" style="fill:var(--bad)"/><text x="${f1(bx+w*.17/.8+6)}" y="${by+36}" class="t-xs" style="fill:var(--bad)">dialysis 0.17 (−75%)</text>`}
    else s+=`<text x="${GX0}" y="${NR?178:160}" class="t-xs">Drag the slider or press "On dialysis".</text>`;
    rsv.innerHTML=s;
    $('#cdCrOut').textContent=dOn?'dialysis':Math.round(c);
    $('#cdRenNote').innerHTML=`<div class="kicker">Kidney function</div><h4>${C.n}</h4><p>${REN[C.k]}</p><p>EULAR 2016 advises that in reduced kidney function the toxicity risk is high, so signs of toxicity and CK should be watched closely and the dose reduced; the guideline notes there is no specific GFR cut-off behind that advice. The label contraindicates combining colchicine with P-gp or strong CYP3A4 inhibitors in kidney or liver impairment. In amyloid kidney disease, colchicine helped mainly when creatinine started below 1.5 mg/dL. [[Ozen2016,Ozen2017,FDA-Colcrys,Livneh1994]]</p>`;
  }
  function setRen(inst){const c=+cr.value,to=dOn?0:c;if(stopR)stopR();if(ptr==null||inst){ptr=to;drawRen(ptr,c);return}
    const fr=ptr;stopR=animate(380,p=>{ptr=lerp(fr,to,ease(p));drawRen(ptr,c)},()=>{stopR=null})}
  cr.addEventListener('input',()=>{if(dOn){dOn=false;dial.setAttribute('aria-pressed','false')}setRen(true)});
  dial.onclick=()=>{dOn=!dOn;dial.setAttribute('aria-pressed',dOn);setRen()};
  setRen(true);

  /* playWire only registers the exposure chart for the narrow/wide redraw, so
     chain the two widgets that have no player of their own. */
  const prevRedraw=redraws.coldose;
  redraws.coldose=()=>{prevRedraw&&prevRedraw();setAge(+ag.value,true);drawOrg()};
};
