/* =============== 3.2 diagnosis & criteria =============== */
const DX_GT={
 conf:`<b>גנוטיפ מאשר:</b> וריאנטים פתוגניים או ככל הנראה פתוגניים ב־<i>MEFV</i> בשני העותקים של הגן: אותו וריאנט פעמיים (הומוזיגוט), או שני וריאנטים שונים, אחד בכל עותק (in trans, הטרוזיגוט מורכב). הכלל: לפחות <b>1</b> מתוך 4 הפריטים הקליניים. [[Gattorno2019,Lancieri2023]]`,
 non:`<b>גנוטיפ לא מאשר:</b> וריאנט פתוגני אחד ועוד וריאנט בעל משמעות לא ודאית (VUS) בעותק השני (in trans), שני VUS, או וריאנט פתוגני יחיד במצב הטרוזיגוטי. הכלל: לפחות <b>2</b> מתוך 4 הפריטים הקליניים. [[Gattorno2019,Lancieri2023]]`,
 none:`<b>אין או לא נבדק:</b> רק הזרוע הקלינית בלבד חלה (לפחות 6 מתוך 9). וריאנטים שפירים וככל הנראה שפירים לעולם אינם נספרים, וסיווג הווריאנטים אמור להתבסס על INSAID/Infevers. [[Gattorno2019,VanGijn2018]]`
};
const DX_EX={
 typ:{pre:[1,1],gt:'conf',ci:['ep','abd','chest','eth'],ab:[]},
 het:{pre:[1,1],gt:'non',ci:['ep','abd'],ab:['aph']},
 pfapa:{pre:[1,1],gt:'none',ci:[],ab:['aph','ln']},
 clr:{pre:[0,0],gt:'none',ci:[],ab:[]}
};
function dxBars(rows){
  return rows.map(r=>`<div class="dx-pr"><span class="lbl">${r.l}</span><div class="dx-bars">
    ${r.s!=null?`<span>רגישות</span><i><b style="width:${(r.s*100).toFixed(1)}%;background:var(--terra)"></b></i><span>${r.st||Math.round(r.s*1000)/10+'%'}</span>`:''}
    ${r.p!=null?`<span>סגוליות</span><i><b style="width:${(r.p*100).toFixed(1)}%;background:var(--sea)"></b></i><span>${r.pt||Math.round(r.p*1000)/10+'%'}</span>`:''}</div></div>`).join('');
}
const DX_CRIT={
 th:{name:'תל השומר',
  groups:[{k:'M',lg:'קריטריונים עיקריים',cls:'',items:['התקפי חום חוזרים עם דלקת הצפק, סינוביטיס (דלקת בפרק) או דלקת קרום הריאה','עמילואידוזיס מסוג AA בלי מחלה אחרת שמסבירה אותה','תגובה טובה לטיפול רציף בקולכיצין']},
          {k:'m',lg:'קריטריונים משניים',cls:'mn',items:['התקפי חום חוזרים','אודם דמוי שושנה','FMF אצל קרוב משפחה מדרגה ראשונה']}],
  def:`מבוססים על סקר תל השומר מ־1967 ועל סיכומים מאוחרים יותר. אבחנה ודאית של FMF מחייבת <b>2 עיקריים</b>, או <b>1 עיקרי + 2 משניים</b>. [[Sohar1967,Pras1998,Lancieri2023]]`,
  judge(c){const M=c.M,m=c.m;if(M>=2||(M>=1&&m>=2))return['yes','FMF ודאית לפי תל השומר',`עיקריים: ${M}, משניים: ${m}.`];
    if(M>=1&&m>=1)return['na','לכל היותר FMF "סבירה"',`עיקריים: ${M}, משניים: ${m}. דרגת "סבירה" עבור 1 עיקרי + 1 משני מופיעה רק במקורות משניים, ולא אומתה בטקסט המקורי.`];
    return['no','קריטריוני תל השומר אינם מתקיימים',`עיקריים: ${M}, משניים: ${m}.`]},
  perf:[{l:'ילדים בטורקיה (Yalçınkaya 2009)',s:.988,p:.546},{l:'ילדים במרשם Eurofever עם קדחות מחזוריות אחרות (Demirkaya 2016)',s:.45,p:.972}],
  pcite:`[[Yalcinkaya2009,Demirkaya2016]] הנתונים של Eurofever הם אלה שבמאמר שפורסם; דיווח מוקדם יותר מכנס מדעי, על אותו מרשם, נתן לתל השומר רגישות נמוכה יותר.`},
 liv:{name:'ליבנה 1997',
  groups:[{k:'M',lg:'קריטריונים עיקריים (התקפים טיפוסיים)',cls:'',items:['דלקת צפק מפושטת','דלקת חד־צדדית של קרום הריאה או של קרום הלב','דלקת בפרק אחד (ירך, ברך או קרסול)','חום בלבד']},
          {k:'m',lg:'קריטריונים משניים',cls:'mn',items:['התקף לא שלם בחזה','התקף לא שלם בפרק','כאב ברגליים במאמץ','תגובה טובה לקולכיצין']},
          {k:'s',lg:'קריטריונים תומכים',cls:'sp',items:['סיפור משפחתי של FMF','מוצא אתני מתאים','גיל הופעה מתחת ל־20','התקפים קשים שמחייבים מנוחה במיטה','הפוגה עצמונית','פרקי זמן ללא תסמינים','תגובה דלקתית חולפת (WBC,‏ ESR,‏ SAA או פיברינוגן)','חלבון או דם בשתן בזמן התקפים (פרוטאינוריה או המטוריה אפיזודית)','ניתוח בטן ללא ממצא (לפרוטומיה), או הוצאת תוספתן "לבן" שלא היה מודלק','קרבת דם בין ההורים']}],
  def:`<b>התקף טיפוסי</b> הוא חוזר (לפחות 3 מאותו סוג), מלווה בחום (חום רקטלי של 38‎ °C ומעלה) וקצר (12 h‏ עד 3 ימים). <b>התקף לא שלם</b> שונה מזה בדבר אחד או בשניים: חום מתחת ל־38‎ °C, משך מחוץ לטווח של 12 h‏ עד 3 ימים אבל לא פחות מ־6 h‏ ולא יותר משבוע, היעדר סימנים צפקיים, כאב בטן ממוקד, או דלקת בפרקים אחרים. [[Livneh1997,Lancieri2023,Sonmez2016]]`,
  judge(c,o){const M=c.M,m=c.m,s=c.s;let ok=M>=1||m>=2,how=M>=1?'לפחות 1 עיקרי':m>=2?'לפחות 2 משניים':'';
    if(!ok&&o.rule==='cons'&&m>=1&&s>=5){ok=true;how='1 משני + לפחות 5 תומכים'}
    const set=o.rule==='cons'?'הכלל השמרני':'הכלל הפשוט';
    return ok?['yes','FMF לפי קריטריוני ליבנה',`${set}: ${how}. נספרו עיקריים: ${M}, משניים: ${m}, תומכים: ${s}.`]:['no','קריטריוני ליבנה אינם מתקיימים',`${set}: נדרשים לפחות 1 עיקרי או לפחות 2 משניים${o.rule==='cons'?', או 1 משני + לפחות 5 תומכים':''}. נספרו עיקריים: ${M}, משניים: ${m}, תומכים: ${s}.`]},
  perf:[{l:'המחקר המקורי: 105 מטופלים מול 106 בקבוצת הביקורת (Livneh 1997)',s:.95,st:'>95%',p:.97,pt:'>97%'},{l:'ילדים במרשם Eurofever עם קדחות מחזוריות אחרות (Demirkaya 2016), סגוליות בלבד',p:.411}],
  pcite:`[[Livneh1997,Demirkaya2016]]`},
 yo:{name:'Yalçınkaya–Özen',
  groups:[{k:'M',lg:'קריטריונים לילדים (ארבעת הראשונים: כל התקף 6 עד 72 h, לפחות 3 התקפים)',cls:'',items:['חום: חום בבית השחי מעל 38‎ °C','כאב בטן','כאב בחזה','דלקת בפרקים בודדים (אוליגוארתריטיס)','סיפור משפחתי של FMF']}],
  def:`נבנו לילדים ב־2009, על סמך 170 ילדים עם שני וריאנטים ו־141 ילדים בקבוצת הביקורת. <b>שניים או יותר</b> מחמשת הקריטריונים מסווגים כ־FMF. המאמר מ־2009 מתאר חמישה פריטים; כמה סקירות מאוחרות יותר מביאות גרסה של שישה פריטים, שמוסיפה כאב ברגליים במאמץ. [[Yalcinkaya2009,Lancieri2023]]`,
  judge(c){const n=c.M;return n>=2?['yes','FMF לפי הקריטריונים לילדים',`${n} מתוך 5 קריטריונים (נדרשים 2). עם 3 או יותר, הסגוליות עולה והרגישות יורדת (Kondi 2010).`]:['no','הקריטריונים לילדים אינם מתקיימים',`${n} מתוך 5 קריטריונים (נדרשים 2).`]},
  perf:[{l:'קבוצת הפיתוח, לפחות 2 קריטריונים (Yalçınkaya 2009)',s:.865,p:.936},{l:'קבוצה מעורבת בצרפת, לפחות 2 קריטריונים (Kondi 2010)',s:1,p:.5},{l:'קבוצה מעורבת בצרפת, לפחות 3 קריטריונים (Kondi 2010)',s:.77,p:.95},{l:'מרשם Eurofever ‏(Demirkaya 2016)',s:.874,p:.407}],
  pcite:`[[Yalcinkaya2009,Kondi2010,Demirkaya2016]]`}
};
const DX_LAB=[
 {from:0,at:.04,k:'ימים ‎−3 עד 0',t:'בין התקפים',
  txt:`במדידות כל שבועיים במשך 5 חודשים, החציון של SAA בין התקפים היה 6 mg/L, והחציון של CRP היה 4 mg/L. רבים נראים בריאים, ותוצאות הבדיקות שלהם קרובות לתקין. [[Lachmann2006]]`,
  pt:'בין התקפים, אצל אנשים רבים בדיקות הדם קרובות לתקין.'},
 {from:.095,at:.112,k:'יום 0',t:'ההתקף מתחיל',
  txt:`IL-1β מתאים לבנים משופעלים מניע את הכבד לייצר CRP ו־SAA. ספירת הלבנים עולה (בעיקר נויטרופילים), ושקיעת הדם (ESR), הפיברינוגן ומערכת המשלים עולים. [[Livneh1997,SoonLaxer2017,ARUP2023]]`,
  pt:'כשהתקף מתחיל, אותות האזעקה של הגוף נדלקים, וסמני הדלקת מטפסים בתוך שעות.'},
 {from:.135,at:.15,k:'ימים 1 עד 2',t:'שיא תגובת השלב החריף',
  txt:`בזמן התקפים, החציונים היו SAA ‏693 mg/L ו־CRP ‏115 mg/L. במחקר של Korkmaz מ־2002, CRP היה חלבון השלב החריף היחיד שעלה בכל התקף, ואילו הטסיות, הפריטין והאלבומין לא השתנו. [[Lachmann2006,Korkmaz2002]]`,
  pt:'באמצע התקף, SAA ו־CRP יכולים להיות גבוהים פי מאה מהרגיל.',
  hook:`<b>פריטין וטסיות</b> שאינם משתנים בזמן התקף עם חום מתאימים ל־FMF. פריטין גבוה מאוד מכוון למחלת סטיל (Still) או לזיהום. [[Korkmaz2002,Yamaguchi1992]]`},
 {from:.2,at:.27,k:'ימים 3 עד 10',t:'ההתקף שוכך',
  txt:`ההתקף חולף מעצמו והסמנים יורדים חזרה. הקריטריונים התומכים של ליבנה מכנים זאת תגובה דלקתית "חולפת". מהירות הירידה המדויקת משתנה; העקומות כאן סכמטיות. [[Livneh1997]]`,
  pt:'כשההתקף דועך, הסמנים יורדים חזרה מעצמם.'},
 {from:.42,at:.75,k:'שבועות 2 עד 4',t:'בדיקה חוזרת כשמרגישים טוב',
  txt:`אצל כשליש מהמטופלים נמצא SAA מוגבר בין התקפים (Berkun 2007), ואצל כשני שלישים הייתה תגובת שלב חריף מתמשכת כלשהי (Korkmaz 2002).‏ SAA מוגבר באופן מתמשך היה קשור להומוזיגוטיות ל־M694V, לחלבון בשתן ולדילוג על מנות קולכיצין. SAA או CRP גבוהים באופן מתמשך מרמזים על טיפול חסר ומעלים את הסיכון לעמילואידוזיס. [[Berkun2007,Korkmaz2002,Ozen2016]]`,
  pt:'גם בדיקת דם ביום טוב חשובה. דלקת נסתרת ומתמשכת היא מה שפוגע בכליות לאט.',
  hook:`EULAR 2016 ממליצה לבדוק סמני שלב חריף גם <b>בין</b> התקפים, ולא רק בזמנם, כי עלייה מתמשכת, ולא ההתקפים עצמם, היא מה שמזין עמילואידוזיס מסוג AA. [[Ozen2016,Berkun2007]]`}
];
const DX_PL=[.02,.18,.34,.5,.66,.82];
const DX_PATH=[
 {from:DX_PL[0],at:.1,k:'שלב 1',t:'חום חוזר שחולף מעצמו + סרוזיטיס',
  txt:`התקף טיפוסי הוא חוזר (לפחות 3 מאותו סוג), מלווה בחום (38‎ °C ומעלה) וקצר (12 h‏ עד 3 ימים), עם דלקת הצפק, דלקת קרום הריאה או דלקת פרקים, והאדם מרגיש טוב בין התקפים. [[Lancieri2023,Livneh1997]]`,
  pt:'הסיפור קודם לכול: התקפים קצרים וחוזרים של חום וכאב, שחולפים מעצמם.'},
 {from:DX_PL[1],at:.26,k:'שלב 2',t:'שלילת מצבים מחקים',
  txt:`קודם כול שוללים זיהום, קדחות מחזוריות אחרות ובטן כירורגית אמיתית. דלקת הצפק ב־FMF יכולה לחקות בטן חריפה, עם רגישות בהרפיה (rebound), קשיחות של דופן הבטן ומפלסי אוויר־נוזל. מתוך 182 מטופלי FMF, ‏40% עברו כריתת תוספתן (12 עד 25% באוכלוסייה הכללית), ו־80% מהתוספתנים שהוצאו לא היו מודלקים (כ־20% בדרך כלל). הומוזיגוטיות ל־M694V ומחלה קשה היו גורמי סיכון. [[Lancieri2023,Lidar2008]]`,
  pt:'התקף בטן של FMF יכול להיראות בדיוק כמו דלקת תוספתן, ואנשים רבים עם FMF עברו ניתוח שלא היו צריכים.',
  hook:`ב־FMF, מעבר מכאב <b>מפושט</b> לכאב <b>ברביע הימני התחתון</b> היה המנבא הטוב ביותר לתוספתן מודלק באמת. [[Lidar2008]]`},
 {from:DX_PL[2],at:.42,k:'שלב 3',t:'סמני שלב חריף, פעמיים',
  txt:`CRP,‏ SAA,‏ ESR וספירת הלבנים נבדקים בזמן התקף, ושוב כשמרגישים טוב. ערכים גבוהים בהתקף ותקינים או כמעט תקינים אחריו תומכים ב־FMF. סמנים מוגברים בהתלקחויות הם תנאי סף בקריטריוני Eurofever/PRINTO. [[Korkmaz2002,Gattorno2019,Livneh1997]]`,
  pt:'בדיקת דם אחת בזמן התקף, ואחת ביום טוב. ההבדל ביניהן הוא הרמז.'},
 {from:DX_PL[3],at:.58,k:'שלב 4',t:'בדיקה גנטית של MEFV',
  txt:`שני וריאנטים פתוגניים: מתאים ל־FMF. וריאנט אחד: לפחות נשא, ותסמינים עדיין אפשריים. אף וריאנט: FMF פחות סבירה, אבל לא נשללת; לכ־10 עד 20% מחולי FMF אין וריאנט ב־<i>MEFV</i>.‏ VUS אינו חד־משמעי. הסריקה הסטנדרטית מכסה את אקסונים 2, 3, 5 ו־10. [[ARUP2023,BenZvi2015,Shinar2012]]`,
  pt:'הבדיקה הגנטית יכולה לתמוך באבחנה, אבל לא לשלול אותה.',
  hook:`FMF נשארת <b>אבחנה קלינית</b> (המלצות SHARE). הגנטיקה תומכת בה, אבל אינה יכולה לשלול אותה. [[Giancane2015]]`},
 {from:DX_PL[4],at:.74,k:'שלב 5',t:'ניסיון טיפולי בקולכיצין',
  txt:`GeneReviews מתאר ניסיון טיפולי בקולכיצין למשך שישה חודשים כדי לבסס את האבחנה, כשהבדיקה המולקולרית אינה חד־משמעית. Booty ועמיתיו (2009) הסיקו שווריאנט אחד יחד עם תסמינים טיפוסיים מצדיק ניסיון כזה. תגובה לטיפול היא קריטריון עיקרי בתל השומר וקריטריון משני בליבנה. [[GeneReviews,Booty2009,Pras1998,Livneh1997]]`,
  pt:'אם קולכיצין יומי עוצר את ההתקפים במשך חודשים, זה תומך מאוד ב־FMF.'},
 {from:DX_PL[5],at:.95,k:'שלב 6',t:'הערכה חוזרת לאורך חודשים',
  txt:`קולכיצין מונע התקפים לחלוטין אצל כ־60 עד 70% מהמטופלים, נותן תגובה חלקית אצל 20 עד 30%, ונכשל אצל כ־5%. EULAR 2016 המליצה לבחון את התגובה, את הרעילות ואת ההיענות לטיפול כל 6 חודשים; העדכון של EULAR/PReS מ־2024, שפורסם ב־2025, שומר על מעקב סדיר אבל אינו קובע מרווח קבוע, ומבקש מעקב תכוף יותר בזמן האבחנה וכשהמחלה אינה בשליטה. מהלך לא טיפוסי מחזיר את הבירור אל המצבים המחקים. [[SoonLaxer2017,Ozen2016,Ozen2025,Cush2025]]`,
  pt:'הרופאים ממשיכים לבדוק: האם ההתקפים נעלמו, והאם בדיקות הדם רגועות ביניהם?'}
];
inits.dx=()=>{
  /* ---------- Eurofever/PRINTO calculator ---------- */
  const g=$('#dxGauge');let gt='none';const shown={g:0,c:0};let stopG=null,gTok=0;
  const st=()=>{const ci={},ab={};$$('[data-ci]').forEach(b=>ci[b.dataset.ci]=b.checked);$$('[data-ab]').forEach(b=>ab[b.dataset.ab]=b.checked);
    const gN=['ep','arth','chest','abd'].filter(k=>ci[k]).length;
    const cN=['eth','ep','arth','chest','abd'].filter(k=>ci[k]).length+['aph','urt','mp','ln'].filter(k=>!ab[k]).length;
    return{pre:$('#dxPre1').checked&&$('#dxPre2').checked,gN,cN}};
  function gauge(gv,cv,need,met,G,Cn){
    let s='';
    /* narrow: the segment bar and the 0–9 arc both run the full width of a taller stage */
    const N=vb(g,'400 262','400 356');
    const Q=N?{bx:10,bw:88,bs:96,by:30,bh:28,ty:16,lab:48,mk1:24,mk2:62,mky:76,sumY:96,arm2:124,cx:200,cy:310,R:158,endX:390}
             :{bx:20,bw:84,bs:92,by:26,bh:20,ty:16,lab:40,mk1:20,mk2:52,mky:64,sumY:80,arm2:104,cx:200,cy:232,R:100,endX:380};
    s+=`<text x="${Q.bx}" y="${Q.ty}" class="t-sm">⁧זרוע 1 · גנוטיפ MEFV + פריטים קליניים⁩</text>`;
    const dim=need?1:.35;
    for(let i=0;i<4;i++){const x=Q.bx+i*Q.bs,f=clamp(gv-i);
      s+=`<rect x="${x}" y="${Q.by}" width="${Q.bw}" height="${Q.bh}" rx="6" style="fill:var(--panel-2);stroke:var(--line);opacity:${dim}"/>`;
      if(f>0)s+=`<rect x="${x}" y="${Q.by}" width="${f1(Q.bw*f)}" height="${Q.bh}" rx="6" style="fill:${met.g?'var(--good)':'var(--terra)'};opacity:${f1(.38*dim)}"/>`;
      if(f>.98)s+=`<rect x="${x}" y="${Q.by}" width="${Q.bw}" height="${Q.bh}" rx="6" style="fill:none;stroke:${met.g?'var(--good)':'var(--terra)'};stroke-width:2;opacity:${dim}"/>`;
      s+=`<text x="${x+Q.bw/2}" y="${Q.lab}" class="t-xs t-mid" style="fill:${f>.5&&need?'var(--ink)':'var(--muted)'};font-weight:700">${['⁧1-3 ימים⁩','פרקים','חזה','בטן'][i]}</text>`}
    if(need){const x=Q.bx+need*Q.bs-4;s+=`<line x1="${x}" x2="${x}" y1="${Q.mk1}" y2="${Q.mk2}" style="stroke:var(--ink);stroke-width:2.5"/><text x="${x}" y="${Q.mky}" class="t-xs t-mid" style="fill:var(--ink)">⁧לפחות ${need}⁩</text>`;
      s+=`<text x="${Q.endX}" y="${Q.sumY}" class="t-sm t-end" style="fill:${met.g?'var(--good)':'var(--muted)'}">⁧${G} מתוך 4 פריטים · ${met.g?'הזרוע מתקיימת':'הזרוע אינה מתקיימת'}⁩</text>`}
    else s+=`<text x="200" y="${Q.sumY-8}" class="t-sm t-mid">⁧אין גנוטיפ מתאים: זרוע 1 אינה חלה⁩</text>`;
    s+=`<text x="${Q.bx}" y="${Q.arm2}" class="t-sm">⁧זרוע 2 · קלינית בלבד (לפחות 6 מתוך 9)⁩</text>`;
    const cx=Q.cx,cy=Q.cy,R=Q.R,pt=v=>{const a=Math.PI-Math.PI*v/9;return[cx+R*Math.cos(a),cy-R*Math.sin(a)]};
    s+=`<path d="M${cx-R} ${cy} A${R} ${R} 0 0 1 ${cx+R} ${cy}" style="fill:none;stroke:var(--panel-2);stroke-width:22;stroke-linecap:butt"/>`;
    if(cv>.01){const[ex,ey]=pt(cv);s+=`<path d="M${cx-R} ${cy} A${R} ${R} 0 0 1 ${f1(ex)} ${f1(ey)}" style="fill:none;stroke:${met.c?'var(--good)':'var(--terra)'};stroke-width:22"/>`}
    for(let v=1;v<9;v++){const a=Math.PI-Math.PI*v/9;s+=`<line x1="${f1(cx+(R-11)*Math.cos(a))}" y1="${f1(cy-(R-11)*Math.sin(a))}" x2="${f1(cx+(R+11)*Math.cos(a))}" y2="${f1(cy-(R+11)*Math.sin(a))}" style="stroke:var(--panel);stroke-width:2"/>`}
    {const a=Math.PI/3;s+=`<line x1="${f1(cx+(R-14)*Math.cos(a))}" y1="${f1(cy-(R-14)*Math.sin(a))}" x2="${f1(cx+(R+16)*Math.cos(a))}" y2="${f1(cy-(R+16)*Math.sin(a))}" style="stroke:var(--ink);stroke-width:3"/><text x="${f1(cx+(R+26)*Math.cos(a))}" y="${f1(cy-(R+26)*Math.sin(a)+4)}" class="t-sm t-mid" style="fill:var(--ink)">6</text>`}
    s+=`<text x="${cx-R}" y="${cy+20}" class="t-xs t-mid">0</text><text x="${cx+R}" y="${cy+20}" class="t-xs t-mid">9</text>`;
    s+=`<text x="${cx}" y="${cy-8}" class="t-big t-mid" style="font-size:38px;fill:${met.c?'var(--good)':'var(--ink)'}">${Cn}</text><text x="${cx}" y="${cy+14}" class="t-xs t-mid">⁧מתוך 9 · ${met.c?'הזרוע מתקיימת':'הזרוע אינה מתקיימת'}⁩</text>`;
    g.innerHTML=s;
  }
  function update(){
    const S=st(),need=gt==='conf'?1:gt==='non'?2:0;
    const met={g:need>0&&S.gN>=need,c:S.cN>=6};
    const from={...shown};stopG&&stopG();
    stopG=animate(550,p=>{const e=ease(p);shown.g=lerp(from.g,S.gN,e);shown.c=lerp(from.c,S.cN,e);gauge(shown.g,shown.c,need,met,S.gN,S.cN)},()=>{stopG=null});
    const tok=++gTok;setTimeout(()=>{if(tok!==gTok)return;stopG&&stopG();stopG=null;shown.g=S.gN;shown.c=S.cN;gauge(S.gN,S.cN,need,met,S.gN,S.cN)},700);
    if(RM)gauge(S.gN,S.cN,need,met,S.gN,S.cN);
    const arms=[met.g&&'זרוע הגנוטיפ והקליניקה',met.c&&'הזרוע הקלינית בלבד'].filter(Boolean).join(' וגם ');
    const v=$('#dxVerdict');
    if(!S.pre){v.className='dx-verdict na';v.innerHTML=`<strong>הקריטריונים עוד לא הופעלו</strong><span>שני תנאי הסף חייבים להתקיים לפני שאחת הזרועות מקבלת ציון. ${arms?'אילו התקיימו, הציונים היו מספיקים לפי '+arms+'.':''}</span>`}
    else if(arms){v.className='dx-verdict yes';v.innerHTML=`<strong>מסווג כ־FMF (לצורך סיווג מחקרי)</strong><span>מתקיים לפי ${arms}.</span>`}
    else{v.className='dx-verdict';v.innerHTML=`<strong>לא מסווג כ־FMF לפי הקריטריונים האלה</strong><span>זה לא שולל FMF. קריטריוני סיווג מוותרים על חלק מהרגישות לטובת הסגוליות.</span>`}
    v.innerHTML+=`<span class="stage-cap">קריטריוני סיווג למחקרים, לא בדיקה אבחונית לאדם יחיד.</span>`;
    $('#dxGtDef').innerHTML=DX_GT[gt];
  }
  function setGt(k){gt=k;$$('[data-gt]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.gt===k))}
  $$('[data-gt]').forEach(b=>b.addEventListener('click',()=>{setGt(b.dataset.gt);update()}));
  $$('#m-dx .dx-form input[type=checkbox]').forEach(c=>c.addEventListener('change',update));
  $$('[data-dxex]').forEach(b=>b.addEventListener('click',()=>{const E=DX_EX[b.dataset.dxex];
    $('#dxPre1').checked=!!E.pre[0];$('#dxPre2').checked=!!E.pre[1];
    $$('[data-ci]').forEach(c=>c.checked=E.ci.includes(c.dataset.ci));$$('[data-ab]').forEach(c=>c.checked=E.ab.includes(c.dataset.ab));
    setGt(E.gt);update()}));
  $('#dxPerfG').innerHTML=dxBars([{l:'קבוצת הפיתוח',s:.94,p:.95},{l:'קבוצת התיקוף (n≈1,010)',s:.89,p:1}]);
  $('#dxPerfC').innerHTML=dxBars([{l:'קבוצת הפיתוח',s:.91,p:.92},{l:'קבוצת התיקוף',s:.85,p:.94}]);
  {const E=DX_EX.typ;$('#dxPre1').checked=true;$('#dxPre2').checked=true;$$('[data-ci]').forEach(c=>c.checked=E.ci.includes(c.dataset.ci));setGt('conf')}
  gauge(0,0,1,{g:0,c:0},0,0);update();

  /* ---------- older criteria sets ---------- */
  let crit='th';const cst={th:{},liv:{},yo:{}};const lopt={rule:'simple',ia:'maj'};
  function critGroups(){const C=DX_CRIT[crit];if(crit!=='liv')return C.groups;
    const gs=C.groups.map(x=>({...x,items:x.items.map((t,i)=>({t,id:x.k+i}))}));
    gs[lopt.ia==='maj'?0:1].items.push({t:'התקף בטן לא שלם',id:'ia',flag:1});return gs}
  function critForm(){const C=DX_CRIT[crit];let h='';
    if(crit==='liv')h+=`<div class="ctrls" role="group" aria-label="מערכת כללים"><span class="kicker">מערכת כללים</span><button class="btn" data-lr="simple" aria-pressed="${lopt.rule==='simple'}">פשוטה</button><button class="btn" data-lr="cons" aria-pressed="${lopt.rule==='cons'}">שמרנית</button></div>
      <div class="ctrls" role="group" aria-label="התקף בטן לא שלם"><span class="kicker">"התקף בטן לא שלם" נספר כקריטריון</span><button class="btn" data-lia="maj" aria-pressed="${lopt.ia==='maj'}">עיקרי</button><button class="btn" data-lia="min" aria-pressed="${lopt.ia==='min'}">משני</button></div>
      <p class="dx-def"><span class="tag warn">המקורות חלוקים</span> שחזורים של המאמר מ־1997 חלוקים בשאלה אם התקף בטן לא שלם הוא קריטריון עיקרי או משני; הסקירה של Lancieri מ־2023 מונה אותו כמשני. החליפו את המתג כדי לראות אם זה משנה את התוצאה. [[Livneh1997,Lancieri2023]]</p>`;
    h+=`<p class="dx-def">${C.def}</p>`;
    critGroups().forEach(gr=>{h+=`<fieldset><legend>${gr.lg}</legend>`;
      gr.items.forEach((it,i)=>{const t=typeof it==='string'?it:it.t,id=typeof it==='string'?gr.k+i:it.id;
        h+=`<label class="dx-ck"><input type="checkbox" data-cr="${id}" data-grp="${gr.k}" ${cst[crit][id]?'checked':''}><span>${t}${it.flag?' <small>(המיקום שנוי במחלוקת)</small>':''}</span></label>`});
      if(gr.k==='s')h+=`<p class="dx-def">קריטריונים תומכים נספרים רק בכלל השמרני (1 משני + לפחות 5 תומכים), וזה הכלל שמחושב כאן. שחזור אחד של המאמר מתיר גם 1 משני + לפחות 4 מתוך 5 הקריטריונים התומכים הראשונים. [[Livneh1997,Lancieri2023]]</p>`;
      h+='</fieldset>'});
    $('#dxCritForm').innerHTML=h;critOut()}
  function critOut(){const C=DX_CRIT[crit];const c={M:0,m:0,s:0};
    $$('#dxCritForm [data-cr]').forEach(x=>{if(x.checked)c[x.dataset.grp]++});
    const[cls,ttl,sub]=C.judge(c,lopt);const o=$('#dxCritOut');o.className='dx-verdict'+(cls==='yes'?' yes':cls==='na'?' na':'');
    const dots=(n,tot,k,l)=>tot?`<em>${l}</em>`+Array.from({length:tot},(_,i)=>`<span class="${i<n?'on':''} ${k}"></span>`).join(''):'';
    const tot=k=>critGroups().filter(x=>x.k===k).reduce((a,x)=>a+x.items.length,0);
    o.innerHTML=`<span class="kicker">${C.name}</span><strong>${ttl}</strong><div class="dx-dots">${dots(c.M,tot('M'),'',crit==='yo'?'קריטריונים':'עיקריים')}${dots(c.m,tot('m'),'mn','משניים')}${dots(c.s,tot('s'),'sp','תומכים')}</div><span>${sub}</span>`;
    $('#dxCritPerf').innerHTML=`<span class="kicker">איך הם תפקדו</span>${dxBars(C.perf)}<p class="stage-cap">מקורות: ${C.pcite}</p>`}
  $('#dxCritForm').addEventListener('change',e=>{const x=e.target.closest('[data-cr]');if(!x)return;cst[crit][x.dataset.cr]=x.checked;critOut()});
  $('#dxCritForm').addEventListener('click',e=>{const a=e.target.closest('[data-lr]'),b=e.target.closest('[data-lia]');
    if(a){lopt.rule=a.dataset.lr;critForm()}if(b){lopt.ia=b.dataset.lia;critForm()}});
  $$('[data-crit]').forEach(b=>b.addEventListener('click',()=>{crit=b.dataset.crit;$$('[data-crit]').forEach(x=>x.setAttribute('aria-pressed',x===b));critForm()}));
  cst.th={M0:true,m0:true,m2:true};cst.liv={M0:true};cst.yo={M0:true,M1:true};
  critForm();

  /* ---------- labs across an attack ---------- */
  const ls=$('#dxLabSvg'),lr=$('#dxLabT');let pers=false;
  const D0=-3,D1=28,dOf=t=>D0+t*(D1-D0);
  const gF=(d,tp,tau)=>d<0?0:d<tp?ease(d/tp):Math.exp(-(d-tp)/tau);
  const ROWS=[
   {n:'SAA',u:'mg/L',c:'var(--gold)',pk:693,b:6,sc:750,f:d=>gF(d,1.5,1.8),p:1},
   {n:'CRP',u:'mg/L',c:'var(--terra)',pk:115,b:4,sc:130,f:d=>gF(d,1.4,1.5),p:1},
   {n:'⁧WBC / נויטרופילים⁩',u:'עולים בהתקפים',c:'var(--crocus)',f:d=>.7*gF(d,1,1.4),q:1},
   {n:'⁧ESR / פיברינוגן⁩',u:'עולים, ויורדים לאט יותר',c:'var(--sea)',f:d=>.72*gF(d,2.6,4.5),p:.6,q:1},
   {n:'פריטין',u:'ללא שינוי',c:'var(--muted)',f:()=>.18,flat:1},
   {n:'טסיות',u:'ללא שינוי',c:'var(--muted)',f:()=>.42,flat:1}];
  const val=(R,d)=>{let v=R.f(d);if(pers&&R.p&&!R.flat){const fl=.09*R.p;v=fl+(1-fl)*v}return v};
  function drawLab(t){const d=dOf(t);let s='';
    /* narrow: each row keeps its track but the name moves onto a header line above it,
       the names are shortened and the day axis loses its most crowded ticks */
    const N=vb(ls,'720 410','400 524');
    const L=N?{X0:8,X1:392,Y0:30,RH:74,TOP:18,H:44,ticks:[-2,0,4,7,14,21,28]}
             :{X0:150,X1:700,Y0:26,RH:58,TOP:6,H:44,ticks:[-2,0,2,4,7,14,21,28]};
    const X0=L.X0,X1=L.X1,xd=k=>X0+(k-D0)/(D1-D0)*(X1-X0),yEnd=L.Y0+L.RH*6;
    const NB=` · `;
    if(N)s+=`<text x="${f1(xd(1.5))}" y="13" class="t-xs t-mid" style="fill:var(--terra)">⁧התקף (1 עד 3 ימים)⁩</text><text x="${X1}" y="13" class="t-xs t-end">העקומות סכמטיות</text>`;
    else{s+=`<rect x="${f1(xd(0))}" y="20" width="${f1(xd(3)-xd(0))}" height="350" style="fill:var(--terra-soft);opacity:.7"/><text x="${f1(xd(1.5))}" y="14" class="t-xs t-mid" style="fill:var(--terra)">⁧התקף (1 עד 3 ימים)⁩</text>`;
      L.ticks.forEach(k=>{s+=`<line x1="${f1(xd(k))}" x2="${f1(xd(k))}" y1="20" y2="370" class="grid"/>`});
      s+=`<text x="${X1}" y="14" class="t-xs t-end">צורות העקומות סכמטיות: לא פורסמה עקומה של יום אחר יום</text>`}
    L.ticks.forEach(k=>{s+=`<text x="${f1(xd(k))}" y="${N?yEnd+16:386}" class="t-xs t-mid">${k}</text>`});
    s+=`<text x="${X1}" y="${N?yEnd+32:403}" class="t-xs t-end">ימים מתחילת ההתקף</text>`;
    ROWS.forEach((R,i)=>{const y0=L.Y0+i*L.RH,yb=y0+L.TOP+L.H,h=L.H,yv=v=>yb-h*clamp(v,0,1.05);
      if(N){let rt=`<tspan>${R.un||R.u}</tspan>`;
        if(R.pk&&d>=1.5)rt+=`<tspan style="fill:${R.c}">${NB}חציון בהתקף ${R.pk}</tspan>`;
        if(R.pk&&d>=8)rt+=`<tspan>${NB}${pers?'נשאר גבוה':'בין התקפים '+R.b}</tspan>`;
        if(R.flat&&d>=1)rt+=`<tspan style="fill:var(--good)">${NB}ללא שינוי לאורך ההתקף</tspan>`;
        s+=`<text x="6" y="${y0+12}" class="t-lbl" style="fill:${R.flat?'var(--muted)':'var(--ink)'}">${R.nn||R.n}</text><text x="${X1}" y="${y0+12}" class="t-xs t-end">⁧${rt}⁩</text>`;
        s+=`<rect x="${f1(xd(0))}" y="${y0+L.TOP}" width="${f1(xd(3)-xd(0))}" height="${h}" style="fill:var(--terra-soft);opacity:.7"/>`;
        L.ticks.forEach(k=>{s+=`<line x1="${f1(xd(k))}" x2="${f1(xd(k))}" y1="${y0+L.TOP}" y2="${yb}" class="grid"/>`})}
      else s+=`<text x="10" y="${y0+20}" class="t-lbl" style="fill:${R.flat?'var(--muted)':'var(--ink)'}">${R.n}</text><text x="10" y="${y0+36}" class="t-xs">${R.u}</text>`;
      s+=`<line x1="${X0}" x2="${X1}" y1="${yb}" y2="${yb}" class="axis"/>`;
      let gp='',bp='';for(let k=0;k<=220;k++){const dd=D0+k/220*(D1-D0),x=xd(dd),y=yv(val(R,dd)*(R.sc?R.pk/R.sc:1));gp+=(k?'L':'M')+f1(x)+' '+f1(y);if(dd<=d)bp+=(bp?'L':'M')+f1(x)+' '+f1(y)}
      s+=`<path d="${gp}" style="fill:none;stroke:${R.c};stroke-width:1.4;opacity:.25"/>`;
      if(bp)s+=`<path d="${bp}" style="fill:none;stroke:${R.c};stroke-width:${R.flat?2:2.8};stroke-linejoin:round"/>`;
      const cy=yv(val(R,d)*(R.sc?R.pk/R.sc:1));s+=`<circle cx="${f1(xd(d))}" cy="${f1(cy)}" r="4.5" style="fill:${R.c};stroke:var(--panel);stroke-width:1.5"/>`;
      if(N)s+=`<line x1="${f1(xd(d))}" x2="${f1(xd(d))}" y1="${y0+L.TOP}" y2="${yb}" style="stroke:var(--ink);stroke-width:1.2;opacity:.45"/>`;
      else{
        if(R.pk&&d>=1.5)s+=`<text x="${f1(xd(3)+10)}" y="${y0+10}" class="t-xs" style="fill:${R.c}">⁧חציון בהתקף ${R.pk} ${R.u}⁩</text>`;
        if(R.pk&&d>=8)s+=`<text x="${X1-2}" y="${y0+26}" class="t-xs t-end">⁧${pers?'נשאר מעל התקין (סכמטי)':'בין התקפים: חציון '+R.b+' '+R.u}⁩</text>`;
        if(R.flat&&d>=1)s+=`<text x="${f1(xd(3)+8)}" y="${f1(cy-6)}" class="t-xs" style="fill:var(--good)">ללא שינוי לאורך ההתקף</text>`}
    });
    if(!N)s+=`<line x1="${f1(xd(d))}" x2="${f1(xd(d))}" y1="20" y2="370" style="stroke:var(--ink);stroke-width:1.2;opacity:.45"/>`;
    ls.innerHTML=s;
    const num=R=>{const raw=val(R,d);if(pers&&(d<0||d>8))return'מעל התקין';return'≈'+Math.round(R.b+(R.pk-R.b)*(raw-(pers?.09:0))/(1-(pers?.09:0)))+' mg/L'};
    const q=R=>{const v=val(R,d);return v>.15?'מוגבר':pers&&R.p&&(d<0||d>8)?'מוגבר מעט':'תקין'};
    $('#dxLabRead').innerHTML=`<span>יום <b>‎${f1(d)}</b></span><span>SAA <b>${num(ROWS[0])}</b></span><span>CRP <b>${num(ROWS[1])}</b></span><span>WBC <b>${q(ROWS[2])}</b></span><span>ESR <b>${q(ROWS[3])}</b></span><span>פריטין <b>ללא שינוי</b></span><span>טסיות <b>ללא שינוי</b></span>`;
    const p=phaseOf(DX_LAB,t);setLab(p);
    let extra='';if(pers)extra=`<div class="kv"><div><dt>התרחיש הזה</dt><dd>SAA ו־CRP אף פעם לא חוזרים לגמרי לתקין. בערך שליש עד שני שלישים מהמטופלים מראים דלקת כלשהי בין התקפים, וזה הדפוס שקשור לעמילואידוזיס. [[Berkun2007,Korkmaz2002,Lachmann2006]]</dd></div></div>`;
    $('#dxLabNote').innerHTML=noteHTML(DX_LAB[p])+extra}
  const stopL=playWire(lr,$('#dxLabPlay'),drawLab,15000,'הפעלה חוזרת','dx');
  const setLab=stepWire($('#dxLabSteps'),DX_LAB,lr,drawLab,stopL);
  const ptog=v=>{pers=v;$('#dxLabNorm').setAttribute('aria-pressed',!v);$('#dxLabPers').setAttribute('aria-pressed',v);drawLab(+lr.value)};
  $('#dxLabNorm').onclick=()=>ptog(false);$('#dxLabPers').onclick=()=>ptog(true);
  drawLab(+lr.value);

  /* ---------- diagnostic pathway ---------- */
  const ps=$('#dxPathSvg'),pr=$('#dxPathT');
  const PN=[{a:'חום חוזר שחולף מעצמו',b:'⁧חום + סרוזיטיס, 1 עד 3 ימים⁩'},{a:'שלילת מצבים מחקים',b:'זיהום, בטן כירורגית, קדחות אחרות'},{a:'סמני שלב חריף',b:'בהתקף ובין התקפים'},
            {a:'⁧בדיקת MEFV⁩',b:'⁧אקסונים 2, 3, 5 ו־10⁩'},{a:'ניסיון בקולכיצין',b:'⁧6 חודשים אם הגנטיקה לא ברורה⁩'},{a:'הערכה חוזרת',b:'⁧התקפים + SAA/CRP לאורך חודשים⁩'}];
  function drawPath(t){let s=`<defs>${marker('dxPa')}${marker('dxPb','var(--terra)')}</defs>`;
    /* narrow: the flow runs top to bottom and each side panel becomes a full-width block
       between two nodes; the boxes keep their places so nothing jumps as they fade in */
    const N=vb(ps,'720 440','400 1052');
    const L=N
      ? {nw:372,nh:66,px:14,
         pos:[{x:14,y:16},{x:14,y:120},{x:14,y:354},{x:14,y:458},{x:14,y:664},{x:14,y:870}],
         C:[[[200,82],[200,120]],[[200,316],[200,354]],[[200,420],[200,458]],[[200,626],[200,664]],[[200,832],[200,870]]],
         stub:[[200,186,194],[200,524,532]], app:[14,194], gen:[14,532], col:[14,738], out:[14,944],
         genW:372,colW:372,outW:372, warn:'M320 626 L320 660'}
      : {nw:200,nh:66,px:130,
         pos:[{x:16,y:20},{x:260,y:20},{x:504,y:20},{x:504,y:250},{x:260,y:250},{x:16,y:250}],
         C:[[[216,53],[260,53]],[[460,53],[504,53]],[[604,86],[604,250]],[[504,283],[460,283]],[[260,283],[216,283]]],
         stub:[[360,86,110],[604,316,338]], app:[130,110], gen:[474,338], col:[236,338], out:[16,338],
         genW:240,colW:206,outW:200, warn:'M474 384 C458 384 440 350 420 318'};
    const lit=i=>t>=DX_PL[i],cur=phaseOf(DX_PATH,t);
    L.C.forEach(([[x1,y1],[x2,y2]],k)=>{const on=lit(k+1);const D=Math.hypot(x2-x1,y2-y1);s+=`<path d="M${x1} ${y1} L${f1(x2-(x2-x1)/D*3)} ${f1(y2-(y2-y1)/D*3)}" class="arrow" style="${on?'stroke:var(--terra);stroke-width:2.2':''}" marker-end="url(#${on?'dxPb':'dxPa'})"/>`;
      const a=DX_PL[k]+.06,b=DX_PL[k+1];if(t>a&&t<b){const u=ease(ramp(t,a,b));s+=`<circle cx="${f1(lerp(x1,x2,u))}" cy="${f1(lerp(y1,y2,u))}" r="6" style="fill:var(--terra)"/>`}});
    PN.forEach((n0,i)=>{const n={...n0,...L.pos[i]},on=lit(i),c=i===cur;
      s+=`<rect x="${n.x}" y="${n.y}" width="${L.nw}" height="${L.nh}" rx="12" style="fill:${on?'var(--terra-soft)':'var(--panel)'};stroke:${on?'var(--terra)':'var(--line)'};stroke-width:${c?3:1.5}"/>`;
      s+=`<circle cx="${n.x}" cy="${n.y}" r="11" style="fill:${on?'var(--terra)':'var(--panel-2)'};stroke:var(--panel);stroke-width:2"/><text x="${n.x}" y="${n.y+4}" class="t-xs t-mid" style="fill:${on?'var(--panel)':'var(--muted)'};font-weight:700">${i+1}</text>`;
      s+=`<text x="${n.x+L.nw/2}" y="${n.y+29}" class="t-lbl t-mid" style="opacity:${on?1:.55}">${n.a}</text><text x="${n.x+L.nw/2}" y="${n.y+47}" class="t-xs t-mid">${n.b}</text>`});
    const stub=k=>`<line x1="${L.stub[k][0]}" x2="${L.stub[k][0]}" y1="${L.stub[k][1]}" y2="${L.stub[k][2]}" style="stroke:var(--terra);stroke-dasharray:3 3"/>`;
    // appendectomy panel under node 2
    const ap=ramp(t,DX_PL[1]+.02,DX_PL[1]+.12);
    if(ap>0){const[px,py]=L.app;
      s+=`<g style="opacity:${f1(ap)}">${stub(0)}<rect x="${px}" y="${py}" width="${N?372:350}" height="122" rx="10" style="fill:var(--panel);stroke:var(--line)"/>
       <text x="${px+12}" y="${py+18}" class="t-sm" style="fill:var(--terra)">⁧בטן כירורגית? 182 מטופלי FMF⁩</text>`;
      const bx=px+116,bw=170,bar=(y,lbl,fmf,genA,genB,fl,gl)=>{let q=`<text x="${px+12}" y="${y+9}" class="t-sm">${lbl}</text>`;
        q+=`<rect x="${bx}" y="${y}" width="${f1(bw*fmf*ease(ap))}" height="11" rx="3" style="fill:var(--terra)"/><text x="${f1(bx+bw*fmf*ease(ap)+5)}" y="${y+9}" class="t-xs" style="fill:var(--terra)">FMF ${fl}</text>`;
        q+=`<rect x="${bx}" y="${y+16}" width="${f1(bw*genB*ease(ap))}" height="11" rx="3" style="fill:var(--muted);opacity:.35"/><rect x="${bx}" y="${y+16}" width="${f1(bw*genA*ease(ap))}" height="11" rx="3" style="fill:var(--muted);opacity:.7"/><text x="${f1(bx+bw*genB*ease(ap)+5)}" y="${y+25}" class="t-xs">⁧כללי ${gl}⁩</text>`;return q};
      s+=bar(py+32,'כריתת תוספתן',.4,.12,.25,'40%','12-25%');
      s+=bar(py+74,'לא מודלק',.8,.2,.2,'80%','כ־20%');
      s+=`</g>`}
    // genotype outcomes under node 4
    const gp=ramp(t,DX_PL[3]+.02,DX_PL[3]+.12);
    if(gp>0){const[px,py]=L.gen;
      s+=`<g style="opacity:${f1(gp)}">${stub(1)}<rect x="${px}" y="${py}" width="${L.genW}" height="94" rx="10" style="fill:var(--panel);stroke:var(--line)"/>`;
      [['var(--good)','⁧שני פתוגניים: מתאים ל־FMF⁩'],['var(--warn)','⁧וריאנט אחד / VUS: לא ברור⁩'],['var(--muted)','⁧אין: FMF עדיין אפשרית⁩']].forEach(([c,l],k)=>{s+=`<circle cx="${px+16}" cy="${py+20+k*26}" r="5" style="fill:${c}"/><text x="${px+28}" y="${py+24+k*26}" class="t-xs">${l}</text>`});
      s+=`</g>`;
      if(t>DX_PL[4]-.04)s+=`<path d="${L.warn}" class="arrow" style="stroke:var(--warn);stroke-dasharray:4 3;opacity:${f1(ramp(t,DX_PL[4]-.04,DX_PL[4]))}"${N?' marker-end="url(#dxPa)"':''}/>`}
    // colchicine trial box under node 5
    const cp=ramp(t,DX_PL[4]+.02,DX_PL[4]+.12);
    if(cp>0){const[px,py]=L.col;
      s+=`<g style="opacity:${f1(cp)}"><rect x="${px}" y="${py}" width="${L.colW}" height="94" rx="10" style="fill:var(--crocus-soft);stroke:var(--crocus)"/><text x="${px+12}" y="${py+20}" class="t-sm" style="fill:var(--crocus)">תגובה לטיפול נחשבת</text>
      <text x="${px+12}" y="${py+42}" class="t-xs" style="fill:var(--ink)">תל השומר: קריטריון עיקרי</text><text x="${px+12}" y="${py+62}" class="t-xs" style="fill:var(--ink)">ליבנה: קריטריון משני</text><text x="${px+12}" y="${py+82}" class="t-xs">משך הניסיון: כ־6 חודשים</text></g>`}
    // outcomes under node 6
    const op=ramp(t,DX_PL[5]+.02,DX_PL[5]+.12);
    if(op>0){const[px,py]=L.out;
      s+=`<g style="opacity:${f1(op)}"><rect x="${px}" y="${py}" width="${L.outW}" height="94" rx="10" style="fill:var(--panel);stroke:var(--line)"/><text x="${px+12}" y="${py+18}" class="t-sm">בטיפול בקולכיצין</text>`;
      [['תגובה מלאה','60-70%',.65,'var(--good)'],['תגובה חלקית','20-30%',.25,'var(--warn)'],['ללא תגובה','כ־5%',.05,'var(--bad)']].forEach(([l,v,w,c],k)=>{const y=py+30+k*20;s+=`<text x="${px+12}" y="${y+8}" class="t-xs">${l}</text><rect x="${px+88}" y="${y}" width="${f1(70*w*ease(op))}" height="9" rx="3" style="fill:${c}"/><text x="${f1(px+92+70*w*ease(op))}" y="${y+8}" class="t-xs">${v}</text>`});
      s+=`</g>`}
    ps.innerHTML=s;setPath(cur);$('#dxPathNote').innerHTML=noteHTML(DX_PATH[cur])}
  const stopP=playWire(pr,$('#dxPathPlay'),drawPath,16000,'הפעלה חוזרת','dx');
  const setPath=stepWire($('#dxPathSteps'),DX_PATH,pr,drawPath,stopP);
  drawPath(+pr.value);
  /* this module has three drawings but one module id, so re-lay-out all of them together */
  redraws.dx=()=>{stopL();stopP();drawLab(+lr.value);drawPath(+pr.value);update()};

  $('#dxCards').innerHTML=`
   <div class="card"><h4>למה הבדיקה הגנטית עלולה להטעות</h4><p>לכ־10 עד 20% מהאנשים עם FMF אין וריאנט ב־<i>MEFV</i>, ובדרך כלל התמונה הקלינית שלהם קלה יותר. וריאנט בודד הוא ממצא שכיח: בקבוצת מטופלים שהופנו למרכז בטורקיה, 415 מתוך 1,291 מטופלים (32%) היו הטרוזיגוטים. גם לנשאים בריאים יש רמות CRP ו־SAA גבוהות מעט יותר מאשר למי שאינם נשאים. [[BenZvi2015,Tanatar2020,Lachmann2006]]</p></div>
   <div class="card"><h4>קריטריונים לא תמיד עוברים טוב בין אוכלוסיות</h4><p>בילדים במרשם Eurofever שהחום שלהם נבע מסיבות אחרות, לקריטריוני ליבנה הייתה סגוליות של 41.1% בלבד, ולקריטריונים לילדים 40.7%. קריטריונים שנבנו באוכלוסיות שבהן FMF שכיחה מסווגים יותר מדי אנשים כ־FMF במקומות שבהם קדחות מחזוריות אחרות שכיחות. [[Demirkaya2016]]</p></div>
   <div class="card"><h4>תגובה לקולכיצין עוזרת, אבל אינה הוכחה</h4><p>בעבודה היומיומית, תגובה טובה ומוצא מתאים יכולים לתמוך ב־FMF אצל מי שיש לו גנוטיפ לא מאשר, אבל הפאנל של Eurofever/PRINTO השאיר את שניהם מחוץ לקריטריונים. [[Gattorno2019]]</p></div>
   <div class="card"><h4>וריאנט פתוגני אחד אינו "מאשר"</h4><p>וריאנט פתוגני יחיד ב־<i>MEFV</i>, במצב הטרוזיגוטי, נחשב גנוטיפ <b>לא מאשר</b> בקריטריונים של 2019, ולכן נדרשים <b>2</b> מתוך 4 הפריטים הקליניים, ולא 1. אותו דבר נכון לגבי וריאנט פתוגני אחד ועוד VUS בעותק השני (in trans), ולגבי שני VUS. וריאנטים שפירים וככל הנראה שפירים אינם נספרים כלל. [[Gattorno2019,Lancieri2023]]</p></div>
   <div class="card"><h4>ספירה, לא ניקוד</h4><p>שתי המערכות של FMF הן ספירות פשוטות: כל פריט שווה 1 ואין משקלות, כך שהספים של 4 הפריטים ושל 9 הפריטים הם כל מה שיש. המערכת הקלינית ל־TRAPS באותו מאמר משוקללת בנקודות, עם סף של 5, ולכן אין לערבב בין שני המודלים. [[Gattorno2019]]</p></div>
   <div class="card"><h4>למי לעשות בדיקה גנטית?</h4><p>אפשר להשתמש בפריטים הקליניים בלבד של Eurofever/PRINTO גם כדי לבחור את מי לבדוק. ציונים קליניים זמניים ומוקדמים יותר של Eurofever (2015) הבחינו בין FMF לבין קדחות מחזוריות אחרות עם AUC של 0.98. [[Gattorno2019,Federici2015]]</p></div>`;
};
