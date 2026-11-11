/* =============== 4.5 Research frontier =============== */
/* The pipeline chart: one row per agent, mean % weight change at the trial's main time point (drug arm, and the
   same trial's placebo arm). g = the step (mechanism group) in which the row's bar grows. t2 = the matching trial in
   people with type 2 diabetes, where one exists. All numbers from pass I, "Numbers for the animations". */
const FR_MECH={
  glp:{n:'GLP-1 only',col:'var(--glp1)'},
  gip:{n:'GIP + GLP-1',col:'var(--gip)'},
  gcg:{n:'+ glucagon',col:'var(--agrp)'},
  amy:{n:'+ amylin',col:'var(--pyy)'},
  gipx:{n:'GIP blocked + GLP-1',col:'var(--pen-dark)'}
};
const FR_EV={est:{n:'ESTABLISHED',bg:'var(--good-soft)',fg:'var(--good)'},early:{n:'EARLY',bg:'var(--warn-soft)',fg:'var(--warn)'},hyp:{n:'HYPOTHESIS',bg:'var(--hl-soft)',fg:'var(--hl)'}};
const FR_ROWS=[
 {name:'Semaglutide 2.4 mg',sub:'STEP 1 · phase 3 · 68 wk · weekly',mech:'glp',g:0,v:-14.9,p:-2.4,wk:68,ev:'est',trial:'STEP 1',c:'Wilding2021STEP1',t2:null},
 {name:'Tirzepatide 15 mg',sub:'SURMOUNT-1 · phase 3 · 72 wk · weekly',mech:'gip',g:0,v:-20.9,p:-3.1,wk:72,ev:'est',trial:'SURMOUNT-1',c:'Jastreboff2022SURMOUNT1',t2:null},
 {name:'Retatrutide 12 mg',sub:'TRIUMPH-1 · phase 3 · 80 wk · weekly',mech:'gcg',g:1,v:-25.0,p:-3.9,wk:80,ev:'est',trial:'TRIUMPH-1',c:'Jastreboff2026TRIUMPH1',
  t2:{v:-18.8,p:-5.1,wk:80,trial:'TRIUMPH-2',sub:'TRIUMPH-2 · phase 3 · 80 wk · with T2D',c:'Bellido2026TRIUMPH2'}},
 {name:'Survodutide 6.0 mg',sub:'SYNCHRONIZE-1 · phase 3 · 76 wk · weekly',mech:'gcg',g:1,v:-13.0,p:-5.4,wk:76,ev:'est',trial:'SYNCHRONIZE-1',c:'leRoux2026SYNCHRONIZE1',
  t2:{v:-9.8,p:-3.9,wk:76,trial:'SYNCHRONIZE-2',sub:'SYNCHRONIZE-2 · phase 3 · 76 wk · with T2D',c:'Wharton2026SYNCHRONIZE2'}},
 {name:'Mazdutide 9 mg',sub:'GLORY-2 · phase 3 · 60 wk · China',mech:'gcg',g:1,v:-16.65,p:-1.5,dp:2,wk:60,ev:'est',evx:' (in Chinese adults)',trial:'GLORY-2',c:'Gao2026GLORY2',t2:null},
 {name:'CagriSema 2.4/2.4 mg',sub:'REDEFINE 1 · phase 3a · 68 wk · weekly',mech:'amy',g:2,v:-20.4,p:-3.0,wk:68,ev:'est',trial:'REDEFINE 1',c:'Garvey2025REDEFINE1',
  t2:{v:-13.7,p:-3.4,wk:68,trial:'REDEFINE 2',sub:'REDEFINE 2 · phase 3a · 68 wk · with T2D',c:'Davies2025REDEFINE2'}},
 {name:'Amycretin 60 mg',sub:'phase 1b/2a · 36 wk · weekly',mech:'amy',g:2,v:-24.3,p:-1.1,wk:36,ev:'early',trial:'a phase 1b/2a trial',c:'Dahl2025Amycretin',t2:null},
 {name:'MariTide, top dose',sub:'phase 2 · 52 wk · every 4+ weeks',mech:'gipx',g:3,v:-16.2,p:-2.5,wk:52,ev:'early',trial:'phase 2',c:'Jastreboff2025MariTide',
  t2:{v:-12.3,p:-1.7,wk:52,trial:'phase 2, diabetes cohort',sub:'phase 2 · 52 wk · with T2D, top of range',c:'Jastreboff2025MariTide'}},
 {name:'Semaglutide 7.2 mg',sub:'STEP UP · phase 3b · 72 wk · weekly',mech:'glp',g:3,v:-18.7,p:-3.9,wk:72,ev:'est',trial:'STEP UP',c:'Wharton2025STEPUP',
  t2:{v:-13.2,p:-3.9,wk:72,trial:'STEP UP T2D',sub:'STEP UP T2D · phase 3b · 72 wk · with T2D',c:'Lingvay2025STEPUPT2D'}},
 {name:'Orforglipron 36 mg',sub:'ATTAIN-1 · phase 3 · 72 wk · daily tablet',mech:'glp',g:4,v:-11.2,p:-2.1,wk:72,ev:'est',trial:'ATTAIN-1',c:'Wharton2025ATTAIN1',
  t2:{v:-9.6,p:-2.5,wk:72,trial:'ATTAIN-2',sub:'ATTAIN-2 · phase 3 · 72 wk · with T2D',c:'Horn2026ATTAIN2'}},
 {name:'Oral semaglutide 25 mg',sub:'OASIS 4 · phase 3 · 64 wk · daily tablet',mech:'glp',g:4,v:-13.6,p:-2.2,wk:64,ev:'est',trial:'OASIS 4',c:'Wharton2025OASIS4',t2:null},
 {name:'Oral semaglutide 50 mg',sub:'OASIS 1 · phase 3 · 68 wk · daily tablet',mech:'glp',g:4,v:-15.1,p:-2.4,wk:68,ev:'est',trial:'OASIS 1',c:'Knop2023OASIS1',t2:null}
];
/* bimagrumab with semaglutide, phase 2, 48 weeks: absolute weight change in kg [[Heymsfield2026Bimagrumab]] */
const FR_BIMA=[{n:'placebo',v:-3.3},{n:'bimagrumab',v:-9.3},{n:'semaglutide 2.4 mg',v:-14.2},{n:'both',v:-17.8}];
const FR_STEPS=[
 {from:0,at:.09,k:'Yardsticks',t:'Approved medicines set the bar',
  txt:'Two approved weekly injections are the yardsticks. In STEP 1, semaglutide 2.4 mg gave −14.9% versus −2.4% with placebo at 68 weeks. [[Wilding2021STEP1]] In SURMOUNT-1, tirzepatide 15 mg gave −15.0% to −20.9% across doses versus −3.1% at 72 weeks. [[Jastreboff2022SURMOUNT1]] Head to head in SURMOUNT-5, tirzepatide gave −20.2% versus −13.7% with semaglutide. [[Aronne2025SURMOUNT5]]',
  pt:'Each bar is the average for a whole group in one trial. Real people spread widely around it.',
  hook:'Only a few trials compare agents directly (SURMOUNT-5, STEP UP, REDEFINE 5); the rest of this chart is cross-trial. [[Chen2026NMA]]'},
 {from:.14,at:.27,k:'Triple and dual agonists',t:'Glucagon joins in',
  txt:'Retatrutide is one molecule that activates GIP, GLP-1 and glucagon receptors. [[Jastreboff2023Retatrutide]] In TRIUMPH-1 (2,339 adults without diabetes, 80 weeks) weight changed −17.6%, −23.7% and −25.0% on 4, 9 and 12 mg versus −3.9% on placebo. [[Jastreboff2026TRIUMPH1]] Survodutide and mazdutide add glucagon to GLP-1: −13.0% versus −5.4% at 76 weeks, [[leRoux2026SYNCHRONIZE1]] and −16.65% versus −1.50% at 60 weeks in Chinese adults. [[Gao2026GLORY2]] A network meta-analysis ranked retatrutide first, but its confidence intervals overlapped with others. [[Chen2026NMA]] Retatrutide outcome trials are listed further down. [[NCT05882045,NCT06383390]]',
  pt:'These medicines copy two or three gut hormones at once. The biggest average weight losses so far come from this group.',
  hook:'Retatrutide = GIP + GLP-1 + glucagon receptor agonist; TRIUMPH-1 −25.0% (12 mg) vs −3.9% at 80 weeks. [[Jastreboff2026TRIUMPH1]]'},
 {from:.34,at:.45,k:'Amylin',t:'Adding amylin',
  txt:'CagriSema pairs cagrilintide, a long-acting amylin analogue, with semaglutide, 2.4 mg each weekly. In REDEFINE 1 (3,417 adults, 68 weeks) weight changed −20.4% versus −3.0%; gastrointestinal events affected 79.6% versus 39.9%. [[Garvey2025REDEFINE1]] Head to head in REDEFINE 5, CagriSema gave −18.4% versus −11.9% with semaglutide alone. [[Yamauchi2026REDEFINE5]] Amycretin puts both actions in one molecule: −24.3% on 60 mg at 36 weeks in a small early trial with a high withdrawal rate. [[Dahl2025Amycretin]] A cardiovascular outcome trial of CagriSema runs to 2027. [[NCT05669755]]',
  pt:'Amylin is another fullness hormone. Combining it with a GLP-1 medicine added weight loss in the trials.',
  hook:'CagriSema is two molecules (cagrilintide + semaglutide); amycretin is one molecule acting on both receptors. [[Garvey2025REDEFINE1,Dahl2025Amycretin]]'},
 {from:.52,at:.61,k:'Monthly and higher dose',t:'Less often, or more of the same',
  txt:'MariTide joins a GLP-1 agonist peptide to an antibody that blocks the GIP receptor, dosed every 4 weeks or less often. Phase 2 gave −12.3% to −16.2% across doses versus −2.5% at 52 weeks. [[Jastreboff2025MariTide]] Its phase 3 weight trial reports in 2027. [[NCT06858839]] Semaglutide 7.2 mg in STEP UP gave −18.7% versus −15.6% with 2.4 mg and −3.9% with placebo, and dysaesthesia (altered skin sensation) in 22.9%. [[Wharton2025STEPUP]] The WEGOVY label states the injection may be increased to a maximum of 7.2 mg weekly for people who tolerate 2.4 mg for at least 4 weeks when more weight reduction is clinically indicated. [[FDA-Wegovy]]',
  pt:'One new medicine might only need an injection once a month. A higher dose of an existing one gave a little more weight loss, with more side effects.',
  hook:'MariTide blocks GIP while tirzepatide activates it; both lower weight. [[Jastreboff2025MariTide]]'},
 {from:.68,at:.77,k:'Oral small molecules',t:'Daily tablets',
  txt:'Orforglipron is a non-peptide GLP-1 agonist tablet. In ATTAIN-1 (3,127 adults, 72 weeks) weight changed −7.5%, −8.4% and −11.2% on 6, 12 and 36 mg versus −2.1% on placebo. [[Wharton2025ATTAIN1]] The FDA approved it as FOUNDAYO on 1 April 2026; the label expresses doses differently, and its 17.2 mg dose corresponds to the 36 mg trial arm. [[FDA-Foundayo]] Oral semaglutide gave −13.6% (25 mg) and −15.1% (50 mg). [[Wharton2025OASIS4,Knop2023OASIS1]] WEGOVY tablets were approved on 22 December 2025. [[FDA-Wegovy]]',
  pt:'There are now daily tablets as well as weekly injections. On average they lead to a bit less weight loss than the strongest injections.',
  hook:'Orforglipron can be taken with or without food; oral semaglutide is taken fasting with a little water. [[FDA-Foundayo,FDA-Wegovy]]'},
 {from:.84,at:.95,k:'Muscle preservation',t:'Losing fat, keeping muscle',
  txt:'Bimagrumab blocks activin type II receptors, a signal that normally limits muscle growth. In 75 people with type 2 diabetes it cut fat mass by 20.5% and raised lean mass by 3.6% over 48 weeks (completers only). [[Heymsfield2021Bimagrumab]] With semaglutide (507 people) weight changed −17.8 kg with both, −14.2 kg with semaglutide and −9.3 kg with bimagrumab, versus −3.3 kg on placebo; muscle spasms, diarrhoea and acne were common. [[Heymsfield2026Bimagrumab]] Whether keeping lean mass improves strength, falls or long-term health has not been tested. [[Heymsfield2026Bimagrumab,Hjelmesaeth2026STEPUPMuscle]]',
  pt:'Weight loss includes some muscle. Researchers are testing medicines that help keep muscle, but it is not yet known whether that changes health.',
  hook:'Bimagrumab = activin type II receptor antibody: fat down, lean mass up in phase 2. [[Heymsfield2021Bimagrumab]]'}
];
const FR_GSPAN=[[0,.12],[.14,.32],[.34,.5],[.52,.66],[.68,.82]];
/* the receptor explorer */
const FR_RX={
  glp:{n:'GLP-1',col:'var(--glp1)',info:'GLP-1 receptor: every agent in this pipeline acts on it. [[Moiz2026SR]]'},
  gip:{n:'GIP',col:'var(--gip)',info:'GIP receptor: tirzepatide and retatrutide activate it, MariTide blocks it, and both approaches lower weight; why is not settled. <span class="ev hyp">Hypothesis</span> [[Jastreboff2022SURMOUNT1,Jastreboff2025MariTide]]'},
  gcg:{n:'Glucagon',col:'var(--agrp)',info:'Glucagon receptor: thought to add effects on liver fat and energy expenditure. <span class="ev hyp">Hypothesis</span> [[leRoux2026SYNCHRONIZE1,Sanyal2024Survodutide]]'},
  amy:{n:'Amylin',col:'var(--pyy)',info:'Amylin receptor: cagrilintide is a long-acting amylin analogue; amycretin acts on amylin and GLP-1 receptors in one molecule. [[Garvey2025REDEFINE1,Dahl2025Amycretin]]'}
};
const FR_AG=[
 {n:'Semaglutide',r:{glp:1},txt:'weekly injection or daily tablet; approved. [[Wilding2021STEP1,FDA-Wegovy]]'},
 {n:'Orforglipron',r:{glp:1},txt:'a small-molecule (non-peptide) daily tablet; approved in the US as FOUNDAYO. [[Wharton2023Orforglipron,FDA-Foundayo]]'},
 {n:'Tirzepatide',r:{glp:1,gip:1},txt:'a dual GIP/GLP-1 receptor agonist; approved. [[FDA-Zepbound]]'},
 {n:'MariTide',r:{glp:1,gip:-1},txt:'a GLP-1 agonist peptide joined to a GIP-receptor-blocking antibody; phase 3. [[Jastreboff2025MariTide,NCT06858839]]'},
 {n:'Survodutide',r:{glp:1,gcg:1},txt:'a glucagon/GLP-1 dual agonist; phase 3, not approved. [[leRoux2026SYNCHRONIZE1]]'},
 {n:'Mazdutide',r:{glp:1,gcg:1},txt:'a glucagon/GLP-1 dual agonist; phase 3 in China. [[Ji2025GLORY1,Gao2026GLORY2]]'},
 {n:'Retatrutide',r:{glp:1,gip:1,gcg:1},txt:'one molecule on three receptors; phase 3, not approved. [[Jastreboff2023Retatrutide,Jastreboff2026TRIUMPH1]]'},
 {n:'CagriSema',r:{glp:1,amy:1},txt:'two molecules, cagrilintide plus semaglutide; phase 3, not approved. [[Garvey2025REDEFINE1]]'},
 {n:'Amycretin',r:{glp:1,amy:1},txt:'one molecule on GLP-1 and amylin receptors; early trials. [[Dahl2025Amycretin]]'}
];

inits.frontier=()=>{
  const sec=$('#m-frontier');
  /* ---------- the pipeline chart ---------- */
  const svg=$('#frSvg'),rg=$('#frT'),read=$('#frRead');
  let pop=0,pbo=true;
  const fmt=(v,dp=1)=>(v<0?'−':'+')+Math.abs(v).toFixed(dp)+'%';
  function rowData(R){if(!pop)return R;if(!R.t2)return null;return Object.assign({},R,R.t2,{name:R.name,mech:R.mech,g:R.g,ev:R.ev})}
  function grow(g,t){if(g>4)return 1;const s=FR_GSPAN[g];return ease(ramp(t,s[0],s[1]))}
  function tag(x,y,ev,w){const E=FR_EV[ev];return `<rect x="${f1(x)}" y="${f1(y)}" width="${w}" height="15" rx="4" style="fill:${E.bg}"/><text x="${f1(x+w/2)}" y="${f1(y+10.6)}" class="t-xs t-mid" style="fill:${E.fg};font-weight:700;letter-spacing:.06em">${E.n}</text>`}
  function draw(t){
    const N=vb(svg,'720 470','400 720');
    const p=phaseOf(FR_STEPS,t),P=FR_STEPS[p];
    const L=N?{x0:14,x1:300,y0:60,rh:50,tky:44,tg:318,tw:74,ly:678}:{x0:282,x1:598,y0:56,rh:32,tky:42,tg:636,tw:78,ly:458};
    const XS=`font-size:${N?11:10.5}px`;
    const X=v=>L.x0+(L.x1-L.x0)*(-v)/27;
    let s=N?`<text x="12" y="16" class="t-lbl" style="font-size:13px">${pop?'With type 2 diabetes':'Without diabetes'}: mean % weight change</text><text x="12" y="30" class="t-xs" style="${XS}">at each trial's main time point</text>`
           :`<text x="8" y="18" class="t-lbl" style="font-size:13px">${pop?'People with type 2 diabetes':'People without diabetes'}: mean % change in body weight at each trial's main time point</text>`;
    const yEnd=L.y0+FR_ROWS.length*L.rh;
    [0,-5,-10,-15,-20,-25].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${L.tky+5}" y2="${yEnd}" class="grid"/><text x="${f1(X(v))}" y="${L.tky}" class="t-xs t-mid" style="${XS}">${v?'−'+(-v)+'%':'0'}</text>`});
    FR_ROWS.forEach((R0,i)=>{
      const y=L.y0+i*L.rh,R=rowData(R0),k=grow(R0.g,t),act=R0.g===p;
      if(act)s+=`<rect x="${N?4:2}" y="${y}" width="${N?392:716}" height="${L.rh-2}" rx="6" style="fill:var(--field);stroke:var(--line)"/>`;
      const M=FR_MECH[R0.mech],op=R?1:.42;
      s+=`<g style="opacity:${op}">`;
      s+=`<rect x="${N?6:5}" y="${y+4}" width="4" height="${L.rh-10}" rx="2" style="fill:${M.col}"/>`;
      const nm=R0.name,sb=R?R.sub:R0.sub;
      if(N){s+=`<text x="16" y="${y+15}" class="t-lbl" style="font-size:13.5px">${nm}</text><text x="16" y="${y+29}" class="t-xs" style="${XS}">${sb}</text>`}
      else{s+=`<text x="15" y="${y+14}" class="t-lbl" style="font-size:13px">${nm}</text><text x="15" y="${y+27}" class="t-xs" style="${XS}">${sb}</text>`}
      const by=N?y+34:y+6,bh=N?9:12,py=N?y+44:y+20;
      if(R){
        if(k>0){
          const w=X(R.v*k)-L.x0;
          s+=`<rect x="${L.x0}" y="${by}" width="${f1(Math.max(1,w))}" height="${bh}" rx="2" style="fill:${M.col}"/>`;
          if(pbo){const wp=X(R.p*k)-L.x0;s+=`<rect x="${L.x0}" y="${py}" width="${f1(Math.max(1,wp))}" height="${N?4:6}" rx="1.5" style="fill:var(--figure)"/>`}
          s+=`<text x="${f1(L.x0+w+5)}" y="${by+bh-1}" class="t-xs" style="fill:var(--ink);font-weight:700;${XS}">${fmt(R.v*k,R.dp||1)}</text>`;
        }else{
          s+=`<rect x="${L.x0}" y="${by}" width="${f1(X(R.v)-L.x0)}" height="${bh}" rx="2" style="fill:none;stroke:var(--line);stroke-dasharray:3 3"/>`;
        }
        s+=tag(L.tg,N?y+4:y+8,R0.ev,L.tw);
      }else{
        s+=`<text x="${L.x0}" y="${by+bh-1}" class="t-xs" style="${XS}">no type 2 diabetes trial in this chart</text>`;
      }
      s+='</g>';
    });
    /* legend */
    const lg=Object.values(FR_MECH).map(m=>({n:m.n,col:m.col,h:12}));
    if(pbo)lg.push({n:'placebo',col:'var(--figure)',h:5});
    let lx=8;
    lg.forEach((m,i)=>{const c=N?i%2:i,r=N?Math.floor(i/2):0,x=N?12+c*190:lx,yy=L.ly+r*17;lx+=m.n.length*6.4+34;
      s+=`<rect x="${x}" y="${yy-4-m.h/2}" width="12" height="${m.h}" rx="2" style="fill:${m.col}"/><text x="${x+17}" y="${yy}" class="t-xs" style="${XS}">${m.n}</text>`});
    /* muscle panel */
    const a=ramp(t,.84,.9);
    if(a>0){
      const B=N?{x:16,y:220,w:368,h:250}:{x:276,y:130,w:420,h:236};
      const kb=ease(ramp(t,.86,.97)),bx0=B.x+(N?112:150),bx1=B.x+B.w-46,XB=v=>bx0+(bx1-bx0)*(-v)/20;
      s+=`<g style="opacity:${f1(a)}" transform="translate(0 ${f1((1-a)*14)})"><rect x="${B.x}" y="${B.y}" width="${B.w}" height="${B.h}" rx="12" style="fill:var(--panel);stroke:var(--line);stroke-width:1.5"/>`;
      s+=`<text x="${B.x+14}" y="${B.y+22}" class="t-lbl" style="font-size:12.5px">Keeping muscle: bimagrumab</text>`+tag(B.x+B.w-90,B.y+10,'early',78);
      s+=`<text x="${B.x+14}" y="${B.y+38}" class="t-xs">phase 2, 507 people, 48 weeks: weight change in kg</text>`;
      FR_BIMA.forEach((b,i)=>{const y=B.y+52+i*26,col=i===0?'var(--figure)':i===1?'var(--lean)':i===2?'var(--glp1)':'var(--life)';
        s+=`<text x="${bx0-8}" y="${y+11}" class="t-xs t-end" style="fill:var(--ink)">${b.n}</text><rect x="${bx0}" y="${y+2}" width="${f1(Math.max(1,XB(b.v*kb)-bx0))}" height="12" rx="2" style="fill:${col}"/><text x="${f1(XB(b.v*kb)+5)}" y="${y+12}" class="t-xs" style="fill:var(--ink);font-weight:700">${'−'+Math.abs(b.v*kb).toFixed(1)} kg</text>`});
      /* fat versus lean, bimagrumab alone */
      const fy=B.y+164,fx=B.x+14,fw=B.w-28,fk=ease(ramp(t,.9,1));
      s+=`<text x="${fx}" y="${fy}" class="t-xs" style="fill:var(--ink);font-weight:700">Bimagrumab alone, 48 weeks (completers):</text>`;
      const mid=fx+fw*.5,sc=fw*.5/24;
      s+=`<line x1="${f1(mid)}" x2="${f1(mid)}" y1="${fy+6}" y2="${fy+56}" class="axis"/>`;
      s+=`<rect x="${f1(mid-20.5*sc*fk)}" y="${fy+10}" width="${f1(20.5*sc*fk)}" height="14" rx="2" style="fill:var(--fat)"/><text x="${f1(mid+6)}" y="${fy+21}" class="t-xs" style="fill:var(--ink)">fat mass −${(20.5*fk).toFixed(1)}%</text>`;
      s+=`<rect x="${f1(mid)}" y="${fy+32}" width="${f1(Math.max(1,3.6*sc*fk))}" height="14" rx="2" style="fill:var(--lean)"/><text x="${f1(mid-6)}" y="${fy+43}" class="t-xs t-end" style="fill:var(--ink)">lean mass +${(3.6*fk).toFixed(1)}%</text>`;
      s+='</g>';
    }
    svg.innerHTML=s;
    setSt(p);$('#frNote').innerHTML=noteHTML(P);
    /* the readout: every bar of the current step, with its source */
    if(p<5){
      const rows=FR_ROWS.filter(R=>R.g===p);
      read.innerHTML=rows.map(R0=>{const R=rowData(R0);if(!R)return `<b>${R0.name}</b>: no trial in people with type 2 diabetes in this chart.`;
        return `<b>${R0.name}</b>: ${fmt(R.v,R.dp||1)} versus ${fmt(R.p,R.dp||1)} on placebo at ${R.wk} weeks (${R.trial})${R0.evx||''}. `+FR_CITE[R.c]}).join(' ');
    }else read.innerHTML=FR_BIMA_TXT;
  }
  const stop=playWire(rg,$('#frPlay'),draw,26000,'%t:player.replay%','frontier');
  const setSt=stepWire($('#frSteps'),FR_STEPS,rg,draw,stop);
  const pb0=$('#frPop0'),pb1=$('#frPop1'),pbb=$('#frPbo');
  function setPop(v){pop=v;pb0.setAttribute('aria-pressed',v===0);pb1.setAttribute('aria-pressed',v===1);draw(+rg.value)}
  pb0.addEventListener('click',()=>setPop(0));pb1.addEventListener('click',()=>setPop(1));
  pbb.addEventListener('click',()=>{pbo=!pbo;pbb.setAttribute('aria-pressed',pbo);draw(+rg.value)});
  draw(+rg.value);

  /* ---------- the receptor explorer ---------- */
  const rsv=$('#frRxSvg'),rnote=$('#frRxNote'),blk=$('#frGipBlock');
  const sel={glp:1,gip:0,gcg:0,amy:0};let stopR=null;
  const KEYS=['glp','gip','gcg','amy'];
  const want=()=>({glp:sel.glp,gip:sel.gip?(blk.checked?-1:1):0,gcg:sel.gcg,amy:sel.amy});
  const same=(a,b)=>KEYS.every(k=>(a[k]||0)===(b[k]||0));
  function glyph(k,x,y,r,op=1){const c=FR_RX[k].col,st=`fill:${c};stroke:var(--panel);stroke-width:1.2;opacity:${op}`;
    if(k==='glp'){let d='';for(let i=0;i<6;i++){const a=Math.PI/3*i+Math.PI/6;d+=(i?'L':'M')+f1(x+r*Math.cos(a))+' '+f1(y+r*Math.sin(a))}return `<path d="${d}Z" style="${st}"/>`}
    if(k==='gip'){let d='';for(let i=0;i<5;i++){const a=Math.PI*2/5*i-Math.PI/2;d+=(i?'L':'M')+f1(x+r*Math.cos(a))+' '+f1(y+r*Math.sin(a))}return `<path d="${d}Z" style="${st}"/>`}
    if(k==='gcg')return `<path d="M${f1(x)} ${f1(y-r)}L${f1(x+r)} ${f1(y)}L${f1(x)} ${f1(y+r)}L${f1(x-r)} ${f1(y)}Z" style="${st}"/>`;
    return `<path d="M${f1(x)} ${f1(y-r)}L${f1(x+r*.95)} ${f1(y+r*.75)}L${f1(x-r*.95)} ${f1(y+r*.75)}Z" style="${st}"/>`}
  function drawRx(pr){
    const N=vb(rsv,'720 330','400 400');
    const W=want(),match=FR_AG.filter(A=>same(A.r,W));
    const L=N?{mx:[58,152,248,342],my:282,bx:200,by:96,ty:20}:{mx:[120,280,440,600],my:226,bx:360,by:70,ty:22};
    let s='';
    /* cell membrane */
    const w=N?400:720;
    s+=`<rect x="0" y="${L.my}" width="${w}" height="${N?118:104}" style="fill:var(--field)"/>`;
    s+=`<path d="M0 ${L.my}H${w}M0 ${L.my+12}H${w}" style="stroke:var(--fat-line);stroke-width:2;opacity:.6"/>`;
    for(let x=6;x<w;x+=12)s+=`<circle cx="${x}" cy="${L.my+3}" r="3" style="fill:var(--cyto);stroke:var(--fat-line);stroke-width:.8"/><circle cx="${x}" cy="${L.my+9}" r="3" style="fill:var(--cyto);stroke:var(--fat-line);stroke-width:.8"/>`;
    s+=`<text x="${w-10}" y="${L.my+(N?110:96)}" class="t-xs t-end">inside the cell</text><text x="${w-10}" y="${L.my-8}" class="t-xs t-end">cell surface</text>`;
    /* drug body */
    const on=KEYS.filter(k=>W[k]);
    const nAct=on.length;
    s+=`<text x="${L.bx}" y="${L.ty}" class="t-lbl t-mid" style="font-size:13px">${match.length?match.map(A=>A.n).join(' · '):'No agent in this guide has exactly this combination'}</text>`;
    if(nAct){
      const bw=34+nAct*20;
      s+=`<rect x="${f1(L.bx-bw/2)}" y="${L.by-16}" width="${f1(bw)}" height="32" rx="16" style="fill:var(--panel);stroke:var(--rx-drug);stroke-width:2"/>`;
      on.forEach((k,j)=>{s+=glyph(k,L.bx-bw/2+27+j*20,L.by,7)});
      s+=`<text x="${L.bx}" y="${L.by-24}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">${match.length===1&&match[0].n==='CagriSema'?'two molecules, given together':'the medicine'}</text>`;
    }
    KEYS.forEach((k,i)=>{
      const x=L.mx[i],R=FR_RX[k],a=W[k]!==0,y0=L.my-46;
      /* receptor: a cup in the membrane, with a stem into the cell */
      s+=`<path d="M${x-18} ${y0}v30a8 8 0 0 0 8 8h20a8 8 0 0 0 8-8v-30" style="fill:none;stroke:${R.col};stroke-width:5;stroke-linecap:round;opacity:${a?1:.35}"/>`;
      s+=`<line x1="${x}" y1="${y0+38}" x2="${x}" y2="${L.my+40}" style="stroke:${R.col};stroke-width:5;stroke-linecap:round;opacity:${a?1:.35}"/>`;
      s+=`<text x="${x}" y="${L.my+(N?58:56)}" class="t-lbl t-mid" style="font-size:12px;opacity:${a?1:.6}">${R.n}</text><text x="${x}" y="${L.my+(N?71:69)}" class="t-xs t-mid">receptor</text>`;
      if(!a)return;
      /* the ligand travels from the medicine to the receptor */
      const q=ease(clamp(pr*1.25-i*.08));
      const sx=L.bx,sy=L.by+16,ex=x,ey=y0+18;
      const lx=lerp(sx,ex,q),ly=lerp(sy,ey,q);
      s+=`<path d="M${sx} ${sy}Q${f1((sx+ex)/2)} ${f1(sy+30)} ${f1(lx)} ${f1(ly)}" style="fill:none;stroke:var(--rx-drug);stroke-width:1.6;stroke-dasharray:4 3"/>`;
      if(W[k]<0){
        /* blocking antibody: a Y shape that caps the receptor */
        s+=`<g transform="translate(${f1(lx)} ${f1(ly)})"><path d="M0 -4L0 10M0 -4L-9 -15M0 -4L9 -15" style="stroke:var(--pen-dark);stroke-width:4;stroke-linecap:round;fill:none"/></g>`;
        if(q>.95)s+=`<line x1="${x-24}" y1="${y0-6}" x2="${x+24}" y2="${y0-6}" style="stroke:var(--bad);stroke-width:3"/>`+kitLabel(x,y0-12,'blocked',{a:'m'});
      }else{
        s+=glyph(k,lx,ly,9);
        if(q>.95)s+=`<circle cx="${x}" cy="${y0+18}" r="17" style="fill:none;stroke:${R.col};stroke-width:1.5;opacity:.6"/>`+kitLabel(x,y0-8,'activated',{a:'m'});
      }
    });
    rsv.innerHTML=s;
  }
  function noteRx(){
    const W=want(),match=FR_AG.filter(A=>same(A.r,W));
    const on=KEYS.filter(k=>W[k]);
    let h=`<div class="kicker">${on.length?on.map(k=>(W[k]<0?'blocked ':'')+FR_RX[k].n).join(' + '):'No receptor selected'}</div>`;
    if(match.length)h+=`<h4>${match.map(A=>A.n).join(', ')}</h4><ul>${match.map(A=>`<li><b>${A.n}</b>: ${A.txt}</li>`).join('')}</ul>`;
    else{
      const sup=FR_AG.filter(A=>KEYS.every(k=>!W[k]||A.r[k]===W[k]));
      h+=`<h4>No exact match</h4><p>No agent in this guide acts on exactly this combination.${sup.length&&on.length?' Agents that include it:':''}</p>`;
      if(sup.length&&on.length)h+=`<ul>${sup.map(A=>`<li><b>${A.n}</b>: ${A.txt}</li>`).join('')}</ul>`;
    }
    if(on.length)h+=`<ul>${on.map(k=>`<li>${FR_RX[k].info}</li>`).join('')}</ul>`;
    rnote.innerHTML=h;
  }
  function updRx(){if(stopR)stopR();noteRx();stopR=animate(900,drawRx,()=>{stopR=null})}
  $$('[data-rx]',sec).forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.rx;sel[k]=sel[k]?0:1;b.setAttribute('aria-pressed',!!sel[k]);updRx()}));
  blk.addEventListener('change',updRx);
  const prevR=redraws.frontier;redraws.frontier=()=>{prevR&&prevR();drawRx(1)};
  noteRx();drawRx(1);
};
/* the citation for each row's readout, written out so the build can number it */
const FR_CITE={
  Wilding2021STEP1:'[[Wilding2021STEP1]]',Jastreboff2022SURMOUNT1:'[[Jastreboff2022SURMOUNT1]]',Jastreboff2026TRIUMPH1:'[[Jastreboff2026TRIUMPH1]]',
  Bellido2026TRIUMPH2:'[[Bellido2026TRIUMPH2]]',leRoux2026SYNCHRONIZE1:'[[leRoux2026SYNCHRONIZE1]]',Wharton2026SYNCHRONIZE2:'[[Wharton2026SYNCHRONIZE2]]',
  Gao2026GLORY2:'[[Gao2026GLORY2]]',Garvey2025REDEFINE1:'[[Garvey2025REDEFINE1]]',Davies2025REDEFINE2:'[[Davies2025REDEFINE2]]',Dahl2025Amycretin:'[[Dahl2025Amycretin]]',
  Jastreboff2025MariTide:'[[Jastreboff2025MariTide]]',Wharton2025STEPUP:'[[Wharton2025STEPUP]]',Lingvay2025STEPUPT2D:'[[Lingvay2025STEPUPT2D]]',
  Wharton2025ATTAIN1:'[[Wharton2025ATTAIN1]]',Horn2026ATTAIN2:'[[Horn2026ATTAIN2]]',Wharton2025OASIS4:'[[Wharton2025OASIS4]]',Knop2023OASIS1:'[[Knop2023OASIS1]]'
};
const FR_BIMA_TXT='<b>Bimagrumab plus semaglutide</b>: −17.8 kg with both, −14.2 kg with semaglutide 2.4 mg, −9.3 kg with bimagrumab, −3.3 kg on placebo at 48 weeks (phase 2). [[Heymsfield2026Bimagrumab]] <b>Bimagrumab alone</b>: fat mass −20.5% and lean mass +3.6% versus −0.5% and −0.8% on placebo, completers only. [[Heymsfield2021Bimagrumab]]';
