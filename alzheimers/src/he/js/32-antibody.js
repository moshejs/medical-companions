
/* =============== 3.2 anti-amyloid antibodies over time =============== */
/* monotone cubic (Fritsch-Carlson) through published points: never overshoots, so
   an interpolated curve can only move between the values it connects */
function abMono(P){const n=P.length,x=P.map(p=>p[0]),y=P.map(p=>p[1]),d=[],t=[];
  for(let i=0;i<n-1;i++)d.push((y[i+1]-y[i])/(x[i+1]-x[i]));
  t[0]=d[0];t[n-1]=d[n-2];
  for(let i=1;i<n-1;i++)t[i]=d[i-1]*d[i]<=0?0:(d[i-1]+d[i])/2;
  for(let i=0;i<n-1;i++){if(d[i]===0){t[i]=t[i+1]=0;continue}const a=t[i]/d[i],b=t[i+1]/d[i],h=a*a+b*b;if(h>9){const k=3/Math.sqrt(h);t[i]=k*a*d[i];t[i+1]=k*b*d[i]}}
  return v=>{if(v<=x[0])return y[0];if(v>=x[n-1])return y[n-1];let i=0;while(v>x[i+1])i++;
    const h=x[i+1]-x[i],s=(v-x[i])/h,s2=s*s,s3=s2*s;
    return (2*s3-3*s2+1)*y[i]+(s3-2*s2+s)*h*t[i]+(-2*s3+3*s2)*y[i+1]+(s3-s2)*h*t[i+1]}}
const AB_WK=4.345;                         // weeks per month
const AB_G=['ללא עותק APOE4','עותק APOE4 אחד','שני עותקי APOE4'];
const AB_D={
 lec:{nm:'לקנמאב',trial:'CLARITY AD',end:18,ole:48,endLab:'18 ח׳',
  cl0:77.92,clEnd:22.99,pb0:75.03,pbEnd:78.63,pbEndK:'d',thr:30,thrLab:'ירוק = 30 CL, סף חיוביות',
  clPts:[ {m:0,v:77.92,k:'m'},{m:18,v:22.99,k:'s'} ],
  cdrP:1.66,cdrD:1.21,gap:abMono([ [0,0],[6,.17],[18,.45] ]),gapPts:[6],
  sec:{lab:'פער בתפקוד היומיומי (ADCS-MCI-ADL)',v:2.0,max:3.5,fmt:'+2.0'},
  e:[5.4,10.9,32.6],pe:[0.3,1.9,3.8],timing:abMono([ [0,0],[3,.71],[6,.92],[18,1] ]),tPts:[ [3,.71],[6,.92] ],   // timing shares are for all ARIA-E cases; applied per genotype they are calculated, drawn as open dots
  vig:14/AB_WK,vigLab:'14',
  mriL:[0,1,2,3,6],mriA:[0,8/AB_WK,12/AB_WK,26/AB_WK],mriX:[50/AB_WK],aLab:'MRI AUR/EU'},
 don:{nm:'דונאנמאב',trial:'TRAILBLAZER-ALZ 2',end:76/AB_WK,ole:36,endLab:'76 שב׳',
  cl0:104,clEnd:17,pb0:104,pbEnd:103.3,pbEndK:'d',thr:24.1,thrLab:'ירוק = 24.1 CL, סף סילוק',
  clPts:[ {m:0,v:104,k:'m'},{m:6,v:40.56,k:'s'},{m:12,v:20.8,k:'s'},{m:76/AB_WK,v:17,k:'d'} ],   // 17 = baseline 104.0 minus the published change of 87.0
  cdrP:2.42,cdrD:1.72,gap:abMono([ [0,0],[76/AB_WK,.70] ]),gapPts:[],
  sec:{lab:'פער ב־iADRS (גבוה יותר = טוב יותר)',v:2.92,max:4,fmt:'+2.92'},
  e:[15.7,22.8,40.6],pe:[0.8,1.9,3.4],timing:abMono([ [0,0],[3,.58],[76/AB_WK,1] ]),tPts:[ [3,.58] ],
  vig:24/AB_WK,vigLab:'24',
  mriL:[0,4/AB_WK,8/AB_WK,12/AB_WK,24/AB_WK],mriA:[0,4/AB_WK,8/AB_WK,12/AB_WK,24/AB_WK],mriX:[44/AB_WK],aLab:'MRI AUR',
  scans:[ [24/AB_WK,29.7,17],[52/AB_WK,66.1,47],[76/AB_WK,76.4,69] ]}
};
AB_D.don.clFn=abMono(AB_D.don.clPts.map(p=>[p.m,p.v]));
/* amyloid PET (centiloids) on drug: null where nothing is published */
function abCL(k,m){const d=AB_D[k];
  if(k==='lec'){if(m<=18)return d.cl0+(d.clEnd-d.cl0)*(1-Math.exp(-m/9))/(1-Math.exp(-2));return m<=30?d.clEnd:null}
  if(m<=d.end)return d.clFn(m);return d.clEnd+2.6*(m-d.end)/12}   // after stopping: published re-accumulation rate
function abCLp(k,m){const d=AB_D[k];return m<=d.end?d.pb0+(d.pbEnd-d.pb0)*m/d.end:null}
/* share of the group still receiving antibody */
function abDose(k,m){if(m<.1)return 0;if(k==='lec')return 1;
  if(m<24/AB_WK)return 1;if(m<52/AB_WK)return .83;if(m<72/AB_WK)return .53;return 0}

const AB_STEPS=[
 {from:0,at:0,
  lec:{k:'נקודת התחלה',t:'נקודת התחלה',txt:'בניסוי CLARITY AD חולקו באקראי 1,795 אנשים בני 50 עד 90 עם מחלת אלצהיימר מוקדמת (MCI או דמנציה קלה) ועמילואיד שאושר ב־PET או בנוזל השדרה: 898 קיבלו לקנמאב (Leqembi) במינון 10 mg/kg בעירוי לווריד כל 2 שבועות, ו־897 קיבלו פלצבו. ערך ה־PET הממוצע לעמילואיד היה 77.9 סנטילואיד (CL) בקבוצת לקנמאב ו־75.0 בקבוצת הפלצבו. כ־69% היו נשאי APOE4. [[vanDyck2023,LeqembiLabel2026,Perry2026]]',
   pt:'לכל המשתתפים בניסוי היו תסמיני זיכרון מוקדמים ועמילואיד מאושר. מחציתם קיבלו את התרופה ומחציתם עירוי דמה, ואף אחד לא ידע מי קיבל מה.',
   hook:'CLARITY AD: לקנמאב, 18 חודשים, תוצא עיקרי CDR-SB (סולם של 0 עד 18; ערך גבוה יותר = מצב גרוע יותר).'},
  don:{k:'נקודת התחלה',t:'נקודת התחלה',txt:'בניסוי TRAILBLAZER-ALZ 2 חולקו באקראי 1,736 אנשים עם מחלת אלצהיימר תסמינית מוקדמת, עמילואיד ב־PET וטאו ב־PET: 860 לדונאנמאב (Kisunla) ו־876 לפלצבו, בעירוי לווריד כל 4 שבועות במשך 72 שבועות. ערך העמילואיד הממוצע היה כ־104 CL. מתוך 8,240 אנשים שנבדקו לכניסה לניסוי, 6,504 לא נכללו, בעיקר בגלל מעט מדי עמילואיד או טאו. [[Sims2023,KisunlaLabel2025]]',
   pt:'הניסוי הזה דרש גם עמילואיד וגם טאו בסריקות, ולכן רוב האנשים שנבדקו לא יכלו להצטרף.',
   hook:'TRAILBLAZER-ALZ 2: דונאנמאב, 76 שבועות, תוצא עיקרי iADRS; CDR-SB היה תוצא משני מרכזי.'}},
 {from:.3,at:2,
  lec:{k:'חודשים 0 עד 3',t:'חודשים 0 עד 3: חלון ה־ARIA',txt:'לקנמאב נקשר בזיקה גבוהה לפרוטופיברילים מסיסים של עמילואיד, והמיקרוגליה מסלקת את מה שהוא מסמן. ARIA-E, בצקת הנראית ב־MRI, מופיעה בעיקר מוקדם: 71% מהמקרים החלו בתוך 3 חודשים ו־92% בתוך 6. תגובות לעירוי הופיעו אצל 26.4% לעומת 7% בפלצבו, שלושה רבעים מהן בעירוי הראשון. [[vanDyck2023,Honig2024,LeqembiLabel2026]]',
   pt:'החודשים הראשונים הם הזמן שבו תופעת הלוואי של בצקת במוח מופיעה בדרך כלל. לכן בדיקות ה־MRI מרוכזות בהתחלה.',
   hook:'ARIA-E הוא אירוע מוקדם: לפי העלון, רוב המקרים הופיעו ב־7 המנות הראשונות.'},
  don:{k:'חודשים 0 עד 3',t:'חודשים 0 עד 3: חלון ה־ARIA',txt:'דונאנמאב נקשר ל־N3pG, צורה מותמרת (פירוגלוטמט) של עמילואיד בטא שנמצאת רק ברובד שהשתקע. מבין אירועי ARIA-E הראשונים, 58% קרו עד העירוי השלישי, ורובם בתוך 24 השבועות הראשונים. תגובות לעירוי הופיעו אצל 8.7% לעומת 0.5%. [[KisunlaLabel2025,Rabinovici2025,Zimmer2025,Sims2023]]',
   pt:'הנוגדן הזה נאחז בצורה של עמילואיד שקיימת רק בתוך רבדים. בצקת ב־MRI, כשהיא מופיעה, מופיעה בדרך כלל מוקדם.',
   hook:'דונאנמאב נקשר לעמילואיד בטא מסוג N3pG (פירוגלוטמט), שקיים רק ברובד.'}},
 {from:3,at:4.5,
  lec:{k:'חודשים 3 עד 6',t:'הרובד יורד ראשון',txt:'הירידה ברובד לעומת פלצבו הייתה מובהקת סטטיסטית משבוע 13 ונמשכה עד שבוע 79. ערכי הסנטילואיד ב־3, 6 ו־12 חודשים פורסמו רק בתרשים שהמקורות שלנו לא יכלו לקרוא, ולכן העקומה כאן היא אינטרפולציה בין נקודת ההתחלה לבין 18 חודשים. [[LeqembiLabel2026,Eisai2022CTAD]]',
   pt:'בסריקות רואים שהרובד מתכווץ בתוך כשלושה חודשים. הקצב המדויק בין הביקורים מצויר כאן כהערכה חלקה.'},
  don:{k:'חודשים 3 עד 6',t:'הרובד יורד מהר',txt:'לפי תיאור החברה, הרובד ירד ב־61% עד 6 חודשים, ב־80% עד 12 חודשים וב־84% עד 18 חודשים (דיווח משני, מוצג כנקודות ריקות). השינוי בשבוע 76 נמדד כ־\u200E-87.0 CL. [[MHE2024,KisunlaLabel2025]]',
   pt:'דונאנמאב מסלק רובד מהר: רובו נעלם בתוך שנה.'}},
 {from:5.5,at:6,
  lec:{k:'חודש 6',t:'חודש 6: הקווים נפרדים',txt:'ב־CDR-SB נמצא לראשונה הבדל מובהק מפלצבו ב־6 חודשים: הפרש של 0.17 נקודות (רווח סמך 95%: 0.05 עד 0.29). שתי הקבוצות עדיין הידרדרו. [[Eisai2022CTAD,LeqembiLabel2026]]',
   pt:'בחצי שנה הקבוצה המטופלת מידרדרת מעט לאט יותר. שתי הקבוצות עדיין מידרדרות.',
   hook:'התועלת הקלינית מפגרת אחרי סילוק הרובד: העמילואיד יורד מחודש 3, וקווי ה־CDR-SB נפרדים מחודש 6.'},
  don:{k:'שבוע 24',t:'שבוע 24: סריקת הסילוק הראשונה',txt:'בסריקת ה־PET בשבוע 24, אצל 29.7% העמילואיד סולק (מתחת ל־24.1 CL), ו־17% עמדו בכלל המעבר לפלצבו סמוי: מתחת ל־11 CL בסריקה אחת, או 11 עד פחות מ־25 CL בשתי סריקות רצופות. [[Sims2023,KisunlaLabel2025]]',
   pt:'ברגע שסריקה הראתה שהרובד נעלם, האדם הפסיק לקבל את התרופה בלי לדעת זאת. התכנון הזה, הפסקה עם הסילוק, ייחודי לדונאנמאב.',
   hook:'הפסקה עם הסילוק: 17%, 47% ו־69% היו זכאים להפסיק בשבועות 24, 52 ו־76.'}},
 {from:10.5,at:12,
  lec:{k:'חודש 12',t:'חודש 12: הפער מתרחב',txt:'הפער ב־CDR-SB התרחב בכל ביקור, אחת ל־3 חודשים, והרובד המשיך לרדת. רק הפערים של 6 ו־18 חודשים פורסמו כמספרים במקורות שלנו, ולכן הקווים שביניהם הם אינטרפולציה. [[Eisai2022CTAD,LeqembiLabel2026]]',
   pt:'מחודש לחודש הפער גדל: הקבוצה המטופלת הידרדרה מעט פחות מקבוצת הפלצבו.'},
  don:{k:'שבוע 52',t:'שבוע 52: שני שלישים עם סילוק',txt:'בשבוע 52, אצל 66.1% העמילואיד סולק, ו־47% היו זכאים לעבור לפלצבו. במקורות שלנו אין ערכי ביניים של CDR-SB, ולכן הקווים הקליניים הם אינטרפולציה מנקודת ההתחלה עד שבוע 76. [[Sims2023,KisunlaLabel2025]]',
   pt:'אחרי שנה, אצל כשניים מכל שלושה אנשים לא נשאר בסריקה רובד משמעותי.'}},
 {from:15,at:18,
  lec:{k:'חודש 18',t:'חודש 18: התוצאה',txt:'ציון ה־CDR-SB החמיר ב־1.21 בקבוצת לקנמאב וב־1.66 בקבוצת הפלצבו: הפרש של 0.45 (רווח סמך 95%: 0.23 עד 0.67), שתואר כהאטה של 27%. העמילואיד ירד ב־55.5 CL לעומת עלייה של 3.6 CL בפלצבו, והגיע בסוף לכ־21 עד 23 CL; אצל 67% הוא היה מתחת ל־30 CL. ב־ADCS-MCI-ADL, סולם של תפקוד יומיומי, ההפרש היה 2.0 (האטה של 37%). ARIA-E: ‏12.6% לעומת 1.7%. אצל כ־15% שנושאים שני עותקי APOE4, ניתוח גישושי לא מצא השפעה על CDR-SB. [[vanDyck2023,Eisai2022CTAD,LeqembiLabel2026,Perry2026]]',
   pt:'אחרי 18 חודשים הקבוצה המטופלת הידרדרה בערך ברבע פחות מקבוצת הפלצבו. שתי הקבוצות הידרדרו.',
   hook:'לקנמאב: CDR-SB \u200E-0.45 ב־18 חודשים (האטה של 27%), עמילואיד \u200E-55.5 CL, ARIA-E 12.6%.'},
  don:{k:'שבוע 76',t:'שבוע 76: התוצאה',txt:'ציון ה־CDR-SB החמיר ב־1.72 בקבוצת דונאנמאב וב־2.42 בקבוצת הפלצבו: הפרש של 0.70 (רווח סמך 95%: 0.45 עד 0.95), האטה של 29%; בקבוצת הטאו הנמוך/הבינוני ההפרש היה 0.67 (כ־36 עד 37%). ב־iADRS ההפרש היה 2.92 (האטה של 22%; 3.25 ו־35% בטאו נמוך/בינוני). העמילואיד ירד ב־87.0 CL; אצל 76.4% הוא סולק, ו־69% היו זכאים להפסיק. ARIA-E: ‏24.0% לעומת 2.1%; שלושה מקרי מוות אחרי ARIA חמור נחשבו קשורים לטיפול. [[Sims2023,KisunlaLabel2025]]',
   pt:'אחרי כ־18 חודשים הקבוצה המטופלת הידרדרה בכ־30% פחות מקבוצת הפלצבו. שתי הקבוצות הידרדרו.',
   hook:'דונאנמאב: CDR-SB \u200E-0.70 (משולב), iADRS \u200E+2.92, עמילואיד \u200E-87 CL, ARIA-E 24.0%.'}},
 {from:18.3,at:'max',ole:true,
  lec:{k:'שלב המשך פתוח',t:'אחרי 18 חודשים: שלב פתוח',txt:'בשלב ההמשך כל המשתתפים יכלו לקבל לקנמאב. כ־70% היו שליליים לעמילואיד בתחילתו, ואצל מי שטופלו מההתחלה העמילואיד נשאר נמוך עד 30 חודשים. בהשוואה לקבוצה תצפיתית מותאמת (ADNI), הפער ב־CDR-SB היה 0.52 ב־18 חודשים, 1.01 ב־36 ו־1.75 ב־48 (תקציר כנס). המבקרים מציינים שההקצאה האקראית והסמיות אבדו: ב־36 חודשים CDR-SB החמיר ב־3.06 בטיפול רציף, ב־3.55 בהתחלה מאוחרת וב־3.92 ב־ADNI, ולטענתם הפער של 0.49 נקודות אינו מראה באופן משכנע שינוי במהלך המחלה. [[vanDyck2025OLE,vanDyck2025AAIC,Hazan2026a]]',
   pt:'המעקב הארוך נראה מעודד בעיני החברה, אבל בלי קבוצת פלצבו הרבה יותר קשה לפרש אותו.',
   hook:'בשלבי המשך פתוחים אובדות ההקצאה האקראית והסמיות; השוואות לקבוצות חיצוניות הן ראיות חלשות יותר.'},
  don:{k:'שלב המשך ארוך טווח',t:'אחרי 76 שבועות: שלב ההמשך',txt:'לאורך 3 שנים, ההפרש בין התחלה מוקדמת לבין קבוצת השוואה משוקללת מ־ADNI היה \u200E-1.2 ב־CDR-SB (רווח סמך 95%: \u200E-1.7 עד \u200E-0.7). הזמן שנחסך הוערך ב־6.9 חודשים בהתחלה מוקדמת וב־5.6 בהתחלה מאוחרת. אחרי הפסקת המתן, העמילואיד מצטבר מחדש בקצב חציוני של 2.4 עד 2.8 CL בשנה (קו מקווקו, תחזית לפי הקצב הזה). המבקרים מציינים ששתי הקבוצות החמירו בכ־4 נקודות CDR-SB עד 36 חודשים, וההבדל בזמן שנחסך היה רק 1.3 חודשים, ולדעתם זו השלמת פער ולא שינוי במהלך המחלה. [[Zimmer2026,Hazan2026b,KisunlaLabel2025]]',
   pt:'הרובד חוזר רק לאט אחרי שהתרופה מופסקת. השאלה אם הקבוצה שהתחילה מוקדם שומרת על יתרון מתמשך שנויה במחלוקת.',
   hook:'אחרי הפסקת דונאנמאב העמילואיד חוזר לאט: כ־2.4 עד 2.8 סנטילואיד בשנה.'}}
];

/* the size-of-benefit chart */
const AB_MAG={
 pts:{max:2,ticks:[0,.5,1,1.5,2],unit:'\u2067ההפרש בין תרופה לפלצבו ב־CDR-SB (נקודות)\u2069',
  refs:[ {id:'mcid',v:.98,lab:'\u2067סף ל־MCI: 0.98\u2069'},{id:'mcid',v:1.63,lab:'\u2067סף לדמנציה קלה: 1.63\u2069'} ],
  rows:[ {id:'pool',lab:'\u2067מאוחד, 8 נוגדנים\u2069',v:.18,txt:'0.18'},
   {id:'lec',lab:'\u2067לקנמאב, 18 חודשים\u2069',v:.45,lo:.23,hi:.67,txt:'0.45'},
   {id:'lec01',lab:'\u2067לקנמאב, \u2066≤1\u2069 עותק APOE4 (בדיעבד)\u2069',v:.58,lo:.35,hi:.81,txt:'0.58'},
   {id:'don',lab:'\u2067דונאנמאב, משולב, 76 שב׳\u2069',v:.70,lo:.45,hi:.95,txt:'0.70'},
   {id:'donlm',lab:'\u2067דונאנמאב, טאו נמוך/בינוני\u2069',v:.67,lo:.40,hi:.95,txt:'0.67'} ]},
 mo:{max:24,ticks:[0,6,12,18,24],unit:'\u2067חודשי התקדמות שנדחו או נחסכו (הערכות)\u2069',
  refs:[ {id:'need',v:11,lab:'\u2067כ־11 חודשים: נדרש לפער של 0.98\u2069'} ],
  rows:[ {id:'nice',lab:'\u2067ועדת NICE: דחייה\u2069',lo:4,hi:6,txt:'4–6'},
   {id:'tsI',lab:'\u2067דונאנמאב 76 שב׳, לפי iADRS\u2069',v:4.36,txt:'4.4'},
   {id:'tsC',lab:'\u2067דונאנמאב 76 שב׳, לפי CDR-SB\u2069',v:7.53,txt:'7.5'},
   {id:'rng',lab:'\u2067טווח בין שיטות\u2069',lo:4,hi:13,txt:'4–13'},
   {id:'hl',lab:'\u2067לקנמאב: עצמאות (מודל)\u2069',v:10,lo:4,hi:18,txt:'10'},
   {id:'hd',lab:'\u2067דונאנמאב: עצמאות (מודל)\u2069',v:13,lo:6,hi:24,txt:'13'},
   {id:'lte',lab:'\u2067דונאנמאב 3 שנים: מוקדם/מאוחר\u2069',v:6.9,v2:5.6,txt:'⁧6.9 מול 5.6\u2069'} ]}
};
const AB_EX={
 pool:{k:'מטא־אנליזה',t:'מאוחד על פני 8 נוגדנים: 0.18',txt:'מטא־אנליזה משנת 2024 של 8 נוגדנים נגד עמילואיד (23,202 משתתפים) מצאה הפרש מאוחד של 0.18 ב־CDR-SB ו־\u200E+0.32 ב־MMSE. המסקנה הייתה שאף אחד מהם, כולל לקנמאב (Leqembi) ודונאנמאב (Kisunla), לא עבר את ההבדל הקליני המשמעותי המזערי (MCID); הסיכון היחסי ל־ARIA-E היה 10.29 (מספר הנדרש לגרימת נזק: 9). המאגר כולל נוגדנים שנכשלו, ולכן הערך המאוחד נמוך מהתוצאות הנפרדות של לקנמאב ודונאנמאב (0.45 ו־0.70). [[Ebell2024,vanDyck2023,Sims2023]]'},
 lec:{k:'CLARITY AD',t:'לקנמאב: 0.45 נקודות',txt:'ההפרש אחרי 18 חודשים היה 0.45 (רווח סמך 95%: 0.23 עד 0.67) בסולם של 0 עד 18, האטה של 27%, וכל התוצאים המשניים המרכזיים היו גם הם לטובת לקנמאב. התומכים מדגישים את העקביות בין הסולמות; המבקרים מדגישים שהפער המוחלט קטן מחצי נקודה. [[vanDyck2023,LeqembiLabel2026]]'},
 lec01:{k:'תת־קבוצה, ניתוח בדיעבד',t:'לקנמאב, אפס או עותק APOE4 אחד: 0.58',txt:'אצל 85% ממשתתפי CLARITY AD שלא נשאו APOE4 או נשאו עותק אחד (האוכלוסייה שקיבלה מאוחר יותר אישור באיחוד האירופי ובבריטניה), ההפרש היה 0.58 (0.35 עד 0.81), האטה של 33%. זה היה ניתוח בדיעבד (post hoc) שביקשו ה־EMA וה־MHRA, ולכן הוא ראיה חלשה יותר מהתוצאה העיקרית שהוגדרה מראש. [[Perry2026]]'},
 don:{k:'TRAILBLAZER-ALZ 2',t:'דונאנמאב, אוכלוסייה משולבת: 0.70',txt:'בשבוע 76 ההפרש ב־CDR-SB היה 0.70 (0.45 עד 0.95), האטה של 29%, ו־23 מתוך 24 התוצאים בבדיקה ההיררכית היו מובהקים. הסיכון לעבור לשלב הבא בציון ה־CDR הכללי ירד ב־37.4%. [[Sims2023]]'},
 donlm:{k:'TRAILBLAZER-ALZ 2',t:'דונאנמאב, טאו נמוך/בינוני: 0.67',txt:'בקבוצת הטאו הנמוך/הבינוני, שהוגדרה מראש, ההפרש היה 0.67 (0.40 עד 0.95), האטה של כ־36 עד 37%, והסיכון להתקדם בשלב CDR ירד ב־38.6%. אנשים עם טאו גבוה הרוויחו פחות. [[Sims2023,KisunlaLabel2025]]'},
 mcid:{k:'ספים',t:'ההבדלים הקליניים המשמעותיים המזעריים (MCID)',txt:'מחקרים מבוססי עוגן מעריכים שהשינוי הקטן ביותר שרופא או בן משפחה יבחינו בו הוא כ־0.98 נקודות CDR-SB ב־MCI ו־1.63 בדמנציה קלה. אלה ספים ברמת האדם היחיד. מי שמבקרים את ההשוואה בינם לבין תוצאות הניסויים טוענים שהפרש ממוצע בין קבוצות הוא גודל אחר; בסימולציה אחת, פער של 0.98 במשך 18 חודשים היה מחייב האטה של כ־60%. [[Andrews2019,Lanctot2025,Petersen2023]]'},
 need:{k:'סימולציה',t:'מה יידרש לפער של 0.98 נקודות',txt:'מאמר מידול משנת 2025 העריך שכדי להגיע להפרש של 0.98 ב־CDR-SB בתוך 18 חודשים נדרשת האטה של כ־60%, כלומר כ־11 חודשים שנחסכים. המחברים טוענים שזה מראה שספים ברמת האדם היחיד הם קנה מידה לא נכון לתוצאות של קבוצות. [[Lanctot2025]]'},
 nice:{k:'NICE, אנגליה',t:'NICE: דחייה של כ־4 עד 6 חודשים',txt:'ועדת NICE העריכה שהתועלת מתונה, דחייה של ההתקדמות בכ־4 עד 6 חודשים, ושהעלות גבוהה מדי, ולכן לא המליצה על אף אחת מהתרופות בטיוטה הסופית מיוני 2025. ערעורים התקבלו חלקית בינואר 2026, והתרופות נבחנות מחדש. [[PJ2025,AlzEurope2026]]'},
 tsI:{k:'מחברי הניסוי',t:'זמן שנחסך לפי iADRS: 4.36 חודשים',txt:'מחברי TRAILBLAZER-ALZ 2 העריכו שהזמן שנחסך בשבוע 76 בקבוצת הטאו הנמוך/הבינוני הוא 4.36 חודשים לפי iADRS. [[Sims2023]]'},
 tsC:{k:'מחברי הניסוי',t:'זמן שנחסך לפי CDR-SB: 7.53 חודשים',txt:'לפי CDR-SB ההערכה לאותה קבוצה הייתה 7.53 חודשים. הפער בין שני הסולמות הוא אחת הסיבות לוויכוח על נתוני הזמן שנחסך. [[Sims2023]]'},
 rng:{k:'סקירת שיטות',t:'ההערכות נעות בין 4 ל־13 חודשים',txt:'סקירה משנת 2025 מצאה שהערכות הזמן שנחסך משתנות לפי השיטה, מכ־4 עד 13 חודשים. ליו ועמיתיו מציעים לשפוט תועלת לפי השאלה אם היא מורגשת, בעלת ערך וכדאית בהתחשב בעלויות ובסיכונים, ומזהירים שניתוחים בסגנון "מגיבים ולא מגיבים" עלולים להטעות. [[Araujo2025,Liu2023,Liu2025]]'},
 hl:{k:'מודל',t:'לקנמאב: עוד 10 חודשים של עצמאות',txt:'עבור אדם שמתחיל ב־CDR-SB של 2, מידול העריך שלקנמאב יאריך את העצמאות בפעילויות יומיומיות מורכבות (אינסטרומנטליות) ב־10 חודשים (רווח סמך 95%: 4 עד 18). זה מודל שהוקרן מממוצעי הניסוי, לא תוצאה שנצפתה. [[Hartz2025]]'},
 hd:{k:'מודל',t:'דונאנמאב: עוד 13 חודשים של עצמאות',txt:'אותו מודל העריך 13 חודשים (6 עד 24) עבור דונאנמאב בקבוצת הטאו הנמוך/הבינוני. [[Hartz2025]]'},
 lte:{k:'שלב המשך של 3 שנים',t:'התחלה מוקדמת מול מאוחרת: 6.9 מול 5.6 חודשים',txt:'שלב ההמשך של 3 שנים של החברה העריך שנחסכו 6.9 חודשים בהתחלה מוקדמת ו־5.6 בהתחלה מאוחרת. המבקרים מציינים שההבדל הוא רק 1.3 חודשים ושתי הקבוצות החמירו בכ־4 נקודות, ולדעתם זו הקבוצה המאוחרת שמשלימה את הפער. [[Zimmer2026,Hazan2026b]]'}
};

inits.antibody=()=>{
  const svg=$('#abSvg'),rg=$('#abT'),stEl=$('#abSteps');
  let drug='lec',g=1,ole=false,lastNote='',stepIdx=-1,stepKey='';
  const D=()=>AB_D[drug],MX=()=>ole?D().ole:18;
  const steps=()=>AB_STEPS.filter(s=>ole||!s.ole);
  const atOf=s=>s.at==='max'?MX():s.at;
  const T=(x,y,txt,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${txt}</text>`;
  const ln=(x1,y1,x2,y2,st)=>`<path d="M${f1(x1)} ${f1(y1)}L${f1(x2)} ${f1(y2)}" style="${st}"/>`;
  const dot=(x,y,col,kind)=>kind==='s'||kind==='d'?`<circle cx="${f1(x)}" cy="${f1(y)}" r="3.6" style="fill:var(--panel);stroke:${col};stroke-width:1.8"/>`
                                     :`<circle cx="${f1(x)}" cy="${f1(y)}" r="3.8" style="fill:${col};stroke:var(--panel);stroke-width:1.2"/>`;
  const poly=(fn,m0,m1,X,Y)=>{if(m1<=m0)return '';let d='';const n=Math.max(2,Math.ceil((m1-m0)*6));for(let i=0;i<=n;i++){const u=m0+(m1-m0)*i/n,v=fn(u);if(v==null)break;d+=(i?'L':'M')+f1(X(u))+' '+f1(Y(v))}return d};
  /* two labels at the end of two lines must not collide: push apart to at least gap */
  const sep=(a,b,gap=12)=>{if(b-a>=gap)return[a,b];const c=(a+b)/2;return[c-gap/2,c+gap/2]};
  const abY=(x,y,ang,o)=>`<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(ang*180/Math.PI)})" style="opacity:${f1(o)}"><path d="M0 0H7M0 0L-4.6 -4.2M0 0L-4.6 4.2" style="fill:none;stroke:var(--sky);stroke-width:2.2;stroke-linecap:round"/></g>`;
  const R=rng(53);
  const PL=[{u:.15,v:.62,r:1,th:0,sd:3},{u:.42,v:.80,r:.8,th:.1,sd:8},{u:.56,v:.45,r:1.1,th:.04,sd:12},{u:.85,v:.66,r:.95,th:.18,sd:5},{u:.3,v:.37,r:.7,th:.14,sd:21}];
  const AB=Array.from({length:18},(_,k)=>({p:k%5,u:.05+R()*.9,ph:R(),a:R()*Math.PI*2}));
  const MG=[{p:0,a:2.3},{p:2,a:-.6},{p:3,a:2.6}];

  /* ---------- panel 1: tissue + amyloid PET ---------- */
  function tissue(P,m){
    const d=D(),{x,y,w}=P,Mx=MX();let s='';
    s+=T(x,y,'⁧1 · רקמה ו־PET עמילואיד\u2069','t-sm','fill:var(--ink)');
    const fy=y+10,fh=160;
    s+=`<rect x="${x}" y="${fy}" width="${w}" height="${fh}" rx="10" style="fill:var(--cell);stroke:var(--line)"/>`;
    s+=`<rect x="${x+1}" y="${fy+8}" width="${w-2}" height="14" style="fill:var(--vessel);opacity:.16"/>`+ln(x+1,fy+8,x+w-1,fy+8,'stroke:var(--vessel);opacity:.55')+ln(x+1,fy+22,x+w-1,fy+22,'stroke:var(--vessel);opacity:.55');
    s+=T(x+6,fy+34,'כלי דם');
    s+=neuron(x+w*.7,fy+fh*.9,7,.55,{axon:-.3,axonLen:20})+neuron(x+w*.95,fy+fh*.34,6,.5,{axon:2.6,axonLen:16,dendrites:4});
    const mc=ole?m:Math.min(m,d.end);
    const clNow=abCL(drug,mc)??abCL(drug,30)??d.clEnd,f=clamp(clNow/d.cl0),base=Math.sqrt(d.cl0/104);
    const pls=PL.map(p=>{const k=clamp((f-p.th)/(1-p.th));return{cx:x+p.u*w,cy:fy+p.v*fh,R:20*p.r*base,r:20*p.r*base*Math.sqrt(k),sd:p.sd}});
    pls.forEach(p=>{if(p.r<p.R*.92)s+=`<circle cx="${f1(p.cx)}" cy="${f1(p.cy)}" r="${f1(p.R*.9)}" style="fill:none;stroke:var(--amber);stroke-width:1;opacity:.3;stroke-dasharray:1.5 3"/>`;
      if(p.r>1.5)s+=plaque(p.cx,p.cy,p.r,p.sd,clamp(p.r/5))});
    const dz=abDose(drug,m),nA=Math.round(AB.length*dz);
    for(let k=0;k<nA;k++){const a=AB[k],p=pls[a.p];if(p.r<3)continue;
      const q=((m/1.1)+a.ph)%1,rx=p.cx+Math.cos(a.a)*(p.r+4),ry=p.cy+Math.sin(a.a)*(p.r+4),vx=x+a.u*w,vy=fy+15;
      let px,py,o=1;if(q<.5){const e=ease(q/.5);px=lerp(vx,rx,e);py=lerp(vy,ry,e)}else{px=rx;py=ry;o=1-ramp(q,.8,1)}
      s+=abY(px,py,a.a,o*ramp(m,.1,.4))}
    MG.forEach(g0=>{const p=pls[g0.p];const act=(dz>0&&p.r>3)?ramp(m,.3,2):0;const dist=lerp(p.R+18,p.r+12,act);
      s+=microglia(p.cx+Math.cos(g0.a)*dist,p.cy+Math.sin(g0.a)*dist,5.5,1,act)});
    // readout
    const meas=d.clPts.find(p=>Math.abs(p.m-mc)<.26),proj=drug==='don'&&ole&&m>d.end+.05,none=abCL(drug,mc)==null;
    const tag=none?'ערך אחרון שפורסם':proj?'תחזית':meas?(meas.k==='s'?'נתון החברה':meas.k==='d'?'ערך מחושב':'ערך מהניסוי'):'אינטרפולציה';
    s+=T(x,y+192,`\u2067עמילואיד ב־PET ≈ ${Math.round(clNow)} CL\u2069`,'t-big')+T(x+w,y+192,tag,'t-xs t-end');
    // centiloid chart
    const cx0=x+30,cx1=x+w-64,cy0=y+222,cy1=y+312,X=v=>cx0+v/Mx*(cx1-cx0),Y=v=>cy1-v/115*(cy1-cy0);
    s+=T(x,y+212,`\u2067עמילואיד ב־PET \u200F(CL) · ${d.thrLab}\u2069`);
    [0,50,100].forEach(v=>{s+=ln(cx0,Y(v),cx1,Y(v),'stroke:var(--line);stroke-dasharray:2 4')+T(cx0-5,Y(v)+3,v,'t-xs t-end')});
    s+=ln(cx0,Y(d.thr),cx1,Y(d.thr),'stroke:var(--good);stroke-dasharray:4 3;opacity:.8')+T(cx0-5,Y(d.thr)+3,d.thr,'t-xs t-end','fill:var(--good)');
    const tks=ole?[0,12,24,36,48].filter(v=>v<=Mx):[0,6,12,18];tks.forEach(v=>{s+=T(X(v),cy1+12,v,'t-xs t-mid')});
    s+=T(cx1+6,cy1+12,'\u00A0חודש');
    if(ole)s+=`<rect x="${f1(X(d.end))}" y="${cy0}" width="${f1(cx1-X(d.end))}" height="${cy1-cy0}" style="fill:var(--panel-2);opacity:.55"/>`;
    const mp=Math.min(m,d.end),mdEnd=drug==='lec'?Math.min(m,30):Math.min(m,d.end);
    s+=`<path d="${poly(u=>abCLp(drug,u),0,mp,X,Y)}" style="fill:none;stroke:var(--muted);stroke-width:2"/>`;
    s+=`<path d="${poly(u=>abCL(drug,u),0,mdEnd,X,Y)}" style="fill:none;stroke:var(--sky);stroke-width:2.6"/>`;
    if(drug==='don'&&ole&&m>d.end)s+=`<path d="${poly(u=>abCL(drug,u),d.end,m,X,Y)}" style="fill:none;stroke:var(--sky);stroke-width:2;stroke-dasharray:4 3"/>`;
    s+=dot(X(0),Y(d.pb0),'var(--muted)','m');if(m>=d.end-.01)s+=dot(X(d.end),Y(d.pbEnd),'var(--muted)',d.pbEndK);
    d.clPts.forEach(p=>{if(m>=p.m-.01)s+=dot(X(p.m),Y(p.v),'var(--sky)',p.k)});
    s+=ln(X(m),cy0,X(m),cy1,'stroke:var(--ink);opacity:.3');
    const pv=abCLp(drug,Math.min(m,d.end)),dv=abCL(drug,drug==='lec'?Math.min(m,30):mc);
    let [ly1,ly2]=sep(Y(pv),Y(dv),11);
    s+=T(X(mp)+7,ly1+3,`\u2067פלצבו ${Math.round(pv)}\u2069`)+T(X(drug==='lec'?Math.min(m,30):mc)+7,ly2+3,`\u2067תרופה ${Math.round(dv)}\u2069`,'t-xs','fill:var(--sky)');
    // clearance waffle
    const wy=y+338,cs=9;let pct=0,stp=0,l1,l2,l3;
    if(drug==='don'){const sc=d.scans.filter(v=>m>=v[0]-.01).pop();
      if(sc){pct=sc[1];stp=sc[2];l1=`\u2067סריקה בשבוע ${Math.round(sc[0]*AB_WK)}\u2069`;l2=`\u2067${sc[1]}% הגיעו לסילוק (\u2066&lt;24.1 CL\u2069)\u2069`;l3=`\u2067${sc[2]}% עוברים לפלצבו\u2069`}
      else{l1='\u2067עדיין אין סריקת PET\u2069';l2='\u2067הראשונה בשבוע 24\u2069';l3=''}}
    else{if(m>=17.99){pct=ole&&m>18.3?70:67;l1=ole&&m>18.3?'בתחילת שלב ההמשך':'\u2067אחרי 79 שבועות\u2069';l2=ole&&m>18.3?'\u2067כ־70% שליליים לעמילואיד\u2069':'⁧67% מתחת ל־30 CL\u2069';l3=ole&&m>18.3?'\u2067(מתחת ל־30 CL)\u2069':'\u2067(הערך היחיד שפורסם)\u2069'}
      else{l1='\u2067שיעור מתחת ל־30 CL\u2069';l2='\u2067פורסם רק לשבוע 79\u2069';l3='\u2067הנקודות מתמלאות בחודש 18\u2069'}}
    const nC=Math.round(pct),nS=Math.round(stp);
    for(let i=0;i<100;i++){const cx=x+4+(i%10)*cs,cy=wy+4+Math.floor(i/10)*cs;
      const st=i<nS?'fill:var(--sky)':i<nC?'fill:var(--sky-soft);stroke:var(--sky);stroke-width:1':'fill:var(--amber-soft);stroke:var(--amber);stroke-width:.8';
      s+=`<circle cx="${cx}" cy="${cy}" r="3.3" style="${st}"/>`}
    const tx=x+104;s+=T(tx,wy+6,l1,'t-sm','fill:var(--ink)')+T(tx,wy+21,l2)+T(tx,wy+35,l3);
    const lg=drug==='don'?[ ['fill:var(--sky)','עברו לפלצבו'],['fill:var(--sky-soft);stroke:var(--sky)','\u2067סילוק, ממשיכים בטיפול\u2069'],['fill:var(--amber-soft);stroke:var(--amber)','ללא סילוק'] ]
                         :[ ['fill:var(--sky-soft);stroke:var(--sky)','\u2067מתחת ל־30 CL\u2069'],['fill:var(--amber-soft);stroke:var(--amber)','\u2067מעל 30 CL\u2069'] ];
    lg.forEach((l,i)=>{s+=`<circle cx="${tx+4}" cy="${wy+51+i*14}" r="3.3" style="${l[0]}"/>`+T(tx+12,wy+54+i*14,l[1])});
    s+=T(x,wy+104,'\u2067כל נקודה = 1% מהקבוצה, לפי תוצאת הסריקה\u2069');
    return s}

  /* ---------- panel 2: clinical course ---------- */
  function clinical(P,m){
    const d=D(),{x,y,w}=P,Mx=MX();let s='';
    const px0=x+66,px1=x+w-92,py0=y+34,py1=y+164,ymax=ole?4.4:2.6,X=v=>px0+v/Mx*(px1-px0),Y=v=>py0+v/ymax*(py1-py0);
    s+=T(x,y,'⁧2 · המהלך הקליני: CDR-SB\u2069','t-sm','fill:var(--ink)')+T(x,y+15,'\u2067שינוי מנקודת ההתחלה. נמוך יותר בגרף = גרוע יותר.\u2069');
    for(let v=0;v<=ymax;v++){s+=ln(px0,Y(v),px1,Y(v),'stroke:var(--line);stroke-dasharray:2 4')+T(px0-6,Y(v)+3,v?'+'+v:'0','t-xs t-end')}
    const tks=ole?[0,12,24,36,48].filter(v=>v<=Mx):[0,3,6,9,12,15,18];tks.forEach(v=>{s+=T(X(v),py1+13,v,'t-xs t-mid')});
    s+=T(x,py1+13,'חודש');
    if(ole){s+=`<rect x="${f1(X(d.end))}" y="${py0}" width="${f1(px1-X(d.end))}" height="${py1-py0}" style="fill:var(--panel-2);opacity:.6"/>`+T(px1-4,py0+11,'\u2067שלב פתוח, ללא פלצבו\u2069','t-xs t-end')}
    const mp=Math.min(m,d.end),pbo=u=>d.cdrP*u/d.end,drg=u=>pbo(u)-d.gap(u);
    if(m>=9)s+=T(px0+6,py1-36,'\u2067שתי הקבוצות מידרדרות.\u2069','t-xs','fill:var(--ink)')+T(px0+6,py1-23,'\u2067הטיפול מאט את ההידרדרות;\u2069','t-xs','fill:var(--ink)')+T(px0+6,py1-10,'\u2067הוא לא עוצר אותה.\u2069','t-xs','fill:var(--ink)');
    s+=`<path d="${poly(pbo,0,mp,X,Y)}" style="fill:none;stroke:var(--muted);stroke-width:2.4"/>`;
    s+=`<path d="${poly(drg,0,mp,X,Y)}" style="fill:none;stroke:var(--sky);stroke-width:2.8"/>`;
    s+=dot(X(0),Y(0),'var(--sky)','m');
    if(m>.4)s+=ln(X(mp),Y(drg(mp))+3,X(mp),Y(pbo(mp))-3,'stroke:var(--sky);stroke-width:1.5;opacity:.7');
    d.gapPts.forEach(gm=>{if(m>=gm-.01){s+=dot(X(gm),Y(pbo(gm)),'var(--muted)','s')+dot(X(gm),Y(drg(gm)),'var(--sky)','s')+(ole?'':T(X(gm)-5,Y(pbo(gm))+13,`\u2067${d.gap(gm).toFixed(2)} בחודש ${gm}\u2069`,'t-xs t-end','fill:var(--sky)'))}});
    if(m>=d.end-.01)s+=dot(X(d.end),Y(d.cdrP),'var(--muted)','m')+dot(X(d.end),Y(d.cdrD),'var(--sky)','m');
    if(m>=1.5){const yd=Y(drg(mp)),yp=Y(pbo(mp));const [a,b]=sep(yd,yp,12);
      s+=T(X(mp)+6,a+3,`\u2067${d.nm} \u2066+${drg(mp).toFixed(2)}\u2069\u2069`,'t-xs','fill:var(--sky)')+T(X(mp)+6,b+3,`\u2067פלצבו \u2066+${pbo(mp).toFixed(2)}\u2069\u2069`)}
    if(ole&&m>=d.end+.3){
      if(drug==='lec'){const o=ramp(m,30,36);if(o>0){const xp=X(36);
        [ [3.06,'\u2067רציף 3.06\u2069','var(--sky)'],[3.55,'\u2067התחלה מאוחרת 3.55\u2069','var(--muted)'],[3.92,'ADNI 3.92','var(--violet)']].forEach(([v,l,c],i)=>{const yy=Y(v)+[-3,0,4][i];s+=`<g style="opacity:${f1(o)}">`+dot(xp,Y(v),c,'s')+T(xp+7,yy+3,l,'t-xs','fill:'+c)+'</g>'});
        s+=T(xp-6,Y(3.06)-10,'\u2067ב־36 חודשים, 0 או 1 עותקי APOE4\u2069','t-xs t-end','opacity:'+f1(o))}}
      else{const o=ramp(m,30,35.5);if(o>0)s+=`<g style="opacity:${f1(o)}">`+dot(X(36),Y(4),'var(--ink)','s')+T(X(36)+7,Y(4)+3,'\u2067שתי הקבוצות ≈ \u2066+4\u2069\u2069','t-xs','fill:var(--ink)')+'</g>'}}
    // readout lines
    const near=d.gapPts.find(v=>Math.abs(v-m)<.26)!=null||Math.abs(m-d.end)<.26;
    const gNow=d.gap(mp);let r1,r2,r3='';
    if(m>d.end+.26){r1=`\u2067הפער בסוף הניסוי הסמוי: ${d.gap(d.end).toFixed(2)} נקודות (פורסם)\u2069`}
    else r1=`\u2067הפער כעת: ${gNow.toFixed(2)} נקודות (${near?'פורסם':'אינטרפולציה'})\u2069`;
    if(ole&&m>d.end+.26){if(drug==='lec'){r2='\u2067שלב פתוח מול ADNI: פער 0.52, 1.01, 1.75 ב־18, 36, 48 ח׳\u2069';r3='\u2067נקודות 36 החודשים כפי שצוטטו במכתב ביקורת\u2069'}
      else{r2='\u2067המשך של 3 שנים מול ADNI: \u2066-1.2\u2069; זמן שנחסך 6.9 מול 5.6 ח׳\u2069';r3='\u2067התחלה מוקדמת ומאוחרת: שתיהן ≈ \u2066+4\u2069 עד 36 ח׳ (מכתב)\u2069'}}
    else{r2=drug==='lec'?'\u2067האטה ב־18 ח׳: 27%. שתי הקבוצות עדיין הידרדרו.\u2069':'\u2067האטה ב־76 שב׳: 29% במשולב, 36 עד 37% בטאו נמוך/בינוני\u2069';
      if(g===2)r3=drug==='lec'?'\u2067שני עותקי APOE4: אין השפעה על CDR-SB (תת־קבוצה, ניתוח גישושי)\u2069':'\u2067לפי גנוטיפ: ראו את סיכון ה־ARIA למטה\u2069'}
    s+=T(x,y+192,r1,'t-xs','fill:var(--ink)')+T(x,y+206,r2)+(r3?T(x,y+220,r3):'');
    // secondary scale meter
    const sv=d.sec.v*clamp(d.gap(mp)/d.gap(d.end)),bw=w-2,bx=x,by=y+240,sx=v=>bx+v/d.sec.max*bw;
    s+=T(x,y+234,`\u2067${d.sec.lab}: \u2066+${sv.toFixed(2)}\u2069${m>=d.end-.26?' (פורסם)':' (אינטרפולציה)'}\u2069`);
    s+=`<rect x="${bx}" y="${by}" width="${bw}" height="7" rx="3.5" style="fill:var(--panel-2)"/><rect x="${bx}" y="${by}" width="${f1(sx(sv)-bx)}" height="7" rx="3.5" style="fill:var(--sky)"/>`;
    s+=ln(sx(d.sec.v),by-3,sx(d.sec.v),by+10,'stroke:var(--ink);stroke-width:1.5');
    return s}

  /* ---------- panel 3: ARIA ---------- */
  function aria(P,m){
    const d=D(),{x,y,w}=P,Mx=MX();let s='';
    const px0=x+66,px1=x+w-92,py0=y+30,py1=y+120,ymax=45,X=v=>px0+v/Mx*(px1-px0),Y=v=>py1-v/ymax*(py1-py0);
    s+=T(x,y,'⁧3 · ARIA-E: בצקת ב־MRI\u2069','t-sm','fill:var(--ink)')+T(x,y+15,`\u2067שיעור מצטבר עם ARIA-E · ${AB_G[g]}\u2069`);
    s+=`<rect x="${f1(X(0))}" y="${py0}" width="${f1(X(d.vig)-X(0))}" height="${y+186-py0}" style="fill:var(--warn-soft);opacity:.8"/>`;
    if(ole)s+=`<rect x="${f1(X(d.end))}" y="${py0}" width="${f1(px1-X(d.end))}" height="${py1-py0}" style="fill:var(--panel-2);opacity:.6"/>`+T(x+w,y+15,'\u2067אפור: שלב פתוח\u2069','t-xs t-end');
    [0,20,40].forEach(v=>{s+=ln(px0,Y(v),px1,Y(v),'stroke:var(--line);stroke-dasharray:2 4')+T(px0-6,Y(v)+3,v+'%','t-xs t-end')});
    const tks=ole?[0,12,24,36,48].filter(v=>v<=Mx):[0,3,6,9,12,15,18];tks.forEach(v=>{s+=T(X(v),py1+13,v,'t-xs t-mid')});
    s+=T(x,py1+13,'חודש');
    const mp=Math.min(m,d.end),E=d.e[g],PE=d.pe[g],dr=u=>E*d.timing(u),pb=u=>PE*u/d.end;
    s+=`<path d="${poly(pb,0,mp,X,Y)}" style="fill:none;stroke:var(--muted);stroke-width:2.2"/>`;
    s+=`<path d="${poly(dr,0,mp,X,Y)}" style="fill:none;stroke:var(--sky);stroke-width:2.8"/>`;
    s+=dot(X(0),Y(0),'var(--sky)','m');
    d.tPts.forEach(([tm,fr])=>{if(m>=tm-.01)s+=dot(X(tm),Y(E*fr),'var(--sky)','d')});
    if(m>=d.end-.01)s+=dot(X(d.end),Y(E),'var(--sky)','m')+dot(X(d.end),Y(PE),'var(--muted)','m');
    if(m>=1.5){const [a,b]=sep(Y(dr(mp)),Y(pb(mp)),12);s+=T(X(mp)+6,a+3,`\u2067${d.nm} ${dr(mp).toFixed(1)}%\u2069`,'t-xs','fill:var(--sky)')+T(X(mp)+6,b+3,`\u2067פלצבו ${pb(mp).toFixed(1)}%\u2069`)}
    s+=ln(X(m),py0,X(m),y+186,'stroke:var(--ink);opacity:.3');
    // dosing and MRI rows
    const rows=[y+142,y+160,y+178];
    s+=T(x,rows[0]+3,'מנות')+T(x,rows[1]+3,'\u2067MRI בעלון\u2069')+T(x,rows[2]+3,d.aLab);
    const dz=[];if(drug==='lec'){for(let wk=0;wk<=78;wk+=2)dz.push(wk/AB_WK);if(ole)for(let wk=82;wk/AB_WK<=Mx;wk+=4)dz.push(wk/AB_WK)}else{for(let wk=0;wk<=72;wk+=4)dz.push(wk/AB_WK)}
    dz.forEach(v=>{if(v<=Mx)s+=ln(X(v),rows[0]-4,X(v),rows[0]+4,`stroke:${v<=m?'var(--sky)':'var(--muted)'};stroke-width:1.4;opacity:${v<=m?1:.45}`)});
    const sq=(v,row,past)=>`<rect x="${f1(X(v)-3.5)}" y="${row-3.5}" width="7" height="7" rx="1.5" style="fill:${past?'var(--sky)':'var(--panel)'};stroke:var(--sky);stroke-width:1.4"/>`;
    const dia=(v,row,past)=>`<rect x="${f1(X(v)-3.2)}" y="${row-3.2}" width="6.4" height="6.4" transform="rotate(45 ${f1(X(v))} ${row})" style="fill:${past?'var(--sky)':'var(--panel)'};stroke:var(--sky);stroke-width:1.4"/>`;
    d.mriL.forEach(v=>{s+=sq(v,rows[1],m>=v)});d.mriA.forEach(v=>{s+=sq(v,rows[2],m>=v)});d.mriX.forEach(v=>{s+=dia(v,rows[2],m>=v)});
    // readouts
    const sym=[1.4,1.7,9.2],H=[11.5,13.8,38.3],anyA=[25,36,55],anyP=[12,13,22];
    let r1,r2;
    if(drug==='lec'){r1=`\u2067עד 18 ח׳: ARIA-E ${E}% מול ${PE}% בפלצבו; עם תסמינים ${sym[g]}%\u2069`;
      r2=g===2?'\u2067ARIA-E חמור בהדמיה: 5% (7 מתוך 141); ARIA-H 38.3%\u2069':`\u2067ARIA-H ${H[g]}%. עיתוי: 71% מהמקרים עד חודש 3, 92% עד חודש 6\u2069`;
      if(ole&&m>d.end+.26)r2='\u2067שלב ההמשך: ARIA-E חדש אחרי חודש 6 אצל 1.7% (MRI)\u2069'}
    else{r1=`\u2067עד 76 שב׳: ARIA-E ${E}% מול ${PE}% בפלצבו; ARIA כלשהו ${anyA[g]}% מול ${anyP[g]}%\u2069`;
      r2=g===2?'\u2067טיטרציה מותאמת, 52 שב׳: 24.4% מול 57.1% במינון הרגיל\u2069':'⁧58% מאירועי ARIA-E הראשונים עד המנה ה־3; 98% חלפו ב־MRI\u2069';
      if(ole&&m>d.end+.26)r2='\u2067מוות בשלב ההמשך: אחד מ־ARIA-E, אחד מדימום אחרי טיפול ממיס קרישים\u2069'}
    s+=T(x,y+202,r1,'t-xs','fill:var(--ink)')+T(x,y+216,r2)+T(x,y+230,`\u2067הרצועה המוצללת: חלון הערנות המוגברת לפי העלון (${d.vigLab} השבועות הראשונים)\u2069`);
    return s}

  function legend(x,y,N){const sw=(cx,cy,k)=>dot(cx,cy,'var(--muted)',k);let s='';
    const dash=(x0,y0)=>ln(x0,y0-3,x0+18,y0-3,'stroke:var(--sky);stroke-width:2;stroke-dasharray:4 3');
    const dm=(cx,cy)=>`<rect x="${cx-3.2}" y="${cy-3.2}" width="6.4" height="6.4" transform="rotate(45 ${cx} ${cy})" style="fill:var(--panel);stroke:var(--sky);stroke-width:1.4"/>`;
    if(!N){s+=sw(x+4,y-3,'m')+T(x+12,y,'מדידה בניסוי')+sw(x+132,y-3,'s')+T(x+140,y,'\u2067נתון החברה או ערך מקורב\u2069')+dash(x+282,y)+T(x+306,y,'תחזית לפי קצב שפורסם')+dm(x+510,y-3)+T(x+520,y,'\u2067MRI נוסף בסיכון גבוה (AUR)\u2069');
      s+=T(x,y+15,'\u2067הקווים בין הנקודות הם צורות משוערות (אינטרפולציה), לא מדידות. הרקמה היא סכמה של אדם אחד, לא בקנה מידה.\u2069')}
    else{s+=sw(x+4,y-3,'m')+T(x+12,y,'מדידה בניסוי')+sw(x+138,y-3,'s')+T(x+146,y,'\u2067נתון החברה או ערך מקורב\u2069');
      s+=dash(x,y+14)+T(x+24,y+14,'תחזית לפי קצב שפורסם');
      s+=dm(x+4,y+25)+T(x+14,y+28,'\u2067MRI נוסף למטופלים בסיכון גבוה (AUR)\u2069');
      s+=T(x,y+42,'\u2067הקווים בין הנקודות משוערים, לא נתונים.\u2069')}
    return s}

  function draw(m){
    m=+m;const N=vb(svg,'720 556','400 1070');
    const L=N?{T:{x:12,y:16,w:376},C:{x:12,y:486,w:376},A:{x:12,y:766,w:376},lg:[12,1018]}
             :{T:{x:12,y:16,w:264},C:{x:296,y:16,w:412},A:{x:296,y:282,w:412},lg:[12,532]};
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    s+=tissue(L.T,m)+clinical(L.C,m)+aria(L.A,m)+legend(L.lg[0],L.lg[1],N);
    svg.innerHTML=s;
    $('#abMo').textContent=m<.05?'נקודת התחלה':`חודש ${f1(m)}`;
    const S=steps(),p=phaseOf(S,m);setSt(p,m);
    const d=D(),mp=Math.min(m,d.end),cl=abCL(drug,ole?m:mp)??abCL(drug,30);
    const read=`<p class="readout"><span>חודש <b>${Math.round(m)}</b></span><span>עמילואיד <b>≈${Math.round(cl)} CL</b></span><span>הפער ב־CDR-SB <b>${d.gap(mp).toFixed(2)}</b></span><span>ARIA-E עד כה <b>${(d.e[g]*d.timing(mp)).toFixed(1)}%</b> (${AB_G[g]})</span></p><p class="stage-cap">ערכים בין ביקורים שפורסמו הם אינטרפולציה.</p>`;
    const html=noteHTML(S[p][drug])+read;
    if(html!==lastNote){$('#abNote').innerHTML=html;lastNote=html}
  }
  function buildSteps(){const S=steps(),key=drug+ole;if(key===stepKey)return;stepKey=key;
    stEl.innerHTML=S.map((s,i)=>`<button data-st="${i}" aria-pressed="false"><b>${String(i+1).padStart(2,'0')}</b><span>${s[drug].t}</span></button>`).join('');stepIdx=-1}
  function setSt(i,m){const S=steps();if(i!==stepIdx){$$('[data-st]',stEl).forEach((b,k)=>b.setAttribute('aria-pressed',k===i));stepIdx=i}
    rg.setAttribute('aria-valuetext',`חודש ${f1(m)}. שלב ${i+1} מתוך ${S.length}: ${S[i][drug].t}`)}
  stEl.setAttribute('role','group');stEl.setAttribute('aria-label','שלבים');
  stEl.addEventListener('click',e=>{const b=e.target.closest('[data-st]');if(!b)return;stop();const s=steps()[+b.dataset.st];rg.value=atOf(s);draw(+rg.value)});
  const stop=playWire(rg,$('#abPlay'),draw,16000,'הפעלה חוזרת','antibody');
  const press=(ids,on)=>ids.forEach(id=>$(id).setAttribute('aria-pressed',id===on));
  function setMax(){const mx=MX();rg.max=mx;if(+rg.value>mx)rg.value=mx;buildSteps();draw(+rg.value)}
  $('#abLec').onclick=()=>{drug='lec';press(['#abLec','#abDon'],'#abLec');setMax()};
  $('#abDon').onclick=()=>{drug='don';press(['#abLec','#abDon'],'#abDon');setMax()};
  [0,1,2].forEach(i=>{$('#abG'+i).onclick=()=>{g=i;press(['#abG0','#abG1','#abG2'],'#abG'+i);draw(+rg.value)}});
  $('#abOle').onclick=()=>{ole=!ole;$('#abOle').setAttribute('aria-pressed',ole);stop();setMax()};
  buildSteps();draw(+rg.value);

  /* ---------- how big is the benefit ---------- */
  const mg=$('#abMag');let mode='pts',sel='lec',grow=1,stopG=null;
  function drawMag(){
    const N=vb(mg,'720 10','400 10'),C=AB_MAG[mode],rows=C.rows,rh=N?46:34,top=58;
    const H=top+rows.length*rh+40;mg.setAttribute('viewBox',`0 0 ${N?400:720} ${H}`);
    const ax0=N?12:300,ax1=N?384:700,Xs=v=>ax0+v/C.max*(ax1-ax0);
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    rows.forEach((r,i)=>{const ry=top+i*rh;if(r.id===sel)s+=`<rect x="4" y="${ry-2}" width="${(N?400:720)-8}" height="${rh-4}" rx="8" style="fill:var(--sky-soft)"/>`});
    const axY=top+rows.length*rh+4;
    C.ticks.forEach(v=>{s+=ln(Xs(v),top-6,Xs(v),axY,'stroke:var(--line);stroke-dasharray:2 4')+T(Xs(v),axY+14,v,'t-xs t-mid')});
    s+=T(N?12:ax0,axY+30,C.unit);
    C.refs.forEach((r,i)=>{const on=sel===r.id,st=`stroke:var(--rose);stroke-width:${on?2.4:1.6};stroke-dasharray:5 3`;
      if(N){s+=ln(Xs(r.v),top-8-(C.refs.length-1-i)*14,Xs(r.v),top-4,st);rows.forEach((_,j)=>{const ry=top+j*rh;s+=ln(Xs(r.v),ry+18,Xs(r.v),ry+38,st)});s+=ln(Xs(r.v),axY-6,Xs(r.v),axY,st)}
      else s+=ln(Xs(r.v),top-8-(C.refs.length-1-i)*14,Xs(r.v),axY,st);
      s+=N?T(12,18+i*14,r.lab,'t-xs',`fill:var(--rose);font-weight:${on?700:500}`):T(Xs(r.v)+3,18+i*14,r.lab,'t-xs t-end',`fill:var(--rose);font-weight:${on?700:500}`)});
    rows.forEach((r,i)=>{const ry=top+i*rh,by=N?ry+22:ry+10,on=r.id===sel,k=grow;
      s+=T(N?12:16,N?ry+12:ry+18,r.lab,'t-sm',`fill:var(--ink);font-weight:${on?700:500}`);
      if(r.v!=null&&r.v2==null)s+=`<rect x="${ax0}" y="${by}" width="${f1((Xs(r.v)-ax0)*k)}" height="11" rx="3" style="fill:var(--sky);opacity:${on?1:.75}"/>`;
      if(r.lo!=null){const a=Xs(r.v==null?r.lo:r.lo),b=Xs(r.hi);
        if(r.v==null)s+=`<rect x="${f1(a)}" y="${by}" width="${f1((b-a)*k)}" height="11" rx="3" style="fill:var(--amber-soft);stroke:var(--amber);stroke-width:1.2"/>`;
        else if(k>.98)s+=ln(a,by+5.5,b,by+5.5,'stroke:var(--ink);stroke-width:1.4')+ln(a,by+1,a,by+10,'stroke:var(--ink);stroke-width:1.4')+ln(b,by+1,b,by+10,'stroke:var(--ink);stroke-width:1.4')}
      if(r.v2!=null&&k>.5){s+=ln(Xs(r.v2),by+5.5,Xs(r.v),by+5.5,'stroke:var(--muted);stroke-width:1.4');s+=`<circle cx="${f1(Xs(r.v))}" cy="${by+5.5}" r="5" style="fill:var(--sky)"/><circle cx="${f1(Xs(r.v2))}" cy="${by+5.5}" r="5" style="fill:var(--panel);stroke:var(--sky);stroke-width:2"/>`}
      s+=T(N?388:ax0-10,N?ry+12:ry+18,r.txt,'t-sm t-end',`fill:var(--sky);font-weight:700;opacity:${f1(ramp(k,.5,1))}`)});
    mg.innerHTML=s;
    const ex=AB_EX[sel];$('#abMagNote').innerHTML=noteHTML({k:ex.k,t:ex.t,txt:ex.txt,
      pt:mode==='pts'?'העמודות מראות בכמה פחות הידרדרה הקבוצה המטופלת לעומת קבוצת הפלצבו, בסולם של 18 נקודות. הקווים המקווקווים הם השינויים הקטנים ביותר שנחשבים מורגשים אצל אדם יחיד.':'אלה הערכות של מספר חודשי ההידרדרות שהתרופה עשויה לדחות. הן תלויות מאוד בשיטה שבה השתמשו.',
      hook:'MCID ברמת האדם היחיד (כ־1 עד 2 נקודות CDR-SB) לעומת הפרש בין קבוצות (0.45 עד 0.70): הוויכוח הוא בחלקו על השאלה אם אפשר בכלל להשוות ביניהם.'});
  }
  function magBtns(){const C=AB_MAG[mode],ids=[...C.rows.map(r=>[r.id,r.lab]),[C.refs[0].id,mode==='pts'?'ספים (MCID)':'מה נדרש לפער של 0.98']];
    $('#abMagBtns').innerHTML=ids.map(([id,l])=>`<button class="btn" data-mg="${id}" aria-pressed="${id===sel}">${l}</button>`).join('')}
  $('#abMagBtns').addEventListener('click',e=>{const b=e.target.closest('[data-mg]');if(!b)return;sel=b.dataset.mg;$$('[data-mg]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawMag()});
  function setMode(md){mode=md;$('#abMagPts').setAttribute('aria-pressed',md==='pts');$('#abMagMo').setAttribute('aria-pressed',md==='mo');
    sel=AB_MAG[md].rows[md==='pts'?1:0].id;magBtns();stopG&&stopG();grow=0;stopG=animate(700,p=>{grow=ease(p);drawMag()},()=>{grow=1;drawMag()})}
  $('#abMagPts').onclick=()=>setMode('pts');$('#abMagMo').onclick=()=>setMode('mo');
  magBtns();drawMag();
  const prevR=redraws.antibody;redraws.antibody=()=>{prevR&&prevR();drawMag()};

  $('#abDebate').innerHTML=`
   <div class="card"><h4><span class="tag">קריאה אחת</span>תועלת אמיתית שהולכת וגדלה</h4><ul>
    <li>שני הניסויים עמדו בתוצאים העיקריים שלהם, עם תוצאות עקביות בסולמות המשניים: כל התוצאים המשניים המרכזיים של לקנמאב, ו־23 מתוך 24 התוצאים בבדיקה ההיררכית של דונאנמאב. [[vanDyck2023,Sims2023]]</li>
    <li>ספים ברמת האדם היחיד (MCID) לא נועדו לשפוט ממוצע בין קבוצות; פער קבוצתי של 0.98 נקודות היה מחייב האטה של כ־60%. [[Petersen2023,Lanctot2025]]</li>
    <li>כשמתרגמים לזמן, ההערכות נעות בין כ־4 ל־13 חודשים, ולפי מודלים הרווח בעצמאות הוא 10 עד 13 חודשים. [[Araujo2025,Hartz2025]]</li>
    <li>עמילואיד נמוך יותר אחרי הטיפול היה קשור להידרדרות איטית יותר (CDR-SB, R² 0.87), וזה תומך בסילוק הרובד כמנגנון. [[Lu2025]]</li>
    <li>שלבי ההמשך של החברות מדווחים על פערים שממשיכים להתרחב לעומת קבוצות השוואה חיצוניות. [[vanDyck2025AAIC,Zimmer2026]]</li></ul></div>
   <div class="card"><h4><span class="tag">קריאה אחרת</span>תועלת קטנה במחיר ממשי</h4><ul>
    <li>הפרשים של 0.45 עד 0.70 נמוכים מספי MCID מבוססי עוגן של כ־1 עד 2 נקודות; מטא־אנליזה מצאה שאף נוגדן לא עבר את ה־MCID. [[Andrews2019,Ebell2024]]</li>
    <li>יש לשפוט תועלת לפי השאלה אם היא מורגשת, בעלת ערך וכדאית בהתחשב בעלות ובסיכון; ניתוחים בסגנון "מגיבים ולא מגיבים" עלולים להטעות. [[Liu2023,Liu2025]]</li>
    <li>בשלבי ההמשך אבדו ההקצאה האקראית והסמיות; נראה שקבוצות ההתחלה המאוחרת משלימות את הפער, וזה טיעון נגד שינוי מתמשך במהלך המחלה. [[Hazan2026a,Hazan2026b]]</li>
    <li>NICE העריכה שדחייה של 4 עד 6 חודשים יקרה מדי; מחיר המחירון של Leqembi בארה״ב היה $26,500 לשנה. [[PJ2025,KFF2023]]</li>
    <li>ARIA, בדיקות MRI תכופות ועירויים הם נטל, ואובדן נוסף של נפח מוח עדיין לא הוסבר. [[Sims2023,LeqembiLabel2026,Alves2023]]</li></ul></div>`;

  /* ---------- targets table ---------- */
  $('#abTargets').innerHTML=`<table><thead><tr><th>נוגדן</th><th>למה הוא נקשר</th><th>סילוק הרובד</th><th>התוצאה הקלינית</th></tr></thead><tbody>
   <tr><th>לקנמאב</th><td>פרוטופיברילים מסיסים, בעוצמה גבוהה פי 10 בערך מאשר לסיבים בהשוואה במעבדה; לפי העלון, צורות מצטברות מסיסות ובלתי מסיסות. [[vanDyck2023,Soderberg2023,LeqembiLabel2026]]</td><td>\u200E-55.5 CL ב־18 חודשים [[vanDyck2023]]</td><td>האט את ההחמרה ב־CDR-SB ב־0.45 [[vanDyck2023]]</td></tr>
   <tr><th>דונאנמאב</th><td>עמילואיד בטא מסוג N3pG (פירוגלוטמט), שנמצא רק ברובד שהשתקע. [[KisunlaLabel2025,Mintun2021]]</td><td>\u200E-87.0 CL ב־76 שבועות; אצל 76.4% סולק [[Sims2023]]</td><td>האט את ההחמרה ב־CDR-SB ב־0.70 [[Sims2023]]</td></tr>
   <tr><th>אדוקנומאב (Aduhelm)</th><td>צורות מצטברות מסיסות ובלתי מסיסות; מעדיף סיבים על פני פרוטופיברילים. [[BuddHaeberlein2022,Soderberg2023]]</td><td>הפחית עמילואיד (הבסיס לאישור המואץ שלו) [[BioSpace2021]]</td><td>EMERGE במינון גבוה \u200E-0.39; ENGAGE \u200E+0.03 [[BuddHaeberlein2022]]</td></tr>
   <tr><th>גנטנרומאב</th><td>עמילואיד בטא מצטבר, ניתן בזריקה תת־עורית; מעדיף סיבים. [[Bateman2023,Soderberg2023]]</td><td>56 עד 66 CL מתחת לפלצבו, אבל רק 27 עד 28% הפכו שליליים לעמילואיד [[Bateman2023]]</td><td>לא מובהק (\u200E-0.31 ו־\u200E-0.19) [[Bateman2023]]</td></tr>
   <tr><th>סולנזומאב</th><td>מונומרים: מולקולות בודדות שלא הצטברו. [[Sperling2023]]</td><td>אין: העמילואיד המשיך לעלות (11.6 לעומת 19.3 CL בפלצבו) [[Sperling2023]]</td><td>לא הייתה האטה אצל אנשים ללא תסמינים (A4) [[Sperling2023]]</td></tr>
   </tbody></table>`;

  /* ---------- cards ---------- */
  $('#abCards').innerHTML=`
   <div class="card"><span class="ev est">מבוסס</span><h4>מעטים זכאים</h4>
    <ul class="ab-bars">
     <li><span>מחקר אוכלוסייה, MCI או דמנציה קלה עם עמילואיד חיובי: <b>8%</b> עמדו בקריטריונים של CLARITY AD [[Pittock2023]]</span><span class="tr"><i style="width:8%"></i></span></li>
     <li><span>מרפאת זיכרון בשוודיה, לפי קריטריוני ה־AUR: <b>6%</b>, או <b>3%</b> בלי נשאי שני עותקי APOE4 [[Rosenberg2026]]</span><span class="tr"><i style="width:6%"></i></span></li>
     <li><span>מרפאת זיכרון בפריז: <b>28.6%</b> מהמטופלים שהאבחנה שלהם אושרה בסמנים ביולוגיים, <b>2.9%</b> מכלל המטופלים [[Vrillon2026]]</span><span class="tr"><i class="lt" style="width:28.6%"></i></span></li>
     <li><span>קוריאה, מטופלים עם עמילואיד חיובי: <b>24.6%</b> ללקנמאב, <b>28.0%</b> לדונאנמאב [[Jeon2025]]</span><span class="tr"><i class="lt" style="width:24.6%"></i></span></li>
    </ul><p class="cardnote">המכנים שונים (כל האוכלוסייה, כל מטופלי המרפאה, או רק מי שהעמילואיד אצלם אושר), ולכן אי אפשר להשוות את המספרים ישירות.</p></div>
   <div class="card"><span class="ev est">מידע מהעלון</span><h4>ARIA: מה זה ומי בסיכון</h4>
    <p>ARIA-E הוא בצקת וזוגנית או תפליט בחריצי המוח (sulcal effusion) ב־MRI ברצף FLAIR; ARIA-H הוא מיקרו־דימום או שקיעת המוסידרין שטחית (superficial siderosis). התסמינים המדווחים כוללים כאב ראש, בלבול, שינויים בראייה, סחרחורת וקשיי הליכה; מופיעים גם פרכוסים, ו־ARIA עלול להיות קטלני. הסיכון עולה עם שני עותקי APOE4 (כ־15% מהאנשים עם אלצהיימר) ועם סימנים של אנגיופתיה עמילואידית מוחית. [[Cogswell2022,LeqembiLabel2026,KisunlaLabel2025]]</p>
    <p>ARIA-E יכול לחקות שבץ; דימומים קטלניים אירעו אחרי תרופות ממיסות קרישים, ושני העלונים ממליצים לשקול קודם כול ARIA. המלצות השימוש (AUR) מוציאות מהכלל אנשים שמקבלים נוגדי קרישה, ובאיחוד האירופי זו התווית נגד. [[LeqembiLabel2026,KisunlaLabel2025,Cummings2023,Rabinovici2025,EMA2025Leqembi]]</p>
    <div class="hook"><b>לבחינה</b>ARIA-E = בצקת (FLAIR). ARIA-H = דימום (T2*/SWI). הסיכון הגבוה ביותר: הומוזיגוטים ל־APOE4, בתחילת הטיפול.</div></div>
   <div class="card"><span class="ev est">מידע מהעלון</span><h4>איך התרופות ניתנות</h4>
    <ul><li>לקנמאב: 10 mg/kg בעירוי לווריד כל 2 שבועות; אחרי 18 חודשים, עירוי כל 4 שבועות או מזרק אוטומטי של 360 mg פעם בשבוע (Leqembi Iqlik). מיולי 2026 אפשר להתחיל טיפול גם בזריקה תת־עורית של 500 mg בשבוע, כשתי זריקות של 250 mg. האישורים לזריקות מבוססים על חשיפה תואמת לתרופה ועל מידול, לא על ניסוי יעילות נפרד. [[LeqembiLabel2026,Eisai2025Iqlik,Eisai2026IqlikInit]]</li>
     <li>דונאנמאב: עירוי לווריד כל 4 שבועות. הטיטרציה המותאמת שבעלון (350, 700, 1,050, ואז 1,400 mg) הורידה את ARIA-E בשבוע 24 מ־23.7% ל־13.7%, עם הורדה דומה של עמילואיד. [[KisunlaLabel2025,Wang2025]]</li>
     <li>לוחות הזמנים של בדיקות ה־MRI שונים: עלון Leqembi משנת 2026 קובע בדיקות בחודשים 1, 2, 3 ו־6; ה־AUR משנת 2023 והעלון האירופי, לפני העירויים ה־5, ה־7 וה־14. [[LeqembiLabel2026,Cummings2023,EMA2025Leqembi]]</li></ul>
    <p class="cardnote">מינונים כפי שפורסמו בעלונים, מובאים לצורכי לימוד. אין זה מדריך לאדם מסוים.</p></div>
   <div class="card"><span class="ev early">שנוי במחלוקת</span><h4>אדוקנומאב: האישור שפילג את התחום</h4>
    <p>ניסויי EMERGE ו־ENGAGE הופסקו ב־2019 בגלל חוסר תוחלת. בניתוח של מערך נתונים גדול יותר, המינון הגבוה ב־EMERGE עמד בתוצא העיקרי (CDR-SB \u200E-0.39), וב־ENGAGE לא (\u200E+0.03). במינון הגבוה 35.2% פיתחו ARIA-E. ועדה מייעצת של ה־FDA הצביעה 0 בעד, 10 נגד ו־1 לא בטוח, ובכל זאת ה־FDA העניק לו אישור מואץ ב־7 ביוני 2021, ושלושה מחברי הוועדה התפטרו. חברת Biogen הפסיקה למכור אותו בינואר 2024, ואמרה שהסיבה אינה בטיחות או יעילות. [[BuddHaeberlein2022,Salloway2022,BioSpace2021,PracticalNeurology2024]]</p></div>
   <div class="card"><span class="ev est">מבוסס</span><h4>גנטנרומאב וסולנזומאב נכשלו</h4>
    <p>גנטנרומאב הוריד עמילואיד, אבל רק כ־27 עד 28% הפכו שליליים לעמילואיד, וההפרשים ב־CDR-SB (\u200E-0.31, \u200E-0.19) לא היו מובהקים. סולנזומאב, שנקשר למונומרים, לא האט את ההידרדרות אצל אנשים עם עמילואיד חיובי וללא תסמינים, והעמילואיד שלהם המשיך לעלות. הלקח שהוסק: רק סילוק עמוק ומהיר של רבדים היה קשור לתועלת קלינית. [[Bateman2023,Sperling2023,Lu2025]]</p>
    <div class="pt"><b>במילים פשוטות</b>תפיסה של עמילואיד חופשי לא עזרה. גם סילוק חלקי בלבד של רבדים לא עזר. שתי התרופות שסילקו רובד לעומק ובמהירות האטו מעט את ההידרדרות.</div></div>
   <div class="card"><span class="ev early">שנוי במחלוקת</span><h4>פרדוקס נפח המוח</h4>
    <p>ב־MRI, אחרי נוגדנים שמורידים עמילואיד יש אובדן נוסף של נפח מוח, לא פחות. קבוצה אחת קוראת לזה "אטרופיה מדומה" הקשורה לסילוק עמילואיד: היא מוגבלת לתרופות שמורידות עמילואיד, מתיישבת עם סילוק רבדים, ועד כה לא נקשרה לנזק. מטא־אנליזה מצאה שחדרי המוח התרחבו ב־2.1 mL יותר מאשר בפלצבו, במקביל לשכיחות ה־ARIA \u200F(r = 0.86), ופירשה זאת כנזק אפשרי. שני הצדדים קוראים לעוד נתונים ברמת המטופל ולעוד נתונים מבדיקות לאחר המוות. [[Belder2024,Alves2023]]</p></div>
   <div class="card"><span class="ev est">נתונים שפורסמו</span><h4>עלות וכיסוי</h4>
    <p>מחיר המחירון של Leqembi בארה״ב היה $26,500 לשנה; עם השתתפות עצמית של 20%, אנשים במדיקר המסורתי היו משלמים יותר מ־$5,000 בשנה. Kisunla עלתה כ־$32,000 ל־12 חודשים (עיתונות מקצועית). מאז 6 ביולי 2023 מדיקר מכסה נוגדנים שקיבלו אישור רגיל, כשהרופא המטפל מצטרף למרשם (registry). [[KFF2023,MHE2024,CMS2023]]</p>
    <p>מרפאה בארה״ב, בעולם האמיתי (234 אנשים): ARIA אצל 22% במשך כ־6.5 חודשים, עם תסמינים אצל 5.7%, והרבה יותר בדמנציה קלה (27%) מאשר ב־MCI או בדמנציה קלה מאוד (1.8%). [[Paczynski2025]]</p></div>`;

  /* ---------- regulatory timeline ---------- */
  const REG=[
   ['יוני 2021','US','ה־FDA מעניק לאדוקנומאב אישור מואץ על סמך הפחתת עמילואיד, אחרי שהוועדה המייעצת שלו הצביעה 0 בעד, 10 נגד ו־1 לא בטוח. שלושה חברים מתפטרים. [[BioSpace2021]]'],
   ['אפריל 2022','US','החלטת מדיקר (7 באפריל): נוגדנים נגד עמילואיד מכוסים רק בניסויים או במחקרים שאישר CMS (כיסוי בתנאי של איסוף ראיות). [[CMS2022NCD]]'],
   ['ינואר 2023','US','אישור מואץ ללקנמאב. [[Jin2024]]'],
   ['יולי 2023','US','6 ביולי: לקנמאב עובר לאישור רגיל, עם אזהרה מודגשת (boxed warning) על ARIA והמלצה לבדיקת APOE4. באותו יום מדיקר מתחיל לכסות אותו כשהרופא המטפל מצטרף למרשם. [[FDA2023Leqembi,CMS2023]]'],
   ['ינואר 2024','US','31 בינואר: חברת Biogen מפסיקה לפתח ולמכור את אדוקנומאב. [[PracticalNeurology2024]]'],
   ['יולי 2024','US','2 ביולי: ה־FDA מאשר את דונאנמאב (Kisunla); הוועדה המייעצת שלו הצביעה 11 מול 0 שהתועלת עולה על הסיכונים (עיתונות מקצועית). [[FDA2024Kisunla,MHE2024]]'],
   ['יולי 2024','EU','25 ביולי: ועדת ה־EMA \u200F(CHMP) דוחה את לקנמאב, בהערכה שהתועלת אינה עולה על סיכוני ה־ARIA. [[EMA2024LeqembiReexam,EMA2025Leqembi]]'],
   ['אוגוסט 2024','UK','טיוטת ההנחיה של NICE אינה ממליצה על לקנמאב. [[PJ2025]]'],
   ['אוקטובר 2024','UK','טיוטת ההנחיה של NICE אינה ממליצה על דונאנמאב. [[PJ2025]]'],
   ['נובמבר 2024','EU','14 בנובמבר: בבחינה מחדש, חוות דעת חיובית ללקנמאב, מוגבלת לאנשים שאינם נשאי APOE4 או שנושאים עותק אחד (הטרוזיגוטים). [[EMA2024LeqembiReexam]]'],
   ['ינואר 2025','US','26 בינואר: אושר מינון אחזקה של לקנמאב בעירוי כל 4 שבועות אחרי 18 חודשים. [[Eisai2025IVmaint,LeqembiLabel2026]]'],
   ['מרץ 2025','EU','ה־CHMP דוחה את דונאנמאב. [[EMA2025Kisunla]]'],
   ['אפריל 2025','EU','15 באפריל: לקנמאב מאושר לאנשים שאינם נשאי APOE4 או הטרוזיגוטים, עם גישה מבוקרת, בלי נוגדי קרישה ועם MRI לפני המנות ה־5, ה־7 וה־14. [[EMA2025Leqembi]]'],
   ['יוני 2025','UK','טיוטת ההנחיה הסופית של NICE אינה ממליצה על אף אחת מהתרופות: התועלת הוערכה כמתונה (דחייה של כ־4 עד 6 חודשים) והעלויות גבוהות מדי. [[PJ2025]]'],
   ['יולי 2025','US','עלון Kisunla מאמץ את הטיטרציה המותאמת כמינון המומלץ ומעדכן את האזהרה המודגשת. [[KisunlaLabel2025]]'],
   ['יולי 2025','EU','24 ביולי: בבחינה מחדש, חוות דעת חיובית לדונאנמאב. [[EMA2025Kisunla]]'],
   ['אוגוסט 2025','US','29 באוגוסט: המזרק האוטומטי Leqembi Iqlik אושר לטיפול אחזקה (360 mg בשבוע); ההשקה בארה״ב ב־6 באוקטובר 2025. [[Eisai2025Iqlik]]'],
   ['ספטמבר 2025','EU','24 בספטמבר: דונאנמאב מאושר לאנשים שאינם נשאי APOE4 או הטרוזיגוטים, עם גישה מבוקרת, בלי נוגדי קרישה וטיפול של עד 18 חודשים. [[EMA2025Kisunla]]'],
   ['ינואר 2026','UK','ועדות הערעור מקבלות טענות בנוגע לעלויות העירוי ולערכי התועלת של המטפלים; NICE תבחן מחדש את שתי התרופות. [[AlzEurope2026]]'],
   ['אפריל 2026','UK','28 באפריל: ההתייעצות הציבורית של NICE נסגרת; הוועדה הייתה אמורה להתכנס ב־10 ביוני 2026. התוצאה אינה מאושרת במקורות שלנו. [[PJ2026,AlzEurope2026]]'],
   ['יולי 2026','US','13 ביולי: אושרה התחלת טיפול בלקנמאב בזריקה תת־עורית, 500 mg בשבוע כשתי זריקות של 250 mg. [[Eisai2026IqlikInit]]']
  ];
  let reg='all';
  function drawReg(){$('#abReg').innerHTML=`<table><thead><tr><th>תאריך</th><th>איפה</th><th>מה קרה</th></tr></thead><tbody>${REG.filter(r=>reg==='all'||r[1]===reg).map(r=>`<tr><td>${r[0]}</td><td><span class="tag ${r[1]==='US'?'sky':r[1]==='EU'?'sage':'rose'} reg-tag">${r[1]==='UK'?'אנגליה':r[1]}</span></td><td>${r[2]}</td></tr>`).join('')}</tbody></table>`}
  $$('[data-reg]').forEach(b=>b.onclick=()=>{reg=b.dataset.reg;$$('[data-reg]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawReg()});
  drawReg();
};
