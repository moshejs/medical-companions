/* =============== 2.2 The 2017 hEDS criteria =============== */
inits.criteria=()=>{
  const svg=$('#crSvg'),rg=$('#crT');
  /* Feature A: short label for the animation, longer wording for the checklist */
  const A=[
    ['Soft skin','Unusually soft or velvety skin'],
    ['Skin stretch','Mild skin hyperextensibility','over 1.5 cm forearm or back of hand; over 3 cm neck, elbow, knee; over 1 cm palm'],
    ['Striae','Unexplained striae','back, groins, thighs, breasts or abdomen; no significant weight change'],
    ['Heel papules','Bilateral piezogenic papules of the heel'],
    ['Hernias','Recurrent or multiple abdominal hernias'],
    ['Atrophic scars','Atrophic scarring at 2 or more sites','not truly paper-thin or haemosiderotic'],
    ['Prolapse','Pelvic floor, rectal or uterine prolapse','only in children, men or nulliparous women, without other cause'],
    ['Palate, teeth','Dental crowding with a high or narrow palate'],
    ['Long fingers','Arachnodactyly','positive wrist or thumb sign on both sides'],
    ['Span ≥1.05','Arm span-to-height ratio ≥ 1.05'],
    ['MVP','Mitral valve prolapse','mild or greater on strict echo criteria'],
    ['Aortic root','Aortic root dilatation, Z-score above +2']];
  const CC=[['Pain in 2+ limbs','Musculoskeletal pain in two or more limbs, recurring daily for at least 3 months'],
    ['Widespread pain','Chronic widespread pain for 3 months or more'],
    ['Dislocations','Recurrent joint dislocations or frank joint instability without trauma']];
  const EX=[['No skin fragility','No unusual skin fragility'],
    ['No other CTD','Other heritable and acquired connective tissue disorders excluded','including autoimmune rheumatological conditions'],
    ['No alternative','Alternative diagnoses excluded','hypermobility from hypotonia or tissue laxity: neuromuscular disorders, other EDS types, Marfan, Loeys-Dietz, skeletal dysplasias']];
  const AFILL=[0,1,2,3,7];/* the illustrative person's five Feature A items, in the order they are found */

  const STEPS=[
    {from:0,at:.12,k:'The rule',t:'Three gates, all required',
     txt:`A diagnosis of hEDS needs Criterion 1, Criterion 2 and Criterion 3 all to be met. hEDS is the only one of the 13 types of the 2017 classification without a known gene, so no genetic test can confirm it; for every other type a definite diagnosis "relies on molecular confirmation". The 2017 consortium revised the hEDS criteria "to allow for a better distinction from other joint hypermobility disorders". [[Fairweather2025,Malfait2017,Yew2021]]`,
     pt:`There is no blood or gene test for hypermobile EDS yet. Doctors use a three-part checklist, and every part has to be met.`,
     hook:`hEDS = Criterion 1 (GJH) + Criterion 2 (2 of Features A, B, C) + Criterion 3 (exclusions). [[Fairweather2025,Thwaites2022]]`},
    {from:.14,at:.31,k:'Gate 1 · Criterion 1',t:'Generalised joint hypermobility',
     txt:`The Beighton score is compared with an age cut-off: 6 or more for prepubertal children and adolescents, 5 or more from puberty to age 50, 4 or more over 50. Our illustrative adult, aged 26, scores 6, so the gate opens. A score one point below the cut-off also counts if the five-part questionnaire has 2 or more "yes" answers. See <a href="#beighton" data-go="beighton">Beighton score</a>. [[Tofts2023,Fairweather2025,Thwaites2022]]`,
     pt:`The first check is whether joints in many parts of the body bend further than usual, judged against what is expected for the person's age.`,
     hook:`One point short + 5PQ ≥ 2 still passes Criterion 1. [[Thwaites2022]]`},
    {from:.32,at:.5,k:'Gate 2 · Feature A',t:'Feature A: 5 of 12 systemic signs',
     txt:`Feature A looks for signs of a more generalised connective tissue disorder: skin, hernias, scars, prolapse, palate, long fingers, body proportions, heart valve and aortic root. At least 5 of the 12 are needed, and several carry conditions: striae count only at set sites and without significant weight change, and prolapse only in children, men or women who have never given birth. Here 5 cells fill, so Feature A is met. [[Fairweather2025,Thwaites2022]]`,
     pt:`Doctors check the skin, the mouth, the hands, body proportions and a heart scan for small signs that the body's connective tissue is different. Five of twelve are needed.`,
     hook:`Feature A threshold: ≥ 5 of 12 items. Heel piezogenic papules were added in 2017. [[Fairweather2025,AubryRozier2021]]`},
    {from:.52,at:.66,k:'Gate 2 · Features B and C',t:'Two of A, B and C',
     txt:`Feature B is a first-degree relative who independently meets the current hEDS criteria. Feature C is musculoskeletal complications: daily pain in two or more limbs for at least 3 months, chronic widespread pain for 3 months or more, or recurrent atraumatic dislocations or instability. Criterion 2 needs any two of A, B and C; this person has all three, so the gate opens. [[Fairweather2025,Thwaites2022]]`,
     pt:`The second gate asks about body signs, close family and long-lasting pain or unstable joints. Two of these three are enough.`,
     hook:`Criterion 2 = 2 of 3 Features. Feature C needs only 1 of its 3 items. [[Thwaites2022]]`},
    {from:.68,at:.86,k:'Gate 3 · Criterion 3',t:'Excluding other causes',
     txt:`Three exclusions must all hold: no unusual skin fragility (which should prompt consideration of other EDS types); other heritable and acquired connective tissue disorders excluded, including autoimmune rheumatological conditions; and alternative diagnoses that cause hypermobility through hypotonia or tissue laxity excluded, such as myopathic EDS, Bethlem myopathy, Marfan or Loeys-Dietz syndrome and osteogenesis imperfecta. Exclusion can rest on history, examination and molecular testing "as indicated". [[Fairweather2025,Thwaites2022]]`,
     pt:`Last, the doctor makes sure nothing else explains the picture, including other types of EDS that a gene test can find.`,
     hook:`With an acquired autoimmune disease (e.g. lupus), hEDS needs Features A and B; Feature C cannot count. [[Fairweather2025]]`},
    {from:.88,at:.98,k:'The exits',t:'All three met, and the other doors',
     txt:`This illustrative person meets all three criteria. The side exits matter as much: people with symptomatic hypermobility who miss Criterion 1 or 2 are described as having a hypermobility spectrum disorder, and unusual skin fragility at gate 3 points to genetic testing for other types. In a Swiss centre, 61 of 97 adults with symptomatic hypermobility met hEDS criteria and 36 were classed as HSD; at a US clinic only 18.3% of 2,695 adults met them. [[Castori2017,Fairweather2025,AubryRozier2021]]`,
     pt:`Meeting the checklist gives the name hEDS. Missing it does not mean nothing is wrong: the name may be HSD, or a gene test may be the next step.`,
     hook:`Fail Criterion 2 with symptomatic GJH → generalised HSD. Skin fragility → think of other EDS types and test. [[Carroll2023,Fairweather2025]]`}];

  const kf=[[0,0],[.1,1],[.28,1],[.36,2],[.62,2],[.68,3],[.82,3],[.94,4]];
  function tokP(t,G){const pts=[G.s,G.g[0]-30,G.g[1]-30,G.g[2]-30,G.e];
    for(let i=1;i<kf.length;i++)if(t<=kf[i][0]){const a=kf[i-1],b=kf[i],u=ease(ramp(t,a[0],b[0]));return lerp(pts[a[1]],pts[b[1]],u)}return G.e}
  const tick=(x,y,on,r=8)=>`<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" style="fill:${on?'var(--dx)':'var(--panel)'};stroke:${on?'var(--dx)':'var(--line)'};stroke-width:1.4"/>`+(on?`<path d="M${f1(x-r*.45)} ${f1(y)}l${f1(r*.32)} ${f1(r*.35)}l${f1(r*.6)} ${f1(-r*.68)}" style="fill:none;stroke:#fff;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round"/>`:'');
  function gate(N,pos,o,cross){/* two posts and a door swinging open by o (0..1) */
    let g='';const a=o*78*Math.PI/180;
    if(!N){const x=pos,y0=cross-24,y1=cross+24;
      g+=`<rect x="${x-3}" y="${y0-6}" width="6" height="6" rx="1" style="fill:var(--muted)"/><rect x="${x-3}" y="${y1}" width="6" height="6" rx="1" style="fill:var(--muted)"/>`;
      g+=`<line x1="${x}" y1="${y0}" x2="${f1(x+Math.sin(a)*48)}" y2="${f1(y0+Math.cos(a)*48)}" style="stroke:${o>=1?'var(--good)':'var(--dx)'};stroke-width:5;stroke-linecap:round"/>`}
    else{const y=pos,x0=cross-22,x1=cross+22;
      g+=`<rect x="${x0-6}" y="${y-3}" width="6" height="6" rx="1" style="fill:var(--muted)"/><rect x="${x1}" y="${y-3}" width="6" height="6" rx="1" style="fill:var(--muted)"/>`;
      g+=`<line x1="${x0}" y1="${y}" x2="${f1(x0+Math.cos(a)*44)}" y2="${f1(y+Math.sin(a)*44)}" style="stroke:${o>=1?'var(--good)':'var(--dx)'};stroke-width:5;stroke-linecap:round"/>`}
    return g}
  function draw(t){
    const N=vb(svg,'720 380','400 560');
    const G=N?{s:24,g:[134,360,494],e:546,cross:26,box:[[54,8,338,112],[54,146,338,200],[54,382,338,98]]}
             :{s:30,g:[111,360,611],e:700,cross:318,box:[[16,22,190,244],[222,22,276,244],[514,22,194,244]]};
    const o=[ramp(t,.26,.29),ramp(t,.61,.64),ramp(t,.79,.82)];
    const bs=Math.round(6*ease(ramp(t,.15,.26))),aN=Math.floor(clamp((t-.33)/.03,0,5)),bOn=t>=.55,cOn=t>=.59,exN=t>=.79?3:t>=.75?2:t>=.71?1:0;
    let s='';
    /* track */
    s+=N?`<line x1="${G.cross}" x2="${G.cross}" y1="10" y2="${G.e}" style="stroke:var(--line);stroke-width:10;stroke-linecap:round"/>`
        :`<line x1="20" x2="${G.e}" y1="${G.cross}" y2="${G.cross}" style="stroke:var(--line);stroke-width:10;stroke-linecap:round"/>`;
    /* boxes */
    const act=t<.32?0:t<.67?1:t<.87?2:3;
    G.box.forEach((b,i)=>s+=`<rect x="${b[0]}" y="${b[1]}" width="${b[2]}" height="${b[3]}" rx="12" style="fill:var(--field);stroke:${act===i?'var(--dx)':'var(--line)'};stroke-width:${act===i?1.6:1}"/>`);
    /* box 1: Beighton bar */
    {const [bx,by,bw]=G.box[0],x0=bx+14,x1=bx+bw-14,X=v=>lerp(x0,x1,v/9),yb=by+(N?62:86);
      s+=`<text x="${bx+14}" y="${by+22}" class="t-sm" style="fill:var(--dx)">GATE 1 · CRITERION 1</text><text x="${bx+14}" y="${by+(N?40:44)}" class="t-lbl">Generalised hypermobility</text>`;
      s+=`<rect x="${x0}" y="${yb-8}" width="${f1(x1-x0)}" height="16" rx="8" style="fill:var(--panel-2)"/>`;
      if(bs>0)s+=`<rect x="${x0}" y="${yb-8}" width="${f1(X(bs)-x0)}" height="16" rx="8" style="fill:var(--dx)"/>`;
      s+=`<line x1="${f1(X(5))}" x2="${f1(X(5))}" y1="${yb-14}" y2="${yb+14}" style="stroke:var(--good);stroke-width:2;stroke-dasharray:3 2"/>`;
      for(let k=0;k<=9;k+=3)if(!N||k!==6)s+=`<text x="${f1(X(k))}" y="${yb+(N?26:28)}" class="t-xs t-mid">${k}</text>`;
      s+=`<text x="${f1(X(5))}" y="${N?yb+26:yb-18}" class="t-xs t-mid" style="fill:var(--good)">≥5</text>`;
      if(!N){s+=`<text x="${bx+14}" y="${yb+56}" class="t-lbl">Beighton ${bs} of 9</text><text x="${bx+14}" y="${yb+74}" class="t-xs">age 26 → cut-off ≥5</text><text x="${bx+14}" y="${yb+90}" class="t-xs">or 1 short + 5PQ ≥2</text>`;
        s+=tick(bx+bw-26,yb+52,o[0]>=1,10)}
      else{s+=`<text x="${bx+bw-14}" y="${by+40}" class="t-sm t-end">${bs}/9 · age 26</text>`+tick(bx+bw-22,by+20,o[0]>=1,9)}}
    /* box 2: 12-cell grid and A, B, C */
    {const [bx,by,bw,bh]=G.box[1],cols=N?4:3,cw=(bw-28)/cols,ch=N?28:26,gx=bx+14,gy=by+(N?48:54);
      s+=`<text x="${bx+14}" y="${by+22}" class="t-sm" style="fill:var(--dx)">GATE 2 · CRITERION 2</text><text x="${bx+14}" y="${by+40}" class="t-lbl">Feature A: ${Math.min(aN,5)} of 5 needed</text>`;
      A.forEach((a,k)=>{const r=Math.floor(k/cols),c=k%cols,x=gx+c*cw,y=gy+r*(ch+4),ord=AFILL.indexOf(k),on=ord>=0&&ord<aN;
        s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(cw-4)}" height="${ch}" rx="5" style="fill:${on?'var(--dx-soft)':'var(--panel)'};stroke:${on?'var(--dx)':'var(--line)'};stroke-width:${on?1.4:1}"/>`;
        s+=`<text x="${f1(x+(cw-4)/2)}" y="${f1(y+ch/2+3.5)}" class="t-xs t-mid" style="font-size:8.6px;${on?'fill:var(--ink);font-weight:600':''}">${a[0]}</text>`});
      const py=gy+(12/cols)*(ch+4)+(N?18:16),pw=(bw-28)/3;
      [['A',aN>=5],['B',bOn],['C',cOn]].forEach(([l,on],k)=>{const x=gx+k*pw;
        s+=`<rect x="${f1(x)}" y="${f1(py-14)}" width="${f1(pw-6)}" height="26" rx="13" style="fill:${on?'var(--dx)':'var(--panel)'};stroke:var(--dx);stroke-width:1.2"/>`;
        s+=`<text x="${f1(x+(pw-6)/2)}" y="${f1(py+4)}" class="t-lbl t-mid" style="fill:${on?'#fff':'var(--dx)'}">${l}${on?' ✓':''}</text>`});
      const sub=[['A','5+ of 12'],['B','relative'],['C','pain, instability']];
      if(!N)sub.forEach((q,k)=>s+=`<text x="${f1(gx+k*pw+(pw-6)/2)}" y="${f1(py+28)}" class="t-xs t-mid">${q[1]}</text>`);}
    /* box 3: exclusions */
    {const [bx,by,bw]=G.box[2];
      s+=`<text x="${bx+14}" y="${by+22}" class="t-sm" style="fill:var(--dx)">GATE 3 · CRITERION 3</text>`;
      if(!N)s+=`<text x="${bx+14}" y="${by+44}" class="t-lbl">Exclusions, all 3</text>`;
      EX.forEach((e,k)=>{const y=N?by+44+k*20:by+80+k*44;s+=tick(bx+24,y-4,k<exN,8)+`<text x="${bx+40}" y="${y}" class="t-lbl" style="font-size:${N?12:12.5}px;${k<exN?'':'fill:var(--muted)'}">${N?e[1].replace('Other heritable and acquired connective tissue disorders excluded','Other connective tissue disorders excluded'):e[0]}</text>`;
        if(!N)s+=`<text x="${bx+40}" y="${y+15}" class="t-xs">${['else think other types','incl. autoimmune','e.g. Marfan, myopathy'][k]}</text>`});}
    /* gates and exits */
    const ex=[['not hEDS','if not met'],['HSD?','if not met'],['gene tests','skin fragile']];
    G.g.forEach((p,i)=>{s+=gate(N,p,o[i],G.cross);
      const hi=t>=.88;
      if(!N){const x=p-30;s+=`<path d="M${x} ${G.cross+10}V${G.cross+34}" style="stroke:${hi?'var(--warn)':'var(--line)'};stroke-width:1.6;stroke-dasharray:3 3"/>`;
        s+=`<text x="${x}" y="${G.cross+50}" class="t-xs t-mid" style="${hi?'fill:var(--warn)':''}">${ex[i][1]} → ${ex[i][0]}</text>`}
      else s+=`<text x="${G.cross+30}" y="${p+4}" class="t-xs" style="${hi?'fill:var(--warn)':''}">${'gate '+(i+1)+' · '+ex[i][1]+' → '+ex[i][0]}</text>`});
    /* the end */
    if(t>=.9){const fin=ramp(t,.9,.96);
      s+=N?`<text x="${G.cross+24}" y="${G.e+6}" class="t-lbl" style="fill:var(--good);opacity:${f1(fin)}">All 3 met: hEDS criteria as published</text>`
          :`<text x="${G.e+6}" y="${G.cross-20}" class="t-lbl t-end" style="fill:var(--good);opacity:${f1(fin)}">all 3 met</text>`}
    /* token: the zebra */
    const p=tokP(t,G);s+=N?zebra(G.cross,p,13,{id:'crTok'}):zebra(p,G.cross,15,{id:'crTok'});
    svg.innerHTML=s;
    const ph=phaseOf(STEPS,t);setSt(ph);
    $('#crRead').innerHTML=`<span>Gate 1 <b>${o[0]>=1?'open':'closed'}</b></span><span>Feature A <b>${Math.min(aN,5)}/12</b></span><span>A·B·C <b>${(aN>=5)+bOn+cOn} of 3</b></span><span>Gate 2 <b>${o[1]>=1?'open':'closed'}</b></span><span>Exclusions <b>${exN}/3</b></span><span>Gate 3 <b>${o[2]>=1?'open':'closed'}</b></span>`;
    $('#crNote').innerHTML=noteHTML(STEPS[ph]);
  }
  const stop=playWire(rg,$('#crPlay'),draw,22000,'%t:player.replay%','criteria');
  const setSt=stepWire($('#crSteps'),STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ================= the teaching checklist ================= */
  const ck=(attr,i,item)=>`<label class="cr-ck"><input type="checkbox" ${attr}="${i}"><span>${item[1]}${item[2]?`<small>${item[2]}</small>`:''}</span></label>`;
  $('#crA').innerHTML=A.map((a,i)=>ck('data-cra',i,a)).join('');
  $('#crC').innerHTML=CC.map((a,i)=>ck('data-crc',i,a)).join('');
  $('#cr3').innerHTML=EX.map((a,i)=>ck('data-cr3',i,a)).join('');
  const CASES={
    heds:{v:`<b>Ana, 26 · fictional</b>Beighton 6 of 9. Soft, velvety skin; forearm skin stretches 2 cm; stretch marks on the lower back with no weight change; heel papules on both feet; crowded teeth with a high, narrow palate. Her mother has been assessed and independently meets the criteria. Daily pain in both arms and both legs for two years. No unusual skin fragility, and other conditions have been excluded.`,
      c1:'met',a:[0,1,2,3,7],b:1,c:[0],ex:[1,1,1],ai:0},
    hsd:{v:`<b>Sam, 31 · fictional</b>Beighton 7 of 9. Stretch marks on the thighs with no weight change, and heel papules on both feet; no other Feature A signs. No first-degree relative has been assessed. Four dislocations of the same shoulder without injury. No unusual skin fragility, and other conditions have been excluded.`,
      c1:'met',a:[2,3],b:0,c:[2],ex:[1,1,1],ai:0},
    gen:{v:`<b>Leo, 22 · fictional</b>Beighton 5 of 9. Very stretchy, soft skin that splits after minor bumps, leaving wide, paper-thin scars on the shins and forehead (so they do not count as the hEDS scar item); he bruises easily. Daily knee and wrist pain for a year. No relatives assessed.`,
      c1:'met',a:[0,1],b:0,c:[0],ex:[0,1,1],ai:0},
    free:{v:`<b>Free mode</b>Tick the findings yourself. Remember that each item has a published definition, and that in real life a clinician examines, measures and excludes.`,
      c1:'met',a:[],b:0,c:[],ex:[0,0,0],ai:0}};
  let cs='heds';
  function load(k){cs=k;const c=CASES[k];$('#crVig').innerHTML=c.v;$('#crC1').value=c.c1;
    $$('[data-cra]').forEach(x=>x.checked=c.a.includes(+x.dataset.cra));
    $$('[data-crc]').forEach(x=>x.checked=c.c.includes(+x.dataset.crc));
    $$('[data-cr3]').forEach(x=>x.checked=!!c.ex[+x.dataset.cr3]);
    $('#crB').checked=!!c.b;$('#crAI').checked=!!c.ai;
    $$('[data-crcase]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.crcase===k));evalCk()}
  const csv=$('#crCalcSvg');
  function evalCk(){
    const c1=$('#crC1').value,g1=c1!=='no',an=$$('[data-cra]').filter(x=>x.checked).length,Aok=an>=5,Bok=$('#crB').checked,
      cn=$$('[data-crc]').filter(x=>x.checked).length,ai=$('#crAI').checked,Cok=cn>=1&&!ai,ex=$$('[data-cr3]').map(x=>x.checked),
      nF=Aok+Bok+Cok,g2=ai?(Aok&&Bok):nF>=2,g3=ex.every(Boolean);
    $('#crACount').innerHTML=`Feature A: <b>${an} of 12</b> ticked · ${Aok?'met (5 or more)':'not met (5 needed)'}`;
    /* gate summary */
    const N=vb(csv,'720 110','400 130');let s='';const W=N?400:720,cw=W/3;
    [['1 · GJH',g1,c1==='pq'?'met via 5PQ rule':g1?'met':'not met'],['2 · A, B, C',g2,`${ai?'A+B needed':nF+' of 3 features'}`],['3 · Exclusions',g3,`${ex.filter(Boolean).length} of 3`]].forEach(([l,ok,sub],i)=>{
      const cx=cw*i+cw/2,cy=N?40:42;
      if(i)s+=`<path d="M${f1(cw*i-cw*.18)} ${cy}H${f1(cw*i+cw*.18)}" class="arrow" marker-end="url(#crAr)"/>`;
      s+=`<circle cx="${f1(cx)}" cy="${cy}" r="${N?18:20}" style="fill:${ok?'var(--good-soft)':'var(--bad-soft)'};stroke:${ok?'var(--good)':'var(--bad)'};stroke-width:2"/>`;
      s+=ok?`<path d="M${f1(cx-8)} ${cy}l5.5 6l10-11" style="fill:none;stroke:var(--good);stroke-width:3;stroke-linecap:round;stroke-linejoin:round"/>`:`<path d="M${f1(cx-6)} ${cy-6}l12 12M${f1(cx+6)} ${cy-6}l-12 12" style="stroke:var(--bad);stroke-width:3;stroke-linecap:round"/>`;
      s+=`<text x="${f1(cx)}" y="${cy+(N?36:40)}" class="t-lbl t-mid" style="font-size:${N?12:13}px">${l}</text><text x="${f1(cx)}" y="${cy+(N?52:58)}" class="t-xs t-mid">${sub}</text>`});
    csv.innerHTML=`<defs>${marker('crAr')}</defs>`+s;
    let cls,v,more='';
    if(!ex[0]){cls='maybe';v=`Criterion 3 is not met: unusual skin fragility. Under the 2017 criteria this should prompt consideration of other EDS types, which are confirmed by genetic testing.`;
      more=`<p>In classical EDS, skin hyperextensibility with atrophic scarring is the first major criterion, and fragile skin and easy bruising were among the commonest minor features in 75 genetically confirmed patients. See <a href="#differential" data-go="differential">Look-alikes &amp; red flags</a>. [[Fairweather2025,Malfait2017,Ritelli2020C]]</p>`}
    else if(!g1){cls='no';v=`Criterion 1 is not met, so the hEDS criteria are not met as published.`;
      more=`<p>If hypermobility is limited to some joints, to the hands and feet, or is reported only from the past, and causes symptoms, the 2017 framework describes localised, peripheral or historical HSD. [[Carroll2023,Castori2017]]</p>`}
    else if(!g2){cls='no';v=`Criterion 2 is not met (${ai?'with an autoimmune disease both A and B are needed':nF+' of the 3 features'}), so the hEDS criteria are not met as published.`;
      more=`<p>In the 2017 framework, symptomatic generalised hypermobility that does not meet the criteria for hEDS or another syndrome is described as generalised hypermobility spectrum disorder (G-HSD). Its main differential diagnosis is hEDS. [[Castori2017,Carroll2023]]</p>`}
    else if(!g3){cls='maybe';v=`Criteria 1 and 2 are met, but other causes have not all been excluded, so Criterion 3 is not yet met.`;
      more=`<p>Exclusion can rest on history, examination and molecular genetic testing "as indicated". [[Fairweather2025]]</p>`}
    else{cls='yes';v=`These findings meet all three of the 2017 criteria for hEDS as published.`;
      more=`<p>On a real person this would also need a clinician to confirm each finding by examination and, where needed, tests. ${ai?'Here Feature C was not counted because an autoimmune disease is present; Features A and B carried Criterion 2. ':''}[[Fairweather2025,Thwaites2022]]</p>`}
    $('#crCalcNote').innerHTML=`<div class="kicker">${cs==='free'?'Free mode':'Worked example'} · teaching checklist</div><div class="cr-gates">
      <div>${g1?'✓':'✕'} <span><b>Criterion 1</b> ${g1?(c1==='pq'?'met by the one-point-short + 5PQ rule':'met'):'not met'}</span></div>
      <div>${g2?'✓':'✕'} <span><b>Criterion 2</b> A ${Aok?'✓':'✕'} · B ${Bok?'✓':'✕'} · C ${ai?'not counted':Cok?'✓':'✕'}</span></div>
      <div>${g3?'✓':'✕'} <span><b>Criterion 3</b> ${ex.filter(Boolean).length} of 3 exclusions</span></div></div>
      <div class="verdict ${cls}">${v}</div>${more}
      <div class="pt"><b>%t:note.plain%</b>This checklist is for learning how the rules fit together. It cannot tell anyone whether they have hEDS or HSD.</div>`}
  $('#crCases').addEventListener('click',e=>{const b=e.target.closest('[data-crcase]');if(b){stop();load(b.dataset.crcase)}});
  $('#m-criteria .cr-list').addEventListener('change',evalCk);
  $('#crMiss').addEventListener('click',e=>{const on=e.currentTarget.getAttribute('aria-pressed')!=='true';e.currentTarget.setAttribute('aria-pressed',on);
    $('#m-criteria').classList.toggle('cr-show',on);$('#crMissList').hidden=!on});
  load('heds');
  const prevR=redraws.criteria;redraws.criteria=()=>{prevR&&prevR();evalCk()};
};
