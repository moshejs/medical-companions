/* =============== 5.1 Family, school & play =============== */
inits.school=()=>{
  const svg=$('#shSvg'),rg=$('#shT');
  const TH=.78,SUPS=['sched','warn','quiet','teacch','adult'];
  const SUPN={sched:'visual schedule',warn:'warnings',quiet:'quiet space',teacch:'TEACCH',adult:'trusted adult'};
  let scene='school';const sup={sched:0,warn:0,quiet:0,teacch:0,adult:0};let setSt=()=>{};

  /* ---- the day: events with the supports that soften them ----
     kind: tr (transition, a sharp peak), ch (unexpected change), se (sensory), so (social), de (demand), ca (carry-over) */
  const EV={
    school:[
      {a:0,b:.05,k:'tr',amp:.36,by:['sched','warn','adult'],c:0,sc:'gate',n:'arrival'},
      {a:.05,b:.27,k:'de',amp:.17,by:['teacch','sched'],c:1,sc:'class',n:'maths lesson'},
      {a:.286,b:.36,k:'so',amp:.4,by:['adult','quiet'],c:2,sc:'yard',n:'break time'},
      {a:.36,b:.39,k:'tr',amp:.26,by:['sched','warn'],c:3,sc:'trans',n:'back to class'},
      {a:.39,b:.5,k:'de',amp:.13,by:['teacch'],c:3,sc:'class',n:'reading'},
      {a:.5,b:.607,k:'se',amp:.62,by:['quiet','adult'],c:4,sc:'lunch',n:'lunch hall'},
      {a:.607,b:.64,k:'tr',amp:.2,by:['sched','warn'],c:5,sc:'trans',n:'corridor'},
      {a:.64,b:.86,k:'ch',amp:.52,by:['warn','sched','adult'],c:5,sc:'change',n:'art with a new teacher'},
      {a:.86,b:1,k:'tr',amp:.32,by:['sched','adult','warn'],c:6,sc:'home',n:'home time'}],
    home:[
      {a:0,b:.15,k:'de',amp:.24,by:['sched','teacch'],c:0,sc:'kitchen',n:'getting dressed, breakfast'},
      {a:.16,b:.3,k:'tr',amp:.42,by:['warn','sched','adult'],c:1,sc:'door',n:'leaving the house'},
      {a:.3,b:.4,k:'away',amp:0,by:[],c:2,sc:'away',n:'at school'},
      {a:.4,b:.55,k:'ca',amp:0,by:['quiet','adult'],c:3,sc:'sofa',n:'calm time after school'},
      {a:.56,b:.68,k:'de',amp:.36,by:['teacch','sched','adult'],c:4,sc:'desk',n:'homework'},
      {a:.7,b:.82,k:'se',amp:.3,by:['quiet','sched'],c:5,sc:'dinner',n:'family dinner'},
      {a:.86,b:1,k:'tr',amp:.27,by:['sched','warn'],c:6,sc:'bed',n:'bedtime'}]};
  const CARDS={school:[['bag','Arrive'],['book','Maths'],['ball','Break'],['book','Reading'],['plate','Lunch'],['teacher','Art'],['house','Home']],
    home:[['bowl','Eat'],['car','Leave'],['school','School'],['sofa','Calm'],['pencil','Work'],['plate','Dinner'],['moon','Bed']]};
  const hourOf=(sc,t)=>{let h;if(sc==='school')h=8.5+7*t;else if(t<=.3)h=7+1.25*t/.3;else if(t<.4)h=8.25+(15.5-8.25)*(t-.3)/.1;else h=15.5+5*(t-.4)/.6;
    const hh=Math.floor(h),mm=Math.round((h-hh)*60/5)*5;return (mm===60?hh+1:hh)+':'+String(mm%60).padStart(2,'0')};

  function stressCurve(sc,S,N=300){
    const evs=EV[sc],tau=S.quiet?.03:.075,out=[];
    const carry=sc==='home'?meanSchool(S):0;
    const red=e=>e.by.reduce((m,k)=>m*(S[k]?.62:1),1);
    for(let i=0;i<=N;i++){const x=i/N;
      let v=.12+.16*x*(S.quiet?.4:1)*(S.teacch?.7:1);
      evs.forEach(e=>{if(x<e.a)return;let f;
        if(e.k==='away'){return}
        if(e.k==='ca'){/* the school day comes home: an early high that settles, faster with a calm space */
          f=x<=e.b?Math.exp(-(x-e.a)/(S.quiet?.03:.09)):Math.exp(-(e.b-e.a)/(S.quiet?.03:.09))*Math.exp(-(x-e.b)/tau);v+=carry*.95*red(e)*f;return}
        if(e.k==='tr'){f=x<e.a+.012?ramp(x,e.a,e.a+.012):Math.exp(-(x-e.a-.012)/(tau*.7))}
        else if(e.k==='ch'){f=x<e.a+.015?ramp(x,e.a,e.a+.015):x<=e.b?.38+.62*Math.exp(-(x-e.a-.015)/.05):(.38)*Math.exp(-(x-e.b)/tau)}
        else{const ri=ramp(x,e.a,e.a+Math.min(.03,(e.b-e.a)/2));f=x<=e.b?ri*(e.k==='se'?.85+.15*Math.sin(x*140):1):Math.exp(-(x-e.b)/tau)}
        v+=e.amp*red(e)*f});
      /* while away at school the home curve shows the school day's mean, in a hatched band */
      if(sc==='home'&&x>=.3&&x<.4)v=lerp(v,carry+.08,bump(x,.3,.4)*.9);
      out.push(clamp(v,0,1))}
    return out}
  const _mc={};
  function meanSchool(S){const key=SUPS.map(k=>S[k]).join('');if(_mc[key]!=null)return _mc[key];const c=stressCurve('school',S,120);return _mc[key]=c.reduce((a,b)=>a+b,0)/c.length}
  const evAt=(sc,t)=>{const E=EV[sc];let e=E[0];E.forEach(x=>{if(t>=x.a)e=x});return e};

  /* ---- little picture-card icons, centred at (x,y), size s ---- */
  function ico(k,x,y,s){const st='style="fill:none;stroke:var(--ink);stroke-width:1.6;stroke-linejoin:round;stroke-linecap:round"',fl=c=>`style="fill:${c};stroke:var(--ink);stroke-width:1.4"`;
    const X=v=>f1(x+v*s),Y=v=>f1(y+v*s);
    switch(k){
      case'bag':return `<rect x="${X(-.42)}" y="${Y(-.2)}" width="${f1(.84*s)}" height="${f1(.62*s)}" rx="3" ${fl('var(--gold-soft)')}/><path d="M${X(-.18)} ${Y(-.2)}V${Y(-.38)}H${X(.18)}V${Y(-.2)}" ${st}/>`;
      case'book':return `<path d="M${X(0)} ${Y(-.3)}Q${X(-.25)} ${Y(-.42)} ${X(-.48)} ${Y(-.32)}V${Y(.36)}Q${X(-.25)} ${Y(.26)} ${X(0)} ${Y(.38)}Q${X(.25)} ${Y(.26)} ${X(.48)} ${Y(.36)}V${Y(-.32)}Q${X(.25)} ${Y(-.42)} ${X(0)} ${Y(-.3)}V${Y(.38)}" ${fl('var(--accent-soft)')}/>`;
      case'ball':return `<circle cx="${X(0)}" cy="${Y(0)}" r="${f1(.38*s)}" ${fl('var(--rx-soft)')}/><path d="M${X(-.38)} ${Y(0)}Q${X(0)} ${Y(-.22)} ${X(.38)} ${Y(0)}M${X(0)} ${Y(-.38)}Q${X(.18)} ${Y(0)} ${X(0)} ${Y(.38)}" ${st}/>`;
      case'plate':return `<circle cx="${X(.05)}" cy="${Y(0)}" r="${f1(.34*s)}" ${fl('var(--panel)')}/><circle cx="${X(.05)}" cy="${Y(0)}" r="${f1(.2*s)}" ${st}/><path d="M${X(-.45)} ${Y(-.34)}V${Y(.36)}M${X(-.52)} ${Y(-.34)}V${Y(-.12)}M${X(-.38)} ${Y(-.34)}V${Y(-.12)}" ${st}/>`;
      case'teacher':return person(x-s*.22,y-s*.42,s*.82,'var(--neuro)')+`<text x="${X(.3)}" y="${Y(.05)}" class="t-lbl t-mid" style="fill:var(--neuro)">?</text>`;
      case'house':return `<path d="M${X(-.42)} ${Y(-.02)}L${X(0)} ${Y(-.4)}L${X(.42)} ${Y(-.02)}V${Y(.38)}H${X(-.42)}Z" ${fl('var(--brand-soft)')}/><rect x="${X(-.1)}" y="${Y(.1)}" width="${f1(.2*s)}" height="${f1(.28*s)}" ${st}/>`;
      case'bowl':return `<path d="M${X(-.42)} ${Y(-.05)}H${X(.42)}Q${X(.4)} ${Y(.38)} ${X(0)} ${Y(.38)}Q${X(-.4)} ${Y(.38)} ${X(-.42)} ${Y(-.05)}Z" ${fl('var(--gold-soft)')}/><path d="M${X(.1)} ${Y(-.05)}L${X(.36)} ${Y(-.4)}" ${st}/>`;
      case'car':return `<path d="M${X(-.46)} ${Y(.2)}V${Y(0)}L${X(-.26)} ${Y(-.22)}H${X(.22)}L${X(.46)} ${Y(0)}V${Y(.2)}Z" ${fl('var(--accent-soft)')}/><circle cx="${X(-.24)}" cy="${Y(.24)}" r="${f1(.1*s)}" ${fl('var(--ink)')}/><circle cx="${X(.24)}" cy="${Y(.24)}" r="${f1(.1*s)}" ${fl('var(--ink)')}/>`;
      case'school':return `<path d="M${X(-.44)} ${Y(.38)}V${Y(-.1)}L${X(0)} ${Y(-.38)}L${X(.44)} ${Y(-.1)}V${Y(.38)}Z" ${fl('var(--panel-2)')}/><circle cx="${X(0)}" cy="${Y(-.08)}" r="${f1(.09*s)}" ${st}/><rect x="${X(-.1)}" y="${Y(.12)}" width="${f1(.2*s)}" height="${f1(.26*s)}" ${st}/>`;
      case'sofa':return `<path d="M${X(-.46)} ${Y(.28)}V${Y(-.06)}H${X(-.32)}V${Y(-.3)}H${X(.32)}V${Y(-.06)}H${X(.46)}V${Y(.28)}Z" ${fl('var(--rx-soft)')}/><path d="M${X(-.32)} ${Y(.06)}H${X(.32)}" ${st}/>`;
      case'pencil':return `<path d="M${X(-.36)} ${Y(.36)}L${X(-.3)} ${Y(.14)}L${X(.22)} ${Y(-.38)}L${X(.38)} ${Y(-.22)}L${X(-.14)} ${Y(.3)}Z" ${fl('var(--gold-soft)')}/>`;
      case'moon':return `<path d="M${X(.1)} ${Y(-.4)}A${f1(.4*s)} ${f1(.4*s)} 0 1 0 ${X(.4)} ${Y(.2)}A${f1(.3*s)} ${f1(.3*s)} 0 0 1 ${X(.1)} ${Y(-.4)}Z" ${fl('var(--neuro-soft)')}/>`}
    return ''}

  /* ---- the scene box: one small picture per activity ---- */
  function child(x,y,v,o={}){const mouth=v<.38?'smile':v<.62?'flat':'wavy';
    return `<rect x="${f1(x-15)}" y="${f1(y+18)}" width="30" height="34" rx="9" style="fill:var(--gold);opacity:.85"/>`+face(x,y,19,{mouth,brows:v>.55?'tense':'calm',ear:o.ear,gaze:o.gaze})}
  function sceneSVG(sc,bx,by,bw,bh,v,t,S){
    const fy=by+bh-16,cx=bx+bw*.5;let g=`<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="10" style="fill:var(--field);stroke:var(--line)"/><line x1="${bx+8}" x2="${bx+bw-8}" y1="${fy}" y2="${fy}" style="stroke:var(--line);stroke-width:2"/>`;
    const ppl=(n,x0,x1,y,s,seed,mv)=>{const r=rng(seed);let o='';for(let i=0;i<n;i++){const px=lerp(x0,x1,(i+.5)/n)+(r()-.5)*10+(mv?Math.sin(t*90+i*1.7)*mv:0);o+=person(px,y-s,s,i%3?'var(--muted)':'var(--accent)',{op:.75})}return o};
    const sw=(x,y,amp,n)=>{let o='';for(let i=0;i<n;i++)o+=wave(x+i*16,y-i*3,14,amp*(.6+.4*Math.sin(t*120+i)),{freq:2,phase:(t*30+i*.3)%1,sw:1.3});return o};
    const bub=(x,y,w,txt,o={})=>bubble(x,y,w,22,Object.assign({text:txt,tail:'left'},o));
    const cy=fy-56;
    switch(sc){
      case'gate':{g+=`<path d="M${bx+bw*.62} ${fy}V${by+30}M${bx+bw*.9} ${fy}V${by+30}M${bx+bw*.62} ${by+34}Q${bx+bw*.76} ${by+14} ${bx+bw*.9} ${by+34}" style="fill:none;stroke:var(--muted);stroke-width:3"/>`;
        for(let i=0;i<6;i++)g+=`<line x1="${f1(bx+bw*.62+i*bw*.056)}" x2="${f1(bx+bw*.62+i*bw*.056)}" y1="${by+40}" y2="${fy}" style="stroke:var(--muted);stroke-width:1;opacity:.6"/>`;
        g+=ppl(4,bx+bw*.62,bx+bw*.9,fy,34,4,3)+person(bx+bw*.16,fy-58,58,'var(--brand)')+child(bx+bw*.36,cy,v);
        g+=S.adult?`<text x="${bx+bw*.76}" y="${by+18}" class="t-xs t-mid" style="fill:var(--rx)">met by a known adult</text>`:`<text x="${bx+bw*.76}" y="${by+18}" class="t-xs t-mid">crowded gate, bell</text>`;break}
      case'class':{g+=`<rect x="${bx+16}" y="${by+14}" width="${f1(bw*.42)}" height="44" rx="3" style="fill:var(--panel);stroke:var(--muted)"/><text x="${f1(bx+16+bw*.21)}" y="${by+40}" class="t-sm t-mid" style="fill:var(--ink)">${t<.3?'7 × 8 = ?':'Chapter 3'}</text>`;
        g+=person(bx+bw*.5,fy-70,70,'var(--accent)')+`<rect x="${f1(cx+36)}" y="${fy-30}" width="${f1(bw*.36)}" height="10" rx="2" style="fill:var(--cortex-line)"/>`+child(cx+60+bw*.1,cy-4,v,{gaze:90});
        if(S.teacch){const tx=bx+bw-62;g+=`<g>${[0,1,2].map(i=>`<rect x="${tx+i*16}" y="${by+16}" width="13" height="13" rx="2" style="fill:${(t*40)%3>i?'var(--rx-soft)':'var(--panel)'};stroke:var(--rx)"/><text x="${tx+i*16+6.5}" y="${by+26}" class="t-xs t-mid" style="fill:var(--rx)">${i+1}</text>`).join('')}<text x="${tx+22}" y="${by+42}" class="t-xs t-mid" style="fill:var(--rx)">work → done</text></g>`}
        else g+=`<text x="${bx+bw-40}" y="${by+26}" class="t-xs t-mid">how long?</text>`;break}
      case'yard':{g+=`<circle cx="${bx+bw-30}" cy="${by+24}" r="12" style="fill:var(--gold-soft);stroke:var(--gold)"/>`+ppl(6,bx+20,bx+bw*.62,fy,36,7,14);
        g+=`<circle cx="${f1(bx+bw*.3+Math.sin(t*70)*60)}" cy="${f1(fy-10-Math.abs(Math.sin(t*140))*40)}" r="6" style="fill:var(--rx-soft);stroke:var(--ink)"/>`+child(bx+bw*.8,cy,v,{gaze:180});
        if(S.adult)g+=person(bx+bw*.92,fy-60,60,'var(--rx)');
        g+=S.quiet?`<text x="${bx+bw*.78}" y="${by+20}" class="t-xs t-mid" style="fill:var(--rx)">quiet club open</text>`:sw(bx+30,by+30,5,5);break}
      case'trans':{g+=ppl(7,bx+14,bx+bw-14,fy,34,11,22)+`<path d="M${bx+30} ${by+30}H${bx+bw-40}" class="arrow" marker-end="url(#shArr)"/>`+child(bx+bw*.5,cy,v);
        g+=S.warn?`<text x="${f1(cx)}" y="${by+22}" class="t-xs t-mid" style="fill:var(--rx)">"2 minutes, then reading"</text>`:sw(bx+bw*.68,by+48,6,4);break}
      case'lunch':{for(let i=0;i<3;i++)g+=`<rect x="${f1(bx+18+i*bw*.22)}" y="${fy-30}" width="${f1(bw*.18)}" height="9" rx="2" style="fill:var(--cortex-line)"/>`;
        g+=ppl(9,bx+12,bx+bw*.68,fy-14,30,21,4)+sw(bx+20,by+30,7,8);
        g+=S.quiet?`<rect x="${f1(bx+bw*.74)}" y="${by+10}" width="${f1(bw*.24)}" height="${bh-30}" rx="6" style="fill:var(--rx-soft);opacity:.7"/><text x="${f1(bx+bw*.86)}" y="${by+24}" class="t-xs t-mid" style="fill:var(--rx)">quieter table</text>`+child(bx+bw*.86,cy,v,{ear:true}):child(bx+bw*.82,cy,v,{gaze:200});break}
      case'change':{g+=`<rect x="${bx+16}" y="${by+14}" width="${f1(bw*.36)}" height="40" rx="3" style="fill:var(--panel);stroke:var(--muted)"/><text x="${f1(bx+16+bw*.18)}" y="${by+38}" class="t-sm t-mid" style="fill:var(--ink)">Art</text>`;
        g+=person(bx+bw*.46,fy-72,72,'var(--neuro)')+bub(bx+bw*.5,by+12,112,"I'm Mr K, hello!")+child(bx+bw*.8,cy,v,{gaze:180});
        g+=bubble(bx+bw*.68,cy-50,S.warn||S.sched?96:40,22,{think:true,tail:'left',text:S.warn||S.sched?'knew this':'?',col:S.warn||S.sched?'var(--rx)':'var(--bad)'});
        if(S.adult)g+=person(bx+bw*.95,fy-58,58,'var(--rx)');break}
      case'home':{g+=`<path d="M${bx+bw*.6} ${fy}V${by+30}M${bx+bw*.9} ${fy}V${by+30}M${bx+bw*.6} ${by+34}Q${bx+bw*.75} ${by+14} ${bx+bw*.9} ${by+34}" style="fill:none;stroke:var(--muted);stroke-width:3"/>`;
        g+=person(bx+bw*.2,fy-60,60,'var(--brand)')+child(bx+bw*.4,cy,v)+ppl(3,bx+bw*.62,bx+bw*.9,fy,34,31,6);
        g+=`<text x="${bx+bw*.75}" y="${by+18}" class="t-xs t-mid">${S.sched?'card 7 of 7: home':'home time, at last'}</text>`;break}
      case'kitchen':{g+=`<rect x="${f1(bx+bw*.3)}" y="${fy-32}" width="${f1(bw*.4)}" height="10" rx="2" style="fill:var(--cortex-line)"/>`+ico('bowl',bx+bw*.4,fy-44,22);
        g+=`<circle cx="${bx+bw-40}" cy="${by+36}" r="18" style="fill:var(--panel);stroke:var(--ink)"/><path d="M${bx+bw-40} ${by+36}V${by+24}M${bx+bw-40} ${by+36}L${f1(bx+bw-40+Math.cos(t*30)*12)} ${f1(by+36+Math.sin(t*30)*12)}" style="stroke:var(--ink);stroke-width:1.6"/>`;
        g+=child(bx+bw*.55,cy-6,v)+person(bx+bw*.14,fy-62,62,'var(--brand)');
        if(S.sched)g+=[0,1,2,3].map(i=>`<rect x="${bx+14+i*24}" y="${by+12}" width="20" height="20" rx="3" style="fill:${t>.035*(i+1)?'var(--rx-soft)':'var(--panel)'};stroke:var(--rx)"/>`).join('')+`<text x="${bx+60}" y="${by+44}" class="t-xs t-mid" style="fill:var(--rx)">dress → eat → teeth → shoes</text>`;break}
      case'door':{g+=`<rect x="${f1(bx+bw*.08)}" y="${by+20}" width="54" height="${fy-by-20}" rx="3" style="fill:var(--panel-2);stroke:var(--ink)"/>`+ico('car',bx+bw*.82,fy-18,48);
        g+=child(bx+bw*.45,cy,v)+person(bx+bw*.62,fy-62,62,'var(--brand)');
        g+=S.warn?`<text x="${f1(cx)}" y="${by+22}" class="t-xs t-mid" style="fill:var(--rx)">timer: "shoes in 5 minutes"</text>`:bub(bx+bw*.66,by+12,86,'Hurry up!',{col:'var(--bad)'});break}
      case'away':{g+=`<rect x="${bx+10}" y="${by+10}" width="${bw-20}" height="${bh-30}" rx="8" style="fill:url(#shHatch)"/><text x="${f1(cx)}" y="${f1(by+bh/2-6)}" class="t-lbl t-mid">at school</text><text x="${f1(cx)}" y="${f1(by+bh/2+12)}" class="t-xs t-mid">the school day's load comes home with the child</text>`;break}
      case'sofa':{g+=ico('sofa',bx+bw*.42,fy-30,70)+child(bx+bw*.42,cy-10,v,{ear:S.quiet})+`<path d="M${bx+bw*.78} ${fy}V${by+40}M${bx+bw*.72} ${by+40}H${bx+bw*.84}L${bx+bw*.8} ${by+24}H${bx+bw*.76}Z" style="fill:var(--gold-soft);stroke:var(--ink);stroke-width:1.4"/>`;
        g+=S.quiet?`<text x="${f1(cx)}" y="${by+20}" class="t-xs t-mid" style="fill:var(--rx)">time alone, no questions yet</text>`:bub(bx+bw*.6,by+12,120,'How was school?',{col:'var(--warn)'});break}
      case'desk':{g+=`<rect x="${f1(bx+bw*.3)}" y="${fy-34}" width="${f1(bw*.42)}" height="10" rx="2" style="fill:var(--cortex-line)"/>`+ico('pencil',bx+bw*.46,fy-46,20)+child(bx+bw*.6,cy-8,v,{gaze:100});
        if(S.adult)g+=person(bx+bw*.82,fy-62,62,'var(--brand)');
        g+=S.teacch?`<text x="${f1(cx)}" y="${by+20}" class="t-xs t-mid" style="fill:var(--rx)">3 questions, then finished box</text>`:`<text x="${f1(cx)}" y="${by+20}" class="t-xs t-mid">a whole worksheet, no end in sight</text>`;break}
      case'dinner':{g+=`<rect x="${f1(bx+bw*.18)}" y="${fy-32}" width="${f1(bw*.6)}" height="10" rx="2" style="fill:var(--cortex-line)"/>`+person(bx+bw*.22,fy-62,62,'var(--brand)')+person(bx+bw*.38,fy-44,44,'var(--accent)')+person(bx+bw*.54,fy-62,62,'var(--muted)');
        g+=child(bx+bw*.74,cy,v,{ear:S.quiet})+(S.quiet?'':sw(bx+bw*.3,by+30,5,4))+`<text x="${f1(bx+bw*.38)}" y="${by+20}" class="t-xs t-mid">sibling</text>`;break}
      case'bed':{g+=`<rect x="${f1(bx+bw*.2)}" y="${fy-30}" width="${f1(bw*.5)}" height="20" rx="4" style="fill:var(--neuro-soft);stroke:var(--ink)"/>`+ico('moon',bx+bw-40,by+34,34)+child(bx+bw*.3,cy+10,v);
        g+=S.sched?`<text x="${f1(cx)}" y="${by+20}" class="t-xs t-mid" style="fill:var(--rx)">same steps, same order, every night</text>`:`<text x="${f1(cx)}" y="${by+20}" class="t-xs t-mid">screens off now? why?</text>`;break}
    }
    return g}

  /* ---- notes ---- */
  const STEPS={
   school:[
    {from:0,at:.03,k:'08:30 · arrival',t:'Arrival and the visual schedule',
     txt:`A visual activity schedule shows the day as a row of pictures, symbols or words; each finished card is ticked or moved to "done". A review of 31 studies (16 of acceptable quality) concluded that visual activity schedules meet criteria as an evidence-based practice from preschool through adulthood, especially when combined with systematic instruction. [[Knight2015]] Without one, the child sees only "now" and has to guess the rest: here the strip shows question marks. Predictability is one of six principles autistic adults named for enabling spaces. [[MacLennan2023]]`,
     pt:`A picture timetable shows what is coming next, so there are fewer surprises in the day.`,
     hook:`Visual activity schedules meet criteria as an evidence-based practice. [[Knight2015]]`},
    {from:.05,at:.16,k:'09:00 · lessons',t:'Lessons with structure',
     txt:`Structured teaching (TEACCH) organises the room, the timetable and each task, so the child can see what to do, how much, and what comes after: here a tray of three numbered tasks leads to "done". A meta-analysis of 13 TEACCH studies (172 people) found small effects on perceptual, motor, verbal and cognitive skills and moderate-to-large gains in social and maladaptive behaviour; the authors called the results exploratory. <span class="ev early">Early evidence</span> [[ViruesOrtega2013]] The third-generation US review found 28 focused practices that met its criteria for evidence-based practice. [[Hume2021]]`,
     pt:`Work laid out step by step, with a clear end, is easier to start and to finish.`,
     hook:`TEACCH = structured teaching; pooled evidence is exploratory. [[ViruesOrtega2013]]`},
    {from:.286,at:.32,k:'10:30 · break',t:'Break time',
     txt:`Breaks are loud, unstructured and social, and that is where bullying often happens. Pooled across 17 studies, 44% of autistic school-age youth had been bullied, 10% had bullied others and 16% both. [[Maiano2016]] In US national data, 46.3% had been bullied in the past school year, more often with more classes in general education, ADHD, lower social skills and some conversational ability. [[Sterzing2012]] A trusted adult nearby and a quiet alternative, such as a lunchtime club, lower this peak in the drawing.`,
     pt:`Breaks can be the hardest part of the day: noisy, no written rules, and more chance of being picked on.`,
     hook:`Bullying victimisation: pooled 44% (Maiano 2016); 46.3% in US national data (Sterzing 2012). [[Maiano2016,Sterzing2012]]`},
    {from:.5,at:.565,k:'12:00 · lunch',t:'The lunch hall',
     txt:`Noise, echo, smells and crowding peak at once. More than half of autistic youth have sensory over-responsivity, which often comes with anxiety. <span class="ev early">Early evidence</span> [[Green2015SOR]] In six children with hyperacusis, noise-attenuating headphones lowered skin-conductance arousal (single-subject design), and parents and teachers said they increased participation at school. [[Pfeiffer2019EDA,Pfeiffer2019Participation]] Without supports the needle crosses the dashed overload line: autistic people describe a meltdown as being overwhelmed, not as chosen behaviour, and a shutdown as a quieter, inward version. [[Lewis2023Meltdown,Phung2021]]`,
     pt:`The noise and crowd add up. Ear defenders, a quieter table or eating somewhere calmer keep it under the line.`,
     hook:`Meltdown = overload, not chosen behaviour; shutdown = the quieter, inward response. [[Lewis2023Meltdown,Phung2021]]`},
    {from:.64,at:.68,k:'13:00 · a change',t:'A change of teacher',
     txt:`A supply teacher replaces the class teacher. Without warning, the change is a sharp peak that lingers all afternoon. A warning in the morning, a photo of the new adult on the schedule and a familiar adult nearby soften it. Autistic young people said compassion and collaboration from trusted adults help, while demands such as eye contact during distress make things worse. [[Phung2021]] Social Stories, short personalised stories about what will happen, are widely used, but their pooled effect is "low to questionable". <span class="ev early">Early evidence</span> [[Kokina2010]]`,
     pt:`A change is easier if someone tells you before it happens and a person you trust is close by.`,
     hook:`Social Stories: low to questionable overall effect, better for reducing behaviours that cause problems than teaching social skills. [[Kokina2010]]`},
    {from:.86,at:.95,k:'15:00 · home time',t:'Home time, and tomorrow',
     txt:`Count the times the needle crossed the line today (readout below the drawing). Days like that can turn into not going at all. Parents of 486 UK autistic students reported 5 of 23 days missed in a month, and 43% of students met the threshold for persistent absence; 43% of absences were school refusal and 9% exclusion. [[Totsika2020]] In a multi-informant English study, pupils who avoided school or were excluded could attend and enjoy it when they received the right support. [[Gray2023School]] Switch to <b>At home</b> to see where the day's load goes next.`,
     pt:`When school keeps going over the line, a child may stop wanting to go. Better support at school is what helps, not more pressure.`,
     hook:`43% persistent absence; school refusal is the commonest reason. [[Totsika2020]]`}],
   home:[
    {from:0,at:.07,k:'07:00 · morning',t:'The morning routine',
     txt:`Getting dressed and eating breakfast is a chain of small steps against the clock. A picture sequence (dress, eat, teeth, shoes) turns it into a visible routine. Parenting stress is higher in parents of autistic children than of typically developing children, with a large effect size in a meta-analysis. [[Hayes2013]] Across 133 studies, stress was linked more to the child's externalising problems (r = 0.57) than internalising ones (r = 0.37). [[Barroso2018]]`,
     pt:`Mornings are hard for many families. A picture list of the steps can take the arguing out of it.`,
     hook:`Parenting stress: large effect versus typically developing comparisons (Hayes 2013). [[Hayes2013]]`},
    {from:.16,at:.24,k:'08:00 · leaving',t:'Leaving the house',
     txt:`"Hurry up!" is a demand with no picture and no time. A timer and a warning ("shoes in 5 minutes") make the change visible. Parent training teaches strategies like these: in the RUBI trial of 180 children aged 3–7, parent-rated irritability fell 47.7% with 24 weeks of parent training against 31.8% with parent education, and a blinded clinician rated 68.5% against 39.6% as responders. Neither parent measure reached its prespecified minimal clinically important difference. [[Bearss2015]] A meta-analysis of 8 RCTs found a standardised mean difference of −0.59. [[Postorino2017]]`,
     pt:`Parent training teaches practical ways to handle the hard moments at home, and it helps many families.`,
     hook:`RUBI: parent training beat parent education (ABC-Irritability −47.7% vs −31.8%). [[Bearss2015]]`},
    {from:.3,at:.47,k:'15:30 · after school',t:'The school day comes home',
     txt:`The hatched band is the school day. The child arrives home carrying its load, which is why the curve starts high: switch supports on at school and this peak falls too. Autistic adults describe trying to get away or be alone when overload is building, to avoid harm. [[Lewis2023Meltdown]] "Recovery" space is one of the six principles of enabling places. [[MacLennan2023]] A quiet corner and time before questions let the load drain.`,
     pt:`Some children hold it together at school and let it out at home. Quiet time first, questions later.`,
     hook:`Overload builds across settings: what happens at school shows up at home.`},
    {from:.56,at:.62,k:'17:00 · homework',t:'Homework and demands',
     txt:`A whole worksheet with no visible end is a big demand; three questions and a "finished" box is a small one. Caregivers carry these hours too: in 31 studies (9,208 parents of autistic children), 31% had a depressive disorder and 33% an anxiety disorder. [[Schnabel2020]] In the REACH-ASD trial, an online group programme for newly diagnosed families, with Acceptance and Commitment Therapy, improved caregiver mental health at 52 weeks against usual psychoeducation. <span class="ev early">Early evidence</span> [[Leadbitter2025]]`,
     pt:`Caring can be very tiring. Many parents feel stressed, anxious or low, and help for parents is part of help for the child.`,
     hook:`Parents of autistic children: depression 31%, anxiety 33% (pooled). [[Schnabel2020]]`},
    {from:.7,at:.76,k:'18:00 · dinner',t:'Family time and siblings',
     txt:`Dinner is noisy, smelly and social, with a sibling too. Across 69 samples, siblings had slightly more negative outcomes overall (Hedges g −0.26), mainly anxiety and depression, with no difference in adjustment or family functioning; the authors recommend including siblings in support. [[Shivers2019]] Respite matters: in 101 couples, each extra hour a week of respite care went with higher marital quality, through lower daily stress. [[Harper2013]]`,
     pt:`Brothers and sisters need support too, and good services include them. Short breaks help the whole family.`,
     hook:`Siblings: small overall difference (g −0.26), mainly anxiety and depression. [[Shivers2019]]`},
    {from:.84,at:.93,k:'19:30 · bed',t:'Bedtime',
     txt:`The same steps in the same order every night is a visual schedule for bedtime. Sleep problems are reported in 40–80% of autistic children and adolescents. [[Cortesi2010]] Sleep, and the medicines sometimes used for it, are covered in <a href="#health" data-go="health">Physical health, sleep &amp; safety</a> and <a href="#meds" data-go="meds">Medication</a>.`,
     pt:`A calm, predictable bedtime routine helps many children settle.`,
     hook:`Sleep problems: reported in 40–80% of autistic children and adolescents. [[Cortesi2010]]`}]};

  /* ---- layout ---- */
  function draw(t){
    const N=vb(svg,'720 400','400 620');
    const L=N?{cx0:12,cw:50,cg:4,cy:8,ch:54,bx:12,by:74,bw:376,bh:168,dx:96,dy:326,dr:58,sx:186,sy:270,gx0:40,gx1:370,gy0:404,gy1:500,hy:516,lg:546}
             :{cx0:34,cw:84,cg:10,cy:8,ch:62,bx:24,by:84,bw:410,bh:170,dx:570,dy:196,dr:66,sx:480,sy:92,gx0:52,gx1:700,gy0:282,gy1:356,hy:372,lg:392};
    const S=sup,cur=stressCurve(scene,S),any=SUPS.some(k=>S[k]),alt=stressCurve(scene,any?{}:{sched:1,warn:1,quiet:1,teacch:1,adult:1});
    const i=Math.round(t*300),v=cur[i],e=evAt(scene,t);let s=`<defs>${marker('shArr')}<pattern id="shHatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="8" height="8" style="fill:var(--panel-2)"/><line x1="0" y1="0" x2="0" y2="8" style="stroke:var(--line);stroke-width:3"/></pattern></defs>`;
    /* schedule strip */
    CARDS[scene].forEach((cd,k)=>{const x=L.cx0+k*(L.cw+L.cg),y=L.cy,now=k===e.c,done=k<e.c,show=S.sched||now;
      s+=`<rect x="${x}" y="${y}" width="${L.cw}" height="${L.ch}" rx="7" style="fill:${now?'var(--brand-soft)':'var(--panel)'};stroke:${now?'var(--brand)':'var(--line)'};stroke-width:${now?2.2:1.2};opacity:${done&&S.sched?.55:1}"/>`;
      if(show){s+=ico(cd[0],x+L.cw/2,y+L.ch*.4,N?22:26)+`<text x="${f1(x+L.cw/2)}" y="${y+L.ch-6}" class="t-xs t-mid" style="fill:var(--ink)">${cd[1]}</text>`;
        if(done)s+=`<path d="M${x+L.cw-18} ${y+12}l4 4l8 -9" style="fill:none;stroke:var(--rx);stroke-width:2.4;stroke-linecap:round"/>`}
      else s+=`<text x="${f1(x+L.cw/2)}" y="${f1(y+L.ch/2+7)}" class="t-big t-mid" style="fill:var(--muted)">?</text>`});
    /* scene */
    s+=sceneSVG(e.sc,L.bx,L.by,L.bw,L.bh,v,t,S);
    /* dial and status */
    const word=v<.4?'calm':v<.6?'rising':v<TH?'near overload':'over the line';
    s+=dial(L.dx,L.dy,L.dr,v,{th:TH,label:'stress (schematic)'});
    s+=`<text x="${N?L.sx:L.dx}" y="${N?L.sy+8:L.dy-L.dr-38}" class="${N?'t-xs':'t-sm t-mid'}">${hourOf(scene,t)} · ${N&&e.n.length>22?e.n.slice(0,21)+'…':e.n}</text>`;
    s+=`<text x="${N?L.sx:L.dx}" y="${N?L.sy+30:L.dy-L.dr-18}" class="t-big ${N?'':'t-mid'}" style="fill:${v>=TH?'var(--bad)':v>=.6?'var(--warn)':'var(--calm)'}">${word}</text>`;
    const on=SUPS.filter(k=>S[k]).map(k=>SUPN[k]);
    if(N){s+=`<text x="${L.sx}" y="${L.sy+52}" class="t-xs">supports on: ${on.length}/5</text>`;if(v>=TH)s+=`<text x="${L.sx}" y="${L.sy+70}" class="t-xs" style="fill:var(--bad)">meltdown or shutdown likely</text>`}
    else{s+=`<text x="${L.dx}" y="${L.dy+34}" class="t-xs t-mid">supports on: ${on.length?on.join(', '):'none'}</text>`;if(v>=TH)s+=`<text x="${L.dx}" y="${L.dy+50}" class="t-xs t-mid" style="fill:var(--bad)">meltdown or shutdown likely</text>`}
    /* the curve over the day */
    const X=u=>lerp(L.gx0,L.gx1,u),Y=w=>lerp(L.gy1,L.gy0,w);
    s+=`<text x="${L.gx0}" y="${L.gy0-10}" class="t-sm">${N?'STRESS ACROSS THE DAY':'STRESS ACROSS THE DAY · solid: this setting, dashed: '+(any?'without supports':'with all supports')}</text>`;
    if(scene==='home')s+=`<rect x="${f1(X(.3))}" y="${L.gy0}" width="${f1(X(.4)-X(.3))}" height="${L.gy1-L.gy0}" style="fill:url(#shHatch);opacity:.8"/>`;
    s+=`<line x1="${L.gx0}" x2="${L.gx1}" y1="${f1(Y(TH))}" y2="${f1(Y(TH))}" style="stroke:var(--bad);stroke-width:1.2;stroke-dasharray:5 4"/><text x="${L.gx1}" y="${f1(Y(TH)-4)}" class="t-xs t-end" style="fill:var(--bad)">overload</text>`;
    s+=`<line x1="${L.gx0}" x2="${L.gx1}" y1="${L.gy1}" y2="${L.gy1}" class="axis"/>`;
    EV[scene].forEach(ev=>{if(ev.k==='away')return;const x=X(ev.a);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${L.gy1}" y2="${L.gy1+4}" style="stroke:var(--muted)"/>`});
    const pth=(arr,upto)=>{let d='';for(let k=0;k<=upto;k++)d+=(k?'L':'M')+f1(X(k/300))+' '+f1(Y(arr[k]));return d};
    s+=`<path d="${pth(alt,300)}" style="fill:none;stroke:var(--muted);stroke-width:1.4;stroke-dasharray:4 3;opacity:.8"/>`;
    s+=`<path d="${pth(cur,i)}" style="fill:none;stroke:var(--brand);stroke-width:2.6;stroke-linejoin:round"/>`;
    /* moments over the line so far */
    let over=0,was=false;for(let k=0;k<=i;k++){const o=cur[k]>=TH;if(o&&!was){over++;s+=`<circle cx="${f1(X(k/300))}" cy="${f1(Y(cur[k]))}" r="4" style="fill:var(--bad)"/>`}was=o}
    s+=`<line x1="${f1(X(t))}" x2="${f1(X(t))}" y1="${L.gy0}" y2="${L.gy1}" style="stroke:var(--ink);opacity:.35"/><circle cx="${f1(X(t))}" cy="${f1(Y(v))}" r="4.5" style="fill:var(--brand);stroke:var(--panel);stroke-width:1.5"/>`;
    const hrs=scene==='school'?(N?[[0,'8:30'],[.5,'12:00'],[1,'15:30']]:[[0,'8:30'],[.214,'10:00'],[.5,'12:00'],[.714,'13:30'],[1,'15:30']]):[[0,'7:00'],[.3,'8:15'],[.4,'15:30'],[.7,'18:00'],[1,'20:30']];
    hrs.forEach(([u,l])=>s+=`<text x="${f1(X(u))}" y="${L.hy}" class="t-xs t-mid">${l}</text>`);
    if(N)s+=`<text x="${L.gx0}" y="${L.lg}" class="t-xs"><tspan style="fill:var(--brand)">— this setting</tspan>   <tspan>- - ${any?'without supports':'with all supports'}</tspan></text><text x="${L.gx0}" y="${L.lg+18}" class="t-xs" style="fill:var(--warn)">SCHEMATIC · one illustrative child</text>`;
    else s+=`<text x="${L.gx0}" y="${L.lg}" class="t-xs" style="fill:var(--warn)">SCHEMATIC · one illustrative child</text>`;
    svg.innerHTML=s;
    const ph=phaseOf(STEPS[scene],t);setSt(ph);
    $('#shNote').innerHTML=noteHTML(STEPS[scene][ph]);
    const peak=Math.max(...cur),peakAlt=Math.max(...alt);
    $('#shRead').innerHTML=`<span>time <b>${hourOf(scene,t)}</b></span><span>now <b>${e.n}</b></span><span>over the line so far <b>${over}</b></span><span>highest today <b>${peak>=TH?'over':'under'}</b> the line (${any?'without':'with all'} supports: <b>${peakAlt>=TH?'over':'under'}</b>)</span>`;
  }
  const stop=playWire(rg,$('#shPlay'),draw,24000,'Replay','school');
  function wire(){const old=$('#shSteps'),nu=old.cloneNode(false);old.replaceWith(nu);setSt=stepWire(nu,STEPS[scene],rg,draw,stop)}
  function syncBtns(){const n=SUPS.filter(k=>sup[k]).length;
    $$('[data-shs]').forEach(b=>b.setAttribute('aria-pressed',!!sup[b.dataset.shs]));
    $$('[data-shm]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.shm==='on'?n===5:n===0))}
  $$('[data-shsc]').forEach(b=>b.addEventListener('click',()=>{stop();scene=b.dataset.shsc;$$('[data-shsc]').forEach(x=>x.setAttribute('aria-pressed',x===b));rg.value=STEPS[scene][0].at;wire();draw(+rg.value)}));
  $$('[data-shm]').forEach(b=>b.addEventListener('click',()=>{const on=b.dataset.shm==='on';SUPS.forEach(k=>sup[k]=on?1:0);syncBtns();draw(+rg.value)}));
  $$('[data-shs]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.shs;sup[k]=sup[k]?0:1;syncBtns();draw(+rg.value)}));
  wire();syncBtns();draw(+rg.value);

  /* ================= education-rights navigator ================= */
  const nsvg=$('#shNavSvg');let J='us',A='no',W='learn';
  const NV={
    us:{q:'Does the child need specially designed teaching (special education), not only changes that give access to ordinary lessons?',
      yes:{n:'An IEP under IDEA',sh:'IEP (IDEA)',s:'Individualized Education Program',
        txt:`The Individuals with Disabilities Education Act (IDEA) provides special education services to eligible students with disabilities, including autistic students, up to age 21. The mean exit age of autistic students was about 18, so many leave before their eligibility ends. [[McLean2026]] In a US population cohort, school IEP services varied widely between sites. [[Hughes2024IEP]]`},
      no:{n:'A Section 504 plan',sh:'Section 504 plan',s:'Accommodations under the Rehabilitation Act',
        txt:`Section 504 of the Rehabilitation Act gives accommodations to students who may not qualify for an IEP; over 1.38 million students have 504 plans. Most of 23 families of autistic children interviewed reported negative experiences, often schools unwilling to provide accommodations, so put requests in writing and keep records. [[Lindsay2026]]`}},
    en:{q:'Are the child\'s needs more than the school can meet from the support it already arranges?',
      yes:{n:'Ask for an EHC needs assessment',sh:'EHC assessment → EHCP',s:'Education, Health and Care Plan (EHCP)',
        txt:`Education, Health and Care Plans are the legal framework for accessing additional support for school-age children in England. Six mothers of autistic children in mainstream school described the process as intimidating and overwhelmingly difficult. [[Keville2025]] Parents in another study described "fighting" a complex system. [[Gray2023School]] Advice services and advocates can help with the paperwork.`},
      no:{n:'A school support plan, reviewed together',sh:'School support plan',s:'Support the school arranges itself',
        txt:`Many children are supported by a written plan the school puts in place from its own resources. Ask for it in writing, with named supports and a review date. If the plan is not working, or needs keep growing, you can still ask for an EHC needs assessment later. [[Keville2025]]`}},
    other:{q:'Does your country have a written plan for pupils with additional needs?',
      yes:{n:'Use your country\'s plan',sh:'Your country\'s plan',s:'The same principles apply',
        txt:`Names differ (IEP, EHCP, 504 plan and many others), but the pattern is similar: an assessment of needs, a written plan, named supports and regular review. The evidence below on supports, bullying and attendance comes mainly from the US and UK.`},
      no:{n:'Ask for a written support agreement',sh:'Written agreement',s:'Even without a legal plan',
        txt:`Without a formal plan, ask the school to write down what it will do, who is responsible and when it will be reviewed. A short written agreement makes supports easier to keep when staff change.`}}};
  const WORRY={
    learn:{t:'Learning and coping',li:[`a visual schedule for the day and for tasks [[Knight2015]]`,`structured tasks with a clear end (TEACCH-style) [[ViruesOrtega2013]]`,`warnings before changes, including staff changes [[Phung2021]]`,`a quiet space or ear defenders for loud places [[Pfeiffer2019Participation]]`,`a named, trusted adult`]},
    bully:{t:'Bullying',li:[`a written plan for keeping the child safe at break and lunch [[Maiano2016]]`,`a named adult to report to, and how reports will be followed up`,`supervised or structured alternatives to the playground`,`a review of where it happens: victimisation was more likely with more classes in general education [[Sterzing2012]]`]},
    absent:{t:'Missing school',li:[`ask what lies behind the absence: in one UK survey 43% of absences were school refusal and 9% exclusion [[Totsika2020]]`,`adjust the school day (timetable, sensory load, a safe base) rather than adding pressure [[Gray2023School]]`,`watch mood: school refusal went with more withdrawn and depressive symptoms [[Munkhaugen2019]]`,`a written plan for a gradual return, with review dates`]},
    leave:{t:'Leaving school soon',li:[`start transition planning early: services begin to fall away before school ends [[Laxman2019]]`,`ask which services continue after school; 39.1% of US autistic young adults received none after high school [[Shattuck2011Services]]`,`plan work, study and daily-living goals; see <a href="#adult" data-go="adult">Autistic adults</a>`,`in the US, note that IDEA eligibility can run to 21 [[McLean2026]]`]}};
  function drawNav(){const n=vb(nsvg,'520 200','360 330'),R=NV[J],ch=R[A],ot=R[A==='yes'?'no':'yes'];
    const node=(x,y,w,h,txt,on,sub)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" style="fill:${on?'var(--brand-soft)':'var(--panel)'};stroke:${on?'var(--brand)':'var(--line)'};stroke-width:${on?2:1.2}"/><text x="${f1(x+w/2)}" y="${f1(y+h/2+(sub?-2:4))}" class="t-lbl t-mid" style="font-size:12px">${txt}</text>${sub?`<text x="${f1(x+w/2)}" y="${f1(y+h/2+12)}" class="t-xs t-mid">${sub}</text>`:''}`;
    const ln=(x1,y1,x2,y2,on)=>`<path d="M${x1} ${y1}L${x2} ${y2}" style="fill:none;stroke:${on?'var(--brand)':'var(--line)'};stroke-width:${on?2.4:1.4}" marker-end="url(#shNavA${on?1:0})"/>`;
    const jn={us:'United States',en:'England',other:'Elsewhere'}[J];let s=`<defs>${marker('shNavA1','var(--brand)')}${marker('shNavA0','var(--line)')}</defs>`;
    const yesOn=A==='yes';
    if(!n){s+=node(8,78,104,44,'A concern',true,'about school')+ln(112,100,140,100,true)+node(142,78,110,44,jn,true,'where?')+ln(252,100,280,100,true);
      s+=`<path d="M318 72L356 100L318 128L280 100Z" style="fill:var(--panel);stroke:var(--brand);stroke-width:2"/><text x="318" y="104" class="t-xs t-mid" style="fill:var(--ink)">need?</text>`;
      s+=ln(340,84,372,46,yesOn)+ln(340,116,372,154,!yesOn)+node(374,14,140,54,R.yes.sh,yesOn,'if yes')+node(374,132,140,54,R.no.sh,!yesOn,'if no / not sure')}
    else{s+=node(110,6,140,40,'A concern',true,'about school')+ln(180,46,180,62,true)+node(110,64,140,40,jn,true,'where?')+ln(180,104,180,118,true);
      s+=`<path d="M180 120L214 146L180 172L146 146Z" style="fill:var(--panel);stroke:var(--brand);stroke-width:2"/><text x="180" y="150" class="t-xs t-mid" style="fill:var(--ink)">need?</text>`;
      s+=ln(160,162,94,214,yesOn)+ln(200,162,266,214,!yesOn)+node(8,216,168,58,R.yes.sh,yesOn,'if yes')+node(184,216,168,58,R.no.sh,!yesOn,'if no / not sure');
      s+=`<text x="180" y="300" class="t-xs t-mid">general principles, not legal advice</text>`}
    nsvg.innerHTML=s;
    $('#shQ').textContent=R.q;
    const w=WORRY[W];
    $('#shOut').innerHTML=`<div class="kicker">${jn} · ${ch.s}</div><h4>${ch.n}</h4><p>${ch.txt}</p>
      <div><b>What to ask for (${w.t.toLowerCase()})</b><ul>${w.li.map(x=>`<li>${x}</li>`).join('')}</ul></div>
      <div><b>When</b><ul><li>as soon as there is a concern: you do not need a diagnosis to ask for support to be discussed</li><li>before every transition: a new class, a new school, leaving school</li><li>after any exclusion or a run of absences</li><li>at each review, and whenever the plan stops working</li></ul></div>
      <p class="stage-cap">The other route here: <b>${ot.n}</b>. General principles only, not legal advice.</p>`}
  $$('[data-shj]').forEach(b=>b.addEventListener('click',()=>{J=b.dataset.shj;$$('[data-shj]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawNav()}));
  $$('[data-sha]').forEach(b=>b.addEventListener('click',()=>{A=b.dataset.sha;$$('[data-sha]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawNav()}));
  $$('[data-shw]').forEach(b=>b.addEventListener('click',()=>{W=b.dataset.shw;$$('[data-shw]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawNav()}));
  drawNav();
  const prevR=redraws.school;redraws.school=()=>{prevR&&prevR();drawNav()};
};
