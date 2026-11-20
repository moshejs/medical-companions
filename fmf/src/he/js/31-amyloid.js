/* =============== 3.1 AA amyloidosis =============== */
const AM_STEPS=[
 {from:0,at:.05,k:'שנה 0 ואילך · כבד',t:'הכבד מייצר SAA',
  txt:`עמילואיד A בסרום (SAA) הוא חלבון של השלב החריף (acute-phase) שמיוצר בעיקר בתאי הכבד, בתגובה ל־IL-1, ל־IL-6 ול־TNF-α. ב־FMF רמתו מזנקת בזמן התקפים, ואצל חלק מהחולים היא נשארת גבוהה גם בין התקפים (בקבוצה אחת: חציון של 693 mg/L בהתקפים לעומת 6 mg/L בין התקפים). עמילואיד מסוג AA נוצר כאשר SAA נשאר גבוה לאורך זמן רב. [[Mirioglu2024,Lachmann2006]]`,
  pt:`הדלקת מאותתת לכבד להזרים לדם חלבון בשם SAA. אם הדלקת אף פעם לא נרגעת לגמרי, SAA נשאר גבוה במשך שנים.`,
  hook:`עמילואיד מסוג AA בנוי מ־<b>SAA</b>, חלבון של השלב החריף שייצורו מונע בידי IL-1, IL-6 ו־TNF.`},
 {from:.13,at:.18,k:'חיתוך',t:'SAA נחתך לחלבון AA',
  txt:`מטאלופרוטאינאזות של המטריקס חותכות את SAA, בן 122 חומצות אמינו, לחלבון AA בן 76 חומצות אמינו. שונות במיקום המדויק של החיתוך מעודדת קיפול שגוי. [[Mirioglu2024]]`,
  pt:`אנזימים גוזרים את חלבון ה־SAA ומשאירים מקטע קצר יותר, שמתקפל בצורה לא נכונה.`,
  hook:`SAA באורך <b>122 aa</b> ← חלבון AA באורך <b>76 aa</b>, בחיתוך של <b>MMPs</b>.`},
 {from:.25,at:.3,k:'קיפול שגוי',t:'AA נערם לסיבי cross-β',
  txt:`מקטעי ה־AA מתקפלים בצורה שגויה ונערמים לסיבים בלתי מסיסים במבנה של יריעות β צולבות (cross-β), שעמידים לפירוק. במיקרוסקופ אלקטרוני הם אינם מסועפים, ורוחבם 8–12 nm. [[Mirioglu2024]]`,
  pt:`המקטעים המקופלים לא נכון נערמים כמו שלבים של סולם לחוטים ארוכים, שהגוף לא מצליח לפרק בקלות.`,
  hook:`עמילואיד = סיבי <b>cross-β</b>, לא מסועפים, <b>8–12 nm</b>.`},
 {from:.36,at:.44,k:'שקיעה',t:'הסיבים שוקעים בפקעית הכליה',
  txt:`הסיבים שוקעים במסננים של הכליה, וגם בטחול, בבלוטות יותרת הכליה, בכבד ובמעי. המשקעים מתחלפים לאט מאוד. הזמן החציוני מתחילת הדלקת ועד אבחון עמילואידוזיס מסוג AA הוא כ־17 שנים, אבל הוא משתנה מאוד. [[Ozen2016,Mirioglu2024]]`,
  pt:`החוטים מצטברים במסננים הזעירים של הכליה במשך שנים, לפני שמשהו ניכר.`,
  hook:`חציון של כ־<b>17 שנים</b> מתחילת הדלקת ועד האבחון; הכליה היא האיבר שבו המחלה מתגלה.`},
 {from:.5,at:.55,k:'פרוטאינוריה',t:'חלבון דולף לשתן',
  txt:`המשקעים משבשים את המסנן ואת הפודוציטים שאוטמים אותו, וכך חלבון דולף החוצה. מעורבות הכליה מתבטאת בדרך כלל לראשונה כחלבון בשתן (פרוטאינוריה), ולכן EULAR 2016 ממליץ על בדיקת שתן כללית בכל ביקור. ב־FMF נדרשת ביופסיית כליה כדי לאשר עמילואידוזיס בחולה עם פרוטאינוריה. [[Mirioglu2024,Ozen2016]]`,
  pt:`חלבון מתחיל לדלוף לשתן. בדיקת שתן פשוטה יכולה לגלות זאת עוד לפני שהאדם מרגיש משהו.`,
  hook:`הסימן הראשון: <b>פרוטאינוריה</b>. בדיקת שתן ב<b>כל</b> ביקור (EULAR 2016).`},
 {from:.62,at:.68,k:'תסמונת נפרוטית',t:'איבוד חלבון כבד',
  txt:`בעמילואידוזיס מסוג AA באופן כללי, ליותר מ־90% יש פרוטאינוריה או ירידה בתפקוד הכליות בזמן הפנייה הראשונה, וליותר ממחציתם יש תסמונת נפרוטית. בקבוצה של Zemer, תפקוד הכליות ירד אצל כל 24 החולים שהתחילו עם תסמונת נפרוטית או אורמיה, ואילו אצל 68 מתוך 86 החולים שלא הייתה להם תסמונת נפרוטית הפרוטאינוריה התייצבה. [[Mirioglu2024,Zemer1986]]`,
  pt:`כל כך הרבה חלבון אובד, שהרגליים מתנפחות ורמת החלבון בדם יורדת. הטיפול יעיל הרבה יותר לפני השלב הזה.`,
  hook:`תסמונת נפרוטית בזמן האבחון מנבאת הידרדרות; לגילוי מוקדם יותר יש חשיבות.`},
 {from:.76,at:.92,k:'אי-ספיקת כליות',t:'הסינון יורד',
  txt:`כמחצית מחולי FMF עם פרוטאינוריה זקוקים בסופו של דבר לדיאליזה, וכ־10% מחולי עמילואידוזיס מסוג AA כבר נמצאים באי-ספיקת כליות בזמן הפנייה הראשונה. בנפרופתיה עמילואידית, קולכיצין עזר בעיקר כשהקריאטינין ההתחלתי היה מתחת ל־1.5 mg/dL, ובמינונים מעל 1.5 mg/day. [[Ozen2016,Mirioglu2024,Livneh1994]]`,
  pt:`במשך השנים המסננים הסתומים מפסיקים לעבוד, וזה עלול להוביל לדיאליזה או להשתלה.`,
  hook:`בקבוצה טורקית של 587 חולים, עמילואידוזיס הייתה <b>סיבת המוות המובילה</b> והמנבא המובהק היחיד לתמותה.`}
];
const AM_ORGS=[
 {k:'thyroid',n:'בלוטת התריס',f:'יכולה להיות מעורבת',w:.3},
 {k:'heart',n:'לב',f:'לעיתים רחוקות',w:.1},
 {k:'liver',n:'כבד',f:'שכיח',w:.55},
 {k:'spleen',n:'טחול',f:'כמעט תמיד',w:1},
 {k:'adrenal',n:'יותרת הכליה',f:'\u2067≥1 מכל 3; אי-ספיקה לא שכיחה\u2069',w:.55},
 {k:'kidney',n:'כליות',f:'סימן ראשון רגיל: פרוטאינוריה',w:1},
 {k:'gut',n:'מעי',f:'\u2067כ־30%, בעיקר שלשול\u2069',w:.35},
 {k:'testes',n:'אשכים',f:'עלול לגרום לאזוספרמיה',w:.3}
];
const AM_RISK=[
 {n:'ארץ המגורים',s:'\u2067Touitou 2007 · 2,482 חולים\u2069',or:3.2,lo:1.8,hi:5.9},
 {n:'\u2067הומוזיגוט M694V\u2069',s:'\u2067Kasifoglu 2014 · עמילואידוזיס\u2069',or:6,lo:4.29,hi:8.7,ap:true},
 {n:'\u2067הומוזיגוט M694V\u2069',s:'\u2067Vitale 2025 · פרוטאינוריה\u2069',or:2.27},
 {n:'\u2067גנוטיפ SAA1 α/α\u2069',s:'\u2067Cazeneuve 2000 · קבוצה ארמנית ברובה\u2069',or:6.9,lo:2.5,hi:19},
 {n:'מין זכר',s:'\u2067Cazeneuve 2000 · 2.37 בקבוצה אחרת\u2069',or:4.0,lo:1.5,hi:10.8},
 {n:'לויקוציטוזיס בין התקפים',s:'Vitale 2025',or:7.47},
 {n:'\u2067ESR מוגבר בין התקפים\u2069',s:'Vitale 2025',or:3.6}
];
inits.amyloid=()=>{
  /* ---------- main: years-long cascade ---------- */
  const svg=$('#amSvg'),osv=$('#amOrg'),rg=$('#amT');let mode='high';const TC=.5,NS=400;
  const r=rng(41),A1=[],A2=[],A3=[];for(let i=0;i<=NS;i++){A1.push(r());A2.push(r());A3.push(r())}
  const saa=(i,m)=>{const ctrl=m==='low'&&i/NS>=TC;if(ctrl)return Math.max(2.5+5*A1[i],A2[i]>.97?30+90*A3[i]:0);return Math.max(18+30*A1[i],A2[i]>.9?250+550*A3[i]:0)};
  const Dh=t=>Math.pow(ramp(t,.36,1),1.1);
  const Dep=(t,m)=>m==='high'||t<TC?Dh(t):Dh(TC)*(1-.45*ease(ramp(t,TC,1)));
  const Pf=d=>ramp(d,.1,.5);
  const Pro=(t,m)=>m==='high'||t<TC?Pf(Dh(t)):Pf(Dh(TC))*(1-.25*ramp(t,TC,1));
  const Gfr=(t,m)=>100-92*ramp(m==='high'||t<TC?Dh(t):Dh(TC),.5,1);
  const rd=rng(9),BL=[];for(let i=0;i<70;i++){const a=rd()*Math.PI*2,rr=8+56*Math.sqrt(rd());BL.push({x:586+rr*Math.cos(a),y:146+rr*Math.sin(a),thr:i/70*.95,s:.7+.6*rd()})}
  const LOOPS=[];for(let k=0;k<8;k++){const a=(k*45+10)*Math.PI/180;LOOPS.push({a,x:586+42*Math.cos(a),y:146+42*Math.sin(a)})}
  const REG=[[56,34,144,142],[198,38,258,148],[198,38,258,148],[478,8,236,262],[376,272,334,66],[376,272,334,66],[376,326,334,88]];
  /* narrow: the three scene blocks run down the page and the readouts follow */
  const REG_N=[[94,36,138,142],[16,234,260,152],[16,234,260,152],[158,398,236,262],[32,844,338,66],[32,844,338,66],[32,906,338,88]];
  const WIDE={lcx:128,ldx:40,ltx:70,vw:502,vdx:70,vdw:450,ilx:6,SX:206,MY:0,gdx:0,gdy:0,
    SX0:60,SX1:340,SYB:350,SYH:60,SHY:282,SXT:364,SAT:380,SCL:288,SCB:352,
    MX0:384,MW:316,PMY:290,GMY:342,STY:402,REG:REG};
  const NARR={lcx:160,ldx:72,ltx:102,vw:360,vdx:48,vdw:330,ilx:8,SX:24,MY:196,gdx:-320,gdy:390,
    SX0:40,SX1:330,SYB:800,SYH:90,SHY:700,SXT:816,SAT:832,SCL:706,SCB:802,
    MX0:40,MW:320,PMY:862,GMY:922,STY:986,REG:REG_N};
  function stage(t,m,D,P,G){if(m==='low'&&t>=TC)return'\u2067SAA בשליטה: הגדילה נעצרת, נסיגה איטית\u2069';if(D<=0)return'\u2067שקט: SAA גבוה, עדיין אין משקעים\u2069';if(P<.03)return'משקעים שקטים, השתן עדיין תקין';if(P<.7)return'פרוטאינוריה';if(G>=60)return'תסמונת נפרוטית';if(G>=15)return'\u2067תסמונת נפרוטית, GFR יורד\u2069';return'אי-ספיקת כליות'}
  function draw(t){
    /* narrow: biology scene (liver → fibril → glomerulus) stacked down the page,
       then the SAA trace and the two meters full width underneath it. */
    const N=vb(svg,'720 420','400 1008'),L=N?NARR:WIDE;
    const m=mode,D=Dep(t,m),P=Pro(t,m),G=Gfr(t,m),ctl=m==='low'&&t>=TC,act=ctl?.25:1,year=t*20,iN=Math.round(t*NS),p=phaseOf(AM_STEPS,t);
    let s=`<defs>${marker('amA','var(--muted)')}</defs>`;
    const R0=L.REG[p];s+=`<rect x="${R0[0]}" y="${R0[1]}" width="${R0[2]}" height="${R0[3]}" rx="12" style="fill:var(--gold-soft);opacity:.55"/>`;
    /* liver cell */
    const LC=L.lcx;
    s+=`<text x="${L.ltx}" y="52" class="t-sm">תא כבד</text>`;
    let hx='';for(let k=0;k<6;k++){const a=k*Math.PI/3;hx+=(k?'L':'M')+f1(LC+58*Math.cos(a))+' '+f1(112+50*Math.sin(a))}
    s+=`<path d="${hx}Z" style="fill:var(--cyto);stroke:var(--memb);stroke-width:2"/><circle cx="${LC-14}" cy="106" r="16" style="fill:var(--nuc);opacity:.75"/>`;
    s+=`<text x="${LC}" y="150" class="t-xs t-mid">\u2067מייצר SAA\u2069</text>`;
    [['IL-1',84],['IL-6',112],['TNF-α',140]].forEach(([l,y],k)=>{s+=`<text x="${L.ilx}" y="${y}" class="t-xs" style="fill:var(--terra)">${l}</text>`;for(let j=0;j<2;j++){const ph=(t*60+j*.5+k*.17)%1;s+=`<circle cx="${f1(L.ldx+30*ph)}" cy="${y-3}" r="3.5" style="fill:var(--terra);opacity:${f1(act*(1-ph*.6))}"/>`}});
    for(let j=0;j<5;j++){const ph=(t*30+j*.2)%1;s+=`<circle cx="${f1(LC+18+18*Math.cos(j*1.3+t*20))}" cy="${f1(112+18*Math.sin(j*1.3+t*20))}" r="4" style="fill:var(--gold);opacity:${f1(act*(.4+.6*ph))}"/>`}
    s+=`<rect x="${LC-7}" y="161" width="14" height="36" style="fill:var(--terra-soft);stroke:var(--terra);stroke-width:1"/>`;
    for(let j=0;j<2;j++){const ph=(t*40+j*.5)%1;s+=`<circle cx="${LC}" cy="${f1(165+28*ph)}" r="3.5" style="fill:var(--gold);opacity:${f1(act)}"/>`}
    /* blood vessel */
    s+=`<rect x="20" y="196" width="${L.vw}" height="22" rx="4" style="fill:var(--terra-soft);stroke:var(--terra);stroke-width:1.2"/><text x="26" y="211" class="t-xs" style="fill:var(--terra)">דם</text>`;
    const nS=ctl?3:14;for(let j=0;j<nS;j++){const ph=(t*25+j/nS)%1;s+=`<circle cx="${f1(L.vdx+L.vdw*ph)}" cy="${f1(207+4*Math.sin(j*2.1+t*40))}" r="3.6" style="fill:var(--gold)"/>`}
    /* molecules */
    const MY=L.MY;
    s+=`<text x="${L.SX}" y="${52+MY}" class="t-sm">SAA → AA → סיב</text>`;
    const c=ramp(t,.13,.22),SX=L.SX,PA=220/122,xc=SX+76*PA;
    s+=`<text x="${SX}" y="${68+MY}" class="t-xs" style="fill:var(--gold)">\u2067SAA · 122 חומצות אמינו\u2069</text>`;
    s+=`<rect x="${SX}" y="${73+MY}" width="${f1(76*PA)}" height="10" rx="3" style="fill:var(--gold);opacity:${f1(1-.5*c)}"/><rect x="${f1(xc+14*c)}" y="${73+MY}" width="${f1(46*PA)}" height="10" rx="3" style="fill:var(--gold);opacity:${f1(1-.6*c)}"/>`;
    if(t>=.13)s+=`<line x1="${f1(xc+7*c)}" x2="${f1(xc+7*c)}" y1="${68+MY}" y2="${88+MY}" style="stroke:var(--ink);stroke-width:1.4;stroke-dasharray:2 2"/><text x="${f1(xc+12)}" y="${98+MY}" class="t-xs">\u2067חיתוך MMP ב־76\u2069</text>`;
    if(c>0)s+=`<text x="${SX}" y="${110+MY}" class="t-xs" style="fill:var(--congo);opacity:${f1(c)}">\u2067חלבון AA · 76 aa\u2069</text><rect x="${SX}" y="${f1(lerp(73,114,c)+MY)}" width="${f1(76*PA)}" height="10" rx="3" style="fill:var(--congo);opacity:${f1(c)}"/>`;
    const fo=ramp(t,.25,.34);
    if(fo>0){const gr=m==='high'||t<TC?ramp(t,.34,1):ramp(TC,.34,1)*(1-.3*ramp(t,TC,1)),FL=40*fo+145*gr;
      s+=`<text x="${SX}" y="${142+MY}" class="t-xs" style="fill:var(--congo);opacity:${f1(fo)}">\u2067קיפול שגוי ← סיב cross-β\u2069</text>`;
      s+=`<line x1="${SX}" x2="${f1(SX+FL)}" y1="${149+MY}" y2="${149+MY}" style="stroke:var(--congo);opacity:.4"/><line x1="${SX}" x2="${f1(SX+FL)}" y1="${175+MY}" y2="${175+MY}" style="stroke:var(--congo);opacity:.4"/>`;
      let zz='';for(let x=SX+2;x<=SX+FL;x+=7)zz+=`M${f1(x)} ${150+MY}l3 4l-3 4l3 4l-3 4l3 4l-3 4`;
      s+=`<path d="${zz}" style="fill:none;stroke:var(--congo);stroke-width:1.8;opacity:${f1(fo)}"/>`;
      const ex=SX+FL+6;s+=`<path d="M${f1(ex)} ${150+MY}v24M${f1(ex-3)} ${150+MY}h6M${f1(ex-3)} ${174+MY}h6" style="stroke:var(--muted);stroke-width:1"/><text x="${f1(ex+5)}" y="${166+MY}" class="t-xs">8–12 nm</text>`;
      if(!ctl&&fo>=1)for(let j=0;j<3;j++){const ph=(t*35+j/3)%1;s+=`<rect x="${f1(SX+FL+60-50*ph)}" y="${f1(124+j*7+MY)}" width="12" height="3" rx="1.5" style="fill:var(--congo);opacity:${f1(.8*(1-ph))}"/>`}}
    /* glomerulus (one group, moved below the molecules in the narrow layout) */
    s+=`<g transform="translate(${L.gdx} ${L.gdy})">`;
    s+=`<text x="490" y="26" class="t-sm">פקעית</text><text x="716" y="46" class="t-xs t-end">לשתן</text>`;
    s+=`<path d="M672 83 L712 60" style="stroke:var(--memb);stroke-width:12;stroke-linecap:round"/><path d="M672 83 L712 60" style="stroke:var(--field);stroke-width:7;stroke-linecap:round"/>`;
    s+=`<circle cx="590" cy="140" r="100" style="fill:var(--field);stroke:var(--memb);stroke-width:3"/>`;
    s+=`<path d="M505 207 L552 172" style="stroke:var(--terra);stroke-width:16;stroke-linecap:round"/><path d="M505 207 L552 172" style="stroke:var(--terra-soft);stroke-width:12;stroke-linecap:round"/>`;
    s+=`<circle cx="586" cy="146" r="26" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    const lr=13*(1-.6*ramp(D,.4,1)),fl=6*(1-.8*P);
    LOOPS.forEach(L=>{s+=`<circle cx="${f1(L.x)}" cy="${f1(L.y)}" r="20" style="fill:var(--terra-soft);stroke:var(--terra);stroke-width:1.6"/><circle cx="${f1(L.x)}" cy="${f1(L.y)}" r="${f1(lr)}" style="fill:var(--terra);opacity:.22"/>`;
      const px=586+67*Math.cos(L.a),py=146+67*Math.sin(L.a),ta=L.a+Math.PI/2;
      for(let q=-1;q<=1;q++){const bx=586+(62)*Math.cos(L.a+q*.16),by=146+62*Math.sin(L.a+q*.16);s+=`<line x1="${f1(bx)}" y1="${f1(by)}" x2="${f1(bx+fl*Math.cos(L.a))}" y2="${f1(by+fl*Math.sin(L.a))}" style="stroke:var(--sea);stroke-width:2;stroke-linecap:round"/>`}
      s+=`<ellipse cx="${f1(px)}" cy="${f1(py)}" rx="7" ry="5" transform="rotate(${f1(ta*180/Math.PI)} ${f1(px)} ${f1(py)})" style="fill:var(--sea-soft);stroke:var(--sea);stroke-width:1.4"/>`});
    BL.forEach(b=>{if(D>b.thr){const rr=(1.5+4.5*clamp((D-b.thr)*5))*b.s;s+=`<circle cx="${f1(b.x)}" cy="${f1(b.y)}" r="${f1(rr)}" style="fill:var(--congo);opacity:.8"/>`}});
    for(let j=0;j<4;j++){const ph=(t*30+j/4)%1;s+=`<circle cx="${f1(lerp(520,580,ph))}" cy="${f1(lerp(200,156,ph))}" r="3" style="fill:var(--gold);opacity:${f1(act*(1-ph))}"/>`}
    const nL=Math.round(P*10);for(let j=0;j<nL;j++){const ph=(t*22+j/nL)%1,q=ph<.6?ph/.6:1,x=ph<.6?lerp(610,672,q):lerp(672,712,(ph-.6)/.4),y=ph<.6?lerp(128,83,q):lerp(83,60,(ph-.6)/.4);s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="2.6" style="fill:var(--warn)"/>`}
    s+=`<line x1="562" y1="206" x2="552" y2="252" style="stroke:var(--muted);stroke-width:1"/><text x="552" y="264" class="t-xs t-mid">לולאת נימים</text>`;
    s+=`<line x1="626" y1="202" x2="650" y2="252" style="stroke:var(--muted);stroke-width:1"/><text x="656" y="264" class="t-xs t-mid">פודוציט</text>`;
    s+=`</g>`;
    /* SAA trace */
    const SX0=L.SX0,SX1=L.SX1,ly=v=>L.SYB-L.SYH*clamp(Math.log10(Math.max(1,v))/3),sxi=i=>SX0+(SX1-SX0)*i/NS;
    s+=`<text x="${SX0}" y="${L.SHY}" class="t-sm" style="fill:var(--gold)">\u2067SAA בדם (mg/L, סולם לוגריתמי)\u2069</text>`;
    [1,10,100,1000].forEach(v=>s+=`<text x="${SX0-6}" y="${f1(ly(v)+3)}" class="t-xs t-end">${v}</text><line x1="${SX0}" x2="${SX1}" y1="${f1(ly(v))}" y2="${f1(ly(v))}" class="grid"/>`);
    s+=`<line x1="${SX0}" x2="${SX1}" y1="${f1(ly(10))}" y2="${f1(ly(10))}" style="stroke:var(--good);stroke-width:1.4;stroke-dasharray:4 3"/><text x="${SX1+4}" y="${f1(ly(10)+3)}" class="t-xs" style="fill:var(--good)">&lt;10</text>`;
    [0,5,10,15,20].forEach(y=>s+=`<text x="${f1(SX0+(SX1-SX0)*y/20)}" y="${L.SXT}" class="t-xs t-mid">${y}</text>`);
    s+=`<text x="${SX0}" y="${L.SAT}" class="t-xs">\u2067שנים מתחילת הדלקת (סכמטי)\u2069</text>`;
    let sd='';for(let i=0;i<=iN;i++)sd+=(i?'L':'M')+f1(sxi(i))+' '+f1(ly(saa(i,m)));if(iN>0)s+=`<path d="${sd}" style="fill:none;stroke:var(--gold);stroke-width:1.3"/>`;
    if(m==='low'){const xt=SX0+(SX1-SX0)*TC;s+=`<line x1="${f1(xt)}" x2="${f1(xt)}" y1="${L.SCL}" y2="${L.SCB}" style="stroke:var(--good);stroke-width:1.2;stroke-dasharray:3 3"/><text x="${f1(xt+4)}" y="${L.SCL+9}" class="t-xs" style="fill:var(--good)">השליטה מתחילה</text>`}
    s+=`<line x1="${f1(sxi(iN))}" x2="${f1(sxi(iN))}" y1="${L.SCL}" y2="${L.SCB}" style="stroke:var(--ink);opacity:.45"/>`;
    /* meters */
    const MX0=L.MX0,MW=L.MW,PY=L.PMY,GY=L.GMY;
    s+=`<text x="${MX0}" y="${PY}" class="t-sm">פרוטאינוריה</text>`;
    [[0,.1,'var(--good-soft)'],[.1,.7,'var(--warn-soft)'],[.7,1,'var(--bad-soft)']].forEach(([a,b,f])=>s+=`<rect x="${f1(MX0+MW*a)}" y="${PY+6}" width="${f1(MW*(b-a))}" height="14" style="fill:${f}"/>`);
    s+=`<rect x="${MX0}" y="${PY+9}" width="${f1(MW*clamp(P))}" height="8" rx="3" style="fill:var(--warn)"/><text x="${MX0+2}" y="${PY+32}" class="t-xs">אין</text><text x="${f1(MX0+MW*.12)}" y="${PY+32}" class="t-xs">פרוטאינוריה</text><text x="${f1(MX0+MW*.71)}" y="${PY+32}" class="t-xs">טווח נפרוטי</text>`;
    s+=`<text x="${MX0}" y="${GY}" class="t-sm">\u2067GFR (סינון כלייתי)\u2069</text><rect x="${MX0}" y="${GY+6}" width="${MW}" height="14" style="fill:var(--panel-2)"/><rect x="${MX0}" y="${GY+6}" width="${f1(MW*.15)}" height="14" style="fill:var(--bad-soft)"/>`;
    s+=`<rect x="${MX0}" y="${GY+9}" width="${f1(MW*G/100)}" height="8" rx="3" style="fill:var(--sea)"/><text x="${MX0+2}" y="${GY+32}" class="t-xs">אי-ספיקת כליות</text><text x="${MX0+MW}" y="${GY+32}" class="t-xs t-end">תקין</text>`;
    const stg=stage(t,m,D,P,G);
    s+=`<text x="${MX0}" y="${L.STY}" class="t-lbl" style="fill:${G<15?'var(--bad)':ctl?'var(--good)':'var(--ink)'}">${stg}</text>`;
    svg.innerHTML=s;
    setSt(p);
    $('#amRead').innerHTML=`<span>שנה <b>${f1(year)}</b></span><span>SAA בין התקפים <b>${ctl?'\u2066&lt;10':'\u2066~20–50'} mg/L\u2069</b></span><span>משקעים <b>${Math.round(D*100)}%</b> מהמרב</span><span>GFR <b>${Math.round(G)}%</b> מהתקין</span>`;
    let extra='';
    if(m==='low')extra=`<div class="kv"><div><dt>SAA הורד אל מתחת ל־10 mg/L</dt><dd>${ctl?'משנה 10 האספקה של SAA נקטעת. ':'במצב הזה השליטה מתחילה בשנה 10. '}Lachmann ועמיתיו עקבו אחר 374 אנשים עם עמילואידוזיס מסוג AA מכל סיבה: המשקעים נסוגו אצל 60% מאלה שה־SAA החציוני שלהם נשאר מתחת ל־10 mg/L, והסיכון למוות היה גבוה פי 17.7 בשמינית העליונה של ערכי SAA (≥155 mg/L) לעומת השמינית התחתונה (&lt;4 mg/L). EULAR 2016 קובע SAA &lt;10 mg/L כיעד בעמילואידוזיס. [[Lachmann2007,Ozen2016]] הפרוטאינוריה בדרך כלל מתייצבת ולא נעלמת: בקבוצה של Zemer היא חלפה אצל 5 והתייצבה אצל 68 מתוך 86 חולים שטופלו בקולכיצין. [[Zemer1986]]</dd></div></div>`;
    $('#amNote').innerHTML=noteHTML(AM_STEPS[p])+extra;
    drawOrg(D);
  }
  function drawOrg(D){
    /* narrow: body shifts left, and each organ's frequency drops onto its own
       line under the organ name so the deposit bar still fits beside it. */
    const N=vb(osv,'720 286','400 320');
    const BX=N?-36:0,TX=N?186:250,FX=N?186:336,FY=N?13:0,BAR=N?250:560,BW=N?138:140,LDX=N?180:244,RW=N?34:30;
    let s=`<text x="${TX}" y="${N?14:18}" class="t-sm">\u2067היכן שוקע עמילואיד AA\u2069</text><text x="${N?390:700}" y="${N?30:18}" class="t-xs t-end">\u2067משקע (סכמטי)\u2069</text>`;
    s+=`<g transform="translate(${BX} 0)"><g style="fill:var(--panel-2);stroke:var(--line);stroke-width:1.5"><circle cx="130" cy="40" r="24"/><rect x="120" y="62" width="20" height="12"/><rect x="78" y="72" width="104" height="160" rx="30"/><rect x="52" y="82" width="22" height="142" rx="11"/><rect x="186" y="82" width="22" height="142" rx="11"/><rect x="86" y="226" width="40" height="60" rx="14"/><rect x="134" y="226" width="40" height="60" rx="14"/></g>`;
    const SH={thyroid:[ [130,80,10,5] ],heart:[ [141,112,13,11] ],liver:[ [110,138,24,12] ],spleen:[ [160,138,9,12] ],adrenal:[ [110,157,6,4],[150,157,6,4] ],kidney:[ [110,174,8,13],[150,174,8,13] ],gut:[ [116,200,7,7],[130,198,7,7],[144,200,7,7],[122,214,7,7],[138,214,7,7] ],testes:[ [124,240,5,5],[136,240,5,5] ]};
    AM_ORGS.forEach((o,i)=>{const sh=SH[o.k];
      sh.forEach(([x,y,rx,ryy])=>s+=`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ryy}" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.1"/><ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ryy}" style="fill:var(--congo);opacity:${f1(.9*clamp(D*o.w))}"/>`)});
    s+=`</g>`;
    AM_ORGS.forEach((o,i)=>{const lv=clamp(D*o.w),ry=(N?52:40)+i*RW,sh=SH[o.k];
      const [x0,y0,rx0]=sh[sh.length-1];
      s+=`<line x1="${x0+rx0+1+BX}" y1="${y0}" x2="${LDX}" y2="${ry-4}" style="stroke:var(--muted);stroke-width:.8;opacity:.55"/>`;
      s+=`<text x="${TX}" y="${ry}" class="t-lbl">${o.n}</text><text x="${FX}" y="${ry+FY}" class="t-sm">${o.f}</text>`;
      s+=`<rect x="${BAR}" y="${ry-10}" width="${BW}" height="9" rx="4" style="fill:var(--panel-2)"/><rect x="${BAR}" y="${ry-10}" width="${f1(BW*lv)}" height="9" rx="4" style="fill:var(--congo)"/>`});
    osv.innerHTML=s;
  }
  const stop=playWire(rg,$('#amPlay'),draw,24000,'הפעלה חוזרת','amyloid');
  const setSt=stepWire($('#amSteps'),AM_STEPS,rg,draw,stop);
  $$('[data-am]').forEach(b=>b.onclick=()=>{mode=b.dataset.am;$$('[data-am]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)});
  draw(+rg.value);

  /* ---------- Congo red microscope ---------- */
  const ms=$('#amMic'),mr=$('#amMT');let samp='kidney';
  const MCX=190,MCY=180,MR=156;
  const rk=rng(5),KN=[],KD=[],KT=[];
  for(let i=0;i<9;i++){const a=i/9*Math.PI*2+.3;KT.push([MCX+128*Math.cos(a),MCY+128*Math.sin(a),24+6*rk()])}
  for(let i=0;i<70;i++){const a=rk()*Math.PI*2,rr=MR*Math.sqrt(rk());KN.push([MCX+rr*Math.cos(a),MCY+rr*Math.sin(a),rk()*180])}
  for(let i=0;i<34;i++){const a=rk()*Math.PI*2,rr=10+70*Math.sqrt(rk());KD.push([MCX-4+rr*Math.cos(a),MCY-4+rr*Math.sin(a),5+7*rk()])}
  const rf=rng(11),FC=[],FD=[];
  for(let gy=0;gy<6;gy++)for(let gx=0;gx<6;gx++)FC.push([MCX-150+gx*60+(gy%2)*30+rf()*10,MCY-150+gy*58+rf()*10,27+rf()*5]);
  [[150,120],[245,215],[120,250]].forEach(([x,y])=>FD.push(['v',x,y]));
  for(let i=0;i<8;i++){const c=FC[Math.floor(rf()*FC.length)];FD.push(['a',c[0],c[1],c[2],rf()*6])}
  function drawM(t){
    /* narrow: the section keeps its size at the top and the polarizer diagram,
       its readouts and its key move underneath it. */
    const N=vb(ms,'720 360','400 620');
    const PX=N?34:394,PY=N?400:110;
    const ang=90*t,k=Math.pow(Math.sin(ang*Math.PI/180),2),b=1-k;let s='';
    const DX=N?10:0;/* re-centre the precomputed section in the 400-wide stage */
    s+=`<defs><clipPath id="amClip"><circle cx="${MCX+DX}" cy="${MCY}" r="${MR}"/></clipPath></defs><g clip-path="url(#amClip)"><g transform="translate(${DX} 0)">`;
    s+=`<rect x="${MCX-MR}" y="${MCY-MR}" width="${2*MR}" height="${2*MR}" style="fill:var(--am-light)"/>`;
    let tis='',dep='';
    if(samp==='kidney'){
      tis+=`<rect x="${MCX-MR}" y="${MCY-MR}" width="${2*MR}" height="${2*MR}" style="fill:var(--am-tissue);opacity:.55"/>`;
      KT.forEach(([x,y,r])=>tis+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="fill:var(--am-tissue);stroke:var(--am-septa);stroke-width:5"/><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r*.35)}" style="fill:var(--am-light)"/>`);
      tis+=`<circle cx="${MCX}" cy="${MCY}" r="96" style="fill:var(--am-light);stroke:var(--am-septa);stroke-width:3"/><circle cx="${MCX-4}" cy="${MCY-4}" r="82" style="fill:var(--am-tissue)"/>`;
      for(let i=0;i<7;i++){const a=i/7*Math.PI*2;tis+=`<circle cx="${f1(MCX-4+48*Math.cos(a))}" cy="${f1(MCY-4+48*Math.sin(a))}" r="20" style="fill:var(--am-light);stroke:var(--am-septa);stroke-width:2"/>`}
      KN.forEach(([x,y,a])=>tis+=`<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="4.5" ry="3" transform="rotate(${f1(a)} ${f1(x)} ${f1(y)})" style="fill:var(--am-hema)"/>`);
      KD.forEach(([x,y,r],i)=>dep+=`<path d="M${f1(x-r)} ${f1(y)} q${f1(r*.4)} ${f1(-r)} ${f1(r)} ${f1(-r*.7)} t${f1(r)} ${f1(r*.5)} q${f1(-r*.2)} ${f1(r)} ${f1(-r)} ${f1(r*.9)} t${f1(-r)} ${f1(-r*.7)}z"/>`);
    }else{
      tis+=`<rect x="${MCX-MR}" y="${MCY-MR}" width="${2*MR}" height="${2*MR}" style="fill:var(--am-septa);opacity:.5"/>`;
      FC.forEach(([x,y,r])=>tis+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="fill:var(--am-light);stroke:var(--am-septa);stroke-width:2.5"/>`);
      for(let i=0;i<24;i++){const c=FC[(i*7)%FC.length];tis+=`<ellipse cx="${f1(c[0]+c[2]*.95)}" cy="${f1(c[1]+3)}" rx="3.5" ry="2" style="fill:var(--am-hema)"/>`}
      FD.forEach(d=>{if(d[0]==='v')dep+=`<circle cx="${f1(d[1])}" cy="${f1(d[2])}" r="11" style="fill:none;stroke-width:7"/>`;else{const [_,x,y,r,a0]=d;dep+=`<path d="M${f1(x+r*Math.cos(a0))} ${f1(y+r*Math.sin(a0))} A${f1(r)} ${f1(r)} 0 0 1 ${f1(x+r*Math.cos(a0+1.1))} ${f1(y+r*Math.sin(a0+1.1))}" style="fill:none;stroke-width:6;stroke-linecap:round"/>`}});
    }
    s+=`<g style="opacity:${f1(.15+.85*b)}">${tis}</g>`;
    s+=`<rect x="${MCX-MR}" y="${MCY-MR}" width="${2*MR}" height="${2*MR}" style="fill:var(--am-black);opacity:${(k*.96).toFixed(2)}"/>`;
    s+=`<g style="fill:var(--am-salmon);stroke:var(--am-salmon);opacity:${f1(b)}">${dep}</g>`;
    s+=`<g style="fill:var(--am-green);stroke:var(--am-green);opacity:${f1(k)}">${dep}</g>`;
    s+=`</g></g><circle cx="${MCX+DX}" cy="${MCY}" r="${MR+3}" style="fill:none;stroke:var(--muted);stroke-width:6"/>`;
    s+=`<text x="${MCX+DX}" y="352" class="t-xs t-mid">${samp==='kidney'?'ביופסיית כליה · קונגו רד':'שאיבת שומן בטני · קונגו רד'}</text>`;
    /* polarizer schematic */
    s+=`<defs>${marker('amL','var(--gold)')}</defs><line x1="${PX}" y1="${PY}" x2="${PX+314}" y2="${PY}" style="stroke:var(--gold);stroke-width:2;opacity:.6" marker-end="url(#amL)"/><circle cx="${PX+10}" cy="${PY}" r="9" style="fill:var(--gold)"/>`;
    const disc=(cx,rot,lbl)=>{let d=`<circle cx="${cx}" cy="${PY}" r="34" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.5"/><g transform="rotate(${f1(rot)} ${cx} ${PY})">`;for(let yy=-24;yy<=24;yy+=8){const hw=Math.sqrt(34*34-yy*yy)-3;d+=`<line x1="${f1(cx-hw)}" x2="${f1(cx+hw)}" y1="${PY+yy}" y2="${PY+yy}" style="stroke:var(--ink);stroke-width:1.4;opacity:.7"/>`}return d+`</g><text x="${cx}" y="${PY+56}" class="t-xs t-mid">${lbl}</text>`};
    s+=disc(PX+76,0,'מקטב');s+=`<rect x="${PX+159}" y="${PY-30}" width="14" height="60" rx="2" style="fill:var(--am-salmon);opacity:.8"/><text x="${PX+166}" y="${PY+56}" class="t-xs t-mid">חתך</text>`;s+=disc(PX+252,ang,'אנליזטור');
    s+=`<text x="${PX}" y="${PY+96}" class="t-big">\u2067הזווית בין המקטבים: ${Math.round(ang)}°\u2069</text>`;
    s+=`<text x="${PX}" y="${PY+120}" class="t-sm">\u2067רקע: ${k<.12?'בהיר':k<.85?'מתעמעם':'כהה (האור נחסם)'}\u2069</text>`;
    s+=`<text x="${PX}" y="${PY+140}" class="t-sm">\u2067עמילואיד: ${k<.12?'ורוד-סלמון':k<.85?'מוריק':'שבירה כפולה ירוקת-תפוח'}\u2069</text>`;
    s+=`<rect x="${PX}" y="${PY+162}" width="26" height="18" rx="3" style="fill:var(--am-salmon)"/><text x="${PX+34}" y="${PY+175}" class="t-xs">\u2067שדה בהיר: משקעים ורודי-סלמון\u2069</text>`;
    s+=`<rect x="${PX}" y="${PY+190}" width="26" height="18" rx="3" style="fill:var(--am-black)"/><rect x="${PX+7}" y="${PY+194}" width="12" height="10" rx="2" style="fill:var(--am-green)"/><text x="${PX+34}" y="${PY+203}" class="t-xs">\u2067מקטבים מוצלבים: ירוק תפוח על שחור\u2069</text>`;
    ms.innerHTML=s;
    $('#amMicNote').innerHTML=`<div class="kicker">${k<.12?'שדה בהיר':k<.85?'המקטבים מוצלבים בהדרגה':'מקטבים מוצלבים'}</div><h4>${k<.85?'קונגו רד צובע עמילואיד בוורוד-סלמון':'שבירה כפולה בירוק תפוח'}</h4><p>עמילואיד מזוהה בצביעת קונגו רד (Congo red), שנותנת שבירה כפולה (birefringence) בצבע ירוק תפוח באור מקוטב. סיבים מסודרים מטים את האור המקוטב; רקמה רגילה לא, ולכן היא מחשיכה כשהמקטבים מוצלבים. אימונוהיסטוכימיה עם נוגדן נגד SAA מאשרת שהעמילואיד הוא מסוג AA, ומיקרוסקופ אלקטרוני מראה סיבים לא מסועפים ברוחב 8–12 nm. [[Mirioglu2024]]</p><dl class="kv">${samp==='kidney'?`<div><dt>ביופסיית כליה</dt><dd>הבדיקה המכרעת המקובלת, והיא נדרשת כדי לאשר עמילואידוזיס בחולה FMF עם פרוטאינוריה. גם ביופסיה רקטלית משמשת ב־FMF כבר זמן רב. [[Mirioglu2024,Ozen2016,Melikoglu2000]]</dd></div>`:`<div><dt>שאיבת שומן בטני</dt><dd>אפשרות פולשנית פחות: לשאיבת שומן ולביופסיה של בלוטת רוק דווחו רגישויות של 77–89%. במחקר אחד (120 חולים, 38 מהם עם AA) הרגישות הייתה 80% בקריאה שגרתית ו־93% כששלושה משטחים נבדקו ביסודיות, עם סגוליות של 100% בקבוצת הביקורת. מיפוי SAP (SAP scintigraphy) רגיש עד 90%, אבל אינו זמין באופן נרחב. הנתונים האלה מגיעים מסדרות מעורבות של עמילואידוזיס; סקירה אחת שעוסקת ב־FMF בלבד מתארת את התפוקה של שאיבת השומן ב־FMF כלא גבוהה, ומייחסת לביופסיית כליה כ־88% ולביופסיה רקטלית כ־75%. [[Mirioglu2024,vanGameren2006,Sari2014]]</dd></div>`}</dl><div class="hook"><b>לבחינה</b>קונגו רד ← <b>ורוד-סלמון</b> בשדה בהיר ← <b>שבירה כפולה ירוקת-תפוח</b> במקטבים מוצלבים.</div>`;
  }
  const stopM=playWire(mr,$('#amMPlay'),drawM,6000,'הפעלה חוזרת','amyloid');
  $$('[data-amx]').forEach(b=>b.onclick=()=>{samp=b.dataset.amx;$$('[data-amx]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawM(+mr.value)});
  drawM(+mr.value);

  /* ---------- risk factors ---------- */
  const rs=$('#amRisk');let ci=true,rp=1,stopRk=null;
  let LX0=300,LX1=690;const lx=v=>LX0+(LX1-LX0)*Math.log(v)/Math.log(20);
  function drawR(p){rp=p;
    /* narrow: each factor's name and source sit on their own lines above a
       full-width bar, so long names never have to be clipped. */
    const N=vb(rs,'720 346','400 536');
    LX0=N?16:300;LX1=N?384:690;
    const TXX=N?16:10;
    let s=`<text x="${TXX}" y="18" class="t-sm">\u2067גורמי סיכון לעמילואידוזיס ב־FMF\u2069</text>`;
    s+=N?`<text x="${TXX}" y="32" class="t-xs" style="fill:var(--muted)">מחקרים נפרדים · לא ניתנים להשוואה זה לזה</text>`
        :`<text x="${LX1}" y="18" class="t-xs t-end" style="fill:var(--muted)">מחקרים נפרדים · לא ניתנים להשוואה זה לזה</text>`;
    if(!N)[1,2,5,10,20].forEach(v=>s+=`<line x1="${f1(lx(v))}" x2="${f1(lx(v))}" y1="30" y2="310" class="${v===1?'axis':'grid'}"/>`);
    [1,2,5,10,20].forEach(v=>s+=`<text x="${f1(lx(v))}" y="${N?506:326}" class="t-xs t-mid">${v}</text>`);
    s+=`<text x="${LX1}" y="${N?522:342}" class="t-xs t-end">\u2067יחס סיכויים, סולם לוגריתמי (1 = אין הבדל)\u2069</text>`;
    AM_RISK.forEach((R,i)=>{const y=(N?52:52)+i*(N?64:40),q=ease(clamp(p*1.7-i*.11)),xe=LX0+(lx(R.or)-LX0)*q,by=N?y+20:y-10;
      s+=`<text x="${TXX}" y="${y}" class="t-lbl">${R.n}</text><text x="${TXX}" y="${y+14}" class="t-xs">${R.s}</text>`;
      if(N)[1,2,5,10,20].forEach(v=>s+=`<line x1="${f1(lx(v))}" x2="${f1(lx(v))}" y1="${by-4}" y2="${by+22}" class="${v===1?'axis':'grid'}"/>`);
      s+=`<rect x="${LX0}" y="${by}" width="${f1(Math.max(0,xe-LX0))}" height="18" rx="3" style="fill:var(--terra);opacity:.85"/>`;
      if(q>.6)s+=`<text x="${f1(xe-5)}" y="${by+13}" class="t-xs t-end" style="fill:var(--panel);font-weight:700;opacity:${f1(ramp(q,.6,1))}">${R.ap?'≈':''}${R.or}</text>`;
      if(ci&&R.lo)s+=`<path d="M${f1(lx(R.lo))} ${by+23}H${f1(lx(R.hi))}M${f1(lx(R.lo))} ${by+19}v8M${f1(lx(R.hi))} ${by+19}v8" style="stroke:var(--ink);stroke-width:1.5;opacity:${f1(q)}"/>`});
    rs.innerHTML=s}
  function runR(){if(stopRk)stopRk();stopRk=animate(1600,drawR,()=>{stopRk=null})}
  $('#amRPlay').onclick=runR;
  $('#amCI').onclick=()=>{ci=!ci;$('#amCI').setAttribute('aria-pressed',ci);drawR(rp)};
  drawR(0);
  if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){io.disconnect();runR()}},{threshold:.35});io.observe(rs)}else drawR(1);
  onHide.amyloid=(prev=>()=>{prev&&prev();if(stopRk){stopRk();stopRk=null;drawR(1)}})(onHide.amyloid);

  /* ---------- prevalence over time ---------- */
  const ps=$('#amPrev'),pr=$('#amPT');
  /* the last three numbers of each row are the narrow label x, y and anchor */
  const PTS=[[1967,26.6,'&#x2067;26.6% · Sohar 1967, ישראל&#x2069;',140,62,'',112,80,''],[2005,12.9,'&#x2067;12.9% · טורקיה 2005&#x2069;',462,166,'t-end',250,196,'t-end'],[2007,11.4,'11.4% · MetaFMF 2007',480,200,'t-end',262,234,'t-end'],[2014,8.6,'&#x2067;8.6% · טורקיה 2014&#x2069;',548,224,'t-mid',307,286,'t-mid'],[2025,10.2,'10.2% · AIDA 2025',644,178,'t-mid',384,196,'t-end']];
  let PX0=70,PX1=690,PY0=270,PH=230;
  const px=y=>PX0+(PX1-PX0)*(y-1960)/70,py=v=>PY0-PH*v/30;
  function drawP(t){
    /* narrow: full-width plot with fewer year ticks, the caption wrapped onto
       three lines, and the Zemer panel moved below the chart. */
    const N=vb(ps,'720 320','400 528');
    PX0=N?46:70;PX1=N?384:690;PY0=N?330:270;PH=N?270:230;
    const ZX=N?16:410,ZY=N?404:34,ZW=N?368:290,ZTX=ZX+10;
    const Y=1960+70*t;let s=`<text x="${PX0}" y="${N?22:24}" class="t-sm">\u2067עמילואידוזיס בקבוצות FMF (% מהחולים)\u2069</text>`;
    s+=N?`<text x="${PX0}" y="368" class="t-xs" style="fill:var(--muted)">קבוצות, ארצות, גילים והגדרות</text><text x="${PX0}" y="380" class="t-xs" style="fill:var(--muted)">שונים: לא אוכלוסייה אחת</text><text x="${PX0}" y="392" class="t-xs" style="fill:var(--muted)">\u2067שנעקבה לאורך זמן.\u2069</text>`
        :`<text x="70" y="308" class="t-xs" style="fill:var(--muted)">\u2067קבוצות, ארצות, גילים והגדרות שונים: לא אוכלוסייה אחת שנעקבה לאורך זמן.\u2069</text>`;
    [0,10,20,30].forEach(v=>s+=`<line x1="${PX0}" x2="${PX1}" y1="${f1(py(v))}" y2="${f1(py(v))}" class="grid"/><text x="${PX0-8}" y="${f1(py(v)+3)}" class="t-xs t-end">${v}%</text>`);
    for(let y=1960;y<=2030;y+=(N?20:10))s+=`<text x="${f1(px(y))}" y="${PY0+18}" class="t-xs t-mid">${y}</text>`;
    s+=`<line x1="${f1(px(1972))}" x2="${f1(px(1972))}" y1="${N?60:40}" y2="${PY0}" style="stroke:var(--crocus);stroke-width:1.5;stroke-dasharray:4 4;opacity:${f1(ramp(Y,1972,1974))}"/><text x="${f1(px(1972)+4)}" y="${PY0-8}" class="t-xs" style="fill:var(--crocus);opacity:${f1(ramp(Y,1972,1974))}">\u2067קולכיצין (1972)\u2069</text>`;
    let d='';PTS.forEach((P,i)=>{if(i===0){d='M'+f1(px(P[0]))+' '+f1(py(P[1]));return}const Q=PTS[i-1];if(Y<=Q[0])return;const u=clamp((Y-Q[0])/(P[0]-Q[0]));d+='L'+f1(lerp(px(Q[0]),px(P[0]),u))+' '+f1(lerp(py(Q[1]),py(P[1]),u))});
    if(Y>1967)s+=`<path d="${d}" style="fill:none;stroke:var(--terra);stroke-width:2;stroke-dasharray:6 4"/>`;
    PTS.forEach(([yr,v,l,lxx,lyy,an,nx,ny,nan])=>{const g=ramp(Y,yr,yr+3);if(g<=0)return;s+=`<circle cx="${f1(px(yr))}" cy="${f1(py(v))}" r="${f1(6*g)}" style="fill:var(--terra);stroke:var(--panel);stroke-width:2"/><text x="${N?nx:lxx}" y="${N?ny:lyy}" class="t-sm ${N?nan:an}" style="opacity:${f1(g)}">${l}</text>`});
    const gc=ramp(Y,2022,2025);if(gc>0)s+=`<rect x="${f1(px(2022)-6*gc)}" y="${f1(py(.3)-6*gc)}" width="${f1(12*gc)}" height="${f1(12*gc)}" style="fill:var(--sea);stroke:var(--panel);stroke-width:2"/><text x="${f1(px(2022)-10)}" y="${f1(py(.3)-(N?24:8))}" class="t-sm t-end" style="fill:var(--sea);opacity:${f1(gc)}">&#x2067;0.3% · ילדים, 2022&#x2069;</text>`;
    const gz=ramp(Y,1986,1992);
    if(gz>0){s+=`<g style="opacity:${f1(ramp(Y,1986,1988))}"><rect x="${ZX}" y="${ZY}" width="${ZW}" height="${N?110:114}" rx="8" style="fill:var(--panel-2)"/><text x="${ZTX}" y="${ZY+18}" class="t-xs">\u2067Zemer 1986 · פרוטאינוריה מצטברת\u2069</text>`;
      s+=`<text x="${ZTX}" y="${ZY+40}" class="t-xs">\u2067קולכיצין באופן קבוע (11 שנים)\u2069</text><rect x="${ZTX}" y="${ZY+46}" width="${f1(1.7*5.2*gz)}" height="12" rx="3" style="fill:var(--crocus)"/><text x="${f1(ZTX+6+1.7*5.2*gz)}" y="${ZY+56}" class="t-xs" style="fill:var(--crocus)">1.7%</text>`;
      s+=`<text x="${ZTX}" y="${ZY+78}" class="t-xs">\u2067לא נוטלים באופן קבוע (9 שנים)\u2069</text><rect x="${ZTX}" y="${ZY+84}" width="${f1(48.9*5.2*gz)}" height="12" rx="3" style="fill:var(--bad)"/>${gz>.5?`<text x="${f1(ZTX-4+48.9*5.2*gz)}" y="${ZY+94}" class="t-xs t-end" style="fill:var(--panel);font-weight:700">48.9%</text>`:''}</g>`}
    s+=`<line x1="${f1(px(Y))}" x2="${f1(px(Y))}" y1="${N?56:34}" y2="${PY0+2}" style="stroke:var(--ink);opacity:.3"/>`;
    ps.innerHTML=s}
  playWire(pr,$('#amPPlay'),drawP,12000,'הפעלה חוזרת','amyloid');drawP(+pr.value);
  /* only the last playWire with this id registers for the narrow/wide redraw,
     so chain the other three drawings onto it. */
  const prevRedraw=redraws.amyloid;
  redraws.amyloid=()=>{prevRedraw&&prevRedraw();stop();stopM();draw(+rg.value);drawM(+mr.value);drawR(rp)};
  $('#amPCap').innerHTML=`קבוצות, ארצות, גילים והגדרות שונים: הקו המקווקו מחבר בין מחקרים נפרדים, ואינו עוקב אחר אוכלוסייה אחת. Sohar 1967 (470 חולים), קבוצת המחקר הטורקית ל־FMF 2005 (2,838), MetaFMF 2007 (2,482), מחקר טורקי ב־15 מרכזים 2014 (2,246), מרשם AIDA 2025; ילדים: 11 מתוך 3,454 בקבוצת הילדים הגדולה ביותר. לפני עידן הקולכיצין, סקירה אחת מעריכה את שיעור העמילואידוזיס ב־60–75% מהחולים מעל גיל 40, ו־EULAR 2016 מדווח שהקולכיצין הוריד את הסיכון בטורקיה מ־60% לפחות מ־13%. [[Sohar1967,GulBenChetrit2025,TurkishFMF2005,Touitou2007,Kasifoglu2014,Vitale2025,Ozturk2022,Zemer1986,Sari2014,Ozen2016]]`;
};
