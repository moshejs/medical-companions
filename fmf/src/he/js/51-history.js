/* =============== 5.1 history & people =============== */
const HI_LANES=[['קליניקה ושמות','var(--terra)'],['טיפול','var(--crocus)'],['גנים','var(--sea)'],['מנגנון','var(--gold)'],['קריטריונים והנחיות','var(--good)']];
const HI_EV=[
 {y:1908,l:0,c:'⁧"תסמונת התקפית לא שגרתית"⁩',h:'ג׳ניוויי ומוזנטל: תסמונת התקפית',t:'1908 · תיאור ראשון?',
  txt:`ג׳ניוויי ומוזנטל (Janeway, Mosenthal) תיארו "תסמונת התקפית לא שגרתית, כנראה קרובה להקאות חוזרות" אצל נערה יהודייה צעירה עם התקפי חום קצרים וכאבי בטן. התיאור מצוטט לעתים קרובות כראשון, אף שלא בטוח שמדובר ב־FMF. [[Janeway1908,Adwan2015]]`},
 {y:1945,l:0,c:'⁧"דלקת צפק התקפית שפירה"⁩',h:'⁧סיגל: "דלקת צפק התקפית שפירה"⁩',t:'1945 ו־1949 · דלקת צפק התקפית שפירה',
  txt:`שפרד סיגל (Sheppard Siegal), רופא מניו יורק, דיווח על 10 מקרים בשם "דלקת צפק התקפית שפירה" (benign paroxysmal peritonitis). תיאור זה נחשב בדרך כלל לתיאור המדויק הראשון. סדרה שנייה פורסמה ב־1949. [[Siegal1945,Siegal1949,Adwan2015]]`,
  pt:'הרופא הראשון שתיאר את המחלה בבירור כינה אותה דלקת לא מזיקה וחוזרת של קרום הבטן.',
  hook:'סיגל כינה אותה <b>שפירה</b>. הקשר שהתגלה מאוחר יותר למחלת כליות ולעמילואידוזיס הראה שאינה כזו.'},
 {y:1948,l:0,c:'⁧"המחלה המחזורית"⁩',h:'⁧ריימן: "המחלה המחזורית"⁩',t:'1948 · המחלה המחזורית',
  txt:`הובארט ריימן (Hobart Reimann), שעבד אז באוניברסיטה האמריקאית בביירות, קיבץ חום חוזר, דלקת הצפק, נויטרופניה מחזורית וכאבי פרקים לסירוגין תחת השם "המחלה המחזורית" (periodic disease), והדגיש את המחזוריות הסדירה שלהם. למעשה, התקפי FMF אינם סדירים. [[Reimann1948,Adwan2015,BenChetrit2019]]`},
 {y:1951.5,l:0,c:'קשר למחלת כליות',h:'קאטן ומאמו: הקשר לכליות',t:'1951–52 · הקשר לכליות',
  txt:`הרופאים הצרפתים קאטן ומאמו (Cattan, Mamou) הצביעו על הקשר למחלת כליות. עמילואידוזיס דווח כ־7 שנים מאוחר יותר על ידי טוקאן (Tuqan) בביירות. שני הדיווחים מוכרים כאן דרך סקירה היסטורית מאוחרת ולא מהמקורות עצמם, ולכן התאריכים והפרטים לא אומתו באופן עצמאי. [[Adwan2015]]`},
 {y:1958,l:0,c:'השם: קדחת ים תיכונית משפחתית',h:'⁧הלר, סוהר ושרף קוראים לה FMF⁩',t:'1958 · "קדחת ים תיכונית משפחתית"',
  txt:`בתל השומר שבישראל נתנו הלר, סוהר ושרף למחלה את השם קדחת ים תיכונית משפחתית (familial Mediterranean fever) והדגישו את אופייה הגנטי. יש מקורות שמתארכים את השם למאמר מוקדם יותר בעברית (לא אומת). [[Heller1958,Adwan2015]]`,
  hook:'השם מכיל שתי עובדות: המחלה עוברת <b>במשפחות</b>, והיא מרוכזת סביב <b>הים התיכון</b>.'},
 {y:1967,l:0,c:'סקר של 470 מטופלים',h:'סוהר ועמיתיו: סקר של 470 מטופלים',t:'1967 · הסקר של תל השומר',
  txt:`סוהר, גפני, פרס והלר פרסמו סקר של 470 מטופלים יחד עם סקירת ספרות. הוא הפך לבסיס של הקריטריונים הקליניים של תל השומר ושל התיאורים המקובלים של גיל ההופעה ושל מאפייני ההתקפים. [[Sohar1967]] <a href="#dx" data-go="dx">לקריטריונים</a>`},
 {y:1972,l:1,c:'קולכיצין מונע התקפים',h:'גולדפינגר: קולכיצין מונע התקפים',t:'1972 · קולכיצין',
  txt:`המכתב של גולדפינגר (Goldfinger) ב־<i>New England Journal of Medicine</i> דיווח על קולכיצין כטיפול מונע להתקפי FMF. הוא הפך מחלה שהייתה קטלנית לעתים קרובות, קטלנית בגלל עמילואידוזיס, למחלה שאפשר לטפל בה. [[Goldfinger1972,Pras1998]]`,
  pt:'התברר שכדור יומי מונע את ההתקפים. זה שינה הכול.',
  hook:`לפני הקולכיצין, יותר ממחצית החולים ב־FMF מתו מעמילואידוזיס. [[Tufan2020]]`},
 {y:1974,l:1,c:'ניסויים מבוקרים מאשרים',h:'ניסויים מבוקרים מאשרים את הקולכיצין',t:'1974 · הניסויים',
  txt:`ניסויים מבוקרים ב־1974 אישרו שקולכיצין יומי מונע התקפים: ניסוי של זמר ועמיתיו בתל השומר וניסוי כפול־סמיות של ה־NIH שערכו דינרלו (Dinarello) ועמיתיו, שניהם באותו גיליון של <i>NEJM</i>, ובנוסף מחקר כפול־סמיות של גולדשטיין ושוואבה (Goldstein, Schwabe). [[Zemer1974,Dinarello1974,Goldstein1974]]`},
 {y:1986,l:1,c:'⁧חלבון בשתן 1.7% מול 48.9%⁩',h:'זמר: קולכיצין מונע עמילואידוזיס',t:'1986 · מניעת עמילואידוזיס',
  txt:`זמר ועמיתיו עקבו אחרי 1,070 מטופלים במשך 4–11 שנים. אצל מטופלים עם היענות לטיפול שלא היה להם עמילואידוזיס בתחילת המעקב, השכיחות המצטברת של חלבון בשתן (פרוטאינוריה) הייתה 1.7% אחרי 11 שנים, לעומת 48.9% אחרי 9 שנים אצל מטופלים ללא היענות לטיפול. קולכיצין גם ייצב מחלת כליות בשלב מוקדם. [[Zemer1986]]`,
  hook:'התפקיד החשוב ביותר של קולכיצין הוא מניעת <b>עמילואידוזיס</b>, כפי שהראה זמר ב־1986.'},
 {y:1992,l:2,c:'⁧הגן מופה לכרומוזום 16p⁩',h:'⁧פרס ועמיתיו: הגן ממופה ל־16p⁩',t:'1992 · מיפוי הגן',
  txt:`פרס, אקסנטייביץ׳ (Aksentijevich), קסטנר (Kastner) ועמיתיהם ב־NIH ובתל השומר מיפו את הגן של FMF לזרוע הקצרה של כרומוזום 16 בעזרת ניתוח תאחיזה (linkage) ב־27 משפחות יהודיות לא־אשכנזיות, עם ציון LOD מרבי של 19.86. [[Pras1992]]`},
 {y:1997,l:2,c:'⁧MEFV שובט · פירין / מרנוסטרין⁩',h:'⁧שיבוט MEFV: פירין ומרנוסטרין⁩',t:'1997 · שני צוותים, גן אחד',
  txt:`שני קונסורציומים שיבטו את <i>MEFV</i> באופן בלתי תלוי, באזור 16p13.3. הקונסורציום הצרפתי ל־FMF קרא לחלבון מרנוסטרין (marenostrin), מ־<i>mare nostrum</i>, "הים שלנו". הקונסורציום הבינלאומי ל־FMF קרא לו פירין, מצא תעתיק שמיוצר כמעט רק בגרנולוציטים, ומצא הפלוטיפים קדומים המשותפים לאוכלוסיות שונות. [[FrenchFMF1997,IntFMF1997,Adwan2015]]`,
  pt:'באותה שנה מצאו שני צוותים את הגן ונתנו לחלבון שלו שני שמות שונים.'},
 {y:1997.6,l:4,c:'פרסום קריטריוני ליבנה',h:'פרסום קריטריוני ליבנה',t:'1997 · קריטריוני ליבנה',
  txt:`ליבנה ועמיתיו בתל השומר פרסמו קריטריונים אבחנתיים עם רגישות של יותר מ־95% וסגוליות של יותר מ־97% ב־105 מטופלים ו־106 נבדקי ביקורת. [[Livneh1997]] <a href="#dx" data-go="dx">נסו אותם</a>`},
 {y:2003,l:2,c:'⁧מאגר הווריאנטים INFEVERS⁩',h:'⁧מאגר הווריאנטים INFEVERS⁩',t:'2003 · INFEVERS',
  txt:`מאגר INFEVERS של מוטציות במחלות דלקתיות תורשתיות הוקם במונפלייה ותואר ב־2003. הוא התרחב למאגר של גנים רבים; ב־2026 נרשמו בו 412 וריאנטים ברצף של <i>MEFV</i>. [[SarrausteDeMenthiere2003,Milhavet2008,Infevers2026]]`},
 {y:2011,l:3,c:'⁧עכברים: וריאנטי FMF מגבירים פעילות⁩',h:'⁧צ׳ה: עכברי knock-in מראים רווח בתפקוד⁩',t:'2011 · רווח בתפקוד בעכברים',
  txt:`עכברים שנשאו מקטעי B30.2 אנושיים עם וריאנטי FMF פיתחו דלקת קשה שהונעה על ידי IL-1β, שהייתה תלויה ב־ASC אך לא ב־NLRP3, ואילו עכברים חסרי פירין (knockout) היו בריאים. וריאנטי FMF הופכים את הפירין לפעיל יותר, לא פחות. [[Chae2011]]`},
 {y:2014,l:3,c:'⁧פירין חש בשינוי של Rho⁩',h:'⁧שו: פירין חש בשינוי של Rho⁩',t:'2014 · במה פירין חש',
  txt:`שו (Xu) ועמיתיו במעבדה של פנג שאו (Feng Shao) בבייג׳ינג הראו שפירין מרכיב אינפלמזום של caspase-1 כאשר רעלנים חיידקיים משביתים חלבוני Rho GTPase, למשל הרעלן TcdB של <i>C. difficile</i>. פירין שומר על מתג בתא, ולא מזהה את החיידק עצמו. [[Xu2014]] <a href="#mech" data-go="mech">לצפייה בהנפשה</a>`,
  hook:'פירין הוא <b>שומר</b> של פעילות RhoA, ולא חיישן ישיר של חיידקים (שו 2014).'},
 {y:2016,l:3,c:'⁧RhoA–PKN–14-3-3 מכבים את הפירין⁩',h:'⁧פארק: RhoA–PKN–14-3-3 מכבים את הפירין⁩',t:'2016 · מתג הכיבוי',
  txt:`פארק (Park), ווד (Wood), קסטנר (Kastner) וצ׳ה (Chae) הראו ש־RhoA פעיל שומר על הפירין כבוי. הקינאזות PKN1/PKN2, שמופעלות על ידי RhoA, מזרחנות את הפירין, וזה נקשר לחלבוני 14-3-3 מעכבים. פגם בפרנילציה בחסר מבלונט קינאז משבית את RhoA, וזה מקשר בין FMF לבין HIDS. השאלה אם וריאנטי FMF עצמם מחלישים את הבלם הזה עדיין פתוחה: פארק דיווח על קישור מופחת מאוד של PKN ושל 14-3-3 לפירין המוטנטי, ואילו מאסטרס (Masters) ועמיתיו מצאו שווריאנטי B30.2 של FMF הותירו את זרחון הפירין ואת הקישור ל־14-3-3 כמעט ללא שינוי. [[Park2016,Masters2016]]`},
 {y:2016.5,l:4,c:'⁧EULAR: קולכיצין לכל החיים⁩',h:'⁧המלצות EULAR ל־FMF⁩',t:'2016 · המלצות EULAR',
  txt:`המלצות EULAR מ־2016 הפכו קולכיצין לכל החיים לעוגן הטיפול, והציעו שהתקף אחד או יותר בחודש, למרות המינון המרבי הנסבל במשך 6 חודשים לפחות, עשוי להצביע על עמידות לקולכיצין. את מקומן תפס עדכון EULAR/PReS 2024, שמשאיר את הקולכיצין כקו הטיפול הראשון. [[Ozen2016,Ozen2025]]`},
 {y:2018,l:1,c:'⁧CLUSTER: תגובה 61% מול 6%⁩',h:'⁧CLUSTER: ניסוי קנאקינומאב⁩',t:'2018 · CLUSTER',
  txt:`בניסוי CLUSTER בשלב III, ב־FMF עמידה לקולכיצין, ל־61% מהמטופלים שקיבלו קנאקינומאב הייתה תגובה מלאה בשבוע 16, לעומת 6% מאלה שקיבלו פלצבו. [[DeBenedetti2018]] <a href="#ladder" data-go="ladder">סולם הטיפול</a>`},
 {y:2019,l:4,c:'⁧קריטריוני Eurofever/PRINTO⁩',h:'⁧קריטריוני הסיווג Eurofever/PRINTO⁩',t:'2019 · Eurofever/PRINTO',
  txt:`קריטריוני סיווג לקדחות חוזרות שילבו את הגנוטיפ של <i>MEFV</i> עם פריטים קליניים, והוסיפו מערכת קריטריונים קלינית בלבד ל־FMF. בתיקוף, מערכת הגנוטיפ + קליניקה הגיעה לרגישות 0.89 ולסגוליות 1.00. [[Gattorno2019]] <a href="#dx" data-go="dx">נסו את המחשבון</a>`},
 {y:2020,l:2,c:'⁧סימנים לברירה מאוחרת (ראשוני)⁩',h:'פארק: ברירה בידי מגפת הדבר?',t:'2020 · יתרון הישרדותי?',
  txt:`<span class="ev early">ראיות ראשוניות</span> פארק (Park) ועמיתיו מצאו סימנים לברירה חיובית חזקה ומאוחרת יחסית סביב M694V ו־V726A. פירין עם וריאנט FMF נקשר בזיקה חלשה יותר לחלבון האפקטור של חיידק הדבר, YopM, ולכן התאים משחררים יותר IL-1β, ועכברי knock-in שרדו טוב יותר הדבקה ב־<i>Yersinia pestis</i>. הקשר למגפות הדבר ההיסטוריות מתואר כמתיישב עם הנתונים, לא כמוכח. [[Park2020]]`},
 {y:2025,l:4,c:'⁧פרסום עדכון EULAR/PReS⁩',h:'⁧פרסום עדכון EULAR/PReS 2024⁩',t:'2025 · עדכון EULAR/PReS 2024',
  txt:`העדכון, שפורסם ב־2025, משאיר במרכז את הקולכיצין לכל החיים ואת ההיענות לטיפול, הופך שליטה מלאה בדלקת תת־קלינית ליעד מפורש, ומייחס לחסימת IL-1 את הראיות החזקות ביותר כטיפול נוסף. [[Ozen2025,Cush2025]]`}
];
const HI_ERA=[{f:1900,a:1908,t:'תיאורים ראשונים'},{f:1958,a:1958,t:'שם למחלה'},{f:1972,a:1972,t:'קולכיצין'},{f:1992,a:1992,t:'הגן'},{f:2011,a:2014,t:'המנגנון'},{f:2016.5,a:2025,t:'ההנחיות היום'}];
const HI_NAMES=[['דלקת צפק מחזורית',null],['דלקת צפק התקפית שפירה',1945],['המחלה המחזורית',1948],['פוליסרוזיטיס חוזרת משפחתית',null],['המחלה הארמנית',null],['Maladie périodique (בצרפתית)',null],['מחלת סיגל–קאטן–מאמו',1951.5],['קדחת ים תיכונית משפחתית',1958]];
inits.history=()=>{
  const svg=$('#hiSvg'),rg=$('#hiT');
  /* The axis is stretched after 1940 and again after 1990. fx() is the fraction of the
     axis a year sits at, so the wide and narrow layouts share one mapping. */
  const fx=y=>y<=1940?lerp(0,.1,(y-1900)/40):y<=1990?lerp(.1,.5545,(y-1940)/50):lerp(.5545,1,(y-1990)/35);
  const fy=u=>u<=.1?1900+u/.1*40:u<=.5545?1940+(u-.1)/.4545*50:1990+(u-.5545)/.4455*35;
  const tOfY=y=>clamp(fx(y));
  let XA=150,XB=700;
  const xOf=y=>XA+(XB-XA)*fx(y);
  const steps=HI_ERA.map(E=>({from:E.f===1900?0:tOfY(E.f),at:Math.min(1,tOfY(E.a)+.004),t:E.t}));
  const eraOf=y=>{let e=0;HI_ERA.forEach((E,i)=>{if(y>=E.f)e=i});return e};
  /* tiny svg helpers so the scenes below stay readable */
  const T=(x,y,c,st,v)=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${v}</text>`;
  const RC=(x,y,w,h,st,r=4)=>`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="${r}" style="${st}"/>`;
  const LN=(x1,y1,x2,y2,st)=>`<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" style="${st}"/>`;
  const PANEL='fill:var(--panel);stroke:var(--line)';

  /* ---------- the scene: one drawing per era, both layouts ----------
     Every caption below repeats a milestone that is already in HI_EV with its
     citation; anything that could not be cited is drawn without a caption. */
  function ward(A,yr,N){let s='';                      // 1900–1957: a ward, and a chart with no settled name
    const fl=A.y+A.h-46;
    s+=LN(A.x+6,fl,A.x+A.w-6,fl,'stroke:var(--line);stroke-width:2');
    const wx=A.x+12,wy=A.y+14,ww=52,wh=44;
    s+=RC(wx,wy,ww,wh,'fill:var(--sea-soft);stroke:var(--line)',5)+LN(wx+ww/2,wy,wx+ww/2,wy+wh,'stroke:var(--line)')+LN(wx,wy+wh/2,wx+ww,wy+wh/2,'stroke:var(--line)');
    const bw=190,bh=66,bx=A.x+A.w-bw-10,by=A.y+10;
    s+=RC(bx,by,bw,bh,PANEL,8)+T(bx+10,by+16,'t-xs','','בגיליון החולה');
    const nm=yr<1908?['—','']:yr<1945?['⁧"תסמונת התקפית⁩','⁧לא שגרתית"⁩']:yr<1948?['⁧"דלקת צפק⁩','⁧התקפית שפירה"⁩']:['⁧"המחלה המחזורית"⁩',''];
    s+=T(bx+10,by+38,'t-sm','fill:var(--ink)',nm[0])+T(bx+10,by+54,'t-sm','fill:var(--ink)',nm[1]);
    if(yr>=1951.5){const kx=bx+34,ky=by+bh+40;
      s+=`<path d="M${kx} ${ky-19} a19 19 0 1 1 0 38 c5 -7 5 -12 5 -19 c0 -7 0 -12 -5 -19 z" style="fill:var(--terra-soft);stroke:var(--terra);stroke-width:1.6"/>`;
      s+=T(kx+28,ky+4,'t-xs','fill:var(--terra)','כליות');}
    const bW=110,gp=(A.w-20-bW*3)/2,b0=fl-26;
    for(let i=0;i<3;i++){const x=A.x+10+i*(bW+gp),hot=i===1&&yr>=1908;
      s+=RC(x,b0,bW,24,'fill:var(--panel-2);stroke:var(--line)',4)+RC(x+4,b0-10,24,12,PANEL,3);
      s+=`<path d="M${f1(x+30)} ${b0} q${f1((bW-34)/2)} -16 ${bW-34} 0 z" style="fill:${hot?'var(--terra-soft)':'var(--panel)'};stroke:var(--line)"/>`;
      s+=`<circle cx="${x+16}" cy="${b0-4}" r="7" style="fill:${hot?'var(--terra)':'var(--muted)'};opacity:${hot?.9:.45}"/>`;
      s+=LN(x+2,b0+24,x+2,b0+32,'stroke:var(--line);stroke-width:2')+LN(x+bW-2,b0+24,x+bW-2,b0+32,'stroke:var(--line);stroke-width:2');
      if(hot)for(let k=0;k<3;k++)s+=`<path d="M${x+42+k*14} ${b0-18} q4 -7 8 0" style="fill:none;stroke:var(--terra);stroke-width:1.4;opacity:.75"/>`}
    if(yr>=1908)s+=T(A.x+10,fl+30,'t-xs','','התקפי חום קצרים עם כאבי בטן, שחולפים מעצמם');
    return s}

  function bench(A,yr,N){let s='';                     // 1958–1971: Tel Hashomer, a microscope and a pedigree
    const mx=A.x+(N?40:54),my=A.y+24;
    s+=`<ellipse cx="${mx}" cy="${my+108}" rx="36" ry="9" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    s+=RC(mx-6,my+44,12,62,'fill:var(--panel-2);stroke:var(--line)',4);
    s+=`<path d="M${mx+6} ${my+54} q26 8 22 38" style="fill:none;stroke:var(--muted);stroke-width:5;stroke-linecap:round"/>`;
    s+=RC(mx+16,my+6,16,48,'fill:var(--panel);stroke:var(--muted);stroke-width:1.6',5)+RC(mx+13,my-6,22,12,'fill:var(--panel-2);stroke:var(--muted)',3);
    s+=RC(mx+18,my+54,12,10,'fill:var(--muted);opacity:.6',2)+RC(mx-18,my+66,56,8,'fill:var(--panel-2);stroke:var(--line)',2);
    s+=RC(mx+6,my+61,24,5,'fill:var(--sea-soft);stroke:var(--sea)',1);
    const px=A.x+(N?150:200),py=A.y+16;
    const sq=(x,y,f)=>RC(x,y,20,20,`fill:${f?'var(--terra)':'var(--panel)'};stroke:var(--ink);stroke-width:1.6`,2);
    const ci=(x,y,f)=>`<circle cx="${x+10}" cy="${y+10}" r="10" style="fill:${f?'var(--terra)':'var(--panel)'};stroke:var(--ink);stroke-width:1.6"/>`;
    s+=sq(px,py,0)+ci(px+70,py,0)+LN(px+20,py+10,px+70,py+10,'stroke:var(--ink)');
    s+=LN(px+45,py+10,px+45,py+42,'stroke:var(--ink)')+LN(px+10,py+42,px+80,py+42,'stroke:var(--ink)');
    [[px,0],[px+35,1],[px+70,1]].forEach(([x,af],k)=>{s+=LN(x+10,py+42,x+10,py+54,'stroke:var(--ink)')+(k?sq(x,py+54,af):ci(x,py+54,af))});
    s+=T(px,py+100,'t-sm','fill:var(--ink)','עוברת במשפחות');
    if(yr>=1967){const dx=A.x+(N?12:170),dy=A.y+(N?158:162);
      for(let k=0;k<47;k++)s+=`<circle cx="${dx+(k%12)*13}" cy="${dy+Math.floor(k/12)*13}" r="3.4" style="fill:var(--terra);opacity:.85"/>`;
      s+=T(dx,dy+64,'t-xs','','⁧כל נקודה = 10 מתוך 470 המטופלים⁩')}
    return s}

  function pills(A,yr,N){let s='';                     // 1972–1991: the bottle, and attacks falling away
    const bx=A.x+10,by=A.y+18;
    s+=RC(bx+8,by,34,14,'fill:var(--crocus);opacity:.85',3)+RC(bx,by+14,50,62,'fill:var(--crocus-soft);stroke:var(--crocus);stroke-width:1.6',6);
    s+=RC(bx+7,by+30,36,20,'fill:var(--panel);stroke:var(--crocus);opacity:.9',3);
    [0,1,2].forEach(k=>{s+=`<ellipse cx="${bx+10+k*16}" cy="${by+88}" rx="7" ry="5" style="fill:var(--crocus);opacity:.8"/>`});
    s+=T(bx,by+108,'t-sm','fill:var(--crocus)','קולכיצין');
    const S=N?{x:A.x+78,y:A.y+20,w:A.w-90,h:80}:{x:A.x+92,y:A.y+20,w:180,h:88};
    s+=T(S.x,S.y-6,'t-xs','','התקפים בחודש');
    s+=LN(S.x,S.y+S.h,S.x+S.w,S.y+S.h,'stroke:var(--muted)')+LN(S.x,S.y,S.x,S.y+S.h,'stroke:var(--muted)');
    const V=[.8,.55,.95,.6,.8,.45,.9,.6,.85,.5,.75,.6,.5,.3,.2,.12,.08,.06,.04,.05,.03,.04,.02,.03];
    let d='';V.forEach((v,k)=>{const x=S.x+4+k*(S.w-8)/(V.length-1),y=S.y+S.h-6-v*(S.h-14);d+=(k?'L':'M')+f1(x)+' '+f1(y)});
    s+=`<path d="${d}" style="fill:none;stroke:var(--terra);stroke-width:2;stroke-linejoin:round"/>`;
    const mk=S.x+4+11.5*(S.w-8)/23;
    s+=LN(mk,S.y,mk,S.y+S.h,'stroke:var(--crocus);stroke-width:1.6;stroke-dasharray:3 3')+T(mk+5,S.y+10,'t-xs','fill:var(--crocus)','התחלת קולכיצין');
    s+=T(S.x+S.w,S.y+S.h+13,'t-xs t-end','','חודשים');
    if(yr>=1974){const tx=N?A.x+206:A.x+96,ty=N?A.y+134:A.y+150;
      for(let k=0;k<3;k++)s+=`<path d="M${tx+k*28} ${ty} l5 6 l10 -13" style="fill:none;stroke:var(--good);stroke-width:2.4;stroke-linecap:round"/>`;
      s+=T(tx,ty-12,'t-xs','fill:var(--good)','⁧3 ניסויים מבוקרים⁩')}
    if(yr>=1986){const B=N?{x:A.x+12,y:A.y+146,lx:118,ly:32}:{x:A.x+292,y:A.y+44,lx:0,ly:74},h0=44;
      s+=T(B.x,B.y,'t-xs','','⁧חלבון בשתן, 9–11 שנים⁩');
      [['⁧1.7% עם היענות⁩',.017,'var(--good)'],['⁧48.9% ללא היענות⁩',.489,'var(--bad)']].forEach(([lb,v,c],k)=>{
        const x=B.x+6+k*46,h=Math.max(3,h0*v);
        s+=RC(x,B.y+10+h0-h,30,h,`fill:${c}`,2);
        s+=RC(B.x+B.lx,B.y+B.ly+k*16-8,9,9,`fill:${c}`,2)+T(B.x+B.lx+14,B.y+B.ly+k*16,'t-xs','',lb)})}
    return s}

  function genes(A,yr,N){let s='';                     // 1992–2010: chromosome 16, then the gene itself
    const cx=A.x+(N?30:44),cy=A.y+(N?92:104);
    const arm=(x,y,h)=>RC(x,y,11,h,'fill:var(--sea-soft);stroke:var(--sea);stroke-width:1.4',5);
    s+=arm(cx-13,cy-58,50)+arm(cx+2,cy-58,50)+arm(cx-13,cy+8,66)+arm(cx+2,cy+8,66);
    s+=`<circle cx="${cx}" cy="${cy}" r="7" style="fill:var(--panel);stroke:var(--sea);stroke-width:1.6"/>`;
    s+=RC(cx-13,cy-54,26,7,'fill:var(--terra)',2);
    s+=T(cx-20,cy-44,'t-xs t-end','','p')+T(cx-20,cy+46,'t-xs t-end','','q')+T(cx,cy+92,'t-sm t-mid','fill:var(--ink)','16');
    s+=T(cx,cy-64,'t-xs t-mid','fill:var(--terra)',yr>=1997?'16p13.3':'16p');
    if(yr>=1997){const gx=A.x+(N?74:96),gy=A.y+26,gw=N?A.w-86:176;
      s+=LN(cx+14,cy-50,gx-6,gy+9,'stroke:var(--terra);stroke-dasharray:3 3');
      s+=RC(gx,gy,gw,18,'fill:var(--panel-2);stroke:var(--line)',4);
      for(let k=0;k<4;k++)s+=RC(gx+10+k*(gw-20)/4,gy,20,18,'fill:var(--sea);opacity:.75',3);
      s+=T(gx,gy-6,'t-sm','fill:var(--ink)','MEFV');
      const qx=gx+16,qy=gy+50;
      s+=LN(gx+gw/2,gy+18,qx+26,qy-12,'stroke:var(--muted);stroke-dasharray:3 3');
      s+=`<path d="M${qx} ${qy} q14 -18 30 -5 q18 -8 24 10 q8 16 -12 20 q-26 8 -42 -6 z" style="fill:var(--gold-soft);stroke:var(--gold);stroke-width:1.6"/>`;
      s+=T(qx+62,qy+2,'t-sm','fill:var(--gold)','פירין')+T(qx+62,qy+18,'t-sm','fill:var(--gold)','מרנוסטרין');
      const nx=A.x+(N?92:108),ny=A.y+(N?124:196);
      s+=neutro(nx,ny,13,1)+T(nx+18,ny+4,'t-xs','','תעתיק כמעט רק בגרנולוציטים')}
    if(yr>=1997.6){const sx=N?A.x+74:A.x+296,sy=N?A.y+154:A.y+24;
      s+=RC(sx,sy,80,58,PANEL,5);
      for(let k=0;k<3;k++)s+=`<path d="M${sx+10} ${sy+16+k*16} l5 6 l10 -12" style="fill:none;stroke:var(--good);stroke-width:2"/>`+LN(sx+30,sy+18+k*16,sx+70,sy+18+k*16,'stroke:var(--line);stroke-width:2');
      s+=T(sx,sy-6,'t-xs','','קריטריוני ליבנה')}
    if(yr>=2003){const rx=N?A.x+180:A.x+296,ry=N?A.y+170:A.y+124;
      for(let k=2;k>=0;k--)s+=`<ellipse cx="${rx+34}" cy="${ry+10+k*13}" rx="34" ry="9" style="fill:var(--panel-2);stroke:var(--line)"/>`;
      s+=T(rx,ry-18,'t-sm','fill:var(--ink)','INFEVERS')+T(rx,ry-6,'t-xs','','⁧412 וריאנטים (2026)⁩')}
    return s}

  function cell(A,yr,N){let s='';                      // 2011–2016: the cell, and the brake on pyrin
    const cx=A.x+A.w/2,cy=A.y+(A.h-10)/2,rx=A.w/2-12,ry=(A.h-54)/2,off=yr>=2014;
    s+=T(A.x+6,A.y+12,'t-xs','','בתוך התא');
    s+=`<ellipse cx="${cx}" cy="${f1(cy)}" rx="${f1(rx)}" ry="${f1(ry)}" style="fill:var(--cyto);stroke:var(--memb);stroke-width:4"/>`;
    const Rx=A.x+74,Ry=A.y+92;
    s+=`<circle cx="${Rx}" cy="${Ry}" r="20" style="fill:var(--panel);stroke:var(--sea);stroke-width:2.5;opacity:${off?.5:1}"/>`+T(Rx,Ry+4,'t-lbl t-mid','','RhoA');
    s+=T(Rx,Ry+36,'t-xs t-mid',`fill:${off?'var(--muted)':'var(--sea)'}`,off?'כבוי':'פעיל');
    if(off)s+=`<path d="M${Rx-24} ${Ry-32} l16 14 -16 4z" style="fill:var(--terra)"/>`+T(A.x+70,A.y+52,'t-xs','fill:var(--terra)','רעלן חיידקי');
    s+=RC(Rx+30,Ry-12,50,24,`fill:var(--panel);stroke:var(--muted);opacity:${off?.4:1}`,7)+T(Rx+55,Ry+4,'t-xs t-mid','','PKN1/2');
    s+=LN(Rx+20,Ry,Rx+28,Ry,'stroke:var(--muted);stroke-width:2');
    const Px=A.x+124,Py=A.y+168;
    s+=`<circle cx="${Px}" cy="${Py}" r="13" style="fill:var(--terra-soft);stroke:var(--terra);stroke-width:2"/>`+T(Px,Py+4,'t-xs t-mid','fill:var(--terra);font-weight:700','PYD');
    s+=LN(Px+13,Py,Px+38,Py,'stroke:var(--muted);stroke-width:2')+RC(Px+38,Py-14,44,28,'fill:var(--panel);stroke:var(--crocus);stroke-width:2',6)+T(Px+60,Py+4,'t-xs t-mid','','B30.2');
    s+=T(Px-20,Py+4,'t-sm t-end','','פירין');
    if(yr>=2011)s+=`<circle cx="${Px+82}" cy="${Py-14}" r="5" style="fill:var(--bad)"/>`+T(Px+90,Py-16,'t-xs','fill:var(--bad)','⁧וריאנט FMF⁩');
    const lift=off?18:0;
    s+=`<g style="opacity:${off?.3:1}"><path d="M${Px+4} ${Py-26-lift} q0 -20 22 -20 h16 q22 0 22 20" style="fill:none;stroke:var(--sea);stroke-width:6;stroke-linecap:round"/>${T(Px+72,Py-44-lift,'t-xs','fill:var(--sea)','14-3-3')}</g>`;
    if(off){const sx=A.x+(N?280:320),sy=A.y+(N?100:128);
      for(let k=0;k<14;k++){const a=k/14*6.283;s+=`<circle cx="${f1(sx+Math.cos(a)*16)}" cy="${f1(sy+Math.sin(a)*16)}" r="3.6" style="fill:var(--crocus)"/>`}
      s+=T(sx,sy+32,'t-xs t-mid','','⁧צבר ASC⁩');
      const ix=A.x+(N?292:356),iy=A.y+(N?152:104);
      s+=`<circle cx="${ix}" cy="${iy}" r="6" style="fill:var(--terra)"/>`+T(ix+10,iy+4,'t-xs','fill:var(--terra)','IL-1β')}
    s+=T(A.x+6,A.y+A.h-6,'t-xs','',yr>=2016?'⁧RhoA פעיל שומר על הפירין כבוי⁩':off?'⁧פירין עוקב אחרי RhoA, לא אחרי החיידק עצמו⁩':'⁧וריאנטי FMF הופכים את הפירין לפעיל יותר, לא פחות⁩');
    return s}

  function trials(A,yr,N){let s='';                    // 2016–2025: the trial result, then the guidelines
    s+=T(A.x+6,A.y+14,'t-sm','fill:var(--ink)','⁧CLUSTER · תגובה מלאה בשבוע 16⁩');
    const F={x:A.x+(N?86:96),y:A.y+28,w:N?A.w-100:250};
    s+=LN(F.x,F.y+52,F.x+F.w,F.y+52,'stroke:var(--muted)');
    [0,50,100].forEach(v=>{const x=F.x+F.w*v/100;s+=LN(x,F.y+52,x,F.y+57,'stroke:var(--muted)')+T(x,F.y+70,'t-xs t-mid','',v+'%')});
    [['קנאקינומאב',61,'var(--good)'],['פלצבו',6,'var(--muted)']].forEach(([l,v,c],k)=>{const y=F.y+10+k*22;
      s+=T(F.x-8,y+4,'t-xs t-end','',l)+LN(F.x,y,F.x+F.w,y,'stroke:var(--line);stroke-width:1.4');
      const x=F.x+F.w*v/100;s+=RC(x-6,y-6,12,12,`fill:${c}`,2)+T(x+12,y+4,'t-xs',`fill:${c}`,v+'%')});
    if(yr>=2019){const V={x:A.x+6,y:A.y+116};
      s+=T(V.x,V.y,'t-xs','','⁧תיקוף Eurofever/PRINTO⁩');
      [['⁧רגישות 0.89⁩',.89],['⁧סגוליות 1.00⁩',1]].forEach(([l,v],k)=>{const y=V.y+10+k*20;
        s+=RC(V.x,y,140,9,'fill:var(--panel-2)',4)+RC(V.x,y,140*v,9,'fill:var(--good)',4)+T(V.x+148,y+9,'t-xs','',l)})}
    const doc=(x,y,ttl)=>RC(x,y,100,60,PANEL,6)+LN(x+10,y+18,x+90,y+18,'stroke:var(--good);stroke-width:2')+LN(x+10,y+30,x+72,y+30,'stroke:var(--line);stroke-width:2')+LN(x+10,y+42,x+82,y+42,'stroke:var(--line);stroke-width:2')+T(x+50,y+56,'t-xs t-mid','fill:var(--good)',ttl);
    const gy=A.y+(N?172:168);
    s+=doc(A.x+6,gy,'EULAR 2016');
    if(yr>=2025)s+=doc(A.x+112,gy,'EULAR/PReS 2024');
    s+=T(A.x+(N?214:224),gy+34,'t-xs','','קולכיצין נשאר קו ראשון');
    return s}
  const SCENE=[ward,bench,pills,genes,cell,trials];

  function draw(t){
    /* narrow: the scene stacks above its caption list and the lane labels move above
       their bands, so the timeline keeps the full width */
    const N=vb(svg,'720 672','400 812');
    const L=N
      ? {XA:20,XB:386,yrX:8,yrY:26,hX:8,hY:46,
         sc:[6,54,388,378],A:{x:14,y:62,w:372,h:232},C:{x:14,y:302,w:372,h:122},
         LY:i=>460+i*46,bandH:26,labUp:1,
         axY:680,tkY:698,brY:686,ticks:[1900,1940,1960,1980,1990,2000,2010,2025],
         obLX:4,obLY:722,obY:730,obMk:776,phTop:441,phBot:762,yY:796,
         o1:'עמילואידוזיס, לרוב קטלני',o2:'ניתן לרוב למניעה',m2:'⁧1986: מניעת עמילואיד⁩'}
      : {XA:150,XB:700,yrX:10,yrY:24,hX:70,hY:23,
         sc:[6,34,708,250],A:{x:16,y:40,w:416,h:238},C:{x:446,y:40,w:262,h:238},
         LY:i=>314+i*50,bandH:46,labUp:0,
         axY:550,tkY:568,brY:556,ticks:[1900,1940,1960,1980,1990,2000,2010,2020,2025],
         obLX:10,obLY:602,obY:590,obMk:636,phTop:285,phBot:622,yY:656,
         o1:'עמילואידוזיס, סיבת מוות מובילה',o2:'עמילואידוזיס ניתן לרוב למניעה',m2:'⁧1986: הוכחה מניעת עמילואיד⁩'};
    XA=L.XA;XB=L.XB;
    const xp=lerp(XA,XB,t),yr=fy(t);
    let s=`<defs><linearGradient id="hiGrad" gradientUnits="userSpaceOnUse" x1="${f1(xOf(1972))}" x2="${f1(xOf(1990))}" y1="0" y2="0"><stop offset="0" style="stop-color:var(--bad)"/><stop offset="1" style="stop-color:var(--good)"/></linearGradient></defs>`;
    const done=HI_EV.filter(e=>e.y<=yr+.01),cur=done.length?done[done.length-1]:null,ph=phaseOf(steps,t);
    // headline
    if(cur)s+=T(L.yrX,L.yrY,'t-big',`font-size:22px;fill:${HI_LANES[cur.l][1]}`,Math.floor(cur.y))+T(L.hX,L.hY,'t-lbl','',cur.h);
    else s+=T(L.yrX,L.yrY,'t-lbl','fill:var(--muted)','⁧לחצו על הפעלה: אבן הדרך הראשונה היא 1908⁩');
    // the scene
    s+=RC(L.sc[0],L.sc[1],L.sc[2],L.sc[3],'fill:var(--field);stroke:var(--line)',12);
    s+=SCENE[ph](L.A,yr,N);
    s+=LN(N?L.C.x:L.C.x-12,N?L.C.y-8:L.A.y,N?L.C.x+L.C.w:L.C.x-12,N?L.C.y-8:L.A.y+L.A.h,'stroke:var(--line)');
    s+=T(L.C.x,L.C.y+12,'t-sm','fill:var(--ink)',HI_ERA[ph].t.toUpperCase());
    const inEra=HI_EV.filter(e=>eraOf(e.y)===ph&&e.y<=yr+.01);
    inEra.forEach((e,k)=>{const y=L.C.y+34+k*20;
      s+=`<circle cx="${L.C.x+5}" cy="${y-4}" r="4" style="fill:${HI_LANES[e.l][1]}"/>`;
      s+=`<text x="${L.C.x+16}" y="${y}" class="t-xs"><tspan style="fill:var(--ink);font-weight:700">${Math.floor(e.y)}</tspan>  ${e.c}</text>`});
    if(!inEra.length)s+=T(L.C.x+16,L.C.y+34,'t-xs','','סמן הזמן עוד לא הגיע לתקופה הזו');
    // lanes
    HI_LANES.forEach(([n,c],i)=>{const y=L.LY(i);
      s+=RC(XA-4,y-L.bandH/2,XB-XA+10,L.bandH,`fill:var(--panel-2);opacity:${i%2?.35:.7}`,8);
      s+=T(L.labUp?XA-4:10,L.labUp?y-L.bandH/2-6:y+4,'t-sm',`fill:${c}`,n);
      s+=LN(XA,y,XB,y,`stroke:${c};stroke-width:1;opacity:.35`)});
    // axis
    s+=`<line x1="${XA}" x2="${XB}" y1="${L.axY}" y2="${L.axY}" class="axis" style="stroke:var(--muted)"/>`;
    L.ticks.forEach(y=>{const x=xOf(y);s+=LN(x,L.axY-4,x,L.axY+4,'stroke:var(--muted)')+T(x,L.tkY,'t-xs t-mid','',y)});
    [1940,1990].forEach(y=>{const x=xOf(y);s+=`<path d="M${f1(x-4)} ${L.brY} l4 -12 M${f1(x)} ${L.brY} l4 -12" style="stroke:var(--muted);stroke-width:1"/>`});
    // dots: stack any that sit too close in one lane
    const gapMin=12*(XB-XA)/550,dyO=N?7:8,last={};
    HI_EV.forEach(e=>{const x=xOf(e.y),p=last[e.l];e.dy=p&&x-p.x<gapMin?(p.dy>0?-dyO:dyO):0;if(e.dy&&p&&!p.dy)p.dy=-e.dy;last[e.l]={x,dy:e.dy}});
    HI_EV.forEach(e=>{const x=xOf(e.y),y=L.LY(e.l)+e.dy,c=HI_LANES[e.l][1],pass=e.y<=yr+.01;
      if(!pass)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="4.5" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.2;opacity:.6"/>`;
      else if(e===cur){const k=ramp(xp-x,0,26);s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(8+(N?7:12)*k)}" style="fill:none;stroke:${c};stroke-width:2;opacity:${f1(.8*(1-k))}"/><circle cx="${f1(x)}" cy="${f1(y)}" r="8" style="fill:${c};stroke:var(--ink);stroke-width:2"/>`}
      else s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="5" style="fill:${c}"/>`;
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="10" class="clk" data-hy="${e.y}" style="fill:transparent"/>`});
    // outlook band
    s+=T(L.obLX,L.obLY,'t-sm','','תחזית')+T(L.obLX+(N?62:0),L.obLY+(N?0:14),'t-xs','','איכותני');
    s+=RC(XA,L.obY,XB-XA,28,'fill:var(--panel-2)',6)+RC(XA,L.obY,Math.max(0,xp-XA),28,'fill:url(#hiGrad);opacity:.85',6);
    s+=`<clipPath id="hiClip"><rect x="${XA}" y="${L.obY}" width="${f1(Math.max(0,xp-XA))}" height="28"/></clipPath><g clip-path="url(#hiClip)">${T(XA+8,L.obY+18,'t-xs','fill:var(--panel);font-weight:700',L.o1)}${T(xOf(1992),L.obY+18,'t-xs','fill:var(--panel);font-weight:700',L.o2)}</g>`;
    if(xp>xOf(1972))s+=LN(xOf(1972),L.obY-4,xOf(1972),L.obY+32,'stroke:var(--ink);stroke-width:1.5')+T(xOf(1972)-4,L.obMk,'t-xs t-end','','⁧1972: קולכיצין⁩');
    if(xp>xOf(1986))s+=LN(xOf(1986),L.obY-4,xOf(1986),L.obY+32,'stroke:var(--ink);stroke-width:1.5')+T(xOf(1986)+4,L.obMk,'t-xs','',L.m2);
    // playhead
    s+=LN(xp,L.phTop,xp,L.phBot,'stroke:var(--ink);stroke-width:1.4;opacity:.55')+`<path d="M${f1(xp-5)} ${L.axY} L${f1(xp+5)} ${L.axY} L${f1(xp)} ${L.axY-8}Z" style="fill:var(--ink)"/>`;
    s+=T(Math.min(XB-6,Math.max(XA+6,xp)),L.yY,'t-xs t-mid','fill:var(--ink)',Math.floor(yr));
    svg.innerHTML=s;
    setSt(ph);
    $('#hiRead').innerHTML=`<span>שנה <b>${Math.floor(yr)}</b></span><span>אבני דרך שעברו <b>${done.length} מתוך ${HI_EV.length}</b></span><span>תקופה <b>${HI_ERA[ph].t}</b></span>`;
    $('#hiNote').innerHTML=cur?`<div class="kicker">${HI_LANES[cur.l][0]}</div>`+noteHTML({t:cur.t,txt:cur.txt,pt:cur.pt,hook:cur.hook}).replace('<div class="kicker"></div>',''):noteHTML({k:'1900',t:'לפני התיאורים הראשונים',txt:'לחום חוזר עם כאבי בטן לא היה שם מוסכם בספרות הרפואית. לחצו על הפעלה, גררו את ציר הזמן או לחצו על נקודה כלשהי.',pt:'הסיפור מתחיל בתיאור מקרה מעורר תהייה ב־1908.'});
  }
  const stop=playWire(rg,$('#hiPlay'),draw,24000,'הפעלה חוזרת','history');
  const setSt=stepWire($('#hiSteps'),steps,rg,draw,stop);
  const jump=y=>{stop();const t=clamp(tOfY(y)+.002);rg.value=t;draw(t)};
  svg.addEventListener('click',e=>{const d=e.target.closest('[data-hy]');if(d)jump(+d.dataset.hy)});
  $('#hiYears').innerHTML=HI_EV.map(e=>`<button class="tag sea" data-hy2="${e.y}"><b style="font-weight:700">${Math.floor(e.y)}</b>&nbsp;${e.h.replace(/&/g,'&amp;').replace(/</g,'&lt;')}</button>`).join('');
  $('#hiYears').addEventListener('click',ev=>{const b=ev.target.closest('[data-hy2]');if(b){jump(+b.dataset.hy2);$('#hiSvg').scrollIntoView({block:'nearest',behavior:RM?'auto':'smooth'})}});
  $('#hiChips').innerHTML=HI_NAMES.map(([n,y])=>y?`<button class="tag sea" data-hn="${y}">${n}<small>${Math.floor(y)}</small></button>`:`<span class="tag">${n}</span>`).join('');
  $('#hiChips').addEventListener('click',e=>{const b=e.target.closest('[data-hn]');if(b){jump(+b.dataset.hn);$('#hiSvg').scrollIntoView({block:'nearest',behavior:RM?'auto':'smooth'})}});
  $('#hiCards').innerHTML=`
   <div class="card"><h4>פירין או מרנוסטרין?</h4><p>אותו חלבון קיבל ב־1997 שני שמות: <b>פירין</b> מהקונסורציום הבינלאומי ל־FMF (על שם החום) ו<b>מרנוסטרין</b> מהקונסורציום הצרפתי ל־FMF (על שם <i>mare nostrum</i>, השם הרומי של הים התיכון). בשימוש היומיומי "פירין" ניצח. [[IntFMF1997,FrenchFMF1997]]</p></div>
   <div class="card"><h4>"מחזורית" הוא שם מטעה</h4><p>"המחלה המחזורית" של ריימן (Reimann) מ־1948 הדגישה מחזורים סדירים. התקפי FMF מופיעים במרווחים לא סדירים; הדפוס הקבוע כמו שעון שייך ל־PFAPA. [[Reimann1948,BenChetrit2019,Thomas1999]] <a href="#ddx" data-go="ddx">השוו את המקצבים</a></p></div>
   <div class="card"><h4>מקטלנית לניתנת לטיפול</h4><p>לפני הקולכיצין, יותר ממחצית החולים ב־FMF מתו מעמילואידוזיס. לפי EULAR 2016, קולכיצין הוריד את הסיכון לעמילואידוזיס בטורקיה מ־60% לפחות מ־13%. [[Tufan2020,Ozen2016]]</p></div>
   <div class="card"><h4>למה הווריאנט כל כך שכיח? <span class="ev early">ראיות ראשוניות</span></h4><p>שיעור הנשאים הוא כ־10% באוכלוסיות של יהודים, ערבים, ארמנים וטורקים. פארק (Park) 2020 קשר זאת לברירה בידי מגפת הדבר: ייתכן שתגובות פירין חזקות יותר עזרו לנשאים לשרוד את <i>Y. pestis</i>. [[Park2020]]</p></div>`;
  draw(+rg.value);
};
