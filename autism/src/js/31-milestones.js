/* =============== 3.1 Early signs & development =============== */
/* milestone chips: a = CDC 2022 checklist age in months (Zubler 2022; pretend play at the ESCAP red-flag age),
   l = lane in the wide layout, s = a social-communication skill (dimmed in the early-signs view),
   lost = a skill that the regression view shows gained and then lost */
const MI_CH=[
 {a:2,t:'Social smile',l:0,s:1},
 {a:4,t:'Smiles to engage',l:1,s:1},
 {a:6,t:'Laughs',l:2},
 {a:9,t:'Turns to name',l:0,s:1,lost:1},
 {a:9,t:'Lifts arms',l:3},
 {a:12,t:'Waves bye-bye',l:1,s:1,lost:1},
 {a:15,t:'First words',l:0,s:1,lost:1},
 {a:15,t:'Shows you a toy',l:2,s:1,lost:1},
 {a:18,t:'Points to show',l:1,s:1,lost:1},
 {a:18,t:'Pretend play',l:3,s:1},
 {a:24,t:'2-word phrases',l:0,s:1},
 {a:24,t:'Checks faces',l:1,s:1},
 {a:30,t:'About 50 words',l:0,s:1},
 {a:30,t:'Plays alongside',l:1,s:1}];
const MI_FLAGS=[{a:12,t:'no name or wave',n:'12',an:'t-end',dx:-4},{a:16,t:'no words',n:'16',an:'',dx:14},{a:24,t:'no 2-word phrases',n:'24',an:'',dx:14}];
const MI_REG=19.8; /* weighted mean onset of regression in the 2021 meta-analytic update, months (Tan 2021) */
const miAt=m=>m/36;
/* one step list; mode-specific fields in .early and .reg replace the shared ones */
const MI_STEPS=[
 {from:0,at:miAt(2.4),k:'0–3 months',t:'Faces first',
  txt:`Newborns are drawn to faces and voices. On the 2022 CDC checklists, by 2 months a baby looks at the parent's face and smiles back when talked to. Each milestone sits at the age by which at least 75% of children show it, so a quarter of babies are still on the way at that visit. The revision cut 216 milestones on 10 checklists to 159 on 12. [[Zubler2022]]`,
  pt:`Looking at faces and smiling back are the first steps of a conversation, long before words.`,
  hook:`CDC 2022: milestones set at the ≥75th percentile age. Missing one means screen, not diagnose. [[Zubler2022]]`,
  early:{txt:`<span class="ev early">Early evidence</span> In an eye-tracking study, infants later diagnosed with autism looked at eyes as much as other babies at 2 months. Their eye-looking then declined between 2 and 6 months (about −4.8% a month, against a rise of +3.6% a month in typically developing infants). So eye contact is present at first rather than absent from birth. This comes from one cohort of 110 infants, 12 of them later diagnosed. [[Jones2013Eyes]]`,
   pt:`Many babies later diagnosed do make eye contact at first. It can fade over the following months.`,
   hook:`Jones &amp; Klin 2013: attention to eyes is present at 2 months, then declines from 2 to 6 months. [[Jones2013Eyes]]`}},
 {from:miAt(4),at:miAt(9.5),k:'4–9 months',t:'Turning to a name',
  txt:`By 9 months most babies look when their name is called, lift their arms to be picked up and play peek-a-boo. A parent calling and a baby turning back is an early back-and-forth. Repeatedly not responding to a name at 9–12 months, although hearing is normal, is one early sign described in a 2026 systematic review. That is why hearing is checked first. [[Zubler2022,Araujo2026]]`,
  pt:`A baby who does not turn to their name may not hear well, may be busy, or may be developing differently. Checking hearing comes first.`,
  hook:`"No response to name despite normal hearing": the hearing test comes before any conclusion. [[Araujo2026]]`,
  early:{txt:`<span class="ev early">Early evidence</span> In a prospective study of 25 infants later diagnosed and 25 typically developing infants, gaze to faces, shared smiles and directed sounds were similar at 6 months, then declined in the autism group, with most differences significant by 12 months. Response to name is not a yes/no test: at 12 months, failing to respond had specificity 0.89 but sensitivity only 0.50, so many autistic infants do turn to their name. [[Ozonoff2010,Nadig2007]]`,
   pt:`Differences often appear gradually after 6 months, rather than being there from the first weeks.`,
   hook:`Failing to respond to name at 12 months: sensitivity 0.50, specificity 0.89. Many autistic babies respond. [[Nadig2007]]`}},
 {from:miAt(11),at:miAt(13.5),k:'12–15 months',t:'Gestures and first words',
  txt:`At 12 months children wave bye-bye and play games such as pat-a-cake. By 15 months they show you an object they like, point to ask for something and try one or two words besides "mama" or "dada". Red flags quoted at 12 months: no response to name and no "goodbye" gesture. [[Zubler2022,Fuentes2021ESCAP,Araujo2026]]`,
  pt:`Gestures such as waving and pointing are a bridge to words. They show the child wants to share something with you.`,
  hook:`Red flag at 12 months: no response to name (CDC, quoted by ESCAP) and no goodbye gesture. [[Fuentes2021ESCAP,Araujo2026]]`,
  early:{txt:`Among 150 younger siblings of autistic children, those later diagnosed could be told apart by 12 months on eye contact, visual tracking, disengaging attention, orienting to name, imitation, social smiling and social interest. Gestures may be few, or used to get things more than to share. [[Zwaigenbaum2005]]`,
   pt:`Some children point to get a snack but rarely to show you something just because it is interesting.`,
   hook:`Early signs in younger siblings were detectable by 12 months (Zwaigenbaum 2005). [[Zwaigenbaum2005]]`}},
 {from:miAt(15.6),at:miAt(18.6),k:'16–18 months',t:'Pointing to share',
  txt:`By 18 months a toddler points to show you something interesting, then looks back at your face to check you saw it. Two people attending to the same thing is joint attention, and it is one of the foundations of language. Red flags: no single words by 16 months, no pointing to show by 14 months, and no pretend play by 18 months. The AAP recommends autism-specific screening at the 18-month visit. [[Zubler2022,Araujo2026,Fuentes2021ESCAP,Hyman2020]]`,
  pt:`Pointing at a dog and then looking at you means "Look! Did you see it too?" That shared moment matters a lot.`,
  hook:`Joint attention = pointing to show + checking the other person's face. AAP screens at 18 and 24 months. [[Hyman2020]]`,
  early:{txt:`In this view the toddler points at the ball but does not look back to share it, one way reduced joint attention can look. No pointing to share interest at 12–18 months and a narrow range of gestures at 16 months are among the most consistent early signs, and they are more meaningful when combined with other social differences. Their absence in a very young child does not rule autism out. [[Araujo2026,Fuentes2021ESCAP]]`,
   pt:`The child enjoys the ball, but the "Did you see it too?" look back to the parent is missing.`,
   hook:`Declarative pointing (to share) is more telling than imperative pointing (to request). [[Araujo2026]]`},
  reg:{txt:`So far this child has gained skills on time. Loss of skills is usually noticed in the second year: the 2013 meta-analysis put the mean onset at 1.78 years (about 21 months) and the 2021 update at 19.8 months. [[Barger2013,Tan2021]]`,
   pt:`Some autistic children develop words and social games and then stop using them, often between 18 and 24 months.`,
   hook:`Regression: mean onset about 1.8 years (Barger 2013), 19.8 months (Tan 2021). [[Barger2013,Tan2021]]`}},
 {from:miAt(20.5),at:miAt(24.6),k:'24 months',t:'Two-word phrases',
  txt:`At 24 months children put two words together ("more milk") and notice when others are upset. No spontaneous two-word phrases by 24 months is one of the two most consistent language red flags, with no single words by 16 months. The AAP repeats the autism-specific screen at 24 months. [[Zubler2022,Araujo2026,Hyman2020]]`,
  pt:`Two-word phrases show a child combining ideas. By 2 years most children do it, but not all, and a late talker is not necessarily autistic.`,
  hook:`Two language red flags: no words by 16 months, no two-word phrases by 24 months, most predictive with social differences. [[Araujo2026]]`,
  reg:{txt:`Here words and social games fade. In a 2013 meta-analysis of 85 articles (29,035 autistic participants), 32.1% had a regression; a 2021 update found 30%. The rate depends on how it is defined and counted: language loss alone 20%, language plus social 40%; 21.8% in population samples but 40.8% in parent surveys. [[Barger2013,Tan2021]] Unexplained loss of skills warrants further, including neurological, assessment. [[Fuentes2021ESCAP]]`,
   pt:`If a child stops using words or games they used to have, tell a health professional promptly, at any age.`,
   hook:`About 1 in 3 autistic children are reported to lose skills (32.1%; 30% in 2021). [[Barger2013,Tan2021]]`}},
 {from:miAt(28),at:miAt(33),k:'30–36 months',t:'Words and play',
  txt:`By 30 months children say about 50 words and play next to, and sometimes with, other children. The AAP recommends general developmental screening at 9, 18 and 30 months alongside surveillance at every visit. Autism can be diagnosed from 18 months, but in 2022 US surveillance the median age at earliest known diagnosis was 47 months. [[Zubler2022,Lipkin2020,Hyman2020,Shaw2025]]`,
  pt:`There is a long gap between the first signs and a diagnosis for many families. Raising a concern early helps close it.`,
  hook:`AAP: general developmental screening at 9, 18, 30 months; autism-specific at 18 and 24 months. [[Lipkin2020,Hyman2020]]`,
  early:{txt:`Parents often notice differences early. In US national survey data, parents of autistic children had concerns at younger ages than parents of children with other delays, but were more likely to get "reassuring or passive" responses, which went with longer delays to diagnosis. [[Zuckerman2015]] Among younger siblings, a diagnosis at 24 months was stable in 82%, but 41% of children diagnosed at 36 months had not been diagnosed at 24. [[Ozonoff2015]]`,
   pt:`If you are worried and are told to "wait and see", it is reasonable to ask again or ask for a referral.`,
   hook:`Passive provider responses to parental concern were linked to longer diagnostic delays. [[Zuckerman2015]]`},
  reg:{txt:`How common regression is depends on how it is measured. In a prospective study of infant siblings, examiners' repeated ratings found a declining trajectory in 88% of children later diagnosed and parents' prospective ratings in 69%, but retrospective or yes/no questions found only 29–47%. In an earlier study, repeated testing documented loss of skills in most infants later diagnosed, though most parents did not report a regression. [[Ozonoff2018Onset,Ozonoff2010]] <span class="ev est">Established</span> Vaccines do not cause it. [[Hviid2019,Taylor2014Vaccine]]`,
   pt:`Skill loss can be sudden and obvious, or so gradual that families only see it looking back.`,
   hook:`Regression rates: 88% (examiner, prospective) vs 29–47% (retrospective). Definitions drive the number. [[Ozonoff2018Onset]]`}}
];

inits.milestones=()=>{
  const svg=$('#miSvg'),rg=$('#miT');let mode='td',setSt=()=>{};
  const MODE_N={td:'Typical development',early:'Early autism signs',reg:'Loss of skills'};
  const steps=()=>MI_STEPS.map(s=>Object.assign({},s,s[mode]||{}));
  /* weight of the child's gaze on the toy (1) versus the parent (0) */
  function gazeW(m){
    const osc=.5+.5*Math.sin(m*2.3);
    if(m<5)return .1;
    const typ=m<15?.25+.5*osc:osc>.5?1:0;           /* from 15 months: look at the toy, look back to share */
    const aut=.82+.18*osc;                            /* mostly on the object, rarely back */
    if(mode==='early')return lerp(typ,aut,ramp(m,4,9));
    if(mode==='reg')return lerp(typ,aut,ramp(m,MI_REG-1,MI_REG+3));
    return typ}
  /* for each chip: 0 hidden, otherwise its look */
  function chipState(c,m){
    const on=ramp(m,c.a-.4,c.a+.3);if(on<=0)return null;
    let st='ok';
    if(mode==='early'&&c.s)st='dim';
    if(mode==='reg'){if(c.lost&&m>=MI_REG+1.2)st='lost';else if(c.a>=MI_REG)st='dim'}
    return {on,st}}
  function draw(t){
    const N=vb(svg,'720 410','400 720'),m=t*36;let s=`<defs>${marker('miArr','var(--muted)')}</defs>`;
    const P=N?{px:62,py:96,cx:300,cy:112,tx:190,ty:44,pan:{x:16,y:196,w:368,h:142}}:{px:70,py:104,cx:250,cy:122,tx:165,ty:46,pan:{x:350,y:12,w:356,h:196}};
    /* ---- scene: parent, child and a ball ---- */
    const cr=lerp(19,27,m/36),w=gazeW(m),hp=[P.px,P.py],ht=[P.tx,P.ty];
    s+=`<rect x="${N?8:8}" y="8" width="${N?384:330}" height="${N?176:198}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=`<path d="M${P.px-34} ${P.py+86}Q${P.px-34} ${P.py+40} ${P.px} ${P.py+40}Q${P.px+34} ${P.py+40} ${P.px+34} ${P.py+86}Z" style="fill:var(--accent-soft);stroke:var(--accent);stroke-width:1.2"/>`;
    s+=`<path d="M${f1(P.cx-cr*1.1)} ${f1(P.cy+cr*2.6)}Q${f1(P.cx-cr*1.1)} ${f1(P.cy+cr*1.05)} ${P.cx} ${f1(P.cy+cr*1.05)}Q${f1(P.cx+cr*1.1)} ${f1(P.cy+cr*1.05)} ${f1(P.cx+cr*1.1)} ${f1(P.cy+cr*2.6)}Z" style="fill:var(--brand-soft);stroke:var(--brand);stroke-width:1.2"/>`;
    /* ball */
    s+=`<circle cx="${P.tx}" cy="${P.ty}" r="13" style="fill:var(--gold-soft);stroke:var(--gold);stroke-width:1.6"/><path d="M${P.tx-13} ${P.ty}Q${P.tx} ${P.ty-8} ${P.tx+13} ${P.ty}M${P.tx} ${P.ty-13}Q${P.tx+7} ${P.ty} ${P.tx} ${P.ty+13}" style="fill:none;stroke:var(--gold);stroke-width:1.3"/>`;
    /* gaze lines: child to its current target, parent to child or ball */
    const ang=(a,b)=>Math.atan2(b[1]-a[1],b[0]-a[0])*180/Math.PI;
    const cEye=[P.cx,P.cy],tgt=w>.5?ht:hp,gAng=ang(cEye,tgt),dom=Math.abs(w-.5)*2;
    const pointing=m>=15&&!(mode==='reg'&&m>=MI_REG+1.2);
    const pTarget=m>=15?ht:[P.cx,P.cy];
    s+=`<line x1="${P.px+8}" y1="${P.py}" x2="${f1(lerp(P.px,pTarget[0],.86))}" y2="${f1(lerp(P.py,pTarget[1],.86))}" style="stroke:var(--accent);stroke-width:1.3;stroke-dasharray:3 4;opacity:.55"/>`;
    s+=`<line x1="${f1(P.cx-4)}" y1="${f1(P.cy)}" x2="${f1(lerp(P.cx,tgt[0],.84))}" y2="${f1(lerp(P.cy,tgt[1],.84))}" style="stroke:var(--brand);stroke-width:1.6;stroke-dasharray:3 4;opacity:${f1(.35+.6*dom)}"/>`;
    /* pointing arm */
    if(pointing){const sx=P.cx-cr*.9,sy=P.cy+cr*1.5,ex=lerp(sx,P.tx,.42),ey=lerp(sy,P.ty,.42);
      s+=`<path d="M${f1(sx)} ${f1(sy)}L${f1(ex)} ${f1(ey)}" style="stroke:var(--skin);stroke-width:5;stroke-linecap:round"/><path d="M${f1(sx)} ${f1(sy)}L${f1(ex)} ${f1(ey)}" style="stroke:var(--hair);stroke-width:1;stroke-linecap:round;opacity:.5"/>`}
    const smileC=(mode==='td'||(mode==='reg'&&m<MI_REG+1.2)||(mode==='early'&&m<5))&&m>=1.5&&w<.6;
    s+=face(P.px,P.py,30,{gaze:ang(hp,pTarget),mouth:'smile'});
    s+=face(P.cx,P.cy,cr,{gaze:gAng,mouth:smileC?'smile':m<1.5?'open':'flat'});
    /* speech */
    if(m>=7.5&&m<12){const bx=N?P.px+30:P.px+26;s+=bubble(bx,P.py-74,60,24,{text:'Sam!',tail:'left'});
      const turned=w<.5;s+=`<text x="${P.cx}" y="${f1(P.cy-cr-10)}" class="t-xs t-mid" style="fill:${turned?'var(--good)':'var(--muted)'}">${turned?'turns to the name':'keeps looking at the ball'}</text>`}
    const cw=m>=30?'big red ball!':m>=24?'big ball!':m>=15?'ball!':'';
    if(cw){const lost=mode==='reg'&&m>=MI_REG+1.2,late=(mode==='early')||(mode==='reg'&&m>=MI_REG&&!lost&&m>=24);
      const bw=cw.length*7+22,bx=Math.min(P.cx+cr*.4,(N?392:336)-bw-4);
      s+=bubble(bx,P.cy-cr-46,bw,24,{text:lost?'…':cw,tail:'left',broken:lost||late});
}
    if(m>=15){const sh=w<.5&&pointing;s+=`<text x="16" y="${N?22:198}" class="t-xs" style="fill:${sh?'var(--good)':'var(--muted)'}">${pointing?(sh?'points, then looks back: joint attention':(mode==='td'?'points to the ball…':'looks at the ball, rarely back to share')):(mode==='reg'?'words and pointing used before have stopped':'not pointing now')}</text>`}
    else s+=`<text x="16" y="${N?22:198}" class="t-xs">${m<2?'newborn: faces and voices':m<7.5?'looks at faces, smiles back':'watching'}</text>`;
    s+=`<text x="${N?384:330}" y="22" class="t-sm t-end" style="fill:var(--ink)">${Math.floor(m)} months</text>`;

    /* ---- side panel ---- */
    const Q=P.pan;s+=`<rect x="${Q.x}" y="${Q.y}" width="${Q.w}" height="${Q.h}" rx="12" style="fill:var(--panel);stroke:var(--line)"/>`;
    const shown=MI_CH.filter(c=>m>=c.a).length;
    if(mode==='td'){
      s+=`<text x="${Q.x+14}" y="${Q.y+22}" class="t-sm" style="fill:var(--accent)">THE 75% LINE</text>`;
      for(let i=0;i<4;i++)s+=person(Q.x+24+i*30,Q.y+36,34,i<3?'var(--accent)':'var(--line)');
      const L=['Milestone age = when about','3 in 4 children show it.','1 in 4 are still learning:','missing one = check, not diagnose.'];
      L.forEach((l,i)=>s+=`<text x="${Q.x+(N?150:14)}" y="${Q.y+(N?36:96)+i*(N?13:15)}" class="t-xs" style="fill:var(--ink)">${l}</text>`);
      const bx=Q.x+14,by=Q.y+Q.h-36,bw=Q.w-28;
      s+=`<text x="${bx}" y="${by-6}" class="t-xs">skills shown so far: <tspan style="fill:var(--ink);font-weight:600">${shown} of ${MI_CH.length}</tspan></text><rect x="${bx}" y="${by}" width="${bw}" height="10" rx="5" style="fill:var(--panel-2)"/><rect x="${bx}" y="${by}" width="${f1(bw*shown/MI_CH.length)}" height="10" rx="5" style="fill:var(--accent)"/>`;
      s+=`<text x="${bx}" y="${by+24}" class="t-xs">drawn chips: CDC 2022 checklist ages</text>`;
    }else if(mode==='early'){
      s+=`<text x="${Q.x+14}" y="${Q.y+20}" class="t-sm" style="fill:var(--accent)">LOOKING AT EYES</text><text x="${Q.x+Q.w-12}" y="${Q.y+20}" class="t-xs t-end" style="fill:var(--warn)">early evidence · 1 cohort</text>`;
      const x0=Q.x+40,x1=Q.x+Q.w-18,y0=Q.y+48,y1=Q.y+Q.h-36,X=v=>lerp(x0,x1,(v-2)/22),Y=v=>lerp(y1,y0,v/80);
      [0,40,80].forEach(v=>s+=`<line x1="${x0}" x2="${x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="${v?'grid':'axis'}"/>`);
      [2,6,12,18,24].forEach(v=>s+=`<text x="${f1(X(v))}" y="${y1+13}" class="t-xs t-mid">${v}</text>`);
 s+=``;
      const td=v=>v<=6?50+3.6*(v-2):64.4+.3*(v-6),au=v=>v<=6?50-4.8*(v-2):30.8+.23*(v-6);
      const e=clamp(m,2,24);
      if(m>2){const ln=(f,c,w2)=>`<path d="${pathFn(u=>1-f(lerp(2,e,u))/80,x0,X(e),y0,y1,40)}" style="fill:none;stroke:${c};stroke-width:${w2};stroke-linecap:round"/>`;
        s+=ln(td,'var(--muted)',2)+ln(au,'var(--accent)',2.6);
        s+=`<circle cx="${f1(X(e))}" cy="${f1(Y(td(e)))}" r="3" style="fill:var(--muted)"/><circle cx="${f1(X(e))}" cy="${f1(Y(au(e)))}" r="3.4" style="fill:var(--accent)"/>`}
      s+=`<text x="${Q.x+14}" y="${Q.y+36}" class="t-xs"><tspan style="fill:var(--muted)">— typical +3.6%/mo</tspan>  <tspan style="fill:var(--accent)">— later diagnosed −4.8%/mo</tspan></text>`;
      if(m>=20)s+=`<text x="${x1}" y="${f1(Y(au(24))+14)}" class="t-xs t-end" style="fill:var(--accent)">about half of typical by 24 mo</text>`;
      s+=`<text x="${Q.x+14}" y="${Q.y+Q.h-6}" class="t-xs">months · 2–6 mo slopes from study, rest drawn</text>`;
    }else{
      s+=`<text x="${Q.x+14}" y="${Q.y+20}" class="t-sm" style="fill:var(--accent)">SKILLS GAINED, THEN LOST</text>`;
      const x0=Q.x+16,x1=Q.x+Q.w-16,y0=Q.y+34,y1=Q.y+(N?84:118),X=v=>lerp(x0,x1,v/36),Y=v=>lerp(y1,y0,v/10);
      const sk=v=>{const g=MI_CH.filter(c=>c.s&&v>=c.a).length*.9;if(v<MI_REG)return g;const loss=ramp(v,MI_REG,MI_REG+3);return Math.max(1.2,g-loss*5.4-(v-MI_REG)*.12)};
      s+=`<line x1="${x0}" x2="${x1}" y1="${y1}" y2="${y1}" class="axis"/>`;
      s+=`<rect x="${f1(X(MI_REG-1))}" y="${y0-6}" width="${f1(X(MI_REG+3)-X(MI_REG-1))}" height="${f1(y1-y0+6)}" style="fill:var(--bad-soft)"/><text x="${f1(X(MI_REG+1))}" y="${y0+4}" class="t-xs t-mid" style="fill:var(--bad)">mean onset ≈ 20 mo</text>`;
      if(m>0)s+=`<path d="${pathFn(u=>1-sk(u*m)/10,x0,X(m),y0,y1,80)}" style="fill:none;stroke:var(--accent);stroke-width:2.4"/>`;
      [0,12,24,36].forEach(v=>s+=`<text x="${f1(X(v))}" y="${y1+12}" class="t-xs t-mid">${v}</text>`);
      const iy=y1+24;
      for(let i=0;i<3;i++)s+=person(x0+8+i*24,iy,30,i===0?'var(--bad)':'var(--line)');
      s+=`<text x="${x0+84}" y="${iy+12}" class="t-xs" style="fill:var(--ink)">about 1 in 3 autistic children</text><text x="${x0+84}" y="${iy+25}" class="t-xs">32.1% (2013) · 30% (2021) meta-analyses</text>`;
    }
    /* ---- timeline with chips ---- */
    if(!N){
      const T=tl(40,330,650,{max:36,step:6,minor:3}),X=T.at,laneY=[226,248,270,292];
      s+=T.svg;
      MI_CH.forEach(c=>{const S=chipState(c,m),x=X(c.a)-4,y=laneY[c.l];s+=`<circle cx="${f1(X(c.a))}" cy="330" r="2.4" style="fill:${m>=c.a?'var(--accent)':'var(--line)'}"/>`;if(S)s+=miChip(x,y,c.t,S)});
      MI_FLAGS.forEach(F=>{const x=X(F.a),hot=m>=F.a;s+=`<path d="M${f1(x)} 352V368M${f1(x)} 352l11 4l-11 4" style="fill:${hot?'var(--bad)':'none'};stroke:var(--bad);stroke-width:1.4;stroke-linejoin:round"/><text x="${f1(x+F.dx)}" y="366" class="t-xs ${F.an}" style="fill:${hot?'var(--bad)':'var(--muted)'}">${F.t}</text>`});
      s+=`<line x1="40" x2="690" y1="400" y2="400" style="stroke:var(--bad);stroke-width:1.4;stroke-dasharray:5 4;opacity:.7"/><text x="365" y="396" class="t-xs t-mid" style="fill:var(--bad)">any loss of skills, at any age: talk to a clinician promptly</text>`;
      s+=`<line x1="${f1(X(m))}" x2="${f1(X(m))}" y1="216" y2="336" style="stroke:var(--ink);stroke-width:1.2;opacity:.4"/><circle cx="${f1(X(m))}" cy="330" r="4.5" style="fill:var(--ink)"/>`;
    }else{
      const y0=372,y1=690,Y=v=>lerp(y0,y1,v/36),ax=46;
      s+=`<line x1="${ax}" x2="${ax}" y1="${y0}" y2="${y1}" style="stroke:var(--muted)"/>`;
      for(let v=0;v<=36;v+=6)s+=`<line x1="${ax-4}" x2="${ax+4}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" style="stroke:var(--muted)"/><text x="${ax-8}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}mo</text>`;
      const grp={};MI_CH.forEach(c=>{const k=grp[c.a]||0;grp[c.a]=k+1;const S=chipState(c,m);s+=`<circle cx="${ax}" cy="${f1(Y(c.a))}" r="2.4" style="fill:${m>=c.a?'var(--accent)':'var(--line)'}"/>`;
        if(S)s+=miChip(ax+14+k*114,Y(c.a)-8,c.t,S,110)});
      MI_FLAGS.forEach(F=>{const y=Y(F.a),hot=m>=F.a;s+=`<path d="M${ax-34} ${f1(y-1)}l-8 -4v8z" style="fill:${hot?'var(--bad)':'none'};stroke:var(--bad);stroke-width:1.3"/>`});
      s+=`<text x="${ax+14}" y="${y1+18}" class="t-xs" style="fill:var(--bad)">◂ red flags: 12, 16, 24 mo; skill loss: any age</text>`;
      s+=`<line x1="${ax-6}" x2="390" y1="${f1(Y(m))}" y2="${f1(Y(m))}" style="stroke:var(--ink);stroke-width:1.1;opacity:.35"/><circle cx="${ax}" cy="${f1(Y(m))}" r="4.5" style="fill:var(--ink)"/>`;
    }
    svg.innerHTML=s;
    const ST=steps(),ph=phaseOf(ST,t);setSt(ph);
    const nf=MI_FLAGS.find(F=>F.a>m);
    $('#miRead').innerHTML=`<span>age <b>${f1(m)} months</b></span><span>view <b>${MODE_N[mode]}</b></span><span>chips shown <b>${shown} of ${MI_CH.length}</b></span><span>${nf?`next red-flag age <b>${nf.n} months</b>`:'red-flag ages <b>passed</b>'}</span>`;
    $('#miNote').innerHTML=noteHTML(ST[ph]);
  }
  function miChip(x,y,txt,S,wFix){const w=Math.max(wFix||0,txt.length*6.6+12),st=S.st;
    const fill=st==='lost'?'var(--bad-soft)':st==='dim'?'var(--panel)':'var(--accent-soft)',stroke=st==='lost'?'var(--bad)':'var(--accent)';
    let g=`<g style="opacity:${f1(S.on*(st==='dim'?.6:1))}"><rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="17" rx="8.5" style="fill:${fill};stroke:${stroke};stroke-width:1.1${st==='dim'?';stroke-dasharray:3 2.5':''}"/>`;
    g+=`<text x="${f1(x+6)}" y="${f1(y+12)}" class="t-xs" style="fill:${st==='lost'?'var(--bad)':'var(--ink)'}">${txt}</text>`;
    if(st==='lost')g+=`<line x1="${f1(x+7)}" x2="${f1(x+w-7)}" y1="${f1(y+8.5)}" y2="${f1(y+8.5)}" style="stroke:var(--bad);stroke-width:1.2"/>`;
    return g+'</g>'}
  const stop=playWire(rg,$('#miPlay'),draw,22000,'%t:player.replay%','milestones');
  function wire(){const old=$('#miSteps'),nu=old.cloneNode(false);old.replaceWith(nu);setSt=stepWire(nu,steps(),rg,draw,stop)}
  $$('[data-mi]').forEach(b=>b.addEventListener('click',()=>{stop();mode=b.dataset.mi;$$('[data-mi]').forEach(x=>x.setAttribute('aria-pressed',x===b));wire();draw(+rg.value)}));
  wire();draw(+rg.value);

  /* ---- if you are worried: which step matters most ---- */
  const WHY={
   name:{on:['hear','talk'],txt:`Start with hearing: not turning to a name only counts as an early sign of autism when hearing is normal. [[Araujo2026]] Then raise it at the next visit; many autistic infants do respond to their name, and many who do not are not autistic. [[Nadig2007]]`},
   words:{on:['talk','hear','ref'],txt:`No single words by 16 months and no two-word phrases by 24 months are reasons for a closer look, most of all alongside social differences. [[Araujo2026]] Two languages at home do not explain a delay. [[Hambly2012]]`},
   point:{on:['note','talk'],txt:`Pointing to share interest is a key early social skill. Note whether the child points to ask, to show, or both, and mention it at the 18- or 24-month visit, when the AAP recommends autism-specific screening. [[Araujo2026,Hyman2020]]`},
   lost:{on:['talk','ref'],txt:`Loss of words, social or other skills should be raised promptly, at any age. Unexplained loss of skills warrants further, including neurological, assessment. [[Fuentes2021ESCAP]] Sudden, severe loss after typical development is rare and needs its own investigation. [[Fuentes2021ESCAP]]`},
   feel:{on:['note','talk','now'],txt:`A parent's sense that something is different matters: parents of autistic children report concerns early, and passive "wait and see" responses were linked to longer delays. [[Zuckerman2015]] A negative screen does not rule autism out if you are still worried. [[Fuentes2021ESCAP]]`}};
  $$('[data-mw]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.mw,was=b.getAttribute('aria-pressed')==='true';
    $$('[data-mw]').forEach(x=>x.setAttribute('aria-pressed',!was&&x===b));
    $$('#miPath [data-mp]').forEach(c=>c.classList.toggle('on',!was&&WHY[k].on.includes(c.dataset.mp)));
    $('#miWhy').innerHTML=was?'Choose a concern above. Every path starts the same way: your observations count.':WHY[k].txt}));
};
