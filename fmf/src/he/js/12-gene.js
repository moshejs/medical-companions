/* =============== 1.2 the gene & inheritance =============== */
const GN_CLSN={P:'פתוגני',LP:'ככל הנראה פתוגני',VUS:'בעל משמעות לא ודאית',LB:'ככל הנראה שפיר',B:'שפיר',none:'אין וריאנט'};
const GN_CLSC={P:'var(--bad)',LP:'var(--terra)',VUS:'var(--warn)',LB:'var(--good)',B:'var(--good)',none:'var(--muted)'};
const GN_VARS=[
 {id:'M694V',aa:694,cls:'P',ex:'אקסון 10 · B30.2',
  pop:'הווריאנט השכיח ביותר אצל יהודים שאינם אשכנזים; הוא השולט אצל יהודים יוצאי צפון אפריקה, ואינו קיים אצל אשכנזים. [[Lancieri2023,GershoniBaruch2001]] בקרב 1,090 חולים טורקים שעברו בדיקת גנוטיפ הוא היווה 51.4% מהאללים הנושאים וריאנט [[Tunca2005]], בקרב חולים יוונים 38.1% [[Giaglis2007]], ובנתונים מאוחדים 39.6%. [[Papadopoulos2008]] גילו המשוער הוא כ־2,108 שנה לפי מודל מרקוב חבוי, או אב קדמון משותף אחרון לפני כ־3,541 שנה לפי שיטת Gamma באותו מאמר, עם סימן לברירה חיובית. [[Park2020]]',
  sev:'M694V/M694V נקשר להופעה מוקדמת יותר, ליותר דלקת פרקים, ליותר אודם דמוי שושנה ולצורך במינון קולכיצין גבוה יותר מאשר גנוטיפים שכיחים אחרים (Shinar 2000). [[Shinar2000]] אצל 90 חולים ארמנים, הומוזיגוטיות ל־M694V נקשרה לעמילואידוזיס כלייתית (Cazeneuve 1999) [[Cazeneuve1999]], אבל ברישום הטורקי של 2,838 חולים לא נמצא קשר כזה (Tunca 2005). [[Tunca2005]] בקרב הומוזיגוטים ל־M694V, מין זכר והתקפים של דלקת פרקים העלו את הסיכון לעמילואידוזיס. [[GershoniBaruch2003]]'},
 {id:'M680I',aa:680,cls:'P',ex:'אקסון 10 · B30.2',
  pop:'מרוכז בחולים ערבים. [[GershoniBaruch2001]] הוא מהווה 14.4% מהאללים הנושאים וריאנט אצל חולים טורקים [[Tunca2005]] ו־19.7% אצל חולים יוונים [[Giaglis2007]]; ו־5% מהטורקים הבריאים נושאים אותו. [[Yilmaz2001]] שני שינויים שונים ב־DNA יוצרים את אותו שינוי בחלבון (c.2040G>C ו־c.2040G>A). [[Infevers2026]]',
  sev:'גנוטיפים עם שני וריאנטים בנקודה החמה שבעמדות 680 עד 694 נוטים להיות חמורים; לפי SHARE, שני וריאנטים שכיחים, במיוחד בעמדות 680 עד 694, מנבאים מחלה חמורה יותר (רמה B). [[Touitou2001,Giancane2015]]'},
 {id:'M694I',aa:694,cls:'P',ex:'אקסון 10 · B30.2',
  pop:'מרוכז בחולים ערבים. [[GershoniBaruch2001]] ביפן הגנוטיפים השכיחים הם E148Q/M694I ו־M694I ללא וריאנט שני, והמחלה קלה יותר. [[Migita2012]]',
  sev:'אחד מארבעת הווריאנטים באקסון 10 שהוגדרו "פתוגניים בבירור". [[Shinar2012]] אותה עמדה כמו M694V, אבל חומצת אמינו מחליפה אחרת.'},
 {id:'K695R',aa:695,cls:'VUS',ex:'אקסון 10 · B30.2',
  pop:'שכיחות אללית של כ־1% עד 1.6% אצל אירופים ופינים ב־gnomAD. [[gnomAD]] נמצא גם אצל יהודים אשכנזים. [[Aksentijevich1999]]',
  sev:'נקשר למחלה קלה או לחדירות חלקית. [[Lancieri2023,Aksentijevich1999]] הנחיות ישנות יותר כללו אותו, יחד עם A744S ו־R761H, בין הווריאנטים של הנקודה החמה. [[Shinar2012]]'},
 {id:'V726A',aa:726,cls:'P',ex:'אקסון 10 · B30.2',
  pop:'שכיח אצל יהודים אשכנזים ויוצאי עיראק ואצל ערבים (הווריאנט השכיח ביותר בחולים ערבים). [[GershoniBaruch2001,Lancieri2023]] מיהודי עיראק, 12.8% נושאים אותו. [[GershoniBaruch2001]] זה הווריאנט היחיד שנמצא בשיווי משקל הרדי-ויינברג בנתונים המאוחדים, מה שמרמז שהוא העתיק ביותר; גילו המשוער כ־2,192 שנה לפי מודל מרקוב חבוי, או אב קדמון משותף אחרון לפני כ־3,372 שנה לפי שיטת Gamma. [[Papadopoulos2008,Park2020]]',
  sev:'V726A/V726A ו־M694V/V726A היו בין הגנוטיפים עם הופעה מאוחרת יותר ופחות דלקת פרקים לעומת M694V/M694V. [[Shinar2000]] רוב האנשים עם V726A/E148Q נשארים ללא תסמינים. [[GershoniBaruch2001]]'},
 {id:'A744S',aa:744,cls:'LB',ex:'אקסון 10 · B30.2',
  pop:'שכיחות אללית של כ־1% אצל יהודים אשכנזים ב־gnomAD. [[gnomAD]]',
  sev:'ככל הנראה שפיר ב־Infevers ב־2026-10-16, אף ש־Shinar 2012 עדיין מנה אותו בין וריאנטי הנקודה החמה שיש לדווח עליהם. דוגמה ברורה לכך שהסיווגים משתנים עם הזמן. [[Infevers2026,Shinar2012]]'},
 {id:'R761H',aa:761,cls:'P',ex:'אקסון 10 · B30.2',
  pop:'נמנה עם וריאנטי אקסון 10 שהפאנלים הסטנדרטיים מדווחים עליהם. [[Shinar2012]] המקורות המחקריים שמשמשים כאן אינם מוסרים את שכיחותו באוכלוסייה.',
  sev:'Shinar 2012 קיבץ אותו עם A744S ו־K695R; ב־Infevers הוא סווג כפתוגני ב־2026-10-16. [[Shinar2012,Infevers2026]]'},
 {id:'E148Q',aa:148,cls:'VUS',ex:'אקסון 2',
  pop:'הווריאנט השכיח ביותר אצל יהודים אשכנזים. [[Lancieri2023]] בקרב טורקים בריאים 12% נושאים אותו, אבל בקרב חולים טורקים הוא רק 3.6% מהאללים. [[Yilmaz2001]] שכיחות אללית של כ־29% אצל מזרח אסייתים ב־gnomAD; עד 20% במדינות אסיה. [[gnomAD,Shinar2012]] אין בו סימן לברירה חיובית, בניגוד ל־M694V ול־V726A. [[Park2020]]',
  sev:'הווריאנט הקל ביותר ובעל החדירות הנמוכה ביותר. [[Touitou2001]] SHARE: כאשר E148Q הוא הווריאנט היחיד, הוא אינו תומך באבחנה של FMF (רמה B). [[Giancane2015,Ozen2017]]'},
 {id:'S242R',aa:242,cls:'LP',ex:'אקסון 2 · מקשר אחרי PYD',
  pop:'נמצא במשפחות עם מחלה בתורשה דומיננטית. [[Masters2016]]',
  sev:'לא FMF. עותק אחד מסלק אתר קישור של 14-3-3 על הפירין וגורם ל־PAAND, מחלה אוטו-דלקתית הקשורה לפירין עם דרמטוזיס נויטרופילית (OMIM 608068), שמגיבה לטיפול המכוון נגד IL-1 ואינה מתנהגת כמו FMF שמגיבה לקולכיצין. [[Masters2016,Schnappauf2019,UniProtO15553]] ראו <a href="#mech" data-go="mech">פירין, בהנפשה</a>.'}
];
const GN_Z=[
 {from:0,at:.1,k:'רמה 1 · כרומוזום',t:'כרומוזום 16',
  txt:'ב־1992 מיקם ניתוח תאחיזה ב־27 משפחות יהודיות שאינן אשכנזיות את הגן של FMF על הזרוע הקצרה (p) של כרומוזום 16, עם ציון LOD מרבי של 19.86. [[Pras1992]]',
  pt:'לכל אדם יש שני עותקים של כרומוזום 16, אחד מכל הורה. הגן של FMF יושב סמוך לקצה הזרוע הקצרה שלו.',
  hook:'מיקום <i>MEFV</i>: <b>16p13.3</b>. [[Lancieri2023]]'},
 {from:.2,at:.3,k:'רמה 2 · פס',t:'הפס 16p13.3',
  txt:'ב־1997 שיבטו שני קונסורציומים את הגן, כל אחד בנפרד. הקונסורציום הצרפתי ל־FMF קרא לחלבון מרנוסטרין, על שם <i>mare nostrum</i>. הקונסורציום הבין־לאומי ל־FMF קרא לו פירין, ומצא שהתעתיק שלו, באורך 3.7 kb, מתבטא כמעט רק בגרנולוציטים. האזור של <i>MEFV</i> כולו הוא כ־15 kb. [[FrenchFMF1997,IntFMF1997,Booty2009]]',
  pt:'שני צוותי מחקר מצאו את הגן באותה שנה ונתנו לחלבון שני שמות.',
  hook:'פירין = מרנוסטרין, מיוצר בעיקר ב<b>גרנולוציטים</b> (נויטרופילים).'},
 {from:.4,at:.5,k:'רמה 3 · גן',t:'MEFV: 10 אקסונים',
  txt:'ל־<i>MEFV</i> יש 10 אקסונים. אקסון 10 מקודד את תחום B30.2 שבקצה ה־C של החלבון, ונושא את רוב הווריאנטים שגורמים ל־FMF. הסריקה הסטנדרטית מכסה את אקסונים 2, 3, 5 ו־10. [[Lancieri2023,Touitou2001,Shinar2012]]',
  pt:'הגן מחולק ל־10 חלקים מקודדים. רוב השינויים שגורמים למחלה יושבים בחלק האחרון, אקסון 10.',
  hook:'הנקודה החמה = <b>אקסון 10</b>: M694V, M680I, V726A, M694I.'},
 {from:.6,at:.7,k:'רמה 4 · חלבון',t:'פירין: 781 חומצות אמינו',
  txt:'קואורדינטות UniProt: תחום הפירין (PYD) בעמדות 1 עד 92, אזור בסיסי דמוי bZIP בעמדות 266 עד 280, אצבע אבץ מסוג B-box בעמדות 370 עד 412, סליל מפותל (CC) בעמדות 413 עד 442, ו־B30.2/SPRY בעמדות 580 עד 775. סקירות מציינות גבולות מעט שונים, למשל B30.2 בעמדות 597 עד 776. ה־PYD נקשר לחלבון המתווך ASC; הווריאנטים של FMF מתקבצים ב־B30.2. [[UniProtO15553,Lancieri2023,Richards2001]] האופן שבו זה מפעיל את האזעקה מוסבר בפרק <a href="#mech" data-go="mech">פירין, בהנפשה</a>.',
  pt:'לחלבון יש חלקים נפרדים. הקצה הקדמי (PYD) מתחבר למנגנון האזעקה. הקצה האחורי (B30.2) הוא המקום שבו מתקבצים השינויים של FMF.',
  hook:'הווריאנטים של FMF הם <b>מגבירי תפקוד</b>: בעכברים, השבתה של גן הפירין לא גרמה למחלה, ואילו וריאנטים אנושיים ב־B30.2 גרמו לדלקת המונעת על ידי IL-1β. [[Chae2011]]'},
 {from:.8,at:1,k:'רמה 5 · וריאנטים',t:'הקישו על סיכה',
  txt:'חמישה וריאנטים מייסדים (M694V, V726A, M694I, M680I, E148Q) היוו 74% מהכרומוזומים של FMF בחולים טיפוסיים ממוצא ארמני, ערבי, יהודי וטורקי. צבע הסיכה מציג את הסיווג ב־Infevers ב־2026-10-16. הסיווגים משתנים ככל שמצטברות ראיות. [[Touitou2001,Infevers2026]]',
  pt:'כל סיכה היא שינוי של אות אחת בחלבון. M694V פירושו שהמתיונין בעמדה 694 הוחלף בוואלין.',
  hook:'מבנה השם: חומצת האמינו המקורית, העמדה, חומצת האמינו החדשה. <b>M694V</b> = Met694Val.'}
];
const GN_CROSS=[
 {id:'cc',n:'נשא × נשא',a:['V','+'],b:['V','+'],la:'נשא',lb:'נשא',
  txt:'25% עם שני וריאנטים, 50% נשאים, 25% בלי אף אחד מהם. לא כל ילד עם שני וריאנטים יחלה, כי החדירות אינה מלאה (פנוטיפ III). [[GeneReviews,Kogan2001]]'},
 {id:'ca',n:'נשא × שני וריאנטים',a:['V','V'],b:['V','+'],la:'שני וריאנטים',lb:'נשא',
  txt:'50% עם שני וריאנטים, 50% נשאים. FMF מופיעה אז בכל דור ועשויה להיראות דומיננטית: פסאודו-דומיננטיות. [[Cazeneuve1999]]'},
 {id:'an',n:'שני וריאנטים × לא נשא',a:['V','V'],b:['+','+'],la:'שני וריאנטים',lb:'לא נשא',
  txt:'100% נשאים, ואף ילד אינו עם שני וריאנטים. נשאים הם בדרך כלל בריאים, אף שלחלק מהאנשים עם וריאנט אחד יש התקפים דמויי FMF (ראו את הכרטיסים למטה). [[Booty2009,Jeru2013]]'},
 {id:'cn',n:'נשא × לא נשא',a:['V','+'],b:['+','+'],la:'נשא',lb:'לא נשא',
  txt:'50% נשאים, 50% בלי וריאנט, ואף ילד אינו עם שני וריאנטים.'},
 {id:'dn',n:'וריאנט בפעולה דומיננטית × לא נשא',a:['D','+'],b:['+','+'],la:'וריאנט אחד, M694del או T577',lb:'לא נשא',
  txt:'50% יורשים את הווריאנט בעל הפעולה הדומיננטית ועלולים לפתח מחלה מהעותק היחיד הזה, בחדירות משתנה. M694del גורם ל־FMF דומיננטית (Booth 2000; ‏21 חולים בבריטניה, Rowczenio 2015). וריאנטים הטרוזיגוטיים בעמדה T577 גורמים למחלה אוטו-דלקתית דומיננטית שהגיבה לקולכיצין (Stoffels 2014). [[Booth2000,Rowczenio2015,Stoffels2014]]'}
];
const GN_P=[
 {from:0,at:.1,k:'שלב 1 · ההורים',t:'שני עותקים לכל אחד',
  txt:'לכל אדם יש שני עותקים של <i>MEFV</i>, אחד על כל כרומוזום 16. FMF היא באופן קלאסי מחלה בתורשה אוטוזומלית רצסיבית: בדרך כלל המחלה מופיעה רק כשיש וריאנט בשני העותקים. [[GeneReviews,FrenchFMF1997]]',
  pt:'לכל אדם יש שני עותקים של הגן. בדרך כלל שניהם צריכים להיות משונים כדי שתהיה FMF.',
  hook:'רצסיבית: צריך שתי פגיעות. נשאים (פגיעה אחת) הם בדרך כלל בריאים.'},
 {from:.15,at:.34,k:'שלב 2 · גמטות',t:'כל הורה מעביר עותק אחד',
  txt:'ביצית וזרע נושאים רק עותק אחד מכל כרומוזום. איזה עותק יקבל הילד נקבע בסיכוי של 50:50, ומחדש בכל היריון.',
  pt:'כל הורה מעביר אחד משני העותקים שלו, באקראי.',
  hook:'כל היריון הוא הטלת מטבע בלתי תלויה מצד כל הורה. ילד אחד חולה אינו משנה את הסיכויים לילד הבא.'},
 {from:.38,at:.64,k:'שלב 3 · הילדים',t:'ארבעה צירופים בסבירות שווה',
  txt:'כל משבצת מצמידה עותק אחד מכל הורה. ארבע המשבצות שוות בסבירותן, ולכן כל אחת היא 25% מהתוצאות האפשריות לכל ילד.',
  pt:'יש ארבע דרכים, שוות בסבירותן, שבהן העותקים יכולים להתחבר.',
  hook:'טבלת פאנט מציגה <b>הסתברויות לכל ילד</b>, לא כמה ילדים מכל סוג יהיו במשפחה.'},
 {from:.8,at:.98,k:'שלב 4 · הסיכויים',t:'מה הטבלה מנבאת',txt:'',pt:'האחוזים הם הסיכויים בכל היריון.',
  hook:'פסאודו-דומיננטיות: הורה חולה × נשא נותן <b>50%</b> ילדים עם שני וריאנטים, ולכן מחלה רצסיבית יכולה להיראות דומיננטית. [[Cazeneuve1999]]'}
];
const GN_AL=[['M694V','P',694],['M680I','P',680],['M694I','P',694],['V726A','P',726],['R761H','P',761],['M694del','P',694],['E148Q','VUS',148],['K695R','VUS',695],['A744S','LB',744],['P369S','LB',369],['none','none',0]];
inits.gene=()=>{
  /* ---------- 1. zoom ---------- */
  const svg=$('#gnSvg'),rg=$('#gnT');let sel='M694V';
  const EX=[[60,14],[120,70],[230,34],[300,14],[350,22],[410,14],[455,14],[495,12],[535,22],[590,90]];
  const PORD=['E148Q','S242R','M680I','M694V','M694I','K695R','V726A','A744S','R761H'];
  function draw(t){
    /* narrow: same five levels, stacked in a taller 400-wide column. GX/GW squeeze
       the 60–680 tracks into 18–382; the hot-spot inset keeps its wide geometry
       (it is 360 units across either way) so the pins never crowd. */
    const N=vb(svg,'720 420','400 492');
    const GX=x=>N?18+(x-60)*364/620:x, GW=w=>N?w*364/620:w;
    const ax=a=>GX(60+(a-1)*620/780);
    const IX=a=>N?lerp(18,382,(a-670)/100):lerp(300,660,(a-670)/100);
    const IY=N?410:352;                       /* inset bar top */
    const BY=N?246:236;                       /* protein bar top */
    const PY=N?BY-34:226;                     /* "pyrin · 781 aa" baseline */
    const PIN={E148Q:{x:ax(148),y0:BY+22,hy:N?BY+56:290,lx:ax(148),ly:N?BY+72:304,a:'middle',sub:'⁧אקסון 2⁩'},
      S242R:{x:ax(242),y0:BY+22,hy:N?BY+56:290,lx:ax(242),ly:N?BY+72:304,a:'middle',sub:'PAAND'},
      M680I:{x:IX(680),y0:IY,hy:IY-24,lx:IX(680),ly:IY-34,a:'middle'},
      M694V:{x:IX(694),y0:IY,hy:IY-58,lx:IX(694),ly:IY-66,a:'middle'},
      M694I:{x:IX(694),y0:IY,hy:IY-18,lx:IX(694)+8,ly:IY-15,a:'start'},
      V726A:{x:IX(726),y0:IY,hy:IY-24,lx:IX(726),ly:IY-34,a:'middle'},
      R761H:{x:IX(761),y0:IY,hy:IY-24,lx:IX(761),ly:IY-34,a:'middle'},
      K695R:{x:IX(695),y0:IY+12,hy:IY+30,lx:IX(695),ly:IY+48,a:'middle'},
      A744S:{x:IX(744),y0:IY+12,hy:IY+30,lx:IX(744),ly:IY+48,a:'middle'}};
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    const o1=ramp(t,0,.06),o2=ramp(t,.2,.27),o3=ramp(t,.4,.47),o4=ramp(t,.6,.67),o5=ramp(t,.8,.84);
    /* L1 chromosome */
    s+=`<g style="opacity:${f1(o1)}"><text x="${GX(60)}" y="22" class="t-lbl">⁧כרומוזום 16⁩</text>`;
    s+=`<rect x="${f1(GX(60))}" y="32" width="${f1(GW(232))}" height="22" rx="11" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.2"/><rect x="${f1(GX(306))}" y="32" width="${f1(GW(374))}" height="22" rx="11" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.2"/>`;
    [[92,14],[140,10],[186,18],[236,12],[340,16],[398,22],[470,12],[520,26],[592,14],[640,12]].forEach(([x,w])=>s+=`<rect x="${f1(GX(x))}" y="33" width="${f1(GW(w))}" height="20" style="fill:var(--muted);opacity:.35"/>`);
    s+=`<path d="M${f1(GX(290))} 36L${f1(GX(299))} 43L${f1(GX(308))} 36M${f1(GX(290))} 50L${f1(GX(299))} 43L${f1(GX(308))} 50" style="fill:none;stroke:var(--muted);stroke-width:1.2"/>`;
    s+=`<text x="${f1(GX(N?150:176))}" y="70" class="t-xs t-mid">⁧זרוע קצרה (p)⁩</text><text x="${f1(GX(493))}" y="70" class="t-xs t-mid">⁧זרוע ארוכה (q)⁩</text><text x="${f1(GX(299))}" y="70" class="t-xs t-mid">צנטרומר</text>`;
    s+=`<rect x="${f1(GX(58))}" y="29" width="${f1(N?15:20)}" height="28" rx="4" style="fill:none;stroke:var(--terra);stroke-width:2.2"/></g>`;
    /* L2 band */
    if(o2>0){s+=`<g style="opacity:${f1(o2)}"><path d="M${f1(GX(60))} 57L${f1(GX(78))} 57L${f1(GX(680))} 98L${f1(GX(60))} 98Z" style="fill:var(--terra);opacity:.08"/>`;
      s+=`<text x="${f1(GX(60))}" y="92" class="t-sm" style="fill:var(--terra)">⁧16p13.3 · קצה הזרוע הקצרה⁩</text>`;
      s+=`<line x1="${f1(GX(60))}" y1="105" x2="${f1(GX(680))}" y2="105" style="stroke:var(--muted);stroke-width:2"/>`;
      [[90,30],[150,18],[200,40],[268,22],[420,26],[470,40],[540,20],[590,34],[640,22]].forEach(([x,w])=>s+=`<rect x="${f1(GX(x))}" y="100" width="${f1(GW(w))}" height="10" rx="2" style="fill:var(--panel-2);stroke:var(--line)"/>`);
      s+=`<rect x="${f1(GX(330))}" y="97" width="${f1(GW(56))}" height="16" rx="3" style="fill:var(--terra)"/><text x="${f1(GX(358))}" y="128" class="t-sm t-mid" style="fill:var(--terra);font-weight:600">⁧MEFV · כ־15 kb⁩</text></g>`}
    /* L3 exons */
    if(o3>0){s+=`<g style="opacity:${f1(o3)}"><path d="M${f1(GX(330))} 113L${f1(GX(386))} 113L${f1(GX(680))} 158L${f1(GX(60))} 158Z" style="fill:var(--terra);opacity:.07"/>`;
      s+=`<line x1="${f1(GX(60))}" y1="170" x2="${f1(GX(680))}" y2="170" style="stroke:var(--muted);stroke-width:1.5"/>`;
      EX.forEach(([x,w],i)=>{const hi=i===9;s+=`<rect x="${f1(GX(x))}" y="160" width="${f1(GW(w))}" height="20" rx="3" style="fill:${hi?'var(--terra)':'var(--sea)'};opacity:${hi?1:.75}"/><text x="${f1(GX(x)+GW(w)/2)}" y="194" class="t-xs t-mid" ${hi?'style="fill:var(--terra);font-weight:700"':''}>${i+1}</text>`});
      s+=`<text x="${f1(GX(635))}" y="154" class="t-xs t-mid" style="fill:var(--terra);font-weight:700">⁧אקסון 10⁩</text><text x="${f1(GX(60))}" y="154" class="t-xs">⁧אקסונים (גדלים סכמטיים)⁩</text></g>`}
    /* L4 protein */
    if(o4>0){s+=`<g style="opacity:${f1(o4)}">`;
      s+=`<path d="M${f1(GX(590))} 180L${f1(ax(580))} ${BY}M${f1(GX(680))} 180L${f1(ax(775))} ${BY}" style="stroke:var(--terra);stroke-width:1.2;stroke-dasharray:4 3"/>`;
      s+=`<text x="${f1(GX(60))}" y="${PY}" class="t-sm">⁧פירין · 781 חומצות אמינו⁩</text>`;
      s+=`<rect x="${f1(GX(60))}" y="${BY}" width="${f1(GW(620))}" height="22" rx="5" style="fill:var(--panel-2);stroke:var(--line)"/>`;
      const D=[[1,92,'PYD','var(--sea)'],[266,280,'','var(--gold)'],[370,412,'B-box','var(--crocus)'],[413,442,'CC','var(--muted)'],[580,775,'B30.2','var(--terra)']];
      D.forEach(([a,b,l,c])=>{const x=ax(a),w=ax(b)-ax(a);s+=`<rect x="${f1(x)}" y="${BY}" width="${f1(w)}" height="22" rx="4" style="fill:${c};opacity:.85"/>`;
        if(l&&(!N||l==='PYD'||l==='B30.2'))s+=`<text x="${f1(x+w/2)}" y="${BY+15}" class="t-xs t-mid" style="fill:var(--panel);font-weight:700">${l}</text>`});
      /* the small domains have no room for labels inside the narrow bar: list them instead */
      if(N)s+=`<text x="18" y="${PY+12}" class="t-xs"><tspan style="fill:var(--gold)">bZIP</tspan> 266–280 · <tspan style="fill:var(--crocus)">B-box</tspan> 370–412 · <tspan style="fill:var(--muted)">CC</tspan> 413–442</text>`;
      else s+=`<text x="${f1(ax(273))}" y="${BY-6}" class="t-xs t-mid" style="fill:var(--gold);font-weight:700">bZIP</text>`;
      /* narrow: the 600/781 ticks sit where the hot-spot cone and the exon leaders
         converge, so the ruler stops at 400 (the length is in the label above) */
      (N?[[1,'1'],[200,'200'],[400,'400']]:[[1,'1'],[200,'200'],[400,'400'],[600,'600'],[781,'781']]).forEach(([a,l])=>s+=`<text x="${f1(ax(a))}" y="${BY+36}" class="t-xs t-mid">${l}</text>`);
      s+='</g>'}
    /* L5 pins */
    if(o5>0){s+=`<g style="opacity:${f1(o5)}">`;
      s+=`<path d="M${f1(ax(670))} ${BY+22}L${f1(IX(670))} ${IY}M${f1(ax(770))} ${BY+22}L${f1(IX(770))} ${IY}" style="stroke:var(--muted);stroke-width:1;stroke-dasharray:3 3"/>`;
      s+=`<rect x="${f1(IX(670))}" y="${IY}" width="${f1(IX(770)-IX(670))}" height="12" rx="3" style="fill:var(--terra);opacity:.3"/>`;
      [680,700,720,740,760].forEach(a=>s+=`<line x1="${f1(IX(a))}" x2="${f1(IX(a))}" y1="${IY}" y2="${IY+12}" style="stroke:var(--panel);stroke-width:1"/>`);
      s+=`<text x="${f1(IX(670))}" y="${IY+64}" class="t-xs">⁧הנקודה החמה ב־B30.2, עמדות 670–770 (בהגדלה)⁩</text>`;
      PORD.forEach((id,i)=>{const P=PIN[id],V=GN_VARS.find(v=>v.id===id),o=ramp(t,.8+i*.018,.83+i*.018);if(o<=0)return;
        const on=id===sel,c=GN_CLSC[V.cls],hy=lerp(P.y0,P.hy,ease(o));
        s+=`<g class="clk" data-v="${id}" role="button" aria-label="${id}" style="opacity:${f1(o)}"><line x1="${f1(P.x)}" x2="${f1(P.x)}" y1="${P.y0}" y2="${f1(hy)}" style="stroke:${c};stroke-width:1.6"/>`;
        s+=`<circle cx="${f1(P.x)}" cy="${f1(hy)}" r="${on?7:5.5}" style="fill:${c};stroke:${on?'var(--ink)':'none'};stroke-width:2"/>`;
        s+=`<circle cx="${f1(P.x)}" cy="${f1(hy)}" r="13" style="fill:transparent"/>`;
        s+=`<text x="${f1(P.lx)}" y="${P.ly}" class="t-xs" style="text-anchor:${P.a};fill:${on?'var(--ink)':c};font-weight:700">${id}</text>`;
        if(P.sub)s+=`<text x="${f1(P.lx)}" y="${P.ly+11}" class="t-xs t-mid">${P.sub}</text>`;
        s+='</g>'});
      s+='</g>'}
    svg.innerHTML=s;
    const p=phaseOf(GN_Z,t);setSt(p);$('#gnNote').innerHTML=noteHTML(GN_Z[p]);
  }
  const stop=playWire(rg,$('#gnPlay'),draw,15000,'הפעלה חוזרת','gene');
  const setSt=stepWire($('#gnSteps'),GN_Z,rg,draw,stop);
  function pick(id){sel=id;const V=GN_VARS.find(v=>v.id===id);
    $$('[data-vc]',$('#gnChips')).forEach(b=>b.setAttribute('aria-pressed',b.dataset.vc===id));
    $('#gnVar').innerHTML=`<span class="kicker">${V.ex} · עמדה ${V.aa}</span><h4>${V.id} <span class="gn-cls ${V.cls}">Infevers, נקרא ב־2026-10-16: ${GN_CLSN[V.cls]}</span></h4><dl><dt>היכן הוא שכיח</dt><dd>${V.pop}</dd><dt>חומרה והערות</dt><dd>${V.sev}</dd></dl>`;
    if(+rg.value<.84){rg.value=1}draw(+rg.value)}
  $('#gnChips').innerHTML=GN_VARS.map(v=>`<button class="btn" data-vc="${v.id}" aria-pressed="false"><span style="color:${GN_CLSC[v.cls]}">●</span> ${v.id}</button>`).join('');
  $('#gnLegend').innerHTML=['P','LP','VUS','LB'].map(c=>`<span><i style="background:${GN_CLSC[c]}"></i>${GN_CLSN[c]}</span>`).join('');
  $('#gnChips').addEventListener('click',e=>{const b=e.target.closest('[data-vc]');if(b){stop();pick(b.dataset.vc)}});
  svg.addEventListener('click',e=>{const g=e.target.closest('[data-v]');if(g){stop();pick(g.dataset.v)}});
  draw(+rg.value);
  (()=>{const V=GN_VARS[0];$$('[data-vc]',$('#gnChips')).forEach(b=>b.setAttribute('aria-pressed',b.dataset.vc===V.id));
    $('#gnVar').innerHTML=`<span class="kicker">${V.ex} · עמדה ${V.aa}</span><h4>${V.id} <span class="gn-cls ${V.cls}">Infevers, נקרא ב־2026-10-16: ${GN_CLSN[V.cls]}</span></h4><dl><dt>היכן הוא שכיח</dt><dd>${V.pop}</dd><dt>חומרה והערות</dt><dd>${V.sev}</dd></dl>`})();

  /* ---------- 2. Punnett ---------- */
  const ps=$('#gnPun'),rp=$('#gnPT');let X=GN_CROSS[0];
  const chip=(x,y,a,r=14)=>{const c=a==='V'?'var(--terra)':a==='D'?'var(--bad)':'var(--sea)';return `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" style="fill:${c}"/><text x="${f1(x)}" y="${f1(y+4.5)}" class="t-lbl t-mid" style="fill:var(--panel)">${a==='D'?'Δ':a}</text>`};
  const kind=(a,b)=>(a==='D'||b==='D')?'dom':(a==='V'&&b==='V')?'two':(a==='V'||b==='V')?'car':'none';
  const KN={two:['שני וריאנטים','var(--terra-soft)','var(--terra)'],car:['נשא','var(--gold-soft)','var(--gold)'],none:['בלי וריאנט','var(--sea-soft)','var(--sea)'],dom:['וריאנט דומיננטי','var(--bad-soft)','var(--bad)']};
  function drawP(t){
    /* narrow: both parents stack above a square grid, and the odds move underneath */
    const N=vb(ps,'720 400','400 668');
    const CX=N?[205,315]:[290,410],RY=N?[265,375]:[197,292],HX=N?118:190,HY=N?188:128;
    const GX0=N?150:230,GY0=N?210:150,CW=N?110:120,CH=N?110:95;
    const P1=N?[[175,48],[225,48]]:[[325,52],[375,52]],P2=N?[[175,114],[225,114]]:[[55,245],[105,245]];
    const B1=N?[140,30]:[290,34],B2=N?[140,96]:[20,227];
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    s+=`<rect x="${B1[0]}" y="${B1[1]}" width="120" height="36" rx="18" style="fill:var(--panel);stroke:var(--line)"/><text x="${B1[0]+60}" y="${B1[1]-10}" class="t-sm t-mid">⁧הורה 1: ${X.la}⁩</text>`;
    s+=`<rect x="${B2[0]}" y="${B2[1]}" width="120" height="36" rx="18" style="fill:var(--panel);stroke:var(--line)"/><text x="${B2[0]+60}" y="${B2[1]-10}" class="t-sm t-mid">⁧הורה 2: ${X.lb}⁩</text>`;
    const g=ease(ramp(t,.15,.34));
    /* grid */
    const go=ramp(t,.1,.18);
    s+=`<g style="opacity:${f1(go)}">${N?`<text x="18" y="192" class="t-xs">⁧גמטות מהורה 1⁩</text><text x="${HX}" y="310" class="t-xs t-mid">גמטות</text><text x="${HX}" y="321" class="t-xs t-mid">⁧מהורה 2⁩</text>`:`<text x="350" y="104" class="t-xs t-mid">⁧גמטות מהורה 1⁩</text><text x="${HX}" y="160" class="t-xs t-mid">גמטות</text><text x="${HX}" y="171" class="t-xs t-mid">⁧מהורה 2⁩</text>`}`;
    for(let r=0;r<2;r++)for(let c=0;c<2;c++){const k=kind(X.a[c],X.b[r]),fo=ramp(t,.64+(r*2+c)*.03,.72+(r*2+c)*.03);
      s+=`<rect x="${GX0+c*CW}" y="${GY0+r*CH}" width="${CW}" height="${CH}" style="fill:${fo>0?KN[k][1]:'var(--panel)'};stroke:var(--line);stroke-width:1.5"/>`;
      if(fo>0)s+=`<rect x="${GX0+2+c*CW}" y="${GY0+2+r*CH}" width="${CW-4}" height="${CH-4}" style="fill:none;stroke:${KN[k][2]};stroke-width:2;opacity:${f1(fo)}"/><text x="${CX[c]}" y="${RY[r]+(N?36:34)}" class="t-xs t-mid" style="fill:${KN[k][2]};font-weight:700;opacity:${f1(fo)}">${KN[k][0]}</text>`}
    s+='</g>';
    /* parents' alleles moving to gamete headers */
    P1.forEach(([x,y],i)=>{s+=chip(x,y,X.a[i],12);if(g>0){const hx=lerp(x,CX[i],g),hy=lerp(y,HY,g);s+=`<circle cx="${f1(hx)}" cy="${f1(hy)}" r="${f1(16+4*g)}" style="fill:none;stroke:var(--muted);stroke-dasharray:3 3;opacity:${f1(g)}"/>`+chip(hx,hy,X.a[i])}});
    P2.forEach(([x,y],i)=>{s+=chip(x,y,X.b[i],12);if(g>0){const hx=lerp(x,HX,g),hy=lerp(y,RY[i],g);s+=`<circle cx="${f1(hx)}" cy="${f1(hy)}" r="${f1(16+4*g)}" style="fill:none;stroke:var(--muted);stroke-dasharray:3 3;opacity:${f1(g)}"/>`+chip(hx,hy,X.b[i])}});
    /* fertilization: copies fly into cells */
    for(let r=0;r<2;r++)for(let c=0;c<2;c++){const k=r*2+c,f=ease(ramp(t,.38+k*.06,.5+k*.06));if(f<=0)continue;
      s+=chip(lerp(CX[c],CX[c]-18,f),lerp(HY,RY[r]-4,f),X.a[c],13)+chip(lerp(HX,CX[c]+18,f),lerp(RY[r],RY[r]-4,f),X.b[r],13)}
    /* odds panel */
    const op=ramp(t,.8,.88);
    if(op>0){const cnt={};for(let r=0;r<2;r++)for(let c=0;c<2;c++){const k=kind(X.a[c],X.b[r]);cnt[k]=(cnt[k]||0)+1}
      const ox=N?18:496;
      s+=`<g style="opacity:${f1(op)}"><text x="${ox}" y="${N?456:160}" class="t-sm">לכל ילד</text>`;
      ['dom','two','car','none'].filter(k=>cnt[k]).forEach((k,i)=>{const y=N?490+i*44:196+i*58,pc=cnt[k]*25*ease(ramp(t,.84,.97));
        s+=`<text x="${ox}" y="${y}" class="t-big" style="fill:${KN[k][2]};font-size:26px">${Math.round(pc)}%</text><text x="${N?96:ox}" y="${N?y:y+16}" class="t-xs">${KN[k][0]}</text>`;
        const bx=N?200:556,bw=N?130:56;
        s+=`<rect x="${bx}" y="${y-14}" width="${bw}" height="10" rx="5" style="fill:var(--panel-2)"/><rect x="${bx}" y="${y-14}" width="${f1(bw*pc/100)}" height="10" rx="5" style="fill:${KN[k][2]}"/>`});
      s+='</g>'}
    /* legend */
    const ly=N?624:378,lx0=N?26:40;
    s+=chip(lx0,ly,'V',9)+`<text x="${lx0+14}" y="${ly+4}" class="t-xs">⁧וריאנט FMF⁩</text>`+chip(150,ly,'+',9)+`<text x="164" y="${ly+4}" class="t-xs">עותק רגיל</text>`;
    if(X.id==='dn')s+=chip(N?lx0:260,N?ly+24:ly,'D',9)+`<text x="${(N?lx0:260)+14}" y="${(N?ly+24:ly)+4}" class="t-xs">⁧וריאנט בפעולה דומיננטית (M694del, T577)⁩</text>`;
    ps.innerHTML=s;
    const p=phaseOf(GN_P,t);setP(p);const P=Object.assign({},GN_P[p]);if(p===3)P.txt=X.txt;$('#gnPNote').innerHTML=noteHTML(P);
  }
  const stopP=playWire(rp,$('#gnPPlay'),drawP,12000,'הפעלה חוזרת','gene');
  const setP=stepWire($('#gnPSteps'),GN_P,rp,drawP,stopP);
  $('#gnCross').innerHTML=GN_CROSS.map((c,i)=>`<button class="btn" data-cx="${i}" aria-pressed="${i===0}">${c.n}</button>`).join('');
  const readP=()=>$('#gnPRead').innerHTML=`<span><b>${X.n}</b></span><span>${X.txt}</span>`;
  $('#gnCross').addEventListener('click',e=>{const b=e.target.closest('[data-cx]');if(!b)return;X=GN_CROSS[+b.dataset.cx];
    $$('[data-cx]',$('#gnCross')).forEach(x=>x.setAttribute('aria-pressed',x===b));readP();drawP(+rp.value)});
  readP();drawP(+rp.value);

  /* ---------- 3. read a genetic result ---------- */
  const s1=$('#gnA1'),s2=$('#gnA2');
  const opts=GN_AL.map(([n])=>`<option value="${n}">${n==='none'?'לא נמצא וריאנט':n}</option>`).join('');
  s1.innerHTML=opts;s2.innerHTML=opts;s1.value='M694V';s2.value='none';
  const ST=[['פתוגני',12,'var(--bad)'],['ככל הנראה פתוגני',38,'var(--terra)'],['VUS',176,'var(--warn)'],['ככל הנראה שפיר',143,'var(--good)'],['שפיר',14,'var(--sea)'],['לא מסווג',20,'var(--muted)'],['לא מוכרע',9,'var(--line)']];
  $('#gnStack').innerHTML=ST.map(([n,v,c])=>`<i style="width:${(v/412*100).toFixed(2)}%;background:${c}" title="${n}: ${v}"></i>`).join('');
  $('#gnStackLeg').innerHTML=ST.map(([n,v,c])=>`<span><i style="background:${c}"></i>${n} ${v}</span>`).join('')+'<span>[[Infevers2026]]</span>';
  const grp=c=>(c==='P'||c==='LP')?'path':c==='VUS'?'vus':'out';
  function interp(){
    const A=GN_AL.find(x=>x[0]===s1.value),B=GN_AL.find(x=>x[0]===s2.value);
    const ga=grp(A[1]),gb=grp(B[1]),gs=[ga,gb].sort().join('+');
    let v,cl,txt;
    if(gs==='path+path'){cl='conf';v=A[0]===B[0]?'גנוטיפ מאשר (הומוזיגוט)':'גנוטיפ מאשר (הטרוזיגוט מורכב, אם הווריאנטים בטרנס)';
      txt='שני וריאנטים פתוגניים או ככל הנראה פתוגניים, אחד בכל עותק (דו-אללי). בקריטריונים של Eurofever/PRINTO משנת 2019, ממצא זה יחד עם <b>לפחות 1 מתוך 4</b> פריטים קליניים (אפיזודות של 1 עד 3 ימים, דלקת פרקים, כאב בחזה, כאב בטן) מסווג כ־FMF, בתנאי ששני תנאי סף מתקיימים: סמני שלב חריף מוגברים בזמן התלקחויות, ושיקול של סיבות אחרות כשיש לפחות 6 חודשים של פעילות חוזרת. [[Gattorno2019]]'+(A[0]!==B[0]?' שני וריאנטים שונים נספרים רק אם הם יושבים על עותקים שונים (בטרנס); בדיקה של ההורים היא הדרך המקובלת להראות זאת.':'')}
    else if(gs==='path+vus'){cl='non';v='גנוטיפ לא מאשר: פתוגני + VUS';txt='וריאנט פתוגני אחד ועוד וריאנט בעל משמעות לא ודאית, בטרנס. אז הקריטריונים דורשים <b>לפחות 2 מתוך 4</b> פריטים קליניים. [[Gattorno2019,Lancieri2023]]'}
    else if(gs==='vus+vus'){cl='non';v='גנוטיפ לא מאשר: שני VUS';txt='שני וריאנטים בעלי משמעות לא ודאית, אחד בכל עותק. הקריטריונים דורשים <b>לפחות 2 מתוך 4</b> פריטים קליניים. לפי GeneReviews, שני VUS אינם מבססים FMF וגם אינם שוללים אותה. [[Gattorno2019,GeneReviews]]'}
    else if(gs==='out+path'){cl='non';v='גנוטיפ לא מאשר: וריאנט פתוגני יחיד';txt='וריאנט פתוגני אחד, בלי וריאנט שני שנספר בקריטריונים. הקריטריונים דורשים <b>לפחות 2 מתוך 4</b> פריטים קליניים. מעבדה אחת מסכמת זאת כ"לכל הפחות נשא", שעדיין עשוי לסבול מתסמינים. [[Gattorno2019,ARUP2023]]'}
    else if(gs==='out+vus'){cl='none';v='גנוטיפ שאינו נספר: VUS אחד בלבד';txt='VUS יחיד אינו גנוטיפ מאשר וגם אינו גנוטיפ לא מאשר. הסיווג יתבסס על הסט הקליני בלבד (לפחות 6 מתוך 9 פריטים). תוצאה של VUS אינה חד-משמעית. [[Gattorno2019,ARUP2023]]'}
    else{cl='none';v='אין וריאנט שנספר';txt='וריאנטים שפירים וככל הנראה שפירים אינם נכללים בקריטריונים. כשאין וריאנט פתוגני, FMF פחות סבירה אך אינה נשללת: כ־10% עד 20% מחולי FMF אינם נושאים וריאנט ב־<i>MEFV</i>. הסט הקליני בלבד (לפחות 6 מתוך 9 פריטים) עדיין יכול לסווג FMF. [[Gattorno2019,BenZvi2015,ARUP2023]]'}
    const ex=[];const has=n=>A[0]===n||B[0]===n;
    if(A[0]==='M694V'&&B[0]==='M694V')ex.push('SHARE: להומוזיגוטים ל־M694V יש "סבירות גבוהה מאוד" למחלה חמורה (רמה B), ומי שאין להם תסמינים צריכים להיות במעקב צמוד (רמה A). [[Giancane2015,Ozen2017]]');
    if(has('M694del'))ex.push('M694del יכול לפעול באופן דומיננטי: עותק יחיד גרם ל־FMF בתורשה אוטוזומלית דומיננטית, בחדירות משתנה. [[Booth2000,Rowczenio2015]]');
    if(has('E148Q')&&(gs==='out+vus'||(A[0]==='E148Q'&&B[0]==='E148Q')))ex.push('SHARE: כאשר E148Q הוא הווריאנט היחיד, הוא אינו תומך באבחנה של FMF (רמה B). [[Giancane2015,Ozen2017]]');
    if(has('E148Q')||has('K695R'))ex.push('E148Q ו־K695R קשורים למחלה קלה או לחדירות נמוכה. [[Touitou2001,Lancieri2023]]');
    if(has('A744S')||has('P369S'))ex.push('A744S ו־P369S הם ככל הנראה שפירים ב־Infevers 2026, ולכן הקריטריונים מתעלמים מהם. רשימות ישנות יותר התייחסו אליהם אחרת. [[Infevers2026,Shinar2012]]');
    const row=x=>`<div><b style="font-family:var(--mono);min-width:5.5em">${x[0]==='none'?'—':x[0]}</b><span class="gn-cls ${x[1]}">${x[0]==='none'?'לא נמצא וריאנט':GN_CLSN[x[1]]}</span></div>`;
    $('#gnOut').innerHTML=`<div class="gn-al"><span class="kicker">הסיווג ב־Infevers היום</span>${row(A)}${row(B)}</div>
      <div class="gn-verdict ${cl}"><span class="kicker">גנוטיפ לפי Eurofever/PRINTO 2019</span><b class="v">${v}</b><p>${txt}</p></div>
      ${ex.length?`<ul style="margin:0;padding-left:18px;display:flex;flex-direction:column;gap:6px">${ex.map(x=>`<li>${x}</li>`).join('')}</ul>`:''}
      <div class="pt"><b>במילים פשוטות</b>FMF מאובחנת לפי התסמינים; הבדיקה הגנטית תומכת באבחנה אבל אינה יכולה לשלול אותה. אצל כ־10% עד 20% מהאנשים עם FMF טיפוסית לא נמצא וריאנט, ואצל עד כ־25% נמצא רק וריאנט אחד. [[Giancane2015,BenZvi2015,GeneReviews]]</div>
      <div class="hook"><b>לבחינה</b>הקריטריונים של Eurofever/PRINTO הם קריטריוני <b>סיווג</b> למחקר, לא בדיקה אבחנתית למטופל יחיד. סיווגי הווריאנטים משתנים עם הזמן: הסיווגים המוצגים כאן הם אלה שהופיעו ב־Infevers ב־2026-10-16. [[Gattorno2019,Infevers2026]]</div>
      <p><a href="#dx" data-go="dx">נסו את מחשבון הקריטריונים בפרק אבחון וקריטריונים ←</a></p>`;
    /* chromosome sketch */
    const rx=a=>70+a/781*270;let s='';
    [[A,40,'⁧עותק 1⁩'],[B,92,'⁧עותק 2⁩']].forEach(([x,y,l])=>{s+=`<text x="8" y="${y+4}" class="t-xs">${l}</text><rect x="70" y="${y-7}" width="270" height="14" rx="7" style="fill:var(--panel-2);stroke:var(--line)"/>`;
      s+=`<rect x="${f1(rx(580))}" y="${y-7}" width="${f1(rx(775)-rx(580))}" height="14" rx="3" style="fill:var(--terra);opacity:.18"/>`;
      if(x[0]==='none')s+=`<text x="205" y="${y+4}" class="t-xs t-mid">לא נמצא וריאנט</text>`;
      else{const c=GN_CLSC[x[1]];s+=`<line x1="${f1(rx(x[2]))}" x2="${f1(rx(x[2]))}" y1="${y-7}" y2="${y-16}" style="stroke:${c};stroke-width:2"/><circle cx="${f1(rx(x[2]))}" cy="${y}" r="6" style="fill:${c}"/><text x="${f1(Math.min(rx(x[2]),316))}" y="${y-20}" class="t-xs t-mid" style="fill:${c};font-weight:700">${x[0]}</text>`}});
    s+=`<text x="${f1((rx(580)+rx(775))/2)}" y="116" class="t-xs t-mid">⁧B30.2 (אקסון 10)⁩</text>`;
    $('#gnRes').innerHTML=s;
  }
  s1.addEventListener('change',interp);s2.addEventListener('change',interp);interp();

  /* ---------- 4. cards ---------- */
  $('#gnCards').innerHTML=`
   <div class="card"><h4>פנוטיפ II: עמילואידוזיס כסימן ראשון</h4><p>עמילואידוזיס מסוג AA כסימן הראשון או היחיד, אצל מי שמעולם לא היו לו התקפים. [[Melikoglu2000,GeneReviews]] היא נדירה, וההערכות שונות: לכל היותר 0.3% מהרישום הטורקי של 2,838 חולים, כ־0.6% בסקירה מאוחרת יותר שמחבריה מטילים ספק בכך שזו ישות נפרדת, ואף לא מקרה אחד שהוכח בביופסיה בקרב 461 קרובי משפחה של חולי FMF עם עמילואידוזיס. [[Tunca2005,GulBenChetrit2025,Melikoglu2000]] SHARE ממליצה לעקוב אחרי אנשים עם שני וריאנטים פתוגניים וללא תסמינים, ולשקול טיפול כשיש גורמי סיכון לעמילואידוזיס (רמה B). [[Giancane2015,Ozen2017]]</p></div>
   <div class="card"><h4>וריאנט אחד, תסמינים אמיתיים</h4><p>אצל עד כ־25% מהאנשים עם FMF נמצא רק וריאנט מזוהה אחד [[GeneReviews,MarekYagel2009]]; 12% בעוקבה טורקית אחת [[Lachmann2006]] ו־32% בעוקבת הפניה. [[Tanatar2020]] במחקר Booty 2009 רוצף מחדש כל האזור של 15 kb אצל 46 חולים כאלה, ולא נמצא וריאנט שני; וריאנט אחד יחד עם תסמינים טיפוסיים נחשב מספיק כדי לאבחן FMF ולנסות קולכיצין. [[Booty2009]] Jéru 2013 ראו בהטרוזיגוטיות גורם רגישות, ולא FMF מנדלית. [[Jeru2013]] מינון הגן משפיע. [[Federici2012]]</p></div>
   <div class="card"><h4>וריאנטים דומיננטיים באמת</h4><ul><li><b>M694del</b>: FMF דומיננטית עם חדירות משתנה (Booth 2000); לאחד החולים הייתה עמילואידוזיס מסוג AA. [[Booth2000]] סריקה בבריטניה של כ־3,500 חולים מצאה 21 נשאים, כולם ממוצא צפון־מערב אירופי, עם מייסד משותף מלפני כ־550 שנה; גיל הופעה חציוני 18, ותגובה מצוינת לקולכיצין. [[Rowczenio2015]]</li><li><b>T577N/S/A</b>, ממש לפני B30.2: מחלה אוטו-דלקתית דומיננטית; T577N לא נמצא בכ־6,800 בקרות; מגיבה לקולכיצין. [[Stoffels2014]]</li><li>מעבדה אחת מונה גם את I692del כדומיננטי עם חדירות מופחתת. [[ARUP2023]]</li></ul></div>
   <div class="card"><h4>גנוטיפ וחומרה</h4><p>הומוזיגוטים ל־M694V: הופעה מוקדמת יותר, יותר דלקת פרקים (Shinar 2000). [[Shinar2000]] קשר לעמילואידוזיס: כן אצל 90 ארמנים (Cazeneuve 1999) [[Cazeneuve1999]], לא אצל 2,838 טורקים, אף שגם שם עמילואידוזיס פגעה ב־12.9% מהעוקבה (Tunca 2005). [[Tunca2005]] בקרב 124 הומוזיגוטים ל־M694V, מין זכר (OR 2.37) והתקפים של דלקת פרקים (OR 3.27) העלו את הסיכון לעמילואידוזיס. [[GershoniBaruch2003]]</p><div class="hook"><b>לבחינה</b>המחקרים חלוקים לגבי M694V ועמילואידוזיס; ארץ המוצא היא כשלעצמה גורם סיכון לפי SHARE. [[Giancane2015]]</div></div>
   <div class="card"><h4>מה הפאנלים בודקים</h4><p>מעבדות רבות בודקות בשני שלבים: קודם הווריאנטים הפתוגניים השכיחים, ואחר כך הרצף המקודד כולו. הסריקה מכסה את אקסונים 2, 3, 5 ו־10; חיפוש באקסונים אחרים, כשה־FMF ודאית קלינית, מוסיף מעט. [[Shinar2012]]</p><ul><li>אקסון 2: E148Q, E167D, T267I, R202Q</li><li>אקסון 3: P369S, R408Q · אקסון 5: F479L · אקסון 9: I591T</li><li>אקסון 10: M680I, M694V, M694I, V726A, A744S, R761H, I692del, K695R</li></ul></div>
   <div class="card"><h4>מגבלות הבדיקה</h4><p>כ־10% עד 20% מחולי FMF אינם נושאים וריאנט ב־<i>MEFV</i>, ותמונתם קלאסית אך קלה יותר מזו של הומוזיגוטים ל־M694V. [[BenZvi2015]] מעבדה אחת מעריכה את הרגישות של ריצוף מלא ב־75% עד 90%; וריאנטים אינטרוניים עמוקים ווריאנטים רגולטוריים מוחמצים, ומחיקות או הכפלות גדולות לא דווחו כגורמים למחלה. [[ARUP2023]] FMF נשארת אבחנה קלינית (SHARE, רמה B). [[Giancane2015]]</p></div>
   <div class="card"><h4>מספרי OMIM</h4><ul><li><b>249100</b> FMF, תורשה אוטוזומלית רצסיבית</li><li><b>134610</b> FMF, תורשה אוטוזומלית דומיננטית</li><li><b>608107</b> הגן <i>MEFV</i></li><li><b>608068</b> PAAND</li></ul><p>[[UniProtO15553]]</p></div>
   <div class="card"><h4>PAAND אינה FMF</h4><p>S242R מסלק ישירות אתר קישור של 14-3-3, ולכן עותק אחד גורם למחלה דומיננטית עם דרמטוזיס נויטרופילית, חום ממושך וכאבי שרירים (מיאלגיה). היא מגיבה לטיפול המכוון נגד IL-1, ואינה מתנהגת כמו FMF שמגיבה לקולכיצין. [[Masters2016,Schnappauf2019]]</p></div>`;
};
