/* =============== 4.2 living with dementia and caregiving =============== */
const LV_STEPS=[
 {from:0,at:.1,k:'1 מתוך 7 · אחרי האבחנה',t:'לדעת על האבחנה',
  txt:`בסקירה של 23 מחקרים (9,065 משיבים), 90.7% מהאנשים ללא בעיות זיכרון ו־84.8% מהאנשים שהופנו למרפאות זיכרון או שכבר אובחנו אמרו שהיו רוצים שיספרו להם על אבחנה של דמנציה. הסיבות העיקריות היו אוטונומיה והאפשרות לתכנן. [[vandenDungen2014]] בשלב המוקדם נפוץ קושי לזכור שיחות, שמות או אירועים מהזמן האחרון, ולעיתים קרובות יש גם אדישות או מצב רוח ירוד. [[AA2025Facts]]`,
  pt:'רוב האנשים אומרים שהיו רוצים לדעת. ידיעה מוקדמת משאירה לאדם זמן לקבל את ההחלטות בעצמו, כל עוד הוא עדיין יכול להוביל אותן.',
  hook:'כ־9 מתוך 10 אנשים אומרים שהיו רוצים שיספרו להם על אבחנה של דמנציה. הסיבות: אוטונומיה ותכנון.'},
 {from:1/7,at:1/7+.1,k:'2 מתוך 7 · תכנון מראש',t:'תוכניות משפטיות וכספיות',
  txt:`הנחיית NICE NG97 ממליצה להציע הזדמנויות מוקדמות ומתמשכות לתכנון מראש: ייפוי כוח מתמשך (לענייני בריאות ורווחה, ולענייני רכוש וכספים), הצהרות מקדימות, החלטות מקדימות לסירוב לטיפול, והעדפות לגבי מקום הטיפול ומקום המוות. היא מונה גם מידע על זכויות משפטיות, כולל התאמות סבירות בעבודה. [[NICE2018]] קשיים כספיים יכולים להופיע עוד לפני האבחנה: אנשים שאובחנו מאוחר יותר עם דמנציה החמיצו תשלומי אשראי לעיתים קרובות יותר, כבר 6 שנים לפני האבחנה (7.7% לעומת 7.3%). [[Nicholas2021]]`,
  pt:'הכי קל להכין תוכניות משפטיות וכספיות מוקדם, כשהאדם עוד יכול לומר מה רצונו. חשבונות שלא שולמו בלי הסבר יכולים להיות סימן מוקדם לשינוי.',
  hook:'NICE NG97: להציע תכנון טיפול מקדים מוקדם ולחזור אליו. ייפוי כוח מתמשך (lasting power of attorney) הוא משני סוגים: לענייני בריאות ורווחה, ולענייני רכוש וכספים.'},
 {from:2/7,at:2/7+.1,k:'3 מתוך 7 · נהיגה',t:'נהיגה ומבחן הדרכים',
  txt:`מטא־אנליזה מ־2017 מצאה שהסיכוי של אנשים עם דמנציה להיכשל במבחן נהיגה מעשי בכביש גבוה בהרבה מזה של אנשים בריאים בקבוצת הביקורת (סיכון יחסי 10.77, רווח סמך 95% 3.00 עד 38.62). הנתונים על תאונות בפועל לא היו חד־משמעיים: מחקר אחד מצא פי 4 יותר תאונות, ומחקר אחר לא מצא עלייה מובהקת. [[Chee2017]] האקדמיה האמריקאית לנוירולוגיה (AAN) מצאה שסולם Clinical Dementia Rating מועיל לזיהוי סיכון גבוה יותר (רמה A), וכך גם הערכה של המטפל שהנהיגה גבולית או לא בטוחה (רמה B). ההערכה של הנהג עצמו שהוא נוהג בבטחה לא הייתה מועילה. [[Iverson2010]] בבריטניה, לפי NICE על אנשי המקצוע להסביר שהאדם חייב לדווח על האבחנה ל־DVLA ולחברת ביטוח הרכב שלו. [[NICE2018]]`,
  pt:'במבחן דרכים, נהגים עם דמנציה נכשלים הרבה יותר. מחקרים על תאונות בפועל חלוקים. דעתו של בן משפחה על הנהיגה לימדה את החוקרים יותר מדעתו של הנהג עצמו.',
  hook:'פרמטר הנהיגה של AAN מ־2010: CDR הוא מנבא ברמה A, הערכת המטפל שהנהיגה גבולית או לא בטוחה מנבאת ברמה B, והערכה עצמית של הנהג אינה מועילה.'},
 {from:3/7,at:3/7+.1,k:'4 מתוך 7 · בטיחות בבית ונפילות',t:'בטיחות בבית',
  txt:`במחקר שנמשך 12 חודשים, אנשים עם דמנציה נפלו כמעט פי 8 יותר מאנשים בקבוצת הביקורת (9,118 לעומת 1,023 נפילות ל־1,000 שנות אדם). הפרעות של גופיפי לואי, נפילות קודמות, סחרחורת בעמידה, תסמינים אוטונומיים אחרים ודיכאון ניבאו נפילות; פעילות גופנית הייתה גורם מגן. [[Allan2009]] בניסוי COPE (237 משפחות), הדרכה בבטיחות בבית, בפישוט משימות ובהפחתת לחץ הפחיתה את התלות התפקודית אחרי 4 חודשים, אבל ההבדל נעלם עד 9 חודשים. [[Gitlin2010]] בניסוי ATTILA (495 משתתפים), חבילה מלאה של טכנולוגיה מסייעת וניטור מרחוק לא דחתה באופן מובהק את המעבר למסגרת טיפול בהשוואה לחבילה בסיסית. [[Gathercole2021]] לא נמצא מחקר חזק שבדק התאמות בבית לבדן. ככל שהמחלה מתקדמת, נדרשת עזרה בפעולות יומיום בסיסיות כמו התלבשות ורחצה. [[Jack2024,Reisberg1988]]`,
  pt:'נפילות שכיחות הרבה יותר בדמנציה. הדרכה של בני המשפחה עזרה לכמה חודשים. בניסוי הגדול ביותר, אמצעים טכנולוגיים נוספים לבדם לא אפשרו לאנשים להישאר בבית זמן רב יותר.',
  hook:'נפילות בדמנציה: בערך פי 8 מהשיעור בקבוצת הביקורת (Allan 2009). התועלת של COPE לאדם עצמו דעכה עד 9 חודשים.'},
 {from:4/7,at:4/7+.1,k:'5 מתוך 7 · הליכה לאיבוד',t:'הליכה לאיבוד',
  txt:`לפי הערכת Alzheimer's Association, 35% עד 60% מהאנשים עם דמנציה ישוטטו ויתרחקו לפחות פעם אחת. הטווח הזה לקוח מדפי אינטרנט של ארגוני סנגור ושל NCOA ולא ממחקר אפידמיולוגי, ולכן הוא משוער. [[AA2025Facts]] בנתוני משטרה מבריטניה, הליכה לאיבוד פגעה ב־0.5% מהאנשים עם דמנציה באזור במשך 4 שנים; 5% מהאירועים כללו פגיעה משמעותית, לעיתים קרובות יותר בחורף וכשההיעדרות נמשכה זמן רב יותר. [[BantryWhite2015]] מתוך 156 נהגים עם דמנציה שנעדרו בפלורידה, 5% מתו, 15% נמצאו במצבים מסוכנים ו־10% נמצאו במדינה אחרת. [[Rowe2012]] רוב אירועי ההיעדרות התחילו במהלך פעילות רגילה ומותרת, והאנשים שמתו נמצאו קרוב יותר למקום שבו נראו לאחרונה. [[Rowe2011]]`,
  pt:'הליכה לאיבוד מתחילה בדרך כלל בהליכה או בנסיעה רגילה. במחקר אחד, האנשים שמתו נמצאו קרוב יותר למקום שבו נראו לאחרונה.',
  hook:'חוקרים מבחינים בין ״אירועי היעדרות״ (missing incidents) לבין ״שיטוט״ (wandering): רוב אירועי ההיעדרות מתחילים בפעילות רגילה ותכליתית (Rowe 2011).'},
 {from:5/7,at:5/7+.1,k:'6 מתוך 7 · מעבר מסגרת',t:'מעברים בין מסגרות טיפול',
  txt:`כ־65% מהמבוגרים בארה״ב שחיים עם דמנציה גרים בקהילה, לעומת 98% מאלה שאין להם דמנציה; מבין הגרים בקהילה, 26% גרים לבד. ל־46% מדיירי המוסדות הסיעודיים יש דמנציה (58% מהדיירים לטווח ארוך). כשני שלישים מהאנשים שמתים מדמנציה מתים במוסד סיעודי, לעומת 20% מהאנשים עם סרטן. [[AA2025Facts]] NICE ממליצה לבחון מחדש את צורכי האדם ואת תוכניות הטיפול המקדימות אחרי כל מעבר, כולל מעבר למוסד סיעודי או להפוגה. [[NICE2018]] בשלב הזה אנשים רבים זקוקים לעזרה ברוב פעולות היומיום הבסיסיות. [[Jack2024]]`,
  pt:'רוב האנשים גרים בבית במשך חלק גדול מהמחלה, אבל רבים עוברים בהמשך למסגרת טיפול. כל מעבר הוא הזדמנות לעבור שוב על התוכניות.',
  hook:'NICE NG97: לבחון מחדש את הצרכים ואת תוכניות הטיפול המקדימות אחרי כל מעבר בין מסגרות טיפול.'},
 {from:6/7,at:6/7+.1,k:'7 מתוך 7 · סוף החיים',t:'דמנציה מתקדמת ונוחות',
  txt:`במחקר CASCADE עקבו במשך 18 חודשים אחר 323 דיירי מוסדות סיעודיים עם דמנציה מתקדמת. 54.8% מתו; ל־85.8% היו קשיי אכילה, ל־52.6% אירוע של חום ול־41.1% דלקת ריאות. התמותה בתוך שישה חודשים אחרי דלקת ריאות הייתה 46.7%. ל־40.7% הייתה לפחות התערבות מכבידה אחת ב־3 החודשים האחרונים לחייהם. כשבן המשפחה שייצג את האדם הבין את הפרוגנוזה ואת הסיבוכים הצפויים, הסיכוי להתערבויות כאלה היה נמוך בהרבה (יחס סיכויים מתוקנן 0.12). [[Mitchell2009NEJM]] האגודה האמריקאית לגריאטריה (AGS) אינה ממליצה על הזנה בזונדה בדמנציה מתקדמת; האכלה זהירה ביד נחשבת טובה לא פחות מבחינת תמותה, דלקת ריאות משאיפה, תפקוד ונוחות. [[AGS2014]] סקירת Cochrane לא מצאה ראיות לכך שהזנה בזונדה משפרת הישרדות, איכות חיים או מצב תזונתי. [[Davies2021]] NICE ממליצה על טיפול פליאטיבי מרגע האבחנה, וקובעת שאין להשתמש בהזנה בזונדה באופן שגרתי בדמנציה קשה. [[NICE2018]]`,
  pt:'בשלב האחרון, קשיי אכילה וזיהומים הם חלק צפוי מהמחלה, ולא כישלון פתאומי של הטיפול. דיירים שבני משפחתם הבינו זאת מראש עברו הרבה פחות טיפולים מכבידים בסגנון בית חולים.',
  hook:'CASCADE: קשיי אכילה (85.8%) היו הסיבוך השכיח ביותר בדמנציה מתקדמת. AGS 2014: הזנה בזונדה אינה מומלצת; האכלה זהירה ביד היא החלופה.'}
];
const LV_NAMES=['אבחנה','תכנון','נהיגה','בטיחות בבית','הליכה לאיבוד','מעבר מסגרת','סוף החיים'];
const LV_CHG=['זיכרון לאירועים אחרונים, אדישות, מצב רוח ירוד','משימות מורכבות כמו ניהול כסף נעשות קשות','בלבול, שיקול דעת פגוע','עזרה בהתלבשות וברחצה','בלבול, שינויים בהתנהגות','עזרה ברוב פעולות היומיום הבסיסיות','הליכה, דיבור ובליעה'];
/* figure panel for each point: bars (max), a checklist, or a range */
const LV_FIG=[
 {t:'היו רוצים לדעת על האבחנה',max:100,foot:'סקירה של 23 מחקרים, 9,065 משיבים',
  it:[{l:'אנשים ללא בעיות זיכרון',v:90.7,s:'90.7%'},{l:'במרפאות זיכרון או אחרי אבחנה',v:84.8,s:'84.8%'}]},
 {t:'נושאי התכנון ש־NICE מונה',check:['ייפוי כוח מתמשך: בריאות ורווחה','ייפוי כוח מתמשך: רכוש וכספים','הצהרות מקדימות','החלטה מקדימה לסירוב לטיפול','המקום המועדף לטיפול ולמוות','זכויות בעבודה, כולל התאמות סבירות'],
  foot:'תשלומים שהוחמצו מתרבים עד 6 שנים לפני האבחנה'},
 {t:'בהשוואה לנהגים ללא דמנציה',max:11,foot:'מטא־אנליזה מ־2017: נתוני התאונות לא חד־משמעיים',
  it:[{l:'כישלון במבחן נהיגה מעשי',v:10.77,s:'פי 10.8 בערך',c:'var(--rose)'},{l:'תאונות, מחקר אחד',v:4,s:'פי 4',c:'var(--amber)'},{l:'תאונות, מחקר אחר',v:1,s:'ללא עלייה ברורה',c:'var(--amber)'}]},
 {t:'נפילות ל־1,000 שנות אדם',max:9118,foot:'כמעט פי 8 יותר נפילות, יחס של 7.58',
  it:[{l:'אנשים עם דמנציה',v:9118,s:'9,118',c:'var(--rose)'},{l:'קבוצת ביקורת ללא דמנציה',v:1023,s:'1,023'}]},
 {t:'הליכה לאיבוד',max:60,foot:'נהגים: 156 מקרי Silver Alert בפלורידה',
  it:[{l:'ישוטטו לפחות פעם אחת (הערכת ארגוני סנגור)',range:[35,60],s:'35–60%',c:'var(--amber)'},{l:'נהגים שנעדרו: נמצאו בסכנה',v:15,s:'15%',c:'var(--rose)'},{l:'נהגים שנעדרו: נמצאו במדינה אחרת',v:10,s:'10%',c:'var(--rose)'},{l:'נהגים שנעדרו: מתו',v:5,s:'5%',c:'var(--rose)'}]},
 {t:'היכן אנשים גרים ומתים (ארה״ב)',max:100,foot:'ל־46% מדיירי המוסדות הסיעודיים יש דמנציה',
  it:[{l:'גרים בקהילה: עם דמנציה',v:65,s:'65%'},{l:'גרים בקהילה: ללא דמנציה',v:98,s:'98%',c:'var(--muted)'},{l:'מתים במוסד סיעודי: דמנציה',v:66.7,s:'כ־2 מתוך 3',c:'var(--rose)'},{l:'מתים במוסד סיעודי: סרטן',v:20,s:'20%',c:'var(--muted)'}]},
 {t:'דמנציה מתקדמת במוסדות סיעודיים, 18 חודשים',max:100,foot:'הזנה בזונדה: לא מומלצת בדמנציה מתקדמת (AGS)',
  it:[{l:'קשיי אכילה',v:85.8,s:'85.8%',c:'var(--rose)'},{l:'אירועי חום',v:52.6,s:'52.6%',c:'var(--amber)'},{l:'דלקת ריאות',v:41.1,s:'41.1%',c:'var(--amber)'},{l:'מתו במהלך 18 החודשים',v:54.8,s:'54.8%',c:'var(--muted)'}]}
];
const lvPerson=(x,y,c='var(--sage)',f='var(--sage-soft)')=>`<circle cx="${f1(x)}" cy="${f1(y-28)}" r="10" style="fill:${f};stroke:${c};stroke-width:2"/><path d="M${f1(x-16)} ${f1(y+14)} v-14 q0 -14 16 -14 q16 0 16 14 v14 z" style="fill:${f};stroke:${c};stroke-width:2"/>`;
function lvFig(F,x,y,w,u){
  let s=`<text x="${x}" y="${y}" class="t-lbl">\u2067${F.t}\u2069</text>`;let yy=y+30;
  if(F.check){const n=F.check.length;
    F.check.forEach((c,i)=>{const k=ease(ramp(u,.06+i*.45/n,.3+i*.45/n));
      s+=`<rect x="${x}" y="${yy-12}" width="15" height="15" rx="3" style="fill:var(--panel);stroke:var(--sage);stroke-width:1.5"/>`;
      if(k>0)s+=`<path d="M${x+3} ${yy-5} l4 4 l6 -9" pathLength="1" style="fill:none;stroke:var(--sage);stroke-width:2.4;stroke-linecap:round;stroke-dasharray:1;stroke-dashoffset:${f1(1-k)}"/>`;
      s+=`<text x="${x+24}" y="${yy}" class="t-sm" style="fill:var(--ink);opacity:${f1(.35+.65*k)}">\u2067${c}\u2069</text>`;yy+=25});
  }else{const n=F.it.length,bw=w-112;
    F.it.forEach((it,i)=>{const k=ease(ramp(u,.06+i*.45/n,.3+i*.45/n)),c=it.c||'var(--sage)';
      s+=`<text x="${x}" y="${yy}" class="t-sm" style="fill:var(--ink)">\u2067${it.l}\u2069</text>`;
      s+=`<rect x="${x}" y="${yy+6}" width="${f1(bw)}" height="14" rx="4" style="fill:var(--panel-2)"/>`;
      let end;
      if(it.range){const a=x+bw*it.range[0]/F.max,b=x+bw*it.range[1]/F.max;end=lerp(a,b,k);
        s+=`<rect x="${f1(a)}" y="${yy+6}" width="${f1(Math.max(0,end-a))}" height="14" rx="4" style="fill:${c};opacity:.45;stroke:${c};stroke-width:1.5;stroke-dasharray:4 3"/>`;
      }else{end=x+bw*it.v/F.max*k;s+=`<rect x="${x}" y="${yy+6}" width="${f1(Math.max(0,end-x))}" height="14" rx="4" style="fill:${c}"/>`}
      s+=`<text x="${f1(end+6)}" y="${yy+18}" class="t-lbl" style="opacity:${f1(k)}">${it.s}</text>`;yy+=40});
  }
  if(F.foot)s+=`<text x="${x}" y="${yy+(F.check?6:0)}" class="t-xs" style="opacity:${f1(ramp(u,.5,.7))}">\u2067${F.foot}\u2069</text>`;
  return s}
/* one small scene per point, drawn around (cx,cy) inside about 220 x 190 */
function lvScene(i,u,cx,cy){let s='';
  if(i===0){ // a conversation at a table
    s+=`<rect x="${cx-46}" y="${cy+18}" width="92" height="8" rx="3" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.2"/><path d="M${cx-34} ${cy+26}v44M${cx+34} ${cy+26}v44" style="stroke:var(--muted);stroke-width:2"/>`;
    s+=lvPerson(cx-72,cy+40)+lvPerson(cx-112,cy+52,'var(--sage)','var(--panel)')+lvPerson(cx+74,cy+40,'var(--sky)','var(--sky-soft)');
    const left=u<.5,bx=left?cx-92:cx+8,k=left?ramp(u,.05,.4):ramp(u,.55,.9);
    s+=`<g style="opacity:${f1(Math.min(1,k*3))}"><rect x="${bx}" y="${cy-84}" width="84" height="38" rx="14" style="fill:var(--panel);stroke:${left?'var(--sage)':'var(--sky)'};stroke-width:1.6"/><path d="M${left?bx+22:bx+60} ${cy-46} l${left?-6:6} 14 l${left?12:-12} -14" style="fill:var(--panel);stroke:${left?'var(--sage)':'var(--sky)'};stroke-width:1.6"/>`;
    for(let d=0;d<3;d++)if(k>d*.3)s+=`<circle cx="${bx+26+d*16}" cy="${cy-65}" r="4" style="fill:${left?'var(--sage)':'var(--sky)'}"/>`;
    s+=`</g><text x="${cx-112}" y="${cy+84}" class="t-xs t-mid">משפחה</text>`;
  }else if(i===1){ // a plan being signed
    s+=`<rect x="${cx-62}" y="${cy-86}" width="124" height="160" rx="6" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.5"/>`;
    for(let l=0;l<6;l++){const k=ramp(u,.06+l*.075,.3+l*.075);s+=`<path d="M${cx-46} ${cy-62+l*18} h${f1(70*(.4+.6*k))}" style="stroke:var(--line);stroke-width:5;stroke-linecap:round"/><circle cx="${cx+40}" cy="${cy-62+l*18}" r="4" style="fill:${k>.95?'var(--sage)':'var(--panel-2)'}"/>`}
    const sg=ramp(u,.55,.95);
    s+=`<path d="M${cx-44} ${cy+54} c10 -18 16 8 26 -6 s10 -14 18 0 s12 10 22 -4 s8 -6 18 4" pathLength="1" style="fill:none;stroke:var(--sky);stroke-width:2.4;stroke-linecap:round;stroke-dasharray:1;stroke-dashoffset:${f1(1-sg)}"/><path d="M${cx-48} ${cy+62}h96" style="stroke:var(--muted);stroke-width:1"/>`;
  }else if(i===2){ // a car on a test route
    s+=`<rect x="${cx-108}" y="${cy+16}" width="216" height="44" rx="6" style="fill:var(--panel-2)"/>`;
    for(let k=0;k<7;k++){const x=cx-108+((k*40-u*200)%280+280)%280;if(x<cx+86)s+=`<rect x="${f1(x)}" y="${cy+36}" width="22" height="4" rx="2" style="fill:var(--panel)"/>`}
    s+=`<path d="M${cx-46} ${cy+8} l12 -22 h50 l16 22 z" style="fill:var(--sky-soft);stroke:var(--sky);stroke-width:2"/><rect x="${cx-58}" y="${cy+6}" width="116" height="24" rx="8" style="fill:var(--sky-soft);stroke:var(--sky);stroke-width:2"/>`;
    s+=`<circle cx="${cx-32}" cy="${cy+32}" r="9" style="fill:var(--ink)"/><circle cx="${cx+32}" cy="${cy+32}" r="9" style="fill:var(--ink)"/>`;
    s+=`<path d="M${cx+78} ${cy+14} v-62" style="stroke:var(--muted);stroke-width:2.5"/><rect x="${cx+44}" y="${cy-80}" width="68" height="32" rx="5" style="fill:var(--amber-soft);stroke:var(--amber);stroke-width:1.5"/><text x="${cx+78}" y="${cy-67}" class="t-xs t-mid" style="fill:var(--ink)">מבחן</text><text x="${cx+78}" y="${cy-55}" class="t-xs t-mid" style="fill:var(--ink)">דרכים</text>`;
  }else if(i===3){ // a house with a light on
    const glow=.35+.35*Math.sin(u*Math.PI*4)**2;
    s+=`<path d="M${cx-90} ${cy-30} L${cx} ${cy-92} L${cx+90} ${cy-30}" style="fill:none;stroke:var(--muted);stroke-width:2.5;stroke-linejoin:round"/><rect x="${cx-76}" y="${cy-34}" width="152" height="118" style="fill:var(--panel);stroke:var(--muted);stroke-width:2"/>`;
    s+=`<circle cx="${cx-36}" cy="${cy-6}" r="26" style="fill:var(--amber);opacity:${f1(glow*.5)}"/><path d="M${cx-46} ${cy-14} h20 l-4 -12 h-12 z" style="fill:var(--amber-soft);stroke:var(--amber);stroke-width:1.5"/><path d="M${cx-36} ${cy-14} v40 M${cx-44} ${cy+26}h16" style="stroke:var(--muted);stroke-width:2"/>`;
    s+=`<path d="M${cx+20} ${cy+14} h44" style="stroke:var(--sage);stroke-width:4;stroke-linecap:round"/><path d="M${cx+24} ${cy+14}v8M${cx+60} ${cy+14}v8" style="stroke:var(--sage);stroke-width:3"/>`;
    s+=lvPerson(cx+lerp(4,30,ease(ramp(u,.2,.8))),cy+70);
  }else if(i===4){ // a street map with a path
    s+=`<rect x="${cx-104}" y="${cy-84}" width="208" height="168" rx="8" style="fill:var(--panel-2)"/>`;
    for(let k=0;k<4;k++){s+=`<path d="M${cx-104} ${cy-60+k*40}h208" style="stroke:var(--panel);stroke-width:9"/><path d="M${cx-80+k*54} ${cy-84}v168" style="stroke:var(--panel);stroke-width:9"/>`}
    const P=`M${cx-80} ${cy+60} H${cx-26} V${cy+20} H${cx+28} V${cy-20} H${cx+82} V${cy-60}`,k=ramp(u,.08,.75);
    s+=`<rect x="${cx-92}" y="${cy+50}" width="24" height="20" rx="3" style="fill:var(--sage)"/><text x="${cx-80}" y="${cy+84}" class="t-xs t-mid" style="fill:var(--ink)">בית</text>`;
    s+=`<path d="${P}" pathLength="1" style="fill:none;stroke:var(--rose);stroke-width:3;stroke-dasharray:1;stroke-dashoffset:${f1(1-k)}"/>`;
    if(k>.35)s+=`<circle cx="${cx-26}" cy="${cy+20}" r="6" style="fill:var(--panel);stroke:var(--ink);stroke-width:2"/><text x="${cx-34}" y="${cy+6}" class="t-xs t-end" style="fill:var(--ink)">נראה לאחרונה</text>`;
    const pin=ease(ramp(u,.72,.9));if(pin>0)s+=`<g transform="translate(${cx+82} ${f1(cy-60-30*(1-pin))})" style="opacity:${f1(pin)}"><path d="M0 0 C-12 -14 -12 -30 0 -30 C12 -30 12 -14 0 0Z" style="fill:var(--rose)"/><circle cy="-20" r="4" style="fill:var(--panel)"/></g>`;
  }else if(i===5){ // home to a care home
    s+=`<path d="M${cx-108} ${cy+6} L${cx-72} ${cy-24} L${cx-36} ${cy+6}" style="fill:none;stroke:var(--muted);stroke-width:2.2;stroke-linejoin:round"/><rect x="${cx-100}" y="${cy+4}" width="56" height="52" style="fill:var(--panel);stroke:var(--muted);stroke-width:2"/><rect x="${cx-80}" y="${cy+28}" width="16" height="28" style="fill:var(--sage-soft)"/>`;
    s+=`<rect x="${cx+6}" y="${cy-30}" width="100" height="86" style="fill:var(--panel);stroke:var(--muted);stroke-width:2"/>`;
    for(let r=0;r<3;r++)for(let c=0;c<4;c++)s+=`<rect x="${cx+16+c*22}" y="${cy-20+r*22}" width="12" height="12" style="fill:${(r*4+c)%3?'var(--panel-2)':'var(--amber-soft)'}"/>`;
    s+=`<text x="${cx-72}" y="${cy+74}" class="t-xs t-mid">בית</text><text x="${cx+56}" y="${cy+74}" class="t-xs t-mid">מוסד סיעודי</text>`;
    const k=ease(ramp(u,.1,.8)),P0=[cx-60,cy-30],P1=[cx-14,cy-110],P2=[cx+40,cy-38];
    s+=`<path d="M${P0[0]} ${P0[1]} Q${P1[0]} ${P1[1]} ${P2[0]} ${P2[1]}" class="arrow" style="stroke-dasharray:4 4"/>`;
    const bx=(1-k)*(1-k)*P0[0]+2*(1-k)*k*P1[0]+k*k*P2[0],by=(1-k)*(1-k)*P0[1]+2*(1-k)*k*P1[1]+k*k*P2[1];
    s+=`<circle cx="${f1(bx)}" cy="${f1(by)}" r="8" style="fill:var(--sage);stroke:var(--panel);stroke-width:2"/>`;
  }else{ // comfort at the bedside
    s+=`<rect x="${cx-104}" y="${cy-20}" width="10" height="70" rx="3" style="fill:var(--muted)"/><rect x="${cx-96}" y="${cy+14}" width="140" height="22" rx="4" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.5"/><path d="M${cx-96} ${cy+36}v16M${cx+40} ${cy+36}v16" style="stroke:var(--muted);stroke-width:3"/>`;
    s+=`<ellipse cx="${cx-74}" cy="${cy+6}" rx="18" ry="9" style="fill:var(--panel);stroke:var(--line);stroke-width:1.5"/><circle cx="${cx-72}" cy="${cy-2}" r="10" style="fill:var(--sage-soft);stroke:var(--sage);stroke-width:2"/><path d="M${cx-60} ${cy+14} q50 -24 104 0" style="fill:var(--sage-soft);stroke:var(--sage);stroke-width:2"/>`;
    s+=lvPerson(cx+82,cy+36,'var(--sky)','var(--sky-soft)');
    const sp=Math.sin(u*Math.PI*3);
    s+=`<path d="M${cx+24} ${cy-46} h36 a18 12 0 0 1 -36 0z" style="fill:var(--amber-soft);stroke:var(--amber);stroke-width:1.5"/><g transform="rotate(${f1(-20+12*sp)} ${cx+50} ${cy-52})"><path d="M${cx+50} ${cy-52} l26 -16" style="stroke:var(--muted);stroke-width:2.5;stroke-linecap:round"/><ellipse cx="${cx+48}" cy="${cy-51}" rx="5" ry="3" style="fill:var(--muted)"/></g>`;
    s+=`<text x="${cx+42}" y="${cy-72}" class="t-xs t-mid">האכלה ביד</text>`;
    const h=.8+.2*Math.sin(u*Math.PI*6);
    s+=`<path transform="translate(${cx+12} ${cy-14}) scale(${f1(h)})" d="M0 6 C-12 -4 -8 -14 0 -8 C8 -14 12 -4 0 6Z" style="fill:var(--rose);opacity:.8"/>`;
  }
  return s}

const LV_IV=[
 {from:0,at:.12,k:'<span class="ev est">מבוסס</span> · ניסוי מבוקר אקראי, 642 מטפלים',t:'REACH II: פחות דיכאון בקרב המטפלים',
  txt:`בניסוי REACH II השתתפו 642 מטפלים היספנים או לטינים, לבנים ושחורים או אפרו־אמריקאים ב־5 ערים בארה״ב. שנים־עשר מפגשים בבית ובטלפון במשך 6 חודשים שיפרו את איכות החיים של המטפלים והורידו את שיעור הדיכאון הקליני מ־22.7% ל־12.6% (P=0.001). התוכנית לא שינתה את שיעור המעברים למוסד אחרי 6 חודשים. [[Belle2006]]`,
  pt:'תוכנית מובנית של מפגשים בבית ובטלפון הקטינה בערך בחצי את שיעור המטפלים שהיו בדיכאון קליני.'},
 {from:.2,at:.32,k:'<span class="ev est">מבוסס</span> · ניסוי מבוקר אקראי, 406 בני זוג מטפלים',t:'NYU: המעבר למוסד נדחה',
  txt:`התערבות NYU למטפלים (NYU Caregiver Intervention) נתנה לבני זוג מטפלים ייעוץ אישי ומשפחתי, קבוצות תמיכה וייעוץ טלפוני לפי הצורך. שיעור המעברים למוסד סיעודי ירד ב־28.3% (יחס סיכונים 0.717), והזמן החציוני עד המעבר, לפי חיזוי המודל, היה ארוך יותר ב־557 ימים. שביעות רצון גבוהה יותר מהתמיכה החברתית, תגובות טובות יותר לבעיות התנהגות ופחות תסמיני דיכאון אצל המטפלים הסבירו 61.2% מההשפעה. [[Mittelman2006]]`,
  pt:'תמיכה בבן או בבת הזוג אפשרה לאדם עם הדמנציה להישאר בבית זמן רב יותר, כשנה וחצי יותר לפי המודל של הניסוי.',
  hook:'התערבות NYU למטפלים: כ־557 ימים נוספים עד המעבר למוסד סיעודי (Mittelman 2006).'},
 {from:.4,at:.52,k:'<span class="ev est">מבוסס</span> · ניסוי מבוקר אקראי, 260 מטפלים',t:'START: התועלת נמשכה 6 שנים',
  txt:`START הייתה תוכנית התמודדות של 8 מפגשים לפי מדריך כתוב, שהעבירו בוגרי פסיכולוגיה תחת הדרכה. אחרי 8 חודשים, ציון החרדה והדיכאון של המטפלים (HADS) היה נמוך ב־1.80 נקודות, והסיכוי לדיכאון ברמה קלינית היה נמוך יותר (יחס סיכויים 0.24). [[Livingston2013]] ההסתברות שהתוכנית משתלמת כלכלית הייתה גבוהה מ־99%, בסף של 30,000 ליש״ט ל־QALY. [[Knapp2013]] ההבדל עדיין נמצא אחרי 2 שנים (−2.58) [[Livingston2014]] ואחרי 6 שנים (−2.00), בלי עלויות גבוהות יותר; הזמן עד מעבר למוסד סיעודי לא היה שונה באופן מובהק. [[Livingston2020]] NICE ממליצה להציע למטפלים פסיכו־חינוך והדרכה במיומנויות. [[NICE2018]]`,
  pt:'שמונה מפגשים של מיומנויות התמודדות מעשיות הותירו את המטפלים עם פחות חרדה ודיכאון למשך שש שנים לפחות, בלי עלות נוספת.',
  hook:'START: 8 מפגשים, משתלמת כלכלית, בריאות הנפש של המטפלים עדיין טובה יותר אחרי 6 שנים (Livingston 2020).'},
 {from:.6,at:.72,k:'<span class="ev early">לא הוכחה השפעה</span> · Cochrane, 4 ניסויים',t:'הפוגה: לא הוכח לכאן או לכאן',
  txt:`סקירת Cochrane מצאה 4 ניסויים של שירותי הפוגה עם 753 משתתפים, כולם ראיות באיכות נמוכה מאוד. היא לא מצאה תועלת או נזק מוכחים למטפלים. לדברי המחברים, סביר שזה משקף מחסור במחקר טוב, ולא הוכחה שהפוגה אינה עוזרת. [[Maayan2014]]`,
  pt:'הפסקות למטפלים כמעט לא נחקרו היטב. ״אין לנו ראיות טובות שזה עוזר״ אינו אותו דבר כמו ״זה לא עוזר״.',
  hook:'היעדר ראיות אינו ראיה להיעדר השפעה: להפוגה אין השפעה מוכחת בסקירת Cochrane, בעיקר משום שחסרים ניסויים טובים.'},
 {from:.8,at:.92,k:'<span class="ev hyp">אין עדיין תוצאות</span> · מודל של CMS',t:'GUIDE: הושק, עוד לא נבדק',
  txt:`CMS השיקה את GUIDE (Guiding an Improved Dementia Experience) ב־1 ביולי 2024 כמודל של Medicare ל־8 שנים. המודל כולל מתאם טיפול, הדרכה ותמיכה למטפלים, קו תמיכה 24/7, והפוגה בהיקף של עד 2,500 דולר לכל אדם זכאי בשנה, עם תשלומים חודשיים מדורגים לפי מורכבות המצב והעומס על המטפל. [[CMS2024GUIDE]] מספר הארגונים המשתתפים משתנה לפי המקור והתאריך: 390 ארגונים, ״יותר מ־300״, ו־292 בעמוד הנוכחי של CMS. עדיין לא פורסמו תוצאות של GUIDE. [[AA2025Facts,AA2026Facts,CMS2024GUIDE]]`,
  pt:'GUIDE היא תוכנית חדשה של Medicare בארה״ב שמממנת תיאום טיפול בדמנציה ותמיכה במטפלים. עדיין לא ידוע אם היא עוזרת.'}
];

inits.living=()=>{
  const svg=$('#lvSvg'),rg=$('#lvT');
  function draw(t){
    const N=vb(svg,'720 430','400 660');
    const L=N?{x0:30,x1:370,ty:30,cl:92,c0:104,c1:150,chg:176,div:190,scx:200,scy:300,fx:20,fy:430,fw:360}
             :{x0:60,x1:660,ty:30,cl:86,c0:96,c1:148,chg:172,div:186,scx:140,scy:305,fx:282,fy:214,fw:420};
    const st=Math.min(6,Math.floor(t*7)),u=ramp(t,st/7,(st+1)/7);
    const pos=st===0?0:(st-1)+ease(ramp(u,0,.22)),gap=(L.x1-L.x0)/6,mx=L.x0+pos*gap;
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    // the track of seven points
    s+=`<path d="M${L.x0} ${L.ty}H${L.x1}" style="stroke:var(--line);stroke-width:4;stroke-linecap:round"/><path d="M${L.x0} ${L.ty}H${f1(mx)}" style="stroke:var(--sage);stroke-width:4;stroke-linecap:round"/>`;
    for(let i=0;i<7;i++){const x=L.x0+i*gap,on=i<=st;
      s+=`<circle cx="${f1(x)}" cy="${L.ty}" r="${N?11:8}" style="fill:${i===st?'var(--sage)':on?'var(--sage-soft)':'var(--panel)'};stroke:${on?'var(--sage)':'var(--line)'};stroke-width:2"/>`;
      if(N)s+=`<text x="${f1(x)}" y="${L.ty+3.5}" class="t-xs t-mid" style="fill:${i===st?'var(--on-sage)':'var(--ink)'}">${i+1}</text>`;
      else s+=`<text x="${f1(x)}" y="${L.ty+26}" class="t-sm t-mid" style="fill:${i===st?'var(--ink)':'var(--muted)'};font-weight:${i===st?600:500}">${LV_NAMES[i]}</text>`}
    if(N)s+=`<text x="200" y="${L.ty+34}" class="t-lbl t-mid">שלב ${st+1} מתוך 7 · ${LV_NAMES[st]}</text>`;
    s+=`<circle cx="${f1(mx)}" cy="${L.ty}" r="${N?15:12}" style="fill:none;stroke:var(--sage);stroke-width:2;opacity:.6"/>`;
    // independence curve (schematic)
    const cv=p=>.08+.84*Math.pow(p,1.45),p=pos/6;
    s+=`<text x="20" y="${L.cl}" class="t-xs">עצמאות בחיי היומיום, סכמטי</text>`;
    s+=`<path d="${pathFn(cv,L.x0,L.x1,L.c0,L.c1,60)}" style="fill:none;stroke:var(--line);stroke-width:3;stroke-dasharray:3 4"/>`;
    if(p>0)s+=`<path d="${pathFn(q=>cv(q*p),L.x0,L.x0+(L.x1-L.x0)*p,L.c0,L.c1,40)}" style="fill:none;stroke:var(--sage);stroke-width:3.5;stroke-linecap:round"/>`;
    s+=`<circle cx="${f1(mx)}" cy="${f1(lerp(L.c0,L.c1,cv(p)))}" r="6" style="fill:var(--sage);stroke:var(--panel);stroke-width:2"/>`;
    s+=`<text x="20" y="${L.chg}" class="t-sm">מה משתנה לרוב: <tspan style="fill:var(--ink)">${LV_CHG[st]}</tspan></text>`;
    s+=`<path d="M16 ${L.div}H${N?384:704}" class="axis"/>`;
    // the scene and the figures for this point
    const fade=ramp(u,0,.12);
    s+=`<g style="opacity:${f1(fade)}">${lvScene(st,u,L.scx,L.scy)}</g>`;
    s+=`<g style="opacity:${f1(fade)}">${lvFig(LV_FIG[st],L.fx,L.fy,L.fw,u)}</g>`;
    svg.innerHTML=s;
    setSt(st);$('#lvNote').innerHTML=noteHTML(LV_STEPS[st]);
  }
  const stop=playWire(rg,$('#lvPlay'),draw,28000,'הפעלה חוזרת','living');
  const setSt=stepWire($('#lvSteps'),LV_STEPS,rg,draw,stop);

  /* ---- the family carer: numbers ---- */
  $('#lvNums').innerHTML=[
   ['11.9 מיליון','בני משפחה ואחרים בארה״ב שטיפלו ללא תשלום באנשים עם דמנציה ב־2024','[[AA2025Facts]]'],
   ['19.2 מיליארד','שעות טיפול ב־2024, בשווי של 413.5 מיליארד דולר','[[AA2025Facts]]'],
   ['כ־31 שעות','טיפול בשבוע לכל מטפל, בממוצע','[[AA2025Facts]]'],
   ['59%','מעריכים את הלחץ הרגשי שבטיפול כגבוה או כגבוה מאוד','[[AA2025Facts]]'],
   ['92 לעומת 65','שעות בחודש: מטפלים באנשים עם דמנציה לעומת מטפלים אחרים','[[AA2025Facts]]'],
   ['64.5 שעות','בשבוע של טיפול משפחתי בשנה האחרונה לחיים, לעומת 39.3 בסרטן','[[AA2025Facts]]'],
   ['2 מתוך 3','מהמטפלים באנשים עם דמנציה הן נשים; כ־1 מתוך 4 מטפלים גם בילד','[[AA2025Facts]]'],
   ['12.7 מיליון','מטפלים בדוח של 2026, שנתנו 19.6 מיליארד שעות טיפול ב־2025 (בשווי 446.3 מיליארד דולר)','[[AA2026Facts]]']
  ].map(([b,t,c])=>`<div class="lv-num"><b>${b}</b><span>${t} ${c}</span></div>`).join('');
  $('#lvDep').innerHTML=`דיכאון שכיח בקרב המטפלים באנשים עם דמנציה: 30% עד 40% לפי הדוח של Alzheimer's Association, 34.0% במטא־אנליזה של 10,825 מטפלים באנשים עם אלצהיימר (חרדה: 43.6%), ו־31.2% במטא־אנליזה גדולה יותר שמצוטטת ב־Lancet Commission. נשים מטפלות ובני זוג מטפלים היו בדיכאון לעיתים קרובות יותר. כשהמטפל היה בדיכאון, האדם עם הדמנציה הגיע למחלקה לרפואה דחופה ב־73% יותר במשך 6 חודשים. [[AA2025Facts,Sallim2015,Livingston2024]] הלוח שלמטה מציג חמש תוכניות ואת מה שמצאו הראיות הטובות ביותר עליהן.`;

  /* ---- caregiver interventions, compared ---- */
  const iv=$('#lvIv'),ir=$('#lvIvT');
  const NAMES=[['REACH II','12 מפגשים במשך 6 חודשים'],['התערבות NYU למטפלים','ייעוץ וקבוצות תמיכה'],['START','8 מפגשים של מיומנויות התמודדות'],['שירותי הפוגה','סקירת Cochrane'],['מודל GUIDE','Medicare בארה״ב, מיולי 2024']];
  function drawIv(t){
    const N=vb(iv,'720 425','400 680');
    const L=N?{rh:130,y0:30,nx:20,ax:20,aw:360,vy:52,blx:96}:{rh:76,y0:40,nx:16,ax:206,aw:494,vy:0,blx:292};
    const cur=phaseOf(LV_IV,t);
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    if(!N)s+=`<text x="16" y="24" class="t-xs">תוכנית</text><text x="${L.ax}" y="24" class="t-xs">מה מצאו הראיות הטובות ביותר</text>`;
    else s+=`<text x="20" y="20" class="t-xs">התוכנית ומה מצאו הראיות הטובות ביותר</text>`;
    for(let i=0;i<5;i++){
      const y=L.y0+i*L.rh,reached=t>=LV_IV[i].from,k=ease(ramp(t,LV_IV[i].from,LV_IV[i].from+.12)),on=i===cur;
      if(on)s+=`<rect x="6" y="${y-4}" width="${N?388:708}" height="${L.rh-6}" rx="10" style="fill:var(--sage-soft)"/>`;
      s+=`<g style="opacity:${reached?1:.4}"><text x="${L.nx}" y="${y+16}" class="t-lbl">\u2067${NAMES[i][0]}\u2069</text><text x="${L.nx}" y="${y+32}" class="t-xs">\u2067${NAMES[i][1]}\u2069</text></g>`;
      if(!reached)continue;
      const ax=L.ax,aw=L.aw,vy=y+L.vy;
      if(i===0){const bw=N?170:250;
        [['ביקורת',22.7,'var(--muted)'],['REACH II',12.6,'var(--sage)']].forEach(([l,v,c],j)=>{const yy=vy+8+j*26,w=bw*v/25*k;
          s+=`<text x="${ax}" y="${yy+11}" class="t-xs" style="fill:var(--ink)">${l}</text><rect x="${L.blx}" y="${yy}" width="${f1(w)}" height="15" rx="4" style="fill:${c}"/><text x="${f1(L.blx+w+6)}" y="${yy+12}" class="t-sm" style="fill:var(--ink);opacity:${f1(k)}">\u2067${v}% בדיכאון\u2069</text>`});
      }else if(i===1){const x0=ax+(N?30:60),x1=x0+(N?250:330)*k,ty=vy+30;
        s+=`<path d="M${ax} ${ty}H${ax+aw-6}" class="axis"/><text x="${ax+aw-6}" y="${ty+30}" class="t-xs t-end">זמן →</text>`;
        s+=`<circle cx="${x0}" cy="${ty}" r="7" style="fill:var(--muted)"/><text x="${x0}" y="${ty+20}" class="t-xs t-mid">ביקורת</text>`;
        if(k>.05)s+=`<path d="M${x0+9} ${ty}H${f1(x1-9)}" style="stroke:var(--sage);stroke-width:3"/><circle cx="${f1(x1)}" cy="${ty}" r="7" style="fill:var(--sage)"/>`;
        s+=`<text x="${f1(x1)}" y="${ty+20}" class="t-xs t-mid" style="opacity:${f1(k)}">\u2067עם תמיכת NYU\u2069</text><text x="${f1((x0+x1)/2)}" y="${ty-12}" class="t-sm t-mid" style="fill:var(--ink);opacity:${f1(k)}">המעבר למוסד נדחה בכ־557 ימים</text>`;
      }else if(i===2){const x0=ax+8,sc=(aw-40)/6.4,ty=vy+30;
        s+=`<path d="M${x0} ${ty}H${f1(x0+sc*6.4)}" class="axis"/><text x="${x0}" y="${ty+38}" class="t-xs">\u2067חרדה ודיכאון של המטפלים (HADS), נמוך יותר עדיף\u2069</text>`;
        [[.67,'8 חודשים','−1.80'],[2,'2 שנים','−2.58'],[6,'6 שנים','−2.00']].forEach(([yr,l,v],j)=>{const kk=ramp(k,j*.3,j*.3+.4),x=x0+yr*sc;
          s+=`<g style="opacity:${f1(kk)}"><circle cx="${f1(x)}" cy="${ty}" r="${f1(4+4*kk)}" style="fill:var(--sage)"/><text x="${f1(x)}" y="${ty-12}" class="t-sm t-mid" style="fill:var(--ink)">${v}</text><text x="${f1(x)}" y="${ty+20}" class="t-xs t-mid">\u2067${l}\u2069</text></g>`});
      }else if(i===3){const w=(aw-8)*k;
        s+=`<rect x="${ax}" y="${vy+8}" width="${f1(w)}" height="${N?56:52}" rx="8" style="fill:none;stroke:var(--muted);stroke-width:1.5;stroke-dasharray:5 4"/>`;
        s+=`<g style="opacity:${f1(ramp(k,.5,1))}"><text x="${ax+20}" y="${vy+44}" class="t-big t-mid" style="font-size:26px;fill:var(--muted)">?</text><text x="${ax+40}" y="${vy+30}" class="t-sm" style="fill:var(--ink)">לא הוכחו תועלת או נזק</text><text x="${ax+40}" y="${vy+48}" class="t-xs">איכות נמוכה מאוד: 4 ניסויים, 753 משתתפים</text></g>`;
      }else{const x0=ax+8,sc=(aw-24)/8,ty=vy+28,now=2026.8;
        for(let yr=0;yr<=8;yr+=N?2:1)s+=`<path d="M${f1(x0+yr*sc)} ${ty-4}v8" class="axis"/><text x="${f1(x0+yr*sc)}" y="${ty+18}" class="t-xs t-mid">${2024+yr}</text>`;
        const xn=x0+(now-2024)*sc,xe=x0+8*sc;
        s+=`<path d="M${f1(x0+.5*sc)} ${ty}H${f1(lerp(x0+.5*sc,xn,k))}" style="stroke:var(--sky);stroke-width:4;stroke-linecap:round"/><path d="M${f1(xn)} ${ty}H${f1(xe)}" style="stroke:var(--sky);stroke-width:2;stroke-dasharray:4 4;opacity:${f1(k)}"/>`;
        s+=`<circle cx="${f1(x0+.5*sc)}" cy="${ty}" r="5" style="fill:var(--sky)"/><text x="${f1(x0+.5*sc)}" y="${ty-10}" class="t-xs" style="fill:var(--ink)">הושק ביולי 2024</text>`;
        s+=`<g style="opacity:${f1(ramp(k,.6,1))}"><path d="M${f1(xn)} ${ty-8}v16" style="stroke:var(--ink);stroke-width:2"/><text x="${f1(N?xn-4:xn+6)}" y="${N?ty+34:ty-10}" class="t-xs" style="fill:var(--ink)">היום: טרם פורסמו תוצאות</text></g>`;
      }
    }
    iv.innerHTML=s;
    setIv(cur);$('#lvIvNote').innerHTML=noteHTML(LV_IV[cur]);
  }
  const stopIv=playWire(ir,$('#lvIvPlay'),drawIv,16000,'הפעלה חוזרת','living');
  const setIv=stepWire($('#lvIvSteps'),LV_IV,ir,drawIv,stopIv);

  /* ---- language toggle ---- */
  const lb=$('#lvLangBtn'),lo=$('#lvLangOut');let res=false;
  const LANG=[`<b>ניסוח יומיומי:</b> ״אנה חיה עם דמנציה. הבן שלה מדבר על ההשפעה של התמיכה בה, ועל שינויים בהתנהגות שיכולים להיות ביטוי לצורך שלא נענה.״ [[DementiaAustralia2021]]`,
              `<b>ניסוח מחקרי:</b> ״נטל הטיפול נמדד בשאלון Zarit Burden Interview.״ ניסויים כמו ATTILA מדווחים על נטל הטיפול של המטפלים כמדד תוצאה. [[DementiaAustralia2021,Lamb2018,Gathercole2021]]`];
  function lang(){lb.setAttribute('aria-pressed',res);lb.textContent=res?'הצגת הניסוח היומיומי':'הצגת הניסוח המחקרי';lo.innerHTML=LANG[res?1:0]}
  lb.addEventListener('click',()=>{res=!res;lang()});lang();

  draw(+rg.value);drawIv(+ir.value);
};
