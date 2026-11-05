/* =============== 2.2 a relapse, week by week =============== */
/* the time axis gives the first 4 weeks 40% of the width */
const rlW=w=>w<=4?.4*w/4:.4+.6*(w-4)/22, rlU=u=>u<=.4?u*10:4+(u-.4)/.6*22;
const RL_RES=.18;
const RL_SYM={
 off:w=>w<=0?0:w<1?ease(w):w<1.5?1:RL_RES+(1-RL_RES)*Math.exp(-(w-1.5)/4.5),
 on:w=>w<=.43?RL_SYM.off(w):w<.9?lerp(RL_SYM.off(.43),.86,ease((w-.43)/.47)):RL_RES+(.86-RL_RES)*Math.exp(-(w-.9)/2.4),
 sev:w=>w<=0?0:w<1?ease(w):w<4.2?1-.05*ramp(w,1.5,4.2):.35+.6*Math.exp(-(w-4.2)/4),
 sevNo:w=>w<4.2?RL_SYM.sev(w):.95-.2*ramp(w,4.2,26),
 pseudo:w=>.55*ramp(w,.04,.12)*(1-ramp(w,.45,.62))
};
const rlFever=w=>ramp(w,.02,.1)*(1-ramp(w,.42,.58));
const rlGd=w=>ramp(w,-.05,.2)*(1-ramp(w,1.6,3.3));
const RL_B1={from:0,at:rlW(.35),k:'Days 0–3',t:'Symptoms build',
  txt:`New inflammation strips myelin and blocks conduction, the main cause of negative symptoms such as weakness, numbness or loss of vision. To count as a relapse, symptoms must last at least 24 hours without fever or infection (McDonald 2010 panel); NICE NG220 adds a stable period of at least 1 month before. A new lesion can enhance with gadolinium on MRI. [[Smith1999,Polman2011,NICE2022]]`,
  pt:`Over a day or a few days, a symptom appears or an old one gets clearly worse, and it does not go away after a day.`,
  hook:`Relapse = more than 24 h, no fever or infection, after at least 1 month of stability (NICE NG220).`};
const RL_STEPS={
 rel:[RL_B1,
  {from:rlW(.42),at:rlW(1),k:'Weeks 1–2',t:'Peak, and the steroid window',
   txt:`NICE NG220 recommends oral methylprednisolone 0.5 g daily for 5 days for relapses that affect usual tasks, as early as possible and within 14 days of onset, with IV methylprednisolone 1 g daily for 3–5 days as an alternative. In COPOUSEP, oral methylprednisolone (1000 mg/day for 3 days) was non-inferior to IV: 81% vs 80% improved at day 28. In a Cochrane review, steroids or ACTH made worsening or non-improvement within 5 weeks less likely (OR 0.37). Enhancement is short-lived: a mean 3.07 weeks, median 2. [[NICE2022,LePage2015,Filippini2000,Cotton2003]]`,
   pt:`Symptoms are at their worst in the first week or two. Steroids, when used, are a short course started early.`,
   hook:`Steroids speed recovery. The ONTT found no better visual acuity at 6 months, and Cochrane found too few data to judge long-term disability. [[Beck1992,Filippini2000]]`},
  {from:rlW(2),at:rlW(5),k:'Weeks 2–8',t:'Recovery',
   txt:`As inflammation resolves, conduction returns: through remyelination, through conduction restored along fibres that stay demyelinated, or both. The lesion stops enhancing within weeks. In the Optic Neuritis Treatment Trial, IV methylprednisolone gave faster recovery, while oral prednisone at 1 mg/kg alone did no better than placebo and raised the risk of new optic neuritis (RR 1.79). [[Smith1999,Cotton2003,Beck1992]]`,
   pt:`Over the following weeks most people get much better, as the inflammation settles and the nerve fibres start working again.`,
   hook:`ONTT: low-dose oral prednisone alone increased optic neuritis recurrence. The difference is dose, not route.`},
  {from:rlW(8),at:rlW(20),k:'Months 2–6',t:'What remains',
   txt:`In CombiRx (240 first relapses), median time to recovery was 111 days; of those who recovered, 80% had done so by 180 days and 94% by 365 days. Recovery is often incomplete: in pooled placebo arms 42% of patients had a residual deficit of at least 0.5 EDSS point and 28% of at least 1.0 point after a relapse; in a Welsh series of 279 relapses, 49.4% and 32.7%. With or without steroids, the curves end in the same place here, as in the ONTT, where acuity at 6 months was no better after IV steroids. [[Koch2023,Lublin2003,Hirst2008,Beck1992]]`,
   pt:`After a few months things have usually settled. Some people are back to how they were; others are left with a little more difficulty than before.`,
   hook:`Residual deficits add up as relapse-associated worsening: see <a href="#course" data-go="course">Relapse &amp; remission over time</a>.`}],
 sev:[RL_B1,
  {from:rlW(.42),at:rlW(1.8),k:'Weeks 1–3',t:'Steroids, little change',
   txt:`Some severe attacks do not recover after IV steroids. In CombiRx, relapse severity was the only factor linked to the speed of recovery. [[Koch2023]]`,
   pt:`Here the steroid course has not brought the expected improvement.`,
   hook:`Severity predicts slower recovery (CombiRx).`},
  {from:rlW(3.3),at:rlW(4.6),k:'Weeks 3–6',t:'Plasma exchange',
   txt:`In a sham-controlled crossover trial in severe demyelinating attacks that had not recovered with IV steroids, moderate or greater improvement followed 8 of 19 active plasma-exchange courses (42.1%) and 1 of 17 sham courses (5.9%). The solid line shows an improving course; the dashed line, a course without improvement. [[Weinshenker1999]]`,
   pt:`For a severe attack that steroids did not help, plasma exchange was tested against a sham procedure and helped more often.`,
   hook:`Steroid-refractory severe attack: plasma exchange, 42.1% vs 5.9% improved (Weinshenker 1999).`},
  {from:rlW(8),at:rlW(20),k:'Months 2–6',t:'What remains',
   txt:`Recovery after a severe attack is slower. In NO.MS, pre-existing disability and older age were the main risk factors for incomplete recovery from relapses. [[Koch2023,Lublin2022]]`,
   pt:`Recovery takes longer, and more may be left behind.`,
   hook:`Incomplete recovery: older age and existing disability (NO.MS).`}],
 pseudo:[
  {from:0,at:rlW(.15),k:'Day 0–1',t:'A fever starts',
   txt:`A urinary tract infection brings a fever. NICE NG220 asks clinicians to rule out infection, particularly urinary and respiratory, before diagnosing a relapse. At Johns Hopkins, a possible UTI was found in 30.4% of inpatients and 20.0% of clinic patients assessed for a suspected relapse. [[NICE2022,Fitzgerald2019]]`,
   pt:`An infection, often in the bladder, causes a temperature.`,
   hook:`NICE NG220: rule out infection, particularly urinary tract infection, before diagnosing a relapse.`},
  {from:rlW(.2),at:rlW(.32),k:'Days 1–3',t:'Old symptoms flare',
   txt:`Higher temperature impairs conduction in fibres that were demyelinated before, slowing or blocking it. An estimated 60–80% of people with MS worsen temporarily with heat. These Uhthoff phenomena are brief, stereotyped and reversible; they come from ion-channel changes and thermoregulation, not from a new immune attack. [[Davis2010,Frohman2013]]`,
   pt:`The heat of the fever makes an old, already damaged nerve pathway misfire, so the old numbness or weakness comes back for a while.`,
   hook:`Pseudo-relapse: old symptoms, fever or heat, no new lesion, gone when the trigger goes.`},
  {from:rlW(.45),at:rlW(.75),k:'Days 3–6',t:'Settles with the fever',
   txt:`As the temperature falls, conduction through the old lesion returns and the symptoms fade. Cooling, like drugs that prolong the action potential, can overcome conduction failure in demyelinated fibres. [[Sherratt1980,Frohman2013]]`,
   pt:`When the temperature comes down, the symptoms go back to how they were before.`,
   hook:`Heat sensitivity is why cooling and 4-aminopyridine were studied (see <a href="#symptoms" data-go="symptoms">Symptoms</a>).`},
  {from:rlW(1.5),at:rlW(6),k:'Weeks 1–6',t:'No new lesion, but infection matters',
   txt:`No new enhancing lesion appears: in a prospective study, gadolinium-enhancing lesions did not increase after infection. Yet true relapses were 2.1 times more likely from 2 weeks before to 5 weeks after a systemic infection, and those relapses more often left a sustained deficit (rate ratio 3.8). A pseudo-relapse and a true relapse can follow the same infection. [[Buljevac2002]]`,
   pt:`The scan shows nothing new. Infections can still set off a real relapse in the weeks around them.`,
   hook:`Infection window for true relapses: from 2 weeks before to 5 weeks after (Buljevac 2002).`}]
};
inits.relapse=()=>{
  const svg=$('#rlSvg'),rg=$('#rlT');let ev='rel',st=true,sev=false,setSt=()=>{};
  const key=()=>ev==='pseudo'?'pseudo':sev?'sev':'rel';
  const rr=rng(77),LEAK=Array.from({length:14},()=>({u:rr(),v:rr()}));
  function draw(t){
    const N=vb(svg,'720 352','400 652');
    const w=rlU(t),K=key(),PS=K==='pseudo';
    const L=N?{sx0:10,sx1:390,sy0:24,sy1:172,my0:184,my1:322,cx0:44,cx1:390,r1:[348,356,452],r2:[476,484,526],r3:[552,560,600],tk:620,ax:638}
             :{sx0:10,sx1:336,sy0:24,sy1:172,my0:184,my1:340,cx0:368,cx1:704,r1:[20,28,122],r2:[148,156,198],r3:[224,232,272],tk:292,ax:310};
    const X=ww=>lerp(L.cx0,L.cx1,rlW(ww));
    const symF=PS?RL_SYM.pseudo:K==='sev'?RL_SYM.sev:st?RL_SYM.on:RL_SYM.off;
    const ghostF=PS?null:K==='sev'?RL_SYM.sevNo:st?RL_SYM.off:RL_SYM.on;
    const sym=symF(w),gd=PS?0:rlGd(w),fev=PS?rlFever(w):0;
    const infl=PS?0:ramp(w,-.05,.4)*(1-ramp(w,K==='sev'?3:2,K==='sev'?8:6));
    let s='';
    /* ---- scene: inside the lesion ---- */
    s+=`<rect x="${L.sx0}" y="${L.sy0}" width="${L.sx1-L.sx0}" height="${L.sy1-L.sy0}" rx="10" style="fill:var(--field);stroke:var(--line)"/>`;
    if(fev>0)s+=`<rect x="${L.sx0}" y="${L.sy0}" width="${L.sx1-L.sx0}" height="${L.sy1-L.sy0}" rx="10" style="fill:var(--bad);opacity:${f1(.16*fev)}"/>`;
    s+=`<text x="${L.sx0+6}" y="${L.sy0-8}" class="t-sm">${PS?'INSIDE AN OLD LESION':'INSIDE A NEW LESION'} · schematic</text>`;
    const fx0=L.sx0+16,fx1=L.sx1-16,fy=L.sy0+92,vy=L.sy0+30,la=.38,lb=.64,lx0=lerp(fx0,fx1,la),lx1=lerp(fx0,fx1,lb);
    /* small vessel with gadolinium leaking while the barrier is open */
    s+=`<rect x="${fx0}" y="${vy-8}" width="${fx1-fx0}" height="16" rx="8" style="fill:var(--vessel-soft);stroke:var(--vessel);stroke-width:1.4"/><text x="${fx1-4}" y="${vy+3.5}" class="t-xs t-end" style="fill:var(--vessel)">blood vessel</text>`;
    if(gd>.02)LEAK.forEach(p=>{const x=lerp(lx0,lx1,p.u),y=lerp(vy+10,fy-12,p.v);s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="2.6" style="fill:var(--gd);stroke:var(--gold);stroke-width:.6;opacity:${f1(gd)}"/>`});
    let fo;const remy=PS||w>=(K==='sev'?9:7);
    if(PS)fo={demy:[ [.38,.48] ],thin:[ [.48,.64] ],loss:1};
    else if(remy)fo={demy:[ [.38,K==='sev'?.53:.47] ],thin:[ [K==='sev'?.53:.47,.64] ],loss:1};
    else fo={demy:[ [.38,.64] ],loss:ramp(w,0,1.2)};
    const F=fiber(fx0,fx1,fy,Object.assign({seg:N?40:34,gap:6,h:16},fo));s+=F.svg;
    /* immune cells while inflammation lasts */
    if(infl>.02){[ [.1,-26,'t'],[.45,28,'m'],[.75,-28,'t'],[.3,30,'m'],[.92,24,'t'] ].forEach(([u,dy,k],i)=>{const x=lerp(lx0,lx1,u),y=fy+dy;s+=k==='t'?tcell(x,y,9,infl,'T'):mac(x,y,11,infl,1,i+3)});
      if(infl>.5)s+=`<text x="${f1(lx1+16)}" y="${fy-30}" class="t-xs" style="fill:var(--tcell)">T cells,</text><text x="${f1(lx1+16)}" y="${fy-19}" class="t-xs" style="fill:var(--mac)">macrophages</text>`}
    /* nerve signal: hops node to node, stopped at the lesion while conduction is blocked */
    const blocked=PS?fev>.35:sym>.4;const pos=(t*(N?40:60))%1,px=lerp(fx0,fx1,pos);let nx=F.nodes.filter(x=>x<=px).pop()||fx0;
    if(blocked&&nx>lx0-4){nx=F.nodes.filter(x=>x<lx0).pop()||fx0;s+=`<text x="${f1(lx0-2)}" y="${fy+5}" class="t-lbl t-mid" style="fill:var(--bad)">✕</text>`}
    s+=`<circle cx="${f1(nx)}" cy="${fy}" r="5.5" style="fill:var(--pulse);opacity:.9"/>`;
    s+=`<text x="${L.sx0+8}" y="${L.sy1-10}" class="t-xs" style="fill:${blocked?'var(--bad)':'var(--good)'}">${blocked?(PS?'warm old lesion: signal blocked':'demyelinated: signal blocked'):(remy?(PS?'cooler: signal gets through again':'thin new myelin: signal gets through'):'signal still passes')}</text>`;
    /* ---- MRI ---- */
    const mcx=(L.sx0+L.sx1)/2,mcy=(L.my0+L.my1)/2+4,brx=N?120:110,bry=(L.my1-L.my0)/2-28;
    s+=`<rect x="${L.sx0}" y="${L.my0}" width="${L.sx1-L.sx0}" height="${L.my1-L.my0}" rx="10" class="mri"/>`;
    s+=`<ellipse cx="${f1(mcx)}" cy="${f1(mcy)}" rx="${brx}" ry="${f1(bry)}" style="fill:var(--mri-wm);stroke:var(--mri-gm);stroke-width:7"/>`;
    s+=`<ellipse cx="${f1(mcx-13)}" cy="${f1(mcy)}" rx="9" ry="${f1(bry*.42)}" transform="rotate(-12 ${f1(mcx-13)} ${f1(mcy)})" style="fill:var(--mri-csf)"/><ellipse cx="${f1(mcx+13)}" cy="${f1(mcy)}" rx="9" ry="${f1(bry*.42)}" transform="rotate(12 ${f1(mcx+13)} ${f1(mcy)})" style="fill:var(--mri-csf)"/>`;
    s+=lesion(mcx+46,mcy+16,5,4,.95)+lesion(mcx-58,mcy+20,4,7,.95);
    const nlx=mcx-44,nly=mcy-16;
    if(!PS&&w>.05){s+=lesion(nlx,nly,7,11,clamp(w/.4));if(gd>.03)s+=lesion(nlx,nly,8.5,11,f1(gd),'var(--gd)')+`<circle cx="${f1(nlx)}" cy="${f1(nly)}" r="15" style="fill:none;stroke:var(--gd);stroke-width:1.5;opacity:${f1(gd)}"/>`}
    s+=`<text x="${L.sx0+8}" y="${L.my0+14}" class="t-mri">MRI · T1 with gadolinium + T2 (schematic)</text>`;
    s+=`<text x="${L.sx0+8}" y="${L.my1-8}" class="t-mri">${PS?'old lesions only: nothing enhancing':gd>.03?'new lesion enhancing (bright ring)':w>.05?'new lesion stays on T2, no longer enhancing':'no new lesion yet'}</text>`;
    /* ---- charts ---- */
    const row=(r,title,c)=>`<text x="${L.cx0}" y="${r[0]}" class="t-sm" style="fill:${c}">${title}</text><line x1="${L.cx0}" x2="${L.cx1}" y1="${r[2]}" y2="${r[2]}" class="axis"/>`;
    const curve=(f,r,col,wd,dash,upto)=>{const Y=v=>lerp(r[2],r[1]+6,v);let d='';const n=160;for(let i=0;i<=n;i++){const u=i/n;if(upto!=null&&u>upto+1e-9)break;d+=(i?'L':'M')+f1(lerp(L.cx0,L.cx1,u))+' '+f1(Y(f(rlU(u))))}return `<path d="${d}" style="fill:none;stroke:${col};stroke-width:${wd};${dash?'stroke-dasharray:4 4;opacity:.7':''};stroke-linejoin:round"/>`};
    /* symptoms */
    const R1=L.r1,Y1=v=>lerp(R1[2],R1[1]+6,v);
    s+=row(R1,PS?'SYMPTOMS (old ones returning)':'SYMPTOMS (share of peak)','var(--attack)');
    s+=`<line x1="${L.cx0}" x2="${L.cx1}" y1="${f1(Y1(1))}" y2="${f1(Y1(1))}" class="grid"/><text x="${L.cx0-6}" y="${f1(Y1(1)+3)}" class="t-xs t-end">peak</text><text x="${L.cx0-6}" y="${R1[2]+3}" class="t-xs t-end">0</text>`;
    if(!PS&&K!=='sev'){[ [15.86,'median recovery 111 d','t-mid',R1[1]+8],[25.7,'80% of recoveries by day 180','t-end',R1[1]+20] ].forEach(([ww,l,a,yy])=>{s+=`<line x1="${f1(X(ww))}" x2="${f1(X(ww))}" y1="${yy+3}" y2="${R1[2]}" style="stroke:var(--muted);stroke-width:1;stroke-dasharray:2 3"/><text x="${f1(a==='t-end'?L.cx1:X(ww))}" y="${yy}" class="t-xs ${a}">${l}</text>`})}
    if(ghostF){s+=curve(ghostF,R1,'var(--muted)',1.5,true);
      s+=`<text x="${L.cx1}" y="${R1[0]}" class="t-xs t-end">${K==='sev'?'dashed: no improvement':st?'dashed: without steroids':'dashed: with steroids'}</text>`}
    s+=curve(symF,R1,'var(--attack)',2.8,false,t);
    s+=`<circle cx="${f1(X(w))}" cy="${f1(Y1(sym))}" r="5" style="fill:var(--attack)"/>`;
    if(w>12)s+=PS?`<text x="${L.cx1}" y="${R1[2]-5}" class="t-xs t-end" style="fill:var(--good)">back to how things were before</text>`
      :`<text x="${L.cx1}" y="${R1[2]-2}" class="t-xs t-end" style="fill:var(--attack)">42% of patients: residual ≥0.5 EDSS</text>`;
    /* gadolinium */
    const R2=L.r2;s+=row(R2,'GADOLINIUM ENHANCEMENT','var(--gold)');
    if(PS)s+=`<text x="${f1(X(.6))}" y="${R2[2]-12}" class="t-xs">no new enhancing lesion</text><line x1="${L.cx0}" x2="${f1(X(w))}" y1="${R2[2]-1}" y2="${R2[2]-1}" style="stroke:var(--gold);stroke-width:2.4"/>`;
    else{const Y2=v=>lerp(R2[2],R2[1]+4,v);let d=`M${L.cx0} ${R2[2]}`;for(let i=0;i<=120;i++){const u=i/120;if(u>t)break;d+='L'+f1(lerp(L.cx0,L.cx1,u))+' '+f1(Y2(rlGd(rlU(u))))}d+=`L${f1(lerp(L.cx0,L.cx1,Math.min(t,1)))} ${R2[2]}Z`;
      s+=`<path d="${d}" style="fill:var(--gd);stroke:var(--gold);stroke-width:1.4;opacity:.85"/>`;
      [ [2,'median'],[3.07,'mean'] ].forEach(([ww,l])=>s+=`<line x1="${f1(X(ww))}" x2="${f1(X(ww))}" y1="${R2[1]+4}" y2="${R2[2]+3}" style="stroke:var(--ink);stroke-width:1;stroke-dasharray:2 2"/><text x="${f1(X(ww))}" y="${R2[2]+12}" class="t-xs t-mid">${l}</text>`);
      s+=`<text x="${f1(X(4.6))}" y="${R2[2]-8}" class="t-xs">lasts a mean 3.07 weeks, median 2</text>`}
    /* treatment or trigger */
    const R3=L.r3;
    if(PS){s+=row(R3,'FEVER (urinary infection)','var(--bad)');const Y3=v=>lerp(R3[2],R3[1]+4,v);let d=`M${L.cx0} ${R3[2]}`;for(let i=0;i<=160;i++){const u=i/160;if(u>t)break;d+='L'+f1(lerp(L.cx0,L.cx1,u))+' '+f1(Y3(rlFever(rlU(u))))}
      d+=`L${f1(lerp(L.cx0,L.cx1,t))} ${R3[2]}Z`;s+=`<path d="${d}" style="fill:var(--bad);opacity:.35;stroke:var(--bad)"/><text x="${f1(X(.9))}" y="${R3[2]-10}" class="t-xs">fever falls as the infection settles</text>`}
    else{s+=row(R3,K==='sev'?'TREATMENT · steroids, then plasma exchange':'TREATMENT · published regimen','var(--rx)');
      s+=`<line x1="${f1(X(0))}" x2="${f1(X(2))}" y1="${R3[2]-4}" y2="${R3[2]-4}" style="stroke:var(--rx);stroke-width:1.2"/><line x1="${f1(X(2))}" x2="${f1(X(2))}" y1="${R3[2]-8}" y2="${R3[2]}" style="stroke:var(--rx);stroke-width:1.2"/><text x="${f1(X(2)+6)}" y="${R3[2]-1}" class="t-xs" style="fill:var(--rx)">within 14 days of onset (NICE)</text>`;
      if(st||K==='sev'){const a=X(.43),b=X(.43+5/7),on=w>=.43;s+=`<rect x="${f1(a)}" y="${R3[1]+2}" width="${f1(b-a)}" height="18" rx="4" style="fill:var(--rx-soft);stroke:var(--rx);stroke-width:1.4;opacity:${on?1:.4}"/><text x="${f1(b+6)}" y="${R3[1]+15}" class="t-xs" style="fill:var(--rx)">← steroids${K==='sev'?'':', 5 days'+(N?'':' (oral methylprednisolone 0.5 g/day)')}</text>`;
        if(K==='sev'){const c=X(3.5),d2=X(5.5);s+=`<rect x="${f1(c)}" y="${R3[1]+2}" width="${f1(d2-c)}" height="18" rx="4" style="fill:var(--attack-soft);stroke:var(--attack);stroke-width:1.4;opacity:${w>=3.5?1:.4}"/>`;
          if(w>=3.5)s+=`<text x="${f1(d2+6)}" y="${R3[1]+10}" class="t-xs" style="fill:var(--attack)">← plasma exchange</text><text x="${f1(d2+6)}" y="${R3[1]+21}" class="t-xs" style="fill:var(--attack)">improved: 42.1% vs 5.9% sham</text>`}}
      else s+=`<text x="${f1(X(.5))}" y="${R3[1]+15}" class="t-xs">no steroids in this run</text>`}
    /* time axis */
    [0,1,2,3,4,8,12,16,20,26].forEach(ww=>s+=`<text x="${f1(X(ww))}" y="${L.tk}" class="t-xs ${ww===26?'t-end':ww===0?'':'t-mid'}">${ww}</text>`);
    s+=`<path d="M${f1(X(4)-4)} ${L.r3[2]+6} l3 -6 l3 6 l3 -6" style="fill:none;stroke:var(--muted);stroke-width:1.2"/>`;
    s+=`<text x="${L.cx1}" y="${L.ax}" class="t-xs t-end">weeks after onset · scale changes at week 4</text>`;
    s+=`<line x1="${f1(X(w))}" x2="${f1(X(w))}" y1="${L.r1[1]}" y2="${L.r3[2]}" style="stroke:var(--ink);stroke-width:1;opacity:.3"/>`;
    svg.innerHTML=s;
    const steps=RL_STEPS[K],p=phaseOf(steps,t);setSt(p);
    const dayTxt=w<4?` (day ${Math.round(w*7)})`:'';
    $('#rlRead').innerHTML=`<span>week <b>${f1(w)}</b>${dayTxt}</span><span>symptoms <b>${Math.round(sym*100)}%</b> of ${PS?'a relapse peak':'peak'}</span><span>gadolinium <b>${PS?'none':gd>.03?'enhancing':w<.05?'not yet':'not enhancing'}</b></span><span>${PS?'fever':'treatment'} <b>${PS?(fev>.05?'yes':'no'):(K==='sev'?(w<.43?'none yet':w<1.14?'steroids':w<3.5?'steroids done':w<5.5?'plasma exchange':'done'):st?(w<.43?'none yet':w<1.14?'steroids (day '+Math.round(w*7-2)+' of 5)':'course done'):'none')}</b></span><span>signal <b>${blocked?'blocked':'getting through'}</b></span>`;
    const RUN={rel:st?`<b>With steroids</b> (from day 3, for 5 days): recovery is faster than the dashed line without them, and the two meet by about week 16. [[Beck1992,Filippini2000]]`:`<b>Without steroids</b>: recovery still happens, more slowly (dashed = with steroids), to the same end point here. [[Beck1992]]`,
      sev:`<b>Severe attack</b>: steroids bring little change, then plasma exchange. Solid = improvement, dashed = none. [[Weinshenker1999]]`,
      pseudo:`<b>Pseudo-relapse</b>: no new lesion, no enhancement; symptoms track the fever. Steroid regimens in NICE NG220 are for relapses. [[NICE2022]]`};
    $('#rlNote').innerHTML=noteHTML(steps[p])+`<div class="kv"><div><dt>This run</dt><dd>${RUN[K]}</dd></div></div>`;
  }
  const stop=playWire(rg,$('#rlPlay'),draw,16000,'Replay','relapse');
  let lastK=null;
  function wire(){const K=key();if(K===lastK)return;lastK=K;const old=$('#rlSteps'),nu=old.cloneNode(false);old.replaceWith(nu);setSt=stepWire(nu,RL_STEPS[K],rg,draw,stop)}
  function sync(){$$('[data-rl-ev]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.rlEv===ev));$$('[data-rl-st]').forEach(b=>b.setAttribute('aria-pressed',(b.dataset.rlSt==='on')===st));
    $('#rlSevere').setAttribute('aria-pressed',sev);$('#rlTx').style.display=ev==='pseudo'?'none':'';wire();draw(+rg.value)}
  $$('[data-rl-ev]').forEach(b=>b.addEventListener('click',()=>{stop();ev=b.dataset.rlEv;sync()}));
  $$('[data-rl-st]').forEach(b=>b.addEventListener('click',()=>{stop();st=b.dataset.rlSt==='on';if(!st)sev=false;sync()}));
  $('#rlSevere').addEventListener('click',()=>{stop();sev=!sev;if(sev)st=true;sync()});
  sync();

  /* ---- is it a relapse? (teaching check) ---- */
  const Q=[ ['q1','New or worse symptoms lasting more than 24 hours?',true],['q2','Fever or an infection, such as a urinary infection, at the same time?',false],['q3','At least 1 month stable since the last relapse?',true],['q4','Symptoms present for more than 3 months?',false]];
  const A={};Q.forEach(q=>A[q[0]]=q[2]);
  $('#rlQ').innerHTML=Q.map(([k,l])=>`<div class="row"><span>${l}</span><div role="group" aria-label="${l}"><button class="btn" data-rq="${k}" data-v="1" aria-pressed="false">Yes</button><button class="btn" data-rq="${k}" data-v="0" aria-pressed="false">No</button></div></div>`).join('');
  function verdict(){$$('[data-rq]').forEach(b=>b.setAttribute('aria-pressed',(b.dataset.v==='1')===A[b.dataset.rq]));
    let c,h,p;
    if(!A.q1){c='no';h='Too short for the published definition';p='Both the McDonald 2010 panel and NICE NG220 require symptoms lasting at least 24 hours (NICE: more than 24 hours). Paroxysmal symptoms count only as multiple episodes over not less than 24 hours. [[Polman2011,NICE2022]]'}
    else if(A.q2){c='maybe';h='Infection first';p='NICE NG220 asks clinicians to rule out infection, particularly urinary and respiratory, before diagnosing a relapse. Fever can bring old symptoms back without new inflammation (a pseudo-relapse); infection also raises the risk of a true relapse in the following weeks. [[NICE2022,Buljevac2002]]'}
    else if(A.q4){c='no';h='Too long ago to call a new relapse';p='NICE NG220: a relapse should not routinely be diagnosed when symptoms have been present for more than 3 months. Slow worsening may be progression rather than a relapse: see <a href="#course" data-go="course">the course over time</a>. [[NICE2022]]'}
    else if(!A.q3){c='maybe';h='May be the same relapse';p='NICE NG220 describes a relapse as following a stable period of at least 1 month. Worsening within a month may belong to the episode already under way, or be a fluctuation. [[NICE2022]]'}
    else{c='yes';h='Fits the published description';p='New or worse symptoms for more than 24 hours, without infection, after at least a month of stability: this matches the NICE NG220 wording and the McDonald 2010 attack definition. Only a clinician can make the diagnosis. [[NICE2022,Polman2011]]'}
    $('#rlQNote').innerHTML=`<div class="kicker">Teaching check, not a diagnosis</div><div class="verdict ${c}">${h}</div><p>${p}</p><div class="pt"><b>In plain words</b>A relapse lasts more than a day, is not explained by a fever or infection, and comes after at least a month of things being steady.</div>`}
  $('#rlQ').addEventListener('click',e=>{const b=e.target.closest('[data-rq]');if(!b)return;A[b.dataset.rq]=b.dataset.v==='1';verdict()});
  verdict();
};
