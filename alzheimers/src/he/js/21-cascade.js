
/* =============== 2.1 cascade: twenty years before symptoms =============== */
const CA_SIG=(x,m,k)=>1/(1+Math.exp(-(x-m)/k));
/* dominant: onset years y0 are DIAN's measured values; k (steepness) is schematic.
   The curve is placed so it leaves baseline (5%) at the measured onset. */
const CA_DOM=[
 {n:1,l:'\u2067Aβ42 ב־CSF (יורד)',y0:-25,k:2.2,c:'var(--amber)',d:'7 4',w:2.6},
 {n:2,l:'\u2067PET עמילואיד',y0:-15,k:2.0,c:'var(--amber)',d:'',w:3},
 {n:3,l:'\u2067טאו ב־CSF (עולה)',y0:-15,k:2.6,c:'var(--rose)',d:'',w:3},
 {n:4,l:'\u2067אטרופיה ב־MRI',y0:-15,k:3.2,c:'var(--ink)',d:'',w:2},
 {n:5,l:'\u2067FDG-PET (ניצול גלוקוז)',y0:-10,k:2.2,c:'var(--ink)',d:'5 4',w:2},
 {n:6,l:'קוגניציה',y0:-10,k:3.0,c:'var(--violet)',d:'',w:3.6,sub:'\u2067זיכרון \u2066−10\u2069, כללית \u2066−5\u2069'}].map(c=>({...c,m:c.y0+2.94*c.k}));
const CA_SPO=[
 {n:1,l:'עמילואיד',f:u=>CA_SIG(u,.28,.05),c:'var(--amber)',d:'',w:3,sub:'\u2067CSF, PET, דם; ראשון',m:.28},
 {n:2,l:'טאו',f:u=>.07*ramp(u,.02,.3)+.93*CA_SIG(u,.5,.05),c:'var(--rose)',d:'',w:3,sub:'\u2067CSF, PET; נמוך, ואז מהיר יותר',m:.5},
 {n:3,l:'ניוון עצבי',f:u=>CA_SIG(u,.6,.055),c:'var(--ink)',d:'',w:2.2,sub:'\u2067MRI, FDG; מתאם עם התסמינים',m:.6},
 {n:4,l:'\u2067קוגניציה (קו רציף)',f:u=>CA_SIG(u,.72,.05),c:'var(--violet)',d:'',w:3.6,sub:'סיכון גבוה יותר',m:.72},
 {n:5,l:'\u2067קוגניציה (קו מקווקו)',f:u=>CA_SIG(u,.84,.05),c:'var(--violet)',d:'7 5',w:3.6,sub:'יותר רזרבה, ירידה מאוחרת יותר',m:.84}];
const CA_STEPS=[
 {from:0,at:.04,t:'השנים השקטות',
  dom:{k:'תורשה דומיננטית · 30 שנה לפני',txt:'התצוגה הזאת עוקבת אחר נשאים של מוטציה ב־APP, ב־PSEN1 או ב־PSEN2. הזמן נספר מהגיל שבו הופיעו התסמינים הראשונים אצל ההורה, "מועד ההופעה הצפוי". 30 שנה לפני מועד זה, המדדים עדיין תקינים. ניתוח DIAN הציב 128 משתתפים על השעון הזה. [[Bateman2012]]',
   pt:'במשפחות עם גן דומיננטי, הגיל שבו הופיעו התסמינים הראשונים אצל ההורה מאפשר לחוקרים להציב את כולם על שעון אחד.'},
  spo:{k:'ספורדי · סכמטי',txt:'באלצהיימר בהופעה מאוחרת אין גיל של הורה שאפשר לעגן אליו שעון, ולכן העקומות עוקבות אחר המודל ההיפותטי של Jack ואין בהן שנים. עמילואיד שכיח גם בלי תסמינים: בקרב 7,583 אנשים ללא דמנציה מ־55 מחקרים, שיעור החיוביות לעמילואיד אצל אנשים תקינים קוגניטיבית עלה מ־10% בגיל 50 ל־44% בגיל 90. [[Jack2010,Jansen2015]]',
   pt:'אצל רוב האנשים אי אפשר לומר מתי בדיוק התחילו השינויים. הצורה מראה את הסדר הרגיל, לא לוח זמנים.'}},
 {from:.1,at:.2,t:'עמילואיד ראשון',
  dom:{k:'DIAN · מ־25 עד 15 שנה לפני',txt:'עמילואיד β42 ב־CSF מתחיל לרדת כ־25 שנה לפני מועד ההופעה הצפוי, כשהעמילואיד מתחיל לשקוע במוח; PET עמילואיד מזהה אותו כ־15 שנה לפני. נתוני אורך מ־217 אנשים אישרו שמדדי העמילואיד משתנים ראשונים. [[Bateman2012,McDade2018]]',
   pt:'הסימן הראשון נמצא בנוזל השדרה: רמת העמילואיד בו יורדת, משום שהוא נתקע במוח.',
   hook:'רמה נמוכה של Aβ42 ב־CSF = עמילואיד ששקע במוח (הוא כלוא ברבדים, ולכן פחות ממנו מגיע לנוזל). ב־DIAN זה השינוי המוקדם ביותר, כ־25 שנה לפני ההופעה.'},
  spo:{k:'ספורדי · עמילואיד',txt:'במודל של 2010 סמני העמילואיד הופכים לחריגים ראשונים, ירידה של Aβ42 ב־CSF ועלייה ב־PET עמילואיד, בזמן שהאנשים עדיין תקינים קוגניטיבית. אצל נשאי APOE ε4 שיעור העמילואיד היה גבוה פי 2 עד 3 מאשר אצל מי שאינם נשאים; הפס בתחתית מראה את הגיל שבו 15% מהאנשים התקינים קוגניטיבית היו חיוביים לעמילואיד. [[Jack2010,Jansen2015]]',
   pt:'העמילואיד מצטבר ראשון, לעתים קרובות במשך שנים רבות, בלי שום תסמינים.'}},
 {from:.36,at:.44,t:'טאו ונזק לתאי עצב',
  dom:{k:'DIAN · מ־15 עד 10 שנים לפני',txt:'טאו ב־CSF עולה ואטרופיה במוח מופיעה כ־15 שנה לפני מועד ההופעה הצפוי; ניצול הגלוקוז ב־FDG-PET יורד כ־10 שנים לפני. בנתוני האורך, חילוף החומרים ירד כ־7 עד 10 שנים אחרי העמילואיד, ותזמון הטאו ב־CSF היה שונה מהערכת החתך ביותר מ־10 שנים. [[Bateman2012,McDade2018]]',
   pt:'בהמשך הטאו מתפשט, ותאי העצב מתחילים להתקשות ולהצטמק. עדיין אין תסמינים.'},
  spo:{k:'ספורדי · טאו וניוון עצבי',txt:'העדכון של 2013 הציע שבאלצהיימר ספורדי טאו עשוי להתחיל בעצמו באזורים הלימביים ובגזע המוח, ושהעמילואיד מאיץ אותו לאחר מכן. אחריו בא הניוון העצבי: עלייה בטאו ב־CSF, אטרופיה ב־MRI וירידה בקליטת FDG, שמתאמים עם חומרת התסמינים. [[Jack2013,Jack2010]]',
   pt:'טאו יכול להיות קיים מוקדם, ברמות נמוכות. נראה שהעמילואיד גורם לו להתפשט מהר יותר.'}},
 {from:.5,at:.62,t:'הזיכרון מתחיל לבגוד',
  dom:{k:'DIAN · מ־10 עד 5 שנים לפני',txt:'פגיעה בזיכרון האפיזודי מופיעה כ־10 שנים לפני מועד ההופעה הצפוי, ובמדדים כלליים (MMSE, CDR) כ־5 שנים לפני. במשפחה המורחבת בקולומביה עם PSEN1 E280A, הגילים החציוניים היו 44 ל־MCI ו־49 לדמנציה. [[Bateman2012,AcostaBaena2011]]',
   pt:'שינויים קטנים בזיכרון מופיעים שנים לפני שמישהו יקרא לזה דמנציה.'},
  spo:{k:'ספורדי · קוגניציה',txt:'העדכון של 2013 הוסיף שונות בין אדם לאדם: עם אותה פתולוגיה, אנשים עם יותר רזרבה יורדים מאוחר יותר (קו מקווקו) מאנשים בסיכון גבוה יותר (קו רציף). לאדם עם אלצהיימר פרה־קליני בגיל 70, מודל על פני 6 עוקבות העריך כ־10 שנים בשלב הפרה־קליני ו־4 שנים עם MCI. [[Jack2013,Vermunt2019]]',
   pt:'שני אנשים עם אותם שינויים במוח יכולים לפתח תסמינים בהפרש של שנים.'}},
 {from:.84,at:.88,t:'דמנציה',
  dom:{k:'DIAN · 3 שנים אחרי',txt:'בממוצע, אנשים עמדו בקריטריונים לדמנציה 3 שנים אחרי מועד ההופעה הצפוי שלהם. [[Bateman2012]]',
   pt:'דמנציה אובחנה, בממוצע, כמה שנים אחרי הגיל שבו הופיעו אצל ההורה התסמינים הראשונים.',
   hook:'סדר השינויים ב־DIAN: Aβ42 ב־CSF כבר 25 שנה לפני ← PET עמילואיד, טאו ב־CSF ואטרופיה כ־15 שנה לפני ← FDG וזיכרון אפיזודי כ־10 שנים לפני ← קוגניציה כללית כ־5 שנים לפני ← דמנציה כ־3 שנים אחרי.'},
  spo:{k:'ספורדי · דמנציה',txt:'Jansen ועמיתיו הסיקו שעוברות כ־20 עד 30 שנה מהחיוביות הראשונה לעמילואיד ועד דמנציה. אצל האדם בן ה־70 שתואר במודל למעלה, כ־6 שנים עברו עם דמנציה. [[Jansen2015,Vermunt2019]]',
   pt:'מההצטברות הראשונה של עמילואיד ועד דמנציה יכולים לעבור שניים עד שלושה עשורים.',
   hook:'הסדר במודל של Jack: עמילואיד (Aβ42 ב־CSF, ואחר כך PET) ← טאו ← ניוון עצבי (MRI, FDG) ← קוגניציה. הניוון העצבי מתאם עם חומרת התסמינים; העמילואיד לא.'}},
 {from:.94,at:.98,t:'נמדד או משורטט?',
  dom:{k:'איך לקרוא את התרשים',txt:'נמדד: השנים בשורה העליונה, כולן הערכות חתך של DIAN. משורטט: הצורה של כל עקומה ביניהן. החוקרים מזהירים שייתכן שהתוצאות אינן חלות על אלצהיימר בהופעה מאוחרת, ונתוני אורך הראו ש־p-tau181 ב־CSF יורד סמוך להופעת התסמינים, דבר שעקומה עולה אינה מראה. [[Bateman2012,McDade2018]]',
   pt:'השנים הן מדידות אמיתיות. העקומות החלקות הן שרטוט שנועד להראות את הסדר.'},
  spo:{k:'איך לקרוא את התרשים',txt:'נמדד: שיעור החיוביות לעמילואיד בגיל 50 ובגיל 90 והגילים לפי APOE, כולם מנתוני חתך. משורטט: כל העקומות למעלה, והקווים הישרים בין נקודות הקצה שנמדדו. העדכון של 2013 עצמו שינה את הסדר של חלק מהסמנים, כך שהסדר הוא מודל ולא חוק. [[Jansen2015,Jack2013]]',
   pt:'רק התרשים התחתון מכיל מספרים שנמדדו. העקומות העליונות הן שרטוט של הסדר הרגיל.'}}];
const CA_CLI=['נשא גן, בדיקות תקינות','ללא תסמינים','ירידה עדינה','פגיעה, שלב מוקדם','דמנציה קלה','דמנציה בינונית','דמנציה קשה'];
const CA_CLI_S=['גן, בדיקות תקינות','ללא תסמינים','ירידה עדינה','פגיעה, מוקדם','דמנציה קלה','דמנציה בינונית','דמנציה קשה'];
const CA_PRE=[['ללא תסמינים, עמילואיד בלבד',1,0,1],['נשא גן, בדיקות תקינות',0,0,0],['ירידה עדינה, טאו טמפורלי',1,1,2],['דמוי MCI, עמילואיד בלבד',1,0,3],['דמנציה קלה, טאו גבוה',1,3,4],['בעיות זיכרון, סמנים ביולוגיים תקינים',0,0,3]];
inits.cascade=()=>{
  const svg=$('#caSvg'),rg=$('#caT');let dom=true,lastN='';
  function draw(t){
    const N=vb(svg,dom?'720 300':'720 540',dom?'400 452':'400 744');
    const L=N?{x0:40,x1:388,yT:64,yB:270,tick:26,bd:40,ph:56,axl:286,axt:304,lg:i=>[i%2?206:16,330+Math.floor(i/2)*34],lgw:'n'}
             :{x0:60,x1:520,yT:64,yB:250,tick:30,bd:44,ph:58,axl:266,axt:286,lg:i=>[540,40+i*30],lgw:'w'};
    const X=u=>lerp(L.x0,L.x1,u),V=v=>lerp(L.yB,L.yT,v);
    const yr=-30+38*t, uOf=y=>(y+30)/38;
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    s+=`<rect x="${L.x0}" y="${L.yT}" width="${L.x1-L.x0}" height="${L.yB-L.yT}" style="fill:var(--panel)"/>`;
    s+=`<text transform="translate(${N?14:24} ${(L.yT+L.yB)/2}) rotate(-90)" class="t-xs t-mid">חריגות · הצורה סכמטית</text>`;
    const C=dom?CA_DOM:CA_SPO,val=dom?(c,u)=>CA_SIG(-30+38*u,c.m,c.k):(c,u)=>c.f(u);
    if(dom){
      // measured onset years on the top row
      const MY=[[-25,[1]],[-15,[2,3,4]],[-10,[5,6]],[-5,[6]],[3,[]]];
      s+=`<text x="${N?4:8}" y="${L.tick}" class="t-xs" style="fill:var(--ink)">נמדד</text>`;
      MY.forEach(([y,ns])=>{const x=X(uOf(y)),on=yr>=y;
        s+=`<path d="M${f1(x)} ${L.yT} V${L.yB}" style="stroke:${y===3?'var(--rose)':'var(--muted)'};stroke-width:${y===3?1.6:1};stroke-dasharray:${y===3?'6 4':'2 4'}"/>`;
        const lab=y===3?'\u2067\u2066+3\u2069 דמנציה':y===-5?'\u2067\u2066−5\u2069 כללית':'−'+(-y);
        s+=`<text x="${f1(x)}" y="${L.tick}" class="t-xs t-mid" style="fill:var(--ink);font-weight:${on?700:500}">${lab}</text>`;
        ns.forEach((n,j)=>{const bx=x+(j-(ns.length-1)/2)*(N?13:15),c=C[n-1];
          s+=`<circle cx="${f1(bx)}" cy="${L.bd}" r="${N?6:7}" style="fill:${on?'var(--panel)':'var(--field)'};stroke:${c.c};stroke-width:${on?2:1};opacity:${on?1:.45}"/><text x="${f1(bx)}" y="${L.bd+3.5}" class="t-xs t-mid" style="fill:var(--ink);opacity:${on?1:.45}">${n}</text>`});
      });
      s+=`<path d="M${f1(X(uOf(0)))} ${L.yB} v6" style="stroke:var(--ink);stroke-width:2"/>`;
      for(let y=-30;y<=5;y+=5)s+=`<text x="${f1(X(uOf(y)))}" y="${L.axl}" class="t-xs t-mid" style="${y===0?'fill:var(--ink);font-weight:700':''}">${y>0?'+'+y:y===0?'0':'−'+(-y)}</text>`;
      s+=`<text x="${(L.x0+L.x1)/2}" y="${L.axt}" class="t-xs t-mid">${N?'\u2067שנים ממועד ההופעה הצפוי (DIAN)':'\u2067שנים ממועד הופעת התסמינים הצפוי (0 = גיל ההופעה אצל ההורה) · DIAN'}</text>`;
    }else{
      const th=V(.1);
      s+=`<path d="M${L.x0} ${f1(th)} H${L.x1}" style="stroke:var(--muted);stroke-dasharray:3 3"/><text x="${L.x0+4}" y="${f1(th-4)}" class="t-xs">סף</text>`;
      const a=X(.17),b=X(.72),bo=ramp(t,.6,.7);
      s+=`<g style="opacity:${f1(Math.max(.3,bo))}"><path d="M${f1(a)} ${L.bd+4} v-8 H${f1(b)} v8" style="fill:none;stroke:var(--ink);stroke-width:1.4"/><text x="${f1((a+b)/2)}" y="${L.bd-8}" class="t-xs t-mid" style="fill:var(--ink)">${N?'\u2067כ־20 עד 30 שנה לדמנציה (מוסק)':'\u2067כ־20 עד 30 שנה מחיוביות לעמילואיד ועד דמנציה (מוסק)'}</text></g>`;
      s+=`<text x="${(L.x0+L.x1)/2}" y="${L.axl}" class="t-xs t-mid">זמן, סכמטי וללא שנים →</text>`;
    }
    // curves: whole shape faint, drawn part solid up to the playhead
    C.forEach(c=>{const fn=u=>val(c,u);
      s+=`<path d="${pathFn(fn,L.x0,L.x1,L.yB,L.yT,140)}" style="fill:none;stroke:${c.c};stroke-width:${c.w};stroke-dasharray:${c.d||'none'};opacity:.16"/>`;
      if(t>0.004)s+=`<path d="${pathFn(u=>fn(u*t),L.x0,X(t),L.yB,L.yT,Math.max(4,Math.round(140*t)))}" style="fill:none;stroke:${c.c};stroke-width:${c.w};stroke-dasharray:${c.d||'none'};stroke-linecap:round"/>`;
      const v=fn(t);s+=`<circle cx="${f1(X(t))}" cy="${f1(V(v))}" r="3.5" style="fill:${c.c}"/>`;
      // number badge at the curve's half-way point, once the playhead passes it
      const um=dom?uOf(c.m):c.m;
      if(t>=um){s+=`<circle cx="${f1(X(um))}" cy="${f1(V(.5))}" r="${N?6.5:7.5}" style="fill:var(--panel);stroke:${c.c};stroke-width:2"/><text x="${f1(X(um))}" y="${f1(V(.5)+3.5)}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">${c.n}</text>`}});
    // playhead
    s+=`<path d="M${f1(X(t))} ${L.yT-2} V${L.yB}" style="stroke:var(--ink);stroke-width:1.5"/><text x="${f1(clamp(X(t),L.x0+30,L.x1-30))}" y="${L.ph}" class="t-xs t-mid" style="fill:var(--ink)">${dom?'\u2067עכשיו \u2066'+(yr>=0?'+':'')+Math.round(yr)+'\u2069 שנים':'עכשיו'}</text>`;
    // legend
    C.forEach((c,i)=>{const [x,y]=L.lg(i);
      s+=`<path d="M${x} ${y-4} h22" style="stroke:${c.c};stroke-width:${c.w};stroke-dasharray:${c.d||'none'}"/><text x="${x+28}" y="${y}" class="t-sm" style="fill:var(--ink)">${c.n} ${c.l}</text>`;
      s+=`<text x="${x+28}" y="${y+13}" class="t-xs">${dom?(c.sub||'\u2067חריג החל מ־'+(-c.y0)+' שנה לפני'):c.sub}</text>`});
    if(dom){const [x,y]=L.lg(6);s+=`<path d="M${x} ${y-4} h22" style="stroke:var(--rose);stroke-width:1.6;stroke-dasharray:6 4"/><text x="${x+28}" y="${y}" class="t-sm" style="fill:var(--ink)">עמידה בקריטריונים לדמנציה</text><text x="${x+28}" y="${y+13}" class="t-xs">\u2067\u2066+3\u2069 שנים (נמדד)</text>`}
    else{const [x,y]=L.lg(5);s+=`<path d="M${x} ${y-4} h22" style="stroke:var(--muted);stroke-dasharray:3 3"/><text x="${x+28}" y="${y}" class="t-sm" style="fill:var(--ink)">סף הגילוי</text><text x="${x+28}" y="${y+13}" class="t-xs">מתחתיו, הבדיקות נראות תקינות</text>`}
    // sporadic: measured amyloid positivity by age (Jansen 2015)
    if(!dom){const I=N?{y0:466,y1:586,tk:600,tt:616,ti:452,lg:[16,638],st:692,sl:714}:{y0:320,y1:440,tk:456,tt:472,ti:306,lg:[540,330],st:494,sl:516};
      const AX=a=>lerp(L.x0,L.x1,(a-40)/55),AY=p=>lerp(I.y1,I.y0,p/80),age=lerp(50,90,t);
      s+=`<text x="${L.x0}" y="${I.ti}" class="t-sm">חיוביות לעמילואיד לפי גיל · נמדד</text>`;
      s+=`<rect x="${L.x0}" y="${I.y0}" width="${L.x1-L.x0}" height="${I.y1-I.y0}" style="fill:var(--panel)"/>`;
      [0,20,40,60,80].forEach(p=>{s+=`<path d="M${L.x0} ${f1(AY(p))} H${L.x1}" class="grid"/><text x="${L.x0-4}" y="${f1(AY(p)+3)}" class="t-xs t-end">${p}%</text>`});
      [40,50,60,70,80,90].forEach(a=>{s+=`<text x="${f1(AX(a))}" y="${I.tk}" class="t-xs t-mid">${a}</text>`});
      s+=`<text x="${(L.x0+L.x1)/2}" y="${I.tt}" class="t-xs t-mid">\u2067גיל (שנים) · מטא־אנליזה של נתוני חתך</text>`;
      [['normal',10,44,'var(--sage)'],['MCI',27,71,'var(--violet)']].forEach(([l,a,b,c])=>{
        s+=`<path d="M${f1(AX(50))} ${f1(AY(a))} L${f1(AX(90))} ${f1(AY(b))}" style="stroke:${c};stroke-width:2.4;stroke-dasharray:6 4"/>`;
        [[50,a],[90,b]].forEach(([x,v])=>{s+=`<circle cx="${f1(AX(x))}" cy="${f1(AY(v))}" r="5" style="fill:${c}"/><text x="${f1(AX(x)+(x===50?-8:8))}" y="${f1(AY(v)-7)}" class="t-xs ${x===50?'t-end':''}" style="fill:var(--ink)">${v}%</text>`})});
      s+=`<path d="M${f1(AX(age))} ${I.y0} V${I.y1}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:2 3"/><text x="${f1(AX(age))}" y="${I.y0-4}" class="t-xs t-mid" style="fill:var(--ink)">גיל ${Math.round(age)}</text>`;
      const LG=N?[[0,'\u2067— קוגניציה תקינה: 10% בגיל 50, 44% בגיל 90'],[16,'\u2067— MCI: ‏27% בגיל 50, 71% בגיל 90'],[30,'\u2067קווים מקווקווים בין נקודות הקצה: סכמטי']]
                :[[0,'נקודות קצה שנמדדו'],[20,'\u2067— קוגניציה תקינה'],[33,'\u2067  10% בגיל 50, 44% בגיל 90'],[53,'\u2067— MCI'],[66,'\u2067  27% בגיל 50, 71% בגיל 90'],[90,'קווים מקווקווים בין'],[103,'\u2067נקודות הקצה: סכמטי']];
      LG.forEach(([dy,l],i)=>{const col=l.includes('MCI')?'var(--violet)':l.includes('תקינה')?'var(--sage)':'var(--muted)';s+=`<text x="${I.lg[0]}" y="${I.lg[1]+dy}" class="${!N&&i===0?'t-sm':'t-xs'}" style="fill:${col};white-space:pre">${l}</text>`});
      // APOE strip: age at which 15% of cognitively normal people were amyloid-positive
      s+=`<text x="${N?16:L.x0}" y="${I.st}" class="t-xs" style="fill:var(--ink)">${N?'\u2067הגיל שבו 15% חיוביים לעמילואיד, לפי APOE':'\u2067הגיל שבו 15% מהאנשים התקינים קוגניטיבית היו חיוביים לעמילואיד, לפי גנוטיפ APOE'}</text>`;
      s+=`<path d="M${L.x0} ${I.sl} H${L.x1}" class="axis" style="stroke:var(--muted)"/>`;
      [['ε4/ε4',40,1,'s'],['ε2/ε4',50,0,'m'],['ε3/ε4',55,1,'m'],['ε3/ε3',65,0,'m'],['ε2/ε3',95,1,'e']].forEach(([g,a,up,an])=>{const x=AX(a);
        s+=`<circle cx="${f1(x)}" cy="${I.sl}" r="5" style="fill:var(--amber)"/><text x="${f1(x)}" y="${up?I.sl-9:I.sl+17}" class="t-xs ${an==='m'?'t-mid':an==='e'?'t-end':''}" style="fill:var(--ink)">${g} · ${a}</text>`});
    }
    svg.innerHTML=s;
    const p=phaseOf(CA_STEPS,t);setSt(p);
    const st=CA_STEPS[p],S={...st[dom?'dom':'spo'],t:st.t};
    const ab=dom?C.filter(c=>yr>=c.y0).map(c=>c.l.replace(/ \(.*\)/,'')):C.filter(c=>c.f(t)>.1).map(c=>c.l.replace(/ \(.*\)/,''));
    const rd=`${dom?'שעון <b>\u2066'+(yr>=0?'+':'')+Math.round(yr)+'\u2069 שנים</b> · ':''}חריג כעת: <b>${ab.length?ab.join(', '):'עדיין שום דבר'}</b>${dom&&yr>=3?' · <b>עמידה בקריטריונים לדמנציה</b>':''}`;
    $('#caRead').innerHTML=rd;
    const html=noteHTML(S)+`<p class="readout">${rd}</p>`;if(html!==lastN){$('#caNote').innerHTML=html;lastN=html}
    $('#caCap').textContent=dom?'נמדד: שנות ההופעה בשורה העליונה וקו הדמנציה ב־\u2066+3\u2069 (DIAN, נתוני חתך). סכמטי: הצורה של כל עקומה.':'סכמטי: כל עקומה בתרשים העליון. נמדד: נקודות הקצה והגילים לפי APOE בתרשים התחתון (Jansen 2015, נתוני חתך).';
  }
  const stop=playWire(rg,$('#caPlay'),draw,18000,'הפעלה חוזרת','cascade');
  const setSt=stepWire($('#caSteps'),CA_STEPS,rg,draw,stop);
  const setDom=v=>{dom=v;$('#caDom').setAttribute('aria-pressed',v);$('#caSpo').setAttribute('aria-pressed',!v);lastN='';draw(+rg.value)};
  $('#caDom').onclick=()=>setDom(true);$('#caSpo').onclick=()=>setDom(false);

  /* ---------------- 2024 staging map ---------------- */
  const msv=$('#caMap');let amy=1,tau=0,cli=1,ring=null,stopR=null;
  $('#caPre').insertAdjacentHTML('beforeend',CA_PRE.map((p,i)=>`<button class="btn" data-pre="${i}">${p[0]}</button>`).join(''));
  $('#caAmy').insertAdjacentHTML('beforeend',['תקין','חריג'].map((l,i)=>`<button class="btn" data-amy="${i}" aria-pressed="${i===amy}">${l}</button>`).join(''));
  $('#caTau').insertAdjacentHTML('beforeend',['ללא','טמפורלי מדיאלי','ניאוקורטיקלי בינוני','ניאוקורטיקלי גבוה'].map((l,i)=>`<button class="btn" data-tau="${i}" aria-pressed="${i===tau}">${l}</button>`).join(''));
  $('#caCli').insertAdjacentHTML('beforeend',CA_CLI.map((l,i)=>`<button class="btn" data-cli="${i}" aria-pressed="${i===cli}" aria-label="שלב קליני ${i}: ${l}">${i} · ${l}</button>`).join(''));
  const state=()=>{const bio=amy?['A','B','C','D'][tau]:(tau?'nonAD':'none');const col=amy?tau+1:0;const ec=amy&&cli===0?1:cli;return{bio,col,ec}};
  function drawM(){
    const N=vb(msv,'720 340','400 360'),{bio,col,ec}=state();
    const L=N?{x0:74,cw:64,top:50,rh:42,hl:22,hs:36,rl:66}:{x0:170,cw:104,top:64,rh:38,hl:24,hs:40,rl:160};
    const CX=c=>L.x0+c*L.cw+L.cw/2,RY=r=>L.top+r*L.rh+L.rh/2;
    let s=`<defs><pattern id="caHatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0 V6" style="stroke:var(--line);stroke-width:2"/></pattern></defs><rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    const HD=N?[['–','ללא'],['A','עמילואיד'],['B','\u2067טאו MTL'],['C','טאו בינוני'],['D','טאו גבוה']]
              :[['–','אין סמן','\u2067ביולוגי של AD'],['A','עמילואיד חיובי,','\u2067בלי טאו ב־PET'],['B','טאו: טמפורלי','מדיאלי'],['C','טאו ניאוקורטיקלי','בינוני'],['D','טאו ניאוקורטיקלי','גבוה']];
    HD.forEach((h,c)=>{s+=`<text x="${CX(c)}" y="${L.hl}" class="t-big t-mid">${h[0]}</text><text x="${CX(c)}" y="${L.hs}" class="t-xs t-mid">${h[1]}</text>${h[2]?`<text x="${CX(c)}" y="${L.hs+12}" class="t-xs t-mid">${h[2]}</text>`:''}`});
    if(!N)s+=`<text x="${L.rl}" y="${L.hl}" class="t-xs t-end">ביולוגי →</text><text x="${L.rl}" y="${L.hs+12}" class="t-xs t-end">קליני ↓</text>`;
    const diag={1:1,2:2,3:3,4:4,5:4,6:4};
    for(let r=0;r<7;r++){s+=`<text x="${L.rl}" y="${RY(r)+4}" class="t-xs t-end" style="fill:${r===ec?'var(--ink)':'var(--muted)'};font-weight:${r===ec?700:500}">${N?'שלב '+r:r+' · '+CA_CLI_S[r]}</text>`;
      for(let c=0;c<5;c++){const x=L.x0+c*L.cw,y=L.top+r*L.rh,dg=diag[r]===c,hat=c===0&&r>0,st0=c===0&&r===0;
        s+=`<rect x="${x}" y="${y}" width="${L.cw}" height="${L.rh}" style="fill:${dg?'var(--sage-soft)':hat?'url(#caHatch)':'var(--panel)'};stroke:var(--line)"/>`;
        if(dg||st0)s+=`<text x="${x+L.cw/2}" y="${y+L.rh/2+4}" class="t-xs t-mid" style="fill:var(--sage)">${st0?'0':r+['','A','B','C','D'][c]}</text>`}}
    s+=`<path d="M${CX(1)} ${RY(1)} L${CX(2)} ${RY(2)} L${CX(3)} ${RY(3)} L${CX(4)} ${RY(4)} L${CX(4)} ${RY(6)}" style="fill:none;stroke:var(--sage);stroke-width:1.5;stroke-dasharray:4 4;opacity:.7"/>`;
    const tgt=[CX(col),RY(ec)];if(!ring)ring=tgt;
    const code=bio==='none'?(ec===0?'0':'—'):bio==='nonAD'?'A−T+':ec+bio;
    s+=`<rect x="${f1(ring[0]-L.cw/2+3)}" y="${f1(ring[1]-L.rh/2+3)}" width="${L.cw-6}" height="${L.rh-6}" rx="8" style="fill:var(--rose-soft);stroke:var(--rose);stroke-width:3"/><text x="${f1(ring[0])}" y="${f1(ring[1]+5)}" class="t-lbl t-mid" style="fill:var(--rose)">${code}</text>`;
    msv.innerHTML=s;
  }
  function noteM(){
    const {bio,col,ec}=state();let k,t,aa,iwg,off='';
    const HR={A:'1.5',B:'5.6',C:'39.9',D:'39.9'};
    if(bio==='none'&&cli===0){k='שלב קליני 0';t='שלב 0: גן, ועדיין שום דבר מדיד';
      aa='שלב 0 מיועד לנשא ללא תסמינים של גן דטרמיניסטי, שהסמנים הביולוגיים שלו עדיין תקינים, למשל נשא צעיר של PSEN1. [[Jack2024]]';
      iwg='הסיכום של IWG שבו השתמשנו כאן אינו מציין איך הוא מסווג נשאי גנים שהסמנים הביולוגיים שלהם תקינים. [[Dubois2024]]'}
    else if(bio==='none'){k='אף סמן Core 1 אינו חריג';t='לא אלצהיימר לפי הקריטריונים האלה';
      aa='כשאף סמן Core 1 אינו חריג, הקריטריונים של 2024 לא יאבחנו מחלת אלצהיימר; תסמינים יכוונו לחיפוש סיבות אחרות. [[Jack2024]] ראו <a href="#ddx" data-go="ddx">האבחנה המבדלת</a>.';
      iwg='בלי סמנים ביולוגיים של AD, גם כאן זו לא מחלת אלצהיימר. [[Dubois2024]]'}
    else if(bio==='nonAD'){k='עמילואיד תקין, טאו חריג';t='A−T+\u200e: לא על רצף האלצהיימר';
      aa='השלבים הביולוגיים A עד D מתחילים בעמילואיד חריג. המסגרת של 2018 כינתה פרופילים של עמילואיד תקין וטאו חריג "שינוי פתולוגי שאינו של אלצהיימר". [[Jack2018,Jack2024]]';
      iwg='לפי הסמנים הביולוגיים האלה, זו לא מחלת אלצהיימר. [[Dubois2024]]'}
    else{k='שלב משולב '+ec+bio;t=ec<=1?'סמנים ביולוגיים בלבד, ללא תסמינים':ec===2?'ירידה עדינה עם סמנים ביולוגיים':'תסמינים עם סמנים ביולוגיים של אלצהיימר';
      aa=`מחלת אלצהיימר, שלב משולב ${ec}${bio}. תוצאה חריגה אחת מסוג Core 1 מספיקה לאבחנה. [[Jack2024]]`+(cli===0?' שלב 0 מחייב סמנים ביולוגיים תקינים, ולכן עם עמילואיד חריג האדם הזה נמצא בשלב קליני 1.':'');
      if(ec===1)aa+=` אצל אנשים ללא פגיעה קוגניטיבית, יחס הסיכונים להתקדמות לדמנציה בהשוואה ל־A−T−\u200e היה 1.5 בשלב A,\u200f 5.6 בטאו טמפורלי מדיאלי ו־39.9 בטאו ניאוקורטיקלי; בשלב של האדם הזה הוא <b>${HR[bio]}</b>. קבוצת העבודה עדיין ממליצה שלא לבצע בדיקות אבחון לאנשים ללא פגיעה קוגניטיבית מחוץ למחקר. [[Jack2024]]`;
      iwg=ec<=1&&bio==='A'?'"בסיכון למחלת אלצהיימר", ולא AD. אנשים עם עמילואיד בלבד, ורוב האנשים האחרים שהסמנים הביולוגיים שלהם חיוביים והקוגניציה שלהם תקינה, צריכים להיקרא "בסיכון"; המונח "AD פרה־תסמיני" שמור לדפוסים מסוימים המראים שהתסמינים קרובים. [[Dubois2024]]'
        :ec<=1?'בדרך כלל "בסיכון למחלת אלצהיימר". IWG שומרת את המונח "AD פרה־תסמיני" לדפוסים מסוימים של סמנים ביולוגיים המראים שהתסמינים קרובים; הסיכום שבו השתמשנו כאן אינו מפרט אילו דפוסים עומדים בכך, ולכן האדם הזה יכול להיכלל תחת כל אחת משתי התוויות. [[Dubois2024]]'
        :ec===2?'ירידה עדינה נמצאת על הגבול. הסיכום של IWG שבו השתמשנו כאן אינו מציין במדויק איך היה מסווג את השלב הזה. [[Dubois2024]]'
        :'תסמינים יחד עם סמנים ביולוגיים של אלצהיימר מתאימים להגדרה הקלינית־ביולוגית של IWG למחלת אלצהיימר. [[Dubois2024]]';
      const exp={1:1,2:2,3:3,4:4,5:4,6:4}[ec];
      if(col<exp)off='מחוץ לאלכסון: התסמינים חמורים יותר ממה שהביולוגיה מנבאת. קבוצת העבודה מציינת שלאנשים כאלה יש לעתים קרובות פתולוגיה נלווית. [[Jack2024]] בפיילוט במרפאת זיכרון זה היה המצב אצל 34.7%. [[Lu2024]]';
      else if(col>exp)off='מחוץ לאלכסון: המצב טוב יותר ממה שהביולוגיה מנבאת, מה שעשוי לשקף רזרבה קוגניטיבית או חוסן. [[Jack2024]] בפיילוט במרפאת זיכרון זה היה המצב אצל 8.8%. [[Lu2024]]';
      else off='על האלכסון הצפוי. בפיילוט במרפאת זיכרון, השלב הקליני והשלב הביולוגי תאמו אצל 56.5% מהאנשים. [[Lu2024]]'}
    $('#caMapNote').innerHTML=`<div class="kicker">${k}</div><h4>${t}</h4><div class="ca-two"><p class="aa"><b>איגוד האלצהיימר 2024.</b> ${aa}</p><p class="iwg"><b>IWG 2024.</b> ${iwg}</p></div>${off?`<p>${off}</p>`:''}<p><b>במה הן מסכימות:</b> שתיהן מקבלות את אותם סמנים ביולוגיים, ושתיהן ממליצות שלא לבצע בדיקות שגרתיות לאנשים ללא תסמינים מחוץ למחקר. הן חלוקות על התווית, לא על הביולוגיה. [[Jack2024,Dubois2024]]</p><div class="pt"><b>במילים פשוטות</b>שתי קבוצות מומחים קוראות את אותן תוצאות בדיקה. אחת אומרת שלאדם עם עמילואיד וללא תסמינים יש מחלת אלצהיימר בשלב מוקדם; השנייה אומרת שהאדם הזה נמצא בסיכון.</div><div class="hook"><b>לבחינה</b>AA 2024: שלב ביולוגי (A–D לפי התפשטות הטאו ב־PET) × שלב קליני (0 עד 6), למשל "2B".&rlm; IWG 2024: סמנים ביולוגיים חיוביים אך קוגניציה תקינה = "בסיכון", ולא AD.</div>`;
  }
  function setM(a,ta,c){const from=ring;amy=a;tau=ta;cli=c;
    $$('[data-amy]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.amy===amy));
    $$('[data-tau]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.tau===tau));
    $$('[data-cli]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.cli===cli));
    noteM();ring=null;drawM();const to=ring;
    if(from&&to&&stopR==null){ring=from;stopR=animate(450,p=>{const e=ease(p);ring=[lerp(from[0],to[0],e),lerp(from[1],to[1],e)];drawM()},()=>{stopR=null;ring=null;drawM()})}
    else{if(stopR){stopR();stopR=null}ring=null;drawM()}}
  $('#m-cascade .ca-pick').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
    if(b.dataset.pre!=null){const P=CA_PRE[+b.dataset.pre];setM(P[1],P[2],P[3])}
    else if(b.dataset.amy!=null)setM(+b.dataset.amy,tau,cli);
    else if(b.dataset.tau!=null)setM(amy,+b.dataset.tau,cli);
    else if(b.dataset.cli!=null)setM(amy,tau,+b.dataset.cli)});
  const prevR=redraws.cascade;redraws.cascade=()=>{prevR&&prevR();ring=null;drawM()};
  noteM();drawM();draw(+rg.value);
};
