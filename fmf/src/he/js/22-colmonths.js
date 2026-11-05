
/* =============== 2.2 colchicine over months =============== */
const CM_STEPS=[
 {from:0,at:.05,k:'חודשים −3 עד 0',t:'לפני הטיפול',
  txt:'ללא טיפול, התקפים מופיעים כל כמה שבועות. רמת ה־SAA מזנקת בזמן התקפים (חציון של 693 mg/L בקבוצה אחת), ואצל חלק מהחולים היא נשארת מעל התקין גם בין התקפים. SAA שנשאר גבוה לאורך זמן הוא הדלק של העמילואידוזיס. [[Lachmann2006,Lachmann2007]]',
  pt:'לפני הטיפול, ההתקפים ממשיכים להגיע, ודלקת סמויה נמשכת גם ביניהם.',
  hook:'מטפלים לקראת שני יעדים: <b>ללא התקפים</b> ו־<b>SAA/CRP תקינים בין התקפים</b>.'},
 {from:.111,at:.13,k:'ימים 1–14',t:'התרופה מצטברת בתאי הדם הלבנים',
  txt:'אחרי כל מנה, הרמה בלויקוציטים מגיעה לשיא כעבור כיומיים. עם זמן מחצית חיים של כ־27–31 שעות במתן חוזר, הרמות בפלזמה מתקרבות למצב יציב (steady state) בתוך כשבוע, והרמות בלויקוציטים נבנות לאורך פרק זמן דומה או מעט ארוך יותר. זוהי הערכה פרמקוקינטית, לא תוצאה של ניסוי. [[Chappey1993,FDA-Colcrys,BenChetrit2018Textbook]]',
  pt:'בשבוע או בשבועיים הראשונים התרופה עדיין מצטברת בתוך תאי הדם הלבנים.',
  hook:'קולכיצין הוא <b>טיפול מונע</b> יומי. בזמן התקף, לפי ההנחיות ממשיכים במינון הרגיל ומוסיפים NSAIDs.'},
 {from:.15,at:.19,k:'חודשים 1–3',t:'פחות התקפים, וזה ניכר לאט',
  txt:'מכיוון שמלכתחילה היו בין ההתקפים שבועות, נדרשים חודשים של מעקב כדי לראות שהם נעשו נדירים יותר. EULAR 2016 המליץ לבחון את התגובה, את הרעילות ואת ההיענות לטיפול כל 6 חודשים; קונצנזוס גרמני של טיפול מכוון יעד (treat-to-target) מציע כל 3–6 חודשים. בניסויים מבוקרי הפלצבו של 1974 היו תקופות הטיפול באורך 2–3 חודשים. [[Ozen2016,Ozen2017,Ehlers2023,Zemer1974,Goldstein1974]]',
  pt:'ההתקפים מופיעים לעיתים רחוקות יותר, אבל מבחינים בכך רק אחרי כמה חודשים, כי ממילא היו ביניהם שבועות.',
  hook:'התגובה מוערכת לאורך חודשים. אל תגדירו מישהו כעמיד לקולכיצין אחרי כמה שבועות בלבד.'},
 {from:.222,at:.27,k:'חודשים 3–6',t:'התאמת המינון',
  txt:'אם ההתקפים או המדדים המוגברים נמשכים, ההנחיות ממליצות להעלות את המינון בהדרגה (לרוב בצעדים של 0.25–0.5 mg) עד המינון המרבי הנסבל, לבדוק CRP או SAA לפחות כל 3 חודשים בזמן ההעלאה, ולוודא קודם את ההיענות לטיפול. EULAR 2016 הציע לחשוב על עמידות כשנמשך ≥1 התקף בחודש אחרי ≥6 חודשים במינון המרבי הנסבל. קונצנזוס מ־2021 משתמש בהגדרה של ≥1 התקף בחודש לאורך 3 חודשים, או דלקת מעבדתית מתמשכת. [[Ozen2017,Ehlers2023,Ozen2021]]',
  pt:'אם ההתקפים נמשכים, הרופאים בדרך כלל מעלים את המינון צעד אחר צעד, ובודקים שהכדורים אכן נלקחים כל יום.',
  hook:'לפני "עמידות": לוודא היענות לטיפול, ואז להעלות את המינון עד המרב.'},
 {from:.333,at:.6,k:'חודשים 6–24',t:'SAA חוזר לתקין, וההגנה מצטברת',
  txt:'בשליטה מלאה, ה־SAA בין התקפים יורד לטווח התקין. אצל ילדים עם SAA גבוה, העלאת מינון הורידה את ה־SAA החציוני מ־244 ל־35.5 mg/L בתוך 2 חודשים. נטילה סדירה של קולכיצין מונעת עמילואידוזיס מסוג AA גם אצל חולים שיש להם התקפים מדי פעם. הטיפול הוא לכל החיים; EULAR 2016 התיר לשקול הפחתת מינון רק אחרי 5 שנים ומעלה ללא התקפים, עם מדדים תקינים. [[Duzova2003,Zemer1986,Lachmann2007,Ozen2017]]',
  pt:'עם הזמן הדלקת הסמויה שוככת, וזה מגן על הכליות לטווח הארוך. הטיפול נמשך כל החיים.',
  hook:'התפקיד החשוב ביותר של קולכיצין הוא מניעת <b>עמילואידוזיס</b>. השליטה בהתקפים היא רק החלק הנראה לעין.'}
];
const CM_SC={
 full:{n:'תגובה מלאה',eff:[.95,.95],off:[]},
 partial:{n:'תגובה חלקית',eff:[.6,.82],off:[]},
 miss:{n:'מנות רבות שהוחמצו',eff:[.95,.95],off:[[150,215],[330,380],[500,575]]},
 resist:{n:'עמיד לקולכיצין',eff:[.3,.38],off:[]}
};
inits.colmonths=()=>{
  const svg=$('#cmSvg'),rg=$('#cmT');let sc='full';const D0=-90,D1=730,ND=D1-D0;
  function sim(key){const S=CM_SC[key],r=rng(key.length*131+7);const lv=[],ct=[],saa=[],att=[],dose=[],cum=[];let L=0,C=0,cu=0,spike=0;
    for(let i=0;i<=ND;i++){const d=D0+i;const on=d>=0&&!S.off.some(([a,b])=>d>=a&&d<b);
      const dz=d<0?0:(key!=='full'&&d>=120?1:.67);dose.push(dz);
      const target=on?dz/1:0;L+=(target-L)*(on?1/5:1/4);lv.push(L);
      C+=(L-C)/40;ct.push(C);
      const eff=d>=120?S.eff[1]:S.eff[0];const rate=1.6/30*(1-eff*clamp(C*1.25));
      if(r()<rate&&!(att.length&&d-att[att.length-1]<6))att.push(d);
      if(att.length&&att[att.length-1]===d)spike=1;else spike*=.6;
      const base=3+40*(1-eff*clamp(C*1.25));saa.push(base+600*spike);
      cu+=Math.max(0,saa[i]-10);cum.push(cu)}
    return{lv,ct,saa,att,dose,cum}}
  const UNT=(()=>{const s=sim('resist');return s})();
  const SIM={};Object.keys(CM_SC).forEach(k=>SIM[k]=sim(k));
  const untreatedCum=(()=>{let cu=0;const out=[];const r=rng(9);let spike=0,last=-99;for(let i=0;i<=ND;i++){const d=D0+i;if(r()<1.6/30&&d-last>6){last=d;spike=1}else spike*=.6;cu+=Math.max(0,43+600*spike-10);out.push(cu)}return out})();
  function draw(t){
    const _d=Math.round(D0+t*ND), _inset=_d>=0&&_d<60;
    const N=vb(svg,'720 470',_inset?'400 566':'400 452');
    const X0=N?46:70, X1=N?392:700, xd=d=>lerp(X0,X1,(d-D0)/ND);
    const y1=N?26:24,h1=N?70:78, y2=N?128:130,h2=N?56:68, y3=N?210:226,h3=N?86:96, y4=N?322:348,h4=N?70:78;
    const gridBot=y4+h4, axisY=gridBot+16;
    const S=SIM[sc],dNow=Math.round(D0+t*ND),iNow=dNow-D0;let s=`<defs>${marker('cmA')}</defs>`;
    const panel=(y0,h,title,c)=>`<text x="${X0}" y="${y0-3}" class="t-sm" style="fill:${c}">${title}</text><line x1="${X0}" x2="${X1}" y1="${y0+h}" y2="${y0+h}" class="axis"/>`;
    // month grid
    for(const m of (N?[-3,0,6,12,18,24]:[-3,0,3,6,9,12,15,18,21,24])){const x=xd(m*30.4);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="16" y2="${gridBot}" class="grid"/><text x="${f1(x)}" y="${axisY}" class="t-xs t-mid">${m}</text>`}
    s+=N?`<text x="${X0}" y="${axisY+16}" class="t-xs">חודשים מתחילת הטיפול · <tspan style="fill:var(--warn)">מודל להמחשה</tspan></text>`:`<text x="${X1}" y="468" class="t-xs t-end">חודשים מתחילת הקולכיצין</text><text x="${X0}" y="468" class="t-xs" style="fill:var(--warn)">מודל להמחשה · לא קינטיקה שנמדדה</text>`;
    s+=`<rect x="${f1(xd(0))}" y="14" width="${f1(X1-xd(0))}" height="${gridBot-14}" style="fill:var(--crocus-soft);opacity:.35"/>`;
    // panel 1 drug
    s+=panel(y1,h1,'קולכיצין בתוך הלויקוציטים · מקווקו = המינון שנרשם','var(--crocus)');
    const sl=(arr,mx,y0,h)=>{let d='';for(let i=0;i<=iNow;i+=2)d+=(i?'L':'M')+f1(xd(D0+i))+' '+f1(y0+h-h*clamp(arr[i]/mx));return d};
    s+=`<path d="${sl(S.lv,1.05,y1,h1)}" style="fill:none;stroke:var(--crocus);stroke-width:2.5"/>`;
    s+=`<path d="${sl(S.dose,1.05,y1,h1)}" style="fill:none;stroke:var(--muted);stroke-width:1.2;stroke-dasharray:4 4"/>`;
    CM_SC[sc].off.forEach(([a,b])=>{if(a<=dNow)s+=`<rect x="${f1(xd(a))}" y="${y1+14}" width="${f1(xd(Math.min(b,dNow))-xd(a))}" height="${h1-14}" style="fill:var(--bad);opacity:.12"/><text x="${f1(xd(a)+3)}" y="${y1+26}" class="t-xs" style="fill:var(--bad)">מנות שהוחמצו</text>`});
    // inset: first 3 weeks
    if(dNow>=0&&dNow<60){const ix=N?X0:430,iy=N?axisY+30:30,iw=N?(X1-X0):260,ih=70,k=clamp(dNow/21);s+=`<rect x="${ix}" y="${iy}" width="${iw}" height="${ih}" rx="8" style="fill:var(--panel);stroke:var(--line)"/><text x="${ix+8}" y="${iy+14}" class="t-xs">\u2067הגדלה · 21 הימים הראשונים\u2069</text>`;
      let pd='',ld='';for(let i=0;i<=200*k;i++){const day=i/200*21,ph=day%1;const p=(ph<.06?ph/.06:Math.exp(-(ph-.06)*2.2))*.55+.05;const l=1-Math.exp(-day/4);const x=ix+10+i/200*(iw-20);pd+=(i?'L':'M')+f1(x)+' '+f1(iy+ih-6-(ih-24)*p);ld+=(i?'L':'M')+f1(x)+' '+f1(iy+ih-6-(ih-24)*l)}
      s+=`<path d="${pd}" style="fill:none;stroke:var(--bad);stroke-width:1.2"/><path d="${ld}" style="fill:none;stroke:var(--crocus);stroke-width:2.2"/><text x="${ix+iw-8}" y="${iy+14}" class="t-xs t-end"><tspan style="fill:var(--bad)">פלזמה</tspan> · <tspan style="fill:var(--crocus)">לויקוציטים</tspan></text>`}
    // panel 2 attacks
    s+=panel(y2,h2,'התקפים','var(--terra)');
    S.att.filter(d=>d<=dNow).forEach(d=>{const x=xd(d);s+=`<path d="M${f1(x-4)} ${y2+h2} L${f1(x)} ${y2+20} L${f1(x+4)} ${y2+h2}z" style="fill:var(--terra)"/>`});
    // panel 3 SAA log
    const lg=v=>clamp(Math.log10(Math.max(1,v))/3);
    s+=panel(y3,h3,'\u2067SAA (סולם לוגריתמי, mg/L)\u2069','var(--gold)');
    s+=`<rect x="${X0}" y="${f1(y3+h3-h3*lg(10))}" width="${X1-X0}" height="${f1(h3*lg(10))}" style="fill:var(--good-soft);opacity:.8"/><text x="${X1-4}" y="${f1(y3+h3-4)}" class="t-xs t-end" style="fill:var(--good)">\u2067טווח תקין (&lt;10)\u2069</text>`;
    [1,10,100,1000].forEach(v=>s+=`<text x="${X0-6}" y="${f1(y3+h3-h3*lg(v)+3)}" class="t-xs t-end">${v}</text>`);
    let sd='';for(let i=0;i<=iNow;i++)sd+=(i?'L':'M')+f1(xd(D0+i))+' '+f1(y3+h3-h3*lg(S.saa[i]));s+=`<path d="${sd}" style="fill:none;stroke:var(--gold);stroke-width:1.6"/>`;
    // panel 4 cumulative inflammatory burden
    const mx=untreatedCum[ND];s+=panel(y4,h4,'\u2067עומס SAA מצטבר · מקווקו = ללא טיפול כלל\u2069','var(--bad)');
    let ud='';for(let i=0;i<=ND;i+=4)ud+=(i?'L':'M')+f1(xd(D0+i))+' '+f1(y4+h4-h4*untreatedCum[i]/mx);s+=`<path d="${ud}" style="fill:none;stroke:var(--muted);stroke-width:1.4;stroke-dasharray:5 4"/>`;
    let cd='';for(let i=0;i<=iNow;i+=2)cd+=(i?'L':'M')+f1(xd(D0+i))+' '+f1(y4+h4-h4*S.cum[i]/mx);s+=`<path d="${cd}" style="fill:none;stroke:var(--bad);stroke-width:2.6"/>`;
    s+=`<line x1="${f1(xd(dNow))}" x2="${f1(xd(dNow))}" y1="14" y2="${gridBot+2}" style="stroke:var(--ink);stroke-width:1.2;opacity:.4"/>`;
    s+=`<text x="${f1(xd(0)+4)}" y="${y2+12}" class="t-xs" style="fill:var(--crocus)">\u2067הקולכיצין מתחיל ↓\u2069</text>`;
    svg.innerHTML=s;
    const p=phaseOf(CM_STEPS,t);setSt(p);
    const last90=S.att.filter(d=>d<=dNow&&d>dNow-90).length;
    const months=(dNow/30.4);
    $('#cmRead').innerHTML=`<span>חודש <b>\u2066${months.toFixed(1)}\u2069</b></span><span>התקפים ב־90 הימים האחרונים <b>${last90}</b></span><span>SAA היום <b>${Math.round(S.saa[iNow])} mg/L</b></span><span>התרופה בלויקוציטים <b>${S.dose[iNow]>0?Math.min(100,Math.round(100*S.lv[iNow]/S.dose[iNow])):0}%</b> מהמצב היציב במינון הנוכחי</span>`;
    let extra='';
    if(sc==='partial')extra='<div class="kv"><div><dt>התרחיש הזה</dt><dd>ההתקפים פוחתים אבל לא נפסקים. בחודש 4 המינון מועלה (הקו המקווקו עולה מדרגה), וזה עוזר עוד. אם ה־SAA או ההתקפים נמשכים במינון המרבי הנסבל, ההנחיות מוסיפות חסימה של IL-1. [[Ozen2016]]</dd></div></div>';
    if(sc==='miss')extra='<div class="kv"><div><dt>התרחיש הזה</dt><dd>כל הפסקה בנטילה מאפשרת לרמות בלויקוציטים להתרוקן בתוך ימים, וההתקפים וה־SAA חוזרים באיחור מסוים. היענות נמוכה לטיפול שכיחה: במרפאה ישראלית אחת רק 13% מילאו כל מרשם במשך שנה. זו סיבה שכיחה לעמידות לכאורה, ובקבוצה של Zemer היא הייתה ההבדל בין 1.7% ל־48.9% שפיתחו פרוטאינוריה. [[BenChetrit2009D,Zemer1986,Ozen2017]]</dd></div></div>';
    if(sc==='resist')extra='<div class="kv"><div><dt>התרחיש הזה</dt><dd>בערך 5–10% מהחולים ממשיכים לסבול מהתקפים או ממדדים מוגברים למרות המינון המרבי הנסבל, ועוד 2–5% אינם יכולים לסבול אותו. בדרך כלל ממשיכים בקולכיצין, כי ייתכן שהוא עדיין מוריד את הסיכון לעמילואיד, ומוסיפים חוסם IL-1. [[Ozen2017,BenChetrit2018Textbook,Ozen2025,DeBenedetti2018]]</dd></div></div>';
    $('#cmNote').innerHTML=noteHTML(CM_STEPS[p])+extra;
  }
  const stop=playWire(rg,$('#cmPlay'),draw,22000,'הפעלה חוזרת','colmonths');
  const setSt=stepWire($('#cmSteps'),CM_STEPS,rg,draw,stop);
  $$('[data-cm]').forEach(b=>b.onclick=()=>{sc=b.dataset.cm;$$('[data-cm]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)});
  draw(+rg.value);

  /* long view: decades */
  const ls=$('#cmLong'),lr=$('#clT');
  // anchored on Zemer 1986: cumulative proteinuria 48.9% at 9 y without adherence, 1.7% at 11 y with adherence
  const untreated=y=>1-Math.exp(-y*0.0746),adherent=y=>1-Math.exp(-y*0.00156);
  function drawL(t){const NL=vb(ls,'720 260','400 300');const Y=t*12;const x0=NL?46:60,x1=NL?392:700,y0=20,y1=NL?236:210,xy=y=>lerp(x0,x1,y/12),yv=v=>lerp(y1,y0,v/.7);let s='';
    [0,.2,.4,.6].forEach(v=>s+=`<line x1="${x0}" x2="${x1}" y1="${f1(yv(v))}" y2="${f1(yv(v))}" class="grid"/><text x="${x0-6}" y="${f1(yv(v)+3)}" class="t-xs t-end">${Math.round(v*100)}%</text>`);
    (NL?[0,4,8,12]:[0,2,4,6,8,10,12]).forEach(y=>s+=`<text x="${f1(xy(y))}" y="${y1+18}" class="t-xs t-mid">${y}</text>`);
    s+=`<text x="${x1}" y="${y1+36}" class="t-xs t-end">שנים</text><text x="${x0}" y="14" class="t-xs">\u2067סיכון מצטבר לעמילואידוזיס מסוג AA (סכמטי)\u2069</text>`;
    s+=`<path d="${pathFn(u=>u*12<=Y?untreated(u*12)/.7:NaN,x0,x1,y1,y0).replace(/[ML][^ML]*NaN[^ML]*/g,'')}" style="fill:none;stroke:var(--bad);stroke-width:3"/>`;
    s+=`<path d="${pathFn(u=>u*12<=Y?adherent(u*12)/.7:NaN,x0,x1,y1,y0).replace(/[ML][^ML]*NaN[^ML]*/g,'')}" style="fill:none;stroke:var(--crocus);stroke-width:3"/>`;
    s+=`<text x="${f1(xy(Math.max(2,Math.min(Y,11.5))))}" y="${f1(yv(untreated(Math.max(2,Math.min(Y,11.5))))-8)}" class="t-xs t-end" style="fill:var(--bad)">${NL?'ללא טיפול':'ללא טיפול / ללא היענות'}</text><text x="${f1(xy(Math.max(2,Math.min(Y,11.5))))}" y="${f1(yv(adherent(Math.max(2,Math.min(Y,11.5))))-8)}" class="t-xs t-end" style="fill:var(--crocus)">${NL?'עם היענות':'קולכיצין בהיענות טובה'}</text>`;
    s+=`<circle cx="${f1(xy(9))}" cy="${f1(yv(.489))}" r="5" style="fill:none;stroke:var(--bad);stroke-width:2;opacity:${f1(ramp(Y,10,11))}"/><circle cx="${f1(xy(11))}" cy="${f1(yv(.017))}" r="5" style="fill:none;stroke:var(--crocus);stroke-width:2;opacity:${f1(ramp(Y,10,11))}"/>`;
    ls.innerHTML=s;
    $('#clCap').innerHTML=`שנה ${Y.toFixed(0)}: ללא טיפול ${Math.round(untreated(Y)*100)}% לעומת עם היענות ${(adherent(Y)*100).toFixed(1)}%. העקומות עוברות דרך הנקודות המוקפות בעיגול מתוך Zemer ועמיתיו, 1986: פרוטאינוריה מצטברת של 48.9% אחרי 9 שנים בחולים ללא היענות, ו־1.7% אחרי 11 שנים בחולים עם היענות (1,070 חולים). בין הנקודות האלה ומעבר להן, העקומות הן אינטרפולציות חלקות. הסיכון האמיתי תלוי מאוד בגנוטיפ, במוצא ובארץ. [[Zemer1986,Touitou2007]]`}
  playWire(lr,$('#clPlay'),drawL,9000,'הפעלה חוזרת','colmonths');drawL(+lr.value);
  $('#cmCards').innerHTML=`
   <div class="card"><h4>למה התועלת אינה מיידית</h4><ul><li>התרופה צריכה כמה ימים של נטילה יומית כדי להצטבר בלויקוציטים.</li><li>בין ההתקפים היו שבועות, ולכן הירידה במספרם ניכרת רק לאורך חודשים.</li><li>המינון מותאם בצעדים לאורך חודשים.</li><li>התועלת הגדולה ביותר, מניעת עמילואיד, מצטברת לאורך שנים.</li></ul></div>
   <div class="card"><h4>אי-הבנה נפוצה</h4><p>נטילת קולכיצין נוסף אחרי שהתקף כבר התחיל אינה מה שההנחיות מתארות, וחולים מדווחים לעיתים קרובות שהם עושים זאת. EULAR 2016 ממליץ להמשיך במינון היומי הרגיל בזמן התקף ולהוסיף NSAIDs לתסמינים, תוך שקילת סיבות אחרות לכאב. בנפרד, נאמר שם שאפשר לשקול העלאה זמנית בתקופות של לחץ שידוע שהן מעוררות התקפים, והעלאה בשלב המקדים שלפני התקף מוגדרת שם כלא מוכחת. [[Ozen2016,Ozen2017,Ozen2025]]</p></div>
   <div class="card"><span class="ev early">בדיקת ראיות</span><h4>בסיס הניסויים דק יותר מהמוניטין</h4><p>בניתוח החוזר של Cochrane, רק אחד מהניסויים מבוקרי הפלצבו של 1974 (Goldstein, RR 0.21, רווח סמך 95% 0.05–0.95) היה חיובי בבירור; הניסוי של Zemer מ־1974 לא היה מובהק. אף ניסוי אקראי לא מדד עמילואידוזיס: התועלת הזאת נשענת על הקבוצה של Zemer מ־1986. [[Yin2022,Goldstein1974,Zemer1974,Zemer1986]]</p></div>
   <div class="card"><h4>הגנה גם בלי שלמות</h4><p>גם חולים שעדיין יש להם התקפים מסוימים מוגנים מפני עמילואידוזיס אם הם נוטלים קולכיצין באופן סדיר, כי ה־SAA בין התקפים נשאר נמוך יותר. [[Zemer1986,Lachmann2007]]</p></div>`;
};
