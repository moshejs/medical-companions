/* =============== 4.2 the DMT ladder =============== */
/* Rung contents per source. Nothing here invents a tier: each scheme only puts on a rung
   what that source says, and what it leaves unranked goes on the shelf below the ladder. */
const LA_SCH={
 aan:{nm:'AAN 2018',
  hi:{t:'Higher efficacy',s:['alemtuzumab · natalizumab','fingolimod · ocrelizumab','higher than rung 1, per AAN']},
  lo:{t:'Self-injectables',s:['interferon beta','glatiramer acetate','“previously approved” (AAN)']},
  sh:{t:'Not ranked in that sentence',s:['teriflunomide, fumarates; and','drugs approved after 2018']},
  cap:`AAN 2018: “current evidence supports higher efficacy of alemtuzumab, natalizumab, fingolimod, and ocrelizumab compared with previously approved self-injectable DMTs.” Cladribine, siponimod, ozanimod, ponesimod, ofatumumab and ublituximab were approved in the US after the guideline. [[RaeGrant2018,FDA2026Approvals]]`},
 ect:{nm:'ECTRIMS/EAN 2018',
  hi:{t:'More efficacious',s:['R14 (strong): offer “a more','efficacious drug” when activity','appears on interferon or GA']},
  lo:{t:'Interferon / glatiramer',s:['R2 (strong): offer them in CIS','with an abnormal MRI','R3: treat active RRMS early']},
  sh:{t:'Progressive MS (weak recs)',s:['R7: ocrelizumab or cladribine','for active SPMS · R8: PPMS']},
  cap:`ECTRIMS/EAN 2018 frames the step up as moving from interferon or glatiramer acetate to “a more efficacious drug” (R14, strong); the wording quoted here does not list which drugs count. Its progressive-MS recommendations are all weak. [[Montalban2018]]`},
 coc:{nm:'Cochrane 2024',
  hi:{t:'High certainty',s:['relapsing at 24 months, RR:','cladribine 0.53 · natalizumab','0.56 · alemtuzumab 0.57']},
  lo:{t:'Moderate reduction',s:['moderate certainty, RR:','glatiramer acetate 0.84','interferon beta-1a 0.84']},
  sh:{t:'Not quoted in this module',s:['other drugs: no estimate quoted;','data past 2 years insufficient']},
  cap:`The 2024 Cochrane network meta-analysis (50 trials, 36,541 people) rated the relapse reductions of natalizumab, cladribine and alemtuzumab high certainty, and those of glatiramer acetate and interferon beta-1a moderate. Over half of the trials were industry-sponsored. [[GonzalezLorenzo2024]]`},
 lab:{nm:'US labels',
  hi:{t:'After other drugs',s:['cladribine: after an alternate','drug · alemtuzumab: after','two or more drugs']},
  lo:{t:'Relapsing forms + CIS',s:['most US labels share this','indication, which includes','clinically isolated syndrome']},
  sh:{t:'EU: narrower for two drugs',s:['natalizumab, alemtuzumab: highly','active RRMS (EMA wording)']},
  cap:`This scheme is position in the sequence, not efficacy. Most US labels cover “relapsing forms of multiple sclerosis (MS), to include clinically isolated syndrome”; alemtuzumab “should generally be reserved for patients who have had an inadequate response to two or more drugs” and cladribine is “generally recommended” after an alternate drug. In the EU, natalizumab and alemtuzumab are restricted to highly active disease. [[AubagioLabel2026,LemtradaLabel2025,MavencladLabel2026,EMATysabri2026,EMALemtrada2020]]`}
};
/* the illustrative person's default events: two new MRI lesions within a year */
const LA_EV0=[ {y:4.3,k:'mri',s:1},{y:5.1,k:'mri',s:1} ];
const LA_KN={rel:'relapse',mri:'new MRI lesion',wor:'worsening on examination'};
const LA_STEPS=[
 {from:0,at:.05,k:'Step 1 · Start',t:'Choosing a first drug',
  txt:`Both 2018 guidelines start treatment for active relapsing MS. ECTRIMS/EAN R3 (strong): <q>Offer early treatment with DMDs to patients with active relapsing-remitting MS as defined by clinical relapses and/or MRI activity.</q> AAN Starting 9 (Level B): <q>Clinicians should offer DMTs to people with relapsing forms of MS with recent clinical relapses or MRI activity.</q> For CIS, ECTRIMS/EAN R2 offers interferon or glatiramer acetate when the MRI is abnormal; AAN Starting 7 prescribes DMT to people <q>who decide they want this therapy</q>, and Starting 8 allows yearly imaging for five years instead. For highly active MS, AAN Starting 14 names alemtuzumab, fingolimod or natalizumab. [[Montalban2018,RaeGrant2018]]`,
  pt:'The first choice depends on how active the MS is, the person\'s plans (for example pregnancy) and the risks each drug carries. The token starts on rung 1 in the escalation lane and on rung 2 in the early high-efficacy lane.',
  hook:'Both guidelines (2018) treat <b>active relapsing MS early</b>. CIS with typical MRI lesions is a treatment option, not an obligation.'},
 {from:.25,at:.33,k:'Step 2 · Breakthrough',t:'When to step up',
  txt:`AAN Switching 1 (Level B) defines breakthrough in people taking their DMT long enough for it to work: <q>one or more relapses, two or more unequivocally new MRI-detected lesions, or increased disability on examination, over a one-year period</q>. Here the person has a new lesion in year 4 and a second within a year, so the escalation lane steps up. ECTRIMS/EAN R14 (strong) offers <q>a more efficacious drug</q> after activity on interferon or glatiramer acetate, judged against a reference MRI taken <q>usually within six months of treatment onset</q> (R11). Add your own events with the buttons and watch the NEDA-3 lights. [[RaeGrant2018,Montalban2018]]`,
  pt:'If MS stays active on a medicine (new attacks, new spots on the scan, or more disability), guidelines say it is time to talk about a stronger one.',
  hook:'Breakthrough (AAN 2018): <b>≥1 relapse, ≥2 new MRI lesions, or worse on exam, within 1 year</b>. One new lesion alone is not enough.'},
 {from:.5,at:.58,k:'Step 3 · Strategy',t:'Escalate or start high?',
  txt:`<span class="ev early">Early evidence</span> Four observational studies favour starting high. Harding 2019: 5-year EDSS change 0.3 with early intensive therapy versus 1.2 with escalation. He 2020: mean EDSS at year 10 was 2.3 when high-efficacy therapy began within 2 years versus 3.5 when it began at 4–6 years. Brown 2019: 5-year risk of SPMS 7% versus 12%. Spelman 2021: HR 0.71 for confirmed worsening in Sweden's high-start strategy versus Denmark's. These are not randomised, and confounding by indication is possible. The randomised trials, DELIVER-MS and TREAT-MS, had published no results as of 20 October 2026. [[Harding2019,He2020,Brown2019,Spelman2021,NCT03535298,NCT03500328]]`,
  pt:'Large registries suggest that people who start a stronger medicine early do better years later. Because those studies only watched what happened, they cannot rule out that the groups differed from the start. Two randomised trials are meant to settle it.',
  hook:'Observational: Harding (EDSS change 0.3 vs 1.2 at 5 years), He (EDSS 2.3 vs 3.5 at year 10), Brown (SPMS 7% vs 12%), Spelman (HR 0.71). <b>No randomised result yet.</b>'},
 {from:.75,at:.85,k:'Step 4 · Later life',t:'De-escalation and stopping',
  txt:`After years without activity, stopping becomes a question. DISCOMS randomised 259 people aged 55 or older, with no relapse for 5 years and no new MRI lesion for 3 years: new disease activity over 2 years occurred in 12.2% of those who stopped versus 4.7% of those who continued (difference 7.5 points, 95% CI 0.6–15.0). Non-inferiority against the 8% margin could not be concluded, although the authors say stopping <q>might be a reasonable option</q>. AAN 2018 still allows a trial off therapy; ECTRIMS/EAN R18 favours continuing a stable, well-tolerated drug and R17 warns of rebound, <q>particularly with natalizumab</q>. [[Corboy2023,RaeGrant2018,Montalban2018]]`,
  pt:'Some older people who have been stable for many years ask whether they can stop. In the one randomised trial, more people who stopped had new activity, though most did not. The decision is shared, and a few drugs carry a risk of rebound when stopped.',
  hook:'DISCOMS: stopping after 55 without recent activity was <b>not shown non-inferior</b> (12.2% vs 4.7% new activity; margin 8%).'}
];
inits.ladder=()=>{
  const svg=$('#laSvg'),rg=$('#laT');
  let sch='aan',prevSch='aan',mix=1,fol='esc',ev=LA_EV0.slice(),climbP=null,climbDone=new Set();
  const Y=15;
  /* breakthrough times by the AAN rule: any 1 relapse, 2 new lesions or 1 worsening within one year */
  function brk(list){const s=list.slice().sort((a,b)=>a.y-b.y),out=[];
    s.forEach(e=>{const w=s.filter(f=>f.y<=e.y&&f.y>e.y-1);const r=w.filter(f=>f.k==='rel').length,m=w.filter(f=>f.k==='mri').length,d=w.filter(f=>f.k==='wor').length;
      if(r>=1||m>=2||d>=1){const why=r>=1?'a relapse':d>=1?'worsening on examination':'two new MRI lesions within one year';
        if(!out.length||e.y-out[out.length-1].y>=1)out.push({y:e.y,why})}});
    return out}
  const box=(x,y,w,h,st)=>`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="10" style="${st}"/>`;
  function evGlyph(k,x,y,o){
    if(k==='rel')return `<path d="M${f1(x-6)} ${f1(y+5)}L${f1(x)} ${f1(y-6)}L${f1(x+6)} ${f1(y+5)}z" style="fill:var(--attack);opacity:${f1(o)}"/>`;
    if(k==='wor')return `<path d="M${f1(x-6)} ${f1(y-5)}L${f1(x)} ${f1(y+6)}L${f1(x+6)} ${f1(y-5)}z" style="fill:var(--warn);opacity:${f1(o)}"/>`;
    return `<g style="opacity:${f1(o)}"><rect x="${f1(x-7)}" y="${f1(y-7)}" width="14" height="14" rx="3" class="mri"/>${lesion(x,y,3.6,Math.round(x),1)}</g>`}
  function draw(t){
    const N=vb(svg,'720 590','400 1180');
    const L=N?{BX:56,BW:288,TX:66,RL:46,RR:354,TK:18,cx:200,
              X0:24,X1:380,OY:590,hd:[16,602],hd2:[16,616],evY:634,aL:656,aS:106,aB:662,bL:704,bS:172,bB:710,bh:22,ax:742,
              OE:790}
            :{BX:52,BW:202,TX:62,RL:44,RR:262,TK:18,cx:153,
              X0:296,X1:700,OY:0,hd:[296,22],hd2:[296,40],evY:56,aL:76,aS:380,aB:82,bL:126,bS:446,bB:132,bh:24,ax:166,
              OE:206};
    const yr=Y*t,X=v=>L.X0+(L.X1-L.X0)*v/Y,S=LA_SCH[sch],Sp=LA_SCH[prevSch];
    const vis=ev.filter(e=>e.y<=yr+1e-6),bks=brk(ev),bkVis=bks.filter(b=>b.y<=yr+1e-6),tb=bks.length?bks[0].y:null;
    let s=`<defs><pattern id="laHatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="6" style="stroke:var(--good);stroke-width:2;opacity:.35"/></pattern>${marker('laArr','var(--attack)')}${marker('laArG','var(--muted)')}</defs>`;
    s+=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    /* ---------- ladder ---------- */
    const R2=[92,188],R1=[270,366];
    s+=`<text x="16" y="22" class="t-sm" style="fill:var(--rx)">RUNGS · ${S.nm.toUpperCase()}</text>`;
    s+=box(L.BX,34,L.BW,40,'fill:none;stroke:var(--muted);stroke-width:1.2;stroke-dasharray:4 4');
    s+=`<text x="${L.TX}" y="50" class="t-xs" style="fill:var(--ink)">Not a rung here: aHSCT</text><text x="${L.TX}" y="64" class="t-xs">specialist; debated: see 4.4</text>`;
    [L.RL,L.RR].forEach(x=>{s+=`<line x1="${x}" x2="${x}" y1="80" y2="372" style="stroke:var(--line);stroke-width:5;stroke-linecap:round"/><line x1="${x}" x2="${x}" y1="74" y2="80" style="stroke:var(--line);stroke-width:2;stroke-dasharray:2 2"/>`});
    // token rung: 0 = rung 1, 1 = rung 2 (fractional while climbing)
    let c=fol==='hi'?1:0;
    if(fol==='esc'&&tb!=null&&yr>=tb){c=climbP!=null&&Math.abs(climbP.tb-tb)<1e-6?climbP.p:(climbDone.has(tb)?1:ease(ramp(yr,tb,tb+.5)))}
    const on=c>.5?2:1;
    [[2,R2,'hi'],[1,R1,'lo']].forEach(([n,R,key])=>{const act=on===n;
      s+=box(L.BX,R[0],L.BW,R[1]-R[0],`fill:${n===2?'var(--rx-soft)':'var(--brand-soft)'};stroke:${act?(n===2?'var(--rx)':'var(--brand)'):'var(--line)'};stroke-width:${act?2.4:1.2}`);
      [[Sp,1-mix],[S,mix]].forEach(([sc,o])=>{if(o<.02)return;const r=sc[key];
        s+=`<g style="opacity:${f1(o)}"><text x="${L.TX}" y="${R[0]+22}" class="t-lbl" style="fill:${n===2?'var(--rx)':'var(--brand)'}">${r.t}</text>`;
        r.s.forEach((ln,i)=>{s+=`<text x="${L.TX}" y="${R[0]+42+i*16}" class="t-xs" style="fill:var(--ink)">${ln}</text>`});s+='</g>'});
      const cy=(R[0]+R[1])/2;
      s+=`<circle cx="${L.RL}" cy="${cy}" r="11" style="fill:${act?(n===2?'var(--rx)':'var(--brand)'):'var(--panel)'};stroke:${n===2?'var(--rx)':'var(--brand)'};stroke-width:2"/><text x="${L.RL}" y="${cy+4}" class="t-xs t-mid" style="font-weight:700;fill:${act?'var(--panel)':'var(--ink)'}">${n}</text>`});
    // shelf
    s+=box(L.BX,382,L.BW,52,'fill:var(--panel);stroke:var(--line);stroke-width:1.2;stroke-dasharray:3 3');
    [[Sp,1-mix],[S,mix]].forEach(([sc,o])=>{if(o<.02)return;
      s+=`<g style="opacity:${f1(o)}"><text x="${L.TX}" y="398" class="t-xs" style="fill:var(--ink);font-weight:700">${sc.sh.t}</text>`;
      sc.sh.s.forEach((ln,i)=>{s+=`<text x="${L.TX}" y="${412+i*13}" class="t-xs">${ln}</text>`});s+='</g>'});
    // climbing arrow and label between the rungs
    const recent=fol==='esc'&&tb!=null&&yr>=tb&&(c<1||yr-tb<1.2);
    if(recent){const o=c<1?1:1-ramp(yr-tb,.8,1.2);
      s+=`<g style="opacity:${f1(o)}"><line x1="${L.cx}" x2="${L.cx}" y1="258" y2="${f1(200)}" style="stroke:var(--attack);stroke-width:2" marker-end="url(#laArr)"/>`;
      s+=`<text x="${L.cx+10}" y="226" class="t-xs" style="fill:var(--attack);font-weight:700">breakthrough:</text><text x="${L.cx+10}" y="240" class="t-xs" style="fill:var(--attack)">step up</text></g>`}
    else if(fol==='hi'&&bkVis.length){s+=`<text x="${L.cx}" y="232" class="t-xs t-mid" style="fill:var(--muted)">already on rung 2</text>`}
    // later life: stop?
    const late=ease(ramp(t,.76,.84));
    const tyC=lerp((R1[0]+R1[1])/2,(R2[0]+R2[1])/2,c);
    if(late>0){s+=`<g style="opacity:${f1(late)}"><path d="M${L.TK} ${f1(tyC+14)} L${L.TK} 386" style="fill:none;stroke:var(--muted);stroke-width:1.6;stroke-dasharray:4 4" marker-end="url(#laArG)"/>`;
      s+=`<circle cx="${L.TK}" cy="400" r="9" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.6;stroke-dasharray:3 2"/><text x="${L.TK}" y="404" class="t-xs t-mid" style="fill:var(--ink)">?</text><text x="${L.TK}" y="424" class="t-xs t-mid" style="fill:var(--ink)">stop</text></g>`}
    // token
    s+=`<g transform="translate(${L.TK} ${f1(tyC)})"><circle r="13" style="fill:var(--orange);opacity:.22"/><circle r="8" style="fill:var(--orange)"/><circle cy="-2.5" r="2.6" style="fill:var(--panel)"/><path d="M-4 4.5 Q0 0 4 4.5" style="fill:var(--panel)"/></g>`;
    // NEDA-3 rail (the lane the token follows, past 12 months)
    const win=ev.filter(e=>e.y<=yr+1e-6&&e.y>yr-1),hasR=win.some(e=>e.k==='rel'),hasM=win.some(e=>e.k==='mri'),hasW=win.some(e=>e.k==='wor');
    s+=`<text x="16" y="458" class="t-sm" style="fill:var(--rx)">NEDA-3 · LAST 12 MONTHS</text>`;
    [['no relapse',hasR],['no new or enlarging T2 / Gd lesion',hasM],['no confirmed disability worsening',hasW]].forEach(([lb,bad],i)=>{const y=478+i*20;
      s+=`<circle cx="26" cy="${y-3.5}" r="6.5" style="fill:${bad?'var(--bad)':'var(--good)'}"/><text x="26" y="${y}" class="t-xs t-mid" style="fill:var(--panel);font-weight:700">${bad?'×':'✓'}</text><text x="40" y="${y}" class="t-xs" style="fill:${bad?'var(--bad)':'var(--ink)'}">${lb}</text>`});
    const neda=!(hasR||hasM||hasW);
    s+=`<text x="16" y="546" class="t-lbl" style="fill:${neda?'var(--good)':'var(--bad)'}">${neda?'NEDA-3 kept':'Evident disease activity'}</text><text x="16" y="562" class="t-xs">same events in both lanes · year ${Math.floor(yr)}</text>`;
    /* ---------- the two lanes ---------- */
    const OY=L.OY;
    s+=`<text x="${L.hd[0]}" y="${L.hd[1]}" class="t-sm" style="fill:var(--orange)">TWO STRATEGIES · YEARS 0–15${N?'':' · ILLUSTRATIVE'}</text>`;
    s+=`<text x="${L.hd2[0]}" y="${L.hd2[1]}" class="t-xs">${N?'illustrative person; events are examples, not data':'events (shared by both lanes; examples, not data)'}</text>`;
    const xp=X(yr);
    // lanes
    const lane=(ly,by,lbl,sub,sx,segs)=>{s+=`<text x="${L.X0}" y="${ly}" class="t-lbl">${lbl}</text><text x="${sx}" y="${ly}" class="t-xs">${sub}</text>`;
      s+=`<rect x="${L.X0}" y="${by}" width="${L.X1-L.X0}" height="${L.bh}" rx="5" style="fill:var(--panel);stroke:var(--line)"/>`;
      segs.forEach(g=>{const a=X(g.a),b=Math.min(X(g.b),xp);if(b<=a)return;
        s+=`<rect x="${f1(a)}" y="${by}" width="${f1(b-a)}" height="${L.bh}" rx="5" style="fill:${g.r===2?'var(--rx-soft)':'var(--brand-soft)'};stroke:${g.r===2?'var(--rx)':'var(--brand)'};stroke-width:1.4"/>`;
        const room=X(g.b)-a,txt=room>150&&g.long?g.long:room>44?('rung '+g.r):'';
        if(txt&&b-a>Math.min(room,txt.length*5.8+10))s+=`<text x="${f1(a+6)}" y="${by+L.bh/2+3.5}" class="t-xs" style="fill:${g.r===2?'var(--rx)':'var(--brand)'};font-weight:700">${txt}</text>`})};
    const segA=tb==null?[{a:0,b:Y,r:1,long:'rung 1 · interferon or glatiramer'}]:[{a:0,b:tb,r:1,long:'rung 1'},{a:tb,b:Y,r:2,long:'rung 2 · stepped up'}];
    lane(L.aL,L.aB,'Escalation','start on rung 1, step up at breakthrough',L.aS,segA);
    lane(L.bL,L.bB,'Early high-efficacy','start on rung 2',L.bS,[{a:0,b:Y,r:2,long:'rung 2 from the start'}]);
    // later-life zone
    if(late>0){const a=X(11.25);s+=`<rect x="${f1(a)}" y="${L.bB}" width="${f1(L.X1-a)}" height="${L.bh}" rx="5" style="fill:url(#laHatch);opacity:${f1(late)}"/><text x="${f1(a+5)}" y="${L.bB+L.bh/2+3.5}" class="t-xs" style="fill:var(--good);font-weight:700;opacity:${f1(late)}">later life</text>`}
    // breakthrough lines
    bkVis.forEach(b=>{s+=`<line x1="${f1(X(b.y))}" x2="${f1(X(b.y))}" y1="${L.evY+8}" y2="${L.bB+L.bh}" style="stroke:var(--attack);stroke-width:1.4;stroke-dasharray:3 3"/>`});
    // event markers (nudged apart when close)
    let lastX=-99;ev.slice().sort((a,b)=>a.y-b.y).forEach(e=>{let x=X(e.y);if(x-lastX<15)x=lastX+15;lastX=x;const o=e.y<=yr+1e-6?1:.18;s+=evGlyph(e.k,x,L.evY,o)});
    // axis and playhead
    s+=`<line x1="${L.X0}" x2="${L.X1}" y1="${L.ax}" y2="${L.ax}" class="axis"/>`;
    for(let v=0;v<=Y;v++){const x=X(v);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${L.ax}" y2="${L.ax+(v%3?3:6)}" class="axis"/>`;if(v%3===0)s+=`<text x="${f1(x)}" y="${L.ax+15}" class="t-xs t-mid">${v}</text>`}
    s+=`<text x="${L.X1}" y="${L.ax+27}" class="t-xs t-end">years</text>`;
    s+=`<line x1="${f1(xp)}" x2="${f1(xp)}" y1="${L.evY-10}" y2="${L.ax}" style="stroke:var(--orange);stroke-width:2"/>`;
    s+=`<text x="${f1(clamp(xp,L.X0+20,L.X1-72))}" y="${L.ax+27}" class="t-xs t-mid" style="fill:var(--orange);font-weight:700">year ${f1(yr)}</text>`;
    /* ---------- published observational results ---------- */
    const OE=L.OE,ph3=t>=.5;
    s+=`<text x="${N?16:L.X0}" y="${OE+8}" class="t-sm" style="fill:var(--warn)">WHAT OBSERVATIONAL STUDIES REPORT</text>`;
    if(!ph3)s+=`<text x="${N?16:L.X0}" y="${OE+22}" class="t-xs">(drawn in step 3)</text>`;
    const ro=i=>.14+.86*ease(ramp(t,.5+i*.025,.56+i*.025));
    const txt=(x,y,lines,o,first)=>{lines.forEach((ln,i)=>{s+=`<text x="${x}" y="${y+i*14}" class="t-xs" style="opacity:${f1(o)};${i===0&&first?'fill:var(--ink);font-weight:700':''}">${ln}</text>`})};
    const lineCol={e:'var(--orange)',h:'var(--rx)'};
    // row H: Harding 2019, EDSS change 0..1.5 over years 0..5
    {const o=ro(0),y0=N?OE+76:OE+90,y1=N?OE+16:OE+28,Ey=v=>y0+(y1-y0)*v/1.5,k=ease(ramp(t,.52,.6));
      s+=`<g style="opacity:${f1(o)}"><line x1="${L.X0}" x2="${f1(X(5))}" y1="${y0}" y2="${y0}" class="axis"/><line x1="${L.X0}" x2="${L.X0}" y1="${y0}" y2="${y1}" class="axis"/>`;
      s+=`<text x="${L.X0-4}" y="${y0+3}" class="t-xs t-end">0</text><text x="${L.X0-4}" y="${y1+3}" class="t-xs t-end">1.5</text>`;
      [['e',1.2],['h',.3]].forEach(([q,v])=>{const xe=X(5*k),ye=Ey(v*k);
        s+=`<line x1="${L.X0}" y1="${y0}" x2="${f1(xe)}" y2="${f1(ye)}" style="stroke:${lineCol[q]};stroke-width:2.4;stroke-dasharray:6 4"/>`;
        if(k>.98)s+=`<circle cx="${f1(X(5))}" cy="${f1(Ey(v))}" r="4.5" style="fill:${lineCol[q]}"/><text x="${f1(X(5)+7)}" y="${f1(Ey(v)+3.5)}" class="t-xs" style="fill:${lineCol[q]};font-weight:700">${v}</text>`});
      s+='</g>';
      txt(N?170:470,N?OE+22:OE+34,N?['Harding 2019 · Wales · 592 people','5-year EDSS change: 0.3 early','intensive vs 1.2 escalation','60% of escalators worsened first']
        :['Harding 2019 · Wales · 592 people','5-year EDSS change: 0.3 early intensive','vs 1.2 escalation (β −0.85)','60% of escalators worsened first','lines schematic, to the 5-year points'],o,1)}
    // row He: He 2020, timing windows and year-10 EDSS
    {const o=ro(1),T=N?OE+92:OE+104,base=N?OE+160:OE+170,k=ease(ramp(t,.55,.63));
      s+=`<g style="opacity:${f1(o)}"><rect x="${f1(X(0))}" y="${T}" width="${f1(X(2)-X(0))}" height="10" rx="3" style="fill:var(--rx)"/><text x="${f1(X(2)+4)}" y="${T+9}" class="t-xs" style="fill:var(--rx)">${N?'within 2 yrs':'high-efficacy within 2 yrs'}</text>`;
      s+=`<rect x="${f1(X(4))}" y="${T+16}" width="${f1(X(6)-X(4))}" height="10" rx="3" style="fill:var(--orange)"/><text x="${f1(X(6)+4)}" y="${T+25}" class="t-xs" style="fill:var(--orange)">at 4–6 yrs</text>`;
      const sc=50/4,bx=X(10);[[2.3,'var(--rx)',-14],[3.5,'var(--orange)',2]].forEach(([v,col,dx])=>{const h=v*sc*k;
        s+=`<rect x="${f1(bx+dx)}" y="${f1(base-h)}" width="12" height="${f1(h)}" rx="2" style="fill:${col}"/>`;
        if(k>.98)s+=`<text x="${f1(bx+dx+6)}" y="${f1(base-h-4)}" class="t-xs t-mid" style="fill:${col};font-weight:700">${v}</text>`});
      s+=`<line x1="${f1(bx-18)}" x2="${f1(bx+18)}" y1="${base}" y2="${base}" class="axis"/>`;
      s+=`<text x="${f1(bx+22)}" y="${base-20}" class="t-xs">mean EDSS</text><text x="${f1(bx+22)}" y="${base-6}" class="t-xs">at year 10</text></g>`;
      txt(L.X0,N?OE+140:OE+150,N?['He 2020 · MSBase + Sweden','466 matched people']:['He 2020 · MSBase + Sweden · 466 matched','EDSS 2.3 vs 3.5 at year 10'],o,1)}
    // row Brown: SPMS within 5 years
    {const o=ro(2),base=N?OE+240:OE+234,k=ease(ramp(t,.58,.66)),bx=X(5),sc=44/15;
      s+=`<g style="opacity:${f1(o)}">`;
      [[7,'var(--rx)',-14],[12,'var(--orange)',2]].forEach(([v,col,dx])=>{const h=v*sc*k;
        s+=`<rect x="${f1(bx+dx)}" y="${f1(base-h)}" width="12" height="${f1(h)}" rx="2" style="fill:${col}"/>`;
        if(k>.98)s+=`<text x="${f1(bx+dx+6)}" y="${f1(base-h-4)}" class="t-xs t-mid" style="fill:${col};font-weight:700">${v}%</text>`});
      s+=`<line x1="${f1(bx-18)}" x2="${f1(bx+18)}" y1="${base}" y2="${base}" class="axis"/></g>`;
      txt(N?172:470,N?OE+194:OE+192,N?['Brown 2019 · 1,555 matched','SPMS within 5 years:','7% initial HE vs 12% IFN/GA','escalating within 5 yrs: HR 0.76']
        :['Brown 2019 · JAMA · 1,555 matched','conversion to SPMS, 5-year risk:','7% initial HE vs 12% IFN/GA (HR 0.66)','escalating within 5 yrs: HR 0.76'],o,1)}
    // row RCTs: the randomised answers, still pending
    {const o=ro(3),y=N?OE+272:OE+262,q=(x,yy)=>`<circle cx="${f1(x)}" cy="${yy}" r="8" style="fill:var(--panel);stroke:var(--warn);stroke-width:1.6;stroke-dasharray:3 2"/><text x="${f1(x)}" y="${yy+4}" class="t-xs t-mid" style="fill:var(--warn);font-weight:700">?</text>`;
      s+=`<g style="opacity:${f1(o)}">${q(X(3),y)}${q(L.X0+8,y+34)}</g>`;
      txt(f1(X(3)+14),y+4,N?['DELIVER-MS: brain volume, month 36','no results; completion est. 2027']:['DELIVER-MS: brain volume at month 36','no results; primary completion est. 2027'],o,1);
      txt(L.X0+22,y+38,N?['TREAT-MS: completed July 2026,','no results posted (20 Oct 2026)']:['TREAT-MS: 900 randomised; completed July 2026,','no results posted as of 20 October 2026'],o,1)}
    // Spelman 2021: national strategies, no time anchor
    {const o=ro(4),y=N?OE+348:OE+344;
      txt(N?16:L.X0,y,N?['Spelman 2021: Sweden 34.5% vs Denmark','7.6% started high efficacy; less','24-week worsening (HR 0.71)']
        :['Spelman 2021: Sweden 34.5% vs Denmark 7.6% started high efficacy;','less 24-week confirmed worsening in Sweden (HR 0.71)'],o,1)}
    svg.innerHTML=s;
    const p=phaseOf(LA_STEPS,t);setSt(p);$('#laNote').innerHTML=noteHTML(LA_STEPS[p]);
    const cur=on===2?'rung 2':'rung 1',last=bkVis.length?bkVis[bkVis.length-1]:null;
    $('#laRead').innerHTML=`<span>Year <b>${Math.floor(yr)}</b></span><span>Token follows <b>${fol==='esc'?'escalation':'early high-efficacy'}</b>, on <b>${cur}</b></span>`
      +(last?`<span>Breakthrough at year <b>${f1(last.y)}</b>: ${last.why}${fol==='hi'?' (already on rung 2)':''}</span>`:'<span>No breakthrough yet</span>')
      +`<span>NEDA-3: <b>${neda?'kept':'evident activity ('+[hasR&&'relapse',hasM&&'MRI',hasW&&'worsening'].filter(Boolean).join(', ')+')'}</b></span>`;
  }
  const stop=playWire(rg,$('#laPlay'),draw,22000,'Replay','ladder');
  const setSt=stepWire($('#laSteps'),LA_STEPS,rg,draw,stop);
  const capSch=()=>{$('#laSch').innerHTML=LA_SCH[sch].cap};
  $$('[data-sch]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.sch;if(k===sch)return;prevSch=sch;sch=k;
    $$('[data-sch]').forEach(x=>x.setAttribute('aria-pressed',x===b));capSch();
    const fin=()=>{mix=1;prevSch=sch;draw(+rg.value)};mix=0;draw(+rg.value);animate(450,p=>{mix=p;draw(+rg.value)},fin);setTimeout(fin,700)}));
  $$('[data-fol]').forEach(b=>b.addEventListener('click',()=>{fol=b.dataset.fol;$$('[data-fol]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  /* adding an event: if it creates a new breakthrough at the playhead, animate the climb */
  function add(k){const yr=Y*(+rg.value),before=brk(ev).map(b=>b.y);ev.push({y:Math.max(.02,yr),k});
    const now=brk(ev),nb=now.length?now[0].y:null;
    if(fol==='esc'&&nb!=null&&!before.includes(nb)&&Math.abs(nb-Math.max(.02,yr))<1e-6&&!(before.length&&before[0]<nb)){
      const done=()=>{climbP=null;climbDone.add(nb);draw(+rg.value)};animate(900,p=>{if(!climbDone.has(nb)){climbP={tb:nb,p:ease(p)};draw(+rg.value)}},done);setTimeout(done,1100)}
    else draw(+rg.value)}
  $('#laRel').addEventListener('click',()=>add('rel'));
  $('#laMri').addEventListener('click',()=>add('mri'));
  $('#laWor').addEventListener('click',()=>add('wor'));
  $('#laClr').addEventListener('click',()=>{ev=LA_EV0.slice();climbDone.clear();climbP=null;draw(+rg.value)});
  capSch();draw(+rg.value);

  /* ---- DISCOMS: new disease activity over 2 years ---- */
  const ds=$('#laDc'),dr=$('#laDcT');
  const DC=[{l:'Continued DMT',v:4.7,col:'var(--rx)'},{l:'Stopped DMT',v:12.2,col:'var(--attack)'}];
  function grid(x0,y0,cell,n,col,id){let g='';const full=Math.floor(n),fr=n-full;
    for(let i=0;i<100;i++){const cx=x0+(i%10)*cell+cell/2,cy=y0+Math.floor(i/10)*cell+cell/2,r=cell*.36;
      g+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r)}" style="fill:${i<full?col:'var(--panel-2)'};stroke:${i<full?col:'var(--line)'};stroke-width:1"/>`;
      if(i===full&&fr>.01)g+=`<clipPath id="${id}"><rect x="${f1(cx-r)}" y="${f1(cy-r)}" width="${f1(2*r*fr)}" height="${f1(2*r)}"/></clipPath><circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r)}" clip-path="url(#${id})" style="fill:${col}"/>`}
    return g}
  function drawD(t){
    const N=vb(ds,'720 300','400 540');
    const L=N?{G:[24,216],GY:68,cell:16,CX0:30,CX1:370,CY:376,CT:300,VY:420}:{G:[16,196],GY:72,cell:15,CX0:410,CX1:690,CY:150,CT:72,VY:196};
    const mo=24*t,k=ramp(t,0,.82);
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    s+=`<text x="16" y="24" class="t-sm" style="fill:var(--rx)">${N?'DISCOMS · NEW ACTIVITY IN 2 YEARS':'DISCOMS · 259 PEOPLE AGED 55+ · NEW DISEASE ACTIVITY OVER 2 YEARS'}</text>`;
    s+=`<text x="16" y="40" class="t-xs">${N?'per 100 people in each arm':'each grid is 100 people; filled = new disease activity'}</text>`;
    DC.forEach((d,i)=>{const x=L.G[i],n=d.v*k,gw=L.cell*10;
      s+=`<text x="${x}" y="${L.GY-6}" class="t-lbl" style="fill:${d.col}">${d.l}</text>`;
      s+=grid(x,L.GY,L.cell,n,d.col,'laDcC'+i);
      s+=`<text x="${x}" y="${L.GY+gw+20}" class="t-big" style="fill:${d.col}">${f1(n)} in 100</text>`});
    s+=`<text x="${L.G[0]}" y="${L.GY+L.cell*10+40}" class="t-xs">month ${Math.round(mo)} of 24${k<1?' · schematic filling':' · published 2-year values'}</text>`;
    // difference and confidence interval against the margin
    const o=ease(ramp(t,.84,.98)),P=v=>L.CX0+(L.CX1-L.CX0)*v/16;
    s+=`<g style="opacity:${f1(.15+.85*o)}">`;
    s+=`<text x="${L.CX0}" y="${L.CT}" class="t-sm" style="fill:var(--ink)">${N?'DIFFERENCE, STOPPED − CONTINUED':'DIFFERENCE, STOPPED − CONTINUED'}</text><text x="${L.CX0}" y="${L.CT+14}" class="t-xs">percentage points, with 95% CI</text>`;
    s+=`<line x1="${L.CX0}" x2="${L.CX1}" y1="${L.CY}" y2="${L.CY}" class="axis"/>`;
    [0,4,8,12,16].forEach(v=>{s+=`<line x1="${f1(P(v))}" x2="${f1(P(v))}" y1="${L.CY}" y2="${L.CY+5}" class="axis"/><text x="${f1(P(v))}" y="${L.CY+17}" class="t-xs t-mid">${v}</text>`});
    s+=`<line x1="${f1(P(8))}" x2="${f1(P(8))}" y1="${L.CY-44}" y2="${L.CY+2}" style="stroke:var(--bad);stroke-width:1.6;stroke-dasharray:4 3"/><text x="${f1(P(8))}" y="${L.CY-49}" class="t-xs t-mid" style="fill:var(--bad)">margin 8</text>`;
    const cw=ease(ramp(t,.88,1));
    s+=`<line x1="${f1(P(7.5-(7.5-.6)*cw))}" x2="${f1(P(7.5+(15-7.5)*cw))}" y1="${L.CY-14}" y2="${L.CY-14}" style="stroke:var(--ink);stroke-width:2.2"/>`;
    if(cw>.98)s+=`<line x1="${f1(P(.6))}" x2="${f1(P(.6))}" y1="${L.CY-19}" y2="${L.CY-9}" style="stroke:var(--ink);stroke-width:2"/><line x1="${f1(P(15))}" x2="${f1(P(15))}" y1="${L.CY-19}" y2="${L.CY-9}" style="stroke:var(--ink);stroke-width:2"/>`;
    s+=`<circle cx="${f1(P(7.5))}" cy="${L.CY-14}" r="5" style="fill:var(--attack)"/><text x="${f1(P(7.5))}" y="${L.CY-24}" class="t-xs t-mid" style="fill:var(--attack);font-weight:700">7.5</text>`;
    if(cw>.98)s+=`<text x="${f1(P(.6))}" y="${L.CY+30}" class="t-xs t-mid">0.6</text><text x="${f1(P(15))}" y="${L.CY+30}" class="t-xs t-mid">15.0</text>`;
    const V=N?['The upper limit, 15.0, lies above the','8-point margin: non-inferiority of','stopping could not be concluded.']:['Upper limit 15.0 is above the 8-point margin,','so non-inferiority of stopping could not be','concluded. Authors: stopping “might be a','reasonable option” in stable people over 55.'];
    V.forEach((ln,i)=>{s+=`<text x="${L.CX0}" y="${L.VY+i*14}" class="t-xs" style="fill:${i<2?'var(--bad)':'var(--ink)'}">${ln}</text>`});
    if(N)['Authors: stopping “might be a reasonable','option” in stable people over 55.'].forEach((ln,i)=>{s+=`<text x="${L.CX0}" y="${L.VY+50+i*14}" class="t-xs" style="fill:var(--ink)">${ln}</text>`});
    s+='</g>';
    s+=`<text x="16" y="${N?526:290}" class="t-xs">${N?'enrolled: 55+, no relapse 5 yrs, no new lesion 3 yrs':'enrolled: age 55 or older · no relapse for 5 years · no new MRI lesion for 3 years'}</text>`;
    ds.innerHTML=s;
    $('#laDcNote').innerHTML=noteHTML({k:'DISCOMS · Corboy 2023',t:k<1?`Month ${Math.round(mo)}: activity accumulating`:'Two years: 12.2% versus 4.7%',
      txt:`New disease activity over 2 years occurred in 12.2% of those who stopped and 4.7% of those who continued. The difference, 7.5 percentage points (95% CI 0.6–15.0), could not be shown to lie within the 8% non-inferiority margin. Most people in both arms had no new activity. [[Corboy2023]]`,
      pt:'About 12 in 100 people who stopped had new activity in two years, against about 5 in 100 who kept going. The trial could not show that stopping is as good as continuing.',
      hook:'Non-inferiority fails when the <b>upper confidence limit crosses the margin</b>, even if the point estimate (7.5) sits just under it.'});
  }
  playWire(dr,$('#laDcPlay'),drawD,9000,'Replay','ladder');drawD(+dr.value);
};
