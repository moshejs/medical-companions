
/* =============== 1.2 brain =============== */
const BR_B=[
 {k:'שלב 0',t:'עדיין אין סבכים',txt:'בראק ובראק דירגו 83 מוחות. פיזור הרבדים היה משתנה מכדי לדרג אותו, אבל הסבכים וחוטי הנוירופיל התקדמו ברצף קבוע של שישה שלבים. [[Braak1991]]',
  pt:'לחצו על הפעלה כדי לראות סבכי טאו מופיעים ומתפשטים, אזור אחר אזור.'},
 {k:'בראק I · טרנס־אנטורינלי',t:'שלב I: קודם רצועה קטנה',txt:'שלבים I ו־II: סבכים בנוירוני ההקרנה של הקליפה הטרנס־אנטורינלית, על המשטח הפנימי של האונה הרקתית, ולעיתים סבכים בודדים באזור CA1 של ההיפוקמפוס. [[Braak1991,DeTure2019]]',
  pt:'סבכי טאו מופיעים לראשונה ברצועה קטנה של קליפת המוח, לצד מרכז הזיכרון של המוח.'},
 {k:'בראק II · טרנס־אנטורינלי',t:'שלב II: ליד שער הזיכרון',txt:'הסבכים נעשים צפופים יותר באזור הטרנס־אנטורינלי. הקליפה האנטורינלית השכנה היא השער ששכבה II שלה מזינה את ההיפוקמפוס, ולכן לסבכים מוקדמים כאן יש חשיבות לזיכרון. [[Braak1991,GomezIsla1996]]',
  pt:'הסבכים עדיין מוגבלים לאזור קטן, ממש בכניסה למעגל הזיכרון.'},
 {k:'בראק III · לימבי',t:'שלב III: השלבים הלימביים',txt:'בשלבים III ו־IV הקליפה האנטורינלית מעורבת כולה, CA1 והסוביקולום נפגעים, הסבכים במוח הקדמי הבזלי בולטים יותר ומופיעים סבכי רפאים. האיזוקורטקס עדיין נחסך ברובו. [[DeTure2019]]',
  pt:'הסבכים ממלאים את אזורי הזיכרון העמוקים באונה הרקתית. קליפת המוח החיצונית עדיין נקייה ברובה.'},
 {k:'בראק IV · לימבי',t:'שלב IV: לימבי, חמור יותר',txt:'הדפוס הלימבי מחמיר. בסדרה קלינית־פתולוגית, סבכים הופיעו מוקדם בקליפה האנטורינלית, ב־CA1/סוביקולום ובאמיגדלה. [[Arriagada1992,DeTure2019]]',
  hook:'בראק I–II טרנס־אנטורינלי, III–IV לימבי, V–VI איזוקורטיקלי. בציון ABC אלה הופכים ל־B1, ל־B2 ול־B3. [[Montine2012]]'},
 {k:'בראק V · איזוקורטיקלי',t:'שלב V: אל קליפת האסוציאציה',txt:'הסבכים מתפשטים בהרחבה באיזוקורטקס האסוציאטיבי, האזורים הגדולים שמשלבים מידע. [[DeTure2019,Braak1991]]',
  pt:'עכשיו הסבכים מגיעים לקליפת המוח החיצונית, המשמשת לשפה, לתכנון ולהתמצאות.'},
 {k:'בראק VI · איזוקורטיקלי',t:'שלב VI: כמעט בכל מקום',txt:'כל אזורי האסוציאציה נפגעים קשות, ואפילו קליפת התחושה הראשונית מעורבת: כמעט כל קליפת האסוציאציה נהרסת. קליפת התנועה וקליפת התחושה הראשוניות נחסכות יחסית בניוון הנראה לעין. [[Braak1991,DeTure2019]]',
  pt:'בשלב האחרון כמעט כל קליפת המוח החושבת נפגעת. האזורים האחראים לתנועה הם מהאחרונים.',
  hook:'הסבכים מתפשטים בסדר צפוי, ועומס הסבכים בניאוקורטקס משקף את חומרת הפגיעה הקוגניטיבית טוב יותר מספירת הרבדים. [[Arriagada1992,Nelson2012]]'}
].map((s,k)=>({...s,from:k?.04+.15*k-.09:0,at:k?.04+.15*k:.02}));
const BR_T=[
 {k:'שלב 0',t:'אין משקעי עמילואיד',txt:'שלבי תאל מבוססים על 47 מוחות ומתארים כיצד משקעי עמילואיד מתפשטים. אפשר לחזור לטאו בכל רגע כדי להשוות. [[Thal2002]]',
  pt:'לחצו על הפעלה כדי לראות רובדי עמילואיד מופיעים ומתפשטים.'},
 {k:'תאל 1 · ניאוקורטקס',t:'שלב 1: קודם קליפת המוח החיצונית',txt:'משקעי העמילואיד מתחילים בניאוקורטקס, בקצה הנגדי של המוח לעומת המקום שבו מתחילים הסבכים. [[Thal2002]]',
  pt:'רובדי עמילואיד מתחילים בקליפת המוח החיצונית, לא באזור הזיכרון.',
  hook:'עמילואיד מתחיל בניאוקורטקס ומתפשט פנימה ומטה. טאו מתחיל באונה הרקתית המדיאלית ומתפשט החוצה.'},
 {k:'תאל 2 · אלוקורטקס',t:'שלב 2: ההיפוקמפוס מצטרף',txt:'מתווסף האלוקורטקס, כולל ההיפוקמפוס והקליפה האנטורינלית. שלבים 1 עד 3 אינם נדירים אצל אנשים תקינים מבחינה נוירולוגית. [[Thal2002,DeTure2019]]',
  pt:'הרבדים מגיעים לאזור הזיכרון, לעיתים קרובות אצל אנשים שעדיין חושבים וזוכרים כרגיל.'},
 {k:'תאל 3 · חומר אפור עמוק',t:'שלב 3: גרעינים עמוקים',txt:'מתווספים הדיאנצפלון, הסטריאטום והגרעינים הכולינרגיים של המוח הקדמי הבזלי. אנשים ללא דמנציה שהיה במוחם עמילואיד מסוג אלצהיימר היו בשלבים 1 עד 3. [[Thal2002]]',
  pt:'הרבדים מגיעים למבנים עמוק בתוך המוח.'},
 {k:'תאל 4 · גזע המוח',t:'שלב 4: גזע המוח',txt:'מתווספים גרעיני גזע המוח. מקרי אלצהיימר מוכחים קלינית היו בשלבים 3 עד 5. [[Thal2002]]'},
 {k:'תאל 5 · מוחון',t:'שלב 5: המוחון',txt:'המוחון מתווסף אחרון. בציון ABC, שלבים 1 עד 2 הם A1, שלב 3 הוא A2 ושלבים 4 עד 5 הם A3. [[Montine2012,Thal2002]]',
  hook:'תאל: 1 ניאוקורטקס, 2 אלוקורטקס, 3 דיאנצפלון/סטריאטום/מוח קדמי בזלי, 4 גזע המוח, 5 מוחון.'}
].map((s,k)=>({...s,from:k?.04+.18*k-.1:0,at:k?.04+.18*k:.02}));
const BR_CI=[
 {from:0,at:.06,k:'שלב 1 · המעגל',t:'מעגל לזיכרונות חדשים',
  txt:'משכבה II של הקליפה האנטורינלית יוצא המסלול החודר (perforant path), הקלט המעורר העיקרי להיפוקמפוס. האותות עוברים לגירוס הדנטטי, ל־CA3, ל־CA1 ולסוביקולום, והסוביקולום והקליפה האנטורינלית מחברים את ההיפוקמפוס בחזרה לקליפת האסוציאציה, למוח הקדמי הבזלי, לתלמוס ולהיפותלמוס. [[GomezIsla1996,Hyman1984]]',
  pt:'זיכרונות חדשים עוברים במעגל עמוק באונה הרקתית לפני שהם נשמרים.'},
 {from:.15,at:.27,k:'שלב 2 · סבכים ראשונים',t:'הסבכים מתחילים בכניסה וביציאה',
  txt:'הסבכים הראשונים נוצרים במקום שבו המעגל מתחיל: הקליפה הטרנס־אנטורינלית והאנטורינלית, ואחר כך CA1 והסוביקולום. הפתולוגיה פוגעת בסוביקולום ובשכבות II ו־IV של הקליפה האנטורינלית, התאים שמקשרים את ההיפוקמפוס לשאר המוח, וכך ההיפוקמפוס מנותק מהקלט ומהפלט שלו. [[Braak1991,Hyman1984]]',
  pt:'המחלה פוגעת קודם בדלתות הכניסה והיציאה של מעגל הזיכרון.',
  hook:'הפתולוגיה של אלצהיימר מבודדת את התצורה ההיפוקמפלית, כי היא פוגעת בשכבות II ו־IV האנטורינליות ובסוביקולום (Hyman 1984). [[Hyman1984]]'},
 {from:.35,at:.49,k:'שלב 3 · אלצהיימר קל מאוד',t:'שכבה II האנטורינלית מאבדת 60%',
  txt:'באלצהיימר קל מאוד (CDR 0.5) היו בקליפה האנטורינלית 32% פחות נוירונים מאשר בקבוצת הביקורת: 60% פחות בשכבה II ו־40% פחות בשכבה IV. [[GomezIsla1996]] באלצהיימר משפחתי, פגיעה בזיכרון האפיזודי מופיעה כ־10 שנים לפני גיל ההופעה הצפוי. [[Bateman2012]]',
  pt:'גם כשהתסמינים קלים מאוד, יותר ממחצית התאים בכניסה למעגל הזיכרון כבר אבדו.'},
 {from:.55,at:.68,k:'שלב 4 · הפלט',t:'CA1 מתרוקן',
  txt:'הזדקנות תקינה כמעט לא גרמה לאובדן נוירונים ב־CA1. במקרי אלצהיימר היו כ־4.4 מיליון נוירונים ב־CA1, לעומת 14.1 מיליון בהזדקנות תקינה. [[West1994]]',
  pt:'תחנת הפלט העיקרית של ההיפוקמפוס מאבדת כשני שלישים מתאיה. זה לא קורה בהזדקנות תקינה.',
  hook:'אובדן נוירונים ב־CA1 מאפיין אלצהיימר, לא הזדקנות תקינה (West 1994).'},
 {from:.72,at:.84,k:'שלב 5 · אצטילכולין',t:'המוח הקדמי הבזלי דועך',
  txt:'הנוירונים של הגרעין הבזאלי של מיינרט, מקור הקלט הכולינרגי העיקרי לקליפת המוח, עוברים ניוון עמוק וסלקטיבי של יותר מ־75%. זה הבסיס לחסר הכולינרגי בקליפת המוח. [[Whitehouse1982]] התרופות הפועלות על מערכת זו מוצגות במודול <a href="#synapse" data-go="synapse">מעכבי כולינאסטראז וממנטין</a>.',
  pt:'מקבץ קטן של תאים, שמספק לקליפת המוח אצטילכולין, חומר מעביר חשוב לקשב ולזיכרון, אובד ברובו.'},
 {from:.86,at:.98,k:'שלב 6 · ב־MRI',t:'ההיפוקמפוס מצטמק',
  txt:'באלצהיימר חמור, מספר הנוירונים בשכבה II האנטורינלית ירד בכ־90%. [[GomezIsla1996]] ב־MRI, ניוון של האונה הרקתית המדיאלית מקובל כסמן אבחוני בשלב ה־MCI. [[Frisoni2010]] מטא־אנליזה של 595 אנשים עם מחלת אלצהיימר ו־212 משתתפי ביקורת מצאה ניוון היפוקמפלי של 4.66% בשנה, לעומת 1.41% בקבוצת הביקורת. [[Barnes2009]] הקרניים הרקתיות של החדרים הצדדיים מתרחבות, אף שאין שינוי גס שהוא ייחודי לאלצהיימר. [[DeTure2019]]',
  pt:'סריקות מוח מראות שמרכז הזיכרון מצטמק מהר פי שלושה בערך מאשר אצל בני אותו גיל בלי אלצהיימר.',
  hook:'ניוון היפוקמפלי: 4.66% בשנה באלצהיימר לעומת 1.41% בקבוצת הביקורת (Barnes 2009).'}
];
inits.brain=()=>{
  /* ---- 1. staging maps ---- */
  const svg=$('#brSvg'),rg=$('#brT');let tau=true;
  const LAT='M30 130 C28 70 90 22 170 20 C250 18 305 60 312 125 C316 150 305 170 285 175 C250 195 190 205 150 200 C115 196 98 182 100 165 C90 158 60 160 45 155 C35 150 30 140 30 130 Z';
  const MED='M30 130 C28 70 90 22 170 20 C250 18 305 60 312 125 C316 150 306 172 286 180 C262 190 238 204 220 208 C180 214 140 214 118 206 C106 200 104 186 96 176 C80 166 52 162 40 154 C32 148 30 140 30 130 Z';
  const BK={trans:[0,.6,.85,1,1,1,1],ent:[0,0,.35,.85,1,1,1],hip:[0,.15,.25,.6,.85,1,1],amy:[0,0,0,.45,.75,.9,1],bf:[0,0,0,.45,.7,.85,1],assoc:[0,0,0,0,0,.55,.95],prim:[0,0,0,0,0,0,.6]};
  const BMAP={trans:'trans',ent:'ent',hip:'hip',amy:'amy',bf:'bf',assoc:'assoc',cing:'assoc',parahip:'assoc',sens:'prim',vis:'prim'};
  const TK={neo:[0,.55,.7,.8,.9,1],allo:[0,0,.6,.8,.9,1],deep:[0,0,0,.65,.85,1],bs:[0,0,0,0,.7,1],cb:[0,0,0,0,0,.75]};
  const TMAP={assoc:'neo',cing:'neo',parahip:'neo',sens:'neo',vis:'neo',motor:'neo',hip:'allo',ent:'allo',trans:'allo',bf:'deep',thal:'deep',str:'deep',bs:'bs',cb:'cb'};
  const kv=(arr,s)=>{const i=Math.floor(s),f=s-i;return lerp(arr[Math.min(i,arr.length-1)],arr[Math.min(i+1,arr.length-1)],ease(f))};
  const steps=()=>tau?BR_B:BR_T;
  const stageOf=t=>tau?clamp((t-.04)/.15,0,6):clamp((t-.04)/.18,0,5);
  function view(kind,ox,oy,V,C){
    const sh=(k,base='var(--cell)')=>{const v=V(k);return v>0?`style="fill:${C};opacity:${f1(v*.85)}"`:`style="fill:none"`};
    const ov=(d,k)=>{const v=V(k);return v>0?`<path d="${d}" style="fill:${C};opacity:${f1(v*.85)}"/>`:''};
    let s=`<g transform="translate(${ox} ${oy})">`;
    if(kind==='L'){
      s+=`<defs><clipPath id="brClipL"><path d="${LAT}"/></clipPath></defs><text x="0" y="-12" class="t-sm">מבט צידי · צד שמאל</text>`;
      const BS='M184 192 C188 214 190 236 192 256 L214 256 C212 236 214 214 222 194 Z',CB='M222 196 C245 184 290 178 304 186 C316 205 292 232 255 232 C230 232 214 215 222 196 Z';
      s+=`<path d="${BS}" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.6"/>`+ov(BS,'bs');
      s+=`<path d="${CB}" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.6"/>`+ov(CB,'cb');
      s+=`<path d="M232 208 C255 199 285 195 303 199 M234 219 C258 213 284 211 299 213" style="fill:none;stroke:var(--cell-line);stroke-width:1;opacity:.7"/>`;
      s+=`<path d="${LAT}" style="fill:var(--cell)"/>`+ov(LAT,'assoc');
      s+=`<g clip-path="url(#brClipL)">`;
      [['M164 18 C158 55 150 92 140 136','motor'],['M189 18 C183 55 175 92 165 130','sens']].forEach(([d,k])=>{s+=`<path d="${d}" style="fill:none;stroke:var(--panel-2);stroke-width:14"/>`;const v=V(k);if(v>0)s+=`<path d="${d}" style="fill:none;stroke:${C};stroke-width:14;opacity:${f1(v*.85)}"/>`});
      s+=`<circle cx="306" cy="140" r="21" style="fill:var(--panel-2)"/>`;if(V('vis')>0)s+=`<circle cx="306" cy="140" r="21" style="fill:${C};opacity:${f1(V('vis')*.85)}"/>`;
      s+=`</g><path d="${LAT}" style="fill:none;stroke:var(--cell-line);stroke-width:2"/>`;
      s+=`<path d="M100 160 C130 148 170 138 210 122 C220 118 226 112 228 104 M176 21 C170 55 162 92 152 132" style="fill:none;stroke:var(--cell-line);stroke-width:1.8;stroke-linecap:round"/>`;
      s+=`<path d="M270 36 C266 90 266 140 268 182 M228 104 C240 120 255 132 268 140" style="fill:none;stroke:var(--cell-line);stroke-width:1;stroke-dasharray:3 4"/>`;
      s+=`<ellipse cx="125" cy="112" rx="30" ry="15" ${sh('str')}/><ellipse cx="125" cy="112" rx="30" ry="15" style="fill:none;stroke:var(--ink);stroke-width:1.2;stroke-dasharray:4 3"/>`;
      s+=`<text x="125" y="110" class="t-xs t-mid" style="fill:var(--ink)">סטריאטום</text><text x="125" y="121" class="t-xs t-mid">⁧(עמוק)⁩</text>`;
      s+=`<text x="76" y="76" class="t-xs t-mid" style="fill:var(--ink)">אונה מצחית</text><text x="226" y="64" class="t-xs t-mid" style="fill:var(--ink)">אונה קודקודית</text><text x="196" y="182" class="t-xs t-mid" style="fill:var(--ink)">אונה רקתית</text>`;
      s+=`<text x="330" y="22" class="t-xs t-end" style="fill:var(--ink)">אונה עורפית</text><path d="M304 26 L296 58" style="stroke:var(--muted);stroke-width:1"/>`;
      s+=`<text x="176" y="9" class="t-xs t-mid">מוטורית ראשונית · תחושתית</text>`;
      s+=`<text x="182" y="250" class="t-xs t-end" style="fill:var(--ink)">גזע המוח</text><text x="262" y="250" class="t-xs t-mid" style="fill:var(--ink)">מוחון</text>`;
    } else {
      s+=`<defs><clipPath id="brClipM"><path d="${MED}"/></clipPath></defs><text x="0" y="-12" class="t-sm">מבט מדיאלי · גזע המוח הוסר</text>`;
      const CB='M238 212 C256 200 292 194 304 204 C314 226 290 252 258 252 C238 252 228 230 238 212 Z';
      s+=`<path d="${CB}" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.6"/>`+ov(CB,'cb');
      s+=`<path d="${MED}" style="fill:var(--cell)"/>`+ov(MED,'assoc');
      s+=`<g clip-path="url(#brClipM)">`;
      const CING='M92 112 C104 60 236 48 268 104';
      s+=`<path d="${CING}" style="fill:none;stroke:var(--cell);stroke-width:16"/>`;if(V('cing')>0)s+=`<path d="${CING}" style="fill:none;stroke:${C};stroke-width:16;opacity:${f1(V('cing')*.85)}"/>`;
      const CAL='M252 150 C272 146 292 140 316 136';
      s+=`<path d="${CAL}" style="fill:none;stroke:var(--panel-2);stroke-width:16"/>`;if(V('vis')>0)s+=`<path d="${CAL}" style="fill:none;stroke:${C};stroke-width:16;opacity:${f1(V('vis')*.85)}"/>`;
      const PH='M106 189 C140 188 190 190 228 193 L228 220 L104 220 Z',ENT='M110 188 C125 187 150 187 166 189 L166 197 L112 197 Z',TR='M112 197 L170 197 L172 212 L114 212 Z';
      s+=`<path d="${PH}" style="fill:var(--cell)"/>`+ov(PH,'parahip');
      s+=`<path d="${ENT}" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:.9"/>`+ov(ENT,'ent');
      s+=`<path d="${TR}" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:.9"/>`+ov(TR,'trans');
      s+=`</g><path d="${MED}" style="fill:none;stroke:var(--cell-line);stroke-width:2"/>`;
      s+=`<path d="M84 104 C98 46 240 34 276 100" style="fill:none;stroke:var(--cell-line);stroke-width:1.2"/>`;
      s+=`<path d="M104 118 C116 80 226 72 252 108 M104 118 C100 128 108 136 118 134" style="fill:none;stroke:var(--cell-line);stroke-width:13;stroke-linecap:round"/><path d="M104 118 C116 80 226 72 252 108 M104 118 C100 128 108 136 118 134" style="fill:none;stroke:var(--panel-2);stroke-width:10;stroke-linecap:round"/>`;
      s+=`<ellipse cx="175" cy="133" rx="30" ry="16" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.4"/><ellipse cx="175" cy="133" rx="30" ry="16" ${sh('thal')}/>`;
      s+=`<ellipse cx="110" cy="150" rx="9" ry="6" style="fill:var(--cell);stroke:var(--ink);stroke-width:1.2"/><ellipse cx="110" cy="150" rx="9" ry="6" ${sh('bf')}/>`;
      const HIP='M138 178 C160 170 196 169 222 176 C218 184 190 187 160 187 C148 187 138 184 138 178 Z';
      s+=`<path d="${HIP}" ${sh('hip')}/><path d="${HIP}" style="fill:none;stroke:var(--ink);stroke-width:1.2;stroke-dasharray:4 3"/>`;
      s+=`<circle cx="126" cy="176" r="7" ${sh('amy')}/><circle cx="126" cy="176" r="7" style="fill:none;stroke:var(--ink);stroke-width:1.2;stroke-dasharray:3 2"/>`;
      s+=`<text x="180" y="71" class="t-xs t-mid" style="fill:var(--ink)">פיתול החגורה</text><text x="182" y="108" class="t-xs t-mid" style="fill:var(--ink)">קורפוס קלוסום</text><text x="175" y="136" class="t-xs t-mid" style="fill:var(--ink)">תלמוס</text>`;
      s+=`<text x="282" y="164" class="t-xs t-mid" style="fill:var(--ink)">קליפת ראייה</text><text x="282" y="175" class="t-xs t-mid" style="fill:var(--ink)">ראשונית</text><text x="272" y="234" class="t-xs t-mid" style="fill:var(--ink)">מוחון</text>`;
      [['מוח קדמי בזלי',196,106,155],['⁧אמיגדלה (עמוקה)⁩',212,120,180],['אנטורינלית',228,122,193],['טרנס־אנטורינלית',244,132,206]].forEach(([l,y,ax,ay])=>{
        s+=`<text x="94" y="${y}" class="t-xs t-end" style="fill:var(--ink)">${l}</text><path d="M97 ${y-3} L${ax} ${ay}" style="stroke:var(--muted);stroke-width:1"/><circle cx="${ax}" cy="${ay}" r="1.8" style="fill:var(--ink)"/>`});
      s+=`<text x="172" y="238" class="t-xs t-mid" style="fill:var(--ink)">⁧היפוקמפוס (עמוק)⁩</text><path d="M182 229 L182 186" style="stroke:var(--muted);stroke-width:1"/>`;
    }
    return s+'</g>';
  }
  function draw(t){
    const N=vb(svg,'720 430','400 690');
    const L=N?{lat:[35,44],med:[35,340],bar:[12,618,376]}:{lat:[15,44],med:[375,44],bar:[20,326,680]};
    const sg=stageOf(t),C=tau?'var(--rose)':'var(--amber)';
    const V=k=>{if(tau){const m=BMAP[k];return m?kv(BK[m],sg):0}const m=TMAP[k];return m?kv(TK[m],sg):0};
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    s+=view('L',L.lat[0],L.lat[1],V,C)+view('M',L.med[0],L.med[1],V,C);
    // stage bar
    const [bx,by,W]=L.bar,n=tau?6:5,gap=6,bw=(W-gap*(n-1))/n,cur=Math.floor(sg+.02);
    const RO=['I','II','III','IV','V','VI'],abc=tau?['B0','B1','B1','B2','B2','B3','B3'][cur]:['A0','A1','A1','A2','A3','A3'][cur];
    s+=`<text x="${bx}" y="${by}" class="t-sm" style="fill:${C}">${tau?'שלב בראק · סבכי טאו':'שלב תאל · עמילואיד'}</text><text x="${bx+W}" y="${by}" class="t-sm t-end" style="fill:var(--ink)">ABC: ${abc}</text>`;
    for(let k=1;k<=n;k++){const x=bx+(k-1)*(bw+gap),reached=k<=cur,isCur=k===cur,part=clamp(sg-(k-1));
      s+=`<rect x="${f1(x)}" y="${by+8}" width="${f1(bw)}" height="28" rx="7" style="fill:var(--panel);stroke:${reached?C:'var(--line)'};stroke-width:${isCur?2.4:1.2}"/>`;
      if(part>0)s+=`<rect x="${f1(x+2)}" y="${by+31}" width="${f1((bw-4)*part)}" height="3" rx="1.5" style="fill:${C}"/>`;
      s+=`<text x="${f1(x+bw/2)}" y="${by+27}" class="t-lbl t-mid" style="fill:${reached?'var(--ink)':'var(--muted)'}">${tau?RO[k-1]:k}</text>`}
    if(tau){[['טרנס־אנטורינלי',1],['לימבי',3],['איזוקורטיקלי',5]].forEach(([l,k])=>{const x1=bx+(k-1)*(bw+gap),x2=x1+2*bw+gap,on=cur>=k&&cur<=k+1;
      s+=`<path d="M${f1(x1+4)} ${by+42} v4 H${f1(x2-4)} v-4" style="fill:none;stroke:${on?C:'var(--muted)'};stroke-width:1.2"/><text x="${f1((x1+x2)/2)}" y="${by+60}" class="t-xs t-mid" style="fill:${on?'var(--ink)':'var(--muted)'}">${l}</text>`})}
    else if(!N){const TL=[['ניאוקורטקס'],['‏+ היפוקמפוס','‏+ אנטורינלית'],['‏+ תלמוס','‏+ סטריאטום','‏+ מוח קדמי בזלי'],['‏+ גזע המוח'],['‏+ מוחון']];
      TL.forEach((ls,i)=>{const x=bx+i*(bw+gap)+bw/2,on=i+1<=cur;ls.forEach((l,j)=>s+=`<text x="${f1(x)}" y="${by+54+j*13}" class="t-xs t-mid" style="fill:${on?'var(--ink)':'var(--muted)'}">${l}</text>`)})}
    else{const TN=['עדיין אין משקעי עמילואיד','שלב 1: ניאוקורטקס','שלב 2 מוסיף היפוקמפוס וקליפה אנטורינלית','שלב 3 מוסיף תלמוס, סטריאטום','שלב 4 מוסיף את גזע המוח','שלב 5 מוסיף את המוחון'];
      s+=`<text x="${bx}" y="${by+54}" class="t-xs" style="fill:var(--ink)">${TN[cur]}</text>`;if(cur===3)s+=`<text x="${bx}" y="${by+67}" class="t-xs" style="fill:var(--ink)">ומוח קדמי בזלי</text>`}
    svg.innerHTML=s;
    const ST=steps(),p=phaseOf(ST,t);setSt(p);$('#brNote').innerHTML=noteHTML(ST[p]);
  }
  const stop=playWire(rg,$('#brPlay'),draw,15000,'הפעלה חוזרת','brain');
  const stEl=$('#brSteps');stEl.setAttribute('role','group');stEl.setAttribute('aria-label','שלבים');
  const renderSteps=()=>{stEl.innerHTML=steps().map((s,i)=>`<button data-st="${i}" aria-pressed="false"><b>${String(i).padStart(2,'0')}</b><span>${s.k}</span></button>`).join('')};
  stEl.addEventListener('click',e=>{const b=e.target.closest('[data-st]');if(!b)return;stop();const s=steps()[+b.dataset.st];rg.value=s.at;draw(s.at)});
  const setSt=i=>{$$('[data-st]',stEl).forEach((b,k)=>b.setAttribute('aria-pressed',k===i));const s=steps()[i];rg.setAttribute('aria-valuetext',`${tau?'שלב בראק':'שלב תאל'} ${i} מתוך ${steps().length-1}: ${s.t}`)};
  const setMode=v=>{tau=v;$('#brTau').setAttribute('aria-pressed',v);$('#brAmy').setAttribute('aria-pressed',!v);renderSteps();draw(+rg.value)};
  $('#brTau').onclick=()=>setMode(true);$('#brAmy').onclick=()=>setMode(false);
  renderSteps();draw(+rg.value);

  /* ---- 2. the memory circuit ---- */
  const ci=$('#brCi'),cr=$('#brCiT');
  const bz=(P,u)=>{const a=(1-u)**3,b=3*(1-u)**2*u,c=3*(1-u)*u*u,d=u**3;return [a*P[0]+b*P[2]+c*P[4]+d*P[6],a*P[1]+b*P[3]+c*P[5]+d*P[7]]};
  const pd=P=>`M${P[0]} ${P[1]} C${P[2]} ${P[3]} ${P[4]} ${P[5]} ${P[6]} ${P[7]}`;
  const LOOP=[[118,256,160,300,200,312,236,302],[322,296,350,280,352,230,342,200],[338,112,340,90,332,72,324,64],[198,72,186,88,178,104,172,120],[150,134,134,116,120,96,112,84]];
  const G={
   ec4:{cells:[0,1,2,3,4].map(i=>[28+i*20,70,7]),ord:[2,0,4,1,3]},
   ec2:{cells:[...Array(10)].map((_,i)=>[28+(i%5)*20,236+Math.floor(i/5)*26,7]),ord:[3,7,0,5,9,2,6,1,8,4]},
   ca1:{cells:[...Array(10)].map((_,i)=>[196+i*14,62-8*Math.sin(Math.PI*i/9),6]),ord:[4,1,7,9,2,5,0,8,3,6]},
   sub:{cells:[[150,140,7],[168,128,7],[186,140,7]],ord:[0,1,2]},
   ca3:{cells:[0,1,2,3].map(i=>[340,120+i*22,7]),ord:[0,1,2,3]},
   dg:{cells:[...Array(6)].map((_,i)=>[240+i*16,300+6*Math.sin(Math.PI*i/5),5]),ord:[0,1,2,3,4,5]}};
  function group(g,loss,tg,col){let s='';const lc=loss*g.cells.length;
    g.cells.forEach((c,i)=>{const r=g.ord.indexOf(i),dead=clamp(lc-r),[x,y,rr]=c;
      if(dead<1)s+=neuron(x,y,rr,1-dead*.8,{axon:-Math.PI/2,axonLen:0,dendrites:3,col,fill:'var(--cell)'});
      if(dead>0)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${rr}" style="fill:none;stroke:var(--muted);stroke-width:1;stroke-dasharray:2 2;opacity:${f1(dead*.7)}"/>`;
      if(tg&&tg(i)>0)s+=tangle(x,y,rr*.85,tg(i)*(dead>0?.5:1))});
    return s}
  function drawCi(t){
    const N=vb(ci,'720 410','400 750');
    const L=N?{c:[8,8],nb:[60,372],mr:[60,566]}:{c:[20,24],nb:[430,30],mr:[430,228]};
    const ec2=.6*ease(ramp(t,.35,.5))+.3*ease(ramp(t,.86,.96)),ec4=.4*ease(ramp(t,.35,.5)),ca1=.69*ease(ramp(t,.55,.68)),nbm=.75*ease(ramp(t,.72,.84));
    const tgE=ramp(t,.15,.3),tgC=ramp(t,.2,.35);
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/><defs>${marker('brCiA','var(--violet)')}</defs>`;
    s+=`<g transform="translate(${L.c[0]} ${L.c[1]})">`;
    // pathways, dimmed by upstream loss
    const up=[1-ec2,1-ec2,1-ec2,(1-ec2)*(1-ca1),(1-ec2)*(1-ca1)];
    LOOP.forEach((P,i)=>s+=`<path d="${pd(P)}" style="fill:none;stroke:var(--violet);stroke-width:2.2;opacity:${f1(.25+.6*up[i])}" marker-end="url(#brCiA)"/>`);
    s+=`<text x="16" y="30" class="t-sm">קליפת המוח האנטורינלית</text>`;
    s+=group(G.ec4,ec4,()=>tgE*.8,'var(--cell-line)')+group(G.ec2,ec2,i=>i%2?tgE:0,'var(--cell-line)');
    s+=group(G.sub,0,()=>ramp(t,.22,.36),'var(--cell-line)')+group(G.ca1,ca1,i=>i%3===1?tgC:0,'var(--cell-line)');
    s+=group(G.ca3,0,null,'var(--cell-line)')+group(G.dg,0,null,'var(--cell-line)');
    s+=`<text x="16" y="102" class="t-xs" style="fill:var(--ink)">⁧שכבה IV${ec4>.01?` · <tspan style="fill:var(--rose)">−${Math.round(ec4*100)}%</tspan>`:''}⁩</text>`;
    s+=`<text x="16" y="294" class="t-xs" style="fill:var(--ink)">⁧שכבה II${ec2>.01?` · <tspan style="fill:var(--rose)">−${Math.round(ec2*100)}%</tspan>`:''}⁩</text>`;
    s+=`<text x="168" y="168" class="t-xs t-mid" style="fill:var(--ink)">סוביקולום</text><text x="259" y="26" class="t-lbl t-mid">CA1</text>`;
    if(ca1>.01)s+=`<text x="259" y="41" class="t-xs t-mid" style="fill:var(--rose)">${ca1>.68?'נוירונים: מ־14.1 ל־4.4 מיליון':'נוירונים אובדים'}</text>`;
    s+=`<text x="326" y="164" class="t-lbl t-end">CA3</text><text x="280" y="336" class="t-xs t-mid" style="fill:var(--ink)">גירוס דנטטי</text>`;
    s+=`<text x="112" y="322" class="t-xs">מסלול חודר</text><text x="334" y="252" class="t-xs t-end">סיבים אזוביים</text><text x="330" y="104" class="t-xs t-end">קולטרלות שפר</text>`;
    // signals travelling round the loop
    [0,2.5].forEach(off=>{const u=((t*28+off)%5+5)%5,seg=Math.floor(u),f=u-seg,[x,y]=bz(LOOP[seg],f);
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="5" style="fill:var(--violet);opacity:${f1(.15+.85*up[seg])}"/>`});
    s+='</g>';
    // basal forebrain panel
    s+=`<g transform="translate(${L.nb[0]} ${L.nb[1]})"><text x="0" y="12" class="t-sm">מוח קדמי בזלי ← קליפת המוח</text>`;
    s+=`<rect x="0" y="24" width="280" height="28" rx="6" style="fill:var(--panel-2)"/><text x="8" y="42" class="t-xs" style="fill:var(--ink)">קליפת המוח</text>`;
    for(let i=0;i<12;i++){const vis=clamp((1-nbm)*12-i);s+=`<circle cx="${70+i*17}" cy="38" r="3.5" style="fill:var(--sage);opacity:${f1(.12+.88*vis)}"/>`}
    s+=`<text x="276" y="20" class="t-xs t-end">אצטילכולין</text>`;
    const nord=[1,3,0,2],lc=nbm*4;
    for(let i=0;i<4;i++){const dead=clamp(lc-nord.indexOf(i)),x=50+i*60;
      s+=neuron(x,128,10,1-dead*.75,{axon:-Math.PI/2,axonLen:74,dendrites:4,dead,col:dead>.5?'var(--muted)':'var(--sage)'})}
    s+=`<text x="140" y="168" class="t-xs t-mid" style="fill:var(--ink)">הגרעין הבזאלי של מיינרט</text>`;
    if(nbm>.01)s+=`<text x="140" y="182" class="t-xs t-mid" style="fill:var(--rose)">${nbm>.74?'יותר מ־75% מהנוירונים אבדו':'נוירונים כולינרגיים מתים'}</text>`;
    s+='</g>';
    // MRI panel
    const yrs=5*ramp(t,.86,1),va=Math.pow(1-.0466,yrs),vc=Math.pow(1-.0141,yrs);
    const HS='M-40 10 C-40 -14 -14 -24 6 -18 C26 -12 40 -20 44 -8 C48 4 32 6 22 4 C8 2 -2 14 -14 18 C-28 22 -40 22 -40 10 Z';
    s+=`<g transform="translate(${L.mr[0]} ${L.mr[1]})"><text x="0" y="12" class="t-sm">⁧נפח ההיפוקמפוס ב־MRI⁩</text><text x="280" y="12" class="t-xs t-end" style="fill:var(--ink)">שנה ${f1(yrs)}</text>`;
    [[70,va,'var(--violet)','var(--violet-soft)','אלצהיימר','ירידה של 4.66% בשנה'],[210,vc,'var(--sage)','var(--sage-soft)','ביקורת','ירידה של 1.41% בשנה']].forEach(([x,v,c,cs,l1,l2])=>{
      s+=`<path d="${HS}" transform="translate(${x} 70) scale(1.18)" style="fill:none;stroke:var(--line);stroke-width:1;stroke-dasharray:3 3"/>`;
      s+=`<path d="${HS}" transform="translate(${x} 70) scale(${(1.18*Math.sqrt(v)).toFixed(3)})" style="fill:${cs};stroke:${c};stroke-width:1.6"/>`;
      s+=`<text x="${x}" y="122" class="t-lbl t-mid">${l1}</text><text x="${x}" y="138" class="t-xs t-mid">${l2}</text>`});
    s+=`<text x="140" y="164" class="t-xs t-mid" style="fill:var(--ink)">${yrs<.05?'לחצו הפעלה: 5 שנים בשיעורים שפורסמו':`נותרו ${Math.round(va*100)}% לעומת ${Math.round(vc*100)}% מהנפח ההתחלתי`}</text></g>`;
    ci.innerHTML=s;
    const p=phaseOf(BR_CI,t);setCi(p);$('#brCiNote').innerHTML=noteHTML(BR_CI[p]);
  }
  const stopC=playWire(cr,$('#brCiPlay'),drawCi,18000,'הפעלה חוזרת','brain');
  const setCi=stepWire($('#brCiSteps'),BR_CI,cr,drawCi,stopC);
  drawCi(+cr.value);

  /* ---- 3. ABC score ---- */
  const abc={a:2,b:2,c:2};
  const level=(a,b,c)=>a===0?'ללא':b<=1?'נמוכה':a===1?(c<=1?'נמוכה':'בינונית'):a===2?'בינונית':(b===3&&c>=2?'גבוהה':'בינונית');
  const ROWS=[['A0','כל C',0,[0,1,2,3]],['A1','C0 או C1',1,[0,1]],['A1','C2 או C3',1,[2,3]],['A2','כל C',2,[0,1,2,3]],['A3','C0 או C1',3,[0,1]],['A3','C2 או C3',3,[2,3]]];
  function drawAbc(){
    const L=level(abc.a,abc.b,abc.c),lv=['ללא','נמוכה','בינונית','גבוהה'];
    $$('[data-abc]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.v===abc[b.dataset.abc]));
    $('#brAbcOut').innerHTML=`<span class="kicker">A${abc.a} + B${abc.b} + C${abc.c}</span><span class="br-res">${L}</span>
      <div class="br-scale" aria-hidden="true">${lv.map(x=>`<span class="${x===L?'on':''}">${x}</span>`).join('')}</div>
      <p>${L==='בינונית'||L==='גבוהה'?'נחשב הסבר מספיק לדמנציה.':L==='נמוכה'?'לבדו אינו נחשב הסבר מספיק לדמנציה.':'אין שינוי נוירופתולוגי של אלצהיימר.'}</p>`;
    const col=abc.b<=1?0:abc.b-1;
    let h='<thead><tr><th>A (תאל)</th><th>C (CERAD)</th><th>B0 או B1</th><th>B2</th><th>B3</th></tr></thead><tbody>';
    ROWS.forEach(([a,c,ai,cs])=>{const hit=ai===abc.a&&cs.includes(abc.c);
      h+=`<tr><th>${a}</th><td>${c}</td>`+[1,2,3].map((b,j)=>`<td class="${hit&&j===col?'on':''}">${level(ai,b,cs[cs.length-1])}</td>`).join('')+'</tr>'});
    $('#brAbcTbl').innerHTML=h+'</tbody>';
  }
  $$('[data-abc]').forEach(b=>b.addEventListener('click',()=>{abc[b.dataset.abc]=+b.dataset.v;drawAbc()}));
  drawAbc();
};
