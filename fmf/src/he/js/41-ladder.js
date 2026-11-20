/* =============== 4.1 the treatment ladder =============== */
const LD_RUNGS=[
 {t:'אבחנה קלינית',s:'EULAR: קולכיצין מנקודה זו'},
 {t:'מינון התחלתי לפי גיל',s:'טווחי EULAR 2016, במנה אחת או מחולקת'},
 {t:'המינון המרבי הנסבל',s:'קודם היענות · CRP/SAA כל 3 חודשים'},
 {t:'עמידות או אי־סבילות',s:'ההגדרות, ומה הן דורשות'},
 {t:'הוספת חסימת IL-1',s:'הקולכיצין ממשיך לצידה'},
 {t:'אפשרויות אחרות',s:'ראיות חלשות יותר או שליליות'}
];
const LD_STEPS=[
 {from:0,at:.04,k:'שלב 1 · התחלה',t:'קולכיצין עם האבחנה הקלינית',
  txt:'המלצה 3 של EULAR 2016 קובעת שיש להתחיל קולכיצין מיד כשנקבעת אבחנה קלינית של FMF (רמת ראיות 1b). העדכון של 2024 משאיר זאת, ושתי הגרסאות מאפשרות לתת את הכמות היומית פעם ביום או לחלק אותה לאורך היום. סקירת Cochrane של 10 ניסויים אקראיים עם 312 משתתפים, והסקירה השיטתית מ־2025 שנכתבה לקראת העדכון, מצאו שמתן פעם ביום ומתן במנות מחולקות שקולים. [[Ozen2016,Ozen2025,RheumNow2025,Yin2022,Sag2025]]',
  pt:'הטיפול לא מחכה לבדיקה הגנטית. ברגע שהתמונה הקלינית מתאימה ל־FMF, ההנחיות שפורסמו מתחילות קולכיצין.',
  hook:'קולכיצין הוא <b>טיפול מונע</b>, שמתחילים על סמך התמונה הקלינית ונוטלים לכל החיים. הגנטיקה תומכת באבחנה; היא אינה תנאי לטיפול.'},
 {from:.16,at:.2,k:'שלב 2 · מינון',t:'מינוני ההתחלה של 2016 לפי גיל',
  txt:'המאמר מ־2016 נותן טווחי התחלה של עד 0.5 mg ביום מתחת לגיל 5, 0.5 עד 1.0 mg ביום בגילים 5 עד 10, ו־1.0 עד 1.5 mg ביום מעל גיל 10 ובמבוגרים. התקרות שנקבעו הן 2 mg ביום בילדים ו־3 mg ביום במבוגרים, והעדכון של 2024 שומר על אותן שתי תקרות. אלה נתונים שפורסמו, ומובאים כאן לצורך לימוד. המינון לכל אדם נקבע על ידי הרופא המטפל בו. [[Ozen2016,Ozen2025,RheumNow2025,Ozen2017]]',
  pt:'לפי ההנחיות שפורסמו, ילדים מתחילים במינון נמוך ומבוגרים במינון מעט גבוה יותר, ולכל קבוצה יש תקרה.',
  hook:'התקרות שכדאי לזכור: <b>2 mg/day בילדים, 3 mg/day במבוגרים</b>. טווח ההתחלה מעל גיל 10 הוא 1.0 עד 1.5 mg/day.'},
 {from:.32,at:.36,k:'שלב 3 · העלאה הדרגתית',t:'עד המינון המרבי הנסבל',
  txt:'אם התקפים או דלקת תת־קלינית נמשכים אצל מטופל שנוטל את הכדורים, הנחיית 2016 מעלה את המינון בצעדים של כ־0.5 mg ביום, ומבקשת CRP או SAA לפחות כל 3 חודשים בזמן העלאת המינון. הקביעות האלה על העלאת המינון עוסקות בהתקפים או בדלקת שנמשכים לאורך זמן, ולא בעצירת התקף שכבר התחיל. קודם בודקים היענות לטיפול, כי במרפאה ישראלית אחת רק 13% מהמטופלים מימשו כל מרשם לאורך שנה, והיענות נמוכה היא סיבה שכיחה לעמידות לכאורה. [[Ozen2016,Ozen2017,RheumNow2025,BenChetrit2009D]]',
  pt:'אם ההתקפים נמשכים, המינון עולה צעד אחר צעד. לפני כן, השאלה הראשונה היא אם הכדורים אכן נלקחים כל יום.',
  hook:'הסדר חשוב: <b>היענות ← מינון מרבי נסבל ← רק אז ״עמיד״</b>.'},
 {from:.48,at:.52,k:'שלב 4 · הגדרה',t:'עמידות, או אי־סבילות',
  txt:'EULAR 2016: מטופל שמקפיד על הטיפול וממשיך לחוות התקף אחד או יותר בחודש, למרות המינון המרבי הנסבל, במשך 6 חודשים לפחות, יכול להיחשב כמי שאינו מגיב. קונצנזוס Delphi מותאם מ־2021 מגדיר עמידות כהתקפים חוזרים בממוצע של אחד לפחות בחודש לאורך 3 חודשים, או דלקת מעבדתית מתמשכת בין התקפים, במינון המרבי הנסבל ועם היענות מאומתת. אי־סבילות היא מצב נפרד, שבו תופעות לוואי מונעות את העלאת המינון; כ־5 עד 10% עמידים, ועוד 2 עד 5% אינם סובלים את התרופה. [[Ozen2016,Ozen2021,Ozen2017,BenChetrit2018Textbook]]',
  pt:'״עמיד״ הוא תווית מוגדרת, לא תחושה. התווית דורשת מספר מינימלי של התקפים, משך זמן מינימלי, את המינון הנסבל הגבוה ביותר והוכחה שהכדורים נלקחו.',
  hook:'2016: <b>≥1 התקף בחודש במשך ≥6 חודשים במינון המרבי הנסבל</b>. Delphi 2021: <b>≥1 בחודש לאורך 3 חודשים, או דלקת מתמשכת בין התקפים</b>.'},
 {from:.64,at:.68,k:'שלב 5 · תוספת',t:'חסימת IL-1, והקולכיצין ממשיך',
  txt:'תרופות ביולוגיות מותוויות במחלה עמידה, והקולכיצין ממשיך לצידן, כי ייתכן שהוא עדיין מוריד את הסיכון לעמילואידוזיס. שלושת חוסמי IL-1 שנחקרו ב־FMF הם אנאקינרה (אנטגוניסט לקולטן של IL-1, ניתן מדי יום), קנאקינומאב (נוגדן נגד IL-1β, כל 4 שבועות) ורילונאספט (״מלכודת״ IL-1, שניתן פעם בשבוע בניסוי שלו). הם אינם ניתנים להחלפה זה בזה: קנאקינומאב הוא היחיד שמינון ל־FMF כתוב בעלון התרופה האמריקאי, ואילו הראיות לאנאקינרה ולרילונאספט ב־FMF נשענות על שני ניסויים אקראיים קטנים, של 25 ושל 14 מטופלים. העדכון של 2024 מציין את התרופות המכוונות ל־IL-1 כתוספת בעלת הראיות החזקות ביותר, ומוסיף קביעות על התאמת המינון של התרופה הביולוגית ועל הפחתה הדרגתית או הפסקה כשמושגת הפוגה. [[Ozen2016,Ozen2025,RheumNow2025,BenZvi2017,DeBenedetti2018,Hashkes2012,IlarisPI,Sag2025]]',
  pt:'אם ההתקפים ממשיכים במינון הגבוה ביותר, מוסיפים תרופה שחוסמת את האות של IL-1. הקולכיצין לא נפסק.',
  hook:'שלושה חוסמי IL-1, שלושה מקצבים: <b>אנאקינרה מדי יום, קנאקינומאב כל 4 שבועות, רילונאספט פעם בשבוע</b>. כולם תוספת ולא תחליף, והראיות שמאחוריהם אינן שוות.'},
 {from:.82,at:.9,k:'שלב 6 · מעבר לכך',t:'אפשרויות אחרות, ראיות חלשות יותר',
  txt:'טוסיליזומאב חוסם את הקולטן של IL-6. שני הניסויים האקראיים שלו נכשלו: ניסוי גרמני בשלב II עם 25 מטופלים לא עמד במדד התוצאה העיקרי, אף שרמת ה־SAA חזרה לתקין, וגם ניסוי יפני בשלב III לא עמד במדד התוצאה העיקרי (יחס שיעורים 0.691, P=0.577). שיעור ההתקפים החוזרים הנמוך יותר בניסוי הזה (HR 0.457) הוא ממצא משני בניסוי שלא עמד במדד העיקרי שלו, ולכן אף אחד משני הניסויים אינו מוכיח שטוסיליזומאב יעיל ב־FMF. מעכבי TNF שימשו בעיקר במטופלים עמידים לקולכיצין עם מעורבות מפרקים, ורק במחקרים תצפיתיים; דלקת פרקים כרונית פוגעת בכ־5% מהמטופלים, ועשויה לחייב DMARDs, הזרקות למפרק או תרופות ביולוגיות. לגבי מעכבי JAK יש רק סדרות מקרים של ארבעה מטופלים או פחות: ארבעה מטופלים שלא הגיבו לחסימת IL-1, לתרופות נגד TNF ולטוסיליזומאב השתפרו בטיפול בטופסיטיניב, ואין אף ניסוי אקראי של מעכב JAK כלשהו ב־FMF. אין מנגנון מבוסס שמקשר בין האיתות של JAK/STAT להפעלת האינפלמזום של פירין, שהתוצרים שלו הם IL-1β, IL-18 וגזדרמין D, ולכן כל תועלת תצטרך לפעול על הגברה בהמשך המסלול, ולא על הפגם של FMF עצמו. [[Henes2022,Koga2022,Mertz2025,Ozen2016,Karadeniz2020,Park2016]]',
  pt:'מעבר לחסימת IL-1 הראיות מידלדלות מהר: סוג תרופות אחד נכשל בשני הניסויים האקראיים שלו, לסוג אחר יש רק תמיכה ממחקרים תצפיתיים, ולשלישי יש רק קומץ מטופלים שדווחו.',
  hook:'טוסיליזומאב: <b>שני הניסויים האקראיים לא עמדו במדדי התוצאה העיקריים</b>; ה־SAA חזר לתקין בניסוי הגרמני. נגד TNF: מפרקים, מחקרים תצפיתיים. מעכבי JAK: <b>סדרות מקרים של ארבעה או פחות, ואין מנגנון במסלול הפירין</b>.'}
];
inits.ladder=()=>{
  const svg=$('#ldSvg'),rg=$('#ldT');
  const wrapT=(txt,n)=>{const ws=String(txt).split(' '),o=[];let l='';ws.forEach(w=>{if(l&&(l+' '+w).length>n){o.push(l);l=w}else l=l?l+' '+w:w});if(l)o.push(l);return o};
  /* each rung shows what it means: colchicine tablets whose count rises with the dose,
     an injection at the IL-1 rung, a dashed vial where the evidence thins out, and a
     colchicine thread that keeps running up alongside the biologic rungs */
  const LD_GLY=[{p:1},{p:2},{p:4},{p:4,atk:1},{syr:1},{vial:1}];
  const pill=(x,y,r)=>`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="fill:var(--crocus);stroke:var(--crocus);stroke-width:1.2"/><line x1="${f1(x-r*.5)}" x2="${f1(x+r*.5)}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:var(--panel);stroke-width:1.1;opacity:.75"/>`;
  const syringe=(x,y)=>`<g transform="translate(${f1(x)} ${f1(y)})"><line x1="0" x2="8" y1="0" y2="0" style="stroke:var(--sea);stroke-width:1.6"/><rect x="-24" y="-6.5" width="24" height="13" rx="2.5" style="fill:var(--sea-soft);stroke:var(--sea);stroke-width:1.6"/><rect x="-22.5" y="-4.5" width="11" height="9" rx="1.5" style="fill:var(--sea)"/><line x1="-30" x2="-24" y1="0" y2="0" style="stroke:var(--sea);stroke-width:1.6"/><line x1="-30" x2="-30" y1="-5" y2="5" style="stroke:var(--sea);stroke-width:2.2"/></g>`;
  const vial=(x,y)=>`<g transform="translate(${f1(x)} ${f1(y)})"><rect x="-17" y="-4" width="16" height="15" rx="2.5" style="fill:none;stroke:var(--warn);stroke-width:1.5;stroke-dasharray:3 3"/><rect x="-13.5" y="-10" width="9" height="6" rx="1.5" style="fill:none;stroke:var(--warn);stroke-width:1.4"/></g>`;
  const atk=(x,y)=>`<path d="M${f1(x-5)} ${f1(y+5)}L${f1(x)} ${f1(y-5)}L${f1(x+5)} ${f1(y+5)}z" style="fill:var(--terra)"/>`;
  function draw(t){
    const N=vb(svg,'720 430','400 772');
    const L=N
      ? {X0:24,X1:358,BX:38,BW:306,TX:52,RY0:360,P:58,BH:48,TY:-6,SY:14,GR:336,GP:13,TR:4.5,GY:-11,THX:288,CLX:372,
         PX:14,PY:410,PW:372,QX:14,QY:626,QW:372}
      : {X0:72,X1:404,BX:88,BW:310,TX:102,RY0:392,P:62,BH:40,TY:-3,SY:13,GR:392,GP:14,TR:5,GY:0,THX:336,CLX:420,
         PX:450,PY:40,PW:258,QX:450,QY:256,QW:258};
    const RY=i=>L.RY0-i*L.P;
    let s=`<defs>${marker('ldA','var(--sea)')}</defs>`;
    s+=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    const lit=LD_RUNGS.map((r,i)=>ease(ramp(t,LD_STEPS[i].from+.005,LD_STEPS[i].from+.085)));
    // rails
    const topY=RY(5)-L.BH/2-6,botY=RY(0)+L.BH/2+8;
    [L.X0,L.X1].forEach(x=>{s+=`<line x1="${x}" x2="${x}" y1="${botY}" y2="${topY}" style="stroke:var(--line);stroke-width:5;stroke-linecap:round"/>`;
      const h=(botY-topY)*clamp(lit.reduce((a,b)=>a+b,0)/6);
      s+=`<line x1="${x}" x2="${x}" y1="${botY}" y2="${f1(botY-h)}" style="stroke:var(--sea);stroke-width:5;stroke-linecap:round"/>`});
    s+=`<text x="${L.X0}" y="${topY-10}" class="t-sm" style="fill:var(--sea)">הסלמה ↑</text>`;
    // rungs
    LD_RUNGS.forEach((r,i)=>{const cy=RY(i),o=lit[i],g=LD_GLY[i],gy=cy+L.GY;
      s+=`<g class="clk" data-rung="${i}">`;
      s+=`<rect x="${L.BX}" y="${f1(cy-L.BH/2)}" width="${L.BW}" height="${L.BH}" rx="11" style="fill:${o>.5?'var(--sea-soft)':'var(--panel-2)'};stroke:${o>.5?'var(--sea)':'var(--line)'};stroke-width:${f1(1+1.4*o)}"/>`;
      s+=`<text x="${L.TX}" y="${f1(cy+L.TY)}" class="t-lbl" style="fill:${o>.5?'var(--sea)':'var(--muted)'}">${r.t}</text>`;
      s+=`<text x="${L.TX}" y="${f1(cy+L.SY)}" class="t-xs">${r.s}</text>`;
      s+=`<g style="opacity:${f1(.3+.7*o)}">`;
      if(g.p)for(let k=0;k<g.p;k++)s+=pill(L.GR-k*L.GP,gy,L.TR);
      if(g.atk)s+=atk(L.GR-1.5*L.GP,gy+L.TR+9);
      if(g.syr)s+=syringe(L.GR-8,gy);
      if(g.vial)s+=vial(L.GR+1,gy);
      s+='</g>';
      s+=`<circle cx="${L.X0}" cy="${cy}" r="13" style="fill:${o>.5?'var(--sea)':'var(--panel)'};stroke:${o>.5?'var(--sea)':'var(--line)'};stroke-width:2"/>`;
      s+=`<text x="${L.X0}" y="${cy+4}" class="t-xs t-mid" style="fill:${o>.5?'var(--on-sea)':'var(--muted)'};font-weight:700">${i+1}</text>`;
      s+='</g>'});
    // the colchicine thread: the tablets do not stop when the injection starts
    s+=`<g style="opacity:${f1(.25+.75*lit[4])}">`;
    s+=`<line x1="${L.THX}" x2="${L.THX}" y1="${f1(RY(3)-L.BH/2)}" y2="${f1(topY-4)}" style="stroke:var(--crocus);stroke-width:3;stroke-linecap:round;opacity:.6"/>`;
    [4,5].forEach(i=>{s+=pill(L.THX,RY(i),L.TR-.5)});
    s+=`<text x="${L.GR+5}" y="${f1(topY-10)}" class="t-xs t-end" style="fill:var(--crocus)">הקולכיצין ממשיך ↑</text>`;
    s+='</g>';
    // climber
    const pos=clamp((t-.04)/.86)*5, cyC=RY(0)-pos*L.P;
    s+=`<g transform="translate(${L.CLX} ${f1(cyC)})"><circle r="9" style="fill:var(--terra);opacity:.25"/><circle r="5" style="fill:var(--terra)"/></g>`;
    s+=N?`<text transform="rotate(90 ${L.CLX+16} ${f1(cyC)})" x="${L.CLX+16}" y="${f1(cyC)}" class="t-xs t-mid" style="fill:var(--terra)">אתם כאן</text>`
        :`<text x="${L.CLX+14}" y="${f1(cyC+4)}" class="t-xs" style="fill:var(--terra)">אתם כאן</text>`;
    // side lane: during an attack
    const o2=ease(ramp(t,.26,.44));
    s+=`<g style="opacity:${f1(.15+.85*o2)}"><rect x="${L.PX}" y="${L.PY}" width="${L.PW}" height="196" rx="12" style="fill:var(--panel);stroke:var(--terra);stroke-width:1.6"/>`;
    s+=`<text x="${L.PX+14}" y="${L.PY+22}" class="t-sm" style="fill:var(--terra)">${N?'בזמן התקף · מה אומרות 2016 ו־2024':'בזמן התקף · 2016 ו־2024'}</text>`;
    const lines=['להמשיך במינון הקולכיצין הרגיל','NSAIDs להקלה בתסמינים','תמיד לשקול סיבות אחרות,','למשל דלקת תוספתן'];
    lines.forEach((Ln,i)=>{const oo=ease(ramp(t,.28+i*.03,.36+i*.03));
      s+=`<text x="${L.PX+26}" y="${L.PY+48+i*20}" class="t-xs" style="opacity:${f1(oo)};fill:var(--ink)">${Ln}</text>`;
      if(i<3)s+=`<circle cx="${L.PX+16}" cy="${L.PY+44+i*20}" r="2.6" style="fill:var(--terra);opacity:${f1(oo)}"/>`});
    s+=`<line x1="${L.PX+14}" x2="${L.PX+L.PW-14}" y1="${L.PY+138}" y2="${L.PY+138}" class="grid"/>`;
    ['רק 2016: העלאת מינון בשלב הפרודרום','מדווחת אך לא הוכחה. בתקופות לחץ','אפשר לשקול העלאה.']
      .forEach((Ln,i)=>{s+=`<text x="${L.PX+14}" y="${L.PY+156+i*13}" class="t-xs">${Ln}</text>`});
    s+='</g>';
    // target box
    const o3=ease(ramp(t,.55,.72));
    s+=`<g style="opacity:${f1(.12+.88*o3)}"><rect x="${L.QX}" y="${L.QY}" width="${L.QW}" height="136" rx="12" style="fill:var(--sea-soft);stroke:var(--sea);stroke-width:1.6"/>`;
    s+=`<text x="${L.QX+14}" y="${L.QY+22}" class="t-sm" style="fill:var(--sea)">שתי המטרות</text>`;
    s+=`<text x="${L.QX+14}" y="${L.QY+46}" class="t-lbl">1 · ללא התקפים או מעט מאוד</text>`;
    s+=`<text x="${L.QX+14}" y="${L.QY+70}" class="t-lbl">2 · דלקת מבוקרת</text>`;
    s+=`<text x="${L.QX+14}" y="${L.QY+87}" class="t-xs">בין התקפים, לפי SAA או CRP</text>`;
    s+=`<text x="${L.QX+14}" y="${L.QY+112}" class="t-xs">עדכון 2024: שתי המטרות, כדי</text>`;
    s+=`<text x="${L.QX+14}" y="${L.QY+125}" class="t-xs">למנוע נזק לאורך החיים</text>`;
    s+='</g>';
    svg.innerHTML=s;
    const p=phaseOf(LD_STEPS,t);setSt(p);
    $('#ldNote').innerHTML=noteHTML(LD_STEPS[p]);
    $('#ldCap').textContent=`שלב ${p+1} מתוך 6 מואר. לחצו על שלב כלשהו כדי לעבור אליו. סכמטי, לא בקנה מידה.`;
  }
  const stop=playWire(rg,$('#ldPlay'),draw,17000,'הפעלה חוזרת','ladder');
  const setSt=stepWire($('#ldSteps'),LD_STEPS,rg,draw,stop);
  svg.addEventListener('click',e=>{const g=e.target.closest('[data-rung]');if(!g)return;stop();const a=LD_STEPS[+g.dataset.rung].at;rg.value=a;draw(a)});
  draw(+rg.value);

  /* ---- trial bars ---- */
  const bs=$('#ldBars'),br=$('#ldB');
  const LD_PCT=[
   {l:'CLUSTER',s2:'crFMF 150 mg',a:61,p:6},
   {l:'CLUSTER',s2:'MKD / HIDS',a:35,p:6},
   {l:'CLUSTER',s2:'TRAPS',a:45,p:8},
   {l:'מינון מוגבר',s2:'crFMF 300 mg',a:71,p:null},
   {l:'כל 8 שבועות',s2:'נשארו בשליטה',a:46,p:null}
  ];
  const LD_ATT=[
   {l:'ניסוי אנאקינרה',s2:'n=25, התקפים לחודש',a:1.7,p:3.5,ad:'1.7',pd:'3.5'},
   {l:'רילונאספט',s2:'n=14, חציון לחודש',a:0.77,p:2.00,ad:'0.77',pd:'2.00'}
  ];
  const LD_CAVA='63 מטופלי FMF, הוקצו באקראי בזמן התלקחות · מדד התוצאה: חלוף ההתלקחות בלי התלקחות חדשה עד שבוע 16';
  const LD_CAVB='לשתי העמודות האחרונות אין השוואה לפלצבו: העלאה ל־300 mg, ומתן מורחב כל 8 שבועות';
  const LD_COCH='ניתוח חוזר של Cochrane, ודאות בינונית: אין הבדל ברור במספר המטופלים שהיו להם התקפים באנאקינרה (RR 0.76, 0.54–1.07) או ברילונאספט (RR 0.87, 0.59–1.26). רק קנאקינומאב הגיע ל־RR 0.41 (0.26–0.65).';
  const LD_TOCI=[['שלב II (n=25): לא עמד במדד','ink'],['העיקרי, אבל ה־SAA חזר לתקין','ink'],['שלב III: גם הוא לא עמד (RR 0.691,',''],['P=0.577); לא הוכחה יעילות','']];
  /* narrow: the grouped vertical bars become horizontal bars, one trial per block,
     each trial's name on its own line above its bars, so nothing is squeezed */
  function drawBN(t){
    const BX0=14,BX1=316,pw=BX1-BX0;let s='';
    s+=`<text x="14" y="24" class="t-sm" style="fill:var(--sea)">קנאקינומאב ב־CLUSTER</text>`;
    s+=`<text x="14" y="38" class="t-xs">תגובה מלאה בשבוע 16 לעומת פלצבו</text>`;
    const pairsOf=g=>g.p==null?[[g.a,'var(--sea)','']]:[[g.p,'var(--muted)','פלצבו'],[g.a,'var(--sea)','תרופה']];
    const aTop=52, aH=LD_PCT.reduce((a,g)=>a+(g.p==null?44:62),0), aBot=aTop+aH-10;
    [0,25,50,75,100].forEach(v=>{const x=lerp(BX0,BX1,v/100);
      s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${aTop}" y2="${aBot}" class="grid"/><text x="${f1(x)}" y="${aBot+16}" class="t-xs t-mid">${v}%</text>`});
    let y=aTop;
    LD_PCT.forEach((g,i)=>{const k=ease(ramp(t,i*.1,i*.1+.42)),prs=pairsOf(g);
      s+=`<text x="14" y="${y+10}" class="t-xs" style="fill:var(--ink)">${g.l} · ${g.s2}</text>`;
      prs.forEach((pr,j)=>{const by=y+16+j*18,w=pw*pr[0]/100*k;
        s+=`<rect x="${BX0}" y="${by}" width="${f1(w)}" height="14" rx="3" style="fill:${pr[1]}"/>`;
        s+=`<text x="${f1(BX0+w+6)}" y="${by+11}" class="t-xs" style="fill:${pr[1]};font-weight:700;opacity:${f1(ramp(k,.6,1))}">${pr[0]}%${pr[2]?' '+pr[2]:''}</text>`});
      y+=prs.length>1?62:44});
    y=aBot+34;
    wrapT(LD_CAVA,58).concat(wrapT(LD_CAVB,58)).forEach(l=>{s+=`<text x="14" y="${y}" class="t-xs">${l}</text>`;y+=14});
    // panel B
    y+=12;
    s+=`<text x="14" y="${y}" class="t-sm" style="fill:var(--terra)">התקפים לחודש · נמוך יותר עדיף</text>`;y+=14;
    s+=`<text x="14" y="${y}" class="t-xs">כפי שכל ניסוי דיווח</text>`;y+=14;
    const bTop=y, bBot=bTop+LD_ATT.length*62-10;
    [0,1,2,3,4].forEach(v=>{const x=lerp(BX0,BX1,v/4);
      s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${bTop}" y2="${bBot}" class="grid"/><text x="${f1(x)}" y="${bBot+16}" class="t-xs t-mid">${v}</text>`});
    LD_ATT.forEach((g,i)=>{const k=ease(ramp(t,.4+i*.12,.86+i*.12)),yy=bTop+i*62;
      s+=`<text x="14" y="${yy+10}" class="t-xs" style="fill:var(--ink)">${g.l} · ${g.s2}</text>`;
      [[g.p,'var(--muted)',g.pd,'פלצבו'],[g.a,'var(--sea)',g.ad,'תרופה']].forEach((pr,j)=>{const by=yy+16+j*18,w=pw*pr[0]/4*k;
        s+=`<rect x="${BX0}" y="${by}" width="${f1(w)}" height="14" rx="3" style="fill:${pr[1]}"/>`;
        s+=`<text x="${f1(BX0+w+6)}" y="${by+11}" class="t-xs" style="fill:${pr[1]};font-weight:700;opacity:${f1(ramp(k,.6,1))}">${pr[2]} ${pr[3]}</text>`});});
    // tocilizumab box
    y=bBot+34;
    const o=ease(ramp(t,.75,1));
    s+=`<g style="opacity:${f1(.15+.85*o)}"><rect x="14" y="${y}" width="372" height="92" rx="11" style="fill:var(--panel);stroke:var(--warn);stroke-width:1.6"/>`;
    s+=`<text x="28" y="${y+22}" class="t-sm" style="fill:var(--warn)">טוסיליזומאב · הקולטן של IL-6</text>`;
    LD_TOCI.forEach((l,i)=>{s+=`<text x="28" y="${y+42+i*13+(i>1?5:0)}" class="t-xs"${l[1]?' style="fill:var(--ink)"':''}>${l[0]}</text>`});
    s+='</g>';
    // Cochrane caveat, on the face of the chart
    y+=108;
    s+=`<line x1="14" x2="386" y1="${y}" y2="${y}" class="grid"/>`;y+=18;
    wrapT(LD_COCH,58).forEach(l=>{s+=`<text x="14" y="${y}" class="t-xs" style="fill:var(--warn)">${l}</text>`;y+=14});
    return s;
  }
  function drawB(t){
    const N=vb(bs,'720 456','400 800');
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    if(N){bs.innerHTML=s+drawBN(t);return}
    // panel A
    const AX0=118,AX1=700,AY=206,ATOP=56,pc=v=>AY-(AY-ATOP)*v/100;
    s+=`<text x="14" y="34" class="t-sm" style="fill:var(--sea)">קנאקינומאב ב־CLUSTER · תגובה מלאה בשבוע 16 לעומת פלצבו</text>`;
    [0,25,50,75,100].forEach(v=>{s+=`<line x1="${AX0}" x2="${AX1}" y1="${f1(pc(v))}" y2="${f1(pc(v))}" class="grid"/><text x="${AX0-8}" y="${f1(pc(v)+3)}" class="t-xs t-end">${v}%</text>`});
    s+=`<line x1="${AX0}" x2="${AX1}" y1="${AY}" y2="${AY}" class="axis"/>`;
    const gw=(AX1-AX0)/LD_PCT.length;
    LD_PCT.forEach((g,i)=>{const cx=AX0+gw*(i+.5),k=ease(ramp(t,i*.1,i*.1+.42));
      const bw=28,pairs=g.p==null?[[g.a,'var(--sea)','']]:[[g.p,'var(--muted)','פלצבו'],[g.a,'var(--sea)','תרופה']];
      pairs.forEach((pr,j)=>{const n=pairs.length,x=cx-(n*bw+8*(n-1))/2+j*(bw+8),h=(AY-ATOP)*pr[0]/100*k;
        s+=`<rect x="${f1(x)}" y="${f1(AY-h)}" width="${bw}" height="${f1(h)}" rx="3" style="fill:${pr[1]}"/>`;
        s+=`<text x="${f1(x+bw/2)}" y="${f1(AY-h-6)}" class="t-xs t-mid" style="fill:${pr[1]};font-weight:700;opacity:${f1(ramp(k,.6,1))}">${pr[0]}%</text>`});
      s+=`<text x="${f1(cx)}" y="${AY+18}" class="t-xs t-mid" style="fill:var(--ink)">${g.l}</text>`;
      s+=`<text x="${f1(cx)}" y="${AY+31}" class="t-xs t-mid">${g.s2}</text>`});
    s+=`<text x="${AX0}" y="${AY+44}" class="t-xs">63 מטופלי FMF, הוקצו באקראי בזמן התלקחות · מדד התוצאה: חלוף ההתלקחות בלי התלקחות חדשה עד שבוע 16</text>`;
    s+=`<text x="${AX0}" y="${AY+56}" class="t-xs">לשתי העמודות האחרונות אין השוואה לפלצבו: העלאה ל־300 mg, ומתן מורחב כל 8 שבועות</text>`;
    // panel B
    const BX0=118,BX1=404,BY=372,BTOP=286,at=v=>BY-(BY-BTOP)*v/4;
    s+=`<text x="14" y="276" class="t-sm" style="fill:var(--terra)">התקפים לחודש · כפי שכל ניסוי דיווח (נמוך יותר עדיף)</text>`;
    [0,1,2,3,4].forEach(v=>{s+=`<line x1="${BX0}" x2="${BX1}" y1="${f1(at(v))}" y2="${f1(at(v))}" class="grid"/><text x="${BX0-8}" y="${f1(at(v)+3)}" class="t-xs t-end">${v}</text>`});
    s+=`<line x1="${BX0}" x2="${BX1}" y1="${BY}" y2="${BY}" class="axis"/>`;
    const gw2=(BX1-BX0)/LD_ATT.length;
    LD_ATT.forEach((g,i)=>{const cx=BX0+gw2*(i+.5),k=ease(ramp(t,.4+i*.12,.86+i*.12)),bw=30;
      [[g.p,'var(--muted)',g.pd],[g.a,'var(--sea)',g.ad]].forEach((pr,j)=>{const x=cx-(2*bw+8)/2+j*(bw+8),h=(BY-BTOP)*pr[0]/4*k;
        s+=`<rect x="${f1(x)}" y="${f1(BY-h)}" width="${bw}" height="${f1(h)}" rx="3" style="fill:${pr[1]}"/>`;
        s+=`<text x="${f1(x+bw/2)}" y="${f1(BY-h-6)}" class="t-xs t-mid" style="fill:${pr[1]};font-weight:700;opacity:${f1(ramp(k,.6,1))}">${pr[2]}</text>`});
      s+=`<text x="${f1(cx)}" y="${BY+18}" class="t-xs t-mid" style="fill:var(--ink)">${g.l}</text>`;
      s+=`<text x="${f1(cx)}" y="${BY+31}" class="t-xs t-mid">${g.s2}</text>`});
    // tocilizumab box
    const o=ease(ramp(t,.75,1));
    s+=`<g style="opacity:${f1(.15+.85*o)}"><rect x="440" y="282" width="268" height="104" rx="11" style="fill:var(--panel);stroke:var(--warn);stroke-width:1.6"/>`;
    s+=`<text x="454" y="304" class="t-sm" style="fill:var(--warn)">טוסיליזומאב · הקולטן של IL-6</text>`;
    s+=`<text x="454" y="326" class="t-xs" style="fill:var(--ink)">שלב II (n=25): לא עמד במדד</text>`;
    s+=`<text x="454" y="339" class="t-xs" style="fill:var(--ink)">העיקרי, אבל ה־SAA חזר לתקין</text>`;
    s+=`<text x="454" y="357" class="t-xs">שלב III: גם הוא לא עמד (RR 0.691,</text>`;
    s+=`<text x="454" y="370" class="t-xs">P=0.577); לא הוכחה יעילות</text>`;
    s+='</g>';
    // Cochrane caveat, on the face of the chart
    s+=`<line x1="14" x2="706" y1="412" y2="412" class="grid"/>`;
    s+=`<text x="14" y="430" class="t-xs" style="fill:var(--warn)">ניתוח חוזר של Cochrane, ודאות בינונית: אין הבדל ברור במספר המטופלים שהיו להם התקפים</text>`;
    s+=`<text x="14" y="444" class="t-xs" style="fill:var(--warn)">באנאקינרה (RR 0.76, 0.54–1.07) או ברילונאספט (RR 0.87, 0.59–1.26). רק קנאקינומאב הגיע ל־RR 0.41 (0.26–0.65).</text>`;
    bs.innerHTML=s;
  }
  playWire(br,$('#ldBPlay'),drawB,9000,'הפעלה חוזרת','ladder');drawB(+br.value);

  $('#ldCards').innerHTML=`
   <div class="card"><h4>2016 לעומת העדכון של 2024</h4><ul>
     <li>פחות קביעות, מאוחדות יותר: <b>12 המלצות במקום 18</b>, ועוד 4 עקרונות־על, עם הסכמה של יותר מ־9/10 על כל קביעה.</li>
     <li>משקל רב יותר ל<b>היענות לטיפול</b>, שעומדת בלב הטיפול המונע לכל החיים.</li>
     <li>קביעה חדשה על <b>מנת יתר של קולכיצין</b>, מכוונת או בשוגג, שעלולה להיות קטלנית ויש להעריך אותה בזהירות.</li>
     <li>קביעות חדשות על <b>התאמת המינונים של התרופות הביולוגיות והפחתתם ההדרגתית</b> לאחר השגת הפוגה.</li>
     <li><b>מערך תוצאות מינימלי</b>: תדירות ההתקפים לכל 3 חודשים, הערכת רופא, מדדי תוצאה וחוויה המדווחים על ידי המטופל, ו־CRP או SAA, וכן מדדי איכות.</li>
     <li>לא נקבע מרווח קבוע למעקב; יש לעקוב בתדירות גבוהה יותר בזמן האבחנה וכשהמחלה אינה מאוזנת. [[Ozen2025,RheumNow2025,Ozen2016]]</li></ul></div>
   <div class="card"><h4>איך נבנה CLUSTER</h4><p>ניסוי אקראי בשלב 3 שבחן שלוש מחלות בבת אחת: FMF עמיד לקולכיצין, חסר במבלונאט קינאז (MKD) ו־TRAPS. המטופלים הוקצו באקראי, בזמן התלקחות, לקנאקינומאב 150 mg בהזרקה תת־עורית כל 4 שבועות או לפלצבו. מדד התוצאה העיקרי היה חלוף ההתלקחות הזו בלי התלקחות חדשה עד שבוע 16. בקבוצת ה־FMF היו 63 משתתפים. הרחבה פתוחה (open-label) של 72 שבועות הראתה שליטה מתמשכת בהתלקחויות, עם CRP ו־SAA שחזרו לתקין. זהו דיכוי עמיד ולא ריפוי: ההתקפים חוזרים כשהתרופה מופסקת. [[DeBenedetti2018,Yin2022,Ozen2020]]</p></div>
   <div class="card"><h4>המינון בעלון של קנאקינומאב</h4><p>עלון התרופה האמריקאי מציין 150 mg כל 4 שבועות למטופלי FMF במשקל מעל 40 kg, או 2 mg/kg במשקל 40 kg ומטה, עם אפשרות להעלות ל־300 mg (4 mg/kg) אם התגובה אינה מספקת. ב־CLUSTER, 71% מהמטופלים עם FMF עמיד לקולכיצין הגיבו ל־300 mg כל 4 שבועות, ו־46% נשארו בשליטה כשהמרווח בין המנות הוארך לכל 8 שבועות. הנתונים מובאים כאן כנתוני עלון וניסוי שפורסמו, לא כמינון לאדם כלשהו: המינון לכל אדם נקבע על ידי הרופא המטפל בו. [[IlarisPI,DeBenedetti2018]]</p></div>
   <div class="card"><h4>הקולכיצין לא נפסק</h4><p>כשמוסיפים תרופה ביולוגית, ההנחיות ממשיכות את הקולכיצין לצידה, כי לקולכיצין יש את נתוני התוצאה הקשים לטווח ארוך על מניעת עמילואידוזיס מסוג AA: שיעור מצטבר של חלבון בשתן (פרוטאינוריה) של 1.7% אחרי 11 שנים במטופלים שהקפידו על הטיפול, לעומת 48.9% אחרי 9 שנים במי שלא הקפידו, בקרב 1,070 מטופלים. חוסמי IL-1 שולטים בהתקפים ובסמני השלב החריף; אין להם נתוני תוצאה דומים על עמילואיד לאורך עשורים. [[Ozen2016,Zemer1986,Sag2025]]</p>
     <div class="pt"><b>במילים פשוטות</b>הזריקה החדשה מתווספת לכדור הישן. היא לא מחליפה אותו.</div></div>
   <div class="card"><span class="ev early">בדיקת ראיות</span><h4>מה הסיקה סקירת Cochrane</h4><p>בניתוח חוזר של הניסויים האקראיים, Cochrane דירגה את הראיות לכל חוסם IL-1 כוודאות בינונית. קנאקינומאב הפחית את מספר המטופלים שהיו להם התקפים (RR 0.41, רווח סמך 95% 0.26–0.65, 63 משתתפים). באנאקינרה (RR 0.76, 0.54–1.07) וברילונאספט (RR 0.87, 0.59–1.26) רווחי הסמך חצו את 1, ולכן במדד הזה הסקירה לא מצאה הבדל ברור מפלצבו, אף שאנאקינרה כן הורידה את ה־CRP. הניסויים עצמם עדיין דיווחו על פחות התקפים תחת התרופה; העמודות למעלה הן נתוני הניסויים האלה, והניתוח החוזר הזה הוא הקריאה הזהירה יותר של אותם נתונים. הניסויים קטנים, והסוקרים ביקשו מחקרים נוספים. [[Yin2022]]</p></div>
   <div class="card"><h4>אי־סבילות אינה עמידות</h4><p>עמידות פירושה שהתקפים או דלקת נמשכים במינון המרבי הנסבל. אי־סבילות פירושה שתופעות לוואי, לרוב שלשולים ותסמינים אחרים של מערכת העיכול, מונעות מהמינון להגיע לנקודה הזו. כ־5 עד 10% מהמטופלים מתוארים כעמידים, ועוד 2 עד 5% כבעלי אי־סבילות; שתי הקבוצות הן האוכלוסייה שכל ניסוי בתרופה ביולוגית מגייס. [[Ozen2021,Ozen2017,BenChetrit2018Textbook]]</p></div>
   <div class="card"><h4>מה כל ניסוי ספר כהצלחה</h4><p>ניסויים שונים השתמשו בקני מידה שונים, ולכן אי אפשר להשוות את העמודות למעלה בין קבוצות. CLUSTER השתמש בתגובה מלאה בשבוע 16. ניסוי האנאקינרה ספר התקפים לחודש (1.7 לעומת 3.5, P=0.037) וכמה מטופלים ירדו מתחת להתקף אחד בחודש (6 מתוך 12 לעומת 0 מתוך 13). ניסוי הרילונאספט השווה את שיעורי ההתקפים החציוניים אצל אותם מטופלים, עם התרופה ובלעדיה (0.77 לעומת 2.00, P=0.027), ו־29% לעומת 0% ממחזורי הטיפול עברו ללא התקפים. סקירה שיטתית מ־2025 של 42 מחקרים ו־1,798 מטופלים, כולל 6 ניסויים אקראיים של חוסמי IL-1, הסיקה שהם יעילים ובטוחים יחסית ב־FMF שאינו מגיב לקולכיצין. [[DeBenedetti2018,BenZvi2017,Hashkes2012,Hashkes2014,Sag2025]]</p></div>`;
};
