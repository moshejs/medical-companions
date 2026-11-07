/* =============== 3.2 diagnosis & criteria =============== */
const DX_GT={
 conf:`<b>Confirmatory genotype:</b> pathogenic or likely pathogenic <i>MEFV</i> variants on both copies, either the same variant twice (homozygous) or two different ones in trans (compound heterozygous). Rule: at least <b>1</b> of the 4 clinical items. [[Gattorno2019,Lancieri2023]]`,
 non:`<b>Non-confirmatory genotype:</b> one pathogenic variant plus one variant of uncertain significance (VUS) in trans, two VUS, or a single heterozygous pathogenic variant. Rule: at least <b>2</b> of the 4 clinical items. [[Gattorno2019,Lancieri2023]]`,
 none:`<b>None or not tested:</b> only the clinical-only arm applies (at least 6 of 9). Benign and likely-benign variants never count, and variant classes are meant to follow INSAID/Infevers. [[Gattorno2019,VanGijn2018]]`
};
const DX_EX={
 typ:{pre:[1,1],gt:'conf',ci:['ep','abd','chest','eth'],ab:[]},
 het:{pre:[1,1],gt:'non',ci:['ep','abd'],ab:['aph']},
 pfapa:{pre:[1,1],gt:'none',ci:[],ab:['aph','ln']},
 clr:{pre:[0,0],gt:'none',ci:[],ab:[]}
};
function dxBars(rows){
  return rows.map(r=>`<div class="dx-pr"><span class="lbl">${r.l}</span><div class="dx-bars">
    ${r.s!=null?`<span>sens</span><i><b style="width:${(r.s*100).toFixed(1)}%;background:var(--terra)"></b></i><span>${r.st||Math.round(r.s*1000)/10+'%'}</span>`:''}
    ${r.p!=null?`<span>spec</span><i><b style="width:${(r.p*100).toFixed(1)}%;background:var(--sea)"></b></i><span>${r.pt||Math.round(r.p*1000)/10+'%'}</span>`:''}</div></div>`).join('');
}
const DX_CRIT={
 th:{name:'Tel Hashomer',
  groups:[{k:'M',lg:'Major criteria',cls:'',items:['Recurrent febrile episodes with peritonitis, synovitis or pleuritis','AA amyloidosis without a predisposing disease','Favourable response to continuous colchicine']},
          {k:'m',lg:'Minor criteria',cls:'mn',items:['Recurrent febrile episodes','Erysipelas-like erythema','FMF in a first-degree relative']}],
  def:`Drawn from the 1967 Tel Hashomer survey and later summaries. Definite FMF needs <b>2 major</b>, or <b>1 major + 2 minor</b>. [[Sohar1967,Pras1998,Lancieri2023]]`,
  judge(c){const M=c.M,m=c.m;if(M>=2||(M>=1&&m>=2))return['yes','Definite FMF by Tel Hashomer',`${M} major + ${m} minor.`];
    if(M>=1&&m>=1)return['na','"Probable" FMF at most',`${M} major + ${m} minor. A "probable" tier for 1 major + 1 minor appears in secondary sources only, not verified in the primary text.`];
    return['no','Tel Hashomer criteria not met',`${M} major + ${m} minor.`]},
  perf:[{l:'Turkish children (Yalçınkaya 2009)',s:.988,p:.546},{l:'Eurofever children with other periodic fevers (Demirkaya 2016)',s:.45,p:.972}],
  pcite:`[[Yalcinkaya2009,Demirkaya2016]] The Eurofever figures are the ones in the published paper; an earlier conference report of the same registry gave a lower sensitivity for Tel Hashomer.`},
 liv:{name:'Livneh 1997',
  groups:[{k:'M',lg:'Major criteria (typical attacks)',cls:'',items:['Generalized peritonitis','Unilateral pleuritis or pericarditis','Monoarthritis (hip, knee or ankle)','Fever alone']},
          {k:'m',lg:'Minor criteria',cls:'mn',items:['Incomplete attack involving the chest','Incomplete attack involving a joint','Exertional leg pain','Favourable response to colchicine']},
          {k:'s',lg:'Supportive criteria',cls:'sp',items:['Family history of FMF','Appropriate ethnic origin','Age under 20 at onset','Severe attacks needing bed rest','Spontaneous remission','Symptom-free intervals','Transient inflammatory response (WBC, ESR, SAA or fibrinogen)','Episodic proteinuria or haematuria','Unproductive laparotomy or a "white" appendix removed','Parental consanguinity']}],
  def:`A <b>typical attack</b> is recurrent (at least 3 of the same type), febrile (rectal ≥38 °C) and short (12 h to 3 days). An <b>incomplete attack</b> differs in one or two ways: under 38 °C, a length outside 12 h to 3 days but not under 6 h and not over a week, no peritoneal signs, localized abdominal pain, or arthritis in other joints. [[Livneh1997,Lancieri2023,Sonmez2016]]`,
  judge(c,o){const M=c.M,m=c.m,s=c.s;let ok=M>=1||m>=2,how=M>=1?'at least 1 major':m>=2?'at least 2 minor':'';
    if(!ok&&o.rule==='cons'&&m>=1&&s>=5){ok=true;how='1 minor + at least 5 supportive'}
    const set=o.rule==='cons'?'conservative set':'simple set';
    return ok?['yes','FMF by Livneh criteria',`${set}: ${how}. Counted ${M} major, ${m} minor, ${s} supportive.`]:['no','Livneh criteria not met',`${set}: needs ≥1 major or ≥2 minor${o.rule==='cons'?', or 1 minor + ≥5 supportive':''}. Counted ${M} major, ${m} minor, ${s} supportive.`]},
  perf:[{l:'Original study: 105 patients vs 106 controls (Livneh 1997)',s:.95,st:'>95%',p:.97,pt:'>97%'},{l:'Eurofever children with other periodic fevers (Demirkaya 2016), specificity only',p:.411}],
  pcite:`[[Livneh1997,Demirkaya2016]]`},
 yo:{name:'Yalçınkaya–Özen',
  groups:[{k:'M',lg:'Paediatric criteria (the first four each 6–72 h, at least 3 attacks)',cls:'',items:['Fever: axillary temperature above 38 °C','Abdominal pain','Chest pain','Oligoarthritis','Family history of FMF']}],
  def:`Built for children in 2009 from 170 children with two variants and 141 controls. <b>Two or more</b> of the five criteria classify as FMF. The 2009 paper describes five items; some later reviews print a six-item version that adds exertional leg pain. [[Yalcinkaya2009,Lancieri2023]]`,
  judge(c){const n=c.M;return n>=2?['yes','FMF by the paediatric criteria',`${n} of 5 criteria (needs 2). With 3 or more, specificity rises and sensitivity falls (Kondi 2010).`]:['no','Paediatric criteria not met',`${n} of 5 criteria (needs 2).`]},
  perf:[{l:'Derivation, ≥2 criteria (Yalçınkaya 2009)',s:.865,p:.936},{l:'French mixed cohort, ≥2 criteria (Kondi 2010)',s:1,p:.5},{l:'French mixed cohort, ≥3 criteria (Kondi 2010)',s:.77,p:.95},{l:'Eurofever registry (Demirkaya 2016)',s:.874,p:.407}],
  pcite:`[[Yalcinkaya2009,Kondi2010,Demirkaya2016]]`}
};
const DX_LAB=[
 {from:0,at:.04,k:'Days −3 to 0',t:'Between attacks',
  txt:`Measured every two weeks over 5 months, median SAA between attacks was 6 mg/L and median CRP 4 mg/L. Many people look well and test close to normal. [[Lachmann2006]]`,
  pt:'Between attacks, blood tests in many people are close to normal.'},
 {from:.095,at:.112,k:'Day 0',t:'The attack begins',
  txt:`IL-1β from activated white cells drives the liver to make CRP and SAA. The white count rises (mainly neutrophils), and ESR, fibrinogen and complement go up. [[Livneh1997,SoonLaxer2017,ARUP2023]]`,
  pt:'When an attack starts, the body\'s alarm signals switch on and inflammation markers climb within hours.'},
 {from:.135,at:.15,k:'Days 1–2',t:'Peak of the acute-phase response',
  txt:`During attacks the medians were SAA 693 mg/L and CRP 115 mg/L. In Korkmaz 2002, CRP was the only acute-phase protein raised in every attack, while platelets, ferritin and albumin did not change. [[Lachmann2006,Korkmaz2002]]`,
  pt:'In the middle of an attack, SAA and CRP can be a hundred times higher than usual.',
  hook:`Flat <b>ferritin and platelets</b> during a febrile attack fit FMF. A very high ferritin points toward Still\'s disease or infection. [[Korkmaz2002,Yamaguchi1992]]`},
 {from:.2,at:.27,k:'Days 3–10',t:'The attack settles',
  txt:`The attack ends by itself and the markers fall back. Livneh\'s supportive criteria call this a "transient" inflammatory response. The exact speed of the fall varies; the curves here are schematic. [[Livneh1997]]`,
  pt:'As the attack fades, the markers drop back down on their own.'},
 {from:.42,at:.75,k:'Weeks 2–4',t:'Check again when well',
  txt:`About a third of patients had raised SAA between attacks (Berkun 2007), and about two thirds had some ongoing acute-phase response (Korkmaz 2002). Persistent SAA was linked to M694V homozygosity, proteinuria and missed colchicine. Persistently high SAA or CRP suggests undertreatment and raises amyloidosis risk. [[Berkun2007,Korkmaz2002,Ozen2016]]`,
  pt:'A blood test on a good day matters too. Hidden, ongoing inflammation is what slowly damages the kidneys.',
  hook:`EULAR 2016 advises checking acute-phase markers <b>between</b> attacks as well as during them, since persistent elevation, not the attacks themselves, is what feeds AA amyloidosis. [[Ozen2016,Berkun2007]]`}
];
const DX_PL=[.02,.18,.34,.5,.66,.82];
const DX_PATH=[
 {from:DX_PL[0],at:.1,k:'Step 1',t:'Recurrent, self-limited fever + serositis',
  txt:`A typical attack is recurrent (at least 3 of the same type), febrile (≥38 °C) and short (12 h to 3 days), with peritonitis, pleuritis or arthritis, and the person is well between attacks. [[Lancieri2023,Livneh1997]]`,
  pt:'The story comes first: short, repeated bouts of fever and pain that stop on their own.'},
 {from:DX_PL[1],at:.26,k:'Step 2',t:'Exclude the mimics',
  txt:`Infection, other periodic fevers and a true surgical abdomen come first. FMF peritonitis can mimic an acute abdomen, with rebound, rigidity and air-fluid levels. In 182 FMF patients, 40% had had an appendectomy (12–25% in the general population) and 80% of the removed appendices were not inflamed (about 20% generally). M694V homozygosity and severe disease were risk factors. [[Lancieri2023,Lidar2008]]`,
  pt:'An FMF belly attack can look exactly like appendicitis, and many people with FMF have had an operation they did not need.',
  hook:`In FMF, a shift from <b>diffuse</b> pain to <b>right-lower-quadrant</b> pain was the best predictor of a truly inflamed appendix. [[Lidar2008]]`},
 {from:DX_PL[2],at:.42,k:'Step 3',t:'Acute-phase reactants, twice',
  txt:`CRP, SAA, ESR and the white count are checked in an attack and again when well. High during the attack and normal or near-normal afterwards supports FMF. Raised markers in flares are a prerequisite in the Eurofever/PRINTO criteria. [[Korkmaz2002,Gattorno2019,Livneh1997]]`,
  pt:'One blood test during an attack, one on a good day. The contrast is the clue.'},
 {from:DX_PL[3],at:.58,k:'Step 4',t:'MEFV gene testing',
  txt:`Two pathogenic variants: consistent with FMF. One: at least a carrier, and symptoms are still possible. None: FMF is less likely but not excluded; about 10–20% of FMF patients carry no <i>MEFV</i> variant. A VUS is inconclusive. Standard screening covers exons 2, 3, 5 and 10. [[ARUP2023,BenZvi2015,Shinar2012]]`,
  pt:'The gene test can support the diagnosis but cannot rule it out.',
  hook:`FMF remains a <b>clinical diagnosis</b> (SHARE recommendations). Genetics supports it but cannot exclude it. [[Giancane2015]]`},
 {from:DX_PL[4],at:.74,k:'Step 5',t:'A colchicine trial',
  txt:`GeneReviews describes a six-month colchicine trial to establish the diagnosis when molecular testing is inconclusive. Booty 2009 concluded that one variant plus typical symptoms justifies a trial. Response is a major Tel Hashomer criterion and a minor Livneh criterion. [[GeneReviews,Booty2009,Pras1998,Livneh1997]]`,
  pt:'If daily colchicine makes the attacks stop over months, that strongly supports FMF.'},
 {from:DX_PL[5],at:.95,k:'Step 6',t:'Reassess over months',
  txt:`Colchicine fully prevents attacks in about 60–70% of patients, gives a partial response in 20–30% and fails in about 5%. EULAR 2016 advised reviewing response, toxicity and adherence every 6 months; the EULAR/PReS 2024 update, published in 2025, keeps regular review but sets no fixed interval, asking for it more often at diagnosis and when the disease is uncontrolled. An atypical course sends the work-up back to the mimics. [[SoonLaxer2017,Ozen2016,Ozen2025,Cush2025]]`,
  pt:'Doctors keep checking: are the attacks gone, and are the blood tests calm between them?'}
];
inits.dx=()=>{
  /* ---------- Eurofever/PRINTO calculator ---------- */
  const g=$('#dxGauge');let gt='none';const shown={g:0,c:0};let stopG=null,gTok=0;
  const st=()=>{const ci={},ab={};$$('[data-ci]').forEach(b=>ci[b.dataset.ci]=b.checked);$$('[data-ab]').forEach(b=>ab[b.dataset.ab]=b.checked);
    const gN=['ep','arth','chest','abd'].filter(k=>ci[k]).length;
    const cN=['eth','ep','arth','chest','abd'].filter(k=>ci[k]).length+['aph','urt','mp','ln'].filter(k=>!ab[k]).length;
    return{pre:$('#dxPre1').checked&&$('#dxPre2').checked,gN,cN}};
  function gauge(gv,cv,need,met,G,Cn){
    let s='';
    /* narrow: the segment bar and the 0–9 arc both run the full width of a taller stage */
    const N=vb(g,'400 262','400 356');
    const Q=N?{bx:10,bw:88,bs:96,by:30,bh:28,ty:16,lab:48,mk1:24,mk2:62,mky:76,sumY:96,arm2:124,cx:200,cy:310,R:158,endX:390}
             :{bx:20,bw:84,bs:92,by:26,bh:20,ty:16,lab:40,mk1:20,mk2:52,mky:64,sumY:80,arm2:104,cx:200,cy:232,R:100,endX:380};
    s+=`<text x="${Q.bx}" y="${Q.ty}" class="t-sm">ARM 1 · MEFV GENOTYPE + CLINICAL ITEMS</text>`;
    const dim=need?1:.35;
    for(let i=0;i<4;i++){const x=Q.bx+i*Q.bs,f=clamp(gv-i);
      s+=`<rect x="${x}" y="${Q.by}" width="${Q.bw}" height="${Q.bh}" rx="6" style="fill:var(--panel-2);stroke:var(--line);opacity:${dim}"/>`;
      if(f>0)s+=`<rect x="${x}" y="${Q.by}" width="${f1(Q.bw*f)}" height="${Q.bh}" rx="6" style="fill:${met.g?'var(--good)':'var(--terra)'};opacity:${f1(.38*dim)}"/>`;
      if(f>.98)s+=`<rect x="${x}" y="${Q.by}" width="${Q.bw}" height="${Q.bh}" rx="6" style="fill:none;stroke:${met.g?'var(--good)':'var(--terra)'};stroke-width:2;opacity:${dim}"/>`;
      s+=`<text x="${x+Q.bw/2}" y="${Q.lab}" class="t-xs t-mid" style="fill:${f>.5&&need?'var(--ink)':'var(--muted)'};font-weight:700">${['1–3 d','arthritis','chest','abdomen'][i]}</text>`}
    if(need){const x=Q.bx+need*Q.bs-4;s+=`<line x1="${x}" x2="${x}" y1="${Q.mk1}" y2="${Q.mk2}" style="stroke:var(--ink);stroke-width:2.5"/><text x="${x}" y="${Q.mky}" class="t-xs t-mid" style="fill:var(--ink)">need ≥${need}</text>`;
      s+=`<text x="${Q.endX}" y="${Q.sumY}" class="t-sm t-end" style="fill:${met.g?'var(--good)':'var(--muted)'}">${G} of 4 items · ${met.g?'arm met':'arm not met'}</text>`}
    else s+=`<text x="200" y="${Q.sumY-8}" class="t-sm t-mid">no qualifying genotype: arm 1 does not apply</text>`;
    s+=`<text x="${Q.bx}" y="${Q.arm2}" class="t-sm">ARM 2 · CLINICAL ONLY (≥6 OF 9)</text>`;
    const cx=Q.cx,cy=Q.cy,R=Q.R,pt=v=>{const a=Math.PI-Math.PI*v/9;return[cx+R*Math.cos(a),cy-R*Math.sin(a)]};
    s+=`<path d="M${cx-R} ${cy} A${R} ${R} 0 0 1 ${cx+R} ${cy}" style="fill:none;stroke:var(--panel-2);stroke-width:22;stroke-linecap:butt"/>`;
    if(cv>.01){const[ex,ey]=pt(cv);s+=`<path d="M${cx-R} ${cy} A${R} ${R} 0 0 1 ${f1(ex)} ${f1(ey)}" style="fill:none;stroke:${met.c?'var(--good)':'var(--terra)'};stroke-width:22"/>`}
    for(let v=1;v<9;v++){const a=Math.PI-Math.PI*v/9;s+=`<line x1="${f1(cx+(R-11)*Math.cos(a))}" y1="${f1(cy-(R-11)*Math.sin(a))}" x2="${f1(cx+(R+11)*Math.cos(a))}" y2="${f1(cy-(R+11)*Math.sin(a))}" style="stroke:var(--panel);stroke-width:2"/>`}
    {const a=Math.PI/3;s+=`<line x1="${f1(cx+(R-14)*Math.cos(a))}" y1="${f1(cy-(R-14)*Math.sin(a))}" x2="${f1(cx+(R+16)*Math.cos(a))}" y2="${f1(cy-(R+16)*Math.sin(a))}" style="stroke:var(--ink);stroke-width:3"/><text x="${f1(cx+(R+26)*Math.cos(a))}" y="${f1(cy-(R+26)*Math.sin(a)+4)}" class="t-sm t-mid" style="fill:var(--ink)">6</text>`}
    s+=`<text x="${cx-R}" y="${cy+20}" class="t-xs t-mid">0</text><text x="${cx+R}" y="${cy+20}" class="t-xs t-mid">9</text>`;
    s+=`<text x="${cx}" y="${cy-8}" class="t-big t-mid" style="font-size:38px;fill:${met.c?'var(--good)':'var(--ink)'}">${Cn}</text><text x="${cx}" y="${cy+14}" class="t-xs t-mid">of 9 · ${met.c?'arm met':'arm not met'}</text>`;
    g.innerHTML=s;
  }
  function update(){
    const S=st(),need=gt==='conf'?1:gt==='non'?2:0;
    const met={g:need>0&&S.gN>=need,c:S.cN>=6};
    const from={...shown};stopG&&stopG();
    stopG=animate(550,p=>{const e=ease(p);shown.g=lerp(from.g,S.gN,e);shown.c=lerp(from.c,S.cN,e);gauge(shown.g,shown.c,need,met,S.gN,S.cN)},()=>{stopG=null});
    const tok=++gTok;setTimeout(()=>{if(tok!==gTok)return;stopG&&stopG();stopG=null;shown.g=S.gN;shown.c=S.cN;gauge(S.gN,S.cN,need,met,S.gN,S.cN)},700);
    if(RM)gauge(S.gN,S.cN,need,met,S.gN,S.cN);
    const arms=[met.g&&'the genotype + clinical arm',met.c&&'the clinical-only arm'].filter(Boolean).join(' and ');
    const v=$('#dxVerdict');
    if(!S.pre){v.className='dx-verdict na';v.innerHTML=`<strong>Criteria not applied yet</strong><span>Both prerequisites must hold before either arm is scored. ${arms?'The scores would otherwise meet '+arms+'.':''}</span>`}
    else if(arms){v.className='dx-verdict yes';v.innerHTML=`<strong>Classified as FMF (for research classification)</strong><span>Met by ${arms}.</span>`}
    else{v.className='dx-verdict';v.innerHTML=`<strong>Not classified as FMF by these criteria</strong><span>That does not rule FMF out. Classification criteria trade some sensitivity for specificity.</span>`}
    v.innerHTML+=`<span class="stage-cap">Classification criteria for studies, not a diagnostic test for an individual.</span>`;
    $('#dxGtDef').innerHTML=DX_GT[gt];
  }
  function setGt(k){gt=k;$$('[data-gt]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.gt===k))}
  $$('[data-gt]').forEach(b=>b.addEventListener('click',()=>{setGt(b.dataset.gt);update()}));
  $$('#m-dx .dx-form input[type=checkbox]').forEach(c=>c.addEventListener('change',update));
  $$('[data-dxex]').forEach(b=>b.addEventListener('click',()=>{const E=DX_EX[b.dataset.dxex];
    $('#dxPre1').checked=!!E.pre[0];$('#dxPre2').checked=!!E.pre[1];
    $$('[data-ci]').forEach(c=>c.checked=E.ci.includes(c.dataset.ci));$$('[data-ab]').forEach(c=>c.checked=E.ab.includes(c.dataset.ab));
    setGt(E.gt);update()}));
  $('#dxPerfG').innerHTML=dxBars([{l:'Derivation',s:.94,p:.95},{l:'Validation (n≈1,010)',s:.89,p:1}]);
  $('#dxPerfC').innerHTML=dxBars([{l:'Derivation',s:.91,p:.92},{l:'Validation',s:.85,p:.94}]);
  {const E=DX_EX.typ;$('#dxPre1').checked=true;$('#dxPre2').checked=true;$$('[data-ci]').forEach(c=>c.checked=E.ci.includes(c.dataset.ci));setGt('conf')}
  gauge(0,0,1,{g:0,c:0},0,0);update();

  /* ---------- older criteria sets ---------- */
  let crit='th';const cst={th:{},liv:{},yo:{}};const lopt={rule:'simple',ia:'maj'};
  function critGroups(){const C=DX_CRIT[crit];if(crit!=='liv')return C.groups;
    const gs=C.groups.map(x=>({...x,items:x.items.map((t,i)=>({t,id:x.k+i}))}));
    gs[lopt.ia==='maj'?0:1].items.push({t:'Incomplete abdominal attack',id:'ia',flag:1});return gs}
  function critForm(){const C=DX_CRIT[crit];let h='';
    if(crit==='liv')h+=`<div class="ctrls" role="group" aria-label="Rule set"><span class="kicker">Rule set</span><button class="btn" data-lr="simple" aria-pressed="${lopt.rule==='simple'}">Simple</button><button class="btn" data-lr="cons" aria-pressed="${lopt.rule==='cons'}">Conservative</button></div>
      <div class="ctrls" role="group" aria-label="Incomplete abdominal attack"><span class="kicker">"Incomplete abdominal attack" counts as</span><button class="btn" data-lia="maj" aria-pressed="${lopt.ia==='maj'}">Major</button><button class="btn" data-lia="min" aria-pressed="${lopt.ia==='min'}">Minor</button></div>
      <p class="dx-def"><span class="tag warn">Sources disagree</span> Reproductions of the 1997 paper differ on whether an incomplete abdominal attack is a major or a minor criterion; the Lancieri 2023 review lists it as minor. Flip the switch to see whether it changes the result. [[Livneh1997,Lancieri2023]]</p>`;
    h+=`<p class="dx-def">${C.def}</p>`;
    critGroups().forEach(gr=>{h+=`<fieldset><legend>${gr.lg}</legend>`;
      gr.items.forEach((it,i)=>{const t=typeof it==='string'?it:it.t,id=typeof it==='string'?gr.k+i:it.id;
        h+=`<label class="dx-ck"><input type="checkbox" data-cr="${id}" data-grp="${gr.k}" ${cst[crit][id]?'checked':''}><span>${t}${it.flag?' <small>(placement disputed)</small>':''}</span></label>`});
      if(gr.k==='s')h+=`<p class="dx-def">Supportive criteria only count in the conservative set (1 minor + ≥5 supportive), which is the rule scored here. A reproduction of the paper also allows 1 minor + ≥4 of the first 5 supportive criteria. [[Livneh1997,Lancieri2023]]</p>`;
      h+='</fieldset>'});
    $('#dxCritForm').innerHTML=h;critOut()}
  function critOut(){const C=DX_CRIT[crit];const c={M:0,m:0,s:0};
    $$('#dxCritForm [data-cr]').forEach(x=>{if(x.checked)c[x.dataset.grp]++});
    const[cls,ttl,sub]=C.judge(c,lopt);const o=$('#dxCritOut');o.className='dx-verdict'+(cls==='yes'?' yes':cls==='na'?' na':'');
    const dots=(n,tot,k,l)=>tot?`<em>${l}</em>`+Array.from({length:tot},(_,i)=>`<span class="${i<n?'on':''} ${k}"></span>`).join(''):'';
    const tot=k=>critGroups().filter(x=>x.k===k).reduce((a,x)=>a+x.items.length,0);
    o.innerHTML=`<span class="kicker">${C.name}</span><strong>${ttl}</strong><div class="dx-dots">${dots(c.M,tot('M'),'',crit==='yo'?'criteria':'major')}${dots(c.m,tot('m'),'mn','minor')}${dots(c.s,tot('s'),'sp','supportive')}</div><span>${sub}</span>`;
    $('#dxCritPerf').innerHTML=`<span class="kicker">How it performed</span>${dxBars(C.perf)}<p class="stage-cap">Sources: ${C.pcite}</p>`}
  $('#dxCritForm').addEventListener('change',e=>{const x=e.target.closest('[data-cr]');if(!x)return;cst[crit][x.dataset.cr]=x.checked;critOut()});
  $('#dxCritForm').addEventListener('click',e=>{const a=e.target.closest('[data-lr]'),b=e.target.closest('[data-lia]');
    if(a){lopt.rule=a.dataset.lr;critForm()}if(b){lopt.ia=b.dataset.lia;critForm()}});
  $$('[data-crit]').forEach(b=>b.addEventListener('click',()=>{crit=b.dataset.crit;$$('[data-crit]').forEach(x=>x.setAttribute('aria-pressed',x===b));critForm()}));
  cst.th={M0:true,m0:true,m2:true};cst.liv={M0:true};cst.yo={M0:true,M1:true};
  critForm();

  /* ---------- labs across an attack ---------- */
  const ls=$('#dxLabSvg'),lr=$('#dxLabT');let pers=false;
  const D0=-3,D1=28,dOf=t=>D0+t*(D1-D0);
  const gF=(d,tp,tau)=>d<0?0:d<tp?ease(d/tp):Math.exp(-(d-tp)/tau);
  const ROWS=[
   {n:'SAA',u:'mg/L',c:'var(--gold)',pk:693,b:6,sc:750,f:d=>gF(d,1.5,1.8),p:1},
   {n:'CRP',u:'mg/L',c:'var(--terra)',pk:115,b:4,sc:130,f:d=>gF(d,1.4,1.5),p:1},
   {n:'WBC / neutrophils',u:'rise in attacks',c:'var(--crocus)',f:d=>.7*gF(d,1,1.4),q:1},
   {n:'ESR / fibrinogen',u:'rise, slower to fall',c:'var(--sea)',f:d=>.72*gF(d,2.6,4.5),p:.6,q:1},
   {n:'Ferritin',u:'no change',c:'var(--muted)',f:()=>.18,flat:1},
   {n:'Platelets',u:'no change',c:'var(--muted)',f:()=>.42,flat:1}];
  const val=(R,d)=>{let v=R.f(d);if(pers&&R.p&&!R.flat){const fl=.09*R.p;v=fl+(1-fl)*v}return v};
  function drawLab(t){const d=dOf(t);let s='';
    /* narrow: each row keeps its track but the name moves onto a header line above it,
       the names are shortened and the day axis loses its most crowded ticks */
    const N=vb(ls,'720 410','400 524');
    const L=N?{X0:8,X1:392,Y0:30,RH:74,TOP:18,H:44,ticks:[-2,0,4,7,14,21,28]}
             :{X0:150,X1:700,Y0:26,RH:58,TOP:6,H:44,ticks:[-2,0,2,4,7,14,21,28]};
    const X0=L.X0,X1=L.X1,xd=k=>X0+(k-D0)/(D1-D0)*(X1-X0),yEnd=L.Y0+L.RH*6;
    const NB=` · `;
    if(N)s+=`<text x="${f1(xd(1.5))}" y="13" class="t-xs t-mid" style="fill:var(--terra)">attack (1–3 days)</text><text x="${X1}" y="13" class="t-xs t-end">curves are schematic</text>`;
    else{s+=`<rect x="${f1(xd(0))}" y="20" width="${f1(xd(3)-xd(0))}" height="350" style="fill:var(--terra-soft);opacity:.7"/><text x="${f1(xd(1.5))}" y="14" class="t-xs t-mid" style="fill:var(--terra)">attack (1–3 days)</text>`;
      L.ticks.forEach(k=>{s+=`<line x1="${f1(xd(k))}" x2="${f1(xd(k))}" y1="20" y2="370" class="grid"/>`});
      s+=`<text x="${X1}" y="14" class="t-xs t-end">curve shapes are schematic: no published day-by-day curve exists</text>`}
    L.ticks.forEach(k=>{s+=`<text x="${f1(xd(k))}" y="${N?yEnd+16:386}" class="t-xs t-mid">${k}</text>`});
    s+=`<text x="${X1}" y="${N?yEnd+32:403}" class="t-xs t-end">days since the attack began</text>`;
    ROWS.forEach((R,i)=>{const y0=L.Y0+i*L.RH,yb=y0+L.TOP+L.H,h=L.H,yv=v=>yb-h*clamp(v,0,1.05);
      if(N){let rt=`<tspan>${R.un||R.u}</tspan>`;
        if(R.pk&&d>=1.5)rt+=`<tspan style="fill:${R.c}">${NB}attack median ${R.pk}</tspan>`;
        if(R.pk&&d>=8)rt+=`<tspan>${NB}${pers?'stays raised':'between '+R.b}</tspan>`;
        if(R.flat&&d>=1)rt+=`<tspan style="fill:var(--good)">${NB}flat through the attack</tspan>`;
        s+=`<text x="6" y="${y0+12}" class="t-lbl" style="fill:${R.flat?'var(--muted)':'var(--ink)'}">${R.nn||R.n}</text><text x="${X1}" y="${y0+12}" class="t-xs t-end">${rt}</text>`;
        s+=`<rect x="${f1(xd(0))}" y="${y0+L.TOP}" width="${f1(xd(3)-xd(0))}" height="${h}" style="fill:var(--terra-soft);opacity:.7"/>`;
        L.ticks.forEach(k=>{s+=`<line x1="${f1(xd(k))}" x2="${f1(xd(k))}" y1="${y0+L.TOP}" y2="${yb}" class="grid"/>`})}
      else s+=`<text x="10" y="${y0+20}" class="t-lbl" style="fill:${R.flat?'var(--muted)':'var(--ink)'}">${R.n}</text><text x="10" y="${y0+36}" class="t-xs">${R.u}</text>`;
      s+=`<line x1="${X0}" x2="${X1}" y1="${yb}" y2="${yb}" class="axis"/>`;
      let gp='',bp='';for(let k=0;k<=220;k++){const dd=D0+k/220*(D1-D0),x=xd(dd),y=yv(val(R,dd)*(R.sc?R.pk/R.sc:1));gp+=(k?'L':'M')+f1(x)+' '+f1(y);if(dd<=d)bp+=(bp?'L':'M')+f1(x)+' '+f1(y)}
      s+=`<path d="${gp}" style="fill:none;stroke:${R.c};stroke-width:1.4;opacity:.25"/>`;
      if(bp)s+=`<path d="${bp}" style="fill:none;stroke:${R.c};stroke-width:${R.flat?2:2.8};stroke-linejoin:round"/>`;
      const cy=yv(val(R,d)*(R.sc?R.pk/R.sc:1));s+=`<circle cx="${f1(xd(d))}" cy="${f1(cy)}" r="4.5" style="fill:${R.c};stroke:var(--panel);stroke-width:1.5"/>`;
      if(N)s+=`<line x1="${f1(xd(d))}" x2="${f1(xd(d))}" y1="${y0+L.TOP}" y2="${yb}" style="stroke:var(--ink);stroke-width:1.2;opacity:.45"/>`;
      else{
        if(R.pk&&d>=1.5)s+=`<text x="${f1(xd(3)+10)}" y="${y0+10}" class="t-xs" style="fill:${R.c}">attack median ${R.pk} ${R.u}</text>`;
        if(R.pk&&d>=8)s+=`<text x="${X1-2}" y="${y0+26}" class="t-xs t-end">${pers?'stays above normal (schematic)':'between attacks: median '+R.b+' '+R.u}</text>`;
        if(R.flat&&d>=1)s+=`<text x="${f1(xd(3)+8)}" y="${f1(cy-6)}" class="t-xs" style="fill:var(--good)">flat through the attack</text>`}
    });
    if(!N)s+=`<line x1="${f1(xd(d))}" x2="${f1(xd(d))}" y1="20" y2="370" style="stroke:var(--ink);stroke-width:1.2;opacity:.45"/>`;
    ls.innerHTML=s;
    const num=R=>{const raw=val(R,d);if(pers&&(d<0||d>8))return'above normal';return'≈'+Math.round(R.b+(R.pk-R.b)*(raw-(pers?.09:0))/(1-(pers?.09:0)))+' mg/L'};
    const q=R=>{const v=val(R,d);return v>.15?'raised':pers&&R.p&&(d<0||d>8)?'mildly raised':'normal'};
    $('#dxLabRead').innerHTML=`<span>day <b>${f1(d)}</b></span><span>SAA <b>${num(ROWS[0])}</b></span><span>CRP <b>${num(ROWS[1])}</b></span><span>WBC <b>${q(ROWS[2])}</b></span><span>ESR <b>${q(ROWS[3])}</b></span><span>ferritin <b>unchanged</b></span><span>platelets <b>unchanged</b></span>`;
    const p=phaseOf(DX_LAB,t);setLab(p);
    let extra='';if(pers)extra=`<div class="kv"><div><dt>This scenario</dt><dd>SAA and CRP never fully settle. About a third to two thirds of patients show some inflammation between attacks, and this is the pattern linked to amyloidosis. [[Berkun2007,Korkmaz2002,Lachmann2006]]</dd></div></div>`;
    $('#dxLabNote').innerHTML=noteHTML(DX_LAB[p])+extra}
  const stopL=playWire(lr,$('#dxLabPlay'),drawLab,15000,'Replay','dx');
  const setLab=stepWire($('#dxLabSteps'),DX_LAB,lr,drawLab,stopL);
  const ptog=v=>{pers=v;$('#dxLabNorm').setAttribute('aria-pressed',!v);$('#dxLabPers').setAttribute('aria-pressed',v);drawLab(+lr.value)};
  $('#dxLabNorm').onclick=()=>ptog(false);$('#dxLabPers').onclick=()=>ptog(true);
  drawLab(+lr.value);

  /* ---------- diagnostic pathway ---------- */
  const ps=$('#dxPathSvg'),pr=$('#dxPathT');
  const PN=[{a:'Recurrent self-limited',b:'fever + serositis, 1–3 days'},{a:'Exclude mimics',b:'infection, surgery, other fevers'},{a:'Acute-phase reactants',b:'in an attack and between'},
            {a:'MEFV testing',b:'exons 2, 3, 5 and 10'},{a:'Colchicine trial',b:'6 months if genetics unclear'},{a:'Reassess',b:'attacks + SAA/CRP over months'}];
  function drawPath(t){let s=`<defs>${marker('dxPa')}${marker('dxPb','var(--terra)')}</defs>`;
    /* narrow: the flow runs top to bottom and each side panel becomes a full-width block
       between two nodes; the boxes keep their places so nothing jumps as they fade in */
    const N=vb(ps,'720 440','400 1052');
    const L=N
      ? {nw:372,nh:66,px:14,
         pos:[{x:14,y:16},{x:14,y:120},{x:14,y:354},{x:14,y:458},{x:14,y:664},{x:14,y:870}],
         C:[[[200,82],[200,120]],[[200,316],[200,354]],[[200,420],[200,458]],[[200,626],[200,664]],[[200,832],[200,870]]],
         stub:[[200,186,194],[200,524,532]], app:[14,194], gen:[14,532], col:[14,738], out:[14,944],
         genW:372,colW:372,outW:372, warn:'M320 626 L320 660'}
      : {nw:200,nh:66,px:130,
         pos:[{x:16,y:20},{x:260,y:20},{x:504,y:20},{x:504,y:250},{x:260,y:250},{x:16,y:250}],
         C:[[[216,53],[260,53]],[[460,53],[504,53]],[[604,86],[604,250]],[[504,283],[460,283]],[[260,283],[216,283]]],
         stub:[[360,86,110],[604,316,338]], app:[130,110], gen:[474,338], col:[236,338], out:[16,338],
         genW:240,colW:206,outW:200, warn:'M474 384 C458 384 440 350 420 318'};
    const lit=i=>t>=DX_PL[i],cur=phaseOf(DX_PATH,t);
    L.C.forEach(([[x1,y1],[x2,y2]],k)=>{const on=lit(k+1);const D=Math.hypot(x2-x1,y2-y1);s+=`<path d="M${x1} ${y1} L${f1(x2-(x2-x1)/D*3)} ${f1(y2-(y2-y1)/D*3)}" class="arrow" style="${on?'stroke:var(--terra);stroke-width:2.2':''}" marker-end="url(#${on?'dxPb':'dxPa'})"/>`;
      const a=DX_PL[k]+.06,b=DX_PL[k+1];if(t>a&&t<b){const u=ease(ramp(t,a,b));s+=`<circle cx="${f1(lerp(x1,x2,u))}" cy="${f1(lerp(y1,y2,u))}" r="6" style="fill:var(--terra)"/>`}});
    PN.forEach((n0,i)=>{const n={...n0,...L.pos[i]},on=lit(i),c=i===cur;
      s+=`<rect x="${n.x}" y="${n.y}" width="${L.nw}" height="${L.nh}" rx="12" style="fill:${on?'var(--terra-soft)':'var(--panel)'};stroke:${on?'var(--terra)':'var(--line)'};stroke-width:${c?3:1.5}"/>`;
      s+=`<circle cx="${n.x}" cy="${n.y}" r="11" style="fill:${on?'var(--terra)':'var(--panel-2)'};stroke:var(--panel);stroke-width:2"/><text x="${n.x}" y="${n.y+4}" class="t-xs t-mid" style="fill:${on?'var(--panel)':'var(--muted)'};font-weight:700">${i+1}</text>`;
      s+=`<text x="${n.x+L.nw/2}" y="${n.y+29}" class="t-lbl t-mid" style="opacity:${on?1:.55}">${n.a}</text><text x="${n.x+L.nw/2}" y="${n.y+47}" class="t-xs t-mid">${n.b}</text>`});
    const stub=k=>`<line x1="${L.stub[k][0]}" x2="${L.stub[k][0]}" y1="${L.stub[k][1]}" y2="${L.stub[k][2]}" style="stroke:var(--terra);stroke-dasharray:3 3"/>`;
    // appendectomy panel under node 2
    const ap=ramp(t,DX_PL[1]+.02,DX_PL[1]+.12);
    if(ap>0){const[px,py]=L.app;
      s+=`<g style="opacity:${f1(ap)}">${stub(0)}<rect x="${px}" y="${py}" width="${N?372:350}" height="122" rx="10" style="fill:var(--panel);stroke:var(--line)"/>
       <text x="${px+12}" y="${py+18}" class="t-sm" style="fill:var(--terra)">SURGICAL ABDOMEN? 182 FMF PATIENTS</text>`;
      const bx=px+116,bw=170,bar=(y,lbl,fmf,genA,genB,fl,gl)=>{let q=`<text x="${px+12}" y="${y+9}" class="t-sm">${lbl}</text>`;
        q+=`<rect x="${bx}" y="${y}" width="${f1(bw*fmf*ease(ap))}" height="11" rx="3" style="fill:var(--terra)"/><text x="${f1(bx+bw*fmf*ease(ap)+5)}" y="${y+9}" class="t-xs" style="fill:var(--terra)">FMF ${fl}</text>`;
        q+=`<rect x="${bx}" y="${y+16}" width="${f1(bw*genB*ease(ap))}" height="11" rx="3" style="fill:var(--muted);opacity:.35"/><rect x="${bx}" y="${y+16}" width="${f1(bw*genA*ease(ap))}" height="11" rx="3" style="fill:var(--muted);opacity:.7"/><text x="${f1(bx+bw*genB*ease(ap)+5)}" y="${y+25}" class="t-xs">general ${gl}</text>`;return q};
      s+=bar(py+32,'appendectomy',.4,.12,.25,'40%','12–25%');
      s+=bar(py+74,'not inflamed',.8,.2,.2,'80%','~20%');
      s+=`</g>`}
    // genotype outcomes under node 4
    const gp=ramp(t,DX_PL[3]+.02,DX_PL[3]+.12);
    if(gp>0){const[px,py]=L.gen;
      s+=`<g style="opacity:${f1(gp)}">${stub(1)}<rect x="${px}" y="${py}" width="${L.genW}" height="94" rx="10" style="fill:var(--panel);stroke:var(--line)"/>`;
      [['var(--good)','two pathogenic: fits FMF'],['var(--warn)','one variant / VUS: unclear'],['var(--muted)','none: FMF still possible']].forEach(([c,l],k)=>{s+=`<circle cx="${px+16}" cy="${py+20+k*26}" r="5" style="fill:${c}"/><text x="${px+28}" y="${py+24+k*26}" class="t-xs">${l}</text>`});
      s+=`</g>`;
      if(t>DX_PL[4]-.04)s+=`<path d="${L.warn}" class="arrow" style="stroke:var(--warn);stroke-dasharray:4 3;opacity:${f1(ramp(t,DX_PL[4]-.04,DX_PL[4]))}"${N?' marker-end="url(#dxPa)"':''}/>`}
    // colchicine trial box under node 5
    const cp=ramp(t,DX_PL[4]+.02,DX_PL[4]+.12);
    if(cp>0){const[px,py]=L.col;
      s+=`<g style="opacity:${f1(cp)}"><rect x="${px}" y="${py}" width="${L.colW}" height="94" rx="10" style="fill:var(--crocus-soft);stroke:var(--crocus)"/><text x="${px+12}" y="${py+20}" class="t-sm" style="fill:var(--crocus)">A RESPONSE COUNTS AS</text>
      <text x="${px+12}" y="${py+42}" class="t-xs" style="fill:var(--ink)">Tel Hashomer: a major criterion</text><text x="${px+12}" y="${py+62}" class="t-xs" style="fill:var(--ink)">Livneh: a minor criterion</text><text x="${px+12}" y="${py+82}" class="t-xs">trial length: about 6 months</text></g>`}
    // outcomes under node 6
    const op=ramp(t,DX_PL[5]+.02,DX_PL[5]+.12);
    if(op>0){const[px,py]=L.out;
      s+=`<g style="opacity:${f1(op)}"><rect x="${px}" y="${py}" width="${L.outW}" height="94" rx="10" style="fill:var(--panel);stroke:var(--line)"/><text x="${px+12}" y="${py+18}" class="t-sm">ON COLCHICINE</text>`;
      [['complete','60–70%',.65,'var(--good)'],['partial','20–30%',.25,'var(--warn)'],['no response','~5%',.05,'var(--bad)']].forEach(([l,v,w,c],k)=>{const y=py+30+k*20;s+=`<text x="${px+12}" y="${y+8}" class="t-xs">${l}</text><rect x="${px+88}" y="${y}" width="${f1(70*w*ease(op))}" height="9" rx="3" style="fill:${c}"/><text x="${f1(px+92+70*w*ease(op))}" y="${y+8}" class="t-xs">${v}</text>`});
      s+=`</g>`}
    ps.innerHTML=s;setPath(cur);$('#dxPathNote').innerHTML=noteHTML(DX_PATH[cur])}
  const stopP=playWire(pr,$('#dxPathPlay'),drawPath,16000,'Replay','dx');
  const setPath=stepWire($('#dxPathSteps'),DX_PATH,pr,drawPath,stopP);
  drawPath(+pr.value);
  /* this module has three drawings but one module id, so re-lay-out all of them together */
  redraws.dx=()=>{stopL();stopP();drawLab(+lr.value);drawPath(+pr.value);update()};

  $('#dxCards').innerHTML=`
   <div class="card"><h4>Why the gene test can mislead</h4><p>About 10–20% of people with FMF carry no <i>MEFV</i> variant, usually with a milder picture. Single variants are common: in a Turkish referral cohort, 415 of 1,291 patients (32%) were heterozygous. Healthy carriers also run slightly higher CRP and SAA than non-carriers. [[BenZvi2015,Tanatar2020,Lachmann2006]]</p></div>
   <div class="card"><h4>Criteria travel badly</h4><p>In Eurofever children whose fevers had other causes, the Livneh criteria had a specificity of only 41.1% and the paediatric criteria 40.7%. Criteria built in high-prevalence populations over-call FMF where other periodic fevers are common. [[Demirkaya2016]]</p></div>
   <div class="card"><h4>Colchicine response helps, but is not proof</h4><p>In daily practice a good response and the right ancestry can support FMF in someone with a non-confirmatory genotype, but the Eurofever/PRINTO panel left both out of the criteria. [[Gattorno2019]]</p></div>
   <div class="card"><h4>One pathogenic variant is not "confirmatory"</h4><p>A single heterozygous pathogenic <i>MEFV</i> variant counts as a <b>non-confirmatory</b> genotype in the 2019 criteria, so it needs <b>2</b> of the 4 clinical items, not 1. The same goes for one pathogenic variant plus a VUS in trans, and for two VUS. Benign and likely-benign variants do not count at all. [[Gattorno2019,Lancieri2023]]</p></div>
   <div class="card"><h4>Counts, not points</h4><p>Both FMF sets are plain counts: every item scores 1 and there are no weights, so the 4-item and 9-item thresholds are all there is. The TRAPS clinical set in the same paper is point-weighted with a threshold of 5, so the two models should not be mixed up. [[Gattorno2019]]</p></div>
   <div class="card"><h4>Who gets the gene test?</h4><p>The clinical-only Eurofever/PRINTO items can also be used to pick who should be tested. Earlier provisional Eurofever clinical scores (2015) separated FMF from other periodic fevers with an AUC of 0.98. [[Gattorno2019,Federici2015]]</p></div>`;
};
