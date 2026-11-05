/* =============== 4.1 prevent: lowering the risk =============== */
const PV_CAVEAT=`הוועדה מציינת שהיא "הניחה שגורמי הסיכון גורמים לדמנציה", ושחלק מהקשרים עשויים להיות סיבתיים רק בחלקם. [[Livingston2024]]`;
const PV_F=[
 {n:'השכלה מועטה',g:0,p:5,ev:'קשר תצפיתי',
  txt:`השכלה מועטה בראשית החיים מסבירה כ־5% במודל. במחקר פרמינגהם, הירידה של 44% בשיעור ההיארעות של דמנציה במשך שלושה עשורים נראתה רק בקרב אנשים עם תעודת בגרות או השכלה גבוהה יותר. [[Livingston2024,Satizabal2016]]`},
 {n:'ירידה בשמיעה',g:1,p:7,ev:'ראיות מעורבות מניסויים',
  txt:`הגורם הגדול ביותר במשותף, כ־7%. בניסוי ACHIEVE, מכשירי שמיעה עם ליווי והדרכה לא שינו את הירידה הקוגניטיבית במשך 3 שנים בכלל המשתתפים (הבדל של 0.002 SD); בתת־הקבוצה בסיכון גבוה יותר מ־ARIC, הירידה הואטה ב־0.19 SD. ה־WHO לא נתן ב־2019 המלצה בנושא שמיעה, כי הראיות מניסויי התערבות לא הספיקו. [[Livingston2024,Lin2023,Chowdhary2021]]`},
 {n:'⁧כולסטרול LDL גבוה⁩',g:1,p:7,ev:'חדש ב־2024',
  txt:`חדש ב־2024 והגדול ביותר במשותף, כ־7%. בקוהורט בריטי של 1,853,954 אנשים, LDL גבוה יותר נמצא קשור לדמנציה (RR 1.05 לכל SD), ובחוזקה רבה יותר מתחת לגיל 65. שימוש בסטטינים נמצא קשור לסיכון נמוך יותר ב־36 קוהורטים (OR 0.80, עם הטרוגניות גבוהה מאוד, I² 97.5%), אבל סקירת Cochrane של ניסויי סטטינים בגיל מבוגר לא מצאה השפעה על דמנציה. לא הייתה הערכה עולמית של שכיחות LDL גבוה, ולכן נעשה שימוש בקוהורט אחד. [[Livingston2024]]`},
 {n:'דיכאון',g:1,p:3,ev:'קשר תצפיתי',
  txt:`כ־3%. ה־WHO לא נתן ב־2019 המלצה על טיפול בדיכאון כדי להפחית את הסיכון לדמנציה, כי הראיות לא הספיקו. [[Livingston2024,Chowdhary2021]]`},
 {n:'פגיעת ראש טראומטית',g:1,p:3,ev:'קשר תצפיתי',
  txt:`כ־3% במודל. בסיכום המחקרי של האפליקציה הזו אין תוצאות מניסויי התערבות לגורם הזה. [[Livingston2024]]`},
 {n:'חוסר פעילות גופנית',g:1,p:2,ev:'סיבתיות הפוכה',
  txt:`כ־2%. בניתוח של 404,840 אנשים, חוסר פעילות שנמדד פחות מ־10 שנים לפני האבחנה נמצא קשור לדמנציה (HR 1.40), אבל כשנמדד 10 שנים או יותר לפני האבחנה, לא נמצא קשר (HR 1.01, רווח סמך 95%: 0.89 עד 1.14). ייתכן שחלק מהקשר נובע מכך שמחלה בשלב מוקדם גורמת לאנשים להיות פחות פעילים, ולא להפך. ניסוי הפעילות הגופנית LIFE לא מצא הבדל ב־MCI או בדמנציה (OR 1.08). ה־WHO עדיין ממליץ על פעילות גופנית למבוגרים עם קוגניציה תקינה (המלצה חזקה, איכות בינונית). [[Kivimaki2019,Sink2015,Chowdhary2021,Livingston2024]]`},
 {n:'סוכרת',g:1,p:2,ev:'קשר תצפיתי',
  txt:`כ־2%. ה־WHO ב־2019: טיפול בסוכרת לפי הנחיות ה־WHO הקיימות (חזקה); טיפול כזה במטרה ספציפית להפחית את הסיכון לדמנציה הוא המלצה מותנית, עם ראיות באיכות נמוכה מאוד לגבי תוצאי דמנציה. [[Livingston2024,Chowdhary2021]]`},
 {n:'עישון',g:1,p:2,ev:'קשר תצפיתי',
  txt:`כ־2%. ה־WHO ממליץ ב־2019 בתוקף על הפסקת עישון, ובאותה עת מדרג את הראיות לגבי תוצאים קוגניטיביים כבאיכות נמוכה. [[Livingston2024,Chowdhary2021]]`},
 {n:'יתר לחץ דם',g:1,p:2,ev:'ראיות מניסויים',
  txt:`כ־2%. ב־SPRINT MIND, איזון אינטנסיבי של לחץ הדם לא הפחית באופן מובהק דמנציה סבירה (HR 0.83, רווח סמך 95%: 0.67 עד 1.04), אבל כן הפחית MCI (HR 0.81). ב־12 ניסויים שכללו 92,135 אנשים, הורדת לחץ דם נמצאה קשורה לפחות דמנציה או פגיעה קוגניטיבית: 7.0% לעומת 7.5% (OR 0.93), הפחתה מוחלטת של 0.39%. [[Livingston2024,Williamson2019,Hughes2020]]`},
 {n:'השמנה',g:1,p:1,ev:'קשר תצפיתי',
  txt:`כ־1%. ה־WHO נותן ב־2019 המלצה מותנית להתערבויות בעודף משקל ובהשמנה באמצע החיים (איכות נמוכה עד בינונית). [[Livingston2024,Chowdhary2021]]`},
 {n:'צריכת אלכוהול מופרזת',g:1,p:1,ev:'קשר תצפיתי',
  txt:`כ־1%. ה־WHO ב־2019: התערבויות להפחתת שתייה מסוכנת, המלצה מותנית, על סמך ראיות תצפיתיות באיכות בינונית. בקוהורט HUNT, ששימש להערכת החפיפה בין הגורמים, שיעור השימוש המזיק באלכוהול היה נמוך יותר מהנתונים העולמיים. [[Livingston2024,Chowdhary2021]]`},
 {n:'בידוד חברתי',g:2,p:5,ev:'קשר תצפיתי',
  txt:`כ־5% בגיל מבוגר. ה־WHO לא נתן ב־2019 המלצה על פעילות חברתית, כי הראיות מניסויי התערבות לא הספיקו. [[Livingston2024,Chowdhary2021]]`},
 {n:'זיהום אוויר',g:2,p:3,ev:'קשר תצפיתי',
  txt:`כ־3%. הוועדה מציינת שלא היה אפשר לערוך מטא־אנליזה לזיהום אוויר. [[Livingston2024]]`},
 {n:'ירידה בראייה שאינה מטופלת',g:2,p:2,ev:'חדש ב־2024',
  txt:`חדש ב־2024, כ־2%. מטא־אנליזה של 14 קוהורטים (6,204,827 מבוגרים) קשרה ליקוי ראייה לדמנציה (RR משוקלל 1.47, רווח סמך 95%: 1.36 עד 1.60). הוועדה מעריכה ליקוי ראייה שאפשר היה למנוע ב־12.6% מהמבוגרים בני 50 ומעלה. [[Livingston2024]]`}
];
const PV_G=[ ['ראשית החיים','var(--violet)'],['אמצע החיים','var(--sky)'],['גיל מבוגר','var(--sage)'] ];
const PV_STEPS=[
 {from:0,at:.12,k:'שלב 1 · ראשית החיים',t:'השכלה: כ־5%',
  txt:`ועדת הלנסט של 2024 מקבצת את 14 הגורמים שלה לפי השלב בחיים שבו הם פועלים. בראשית החיים יש גורם אחד: השכלה מועטה, כ־5%. כל אחוז הוא שבר מיוחס באוכלוסייה (PAF): חלק המקרים שבאופן תאורטי אפשר היה למנוע או לדחות אילו הסיכון הזה היה מסולק. [[Livingston2024]]`,
  pt:`הגלגל הוא כל מקרי הדמנציה בעולם. כל פלח צבעוני הוא החלק שהוועדה מקשרת לגורם סיכון אחד שאפשר לשנות.`},
 {from:.18,at:.5,k:'שלב 2 · אמצע החיים',t:'עשרה גורמים באמצע החיים: כ־30%',
  txt:`באמצע החיים יש עשרה גורמים. ירידה בשמיעה וכולסטרול LDL גבוה (כ־7% כל אחד) הם התורמים הבודדים הגדולים ביותר. LDL גבוה חדש ב־2024, יחד עם ירידה בראייה שאינה מטופלת. [[Livingston2024]]`,
  pt:`רוב הסיכון שאפשר לשנות נמצא בגיל העמידה, ובראשו ירידה בשמיעה וכולסטרול "רע" גבוה.`,
  hook:`לנסט 2024: 14 גורמים, 45%. הגדולים ביותר: ירידה בשמיעה ו־LDL גבוה, כ־7% כל אחד. חדשים ב־2024: LDL וירידה בראייה שאינה מטופלת.`},
 {from:.56,at:.72,k:'שלב 3 · גיל מבוגר',t:'שלושה גורמים בגיל מבוגר: כ־10%',
  txt:`בגיל מבוגר נוספים בידוד חברתי (כ־5%), זיהום אוויר (כ־3%) וירידה בראייה שאינה מטופלת (כ־2%). [[Livingston2024]]`,
  pt:`בגיל מבוגר, בדידות, אוויר מזוהם וראייה חלשה שלא תוקנה מוסיפים את השאר.`},
 {from:.78,at:.87,k:'שלב 4 · הסך הכול',t:'45%: גבול עליון לפי מודל',
  txt:`יחד, 14 הגורמים מסבירים כ־45% מהדמנציה בעולם (PAF משוקלל 45.3%). השברים שוקללו לפי החפיפה ביניהם ("communality"), שהוערכה אצל כ־37,000 אנשים ממחקר HUNT בנורווגיה, שבו חמישה רכיבים הסבירו 54% מהשונות בין הגורמים. הנתון מניח שכל סיכון מסולק לחלוטין; זה לא מה שהשיגה התערבות כלשהי. [[Livingston2024]]`,
  pt:`במודל, כמעט מחצית מהדמנציה קשורה לגורמי הסיכון האלה. זו תקרה, לא הבטחה: אף תוכנית לא מסלקת את כל הסיכונים.`,
  hook:`45% הוא מקסימום תאורטי ממודל, לא תוצאה של ניסוי.`},
 {from:.92,at:.97,k:'שלב 5 · הסתייגויות',t:'הסיבתיות הונחה',
  txt:`הוועדה "הניחה שגורמי הסיכון גורמים לדמנציה" ואומרת שחלק מהקשרים עשויים להיות סיבתיים רק בחלקם. בין המגבלות שהיא מציינת: נתוני שכיחות מוטים לכיוון מדינות בעלות הכנסה גבוהה, קוהורט אחד בלבד ל־LDL, חפיפה שהוערכה בקוהורט נורווגי אחד עם גיוון אתני מועט, והיעדר מטא־אנליזה לזיהום אוויר. גם סיבתיות הפוכה חשובה: חוסר פעילות גופנית ניבא דמנציה רק כשנמדד בתוך 10 שנים לפני האבחנה. [[Livingston2024,Kivimaki2019]]`,
  pt:`ייתכן שחלק מהקשרים האלה פועלים בחלקם בכיוון ההפוך: מחלה בשלב מוקדם יכולה לגרום לאנשים להיות פחות פעילים או מבודדים יותר שנים לפני האבחנה.`}
];
const PV_TR=[
 {from:0,at:.12,k:'שלב 1 · רב־תחומי',t:'חבילות של אורח חיים: השפעה קטנה או אפסית',
  txt:`FINGER ‏(1,260 אנשים בסיכון, 2 שנים) שיפר ציון במבחן קוגניטיבי מעט יותר מייעוץ בריאותי כללי: 0.022 יחידות z לשנה (רווח סמך 95%: 0.002 עד 0.042); שתי הקבוצות השתפרו. US POINTER ‏(2,111 אנשים) השווה תוכנית מובנית לתוכנית בהנחיה עצמית, בלי קבוצת ביקורת שלא קיבלה התערבות: 0.029 SD לשנה לטובת התוכנית המובנית. preDIVA ‏(3,526 אנשים, 6 שנים של טיפול וסקולרי בהובלת אחיות) לא הפחית דמנציה: 7% לעומת 7%, HR 0.92.‏ [[Ngandu2015,Baker2025POINTER,MollvanCharante2016]]`,
  pt:`תוכניות גדולות של אורח חיים העלו מעט את הציונים במבחני חשיבה. אף אחת מהן עדיין לא הראתה שפחות אנשים חולים בדמנציה.`},
 {from:.22,at:.34,k:'שלב 2 · לחץ דם',t:'SPRINT MIND: כן ל־MCI, לא ברור לדמנציה',
  txt:`SPRINT MIND ‏(9,361 אנשים) כוון ללחץ דם סיסטולי מתחת ל־120 לעומת מתחת ל־140. דמנציה סבירה: 7.2 לעומת 8.6 ל־1,000 שנות אדם, HR 0.83 ‏(0.67 עד 1.04), לא מובהק; הניסוי נעצר מוקדם וייתכן שלא היה לו די עוצמה סטטיסטית. MCI: HR 0.81 ‏(0.69 עד 0.95), מובהק. [[Williamson2019]]`,
  pt:`איזון הדוק יותר של לחץ הדם הפחית ירידה קוגניטיבית קלה. ההשפעה שלו על הדמנציה עצמה לא הייתה ברורה סטטיסטית.`,
  hook:`SPRINT MIND: איזון אינטנסיבי של לחץ הדם הפחית MCI ‏(HR 0.81), אבל לא הפחית דמנציה באופן מובהק (HR 0.83).`},
 {from:.42,at:.53,k:'שלב 3 · שמיעה',t:'ACHIEVE: אפסי בסך הכול, סימן בתת־קבוצה',
  txt:`ACHIEVE ‏(977 מבוגרים בני 70 עד 84 עם ירידה בשמיעה שאינה מטופלת) לא מצא הבדל כולל בשינוי הקוגניטיבי במשך 3 שנים (0.002 SD, רווח סמך 95%: −0.077 עד 0.081). בקרב 238 המשתתפים מ־ARIC שהיו בסיכון גבוה יותר, הירידה הואטה ב־0.19 SD ‏(0.02 עד 0.36), מה שהוועדה מתארת כירידה קטנה בכ־48%. תוצאה בתת־קבוצה תומכת בהשערה; היא אינה מכריעה אותה. [[Lin2023,Livingston2024]]`,
  pt:`מכשירי שמיעה לא שינו את הירידה בזיכרון בקבוצה כולה. נראה שהם עזרו לתת־קבוצה בסיכון גבוה יותר, וזה עוד צריך אישור.`},
 {from:.6,at:.7,k:'שלב 4 · פעילות גופנית ותזונה',t:'LIFE ו־MIND: אפסיים',
  txt:`LIFE ‏(1,635 מבוגרים שאינם פעילים, 2 שנים של פעילות מתונה) לא מצא הבדל: MCI או דמנציה 13.2% לעומת 12.1%, OR 1.08 ‏(0.80 עד 1.46). ניסוי דיאטת MIND ‏(604 אנשים, 3 שנים) לא מצא הבדל מובהק בקוגניציה הכללית: 0.035 ‏(−0.022 עד 0.092); שתי הקבוצות השתפרו. [[Sink2015,Barnes2023]]`,
  pt:`תוכנית פעילות גופנית ותזונה ידידותית למוח לא שינו את ציוני החשיבה יותר ממה שקרה בקבוצות ההשוואה.`},
 {from:.78,at:.86,k:'שלב 5 · אימון קוגניטיבי',t:'ACTIVE: סימן גבולי אחד',
  txt:`ב־ACTIVE ‏(2,832 מבוגרים בריאים), רק אימון מהירות עיבוד נמצא קשור לסיכון נמוך יותר לדמנציה לאורך 10 שנים: HR 0.71 ‏(0.50 עד 0.998), P = .049, גבולי. אחרי 20 שנה, פחות דמנציה מאובחנת נראתה רק אצל מי שעברו אימון מהירות והשתתפו במפגשי חיזוק (HR 0.75), תת־קבוצה שבחרה את עצמה, עם אבחנות שנלקחו מנתוני תביעות ביטוח. [[Rebok2014,Edwards2017,Coe2026]]`,
  pt:`סוג אחד של אימון מהירות ממוחשב נמצא קשור לקצת פחות דמנציה שנים אחר כך, אבל בקושי, והממצא המאוחר יותר הוא בקבוצה שבחרה את עצמה.`},
 {from:.92,at:.97,k:'שלב 6 · קריאה כנה',t:'ברובן אפסיות או קטנות',
  txt:`מתוך עשר התוצאות כאן, אחת הפחיתה בבירור אבחנה (SPRINT MIND, ל־MCI), אחת הייתה גבולית (אימון המהירות ב־ACTIVE), שתיים הראו תועלת קטנה בציונים קוגניטיביים (FINGER, ‏US POINTER), אחת היא סימן בתת־קבוצה (ACHIEVE, משתתפי ARIC), וחמש אפסיות. הניסויים קצרים בהשוואה לעשרות השנים שבהן דמנציה מתפתחת, וזו אחת הסיבות לכך שקשה להוכיח מניעה. [[Williamson2019,Edwards2017,Ngandu2015,Baker2025POINTER]]`,
  pt:`גורמי הסיכון הם קשרים אמיתיים, אבל ניסויים ששינו אותם הראו עד כה בעיקר השפעות קטנות או שום השפעה.`,
  hook:`ניסויי מניעה: FINGER ו־POINTER חיוביים במידה קטנה; SPRINT MIND חיובי ל־MCI;‏ ACHIEVE, דיאטת MIND,‏ LIFE ו־preDIVA אפסיים בסך הכול.`}
];
inits.prevent=()=>{
  /* ---------- 1. the 14-factor wheel ---------- */
  const svg=$('#pvSvg'),rg=$('#pvT');let sel=-1;
  /* timing: each factor sweeps in during its life-stage window, in proportion to its share */
  const WIN=[ [.02,.12],[.2,.5],[.58,.72] ];
  const tim=PV_F.map((f,i)=>{const grp=PV_F.filter(x=>x.g===f.g),tot=grp.reduce((a,x)=>a+x.p,0);let before=0;for(const x of grp){if(x===f)break;before+=x.p}
    const [a,b]=WIN[f.g];return [a+(b-a)*before/tot,a+(b-a)*(before+f.p)/tot]});
  let cum=0;const ang=PV_F.map(f=>{const a0=cum/100*360;cum+=f.p;return [a0,cum/100*360]});
  const pol=(cx,cy,r,deg)=>{const a=(deg-90)*Math.PI/180;return [cx+r*Math.cos(a),cy+r*Math.sin(a)]};
  function arc(cx,cy,r0,r1,d0,d1){if(d1-d0<.05)return '';const [x0,y0]=pol(cx,cy,r1,d0),[x1,y1]=pol(cx,cy,r1,d1),[x2,y2]=pol(cx,cy,r0,d1),[x3,y3]=pol(cx,cy,r0,d0),lg=d1-d0>180?1:0;
    return `M${f1(x0)} ${f1(y0)} A${r1} ${r1} 0 ${lg} 1 ${f1(x1)} ${f1(y1)} L${f1(x2)} ${f1(y2)} A${r0} ${r0} 0 ${lg} 0 ${f1(x3)} ${f1(y3)} Z`}
  function draw(t){
    const N=vb(svg,'720 420','400 770');
    const L=N?{cx:200,cy:192,r:140,list:{x0:20,x1:380,y:384,rh:22,bar:214,bs:16}}:{cx:190,cy:212,r:150,list:{x0:410,x1:708,y:30,rh:22.4,bar:600,bs:12}};
    const r0=L.r*.6;let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    /* whole-of-dementia ring */
    const rest=ramp(t,.78,.86);
    s+=`<circle cx="${L.cx}" cy="${L.cy}" r="${f1((L.r+r0)/2)}" style="fill:none;stroke:var(--panel-2);stroke-width:${f1(L.r-r0)}"/>`;
    if(rest>0){s+=`<path d="${arc(L.cx,L.cy,r0,L.r,162.6,162.6+(359.4-162.6)*rest)}" style="fill:none;stroke:var(--muted);stroke-width:1.2;stroke-dasharray:3 4;opacity:.8"/>`;
      const [lx,ly]=pol(L.cx,L.cy,(L.r+r0)/2,262);s+=`<text x="${f1(lx)}" y="${f1(ly-4)}" class="t-xs t-mid" style="opacity:${f1(rest)}">⁧55%: סיבות אחרות⁩</text><text x="${f1(lx)}" y="${f1(ly+8)}" class="t-xs t-mid" style="opacity:${f1(rest)}">או לא ידועות</text>`}
    let total=0;
    PV_F.forEach((f,i)=>{const [ta,tb]=tim[i],pr=ramp(t,ta,tb);if(pr<=0)return;total+=f.p*pr;
      const [d0,d1]=ang[i],on=sel===i,pop=on?8:0,shade=(i%2)?.72:1;
      s+=`<path data-k="${i}" class="clk" d="${arc(L.cx,L.cy,r0,L.r+pop,d0+.3,d0+.3+(d1-d0-.6)*pr)}" style="fill:${PV_G[f.g][1]};opacity:${on?1:shade};stroke:${on?'var(--ink)':'none'};stroke-width:2"><title>${f.n}: כ־${f.p}%</title></path>`});
    /* stage labels outside the ring */
    [ [9,'ראשית החיים',0],[72,'אמצע החיים',1],[144,'גיל מבוגר',2]].forEach(([d,l,g])=>{const o=ramp(t,WIN[g][0],WIN[g][0]+.04);if(o<=0)return;const [x,y]=pol(L.cx,L.cy,L.r+13,d);
      s+=`<text x="${f1(x)}" y="${f1(y+4)}" class="t-xs ${d>100?'':''}" style="fill:${PV_G[g][1]};font-weight:700;opacity:${f1(o)}">${l}</text>`});
    /* centre counter */
    const caveat=ramp(t,.92,.96);
    s+=`<text x="${L.cx}" y="${L.cy+4}" class="t-mid" style="font:800 ${N?40:44}px var(--display);fill:var(--ink)">${Math.round(total)}%</text>`;
    s+=`<text x="${L.cx}" y="${L.cy+24}" class="t-xs t-mid">ממקרי הדמנציה</text><text x="${L.cx}" y="${L.cy+36}" class="t-xs t-mid">בעולם, לפי המודל</text>`;
    if(caveat>0)s+=`<text x="${L.cx}" y="${L.cy-36}" class="t-xs t-mid" style="fill:var(--warn);font-weight:700;opacity:${f1(caveat)}">אם הקשר סיבתי</text>`;
    /* the list */
    const Lt=L.list;let y=Lt.y;
    PV_G.forEach(([gn,gc],g)=>{const grpO=ramp(t,WIN[g][0],WIN[g][0]+.03);
      s+=`<g style="opacity:${f1(.25+.75*grpO)}"><rect x="${Lt.x0}" y="${f1(y-9)}" width="10" height="10" rx="2" style="fill:${gc}"/><text x="${Lt.x0+16}" y="${f1(y)}" class="t-sm" style="fill:${gc};font-weight:700">${gn.toUpperCase()} · ${PV_F.filter(f=>f.g===g).reduce((a,f)=>a+f.p,0)}%</text></g>`;y+=Lt.rh;
      PV_F.forEach((f,i)=>{if(f.g!==g)return;const pr=ramp(t,tim[i][0],tim[i][1]),on=sel===i;
        s+=`<g data-k="${i}" class="clk" style="opacity:${f1(.3+.7*Math.min(1,pr*3))}">`;
        s+=`<rect x="${Lt.x0-4}" y="${f1(y-14)}" width="${Lt.x1-Lt.x0+8}" height="${f1(Lt.rh-2)}" rx="5" style="fill:${on?'var(--panel-2)':'transparent'};stroke:${on?'var(--ink)':'none'}"/>`;
        s+=`<text x="${Lt.x0+16}" y="${f1(y)}" class="t-lbl" style="font-weight:${on?800:600}">${f.n}</text>`;
        s+=`<rect x="${Lt.bar}" y="${f1(y-9)}" width="${f1(Math.max(1,f.p*Lt.bs*pr))}" height="9" rx="3" style="fill:${gc};opacity:${(i%2)?.72:1}"/>`;
        s+=`<text x="${Lt.x1}" y="${f1(y)}" class="t-sm t-end" style="fill:var(--ink)">${f.p}%</text></g>`;y+=Lt.rh});
    });
    svg.innerHTML=s;
    const p=phaseOf(PV_STEPS,t);setSt(p);$('#pvNote').innerHTML=noteHTML(PV_STEPS[p]);
  }
  function showFx(){
    const fx=$('#pvFx');
    if(sel<0){fx.innerHTML=`<div class="kicker">בחרו גורם</div><h4>הראיות שמאחורי כל פלח</h4><p>בחרו גורם סיכון מהגלגל, מהרשימה או מהכפתורים למעלה כדי לראות מה הוועדה והניסויים אומרים עליו.</p><div class="callout">${PV_CAVEAT}</div>`;return}
    const f=PV_F[sel],cls='tag';
    fx.innerHTML=`<div class="kicker">${PV_G[f.g][0]} · כ־${f.p}% מהמקרים במודל</div><h4>${f.n}</h4><p><span class="${cls}">${f.ev}</span></p><p>${f.txt}</p><div class="callout"><b>הסתייגות.</b> ${PV_CAVEAT}${f.n==='חוסר פעילות גופנית'?' <b>סיבתיות הפוכה:</b> כשנמדד 10 שנים או יותר לפני האבחנה, חוסר פעילות לא נמצא קשור לדמנציה (HR 1.01), מה שמרמז שחלק מהקשר משקף מחלה בשלב מוקדם. [[Kivimaki2019]]':''}</div>`;
  }
  function select(i){sel=sel===i?-1:i;$$('#pvBtns [data-pvf]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.pvf===sel));draw(+rg.value);showFx()}
  $('#pvBtns').innerHTML='<span class="kicker">ראיות לגבי</span>'+PV_F.map((f,i)=>`<button class="btn" data-pvf="${i}" aria-pressed="false">${f.n} · ${f.p}%</button>`).join('');
  $('#pvBtns').addEventListener('click',e=>{const b=e.target.closest('[data-pvf]');if(b)select(+b.dataset.pvf)});
  svg.addEventListener('click',e=>{const g=e.target.closest('[data-k]');if(g)select(+g.dataset.k)});
  const stop=playWire(rg,$('#pvPlay'),draw,14000,'הפעלה חוזרת','prevent');
  const setSt=stepWire($('#pvSteps'),PV_STEPS,rg,draw,stop);

  /* ---------- 2. trials forest plot ---------- */
  const tr=$('#pvTr'),trg=$('#pvTrT');
  const RAT=[
   {n:'preDIVA',d:'⁧טיפול וסקולרי, 6 שנים · HR לדמנציה⁩',e:.92,lo:.71,hi:1.19,s:.06,v:'אין השפעה ברורה',c:'var(--muted)'},
   {n:'SPRINT MIND',d:'⁧לחץ דם אינטנסיבי · HR לדמנציה⁩',e:.83,lo:.67,hi:1.04,s:.22,v:'לא מובהק',c:'var(--muted)'},
   {n:'SPRINT MIND',d:'⁧לחץ דם אינטנסיבי · HR ל־MCI⁩',e:.81,lo:.69,hi:.95,s:.28,v:'⁧פחות מקרי MCI⁩',c:'var(--sky)'},
   {n:'LIFE',d:'⁧פעילות גופנית, 2 שנים · OR ל־MCI או דמנציה⁩',e:1.08,lo:.8,hi:1.46,s:.6,v:'אין השפעה ברורה',c:'var(--muted)'},
   {n:'ACTIVE',d:'⁧אימון מהירות, 10 שנים · HR לדמנציה⁩',e:.71,lo:.5,hi:.998,s:.78,v:'גבולי',c:'var(--warn)'}
  ];
  const DIF=[
   {n:'FINGER',d:'רב־תחומי · ציון במבחן, לשנה',e:.022,lo:.002,hi:.042,s:.02,v:'תועלת קטנה',c:'var(--sky)'},
   {n:'US POINTER',d:'מובנה מול הנחיה עצמית · לשנה',e:.029,lo:.008,hi:.05,s:.12,v:'תועלת קטנה',c:'var(--sky)'},
   {n:'ACHIEVE',d:'⁧שמיעה · כולם, שינוי במשך 3 שנים⁩',e:.002,lo:-.077,hi:.081,s:.42,v:'אין השפעה ברורה',c:'var(--muted)'},
   {n:'ACHIEVE',d:'⁧שמיעה · תת־קבוצת ARIC⁩',e:.19,lo:.02,hi:.36,s:.48,v:'רק בתת־קבוצה',c:'var(--warn)'},
   {n:'⁧דיאטת MIND⁩',d:'⁧תזונה, 3 שנים · קוגניציה כללית⁩',e:.035,lo:-.022,hi:.092,s:.66,v:'אין השפעה ברורה',c:'var(--muted)'}
  ];
  function drawTr(t){
    const N=vb(tr,'720 520','400 750');
    const P=N?{x0:24,x1:376,lab:20}:{x0:270,x1:560,lab:20};
    const lgX=v=>P.x0+(P.x1-P.x0)*Math.log(v/.4)/Math.log(4),liX=v=>P.x0+(P.x1-P.x0)*(v+.1)/.5;
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    function block(rows,top,title,X,ticks,nullV,dir){
      const rh=N?58:34;
      s+=`<text x="${P.lab}" y="${top}" class="t-sm">${title}</text>`;
      const yA=top+14,yB=top+14+rows.length*rh+(N?6:4);
      ticks.forEach(v=>{s+=(N?'':`<path d="M${f1(X(v))} ${yA} V${yB}" class="grid"/>`)+`<text x="${f1(X(v))}" y="${yB+14}" class="t-xs t-mid">${v}</text>`});
      if(N){rows.forEach((r,i)=>{const py=yA+i*rh+36;ticks.forEach(v=>{s+=`<path d="M${f1(X(v))} ${py-5} V${py+5}" class="grid"/>`});s+=`<path d="M${f1(X(nullV))} ${py-7} V${py+9}" style="stroke:var(--ink);stroke-width:1.4;stroke-dasharray:4 3"/>`});
        s+=`<path d="M${f1(X(nullV))} ${yB-6} V${yB+2}" style="stroke:var(--ink);stroke-width:1.4"/>`}
      else s+=`<path d="M${f1(X(nullV))} ${yA-4} V${yB+2}" style="stroke:var(--ink);stroke-width:1.4;stroke-dasharray:5 4"/>`;
      s+=`<text x="${f1(X(nullV)+(dir<0?-6:6))}" y="${yB+30}" class="t-xs ${dir<0?'t-end':''}" style="fill:var(--ink)">${dir<0?'← פחות מקרים':'טוב יותר →'}</text>`;
      rows.forEach((r,i)=>{const p=ease(ramp(t,r.s,r.s+.08)),o=ramp(t,r.s-.01,r.s+.02),yb=yA+i*rh;
        const py=N?yb+36:yb+16;
        s+=`<g style="opacity:${f1(.18+.82*o)}">`;
        if(N){s+=`<text x="${P.lab}" y="${yb+12}" class="t-lbl">${r.n}</text><text x="380" y="${yb+12}" class="t-xs t-end" style="fill:${o>0?r.c:'var(--muted)'};font-weight:700">${p>.9?r.v:''}</text><text x="${P.lab}" y="${yb+25}" class="t-xs">${r.d}</text>`}
        else{s+=`<text x="${P.lab}" y="${py-2}" class="t-lbl">${r.n}</text><text x="${P.lab}" y="${py+10}" class="t-xs">${r.d}</text>`;if(p>.9)s+=`<text x="580" y="${py+4}" class="t-xs" style="fill:${r.c};font-weight:700">${r.v}</text>`}
        if(p>0){const e=lerp(nullV,r.e,p),lo=lerp(nullV,r.lo,p),hi=lerp(nullV,r.hi,p);
          s+=`<path d="M${f1(X(lo))} ${py} H${f1(X(hi))} M${f1(X(lo))} ${py-4} v8 M${f1(X(hi))} ${py-4} v8" style="stroke:${r.c};stroke-width:2.2"/>`;
          s+=`<rect x="${f1(X(e)-5)}" y="${py-5}" width="10" height="10" transform="rotate(45 ${f1(X(e))} ${py})" style="fill:${r.c};stroke:var(--panel);stroke-width:1"/>`;
          if(p>.9){const lab=(dir<0?r.e:(r.e>=0?'+':'')+r.e);s+=`<text x="${f1(Math.max(X(r.hi),X(nullV))+6)}" y="${py+4}" class="t-xs" style="fill:var(--ink)">${lab}</text>`}}
        s+='</g>'});
      return yB+44}
    const yNext=block(RAT,N?24:26,N?'⁧יחסים: מתחת ל־1 = פחות מקרים⁩':'⁧יחס סיכונים / יחס סיכויים לדמנציה או ל־MCI (מתחת ל־1 = פחות מקרים)⁩',lgX,[.4,.5,.7,1,1.4],1,-1);
    block(DIF,yNext+(N?12:6),N?'⁧שינוי קוגניטיבי: מעל 0 = טוב יותר⁩':'⁧הבדל בשינוי הקוגניטיבי, ביחידות SD או z (מעל 0 = טוב יותר)⁩',liX,[-.1,0,.1,.2,.3,.4],0,1);
    tr.innerHTML=s;
    const p=phaseOf(PV_TR,t);setTr(p);$('#pvTrNote').innerHTML=noteHTML(PV_TR[p]);
  }
  const stopTr=playWire(trg,$('#pvTrPlay'),drawTr,15000,'הפעלה חוזרת','prevent');
  const setTr=stepWire($('#pvTrSteps'),PV_TR,trg,drawTr,stopTr);

  /* ---------- 3. cards ---------- */
  const rd=`<svg viewBox="0 0 300 120" role="img" aria-label="רציפות רגרסיה (regression discontinuity): שיעור ההתחסנות נגד שלבקת חוגרת בוויילס קופץ מכמעט אפס ל־47.2 אחוז בתאריך הלידה הקובע, 2 בספטמבר 1933."><rect width="300" height="120" rx="8" style="fill:var(--field)"/><path d="M30 96 H284 M30 14 V96" class="axis" style="fill:none"/><path d="M150 10 V100" style="stroke:var(--warn);stroke-dasharray:4 3"/><path d="M34 95 H150" style="stroke:var(--muted);stroke-width:3"/><path d="M150 57 H280" style="stroke:var(--sky);stroke-width:3"/><text x="146" y="22" class="t-xs t-end" style="fill:var(--warn)">⁧נולדו ב־2 בספט׳ 1933⁩</text><text x="40" y="88" class="t-xs">⁧0.01% חוסנו⁩</text><text x="156" y="44" class="t-xs" style="fill:var(--sky)">⁧47.2% חוסנו⁩</text><text x="156" y="112" class="t-xs">זכאים →</text><text x="34" y="112" class="t-xs">← לא זכאים</text></svg>`;
  const fr=`<svg viewBox="0 0 300 120" role="img" aria-label="שיעור ההיארעות של דמנציה בפרמינגהם ירד מ־3.6 ל־2.0 ל־100 אנשים במשך 5 שנים, בין סוף שנות ה־1970 לסוף שנות ה־2000."><rect width="300" height="120" rx="8" style="fill:var(--field)"/><rect x="40" y="24" width="70" height="72" rx="4" style="fill:var(--rose)"/><rect x="170" y="56" width="70" height="40" rx="4" style="fill:var(--sage)"/><path d="M24 96 H276" class="axis" style="fill:none"/><text x="75" y="18" class="t-lbl t-mid">3.6</text><text x="205" y="50" class="t-lbl t-mid">2.0</text><text x="75" y="110" class="t-xs t-mid">⁧סוף שנות ה־1970⁩</text><text x="205" y="110" class="t-xs t-mid">⁧סוף שנות ה־2000⁩</text><text x="140" y="70" class="t-xs t-mid" style="fill:var(--good)">−44%</text></svg>`;
  $('#pvCards').innerHTML=`
   <div class="card"><span class="ev early">ראיות ראשוניות</span><h4>החיסון לשלבקת חוגרת: ניסויי טבע</h4>${rd}<p>בוויילס, הזכאות לחיסון החי נגד שלבקת חוגרת נקבעה לפי תאריך הלידה. בהשוואה בין אנשים שנולדו ממש לפני ומיד אחרי התאריך הקובע, החיסון הפחית אבחנות חדשות של דמנציה במשך 7 שנים ב־3.5 נקודות אחוז (רווח סמך 95%: 0.6 עד 7.1), הפחתה יחסית של 20%. מערכי מחקר דומים מצאו שהזכאות הפחיתה אבחנות חדשות ב־1.8 נקודות באוסטרליה (במשך 7.4 שנים) וב־2.0 בקנדה (במשך 5.5 שנים). ניתוחי המשך מוויילס מדווחים גם על פחות אבחנות של MCI.‏ [[Eyting2025,Pomirchy2025,Pomirchy2026,Xie2025]]</p><p>ניסויי הטבע האלה פחות חשופים לגורמים מערפלים מאשר קוהורטים רגילים, אבל אף ניסוי אקראי לא בדק את החיסון למניעת דמנציה, ומחקר רשומות על החיסון הרקומביננטי החדש יותר הוא תצפיתי. הוועדה מציינת שהקשרים לחיסונים "עשויים לנבוע בחלקם מגורמים מערפלים". [[Taquet2024,Eyting2025,Livingston2024]]</p></div>
   <div class="card"><span class="ev est">מבוסס</span><h4>הסיכון לפי גיל יורד</h4>${fr}<p>בפרמינגהם, שיעור ההיארעות של דמנציה במשך 5 שנים (ל־100 אנשים בני 60 ומעלה, מתוקנן לגיל ולמין) ירד ב־44% במשך שלושה עשורים, רק בקרב אנשים עם תעודת בגרות או השכלה גבוהה יותר. קוהורטים מאוחדים בארה"ב ובאירופה מראים ירידה של 13% לכל עשור בין 1988 ל־2015, חדה יותר בגברים (24%) מאשר בנשים (8%). [[Satizabal2016,Wolters2020]]</p><p>מספר האנשים עם דמנציה ממשיך לעלות כי האוכלוסיות מזדקנות. הוועדה מקשרת חלק מהירידה לפחות מחלות כלי דם. [[Livingston2024]]</p></div>
   <div class="card"><span class="tag warn">מחלוקת</span><h4>WHO 2019 מול ועדת הלנסט</h4><p>ה־WHO לא נתן המלצה בנושא ירידה בשמיעה, דיכאון או פעילות חברתית, כי הראיות מניסויי התערבות לא הספיקו. הוועדה דירגה מאוחר יותר את הראיות לגבי שמיעה ו־LDL כחזקות יותר, והציבה אותם בראש הרשימה שלה. זה הבדל אמיתי באופן שבו שני הגופים שוקלים ראיות, לא טעות דפוס אצל אחד מהם. [[Chowdhary2021,Livingston2024]]</p><div class="hook"><b>לבחינה</b>ה־WHO ממליץ ב־2019 בתוקף שלא להשתמש בתוספי ויטמין B,‏ E,‏ PUFA ובתוספים מרובי רכיבים כדי להפחית את הסיכון לדמנציה. [[Chowdhary2021]]</div></div>
   <div class="card"><h4>בקצרה</h4><div class="pt"><b>במילים פשוטות</b>דברים רבים שקשורים לדמנציה, כמו ירידה בשמיעה, כולסטרול גבוה, לחץ דם גבוה, עישון ובדידות, ראויים לטיפול גם למען הבריאות הכללית. ניסויים ששינו אחד מהם הראו עד כה בעיקר השפעות קטנות או שום השפעה על דמנציה. שום דבר לא הוכח כמונע אלצהיימר.</div></div>`;
  draw(+rg.value);showFx();drawTr(+trg.value);
};
