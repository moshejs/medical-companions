/* =============== 1.5 TB infection vs TB disease =============== */
/* The grid combines separate published estimates. Cumulative disease is the published
   lifetime risk for the group, distributed over time with the published shares of cases
   by 1, 2 and 5 years; self-clearance follows Emery 2021; the subclinical share of
   prevalent disease follows Frascella 2021. Each is cited where it is shown. */
const SC_RISK=[
 {id:'base',n:'No extra risk factor',tot:7.5,ymax:12,pts:[[0,0],[1,.45],[2,.62],[5,.83],[20,.97]],
  lab:'5–10% over a lifetime',
  src:`WHO's TB resource page stated that "on average, 5–10% of those who are infected will develop active TB disease over their lifetime"; a model of TB in England and Wales gave an age-weighted average of about 12%. The timing comes from contact and fingerprinting studies: 45% of cases by one year, 62% by two and 83% by five. [[Behr2018,Vynnycky2000]]`},
 {id:'recent',n:'Recently infected',tot:15,ymax:25,pts:[[0,0],[1,.45],[2,.62],[5,.83],[20,.97]],
  lab:'10–20% over a lifetime',
  src:`Modelling the lifetime risk of reactivation among people with a positive tuberculin skin test put it at 10–20% in people with recent skin-test conversion, and at 20% or more in most people with induration ≥10 mm who also have HIV or evidence of old healed TB. [[Horsburgh2004]]`},
 {id:'hiv',n:'Living with HIV, untreated',haz:.079,ymax:100,
  lab:'7.9 cases per 100 person-years',
  src:`In the founding prospective cohort, TB occurred at 7.9 cases per 100 person-years among people who were HIV-seropositive <b>and</b> tuberculin-positive, versus 0.3 per 100 person-years among seropositive people without a positive tuberculin test (rate ratio 24.0). Tuberculin positivity itself was no commoner in the HIV-positive group, so HIV raises the risk of <b>disease</b>, not of becoming infected. Antiretroviral therapy lowers TB incidence at every CD4 stratum (hazard ratio 0.35 overall), so this curve is the untreated case. [[Selwyn1989,Suthar2012]]`},
 {id:'child',n:'Children under 5, household contacts',tot:20,ymax:25,pts:[[0,0],[.25,.79],[2,.95],[20,1]],
  lab:'19.0% within 2 years',
  src:`In an individual-participant meta-analysis of children after close exposure, 2-year cumulative TB incidence among untreated child contacts with a positive infection test was highest under 5 years of age, at 19.0% (95% CI 8.4–37.4). 83% of all children under 5 who developed TB were diagnosed within 90 days of the baseline contact visit, so much of that risk is already present when the household is first screened. [[Martinez2020Lancet]]`}];
const SC_STEPS=[
 {from:0,at:.04,k:'Year 0',t:'100 people, one positive test',
  txt:`Everyone in this grid has a positive test for TB infection on the day we start. None of them is ill, none is infectious, and the test says only that their immune system has met the bacillus. Globally this group is enormous: modelling of 131 infection surveys put the burden of TB infection in 2014 at 23.0% of the world's population (95% UI 20.4–26.4), about 1.7 billion people, of whom 55.5 million had been infected within the previous two years. [[Houben2016,Coussens2024]]`,
  pt:`A positive TB test is not a diagnosis of TB. It means the body has met the germ at some point. Most people with a positive test never become unwell and cannot pass anything on.`,
  hook:`Global TB infection burden 2014: 23.0% of the world population, about 1.7 billion people; 55.5 million infected within 2 years. [[Houben2016]]`},
 {from:.14,at:.2,k:'Years 0–2',t:'The first two years do most of the work',
  txt:`Among untreated tuberculin-positive contacts in Amsterdam, 75% of TB cases occurred within one year of the index diagnosis and 97% within two, with the same timeline in every age group even though children and adolescents were at greater risk. Molecular fingerprinting gave a median incubation period of 1.3 years (95% CI 1.1–1.4), with 45%, 62% and 83% of cases occurring within one, two and five years. Poulsen, working in the Faroe Islands where exposure could be pinned to a two-week period, found the same: typically 3–9 months, almost always under two years. [[Behr2018]]`,
  pt:`If TB is going to develop, it usually does so soon — most often in the first year or two after infection. That is why contacts are followed up and offered preventive treatment quickly.`,
  hook:`75% of contact cases within 1 year, 97% within 2; median incubation 1.3 years; 45%/62%/83% by 1, 2 and 5 years. [[Behr2018]]`},
 {from:.36,at:.44,k:'Years 2–10',t:'Most never develop TB disease',
  txt:`The curve flattens hard. The commonly quoted lifetime risk is 5–10%; a model of TB in England and Wales over the last 50 years of the 20th century gave an age-weighted average of about 12%, highest after infection in early adulthood. Behr and colleagues conclude that there is no evidence of a bimodal curve separating primary progressive from reactivation TB, and that most cases occur within 18–24 months of infection. Very long intervals do happen — the most dramatic documented example is father-to-son transmission in Denmark with 33 years between infection and disease, confirmed by genome sequencing. [[Behr2018,Vynnycky2000]]`,
  pt:`Nine or more people in every ten with a positive test will never develop TB disease at all.`,
  hook:`No bimodal curve: most TB occurs within 18–24 months of infection, and the "5–10% lifetime" figure is an average across a lifetime, not a yearly risk. [[Behr2018]]`},
 {from:.58,at:.66,k:'Years 10–20',t:'And many clear the infection',
  txt:`A positive test can outlast the bacteria. In the large US isoniazid chemoprophylaxis trial, one year of treatment lowered TB incidence by 60–70% over the next nine years, yet treated people stayed tuberculin-positive up to nine years later — reactivity persisting at least nine years after the infection was eliminated. Pooling those experiments, Behr and colleagues estimate that between 1% and 11% of people with TB immunoreactivity still harbour viable bacteria capable of causing disease. Inferring self-clearance from post-mortem and tuberculin-reversion data gave 24.4% self-clearing within 10 years and 73.1% over a lifetime. [[Behr2019,Emery2021]]`,
  pt:`In many people the germs die out and only the immune memory remains, so the test stays positive while there is nothing left to treat.`,
  hook:`Pre-antibiotic autopsy series: 96–98% of calcified tuberculous lung lesions were sterile. Behr 2019: only 1–11% of people with immunoreactivity still harbour viable bacteria. <span class="ev early">Early evidence</span> [[Behr2018,Behr2019]]`},
 {from:.82,at:.92,k:'The whole 20 years',t:'Who these people are changes everything',
  txt:`Switch the group above the grid. HIV is the strongest known risk factor for progression; in the founding cohort, TB occurred at 7.9 cases per 100 person-years in people who were both HIV-positive and tuberculin-positive. Children under 5 who are household contacts carry a 2-year cumulative incidence of 19.0%, most of it within 90 days of the first contact visit. Recent conversion puts lifetime risk at 10–20%. And of the people who do have TB disease at any moment, roughly half would not report symptoms at all: across prevalence surveys a median 50.4% of bacteriologically confirmed TB was subclinical. [[Selwyn1989,Martinez2020Lancet,Horsburgh2004,Frascella2021]]`,
  pt:`The chance of becoming ill depends enormously on who you are. Young children and people with untreated HIV are at the highest risk, which is why they are offered preventive treatment first.`,
  hook:`Risk anchors: HIV + positive tuberculin test 7.9/100 person-years; child under 5 contact 19.0% at 2 years; recent conversion 10–20% lifetime; no extra risk 5–10% lifetime. [[Selwyn1989,Martinez2020Lancet,Horsburgh2004,Behr2018]]`}];
const SC_BAR=[
 {n:'Cleared',c:'var(--muted)',w:28,sv:'no viable bacteria left; the test can stay positive',d:'No viable bacteria left. Reactivity can outlast infection by at least nine years, and self-clearance is estimated at 24.4% within 10 years and 73.1% over a lifetime. [[Behr2019,Emery2021]]'},
 {n:'TB infection',c:'var(--accent)',w:40,sv:'viable bacteria, no pathology, not infectious',d:'Viable bacteria and a host response, but no macroscopic pathology: no symptoms, nothing to find in sputum, not infectious. [[Coussens2024,Drain2018]]'},
 {n:'Incipient',c:'var(--gold)',w:12,sv:'a changing immune signature before any disease',d:'Proposed between infection and disease: a blood transcriptomic signature predicted progression with 66.1% sensitivity and 80.6% specificity in the 12 months before diagnosis, and interferon signalling was already raised 18 months out. [[Drain2018,Zak2016,Scriba2017]]'},
 {n:'Subclinical TB',c:'var(--warn)',w:10,sv:'disease without reported symptoms',d:'Disease without reported symptoms. A median 50.4% of prevalent bacteriologically confirmed TB in national surveys was subclinical, and PET-CT found subclinical pulmonary abnormalities in 10 of 35 asymptomatic adults with HIV and TB infection, who were much likelier to progress. [[Frascella2021,Esmail2016]]'},
 {n:'TB disease',c:'var(--tb)',w:10,sv:'symptoms or signs, and likely infectious',d:'Symptoms or signs, and likely infectiousness. The consensus defines two subclinical and two clinical states, all requiring viable bacteria and a host response. [[Coussens2024]]'}];
const SC_VG=[
 {q:'A household contact of someone with pulmonary TB. No cough, no fever, feels completely well. IGRA positive, chest X-ray normal.',a:'inf',
  e:'<b>TB infection.</b> Disease is separated from infection by the presence of macroscopic pathology; here there is none. This person is not infectious and is a candidate for preventive treatment. [[Coussens2024,Drain2018]]'},
 {q:'Three weeks of cough, drenching night sweats and 6 kg of weight loss. Sputum Xpert MTB/RIF positive.',a:'dis',
  e:'<b>TB disease.</b> Symptoms plus bacteriological confirmation. Treatment is a multi-drug regimen, and the person is infectious until effective treatment takes hold. [[Coussens2024,Lewinsohn2017]]'},
 {q:'Found during a national prevalence survey by chest X-ray screening. Reports no symptoms at all. Sputum culture grows <i>M. tuberculosis</i>.',a:'dis',
  e:'<b>TB disease — subclinical.</b> Across national prevalence surveys a median 50.4% (36.1–79.7%) of bacteriologically confirmed TB was negative on symptom screening, and chest radiography detected 89% of it. Asking about symptoms alone would have missed this person. [[Frascella2021]]'},
 {q:'A person with HIV, not yet on antiretroviral therapy, with no symptoms. PET-CT shows pulmonary abnormalities.',a:'dis',
  e:'<b>TB disease — subclinical.</b> Among 35 asymptomatic, antiretroviral-naive adults with HIV-1 and TB infection, combined PET-CT identified 10 with abnormalities suggesting subclinical active disease, and those 10 were substantially more likely to progress to clinical disease. [[Esmail2016]]'},
 {q:'A tuberculin skin test is still positive nine years after a full year of isoniazid taken in the 1960s chemoprophylaxis trial.',a:'inf',
  e:'<b>Recorded as TB infection — but the test may be remembering only.</b> That year of isoniazid lowered TB incidence by 60–70% over the next nine years, yet people stayed tuberculin-positive throughout: reactivity persists at least nine years after the infection is eliminated. An estimated 1–11% of people with immunoreactivity still harbour viable bacteria. [[Behr2019]]'},
 {q:'A chest X-ray taken for another reason shows a small calcified nodule in the upper zone. The person feels well and has no symptoms.',a:'inf',
  e:'<b>TB infection, or an old healed lesion.</b> Inactive sequelae show as fibronodular opacities in the apical and upper zones, and stability over 6 months distinguishes inactive from active disease. In pre-antibiotic autopsy series, 96–98% of visible calcified tuberculous lung lesions were sterile. [[Nachiappan2017,Behr2018]]'}];
inits.spectrum=()=>{
  const svg=$('#scSvg'),rg=$('#scT');let scR=0,scSpec=true;
  const scYr=t=>20*t*t;
  const scPct=(R,y)=>{if(R.haz)return 100*(1-Math.exp(-R.haz*y));
    const P=R.pts;let f=1;for(let i=0;i<P.length-1;i++)if(y<=P[i+1][0]){f=lerp(P[i][1],P[i+1][1],(y-P[i][0])/(P[i+1][0]-P[i][0]));break}
    if(y>P[P.length-1][0])f=P[P.length-1][1];return R.tot*f};
  const scClear=y=>y<=10?lerp(0,24.4,y/10):lerp(24.4,73.1,clamp((y-10)/30));
  function draw(t){
    const N=vb(svg,'720 380','400 620'),R=SC_RISK[scR],y=scYr(t);
    const dis=scPct(R,y),sub=dis*.504,cle=Math.min(100-dis,scClear(y)*(100-dis)/100);
    const nD=Math.round(dis),nS=Math.round(sub),nC=Math.round(cle);
    const L=N?{gx:28,gy:72,cell:32,ps:23,lgy:418,lgw:186,cx0:56,cx1:380,cy0:470,cy1:558}
            :{gx:26,gy:68,cell:24,ps:17,lgy:344,lgw:176,cx0:366,cx1:694,cy0:96,cy1:296};
    let s='';
    s+=`<text x="${L.gx}" y="${N?34:30}" class="t-sm">100 PEOPLE WITH TB INFECTION AT YEAR 0</text>`;
    s+=`<text x="${L.gx}" y="${N?52:48}" class="t-lbl">${R.n} · year ${y<1?y.toFixed(1):Math.round(y)}</text>`;
    for(let i=0;i<100;i++){const col=i%10,row=Math.floor(i/10);
      const x=L.gx+col*L.cell+L.cell*.34,yy=L.gy+row*L.cell;
      let c='var(--accent)',op=1;
      if(i<nD-nS)c='var(--tb)';
      else if(i<nD)c='var(--warn)';
      else if(i>=100-nC){c='var(--muted)';op=.32}
      s+=person(x,yy,L.ps,c,{op:op})}
    const KEY=[['TB disease, symptoms','var(--tb)',nD-nS],['TB disease, subclinical','var(--warn)',nS],['TB infection','var(--accent)',100-nD-nC],['cleared','var(--muted)',nC]];
    KEY.forEach(([n,c,v],i)=>{const yy=L.lgy+(i%2)*19,xx=L.gx+Math.floor(i/2)*L.lgw;
      s+=`<circle cx="${f1(xx+6)}" cy="${f1(yy-4)}" r="5" style="fill:${c};opacity:${c==='var(--muted)'?.4:1}"/>`;
      s+=`<text x="${f1(xx+18)}" y="${f1(yy)}" class="t-xs">${n} · <tspan style="fill:var(--ink);font-weight:700">${Math.max(0,v)}</tspan></text>`});
    /* the cumulative curve */
    const X=yy=>lerp(L.cx0,L.cx1,Math.sqrt(yy/20)),Y=p=>lerp(L.cy1,L.cy0,clamp(p/R.ymax));
    s+=`<rect x="${f1(L.cx0)}" y="${f1(L.cy0)}" width="${f1(X(2)-L.cx0)}" height="${f1(L.cy1-L.cy0)}" style="fill:var(--tb);opacity:.08"/>`;
    s+=`<text x="${f1((L.cx0+X(2))/2)}" y="${f1(L.cy0+12)}" class="t-xs t-mid" style="fill:var(--tb)">first 2 years</text>`;
    [0,1,2,5,10,20].forEach(yy=>{s+=`<line x1="${f1(X(yy))}" x2="${f1(X(yy))}" y1="${L.cy0}" y2="${L.cy1}" class="grid"/><text x="${f1(X(yy))}" y="${f1(L.cy1+16)}" class="t-xs t-mid">${yy}</text>`});
    s+=`<text x="${f1(L.cx1)}" y="${f1(L.cy1+32)}" class="t-xs t-end">years since infection</text>`;
    const ticks=R.ymax>50?[0,25,50,75,100]:R.ymax>15?[0,5,10,15,20,25]:[0,3,6,9,12];
    ticks.forEach(p=>{if(p>R.ymax)return;s+=`<line x1="${L.cx0}" x2="${L.cx1}" y1="${f1(Y(p))}" y2="${f1(Y(p))}" class="grid"/><text x="${f1(L.cx0-6)}" y="${f1(Y(p)+3)}" class="t-xs t-end">${p}%</text>`});
    s+=`<line x1="${L.cx0}" x2="${L.cx0}" y1="${L.cy0}" y2="${L.cy1}" class="axis"/><line x1="${L.cx0}" x2="${L.cx1}" y1="${L.cy1}" y2="${L.cy1}" class="axis"/>`;
    s+=`<text x="${L.cx0}" y="${f1(L.cy0-26)}" class="t-sm">CUMULATIVE TB DISEASE</text>`;
    s+=`<text x="${L.cx0}" y="${f1(L.cy0-12)}" class="t-xs">${R.lab}</text>`;
    if(scR!==0){let d0='';for(let i=0;i<=60;i++){const yy=20*i/60;d0+=(i?'L':'M')+f1(X(yy))+' '+f1(Y(scPct(SC_RISK[0],yy)))}
      s+=`<path d="${d0}" style="fill:none;stroke:var(--muted);stroke-width:1.4;stroke-dasharray:4 3;opacity:.7"/>`;
      s+=`<text x="${f1(X(20))}" y="${f1(Y(scPct(SC_RISK[0],20))-6)}" class="t-xs t-end" style="fill:var(--muted)">no extra risk</text>`}
    let d='';for(let i=0;i<=60;i++){const yy=y*i/60;d+=(i?'L':'M')+f1(X(yy))+' '+f1(Y(scPct(R,yy)))}
    s+=`<path d="${d}" style="fill:none;stroke:var(--tb);stroke-width:2.6;stroke-linejoin:round"/>`;
    s+=`<circle cx="${f1(X(y))}" cy="${f1(Y(dis))}" r="5" style="fill:var(--tb)"/>`;
    s+=`<text x="${f1(clamp(X(y),L.cx0+30,L.cx1-30))}" y="${f1(Y(dis)-12)}" class="t-lbl t-mid" style="fill:var(--tb)">${dis.toFixed(1)}%</text>`;
    svg.innerHTML=s;
    const p=phaseOf(SC_STEPS,t);setSt(p);
    rg.setAttribute('aria-valuetext',`year ${y.toFixed(1)}: ${dis.toFixed(1)}% with TB disease`);
    $('#scRead').innerHTML=`<span>year <b>${y<1?y.toFixed(1):Math.round(y)}</b></span><span>TB disease <b>${nD} of 100</b></span><span>of them subclinical <b>${nS}</b></span><span>infection cleared <b>${nC}</b></span>`;
    $('#scNote').innerHTML=noteHTML(SC_STEPS[p])
      +`<div class="kv"><div><dt>${R.n}</dt><dd>${R.src}</dd></div>
        <div><dt>How this grid is built</dt><dd>The magenta and amber icons together are the published cumulative risk of TB disease for this group, spread over time by the published shares of cases at 1, 2 and 5 years; amber is the median 50.4% of confirmed TB that is subclinical in prevalence surveys; grey is self-clearance from Emery 2021 <span class="ev early">Early evidence</span>. Each estimate comes from a different study, so the grid is a teaching composite, not one cohort. [[Behr2018,Frascella2021,Emery2021]]</dd></div></div>`;
  }
  const stop=playWire(rg,$('#scPlay'),draw,24000,'%t:player.replay%','spectrum');
  const setSt=stepWire($('#scSteps'),SC_STEPS,rg,draw,stop);
  $$('[data-sr]').forEach(b=>b.addEventListener('click',()=>{scR=+b.dataset.sr;
    $$('[data-sr]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---- two boxes, or a spectrum? ---- */
  const bs=$('#scBar');
  function drawB(){
    const N=vb(bs,'720 330','400 420'),x0=N?16:24,x1=N?384:696,by=N?40:54,bh=N?34:40;
    let s='',s2='';
    s+=`<text x="${x0}" y="${N?22:26}" class="t-sm">${scSpec?'THE SPECTRUM AS DESCRIBED IN THE LITERATURE':'THE OLD TWO-BOX MODEL'}</text>`;
    if(!scSpec){
      [['"Latent TB"','var(--accent)',62],['"Active TB"','var(--tb)',38]].forEach(([n,c,w],i)=>{
        const bx=x0+(i?(x1-x0)*.62:0),bw=(x1-x0)*w/100-4;
        s+=`<rect x="${f1(bx)}" y="${by}" width="${f1(bw)}" height="${bh}" rx="8" style="fill:${c};fill-opacity:.25;stroke:${c};stroke-width:1.6"/>`;
        s+=`<text x="${f1(bx+bw/2)}" y="${f1(by+bh/2+5)}" class="t-lbl t-mid" style="fill:${c}">${n}</text>`});
      ['Everyone is in one box or the other.','No room for someone who has cleared the bacteria, for someone whose immune signature is already changing,','or for someone with culture-positive TB who reports no symptoms at all.'].forEach((t2,k)=>
        s+=`<text x="${x0}" y="${f1(by+bh+34+k*18)}" class="t-lbl">${t2}</text>`);
      s2=`<div class="kicker">The two-box model</div><h4>Latent or active</h4><p>The active-versus-latent dichotomy has been replaced by a continuum of metabolic bacterial activity and antagonistic immune responses, for which two further clinical states — incipient TB and subclinical TB — have been proposed between TB infection and TB disease. [[Drain2018]]</p><div class="pt"><b>%t:note.plain%</b>Being infected and being ill are not two neat boxes. People move along a range, and can move back along it.</div>`;
    }else{
      let acc=0;const tot=SC_BAR.reduce((a,b)=>a+b.w,0);
      SC_BAR.forEach((B,i)=>{const bx=x0+(x1-x0)*acc/tot,bw=(x1-x0)*B.w/tot-3;acc+=B.w;
        s+=`<rect x="${f1(bx)}" y="${by}" width="${f1(bw)}" height="${bh}" rx="8" style="fill:${B.c};fill-opacity:.25;stroke:${B.c};stroke-width:1.6"/>`;
        s+=`<text x="${f1(bx+bw/2)}" y="${f1(by+bh+16+(i%2)*14)}" class="t-xs t-mid" style="fill:${B.c};font-weight:700">${B.n}</text>`;
        if(i<2)s+=`<text x="${f1(bx+bw/2)}" y="${f1(by+bh/2+5)}" class="t-lbl t-mid" style="fill:${B.c}">${i?'no pathology':'no bacteria'}</text>`});
      s+=`<path d="M${x0} ${f1(by+bh+44)}H${x1}" style="stroke:var(--line)"/>`;
      s+=`<text x="${x0}" y="${f1(by+bh+62)}" class="t-xs">no viable bacteria</text>`;
      s+=`<text x="${f1(x1)}" y="${f1(by+bh+62)}" class="t-xs t-end">symptoms, and likely infectious</text>`;
      SC_BAR.forEach((B,i)=>{const yy=by+bh+90+i*(N?44:32);
        s+=`<circle cx="${x0+6}" cy="${f1(yy-4)}" r="5" style="fill:${B.c}"/>`;
        s+=`<text x="${x0+18}" y="${f1(yy)}" class="t-lbl" style="fill:${B.c}">${B.n}</text>`;
        s+=`<text x="${x0+(N?18:150)}" y="${f1(yy+(N?16:0))}" class="t-xs">${B.sv}</text>`});
      s2=`<div class="kicker">The spectrum</div><h4>Five states, not two</h4>`+SC_BAR.map(B=>`<p><b style="color:${B.c}">${B.n}.</b> ${B.d}</p>`).join('')
        +`<div class="hook"><b>%t:note.hook%</b>The ICE-TB Delphi consensus (71 participants) distinguishes disease from infection by macroscopic pathology, defines two subclinical and two clinical states differentiated by reported symptoms or signs and by likely infectiousness, and requires viable <i>M. tuberculosis</i> plus a host response for every state. [[Coussens2024]]</div>`;
    }
    bs.innerHTML=s;$('#scBarNote').innerHTML=s2;
  }
  $('#scSpec').addEventListener('click',()=>{scSpec=!scSpec;
    $('#scSpec').setAttribute('aria-pressed',scSpec);
    $('#scSpec').textContent=scSpec?'Show the two-box model':'Show the spectrum';drawB()});
  drawB();
  const prevR=redraws.spectrum;redraws.spectrum=()=>{prevR&&prevR();drawB()};

  /* ---- which is it? ---- */
  $('#scQuiz').innerHTML=SC_VG.map((V,i)=>`<div class="card"><span class="kicker">Vignette ${i+1}</span><p class="q">${V.q}</p>
    <div class="ctrls"><button class="btn" data-sq="${i}" data-sa="inf" aria-pressed="false">TB infection</button><button class="btn" data-sq="${i}" data-sa="dis" aria-pressed="false">TB disease</button></div>
    <div class="ans" id="scA${i}" hidden></div></div>`).join('');
  $('#scQuiz').addEventListener('click',e=>{const b=e.target.closest('[data-sq]');if(!b)return;
    const i=+b.dataset.sq,V=SC_VG[i],ok=b.dataset.sa===V.a,el=$('#scA'+i);
    $$(`[data-sq="${i}"]`).forEach(x=>x.setAttribute('aria-pressed',x===b));
    el.hidden=false;el.className='ans '+(ok?'right':'wrong');
    el.innerHTML=`<b>${ok?'Yes.':'Not quite.'}</b>${V.e}`});
};
