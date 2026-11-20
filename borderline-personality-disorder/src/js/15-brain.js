/* =============== 1.5 Brain & stress systems =============== */
const BR_STEPS=[
 {from:0,at:.09,k:'Threat response',t:'The amygdala',
  txt:`<span class="ev est">Established, disputed</span> A meta-analysis of 19 fMRI studies (281 people with BPD, 293 controls) found more left-amygdala activation to negative stimuli, and blunted prefrontal responses. The amygdala overactivity appeared in unmedicated samples, not medicated ones. An earlier meta-analysis (11 studies) found less amygdala activation instead, so the direction is not settled. With eye-tracking, women with BPD looked faster and more often at the eyes of angry faces, with a larger amygdala response. People with BPD were less accurate at recognising neutral faces as neutral. [[Schulze2016,Ruocco2013,Bertsch2013Oxytocin,Daros2013]]`,
  pt:`The brain’s alarm centre tends to respond more strongly to angry or threatening faces in research groups of people with BPD. Neutral faces can look less neutral.`,
  hook:`Amygdala hyperactivity in BPD shows up in unmedicated samples, not medicated ones (Schulze 2016). [[Schulze2016]]`},
 {from:.17,at:.25,k:'Regulation',t:'Prefrontal and cingulate',
  txt:`<span class="ev hyp">Hypothesis</span> The dominant "fronto-limbic imbalance" model says limbic areas generate strong emotion while prefrontal control under-engages. Findings that fit: blunted dorsolateral prefrontal responses to negative stimuli; less ventromedial prefrontal activity when holding back a response during negative emotion (16 vs 14 people); less dorsal anterior cingulate engagement when trying to distance oneself (18 vs 16). A review of task fMRI challenges the simple version of this model, in which overactive amygdala and weak prefrontal control map straight onto symptoms. [[KrauseUtz2014,Schulze2016,Silbersweig2007,Koenigsberg2009,Sicorello2021]]`,
  pt:`The parts of the brain that help calm a strong feeling seem to work less hard in these studies. Think of a brake that grips less firmly, not a broken one.`,
  hook:`Fronto-limbic model: limbic (amygdala, insula) overactivity + prefrontal/ACC under-engagement. It is a model, and it is debated. [[Sicorello2021]]`},
 {from:.33,at:.42,k:'Insula & structure',t:'Insula and hippocampus',
  txt:`<span class="ev est">Established</span> The insula, which tracks body feelings, was more active to negative emotion in BPD. Structurally, a meta-analysis of 11 volumetric studies (205 people with BPD, 222 controls) found the hippocampus 11% smaller and the amygdala 13% smaller on average, differences not explained by medication or by co-occurring depression, PTSD or substance use. Voxel-based studies (395 vs 415) found less grey matter in medial prefrontal cortex, amygdala and right parahippocampal gyrus, a pattern unlike bipolar disorder. [[Ruocco2013,Ruocco2012,Yu2019BJP]]`,
  pt:`On average, two memory-and-emotion areas are a little smaller in people with BPD in these studies. These are group averages; many individuals overlap with controls.`,
  hook:`Meta-analytic volume reductions in BPD: hippocampus ≈ 11%, amygdala ≈ 13% (Ruocco 2012). [[Ruocco2012]]`},
 {from:.5,at:.6,k:'Stress hormones',t:'The HPA axis',
  txt:`<span class="ev early">Early evidence</span> The stress-hormone (HPA) axis runs from the hypothalamus to the pituitary to the adrenal glands, which release cortisol. Meta-analyses (37 studies; 803 people with BPD, 1,092 controls) found higher continuous cortisol output but a blunted cortisol response to psychosocial stress. A separate meta-analysis of single basal samples (12 studies) found lower cortisol (g = −0.32). The direction depends on how cortisol is measured. Resting vagal heart-rate variability, a marker of calming capacity, was also lower (g = −0.59; 5 studies). [[Drews2019,Thomas2019Cortisol,Koenig2016]]`,
  pt:`The body’s stress system may run “on” more of the time but respond less sharply to a new stress. The studies disagree on details.`,
  hook:`HPA in BPD: elevated continuous cortisol output, blunted response to psychosocial stress (Drews 2019). [[Drews2019]]`},
 {from:.67,at:.76,k:'Pain & bonding chemistry',t:'Pain, opioids and oxytocin',
  txt:`<span class="ev hyp">Hypothesis</span> Pain perception was reduced in unmedicated women with BPD even when calm, and more so under intense distress; electrical pain thresholds were higher and tracked dissociation. PET imaging (18 women with BPD, 14 controls) showed more mu-opioid receptor availability and more endogenous opioid release during sadness. Plasma oxytocin was lower in one study; a single intranasal dose normalised the fast glances to angry eyes and the amygdala response, but in another trial oxytocin reduced trust in anxiously attached, rejection-sensitive people. These are small experiments, not treatments. [[Bohus2000Pain,Ludascher2007,Prossin2010,Bertsch2013HormBehav,Bertsch2013Oxytocin,Bartz2011Oxytocin,Bandelow2010]]`,
  pt:`Brain chemicals linked to pain relief and closeness may work differently in BPD. This is an active research idea, not a proven cause, and no medicine is approved on this basis.`,
  hook:`Opioid and oxytocin models in BPD: Hypothesis, supported by small PET, CSF and single-dose studies. [[Stanley2010AJP,Herpertz2015]]`},
 {from:.83,at:.92,k:'Reading the evidence',t:'Not a "BPD brain"',
  txt:`<span class="ev est">Established</span> Early studies had tiny samples (6 per group in 2001, 15 in 2003). In about 50,000 people, brain–behaviour associations were smaller than thought, and studies at the median size of about 25 were underpowered with inflated effects. Many BPD findings also appear in PTSD, depression or bipolar disorder, so group-level imaging cannot diagnose an individual. Some differences shifted after therapy: switch to <b>After DBT</b>. [[Herpertz2001,Donegan2003,Marek2022,Button2013,Schulze2019,Goodman2014]]`,
  pt:`Brain scans show averages from research groups. They cannot tell whether one person has BPD, and the brain keeps changing, including with treatment.`,
  hook:`Neuroimaging is not used to diagnose BPD: small samples, small effects and findings shared with other disorders. [[Marek2022,Schulze2019]]`}];
const BR_LV={bpd:{amyg:1,pfc:.18,acc:.22,insula:.85,hippo:.3},cmp:{amyg:.32,pfc:.65,acc:.55,insula:.35,hippo:.3},post:{amyg:.55,pfc:.18,acc:.22,insula:.85,hippo:.3}};
function brFace(cx,cy,r,o={}){let s=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${r}" style="fill:var(--panel-2);stroke:var(--ink);stroke-width:1.4"/>`;
  const e=r*.36,ey=cy-r*.12;
  if(o.look)s+=`<circle cx="${f1(cx-e)}" cy="${f1(ey)}" r="${f1(r*.26)}" style="fill:none;stroke:var(--storm);stroke-width:1.6;opacity:${f1(o.look)}"/><circle cx="${f1(cx+e)}" cy="${f1(ey)}" r="${f1(r*.26)}" style="fill:none;stroke:var(--storm);stroke-width:1.6;opacity:${f1(o.look)}"/>`;
  s+=`<circle cx="${f1(cx-e)}" cy="${f1(ey)}" r="${f1(r*.08)}" style="fill:var(--ink)"/><circle cx="${f1(cx+e)}" cy="${f1(ey)}" r="${f1(r*.08)}" style="fill:var(--ink)"/>`;
  s+=`<path d="M${f1(cx-e-r*.18)} ${f1(ey-r*.28)}L${f1(cx-e+r*.16)} ${f1(ey-r*.14)}M${f1(cx+e+r*.18)} ${f1(ey-r*.28)}L${f1(cx+e-r*.16)} ${f1(ey-r*.14)}" style="stroke:var(--ink);stroke-width:1.6;stroke-linecap:round"/>`;
  s+=`<path d="M${f1(cx-r*.34)} ${f1(cy+r*.45)}Q${f1(cx)} ${f1(cy+r*.2)} ${f1(cx+r*.34)} ${f1(cy+r*.45)}" style="fill:none;stroke:var(--ink);stroke-width:1.6;stroke-linecap:round"/>`;
  return s}
function brPill(x,y,ev,N){const T={est:['EST.','var(--good)','var(--good-soft)'],early:['EARLY','var(--warn)','var(--warn-soft)'],hyp:['HYP.','var(--rx)','var(--rx-soft)']}[ev],w=T[0].length*(N?7.4:6.2)+10;
  return `<rect x="${f1(x)}" y="${f1(y-11)}" width="${f1(w)}" height="15" rx="4" style="fill:${T[2]}"/><text x="${f1(x+5)}" y="${f1(y)}" class="t-xs" style="fill:${T[1]};font-weight:700">${T[0]}</text>`}

inits.brain=()=>{
  const svg=$('#brSvg'),rg=$('#brT');let grp='bpd';
  function panel(p,u,P,N){let s='';const {x,y,w}=P,G=BR_LV[grp];
    const title=(t,yy=y)=>`<text x="${x}" y="${yy}" class="t-sm" style="fill:var(--ink);font-weight:600">${t}</text>`;
    const line=(t,yy,c,b)=>`<text x="${x}" y="${f1(yy)}" class="t-xs" style="fill:${c||'var(--muted)'}${b?';font-weight:700':''}">${t}</text>`;
    if(p===0){s+=title('AMYGDALA RESPONSE TO A NEGATIVE FACE');
      const bars=[['comparison','cmp',.32,'var(--other)'],['BPD','bpd',1,'var(--amyg)'],['after DBT','post',.55,'var(--calm)']],bw=N?70:60,gap=N?40:30,base=y+150,hh=110,gr=ease(ramp(u,.1,.7));
      bars.forEach(([n,k,v,c],i)=>{const bx=x+20+i*(bw+gap),h=hh*v*gr,on=k===grp;
        s+=`<rect x="${f1(bx)}" y="${f1(base-h)}" width="${bw}" height="${f1(h)}" rx="5" style="fill:${c};opacity:${on?.95:.35};stroke:${on?'var(--ink)':'none'};stroke-width:1.4"/><text x="${f1(bx+bw/2)}" y="${base+15}" class="t-xs t-mid" style="fill:var(--ink)${on?';font-weight:700':''}">${n}</text>`});
      s+=`<line x1="${x}" x2="${x+w}" y1="${base}" y2="${base}" class="axis"/>`;
      s+=`<text x="${x+w}" y="${y+24}" class="t-xs t-end">schematic heights</text>`;
      const yy=base+42;s+=line('Schulze 2016 · 19 studies · 281 vs 293',yy,'var(--ink)',true)+line('↑ more left-amygdala response (unmedicated)',yy+15)+line('Ruocco 2013 · 11 studies · 154 vs 150',yy+38,'var(--ink)',true)+line('↓ less amygdala response: direction disputed',yy+53);
      s+=line('After DBT: one 12-month study, 11 per group',yy+76,'var(--calm)')}
    else if(p===1){s+=title('THE BALANCE MODEL (HYPOTHESIS)');
      const tgt={bpd:13,cmp:-2,post:13}[grp],ang=lerp(0,tgt,ease(ramp(u,.05,.6))),cx=x+w/2,cy=y+92,L=N?140:120;
      const rad=ang*Math.PI/180,dx=Math.cos(rad)*L,dy=Math.sin(rad)*L;
      s+=`<path d="M${f1(cx-14)} ${cy+44}L${f1(cx)} ${cy}L${f1(cx+14)} ${cy+44}Z" style="fill:var(--panel-2);stroke:var(--line)"/>`;
      s+=`<line x1="${f1(cx-dx)}" y1="${f1(cy-dy)}" x2="${f1(cx+dx)}" y2="${f1(cy+dy)}" style="stroke:var(--ink);stroke-width:3;stroke-linecap:round"/>`;
      const pan=(px,py,c,t1,t2,r)=>`<line x1="${f1(px)}" y1="${f1(py)}" x2="${f1(px)}" y2="${f1(py+16)}" style="stroke:var(--ink)"/><circle cx="${f1(px)}" cy="${f1(py+16+r)}" r="${f1(r)}" style="fill:${c};opacity:.85"/><text x="${f1(px)}" y="${f1(py+36+2*r)}" class="t-xs t-mid" style="fill:var(--ink)">${t1}</text><text x="${f1(px)}" y="${f1(py+50+2*r)}" class="t-xs t-mid">${t2}</text>`;
      s+=pan(cx-dx,cy-dy,'var(--pfc)','prefrontal','control',8+G.pfc*14)+pan(cx+dx,cy+dy,'var(--amyg)','amygdala','alarm',8+G.amyg*14);
      const yy=y+218;s+=line('dlPFC response blunted (meta-analysis)',yy,'var(--ink)')+line('vmPFC lower when inhibiting (16 vs 14)',yy+16,'var(--ink)')+line('dACC less engaged when distancing (18 vs 16)',yy+32,'var(--ink)')+line('Critique: the simple model is too simple',yy+54,'var(--rx)');
      if(grp==='post')s+=line('After DBT: amygdala change only; balance not measured',yy+70,'var(--calm)')}
    else if(p===2){s+=title('AVERAGE VOLUME VS CONTROLS');
      const rows=[['Hippocampus',11],['Amygdala',13]],bw=w-20,sh=ease(ramp(u,.1,.7));
      rows.forEach(([n,r],i)=>{const yy=y+30+i*54,v=grp==='cmp'?100:100-r*sh,ww=bw*v/100;
        s+=`<text x="${x}" y="${yy}" class="t-xs" style="fill:var(--ink);font-weight:700">${n}</text><rect x="${x}" y="${yy+8}" width="${f1(bw)}" height="18" rx="4" style="fill:none;stroke:var(--muted);stroke-dasharray:3 3"/><rect x="${x}" y="${yy+8}" width="${f1(ww)}" height="18" rx="4" style="fill:var(--hpa);opacity:.8"/><text x="${f1(x+bw)}" y="${yy}" class="t-xs t-end" style="fill:var(--ink)">${grp==='cmp'?'100% (reference)':`${v.toFixed(0)}% · −${(r*sh).toFixed(0)}%`}</text>`});
      const yy=y+150;s+=line('Ruocco 2012 · 11 studies · 205 vs 222',yy,'var(--ink)',true)+line('not explained by medication or comorbidity',yy+15);
      s+=line('Insula: more active to negative emotion',yy+42,'var(--ink)',true)+line('(Ruocco 2013, 11 studies)',yy+57);
      s+=line('Grey matter lower: medial PFC, amygdala',yy+84,'var(--ink)',true)+line('(13 studies, 395 vs 415; unlike bipolar)',yy+99);
      if(grp==='post')s+=line('After DBT: no volume data in these studies',yy+124,'var(--calm)')}
    else if(p===3){s+=title('HPA AXIS: STRESS-HORMONE CHAIN');
      const bx=x+(N?6:4),bw2=N?120:110,nodes=[['Hypothalamus','CRH',y+30],['Pituitary','ACTH',y+100],['Adrenal glands','cortisol',y+170]];
      nodes.forEach(([n,h,yy],i)=>{s+=`<rect x="${bx}" y="${yy}" width="${bw2}" height="40" rx="8" style="fill:var(--panel-2);stroke:var(--hpa);stroke-width:1.3"/><text x="${bx+bw2/2}" y="${yy+17}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">${n}</text><text x="${bx+bw2/2}" y="${yy+31}" class="t-xs t-mid">${h} ↓</text>`;
        if(i<2)s+=`<line x1="${bx+bw2/2}" x2="${bx+bw2/2}" y1="${yy+40}" y2="${yy+70}" style="stroke:var(--hpa);stroke-width:1.6" marker-end="url(#brH)"/>`});
      /* cortisol dots travel back up to the brain (feedback) */
      const fx=bx+bw2+12,ny=G===BR_LV.bpd||grp==='post'?9:6;
      s+=`<path d="M${bx+bw2} ${y+190}C${fx+10} ${y+190} ${fx+10} ${y+50} ${bx+bw2} ${y+50}" style="fill:none;stroke:var(--hpa);stroke-width:1;stroke-dasharray:3 4;opacity:.7"/>`;
      for(let k=0;k<ny;k++){const q=(u*2+k/ny)%1,yy=lerp(y+190,y+50,q);s+=`<circle cx="${f1(bx+bw2+Math.sin(q*Math.PI)*16)}" cy="${f1(yy)}" r="3.4" style="fill:var(--hpa)"/>`}
      s+=`<text x="${f1(fx-6)}" y="${y+228}" class="t-xs">feedback</text>`;
      /* mini charts */
      const cx0=x+(N?178:150),cw=w-(N?178:150),c1=y+40,ch=56;
      s+=`<text x="${cx0}" y="${c1-12}" class="t-xs" style="fill:var(--ink);font-weight:700">Continuous output</text>`;
      [['comparison','cmp',.45,'var(--other)'],['BPD','bpd',.75,'var(--hpa)']].forEach(([n,k,v,c],i)=>{const on=k===grp||(grp==='post'&&k==='bpd');s+=`<rect x="${cx0}" y="${c1+i*22}" width="${f1(cw*v*ease(ramp(u,.05,.5)))}" height="14" rx="3" style="fill:${c};opacity:${on?.95:.4}"/><text x="${f1(cx0+4)}" y="${c1+i*22+11}" class="t-xs" style="fill:var(--bg);font-weight:700">${n}</text>`});
      const c2=c1+ch+48;s+=`<text x="${cx0}" y="${c2-12}" class="t-xs" style="fill:var(--ink);font-weight:700">After a social stressor</text>`;
      s+=`<line x1="${cx0}" x2="${cx0+cw}" y1="${c2+60}" y2="${c2+60}" class="axis"/>`;
      const up=ramp(u,.2,.95),curve=(pk,c,on)=>`<path d="${pathFn(v=>1-(.25+pk*Math.exp(-(((v-.35)/.18)**2))),cx0,cx0+cw*up,c2,c2+60,60)}" style="fill:none;stroke:${c};stroke-width:${on?2.6:1.6};opacity:${on?1:.45}"/>`;
      s+=curve(.6,'var(--other)',grp==='cmp')+curve(.22,'var(--hpa)',grp!=='cmp');
      s+=`<text x="${cx0+cw}" y="${c2+74}" class="t-xs t-end">time →</text>`;
      const yy=y+(N?262:258);s+=line('37 studies · 803 vs 1,092 · schematic shapes',yy)+line('Single basal samples: lower (g = −0.32)',yy+15,'var(--warn)')+line('Resting vagal HRV lower (g = −0.59)',yy+30,'var(--ink)');
      if(grp==='post')s+=line('After DBT: not measured here',yy+46,'var(--calm)')}
    else if(p===4){s+=title('OPIOID & OXYTOCIN HYPOTHESES');
      const sx=x+(N?90:80),sy=y+96,n=clamp(.25+u*.9,0,1);
      s+=synapse(sx,sy,1.25,{n:grp==='cmp'?n*.5:n,tx:'var(--nt)',seed:5,label:''});
      s+=`<text x="${sx}" y="${sy+56}" class="t-xs t-mid" style="fill:var(--ink)">opioid release (sadness)</text><text x="${sx}" y="${sy+70}" class="t-xs t-mid">(PET, 18 vs 14)</text>`;
      const px=x+(N?190:170),pw=w-(N?190:170);
      s+=`<text x="${px}" y="${y+34}" class="t-xs" style="fill:var(--ink);font-weight:700">Pain threshold</text>`;
      [['calm',grp==='cmp'?.4:.62],['distress',grp==='cmp'?.42:.85]].forEach(([n,v],i)=>{const yy=y+46+i*30,ww=pw*v*ease(ramp(u,.1,.6));s+=`<rect x="${px}" y="${yy}" width="${f1(pw)}" height="14" rx="3" style="fill:var(--panel-2)"/><rect x="${px}" y="${yy}" width="${f1(ww)}" height="14" rx="3" style="fill:var(--storm);opacity:.8"/><text x="${px}" y="${yy+26}" class="t-xs">${n}</text>`});
      s+=`<text x="${px}" y="${y+130}" class="t-xs" style="fill:var(--ink);font-weight:700">Plasma oxytocin</text>`;
      [['comparison',.7,'cmp'],['BPD',.45,'bpd']].forEach(([n,v,k],i)=>{const yy=y+140+i*22,on=k===grp||(grp==='post'&&k==='bpd');s+=`<rect x="${px}" y="${yy}" width="${f1(pw*v)}" height="14" rx="3" style="fill:var(--bond);opacity:${on?.9:.35}"/><text x="${f1(px+4)}" y="${yy+11}" class="t-xs" style="fill:var(--bg);font-weight:700">${n}</text>`});
      const yy=y+(N?230:226);s+=line('Single oxytocin dose: calmer response to angry eyes',yy,'var(--ink)')+line('…but less trust in rejection-sensitive people',yy+15,'var(--warn)')+line('Naltrexone (n = 29): no clear effect',yy+30)+line('Bars schematic; all small studies',yy+45);
      if(grp==='post')s+=line('After DBT: pain-related amygdala response reduced',yy+62,'var(--calm)')}
    else{s+=title('HOW MANY PEOPLE WERE SCANNED?');
      const rows=[['2001 amygdala study','per group',6],['2014 DBT study','per group',11],['2003 faces study','per group',15],['median imaging study','total',25],['2016 meta-analysis','BPD total',281],['2024 connectome sample','young adults',870],['needed to replicate','(Marek 2022)',3000]];
      const lx=x+(N?150:138),lw=w-(N?150:138)-8,LX=v=>lx+lw*Math.log10(v)/Math.log10(5000),sh=ramp(u,0,.8)*rows.length;
      [1,10,100,1000].forEach(v=>s+=`<line x1="${f1(LX(v))}" x2="${f1(LX(v))}" y1="${y+16}" y2="${y+20+rows.length*34}" class="grid"/><text x="${f1(LX(v))}" y="${y+34+rows.length*34}" class="t-xs t-mid">${v>=1000?'1,000':v}</text>`);
      rows.forEach(([n,m,v],i)=>{const o=clamp(sh-i,0,1);if(o<=0)return;const yy=y+38+i*34,last=i===rows.length-1;
        s+=`<g style="opacity:${f1(o)}"><text x="${x}" y="${yy}" class="t-xs" style="fill:var(--ink)">${n}</text><text x="${x}" y="${yy+13}" class="t-xs">${m}</text>`;
        s+=`<line x1="${f1(LX(1))}" x2="${f1(LX(v))}" y1="${yy-3}" y2="${yy-3}" style="stroke:${last?'var(--good)':'var(--muted)'};stroke-width:2;${last?'stroke-dasharray:4 3':''}"/><circle cx="${f1(LX(v))}" cy="${yy-3}" r="5" style="fill:${last?'var(--good)':v<30?'var(--storm)':'var(--dx)'}"/><text x="${f1(LX(v)+(v>1000?-8:8))}" y="${yy+11}" class="t-xs ${v>1000?'t-end':''}" style="fill:var(--ink)">${last?'thousands':v.toLocaleString('en')}</text></g>`});
      s+=line('log scale · the “thousands” point is approximate',y+50+rows.length*34)}
    return s}
  function draw(t){
    const N=vb(svg,'720 420','400 720'),p=phaseOf(BR_STEPS,t),S=BR_STEPS[p],nx=BR_STEPS[p+1],u=clamp((t-S.from)/((nx?nx.from:1.0001)-S.from));
    const B=N?{x:200,y:200,s:1.75,face:[44,52,22]}:{x:208,y:212,s:2.05,face:[56,46,26]},P=N?{x:20,y:410,w:360}:{x:404,y:30,w:300};
    let s=`<defs>${marker('brH','var(--hpa)')}${marker('brA','var(--storm)')}<marker id="brP" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="11" markerHeight="11" markerUnits="userSpaceOnUse" orient="auto"><path d="M0 0L10 5L0 10z" style="fill:var(--pfc)"/></marker></defs>`;
    const G=BR_LV[grp],k=p===0?{amyg:G.amyg*ease(ramp(u,.15,.6))}:p===1?{amyg:G.amyg,pfc:G.pfc,acc:G.acc}:p===2?{amyg:G.amyg,pfc:G.pfc,acc:G.acc,insula:G.insula,hippo:.55}:{amyg:G.amyg*.6,pfc:G.pfc*.6,acc:G.acc*.6,insula:G.insula*.6,hippo:.25};
    /* comparison: keep a little glow so the regions stay visible */
    const br=brain(B.x,B.y,B.s,{hl:k});s+=br.svg;const A=br.at;
    /* the face and the gaze */
    if(p===0){const [fx,fy,fr]=B.face,fo=ramp(u,0,.12);s+=`<g style="opacity:${f1(fo)}">${brFace(fx,fy,fr,{look:ramp(u,.12,.3)*(grp==='cmp'?.35:1)})}</g>`;
      if(p===0&&u>.15){const [ax,ay]=A.amyg,pr=ramp(u,.15,.45);s+=`<path d="M${fx+fr*.5} ${fy+fr*.6}Q${f1(fx+10)} ${f1(ay-10)} ${f1(lerp(fx+fr*.5,ax-10,pr))} ${f1(lerp(fy+fr*.6,ay-2,pr))}" style="fill:none;stroke:var(--storm);stroke-width:1.6;stroke-dasharray:4 3" marker-end="url(#brA)"/>`}}
    /* regulation arrow pfc -> amygdala */
    if(p===1||p===2){const [px,py]=A.pfc,[ax,ay]=A.amyg,w=1+5*G.pfc,o=p===1?ramp(u,.1,.4):.6;
      s+=`<path d="M${f1(px+6)} ${f1(py+12)}Q${f1(px+10)} ${f1(ay)} ${f1(ax-12)} ${f1(ay)}" style="fill:none;stroke:var(--pfc);stroke-width:${f1(w)};opacity:${f1(o)}" marker-end="url(#brP)"/>`;
      if(p===1)s+=`<text x="${f1(px-4)}" y="${f1(ay+20)}" class="t-xs t-mid" style="fill:var(--pfc);opacity:${f1(o)}">calming signal</text>`}
    /* hypothalamus link to the HPA panel */
    if(p===3){const hx=B.x+2*B.s,hy=B.y+14*B.s;s+=`<circle cx="${f1(hx)}" cy="${f1(hy)}" r="${f1(5+3*Math.sin(u*12))}" style="fill:var(--hpa);opacity:.85"/>`;
      s+=N?`<path d="M${f1(hx)} ${f1(hy+6)}L${f1(hx)} ${P.y+24}" style="stroke:var(--hpa);stroke-dasharray:3 3;fill:none"/>`:`<path d="M${f1(hx+6)} ${f1(hy)}C${f1(hx+120)} ${f1(hy)} ${P.x-60} ${P.y+50} ${P.x+2} ${P.y+50}" style="stroke:var(--hpa);stroke-dasharray:3 3;fill:none"/>`;
      s+=`<text x="${f1(hx+10)}" y="${f1(hy-10)}" class="t-xs" style="fill:var(--hpa);font-weight:700">hypothalamus</text>`}
    if(p===4){const [ax,ay]=A.amyg;s+=`<circle cx="${f1(ax)}" cy="${f1(ay)}" r="${f1(14+4*Math.sin(u*10))}" style="fill:none;stroke:var(--nt);stroke-width:1.5;stroke-dasharray:3 3"/>`}
    /* region labels with evidence pills */
    const LB=N?{pfc:[6,98,'Prefrontal','est'],acc:[138,70,'Ant. cingulate','early'],insula:[268,80,'Insula','est'],amyg:[14,352,'Amygdala','est'],hippo:[214,352,'Hippocampus','est']}
              :{pfc:[18,118,'Prefrontal cortex','est'],acc:[128,80,'Anterior cingulate','early'],insula:[262,92,'Insula','est'],amyg:[30,392,'Amygdala','est'],hippo:[228,392,'Hippocampus','est']};
    const vis={amyg:true,pfc:p>=1,acc:p>=1,insula:p>=2,hippo:p>=2};
    for(const r in LB){if(!vis[r])continue;const [lx,ly,n,ev]=LB[r],[cx,cy]=A[r],cw=n.length*(N?6.9:5.7);
      const ex=lx+cw/2,ey=ly<B.y?ly+5:ly-14;
      s+=`<line x1="${f1(ex)}" y1="${f1(ey)}" x2="${f1(cx)}" y2="${f1(cy)}" style="stroke:var(--muted);stroke-width:.8;opacity:.8"/>`;
      s+=`<text x="${lx}" y="${ly}" class="t-xs" style="fill:var(--ink);font-weight:600">${n}</text>`+brPill(lx+cw+5,ly,r==='pfc'&&p===1?'hyp':ev,N)}
    s+=panel(p,u,P,N);
    svg.innerHTML=s;
    setSt(p);
    rg.setAttribute('aria-valuetext',`Step ${p+1}: ${S.t}, ${grp==='bpd'?'BPD group':grp==='cmp'?'comparison group':'after DBT'}`);
    $('#brRead').innerHTML=`<span>showing <b>${grp==='bpd'?'BPD group average':grp==='cmp'?'comparison group':'after DBT (early evidence)'}</b></span><span>finding <b>${p+1} of 6</b></span>`;
    $('#brNote').innerHTML=noteHTML(S);
  }
  const stop=playWire(rg,$('#brPlay'),draw,26000,'%t:player.replay%','brain');
  const setSt=stepWire($('#brSteps'),BR_STEPS,rg,draw,stop);
  $$('[data-brgrp]').forEach(b=>b.addEventListener('click',()=>{grp=b.dataset.brgrp;$$('[data-brgrp]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---------- replication board ---------- */
  const BD=[
   {sys:'Threat',ev:'est',t:'More left-amygdala response to negative stimuli',n:574,nl:'19 fMRI studies · 281 BPD, 293 controls',ef:'location meta-analysis; seen in unmedicated, not medicated samples',c:3,src:'[[Schulze2016]]'},
   {sys:'Threat',ev:'est',t:'…or less amygdala activation?',n:304,nl:'11 studies · 154 BPD, 150 controls',ef:'less activation from amygdala to dorsolateral PFC; more insula',c:2,src:'[[Ruocco2013]]'},
   {sys:'Regulation',ev:'est',t:'Blunted dorsolateral prefrontal response',n:574,nl:'19 fMRI studies · 281 BPD, 293 controls',ef:'bilateral dlPFC blunted to negative stimuli',c:3,src:'[[Schulze2016]]'},
   {sys:'Regulation',ev:'early',t:'Less vmPFC activity when holding back',n:30,nl:'16 BPD, 14 controls',ef:'emotional go/no-go task',c:1,src:'[[Silbersweig2007]]'},
   {sys:'Structure',ev:'est',t:'Smaller hippocampus and amygdala',n:427,nl:'11 volumetric studies · 205 BPD, 222 controls',ef:'hippocampus −11%, amygdala −13% on average',c:4,src:'[[Ruocco2012]]'},
   {sys:'Structure',ev:'est',t:'Less grey matter in medial PFC and amygdala',n:810,nl:'13 studies · 395 BPD, 415 controls',ef:'voxel-based; pattern differs from bipolar disorder',c:4,src:'[[Yu2019BJP]]'},
   {sys:'Stress',ev:'early',t:'Higher continuous cortisol, blunted stress response',n:1895,nl:'37 studies · 803 BPD, 1,092 controls',ef:'single samples and drug challenges did not differ',c:2,src:'[[Drews2019]]'},
   {sys:'Stress',ev:'early',t:'Lower basal cortisol',n:546,nl:'12 studies · 278 BPD, 268 controls',ef:'g = −0.32 (95% CI −0.56 to −0.06)',c:2,src:'[[Thomas2019Cortisol]]'},
   {sys:'Stress',ev:'early',t:'Lower resting vagal heart-rate variability',n:200,nl:'5 studies · 95 BPD, 105 controls',ef:'g = −0.59 (95% CI −1.11 to −0.06)',c:2,src:'[[Koenig2016]]'},
   {sys:'Body',ev:'early',t:'Weaker heartbeat-evoked potentials',n:113,nl:'53 medication-free women with BPD, 60 controls',ef:'tracked emotion dysregulation; oxytocin did not change it',c:2,src:'[[Schmitz2020]]'},
   {sys:'Mind',ev:'est',t:'Reflective-functioning deficit',n:3454,nl:'34 studies · 1,448 BPD, 2,006 controls',ef:'d = 1.68 (reflective functioning) vs d = 0.36 (theory of mind)',c:4,src:'[[Bora2021]]'},
   {sys:'Mind',ev:'est',t:'Hypermentalizing is not specific to BPD',n:4188,nl:'36 studies · 4,188 people',ef:'r = 0.26 for BPD vs 0.24 for other disorders',c:4,src:'[[McLaren2022]]'},
   {sys:'Pain',ev:'early',t:'Higher pain thresholds',n:24,nl:'12 BPD, 12 controls (electrical); 12 vs 19 (calm and distress)',ef:'thresholds rose with dissociation and aversive arousal',c:1,src:'[[Ludascher2007,Bohus2000Pain]]'},
   {sys:'Chemistry',ev:'early',t:'More mu-opioid receptor availability',n:32,nl:'PET · 18 women with BPD, 14 controls',ef:'more endogenous opioid release during induced sadness',c:1,src:'[[Prossin2010]]'},
   {sys:'Chemistry',ev:'hyp',t:'Opioid-system theory of BPD',n:0,nl:'built from indirect findings',ef:'altered opioid sensitivity or availability; clinical data limited',c:1,src:'[[Bandelow2010,Stanley2010AJP]]'},
   {sys:'Chemistry',ev:'early',t:'Oxytocin calms the response to angry eyes',n:81,nl:'randomised, placebo-controlled · 40 BPD, 41 controls',ef:'single 26 IU dose; another trial found reduced trust',c:2,src:'[[Bertsch2013Oxytocin,Bartz2011Oxytocin]]'},
   {sys:'Chemistry',ev:'hyp',t:'Oxytocin and interpersonal hypersensitivity',n:0,nl:'theoretical model',ef:'links oxytocin to salience and social reward; may not be BPD-specific',c:1,src:'[[Herpertz2015]]'},
   {sys:'Change',ev:'early',t:'Amygdala activity falls after DBT',n:22,nl:'11 per group, 12 months of DBT',ef:'better habituation tracked better emotion regulation',c:1,src:'[[Goodman2014]]'},
   {sys:'Networks',ev:'early',t:'Connectivity patterns predict borderline traits',n:1093,nl:'870 young adults + 223 adolescents (Human Connectome Project)',ef:'traits, not diagnosed BPD; emotion-regulation and executive systems',c:2,src:'[[Shafiei2024]]'}];
  const board=$('#brBoard'),so=$('#brSort');let flt='all';
  const EVL={est:['ev est','Established'],early:['ev early','Early evidence'],hyp:['ev hyp','Hypothesis']},CW=['','low','modest','moderate','good','high'];
  function drawB(){let L=BD.filter(d=>flt==='all'||d.ev===flt);
    const k=so.value;L=[...L].sort((a,b)=>k==='conf'?b.c-a.c||b.n-a.n:k==='n'?b.n-a.n:a.sys.localeCompare(b.sys)||b.c-a.c);
    board.innerHTML=L.map(d=>`<article class="br-card"><div class="br-top"><span class="${EVL[d.ev][0]}">${EVL[d.ev][1]}</span><span class="br-meta">${d.sys}</span></div><h4>${d.t}</h4><div class="br-meta"><b>Sample</b> ${d.nl}<br><b>Effect</b> ${d.ef}</div><div class="br-meter" aria-label="Confidence ${d.c} of 5">${[1,2,3,4,5].map(i=>`<i class="${i<=d.c?'on':''}"></i>`).join('')}<span>${CW[d.c]} confidence</span></div><p class="br-meta">${d.src}</p></article>`).join('')}
  $$('[data-brf]').forEach(b=>b.addEventListener('click',()=>{flt=b.dataset.brf;$$('[data-brf]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawB()}));
  so.addEventListener('change',drawB);drawB();
};
