/* =============== 3.2 The treatment ladder =============== */
/* Rungs bottom to top. lv = level on the ladder; rescue is a side lane, goal sits above the top rung. */
const LA_RUNGS=[
 {t:'Pyridostigmine',s:'symptom relief, dose by dose'},
 {t:'Corticosteroids',s:'low and slow, or high and early'},
 {t:'Steroid-sparing drug',s:'azathioprine, mycophenolate, methotrexate …'},
 {t:'Thymectomy',s:'removing the thymus'},
 {t:'Rituximab',s:'B-cell depletion'},
 {t:'Complement &amp; FcRn drugs',s:'eculizumab, efgartigimod and others'}
];
const LA_STEPS=[
 {from:0,at:.04,k:'Rung 1 · Symptoms',t:'A symptom tablet first',lv:0,
  txt:'The international consensus says pyridostigmine should be part of initial treatment in most patients, with the dose adjusted to symptoms. If treatment goals are not met after an adequate trial, corticosteroids or immunosuppressants follow. In the Dutch-Belgian registry 93% started with it. [[Sanders2016,RemijnNelissen2026c]]',
  pt:'The first tablet treats the symptom, not the cause. It helps the signal cross the junction for a few hours.',
  hook:'Pyridostigmine is <b>symptomatic</b>. Immunotherapy is the next rung when goals are not met.'},
 {from:.13,at:.17,k:'Rung 2 · Immunotherapy',t:'Steroids and the early dip',lv:1,
  txt:'Steroids help most patients: the Nordic guidance says about 75% respond within 2 to 4 weeks. High starting doses can cause a transient worsening, reported in 21% to 48% of patients in older series, so many schedules start low and rise slowly, or start with IVIG or plasma exchange. The Nordic guidance uses early high doses (0.75–1 mg/kg) in moderate to severe MG and a low, rising start in mild disease. Once goals are reached, the dose is tapered gradually. [[Gilhus2024,SchneiderGold2005,Seybold1974,Sanders2016]]',
  pt:'Steroids calm the immune attack within weeks. In some people they make things a little worse first, so doctors often start low and go slowly.',
  hook:'Early steroid worsening: <b>21–48%</b> in older series; newer studies counted it within 2 weeks (26%) or 4 weeks (42%) of the start. [[SchneiderGold2005,Bae2006,Kanai2019]]'},
 {from:.26,at:.3,k:'Rung 3 · Sparing',t:'Steroid-sparing, in months',lv:2,
  txt:'Non-steroidal immunosuppressants are used alone if steroids are contraindicated or refused, from the start when steroid risk is high, or later for side effects, an inadequate response or relapse on tapering. Azathioprine has expert consensus and some RCT support as first-line; its first response came after 4 to 10 months. Mycophenolate trials were negative at 12 and 36 weeks, with benefit appearing after about 6 months in a series. The Nordic guidance gives 1 to 6 months for these drugs, sometimes more than a year for full effect. [[Sanders2016,Witte1984,MuscleStudyGroup2008,Sanders2008,Hehir2010,Gilhus2024]]',
  pt:'These drugs let the steroid dose come down. They are slow: months, not days.',
  hook:'Azathioprine: <b>4–10 months</b> to first response (Witte 1984); at 3 years in Palace 1998, steroid dose median 0 vs 40 mg alternate days. [[Witte1984,Palace1998]]'},
 {from:.38,at:.42,k:'Rung 4 · Surgery',t:'Thymectomy, for some',lv:3,
  txt:'MGTX randomised 126 people aged 18 to 65 with non-thymomatous AChR+ generalized MG: thymectomy lowered QMG and prednisone over 3 years, and at 5 years 88% against 58% were in minimal manifestation status. The 2020 update says it should be considered early at ages 18 to 50 and strongly considered at any age after failed or intolerable immunotherapy. The age line is debated: MGTX enrolled people up to 65, and the 18 to 50 framing follows a post hoc analysis that found no significant benefit at 50 or over. The 2016 consensus says that, with rare exceptions, a thymoma is removed whatever the MG. [[Wolfe2016,Wolfe2019,Narayanaswami2021,Sanders2016]]',
  pt:'For some people with the receptor antibody, removing the thymus means milder disease and less medicine over the following years.',
  hook:'Thymectomy: <b>AChR+ generalized, non-thymomatous</b>; MGTX enrolled 18–65, the 2020 consensus frames it for 18–50. No indication in MuSK MG. [[Wolfe2016,Narayanaswami2021]]'},
 {from:.5,at:.54,k:'Side lane · Rescue',t:'IVIG or plasma exchange',lv:'r',
  txt:'At any rung, a flare can call for rescue. The consensus uses short-term IVIG or plasma exchange for breathing or swallowing problems, before surgery with marked bulbar weakness, or when a fast response is needed, and calls them probably equally effective in severe generalized MG; it adds that expert consensus suggests plasma exchange is more effective and quicker in crisis. The trial data are less clear: in Barth 2011, 69% improved on IVIG and 65% on plasma exchange by day 14, with no significant difference in QMG change. Without other immunotherapy, plasma exchange helps only for a few weeks. Difficulty breathing or swallowing is an emergency. [[Sanders2016,Barth2011,Wiendl2023]]',
  pt:'Rescue treatments work within days to two weeks. They bridge a bad patch; they do not replace the ladder.',
  hook:'IVIG and plasma exchange are mainly short-term <b>rescue</b> (days). Maintenance IVIG "can be considered" in refractory MG, but a 2025 trial missed its primary endpoint. In MuSK MG plasma exchange improved 93% and IVIG 61%. [[Sanders2016,Bril2025,Guptill2011]]'},
 {from:.62,at:.66,k:'Rung 5 · B cells',t:'Rituximab',lv:4,
  txt:'The 2020 update says to consider rituximab early in MuSK MG after an unsatisfactory response to initial immunotherapy, and calls its effect in refractory AChR+ MG uncertain. In AChR+ MG the trials split: BeatMG in established disease met its futility criterion (60% vs 56%), while RINOMAX in new-onset disease gave minimal manifestations in 71% against 29% at 16 weeks. ABN 2025 now supports early rituximab within 1 year of generalized onset. [[Narayanaswami2021,Nowak2022,Piehl2022,Jacob2025]]',
  pt:'Rituximab removes the B cells that make antibodies. In observational studies it seemed to work especially well when the antibody is against MuSK.',
  hook:'Rituximab: <b>MuSK MG</b> 58% vs 16% favourable outcome; AChR+ results depend on timing (RINOMAX positive, BeatMG futile). [[Hehir2017,Piehl2022,Nowak2022]]'},
 {from:.72,at:.76,k:'Rung 6 · Biologics',t:'Complement and FcRn',lv:5,
  txt:'C5 complement inhibitors stop the membrane attack complex; FcRn blockers lower IgG, including the pathogenic antibodies. Guidance disagrees on when they come in: the 2020 update reserves eculizumab for severe, refractory AChR+ MG after other immunotherapies fail, while the German guideline brings complement and FcRn inhibitors in for highly active AChR+ disease, and the Nordic guidance treats them as second-line for severe, difficult-to-treat MG. Switch the guidance buttons to see each placement. [[Narayanaswami2021,Wiendl2023,Gilhus2024]]',
  pt:'The newest drugs either block the complement attack or wash out antibodies faster. Guidelines differ on how early to use them.',
  hook:'The 2020 update and the C5 labels call for <b>meningococcal vaccination</b> first (boxed warning). No FcRn label requires a meningococcal vaccine. [[Narayanaswami2021,FDASoliris2026,FDAVyvgart2026]]'},
 {from:.83,at:.88,k:'Goal · Then down',t:'Goal, then a slow taper',lv:'g',
  txt:'The consensus goal is minimal manifestation status or better (no symptoms or functional limits, though some weakness on examination) with no more than grade 1 side effects. Once it has held for 6 months to 2 years, immunosuppression is tapered slowly to the minimal effective dose, adjusting no more often than every 3 to 6 months. Relapse is more likely after a rapid taper or with persisting symptoms. [[Sanders2016]]',
  pt:'The aim is a normal day with few or no symptoms and few side effects. Then the doses come down, slowly.',
  hook:'Goal (2016 consensus): <b>MMS or better with ≤ grade 1 side effects</b>. Japanese guidance adds prednisolone ≤ 5 mg/day. [[Sanders2016,Murai2018]]'}
];
/* per antibody group: rung status (y applies, s conditional, n not indicated) and a short reason */
const LA_G={
 achr:{n:'AChR antibody',r:[['y','first, for symptoms'],['y','low and slow, or high and early'],['y','azathioprine first-line in many guides'],['y','non-thymomatous; early at 18–50 (2020)'],['s','new-onset: RINOMAX + · BeatMG futile'],['y','labelled for AChR+ generalized MG']],
  rs:'IVIG ≈ plasma exchange',
  nt:'AChR antibody MG is the group most trials enrolled, so every rung has direct evidence. [[Sanders2016,Narayanaswami2021]]'},
 musk:{n:'MuSK antibody',r:[['s','often poor response, more side effects'],['y','steroids still used'],['y','steroid-sparing drugs still used'],['n','no indication (2016, 2020)'],['y','early: 58% vs 16% good outcome'],['s','several FcRn labels cover MuSK+; C5 do not']],
  rs:'plasma exchange 93% vs IVIG 61%',
  nt:'In MuSK MG, cholinesterase inhibitors often help less and cause more side effects; thymectomy has no indication; rituximab is considered early; plasma exchange did better than IVIG; rozanolixizumab, nipocalimab and the B-cell drug inebilizumab are labelled for MuSK+ disease, the US efgartigimod IV label has covered all adults with generalized MG since May 2026, and the C5 inhibitors are labelled for AChR+ only. [[Sanders2016,Narayanaswami2021,Hehir2017,Guptill2011,FDARystiggo2026,FDAImaavy2026,AmgenUplizna2025,FDAVyvgart2026,FDASoliris2026]]'},
 sero:{n:'Seronegative',r:[['y','first, for symptoms'],['y','as in AChR MG'],['y','as in AChR MG'],['s','considered if immunosuppression fails'],['s','German: an option if highly active'],['s','efgartigimod IV: all adult gMG (FDA 2026)']],
  rs:'as for generalized MG',
  nt:'In seronegative generalized MG thymectomy "may be considered" if immunosuppression fails (in children, congenital myasthenic syndromes are excluded first). The German guideline lists rituximab as a possible first choice in some highly active antibody-negative disease (the excerpt read for this guide was ambiguous on exactly which groups), and on 8 May 2026 the US label of efgartigimod IV was broadened to all adults with generalized MG. [[Sanders2016,Narayanaswami2021,Wiendl2023,FDAVyvgart2026,FDADrugsFDA2026]]'},
 ocular:{n:'Ocular only',r:[['y','first; may be enough in children'],['y','first immunosuppressant; low dose'],['s','if steroids fail or are not tolerated'],['s','AChR+, if immunosuppression fails'],['n','trials were in generalized MG'],['n','labels are for generalized MG']],
  rs:'IVIG less certain in ocular MG',
  nt:'For ocular MG the 2020 update starts steroids when eye symptoms that have not responded to cholinesterase inhibitors are limiting, adds a steroid-sparing drug if steroids fail, and allows thymectomy for AChR+ patients when immunosuppression is declined or ineffective. The biologic labels are for generalized MG. [[Narayanaswami2021,Sanders2016]]'}
};
/* guidance editions: where biologics come in (lv on the ladder, null = no placement stated) */
const LA_ED={
 c16:{n:'International consensus 2016',lv:null,bioS:'no statement yet',
  goal:['GOAL · minimal manifestation status or','better, with ≤ grade 1 side effects'],
  f:[['Biologics','No statement: it predates the first MG approval (eculizumab, FDA, October 2017).'],['Rituximab','No statement; rituximab statements were added in the 2020 update.'],['Steroids','Waiting several days for IVIG or plasma exchange to work before steroids may be appropriate.'],['Where it differs','Sets the goal and the refractory definition that later guidance argues with.']],
  cite:'[[Sanders2016,FDADrugsFDA2026,Narayanaswami2021]]'},
 c20:{n:'International update 2020',lv:5,bioS:'after other immunotherapies fail',
  goal:['GOAL · as set in 2016: MMS or better,','with ≤ grade 1 side effects'],
  f:[['Biologics','Eculizumab in severe, refractory AChR+ generalized MG, generally after other immunotherapies fail; meningococcal vaccine first. Written before any FcRn approval.'],['Rituximab','Early in MuSK MG after a poor initial response; uncertain in refractory AChR+ MG.'],['Also added','Early thymectomy at 18–50 (AChR+); methotrexate as a fallback steroid-sparing drug.'],['Where it differs','Waits for refractory disease, where German guidance uses activity.']],
  cite:'[[Narayanaswami2021,FDADrugsFDA2026]]'},
 de:{n:'German guideline 2023',lv:2.5,bioS:'in highly active disease',
  goal:['GOAL · rapid achievement of complete','disease control'],
  f:[['Biologics','In highly active AChR+ disease: eculizumab or ravulizumab, or the FcRn blocker efgartigimod. "Highly active" is set by disease activity, not by counting failed drugs.'],['Rituximab','Recommended in MuSK+ disease; must be used if highly active or refractory.'],['Steroids','Steroids plus azathioprine are basic therapy; it advises against long-term steroids alone.'],['Where it differs','Brings biologics in earlier than the 2020 consensus. A 2025 update exists but could not be read.']],
  cite:'[[Wiendl2023,Narayanaswami2021]]'},
 nordic:{n:'Nordic guidance 2024',lv:2.6,bioS:'second line, severe disease',
  goal:['GOAL · no number: ambitious goals','agreed by patient and doctor'],
  f:[['Biologics','Second-line options for severe, difficult-to-treat MG, depending on local approval and cost.'],['Rituximab','An alternative first-line option to steroids plus azathioprine.'],['Steroids','Lowest possible dose with azathioprine first; early high dose in moderate to severe MG.'],['Where it differs','Covers AChR+ generalized MG only, so ocular MG is left out; it notes many centres prefer alternate-day steroids, without evidence.']],
  cite:'[[Gilhus2024]]'},
 abn:{n:'ABN guideline 2025',lv:3.6,bioS:'if conventional therapy fails',
  goal:['GOAL · not stated in the abstract','read for this guide'],
  f:[['Biologics','A role "being slowly established", especially when conventional therapy has not worked.'],['Rituximab','Early, within 1 year of generalized onset, now supported by trial evidence.'],['Steroids','Daily rather than alternate-day steroids, a change from 2015.'],['Where it differs','Rituximab early, where 2020 holds it for MuSK or refractory disease. Abstract only.']],
  cite:'[[Jacob2025,Narayanaswami2021]]'},
 jp:{n:'Japanese guideline 2022',lv:null,bioS:'included; placement not in abstract',
  goal:['GOAL · MM or better on prednisolone','≤ 5 mg/day, as fast as possible'],
  f:[['Biologics','Molecular-targeted drugs are included and refractory MG is defined; the English abstract does not say where they sit.'],['Steroids','Does not recommend high-dose oral escalation; minimise oral steroids.'],['Also','Early calcineurin inhibitors and early fast-acting treatment (IV methylprednisolone, IVIG, plasma exchange).'],['Where it differs','Adds a steroid ceiling to the goal; about 35% had not reached it after 3 years.']],
  cite:'[[Murai2024,Murai2018,Imai2020]]'}
};
inits.ladder=()=>{
  const svg=$('#laSvg'),rg=$('#laT');
  let G='achr',E='c20',edY=LA_ED.c20.lv,stopEd=null;
  const wrapT=(txt,n)=>{const ws=String(txt).split(' '),o=[];let l='';ws.forEach(w=>{if(l&&(l+' '+w).length>n){o.push(l);l=w}else l=l?l+' '+w:w});if(l)o.push(l);return o};
  /* token level over t; skipped rungs keep the token where it was */
  function tokenAt(t){
    const st=LA_RUNGS.map((r,i)=>LA_G[G].r[i][0]);
    let lv=0,side=0,last=0;
    for(let k=0;k<LA_STEPS.length;k++){const S=LA_STEPS[k],nx=k+1<LA_STEPS.length?LA_STEPS[k+1].from:1.01;if(t<S.from)break;
      if(S.lv==='r'){side=ease(ramp(t,S.from,S.from+.04))*(1-ease(ramp(t,nx-.035,nx)));lv=last;continue}
      side=0;
      if(S.lv==='g'){const up=ease(ramp(t,S.from,S.from+.045)),dn=ease(ramp(t,.93,.99));lv=lerp(lerp(last,6,up),2,dn);continue}
      const target=st[S.lv]==='n'?last:S.lv;lv=lerp(last,target,ease(ramp(t,S.from,S.from+.05)));last=target}
    const dip=G==='ocular'?0:.32*bump(t,.17,.235);   // the early steroid worsening
    return{lv:lv-dip,side,dip}}
  function draw(t){
    const N=vb(svg,'720 540','400 900');
    const L=N?{X0:22,BX:38,BW:290,X1:342,LX:356,LW:34,RY0:452,P:58,BH:42,HY:22,PX:14,PY:504,PW:372,CH:62,TOPY:32}
             :{X0:34,BX:52,BW:276,X1:342,LX:358,LW:44,RY0:478,P:62,BH:44,HY:28,PX:430,PY:22,PW:278,CH:44,TOPY:38};
    const RY=lv=>L.RY0-lv*L.P,g=LA_G[G],ed=LA_ED[E];
    let s=`<defs>${marker('laA','var(--drug)')}</defs><rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    const p=phaseOf(LA_STEPS,t);
    // reached: which rung steps have started
    const reached=i=>{const k=LA_STEPS.findIndex(S=>S.lv===i);return ease(ramp(t,LA_STEPS[k].from,LA_STEPS[k].from+.05))};
    s+=`<text x="${L.BX}" y="${L.HY}" class="t-sm" style="fill:var(--drug)">ESCALATION ↑ · ${g.n.toUpperCase()}</text>`;
    // rails
    const topY=RY(6)-L.BH/2-4,botY=RY(0)+L.BH/2+6;
    [L.X0,L.X1].forEach(x=>{s+=`<line x1="${x}" x2="${x}" y1="${botY}" y2="${f1(RY(5)-L.BH/2)}" style="stroke:var(--line);stroke-width:5;stroke-linecap:round"/>`});
    // goal box
    const go=ease(ramp(t,.84,.89));
    s+=`<rect x="${L.BX}" y="${f1(RY(6)-L.BH/2)}" width="${L.BW}" height="${L.BH}" rx="11" style="fill:${go>.5?'var(--good-soft)':'var(--panel)'};stroke:var(--good);stroke-width:${f1(1.2+1.2*go)};stroke-dasharray:${go>.5?'none':'5 4'}"/>`;
    s+=`<path d="M${L.X0} ${f1(RY(6)+L.BH/2)}V${f1(RY(6)-L.BH/2-4)}l14 6l-14 6" style="fill:var(--good);stroke:var(--good);stroke-width:2;stroke-linejoin:round"/>`;
    ed.goal.forEach((l,k)=>{s+=`<text x="${L.BX+12}" y="${f1(RY(6)-4+k*14)}" class="t-xs" style="fill:${k?'var(--ink)':'var(--good)'};font-weight:${k?500:700}">${l}</text>`});
    // rungs
    LA_RUNGS.forEach((r,i)=>{const cy=RY(i),o=reached(i),stt=g.r[i][0],no=stt==='n',sm=stt==='s';
      const on=o>.5&&!no;
      s+=`<g class="clk" data-rung="${i}" style="opacity:${no?.55:1}">`;
      s+=`<rect x="${L.BX}" y="${f1(cy-L.BH/2)}" width="${L.BW}" height="${L.BH}" rx="11" style="fill:${on?'var(--drug-soft)':'var(--panel)'};stroke:${on?'var(--drug)':'var(--line)'};stroke-width:${f1(1+1.3*(on?o:0))}${sm?';stroke-dasharray:6 4':''}"/>`;
      s+=`<text x="${L.BX+12}" y="${f1(cy-4)}" class="t-lbl" style="fill:${on?'var(--drug)':no?'var(--muted)':'var(--ink)'}">${r.t}</text>`;
      if(sm)s+=`<text x="${L.BX+L.BW-10}" y="${f1(cy-4)}" class="t-xs t-end" style="fill:var(--warn)">conditional</text>`;
      if(no)s+=`<text x="${L.BX+L.BW-10}" y="${f1(cy-4)}" class="t-xs t-end" style="fill:var(--bad)">not indicated</text>`;
      let sub=g.r[i][1],sc='';
      if(i===1&&t>.165&&t<.255&&G!=='ocular'){sub='early worsening in 21–48% (older series)';sc=' style="fill:var(--bad);font-weight:700"'}
      if(i===2&&t>.29&&t<.37){sub='months: azathioprine 4–10, mycophenolate ~6';sc=' style="fill:var(--warn);font-weight:700"'}
      s+=`<text x="${L.BX+12}" y="${f1(cy+13)}" class="t-xs"${sc}>${sub}</text>`;
      if(no)s+=`<line x1="${L.BX+8}" x2="${L.BX+L.BW-8}" y1="${f1(cy)}" y2="${f1(cy)}" style="stroke:var(--bad);stroke-width:1.6;opacity:.8"/>`;
      s+=`<circle cx="${L.X0}" cy="${cy}" r="12" style="fill:${on?'var(--drug)':'var(--panel)'};stroke:${on?'var(--drug)':'var(--line)'};stroke-width:2"/>`;
      s+=`<text x="${L.X0}" y="${cy+4}" class="t-xs t-mid" style="fill:${on?'var(--panel)':'var(--muted)'};font-weight:700">${i+1}</text>`;
      s+='</g>'});
    // rescue lane
    const ro=ease(ramp(t,.5,.54))*(1-ease(ramp(t,.6,.64)));
    const lt=RY(5)-L.BH/2,lb=RY(0)+L.BH/2;
    s+=`<g class="clk" data-rung="r"><rect x="${L.LX}" y="${f1(lt)}" width="${L.LW}" height="${f1(lb-lt)}" rx="${L.LW/2}" style="fill:${ro>.3?'var(--ab-soft)':'var(--panel)'};stroke:var(--ab);stroke-width:${f1(1.2+1.2*ro)};stroke-dasharray:${ro>.3?'none':'4 4'}"/>`;
    const lcx=L.LX+L.LW/2,lcy=(lt+lb)/2;
    s+=`<text transform="rotate(-90 ${f1(L.LX+L.LW-(N?5:8))} ${f1(lcy)})" x="${f1(L.LX+L.LW-(N?5:8))}" y="${f1(lcy)}" class="t-xs t-mid" style="fill:var(--ab);font-weight:700">RESCUE AT ANY RUNG · IVIG OR PLASMA EXCHANGE</text></g>`;
    // biologics entry marker for the chosen edition
    const bioNo=g.r[5][0]==='n';
    if(edY!=null&&!bioNo){const y=RY(edY),bx=L.LX+L.LW+2,mw=N?7:12;
      s+=`<path d="M${f1(bx+mw)} ${f1(y-6)}V${f1(y+6)}L${f1(bx)} ${f1(y)}Z" style="fill:var(--drug)"/>`;
      if(!N)s+=`<line x1="${f1(bx+mw)}" x2="${L.PX-4}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:var(--drug);stroke-width:1.2;stroke-dasharray:3 3"/>`}
    // token
    const tk=tokenAt(t),ty=RY(tk.lv),tx=lerp(L.X1,L.LX+(N?12:14),tk.side);
    s+=`<g transform="translate(${f1(tx)} ${f1(ty)})"><circle r="11" style="fill:var(--ab);opacity:.22"/><circle r="6" style="fill:var(--ab)"/></g>`;
    // edition panel
    let y=L.PY;
    if(N){s+=`<line x1="14" x2="386" y1="${L.PY-16}" y2="${L.PY-16}" style="stroke:var(--line)"/>`}
    s+=`<text x="${L.PX}" y="${y+10}" class="t-sm" style="fill:var(--drug)">GUIDANCE EDITION</text>`;y+=32;
    s+=`<text x="${L.PX}" y="${y}" class="t-big">${ed.n}</text>`;y+=22;
    const WL=[];
    if(E==='nordic'&&G!=='achr')WL.push(['Note: the Nordic guidance covers AChR+ generalized MG only.','var(--warn)']);
    if(bioNo)WL.push(['Biologic labels are for generalized MG: no marker for this group.','var(--warn)']);
    else WL.push([(ed.lv!=null?(N?'Marker ◂ on the ladder: biologics enter ':'◂ Biologics enter here: '):'No marker on the ladder: ')+ed.bioS,'var(--drug)']);
    WL.forEach(([txt,c])=>{wrapT(txt,L.CH).forEach(l=>{s+=`<text x="${L.PX}" y="${y}" class="t-xs" style="fill:${c};font-weight:700">${l}</text>`;y+=13});y+=3});y+=7;
    ed.f.forEach(([k,v])=>{s+=`<text x="${L.PX}" y="${y}" class="t-xs" style="fill:var(--muted);font-weight:700">${k.toUpperCase()}</text>`;y+=14;
      wrapT(v,L.CH).forEach(l=>{s+=`<text x="${L.PX}" y="${y}" class="t-xs" style="fill:var(--ink)">${l}</text>`;y+=13});y+=10});
    // group note in panel
    s+=`<text x="${L.PX}" y="${y}" class="t-xs" style="fill:var(--ab);font-weight:700">RESCUE IN THIS GROUP</text>`;y+=14;
    s+=`<text x="${L.PX}" y="${y}" class="t-xs" style="fill:var(--ink)">${g.rs}</text>`;
    svg.innerHTML=s;
    setSt(p);
    const st=LA_STEPS[p];let extra='';
    if(typeof st.lv==='number'){const gr=g.r[st.lv];extra=`<div class="kv"><div><dt>${g.n}</dt><dd>${gr[0]==='n'?'<b>Not indicated here:</b> ':gr[0]==='s'?'<b>Conditional:</b> ':''}${gr[1]}. ${g.nt}</dd></div></div>`}
    else extra=`<div class="kv"><div><dt>${g.n}</dt><dd>${st.lv==='r'?'Rescue in this group: '+g.rs+'. ':''}${g.nt}</dd></div></div>`;
    $('#laNote').innerHTML=noteHTML(st)+extra;
    $('#laCap').textContent=`Step ${p+1} of ${LA_STEPS.length} · ${g.n} · ${ed.n}. Click a rung to jump to it. Schematic: the order of rungs, not a timetable.`;
  }
  function edNote(){const ed=LA_ED[E];
    $('#laEdNote').innerHTML=`<h4>${ed.n}</h4><dl>${ed.f.map(([k,v])=>`<dt>${k}</dt><dd>${v}</dd>`).join('')}<dt>Goal</dt><dd>${ed.goal.join(' ').replace('GOAL · ','')}</dd></dl><p class="stage-cap">Sources: ${ed.cite}. Several of these guidelines were read as abstracts only (ABN 2025, Japanese 2022); the German 2025 update could not be opened.</p>`;
  }
  const stop=playWire(rg,$('#laPlay'),draw,22000,'Replay','ladder');
  const setSt=stepWire($('#laSteps'),LA_STEPS,rg,draw,stop);
  svg.addEventListener('click',e=>{const gg=e.target.closest('[data-rung]');if(!gg)return;stop();const v=gg.dataset.rung;const k=LA_STEPS.findIndex(S=>String(S.lv)===v);if(k<0)return;rg.value=LA_STEPS[k].at;draw(LA_STEPS[k].at)});
  $('#laTog').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
    if(b.dataset.lag){G=b.dataset.lag;$$('[data-lag]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));draw(+rg.value);return}
    if(b.dataset.lae){E=b.dataset.lae;$$('[data-lae]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
      const to=LA_ED[E].lv,from=edY;stopEd&&stopEd();
      if(to==null||from==null){edY=to;draw(+rg.value)}
      else stopEd=animate(500,q=>{edY=lerp(from,to,ease(q));draw(+rg.value)});
      edNote()}});
  draw(+rg.value);edNote();

  /* ---- time to effect, log axis ---- */
  const bs=$('#laBars'),br=$('#laB');
  const H1=1/24;
  const LA_TE=[
   {n:'Pyridostigmine',d:'plasma peak 1–2 h after a dose',a:1/24,b:2/24,k:'r'},
   {n:'FcRn &amp; C5 (some)',d:'efgartigimod, zilucoplan, rozanolixizumab beat placebo at week 1',ds:'beat placebo at week 1',a:7,k:'p'},
   {n:'Tacrolimus',d:'nerve-muscle measure better in 1–2 weeks',ds:'1–2 weeks, on a muscle measure',a:7,b:14,k:'r'},
   {n:'Oral prednisone',d:'from a few days; usually clear by 2 weeks, sometimes 4–6',ds:'days to 4–6 weeks',a:3,b:42,k:'r',open:1},
   {n:'IV methylprednisolone',d:'2 g on 2 days: significant at 2 weeks',ds:'significant at 2 weeks',a:14,k:'p'},
   {n:'IVIG',d:'69% improved by day 14 (Barth 2011)',ds:'69% improved by day 14',a:14,k:'p'},
   {n:'Plasma exchange',d:'65% improved by day 14 (Barth 2011)',ds:'65% improved by day 14',a:14,k:'p'},
   {n:'Rituximab, new-onset',d:'MMS 71% vs 29% at 16 weeks (RINOMAX)',ds:'71% vs 29% at 16 weeks',a:112,k:'p'},
   {n:'Thymectomy',d:'QMG curves apart by month 3 and at month 12 (read off figure)',ds:'apart by month 3 (read off figure)',a:91,b:365,k:'r',open:1},
   {n:'Cyclophosphamide',d:'strength better at 3 and 6 months, vs placebo at 12',ds:'3 to 12 months',a:91,b:365,k:'r'},
   {n:'Azathioprine',d:'first response 4–10 months; peak about 14 months',ds:'4–10 months, peak ~14',a:122,b:304,pk:426,k:'r'},
   {n:'Ciclosporin',d:'better than placebo at the 6-month assessment',ds:'better at 6 months',a:183,k:'p'},
   {n:'Mycophenolate',d:'good outcomes rose after ~6 months; most did well by 24',ds:'after ~6 months',a:183,b:730,k:'r'},
   {n:'Methotrexate',d:'less prednisone at months 10 and 12 (vs azathioprine)',ds:'months 10 and 12',a:304,k:'p'}
  ];
  const TK=[[H1,'1 h'],[1,'1 day'],[7,'1 wk'],[30.4,'1 mo'],[91,'3 mo'],[183,'6 mo'],[365,'1 yr'],[1095,'3 yr']];
  function drawB(t){
    const n=LA_TE.length,N=vb(bs,'720 '+(n*34+96),'400 '+(n*46+130));
    const x0=N?14:196,x1=N?386:700,RH=N?46:34,top=N?62:46;
    const lx=v=>lerp(x0,x1,(Math.log(v)-Math.log(H1))/(Math.log(1095)-Math.log(H1)));
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    s+=`<text x="14" y="22" class="t-sm" style="fill:var(--drug)">TIME TO EFFECT · log scale</text>`;
    if(!N)s+=`<text x="${x1}" y="22" class="t-xs t-end">bars grow left to right; each from its own study</text>`;
    const bot=top+n*RH;
    // Nordic band
    s+=`<rect x="${f1(lx(30.4))}" y="${top-8}" width="${f1(lx(183)-lx(30.4))}" height="${bot-top+8}" style="fill:var(--warn-soft);opacity:.55"/>`;
    s+=`<text x="${f1((lx(30.4)+lx(183))/2)}" y="${top-12}" class="t-xs t-mid" style="fill:var(--warn)">Nordic: 1–6 months for these drugs</text>`;
    TK.forEach(([v,l])=>{const x=lx(v);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${top-6}" y2="${bot}" class="grid"/>`;if(!N||!['3 mo','1 yr'].includes(l))s+=`<text x="${f1(x)}" y="${bot+16}" class="t-xs t-mid">${l}</text>`});
    s+=`<line x1="${x0}" x2="${x1}" y1="${bot}" y2="${bot}" class="axis"/>`;
    LA_TE.forEach((r,i)=>{const k=ease(ramp(t,i*.045,i*.045+.35)),y=top+i*RH;
      const cy=N?y+30:y+16;
      if(N){s+=`<text x="${x0}" y="${y+12}" class="t-xs" style="fill:var(--ink);font-weight:700">${r.n}</text><text x="${x0+r.n.replace('&amp;','&').length*6+8}" y="${y+12}" class="t-xs">${r.ds||r.d}</text>`}
      else{s+=`<text x="${x0-10}" y="${y+14}" class="t-lbl t-end" style="font-size:12px">${r.n}</text><text x="${x0-10}" y="${y+26}" class="t-xs t-end">${r.ds||r.d}</text>`}
      if(r.k==='r'){const xa=lx(r.a),xb=lerp(xa,lx(r.b),k);
        s+=`<rect x="${f1(xa)}" y="${f1(cy-6)}" width="${f1(Math.max(2,xb-xa))}" height="12" rx="4" style="fill:var(--drug);opacity:${f1(.25+.75*ramp(k,0,.2))}"/>`;
        s+=r.open?`<circle cx="${f1(xa)}" cy="${f1(cy)}" r="4" style="fill:var(--panel);stroke:var(--drug);stroke-width:1.8"/>`:`<circle cx="${f1(xa)}" cy="${f1(cy)}" r="4" style="fill:var(--drug)"/>`;
        if(r.pk&&k>.95)s+=`<path d="M${f1(lx(r.pk))} ${f1(cy-7)}l5 7l-5 7l-5 -7Z" style="fill:var(--drug)"/><text x="${f1(lx(r.pk)+8)}" y="${f1(cy+3)}" class="t-xs" style="fill:var(--drug)">peak</text>`}
      else{const x=lx(r.a);s+=`<path d="M${f1(x)} ${f1(cy-7)}l7 7l-7 7l-7 -7Z" style="fill:var(--muted);opacity:${f1(k)}"/>`}
    });
    const lg=N?['● published start · ◆ first benefit time point','○ start read off a figure, or not a number','Different studies and measures: orders of magnitude only.']:['● published start · ○ start read off a figure, or not a number · ◆ first benefit time point'];
    lg.forEach((l,k)=>{s+=`<text x="${N?14:x0}" y="${bot+34+k*14}" class="t-xs"${k===2?' style="fill:var(--warn)"':''}>${l}</text>`});
    bs.innerHTML=s;
  }
  playWire(br,$('#laBPlay'),drawB,9000,'Replay','ladder');drawB(+br.value);
};
