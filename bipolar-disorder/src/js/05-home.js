/* =============== home: one schematic year on a mood chart, with the night's sleep beside it =============== */
/* The home lede in 10-shell.html is %HOMELEDE% until the epidemiology ('what') builder writes it from
   the research. Keep these captions free of facts: a cited one can replace them once research exists. */
const HERO_CAP='Schematic, not to scale: one illustrative year. Real courses vary widely from person to person, and many people stay well for long periods with treatment.';
inits.home=()=>{
  const svg=$('#heroSvg'),rg=$('#heroT'),cap=$('#heroCap');
  const WEEKS=52;/* schematic weeks on the scrubber */
  /* an illustrative course: steady, a rise into elevated mood, back to steady, a longer dip into depression, recovery */
  const f=moodSeries([[0,.02],[.07,.04],[.12,.3],[.17,.72],[.21,.78],[.25,.42],[.3,.05],[.38,-.04],[.44,-.3],[.5,-.62],[.58,-.7],[.66,-.58],[.73,-.28],[.8,-.05],[.88,.02],[1,.03]]);
  /* schematic sleep: shorter nights with elevated mood, broken nights in depression */
  const sleepAt=v=>{const bed=23+(v>0?v*2.6:-v*.6),wake=7-(v>0?v*1.4:-v*.4)+(v<0?-v*1.6:0);return {sleep:[bed%24,wake],broken:v<-EU?Math.min(1,-v*1.1):0}};
  function phase(u){const v=f(u),p=f.pole(u),rising=f(Math.min(1,u+.01))>v;
    if(p==='up')return [v>HYPO?'Elevated mood: mania range':'Elevated mood',`var(--up)`,'less sleep, more energy'];
    if(p==='down')return [v<-.5?'Depression':(rising?'Lifting out of depression':'Sliding into depression'),'var(--down)','low mood, sleep disturbed'];
    return [u>.82?'Steady again: recovery':u>.3&&u<.44?'Back to steady':'Steady mood (euthymia)','var(--eu)','usual sleep and energy']}
  function draw(t){const N=vb(svg,'520 300','400 380');const v=f(t),[ph,col,sub]=phase(t),sl=sleepAt(v);
    /* layout tables: wide = clock left, chart right; narrow = clock and label on top, chart below */
    const L=N?{cx:62,cy:100,r:44,lx:126,ly:62,gx:20,gy:172,gw:364,gh:172,sx:126,sy:122,sw:220}
             :{cx:76,cy:132,r:54,lx:160,ly:34,gx:158,gy:66,gw:346,gh:176,sx:24,sy:236,sw:112};
    let s='';
    /* the night: a 24-hour dial with the sleep arc and a sleep bar under it */
    const ck=clock24(L.cx,L.cy,L.r,{sleep:sl.sleep,small:N});s+=ck.svg;
    s+=`<text x="${L.cx}" y="${f1(L.cy-L.r-10)}" class="t-xs t-mid">a typical night</text>`;
    const sb=sleepbar(L.sx,L.sy,L.sw,10,{sleep:sl.sleep,broken:sl.broken});s+=sb.svg;
    s+=`<text x="${f1(L.sx)}" y="${f1(L.sy+26)}" class="t-xs">noon</text><text x="${f1(L.sx+L.sw)}" y="${f1(L.sy+26)}" class="t-xs t-end">noon</text>`;
    /* the year */
    const lc=lifechart(L.gx,L.gy,L.gw,L.gh,f,{upto:t,id:'hero',labels:true,dot:true});s+=lc.svg;
    s+=tline(L.gx,L.gy+L.gh+4,L.gw,{min:0,max:WEEKS,step:13,fmt:w=>w?'wk '+w:'0'}).svg;
    /* phase label */
    s+=`<text x="${L.lx}" y="${L.ly}" class="t-big" style="fill:${col}">${ph}</text>`;
    const wk=`week ${Math.round(t*WEEKS)} of ${WEEKS}`;
    s+=N?`<text x="${L.lx}" y="${L.ly+18}" class="t-sm">${wk}</text><text x="${L.lx}" y="${L.ly+34}" class="t-sm">${sub}</text>`
        :`<text x="${L.lx}" y="${L.ly+18}" class="t-sm">${wk} · ${sub}</text>`;
    svg.innerHTML=s}
  cap.textContent=HERO_CAP;
  playWire(rg,$('#heroPlay'),draw,12000,'%t:player.replay%','home');draw(+rg.value);
};
