
/* =============== 1.4 attack =============== */
const AT_SITES={
 perit:{n:'בטן (דלקת הצפק)',cav:'חלל הצפק',lay:'מזותל',dot:[30,62],
  txt:'סוג ההתקף השכיח ביותר. כאב בטן מפושט או ממוקד, התגוננות (guarding) ורגישות בהרפיה (rebound), לעיתים חסימת מעיים שיתוקית (ileus) עם עצירות. דלקת הצפק (פריטוניטיס) מופיעה ביותר מ־90% מהמטופלים (93.7% ברישום הטורקי של 2,838 מטופלים). היא עלולה להיות בלתי ניתנת להבחנה מ"בטן כירורגית"; בסדרה ישראלית אחת 40% מהמטופלים עברו כריתת תוספתן, ורוב התוספתנים שהוצאו לא היו מודלקים. [[Tunca2005,Tufan2020,Lidar2008]]',
  pt:'כאב בטן חזק עם חום שנראה כמו מצב חירום, ואז דועך בתוך כשלושה ימים.',
  hook:'"בטן כירורגית" חוזרת עם חום, שחולפת מעצמה בתוך 1–3 ימים: חשבו על FMF. דלקת צפק סטרילית חוזרת עלולה להשאיר הידבקויות.'},
 pleura:{n:'חזה (דלקת קרום הריאה)',cav:'החלל הפלאורלי',lay:'מזותל',dot:[24,44],
  txt:'דלקת קרום הריאה (פלאוריטיס) פוגעת בכשליש מהמטופלים (31.2% ברישום הטורקי). זהו כאב חזה פתאומי, בדרך כלל חד־צדדי, שמחמיר בנשימה, לעיתים עם תפליט קטן, וחולף בתוך 1–3 ימים. [[Tunca2005,Tufan2020]]',
  pt:'כאב חד בצד אחד של החזה, שמחמיר כשנושמים פנימה.',
  hook:'כאב פלאוריטי חד־צדדי עם חום, שחוזר וחולף מעצמו.'},
 joint:{n:'מפרק (דלקת פרקים)',cav:'חלל המפרק',lay:'סינוביום',dot:[24,104],
  txt:'דלקת פרקים פוגעת בערך במחצית מהמטופלים (47.4% ברישום הטורקי). לרוב מדובר במפרק גדול אחד ברגל (ברך, קרסול, ירך) עם תפליט סטרילי אך דלקתי, שעלול לחקות דלקת פרקים ספטית. התקפי מפרקים מגיעים לשיא בתוך 1–3 ימים ושוככים בתוך כשבוע, לעיתים עד שבועיים. דלקת פרקים ממושכת מופיעה בפחות מ־5%. [[Tunca2005,Tufan2020,PRINTO2016]]',
  pt:'מפרק גדול אחד, לרוב ברך או קרסול, מתנפח וכואב, ואחר כך נרגע.',
  hook:'<b>דלקת חד־מפרקית</b> חריפה של מפרק גדול בגפה התחתונה, עם תפליט נויטרופילי סטרילי.'},
 scrot:{n:'שק האשכים',cav:'TUNICA VAGINALIS',lay:'מזותל',dot:[30,80],
  txt:'דלקת של ה־tunica vaginalis, כיס של צפק, גורמת לשק אשכים כואב ונפוח. בסדרה אחת של 175 בנים עם FMF, ל־9% היו התקפים בשק האשכים שנמשכו בין 8 שעות ל־5 ימים; אצל רבע מהם זה היה הסימן הראשון ל־FMF, ו־38% עברו ניתוח. [[Majeed2000]]',
  pt:'אצל בנים, שק אשכים כואב ונפוח שעלול להיראות כמו מצב חירום.',
  hook:'ה־tunica vaginalis היא צפק שירד יחד עם האשך, ולכן גם היא משטח סרוזי.'},
 skin:{n:'עור (אודם דמוי שושנה)',cav:'אפידרמיס',lay:'קרום הבסיס',dot:[34,116],
  txt:'רובד אדום ורגיש דמוי שושנה (erysipelas) בשוק, בקרסול או בגב כף הרגל, שמופיע לעיתים קרובות אחרי הליכה ממושכת או נסיעה. הוא הופיע ב־20.9% מהרישום הטורקי ובכ־7.5% מקוהורט ילדים אחד, שבו היה קשור לדלקת פרקים, להומוזיגוטיות ל־M694V ולצורך במינוני קולכיצין גבוהים יותר. [[Tunca2005,Tufan2020,GezginYildirim2020]]',
  pt:'כתם אדום, כואב וחם בשוק, שנראה כמו זיהום בעור אבל אינו זיהום.',
  hook:'אודם דמוי שושנה (ELE) הוא סימן העור האופייני ל־FMF, והוא שכיח יותר עם M694V.'}
};
const AT_VARS={
 typ:{n:'התקף טיפוסי',axis:120,unit:'שעות',fmt:h=>`${Math.round(h)} h`,
  steps:[{from:0,at:.01,k:'שעה 0',t:'גורם מעורר',txt:'להתקפים רבים אין סיבה ברורה. בשאלונים, מטופלים מציינים לרוב לחץ רגשי, קור, עייפות ווסת. המחקר החזק ביותר, במערך case-crossover ב־104 מטופלים ארמנים, מצא שכל אירוע מלחיץ העלה את הסיכוי להתקף כעבור יומיים בכ־70%, ואילו פעילות גופנית מאומצת וארוחות שומניות לא העלו אותו. בסקר של נשים עם FMF, 79% דיווחו על התקפים בזמן הווסת, בעיקר התקפי בטן שהן ידעו להבחין בינם לבין כאבי מחזור. כמחצית מכלל המטופלים חשים בסימנים מקדימים (פרודרום), שנמשכים בממוצע כ־20 שעות. [[Karadag2013,Parlar2024,Yenokyan2012,Guzelant2017,Lidar2006]]',pt:'התקפים רבים מגיעים בלי שום אזהרה. לחץ נפשי הוא הגורם המעורר המתועד ביותר; גם קור, עייפות ווסת מדווחים לעיתים קרובות.',hook:'גורמים מעוררים מורידים את הסף להפעלה של פירין שכבר נוטה להגיב יתר על המידה. הם אינם גורמים למחלה.'},
   {from:2/120,at:5/120,k:'שעות 1–8',t:'החום והכאב מתחילים',txt:'החום מתחיל בפתאומיות ומגיע לשיא בתוך שעות, עם כאב באתר סרוזי אחד. IL-1β הוא פירוגן אנדוגני חזק: בבני אדם, מינונים של ננוגרמים לקילוגרם גורמים לחום. [[Tufan2020,Dinarello2011]]',pt:'החום והכאב מופיעים מהר, בתוך שעות.',hook:'חום + סרוזיטיס (דלקת קרומים) באתר אחד בכל פעם הוא הדפוס הרגיל.'},
   {from:8/120,at:16/120,k:'שעות 8–24',t:'הצפה של נויטרופילים',txt:'נויטרופילים יוצאים בהמוניהם מהנימים אל החלל הסרוזי ויוצרים תפליט סטרילי. הכאב והסימנים מגיעים לשיא. CRP ו־SAA עולים בחדות כשהכבד מגיב ל־IL-1β ול־IL-6; בקוהורט אחד החציונים בזמן התקף היו SAA 693 mg/L ו־CRP 115 mg/L. [[Lachmann2006,Dinarello2011]]',pt:'מספר עצום של תאי דם לבנים נוהר פנימה. הכאב מגיע לשיא, וסמני הדלקת בדם מטפסים.',hook:'הנוזל <b>סטרילי</b>: נויטרופילים, בלי חיידקים. התרביות שליליות.'},
   {from:24/120,at:40/120,k:'שעות 24–72',t:'חלוף',txt:'ההתקף נפסק מעצמו, בדרך כלל בתוך 12–72 שעות, בלי אנטיביוטיקה. קריטריוני Livneh מגדירים התקף טיפוסי כהתקף עם חום (≥38 °C) שנמשך 12 שעות עד 3 ימים. CRP ו־SAA מפגרים אחרי התסמינים. [[Livneh1997,Tufan2020]]',pt:'הוא חולף מעצמו, בדרך כלל בתוך שלושה ימים.',hook:'חולף מעצמו, 12–72 h: משך ההתקף עצמו הוא רמז אבחנתי (TRAPS נמשך זמן רב יותר, PFAPA חוזר בדיוק של שעון).'},
   {from:72/120,at:100/120,k:'אחרי 72 h',t:'בין התקפים',txt:'רוב המטופלים מרגישים טוב בין התקפים. חציון ה־SAA בין התקפים היה 6 mg/L בקוהורט אחד, אבל רק 29% מהמדידות היו תקינות לגמרי (<3 mg/L), ו־13% היו מעל 50 mg/L. עד כמה דלקת תת־קלינית נראית שכיחה תלוי מאוד בסמן ובערך הסף שבהם משתמש המחקר. SAA מוגבר באופן מתמשך הוא מה שמניע עמילואידוזיס. [[Lachmann2006,Tufan2020,Lachmann2007]]',pt:'בדרך כלל מרגישים שוב כרגיל. בדיקות דם בין התקפים מראות אם דלקת סמויה ממשיכה.',hook:'בודקים CRP/SAA <b>בין</b> התקפים: עלייה מתמשכת פירושה שליטה לא מספקת, גם אם ההתקפים נראים נדירים.'}],
  curves:{temp:h=>ramp(h,1,7)*(1-ramp(h,26,52)),pain:h=>ramp(h,.5,6)*(1-ramp(h,30,66)),crp:h=>{const x=h/40;return h<=0?0:Math.min(1,Math.pow(x,2.2)*Math.exp(2.2*(1-x)))},saa:h=>{const x=h/32;return h<=0?0:Math.min(1,Math.pow(x,2)*Math.exp(2*(1-x)))},neut:h=>ramp(h,2,12)*(1-ramp(h,40,72))}},
 pfm:{n:'מיאלגיה חומית ממושכת',axis:56,unit:'ימים',fmt:d=>`\u2067יום ${Math.round(d)}\u2069`,
  steps:[{from:0,at:.02,k:'ימים 0–3',t:'כאבי שרירים חזקים',txt:'מיאלגיה חומית ממושכת (PFM) היא ביטוי נדיר: כאבי שרירים חזקים ומגבילים עם חום, ESR גבוה מאוד וגלובולינים מוגברים. היא תוארה לראשונה ב־14 מטופלים, ויכולה להופיע גם בזמן טיפול בקולכיצין. בסקירה של 78 ילדים, אצל יותר ממחציתם PFM הייתה הסימן הראשון ל־FMF. [[Langevitz1994,Hospach2024]]',pt:'צורה נדירה עם כאבי שרירים חזקים מאוד וחום, שאינם חולפים בתוך כמה ימים.',hook:'PFM: חום + מיאלגיה (כאבי שרירים) חזקה שנמשכים <b>שבועות</b>, ESR גבוה מאוד, וקולכיצין אינו מונע אותה.'},
   {from:.1,at:.25,k:'שבועות 1–4',t:'שבועות, לא ימים',txt:'ללא טיפול, PFM נמשכה עד כ־6 שבועות בסדרה הראשונה, וסקירות מאוחרות יותר מתארות אירועים של עד כ־10 שבועות, עם בצקת בשרירים ב־MRI. [[Langevitz1994,Tufan2020]]',pt:'ללא טיפול היא עלולה להימשך כשישה שבועות.',hook:'שבועות, לא ימים: משך האירוע הוא שמבדיל PFM מהתקף רגיל.'},
   {from:.6,at:.75,k:'שבועות 4–8',t:'שוככת, ומהר יותר עם סטרואידים',txt:'PFM מגיבה מהר לקורטיקוסטרואידים. בסקירת הילדים סטרואידים הועילו ב־77%, ואנאקינרה הועילה בכל המקרים שלא הגיבו לסטרואידים. [[Langevitz1994,Hospach2024]]',pt:'בדרך כלל הרופאים מטפלים בה בסטרואידים, שגורמים לה לשכוך מהר הרבה יותר.',hook:'אחד המצבים המעטים ב־FMF שבהם גלוקוקורטיקואידים הם טיפול מקובל.'}],
  curves:{temp:d=>ramp(d,0,2)*(1-ramp(d,30,48))*.75,pain:d=>ramp(d,0,1.5)*(1-ramp(d,28,48)),crp:d=>ramp(d,0,5)*(1-ramp(d,34,54)),saa:d=>ramp(d,0,4)*(1-ramp(d,32,52)),neut:d=>ramp(d,0,3)*(1-ramp(d,30,48))*.7}},
 peri:{n:'דלקת קרום הלב',axis:120,unit:'שעות',fmt:h=>`${Math.round(h)} h`,
  steps:[{from:0,at:.03,k:'נדיר',t:'כאב בחזה שמחמיר בשכיבה',txt:'דלקת קרום הלב (פריקרדיטיס) נדירה: 27 מתוך כ־4,000 מטופלים בישראל לאורך 20 שנה, ו־1.4% מהרישום הטורקי. זה עדיין בערך פי עשרה משיעור הרקע. [[Kees1997,Tunca2005]]',pt:'לעיתים נדירות, השק שסביב הלב מודלק למשך כמה ימים.',hook:'פריקרדיטיס חוזרת עם חום באוכלוסייה בסיכון: חשבו על FMF.'},
   {from:24/120,at:40/120,k:'1–3 ימים',t:'חולפת מעצמה',txt:'כל מטופל בסדרה הישראלית עבר 1–3 התקפים של דלקת קרום הלב שנמשכו בממוצע 4.2 ימים, ללא נזק מתמשך. [[Kees1997]]',pt:'היא שוככת בתוך כמה ימים.',hook:'אותה ביולוגיה סרוזית, קרום אחר.'}],
  curves:null}
};
AT_VARS.peri.curves=AT_VARS.typ.curves;
inits.attack=()=>{
  const svg=$('#atSvg'),rg=$('#atT');let site='perit',vk='typ';
  const r=rng(41);const NE=Array.from({length:22},()=>({x:20+r()*270,ph:r(),y:r()}));
  $('#atSites').innerHTML='<span class="kicker">מיקום</span>'+Object.entries(AT_SITES).map(([k,v])=>`<button class="btn" data-site="${k}" aria-pressed="${k===site}">${v.n}</button>`).join('');
  $('#atVars').innerHTML='<span class="kicker">סוג</span>'+Object.entries(AT_VARS).map(([k,v])=>`<button class="btn" data-var="${k}" aria-pressed="${k===vk}">${v.n}</button>`).join('');
  function body(){const S=AT_SITES[vk==='peri'?'pleura':site];const [dx,dy]=vk==='peri'?[28,48]:vk==='pfm'?[30,120]:S.dot;
    return `<g transform="translate(262 10)"><circle cx="30" cy="12" r="9" style="fill:none;stroke:var(--muted);stroke-width:1.5"/><path d="M18 26 h24 l4 50 h-6 l-2 -30 M18 26 l-4 50 h6 l2 -30 M22 72 l-2 52 h6 l4 -44 l4 44 h6 l-2 -52" style="fill:none;stroke:var(--muted);stroke-width:1.5;stroke-linejoin:round"/><circle cx="${dx}" cy="${dy}" r="6" style="fill:var(--terra)"/></g>`}
  function draw(u){
    const V=AT_VARS[vk],S=AT_SITES[site],x=u*V.axis,C=V.curves;
    const joint=site==='joint'&&vk==='typ', sx=joint?.65:1; // joint attacks run longer
    const val=k=>C[k](x*sx);
    const nf=val('neut'),fever=val('temp');
    const N=vb(svg,'720 420','400 960');
    let s=(N?`<g transform="scale(1.212)">`:'')+`<rect x="0" y="0" width="330" height="420" rx="12" style="fill:var(--field)"/>`;
    // tissue scene
    const isSkin=site==='skin'&&vk==='typ';
    const cav=vk==='peri'?'חלל קרום הלב':vk==='pfm'?'שריר':S.cav;
    const redden=nf;
    if(isSkin){
      s+=`<rect x="10" y="40" width="310" height="70" style="fill:var(--cyto)"/><rect x="10" y="40" width="310" height="70" style="fill:var(--bad);opacity:${f1(.35*redden)}"/>`;
      for(let i=0;i<14;i++)s+=`<rect x="${12+i*22}" y="${50+(i%2)*4}" width="20" height="50" rx="4" style="fill:none;stroke:var(--memb);stroke-width:1;opacity:.6"/>`;
      s+=`<text x="16" y="34" class="t-sm">אפידרמיס</text><path d="M10 112 H320" style="stroke:var(--memb);stroke-width:3"/><text x="16" y="132" class="t-sm">דרמיס</text>`;
      s+=`<rect x="10" y="114" width="310" height="230" style="fill:var(--bad);opacity:${f1(.12*redden)}"/>`;
    }else{
      s+=`<rect x="10" y="40" width="310" height="120" style="fill:var(--panel)"/><text x="16" y="34" class="t-sm">${cav}</text>`;
      // exudate
      const ex=vk==='pfm'?0:nf;
      s+=`<rect x="10" y="${f1(160-110*ex)}" width="310" height="${f1(110*ex)}" style="fill:var(--sea);opacity:.18"/>`;
      if(ex>.15)s+=`<text x="240" y="${f1(156-110*ex+18)}" class="t-xs t-end" style="fill:var(--sea)">תפליט סטרילי</text>`;
      if(vk!=='pfm')for(let i=0;i<14;i++)s+=`<rect x="${12+i*22}" y="160" width="20" height="8" rx="4" style="fill:var(--memb)"/>`;
      else for(let i=0;i<6;i++)s+=`<rect x="14" y="${46+i*19}" width="302" height="14" rx="7" style="fill:var(--bad-soft);stroke:var(--bad);stroke-width:.8"/>`;
      s+=`<text x="16" y="186" class="t-sm">${vk==='pfm'?'סיבי שריר':vk==='peri'?'מזותל':S.lay}</text>`;
      s+=`<rect x="10" y="170" width="310" height="174" style="fill:var(--bad);opacity:${f1(.12*redden)}"/>`;
    }
    // capillary
    s+=`<rect x="10" y="280" width="310" height="44" rx="22" style="fill:var(--bad-soft);stroke:var(--bad);stroke-width:2"/><text x="16" y="342" class="t-sm">נימי דם</text>`;
    for(let i=0;i<9;i++){const xx=((i*40+u*2600)%330)+0;s+=`<ellipse cx="${f1(xx)}" cy="${300+(i%3-1)*6}" rx="7" ry="4" style="fill:var(--bad);opacity:.7"/>`}
    // neutrophils leaving vessel toward cavity
    NE.forEach((n,i)=>{const on=clamp(nf*1.25-i/NE.length*.9);if(on<=0)return;const top=isSkin?150:vk==='pfm'?120:90+n.y*60;
      const prog=clamp(on*1.4);const y=lerp(300,top,ease(prog));const xx=n.x+Math.sin((u*40+n.ph*6))*4;s+=neutro(xx,y,9,clamp(on*2))});
    s+=body();
    // fever thermometer
    const T=37+2.8*fever;s+=`<g transform="translate(18 360)"><rect x="0" y="0" width="200" height="12" rx="6" style="fill:var(--panel-2)"/><rect x="0" y="0" width="${f1(200*fever)}" height="12" rx="6" style="fill:var(--terra)"/><text x="0" y="32" class="t-lbl">\u2067טמפרטורה ${T.toFixed(1)} °C\u2069</text></g>`;
    s+=`<text x="16" y="408" class="t-sm">${V.fmt(x)}</text><text x="318" y="408" class="t-xs t-end" style="fill:var(--warn)">להמחשה</text>`;
    if(N)s+='</g>';
    // charts: beside the scene when wide, stacked under it when narrow
    const CX0=N?48:372, CX1=N?392:708, CY=N?548:14;
    const CH=[['temp','חום','var(--terra)'],['pain','כאב','var(--bad)'],['crp','CRP','var(--sea)'],['saa','SAA','var(--gold)']];
    CH.forEach(([k,l,c],i)=>{const y0=CY+i*100,y1=y0+78,x0=CX0,x1=CX1;
      s+=`<line x1="${x0}" x2="${x1}" y1="${y1}" y2="${y1}" class="axis"/><text x="${x0}" y="${y0-2}" class="t-sm" style="fill:${c}">${l.toUpperCase()}</text>`;
      s+=`<path d="${pathFn(v=>C[k](v*V.axis*sx),x0,x1,y1,y0+10)}" style="fill:none;stroke:${c};stroke-width:1.2;opacity:.35"/>`;
      s+=`<path d="${pathFn(v=>v<=u?C[k](v*V.axis*sx):NaN,x0,x1,y1,y0+10).replace(/[ML][^ML]*NaN[^ML]*/g,'')}" style="fill:none;stroke:${c};stroke-width:3"/>`;
      const cx=lerp(x0,x1,u),cy=lerp(y1,y0+10,C[k](x*sx));s+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="5" style="fill:${c}"/>`;
      if(i===3){const ticks=vk==='pfm'?[0,14,28,42,56]:[0,24,48,72,96,120];ticks.forEach((tk,ti)=>{const last=ti===ticks.length-1,first=ti===0;
        s+=`<text x="${f1(lerp(x0,x1,tk/V.axis))}" y="${y1+14}" class="t-xs ${last?'t-end':first?'':'t-mid'}">${vk==='pfm'?'\u2067יום '+tk:tk+'h'}</text>`})}});
    s+=`<line x1="${f1(lerp(CX0,CX1,u))}" x2="${f1(lerp(CX0,CX1,u))}" y1="${CY-6}" y2="${CY+380}" style="stroke:var(--ink);stroke-width:1;opacity:.25"/>`;
    svg.innerHTML=s;
    const p=phaseOf(V.steps,u);setSt(p);const P=V.steps[p];
    $('#atNote').innerHTML=noteHTML(P)+(vk==='typ'?`<div class="kv"><div><dt>האתר הזה: ${S.n}</dt><dd>${S.txt}</dd></div></div>`+(p===2?`<div class="pt"><b>במילים פשוטות</b>${S.pt}</div><div class="hook"><b>לבחינה</b>${S.hook}</div>`:''):'');
    $('#atRead').innerHTML=`<span>זמן <b>${V.fmt(x)}</b></span><span>חום <b>${(37+2.8*fever).toFixed(1)} °C</b></span><span>CRP <b>${Math.round(val('crp')*100)}%</b> מהשיא</span><span>SAA <b>${Math.round(val('saa')*100)}%</b> מהשיא</span>`;
  }
  let setSt=()=>{};let stop=playWire(rg,$('#atPlay'),draw,14000,'הפעלה חוזרת','attack');
  function setVar(){const V=AT_VARS[vk];setSt=stepWire($('#atSteps'),V.steps,rg,draw,stop);$('#atUnit').textContent=V.unit;$('#atSites').style.display=vk==='typ'?'':'none';rg.value=V.steps[0].at;draw(+rg.value)}
  $('#atSites').addEventListener('click',e=>{const b=e.target.closest('[data-site]');if(!b)return;site=b.dataset.site;$$('[data-site]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)});
  $('#atVars').addEventListener('click',e=>{const b=e.target.closest('[data-var]');if(!b)return;stop();vk=b.dataset.var;$$('[data-var]').forEach(x=>x.setAttribute('aria-pressed',x===b));setVar()});
  setVar();

  /* years */
  const ys=$('#atYears'),yr=$('#ayT');let pat='mod',col=false;
  const PAT={freq:['כל 2–4 שבועות',16],mod:['כל 1–3 חודשים',7],rare:['כמה בשנה',3]};
  $('#atFreq').innerHTML='<span class="kicker">דפוס ללא טיפול</span>'+Object.entries(PAT).map(([k,v])=>`<button class="btn" data-pat="${k}" aria-pressed="${k===pat}">${v[0]}</button>`).join('');
  $('#atYearsTxt').innerHTML='ההתקפים מגיעים במרווחים לא סדירים, בניגוד לדיוק השעון של PFAPA, ותדירותם משתנה מאוד בין אנשים. האתר יכול להשתנות מהתקף להתקף. נהוג לומר שתדירות ההתקפים יורדת עם הגיל, אבל באוכלוסיות שמקבלות טיפול קשה להפריד זאת מהשפעת הקולכיצין, ולכן כדאי להתייחס לכך בזהירות. אצל 80–90% מהמטופלים ההתקף הראשון מופיע לפני גיל 20. קולכיצין יומי מפחית את תדירות ההתקפים אצל רוב המטופלים ומונע עמילואידוזיס. [[BenChetrit2019,PRINTO2016,Tufan2020,Zemer1986]]';
  function gen(){const rr=rng(pat.length*97+(col?1:0));const out=[];const rate=PAT[pat][1];
    for(let y=0;y<5;y++)for(let d=0;d<365;d+=1){const tY=y+d/365;let p=rate/365;
      if(col&&tY>2){const k=ramp(tY,2,2.5);p*=lerp(1,.12,k)}
      if(rr()<p){out.push({tY,s:.5+rr()*.5,site:Math.floor(rr()*4)});d+=4}}
    return out}
  let EV=gen();
  function drawY(t){const T=t*5;let s='';
    const NY=vb(ys,'720 230','400 300');
    const x0=NY?14:60, x1=NY?392:706, rowH=NY?52:38, top=NY?30:24, trk=NY?22:24;
    for(let y=0;y<5;y++){const yy=top+y*rowH;
      s+=`<text x="${NY?x0:10}" y="${f1(yy+(NY?-4:16))}" class="t-sm">\u2067שנה ${y+1}\u2069</text><line x1="${x0}" x2="${x1}" y1="${yy+trk}" y2="${yy+trk}" class="axis"/>`;
      ['ינו','פבר','מרץ','אפר','מאי','יונ','יול','אוג','ספט','אוק','נוב','דצמ'].forEach((m,i)=>{if(y===4)s+=`<text x="${f1(x0+(i+.5)/12*(x1-x0))}" y="${yy+trk+16}" class="t-xs t-mid">${m}</text>`});
      const n=EV.filter(e=>Math.floor(e.tY)===y&&e.tY<=T).length;s+=`<text x="${x1}" y="${f1(yy+(NY?-4:6))}" class="t-xs t-end">\u2067${n} התקפים\u2069</text>`}
    if(col){const yy=top+2*rowH;s+=`<rect x="${x0}" y="${f1(yy-(NY?18:4))}" width="${x1-x0}" height="${3*rowH+6}" rx="6" style="fill:var(--crocus-soft);opacity:.55"/><text x="${x0+4}" y="${f1(yy+(NY?-6:6))}" class="t-xs" style="fill:var(--crocus)">\u2067→ בטיפול בקולכיצין\u2069</text>`}
    const cols=['var(--terra)','var(--sea)','var(--gold)','var(--bad)'];
    EV.forEach(e=>{if(e.tY>T)return;const y=Math.floor(e.tY),xx=x0+(e.tY-y)*(x1-x0),yy=top+y*rowH+trk;s+=`<path d="M${f1(xx-4)} ${yy} L${f1(xx)} ${f1(yy-20*e.s)} L${f1(xx+4)} ${yy}" style="fill:${cols[e.site]};opacity:.9"/>`});
    if(t<1){const y=Math.min(4,Math.floor(T)),xx=x0+(T-y)*(x1-x0);s+=`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${top+y*rowH}" y2="${top+y*rowH+trk+2}" style="stroke:var(--ink);stroke-width:2"/>`}
    ys.innerHTML=s;
    const pre=EV.filter(e=>e.tY<2).length/2,post=EV.filter(e=>e.tY>=2.5).length/2.5;
    $('#ayCap').textContent=col?`הדמיה סכמטית. כ־${pre.toFixed(1)} התקפים בשנה לפני קולכיצין, וכ־${post.toFixed(1)} בשנה אחרי שלתרופה היו כמה חודשים לפעול. הצבעים מסמנים אתרים שונים.`:'הדמיה סכמטית של מהלך ללא טיפול. הצבעים מסמנים אתרי התקף שונים (בטן, חזה, מפרק, עור).'}
  const ystop=playWire(yr,$('#ayPlay'),drawY,9000,'הפעלה חוזרת','attack');
  $('#atFreq').addEventListener('click',e=>{const b=e.target.closest('[data-pat]');if(!b)return;pat=b.dataset.pat;$$('[data-pat]').forEach(x=>x.setAttribute('aria-pressed',x===b));EV=gen();drawY(+yr.value)});
  $('#ayCol').onclick=()=>{col=!col;$('#ayCol').setAttribute('aria-pressed',col);EV=gen();drawY(+yr.value)};
  drawY(+yr.value);
};
