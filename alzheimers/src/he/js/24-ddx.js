/* =============== 2.4 the differential =============== */
const DD_INFO=[
 {id:'ad',n:'מחלת אלצהיימר (אופיינית)',
  pres:`אובדן הדרגתי ומתקדם של הזיכרון לטווח קצר, יחד עם תחום נוסף. קיימים גם וריאנטים שאינם של זיכרון: לוגופני, חזותי־מרחבי, ניהולי. [[McKhann2011]]`,
  tests:`סמן ביולוגי חריג אחד מקבוצת הליבה (Core 1): סריקת PET עמילואיד, יחס Aβ42/40 או יחסים אחרים ב־CSF, או בדיקת p-tau217 מדויקת בפלזמה. ניוון של האונה הרקתית המדיאלית. ירידה בחילוף החומרים של FDG בצינגולום האחורי ובהיפוקמפוס. PET טאו באונה הרקתית המדיאלית והצידית. [[Jack2024,Mosconi2008,Ossenkoppele2018]]`,
  more:`סריקת עמילואיד חיובית אינה הוכחה לכך שאלצהיימר מסביר את התסמינים. בדמנציה של אלצהיימר שאובחנה קלינית, שיעור ה־PET החיובי בקרב מי שאינם נשאי APOE e4 ירד מ־86% בגיל 50 ל־68% בגיל 90, מה שמרמז על אבחנות שגויות רבות אצל מטופלים מבוגרים. [[Ossenkoppele2015]]`},
 {id:'vasc',n:'דמנציה וסקולרית',
  pres:`מהלך במדרגות או משתנה, הופעה שקשורה בזמן לשבץ, הפרעת הליכה מוקדמת, אי־נקיטת שתן, שינוי במצב הרוח או באישיות, סימנים מוקדיים. [[Roman1993]]`,
  tests:`לאבחנה של דמנציה וסקולרית סבירה נדרשת עדות הדמיתית למחלה צרברו־וסקולרית: אוטמים או מחלה נרחבת של החומר הלבן. PET עמילואיד הוא לעתים קרובות שלילי, אם כי שיעור החיוביות עולה עם הגיל ועם APOE e4 ‏(25 עד 64% בנשאים בני 60 עד 80). [[Roman1993,Ossenkoppele2015]]`,
  more:`דמנציה וסקולרית אחראית לכ־15% ממקרי הדמנציה. אוטמים מופיעים לעתים קרובות לצד אלצהיימר: בסדרת נתיחות אחת מהקהילה, ל־38% מהאנשים עם דמנציה היו אלצהיימר וגם אוטמים. [[OBrien2015,Schneider2007]]`},
 {id:'dlb',n:'דמנציה עם גופיפי לוי',
  pres:`קוגניציה משתנה, הזיות ראייה חוזרות ומפורטות (עד 80%), הפרעת התנהגות בשנת REM, פרקינסוניזם (בסופו של דבר אצל יותר מ־85%). בשלב מוקדם, בעיות קשב, תפקוד ניהולי ותפיסה חזותית בולטות יותר מבעיות הזיכרון. [[McKeith2017]]`,
  tests:`קליטה מופחתת של נשא הדופמין ב־SPECT או ב־PET (רגישות 78%, סגוליות 90% מול אלצהיימר), קליטה נמוכה של MIBG בלב, שנת REM ללא אטוניה. האונה הרקתית המדיאלית שמורה יחסית; ירידה בחילוף החומרים באונה העורפית עם סימן "האי הצינגולרי". [[McKeith2017]]`,
  more:`DLB סבירה: מאפיין ליבה אחד או יותר יחד עם סמן ביולוגי מכוון, או שני מאפייני ליבה או יותר (הדרך השנייה נקראה מכותרת טבלה במאמר ולא אומתה כאן). סמנים ביולוגיים לבדם אינם מספיקים. כלל "השנה האחת" (1-year rule): דמנציה שמופיעה לפני הפרקינסוניזם או בתוך שנה ממנו היא DLB. פתולוגיה נלווית של עמילואיד שכיחה: 63 עד 83% חיוביים ב־PET בקרב נשאי e4 בני 60 עד 80. [[McKeith2017,Ossenkoppele2015]]`},
 {id:'pdd',n:'דמנציה במחלת פרקינסון',
  pres:`דמנציה שמתפתחת במחלת פרקינסון מבוססת, יותר משנה אחרי שהתחילו התסמינים המוטוריים. בעיות קשב, זיכרון, תפקוד ניהולי ותפקוד חזותי־מרחבי, לעתים קרובות עם הזיות ואדישות. [[Emre2007,McKeith2017]]`,
  tests:`אבחנה קלינית; אין בדיקה ייחודית שמאשרת אותה. [[Emre2007]]`,
  more:`במחלת פרקינסון, הסיכון לדמנציה גבוה עד פי 6 מהרגיל, ושכיחות הנקודה קרובה ל־30%. [[Emre2007]]`},
 {id:'ftd',n:'דמנציה פרונטו־טמפורלית (וריאנט התנהגותי)',
  pres:`חוסר עכבות מוקדם, אדישות, אובדן אמפתיה, התנהגויות כפייתיות, אכילת יתר או הכנסת חפצים לפה, ופרופיל של פגיעה בתפקוד הניהולי; לאבחנה "אפשרית" נדרשים 3 מתוך 6 אלה. הזיכרון שמור יחסית בהתחלה. לעתים קרובות ההופעה בגיל צעיר יותר. [[Rascovsky2011]]`,
  tests:`ניוון או ירידה בחילוף החומרים באונה המצחית ו/או באונה הרקתית הקדמית. PET עמילואיד בדרך כלל שלילי במי שאינם נשאים (5 עד 14% חיוביים בגילי 60 עד 80). [[Rascovsky2011,Mosconi2008,Ossenkoppele2015]]`,
  more:`ב־137 מקרים שאושרו בנתיחה, 86% עמדו בקריטריונים ל"אפשרית" ו־76% ל"סבירה". מי שהקריטריונים החמיצו נטו להיות מבוגרים יותר, עם בעיות זיכרון בולטות. [[Rascovsky2011]]`},
 {id:'ppa',n:'אפזיה סמנטית או לא שוטפת',
  pres:`הופעה שמובילה בה השפה: אובדן משמעות המילים (סמנטית), או דקדוק שבור ודיבור מאומץ, לעתים קרובות עם אפרקסיה של הדיבור (לא שוטפת). [[GornoTempini2011]]`,
  tests:`ניוון של האונה הרקתית הקדמית (סמנטית, לרוב FTLD-TDP) או ניוון פרונטו־אינסולרי אחורי משמאל (לא שוטפת, לרוב FTLD-tau).‏ [[GornoTempini2011]]`,
  more:`אפזיה מתקדמת ראשונית דורשת שהשפה תהיה הבעיה המובילה בהופעה ולאורך שלב המחלה המוקדם. אובדן זיכרון או אובדן חזותי־מרחבי בולט ומוקדם שולל אותה. [[GornoTempini2011]]`},
 {id:'lvppa',n:'אפזיה לוגופנית',
  pres:`הפסקות בחיפוש מילים וקושי לחזור על משפטים. [[GornoTempini2011]]`,
  tests:`ניוון טמפורו־פריאטלי משמאל. אלצהיימר הוא הפתולוגיה השכיחה ביותר, ולכן זו יכולה להיות הסתמנות לא אופיינית של אלצהיימר. [[GornoTempini2011]]`,
  more:`PET עמילואיד היה חיובי ב־86% מתוך 443 מקרים לוגופניים, לעומת 20% מהמקרים הלא שוטפים ו־16% מהסמנטיים. ראו <a href="#stages" data-go="stages">שלבים ותסמינים</a> לצורות הלא אופייניות האחרות. [[GraffRadford2021]]`},
 {id:'late',n:'LATE (TDP-43)',
  pres:`תסמונת אמנסטית "דמוית אלצהיימר" אצל המבוגרים ביותר, בני 80 ומעלה. ירידה איטית יותר כשהיא מופיעה לבד, ומהירה יותר כשהיא משולבת עם אלצהיימר. [[Nelson2019]]`,
  tests:`אין בדיקה מתוקפת בחיים. ניוון של האונה הרקתית המדיאלית עם סמני אלצהיימר שליליים או לא תואמים עשוי לעורר חשד. [[Nelson2019]]`,
  more:`שינויי LATE נמצאים אצל יותר מ־20% (ועד 50%) מבני 80 ומעלה בסדרות נתיחה מהקהילה, ובכ־25% מהמוחות בנתיחות מהקהילה היה מספיק מהם כדי שיקושרו לפגיעה קוגניטיבית. [[Nelson2019]]`},
 {id:'cjd',n:'מחלת קרויצפלד־יעקב (CJD) ספורדית',
  pres:`דמנציה מתקדמת במהירות במשך שבועות עד חודשים, עם מיוקלונוס, סימנים חזותיים או מוחוניים, סימנים פירמידליים או אקסטרה־פירמידליים, או מוטיזם אקינטי. [[CDC2024CJD]]`,
  tests:`RT-QuIC ב־CSF; אות גבוה בקליפת המוח או בגרעין הזנבי ובפוטמן ב־MRI ברצפי DWI או FLAIR; גלים חדים מחזוריים ב־EEG;‏ 14-3-3 ב־CSF. טאו כולל גבוה מאוד ב־CSF ביחס ל־p-tau.‏ [[CDC2024CJD,Hermann2021,Elgenidi2026]]`,
  more:`בדרך כלל בגיל 55 ומעלה, כ־1 עד 2 מקרים למיליון בשנה, וחציון של 4 עד 5 חודשים מהתסמין הראשון ועד המוות. בסדרה מ־2026, 5 מתוך 204 מקרי דמנציה מתקדמת במהירות שאובחנו תחילה כאלצהיימר סביר היו מחלת פריון, וסמני האלצהיימר ב־CSF נראו "דמויי אלצהיימר" ב־6 מתוך 9 שנבדקו. [[CDC2024CJD,Elgenidi2026]]`},
 {id:'nph',n:'הידרוצפלוס בלחץ תקין (אידיופתי)',
  pres:`הפרעת הליכה ראשונה ובולטת ביותר, אחריה חשיבה איטית בדפוס פרונטלי־תת־קליפתי, ואחריה דחיפות במתן שתן או אי־נקיטת שתן. [[Nakajima2021]]`,
  tests:`חדרים מורחבים (מדד אוונס 0.3 ומעלה) עם דפוס DESH ב־MRI; בדיקת ניקוז CSF (tap test).‏ [[Nakajima2021]]`,
  more:`השלישייה המלאה חסרה לעתים קרובות: היא נמצאה רק אצל 12.1% מתוך 1,524 מטופלים בסקר יפני. זיכרון הזיהוי שמור יחסית, והניוון בהיפוקמפוס קל יותר מאשר באלצהיימר. [[Nakajima2021]]`},
 {id:'dep',n:'דיכאון ("פסאודו־דמנציה")',
  pres:`תסמינים של מצב רוח לצד תלונות קוגניטיביות. עשוי להיות הפיך, אבל דיכאון בגיל מבוגר קשור גם לדמנציה בהמשך (יחס סיכונים 1.95), והסקירה לא יכלה לקבוע אם הוא גורם סיכון או סימן מוקדם. [[Brain2025,Pozzi2022]]`,
  tests:`סקר לדיכאון. FDG-PET יכול לחקות אלצהיימר בדיכאון. סמני אלצהיימר תקינים יטו נגד אלצהיימר. [[Knopman2001,Pozzi2022]]`,
  more:`המקורות שעליהם נשען הפרק הזה לא מצאו כללים מתוקפים ליד המיטה להבחנה בין בעיות קוגניטיביות הקשורות לדיכאון לבין אלצהיימר.`},
 {id:'delirium',n:'דליריום (לבד או על רקע דמנציה)',
  pres:`הופעה חדה, מהלך משתנה, חוסר קשב, עם חשיבה לא מאורגנת או שינוי ברמת ההכרה. [[Inouye1990]]`,
  tests:`אלגוריתם CAM וחיפוש סיבות רפואיות ותרופתיות. הרגישות של CAM נמוכה יותר כשיש דמנציה. [[Inouye1990,Morandi2012]]`,
  more:`דליריום על רקע דמנציה דווח אצל 22 עד 89% מהמבוגרים עם דמנציה, וקושר לירידה מהירה יותר, למעבר למסגרת מוסדית ולמוות. [[Fick2002]]`},
 {id:'meds',n:'השפעות של תרופות',
  pres:`בעיות קוגניטיביות שקשורות בזמן לתרופה. [[Gray2015]]`,
  tests:`סקירת תרופות. השימוש המצטבר הכבד ביותר בתרופות אנטי־כולינרגיות חזקות נמצא קשור לדמנציה (יחס סיכונים 1.54). [[Gray2015]]`,
  more:`הקבוצות השכיחות ביותר היו נוגדי דיכאון טריציקליים, אנטי־היסטמינים מהדור הראשון ותרופות אנטי־מוסקריניות לשלפוחית השתן. [[Gray2015]]`},
 {id:'b12',n:'חסר B12, תת־פעילות של בלוטת התריס, נוירוסיפיליס',
  pres:`סיבות תורמות או הפיכות. היפוך של ממש הוא נדיר. [[Clarfield2003]]`,
  tests:`בדיקות B12 ותפקודי בלוטת התריס באופן שגרתי; סרולוגיה לעגבת רק כשיש חשד. [[Knopman2001]]`,
  more:`ב־39 מחקרים, ל־9% מהאנשים עם דמנציה הייתה סיבה שעשויה להיות הפיכה, ואצל 0.6% הדמנציה אכן חלפה (0.29% באופן חלקי, 0.31% באופן מלא). [[Clarfield2003]]`},
 {id:'osa',n:'דום נשימה חסימתי בשינה',
  pres:`ישנוניות בשעות היום, נחירות, רמת חמצן נמוכה בזמן השינה. [[Yaffe2011]]`,
  tests:`פוליסומנוגרפיה (בדיקת שינה). [[Yaffe2011]]`,
  more:`אצל 298 נשים מבוגרות, הפרעות נשימה בשינה נמצאו קשורות להופעה חדשה של MCI או דמנציה (יחס סיכויים 1.85, 44.8% לעומת 31.1%), בהתאם לרמת החמצן הנמוכה ולא לשינה המקוטעת. [[Yaffe2011]]`}
];
const DD_UY=Math.log10(87600);
const DD_ROWS=[
 {id:'delirium',n:'דליריום',s:'שעות עד ימים, משתנה',course:'הופעה חדה במשך שעות עד ימים, עם מהלך משתנה. ההמשך תלוי בסיבה.',
  f:u=>1-.55*ease(ramp(u,.1,.3))+.12*Math.sin(u*80)*ramp(u,.14,.3),end:.62,endTxt:'תלוי בסיבה'},
 {id:'ad',n:'אלצהיימר',s:'הדרגתי, לאורך שנים',course:'הופעה חמקמקה והחמרה הדרגתית לאורך שנים.',
  f:u=>1-.78*Math.pow(ramp(u,.72,1),1.4)},
 {id:'vasc',n:'וסקולרית',s:'במדרגות, עם שבצים',course:'במדרגות או משתנה, עם ירידות שקשורות בזמן לשבצים.',
  f:u=>{let v=1;[.84,.9,.955].forEach(s=>{v-=.2*ramp(u,s,s+.006)-.04*ramp(u,s+.01,s+.03)});return v},marks:[ [.84,'שבץ'],[.9,'שבץ'],[.955,'שבץ'] ]},
 {id:'dlb',n:'גופיפי לוי',s:'משתנה; הזיות',course:'קוגניציה משתנה, עם הזיות ראייה, הפרעת התנהגות בשנת REM ופרקינסוניזם.',
  f:u=>1-.6*Math.pow(ramp(u,.74,1),1.2)+.09*Math.sin(u*260)*ramp(u,.76,.82),marks:[ [.85,'הזיות'],[.94,'פרקינסוניזם'] ]},
 {id:'ftd',n:'פרונטו־טמפורלית',s:'התנהגות או שפה קודם',course:'שינויים בהתנהגות או בשפה מופיעים ראשונים, והזיכרון שמור יחסית בהתחלה; לעתים קרובות ההופעה בגיל צעיר יותר.',
  f:u=>1-.45*Math.pow(ramp(u,.86,1),1.3),g:u=>1-.7*Math.pow(ramp(u,.74,.97),1.1),gl:'התנהגות'},
 {id:'nph',n:'⁧הידרוצפלוס (NPH)⁩',s:'הליכה קודם',course:'הליכה קודם, אחר כך חשיבה איטית, ואחר כך השליטה בשלפוחית.',
  f:u=>1-.4*ramp(u,.84,1),g:u=>1-.6*ramp(u,.74,.92),gl:'הליכה',marks:[ [.93,'שליטה בסוגרים'] ]},
 {id:'dep',n:'דיכאון',s:'מצב רוח קודם, יכול להשתפר',course:'שינויים במצב הרוח עם תלונות קוגניטיביות; עשוי להיות הפיך, אבל גם גורם סיכון או סימן מוקדם.',
  f:u=>1-.22*ease(ramp(u,.5,.62))+.12*ramp(u,.8,.92),g:u=>1-.55*ease(ramp(u,.45,.6))+.35*ramp(u,.8,.92),gl:'מצב רוח'},
 {id:'cjd',n:'⁧CJD (פריון)⁩',s:'מהיר, שבועות עד חודשים',course:'ירידה מהירה במשך שבועות עד חודשים; חציון של 4 עד 5 חודשים מהתסמין הראשון ועד המוות.',
  f:u=>1-ease(ramp(u,.48,.71)),end:.712,endTxt:'⁧חציון 4 עד 5 חודשים⁩'}
];
const DD_STEPS=[
 {fh:0,h:8,k:'שעות',t:'רק הדליריום זז',
  txt:`דליריום מתחיל במשך שעות עד ימים ומשתנה. אלגוריתם CAM דורש הופעה חדה עם מהלך משתנה וחוסר קשב, ובנוסף חשיבה לא מאורגנת או שינוי ברמת ההכרה. [[Inouye1990]]`,
  pt:`שינוי פתאומי בחשיבה במשך שעות או ימים אינו האופן שבו אלצהיימר מתנהג. הוא מכוון לדליריום, שיש לו סיבות רפואיות או תרופתיות.`,
  hook:`שעות עד ימים ← דליריום, עד שיוכח אחרת.`},
 {fh:48,h:24*12,k:'ימים עד שבועות',t:'הדליריום ממשיך להשתנות',
  txt:`במשך ימים עד שבועות, דליריום ממשיך להשתנות, ומהלכו תלוי בסיבה. דליריום על רקע דמנציה דווח אצל 22 עד 89% מהמבוגרים עם דמנציה. [[Inouye1990,Fick2002]]`,
  pt:`גם אדם שכבר חי עם דמנציה יכול לפתח דליריום. החמרה פתאומית היא סימן אזהרה.`},
 {fh:24*45,h:24*30*4,k:'שבועות עד חודשים',t:'מתקדם במהירות',
  txt:`ירידה במשך שבועות עד חודשים מעלה סיבות שמתקדמות במהירות, כמו מחלת פריון. CJD ספורדית פוגעת בדרך כלל באנשים בני 55 ומעלה, בכ־1 עד 2 מקרים למיליון בשנה, עם חציון של 4 עד 5 חודשים מהתסמין הראשון ועד המוות. [[CDC2024CJD]]`,
  pt:`דמנציה שמחמירה מאוד מחודש לחודש היא חריגה, ומכוונת לסיבות שמתקדמות במהירות, כמו מחלת פריון.`,
  hook:`שבועות עד חודשים ← דמנציה מתקדמת במהירות: לחשוב על CJD ‏(RT-QuIC,‏ DWI ב־MRI,‏ EEG).‏ [[CDC2024CJD,Hermann2021]]`},
 {fh:8760,h:8760*4,k:'שנים',t:'התסמונות האיטיות נפרדות',
  txt:`לאורך שנים, הסיבות האיטיות נבדלות לפי הדפוס: הדרגתי (אלצהיימר), במדרגות (וסקולרית), משתנה עם הזיות ופרקינסוניזם (גופיפי לוי), התנהגות או שפה קודם (פרונטו־טמפורלית), הליכה קודם (הידרוצפלוס בלחץ תקין). [[McKhann2011,Roman1993,McKeith2017,Rascovsky2011,Nakajima2021]]`,
  pt:`מה הופיע ראשון, זיכרון, התנהגות, הליכה או הזיות, הוא מהדברים השימושיים ביותר שבני משפחה יכולים לתאר.`,
  hook:`התסמין הראשון: זיכרון ← אלצהיימר (או LATE אצל המבוגרים ביותר); התנהגות ← bvFTD; הליכה ← NPH או וסקולרית; הזיות ראייה ותנודתיות ← גופיפי לוי.`},
 {fh:8760*8,h:87600,k:'עשור',t:'סיבות מעורבות הן הכלל',
  txt:`מהלכים אמיתיים חופפים. ליותר ממחצית האנשים שאובחנו עם דמנציה של אלצהיימר במרכזי מחקר בארה"ב הייתה פתולוגיה מעורבת, ובסדרת נתיחות מהקהילה לרוב האנשים עם דמנציה הייתה יותר מאבחנה אחת. [[AA2025Facts,Schneider2007]]`,
  pt:`הקווים האלה הם צורות של ספר לימוד. אצל מבוגרים רבים יש יותר מסיבה אחת בו בזמן.`}
];
inits.ddx=()=>{
  const svg=$('#ddSvg'),rg=$('#ddT');let lin=false,pick=null;
  const toT=h=>lin?h/87600:Math.log10(Math.max(1,h))/DD_UY;
  const toU=v=>lin?Math.log10(Math.max(1,v*87600))/DD_UY:v;
  const setSteps=()=>DD_STEPS.forEach(s=>{s.from=toT(s.fh);s.at=toT(s.h)});setSteps();
  const fmt=h=>h<24?`‏${Math.max(1,Math.round(h))} שע${Math.round(h)>1?'ות':'ה'}`:h<24*14?`‏${Math.round(h/24)} ${Math.round(h/24)>1?'ימים':'יום'}`:h<24*61?`‏${Math.round(h/168)} שבועות`:h<8760*1.5?`‏${Math.round(h/730)} חודשים`:`‏${f1(h/8760)} שנים`;
  function draw(t){
    const N=vb(svg,'720 452','400 600');
    const L=N?{x0:14,x1:386,y0:28,rh:66,top:20,bot:58}:{x0:198,x1:704,y0:28,rh:48,top:8,bot:42};
    const X=v=>L.x0+v*(L.x1-L.x0),yb=L.y0+DD_ROWS.length*L.rh;
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    /* ticks */
    const ticks=lin?[ [0,'0'],[.2,'2'],[.4,'4'],[.6,'6'],[.8,'8'],[1,'‏10 שנים'] ]:[ [0,'‏1 שעה'],[toT(24),'‏1 יום'],[toT(168),'‏1 שבוע'],[toT(730),'‏1 חודש'],[toT(8760),'‏1 שנה'],[1,'‏10 שנים'] ];
    ticks.forEach(([v,l],i)=>{s+=`<path d="M${f1(X(v))} ${L.y0}V${yb}" class="grid"/><text x="${f1(X(v))}" y="${yb+16}" class="t-xs ${i===0?'':i===ticks.length-1?'t-end':'t-mid'}">${l}</text>`});
    s+=`<text x="${f1((L.x0+L.x1)/2)}" y="${yb+32}" class="t-xs t-mid">${lin?'שנים, ברווחים שווים':'⁧הזמן מהשינוי הראשון (כל שלב ארוך פי 4 עד 30 בערך)⁩'}</text>`;
    /* rows */
    DD_ROWS.forEach((r,i)=>{const y=L.y0+i*L.rh,on=pick===r.id,pt=y+L.top,pb=y+L.bot,Y=v=>pb-clamp(v,0,1)*(pb-pt);
      s+=`<g class="clk" data-row="${r.id}"><rect x="6" y="${y+2}" width="${N?388:708}" height="${L.rh-4}" rx="8" style="fill:${on?'var(--rose-soft)':i%2?'var(--field)':'var(--panel)'};stroke:${on?'var(--rose)':'none'};stroke-width:1.5"/>`;
      if(N)s+=`<text x="${L.x0}" y="${y+15}" class="t-lbl">${r.n}</text><text x="${L.x1}" y="${y+15}" class="t-xs t-end">${r.s}</text>`;
      else s+=`<text x="16" y="${y+21}" class="t-lbl">${r.n}</text><text x="16" y="${y+36}" class="t-xs">${r.s}</text>`;
      s+=`<path d="M${L.x0} ${Y(1)}H${L.x1}" style="stroke:var(--line);stroke-width:1;stroke-dasharray:1 3"/>`;
      /* draw each line up to the playhead */
      const lineTo=(fn,dash,col)=>{let d='',n=0;const M=260;for(let k=0;k<=M;k++){const v=t*k/M,u=toU(v);if(r.end&&u>r.end)break;d+=(n++?'L':'M')+f1(X(v))+' '+f1(Y(fn(u)))}
        return n>1?`<path d="${d}" style="fill:none;stroke:${col};stroke-width:${dash?2:2.6};stroke-linecap:round;stroke-linejoin:round;${dash?'stroke-dasharray:5 4':''}"/>`:''};
      if(r.g){s+=lineTo(r.g,1,'var(--amber)');const M=200;for(let k=0;k<=M;k++){const v=k/M,u=toU(v);if(v>t)break;if(r.g(u)<.9){const w=r.gl.length*5.8,lf=X(v)-6-w>L.x0;s+=`<text x="${f1(lf?X(v)-6:X(v)+6)}" y="${lf?pt+13:pb}" class="t-xs ${lf?'t-end':''}" style="fill:var(--amber);font-weight:700">${r.gl}</text>`;break}}}
      s+=lineTo(r.f,0,on?'var(--rose)':'var(--ink)');
      if(r.marks){const shown=r.marks.map(([mu])=>lin?Math.pow(10,mu*DD_UY)/87600:mu).filter(mv=>mv<=t);
        shown.forEach(mv=>{s+=`<circle cx="${f1(X(mv))}" cy="${pb-3}" r="3.2" style="fill:var(--violet)"/>`});
        if(shown.length){const lab=[...new Set(r.marks.slice(0,shown.length).map(m=>m[1]))].join(', '),w=lab.length*5.8,x0=X(shown[0]),xl=X(shown[shown.length-1]),left=x0-8-w>L.x0+(N?0:4);
          s+=`<text x="${f1(left?x0-8:xl+8)}" y="${pb}" class="t-xs ${left?'t-end':''}" style="fill:var(--violet);font-weight:600">${lab}</text>`}}
      if(r.end){const ev=lin?Math.pow(10,r.end*DD_UY)/87600:r.end;if(t>ev){const ey=Y(r.f(r.end));s+=`<circle cx="${f1(X(ev))}" cy="${f1(ey)}" r="3" style="fill:var(--muted)"/><text x="${f1(X(ev)+8)}" y="${f1(Math.min(pb,ey+(r.id==='cjd'?0:4)))}" class="t-xs">${r.endTxt}</text>`}}
      s+='</g>'});
    /* playhead */
    const px=X(t),hrs=lin?t*87600:Math.pow(10,t*DD_UY),lab=fmt(hrs),tw=lab.length*5.9+14,tx=clamp(px,L.x0+tw/2-8,L.x1-tw/2+8);
    s+=`<path d="M${f1(px)} ${L.y0}V${yb}" style="stroke:var(--rose);stroke-width:1.6"/><rect x="${f1(tx-tw/2)}" y="6" width="${f1(tw)}" height="17" rx="8.5" style="fill:var(--rose)"/><text x="${f1(tx)}" y="18" class="t-xs t-mid" style="fill:var(--bg);font-weight:700">${lab}</text>`;
    svg.innerHTML=s;
    const p=phaseOf(DD_STEPS,t);setSt(p);$('#ddNote').innerHTML=noteHTML(DD_STEPS[p]);
    rg.setAttribute('aria-valuetext',`${lab}. שלב ${p+1} מתוך ${DD_STEPS.length}: ${DD_STEPS[p].t}`);
  }
  const stop=playWire(rg,$('#ddPlay'),draw,16000,'הפעלה חוזרת','ddx');
  const setSt=stepWire($('#ddSteps'),DD_STEPS,rg,draw,stop);
  const setAxis=v=>{const h=lin?rg.value*87600:Math.pow(10,rg.value*DD_UY);lin=v;setSteps();rg.value=toT(h);
    $('#ddLog').setAttribute('aria-pressed',!v);$('#ddLin').setAttribute('aria-pressed',v);draw(+rg.value)};
  $('#ddLog').onclick=()=>setAxis(false);$('#ddLin').onclick=()=>setAxis(true);

  /* ---------- details: buttons, rows, table ---------- */
  const info=id=>DD_INFO.find(d=>d.id===id);
  $('#ddPickBtns').innerHTML='<span class="kicker">פרטים</span>'+DD_ROWS.map(r=>`<button class="btn" data-pick="${r.id}" aria-pressed="false">${r.n}</button>`).join('');
  function showPick(id){pick=id;const r=DD_ROWS.find(x=>x.id===id),d=info(id);
    $$('#ddPickBtns [data-pick]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.pick===id));
    $('#ddPick').innerHTML=`<div class="kicker">דפוס אופייני · סכמטי</div><h4>${d.n}</h4><dl class="kv">${r?`<div><dt>מהלך אופייני</dt><dd>${r.course}</dd></div>`:''}<div><dt>מה מכוון אליו</dt><dd>${d.pres}</dd></div><div><dt>בדיקות וממצאים עיקריים</dt><dd>${d.tests}</dd></div><div><dt>עוד</dt><dd>${d.more}</dd></div></dl>`;
    draw(+rg.value)}
  $('#ddPick').innerHTML=`<div class="kicker">פרטים</div><p>לחצו על שורה בשרטוט, או על כפתור למעלה, כדי לראות מה מכוון לכל מצב ואילו בדיקות עוזרות.</p>`;
  $('#ddPickBtns').addEventListener('click',e=>{const b=e.target.closest('[data-pick]');if(b)showPick(b.dataset.pick)});
  svg.addEventListener('click',e=>{const g=e.target.closest('[data-row]');if(g)showPick(g.dataset.row)});
  const tb=$('#ddTable tbody');
  tb.innerHTML=DD_INFO.map(d=>`<tr data-id="${d.id}"><th scope="row"><button class="ddb" aria-expanded="false" aria-controls="ddm-${d.id}">${d.n}</button></th><td>${d.pres}</td><td>${d.tests}</td></tr><tr class="ddmore" id="ddm-${d.id}" hidden><td colspan="3"><b>עוד:</b> ${d.more}</td></tr>`).join('');
  tb.addEventListener('click',e=>{const b=e.target.closest('.ddb');if(!b)return;const tr=b.closest('tr'),m=$('#ddm-'+tr.dataset.id),open=b.getAttribute('aria-expanded')!=='true';
    b.setAttribute('aria-expanded',open);m.hidden=!open;tr.classList.toggle('hl',open)});

  /* ---------- CAM ---------- */
  const cam=$('#ddCam'),F=[true,true,false,false];
  const CF=[ ['1','הופעה חדה','ומהלך משתנה'],['2','חוסר קשב','קושי להתרכז'],['3','חשיבה','לא מאורגנת'],['4','שינוי ברמת','ההכרה'] ];
  function drawCam(){
    const N=vb(cam,'720 150','400 274');
    const met=F[0]&&F[1]&&(F[2]||F[3]);
    const C=N?[ [12,16,172],[216,16,172],[24,112,156],[220,112,156] ]:[ [8,40,120],[150,40,120],[302,40,120],[446,40,120] ];
    const W=N?{and:[ [200,48],[200,96] ],or:[200,144],br:[14,104,372,72],res:[12,202,376,56]}:{and:[ [139,72],[282,72] ],or:[434,72],br:[294,32,280,72],res:[590,40,122,56]};
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    const [bx,by,bw,bh]=W.br,orOn=F[2]||F[3];
    s+=`<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="12" style="fill:none;stroke:${orOn?'var(--rose)':'var(--muted)'};stroke-width:1.5;stroke-dasharray:4 3"/>`;
    if(!N)s+=`<text x="${bx+bw/2}" y="${by-8}" class="t-xs t-mid">לפחות אחד מאלה</text>`;
    C.forEach(([x,y,w],i)=>{const on=F[i];
      s+=`<rect x="${x}" y="${y}" width="${w}" height="56" rx="10" style="fill:${on?'var(--rose-soft)':'var(--panel)'};stroke:${on?'var(--rose)':'var(--line)'};stroke-width:${on?2:1}"/><text x="${x+10}" y="${y+22}" class="t-big" style="fill:${on?'var(--rose)':'var(--muted)'}">${CF[i][0]}</text><text x="${x+28}" y="${y+24}" class="t-lbl" style="font-size:12.5px">${CF[i][1]}</text><text x="${x+28}" y="${y+40}" class="t-xs">${CF[i][2]}</text><text x="${x+w-8}" y="${y+14}" class="t-xs t-end" style="fill:${on?'var(--rose)':'var(--muted)'};font-weight:700">${on?'כן':'לא'}</text>`});
    W.and.forEach(([x,y])=>{s+=`<text x="${x}" y="${y+4}" class="t-sm t-mid" style="fill:var(--ink);font-weight:700">וגם</text>`});
    s+=`<text x="${W.or[0]}" y="${W.or[1]+4}" class="t-sm t-mid" style="fill:var(--ink);font-weight:700">או</text>`;
    if(N)s+=`<text x="200" y="${W.res[1]-7}" class="t-sm t-mid" style="fill:var(--ink);font-weight:700">=</text>`;
    else s+=`<text x="${W.res[0]-8}" y="${W.res[1]+32}" class="t-sm t-mid" style="fill:var(--ink);font-weight:700">=</text>`;
    const [rx,ry,rw,rh]=W.res;
    s+=`<rect x="${rx}" y="${ry}" width="${rw}" height="${rh}" rx="10" style="fill:${met?'var(--bad-soft)':'var(--panel)'};stroke:${met?'var(--bad)':'var(--line)'};stroke-width:2"/><text x="${rx+rw/2}" y="${ry+24}" class="t-lbl t-mid" style="fill:${met?'var(--bad)':'var(--ink)'}">${met?'⁧CAM חיובי⁩':'לא מתקיים'}</text><text x="${rx+rw/2}" y="${ry+40}" class="t-xs t-mid">${met?'דליריום סביר':'לפי האלגוריתם הזה'}</text>`;
    cam.innerHTML=s;
    $('#ddCamNote').innerHTML=noteHTML({k:'אלגוריתם CAM',t:met?'הקריטריונים מתקיימים: דליריום סביר':'הקריטריונים אינם מתקיימים',
      txt:`${met?'מאפיינים 1 ו־2 קיימים, ובנוסף לפחות אחד מ־3 או 4.':!F[0]||!F[1]?'נדרשים גם מאפיין 1 (הופעה חדה ומהלך משתנה) וגם מאפיין 2 (חוסר קשב).':'מאפיינים 1 ו־2 קיימים, אבל לא 3 וגם לא 4.'} במחקרי התיקוף, ה־CAM ארך פחות מ־5 דקות, עם רגישות של 94 עד 100% וסגוליות של 90 עד 95% בהשוואה לאבחנה של פסיכיאטר. אצל אנשים עם דמנציה, מחקר אחד מצא סגוליות של 96 עד 100% אבל רגישות של 77% בלבד. [[Inouye1990,Morandi2012]]`,
      pt:`דליריום מופיע מהר, בא והולך. הסימן המרכזי הוא קושי לשמור על קשב.`,
      hook:`נוסחת CAM: מאפיין 1 וגם מאפיין 2, וגם מאפיין 3 או מאפיין 4. מאפיין 1: הופעה חדה ומהלך משתנה. מאפיין 2: חוסר קשב.`});
    $$('#m-ddx [data-cam]').forEach(b=>b.setAttribute('aria-pressed',F[+b.dataset.cam]));
  }
  $$('#m-ddx [data-cam]').forEach(b=>b.onclick=()=>{F[+b.dataset.cam]=!F[+b.dataset.cam];drawCam()});
  const prevR=redraws.ddx;redraws.ddx=()=>{prevR&&prevR();drawCam()};

  /* ---------- reversible causes ---------- */
  const rv=$('#ddRev'),rr=$('#ddRevT');
  const R=rng(53),order=[...Array(1000).keys()];for(let i=999;i>0;i--){const j=Math.floor(R()*(i+1));[order[i],order[j]]=[order[j],order[i]]}
  const kind=[];order.forEach((cell,k)=>kind[cell]=k<6?2:k<90?1:0);
  const RV_STEPS=[
   {from:0,k:'שלב 1',t:'1,000 אנשים עם דמנציה',txt:`מטא־אנליזה מ־2003 איחדה 39 מחקרים שכללו 5,620 אנשים עם דמנציה. אלצהיימר היה אחראי ל־56.3% מהמקרים וסיבות וסקולריות ל־20.3%. [[Clarfield2003]]`,pt:`רוב מקרי הדמנציה אינם הפיכים. החיפוש אחר היוצאים מן הכלל הוא עדיין חלק מהערכה טובה.`},
   {from:.35,k:'שלב 2',t:'90 עם סיבה שעשויה להיות הפיכה',txt:`ל־9% הייתה סיבה שבאופן עקרוני אפשר להפוך. הנחיית ה־AAN המליצה על סקר לדיכאון, לחסר B12 ולתת־פעילות של בלוטת התריס. [[Clarfield2003,Knopman2001]]`,pt:`בערך לאדם 1 מתוך 11 היה משהו שאפשר לטפל בו ושאולי הוסיף לבעיה.`},
   {from:.7,k:'שלב 3',t:'6 שהדמנציה שלהם אכן חלפה',txt:`רק אצל 0.6% הדמנציה אכן חלפה: 0.29% באופן חלקי ו־0.31% באופן מלא. [[Clarfield2003]]`,pt:`החלמה מלאה היא נדירה. החיפוש אחר בעיות שאפשר לטפל בהן הוא עדיין חלק מהערכה זהירה.`,hook:`סיבות הפיכות: הפיכות פוטנציאלית בכ־9%, חלפו בפועל בכ־0.6% (Clarfield 2003).`}
  ];
  function drawRev(t){
    const N=vb(rv,'720 250','400 350');
    const L=N?{gx:20,gy:36,px:20,py:290}:{gx:20,gy:20,px:410,py:50},c=9,o1=ramp(t,.35,.55),o2=ramp(t,.7,.9),app=ramp(t,0,.3);
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    if(N)s+=`<text x="${L.gx}" y="24" class="t-sm" style="fill:var(--ink);font-weight:600">⁧1,000 אנשים עם דמנציה⁩</text>`;
    for(let i=0;i<1000;i++){if(i/1000>=app)break;const x=L.gx+(i%40)*c+c/2,y=L.gy+Math.floor(i/40)*c+c/2,k=kind[i];
      if(k===0||o1<1)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="1.6" style="fill:var(--muted);opacity:${f1(k?1-o1:.8)}"/>`;
      if(k===1&&o1>0)s+=`<rect x="${f1(x-3.4)}" y="${f1(y-3.4)}" width="6.8" height="6.8" rx="1" style="fill:var(--amber);opacity:${f1(o1)}"/>`;
      if(k===2&&o1>0)s+=`<rect x="${f1(x-3.4)}" y="${f1(y-3.4)}" width="6.8" height="6.8" rx="1" style="fill:var(--amber);opacity:${f1(o1*(1-o2))}"/>${o2>0?`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(3.5+4*o2)}" style="fill:var(--sage);stroke:var(--panel);stroke-width:1.5;opacity:${f1(o2)}"/>`:''}`}
    const rows=[ ['dot','⁧1,000 אנשים עם דמנציה⁩','100%',1],['sq','סיבה שעשויה להיות הפיכה','90 (9%)',o1],['ring','הדמנציה אכן חלפה','6 (0.6%)',o2] ];
    rows.forEach(([m,l,v,o],i)=>{const x=N?L.px+(i?(i-1)*180:0):L.px,y=N?L.py+(i?40:0):L.py+i*52;if(N&&i===0)return;
      const mk=m==='dot'?`<circle cx="${x+6}" cy="${y-4}" r="2" style="fill:var(--muted)"/>`:m==='sq'?`<rect x="${x}" y="${y-10}" width="12" height="12" rx="2" style="fill:var(--amber)"/>`:`<circle cx="${x+6}" cy="${y-4}" r="7" style="fill:var(--sage)"/>`;
      s+=`<g style="opacity:${f1(.2+.8*o)}">${mk}<text x="${x+20}" y="${y}" class="t-lbl">${v}</text><text x="${x+20}" y="${y+15}" class="t-xs">${l}</text></g>`});
    rv.innerHTML=s;
    $('#ddRevNote').innerHTML=noteHTML(RV_STEPS[phaseOf(RV_STEPS,t)]);
  }
  playWire(rr,$('#ddRevPlay'),drawRev,9000,'הפעלה חוזרת','ddx');
  drawCam();draw(+rg.value);drawRev(+rr.value);
};
