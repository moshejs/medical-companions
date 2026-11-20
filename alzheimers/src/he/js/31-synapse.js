/* =============== 3.1 synapse: cholinesterase inhibitors and memantine =============== */
const SY_STEPS=[
 {from:0,at:.07,k:'שלב 1 · ייצור',t:'נוצר אצטילכולין',
  txt:`האנזים כולין אצטילטרנספראז (ChAT) מחבר אצטיל־CoA וכולין לאצטילכולין (ACh) בקצה הפרה־סינפטי. נשא האצטילכולין השלפוחיתי (VAChT) טוען אותו לתוך שלפוחיות סינפטיות. [[FerreiraVieira2016]]`,
  pt:`קצה העצב בונה את השליח הכימי שלו משני חלקים ואוגר אותו בבועות זעירות.`},
 {from:.17,at:.27,k:'שלב 2 · שחרור',t:'השלפוחיות מתרוקנות למרווח',
  txt:`כשקצה העצב עובר דפולריזציה, השלפוחיות מתמזגות עם הקרום ומשחררות אצטילכולין למרווח הסינפטי באקסוציטוזה. [[FerreiraVieira2016]]`,
  pt:`אות מגיע, והבועות מרוקנות את השליח לתוך הרווח הצר שבין שני תאים.`},
 {from:.34,at:.44,k:'שלב 3 · קישור',t:'קולטנים מוסקריניים וניקוטיניים',
  txt:`אצטילכולין נקשר לקולטנים מוסקריניים (M1 עד M5, מצומדי חלבון G; M1 ו־M3 נמצאים בעיקר אחרי הסינפסה) ולקולטנים ניקוטיניים (תעלות קטיונים בנויות מחמש תת־יחידות, שבמוח נמצאות בעיקר לפני הסינפסה ומווסתות שם את השחרור). [[FerreiraVieira2016]]`,
  pt:`השליח נוחת על קולטנים בתא הבא ומעביר את האות הלאה.`,
  hook:`מוסקריני = מצומד חלבון G (M1 עד M5). ניקוטיני = תעלת יונים תלוית ליגנד הבנויה מחמש תת־יחידות.`},
 {from:.5,at:.6,k:'שלב 4 · פירוק',t:'שני אנזימים מפנים את המרווח',
  txt:`אצטילכולינאסטראז (AChE) שבמרווח מפרק במהירות את האצטילכולין לאצטט ולכולין. גם בוטיריל־כולינאסטראז (BuChE) מפרק אותו. ככל שהדמנציה מחמירה, פעילות ה־BuChE עולה ופעילות ה־AChE יורדת. [[FerreiraVieira2016,Lane2006,Greig2005]]`,
  pt:`אנזימים ברווח מפרקים את השליח תוך רגעים, ולכן כל אות קצר.`},
 {from:.66,at:.75,k:'שלב 5 · מיחזור',t:'הכולין חוזר לשימוש נוסף',
  txt:`נשא הכולין בעל הזיקה הגבוהה (CHT1) מחזיר את הכולין לתוך קצה העצב, ושם הוא משמש לייצור אצטילכולין חדש. [[FerreiraVieira2016]]`,
  pt:`אחד החלקים נמשך בחזרה לתוך קצה העצב ומשמש שוב.`},
 {from:.84,at:.95,k:'שלב 6 · התוצאה',t:'כמה זמן נמשך האות',txt:''}
];
/* the final step depends on what is selected */
const SY_COND={
 healthy:{lbl:'בריא',n:18,ves:[0,1,2,3,4],bind:10,ache:0,buche:0,
  txt:`בסינפסה בריאה פרץ האצטילכולין גדול וקצר: הוא משתחרר, נקשר ומפונה תוך רגעים, והסינפסה מוכנה לאות הבא. [[FerreiraVieira2016]] עברו לאלצהיימר כדי להשוות.`,
  pt:`הרבה שליח, אות חזק, ואחר כך ניקוי מהיר.`},
 ad:{lbl:'אלצהיימר, ללא טיפול',n:8,ves:[1,3],bind:4,ache:0,buche:0,
  txt:`במחלת אלצהיימר הולך ואובד הקלט הכולינרגי מהמוח הקדמי הבסיסי (כולל הגרעין הבזלי של מיינרט) לאזורים הלימביים ולקליפת המוח; ניוון נוירופיברילרי נחשב לגורם העיקרי. פחות קצוות עצב פירושו שפחות אצטילכולין מגיע לקולטנים. ההשערה הכולינרגית משנת 1982 קשרה את האובדן הזה לפגיעה בזיכרון. [[Hampel2018,FerreiraVieira2016,Bartus1982]]`,
  pt:`פחות קצוות עצב מייצרים פחות שליח, ולכן האות חלש יותר.`,
  hook:`ההשערה הכולינרגית (Bartus 1982): אובדן הקלט הכולינרגי מהמוח הקדמי הבסיסי קשור לאובדן הזיכרון. זה הבסיס הרעיוני לכל מעכבי הכולינאסטראז.`},
 don:{lbl:'דונפזיל',n:8,ves:[1,3],bind:4,ache:1,buche:0,
  txt:`דונפזיל (Aricept) מעכב באופן בררני את ה־AChE, ולכן האצטילכולין נשאר זמן רב יותר במרווח וממשיך להגיע לקולטנים. זמן מחצית החיים שלו כ־70 שעות. הוא אינו מחזיר קצוות עצב שאבדו: העלונים מציינים שאין ראיות לכך שמעכבי כולינאסטראז משנים את מהלך המחלה, וההשפעה עשויה לפחות ככל שנותרים פחות נוירונים כולינרגיים. [[Noetzli2013,FDAAricept2021,FDAExelonPatch2024,FDAGalantamineER2025]]`,
  pt:`התרופה משבשת את אנזים הניקוי, כך שהמעט שליח שיש נשאר זמן רב יותר.`,
  hook:`מעכבי כולינאסטראז הם טיפול תסמיני: הם מחזקים את האות שנותר, ואינם מאטים את המחלה.`},
 riv:{lbl:'ריבסטיגמין',n:8,ves:[1,3],bind:4,ache:1,buche:1,
  txt:`ריבסטיגמין (Exelon) הוא מעכב קרבמטי פסאודו־בלתי הפיך של AChE וגם של BuChE, בזיקה דומה לשניהם. זמן מחצית החיים שלו בפלזמה כ־1 עד 2 שעות, ובכל זאת הוא משאיר את ה־AChE מעוכב כ־8.5 שעות ואת ה־BuChE כ־3.5 שעות. לא הוכח שהפעולה על BuChE מוסיפה תועלת קלינית. [[Noetzli2013,Wilkinson2004]]`,
  pt:`התרופה הזאת משבשת את שני אנזימי הניקוי. לא ידוע אם השיבוש של השני מועיל יותר לאנשים.`,
  hook:`ריבסטיגמין הוא היחיד מבין השלושה שמעכב גם BuChE. בסקירת Cochrane משנת 2006 לא נמצא הבדל ביעילות בין השלושה, ונמצאו פחות תופעות לוואי בדונפזיל מאשר בריבסטיגמין. [[Birks2006]]`},
 gal:{lbl:'גלנטמין',n:8,ves:[1,3],bind:4,ache:1,buche:0,flag:1,
  txt:`גלנטמין (Razadyne) הוא מעכב AChE תחרותי והפיך, עם זמן מחצית חיים של כ־7 שעות, ומפונה דרך CYP2D6 ו־CYP3A4. מחקר משנת 2003 דיווח שהוא גם מחזק קולטנים ניקוטיניים כליגנד אלוסטרי מגביר. מחקר משנת 2018 על קולטני α4β2 ו־α7 אנושיים לא שחזר את הממצא, ומצא חסימה של הנקבובית בריכוזים גבוהים יותר. סקירה משנת 2004 העריכה שהמשמעות ברמות שבמוח אינה ברורה. [[FDAGalantamineER2025,Noetzli2013,Samochocki2003,Kowal2018,Wilkinson2004]]`,
  pt:`הוא משבש את אנזים הניקוי כמו האחרים. פעולה שנייה שיוחסה לו על קולטנים ניקוטיניים לא שוחזרה במחקר מאוחר יותר, ולכן היא שנויה במחלוקת.`,
  hook:`ההשפעה הניקוטינית של גלנטמין: דווחה ב־2003 (Samochocki), לא שוחזרה ב־2018 (Kowal). זהו ממצא שנוי במחלוקת.`}
};
const SY_NM=[
 {from:0,at:.06,k:'שלב 1 · במנוחה',t:'מגנזיום פוקק את התעלה',
  txt:`קולטן NMDA הוא תעלה שנפתחת כשגלוטמט נקשר אליה. במתח המנוחה יון מגנזיום יושב בנקבובית וחוסם אותה, ולכן גלוטמט לבדו מעביר מעט מאוד (פיזיולוגיה בסיסית).`,
  pt:`השער הזה צריך שני מפתחות: האות הכימי ודחיפה חשמלית. במנוחה יושב בו פקק של מגנזיום.`},
 {from:.14,at:.22,k:'שלב 2 · אות אמיתי',t:'פרץ עובר',
  txt:`אות חזק מביא פרץ של גלוטמט וגורם לדפולריזציה של הקרום. יון המגנזיום נדחף החוצה, וסידן זורם פנימה לזמן קצר. אות הסידן הקצר והגדול הזה הוא חלק מהמנגנון שבו סינפסות מתחזקות (פיזיולוגיה בסיסית).`,
  pt:`מסר אמיתי מקפיץ את הפקק החוצה, ושטף קצר של סידן נושא את האות.`},
 {from:.31,at:.43,k:'שלב 3 · הדליפה',t:'גלוטמט קבוע, טפטוף מתמיד',
  txt:`הרציונל לממנטין הוא שבמחלת אלצהיימר קולטני NMDA מופעלים יותר מדי, וכניסת הסידן העודפת מזיקה. כאן רמה נמוכה וקבועה של גלוטמט ממשיכה לדחוק בתעלה, חסימת המגנזיום אינה שלמה, וסידן מטפטף פנימה כל הזמן: רעש רקע שגם מסתיר אותות אמיתיים. [[Parsons1999,Lipton2006]]`,
  pt:`דליפה איטית וקבועה של החומר משאירה את השער פתוח למחצה כל הזמן. הטפטוף המתמיד של סידן נחשב מזיק לתא.`},
 {from:.53,at:.64,k:'שלב 4 · ממנטין נכנס',t:'חוסם של תעלה פתוחה',
  txt:`ממנטין (Namenda) הוא אנטגוניסט לא תחרותי של קולטן NMDA, בזיקה נמוכה עד בינונית: הוא יכול להיכנס רק לתעלה שכבר פתוחה, והוא יושב בנקבובית, קרוב למקום שבו נקשר המגנזיום. הוא חוסם תעלות שפעילותן מוגברת באופן חולני. [[FDAMemantineER2026,McShane2019,Parsons1999,Lipton2006]]`,
  pt:`ממנטין חומק לתוך השערים שנתקעו פתוחים ופוקק את הדליפה.`,
  hook:`ממנטין הוא חוסם לא תחרותי (של תעלה פתוחה) ותלוי מתח. הוא אינו מתחרה בגלוטמט על אתר הקישור שלו.`},
 {from:.74,at:.83,k:'שלב 5 · שוב אות',t:'הפרץ עדיין עובר',
  txt:`מכיוון שקינטיקת החסימה של ממנטין מהירה ותלויה מאוד במתח, דפולריזציה חזקה מוציאה אותו מהנקבובית, פרץ הסידן עובר, וממנטין חוזר כשהקרום נרגע. הסבילות הטובה שלו מיוחסת לעוצמה המתונה ולקינטיקה המהירה הזאת. אחת משתי הסקירות שמציגות את הטיעון הזה (Parsons 1999) מגיעה מהחברה שפיתחה את התרופה, Merz. [[Parsons1999,Lipton2006]]`,
  pt:`כשמגיע מסר אמיתי, ממנטין קופץ החוצה כמו המגנזיום, ואחר כך חומק בחזרה פנימה.`},
 {from:.92,at:.97,k:'שלב 6 · מה הוא אינו עושה',t:'טיפול תסמיני, לא משנה מחלה',
  txt:`עלון הממנטין מציין שאין ראיות לכך שהוא מונע ניוון עצבי או מאט אותו. בסקירת Cochrane משנת 2019 נמצא שהוא עזר מעט באלצהיימר בינוני עד חמור, לא באלצהיימר קל, ולא היה יעיל לאי־שקט (CMAI +0.50, רווח סמך 95%: ‎−3.71 עד 4.71). [[FDAMemantineER2026,McShane2019]]`,
  pt:`הוא עשוי להקל מעט על התסמינים בשלבים מאוחרים. הוא אינו עוצר את המחלה.`,
  hook:`ממנטין: אלצהיימר בינוני עד חמור. באלצהיימר קל סקירת Cochrane לא מצאה תועלת.`}
];
const SY_BEN=[
 {k:'גודלי השפעה',t:'קטנים בכל סולם',
  txt:`דונפזיל (Cochrane 2018, 26 שבועות, 10 mg): ADAS-Cog ‎−2.67 נקודות בסולם של 0 עד 70 (רווח סמך 95%: ‎−3.31 עד ‎−2.02), MMSE ‎+1.05 (0.73 עד 1.37), וסיכוי גבוה יותר לשיפור כללי בהערכת הקלינאי (OR 1.92, 1.54 עד 2.39). ריבסטיגמין: ADAS-Cog ‎−1.79. גלנטמין 24 mg: כ־‎−3.1. ממנטין במחלה בינונית עד חמורה: SIB ‎+3.11 בסולם של 0 עד 100; במחלה קלה, אין תועלת (ADAS-Cog 0.21, ‎−0.95 עד 1.38). ניסוי DOMINO קבע את ההבדל המזערי החשוב קלינית על 1.4 נקודות SMMSE. [[Birks2018,Birks2015,Loy2006,McShane2019,Howard2012]]`,
  pt:`בממוצע, הכדורים מזיזים את ציוני המבחנים בכמה נקודות בסולמות של 30, 70 או 100 נקודות. סוקרי Cochrane מגדירים זאת כקטן.`,
  hook:`דונפזיל מול פלצבו אחרי 26 שבועות: ADAS-Cog ‎−2.67, MMSE ‎+1.05. Cochrane מגדירה את התועלת כקטנה. רוב הניסויים נמשכו 6 חודשים או פחות. [[Birks2018]]`},
 {k:'תופעות לוואי',t:'בעיקר במערכת העיכול, בעיקר בזמן העלאת המינון',
  txt:`שיעורים לפי העלונים, תרופה מול פלצבו. בריבסטיגמין דרך הפה היו הכי הרבה בחילות והקאות; במדבקת 9.5 mg בניסוי IDEAL היו כשני שלישים פחות מאשר בכמוסות. רוב תופעות הלוואי של גלנטמין הופיעו בזמן העלאת המינון. העלונים של שלושת המעכבים מזהירים מפני דופק איטי, חסם הולכה בלב והתעלפות; בקוהורט באונטריו, הפניות בשל התעלפות היו 31.5 לעומת 18.6 לכל 1,000 שנות אדם (HR 1.76). [[FDAAricept2021,FDARivastigmineCaps2022,FDAGalantamineER2025,FDAMemantineIR2023,Winblad2007,Gill2009]]`,
  pt:`קלקול קיבה הוא הבעיה השכיחה ביותר בשלוש התרופות הראשונות. בממנטין השכיחות ביותר הן סחרחורת וכאב ראש. דופק איטי והתעלפות נדירים יותר, אבל חמורים.`,
  hook:`מעכבי כולינאסטראז הם וגוטוניים: ברדיקרדיה, חסם הולכה, התעלפות. קריטריוני Beers 2023 ממליצים להימנע מהם כשההתעלפות עשויה לנבוע מברדיקרדיה. [[AGS2023]]`},
 {k:'הפסקה',t:'DOMINO: מה קרה כשהופסק דונפזיל',
  txt:`DOMINO (295 אנשים עם אלצהיימר בינוני עד חמור שכבר נטלו דונפזיל): בהמשך הטיפול נמצאו ‎+1.9 נקודות SMMSE (רווח סמך 95%: 1.3 עד 2.5) ו־3.0 נקודות פחות פגיעה ב־BADLS (1.8 עד 4.3) במשך 52 שבועות. ההפסקה הכפילה בערך את המעברים למוסד סיעודי בשנה הראשונה (HR 2.09, 1.29 עד 3.39), בלי הבדל ב־3 השנים שאחריה (HR 0.89). במשך 4 שנים, 55% עברו למוסד סיעודי. סקירת Cochrane משנת 2021 לא מצאה ניסויים של הפסקת ממנטין בלבד. [[Howard2012,Howard2015,Parsons2021]]`,
  pt:`אחרי הפסקת דונפזיל בשלבים מאוחרים נצפו הידרדרות מהירה יותר ומעבר מוקדם יותר למסגרת טיפולית בשנה הראשונה. החוקרים כותבים שהחלטות על הפסקה או המשך צריכות לשקול את הנזקים האפשריים של ההפסקה.`,
  hook:`DOMINO-AD: הפסקת דונפזיל ← HR 2.09 למעבר למוסד סיעודי בשנה 1, בלי הבדל בשנים 2 עד 4. [[Howard2015]]`}
];
inits.synapse=()=>{
  /* ---------- 1. cholinergic synapse ---------- */
  const svg=$('#sySvg'),rg=$('#syT');let cond='healthy';
  const R=rng(311),MOL=Array.from({length:18},(_,i)=>({a:R(),b:R(),c:R(),d:R(),e:R()}));
  const VX=[170,230,290,350,410],RX=[130,195,260,325,390],RT=['M','N','M','N','M'],EX=[162,292,357],BX=432;
  const CH={x:100,y:92},CT={x:90,y:190};
  function cfg(c){return SY_COND[c]}
  /* state of molecule i at time u under config C */
  function mol(i,u,C){
    const m=MOL[i],n=C.n,vi=C.ves[i%C.ves.length],eIdx=i%4,isB=eIdx===3;
    const blocked=isB?C.buche:C.ache;
    const ap=.02+.12*i/n;
    const brk=blocked?(.66+.72*(((i*7)%n)/n)):(.5+.16*i/n);
    const ex=isB?BX:EX[eIdx],ey=isB?240:250;
    const vy=lerp(135,172,ease(ramp(u,.18,.24)));
    const ang=i*2.4,vsx=VX[vi]+Math.cos(ang)*7,vsy=vy+Math.sin(ang)*7;
    const csx=clamp(VX[vi]+(m.a-.5)*50,70,440),csy=205+m.b*16;
    const bound=i<C.bind;const r=i%5;
    const tx=bound?RX[r]+(i<5?-4:4):clamp(70+m.c*370,70,440),ty=bound?259:216+m.d*24;
    if(u<ap)return null;
    let x,y,st='ach';
    if(u<ap+.04){const p=ease(ramp(u,ap,ap+.04));x=lerp(CH.x,vsx,p);y=lerp(CH.y,vsy,p)}
    else if(u<.25){x=vsx;y=vsy}
    else if(u<.33){const p=ease(ramp(u,.25,.33));x=lerp(vsx,csx,p);y=lerp(vsy,csy,p)}
    else{const p=ease(ramp(u,.33+.02*(i%4),.46));x=lerp(csx,tx,p);y=lerp(csy,ty,p);
      if(blocked&&u>.52){const w=.5+.5*Math.sin(u*34+i*1.3);x=lerp(x,csx,w*.55);y=lerp(y,csy,w*.55)}}
    if(u>=brk-.04&&u<brk){const p=ease(ramp(u,brk-.04,brk));x=lerp(x,ex,p);y=lerp(y,ey-10,p)}
    if(u>=brk){const s=Math.max(brk+.02,.66)+.02*(i%3);
      let cx=ex+4,cy=ey-12;
      if(u>s){const p=ease(ramp(u,s,s+.08));cx=lerp(ex+4,CT.x,p);cy=lerp(ey-12,CT.y+4,p)}
      let co=1;if(u>s+.08){const p=ramp(u,s+.08,s+.13);cy=lerp(CT.y+4,CT.y-36,p);co=1-p}
      const ao=1-ramp(u,brk,brk+.12),ax=ex-6+ramp(u,brk,brk+.12)*-10,ay=ey-8+ramp(u,brk,brk+.12)*-26;
      return {st:'split',cx,cy,co,ax,ay,ao,blocked}}
    return {st,x,y,bound:bound&&u>.44&&u<brk-.04,r,blocked}
  }
  function inCleft(i,u,C){const n=C.n,eIdx=i%4,isB=eIdx===3,blocked=isB?C.buche:C.ache;
    const brk=blocked?(.66+.72*(((i*7)%n)/n)):(.5+.16*i/n);return u<brk?ramp(u,.25,.34):0}
  function curve(C,u1){let d='';for(let k=0;k<=100;k++){const u=k/100*u1;let s=0;for(let i=0;i<C.n;i++)s+=inCleft(i,u,C);d+=(k?'L':'M')+u.toFixed(4)+' '+(s/18).toFixed(4)}return d}
  function draw(t){
    const N=vb(svg,'720 400','400 690');
    const X=x=>N?16+(x-30)*(368/450):x;
    const L=N?{ch:{x0:44,x1:380,y0:450,y1:604,tY:432,lgY:640},title:'הקצה הפרה־סינפטי',adTxt:'⁧פחות קצוות עצב, פחות ACh⁩',nic:'⁧חיזוק ניקוטיני? 2003 כן, 2018 לא שוחזר⁩'}
             :{ch:{x0:528,x1:704,y0:84,y1:296,tY:68,lgY:330},title:'הקצה הפרה־סינפטי',adTxt:'⁧פחות קצוות כולינרגיים, פחות ACh⁩',nic:'⁧חיזוק ניקוטיני? דווח ב־2003, לא שוחזר ב־2018⁩'};
    const C=cfg(cond),ad=cond!=='healthy';
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    /* terminal */
    s+=`<path d="M${X(60)} 18 H${X(450)} V150 Q${X(450)} 190 ${X(410)} 190 H${X(100)} Q${X(60)} 190 ${X(60)} 150 Z" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2;opacity:${ad?.75:1}"/>`;
    s+=`<text x="${X(72)}" y="38" class="t-sm">${L.title}</text>`;
    if(ad)s+=`<text x="${X(440)}" y="38" class="t-xs t-end" style="fill:var(--rose)">${L.adTxt}</text>`;
    if(C.ache){const dl=cond==='riv'?(N?'⁧+ ריבסטיגמין: AChE ו־BuChE חסומים⁩':'⁧+ ריבסטיגמין: AChE ו־BuChE חסומים⁩'):`⁧+ ${C.lbl.toLowerCase()}: AChE חסום⁩`;
      s+=`<text x="${X(440)}" y="54" class="t-xs t-end" style="fill:var(--sky);font-weight:700">${dl}</text>`}
    /* signal arrives */
    const sig=bump(t,.15,.26);if(sig>0)s+=`<g style="opacity:${f1(sig)}"><path d="M${X(300)} 62 V108" class="arrow" marker-end="url(#syA)" style="stroke:var(--ink);stroke-width:2.4"/><text x="${X(308)}" y="80" class="t-xs">אות מגיע</text></g>`;
    /* ChAT and the reaction */
    s+=`<rect x="${X(CH.x)-22}" y="${CH.y-11}" width="44" height="22" rx="7" style="fill:var(--panel);stroke:var(--violet);stroke-width:1.6"/><text x="${X(CH.x)}" y="${CH.y+4}" class="t-xs t-mid" style="fill:var(--violet);font-weight:700">ChAT</text>`;
    const ro=1-ramp(t,.16,.22);if(ro>0)s+=`<text x="${X(CH.x)}" y="${CH.y+30}" class="t-xs t-mid" style="opacity:${f1(ro)}">⁧אצטיל־CoA + כולין⁩</text>`;
    /* CHT1 transporter */
    s+=`<rect x="${X(CT.x)-9}" y="${CT.y-9}" width="6" height="18" rx="2" style="fill:var(--sage)"/><rect x="${X(CT.x)+3}" y="${CT.y-9}" width="6" height="18" rx="2" style="fill:var(--sage)"/><text x="${X(CT.x)}" y="${CT.y-16}" class="t-xs t-mid" style="fill:var(--sage)">CHT1</text>`;
    /* vesicles */
    const vy=lerp(135,172,ease(ramp(t,.18,.24))),fuse=ramp(t,.24,.3);
    C.ves.forEach(vi=>{const x=X(VX[vi]);
      if(fuse<1)s+=`<circle cx="${f1(x)}" cy="${f1(vy)}" r="${f1(15*(1-fuse*.5))}" style="fill:var(--violet-soft);stroke:var(--violet);stroke-width:1.4;opacity:${f1(1-fuse)}"/>`;
      if(fuse>0&&t<.5)s+=`<path d="M${f1(x-16)} 190 Q${f1(x)} ${f1(190-14*(1-fuse))} ${f1(x+16)} 190" style="fill:none;stroke:var(--violet);stroke-width:1.4;opacity:${f1(1-ramp(t,.34,.5))}"/>`});
    /* cleft label */
    s+=`<text transform="translate(${X(46)} 232) rotate(-90)" class="t-xs t-mid">מרווח</text>`;
    /* postsynaptic cell */
    s+=`<path d="M${X(40)} 270 H${X(470)} V392 H${X(40)} Z" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2"/>`;
    s+=`<text x="${X(52)}" y="382" class="t-sm">הנוירון הפוסט־סינפטי</text>`;
    /* glia with BuChE */
    s+=`<ellipse cx="${X(470)}" cy="226" rx="${N?12:16}" ry="34" style="fill:var(--glia);opacity:.35"/><text x="${X(470)}" y="${N?206:204}" class="t-xs t-mid" style="fill:var(--glia)">גליה</text>`;
    /* molecules: work out which receptors are lit */
    const lit=[0,0,0,0,0];const parts=[];
    for(let i=0;i<C.n;i++){const m=mol(i,t,C);if(!m)continue;
      if(m.st==='split'){if(m.co>0)parts.push(`<circle cx="${f1(X(m.cx))}" cy="${f1(m.cy)}" r="2.8" style="fill:var(--sage);opacity:${f1(m.co)}"/>`);
        if(m.ao>0)parts.push(`<rect x="${f1(X(m.ax)-2)}" y="${f1(m.ay-2)}" width="4.4" height="4.4" style="fill:var(--muted);opacity:${f1(m.ao)}"/>`)}
      else{if(m.bound)lit[m.r]=1;parts.push(`<circle cx="${f1(X(m.x))}" cy="${f1(m.y)}" r="3.6" style="fill:var(--violet)"/>`)}}
    /* receptors */
    RX.forEach((x0,k)=>{const x=X(x0),on=lit[k],sty=`fill:${on?'var(--violet-soft)':'var(--panel)'};stroke:${on?'var(--violet)':'var(--cell-line)'};stroke-width:1.6`;
      if(RT[k]==='M')s+=`<rect x="${f1(x-8)}" y="257" width="16" height="26" rx="5" style="${sty}"/><path d="M${f1(x-3)} 261v18M${f1(x+3)} 261v18" style="stroke:${on?'var(--violet)':'var(--cell-line)'};stroke-width:1"/>`;
      else s+=`<rect x="${f1(x-11)}" y="255" width="8" height="30" rx="3" style="${sty}"/><rect x="${f1(x+3)}" y="255" width="8" height="30" rx="3" style="${sty}"/>`;
      s+=`<text x="${f1(x)}" y="${RT[k]==='M'?296:298}" class="t-xs t-mid" style="font-weight:700">${RT[k]}</text>`;
      if(on)s+=`<path d="M${f1(x-9)} 306 q9 6 18 0 M${f1(x-6)} 312 q6 4 12 0" style="fill:none;stroke:var(--violet);stroke-width:1.4"/>`;
      if(C.flag&&RT[k]==='N')s+=`<rect x="${f1(x-14)}" y="252" width="28" height="36" rx="6" style="fill:none;stroke:var(--warn);stroke-width:1.4;stroke-dasharray:3 3"/>`});
    /* enzymes */
    const enz=(x,y,lab,blk,col)=>{let g=`<path d="M${f1(x)} ${y+10} V270" style="stroke:var(--cell-line);stroke-width:2"/>`;
      g+=`<path d="M${f1(x)} ${y} L${f1(x-7)} ${y-9} A11 11 0 1 0 ${f1(x+7)} ${y-9} Z" style="fill:var(--panel);stroke:${col};stroke-width:1.8"/>`;
      if(blk)g+=`<rect x="${f1(x-4.5)}" y="${y-10}" width="9" height="9" transform="rotate(45 ${f1(x)} ${y-5.5})" style="fill:var(--sky);stroke:var(--panel);stroke-width:1"/>`;
      return g+`<text x="${f1(x)}" y="${lab==='BuChE'?(N?336:322):296}" class="t-xs t-mid" style="fill:${col}">${lab}</text>`};
    EX.forEach(x=>{s+=enz(X(x),250,'AChE',C.ache,'var(--ink)')});
    s+=enz(X(BX),240,'BuChE',C.buche,'var(--glia)');
    s+=parts.join('');
    if(C.flag)s+=`<text x="${X(60)}" y="${N?324:340}" class="t-xs" style="fill:var(--warn)">${L.nic}</text>`;
    /* glyph legend */
    const lgY=N?356:358,lx=N?[32,108,198,290]:[60,150,250,350];
    s+=`<circle cx="${lx[0]+4}" cy="${lgY-3}" r="3.6" style="fill:var(--violet)"/><text x="${lx[0]+12}" y="${lgY}" class="t-xs">ACh</text>`;
    s+=`<rect x="${lx[1]}" y="${lgY-7}" width="8" height="8" transform="rotate(45 ${lx[1]+4} ${lgY-3})" style="fill:var(--sky)"/><text x="${lx[1]+13}" y="${lgY}" class="t-xs">מעכב</text>`;
    s+=`<circle cx="${lx[2]+4}" cy="${lgY-3}" r="2.8" style="fill:var(--sage)"/><text x="${lx[2]+12}" y="${lgY}" class="t-xs">כולין</text>`;
    s+=`<rect x="${lx[3]+1}" y="${lgY-5}" width="4.4" height="4.4" style="fill:var(--muted)"/><text x="${lx[3]+12}" y="${lgY}" class="t-xs">אצטט</text>`;
    /* chart: ACh in the cleft over one signal */
    const K=L.ch,cw=K.x1-K.x0,chh=K.y1-K.y0;
    const map=d=>d.replace(/([ML])([\d.]+) ([\d.]+)/g,(_,c,u,v)=>c+f1(K.x0+ +u*cw)+' '+f1(K.y1-(+v)*chh*.92));
    s+=`<text x="${K.x0-4}" y="${K.tY}" class="t-sm">⁧ACh במרווח⁩</text>`;
    s+=`<path d="M${K.x0} ${K.y0} V${K.y1} H${K.x1}" class="axis" style="fill:none"/>`;
    [.25,.5,.66,.84].forEach(u=>{s+=`<path d="M${f1(K.x0+u*cw)} ${K.y0} V${K.y1}" class="grid"/>`});
    s+=`<text x="${K.x0}" y="${K.y1+14}" class="t-xs">ייצור</text><text x="${f1(K.x0+.25*cw)}" y="${K.y1+14}" class="t-xs">שחרור</text><text x="${f1(K.x0+.5*cw)}" y="${K.y1+14}" class="t-xs">פינוי</text><text x="${K.x1}" y="${K.y1+14}" class="t-xs t-end">זמן →</text>`;
    s+=`<text x="${K.x0+6}" y="${K.y0+10}" class="t-xs">יותר</text>`;
    s+=`<path d="${map(curve(SY_COND.healthy,1))}" style="fill:none;stroke:var(--muted);stroke-width:1.6;stroke-dasharray:4 4"/>`;
    if(cond!=='healthy'){s+=`<path d="${map(curve(SY_COND.ad,1))}" style="fill:none;stroke:var(--rose);stroke-width:1.4;stroke-dasharray:1 3;opacity:.9"/>`}
    const col=C.ache?'var(--sky)':(ad?'var(--rose)':'var(--violet)');
    s+=`<path d="${map(curve(C,t))}" style="fill:none;stroke:${col};stroke-width:2.8"/>`;
    let now=0;for(let i=0;i<C.n;i++)now+=inCleft(i,t,C);
    s+=`<circle cx="${f1(K.x0+t*cw)}" cy="${f1(K.y1-now/18*chh*.92)}" r="4.5" style="fill:${col}"/>`;
    const ly=K.lgY;
    s+=`<path d="M${K.x0} ${ly-4} h22" style="stroke:var(--muted);stroke-width:1.6;stroke-dasharray:4 4"/><text x="${K.x0+28}" y="${ly}" class="t-xs">בריא</text>`;
    if(cond!=='healthy'&&C.ache)s+=`<path d="M${K.x0+(N?100:84)} ${ly-4} h22" style="stroke:var(--rose);stroke-width:1.4;stroke-dasharray:1 3"/><text x="${K.x0+(N?128:112)}" y="${ly}" class="t-xs">ללא טיפול</text>`;
    s+=`<path d="M${K.x0} ${ly+12} h22" style="stroke:${col};stroke-width:2.8"/><text x="${K.x0+28}" y="${ly+16}" class="t-xs" style="fill:var(--ink)">${C.lbl}</text>`;
    svg.innerHTML=`<defs>${marker('syA','var(--ink)')}</defs>`+s;
    const p=phaseOf(SY_STEPS,t);setSt(p);
    let P=SY_STEPS[p];if(p===5)P={...P,t:C.lbl+': כמה זמן נמשך האות',txt:C.txt,pt:C.pt,hook:C.hook};
    $('#syNote').innerHTML=noteHTML(P);
    $('#syCap').textContent=`מוצג: ${C.lbl}. סכמטי, לא בקנה מידה. הגרף סופר את המולקולות שבציור; אלה אינם נתונים שנמדדו.`;
  }
  const stop=playWire(rg,$('#syPlay'),draw,16000,'הפעלה חוזרת','synapse');
  const setSt=stepWire($('#sySteps'),SY_STEPS,rg,draw,stop);
  $$('[data-sy]').forEach(b=>b.addEventListener('click',()=>{cond=b.dataset.sy;$$('[data-sy]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));

  /* ---------- 2. memantine at the NMDA receptor ---------- */
  const nm=$('#syNm'),nr=$('#syNmT');let tight=false;
  const V=u=>bump(u,.15,.29)+bump(u,.75,.89)+(u>.31&&u<.75?.12+.04*Math.sin(u*90):0);
  const memIn=u=>{if(u<.55)return 0;const enter=ease(ramp(u,.55,.63));if(tight)return enter;return enter*(1-ramp(u,.77,.8))+ramp(u,.89,.94)*(u>.89?1:0)};
  const leak=u=>u>.31?ramp(u,.31,.36)*(.32+.1*Math.sin(u*70)+.06*Math.sin(u*170)):0;
  const Ca=u=>{const burst1=bump(u,.16,.29),burst2=bump(u,.76,.89);const m=memIn(u);
    return Math.max(burst1,tight?burst2*.08:burst2*.92,leak(u)*(1-m*.9))};
  function drawNm(t){
    const N=vb(nm,'720 380','400 700');
    const L=N?{cx:200,top:44,mY0:150,mY1:226,inY:300,tr:{x0:40,x1:380,v0:404,v1:484,c0:552,c1:640},lab:{x:200,y:24,a:'t-mid'}}
             :{cx:200,top:44,mY0:150,mY1:226,inY:300,tr:{x0:440,x1:704,v0:62,v1:150,c0:212,c1:316},lab:{x:200,y:24,a:'t-mid'}};
    const cx=L.cx,my0=L.mY0,my1=L.mY1;
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    const zoneW=N?400:400;
    s+=`<rect x="0" y="0" width="${zoneW}" height="${my0}" style="fill:var(--csf);opacity:.4"/>`;
    s+=`<text x="${N?16:20}" y="${my0-10}" class="t-xs">מחוץ לתא</text><text x="${N?16:20}" y="${my1+20}" class="t-xs">בתוך הנוירון</text>`;
    /* membrane */
    for(let x=(N?12:16);x<(N?392:384);x+=12){if(Math.abs(x-cx)<52)continue;s+=`<circle cx="${x}" cy="${my0+6}" r="4.6" style="fill:var(--cell-line)"/><circle cx="${x}" cy="${my1-6}" r="4.6" style="fill:var(--cell-line)"/><path d="M${x} ${my0+11}V${my1-11}" style="stroke:var(--cell-line);opacity:.5"/>`}
    /* channel walls */
    const open=clamp(Math.max(V(t)>.4?1:0,leak(t)*1.6)),gap=10+6*open;
    s+=`<path d="M${cx-gap} ${my0-30} Q${cx-gap-6} ${(my0+my1)/2} ${cx-gap} ${my1+28} H${cx-gap-34} Q${cx-gap-46} ${(my0+my1)/2} ${cx-gap-34} ${my0-30} Z" style="fill:var(--sage-soft);stroke:var(--sage);stroke-width:2"/>`;
    s+=`<path d="M${cx+gap} ${my0-30} Q${cx+gap+6} ${(my0+my1)/2} ${cx+gap} ${my1+28} H${cx+gap+34} Q${cx+gap+46} ${(my0+my1)/2} ${cx+gap+34} ${my0-30} Z" style="fill:var(--sage-soft);stroke:var(--sage);stroke-width:2"/>`;
    s+=`<text x="${cx+gap+56}" y="${my0+30}" class="t-xs">קולטן</text><text x="${cx+gap+56}" y="${my0+42}" class="t-xs">NMDA</text>`;
    /* glutamate on binding sites */
    const gB=Math.max(bump(t,.14,.3),bump(t,.74,.9));const gT=t>.31?ramp(t,.31,.36):0;
    const occ=(k)=>gB>.2?1:(gT>0&&(Math.sin(t*60+k*2)>-.2)?1:0);
    [-1,1].forEach((d,k)=>{const x=cx+d*(gap+17),y=my0-36;
      s+=`<path d="M${x-9} ${y-6} q9 12 18 0" style="fill:none;stroke:var(--sage);stroke-width:2"/>`;
      if(occ(k))s+=`<circle cx="${x}" cy="${y-2}" r="5.5" style="fill:var(--violet)"/>`});
    /* floating glutamate */
    const nG=Math.round(gB*6+gT*2);for(let k=0;k<nG;k++){const a=k*1.9+t*8,r=40+k*9;s+=`<circle cx="${f1(cx+Math.cos(a)*r)}" cy="${f1(my0-62+Math.sin(a)*14)}" r="4" style="fill:var(--violet);opacity:.8"/>`}
    s+=`<text x="${cx+(N?-150:-160)}" y="${my0-64}" class="t-xs" style="fill:var(--violet)">גלוטמט</text>`;
    /* magnesium */
    const mY=(my0+my1)/2,mgOut=Math.max(clamp(V(t)*1.6-.4),leak(t)>0?(.5+.5*Math.sin(t*110))*ramp(t,.31,.36)*(1-memIn(t)):0);
    const mgy=mY-mgOut*(mY-my0+40);
    s+=`<circle cx="${cx}" cy="${f1(mgy)}" r="9" style="fill:var(--panel);stroke:var(--muted);stroke-width:2"/><text x="${cx}" y="${f1(mgy+3.5)}" class="t-xs t-mid" style="font-size:8.5px;fill:var(--ink)">Mg</text>`;
    /* memantine */
    const mi=memIn(t);
    if(t>.53){const my=lerp(my0-90,mY-18,mi),mx=lerp(cx-70,cx,mi);const o=ramp(t,.53,.56);
      const lab=tight?'חוסם הדוק':'ממנטין',lw=lab.length*5.9+8,lxE=Math.min(mx-18,cx-gap-50);
      s+=`<g style="opacity:${f1(o)}"><rect x="${f1(mx-12)}" y="${f1(my-7)}" width="24" height="14" rx="7" style="fill:var(--sky);stroke:var(--panel);stroke-width:1.5"/><rect x="${f1(lxE-lw+4)}" y="${f1(my-8)}" width="${f1(lw)}" height="16" rx="4" style="fill:var(--field);opacity:.92"/><text x="${f1(lxE)}" y="${f1(my+4)}" class="t-xs t-end" style="fill:var(--sky);font-weight:700">${lab}</text></g>`}
    /* calcium flow */
    const ca=Ca(t),K=14;for(let k=0;k<K;k++){if(k/K>ca)continue;const p=(t*9+k/K)%1;const y=lerp(my0-50,my1+60,p);if(Math.abs(y-mgy)<12&&mgOut<.5)continue;if(mi>.5&&Math.abs(y-(mY-18))<10)continue;
      s+=`<circle cx="${f1(cx+Math.sin(p*9+k)*4)}" cy="${f1(y)}" r="3.4" style="fill:var(--amber)"/>`}
    s+=`<text x="${cx+gap+56}" y="${my1+46}" class="t-xs" style="fill:var(--amber)">⁧Ca²⁺‎ נכנס⁩</text>`;
    /* phase caption */
    const ph=phaseOf(SY_NM,t);
    const cap=[ '⁧במנוחה: Mg²⁺‎ פוקק את התעלה⁩','⁧אות: Mg²⁺‎ יוצא, פרץ של Ca²⁺‎⁩','⁧דליפה: Ca²⁺‎ מטפטף פנימה כל הזמן⁩',tight?'החוסם ההדוק פוקק את התעלה':'ממנטין פוקק את התעלה הפתוחה',tight?'החוסם ההדוק נשאר: האות אובד':'ממנטין יוצא: האות עובר',tight?'חוסם הדוק: גם הרעש וגם האות נעלמו':'הדליפה הושקטה, האות נשמר'][ph];
    s+=`<text x="${L.lab.x}" y="${L.lab.y}" class="t-lbl t-mid">${cap}</text>`;
    s+=`<text x="${cx}" y="${L.inY+20}" class="t-xs t-mid">מתח: ${V(t)>.4?'דפולריזציה':'קרוב למנוחה'}</text>`;
    /* traces */
    const T=L.tr,tw=T.x1-T.x0;
    const trace=(fn,y0,y1,col,name)=>{let g=`<text x="${T.x0}" y="${y0-8}" class="t-sm">${name}</text><path d="M${T.x0} ${y0} V${y1} H${T.x1}" class="axis" style="fill:none"/>`;
      [.14,.31,.53,.74].forEach(u=>{g+=`<path d="M${f1(T.x0+u*tw)} ${y0} V${y1}" class="grid"/>`});
      g+=`<path d="${pathFn(u=>1-fn(u*t)*.9,T.x0,T.x0+t*tw,y0,y1,160)}" style="fill:none;stroke:${col};stroke-width:2.2"/>`;
      return g};
    s+=trace(V,T.v0,T.v1,'var(--ink)','מתח הקרום');
    s+=trace(Ca,T.c0,T.c1,'var(--amber)','כניסת סידן');
    const lbs=[ ['מנוחה',0],['אות',.14],['דליפה',.31],[tight?'חוסם':'ממנטין',.53],['אות',.74]];
    lbs.forEach(([l,u])=>{s+=`<text x="${f1(T.x0+u*tw+3)}" y="${T.c1+14}" class="t-xs">${l}</text>`});
    nm.innerHTML=s;
    $('#syNmNote').innerHTML=noteHTML(tight&&ph>=4?{k:'ניסוי מחשבתי',t:'חוסם שלעולם אינו משתחרר',txt:`חוסם שנקשר באופן הדוק היה משתיק גם את הדליפה וגם את האות האמיתי. זו ההשוואה שמציגים מפתחי התרופה: העוצמה המתונה של ממנטין והקינטיקה המהירה והתלויה במתח שלו מוצגות כסיבה לכך שהוא משאיר את האיתות הרגיל שלם ברובו ונסבל היטב. [[Parsons1999,Lipton2006]] לא מוצגת כאן תרופה מסוימת.`,pt:`אילו הפקק לא היה יוצא לעולם, גם המסר האמיתי היה נחסם.`}:SY_NM[ph]);
    setNm(ph);
  }
  const stopNm=playWire(nr,$('#syNmPlay'),drawNm,15000,'הפעלה חוזרת','synapse');
  const setNm=stepWire($('#syNmSteps'),SY_NM,nr,drawNm,stopNm);
  $('#syNmMem').onclick=()=>{tight=false;$('#syNmMem').setAttribute('aria-pressed',true);$('#syNmTight').setAttribute('aria-pressed',false);drawNm(+nr.value)};
  $('#syNmTight').onclick=()=>{tight=true;$('#syNmMem').setAttribute('aria-pressed',false);$('#syNmTight').setAttribute('aria-pressed',true);drawNm(+nr.value)};

  /* ---------- 3. benefit in context ---------- */
  const bs=$('#syBen'),br=$('#syBenT');let view=0;
  const ROWS=[
   {n:'⁧דונפזיל 10 mg⁩',m:'⁧ADAS-Cog, 0 עד 70, נמוך יותר עדיף⁩',v:2.67,lo:2.02,hi:3.31,max:70,txt:'−2.67'},
   {n:'⁧דונפזיל 10 mg⁩',m:'MMSE, 0–30',v:1.05,lo:.73,hi:1.37,max:30,mcid:1.4,txt:'+1.05'},
   {n:'ריבסטיגמין',m:'ADAS-Cog, 0–70',v:1.79,lo:1.37,hi:2.21,max:70,txt:'−1.79'},
   {n:'⁧גלנטמין 24 mg⁩',m:'ADAS-Cog, 0–70',v:3.1,lo:2.6,hi:3.7,max:70,txt:'⁧כ־‎−3.1⁩'},
   {n:'ממנטין, בינוני עד חמור',m:'SIB, 0–100',v:3.11,max:100,txt:'+3.11'},
   {n:'ממנטין, קל',m:'ADAS-Cog, 0–70',v:.21,lo:-.95,hi:1.38,max:70,txt:'⁧0.21: אין⁩'}
  ];
  const SE=[
   {n:'דונפזיל',e:'בחילה',d:11,p:6},{n:'דונפזיל',e:'שלשול',d:10,p:5},
   {n:'ריבסטיגמין, דרך הפה',e:'בחילה',d:47,p:12},{n:'ריבסטיגמין, דרך הפה',e:'הקאות',d:31,p:6},
   {n:'⁧ריבסטיגמין, מדבקה*⁩',e:'בחילה',d:7.2,p:5.0},{n:'⁧ריבסטיגמין, מדבקה*⁩',e:'הקאות',d:6.2,p:3.3},
   {n:'גלנטמין',e:'בחילה',d:20.7,p:5.5},{n:'גלנטמין',e:'הקאות',d:10.5,p:2.3},
   {n:'ממנטין',e:'סחרחורת',d:7,p:5},{n:'ממנטין',e:'כאב ראש',d:6,p:3}
  ];
  function drawBen(t){
    const N=vb(bs,'720 420','400 '+[640,740,580][view]);
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    if(view===0){
      const rowH=N?82:52,y0=N?40:44,tx0=N?20:262,tx1=N?380:620;
      s+=`<text x="${N?20:20}" y="${N?22:24}" class="t-sm">ההבדל הממוצע בין התרופה לפלצבו, על פני כל סולם במלואו</text>`;
      ROWS.forEach((r,i)=>{const p=ease(ramp(t,i*.12,i*.12+.2));const y=y0+i*rowH+(N?40:18);
        const X=v=>tx0+(tx1-tx0)*(v/r.max);
        const o=f1(ramp(t,i*.12,i*.12+.06));
        s+=`<g style="opacity:${o}">`;
        if(N){s+=`<text x="${tx0}" y="${y-28}" class="t-lbl">${r.n}</text><text x="${tx1}" y="${y-28}" class="t-lbl t-end" style="fill:${r.v<.5?'var(--muted)':'var(--sky)'}">${r.txt}</text><text x="${tx0}" y="${y-12}" class="t-xs">${r.m}</text>`}
        else{s+=`<text x="20" y="${y-2}" class="t-lbl">${r.n}</text><text x="20" y="${y+12}" class="t-xs">${r.m}</text><text x="${tx1+10}" y="${y+5}" class="t-lbl" style="fill:${r.v<.5?'var(--muted)':'var(--sky)'}">${r.txt}</text>`}
        s+=`<rect x="${tx0}" y="${y}" width="${tx1-tx0}" height="10" rx="5" style="fill:var(--panel-2);stroke:var(--line)"/>`;
        s+=`<rect x="${tx0}" y="${y}" width="${f1(Math.max(2,(X(r.v)-tx0)*p))}" height="10" rx="5" style="fill:var(--sky)"/>`;
        if(r.lo!=null&&p>.9){const a=Math.max(tx0,X(r.lo)),b=X(r.hi);s+=`<path d="M${f1(a)} ${y-4} H${f1(b)} M${f1(a)} ${y-7} v6 M${f1(b)} ${y-7} v6" style="stroke:var(--ink);stroke-width:1.3"/>`}
        if(r.mcid&&p>.9){const m=X(r.mcid);s+=`<path d="M${f1(m)} ${y-6} V${y+16}" style="stroke:var(--warn);stroke-width:2"/><text x="${f1(m+4)}" y="${y+24}" class="t-xs" style="fill:var(--warn)">${N?'MCID 1.4':'⁧שינוי חשוב: 1.4 (DOMINO)⁩'}</text>`}
        s+=`<text x="${tx1}" y="${y+24}" class="t-xs t-end">${r.max}</text><text x="${tx0}" y="${y+24}" class="t-xs">0</text></g>`});
      /* global impression odds ratio */
      const gy=y0+6*rowH+(N?30:22),p=ease(ramp(t,.74,.95));
      if(t>.72){const lx=v=>(N?20:262)+((N?360:358))*(Math.log(v/.5)/Math.log(8));const xa=N?20:262,xb=N?380:620;
        s+=`<g style="opacity:${f1(ramp(t,.72,.78))}">`;
        if(N)s+=`<text x="20" y="${gy-4}" class="t-lbl">דונפזיל: רושם כללי</text><text x="380" y="${gy-4}" class="t-lbl t-end" style="fill:var(--sky)">OR 1.92</text>`;
        else s+=`<text x="20" y="${gy+8}" class="t-lbl">דונפזיל: הרושם הכללי</text><text x="20" y="${gy+22}" class="t-lbl">של הקלינאי</text><text x="${xb+10}" y="${gy+18}" class="t-lbl" style="fill:var(--sky)">OR 1.92</text>`;
        const yy=gy+(N?34:14);
        s+=`<path d="M${xa} ${yy} H${xb}" class="axis" style="fill:none"/>`;
        [.5,1,2,4].forEach(v=>{s+=`<path d="M${f1(lx(v))} ${yy-4} v8" class="axis" style="fill:none"/><text x="${f1(lx(v))}" y="${yy+16}" class="t-xs t-mid">${v}</text>`});
        s+=`<path d="M${f1(lx(1))} ${yy-12} V${yy+6}" style="stroke:var(--muted);stroke-dasharray:3 3"/>`;
        const est=lerp(1,1.92,p);s+=`<path d="M${f1(lx(lerp(1,1.54,p)))} ${yy} H${f1(lx(lerp(1,2.39,p)))}" style="stroke:var(--sky);stroke-width:2.4"/><rect x="${f1(lx(est)-5)}" y="${yy-5}" width="10" height="10" style="fill:var(--sky)"/>`;
        s+=`<text x="${f1(lx(1)-4)}" y="${yy-14}" class="t-xs t-end">אין הבדל</text><text x="${f1(lx(1.92))}" y="${yy-14}" class="t-xs t-mid">סיכויי שיפור</text></g>`}
    }else if(view===1){
      const rowH=N?62:32,y0=N?56:58,bx0=N?20:250,bx1=N?330:630,sc=v=>(bx1-bx0)*v/50;
      s+=`<text x="20" y="24" class="t-sm">${N?'⁧שיעורים לפי העלונים, % מהאנשים⁩':'⁧תופעות לוואי בניסויים מבוקרי פלצבו, % מהאנשים⁩'}</text>`;
      s+=`<rect x="20" y="34" width="14" height="8" style="fill:var(--rose)"/><text x="40" y="42" class="t-xs">תרופה</text><rect x="${N?90:96}" y="34" width="14" height="8" style="fill:var(--panel);stroke:var(--muted)"/><text x="${N?110:116}" y="42" class="t-xs">פלצבו</text>`;
      [0,10,20,30,40,50].forEach(v=>{s+=`<path d="M${f1(bx0+sc(v))} ${y0-4} V${y0+SE.length*rowH-8}" class="grid"/><text x="${f1(bx0+sc(v))}" y="${y0+SE.length*rowH+6}" class="t-xs t-mid">${v}%</text>`});
      SE.forEach((r,i)=>{const p=ease(ramp(t,i*.07,i*.07+.25)),y=y0+i*rowH+(N?22:0);
        if(N)s+=`<text x="20" y="${y-6}" class="t-lbl">⁧${r.n} · ${r.e}⁩</text>`;
        else s+=`<text x="${bx0-10}" y="${y+12}" class="t-lbl t-end">${r.n}</text><text x="${bx0-10}" y="${y+24}" class="t-xs t-end">${r.e}</text>`;
        s+=`<rect x="${bx0}" y="${y}" width="${f1(Math.max(1,sc(r.d)*p))}" height="12" rx="3" style="fill:var(--rose)"/>`;
        s+=`<rect x="${bx0}" y="${y+14}" width="${f1(Math.max(1,sc(r.p)*p))}" height="9" rx="3" style="fill:var(--panel);stroke:var(--muted)"/>`;
        if(p>.6)s+=`<text x="${f1(bx0+sc(r.d)+6)}" y="${y+10}" class="t-xs" style="fill:var(--ink)">${r.d}%</text><text x="${f1(bx0+sc(r.p)+6)}" y="${y+22}" class="t-xs">${r.p}%</text>`});
      s+=`<text x="20" y="${y0+SE.length*rowH+(N?28:24)}" class="t-xs">${N?'⁧*מדבקה 9.5 mg/24 h, ניסוי IDEAL⁩':'⁧*מדבקה 9.5 mg/24 h, מניסוי IDEAL; כמוסות באותו ניסוי: בחילה 23.1%, הקאות 17.0%.⁩'}</text>`;
      if(N)s+=`<text x="20" y="${y0+SE.length*rowH+44}" class="t-xs">⁧כמוסות ב־IDEAL: בחילה 23.1%, הקאות 17.0%⁩</text>`;
    }else{
      const lx0=N?20:262,lx1=N?380:630,y0=N?40:50,rowH=N?120:84;
      s+=`<text x="20" y="${N?22:26}" class="t-sm">${N?'⁧DOMINO: המשך מול הפסקה⁩':'⁧DOMINO: המשך מול הפסקה של דונפזיל (שלב בינוני עד חמור)⁩'}</text>`;
      const lg=(v,a,b)=>lx0+(lx1-lx0)*Math.log(v/a)/Math.log(b/a);
      const rows=[
       {n:'⁧מעבר למוסד סיעודי, שנה 1⁩',m:'יחס סיכונים, הפסקה מול המשך',est:2.09,lo:1.29,hi:3.39,sc:'log',a:.5,b:4,tick:[.5,1,2,4],ref:1,lab:'HR 2.09',refL:'אין הבדל'},
       {n:'⁧מעבר למוסד סיעודי, שנים 2 עד 4⁩',m:'⁧יחס סיכונים (הרווח אינו מוצג)⁩',est:.89,sc:'log',a:.5,b:4,tick:[.5,1,2,4],ref:1,lab:'HR 0.89'},
       {n:'⁧SMMSE, 52 שבועות⁩',m:'נקודות לטובת המשך הטיפול',est:1.9,lo:1.3,hi:2.5,sc:'lin',a:0,b:4,tick:[0,1,2,3,4],ref:1.4,refL:'MCID 1.4',lab:'+1.9'},
       {n:'⁧BADLS, 52 שבועות⁩',m:'⁧נקודות פחות פגיעה, לטובת המשך הטיפול⁩',est:3.0,lo:1.8,hi:4.3,sc:'lin',a:0,b:6,tick:[0,2,4,6],ref:3.5,refL:'MCID 3.5',lab:'3.0'}
      ];
      rows.forEach((r,i)=>{const p=ease(ramp(t,i*.2,i*.2+.25)),y=y0+i*rowH+(N?64:30);
        const X=v=>r.sc==='log'?lg(v,r.a,r.b):lx0+(lx1-lx0)*(v-r.a)/(r.b-r.a);
        s+=`<g style="opacity:${f1(ramp(t,i*.2,i*.2+.06))}">`;
        if(N)s+=`<text x="20" y="${y-50}" class="t-lbl">${r.n}</text><text x="20" y="${y-36}" class="t-xs">${r.m}</text>`;
        else s+=`<text x="20" y="${y-4}" class="t-lbl">${r.n}</text><text x="20" y="${y+10}" class="t-xs">${r.m}</text>`;
        s+=`<path d="M${lx0} ${y} H${lx1}" class="axis" style="fill:none"/>`;
        r.tick.forEach(v=>{s+=`<path d="M${f1(X(v))} ${y-3} v6" class="axis" style="fill:none"/><text x="${f1(X(v))}" y="${y+16}" class="t-xs t-mid">${v}</text>`});
        const rx=X(r.ref);s+=`<path d="M${f1(rx)} ${y-16} V${y+4}" style="stroke:${r.sc==='log'?'var(--muted)':'var(--warn)'};stroke-width:1.6;stroke-dasharray:3 3"/>`;
        if(r.refL)s+=`<text x="${f1(rx+4)}" y="${y-18}" class="t-xs" style="fill:${r.sc==='log'?'var(--muted)':'var(--warn)'}">${r.refL}</text>`;
        const start=r.sc==='log'?1:0,e=lerp(start,r.est,p);
        if(r.lo!=null&&p>.5){const q=ramp(p,.5,1);s+=`<path d="M${f1(X(lerp(r.est,r.lo,q)))} ${y-6} H${f1(X(lerp(r.est,r.hi,q)))}" style="stroke:var(--sky);stroke-width:2.4"/>`}
        s+=`<circle cx="${f1(X(e))}" cy="${y-6}" r="6" style="fill:var(--sky)"/>`;
        if(p>.8)s+=N?`<text x="380" y="${y-50}" class="t-lbl t-end" style="fill:var(--sky)">${r.lab}</text>`:`<text x="${lx1+12}" y="${y-2}" class="t-lbl" style="fill:var(--sky)">${r.lab}</text>`;
        s+='</g>'});
      const fy=y0+4*rowH+(N?20:18);
      if(t>.85)s+=`<text x="20" y="${fy}" class="t-xs" style="opacity:${f1(ramp(t,.85,.92))}">${N?'⁧במשך 4 שנים, 55% עברו למוסד סיעודי.⁩':'⁧במשך 4 שנים, 55% מכלל המשתתפים עברו למוסד סיעודי.⁩'}</text>`;
    }
    bs.innerHTML=s;
    $('#syBenNote').innerHTML=noteHTML(SY_BEN[view]);
    $('#syBenCap').textContent=['הבדלים ממוצעים, תרופה מול פלצבו. הקווים הם רווחי סמך 95%. העמודות מתחילות באפס בכל סולם.','אחוז האנשים שדיווחו על כל תופעה בניסויים מבוקרי פלצבו, כפי שמפורט בעלונים בארצות הברית; שורות המדבקה לקוחות מניסוי IDEAL.','הנקודות הן אומדנים; הקווים הם רווחי סמך 95%. MCID = ההבדל המזערי החשוב קלינית, כפי שנקבע ב־DOMINO.'][view];
    br.setAttribute('aria-valuetext',['גודלי השפעה','תופעות לוואי','הפסקה'][view]+', '+Math.round(t*100)+'% נחשף');
  }
  const stopBen=playWire(br,$('#syBenPlay'),drawBen,9000,'הפעלה חוזרת','synapse');
  $$('[data-syb]').forEach(b=>b.addEventListener('click',()=>{view=+b.dataset.syb;$$('[data-syb]').forEach(x=>x.setAttribute('aria-pressed',x===b));stopBen();br.value=0;drawBen(0);$('#syBenPlay').click()}));

  $('#syCards').innerHTML=`
   <div class="card"><span class="ev est">מבוסס</span><h4>טיפול תסמיני, לא משנה מחלה</h4><p>העלונים של המעכבים ושל ממנטין מציינים שאין ראיות לכך שהתרופות משנות את מהלך המחלה. לדונפזיל לא הייתה השפעה ברורה על ההתנהגות (NPI ‎−1.62, רווח סמך 95%: ‎−3.43 עד 0.19) או על איכות החיים, ורק ניסוי קטן אחד נמשך 52 שבועות. [[FDAExelonPatch2024,FDAGalantamineER2025,FDAMemantineER2026,Birks2018]]</p></div>
   <div class="card"><span class="ev early">שנוי במחלוקת</span><h4>אבן יסוד, או תועלת קטנה?</h4><p>סקירה משנת 2018 מכנה את התרופות הכולינרגיות אבן היסוד של הטיפול התרופתי באלצהיימר, וצופה שישולבו עם תרופות משנות מחלה. מחברי Cochrane מתארים את התועלת שלהן כקטנה ובעלת חשיבות קלינית לא ודאית. כל מחקרי הריבסטיגמין שאפשר היה להשתמש בהם מומנו על ידי התעשייה. [[Hampel2018,Birks2015]]</p></div>
   <div class="card"><h4>אי אפשר להשוות לנוגדנים</h4><p>ניסויי המעכבים כללו אנשים עם דמנציה מבוססת, למשך 6 חודשים או פחות, ומדדו עלייה בציונים. ניסויי לקנמאב (Leqembi) ודונאנמאב (Kisunla) כללו אנשים עם MCI או דמנציה קלה, למשך כ־18 חודשים, ומדדו האטה בהידרדרות בסולם CDR-SB (0.45 וכ־0.7 נקודות). מספרים בגודל דומה עונים על שאלות שונות. [[Birks2018,vanDyck2023,Sims2023]] ראו <a href="#antibody" data-go="antibody">נוגדנים נגד עמילואיד לאורך זמן</a>.</p></div>
   <div class="card"><span class="ev early">תוצאות מעורבות</span><h4>הוספת ממנטין לדונפזיל</h4><p>Tariot 2004 מצא תועלת בהוספת ממנטין אצל אנשים שכבר נטלו דונפזיל. ניסוי DOMINO מצא שהשילוב אינו טוב יותר מדונפזיל לבדו. סקירת Cochrane מצאה שממנטין פועל בין אם משתמשים במעכב כולינאסטראז ובין אם לא. [[Tariot2004,Howard2012,McShane2019]]</p></div>
   <div class="card"><span class="ev est">מבוסס</span><h4>קצב הלב ומפל מרשמים</h4><p>באונטריו, אצל אנשים שנטלו מעכבים היו יותר ברדיקרדיה (HR 1.69), קוצבי לב (HR 1.49) ושברים בירך (HR 1.18). אנשים שהתחילו ליטול מעכב קיבלו בסבירות גבוהה יותר תרופה אנטיכולינרגית לשלפוחית השתן בהמשך (4.5% לעומת 3.1%), תרופה שפועלת נגדו. [[Gill2009,Gill2005]] ראו <a href="#bpsd" data-go="bpsd">מעבר לזיכרון</a>.</p></div>
   <div class="card"><h4>בקצרה</h4><div class="pt"><b>במילים פשוטות</b>בממוצע, התרופות האלה יכולות להקל מעט ולזמן מה על תסמיני הזיכרון והחשיבה. הן אינן עוצרות את המחלה. קלקול קיבה שכיח בזמן העלאת המינון, ובניסוי אחד נמצא שהפסקת הטיפול בשלב מאוחר לוותה בהידרדרות מהירה יותר. ההחלטות על התחלה או הפסקה מתקבלות עם הרופא המטפל.</div></div>`;
  draw(+rg.value);drawNm(+nr.value);drawBen(+br.value);
};
