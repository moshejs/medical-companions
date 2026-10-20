
/* =============== 1.1 what =============== */
const WH_STEPS=[
 {from:0,at:.08,k:'Step 1 · The umbrella',t:'Dementia is a syndrome',
  txt:'Dementia is a clinical syndrome: problems with memory and thinking that interfere with everyday tasks such as driving, cooking or cleaning. The word describes what is happening, not why. [[AA2025Facts]]',
  pt:'Dementia is a name for a set of problems, a bit like the word "fever". Several different diseases can cause it.',
  hook:'Dementia is the syndrome. Alzheimer\'s disease is its most common cause.'},
 {from:.15,at:.31,k:'Step 2 · Many causes',t:'Several diseases sit under the umbrella',
  txt:'Alzheimer\'s disease is the most common cause. Others include cerebrovascular disease, frontotemporal degeneration and Lewy body disease. [[AA2025Facts]] The differences are covered in <a href="#ddx" data-go="ddx">The differential</a>.',
  pt:'Strokes and damage to small blood vessels, Lewy bodies and frontotemporal disease can all cause dementia too.'},
 {from:.38,at:.5,k:'Step 3 · The largest share',t:'How much of dementia is Alzheimer\'s?',
  txt:'The Alzheimer\'s Association estimates that Alzheimer\'s disease accounts for 60% to 80% of dementia cases. The WHO fact sheet gives a lower 60% to 70%. The two sources agree on the bottom of the range and differ at the top. [[AA2025Facts,WHO2026Dementia]]',
  pt:'Most people with dementia have Alzheimer\'s disease: somewhere between six and eight in every ten, depending on which source you read.',
  hook:'Two figures circulate: 60–80% (Alzheimer\'s Association) and 60–70% (WHO). Quote the source with the number.'},
 {from:.58,at:.71,k:'Step 4 · Mixed is common',t:'Many brains have more than one cause',
  txt:'In the first 141 autopsies of the Rush Memory and Aging Project, 50 people had dementia: 38% had Alzheimer\'s plus infarcts, 30% pure Alzheimer\'s, 12% vascular dementia and 12% Alzheimer\'s plus Parkinson or Lewy body disease. Having several pathologies went with about 2.8 times the odds of dementia. [[Schneider2007]] At US research centres more than half of people diagnosed with Alzheimer\'s dementia had mixed dementia; the share is higher in community studies and most common at 85 and over. [[AA2025Facts]]',
  pt:'When brains are examined after death, many people turn out to have Alzheimer\'s changes plus something else, most often small strokes.',
  hook:'Mixed pathology is now considered the most frequent cause of dementia in the oldest old. [[BermejoPareja2024]]'},
 {from:.8,at:.94,k:'Step 5 · Changes without symptoms',t:'Alzheimer\'s brain changes without dementia',
  txt:'In the same cohort, 24.2% of people who did not have dementia had pure Alzheimer\'s pathology at autopsy. Brain changes and symptoms are not the same thing. [[Schneider2007]] The long silent phase is in <a href="#cascade" data-go="cascade">Twenty years before symptoms</a>.',
  pt:'Some people have Alzheimer\'s changes in the brain and never show dementia in life.'}
];
const WH_AGE=[
 {from:0,at:.3,k:'Under 65',t:'Younger-onset dementia exists',
  txt:'About 110 per 100,000 Americans aged 30 to 64, roughly 200,000 people, are thought to have younger-onset dementia from any cause. [[AA2025Facts]] Worldwide the estimate is 119 per 100,000 at ages 30 to 64, about 3.9 million people. [[Hendriks2021]] Early-onset Alzheimer\'s is about 5% of all Alzheimer\'s. Most cases are not familial, the diagnosis comes about 1.6 years later on average than in older people, and non-memory presentations are more common. [[Mendez2017]] Autosomal-dominant Alzheimer\'s is under 1% of all cases. [[Bateman2011]]',
  pt:'Alzheimer\'s can start before 65, but it is uncommon at these ages, and most early cases are not passed down directly in families.',
  hook:'In early-onset Alzheimer\'s about 14.2% have a dominant family history, but only about 1.6% carry an APP, PSEN1 or PSEN2 mutation. [[Mendez2017]]'},
 {from:.5,at:.62,k:'Ages 65 to 74',t:'5.1% at 65 to 74',
  txt:'5.1% of Americans aged 65 to 74 have Alzheimer\'s dementia. In the CHAP estimates for 2011, about 0.4% of this age group developed it each year. [[AA2025Facts]]',
  pt:'About 5 people in every 100 in their late sixties and early seventies.'},
 {from:.643,at:.76,k:'Ages 75 to 84',t:'13.2% at 75 to 84',
  txt:'13.2% of Americans aged 75 to 84 have Alzheimer\'s dementia, and about 3.2% develop it each year. Of the 7.2 million older Americans living with it, 74% are 75 or older. [[AA2025Facts]]',
  pt:'About 13 people in every 100 in their late seventies and early eighties.'},
 {from:.786,at:.97,k:'85 and over',t:'33.4% at 85 and over',
  txt:'33.4% of Americans aged 85 and older have Alzheimer\'s dementia, and about 7.6% develop it each year. The report calls age the greatest of three risk factors; the other two are APOE e4 and family history. [[AA2025Facts]]',
  pt:'About one in three people aged 85 or older. Age is the biggest risk factor, but most older people do not have Alzheimer\'s dementia.',
  hook:'5.1% → 13.2% → 33.4%: the share rises about two and a half times with each age band after 65.'}
];
inits.what=()=>{
  /* ---- 1. the umbrella ---- */
  const svg=$('#whSvg'),rg=$('#whT');
  const CAUSES=[ // umbrella-space coordinates (wide frame); narrow shifts the whole group
   {k:'ad',x:160,y:225,r:105,a:.15},
   {k:'vas',x:290,y:190,r:60,a:.2},
   {k:'lewy',x:270,y:305,r:48,a:.24},
   {k:'ftd',x:345,y:88,r:30,a:.27},
   {k:'oth',x:362,y:322,r:22,a:.3}];
  const WAF=[['adinf',19],['ad',15],['vas',6],['adlewy',6],['rest',4]];
  function dot(x,y,kind,o){
    const op=`opacity:${f1(o)}`,full=c=>`<circle cx="${f1(x)}" cy="${f1(y)}" r="7" style="fill:${c};${op}"/>`;
    const half=(c1,c2)=>`<path d="M${f1(x)} ${f1(y-7)} A7 7 0 0 0 ${f1(x)} ${f1(y+7)} Z" style="fill:${c1};${op}"/><path d="M${f1(x)} ${f1(y-7)} A7 7 0 0 1 ${f1(x)} ${f1(y+7)} Z" style="fill:${c2};${op}"/>`;
    if(kind==='adinf')return half('var(--rose)','var(--vessel)');
    if(kind==='ad')return full('var(--rose)');
    if(kind==='vas')return full('var(--vessel)');
    if(kind==='adlewy')return half('var(--rose)','var(--violet)');
    return `<circle cx="${f1(x)}" cy="${f1(y)}" r="6" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.2;${op}"/>`;
  }
  function draw(t){
    const N=vb(svg,'720 410','400 800');
    const L=N?{ux:-8,uy:0,px:-406,py:400}:{ux:0,uy:0,px:0,py:0};
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    /* umbrella */
    const reg=ease(ramp(t,0,.1));
    s+=`<g transform="translate(${L.ux} ${L.uy})">`;
    s+=`<defs><clipPath id="whAdClip"><circle cx="160" cy="225" r="105"/></clipPath></defs>`;
    s+=`<rect x="20" y="34" width="380" height="340" rx="26" style="fill:var(--panel);stroke:var(--ink);stroke-width:2;opacity:${f1(reg)}"/>`;
    s+=`<text x="40" y="64" class="t-big" style="opacity:${f1(reg)}">DEMENTIA</text>`;
    s+=`<text x="40" y="81" class="t-xs" style="opacity:${f1(reg)}">a syndrome with many possible causes</text>`;
    CAUSES.forEach(c=>{const g=ease(ramp(t,c.a,c.a+.06));if(g<=0)return;
      const isAd=c.k==='ad',stroke=isAd?'var(--rose)':c.k==='vas'?'var(--vessel)':c.k==='lewy'?'var(--violet)':'var(--muted)';
      const fill=isAd?'var(--rose-soft)':'var(--panel-2)';
      s+=`<circle cx="${c.x}" cy="${c.y}" r="${f1(c.r*g)}" style="fill:${fill};stroke:${stroke};stroke-width:${isAd?2.4:1.8};fill-opacity:${isAd?1:.85}"/>`});
    // overlaps = mixed pathology (step 4)
    const mix=ramp(t,.58,.68);
    if(mix>0)s+=`<g clip-path="url(#whAdClip)" style="opacity:${f1(mix)}"><circle cx="290" cy="190" r="60" style="fill:var(--vessel);opacity:.45"/><circle cx="270" cy="305" r="48" style="fill:var(--violet);opacity:.45"/></g>`;
    // labels, drawn over the shapes
    const lab=(a,str)=>{const o=ramp(t,a+.03,a+.07);return o>0?str.replace('OP',f1(o)):''};
    s+=lab(.15,`<text x="150" y="214" class="t-lbl t-mid" style="opacity:OP">Alzheimer's disease</text>`);
    const sh=ramp(t,.4,.48);
    if(sh>0)s+=`<text x="150" y="234" class="t-sm t-mid" style="fill:var(--rose);opacity:${f1(sh)}">60–80% or 60–70%</text><text x="150" y="250" class="t-xs t-mid" style="opacity:${f1(sh)}">of dementia</text>`;
    s+=lab(.2,`<text x="312" y="186" class="t-sm t-mid" style="fill:var(--ink);opacity:OP">vascular</text>`);
    s+=lab(.24,`<text x="281" y="314" class="t-sm t-mid" style="fill:var(--ink);opacity:OP">Lewy body</text>`);
    s+=lab(.27,`<text x="345" y="85" class="t-xs t-mid" style="fill:var(--ink);opacity:OP">fronto-</text><text x="345" y="96" class="t-xs t-mid" style="fill:var(--ink);opacity:OP">temporal</text>`);
    s+=lab(.3,`<text x="362" y="325" class="t-xs t-mid" style="fill:var(--ink);opacity:OP">other</text>`);
    if(mix>0)s+=`<text x="20" y="396" class="t-xs" style="opacity:${f1(mix)}">Shaded overlaps: mixed pathology, more than one cause</text>`;
    s+='</g>';
    /* right panel: shares, autopsy dots, pathology without dementia */
    s+=`<g transform="translate(${L.px} ${L.py})">`;
    const a1=ramp(t,.38,.46),X=p=>430+p*2.6;
    if(a1>0){const g=ease(ramp(t,.4,.5));
      s+=`<g style="opacity:${f1(a1)}"><text x="430" y="44" class="t-sm">SHARE OF DEMENTIA DUE TO ALZHEIMER'S</text>`;
      [['Alzheimer\'s Association: 60–80%',66,80],['WHO fact sheet: 60–70%',102,70]].forEach(([l,y,hi])=>{
        s+=`<text x="430" y="${y}" class="t-xs" style="fill:var(--ink)">${l}</text><rect x="430" y="${y+6}" width="260" height="12" rx="4" style="fill:var(--panel-2)"/>`;
        s+=`<rect x="${f1(X(60))}" y="${y+6}" width="${f1((hi-60)*2.6*g)}" height="12" rx="3" style="fill:var(--rose)"/>`});
      s+=`<line x1="${f1(X(60))}" x2="${f1(X(60))}" y1="70" y2="126" class="grid"/>`;
      [[0,'0'],[50,'50%'],[100,'100%']].forEach(([p,l],i)=>s+=`<text x="${f1(X(p))}" y="140" class="t-xs ${i===0?'':i===2?'t-end':'t-mid'}">${l}</text>`);
      s+='</g>'}
    const a2=ramp(t,.58,.64);
    if(a2>0){const n=Math.floor(50*ramp(t,.6,.74)+.001);
      s+=`<g style="opacity:${f1(a2)}"><text x="430" y="168" class="t-sm">AUTOPSY: 50 PEOPLE WITH DEMENTIA</text>`;
      let i=0;WAF.forEach(([k,c])=>{for(let j=0;j<c;j++,i++){const col=i%10,row=Math.floor(i/10);
        s+=i<n?dot(440+col*20,186+row*20,k,1):`<circle cx="${440+col*20}" cy="${186+row*20}" r="6" style="fill:none;stroke:var(--line);stroke-width:1.2"/>`}});
      const LG=[['adinf','AD + infarcts 38%',430,292],['ad','pure AD 30%',430,310],['vas','vascular 12%',430,328],['adlewy','AD + Lewy body 12%',570,292],['rest','remaining 8%',570,310]];
      LG.forEach(([k,l,x,y])=>{s+=dot(x+7,y-4,k,1)+`<text x="${x+19}" y="${y}" class="t-xs" style="fill:var(--ink)">${l}</text>`});
      s+='</g>'}
    const a3=ramp(t,.8,.88);
    if(a3>0){const g=ease(ramp(t,.82,.92));
      s+=`<g style="opacity:${f1(a3)}"><text x="430" y="356" class="t-sm">NO DEMENTIA, YET PURE AD AT AUTOPSY</text>`;
      s+=`<rect x="430" y="364" width="260" height="12" rx="4" style="fill:var(--panel-2)"/><rect x="430" y="364" width="${f1(24.2*2.6*g)}" height="12" rx="3" style="fill:var(--rose)"/>`;
      s+=`<text x="430" y="392" class="t-xs" style="fill:var(--ink)">24.2% of people without dementia</text></g>`}
    s+='</g>';
    svg.innerHTML=s;
    const p=phaseOf(WH_STEPS,t);setSt(p);$('#whNote').innerHTML=noteHTML(WH_STEPS[p]);
  }
  const stop=playWire(rg,$('#whPlay'),draw,15000,'Replay','what');
  const setSt=stepWire($('#whSteps'),WH_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- 2. age bands ---- */
  const ag=$('#whAge'),ar=$('#whAgeT');let inc=false;
  const BANDS=[
   {lab:'30–64',a:30,b:65,prev:.11,inc:null,pv:'110 per 100,000',pl:'all causes of dementia',iv:'not given',il:'no yearly figure here'},
   {lab:'65–74',a:65,b:75,prev:5.1,inc:.4,pv:'5.1%',pl:'have Alzheimer\'s dementia',iv:'0.4%',il:'develop it each year'},
   {lab:'75–84',a:75,b:85,prev:13.2,inc:3.2,pv:'13.2%',pl:'have Alzheimer\'s dementia',iv:'3.2%',il:'develop it each year'},
   {lab:'85+',a:85,b:100,prev:33.4,inc:7.6,pv:'33.4%',pl:'have Alzheimer\'s dementia',iv:'7.6%',il:'develop it each year'}];
  function person(x,y,style){return `<circle cx="${f1(x)}" cy="${f1(y-7)}" r="3.2" style="${style}"/><path d="M${f1(x-5)} ${f1(y+9)} v-6 a5 5 0 0 1 10 0 v6 z" style="${style}"/>`}
  function drawAge(t){
    const N=vb(ag,'720 400','400 690');
    const L=N?{pw:185,ph:292,pos:i=>[10+(i%2)*195,16+Math.floor(i/2)*308],rx0:24,rx1:376,ry:650}
             :{pw:165,ph:292,pos:i=>[20+i*175,24],rx0:30,rx1:690,ry:352};
    const age=lerp(30,100,t);
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    BANDS.forEach((B,i)=>{
      const [x0,y0]=L.pos(i),cx=x0+L.pw/2,here=age>=B.a&&(age<B.b||i===3);
      const prog=ease(ramp(age,B.a,B.a+(i===3?10:(B.b-B.a)*.7)));
      const val=inc?B.inc:B.prev,cnt=val==null?0:val*prog;
      s+=`<rect x="${x0}" y="${y0}" width="${L.pw}" height="${L.ph}" rx="12" style="fill:var(--panel);stroke:${here?'var(--rose)':'var(--line)'};stroke-width:${here?2:1}"/>`;
      s+=`<text x="${f1(cx)}" y="${y0+26}" class="t-big t-mid">${B.lab}</text>`;
      const gx=cx-75+7.5;
      for(let k=0;k<100;k++){const col=k%10,row=9-Math.floor(k/10),x=gx+col*15,y=y0+50+row*21;
        s+=person(x,y,'fill:var(--cell-line);opacity:.32');
        const f=clamp(cnt-k);
        if(f>=1)s+=person(x,y,'fill:var(--rose)');
        else if(f>0){s+=`<clipPath id="whPc${i}"><rect x="${f1(x-6)}" y="${f1(y-11)}" width="${f1(12*f)}" height="22"/></clipPath><g clip-path="url(#whPc${i})">${person(x,y,'fill:var(--rose)')}</g>`}}
      const o=f1(Math.max(prog,.0));
      if(prog>0){s+=`<text x="${f1(cx)}" y="${y0+266}" class="t-big t-mid" style="fill:${val==null?'var(--muted)':'var(--rose)'};opacity:${o}">${inc?B.iv:B.pv}</text>`;
        s+=`<text x="${f1(cx)}" y="${y0+283}" class="t-xs t-mid" style="opacity:${o}">${inc?B.il:B.pl}</text>`}
      else s+=`<text x="${f1(cx)}" y="${y0+266}" class="t-xs t-mid">age band not reached</text>`});
    // age ruler
    const RX=a=>lerp(L.rx0,L.rx1,(a-30)/70),ry=L.ry;
    s+=`<line x1="${L.rx0}" x2="${L.rx1}" y1="${ry}" y2="${ry}" style="stroke:var(--line);stroke-width:6;stroke-linecap:round"/>`;
    s+=`<line x1="${L.rx0}" x2="${f1(RX(age))}" y1="${ry}" y2="${ry}" style="stroke:var(--rose);stroke-width:6;stroke-linecap:round"/>`;
    [30,65,75,85,100].forEach((a,i)=>{s+=`<line x1="${f1(RX(a))}" x2="${f1(RX(a))}" y1="${ry+5}" y2="${ry+10}" class="axis"/><text x="${f1(RX(a))}" y="${ry+24}" class="t-xs ${i===0?'':i===4?'t-end':'t-mid'}">${a}</text>`});
    const mx=RX(age),lx=clamp(mx,L.rx0+24,L.rx1-24);
    s+=`<path d="M${f1(mx)} ${ry-5} l-6 -9 h12 z" style="fill:var(--ink)"/><text x="${f1(lx)}" y="${ry-18}" class="t-sm t-mid" style="fill:var(--ink)">age ${Math.round(age)}</text>`;
    ag.innerHTML=s;
    const p=phaseOf(WH_AGE,t);setAge(p);
    let P=WH_AGE[p];
    $('#whAgeNote').innerHTML=noteHTML(P);
    ag.setAttribute('aria-label',inc?'Four groups of 100 people by age band fill in with the share who develop Alzheimer\'s dementia each year in the US: no yearly figure under 65, 0.4 at 65 to 74, 3.2 at 75 to 84 and 7.6 at 85 and over, as an age marker moves from 30 to 100.':'Four groups of 100 people by age band fill in with the share who have Alzheimer\'s dementia in the US: very few under 65, 5.1 at 65 to 74, 13.2 at 75 to 84 and 33.4 at 85 and over, as an age marker moves from 30 to 100.');
    $('#whAgeCap').textContent=inc?'New cases each year per 100 people in the band (CHAP estimates for 2011). Each figure is 1 person in 100.':'Share living with Alzheimer\'s dementia (US, 2025). Under 65: younger-onset dementia from any cause. Each figure is 1 person in 100.';
  }
  const stopA=playWire(ar,$('#whAgePlay'),drawAge,13000,'Replay','what');
  const setAge=stepWire($('#whAgeSteps'),WH_AGE,ar,drawAge,stopA);
  const setMode=v=>{inc=v;$('#whPrev').setAttribute('aria-pressed',!v);$('#whInc').setAttribute('aria-pressed',v);drawAge(+ar.value)};
  $('#whPrev').onclick=()=>setMode(false);
  $('#whInc').onclick=()=>setMode(true);
  drawAge(+ar.value);
};
