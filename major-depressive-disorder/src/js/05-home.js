/* =============== home: one depressive episode and recovery, as a mood line, a circuit and a neuron =============== */
/* Everything drawn here is a schematic with no figures: the mood line, the region glows, the synapse and the spines
   show direction, not amounts or times, and the picture is one illustrative course, not a prediction for anyone.
   The synapse never shows "too little serotonin": strain is drawn in the circuit and in the connections between
   neurons, and the transmitter in the cleft rises only when a medicine blocks its transporter. Modules 1.4, 2.3
   and 3.2 tell the story with sources. */
const HERO_CAP='Schematic, not to scale: no amounts or times are shown. Modules 1.4, 2.3 and 3.2 give them, with sources.';
const HERO_PH=[
  {from:0,t:'Feeling well',sub:'mood moves up and down inside a well range',k:'well'},
  {from:.14,t:'An episode begins',sub:'mood dips below that range and stays low',k:'episode'},
  {from:.32,t:'A circuit under strain',sub:'mood circuits work differently; connections thin',k:'circuit'},
  {from:.5,t:'Treatment begins',sub:'talking therapy, a medicine, or both',k:'treatment'},
  {from:.68,t:'Connections regrow',sub:'the line climbs back into the well range',k:'recovery'},
  {from:.86,t:'Staying well',sub:'continued treatment and support guard against relapse',k:'support'}];
const HERO_MOOD=[[0,.76],[.05,.8],[.1,.74],[.14,.75],[.2,.55],[.27,.3],[.34,.24],[.42,.27],[.5,.23],[.56,.27],[.62,.34],[.7,.52],[.78,.7],[.84,.77],[.9,.74],[.95,.79],[1,.76]];
/* the state of each part of the schematic, 0..1 */
function heroLv(t){
  const strain=ease(ramp(t,.16,.38))*(1-ease(ramp(t,.6,.84))),tx=ramp(t,.5,.56),block=ease(ramp(t,.52,.64)),support=ramp(t,.84,.92);
  return {strain,tx,block,support,spines:.82-.6*strain,
    glow:{amyg:.12+.78*strain,cing:.12+.72*strain,pfc:.7-.58*strain,hippo:.6-.45*strain,reward:.6-.48*strain},
    level:.38+.42*block,signal:.72-.5*strain}}
inits.home=()=>{
  const svg=$('#heroSvg'),rg=$('#heroT'),cap=$('#heroCap');
  function draw(t){const N=vb(svg,'520 300','400 560'),p=phaseOf(HERO_PH,t),P=HERO_PH[p],V=heroLv(t);
    const L=N?{tx:12,ty:24,cx:12,cy:54,cw:376,ch:112,ix:[70,200,330],iy:194,il:226,bx:8,by:262,bs:1.12,sx:252,sy:250,sw:136,sh:170,nx:70,ny:486,ns:.9,nl:[178,490],two:false,lx:12,ly:540,lw:376}
             :{tx:14,ty:24,cx:14,cy:56,cw:220,ch:128,ix:[50,125,200],iy:212,il:244,bx:250,by:62,bs:.85,sx:424,sy:56,sw:84,sh:128,nx:296,ny:232,ns:.7,nl:[384,229],two:true,lx:14,ly:276,lw:492};
    let s=`<text x="${L.tx}" y="${L.ty}" class="t-big" style="font-size:19px;fill:${p>=3?'var(--tx)':p===0?'var(--brand)':'var(--ink)'}">${P.t}</text><text x="${L.tx}" y="${L.ty+15}" class="t-sm">${P.sub}</text>`;
    /* the mood line */
    s+=moodLine(L.cx,L.cy,L.cw,L.ch,HERO_MOOD,{upto:Math.max(t,.004),dot:true,wellLabel:'well range',lowLabel:'low mood',markers:[{u:.53,label:'treatment begins',col:'var(--tx)'}]}).svg;
    /* treatment and support */
    const on=v=>.42+.58*v;
    s+=talkIcon(L.ix[0],L.iy,30,{op:on(V.tx)}).svg+`<text x="${L.ix[0]}" y="${L.il}" class="t-xs t-mid" style="opacity:${f1(on(V.tx))}">talking therapy</text>`;
    s+=pill(L.ix[1],L.iy,32,{op:on(V.tx)}).svg+`<text x="${L.ix[1]}" y="${L.il}" class="t-xs t-mid" style="opacity:${f1(on(V.tx))}">medicine</text>`;
    s+=person(L.ix[2]-9,L.iy-17,36,{op:on(V.support)}).svg+person(L.ix[2]+9,L.iy-17,36,{op:on(V.support)}).svg+`<text x="${L.ix[2]}" y="${L.il}" class="t-xs t-mid" style="opacity:${f1(on(V.support))}">support</text>`;
    /* the mood circuit, and a synapse from it */
    const B=brainSide(L.bx,L.by,L.bs,{glow:V.glow,labels:['pfc','amyg']});
    s+=`<path d="M${f1(B.at.cing[0])} ${f1(B.at.cing[1])}L${L.sx} ${L.sy+L.sh*.2}M${f1(B.at.cing[0])} ${f1(B.at.cing[1])}L${L.sx} ${L.sy+L.sh*.8}" style="fill:none;stroke:var(--line);stroke-width:1.2"/>`;
    s+=B.svg;
    s+=`<rect x="${L.sx-4}" y="${L.sy-4}" width="${L.sw+8}" height="${L.sh+8}" rx="10" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=synapse(L.sx,L.sy,L.sw,L.sh,{kind:'sero',release:.5,level:V.level,block:V.block,signal:V.signal,seed:4}).svg;
    s+=kitLabel(L.sx+L.sw/2,L.sy+L.sh+17,'a synapse',{a:'m'});
    /* a neuron whose connections thin and regrow */
    s+=neuron(L.nx,L.ny,L.ns,{spines:V.spines,active:V.signal*.5,seed:8}).svg;
    if(L.two)s+=kitLabel(L.nl[0],L.nl[1],'connections')+kitLabel(L.nl[0],L.nl[1]+12,'between neurons');
    else s+=kitLabel(L.nl[0],L.nl[1],'connections between neurons');
    /* phase strip */
    const sw=L.lw/HERO_PH.length;
    HERO_PH.forEach((q,i)=>{const act=i===p,x=L.lx+i*sw;s+=`<rect x="${f1(x+1)}" y="${L.ly-8}" width="${f1(sw-2)}" height="6" rx="3" style="fill:${act?'var(--brand)':'var(--panel-2)'}"/><text x="${f1(x+sw/2)}" y="${L.ly+12}" class="t-xs t-mid" style="${act?'fill:var(--ink);font-weight:700':''}">${q.k}</text>`});
    const mx=L.lx+L.lw*t;s+=`<circle cx="${f1(mx)}" cy="${L.ly-5}" r="5.5" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;
    svg.innerHTML=s;
    if(cap.textContent!==HERO_CAP)cap.textContent=HERO_CAP;
    rg.setAttribute('aria-valuetext',`${P.t}: ${P.sub}`)}
  playWire(rg,$('#heroPlay'),draw,24000,'%t:player.replay%','home');draw(+rg.value);
};
