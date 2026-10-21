/* =============== 4.1 living with ALS =============== */
const LV_STEPS=[
 {from:0,at:.04,k:'Early',t:'Natural speech, early bulbar change',
  txt:`More than 80% of people living with MND develop speech difficulties; this is background stated in secondary sources [[Cave2021,Ball2004]]. In 30 people followed for 2 years, speech stayed adequate on average for 18 months from the first bulbar symptom. Then intelligibility and speaking rate fell in nearly all of them, faster in bulbar-onset disease, and 60% reached "poor" speech that needed alternative methods [[Makkonen2018]].`,
  pt:`For a while speech stays clear. Then it slows and gets harder for others to follow, sooner when ALS starts in the mouth and throat.`,
  hook:`AAC means <b>augmentative and alternative communication</b>: anything from a letter board to an eye-gaze computer.`},
 {from:.14,at:.18,k:'While speech is clear',t:'Voice and message banking',
  txt:`Voice banking builds a synthetic approximation of a person's own voice for later use in a speech-generating device. Message banking records whole words and phrases in the person's voice for playback. In interviews with 12 people with MND, preserving identity was the main motivation, and few understood how a banked voice is actually used [[Cave2021]]. In one survey most people with MND, family members and clinicians had never heard of message banking, but all were interested [[Oosthuizen2018]]. The EAN 2024 guideline names banking among the reasons to refer to a specialised AAC hub [[VanDamme2024]].`,
  pt:`Recording one's own voice while it is still clear lets a later device speak with something close to it.`,
  hook:`<b>Voice banking</b> builds a synthetic voice; <b>message banking</b> stores whole recorded phrases. They are not the same thing.`},
 {from:.28,at:.32,k:'Assessment',t:'Assessment and low-tech AAC',
  txt:`NICE NG42 says speech and communication should be assessed by a speech and language therapist "without delay", and AAC equipment provided without delay: low-tech aids such as alphabet, word or picture boards, and high-tech voice-output aids on a PC or tablet, with needs reviewed as MND progresses [[NICE2016]]. In a US survey of 216 people with ALS, just over half of those with severe speech impairment also used low-tech AAC, and fewer than half said their family had received communication education or support [[Peters2024]].`,
  pt:`A speech and language therapist assesses early. Simple boards with letters, words or pictures work anywhere, even when a device is not at hand.`,
  hook:`NICE NG42: assessment and AAC equipment <b>without delay</b>, both low-tech and high-tech [[NICE2016]].`},
 {from:.42,at:.46,k:'Middle',t:'Typing and text-to-speech',
  txt:`Tablet- or PC-based voice-output aids turn typed text into speech, and they can speak in a banked voice [[NICE2016,Cave2021]]. In 50 people followed over 4 years at one US centre, 96% accepted AAC technology (90% straight away, 6% after a delay), 4% rejected it, and none stopped using it [[Ball2004]]. Over 90% of US survey respondents with severe speech impairment used speech-generating devices [[Peters2024]].`,
  pt:`Typing on a tablet that speaks aloud takes over when speech no longer carries. Almost everyone offered this at one clinic took it up.`,
  hook:`Ball 2004: <b>96%</b> accepted AAC technology and none stopped using it [[Ball2004]].`},
 {from:.56,at:.60,k:'Later',t:'Eye-gaze',
  txt:`When hand use is lost, eye-tracking systems let a person select letters and phrases by looking at them. NICE says people who need complex technology such as eye-gaze access should be referred to a specialised NHS AAC hub [[NICE2016]]. In 11 people with advanced ALS (mean ALSFRS-R 5.3; 82% on invasive ventilation), mean daily use was 9.1 hours (range 0.5-16), satisfaction was high, and use was associated with higher psychological well-being [[Linse2018]].`,
  pt:`A camera follows the eyes. Holding the gaze on a letter or a phrase selects it, and the device speaks it.`,
  hook:`Eye-gaze access is a reason NICE gives for referral to a <b>specialised AAC hub</b> [[NICE2016]].`},
 {from:.70,at:.74,k:'A minority',t:'Locked-in states on long-term ventilation',
  txt:`Among 70 people on tracheostomy ventilation in Japan, 11.4% developed a totally locked-in state, and among those ventilated for more than 5 years 18.2% did so and 33.1% reached a minimal communication state [[Hayashi2003]]. A nationwide survey found it in 89 of 709 people on tracheostomy ventilation (13%) [[Kawata2008]]. No source read for this guide gives a figure across all people with ALS: these numbers apply only to people on long-term tracheostomy ventilation. In 19 people in a locked-in state who answered by eye-tracking, most reported a positive quality of life [[KuzmaKozakiewicz2019]].`,
  pt:`A small share of people who live for years on a breathing machine through the neck lose eye movement as well. In one small study, most people in a locked-in state still rated their quality of life as positive.`,
  hook:`The 11-13% locked-in figures come from people on <b>tracheostomy ventilation</b>, not from all people with ALS [[Hayashi2003,Kawata2008]].`},
 {from:.84,at:.88,k:'Research',t:'Brain-computer interfaces',
  txt:`<span class="ev early">Early evidence</span> Results so far come from single participants or very small groups. In 2016 a fully implanted interface let one woman with late-stage ALS type at about 2 letters a minute [[Vansteensel2016]]. In 2023 an intracortical speech interface decoded attempted speech at 62 words a minute (word error rate 9.1% on 50 words, 23.8% on 125,000 words) [[Willett2023]]. In 2024 one man reached 97.5% accuracy over 8.4 months, at about 32 words a minute, in a voice designed to sound like his voice before ALS [[Card2024]]. In 2025 voice was synthesised instantly from brain signals [[Wairagkar2025]]. One person in a completely locked-in state spelled letter by letter [[Chaudhary2022]], and an endovascular device was implanted in 4 people with no device-related serious adverse events over 12 months [[Mitchell2023]].`,
  pt:`Sensors on or in the brain can turn attempted speech into text or voice. So far this works in research with one or a few people at a time.`,
  hook:`Brain-computer interfaces are <b>early evidence</b>: single participants or tiny series, not routine care.`}
];
const LV_TXT={
 title:'COMMUNICATION OVER THE COURSE',
 stepOf:(i,n)=>`Step ${i} of ${n}`,
 bars:['Speech intelligibility','Hand use','Eye movement'],
 speechW:['clear','slower, less clear','hard to understand','not usable for most needs'],
 handW:['typing and pointing','weaker, slower','little or no hand use'],
 eyeW:'usually kept',eyeMinor:'may be lost (minority, TPPV)',
 sch:'Bars are schematic, not measured values',
 courseW:'course of the illness →',courseN:'course of the illness ↓',
 stW:[ ['Natural','speech'],['Voice','banking'],['Letter and','word boards'],['Typing to','speech'],['Eye-gaze','access'],['Locked-in','(on TPPV)'],['Brain','interfaces'] ],
 stN:['Natural speech','Voice/message banking','Letter and word boards','Typing to speech','Eye-gaze access','Locked-in (on TPPV)','Brain interfaces'],
 evTag:'EARLY EVIDENCE',
 capW:'Each step: what studies and guidelines describe, not a recommendation.',
 capN:['What studies and guidelines','describe, not a recommendation.'],
 hello:'Good morning',s1:'clear at first, then slower and less clear',
 bank:'voice bank',vb:'voice banking: a synthetic voice',mb:'message banking: whole phrases',
 alpha:'ABCDEFGHIJKLMNOPQRSTUVWXYZ',yes:'YES',no:'NO',spell:'TEA',spelled:s=>`spelled: ${s}`,
 kb:['QWERTYUIOP','ASDFGHJKL','ZXCVBNM'],msg:'Please open the window',speaks:['speaks aloud','in a banked voice'],
 gazeKeys:['Yes','No','Water','Pain','Thank you','Later'],tracker:'eye tracker',
 tlsT:'Of 100 people on tracheostomy ventilation',tls:['about 11 to 13 of them','became totally','locked-in (Japan)'],tlsNot:['Not a figure for','all people with ALS'],
 dec:'decoder',out:'text or voice',
 ms:[ ['2016','about 2','letters/min'],['2023','62','words/min'],['2024','32 words/min','over 8 months'],['2025','instant','voice'] ],
 bciCap:'single participants or very small groups',
 /* ECAS */
 ecN:['ALS-Specific','ALS Non-specific','Total'],
 cut:c=>`cut-off ${c}`,
 score:(v,m,st)=>`${v} of ${m} · ${st}`,
 ecSt:{below:'below cut-off',at:'at the cut-off',above:'above cut-off'},
 ecK:'Original ECAS cut-offs',
 ecT:(n,m)=>n===0?'No score is below its original cut-off':`${n} of ${m} scores are below their original cut-offs`,
 ecLine:(name,v,m,c,st)=>`${name}: ${v} of ${m}, ${st} (${c})`,
 ecTxt:`The original cut-offs, derived from healthy controls, were 77 of 100 (ALS-Specific), 24 of 36 (ALS Non-specific) and 105 of 136 (Total) [[Abrahams2014]]. In the development sample of 48 people with ALS without evident dementia, 29% had abnormal ALS-Specific scores, language deficits were the most frequent (35%), and carers reported behaviour change in at least one domain for 40% [[Abrahams2014]].`,
 ecPt:`The screen gives two part-scores and a total. A lower score means more difficulty. Falling below a cut-off is a reason to look closer, not a diagnosis.`,
 ecHook:`ECAS original cut-offs: <b>77/100</b> ALS-Specific, <b>24/36</b> ALS Non-specific, <b>105/136</b> Total [[Abrahams2014]].`
};
inits.living=()=>{
  const svg=$('#lvSvg'),rg=$('#lvT'),T=LV_TXT,S=LV_STEPS,FR=S.map(s=>s.from),NS=S.length;
  const uOf=(t,i)=>ramp(t,FR[i],i<NS-1?FR[i+1]:1);
  const speechV=t=>interp([ [0,1],[.14,.88],[.28,.62],[.42,.38],[.56,.18],[.70,.07],[1,.04] ],t);
  const handV=t=>interp([ [0,1],[.42,.9],[.50,.6],[.56,.3],[.70,.12],[1,.08] ],t);
  const WR=rng(41),WAVE=Array.from({length:6},()=>Array.from({length:9},()=>.25+.75*WR()));
  const P=(x,y)=>`${f1(x)} ${f1(y)}`;
  /* ---- the seven scenes, each in a 360 x 196 frame ---- */
  function scene(i,u,t,v){
    let g='';
    if(i===0){
      g+=`<circle cx="70" cy="92" r="38" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2"/>`;
      g+=`<circle cx="84" cy="80" r="3.6" style="fill:var(--nuc)"/>`;
      g+=`<path d="M88 106 q9 ${f1(3+6*v)} 18 0" style="fill:none;stroke:var(--nuc);stroke-width:2.4;stroke-linecap:round"/>`;
      for(let k=0;k<3;k++){const ph=(t*24+k/3)%1,r=12+k*11+ph*5,a=.62;
        g+=`<path d="M${P(108+r*Math.cos(-a),104+r*Math.sin(-a))} A${f1(r)} ${f1(r)} 0 0 1 ${P(108+r*Math.cos(a),104+r*Math.sin(a))}" style="fill:none;stroke:var(--steel);stroke-width:2.2;stroke-linecap:round;opacity:${f1(v*(1-ph*.6))}"/>`}
      g+=`<rect x="150" y="38" width="196" height="60" rx="16" style="fill:var(--panel);stroke:var(--line);stroke-width:1.5"/><path d="M168 97 l-14 16 l30 -16z" style="fill:var(--panel);stroke:var(--line);stroke-width:1.5;stroke-linejoin:round"/><path d="M167 96 h18" style="stroke:var(--panel);stroke-width:3"/>`;
      g+=`<text x="248" y="74" class="t-big t-mid" filter="url(#lvBlur)" style="opacity:${f1(.25+.75*v)}">${T.hello}</text>`;
      g+=`<text x="180" y="178" class="t-xs t-mid">${T.s1}</text>`;
    }else if(i===1){
      g+=`<rect x="48" y="40" width="24" height="46" rx="12" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.6"/>`;
      g+=`<path d="M38 70 q0 28 22 28 q22 0 22 -28 M60 98 v16 M46 114 h28" style="fill:none;stroke:var(--muted);stroke-width:1.8;stroke-linecap:round"/>`;
      g+=`<path d="M92 66 H140" class="arrow" marker-end="url(#lvA)"/>`;
      g+=`<rect x="150" y="24" width="196" height="96" rx="12" style="fill:var(--panel-2);stroke:var(--line);stroke-width:1.4"/>`;
      g+=`<text x="160" y="40" class="t-xs">${T.bank}</text>`;
      const n=Math.max(1,Math.ceil(u*6));
      for(let j=0;j<n;j++){const x0=162+(j%3)*60,y0=64+Math.floor(j/3)*30,a=j===n-1?ramp(u*6-j,0,1):1;
        g+=`<g style="opacity:${f1(.3+.7*a)}"><rect x="${x0-4}" y="${y0-12}" width="54" height="24" rx="6" style="fill:var(--panel);stroke:var(--steel);stroke-width:1.2"/>`;
        WAVE[j].forEach((h,k)=>{const hh=h*16;g+=`<rect x="${x0+k*5}" y="${f1(y0-hh/2)}" width="3" height="${f1(hh)}" rx="1.5" style="fill:var(--steel)"/>`});
        g+='</g>'}
      g+=`<text x="20" y="150" class="t-xs" style="fill:var(--ink)">${T.vb}</text><text x="20" y="168" class="t-xs" style="fill:var(--ink)">${T.mb}</text>`;
    }else if(i===2){
      const cells=T.alpha.split('').concat([T.yes,T.no]);
      const seq=T.spell.split('').map(c=>T.alpha.indexOf(c)),k=Math.min(seq.length-1,Math.floor(u*seq.length));
      g+=`<rect x="30" y="10" width="300" height="140" rx="10" style="fill:var(--panel);stroke:var(--line);stroke-width:1.5"/>`;
      cells.forEach((c,j)=>{const x=40+(j%7)*40,y=20+Math.floor(j/7)*30,on=j===seq[k];
        g+=`<rect x="${x+2}" y="${y+2}" width="36" height="26" rx="5" style="fill:${on?'var(--steel-soft)':'var(--panel-2)'};stroke:${on?'var(--steel)':'var(--line)'};stroke-width:${on?2:1}"/>`;
        g+=`<text x="${x+20}" y="${y+20}" class="${c.length>1?'t-xs':'t-lbl'} t-mid" style="fill:var(--ink)">${c}</text>`});
      g+=`<text x="30" y="176" class="t-lbl">${T.spelled(T.spell.slice(0,k+1))}</text>`;
    }else if(i===3){
      const L=T.msg.length,k=Math.round(ramp(u,0,.7)*L),typed=T.msg.slice(0,k),ch=k>0?T.msg[k-1].toUpperCase():'';
      g+=`<rect x="14" y="14" width="222" height="168" rx="14" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.6"/>`;
      g+=`<rect x="26" y="26" width="198" height="36" rx="6" style="fill:var(--panel);stroke:var(--line)"/>`;
      g+=`<text x="34" y="48" class="t-xs" style="fill:var(--ink)">${typed}</text>`;
      if(k<L&&Math.floor(t*90)%2===0)g+=`<rect x="${f1(34+typed.length*5.75)}" y="37" width="1.6" height="14" style="fill:var(--ink)"/>`;
      T.kb.forEach((row,r)=>{const rw=row.length*21,x0=125-rw/2;row.split('').forEach((c,j)=>{const on=c===ch&&k<L;
        g+=`<rect x="${f1(x0+j*21)}" y="${72+r*24}" width="19" height="20" rx="4" style="fill:${on?'var(--steel)':'var(--panel)'};stroke:var(--line)"/>`;
        g+=`<text x="${f1(x0+j*21+9.5)}" y="${86+r*24}" class="t-xs t-mid" style="fill:${on?'var(--on-steel)':'var(--muted)'}">${c}</text>`})});
      g+=`<rect x="75" y="146" width="100" height="18" rx="4" style="fill:${ch===' '&&k<L?'var(--steel)':'var(--panel)'};stroke:var(--line)"/>`;
      const sp=ramp(u,.72,.8);
      g+=`<path d="M292 80 h10 l12 -12 v44 l-12 -12 h-10z" style="fill:var(--panel-2);stroke:var(--ink);stroke-width:1.6;stroke-linejoin:round"/>`;
      for(let j=0;j<3;j++){const r=10+j*8,ph=(t*24+j/3)%1;g+=`<path d="M${P(318+r*Math.cos(-.7),90+r*Math.sin(-.7))} A${r} ${r} 0 0 1 ${P(318+r*Math.cos(.7),90+r*Math.sin(.7))}" style="fill:none;stroke:var(--steel);stroke-width:2;opacity:${f1(sp*(1-ph*.6))}"/>`}
      g+=`<text x="304" y="140" class="t-xs t-mid" style="fill:var(--ink);opacity:${f1(.35+.65*sp)}">${T.speaks[0]}</text><text x="304" y="154" class="t-xs t-mid" style="fill:var(--ink);opacity:${f1(.35+.65*sp)}">${T.speaks[1]}</text>`;
    }else if(i===4){
      const C=j=>({x:106+(j%3)*80+37,y:28+Math.floor(j/3)*66+18}),seq=[2,4,0];
      const s3=clamp(u*3,0,2.999),j=Math.floor(s3),d=s3-j,from=C(j?seq[j-1]:1),to=C(seq[j]),m=ease(ramp(d,0,.3));
      const gx=lerp(from.x,to.x,m),gy=lerp(from.y,to.y,m),dw=ramp(d,.3,.9),sel=d>.9;
      g+=`<rect x="96" y="14" width="252" height="146" rx="10" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.6"/>`;
      T.gazeKeys.forEach((kk,q)=>{const c=C(q),on=q===seq[j]&&sel;
        g+=`<rect x="${c.x-37}" y="${c.y-18}" width="74" height="52" rx="8" style="fill:${on?'var(--steel-soft)':'var(--panel-2)'};stroke:${on?'var(--steel)':'var(--line)'};stroke-width:${on?2:1}"/>`;
        g+=`<text x="${c.x}" y="${c.y+24}" class="t-xs t-mid" style="fill:var(--ink)">${kk}</text>`});
      const dx=clamp((gx-40)/120,-1,1)*4,dy=clamp((gy-92)/60,-1,1)*3;
      g+=`<path d="M52 92 L${P(gx,gy)}" style="stroke:var(--steel);stroke-width:1.2;stroke-dasharray:3 4;opacity:.6"/>`;
      g+=`<path d="M14 92 Q40 70 66 92 Q40 114 14 92Z" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.6"/>`;
      g+=`<circle cx="${f1(40+dx)}" cy="${f1(92+dy)}" r="9" style="fill:var(--steel)"/><circle cx="${f1(40+dx)}" cy="${f1(92+dy)}" r="4" style="fill:var(--nuc)"/>`;
      g+=`<circle cx="${f1(gx)}" cy="${f1(gy)}" r="4" style="fill:var(--steel)"/>`;
      if(dw>0)g+=`<circle cx="${f1(gx)}" cy="${f1(gy)}" r="12" transform="rotate(-90 ${P(gx,gy)})" style="fill:none;stroke:var(--steel);stroke-width:3;stroke-dasharray:${f1(75.4*dw)} 200"/>`;
      g+=`<rect x="182" y="166" width="80" height="7" rx="3" style="fill:var(--muted)"/><text x="222" y="188" class="t-xs t-mid">${T.tracker}</text>`;
    }else if(i===5){
      const n=Math.round(13*ramp(u,.05,.5));
      g+=`<text x="14" y="16" class="t-xs" style="fill:var(--ink)">${T.tlsT}</text>`;
      for(let q=0;q<100;q++){const x=26+(q%10)*13,y=34+Math.floor(q/10)*13,on=q<n;
        g+=`<circle cx="${x}" cy="${y}" r="5" style="fill:${on?'var(--tdp)':'var(--panel-2)'};stroke:${on?'var(--tdp)':'var(--cell-line)'};stroke-width:1"/>`}
      T.tls.forEach((l,q)=>{g+=`<text x="176" y="${58+q*16}" class="t-xs" style="fill:var(--ink)">${l}</text>`});
      T.tlsNot.forEach((l,q)=>{g+=`<text x="176" y="${128+q*16}" class="t-xs">${l}</text>`});
    }else{
      g+=`<rect x="236" y="2" width="118" height="22" rx="6" style="fill:var(--warn-soft);stroke:var(--warn);stroke-width:1.2"/><text x="295" y="17" class="t-xs t-mid" style="fill:var(--warn);font-weight:700">${T.evTag}</text>`;
      g+=`<ellipse cx="60" cy="64" rx="46" ry="34" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2"/>`;
      g+=`<path d="M30 56 q12 -10 22 0 q10 10 22 0 M28 74 q14 8 26 0 q12 -8 26 2 M46 40 q4 12 -4 20" style="fill:none;stroke:var(--cell-line);stroke-width:1.4;opacity:.7"/>`;
      g+=`<rect x="64" y="34" width="16" height="10" rx="2" style="fill:var(--steel)"/>`;
      g+=`<path d="M80 39 C104 18 118 58 136 66" style="fill:none;stroke:var(--steel);stroke-width:1.6"/>`;
      for(let k=0;k<3;k++){const q=(t*14+k/3)%1,a=1-q;const x=a*a*a*80+3*a*a*q*104+3*a*q*q*118+q*q*q*136,y=a*a*a*39+3*a*a*q*18+3*a*q*q*58+q*q*q*66;
        g+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="3" style="fill:var(--steel)"/>`}
      g+=`<rect x="136" y="50" width="72" height="34" rx="8" style="fill:var(--panel);stroke:var(--steel);stroke-width:1.6"/><text x="172" y="71" class="t-xs t-mid" style="fill:var(--ink)">${T.dec}</text>`;
      g+=`<path d="M210 67 H234" class="arrow" marker-end="url(#lvA)"/><text x="240" y="71" class="t-xs" style="fill:var(--ink)">${T.out}</text>`;
      g+=`<line x1="18" x2="276" y1="106" y2="106" class="axis"/>`;
      T.ms.forEach((m,q)=>{const x=18+q*86,o=ramp(u,q*.18,q*.18+.1);
        g+=`<g style="opacity:${f1(.15+.85*o)}"><circle cx="${x}" cy="106" r="4" style="fill:var(--steel)"/><text x="${x}" y="126" class="t-lbl">${m[0]}</text><text x="${x}" y="142" class="t-xs" style="fill:var(--ink)">${m[1]}</text><text x="${x}" y="156" class="t-xs">${m[2]}</text></g>`});
      g+=`<text x="18" y="184" class="t-xs">${T.bciCap}</text>`;
    }
    return g;
  }
  function bar(x,y,w,label,v,word,minor){
    let g=`<text x="${x}" y="${y}" class="t-xs">${label}</text>`;
    g+=`<rect x="${x}" y="${y+7}" width="${w}" height="14" rx="7" style="fill:var(--panel-2)"/>`;
    g+=`<rect x="${x}" y="${y+7}" width="${f1(Math.max(6,w*v))}" height="14" rx="7" style="fill:var(--steel)"/>`;
    if(minor)g+=`<rect x="${f1(x+w*.55)}" y="${y+7}" width="${f1(w*.45)}" height="14" rx="7" style="fill:var(--tdp-soft);stroke:var(--tdp);stroke-width:1.4;stroke-dasharray:4 3"/>`;
    g+=`<text x="${x}" y="${y+36}" class="t-xs" style="fill:var(--ink)">${word}</text>`;
    return g;
  }
  function draw(t){
    const N=vb(svg,'720 400','400 790');
    const L=N?{W:400,bx:16,bw:368,by:46,bdy:56,schY:214,px:16,py:224,pw:368,ph:206,fx:20,fy:229}
             :{W:720,bx:16,bw:234,by:52,bdy:58,schY:232,px:268,py:40,pw:436,ph:210,fx:306,fy:46};
    const p=phaseOf(S,t),u=uOf(t,p),sv=speechV(t),hv=handV(t);
    let s=`<defs>${marker('lvA','var(--muted)')}<filter id="lvBlur" x="-10%" y="-40%" width="120%" height="180%"><feGaussianBlur stdDeviation="${f1((1-sv)*2.4)}"/></filter></defs>`;
    s+=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    s+=`<text x="16" y="24" class="t-sm" style="fill:var(--steel)">${T.title}</text><text x="${L.W-16}" y="24" class="t-sm t-end">${T.stepOf(p+1,NS)}</text>`;
    /* ability bars */
    const sw=T.speechW[sv>.75?0:sv>.45?1:sv>.15?2:3],hw=T.handW[hv>.75?0:hv>.3?1:2],minor=p>=5;
    s+=bar(L.bx,L.by,L.bw,T.bars[0],sv,sw);
    s+=bar(L.bx,L.by+L.bdy,L.bw,T.bars[1],hv,hw);
    s+=bar(L.bx,L.by+2*L.bdy,L.bw,T.bars[2],1,minor?T.eyeMinor:T.eyeW,minor);
    s+=`<text x="${L.bx}" y="${L.schY}" class="t-xs">${T.sch}</text>`;
    /* scene panel, sliding in at each step */
    s+=`<rect x="${L.px}" y="${L.py}" width="${L.pw}" height="${L.ph}" rx="12" style="fill:var(--panel);stroke:var(--line);stroke-width:1.4"/>`;
    const sl=ramp(t,FR[p],FR[p]+.025);
    s+=`<g transform="translate(${f1(L.fx+24*(1-sl))} ${L.fy})" style="opacity:${f1(.2+.8*sl)}">${scene(p,u,t,sv)}</g>`;
    /* the course: stations */
    if(!N){
      const X=i=>60+i*100,TY=292,xp=interp(FR.map((f,i)=>[f,X(i)]),t);
      s+=`<text x="40" y="270" class="t-xs">${T.courseW}</text>`;
      s+=`<line x1="40" x2="680" y1="${TY}" y2="${TY}" style="stroke:var(--line);stroke-width:4;stroke-linecap:round"/>`;
      s+=`<line x1="40" x2="${f1(xp)}" y1="${TY}" y2="${TY}" style="stroke:var(--steel);stroke-width:4;stroke-linecap:round"/>`;
      S.forEach((st,i)=>{const on=t>=FR[i],cu=i===p,x=X(i),res=i===NS-1;
        if(cu)s+=`<circle cx="${x}" cy="${TY}" r="18" style="fill:none;stroke:var(--steel);stroke-width:2"/>`;
        s+=`<circle cx="${x}" cy="${TY}" r="12" style="fill:${on?'var(--steel)':'var(--panel)'};stroke:${on?'var(--steel)':'var(--line)'};stroke-width:1.6;${res?'stroke-dasharray:4 3':''}"/>`;
        s+=`<text x="${x}" y="${TY+3.5}" class="t-xs t-mid" style="fill:${on?'var(--on-steel)':'var(--muted)'};font-weight:700">${i+1}</text>`;
        T.stW[i].forEach((l,q)=>{s+=`<text x="${x}" y="${TY+34+q*13}" class="t-xs t-mid" style="fill:${cu?'var(--ink)':'var(--muted)'}">${l}</text>`});
        if(res)s+=`<rect x="${x-50}" y="${TY+52}" width="100" height="18" rx="5" style="fill:var(--warn-soft);stroke:var(--warn)"/><text x="${x}" y="${TY+65}" class="t-xs t-mid" style="fill:var(--warn);font-weight:700">${T.evTag}</text>`});
      s+=`<text x="16" y="390" class="t-xs">${T.capW}</text>`;
    }else{
      const Y=i=>456+i*44,TX=40,yp=interp(FR.map((f,i)=>[f,Y(i)]),t);
      s+=`<text x="384" y="447" class="t-xs t-end">${T.courseN}</text>`;
      s+=`<line x1="${TX}" x2="${TX}" y1="${Y(0)}" y2="${Y(NS-1)}" style="stroke:var(--line);stroke-width:4;stroke-linecap:round"/>`;
      s+=`<line x1="${TX}" x2="${TX}" y1="${Y(0)}" y2="${f1(yp)}" style="stroke:var(--steel);stroke-width:4;stroke-linecap:round"/>`;
      S.forEach((st,i)=>{const on=t>=FR[i],cu=i===p,y=Y(i),res=i===NS-1;
        if(cu)s+=`<circle cx="${TX}" cy="${y}" r="18" style="fill:none;stroke:var(--steel);stroke-width:2"/>`;
        s+=`<circle cx="${TX}" cy="${y}" r="12" style="fill:${on?'var(--steel)':'var(--panel)'};stroke:${on?'var(--steel)':'var(--line)'};stroke-width:1.6;${res?'stroke-dasharray:4 3':''}"/>`;
        s+=`<text x="${TX}" y="${y+3.5}" class="t-xs t-mid" style="fill:${on?'var(--on-steel)':'var(--muted)'};font-weight:700">${i+1}</text>`;
        s+=`<text x="66" y="${y+4.5}" class="t-lbl" style="fill:${cu?'var(--ink)':'var(--muted)'}">${T.stN[i]}</text>`;
        if(res)s+=`<rect x="266" y="${y-11}" width="118" height="20" rx="5" style="fill:var(--warn-soft);stroke:var(--warn)"/><text x="325" y="${y+3}" class="t-xs t-mid" style="fill:var(--warn);font-weight:700">${T.evTag}</text>`});
      T.capN.forEach((l,q)=>{s+=`<text x="16" y="${760+q*14}" class="t-xs">${l}</text>`});
    }
    svg.innerHTML=s;
    setSt(p);$('#lvNote').innerHTML=noteHTML(S[p]);
  }
  const stop=playWire(rg,$('#lvPlay'),draw,21000,UI.replay,'living');
  const setSt=stepWire($('#lvSteps'),S,rg,draw,stop);
  draw(+rg.value);

  /* ---- ECAS cut-offs ---- */
  const es=$('#lvEcSvg'),sp=$('#lvSpec'),ns=$('#lvNon'),MX=[100,36,136],CUT=[77,24,105];
  function drawE(){
    const N=vb(es,'720 170','400 216');
    const v=[+sp.value,+ns.value];v.push(v[0]+v[1]);
    const st=v.map((x,i)=>x<CUT[i]?'below':x===CUT[i]?'at':'above');
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    v.forEach((x,i)=>{
      const R=N?{lx:16,ly:34+i*68-10,bx:16,by:34+i*68,bw:368,cy:34+i*68+34}:{lx:16,ly:30+i*48+14,bx:200,by:30+i*48,bw:480,cy:30+i*48-8};
      const below=st[i]==='below',cx=R.bx+R.bw*CUT[i]/MX[i];
      s+=`<text x="${R.lx}" y="${R.ly}" class="t-lbl">${T.ecN[i]}</text>`;
      s+=`<rect x="${R.bx}" y="${R.by}" width="${R.bw}" height="20" rx="5" style="fill:var(--panel-2)"/>`;
      s+=`<rect x="${R.bx}" y="${R.by}" width="${f1(Math.max(4,R.bw*x/MX[i]))}" height="20" rx="5" style="fill:${below?'var(--warn-soft)':'var(--good-soft)'};stroke:${below?'var(--warn)':'var(--good)'};stroke-width:1.4"/>`;
      s+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${R.by-5}" y2="${R.by+25}" style="stroke:var(--ink);stroke-width:1.6;stroke-dasharray:4 3"/>`;
      s+=`<text x="${f1(cx)}" y="${R.cy}" class="t-xs t-mid" style="fill:var(--ink)">${T.cut(CUT[i])}</text>`;
      s+=`<text x="${R.bx+6}" y="${R.by+14}" class="t-xs" style="fill:var(--ink)">${T.score(x,MX[i],T.ecSt[st[i]])}</text>`;
    });
    es.innerHTML=s;
    const nb=st.filter(x=>x==='below').length;
    const ul='<ul>'+v.map((x,i)=>`<li>${T.ecLine(T.ecN[i],x,MX[i],T.cut(CUT[i]),T.ecSt[st[i]])}</li>`).join('')+'</ul>';
    $('#lvEcNote').innerHTML=noteHTML({k:T.ecK,t:T.ecT(nb,3),txt:T.ecTxt,pt:T.ecPt,hook:T.ecHook}).replace('</h4>','</h4>'+ul);
  }
  sp.addEventListener('input',drawE);ns.addEventListener('input',drawE);
  drawE();
  const prev=redraws.living;redraws.living=()=>{prev&&prev();drawE()};

  /* ---- topic tabs ---- */
  const tabs=$('#lvTabs'),keys=$$('[data-lt]',tabs).map(b=>b.dataset.lt);
  function sel(k){if(!keys.includes(k))k=keys[0];
    $$('[data-lt]',tabs).forEach(b=>b.setAttribute('aria-pressed',b.dataset.lt===k));
    $$('[data-lp]',$('#m-living')).forEach(pn=>pn.hidden=pn.dataset.lp!==k);store.set('lvTab',k)}
  tabs.addEventListener('click',e=>{const b=e.target.closest('[data-lt]');if(b)sel(b.dataset.lt)});
  sel(store.get('lvTab','cog'));
};
