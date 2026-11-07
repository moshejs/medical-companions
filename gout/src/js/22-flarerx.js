/* =============== 2.2 treating a flare =============== */
/* The pain curves reuse the FMF attack engine (pathFn, drawn up to the scrubber with the
   rest ghosted); the option cards follow the FMF ladder's card pattern. */
const FX_STEPS=[
 {from:0,at:.05,k:'First hours',t:'Start early',
  txt:'A typical gout flare reaches maximal pain in under 24 hours and resolves within 14 days. In 11 volunteers with untreated podagra, 2 withdrew on day 4 with severe pain, and only 3 of the 9 who stayed reported their pain gone within 7 days. EULAR 2016 recommends treatment within 12 hours of onset and teaching people to self-medicate at the first warning symptoms; ACR 2012 advises within 24 hours, and colchicine only if onset was 36 hours or less earlier. ACR 2020 records patients\' preference for a "medication-in-pocket" plan. No trial has randomised start times: the windows rest on trial entry criteria and consensus. [[Neogi2015,Bellamy1987,Richette2017,Khanna2012P2,FitzGerald2020,Terkeltaub2010]]',
  pt:'A flare usually hits its worst within a day, then slowly settles over one to two weeks. Medicine works best if taken at the first sign, so many people keep a supply at home.',
  hook:'Windows: <b>12 h</b> (EULAR, colchicine), <b>24 h</b> (ACR 2012, any treatment), <b>≤ 36 h</b> (ACR 2012, colchicine). Consensus, not randomised timing.'},
 {from:.3,at:.35,k:'Low-dose colchicine',t:'AGREE: low dose as good as high',
  txt:'AGREE randomised 184 people within 12 hours of onset. At 24 hours, 37.8% on low dose (1.2 mg then 0.6 mg 1 hour later) had at least 50% less pain without rescue medicine, against 32.7% on high dose (4.8 mg over 6 hours) and 15.5% on placebo. Diarrhoea: 23.0% low dose, 76.9% high dose. In the first placebo-controlled trial, two-thirds improved at 48 hours vs one-third on placebo, but every colchicine-treated patient got diarrhoea. ACR 2020 strongly recommends the low dose. [[Terkeltaub2010,Ahern1987,FitzGerald2020]]',
  pt:'With colchicine, the small dose (three tablets over one hour) works as well as the old big dose and causes much less diarrhoea.',
  hook:'Low dose <b>1.8 mg over 1 h</b> = high dose 4.8 mg for benefit (37.8% vs 32.7% vs placebo 15.5%), with diarrhoea <b>23% vs 77%</b>.'},
 {from:.55,at:.6,k:'NSAID or steroid',t:'Equivalent options',
  txt:'Prednisolone 35 mg once daily for 5 days matched naproxen 500 mg twice daily (pain fell 44.7 vs 46.0 mm at 90 h, 120 people). In 416 emergency patients prednisolone matched indomethacin, with fewer minor adverse events in the department (6% vs 19%). In CONTACT (399 people), naproxen and low-dose colchicine relieved pain equally over 7 days, but colchicine caused more diarrhoea (45.9% vs 20.0%) and headache. ACR 2020 ranks no first-line agent above another. [[Janssens2008,Rainer2016,Roddy2020,FitzGerald2020]]',
  pt:'Colchicine, an anti-inflammatory pill such as naproxen, or a short course of a steroid like prednisolone all work about equally well. Your doctor picks the one that is safest for you.',
  hook:'Prednisolone 35 mg/day × 5 days ≈ naproxen 500 mg twice daily (Janssens 2008). Choose by <b>comorbidity</b>, not by efficacy.'},
 {from:.8,at:.85,k:'When nothing else fits',t:'IL-1 blockade',
  txt:'Canakinumab 150 mg under the skin reduced 72-hour pain more than triamcinolone 40 mg (25.0 vs 35.7 mm) and cut new-flare risk by 62% at 12 weeks, with more adverse events (66.2% vs 52.8%) and infections. The US approved it in 2023 for adults who cannot use NSAIDs and colchicine and for whom repeated steroid courses are not appropriate, with at least 12 weeks before re-treatment; it is avoided during an active infection needing treatment. Anakinra is not approved for gout. ACR 2020 makes IL-1 inhibition conditional, for when other options are ineffective, poorly tolerated or contraindicated. [[Schlesinger2012,FDA-IlarisGout2023,IlarisPIG,KineretPI,FitzGerald2020]]',
  pt:'If none of the usual medicines are safe for you, a specialist may offer an injection that blocks the inflammation signal IL-1.',
  hook:'IL-1 blockade is <b>second line</b>: canakinumab 150 mg SC, re-treatment ≥ 12 weeks apart, not in active infection.'}
];
const FX_START=[6,12,24,36,72];
const FX_OPTS=[
 {id:'colch',n:'Colchicine, low dose',tag:'first line',tc:'crocus',
  b:'US label: 1.2 mg, then 0.6 mg 1 hour later. EULAR 2016: 1 mg, then 0.5 mg, within 12 hours. ACR 2012: only if onset was 36 hours or less earlier. AGREE: 37.8% responders vs 15.5% on placebo. [[FDA-Colcrys,Richette2017,Khanna2012P2,Terkeltaub2010]]'},
 {id:'nsaid',n:'NSAID or COX-2 inhibitor',tag:'first line',tc:'sea',
  b:'ACR 2012: full anti-inflammatory doses; naproxen, indomethacin and sulindac were FDA-approved for gout. COX-2 inhibitors gave similar pain relief with fewer adverse events than non-selective NSAIDs. NICE suggests adding a proton pump inhibitor. [[Khanna2012P2,vanDurme2021,NICE-NG219]]'},
 {id:'oral',n:'Oral glucocorticoid',tag:'first line',tc:'sea',
  b:'Prednisolone 35 mg daily for 5 days matched naproxen; prednisolone matched indomethacin with fewer early minor adverse events. ACR 2012: prednisone or prednisolone at least 0.5 mg/kg/day for 5–10 days, then stop (Evidence A). [[Janssens2008,Rainer2016,Khanna2012P2]]'},
 {id:'ia',n:'Intra-articular glucocorticoid',tag:'first line',tc:'sea',
  b:'ACR 2012: for 1–2 large joints (Evidence B). EULAR 2016 lists joint aspiration with an intra-articular corticosteroid as a first-line option. ACR 2020 prefers glucocorticoids by injection over IL-1 inhibitors or ACTH when oral medicine is not possible. [[Khanna2012P2,Richette2017,FitzGerald2020]]'},
 {id:'im',n:'Intramuscular glucocorticoid or ACTH',tag:'first line',tc:'sea',
  b:'IM triamcinolone 60 mg resolved symptoms in an average 7 days vs 8 with indomethacin (27 people). IM ACTH matched IM triamcinolone but needed more reinjections (11 vs 5). ACR 2012 lists IM triamcinolone 60 mg as an alternative. [[Alloway1993,Siegel1994,Khanna2012P2]]'},
 {id:'il1',n:'IL-1 blocker (canakinumab, anakinra)',tag:'second line',tc:'warn',
  b:'Canakinumab beat triamcinolone 40 mg on 72-hour pain (25.0 vs 35.7 mm) and new flares (17% vs 37%). Approved for people who cannot use NSAIDs and colchicine and for whom repeated steroid courses are not appropriate. Anakinra is off-label in gout. [[Schlesinger2012,EMA-IlarisGout2013,FDA-IlarisGout2023,KineretPI]]'},
 {id:'ice',n:'Ice on the joint',tag:'add-on',tc:'good',
  b:'Added to prednisone and colchicine, topical ice cut pain by 7.75 vs 4.42 cm on a 10 cm scale over a week (19 people). ACR 2020: conditional add-on. [[Schlesinger2002,FitzGerald2020]]'}
];
const FX_SR='ACR 2012 lists this as a limit on corticosteroids; the example does not separate the routes. [[Khanna2012P2]]';
const FX_CONDS={
 ckd:{n:'CKD',f:{colch:['caution','ACR 2012 lists moderate or severe CKD as a limit; EULAR 2016 says avoid in severe kidney impairment; the label limits repeat courses in severe impairment to once every 2 weeks. [[Khanna2012P2,Richette2017,FDA-Colcrys]]'],nsaid:['caution','ACR 2012 lists moderate or severe CKD as a limit; EULAR 2016 says avoid in severe kidney impairment. [[Khanna2012P2,Richette2017]]']}},
 ulcer:{n:'Peptic ulcer',f:{nsaid:['caution','ACR 2012 lists peptic ulcer disease as a limit on NSAIDs and COX-2 inhibitors. [[Khanna2012P2]]'],oral:['caution',FX_SR],ia:['caution',FX_SR],im:['caution',FX_SR]}},
 hf:{n:'Heart failure',f:{nsaid:['caution','ACR 2012 lists congestive heart failure as a limit on NSAIDs and COX-2 inhibitors. [[Khanna2012P2]]']}},
 dm:{n:'Diabetes',f:{oral:['caution',FX_SR.replace('this','diabetes')],ia:['caution',FX_SR.replace('this','diabetes')],im:['caution',FX_SR.replace('this','diabetes')]}},
 anticoag:{n:'Anticoagulant or antiplatelet',f:{nsaid:['caution','ACR 2012 lists anticoagulant or antiplatelet therapy as a limit on NSAIDs. [[Khanna2012P2]]']}},
 liver:{n:'Liver disease',f:{colch:['caution','ACR 2012 lists hepatic disease as a limit on colchicine; the label limits repeat courses in severe impairment. [[Khanna2012P2,FDA-Colcrys]]'],nsaid:['caution','ACR 2012 lists hepatic disease as a limit on NSAIDs and COX-2 inhibitors. [[Khanna2012P2]]']}},
 drugs:{n:'Strong CYP3A4 or P-gp inhibitor',f:{colch:['avoid','EULAR 2016: do not give colchicine with strong P-gp and/or CYP3A4 inhibitors such as cyclosporin or clarithromycin. The label contraindicates the combination in kidney or liver impairment. [[Richette2017,FDA-Colcrys]]']}},
 infect:{n:'Infection',f:{oral:['caution',FX_SR.replace('this','ongoing infection or high infection risk')],ia:['caution',FX_SR.replace('this','ongoing infection or high infection risk')],im:['caution',FX_SR.replace('this','ongoing infection or high infection risk')],il1:['avoid','EULAR 2016: current infection is a contraindication to IL-1 blockers; the canakinumab label says avoid during an active infection needing treatment. [[Richette2017,IlarisPIG]]']}}
};
inits.flarerx=()=>{
  const svg=$('#fxSvg'),rg=$('#fxT'),sr=$('#fxS');
  /* schematic curves, hours 0–168 */
  const U=h=>h<=0?0:h<14?8*Math.pow(h/14,.7):8*Math.exp(-(h-14)/140);
  const EFF={6:.72,12:.66,24:.56,36:.46,72:.3};
  const Tc=(h,s)=>U(h)*(1-EFF[s]*ease(ramp(h,s,s+40)));
  const r=rng(31);const NE=Array.from({length:12},()=>({a:r()*6.283,d:14+r()*22,ph:r()}));
  const foot=`M8 92 C6 70 20 60 44 58 L96 50 C118 46 136 50 144 62 C150 74 140 84 124 86 L64 96 C40 102 18 104 8 92 Z`;
  function panel(x,y,sc,pain,title,col,pill,h){const p=clamp(pain/8);
    let s=`<text x="${x}" y="${y-10}" class="t-sm" style="fill:${col}">${title}</text>`;
    s+=`<g transform="translate(${x} ${y}) scale(${sc})">`;
    s+=`<path d="${foot}" style="fill:var(--cyto);stroke:var(--memb);stroke-width:1.4"/>`;
    s+=`<circle cx="112" cy="66" r="${f1(12+18*p)}" style="fill:var(--terra);opacity:${f1(.08+.42*p)}"/>`;
    s+=`<circle cx="112" cy="66" r="10" style="fill:var(--panel);stroke:var(--memb);stroke-width:1.2"/>`;
    s+=needle(108,63,12,-30)+needle(115,68,10,25)+needle(112,61,8,70);
    NE.forEach((n,i)=>{const on=clamp(p*1.3-i/NE.length*.9);if(on<=0)return;const a=n.a+Math.sin(h/9+n.ph*6)*.15;s+=neutro(112+Math.cos(a)*n.d,66+Math.sin(a)*n.d*.7,4.2,clamp(on*2))});
    if(pill)s+=`<g transform="translate(22 30)"><rect x="-10" y="-5" width="20" height="10" rx="5" style="fill:var(--sea)"/><line x1="0" x2="0" y1="-5" y2="5" style="stroke:var(--panel);stroke-width:1"/></g>`;
    s+=`</g>`;
    s+=`<text x="${x}" y="${f1(y+112*sc+16)}" class="t-xs">pain ${f1(pain)}/10 · schematic</text>`;
    return s}
  function draw(u){
    const N=vb(svg,'720 420','400 572');
    const sIdx=+sr.value,S=FX_START[sIdx],h=u*168;
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    // the two feet
    if(N){s+=panel(14,42,1.18,U(h),'UNTREATED','var(--terra)',false,h)+panel(208,42,1.18,Tc(h,S),`TREATED FROM ${S} h`,'var(--sea)',h>=S,h)}
    else{s+=panel(30,40,1.5,U(h),'UNTREATED','var(--terra)',false,h)+panel(30,248,1.5,Tc(h,S),`TREATED FROM ${S} h`,'var(--sea)',h>=S,h)}
    // chart
    const X0=N?44:396,X1=N?384:704,Y0=N?520:330,Y1=N?270:60,xh=v=>lerp(X0,X1,v/168),yp=v=>lerp(Y0,Y1,v/10);
    // guideline windows along the top of the chart
    [[12,'12 h','var(--crocus)'],[24,'24 h','var(--sea)'],[36,'36 h','var(--muted)']].forEach(([w,l,c],i)=>{
      s+=`<rect x="${X0}" y="${Y1-22+i*6}" width="${f1(xh(w)-X0)}" height="4" rx="2" style="fill:${c};opacity:.55"/>`});
    s+=`<text x="${f1(xh(36)+6)}" y="${Y1-10}" class="t-xs">${N?'windows: 12 · 24 · 36 h':'windows: 12 h EULAR · 24/36 h ACR 2012'}</text>`;
    for(let v=0;v<=10;v+=2)s+=`<line x1="${X0}" x2="${X1}" y1="${f1(yp(v))}" y2="${f1(yp(v))}" class="grid"/><text x="${X0-6}" y="${f1(yp(v)+3)}" class="t-xs t-end">${v}</text>`;
    for(let d=0;d<=7;d++)s+=`<text x="${f1(xh(d*24))}" y="${Y0+16}" class="t-xs t-mid">${d}</text>`;
    s+=`<text x="${X1}" y="${Y0+32}" class="t-xs t-end">days from onset</text><text x="${X0-30}" y="${Y1-34}" class="t-xs">pain 0–10</text>`;
    s+=`<text x="${X1}" y="${f1(Y1+14)}" class="t-sm t-end" style="fill:var(--warn)">SCHEMATIC</text><text x="${X1}" y="${f1(Y1+27)}" class="t-xs t-end" style="fill:var(--warn)">no trial randomised start times</text>`;
    // start marker
    const xs=xh(S);s+=`<line x1="${f1(xs)}" x2="${f1(xs)}" y1="${Y1}" y2="${Y0}" style="stroke:var(--sea);stroke-width:1.4;stroke-dasharray:4 4"/><rect x="${f1(xs-9)}" y="${Y0-14}" width="18" height="9" rx="4.5" style="fill:var(--sea)"/>`;
    // curves: ghost the whole week, draw solid up to the scrubber
    const fu=v=>U(v*168)/10,ft=v=>Tc(v*168,S)/10;
    [[fu,'var(--terra)'],[ft,'var(--sea)']].forEach(([fn,c])=>{
      s+=`<path d="${pathFn(fn,X0,X1,Y0,Y1)}" style="fill:none;stroke:${c};stroke-width:1.3;opacity:.3"/>`;
      s+=`<path d="${pathFn(v=>v<=u?fn(v):NaN,X0,X1,Y0,Y1).replace(/[ML][^ML]*NaN[^ML]*/g,'')}" style="fill:none;stroke:${c};stroke-width:3"/>`;
      s+=`<circle cx="${f1(xh(h))}" cy="${f1(lerp(Y0,Y1,fn(u)))}" r="5" style="fill:${c}"/>`});
    // labels on the curves
    s+=`<text x="${f1(xh(100))}" y="${f1(yp(U(100))-8)}" class="t-xs" style="fill:var(--terra)">untreated</text><text x="${f1(xh(100))}" y="${f1(yp(Tc(100,S))+16)}" class="t-xs" style="fill:var(--sea)">treated from ${S} h</text>`;
    // the one real anchor
    const bx=xh(168),by=yp(U(168));s+=`<circle cx="${f1(bx)}" cy="${f1(by)}" r="6" style="fill:none;stroke:var(--ink);stroke-width:1.4"/><text x="${f1(bx-8)}" y="${f1(by-52)}" class="t-xs t-end" style="fill:var(--ink)">day 7: pain gone in 3 of 9</text><text x="${f1(bx-8)}" y="${f1(by-40)}" class="t-xs t-end">untreated (Bellamy 1987)</text>`;
    s+=`<line x1="${f1(xh(h))}" x2="${f1(xh(h))}" y1="${Y1}" y2="${Y0}" style="stroke:var(--ink);opacity:.2"/>`;
    svg.innerHTML=s;
    $('#fxSOut').textContent=S+' h';
    const area=(f)=>{let a=0;for(let i=0;i<=168;i++)a+=f(i);return a};
    const red=Math.round(100*(1-area(v=>Tc(v,S))/area(U)));
    $('#fxRead').innerHTML=`<span>day <b>${f1(h/24)}</b></span><span>untreated pain <b>${f1(U(h))}</b></span><span>treated pain <b>${f1(Tc(h,S))}</b></span><span>start <b>${S} h</b></span><span>week's pain area cut by <b>${red}%</b> (schematic)</span>`;
    const p=phaseOf(FX_STEPS,u);setSt(p);$('#fxNote').innerHTML=noteHTML(FX_STEPS[p]);
  }
  const stop=playWire(rg,$('#fxPlay'),draw,16000,'Replay','flarerx');
  const setSt=stepWire($('#fxSteps'),FX_STEPS,rg,draw,stop);
  sr.addEventListener('input',()=>draw(+rg.value));
  draw(+rg.value);

  /* ---- trial bars ---- */
  const bs=$('#fxBars'),br=$('#fxB');let trial='agree';
  const FX_TR={
   agree:{arms:[['low dose 1.8 mg','var(--crocus)'],['high dose 4.8 mg','var(--bad)'],['placebo','var(--muted)']],
    head:'AGREE · 184 people randomised within 12 h of onset',
    g:[['≥ 50% pain relief','at 24 h, no rescue',['37.8','32.7','15.5']],['rescue medicine','within 24 h',['31.1','34.6','50.0']],['diarrhoea','any',['23.0','76.9','14']],['severe diarrhoea','',['0','19.2',null]],['vomiting','',['0','17.3','0']]],
    cap:'AGREE: the primary end point was ≥ 50% pain reduction at 24 h without rescue medicine (P = 0.005 low dose and P = 0.034 high dose vs placebo). Placebo diarrhoea (8 of 59, 14%) is from the US label table; no severe-diarrhoea figure is given for placebo. [[Terkeltaub2010,FDA-Colcrys]]'},
   contact:{arms:[['naproxen','var(--sea)'],['colchicine 0.5 mg ×3/day','var(--crocus)']],
    head:'CONTACT · 399 adults, 100 UK general practices, open label',
    g:[['pain fully gone','by day 7',['67.3','67.1']],['diarrhoea','days 1–7',['20.0','45.9']],['headache','days 1–7',['10.7','20.5']],['constipation','days 1–7',['19.3','4.8']]],
    cap:'CONTACT: naproxen 750 mg then 250 mg every 8 h for 7 days vs colchicine 0.5 mg three times daily for 4 days. Pain change over days 1–7 did not differ (mean difference −0.18, P = 0.32); median time to resolution 5 vs 6 days. The authors favoured naproxen first in primary care when there are no contraindications. [[Roddy2020]]'}
  };
  const wrapT=(txt,n)=>{const ws=String(txt).split(' '),o=[];let l='';ws.forEach(w=>{if(l&&(l+' '+w).length>n){o.push(l);l=w}else l=l?l+' '+w:w});if(l)o.push(l);return o};
  function drawB(t){
    const T=FX_TR[trial],na=T.arms.length;
    let s='';
    if(vb(bs,'720 330','400 '+(70+T.g.length*(26+na*18)+20))){
      const X0=14,X1=330;let y=24;
      s+=`<rect width="100%" height="100%" style="fill:var(--field)"/><text x="14" y="${y}" class="t-sm" style="fill:var(--crocus)">${wrapT(T.head,46)[0]}</text>`;
      wrapT(T.head,46).slice(1).forEach(l=>{y+=14;s+=`<text x="14" y="${y}" class="t-sm" style="fill:var(--crocus)">${l}</text>`});
      y+=26;
      T.g.forEach((g,i)=>{const k=ease(ramp(t,i*.12,i*.12+.45));
        s+=`<text x="14" y="${y}" class="t-xs" style="fill:var(--ink)">${g[0]}${g[1]?' · '+g[1]:''}</text>`;
        g[2].forEach((v,j)=>{const by=y+6+j*18;if(v==null){s+=`<text x="${X0}" y="${by+11}" class="t-xs">${T.arms[j][0]}: not reported</text>`;return}
          const w=(X1-X0)*(+v)/100*k;s+=`<rect x="${X0}" y="${by}" width="${f1(Math.max(w,+v===0?2:0))}" height="13" rx="3" style="fill:${T.arms[j][1]}"/><text x="${f1(X0+w+6)}" y="${by+10}" class="t-xs" style="fill:${T.arms[j][1]};font-weight:700;opacity:${f1(ramp(k,.5,1))}">${v}%</text>`});
        y+=26+na*18});
      bs.innerHTML=s;
    }else{
      const AX0=60,AX1=704,AY=250,ATOP=56,pc=v=>AY-(AY-ATOP)*v/100;
      s+=`<rect width="100%" height="100%" style="fill:var(--field)"/><text x="14" y="28" class="t-sm" style="fill:var(--crocus)">${T.head}</text>`;
      [0,25,50,75,100].forEach(v=>s+=`<line x1="${AX0}" x2="${AX1}" y1="${f1(pc(v))}" y2="${f1(pc(v))}" class="grid"/><text x="${AX0-8}" y="${f1(pc(v)+3)}" class="t-xs t-end">${v}%</text>`);
      s+=`<line x1="${AX0}" x2="${AX1}" y1="${AY}" y2="${AY}" class="axis"/>`;
      const gw=(AX1-AX0)/T.g.length,bw=na>2?30:40;
      T.g.forEach((g,i)=>{const cx=AX0+gw*(i+.5),k=ease(ramp(t,i*.12,i*.12+.45));
        g[2].forEach((v,j)=>{const x=cx-(na*bw+6*(na-1))/2+j*(bw+6);
          if(v==null){s+=`<text x="${f1(x+bw/2)}" y="${AY-6}" class="t-xs t-mid">n/r</text>`;return}
          const hh=(AY-ATOP)*(+v)/100*k;s+=`<rect x="${f1(x)}" y="${f1(AY-hh)}" width="${bw}" height="${f1(Math.max(hh,+v===0?1.5:0))}" rx="3" style="fill:${T.arms[j][1]}"/><text x="${f1(x+bw/2)}" y="${f1(AY-hh-6)}" class="t-xs t-mid" style="fill:${T.arms[j][1]};font-weight:700;opacity:${f1(ramp(k,.5,1))}">${v}</text>`});
        s+=`<text x="${f1(cx)}" y="${AY+18}" class="t-xs t-mid" style="fill:var(--ink)">${g[0]}</text><text x="${f1(cx)}" y="${AY+31}" class="t-xs t-mid">${g[1]}</text>`});
      s+=`<text x="14" y="${AY+60}" class="t-xs">% of each arm · n/r = not reported</text>`;
      bs.innerHTML=s;
    }
    $('#fxLegend').innerHTML=T.arms.map(a=>`<span><i style="background:${a[1]}"></i>${a[0]}</span>`).join('');
  }
  const bstop=playWire(br,$('#fxBPlay'),drawB,6000,'Replay','flarerx');
  function setTrial(k){trial=k;$$('#fxTrials [data-trial]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.trial===k));$('#fxBCap').innerHTML=FX_TR[k].cap;bstop();br.value=1;drawB(1)}
  $('#fxTrials').addEventListener('click',e=>{const b=e.target.closest('[data-trial]');if(b)setTrial(b.dataset.trial)});
  setTrial('agree');

  /* ---- comorbidity chooser ---- */
  const on=new Set();
  $('#fxConds').innerHTML='<span class="kicker">Conditions</span>'+Object.entries(FX_CONDS).map(([k,c])=>`<button class="btn" data-cond="${k}" aria-pressed="false">${c.n}</button>`).join('');
  function drawOpts(){
    let flaggedFirst=0;
    $('#fxOpts').innerHTML=FX_OPTS.map(o=>{const fl=[];on.forEach(k=>{const f=FX_CONDS[k].f[o.id];if(f)fl.push([k,...f])});
      const st=fl.some(f=>f[1]==='avoid')?'avoid':fl.length?'caution':'clear';
      if(o.tag==='first line'&&st!=='clear')flaggedFirst++;
      return `<div class="card fx-opt" data-state="${st}"><span class="tag ${o.tc}">${o.tag}</span><h4>${o.n}</h4>${fl.length?`<ul class="fx-flags">${fl.map(f=>`<li class="${f[1]}"><b>${f[1]==='avoid'?'Avoid':'Caution'} · ${FX_CONDS[f[0]].n}</b>${f[2]}</li>`).join('')}</ul>`:''}<p>${o.b}</p></div>`}).join('');
    const nOn=on.size;
    $('#fxSum').innerHTML=!nOn?'<b class="big">5 of 5</b>first-line options open. Switch on a condition above to see what the guidance flags.'
      :flaggedFirst===5?'<b class="big">0 of 5</b>first-line options without a flag. When every first-line option is contraindicated, not tolerated or ineffective, ACR 2020 conditionally recommends IL-1 inhibition, and NICE allows IL-1 inhibitors only when NSAIDs, colchicine and corticosteroids are contraindicated, not tolerated or ineffective. [[FitzGerald2020,NICE-NG219]]'
      :`<b class="big">${5-flaggedFirst} of 5</b>first-line options unflagged. ACR 2020: the choice among first-line options is driven by patient factors. [[FitzGerald2020]]`;
  }
  $('#fxConds').addEventListener('click',e=>{const b=e.target.closest('[data-cond]');if(!b)return;const k=b.dataset.cond;on.has(k)?on.delete(k):on.add(k);b.setAttribute('aria-pressed',on.has(k));drawOpts()});
  drawOpts();
};
