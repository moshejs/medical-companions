/* =============== home: an infection, a cross-reacting attack on the nerve, the climb of weakness, and the long way back =============== */
/* Everything drawn here is a schematic with no figures: the time axis and the weakness level have no scale.
   Module 1.6 tells the course with sources. */
const HOME_CAP='Schematic, not to scale: no times or proportions are shown here. Module 1.6 gives them, with sources.';
const HOME_PH=[
  {from:0,t:'An infection first',sub:'often a gut or chest infection, a few weeks before',k:'infection'},
  {from:.16,t:'Antibodies cross-react',sub:'some made against the germ also bind the nerve',k:'attack'},
  {from:.32,t:'Weakness climbs',sub:'from the feet upward, with tingling, over days',k:'climb'},
  {from:.5,t:'The weakest point',sub:'within four weeks; some need help to breathe',k:'nadir'},
  {from:.64,t:'A plateau',sub:'no worse, not yet better',k:'plateau'},
  {from:.78,t:'The long way back',sub:'myelin repairs, axons regrow, strength returns',k:'recovery'}];
/* the weakness level, 0..1, along the schematic course */
function homeLevel(t){if(t<.32)return 0;if(t<.52)return .82*ease(ramp(t,.32,.52));if(t<.76)return .82;return lerp(.82,.12,ease(ramp(t,.76,1)))}
inits.home=()=>{
  const svg=$('#heroSvg'),rg=$('#heroT'),cap=$('#heroCap');
  function draw(t){const N=vb(svg,'520 300','400 540'),p=phaseOf(HOME_PH,t),P=HOME_PH[p];
    const L=N?{tx:12,ty:24,bx:150,by:62,bs:200,gx:182,gy:120,nx:16,ny:332,nw:368,cx:30,cy:404,cw:356,ch:80,lx:12,ly:518,lw:376}
             :{tx:14,ty:24,bx:70,by:52,bs:190,gx:150,gy:110,nx:170,ny:118,nw:336,cx:184,cy:176,cw:320,ch:62,lx:14,ly:270,lw:492};
    const lv=homeLevel(t),inf=1-ramp(t,.18,.3),hit=ramp(t,.16,.3)*(1-ramp(t,.8,.98)),remy=ramp(t,.8,1),demy=ramp(t,.2,.4)*(1-ramp(t,.82,1)*.0);
    let s=`<text x="${L.tx}" y="${L.ty}" class="t-big" style="font-size:19px;fill:${p>=5?'var(--rec)':p>=1?'var(--brand)':'var(--ink)'}">${P.t}</text><text x="${L.tx}" y="${L.ty+15}" class="t-sm">${P.sub}</text>`;
    /* the body */
    const B=bodyFront(L.bx,L.by,L.bs,{level:lv,tingle:ramp(t,.3,.36)*(1-ramp(t,.84,.96)),vent:t>=.5&&t<.76});
    s+=B.svg;
    if(inf>0){const g=B.at.chest;s+=`<g style="opacity:${f1(inf)}">`+campy(g[0]+(N?70:62),g[1]+38,46,{ang:-12,ph:t*8})+kitLabel(g[0]+(N?70:62),g[1]+70,'gut infection',{a:'m'})+'</g>'}
    if(t>=.5&&t<.76)s+=kitLabel(B.at.mouth[0]+36,B.at.mouth[1]-10,'breathing support',{});
    /* the nerve */
    const nv=nerveFibre(L.nx,L.ny,L.nw,{n:5,h:30,nodeHit:[0,hit,hit*.8,hit,0,0],demy:[demy*.6,demy,demy*.3,0,0],remy:[remy,remy,remy*.7,0,0],mac:[0,demy*(1-remy),0,0,0],pulse:t>=.5&&t<.76?null:((t*9)%1),block:t>.3&&t<.86?1:undefined});
    s+=`<text x="${N?L.nx:L.nx+150}" y="${L.ny-34}" class="t-xs" style="fill:var(--ink);font-weight:700">a motor nerve fibre</text>`+nv.svg;
    if(hit>.3)s+=kitLabel(nv.at.nodes[2][0],L.ny+34,'antibodies at the node',{a:'m'});
    else if(remy>.3)s+=kitLabel(nv.at.nodes[2][0],L.ny+34,'thin new myelin',{a:'m'});
    /* the disability course */
    const c=curve(L.cx,L.cy,L.cw,L.ch,homeLevel,{upto:t,col:'var(--weak)',fill:true,dot:true});
    s+=c.svg+`<text x="${L.cx}" y="${L.cy-6}" class="t-xs" style="fill:var(--ink);font-weight:700">weakness over time (schematic)</text>`;
    /* phase strip */
    const sw=L.lw/HOME_PH.length;
    HOME_PH.forEach((q,i)=>{const on=i===p,x=L.lx+i*sw;s+=`<rect x="${f1(x+1)}" y="${L.ly}" width="${f1(sw-2)}" height="6" rx="3" style="fill:${on?'var(--brand)':'var(--panel-2)'}"/><text x="${f1(x+sw/2)}" y="${L.ly+20}" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:700':''}">${q.k}</text>`});
    const mx=L.lx+L.lw*t;s+=`<circle cx="${f1(mx)}" cy="${L.ly+3}" r="5.5" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;
    svg.innerHTML=s;
    if(cap.textContent!==HOME_CAP)cap.textContent=HOME_CAP;
    rg.setAttribute('aria-valuetext',`${P.t}: ${P.sub}`)}
  playWire(rg,$('#heroPlay'),draw,20000,'%t:player.replay%','home');draw(+rg.value);
};
