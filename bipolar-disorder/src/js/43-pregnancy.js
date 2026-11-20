/* =============== 4.3 Pregnancy & the postpartum period =============== */
inits.pregnancy=()=>{
  const svg=$('#pgSvg'),rg=$('#pgT'),noteEl=$('#pgNote'),read=$('#pgRead');
  const SP=.62;/* t up to SP = pregnancy weeks 0-40, after SP = postpartum weeks 0-12 */
  const wkP=t=>clamp(t/SP)*40,wkB=t=>clamp((t-SP)/(1-SP))*12;
  /* pregnancy cohort (Viguera 2007): 71% by delivery, 47% of recurrences in trimester 1 (0.47 x 71 = 33.4%) */
  const PK=[[0,0],[4,10],[8,22],[13,33.4],[20,45],[27,55],[34,64],[40,71]];
  const pl=(k,x)=>{if(x<=k[0][0])return k[0][1];for(let i=1;i<k.length;i++)if(x<=k[i][0]){const a=k[i-1],b=k[i];return a[1]+(b[1]-a[1])*(x-a[0])/(b[0]-a[0])}return k[k.length-1][1]};
  /* postpartum shape: most of the rise in the first month (Di Florio 2013); end points from Wesseloo 2016 */
  const g=w=>(1-Math.exp(-w/2.2))/(1-Math.exp(-12/2.2));
  /* relative risk of admission, first-time mothers: peak days 10-19 at RR 7.31 (shape between is drawn) */
  const RR=w=>{const d=w*7;if(d<10)return 1+6.31*ease(d/10);if(d<=19)return 7.31;return 1+6.31*Math.exp(-(d-19)/14)};
  const STEPS=[
   {from:0,at:.03,k:'Week 0',t:'Well at conception',
    txt:`Among 89 pregnant women with bipolar disorder who were well at conception, 71% had at least one recurrence during pregnancy. Compared with continuing mood-stabiliser treatment, stopping it doubled the recurrence risk, cut the median time to recurrence more than fourfold and made the share of weeks spent ill five times greater. [[Viguera2007Pregnancy]]`,
    pt:`Pregnancy does not protect against mood episodes. Planning medicines before pregnancy, with the care team, is the safest start. [[Viguera2000,NICE2014CG192]]`,
    hook:`Stopping mood stabilisers in pregnancy doubled the recurrence risk (Viguera 2007). [[Viguera2007Pregnancy]]`},
   {from:.07,at:.2,k:'Weeks 1–13',t:'First trimester',
    txt:`47% of the recurrences came in the first trimester, and 74% were depressive or mixed. Median time to recurrence was 11 times shorter after abrupt or rapid stopping than after gradual stopping. This is when many people first learn they are pregnant, which is why NICE CG192 lists gradual options for a woman who becomes pregnant while taking lithium. [[Viguera2007Pregnancy,NICE2014CG192]]`,
    pt:`If you find out you are pregnant, do not stop a medicine suddenly on your own. Contact your care team soon to plan together. [[Viguera2007Pregnancy,NICE2014CG192]]`,
    hook:`In pregnancy, 74% of recurrences were depressive or mixed, and 47% came in the first trimester. [[Viguera2007Pregnancy]]`},
   {from:.3,at:.5,k:'Weeks 14–40',t:'Later pregnancy',
    txt:`The curve keeps climbing to 71% by delivery. After stopping lithium, recurrence over the next 40 weeks was 52% in pregnant and 58% in non-pregnant women (against 21% in the year before stopping), so pregnancy itself is not protective. In late pregnancy lithium clearance rises by 30–50%; if lithium is continued, NICE CG192 advises checking plasma levels every 4 weeks, then weekly from the 36th week. Guideline wording, not instructions. [[Viguera2000,Grandjean2009PartII,NICE2014CG192]]`,
    pt:`The body handles some medicines differently late in pregnancy, so blood levels are checked more often. [[Grandjean2009PartII,NICE2014CG192]]`,
    hook:`Pregnancy is not protective: 52% vs 58% recurrence after stopping lithium (Viguera 2000). [[Viguera2000]]`},
   {from:SP,at:SP+(1-SP)*2/12,k:'Weeks 0–4 after birth',t:'Birth and the first month',
    txt:`After birth the risk climbs fast. In 1,785 parous women, those with bipolar I disorder reported about a 50% risk of a perinatal major mood episode per pregnancy, and about 40% with bipolar II. Most perinatal episodes began within the first postpartum month, mania and psychosis earlier than depression. Among women who had stayed well for 40 weeks after stopping lithium, postpartum recurrence was 70%, against 24% in non-pregnant women over the same weeks. [[DiFlorio2013,Viguera2000]]`,
    pt:`The weeks after giving birth are a time of extra risk. A plan made before the birth can protect both parent and baby. [[Wesseloo2016,DiFlorio2013,Bergink2012]]`,
    hook:`Bipolar I: about 50% risk of a perinatal mood episode per pregnancy; bipolar II about 40%. [[DiFlorio2013]]`},
   {from:.7,at:SP+(1-SP)*2.1/12,k:'Days 10–19 after birth',t:'Postpartum psychosis',
    txt:`Postpartum psychosis is rare: five population studies reported 0.89 to 2.6 per 1,000 women (the dots). In Denmark, severe mental disorders needing admission in the first 3 months after a first birth affected 1.03 per 1,000 mothers and 0.37 per 1,000 fathers. Mothers' risk of admission peaked 10–19 days after birth (RR 7.31 against 11–12 months after birth), with no similar rise for fathers. Most puerperal psychoses are bipolar-spectrum illnesses. [[VanderKruik2017,MunkOlsen2006,Kendell1987]]`,
    pt:`Postpartum psychosis is rare, but it is an emergency. Sudden confusion, strange beliefs or not sleeping at all after giving birth need urgent help. [[VanderKruik2017,MunkOlsen2006,Jones2014Lancet]]`,
    hook:`Postpartum psychosis: about 1–2 per 1,000 births, with peak onset in the first weeks. [[VanderKruik2017,MunkOlsen2006]]`},
   {from:.8,at:1,k:'Weeks 4–12 after birth',t:'Prevention changes the picture',
    txt:`In a meta-analysis of 37 articles (5,700 deliveries), postpartum relapse was 66% (95% CI 57–75) in women with bipolar disorder who were medication-free in pregnancy and 23% (95% CI 14–37) in those who used preventive medication; 35% overall. Severe episodes occurred in 17%, and in 29% of women with a history of postpartum psychosis. In one clinic, none of 20 women with psychosis limited to the postpartum period who started preventive treatment right after delivery relapsed, against 44.4% of those who declined it. Population figures, not a prediction for one person. [[Wesseloo2016,Bergink2012]]`,
    pt:`Planning preventive treatment with the care team before the birth was linked with far fewer relapses afterwards. [[Wesseloo2016]]`,
    hook:`Postpartum relapse: 66% without preventive medication in pregnancy vs 23% with it. [[Wesseloo2016]]`}
  ];
  let setSt=()=>{};
  function draw(t){
    const N=vb(svg,'720 400','400 680'),ph=phaseOf(STEPS,t),wp=wkP(t),wb=wkB(t),post=t>=SP;
    const L=N?{p0:44,p1:386,py0:50,py1:186,b0:44,b1:386,by0:258,by1:394,ax1:204,ax2:412,rx0:44,rx1:386,ry0:452,ry1:530,dx:44,dy:586,dw:342}
             :{p0:52,p1:416,py0:50,py1:226,b0:474,b1:700,by0:50,by1:226,ax1:244,ax2:244,rx0:474,rx1:700,ry0:290,ry1:370,dx:52,dy:322,dw:368};
    const PX=w=>lerp(L.p0,L.p1,w/40),BX=w=>lerp(L.b0,L.b1,w/12),PY=v=>lerp(L.py1,L.py0,v/80),BY=v=>lerp(L.by1,L.by0,v/80);
    let s='';
    /* --- pregnancy panel --- */
    s+=`<text x="${L.p0}" y="${L.py0-22}" class="t-sm" style="fill:var(--ink)">PREGNANCY</text><text x="${L.p1}" y="${L.py0-22}" class="t-xs t-end">% with a recurrence (one cohort)</text>`;
    [[0,13,'trimester 1'],[13,27,'trimester 2'],[27,40,'trimester 3']].forEach(([a,b,n],i)=>{s+=`<rect x="${f1(PX(a))}" y="${L.py0}" width="${f1(PX(b)-PX(a))}" height="${L.py1-L.py0}" style="fill:var(--accent-soft);opacity:${i%2?.35:.7}"/><text x="${f1((PX(a)+PX(b))/2)}" y="${L.py0-6}" class="t-xs t-mid">${N?'T'+(i+1):n}</text>`});
    [0,20,40,60,80].forEach(v=>{s+=`<line x1="${L.p0}" x2="${L.p1}" y1="${f1(PY(v))}" y2="${f1(PY(v))}" class="${v?'grid':'axis'}"/><text x="${L.p0-5}" y="${f1(PY(v)+3)}" class="t-xs t-end">${v}</text>`});
    [0,10,20,30,40].forEach(w=>{s+=`<text x="${f1(PX(w))}" y="${L.ax1}" class="t-xs t-mid">${w}</text>`});
    s+=`<text x="${L.p1}" y="${L.ax1+13}" class="t-xs t-end">weeks of pregnancy</text>`;
    {let d='';const n=Math.max(1,Math.round(wp*3));for(let i=0;i<=n;i++){const w=wp*i/n;d+=(i?'L':'M')+f1(PX(w))+' '+f1(PY(pl(PK,w)))}
      s+=`<path d="${d}" style="fill:none;stroke:var(--down-fill);stroke-width:2.6;stroke-linejoin:round"/>`;
      s+=`<circle cx="${f1(PX(wp))}" cy="${f1(PY(pl(PK,wp)))}" r="4.5" style="fill:var(--down-fill);stroke:var(--panel);stroke-width:1.8"/>`;
      if(wp>=13){s+=`<circle cx="${f1(PX(13))}" cy="${f1(PY(33.4))}" r="3" style="fill:none;stroke:var(--ink);stroke-width:1.2"/><text x="${f1(PX(13)+6)}" y="${f1(PY(33.4)+14)}" class="t-xs">47% of recurrences by wk 13</text>`}
      if(wp>=39.5)s+=`<text x="${f1(PX(40)-4)}" y="${f1(PY(71)-8)}" class="t-lbl t-end" style="fill:var(--down)">71%</text>`}
    /* --- birth --- */
    if(!N){const xb=(L.p1+L.b0)/2;s+=`<line x1="${f1(xb)}" x2="${f1(xb)}" y1="${L.py0-14}" y2="${L.py1}" style="stroke:var(--accent);stroke-width:1.6;stroke-dasharray:3 3"/><text x="${f1(xb)}" y="${L.ax1+13}" class="t-xs t-mid" style="fill:var(--accent);font-weight:700">birth</text>`}
    /* --- postpartum panel --- */
    s+=`<text x="${L.b0}" y="${L.by0-22}" class="t-sm" style="fill:var(--ink)">AFTER BIRTH</text><text x="${L.b1}" y="${L.by0-22}" class="t-xs t-end">${N?'% relapsed (meta-analysis)':'% relapsed'}</text>`;
    s+=`<rect x="${L.b0}" y="${L.by0}" width="${f1(BX(4)-L.b0)}" height="${L.by1-L.by0}" style="fill:var(--accent-soft);opacity:.7"/><text x="${f1((L.b0+BX(4))/2)}" y="${L.by0-6}" class="t-xs t-mid">first month</text>`;
    [0,20,40,60,80].forEach(v=>{s+=`<line x1="${L.b0}" x2="${L.b1}" y1="${f1(BY(v))}" y2="${f1(BY(v))}" class="${v?'grid':'axis'}"/>`;if(N||v%40===0)s+=`<text x="${L.b0-5}" y="${f1(BY(v)+3)}" class="t-xs t-end">${v}</text>`});
    [0,4,8,12].forEach(w=>{s+=`<text x="${f1(BX(w))}" y="${L.ax2}" class="t-xs t-mid">${w}</text>`});
    s+=`<text x="${L.b1}" y="${L.ax2+13}" class="t-xs t-end">weeks after birth</text>`;
    if(!post)s+=`<text x="${f1((L.b0+L.b1)/2)}" y="${f1((L.by0+L.by1)/2)}" class="t-xs t-mid">fills in after birth</text>`;
    else{const curve=(end,col,dash)=>{let d='';const n=Math.max(1,Math.round(wb*8));for(let i=0;i<=n;i++){const w=wb*i/n;d+=(i?'L':'M')+f1(BX(w))+' '+f1(BY(end*g(w)))}
        return `<path d="${d}" style="fill:none;stroke:${col};stroke-width:2.6;stroke-linejoin:round${dash?';stroke-dasharray:6 4':''}"/><circle cx="${f1(BX(wb))}" cy="${f1(BY(end*g(wb)))}" r="4" style="fill:${col};stroke:var(--panel);stroke-width:1.6"/>`};
      const showP=ph>=5;
      s+=curve(66,'var(--bad)',false);
      if(showP)s+=curve(23,'var(--good)',false);
      if(wb>=11.5){s+=`<text x="${f1(BX(12)-4)}" y="${f1(BY(66)-8)}" class="t-lbl t-end" style="fill:var(--bad)">66% ${N?'no preventive medicine':'no prevention'}</text>`;
        if(showP)s+=`<text x="${f1(BX(12)-4)}" y="${f1(BY(23)-8)}" class="t-lbl t-end" style="fill:var(--good)">23% ${N?'preventive medicine':'with prevention'}</text>`;
        if(showP)s+=`<line x1="${f1(BX(12)-14)}" x2="${f1(BX(12))}" y1="${f1(BY(35))}" y2="${f1(BY(35))}" style="stroke:var(--muted);stroke-width:1.5"/><text x="${f1(BX(12)-18)}" y="${f1(BY(35)+3)}" class="t-xs t-end">35% overall</text>`}
      else if(!showP)s+=`<text x="${f1(BX(wb)+8)}" y="${f1(BY(66*g(wb))+14)}" class="t-xs" style="fill:var(--bad)">${wb<6?'no preventive medicine in pregnancy':''}</text>`}
    /* --- admission risk strip --- */
    const RY=v=>lerp(L.ry1,L.ry0+16,(v-1)/6.31);
    s+=`<text x="${L.rx0}" y="${L.ry0-10}" class="t-xs" style="fill:var(--ink);font-weight:600">${N?'Admission risk, first-time mothers (relative)':'Admission risk, first birth (relative)'}</text>`;
    s+=`<line x1="${L.rx0}" x2="${L.rx1}" y1="${L.ry1}" y2="${L.ry1}" class="axis"/>`;
    if(post&&wb>0){let d=`M${L.rx0} ${L.ry1}`;const n=Math.max(2,Math.round(wb*10)),RX=w=>lerp(L.rx0,L.rx1,w/12);for(let i=0;i<=n;i++){const w=wb*i/n;d+=`L${f1(RX(w))} ${f1(RY(RR(w)))}`}
      d+=`L${f1(RX(wb))} ${L.ry1}Z`;s+=`<path d="${d}" style="fill:var(--mixed-fill);opacity:.35;stroke:var(--mixed);stroke-width:1.4"/>`;
      if(wb>=2.7)s+=`<text x="${f1(RX(2.05))}" y="${f1(RY(7.31)-5)}" class="t-xs t-mid" style="fill:var(--mixed);font-weight:700">RR 7.31 · days 10–19</text>`}
    else s+=`<text x="${L.rx0}" y="${L.ry1-8}" class="t-xs">after birth</text>`;
    /* --- 1,000 dots --- */
    const on=ph>=4,cols=100,sp=L.dw/cols;
    s+=`<text x="${L.dx}" y="${L.dy-12}" class="t-xs" style="fill:var(--ink);font-weight:600">${on?(N?'Postpartum psychosis: ~1–3 per 1,000':'Postpartum psychosis: 0.89–2.6 per 1,000 births'):'1,000 births'}</text>`;
    for(let i=0;i<1000;i++){const c=i%cols,r=Math.floor(i/cols),x=L.dx+sp*(c+.5),y=L.dy+sp*(r+.5),hl=on&&i<3,solid=on&&i<1;
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(hl?sp*.62:sp*.32)}" style="fill:${hl?'var(--mixed)':'var(--muted)'};opacity:${hl?(solid?1:.55):.35}"/>`}
    svg.innerHTML=s;noteEl.innerHTML=noteHTML(STEPS[ph]);setSt(ph);
    read.innerHTML=post?`<span>week <b>${f1(wb)}</b> after birth</span><span>day <b>${Math.round(wb*7)}</b></span>`:`<span>pregnancy week <b>${Math.round(wp)}</b></span><span>trimester <b>${wp<13?1:wp<27?2:3}</b></span>`;
  }
  const stop=playWire(rg,$('#pgPlay'),draw,22000,'Replay','pregnancy');
  setSt=stepWire($('#pgSteps'),STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- medicine comparator ---------- */
  const med=$('#pgMed'),cap=$('#pgMedCap'),mnote=$('#pgMedNote'),opts=$('#pgLiOpts'),dose=$('#pgDose');
  const EURAP=[['valproate',10.3],['phenobarbital',6.5],['carbamazepine',5.5],['lamotrigine',2.9],['levetiracetam',2.8]];
  const DOSE=[['≤600 mg/day',1.11,.46,2.64],['601–900 mg/day',1.60,.67,3.80],['>900 mg/day',3.22,1.47,7.02]];
  const M={
   li:{card:{a:['Lithium, first trimester',24,'2.41%'],b:['Not exposed',11.5,'1.15%'],src:'Heart (cardiac) malformations · US Medicaid, 1,325,563 pregnancies, 663 lithium-exposed'},
       any:{a:['Lithium, first trimester',74,'7.4%'],b:['Reference group',43,'4.3%'],src:'Any major malformation · 6 cohorts, 22,124 pregnancies, 727 lithium-exposed'},low:'dose',
       note:{k:'Lithium',t:'A smaller risk than once thought, and dose-related',
        txt:`In 1,325,563 pregnancies, cardiac malformations occurred in 2.41% of infants exposed to lithium in the first trimester against 1.15% unexposed (adjusted RR 1.65, 95% CI 1.02–2.68), rising with dose: RR 1.11 at 600 mg/day or less, 1.60 at 601–900 and 3.22 above 900 mg/day. A six-cohort meta-analysis found major malformations in 7.4% vs 4.3% (aOR 1.71), while major cardiac malformations did not differ significantly (2.1% vs 1.6%). NICE CG192 says not to offer lithium in pregnancy "unless antipsychotic medication has not been effective". [[Patorno2017,MunkOlsen2018,NICE2014CG192]]`,
        pt:`If you take lithium and might become pregnant, talk with your care team early. Do not stop or start lithium on your own. [[NICE2014CG185,Patorno2017]]`,
        hook:`First-trimester lithium: cardiac malformations 2.41% vs 1.15% (aRR 1.65), dose-dependent. [[Patorno2017]]`}},
   vpa:{x:{a:['Valproate',103,'10.3%'],b:['Lamotrigine (same registry)',29,'2.9%'],src:'Major congenital malformations · EURAP registry, 7,355 monotherapy pregnancies'},low:'iq',
       note:{k:'Valproate',t:'The highest risk, and avoided where possible',
        txt:`In EURAP, major malformations occurred in 10.3% of valproate-exposed pregnancies, rising with dose. In NEAD, mean IQ at age 6 was 97 after valproate against 108 after lamotrigine, lower with higher doses (r = −0.56). The Depakote boxed warning says valproate "should not be used to treat women with epilepsy or bipolar disorder who are pregnant or who plan to become pregnant unless other medications have failed". In 2018 the UK MHRA banned prescribing it to women and girls of childbearing potential outside its Pregnancy Prevention Programme. [[Tomson2018,Meador2013NEAD,FDA-Depakote,Iacobucci2018]]`,
        pt:`Valproate is generally avoided in anyone who could become pregnant, unless nothing else works and a pregnancy prevention plan is in place. [[FDA-Depakote,NICE2014CG192]]`,
        hook:`Valproate: highest malformation rate (10.3% in EURAP) and a dose-dependent fall in child IQ. [[Tomson2018,Meador2013NEAD]]`}},
   cbz:{x:{a:['Carbamazepine',55,'5.5%'],b:['Lamotrigine (same registry)',29,'2.9%'],src:'Major congenital malformations · EURAP registry, 7,355 monotherapy pregnancies'},low:'eurap',
       note:{k:'Carbamazepine',t:'Not offered around pregnancy',
        txt:`In EURAP, 5.5% of carbamazepine-exposed pregnancies had a major malformation, and risk rose with dose at conception. Mean IQ at age 6 in NEAD was 105. NICE CG192 says not to offer carbamazepine to women planning a pregnancy, pregnant or considering breastfeeding. [[Tomson2018,Meador2013NEAD,NICE2014CG192]]`,
        pt:`Carbamazepine is usually not used around pregnancy or breastfeeding. Plan any change with the prescriber. [[NICE2014CG192]]`,
        hook:`EURAP malformation rates rise with dose for valproate, carbamazepine, lamotrigine and phenobarbital. [[Tomson2018]]`}},
   ltg:{x:{a:['Lamotrigine, first trimester',14,'1.39%'],b:['Not exposed',11.5,'1.15%'],src:'Heart (cardiac) malformations · US Medicaid, 1,325,563 pregnancies'},low:'eurap',
       note:{k:'Lamotrigine',t:'Among the lowest rates, but levels shift',
        txt:`Cardiac malformations occurred in 1.39% of lamotrigine-exposed infants against 1.15% unexposed, and EURAP put major malformations at 2.9%. The US label states that registries "have not detected an increased frequency of major congenital malformations". NICE CG192 asks for lamotrigine levels to be checked often around pregnancy "because they vary substantially at these times", and the label warns that infant levels can rise if a dose raised in pregnancy is not reduced after delivery. [[Patorno2017,Tomson2018,FDA-Lamictal,NICE2014CG192]]`,
        pt:`Lamotrigine levels change in pregnancy and after the birth, so the care team checks them more often. [[NICE2014CG192,FDA-Lamictal]]`,
        hook:`Lamotrigine 2.9% vs valproate 10.3% major malformations in EURAP. [[Tomson2018]]`}},
   ap:{low:'none',
       note:{k:'Antipsychotics',t:'No figure in this guide’s sources',
        txt:`The research behind this guide gives no malformation rate for antipsychotics, so no dots are drawn rather than guess. NICE CG192 puts antipsychotics ahead of lithium: lithium is not offered in pregnancy "unless antipsychotic medication has not been effective", and switching gradually to an antipsychotic is one of the listed options for a woman who becomes pregnant on lithium. For breastfeeding, NICE encourages it unless the woman takes carbamazepine, clozapine or lithium; the cariprazine label states that no human lactation studies have been done. [[NICE2014CG192,FDA-Vraylar]]`,
        pt:`Antipsychotics are often part of the plan in pregnancy. Ask the care team what is known about your particular medicine. [[NICE2014CG192]]`,
        hook:`NICE CG192: lithium in pregnancy only if antipsychotic medication has not been effective. [[NICE2014CG192]]`}}};
  let cur='li',out='card',stopA=null;
  function grid(x,y,sp,k,col,cols=40){let s='';for(let i=0;i<1000;i++){const c=i%cols,r=Math.floor(i/cols),on=i<Math.round(k);
      s+=`<circle cx="${f1(x+sp*(c+.5))}" cy="${f1(y+sp*(r+.5))}" r="${f1(on?sp*.38:sp*.26)}" style="fill:${on?col:'var(--muted)'};opacity:${on?1:.3}"/>`}return s}
  function drawM(p=1){
    const N=vb(med,'720 380','400 690'),m=M[cur],P=cur==='li'?m[out]:m.x;
    const sp=N?8.4:7,G=N?[[32,58],[32,320]]:[[40,58],[400,58]],gh=sp*25;
    let s='';
    if(P){[['a','var(--bad)'],['b','var(--eu)']].forEach(([k,col],i)=>{const [n,v,pc]=P[k],[gx,gy]=G[i];
        s+=`<text x="${gx}" y="${gy-26}" class="t-lbl">${n}</text><text x="${gx}" y="${gy-9}" class="t-xs"><tspan style="font:800 15px var(--display);fill:${col}">${Math.round(v*p)}</tspan> per 1,000 (${pc})</text>`;
        s+=grid(gx,gy,sp,v*p,col)});
      s+=`<text x="${G[0][0]}" y="${f1((N?G[1][1]:G[0][1])+gh+16)}" class="t-xs">${N&&P.src.length>60?P.src.split(' · ')[0]:P.src}</text>`;
      if(N&&P.src.length>60)s+=`<text x="${G[0][0]}" y="${f1(G[1][1]+gh+29)}" class="t-xs">${P.src.split(' · ')[1]}</text>`}
    else s+=`<rect x="${N?32:40}" y="40" width="${N?336:640}" height="${N?300:190}" rx="12" style="fill:var(--panel-2);stroke:var(--line);stroke-dasharray:4 4"/><text x="${N?200:360}" y="${N?180:126}" class="t-lbl t-mid">No malformation figure in this guide’s sources</text><text x="${N?200:360}" y="${N?200:146}" class="t-xs t-mid">${N?'See NICE CG192 in the note':'See what NICE CG192 says about antipsychotics in the note'}</text>`;
    /* lower panel */
    const ly=N?(P?G[1][1]+gh+52:372):278,lx=N?32:40,lw=N?336:640;
    if(m.low==='dose'){const lab=N?96:120,x0=lx+lab,x1=lx+lw-10,LX=v=>x0+(x1-x0)*(Math.log2(v)+2)/5;
      s+=`<text x="${lx}" y="${ly}" class="t-xs" style="fill:var(--ink);font-weight:600">${N?'Heart-defect risk by dose (aRR, 95% CI)':'Heart-defect risk by first-trimester dose (adjusted RR, 95% CI)'}</text>`;
      [.25,.5,1,2,4,8].forEach(v=>{s+=`<line x1="${f1(LX(v))}" x2="${f1(LX(v))}" y1="${ly+8}" y2="${ly+72}" class="${v===1?'axis':'grid'}"/><text x="${f1(LX(v))}" y="${ly+86}" class="t-xs t-mid">${v}</text>`});
      DOSE.forEach(([n,rr,lo,hi],i)=>{const y=ly+22+i*19,sel=i===+dose.value;
        s+=`<text x="${x0-8}" y="${y+3.5}" class="t-xs t-end" style="${sel?'fill:var(--ink);font-weight:700':''}">${n}</text><line x1="${f1(LX(lo))}" x2="${f1(LX(hi))}" y1="${y}" y2="${y}" style="stroke:${sel?'var(--bad)':'var(--muted)'};stroke-width:${sel?2.4:1.4}"/><rect x="${f1(LX(rr)-4)}" y="${y-4}" width="8" height="8" style="fill:${sel?'var(--bad)':'var(--muted)'}"/><text x="${f1(LX(hi)+5)}" y="${y+3.5}" class="t-xs" style="${sel?'fill:var(--ink);font-weight:700':''}">${rr.toFixed(2)}</text>`})}
    else if(m.low==='iq'||m.low==='eurap'){const rows=m.low==='iq'?[['valproate',97],['carbamazepine',105],['lamotrigine',108],['phenytoin',108]]:EURAP,mx=m.low==='iq'?120:12;
      const lab=N?96:120,x0=lx+lab,bw=lw-lab-50;
      s+=`<text x="${lx}" y="${ly}" class="t-xs" style="fill:var(--ink);font-weight:600">${m.low==='iq'?'Mean IQ at age 6 by fetal exposure (NEAD)':'Major malformations by medicine, % (EURAP)'}</text>`;
      rows.forEach(([n,v],i)=>{const y=ly+12+i*17,sel=n===({vpa:'valproate',cbz:'carbamazepine',ltg:'lamotrigine'})[cur];
        s+=`<text x="${x0-8}" y="${y+10}" class="t-xs t-end" style="${sel?'fill:var(--ink);font-weight:700':''}">${n}</text><rect x="${x0}" y="${y+1}" width="${f1(bw*v/mx*p)}" height="12" rx="3" style="fill:${sel?'var(--bad)':'var(--muted)'};opacity:${sel?.9:.5}"/><text x="${f1(x0+bw*v/mx*p+5)}" y="${y+11}" class="t-xs" style="fill:var(--ink)">${m.low==='iq'?v:f1(v)+'%'}</text>`})}
    else{s+=`<text x="${lx}" y="${ly}" class="t-xs" style="fill:var(--ink);font-weight:600">NICE CG192 order of preference</text>`;
      [['antipsychotic','first'],['lithium','only if antipsychotics have not worked'],['valproate','only if other options fail, with prevention programme']].forEach(([n,v],i)=>{const y=ly+20+i*18;s+=`<text x="${lx}" y="${y}" class="t-xs"><tspan style="fill:var(--ink);font-weight:700">${n}</tspan>: ${N&&v.length>34?v.replace(', with prevention programme',''):v}</text>`})}
    med.innerHTML=s;
    cap.textContent=P?'Each dot is one birth. Dots are rounded to whole numbers; the percentages are as published.':'No dots are drawn where the sources give no number.';
  }
  function pick(id){cur=id;$$('[data-pgm]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.pgm===id)));opts.hidden=id!=='li';
    mnote.innerHTML=noteHTML(M[id].note);if(stopA)stopA();stopA=animate(700,p=>drawM(ease(p)),()=>{stopA=null})}
  $$('[data-pgm]').forEach(b=>b.addEventListener('click',()=>pick(b.dataset.pgm)));
  $$('[data-pgo]').forEach(b=>b.addEventListener('click',()=>{out=b.dataset.pgo;$$('[data-pgo]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));if(stopA)stopA();stopA=animate(700,p=>drawM(ease(p)),()=>{stopA=null})}));
  dose.addEventListener('change',()=>drawM(1));
  mnote.innerHTML=noteHTML(M.li.note);drawM(1);
  const prevR=redraws.pregnancy;redraws.pregnancy=()=>{prevR&&prevR();drawM(1)};
  const prevH=onHide.pregnancy;onHide.pregnancy=()=>{prevH&&prevH();if(stopA)stopA();stopA=null};
};
