/* =============== 4.5 Toward a cure =============== */
const CU_STEPS=[
 {from:0,at:.12,k:'DYNAMIC · Step 1',t:'After surgery for stage II colon cancer',
  txt:`DYNAMIC randomised 455 people with stage II colon cancer, after surgery, to standard management or to ctDNA-guided management. The question: can a blood test pick out who needs adjuvant chemotherapy, so that others can safely skip it? [[Tie2022]]`,
  pt:`After the operation, some people still have a few cancer cells left. Chemotherapy is meant to mop them up, but most people with stage II cancer do not need it.`,
  hook:`ctDNA = circulating tumour DNA; detecting it after surgery signals molecular residual disease (MRD).`},
 {from:.2,at:.36,k:'DYNAMIC · Step 2',t:'A blood test for tumour DNA',
  txt:`In the guided arm, blood was tested for circulating tumour DNA after surgery. ctDNA-positive patients received adjuvant chemotherapy; ctDNA-negative patients did not. ctDNA is a powerful prognostic marker: in GALAXY, positivity 4 weeks after surgery carried an HR of 10.0 for recurrence <span class="ev est">Established</span> [[Tie2022,Kotani2023]].`,
  pt:`Tumours shed tiny pieces of DNA into the blood. If none can be found after surgery, the chance that cancer is left behind is lower.`,
  hook:`DYNAMIC: ctDNA-positive → chemotherapy; ctDNA-negative → no chemotherapy.`},
 {from:.42,at:.56,k:'DYNAMIC · Step 3',t:'Who got chemotherapy',
  txt:`ctDNA guidance cut adjuvant chemotherapy use to 15%, against 28% with standard care: roughly half as many people exposed to its side effects [[Tie2022]].`,
  pt:`With the blood test, about half as many people had chemotherapy.`,
  hook:`DYNAMIC chemotherapy use: 15% (ctDNA-guided) vs 28% (standard).`},
 {from:.62,at:.76,k:'DYNAMIC · Step 4',t:'Two years later',
  txt:`Two-year recurrence-free survival was 93.5% with ctDNA guidance and 92.4% with standard care: a difference of 1.1 points (95% CI −4.1 to 6.2), which met non-inferiority [[Tie2022]].`,
  pt:`Skipping chemotherapy when the test was negative did not let more cancers come back in this trial.`,
  hook:`DYNAMIC: less chemotherapy, same 2-year RFS (93.5% vs 92.4%). <span class="ev est">Established</span> for stage II.`},
 {from:.82,at:.96,k:'DYNAMIC · Step 5',t:'What the result says, and what it does not',
  txt:`Inside the guided arm, 3-year RFS was 86.4% for ctDNA-positive patients given chemotherapy and 92.5% for ctDNA-negative patients who skipped it. De-escalation is supported by one RCT in stage II; escalating treatment for ctDNA-positive disease has not yet improved outcomes <span class="ev early">Early evidence</span> [[Tie2022,Tie2025,Bando2026]].`,
  pt:`A negative test can spare chemotherapy. A positive test warns of risk, but trials have not yet found a better treatment for those people.`,
  hook:`ctDNA: strongly prognostic; de-escalation proven only in stage II (DYNAMIC).`}
];
function cuSet(seed,n,excl){const r=rng(seed),a=[...Array(100).keys()].filter(i=>!(excl||[]).includes(i));for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a.slice(0,n)}
inits.cure=()=>{
  /* ---------- DYNAMIC ---------- */
  const svg=$('#cuSvg'),rg=$('#cuT');
  const PB=cuSet(11,15),NB=[...Array(100).keys()].filter(i=>!PB.includes(i));
  const RB=PB.slice(0,2).concat(cuSet(29,5,PB)),CA=cuSet(5,28),RA=cuSet(17,8);
  function grid(x0,y0,sp,arm,t,p,N){let s='';const sz=sp*.8;
    const scan=ramp(t,.22,.4)*10,chem=ramp(t,.44,.56),rec=ramp(t,.64,.74),dimA=arm==='A'&&p===4;
    for(let i=0;i<100;i++){const c=i%10,r=Math.floor(i/10),x=x0+c*sp+sp/2,y=y0+r*sp;
      let fill='var(--muted)',op=.55,ring=false;
      if(arm==='B'){if(scan>r+.5){fill=PB.includes(i)?'var(--tumour)':'var(--good)';op=1}
        if(PB.includes(i)&&chem*15>PB.indexOf(i))ring=true}
      else{if(CA.includes(i)&&chem*28>CA.indexOf(i)){ring=true;fill='var(--ink)';op=.8}}
      const R=arm==='A'?RA:RB,ri=R.indexOf(i),gone=ri>=0&&rec*R.length>ri;
      if(gone){fill='var(--bad)';op=1}
      if(dimA)op*=.35;
      if(p===4&&arm==='B'&&!PB.includes(i)&&!gone)op=.55;
      s+=person(x,y,sz,fill,{op:f1(op)});
      if(ring)s+=`<circle cx="${f1(x)}" cy="${f1(y+sz*.5)}" r="${f1(sp*.5)}" style="fill:none;stroke:var(--rx);stroke-width:1.6;opacity:${dimA?.35:1}"/>`;
      if(gone)s+=`<path d="M${f1(x-sp*.3)} ${f1(y-1)}l${f1(sp*.6)} ${f1(sp*.6)}m0 ${f1(-sp*.6)}l${f1(-sp*.6)} ${f1(sp*.6)}" style="stroke:var(--bad);stroke-width:1.3;opacity:${dimA?.35:1}"/>`}
    /* scan line + tube */
    if(arm==='B'&&t>=.2&&t<.42){const yy=y0+Math.min(scan,10)*sp-2;s+=`<line x1="${x0-4}" x2="${x0+10*sp+4}" y1="${f1(yy)}" y2="${f1(yy)}" style="stroke:var(--accent);stroke-width:2;opacity:.8"/>`+tube(x0+10*sp+14,yy+6,.55,{fill:.7})}
    return s}
  function bar(x,y,w,frac,col,lab,val){return `<text x="${f1(x)}" y="${f1(y)}" class="t-sm" style="fill:var(--ink)">${lab}</text><rect x="${f1(x)}" y="${f1(y+5)}" width="${f1(w)}" height="13" rx="3" style="fill:var(--panel-2)"/><rect x="${f1(x)}" y="${f1(y+5)}" width="${f1(Math.max(0,w*frac))}" height="13" rx="3" style="fill:${col}"/><text x="${f1(x+w*frac+6)}" y="${f1(y+16)}" class="t-sm" style="fill:var(--ink);font-weight:700">${val}</text>`}
  function panel(px,py,pw,ph,t,p,N){const st=CU_STEPS[p],g=ease(ramp(t,st.from+.01,st.from+.12)),x=px+14,w=pw-28-60,rh=N?40:48;let y=py+70;
    const H=[['455 PEOPLE · STAGE II','Who needs chemotherapy?'],['THE BLOOD TEST','Sorting by ctDNA'],['ADJUVANT CHEMOTHERAPY','Chemotherapy use'],['2-YEAR RECURRENCE-FREE','Same protection'],['INSIDE THE GUIDED ARM','3-year RFS by ctDNA result']][p];
    let s=`<rect x="${px}" y="${py}" width="${pw}" height="${ph}" rx="12" style="fill:var(--field);stroke:var(--line)"/><text x="${x}" y="${py+24}" class="t-sm">${H[0]}</text><text x="${x}" y="${py+46}" class="t-big" style="font-size:18px">${H[1]}</text>`;
    if(p===0){s+=`<text x="${x}" y="${y+24}" style="font:800 34px var(--display);fill:var(--brand)">${Math.round(455*g)}</text><text x="${x+84}" y="${y+10}" class="t-sm">people randomised after</text><text x="${x+84}" y="${y+26}" class="t-sm">surgery for stage II colon cancer</text>`;
      y+=58;s+=`<rect x="${x}" y="${y}" width="${f1((pw-28)/2-6)}" height="44" rx="8" style="fill:var(--panel-2)"/><text x="${x+10}" y="${y+18}" class="t-sm" style="fill:var(--ink);font-weight:700">Standard care</text><text x="${x+10}" y="${y+34}" class="t-sm">clinician decides</text>`;
      const x2=x+(pw-28)/2+6;s+=`<rect x="${x2}" y="${y}" width="${f1((pw-28)/2-6)}" height="44" rx="8" style="fill:var(--accent-soft)"/><text x="${x2+10}" y="${y+18}" class="t-sm" style="fill:var(--ink);font-weight:700">ctDNA-guided</text><text x="${x2+10}" y="${y+34}" class="t-sm">blood test decides</text>`;
      if(!N)s+=`<text x="${x}" y="${y+80}" class="t-sm">Each icon on the left = 1% of an arm.</text>`}
    else if(p===1){const sc=Math.min(10,ramp(t,.22,.4)*10),rev=i=>Math.floor(i/10)<sc-.5;const pos=PB.filter(rev).length,neg=NB.filter(rev).length;
      const bx=(c,yy,col,soft,a,b,n)=>`<rect x="${x}" y="${yy}" width="${pw-28}" height="46" rx="8" style="fill:${soft}"/><circle cx="${x+16}" cy="${yy+23}" r="7" style="fill:${col}"/><text x="${x+32}" y="${yy+19}" class="t-sm" style="fill:var(--ink);font-weight:700">${a}</text><text x="${x+32}" y="${yy+35}" class="t-sm">${b}</text><text x="${x+pw-42}" y="${yy+29}" class="t-mid" style="font:800 20px var(--display);fill:${col}">${n}</text>`;
      s+=bx(0,y,'var(--good)','var(--good-soft)','ctDNA not found','no chemotherapy',neg);s+=bx(0,y+56,'var(--tumour)','var(--tumour-soft)','ctDNA found','chemotherapy',pos);
      s+=`<text x="${x}" y="${y+124}" class="t-sm">Counts are icons in the schematic arm.</text>`;
      if(!N)s+=`<text x="${x}" y="${y+160}" class="t-sm" style="fill:var(--ink)">Without treatment, ctDNA rarely clears</text><text x="${x}" y="${y+176}" class="t-sm">by itself: 1.9% in GALAXY.</text>`}
    else if(p===2){s+=bar(x,y,w,.28*g/.35,'var(--ink)','Standard care',Math.round(28*g)+'%');s+=bar(x,y+rh,w,.15*g/.35,'var(--rx)','ctDNA-guided',Math.round(15*g)+'%');
      y+=2*rh+14;s+=`<text x="${x}" y="${y}" style="font:800 22px var(--display);fill:var(--rx)">≈ half as much</text><text x="${x}" y="${y+18}" class="t-sm">adjuvant chemotherapy with ctDNA guidance</text>`;
      if(!N)s+=`<text x="${x}" y="${y+56}" class="t-sm" style="fill:var(--ink)">In stage III (DYNAMIC-III), de-escalation</text><text x="${x}" y="${y+72}" class="t-sm">cut oxaliplatin use to 34.8% vs 88.6%.</text>`}
    else if(p===3){s+=bar(x,y,w,.924*g,'var(--ink)','Standard care',f1(92.4*g)+'%');s+=bar(x,y+rh,w,.935*g,'var(--rx)','ctDNA-guided',f1(93.5*g)+'%');
      y+=2*rh+14;s+=`<text x="${x}" y="${y}" style="font:800 22px var(--display);fill:var(--good)">Non-inferior</text><text x="${x}" y="${y+18}" class="t-sm">difference 1.1 points (95% CI −4.1 to 6.2)</text>`;
      y+=44;const cx=v=>lerp(x+10,x+pw-38,(v+6)/14),cg=ease(ramp(t,.7,.78));
      s+=`<line x1="${f1(cx(-6))}" x2="${f1(cx(8))}" y1="${y+20}" y2="${y+20}" class="axis"/>`;[-6,-4,-2,0,2,4,6,8].forEach(v=>s+=`<text x="${f1(cx(v))}" y="${y+36}" class="t-xs t-mid">${v>0?'+':''}${v}</text>`);
      s+=`<line x1="${f1(cx(0))}" x2="${f1(cx(0))}" y1="${y+4}" y2="${y+24}" style="stroke:var(--muted);stroke-dasharray:3 3"/>`;
      s+=`<line x1="${f1(cx(1.1-5.2*cg))}" x2="${f1(cx(1.1+5.1*cg))}" y1="${y+12}" y2="${y+12}" style="stroke:var(--good);stroke-width:3;stroke-linecap:round"/><circle cx="${f1(cx(1.1))}" cy="${y+12}" r="5" style="fill:var(--good)"/>`;
      s+=`<text x="${x}" y="${y+54}" class="t-xs">RFS difference, guided minus standard (points)</text>`}
    else{s+=bar(x,y,w,.864*g,'var(--tumour)','ctDNA+ · chemotherapy',f1(86.4*g)+'%');s+=bar(x,y+rh,w,.925*g,'var(--good)','ctDNA− · no chemotherapy',f1(92.5*g)+'%');
      y+=2*rh+14;s+=`<text x="${x}" y="${y}" style="font:800 22px var(--display);fill:var(--tumour)">HR 10.0</text><text x="${x}" y="${y+18}" class="t-sm">for recurrence if ctDNA-positive 4 weeks</text><text x="${x}" y="${y+33}" class="t-sm">after surgery (GALAXY)</text>`;
      if(!N)s+=`<text x="${x}" y="${y+66}" class="t-sm" style="fill:var(--ink)">But treating ctDNA-positive disease early</text><text x="${x}" y="${y+82}" class="t-sm">(ALTAIR) did not clearly help: HR 0.79.</text>`}
    return s}
  function draw(t){const N=vb(svg,'720 380','400 600');const p=phaseOf(CU_STEPS,t);
    const L=N?{a:20,b:212,y0:66,sp:17,hy:30,lg:250,px:12,py:300,pw:376,ph:290}:{a:22,b:204,y0:70,sp:16.5,hy:36,lg:256,px:394,py:14,pw:314,ph:352};
    let s='';const fi=ramp(t,0,.08);
    s+=`<g style="opacity:${f1(.25+.75*fi)}">`;
    s+=`<text x="${L.a}" y="${L.hy}" class="t-lbl">Standard care</text><text x="${L.a}" y="${L.hy+16}" class="t-xs">clinician decides</text>`;
    s+=`<text x="${L.b}" y="${L.hy}" class="t-lbl" style="fill:var(--accent)">ctDNA-guided</text><text x="${L.b}" y="${L.hy+16}" class="t-xs">blood test decides</text>`;
    s+=grid(L.a,L.y0,L.sp,'A',t,p,N)+grid(L.b,L.y0,L.sp,'B',t,p,N)+'</g>';
    /* legend */
    const lg=[['var(--good)','no ctDNA'],['var(--tumour)','ctDNA found'],['var(--rx)','chemotherapy','ring'],['var(--bad)','recurred']];
    lg.forEach((d,i)=>{const lx=L.a+(N?(i%2)*190:i*86),ly=L.lg+(N?Math.floor(i/2)*18:0);
      s+=d[2]?`<circle cx="${lx+6}" cy="${ly-4}" r="6" style="fill:none;stroke:${d[0]};stroke-width:1.8"/>`:`<circle cx="${lx+6}" cy="${ly-4}" r="5" style="fill:${d[0]}"/>`;
      s+=`<text x="${lx+16}" y="${ly}" class="t-xs">${d[1]}</text>`});
    if(!N){const tl=[['surgery',0],['blood test',.2],['chemotherapy',.42],['2 years',.62],['3 years',.82]];
      s+=`<line x1="30" x2="356" y1="300" y2="300" class="axis"/>`;
      tl.forEach(([l,v])=>{const x=30+v*326/.82*.98;s+=`<circle cx="${f1(x)}" cy="300" r="4" style="fill:${t>=v?'var(--rx)':'var(--panel-2)'};stroke:var(--rx)"/><text x="${f1(x)}" y="318" class="t-xs t-mid">${l}</text>`});
      s+=`<circle cx="${f1(30+Math.min(t,.82)*326/.82*.98)}" cy="300" r="7" style="fill:none;stroke:var(--ink);stroke-width:1.5"/>`}
    s+=panel(L.px,L.py,L.pw,L.ph,t,p,N);
    svg.innerHTML=s;setSt(p);
    $('#cuNote').innerHTML=noteHTML(CU_STEPS[p]);
    const chem=ramp(t,.44,.56);
    $('#cuRead').innerHTML=`<span>chemotherapy <b>${Math.round(28*chem)}% vs ${Math.round(15*chem)}%</b></span><span>2-year RFS <b>${t>=.62?'92.4% vs 93.5%':'—'}</b></span><span>arms <b>standard vs ctDNA-guided</b></span>`}
  const stop=playWire(rg,$('#cuPlay'),draw,22000,'Replay','cure');
  const setSt=stepWire($('#cuSteps'),CU_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- DYNAMIC-III ---------- */
  const ds=$('#cuD3'),dr=$('#cuD3T');let mode='pn';
  const D3={pn:{arms:[['ctDNA-negative after surgery',87,'var(--good)'],['ctDNA-positive after surgery',49,'var(--tumour)']],k:'ctDNA-negative vs positive'},
            q:{arms:[['Lowest ctDNA-burden quartile',77,'var(--warn)'],['Highest ctDNA-burden quartile',23,'var(--tumour)']],k:'ctDNA burden, positive patients'}};
  function drawD(u){const N=vb(ds,'720 300','400 420'),M=u*36,D=D3[mode];
    const X0=N?46:60,X1=N?384:470,Y0=N?96:86,Y1=N?286:262,X=m=>lerp(X0,X1,m/36),Y=v=>lerp(Y1,Y0,v);
    let s='';
    /* split bar */
    const bw=(N?372:410),bx=N?14:60,neg=.725*ease(ramp(u,0,.15));
    s+=`<text x="${bx}" y="20" class="t-sm">AFTER SURGERY · 968 EVALUABLE · STAGE III</text>`;
    s+=`<rect x="${bx}" y="30" width="${bw}" height="22" rx="5" style="fill:var(--tumour-soft)"/><rect x="${bx}" y="30" width="${f1(bw*neg)}" height="22" rx="5" style="fill:var(--good-soft);stroke:var(--good)"/>`;
    s+=`<text x="${bx+8}" y="46" class="t-sm" style="fill:var(--good);font-weight:700">${f1(neg*100)}% ctDNA-negative</text><text x="${bx+bw-8}" y="46" class="t-sm t-end" style="fill:var(--tumour);font-weight:700">${f1(100-neg*100)}% positive</text>`;
    s+=`<text x="${X0}" y="${Y0-12}" class="t-sm">% RECURRENCE-FREE · SCHEMATIC</text>`;
    [0,.25,.5,.75,1].forEach(v=>s+=`<line x1="${X0}" x2="${X1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/><text x="${X0-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v*100}%</text>`);
    for(let m=0;m<=36;m+=6)s+=`<text x="${f1(X(m))}" y="${Y1+15}" class="t-xs t-mid">${m}</text>`;
    s+=`<line x1="${X0}" x2="${X1}" y1="${Y1}" y2="${Y1}" class="axis"/><text x="${X1}" y="${Y1+28}" class="t-xs t-end">months</text>`;
    const S=(a,m)=>Math.pow(a[1]/100,m/36);
    D.arms.forEach(a=>{s+=`<path d="${pathFn(v=>1-S(a,v*36),X0,X1,Y0,Y1)}" style="fill:none;stroke:${a[2]};stroke-width:1.5;opacity:.22"/>`;
      if(M>0)s+=`<path d="${pathFn(v=>1-S(a,v*M),X0,X(M),Y0,Y1,80)}" style="fill:none;stroke:${a[2]};stroke-width:2.8"/>`;
      s+=`<circle cx="${f1(X(M))}" cy="${f1(Y(S(a,M)))}" r="4" style="fill:var(--panel);stroke:${a[2]};stroke-width:2"/>`;
      if(M>=35.9)s+=`<text x="${f1(X1-6)}" y="${f1(Y(a[1]/100)-8)}" class="t-lbl t-end" style="fill:${a[2]}">${a[1]}%</text>`});
    s+=`<line x1="${f1(X(M))}" x2="${f1(X(M))}" y1="${Y0}" y2="${Y1}" style="stroke:var(--ink);opacity:.3"/>`;
    const lx=N?X0-30:492;let ly=N?Y1+50:Y0+10;
    D.arms.forEach(a=>{s+=`<rect x="${lx}" y="${ly-8}" width="14" height="5" rx="2" style="fill:${a[2]}"/><text x="${lx+20}" y="${ly-2}" class="t-xs" style="fill:var(--ink);font-weight:700">${a[0]}</text><text x="${lx+20}" y="${ly+12}" class="t-xs">3-year RFS ${a[1]}% · now ≈ ${Math.round(S(a,M)*100)}%</text>`;ly+=36});
    if(!N)s+=`<text x="${lx}" y="${ly+6}" class="t-xs">Month ${Math.round(M)} of 36</text>`;
    ds.innerHTML=s;
    dr.setAttribute('aria-valuetext',`Month ${Math.round(M)}: `+D.arms.map(a=>`${a[0]} about ${Math.round(S(a,M)*100)}%`).join(', '));
    $('#cuD3Note').innerHTML=noteHTML(mode==='pn'?{k:'DYNAMIC-III · '+D.k,t:'A strong warning signal',
      txt:`Three-year RFS was 87% for ctDNA-negative vs 49% for ctDNA-positive patients. In ctDNA-negative patients, de-escalation cut oxaliplatin use (34.8% vs 88.6%) and hospitalisation (8.5% vs 13.2%), but RFS was slightly lower (85.3% vs 88.1%) and missed the non-inferiority margin <span class="ev early">Early evidence</span>. [[Tie2025]]`,
      pt:`A negative blood test after surgery meant a much better outlook. But using it to give less chemotherapy in stage III was not proven safe.`,
      hook:`DYNAMIC-III: 3-year RFS 87% (ctDNA−) vs 49% (ctDNA+); 72.5% were negative.`}
     :{k:'DYNAMIC-III · '+D.k,t:'More ctDNA, more risk',
      txt:`Among ctDNA-positive patients, 3-year RFS fell from 77% in the lowest ctDNA-burden quartile to 23% in the highest. Escalated chemotherapy did not improve 2-year RFS over standard therapy (51% vs 61%), and in ALTAIR early trifluridine/tipiracil did not significantly improve DFS (HR 0.79). [[Tie2025,Bando2026]]`,
      pt:`The more tumour DNA in the blood, the higher the chance of the cancer coming back. Simply giving stronger chemotherapy did not help.`,
      hook:`ctDNA escalation (DYNAMIC-III, ALTAIR): no benefit yet; new strategies needed.`})}
  playWire(dr,$('#cuD3Play'),drawD,8000,'Replay','cure');
  $$('[data-cud3]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.cud3;$$('[data-cud3]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawD(+dr.value)}));
  drawD(+dr.value);

  /* ---------- evidence filter ---------- */
  const cards=$$('#cuCards .card'),NM={all:'routes',est:'established routes',early:'routes with early evidence',hyp:'hypotheses'};
  function filt(f){let n=0;cards.forEach(c=>{const on=f==='all'||c.dataset.ev===f;c.hidden=!on;if(on)n++});
    $$('[data-cuf]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.cuf===f));$('#cuCount').textContent=`${n} ${NM[f]}`}
  $$('[data-cuf]').forEach(b=>b.addEventListener('click',()=>filt(b.dataset.cuf)));
  filt('all');
};
