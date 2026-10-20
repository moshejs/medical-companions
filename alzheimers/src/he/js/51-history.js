/* =============== 5.1 history and people =============== */
const HI_ERAS=[
 {y:'1901',t:'אוגוסטה ד׳ בפרנקפורט',
  cap:['\u2067מרץ: בעלה מבחין בחשדנות פרנואידית,\u2069','\u2067ואחריה בבעיות שינה וזיכרון.\u2069','\u2067נובמבר: אלצהיימר בודק אותה בבית החולים\u2069','\u2067הפסיכיאטרי בפרנקפורט. היא בת 50.\u2069','\u2067הקבלה מתוארכת בדרך כלל ל־25 בנוב׳ 1901.\u2069','\u2067היא נשארה שם עד 8 באפריל 1906.\u2069'],
  flag:'תאריך הקבלה, והגילוי מחדש של תיק המטופלת שלה ב־1995, מגיעים דרך Alzforum; למאמר מ־1997 אין תקציר.',
  txt:`במרץ 1901 הבחין בעלה של אוגוסטה ד׳ (אוגוסטה דטר), בת 50, בחשדנות פרנואידית, ואחריה בבעיות שינה וזיכרון, בתוקפנות ובבלבול. אלואיס אלצהיימר בדק אותה בבית החולים הפסיכיאטרי בפרנקפורט בנובמבר 1901, והיא נשארה שם עד מותה ב־8 באפריל 1906. [[Hippius2003]] תאריך הקבלה מצוין בדרך כלל כ־25 בנובמבר 1901, ותיק המטופלת שלה התגלה מחדש בפרנקפורט בדצמבר 1995 על ידי הקבוצה של קונרד מאורר. [[Maurer1997]]`,
  pt:'המחלה נקראת על שם הרופא שעקב אחרי מטופלת אחת, אישה בשנות החמישים לחייה שהזיכרון וההתנהגות שלה השתנו.',
  hook:'המקרה הראשון: אוגוסטה ד׳, שנבדקה על ידי אלואיס אלצהיימר בפרנקפורט בנובמבר 1901.'},
 {y:'1906',t:'ההרצאה בטיבינגן',
  cap:['⁧3 בנובמבר, הכינוס ה־37 של הפסיכיאטרים\u2069','\u2067של דרום־מערב גרמניה, טיבינגן.\u2069','\u2067אלצהיימר מדווח על "תהליך מחלה חמור\u2069','\u2067ומיוחד של קליפת המוח":\u2069','\u2067רבדים וסבכים נוירופיברילריים.\u2069','\u2067ההרצאה עוררה עניין מועט.\u2069','\u2067פורסמה ב־1907, ללא איורים.\u2069'],
  txt:`ב־3 בנובמבר 1906, בכינוס ה־37 של הפסיכיאטרים של דרום־מערב גרמניה בטיבינגן, דיווח אלצהיימר על "תהליך מחלה חמור ומיוחד של קליפת המוח" ותיאר רבדים וסבכים נוירופיברילריים. ההרצאה עוררה עניין מועט. [[Hippius2003]] הוא פרסם את המקרה ב־1907, ללא איורים. [[Hippius2003,BermejoPareja2024]]`,
  pt:'אלצהיימר בחן את המוח שלה במיקרוסקופ וראה שני סוגי נזק, שהם עד היום סימני ההיכר של המחלה.',
  hook:'שני הנגעים שתיאר אלצהיימר ב־1906: רבדים וסבכים נוירופיברילריים.'},
 {y:'1910',t:'קרפלין נותן למחלה שם',
  cap:['\u2067אמיל קרפלין קורא לה "מחלת אלצהיימר"\u2069','\u2067במהדורה ה־8 של ספר הלימוד שלו,\u2069','\u2067Psychiatrie.\u2069','\u2067היסטוריונים עדיין חלוקים מדוע יצר\u2069','\u2067מחלה נפרדת ממקרים כה מעטים.\u2069','\u2067ההפרדה בין הצורה הקדם־סנילית לסנילית\u2069','\u2067בוטלה בכנס בבתסדה ב־1978.\u2069'],
  txt:`קרפלין נתן את השם "מחלת אלצהיימר" במהדורה ה־8 של ספר הלימוד שלו, Psychiatrie (1910). [[Hippius2003,BermejoPareja2024]] היסטוריונים חלוקים מדוע יצר מחלה נפרדת ממקרים כה מעטים; הסבר אחד הוא היריבות בין האסכולות של מינכן ופראג. ההפרדה בין מחלת אלצהיימר הקדם־סנילית לבין דמנציה סנילית בוטלה בכנס בבתסדה ב־1978. [[BermejoPareja2024]]`,
  pt:'במשך עשרות שנים "אלצהיימר" היה שם של מחלה נדירה של אנשים צעירים יחסית. מאז 1978 מכירים באותה מחלה בכל גיל.',
  hook:'קרפלין, Psychiatrie, מהדורה 8, 1910: השם. בתסדה 1978: איחוד הצורה הקדם־סנילית והצורה הסנילית.'},
 {y:'1968',t:'ספירת רבדים בניוקאסל',
  cap:['\u2067בלסד, טומלינסון ורות מודדים רבדים\u2069','\u2067ודמנציה במספרים.\u2069','\u2067יותר רבדים היו קשורים לדמנציה חמורה\u2069','\u2067יותר, אבל רבדים וסבכים נמצאו גם\u2069','\u2067אצל אנשים מבוגרים ללא\u2069','\u2067דמנציה.\u2069'],
  flag:'למאמר מ־1968 אין תקציר; הממצאים שלו מגיעים דרך סקירה היסטורית מ־2024.',
  txt:`בלסד, טומלינסון ורות (ניוקאסל, 1968) השתמשו בשיטות כמותיות והראו שמספר הרבדים מתואם עם חומרת הדמנציה, ושרבדים וסבכים מופיעים גם אצל אנשים מבוגרים ללא דמנציה. [[Blessed1968,BermejoPareja2024]]`,
  pt:'ספירת השינויים, במקום תיאור בלבד, קשרה אותם לחומרת הדמנציה.',
  hook:'בלסד, טומלינסון ורות 1968: מספר הרבדים מתואם עם חומרת הדמנציה.'},
 {y:'⁦1976–82\u2069',t:'העידן הכולינרגי',
  cap:['⁧1976: דייוויס ומלוני מדווחים על אובדן\u2069','\u2067סלקטיבי של נוירונים כולינרגיים.\u2069','⁧1976: כצמן מכנה את אלצהיימר "רוצח\u2069','\u2067מרכזי". מימון ה־NIA גדל אחר כך\u2069','\u2067מ־$19.3 מיליון (1976) ל־$222.6 מיליון (1989).\u2069','⁧1982: ברטוס ועמיתיו מנסחים את\u2069','\u2067ההשערה הכולינרגית של אובדן הזיכרון.\u2069'],
  flag:'למכתב של דייוויס ומלוני ולמאמר המערכת של כצמן אין תקציר; התוכן שלהם מגיע דרך סקירה מ־2024 וסקירות היסטוריות קודמות.',
  txt:`דייוויס ומלוני (1976) דיווחו על אובדן סלקטיבי של נוירונים כולינרגיים מרכזיים במחלת אלצהיימר, וברטוס ועמיתיו (1982) ניסחו את ההשערה הכולינרגית של הפגיעה בזיכרון בגיל המבוגר. [[DaviesMaloney1976,Bartus1982]] מאמר המערכת של כצמן מ־1976, "השכיחות והממאירות של מחלת אלצהיימר: רוצח מרכזי", עזר להציג מחדש את המחלה כסיבת מוות שכיחה. מימון המחקר על אלצהיימר ב־NIA האמריקאי עלה מ־19.3 מיליון דולר ב־1976 ל־222.6 מיליון דולר ב־1989. [[Katzman1976,BermejoPareja2024]]`,
  pt:'החוקרים מצאו שתאי המוח שמייצרים את השליח הכימי אצטילכולין הולכים לאיבוד, ושאלצהיימר הוא סיבת מוות שכיחה, לא נדירה.',
  hook:'ההשערה הכולינרגית: דייוויס ומלוני 1976, ברטוס 1982.'},
 {y:'1984',t:'פענוח הרצף של עמילואיד בטא',
  cap:['\u2067גלנר וונג מטהרים חלבון מהעמילואיד\u2069','\u2067שבכלי הדם של המוח, וקובעים את\u2069','\u2067הרצף שלו.\u2069','\u2067הוא לא התאים לאף חלבון שהיה ידוע\u2069','\u2067אז. מאוחר יותר נקרא עמילואיד בטא.\u2069'],
  txt:`גלנר וונג (1984) טיהרו חלבון עמילואיד חדש מכלי הדם במוח של אנשים עם אלצהיימר וקבעו את הרצף שלו; מאוחר יותר הוא נקרא עמילואיד בטא. לא הייתה לו הומולוגיה לאף חלבון שהרצף שלו היה ידוע באותה עת. [[Glenner1984]]`,
  pt:'מדענים הפיקו את חלבון הרובד מדפנות כלי הדם וקראו לראשונה את אבני הבניין שלו.',
  hook:'גלנר וונג 1984: רצף העמילואיד בטא פוענח מעמילואיד של כלי הדם במוח.'},
 {y:'1986',t:'טאו בתוך הסבך',
  cap:['\u2067גרונדקה־איקבל ועמיתיה מראים שטאו\u2069','\u2067הוא רכיב בעל זרחון חריג של הסיבים\u2069','\u2067הסליליים הזוגיים שמהם בנויים\u2069','\u2067הסבכים.\u2069'],
  txt:`גרונדקה־איקבל ועמיתיה (1986) הראו שטאו, חלבון הקשור למיקרוטובולים, הוא רכיב בעל זרחון חריג של הסיבים הסליליים הזוגיים שבסבכים. [[GrundkeIqbal1986]]`,
  pt:'התברר שהסבכים בנויים מטאו, חלבון שבדרך כלל מייצב את "המסילות" הפנימיות של התא, אחרי שנוספו לו יותר מדי תגי פוספט.',
  hook:'סבכים = סיבים סליליים זוגיים של טאו בזרחון חריג (Grundke-Iqbal 1986).'},
 {y:'⁦1987–95\u2069',t:'הגנים',
  cap:['⁧1987: שיבוט APP, על כרומוזום 21.\u2069','⁧1991: מוטציה ראשונה ב־APP במשפחה\u2069','\u2067עם אלצהיימר.\u2069','⁧1992: הארדי והיגינס מציעים את\u2069','\u2067השערת מפל העמילואיד.\u2069','⁧1995: נמצאו מוטציות ב־PSEN1 (כרומוזום 14)\u2069','\u2067וב־PSEN2 (כרומוזום 1).\u2069'],
  flag:'למאמר של הארדי והיגינס מ־1992 אין תקציר; הסיכום שלו מגיע דרך סקירה מ־2024.',
  txt:`קאנג ועמיתיו (1987) שיבטו את חלבון מבשר העמילואיד (695 שיירים), שדומה לקולטן על פני התא, ומיקמו את הגן שלו על כרומוזום 21. [[Kang1987]] גואט ועמיתיה (1991) מצאו את מוטציית ה־missense הראשונה ב־APP, שעוברת במשפחות עם אלצהיימר תורשתי. [[Goate1991]] הארדי והיגינס (1992) הציעו את השערת מפל העמילואיד; סקירה מ־2024 מציינת שעד כה היא הניבה "תוצאות טיפוליות דלות". [[HardyHiggins1992,BermejoPareja2024]] PSEN1 על כרומוזום 14 ו־PSEN2 על כרומוזום 1 זוהו ב־1995 באלצהיימר תורשתי שמתחיל מוקדם. [[Sherrington1995,LevyLahad1995,Rogaev1995]]`,
  pt:'משפחות שבהן אלצהיימר עבר מדור לדור הובילו את החוקרים לשלושה גנים, שכולם קשורים לאופן שבו נוצר עמילואיד.',
  hook:'שלושה גנים דומיננטיים: APP (כרומוזום 21), PSEN1 (14), PSEN2 (1).'},
 {y:'1993',t:'APOE4',
  cap:['\u2067שטריטמטר: האלל APOE ε4 שכיח פי 3 בערך\u2069','\u2067באלצהיימר משפחתי שמתחיל מאוחר\u2069','\u2067(0.50 לעומת 0.16 בקבוצת הביקורת).\u2069','\u2067קורדר: הסיכון עולה מ־20% ל־90%, וגיל\u2069','\u2067ההופעה יורד מ־84 ל־68, ככל שיש יותר\u2069','\u2067עותקי ε4.\u2069'],
  txt:`ב־1993 מצאו שטריטמטר ועמיתיו שכיחות של 0.50 לאלל APOE ε4 באלצהיימר משפחתי שמתחיל מאוחר, לעומת 0.16 בקבוצת הביקורת. קורדר ועמיתיו הראו השפעה תלוית מינון גנטי: הסיכון עלה מ־20% ל־90%, והגיל הממוצע בהופעה ירד מ־84 ל־68, ככל שהיו יותר עותקי ε4. [[Strittmatter1993,Corder1993]]`,
  pt:'נמצא שגרסה שכיחה של גן אחד מעלה את הסיכון לאלצהיימר שמתחיל מאוחר, יותר עם שני עותקים מאשר עם אחד.',
  hook:'APOE ε4 (1993): גן סיכון עם השפעה תלוית מינון (Corder 1993).'},
 {y:'⁦1993–2003\u2069',t:'התרופות הראשונות',
  cap:['\u2067תאריכי האישור של ה־FDA:\u2069','\u2067טקרין (Cognex), 9 בספטמבר 1993\u2069','\u2067דונפזיל (Aricept), 25 בנובמבר 1996\u2069','\u2067ממנטין (Namenda), 16 באוקטובר 2003\u2069'],
  txt:`טקרין (Cognex), התרופה הראשונה לאלצהיימר שאישר ה־FDA, אושרה ב־9 בספטמבר 1993. דונפזיל (Aricept) אושר ב־25 בנובמבר 1996, וממנטין (Namenda) ב־16 באוקטובר 2003. [[FDA_DrugsFDA]] שני מעכבי הכולינאסטראז האחרים הגיעו בין לבין: ריבסטיגמין (Exelon) ב־21 באפריל 2000 וגלנטמין (Razadyne) ב־28 בפברואר 2001. [[DrugsFDA2026]] ראו <a href="#synapse" data-go="synapse">מעכבי כולינאסטראז וממנטין</a> כדי להבין איך הן פועלות.`,
  pt:'התרופות הראשונות לאלצהיימר פועלות על השליחים הכימיים של המוח.',
  hook:'טקרין 1993 (הראשונה), דונפזיל 1996, ריבסטיגמין 2000, גלנטמין 2001, ממנטין 2003.'},
 {y:'2004',t:'לראות עמילואיד במוח חי',
  cap:['\u2067תרכובת פיטסבורג B \u200F(PiB): סמן ה־PET\u2069','\u2067הראשון לעמילואיד שנחקר בבני אדם,\u2069','⁧16 עם אלצהיימר קל ו־9 בקבוצת ביקורת.\u2069','\u2067הקליטה הייתה הגבוהה ביותר בקליפה\u2069','\u2067המצחית, פי 1.94.\u2069'],
  txt:`תרכובת פיטסבורג B \u200F(PiB) הייתה סמן ה־PET הראשון לעמילואיד שנחקר בבני אדם (2004; 16 אנשים עם אלצהיימר קל ו־9 בקבוצת ביקורת). הקליטה (retention) הייתה הגבוהה ביותר בקליפת המוח המצחית (פי 1.94). [[Klunk2004]]`,
  pt:'לראשונה אפשר היה לראות רבדים במוח של אדם חי בסריקה, ולא רק אחרי המוות.',
  hook:'PiB, ‏2004: סמן ה־PET הראשון לעמילואיד בבני אדם.'},
 {y:'⁦2021–24\u2069',t:'אדוקנומאב',
  cap:['\u2067נוב׳ 2020: ועדה מייעצת של ה־FDA מצביעה\u2069','\u2067שהראיות הקליניות אינן מספיקות.\u2069','⁧7 ביוני 2021: אישור מואץ, על סמך\u2069','\u2067הפחתת עמילואיד.\u2069','⁧31 בינו׳ 2024: Biogen מפסיקה את הפיתוח;\u2069','\u2067לדבריה, לא בגלל בטיחות או יעילות.\u2069'],
  txt:`ועדה מייעצת של ה־FDA הצביעה בנובמבר 2020 שהראיות הקליניות לאדוקנומאב (Aduhelm) אינן מספיקות. ב־7 ביוני 2021 הוא קיבל אישור מואץ, על סמך הפחתת עמילואיד כנקודת סיום חלופית (surrogate). [[FDA_DrugsFDA,FDA2021AduMemo]] ב־31 בינואר 2024 הודיעה חברת Biogen שהיא מפסיקה את הפיתוח והשיווק ועוצרת את ניסוי האישוש ENVISION. לדבריה ההחלטה לא נבעה מחששות לבטיחות או ליעילות, והזכויות חזרו לחברת Neurimmune. [[Biogen2024]]`,
  pt:'הנוגדן הראשון נגד עמילואיד אושר על סמך תוצאה בסריקה ולא על סמך תועלת ברורה למטופלים, והיצרן הפסיק למכור אותו פחות משלוש שנים אחר כך.',
  hook:'אדוקנומאב: אישור מואץ ב־7 ביוני 2021 על סמך סמן חלופי (עמילואיד), הופסק בינואר 2024.'},
 {y:'⁦2023–24\u2069',t:'לקנמאב ודונאנמאב',
  cap:['\u2067לקנמאב: אישור מואץ 6 בינו׳ 2023, אישור\u2069','\u2067רגיל 6 ביולי 2023, ההמרה הראשונה\u2069','\u2067מסוגה. אזהרה מודגשת (boxed)\u2069','\u2067על ARIA.\u2069','\u2067דונאנמאב: אושר 2 ביולי 2024, ניתן\u2069','\u2067בעירוי כל 4 שבועות, עם אזהרת ARIA.\u2069'],
  txt:`לקנמאב (Leqembi) קיבל אישור מואץ ב־6 בינואר 2023 והומר לאישור רגיל ב־6 ביולי 2023, אחרי ניסוי Clarity AD \u200F(1,795 מטופלים; CDR-SB ב־18 חודשים). זה היה הנוגדן הראשון נגד עמילואיד שעבר המרה כזאת. בעלון שלו יש אזהרה מודגשת על ARIA. [[FDA_DrugsFDA,FDA2023Lecanemab,vanDyck2023]] דונאנמאב (Kisunla) אושר ב־2 ביולי 2024 לאנשים עם MCI או דמנציה קלה ופתולוגיית עמילואיד מאושרת. הוא ניתן בעירוי לווריד כל 4 שבועות, ובעלון שלו יש אזהרה על ARIA. [[FDA_DrugsFDA,FDA2024Donanemab,Sims2023]] ראו <a href="#antibody" data-go="antibody">נוגדנים נגד עמילואיד לאורך זמן</a>.`,
  pt:'שני נוגדנים שמסלקים עמילואיד מהמוח מאושרים כעת לאלצהיימר מוקדם, כל אחד עם אזהרה על בצקת או דימום במוח.',
  hook:'לקנמאב: הנוגדן הראשון נגד עמילואיד שהומר לאישור רגיל (6 ביולי 2023).'}
].map((e,i,a)=>({...e,from:i/a.length,at:i/a.length+.6/a.length}));

const hiPerson=(x,y,c='var(--sage)',f='var(--sage-soft)',r=7)=>`<circle cx="${f1(x)}" cy="${f1(y-r*2.9)}" r="${r}" style="fill:${f};stroke:${c};stroke-width:1.8"/><path d="M${f1(x-r*1.5)} ${f1(y)} v-${f1(r*.9)} q0 -${f1(r*1.2)} ${f1(r*1.5)} -${f1(r*1.2)} q${f1(r*1.5)} 0 ${f1(r*1.5)} ${f1(r*1.2)} v${f1(r*.9)} z" style="fill:${f};stroke:${c};stroke-width:1.8"/>`;
function hiScene(i,u,cx,cy){let s='';const T=(x,y,txt,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}" style="${st}">${txt}</text>`;
  if(i===0){ // the asylum
    s+=`<path d="M${cx-150} ${cy+100}H${cx+150}" class="axis"/><path d="M${cx-132} ${cy-40} L${cx} ${cy-100} L${cx+132} ${cy-40}Z" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:2;stroke-linejoin:round"/>`;
    s+=`<rect x="${cx-120}" y="${cy-40}" width="240" height="140" style="fill:var(--panel);stroke:var(--muted);stroke-width:2"/>`+T(cx,cy-55,'בית החולים בפרנקפורט','t-xs t-mid','fill:var(--ink)');
    for(let r=0;r<2;r++)for(let c=0;c<6;c++){const k=r*6+c,on=u>.05+k*.04,x=cx-104+c*36+(c>2?8:0),y=cy-26+r*40;
      s+=`<rect x="${x}" y="${y}" width="20" height="26" rx="2" style="fill:${on?'var(--amber-soft)':'var(--panel-2)'};stroke:var(--muted);stroke-width:1"/>`;
      if(r===0&&c===4&&u>.5)s+=`<circle cx="${x+10}" cy="${y+12}" r="5" style="fill:var(--rose);opacity:${f1(ramp(u,.5,.6))}"/>`}
    s+=`<rect x="${cx-14}" y="${cy+56}" width="28" height="44" rx="12" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.5"/>`;
    s+=hiPerson(lerp(cx-150,cx-36,ease(ramp(u,.1,.7))),cy+100,'var(--sky)','var(--sky-soft)');
    if(u>.6)s+=`<g style="opacity:${f1(ramp(u,.6,.7))}"><rect x="${cx-150}" y="${cy-124}" width="104" height="22" rx="5" style="fill:var(--amber-soft);stroke:var(--amber)"/>`+T(cx-98,cy-109,'⁧25 בנוב׳ 1901\u2069','t-xs t-mid','fill:var(--ink)')+'</g>';
  }else if(i===1){ // the lecture
    s+=T(cx-150,cy-110,'\u2067טיבינגן 1906\u2069','t-xs','fill:var(--ink)');
    s+=`<rect x="${cx-40}" y="${cy-120}" width="180" height="132" rx="6" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.5"/><circle cx="${cx+50}" cy="${cy-54}" r="56" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:1.5"/>`;
    s+=plaque(cx+22,cy-66,20,9,ramp(u,.15,.3))+tangle(cx+82,cy-64,14,ramp(u,.4,.55));
    if(u>.2)s+=T(cx+22,cy-30,'רובד','t-xs t-mid','fill:var(--ink)');if(u>.45)s+=T(cx+82,cy-24,'סבך','t-xs t-mid','fill:var(--ink)');
    s+=`<path d="M${cx-136} ${cy+70} L${cx-130} ${cy+16} H${cx-90} L${cx-84} ${cy+70}Z" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.5"/>`+hiPerson(cx-110,cy+16,'var(--sky)','var(--sky-soft)');
    for(let k=0;k<6;k++){const x=cx-40+k*34;s+=`<rect x="${x-11}" y="${cy+100}" width="22" height="16" rx="3" style="fill:var(--panel-2)"/>`;
      if(k%2===0)s+=`<circle cx="${x}" cy="${cy+90}" r="8" style="fill:var(--sage-soft);stroke:var(--sage);stroke-width:1.5"/>`}
    if(u>.65)s+=T(cx+50,cy+76,'\u2067מעט מאזינים, מעט עניין\u2069','t-xs t-mid','opacity:'+f1(ramp(u,.65,.75)));
  }else if(i===2){ // the textbook
    s+=`<path d="M${cx} ${cy-76} L${cx-142} ${cy-90} V${cy+80} L${cx} ${cy+94}Z" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.5"/><path d="M${cx} ${cy-76} L${cx+142} ${cy-90} V${cy+80} L${cx} ${cy+94}Z" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.5"/>`;
    for(let l=0;l<8;l++)s+=`<path d="M${cx-124} ${cy-60+l*17} h${100-(l%3)*14}" style="stroke:var(--line);stroke-width:4;stroke-linecap:round"/>`;
    s+=T(cx+70,cy-52,'PSYCHIATRIE','t-xs t-mid','fill:var(--ink)')+T(cx+70,cy-38,'\u2067מהדורה 8, 1910\u2069','t-xs t-mid');
    const w1="מחלת",w2='אלצהיימר',n=Math.floor(ramp(u,.1,.7)*(w1.length+w2.length));
    s+=T(cx+70,cy+4,w1.slice(0,Math.min(n,w1.length)),'t-big t-mid','fill:var(--rose)')+T(cx+70,cy+26,w2.slice(0,Math.max(0,n-w1.length)),'t-big t-mid','fill:var(--rose)');
  }else if(i===3){ // counting plaques
    s+=`<path d="M${cx-130} ${cy-96}V${cy+90}H${cx+130}" style="fill:none;stroke:var(--muted);stroke-width:1.5"/>`+T(cx+130,cy+108,'מספר הרבדים →','t-xs t-end')+T(cx-122,cy-100,'ציון דמנציה ↑','t-xs')+T(cx+130,cy-100,'\u2067סכמטי, לא הנתונים שלהם\u2069','t-xs t-end');
    const q=rng(68);for(let k=0;k<18;k++){const x=q(),noise=q()*.2-.1,dem=k<13;const y=dem?clamp(.12+.72*x+noise,.05,.95):.06+q()*.08;
      const o=ramp(u,.05+k*.035,.12+k*.035);if(o<=0)continue;
      s+=`<circle cx="${f1(cx-120+x*240)}" cy="${f1(cy+80-y*165)}" r="5" style="fill:${dem?'var(--amber)':'var(--sage)'};opacity:${f1(o)}"/>`}
    if(u>.75)s+=`<path d="M${cx-110} ${cy+52} L${cx+120} ${cy-74}" style="stroke:var(--amber);stroke-width:2;stroke-dasharray:6 4;opacity:${f1(ramp(u,.75,.85))}"/>`;
    s+=`<circle cx="${cx-112}" cy="${cy-74}" r="4" style="fill:var(--amber)"/>`+T(cx-104,cy-70,'עם דמנציה','t-xs','fill:var(--ink)')+`<circle cx="${cx-112}" cy="${cy-58}" r="4" style="fill:var(--sage)"/>`+T(cx-104,cy-54,'ללא דמנציה','t-xs','fill:var(--ink)');
  }else if(i===4){ // cholinergic synapse and funding
    s+=T(cx-100,cy-86,'נוירון כולינרגי','t-xs t-mid','fill:var(--ink)');
    const fade=1-.6*ramp(u,.1,.6);
    s+=`<circle cx="${cx-100}" cy="${cy-36}" r="34" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2;opacity:${f1(fade)}"/>`;
    s+=`<rect x="${cx-142}" y="${cy+14}" width="84" height="16" rx="5" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2"/>`;
    const n=Math.round(14*(1-.75*ramp(u,.1,.6))),q=rng(76);for(let k=0;k<14;k++){const x=cx-128+q()*56,y=cy-52+q()*60;if(k<n)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="3" style="fill:var(--violet)"/>`}
    s+=T(cx-100,cy+48,'אצטילכולין','t-xs t-mid','fill:var(--violet)');
    const g=ease(ramp(u,.45,.85)),h1=19.3/222.6*170,h2=170*g;
    s+=T(cx+75,cy-104,'\u2067מימון ה־NIA\u2069','t-xs t-mid','fill:var(--ink)')+`<path d="M${cx+10} ${cy+90}H${cx+140}" class="axis"/>`;
    s+=`<rect x="${cx+22}" y="${f1(cy+90-h1)}" width="40" height="${f1(h1)}" style="fill:var(--sky)"/><rect x="${cx+88}" y="${f1(cy+90-h2)}" width="40" height="${f1(h2)}" style="fill:var(--sky)"/>`;
    s+=T(cx+42,cy+106,'1976','t-xs t-mid')+T(cx+108,cy+106,'1989','t-xs t-mid')+T(cx+42,f1(cy+84-h1),'$19.3M','t-xs t-mid','fill:var(--ink)');
    if(g>.05)s+=T(cx+108,f1(cy+84-h2),'$222.6M','t-xs t-mid','fill:var(--ink)');
  }else if(i===5){ // amyloid from a vessel wall
    s+=`<rect x="${cx-150}" y="${cy+30}" width="300" height="46" style="fill:var(--vessel);opacity:.12"/><rect x="${cx-150}" y="${cy+20}" width="300" height="12" style="fill:var(--vessel);opacity:.45"/><rect x="${cx-150}" y="${cy+74}" width="300" height="12" style="fill:var(--vessel);opacity:.45"/>`;
    for(let k=0;k<5;k++){const x=cx-150+((k*66+u*220)%300);s+=`<ellipse cx="${f1(x)}" cy="${cy+53}" rx="11" ry="7" style="fill:var(--vessel);opacity:.6"/>`}
    [[-110,20],[-60,20],[30,86],[90,20],[-20,86]].forEach(([dx,yy])=>{s+=`<circle cx="${cx+dx}" cy="${cy+yy}" r="7" style="fill:var(--amber)"/>`});
    s+=T(cx-150,cy+108,'\u2067כלי דם במוח, עמילואיד בדופן שלו\u2069','t-xs');
    for(let k=0;k<16;k++){const p=k/15,x=cx-60+p*170,y=cy+8-p*100-16*Math.sin(p*Math.PI*2),o=ramp(u,.05+k*.025,.1+k*.025),seq=u>.45+k*.025;
      if(o>0)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="6" style="fill:${seq?'var(--amber)':'var(--panel)'};stroke:var(--amber);stroke-width:1.5;opacity:${f1(o)}"/>`}
    if(u>.5)s+=T(cx-150,cy-100,'\u2067טיהור, ואז קביעת הרצף\u2069','t-xs','fill:var(--ink)');
    if(u>.85)s+=T(cx+150,cy-112,'ללא קרוב ידוע','t-xs t-end','fill:var(--ink)');
  }else if(i===6){ // tau leaves the microtubule
    s+=`<path d="M${cx-150} ${cy-62}H${cx+20}M${cx-150} ${cy-38}H${cx+20}" style="stroke:var(--cell-line);stroke-width:3"/>`;
    for(let x=cx-150;x<cx+20;x+=12)s+=`<path d="M${x} ${cy-62}V${cy-38}" style="stroke:var(--cell-line);stroke-width:1;opacity:.6"/>`;
    s+=T(cx-150,cy-74,'מיקרוטובול','t-xs');
    for(let j=0;j<5;j++){const d=ease(ramp(u,.08+j*.07,.3+j*.07)),x=cx-130+j*32,y=cy-50+d*(46+(j%2)*14);
      s+=`<rect x="${x-3}" y="${f1(y-14)}" width="6" height="28" rx="3" style="fill:var(--rose)"/>`;
      if(d>.2)s+=`<circle cx="${x+9}" cy="${f1(y-8)}" r="6" style="fill:var(--panel);stroke:var(--rose);stroke-width:1.5;opacity:${f1(d)}"/><text x="${x+9}" y="${f1(y-5)}" class="t-xs t-mid" style="fill:var(--rose);font-size:8px;opacity:${f1(d)}">P</text>`}
    s+=T(cx-150,cy+70,'\u2067P = תג פוספט\u2069','t-xs','fill:var(--rose)');
    const k=ramp(u,.5,.9);if(k>0){const L=110*k;let a='',b='';for(let q=0;q<=40;q++){const x=cx+38+L*q/40,ph=q/40*L/18;a+=(q?'L':'M')+f1(x)+' '+f1(cy+40+10*Math.sin(ph));b+=(q?'L':'M')+f1(x)+' '+f1(cy+40-10*Math.sin(ph))}
      s+=`<path d="${a}" style="fill:none;stroke:var(--rose);stroke-width:4"/><path d="${b}" style="fill:none;stroke:var(--rose);stroke-width:4;opacity:.6"/>`+T(cx+150,cy+76,'סיב סלילי זוגי','t-xs t-end','fill:var(--ink)')}
  }else if(i===7){ // chromosomes
    const chr=(x,y0,y1,c)=>`<rect x="${x-11}" y="${y0}" width="22" height="${y1-y0}" rx="11" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.5"/><path d="M${x-11} ${c}h22" style="stroke:var(--field);stroke-width:4"/>`;
    s+=chr(cx-90,cy-90,cy+90,cy-20)+chr(cx,cy-50,cy+70,cy-30)+chr(cx+70,cy-10,cy+50,cy+5);
    s+=T(cx-90,cy+108,'\u2067כרומוזום 1\u2069','t-xs t-mid')+T(cx,cy+88,'\u2067כרומוזום 14\u2069','t-xs t-mid')+T(cx+70,cy+68,'\u2067כרומוזום 21\u2069','t-xs t-mid');
    const band=(x,y,col,o)=>`<rect x="${x-11}" y="${y-5}" width="22" height="10" style="fill:${col};opacity:${f1(o)}"/>`;
    const a=ramp(u,.05,.15),b=ramp(u,.25,.35),c=ramp(u,.45,.55),d=ramp(u,.65,.75);
    s+=band(cx+70,cy+28,'var(--amber)',a)+T(cx+86,cy+26,'APP','t-xs','fill:var(--ink);opacity:'+f1(a))+T(cx+86,cy+38,b>0?'1987 · 1991':'1987','t-xs','opacity:'+f1(a));
    s+=T(cx-150,cy-112,'⁧1992: השערת מפל העמילואיד\u2069','t-xs','fill:var(--ink);opacity:'+f1(c));
    s+=band(cx,cy+20,'var(--rose)',d)+T(cx+16,cy+18,'PSEN1','t-xs','fill:var(--ink);opacity:'+f1(d))+T(cx+16,cy+30,'1995','t-xs','opacity:'+f1(d));
    s+=band(cx-90,cy+50,'var(--rose)',d)+T(cx-74,cy+48,'PSEN2','t-xs','fill:var(--ink);opacity:'+f1(d))+T(cx-74,cy+60,'1995','t-xs','opacity:'+f1(d));
  }else if(i===8){ // APOE4
    const g=ease(ramp(u,.05,.4));
    s+=T(cx-130,cy-104,'\u2067שכיחות האלל ε4\u2069','t-xs','fill:var(--ink)')+`<path d="M${cx-140} ${cy+80}H${cx}" class="axis"/>`;
    [[0.16,'ביקורת',cx-110,'var(--muted)'],[0.5,'אלצהיימר מאוחר',cx-40,'var(--rose)']].forEach(([v,l,x,c])=>{const h=v/.5*160*g;
      s+=`<rect x="${x-22}" y="${f1(cy+80-h)}" width="44" height="${f1(h)}" rx="3" style="fill:${c}"/>`+T(x,f1(cy+74-h),v.toFixed(2),'t-xs t-mid','fill:var(--ink)')+T(x,cy+96,l,'t-xs t-mid')});
    const k=ease(ramp(u,.45,.85)),age=lerp(84,68,k),X=a=>cx+28+(a-60)/30*118;
    s+=T(cx+28,cy-40,'גיל ההופעה','t-xs','fill:var(--ink)')+`<path d="M${cx+28} ${cy}H${cx+146}" class="axis"/>`;
    [60,70,80,90].forEach(a=>{s+=`<path d="M${f1(X(a))} ${cy-4}v8" class="axis"/>`+T(X(a),cy+18,a,'t-xs t-mid')});
    s+=`<circle cx="${f1(X(age))}" cy="${cy}" r="7" style="fill:var(--rose)"/>`+T(X(age),cy-14,Math.round(age),'t-sm t-mid','fill:var(--ink)');
    s+=T(cx+28,cy+48,'\u2067יותר עותקי ε4:\u2069','t-xs','fill:var(--ink);opacity:'+f1(k))+T(cx+28,cy+64,'\u2067סיכון מ־20% ל־90%\u2069','t-xs','fill:var(--ink);opacity:'+f1(k));
  }else if(i===9){ // the first drugs
    s+=T(cx-140,cy-100,'\u2067אישורי FDA\u2069','t-xs','fill:var(--ink)')+`<path d="M${cx-140} ${cy+60}H${cx+140}" style="stroke:var(--muted);stroke-width:3"/>`;
    [['טקרין','⁧9 בספט׳ 1993\u2069'],['דונפזיל','⁧25 בנוב׳ 1996\u2069'],['ממנטין','⁧16 באוק׳ 2003\u2069']].forEach(([n,d],k)=>{const x=cx-95+k*95,dr=ease(ramp(u,.08+k*.25,.25+k*.25));if(dr<=0)return;const y=cy-60*(1-dr);
      s+=`<g style="opacity:${f1(dr)}"><rect x="${x-24}" y="${f1(y-12)}" width="48" height="72" rx="8" style="fill:var(--sky-soft);stroke:var(--sky);stroke-width:1.8"/><rect x="${x-18}" y="${f1(y-26)}" width="36" height="16" rx="3" style="fill:var(--sky)"/><rect x="${x-16}" y="${f1(y+10)}" width="32" height="26" rx="2" style="fill:var(--panel)"/></g>`;
      s+=T(x,cy+80,n,'t-xs t-mid','fill:var(--ink);opacity:'+f1(dr))+T(x,cy+94,d,'t-xs t-mid','opacity:'+f1(dr))});
  }else if(i===10){ // PiB PET
    const brain=(x,o,lab)=>{let b=`<ellipse cx="${x}" cy="${cy}" rx="62" ry="48" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.8"/>`;
      if(o>0)b+=`<ellipse cx="${x-18}" cy="${cy-6}" rx="40" ry="34" style="fill:var(--amber);opacity:${f1(o*.65)}"/><ellipse cx="${x+18}" cy="${cy+4}" rx="34" ry="28" style="fill:var(--amber);opacity:${f1(o*.35)}"/>`;
      for(let g=0;g<4;g++)b+=`<path d="M${x-48+g*24} ${cy-30} q10 18 0 36 q-8 14 4 26" style="fill:none;stroke:var(--muted);stroke-width:1.3;opacity:.6"/>`;
      return b+T(x,cy+70,lab,'t-xs t-mid','fill:var(--ink)')};
    s+=T(cx,cy-100,'\u2067קליטת PiB ב־PET\u2069','t-xs t-mid','fill:var(--ink)');
    s+=brain(cx-75,0,'ביקורת')+brain(cx+75,ease(ramp(u,.15,.6)),'אלצהיימר קל');
    if(u>.6)s+=T(cx+57,cy-60,'\u2067מצחי ×1.94\u2069','t-xs t-mid','fill:var(--amber);opacity:'+f1(ramp(u,.6,.7)));
    s+=T(cx-150,cy+100,'חזית המוח בצד שמאל','t-xs');
  }else if(i===11){ // aducanumab
    s+=`<rect x="${cx-62}" y="${cy-112}" width="124" height="150" rx="5" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.5"/>`;
    for(let l=0;l<6;l++)s+=`<path d="M${cx-46} ${cy-92+l*16} h${80-(l%2)*20}" style="stroke:var(--line);stroke-width:4;stroke-linecap:round"/>`;
    const a=ramp(u,.3,.4),b=ramp(u,.68,.78);
    if(a>0)s+=`<g transform="rotate(-12 ${cx} ${cy-20})" style="opacity:${f1(a)}"><rect x="${cx-56}" y="${cy-38}" width="112" height="36" rx="6" style="fill:none;stroke:var(--good);stroke-width:2.5"/>`+T(cx,cy-24,'אישור','t-xs t-mid','fill:var(--good);font-weight:600')+T(cx,cy-11,'מואץ','t-xs t-mid','fill:var(--good);font-weight:600')+'</g>';
    if(b>0)s+=`<g transform="rotate(-6 ${cx} ${cy+18})" style="opacity:${f1(b)}"><rect x="${cx-76}" y="${cy+6}" width="152" height="24" style="fill:var(--bad-soft);stroke:var(--bad);stroke-width:1.5"/>`+T(cx,cy+22,'\u2067הופסק ב־2024\u2069','t-xs t-mid','fill:var(--bad);font-weight:600')+'</g>';
    s+=`<path d="M${cx-130} ${cy+80}H${cx+130}" class="axis"/>`;
    [[cx-110,'\u2067נוב׳ 2020\u2069','הצבעת הוועדה',.05],[cx-40,'\u2067יוני 2021\u2069','אושר',.3],[cx+110,'\u2067ינו׳ 2024\u2069','הופסק',.68]].forEach(([x,d,l,at])=>{const o=ramp(u,at,at+.08);
      s+=`<circle cx="${x}" cy="${cy+80}" r="6" style="fill:${o>0?'var(--sky)':'var(--panel)'};stroke:var(--sky);stroke-width:1.5"/>`+T(x,cy+98,d,'t-xs t-mid','fill:var(--ink);opacity:'+f1(.3+.7*o))+T(x,cy+111,l,'t-xs t-mid','opacity:'+f1(o))});
  }else{ // lecanemab and donanemab
    s+=`<rect x="${cx-140}" y="${cy-118}" width="54" height="74" rx="10" style="fill:var(--sky-soft);stroke:var(--sky);stroke-width:1.8"/>`+T(cx-113,cy-78,'IV','t-sm t-mid','fill:var(--sky)');
    const P0=[cx-113,cy-44],P1=[cx-100,cy+60],P2=[cx+52,cy+34];
    s+=`<path d="M${P0[0]} ${P0[1]} Q${P1[0]} ${P1[1]} ${P2[0]} ${P2[1]}" style="fill:none;stroke:var(--sky);stroke-width:2;opacity:.6"/>`;
    for(let j=0;j<6;j++){const k=(j/6+u*2)%1,x=(1-k)*(1-k)*P0[0]+2*(1-k)*k*P1[0]+k*k*P2[0],y=(1-k)*(1-k)*P0[1]+2*(1-k)*k*P1[1]+k*k*P2[1];
      s+=`<path transform="translate(${f1(x)} ${f1(y)})" d="M0 7V0M0 0L-6 -7M0 0L6 -7" style="fill:none;stroke:var(--sky);stroke-width:2.4;stroke-linecap:round"/>`}
    s+=plaque(cx+90,cy+30,38*(1-.55*ease(ramp(u,.2,.9))),12,1)+T(cx+90,cy+96,'רובד','t-xs t-mid','fill:var(--ink)');
    s+=T(cx+150,cy-100,'\u2067לקנמאב 2023\u2069','t-xs t-end','fill:var(--ink);opacity:'+f1(ramp(u,.1,.2)))+T(cx+150,cy-84,'\u2067דונאנמאב 2024\u2069','t-xs t-end','fill:var(--ink);opacity:'+f1(ramp(u,.5,.6)));
  }
  return s}

inits.history=()=>{
  const svg=$('#hiSvg'),rg=$('#hiT'),n=HI_ERAS.length;
  function draw(t){
    const N=vb(svg,'720 420','400 600');
    const L=N?{r0:24,r1:376,ry:26,cx:200,cy:252,yx:20,yy:72,ty:94,lx:20,ly:420}:{r0:30,r1:690,ry:26,cx:208,cy:244,yx:424,yy:104,ty:130,lx:424,ly:158};
    const i=Math.min(n-1,Math.floor(t*n)),u=ramp(t,i/n,(i+1)/n),E=HI_ERAS[i],gap=(L.r1-L.r0)/(n-1);
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    // ribbon
    s+=`<path d="M${L.r0} ${L.ry}H${L.r1}" style="stroke:var(--line);stroke-width:3"/><path d="M${L.r0} ${L.ry}H${f1(L.r0+gap*i)}" style="stroke:var(--sage);stroke-width:3"/>`;
    HI_ERAS.forEach((e,k)=>{const x=L.r0+k*gap,on=k===i;
      s+=`<circle cx="${f1(x)}" cy="${L.ry}" r="${on?7:4.5}" style="fill:${k<=i?'var(--sage)':'var(--panel)'};stroke:${k<=i?'var(--sage)':'var(--line)'};stroke-width:1.5"/>`;
      if(!N)s+=`<text x="${f1(x)}" y="${L.ry+22}" class="t-xs t-mid" style="fill:${on?'var(--ink)':'var(--muted)'};font-weight:${on?600:500}">${e.y}</text>`});
    // scene
    s+=`<g style="opacity:${f1(ramp(u,0,.1))}">${hiScene(i,u,L.cx,L.cy)}</g>`;
    // caption
    s+=`<text x="${L.yx}" y="${L.yy}" class="t-big" style="font-size:26px;fill:var(--sage)">${E.y}</text><text x="${L.yx}" y="${L.ty}" class="t-lbl">${E.t}</text>`;
    E.cap.forEach((c,k)=>{s+=`<text x="${L.lx}" y="${L.ly+k*18}" class="t-sm" style="fill:var(--ink);opacity:${f1(ramp(u,.04+k*.06,.14+k*.06))}">${c}</text>`});
    if(E.flag){const y=L.ly+E.cap.length*18;s+=`<rect x="${L.lx}" y="${y-4}" width="128" height="19" rx="5" style="fill:var(--warn-soft)"/><text x="${L.lx+8}" y="${y+9.5}" class="t-xs" style="fill:var(--warn);font-weight:600">דרך סקירה מאוחרת</text>`}
    svg.innerHTML=s;
    setSt(i);
    $('#hiNote').innerHTML=noteHTML({k:E.y+' · '+(i+1)+' מתוך '+n,t:E.t,txt:E.txt+(E.flag?` <span class="tag warn hi-flag">דרך סקירה מאוחרת</span>${E.flag}`:''),pt:E.pt,hook:E.hook});
  }
  const stop=playWire(rg,$('#hiPlay'),draw,52000,'הפעלה חוזרת','history');
  const setSt=stepWire($('#hiSteps'),HI_ERAS,rg,draw,stop);
  draw(+rg.value);
};
