/* =============== 3.3 bpsd: beyond memory =============== */
const BP_STEPS=[
 {from:0,at:.07,k:'D · תיאור',t:'מופיעה התנהגות',
  txt:`תסמינים נוירו־פסיכיאטריים הם הכלל, לא היוצא מן הכלל. במחקר אוכלוסייה בארצות הברית, אצל 75% מהאנשים עם דמנציה היה תסמין כזה בחודש האחרון; השכיחים ביותר היו אדישות (36%), דיכאון (32%) ואי־שקט או תוקפנות (30%). במחקר Cache County, אצל 97% הופיע לפחות תסמין אחד במשך 5 שנים. גישת DICE מתחילה בתיאור מדויק של ההתנהגות: מה קורה, מתי, איפה, עם מי, ואיך האדם והמטפל חווים זאת. [[Lyketsos2002,Steinberg2008,Kales2014,Kales2015]]`,
  pt:`קודם כול מתארים בדיוק מה קורה ומתי. "צועק ודוחף בזמן הרחצה, בשעות אחר הצהריים המאוחרות" מועיל יותר מ"תוקפני".`,
  hook:`DICE = תיאור (Describe), חקירה (Investigate), יצירה (Create), הערכה (Evaluate). מקורה בפאנל מומחים רב־תחומי משנת 2011. [[Kales2014]]`},
 {from:.2,at:.34,k:'I · חקירה',t:'התמונה מתרחבת: מה עומד מאחורי זה?',
  txt:`הגישה מחפשת גורמים בסיסיים לפני ששוקלים תרופות: צרכים שלא נענו, בעיות רפואיות כמו כאב או זיהום, הסביבה (רעש, שעמום, יותר מדי או מעט מדי גירויים) והגישה והלחץ של המטפל. [[Kales2014,Kales2015]]`,
  pt:`התנהגות היא לעתים קרובות מסר. ייתכן שהאדם סובל מכאב, אינו מרגיש טוב, צמא, משועמם, מוצף מרעש, או נבהל מכך שממהרים איתו.`},
 {from:.47,at:.58,k:'C · יצירה',t:'תוכנית שמותאמת לכל גורם',
  txt:`הסכמת מומחים וסקירות ממליצות להתחיל בגישות שאינן תרופתיות, למעט במצבי חירום. להתערבויות עבור בני משפחה מטפלים יש בסיס הראיות החזק ביותר מבין הגישות הלא תרופתיות. התוכנית נבנית יחד עם המטפל: טיפול בגורם, שינוי הסביבה או השגרה, והתאמת האופן שבו ניתן הטיפול. [[Kales2014,Kales2015]]`,
  pt:`מתקנים את מה שאפשר לתקן: מטפלים בכאב, בודקים אם יש זיהום, מנמיכים את הרעש, מציעים משהו לעשות, עונים על הצורך, מאטים את הקצב.`,
  hook:`קודם כול גישות לא תרופתיות, למעט במצבי חירום. להתערבויות למטפלים יש הראיות החזקות ביותר מבין הגישות הלא תרופתיות. [[Kales2015]]`},
 {from:.7,at:.8,k:'E · הערכה',t:'האם זה עזר?',
  txt:`הצוות בודק אם התוכנית בוצעה ואם ההתנהגות, וגם המצוקה של המטפל, השתפרו. אם לא, התהליך חוזר לשלב החקירה. [[Kales2014,Kales2015]]`,
  pt:`בודקים מה השתנה. אם זה לא עזר, מחפשים שוב גורם אחר.`},
 {from:.87,at:.96,k:'הראיות',t:'מה נבדק ומה לא',
  txt:`אף ניסוי גדול שבדק תוצאים לא בחן את DICE עצמה. מחקר אחד ללא קבוצת ביקורת, שהשווה לפני ואחרי הדרכת DICE בת יום אחד ל־180 מטפלים, מצא שיפור בביטחון של המטפלים. לגישות קרובות שמתמקדות באדם יש ראיות מניסויים: ב־WHELD, ניסוי באשכולות ב־69 מוסדות סיעודיים בבריטניה (847 דיירים), הדרכה בטיפול ממוקד אדם שיפרה את איכות החיים (d 0.24), את אי־השקט (CMAI ‎−4.27) ואת התסמינים הכוללים (NPI-NH ‎−4.55), וחסכה בעלויות. [[Kales2020,Ballard2018]]`,
  pt:`DICE היא דרך חשיבה שמומחים ממליצים עליה, לא טיפול שנבדק. הדרכת צוותי מוסדות סיעודיים בטיפול ממוקד אדם כן עזרה בניסוי גדול.`,
  hook:`DICE: הסכמת מומחים עם ראיות ישירות מוגבלות. WHELD: ראיות מניסוי אקראי להדרכה בטיפול ממוקד אדם במוסדות סיעודיים.`}
];
const BP_RK=[
 {from:0,at:.12,k:'שלב 1 · פלצבו',t:'1,000 אנשים בפלצבו',
  txt:`ב־17 הניסויים מבוקרי הפלצבו שעליהם מבוססת האזהרה הכללית בארצות הברית (משך שכיח של 10 שבועות), מתו כ־2.6% מהאנשים עם דמנציה שקיבלו פלצבו. כלומר כ־26 אנשים מתוך 1,000. [[FDARexulti2026,Huntzinger2005]]`,
  pt:`אנשים מבוגרים עם דמנציה הם שבריריים. גם עם כדור דמה מתו כ־26 מכל 1,000 במשך כ־10 שבועות.`},
 {from:.2,at:.32,k:'שלב 2 · תרופה אנטי־פסיכוטית',t:'1,000 אנשים בתרופה אנטי־פסיכוטית',
  txt:`בקרב מקבלי התרופות מתו כ־4.5%: סיכון גבוה פי 1.6 עד 1.7. רוב מקרי המוות היו קרדיו־וסקולריים (אי־ספיקת לב, מוות פתאומי) או זיהומיים (דלקת ריאות). ה־FDA פרסם את האזהרה הזאת לראשונה לתרופות אנטי־פסיכוטיות לא טיפוסיות באפריל 2005, ולפי דיווחים משניים הרחיב אותה לתרופות האנטי־פסיכוטיות הוותיקות ביוני 2008. [[FDARexulti2026,Huntzinger2005,PsychNews2008]]`,
  pt:`עם התרופה מתו כ־45 מכל 1,000 באותו פרק זמן.`,
  hook:`אזהרה מודגשת (boxed warning): תמותה מוגברת אצל מבוגרים עם פסיכוזה הקשורה לדמנציה. כ־4.5% לעומת 2.6% במשך כ־10 שבועות. [[FDARexulti2026]]`},
 {from:.4,at:.5,k:'שלב 3 · ההפרש',t:'כ־19 מקרי מוות נוספים לכל 1,000',
  txt:`4.5% פחות 2.6% הם כ־19 מקרי מוות נוספים לכל 1,000 אנשים במשך כ־10 שבועות, בערך מוות נוסף אחד לכל כ־50 מטופלים (חשבון פשוט משיעורי העלון). מטא־אנליזה שפורסמה של 15 ניסויים מצאה 3.5% לעומת 2.3% (OR 1.54, רווח סמך 95%: 1.06 עד 2.23), בלי הבדל בין התרופות השונות. [[FDARexulti2026,Schneider2005]]`,
  pt:`מכל 1,000 אנשים, מתו כ־19 יותר ממה שהיה צפוי בלי התרופה.`},
 {from:.6,at:.7,k:'שלב 4 · הסיכון בעולם האמיתי',t:'מספר הנדרש לנזק (NNH), 180 יום',
  txt:`בקרב 90,786 יוצאי צבא בארצות הברית עם דמנציה, אירע מוות נוסף אחד בתוך 180 יום לכל 26 אנשים שהתחילו ליטול הלופרידול, 27 ריספרידון, 40 אולנזפין ו־50 קווטיאפין. הסיכון עלה עם המינון. [[Maust2015]]`,
  pt:`בשימוש בעולם האמיתי, לכל 26 עד 50 אנשים שקיבלו אחת מהתרופות האלה, מת אדם נוסף אחד בתוך 6 חודשים.`,
  hook:`NNH למוות בתוך 180 יום (Maust 2015): הלופרידול 26, ריספרידון 27, אולנזפין 40, קווטיאפין 50.`},
 {from:.8,at:.9,k:'שלב 5 · תועלת והפסקה',t:'תועלת קטנה, מחיר ממשי',
  txt:`בניסוי CATIE-AD (421 אנשים), שיעור השיפור בהערכה הכללית של הקלינאי היה 32%, 26% ו־29% באולנזפין, בקווטיאפין ובריספרידון, לעומת 21% בפלצבו, הבדל לא מובהק, ואילו שיעור ההפסקה בגלל חוסר סבילות היה 24%, 16% ו־18% לעומת 5%. החוקרים הסיקו שתופעות הלוואי מקזזות את היתרונות. בניסוי DART-AD ההישרדות הייתה נמוכה יותר אצל מי שהמשיכו ליטול תרופות אנטי־פסיכוטיות (36 חודשים: 30% לעומת 59%). ועם זאת, בקרב אנשים שהגיבו לריספרידון, הפסקת התרופה העלתה את שיעור החזרה של התסמינים (60% לעומת 33%). קריטריוני Beers 2023 ממליצים להימנע מתרופות אנטי־פסיכוטיות לטיפול בהתנהגות, אלא אם אפשרויות לא תרופתיות נכשלו והאדם מסכן את עצמו או אחרים. [[Schneider2006,Ballard2009,Devanand2012,AGS2023]]`,
  pt:`התועלת קטנה ותופעות הלוואי שכיחות. אצל מי שנעזרו בתרופה, הפסקתה עלולה להחזיר את התסמינים, ולכן ההחלטות נשקלות בכל מקרה לגופו עם הצוות המטפל.`}
];
const BP_OPT=[
 {k:'ברקספיפרזול',t:'אושרה, עם השפעה קטנה',
  txt:`ב־11 במאי 2023 אישר ה־FDA את ברקספיפרזול (Rexulti) לאי־שקט הקשור לדמנציה של אלצהיימר, התרופה הראשונה שאושרה לכך. האזהרה המודגשת על תמותה, המשותפת לכל הקבוצה, נשארת, והעלון מציין שהתרופה אינה מיועדת לשימוש לפי הצורך. בניסוי המרכזי בן 12 השבועות (345 אנשים), ציוני ה־CMAI ירדו ב־22.6 נקודות בתרופה לעומת 17.3 בפלצבו: הפרש של 5.32 (רווח סמך 95%: 1.87 עד 8.77), Cohen's d 0.35. ניסוי מוקדם יותר במינון גמיש לא השיג את נקודת הסיום העיקרית שלו. [[FDA2023Rexulti,FDARexulti2026,Lee2023,Grossberg2020]] ב־30 באפריל 2026 אישר ה־FDA תרופה שנייה לאי־שקט זה, דקסטרומתורפן–בופרופיון (Auvelity), שאינה תרופה אנטי־פסיכוטית; האזהרה המודגשת שלה היא אזהרת נוגדי הדיכאון על מחשבות והתנהגות אובדניות. בניסוי בן 5 השבועות שלה (152 אנשים בתרופה, 156 בפלצבו), ציוני ה־CMAI ירדו ב־14.9 נקודות לעומת 11.6 בפלצבו: הפרש של 3.3 (רווח סמך 95%: 0.8 עד 5.8). גם העלון שלה מציין שאינה מיועדת לשימוש לפי הצורך. [[FDAAuvelity2026]]`,
  pt:`זו התרופה הראשונה שאושרה לאי־שקט באלצהיימר, אבל רוב השיפור בניסוי התרחש גם עם כדור הדמה.`,
  hook:`ברקספיפרזול: CMAI ‎−5.32 לעומת פלצבו, מול שיפור של 17.3 בפלצבו עצמו; ציוני מוצא של כ־80. האזהרה המודגשת עדיין חלה.`},
 {k:'ציטלופרם',t:'פחות אי־שקט, אבל במחיר',
  txt:`בניסוי CitAD (186 אנשים, 9 שבועות, וכולם קיבלו גם התערבות פסיכו־סוציאלית), אצל 40% מהמקבלים ציטלופרם (Celexa) היה שיפור בינוני או ניכר, לעומת 26% בפלצבו. הקוגניציה החמירה (MMSE ‎−1.05) ומקטע ה־QTc התארך ב־18.1 ms. המינון בניסוי היה 30 mg ליום; העלון הנוכחי קובע 20 mg ליום כמינון המרבי לאנשים מעל גיל 60, בגלל הארכת QT התלויה במינון. [[Porsteinsson2014,FDACelexa2023]]`,
  pt:`התרופה הקלה על אי־השקט אצל חלק מהאנשים, אבל החמירה מעט את החשיבה והשפיעה על קצב הלב, במינון שגבוה מהמגבלה שבעלון של היום למבוגרים.`,
  hook:`ב־CitAD נעשה שימוש במינון שגבוה מהמקסימום שבעלון לאנשים מעל גיל 60 (הארכת QT).`},
 {k:'תרופות שינה',t:'נבדקו מעט, בעיקר השפעה קטנה',
  txt:`Cochrane 2020: למלטונין הייתה השפעה קטנה או שלא הייתה השפעה על השינה באלצהיימר (‎+10.68 דקות, רווח סמך 95%: ‎−16.22 עד 37.59, ודאות נמוכה). בניסוי קטן אחד (30 אנשים), טרזודון עשוי להוסיף 42.46 דקות (0.9 עד 84.0). לא היו ניסויים אקראיים של בנזודיאזפינים או של תרופות Z באנשים עם דמנציה ובעיות שינה. סובורקסנט (Belsomra) הוסיף 28 דקות לעומת פלצבו (11 עד 45) בניסוי בן 4 שבועות ב־285 אנשים. קריטריוני Beers 2023 ממליצים להימנע מבנזודיאזפינים ומתרופות Z בדמנציה. [[McCleery2020,Herring2020,FDABelsomra2025,AGS2023]]`,
  pt:`מעט תרופות שינה נבדקו בדמנציה. אלה שנבדקו הוסיפו דקות, לא שעות, וכדורי השינה הנפוצים ביותר לא נבדקו כלל.`,
  hook:`בנזודיאזפינים ותרופות Z: אין ניסויים מבוקרים אקראיים בדמנציה; לפי Beers 2023 יש להימנע מהן (נפילות, שברים, דליריום, פגיעה קוגניטיבית).`},
 {k:'פימוונסרין',t:'נדחתה פעמיים לפסיכוזה בדמנציה',
  txt:`בניסוי ההפסקה HARMONY, שיעור החזרה של פסיכוזה הקשורה לדמנציה היה 13% בפימוונסרין (Nuplazid) לעומת 28% בפלצבו (HR 0.35), והניסוי הופסק מוקדם בשל יעילות. ה־FDA סירב לאשר את התרופה באפריל 2021, בנימוק של תת־קבוצות בלי תוצאות מובהקות ומעט מדי מטופלים עם סוגי דמנציה פחות שכיחים, ושוב באוגוסט 2022, בטענה שהתועלת נבעה מתת־הקבוצה של דמנציה במחלת פרקינסון. לפי העלון מיוני 2026 היא מאושרת רק לפסיכוזה במחלת פרקינסון, עם האזהרה המודגשת על תמותה בדמנציה. [[Tariot2021,Healio2021,Acadia2022,FDANuplazid2026]]`,
  pt:`ניסוי אחד נראה מבטיח, אבל הרגולטורים קבעו שהראיות אינן חזקות מספיק לאלצהיימר.`,
  hook:`פימוונסרין: מאושרת רק לפסיכוזה במחלת פרקינסון. שני מכתבי דחייה (complete response letters, 2021, 2022) לפסיכוזה הקשורה לדמנציה.`}
];
inits.bpsd=()=>{
  /* ---------- 1. DICE ---------- */
  const svg=$('#bpSvg'),rg=$('#bpT');
  const CAUSES=[
   {id:'pain',c:'כאב',cn:'כאב',a:'איתור כאב וטיפול בו',an:'טיפול בכאב'},
   {id:'inf',c:'זיהום, למשל בדרכי השתן',cn:'זיהום',a:'בדיקה לזיהום',an:'בדיקה לזיהום'},
   {id:'noise',c:'רעש: טלוויזיה, התראות',cn:'רעש',a:'חדר שקט ורגוע יותר',an:'חדר שקט יותר'},
   {id:'bored',c:'שעמום, אין מה לעשות',cn:'שעמום',a:'פעילות משמעותית',an:'משהו לעשות'},
   {id:'need',c:'צורך שלא נענה: צמא, שירותים, קור',cn:'צורך שלא נענה',a:'קודם כול מענה לצורך',an:'מענה לצורך'},
   {id:'rush',c:'גישה חפוזה',cn:'טיפול חפוז',a:'האטה והסבר',an:'האטה והסבר'}
  ];
  function glyph(id,x,y){const st='fill:none;stroke:var(--ink);stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round';
    if(id==='pain')return `<path d="M${x-2} ${y-11} L${x-7} ${y+1} H${x+1} L${x-3} ${y+11} L${x+8} ${y-3} H${x} L${x+4} ${y-11} Z" style="fill:var(--rose);stroke:none"/>`;
    if(id==='inf')return `<rect x="${x-3}" y="${y-12}" width="6" height="17" rx="3" style="${st}"/><circle cx="${x}" cy="${y+7}" r="5" style="fill:var(--rose)"/><path d="M${x} ${y+5} V${y-5}" style="stroke:var(--rose);stroke-width:2.4"/>`;
    if(id==='noise')return `<path d="M${x-10} ${y-4} h5 l6 -6 v20 l-6 -6 h-5 z" style="fill:var(--ink)"/><path d="M${x+4} ${y-4} q4 4 0 8 M${x+7} ${y-8} q8 8 0 16" style="${st}"/>`;
    if(id==='bored')return `<circle cx="${x}" cy="${y}" r="11" style="${st}"/><path d="M${x} ${y} V${y-7} M${x} ${y} L${x+5} ${y+3}" style="${st}"/>`;
    if(id==='need')return `<path d="M${x-8} ${y-10} H${x+8} L${x+5} ${y+11} H${x-5} Z" style="${st}"/><path d="M${x-6} ${y-2} H${x+6}" style="stroke:var(--sky);stroke-width:2"/>`;
    return `<path d="M${x-12} ${y-4} H${x+6} M${x+1} ${y-9} L${x+6} ${y-4} L${x+1} ${y+1} M${x-12} ${y+5} H${x+6} M${x+1} ${y} L${x+6} ${y+5} L${x+1} ${y+10}" style="${st}"/>`}
  function person(x,y,agit,calm){/* seated person, arm raised when agitated */
    let g='';
    g+=`<path d="M${x-30} ${y+56} V${y+10} M${x-30} ${y+30} H${x+18} V${y+56}" style="fill:none;stroke:var(--cell-line);stroke-width:4;stroke-linecap:round"/>`;
    g+=`<path d="M${x-8} ${y-24} Q${x-14} ${y+6} ${x-8} ${y+26} H${x+16} L${x+22} ${y+58}" style="fill:none;stroke:var(--sage);stroke-width:9;stroke-linecap:round;stroke-linejoin:round"/>`;
    const ax=lerp(x+24,x+34,agit),ay=lerp(y+12,y-30,agit);
    g+=`<path d="M${x-6} ${y-16} L${f1(lerp(x+14,x+22,agit))} ${f1(lerp(y+2,y-12,agit))} L${f1(ax)} ${f1(ay)}" style="fill:none;stroke:var(--sage);stroke-width:6;stroke-linecap:round;stroke-linejoin:round"/>`;
    g+=`<circle cx="${x-6}" cy="${y-42}" r="14" style="fill:var(--cell);stroke:var(--sage);stroke-width:2.4"/>`;
    g+=agit>.3?`<path d="M${x-11} ${y-38} q5 -4 10 0" style="fill:none;stroke:var(--ink);stroke-width:1.6"/><ellipse cx="${x+2}" cy="${y-37}" rx="3" ry="${f1(2+agit*2)}" style="fill:var(--ink)"/>`
              :`<path d="M${x-11} ${y-37} q5 ${f1(3*calm)} 10 0" style="fill:none;stroke:var(--ink);stroke-width:1.6"/>`;
    return g}
  function draw(t){
    const N=vb(svg,'720 420','400 600');
    const L=N?{band:{y:26,xs:[52,148,252,348],w:88},cx:200,cy:270,clip:[0,52,400,548],
               nodes:[ [70,150],[70,290],[70,430],[330,150],[330,290],[330,430]],burst:{y:150},ev:{y:356},evW:'n',bn:{y:556}}
             :{band:{y:26,xs:[110,270,450,610],w:140},cx:360,cy:232,clip:[0,52,720,368],
               nodes:[ [130,100],[110,210],[140,320],[590,100],[610,210],[580,320]],burst:{y:122},ev:{y:336},evW:'w',bn:{y:410}};
    let s=`<defs><clipPath id="bpClip"><rect x="${L.clip[0]}" y="${L.clip[1]}" width="${L.clip[2]}" height="${L.clip[3]}"/></clipPath>${marker('bpA')}</defs><rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    /* D I C E band */
    const ph=phaseOf(BP_STEPS,t),names=N?['תיאור','חקירה','יצירה','הערכה']:['תיאור','חקירה','יצירה','הערכה'];
    L.band.xs.forEach((x,i)=>{const on=ph===i||(ph===4);const cur=ph===i;
      s+=`<rect x="${x-L.band.w/2}" y="${L.band.y-16}" width="${L.band.w}" height="30" rx="15" style="fill:${cur?'var(--sky-soft)':'var(--panel)'};stroke:${cur?'var(--sky)':'var(--line)'};stroke-width:${cur?2:1}"/>`;
      s+=`<text x="${x}" y="${L.band.y+4}" class="t-lbl t-mid" style="fill:${on||cur?'var(--ink)':'var(--muted)'}">⁧<tspan style="fill:var(--sky)">${'DICE'[i]}</tspan>${N?'':' · '+names[i]}⁩</text>`;
      if(N)s+=`<text x="${x}" y="${L.band.y+30}" class="t-xs t-mid">${names[i]}</text>`;
      if(i<3)s+=`<path d="M${x+L.band.w/2+3} ${L.band.y-1} H${L.band.xs[i+1]-L.band.w/2-5}" class="arrow" marker-end="url(#bpA)"/>`});
    /* loop back during evaluate */
    const loop=ramp(t,.74,.8);if(loop>0){const a=L.band.xs[3],b=L.band.xs[1],yb=L.band.y+(N?36:18);
      s+=`<path d="M${a} ${yb} V${yb+8} H${b} V${yb+2}" class="arrow" style="stroke:var(--sky);opacity:${f1(loop)}" marker-end="url(#bpA)"/><text x="${(a+b)/2}" y="${yb+20}" class="t-xs t-mid" style="fill:var(--sky);opacity:${f1(loop)}">${N?'אין שיפור? בודקים שוב':'אין שיפור? חוזרים לחקירה'}</text>`}
    /* scene, zoomed in at Describe and widening at Investigate */
    const z=lerp(1.75,1,ease(ramp(t,.2,.34)));
    s+=`<g clip-path="url(#bpClip)"><g transform="translate(${L.cx} ${L.cy}) scale(${z.toFixed(3)}) translate(${-L.cx} ${-L.cy})">`;
    /* causes */
    const nodeO=i=>ramp(t,.24+i*.025,.32+i*.025),fixO=i=>ramp(t,.5+i*.025,.56+i*.025);
    const fixed=i=>ramp(t,.72+i*.015,.78+i*.015);
    CAUSES.forEach((c,i)=>{const [x,y]=L.nodes[i],o=nodeO(i);if(o<=0)return;
      const right=x>L.cx;
      s+=`<g style="opacity:${f1(o)}"><path d="M${x+(right?-24:24)} ${y} L${f1(L.cx+(right?30:-34))} ${L.cy-10}" style="stroke:var(--line);stroke-width:1.4;stroke-dasharray:3 4"/>`;
      s+=`<circle cx="${x}" cy="${y}" r="23" style="fill:var(--panel);stroke:var(--rose);stroke-width:1.8"/>${glyph(c.id,x,y)}`;
      s+=`<text x="${x}" y="${y+38}" class="t-xs t-mid" style="fill:var(--ink)">${N?c.cn:c.c}</text></g>`;
      const fo=fixO(i);if(fo>0){const w=N?128:180,lab=N?c.an:c.a,ok=fixed(i);
        s+=`<g style="opacity:${f1(fo)}"><rect x="${x-w/2}" y="${y+46}" width="${w}" height="22" rx="11" style="fill:var(--sky-soft);stroke:var(--sky);stroke-width:1.4"/><text x="${x+(ok>0?7:0)}" y="${y+61}" class="t-xs t-mid" style="fill:var(--sky);font-weight:700">${lab}</text>`;
        if(ok>0)s+=`<path d="M${x-w/2+8} ${y+57} l4 4 l7 -8" style="fill:none;stroke:var(--good);stroke-width:2.2;stroke-linecap:round;opacity:${f1(ok)}"/>`;
        s+='</g>'}});
    /* the person and the behaviour */
    const agit=clamp(1-ramp(t,.74,.86)*.9),calm=ramp(t,.78,.9),shake=agit*Math.sin(t*160)*2.2*(t<.2?1:.4);
    s+=person(L.cx+shake,L.cy,agit,calm);let burstTxt='';
    if(agit>.15){const o=f1(agit);for(let k=0;k<5;k++){const a=-Math.PI*.15-k*Math.PI*.17,r1=24,r2=36;
      s+=`<path d="M${f1(L.cx-6+Math.cos(a)*r1)} ${f1(L.cy-42+Math.sin(a)*r1)} L${f1(L.cx-6+Math.cos(a)*r2)} ${f1(L.cy-42+Math.sin(a)*r2)}" style="stroke:var(--rose);stroke-width:2.4;stroke-linecap:round;opacity:${o}"/>`}
      burstTxt=`<text x="${L.cx}" y="${f1(Math.max(N?80:72,L.cy+(L.burst.y-L.cy)*z))}" class="t-sm t-mid" style="fill:var(--rose);opacity:${o}">${N?'צעקות ודחיפה':'צעקות ודחיפה בזמן הרחצה'}</text>`}
    s+='</g></g>'+burstTxt;
    /* evaluate note in the middle */
    const ev=ramp(t,.8,.86);
    if(ev>0&&ph<4)s+=`<text x="${L.cx}" y="${L.ev.y}" class="t-sm t-mid" style="fill:var(--good);opacity:${f1(ev)}">${N?'יש רגיעה? ממשיכים':'יש רגיעה? ממשיכים במה שעבד'}</text>`;
    /* evidence banner */
    const bo=ramp(t,.87,.92);
    if(bo>0){const w=N?372:520,h=N?40:26,x=(N?200:360)-w/2,y=L.bn.y-(N?28:18);
      s+=`<g style="opacity:${f1(bo)}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" style="fill:var(--warn-soft);stroke:var(--warn)"/>`;
      if(N)s+=`<text x="200" y="${y+16}" class="t-sm t-mid" style="fill:var(--warn)">⁧אף ניסוי גדול לא בחן את DICE עצמה.⁩</text><text x="200" y="${y+31}" class="t-xs t-mid" style="fill:var(--warn)">⁧הראיות: הסכמת מומחים, מחקר קטן אחד.⁩</text>`;
      else s+=`<text x="360" y="${y+17}" class="t-sm t-mid" style="fill:var(--warn)">⁧אף ניסוי גדול לא בחן את DICE עצמה: הסכמת מומחים, מחקר קטן אחד.⁩</text>`;
      s+='</g>'}
    svg.innerHTML=s;
    setSt(ph);$('#bpNote').innerHTML=noteHTML(BP_STEPS[ph]);
  }
  const stop=playWire(rg,$('#bpPlay'),draw,16000,'הפעלה חוזרת','bpsd');
  const setSt=stepWire($('#bpSteps'),BP_STEPS,rg,draw,stop);

  /* ---------- 2. antipsychotic risk in 1,000 people ---------- */
  const rs=$('#bpRisk'),rr=$('#bpRkT');
  const ord=(seed)=>{const R=rng(seed),a=Array.from({length:1000},(_,i)=>i);for(let i=999;i>0;i--){const j=Math.floor(R()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
  const OP=ord(17),OD=ord(17);/* same order: the first 26 are shared, the next 19 are extra */
  const NNH=[ ['הלופרידול',26],['ריספרידון',27],['אולנזפין',40],['קווטיאפין',50]];
  const CAT=[ ['אולנזפין',32,24],['קווטיאפין',26,16],['ריספרידון',29,18],['פלצבו',21,5]];
  function drawRisk(t){
    const N=vb(rs,'720 470','400 800');
    const L=N?{g:[{x:28,y:62},{x:28,y:332}],sp:8.6,lo:{y:596},w:344}:{g:[{x:24,y:62},{x:376,y:62}],sp:8,lo:{y:300},w:320};
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    const kP=Math.round(26*ramp(t,.03,.15)),kD=Math.round(45*ramp(t,.21,.33)),diff=ramp(t,.4,.48);
    const wk=Math.round(10*Math.max(ramp(t,.03,.15),ramp(t,.21,.33)));
    [[OP,kP,'פלצבו',26,'var(--muted)'],[OD,kD,'תרופה אנטי־פסיכוטית',45,'var(--rose)']].forEach(([O,k,name,tot,col],gi)=>{const G=L.g[gi];
      const dead=new Set(O.slice(0,k)),extra=new Set(O.slice(26,45));
      s+=`<text x="${G.x}" y="${G.y-26}" class="t-sm">⁧${name}, 1,000 אנשים⁩</text>`;
      s+=`<text x="${G.x+L.w}" y="${G.y-26}" class="t-lbl t-end" style="fill:${k?col:'var(--muted)'}">⁧מתו: ${k}⁩</text>`;
      if(gi===0||t>.2)s+=`<text x="${G.x+L.w}" y="${G.y-12}" class="t-xs t-end">⁧שבוע ${gi===0?Math.round(10*ramp(t,.03,.15)):Math.round(10*ramp(t,.21,.33))} מתוך כ־10⁩</text>`;
      let dots='',big='';
      for(let i=0;i<1000;i++){const x=G.x+(i%40)*L.sp+L.sp/2,y=G.y+Math.floor(i/40)*L.sp+L.sp/2;
        if(dead.has(i)){const ex=gi===1&&extra.has(i)&&diff>0;
          big+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="3.6" style="fill:${col}"/>`;
          if(ex)big+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(5.6)}" style="fill:none;stroke:var(--ink);stroke-width:1.3;opacity:${f1(diff)}"/>`}
        else dots+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="1.5" style="fill:var(--cell-line);opacity:.55"/>`}
      s+=dots+big;
      if(gi===1&&diff>0)s+=`<text x="${G.x}" y="${G.y+25*L.sp+16}" class="t-sm" style="fill:var(--ink);opacity:${f1(diff)}">⁧○ מסומנים בטבעת: כ־19 מקרי מוות נוספים לכל 1,000⁩</text>`});
    /* lower area: NNH then CATIE-AD */
    const lo=L.lo.y,bx0=N?130:170,bx1=N?372:560;
    if(t>=.4&&t<.58){const o=ramp(t,.42,.48),sc=v=>(bx1-bx0)*v/5;
      s+=`<g style="opacity:${f1(o)}"><text x="${N?28:24}" y="${lo}" class="t-sm">${N?'⁧מקרי מוות במשך כ־10 שבועות (%)⁩':'⁧מקרי מוות במשך כ־10 שבועות, נתוני הקבוצה בעלונים (%)⁩'}</text>`;
      [ ['פלצבו',2.6,'var(--muted)'],['אנטי־פסיכוטית',4.5,'var(--rose)']].forEach(([n,v,col],i)=>{const y=lo+22+i*34;
        s+=`<text x="${bx0-10}" y="${y+15}" class="t-lbl t-end">${n}</text><rect x="${bx0}" y="${y}" width="${f1(sc(v))}" height="20" rx="4" style="fill:${col}"/><text x="${f1(bx0+sc(v)+6)}" y="${y+15}" class="t-lbl">${v}%</text>`});
      s+=`<path d="M${f1(bx0+sc(2.6))} ${lo+76} V${lo+86} H${f1(bx0+sc(4.5))} V${lo+76}" style="fill:none;stroke:var(--ink);stroke-width:1.4"/><text x="${f1(bx0+sc(3.55))}" y="${lo+102}" class="t-xs t-mid" style="fill:var(--ink)">⁧1.9 נקודות אחוז: כ־19 לכל 1,000⁩</text></g>`}
    if(t>=.58&&t<.8){const o=ramp(t,.58,.64);
      s+=`<g style="opacity:${f1(o)}"><text x="${N?28:24}" y="${lo}" class="t-sm">${N?'⁧מוות נוסף אחד לכל N מטופלים, 180 יום⁩':'⁧יוצאי צבא בארצות הברית: מטופלים במשך 180 יום לכל מוות נוסף (NNH)⁩'}</text>`;
      NNH.forEach(([n,v],i)=>{const p=ease(ramp(t,.6+i*.03,.68+i*.03)),y=lo+22+i*(N?30:28),cnt=Math.round(v*p);
        s+=`<text x="${bx0-10}" y="${y+12}" class="t-lbl t-end">${n}</text>`;
        const cell=(bx1-bx0)/50;for(let j=0;j<cnt;j++){const fx=bx0+j*cell;s+=`<rect x="${f1(fx+.6)}" y="${y+2}" width="${f1(cell-1.2)}" height="12" rx="1.5" style="fill:${j===cnt-1&&p>.98?'var(--rose)':'var(--panel-2)'};stroke:var(--line);stroke-width:.6"/>`}
        if(p>.98)s+=`<text x="${f1(bx0+v*cell+6)}" y="${y+12}" class="t-lbl" style="fill:var(--rose)">${v}</text>`});
      s+=`<text x="${N?28:24}" y="${lo+22+4*(N?30:28)+8}" class="t-xs">${N?'⁧כל משבצת היא אדם אחד; פחות = יותר נזק.⁩':'⁧כל משבצת היא אדם מטופל אחד; האחרונה מסמנת מוות נוסף אחד. פחות משבצות = יותר נזק.⁩'}</text></g>`}
    if(t>=.8){const o=ramp(t,.8,.86);const cx0=N?130:170,cx1=N?372:560,sc=v=>(cx1-cx0)*v/40;
      s+=`<g style="opacity:${f1(o)}"><text x="${N?28:24}" y="${lo}" class="t-sm">${N?'⁧CATIE-AD: שיפור מול הפסקה (%)⁩':'⁧CATIE-AD, עד 36 שבועות: שיפור כללי מול הפסקה בגלל חוסר סבילות (%)⁩'}</text>`;
      s+=`<rect x="${N?28:24}" y="${lo+10}" width="12" height="8" style="fill:var(--sky)"/><text x="${N?44:40}" y="${lo+18}" class="t-xs">שיפור</text><rect x="${N?110:110}" y="${lo+10}" width="12" height="8" style="fill:var(--rose)"/><text x="${N?126:126}" y="${lo+18}" class="t-xs">הפסקה: תופעות לוואי</text>`;
      CAT.forEach(([n,a,b],i)=>{const p=ease(ramp(t,.82+i*.025,.9+i*.025)),y=lo+30+i*(N?34:28);
        s+=`<text x="${cx0-10}" y="${y+14}" class="t-lbl t-end">${n}</text>`;
        s+=`<rect x="${cx0}" y="${y}" width="${f1(sc(a)*p)}" height="10" rx="3" style="fill:var(--sky)"/><rect x="${cx0}" y="${y+12}" width="${f1(sc(b)*p)}" height="10" rx="3" style="fill:var(--rose)"/>`;
        if(p>.9)s+=`<text x="${f1(cx0+sc(a)+5)}" y="${y+9}" class="t-xs" style="fill:var(--ink)">${a}</text><text x="${f1(cx0+sc(b)+5)}" y="${y+21}" class="t-xs" style="fill:var(--ink)">${b}</text>`});
      s+=`<text x="${N?28:24}" y="${lo+30+4*(N?34:28)+6}" class="t-xs">⁧ההבדלים בשיפור לא היו מובהקים סטטיסטית.⁩</text></g>`}
    rs.innerHTML=s;
    const p=phaseOf(BP_RK,t);setRk(p);$('#bpRkNote').innerHTML=noteHTML(BP_RK[p]);
  }
  const stopRk=playWire(rr,$('#bpRkPlay'),drawRisk,15000,'הפעלה חוזרת','bpsd');
  const setRk=stepWire($('#bpRkSteps'),BP_RK,rr,drawRisk,stopRk);

  /* ---------- 3. other options ---------- */
  const os=$('#bpOpt'),or=$('#bpOptT');let opt=0;
  function drawOpt(t){
    const N=vb(os,'720 340','400 '+[470,470,400,410][opt]);
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    const X0=N?20:24;
    if(opt===0){/* CMAI from about 80 */
      const ax0=N?120:200,ax1=N?380:640,sc=v=>ax0+(ax1-ax0)*(v-40)/50;/* axis 40..90 */
      s+=`<text x="${X0}" y="26" class="t-sm">${N?'⁧ציון אי־שקט CMAI, 12 שבועות⁩':'⁧ציון אי־שקט CMAI, נמוך יותר = רגוע יותר: הניסוי המרכזי, 12 שבועות⁩'}</text>`;
      [40,50,60,70,80,90].forEach(v=>{s+=`<path d="M${f1(sc(v))} 44 V${N?236:200}" class="grid"/><text x="${f1(sc(v))}" y="${N?252:216}" class="t-xs t-mid">${v}</text>`});
      const rows=[ ['⁧התחלה (בערך)⁩',80,80,'var(--muted)'],['פלצבו',80,80-17.3,'var(--muted)'],['ברקספיפרזול',80,80-22.6,'var(--sky)']];
      rows.forEach(([n,a,b,col],i)=>{const p=ease(ramp(t,.1+i*.15,.4+i*.15)),y=(N?66:62)+i*(N?56:44),e=lerp(a,b,i?p:1);
        s+=`<text x="${ax0-10}" y="${y+14}" class="t-lbl t-end">${n}</text>`;
        s+=`<rect x="${f1(sc(40))}" y="${y}" width="${f1(sc(e)-sc(40))}" height="20" rx="4" style="fill:${col};opacity:${i?.9:.35}"/>`;
        if(i&&p>.2)s+=`<path d="M${f1(sc(e))} ${y+10} H${f1(sc(80))}" style="stroke:${col};stroke-width:1.6;stroke-dasharray:3 3"/>`;
        if(i&&p>.9)s+=`<text x="${f1(sc(80)+6)}" y="${y+14}" class="t-lbl" style="fill:${col}">−${i===1?'17.3':'22.6'}</text>`});
      const g=ramp(t,.75,.85);if(g>0){const y=N?286:246;
        s+=`<g style="opacity:${f1(g)}"><path d="M${f1(sc(57.4))} ${y} V${y+10} H${f1(sc(62.7))} V${y}" style="fill:none;stroke:var(--ink);stroke-width:1.6"/><text x="${f1(sc(60))}" y="${y+26}" class="t-lbl t-mid">⁧הפרש של 5.32 נקודות⁩</text><text x="${f1(sc(60))}" y="${y+42}" class="t-xs t-mid">${N?'⁧רווח סמך 95%: 1.87 עד 8.77 · d 0.35⁩':'⁧רווח סמך 95%: 1.87 עד 8.77 · Cohen\'s d 0.35⁩'}</text></g>`}
      const b=ramp(t,.88,.95);if(b>0)s+=`<text x="${X0}" y="${N?396:318}" class="t-xs" style="opacity:${f1(b)}">${N?'⁧אושרה ב־11 במאי 2023 · האזהרה המודגשת נשארה⁩':'⁧אישור FDA ב־11 במאי 2023 · אזהרת התמותה המודגשת של הקבוצה נשארה · העלון: לא לשימוש לפי הצורך⁩'}</text>${N?`<text x="${X0}" y="412" class="t-xs" style="opacity:${f1(b)}">⁧העלון: לא לשימוש לפי הצורך⁩</text>`:''}`;
    }else if(opt===1){
      const ax0=N?120:220,ax1=N?370:600,sc=v=>(ax1-ax0)*v/50;
      s+=`<text x="${X0}" y="26" class="t-sm">${N?'⁧CitAD: שיפור בינוני או ניכר⁩':'⁧CitAD: אנשים עם שיפור בינוני או ניכר (CGIC), 9 שבועות⁩'}</text>`;
      [ ['פלצבו',26,'var(--muted)'],['ציטלופרם',40,'var(--sky)']].forEach(([n,v,col],i)=>{const p=ease(ramp(t,.05+i*.15,.35+i*.15)),y=50+i*40;
        s+=`<text x="${ax0-10}" y="${y+15}" class="t-lbl t-end">${n}</text><rect x="${ax0}" y="${y}" width="${f1(sc(v)*p)}" height="20" rx="4" style="fill:${col}"/>`;
        if(p>.9)s+=`<text x="${f1(ax0+sc(v)+6)}" y="${y+15}" class="t-lbl">${v}%</text>`});
      const c=ramp(t,.45,.6);if(c>0){const ty=N?150:146,tw=N?172:220,gap=N?16:20;
        [ ['MMSE −1.05','חשיבה מעט גרועה יותר'],['QTc +18.1 ms','⁧מקטע בקצב הלב מתארך⁩']].forEach(([a,b],i)=>{const x=X0+i*(tw+gap);
          s+=`<g style="opacity:${f1(c)}"><rect x="${x}" y="${ty}" width="${tw}" height="54" rx="10" style="fill:var(--bad-soft);stroke:var(--bad)"/><text x="${x+12}" y="${ty+23}" class="t-lbl" style="fill:var(--bad)">${a}</text><text x="${x+12}" y="${ty+41}" class="t-xs">${N&&i?'⁧מקטע QT מתארך⁩':b}</text></g>`})}
      const d=ramp(t,.65,.85);if(d>0){const y=N?262:242,gx0=X0,gx1=N?380:600,gs=v=>gx0+(gx1-gx0)*v/40;
        s+=`<g style="opacity:${f1(ramp(t,.65,.7))}"><text x="${X0}" y="${y-12}" class="t-sm">${N?'⁧הסתייגות המינון (mg ליום)⁩':'⁧ההסתייגות לגבי המינון (mg ליום, כפי שפורסם)⁩'}</text><path d="M${gx0} ${y+10} H${gx1}" class="axis" style="fill:none"/>`;
        [0,10,20,30,40].forEach(v=>{s+=`<path d="M${f1(gs(v))} ${y+6} v8" class="axis"/>`;if(v!==20&&v!==30)s+=`<text x="${f1(gs(v))}" y="${y+30}" class="t-xs t-mid">${v}</text>`});
        s+=`<rect x="${gx0}" y="${y+4}" width="${f1(gs(20)-gx0)}" height="12" rx="3" style="fill:var(--good-soft);stroke:var(--good)"/>`;
        s+=`<path d="M${f1(gs(20))} ${y-2} V${y+18}" style="stroke:var(--good);stroke-width:2"/><text x="${f1(gs(20))}" y="${y+30}" class="t-xs t-mid" style="fill:var(--good);font-weight:700">20</text><text x="${f1(gs(20))}" y="${y+44}" class="t-xs t-mid" style="fill:var(--good)">${N?'⁧מקסימום בעלון, מעל 60⁩':'⁧המקסימום בעלון, מעל גיל 60⁩'}</text>`;
        const tx=gs(lerp(0,30,ease(d)));s+=`<path d="M${f1(tx)} ${y-4} V${y+18}" style="stroke:var(--bad);stroke-width:2.4"/>`;
        if(d>.95)s+=`<text x="${f1(gs(30))}" y="${y+30}" class="t-xs t-mid" style="fill:var(--bad);font-weight:700">30</text><text x="${f1(gs(30))}" y="${y+44}" class="t-xs t-mid" style="fill:var(--bad)">⁧מינון CitAD⁩</text>`;
        s+='</g>'}
    }else if(opt===2){
      const ax0=N?20:250,ax1=N?380:640,sc=v=>ax0+(ax1-ax0)*(v+20)/110;/* -20..90 minutes */
      s+=`<text x="${X0}" y="26" class="t-sm">${N?'⁧שינה לילית נוספת מול פלצבו (דקות)⁩':'⁧תוספת לזמן השינה הכולל בלילה מול פלצבו, דקות (רווח סמך 95%)⁩'}</text>`;
      const rows=[ ['⁧מלטונין⁩','⁧Cochrane, ודאות נמוכה⁩',10.68,-16.22,37.59],['⁧טרזודון⁩','⁧ניסוי אחד, 30 אנשים⁩',42.46,.9,84],['סובורקסנט','⁧4 שבועות, 285 אנשים⁩',28,11,45]];
      const rh=N?78:56,y0=N?66:60;
      [-20,0,30,60,90].forEach(v=>{s+=`<text x="${f1(sc(v))}" y="${y0+3*rh+(N?0:4)}" class="t-xs t-mid">${v}</text>`});
      s+=`<path d="M${f1(sc(0))} ${y0-10} V${y0+3*rh-14}" style="stroke:var(--muted);stroke-dasharray:3 3"/><text x="${f1(sc(0)+4)}" y="${y0-14}" class="t-xs">אין תוספת שינה</text>`;
      rows.forEach(([n,m,e,lo,hi],i)=>{const p=ease(ramp(t,.08+i*.2,.3+i*.2)),y=y0+i*rh+(N?30:16);
        if(N)s+=`<text x="${X0}" y="${y-30}" class="t-lbl">${n}</text><text x="${X0+(n.length*8)+8}" y="${y-30}" class="t-xs">${m}</text>`;
        else s+=`<text x="${ax0-14}" y="${y-2}" class="t-lbl t-end">${n}</text><text x="${ax0-14}" y="${y+12}" class="t-xs t-end">${m}</text>`;
        s+=`<path d="M${ax0} ${y} H${ax1}" class="grid"/>`;
        if(p>0){s+=`<path d="M${f1(sc(lerp(0,lo,p)))} ${y} H${f1(sc(lerp(0,hi,p)))}" style="stroke:var(--sky);stroke-width:2.4"/><circle cx="${f1(sc(lerp(0,e,p)))}" cy="${y}" r="6" style="fill:var(--sky)"/>`;
          if(p>.9)s+=`<text x="${f1(sc(e))}" y="${y-10}" class="t-xs t-mid" style="fill:var(--ink)">+${e}</text>`}});
      const b=ramp(t,.72,.85);if(b>0){const y=N?y0+3*rh+22:y0+3*rh+24;const w=N?360:592;
        s+=`<g style="opacity:${f1(b)}"><rect x="${X0}" y="${y}" width="${w}" height="${N?52:40}" rx="10" style="fill:var(--warn-soft);stroke:var(--warn)"/><text x="${X0+12}" y="${y+17}" class="t-lbl" style="fill:var(--warn)">⁧בנזודיאזפינים ותרופות Z⁩</text><text x="${X0+12}" y="${y+33}" class="t-xs">${N?'⁧אין ניסויים בדמנציה; Beers 2023: להימנע⁩':'⁧אין ניסויים אקראיים בדמנציה עם בעיות שינה. Beers 2023: להימנע בדמנציה.⁩'}</text>${N?`<text x="${X0+12}" y="${y+46}" class="t-xs">⁧(נפילות, שברים, דליריום)⁩</text>`:''}</g>`}
    }else{
      const ax0=N?120:200,ax1=N?370:470,sc=v=>(ax1-ax0)*v/40;
      s+=`<text x="${X0}" y="26" class="t-sm">${N?'⁧HARMONY: חזרה של פסיכוזה (%)⁩':'⁧ניסוי ההפסקה HARMONY: חזרה של פסיכוזה (%)⁩'}</text>`;
      [ ['פלצבו',28,'var(--muted)'],['פימוונסרין',13,'var(--sky)']].forEach(([n,v,col],i)=>{const p=ease(ramp(t,.05+i*.12,.3+i*.12)),y=46+i*36;
        s+=`<text x="${ax0-10}" y="${y+15}" class="t-lbl t-end">${n}</text><rect x="${ax0}" y="${y}" width="${f1(sc(v)*p)}" height="20" rx="4" style="fill:${col}"/>`;
        if(p>.9)s+=`<text x="${f1(ax0+sc(v)+6)}" y="${y+15}" class="t-lbl">${v}%</text>`});
      if(!N&&t>.35)s+=`<text x="${ax1+20}" y="70" class="t-xs" style="opacity:${f1(ramp(t,.35,.45))}">⁧HR 0.35; הופסק מוקדם בשל יעילות⁩</text>`;
      if(N&&t>.35)s+=`<text x="${X0}" y="134" class="t-xs" style="opacity:${f1(ramp(t,.35,.45))}">⁧HR 0.35; הופסק מוקדם בשל יעילות⁩</text>`;
      /* regulatory timeline */
      const ev=[ ['2021','⁧HARMONY פורסם⁩'],['⁧אפריל 2021⁩','⁧ה־FDA מסרב⁩'],['⁧אוגוסט 2022⁩','⁧ה־FDA מסרב שוב⁩'],['⁧יוני 2026⁩','העלון: פסיכוזה בפרקינסון בלבד']];
      if(N){const x=40,y0=170;s+=`<path d="M${x} ${y0} V${y0+3*68}" class="axis"/>`;
        ev.forEach(([d,l],i)=>{const o=ramp(t,.45+i*.12,.52+i*.12),y=y0+i*68;s+=`<g style="opacity:${f1(o)}"><circle cx="${x}" cy="${y}" r="7" style="fill:${i===0?'var(--sky)':'var(--panel)'};stroke:${i===0?'var(--sky)':'var(--bad)'};stroke-width:2"/><text x="${x+18}" y="${y-2}" class="t-lbl">${d}</text><text x="${x+18}" y="${y+14}" class="t-xs">${l}</text></g>`})}
      else{const y=210,x0=90,x1=620;s+=`<path d="M${x0} ${y} H${x1}" class="axis"/>`;
        ev.forEach(([d,l],i)=>{const o=ramp(t,.45+i*.12,.52+i*.12),x=x0+i*(x1-x0)/3;s+=`<g style="opacity:${f1(o)}"><circle cx="${x}" cy="${y}" r="7" style="fill:${i===0?'var(--sky)':'var(--panel)'};stroke:${i===0?'var(--sky)':'var(--bad)'};stroke-width:2"/><text x="${x}" y="${y-16}" class="t-lbl t-mid">${d}</text><text x="${x}" y="${y+26}" class="t-xs t-mid">${l}</text></g>`})}
    }
    os.innerHTML=s;
    $('#bpOptNote').innerHTML=noteHTML(BP_OPT[opt]);
    $('#bpOptCap').textContent=['CMAI: מדד אי־השקט של כהן־מנספילד (Cohen-Mansfield Agitation Inventory), 29 פריטים. העמודות מראות את הציון הממוצע יורד מנקודת מוצא של כ־80.','CGIC: הערכה כללית של הקלינאי לגבי השינוי. כל המשתתפים ב־CitAD קיבלו גם התערבות פסיכו־סוציאלית.','הנקודות הן אומדנים; הקווים הם רווחי סמך 95%. התוצאות לקוחות מניסויים קטנים וקצרים.','מערך של הפסקה: אנשים שהגיבו לתרופה תחילה הוקצו אחר כך באקראי להמשיך בתרופה או לעבור לפלצבו.'][opt];
    or.setAttribute('aria-valuetext',BP_OPT[opt].k+', '+Math.round(t*100)+'% נחשף');
  }
  const stopOpt=playWire(or,$('#bpOptPlay'),drawOpt,8000,'הפעלה חוזרת','bpsd');
  $$('[data-bpo]').forEach(b=>b.addEventListener('click',()=>{opt=+b.dataset.bpo;$$('[data-bpo]').forEach(x=>x.setAttribute('aria-pressed',x===b));stopOpt();or.value=0;drawOpt(0);$('#bpOptPlay').click()}));

  $('#bpCards').innerHTML=`
   <div class="card"><span class="ev est">מבוסס</span><h4>עומס אנטיכולינרגי</h4><p>תרופות נפוצות רבות חוסמות אצטילכולין: אנטיהיסטמינים ותיקים כמו דיפנהידרמין והידרוקסיזין, תרופות אנטי־מוסקריניות לשלפוחית השתן, נוגדי דיכאון טריציקליים וחלק מהתרופות האנטי־פסיכוטיות. בקוהורט בבריטניה של 13,004 אנשים מעל גיל 65, 47% השתמשו בתרופה שעשויה להיות אנטיכולינרגית; שימוש בתרופה אנטיכולינרגית ודאית נקשר לאובדן של 0.33 נקודות MMSE נוספות במשך 2 שנים ולתמותה גבוהה יותר בתוך 2 שנים (OR 1.68). [[AGS2023,Fox2011]]</p></div>
   <div class="card"><span class="ev early">תצפיתי</span><h4>קשר לדמנציה בהמשך</h4><p>שימוש כבד לאורך 10 שנים נקשר להופעת דמנציה (HR 1.54), עם מגמה של מינון־תגובה. ב־58,769 מקרים, החשיפה הגבוהה ביותר נקשרה ל־OR של 1.49, בעיקר בגלל תרופות אנטי־מוסקריניות לשלפוחית השתן (1.65), תרופות אנטי־פסיכוטיות (1.70) ונוגדי דיכאון אנטיכולינרגיים (1.29). אי אפשר לשלול לגמרי ערפול (confounding) וסיבתיות הפוכה, אף שנעשה שימוש בחלונות השהיה. [[Gray2015,Coupland2019]]</p></div>
   <div class="card"><span class="ev est">מבוסס</span><h4>תרופה שמבטלת תרופה אחרת</h4><p>תרופה אנטיכולינרגית פועלת מבחינה פרמקולוגית נגד מעכב כולינאסטראז. אנשים שהתחילו ליטול מעכב קיבלו בסבירות גבוהה יותר מרשם לתרופה אנטיכולינרגית לשלפוחית השתן בהמשך (4.5% לעומת 3.1%; HR מתוקנן 1.55), מפל מרשמים מתועד. [[Gill2005]] ראו <a href="#synapse" data-go="synapse">מעכבי כולינאסטראז וממנטין</a>.</p></div>
   <div class="card"><span class="ev est">הנחיה</span><h4>קריטריוני Beers משנת 2023</h4><ul><li>הימנעות מתרופות אנטיכולינרגיות חזקות בדמנציה, בפגיעה קוגניטיבית או בדליריום, והימנעות משילוב של שתיים או יותר.</li><li>הימנעות מתרופות אנטי־פסיכוטיות, למעט בהתוויות מאושרות; בדמנציה, הימנעות משימוש כרוני או לפי הצורך (שבץ, הידרדרות מהירה יותר, מוות).</li><li>הימנעות מבנזודיאזפינים ומתרופות Z בדמנציה.</li><li>הימנעות ממעכבי כולינאסטראז כשההתעלפות עשויה לנבוע מדופק איטי.</li></ul><p>[[AGS2023]]</p></div>
   <div class="card"><span class="ev est">Cochrane</span><h4>ממנטין אינו תרופה לאי־שקט</h4><p>בסקירת Cochrane משנת 2019, ממנטין (Namenda) לא היה יעיל כטיפול באי־שקט (CMAI +0.50, רווח סמך 95%: ‎−3.71 עד 4.71). [[McShane2019]]</p></div>
   <div class="card"><h4>בקצרה</h4><div class="pt"><b>במילים פשוטות</b>שינויים בהתנהגות שכיחים, ובדרך כלל יש להם סיבה. ההנחיות שפורסמו מחפשות קודם כול את הסיבה הזאת. התרופות שנבדקו עוזרות מעט לכל היותר, ולכמה מהן יש סיכונים חמורים; קריטריוני Beers מונים חלק מהן כתרופות שיש להימנע מהן בדמנציה.</div><div class="hook"><b>לבחינה</b>Beers 2023: הימנעות מתרופות אנטיכולינרגיות, מבנזודיאזפינים ותרופות Z ומשימוש שגרתי בתרופות אנטי־פסיכוטיות בדמנציה.</div></div>`;
  draw(+rg.value);drawRisk(+rr.value);drawOpt(+or.value);
};
