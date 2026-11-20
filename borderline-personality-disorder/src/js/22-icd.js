/* =============== 2.2 ICD-11 & dimensional models =============== */
const IC_STEPS=[
 {from:0,at:.12,k:'ICD-10 · 1992',t:'Named boxes',
  txt:`ICD-10 listed separate, named personality disorders. BPD sat inside emotionally unstable personality disorder as its borderline type, F60.31, beside an impulsive type; Danish register studies of BPD use the F60.31 code. [[Kjaer2020]] The two subtypes still echo in data: among 506 help-seeking adolescents, latent class analysis found a broad "borderline" group (86.8%) and an "impulsive" group high only on impulsivity and anger (13.2%). [[Cavelti2021]]`,
  pt:`Older systems sorted people into named boxes. BPD was one box inside "emotionally unstable".`,
  hook:`ICD-10 F60.31: emotionally unstable personality disorder, borderline type.`},
 {from:.2,at:.36,k:'ICD-11 · 6D10',t:'One disorder, graded by severity',
  txt:`ICD-11, approved in May 2019 and used for health reporting from 1 January 2022, removes every named type. [[Reed2019]] What remains is one personality disorder, 6D10, graded mild (6D10.0), moderate (6D10.1) or severe (6D10.2). [[Sharan2023,Mulder2021]] It needs an enduring disturbance in self-functioning (identity, self-worth, accuracy of self-view, self-direction) and/or interpersonal functioning, lasting more than 2 years and showing across situations. Below the threshold, personality difficulty (QE50.7) is not a mental disorder. [[Bach2018BMC]] Move the severity slider.`,
  pt:`ICD-11 first asks how much a person's personality difficulties affect their life: mild, moderate or severe.`,
  hook:`6D10.0 mild · 6D10.1 moderate · 6D10.2 severe. QE50.7 personality difficulty is not a disorder.`},
 {from:.42,at:.58,k:'Trait domains · 6D11.0–.4',t:'Five domains describe the style',
  txt:`Severity says how much; optional trait-domain specifiers say what kind: Negative Affectivity (6D11.0), Detachment (6D11.1), Dissociality (6D11.2), Disinhibition (6D11.3) and Anankastia (6D11.4). As many as apply can be recorded. [[Sharan2023,Bach2018BMC]] In 606 patients from depression trials, BPD symptoms went with greater ICD-11 severity and mapped mainly onto Negative Affectivity, Dissociality and Disinhibition, with weak links to Anankastia and Detachment. [[Mulder2020]] Switch the trait model to compare the DSM-5 domains.`,
  pt:`Next, ICD-11 describes the person's style, for example strong negative emotions or acting on impulse.`,
  hook:`ICD-11 domains: Negative Affectivity, Detachment, Dissociality, Disinhibition, Anankastia. ICD-11 has no psychoticism domain; DSM-5 has no anankastia domain.`},
 {from:.62,at:.76,k:'Specifier · 6D11.5',t:'The borderline pattern',
  txt:`After lengthy debate, ICD-11 kept an optional borderline pattern, [[Tyrer2019]] added to enhance clinical utility, including identifying people who may respond to certain psychotherapies. [[Sharan2023]] It is the only ICD-11 personality specifier defined polythetically: at least 5 of 9 features adapted from the DSM-5 criteria. Its mood states "typically last for a few hours but may last for up to several days", and it may note a view of the self as inadequate or bad, profound alienation and loneliness, and rejection hypersensitivity. [[Bach2018BMC]]`,
  pt:`The word "borderline" survives in ICD-11 as an extra label added after the severity rating.`,
  hook:`A full ICD-11 label: "Moderate personality disorder, with borderline pattern, with Negative Affectivity, Disinhibition and Dissociality". [[Bach2018BMC]]`},
 {from:.8,at:.95,k:'DSM-5-TR Section III',t:'The Alternative Model (AMPD)',
  txt:`DSM-5-TR keeps the nine-criterion category in Section II, and offers an Alternative Model in Section III. For BPD, Criterion A is moderate or greater impairment in 2 or more of identity, self-direction, empathy and intimacy. Criterion B is 4 or more of 7 traits (emotional lability, anxiousness, separation insecurity, depressivity, impulsivity, risk taking, hostility), at least one of which is impulsivity, risk taking or hostility. [[APA2022,Kaess2025]] When 20 experts translated the criteria, 19 rated personality functioning impaired whenever 5 or more criteria were present. [[Mulay2019]]`,
  pt:`The DSM's alternative model also starts with how well personality is working, then lists traits, much like ICD-11.`,
  hook:`AMPD BPD: A = impairment in ≥2 of identity, self-direction, empathy, intimacy. B = ≥4 of 7 traits, including impulsivity, risk taking or hostility.`}
];
const IC_SEV=[
 {n:'Personality difficulty',c:'QE50.7',col:'var(--muted)',d:['Not a mental disorder: listed among factors','influencing health status','Relatively stable (at least 2 years),','intermittent or low-intensity difficulties']},
 {n:'Mild',c:'6D10.0',col:'var(--dx)',d:['Harm to self or others: typically not','Impairment: limited to circumscribed areas','Under stress: some distortion of appraisals,','reality testing intact']},
 {n:'Moderate',c:'6D10.1',col:'var(--warn)',d:['Harm to self or others: sometimes','Impairment: marked (some areas may be kept)','Under stress: marked distortions; possibly mild','dissociative states or psychotic-like beliefs']},
 {n:'Severe',c:'6D10.2',col:'var(--storm)',d:['Harm to self or others: often','Impairment: in all or nearly all areas','Under stress: often dissociative states or','psychotic-like beliefs (e.g. extreme paranoia)']}
];
const IC_DOM={icd:[['Negative','Affectivity',.86],['Detachment','',.24],['Dissociality','',.5],['Disinhibition','',.78],['Anankastia','',.14]],
  ampd:[['Negative','Affectivity',.86],['Detachment','',.24],['Antagonism','',.5],['Disinhibition','',.78],['Psychoticism','',.3]]};
const IC_ICD=['Borderline pattern','Severity · self','Severity · interpersonal','Severity · harm','Severity · under stress','Negative Affectivity','Disinhibition','Dissociality'];
const IC_AM=['A · Identity','A · Self-direction','A · Empathy','A · Intimacy','B · Emotional lability','B · Anxiousness','B · Separation insecurity','B · Depressivity','B · Impulsivity','B · Risk taking','B · Hostility'];
const IC_MAP=[
 {n:'Abandonment fears',i:[0,2],a:[6,5,3],tx:`ICD-11's borderline pattern lists the same feature, and interpersonal dysfunction is part of the ICD-11 general requirement graded by severity. [[Bach2018BMC]] In the AMPD, separation insecurity and anxiousness are among the seven BPD traits, and intimacy is a Criterion A area. [[Kaess2025]]`},
 {n:'Unstable relationships',i:[0,2],a:[3,2],tx:`A borderline pattern feature; interpersonal dysfunction is graded within ICD-11 severity. [[Bach2018BMC]] The AMPD covers relationships through its Criterion A areas of empathy and intimacy. [[Kaess2025]] Relationship difficulties were central in adult symptom networks. [[Peters2023]]`},
 {n:'Identity disturbance',i:[0,1],a:[0,1],tx:`ICD-11 grades self-functioning, including identity, self-worth, accuracy of self-view and self-direction, as part of severity. [[Bach2018BMC]] AMPD Criterion A begins with identity and self-direction. [[Kaess2025]]`},
 {n:'Impulsivity',i:[0,6],a:[8,9],tx:`Disinhibition is a tendency to act rashly on immediate stimuli without considering negative consequences. [[Bach2018BMC]] AMPD Criterion B includes impulsivity and risk taking, and at least one of these (or hostility) is required. [[Kaess2025]]`},
 {n:'Suicidal or self-harming behaviour',i:[0,3],a:[7,8],tx:`ICD-11 grades harm to self or others within severity: typically not in mild, sometimes in moderate and often in severe personality disorder. [[Bach2018BMC]] None of the seven AMPD BPD traits names it directly; depressivity and impulsivity are the nearest by definition in this teaching map. [[Kaess2025]]`},
 {n:'Affective instability',i:[0,5],a:[4],tx:`Negative Affectivity is a tendency to experience a broad range of negative emotions with frequency and intensity out of proportion to the situation. The borderline pattern's mood states "typically last for a few hours but may last for up to several days". [[Bach2018BMC]] AMPD trait: emotional lability. [[Kaess2025]]`},
 {n:'Chronic emptiness',i:[0,1],a:[7,0],tx:`A borderline pattern feature; the pattern can also note a view of the self as inadequate or bad, and profound alienation and loneliness. [[Bach2018BMC]] In the AMPD the nearest elements are depressivity and the identity area of Criterion A. [[Kaess2025]]`},
 {n:'Intense anger',i:[0,5,7],a:[10],tx:`In 606 patients, BPD symptoms mapped onto Negative Affectivity, Dissociality and Disinhibition. [[Mulder2020]] AMPD trait: hostility, one of the three traits of which at least one is required. [[Kaess2025]]`},
 {n:'Paranoia or dissociation',i:[0,4],a:[],tx:`ICD-11 grades reactions under stress within severity: mild dissociative states or psychotic-like beliefs may occur in moderate, and are often present in severe personality disorder, for example extreme paranoid reactions. ICD-11 has no psychoticism domain. [[Bach2018BMC]] It is not among the seven AMPD BPD traits. [[Kaess2025]]`}
];
function icWrap(t,n){const w=t.split(' '),L=[];let c='';w.forEach(x=>{if((c+' '+x).trim().length>n){L.push(c.trim());c=x}else c+=' '+x});if(c.trim())L.push(c.trim());return L}
inits.icd=()=>{
  const svg=$('#icSvg'),rg=$('#icT'),sev=$('#icSev'),note=$('#icNote'),rd=$('#icRead');let view='icd',setA=()=>{},lastP=-1;
  const sevIdx=v=>v<.25?0:v<.5?1:v<.75?2:3;
  function draw(t){
    const N=vb(svg,'720 380','400 600'),P=phaseOf(IC_STEPS,t),sv=+sev.value,si=sevIdx(sv),S=IC_SEV[si];
    if(P!==lastP){lastP=P;setA(P);note.innerHTML=noteHTML(IC_STEPS[P])}
    const sb=ramp(t,.03,.12),m=ease(ramp(t,.2,.34)),r=ease(ramp(t,.42,.56)),bp=ramp(t,.62,.76),am=ease(ramp(t,.8,.93));
    const W=N?400:720;let s='';
    const head=['ICD-10 (1992): named personality disorders','ICD-11 (2022): one personality disorder, graded','ICD-11: severity + trait domains','ICD-11: severity + domains + borderline pattern','DSM-5-TR Section III: Alternative Model'][P];
    s+=`<text x="${N?14:20}" y="22" class="t-sm" style="fill:var(--dx)">${head.toUpperCase()}</text>`;
    /* ---- boxes -> bar ---- */
    const bar=N?{x:20,y:44,w:360,h:40}:{x:150,y:40,w:420,h:40};
    let box=[];
    if(N){for(let i=0;i<7;i++){if(i===3){box.push({x:60,y:144,w:280,h:44});continue}const k=i<3?i:i-1;box.push({x:14+(k%3)*126,y:44+Math.floor(k/3)*44,w:118,h:34})}}
    else{let x=42;for(let i=0;i<7;i++){const w=i===3?120:76;box.push({x,y:42,w,h:40});x+=w+10}}
    const fade=1-r*.0,boxOp=1-am;
    if(m<1)box.forEach((b,i)=>{const x=lerp(b.x,bar.x+(bar.w/7)*i,m),y=lerp(b.y,bar.y,m),w=lerp(b.w,bar.w/7+1,m),h=lerp(b.h,bar.h,m),hl=i===3;
      s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(lerp(8,0,m))}" style="fill:${hl?'var(--dx-soft)':'var(--panel-2)'};stroke:${hl?'var(--dx)':'var(--line)'};stroke-width:${hl?1.8:1}"/>`;
      if(m<.5){const o=1-m*2;if(hl)s+=`<text x="${f1(x+w/2)}" y="${f1(y+h/2-2)}" class="t-xs t-mid" style="fill:var(--dx);font-weight:700;opacity:${f1(o)}">F60.3 Emotionally</text><text x="${f1(x+w/2)}" y="${f1(y+h/2+10)}" class="t-xs t-mid" style="fill:var(--dx);opacity:${f1(o)}">unstable PD</text>`;
        else s+=`<text x="${f1(x+w/2)}" y="${f1(y+h/2+3)}" class="t-xs t-mid" style="opacity:${f1(o)}">named type</text>`}});
    /* sub-types */
    const so=sb*(1-ramp(t,.2,.27));
    if(so>0){const b3=box[3],cx=b3.x+b3.w/2,sy=N?226:122,sw=N?170:156,gap=N?8:16;
      [['Impulsive type',''],['Borderline type','F60.31']].forEach(([a,c],k)=>{const x=k?cx+gap/2:cx-gap/2-sw;
        s+=`<g style="opacity:${f1(so)}"><path d="M${f1(cx)} ${f1(b3.y+b3.h)}L${f1(x+sw/2)} ${f1(sy)}" class="arrow"/><rect x="${f1(x)}" y="${sy}" width="${sw}" height="42" rx="8" style="fill:${k?'var(--storm-soft)':'var(--panel-2)'};stroke:${k?'var(--storm)':'var(--line)'};stroke-width:${k?1.8:1}"/>`+
          `<text x="${f1(x+sw/2)}" y="${sy+18}" class="t-lbl t-mid" style="fill:${k?'var(--storm)':'var(--ink)'}">${a}</text>`+(c?`<text x="${f1(x+sw/2)}" y="${sy+33}" class="t-xs t-mid" style="fill:var(--storm)">${c}</text>`:'')+'</g>'});
      if(!N&&so>.5)s+=`<text x="360" y="${(N?184:122)+70}" class="t-xs t-mid" style="opacity:${f1(so)}">F60.3 · emotionally unstable personality disorder, with two types</text>`}
    /* when: a small timeline */
    const tlo=N?sb*(1-r):sb*(1-m);
    if(tlo>0){const ty=N?480:300,tx=N?30:120,tw=N?340:480,TL=tline(tx,ty,tw,{min:1990,max:2025,step:5,fmt:v=>v});
      s+=`<g style="opacity:${f1(tlo)}">${TL.svg}`;
      [[1992,'ICD-10',0],[2019,'ICD-11 approved',1],[2022,'ICD-11 in use',-1]].forEach(([y,l,up])=>{const x=TL.X(y);s+=`<circle cx="${f1(x)}" cy="${ty}" r="6" style="fill:${y<2000?'var(--panel-2)':'var(--dx)'};stroke:var(--dx);stroke-width:1.5"/><text x="${f1(x)}" y="${ty-(up>0?30:up<0?-34:14)}" class="t-xs t-mid" style="fill:var(--dx);font-weight:700">${l}</text>`;if(up)s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${ty-26}" y2="${ty-7}" style="stroke:var(--dx);stroke-width:1"/>`});
      s+='</g>'}
    /* the ICD-11 bar */
    if(m>0){const o=m*boxOp;s+=`<g style="opacity:${f1(o)}"><rect x="${bar.x}" y="${bar.y}" width="${bar.w}" height="${bar.h}" rx="10" style="fill:var(--dx-soft);stroke:var(--dx);stroke-width:1.8"/>`+
      `<text x="${bar.x+bar.w/2}" y="${bar.y+17}" class="t-lbl t-mid" style="fill:var(--dx);opacity:${f1(ramp(m,.5,1))}">6D10 Personality disorder</text><text x="${bar.x+bar.w/2}" y="${bar.y+31}" class="t-xs t-mid" style="opacity:${f1(ramp(m,.5,1))}">${r>.05?'severity: '+S.n.toLowerCase()+' · '+S.c:'all named types removed'}</text></g>`}
    /* ---- severity gauge ---- */
    const go=ramp(t,.24,.34)*(1-r)*boxOp;
    if(go>0){const G=N?{cx:200,cy:250,R:118}:{cx:180,cy:310,R:118},dx=N?20:340,dy=N?300:138;
      const zc=['var(--panel-2)','var(--dx-soft)','var(--warn-soft)','var(--storm-soft)'],zs=['var(--muted)','var(--dx)','var(--warn)','var(--storm)'];
      const pt=(a,rr)=>[G.cx+rr*Math.cos(Math.PI*(1-a)),G.cy-rr*Math.sin(Math.PI*(1-a))];
      s+=`<g style="opacity:${f1(go)}">`;
      for(let z=0;z<4;z++){const a0=z/4,a1=(z+1)/4,p0=pt(a0,G.R),p1=pt(a1,G.R),q1=pt(a1,G.R-30),q0=pt(a0,G.R-30);
        s+=`<path d="M${f1(p0[0])} ${f1(p0[1])}A${G.R} ${G.R} 0 0 1 ${f1(p1[0])} ${f1(p1[1])}L${f1(q1[0])} ${f1(q1[1])}A${G.R-30} ${G.R-30} 0 0 0 ${f1(q0[0])} ${f1(q0[1])}Z" style="fill:${zc[z]};stroke:${z===si?zs[z]:'var(--line)'};stroke-width:${z===si?2:1}"/>`;
        const lp=pt((z+.5)/4,G.R+14),lb=['difficulty','mild','moderate','severe'][z];s+=`<text x="${f1(lp[0])}" y="${f1(lp[1])}" class="t-xs t-mid" style="fill:${zs[z]};font-weight:${z===si?700:500}">${lb}</text>`}
      const np=pt(sv,G.R-8);s+=`<line x1="${G.cx}" y1="${G.cy}" x2="${f1(np[0])}" y2="${f1(np[1])}" style="stroke:var(--ink);stroke-width:3;stroke-linecap:round"/><circle cx="${G.cx}" cy="${G.cy}" r="7" style="fill:var(--ink)"/>`;
      s+=`<text x="${G.cx}" y="${G.cy+22}" class="t-mid" style="font:800 18px var(--display);fill:${S.col}">${S.c}</text>`;
      s+=`<text x="${dx}" y="${dy}" class="t-big" style="fill:${S.col}">${S.n}</text>`;
      S.d.forEach((l,k)=>{s+=`<text x="${dx}" y="${dy+22+k*17+(k>=2?6:0)}" class="t-sm" style="fill:var(--ink)">${l}</text>`});
      s+=`<text x="${dx}" y="${dy+(N?100:120)}" class="t-xs">Personality difficulty sits below the disorder threshold.</text>`;
      s+='</g>'}
    /* ---- radar ---- */
    const ro=r*(1-am);
    if(ro>0){const R=N?{cx:200,cy:262,R:100}:{cx:262,cy:214,R:100},D=IC_DOM[view],g=v=>v;
      const pt=(k,v)=>{const a=(-90+k*72)*Math.PI/180;return [R.cx+R.R*v*Math.cos(a),R.cy+R.R*v*Math.sin(a)]};
      s+=`<g style="opacity:${f1(ro)}">`;
      [.25,.5,.75,1].forEach(q=>{let d='';for(let k=0;k<5;k++){const p=pt(k,q);d+=(k?'L':'M')+f1(p[0])+' '+f1(p[1])}s+=`<path d="${d}Z" style="fill:none;stroke:var(--line);stroke-width:1"/>`});
      for(let k=0;k<5;k++){const p=pt(k,1),l=pt(k,1.2),dk=D[k],shared=k<4,diff=view==='icd'?k===4:k===4;
        s+=`<line x1="${R.cx}" y1="${R.cy}" x2="${f1(p[0])}" y2="${f1(p[1])}" class="axis"/>`;
        const anc=Math.abs(l[0]-R.cx)<8?'t-mid':l[0]<R.cx?'t-end':'';
        s+=`<text x="${f1(l[0])}" y="${f1(l[1]+(k===0?-4:4))}" class="t-xs ${anc}" style="fill:${diff?'var(--gold)':'var(--ink)'};font-weight:600">${dk[0]}</text>`;
        if(dk[1])s+=`<text x="${f1(l[0])}" y="${f1(l[1]+8)}" class="t-xs ${anc}" style="fill:var(--ink);font-weight:600">${dk[1]}</text>`;
        if(diff)s+=`<text x="${f1(l[0])}" y="${f1(l[1]+16)}" class="t-xs ${anc}" style="fill:var(--gold)">${view==='icd'?'ICD-11 only':'DSM-5 only'}</text>`}
      const gr=ease(ramp(t,.46,.58));let d='';for(let k=0;k<5;k++){const p=pt(k,D[k][2]*gr);d+=(k?'L':'M')+f1(p[0])+' '+f1(p[1])}
      const pc=bp>0?'var(--storm)':'var(--dx)';
      s+=`<path d="${d}Z" style="fill:${pc};fill-opacity:.2;stroke:${pc};stroke-width:2.2;stroke-linejoin:round"/>`;
      for(let k=0;k<5;k++){const p=pt(k,D[k][2]*gr);s+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="3.5" style="fill:${pc}"/>`}
      s+=`<text x="${R.cx}" y="${R.cy+R.R+(N?40:20)}" class="t-xs t-mid">schematic profile · ${view==='icd'?'ICD-11 domains 6D11.0–.4':'DSM-5 AMPD trait domains'}</text>`;
      /* borderline pattern badge */
      if(bp>0){const B=N?{x:40,y:420,w:320,h:104}:{x:470,y:96,w:226,h:196};
        s+=`<g style="opacity:${f1(bp)}"><rect x="${B.x}" y="${B.y}" width="${B.w}" height="${B.h}" rx="12" style="fill:var(--storm-soft);stroke:var(--storm);stroke-width:1.8"/>`;
        s+=`<text x="${B.x+14}" y="${B.y+22}" class="t-lbl" style="fill:var(--storm)">6D11.5 Borderline pattern</text><text x="${B.x+14}" y="${B.y+37}" class="t-xs">optional specifier · ≥5 of 9 features</text>`;
        const lit=Math.floor(bp*5.999),dx0=B.x+14,dy0=B.y+(N?54:58);
        for(let k=0;k<9;k++){const cx=N?dx0+12+k*33:dx0+14+(k%3)*30,cy=N?dy0+6:dy0+6+Math.floor(k/3)*28;
          s+=`<circle cx="${cx}" cy="${cy}" r="10" style="fill:${k<lit?'var(--storm)':'var(--panel)'};stroke:var(--storm);stroke-width:1.4"/><text x="${cx}" y="${cy+3.5}" class="t-xs t-mid" style="fill:${k<lit?'var(--panel)':'var(--storm)'};font-weight:700">${k+1}</text>`}
        const tx=N?B.x+14:B.x+118,ty=N?B.y+86:B.y+66;
        const lines=N?[`mood states: a few hours, up to several days`]:['mood states:','a few hours,','up to several','days'];
        lines.forEach((l,k)=>{s+=`<text x="${tx}" y="${ty+k*13}" class="t-xs" style="fill:var(--ink)">${l}</text>`});
        if(!N)s+=`<text x="${B.x+14}" y="${B.y+164}" class="t-xs" style="fill:var(--ink)">${lit} of 9 shown ${lit>=5?'✓ pattern present':''}</text><text x="${B.x+14}" y="${B.y+180}" class="t-xs">only polythetic ICD-11 specifier</text>`;
        s+='</g>'}
      /* label builder */
      const lb={x:360,y:370},tok=[S.n==='Personality difficulty'?'Personality difficulty':S.n+' personality disorder'];
      if(bp>.3)tok.push('with borderline pattern');if(view==='icd'&&gr>.9)tok.push('with Negative Affectivity, Disinhibition'+(bp>.6?' and Dissociality':''));
      const full=tok.join(', ');
      if(N){const ls=icWrap(full,58);ls.forEach((l,k)=>{s+=`<text x="200" y="${562+k*13}" class="t-xs t-mid" style="fill:var(--ink);font-weight:600">${l}</text>`})}
      else s+=`<text x="${lb.x}" y="${lb.y}" class="t-xs t-mid" style="fill:var(--ink);font-weight:600">${full}</text>`;
      s+='</g>'}
    /* ---- AMPD ---- */
    if(am>0){const g=am,Aval=[.72,.58,.36,.78],Aname=[['Identity','self'],['Self-direction','self'],['Empathy','interpersonal'],['Intimacy','interpersonal']];
      const AL=N?{x:16,y:44,cw:180,ch:78,gap:8}:{x:24,y:56,cw:148,ch:120,gap:10};
      s+=`<g style="opacity:${f1(g)}"><text x="${AL.x}" y="${AL.y}" class="t-sm" style="fill:var(--dx)">CRITERION A · PERSONALITY FUNCTIONING</text>`;
      let nA=0;
      Aname.forEach(([n,dom],k)=>{const x=AL.x+(k%2)*(AL.cw+AL.gap),y=AL.y+12+Math.floor(k/2)*(AL.ch+AL.gap),v=Aval[k]*ramp(am,.1,.8),on=v>=.5;if(on)nA++;
        s+=`<rect x="${x}" y="${y}" width="${AL.cw}" height="${AL.ch}" rx="10" style="fill:var(--panel);stroke:${on?'var(--dx)':'var(--line)'};stroke-width:${on?1.8:1}"/>`;
        s+=`<text x="${x+12}" y="${y+20}" class="t-lbl">${n}</text><text x="${x+12}" y="${y+33}" class="t-xs">${dom}</text>`;
        const bx=x+12,bw=AL.cw-24,by=y+AL.ch-22;s+=`<rect x="${bx}" y="${by}" width="${bw}" height="10" rx="5" style="fill:var(--panel-2)"/><rect x="${bx}" y="${by}" width="${f1(bw*v)}" height="10" rx="5" style="fill:${on?'var(--dx)':'var(--muted)'}"/><line x1="${f1(bx+bw*.5)}" x2="${f1(bx+bw*.5)}" y1="${by-4}" y2="${by+14}" style="stroke:var(--ink);stroke-width:1.4"/>`;
        if(k===0)s+=`<text x="${f1(bx+bw*.5)}" y="${by-7}" class="t-xs t-mid">moderate</text>`});
      const ay=AL.y+12+2*(AL.ch+AL.gap)+(N?6:12);
      s+=`<text x="${AL.x}" y="${ay}" class="t-xs" style="fill:${nA>=2?'var(--good)':'var(--ink)'};font-weight:700">${nA} of 4 areas at moderate or worse ${nA>=2?'✓ (≥2 needed)':'(≥2 needed)'}</text>`;
      const TL=N?{x:16,y:ay+30,w:368,h:30}:{x:360,y:56,w:340,h:34};
      const tr=['Emotional lability','Anxiousness','Separation insecurity','Depressivity','Impulsivity','Risk taking','Hostility'],lit=[0,2,4,6],req=[4,5,6];
      s+=`<text x="${TL.x}" y="${TL.y}" class="t-sm" style="fill:var(--dx)">CRITERION B · 7 TRAITS, ≥4 NEEDED</text>`;
      let nB=0,rq=false;
      tr.forEach((n,k)=>{const on=lit.indexOf(k)>=0&&ramp(am,.2,.9)>=(lit.indexOf(k)+1)/4-.001;if(on){nB++;if(req.indexOf(k)>=0)rq=true}
        const cols=N?2:1,x=TL.x+(k%cols)*(TL.w/cols),y=TL.y+10+Math.floor(k/cols)*(TL.h+(N?4:4)),w=TL.w/cols-(N?6:0);
        s+=`<rect x="${f1(x)}" y="${y}" width="${f1(w)}" height="${TL.h}" rx="8" style="fill:${on?'var(--dx-soft)':'var(--panel)'};stroke:${on?'var(--dx)':'var(--line)'};stroke-width:${on?1.8:1}"/>`;
        s+=`<text x="${f1(x+12)}" y="${y+TL.h/2+4}" class="t-sm" style="fill:${on?'var(--dx)':'var(--ink)'};font-weight:${on?700:500}">${n}</text>`;
        if(req.indexOf(k)>=0)s+=`<text x="${f1(x+w-10)}" y="${y+TL.h/2+4}" class="t-xs t-end" style="fill:var(--gold);font-weight:700">★</text>`});
      const by2=TL.y+10+(N?4:7)*(TL.h+4)+(N?14:16);
      s+=`<text x="${TL.x}" y="${by2}" class="t-xs" style="fill:${nB>=4&&rq?'var(--good)':'var(--ink)'};font-weight:700">${nB} of 7 ${nB>=4&&rq?'✓ incl. a ★ trait':''}</text><text x="${TL.x}" y="${by2+13}" class="t-xs">★ at least one of impulsivity, risk taking, hostility</text>`;
      s+='</g>'}
    svg.innerHTML=s;
    rd.innerHTML=`<span>Severity <b>${S.n} (${S.c})</b></span><span>Trait model <b>${view==='icd'?'ICD-11: 5 domains incl. Anankastia':'DSM-5: 5 domains incl. Psychoticism'}</b></span>`;
  }
  const stop=playWire(rg,$('#icPlay'),draw,16000,'Replay','icd');
  setA=stepWire($('#icSteps'),IC_STEPS,rg,draw,stop);
  sev.addEventListener('input',()=>{stop();if(+rg.value<.24||+rg.value>=.8){rg.value=IC_STEPS[1].at}draw(+rg.value)});
  $$('[data-icv]').forEach(b=>b.addEventListener('click',()=>{view=b.dataset.icv;$$('[data-icv]').forEach(x=>x.setAttribute('aria-pressed',x===b));stop();if(+rg.value<.5||+rg.value>=.8)rg.value=IC_STEPS[2].at;draw(+rg.value)}));
  draw(+rg.value);

  /* ---------- the criterion map ---------- */
  const ms=$('#icMapSvg'),mn=$('#icMapNote'),cb=$('#icCrit'),tb=$('#icTbl');let cur=5,stopM=null,icTick=0;
  cb.innerHTML=IC_MAP.map((c,i)=>`<button class="btn" data-icc="${i}" aria-pressed="${i===cur}">${i+1} · ${c.n}</button>`).join('');
  tb.innerHTML=IC_MAP.map((c,i)=>`<tr data-r="${i}"><th><button data-icr="${i}" aria-pressed="${i===cur}"><b>${i+1}</b>${c.n}</button></th><td>${c.i.map(k=>IC_ICD[k]).join('; ')}</td><td>${c.a.length?c.a.map(k=>IC_AM[k]).join('; '):'Not among the seven BPD traits'}</td></tr>`).join('');
  function drawMap(p){
    const N=vb(ms,'720 330','400 392'),c=IC_MAP[cur];let s='';
    const L=N?{tx:200,ty:16,tw:300,lx:8,lw:176,rx:216,rw:176,ly:80,ry:80,lh:30,rh:30}:{tx:360,ty:12,tw:330,lx:24,lw:250,rx:446,rw:250,ly:82,ry:66,lh:30,rh:23.5};
    s+=`<rect x="${L.tx-L.tw/2}" y="${L.ty}" width="${L.tw}" height="36" rx="10" style="fill:var(--dx);stroke:var(--dx)"/><text x="${L.tx}" y="${L.ty+23}" class="t-lbl t-mid" style="fill:var(--panel)">DSM-5-TR ${cur+1} · ${c.n}</text>`;
    s+=`<text x="${L.lx}" y="${L.ly-14}" class="t-xs" style="fill:var(--dx);font-weight:700">ICD-11</text><text x="${L.rx+L.rw}" y="${L.ry-14+(N?0:0)}" class="t-xs t-end" style="fill:var(--dx);font-weight:700">AMPD (SECTION III)</text>`;
    const ox=L.tx,oy=L.ty+36;
    const edge=(x,y,k,n)=>{const q=ramp(p,k/(n+1)*.6,k/(n+1)*.6+.5);if(q<=0)return '';return `<path d="M${ox} ${oy}C${ox} ${f1(oy+40)} ${f1(x+(x<ox?30:-30))} ${f1(y)} ${f1(x)} ${f1(y)}" pathLength="1" style="fill:none;stroke:var(--dx);stroke-width:2;stroke-dasharray:1;stroke-dashoffset:${f1(1-q)};opacity:.75"/>`};
    const nE=c.i.length+c.a.length;let e=0;
    IC_ICD.forEach((n,k)=>{const y=L.ly+k*L.lh,on=c.i.indexOf(k)>=0;if(on)s+=edge(L.lx+L.lw,y+L.lh/2-3,e++,nE);
      s+=`<rect x="${L.lx}" y="${y}" width="${L.lw}" height="${L.lh-6}" rx="7" style="fill:${on?'var(--dx-soft)':'var(--panel)'};stroke:${on?'var(--dx)':'var(--line)'};stroke-width:${on?1.8:1}"/><text x="${L.lx+10}" y="${y+L.lh/2+1}" class="t-xs" style="fill:${on?'var(--dx)':'var(--muted)'};font-weight:${on?700:500}">${n}</text>`});
    IC_AM.forEach((n,k)=>{const y=L.ry+k*(N?L.rh*.88:L.rh),h=N?L.rh*.88-4:L.rh-4,on=c.a.indexOf(k)>=0;if(on)s+=edge(L.rx,y+h/2,e++,nE);
      s+=`<rect x="${L.rx}" y="${f1(y)}" width="${L.rw}" height="${f1(h)}" rx="7" style="fill:${on?'var(--dx-soft)':'var(--panel)'};stroke:${on?'var(--dx)':'var(--line)'};stroke-width:${on?1.8:1}"/><text x="${L.rx+10}" y="${f1(y+h/2+3.5)}" class="t-xs" style="fill:${on?'var(--dx)':'var(--muted)'};font-weight:${on?700:500}">${n}</text>`});
    if(!c.a.length){const y=L.ry+11*(N?L.rh*.88:L.rh)+12;s+=`<text x="${L.rx}" y="${f1(y)}" class="t-xs" style="fill:var(--warn)">no AMPD BPD trait</text>`}
    ms.innerHTML=s;
  }
  function pick(i){cur=i;$$('[data-icc]',cb).forEach(b=>b.setAttribute('aria-pressed',+b.dataset.icc===i));$$('[data-icr]',tb).forEach(b=>b.setAttribute('aria-pressed',+b.dataset.icr===i));
    $$('tr',tb).forEach(r=>r.classList.toggle('on',+r.dataset.r===i));
    const c=IC_MAP[i];mn.innerHTML=noteHTML({k:`Criterion ${i+1} · teaching map`,t:c.n,txt:c.tx,pt:i===2||i===5?`This criterion sits at the heart of BPD in every system: it is among the most central in symptom networks.`:`The same experience is described in all three systems, just filed in different places.`,
      hook:c.a.length?`AMPD counterpart${c.a.length>1?'s':''}: ${c.a.map(k=>IC_AM[k].slice(4)).join(', ')}.`:`ICD-11 grades stress-related paranoia and dissociation within severity; no AMPD BPD trait.`});
    if(stopM)stopM();const tk=++icTick;stopM=animate(700,drawMap,()=>{stopM=null});setTimeout(()=>{if(tk===icTick){if(stopM){stopM();stopM=null}drawMap(1)}},900)}
  cb.addEventListener('click',e=>{const b=e.target.closest('[data-icc]');if(b)pick(+b.dataset.icc)});
  tb.addEventListener('click',e=>{const b=e.target.closest('[data-icr]');if(b)pick(+b.dataset.icr)});
  const prevR=redraws.icd;redraws.icd=()=>{prevR&&prevR();drawMap(1)};
  pick(cur);drawMap(1);
};
