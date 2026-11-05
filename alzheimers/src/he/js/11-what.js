
/* =============== 1.1 what =============== */
const WH_STEPS=[
 {from:0,at:.08,k:'שלב 1 · המטרייה',t:'דמנציה היא תסמונת',
  txt:'דמנציה היא תסמונת קלינית: בעיות בזיכרון ובחשיבה שמפריעות למשימות יומיומיות כמו נהיגה, בישול או ניקיון. המילה מתארת מה קורה, לא למה. [[AA2025Facts]]',
  pt:'דמנציה היא שם לקבוצה של בעיות, קצת כמו המילה "חום". כמה מחלות שונות יכולות לגרום לה.',
  hook:'דמנציה היא התסמונת. מחלת אלצהיימר היא הסיבה השכיחה ביותר לה.'},
 {from:.15,at:.31,k:'שלב 2 · סיבות רבות',t:'כמה מחלות נמצאות מתחת למטרייה',
  txt:'מחלת אלצהיימר היא הסיבה השכיחה ביותר. סיבות אחרות הן מחלה של כלי הדם במוח, ניוון פרונטו־טמפורלי ומחלת גופיפי לוי. [[AA2025Facts]] ההבדלים ביניהן מוסברים בפרק <a href="#ddx" data-go="ddx">האבחנה המבדלת</a>.',
  pt:'גם שבץ ונזק לכלי דם קטנים, גופיפי לוי ומחלה פרונטו־טמפורלית יכולים לגרום לדמנציה.'},
 {from:.38,at:.5,k:'שלב 3 · החלק הגדול ביותר',t:'כמה מהדמנציה היא אלצהיימר?',
  txt:'לפי הערכת ה־Alzheimer\'s Association, מחלת אלצהיימר אחראית ל־60% עד 80% ממקרי הדמנציה. גיליון העובדות של ה־WHO נותן טווח נמוך יותר, 60% עד 70%. שני המקורות מסכימים על הגבול התחתון של הטווח ונבדלים בגבול העליון. [[AA2025Facts,WHO2026Dementia]]',
  pt:'לרוב האנשים עם דמנציה יש מחלת אלצהיימר: בין שישה לשמונה מכל עשרה, תלוי באיזה מקור קוראים.',
  hook:'שני נתונים נפוצים: 60%–80% (Alzheimer\'s Association) ו־60%–70% (WHO). צטטו את המקור יחד עם המספר.'},
 {from:.58,at:.71,k:'שלב 4 · מעורב זה שכיח',t:'בהרבה מוחות יש יותר מסיבה אחת',
  txt:'ב־141 הנתיחות הראשונות של מחקר Rush Memory and Aging Project, ל־50 אנשים הייתה דמנציה: ל־38% היו אלצהיימר יחד עם אוטמים, ל־30% אלצהיימר טהור, ל־12% דמנציה וסקולרית ול־12% אלצהיימר יחד עם פרקינסון או מחלת גופיפי לוי. ריבוי פתולוגיות היה קשור לסיכויים גבוהים פי 2.8 בערך לדמנציה. [[Schneider2007]] במרכזי מחקר בארה״ב, ליותר ממחצית האנשים שאובחנו עם דמנציה של אלצהיימר הייתה דמנציה מעורבת; השיעור גבוה יותר במחקרים בקהילה, והוא הגבוה ביותר בגיל 85 ומעלה. [[AA2025Facts]]',
  pt:'כשבוחנים מוחות אחרי המוות, אצל הרבה אנשים מתגלים שינויי אלצהיימר יחד עם משהו נוסף, לרוב שבצים קטנים.',
  hook:'פתולוגיה מעורבת נחשבת היום לסיבה השכיחה ביותר לדמנציה בגיל המבוגר מאוד. [[BermejoPareja2024]]'},
 {from:.8,at:.94,k:'שלב 5 · שינויים בלי תסמינים',t:'שינויי אלצהיימר במוח בלי דמנציה',
  txt:'באותה קבוצה, אצל 24.2% מהאנשים שלא הייתה להם דמנציה נמצאה בנתיחה פתולוגיה של אלצהיימר טהור. שינויים במוח ותסמינים אינם אותו דבר. [[Schneider2007]] על השלב השקט והארוך אפשר לקרוא בפרק <a href="#cascade" data-go="cascade">עשרים שנה לפני התסמינים</a>.',
  pt:'יש אנשים שבמוחם יש שינויי אלצהיימר, ובמהלך חייהם לא מופיעה אצלם דמנציה.'}
];
const WH_AGE=[
 {from:0,at:.3,k:'מתחת לגיל 65',t:'דמנציה בגיל צעיר קיימת',
  txt:'להערכה, לכ־110 מכל 100,000 אמריקאים בגילי 30 עד 64, בערך 200,000 איש, יש דמנציה בגיל צעיר מכל סיבה שהיא. [[AA2025Facts]] בעולם ההערכה היא 119 מכל 100,000 בגילי 30 עד 64, כ־3.9 מיליון איש. [[Hendriks2021]] אלצהיימר בהופעה מוקדמת הוא כ־5% מכלל מקרי האלצהיימר. רוב המקרים אינם משפחתיים, האבחנה מגיעה בממוצע כ־1.6 שנים מאוחר יותר מאשר אצל מבוגרים, והתייצגויות שאינן של זיכרון שכיחות יותר. [[Mendez2017]] אלצהיימר בתורשה אוטוזומלית דומיננטית הוא פחות מ־1% מכלל המקרים. [[Bateman2011]]',
  pt:'אלצהיימר יכול להתחיל לפני גיל 65, אבל בגילים האלה הוא נדיר, ורוב המקרים המוקדמים אינם עוברים ישירות בתורשה במשפחה.',
  hook:'באלצהיימר בהופעה מוקדמת, לכ־14.2% יש היסטוריה משפחתית דומיננטית, אבל רק כ־1.6% נושאים מוטציה ב־APP, ב־PSEN1 או ב־PSEN2. [[Mendez2017]]'},
 {from:.5,at:.62,k:'גילי 65 עד 74',t:'5.1% בגילי 65 עד 74',
  txt:'ל־5.1% מהאמריקאים בגילי 65 עד 74 יש דמנציה של אלצהיימר. לפי הערכות CHAP לשנת 2011, כ־0.4% מקבוצת הגיל הזו פיתחו אותה בכל שנה. [[AA2025Facts]]',
  pt:'בערך 5 מכל 100 אנשים בסוף שנות השישים ובתחילת שנות השבעים לחייהם.'},
 {from:.643,at:.76,k:'גילי 75 עד 84',t:'13.2% בגילי 75 עד 84',
  txt:'ל־13.2% מהאמריקאים בגילי 75 עד 84 יש דמנציה של אלצהיימר, וכ־3.2% מפתחים אותה בכל שנה. מתוך 7.2 מיליון האמריקאים המבוגרים שחיים איתה, 74% הם בני 75 ומעלה. [[AA2025Facts]]',
  pt:'בערך 13 מכל 100 אנשים בסוף שנות השבעים ובתחילת שנות השמונים לחייהם.'},
 {from:.786,at:.97,k:'85 ומעלה',t:'33.4% בגיל 85 ומעלה',
  txt:'ל־33.4% מהאמריקאים בני 85 ומעלה יש דמנציה של אלצהיימר, וכ־7.6% מפתחים אותה בכל שנה. הדוח מכנה את הגיל הגדול מבין שלושה גורמי סיכון; השניים האחרים הם APOE e4 והיסטוריה משפחתית. [[AA2025Facts]]',
  pt:'בערך אחד מכל שלושה אנשים בני 85 ומעלה. הגיל הוא גורם הסיכון הגדול ביותר, אבל לרוב האנשים המבוגרים אין דמנציה של אלצהיימר.',
  hook:'5.1% ← 13.2% ← 33.4%: השיעור עולה בערך פי שניים וחצי בכל טווח גיל אחרי 65.'}
];
inits.what=()=>{
  /* ---- 1. the umbrella ---- */
  const svg=$('#whSvg'),rg=$('#whT');
  const CAUSES=[ // umbrella-space coordinates (wide frame); narrow shifts the whole group
   {k:'ad',x:160,y:225,r:105,a:.15},
   {k:'vas',x:290,y:190,r:60,a:.2},
   {k:'lewy',x:270,y:305,r:48,a:.24},
   {k:'ftd',x:345,y:88,r:30,a:.27},
   {k:'oth',x:362,y:322,r:22,a:.3}];
  const WAF=[['adinf',19],['ad',15],['vas',6],['adlewy',6],['rest',4]];
  function dot(x,y,kind,o){
    const op=`opacity:${f1(o)}`,full=c=>`<circle cx="${f1(x)}" cy="${f1(y)}" r="7" style="fill:${c};${op}"/>`;
    const half=(c1,c2)=>`<path d="M${f1(x)} ${f1(y-7)} A7 7 0 0 0 ${f1(x)} ${f1(y+7)} Z" style="fill:${c1};${op}"/><path d="M${f1(x)} ${f1(y-7)} A7 7 0 0 1 ${f1(x)} ${f1(y+7)} Z" style="fill:${c2};${op}"/>`;
    if(kind==='adinf')return half('var(--rose)','var(--vessel)');
    if(kind==='ad')return full('var(--rose)');
    if(kind==='vas')return full('var(--vessel)');
    if(kind==='adlewy')return half('var(--rose)','var(--violet)');
    return `<circle cx="${f1(x)}" cy="${f1(y)}" r="6" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.2;${op}"/>`;
  }
  function draw(t){
    const N=vb(svg,'720 410','400 800');
    const L=N?{ux:-8,uy:0,px:-406,py:400}:{ux:0,uy:0,px:0,py:0};
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    /* umbrella */
    const reg=ease(ramp(t,0,.1));
    s+=`<g transform="translate(${L.ux} ${L.uy})">`;
    s+=`<defs><clipPath id="whAdClip"><circle cx="160" cy="225" r="105"/></clipPath></defs>`;
    s+=`<rect x="20" y="34" width="380" height="340" rx="26" style="fill:var(--panel);stroke:var(--ink);stroke-width:2;opacity:${f1(reg)}"/>`;
    s+=`<text x="40" y="64" class="t-big" style="opacity:${f1(reg)}">דמנציה</text>`;
    s+=`<text x="40" y="81" class="t-xs" style="opacity:${f1(reg)}">תסמונת עם סיבות אפשריות רבות</text>`;
    CAUSES.forEach(c=>{const g=ease(ramp(t,c.a,c.a+.06));if(g<=0)return;
      const isAd=c.k==='ad',stroke=isAd?'var(--rose)':c.k==='vas'?'var(--vessel)':c.k==='lewy'?'var(--violet)':'var(--muted)';
      const fill=isAd?'var(--rose-soft)':'var(--panel-2)';
      s+=`<circle cx="${c.x}" cy="${c.y}" r="${f1(c.r*g)}" style="fill:${fill};stroke:${stroke};stroke-width:${isAd?2.4:1.8};fill-opacity:${isAd?1:.85}"/>`});
    // overlaps = mixed pathology (step 4)
    const mix=ramp(t,.58,.68);
    if(mix>0)s+=`<g clip-path="url(#whAdClip)" style="opacity:${f1(mix)}"><circle cx="290" cy="190" r="60" style="fill:var(--vessel);opacity:.45"/><circle cx="270" cy="305" r="48" style="fill:var(--violet);opacity:.45"/></g>`;
    // labels, drawn over the shapes
    const lab=(a,str)=>{const o=ramp(t,a+.03,a+.07);return o>0?str.replace('OP',f1(o)):''};
    s+=lab(.15,`<text x="150" y="214" class="t-lbl t-mid" style="opacity:OP">מחלת אלצהיימר</text>`);
    const sh=ramp(t,.4,.48);
    if(sh>0)s+=`<text x="150" y="234" class="t-sm t-mid" style="fill:var(--rose);opacity:${f1(sh)}">‏60%–80% או 60%–70%\u200F</text><text x="150" y="250" class="t-xs t-mid" style="opacity:${f1(sh)}">ממקרי הדמנציה</text>`;
    s+=lab(.2,`<text x="312" y="186" class="t-sm t-mid" style="fill:var(--ink);opacity:OP">וסקולרית</text>`);
    s+=lab(.24,`<text x="281" y="314" class="t-sm t-mid" style="fill:var(--ink);opacity:OP">גופיפי לוי</text>`);
    s+=lab(.27,`<text x="345" y="85" class="t-xs t-mid" style="fill:var(--ink);opacity:OP">פרונטו־</text><text x="345" y="96" class="t-xs t-mid" style="fill:var(--ink);opacity:OP">טמפורלית</text>`);
    s+=lab(.3,`<text x="362" y="325" class="t-xs t-mid" style="fill:var(--ink);opacity:OP">אחרות</text>`);
    if(mix>0)s+=`<text x="20" y="396" class="t-xs" style="opacity:${f1(mix)}">חפיפה מוצללת: פתולוגיה מעורבת, יותר מסיבה אחת</text>`;
    s+='</g>';
    /* right panel: shares, autopsy dots, pathology without dementia */
    s+=`<g transform="translate(${L.px} ${L.py})">`;
    const a1=ramp(t,.38,.46),X=p=>430+p*2.6;
    if(a1>0){const g=ease(ramp(t,.4,.5));
      s+=`<g style="opacity:${f1(a1)}"><text x="430" y="44" class="t-sm">חלקה של מחלת אלצהיימר בדמנציה</text>`;
      [['\u2067לפי Alzheimer\'s Association: 60%–80%\u2069',66,80],['\u2067לפי גיליון העובדות של WHO: 60%–70%\u2069',102,70]].forEach(([l,y,hi])=>{
        s+=`<text x="430" y="${y}" class="t-xs" style="fill:var(--ink)">${l}</text><rect x="430" y="${y+6}" width="260" height="12" rx="4" style="fill:var(--panel-2)"/>`;
        s+=`<rect x="${f1(X(60))}" y="${y+6}" width="${f1((hi-60)*2.6*g)}" height="12" rx="3" style="fill:var(--rose)"/>`});
      s+=`<line x1="${f1(X(60))}" x2="${f1(X(60))}" y1="70" y2="126" class="grid"/>`;
      [[0,'0'],[50,'50%'],[100,'100%']].forEach(([p,l],i)=>s+=`<text x="${f1(X(p))}" y="140" class="t-xs ${i===0?'':i===2?'t-end':'t-mid'}">${l}</text>`);
      s+='</g>'}
    const a2=ramp(t,.58,.64);
    if(a2>0){const n=Math.floor(50*ramp(t,.6,.74)+.001);
      s+=`<g style="opacity:${f1(a2)}"><text x="430" y="168" class="t-sm">נתיחה: 50 אנשים עם דמנציה</text>`;
      let i=0;WAF.forEach(([k,c])=>{for(let j=0;j<c;j++,i++){const col=i%10,row=Math.floor(i/10);
        s+=i<n?dot(440+col*20,186+row*20,k,1):`<circle cx="${440+col*20}" cy="${186+row*20}" r="6" style="fill:none;stroke:var(--line);stroke-width:1.2"/>`}});
      const LG=[['adinf','אלצהיימר + אוטמים 38%',430,292],['ad','אלצהיימר טהור 30%',430,310],['vas','וסקולרית 12%',430,328],['adlewy','אלצהיימר + לוי 12%',570,292],['rest','השאר 8%',570,310]];
      LG.forEach(([k,l,x,y])=>{s+=dot(x+7,y-4,k,1)+`<text x="${x+19}" y="${y}" class="t-xs" style="fill:var(--ink)">${l}</text>`});
      s+='</g>'}
    const a3=ramp(t,.8,.88);
    if(a3>0){const g=ease(ramp(t,.82,.92));
      s+=`<g style="opacity:${f1(a3)}"><text x="430" y="356" class="t-sm">בלי דמנציה, אבל אלצהיימר טהור בנתיחה</text>`;
      s+=`<rect x="430" y="364" width="260" height="12" rx="4" style="fill:var(--panel-2)"/><rect x="430" y="364" width="${f1(24.2*2.6*g)}" height="12" rx="3" style="fill:var(--rose)"/>`;
      s+=`<text x="430" y="392" class="t-xs" style="fill:var(--ink)">אצל 24.2% מהאנשים בלי דמנציה</text></g>`}
    s+='</g>';
    svg.innerHTML=s;
    const p=phaseOf(WH_STEPS,t);setSt(p);$('#whNote').innerHTML=noteHTML(WH_STEPS[p]);
  }
  const stop=playWire(rg,$('#whPlay'),draw,15000,'הפעלה חוזרת','what');
  const setSt=stepWire($('#whSteps'),WH_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- 2. age bands ---- */
  const ag=$('#whAge'),ar=$('#whAgeT');let inc=false;
  const BANDS=[
   {lab:'30–64',a:30,b:65,prev:.11,inc:null,pv:'‏110 לכל 100,000',pl:'כל הסיבות לדמנציה',iv:'לא צוין',il:'אין כאן נתון שנתי'},
   {lab:'65–74',a:65,b:75,prev:5.1,inc:.4,pv:'5.1%',pl:'עם דמנציה של אלצהיימר',iv:'0.4%',il:'מפתחים אותה בכל שנה'},
   {lab:'75–84',a:75,b:85,prev:13.2,inc:3.2,pv:'13.2%',pl:'עם דמנציה של אלצהיימר',iv:'3.2%',il:'מפתחים אותה בכל שנה'},
   {lab:'85+',a:85,b:100,prev:33.4,inc:7.6,pv:'33.4%',pl:'עם דמנציה של אלצהיימר',iv:'7.6%',il:'מפתחים אותה בכל שנה'}];
  function person(x,y,style){return `<circle cx="${f1(x)}" cy="${f1(y-7)}" r="3.2" style="${style}"/><path d="M${f1(x-5)} ${f1(y+9)} v-6 a5 5 0 0 1 10 0 v6 z" style="${style}"/>`}
  function drawAge(t){
    const N=vb(ag,'720 400','400 690');
    const L=N?{pw:185,ph:292,pos:i=>[10+(i%2)*195,16+Math.floor(i/2)*308],rx0:24,rx1:376,ry:650}
             :{pw:165,ph:292,pos:i=>[20+i*175,24],rx0:30,rx1:690,ry:352};
    const age=lerp(30,100,t);
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    BANDS.forEach((B,i)=>{
      const [x0,y0]=L.pos(i),cx=x0+L.pw/2,here=age>=B.a&&(age<B.b||i===3);
      const prog=ease(ramp(age,B.a,B.a+(i===3?10:(B.b-B.a)*.7)));
      const val=inc?B.inc:B.prev,cnt=val==null?0:val*prog;
      s+=`<rect x="${x0}" y="${y0}" width="${L.pw}" height="${L.ph}" rx="12" style="fill:var(--panel);stroke:${here?'var(--rose)':'var(--line)'};stroke-width:${here?2:1}"/>`;
      s+=`<text x="${f1(cx)}" y="${y0+26}" class="t-big t-mid">${B.lab}</text>`;
      const gx=cx-75+7.5;
      for(let k=0;k<100;k++){const col=k%10,row=9-Math.floor(k/10),x=gx+col*15,y=y0+50+row*21;
        s+=person(x,y,'fill:var(--cell-line);opacity:.32');
        const f=clamp(cnt-k);
        if(f>=1)s+=person(x,y,'fill:var(--rose)');
        else if(f>0){s+=`<clipPath id="whPc${i}"><rect x="${f1(x-6)}" y="${f1(y-11)}" width="${f1(12*f)}" height="22"/></clipPath><g clip-path="url(#whPc${i})">${person(x,y,'fill:var(--rose)')}</g>`}}
      const o=f1(Math.max(prog,.0));
      if(prog>0){s+=`<text x="${f1(cx)}" y="${y0+266}" class="t-big t-mid" style="fill:${val==null?'var(--muted)':'var(--rose)'};opacity:${o}">${inc?B.iv:B.pv}</text>`;
        s+=`<text x="${f1(cx)}" y="${y0+283}" class="t-xs t-mid" style="opacity:${o}">${inc?B.il:B.pl}</text>`}
      else s+=`<text x="${f1(cx)}" y="${y0+266}" class="t-xs t-mid">הסמן עוד לא הגיע לגיל הזה</text>`});
    // age ruler
    const RX=a=>lerp(L.rx0,L.rx1,(a-30)/70),ry=L.ry;
    s+=`<line x1="${L.rx0}" x2="${L.rx1}" y1="${ry}" y2="${ry}" style="stroke:var(--line);stroke-width:6;stroke-linecap:round"/>`;
    s+=`<line x1="${L.rx0}" x2="${f1(RX(age))}" y1="${ry}" y2="${ry}" style="stroke:var(--rose);stroke-width:6;stroke-linecap:round"/>`;
    [30,65,75,85,100].forEach((a,i)=>{s+=`<line x1="${f1(RX(a))}" x2="${f1(RX(a))}" y1="${ry+5}" y2="${ry+10}" class="axis"/><text x="${f1(RX(a))}" y="${ry+24}" class="t-xs ${i===0?'':i===4?'t-end':'t-mid'}">${a}</text>`});
    const mx=RX(age),lx=clamp(mx,L.rx0+24,L.rx1-24);
    s+=`<path d="M${f1(mx)} ${ry-5} l-6 -9 h12 z" style="fill:var(--ink)"/><text x="${f1(lx)}" y="${ry-18}" class="t-sm t-mid" style="fill:var(--ink)">גיל ${Math.round(age)}</text>`;
    ag.innerHTML=s;
    const p=phaseOf(WH_AGE,t);setAge(p);
    let P=WH_AGE[p];
    $('#whAgeNote').innerHTML=noteHTML(P);
    ag.setAttribute('aria-label',inc?'ארבע קבוצות של 100 אנשים לפי טווח גיל מתמלאות בשיעור האנשים שמפתחים דמנציה של אלצהיימר בכל שנה בארה״ב: אין נתון שנתי מתחת לגיל 65, 0.4 בגילי 65 עד 74, 3.2 בגילי 75 עד 84 ו־7.6 בגיל 85 ומעלה, בזמן שסמן הגיל נע מ־30 עד 100.':'ארבע קבוצות של 100 אנשים לפי טווח גיל מתמלאות בשיעור האנשים עם דמנציה של אלצהיימר בארה״ב: מעטים מאוד מתחת לגיל 65, 5.1 בגילי 65 עד 74, 13.2 בגילי 75 עד 84 ו־33.4 בגיל 85 ומעלה, בזמן שסמן הגיל נע מ־30 עד 100.');
    $('#whAgeCap').textContent=inc?'מקרים חדשים בכל שנה לכל 100 אנשים בטווח הגיל (הערכות CHAP לשנת 2011). כל דמות היא 1 מכל 100 אנשים.':'שיעור החיים עם דמנציה של אלצהיימר (ארה״ב, 2025). מתחת לגיל 65: דמנציה בגיל צעיר מכל סיבה. כל דמות היא 1 מכל 100 אנשים.';
  }
  const stopA=playWire(ar,$('#whAgePlay'),drawAge,13000,'הפעלה חוזרת','what');
  const setAge=stepWire($('#whAgeSteps'),WH_AGE,ar,drawAge,stopA);
  const setMode=v=>{inc=v;$('#whPrev').setAttribute('aria-pressed',!v);$('#whInc').setAttribute('aria-pressed',v);drawAge(+ar.value)};
  $('#whPrev').onclick=()=>setMode(false);
  $('#whInc').onclick=()=>setMode(true);
  drawAge(+ar.value);
};
