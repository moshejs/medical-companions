/* =============== 1.1 what FMF is =============== */
const WH_POPS=[
 {id:'iraqi',n:'יהודים יוצאי עיראק',c:29,
  txt:'יהודים יוצאי עיראק: 29% נשאים בסקר ישראלי שבדק שלושה וריאנטים (קוגן 2001); 1 מכל 3.5 בפאנל של ארבעה וריאנטים (גרשוני-ברוך 2001). הווריאנט העיקרי כאן הוא V726A (12.8% נושאים אותו). [[Kogan2001,GershoniBaruch2001]]',
  obs:[{l:'2 וריאנטים, בריאים',v:25,c:'פנוטיפ III, 1 מכל 25 [[Kogan2001]]'},{l:'FMF, אזור אנדמי',r:[500,1000],c:'FMF בארצות אנדמיות, 1:500 עד 1:1,000 (נתון אזורי, לא ספציפי לקבוצה הזו) [[Tufan2020]]'}]},
 {id:'moroc',n:'יהודים יוצאי מרוקו / צפון אפריקה',c:21,
  txt:'יהודים יוצאי מרוקו: 21% באותו פאנל של שלושה וריאנטים (קוגן 2001) ו־1 מכל 4.7 בפאנל של ארבעה וריאנטים (גרשוני-ברוך 2001). הווריאנט השולט הוא M694V (11.1% נושאים אותו), ו־V726A אינו נמצא כלל. סקירה אחת מציינת 1 מכל 3.5. [[Kogan2001,GershoniBaruch2001,Lancieri2023]]',
  obs:[{l:'FMF, אזור אנדמי',r:[500,1000],c:'FMF בארצות אנדמיות, 1:500 עד 1:1,000 (נתון אזורי) [[Tufan2020]]'}]},
 {id:'ashk',n:'יהודים אשכנזים',c:21,
  txt:'יהודים אשכנזים: כ־21% מתוך כ־200 דגימות אנונימיות נשאו וריאנט, בעיקר E148Q, עם עדות לחדירות מופחתת; סקרים אחרים מצאו 14% בפאנל של שלושה וריאנטים ו־1 מכל 4.5 בפאנל של ארבעה וריאנטים. מבחינה קלינית FMF נדירה אצלם הרבה יותר מאשר אצל יהודים יוצאי צפון אפריקה ויוצאי עיראק. [[Aksentijevich1999,Kogan2001,GershoniBaruch2001]]',
  obs:[{l:'2 וריאנטים, בריאים',v:300,c:'פנוטיפ III, 1 מכל 300 [[Kogan2001]]'}],none:'⁧FMF: נדירה בהרבה, אין נתון⁩'},
 {id:'arab',n:'ערבים מוסלמים בישראל',c:23,
  txt:'ערבים מוסלמים בישראל: 1 מכל 4.3 נשאים בפאנל של ארבעה וריאנטים; V726A אצל 7.3%, M694V אצל 0.6%. [[GershoniBaruch2001]]',
  obs:[{l:'FMF, אזור אנדמי',r:[500,1000],c:'FMF בארצות אנדמיות, 1:500 עד 1:1,000 (נתון אזורי) [[Tufan2020]]'}]},
 {id:'armen',n:'ארמנים',c:20,
  txt:'ארמנים: כ־1 מכל 5 לפי סקירה עדכנית. מחקר סגרגציה ישן יותר, מהתקופה שלפני הבדיקות המולקולריות, ב־64 משפחות ארמניות־אמריקאיות, העריך שכיחות גן של 0.073, כלומר כ־1 נשא מכל 7. [[Lancieri2023,Rogers1989]]',
  obs:[{l:'FMF, אזור אנדמי',r:[500,1000],c:'FMF בארצות אנדמיות, 1:500 עד 1:1,000 (נתון אזורי) [[Tufan2020]]'}]},
 {id:'turk',n:'טורקים',c:20,
  txt:'טורקים בריאים: 20% נושאים אחד מחמישה וריאנטים שכיחים: E148Q אצל 12%, M680I אצל 5%, M694V אצל 3%, V726A אצל 2%. E148Q שכיח אצל אנשים בריאים, אבל הוא רק 3.6% מהאללים של החולים, סימן לחדירות נמוכה. [[Yilmaz2001]]',
  obs:[{l:'FMF, סיוואס',v:395,c:'FMF בסיוואס שבמרכז אנטוליה, 1 מכל 395 (סקר מבית לבית) [[Onen2004]]'},{l:'FMF, טורקיה',v:1000,c:'טורקיה כולה, כ־0.1% [[Onen2004]]'}]},
 {id:'greek',n:'יוונים',c:.7,
  txt:'יוונים: רק 0.7% מתוך 140 יוונים בריאים היו נשאים, אף שחולים יוונים נושאים בעיקר M694V, M680I ו־V726A. [[Giaglis2007]]',
  obs:[],none:'לא נמצא נתון שכיחות'},
 {id:'pool',n:'מטה-אנליזה משולבת',c:18.6,
  txt:'מטה-אנליזה של 16,756 כרומוזומים מ־14 אוכלוסיות: שיעור נשאות ממוצע של 0.186, הגבוה ביותר אצל ערבים, ארמנים, יהודים וטורקים. [[Papadopoulos2008]]',
  obs:[{l:'FMF, אזור אנדמי',r:[500,1000],c:'FMF בארצות אנדמיות, 1:500 עד 1:1,000 [[Tufan2020]]'}]}
];
const WH_STEPS=[
 {from:0,at:.45,k:'שלב 1 · נשאים',t:'עותק אחד שונה, בלי מחלה',
  txt:'במקומות שבהם FMF שכיחה, בערך 1 מכל 5 אנשים נושא וריאנט אחד של MEFV. מטה-אנליזה של 16,756 כרומוזומים מ־14 אוכלוסיות מצאה שיעור נשאות ממוצע של 0.186. נשאים הם בדרך כלל בריאים, כי FMF היא בצורתה הקלאסית מחלה בתורשה רצסיבית. [[Papadopoulos2008,GeneReviews]]',
  pt:'אנשים רבים נושאים עותק אחד שונה של הגן של FMF בלי לדעת זאת. עותק אחד לבדו בדרך כלל אינו גורם למחלה.',
  hook:'שיעורי הנשאות של MEFV באוכלוסיות של יהודים, ערבים, ארמנים וטורקים (כ־10% ויותר) גבוהים בהרבה משיעור הנשאים של סיסטיק פיברוזיס בקרב צפון אמריקאים ממוצא אירופי (כ־4%). [[Park2020]]'},
 {from:.5,at:.72,k:'שלב 2 · שני נשאים',t:'1 מכל 4 ילדים יורש שני וריאנטים',
  txt:'כששני ההורים נושאים וריאנט אחד, לכל ילד יש סיכוי של 1 ל־4 לרשת שני וריאנטים (אחד מכל הורה), סיכוי של 1 ל־2 להיות נשא, וסיכוי של 1 ל־4 לא לרשת אף אחד. [[GeneReviews]] <a href="#gene" data-go="gene">הפרק הבא</a> מציג זאת בהנפשה כטבלת פאנט.',
  pt:'לכל ילד של שני נשאים יש סיכוי של אחד לארבעה לקבל את שני העותקים השונים.',
  hook:'תורשה אוטוזומלית רצסיבית: <b>25% / 50% / 25%</b> בכל היריון, ללא תלות בילדים קודמים.'},
 {from:.75,at:.97,k:'שלב 3 · תחזית מול מציאות',t:'פחות אנשים חולים ב־FMF ממה שצפוי',
  txt:'העלאה בריבוע של חצי משיעור הנשאות נותנת הערכה פשטנית של מספר הלידות עם שני וריאנטים. FMF בפועל נדירה יותר: כ־1:500 עד 1:1,000 בארצות אנדמיות, ו־1:395 בשיא, בסיוואס שבטורקיה. שני דברים מסבירים את הפער. החדירות מופחתת, במיוחד ב־E148Q. ו"פנוטיפ III", שני וריאנטים בלי מחלה, נמצא אצל 1 מכל 25 יהודים יוצאי עיראק ו־1 מכל 300 יהודים אשכנזים: פי 40 עד 240 משיעור ה־FMF הגלויה בקבוצות האלה. [[Tufan2020,Onen2004,Touitou2001,Kogan2001]]',
  pt:'שני וריאנטים מעלים מאוד את הסיכוי ל־FMF, אבל אינם מבטיחים אותה.',
  hook:'<b>פנוטיפ III</b> = שני וריאנטים של MEFV, בלי תסמינים, בלי עמילואידוזיס. E148Q הוא הווריאנט הקל ביותר, בעל החדירות הנמוכה ביותר. [[SorianoManna2012,Touitou2001]]'}
];
const WH_SEL=[
 {from:0,at:.04,k:'לפני כ־2,100–2,200 שנה',t:'וריאנט חדש מופיע',
  txt:'<span class="ev est">מבוסס</span> הווריאנטים עתיקים. כרומוזומים של נשאים מאוכלוסיות "שהופרדו במשך מאות שנים" חולקים את אותו רצף DNA סביב הווריאנט. תיארוך של 4,626 הפלוטיפים מ־2,313 אנשים בטורקיה מיקם את M694V בגיל של כ־2,108 שנים לפי מודל מרקוב חבוי (HMM; רווח סמך 95%: 1,798–2,501), ואת V726A בגיל של כ־2,192 שנים (1,826–2,754). שיטת Gamma באותו מאמר תיארכה את האב המשותף הקרוב ביותר לזמן מוקדם יותר, כ־3,541 שנים ל־M694V ו־3,372 שנים ל־V726A, כך ש"בן כמה" תלוי בשיטה. [[IntFMF1997,Park2020]]',
  pt:'כל וריאנט שכיח של FMF התחיל פעם אחת, באדם אחד, לפני יותר מאלפיים שנה.',
  hook:'הפלוטיפים משותפים פירושם וריאנטים <b>מייסדים</b>. חמישה מייסדים (M694V, V726A, M694I, M680I, E148Q) מסבירים כ־74% מהכרומוזומים עם FMF אצל חולים טיפוסיים. [[Touitou2001]]'},
 {from:.15,at:.26,k:'0–540 לספירה',t:'עלייה איטית ובלתי נראית',
  txt:'<span class="ev early">ראיות ראשוניות</span> פארק (Park) ועמיתיו מצאו מקטעי DNA ארוכים ורציפים סביב M694V ו־V726A (הומוזיגוטיות מורחבת של ההפלוטיפ), סימן היכר של ברירה חיובית חזקה ומאוחרת יחסית. סביב E148Q לא נמצא אות כזה. מקדמי הברירה שהעריכו היו 0.077 ל־M694V ו־0.068 ל־V726A לכל דור. ברירה קבועה מכפילה וריאנט נדיר בגורם קבוע בכל דור, וזה קו ישר בסקאלה הלוגריתמית הזו. [[Park2020]]',
  pt:'נראה שלנשאים היו מעט יותר ילדים ששרדו, דור אחרי דור.',
  hook:'אות ברירה: <b>M694V ו־V726A כן, E148Q לא</b>.'},
 {from:.335,at:.37,k:'541 לספירה',t:'מגפת יוסטיניאנוס',
  txt:'<span class="ev early">מתיישב עם הנתונים, לא מוכח</span> פארק ועמיתיו קושרים את תזמון הברירה למגפות הדבר, החל במגפת יוסטיניאנוס משנת 541 לספירה. המנגנון המוצע: חיידק הדבר <i>Yersinia pestis</i> משתמש בחלבון אפקטור, YopM, כדי לשמור על הפירין כבוי. פירין עם וריאנט FMF נקשר ל־YopM בזיקה חלשה יותר, ולכן תאי דם לבנים של חולים, ואפילו של נשאים, משחררים יותר IL-1β כשהם מודבקים. [[Park2020]]',
  pt:'לחיידק הדבר יש תכסיס לכיבוי הפירין. פירין מסוג FMF עמיד חלקית לתכסיס הזה.',
  hook:'YopM מדכא את הפירין. פירין של FMF חומק מ־YopM, ונותן יותר IL-1β נגד <i>Y. pestis</i>.'},
 {from:.70,at:.73,k:'1347 לספירה',t:'המוות השחור',
  txt:'<span class="ev early">ראיות ראשוניות</span> המגפה השנייה החלה עם המוות השחור ב־1347 לספירה. עכברים שנשאו את פירין ה־M680I בטכניקת knock-in בשני העותקים שרדו הדבקה ב־<i>Y. pestis</i> טוב יותר מעכברים עם מקטע B30.2 אנושי תקין, וההגנה אבדה בהיעדר הקולטן ל־IL-1. ניסוי ההישרדות נעשה בהומוזיגוטים, לא בנשאים. עם חיידקים חסרי YopM נעלם ההבדל בין תאים עם הווריאנט לתאים תקינים. [[Park2020]]',
  pt:'ניסויים בבעלי חיים ובתאים מתיישבים עם הרעיון, אבל אי אפשר להריץ את ההיסטוריה מחדש כדי להוכיח אותו.',
  hook:'יתרון ההטרוזיגוט: עותק אחד אולי עוזר נגד זיהום, שני עותקים גורמים למחלה.'},
 {from:.88,at:1,k:'היום',t:'נשאים הם שכיחים',
  txt:'שכיחות ההטרוזיגוטים באוכלוסיות של יהודים, ערבים, ארמנים וטורקים היא כ־10% לפי הסיכום של פארק ועמיתיו, ואילו המטה-אנליזה המשולבת נותנת ממוצע של 18.6%; הנתון תלוי באילו וריאנטים נבדקו. לנשאים בריאים יש רמות בסיס ושיא מעט גבוהות יותר של CRP ושל SAA מאשר ללא־נשאים, מצב "פרו־דלקתי" שהוצע כמסייע להגנה של הגוף מפני זיהומים. [[Park2020,Papadopoulos2008,Lachmann2006]]',
  pt:'היום אנשים רבים נושאים עותק אחד. ייתכן שבעבר זה היה יתרון קטן.',
  hook:'תוויות הראיות: ברירה בידי מגפת הדבר היא <b>ראיות ראשוניות</b> (מתיישב עם הנתונים, לא מוכח). עמידות לשחפת היא <b>השערה</b>.'}
];
const WH_SITES=[
 {id:'perit',n:'דלקת הצפק',v:93.7,txt:'כאב בטן פתאומי שיכול להיראות בדיוק כמו מצב חירום כירורגי, עם התגוננות (guarding) ורגישות בהרפיה (rebound). הוא חולף לגמרי תוך 24–72 שעות. חולים רבים עברו כריתות תוספתן או ניתוחי בטן פתוחים (לפרוטומיה) מיותרים. [[Tufan2020]]'},
 {id:'fever',n:'חום',v:92.5,txt:'מתחיל בפתאומיות ומגיע לשיא תוך שעות. הוא יכול להופיע לבדו, ובילדים צעירים הוא יכול להתבטא כחום ממקור לא ידוע. [[Tufan2020]]'},
 {id:'arth',n:'דלקת פרקים',v:47.4,txt:'בדרך כלל במפרק גדול אחד ברגל: ברך, קרסול או ירך. נוזל המפרק סטרילי אבל דלקתי, ולכן המצב יכול לחקות דלקת פרקים זיהומית (ספטית). הוא חולף תוך כשבוע; דלקת פרקים ממושכת מופיעה בפחות מ־5%. [[Tufan2020]]'},
 {id:'myal',n:'כאבי שרירים',v:39.6,txt:'לרוב כאב בשוקיים במאמץ, אחרי עמידה ממושכת או נסיעה, שכיח יותר עם M694V. מיאלגיה ממושכת עם חום (protracted febrile myalgia) היא צורה נדירה וקשה יותר, שנמשכת שבועות ומגיבה לקורטיקוסטרואידים. [[Tufan2020,Langevitz1994]]'},
 {id:'pleur',n:'דלקת קרום הריאה',v:31.2,txt:'כאב פתאומי בצד אחד של בית החזה בזמן נשימה. ייתכן תפליט קטן. הוא חולף תוך 1–3 ימים. [[Tufan2020]]'},
 {id:'ele',n:'אודם דמוי שושנה',v:20.9,txt:'נגע אדום ורגיש, בדרך כלל בשוק, בקרסול או בגב כף הרגל, לעתים קרובות אחרי הליכה ממושכת. בקבוצת ילדים אחת הוא נמצא קשור לדלקת פרקים ולהומוזיגוטיות ל־M694V. [[Tufan2020,GezginYildirim2020]]'},
 {id:'peric',n:'דלקת קרום הלב',v:1.4,txt:'נדירה. בישראל, 27 מתוך כ־4,000 חולים במשך 20 שנה, ועדיין בערך פי עשרה משיעור הרקע. ההתקפים נמשכו בממוצע 4.2 ימים, בלי נזק מתמשך. [[Kees1997,Tunca2005]]'}
];
inits.what=()=>{
  /* ---------- 1. carriers dot grid ---------- */
  const svg=$('#whSvg'),rg=$('#whT');let pop=WH_POPS[0];
  const order=(()=>{const r=rng(16),a=[...Array(100).keys()];for(let i=99;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a})();
  const person=(x,y,sc,fill,half)=>{
    const id='whc'+Math.round(x)+'_'+Math.round(y);
    let g=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${sc})">`;
    if(half){g+=`<defs><clipPath id="${id}"><rect x="-8" y="-16" width="8" height="28"/></clipPath></defs>`;
      g+=`<circle cy="-9" r="4.2" style="fill:var(--line)"/><path d="M-6 8v-5a6 6 0 0 1 12 0v5z" style="fill:var(--line)"/>`;
      g+=`<g clip-path="url(#${id})"><circle cy="-9" r="4.2" style="fill:var(--terra)"/><path d="M-6 8v-5a6 6 0 0 1 12 0v5z" style="fill:var(--terra)"/></g>`}
    else g+=`<circle cy="-9" r="4.2" style="fill:${fill}"/><path d="M-6 8v-5a6 6 0 0 1 12 0v5z" style="fill:${fill}"/>`;
    return g+'</g>'};
  const oneIn=n=>{if(n<1000)return Math.round(n).toLocaleString('en-US');const p=Math.pow(10,Math.floor(Math.log10(n))-1);return (Math.round(n/p)*p).toLocaleString('en-US')};
  function draw(t){
    /* narrow: the grid, the family and the prevalence scale stack in one column */
    const N=vb(svg,'720 420','400 896');
    const L=N
      ? {tx:20,ty:22, gx:36,gdx:36,gy:60,gdy:30, bigY:366,subY:386, div:'M20 404H380',
         famTx:20,famTy:432, paX:[130,270],paY:486,carY:522,
         conn:'M155 482H245M200 482V546M46 546H352', kidX:[46,148,250,352], stemY:[546,558],
         kidY:588,kidLab:618,ringY:581, oddX:46,oddY:646,oddY2:660,
         l3x:20,l3y:700, AX0:56,AX1:370, gTop:716, axY:846, tickY:862, rarerY:878,
         rowY:i=>740+i*40, noneY:i=>740+i*40-14}
      : {tx:30,ty:34, gx:46,gdx:26,gy:78,gdy:29, bigY:378,subY:398, div:'M318 40V400',
         famTx:336,famTy:34, paX:[430,560],paY:96,carY:132,
         conn:'M455 92H535M495 92V150M372 150H582', kidX:[372,442,512,582], stemY:[150,162],
         kidY:192,kidLab:222,ringY:185, oddX:614,oddY:186,oddY2:202,
         l3x:336,l3y:252, AX0:465,AX1:665, gTop:266, axY:370, tickY:386, rarerY:402,
         rowY:i=>i?288+i*30:286, noneY:i=>288+i*30+4};
    const lx=n=>lerp(L.AX0,L.AX1,(Math.log10(n)-1)/4);
    const c=pop.c,nLit=c>=1?Math.round(c*ramp(t,.03,.46)):(t>.3?1:0);
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    s+=`<text x="${L.tx}" y="${L.ty}" class="t-lbl">⁧100 אנשים · ${pop.n}⁩</text>`;
    for(let i=0;i<100;i++){const k=order.indexOf(i),r=Math.floor(i/10),q=i%10,x=L.gx+q*L.gdx,y=L.gy+r*L.gdy;
      const lit=k<nLit;s+=person(x,y,1,lit?'var(--terra)':'var(--line)');
      if(lit&&k===nLit-1&&t<.48)s+=`<circle cx="${x}" cy="${y-2}" r="13" style="fill:none;stroke:var(--terra);stroke-width:1.5;opacity:.6"/>`}
    const shown=c>=1?nLit:(nLit?.7:0);
    s+=`<text x="${L.tx}" y="${L.bigY}" class="t-big" style="fill:var(--terra)">⁧${c>=1?shown:(nLit?'0.7':'0')} ${c>=1?'נשאים מתוך 100':'נשאים מתוך 100'}⁩</text>`;
    s+=`<text x="${L.tx}" y="${L.subY}" class="t-sm">⁧${nLit?'בערך 1 מתוך '+(100/c<10?f1(100/c):Math.round(100/c)):'נושאים וריאנט אחד של MEFV'}${c<1&&nLit?' (מוצג כדמות 1)':''}⁩</text>`;
    s+=`<path d="${L.div}" class="axis"/>`;
    /* layer 2: family */
    const o2=ramp(t,.5,.56);
    if(o2>0){s+=`<g style="opacity:${f1(o2)}"><text x="${L.famTx}" y="${L.famTy}" class="t-lbl">אם לשני נשאים יש ילדים</text>`;
      s+=person(L.paX[0],L.paY,2,'',true)+person(L.paX[1],L.paY,2,'',true);
      s+=`<text x="${L.paX[0]}" y="${L.carY}" class="t-xs t-mid">נשא</text><text x="${L.paX[1]}" y="${L.carY}" class="t-xs t-mid">נשא</text>`;
      s+=`<path d="${L.conn}" style="fill:none;stroke:var(--muted);stroke-width:1.4"/>`;
      const kids=[['VV','⁧2 וריאנטים⁩'],['V+','נשא'],['+V','נשא'],['++','ללא וריאנט']];
      kids.forEach(([g,l],i)=>{const o=ramp(t,.56+i*.035,.6+i*.035);if(o<=0)return;const x=L.kidX[i];
        s+=`<g style="opacity:${f1(o)}"><path d="M${x} ${L.stemY[0]}V${L.stemY[1]}" style="stroke:var(--muted);stroke-width:1.4"/>`;
        s+=g==='VV'?person(x,L.kidY,1.6,'var(--terra)'):g==='++'?person(x,L.kidY,1.6,'var(--line)'):person(x,L.kidY,1.6,'',true);
        s+=`<text x="${x}" y="${L.kidLab}" class="t-xs t-mid" ${g==='VV'?'style="fill:var(--terra);font-weight:700"':''}>${l}</text></g>`});
      const o3=ramp(t,.7,.74);
      if(o3>0)s+=`<g style="opacity:${f1(o3)}"><circle cx="${L.kidX[0]}" cy="${L.ringY}" r="24" style="fill:none;stroke:var(--terra);stroke-width:2;stroke-dasharray:4 3"/><text x="${L.oddX}" y="${L.oddY}" class="t-big${N?' t-mid':''}">⁧1 מתוך 4⁩</text><text x="${L.oddX}" y="${L.oddY2}" class="t-xs${N?' t-mid':''}">לכל ילד</text></g>`;
      s+='</g>'}
    /* layer 3: predicted vs observed, log axis */
    const o4=ramp(t,.75,.8);
    if(o4>0){const pred=1/Math.pow(c/200,2),slide=ease(ramp(t,.78,.9));
      s+=`<g style="opacity:${f1(o4)}"><text x="${L.l3x}" y="${L.l3y}" class="t-lbl">⁧כמה שכיח? 1 מתוך N, סקאלה לוגריתמית⁩</text>`;
      s+=`<line x1="${L.AX0}" y1="${L.axY}" x2="${L.AX1}" y2="${L.axY}" style="stroke:var(--muted);stroke-width:1.2"/>`;
      [[10,'1:10'],[100,'1:100'],[1e3,'1:1k'],[1e4,'1:10k'],[1e5,'1:100k']].forEach(([n,l])=>{const x=lx(n);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${L.gTop}" y2="${L.axY}" class="grid"/><text x="${f1(x)}" y="${L.tickY}" class="t-xs t-mid">${l}</text>`});
      s+=`<text x="${L.AX1}" y="${L.rarerY}" class="t-xs t-end">נדיר יותר →</text>`;
      /* narrow has no room for a label column beside the axis: the row label and its
         value share one line above the marker instead */
      const row=(y,lab,col,val)=>N
        ? `<text x="${L.l3x}" y="${y-14}" class="t-sm" style="fill:${col}">⁧${lab} · ${val}⁩</text>`
        : `<text x="${L.l3x}" y="${y+4}" class="t-sm" style="fill:${col}">⁧${lab}⁩</text>`;
      const val=(y,x,col,v)=>N?'':`<text x="${f1(x)}" y="${y-10}" class="t-xs t-mid" style="fill:${col};font-weight:700">${v}</text>`;
      const py=L.rowY(0),pv='1:'+oneIn(pred);
      s+=row(py,'צפוי (הערכה)','var(--sea)',pv);
      const px=lerp(L.AX0,lx(pred),slide);
      s+=`<path d="M${f1(px)} ${py-7}l7 7-7 7-7-7z" style="fill:var(--sea)"/>`+val(py,px,'var(--sea)',pv);
      pop.obs.forEach((ob,i)=>{const y=L.rowY(i+1),ov=ob.r?`1:${ob.r[0]}–1:1,000`:'1:'+oneIn(ob.v);
        s+=row(y,ob.l,'var(--terra)',ov);
        if(ob.r){const xa=lerp(L.AX0,lx(ob.r[0]),slide),xb=lerp(L.AX0,lx(ob.r[1]),slide);s+=`<rect x="${f1(xa-4)}" y="${y-5}" width="${f1(xb-xa+8)}" height="10" rx="5" style="fill:var(--terra);opacity:.85"/>`+val(y,(xa+xb)/2,'var(--terra)',ov)}
        else{const x=lerp(L.AX0,lx(ob.v),slide);s+=`<circle cx="${f1(x)}" cy="${y}" r="6" style="fill:var(--terra)"/>`+val(y,x,'var(--terra)',ov)}});
      if(pop.none)s+=`<text x="${L.l3x}" y="${L.noneY(pop.obs.length+1)}" class="t-sm">${pop.none}</text>`;
      s+='</g>'}
    svg.innerHTML=s;
    const p=phaseOf(WH_STEPS,t);setSt(p);$('#whNote').innerHTML=noteHTML(WH_STEPS[p]);
  }
  function readout(){const pred=1/Math.pow(pop.c/200,2);
    $('#whRead').innerHTML=`<span>${pop.txt}</span><span>הערכה פשוטה של לידות עם שני וריאנטים, בהנחה של בחירת בני זוג אקראית ובהתעלמות מהחדירות: ⁦(${f1(pop.c)}% ÷ 2)²⁩ ≈ <b>1 מתוך ${oneIn(pred)}</b>.</span>`+(pop.obs.length?`<span>נצפה: ${pop.obs.map(o=>o.c).join('; ')}.</span>`:'')}
  const stop=playWire(rg,$('#whPlay'),draw,16000,'הפעלה חוזרת','what');
  const setSt=stepWire($('#whSteps'),WH_STEPS,rg,draw,stop);
  $('#whPops').innerHTML=WH_POPS.map((p,i)=>`<button class="btn" data-pop="${i}" aria-pressed="${i===0}">${p.n}</button>`).join('');
  $('#whPops').addEventListener('click',e=>{const b=e.target.closest('[data-pop]');if(!b)return;pop=WH_POPS[+b.dataset.pop];
    $$('[data-pop]',$('#whPops')).forEach(x=>x.setAttribute('aria-pressed',x===b));readout();draw(+rg.value)});
  readout();draw(+rg.value);

  /* ---------- 2. heterozygote advantage ---------- */
  const sv=$('#whSel'),rs=$('#whSelT');
  const Y0=-200,Y1=2000,L0=-4.5,L1=-1;
  const VAR=[{n:'M694V',s:.077,o:2000-2108,ci:[2000-2501,2000-1798],col:'var(--terra)'},{n:'V726A',s:.068,o:2000-2192,ci:[2000-2754,2000-1826],col:'var(--crocus)'}];
  const P0=5e-5,pf=(v,yr)=>{if(yr<v.o)return null;const e=Math.exp(v.s*(yr-v.o)/25);return P0*e/(1-P0+P0*e)};
  const yrLbl=y=>y<0?Math.round(-y)+' לפנה״ס':Math.round(y)+' לספירה';
  const pct=p=>p<.001?(p*100).toFixed(3)+'%':p<.01?(p*100).toFixed(2)+'%':(p*100).toFixed(1)+'%';
  function drawSel(t){const yr=lerp(Y0,Y1,t);
    /* narrow: one chart at the full 400 width, taller, with fewer x ticks */
    const N=vb(sv,'720 400','400 520');
    const X0=N?46:84,X1=N?380:672,PY0=N?440:330,PY1=N?100:84;
    const xy=y=>lerp(X0,X1,(y-Y0)/(Y1-Y0)),yl=l=>lerp(PY0,PY1,(l-L0)/(L1-L0));
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    [[-4,'0.01%'],[-3,'0.1%'],[-2,'1%'],[-1,'10%']].forEach(([l,lb])=>{s+=`<line x1="${X0}" x2="${X1}" y1="${f1(yl(l))}" y2="${f1(yl(l))}" class="grid"/><text x="${X0-6}" y="${f1(yl(l)+3)}" class="t-xs t-end">${lb}</text>`});
    s+=N?`<text x="14" y="26" class="t-xs">שכיחות האלל, סקאלה לוגריתמית</text>`
        :`<text x="16" y="${(PY0+PY1)/2}" class="t-xs t-mid" transform="rotate(-90 16 ${(PY0+PY1)/2})">שכיחות האלל, סקאלה לוגריתמית</text>`;
    s+=`<line x1="${X0}" x2="${X1}" y1="${PY0}" y2="${PY0}" class="axis"/>`;
    (N?[[-200,'⁧200 לפנה״ס⁩'],[600,'600'],[1300,'1300'],[2000,'⁧2000 לספירה⁩']]
      :[[-200,'⁧200 לפנה״ס⁩'],[0,'0'],[500,'500'],[1000,'1000'],[1500,'1500'],[2000,'⁧2000 לספירה⁩']]).forEach(([y,l])=>{const x=xy(y);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${PY0}" y2="${PY0+4}" class="axis"/><text x="${f1(x)}" y="${PY0+16}" class="t-xs ${y===-200?'':y===2000?'t-end':'t-mid'}">${l}</text>`});
    /* plague events */
    [[541,N?'מגפת יוסטיניאנוס':'מגפת יוסטיניאנוס','⁧541 לספירה⁩'],[1347,'המוות השחור','⁧1347 לספירה⁩']].forEach(([y,a,b])=>{const x=xy(y),on=yr>=y,o=on?1:.45;
      s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${PY1-12}" y2="${PY0}" style="stroke:var(--bad);stroke-width:${on?2:1.2};stroke-dasharray:5 4;opacity:${o}"/>`;
      s+=`<text x="${f1(x)}" y="${PY1-36}" class="t-lbl t-mid" style="fill:var(--bad);opacity:${o}">${a}</text><text x="${f1(x)}" y="${PY1-20}" class="t-xs t-mid" style="fill:var(--bad);opacity:${o}">${b}</text>`});
    /* curves */
    VAR.forEach((v,i)=>{let d='';for(let y=v.o;y<=yr;y+=10){const p=pf(v,y);d+=(d?'L':'M')+f1(xy(y))+' '+f1(yl(Math.log10(p)))}
      if(d){const pe=pf(v,yr),hx=xy(yr),hy=yl(Math.log10(pe));
        s+=`<path d="${d}L${f1(hx)} ${f1(hy)}" style="fill:none;stroke:${v.col};stroke-width:3;stroke-linecap:round"/>`;
        s+=`<circle cx="${f1(hx)}" cy="${f1(hy)}" r="5" style="fill:${v.col}"/>`;
        const nr=hx>X1-(N?96:110);s+=`<text x="${f1(nr?hx-8:hx+8)}" y="${f1(i?hy+16:hy-9)}" class="t-sm${nr?' t-end':''}" style="fill:${v.col};font-weight:600">${v.n} ${pct(pe)}</text>`}
      /* age CI bars */
      const by=PY0+34+i*16,xa=xy(Math.max(Y0,v.ci[0])),xb=xy(v.ci[1]);
      s+=`<line x1="${f1(xa)}" x2="${f1(xb)}" y1="${by}" y2="${by}" style="stroke:${v.col};stroke-width:3;opacity:.55"/><circle cx="${f1(xy(v.o))}" cy="${by}" r="4" style="fill:${v.col}"/>`;
      if(v.ci[0]<Y0)s+=`<path d="M${f1(xa)} ${by}l6 -4v8z" style="fill:${v.col}"/>`;
      s+=`<text x="${f1(xb+8)}" y="${by+3}" class="t-xs">⁧${v.n}: גיל ≈ ${(2000-v.o).toLocaleString('en-US')} שנים (HMM, רווח סמך 95%)⁩</text>`});
    /* playhead */
    const hx=xy(yr);s+=`<line x1="${f1(hx)}" x2="${f1(hx)}" y1="${PY1}" y2="${PY0}" style="stroke:var(--ink);stroke-width:1;opacity:.35"/>`;
    s+=`<text x="${f1(clamp(hx,N?74:120,X1-(N?20:24)))}" y="${PY1-2}" class="t-sm t-mid" style="fill:var(--ink);font-weight:600">⁧${yrLbl(yr)}⁩</text>`;
    s+=`<text x="${X1}" y="${PY0-8}" class="t-xs t-end">מודל סכמטי</text>`;
    sv.innerHTML=s;
    const a=pf(VAR[0],yr),b=pf(VAR[1],yr);
    $('#whSelRead').innerHTML=`<span>שנה <b>${yrLbl(yr)}</b></span><span>M694V <b>${a?pct(a):'עוד לא'}</b></span><span>V726A <b>${b?pct(b):'עוד לא'}</b></span><span>דורות מאז ההופעה: <b>${a?Math.round((yr-VAR[0].o)/25):0}</b></span>`;
    const p=phaseOf(WH_SEL,t);setSel(p);$('#whSelNote').innerHTML=noteHTML(WH_SEL[p]);
  }
  const stopS=playWire(rs,$('#whSelPlay'),drawSel,18000,'הפעלה חוזרת','what');
  const setSel=stepWire($('#whSelSteps'),WH_SEL,rs,drawSel,stopS);
  drawSel(+rs.value);
  $('#whSelCards').innerHTML=`
   <div class="card"><h4>מה תומך ברעיון <span class="ev early">ראיות ראשוניות</span></h4><p>שלושה וריאנטים שכיחים המשותפים לכמה אוכלוסיות ים תיכוניות "מרמזים בתוקף על יתרון הטרוזיגוטי". [[Aksentijevich1999]] פארק (Park) 2020 הוסיף את אות הברירה, את מנגנון YopM ואת נתוני ההישרדות בעכברים. [[Park2020]]</p></div>
   <div class="card"><h4>טיעון נגדי</h4><p>מחקר ישראלי לא מצא יתרון בריאותי מורגש לנשאים אשכנזים כיום. [[Kogan2001]] יתרון מול מגפת הדבר לא בהכרח ייראה באוכלוסייה מודרנית. סחיפה גנטית באוכלוסיות מבודדות נשארת ההסבר המתחרה: המטה-אנליזה המשולבת מצאה את הבידוד והסחיפה החזקים ביותר באוכלוסיות יהודיות, הקבוצה המועמדת לאפקט מייסד ב־<i>MEFV</i>. [[Papadopoulos2008]]</p></div>
   <div class="card"><h4>רעיון ישן יותר: שחפת <span class="ev hyp">השערה</span></h4><p>מכתב מ־2003 שאל אם לנשאים הייתה תמותה נמוכה יותר משחפת. הרעיון מעולם לא נבדק ישירות. [[Cattan2003]]</p></div>
   <div class="card"><h4>נשאים "חמים" מעט יותר</h4><p>להטרוזיגוטים בריאים יש רמות בסיס ושיא גבוהות יותר של CRP ושל SAA מאשר לאנשים בלי וריאנטים. [[Lachmann2006]] זה מתיישב עם מערכת חיסון מולדת דרוכה, אבל לא כזו שגורמת למחלה.</p></div>`;

  /* ---------- 3. attack at a glance ---------- */
  const body=$('#whBody');let site='perit';
  function drawBody(){const on=k=>k===site?1:0,H=(k,inner,o=1)=>`<g class="wh-hl" style="opacity:${on(k)*o}">${inner}</g>`;
    const T='fill:var(--terra);opacity:.6';let s='';
    /* silhouette */
    s+=`<g style="stroke:var(--panel-2);stroke-linecap:round;fill:none">
      <path d="M96 84 L70 196" style="stroke-width:17"/><path d="M164 84 L190 196" style="stroke-width:17"/>
      <path d="M112 214 L104 372" style="stroke-width:24"/><path d="M148 214 L156 372" style="stroke-width:24"/></g>`;
    s+=`<path d="M92 76 Q130 64 168 76 L164 150 Q160 190 162 222 L98 222 Q100 190 96 150 Z" style="fill:var(--panel-2)"/>`;
    s+=`<rect x="122" y="58" width="16" height="16" style="fill:var(--panel-2)"/><circle cx="130" cy="40" r="22" style="fill:var(--panel-2)"/>`;
    s+=`<ellipse cx="96" cy="382" rx="15" ry="7" style="fill:var(--panel-2)"/><ellipse cx="164" cy="382" rx="15" ry="7" style="fill:var(--panel-2)"/>`;
    /* faint organs */
    s+=`<g style="fill:none;stroke:var(--line);stroke-width:1.4;stroke-dasharray:3 3"><ellipse cx="113" cy="118" rx="14" ry="25"/><ellipse cx="148" cy="118" rx="14" ry="25"/><ellipse cx="130" cy="180" rx="28" ry="24"/></g>`;
    /* highlights */
    s+=H('fever',`<circle cx="130" cy="40" r="22" style="${T}"/><path d="M92 76 Q130 64 168 76 L164 150 Q160 190 162 222 L98 222 Q100 190 96 150 Z" style="fill:var(--terra);opacity:.25"/>
      <g transform="translate(196 22)"><rect x="-4" y="0" width="8" height="34" rx="4" style="fill:var(--panel);stroke:var(--terra);stroke-width:1.5"/><circle cy="40" r="7" style="fill:var(--terra)"/><rect x="-2" y="12" width="4" height="26" style="fill:var(--terra)"/></g>
      <path d="M60 30q5 -6 0 -12M48 34q5 -6 0 -12" style="fill:none;stroke:var(--terra);stroke-width:2;stroke-linecap:round"/>`);
    s+=H('perit',`<ellipse cx="130" cy="180" rx="30" ry="26" style="${T}"/>`);
    s+=H('pleur',`<ellipse cx="113" cy="118" rx="15" ry="26" style="${T}"/><text x="60" y="122" class="t-xs t-end" style="fill:var(--terra)">צד אחד</text><path d="M62 119H96" style="stroke:var(--terra);stroke-width:1"/>`);
    s+=H('peric',`<path d="M138 120c-6-8-16-2-11 6l11 11 11-11c5-8-5-14-11-6z" style="fill:var(--terra)"/>`);
    s+=H('arth',`<circle cx="107" cy="292" r="12" style="${T}"/><circle cx="155" cy="362" r="8" style="fill:var(--terra);opacity:.3"/><circle cx="112" cy="216" r="9" style="fill:var(--terra);opacity:.3"/><text x="82" y="296" class="t-xs t-end" style="fill:var(--terra)">ברך</text>`);
    s+=H('myal',`<ellipse cx="106" cy="322" rx="9" ry="20" style="${T}"/><ellipse cx="154" cy="322" rx="9" ry="20" style="${T}"/>`);
    s+=H('ele',`<ellipse cx="156" cy="352" rx="11" ry="16" style="fill:var(--congo);opacity:.65"/><text x="178" y="356" class="t-xs" style="fill:var(--terra)">שוק, קרסול</text>`);
    const S=WH_SITES.find(x=>x.id===site);
    body.innerHTML=s;
    $('#whSiteNote').innerHTML=`<h4>${S.n} <span class="big" style="font-size:22px">${f1(S.v)}%</span></h4><p>${S.txt}</p>`;
    $$('.wh-site',$('#whSites')).forEach(b=>b.setAttribute('aria-pressed',b.dataset.site===site));
  }
  $('#whSites').innerHTML=WH_SITES.map(x=>`<button class="wh-site" data-site="${x.id}" aria-pressed="false"><span>${x.n}</span><span class="tr"><i data-w="${x.v}"></i></span><span class="v">${f1(x.v)}%</span></button>`).join('')+
    `<div class="pt"><b>במילים פשוטות</b>כמעט כל התקף מביא איתו חום, ורוב ההתקפים מביאים כאב בטן. לכמחצית מהחולים יש בשלב כלשהו התקפים במפרקים. בין התקפים רוב האנשים מרגישים טוב לגמרי. [[Tunca2005,GeneReviews]]</div>`;
  $('#whSites').addEventListener('click',e=>{const b=e.target.closest('[data-site]');if(!b)return;site=b.dataset.site;drawBody()});
  drawBody();
  setTimeout(()=>$$('#whSites .tr i').forEach(i=>i.style.width=i.dataset.w+'%'),60);

  /* ---------- 4. key numbers ---------- */
  $('#whCards').innerHTML=`
   <div class="card"><span class="kicker">גיל ההופעה</span><span class="big">80–90%</span><p>מהחולים חווים את התסמינים הראשונים לפני גיל 20 [[Tufan2020,Sohar1967]], ואצל יותר ממחצית הם מתחילים בעשור הראשון לחיים [[PRINTO2016]]. התקפים ראשונים אחרי גיל 40 נדירים ובדרך כלל קלים [[Tufan2020]].</p></div>
   <div class="card"><span class="kicker">יחס בין המינים</span><span class="big">1.2 : 1</span><p>גברים לנשים במאגר הטורקי של 2,838 חולים [[Tunca2005]]. נתונים ישראליים ישנים יותר הראו יחס של כ־1.7, שפורש כחדירות מופחתת בנשים [[Rogers1989]].</p></div>
   <div class="card"><span class="kicker">עיכוב באבחון</span><span class="big">6.9 שנים</span><p>הזמן הממוצע מהתסמינים הראשונים ועד האבחנה בטורקיה, שהתקצר בכ־2 שנים בכל עשור מאז 1981 [[Tunca2005]]. הופעה מוקדמת מאוד קשורה להומוזיגוטיות ל־M694V, למחלה קשה יותר ולעיכוב ארוך יותר [[Tanatar2021,GezginYildirim2022age]].</p></div>
   <div class="card"><span class="kicker">שכיחות</span><span class="big">1:500–1:1,000</span><p>בארצות אנדמיות [[Tufan2020]]. הנתון הגבוה ביותר שנמדד בשטח הוא 1 מכל 395, בסיוואס שבמרכז אנטוליה [[Onen2004]].</p></div>
   <div class="card"><span class="kicker">יפן</span><span class="big">192 מתוך 601</span><p>מטופלים יפנים עם חום לא מוסבר אובחנו עם FMF במחקר משנים 2009–2015, שקבע שהיא "כבר אינה מחלה נדירה ביפן" [[Migita2016]]. סקר מ־2009 העריך רק 292 חולים. FMF ביפן מתחילה מאוחר יותר, קלה יותר, מערבת לעתים קרובות את E148Q/M694I, וקולכיצין היה יעיל אצל 91.8% [[Migita2012]].</p></div>
   <div class="card"><span class="kicker">בעולם</span><span class="big">אין סך כולל מאומת</span><p>אין מקור ראשוני שנותן ספירה עולמית שנבדקה; נתונים כמו "יותר מ־100,000" מופצים בלי אימות. ברשומות הבריאות האלקטרוניות של טורקיה לבדן רשומים 160,897 אנשים עם קודים של FMF [[Satis2025]]. בטורקיה יש הכי הרבה חולים, ואחריה בישראל ובארמניה [[Tufan2020]].</p></div>
   <div class="card"><span class="kicker">שלושה פנוטיפים</span><ul><li><b>פנוטיפ 1:</b> התקפים חוזרים של חום עם סרוזיטיס (דלקת קרומים) או סינוביטיס (דלקת הקרום הסינוביאלי).</li><li><b>פנוטיפ 2:</b> עמילואידוזיס מסוג AA כסימן הראשון, בלי התקפים קודמים. לכל היותר 0.3% במאגר הטורקי, ופחות מ־2% בקבוצות המחקר השונות.</li><li><b>פנוטיפ 3:</b> שני וריאנטים, בלי תסמינים ובלי עמילואידוזיס.</li></ul><p>[[SorianoManna2012,Tunca2005,Tufan2020]]</p></div>
   <div class="card"><span class="kicker">בין התקפים</span><span class="big">טוב, ברוב הזמן</span><p>בדרך כלל החולים מרגישים טוב לגמרי בין התקפים [[GeneReviews,PRINTO2016]]. עם זאת, רמת ה־SAA החציונית בין התקפים הייתה 6 mg/L, לעומת 693 mg/L בזמן התקפים, ואצל חולים רבים היא אף פעם לא חוזרת לגמרי לנורמה: ההתקפים הם "קצה הקרחון" [[Lachmann2006]].</p><div class="hook"><b>לבחינה</b>לפני הקולכיצין, יותר ממחצית החולים ב־FMF מתו מעמילואידוזיס [[Tufan2020]]. ראו <a href="#amyloid" data-go="amyloid">עמילואידוזיס מסוג AA</a>.</div></div>`;
};
