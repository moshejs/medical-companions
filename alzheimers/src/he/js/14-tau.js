
/* =============== 1.4 tau =============== */
const TA_STEPS=[
 {from:0,at:.06,k:'שלב 1 · טאו תקין',t:'טאו מחזיק את המסילות יחד',
  txt:'טאו זוהה ב־1975 כחלבון הדרוש כדי שטובולין יתארגן למיקרוטובולים. [[Weingarten1975]] במוח הוא מיוצר בנוירונים ומרוכז באקסונים. [[Binder1985]] הוא מקודד בגן MAPT שעל כרומוזום 17, והמוח הבוגר מייצר שש איזופורמות באורך 352 עד 441 חומצות אמינו: שלוש עם שלושה רצפים חוזרים הנקשרים למיקרוטובולים (3R) ושלוש עם ארבעה (4R), בדרך כלל בכמויות שוות בקירוב. [[MedlinePlusMAPT,Goedert1989]]',
  pt:'בתוך כל סיב עצב עוברות מסילות ארוכות שמובילות אספקה. טאו הוא החלבון שקושר את המסילות זו לזו, כמו השלבים של סולם.',
  hook:'טאו = חלבון הקשור למיקרוטובולים, הגן MAPT על כרומוזום 17, שש איזופורמות, 3R ו־4R.'},
 {from:.15,at:.27,k:'שלב 2 · יותר מדי פוספט',t:'קינאזות מוסיפות פוספט',
  txt:'הטאו שבסבכי אלצהיימר מזורחן באופן חריג. [[GrundkeIqbal1986]] גם מאגר מסיס של טאו, שעדיין לא יצר סיבים, נשא פי 3 עד 4 יותר פוספט מטאו תקין (כ־8 מול לכל מול), ומכאן שהיפר־הזרחון מתחיל כנראה לפני שהסיבים נוצרים. [[Kopke1993]]',
  pt:'אנזימים בשם קינאזות מדביקים לטאו תוויות פוספט נוספות, פי שלושה עד ארבעה מהכמות הרגילה.'},
 {from:.32,at:.43,k:'שלב 3 · השתחררות',t:'טאו משתחרר והמסילות מתפרקות',
  txt:'טאו בהיפר־זרחון שהופק ממוח עם אלצהיימר פירק מיקרוטובולים במבחנה ומשך טאו תקין לסבכים של סיבים. הסרת הפוספט ביטלה את שתי ההשפעות. [[Alonso1996]] כשהמסילות נעלמות, ההובלה לאורך האקסון נעצרת.',
  pt:'טאו עם עודף תוויות נופל מהמסילות. בלעדיו המסילות מתפרקות, והאספקה מפסיקה לנוע לאורך סיב העצב.',
  hook:'אובדן תפקוד (המיקרוטובולים קורסים) וגם רכישת תפקוד רעיל (טאו מגייס טאו תקין). [[Alonso1996]]'},
 {from:.46,at:.58,k:'שלב 4 · טרום־סבך',t:'טאו מצטבר בגוף התא',
  txt:'סבכים מבשילים בשלושה שלבים. קודם מופיעים טרום־סבכים: טאו שגוי־קיפול שעדיין לא עבר פילמור, מפוזר בגוף התא ובדנדריטים. [[DeTure2019]]',
  pt:'הטאו החופשי נסחף אל הגוף המרכזי של תא העצב ומתחיל להתגבש לגושים.'},
 {from:.62,at:.72,k:'שלב 5 · סיבים',t:'סיבים סליליים זוגיים',
  txt:'טאו נערם לסיבים סליליים זוגיים: שני סיבים, כל אחד ברוחב של כ־10 nm, השזורים זה סביב זה עם הצטלבות כל 65 עד 80 nm. באלצהיימר הם מכילים גם טאו 3R וגם טאו 4R, ותחום הרצפים החוזרים יוצר את הליבה. [[DeTure2019]] מיקרוסקופיה קריו־אלקטרונית (cryo-EM) הראתה שהסיבים הסליליים הזוגיים והסיבים הישרים חולקים ליבה של שני פרוטופילמנטים זהים, העשויים משיירי טאו 306 עד 378 וארוזים בדרכים שונות. [[Fitzpatrick2017]]',
  pt:'הגושים מסתדרים בזוגות של חוטים שזורים, קטנים מכדי שאפשר יהיה לראות אותם במיקרוסקופ רגיל.'},
 {from:.76,at:.86,k:'שלב 6 · הסבך',t:'סבך נוירופיברילרי',
  txt:'הסיבים מתאגדים לסבך סיבי בתוך הנוירון, בצורת להבה בנוירונים פירמידליים. [[DeTure2019]] כל שש האיזופורמות של טאו משתלבות בסבכי אלצהיימר. [[Goedert1989]]',
  pt:'החוטים מתאגדים לסבך שממלא חלק גדול מהתא.',
  hook:'סבך = טאו תוך־תאי בהיפר־זרחון, בסיבים סליליים זוגיים. רובד = עמילואיד בטא חוץ־תאי.'},
 {from:.9,at:.99,k:'שלב 7 · סבך רפאים',t:'הנוירון מת, הסבך נשאר',
  txt:'כשהנוירון מת, נשאר אחריו "סבך רפאים" חוץ־תאי. [[DeTure2019]] באזור אחד של קליפת המוח, מוחות עם אלצהיימר איבדו יותר ממחצית הנוירונים שלהם; האובדן היה מתואם עם הסבכים, אבל עלה על מספר הסבכים פי כמה וכמה. [[GomezIsla1997]]',
  pt:'תא העצב מת, אבל הסבך נשאר כמו מצבה. הרבה יותר תאים מתים מאשר משאירים אחריהם סבכים.'}
];
const TA_SP=[
 {from:0,at:.08,k:'זרע',t:'טאו שגוי־קיפול מתחיל בקליפה האנטורינלית',
  txt:'בבני אדם, הסבכים מופיעים לראשונה באזור הטרנס־אנטורינלי והאנטורינלי. [[Braak1991]] בעכברים שייצרו טאו אנושי מוטנטי רק בשכבה II של הקליפה האנטורינלית, פתולוגיית הטאו התפשטה לנוירונים בהמשך המעגל (הגירוס הדנטטי, שדות CA, פיתול החגורה) שלא ייצרו את החלבון המוטנטי, ואחריה הופיע אובדן של סינפסות ונוירונים. [[deCalignon2012]]',
  pt:'נראה שטאו חריג מתחיל באזור קטן אחד ואז עובר לתאים שמחוברים אליו.'},
 {from:.2,at:.3,k:'לאורך החיבורים',t:'זרעים עוברים דרך סינפסות',
  txt:'<span class="ev early">ראיות ראשוניות</span> תמצית מוח מעכברים עם טאו מוטנטי, שהוזרקה לעכברים המייצרים טאו אנושי תקין, גרמה לטאו התקין ליצור סיבים, והפתולוגיה התפשטה לאזורים שכנים. לכן התפשטות הטאו מכונה דמוית פריון. [[Clavaguera2009]]',
  pt:'בניסויים בבעלי חיים, מעט טאו חריג יכול לגרום לטאו תקין להתקפל לא נכון, והבעיה ממשיכה לנוע הלאה.'},
 {from:.4,at:.52,k:'tau-PET בבני אדם',t:'הקישוריות מסבירה את הדפוס',
  txt:'אצל 312 אנשים שעברו הדמיית tau PET, מודל התפשטות המבוסס על הקישוריות של המוח הסביר עד 70% מהשונות במיקום הטאו. [[Vogel2020]]',
  pt:'אצל מטופלים אמיתיים, האופן שבו אזורי המוח מחוברים זה לזה מנבא את רוב המקומות שבהם טאו מופיע בסריקות.',
  hook:'התפשטות טאו הולכת לפי החיבורים: הקישוריות של המוח הסבירה עד 70% מדפוס ה־tau-PET (Vogel 2020). [[Vogel2020]]'},
 {from:.6,at:.7,k:'תפקיד העמילואיד',t:'ייתכן שעמילואיד מאיץ אותה',
  txt:'<span class="ev hyp">השערה</span> באזורים עשירים בעמילואיד היה יותר טאו ממה שהקישוריות לבדה ניבאה, ממצא שמתיישב עם האפשרות שעמילואיד מאיץ את התפשטות הטאו. [[Vogel2020]] הפעילו את "הצגת אזורים עשירים בעמילואיד" כדי לראות את הרעיון. המתג ממחיש את הקשר שדווח; הוא אינו מהירות שנמדדה.',
  pt:'במקומות שיש בהם הרבה עמילואיד, נראה שטאו מתפשט מהר יותר.'},
 {from:.8,at:.95,k:'התחנה האחרונה',t:'האזורים הראשוניים מגיעים אחרונים',
  txt:'ההתפשטות מסתיימת באזורים הראשוניים, בדומה לשלב בראק VI, שבו אפילו קליפת התחושה הראשונית מעורבת. [[Braak1991,DeTure2019]] סדר ההתפשטות מוצג במודול <a href="#brain" data-go="brain">המוח ששוכח</a>.',
  pt:'אזורים של תחושה בסיסית, כמו ראייה ומגע, מושפעים אחרונים.'}
];
const TA_CMP=[
 {from:0,at:.12,k:'מבחן 1 · נתיחה',t:'מה משקף את חומרת הדמנציה?',
  txt:'אצל 10 מטופלים שנבדקו ב־13 אזורים, חומרת הדמנציה הייתה מתואמת עם מספר הסבכים בניאוקורטקס, אבל לא עם מספר הרבדים. [[Arriagada1992]] סקירה רב־מרכזית הסיקה שאף שייתכן שהרבדים חשובים לאופן שבו המחלה מתחילה, חומרת הפגיעה הקוגניטיבית מתואמת בצורה הטובה ביותר עם הסבכים בניאוקורטקס. [[Nelson2012]]',
  pt:'ספירת סבכים אחרי המוות מלמדת יותר על חומרת הדמנציה מאשר ספירת רבדים.',
  hook:'סבכים מתואמים עם הקוגניציה טוב יותר מרבדים. אובדן סינפסות מתואם טוב מכולם.'},
 {from:.2,at:.32,k:'מבחן 2 · דפוס',t:'מה מתאים לתסמינים?',
  txt:'הדמיית tau PET תאמה את התמונה הקלינית, למשל טאו בחלק האחורי של המוח בניוון קליפתי אחורי (PCA), ואילו PET עמילואיד נקשר באופן מפושט על פני כל הניאוקורטקס. [[Ossenkoppele2016]] עמילואיד שכיח גם בלי תסמינים: 10% מהאנשים התקינים קוגניטיבית בגיל 50 ו־44% בגיל 90 היו חיוביים לעמילואיד. [[Jansen2015]]',
  pt:'טאו נמצא במקום שממנו מגיעים התסמינים. עמילואיד פרוס באופן אחיד יותר, ולאנשים רבים עם עמילואיד יש זיכרון תקין.'},
 {from:.4,at:.52,k:'מבחן 3 · ניבוי',t:'מה מנבא את הניוון הבא?',
  txt:'אצל 32 אנשים עם תסמינים מוקדמים, העוצמה והמיקום של tau-PET בתחילת המעקב, אבל לא PET עמילואיד, ניבאו היכן ובאיזה קצב המוח הצטמק במהלך כ־15 החודשים הבאים. [[LaJoie2020]]',
  pt:'סריקת טאו היום מצביעה על המקום שבו המוח יצטמק בהמשך. סריקת עמילואיד לא.'},
 {from:.6,at:.72,k:'מבחן 4 · נוירונים',t:'מה משקף את אובדן הנוירונים?',
  txt:'בחריץ הרקתי העליון, מוחות עם אלצהיימר איבדו יותר מ־50% מהנוירונים. האובדן היה מתואם עם הסבכים, עלה בהרבה על מספר הסבכים, ולא היה קשור למספר הרבדים או לעומס העמילואיד. [[GomezIsla1997]]',
  pt:'היכן שיש סבכים, תאי עצב אובדים, ומתים יותר תאים ממה שהסבכים לבדם היו מרמזים.'},
 {from:.8,at:.92,k:'ומה עם הסינפסות',t:'אובדן סינפסות מתואם הכי טוב',
  txt:'אצל 15 אנשים עם אלצהיימר ו־9 משתתפי ביקורת, צפיפות הסינפסות בניאוקורטקס הייתה מתואמת חזק עם הקוגניציה, ואילו הרבדים והסבכים היו מתואמים רק באופן חלש. מודל שכלל את צפיפות הסינפסות באזור המצחי האמצעי ובאזור הקודקודי התחתון הגיע ל־r = 0.96 מול סולם Mattis Dementia Rating Scale; הרבדים תרמו רק 26% מזה. [[Terry1991]] ב־CA1 היו 55% פחות סינפסות באלצהיימר קל ו־18% פחות ב־MCI. [[Scheff2007]] המודול הבא, <a href="#glia" data-go="glia">מיקרוגליה והסינפסה שאבדה</a>, מראה איך הסינפסות אובדות.',
  pt:'מה שקובע יותר מכול לחשיבה הוא כמה חיבורים בין תאי עצב שורדים.'}
];
inits.tau=()=>{
  /* ---- 1. from rungs to a tangle ---- */
  const svg=$('#taSvg'),rg=$('#taT');
  const R=rng(14),BEAD=[...Array(90)].map(()=>({dx:R()*2-1,dy:R()*2-1,rot:R()*2-1,k:R()})),RUNG=[...Array(12)].map(()=>({dx:R()*2-1,dy:R()*2-1,ox:R()*2-1,oy:R()*2-1}));
  const HZ=[...Array(16)].map(()=>[R()*2-1,R()*2-1]);
  const POFF=[[-9,-12],[9,-3],[-9,6],[9,14]];
  function rung(x,y,rot,nP,o){let g=`<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)})" style="opacity:${f1(o)}"><path d="M0 -18 q7 9 0 18 q-7 9 0 18" style="fill:none;stroke:var(--rose);stroke-width:3.2;stroke-linecap:round"/>`;
    for(let j=0;j<4;j++){const a=clamp(nP-j);if(a<=0)break;const [px,py]=POFF[j];
      g+=`<g style="opacity:${f1(a)}"><circle cx="${px}" cy="${py}" r="5.6" style="fill:var(--warn)"/><text x="${px}" y="${py+2.7}" text-anchor="middle" style="font:700 7.5px var(--mono);fill:var(--panel)">P</text></g>`}
    return g+'</g>'}
  function draw(t){
    const N=vb(svg,'720 400','400 700');
    const L=N?{ax:10,ay:20,aw:380,sx:85,sy:300,px:10,py:556,pw:380}:{ax:10,ay:24,aw:440,sx:470,sy:24,px:10,py:300,pw:700};
    const phos=ramp(t,.15,.3),det=ease(ramp(t,.32,.46)),mv=ease(ramp(t,.46,.6)),phf=ease(ramp(t,.62,.76)),nft=ease(ramp(t,.76,.88)),die=ease(ramp(t,.9,.98));
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    /* axon panel */
    const AW=L.aw;
    s+=`<g transform="translate(${L.ax} ${L.ay})"><text x="0" y="12" class="t-sm">אקסון, בהגדלה</text>`;
    s+=`<rect x="0" y="30" width="${AW}" height="200" rx="10" style="fill:var(--cell);opacity:.6"/><path d="M0 30 H${AW} M0 230 H${AW}" style="stroke:var(--cell-line);stroke-width:2"/>`;
    const nb=Math.floor((AW-16)/11);
    [100,160].forEach((ry,r)=>{for(let j=0;j<nb;j++){const b=BEAD[r*45+j],x=8+j*11+5+b.dx*26*det,y=ry+b.dy*52*det+det*det*18,o=1-det*(b.k<.45?.95:.65);
      if(o<=.02)continue;s+=`<rect x="${f1(x-5)}" y="${f1(y-6)}" width="10" height="12" rx="3" transform="rotate(${f1(b.rot*70*det)} ${f1(x)} ${f1(y)})" style="fill:${j%2?'var(--sage)':'var(--sage-soft)'};stroke:var(--sage);stroke-width:1;opacity:${f1(o)}"/>`}});
    if(det<.05)s+=`<text x="${AW-6}" y="184" class="t-xs t-end" style="opacity:${f1(1-det*20)}">מיקרוטובול</text>`;
    // cargo: moves while the rails hold, stalls when they break
    const cx=AW-20-(((t<.33?t:.33)*5)%1)*(AW-40);
    s+=`<circle cx="${f1(cx)}" cy="${f1(82+det*14)}" r="9" style="fill:var(--sky-soft);stroke:var(--sky);stroke-width:1.6;opacity:${f1(1-det*.5)}"/>`;
    // kinases sweep along
    const kx=lerp(-30,AW+30,phos),ko=bump(t,.14,.31);
    if(ko>0)[[kx,50],[kx-70,210]].forEach(([x,y])=>s+=`<g style="opacity:${f1(ko)}"><ellipse cx="${f1(x)}" cy="${y}" rx="24" ry="11" style="fill:var(--panel);stroke:var(--warn);stroke-width:1.6"/><text x="${f1(x)}" y="${y+3}" class="t-xs t-mid" style="fill:var(--warn)">קינאז</text></g>`);
    const ST=['טאו נקשר למיקרוטובולים; המטען נע לאורכם','קינאזות מוסיפות פוספט: בטאו יש פי 3 עד 4 מהרגיל','טאו משתחרר, המסילות מתפרקות, ההובלה נעצרת','האקסון נשאר בלי טאו תקין'];
    const si=t<.15?0:t<.32?1:t<.46?2:3;
    s+=`<text x="0" y="252" class="t-xs" style="fill:var(--ink)">${ST[si]}</text></g>`;
    /* cell body panel */
    const so=1-die*.8;
    s+=`<g transform="translate(${L.sx} ${L.sy})"><text x="0" y="12" class="t-sm">גוף התא</text>`;
    s+=`<path d="M48 132 H-20 M48 148 H-20" style="stroke:var(--cell-line);stroke-width:2;opacity:${f1(so)}"/><text x="-14" y="126" class="t-xs" style="opacity:${f1(so)}">אקסון</text>`;
    s+=`<path d="M170 100 Q195 80 220 70 M175 150 Q200 160 226 168 M120 70 Q125 45 140 30 M110 210 Q105 235 92 250" style="fill:none;stroke:var(--cell-line);stroke-width:4;stroke-linecap:round;opacity:${f1(1-die)}"/>`;
    s+=`<circle cx="115" cy="140" r="70" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2.5;opacity:${f1(so)};${die>0?'stroke-dasharray:6 5':''}"/>`;
    s+=`<circle cx="142" cy="160" r="20" style="fill:var(--nuc);opacity:${f1(.8*(1-die))}"/>`;
    const pre=mv*(1-phf);
    if(pre>0)HZ.forEach(([a,b])=>s+=`<circle cx="${f1(95+a*36)}" cy="${f1(128+b*36)}" r="2.6" style="fill:var(--rose);opacity:${f1(pre*.55)}"/>`);
    if(phf>0)s+=tangle(92,126,lerp(5,20,phf)+10*nft,Math.min(1,phf*1.4));
    const lab=die>.3?'סבך רפאים: הנוירון איננו':nft>.3?'סבך נוירופיברילרי':phf>.2?'הסיבים מתארגנים':mv>.5?'טרום־סבך: טאו שגוי־קיפול':'';
    if(lab)s+=`<text x="115" y="236" class="t-xs t-mid" style="fill:var(--rose)">${lab}</text>`;
    s+='</g>';
    /* rungs: drawn in whole-svg coordinates so they can travel between panels */
    const nR=Math.floor((AW-40)/40)+1;
    for(let i=0;i<nR;i++){const r=RUNG[i],xi=30+i*40;
      const nP=1+3*clamp((kx-xi)/40);
      const x0=L.ax+xi+r.dx*30*det,y0=L.ay+130+r.dy*40*det;
      const x1=L.sx+95+r.ox*30,y1=L.sy+128+r.oy*30;
      let x=lerp(x0,x1,mv),y=lerp(y0,y1,mv)-Math.sin(Math.PI*mv)*30;
      x=lerp(x,L.sx+92,phf);y=lerp(y,L.sy+126,phf);
      const o=1-phf,sc=1-.35*mv;
      if(o<=.02)continue;
      s+=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(sc)}) translate(${f1(-x)} ${f1(-y)})">${rung(x,y,r.dx*80*det+mv*r.oy*60,nP,o)}</g>`}
    /* PHF strip */
    s+=`<g transform="translate(${L.px} ${L.py})"><text x="0" y="12" class="t-sm">סיב סלילי זוגי, בהגדלה נוספת</text>`;
    const fx1=N?L.pw-10:400,len=phf*(fx1-10),cy=44,A=11;
    if(len>2){[[-1,.5],[1,1]].forEach(([sg,o])=>{let d='';for(let x=0;x<=len;x+=3)d+=(x?'L':'M')+f1(10+x)+' '+f1(cy+sg*A*Math.sin(2*Math.PI*x/100));
      s+=`<path d="${d}" style="fill:none;stroke:var(--rose);stroke-width:8;stroke-linecap:round;opacity:${o}"/>`});
      if(len>110)s+=`<path d="M60 62 v5 H110 v-5" style="fill:none;stroke:var(--ink);stroke-width:1.2"/><text x="85" y="78" class="t-xs t-mid" style="fill:var(--ink)">65–80 nm</text>`}
    else s+=`<text x="10" y="48" class="t-xs">נוצר בשלב 5</text>`;
    const TX=['שני פרוטופילמנטים שזורים זה בזה','⁧כל גדיל ברוחב של כ־10 nm⁩','⁧הצטלבות כל 65 עד 80 nm⁩','⁧ליבה: שיירי טאו 306 עד 378 (cryo-EM)⁩'];
    TX.forEach((l,i)=>s+=`<text x="${N?10:420}" y="${N?96+i*14:34+i*16}" class="t-xs" style="fill:var(--ink);opacity:${f1(.4+.6*phf)}">${l}</text>`);
    s+='</g>';
    svg.innerHTML=s;
    const p=phaseOf(TA_STEPS,t);setSt(p);$('#taNote').innerHTML=noteHTML(TA_STEPS[p]);
  }
  const stop=playWire(rg,$('#taPlay'),draw,17000,'הפעלה חוזרת','tau');
  const setSt=stepWire($('#taSteps'),TA_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- 2. prion-like spread ---- */
  const sp=$('#taSp'),sr=$('#taSpT');let amy=false;
  const NODES=[['אנטורינלית',.02,.78],['היפוקמפוס',.24,.93],['רקתית תחתונה',.27,.58],['פיתול החגורה',.5,.82],['קליפה רקתית',.52,.45],['קליפה קודקודית',.78,.62],['קליפה מצחית',.62,.12],['ראייה ראשונית',.98,.88],['תחושה ראשונית',.95,.22]];
  const EDGES=[ [0,1],[0,2],[1,3],[1,2],[2,4],[3,5],[3,6],[4,5],[4,6],[5,7],[5,8],[6,8] ];
  const DIST=[0,1,1,2,2,3,3,4,4],RICH=[4,5,6];
  const halo='paint-order:stroke;stroke:var(--field);stroke-width:4px;stroke-linejoin:round;fill:var(--ink)';
  function drawSp(t){
    const N=vb(sp,'720 360','400 500');
    const L=N?{w:380,ox:10,oy:0,px:24,py:356}:{w:440,ox:10,oy:0,px:480,py:40};
    const P=NODES.map(([,nx,ny])=>[L.ox+30+nx*(L.w-60),L.oy+40+ny*270]);
    const on=NODES.map((_,i)=>.06+DIST[i]*.19-(amy&&RICH.includes(i)?.06:0));
    const lvl=NODES.map((_,i)=>i===0?Math.max(.35,ease(ramp(t,0,.12))):ease(ramp(t,on[i],on[i]+.14))*(amy&&RICH.includes(i)?1:.78));
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    EDGES.forEach(([a,b])=>{const [x1,y1]=P[a],[x2,y2]=P[b];s+=`<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" style="stroke:var(--axon);stroke-width:2;opacity:.7"/>`;
      let src=a,dst=b;if(DIST[a]>DIST[b]){src=b;dst=a}if(DIST[dst]!==DIST[src]+1)return;
      const g=ramp(t,on[dst]-.13,on[dst]);if(g<=0)return;
      const [sx,sy]=P[src],[dx,dy]=P[dst],ex=lerp(sx,dx,g),ey=lerp(sy,dy,g);
      s+=`<line x1="${f1(sx)}" y1="${f1(sy)}" x2="${f1(ex)}" y2="${f1(ey)}" style="stroke:var(--rose);stroke-width:2.6"/>`;
      if(g<1)s+=`<circle cx="${f1(ex)}" cy="${f1(ey)}" r="7" style="fill:var(--rose-soft)"/><circle cx="${f1(ex)}" cy="${f1(ey)}" r="3.6" style="fill:var(--rose)"/>`});
    NODES.forEach(([l],i)=>{const [x,y]=P[i],v=lvl[i];
      if(amy&&RICH.includes(i))s+=plaque(x+17,y-15,9,i+2,.95);
      s+=neuron(x,y,12,1,{axonLen:0,dendrites:4,fill:v>.05?'var(--rose-soft)':'var(--cell)',col:v>.05?'var(--rose)':'var(--cell-line)'});
      if(v>.02)s+=tangle(x,y+1,4+7*v,Math.min(1,v*1.3));
      s+=`<text x="${f1(x)}" y="${f1(y+30)}" class="t-xs t-mid" style="${halo}">${l}</text>`});
    s+=`<text x="${f1(P[0][0]-8)}" y="${f1(P[0][1]-24)}" class="t-xs" style="paint-order:stroke;stroke:var(--field);stroke-width:4px;fill:var(--rose)">התחלה</text>`;
    // tau-PET panel
    const ap=ease(ramp(t,.4,.55));
    s+=`<g transform="translate(${L.px} ${L.py})"><text x="0" y="14" class="t-sm">⁧tau-PET אצל 312 אנשים⁩</text>`;
    s+=`<rect x="0" y="26" width="220" height="14" rx="4" style="fill:var(--panel-2)"/><rect x="0" y="26" width="${f1(154*ap)}" height="14" rx="4" style="fill:var(--rose)"/>`;
    s+=`<line x1="154" x2="154" y1="22" y2="44" class="grid"/>`;
    if(ap>.95)s+=`<text x="160" y="38" class="t-sm" style="fill:var(--ink)">עד 70%</text>`;
    s+=`<text x="0" y="62" class="t-xs" style="fill:var(--ink);opacity:${f1(.4+.6*ap)}">מהדפוס המרחבי של הטאו</text><text x="0" y="78" class="t-xs" style="fill:var(--ink);opacity:${f1(.4+.6*ap)}">הוסבר על ידי הקישוריות של המוח</text>`;
    s+=amy?`<text x="0" y="106" class="t-xs" style="fill:var(--amber)">באזורים עשירים בעמילואיד: יותר טאו</text><text x="0" y="122" class="t-xs" style="fill:var(--amber)">ממה שהקישוריות לבדה ניבאה</text>`
          :`<text x="0" y="106" class="t-xs">הפעילו את האזורים העשירים בעמילואיד</text><text x="0" y="122" class="t-xs">כדי להשוות</text>`;
    s+='</g>';
    sp.innerHTML=s;
    const p=phaseOf(TA_SP,t);setSp(p);$('#taSpNote').innerHTML=noteHTML(TA_SP[p]);
    $('#taSpCap').textContent=`רשת סכמטית. כל צומת מייצג אזור, וכל קו מייצג חיבור.${amy?' רבדים בצבע ענבר מסמנים קליפת אסוציאציה עשירה בעמילואיד, ומוצגים כדי להמחיש את הקשר שדווח.':''}`;
  }
  const stopS=playWire(sr,$('#taSpPlay'),drawSp,14000,'הפעלה חוזרת','tau');
  const setSp=stepWire($('#taSpSteps'),TA_SP,sr,drawSp,stopS);
  $('#taAmy').onclick=()=>{amy=!amy;$('#taAmy').setAttribute('aria-pressed',amy);drawSp(+sr.value)};
  drawSp(+sr.value);

  /* ---- 3. tau vs amyloid against cognition ---- */
  const cm=$('#taCmp'),cr=$('#taCmpT');
  const ROWS=[
   {q:['משקף את חומרת','הדמנציה'],a:['ספירת הרבדים לא','עקבה אחר החומרה'],t:['ספירת הסבכים','בניאוקורטקס כן']},
   {q:['מתאים לסוג','התסמינים'],a:['פרוס באופן מפושט','על פני הניאוקורטקס'],t:['תאם את התמונה','הקלינית, למשל אחורי','⁧ב־PCA⁩']},
   {q:['מנבא היכן המוח','יצטמק בהמשך'],a:['סריקת עמילואיד בתחילת','המעקב לא ניבאה'],t:['סריקת טאו בתחילת','המעקב ניבאה, לאורך כ־15','חודשים (32 מטופלים)']},
   {q:['משקף את אובדן','הנוירונים'],a:['לא קשור לרבדים','או לעומס העמילואיד'],t:['האובדן תאם את הסבכים','ועלה עליהם בהרבה']}];
  function cell(x,y,isTau,lines,o,k,N){let s=`<g style="opacity:${f1(o)}" transform="translate(${f1((1-o)*16)} 0)">`;
    if(N)s+=`<text x="${x}" y="${y-12}" class="t-xs" style="fill:${isTau?'var(--rose)':'var(--amber)'}">${isTau?'טאו':'עמילואיד'}</text>`;
    s+=isTau?tangle(x+12,y+14,11,1):plaque(x+12,y+14,11,k+3,1);
    s+=`<rect x="${x+32}" y="${y}" width="64" height="20" rx="10" style="fill:${isTau?'var(--rose-soft)':'var(--panel-2)'};stroke:${isTau?'var(--rose)':'var(--line)'};stroke-width:1.2"/><text x="${x+64}" y="${y+14}" class="t-xs t-mid" style="fill:${isTau?'var(--rose)':'var(--muted)'};font-weight:700">${isTau?'חזק':'חלש'}</text>`;
    lines.forEach((l,i)=>s+=`<text x="${N?x:x+32}" y="${y+(N?44:30)+i*12}" class="t-xs" style="fill:var(--ink)">${l}</text>`);
    return s+'</g>'}
  function drawCmp(t){
    const N=vb(cm,'720 410','400 730');
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    if(!N)s+=`<text x="330" y="24" class="t-lbl" style="fill:var(--amber)">עמילואיד</text><text x="330" y="38" class="t-xs">⁧רבדים, PET עמילואיד⁩</text><text x="550" y="24" class="t-lbl" style="fill:var(--rose)">טאו</text><text x="550" y="38" class="t-xs">⁧סבכים, tau PET⁩</text>`;
    ROWS.forEach((R,k)=>{const o=ease(ramp(t,.02+k*.2,.12+k*.2)),y0=N?24+k*150:50+k*74;
      if(k)s+=`<line x1="10" x2="${N?390:710}" y1="${y0-(N?10:6)}" y2="${y0-(N?10:6)}" class="grid"/>`;
      R.q.forEach((l,i)=>s+=`<text x="${N?12:16}" y="${y0+(N?16:22)+i*16}" class="t-lbl" style="opacity:${f1(.35+.65*o)}">${l}</text>`);
      if(o<=0)return;
      if(N){s+=cell(12,y0+62,false,R.a,o,k,N)+cell(206,y0+62,true,R.t,o,k,N)}
      else{s+=cell(330,y0+8,false,R.a,o,k,N)+cell(550,y0+8,true,R.t,o,k,N)}});
    const sy=ease(ramp(t,.82,.92));
    if(sy>0){if(N){s+=`<g style="opacity:${f1(sy)}"><rect x="8" y="626" width="384" height="96" rx="10" style="fill:var(--sage-soft)"/><text x="20" y="650" class="t-lbl">⁧החזק ביותר במחקר אחד:⁩</text><text x="20" y="668" class="t-lbl">⁧צפיפות הסינפסות, r = 0.96⁩</text><text x="20" y="690" class="t-xs" style="fill:var(--ink)">⁧מול סולם לדירוג דמנציה;⁩</text><text x="20" y="706" class="t-xs" style="fill:var(--ink)">הרבדים הוסיפו רק 26% מזה</text></g>`}
      else s+=`<g style="opacity:${f1(sy)}"><rect x="10" y="350" width="700" height="52" rx="10" style="fill:var(--sage-soft)"/><text x="24" y="372" class="t-lbl">החזק מכולם במחקר נתיחה אחד: צפיפות הסינפסות</text><text x="24" y="390" class="t-xs" style="fill:var(--ink)">⁧r = 0.96 מול סולם לדירוג דמנציה; הרבדים הוסיפו רק 26% מזה⁩</text></g>`}
    cm.innerHTML=s;
    const p=phaseOf(TA_CMP,t);setCm(p);$('#taCmpNote').innerHTML=noteHTML(TA_CMP[p]);
  }
  const stopM=playWire(cr,$('#taCmpPlay'),drawCmp,12000,'הפעלה חוזרת','tau');
  const setCm=stepWire($('#taCmpSteps'),TA_CMP,cr,drawCmp,stopM);
  drawCmp(+cr.value);
};
