/* =============== 1.5 Bleeding strokes =============== */
/* Two tracks with their own players: ICH on an axial slice (growth, oedema, shift) and SAH (aneurysm, fissures, thunderclap).
   Then: Ottawa rule, the 6-hour CT route with a sensitivity chart, SMASH-U and Boston v2.0. Numbers from research pass C. */
const BL_I=[
 {from:0,at:.1,k:'Step 1 · onset',t:'A small artery gives way',
  txt:`ICH affects about 3.4 million people worldwide each year and causes about 2.8 million deaths [[Steiner2025]]. It is about 10% of strokes in the United States and 6.5 to 19.6% worldwide [[Magid2022]]. Hypertensive bleeds occur in deep areas supplied by small vessels [[Magid2022]]. The slice shows the person's left on the viewer's right, as a scan is read.`,
  pt:`A brain bleed happens when a blood vessel inside the head breaks and blood leaks out. Bleeds are less common than clots but are more often fatal [[vanAsch2010]].`},
 {from:.2,at:.36,k:'Step 2 · first hours',t:'The bleed keeps growing',
  txt:`In 103 people scanned within 3 hours, substantial growth occurred in 26% by the 1-hour CT and in another 12% by 20 hours, and no baseline feature predicted it [[Brott1997]]. Expansion occurs predominantly within the first 3 hours [[Sandset2026]] and typically within 24 hours [[Greenberg2022]]. Each 10% of growth carried a hazard ratio for death of 1.05 [[Davis2006]]. In PREDICT, spot-sign positive people had median expansion of 8.6 mL against 0.4 mL [[Demchuk2012]].`,
  pt:`Bleeds often keep growing in the first hours, which is why speed matters even without a clot-busting drug [[Brott1997]].`,
  hook:`Spot sign predicts expansion: specificity 85%, sensitivity 51% [[Demchuk2012]].`},
 {from:.46,at:.62,k:'Step 3 · days',t:'Swelling builds around it',
  txt:`In 219 people with supratentorial ICH, mean oedema volume rose from 32.6 mL to 63.7 mL at days 7 to 11, with no significant change later. Growth between days 1 and 3 predicted in-hospital death [[Staykov2011]]. In pooled INTERACT data, intensive blood pressure lowering reduced 24-hour oedema growth by 1.13 mL, with no effect on 7-day measures <span class="ev early">Early evidence</span> [[Ren2026]].`,
  pt:`Swelling around the bleed can keep growing for about a week or more [[Staykov2011]].`},
 {from:.72,at:.82,k:'Step 4 · mass effect',t:'The midline moves, blood reaches the ventricles',
  txt:`Bleed plus swelling takes up space, so the deep structures are pushed across. Blood in the ventricles (intraventricular haemorrhage, IVH) carried a hazard ratio for death of 2.23 [[Davis2006]]. A volume of 60 cm³ or more with GCS 8 or less predicted 30-day mortality of 91%. Under 30 cm³ with GCS 9 or more predicted 19% [[Broderick1993]].`,
  hook:`Volume at the bedside is ABC/2. It took a mean of 38 seconds in 118 patients [[Kothari1996]].`},
 {from:.9,at:.96,k:'Step 5 · outcome',t:'A serious stroke, with little change over time',
  txt:`Median 1-month case fatality was 40.4% (range 13.1 to 61.0) and did not fall over time. It was lower in Japan (16.7%) than elsewhere (42.3%). Six studies reported independence in 12 to 39% [[vanAsch2010]]. Pooled survival was 46% at 1 year and 29% at 5 years [[Poon2014]]. In Greater Cincinnati in 1988, half of the deaths in the first 30 days came in the first 2 days [[Broderick1993]]. One study's 30-day case fatality did fall, from 40 to 33% between 1985 and 2011 [[Magid2022]]. Treatment is in module 3.3.`}];
const BL_I_STATS=[
 [['35%','hypertensive','angiopathy'],['20%','amyloid','angiopathy'],['14%','anticoagulation','related']],
 [['30%','spot-sign positive','in PREDICT'],['8.6 mL','median expansion','if positive'],['0.4 mL','median expansion','if negative']],
 [['32.6 mL','mean oedema','at first'],['63.7 mL','mean oedema','days 7 to 11'],['rho 0.8','oedema against','ICH volume']],
 [['HR 2.23','for death','with IVH'],['91%','mortality, 60 cm3+','and GCS 8 or less'],['19%','mortality, under 30','cm3, GCS 9 or more']],
 [['40.4%','median case','fatality, 1 month'],['46%','survival','at 1 year'],['29%','survival','at 5 years']]];
const BL_S=[
 {from:0,at:.1,k:'Step 1 · before',t:'A berry aneurysm at a fork',
  txt:`Unruptured aneurysms have a prevalence of about 3.2% [[Vlak2011]]. In PHASES the rupture risk was 1.4% at 1 year and 3.4% at 5 years [[Greving2014]]. Aneurysmal SAH results from rupture of an intracranial aneurysm [[Vergouwen2026]].`,
  pt:`About 3 in 100 adults may have a small swelling on a brain artery, and most never burst [[Vlak2011,Greving2014]].`},
 {from:.2,at:.36,k:'Step 2 · rupture',t:'Thunderclap: pain at its peak from the start',
  txt:`The commonest presentation is a sudden thunderclap headache, very painful and intense from onset. It is the only symptom in half of SAH cases [[Claassen2022]]. In Dutch general practice, sudden severe headache was SAH in 25%, and in 12% when headache was the only symptom [[Linn1994]].`,
  pt:`A sudden headache that is the worst of your life, peaking in moments, is an emergency [[Claassen2022]].`,
  hook:`Sentinel headache is disputed. In 1102 people, 14% reported one, with no prognostic significance [[Viarasilpa2020]]. Rates range 10 to 43% across nine studies [[Polmear2003]]. Linn's prospective series recorded previous bouts in only 2 of 103 headache-only patients [[Linn1994]].`},
 {from:.45,at:.56,k:'Step 3 · spread',t:'Blood fills the fissures',
  txt:`Blood spreads through the space around the brain, along the fissures and sulci. Worldwide incidence was 7.9 per 100 000 person-years, falling from 10.2 in 1980 to 6.1 in 2010. It fell 7.1% per mm Hg fall in population systolic pressure and 2.4% per percentage point fall in smoking [[Etminan2019]]. UK data (3341 people) gave a median age of 55, 68.5% female [[Galea2017]].`},
 {from:.64,at:.74,k:'Step 4 · on CT',t:'On CT, fresh blood is white',
  txt:`On a non-contrast CT, fresh blood shows white where the fissures should be dark. The Ottawa rule and the 6-hour CT route are below. Ottawa rule: sensitivity 100%, specificity 15.3% in derivation [[Perry2013]]. CT within 6 hours: sensitivity 100% in one cohort [[Perry2011]], with lower figures elsewhere, set out below.`,
  hook:`Ottawa rule has six items and specificity about 15% [[Perry2013]]. CT within 6 hours: modern scanner, read by a qualified radiologist [[Perry2011]].`},
 {from:.84,at:.92,k:'Step 5 · what follows',t:'The danger is not over',
  txt:`Rebleeding occurs in about 40% if the aneurysm stays untreated [[Vergouwen2026]]. Delayed cerebral ischaemia occurs in about 30%, mostly between days 4 and 14 [[Hoh2023]]. Hydrocephalus affects about 25% [[Vergouwen2026]]. Module 3.4 follows those days. Angiography finds no aneurysm in about 15%, half of whom have perimesencephalic SAH, where rebleeding, hydrocephalus and DCI are rare [[Claassen2022]].`}];
const BL_S_STATS=[
 [['3.2%','prevalence of','unruptured aneurysm'],['1.4%','rupture','at 1 year'],['3.4%','rupture','at 5 years']],
 [['half','headache is the','only symptom'],['25%','of sudden severe','headache was SAH'],['14%','recalled a sentinel','headache']],
 [['7.9','per 100 000','person-years'],['10.2 to 6.1','per 100 000,','1980 to 2010'],['68.5%','female in','UK data']],
 [['100%','Ottawa sensitivity','derivation'],['15.3%','Ottawa specificity','derivation'],['100%','CT within 6 h','one cohort']],
 [['40%','rebleed if','left untreated'],['30%','delayed cerebral','ischaemia'],['25%','hydrocephalus','(all about)']]];
const BL_OTT=['Age 40 or over','Neck pain or stiffness','Witnessed loss of consciousness','Onset during exertion','Thunderclap headache (instantly peaking pain)','Limited neck flexion on examination'];
const BL_OTT_TXT={
 lede:`The Ottawa rule's entry point: alert, over 15, new severe nontraumatic headache peaking within 1 hour [[Hoh2023,Perry2013]].`,
 stats:`Derivation (2131 adults, 132 with SAH): sensitivity 100% (97.2 to 100.0), specificity 15.3% (13.8 to 16.9) [[Perry2013]]. Validation (1153 adults, 67 with SAH): sensitivity 100% (94.6 to 100), specificity 13.6% (13.1 to 15.8), with neuroimaging rates similar at about 87% [[Perry2017]]. AHA/ASA 2023 gives it Class 2b, B-NR [[Hoh2023]].`,
 hook:`High sensitivity, very low specificity. It can rule out, but most people it flags do not have SAH [[Perry2013]].`};
const BL_CT_FOREST=[
 {n:'Any time from onset',src:'Perry 2011, 3132 people',v:92.9,lo:89.0,hi:95.5},
 {n:'Within 6 hours',src:'Perry 2011, 953 people',v:100,lo:97.0,hi:100},
 {n:'Within 6 hours, pooled',src:'Dubosh 2016, 8907 people',v:98.7,lo:97.1,hi:99.4},
 {n:'Rule plus CT, as quoted',src:'review, 3672 people, no CI quoted',v:95.5}];
const BL_CT_N={
 early:{k:'Under 6 hours, no new deficit',t:'A high-quality CT, read by a board-certified neuroradiologist',txt:`AHA/ASA 2023 gives this route Class 2a, B-NR [[Hoh2023]]. Within 6 hours one cohort found sensitivity 100% (97.0 to 100.0) and specificity 100% (99.5 to 100) on third-generation scanners read by a qualified radiologist [[Perry2011]].`,
  pt:`A very early scan picks up nearly all of these bleeds, when the scanner and the reader meet the standard.`},
 late:{k:'Over 6 hours, or a new deficit',t:'Non-contrast CT and, if negative, lumbar puncture',txt:`AHA/ASA 2023 gives this route Class 1, B-NR [[Hoh2023]]. CT overall had sensitivity 92.9% (89.0 to 95.5) in 3132 people [[Perry2011]].`,
  hook:`More than 6 hours or a new neurological deficit: CT, then lumbar puncture if negative (Class 1, B-NR) [[Hoh2023]].`}};
const BL_SMASH=[
 {id:'h',n:'Hypertensive angiopathy',s:'H',p:35,col:'--artery',r:20,
  txt:`35% of the 1013 cases [[Meretoja2012]]. Hypertensive bleeds occur in deep areas supplied by small vessels: putamen, caudate, thalamus, brainstem and deep cerebellar nuclei [[Magid2022]].`,site:'deep: the putamen is drawn'},
 {id:'u',n:'Undetermined',s:'U',p:21,col:'--muted',r:0,txt:`21% of the 1013 cases [[Meretoja2012]]. No single site is drawn for this group.`,site:'no single typical site'},
 {id:'a',n:'Amyloid angiopathy',s:'A',p:20,col:'--pca',r:22,x:190,y:84,mb:1,
  txt:`20% of the 1013 cases [[Meretoja2012]]. Amyloid weakens vessels near the surface, so bleeds are lobar and go with microbleeds or superficial siderosis [[Magid2022]]. The earlier Boston modification added siderosis, found in 60.5% of histologically proven CAA and none of 22 non-CAA ICH controls [[Linn2010]].`,
  pt:`In older people, a protein called amyloid can weaken vessels near the brain surface [[Magid2022]].`,site:'lobar, near the surface, with small microbleeds'},
 {id:'m',n:'Anticoagulation',s:'M',p:14,col:'--bad',r:32,
  txt:`14% of the 1013 cases. These bleeds were the largest (median 13.4 mL) and most often fatal (54% at 3 months) [[Meretoja2012]]. The M stands for medication.`,
  pt:`Blood thinners usually can be reversed in hospital. Tell staff what you take and when you last took it [[Greenberg2022]].`,site:'largest bleeds, median 13.4 mL'},
 {id:'s',n:'Structural lesions',s:'S',p:5,col:'--aca',r:11,x:186,y:210,
  txt:`5% of the 1013 cases: cavernomas and arteriovenous malformations. They had the smallest bleeds (median 2.8 mL) and lowest 3-month mortality (4%) [[Meretoja2012]].`,site:'smallest bleeds, median 2.8 mL'},
 {id:'sy',n:'Systemic disease',s:'S',p:5,col:'--vert',r:0,txt:`5% of the 1013 cases [[Meretoja2012]]. No single site is drawn for this group.`,site:'no single typical site'}];
const BL_BOS=[
 {k:'age',l:'Age',o:[['lt','Under 50'],['ge','50 or over']],d:'ge'},
 {k:'pres',l:'Presentation',o:[['yes','Spontaneous ICH, transient focal episodes, or cognitive impairment'],['no','None of these']],d:'yes'},
 {k:'lob',l:'Strictly lobar haemorrhagic lesions',o:[['0','None'],['1','One'],['2','Two or more']],d:'1'},
 {k:'wm',l:'White matter feature',o:[['0','None'],['1','One']],d:'0'},
 {k:'deep',l:'Deep haemorrhagic lesion',o:[['no','No'],['yes','Yes']],d:'no'},
 {k:'oth',l:'Another cause found',o:[['no','No'],['yes','Yes']],d:'no'}];
const BL_BOS_R={
 prob:{k:'MRI-based level',t:'Probable CAA',txt:`At least 2 strictly lobar haemorrhagic lesions, or 1 lobar lesion plus 1 white matter feature, with age 50 or over, a qualifying presentation, no deep lesion and no other cause [[Charidimou2022]].`},
 poss:{k:'MRI-based level',t:'Possible CAA',txt:`A single strictly lobar haemorrhagic lesion or a single white matter feature, with the same age and presentation, no deep lesion and no other cause [[Charidimou2022]].`},
 none:{k:'MRI-based level',t:'Neither level is met',txt:`Under 50, no qualifying presentation, a deep haemorrhagic lesion, another cause, or no lobar lesion or white matter feature: these settings reach neither level [[Charidimou2022]].`}};
const BL_BOS_CAP=`Teaching tool only. It shows how a published scale sorts findings, and is never for an individual's diagnosis, prognosis or treatment.`;

/* a panel frame with a title */
function blPanel(x,y,w,h,title,sub,on){return `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="10" style="fill:var(--panel);stroke:${on?'var(--brand)':'var(--line)'};stroke-width:${on?1.6:1}"/><text x="${f1(x+12)}" y="${f1(y+18)}" class="t-lbl">${title}</text>${sub?`<text x="${f1(x+12)}" y="${f1(y+33)}" class="t-sm">${sub}</text>`:''}`}
/* three small figures: in a row when wide, one under another when narrow */
function blStats(x,y,w,S,N){let s='';S.forEach((c,i)=>{
  if(N){const yy=y+i*24+16;s+=`<text x="${f1(x+8)}" y="${f1(yy)}" class="t-big" style="fill:var(--ink)">${c[0]}</text><text x="${f1(x+102)}" y="${f1(yy)}" class="t-sm">${c[1]} ${c[2]}</text>`}
  else{const cx=x+i*w/3+8;s+=`<text x="${f1(cx)}" y="${f1(y+20)}" class="t-big" style="fill:var(--ink)">${c[0]}</text><text x="${f1(cx)}" y="${f1(y+37)}" class="t-sm">${c[1]}</text><text x="${f1(cx)}" y="${f1(y+51)}" class="t-sm">${c[2]}</text>`}});return s}

inits.bleeds=()=>{
  /* ---------- track 1: ICH ---------- */
  const iS=$('#blISvg'),iR=$('#blIT');let iMode='plain';
  function drawI(t){const N=vb(iS,'720 400','400 740');
    const L=N?{b:[75,38,1.04],A:[10,366,380,128],B:[10,502,380,112],C:[10,622,380,108],cols:25,sz:10}:{b:[14,38,1.1],A:[300,16,410,128],B:[300,152,410,112],C:[300,272,410,104],cols:25,sz:11};
    const r=lerp(8,20,ease(ramp(t,.03,.2)))+10*ease(ramp(t,.2,.46)),oe=.12*ramp(t,.2,.46)+.88*ramp(t,.46,.72),sft=9*ease(ramp(t,.68,.86)),ivh=.85*ramp(t,.72,.88);
    const p=phaseOf(BL_I,t),tm=['Onset','First hours','Days: up to days 7 to 11','Days: mass effect','Outcome'][p];
    let s=`<text x="${L.b[0]}" y="22" class="t-lbl">${tm}</text>`;
    const B=brainAxial(L.b[0],L.b[1],L.b[2],{mode:iMode,side:'L',bleed:{r,oedema:oe},shift:sft,ivh,orient:true});s+=B.svg;
    /* true midline for reference once it moves */
    if(sft>.3){const mx=L.b[0]+120*L.b[2],y0=L.b[1]+6,y1=L.b[1]+300*L.b[2]-6;s+=`<line x1="${f1(mx)}" x2="${f1(mx)}" y1="${f1(y0)}" y2="${f1(y1)}" style="stroke:var(--tpa);stroke-width:1.4;stroke-dasharray:5 4"/>`;
      s+=kitLabel(mx,y1+12,'dashed: true midline',{a:'m'})}
    const q=B.at.bleed;s+=kitLabel(q[0],q[1]+3,'bleed',{a:'m'});
    if(oe>.25)s+=kitLabel(q[0],q[1]-r*L.b[2]*1.32,'oedema',{a:'m'});
    if(ivh>.4)s+=kitLabel(L.b[0]+96*L.b[2],L.b[1]+96*L.b[2],'IVH',{a:'m'});
    /* panel A: the artery, then who grows */
    const [ax,ay,aw,ah]=L.A;
    if(t<.2){s+=blPanel(ax,ay,aw,ah,'A small deep artery','long-standing hypertension weakens its wall',true);
      const A=artery(ax+16,ay+88,aw-32,{h:26,rupture:ramp(t,.03,.16),flow:1,ph:t*4});s+=A.svg}
    else{const k=Math.round(26*ramp(t,.2,.32)+12*ramp(t,.34,.46));
      s+=blPanel(ax,ay,aw,ah,'Substantial growth after the first CT','103 people scanned within 3 h. Brott 1997',p===1);
      const I=icons(ax+14,ay+42,{n:100,cols:L.cols,size:L.sz,gap:3.4,shape:'dot',k,col:'var(--artery)'});s+=I.svg;
      s+=`<text x="${f1(ax+14)}" y="${f1(ay+ah-10)}" class="t-sm" style="fill:var(--ink)">${k} in 100${k>=26?(k>=38?': 26 by 1 h, 12 more by 20 h':': by the 1-hour CT'):''}</text>`}
    /* panel B: oedema bars */
    const [bx,by,bw,bh]=L.B,lw=92,mxw=bw-lw-86,bX=v=>bx+12+lw+mxw*v/70,o2=lerp(32.6,63.7,ramp(t,.46,.72)),act=p===2;
    s+=blPanel(bx,by,bw,bh,'Oedema volume','219 people, mean. Staykov 2011',act);
    [['first scan',32.6],[t>=.72?'days 7 to 11':'over the days',o2]].forEach((d,i)=>{const yy=by+46+i*30;
      if(i&&t<.46){s+=`<text x="${f1(bx+12)}" y="${f1(yy+13)}" class="t-sm">days 7 to 11: at step 3</text>`;return}
      s+=`<text x="${f1(bx+12)}" y="${f1(yy+13)}" class="t-sm">${d[0]}</text><rect x="${f1(bX(0))}" y="${f1(yy)}" width="${f1(bX(d[1])-bX(0))}" height="18" rx="3" style="fill:var(--oedema);stroke:var(--vein);stroke-width:1"/><text x="${f1(bX(d[1])+6)}" y="${f1(yy+13)}" class="t-sm" style="fill:var(--ink)">${d[1].toFixed(1)} mL</text>`});
    /* panel C: figures for the phase */
    const [cx,cy,cw,ch]=L.C;s+=blPanel(cx,cy,cw,ch,['What the series show','In PREDICT','Staykov 2011','What goes with worse outcome','Outcome across studies'][p],'',false);
    s+=blStats(cx+4,cy+(N?22:26),cw-8,BL_I_STATS[p],N);
    iS.innerHTML=s;setI(p);$('#blINote').innerHTML=noteHTML(BL_I[p])}
  const stopI=playWire(iR,$('#blIPlay'),drawI,18000,'%t:player.replay%','bleeds');
  const setI=stepWire($('#blISteps'),BL_I,iR,drawI,stopI);
  $$('[data-blm]').forEach(b=>b.addEventListener('click',()=>{iMode=b.dataset.blm;$$('[data-blm]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawI(+iR.value)}));
  drawI(+iR.value);

  /* ---------- track 2: SAH ---------- */
  const sS=$('#blSSvg'),sR=$('#blST');
  function drawS(t){const N=vb(sS,'720 420','400 636');
    const L=N?{a:[6,70,.92],b:[200,38,.78],c:[40,316,330,170],st:[10,526,380,96]}:{a:[16,76,1],b:[232,38,.92],c:[496,34,206,210],st:[10,338,700,76]};
    const p=phaseOf(BL_S,t),rp=ramp(t,.2,.38),sah=t<.38?0:.5+.5*ramp(t,.38,.6),ct=t>=.64;let s='';
    s+=`<text x="${L.a[0]+6}" y="22" class="t-lbl">${rp>0?'Aneurysm bursts':'Aneurysm at a fork'}</text>`;
    s+=aneurysm(L.a[0],L.a[1],L.a[2],{rupture:rp,flow:rp>0?.4:1,ph:t*5,labels:rp<=0}).svg;
    s+=`<text x="${L.b[0]+L.b[2]*120}" y="22" class="t-lbl t-mid">${ct?'As on CT: blood is white':'Slice through the brain'}</text>`;
    const B=brainAxial(L.b[0],L.b[1],L.b[2],{mode:ct?'ct':'plain',sah,orient:true});s+=B.svg;
    if(sah>.5){const bx=L.b[0]+L.b[2]*120,by=L.b[1]+L.b[2]*300;s+=`<text x="${f1(bx)}" y="${f1(by+14)}" class="t-sm t-mid">blood in fissures and sulci</text>`}
    /* thunderclap chart */
    const [cx,cy,cw,ch]=L.c,up=ramp(t,.2,.45),X=v=>cx+cw*v,Y=v=>cy+ch-ch*v;
    s+=`<text x="${cx}" y="${N?cy-8:22}" class="t-lbl">Headache over the first hour</text><rect x="${cx}" y="${cy}" width="${cw}" height="${ch}" style="fill:var(--field)"/><line x1="${cx}" x2="${cx+cw}" y1="${cy+ch}" y2="${cy+ch}" class="axis"/><line x1="${cx}" x2="${cx}" y1="${cy}" y2="${cy+ch}" class="axis"/>`;
    const fT=v=>.92*(1-Math.exp(-v*90)),fO=v=>.6*Math.pow(v,.9);
    const pth=f=>{let d='';const M=60;for(let i=0;i<=M;i++){const u=up*i/M;d+=(i?'L':'M')+f1(X(u))+' '+f1(Y(f(u)))}return d};
    if(up>0){s+=`<path d="${pth(fO)}" style="fill:none;stroke:var(--muted);stroke-width:2;stroke-dasharray:6 4"/><path d="${pth(fT)}" style="fill:none;stroke:var(--artery);stroke-width:3;stroke-linecap:round"/>`;
      s+=`<text x="${f1(cx+12)}" y="${f1(Y(.92)+18)}" class="t-sm" style="fill:var(--ink);font-weight:700;opacity:${f1(ramp(up,.05,.2))}">thunderclap: peaks at once</text>`;
      s+=`<text x="${f1(cx+cw-6)}" y="${f1(Y(.05))}" class="t-sm t-end" style="opacity:${f1(ramp(up,.75,1))}">a headache that builds</text>`}
    s+=`<text x="${f1(cx)}" y="${f1(cy+ch+13)}" class="t-sm">onset</text><text x="${f1(cx+cw)}" y="${f1(cy+ch+13)}" class="t-sm t-end">1 hour</text><text x="${f1(cx+cw/2)}" y="${f1(cy+ch+13)}" class="t-sm t-mid">Schematic</text>`;
    const [sx,sy,sw,sh]=L.st;s+=`<rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" rx="10" style="fill:var(--panel);stroke:var(--line)"/>`+blStats(sx+6,sy+(N?8:6),sw-12,BL_S_STATS[p],N);
    sS.innerHTML=s;setS(p);$('#blSNote').innerHTML=noteHTML(BL_S[p])}
  const stopS=playWire(sR,$('#blSPlay'),drawS,16000,'%t:player.replay%','bleeds');
  const setS=stepWire($('#blSSteps'),BL_S,sR,drawS,stopS);
  drawS(+sR.value);

  /* ---------- Ottawa rule ---------- */
  const ott=new Set();
  $('#blOtt').innerHTML=BL_OTT.map((x,i)=>`<button class="btn" data-ott="${i}" aria-pressed="false">${x}</button>`).join('');
  (function(){const I=icons(10,44,{n:100,cols:25,size:12,gap:4,shape:'dot',k:15,col:'var(--rec)'});
    $('#blOttSvg').innerHTML=`<text x="10" y="18" class="t-lbl">100 people without SAH, derivation study</text><text x="10" y="34" class="t-sm">shaded, about 15: not investigated (specificity 15.3%)</text>`+I.svg})();
  function drawOtt(){const n=ott.size;const head=n?{k:`${n} of 6 ticked`,t:'The rule says investigate'}:{k:'0 of 6 ticked',t:'No item: the rule does not call for investigation'};
    $('#blOttNote').innerHTML=`<div class="kicker">${head.k}</div><h4>${head.t}</h4><p>${BL_OTT_TXT.lede}</p><p>${BL_OTT_TXT.stats}</p><div class="hook"><b>%t:note.hook%</b>${BL_OTT_TXT.hook}</div>`}
  $('#blOtt').addEventListener('click',e=>{const b=e.target.closest('[data-ott]');if(!b)return;const i=+b.dataset.ott;ott.has(i)?ott.delete(i):ott.add(i);b.setAttribute('aria-pressed',ott.has(i));drawOtt()});
  drawOtt();

  /* ---------- 6-hour CT ---------- */
  const cS=$('#blCtSvg'),cR=$('#blCtT'),cD=$('#blCtD');let cDef=false;
  function drawCt(){const h=+cR.value,N=vb(cS,'720 345','400 470'),early=h<=6&&!cDef;let s='';
    const x0=N?20:180,w=N?360:510,X=v=>x0+w*v/12,ty=46;
    s+=`<text x="${N?20:12}" y="${N?18:ty+4}" class="t-lbl">Time from onset</text>`;
    s+=`<rect x="${f1(X(0))}" y="${ty-7}" width="${f1(X(6)-X(0))}" height="14" style="fill:var(--good-soft)"/><rect x="${f1(X(6))}" y="${ty-7}" width="${f1(X(12)-X(6))}" height="14" style="fill:var(--warn-soft)"/>`;
    [0,3,6,9,12].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${ty-7}" y2="${ty+11}" class="axis"/><text x="${f1(X(v))}" y="${ty+24}" class="t-xs t-mid">${v} h</text>`});
    s+=`<path d="M${f1(X(h))} ${ty-9}l-7 -11h14Z" style="fill:var(--ink)"/>`;
    const fy=N?100:106,rh=N?86:52,sx=N?30:290,sw=N?320:400,S=v=>sx+sw*(v-85)/15;
    s+=`<text x="${N?20:12}" y="${fy-10}" class="t-lbl">CT sensitivity for SAH, % with 95% CI</text>`;
    [85,90,95,100].forEach(v=>{s+=`<line x1="${f1(S(v))}" x2="${f1(S(v))}" y1="${fy}" y2="${fy+rh*4}" class="grid"/><text x="${f1(S(v))}" y="${fy+rh*4+14}" class="t-xs t-mid">${v}</text>`});
    BL_CT_FOREST.forEach((r,i)=>{const yy=fy+i*rh+(N?48:28),on=(early&&i===1)||(!early&&i===0);
      if(N){s+=`<text x="20" y="${yy-26}" class="t-sm" style="fill:var(--ink);font-weight:${on?700:500}">${r.n}</text><text x="20" y="${yy-13}" class="t-sm">${r.src}</text>`}
      else{s+=`<text x="12" y="${yy-3}" class="t-sm" style="fill:var(--ink);font-weight:${on?700:500}">${r.n}</text><text x="12" y="${yy+10}" class="t-sm">${r.src}</text>`}
      if(r.lo!=null)s+=`<line x1="${f1(S(r.lo))}" x2="${f1(S(r.hi))}" y1="${yy}" y2="${yy}" style="stroke:var(--ink);stroke-width:2"/>`;
      s+=`<rect x="${f1(S(r.v)-5)}" y="${yy-5}" width="10" height="10" style="fill:${on?'var(--accent)':'var(--brand)'}"/>`;
      s+=`<text x="${f1(Math.min(S(r.v),sx+sw-14))}" y="${yy-10}" class="t-xs t-mid" style="fill:var(--ink)">${r.v}</text>`});
    cS.innerHTML=s;$('#blCtO').textContent=h+' h';cR.setAttribute('aria-valuetext',h+' hours');
    $('#blCtNote').innerHTML=noteHTML(early?BL_CT_N.early:BL_CT_N.late)}
  cR.addEventListener('input',drawCt);cD.addEventListener('click',()=>{cDef=!cDef;cD.setAttribute('aria-pressed',cDef);drawCt()});drawCt();

  /* ---------- SMASH-U ---------- */
  const zS=$('#blCzSvg');let zI=0;
  $('#blCzBtns').innerHTML=BL_SMASH.map((x,i)=>`<button class="btn" data-blz="${i}" aria-pressed="${i===0}">${x.n}</button>`).join('');
  function drawCz(){const N=vb(zS,'560 370','400 430'),W=N?380:540,x0=10;let s='',xx=x0;const Z=BL_SMASH[zI];
    BL_SMASH.forEach((g,i)=>{const w=W*g.p/100,on=i===zI;
      s+=`<rect x="${f1(xx)}" y="8" width="${f1(w-1.5)}" height="30" style="fill:var(${g.col});opacity:${on?1:.35}"/>`;
      s+=`<text x="${f1(xx+w/2)}" y="52" class="t-sm t-mid" style="fill:var(--ink);font-weight:${on?700:500}">${g.p}%</text>`;xx+=w});
    const sc=N?1:1,bx=N?80:20,by=60;
    const o={side:'L',orient:true};if(Z.r)o.bleed={x:Z.x,y:Z.y,r:Z.r,oedema:.2};
    s+=brainAxial(bx,by,sc,o).svg;
    if(Z.mb){const R=rng(7);for(let i=0;i<7;i++){const a=-1.2+R()*1.6;const rr=88+R()*14;s+=`<circle cx="${f1(bx+120+Math.cos(a)*rr*.86)}" cy="${f1(by+150+Math.sin(a)*rr*1.3)}" r="2.1" style="fill:var(--clot)"/>`}}
    if(N){s+=`<text x="200" y="${by+316}" class="t-lbl t-mid">${Z.n}</text><text x="200" y="${by+334}" class="t-sm t-mid">${Z.site}</text>`}
    else{s+=`<text x="290" y="160" class="t-lbl">${Z.n}</text><text x="290" y="178" class="t-big">${Z.p}%</text><text x="290" y="198" class="t-sm">${Z.site}</text><text x="290" y="222" class="t-sm">1013 people, Helsinki</text>`}
    zS.innerHTML=s;$('#blCzNote').innerHTML=noteHTML({k:'SMASH-U',t:Z.n,txt:Z.txt,pt:Z.pt})}
  $('#blCzBtns').addEventListener('click',e=>{const b=e.target.closest('[data-blz]');if(!b)return;zI=+b.dataset.blz;$$('[data-blz]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawCz()});drawCz();

  /* ---------- Boston v2.0 ---------- */
  const bs={};BL_BOS.forEach(q=>bs[q.k]=q.d);
  $('#blBos').innerHTML=BL_BOS.map(q=>`<div class="blgrp"><span>${q.l}</span><div class="blbar" role="group" aria-label="${q.l}">${q.o.map(o=>`<button class="btn" data-bq="${q.k}" data-bv="${o[0]}" aria-pressed="${o[0]===q.d}">${o[1]}</button>`).join('')}</div></div>`).join('')+`<p class="stage-cap">${BL_BOS_CAP}</p>`;
  function drawBos(){const ok=bs.age==='ge'&&bs.pres==='yes'&&bs.deep==='no'&&bs.oth==='no',l=+bs.lob,w=+bs.wm;
    const R=ok&&(l>=2||(l===1&&w===1))?BL_BOS_R.prob:ok&&(l===1||w===1)?BL_BOS_R.poss:BL_BOS_R.none;
    $('#blBosNote').innerHTML=noteHTML(R)}
  $('#blBos').addEventListener('click',e=>{const b=e.target.closest('[data-bq]');if(!b)return;bs[b.dataset.bq]=b.dataset.bv;$$(`[data-bq="${b.dataset.bq}"]`).forEach(x=>x.setAttribute('aria-pressed',x===b));drawBos()});drawBos();

  const prev=redraws.bleeds;redraws.bleeds=()=>{prev&&prev();drawCt();drawCz()};
};
