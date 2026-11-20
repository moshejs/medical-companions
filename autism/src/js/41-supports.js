/* =============== 4.1 Supports & the evidence =============== */
const SU_FAM=[
 {id:'beh',n:'Behavioural',c:'var(--accent)'},
 {id:'dev',n:'Developmental',c:'var(--neuro)'},
 {id:'ndbi',n:'NDBI',c:'var(--rx)'},
 {id:'teacch',n:'TEACCH',c:'var(--gold)'},
 {id:'sens',n:'Sensory-based',c:'var(--sense)'},
 {id:'animal',n:'Animal-assisted',c:'var(--muted)'},
 {id:'tech',n:'Technology-based',c:'var(--inhibit)'}];
/* significant summary effects in the 2023 Project AIM update, RCTs only; g per filter stage:
   [all RCTs, no caregiver/teacher report, also no high detection-bias risk]; null = no longer significant */
const SU_EF=[
 {f:'beh',c:'Ch',o:'social-emotional / challenging behaviour',g:[.58,null,null],ci:[.11,1.06],dy:0},
 {f:'dev',c:'SC',o:'social communication',g:[.28,.31,null],ci:[.12,.44],dy:0},
 {f:'ndbi',c:'La',o:'language',g:[.16,null,null],dy:-8},
 {f:'ndbi',c:'Pl',o:'play',g:[.19,null,null],dy:8},
 {f:'ndbi',c:'Ad',o:'adaptive behaviour',g:[.23,null,null],dy:-8},
 {f:'ndbi',c:'SC',o:'social communication',g:[.35,.36,null],ci:[.23,.47],dy:8},
 {f:'ndbi',c:'Dx',o:'diagnostic characteristics',g:[.38,.44,.30],ci:[.17,.59],ci3:[.03,.57],dy:-8},
 {f:'tech',c:'SC',o:'social communication',g:[.33,null,null],dy:-8},
 {f:'tech',c:'Ch',o:'social-emotional / challenging behaviour',g:[.57,null,null],dy:8}];
const SU_STEPS=[
 {from:0,at:.12,k:'Project AIM · the evidence base',t:'Thousands of children, seven families',
  txt:`Project AIM is the largest meta-analysis of early autism interventions. The 2020 review pooled 1,615 effect sizes from 130 samples covering 6,240 children aged 0–8, across seven intervention types: behavioural, developmental, naturalistic developmental behavioural (NDBI), TEACCH, sensory-based, animal-assisted and technology-based. [[Sandbank2020]] The 2023 update (search November 2021) included 252 studies and 13,304 participants: the evidence base roughly doubled in four years. [[Sandbank2023BMJ]] Medicines were not part of Project AIM; see <a href="#meds" data-go="meds">Medication</a>.`,
  pt:`Researchers gathered almost every study of early autism support they could find, so they could ask what works and how sure we can be.`,
  hook:`Project AIM 2020: 130 samples, 6,240 children, 7 intervention types. [[Sandbank2020]]`},
 {from:.2,at:.3,k:'Filter 1 · randomised trials only',t:'Nine significant effects',
  txt:`Counting only randomised controlled trials, the 2023 update found significant summary effects for behavioural interventions on challenging behaviour (g 0.58, 95% CI 0.11 to 1.06), developmental interventions on social communication (0.28), NDBI on adaptive behaviour (0.23), language (0.16), play (0.19), social communication (0.35) and diagnostic characteristics (0.38), and technology-based interventions on social communication (0.33) and challenging behaviour (0.57). TEACCH, sensory-based and animal-assisted interventions had none. [[Sandbank2023BMJ]]`,
  pt:`In the fairer studies, where children are put into groups by chance, several kinds of support still look helpful.`,
  hook:`Hedges' g is a standardised mean difference: 0.2 is often called small, 0.5 medium.`},
 {from:.4,at:.5,k:'Filter 2 · no caregiver or teacher reports',t:'Who is doing the rating?',
  txt:`Parents and teachers usually know which group a child is in, and they often help deliver the intervention. Excluding caregiver- and teacher-reported outcomes left three significant effects: developmental interventions on social communication (g 0.31), NDBI on social communication (0.36) and NDBI on diagnostic characteristics (0.44). Behavioural and technology effects were no longer significant. [[Sandbank2023BMJ]]`,
  pt:`When the people who rate progress are not the people who hoped for it, many of the gains get smaller or disappear.`,
  hook:`Rater effects: unblinded caregiver and teacher reports inflate effect sizes in autism trials. [[Sandbank2023BMJ]]`},
 {from:.6,at:.7,k:'Filter 3 · low risk of detection bias',t:'One effect left',
  txt:`<span class="ev est">Established</span> When effects at high risk of detection bias were also excluded, only one significant summary effect remained: NDBI on measures of diagnostic characteristics of autism, g 0.30 (95% CI 0.03 to 0.57). [[Sandbank2023BMJ]] In 2020, the same strict test (RCTs with outcomes free of detection bias) left no intervention type with a significant effect on any outcome. [[Sandbank2020]]`,
  pt:`Under the strictest test, only one small effect is left. That does not mean nothing helps; it means we cannot yet be sure how much.`,
  hook:`Project AIM: strictest filter → none significant (2020); only NDBI on diagnostic characteristics, g 0.30 (2023). [[Sandbank2020,Sandbank2023BMJ]]`},
 {from:.8,at:.92,k:'Why certainty is low',t:'Harms, conflicts and hours',
  txt:`Three more reasons for caution. Only 11 of 150 early-intervention reports mentioned adverse events. [[BottemaBeutel2021AE]] 70% of reports had at least one conflict of interest, but only about 6% fully disclosed them. [[BottemaBeutel2021COI]] And across 144 studies, more hours of intervention did not go with bigger effects; the authors found "little robust evidence" for intensive programmes. <span class="ev early">Early evidence</span> [[Sandbank2024JAMAPed]]`,
  pt:`Studies rarely check for downsides, many authors also sell the therapy, and more hours a week have not been shown to help more.`,
  hook:`70% of early-intervention reports had a conflict of interest; ~6% fully disclosed. Only 11/150 mentioned adverse events. [[BottemaBeutel2021COI,BottemaBeutel2021AE]]`}];

/* ---- PACT ---- */
const SU_PROWS=[
 {l:'Parent synchrony',w:'13 mo',v:1.22,ci:null,at:.28,src:'G'},
 {l:'Child initiations',w:'13 mo',v:.41,ci:null,at:.3,src:'G'},
 {l:'Symptoms (ADOS-G)',w:'13 mo',v:.24,ci:[-.11,.59],at:.4,src:'G',ns:1},
 {l:'Severity (ADOS CSS)',w:'endpoint',v:.64,ci:[.07,1.20],at:.62,src:'P'},
 {l:'Severity (ADOS CSS)',w:'follow-up',v:.70,ci:[-.05,1.47],at:.7,src:'P'},
 {l:'Severity, whole period',w:'0–6 y',v:.55,ci:[.14,.91],at:.74,src:'P'},
 {l:'Language',w:'follow-up',v:.15,ci:[-.23,.53],at:.86,src:'P',ns:1},
 {l:'Child initiations',w:'follow-up',v:.29,ci:null,at:.88,src:'P'}];
const SU_PSTEPS=[
 {from:0,at:.08,k:'Enrolment · age 2 to 4',t:'Randomised to two groups',
  txt:`152 children aged 2 years to 4 years 11 months were randomised at three UK centres: 77 to PACT plus treatment as usual, 75 to treatment as usual. PACT is parent-mediated: a therapist uses video feedback to help the parent notice and respond to the child's communication. [[Green2010]]`,
  pt:`Families were put into two groups by chance. In one, parents had coaching on top of the usual services.`,
  hook:`PACT = Preschool Autism Communication Trial; parent-mediated, communication-focused. [[Green2010]]`},
 {from:.16,at:.29,k:'13 months · end of therapy',t:'Parents and children in step',
  txt:`PACT clearly improved parent synchronous response (effect size 1.22) and the child's initiations with the parent (0.41). [[Green2010]] Across 17 RCTs, Cochrane also found strong evidence that parent-mediated interventions change parent–child interaction (parent synchrony SMD 0.90), while most child outcomes were inconclusive. [[Oono2013]]`,
  pt:`Parents learned to follow their child's lead, and children started more back-and-forth with their parent.`,
  hook:`Parent-mediated therapy changes the interaction first: synchrony ES 1.22 in PACT. [[Green2010]]`},
 {from:.36,at:.42,k:'13 months · symptom scores',t:'No significant difference yet',
  txt:`ADOS-G symptom scores fell by 3.9 points with PACT and 2.9 with treatment as usual; the between-group effect size, −0.24 (95% CI −0.59 to 0.11), was not significant. [[Green2010]] A trial can change how a family communicates before it changes a diagnostic score, and the 2010 paper's headline was a negative primary outcome.`,
  pt:`At the end of therapy, the autism assessment scores were similar in both groups.`,
  hook:`PACT 2010 primary outcome (ADOS-G at 13 months): not significant, ES −0.24. [[Green2010]]`},
 {from:.55,at:.7,k:'About 6 years later · mean age 10.5',t:'A long-term difference',
  txt:`<span class="ev est">Established</span> The follow-up traced 121 of 152 children (80%) a median 5.75 years after the trial ended. The effect on ADOS calibrated severity was 0.64 (95% CI 0.07 to 1.20) at endpoint and 0.70 (−0.05 to 1.47) at follow-up; over the whole period it was 0.55 (0.14 to 0.91, p=0.004), the first RCT to show long-term symptom reduction. [[Pickles2016]]`,
  pt:`Years later, the children whose parents had coaching showed, on average, fewer autism-related difficulties on the assessment.`,
  hook:`PACT follow-up: ADOS CSS ES 0.55 over about 6 years. [[Pickles2016]]`},
 {from:.82,at:.94,k:'What carried the effect',t:'Language did not differ; initiations did',
  txt:`At follow-up there was no group difference in language (ES 0.15, 95% CI −0.23 to 0.53); child initiations with the parent were 0.29. [[Pickles2016]] Mediation analysis found that more child communication initiation at the treatment midpoint explained 73% of the effect on follow-up severity. <span class="ev early">Early evidence</span> [[Carruthers2024]]`,
  pt:`The change that lasted seems to start with the child reaching out to communicate more, not with learning more words.`,
  hook:`PACT mediation: 73% of the follow-up effect ran through child initiations at midpoint. [[Carruthers2024]]`}];

inits.supports=()=>{
  /* ===== evidence map ===== */
  const svg=$('#suSvg'),rg=$('#suT');
  const famC=Object.fromEntries(SU_FAM.map(f=>[f.id,f.c])),famI=Object.fromEntries(SU_FAM.map((f,i)=>[f.id,i]));
  function gAt(e,t){const k1=ramp(t,.36,.46),k2=ramp(t,.56,.66);
    const v=[e.g[0],e.g[1],e.g[2]];
    const a=v[0],b=v[1]==null?0:v[1],c=v[2]==null?0:v[2];
    const g=k2>0?lerp(b,c,ease(k2)):lerp(a,b,ease(k1));
    const alive=k2>=.5?v[2]!=null:k1>=.5?v[1]!=null:true;
    const ci=k2>=.5?(alive?e.ci3:null):k1>=.5?null:e.ci;
    return {g,alive,ci}}
  let setSt=()=>{};
  function draw(t){
    const N=vb(svg,'720 396','400 600');
    const x0=N?24:180,x1=N?380:640,gx=g=>x0+(x1-x0)*clamp(g,0,.8)/.8;
    const ly=i=>N?104+i*46:74+i*34,axY=N?414:318;
    let s=`<defs>${marker('suAr','var(--muted)')}</defs>`;
    const nPart=Math.round(lerp(6240,13304,ramp(t,.02,.16)));
    const st=[`RCTs only`,`no caregiver/teacher report`,`low detection-bias risk`];
    const stage=t<.41?0:t<.61?1:2;
    s+=`<text x="${N?12:20}" y="28" class="t-big">${t<.18?'Project AIM: building the evidence base':'Filter: '+['randomised trials only','+ no caregiver or teacher reports','+ low risk of detection bias'][stage]}</text>`;
    s+=`<text x="${N?12:20}" y="${N?48:48}" class="t-sm">${t<.18?(nPart<13304?nPart.toLocaleString('en-GB')+' participants':'13,304 participants · 252 studies (2023)'):'2023 update · Hedges’ g'}</text>`;
    /* grid + axis */
    for(let g=0;g<=.8001;g+=.2){const x=gx(g);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${f1(ly(0)-22)}" y2="${axY}" class="grid" style="stroke:var(--line);stroke-dasharray:${g?'2 3':'0'}"/><text x="${f1(x)}" y="${axY+16}" class="t-xs t-mid">${g.toFixed(1)}</text>`}
    s+=`<line x1="${x0}" x2="${x1}" y1="${axY}" y2="${axY}" class="axis" style="stroke:var(--muted)"/>`;
    s+=`<text x="${f1((x0+x1)/2)}" y="${axY+32}" class="t-xs t-mid">pooled effect size (Hedges’ g) → larger benefit</text>`;
    /* lanes */
    SU_FAM.forEach((f,i)=>{const y=ly(i);
      s+=`<line x1="${x0}" x2="${x1}" y1="${y}" y2="${y}" style="stroke:var(--line);stroke-width:1"/>`;
      s+=N?`<text x="${x0}" y="${y-17}" class="t-xs" style="fill:${f.c};font-weight:600">${f.n}</text>`:`<text x="${x0-12}" y="${y+4}" class="t-lbl t-end" style="fill:${f.c}">${f.n}</text>`;
      if(['teacch','sens','animal'].includes(f.id)&&t>=.18)s+=`<text x="${f1(x0+8)}" y="${y+(N?-4:-6)}" class="t-xs" style="opacity:${f1(ramp(t,.18,.24))}">no significant RCT effect</text>`;
    });
    /* bubbles */
    const appear=i=>ramp(t,.02+i*.017,.06+i*.017);
    let alive=0;const rB=N?8:9;
    SU_EF.forEach((e,i)=>{const A=appear(i);if(A<=0)return;const S=gAt(e,t),y=ly(famI[e.f])+e.dy,x=gx(S.g*A+(1-A)*0),c=famC[e.f];
      if(S.alive)alive++;
      if(S.ci&&S.alive&&t>=.18){const cx0=gx(S.ci[0]),cx1=gx(S.ci[1]),over=S.ci[1]>.8;
        s+=`<line x1="${f1(cx0)}" x2="${f1(cx1-(over?4:0))}" y1="${y}" y2="${y}" style="stroke:${c};stroke-width:2;opacity:.55"${over?' marker-end="url(#suAr)"':''}/><line x1="${f1(cx0)}" x2="${f1(cx0)}" y1="${y-5}" y2="${y+5}" style="stroke:${c};stroke-width:2;opacity:.55"/>`;
        if(!over)s+=`<line x1="${f1(cx1)}" x2="${f1(cx1)}" y1="${y-5}" y2="${y+5}" style="stroke:${c};stroke-width:2;opacity:.55"/>`}
      const r=S.alive?rB:rB*.62;
      s+=`<circle cx="${f1(x)}" cy="${y}" r="${f1(r)}" style="fill:${S.alive?c:'var(--panel)'};stroke:${c};stroke-width:1.6;opacity:${f1(A*(S.alive?.92:.5))}"/>`;
      if(S.alive)s+=`<text x="${f1(x)}" y="${y+3.3}" class="t-xs t-mid" style="fill:var(--bg);font-weight:700;opacity:${f1(A)}">${e.c}</text>`;
      if(S.alive&&t>=.6&&e.c==='Dx'&&e.f==='ndbi')s+=`<text x="${f1(x+14)}" y="${y-10}" class="t-sm" style="fill:var(--ink)">g ${S.g.toFixed(2)}</text>`;
    });
    /* legend or the step-5 panel */
    const pk=ramp(t,.78,.86);
    const lgY=N?466:368;
    if(pk<1){const L=[['Ch','challenging behaviour'],['SC','social communication'],['Dx','diagnostic characteristics'],['La','language'],['Pl','play'],['Ad','adaptive']];
      let lx=N?12:20,ly2=lgY;s+=`<g style="opacity:${f1(1-pk)}">`;
      L.forEach(([a,b],j)=>{const w=(a.length+b.length+1)*6.9+14;if(lx+w>(N?392:712)){lx=N?12:20;ly2+=16}
        s+=`<text x="${lx}" y="${ly2}" class="t-xs"><tspan style="font-weight:700;fill:var(--ink)">${a}</tspan> ${b}</text>`;lx+=w});
      s+='</g>'}
    if(pk>0){const px=N?12:412,py=N?456:66,pw=N?376:296,ph=N?124:240;
      s+=`<g style="opacity:${f1(pk)}"><rect x="${px}" y="${py}" width="${pw}" height="${ph}" rx="12" style="fill:var(--panel);stroke:var(--line);stroke-width:1.4"/>`;
      const rows=[['Reports mentioning adverse events',11/150,'11 of 150','var(--warn)'],['Reports with ≥1 conflict of interest',.70,'70%','var(--bad)'],['… that fully disclosed them',.06,'≈6%','var(--bad)']];
      const bw=pw-28;rows.forEach((r,j)=>{const yy=py+(N?22:30)+j*(N?30:44);
        s+=`<text x="${px+14}" y="${yy}" class="t-xs" style="fill:var(--ink)">${r[0]}</text><rect x="${px+14}" y="${yy+5}" width="${bw}" height="9" rx="4" style="fill:var(--panel-2)"/><rect x="${px+14}" y="${yy+5}" width="${f1(bw*r[1]*ramp(t,.82,.9))}" height="9" rx="4" style="fill:${r[3]}"/><text x="${px+pw-14}" y="${yy}" class="t-xs t-end" style="font-weight:700;fill:var(--ink)">${r[2]}</text>`});
      const hy=py+(N?112:180);
      s+=`<text x="${px+14}" y="${hy}" class="t-xs" style="fill:var(--ink)">More hours → bigger effect?</text><text x="${px+pw-14}" y="${hy}" class="t-xs t-end" style="font-weight:700;fill:var(--ink)">no link in 144 studies</text>`;
      if(!N)s+=`<text x="${px+14}" y="${hy+22}" class="t-xs">Sources in the note panel.</text>`;
      s+='</g>'}
    svg.innerHTML=s;
    const ph=phaseOf(SU_STEPS,t);setSt(ph);
    $('#suNote').innerHTML=noteHTML(SU_STEPS[ph]);
    $('#suRead').innerHTML=`<span>stage <b>${t<.18?'evidence base':['RCTs only','+ no caregiver/teacher report','+ low detection-bias risk'][stage]}</b></span><span>significant effects <b>${t<.18?'—':alive}</b></span><span>participants (2023) <b>13,304</b></span>`;
  }
  const stop=playWire(rg,$('#suPlay'),draw,22000,'Replay','supports');
  setSt=stepWire($('#suSteps'),SU_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ===== PACT ===== */
  const ps=$('#suPSvg'),pr=$('#suPT');let foc='pact',setP=()=>{};
  const TURNS=(()=>{const r=rng(77),a=[];for(let i=0;i<16;i++)a.push({u:(i+.5)/16,p:r(),q:r()});return a})();
  function syncShare(t,g){/* schematic: share of child turns met in step */
    return g==='pact'?lerp(.3,.85,ramp(t,.08,.28)):lerp(.3,.42,ramp(t,.08,.28))}
  function drawP(t){
    const N=vb(ps,'720 380','400 700');
    let s='';
    /* --- scene --- */
    const sx=N?0:0,sy=N?0:0;
    const P=foc==='pact',col=P?'var(--rx)':'var(--muted)';
    const fx1=N?90:70,fx2=N?250:200,fy=N?78:86;
    s+=`<text x="${N?14:20}" y="26" class="t-lbl">${P?'PACT: parent follows the child’s lead':'Usual care only'}</text>`;
    s+=face(fx1,fy,N?26:24,{gaze:0,mouth:'smile'});
    s+=face(fx2,fy+6,N?20:18,{gaze:P&&t>.12?180:120,mouth:P&&t>.12?'open':'flat'});
    s+=`<text x="${fx1}" y="${fy+(N?42:40)}" class="t-xs t-mid">parent</text><text x="${fx2}" y="${fy+(N?40:38)}" class="t-xs t-mid">child</text>`;
    /* turn strip: child turns on top, parent responses below; linked when in step */
    const tx0=N?20:24,tx1=N?380:268,cy=N?150:160,py=N?182:190,sh=syncShare(t,foc);
    s+=`<text x="${tx0}" y="${cy-12}" class="t-xs">child turns</text><text x="${tx0}" y="${py+20}" class="t-xs">parent responses</text>`;
    let met=0;
    TURNS.forEach((T,i)=>{const x=lerp(tx0+6,tx1-6,T.u),inStep=T.p<sh;if(inStep)met++;
      s+=`<circle cx="${f1(x)}" cy="${cy}" r="4.5" style="fill:var(--brand)"/>`;
      const dx=inStep?0:(T.q-.5)*16+8;
      s+=`<rect x="${f1(x+dx-4)}" y="${py-4}" width="8" height="8" rx="2" style="fill:${inStep?col:'var(--panel-2)'};stroke:${col};stroke-width:1.2"/>`;
      if(inStep)s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${cy+5}" y2="${py-5}" style="stroke:${col};stroke-width:1.6"/>`});
    /* pictograms: 10 per group, about 8 children each; 2 fade at follow-up (121/152 traced) */
    const gy1=N?244:240,gy2=N?284:284,fade=ramp(t,.52,.6);
    [['pact','PACT · 77','var(--rx)',gy1],['tau','Usual care · 75','var(--muted)',gy2]].forEach(([g,lab,c,yy])=>{
      const on=foc===g;s+=`<text x="${tx0}" y="${yy-4}" class="t-xs" style="fill:${on?'var(--ink)':'var(--muted)'};font-weight:${on?700:500}">${lab}</text>`;
      for(let k=0;k<10;k++){const lost=k>=8&&fade>0;s+=person(tx0+(N?120:100)+k*(N?24:16),yy-22,N?22:18,c,{op:(on?1:.45)*(lost?1-.75*fade:1)})}});
    if(fade>0)s+=`<text x="${tx0}" y="${(N?gy2+22:gy2+20)}" class="t-xs" style="opacity:${f1(fade)}">121 of 152 children traced at follow-up (80%)</text>`;
    /* --- forest --- */
    const fx0=N?150:440,fxe=N?384:700,fyy=N?330:58,rowH=N?30:28,vx=v=>lerp(fx0,fxe,(clamp(v,-.4,1.6)+.4)/2);
    s+=`<text x="${N?14:300}" y="${fyy-18}" class="t-lbl">Between-group effect sizes</text>`;
    const fbot=fyy+SU_PROWS.length*rowH;
    s+=`<line x1="${f1(vx(0))}" x2="${f1(vx(0))}" y1="${fyy-6}" y2="${fbot}" style="stroke:var(--muted);stroke-width:1.2"/>`;
    [0,.5,1,1.5].forEach(v=>s+=`<text x="${f1(vx(v))}" y="${fbot+14}" class="t-xs t-mid">${v}</text>`);
    s+=`<text x="${f1(vx(.6))}" y="${fbot+28}" class="t-xs t-mid">favours PACT →</text>`;
    SU_PROWS.forEach((R,i)=>{const y=fyy+i*rowH+10,A=ramp(t,R.at-.05,R.at);
      const lx=N?14:300;
      s+=`<text x="${lx}" y="${y-2}" class="t-xs" style="fill:${A>0?'var(--ink)':'var(--muted)'};opacity:${A>0?1:.45}">${R.l}</text><text x="${lx}" y="${y+9}" class="t-xs" style="opacity:${A>0?1:.45}">${R.w} · ${R.src==='G'?'2010':'2016'}</text>`;
      if(A<=0)return;
      const c=R.ns?'var(--muted)':'var(--rx)';
      if(R.ci)s+=`<line x1="${f1(vx(R.ci[0]))}" x2="${f1(vx(lerp(R.ci[0],R.ci[1],A)))}" y1="${y}" y2="${y}" style="stroke:${c};stroke-width:2"/>`;
      const x=vx(R.v*ease(A));
      s+=`<rect x="${f1(x-5)}" y="${y-5}" width="10" height="10" style="fill:${R.ns?'var(--panel)':c};stroke:${c};stroke-width:1.6"/>`;
      s+=`<text x="${f1(Math.min(x+10,fxe-30))}" y="${y-6}" class="t-xs" style="fill:var(--ink);font-weight:600">${R.v.toFixed(2)}${R.ns?' ns':''}</text>`});
    /* --- age axis --- */
    const ay=N?670:350,ax0=N?24:40,ax1=N?380:690,AG=[2,11],age=a=>lerp(ax0,ax1,(a-AG[0])/(AG[1]-AG[0]));
    s+=`<line x1="${ax0}" x2="${ax1}" y1="${ay}" y2="${ay}" style="stroke:var(--muted);stroke-width:1.2"/>`;
    for(let a=2;a<=11;a++)s+=`<line x1="${f1(age(a))}" x2="${f1(age(a))}" y1="${ay-4}" y2="${ay+4}" style="stroke:var(--muted)"/><text x="${f1(age(a))}" y="${ay+16}" class="t-xs t-mid">${a}</text>`;
    s+=`<rect x="${f1(age(2))}" y="${ay-12}" width="${f1(age(4.9)-age(2))}" height="6" rx="3" style="fill:var(--rx);opacity:.35"/>`;
    s+=`<text x="${f1(age(2))}" y="${ay-16}" class="t-xs">enrolled 2–4 y 11 m</text><text x="${f1(age(10.5))}" y="${ay-16}" class="t-xs t-end">follow-up, mean 10.5 y</text>`;
    const ag=t<.5?lerp(3.5,4.6,ramp(t,0,.45)):lerp(4.6,10.5,ramp(t,.5,.72));
    s+=`<circle cx="${f1(age(ag))}" cy="${ay}" r="6" style="fill:var(--brand);stroke:var(--bg);stroke-width:2"/>`;
    s+=`<text x="${N?14:20}" y="${ay-36}" class="t-xs">age (years) · mean age now ≈ ${f1(ag)}</text>`;
    ps.innerHTML=s;
    const ph=phaseOf(SU_PSTEPS,t);setP(ph);
    const base=SU_PSTEPS[ph];
    const extra=P?'':` In the usual-care group, children received treatment as usual only; the comparison shows what PACT added on top of it. [[Green2010]]`;
    $('#suPNote').innerHTML=noteHTML(Object.assign({},base,{txt:base.txt+extra}));
    $('#suPRead').innerHTML=`<span>focus <b>${P?'PACT + usual care (n=77)':'usual care (n=75)'}</b></span><span>child turns met in step (schematic) <b>${met} of 16</b></span><span>traced at follow-up <b>${t>=.56?'121 of 152':'—'}</b></span>`;
  }
  const stopP=playWire(pr,$('#suPPlay'),drawP,20000,'Replay','supports');
  setP=stepWire($('#suPSteps'),SU_PSTEPS,pr,drawP,stopP);
  $$('[data-sug]').forEach(b=>b.addEventListener('click',()=>{foc=b.dataset.sug;$$('[data-sug]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawP(+pr.value)}));
  drawP(+pr.value);
};
