/* =============== 3.3 Treating TB infection =============== */
/* the six regimens on one calendar. wk = length in weeks; doses as NTCA/CDC 2020 publishes them
   (9H and 3HR are worked out from months, so they carry approx). dr = drug strips, top to bottom. */
const TP_REG=[
 {id:'9H',s2:'isoniazid daily',sub:'isoniazid daily, 9 mo',wk:39,doses:270,approx:1,daily:1,dr:['--dH']},
 {id:'6H',s2:'isoniazid daily',sub:'isoniazid daily, 6 mo',wk:180/7,doses:180,daily:1,dr:['--dH']},
 {id:'4R',s2:'rifampicin daily',sub:'rifampicin daily, 4 mo',wk:120/7,doses:120,daily:1,dr:['--dR']},
 {id:'3HR',s2:'H + R daily',sub:'isoniazid + rifampicin, 3 mo',wk:13,doses:91,approx:1,daily:1,dr:['--dH','--dR']},
 {id:'3HP',s2:'H + P weekly',sub:'isoniazid + rifapentine weekly',wk:12,doses:12,daily:0,dr:['--dH','--dR']},
 {id:'1HP',s2:'H + P daily',sub:'isoniazid + rifapentine daily',wk:4,doses:28,daily:1,dr:['--dH','--dR']}
];
/* recommendation badges (WHO 2024 recs 19-20; NTCA/CDC 2020) */
const TP_REC={'9H':'WHO strong · CDC alt.','6H':'WHO strong · CDC alt.','4R':'WHO cond. · CDC pref.','3HR':'WHO strong · CDC pref.','3HP':'WHO strong · CDC pref.','1HP':'WHO conditional'};
/* trial outcomes per group. c = completion %, h = liver injury % (hl: what the second bar measures),
   ct/htx = text when only a difference or a different endpoint is published, src = trial, off = dimmed + why */
const TP_OUT={
 adult:{
  '9H':{c:69.0,h:2.7,hl:'liver injury',src:'PREVENT TB'},
  '6H':{h:.36,hl:'liver injury',ct:'no completion figure cited',src:'placebo trials (6 mo)'},
  '4R':{ct:'completion +15.1 pts vs 9H',htx:'liver (gr. 3–5) −1.2 pts vs 9H',src:'Menzies 2018'},
  '3HR':{ct:'no completion figure cited',htx:'',src:'—'},
  '3HP':{c:82.1,h:.4,hl:'liver injury',src:'PREVENT TB (DOT)'},
  '1HP':{c:97,h:6,hl:'serious AEs',src:'BRIEF TB (with HIV)'}},
 child:{
  '9H':{c:80.9,h:0,hl:'liver injury',src:'PREVENT TB, ages 2–17',x:'76.4% in the 4R trial'},
  '6H':{ct:'no paediatric figure cited',src:'—'},
  '4R':{c:85.3,src:'Diallo 2018',htx:'TB 0/422 vs 2/407 on 9H'},
  '3HR':{ct:'no paediatric figure cited',src:'—'},
  '3HP':{c:88.1,h:0,hl:'liver injury',src:'PREVENT TB, ages 2–17'},
  '1HP':{off:'no paediatric data in this guide’s sources'}},
 hiv:{
  '9H':{c:90,h:7,hl:'serious AEs',src:'BRIEF TB'},
  '6H':{ct:'TB or death 3.6 /100 py',src:'Martinson 2011 (no ART)'},
  '4R':{off:'CDC prefers 4R for HIV-negative people: rifampicin interacts with many antiretrovirals'},
  '3HR':{ct:'TB or death 2.9 /100 py',src:'Martinson 2011 (no ART)'},
  '3HP':{ct:'TB or death 3.1 /100 py',htx:'dolutegravir: no dose change',src:'Martinson 2011'},
  '1HP':{c:97,h:6,hl:'serious AEs',src:'BRIEF TB'}}
};
const TP_WK=40; /* the timeline runs 0..40 weeks */
const TP_GX={
 adult:'',
 child:` <b>Children:</b> in PREVENT TB's paediatric cohort (ages 2 to 17) no TB occurred among 471 children on 3HP against 3 of 434 on 9H, completion was 88.1% against 80.9%, and there was no liver injury in either arm. [[Villarino2015]]`,
 hiv:` <b>People with HIV:</b> WHO strongly recommends TPT for adults and adolescents living with HIV who are unlikely to have TB disease, including people on ART, pregnant women and people treated for TB before, even where tests for TB infection are not available. [[WHO-Mod1-2024]]`
};
const TP_STEPS=[
 {from:0,at:.01,k:'Before week 0',t:'Rule out TB disease',
  txt:`Preventive treatment is for TB infection only. Neither the skin test nor the blood test can tell infection from disease, so TB disease is excluded first: by symptoms and a chest X-ray, for example. [[Lewinsohn2017,WHO-Mod1-2024]] It matters in practice: in VQUIN, 1.5% of the people screened (61 of 3,948) already had TB disease. [[Fox2024VQUIN]] WHO 2024 lists 6H or 9H, 3HP and 3HR as strong recommendations, and 1HP or 4R as conditional alternatives, all regardless of HIV status. [[WHO-Mod1-2024]]`,
  gx:1,pt:`Before this medicine, the team checks you are not already ill with TB. If you are, you need full treatment instead.`,
  hook:`TPT only after TB disease is excluded. A one-drug or two-drug course would be too weak for disease.`},
 {from:3.8/TP_WK,at:4.3/TP_WK,k:'Week 4 · 28 doses',t:'1HP is done',
  txt:`One month of daily rifapentine plus isoniazid. In BRIEF TB (3,000 people with HIV, median CD4 470), TB or death was 0.65 per 100 person-years with 1HP against 0.67 with 9H. Completion was 97% against 90%, and serious adverse events 6% against 7%. [[Swindells2019]] No trial has compared 1HP with 3HP directly, and WHO lists 1HP as a conditional alternative. [[Swindells2019,WHO-Mod1-2024]]`,
  gx:1,pt:`The shortest course: one month of daily tablets. Almost everyone in the big trial finished it.`,
  hook:`1HP = 28 daily doses of isoniazid + rifapentine. BRIEF TB: non-inferior to 9H in people with HIV, completion 97%.`},
 {from:11.6/TP_WK,at:12.3/TP_WK,k:'Week 12 · 12 doses',t:'3HP: once a week',
  txt:`Twelve weekly doses of isoniazid plus rifapentine. In PREVENT TB (3HP by directly observed therapy against 9 months of self-given isoniazid), TB developed in 0.19% against 0.43%, completion was 82.1% against 69.0%, and liver injury 0.4% against 2.7%, although stopping for adverse events was 4.9% against 3.7%. [[Sterling2011]] Flu-like systemic reactions occurred in 3.5%, usually about 4 hours after a dose and after a median of 3 doses. [[Sterling2015]]`,
  gx:1,pt:`One visit or one dose a week for 12 weeks. Some people feel flu-ish for a day after a dose: tell your TB team.`,
  hook:`3HP = 12 weekly doses. Less liver injury than 9H (0.4% vs 2.7%) but more flu-like reactions (3.5%). Rifapentine is not rifampicin.`},
 {from:12.8/TP_WK,at:17.4/TP_WK,k:'Weeks 13–17',t:'3HR and 4R finish',
  txt:`3HR is 3 months of daily isoniazid plus rifampicin; 4R is 120 daily doses of rifampicin. [[Sterling2020]] In 6,859 adults in 9 countries, 4R was non-inferior to 9H for confirmed TB (rates differed by under 0.01 per 100 person-years), completion was 15.1 points higher and grade 3–5 liver injury 1.2 points lower. [[Menzies2018]] In 829 children, 4R completion was 85.3% against 76.4%. [[Diallo2018]] Across trials rifampicin caused less liver injury than isoniazid (RR 0.12). [[Sharma2013Cochrane]]`,
  gx:1,pt:`Four months of one medicine, or three months of two. Rifampicin turns urine and tears orange; that is expected and harmless.`,
  hook:`4R vs 9H (Menzies 2018): non-inferior, better completion, less hepatotoxicity. Rifampicin is a strong CYP3A4 inducer: check every other medicine.`},
 {from:25/TP_WK,at:26.4/TP_WK,k:'Week 26 · 180 doses',t:'6H: half a year',
  txt:`Six months of daily isoniazid, 180 doses. Against placebo in 73,375 people without HIV, isoniazid lowered TB risk to 0.40 of placebo; 6 months (RR 0.44) and 12 months (RR 0.38) did not differ significantly, and liver injury was 0.36% against 0.52%. [[Smieja2000]] In the IUAT trial, 24 weeks removed about two-thirds of the risk and prevented more cases per case of hepatitis caused than 52 weeks did. [[IUAT1982]]`,
  gx:1,pt:`Isoniazid alone works too, but it takes much longer, and longer courses are harder to finish.`,
  hook:`Isoniazid vs placebo: RR 0.40 (Smieja). 6 months ≈ 12 months. Give vitamin B6 to protect the nerves.`},
 {from:38.6/TP_WK,at:1,k:'Week 39 · about 270 doses',t:'9H, and why shorter wins',
  txt:`Nine months of daily isoniazid is the old comparator. Every newer regimen was tested against it, and the rifamycin regimens kept efficacy while improving completion and liver safety. [[Sterling2011,Menzies2018,Swindells2019]] In a network meta-analysis the odds ratios for TB against placebo were 0.65 for 6H, 0.53 for 3–4 months of rifampicin-isoniazid, 0.41 for rifampicin alone, and 0.36 for weekly rifapentine-isoniazid against no treatment. [[Zenner2017]] The isoniazid label's hepatitis rate rises with age, to 23 per 1,000 at 50 to 64. [[FDA-Isoniazid]]`,
  gx:1,pt:`All the courses work. The best one is the one a person can finish, with the fewest side effects for them.`,
  hook:`Shorter rifamycin TPT (3HP, 1HP, 4R, 3HR) ≈ isoniazid in efficacy, with higher completion and less liver injury.`}
];
/* cases-prevented calculator */
const TP_GRP={
 hh:{n:'adult household contact with TB infection',b:.024,per:'5 years',src:`5-year risk of incident TB (after co-prevalent disease found at screening) among 739 Amsterdam contacts with infection who did not start preventive treatment. [[Sloot2014]]`},
 hiv:{n:'person with HIV and a positive skin test',b:.079,per:'1 year',src:`7.9 cases per 100 person-years among HIV-positive people with a prior positive tuberculin test, before ART (Selwyn 1989), taken here as about 7.9% over a year. ART lowered TB incidence with a hazard ratio of 0.35 at any CD4 count. [[Selwyn1989,Suthar2012]]`},
 child:{n:'child under 5 with a positive infection test',b:.19,per:'2 years',src:`2-year cumulative TB incidence among child contacts under 5 with a positive infection test who were not given preventive treatment. [[Martinez2020Lancet]]`}
};
const TP_RRS={
 none:{rr:1,n:'no preventive treatment',src:''},
 h:{rr:.40,n:'isoniazid (11 placebo-controlled trials)',src:`[[Smieja2000]]`},
 h6:{rr:.65,n:'6H (network meta-analysis odds ratio)',src:`[[Zenner2017]]`},
 rh:{rr:.53,n:'3–4 months of rifampicin-isoniazid (odds ratio)',src:`[[Zenner2017]]`},
 r:{rr:.41,n:'rifampicin alone (odds ratio)',src:`[[Zenner2017]]`},
 hp:{rr:.36,n:'weekly rifapentine-isoniazid (odds ratio vs no treatment)',src:`[[Zenner2017]]`},
 obs:{rr:.09,n:'any preventive treatment in exposed children with a positive test (observational hazard ratio)',src:`[[Martinez2020Lancet]]`},
 lfx:{rr:.38,n:'6 months of levofloxacin for MDR/RR-TB contacts (WHO pooled)',src:`[[WHO-Mod1-2024]]`}
};

inits.tpt=()=>{
  const svg=$('#tpSvg'),rg=$('#tpT');let grp='adult';
  function rowOut(R,O,ox,y,N,s0){/* outcome bars or text for one finished regimen */
    let s='';const bw=N?150:70,lo=N?84:72;
    if(O.c!=null){s+=`<text x="${ox}" y="${y}" class="t-xs">completed</text><rect x="${ox+lo}" y="${y-8}" width="${bw}" height="9" rx="2" style="fill:var(--panel-2)"/><rect x="${ox+lo}" y="${y-8}" width="${f1(bw*O.c/100)}" height="9" rx="2" style="fill:var(--rx)"/><text x="${ox+lo+4+bw}" y="${y}" class="t-xs" style="fill:var(--ink)">${O.c}%</text>`}
    else if(O.ct)s+=`<text x="${ox}" y="${y}" class="t-xs" style="fill:var(--ink)">${O.ct}</text>`;
    const y2=y+(N?16:14);
    if(O.h!=null){const sc=O.hl==='serious AEs'?10:3;s+=`<text x="${ox}" y="${y2}" class="t-xs">${O.hl==='serious AEs'?'serious AE':'liver inj.'}</text><rect x="${ox+lo}" y="${y2-8}" width="${bw}" height="9" rx="2" style="fill:var(--panel-2)"/><rect x="${ox+lo}" y="${y2-8}" width="${f1(Math.max(O.h>0?1.5:0,bw*O.h/sc))}" height="9" rx="2" style="fill:var(--bad)"/><text x="${ox+lo+4+bw}" y="${y2}" class="t-xs" style="fill:var(--ink)">${O.h}%</text>`}
    else if(O.htx)s+=`<text x="${ox}" y="${y2}" class="t-xs">${O.htx}</text>`;
    if(O.src&&O.src!=='—')s+=`<text x="${ox}" y="${y2+(N?15:13)}" class="t-xs" style="font-style:italic">${O.src}${O.x?' · 9H '+O.x:''}</text>`;
    return s}
  function draw(t){
    const N=vb(svg,'720 410','400 790'),w=t*TP_WK;let s='';
    const L=N?{x0:16,x1:384,y0:56,dy:116}:{x0:150,x1:520,y0:62,dy:56};
    const X=k=>lerp(L.x0,L.x1,k/39.5);
    /* headers and week grid */
    if(!N)s+=`<text x="10" y="16" class="t-sm">REGIMEN</text><text x="${L.x0}" y="16" class="t-sm">CALENDAR · WEEKS</text><text x="534" y="16" class="t-sm">IN ITS TRIAL</text>`;
    else s+=`<text x="16" y="14" class="t-sm">ONE CALENDAR · WEEKS</text>`;
    const gy0=L.y0-(N?26:22),gy1=L.y0+L.dy*6-(N?10:24);
    [0,4,8,12,17,26,39].forEach(k=>{s+=`<line x1="${f1(X(k))}" x2="${f1(X(k))}" y1="${gy0}" y2="${gy1}" class="grid"/><text x="${f1(X(k))}" y="${gy1+14}" class="t-xs t-mid">${k}</text>`});
    s+=`<text x="${L.x1}" y="${gy1+28}" class="t-xs t-end">weeks · ${N?'':'1 month ≈ 4.3 weeks · '}playhead = today</text>`;
    const OUT=TP_OUT[grp];let done=[],taking=[];
    TP_REG.forEach((R,i)=>{const O=OUT[R.id],off=!!O.off,y=L.y0+i*L.dy,ry=N?y+34:y,op=off?.3:1;
      const fin=w>=R.wk,wk=Math.min(w,R.wk);
      const nd=R.daily?Math.min(R.doses,Math.floor(wk*7+(w>0?1:0))):Math.min(R.doses,Math.floor(wk)+(w>0?1:0)),nds=fin?R.doses:nd;
      if(!off){if(fin)done.push(R.id);else taking.push(R.id)}
      s+=`<g style="opacity:${op}">`;
      /* label */
      if(N){s+=`<text x="16" y="${y}" class="t-big">${R.id}</text><text x="${16+R.id.length*13+8}" y="${y}" class="t-xs" style="fill:var(--rx)">${TP_REC[R.id]}</text><text x="16" y="${y+16}" class="t-xs">${R.sub}</text><text x="384" y="${y+16}" class="t-xs t-end" style="fill:var(--ink)">dose ${R.approx?'≈':''}${nds}/${R.approx?'≈':''}${R.doses}</text>`}
      else{s+=`<text x="10" y="${y+5}" class="t-big">${R.id}</text><text x="10" y="${y+18}" class="t-xs">${R.s2}</text><text x="10" y="${y+30}" class="t-xs" style="fill:var(--ink)">dose ${R.approx?'≈':''}${nds} / ${R.approx?'≈':''}${R.doses}</text>`;
        s+=`<text x="${L.x0}" y="${y+20}" class="t-xs" style="fill:var(--rx)">${TP_REC[R.id]}</text>`}
      /* ribbon */
      const h=14,xe=X(R.wk),xn=X(wk),n=R.dr.length;
      s+=`<rect x="${L.x0}" y="${ry-h/2}" width="${f1(xe-L.x0)}" height="${h}" rx="4" style="fill:var(--panel-2);stroke:var(--line)"/>`;
      if(R.daily){R.dr.forEach((c,j)=>{if(xn>L.x0)s+=`<rect x="${L.x0}" y="${f1(ry-h/2+j*h/n)}" width="${f1(xn-L.x0)}" height="${f1(h/n)}" style="fill:var(${c});opacity:.85"/>`});
        for(let k=1;k<R.wk;k++)s+=`<line x1="${f1(X(k))}" x2="${f1(X(k))}" y1="${ry-h/2}" y2="${ry+h/2}" style="stroke:var(--panel);stroke-width:.7;opacity:.8"/>`}
      else{for(let k=0;k<R.doses;k++){const cx=X(k+.5),tk=w>=k;s+=tk?pill(cx,ry,9,'var(--dR)',{ang:-30}):`<circle cx="${f1(cx)}" cy="${ry}" r="3" style="fill:none;stroke:var(--muted);stroke-width:.8"/>`}}
      /* today's dose */
      if(!fin&&w>0&&!off)s+=pill(xn,ry-h/2-7,11,`var(${R.dr[R.dr.length-1]})`,{ang:-25});
      if(fin&&!off)s+=`<circle cx="${f1(xe)}" cy="${ry}" r="7" style="fill:var(--good)"/><path d="M${f1(xe-3.2)} ${ry}l2.2 2.4l4.2 -4.6" style="fill:none;stroke:var(--panel);stroke-width:1.8;stroke-linecap:round"/>`;
      /* outcome */
      const ox=N?16:534,oy=N?ry+24:y-4;
      if(off)s+=N?`<text x="${ox}" y="${oy}" class="t-xs" style="fill:var(--ink)">${O.off.length>64?O.off.slice(0,O.off.indexOf(':')):O.off}</text>`:wrapTp(O.off,ox,oy,27);
      else if(fin)s+=rowOut(R,O,ox,oy,N);
      else s+=`<text x="${ox}" y="${oy}" class="t-xs">${N?'':'finishes '}week ${Math.round(R.wk)}${N?' → outcome':''}</text>`;
      s+='</g>';
      if(off&&!N)s+=`<text x="${f1(L.x0+4)}" y="${ry+3}" class="t-xs" style="fill:var(--ink)">dimmed for this group</text>`});
    /* playhead */
    const xp=X(Math.min(w,39.5));
    s+=`<line x1="${f1(xp)}" x2="${f1(xp)}" y1="${gy0}" y2="${gy1}" style="stroke:var(--ink);stroke-width:1.3;opacity:.45"/><rect x="${f1(xp-23)}" y="${gy0-14}" width="46" height="13" rx="3" style="fill:var(--ink)"/><text x="${f1(xp)}" y="${gy0-4}" class="t-xs t-mid" style="fill:var(--bg)">wk ${f1(w)}</text>`;
    svg.innerHTML=s;
    const ph=phaseOf(TP_STEPS,t);setSt(ph);
    const P=Object.assign({},TP_STEPS[ph]);P.txt+=TP_GX[grp];$('#tpNote').innerHTML=noteHTML(P);
    $('#tpRead').innerHTML=`<span>week <b>${f1(w)}</b> · month <b>${f1(w/4.345)}</b></span><span>finished <b>${done.join(', ')||'none yet'}</b></span><span>still taking <b>${taking.join(', ')||'none'}</b></span><span>group <b>${{adult:'adults',child:'children',hiv:'people with HIV'}[grp]}</b></span>`;
  }
  function wrapTp(txt,x,y,n){const W=txt.split(' ');let line='',out='',k=0;W.forEach(wd=>{if((line+' '+wd).trim().length>n){out+=`<text x="${x}" y="${y+k*12}" class="t-xs" style="fill:var(--ink)">${line.trim()}</text>`;k++;line=wd}else line+=' '+wd});out+=`<text x="${x}" y="${y+k*12}" class="t-xs" style="fill:var(--ink)">${line.trim()}</text>`;return out}
  const stop=playWire(rg,$('#tpPlay'),draw,22000,'Replay','tpt');
  const setSt=stepWire($('#tpSteps'),TP_STEPS,rg,draw,stop);
  $$('[data-tpg]').forEach(b=>b.addEventListener('click',()=>{grp=b.dataset.tpg;$$('[data-tpg]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---- cases prevented, as an icon array of 1,000 ---- */
  const ic=$('#tpIcons'),sG=$('#tpG'),sR=$('#tpR'),cA=$('#tpArt');let shown={p:0,c:0},stopI=null;
  function calc(){const G=TP_GRP[sG.value],R=TP_RRS[sR.value],art=cA.checked&&sG.value==='hiv';
    const b=G.b*(art?.35:1),cases=Math.round(b*1000),left=Math.round(b*R.rr*1000),prev=cases-left;
    return {G,R,art,b,cases,left,prev,nnt:R.rr<1?1/(b*(1-R.rr)):null}}
  function drawI(p,c){const N=vb(ic,'720 312','400 620');let s='';
    const cols=N?25:50,cs=N?14.4:13.6,x0=N?20:22,y0=N?18:14;
    for(let i=0;i<1000;i++){const col=i%cols,row=Math.floor(i/cols),x=x0+col*cs,y=y0+row*cs;
      const f=i<p?'var(--rx)':i<p+c?'var(--tb)':'var(--fibro);opacity:.45';
      s+=`<circle cx="${f1(x+cs/2)}" cy="${f1(y+cs*.28)}" r="${f1(cs*.17)}" style="fill:${f}"/><rect x="${f1(x+cs*.26)}" y="${f1(y+cs*.48)}" width="${f1(cs*.48)}" height="${f1(cs*.42)}" rx="${f1(cs*.18)}" style="fill:${f}"/>`}
    const yb=y0+(1000/cols)*cs+16;
    s+=`<text x="${x0}" y="${yb}" class="t-xs">1,000 people · each figure = 1 person · ${N?'':'green first, then magenta, then grey'}</text>`;
    ic.innerHTML=s}
  function upd(e0){const r=calc();if(stopI)stopI();const p0=shown.p,c0=shown.c;
    if(e0===true){shown={p:r.prev,c:r.left};drawI(shown.p,shown.c)}else stopI=animate(700,k=>{const e=ease(k);shown={p:Math.round(lerp(p0,r.prev,e)),c:Math.round(lerp(c0,r.left,e))};drawI(shown.p,shown.c)},()=>{stopI=null});
    cA.disabled=sG.value!=='hiv';
    $('#tpRes').innerHTML=`<div class="mut"><small>Cases without TPT</small><span class="big-num">${r.cases}</span><span>per 1,000 over ${r.G.per}</span></div><div class="bad"><small>Cases with this regimen</small><span class="big-num">${r.left}</span><span>per 1,000</span></div><div><small>Cases prevented</small><span class="big-num">${r.prev}</span><span>per 1,000</span></div><div><small>Number needed to treat</small><span class="big-num">${r.nnt?Math.round(r.nnt):'—'}</span><span>${r.nnt?'to prevent one case':'no treatment chosen'}</span></div>`;
    $('#tpCalcCap').innerHTML=`<b>Baseline:</b> ${r.G.n}${r.art?', on ART (risk × 0.35)':''}: ${f1(r.b*100)}% over ${r.G.per}. ${r.G.src} <b>Effect:</b> ${r.R.n}${r.R.rr<1?', relative risk '+r.R.rr.toFixed(2):''}. ${r.R.src} Odds ratios are read as relative risks here, which is close when risk is low. Calculated for teaching, not reported by any one source.${sR.value==='obs'&&sG.value!=='child'?' <b>Note:</b> this effect size was measured in children, not in this group.':''}${sR.value==='lfx'?' <b>Note:</b> levofloxacin is for contacts of MDR/RR-TB; the baseline risks above come from contacts of drug-susceptible TB.':''}`}
  [sG,sR].forEach(e=>e.addEventListener('change',()=>upd()));cA.addEventListener('change',()=>upd());
  upd(true);
  const prevR=redraws.tpt;redraws.tpt=()=>{prevR&&prevR();drawI(shown.p,shown.c)};
};
