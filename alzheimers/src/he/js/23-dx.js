/* =============== 2.3 diagnosis and biomarkers =============== */
const DX_STEPS=[
 {k:'שלב 1 · דאגה',t:'מישהו מבחין בשינוי',ti:'דאגה',sub:'מישהו מבחין',
  txt:`האבחון מתחיל באנמנזה של ירידה מהרמה הרגילה של האדם, שמאושרת על ידי מישהו שמכיר אותו היטב. דמנציה מכל סיבה פירושה תסמינים קוגניטיביים או התנהגותיים שמפריעים לעבודה או לפעילות הרגילה, מהווים ירידה לעומת המצב הקודם, אינם מוסברים בדליריום או בהפרעה פסיכיאטרית משמעותית, ומערבים לפחות שני תחומים. [[Arvanitakis2019,McKhann2011]]`,
  pt:`בדרך כלל זה מתחיל כשהאדם, או מישהו קרוב אליו, מבחין שהדברים אינם כפי שהיו.`,
  hook:`דמנציה מחייבת גם ירידה בשני תחומים לפחות וגם הפרעה לתפקוד היומיומי. אנמנזה ממקור מידע קרוב היא חלק מהקריטריונים.`},
 {k:'שלב 2 · סינון',t:'מבחן קוגניטיבי קצר',ti:'סינון',sub:'MoCA, MMSE',
  txt:`מבחנים קצרים כמו MMSE, MoCA ו־Mini-Cog מדרגים את החומרה ומובילים להערכה נוספת. הם אינם קובעים את הסיבה. סקירת Cochrane הסיקה שאין להשתמש ב־MMSE "לבדו כדי לאשר או לשלול מחלה". [[Creavin2016,Crum1993,Tombaugh1992]]`,
  pt:`מבחן קצר בעט ונייר מראה אם החשיבה נפגעה ובאיזו מידה. הוא לא יכול לומר למה.`,
  hook:`מבחני סינון מודדים. הם אינם מאבחנים את הסיבה.`},
 {k:'שלב 3 · אנמנזה ובדיקה',t:'שיחה, בדיקה וסקירת התרופות',ti:'אנמנזה, בדיקה',sub:'מקור מידע, תרופות',
  txt:`בדיקת המצב המנטלי מכסה זיכרון, שפה, קשב, תפקוד חזותי־מרחבי ותפקודים ניהוליים, וכן מצב רוח; הבדיקה הגופנית מחפשת סימנים מוקדיים. שני דברים נבדקים מוקדם. דליריום, בכלים כמו CAM. ותרופות: השימוש המצטבר הכבד ביותר בתרופות אנטיכולינרגיות חזקות היה קשור לדמנציה (יחס סיכונים 1.54). [[Arvanitakis2019,Inouye1990,Gray2015]]`,
  pt:`הקלינאי משוחח עם האדם ועם המשפחה, בודק אותו ועובר על כל תרופה.`},
 {k:'שלב 4 · בדיקות דם',t:'חיפוש סיבות הפיכות',ti:'בדיקות דם',sub:'⁧B12, בלוטת התריס⁩',
  txt:`הנחיית העבודה (practice parameter) של ה־AAN מ־2001, הנחיה ישנה יותר, המליצה על סינון לדיכאון, לחסר B12 ולתת־פעילות של בלוטת התריס, ועל בדיקה לעגבת רק כשיש חשד לעגבת עצבית (נוירוסיפיליס). במטא־אנליזה של 5,620 אנשים עם דמנציה, ל־9% הייתה סיבה שעשויה להיות הפיכה, אבל רק אצל 0.6% המצב אכן חלף. [[Knopman2001,Clarfield2003]]`,
  pt:`בדיקות דם מחפשות בעיות שאפשר לטפל בהן ושיכולות להשפיע על החשיבה. יש ערך במציאתן, אף שרק לעיתים רחוקות הן מסבירות הכול.`,
  hook:`סינון שגרתי לפי ה־AAN: B12, בלוטת התריס, דיכאון. סרולוגיה לעגבת רק אם יש חשד.`},
 {k:'שלב 5 · הדמיית מוח',t:'CT או MRI',ti:'הדמיית מוח',sub:'⁧CT או MRI⁩',
  txt:`CT או MRI ללא חומר ניגוד נמצאו מתאימים בהערכה הראשונית. ההדמיה מחפשת אוטמים, גידול, ניוון מוקדי ואת החדרים המורחבים של הידרוצפלוס בלחץ תקין. ניוון רקתי מדיאלי תומך באלצהיימר בשלב ה־MCI, אבל אינו ייחודי לו. [[Knopman2001,Arvanitakis2019,Frisoni2010,Nakajima2021]]`,
  pt:`סריקת מוח מחפשת שבץ, גידולים, הצטברות נוזל והצטמקות של אזורי הזיכרון.`},
 {k:'שלב 6 · סמנים ביולוגיים',t:'האם יש פתולוגיה של אלצהיימר?',ti:'סמנים ביולוגיים',sub:'⁧PET, CSF או דם⁩',
  txt:`סמנים ביולוגיים בודקים את הפתולוגיה עצמה. קריאה חזותית של PET עמילואיד זיהתה רבדים בצפיפות בינונית עד גבוהה ברגישות של 92% ובסגוליות של 100% בהשוואה לנתיחה. בבדיקת CSF עדיף היחס Aβ42/40 על Aβ42 לבדו. במאי 2025 אישר ה־FDA את בדיקת הדם הראשונה (יחס p-tau217/Aβ42 בפלזמה) לטיפול מומחה, וברפואה הראשונית והשניונית בשוודיה בדיקת p-tau217 הייתה מדויקת בכ־90%. סקירה מ־2019 המליצה לשקול בדיקת CSF או בדיקה גנטית במקרים לא טיפוסיים: הופעה לפני גיל 65, הופעה מהירה או הסתמנות שאינה של זיכרון. [[Clark2012,Hansson2019,FDA2025,Palmqvist2024,Arvanitakis2019]]`,
  pt:`סריקה, בדיקת נוזל שדרה, או כיום גם בדיקת דם, יכולות להראות אם חלבוני האלצהיימר נמצאים במוח.`,
  hook:`קריטריוני 2024: סמן ביולוגי חריג אחד מסוג Core 1 (בדיקת PET עמילואיד, בדיקת CSF מאושרת, או בדיקת פלזמה מדויקת כמו p-tau217) מבסס ביולוגיה של אלצהיימר. [[Jack2024]]`},
 {k:'שלב 7 · אבחנה',t:'סיבה ושלב',ti:'אבחנה',sub:'סיבה ושלב',
  txt:`תוצאות הסמנים הביולוגיים משנות את הטיפול: במחקר IDEAS, PET עמילואיד שינה את הניהול הקליני אצל 60.2% מהאנשים עם MCI ואצל 63.5% מהאנשים עם דמנציה שסיבתה לא ברורה. התכנית של 2024 משלבת שלב קליני (0 עד 6) עם שלב ביולוגי (A עד D), למשל "3A". נוגדנים נגד עמילואיד מחייבים פתולוגיה מאושרת של עמילואיד; ראו <a href="#antibody" data-go="antibody">נוגדנים נגד עמילואיד לאורך זמן</a>. [[Rabinovici2019,Jack2024,FDA2024Donanemab]]`,
  pt:`התוצאה היא סיבה מוגדרת ושלב. החלטות על תכנון ועל טיפול נבנות על שניהם.`}
];
DX_STEPS.forEach((s,i)=>{s.from=i/7;s.at=i/7+.05});
const DX_GSTEPS=[ {from:0,k:'שלב 1',t:'1,000 אנשים נבדקים'},{from:.32,k:'שלב 2',t:'למי באמת יש הפתולוגיה'},{from:.6,k:'שלב 3',t:'מה הבדיקה אומרת'} ];
const DX_CRIT=[
 {n:'NIA-AA 2011',h:'קריטריונים קליניים',ev:'',d:`הקריטריונים הקליניים הם אבן היסוד. דמנציה מחייבת ירידה בשני תחומים לפחות שמפריעה לחיי היומיום; דמנציה סבירה (probable) של אלצהיימר מוסיפה הופעה הדרגתית וחמקמקה והחמרה ברורה. בדיקות סמנים ביולוגיים לא הומלצו לאבחון שגרתי. [[McKhann2011]]`,
  v:[`אין אבחנה: הקריטריונים האלה לדמנציה חלים רק כשכבר יש דמנציה, ולאדם הזה אין תסמינים. הנחיות מחקר נפרדות מ־2011 תיארו שלבים טרום־קליניים. [[Jack2024]]`,`אין אבחנה: הקריטריונים האלה לדמנציה חלים רק כשכבר יש דמנציה, ולאדם הזה אין תסמינים. הנחיות מחקר נפרדות מ־2011 תיארו שלבים טרום־קליניים. [[Jack2024]]`,`לא דמנציה של אלצהיימר: חיי היומיום אינם משובשים, ולכן הקריטריונים לדמנציה אינם מתקיימים.`,`דמנציה סבירה של אלצהיימר, אם ההופעה הייתה הדרגתית, ההחמרה ברורה ואין הסבר אחר. לא נדרש סמן ביולוגי.`]},
 {n:'NIA-AA 2018',h:'מסגרת המחקר ATN',ev:'',d:`הגדרה ביולוגית למחקר בלבד. A מייצג עמילואיד (בדיקת CSF או PET), ו־T מייצג טאו (p-tau ב־CSF או PET טאו), ו־(N) מייצג ניוון עצבי, בסוגריים משום שאינו ספציפי. המחברים כינו שימוש קליני "מוקדם מדי ולא הולם". [[Jack2018]]`,
  v:[`A+T−: "שינוי פתולוגי של אלצהיימר", על רצף האלצהיימר, אבל עדיין לא "מחלת אלצהיימר".`,`A+T+: "מחלת אלצהיימר", גם ללא תסמינים.`,`לפחות "שינוי פתולוגי של אלצהיימר"; "מחלת אלצהיימר" רק אם גם T חיובי.`,`לא ניתן לסווג: בלי סמנים ביולוגיים, אין למסגרת תווית לתת.`]},
 {n:'איגוד האלצהיימר 2024',h:'קריטריונים מעודכנים',ev:'<span class="ev early">שנוי במחלוקת</span>',d:`אלצהיימר הוא תהליך ביולוגי כבר מהפתולוגיה הראשונה שלו. סמן ביולוגי חריג אחד מסוג Core 1 מבסס אותו. השלבים מצמידים מספר קליני (0 עד 6) לאות ביולוגית (A עד D). קבוצת העבודה עדיין ממליצה שלא לבדוק אנשים ללא תסמינים מחוץ למחקר. [[Jack2024]]`,
  v:[`מחלת אלצהיימר, שלב 1A: ללא תסמינים, עמילואיד בלבד.`,`מחלת אלצהיימר, שלב 1B או מתקדם יותר, לפי מידת התפשטות הטאו ב־PET.`,`מחלת אלצהיימר, שלב 3, והאות נקבעת לפי PET טאו (3A אם יש עמילואיד בלבד).`,`הביולוגיה של אלצהיימר אינה מבוססת עד שנבדק סמן ביולוגי מסוג Core 1.`]},
 {n:'IWG 2024',h:'קבוצת העבודה הבינלאומית',ev:'<span class="ev early">שנוי במחלוקת</span>',d:`דוחה הגדרה ביולוגית בלבד לשימוש קליני. רוב האנשים עם סמנים ביולוגיים חיוביים וללא תסמינים לא יפתחו תסמינים בטווח הזמן הקרוב, והאמירה להם שיש להם אלצהיימר היא ההשלכה הבעייתית ביותר. שתי הקבוצות מקבלות את הסמנים הביולוגיים; הן חלוקות על התווית. [[Dubois2024,Jack2024]]`,
  v:[`"בסיכון לאלצהיימר", לא מחלת אלצהיימר.`,`"בסיכון", או "אלצהיימר טרום־תסמיני" רק בדפוסים מסוימים של סמנים ביולוגיים שמעידים שהתסמינים קרובים.`,`מתאים לתפיסה הקלינית־ביולוגית: תסמינים יחד עם סמנים ביולוגיים של אלצהיימר; ה־IWG קובעת אילו דפוסי סמנים נחשבים.`,`לא מאושר: המבנה של ה־IWG מחייב עדות מסמנים ביולוגיים בנוסף לתמונה הקלינית.`]}
];
function dxGlyph(k,x,y,lp,on){
  const c=on?'var(--rose)':'var(--muted)',S=`style="fill:none;stroke:${c};stroke-width:2;stroke-linecap:round;stroke-linejoin:round"`;
  let g=`<g transform="translate(${f1(x)} ${f1(y)})">`;
  switch(k){
    case 0:g+=`<path d="M-12 -11h24v16h-11l-6 6v-6h-7z" ${S}/><text x="0" y="2" class="t-sm t-mid" style="fill:${c};font-weight:700">?</text>`;break;
    case 1:g+=`<path d="M-10 -12h20v25h-20zM-4 -14h8v4h-8z" ${S}/>`;for(let i=0;i<3;i++)if(lp>.2+i*.22)g+=`<path d="M-6 ${-5+i*7}l2.5 2.5 4.5 -5" ${S}/>`;break;
    case 2:g+=`<circle cx="-6" cy="-6" r="4.5" ${S}/><path d="M-14 10q0 -9 8 -9t8 9" ${S}/><circle cx="7" cy="-4" r="4" style="fill:none;stroke:${on?'var(--sky)':c};stroke-width:2"/><path d="M0 11q0 -8 7 -8t7 8" style="fill:none;stroke:${on?'var(--sky)':c};stroke-width:2;stroke-linecap:round"/>`;break;
    case 3:{const lv=on?clamp(lp*1.4):1;g+=`<rect x="-4" y="${f1(12-16*lv)}" width="8" height="${f1(16*lv)}" style="fill:var(--vessel);opacity:.8"/><path d="M-5 -13h10M-4 -13v22a4 4 0 0 0 8 0v-22" ${S}/>`;break}
    case 4:{g+=`<ellipse rx="12" ry="14" ${S}/><path d="M-3 -3q-3 3 0 6M3 -3q3 3 0 6" ${S}/>`;if(on){const yy=-14+28*((lp*2.2)%1);g+=`<path d="M-15 ${f1(yy)}h30" style="stroke:var(--sky);stroke-width:2"/>`}break}
    case 5:g+=`<circle cx="-7" cy="-5" r="4" style="fill:var(--amber)"/><circle cx="6" cy="-6" r="4" style="fill:var(--sky)"/><circle cx="0" cy="7" r="4" style="fill:var(--rose)"/>`;break;
    case 6:g+=`<path d="M-12 -8h14l9 9 -9 9h-14z" ${S}/><path d="M-8 1l3 3 6 -6" ${S}/>`;break;
  }
  return g+'</g>'}
inits.dx=()=>{
  /* ---------- 1. pathway ---------- */
  const svg=$('#dxSvg'),rg=$('#dxT');
  function draw(t){
    const N=vb(svg,'720 390','400 700');
    const L=N?{P:[ [200,44],[200,134],[200,224],[200,314],[200,404],[200,494],[200,650] ],bw:260,chips:[ [75,566],[200,566],[325,566] ],cw:116}
             :{P:[ [95,80],[270,80],[445,80],[620,80],[620,230],[370,230],[110,230] ],bw:150,chips:[ [250,322],[370,322],[490,322] ],cw:112};
    const pos=t*7,cur=Math.min(6,Math.floor(pos)),lp=clamp(pos-cur);
    let s=`<defs>${marker('dxA')}${marker('dxAr','var(--rose)')}</defs><rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    /* connectors */
    for(let i=0;i<6;i++){const [x0,y0]=L.P[i],[x1,y1]=L.P[i+1],done=i<cur;let d;
      if(N)d=i===5?`M${x0} ${y0+29}V${L.chips[1][1]-22}M${x1} ${L.chips[1][1]+22}V${y1-31}`:`M${x0} ${y0+29}V${y1-31}`;
      else if(y0===y1)d=x1>x0?`M${x0+L.bw/2} ${y0}H${x1-L.bw/2-2}`:`M${x0-L.bw/2} ${y0}H${x1+L.bw/2+2}`;
      else d=`M${x0} ${y0+29}V${y1-31}`;
      s+=`<path d="${d}" style="fill:none;stroke:${done?'var(--rose)':'var(--muted)'};stroke-width:${done?2.4:1.6};${done?'':'stroke-dasharray:4 4'}" marker-end="url(#${done?'dxAr':'dxA'})"/>`}
    /* biomarker chips */
    const CH=[ ['⁧PET עמילואיד⁩','⁧92/100 מול נתיחה⁩','var(--amber)'],['CSF Aβ42/40','⁧היחס עדיף על Aβ42⁩','var(--sky)'],['⁧p-tau217 בדם⁩','⁧אישור FDA, 2025⁩','var(--rose)'] ];
    L.chips.forEach(([x,y],k)=>{const on=cur>5||(cur===5&&lp>.12+k*.2);
      if(!N)s+=`<path d="M${L.P[5][0]} ${L.P[5][1]+29}L${x} ${y-21}" style="stroke:var(--line);stroke-width:1.5"/>`;
      s+=`<rect x="${x-L.cw/2}" y="${y-20}" width="${L.cw}" height="40" rx="9" style="fill:${on?'var(--panel)':'var(--field)'};stroke:${on?CH[k][2]:'var(--line)'};stroke-width:${on?2:1}"/><text x="${x}" y="${y-4}" class="t-sm t-mid" style="fill:${on?'var(--ink)':'var(--muted)'};font-weight:700">${CH[k][0]}</text><text x="${x}" y="${y+11}" class="t-xs t-mid">${CH[k][1]}</text>`});
    /* nodes */
    L.P.forEach(([x,y],i)=>{const on=i===cur,done=i<cur,S=DX_STEPS[i];
      s+=`<g class="clk" data-node="${i}" tabindex="0" role="button" aria-label="שלב ${i+1}: ${S.ti}${done?', הושלם':''}" aria-pressed="${on}">`;
      s+=`<rect x="${x-L.bw/2}" y="${y-29}" width="${L.bw}" height="58" rx="12" style="fill:${on?'var(--rose-soft)':'var(--panel)'};stroke:${on?'var(--rose)':done?'var(--sage)':'var(--line)'};stroke-width:${on?2.4:1.4}"/>`;
      s+=dxGlyph(i,x-L.bw/2+24,y,on?lp:1,on||done);
      s+=`<text x="${x-L.bw/2+46}" y="${y-3}" class="t-lbl">${S.ti}</text><text x="${x-L.bw/2+46}" y="${y+13}" class="t-xs">${S.sub}</text>`;
      if(done)s+=`<circle cx="${x+L.bw/2-4}" cy="${y-25}" r="8" style="fill:var(--sage)"/><path d="M${x+L.bw/2-8} ${y-25}l3 3 5 -6" style="fill:none;stroke:var(--panel);stroke-width:2;stroke-linecap:round"/>`;
      s+=`</g>`});
    /* traveller */
    const [ax,ay]=L.P[cur],[bx,by]=L.P[Math.min(6,cur+1)],m=cur<6?ease(ramp(lp,.72,1)):0;
    let tx=lerp(ax,bx,m),ty=lerp(ay,by,m);
    if(cur===5&&m>0){const cx=L.chips[1][0],cy=L.chips[1][1];tx=m<.5?lerp(ax,cx,m*2):lerp(cx,bx,m*2-1);ty=m<.5?lerp(ay,cy,m*2):lerp(cy,by,m*2-1)}
    const ox=N?L.bw/2+14:0,oy=N?0:-40;
    s+=`<circle cx="${f1(tx+(m>0&&m<1?0:ox))}" cy="${f1(ty+(m>0&&m<1?0:oy))}" r="8" style="fill:var(--rose);stroke:var(--panel);stroke-width:3"/>`;
    svg.innerHTML=s;
    const p=phaseOf(DX_STEPS,t);setSt(p);$('#dxNote').innerHTML=noteHTML(DX_STEPS[p]);
  }
  const stop=playWire(rg,$('#dxPlay'),draw,21000,'הפעלה חוזרת','dx');
  const setSt=stepWire($('#dxSteps'),DX_STEPS,rg,draw,stop);
  const go=i=>{stop();rg.value=DX_STEPS[i].at;draw(DX_STEPS[i].at)};
  svg.addEventListener('click',e=>{const g=e.target.closest('[data-node]');if(g)go(+g.dataset.node)});
  svg.addEventListener('keydown',e=>{const g=e.target.closest('[data-node]');if(!g||(e.key!=='Enter'&&e.key!==' '))return;e.preventDefault();const i=+g.dataset.node;go(i);const ng=svg.querySelector(`[data-node="${i}"]`);ng&&ng.focus()});

  /* ---------- 2. predictive-value grid ---------- */
  const gs=$('#dxGrid'),gr=$('#dxGridT'),se=$('#dxSens'),sp=$('#dxSpec'),pr=$('#dxPre');
  function nums(){const sens=+se.value/100,spec=+sp.value/100,pre=+pr.value/100,D=Math.round(1000*pre),TP=Math.round(D*sens),FN=D-TP,H=1000-D,TN=Math.round(H*spec),FP=H-TN;
    return {sens,spec,pre,D,TP,FN,H,TN,FP,ppv:TP+FP?TP/(TP+FP):0,npv:TN+FN?TN/(TN+FN):0}}
  function drawGrid(t){
    const N=vb(gs,'720 340','400 800');
    const L=N?{cols:25,cell:13,gx:37,gy:48,px:24,py:600,bw:250}:{cols:40,cell:11,gx:20,gy:48,px:496,py:60,bw:170};
    const n=nums(),c=L.cell,app=ramp(t,0,.3),o1=ramp(t,.32,.5),o2=ramp(t,.6,.8),o3=ramp(t,.82,1);
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    const head=t<.32?'נבדקים 1,000 אנשים':t<.6?`⁧ל־${n.D} יש באמת פתולוגיה של עמילואיד (${Math.round(n.pre*100)}%)⁩`:`⁧${n.TP+n.FP} תוצאות חיוביות, ${n.TN+n.FN} שליליות⁩`;
    s+=`<text x="${L.gx}" y="30" class="t-lbl">${head}</text>`;
    for(let i=0;i<1000;i++){if(i/1000>=app)break;
      const x=L.gx+(i%L.cols)*c+c/2,y=L.gy+Math.floor(i/L.cols)*c+c/2,dis=i<n.D,tp=i<n.TP,fp=!dis&&i<n.D+n.FP;
      if(dis){if(o1<1)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(c*.16)}" style="fill:var(--muted);opacity:${f1(1-o1)}"/>`;
        if(o1>0){if(!tp||o2<1)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(c*.32)}" style="fill:none;stroke:var(--rose);stroke-width:1.5;opacity:${f1(tp?o1*(1-o2):o1)}"/>`;
          if(tp&&o2>0)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(c*.38)}" style="fill:var(--rose);opacity:${f1(o2)}"/>`}}
      else if(fp){if(o2<1)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(c*.16)}" style="fill:var(--muted);opacity:${f1(1-o2)}"/>`;
        if(o2>0)s+=`<rect x="${f1(x-c*.32)}" y="${f1(y-c*.32)}" width="${f1(c*.64)}" height="${f1(c*.64)}" rx="1.5" style="fill:var(--amber);opacity:${f1(o2)}"/>`}
      else s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(c*.16)}" style="fill:var(--muted)"/>`}
    /* legend and predictive values */
    const LG=[ ['tp','חיובי אמיתי',n.TP,'יש פתולוגיה, בדיקה חיובית'],['fn','שלילי כוזב',n.FN,'יש פתולוגיה, בדיקה שלילית'],['fp','חיובי כוזב',n.FP,'אין פתולוגיה, בדיקה חיובית'],['tn','שלילי אמיתי',n.TN,'אין פתולוגיה, בדיקה שלילית'] ];
    LG.forEach(([k,l,v,d],i)=>{const x=N?L.px+(i%2)*186:L.px,y=N?L.py+Math.floor(i/2)*42:L.py+i*42,show=o2;
      let mk=k==='tp'?`<circle cx="${x+6}" cy="${y-4}" r="6" style="fill:var(--rose)"/>`:k==='fn'?`<circle cx="${x+6}" cy="${y-4}" r="5" style="fill:none;stroke:var(--rose);stroke-width:1.8"/>`:k==='fp'?`<rect x="${x}" y="${y-10}" width="12" height="12" rx="2" style="fill:var(--amber)"/>`:`<circle cx="${x+6}" cy="${y-4}" r="2.5" style="fill:var(--muted)"/>`;
      s+=`<g style="opacity:${f1(.25+.75*show)}">${mk}<text x="${x+20}" y="${y}" class="t-sm" style="fill:var(--ink);font-weight:600">⁧${l} <tspan style="font-weight:700">${show>0?v:'–'}</tspan>⁩</text><text x="${x+20}" y="${y+14}" class="t-xs">${d}</text></g>`});
    if(o3>0){const by=N?L.py+88:L.py+176;
      [ ['ערך ניבוי חיובי',n.ppv,'var(--rose)',`⁧${n.TP} מתוך ${n.TP+n.FP} החיוביים נכונים⁩`],['ערך ניבוי שלילי',n.npv,'var(--sage)',`⁧${n.TN} מתוך ${n.TN+n.FN} השליליים נכונים⁩`] ].forEach(([l,v,col,d],i)=>{const y=by+i*(N?58:56);
        s+=`<g style="opacity:${f1(o3)}"><text x="${L.px}" y="${y}" class="t-sm" style="fill:var(--ink);font-weight:600">${l}</text><rect x="${L.px}" y="${y+6}" width="${L.bw}" height="14" rx="4" style="fill:var(--panel-2)"/><rect x="${L.px}" y="${y+6}" width="${f1(L.bw*v*ease(o3))}" height="14" rx="4" style="fill:${col}"/><text x="${L.px+L.bw+(N?-4:6)}" y="${y+(N?0:18)}" class="t-lbl ${N?'t-end':''}">${Math.round(v*100)}%</text><text x="${L.px}" y="${y+33}" class="t-xs">${d}</text></g>`})}
    gs.innerHTML=s;
    const p=phaseOf(DX_GSTEPS,t),P=DX_GSTEPS[p];let txt;
    if(p===0)txt=`דמיינו 1,000 אנשים כמו האדם שיושב מול הקלינאי, שכולם עוברים את אותה בדיקה.`;
    else if(p===1)txt=`בהסתברות לפני הבדיקה של ${Math.round(n.pre*100)}%, ל־${n.D} מתוך 1,000 יש באמת פתולוגיה של עמילואיד (טבעות), ול־${n.H} אין.`;
    else txt=`רגישות של ${Math.round(n.sens*100)}% מאתרת ${n.TP} מתוך ${n.D} בעלי הפתולוגיה ומחמיצה ${n.FN}. סגוליות של ${Math.round(n.spec*100)}% שוללת נכון ${n.TN} מתוך ${n.H} שאין להם פתולוגיה, אבל ${n.FP} מקבלים בכל זאת תוצאה חיובית. לכן תוצאה חיובית נכונה ב־${Math.round(n.ppv*100)}% מהמקרים (PPV), ותוצאה שלילית ב־${Math.round(n.npv*100)}% מהמקרים (NPV).`;
    $('#dxGridNote').innerHTML=noteHTML({k:P.k+' · כלי הוראה',t:P.t,txt:txt+` ההנחיה של איגוד האלצהיימר (Alzheimer's Association) מ־2025, שחלה רק על טיפול מומחה במרפאות זיכרון, קובעת שבדיקת דם עם רגישות של 90% לפחות וסגוליות של 75% לפחות יכולה לשמש למיון ראשוני (טריאז'), כשתוצאות חיוביות מאושרות ב־PET או ב־CSF, ושבדיקה עם 90% ו־90% לפחות יכולה להחליף אותן. שתיהן המלצות מותנות המבוססות על ראיות בוודאות נמוכה, ובדיקות מסחריות רבות אינן עומדות בספים האלה. [[Palmqvist2025CPG]]`,
      pt:`אותה בדיקה נותנת יותר אזעקות שווא כשהמצב נדיר יותר בקרב הנבדקים. ההנחיה מ־2025 עוסקת רק בטיפול מומחה במרפאות זיכרון, לא ברפואה הראשונית ולא באנשים ללא תסמינים.`,
      hook:`רגישות וסגוליות הן תכונות של הבדיקה. PPV ו־NPV תלויים גם בהסתברות לפני הבדיקה. שכיחות נמוכה: NPV טוב, PPV חלש. הבדיקה לרפואה הראשונית אושרה כדי לסייע בשלילה, וה־NPV של 97.9% שדווח עבורה תלוי בשכיחות הנמוכה בקרב האנשים שנבדקו. [[Roche2025]]`});
    gr.setAttribute('aria-valuetext',`${P.t}. PPV ${Math.round(n.ppv*100)}%, NPV ${Math.round(n.npv*100)}%`);
  }
  const gstop=playWire(gr,$('#dxGridPlay'),drawGrid,9000,'הפעלה חוזרת','dx');
  const sync=()=>{$('#dxSensV').textContent=se.value+'%';$('#dxSpecV').textContent=sp.value+'%';$('#dxPreV').textContent=pr.value+'%';
    $$('#m-dx [data-sens]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.sens===se.value&&b.dataset.spec===sp.value));
    $$('#m-dx [data-pre]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.pre===pr.value));
    gstop();if(+gr.value<.82)gr.value=1;drawGrid(+gr.value)};
  [se,sp,pr].forEach(r=>r.addEventListener('input',sync));
  $$('#m-dx [data-sens]').forEach(b=>b.onclick=()=>{se.value=b.dataset.sens;sp.value=b.dataset.spec;sync()});
  $$('#m-dx [data-pre]').forEach(b=>b.onclick=()=>{pr.value=b.dataset.pre;sync()});

  /* ---------- 3. criteria compared ---------- */
  let prof=0;
  function drawCrit(){
    $('#dxCrit').innerHTML=DX_CRIT.map(c=>`<div class="card">${c.ev}<div class="kicker">${c.n}</div><h4>${c.h}</h4><p>${c.d}</p><div class="verdict"><b>לאדם הזה</b>${c.v[prof]}</div></div>`).join('')+
      `<div class="card"><div class="pt"><b>במילים פשוטות</b>כולם מסכימים על מה שהבדיקות מודדות. המחלוקת היא אם אדם עם בדיקה חיובית וללא תסמינים "יש לו אלצהיימר" או "נמצא בסיכון".</div><div class="hook"><b>לבחינה</b>ATN 2018: מחלת אלצהיימר מחייבת A+T+. איגוד האלצהיימר 2024: סמן ביולוגי אחד מסוג Core 1 מספיק. IWG 2024: אנשים עם עמילואיד בלבד וללא תסמינים הם "בסיכון", לא חולים. [[Jack2018,Jack2024,Dubois2024]]</div></div>`;
    $$('#m-dx [data-prof]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.prof===prof));
  }
  $$('#m-dx [data-prof]').forEach(b=>b.onclick=()=>{prof=+b.dataset.prof;drawCrit()});
  drawCrit();
  draw(+rg.value);drawGrid(+gr.value);
};
