/* =============== 2.3 dosing, safety, interactions =============== */
const CD_STEPS=[
 {from:0,at:.12,k:'ימים 0–3',t:'הצטברות לרמה יציבה',
  txt:`אחרי טבליה של 0.6 mg, רמת הקולכיצין בפלזמה מגיעה לשיא תוך 1–2 שעות (Cmax ממוצע 2.5 ng/mL); הזמינות הביולוגית הממוצעת במתן דרך הפה היא כ־45%. זמני מחצית החיים שפורסמו אינם מתיישבים זה עם זה: העלון האמריקאי מדווח על 26.6–31.2 שעות במתן חוזר של 0.6 mg פעמיים ביום, מחקר תוך־ורידי אחד מצא זמן מחצית חיים סופי של 57.8 שעות, ומחקרים ישנים יותר במתן דרך הפה וסקירות מדווחים על כ־7–16 שעות. המקורות אינם מיישבים את הפער הזה, ולכן נכון לקרוא את זמן מחצית החיים כטווח, ולא כמספר מוסכם אחד. כך או כך, כל מנה מתווספת למה שנשאר מהקודמת, עד שהרמות מתייצבות בעלייה וירידה יומיות. קולכיצין יוצא מהגוף בשתי דרכים: משאבות P-glycoprotein (P-gp) במעי, בכבד ובכליה, והאנזים CYP3A4 במעי ובכבד. [[FDA-Colcrys,Ferron1996,BenChetrit2018Textbook,Slobodnick2018,Leung2015]]`,
  pt:`הטבליה של כל יום מתווספת למה שנשאר מאתמול, עד שהרמה מתייצבת בגל יומי קבוע. כמה זמן מנה אחת נשארת בגוף שנוי במחלוקת: זמני מחצית החיים שפורסמו נעים בין כמה שעות ליותר מיומיים.`,
  hook:`שתי דרכי יציאה: משאבות <b>P-gp</b> והאנזים <b>CYP3A4</b>. חסימה של אחת מהן גורמת להצטברות קולכיצין. זמן מחצית החיים: <b>טווח שנוי במחלוקת</b>, לא מספר אחד.`},
 {from:.29,at:.31,k:'יום 3',t:'נוספת תרופה בעלת אינטראקציה',
  txt:`מעכבים חזקים של CYP3A4 ומעכבי P-gp סוגרים את דרכי היציאה האלה. דווחו אינטראקציות מסכנות חיים וקטלניות, והעלון קובע התווית נגד (contraindication) לשילובים האלה באנשים עם פגיעה בתפקוד הכליות או הכבד. הגבהים כאן לקוחים ממחקרי האינטראקציה של מנה בודדת שבעלון, מותאמים באופן סכמטי למתן יומי. [[FDA-Colcrys,Terkeltaub2011]]`,
  pt:`חלק מהתרופות חוסמות את הדרך שבה הגוף מפנה קולכיצין, כך שאותה טבליה יומית משאירה בגוף יותר תרופה.`,
  hook:`קלריתרומיצין, קטוקונזול, ריטונביר וציקלוספורין העלו את החשיפה למנה בודדת ב־<b>212–296%</b>.`},
 {from:.4,at:.62,k:'ימים 4–10',t:'טיפוס איטי לרמה יציבה חדשה',
  txt:`מכיוון שהפינוי מואט, הרמה ממשיכה לעלות במשך ימים אחרי תחילת המעכב, ולכן הסיכון גדל ככל שהחפיפה ארוכה יותר. במחקר הקלריתרומיצין, חפיפה ארוכה יותר, פגיעה בתפקוד הכליות בנקודת ההתחלה ופנציטופניה ניבאו תמותה. [[Hung2005]]`,
  pt:`התרופה העודפת מצטברת יום אחר יום, כך שקורס אנטיביוטיקה של שבוע יכול להשפיע יותר ממנה בודדת.`,
  hook:`Hung 2005: תמותה של <b>10.2%</b> כשקלריתרומיצין ניתן בו־זמנית, לעומת <b>3.6%</b> כשניתן ברצף.`},
 {from:.85,at:.97,k:'מה העלון מפרסם',t:'תקרות מינון ל־FMF',
  txt:`כשאין חלופה לתרופה בעלת האינטראקציה, העלון האמריקאי מגביל את מינון ה־FMF ל־0.6 mg/day עם מעכבים חזקים של CYP3A4 או מעכבי P-gp, ול־1.2 mg/day עם מעכבים בינוניים של CYP3A4. התקרות חלות גם בתוך 14 יום מנטילת התרופה בעלת האינטראקציה. לחצו על "החלת תקרת המינון של העלון ל־FMF" כדי לראות את ההשפעה. [[FDA-Colcrys]]`,
  pt:`כששתי תרופות חייבות להינטל יחד, העלון מוריד את תקרת הקולכיצין כדי שהרמות יישארו קרובות יותר לרגיל.`,
  hook:`תקרות FMF בעלון: <b>0.6 mg/day</b> (מעכב חזק של CYP3A4 או P-gp) ו־<b>1.2 mg/day</b> (מעכב בינוני של CYP3A4).`}
];
const CD_DRUGS={
 none:{n:'ללא תרופה בעלת אינטראקציה',sh:'לא נוסף דבר',f:1,pct:'אין',cap:null,capTxt:'לא נדרשת',
  txt:`בלי אינטראקציה, הרמות מתייצבות בגל היומי הרגיל בתוך כשבוע. [[FDA-Colcrys]]`},
 clari:{n:'קלריתרומיצין',sh:'קלריתרומיצין',f:3.82,pct:'+282%',cap:.6,capTxt:'0.6 mg/day',
  txt:`מעכב חזק של CYP3A4. במחקר המנה הבודדת שבעלון הוא העלה את ה־AUC של קולכיצין ב־282%. במחקר רטרוספקטיבי מתו 9 מתוך 88 מטופלים (10.2%) שקיבלו את שתי התרופות בו־זמנית, לעומת 1 מתוך 28 (3.6%) שקיבלו אותן בזו אחר זו. אזיתרומיצין העלה את החשיפה הרבה פחות, ומוצע כמקרוליד הבטוח יותר. [[FDA-Colcrys,Hung2005,Terkeltaub2011,BenChetrit2018Textbook]]`},
 keto:{n:'קטוקונזול / איטרקונזול',sh:'קטוקונזול',f:3.12,pct:'+212% (קטוקונזול)',cap:.6,capTxt:'0.6 mg/day',
  txt:`מעכבים חזקים של CYP3A4. קטוקונזול העלה את ה־AUC של קולכיצין ב־212% במחקר העלון; איטרקונזול נמצא באותה קבוצה בעלון, והעקומה משתמשת בנתון של קטוקונזול. [[FDA-Colcrys]]`},
 rito:{n:'ריטונביר',sh:'ריטונביר',f:3.96,pct:'+296%',cap:.6,capTxt:'0.6 mg/day',
  txt:`מעכב חזק של CYP3A4, עם העלייה הגדולה ביותר בטבלת העלון (+296%). רוב מעכבי הפרוטאז של HIV נמצאים באותה קבוצה בעלון. [[FDA-Colcrys]]`},
 cyclo:{n:'ציקלוספורין',sh:'ציקלוספורין',f:3.59,pct:'+259%',cap:.6,capTxt:'0.6 mg/day',
  txt:`מעכב P-gp שהעלה את ה־AUC של קולכיצין ב־259%. ציקלוספורין עלול לגרום לנוירומיופתיה מקולכיצין בתוך שבועות, ועלול להסוות את סימני האזהרה של רעילות במערכת העיכול. [[FDA-Colcrys,BenChetrit2018Textbook]]`},
 vera:{n:'ורפמיל',sh:'ורפמיל',f:2.03,pct:'+103%',cap:1.2,capTxt:'1.2 mg/day',
  txt:`מעכב בינוני של CYP3A4 ברשימת העלון; ה־AUC של קולכיצין עלה ב־103%. [[FDA-Colcrys]]`},
 dilt:{n:'דילטיאזם',sh:'דילטיאזם',f:1.93,pct:'+93%',cap:1.2,capTxt:'1.2 mg/day',
  txt:`מעכב בינוני של CYP3A4 ברשימת העלון; ה־AUC של קולכיצין עלה ב־93%. [[FDA-Colcrys]]`},
 azi:{n:'אזיתרומיצין',sh:'אזיתרומיצין',f:1.57,pct:'+57%',cap:null,capTxt:'לא מופיעה במקורות שלנו',
  txt:`העלה את ה־AUC של קולכיצין ב־57%, הרבה פחות מקלריתרומיצין, ולכן סקירות מציעות אותו כמקרוליד הבטוח יותר. הוא אינו מופיע ברשימות התקרה בעלון שאנו מצטטים, ולכן לכפתור התקרה אין כאן השפעה. [[FDA-Colcrys,Terkeltaub2011,BenChetrit2018Textbook]]`},
 grape:{n:'מיץ אשכוליות',sh:'מיץ אשכוליות',f:1,pct:'ללא שינוי ממוצע במחקר העלון',cap:1.2,capTxt:'1.2 mg/day (העלון: להימנע)',
  txt:`כאן העלון סותר את עצמו. הוא מונה את מיץ האשכוליות בטבלת המעכבים הבינוניים של CYP3A4 ומורה למטופלים להימנע ממנו, אבל מחקר האינטראקציה שלו עצמו (240 mL פעמיים ביום במשך 4 ימים) מצא ש־Cmax ו־AUC הממוצעים השתנו כל אחד בפחות מ־3%, כלומר ללא שינוי משמעותי. שתי הקביעות נמצאות באותו מסמך, ואף אחד מהמקורות אינו מיישב את הסתירה. לכן העקומה אינה זזה; ההשפעה עדיין עשויה להשתנות בין מוצרים ובין אנשים. [[FDA-Colcrys,Leung2015]]`},
 renal:{n:'ירידה חמורה בתפקוד הכליות',sh:'ירידה חמורה בתפקוד הכליות',f:4.3,renal:true,pct:'פינוי −75% בדיאליזה',cap:.3,capTxt:'התחלה ב־0.3 mg/day',
  txt:`מוצג כאילו התחיל ביום 3 רק לשם השוואה. הגובה הזה אינו ממחקר AUC: הוא נגזר מנתון הפינוי שדווח, ולכן זו העקומה הגסה ביותר כאן. במטופלי FMF בדיאליזה, פינוי הקולכיצין היה נמוך ב־75% (0.17 לעומת 0.73 L/h/kg), והדיאליזה אינה מסלקת את התרופה. כש־CrCl מתחת ל־30 mL/min או בדיאליזה, העלון (FMF) מתחיל ב־0.3 mg/day ומעלה רק בניטור צמוד. [[FDA-Colcrys]]`}
};
const CD_ORG={
 gut:{n:'מערכת העיכול',rep:`התכווצויות, בחילה, שלשול, כאבי בטן והקאות הן התופעות השכיחות ביותר. העלון מדווח עליהן בעד 20% מהמטופלים שמתחילים טיפול ל־FMF, בדרך כלל בתוך 24 שעות, ומציין שתופעות חמורות במערכת העיכול עלולות לבשר על רעילות חמורה יותר. שימוש ממושך מוריד את האנזימים לקטאז, סוכראז ומלטאז במעי ועלול לפגוע בספיגת ויטמין B12. [[FDA-Colcrys,Ozen2017,BenChetrit2018Textbook]]`,
  mon:`התסמינים נבדקים בכל ביקור. סקירות מציינות שחלוקת המינון היומי עשויה להפחית את התופעות במערכת העיכול, ושהימנעות מלקטוז או הורדת המינון עשויות לעזור. [[Ozen2017,BenChetrit2018Textbook]]`},
 muscle:{n:'שרירים',rep:`מיופתיה מקולכיצין גורמת לחולשה בשרירי האגן והכתפיים עם CK מוגבר, בדרך כלל כשתפקוד הכליות ירוד. אפשר לטעות ולחשוב שזו פולימיוזיטיס (polymyositis), והיא חולפת בתוך 3–4 שבועות מהפסקת התרופה. העלון מזהיר מפני רבדומיוליזיס במינונים טיפוליים, במיוחד עם פגיעה בתפקוד הכליות, גיל מבוגר, סטטינים או פיברטים. [[Kuncl1987,FDA-Colcrys]]`,
  mon:`CPK (CK) כלול במערך הניטור של EULAR 2016; בירידה בתפקוד הכליות ההנחיה ממליצה על מעקב צמוד, בדיקות CK ומינון נמוך יותר. העלון מציין שניטור CK לא בהכרח ימנע מיופתיה חמורה עם סטטינים או פיברטים. [[Ozen2016,Ozen2017,FDA-Colcrys]]`},
 nerves:{n:'עצבים',rep:`פולינוירופתיה אקסונלית קלה מופיעה לעיתים קרובות יחד עם המיופתיה (מיונוירופתיה). אחרי הפסקת התרופה היא חולפת לאט יותר מחולשת השרירים. ציקלוספורין עלול לגרום לנוירומיופתיה בתוך שבועות. [[Kuncl1987,BenChetrit2018Textbook]]`,
  mon:`אין בדיקת עצבים במערך הניטור של ההנחיות (SAA/CRP, ספירת דם, אנזימי כבד, תפקודי כליות, CPK, בדיקת שתן), ולכן תסמינים עצביים מזוהים קלינית, לצד בדיקת ה־CK. [[Ozen2016]]`},
 marrow:{n:'מח עצם',rep:`דווחו דיכוי מח עצם, לויקופניה, גרנולוציטופניה, טרומבוציטופניה, פנציטופניה ואנמיה אפלסטית במינונים טיפוליים, אבל לויקופניה נדירה מאוד במינוני FMF רגילים. במחקר הקלריתרומיצין, פנציטופניה ניבאה תמותה. [[FDA-Colcrys,BenChetrit2018Textbook,Hung2005]]`,
  mon:`ספירת דם כלולה במערך הניטור של EULAR 2016. הקונצנזוס הגרמני ממליץ על בירור נוסף ועל מינון נמוך יותר אם הספירות נעשות חריגות. [[Ozen2016,Ehlers2023]]`},
 liver:{n:'כבד',rep:`הכבד מפרק את הקולכיצין (CYP3A4 יוצר 2- ו־3-דמתילקולכיצין) ומפריש אותו למרה דרך P-gp. במחלת כבד כרונית הפינוי עשוי להיות נמוך בהרבה וזמן מחצית החיים ארוך יותר, עם שונות רבה בין אנשים. [[FDA-Colcrys,Slobodnick2018]]`,
  mon:`EULAR 2016 ממליצה לבדוק אנזימי כבד באופן סדיר, ולהפחית קולכיצין ולברר את הסיבה אם הם עולים על פי שניים מהגבול העליון של הנורמה. העלון (FMF) ממליץ על ניטור צמוד בפגיעה קלה עד בינונית בתפקוד הכבד ועל שקילת הפחתת מינון במחלה חמורה. [[Ozen2016,Ozen2017,FDA-Colcrys]]`},
 kidney:{n:'כליות',rep:`כמה מהתרופה יוצאת דרך הכליות שנוי במחלוקת: העלון האמריקאי מדווח ש־40–65% ממנה שנבלעה נמצאים ללא שינוי בשתן, ואילו סקירה מעריכה את ההפרשה הכלייתית ב־10–20% ורואה בדרך המרה והצואה את הדרך העיקרית. המקורות אינם מסבירים את הפער. שניהם מסכימים שדיאליזה אינה מסלקת קולכיצין. ירידה בתפקוד הכליות היא הרקע השכיח למיופתיה ולאינטראקציות קטלניות. [[FDA-Colcrys,BenChetrit2018Textbook,Kuncl1987,Hung2005]]`,
  mon:`תפקודי כליות כלולים במערך של EULAR 2016; בירידה בתפקוד ההנחיה ממליצה על מעקב צמוד, בדיקות CK ומינון נמוך יותר. בדיקת שתן בכל ביקור מחפשת חלבון בשתן (פרוטאינוריה), הסימן הראשון לעמילואידוזיס (סיבוך של המחלה, לא תופעה של התרופה). [[Ozen2016,Ozen2017]]`}
};
inits.coldose=()=>{
  /* ---------- 1. exposure window ---------- */
  const svg=$('#cdSvg'),rg=$('#cdT');let dk='clari',capOn=false;
  const DT=.25,NH=240,NI=NH/DT,KE=Math.LN2/29,KA=Math.LN2/.6,NORM=KE*24,BASE=1.8,I72=72/DT;
  Object.values(CD_DRUGS).forEach(D=>{D.fb=D.renal?1:Math.sqrt(D.f);D.fc=D.f/D.fb});
  function sim(fb,fc,df){const a=new Float32Array(NI+1);let g=0,c=0;
    for(let i=0;i<=NI;i++){const h=i*DT;if(i%(24/DT)===0&&h<NH)g+=h>=72?fb*df:1;
      const k=h>=72?KE/fc:KE,ab=KA*g*DT;g-=ab;c+=ab-k*c*DT;a[i]=c*NORM}return a}
  const cache={};
  function get(key,capped){const id=key+(capped?'c':'');if(cache[id])return cache[id];const D=CD_DRUGS[key];return cache[id]=sim(D.fb,D.fc,capped&&D.cap?D.cap/BASE:1)}
  let X0=64,X1=700,Y0=322,Y1=46;const VM=5;
  const xh=h=>X0+(X1-X0)*h/NH,yv=v=>Y0-(Y0-Y1)*Math.min(v,VM+.15)/VM;
  function pth(a,i0,i1){let d='';for(let i=i0;i<=i1;i+=2)d+=(d?'L':'M')+f1(xh(i*DT))+' '+f1(yv(a[i]));if(i1>i0&&(i1-i0)%2)d+='L'+f1(xh(i1*DT))+' '+f1(yv(a[i1]));return d}
  function draw(t){
    /* narrow: same chart, full 400 wide and taller; axis notes and the day-3
       annotation stack instead of sitting side by side, so the longest drug
       names cannot run off the right edge. */
    const N=vb(svg,'720 372','400 452');
    X0=N?40:64;X1=N?384:700;Y0=N?372:322;Y1=N?74:46;
    const D=CD_DRUGS[dk],hasCap=capOn&&D.cap!=null,A=get(dk,hasCap),R=get('none',false),U=hasCap?get(dk,false):null;
    const iN=Math.round(t*NI),hN=iN*DT,df=hasCap?D.cap/BASE:1,fEff=D.f*df;
    const col=fEff>2.2?'var(--bad)':fEff>1.6?'var(--warn)':'var(--crocus)';
    let s=`<defs><linearGradient id="cdTox" x1="0" y1="1" x2="0" y2="0"><stop offset="0" style="stop-color:var(--bad);stop-opacity:0"/><stop offset="1" style="stop-color:var(--bad);stop-opacity:.34"/></linearGradient></defs>`;
    s+=`<rect x="${X0}" y="${Y1}" width="${X1-X0}" height="${f1(yv(2.2)-Y1)}" style="fill:url(#cdTox)"/>`;
    s+=`<rect x="${X0}" y="${f1(yv(1.55))}" width="${X1-X0}" height="${f1(yv(.55)-yv(1.55))}" style="fill:var(--good-soft);opacity:.85"/>`;
    for(let v=0;v<=VM;v++)s+=`<line x1="${X0}" x2="${X1}" y1="${f1(yv(v))}" y2="${f1(yv(v))}" class="grid"/><text x="${X0-6}" y="${f1(yv(v)+3)}" class="t-xs t-end">${v}×</text>`;
    for(let d=0;d<=10;d+=(N?2:1))s+=`<text x="${f1(xh(d*24))}" y="${Y0+16}" class="t-xs t-mid">${d}</text>`;
    if(N)s+=`<text x="${f1((X0+X1)/2)}" y="${Y0+32}" class="t-xs t-mid">ימים של מתן פעם ביום</text><text x="${X0}" y="${Y0+50}" class="t-xs">חשיפה ביחס לממוצע הרגיל</text><text x="${X0}" y="${Y0+63}" class="t-xs">מודל סכמטי, לא נתונים שנמדדו</text>`;
    else s+=`<text x="${X1}" y="${Y0+34}" class="t-xs t-end">ימים של מתן פעם ביום</text><text x="${X0}" y="${Y0+34}" class="t-xs">חשיפה ביחס לממוצע הרגיל · מודל סכמטי, לא נתונים שנמדדו</text>`;
    s+=`<text x="${N?X0:X1-6}" y="${N?22:Y1+14}" class="t-sm ${N?'':'t-end'}" style="fill:var(--bad)">סיכון הרעילות עולה · אין סף חד</text>`;
    s+=`<text x="${X0+6}" y="${f1(yv(1.55)+12)}" class="t-xs" style="fill:var(--good)">\u2067טווח רגיל (סכמטי)\u2069</text>`;
    const x3=xh(72);
    s+=`<line x1="${f1(x3)}" x2="${f1(x3)}" y1="${Y1-14}" y2="${Y0}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:3 4;opacity:.55"/>`;
    if(N){s+=`<text x="${f1(x3+6)}" y="${Y1-26}" class="t-lbl">\u2067יום 3: ${dk==='none'?'לא נוסף דבר':'+ '+D.sh}\u2069</text>`;
      if(hasCap)s+=`<text x="${f1(x3+6)}" y="${Y1-10}" class="t-xs" style="fill:${col}">\u2067תקרת העלון ${D.cap} mg/day\u2069</text>`}
    else s+=`<text x="${f1(x3+6)}" y="${Y1-6}" class="t-lbl">\u2067יום 3: ${dk==='none'?'לא נוסף דבר':'+ '+D.sh}${hasCap?' · תקרת העלון '+D.cap+' mg/day':''}\u2069</text>`;
    // dose markers
    for(let d=0;d<10;d++){const h=d*24;if(h>hN+.01)break;const fr=h>=72&&hasCap?df:1;s+=`<rect x="${f1(xh(h)-3)}" y="${f1(Y0-2-16*fr)}" width="6" height="${f1(16*fr)}" rx="2" style="fill:var(--crocus);opacity:.75"/>`}
    // curves
    if(iN>1)s+=`<path d="${pth(R,0,iN)}" style="fill:none;stroke:var(--muted);stroke-width:1.4;stroke-dasharray:5 4"/>`;
    if(U&&iN>I72)s+=`<path d="${pth(U,I72,iN)}" style="fill:none;stroke:var(--bad);stroke-width:1.6;opacity:.35"/>`;
    if(iN>1)s+=`<path d="${pth(A,0,Math.min(iN,I72))}" style="fill:none;stroke:var(--crocus);stroke-width:2.6;stroke-linejoin:round"/>`;
    if(iN>I72)s+=`<path d="${pth(A,I72,iN)}" style="fill:none;stroke:${col};stroke-width:2.8;stroke-linejoin:round"/>`;
    if(dk!=='none'&&Math.abs(fEff-1)>.05&&hN>72){const yy=yv(fEff);
      s+=`<line x1="${f1(x3)}" x2="${X1}" y1="${f1(yy)}" y2="${f1(yy)}" style="stroke:${col};stroke-width:1.2;stroke-dasharray:2 4"/><text x="${f1(x3+8)}" y="${f1(yy-6)}" class="t-xs" style="fill:${col}">\u2067ממוצע אם יימשך ≈ ${f1(fEff)}×\u2069</text>`}
    if(iN>0){const v=A[iN],cx=xh(hN);s+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${Y1}" y2="${Y0}" style="stroke:var(--ink);opacity:.22"/><circle cx="${f1(cx)}" cy="${f1(yv(v))}" r="5.5" style="fill:${hN>72?col:'var(--crocus)'};stroke:var(--panel);stroke-width:2"/>`}
    svg.innerHTML=s;
    $('#cdRead').innerHTML=`<span>יום <b>${f1(hN/24)}</b></span><span>חשיפה כעת <b>${f1(A[iN])}×</b> מהממוצע הרגיל</span><span>שינוי ה־AUC בעלון <b>${D.pct}</b></span><span>תקרת FMF בעלון <b>${D.capTxt}</b></span>`;
    const p=phaseOf(CD_STEPS,t);setSt(p);
    $('#cdNote').innerHTML=noteHTML(CD_STEPS[p])+`<div class="kv"><div><dt>${D.n}${hasCap?' · עם תקרה':''}</dt><dd>${D.txt}</dd></div></div>`;
  }
  const stop=playWire(rg,$('#cdPlay'),draw,15000,'הפעלה חוזרת','coldose');
  const setSt=stepWire($('#cdSteps'),CD_STEPS,rg,draw,stop);
  $$('[data-cd]').forEach(b=>b.onclick=()=>{dk=b.dataset.cd;$$('[data-cd]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)});
  $('#cdCap').onclick=()=>{capOn=!capOn;$('#cdCap').setAttribute('aria-pressed',capOn);draw(+rg.value)};
  draw(+rg.value);

  /* ---------- 2. published dose by age ---------- */
  const ag=$('#cdAge'),asv=$('#cdAgeSvg');let cur=null,stopT=null;
  function target(a){const child=a<18,e=a<5?[0,.5]:a<=10?[.5,1]:[1,1.5],l=a<4?null:a<6?[.3,1.8]:a<=12?[.9,1.8]:[1.2,2.4];
    return{e0:e[0],e1:e[1],mx:child?2:3,l0:l?l[0]:0,l1:l?l[1]:0,hasL:!!l,child,es:a<5?'≤0.5':a<=10?'0.5–1.0':'1.0–1.5',ls:l?l[0]+'–'+l[1]:''}}
  let AX0=170,AX1=690;const MXS=3.5,xm=m=>AX0+(AX1-AX0)*m/MXS;
  function drawAge(v,T,a){
    /* narrow: the two bars and the step note stack down the page, each with its
       own heading above it, so the mg/day figures keep their full size. */
    const N=vb(asv,'720 226','400 392');
    AX0=N?24:170;AX1=N?376:690;
    const LX=N?16:10,EB=N?80:44,LB=N?200:122,CY=N?352:88;
    let s='';
    for(let m=0;m<=MXS+.01;m+=.5)s+=`<line x1="${f1(xm(m))}" x2="${f1(xm(m))}" y1="${N?56:24}" y2="${N?232:188}" class="grid"/><text x="${f1(xm(m))}" y="${N?248:204}" class="t-xs t-mid">${m}</text>`;
    s+=`<text x="${AX1}" y="${N?264:220}" class="t-xs t-end">\u2067mg ליום\u2069</text>`;
    s+=`<text x="${LX}" y="${N?30:58}" class="t-lbl">EULAR 2016</text><text x="${LX}" y="${N?44:73}" class="t-xs">\u2067אותן תקרות ב־2024\u2069</text>`;
    s+=`<text x="${LX}" y="${CY}" class="t-xs" style="fill:var(--muted)">המקורות אינם נותנים גיל</text><text x="${LX}" y="${CY+11}" class="t-xs" style="fill:var(--muted)">\u2067מעבר: 18 הוא הנחה\u2069</text><text x="${LX}" y="${CY+22}" class="t-xs" style="fill:var(--muted)">של האפליקציה</text>`;
    s+=`<rect x="${f1(xm(v.e1))}" y="${EB+4}" width="${f1(Math.max(0,xm(v.mx)-xm(v.e1)))}" height="20" rx="4" style="fill:var(--crocus-soft);stroke:var(--crocus);stroke-opacity:.3"/>`;
    for(let m=v.e1+.25;m<v.mx-.05;m+=.25)s+=`<line x1="${f1(xm(m))}" x2="${f1(xm(m))}" y1="${EB+8}" y2="${EB+20}" style="stroke:var(--crocus);opacity:.4"/>`;
    s+=`<rect x="${f1(xm(v.e0))}" y="${EB}" width="${f1(Math.max(5,xm(v.e1)-xm(v.e0)))}" height="28" rx="5" style="fill:var(--crocus)"/>`;
    s+=`<line x1="${f1(xm(v.mx))}" x2="${f1(xm(v.mx))}" y1="${EB-2}" y2="${EB+34}" style="stroke:var(--bad);stroke-width:3"/>`;
    s+=`<text x="${f1(xm(v.e0))}" y="${EB-10}" class="t-sm" style="fill:var(--crocus)">\u2067התחלה ${T.es} mg/day\u2069</text>`;
    s+=`<text x="${f1(xm(v.mx)+7)}" y="${EB+19}" class="t-sm" style="fill:var(--bad)">\u2067מרבי ${T.mx}\u2069</text>`;
    if(T.child)s+=`<line x1="${f1(xm(2.5))}" x2="${f1(xm(2.5))}" y1="${EB+2}" y2="${EB+32}" style="stroke:var(--muted);stroke-width:1.5;stroke-dasharray:3 3"/><text x="${f1(xm(2.5))}" y="${EB+48}" class="t-xs t-mid">\u2067קונצנזוס ילדים 2007: 2.5\u2069</text>`;
    s+=`<text x="${LX}" y="${N?156:132}" class="t-lbl">\u2067העלון האמריקאי (FMF)\u2069</text><text x="${LX}" y="${N?170:147}" class="t-xs">COLCRYS</text>`;
    if(T.hasL){s+=`<rect x="${f1(xm(v.l0))}" y="${LB}" width="${f1(Math.max(4,xm(v.l1)-xm(v.l0)))}" height="26" rx="5" style="fill:var(--sea);opacity:.85"/><text x="${f1(xm(v.l0))}" y="${LB-8}" class="t-sm" style="fill:var(--sea)">\u2067טווח העלון ${T.ls} mg/day\u2069</text>`}
    else s+=`<text x="${N?LX:AX0}" y="${LB+17}" class="t-sm">\u2067טווחי העלון במקור שלנו מתחילים בגיל 4.\u2069</text>`;
    if(N)s+=`<text x="${LX}" y="290" class="t-lbl">צעדי העלאה</text><text x="${LX}" y="306" class="t-xs">\u2067EULAR 2016: 0.5 mg/day\u2069</text><text x="${LX}" y="318" class="t-xs">\u2067קונצנזוס גרמני: 0.25 או 0.5 mg\u2069</text><text x="${LX}" y="330" class="t-xs">\u2067העלון: 0.3 mg/day\u2069</text>`;
    else s+=`<text x="10" y="178" class="t-lbl">צעדי העלאה</text><text x="${AX0}" y="178" class="t-xs">\u2067EULAR 2016: 0.5 mg/day · קונצנזוס גרמני: 0.25 או 0.5 mg · העלון: 0.3 mg/day\u2069</text>`;
    asv.innerHTML=s;
    $('#cdAgeOut').textContent=a+'';
    $('#cdAgeRead').innerHTML=`<span>גיל <b>${a}</b> (${T.child?'ילד':'מבוגר'})</span><span>התחלה לפי EULAR <b>${T.es} mg/day</b></span><span>מרבי לפי EULAR <b>${T.mx} mg/day</b></span><span>העלון האמריקאי <b>${T.hasL?T.ls+' mg/day':'אין טווח מתחת לגיל 4'}</b></span>`;
  }
  function setAge(a,inst){const T=target(a),to={e0:T.e0,e1:T.e1,mx:T.mx,l0:T.l0,l1:T.l1};
    if(stopT)stopT();if(!cur||inst){cur=to;drawAge(cur,T,a);return}
    const from={...cur};stopT=animate(450,p=>{const e=ease(p);cur={};for(const k in to)cur[k]=lerp(from[k],to[k],e);drawAge(cur,T,a)},()=>{stopT=null})}
  ag.addEventListener('input',()=>setAge(+ag.value));
  setAge(+ag.value,true);

  /* ---------- 3. organ map ---------- */
  const osv=$('#cdOrgSvg');let org='gut';
  function drawOrg(){
    /* narrow: the body stays central in a full-width 400 stage and the two label
       columns move outward with it; every organ group keeps its own hit area. */
    const N=vb(osv,'360 430','400 440');
    const DX=N?20:0,LLX=N?96:58,RLX=N?304:300;
    const on=k=>k===org;
    const st=k=>on(k)?'fill:var(--bad-soft);stroke:var(--bad);stroke-width:2.4':'fill:var(--panel);stroke:var(--muted);stroke-width:1.2';
    let s=`<g transform="translate(${DX} 0)">`;
    // body
    s+=`<g style="fill:var(--panel-2);stroke:var(--line);stroke-width:1.5"><circle cx="180" cy="46" r="30"/><rect x="166" y="72" width="28" height="18"/><rect x="118" y="86" width="124" height="190" rx="32"/><rect x="86" y="96" width="30" height="176" rx="14"/><rect x="244" y="96" width="30" height="176" rx="14"/><rect x="126" y="262" width="50" height="160" rx="18"/><rect x="184" y="262" width="50" height="160" rx="18"/></g>`;
    const G=(k,inner,cx,cy,r)=>`<g class="clk" data-org="${k}" role="button" tabindex="0" aria-label="${CD_ORG[k].n}">${on(k)?`<circle class="cd-pulse" cx="${cx}" cy="${cy}" r="${r}" style="fill:var(--bad)"/>`:''}${inner}</g>`;
    // muscle: upper arm + thigh
    s+=G('muscle',`<ellipse cx="101" cy="150" rx="11" ry="34" style="${st('muscle')}"/><ellipse cx="151" cy="318" rx="19" ry="40" style="${st('muscle')}"/>`,151,318,34);
    // marrow: femur
    s+=G('marrow',`<rect x="201" y="282" width="16" height="96" rx="8" style="${st('marrow')}"/><rect x="206" y="296" width="6" height="68" rx="3" style="fill:${on('marrow')?'var(--bad)':'var(--terra-soft)'}"/>`,209,330,30);
    // nerves: right arm and lower legs
    const nv=on('nerves')?'var(--bad)':'var(--gold)',nw=on('nerves')?2.6:1.6;
    s+=G('nerves',`<path d="M259 100 L259 266 M259 150 L266 176 M259 210 L252 236 M151 362 L151 418 M151 380 L143 404 M209 382 L209 418 M209 392 L217 412" style="fill:none;stroke:${nv};stroke-width:${nw};stroke-linecap:round"/><rect x="246" y="96" width="26" height="176" style="fill:transparent"/>`,259,190,26);
    // liver (person's right = viewer's left)
    s+=G('liver',`<path d="M128 146 C140 128 196 126 206 142 C204 160 168 168 132 168 C124 162 124 152 128 146Z" style="${st('liver')}"/>`,162,150,30);
    // kidneys
    s+=G('kidney',`<ellipse cx="142" cy="196" rx="10" ry="16" style="${st('kidney')}"/><ellipse cx="218" cy="196" rx="10" ry="16" style="${st('kidney')}"/>`,180,196,40);
    // gut
    let gi='';[[166,214],[184,212],[202,216],[160,232],[178,234],[196,232],[170,250],[190,250]].forEach(([x,y])=>gi+=`<circle cx="${x}" cy="${y}" r="9" style="${st('gut')}"/>`);
    s+=G('gut',gi,181,232,34);
    s+=`</g>`;
    // labels with leaders (organ end of the leader follows the body's shift)
    const L=(k,x,y,tx,ty,anchor)=>`<line x1="${x+DX}" y1="${y}" x2="${tx+(anchor==='end'?4:-4)}" y2="${ty-4}" style="stroke:var(--muted);stroke-width:1"/><text x="${tx}" y="${ty}" class="t-sm ${anchor==='end'?'t-end':''}" style="fill:${on(k)?'var(--bad)':'var(--muted)'};font-weight:${on(k)?700:500}">${CD_ORG[k].n.toLowerCase()}</text>`;
    s+=L('muscle',96,130,LLX,118,'end')+L('liver',132,154,LLX,160,'end')+L('gut',156,240,LLX,246,'end')+L('nerves',262,128,RLX,118,'')+L('kidney',226,198,RLX,200,'')+L('marrow',216,340,RLX,334,'');
    osv.innerHTML=s;
    const O=CD_ORG[org];
    $('#cdOrgNote').innerHTML=`<div class="kicker">מפת רעילות</div><h4>${O.n}</h4><dl class="kv"><div><dt>מה מדווח</dt><dd>${O.rep}</dd></div><div><dt>מה מנוטר</dt><dd>${O.mon}</dd></div></dl>`;
    $$('#m-coldose button[data-org]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.org===org));
  }
  function pick(k){org=k;drawOrg()}
  $$('#m-coldose button[data-org]').forEach(b=>b.onclick=()=>pick(b.dataset.org));
  osv.addEventListener('click',e=>{const g=e.target.closest('[data-org]');if(g)pick(g.dataset.org)});
  osv.addEventListener('keydown',e=>{const g=e.target.closest('[data-org]');if(g&&(e.key==='Enter'||e.key===' ')){e.preventDefault();pick(g.dataset.org)}});
  drawOrg();

  /* ---------- 4. kidney gauge ---------- */
  const cr=$('#cdCr'),rsv=$('#cdRenSvg'),dial=$('#cdDial');let dOn=false,ptr=null,stopR=null;
  let GX0=16,GX1=444;const gx=c=>GX0+(GX1-GX0)*clamp(c/120);
  function cat(c){if(dOn)return{k:'dialysis',n:'בדיאליזה',col:'var(--bad)'};if(c<30)return{k:'severe',n:'\u2067חמורה (<30)\u2069',col:'var(--bad)'};if(c<50)return{k:'moderate',n:'\u2067בינונית (30–50)\u2069',col:'var(--warn)'};if(c<=80)return{k:'mild',n:'\u2067קלה (50–80)\u2069',col:'var(--gold)'};return{k:'normal',n:'\u2067מעל 80\u2069',col:'var(--good)'}}
  const REN={
   normal:`מעל 80 mL/min, ההמלצות של העלון לפגיעה בתפקוד הכליות אינן חלות. [[FDA-Colcrys]]`,
   mild:`העלון (FMF): מטופלים עם פגיעה קלה (CrCl 50–80) מנוטרים מקרוב, וייתכן שיהיה צורך להפחית את המינון. [[FDA-Colcrys]]`,
   moderate:`העלון (FMF): מטופלים עם פגיעה בינונית (CrCl 30–50) מנוטרים מקרוב, וייתכן שיהיה צורך להפחית את המינון. סקירה אחת מצטטת הפחתת מינון מוצעת של 50% מתחת ל־50 mL/min. [[FDA-Colcrys,Leung2015]]`,
   severe:`העלון (FMF): כש־CrCl מתחת ל־30 mL/min, מתחילים ב־0.3 mg/day ומעלים רק בניטור צמוד. סקירה אחת מצטטת הפחתה של 50% מתחת ל־50 mL/min; אחרת מדווחת על זמן מחצית חיים ארוך פי 2–3 באי־ספיקת כליות חמורה. [[FDA-Colcrys,Leung2015,BenChetrit2018Textbook]]`,
   dialysis:`העלון (FMF): מתחילים ב־0.3 mg/day ומעלים רק בניטור צמוד. דיאליזה אינה מסלקת קולכיצין. במטופלי FMF בדיאליזה, הפינוי היה נמוך ב־75% (0.17 לעומת 0.73 L/h/kg) וזמן מחצית החיים ארוך יותר (18.8 לעומת 4.4 h) מאשר עם כליות תקינות, במערך של אותו מחקר. [[FDA-Colcrys]]`};
  function drawRen(p,c){const C=cat(c);let s='';
    const NR=vb(rsv,'460 200','400 240');GX0=NR?12:16;GX1=NR?388:444;
    [[0,30,'var(--bad-soft)','חמורה'],[30,50,'var(--warn-soft)',NR?'בינ׳':'בינונית'],[50,80,'var(--gold-soft)','קלה'],[80,120,'var(--good-soft)',NR?'ללא':'ללא התאמה']].forEach(([a,b,f,l])=>{s+=`<rect x="${f1(gx(a))}" y="60" width="${f1(gx(b)-gx(a))}" height="34" style="fill:${f}"/><text x="${f1((gx(a)+gx(b))/2)}" y="81" class="t-xs t-mid">${l}</text>`});
    s+=`<rect x="${GX0}" y="60" width="${GX1-GX0}" height="34" rx="3" style="fill:none;stroke:var(--line)"/>`;
    [0,30,50,80,120].forEach(v=>s+=`<text x="${f1(gx(v))}" y="112" class="t-xs t-mid">${v}</text>`);
    s+=`<text x="${GX1}" y="128" class="t-xs t-end">mL/min</text>`;
    const px=gx(p);s+=`<path d="M${f1(px)} 56 l-8 -14 h16z" style="fill:${C.col}"/><line x1="${f1(px)}" x2="${f1(px)}" y1="56" y2="98" style="stroke:var(--ink);stroke-width:2"/>`;
    s+=`<text x="${GX0}" y="28" class="t-big">${dOn?'בדיאליזה':'CrCl '+Math.round(c)+' mL/min'}</text><text x="${GX1}" y="30" class="t-sm t-end" style="fill:${C.col}">${dOn?'\u2067פינוי −75%\u2069':C.n}</text>`;
    if(dOn){const bx=GX0,by=NR?168:150,w=GX1-GX0;s+=`<text x="${bx}" y="${by}" class="t-xs">\u2067פינוי קולכיצין ב־FMF (מחקר העלון, L/h/kg)\u2069</text><rect x="${bx}" y="${by+8}" width="${f1(w*.73/.8)}" height="12" rx="3" style="fill:var(--good)"/><text x="${f1(bx+w*.73/.8-4)}" y="${by+18}" class="t-xs t-end" style="fill:var(--panel)">\u2067כליות תקינות 0.73\u2069</text><rect x="${bx}" y="${by+26}" width="${f1(w*.17/.8)}" height="12" rx="3" style="fill:var(--bad)"/><text x="${f1(bx+w*.17/.8+6)}" y="${by+36}" class="t-xs" style="fill:var(--bad)">\u2067דיאליזה 0.17 (−75%)\u2069</text>`}
    else s+=`<text x="${GX0}" y="${NR?178:160}" class="t-xs">\u2067גררו את המחוון או לחצו על "בדיאליזה".\u2069</text>`;
    rsv.innerHTML=s;
    $('#cdCrOut').textContent=dOn?'דיאליזה':Math.round(c);
    $('#cdRenNote').innerHTML=`<div class="kicker">תפקוד הכליות</div><h4>${C.n}</h4><p>${REN[C.k]}</p><p>לפי EULAR 2016, בירידה בתפקוד הכליות הסיכון לרעילות גבוה, ולכן יש לעקוב מקרוב אחרי סימני רעילות ואחרי CK ולהפחית את המינון; ההנחיה מציינת שאין ערך סף ספציפי של GFR מאחורי ההמלצה הזו. העלון קובע התווית נגד לשילוב קולכיצין עם מעכבי P-gp או עם מעכבים חזקים של CYP3A4 בפגיעה בתפקוד הכליות או הכבד. במחלת כליות עמילואידית, קולכיצין עזר בעיקר כשהקריאטינין ההתחלתי היה מתחת ל־1.5 mg/dL. [[Ozen2016,Ozen2017,FDA-Colcrys,Livneh1994]]</p>`;
  }
  function setRen(inst){const c=+cr.value,to=dOn?0:c;if(stopR)stopR();if(ptr==null||inst){ptr=to;drawRen(ptr,c);return}
    const fr=ptr;stopR=animate(380,p=>{ptr=lerp(fr,to,ease(p));drawRen(ptr,c)},()=>{stopR=null})}
  cr.addEventListener('input',()=>{if(dOn){dOn=false;dial.setAttribute('aria-pressed','false')}setRen(true)});
  dial.onclick=()=>{dOn=!dOn;dial.setAttribute('aria-pressed',dOn);setRen()};
  setRen(true);

  /* playWire only registers the exposure chart for the narrow/wide redraw, so
     chain the two widgets that have no player of their own. */
  const prevRedraw=redraws.coldose;
  redraws.coldose=()=>{prevRedraw&&prevRedraw();setAge(+ag.value,true);drawOrg()};
};
