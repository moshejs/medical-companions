/* =============== 3.5 Therapies compared =============== */
/* Forest-plot rows. m: 'smd' (standardised mean difference or Cohen d, negative = better with therapy),
   'rr' (risk ratio, log scale, below 1 = fewer events with therapy), 'pct' (dropout %, a = therapy, b = comparator),
   'txt' (no pooled number in the source). c = certainty: mod, low, vlow (GRADE), trial (single trial, not
   GRADE-rated), na (review without a GRADE rating in its abstract). w = number of trials pooled (square size).
   fl: a single-trial Cohen d published as a positive number for benefit, plotted on the benefit side. */
const CO_TAU={
 sev:{t:'BPD severity',rows:[
  {n:'Any psychotherapy',s:'Cochrane 2020 · 22 trials · 1244 people',m:'smd',e:-.52,lo:-.70,hi:-.33,c:'mod',w:22,pool:1},
  {n:'Specialised therapies',s:'Oud 2018 · DBT, MBT, TFP, schema',m:'smd',e:-.59,lo:-.90,hi:-.28,c:'mod',w:12},
  {n:'Psychotherapies, stand-alone',s:'Cristea 2017 · reported as g 0.32',m:'smd',e:-.32,c:'na',w:10,fl:1},
  {n:'DBT',s:'Cochrane 2020 · 3 trials',m:'smd',e:-.60,c:'low',w:3},
  {n:'DBT skills, added on',s:'Stoffers-Winterling 2022',m:'smd',e:-.66,c:'mod',w:5},
  {n:'STEPPS, added on',s:'Stoffers-Winterling 2022',m:'smd',e:-.48,c:'na',w:3},
  {n:'Schema therapy (both formats)',s:'Arntz 2022 · one trial · d 0.73',m:'smd',e:-.73,lo:-1.18,hi:-.29,c:'trial',w:1,fl:1},
  {n:'TFP vs community therapists',s:'Doering 2010 · one trial · d 1.6',m:'smd',e:-1.6,c:'trial',w:1,fl:1},
  {n:'Brief GPM (10 sessions)',s:'Kramer 2024 · one trial · d 0.04',m:'smd',e:-.04,c:'trial',w:1,fl:1},
  {n:'MBT',s:'no pooled severity estimate',m:'txt',x:'not pooled for this outcome in these reviews'}],
  kv:`Against usual care, BPD-tailored psychotherapy reduced BPD severity (SMD −0.52; 95% CI −0.70 to −0.33; moderate certainty), and subgroup analysis found no clear difference between therapy types. Oud 2018 found SMD −0.59 for the specialised therapies; Cristea 2017 found smaller effects (g 0.32) and warned of bias. Add-on DBT skills training gave SMD −0.66 (moderate certainty), add-on STEPPS −0.48. Single trials: schema therapy d 0.73 (0.29–1.18), TFP vs community psychotherapists d 1.6, brief GPM d 0.04 at 4 months (with a greater reduction than usual care at 12 months). [[Storebo2020,Oud2018,Cristea2017,StoffersWinterling2022BJP,Arntz2022GST,Doering2010,Kramer2024GPM,BlancoMachinea2026]]`},
 sh:{t:'Self-harm',rows:[
  {n:'Any psychotherapy',s:'Cochrane 2020 · 13 trials',m:'smd',e:-.32,lo:-.49,hi:-.14,c:'low',w:13,pool:1},
  {n:'DBT',s:'Cochrane 2020 · 7 trials',m:'smd',e:-.28,lo:-.48,hi:-.07,c:'low',w:7},
  {n:'DBT, stand-alone',s:'Stoffers-Winterling 2022',m:'smd',e:-.54,c:'low',w:5},
  {n:'DBT, self-injury',s:'Oud 2018',m:'smd',e:-.40,c:'na',w:4},
  {n:'MBT',s:'Cochrane 2020 · 3 trials · risk ratio',m:'rr',e:.62,lo:.49,hi:.80,c:'low',w:3},
  {n:'MBT, stand-alone',s:'Stoffers-Winterling 2022 · risk ratio',m:'rr',e:.51,c:'low',w:3},
  {n:'STEPPS',s:'Blum 2008 · one trial',m:'txt',x:'no difference in self-harm'},
  {n:'TFP',s:'Doering 2010 · one trial',m:'txt',x:'self-harm did not change in either group'}],
  kv:`Psychotherapy vs usual care reduced self-harm (SMD −0.32; 95% CI −0.49 to −0.14; 13 trials; low certainty). DBT: SMD −0.28 (−0.48 to −0.07; 7 trials). MBT: risk ratio 0.62 (0.49–0.80; 3 trials). STEPPS did not change self-harm in its trial, and neither did TFP or the community psychotherapists in Doering 2010. In the usual-care arms of 16 trials, self-harm and suicidality did not change (g 0.003). [[Storebo2020,StoffersWinterling2022BJP,Oud2018,Blum2008STEPPS,Doering2010,Finch2019TAU]]`},
 sui:{t:'Suicide-related outcomes',rows:[
  {n:'Any psychotherapy',s:'Cochrane 2020 · 13 trials',m:'smd',e:-.34,lo:-.57,hi:-.11,c:'low',w:13,pool:1},
  {n:'DBT, self-directed violence',s:'DeCou 2019 · 18 trials',m:'smd',e:-.324,lo:-.471,hi:-.176,c:'na',w:18},
  {n:'DBT, suicidal ideation',s:'DeCou 2019',m:'smd',e:-.229,lo:-.473,hi:.016,c:'na',w:10},
  {n:'TFP, suicide attempts',s:'Doering 2010 · one trial · d 0.8',m:'smd',e:-.8,c:'trial',w:1,fl:1},
  {n:'MBT, suicidality',s:'Cochrane 2020 · 3 trials · risk ratio',m:'rr',e:.10,lo:.04,hi:.30,c:'low',w:3},
  {n:'MBT, stand-alone',s:'Stoffers-Winterling 2022 · risk ratio',m:'rr',e:.10,c:'low',w:3},
  {n:'STEPPS',s:'Blum 2008 · one trial',m:'txt',x:'no difference in suicide attempts'}],
  kv:`Psychotherapy vs usual care: SMD −0.34 (95% CI −0.57 to −0.11; 13 trials; low certainty). MBT: risk ratio 0.10 (0.04–0.30; 3 trials; low certainty). DeCou 2019 found DBT reduced self-directed violence (d −0.324) but its effect on suicidal ideation crossed zero (−0.473 to 0.016). Low certainty means few, small trials. [[Storebo2020,StoffersWinterling2022BJP,DeCou2019,Doering2010,Blum2008STEPPS]]`},
 fun:{t:'Psychosocial functioning',rows:[
  {n:'Any psychotherapy',s:'Cochrane 2020 · 22 trials',m:'smd',e:-.45,lo:-.68,hi:-.22,c:'low',w:22,pool:1},
  {n:'DBT',s:'Cochrane 2020 · 6 trials',m:'smd',e:-.36,c:'low',w:6},
  {n:'DBT, stand-alone',s:'Stoffers-Winterling 2022',m:'smd',e:-.51,c:'low',w:5},
  {n:'TFP vs community therapists',s:'Doering 2010 · one trial · d 1.0',m:'smd',e:-1.0,c:'trial',w:1,fl:1},
  {n:'MBT vs supportive group',s:'Jørgensen 2013 · one trial',m:'txt',x:'only global functioning better with MBT'}],
  kv:`Psychotherapy vs usual care improved functioning (SMD −0.45; 95% CI −0.68 to −0.22; 22 trials; low certainty), about −2.8 points on the GAF, which did not reach the clinically meaningful cut-off. Functional recovery lags behind symptoms: 2 years after DBT or GPM, 53% were neither working nor in school. [[Storebo2020,StoffersWinterling2022BJP,Doering2010,Jorgensen2013MBT,McMain2012]]`},
 drop:{t:'Dropout',rows:[
  {n:'Pooled, all studies',s:'Iliakis 2021',m:'pct',a:22.3,c:'na'},
  {n:'Pooled, outpatient RCTs',s:'Iliakis 2021 · up to 29.9% bias-adjusted',m:'pct',a:28.2,c:'na'},
  {n:'DBT studies, pre to post',s:'Kliem 2010 · 16 studies',m:'pct',a:27.3,c:'na'},
  {n:'TFP vs community therapists',s:'Doering 2010 · one trial',m:'pct',a:38.5,b:67.3,c:'trial'},
  {n:'MBT day hospital vs specialist care',s:'Laurenssen 2018 · early dropout',m:'pct',a:9,b:34,c:'trial'},
  {n:'Any psychotherapy vs usual care',s:'Cochrane 2020',m:'txt',x:'did not reduce attrition'}],
  kv:`About 1 in 4 people leave BPD psychotherapy early: 22.3% across all studies, 28.2% in outpatient RCTs, up to 29.9% after adjusting for publication bias, mostly in the first half of treatment. Schema therapy had the lowest dropout overall, MBT in the first two quarters, and community treatment by experts the highest. Overall, BPD-specific psychotherapy did not reduce attrition compared with usual care. [[Iliakis2021,Arntz2023Dropout,Kliem2010,Doering2010,Laurenssen2018,Storebo2020]]`}
};
/* head-to-head trials: a tug of war between A and B. p in -1..1: -0.6 = favours A, 0 = no clear difference */
const CO_H2H=[
 {n:'McMain 2009, 2012',s:'180 people · 1 year',a:'DBT',b:'GPM',o:{sev:[0,'no significant difference'],sh:[0,'no significant difference'],sui:[0,'no significant difference'],fun:[0,'no significant difference']}},
 {n:'BOOTS 2026',s:'204 people · 2 years',a:'DBT',b:'Schema',o:{sev:[0,'d 0.15 (−0.17 to 0.47) at 3 years'],drop:[0,'52% vs 46% at 2 years, n.s.']}},
 {n:'Giesen-Bloo 2006',s:'88 people · 3 years',a:'Schema',b:'TFP',o:{sev:[-.6,'more recovered: RR 2.18'],drop:[-.6,'higher dropout risk with TFP']}},
 {n:'Clarkin 2007',s:'90 people · 1 year',a:'TFP',b:'DBT',o:{sev:[0,'both improved (as did supportive therapy)'],sui:[0,'both improved suicidality']}},
 {n:'Bateman 2009, 2021',s:'134 people · 18 months',a:'MBT',b:'SCM',o:{sev:[0,'substantial improvements in both'],sui:[-.55,'steeper fall in suicide attempts'],fun:[-.5,'8 years on: more in purposeful activity']}},
 {n:'Arntz 2022',s:'495 people · 2 years',a:'Combined ST',b:'Group ST',o:{sev:[-.6,'d 0.84 for combined'],drop:[-.25,'retention 0.74 vs 0.62']}},
 {n:'Linehan 2015',s:'99 women · 1 year',a:'Std DBT',b:'No skills',o:{sh:[-.6,'skills arms cut self-injury more'],sui:[0,'all arms improved similarly'],drop:[-.6,'dropout 24% vs 48%']}},
 {n:'McMain 2022',s:'240 people',a:'DBT 6 mo',b:'DBT 12 mo',o:{sh:[0,'6 months non-inferior'],sev:[-.35,'faster fall in BPD symptoms'],drop:[0,'dropout did not differ']}},
 {n:'Juul 2023, 2025',s:'166 people',a:'MBT 5 mo',b:'MBT 14 mo',o:{sev:[0,'no difference at 16 or 24 months']}},
 {n:'Linehan 2006',s:'101 women · 1 year + 1',a:'DBT',b:'Experts',o:{sui:[-.6,'half as likely to attempt: HR 2.66'],drop:[-.6,'lower dropout: HR 3.2']}}
];
const CO_H2H_KV={
 sev:`Head-to-head trials mostly find no clear winner on BPD severity: DBT vs GPM, DBT vs schema therapy (BOOTS: d 0.15; 95% CI −0.17 to 0.47), 5 vs 14 months of MBT. Schema therapy beat TFP on recovery (RR 2.18), and combined individual plus group schema therapy beat mainly-group schema therapy (d 0.84). [[McMain2009,Wibbelink2026BOOTS,Juul2023,Juul2025,GiesenBloo2006,Arntz2022GST,McMain2022,Clarkin2007,Bateman2009]]`,
 sh:`DBT and GPM reduced self-harm equally. In the DBT component trial, the arms that included skills training reduced non-suicidal self-injury more than DBT without skills, and 6 months of DBT was non-inferior to 12. [[McMain2009,Linehan2015,McMain2022]]`,
 sui:`Linehan 2006 matched its expert comparison therapists for sex, availability, expertise, allegiance, training, consultation and prestige; DBT recipients were still "half as likely to make a suicide attempt". MBT gave a steeper fall in suicide attempts than structured clinical management. [[Linehan2006,Bateman2009,Clarkin2007,Linehan2015,McMain2009]]`,
 fun:`Functioning moved alike with DBT and GPM. Eight years after the MBT vs SCM trial began, the MBT group was more often in purposeful activity. [[McMain2009,Bateman2021]]`,
 drop:`Dropout differed in some head-to-head trials: lower with standard DBT than DBT without skills (24% vs 48%), lower with DBT than expert community therapy (HR 3.2), and lower with schema therapy than TFP. In BOOTS, DBT 52% and schema therapy 46% at 2 years did not differ significantly. [[Linehan2015,Linehan2006,GiesenBloo2006,Wibbelink2026BOOTS,Arntz2022GST,McMain2022]]`
};
const CO_CERT={mod:['var(--good)','Moderate certainty (GRADE)'],low:['var(--warn)','Low certainty (GRADE)'],vlow:['var(--bad)','Very low certainty'],trial:['var(--dx)','Single trial, not GRADE-rated'],na:['var(--muted)','Review, no GRADE rating given']};
const CO_STEPS=[
 {from:0,at:.08,k:'Step 1 · the rows',t:'The question',
  txt:`Each row is one comparison: a review's pooled estimate or a single trial, always a BPD therapy against usual care. The top row pools every BPD-tailored psychotherapy in the 2020 Cochrane review, which included 75 randomised trials and 4507 participants testing more than 16 kinds of therapy; about a third were DBT trials and 7 were MBT trials. [[Storebo2020]]`,
  pt:`Every line asks one question: did people do better with this therapy than with the usual care on offer?`,
  hook:`Cochrane 2020: 75 RCTs, 4507 participants, more than 16 therapies; DBT made up about one-third of the trials. [[Storebo2020]]`},
 {from:.17,at:.25,k:'Step 2 · the square',t:'Point estimate',
  txt:`The square marks the single best estimate of the difference between groups. Most rows use a standardised mean difference (SMD): the gap between the groups divided by their spread, so trials using different scales can be pooled. Here negative, to the left, means fewer symptoms with therapy. Reviews call an effect around 0.3 small and around 0.6 medium. A risk ratio (lower block) compares how often an event happened: 0.62 means 38% fewer people with the event. [[Cristea2017,Oud2018,Storebo2020]]`,
  pt:`The square is the average difference between the groups. Further left means more improvement with therapy.`},
 {from:.34,at:.42,k:'Step 3 · the whiskers',t:'Confidence interval',
  txt:`The line through the square is the 95% confidence interval, the range of effects that fit the data. Many participants give a short line; few give a long one. For psychotherapy against usual care on BPD severity it runs from −0.70 to −0.33. Where an abstract gave no interval, only the square is shown: that is missing information, not certainty. [[Storebo2020]]`,
  pt:`The line shows how sure we can be. A short line means the result is more precise.`,
  hook:`Psychotherapy vs usual care, BPD severity: SMD −0.52 (95% CI −0.70 to −0.33), moderate certainty. [[Storebo2020]]`},
 {from:.5,at:.58,k:'Step 4 · the middle line',t:'Line of no effect',
  txt:`The vertical line at 0 (at 1 for a risk ratio) means no difference. An interval that crosses it is compatible with no effect. Pick <b>Suicide-related</b>: DBT reduced self-directed violence (d −0.324; −0.471 to −0.176), but its effect on suicidal ideation crossed zero (−0.473 to 0.016), so it was not significant. Rows that cross turn hollow. [[DeCou2019]]`,
  pt:`If the line touches the middle, the study cannot rule out that the therapy made no difference.`,
  hook:`An interval that includes 0 (SMD) or 1 (risk ratio) is not statistically significant.`},
 {from:.67,at:.75,k:'Step 5 · size and colour',t:'Weight and certainty',
  txt:`Bigger squares pool more trials and carry more weight; the diamond is the overall pooled result. Colour shows the GRADE certainty of the evidence. In Cochrane 2020, only BPD severity was moderate certainty; self-harm, suicide-related outcomes and functioning were low. Single trials are not GRADE-rated and show in blue. Cristea 2017 warns that effects are "inflated by risk of bias and publication bias, and particularly unstable at follow-up". [[Storebo2020,Cristea2017]]`,
  pt:`Green marks moderate certainty, the best rating any outcome here received. Amber means low certainty: fewer and smaller studies.`,
  hook:`Cochrane 2020: BPD severity moderate certainty; self-harm, suicide-related outcomes and functioning low certainty. [[Storebo2020]]`},
 {from:.84,at:.95,k:'Step 6 · does it matter?',t:'Big enough to matter?',
  txt:`A statistical difference is not always one people feel. Cochrane translated the severity effect into about −3.6 points on the 0–36 ZAN-BPD, above the 3.0-point minimal clinically relevant difference; functioning came to about −2.8 GAF points. "Only the outcome of BPD severity reached the MIREDIF-defined cut-off for a clinically meaningful improvement." A 2024 review adds that almost half of patients do not respond sufficiently. [[Storebo2020,Leichsenring2024WP]]`,
  pt:`On average, therapy helps by an amount people notice. Some people benefit a lot and others much less, so it is worth saying when a therapy is not working.`,
  hook:`Only BPD severity reached the clinically meaningful threshold: about −3.6 vs a 3.0-point ZAN-BPD MCID. [[Storebo2020]]`}
];
/* ingredient card sort */
const CO_TH={dbt:'DBT',mbt:'MBT',st:'Schema',tfp:'TFP',gpm:'GPM',stepps:'STEPPS'};
const CO_ING=[
 {h:'A clear model, shared with the person',th:['dbt','mbt','st','gpm'],p:`NICE asks for "an explicit and integrated theoretical approach used by both the treatment team and the therapist, which is shared with the service user". DBT has the biosocial theory, MBT the mentalizing model, schema therapy the mode model, and GPM "medicalizes the disorder". [[NICE2009,Chapman2006DBT,Bateman2010WP,Arntz2005Modes,Gunderson2018GPM]]`},
 {h:'Structure and a set frame',th:['dbt','mbt','st','tfp','gpm','stepps'],p:`APA recommends (1B) "a structured approach to psychotherapy". DBT is "modular and hierarchical", MBT "time-limited", STEPPS a 20-week manual-based group, GPM once weekly; schema therapy and TFP ran twice a week for 3 years in Giesen-Bloo 2006. [[APA2024Guideline,LinehanWilks2015,Bateman2010WP,Blum2008STEPPS,Gunderson2018GPM,GiesenBloo2006]]`},
 {h:'A focus on emotions',th:['dbt','mbt','st','gpm','stepps'],p:`DBT names a focus on emotions as essential; in MBT, reduced mentalizing leads to problems with emotion regulation; STEPPS is named for emotional predictability; brief GPM was studied with emotional processing as its mechanism of change; one schema mode is the angry/impulsive child. [[Chapman2006DBT,Bateman2010WP,Blum2008STEPPS,Kramer2024GPM,Arntz2005Modes]]`},
 {h:'Support for the therapists',th:['dbt','mbt'],p:`DBT therapists meet weekly in a consultation team to keep a compassionate, non-judgemental stance and reduce burnout. MBT worked when delivered with moderate supervision. NICE asks services to provide therapist supervision. [[Chapman2006DBT,Bateman2010WP,NICE2009]]`},
 {h:'Learning about the diagnosis',th:['gpm'],p:`GPM "emphasizes psychoeducation". APA recommends (1C) a collaborative discussion of the diagnosis that includes psychoeducation, and a workshop soon after diagnosis reduced impulsivity and stormy relationships more than waitlist. [[Gunderson2018GPM,APA2024Guideline,Zanarini2008Psychoed]]`},
 {h:'Validation',th:['dbt'],p:`Validation is one of the proposed mechanisms of change in DBT, with mindfulness, targeting, chain analysis and dialectics; NICE asks crisis staff to use validating statements and not minimise the person's reasons. [[Lynch2006DBT,NICE2009]]`}
];
const CO_DIST={
 dbt:[{h:'Four skills modules',p:`Mindfulness, distress tolerance, emotion regulation and interpersonal effectiveness, taught in groups of about 4 to 10. [[Chapman2006DBT]]`},
  {h:'Diary card and target hierarchy',p:`A weekly self-monitoring card sets the agenda: life-threatening behaviour first, then therapy-interfering, then quality-of-life-interfering behaviour. [[Chapman2006DBT]]`},
  {h:'Phone coaching and chain analysis',p:`Between sessions the therapist coaches skills by phone; in session, a chain analysis maps what led up to a behaviour and what keeps it going. [[Chapman2006DBT,Lynch2006DBT]]`},
  {h:'Signature evidence',p:`Against matched expert therapists, DBT recipients were "half as likely to make a suicide attempt" (HR 2.66). NICE: consider comprehensive DBT for women when reducing recurrent self-harm is a priority. [[Linehan2006,NICE2009]]`}],
 mbt:[{h:'Mentalizing',p:`"The capacity to understand others and oneself in terms of internal mental states", which MBT tries to strengthen, especially under stress in close relationships. [[Luyten2020,Bateman2010WP]]`},
  {h:'Three pre-mentalizing modes',p:`Psychic equivalence (inner experience treated as outer reality), pretend mode, and teleological thinking (only actions count as proof). [[Chung2026]]`},
  {h:'Generalist-friendly',p:`Found effective when delivered by mental health professionals with limited extra training and moderate supervision. [[Bateman2010WP]]`},
  {h:'Signature evidence',p:`8 years after entry, 13% vs 87% still met BPD criteria after MBT partial hospitalisation vs usual care, though general social function remained impaired. [[Bateman2008]]`}],
 st:[{h:'Schema modes',p:`Detached protector, punitive parent, abandoned/abused child and angry/impulsive child, with a weak healthy adult that therapy builds up. [[Arntz2005Modes]]`},
  {h:'Individual plus group',p:`Combined individual and group schema therapy beat both usual care (d 1.14) and mainly-group schema therapy (d 0.84). [[Arntz2022GST]]`},
  {h:'Lowest dropout',p:`In a survival meta-analysis of 111 studies, schema therapy had the lowest dropout overall. [[Arntz2023Dropout]]`},
  {h:'Signature evidence',p:`Against TFP: 52% vs 29% recovered, with lower 4-year costs (EUR 37,826 vs 46,795). [[vanAsselt2008,GiesenBloo2006]]`}],
 tfp:[{h:'A psychodynamic therapy',p:`Cristea 2017 found psychodynamic approaches (g 0.41) and DBT (g 0.34) were the only ones to beat controls on their own. See <a href="#schema" data-go="schema">schema therapy &amp; TFP</a> for how TFP works. [[Cristea2017]]`},
  {h:'Anger and assault',p:`Of TFP, DBT and supportive therapy, only TFP changed irritability and verbal and direct assault. [[Clarkin2007]]`},
  {h:'Signature evidence',p:`Against experienced community psychotherapists: less dropout (38.5% vs 67.3%), fewer suicide attempts (d 0.8), better borderline symptoms (d 1.6). [[Doering2010]]`},
  {h:'But against schema therapy',p:`TFP had the higher dropout risk and fewer recoveries over 3 years. [[GiesenBloo2006]]`}],
 gpm:[{h:'Generalist by design',p:`"A once-weekly, generalist model that medicalizes the disorder, emphasizes psychoeducation, and focuses on social adaptation." [[Gunderson2018GPM]]`},
  {h:'Medication management included',p:`In McMain 2009, GPM combined psychodynamically informed therapy with symptom-targeted medication management following APA guidance. [[McMain2009]]`},
  {h:'First step, not last resort',p:`<span class="ev hyp">Hypothesis</span> Its authors propose GPM as the primary intervention, with intensive therapies kept for people who do not respond. [[Gunderson2018GPM]]`},
  {h:'Signature evidence',p:`Matched DBT on every outcome at 1 year and 2 years later; brief GPM (10 sessions) improved relationship problems (d 0.52). [[McMain2009,McMain2012,Kramer2024GPM]]`}],
 stepps:[{h:'A systems component',p:`A 20-week, manual-based group added to usual care, combining cognitive-behavioural elements and skills training with a "systems" component that involves the person's support network. [[Blum2008STEPPS]]`},
  {h:'Signature evidence',p:`Improved ZAN-BPD total and all four domains, impulsivity, mood and global functioning, but not suicide attempts, self-harm or hospitalisation; dropout was high in both arms. [[Blum2008STEPPS]]`},
  {h:'Pooled',p:`Added to usual care, STEPPS reduced BPD severity (SMD −0.48). [[StoffersWinterling2022BJP]]`}]
};
function coWrap(s,n){const w=s.split(' '),L=[];let c='';w.forEach(x=>{if((c+' '+x).trim().length>n){if(c)L.push(c);c=x}else c=(c+' '+x).trim()});if(c)L.push(c);return L}
const coFmt=v=>{let x=String(v).replace('-','');if(x.startsWith('.'))x='0'+x;if(/^\d+(\.\d)?$/.test(x)&&Math.abs(v)<1)x=(+x).toFixed(2);return (v<0?'−':'')+x};

inits.compare=()=>{
  const svg=$('#coSvg'),rg=$('#coT');let cmp='tau',oc='sev',setSt=()=>{};
  const sec=$('#m-compare');
  $('#coLegend').innerHTML=Object.keys(CO_CERT).map(k=>`<span><i class="cert" style="background:${CO_CERT[k][0]}"></i>${CO_CERT[k][1]}</span>`).join('')+'<span><i style="background:var(--muted);height:2px"></i>95% CI</span>';
  function axis(L,y,kind,s){const P0=L.P0,P1=L.P1;let X,ticks,zero,fmt=v=>v,lab;
    if(kind==='smd'){X=v=>lerp(P0,P1,(v+1.8)/2.6);ticks=[-1.5,-1,-.5,0,.5];zero=0;fmt=v=>v===0?'0':(v<0?'−':'')+Math.abs(v);lab='SMD / Cohen d'}
    else if(kind==='rr'){const a=Math.log(.03),b=Math.log(4);X=v=>lerp(P0,P1,(Math.log(v)-a)/(b-a));ticks=[.05,.1,.25,.5,1,2];zero=1;lab='risk ratio (log scale)'}
    else{X=v=>lerp(P0,P1,v/75);ticks=[0,10,20,30,40,50,60,70];zero=null;fmt=v=>v+'%';lab='% dropping out'}
    const op=ramp(s,0,.6);let o=`<g style="opacity:${f1(op)}"><line x1="${P0}" x2="${P1}" y1="${y}" y2="${y}" class="axis"/>`;
    ticks.forEach(v=>{o+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${y}" y2="${y+4}" class="axis"/><text x="${f1(X(v))}" y="${y+15}" class="t-xs t-mid">${fmt(v)}</text>`});
    if(kind!=='pct'){o+=`<text x="${f1(X(zero)-6)}" y="${y+28}" class="t-xs t-end" style="fill:var(--rx)">← favours therapy</text><text x="${f1(X(zero)+6)}" y="${y+28}" class="t-xs">favours control →</text>`}
    else o+=`<text x="${P0}" y="${y+28}" class="t-xs">← fewer people stop</text>`;
    o+=`<text x="${P1}" y="${y+(kind==='pct'?28:40)}" class="t-xs t-end">${lab}</text></g>`;
    return {svg:o,X,zero}}
  function drawTau(t,N){
    const D=CO_TAU[oc],rows=D.rows,s0=ramp(t,0,.15),sq=ramp(t,.17,.3),ci=ramp(t,.34,.47),ne=ramp(t,.5,.6),wc=ramp(t,.67,.78),md=ramp(t,.84,.94);
    const L=N?{P0:22,P1:382,rh:62,top:62}:{P0:290,P1:540,rh:34,top:62};
    const blocks=['smd','rr','pct','txt'].map(k=>({k,r:rows.filter(r=>r.m===k)})).filter(b=>b.r.length);
    let y=L.top,s='',H;
    s+=`<text x="12" y="22" class="t-lbl">${D.t}</text><text x="12" y="38" class="t-xs">${oc==='drop'?'share of people who stopped treatment early':(N?'BPD psychotherapy vs usual care':'BPD psychotherapy vs usual care · each row on its source\'s scale')}</text>`;
    let idx=0;
    blocks.forEach(B=>{
      const yTop=y,hasAx=B.k!=='txt';let A=null;
      const yAx=yTop+B.r.length*L.rh+6;
      if(hasAx){A=axis(L,yAx,B.k,s0);
        /* line of no effect */
        if(A.zero!=null){const zx=A.X(A.zero);s+=`<line x1="${f1(zx)}" x2="${f1(zx)}" y1="${yTop-2}" y2="${yAx}" style="stroke:${ne>0?'var(--ink)':'var(--line)'};stroke-width:${f1(1+ne*.8)};stroke-dasharray:${ne>0?'5 3':'2 4'};opacity:${f1(.5+ne*.5)}"/>`;
          if(ne>0)s+=`<text x="${f1(zx)}" y="${yTop-6}" class="t-xs t-mid" style="fill:var(--ink);opacity:${f1(ne)}">no effect = ${A.zero}</text>`}
        else if(ne>0){const bx0=A.X(22.3),bx1=A.X(28.2);s+=`<rect x="${f1(bx0)}" y="${yTop-4}" width="${f1(bx1-bx0)}" height="${f1(yAx-yTop+4)}" style="fill:var(--warn-soft);opacity:${f1(ne*.9)}"/><text x="${f1((bx0+bx1)/2)}" y="${yTop-8}" class="t-xs t-mid" style="opacity:${f1(ne)}">pooled 22–28%</text>`}
        s+=A.svg}
      B.r.forEach((r,i)=>{const top=yTop+i*L.rh,app=ramp(s0,idx*.06,idx*.06+.4);idx++;
        const lx=12,ly=N?top+13:top+L.rh/2-1,py=N?top+50:top+L.rh/2+1;
        s+=`<g style="opacity:${f1(app)}">`;
        s+=`<text x="${lx}" y="${f1(ly)}" class="t-lbl" style="font-size:12.5px">${r.n}</text><text x="${lx}" y="${f1(N?top+26:ly+13)}" class="t-xs">${r.s}</text>`;
        if(r.m==='txt'){s+=`<text x="${N?22:L.P0}" y="${f1(N?top+42:ly+5)}" class="t-sm" style="font-style:italic">${r.x}</text>`}
        else if(r.m==='pct'){const xa=A.X(r.a),xb=r.b!=null?A.X(r.b):null,col=wc>0?CO_CERT[r.c][0]:'var(--ink)';
          if(xb!=null){const xe=lerp(xa,xb,ci);s+=`<line x1="${f1(xa)}" x2="${f1(xe)}" y1="${f1(py)}" y2="${f1(py)}" style="stroke:var(--muted);stroke-width:2"/>`;
            if(ci>.95)s+=`<circle cx="${f1(xb)}" cy="${f1(py)}" r="${f1(5*sq)}" style="fill:var(--panel);stroke:var(--muted);stroke-width:2"/>`}
          s+=`<circle cx="${f1(xa)}" cy="${f1(py)}" r="${f1(5.5*sq)}" style="fill:${col}"/>`;
          const tx=`${r.a}%${r.b!=null?' vs '+r.b+'%':''}`;s+=`<text x="${N?22:712}" y="${f1(N?top+38:py+4)}" class="t-sm${N?'':' t-end'}" style="fill:var(--ink);opacity:${f1(sq)}">${tx}</text>`}
        else{const X=A.X,xe=X(r.e),hasCI=r.lo!=null,cross=hasCI&&((r.m==='smd'&&r.lo<0&&r.hi>0)||(r.m==='rr'&&r.lo<1&&r.hi>1));
          const col=wc>0?CO_CERT[r.c][0]:'var(--ink)',sz=lerp(9,lerp(5,15,clamp(Math.sqrt(r.w)/Math.sqrt(22))),wc)*sq;
          if(hasCI&&ci>0){const x0=lerp(xe,X(r.lo),ci),x1=lerp(xe,X(r.hi),ci);s+=`<line x1="${f1(x0)}" x2="${f1(x1)}" y1="${f1(py)}" y2="${f1(py)}" style="stroke:${col};stroke-width:2"/>`;
            if(ci>.98)s+=`<line x1="${f1(x0)}" x2="${f1(x0)}" y1="${f1(py-4)}" y2="${f1(py+4)}" style="stroke:${col};stroke-width:2"/><line x1="${f1(x1)}" x2="${f1(x1)}" y1="${f1(py-4)}" y2="${f1(py+4)}" style="stroke:${col};stroke-width:2"/>`}
          const hollow=cross&&ne>.5;
          if(r.pool&&wc>0){const dw=lerp(sz/2,Math.abs(X(r.hi)-X(r.lo))/2,wc),dh=7*sq;s+=`<path d="M${f1(xe-dw)} ${f1(py)}L${f1(xe)} ${f1(py-dh)}L${f1(xe+dw)} ${f1(py)}L${f1(xe)} ${f1(py+dh)}Z" style="fill:${col};stroke:var(--panel);stroke-width:1"/>`}
          else if(sz>0)s+=`<rect x="${f1(xe-sz/2)}" y="${f1(py-sz/2)}" width="${f1(sz)}" height="${f1(sz)}" style="fill:${hollow?'var(--panel)':col};stroke:${col};stroke-width:${hollow?2:0}"/>`;
          if(hollow)s+=`<text x="${f1(X(r.hi)+6)}" y="${f1(py+3)}" class="t-xs" style="fill:var(--bad)">crosses ${r.m==='rr'?1:0}</text>`;
          const et=r.m==='rr'?`RR ${r.e.toFixed(2)}`:coFmt(r.e),ct=hasCI?(r.m==='rr'?` (${r.lo.toFixed(2)}–${r.hi.toFixed(2)})`:` (${coFmt(r.lo)} to ${coFmt(r.hi)})`):'';
          s+=`<text x="${N?22:712}" y="${f1(N?top+38:py+4)}" class="t-sm${N?'':' t-end'}" style="fill:var(--ink);opacity:${f1(sq)}">${et}<tspan style="opacity:${f1(ci)}">${ct}</tspan></text>`}
        s+='</g>'});
      y=yAx+(hasAx?(B.k==='pct'?50:64):8)});
    /* step 6: clinical relevance inset */
    if(md>0){const mx=N?22:300,mw=N?360:300,my=y+4;
      if(oc==='sev'){const X=v=>mx+mw*v/5;s+=`<g style="opacity:${f1(md)}"><text x="${mx}" y="${my+10}" class="t-sm" style="fill:var(--ink)">ZAN-BPD points (0–36 scale): pooled change vs MCID</text>`+
        `<rect x="${mx}" y="${my+18}" width="${f1(X(3.6*md)-mx)}" height="12" rx="3" style="fill:var(--good)"/><text x="${f1(X(3.6*md)+5)}" y="${my+28}" class="t-xs">−3.6 with therapy</text>`+
        `<line x1="${f1(X(3))}" x2="${f1(X(3))}" y1="${my+14}" y2="${my+36}" style="stroke:var(--ink);stroke-width:2;stroke-dasharray:3 2"/><text x="${f1(X(3)-4)}" y="${my+48}" class="t-xs t-end" style="fill:var(--ink)">3.0 = smallest change that matters</text></g>`;y+=56}
      else{const msg=oc==='fun'?'≈ −2.8 GAF points: below the clinically meaningful cut-off':oc==='drop'?'about 1 in 4 stop early, mostly in the first half of treatment':'low certainty: not shown to reach the clinically meaningful cut-off';
        s+=`<text x="${mx}" y="${my+14}" class="t-sm" style="fill:var(--ink);opacity:${f1(md)}">${msg}</text>`;y+=26}}
    H=Math.max(N?420:300,Math.ceil(y+8));
    return {s,H}}
  function drawH2H(t,N){
    const rows=CO_H2H.filter(r=>r.o[oc]),s0=ramp(t,0,.15),mv=ramp(t,.17,.47),ne=ramp(t,.5,.6),wc=ramp(t,.67,.78);
    const L=N?{R0:92,R1:308,rh:66,top:66}:{R0:330,R1:560,rh:46,top:66};
    let s=`<text x="12" y="22" class="t-lbl">${CO_TAU[oc].t}: head-to-head trials</text><text x="12" y="38" class="t-xs">both arms are active treatments · marker moves toward the arm that did better</text>`;
    if(!rows.length){s+=`<text x="12" y="80" class="t-sm" style="font-style:italic">No head-to-head result for this outcome in the trials summarised here.</text>`;return {s,H:N?200:140}}
    const mid=(L.R0+L.R1)/2,half=(L.R1-L.R0)/2;
    if(ne>0)s+=`<text x="${f1(mid)}" y="${L.top-10}" class="t-xs t-mid" style="opacity:${f1(ne)}">no clear difference</text>`;
    rows.forEach((r,i)=>{const top=L.top+i*L.rh,app=ramp(s0,i*.07,i*.07+.4),[p,txt]=r.o[oc];
      const ry=N?top+34:top+16,col=wc>0?'var(--dx)':'var(--ink)';
      s+=`<g style="opacity:${f1(app)}"><text x="12" y="${f1(N?top+12:top+14)}" class="t-lbl" style="font-size:12.5px">${r.n}</text><text x="${N?388:12}" y="${f1(N?top+12:top+27)}" class="t-xs${N?' t-end':''}">${r.s}</text>`;
      s+=`<line x1="${L.R0}" x2="${L.R1}" y1="${f1(ry)}" y2="${f1(ry)}" style="stroke:var(--line);stroke-width:4;stroke-linecap:round"/>`;
      if(ne>0)s+=`<line x1="${f1(mid)}" x2="${f1(mid)}" y1="${f1(ry-11)}" y2="${f1(ry+8)}" style="stroke:var(--ink);stroke-dasharray:3 2;opacity:${f1(.3+ne*.5)}"/>`;
      s+=`<text x="${L.R0-8}" y="${f1(ry+4)}" class="t-sm t-end" style="fill:${p<0&&ne>.5?'var(--rx)':'var(--ink)'};font-weight:${p<0&&ne>.5?700:500}">${r.a}</text><text x="${L.R1+8}" y="${f1(ry+4)}" class="t-sm" style="fill:${p>0&&ne>.5?'var(--rx)':'var(--ink)'}">${r.b}</text>`;
      const mx=mid+p*half*mv,neutral=p===0;
      s+=`<circle cx="${f1(mx)}" cy="${f1(ry)}" r="7" style="fill:${neutral&&ne>.5?'var(--panel)':col};stroke:${col};stroke-width:2.4"/>`;
      if(neutral&&ne>.5)s+=`<circle cx="${f1(mx)}" cy="${f1(ry)}" r="${f1(11+ne*2)}" style="fill:none;stroke:var(--muted);stroke-dasharray:2 3"/>`;
      s+=`<text x="${f1(N?mid:mid)}" y="${f1(ry+19)}" class="t-xs t-mid" style="fill:var(--ink);opacity:${f1(mv)}">${txt}</text></g>`});
    const y=L.top+rows.length*L.rh;
    const nN=rows.filter(r=>r.o[oc][0]===0).length;
    s+=`<text x="12" y="${y+16}" class="t-sm" style="fill:var(--ink);opacity:${f1(ramp(t,.84,.94))}">${nN} of ${rows.length} comparisons: no clear winner</text>`;
    return {s,H:y+30}}
  function draw(t){
    const N=NARROW(),R=cmp==='tau'?drawTau(t,N):drawH2H(t,N);
    vb(svg,'720 '+R.H,'400 '+R.H);svg.innerHTML=R.s;
    const p=phaseOf(CO_STEPS,t);setSt(p);
    const kv=cmp==='tau'?CO_TAU[oc].kv:CO_H2H_KV[oc];
    $('#coNote').innerHTML=noteHTML(CO_STEPS[p])+`<div class="kv"><div><dt>${CO_TAU[oc].t} · ${cmp==='tau'?'vs usual care':'head-to-head'}</dt><dd>${kv}</dd></div></div>`;
  }
  const stop=playWire(rg,$('#coPlay'),draw,22000,'%t:player.replay%','compare');
  setSt=stepWire($('#coSteps'),CO_STEPS,rg,draw,stop);
  $$('[data-cmp]',sec).forEach(b=>b.addEventListener('click',()=>{cmp=b.dataset.cmp;$$('[data-cmp]',sec).forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  $$('[data-oc]',sec).forEach(b=>b.addEventListener('click',()=>{oc=b.dataset.oc;$$('[data-oc]',sec).forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---- ingredient card sort ---- */
  const sh=$('#coShared'),di=$('#coDist');
  function sortCards(th){
    sh.innerHTML='<h4>Shared ingredients</h4>'+CO_ING.map(g=>{const on=g.th.includes(th);
      return `<div class="ing ${on?'on':'off'}"><b class="h">${g.h}</b><div class="chips">${g.th.map(x=>`<span class="tag ${x===th?'rx':''}">${CO_TH[x]}</span>`).join('')}</div><p>${g.p}</p></div>`}).join('');
    di.innerHTML=`<h4>Distinctive to ${CO_TH[th]==='Schema'?'schema therapy':CO_TH[th]}</h4>`+CO_DIST[th].map(d=>`<div class="ing on"><b class="h">${d.h}</b><p>${d.p}</p></div>`).join('')+
      `<p class="stage-cap">Lit cards are the ingredients this guide's sources describe for ${CO_TH[th]==='Schema'?'schema therapy':CO_TH[th]} (${CO_ING.filter(g=>g.th.includes(th)).length} of ${CO_ING.length}). A dim card means the sources here do not describe it, not that the therapy lacks it.</p>`}
  $$('[data-th]',sec).forEach(b=>b.addEventListener('click',()=>{$$('[data-th]',sec).forEach(x=>x.setAttribute('aria-pressed',x===b));sortCards(b.dataset.th)}));
  sortCards('dbt');
};
