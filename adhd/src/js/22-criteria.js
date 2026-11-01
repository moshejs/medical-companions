/* =============== 2.2 DSM-5-TR criteria calculator =============== */
/* The scrubber walks the editions from DSM-II (1968) to DSM-5-TR (2022). Thresholds and the age-of-onset
   rule are only drawn from DSM-IV onward, because the research pass compares those editions; earlier
   editions show their name and how the symptom lists were grouped. */
const CR_ERAS=[
 {y:1968,n:'DSM-II',name:'Hyperkinetic Reaction of Childhood',sub:'a short definition focused on overactivity'},
 {y:1980,n:'DSM-III',name:'Attention Deficit Disorder',sub:'with or without hyperactivity'},
 {y:1987,n:'DSM-III-R',name:'Attention-deficit Hyperactivity Disorder',sub:'renamed ADHD; the two subtypes dropped'},
 {y:1994,n:'DSM-IV',name:'ADHD: three subtypes',sub:'inattentive, hyperactive-impulsive, combined'},
 {y:2013,n:'DSM-5',name:'ADHD: three presentations',sub:'onset before 12; 5 symptoms from age 17'},
 {y:2022,n:'DSM-5-TR',name:'ADHD (F90.x) · ICD-11 6A05',sub:'text revision; ICD-11 reporting from 2022'}
];
const CR_STEPS=[
 {from:0,at:.06,k:'1968 · DSM-II',t:'Hyperkinetic reaction',
  txt:'DSM-II called it "Hyperkinetic Reaction of Childhood". The definition was two sentences long, centred on overactivity, and noted that the behaviour "usually diminishes by adolescence". [[Lange2010,Epstein2013]]',
  pt:'Early on, doctors thought of this mainly as a restless childhood problem that would fade by the teenage years.',
  hook:'DSM-II (1968): "Hyperkinetic Reaction of Childhood". [[Lange2010]]'},
 {from:.13,at:.2,k:'1980 · DSM-III',t:'Attention takes the name',
  txt:'DSM-III renamed it "Attention Deficit Disorder (with or without hyperactivity)" and gave separate symptom lists for inattention, impulsivity and hyperactivity. Attention problems were now at the centre of the definition. [[Lange2010,Epstein2013]]',
  pt:'The name changed to put attention first. A person could have the condition without being hyperactive.',
  hook:'DSM-III (1980): ADD with or without hyperactivity, three separate lists. [[Lange2010]]'},
 {from:.27,at:.34,k:'1987 · DSM-III-R',t:'One list: ADHD',
  txt:'DSM-III-R introduced the name "Attention-deficit Hyperactivity Disorder (ADHD)" and dropped the two subtypes. [[Lange2010]]',
  pt:'The name ADHD dates from 1987.'},
 {from:.41,at:.5,k:'1994 · DSM-IV',t:'18 symptoms, three subtypes',
  txt:'DSM-IV set out three subtypes (predominantly inattentive, predominantly hyperactive-impulsive, combined) after a large field trial in children and adolescents up to age 17. Its two lists of 9 symptoms are the same 18 symptoms used today. Symptoms and impairment had to be present before age 7, impairment had to show in two or more settings, and autism excluded an ADHD diagnosis. DSM-IV-TR (2000) mostly changed the descriptive text. [[Lange2010,Epstein2013]]',
  pt:'From 1994 the checklist had two parts, attention and hyperactivity-impulsivity, each with 9 items. That checklist is still used.',
  hook:'DSM-IV: onset of impairing symptoms before <b>7</b>; 6 of 9 in a domain at every age; autism excluded ADHD. [[Epstein2013]]'},
 {from:.6,at:.8,k:'2013 · DSM-5',t:'Onset 12, adults 5, autism allowed',
  txt:'DSM-5 kept the 18 symptoms and added examples of how they look in adolescents and adults. The threshold fell from 6 to 5 symptoms per domain at age 17 and over. Onset moved from "symptoms and impairment before 7" to "several symptoms before 12". Criterion C now asks for symptoms, not impairment, in two or more settings. Autism stopped being an exclusion, "subtypes" became "presentations", and severity and partial-remission specifiers were added. [[Epstein2013,Posner2020]] In a British birth cohort of 2,232 children, raising the onset age to 12 raised prevalence at age 12 by only 0.1%. [[Polanczyk2010AgeOnset]]',
  pt:'The 2013 changes made it easier to recognise ADHD in teenagers and adults, and allowed ADHD and autism to be diagnosed together.',
  hook:'DSM-5: onset <b>&lt;12</b> (was 7); <b>5</b> symptoms at 17+; presentations replace subtypes; autism no longer exclusionary. [[Epstein2013]]'},
 {from:.84,at:.94,k:'2022 · DSM-5-TR and ICD-11',t:'Today’s criteria',
  txt:'DSM-5-TR (2022) keeps Criteria A to E: 6 or more symptoms in a domain up to age 16, 5 or more from age 17, for at least 6 months, several before 12, in two or more settings, with clear interference with functioning, and not better explained by another condition. [[APA2022DSM,Posner2020]] ICD-11, used for reporting from 1 January 2022, codes ADHD as 6A05 in the neurodevelopmental disorders and names the same three presentations, but asks for "several" symptoms rather than a fixed count. [[Reed2019ICD11,TebartzVanElst2025,Posner2020]]',
  pt:'Today the two main manuals agree closely. The American one counts symptoms; the WHO one describes them.',
  hook:'Codes: combined F90.2 / 6A05.2, inattentive F90.0 / 6A05.0, hyperactive-impulsive F90.1 / 6A05.1. [[APA2022DSM,TebartzVanElst2025]]'}
];
/* criteria items: close paraphrases of DSM-5-TR A1 and A2 [[APA2022DSM]] */
const CR_A1=['Careless mistakes or misses details','Trouble keeping attention on tasks or play','Seems not to listen when spoken to directly','Does not follow through; leaves tasks unfinished','Trouble organising tasks and activities','Avoids or dislikes tasks that need sustained mental effort','Loses things needed for tasks','Easily distracted (in adults this can include unrelated thoughts)','Forgetful in daily activities'];
const CR_A2=['Fidgets, taps or squirms','Leaves seat when staying seated is expected','Runs or climbs when it is inappropriate (in teens and adults, may be only restlessness)','Cannot play or do leisure activities quietly','“On the go”, as if “driven by a motor”','Talks excessively','Blurts out answers','Trouble waiting their turn','Interrupts or intrudes on others'];
const CR_OTHER=[
 {id:'dur',t:'Symptoms have lasted 6 months or more',s:'Criterion A, duration'},
 {id:'b',t:'Several symptoms were present before age 12',s:'Criterion B'},
 {id:'c',t:'Several symptoms show in two or more settings (home, school or work, friends, other activities)',s:'Criterion C'},
 {id:'d',t:'Clear evidence they interfere with, or reduce the quality of, social, school or work functioning',s:'Criterion D'},
 {id:'e',t:'Not better explained by another condition (for example a mood, anxiety or psychotic disorder, or substance intoxication or withdrawal)',s:'Criterion E'}
];
const CR_PRESETS={
 kid:{age:'u',a1:[0,1,2,3,4,6,8],a2:[0],o:['dur','b','c','d','e'],lab:'An 8-year-old with mostly inattentive symptoms'},
 adult:{age:'o',a1:[1,3,4,7,8],a2:[0,4,5,8,2],o:['dur','b','c','d','e'],lab:'An adult with 5 symptoms in each domain'},
 teen:{age:'u',a1:[1,3,4,7,8],a2:[0,4],o:['dur','b','c','d','e'],lab:'A 14-year-old with 5 inattentive symptoms'},
 one:{age:'u',a1:[],a2:[0,1,2,3,4,5,6,7],o:['dur','b','d','e'],lab:'A 6-year-old whose symptoms are seen only at home'}
};
inits.criteria=()=>{
  /* ---------------- the editions scrubber ---------------- */
  const svg=$('#crSvg'),rg=$('#crT');
  const KN=[[.06,1968],[.2,1980],[.34,1987],[.5,1994],[.8,2013],[.94,2022]];
  const yearOf=t=>{if(t<=KN[0][0])return KN[0][1];for(let i=1;i<KN.length;i++)if(t<=KN[i][0])return lerp(KN[i-1][1],KN[i][1],(t-KN[i-1][0])/(KN[i][0]-KN[i-1][0]));return 2022};
  function draw(t){
    const N=vb(svg,'720 380','400 688');
    const p=phaseOf(CR_STEPS,t),E=CR_ERAS[p],yr=yearOf(t);
    const fade=ramp(t,CR_STEPS[p].from,CR_STEPS[p].from+.035);
    /* the DSM-IV -> DSM-5 morph */
    const mOn=ease(ramp(t,.6,.7)),mAd=ease(ramp(t,.62,.72)),mAu=ease(ramp(t,.64,.74)),mPr=ease(ramp(t,.66,.76)),mSet=ease(ramp(t,.68,.78)),mSp=ease(ramp(t,.7,.8)),mIcd=ease(ramp(t,.84,.92));
    const L=N?{tx0:28,tx1:372,ty:34,nx:20,ny:80,sy:100,
      op:{x:12,y:118,w:376,h:224},rx0:34,rx1:366,ry:288,sp:{x:12,y:354,w:376,h:170},ch:{x:12,y:536,w:376,h:140,cw:184,chh:64}}
             :{tx0:40,tx1:680,ty:34,nx:28,ny:84,sy:104,
      op:{x:20,y:122,w:336,h:246},rx0:44,rx1:336,ry:300,sp:{x:370,y:122,w:330,h:150},ch:{x:370,y:282,w:330,h:86,cw:163,chh:41}};
    let s=`<defs>${marker('crArr','var(--dx)',6)}</defs>`;
    /* timeline */
    const Yx=y=>lerp(L.tx0,L.tx1,(y-1965)/(2025-1965));
    s+=`<line x1="${L.tx0}" x2="${L.tx1}" y1="${L.ty}" y2="${L.ty}" style="stroke:var(--line);stroke-width:3;stroke-linecap:round"/>`;
    s+=`<line x1="${L.tx0}" x2="${f1(Yx(yr))}" y1="${L.ty}" y2="${L.ty}" style="stroke:var(--dx);stroke-width:3;stroke-linecap:round"/>`;
    CR_ERAS.forEach((e,i)=>{const x=Yx(e.y),on=i<=p;
      s+=`<circle cx="${f1(x)}" cy="${L.ty}" r="${i===p?6.5:4.5}" style="fill:${on?'var(--dx)':'var(--panel)'};stroke:var(--dx);stroke-width:1.6"/>`;
      const up=i%2===0;
      s+=`<text x="${f1(x)}" y="${up?L.ty-12:L.ty+20}" class="t-xs t-mid" style="${i===p?'fill:var(--ink);font-weight:700':''}">${N?e.y:e.n+' · '+e.y}</text>`});
    s+=`<path d="M${f1(Yx(yr)-5)} ${L.ty+10}L${f1(Yx(yr)+5)} ${L.ty+10}L${f1(Yx(yr))} ${L.ty+4}Z" style="fill:var(--ink);opacity:${N?0:1}"/>`;
    /* edition name */
    s+=`<g style="opacity:${f1(.25+.75*fade)}"><text x="${L.nx}" y="${L.ny}" style="font:700 ${N?17:22}px var(--display);fill:var(--dx)">${E.n} · ${Math.round(yr)}</text>`;
    s+=`<text x="${L.nx+(N?0:170)}" y="${N?L.sy:L.ny}" class="t-lbl" style="${N?'':'font-size:15px'}">${E.name}</text>`;
    s+=`<text x="${L.nx+(N?0:170)}" y="${N?L.sy+15:L.sy}" class="t-sm">${E.sub}</text></g>`;
    /* ---- panel 1: the lifespan and the onset rule ---- */
    const O=L.op;s+=`<rect x="${O.x}" y="${O.y}" width="${O.w}" height="${O.h}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=`<text x="${O.x+14}" y="${O.y+20}" class="t-sm" style="font-weight:600">AGE OF ONSET ON A LIFESPAN</text>`;
    const AX=a=>lerp(L.rx0,L.rx1,clamp(a/40)),ry=L.ry;
    s+=`<line x1="${L.rx0}" x2="${L.rx1}" y1="${ry}" y2="${ry}" style="stroke:var(--muted);stroke-width:1.6"/>`;
    [0,7,12,17,30,40].forEach(a=>s+=`<line x1="${f1(AX(a))}" x2="${f1(AX(a))}" y1="${ry}" y2="${ry+5}" style="stroke:var(--muted)"/><text x="${f1(AX(a))}" y="${ry+17}" class="t-xs t-mid">${a}</text>`);
    s+=`<text x="${L.rx1}" y="${ry+31}" class="t-xs t-end">age in years</text>`;
    let onTxt='',onTxt2='';
    if(p===0){/* expected to fade by adolescence */
      for(let i=0;i<24;i++){const a0=i*.6,a1=a0+.6,al=clamp(1-a0/14);s+=`<rect x="${f1(AX(a0))}" y="${ry-26}" width="${f1(AX(a1)-AX(a0)+.4)}" height="18" style="fill:var(--dx);opacity:${f1(al*.5*fade)}"/>`}
      onTxt='“usually diminishes by adolescence”';onTxt2='a childhood problem expected to fade';
    } else if(p<3){
      s+=`<rect x="${f1(AX(0))}" y="${ry-26}" width="${f1(AX(13)-AX(0))}" height="18" rx="3" style="fill:var(--dx-soft);stroke:var(--dx);stroke-dasharray:3 3;opacity:${f1(fade)}"/>`;
      onTxt='described as a childhood disorder';onTxt2='age rules of these editions are not compared here';
    } else {
      const oa=lerp(7,12,mOn);
      s+=`<rect x="${f1(AX(0))}" y="${ry-26}" width="${f1(AX(oa)-AX(0))}" height="18" rx="3" style="fill:var(--dx);opacity:.55"/>`;
      s+=`<line x1="${f1(AX(oa))}" x2="${f1(AX(oa))}" y1="${ry-40}" y2="${ry}" style="stroke:var(--dx);stroke-width:2.2"/>`;
      s+=`<text x="${f1(AX(oa)+6)}" y="${ry-31}" class="t-lbl">before ${oa.toFixed(mOn>0&&mOn<1?1:0)}</text>`;
      if(mAd>0){s+=`<rect x="${f1(AX(17))}" y="${ry-26}" width="${f1(AX(40)-AX(17))}" height="18" rx="3" style="fill:var(--accent-soft);stroke:var(--accent);opacity:${f1(mAd)}"/><text x="${f1(AX(28.5))}" y="${ry-13}" class="t-xs t-mid" style="fill:var(--accent);opacity:${f1(mAd)}">5-symptom threshold from 17</text>`}
      onTxt=mOn<.5?'symptoms and impairment before age 7':'several symptoms before age 12';
      onTxt2=mOn<.5?'the DSM-IV onset rule':'the DSM-5 and DSM-5-TR onset rule';
    }
    s+=`<text x="${O.x+14}" y="${O.y+44}" class="t-lbl" style="fill:var(--dx)">${onTxt}</text><text x="${O.x+14}" y="${O.y+60}" class="t-xs">${onTxt2}</text>`;
    /* a pupil at a desk (child years) and, from DSM-5, an adult beside the ruler */
    const dk=N?{x:AX(7)+6,y:ry-46,s:44}:{x:AX(8),y:ry-50,s:54};
    s+=desk(dk.x,dk.y,dk.s,{fidget:p===0?.9:p<3?.4:.55,distract:p===0?0:.7,t,fill:'var(--dx)'});
    const adA=mAd;if(adA>0){s+=`<g style="opacity:${f1(adA)}">${person(AX(30),ry-(N?72:86),N?30:36,'var(--accent)')}</g><text x="${f1(AX(30)+(N?20:24))}" y="${f1(ry-(N?58:70))}" class="t-xs" style="opacity:${f1(adA)}">adult</text><text x="${f1(AX(30)+(N?20:24))}" y="${f1(ry-(N?47:58))}" class="t-xs" style="opacity:${f1(adA)}">examples</text>`}
    /* ---- panel 2: how the symptoms are listed ---- */
    const S=L.sp;s+=`<rect x="${S.x}" y="${S.y}" width="${S.w}" height="${S.h}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=`<text x="${S.x+14}" y="${S.y+20}" class="t-sm" style="font-weight:600">SYMPTOM LISTS</text>`;
    const gx=S.x+14,gy=S.y+36;
    s+=`<g style="opacity:${f1(.2+.8*fade)}">`;
    if(p===0){s+=`<rect x="${gx}" y="${gy}" width="${S.w-28}" height="${S.h-52}" rx="8" style="fill:var(--dx-soft);stroke:var(--dx)"/><text x="${f1(S.x+S.w/2)}" y="${f1(gy+(S.h-52)/2-2)}" class="t-lbl t-mid">overactivity</text><text x="${f1(S.x+S.w/2)}" y="${f1(gy+(S.h-52)/2+14)}" class="t-xs t-mid">a two-sentence definition</text>`}
    else if(p===1){const w=(S.w-28-16)/3;['inattention','impulsivity','hyperactivity'].forEach((n,i)=>{const x=gx+i*(w+8);s+=`<rect x="${f1(x)}" y="${gy}" width="${f1(w)}" height="${S.h-52}" rx="8" style="fill:var(--dx-soft);stroke:var(--dx)"/><text x="${f1(x+w/2)}" y="${f1(gy+(S.h-52)/2+4)}" class="t-sm t-mid" style="fill:var(--ink)">${n}</text>`});
      s+=`<text x="${f1(S.x+S.w/2)}" y="${S.y+S.h-6}" class="t-xs t-mid">three separate lists</text>`}
    else if(p===2){s+=`<rect x="${gx}" y="${gy}" width="${S.w-28}" height="${S.h-52}" rx="8" style="fill:var(--dx-soft);stroke:var(--dx)"/><text x="${f1(S.x+S.w/2)}" y="${f1(gy+(S.h-52)/2+4)}" class="t-lbl t-mid">one ADHD list, no subtypes</text>`}
    else {/* two domains of 9; filled dots show the threshold for each age group */
      const dx=N?18.6:16,dr=dx*.5,rows=[['under 17',6,6],['17 and over',6,lerp(6,5,mAd)]];
      const lx=gx,dx0=gx-dr+dr;
      s+=`<text x="${dx0}" y="${gy+4}" class="t-xs">inattention (9)</text><text x="${f1(dx0+9*dx+12)}" y="${gy+4}" class="t-xs">hyp.-imp. (9)</text>`;
      rows.forEach(([lab,,thr],r)=>{const y=gy+30+r*40;
        s+=`<text x="${lx}" y="${y-11}" class="t-sm" style="fill:var(--ink)">${lab}</text>`;
        for(const dmn of [0,1])for(let k=0;k<9;k++){const x=dx0+dmn*(9*dx+12)+k*dx+dr,fill=k<Math.floor(thr)?1:k<thr?thr-Math.floor(thr):0;
          s+=`<circle cx="${f1(x)}" cy="${y}" r="${dr*.62}" style="fill:${dmn?'var(--drug)':'var(--dx)'};opacity:${f1(.15+.85*fill)};stroke:${dmn?'var(--drug)':'var(--dx)'};stroke-width:1"/>`}
        const tv=Math.round(thr);s+=`<text x="${f1(dx0+18*dx+12)}" y="${y-11}" class="t-xs t-end" style="fill:${r&&mAd>0?'var(--accent)':'var(--muted)'}">≥${tv} in a domain</text>`});
      const tyL=gy+104;
      s+=`<text x="${gx}" y="${tyL}" class="t-xs">${mPr<.5?'groups called “subtypes”':'groups called “presentations”: profiles shift with age'}</text>`}
    s+='</g>';
    /* ---- panel 3: the four rule changes as chips ---- */
    const C=L.ch,chips=[
      {a:mAu,o:'autism excludes ADHD',n:'ADHD and autism together',c:'var(--good)'},
      {a:mSet,o:'impairment in ≥2 settings',n:'symptoms in ≥2 settings',c:'var(--dx)'},
      {a:mSp,o:'no severity specifier',n:'severity · partial remission',c:'var(--dx)'},
      {a:mIcd,o:'ICD-10 F90: hyperkinetic',n:'ICD-11 6A05: no fixed count',c:'var(--accent)'}];
    chips.forEach((c,i)=>{const cx=C.x+(i%2)*(C.cw+(C.w-2*C.cw)),cy=C.y+Math.floor(i/2)*(C.chh+(C.h-2*C.chh)),live=p>=3;
      const col=c.a>.5?c.c:'var(--muted)';
      s+=`<rect x="${f1(cx)}" y="${f1(cy)}" width="${C.cw}" height="${C.chh}" rx="9" style="fill:${c.a>.5?'var(--panel)':'var(--panel-2)'};stroke:${col};stroke-width:${c.a>.5?1.6:1};opacity:${live?1:.35}"/>`;
      const txt=c.a>.5?c.n:c.o;
      s+=`<text x="${f1(cx+10)}" y="${f1(cy+C.chh/2-(N?6:2))}" class="t-xs" style="fill:${col};font-weight:600">${c.a>.5?(i===3?'2022':'DSM-5'):(i===3?'before':'DSM-IV')}</text><text x="${f1(cx+10)}" y="${f1(cy+C.chh/2+(N?10:12))}" class="t-xs" style="fill:var(--ink)">${txt}</text>`;
      if(i===0){const lx=cx+C.cw-16,ly=cy+10,op=c.a;/* a padlock that opens */
        s+=`<rect x="${f1(lx-7)}" y="${f1(ly-2)}" width="14" height="11" rx="2" style="fill:${col};opacity:${live?.85:.3}"/><path d="M${f1(lx-4.5)} ${f1(ly-2)}V${f1(ly-6)}A4.5 4.5 0 0 1 ${f1(lx+4.5)} ${f1(ly-6)}V${f1(ly-2-op*6)}" style="fill:none;stroke:${col};stroke-width:1.8;opacity:${live?1:.3}"/>`}});
    svg.innerHTML=s;
    setSt(p);
    rg.setAttribute('aria-valuetext',`${E.n}, ${Math.round(yr)}: ${E.name}`);
    $('#crNote').innerHTML=noteHTML(CR_STEPS[p]);
  }
  const stop=playWire(rg,$('#crPlay'),draw,22000,'Replay','criteria');
  const setSt=stepWire($('#crSteps'),CR_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------------- the teaching calculator ---------------- */
  const box=(arr,pre)=>arr.map((t,i)=>`<label for="${pre}${i}"><input type="checkbox" id="${pre}${i}" data-cr="${pre}"><span><b>${String.fromCharCode(97+i)}</b> ${t}</span></label>`).join('');
  $('#crA1').innerHTML=box(CR_A1,'crA1_');
  $('#crA2').innerHTML=box(CR_A2,'crA2_');
  $('#crOther').innerHTML=CR_OTHER.map(o=>`<label for="crO_${o.id}"><input type="checkbox" id="crO_${o.id}" data-cr="o"><span><b>${o.s}</b> ${o.t}</span></label>`).join('');
  const gs=$('#crGauge');
  const cnt=pre=>$$(`input[data-cr="${pre}"]`).filter(i=>i.checked).length;
  let last={a1:0,a2:0},gStop=null;
  function gauge(a1,a2,thr,oth){const NG=vb(gs,'720 150','400 250');
    let s='';const rows=[['Inattention (A1)',a1,'var(--dx)'],['Hyperactivity-impulsivity (A2)',a2,'var(--drug)']];
    const x0=NG?20:220,w=NG?360:470,seg=w/9;
    rows.forEach(([lab,n,c],r)=>{const y=NG?(22+r*64):(18+r*44);
      s+=`<text x="${NG?x0:x0-12}" y="${NG?y:y+18}" class="t-lbl ${NG?'':'t-end'}">${lab}</text>`;
      const by=NG?y+8:y;
      for(let k=0;k<9;k++){const on=k<n-.001,part=clamp(n-k);s+=`<rect x="${f1(x0+k*seg+1)}" y="${by}" width="${f1(seg-3)}" height="26" rx="5" style="fill:var(--panel-2);stroke:var(--line)"/>`;
        if(part>0)s+=`<rect x="${f1(x0+k*seg+1)}" y="${by}" width="${f1((seg-3)*part)}" height="26" rx="5" style="fill:${c};opacity:${k<thr?.85:.55}"/>`}
      const tx=x0+thr*seg-1;s+=`<line x1="${f1(tx)}" x2="${f1(tx)}" y1="${by-6}" y2="${by+32}" style="stroke:var(--ink);stroke-width:2;stroke-dasharray:4 3"/>`;
      const met=n>=thr-.001;s+=`<text x="${f1(x0+w)}" y="${by+(NG?44:42)}" class="t-xs t-end" style="fill:${met?'var(--good)':'var(--muted)'};font-weight:700">${Math.round(n)} of 9 · ${met?'threshold met':'needs '+thr}</text>`});
    /* criteria lamps */
    const ly=NG?170:124,lw=NG?72:94,lx0=NG?20:220;
    CR_OTHER.forEach((o,i)=>{const x=lx0+i*lw,on=oth[o.id];
      s+=`<circle cx="${f1(x+8)}" cy="${ly+(NG?14:0)}" r="7" style="fill:${on?'var(--good)':'var(--panel)'};stroke:${on?'var(--good)':'var(--muted)'};stroke-width:1.6"/><text x="${f1(x+20)}" y="${ly+(NG?18:4)}" class="t-xs" style="fill:${on?'var(--ink)':'var(--muted)'}">${o.id==='dur'?'≥6 mo':o.s.replace('Criterion ','')}</text>`});
    if(!NG)s+=`<text x="${lx0-12}" y="${ly+4}" class="t-xs t-end">B–E and duration</text>`;
    else s+=`<text x="20" y="${ly-6}" class="t-xs">duration and Criteria B–E</text>`;
    s+=`<text x="${NG?20:220}" y="${NG?236:146}" class="t-xs">dashed line: threshold for the age chosen (${thr} of 9)</text>`;
    gs.innerHTML=s}
  function calc(){
    const age=$('#crAge').value,thr=age==='o'?5:6,a1=cnt('crA1_'),a2=cnt('crA2_');
    const oth={};CR_OTHER.forEach(o=>oth[o.id]=$('#crO_'+o.id).checked);
    const A1=a1>=thr,A2=a2>=thr,A=A1||A2,miss=[];
    if(!A)miss.push(`<b>Criterion A</b>: ${thr} or more symptoms in at least one domain (now ${a1} inattentive, ${a2} hyperactive-impulsive)`);
    CR_OTHER.forEach(o=>{if(!oth[o.id])miss.push(`<b>${o.s}</b>: ${o.t.charAt(0).toLowerCase()+o.t.slice(1)}`)});
    const pres=A1&&A2?['combined','F90.2']:A1?['predominantly inattentive','F90.0']:A2?['predominantly hyperactive-impulsive','F90.1']:null;
    let v;
    if(A&&!miss.length)v=`<div class="verdict yes">The ticked pattern matches the DSM-5-TR criteria for ADHD, ${pres[0]} presentation (${pres[1]}).</div>
      <p>Symptoms beyond the threshold: ${Math.max(0,a1-thr)} inattentive, ${Math.max(0,a2-thr)} hyperactive-impulsive. DSM-5-TR grades current severity as mild, moderate or severe from how many symptoms exceed the threshold <i>and</i> how much impairment they cause, so this tool does not grade it. [[APA2022DSM,Epstein2013]]</p>`;
    else if(A)v=`<div class="verdict maybe">Criteria not met: the symptom count is reached (${pres[0]} pattern), but ${miss.length} other requirement${miss.length>1?'s are':' is'} missing.</div><ul class="crmiss">${miss.map(m=>`<li>${m}</li>`).join('')}</ul>`;
    else v=`<div class="verdict no">Criteria not met.</div><ul class="crmiss">${miss.map(m=>`<li>${m}</li>`).join('')}</ul>`;
    const near=!A&&(a1>=thr-2||a2>=thr-2)&&(a1+a2)>0?`<p>When impairing ADHD-type symptoms do not meet full criteria, DSM-5-TR has "other specified ADHD" (F90.8, which records the reason) and "unspecified ADHD" (F90.9). [[APA2022DSM]]</p>`:'';
    const note=age==='o'&&A?`<p>At 17 and over, 5 symptoms in a domain are enough; DSM-5 lowered this from 6. [[Epstein2013]]</p>`:'';
    $('#crOut').innerHTML=`<div class="kicker">Teaching result</div>${v}${near}${note}<p class="crend"><b>Only a clinician's assessment can diagnose ADHD.</b> It rests on interviews with the person and their family, history and reports from several settings, not on a checklist. [[Faraone2021,Posner2020]]</p>`;
    /* animate the gauges toward the new counts */
    gStop&&gStop();const f0={...last},to={a1,a2};
    gStop=animate(380,q=>{const e=ease(q);gauge(lerp(f0.a1,to.a1,e),lerp(f0.a2,to.a2,e),thr,oth)},()=>{last=to;gauge(a1,a2,thr,oth)});
    last=to;
  }
  $('#m-criteria').addEventListener('change',e=>{if(e.target.closest('#crCalc'))calc()});
  /* preset examples; aria-pressed shows which one is loaded */
  const pbs=$$('[data-crp]');
  pbs.forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.crp;pbs.forEach(x=>x.setAttribute('aria-pressed',x===b?'true':'false'));
    $$('#crCalc input[type=checkbox]').forEach(i=>i.checked=false);
    if(k!=='clear'){const P=CR_PRESETS[k];$('#crAge').value=P.age;P.a1.forEach(i=>$('#crA1_'+i).checked=true);P.a2.forEach(i=>$('#crA2_'+i).checked=true);P.o.forEach(id=>$('#crO_'+id).checked=true);
      $('#crPresetLab').textContent='Loaded: '+P.lab+'. Change any box to see what moves.'}
    else $('#crPresetLab').textContent='All boxes cleared.';
    calc()}));
  gauge(0,0,6,{});calc();
  /* re-lay the gauge when the phone/desktop mode changes */
  const prevR=redraws.criteria;redraws.criteria=()=>{prevR&&prevR();calc()};
};
