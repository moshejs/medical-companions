/* =============== 4.3 Research toward better care =============== */
const RE_Y0=1986,RE_Y1=2026;
const reT=y=>(y-RE_Y0)/(RE_Y1-RE_Y0);
/* DBT's path: trials (k 'rct'), reviews ('ma') and guidelines ('gl') summarised in this guide */
const RE_EV=[
 {y:1991,n:'Linehan 1991: first RCT',k:'rct'},{y:2003,n:'Verheul 2003: Dutch replication',k:'rct'},{y:2006,n:'Linehan 2006: vs expert therapists',k:'rct'},
 {y:2009,n:'NICE CG78',k:'gl'},{y:2009.6,n:'McMain 2009: vs GPM',k:'rct'},{y:2010,n:'Kliem 2010 meta-analysis',k:'ma'},{y:2014,n:'Mehlum 2014: adolescents',k:'rct'},
 {y:2015,n:'Linehan 2015: components',k:'rct'},{y:2017,n:'McMain 2017: skills group',k:'rct'},{y:2018,n:'McCauley 2018: adolescents',k:'rct'},
 {y:2019,n:'DeCou 2019 meta-analysis',k:'ma'},{y:2020,n:'Cochrane 2020',k:'ma'},{y:2020.6,n:'Bohus 2020: DBT-PTSD',k:'rct'},{y:2022,n:'McMain 2022: 6 vs 12 months',k:'rct'},
 {y:2024,n:'APA 2024',k:'gl'},{y:2026,n:'BOOTS 2026: vs schema therapy',k:'rct'}];
const RE_CHECK=[
 {y:1991,t:'A randomised control group'},{y:2003,t:'Replicated by another team'},{y:2006,t:'Beats an active, expert comparison'},
 {y:2010,t:'Pooled in a meta-analysis'},{y:2015,t:'Shows which parts work'},{y:2020,t:'Certainty of evidence rated'}];
const RE_STEPS=[
 {from:0,at:reT(1988),k:'Before 1991 · idea',t:'An idea from the clinic',
  txt:`DBT grew out of early efforts to apply standard behaviour therapy to people who were highly suicidal. Its development was "trial and error", driven mainly by clinical experience. At this stage it is a <span class="ev hyp">Hypothesis</span>: a promising approach without controlled evidence. [[LinehanWilks2015]]`,
  pt:`Every treatment starts as an idea that seems to help some people. That is not yet proof.`},
 {from:reT(1990.5),at:reT(1992),k:'1991 · first trial',t:'The first randomised trial',
  txt:`Linehan 1991 randomised chronically parasuicidal women with BPD to a year of DBT or community treatment as usual. DBT recipients had fewer and less medically severe parasuicidal acts, stayed in therapy more and spent fewer days in hospital; there were no differences in depression, hopelessness or suicidal ideation. One trial: <span class="ev early">Early evidence</span>. [[Linehan1991]]`,
  pt:`A fair test compares people who got the new treatment with similar people who did not, chosen by chance.`,
  hook:`Linehan 1991 was the first RCT of DBT, in chronically parasuicidal women with BPD. [[Linehan1991]]`},
 {from:reT(2002),at:reT(2006.5),k:'2003–2006 · replication',t:'Replicated, against tougher controls',
  txt:`A Dutch team found better retention and fewer self-damaging acts with DBT (58 women). Linehan 2006 then compared DBT with therapists matched for expertise, allegiance, training and prestige: DBT recipients were still "half as likely to make a suicide attempt" (HR 2.66), so the effect "cannot reasonably be attributed to general factors associated with expert psychotherapy". [[Verheul2003,Linehan2006]]`,
  pt:`The result held up when another team tested it, and when the comparison was skilled therapy rather than ordinary care.`,
  hook:`Linehan 2006: DBT halved suicide attempts vs expert community therapists (HR 2.66). [[Linehan2006]]`},
 {from:reT(2008.5),at:reT(2009.6),k:'2009 · guideline',t:'Into a guideline',
  txt:`NICE CG78: "For women with borderline personality disorder for whom reducing recurrent self-harm is a priority, consider a comprehensive dialectical behaviour therapy programme." Note how narrow the recommendation is: who (women), what goal (recurrent self-harm), what form (comprehensive). The same year, DBT and general psychiatric management gave equal outcomes. <span class="ev est">Established</span> for this use. [[NICE2009,McMain2009]]`,
  pt:`A guideline only recommends a treatment for the people and goals the trials actually tested.`,
  hook:`NICE CG78 1.3.4.5: consider comprehensive DBT for women when reducing recurrent self-harm is a priority. [[NICE2009]]`},
 {from:reT(2013.5),at:reT(2018.5),k:'2014–2022 · refinement',t:'Which parts, how long, for whom?',
  txt:`Later trials took DBT apart and stretched it. Arms with skills training reduced self-injury more than DBT without skills; adolescents had less self-harm with DBT-A (two trials); a 20-week skills group cut suicidal and self-injury episodes; and 6 months of DBT was non-inferior to 12. [[Linehan2015,Mehlum2014,McCauley2018,McMain2017,McMain2022]]`,
  pt:`Good research keeps asking which part of a treatment does the work, and whether a shorter version is enough.`,
  hook:`McMain 2022: 6 months of DBT was non-inferior to 12 months for self-harm. [[McMain2022]]`},
 {from:reT(2019.5),at:reT(2025.5),k:'2020–2026 · synthesis',t:'Weighed, and not crowned',
  txt:`DBT made up about a third of the 75 trials in Cochrane 2020, yet its single-therapy estimates were rated low certainty, and no therapy type clearly beat the others. APA 2024 recommends (1B) a structured psychotherapy with support in the literature, and its chair said "No therapy emerged as a 'gold standard'". BOOTS 2026 found DBT and schema therapy alike. Even the best-studied therapy stays open to question. [[Storebo2020,APA2024Guideline,Wibbelink2026BOOTS]]`,
  pt:`After 35 years and many trials, DBT is well supported but not "the" answer. That is how evidence normally looks.`,
  hook:`Cochrane 2020: DBT about one-third of trials; single-therapy estimates low certainty; no clear difference between therapy types. [[Storebo2020]]`}
];
/* pipeline cards. st: idea / trial / est (where the evidence has taken it); ev: evidence label */
const RE_LANES=[['early','Earlier intervention'],['brief','Briefer and scalable therapies'],['digi','Digital and app skills'],['neuro','Neuromodulation (rTMS, iTBS)'],['med','Medication trials'],['prec','Precision and dimensional approaches'],['co','Lived-experience co-design']];
const RE_CARDS=[
 {l:'early',st:'est',ev:'est',n:'Why intervene early',txt:`BPD is common in clinical practice, among the most functionally disabling mental disorders, linked to help-seeking and responsive to treatment, and its traits are malleable in youth. <span class="ev est">Established</span> for the rationale. [[Chanen2013]]`},
 {l:'early',st:'trial',ev:'early',n:'Youth service model (MOBY)',id:'ACTRN12610000100099',txt:`139 people aged 15–25: all arms improved functioning by 19.3–23.8%. The HYPE service raised treatment completion (47.8% vs 19.2%), but adding cognitive analytic therapy gave no extra functional benefit. [[Chanen2022MOBY]]`},
 {l:'early',st:'trial',ev:'early',n:'Indicated prevention',txt:`Prevention aimed at subthreshold BPD symptoms "shows promise"; selective and universal prevention still need research. [[Kaess2025]]`},
 {l:'early',st:'trial',ev:'early',n:'Stepped care for teens',txt:`A Swiss clinic offered everyone a brief intervention first; the study could not show added benefit of DBT for adolescents, possibly for lack of power. [[Cavelti2024Stepped]]`},
 {l:'early',st:'trial',ev:'early',n:'GPM-A staff training',txt:`A one-day workshop for 32 staff raised willingness to disclose a BPD diagnosis and reduced negative attitudes for 6 months (uncontrolled). [[Usher2024GPMA]]`},
 {l:'brief',st:'est',ev:'est',n:'6 vs 12 months of DBT',txt:`240 suicidal or self-harming adults: 6 months was non-inferior to 12 for self-harm at 6, 12 and 24 months, with faster falls in BPD symptoms and no difference in dropout. <span class="ev est">Established</span> for this trial. [[McMain2022]]`},
 {l:'brief',st:'trial',ev:'early',n:'Brief GPM (10 sessions)',id:'NCT03717818',txt:`76 participants: no difference from usual care on total ZAN-BPD at 4 months (d 0.04), better on relationship problems (d 0.52); greater symptom reduction at 12-month follow-up. [[Kramer2024GPM,BlancoMachinea2026]]`},
 {l:'brief',st:'trial',ev:'early',n:'Stepped care clinics',txt:`Montreal: 6–12 months of extended care gave the same change as 18–24 months (naturalistic). Australia: whole-of-service stepped care cut bed days per admission from 13.46 to 4.28 in a cluster RCT. [[Laporte2018Stepped,Grenyer2018Stepped]]`},
 {l:'digi',st:'trial',ev:'early',n:'priovi app (EPADIP-BPD)',txt:`580 adults in Germany: the unguided schema-therapy-based app plus usual care improved BSL-23 at 3 months (d 0.24) with fewer suicide attempts (7 vs 21). Fewer than 25% of patients receive guideline-adherent psychotherapy. [[Assmann2025]]`},
 {l:'digi',st:'trial',ev:'early',n:'Earlier priovi trial',id:'NCT03418142',txt:`204 participants over 12 months: no significant difference in the BPDSI slope vs care as usual (d 0.27; 95% CI 0.00–0.55). [[Klein2021priovi]]`},
 {l:'neuro',st:'trial',ev:'early',n:'rTMS: what exists',txt:`A 2021 review found 8 small studies with 63 patients: well tolerated, efficacy not established. [[Konstantinou2021rTMS]]`},
 {l:'neuro',st:'trial',ev:'early',n:'iTBS added to DBT',txt:`Sham-controlled pilot, 53 randomised: no significant effect on BSL-23 (trend d 0.23), while DBT itself gave large change. A separate sham-controlled 10-Hz rTMS trial in 30 women found no difference. [[Kujovic2025iTBS,Horky2026rTMS]]`},
 {l:'neuro',st:'idea',ev:'hyp',n:'Targeted iTBS for impulsivity',txt:`11 people, one session to an individually targeted right ventrolateral prefrontal site: less impulsivity on a delay-discounting task. Hypothesis-generating. [[Tadayonnejad2026rTMS]]`},
 {l:'neuro',st:'idea',ev:'hyp',n:'Registered TMS trials',id:'NCT06259851 · NCT07460947 · NCT05712057',txt:`rTMS-enhanced DBT (active, not recruiting, est. n 60); one-day accelerated iTBS plus D-cycloserine in suicidal patients (recruiting, est. n 20); rTMS-enhanced cognitive restructuring (recruiting, est. n 240). [[NCT06259851,NCT07460947,NCT05712057]]`},
 {l:'med',st:'trial',ev:'early',n:'Clozapine (CALMED)',id:'ISRCTN18352058',txt:`Aimed for 222, closed with 29: ZAN-BPD difference −3.86 (95% CI −10.04 to 2.32); "recruited insufficient participants to test the primary hypothesis". [[Crawford2022CALMED]]`},
 {l:'med',st:'trial',ev:'early',n:'Memantine',id:'NCT02097706',txt:`8-week pilot (17 vs 16): adjunctive memantine reduced ZAN-BPD over time vs placebo. A larger registered trial is still listed as recruiting past its estimated end date, with no results. [[Kulkarni2018Memantine,NCT02097706]]`},
 {l:'med',st:'trial',ev:'early',n:'Ketamine',id:'NCT03395314 · NCT07099534 · NCT07569198',txt:`First RCT (10 vs 12, terminated): suicidal ideation and depression fell numerically but not significantly vs midazolam. A Toulouse pilot is not yet recruiting; a 120-person ketamine plus DBT trial is recruiting. [[Fineberg2023Ketamine,NCT03395314,NCT07099534,NCT07569198]]`},
 {l:'med',st:'trial',ev:'early',n:'Brexpiprazole, BI 1358894',id:'NCT04100096 · NCT04566601',txt:`Two phase 2 trials (324 and 390 people) missed their primary endpoints; akathisia 14.0% vs 1.2% with brexpiprazole. Negative results are results too. [[Rothman2024Brexpiprazole,Dwyer2025BI1358894,NCT04100096,NCT04566601]]`},
 {l:'med',st:'idea',ev:'hyp',n:'Psilocybin, MDMA',id:'NCT05399498 · NCT07833761 · NCT06683014',txt:`Open-label psilocybin in 9 adults with BPD and depression: depression fell (d 1.41), BPD scores did not change significantly. A psilocybin-plus-DBT phase 1 is not yet recruiting; an MDMA social-cognition study (est. n 10) is recruiting. [[Grant2026Psilocybin,NCT05399498,NCT07833761,NCT06683014]]`},
 {l:'med',st:'idea',ev:'early',n:'Oxytocin',id:'NCT01243658 · NCT07551882',txt:`Lab studies: one dose normalised threat processing and raised empathy, but decreased trust in anxiously attached people. A 2024 review calls its role "uncertain". A completed 138-person trial has no posted results; a trial with self-compassion training is recruiting. [[Bertsch2013Oxytocin,Bartz2011Oxytocin,DiGiacomo2024Oxytocin,NCT01243658,NCT07551882]]`},
 {l:'prec',st:'est',ev:'est',n:'ICD-11 severity dimension',txt:`ICD-11 moved toward classifying personality pathology on a single severity dimension, from normal personality to severe disorder. See <a href="#icd" data-go="icd">ICD-11 &amp; dimensional models</a>. [[Tyrer2015Lancet]]`},
 {l:'prec',st:'trial',ev:'early',n:'Choosing DBT or GPM by model',txt:`Re-analysis of 156 patients: those randomised to their model-predicted best treatment did better (d 0.36). Not prospectively tested. [[Keefe2021Selection]]`},
 {l:'prec',st:'trial',ev:'early',n:'Who benefits from therapy',txt:`Individual-participant data, 19 trials: co-occurring depression and sexual trauma predicted less benefit; anxiety and alcohol use disorder predicted more. [[PereiraRibeiro2026]]`},
 {l:'prec',st:'idea',ev:'hyp',n:'Predictors of slow remission',txt:`Older age, childhood sexual abuse, family history of substance use, poor vocational record and other factors predicted slower remission: candidate stratifiers, not a validated tool. [[Zanarini2006Prediction]]`},
 {l:'co',st:'trial',ev:'early',n:'Co-produced peer group',txt:`A 10-week peer group built with people with lived experience (51 participants) showed small to moderate gains in recovery, belonging and personality functioning (uncontrolled). [[Bartsch2026Peer]]`},
 {l:'co',st:'idea',ev:'early',n:'Co-design of trials',txt:`People with BPD helped build the priovi app but not design its trial: co-design so far reaches the product more than the research question. [[Assmann2025]]`}
];
const RE_EVN={est:'Established',early:'Early evidence',hyp:'Hypothesis'};
const RE_HYPE=[
 {q:'Magnetic brain stimulation calms BPD',a:'early',txt:`Sham-controlled trials so far are negative or underpowered: iTBS added to DBT had no significant effect, and 10-Hz rTMS did not beat sham in 30 women. A review of 8 small studies found efficacy not established. [[Kujovic2025iTBS,Horky2026rTMS,Konstantinou2021rTMS]]`},
 {q:'Six months of DBT works as well as a full year',a:'est',txt:`A non-inferiority RCT of 240 people found 6 months non-inferior to 12 for self-harm up to 24 months. One large, well-designed trial: established for this question, though which people need longer care is unknown. [[McMain2022]]`},
 {q:'Ketamine: a fast fix for BPD?',a:'early',txt:`The only RCT (22 people, terminated early) found no significant difference from midazolam on suicidal ideation or depression. A review advises caution, citing reports of self-harm after stopping and possibly more dissociation. [[Fineberg2023Ketamine,Scott2025Ketamine]]`},
 {q:'The ‘love hormone’ could fix trust in BPD',a:'early',txt:`Single doses changed threat processing and empathy in the lab, but one study found oxytocin decreased trust and cooperation in anxiously attached, rejection-sensitive people. No clinical trial has shown a benefit. [[Bertsch2013Oxytocin,Bartz2011Oxytocin,DiGiacomo2024Oxytocin]]`},
 {q:'An app cut suicide attempts in BPD',a:'early',txt:`In 580 adults, an unguided app plus usual care gave a small benefit (d 0.24) and fewer suicide attempts (7 vs 21). An earlier trial of the same app missed its primary outcome. Needs replication. [[Assmann2025,Klein2021priovi]]`},
 {q:'Talking therapy helps people with BPD',a:'est',txt:`75 randomised trials, 4507 participants: BPD-tailored psychotherapy reduced BPD severity vs usual care (SMD −0.52), with moderate certainty and a clinically relevant size. [[Storebo2020]]`},
 {q:'Psychedelic therapy for BPD',a:'hyp',txt:`An open-label, single-dose psilocybin study in 9 adults with BPD and depression: depression fell, BPD scores did not change significantly. No control group. A phase 1 trial with DBT has not started. [[Grant2026Psilocybin,NCT07833761]]`},
 {q:'A computer model picks your best therapy',a:'early',txt:`A model matched 156 past patients to DBT or GPM with a moderate advantage, but only in a re-analysis; it has not been tested in new patients. [[Keefe2021Selection]]`}
];

inits.frontier=()=>{
  const sec=$('#m-frontier'),svg=$('#reSvg'),rg=$('#reT');let setSt=()=>{};
  function draw(t){
    const N=vb(svg,'720 390','400 500'),Y=lerp(RE_Y0,RE_Y1,t);
    const stage=Y<1991?0:Y<2009?1:2,stageF=Y<1991?Y/1991:Y<2009?clamp((Y-1991)/2.5):clamp((Y-2009)/1.5);
    let s='';
    /* lanes */
    const LN=N?{x:16,w:368,y:20,h:84}:{x:20,w:680,y:20,h:84},cw=LN.w/3,names=['Idea','Trials','Established'],cols=['var(--rx)','var(--warn)','var(--good)'];
    names.forEach((n,i)=>{const x=LN.x+i*cw;s+=`<rect x="${f1(x+3)}" y="${LN.y}" width="${f1(cw-6)}" height="${LN.h}" rx="10" style="fill:${i===stage?'var(--panel-2)':'var(--field)'};stroke:${i===stage?cols[i]:'var(--line)'};stroke-dasharray:${i===2?'0':'4 3'}"/><text x="${f1(x+12)}" y="${LN.y+16}" class="t-xs" style="fill:${cols[i]}">${n.toUpperCase()}</text>`;
      if(i<2)s+=`<path d="M${f1(x+cw-8)} ${LN.y+LN.h/2}l10 0" class="arrow" marker-end="url(#reAr)"/>`});
    s=`<defs>${marker('reAr','var(--muted)')}</defs>`+s;
    /* the DBT card slides between lanes */
    const px=i=>LN.x+i*cw+cw/2,cx=stage===0?px(0):lerp(px(stage-1),px(stage),ease(stageF)),cy=LN.y+LN.h/2+8,cwid=N?96:150;
    const lab=stage===0?'hyp':stage===1?'early':'est',lc={hyp:'var(--rx)',early:'var(--warn)',est:'var(--good)'}[lab];
    s+=`<rect x="${f1(cx-cwid/2)}" y="${cy-20}" width="${cwid}" height="40" rx="8" style="fill:var(--panel);stroke:${lc};stroke-width:2"/><text x="${f1(cx)}" y="${cy-3}" class="t-lbl t-mid">DBT</text><text x="${f1(cx)}" y="${cy+12}" class="t-xs t-mid" style="fill:${lc}">${RE_EVN[lab]}</text>`;
    /* timeline */
    const TL=N?{x:24,w:352,y:250}:{x:30,w:660,y:250},X=y=>TL.x+TL.w*(y-RE_Y0)/(RE_Y1-RE_Y0);
    s+=`<line x1="${TL.x}" x2="${f1(X(Y))}" y1="${TL.y}" y2="${TL.y}" style="stroke:var(--accent);stroke-width:3"/><line x1="${f1(X(Y))}" x2="${TL.x+TL.w}" y1="${TL.y}" y2="${TL.y}" class="axis"/>`;
    for(let y=1990;y<=2026;y+=(N?10:5)){s+=`<line x1="${f1(X(y))}" x2="${f1(X(y))}" y1="${TL.y}" y2="${TL.y+5}" class="axis"/><text x="${f1(X(y))}" y="${TL.y+18}" class="t-xs t-mid">${y}</text>`}
    s+=`<circle cx="${f1(X(Y))}" cy="${TL.y}" r="6" style="fill:var(--accent);stroke:var(--panel);stroke-width:2"/><text x="${f1(clamp(X(Y),TL.x+20,TL.x+TL.w-20))}" y="${TL.y+34}" class="t-sm t-mid" style="fill:var(--ink);font-weight:700">${Math.floor(Y)}</text>`;
    /* events stack above the line */
    const cnt={rct:0,ma:0,gl:0};let last=null;
    RE_EV.forEach((e,i)=>{if(Y<e.y)return;cnt[e.k]++;last=e;const x=X(e.y),lvl=e.k==='gl'?3:e.k==='ma'?2:1,ey=TL.y-12-lvl*20+(i%2)*6;
      const col=e.k==='gl'?'var(--good)':e.k==='ma'?'var(--dx)':'var(--accent)';
      s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${f1(ey)}" y2="${TL.y}" style="stroke:${col};opacity:.35"/>`;
      s+=e.k==='gl'?`<path d="M${f1(x)} ${f1(ey-8)}v14M${f1(x)} ${f1(ey-8)}l9 3.5l-9 3.5" style="fill:${col};stroke:${col};stroke-width:1.6"/>`:e.k==='ma'?`<path d="M${f1(x-6)} ${f1(ey)}L${f1(x)} ${f1(ey-5)}L${f1(x+6)} ${f1(ey)}L${f1(x)} ${f1(ey+5)}Z" style="fill:${col}"/>`:`<circle cx="${f1(x)}" cy="${f1(ey)}" r="4.5" style="fill:${col}"/>`});
    if(last){const lx=clamp(X(last.y),TL.x+90,TL.x+TL.w-90);s+=`<text x="${f1(lx)}" y="${N?136:140}" class="t-sm t-mid" style="fill:var(--ink)">latest: ${last.n}</text>`}
    s+=`<g transform="translate(${N?16:20} ${N?160:166})"><circle cx="4" cy="-3" r="4" style="fill:var(--accent)"/><text x="12" y="0" class="t-xs">trial ${cnt.rct}</text><path d="M${N?78:88} -3l6 -5l6 5l-6 5z" style="fill:var(--dx)"/><text x="${N?98:108}" y="0" class="t-xs">review ${cnt.ma}</text><path d="M${N?160:180} -9v12M${N?160:180} -9l8 3l-8 3" style="fill:var(--good);stroke:var(--good);stroke-width:1.4"/><text x="${N?172:192}" y="0" class="t-xs">guideline ${cnt.gl}</text></g>`;
    /* checklist */
    const CK=N?{x:16,y:310,cw:368,rh:26,cols:1}:{x:20,y:300,cw:226,rh:30,cols:3};
    s+=`<text x="${CK.x}" y="${CK.y}" class="t-sm">WHAT MAKES EVIDENCE TRUSTWORTHY</text>`;
    RE_CHECK.forEach((c,i)=>{const col=i%CK.cols,row=Math.floor(i/CK.cols),x=CK.x+col*CK.cw,y=CK.y+18+row*CK.rh,on=Y>=c.y,k=clamp((Y-c.y)/1.2);
      s+=`<rect x="${x}" y="${y-11}" width="16" height="16" rx="4" style="fill:${on?'var(--good)':'var(--panel)'};stroke:${on?'var(--good)':'var(--line)'}"/>`;
      if(on)s+=`<path d="M${x+4} ${y-3}l3 3.5l6 -7" style="fill:none;stroke:var(--panel);stroke-width:2.2;stroke-dasharray:14;stroke-dashoffset:${f1(14*(1-k))}"/>`;
      s+=`<text x="${x+24}" y="${y+1}" class="t-sm" style="fill:${on?'var(--ink)':'var(--muted)'}">${c.t}</text><text x="${x+24}" y="${y+13}" class="t-xs" style="opacity:${on?1:.6}">${on?'from '+Math.floor(c.y):'not yet'}</text>`});
    svg.innerHTML=s;
    const p=phaseOf(RE_STEPS,t);setSt(p);
    $('#reNote').innerHTML=noteHTML(RE_STEPS[p]);
    $('#reRead').innerHTML=`<span>year <b>${Math.floor(Y)}</b></span><span>stage <b>${names[stage]}</b></span><span>label <b>${RE_EVN[lab]}</b></span><span>checks met <b>${RE_CHECK.filter(c=>Y>=c.y).length} of ${RE_CHECK.length}</b></span>`;
    rg.setAttribute('aria-valuetext',`${Math.floor(Y)}: ${RE_STEPS[p].t}`);
  }
  const stop=playWire(rg,$('#rePlay'),draw,24000,'%t:player.replay%','frontier');
  setSt=stepWire($('#reSteps'),RE_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- pipeline board ---- */
  const pipe=$('#rePipe'),det=$('#reDetail');let flt='all',sel=0;
  pipe.innerHTML=`<div class="zhead"><span>Idea / registered</span><span>In trials</span><span>Established</span></div>`+RE_LANES.map(([id,n])=>`<div class="lane"><b>${n}</b><div class="zones">${['idea','trial','est'].map(z=>`<div class="zone" data-lane="${id}" data-z="${z}"></div>`).join('')}</div></div>`).join('');
  const btns=RE_CARDS.map((c,i)=>{const b=document.createElement('button');b.className='rc';b.dataset.card=i;b.setAttribute('aria-pressed','false');
    b.innerHTML=`<span>${c.n}</span><span class="ev ${c.ev}">${RE_EVN[c.ev]}</span>${c.id?`<small>${c.id}</small>`:''}`;return b});
  function place(all){btns.forEach((b,i)=>{const c=RE_CARDS[i];$(`.zone[data-lane="${c.l}"][data-z="${all?'idea':c.st}"]`,pipe).appendChild(b)})}
  function slide(){
    if(RM){place(false);return}
    place(true);const first=btns.map(b=>b.getBoundingClientRect());
    place(false);
    btns.forEach((b,i)=>{const r=b.getBoundingClientRect(),dx=first[i].left-r.left,dy=first[i].top-r.top;if(!dx&&!dy)return;
      b.style.transition='none';b.style.transform=`translate(${dx}px,${dy}px)`;b.getBoundingClientRect();
      b.style.transition=`transform .9s cubic-bezier(.3,.1,.2,1) ${(i%5)*.06+.15}s`;b.style.transform=''})}
  function filter(){btns.forEach((b,i)=>b.classList.toggle('hide',flt==='est'&&RE_CARDS[i].ev!=='est'))}
  function detail(i){sel=i;const c=RE_CARDS[i];btns.forEach((b,k)=>b.setAttribute('aria-pressed',k===i));
    const lane=RE_LANES.find(l=>l[0]===c.l)[1],stn={idea:'Idea or registered, no clinical result yet',trial:'Tested in trials, not settled',est:'Established'}[c.st];
    det.innerHTML=`<div class="kicker">${lane}</div><h4>${c.n}</h4><p><span class="ev ${c.ev}">${RE_EVN[c.ev]}</span></p><p>${c.txt}</p><div class="kv"><div><dt>Where it sits</dt><dd>${stn}</dd></div>${c.id?`<div><dt>Registration</dt><dd>${c.id}</dd></div>`:''}</div>`}
  pipe.addEventListener('click',e=>{const b=e.target.closest('[data-card]');if(b){detail(+b.dataset.card);if(matchMedia('(max-width:1100px)').matches&&e.isTrusted)det.scrollIntoView({block:'nearest',behavior:RM?'auto':'smooth'})}});
  $$('[data-flt]',sec).forEach(b=>b.addEventListener('click',()=>{flt=b.dataset.flt;$$('[data-flt]',sec).forEach(x=>x.setAttribute('aria-pressed',x===b));filter();
    if(flt==='est'&&RE_CARDS[sel].ev!=='est')detail(RE_CARDS.findIndex(c=>c.ev==='est'))}));
  $('#reReplay').addEventListener('click',()=>{filter();slide()});
  place(false);detail(0);
  onShow.frontier=()=>{requestAnimationFrame(slide)};

  /* ---- hype filter ---- */
  const hy=$('#reHype'),sc=$('#reScore');const ans={};
  hy.innerHTML=RE_HYPE.map((h,i)=>`<div class="hcard" id="reH${i}"><span class="kicker">A headline might say</span><q>${h.q}</q><div class="ctrls" role="group" aria-label="Your guess">${['est','early','hyp'].map(g=>`<button class="btn" data-h="${i}" data-g="${g}" aria-pressed="false">${RE_EVN[g]}</button>`).join('')}</div><div class="rev"><div class="verdict" id="reV${i}"></div><p>${h.txt}</p></div></div>`).join('');
  function score(){const n=Object.keys(ans).length,ok=Object.keys(ans).filter(i=>ans[i]===RE_HYPE[i].a).length;sc.innerHTML=`<span>answered <b>${n} of ${RE_HYPE.length}</b></span><span>matched the evidence label <b>${ok}</b></span>`}
  hy.addEventListener('click',e=>{const b=e.target.closest('[data-g]');if(!b)return;const i=+b.dataset.h,g=b.dataset.g,H=RE_HYPE[i];ans[i]=g;
    $$(`[data-h="${i}"]`,hy).forEach(x=>x.setAttribute('aria-pressed',x===b));
    const v=$('#reV'+i),right=g===H.a;v.className='verdict '+(right?'yes':'maybe');
    v.innerHTML=(right?'Matches: ':'The evidence label is ')+`<span class="ev ${H.a}">${RE_EVN[H.a]}</span>`;
    $('#reH'+i).classList.add('done');score()});
  score();
};
