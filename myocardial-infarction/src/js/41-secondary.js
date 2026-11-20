/* =============== 4.1 Medicines after a heart attack =============== */
const SE_EST='<span class="ev est">Established</span>',SE_EARLY='<span class="ev early">Early evidence</span>';
/* lanes: start window w (days, from the trial cited), end of the bar e (days), status chip */
const SE_LANES=[
 {n:'Aspirin',w:[0,1],wl:'within 24 h (ISIS-2)',e:730,st:'Established',sc:'good',g:0,tr:'ISIS-2'},
 {n:'P2Y12 inhibitor',w:[0,1],wl:'within 24 h (CURE)',e:365,st:'Established',sc:'good',g:0,tr:'CURE · PLATO'},
 {n:'Statin',w:[1,4],wl:'high-intensity, 24–96 h (MIRACL)',e:730,st:'Established',sc:'good',g:1,tr:'PROVE IT'},
 {n:'Beta-blocker',w:[0,14],wl:'within 14 days (BETAMI)',e:730,st:'EF-dependent',sc:'warn',g:2,tr:'CAPRICORN · REDUCE-AMI'},
 {n:'ACEi / ARB',w:[.5,16],wl:'0.5–16 days (VALIANT, SAVE)',e:730,st:'Established',sc:'good',g:3,tr:'SAVE · VALIANT'},
 {n:'MRA',w:null,wl:'eplerenone: LVEF ≤40% and heart failure',e:730,st:'Selected patients',sc:'rx',g:4,tr:'EPHESUS'},
 {n:'SGLT2 inhibitor',w:[0,14],wl:'within 14 days (EMPACT-MI)',e:730,st:'Early evidence',sc:'warn',g:4,tr:'EMPACT-MI · DAPA-MI'}];
/* forest rows per step: [label, HR, lo, hi, txt] (null CI = no interval given in the source) */
const SE_FOREST=[
 [['ISIS-2: aspirin, vascular death',.77,null,null,'odds −23%'],['CURE: clopidogrel + aspirin',.80,.72,.90,'RR 0.80'],['TRITON: prasugrel vs clopidogrel',.81,.73,.90,'HR 0.81'],['PLATO: ticagrelor vs clopidogrel',.84,.77,.92,'HR 0.84']],
 [['MIRACL: atorvastatin 80 vs placebo',.84,.70,1.00,'RR 0.84'],['PROVE IT: atorva 80 vs prava 40',.84,.74,.95,'HR 0.84'],['CTT: more vs less intensive statin',.85,.82,.89,'−15%']],
 [['CAPRICORN, EF ≤40%: death',.77,.60,.98,'HR 0.77'],['IPD, EF 40–49%',.75,.58,.97,'HR 0.75'],['BETAMI-DANBLOCK, EF ≥40%',.85,.75,.98,'HR 0.85'],['REDUCE-AMI, EF ≥50%',.96,.79,1.16,'HR 0.96'],['REBOOT, EF >40%',1.04,.89,1.22,'HR 1.04']],
 [['SAVE: captopril, EF ≤40%: death',.81,.68,.97,'−19%'],['Overview of 3 ACEi trials: death',.74,.66,.83,'OR 0.74'],['HOPE: ramipril, high risk',.78,.70,.86,'RR 0.78'],['VALIANT: valsartan vs captopril',1.00,null,null,'HR 1.00'],['PARADISE-MI: ARNI vs ramipril',.90,.78,1.04,'HR 0.90']],
 [['EPHESUS: eplerenone, death',.85,.75,.96,'RR 0.85'],['CLEAR SYNERGY: routine spironolactone',.91,.69,1.21,'HR 0.91'],['EMPACT-MI: empagliflozin',.90,.76,1.06,'HR 0.90'],['DAPA-MI: CV death or HF',.95,.64,1.40,'HR 0.95']],
 [['SECURE: polypill vs usual care',.76,.60,.96,'HR 0.76'],['IAMI: influenza vaccine',.72,.52,.99,'HR 0.72'],['Quitting smoking (cohorts): death',.64,.58,.71,'RR 0.64']]];
const SE_STEPS=[
 {from:0,at:.08,k:'Step 1 · Antiplatelets',t:'Aspirin and a P2Y12 inhibitor',
  txt:`Aspirin is started at once: in ISIS-2, given within 24 hours, it cut 5-week vascular death by 23% (odds). A P2Y12 inhibitor is added; ESC 2023 recommends a default DAPT regimen with a potent P2Y12 inhibitor “for 12 months, irrespective of the stent type”, with shorter options for high bleeding risk. After DAPT, one antiplatelet usually continues long term. ${SE_EST} [[ISIS2_1988,Yusuf2001CURE,Wallentin2009PLATO,Byrne2023ESC]] Details: <a href="#antithrombotic" data-go="antithrombotic">Antiplatelets &amp; anticoagulants</a>.`,
  pt:`Two blood-thinning tablets for about a year, then usually one. Do not stop them on your own: stopping early can make a stent clot.`,
  hook:`Default DAPT after ACS (ESC 2023): aspirin + prasugrel or ticagrelor for 12 months.`},
 {from:.17,at:.25,k:'Step 2 · Statin',t:'A high-intensity statin, early',
  txt:`MIRACL started atorvastatin 80 mg 24–96 hours after admission and cut its 16-week end point (14.8% vs 17.4%, RR 0.84). PROVE IT, started within 10 days of ACS, showed atorvastatin 80 mg beat pravastatin 40 mg (22.4% vs 26.3% at 2 years; LDL 62 vs 95 mg/dL). The 2018 AHA/ACC guideline: “In patients with clinical ASCVD, reduce low-density lipoprotein cholesterol (LDL-C) with high-intensity statin therapy or maximally tolerated statin therapy.” ${SE_EST} [[Schwartz2001MIRACL,Cannon2004PROVEIT,Grundy2019ACC]]`,
  pt:`A statin lowers “bad” LDL cholesterol, which builds plaque. A strong dose started in hospital works best in the trials.`,
  hook:`High-intensity statin = about ≥50% LDL lowering: atorvastatin 40–80 mg or rosuvastatin 20 (40) mg. [[Grundy2019ACC]]`},
 {from:.34,at:.43,k:'Step 3 · Beta-blocker',t:'Beta-blockers: clear if the pump is weak, debated if it is not',
  txt:`With LVEF ≤40%, CAPRICORN's carvedilol lowered all-cause death (12% vs 15%; HR 0.77). ${SE_EST} With preserved EF, the 2024–2025 trials disagree: REDUCE-AMI (LVEF ≥50%) found no benefit (death or MI 7.9% vs 8.3%; HR 0.96), nor did REBOOT (LVEF >40%; HR 1.04), while BETAMI-DANBLOCK (LVEF ≥40%) favoured beta-blockers (HR 0.85, mainly fewer MIs). In mildly reduced EF (40–49%) a pooled analysis found HR 0.75. All four new trials were open-label. ${SE_EARLY} [[Dargie2001CAPRICORN,Yndigegn2024REDUCE,Ibanez2025REBOOT,Munkhaugen2025BETAMI,Rossello2025IPD]]`,
  pt:`Beta-blockers clearly help people whose heart pumps weakly after a heart attack. For people whose pump works normally, recent studies disagree, so the team weighs each person's situation.`,
  hook:`REDUCE-AMI (EF ≥50%) HR 0.96 and REBOOT HR 1.04: neutral. BETAMI-DANBLOCK HR 0.85. ABYSS: stopping long-term beta-blockers was not noninferior. [[Silvain2024ABYSS]]`},
 {from:.52,at:.60,k:'Step 4 · ACE inhibitor or ARB',t:'ACE inhibitors and ARBs',
  txt:`SAVE started captopril 3–16 days after MI in people with LVEF ≤40%: all-cause death fell from 25% to 20% (19% reduction). An overview of three post-MI trials found mortality 23.4% vs 29.1% (OR 0.74), with benefit seen early and lasting. In VALIANT (0.5–10 days after MI with heart failure or LV dysfunction) valsartan was as good as captopril, and combining them only added side effects. Sacubitril-valsartan did not beat ramipril in PARADISE-MI. ${SE_EST} [[Pfeffer1992SAVE,Flather2000,Pfeffer2003VALIANT,Pfeffer2021PARADISE]]`,
  pt:`These medicines help the heart heal and lower the chance of heart failure, especially after a large heart attack.`,
  hook:`VALIANT: valsartan = captopril after MI with HF/LV dysfunction; combination adds side effects (hypotension, renal dysfunction with valsartan; cough, rash, taste with captopril).`},
 {from:.68,at:.76,k:'Step 5 · MRA and SGLT2',t:'Eplerenone for some; SGLT2 inhibitors still being sorted out',
  txt:`EPHESUS (acute MI with LV dysfunction and heart failure): eplerenone cut deaths (478 vs 554; RR 0.85) but caused more serious hyperkalaemia (5.5% vs 3.9%). The Inspra label says to “Measure serum potassium before starting INSPRA and periodically thereafter.” Routine spironolactone after MI and PCI did not help in CLEAR SYNERGY (HR 0.91). [[Pitt2003EPHESUS,FDA-Inspra,Jolly2025CLEAR]] SGLT2 inhibitors started within 14 days (EMPACT-MI) or in DAPA-MI did not reduce death or heart failure as hard primary end points; EMPACT-MI's fewer HF admissions (3.6% vs 4.7%) are hypothesis-generating. ${SE_EARLY} [[Butler2024EMPACT,James2024DAPAMI]]`,
  pt:`Some medicines are only for people whose heart is weakened or who have diabetes or heart failure. Blood potassium is checked on eplerenone.`,
  hook:`EPHESUS: eplerenone RR 0.85 for death after MI with LV dysfunction and HF. EMPACT-MI and DAPA-MI: neutral on hard primary end points.`},
 {from:.84,at:1,k:'Step 6 · Keeping going',t:'The long run: staying on them, and the extras',
  txt:`Medicines only work if they are taken. Of older US adults who filled a high-intensity statin after MI, 58.9% were still adherent at 6 months and 41.6% at 2 years. [[Colantonio2017]] Beyond tablets: a polypill improved adherence and cut events (SECURE, HR 0.76), a flu jab after MI cut death, MI or stent thrombosis (IAMI, HR 0.72), and quitting smoking is associated with 36% lower mortality. [[Castellano2022SECURE,Frobert2021IAMI,Critchley2003]]`,
  pt:`Many people stop heart medicines within a year or two, often because of cost, side effects or confusion. Your team can help with all of these.`,
  hook:`Only about 4 in 10 older adults were still adherent to a statin 2 years after ACS (40.1%, Ontario). [[Jackevicius2002]]`}
];
/* the teaching selector: statements and the compartment they speak to */
const SE_BOX=['Aspirin','P2Y12','Statin','Beta-blocker','ACEi / ARB','MRA','SGLT2i','Anticoagulant'];
function seRules(ef,x){const A=[],D=[];const ap=(i,tag,txt)=>A.push({i,tag,txt}),ds=(i,tag,txt)=>D.push({i,tag,txt});
  if(x.af){ap(7,'ESC 2023 guideline',`Dual therapy with a NOAC and a single antiplatelet <span class="seq">“is recommended as the default strategy for up to 12 months after up to 1 week of TAT [triple antithrombotic therapy]”</span>; <span class="seq">“The use of prasugrel or ticagrelor as part of TAT is not recommended.”</span> [[Byrne2023ESC]]`);
    ap(1,'Trial: AUGUSTUS',`With AF and a recent ACS or PCI on a P2Y12 inhibitor, adding aspirin raised major or clinically relevant bleeding (16.1% vs 9.0%), with similar ischaemic events. [[Lopes2019AUGUSTUS]]`);
    ds(0,'Aspirin with an anticoagulant','In AF, aspirin is usually stopped early to lower bleeding; see the AUGUSTUS result. [[Lopes2019AUGUSTUS]]')}
  else{ap(0,'ESC 2023 guideline',`<span class="seq">“a default DAPT regimen consisting of a potent P2Y12 receptor inhibitor … and aspirin is generally recommended for 12 months, irrespective of the stent type.”</span> [[Byrne2023ESC]]`);ap(1,'ESC 2023 guideline','Prasugrel or ticagrelor is the default P2Y12 partner; clopidogrel <span class="seq">“should only be used when prasugrel or ticagrelor are contraindicated/not available.”</span> [[Byrne2023ESC]]')}
  ap(2,'2018 AHA/ACC guideline',`<span class="seq">“In patients with clinical ASCVD, reduce low-density lipoprotein cholesterol (LDL-C) with high-intensity statin therapy or maximally tolerated statin therapy.”</span> Targets: <a href="#lipids" data-go="lipids">Lowering LDL cholesterol</a>. [[Grundy2019ACC]]`);
  if(ef==='r'){ap(3,'US label: carvedilol (Coreg)',`Indicated <span class="seq">“to reduce cardiovascular mortality in clinically stable patients who have survived the acute phase of a myocardial infarction and have a left ventricular ejection fraction of less than or equal to 40%”</span>. In CAPRICORN, all-cause death 12% vs 15%. [[FDA-Coreg,Dargie2001CAPRICORN]]`);
    ap(4,'Trials: SAVE and VALIANT',`Captopril started 3–16 days after MI with LVEF ≤40% cut death by 19% (SAVE); valsartan was as effective as captopril (VALIANT). [[Pfeffer1992SAVE,Pfeffer2003VALIANT]]`);
    if(x.hf)ap(5,'US label: eplerenone (Inspra)',`Indicated <span class="seq">“to improve survival of stable adult patients with symptomatic heart failure with reduced ejection fraction (≤40%) (HFrEF) after an acute myocardial infarction (MI)”</span>; <span class="seq">“Measure serum potassium before starting INSPRA and periodically thereafter.”</span> [[FDA-Inspra,Pitt2003EPHESUS]]`);
    else ds(5,'Trials: EPHESUS, CLEAR SYNERGY','EPHESUS enrolled people with LV dysfunction and heart failure; without heart failure, routine spironolactone after MI and PCI did not help (CLEAR SYNERGY, HR 0.91). [[Pitt2003EPHESUS,Jolly2025CLEAR]]')}
  else if(ef==='m'){ap(3,'Pooled trials, LVEF 40–49%',`In 1885 people with MI, mildly reduced LVEF and no heart failure (REBOOT, BETAMI, DANBLOCK, CAPITAL-RCT), beta-blockers lowered death, new MI or heart failure (HR 0.75). ${SE_EARLY} [[Rossello2025IPD]]`);
    ds(4,'Trial: HOPE','In high-risk people without known low EF or heart failure, ramipril cut MI, stroke or CV death (14.0% vs 17.8%). [[Yusuf2000HOPE]]');
    ds(5,'Trial: CLEAR SYNERGY','Routine spironolactone after MI and PCI did not reduce CV death or heart failure (HR 0.91). [[Jolly2025CLEAR]]')}
  else{ds(3,'Trials: REDUCE-AMI, REBOOT, BETAMI-DANBLOCK, ABYSS',`With preserved EF, REDUCE-AMI (HR 0.96) and REBOOT (HR 1.04) found no benefit; BETAMI-DANBLOCK (LVEF ≥40%) found fewer events (HR 0.85); ABYSS found stopping long-term beta-blockers was not noninferior. Status: unresolved. ${SE_EARLY} [[Yndigegn2024REDUCE,Ibanez2025REBOOT,Munkhaugen2025BETAMI,Silvain2024ABYSS]]`);
    ds(4,'Trial: HOPE','In high-risk people without known low EF or heart failure, ramipril cut MI, stroke or CV death (14.0% vs 17.8%). [[Yusuf2000HOPE]]')}
  if(x.hf&&ef!=='r'){ds(5,'Trial: EPHESUS','EPHESUS enrolled MI with LV dysfunction and heart failure; the eplerenone label is for HFrEF (≤40%). [[Pitt2003EPHESUS,FDA-Inspra]]')}
  if(x.dm){ap(6,'ADA Standards of Care 2025 (10.42a)',`<span class="seq">“In people with type 2 diabetes and established ASCVD, multiple ASCVD risk factors, or chronic kidney disease (CKD), an SGLT2 inhibitor with demonstrated cardiovascular benefit is recommended”</span> (grade A). The ADA also recommends a GLP-1 RA with demonstrated cardiovascular benefit (10.42b). [[ADA2025SOC]]`);
    ap(2,'ADA Standards of Care 2025 (10.28)',`<span class="seq">“For people with diabetes and ASCVD, treatment with high-intensity statin therapy is recommended to obtain an LDL cholesterol reduction of ≥50% from baseline and an LDL cholesterol goal of &lt;55 mg/dL (&lt;1.4 mmol/L)”</span>. [[ADA2025SOC]]`);
    ap(4,'ADA Standards of Care 2025 (10.4)',`<span class="seq">“The on-treatment blood pressure goal is &lt;130/80 mmHg, if it can be safely attained”</span> (grade A). [[ADA2025SOC]]`)}
  else if(x.hf)ds(6,'Trial: EMPACT-MI',`After MI, empagliflozin did not reduce the primary end point (HR 0.90) but had fewer first heart-failure admissions (3.6% vs 4.7%), a hypothesis-generating result. ${SE_EARLY} [[Butler2024EMPACT]]`);
  else ds(6,'Trials: EMPACT-MI, DAPA-MI','Without diabetes or heart failure, SGLT2 inhibitors after MI did not reduce death or heart-failure admission as hard primary end points. [[Butler2024EMPACT,James2024DAPAMI]]');
  return {A,D}}
inits.secondary=()=>{
  const svg=$('#seSvg'),rg=$('#seT');
  const TX=(x,y,cls,txt,st)=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${txt}</text>`;
  const SC={good:['var(--good-soft)','var(--good)'],warn:['var(--warn-soft)','var(--warn)'],rx:['var(--rx-soft)','var(--rx)']};
  const GF=[0,.17,.34,.52,.68];/* when each lane group appears */
  function forest(x,y,w,rows,op,N){if(op<=.01)return '';const lw=N?150:250,tw=N?40:70,px=x+lw,pw=w-lw-tw,L=Math.log(.5),H=Math.log(1.5),X=v=>px+pw*(Math.log(v)-L)/(H-L),rh=N?17:16;
    let s=`<g style="opacity:${f1(op)}">`;
    [.5,.75,1,1.25].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${y-4}" y2="${y+rows.length*rh}" class="${v===1?'axis':'grid'}"/>`+TX(X(v),y+rows.length*rh+11,'t-xs t-mid',v)});
    s+=TX(X(.5),y+rows.length*rh+23,'t-xs',N?'← medicine better':'← favours the medicine')+TX(X(1.5),y+rows.length*rh+23,'t-xs t-end',N?'comparator →':'favours comparator →');
    rows.forEach((r,i)=>{const yy=y+i*rh+6,col=r[3]!=null&&r[3]>=1?'var(--muted)':'var(--rx)';
      s+=TX(x,yy+4,'t-xs',N?r[0].replace(/: .*$/,''):r[0],'fill:var(--ink)');
      if(r[2]!=null)s+=`<line x1="${f1(X(r[2]))}" x2="${f1(X(Math.min(1.5,r[3])))}" y1="${yy}" y2="${yy}" style="stroke:${col};stroke-width:1.8"/>`;
      s+=`<rect x="${f1(X(r[1])-4)}" y="${yy-4}" width="8" height="8" style="fill:${col}"/>`+TX(x+w,yy+4,'t-xs t-end',r[4],'fill:var(--ink)')});
    return s+'</g>'}
  function draw(t){
    const N=vb(svg,'720 440','400 515');
    const ph=phaseOf(SE_STEPS,t);
    const x0=N?14:214,x1=N?386:704,LG=Math.log(731),X=d=>x0+(x1-x0)*Math.log(1+d)/LG;
    const ly=i=>N?62+i*44:52+i*30,ty=N?ly(7)-12:ly(7)-6;
    let s=TX(N?14:14,N?18:18,'t-sm','TIME SINCE THE HEART ATTACK (stretched scale)');
    /* axis */
    s+=`<line x1="${x0}" x2="${x1}" y1="${ty}" y2="${ty}" class="axis"/>`;
    [[0,'MI'],[1,'day 1'],[3,'day 3'],[10,'day 10'],[42,'6 wk'],[90,'3 mo'],[182,'6 mo'],[365,'1 yr'],[730,'2 yr+']].forEach(([d,l])=>{if(N&&(d===3||d===90))return;s+=`<line x1="${f1(X(d))}" x2="${f1(X(d))}" y1="${N?36:30}" y2="${ty}" class="grid"/>`+TX(X(d),ty+13,'t-xs t-mid',l)});
    /* adherence fade for step 6 */
    const adh=ramp(t,.86,.95);
    s+=`<defs><linearGradient id="seFade" gradientUnits="userSpaceOnUse" x1="${f1(X(1))}" x2="${f1(X(730))}" y1="0" y2="0"><stop offset="0" stop-color="var(--rx)" stop-opacity="1"/><stop offset="${f1((X(182)-X(1))/(X(730)-X(1)))}" stop-color="var(--rx)" stop-opacity="${f1(1-adh*.41)}"/><stop offset="1" stop-color="var(--rx)" stop-opacity="${f1(1-adh*.58)}"/></linearGradient></defs>`;
    SE_LANES.forEach((L,i)=>{const g0=GF[L.g],vis=ramp(t,g0,g0+.04),pr=ease(ramp(t,g0+.01,g0+.1)),y=ly(i),active=SE_STEPS[ph]&&((ph<5&&L.g===[0,1,2,3,4][ph])||(ph===4&&L.g===4));
      const lx=N?14:14,lyy=N?y-12:y+4;
      s+=`<g style="opacity:${f1(.25+.75*vis)}">`+TX(lx,lyy,N?'t-sm':'t-lbl',L.n,vis>0?(N?'fill:var(--ink);font-weight:600':''):'');
      if(vis>0){const cw=L.st.length*5.7+12,cx=N?386-cw:200-cw;const[cb,cf]=SC[L.sc];s+=`<rect x="${f1(cx)}" y="${f1(lyy-11)}" width="${f1(cw)}" height="15" rx="7.5" style="fill:${cb}"/>`+TX(cx+6,lyy,'t-xs',L.st,`fill:${cf};font-weight:600`)}
      s+='</g>';
      if(vis<=0)return;
      const yb=N?y+2:y;
      if(L.w)s+=`<rect x="${f1(X(L.w[0]))}" y="${f1(yb-8)}" width="${f1(Math.max(4,X(L.w[1])-X(L.w[0])))}" height="16" rx="4" style="fill:var(--rx-soft);stroke:var(--rx);stroke-width:1;opacity:${f1(vis)}"/>`;
      const s0=L.w?X(L.w[0]):X(3),xe=lerp(s0,X(L.e),pr);
      if(i===3){/* beta-blocker: reduced EF solid, preserved EF dashed and fading once REDUCE-AMI arrives */
        const q=ramp(t,.40,.46);s+=`<line x1="${f1(s0)}" x2="${f1(xe)}" y1="${f1(yb-3)}" y2="${f1(yb-3)}" style="stroke:var(--rx);stroke-width:4;stroke-linecap:round"/><line x1="${f1(s0)}" x2="${f1(xe)}" y1="${f1(yb+4)}" y2="${f1(yb+4)}" style="stroke:var(--warn);stroke-width:4;stroke-linecap:round;stroke-dasharray:${q>0?'6 5':'0'};opacity:${f1(1-q*.5)}"/>`;
        if(pr>.9){if(N)s+=TX(xe,yb+17,'t-xs t-end','solid: EF ≤40% · dashed: EF ≥50%, debated','fill:var(--ink)');else s+=TX(xe,yb-8,'t-xs t-end','EF ≤40%','fill:var(--rx);font-weight:600')+TX(xe,yb+16,'t-xs t-end','EF ≥50%: debated','fill:var(--warn);font-weight:600');}}
      else if(i===1){s+=`<line x1="${f1(s0)}" x2="${f1(xe)}" y1="${yb}" y2="${yb}" style="stroke:var(--rx);stroke-width:6;stroke-linecap:round"/>`;if(pr>.95)s+=`<line x1="${f1(X(365))}" x2="${f1(X(730))}" y1="${yb}" y2="${yb}" style="stroke:var(--rx);stroke-width:2;stroke-dasharray:3 4;opacity:.6"/>`+TX(X(365),N?yb+15:yb-9,'t-xs t-mid','12 mo default','fill:var(--rx)')}
      else s+=`<line x1="${f1(s0)}" x2="${f1(xe)}" y1="${yb}" y2="${yb}" style="stroke:${i===2?'url(#seFade)':'var(--rx)'};stroke-width:6;stroke-linecap:round${i===5?';stroke-dasharray:8 4':''}"/>`;
      if(i!==3&&i!==1&&pr>.02&&pr<1)s+=pill(xe,yb,18,{col:'var(--rx)'});
      if(active&&pr>.3&&!(N&&i===3)){const wl=L.wl;s+=TX(L.w?X(L.w[1])+8:s0+6,N?yb+(i===3?24:15):yb-9,'t-xs',wl,'fill:var(--ink)')}
      if(i===2&&adh>0){s+=TX(X(730)-2,N?yb+15:yb-10,'t-xs t-end',N?'2 yr: 41.6% adherent':'still adherent: 58.9% at 6 mo · 41.6% at 2 yr',`fill:var(--ink);opacity:${f1(adh)}`)}});
    /* stopping marker: 184 of 1521 had stopped aspirin, beta-blocker and statin by 1 month */
    const st=ramp(t,.9,.96);if(st>0){const xm=X(30);s+=`<line x1="${f1(xm)}" x2="${f1(xm)}" y1="${ly(0)-10}" y2="${ly(3)+10}" style="stroke:var(--bad);stroke-width:1.6;stroke-dasharray:3 3;opacity:${f1(st)}"/>`+TX(xm+4,N?ly(0)+17:ly(0)-12,'t-xs',N?'12% stopped all 3 by 1 mo':'1 month: 184 of 1521 had stopped all three',`fill:var(--bad);opacity:${f1(st)}`)}
    /* forest plot for the current step */
    const fy=N?ty+44:ty+40,fx=N?14:14,fw=N?372:690;
    s+=TX(fx,fy-16,'t-sm',ph===5?'BEYOND THE SEVEN: HAZARD / RATE RATIOS':'THE TRIALS BEHIND THIS STEP: HAZARD / RATE RATIOS');
    SE_FOREST.forEach((rows,k)=>{const a=SE_STEPS[k].from,b=k<5?SE_STEPS[k+1].from:1.05,op=ramp(t,a,a+.03)*(1-ramp(t,b-.02,b));s+=forest(fx,fy,fw,rows,op,N)});
    svg.innerHTML=s;
    $('#seNote').innerHTML=noteHTML(SE_STEPS[ph]);setSt(ph);
  }
  let setSt=()=>{};
  const stop=playWire(rg,$('#sePlay'),draw,30000,'%t:player.replay%','secondary');
  setSt=stepWire($('#seSteps'),SE_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ===== the teaching selector ===== */
  const box=$('#seBox');let ef='p',X={dm:false,hf:false,af:false},prev=null,stopDrop=null;
  function bdraw(st,drop){
    const N=vb(box,'720 170','400 300'),cols=N?4:8,cw=N?90:84,chh=N?118:126,ox=N?16:12,oy=N?18:22;
    let s='';
    SE_BOX.forEach((nm,i)=>{const c=i%cols,r=Math.floor(i/cols),x=ox+c*(cw+(N?2:3)),y=oy+r*(chh+16),v=st[i]||0,was=prev?prev[i]||0:0,d=drop==null?1:drop;
      const fill=v===2?'var(--rx-soft)':v===1?'var(--warn-soft)':'var(--panel-2)',stroke=v===2?'var(--rx)':v===1?'var(--warn)':'var(--line)';
      s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${cw}" height="${chh}" rx="12" style="fill:${fill};stroke:${stroke};stroke-width:${v?2:1.2}${v===1?';stroke-dasharray:5 4':''}"/>`;
      s+=`<text x="${f1(x+cw/2)}" y="${f1(y+chh-12)}" class="t-mid" style="font:700 11.5px var(--body);fill:var(--ink)">${nm}</text>`;
      /* tablets fall in when a compartment becomes relevant */
      const k=v===2?3:v===1?1:0,kw=was===2?3:was===1?1:0;
      for(let j=0;j<Math.max(k,kw);j++){const inNew=j<k,inOld=j<kw;let yy=y+chh-(N?48:44)-j*(N?15:16);
        if(inNew&&!inOld)yy=lerp(y-30,yy,ease(d));const op=inNew?(inOld?1:clamp(d*2)):(1-d);if(op<=.01)continue;
        s+=`<g style="opacity:${f1(op)}">${pill(x+cw/2+(j%2?8:-8),yy,N?26:30,{ang:j%2?-14:12,col:v===1?'var(--warn)':'var(--rx)',round:i===0})}</g>`}
      s+=`<text x="${f1(x+cw/2)}" y="${f1(y+16)}" class="t-xs t-mid" style="fill:${v===2?'var(--rx)':v===1?'var(--warn)':'var(--muted)'};font-weight:600">${v===2?'applies':v===1?'debated':'—'}</text>`});
    box.innerHTML=s}
  function upd(){
    const R=seRules(ef,X),st=new Array(8).fill(0);R.D.forEach(d=>{st[d.i]=Math.max(st[d.i],1)});R.A.forEach(a=>{st[a.i]=2});
    const card=(o,cl)=>`<div class="card ${cl}"><div class="meta"><span class="tag ${cl==='ap'?'rx':'warn'}">${SE_BOX[o.i]}</span><span class="kicker">${o.tag}</span></div><p>${o.txt}</p></div>`;
    $('#seList').innerHTML=`<p class="sehead">Statements and results that apply (${R.A.length})</p><div class="selist">${R.A.map(o=>card(o,'ap')).join('')}</div>`+(R.D.length?`<p class="sehead">Debated, or depends on more than shown (${R.D.length})</p><div class="selist">${R.D.map(o=>card(o,'ds')).join('')}</div>`:'');
    if(stopDrop)stopDrop();const old=prev;stopDrop=animate(700,p=>bdraw(st,p),()=>{prev=st;stopDrop=null});if(!old)prev=null;
  }
  $$('[data-sef]').forEach(b=>b.addEventListener('click',()=>{ef=b.dataset.sef;$$('[data-sef]').forEach(x=>x.setAttribute('aria-pressed',x===b));upd()}));
  $$('[data-sx]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.sx;X[k]=!X[k];b.setAttribute('aria-pressed',X[k]);upd()}));
  redraws.secondary=(f=>()=>{f&&f();bdraw(prev||[],1)})(redraws.secondary);
  { const R=seRules(ef,X),st=new Array(8).fill(0);R.D.forEach(d=>{st[d.i]=Math.max(st[d.i],1)});R.A.forEach(a=>{st[a.i]=2});prev=st;bdraw(st,1);
    const card=(o,cl)=>`<div class="card ${cl}"><div class="meta"><span class="tag ${cl==='ap'?'rx':'warn'}">${SE_BOX[o.i]}</span><span class="kicker">${o.tag}</span></div><p>${o.txt}</p></div>`;
    $('#seList').innerHTML=`<p class="sehead">Statements and results that apply (${R.A.length})</p><div class="selist">${R.A.map(o=>card(o,'ap')).join('')}</div><p class="sehead">Debated, or depends on more than shown (${R.D.length})</p><div class="selist">${R.D.map(o=>card(o,'ds')).join('')}</div>`}

  /* ===== adherence mini chart ===== */
  const ad=$('#seAdh'),P=[[0,100],[6,58.9],[24,41.6]],AX=m=>34+250*m/24,AY=v=>14+100*(1-v/100);
  let a=`<line x1="34" x2="284" y1="114" y2="114" class="axis"/><line x1="34" x2="34" y1="14" y2="114" class="axis"/>`;
  [0,50,100].forEach(v=>{a+=`<text x="28" y="${f1(AY(v)+3)}" class="t-xs t-end">${v}%</text>`});
  [[0,'discharge'],[6,'6 mo'],[24,'2 yr']].forEach(([m,l],i)=>{a+=`<text x="${f1(AX(m))}" y="128" class="t-xs ${i===0?'':i===2?'t-end':'t-mid'}">${l}</text>`});
  a+=`<path d="${P.map((p,i)=>(i?'L':'M')+f1(AX(p[0]))+' '+f1(AY(p[1]))).join('')}" style="fill:none;stroke:var(--rx);stroke-width:2.6"/>`;
  P.slice(1).forEach(p=>{a+=`<circle cx="${f1(AX(p[0]))}" cy="${f1(AY(p[1]))}" r="4" style="fill:var(--rx)"/><text x="${f1(AX(p[0])+(p[0]===24?-6:6))}" y="${f1(AY(p[1])-8)}" class="t-sm ${p[0]===24?'t-end':''}" style="fill:var(--ink)">${p[1]}%</text>`});
  ad.innerHTML=a;
};
