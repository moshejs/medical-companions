
/* =============== 1.6 genes and inheritance =============== */
const GN_AL=[
 {a:2,n:'ε2',h:7,d:4,f:['\u2067פחות מ־1% הם ε2/ε2','\u2067פחות מ־1% הם ε2/ε2']},
 {a:3,n:'ε3',h:79,d:58,f:['הגרסה הנפוצה ביותר','הנפוצה ביותר']},
 {a:4,n:'ε4',h:14,d:38,f:['⁧9 עד 20% באוכלוסיות שונות','\u2067טווח של 9 עד 20%']}];
const GN_GT=[
 {id:'e2e2',l:'ε2/ε2',a:[2,2],far:[0.6,0.2,2.0],rei:0.13,
  txt:'שני עותקים של ε2. במחקר משנת 2020 שבו האבחנה אושרה בנתיחה לאחר המוות, יחס הסיכויים של ε2/ε2 היה 0.13 לעומת ε3/ε3, ו־0.004 לעומת ε4/ε4. פחות מ־1% מהאנשים הם ε2/ε2. להערכה הקלינית משנת 1997, 0.6, היה רווח סמך רחב (0.2 עד 2.0), מפני שהקבוצה קטנה כל כך. [[Reiman2020,Farrer1997]]'},
 {id:'e2e3',l:'ε2/ε3',a:[2,3],far:[0.6,0.5,0.8],rei:0.39,
  anc:{h:['\u2067ε2 לפי מוצא, 2023 (כפי שדווח)','\u2067ε2 לפי מוצא, 2023'],rows:[['לבנים',0.53],['שחורים',0.69],['\u2067היספנים (לא מובהק)',0.89],['\u2067מזרח אסייתים (לא מובהק)',0.97]]},
  txt:'עותק מגן אחד. יחס סיכויים 0.6 (0.5 עד 0.8) במטא־אנליזה משנת 1997, ו־0.39 במקרים שאושרו בנתיחה. בניתוח משנת 2023 של 68,756 אנשים, ε2 היה מגן אצל משתתפים לבנים (0.53) ושחורים (0.69), אך לא נמצא קשר מובהק אצל משתתפים היספנים (0.89) או ממוצא מזרח אסייתי (0.97). [[Farrer1997,Reiman2020,Belloy2023]]'},
 {id:'e3e3',l:'ε3/ε3',a:[3,3],far:[1],rei:1,
  txt:'זו קבוצת הייחוס, ולכן יחס הסיכויים שלה הוא 1 בהגדרה. ε3 מהווה 79% מאללי APOE אצל אנשים בריאים מבחינה קוגניטיבית. מחלת אלצהיימר מופיעה גם עם ε3/ε3: רוב אללי APOE אצל אנשים עם אלצהיימר אינם ε4. [[Yamazaki2019]]'},
 {id:'e2e4',l:'ε2/ε4',a:[2,4],far:[2.6,1.6,4.0],rei:2.68,
  txt:'עותק מגן אחד ועותק סיכון אחד. יחס סיכויים 2.6 (1.6 עד 4.0) במטא־אנליזה משנת 1997, ו־2.68 במקרים שאושרו בנתיחה. [[Farrer1997,Reiman2020]]'},
 {id:'e3e4',l:'ε3/ε4',a:[3,4],far:[3.2,2.8,3.8],rei:6.13,
  anc:{h:['\u2067ε3/ε4 לפי מוצא','\u2067ε3/ε4 לפי מוצא'],rows:[['\u2067יפנים, 1997',5.6],['\u2067מזרח אסייתים, 2023',4.54],['\u2067לבנים, 2023',3.46],['\u2067שחורים, 2023',2.18],['\u2067היספנים, 2023',1.90]]},
  txt:'גנוטיפ הסיכון השכיח ביותר. יחס סיכויים 3.2 (2.8 עד 3.8) ב־1997, ו־6.13 במקרים שאושרו בנתיחה. לפי סקירה, עותק אחד של ε4 מעלה את הסיכון בערך פי 3 עד 4 ומקדים את ההופעה ב־2 עד 5 שנים. ההשפעה חזקה ביותר אצל משתתפים ממוצא מזרח אסייתי וחלשה ביותר אצל משתתפים היספנים, וב־1997 היא נחלשה אחרי גיל 70. [[Farrer1997,Reiman2020,Yamazaki2019,Belloy2023]]'},
 {id:'e4e4',l:'ε4/ε4',a:[4,4],far:[14.9,10.8,20.6],rei:31.22,
  anc:{h:['\u2067ε4/ε4 לפי מוצא','\u2067ε4/ε4 לפי מוצא'],rows:[['\u2067יפנים, 1997',33.1],['\u2067לבנים, 1997',14.9],['\u2067אירופים (מצוטט, 2024)',13],['\u2067מוצא אפריקאי (מצוטט)',6.5]]},
  txt:'יחס סיכויים 14.9 (10.8 עד 20.6) ב־1997, ו־31.22 במקרים שאושרו בנתיחה, לעומת 10.70 בקבוצות שאובחנו קלינית, שבהן אבחנות שגויות מדללות את ההשפעה. כ־2 עד 3% מכלל האנשים וכ־15% מהאנשים עם אלצהיימר הם ε4/ε4. הנתונים לאירופים ולמוצא אפריקאי הם ערכים משוערים שצוטטו בכתבה חדשותית משנת 2024. [[Farrer1997,Reiman2020,AlzforumNews2024]]',
  hook:'ב־2024 הציעו Fortea ועמיתיו לראות ב־ε4/ε4 צורה גנטית נפרדת של מחלת אלצהיימר. המבקרים: חדירות כמעט מלאה של הביולוגיה אינה חדירות כמעט מלאה של דמנציה. [[Fortea2024,AlzforumNews2024]]'}];
const GN_LIFE=[
 {g:['e4e4'],l:'ε4/ε4 · מבוסס מקרה־ביקורת',s:'אלצהיימר עד גיל 85, מוצא אירופי',a:51,b:60,c:68,v:'51 עד 60%; 68% לנשים, לפי נתוני היארעות מצרפת',src:'[[Genin2011]]'},
 {g:['e4e4'],l:'ε4/ε4 · עוקבות אוכלוסייה',s:'MCI או דמנציה בגילים 80 עד 85 (Framingham, Rotterdam)',a:31,b:40,v:'כ־31 עד 40%',src:'[[Qian2017]]'},
 {g:['e3e4'],l:'ε3/ε4 · מבוסס מקרה־ביקורת',s:'אלצהיימר עד גיל 85, מוצא אירופי',a:23,b:30,c:35,v:'23 עד 30%; 35% לנשים, לפי נתוני היארעות מצרפת',src:'[[Genin2011]]'},
 {g:['e3e3','e2e3','e2e2','e2e4'],l:'כולם, כל גנוטיפ',s:'אלצהיימר עד גיל 85, מוצא אירופי',a:11,b:14,v:'11% מהגברים, 14% מהנשים',src:'[[Genin2011]]'}];
const GN_STEPS=[
 {from:0,at:.04,k:'שלב 1 · המשפחה',t:'הורה אחד נושא את המוטציה',
  txt:'במשפחה הזאת הורה אחד נושא מוטציה בגן דומיננטי לאלצהיימר. מלבד ההופעה המוקדמת יותר, אלצהיימר בתורשה דומיננטית דומה מאוד, מבחינה קלינית ופתולוגית, לצורה השכיחה בהופעה מאוחרת. [[Bateman2011]]',
  pt:'לאחד ההורים יש שינוי גנטי נדיר שגורם לאלצהיימר בגיל צעיר יותר.'},
 {from:.14,at:.24,k:'שלב 2 · שני עותקים',t:'כל ילד מקבל אחד משני העותקים',
  txt:'להורה הנשא יש עותק משונה אחד (M) ועותק רגיל אחד (+). כל ילד מקבל אחד מהשניים באקראי, ולכן לכל ילד יש סיכוי של 50% לרשת את המוטציה. במשפחות שבהן לא נמצאה מוטציה, ההנחיה מציינת שהסיכון "עשוי להיות נמוך" מ־50%. [[Goldman2011]]',
  pt:'כל ילד הוא הטלת מטבע נפרדת: בצד אחד הוא יורש את השינוי הגנטי, בצד השני לא.',
  hook:'אוטוזומלית דומיננטית: עותק אחד מספיק; לכל ילד של נשא יש סיכוי של 50%, ללא תלות באחים ובאחיות.'},
 {from:.34,at:.46,k:'שלב 3 · הילדים',t:'סיכוי נפרד של 50% לכל ילד',
  txt:'הסיכוי של כל ילד הוא 50% בפני עצמו, ולכן במשפחה עם ארבעה ילדים ייתכן שאף אחד מהם, חלק מהם או כולם יהיו נשאים. החדירות כמעט מלאה: סדרה משנת 1963 מצאה אלצהיימר בהופעה מוקדמת אצל 11 מתוך 26 ילדים של הורה חולה, ואף לא מקרה אחד בענפים שבהם לא היה הורה כזה, ודיווח על ניסוי משנת 2026 מתאר מוטציות ב־PSEN1 כ"בעלות חדירות מלאה". [[Bateman2011,Tariot2026]]',
  pt:'למזל אין זיכרון. לחצו על "משפחה אחרת" כדי לראות איך אותם 50% מתגלגלים בכל פעם אחרת.'},
 {from:.5,at:.56,k:'שלב 4 · גיל ההופעה',t:'מתי מתחילים התסמינים',txt:'',
  pt:'הגיל שבו הופיעו התסמינים הראשונים אצל ההורה, יחד עם השינוי הגנטי המדויק, נותן הערכה גסה למועד שבו הם יופיעו אצל ילד שנושא אותו.'},
 {from:.62,at:.8,k:'שלב 5 · DIAN',t:'השינויים מתחילים 25 שנה מוקדם יותר',
  txt:'רשת האלצהיימר בתורשה דומיננטית (DIAN) הציבה כל אדם על שעון שנמדד מהגיל שבו הופיעו התסמינים אצל ההורה. בקרב 128 אנשים, עמילואיד β42 ב־CSF החל לרדת כ־25 שנה לפני מועד ההופעה הצפוי; עמילואיד ב־PET, טאו ב־CSF ואטרופיה הופיעו כ־15 שנה לפני; ירידה בחילוף החומרים (היפומטבוליזם) ופגיעה בזיכרון האפיזודי כ־10 שנים לפני; וירידה קוגניטיבית כללית כ־5 שנים לפני. הקריטריונים לדמנציה התקיימו בממוצע 3 שנים אחרי מועד ההופעה הצפוי. [[Bateman2012]] נתוני אורך מאוחרים יותר של DIAN אישרו שהעמילואיד משתנה ראשון, אך מיקמו את העלייה בטאו ב־CSF יותר מ־10 שנים מאוחר יותר מהערכת החתך הזאת. [[McDade2018]]',
  pt:'השינויים במוח מתחילים כ־25 שנה לפני הגיל שבו ההורה חלה, הרבה לפני כל תסמין.',
  hook:'DIAN: ירידת Aβ42 ב־CSF כ־25 שנה לפני ← עמילואיד ב־PET כ־15 לפני ← היפומטבוליזם וזיכרון כ־10 לפני ← קוגניציה כללית כ־5 לפני ← דמנציה כ־3 אחרי. נתוני אורך מאשרים שהעמילואיד משתנה ראשון. [[Bateman2012,McDade2018]]'},
 {from:.88,at:.95,k:'שלב 6 · עד כמה זה שכיח?',t:'חלק קטן מכל מקרי האלצהיימר',
  txt:'המקורות חלוקים לגבי השיעור המדויק. סקירה של DIAN משנת 2011 קובעת שאלצהיימר בתורשה דומיננטית מהווה פחות מ־1% מכל המקרים. הנחיית ACMG/NSGC מעמידה אותו על פחות מ־5%, ומציינת שלא כל אלצהיימר בהופעה מוקדמת הוא דומיננטי. [[Bateman2011,Goldman2011]] באוקטובר 2026 נרשמו באתר Alzforum ‏383 וריאנטים ב־PSEN1, ‏120 ב־APP ו־92 ב־PSEN2, כולל וריאנטים שפירים ווריאנטים בעלי משמעות לא ודאית. [[Alzforum2026]]',
  pt:'משפחות כמו זו נדירות. רוב מקרי האלצהיימר אינם מתנהגים לפי הדפוס הזה.'}];
const GN_ONSET={
 APP:{l:['\u2067הופעה אופיינית בשנות ה־50','\u2067טווח של כ־45 עד 60'],t:'במשפחות עם APP ההופעה היא בדרך כלל בשנות ה־50, בטווח של כ־45 עד 60. הכפלה של הגן APP כולו גורמת אף היא לאלצהיימר דומיננטי בהופעה מוקדמת, עם עמילואיד בדפנות כלי הדם. [[Bateman2011,RoveletLecrux2006]]'},
 PSEN1:{l:['\u2067הופעה אופיינית בגיל 30 עד 50','\u2067בחלק מהמשפחות בשנות ה־20'],t:'PSEN1 גורם להופעה הצעירה ביותר, בדרך כלל בגיל 30 עד 50, ובחלק מהמשפחות בשנות ה־20. PSEN1 ו־PSEN2 מקודדים לחלקים של גמא־סקרטאז; המוטציות בהם מעלות את עמילואיד β42. [[Bateman2011]]'},
 PSEN2:{l:['טווח הופעה רחב,','וחלק מהמקרים מאוחרים יחסית'],t:'ל־PSEN2 יש טווח הופעה רחב, כולל מקרים מאוחרים יחסית, וההופעה מאוחרת באופן מובהק מאשר ב־PSEN1 או ב־APP. לא היה אפשר לאמת עבור האפליקציה הזאת נתון חדירות ל־PSEN2. [[Bateman2011,Ryman2014]]'}};
const GN_DIAN=[[-25,'\u2067Aβ42 ב־CSF','מתחיל לרדת'],[-15,'\u2067PET עמילואיד חיובי,','\u2067טאו ב־CSF, אטרופיה'],[-10,'היפומטבוליזם,','זיכרון אפיזודי'],[-5,'קוגניציה כללית','\u2067(MMSE, CDR)'],[0,'מועד ההופעה הצפוי',''],[3,'עמידה בקריטריונים','לדמנציה']];
const GN_DS=[
 {a:20,b:29,l:'\u2067שנות ה־20: שינוי ב־Aβ42/40 ב־CSF וב־NfL בפלזמה',c:'Fortea2020'},
 {a:30,b:39,l:'\u2067שנות ה־30: PET עמילואיד הופך לחיובי',c:'Fortea2020'},
 {a:40,l:'\u2067עד גיל 40: פתולוגיה של אלצהיימר כמעט אצל כולם',c:'LottHead2019'},
 {a:50.2,l:'\u2067גיל 50.2: גיל חציוני לאלצהיימר פרודרומלי',c:'Fortea2020'},
 {a:53.7,l:'\u2067גיל 53.7: גיל חציוני לדמנציה של אלצהיימר',c:'Fortea2020'},
 {a:55,l:'\u2067גיל 55: גיל ממוצע לדמנציה, עוקבה אירית',c:'McCarron2017'},
 {a:60,b:69,l:'\u2067שנות ה־60: אלצהיימר תסמיני אצל 90% עד 100%',c:'Fortea2020'}];
/* push labels apart so none overlap; keeps order, adds leader lines */
function gnRelax(ys,gap){const out=[];ys.forEach((y,i)=>{out.push(i?Math.max(y,out[i-1]+gap):y)});return out}
inits.genes=()=>{
  /* ---------------- APOE odds ratios ---------------- */
  const asv=$('#gnApoe');let gi=4,cur={f:GN_GT[4].far[0],r:GN_GT[4].rei},stopA=null,ap=1,lastA='';
  const lg=v=>Math.log10(v);
  $('#gnGeno').insertAdjacentHTML('beforeend',GN_GT.map((g,i)=>`<button class="btn" data-gi="${i}" aria-pressed="${i===gi}">${g.l}</button>`).join(''));
  function drawA(){
    const N=vb(asv,'720 480','400 492'),G=GN_GT[gi];
    const L=N?{cx:i=>4+i*132,cw:126,x0:16,x1:318,fy:188,ry:234,fl:182,rl:228,ax:264,tl:278,at:306,ar:322,rs:34,bh:16}
             :{cx:i=>20+i*232,cw:216,x0:200,x1:630,fy:190,ry:236,fl:196,rl:242,ax:270,tl:286,at:318,ar:332,rs:26,bh:18};
    const X=v=>L.x0+(lg(v)+1)/(lg(50)+1)*(L.x1-L.x0);
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    // allele cards
    GN_AL.forEach((A,i)=>{const x=L.cx(i),y=10,w=L.cw,c=G.a.filter(a=>a===A.a).length;
      s+=`<rect x="${x}" y="${y}" width="${w}" height="118" rx="10" style="fill:var(--panel);stroke:${c?'var(--rose)':'var(--line)'};stroke-width:${c?3:1}"/>`;
      s+=`<text x="${x+(N?8:14)}" y="${y+28}" class="t-big">${N?A.n:'APOE '+A.n}</text>`;
      s+=`<text x="${N?x+8:x+w-12}" y="${y+(N?44:26)}" class="t-xs${N?'':' t-end'}" style="fill:${c?'var(--rose)':'var(--muted)'}">${c?(c===2?'⁧2 עותקים':'\u2067עותק 1'):(N?'⁧0 עותקים':'לא בזוג')}</text>`;
      [['בריאים',A.h,N?66:60],[N?'AD':'\u2067עם AD',A.d,N?88:84]].forEach(([lab,v,yy])=>{const bx=x+(N?50:70),bw=(N?44:120)*v/90;
        s+=`<text x="${x+(N?8:14)}" y="${y+yy}" class="t-xs">${lab}</text><rect x="${bx}" y="${y+yy-9}" width="${f1(bw)}" height="11" rx="3" style="fill:${lab==='בריאים'?'var(--sage)':'var(--rose)'}"/><text x="${f1(bx+bw+4)}" y="${y+yy}" class="t-xs" style="fill:var(--ink)">${v}%</text>`});
      s+=`<text x="${x+(N?8:14)}" y="${y+110}" class="t-xs">${A.f[N?1:0]}</text>`});
    s+=`<text x="${N?16:20}" y="${N?150:154}" class="t-xs">${N?'\u2067שיעור האלל, בריאים מול AD (מאוחד)':'\u2067שיעור אללי APOE אצל אנשים בריאים קוגניטיבית ואצל אנשים עם אלצהיימר (נתונים מאוחדים)'}</text>`;
    // OR axis and grid
    s+=`<text x="${N?16:20}" y="${N?170:172}" class="t-sm">\u2067יחס סיכויים מול ε3/ε3 · סולם לוגריתמי</text>`;
    const gy1=L.ar+(G.anc?G.anc.rows.length:1)*L.rs;
    [0.1,0.2,0.5,1,2,5,10,20,50].forEach(v=>{const x=f1(X(v));if(v===1)s+=`<path d="M${x} ${L.tl+6} V${gy1}" style="stroke:var(--ink);stroke-width:1.5"/>`;s+=`<path d="M${x} ${L.fy-8} V${L.ax}" class="${v===1?'axis':'grid'}" style="${v===1?'stroke:var(--ink);stroke-width:1.5':''}"/><text x="${x}" y="${L.tl}" class="t-xs t-mid">${v}</text>`});
    s+=`<path d="M${L.x0} ${L.ax} H${L.x1}" class="axis"/>`;
    s+=`<text x="${f1(X(1)-4)}" y="${L.ax-4}" class="t-xs t-end">← סיכויים נמוכים יותר</text><text x="${f1(X(1)+4)}" y="${L.ax-4}" class="t-xs">סיכויים גבוהים יותר →</text>`;
    const bar=(v,y,h,col,lab,ci)=>{const x1=X(1),xv=X(v);let o=`<rect x="${f1(Math.min(x1,xv))}" y="${y}" width="${f1(Math.max(1.5,Math.abs(xv-x1)))}" height="${h}" rx="3" style="fill:${col}"/>`;
      let lx=Math.max(xv,x1)+5;
      if(ci&&ap>.98){const a=X(ci[0]),b=X(ci[1]),cy=y+h/2;o+=`<path d="M${f1(a)} ${cy} H${f1(b)} M${f1(a)} ${cy-5} v10 M${f1(b)} ${cy-5} v10" style="stroke:var(--ink);stroke-width:1.5"/>`;lx=Math.max(lx,b+5)}
      return o+`<text x="${f1(lx)}" y="${y+h-4}" class="${N?'t-xs':'t-sm'}" style="fill:var(--ink)">${lab}</text>`};
    const fl=G.far.length>1?`${G.far[0]} (${G.far[1]}–${G.far[2]})`:'⁧1 (ייחוס)';
    s+=N?`<text x="16" y="${L.fl}" class="t-xs" style="stroke:var(--field);stroke-width:4;paint-order:stroke;stroke-linejoin:round">\u2067מרפאות + נתיחות, לבנים, 1997</text><text x="16" y="${L.rl}" class="t-xs" style="stroke:var(--field);stroke-width:4;paint-order:stroke;stroke-linejoin:round">\u2067אושר בנתיחה, יותר מ־5,000 איש, 2020</text>`
        :`<text x="20" y="${L.fl}" class="t-xs">\u2067סדרות מרפאה + נתיחה,</text><text x="20" y="${L.fl+12}" class="t-xs">\u2067אנשים לבנים, 1997</text><text x="20" y="${L.rl}" class="t-xs">\u2067אושר בנתיחה,</text><text x="20" y="${L.rl+12}" class="t-xs">\u2067יותר מ־5,000 איש, 2020</text>`;
    s+=bar(cur.f,L.fy,L.bh,'var(--amber)',ap>.98?fl:f1(cur.f),G.far.length>1?[G.far[1],G.far[2]]:null);
    s+=bar(cur.r,L.ry,L.bh,'var(--rose)',ap>.98?(G.rei===1?'⁧1 (ייחוס)':String(G.rei)):f1(cur.r));
    // ancestry
    s+=`<text x="${N?16:20}" y="${L.at}" class="t-sm">${G.anc?G.anc.h[N?1:0]:'לפי מוצא'}</text>`;
    if(G.anc)G.anc.rows.forEach(([lab,v],i)=>{const y=L.ar+i*L.rs,vv=Math.exp(Math.log(v)*ease(ap));
      s+=N?`<text x="16" y="${y}" class="t-xs" style="stroke:var(--field);stroke-width:4;paint-order:stroke;stroke-linejoin:round">${lab}</text>`+bar(vv,y+5,12,'var(--violet)',ap>.98?String(v):'')
          :`<text x="20" y="${y+11}" class="t-xs">${lab}</text>`+bar(vv,y,14,'var(--violet)',ap>.98?String(v):'')});
    else s+=`<text x="${N?16:20}" y="${L.ar+(N?4:12)}" class="t-xs">${N?'\u2067אין במקורות אלה פילוח לפי מוצא.':'\u2067אין פילוח לפי מוצא לגנוטיפ הזה במקורות שבהם השתמשנו כאן.'}</text>`;
    asv.innerHTML=s;
    const html=noteHTML({k:'APOE '+G.l,t:G.id==='e3e3'?'גנוטיפ הייחוס':(G.rei<1?'סיכויים נמוכים יותר מאשר ב־ε3/ε3':'סיכויים גבוהים יותר מאשר ב־ε3/ε3'),txt:G.txt,
      pt:'המספרים האלה משווים בין קבוצות. עמודה ארוכה יותר ימינה פירושה שהזוג נמצא לעתים קרובות יותר אצל אנשים עם אלצהיימר. היא לא אומרת מה יקרה לאדם מסוים.',
      hook:G.hook||'למה שתי העמודות שונות: קבוצות שאובחנו קלינית כוללות גם אנשים שקיבלו בטעות אבחנה של אלצהיימר, וזה מדלל את ההשפעה. אישור בנתיחה מגדיל את יחסי הסיכויים. [[Reiman2020]]'});
    if(html!==lastA){$('#gnApoeNote').innerHTML=html;lastA=html}
    $$('.gn-row[data-g]',$('#gnLife')).forEach(r=>r.classList.toggle('on',r.dataset.g.split(' ').includes(G.id)));
  }
  function pick(i){if(i===gi)return;const from={...cur},G=GN_GT[i];gi=i;
    $$('[data-gi]',$('#gnGeno')).forEach(b=>b.setAttribute('aria-pressed',+b.dataset.gi===i));
    if(stopA)stopA();stopA=animate(800,p=>{ap=p;const e=ease(p);cur={f:Math.exp(lerp(Math.log(from.f),Math.log(G.far[0]),e)),r:Math.exp(lerp(Math.log(from.r),Math.log(G.rei),e))};drawA()},()=>{stopA=null;ap=1;drawA()})}
  $('#gnGeno').addEventListener('click',e=>{const b=e.target.closest('[data-gi]');if(b)pick(+b.dataset.gi)});
  // lifetime risk rows
  $('#gnLife').innerHTML=GN_LIFE.map(r=>`<div class="gn-row" data-g="${r.g.join(' ')}"><div class="gl"><b>${r.l}</b>${r.s} ${r.src}</div><div class="gn-track" role="img" aria-label="${r.l}: ${r.v}"><i data-l="${r.a}" data-w="${r.b-r.a}" style="left:0;width:0"></i>${r.c?`<i class="x" data-l="${r.b}" data-w="${r.c-r.b}" style="left:0;width:0"></i>`:''}<span data-l="${(r.c||r.b)+1.5}" style="left:0">${r.c||r.b}%</span></div><div class="gv">${r.v}</div></div>`).join('')
    +`<div class="gn-row"><div class="gl"></div><div class="gn-axis" aria-hidden="true"><span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span></div></div>`;
  const growLife=()=>setTimeout(()=>{$$('#gnLife [data-l]').forEach(el=>{el.style.left=el.dataset.l+'%';if(el.dataset.w)el.style.width=el.dataset.w+'%'})},60);
  const prevS=onShow.genes;onShow.genes=()=>{prevS&&prevS();growLife()};growLife();

  /* ---------------- dominant pedigree + DIAN ---------------- */
  const svg=$('#gnPed'),rg=$('#gnT');let gene='PSEN1',seed=3,fam=[];
  const roll=()=>{const r=rng(seed*7919+11);fam=[0,1,2,3].map(()=>r()<.5)};roll();
  function draw(t){
    const N=vb(svg,'720 430','400 822');
    const L=N?{pa:[140,60],pb:[260,60],dx:200,sib:104,kids:[65,155,245,335],ky:150,lab:184,cnt:214,on:[240,256],gI:[14,64],gII:[14,154],
        pun:{t:[16,296],cp:[250,318],ch:[205,295],chy:336,gx:160,gy:344,cw:90,chh:70,rh:148,op:[16,418],res:[200,508]},
        waf:{t:[16,296],x:116,y:312,l1:[16,500],l2:[16,516]}}
             :{pa:[130,70],pb:[250,70],dx:190,sib:120,kids:[70,150,230,310],ky:170,lab:205,cnt:232,on:[256,272],gI:[24,75],gII:[24,175],
        pun:{t:[400,34],cp:[590,50],ch:[545,635],chy:66,gx:500,gy:74,cw:90,chh:70,rh:488,op:[400,150],res:[590,240]},
        waf:{t:[400,34],x:470,y:48,l1:[420,240],l2:[420,256]}};
    let s=`<defs>${marker('gnA')}</defs><rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    const person=(x,y,sq,st,o)=>{const fill=st==='c'?'var(--rose)':st==='n'?'var(--panel)':'var(--panel-2)';
      let g=sq?`<rect x="${x-15}" y="${y-15}" width="30" height="30" rx="2" style="fill:${fill};stroke:var(--ink);stroke-width:1.8;opacity:${f1(o)}"/>`
              :`<circle cx="${x}" cy="${y}" r="16" style="fill:${fill};stroke:var(--ink);stroke-width:1.8;opacity:${f1(o)}"/>`;
      if(st==='u')g+=`<text x="${x}" y="${y+4}" class="t-sm t-mid" style="opacity:${f1(o)}">?</text>`;
      if(st==='c')g+=`<text x="${x}" y="${y+4}" class="t-sm t-mid" style="fill:var(--bg);font-weight:700;opacity:${f1(o)}">M</text>`;
      return g};
    // generation I
    const [ax,ay]=L.pa,[bx,by]=L.pb;
    s+=`<text x="${L.gI[0]}" y="${L.gI[1]}" class="t-sm">I</text><text x="${L.gII[0]}" y="${L.gII[1]}" class="t-sm">II</text>`;
    s+=`<path d="M${ax+16} ${ay} H${bx-16} M${L.dx} ${ay} V${L.sib} M${L.kids[0]} ${L.sib} H${L.kids[3]}" style="stroke:var(--ink);stroke-width:1.6;fill:none"/>`;
    L.kids.forEach(x=>{s+=`<path d="M${x} ${L.sib} V${L.ky-16}" style="stroke:var(--ink);stroke-width:1.6"/>`});
    s+=person(ax,ay,true,'c',1)+person(bx,by,false,'n',1);
    s+=`<text x="${ax}" y="${ay+34}" class="t-xs t-mid" style="fill:var(--ink)">\u2067נשא ${gene}</text><text x="${bx}" y="${by+34}" class="t-xs t-mid">ללא עותק</text>`;
    // generation II
    const kidT=j=>.38+j*.025;
    L.kids.forEach((x,j)=>{const k=ramp(t,kidT(j)+.02,kidT(j)+.04),sq=j%2===0;
      if(k<1)s+=person(x,L.ky,sq,'u',lerp(.45,1,ramp(t,.3,.36))*(1-k));
      if(k>0)s+=person(x,L.ky,sq,fam[j]?'c':'n',k);
      if(k>0)s+=`<text x="${x}" y="${L.lab}" class="t-xs t-mid" style="opacity:${f1(k)};fill:${fam[j]?'var(--rose)':'var(--muted)'}">${fam[j]?'נשא':'ללא עותק'}</text>`;
      const tk=ramp(t,kidT(j)-.04,kidT(j)+.02);
      if(tk>0&&tk<1){const e=ease(tk),tx=lerp(ax,x,e),ty=lerp(ay,L.ky,e);
        s+=`<rect x="${f1(tx-9)}" y="${f1(ty-9)}" width="18" height="18" rx="5" style="fill:${fam[j]?'var(--rose)':'var(--panel-2)'};stroke:var(--ink);stroke-width:1"/><text x="${f1(tx)}" y="${f1(ty+4)}" class="t-xs t-mid" style="fill:${fam[j]?'var(--bg)':'var(--ink)'};font-weight:700">${fam[j]?'M':'+'}</text>`}});
    const nc=fam.filter(Boolean).length,co=ramp(t,.48,.5);
    if(co>0)s+=`<text x="${L.dx}" y="${L.cnt}" class="t-lbl t-mid" style="opacity:${f1(co)}">\u2067במשפחה הזאת: ${nc} מתוך 4 ילדים נושאים אותה</text>`;
    const oo=ramp(t,.5,.56);
    if(oo>0)GN_ONSET[gene].l.forEach((l,i)=>{s+=`<text x="${L.dx}" y="${L.on[i]}" class="t-sm t-mid" style="opacity:${f1(oo)};fill:var(--ink)">${l}</text>`});
    // Punnett square, then the waffle
    const wf=ramp(t,.88,.93),pu=ramp(t,.14,.18)*(1-wf),P=L.pun;
    if(pu>0){s+=`<g style="opacity:${f1(pu)}"><text x="${P.t[0]}" y="${P.t[1]}" class="t-sm">כל ילד, בכל פעם</text>`;
      s+=`<text x="${P.cp[0]}" y="${P.cp[1]}" class="t-xs t-mid">העותקים של ההורה הנשא</text>`;
      ['M','+'].forEach((h,c)=>{s+=`<text x="${P.ch[c]}" y="${P.chy}" class="t-lbl t-mid" style="fill:${h==='M'?'var(--rose)':'var(--ink)'}">${h}</text>`});
      [0,1].forEach(r=>{s+=`<text x="${P.rh}" y="${P.gy+r*P.chh+P.chh/2+5}" class="t-lbl t-end">+</text>`});
      s+=`<text x="${P.op[0]}" y="${P.op[1]}" class="t-xs">ההורה השני</text>`;
      for(let r=0;r<2;r++)for(let c=0;c<2;c++){const k=r*2+c,f=ramp(t,.18+k*.035,.22+k*.035),x=P.gx+c*P.cw,y=P.gy+r*P.chh,car=c===0;
        s+=`<rect x="${x}" y="${y}" width="${P.cw}" height="${P.chh}" style="fill:${f>0?(car?'var(--rose-soft)':'var(--panel)'):'var(--panel)'};stroke:var(--line);stroke-width:1.5"/>`;
        if(f>0)s+=`<text x="${x+P.cw/2}" y="${y+30}" class="t-lbl t-mid" style="opacity:${f1(f)}">${car?'M / +':'+ / +'}</text><text x="${x+P.cw/2}" y="${y+48}" class="t-xs t-mid" style="opacity:${f1(f)};fill:${car?'var(--rose)':'var(--muted)'}">${car?'נשא':'ללא עותק'}</text>`}
      const rs=ramp(t,.3,.34);if(rs>0)s+=`<text x="${P.res[0]}" y="${P.res[1]}" class="t-lbl t-mid" style="opacity:${f1(rs)}">⁧2 מתוך 4 משבצות: סיכוי של 50%</text>`;
      s+='</g>'}
    if(wf>0){const W=L.waf;s+=`<g style="opacity:${f1(wf)}"><text x="${W.t[0]}" y="${W.t[1]}" class="t-sm">${N?'החלק מכלל מקרי האלצהיימר':'\u2067החלק מכלל מקרי האלצהיימר · 100 משבצות'}</text>`;
      for(let i=0;i<100;i++){const x=W.x+(i%10)*17,y=W.y+Math.floor(i/10)*17,on=ramp(wf,.3+i*.004,.5+i*.004);
        s+=i===0?`<rect x="${x}" y="${y}" width="15" height="15" rx="2" style="fill:var(--rose)"/>`
          :i<5?`<rect x="${x+.75}" y="${y+.75}" width="13.5" height="13.5" rx="2" style="fill:var(--rose-soft);stroke:var(--rose);stroke-width:1.5;stroke-dasharray:3 2;opacity:${f1(on)}"/>`
          :`<rect x="${x}" y="${y}" width="15" height="15" rx="2" style="fill:var(--panel-2)"/>`}
      s+=`<rect x="${W.l1[0]}" y="${W.l1[1]-10}" width="11" height="11" rx="2" style="fill:var(--rose)"/><text x="${W.l1[0]+16}" y="${W.l1[1]}" class="t-xs" style="fill:var(--ink)">\u2067משבצת 1: פחות מ־1% (סקירת DIAN)</text>`;
      s+=`<rect x="${W.l2[0]}" y="${W.l2[1]-10}" width="11" height="11" rx="2" style="fill:var(--rose-soft);stroke:var(--rose);stroke-dasharray:3 2"/><text x="${W.l2[0]+16}" y="${W.l2[1]}" class="t-xs" style="fill:var(--ink)">\u2067עוד 4: פחות מ־5% (ACMG/NSGC)</text></g>`}
    // DIAN timeline
    const tY=lerp(-27,5,ramp(t,.62,.86)),tl=lerp(.35,1,ramp(t,.58,.64));
    s+=`<g style="opacity:${f1(tl)}">`;
    if(!N){const X=y=>lerp(50,690,(y+27)/32),ay2=392;
      s+=`<text x="20" y="292" class="t-sm">\u2067DIAN · שנים ממועד ההופעה הצפוי (גיל ההופעה אצל ההורה)</text>`;
      s+=`<path d="M${X(-27)} ${ay2} H${X(5)}" class="axis" style="stroke:var(--muted);stroke-width:2"/>`;
      if(t>.62)s+=`<path d="M${X(-27)} ${ay2} H${f1(X(tY))}" style="stroke:var(--rose);stroke-width:5;stroke-linecap:round"/>`;
      for(let y=-25;y<=5;y+=5)s+=`<path d="M${X(y)} ${ay2-4} v8" class="axis"/><text x="${X(y)}" y="${ay2+18}" class="t-xs t-mid" style="${y===0?'fill:var(--ink);font-weight:700':''}">${y>0?'+'+y:y===0?'0':'−'+(-y)}</text>`;
      GN_DIAN.forEach(([y,a,b],i)=>{const on=t>.62&&tY>=y?1:t>.86?1:0,hi=[0,2,5].includes(i),ly=hi?332:362;
        s+=`<g style="opacity:${on?1:.25}"><path d="M${X(y)} ${ly+(b?16:4)} V${ay2}" style="stroke:var(--rose);stroke-width:1.2;stroke-dasharray:${y===0?'3 3':'none'}"/><circle cx="${X(y)}" cy="${ay2}" r="5" style="fill:${on?'var(--rose)':'var(--panel)'};stroke:var(--rose);stroke-width:1.5"/>`;
        s+=`<text x="${X(y)}" y="${ly-8}" class="t-xs ${i===5?'t-end':'t-mid'}" style="fill:var(--ink)">${a}</text>${b?`<text x="${X(y)}" y="${ly+4}" class="t-xs ${i===5?'t-end':'t-mid'}">${b}</text>`:''}</g>`});
    }else{const Y=y=>lerp(586,796,(y+27)/32),axx=96;
      s+=`<text x="16" y="560" class="t-sm">\u2067DIAN · שנים ממועד ההופעה הצפוי</text>`;
      s+=`<path d="M${axx} ${Y(-27)} V${Y(5)}" class="axis" style="stroke:var(--muted);stroke-width:2"/>`;
      if(t>.62)s+=`<path d="M${axx} ${Y(-27)} V${f1(Y(tY))}" style="stroke:var(--rose);stroke-width:5;stroke-linecap:round"/>`;
      for(let y=-25;y<=5;y+=5)s+=`<path d="M${axx-4} ${Y(y)} h8" class="axis"/><text x="${axx-10}" y="${f1(Y(y)+4)}" class="t-xs t-end" style="${y===0?'fill:var(--ink);font-weight:700':''}">${y>0?'+'+y:y===0?'0':'−'+(-y)}</text>`;
      const ly=gnRelax(GN_DIAN.map(d=>Y(d[0])),30);
      GN_DIAN.forEach(([y,a,b],i)=>{const on=t>.62&&tY>=y?1:t>.86?1:0,yy=ly[i];
        s+=`<g style="opacity:${on?1:.25}"><circle cx="${axx}" cy="${f1(Y(y))}" r="5" style="fill:${on?'var(--rose)':'var(--panel)'};stroke:var(--rose);stroke-width:1.5"/><path d="M${axx+6} ${f1(Y(y))} L${axx+18} ${f1(yy)}" style="stroke:var(--rose);stroke-width:1"/>`;
        s+=`<text x="${axx+22}" y="${f1(yy+3)}" class="t-xs" style="fill:var(--ink)">${a}${b?' '+b:''}</text></g>`});
    }
    s+='</g>';
    svg.innerHTML=s;
    const p=phaseOf(GN_STEPS,t);setSt(p);
    let S={...GN_STEPS[p]};
    if(p===3)S.txt=GN_ONSET[gene].t+' ב־387 משפחות, גיל ההופעה הממוצע היה 46.2 שנים; גיל ההופעה אצל ההורה והמוטציה יחד הסבירו חלק ניכר מגיל ההופעה של האדם (r² מעל 0.38), ו־APOE לא שינה אותו באופן מובהק. [[Ryman2014]]';
    $('#gnNote').innerHTML=noteHTML(S);
    $('#gnRead').innerHTML=`גן <b>${gene}</b> · במשפחה הזאת <b>${nc} מתוך 4</b> ילדים נושאים אותה · הסיכוי של כל ילד <b>50%</b>${t>.62?` · שעון <b>\u2066${tY>=0?'+':''}${Math.round(tY)}\u2069 שנים</b>`:''}`;
  }
  const stop=playWire(rg,$('#gnPlay'),draw,20000,'הפעלה חוזרת','genes');
  const setSt=stepWire($('#gnSteps'),GN_STEPS,rg,draw,stop);
  const setGene=g=>{gene=g;[['APP','#gnAPP'],['PSEN1','#gnPS1'],['PSEN2','#gnPS2']].forEach(([k,id])=>$(id).setAttribute('aria-pressed',k===g));draw(+rg.value)};
  $('#gnAPP').onclick=()=>setGene('APP');$('#gnPS1').onclick=()=>setGene('PSEN1');$('#gnPS2').onclick=()=>setGene('PSEN2');
  $('#gnRoll').onclick=()=>{seed++;roll();if(+rg.value<.5){rg.value=.5}draw(+rg.value)};

  /* ---------------- Down syndrome ---------------- */
  const dsv=$('#gnDs'),drg=$('#gnDsT');let part=false,lastD='';
  function drawD(t){
    const N=vb(dsv,'720 340','400 612'),age=20+60*t;
    const L=N?{cx:[70,130,190],top:30,app:[112,124],qb:200,lbl:226,rd:[16,256],rd2:272,ax:60,y0:312,y1:582,tx:76,big:[390,34]}
             :{cx:[60,120,180],top:56,app:[138,150],qb:226,lbl:252,rd:[30,286],rd2:304,ax:360,y0:52,y1:316,tx:378,big:[330,30]};
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    const A=y=>lerp(L.y0,L.y1,(y-20)/60);
    // chromosomes 21 (acrocentric: tiny p arm, long q arm), APP band on q
    L.cx.forEach((x,i)=>{const third=i===2,pp=third&&part;
      const pTop=L.top,cen=L.top+22,qTop=L.top+28,qBot=L.qb,cut=L.app[1]+26;
      if(pp){s+=`<rect x="${x-11}" y="${qTop}" width="22" height="${cut-qTop}" rx="10" style="fill:none;stroke:var(--muted);stroke-width:1.2;stroke-dasharray:3 3"/><rect x="${x-11}" y="${cut}" width="22" height="${qBot-cut}" rx="10" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2"/>`}
      else{s+=`<rect x="${x-8}" y="${pTop}" width="16" height="18" rx="7" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2"/><path d="M${x} ${pTop+18} V${qTop}" style="stroke:var(--cell-line);stroke-width:4"/><rect x="${x-11}" y="${qTop}" width="22" height="${qBot-qTop}" rx="10" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2"/>`;
        s+=`<rect x="${x-11}" y="${L.app[0]}" width="22" height="${L.app[1]-L.app[0]}" style="fill:var(--amber)"/>`}
      s+=`<text x="${x}" y="${L.lbl}" class="t-xs t-mid">עותק ${i+1}</text>`});
    s+=`<path d="M${L.cx[2]+14} ${(L.app[0]+L.app[1])/2} h16" style="stroke:var(--amber);stroke-width:1.5"/><text x="${L.cx[2]+34}" y="${(L.app[0]+L.app[1])/2+4}" class="t-lbl" style="fill:var(--amber)">${part?'\u2067אזור APP חסר':'APP'}</text>`;
    s+=`<text x="${L.rd[0]}" y="${L.rd[1]}" class="t-lbl">\u2067עותקי APP: ${part?2:3}</text><text x="${L.rd[0]}" y="${L.rd2}" class="t-xs">${part?'אותו מינון כמו אצל רוב האנשים':'\u2067ה־APP העודף מתבטא ביתר'}</text>`;
    // age ladder
    s+=`<text x="${L.big[0]}" y="${L.big[1]}" class="t-big${N?' t-end':''}" style="font-size:24px">גיל ${Math.round(age)}</text>`;
    s+=`<path d="M${L.ax} ${L.y0} V${L.y1}" class="axis" style="stroke:var(--muted);stroke-width:2"/><path d="M${L.ax} ${L.y0} V${f1(A(age))}" style="stroke:var(--rose);stroke-width:5;stroke-linecap:round"/>`;
    for(let a=20;a<=80;a+=10)s+=`<path d="M${L.ax-4} ${f1(A(a))} h8" class="axis"/><text x="${L.ax-8}" y="${f1(A(a)+4)}" class="t-xs t-end">${a}</text>`;
    const M=part?[{a:78,l:'\u2067גיל 78: אין אלצהיימר בבדיקות, ב־MRI או בנתיחה (1 אישה)'}]:GN_DS;
    const ly=gnRelax(M.map(m=>A(m.a)),17);
    M.forEach((m,i)=>{const on=age>=m.a,o=on?1:.22;
      if(m.b)s+=`<rect x="${L.ax+6}" y="${f1(A(m.a))}" width="5" height="${f1(A(Math.min(Math.max(age,m.a),m.b+1))-A(m.a))}" style="fill:var(--rose)"/>`;
      s+=`<g style="opacity:${o}"><circle cx="${L.ax}" cy="${f1(A(m.a))}" r="4" style="fill:${on?(part?'var(--good)':'var(--rose)'):'var(--panel)'};stroke:${part?'var(--good)':'var(--rose)'};stroke-width:1.5"/><path d="M${L.ax+11} ${f1(A(m.a))} L${L.tx-4} ${f1(ly[i]-3)}" style="stroke:var(--muted);stroke-width:1"/><text x="${L.tx}" y="${f1(ly[i])}" class="t-xs" style="fill:var(--ink)">${m.l}</text></g>`});
    dsv.innerHTML=s;
    drg.setAttribute('aria-valuetext','גיל '+Math.round(age));
    const done=M.filter(m=>age>=m.a);
    const P=part?{k:'טריזומיה 21 חלקית · מקרה אחד',t:'שני עותקי APP, בלי אלצהיימר',
        txt:'אישה בת 78 עם תסמונת דאון שנגרמה מטריזומיה 21 חלקית נשאה רק שני עותקים של APP. לא נמצא אצלה אלצהיימר בבדיקה נוירופסיכולוגית, ב־MRI או בבדיקה נוירופתולוגית, וזה תומך בכך שהעותק הנוסף של APP הוא הגורם המרכזי. [[Prasher1998]] זהו תיאור של מקרה יחיד.'+(age>=78?' הסולם הגיע לגיל שלה.':''),
        pt:'לאישה אחת הייתה תסמונת דאון, אבל בלי העותק הנוסף של הגן APP. היא לא פיתחה אלצהיימר, גם בגיל 78.'}
      :{k:'תסמונת דאון · גיל '+Math.round(age),t:done.length?done[done.length-1].l.replace(/^[^:]+: /,''):'לפני השינויים',
        txt:'כמעט כל המבוגרים עם תסמונת דאון מראים פתולוגיה של אלצהיימר עד גיל 40, בין השאר משום ש־APP נמצא על כרומוזום 21 ומתבטא ביתר. [[LottHead2019]] אצל 388 מבוגרים, סמנים בנוזל השדרה ובדם השתנו בשנות ה־20, ו־PET עמילואיד בשנות ה־30; אלצהיימר פרודרומלי אובחן בגיל חציוני של 50.2 שנים ודמנציה בגיל 53.7, ושיעור האלצהיימר התסמיני הגיע ל־90% עד 100% בשנות ה־60. [[Fortea2020]] בעוקבה אירית שנעקבה במשך 20 שנה, 75 מתוך 77 אנשים (97.4%) פיתחו דמנציה, בגיל ממוצע של 55. [[McCarron2017]] כיום היא מתוארת כצורה גנטית של אלצהיימר וכגורם המוות המוביל אצל מבוגרים עם תסמונת דאון. [[Fortea2021]]',
        pt:'לאנשים עם תסמונת דאון יש עותק נוסף של הגן שמייצר עמילואיד. כמעט כולם מפתחים את השינויים המוחיים של אלצהיימר עד גיל 40, ורובם מפתחים דמנציה בשנות ה־50 לחייהם.',
        hook:'APP נמצא על כרומוזום 21: טריזומיה 21 = שלושה עותקי APP = עמילואיד מוקדם, כמעט אצל כולם. טריזומיה חלקית בלי ה־APP הנוסף: בלי אלצהיימר (תיאור מקרה). [[LottHead2019,Prasher1998]]'};
    const html=noteHTML(P);if(html!==lastD){$('#gnDsNote').innerHTML=html;lastD=html}
  }
  playWire(drg,$('#gnDsPlay'),drawD,12000,'הפעלה חוזרת','genes');
  const setPart=v=>{part=v;$('#gnDsFull').setAttribute('aria-pressed',!v);$('#gnDsPart').setAttribute('aria-pressed',v);drawD(+drg.value)};
  $('#gnDsFull').onclick=()=>setPart(false);$('#gnDsPart').onclick=()=>setPart(true);
  const prevR=redraws.genes;redraws.genes=()=>{prevR&&prevR();drawA()};
  drawA();draw(+rg.value);drawD(+drg.value);
};
