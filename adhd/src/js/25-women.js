/* =============== 2.5 Girls, women & late diagnosis =============== */
/* WM: two illustrative lives on one age axis (5 to 45): a boy with a hyperactive presentation and a girl
   with an inattentive one. Event markers sit at published ages (Danish incidence peaks, Swedish mean age
   at first ADHD record); everything else is an illustration. Then a sex-ratio comparator by setting. */
const WM_STEPS=[
 {from:0,at:.08,k:'Age 5–10 · childhood',t:'Who gets noticed',
  txt:`Girls and women with ADHD show mainly inattention and internalising problems; boys and men show more hyperactive-impulsive symptoms and externalising problems. [[Hinshaw2022]] In a clinic sample of 140 girls and 140 boys with ADHD, girls more often had the inattentive presentation and less often conduct or oppositional problems, which may bias referral against them. [[Biederman2002Gender]] In Danish registers, new ADHD diagnoses peaked at age 8 in boys. [[Dalsgaard2020JAMAPsych]]`,
  pt:`Girls with ADHD are often quiet daydreamers rather than disruptive, so their ADHD can be missed. Good grades do not rule ADHD out. [[Hinshaw2022,Quinn2014]]`,
  hook:`Girls: mainly inattentive and internalising; boys: more hyperactive-impulsive and externalising. [[Hinshaw2022]]`},
 {from:.15,at:.2,k:'Age 11–14 · transitions',t:'Coping, until demands rise',
  txt:`Some girls and women camouflage their difficulties with compliance, socially adaptive behaviour, perfectionism or over-preparation, which can lead others to underestimate their problems. Symptoms may become obvious at transitions, such as the move to secondary school or university, when demands rise and support falls. In teacher vignette studies, changing only a child's name and pronouns from female to male made referral for support more likely. [[Young2020Females]]`,
  pt:`Some girls work very hard to hide their struggles. It often shows when school gets harder and there is less help. [[Young2020Females]]`,
  hook:`Compensation (compliance, perfectionism, over-preparation) can mask ADHD; transitions can "unmask" it. [[Young2020Females]]`},
 {from:.25,at:.31,k:'Age 15–19 · another label first',t:'Anxiety or depression first',
  txt:`Girls with ADHD are more likely than boys to have a co-occurring internalising condition such as anxiety or depression. [[Wolraich2019]] Females with ADHD are more likely to first receive a diagnosis of an internalising or personality disorder, which can delay recognition of ADHD. [[Young2020Females]] In a clinical sample, self-reported anxiety best distinguished girls with ADHD from control girls. [[Skogli2013]] In Danish registers, diagnoses peaked at age 17 in girls, against 8 in boys. [[Dalsgaard2020JAMAPsych]]`,
  pt:`A girl may be treated for anxiety or low mood for years before anyone asks about attention. Both can be true at the same time. [[Young2020Females,Wolraich2019]]`,
  hook:`Danish incidence peak: age 8 in boys, age 17 in girls. [[Dalsgaard2020JAMAPsych]]`},
 {from:.37,at:.47,k:'Age 20–28 · diagnosed at last',t:'About 4 years later',
  txt:`In Swedish registers (85,330 people with ADHD), females were first recorded with ADHD at a mean age of 23.5 years versus 19.6 for males, about 4 years later. Before the ADHD record, females had more psychiatric comorbidity, medication use and healthcare use than males with ADHD and than female controls. [[Skoglund2024]] Women may refer themselves in adulthood once they become aware of their difficulties. [[Young2020Females]]`,
  pt:`On average, women are diagnosed about 4 years later than men. Many have already had help for other problems first. [[Skoglund2024]]`,
  hook:`Sweden: mean age at first ADHD record 23.5 years in females, 19.6 in males. [[Skoglund2024]]`},
 {from:.6,at:.85,k:'Age 30–45 · adulthood',t:'Adulthood: nearer to equal',
  txt:`The male-to-female ratio becomes much closer to equal by adulthood. [[Hinshaw2022]] In Dunedin, adult ADHD was gender-balanced, [[Moffitt2015]] and of US adults with current ADHD in 2023, 44.2% were women. [[Staley2024]] In Finland, new diagnoses rose 3.0-fold in women aged 21–30 between 2020 and 2022. [[Auro2024]] Women diagnosed in adulthood describe effects on wellbeing and relationships, a feeling of lack of control, and self-acceptance after diagnosis. [[Attoe2023]]`,
  pt:`Many women find that a diagnosis helps them understand themselves and be kinder to themselves. [[Attoe2023]]`,
  hook:`Clinic ratio up to 16:1 in children; in adults the ratio is much closer to equal. [[Young2020Females,Hinshaw2022]]`}
];
/* published markers (age, label lines, kind: 'dx' diagnosis, 'ev' event); ages without a source are illustrations */
const WM_EV={boy:[[6,['out of seat,','blurts out'],'ev'],[8,['diagnosis peak,','boys (Denmark)'],'dx'],[19.6,['mean first ADHD','record, males (Sweden)'],'rec']],
 girl:[[7,['quiet, dreamy,','work gets done'],'ev'],[12,['secondary school:','demands rise'],'ev'],[15,['treated for anxiety','or low mood'],'ev'],[17,['diagnosis peak,','girls (Denmark)'],'dx'],[23.5,['mean first ADHD','record, females (Sweden)'],'rec'],[33,['understanding,','self-acceptance'],'ev']]};
const WM_BUB={out:[['Quiet, dreamy,\ngood grades','Can\'t sit still'],['Disorganised,\n"not trying"','Blurts out\nanswers'],['Anxious,\nlow mood',''],['ADHD, at last',''],['Capable, but\nexhausted','']],
 in:[['I can\'t follow\nthe lesson','Can\'t sit still'],['I work twice as\nhard to keep up','Blurts out\nanswers'],['Why can\'t I cope\nlike everyone else?',''],['It finally\nmakes sense',''],['I\'m learning\nhow I work','']]};
inits.women=()=>{
  const svg=$('#wmSvg'),rg=$('#wmT'),note=$('#wmNote');let view='out';
  const T=(x,y,c,s,st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${s}</text>`;
  function draw(t){const N=vb(svg,'720 420','400 600'),age=lerp(5,45,t),p=phaseOf(WM_STEPS,t);
    const L=N?{x0:44,x1:384,ax:566,lane:{boy:236,girl:470},lab:12,bw:132}:{x0:96,x1:700,ax:392,lane:{boy:166,girl:304},lab:14,bw:150};
    const X=a=>lerp(L.x0,L.x1,(a-5)/40);let s=`<defs>${marker('wmArr','var(--muted)',6)}</defs>`;
    s+=`<text x="${N?14:16}" y="26" class="t-big">${WM_STEPS[p].t}</text><text x="${N?14:16}" y="42" class="t-sm">${view==='out'?'what others see':'what she experiences'} · two illustrative lives</text>`;
    /* age axis */
    s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${L.ax}" y2="${L.ax}" class="axis"/>`;
    for(let a=5;a<=45;a+=5)s+=`<line x1="${f1(X(a))}" x2="${f1(X(a))}" y1="${L.ax}" y2="${L.ax+4}" class="axis"/>`+T(X(a),L.ax+15,'t-xs t-mid',a);
    s+=T(L.x0-8,L.ax+15,'t-xs t-end','age');
    s+=`<line x1="${f1(X(age))}" x2="${f1(X(age))}" y1="60" y2="${L.ax}" style="stroke:var(--muted);stroke-dasharray:3 4;opacity:.6"/>`;
    /* lanes */
    [['boy','He','hyperactive presentation','var(--dx)'],['girl','She','inattentive presentation','var(--dz)']].forEach(([who,nm,pres,c])=>{const y=L.lane[who];
      s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${y}" y2="${y}" style="stroke:${c};stroke-width:2;opacity:.35"/><line x1="${L.x0}" x2="${f1(X(age))}" y1="${y}" y2="${y}" style="stroke:${c};stroke-width:4;stroke-linecap:round"/>`;
      if(N)s+=T(L.lab,y+20,'t-xs',`${nm} · ${pres}`,`fill:${c};font-weight:700`);
      else s+=T(L.lab,y-14,'t-lbl',nm,`fill:${c}`)+T(L.lab,y-1,'t-xs',pres.split(' ')[0])+T(L.lab,y+11,'t-xs','presentation');
      /* markers: label only the latest one passed, plus every diagnosis marker */
      const ev=WM_EV[who];let last=-1;ev.forEach((e,k)=>{if(age>=e[0])last=k});
      ev.forEach(([a,lab,kind],k)=>{const x=X(a),on=age>=a,big=kind!=='ev';
        s+=big?`<rect x="${f1(x-6)}" y="${f1(y-6)}" width="12" height="12" transform="rotate(45 ${f1(x)} ${f1(y)})" style="fill:${on?c:'var(--panel)'};stroke:${c};stroke-width:2"/>`:`<circle cx="${f1(x)}" cy="${y}" r="5" style="fill:${on?c:'var(--panel)'};stroke:${c};stroke-width:1.8"/>`;
        if(on&&(k===last||big)){const lx=clamp(x,L.x0+40,L.x1-50),ly=y+(N?36:26)+(k===last&&!big?0:0);const row=kind==='rec'&&(who==='girl'||N)?(N?26:24):0;
          lab.forEach((l,j)=>{s+=T(lx,ly+row+j*11,'t-xs t-mid',l,`fill:${k===last?'var(--ink)':'var(--muted)'};${big?'font-weight:700':''}`)})}})});
    /* the gap brackets: Danish peaks 8 vs 17, Swedish records 19.6 vs 23.5 */
    const br=(a1,a2,txt,o,side)=>{if(o<=0)return '';const y=(L.lane.boy+L.lane.girl)/2+(N?0:2);return `<g style="opacity:${f1(o)}"><path d="M${f1(X(a1))} ${f1(L.lane.boy+(N?56:46))}L${f1(X(a1))} ${f1(y)}L${f1(X(a2))} ${f1(y)}L${f1(X(a2))} ${f1(L.lane.girl-8)}" style="fill:none;stroke:var(--muted);stroke-width:1.4;stroke-dasharray:4 3" marker-end="url(#wmArr)"/>`+(side?T(X(a2)+8,y+16,'t-xs',txt,'fill:var(--ink);font-weight:700'):T((X(a1)+X(a2))/2,y-6,'t-xs t-mid',txt,'fill:var(--ink);font-weight:700'))+'</g>'};
    s+=br(8,17,'9 years',ramp(age,17,18.5)*(1-ramp(age,22,23)))+br(19.6,23.5,'≈ 4 years later',ramp(age,23.5,25),1);
    /* the two people at the cursor */
    const sz=a=>lerp(N?36:40,N?62:70,clamp((a-5)/16));
    const bx=X(age),bs=sz(age),boyOn=age<26,girlS=sz(age);
    if(boyOn)s+=`<g style="opacity:${f1(1-ramp(age,22,26))}">`+person(bx,L.lane.boy-bs-2,bs,'var(--dx)')+'</g>';
    else s+=person(bx,L.lane.boy-bs-2,bs,'var(--dx)',{op:.35});
    const fidg=age<14?Math.sin(t*90)*3:0;
    s+=person(bx,L.lane.girl-girlS-2,girlS,'var(--dz)');
    if(age<14)s+=`<path d="M${f1(bx-bs*.5+fidg)} ${f1(L.lane.boy-bs*.75)}l-6 -4M${f1(bx+bs*.5-fidg)} ${f1(L.lane.boy-bs*.75)}l6 -4" style="stroke:var(--dx);stroke-width:2;stroke-linecap:round"/>`;
    /* bubbles */
    const B=WM_BUB[view][p],bw=L.bw,bh=34;
    const place=(tx,ty)=>{let x=tx+14;if(x+bw>L.x1+10)x=tx-14-bw;return clamp(x,6,(N?400:720)-bw-6)};
    if(B[0]){const ty=L.lane.girl-girlS-(N?50:44),x=place(bx,ty);s+=bubble(x,ty,bw,bh,B[0],{think:view==='in',tx:clamp(bx,x+12,x+bw-12),ty:L.lane.girl-girlS+2,c:view==='in'?'var(--dz)':'var(--line)',cls:'t-xs'})}
    if(B[1]&&age<16){const ty=L.lane.boy-bs-(N?50:44),x=place(bx,ty);s+=bubble(x,ty,bw*.8,bh,B[1],{tx:clamp(bx,x+12,x+bw*.8-12),ty:L.lane.boy-bs+2,cls:'t-xs'})}
    svg.innerHTML=s;setSt(p);rg.setAttribute('aria-valuetext',`Age ${Math.round(age)}: ${WM_STEPS[p].t}`);note.innerHTML=noteHTML(WM_STEPS[p])}
  const stop=playWire(rg,$('#wmPlay'),draw,28000,'%t:player.replay%','women');
  const setSt=stepWire($('#wmSteps'),WM_STEPS,rg,draw,stop);
  $$('[data-wv]').forEach(b=>b.addEventListener('click',()=>{view=b.dataset.wv;$$('[data-wv]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---- sex ratio by setting: paired bars ---- */
  const R=[
   ['ref','Clinic-referred children',10,1,'≈ 10 : 1'],
   ['com','Community samples, children',3,1,'≈ 3 : 1'],
   ['com','Community, ages 7–29 (Missouri)',2.28,1,'2.28 : 1'],
   ['com','Parent and teacher ratings, youth',2,1,'≈ 2 : 1'],
   ['com','US children diagnosed, 2015–16',14.0,6.3,'14.0% vs 6.3%'],
   ['com','GBD 2021 model, under 20',2.52,0.99,'2.52% vs 0.99%'],
   ['adu','US adults with current ADHD, 2023',55.8,44.2,'55.8% vs 44.2%']];
  const NOTE={all:`Every setting finds more males, but the gap shrinks from clinics to the community and again into adulthood. Clinic referral ratios have been reported from 3:1 to 16:1, so many girls with ADHD are likely to remain unidentified. [[Young2020Females,Biederman2002Gender]]`,
   ref:`In children referred to a psychiatric clinic, boys outnumbered girls about 10 to 1. [[Biederman2002Gender]] Reported referral ratios range from 3:1 to 16:1. Hyperactive behaviour is more visible, and the AAP suggests this may be why boys are more than twice as likely to be diagnosed. [[Young2020Females,Wolraich2019]]`,
   com:`Community samples, where children are assessed whether or not anyone referred them, show about 2–3 boys per girl. [[Biederman2002Gender,Faraone2021,Ramtekkar2010]] The Missouri authors read their lower-than-clinic ratio as under-diagnosis of females. [[Ramtekkar2010]] Males still show more ADHD in community data, so both referral bias and a true childhood difference are likely. [[Ayano2023Children,Cortese2026GBD]]`,
   adu:`By adulthood the ratio is much closer to equal: of US adults with current ADHD in 2023, 55.8% were men and 44.2% women. [[Staley2024,Hinshaw2022]] In the WHO surveys, the remaining male excess in adults reflected the higher childhood rate in males, not a sex difference in persistence. [[Fayyad2017]]`};
  const cs=$('#wmCmp');let sel='all';
  function drawC(){const N=vb(cs,'720 330','400 520');let s='';
    const L=N?{lab:14,mid:200,half:170,y0:44,row:66,lh:0}:{lab:14,mid:470,half:220,y0:44,row:40,lh:0};
    s+=T(L.mid-8,24,'t-xs t-end','◀ males (share of cases)','fill:var(--dx);font-weight:700')+T(L.mid+8,24,'t-xs','females ▶','fill:var(--dz);font-weight:700');
    s+=`<line x1="${L.mid}" x2="${L.mid}" y1="30" y2="${L.y0+R.length*L.row-4}" style="stroke:var(--muted)"/>`;
    R.forEach(([g,lab,m,f,txt],k)=>{const on=sel==='all'||sel===g,ms=m/(m+f),fs=f/(m+f),y=L.y0+k*L.row+(N?22:0),o=on?1:.25;
      s+=`<g style="opacity:${o}">`;
      if(N)s+=T(L.lab,y-8,'t-xs',lab,'fill:var(--ink);font-weight:700');else s+=T(L.lab,y+13,'t-xs',lab,'fill:var(--ink);font-weight:700');
      s+=`<rect x="${f1(L.mid-ms*L.half)}" y="${y}" width="${f1(ms*L.half)}" height="18" rx="4" style="fill:var(--dx)"/><rect x="${L.mid}" y="${y}" width="${f1(fs*L.half)}" height="18" rx="4" style="fill:var(--dz)"/>`;
      s+=T(L.mid-ms*L.half-6,y+13,'t-xs t-end',Math.round(ms*100)+'%')+T(L.mid+fs*L.half+6,y+13,'t-xs',Math.round(fs*100)+'% · '+txt,'fill:var(--ink)')+'</g>'});
    cs.innerHTML=s;$('#wmCmpNote').innerHTML=`<div class="kicker">${{all:'All settings',ref:'Referred children',com:'Community samples',adu:'Adults'}[sel]}</div><p>${NOTE[sel]}</p>`}
  $$('[data-wr]').forEach(b=>b.addEventListener('click',()=>{sel=b.dataset.wr;$$('[data-wr]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawC()}));
  drawC();
  const prevR=redraws.women;redraws.women=()=>{prevR&&prevR();drawC()};
};
