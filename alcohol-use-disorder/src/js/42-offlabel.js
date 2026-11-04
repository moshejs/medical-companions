/* =============== 4.2 Other medicines: topiramate, gabapentin, baclofen and more =============== */
const OL_ROWS=[
 {n:'Topiramate',reg:'US: approved for other uses',st:'Meta-analysis · 7 RCTs, 1,125',lv:3,eff:['Abstinence g 0.47, heavy days g 0.41','Paresthesia 50.8% vs 10.6%'],ev:'est',rev:.02,
  det:`<div><dt>Status</dt><dd>US approvals for seizures, migraine prevention and, with phentermine, weight loss; AUD is not one of them. The VA/DoD guideline lists it among first-line AUD treatments. [[KranzlerSoyka2018]]</dd></div><div><dt>Trials</dt><dd>Single-site RCT (n=150): 2.88 fewer drinks a day and 27.6% fewer heavy drinking days than placebo. Multisite RCT (n=371, 17 US sites): percent heavy drinking days 8.44 points lower (95% CI 3.07–13.80). Meta-analysis of 7 RCTs: abstinence g = 0.468, heavy drinking g = 0.406; Jonas 2014 rated the evidence moderate. [[Johnson2003Lancet,Johnson2007Topiramate,Blodgett2014Topiramate,Jonas2014JAMA]]</dd></div><div><dt>Harms</dt><dd>Paresthesia 50.8% vs 10.6%, taste change 23.0% vs 4.8%, poor appetite 19.7% vs 6.9%, difficulty concentrating 14.8% vs 3.2%; more adverse-event dropouts than placebo (RR 2.18). [[Johnson2007Topiramate,Bahji2022NMA]]</dd></div>`},
 {n:'Gabapentin',reg:'Not FDA-approved for AUD',st:'Meta-analysis · 7 RCTs',lv:3,eff:['1,800 mg/d: 17.0% vs 4.1% abstinent','Multisite prodrug trial: no benefit'],ev:'early',rev:.20,
  det:`<div><dt>Trials</dt><dd>Dose-ranging RCT (n=150, 12 weeks): complete abstinence 4.1% on placebo, 11.1% at 900 mg/day and 17.0% at 1,800 mg/day. In people with recent withdrawal symptoms (n=90), 27% vs 9% had no heavy drinking days. The extended-release prodrug gabapentin enacarbil (n=346) did not beat placebo. [[Mason2014Gabapentin,Anton2020Gabapentin,Falk2019GabapentinEnacarbil]]</dd></div><div><dt>Overall</dt><dd>In a meta-analysis of 7 RCTs every outcome pointed toward gabapentin, but only percent heavy drinking days showed clear benefit (g = −0.64). Misuse in about 1% of the general population is cited against first-line use. [[Kranzler2019Gabapentin,KranzlerSoyka2018]]</dd></div>`},
 {n:'Baclofen',reg:'France: authorised 2018',st:'Cochrane · 17 RCTs, 1,818',lv:3,eff:['Relapse RR 0.87; abstinent days up','Best dose unsettled'],ev:'est',rev:.38,
  det:`<div><dt>Status</dt><dd>A GABA-B receptor agonist approved in the US for spasticity. France allowed doses up to 300 mg/day under a temporary recommendation from March 2014, cut the maximum to 80 mg/day in July 2017 and granted a marketing authorisation in October 2018. [[KranzlerSoyka2018,deBeaurepaire2022TRU,Payet2026Baclofen]]</dd></div><div><dt>Evidence</dt><dd>Cochrane 2023: probably lowers relapse risk (RR 0.87, 95% CI 0.77–0.99; moderate certainty) and increases percent days abstinent (MD 9.07; high certainty), mainly in detoxified participants; no effect on heavy drinking days. Fatigue, dizziness, sleepiness, dry mouth and muscle problems were more common. [[Agabio2023Cochrane]]</dd></div>`},
 {n:'Nalmefene',reg:'EU: authorised to cut drinking',st:'Two RCTs · n=604 and 718',lv:2,eff:['−2.3 and −1.7 heavy days a month','NNH 12 (adverse-event dropout)'],ev:'est',rev:.56,
  det:`<div><dt>Status</dt><dd>A mu- and delta-opioid antagonist and kappa partial agonist. In the US it is approved only to reverse opioid effects; the EU authorised it, taken as needed, to reduce drinking in adults at a high drinking-risk level (men &gt;60 g/day, women &gt;40 g/day). [[KranzlerSoyka2018,vandenBrink2013Nalmefene]]</dd></div><div><dt>Trials</dt><dd>ESENSE 1: 2.3 fewer heavy drinking days a month than placebo at month 6 and 11.0 g/day less alcohol. ESENSE 2: 1.7 fewer heavy days; the fall in total alcohol was not significant. Reviewers called the approval controversial because the efficacy evidence came from a retrospectively defined subgroup. [[Mann2013ESENSE1,Gual2013ESENSE2,KranzlerSoyka2018]]</dd></div>`},
 {n:'Sodium oxybate',reg:'Italy, Austria: approved',st:'Cochrane · 13 RCTs',lv:3,eff:['Abstinence RR 5.35 (Cochrane)','Misuse risk; sedative with alcohol'],ev:'early',rev:.64,
  det:`<div><dt>Status</dt><dd>Approved in Italy since 1991 and Austria since 1999 for alcohol withdrawal and maintaining abstinence. [[Guiraud2022SMO]]</dd></div><div><dt>Evidence</dt><dd>Cochrane 2010 (13 RCTs, 11 from Italy): better than placebo at mid-term for abstinence (RR 5.35, 1.28–22.4) and relapse (RR 0.36), with concern about addiction or misuse. An international RCT (n=314) found 43.1 more days of cumulative abstinence in the prespecified analysis. It is a central nervous system depressant: with alcohol or other sedatives it is a safety concern. [[Leone2010Cochrane,Guiraud2022SMO]]</dd></div>`},
 {n:'Varenicline',reg:'Not FDA-approved for AUD',st:'One RCT · n=200',lv:1,eff:['% heavy drinking days −10.4 points','Similar in smokers and non-smokers'],ev:'early',rev:.76,
  det:`<div><dt>Trial</dt><dd>13 weeks, titrated to 2 mg/day as published: lower weekly percent heavy drinking days than placebo (adjusted mean difference 10.4), with fewer drinks per day and less craving, and similar effects in smokers and non-smokers. [[Litten2013Varenicline]]</dd></div>`},
 {n:'Ondansetron',reg:'Not FDA-approved for AUD',st:'Two RCTs · n=271, 283',lv:2,eff:['LL genotype: +11.27% days abstinent','Early-onset AUD: 70.1% vs 50.2%'],ev:'early',rev:.83,
  det:`<div><dt>Trials</dt><dd>In early-onset AUD (n=271, 11 weeks), percent days abstinent was 70.10 vs 50.20 on placebo. In a genotype trial (n=283), people with the 5-HTT LL genotype on ondansetron had 1.62 fewer drinks per drinking day and 11.27% more days abstinent. <span class="ev early">Early evidence</span> [[Johnson2000JAMA,Johnson2011Ondansetron]]</dd></div>`},
 {n:'Prazosin',reg:'Not FDA-approved for AUD',st:'One RCT · n=92',lv:1,eff:['Drinks and heavy days fell faster','More drowsiness and oedema'],ev:'early',rev:.90,
  det:`<div><dt>Trial</dt><dd>92 people without PTSD, 12 weeks: drinks and heavy drinking days fell faster than on placebo, with more drowsiness and oedema. A related medicine, doxazosin (n=41), showed no overall difference, reducing drinking only in people with a dense family history of AUD. <span class="ev early">Early evidence</span> [[Simpson2018Prazosin,Kenna2016Doxazosin]]</dd></div>`}
];
const OL_STEPS=[
 {from:0,at:.1,k:'Row 1 of 8',t:'Topiramate',
  txt:`An anticonvulsant thought to reduce alcohol's reinforcing effects by boosting GABA and inhibiting glutamate pathways. <span class="ev hyp">Hypothesis</span> Several RCTs and a meta-analysis show less heavy drinking and more abstinence. [[Johnson2007Topiramate,Blodgett2014Topiramate]]`,
  pt:`Topiramate, a seizure and migraine medicine, helps some people drink less, but tingling hands and feet are common.`,
  hook:`Topiramate's signature side effect: paresthesia (50.8% vs 10.6%). [[Johnson2007Topiramate]]`},
 {from:.19,at:.28,k:'Row 2 of 8',t:'Gabapentin',
  txt:`Positive single-site trials, including one in people with withdrawal symptoms, sit beside a negative multisite trial of the prodrug. The APA guideline places it, with topiramate, as an option for people who prefer it or for whom the approved medicines did not work. [[Mason2014Gabapentin,Anton2020Gabapentin,Falk2019GabapentinEnacarbil,Reus2018APA,Kranzler2019Gabapentin]]`,
  pt:`Gabapentin may help, especially for people whose withdrawal symptoms linger, but it can be misused and the trials are mixed.`,
  hook:`Gabapentin dose-response (Mason 2014): 17.0% abstinent at 1,800 mg/day vs 4.1% on placebo. [[Mason2014Gabapentin]]`},
 {from:.37,at:.46,k:'Row 3 of 8',t:'Baclofen',
  txt:`A GABA-B agonist with the only randomised trial in people with cirrhosis among these medicines, and a Cochrane review showing fewer relapses. High-dose trials disagree. [[Addolorato2007Lancet,Agabio2023Cochrane,Rigal2020Bacloville,Reynaud2017Alpadir]]`,
  pt:`Baclofen, a muscle relaxant, can help some people stay off alcohol, including people with liver scarring; it causes sleepiness.`,
  hook:`Baclofen in cirrhosis: 71% vs 29% achieved and kept abstinence over 12 weeks (Addolorato 2007). [[Addolorato2007Lancet]]`},
 {from:.55,at:.70,k:'Rows 4–5 of 8',t:'Approved elsewhere',
  txt:`Nalmefene is authorised in the EU to reduce drinking; sodium oxybate is approved in Italy and Austria. Neither is approved for AUD in the US. Both decisions rest on trials whose interpretation is debated: a post-hoc subgroup for nalmefene, misuse risk for sodium oxybate. [[vandenBrink2013Nalmefene,KranzlerSoyka2018,Guiraud2022SMO,Leone2010Cochrane]]`,
  pt:`Different countries approve different medicines for AUD. A medicine available in one country may not be approved in another.`,
  hook:`Nalmefene: EU-approved, taken as needed, with reduced drinking as its goal. [[vandenBrink2013Nalmefene,Mann2013ESENSE1]]`},
 {from:.75,at:.97,k:'Rows 6–8 of 8',t:'Smaller trials',
  txt:`Varenicline, ondansetron and prazosin each have one or two randomised trials. Ondansetron's effect depended on genotype and age of onset, a lead for personalised treatment that has not been confirmed. <span class="ev early">Early evidence</span> [[Litten2013Varenicline,Johnson2011Ondansetron,Simpson2018Prazosin]]`,
  pt:`These medicines showed promise in a trial or two. That is a reason to study them more, not yet a reason to rely on them.`,
  hook:`Varenicline (a smoking-cessation medicine) cut heavy drinking days in smokers and non-smokers alike. [[Litten2013Varenicline]]`}
];
const OL_AG=['Topiramate','Gabapentin','Baclofen','Nalmefene','Sodium oxybate','Varenicline','Ondansetron','Prazosin','Doxazosin','Naltrexone (OPRM1)'];
const OL_FILT={
 liver:{ag:['Baclofen','Gabapentin','Topiramate'],li:[`<b>Baclofen</b>: the RCT in cirrhosis (84 people, 12 weeks) found 71% vs 29% achieved and kept abstinence, with no hepatic side effects recorded. The ACG calls it the non-FDA-approved medicine most studied in advanced liver disease. [[Addolorato2007Lancet,Jophlin2024ACG]]`,`<b>Gabapentin and topiramate</b>: acceptable safety in alcohol-associated liver disease (ACG), but large prospective trials are needed. In a biobank cohort, gabapentin was associated with less hepatic decompensation in cirrhosis (aOR 0.36), an observational association, not proof of cause. <span class="ev early">Early evidence</span> [[Jophlin2024ACG,Vannier2022]]`]},
 smoke:{ag:['Varenicline'],li:[`<b>Varenicline</b>: in the 200-person trial, the fall in heavy drinking days was similar in smokers and non-smokers. [[Litten2013Varenicline]]`]},
 wd:{ag:['Gabapentin','Sodium oxybate'],li:[`<b>Gabapentin</b>: in people with recent withdrawal symptoms (n=90), 27% vs 9% had no heavy drinking days; the benefit appeared only in the high-withdrawal subgroup (NNT 3.1). [[Anton2020Gabapentin]]`,`<b>Sodium oxybate</b>: approved in Italy and Austria for alcohol withdrawal and maintaining abstinence. [[Guiraud2022SMO]]`,`Withdrawal itself needs medical care: get medical help to stop safely. See <a href="#" data-go="detox">managing withdrawal safely</a>.`]},
 ptsd:{ag:[],li:[`No trial in people with PTSD is summarised in this guide's sources. The prazosin trial summarised here enrolled 92 people <i>without</i> PTSD: drinks and heavy drinking days fell faster than on placebo. [[Simpson2018Prazosin]]`]},
 reduce:{ag:['Nalmefene','Topiramate','Baclofen'],li:[`<b>Nalmefene</b>: its EU authorisation is to reduce drinking in people at a high drinking-risk level. [[vandenBrink2013Nalmefene]]`,`<b>Topiramate</b>: in heavy drinkers aiming to cut down (n=138), it reduced heavy drinking days. [[Kranzler2014GRIK1]]`,`<b>Baclofen</b>: in Bacloville, 57% vs 36% reached no or low-risk drinking in the last month. [[Rigal2020Bacloville]]`]},
 gene:{ag:['Ondansetron','Topiramate','Doxazosin','Naltrexone (OPRM1)'],li:[`<b>Ondansetron</b>: benefit in people with the 5-HTT LL genotype. [[Johnson2011Ondansetron]]`,`<b>Topiramate</b>: in European-American participants the effect appeared only in GRIK1 rs2832407 C-allele homozygotes. [[Kranzler2014GRIK1]]`,`<b>Doxazosin</b>: reduced drinking only with a dense family history of AUD and increased it with a sparse one. [[Kenna2016Doxazosin]]`,`<b>Naltrexone and OPRM1</b>: positive retrospective analyses, a negative prospective trial; gene testing to choose a medicine is not supported. <span class="ev early">Early evidence</span> [[Anton2008OPRM1,Oslin2015JAMAPsych,KranzlerSoyka2018]]`]}
};
const OL_GABA={abst:{t:'Complete abstinence',v:[4.1,11.1,17.0],nnt:'NNT 8 at 1,800 mg/day'},nohd:{t:'No heavy drinking',v:[22.5,29.6,44.7],nnt:'NNT 5 at 1,800 mg/day'}};
const OL_BAC=[ {n:'Cirrhosis RCT · 2007',s:'84 people · 12 weeks · abstinence',p:29,b:71,sig:1},{n:'Bacloville · 2020',s:'320 people · 12 months · no or low-risk drinking',p:36,b:57,sig:1},{n:'ALPADIR · 2017',s:'320 people · 20 weeks · abstinence',p:10.5,b:11.9,sig:0} ];
const OL_NMA=[ ['GHB (sodium oxybate)',1.90],['Baclofen',1.80],['Disulfiram',1.71],['Gabapentin',1.66],['Acamprosate',1.33],['Oral naltrexone',1.15] ];
function olChip(x,y,ev,o={}){const est=ev==='est',w=o.w||88;return `<rect x="${f1(x)}" y="${f1(y)}" width="${w}" height="17" rx="4" style="fill:${est?'var(--good-soft)':'var(--warn-soft)'};opacity:${o.op==null?1:o.op}"/><text x="${f1(x+w/2)}" y="${f1(y+12)}" class="t-xs t-mid" style="fill:${est?'var(--good)':'var(--warn)'};font-weight:700;opacity:${o.op==null?1:o.op}">${est?'ESTABLISHED':'EARLY EVIDENCE'}</text>`}
function olRungs(x,y,lv,a){let s='';for(let i=0;i<3;i++){const h=5+i*4;s+=`<rect x="${x+i*7}" y="${f1(y-h)}" width="5" height="${h}" rx="1" style="fill:${i<lv?'var(--rx)':'var(--panel-2)'};opacity:${f1(i<lv?a:1)}"/>`}return s}
inits.offlabel=()=>{
  /* ---- evidence ladder ---- */
  const svg=$('#olSvg'),rg=$('#olT');
  function draw(t){
    const N=vb(svg,'720 386','400 712');let s='',cur=0;
    OL_ROWS.forEach((r,i)=>{if(t>=r.rev)cur=i});
    if(!N){s+=`<text x="16" y="24" class="t-xs">MEDICINE · STATUS</text><text x="196" y="24" class="t-xs">STRONGEST EVIDENCE</text><text x="402" y="24" class="t-xs">HEADLINE RESULT</text><text x="618" y="24" class="t-xs">LABEL</text><line x1="10" x2="710" y1="32" y2="32" class="axis"/>`}
    else s+=`<text x="16" y="22" class="t-xs">MEDICINE · STATUS · EVIDENCE · RESULT</text><line x1="10" x2="390" y1="30" y2="30" class="axis"/>`;
    OL_ROWS.forEach((r,i)=>{const a=ramp(t,r.rev,r.rev+.05),ca=ramp(t,r.rev+.03,r.rev+.08);if(a<=0)return;
      const dx=(1-ease(a))*24,on=i===cur;
      if(!N){const y=36+i*43;
        s+=`<g transform="translate(${f1(dx)} 0)" style="opacity:${f1(a)}">`;
        if(on)s+=`<rect x="8" y="${y}" width="704" height="40" rx="8" style="fill:var(--rx-soft)"/>`;
        s+=`<text x="16" y="${y+17}" class="t-lbl">${r.n}</text><text x="16" y="${y+31}" class="t-xs">${r.reg}</text>`;
        s+=olRungs(196,y+28,r.lv,ca)+`<text x="222" y="${y+25}" class="t-xs" style="fill:var(--ink)">${r.st}</text>`;
        s+=`<text x="402" y="${y+17}" class="t-xs" style="fill:var(--ink)">${r.eff[0]}</text><text x="402" y="${y+31}" class="t-xs">${r.eff[1]}</text>`;
        s+=olChip(618,y+11,r.ev,{op:f1(ca)})+'</g>'}
      else{const y=36+i*84;
        s+=`<g transform="translate(${f1(dx)} 0)" style="opacity:${f1(a)}">`;
        if(on)s+=`<rect x="6" y="${y}" width="388" height="80" rx="8" style="fill:var(--rx-soft)"/>`;
        s+=`<text x="14" y="${y+18}" class="t-lbl">${r.n}</text>`+olChip(280,y+6,r.ev,{op:f1(ca),w:106});
        s+=`<text x="14" y="${y+33}" class="t-xs">${r.reg}</text>`;
        s+=olRungs(14,y+48,r.lv,ca)+`<text x="40" y="${y+47}" class="t-xs" style="fill:var(--ink)">${r.st}</text>`;
        s+=`<text x="14" y="${y+62}" class="t-xs" style="fill:var(--ink)">${r.eff[0]}</text><text x="14" y="${y+75}" class="t-xs">${r.eff[1]}</text></g>`}
    });
    svg.innerHTML=s;
    const p=phaseOf(OL_STEPS,t);setSt(p);
    rg.setAttribute('aria-valuetext',`Row ${cur+1} of 8: ${OL_ROWS[cur].n}`);
    $('#olNote').innerHTML=noteHTML(OL_STEPS[p])+`<div class="kv"><div><dt>Now showing</dt><dd><b>${OL_ROWS[cur].n}</b> ${OL_ROWS[cur].ev==='est'?'<span class="ev est">Established</span>':'<span class="ev early">Early evidence</span>'}</dd></div>${OL_ROWS[cur].det}</div>`;
  }
  const stop=playWire(rg,$('#olPlay'),draw,26000,'%t:player.replay%','offlabel');
  const setSt=stepWire($('#olSteps'),OL_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- situation filter ---- */
  const fs=$('#olFiltSvg');let fk='liver';
  function drawF(){const N=vb(fs,'720 110','400 230'),F=OL_FILT[fk];let s='';
    const cols=N?2:5,cw=N?186:138,ch=N?36:40,ox=N?10:12,oy=N?8:10;
    OL_AG.forEach((g,i)=>{const r=Math.floor(i/cols),c=i%cols,x=ox+c*(cw+(N?8:4)),y=oy+r*(ch+(N?8:10)),on=F.ag.includes(g);
      s+=`<rect x="${x}" y="${y}" width="${cw}" height="${ch}" rx="10" style="fill:${on?'var(--rx)':'var(--panel-2)'};stroke:${on?'var(--rx)':'var(--line)'}"/>`;
      s+=`<text x="${x+cw/2}" y="${y+ch/2+4.5}" class="t-lbl t-mid" style="fill:${on?'var(--on-brand)':'var(--muted)'};font-size:12.5px">${g}</text>`});
    fs.innerHTML=s;
    $('#olFiltList').innerHTML=F.li.map(l=>`<li>${l}</li>`).join('')}
  $$('[data-olf]').forEach(b=>b.addEventListener('click',()=>{fk=b.dataset.olf;$$('[data-olf]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawF()}));
  drawF();

  /* ---- gabapentin dose-response ---- */
  const gs=$('#olGabaSvg');let gk='abst',gv=OL_GABA.abst.v.slice(),stopG=null;
  function drawG(v){const N=vb(gs,'720 270','400 320'),D=OL_GABA[gk];let s='';
    const x0=N?50:90,x1=N?390:560,yb=N?260:220,yt=N?62:30,mx=50,Y=u=>yb-(yb-yt)*u/mx,bw=N?70:90,gap=(x1-x0)/3;
    [0,10,20,30,40,50].forEach(u=>{s+=`<line x1="${x0}" x2="${x1}" y1="${f1(Y(u))}" y2="${f1(Y(u))}" class="grid"/><text x="${x0-8}" y="${f1(Y(u)+3)}" class="t-xs t-end">${u}%</text>`});
    ['Placebo','900 mg/day','1,800 mg/day'].forEach((l,i)=>{const cx=x0+gap*(i+.5),h=yb-Y(v[i]);
      s+=`<rect x="${f1(cx-bw/2)}" y="${f1(yb-h)}" width="${bw}" height="${f1(h)}" rx="5" style="fill:${i?'var(--rx)':'var(--muted)'};opacity:${i===1?.6:1}"/>`;
      s+=`<text x="${f1(cx)}" y="${f1(yb-h-7)}" class="t-lbl t-mid">${v[i].toFixed(1)}%</text><text x="${f1(cx)}" y="${yb+16}" class="t-sm t-mid" style="fill:var(--ink)">${l}</text>`});
    s+=`<line x1="${x0}" x2="${x1}" y1="${yb}" y2="${yb}" class="axis"/>`;
    s+=`<text x="${x0}" y="${N?20:18}" class="t-sm" style="fill:var(--ink);font-weight:600">${D.t.toUpperCase()} · 12 WEEKS</text>`;
    if(!N){s+=`<text x="590" y="70" style="font:800 24px var(--display);fill:var(--rx)">${D.nnt.split(' at ')[0]}</text><text x="590" y="88" class="t-xs">at 1,800 mg/day vs placebo</text>`;
      s+=`<text x="590" y="122" class="t-xs">Adverse-event stops</text><text x="590" y="135" class="t-xs">did not differ</text><text x="590" y="148" class="t-xs">between groups</text>`}
    else s+=`<text x="390" y="42" class="t-sm t-end" style="fill:var(--rx);font-weight:700">${D.nnt.split(' at ')[0]} at 1,800 mg/d</text>`;
    gs.innerHTML=s;
    $('#olGabaNote').innerHTML=noteHTML({k:'Mason 2014 · 150 people · 12 weeks',t:`${D.t}: ${OL_GABA[gk].v.map(x=>x.toFixed(1)+'%').join(', ')}`,
      txt:`Complete abstinence was 4.1% on placebo, 11.1% at 900 mg/day and 17.0% at 1,800 mg/day (NNT 8); no heavy drinking was 22.5%, 29.6% and 44.7% (NNT 5). Sleep, mood and craving also improved with dose, and adverse-event terminations did not differ between groups. [[Mason2014Gabapentin]]`,
      pt:`In this one trial, more gabapentin meant more people stopped or cut down. One trial is not the last word: a larger multisite trial of a related prodrug was negative. [[Mason2014Gabapentin,Falk2019GabapentinEnacarbil]]`,
      hook:`A rising bar from placebo to the higher dose is a dose-response: one of the signs that an effect may be real. [[Mason2014Gabapentin]]`})}
  $$('[data-olg]').forEach(b=>b.addEventListener('click',()=>{gk=b.dataset.olg;$$('[data-olg]').forEach(x=>x.setAttribute('aria-pressed',x===b));
    const from=gv.slice(),to=OL_GABA[gk].v;stopG&&stopG();stopG=animate(700,p=>{gv=from.map((f,i)=>lerp(f,to[i],ease(p)));drawG(gv)},()=>{gv=to.slice();drawG(gv);stopG=null})}));
  drawG(gv);

  /* ---- baclofen dumbbells ---- */
  const bs=$('#olBacSvg');
  function drawB(){const N=vb(bs,'720 270','400 370');let s='';
    const x0=N?20:300,x1=N?380:690,X=u=>x0+(x1-x0)*u/100,rh=N?92:56,top=N?50:40;
    [0,25,50,75,100].forEach(u=>{s+=`<line x1="${f1(X(u))}" x2="${f1(X(u))}" y1="${top-10}" y2="${top+rh*3-8}" class="grid"/><text x="${f1(X(u))}" y="${top-14}" class="t-xs t-mid">${u}%</text>`});
    OL_BAC.forEach((r,i)=>{const y=top+i*rh,ly=N?y+14:y+14,dy=N?y+52:y+20;
      s+=`<text x="${N?20:16}" y="${ly}" class="t-lbl">${r.n}</text><text x="${N?20:16}" y="${ly+15}" class="t-xs">${r.s}</text>`;
      s+=`<line x1="${f1(X(r.p))}" x2="${f1(X(r.b))}" y1="${dy}" y2="${dy}" style="stroke:var(--rx);stroke-width:4;opacity:.45;stroke-linecap:round"/>`;
      s+=`<circle cx="${f1(X(r.p))}" cy="${dy}" r="7" style="fill:var(--muted)"/><circle cx="${f1(X(r.b))}" cy="${dy}" r="7" style="fill:var(--rx)"/>`;
      const close=Math.abs(r.b-r.p)<10;
      s+=`<text x="${f1(X(r.p)-(close?10:0))}" y="${dy+20}" class="t-xs ${close?'t-end':'t-mid'}">${r.p}%</text><text x="${f1(X(r.b)+(close?10:0))}" y="${dy+20}" class="t-xs ${close?'':'t-mid'}" style="fill:var(--rx);font-weight:700">${r.b}%${r.sig?'':' (n.s.)'}</text>`});
    const y=top+3*rh-(N?4:10);
    s+=`<text x="${N?20:16}" y="${y}" class="t-lbl">Dutch RCT · 2016</text>${(N?['151 people · no difference in time to first relapse;','only 15.5% reached 150 mg']:['151 people · no difference in time to first relapse; only 15.5% reached 150 mg']).map((l,k)=>`<text x="${N?20:16}" y="${y+15+k*13}" class="t-xs">${l}</text>`).join('')}`;
    const lx=N?220:x0,ly2=N?14:14;s+=`<circle cx="${lx}" cy="${ly2-4}" r="5" style="fill:var(--muted)"/><text x="${lx+9}" y="${ly2}" class="t-xs">placebo</text><circle cx="${lx+70}" cy="${ly2-4}" r="5" style="fill:var(--rx)"/><text x="${lx+79}" y="${ly2}" class="t-xs">baclofen</text>`;
    bs.innerHTML=s}
  drawB();

  /* ---- network meta-analysis ---- */
  const nm=$('#olNmaSvg');
  function drawM(){const N=vb(nm,'720 250','400 345');let s='';
    const x0=N?14:230,x1=N?340:660,X=r=>x0+(x1-x0)*(r-1)/1.1,rh=N?48:34,top=N?34:30;
    [1,1.25,1.5,1.75,2].forEach(r=>{s+=`<line x1="${f1(X(r))}" x2="${f1(X(r))}" y1="${top-8}" y2="${top+rh*6}" class="${r===1?'axis':'grid'}"/><text x="${f1(X(r))}" y="${top+rh*6+14}" class="t-xs t-mid">${r.toFixed(2)}</text>`});
    OL_NMA.forEach(([l,v],i)=>{const y=top+i*rh,by=N?y+16:y+4,appr=l==='Disulfiram'||l==='Acamprosate'||l==='Oral naltrexone';
      s+=`<text x="${N?x0:x0-10}" y="${N?y+10:y+16}" class="t-sm${N?'':' t-end'}" style="fill:var(--ink)">${l}${appr?' (US-approved)':''}</text>`;
      s+=`<rect x="${x0}" y="${by}" width="${f1(X(v)-x0)}" height="16" rx="4" style="fill:${appr?'var(--rx)':'var(--rx-soft)'};stroke:var(--rx)"/><text x="${f1(X(v)+6)}" y="${by+12}" class="t-sm" style="fill:var(--ink);font-weight:600">${v.toFixed(2)}</text>`});
    s+=`<text x="${x0}" y="${top-14}" class="t-xs">RISK RATIO FOR TOTAL ABSTINENCE VS PLACEBO</text>`;
    nm.innerHTML=s}
  drawM();
  const prevR=redraws.offlabel;redraws.offlabel=()=>{prevR&&prevR();drawF();drawG(gv);drawB();drawM()};
};
