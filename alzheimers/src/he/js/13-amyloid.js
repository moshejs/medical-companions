
/* =============== 1.3 amyloid =============== */
const AM_STEPS=[
 {from:0,at:.06,k:'שלב 1 · חלבון המבשר',t:'APP יושב בקרום',
  txt:'APP הוא חלבון קרום שחוצה את הקרום פעם אחת, והגן שלו נמצא על כרומוזום 21: חלק חוץ־תאי גדול מחוץ לתא, מקטע אחד שחוצה את הקרום וזנב קצר בתוך התא. רצף העמילואיד בטא יושב על פני הקרום, חלקו בחוץ וחלקו בתוכו. נוירונים מייצרים בעיקר את האיזופורם APP695. [[Zhang2011]]',
  pt:'עמילואיד מתחיל כחתיכה קטנה של חלבון גדול יותר, שיושב בדופן של כל נוירון.',
  hook:'APP נמצא על כרומוזום 21. לכן אצל אנשים עם תסמונת דאון, שיש להם שלושה עותקים שלו, מתפתחים רבדי עמילואיד בגיל מוקדם. [[SelkoeHardy2016]]'},
 {from:.15,at:.24,k:'שלב 2 · החיתוך הראשון',t:'איזה אנזים מגיע ראשון',
  txt:'אלפא־סקרטאז (ADAM10, האנזים הפעיל באופן קבוע בנוירונים) חותך בתוך אזור העמילואיד בטא, בין שארית 16 לשארית 17, כך שעמילואיד בטא לא יכול להיווצר. בטא־סקרטאז (BACE1) חותך במקום זאת בתחילת אזור העמילואיד בטא. BACE1 פועל בצורה הטובה ביותר ב־pH חומצי, מה שמתאים לפעילותו באנדוזומים, והוא נחשב לשלב שמגביל את קצב ייצור העמילואיד בטא. [[Zhang2011,Kuhn2010,Vassar1999,Haass2012]]',
  pt:'שני זוגות מספריים שונים יכולים לבצע את החיתוך הראשון. האחד חותך דרך חתיכת העמילואיד והורס אותה. השני חותך ממש לפניה ומשאיר אותה שלמה.',
  hook:'אלפא־סקרטאז ראשון = מסלול לא עמילואידוגני. בטא־סקרטאז (BACE1) ראשון = מסלול עמילואידוגני.'},
 {from:.35,at:.42,k:'שלב 3 · מקטע משתחרר',t:'sAPPalpha או sAPPbeta',
  txt:'החלק החיצוני הגדול משתחרר. אחרי חיתוך אלפא זהו sAPPalpha, שדווח שהוא מגן על נוירונים; ביטוי שלו לבדו תיקן את הליקויים בעכברים חסרי APP. אחרי חיתוך בטא זהו sAPPbeta, שחסרות בו שאריות 1 עד 16 של העמילואיד בטא. מה שנשאר בקרום הוא גדם של 83 שאריות (C83) או גדם של 99 שאריות (C99). [[Zhang2011]]',
  pt:'החלק החיצוני הגדול נסחף משם. גדם קצר נשאר תקוע בקרום.'},
 {from:.5,at:.58,k:'שלב 4 · החיתוך השני',t:'גמא־סקרטאז חותך בתוך הקרום',
  txt:'גמא־סקרטאז הוא קומפלקס של ארבעה חלקים: פרסנילין (PS1 או PS2, הליבה הקטליטית), ניקסטרין, APH-1 ו־PEN-2. הוא חותך את הגדם בתוך הקרום בשלבים, משארית 49 ל־46 ואז ל־40 או ל־42. נוירונים של עכברים חסרי PS1 ייצרו כחמישית בלבד מכמות העמילואיד בטא. [[Zhang2011,Haass2012,DeStrooper1998]]',
  pt:'זוג מספריים שני, שקבור בתוך הקרום, חותך את הגדם ומשחרר אותו.',
  hook:'פרסנילין היא היחידה הקטליטית של גמא־סקרטאז, ולכן מוטציות ב־PSEN1 וב־PSEN2 פועלות על אותו חיתוך בדיוק שמייצר עמילואיד בטא.'},
 {from:.7,at:.78,k:'שלב 5 · התוצרים',t:'p3, או עמילואיד בטא',
  txt:'אחרי חיתוך אלפא, גמא־סקרטאז משחרר את p3, שנחשב חסר חשיבות פתולוגית. אחרי חיתוך בטא הוא משחרר עמילואיד בטא, בעיקר בצורה בת 40 שאריות; הצורה בת 42 השאריות היא כ־10% מהסך הכול, אבל היא הידרופובית יותר ונוטה יותר ליצור סיבים. הזנב התוך־תאי (AICD) משתחרר בתוך התא בשני המסלולים. [[Haass2012,Zhang2011]]',
  pt:'מסלול אחד מייצר מקטע לא מזיק. השני מייצר עמילואיד בטא, ובערך מולקולה אחת מכל עשר היא מהסוג הדביק.'},
 {from:.88,at:.95,k:'שלב 6 · הגנטיקה משנה את האיזון',t:'היחס בין 42 ל־40',
  txt:'מוטציות של אלצהיימר משפחתי ב־APP ובפרסנילין מעלות באופן עקבי את היחס בין עמילואיד בטא 42 ל־40. הווריאנט האיסלנדי A673T, הסמוך לאתר החיתוך של בטא־סקרטאז, הפחית במבחנה את יצירת הפפטיד העמילואידוגני בכ־40%, והוא מגן מפני אלצהיימר ומפני ירידה קוגניטיבית הקשורה לגיל. [[Zhang2011,Jonsson2012]]',
  pt:'יש שינויים גנטיים שמגדילים את כמות הצורה הדביקה. שינוי נדיר אחד מקטין אותה, והאנשים שנושאים אותו מוגנים.',
  hook:'כל המוטציות הדומיננטיות של הופעה מוקדמת נמצאות ב־APP או בפרסנילין, כלומר במצע ובאנזים של התגובה שמייצרת עמילואיד בטא. [[SelkoeHardy2016]]'}
];
const AM_AGG=[
 {from:0,at:.06,k:'מונומרים',t:'מולקולות בודדות',txt:'מונומרים של עמילואיד בטא משתחררים לנוזל שבין התאים. יצירת עמילואיד תלויה בגרעין, כמו התגבשות: השלב האיטי הוא יצירת הזרע הראשון, והצורה בת 42 השאריות זורעת את ההצטברות של הצורה האיטית יותר, בת 40 השאריות. [[Jarrett1993]]',pt:'בהתחלה מולקולות עמילואיד בודדות צפות בחופשיות. התחלת גוש היא איטית; הגדלתו מהירה.'},
 {from:.18,at:.26,k:'אוליגומרים',t:'גושים קטנים ומסיסים',txt:'נוצרים מבנים קטנים ומסיסים, מדימרים ומעלה. אוליגומרים שהופרשו באופן טבעי, בלי נוכחות של סיבים, עיכבו מאוד בחולדות חיות את ההעצמה ארוכת הטווח (LTP) הקשורה לזיכרון. דימרים שהופקו מקליפת מוח של אנשים עם אלצהיימר הפחיתו את הקוצים הדנדריטיים ופגעו בזיכרון נלמד. [[Walsh2002,Shankar2008]]',pt:'נראה שהגושים הקטנים, שעדיין צפים בחופשיות, הם שפוגעים בחיבורים בין הנוירונים.',hook:'חוקרים רבים רואים באוליגומרים המסיסים, ולא ברבדים, את הצורה העיקרית שפוגעת בסינפסות. ביקורת מ־2012 ציינה שאין הגדרה מוסכמת לאוליגומר רעיל. [[HaassSelkoe2007,Benilova2012]]'},
 {from:.38,at:.46,k:'פרוטופיברילים',t:'חוטים מעוקלים',txt:'האוליגומרים מתארכים לפרוטופיברילים מעוקלים, ברוחב 6 עד 8 nm ובאורך של פחות מ־200 nm. לקנמאב (Leqembi) תוכנן להיקשר בזיקה גבוהה לפרוטופיברילים מסיסים. [[Walsh1997,vanDyck2023]]',pt:'הגושים מתארכים לחוטים קצרים ומעוקלים. אחת התרופות החדשות נבנתה כדי לתפוס בדיוק אותם.'},
 {from:.56,at:.64,k:'סיבים',t:'סיבים ישרים של יריעות בטא',txt:'הפרוטופיברילים מבשילים לסיבי עמילואיד ישרים. משקעים גדולים ובלתי מסיסים עשויים לשמש מאגרים שמשחררים אוליגומרים פעילים ביולוגית. [[Walsh1997,HaassSelkoe2007]]',pt:'החוטים מתיישרים לסיבים ארוכים שכבר אינם מתמוססים.'},
 {from:.72,at:.8,k:'רובד מפוזר',t:'משקע רופף',txt:'הסיבים שוקעים כרובד מפוזר: נצבע חלש, בלי שלוחות עצב פגועות ובלי גליה משופעלת. המשקעים המוקדמים ביותר חיוביים ל־42 ושליליים ל־40. עדיין לא ברור אם רבדים מפוזרים הם חלק תמים מההזדקנות או שלב מוקדם של המחלה. [[DeTure2019,Iwatsubo1994]]',pt:'נוצר משקע רופף. לבדו הוא עדיין לא פוגע בנוירונים שסביבו.'},
 {from:.86,at:.95,k:'רובד נויריטי',t:'ליבה צפופה ונזק סביבה',txt:'רובד עם ליבה צפופה מושך אליו שלוחות עצב נפוחות החיוביות לטאו, מיקרוגליה משופעלת ואסטרוציטים ריאקטיביים, וכך הופך לרובד נויריטי. אוליגומרים יושבים בהילה סביבו, ואובדן הסינפסות גדול ביותר ליד שוליו. [[DeTure2019,SelkoeHardy2016]]',pt:'נוצר רובד צפוף, ומסביבו קצות עצבים פגועים, דלקת וחיבורים שאבדו.',hook:'רובד מפוזר = אין נזק סביבו. רובד נויריטי = ליבה צפופה, שלוחות עצב דיסטרופיות החיוביות לטאו, גליה משופעלת.'}
];
inits.amyloid=()=>{
  const svg=$('#amSvg'),rg=$('#amT');let beta=true,fad=false,prot=false;
  function draw(t){
    const N=vb(svg,'720 400','400 600');
    const L=N?{mx0:12,mx1:388,my:250,cx:150,tx:24,ty:540,inX:20,inY:296,outX:20,outY:30,tally:{x:24,y:440,w:352}}
             :{mx0:20,mx1:520,my:230,cx:270,tx:540,ty:52,inX:30,inY:282,outX:30,outY:30,tally:{x:540,y:150,w:160}};
    const cutA=ramp(t,.15,.3), away=ease(ramp(t,.35,.5)), gam=ease(ramp(t,.5,.68)), rel=ease(ramp(t,.7,.88)), tal=ramp(t,.88,1);
    const blocked=prot&&beta?.4:0;
    let s=`<defs>${marker('amA')}</defs><rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    // compartments
    s+=`<rect x="0" y="0" width="100%" height="${L.my-18}" style="fill:var(--csf);opacity:.45"/>`;
    s+=`<text x="${L.mx1}" y="${L.outY}" class="t-sm t-end">מחוץ לנוירון</text>`;
    s+=`<text x="${L.inX}" y="${L.inY}" class="t-sm">בתוך הנוירון</text>`;
    // membrane bilayer
    for(let x=L.mx0;x<L.mx1;x+=12){s+=`<circle cx="${x}" cy="${L.my-14}" r="4.4" style="fill:var(--cell-line)"/><circle cx="${x}" cy="${L.my+14}" r="4.4" style="fill:var(--cell-line)"/><path d="M${x-1.5} ${L.my-10}v8M${x+1.5} ${L.my-10}v8M${x-1.5} ${L.my+2}v8M${x+1.5} ${L.my+2}v8" style="stroke:var(--cell-line);stroke-width:1;opacity:.6"/>`}
    s+=`<text x="${L.mx1}" y="${L.my+42}" class="t-xs t-end">קרום</text>`;
    // APP: ectodomain (drifts away after first cut), Abeta segment, transmembrane, tail
    const cx=L.cx, ab0=L.my-46, ab1=L.my+6;            // amyloid-beta region spans the surface
    const ecto=`<path d="M-26 0 C-50 -40 -36 -96 0 -104 C36 -96 50 -40 26 0 Z" style="fill:var(--sage-soft);stroke:var(--sage);stroke-width:2"/>`;
    const dx=away*(N?-80:-150), dy=-away*(N?40:56), rot=-away*24;
    s+=`<g transform="translate(${f1(cx+dx)} ${f1(ab0+dy)}) rotate(${f1(rot)})" style="opacity:${f1(1-away*.35)}">${ecto}<text x="0" y="-48" class="t-sm t-mid" style="fill:var(--sage)">${away>.15?(beta?'sAPPβ':'sAPPα'):'APP'}</text></g>`;
    if(away>.4)s+=`<text x="${f1(cx+dx)}" y="${f1(ab0+dy+16)}" class="t-xs t-mid" style="opacity:${f1(ramp(away,.4,.7))}">${beta?'\u2067משתחרר, בלי Aβ 1–16\u2069':'משתחרר, מגן על נוירונים'}</text>`;
    // the stub (C83 / C99) and its amyloid-beta part
    const abVisible=beta?1:(1-cutA*.0);
    const abTop=beta?ab0:ab0+16;                       // alpha cut is inside the region, so the outer third goes with sAPPalpha
    const rise=rel*(N?-120:-150);
    s+=`<rect x="${cx-8}" y="${f1(abTop+rise)}" width="16" height="${f1(ab1-abTop)}" rx="6" style="fill:${beta?'var(--amber)':'var(--panel-2)'};stroke:${beta?'var(--amber)':'var(--muted)'};stroke-width:1.5;opacity:${f1(abVisible)}"/>`;
    if(rel>.15)s+=`<text x="${cx+16}" y="${f1(abTop+rise+16)}" class="t-lbl" style="fill:${beta?'var(--amber)':'var(--muted)'}">${beta?'עמילואיד בטא':'p3'}</text>`;
    // transmembrane remainder + intracellular tail (AICD drops after gamma)
    const drop=rel*60;
    s+=`<rect x="${cx-6}" y="${ab1}" width="12" height="${f1(L.my+18-ab1)}" style="fill:var(--sage);opacity:${f1(1-rel)}"/>`;
    s+=`<path d="M${cx} ${f1(L.my+18+drop)} q12 18 -2 34 q-12 14 4 26" style="fill:none;stroke:var(--sage);stroke-width:6;stroke-linecap:round"/>`;
    if(rel>.3)s+=`<text x="${cx+16}" y="${f1(L.my+60+drop)}" class="t-xs">AICD</text>`;
    if(away>.2&&rel<.1)s+=`<text x="${cx+18}" y="${L.my+(N?-22:4)}" class="t-xs">${beta?'\u2067גדם C99\u2069':'\u2067גדם C83\u2069'}</text>`;
    // first secretase: scissors approach and cut
    const sc1x=lerp(cx-120,cx-12,ramp(t,.15,.24)), sc1y=beta?ab0:ab0+16;
    if(t>.12&&t<.5)s+=`<g transform="translate(${f1(sc1x)} ${f1(sc1y)})" style="opacity:${f1(ramp(t,.12,.16)*(1-ramp(t,.4,.5)))}"><rect x="-58" y="-14" width="52" height="28" rx="9" style="fill:var(--panel);stroke:${beta?'var(--rose)':'var(--sage)'};stroke-width:2"/><text x="-32" y="5" class="t-xs t-mid" style="fill:${beta?'var(--rose)':'var(--sage)'};font-weight:700">${beta?'BACE1':'ADAM10'}</text><path d="M-6 0 l10 -6 M-6 0 l10 6" style="stroke:var(--ink);stroke-width:2;stroke-linecap:round"/></g>`;
    if(blocked&&t>.15&&t<.4)s+=`<text x="${f1(cx-70)}" y="${f1(ab0-30)}" class="t-xs t-mid" style="fill:var(--good)">\u2067A673T: כ־40% פחות חיתוך\u2069</text>`;
    // gamma-secretase: four-part complex inside the membrane
    if(t>.48&&t<.92){const gx=lerp(cx+130,cx+14,gam),o=ramp(t,.48,.52)*(1-ramp(t,.86,.92));
      s+=`<g transform="translate(${f1(gx)} ${L.my})" style="opacity:${f1(o)}">`;
      [['PS','var(--rose)'],['NCT','var(--sky)'],['APH','var(--violet)'],['PEN','var(--amber)']].forEach(([l,c],i)=>{const a=i*Math.PI/2+.4;
        s+=`<circle cx="${f1(14+Math.cos(a)*16)}" cy="${f1(Math.sin(a)*16)}" r="13" style="fill:var(--panel);stroke:${c};stroke-width:2"/><text x="${f1(14+Math.cos(a)*16)}" y="${f1(Math.sin(a)*16+3)}" class="t-xs t-mid" style="font-size:8.5px">${l}</text>`});
      s+=`</g><text x="${f1(gx+14)}" y="${L.my+(N?58:52)}" class="t-xs t-mid" style="opacity:${f1(o)}">גמא־סקרטאז</text>`}
    // tally of products: Abeta40 vs Abeta42
    if(tal>0&&beta){const T=L.tally,n42=fad?4:1,tot=10;
      s+=`<g style="opacity:${f1(tal)}"><text x="${T.x}" y="${T.y}" class="t-sm">מכל 10 מולקולות עמילואיד בטא</text>`;
      for(let i=0;i<tot;i++){const is42=i<n42,x=T.x+(i%5)*(N?22:28),y=T.y+16+Math.floor(i/5)*(N?22:28);
        s+=`<rect x="${x}" y="${y}" width="${N?16:20}" height="${is42?(N?16:20):(N?14:17)}" rx="4" style="fill:${is42?'var(--rose)':'var(--amber)'};opacity:.9"/>`}
      const ly=T.y+(N?66:80);
      s+=`<text x="${T.x}" y="${ly}" class="t-xs" style="fill:var(--amber)">■ Aβ40</text><text x="${T.x+(N?70:70)}" y="${ly}" class="t-xs" style="fill:var(--rose)">\u2067■ Aβ42, דביק יותר\u2069</text>`;
      if(fad)s+=`<text x="${T.x}" y="${ly+16}" class="t-xs" style="fill:var(--rose)">מוטציה משפחתית: היחס עולה</text>`;
      s+='</g>'}
    if(tal>0&&!beta)s+=`<text x="${L.tally.x}" y="${L.tally.y}" class="t-sm" style="fill:var(--sage);opacity:${f1(tal)}">לא נוצר עמילואיד בטא</text>`;
    svg.innerHTML=s;
    const p=phaseOf(AM_STEPS,t);setSt(p);
    let P=AM_STEPS[p];
    if(!beta&&p===4)P={...P,t:'p3, ולא עמילואיד בטא',txt:'מכיוון שאלפא־סקרטאז חתך בתוך אזור העמילואיד בטא, גמא־סקרטאז משחרר את p3, שנחשב חסר חשיבות פתולוגית. במסלול הזה לא נוצר עמילואיד בטא. [[Haass2012,Zhang2011]]'};
    $('#amNote').innerHTML=noteHTML(P);
    $('#amCap').textContent=`${beta?'בטא־סקרטאז ראשון: נוצר עמילואיד בטא':'אלפא־סקרטאז ראשון: לא נוצר עמילואיד בטא'}${fad?' · מוטציה משפחתית (השיעור הגבוה יותר של Aβ42 מצויר באופן סכמטי)':''}${prot?' · הווריאנט המגן A673T':''}. סכמטי, לא בקנה מידה.`;
  }
  const stop=playWire(rg,$('#amPlay'),draw,16000,'הפעלה חוזרת','amyloid');
  const setSt=stepWire($('#amSteps'),AM_STEPS,rg,draw,stop);
  const set=(id,v)=>$(id).setAttribute('aria-pressed',v);
  $('#amAlpha').onclick=()=>{beta=false;set('#amAlpha',true);set('#amBeta',false);draw(+rg.value)};
  $('#amBeta').onclick=()=>{beta=true;set('#amAlpha',false);set('#amBeta',true);draw(+rg.value)};
  $('#amFad').onclick=()=>{fad=!fad;set('#amFad',fad);if(fad){prot=false;set('#amProt',false)}draw(+rg.value)};
  $('#amProt').onclick=()=>{prot=!prot;set('#amProt',prot);if(prot){fad=false;set('#amFad',false)}draw(+rg.value)};

  /* ---- aggregation ---- */
  $('#amAggLede').innerHTML='עמילואיד בטא מפונה מהמוח כל הזמן. במחקר סימון באלצהיימר בהופעה מאוחרת, הייצור היה תקין אבל הפינוי היה איטי בכ־30%, ולכן העמילואיד מצטבר לאורך שנים. [[Mawuenyega2010]]';
  const ag=$('#amAgg'),ar=$('#amAggT');const R=rng(31);
  const MONO=Array.from({length:26},()=>({x:R(),y:R(),p:R()}));
  function drawAgg(t){
    const N=vb(ag,'720 320','400 560');
    const L=N?{cols:[[150,64],[150,174],[150,284],[150,394],[150,504]],w:360}:{cols:[[70,150],[210,150],[350,150],[490,150],[630,150]],w:720};
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    const stages=['מונומרים','אוליגומרים','פרוטופיברילים','סיבים','רובד'];
    const prog=t*5;
    L.cols.forEach(([x,y],i)=>{const on=clamp(prog-i+.6),cur=Math.floor(clamp(prog,0,4.999))===i;
      s+=`<circle cx="${x}" cy="${y}" r="${N?44:52}" style="fill:${cur?'var(--amber-soft)':'var(--panel)'};stroke:${cur?'var(--amber)':'var(--line)'};stroke-width:${cur?2:1}"/>`;
      s+=`<text x="${N?x+54:x}" y="${y+(N?4:72)}" class="t-sm${N?'':' t-mid'}" style="fill:${cur?'var(--ink)':'var(--muted)'}">${stages[i]}</text>`;
      if(i<4){const [nx,ny]=L.cols[i+1];s+=N?`<path d="M${x} ${y+48} V${ny-48}" class="arrow" marker-end="url(#agA)" style="opacity:.5"/>`:`<path d="M${x+56} ${y} H${nx-58}" class="arrow" marker-end="url(#agA)" style="opacity:.5"/>`}
      if(on<=0)return;
      const o=f1(on);
      if(i===0)MONO.slice(0,10).forEach(m=>{s+=`<circle cx="${f1(x-26+m.x*52)}" cy="${f1(y-26+m.y*52)}" r="3.4" style="fill:var(--amber);opacity:${o}"/>`});
      if(i===1)for(let k=0;k<4;k++){const a=k/4*Math.PI*2,cx=x+Math.cos(a)*20,cy=y+Math.sin(a)*20;for(let j=0;j<3;j++)s+=`<circle cx="${f1(cx+(j-1)*5)}" cy="${f1(cy+(j%2)*4)}" r="3.2" style="fill:var(--amber);opacity:${o}"/>`}
      if(i===2)for(let k=0;k<3;k++)s+=`<path d="M${x-28} ${y-14+k*14} q14 -10 28 0 t28 0" style="fill:none;stroke:var(--amber);stroke-width:5;stroke-linecap:round;opacity:${o}"/>`;
      if(i===3)for(let k=0;k<4;k++)s+=`<path d="M${x-32} ${y-18+k*12} L${x+32} ${y-24+k*12}" style="stroke:var(--amber);stroke-width:4;stroke-linecap:round;opacity:${o}"/>`;
      if(i===4){const neur=ramp(t,.86,1);s+=plaque(x,y,30,7,+o);
        for(let k=0;k<5;k++){const a=k/5*Math.PI*2+.4;s+=`<circle cx="${f1(x+Math.cos(a)*40)}" cy="${f1(y+Math.sin(a)*40)}" r="${f1(3+3*neur)}" style="fill:var(--rose);opacity:${f1(neur*.85)}"/>`}
        if(neur>0)s+=microglia(x+38,y-30,6,neur,1)}});
    ag.innerHTML=`<defs>${marker('agA')}</defs>`+s;
    const p=phaseOf(AM_AGG,t);$('#amAggNote').innerHTML=noteHTML(AM_AGG[p]);
    ar.setAttribute('aria-valuetext',`שלב ${p+1} מתוך ${AM_AGG.length}: ${AM_AGG[p].t}`);
  }
  playWire(ar,$('#amAggPlay'),drawAgg,12000,'הפעלה חוזרת','amyloid');
  $('#amCards').innerHTML=`
   <div class="card"><span class="ev est">מבוסס</span><h4>הגנטיקה מצביעה על העמילואיד</h4><p>כל המוטציות הדומיננטיות של הופעה מוקדמת נמצאות ב־APP או בפרסנילין. הכפלה של גן APP תקין גורמת לאלצהיימר. הווריאנט המגן A673T מפחית את החיתוך בידי בטא־סקרטאז. באלצהיימר בתורשה דומיננטית, רמת עמילואיד בטא 42 בנוזל השדרה החלה לרדת כ־25 שנה לפני מועד התסמינים הצפוי. [[SelkoeHardy2016,Jonsson2012,Bateman2012]]</p></div>
   <div class="card"><span class="ev early">שנוי במחלוקת</span><h4>אבל הרבדים מתואמים רק חלש עם הזיכרון</h4><p>מספר הסבכים מתואם עם הפגיעה הקוגניטיבית הרבה יותר מעומס הרבדים. במטא־אנליזה של 2,914 אנשים תקינים קוגניטיבית, שיעור החיוביות לעמילואיד עלה מ־10% בגיל 50 ל־44% בגיל 90. [[Nelson2012,Arriagada1992,Jansen2015]]</p></div>
   <div class="card"><span class="ev early">שנוי במחלוקת</span><h4>תרופות שחסמו את החיתוכים נכשלו</h4><p>מעכב הגמא־סקרטאז סמגססטט (semagacestat) לא עזר, והמינון הגבוה שלו החמיר את התפקוד. ניסוי מעכב ה־BACE1 ורובססטט (verubecestat) הופסק מוקדם משום שלא היה סיכוי להראות תועלת. תומכי ההשערה מצביעים על סלקטיביות נמוכה ועל טיפול מאוחר מדי. [[Doody2013,Egan2018,SelkoeHardy2016]]</p></div>
   <div class="card"><span class="ev est">מבוסס</span><h4>הסרת עמילואיד האטה את הירידה, במידה צנועה</h4><p>ב־2023, לקנמאב (Leqembi) פינה עמילואיד, וציון ה־CDR-SB החמיר ב־1.21 נקודות לעומת 1.66 בפלצבו לאורך 18 חודשים, הפרש של 0.45. עד כמה ההבדל הזה משמעותי למטופלים שנוי במחלוקת. [[vanDyck2023,Karran2022]] ראו <a href="#antibody" data-go="antibody">נוגדנים נגד עמילואיד לאורך זמן</a>.</p></div>
   <div class="card"><span class="ev hyp">נמשך</span><h4>המאמר על Aβ*56</h4><p>מאמר ב־Nature מ־2006 דיווח על אוליגומר אחד, Aβ*56, במודל עכבר אחד, וקשר אותו לאובדן זיכרון. [[Lesne2006]] תחקיר של Science מ־2022 דיווח על סימנים לזיוף תמונות במאמרי אלצהיימר רבים. [[Piller2022]] ב־2024 משך Nature את מאמר 2006, בשל חששות לגבי האיורים שלו ובציון שלא ניתן לאמת את הנתונים מתוך הרישומים; המחבר הראשון התנגד למשיכה. [[Lesne2024Retraction]] המשיכה מבטלת את הראיות שהמאמר הזה סיפק ל־Aβ*56. היא אינה נוגעת בראיות הגנטיות, בצירי הזמן של הסמנים הביולוגיים בבני אדם, בעבודות של מעבדות אחרות על אוליגומרים או בניסויי הנוגדנים. השיפוט האחרון הזה הוא סינתזה של כמה מקורות, ולא קביעה של מקור יחיד. [[SelkoeHardy2016,Jonsson2012,Bateman2012,Walsh2002,Shankar2008,vanDyck2023]] טיוטה מוקדמת (preprint) מ־2025 מהמעבדה של המחברת הבכירה, שלא עברה ביקורת עמיתים, מדווחת על וריאנטים של Aβ*56 במוח האדם. [[Lapcinski2025]]</p></div>
   <div class="card"><h4>היכן עומדת ההשערה</h4><p>הגרסה המעודכנת מ־2016 מוסיפה מסלול ישיר מאוליגומרים לפגיעה בסינפסות ולהפעלת גליה. סקירה מ־2022 טוענת שעומס הרבדים חייב לרדת לכ־20 סנטילואיד (CL) לפני שהתועלת נראית, ובפיגור זמן. ביקורת מ־2015 טענה שיש לדחות את המודל הליניארי. [[SelkoeHardy2016,Karran2022,Herrup2015]]</p></div>`;
  const prevR=redraws.amyloid;redraws.amyloid=()=>{prevR&&prevR();drawAgg(+ar.value)};
  draw(+rg.value);drawAgg(+ar.value);
};
