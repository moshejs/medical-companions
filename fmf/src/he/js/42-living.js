/* =============== 4.2 living with FMF =============== */
const LV_STEPS=[
 {from:0,at:.02,k:'חודשים 1–3',t:'השנה הראשונה היא הצפופה',
  txt:'EULAR 2016 מבקשת לבחון את התגובה, הרעילות וההיענות כל 6 חודשים, בתדירות גבוהה יותר בשנה הראשונה או בכל פעם שסמני השלב החריף מוגברים, ופעם בשנה כשהמצב יציב. היא גם קובעת בדיקת שתן בכל ביקור במרפאה, במיוחד כדי לזהות חלבון בשתן (פרוטאינוריה) מוקדם. העדכון של 2024 אינו קובע מרווח קבוע, ומבקש מעקב תכוף יותר בזמן האבחנה וכל עוד המחלה אינה מאוזנת. [[Ozen2016,Ozen2025,RheumNow2025]]',
  pt:'בשנה הראשונה הביקורים צפופים יותר, ואחר כך הם מתייצבים בקצב קבוע כשהמחלה שקטה.',
  hook:'בדיקת שתן <b>בכל ביקור</b>. זו האזהרה המוקדמת הזולה ביותר למחלת כליות עמילואידית.'},
 {from:.25,at:.3,k:'חודשים 4–6',t:'הבדיקה של חצי השנה',
  txt:'הבדיקות שמפורטות ב־2016 הן SAA ו/או CRP, ספירת דם, אנזימי כבד, תפקודי כליה, CPK ובדיקת שתן לחלבון בשתן. ההנחיה קובעת שמינון הקולכיצין מופחת אם אנזימי הכבד עולים מעל פי שניים מהגבול העליון של הנורמה. היא גם קובעת שיש לשתף את המטופל בערכי SAA גבוהים, כדרך מכוונת לתמוך בהיענות לטיפול. היעד המספרי היחיד ל־SAA ב־2016, מתחת ל־10 mg/L, נכתב למטופלים שכבר יש להם עמילואידוזיס מסוג AA. מחוץ למצב הזה לא נקבע סף: המטרה הכוללת של 2024 היא פעילות קלינית מינימלית או אפסית, יחד עם שליטה בדלקת התת־קלינית. [[Ozen2016,Ozen2025,RheumNow2025]]',
  pt:'הבדיקה של חצי שנה בוחנת דלקת, ספירות דם, כבד, כליות, אנזים שריר ושתן.',
  hook:'בעמילואידוזיס מסוג AA, היעד של 2016 הוא <b>SAA מתחת ל־10 mg/L</b>, עם CRP כתחליף לא מושלם כשאין SAA זמין. מחוץ לעמילואידוזיס ההנחיות אינן נוקבות במספר, אלא רק ב״מבוקרת״.'},
 {from:.5,at:.55,k:'חודשים 7–9',t:'החיים לא עוצרים בשביל לוח הזמנים',
  txt:'ההנחיות מתייחסות להיריון, לניתוח ולחיסונים כחלק מהטיפול הרגיל ב־FMF, ולא כחריגים. הקולכיצין נמשך לאורך ההתעברות, ההיריון וההנקה. עומס גופני וטראומה מופיעים ברשימת הגורמים המעוררים התקפים, וכליות עם עמילואידוזיס מתוארות כרגישות במיוחד לזרימת דם נמוכה, ללחץ דם גבוה ולתרופות רעילות לכליה. השתמשו במתגים למעלה כדי להכניס את המצבים האלה לשנה. [[Ozen2016,Ozen2025]]',
  pt:'היריון, ניתוחים וחיסונים עולים כולם, וההנחיות שפורסמו מתייחסות לכל אחד מהם.',
  hook:'הקולכיצין <b>ממשיך</b> בהיריון ובהנקה, והשימוש בו לבדו אינו מצדיק בדיקת מי שפיר.'},
 {from:.75,at:.88,k:'חודשים 10–12',t:'התמונה השנתית',
  txt:'כשהמצב יציב, 2016 מתארת בדיקה שנתית. העדכון של 2024 בונה את השנה סביב מערך תוצאות מינימלי: תדירות ההתקפים לכל 3 חודשים, הערכת רופא, מדדי תוצאה וחוויה המדווחים על ידי המטופל, ו־CRP או SAA. המטרה הכוללת שהוא מציין היא פעילות קלינית מינימלית או אפסית, לצד שליטה בדלקת התת־קלינית, לכל החיים, כשההיענות לטיפול במרכז. [[Ozen2016,Ozen2025,RheumNow2025]]',
  pt:'לאורך שנה שלמה השאלות פשוטות: כמה התקפים היו, איך הם נראו, והאם סמני הדלקת נשארו תקינים ביניהם.',
  hook:'מערך התוצאות המינימלי של 2024: <b>התקפים לכל 3 חודשים, הערכת רופא, PROMs/PREMs, CRP או SAA</b>.'}
];
const LV_MON=`<div class="kv"><div><dt>מה כוללת בדיקה שגרתית</dt><dd>SAA ו/או CRP, ספירת דם, אנזימי כבד, תפקודי כליה, CPK ובדיקת שתן לחלבון בשתן, עם בדיקת שתן בכל ביקור. לפי 2016 נבחנים כל 6 חודשים, בתדירות גבוהה יותר בשנה הראשונה או כשהסמנים מוגברים, ופעם בשנה כשהמצב יציב. [[Ozen2016,Ozen2025]]</dd></div></div>`;
const LV_EV=[
 {m:.3,key:0,t:'ביקור פתיחה',c:'var(--sea)',d:LV_MON},
 {m:2,key:'preg',t:'תחילת היריון',c:'var(--crocus)',
  d:`<div class="kv"><div><dt>היריון</dt><dd>אין להפסיק קולכיצין במהלך ההתעברות, ההיריון או ההנקה, והשימוש בקולכיצין לבדו אינו מצדיק בדיקת מי שפיר. כך נקבע ב־2016, וכך חזר ב־2024. במחקר של 179 הריונות שטופלו בקולכיצין, 197 הריונות FMF שלא טופלו ו־312 הריונות בקבוצת הביקורת, שיעורי ההפלות המוקדמות והמאוחרות ושיעורי המומים המולדים לא היו שונים בין הקבוצות. מטא־אנליזה מ־2024 של 1,242 הריונות עם FMF מצאה סיכון גבוה יותר ללידה מוקדמת (OR 1.67, רווח סמך 95% 1.05–2.67), אבל לא עלייה מובהקת בהגבלת גדילה תוך־רחמית או ביתר לחץ דם בהיריון. [[Ozen2016,Ozen2025,BenChetrit2010,Hirahara2024]]</dd></div></div>`},
 {m:3,key:0,t:'בדיקת השנה הראשונה',c:'var(--sea)',d:LV_MON},
 {m:3.6,key:'trav',t:'נסיעה ועמידה ממושכות',c:'var(--terra)',
  d:`<div class="kv"><div><dt>נסיעות וזמן על הרגליים</dt><dd>בקרב 275 מטופלים, התקפים של מערכת השריר והשלד נקשרו לעמידה ממושכת (78.8%) ולנסיעה ארוכה (64.1%), ועייפות הייתה במקום השלישי (47.8%). כאב רגליים במאמץ הופיע ב־22.1% מתוך 3,454 ילדים בקבוצת הילדים הגדולה ביותר, וב־30.2% מההומוזיגוטים ל־M694V (P&lt;0.001); EULAR 2016 מציעה לו NSAIDs. מיאלגיה ממושכת עם חום (protracted febrile myalgia), בעיה נפרדת וקשה יותר, הופיעה ב־1.6%. [[Karadag2013,Ozturk2022,Ozen2016]]</dd></div></div>`},
 {m:5,key:'exam',t:'מבחנים, לחץ גבוה',c:'var(--terra)',
  d:`<div class="kv"><div><dt>לחץ</dt><dd>לחץ הוא הגורם המעורר שמאחוריו הראיות הטובות ביותר. במחקר case-crossover של 104 מטופלים ארמנים, כל אירוע מלחיץ נוסף העלה את הסיכוי להתקף כעבור יומיים בכ־70% (OR 1.7, רווח סמך 95% 1.04–2.79), וגם לחץ נתפס גבוה ניבא התקפים; אותו מחקר לא מצא עלייה בסיכוי אחרי פעילות גופנית מאומצת או ארוחות עתירות שומן. בקרב 882 מטופלים, לחץ נפשי היה הגורם המעורר שצוין בתדירות הגבוהה ביותר, 75.2%. EULAR 2016 מציינת, ברמת ראיות נמוכה, שאפשר לשקול העלאה זמנית של הקולכיצין בתקופות של לחץ גופני או רגשי. [[Yenokyan2012,Parlar2024,Ozen2016]]</dd></div></div>`},
 {m:6,key:0,t:'בדיקות חצי השנה',c:'var(--sea)',d:LV_MON},
 {m:7,key:'surg',t:'ניתוח מתוכנן',c:'var(--warn)',
  d:`<div class="kv"><div><dt>ניתוח</dt><dd>לא נמצאו מחקרים ייעודיים על קולכיצין סביב ניתוח ב־FMF, ולכן ההנחיות עקיפות. EULAR 2016 מונה עומס גופני וטראומה בין הגורמים המעוררים התקפים, וממליצה להימנע ככל האפשר מניתוח ומירידה בזרימת הדם לרקמות (היפופרפוזיה) אצל מטופלים עם כליות עמילואידיות, שרגישות במיוחד לזרימת דם נמוכה, ללחץ דם גבוה ולתרופות רעילות לכליה. בקבוצה של 971 מבוגרים, 24.7% עברו כריתת תוספתן; למטופלים האלה היו יותר התקפים של דלקת הצפק (פריטוניטיס), יותר עמידות לקולכיצין (15% לעומת 6.7%), והם נזקקו למינוני קולכיצין גבוהים יותר. [[Ozen2016,Bodakci2021]]</dd></div></div>`},
 {m:9,key:0,t:'בדיקת השנה הראשונה',c:'var(--sea)',d:LV_MON},
 {m:9.4,key:'vacc',t:'חיסון בטיפול ביולוגי',c:'var(--gold)',
  d:`<div class="kv"><div><dt>חיסונים בזמן חסימת IL-1</dt><dd>המלצות EULAR לחיסונים מ־2019 קובעות שאפשר לתת חיסונים שאינם חיים בכל טיפול, ואילו חיסונים חיים מוחלשים אפשר לשקול בזהירות במטופלים עם דיכוי חיסוני, רצוי כשהמחלה שקטה ובאופן אידיאלי לפני תחילת הדיכוי החיסוני. עלון קנאקינומאב ממליץ להימנע מחיסונים חיים במהלך הטיפול, ולהשלים את החיסונים לפני תחילתו. סקר בינלאומי של 17 מטופלים שקיבלו חיסונים חיים מוחלשים בזמן חסימת IL-1 או IL-6 תיעד 3 תופעות לוואי, 2 מהן חמורות (זיהום בנגיף varicella-zoster אחרי מנת דחף של VZV, ודלקת ריאות אחרי מנת דחף של MMR), ו־7 התלקחויות, רובן קלות; המחברים לא ראו בממצאים האלה סיבה לשנות את ההנחיות. [[Furer2020,IlarisPI,Jeyaratnam2018]]</dd></div></div>`},
 {m:11,key:'preg',t:'לידה',c:'var(--crocus)',
  d:`<div class="kv"><div><dt>לידה, וההורה השני</dt><dd>האות שעולה מהמטא־אנליזה על היריון עם FMF הוא לידה מוקדמת (OR 1.67), לא מומים. מצד האב, גברים בדרך כלל אינם צריכים להפסיק קולכיצין לפני ההתעברות, אזוספרמיה שהוכח שנגרמה מקולכיצין היא נדירה, ולבנות הזוג של גברים שטופלו בקולכיצין לא היו יותר הפלות או מומים מאשר בקבוצת הביקורת. במחקר ארמני, אי־פוריות ב־FMF הלכה יחד עם מחלה קשה יותר ועם טיפול לא מספק בקולכיצין, ולא עם התרופה. עמילואידוזיס של האשכים היא סיבה מוכרת לאזוספרמיה, וכדאי לשקול אותה לפני שתולים את האשמה בקולכיצין. [[Hirahara2024,Ozen2016,BenChetrit2004,Sotskiy2021]]</dd></div></div>`},
 {m:11.8,key:0,t:'סקירה שנתית',c:'var(--sea)',d:LV_MON}
];
inits.living=()=>{
  const svg=$('#lvSvg'),rg=$('#lvT');const on={preg:false,surg:false,vacc:false,exam:false,trav:false};
  const vis=()=>LV_EV.filter(e=>e.key===0||on[e.key]);
  const ang=m=>-Math.PI/2+m/12*Math.PI*2;
  function draw(t){
    const mNow=t*12,E=vis();
    /* narrow: the ring keeps its size, the event labels move into a list underneath,
       and the event the year has just reached is highlighted in both */
    const N=vb(svg,'720 440','400 '+(384+E.length*27+(E.length<7?36:22)));
    const CX=N?200:232, CY=N?196:232, R=N?136:148;
    const LX=N?16:432, LY=N?384:62, LST=N?27:31, LTX=N?52:456, LRX=N?386:712, LHD=N?366:38, LHX=LX;
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    // pregnancy span arc
    if(on.preg){const a0=ang(2),a1=ang(Math.min(mNow,11));let d='';
      for(let i=0;i<=60;i++){const a=lerp(a0,a1,i/60);d+=(i?'L':'M')+f1(CX+Math.cos(a)*(R+13))+' '+f1(CY+Math.sin(a)*(R+13))}
      if(a1>a0)s+=`<path d="${d}" style="fill:none;stroke:var(--crocus);stroke-width:7;opacity:.5;stroke-linecap:round"/>`;
      if(N){if(mNow>2){s+=`<line x1="160" x2="176" y1="13" y2="13" style="stroke:var(--crocus);stroke-width:5;opacity:.5;stroke-linecap:round"/>`;
        s+=`<text x="182" y="17" class="t-xs" style="fill:var(--crocus)">היריון</text>`}}
      else{const am=ang(lerp(2,Math.min(mNow,11),.5)),ar=R+28;
        s+=`<text x="${f1(CX+Math.cos(am)*ar)}" y="${f1(CY+Math.sin(am)*ar)}" class="t-xs t-mid" style="fill:var(--crocus)">${mNow>2?'היריון':''}</text>`}}
    // base ring + progress
    s+=`<circle cx="${CX}" cy="${CY}" r="${R}" style="fill:none;stroke:var(--line);stroke-width:9"/>`;
    let pd='';const NS=Math.max(1,Math.round(t*180));
    for(let i=0;i<=NS;i++){const a=ang(t*12*i/NS);pd+=(i?'L':'M')+f1(CX+Math.cos(a)*R)+' '+f1(CY+Math.sin(a)*R)}
    s+=`<path d="${pd}" style="fill:none;stroke:var(--sea);stroke-width:9;stroke-linecap:round"/>`;
    // month ticks and numbers inside
    for(let m=0;m<12;m++){const a=ang(m);
      s+=`<line x1="${f1(CX+Math.cos(a)*(R-6))}" x2="${f1(CX+Math.cos(a)*(R+6))}" y1="${f1(CY+Math.sin(a)*(R-6))}" y2="${f1(CY+Math.sin(a)*(R+6))}" style="stroke:var(--panel);stroke-width:2"/>`;
      const ai=ang(m+.5);
      s+=`<text x="${f1(CX+Math.cos(ai)*(R-24))}" y="${f1(CY+Math.sin(ai)*(R-20))}" class="t-xs t-mid" style="fill:${mNow>=m?'var(--ink)':'var(--muted)'}">${m+1}</text>`}
    // event dots. in narrow each carries its number from the list below
    let curI=-1;E.forEach((e,i)=>{if(mNow>=e.m)curI=i});
    E.forEach((e,i)=>{const a=ang(e.m),x=CX+Math.cos(a)*R,y=CY+Math.sin(a)*R,hit=mNow>=e.m,now=i===curI;
      if(N&&now)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="17" style="fill:${e.c};opacity:.18"/>`;
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${hit?(N&&now?11:9):6}" style="fill:${hit?e.c:'var(--panel)'};stroke:${e.c};stroke-width:${N&&now?3:2}"/>`;
      if(hit)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(9+9*bump(mNow,e.m,e.m+.6))}" style="fill:none;stroke:${e.c};stroke-width:1.5;opacity:${f1(.8*bump(mNow,e.m,e.m+.6))}"/>`;
      if(N){const xo=CX+Math.cos(a)*(R+19),yo=CY+Math.sin(a)*(R+19);
        s+=`<text x="${f1(xo)}" y="${f1(yo+3.5)}" class="t-xs t-mid" style="fill:${hit?e.c:'var(--muted)'};font-weight:700">${i+1}</text>`}});
    // moving hand
    const a=ang(mNow);
    s+=`<line x1="${CX}" x2="${f1(CX+Math.cos(a)*(R-34))}" y1="${CY}" y2="${f1(CY+Math.sin(a)*(R-34))}" style="stroke:var(--terra);stroke-width:2.4"/>`;
    s+=`<circle cx="${CX}" cy="${CY}" r="4" style="fill:var(--terra)"/>`;
    // centre readout
    s+=`<text x="${CX}" y="${CY-8}" class="t-sm t-mid">חודש</text>`;
    s+=`<text x="${CX}" y="${CY+22}" class="t-big t-mid" style="font-size:28px">${(mNow+.0001).toFixed(1)}</text>`;
    s+=`<text x="${CX}" y="${CY+42}" class="t-xs t-mid">${E.filter(e=>mNow>=e.m).length} מתוך ${E.length} אירועים חלפו</text>`;
    // the event list: beside the ring when wide, under it when narrow
    s+=`<text x="${LHX}" y="${LHD}" class="t-sm" style="fill:var(--sea)">השנה הזו, לפי הסדר</text>`;
    E.forEach((e,i)=>{const y=LY+i*LST,hit=mNow>=e.m,now=i===curI;
      if(N&&now)s+=`<rect x="${LX-6}" y="${y-18}" width="${LRX-LX+12}" height="24" rx="7" style="fill:${e.c};opacity:.14"/>`;
      if(N)s+=`<text x="${LX+10}" y="${y}" class="t-xs t-end" style="fill:${hit?e.c:'var(--muted)'};font-weight:700">${i+1}</text>`;
      s+=`<circle cx="${N?LX+24:LX+10}" cy="${y-4}" r="${now&&N?6:5}" style="fill:${hit?e.c:'var(--panel)'};stroke:${e.c};stroke-width:1.8"/>`;
      s+=`<text x="${LTX}" y="${y}" class="t-lbl" style="fill:${hit?'var(--ink)':'var(--muted)'};font-size:12.5px">${e.t}</text>`;
      s+=`<text x="${LRX}" y="${y}" class="t-xs t-end">חודש ${e.m.toFixed(1)}</text>`});
    if(E.length<7)s+=`<text x="${LTX}" y="${LY+E.length*LST+16}" class="t-xs">הוסיפו עוד בעזרת המתגים</text>`;
    svg.innerHTML=s;
    const p=phaseOf(LV_STEPS,t);setSt(p);
    const past=E.filter(e=>mNow>=e.m);const last=past[past.length-1];
    $('#lvNote').innerHTML=noteHTML(LV_STEPS[p])+(last?last.d:'');
    $('#lvCap').textContent=`חודש ${(mNow).toFixed(1)} מתוך 12 · ${past.length} אירועים חלפו${last?' · האחרון: '+last.t:''}. שנה סכמטית; המרווחים לפי ההנחיות שפורסמו, לא לפי מרפאה מסוימת.`;
  }
  const stop=playWire(rg,$('#lvPlay'),draw,18000,'הפעלה חוזרת','living');
  const setSt=stepWire($('#lvSteps'),LV_STEPS,rg,draw,stop);
  [['lvPreg','preg'],['lvSurg','surg'],['lvVacc','vacc'],['lvExam','exam'],['lvTrav','trav']].forEach(([id,k])=>{
    const b=$('#'+id);b.onclick=()=>{on[k]=!on[k];b.setAttribute('aria-pressed',on[k]);draw(+rg.value)}});
  draw(+rg.value);

  /* ---- trigger evidence ---- */
  const ts=$('#lvTrig'),tr=$('#lvTR');
  const LV_TRIG=[
   {h:'גורמים מעוררים שדווחו להתקפי סרוזיטיס · 275 מטופלים',y:46},
   {l:'חשיפה לקור',v:59.3,y:66},
   {l:'לחץ רגשי',v:49.8,y:94},
   {l:'עייפות',v:40.0,y:122},
   {l:'וסת (מבין הנשים)',v:33.7,y:150},
   {h:'גורמים מעוררים שדווחו להתקפי שריר ושלד · אותו מחקר',y:192},
   {l:'עמידה ממושכת',v:78.8,y:212},
   {l:'נסיעה ארוכה',v:64.1,y:240},
   {h:'מחקר השאלונים הגדול ביותר · 882 מטופלים',y:282},
   {l:'לחץ נפשי',v:75.2,y:302}
  ];
  const LV_TRIGN=['גורמים מעוררים שדווחו · סרוזיטיס · 275 מטופלים','התקפי שריר ושלד · אותו מחקר','מחקר השאלונים הגדול ביותר · 882 מטופלים'];
  /* narrow: bars run the full width with their label on the line above, so a long
     label like "menstruation (of women)" no longer needs a left gutter */
  function drawTN(t){
    const BX0=14,BX1=300;let s='',y=30,bi=0,hi=0;
    const tops=[];
    LV_TRIG.forEach(r=>{if(r.h){y+=bi?30:22;tops.push(y)}else{y+=44;bi++}});
    const barTop=tops[0]-12, barBot=y-2;
    [0,25,50,75,100].forEach(v=>{const x=lerp(BX0,BX1,v/100);
      s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${barTop}" y2="${barBot}" class="grid"/><text x="${f1(x)}" y="${barBot+16}" class="t-xs t-mid">${v}%</text>`});
    y=30;bi=0;
    LV_TRIG.forEach(r=>{
      if(r.h){y+=bi?30:22;s+=`<text x="14" y="${y}" class="t-sm" style="fill:var(--terra)">${LV_TRIGN[hi++]}</text>`;return}
      const k=ease(ramp(t,bi*.08,bi*.08+.4)),w=(BX1-BX0)*r.v/100*k;bi++;
      s+=`<text x="14" y="${y+16}" class="t-xs" style="fill:var(--ink)">${r.l}</text>`;
      s+=`<rect x="${BX0}" y="${y+22}" width="${f1(w)}" height="18" rx="4" style="fill:var(--terra)"/>`;
      s+=`<text x="${f1(BX0+w+7)}" y="${y+35}" class="t-xs" style="fill:var(--terra);font-weight:700;opacity:${f1(ramp(k,.6,1))}">${f1(r.v)}%</text>`;
      y+=44});
    // case-crossover block
    y=barBot+42;
    const o=ease(ramp(t,.6,.95));
    s+=`<g style="opacity:${f1(.12+.88*o)}"><text x="14" y="${y}" class="t-sm" style="fill:var(--sea)">מחקר case-crossover · 104 מטופלים, כל אחד מול עצמו</text>`;y+=10;
    const chips=[[['כל אירוע מלחיץ נוסף: הסיכוי להתקף','כעבור 2 ימים עולה בכ־70%'],'var(--sea)','var(--sea-soft)'],
                 [['פעילות גופנית מאומצת: אין עלייה בסיכוי'],'var(--good)','var(--good-soft)'],
                 [['ארוחות עתירות שומן: אין עלייה בסיכוי'],'var(--good)','var(--good-soft)']];
    chips.forEach(c=>{const h=c[0].length*14+10;
      s+=`<rect x="14" y="${y}" width="372" height="${h}" rx="6" style="fill:${c[2]};stroke:${c[1]}"/>`;
      c[0].forEach((l,j)=>{s+=`<text x="24" y="${y+15+j*14}" class="t-xs" style="fill:${c[1]}">${l}</text>`});
      y+=h+8});
    s+='</g>';
    return s;
  }
  function drawT(t){
    const N=vb(ts,'720 420','400 592');
    const BX0=218,BX1=662;let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    if(N){ts.innerHTML=s+drawTN(t);return}
    [0,25,50,75,100].forEach(v=>{const x=lerp(BX0,BX1,v/100);
      s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="56" y2="316" class="grid"/><text x="${f1(x)}" y="332" class="t-xs t-mid">${v}%</text>`});
    let bi=0;
    LV_TRIG.forEach(r=>{
      if(r.h){s+=`<text x="14" y="${r.y}" class="t-sm" style="fill:var(--terra)">${r.h}</text>`;return}
      const k=ease(ramp(t,bi*.08,bi*.08+.4)),w=(BX1-BX0)*r.v/100*k;bi++;
      s+=`<text x="208" y="${r.y+13}" class="t-xs t-end" style="fill:var(--ink)">${r.l}</text>`;
      s+=`<rect x="${BX0}" y="${r.y}" width="${f1(w)}" height="18" rx="4" style="fill:var(--terra)"/>`;
      s+=`<text x="${f1(BX0+w+7)}" y="${r.y+13}" class="t-xs" style="fill:var(--terra);font-weight:700;opacity:${f1(ramp(k,.6,1))}">${f1(r.v)}%</text>`});
    // case-crossover block
    const o=ease(ramp(t,.6,.95));
    s+=`<g style="opacity:${f1(.12+.88*o)}"><text x="14" y="358" class="t-sm" style="fill:var(--sea)">מחקר case-crossover · 104 מטופלים, כל אחד בהשוואה לעצמו</text>`;
    const chips=[['כל אירוע מלחיץ נוסף: הסיכוי להתקף כעבור 2 ימים עולה בכ־70%','var(--sea)','var(--sea-soft)'],
                 ['פעילות גופנית מאומצת: אין עלייה בסיכוי','var(--good)','var(--good-soft)'],
                 ['ארוחות עתירות שומן: אין עלייה בסיכוי','var(--good)','var(--good-soft)']];
    chips.forEach((c,i)=>{const y=i===0?368:394,x=i===2?372:14,w=i===0?690:348;
      s+=`<rect x="${x}" y="${y}" width="${w}" height="20" rx="6" style="fill:${c[2]};stroke:${c[1]}"/>`;
      s+=`<text x="${x+10}" y="${y+14}" class="t-xs" style="fill:${c[1]}">${c[0]}</text>`});
    s+='</g>';
    ts.innerHTML=s;
  }
  playWire(tr,$('#lvTPlay'),drawT,9000,'הפעלה חוזרת','living');drawT(+tr.value);

  /* ---- quality of life ---- */
  const qs=$('#lvQol'),qr=$('#lvQ');
  /* a room of twenty figures per row: the published percentage is the shaded share
     of the row, and the figure itself is still printed beside it */
  const LV_Q=[
   {l:'זמן עבודה שהוחמץ · היעדרות · 111 מבוגרים',a:9.3,p:0.7},
   {l:'תפוקה שאבדה בזמן העבודה · פרזנטיזם · אותו מחקר',a:35.2,p:9.6},
   {l:'דיכאון מאובחן · 7,670 מטופלים לעומת ביקורת מותאמת',n:'דיכאון מאובחן · 7,670 לעומת ביקורת מותאמת',a:6.22,p:4.58},
   {l:'חרדה מאובחנת · אותו מאגר נתונים',a:4.93,p:3.14}
  ];
  const person=(x,y,fill,stroke)=>`<g transform="translate(${f1(x)} ${f1(y)})"><circle cx="0" cy="-17" r="3.6" style="fill:${fill};stroke:${stroke};stroke-width:1.1"/><path d="M-4.6 0V-8q0 -5 4.6 -5q4.6 0 4.6 5V0z" style="fill:${fill};stroke:${stroke};stroke-width:1.1;stroke-linejoin:round"/></g>`;
  const LV_SCH=['בית ספר: ל־129 מתבגרים עם FMF היו ממוצע ציונים נמוך יותר וציוני תפקוד','בבית הספר נמוכים יותר מאשר בקבוצת הביקורת (P=0.001). לא דווח אחוז.'];
  const LV_SCHN=['בית ספר: ל־129 מתבגרים עם FMF היו ממוצע ציונים','וציוני תפקוד בבית הספר נמוכים יותר מאשר בקבוצת','הביקורת (P=0.001). לא דווח אחוז.'];
  function drawQ(t){
    const N=vb(qs,'720 440','400 492');
    const L=N?{FX:14,PT:15,Y0:60,BP:92,R1:38,R2:72,VX:316,NM:0,SY:424,SH:60,SL:LV_SCHN}
             :{FX:176,PT:19,Y0:46,BP:88,R1:36,R2:70,VX:556,NM:168,SY:396,SH:44,SL:LV_SCH};
    const wtot=19*L.PT+9.2;
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    s+=`<text x="14" y="22" class="t-sm" style="fill:var(--terra)">עבודה ומצב רוח · FMF לעומת ביקורת מותאמת</text>`;
    s+=N?`<text x="14" y="36" class="t-xs">כל שורה של 20 דמויות = 100%, מוצללת לפי האחוז</text>`
        :`<text x="706" y="22" class="t-xs t-end">כל שורה של 20 דמויות = 100%; החלק המוצלל הוא האחוז שפורסם</text>`;
    LV_Q.forEach((g,i)=>{const y0=L.Y0+i*L.BP,k=ease(ramp(t,i*.12,i*.12+.46));
      s+=`<text x="14" y="${y0}" class="t-sm" style="fill:var(--ink)">${N&&g.n?g.n:g.l}</text>`;
      [[g.a,'var(--terra)','FMF',L.R1,0],[g.p,'var(--muted)','ביקורת',L.R2,1]].forEach(pr=>{
        const yb=y0+pr[3],id=`lvq${i}${pr[4]}`;
        s+=`<line x1="${f1(L.FX-7)}" x2="${f1(L.FX+wtot+3)}" y1="${f1(yb+3)}" y2="${f1(yb+3)}" style="stroke:var(--line);stroke-width:1.2"/>`;
        let base='',full='';
        for(let j=0;j<20;j++){const x=L.FX+j*L.PT;
          base+=person(x,yb,'var(--panel-2)','var(--line)');full+=person(x,yb,pr[1],pr[1])}
        s+=base;
        s+=`<clipPath id="${id}"><rect x="${f1(L.FX-5)}" y="${f1(yb-24)}" width="${f1(wtot*pr[0]/100*k)}" height="28"/></clipPath>`;
        s+=`<g clip-path="url(#${id})">${full}</g>`;
        if(L.NM)s+=`<text x="${L.NM}" y="${f1(yb)}" class="t-xs t-end" style="fill:${pr[1]}">${pr[2]}</text>`;
        s+=`<text x="${L.VX}" y="${f1(N?yb-2:yb)}" class="t-lbl" style="fill:${pr[1]};opacity:${f1(ramp(k,.5,1))}">${pr[0]}%</text>`;
        if(!L.NM)s+=`<text x="${L.VX}" y="${f1(yb+11)}" class="t-xs" style="fill:${pr[1]}">${pr[2]}</text>`})});
    const o=ease(ramp(t,.6,1));
    s+=`<g style="opacity:${f1(.12+.88*o)}"><rect x="14" y="${L.SY}" width="${N?372:692}" height="${L.SH}" rx="8" style="fill:var(--panel);stroke:var(--line)"/>`;
    L.SL.forEach((l,i)=>{s+=`<text x="28" y="${L.SY+18+i*15}" class="t-xs" style="fill:var(--ink)">${l}</text>`});
    s+='</g>';
    qs.innerHTML=s;
  }
  playWire(qr,$('#lvQPlay'),drawQ,8000,'הפעלה חוזרת','living');drawQ(+qr.value);

  $('#lvCards').innerHTML=`
   <div class="card"><h4>פרוגנוזה: שתי קבוצות מחקר, שתי תשובות</h4><p>בקבוצה טורקית ממרכז יחיד, של 587 מטופלים שנעקבו במשך חציון של 6 שנים, ההישרדות לא הייתה שונה באופן מובהק מזו של האוכלוסייה הכללית (יחס תמותה מתוקנן 1.48, רווח סמך 95% 0.817–2.49). עמילואידוזיס הייתה סיבת המוות המובילה והמנבא המובהק היחיד לתמותה. בקבוצה ישראלית של 1.25 מיליון מתבגרים, ל־1,225 שהיו עם FMF הייתה תמותה גבוהה יותר: 8.73 לעומת 4.32 מקרי מוות ל־10,000 שנות אדם, עם יחסי סיכון מתוקננים של 1.7 בגברים ו־2.48 בנשים. עמילואידוזיס של הכליות גרמה ל־35% ממקרי המוות בגברים ול־60% בנשים. שני המחקרים שונים בגודל, במדינה ובתקופה; מה שהם מסכימים עליו הוא שהעמילואידוזיס היא שמניעה את הסיכון. [[Akar2012,Twig2014]]</p>
     <div class="hook"><b>לבחינה</b>עמילואידוזיס היא ציר הפרוגנוזה ב־FMF. כששולטים בדלקת בין ההתקפים, עקומות ההישרדות מתקרבות לעקומת האוכלוסייה.</div></div>
   <div class="card"><h4>איכות חיים, במדידה</h4><p>ילדים בגיל בית ספר עם FMF קיבלו ציונים נמוכים יותר מבני גילם הבריאים באיכות החיים הגופנית והפסיכו־סוציאלית. בקרב 111 מבוגרים, ההיעדרות מהעבודה הייתה 9.3% לעומת 0.7% בקבוצת הביקורת, והפרזנטיזם (ירידה בתפוקה בזמן העבודה) 35.2% לעומת 9.6%; הפגיעה הייתה הגדולה ביותר במטופלים עמידים לקולכיצין, ונמוכה יותר במי שקיבלו אנטגוניסטים ל־IL-1. ציוני SF-36 השתפרו אחרי 3 חודשי טיפול באנטגוניסט ל־IL-1 בקרב 44 מטופלים עמידים לקולכיצין. גם רילונאספט שיפר בניסוי שלו את ציוני איכות החיים הגופנית. [[Makay2009,Suticen2021,Varan2019,Hashkes2014]]</p></div>
   <div class="card"><h4>מצב רוח</h4><p>במחקר על מאגר נתוני בריאות ישראלי, של 7,670 מטופלי FMF ו־7,670 נבדקי ביקורת מותאמים, דיכאון אובחן ב־6.22% לעומת 4.58% וחרדה ב־4.93% לעומת 3.14%, בשניהם P&lt;0.001. מחקרי שאלונים מוצאים פערים גדולים יותר: במחקר אחד במבוגרים, 33% לעומת 12% בדיכאון ו־53% לעומת 16% בחרדה, עם ציוני SF-36 גופניים נמוכים יותר. בקרב 130 ילדים, החרדה הייתה גבוהה יותר מאשר בקבוצת הביקורת, אבל הדיכאון לא. הבדלים בשיעורי אבחנה והבדלים בציוני שאלונים עונים על שאלות שונות, ולכן המספרים נראים שונים כל כך. [[Lidor2021,Deger2011,Sonmez2020]]</p></div>
   <div class="card"><h4>רגליים, מדרגות וימים ארוכים</h4><p>כאב רגליים במאמץ שכיח, ולעיתים קרובות נחשב בטעות למשהו אחר: 22.1% מתוך 3,454 ילדים בקבוצת הילדים הגדולה ביותר, ועד 30.2% בקרב הומוזיגוטים ל־M694V. EULAR 2016 מציעה לו NSAIDs. מיאלגיה ממושכת עם חום, כלומר כאב שרירים קשה שנמשך 5 ימים או יותר עם חום וסמני דלקת מוגברים, הופיעה ב־1.6%; היא מגיבה לגלוקוקורטיקואידים, ו־NSAIDs או חסימת IL-1 הם אפשרויות נוספות. [[Ozturk2022,Ozen2016]]</p></div>
   <div class="card"><h4>מה נחשב גורם מעורר</h4><p>הגורמים המעוררים שדווחו כוללים לחץ גופני או רגשי, וסת, טראומה, קור, זיהום, צריכת שומן גבוהה, צום, חוסר שינה ועייפות. הסיכום הכן הוא שמאחורי הלחץ עומד מבנה המחקר החזק ביותר, קור ועמידה מדווחים לעיתים קרובות מאוד, ושני דברים שאנשים נוטים להימנע מהם, פעילות גופנית וארוחות שומניות, לא העלו את הסיכוי להתקף במחקר ה־case-crossover. במחקר של 882 המטופלים, הקור היה מובהק רק בנשאים של וריאנטים באקסון 10 ובהומוזיגוטים ל־M694V. [[Ozen2016,Yenokyan2012,Parlar2024,Karadag2013]]</p>
     <div class="pt"><b>במילים פשוטות</b>רשימות של גורמים מעוררים מגיעות בעיקר מכך ששואלים אנשים במה הבחינו. המחקר היחיד שהשווה כל אדם לעצמו מצא שללחץ יש השפעה, ולפעילות גופנית ולמזון שומני אין.</div></div>`;
  $('#lvOrg').innerHTML=`<p><b>היכן מטופלים מוצאים זה את זה.</b> FMF &amp; AID Global Association היא עמותה ללא כוונת רווח שמרכזה בציריך, התומכת באנשים עם FMF ועם מחלות אוטו-דלקתיות אחרות ברחבי העולם, ומפעילה קו סיוע, חומרי הסברה וסקר מטופלים בינלאומי. Autoinflammatory Alliance הוא ארגון צדקה אמריקאי מסוג 501(c)(3) שמקדם מודעות, אבחון וטיפול במחלות אוטו-דלקתיות. שני התיאורים לקוחים מרשומות המקורות המופיעות כאן, ולא מהדפים של הארגונים עצמם. מטופלים היו שותפים גם בכתיבת ההנחיות: נציג מטופלים אחד בוועדה של 2016, ושניים בוועדה של 2024. [[FMFAID,AutoinflammatoryAlliance,Ozen2016,Ozen2025]]</p>`;
};
