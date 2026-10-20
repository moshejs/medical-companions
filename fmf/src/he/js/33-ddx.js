/* =============== 3.3 the differential =============== */
const DD_DZ=[
 {id:'fmf',n:'FMF',full:'קדחת ים תיכונית משפחתית (FMF)',sub:'⁧1-3 ימים, לא סדיר⁩',src:'cited',
  gene:`<i>MEFV</i>, ‏16p13.3; תורשה אוטוזומלית רצסיבית, לעתים עם וריאנט אחד בלבד או בתורשה דומיננטית (M694del, וריאנטים בעמדה T577) [[GeneReviews,Booth2000,Stoffels2014]]`,
  len:`12 עד 72 h‏; 1 עד 3 ימים ב־Eurofever [[Livneh1997,Gattorno2019]]`,
  feat:`מוצא ממזרח הים התיכון; דלקת הצפק, דלקת חד־צדדית של קרום הריאה; דלקת בפרק גדול אחד; אודם דמוי שושנה בשוק; כאב ברגליים במאמץ; תגובה לקולכיצין [[Livneh1997,Tunca2005]]`,
  test:`CRP/SAA גבוהים בהתקפים, ואילו הפריטין והטסיות לא עולים [[Korkmaz2002]]; גנוטיפ <i>MEFV</i> [[Gattorno2019]]; ניסיון טיפולי בקולכיצין [[GeneReviews]]`,
  pn:`משך ההתקף מצוטט. המרווחים הלא אחידים משקפים תיאורים שפורסמו של התקפי FMF כלא סדירים, בניגוד ל־PFAPA. [[BenChetrit2019]]`,
  ep:[[3,2,'f'],[17,3,'f'],[24,1.5,'f'],[45,2.5,'f']]},
 {id:'traps',n:'TRAPS',full:'תסמונת מחזורית הקשורה לקולטן ל־TNF‏ (TRAPS)',sub:'⁧7 ימים ומעלה⁩',src:'cited',
  gene:`<i>TNFRSF1A</i>; תורשה אוטוזומלית דומיננטית [[Lachmann2014]]`,
  len:`לעתים קרובות 7 ימים או יותר [[Gattorno2019]]`,
  feat:`פריחה נודדת מעל שרירים כואבים; בצקת סביב העיניים; דלקת הלחמית; סיפור משפחתי ב־64% מהמקרים שאינם R92Q. כ־70 ימים עם תסמינים בשנה, ועמילואידוזיס מסוג AA ב־10% [[Lachmann2014]]`,
  test:`ריצוף <i>TNFRSF1A</i> ‏(R92Q ו־P46L הם וריאנטים בעלי חדירות נמוכה) [[Gattorno2019]]`,
  pn:`התקף אחד של 11 ימים בתוך 60 ימים מתאים לכ־70 הימים עם תסמינים בשנה שתוארו בסדרת ה־TRAPS של Eurofever. [[Lachmann2014]]`,
  ep:[[12,11,'f']]},
 {id:'mkd',n:'MKD / HIDS',full:'חסר באנזים מבלונט קינאז (MKD, ‏HIDS)',sub:'⁧3-7 ימים⁩',src:'cited',
  gene:`<i>MVK</i>; תורשה אוטוזומלית רצסיבית (נדרשים שני וריאנטים) [[Gattorno2019]]`,
  len:`3 עד 7 ימים ללא טיפול [[Favier2016]]`,
  feat:`הופעה בינקות (חציון 0.5 שנים); בלוטות לימפה בצוואר; כיבים בפה; שלשולים והקאות; פריחה מקולופפולרית; בסדרה אחת, חיסון עורר את ההתלקחות הראשונה אצל 63% [[TerHaar2016,Favier2016]]`,
  test:`חומצה מבלונית בשתן בזמן התקף (רגישות 92%, סגוליות 90%, ערך ניבוי שלילי 98%) [[Jeyaratnam2016]]; גנוטיפ <i>MVK</i> או פעילות האנזים`,
  pn:`משך ההתקף מצוטט; הפער בין ההתקפים להמחשה בלבד. [[Favier2016]]`,
  ep:[[6,5,'f'],[34,4.5,'f']]},
 {id:'caps',n:'CAPS (FCAS)',full:'תסמונות מחזוריות הקשורות לקריופירין (CAPS: ‏FCAS, ‏MWS, ‏NOMID)',sub:'⁧FCAS: פחות מ־24 h, קור⁩',src:'gk',
  gene:`<i>NLRP3</i>; תורשה אוטוזומלית דומיננטית, או מוטציה חדשה (de novo) [[SoonLaxer2017]]`,
  len:`FCAS: פחות מ־24 h‏; MWS:‏ 1 עד 3 ימים; NOMID: רציף (ידע מקובל בהוראה, שלא נבדק מול מקור ראשוני) [[Lachmann2017]]`,
  feat:`פריחה דמוית סרפדת (אורטיקריאלית); טריגרים של קור או לחץ; ירידת שמיעה תחושתית־עצבית; דלקת הלחמית; דלקת קרום המוח אספטית; צמיחת יתר של עצם [[KuemmerleDeschner2017,Gattorno2019]]`,
  test:`ריצוף <i>NLRP3</i>, כולל חיפוש אחר מוזאיקה סומטית [[Gattorno2019]]`,
  pn:`משכי ההתקף של תת־הסוגים הם ידע מקובל בהוראה, ומסומנים כמי שלא נבדקו מול מקור ראשוני. השורה מציגה FCAS: התלקחויות קצרות אחרי ימים קרים.`,
  ep:[[8,.6,'f'],[9.6,.5,'f'],[22,.7,'f'],[37,.5,'f'],[51,.6,'f']]},
 {id:'pfapa',n:'PFAPA',full:'חום מחזורי, דלקת פה אפטית, דלקת לוע ודלקת בלוטות לימפה (PFAPA)',sub:'⁧3-6 ימים, כל כ־28 ימים⁩',src:'cited',
  gene:`אין גן ידוע; לא תורשתית [[SoonLaxer2017]]`,
  len:`3 עד 6 ימים (ממוצע 4.8), בקביעות של שעון, בערך כל 28 ימים [[Thomas1999,Gattorno2019]]`,
  feat:`הופעה בדרך כלל לפני גיל 5; כאב גרון, כיבים בפה, בלוטות לימפה בצוואר; ללא סרוזיטיס, כאב בחזה, דלקת פרקים או שלשול; גדילה תקינה; ללא עמילואידוזיס [[Gattorno2019,SoonLaxer2017]]`,
  test:`אבחנה קלינית; מנה אחת של פרדניזון קוטעת את ההתקף [[SoonLaxer2017,Thomas1999]]`,
  pn:`גם משך ההתקף וגם הקצב של כ־28 ימים מצוטטים. [[Thomas1999]]`,
  ep:[[4,4.8,'f'],[32,4.8,'f']]},
 {id:'beh',n:'מחלת בהצ׳ט',full:'מחלת בהצ׳ט (Behçet)',sub:'⁧כיבים 1-2 שבועות⁩',src:'gk',
  gene:`פוליגנית; קשר ל־HLA-B51 (ידע כללי)`,
  len:`כיבים בפה נמשכים בדרך כלל 1 עד 2 שבועות (ידע כללי); מהלך כרוני של התלקחויות חוזרות`,
  feat:`כיבים חוזרים בפה ובאיברי המין, דלקת הענבייה (uveitis), נגעים בעור, פקקת בכלי דם, תופעת פתרגיה [[ICBD2014]]`,
  test:`ציון ICBD של 4 ומעלה: נגעים בעין, בפה ובאיברי המין, 2 נקודות כל אחד; נגעים בעור, סימנים במערכת העצבים, סימנים בכלי הדם ובדיקת פתרגיה חיובית, 1 נקודה כל אחד (רגישות 93.9%, סגוליות 92.1%) [[ICBD2014]]`,
  pn:`משך הכיבים הוא ידע כללי, ואינו נשען על מקור שנבדק.`,
  ep:[[10,12,'u'],[44,10,'u']]},
 {id:'ibd',n:'IBD',full:'מחלת מעי דלקתית (IBD: מחלת קרוהן, קוליטיס כיבית)',sub:'כרונית, לא חולפת מעצמה',src:'gk',
  gene:`פוליגנית`,
  len:`כרונית או מתמשכת, ולא חולפת מעצמה בתוך 1 עד 3 ימים`,
  feat:`שלשול כרוני או דימום, ירידה במשקל, עיכוב בגדילה, מחלה פריאנלית [[Maaser2019]]`,
  test:`קלפרוטקטין בצואה; אנדוסקופיה עם ביופסיה; הדמיית חתך [[Maaser2019]]`,
  pn:`מוצגת כפעילות רציפה ומשתנה: ידע מקובל בהוראה, ולא מהלך זמן מצוטט.`,
  ep:[[0,60,'c']]},
 {id:'aip',n:'פורפיריה חריפה',full:'פורפיריה חריפה לסירוגין (AIP)',sub:'ימים, בדרך כלל ללא חום',src:'gk',
  gene:`<i>HMBS</i>; תורשה אוטוזומלית דומיננטית עם חדירות נמוכה (ידע כללי)`,
  len:`ימים`,
  feat:`כאב בטן חמור עם מעט סימנים צפקיים; נוירופתיה, נתרן נמוך, תסמינים פסיכיאטריים, שתן כהה; טריגרים תרופתיים או הורמונליים; בדרך כלל ללא חום [[Anderson2005]]`,
  test:`פורפובילינוגן גבוה מאוד בשתן, בדגימת שתן אקראית אחת [[Anderson2005]]`,
  pn:`"ימים" הוא ידע מקובל בהוראה; היעדר החום מצוטט. [[Anderson2005]]`,
  ep:[[26,4,'a']]},
 {id:'app',n:'דלקת תוספתן',full:'דלקת תוספתן או בטן כירורגית אחרת',sub:'מחמיר, לא חולף',src:'gk',
  gene:`אין`,
  len:`הכאב נמשך ומחמיר, במקום לחלוף בתוך 1 עד 3 ימים`,
  feat:`אצל מטופלי FMF, מעבר מכאב מפושט לכאב ברביע הימני התחתון היה המנבא הטוב ביותר לתוספתן מודלק באמת; 80% מהתוספתנים שהוצאו ממטופלי FMF לא היו מודלקים [[Lidar2008]]`,
  test:`אולטרסאונד או CT, והערכה כירורגית; היסטוריה של התקפים חוזרים שחולפים מעצמם מכוונת ל־FMF [[Lidar2008]]`,
  pn:`התקף יחיד שמחמיר עד לניתוח: ידע מקובל בהוראה.`,
  ep:[[30,2.6,'p']]},
 {id:'aosd',n:'AOSD / sJIA',full:'מחלת סטיל של המבוגר (AOSD) / דלקת מפרקים אידיופתית סיסטמית של ילדים (sJIA)',sub:'⁧קפיצות יומיות, ⁦≥1⁩ שבוע⁩',src:'gk',
  gene:`פוליגנית`,
  len:`חום יומי בקפיצות במשך לפחות 1 שבוע; מתמשך ולא התקפי`,
  feat:`פריחה חולפת בצבע ורוד־סלמון יחד עם החום, דלקת פרקים, כאב גרון, בלוטות לימפה או טחול מוגדלים, ספירת לבנים גבוהה [[Yamaguchi1992]]`,
  test:`קריטריוני Yamaguchi (לפחות 5 קריטריונים, מהם לפחות 2 עיקריים: רגישות 96.2%, סגוליות 92.1%); פריטין גבוה מאוד, בניגוד להתקפי FMF [[Yamaguchi1992,Korkmaz2002]]`,
  pn:`קפיצות חום פעם ביום (quotidian) הן ידע מקובל בהוראה, ולא מהלך זמן מצוטט.`,
  ep:[[15,30,'d']]}
];
const DD_CLUE=[
 {l:'חולף מעצמו בתוך 1 עד 3 ימים',ids:['fmf'],say:`התקפים קצרים, לא סדירים, שחולפים מעצמם הם החתימה של FMF. הצעדים הבאים: CRP/SAA בהתקף ובין התקפים, גנוטיפ <i>MEFV</i>, תגובה לקולכיצין. גם MWS, תת־סוג של CAPS, יכולה להימשך 1 עד 3 ימים. [[Livneh1997,Gattorno2019,Lachmann2017]]`},
 {l:'נמשך שבוע או יותר',ids:['traps','aosd','beh'],say:`התקפי TRAPS נמשכים לעתים קרובות 7 ימים או יותר (בדיקה: <i>TNFRSF1A</i>); במחלת סטיל החום קופץ מדי יום במשך שבוע לפחות (פריטין גבוה מאוד); כיבי בהצ׳ט נמשכים 1 עד 2 שבועות (ציון ICBD). [[Gattorno2019,Yamaguchi1992,ICBD2014]]`},
 {l:'כמו שעון, בערך כל 4 שבועות',ids:['pfapa'],say:`מחזור קבוע של כ־28 ימים, עם כאב גרון, כיבים בפה ובלוטות בצוואר אצל ילד צעיר, מרמז על PFAPA. מנה אחת של פרדניזון שקוטעת את ההתקף תומכת באבחנה. [[Thomas1999,SoonLaxer2017]]`},
 {l:'הופעה בינקות, טריגר של חיסון, שלשולים',ids:['mkd'],say:`MKD מתחילה בינקות (חציון 0.5 שנים), ובסדרה אחת חיסונים עוררו את ההתלקחות הראשונה אצל 63%. בדיקה: חומצה מבלונית בשתן בזמן התקף. [[TerHaar2016,Favier2016,Jeyaratnam2016]]`},
 {l:'הכאב עובר לרביע הימני התחתון וממשיך להחמיר',ids:['app'],say:`גם אצל מטופל שידוע שיש לו FMF, מעבר מכאב מפושט לכאב ברביע הימני התחתון היה המנבא הטוב ביותר לתוספתן מודלק באמת. הדמיה והערכה כירורגית. [[Lidar2008]]`},
 {l:'אין חום; שתן כהה, נתרן נמוך, נוירופתיה',ids:['aip'],say:`פורפיריה חריפה: כאב חמור עם מעט סימנים צפקיים, ובדרך כלל ללא חום. בדיקה: פורפובילינוגן בשתן, בדגימה אקראית אחת. [[Anderson2005]]`},
 {l:'פריחה דמוית סרפדת אחרי חשיפה לקור',ids:['caps'],say:`פריחה אורטיקריאלית עם טריגרים של קור או לחץ מכוונת ל־CAPS. בדיקה: ריצוף <i>NLRP3</i>, כולל מוזאיקה סומטית. [[Gattorno2019,KuemmerleDeschner2017]]`},
 {l:'שלשול כרוני, ירידה במשקל, גדילה לקויה',ids:['ibd'],say:`תסמיני מעי מתמשכים מכוונים ל־IBD. בדיקות: קלפרוטקטין בצואה, ואחר כך אנדוסקופיה עם ביופסיה. [[Maaser2019]]`},
 {l:'קפיצות חום יומיות, פריחה בצבע סלמון, פריטין גבוה מאוד',ids:['aosd'],say:`מחלת סטיל (AOSD/sJIA). בהתקפי FMF הפריטין והטסיות לא עולים, וזה עוזר להבדיל בין השתיים. [[Yamaguchi1992,Korkmaz2002]]`},
 {l:'כיבים בפה ובאיברי המין, דלקת בעין',ids:['beh'],say:`מחלת בהצ׳ט: ציון ICBD של 4 ומעלה מסווג אותה; בדיקת פתרגיה ובדיקת עיניים עוזרות. [[ICBD2014]]`}
];
inits.ddx=()=>{
  const svg=$('#ddSvg'),rg=$('#ddT');let sel='fmf',clue=-1;
  const KC={f:'var(--terra)',u:'var(--warn)',a:'var(--muted)',c:'var(--sea)',p:'var(--bad)',d:'var(--terra)'};
  function draw(t){const day=t*60;let s='';const hl=clue>=0?DD_CLUE[clue].ids:null;const act=[];
    /* narrow: the disease name sits above its own track, so the 60-day window gets the full width */
    const N=vb(svg,'720 420','400 604');
    const L=N?{W:400,X0:10,X1:386,RH:52,Y0:46,bo:20,bh:22,bx:342,bw:52}
             :{W:720,X0:178,X1:648,RH:35,Y0:28,bo:6,bh:22,bx:656,bw:56};
    const X0=L.X0,X1=L.X1,RH=L.RH,Y0=L.Y0,xd=d=>X0+d/60*(X1-X0);
    const yEnd=Y0+RH*10;
    if(N){s+=`<text x="4" y="13" class="t-xs">⁧חלון של 60 ימים · משכים מצוטטים, מרווחים סכמטיים⁩</text>`;
      for(let d=0;d<=60;d+=10)s+=`<text x="${f1(xd(d))}" y="33" class="t-xs t-mid">${d}</text>`}
    else{for(let d=0;d<=60;d+=10)s+=`<line x1="${f1(xd(d))}" x2="${f1(xd(d))}" y1="${Y0-4}" y2="${yEnd}" class="grid"/>`;
      s+=`<text x="${X0}" y="14" class="t-xs">⁧דפוס התקפים אופייני · חלון של 60 ימים · משכים מצוטטים, מרווחים סכמטיים⁩</text><text x="684" y="14" class="t-xs t-mid">מקור</text>`}
    for(let d=0;d<=60;d+=10)s+=`<text x="${f1(xd(d))}" y="${yEnd+16}" class="t-xs t-mid">${d}</text>`;
    s+=`<text x="${X1}" y="${yEnd+32}" class="t-xs t-end">ימים</text>`;
    DD_DZ.forEach((D,i)=>{const y0=Y0+i*RH,bt=y0+L.bo,bh=L.bh,dim=hl&&!hl.includes(D.id);let g='';
      if(D.id==='fmf')g+=`<rect x="2" y="${y0+1}" width="${L.W-4}" height="${RH-2}" rx="8" style="fill:var(--terra-soft);opacity:.75"/>`;
      if(hl&&!dim)g+=`<rect x="2" y="${y0+1}" width="${L.W-4}" height="${RH-2}" rx="8" style="fill:var(--sea-soft)"/>`;
      if(N)g+=`<text x="8" y="${y0+14}" class="t-lbl">${D.n}</text><text x="336" y="${y0+14}" class="t-xs t-end">${D.sub}</text>`;
      else g+=`<text x="10" y="${y0+16}" class="t-lbl">${D.n}</text><text x="10" y="${y0+29}" class="t-xs">${D.sub}</text>`;
      if(N)for(let d=0;d<=60;d+=10)g+=`<line x1="${f1(xd(d))}" x2="${f1(xd(d))}" y1="${bt-3}" y2="${bt+bh+3}" class="grid"/>`;
      g+=`<line x1="${X0}" x2="${X1}" y1="${bt+bh}" y2="${bt+bh}" class="axis"/>`;
      let on=false;
      D.ep.forEach(([st,du,k])=>{const c=KC[k],xa=xd(st),xb=xd(Math.min(60,st+du)),lit=clamp((day-st)/du),xl=lerp(xa,xb,lit),live=day>=st&&day<=st+du;if(live)on=true;
        if(k==='f'||k==='u'||k==='a'){const dash=k==='a'?'stroke-dasharray:3 2;':'';
          g+=`<rect x="${f1(xa)}" y="${bt}" width="${f1(Math.max(2,xb-xa))}" height="${bh}" rx="4" style="fill:${c};opacity:.13"/><rect x="${f1(xa)}" y="${bt}" width="${f1(Math.max(2,xb-xa))}" height="${bh}" rx="4" style="fill:none;stroke:${c};stroke-width:1;opacity:.5;${dash}"/>`;
          if(lit>0)g+=`<rect x="${f1(xa)}" y="${bt}" width="${f1(Math.max(1.5,xl-xa))}" height="${bh}" rx="4" style="fill:${c};opacity:${k==='a'?.55:.9}"/>`;
          if(live)g+=`<rect x="${f1(xa-2)}" y="${bt-2}" width="${f1(Math.max(2,xb-xa)+4)}" height="${bh+4}" rx="5" style="fill:none;stroke:var(--ink);stroke-width:1.6"/>`}
        if(k==='c'){const wave=x=>bt+bh-(8+5*Math.sin(x/9)+3*Math.sin(x/23));let gp='',lp='';
          for(let x=xa;x<=xb;x+=4){gp+=(gp?'L':'M')+f1(x)+' '+f1(wave(x));if(x<=xd(day))lp+=(lp?'L':'M')+f1(x)+' '+f1(wave(x))}
          g+=`<path d="${gp} L${f1(xb)} ${bt+bh} L${f1(xa)} ${bt+bh}Z" style="fill:${c};opacity:.13"/>`;
          if(lp){const xe=Math.min(xb,xd(day));g+=`<path d="${lp} L${f1(xe)} ${bt+bh} L${f1(xa)} ${bt+bh}Z" style="fill:${c};opacity:.75"/>`}}
        if(k==='p'){const yb=bt+bh,xp=Math.min(xb,xd(day)),hp=bh*clamp((xp-xa)/(xb-xa));
          g+=`<path d="M${f1(xa)} ${yb} L${f1(xb)} ${bt} L${f1(xb)} ${yb}Z" style="fill:${c};opacity:.13"/>`;
          if(day>st)g+=`<path d="M${f1(xa)} ${yb} L${f1(xp)} ${f1(yb-hp)} L${f1(xp)} ${yb}Z" style="fill:${c};opacity:.85"/>`;
          g+=`<text x="${f1(xb+5)}" y="${bt+15}" class="t-xs" style="fill:${day>=st+du?'var(--bad)':'var(--muted)'};font-weight:${day>=st+du?700:500}">→ ניתוח</text>`}
        if(k==='d'){const yb=bt+bh;g+=`<rect x="${f1(xa)}" y="${yb-6}" width="${f1(xb-xa)}" height="6" style="fill:${c};opacity:.13"/>`;
          for(let q=0;q<du;q++){const xs=xd(st+q+.35),ok=day>=st+q+.35;g+=`<path d="M${f1(xs-3)} ${yb} L${f1(xs)} ${bt+1} L${f1(xs+3)} ${yb}Z" style="fill:${c};opacity:${ok?.9:.15}"/>`}
          if(live)g+=`<rect x="${f1(xa-2)}" y="${bt-2}" width="${f1(xb-xa+4)}" height="${bh+4}" rx="5" style="fill:none;stroke:var(--ink);stroke-width:1.6"/>`}
      });
      if(D.id==='pfapa'){const a=xd(4+4.8),b=xd(32);g+=`<line x1="${f1(a+3)}" x2="${f1(b-3)}" y1="${bt+bh/2}" y2="${bt+bh/2}" style="stroke:var(--muted);stroke-dasharray:2 3"/><text x="${f1((xd(4)+xd(32))/2+20)}" y="${bt+bh/2-4}" class="t-xs t-mid">כ־28 ימים</text>`}
      if(on)act.push(D.n);
      const cited=D.src==='cited';
      g+=`<rect x="${L.bx}" y="${y0+(N?2:9)}" width="${L.bw}" height="17" rx="5" style="fill:${cited?'var(--good-soft)':'var(--warn-soft)'}"/><text x="${L.bx+L.bw/2}" y="${y0+(N?14:21)}" class="t-xs t-mid" style="fill:${cited?'var(--good)':'var(--warn)'};font-weight:700">${cited?'מצוטט':'הוראה'}</text>`;
      if(D.id===sel)g+=`<rect x="2" y="${y0+1}" width="${L.W-4}" height="${RH-2}" rx="8" style="fill:none;stroke:var(--ink);stroke-width:2"/>`;
      s+=`<g class="clk" data-dd="${D.id}" style="opacity:${dim?.28:1}"><rect x="0" y="${y0}" width="${L.W}" height="${RH}" style="fill:transparent"/>${g}</g>`});
    if(N){DD_DZ.forEach((D,i)=>{const bt=Y0+i*RH+L.bo;s+=`<line x1="${f1(xd(day))}" x2="${f1(xd(day))}" y1="${bt-5}" y2="${bt+L.bh+5}" style="stroke:var(--ink);stroke-width:1.5;opacity:.6"/>`});
      s+=`<path d="M${f1(xd(day)-5)} 38 L${f1(xd(day)+5)} 38 L${f1(xd(day))} 46Z" style="fill:var(--ink)"/>`}
    else s+=`<line x1="${f1(xd(day))}" x2="${f1(xd(day))}" y1="${Y0-6}" y2="${yEnd}" style="stroke:var(--ink);stroke-width:1.5;opacity:.6"/><circle cx="${f1(xd(day))}" cy="${Y0-6}" r="4" style="fill:var(--ink)"/>`;
    svg.innerHTML=s;
    $('#ddRead').innerHTML=`<span>יום <b>${Math.floor(day)}</b></span><span>פעיל עכשיו <b>${act.length?act.join(',‏ '):'אף אחד'}</b></span>`;
  }
  function note(){const D=DD_DZ.find(x=>x.id===sel);const cited=D.src==='cited';
    $('#ddNote').innerHTML=`<div class="kicker">${D.id==='fmf'?'דפוס הייחוס':'בהשוואה ל־FMF'}</div><h4>${D.full}</h4>
     <dl class="kv"><div><dt>גן / תורשה</dt><dd>${D.gene}</dd></div><div><dt>משך התקף אופייני</dt><dd>${D.len}</dd></div><div><dt>מאפיינים עיקריים</dt><dd>${D.feat}</dd></div><div><dt>בדיקה מבחינה</dt><dd>${D.test}</dd></div>
     <div><dt>הקצב באנימציה</dt><dd><span class="tag ${cited?'good':'warn'}">${cited?'מצוטט':'ידע מקובל בהוראה'}</span> ${D.pn}</dd></div></dl>`;
    $$('[data-ddp]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.ddp===sel));
    $$('#ddTbl tr').forEach(r=>r.style.outline=r.dataset.dd===sel?'2px solid var(--ink)':'')}
  function pick(id){sel=id;note();draw(+rg.value)}
  $('#ddPick').innerHTML=DD_DZ.map(D=>`<button class="btn" data-ddp="${D.id}" aria-pressed="${D.id===sel}">${D.n}</button>`).join('');
  $('#ddPick').addEventListener('click',e=>{const b=e.target.closest('[data-ddp]');if(b)pick(b.dataset.ddp)});
  svg.addEventListener('click',e=>{const g=e.target.closest('[data-dd]');if(g)pick(g.dataset.dd)});
  $('#ddTbl').innerHTML=DD_DZ.map(D=>`<tr data-dd="${D.id}"${D.id==='fmf'?' class="hl"':''}><th>${D.full}</th><td>${D.gene}</td><td>${D.len}</td><td>${D.feat}</td><td>${D.test}</td></tr>`).join('');
  $('#ddTbl').addEventListener('click',e=>{if(e.target.closest('sup.c'))return;const r=e.target.closest('tr[data-dd]');if(r){pick(r.dataset.dd);$('#ddNote').scrollIntoView({block:'nearest',behavior:RM?'auto':'smooth'})}});
  function clueOut(){const o=$('#ddClueOut');
    if(clue<0){o.innerHTML=`<span class="kicker">לא נבחר רמז</span><span>בחרו רמז למעלה. FMF היא שורת הייחוס, והיא מוצללת בכל תצוגה.</span>`;return}
    const C=DD_CLUE[clue];o.innerHTML=`<span class="kicker">מכוון אל</span><b class="big">${C.ids.map(i=>DD_DZ.find(d=>d.id===i).full).join(' · ')}</b><span>${C.say}</span>`}
  $('#ddClues').innerHTML=DD_CLUE.map((c,i)=>`<button class="btn" data-ddc="${i}" aria-pressed="false">${c.l}</button>`).join('');
  $('#ddClues').addEventListener('click',e=>{const b=e.target.closest('[data-ddc]');if(!b)return;const i=+b.dataset.ddc;clue=clue===i?-1:i;
    $$('[data-ddc]').forEach(x=>x.setAttribute('aria-pressed',+x.dataset.ddc===clue));if(clue>=0)sel=DD_CLUE[clue].ids[0];note();clueOut();draw(+rg.value)});
  playWire(rg,$('#ddPlay'),draw,18000,'הפעלה חוזרת','ddx');
  note();clueOut();draw(+rg.value);
};
