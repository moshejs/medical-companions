/* =============== 3.3 Plasma exchange =============== */
/* Three players: the apheresis circuit with a removal chart (main), the French 1997 "how many exchanges" explorer,
   and a clickable forest plot of the 2017 Cochrane review. Removal curves follow the general first-order apheresis
   model in Williams 2014; the rebound between sessions is illustrative and labelled so. */
const PX_STEPS=[
 {from:0,at:.05,k:'Step 1 · access',sv:'Blood leaves through a line',sub:'usually a large catheter in a big vein',
  t:'A line into a large vein',
  txt:'Plasma exchange draws blood out, separates the plasma, and returns the blood cells with a replacement fluid. It removes high-molecular-weight substances from plasma, including autoantibodies, immune complexes and immunoglobulin paraproteins [[Williams2014]]. It often needs a central venous catheter, whose risks include severe sepsis and catheter-related deep vein thrombosis [[Islam2018]].',
  pt:'Plasma exchange takes out the liquid part of the blood and replaces it, to remove harmful antibodies. It often needs a large line in a vein [[vanDoorn2023,Islam2018]].',
  hook:'Plasma exchange = remove plasma (with antibodies and immune complexes), return cells, replace volume [[Williams2014]].'},
 {from:.16,at:.24,k:'Step 2 · separation',sv:'The machine splits the blood',sub:'plasma one way, cells the other',
  t:'The separator splits plasma from cells',
  txt:'A centrifuge or filter separates plasma from the blood cells. Severe cardiovascular autonomic instability is a relative contraindication with discontinuous machines, because of large volume shifts; this is less of a problem with continuous-flow machines [[vanDoorn2023]].',
  pt:'A machine spins the blood so the liquid part separates from the cells.',
  hook:'Autonomic instability: a relative contraindication to discontinuous plasma exchange [[vanDoorn2023]].'},
 {from:.32,at:.4,k:'Step 3 · removal',sv:'Plasma, with antibodies, goes',sub:'into a waste bag, with what it carries',
  t:'The plasma, and what it carries, is discarded',
  txt:'Removing plasma takes out circulating autoantibodies and immune complexes [[Williams2014]]. Plasma exchange may also change lymphocyte numbers and function and the Th1/Th2 balance, but "much remains unknown" about how it works <span class="ev hyp">Hypothesis</span> [[Reeves2014]].',
  pt:'The removed liquid carries some of the antibodies that are attacking the nerves away with it [[Williams2014]].',
  hook:'Mechanism: antibody and immune complex removal is direct; immune modulation is proposed [[Williams2014,Reeves2014]].'},
 {from:.48,at:.56,k:'Step 4 · replacement',sv:'Albumin replaces the plasma',sub:'cells go back with a replacement fluid',
  t:'Cells go back, with albumin in place of plasma',
  txt:'In the French trial, albumin and fresh frozen plasma worked equally well, but fresh frozen plasma brought more incidents and complications, and the authors recommended abandoning it [[FrenchPE1987]]. In a general apheresis series (not GBS-specific), hypotension occurred in 15.2% of sessions and hypocalcaemia in 19.6%; allergic reactions (3%) occurred only with fresh frozen plasma [[Coirier2022]].',
  pt:'The cells go back into the body with a protein solution in place of the liquid that was taken. Blood pressure can drop during a session, and the team monitors this [[Coirier2022]].',
  hook:'Replacement fluid: albumin; fresh frozen plasma gave more complications without better results [[FrenchPE1987]].'},
 {from:.64,at:.75,k:'Step 5 · one session',sv:'Each volume removes a share',sub:'a general first-order model, not GBS data',
  t:'Diminishing returns within one session',
  txt:'Each exchange removes a fixed proportion of what is present. Processing one plasma volume removes 63% of a substance, a second removes 23% more and a third 9% more: 63%, 86% and 95% in all, in a first-order model that ignores redistribution and new synthesis [[Williams2014]]. No validated GBS-specific measure of antibody removal per session was found, so this is a general model [[Williams2014]].',
  pt:'Each round of cleaning takes out a smaller amount than the one before.',
  hook:'1, 2, 3 plasma volumes: about 63%, 86%, 95% removed (first-order model) [[Williams2014]].'},
 {from:.81,at:.9,k:'Step 6 · the course',sv:'Rebound, then the next session',sub:'IgG returns from the tissues between sessions',
  t:'Why it takes several sessions over days',
  txt:'IgG lies partly outside the bloodstream and returns between sessions, so several exchanges are needed; a general apheresis review expects six exchanges to bring circulating IgG down to about one-fifth or one-sixth of baseline [[Williams2014]]. The 2023 EAN/PNS guideline strongly recommends four to five exchanges over 1 to 2 weeks, 12 to 15 L in total, for people unable to walk unaided, within 4 weeks of onset [[vanDoorn2023]]; the ten-steps guideline quotes 200 to 250 mL plasma/kg over five sessions [[Leonhard2019]]. Quoted as published, not as instructions.',
  pt:'It is usually done four or five times over 1 to 2 weeks [[vanDoorn2023]].',
  hook:'Plasma exchange: 4 to 5 exchanges, 12 to 15 L over 1 to 2 weeks (or 200 to 250 mL/kg over five), within 4 weeks [[vanDoorn2023,Leonhard2019]].'}
];
const PX_L={
  cath:'central line',sep:'separator',waste:'plasma removed',alb:'albumin',cells:'cells returned',ret:'back to the body',
  blood:'blood out',plasmaW:'plasma',
  chY:'share left in plasma',chX:'plasma volumes processed in one session',chXN:'plasma volumes, one session',
  rem:['63% removed','86% removed','95% removed'],model:'General first-order model; ignores redistribution and synthesis',
  modelN:'General model, not GBS data',
  swY:'circulating IgG',swX:'days',sess:'exchange',band:'one-fifth to one-sixth',swNote:'Schematic: rebound size illustrative; end level after six exchanges from Williams 2014',
  swNoteN1:'Schematic: rebound size illustrative;',swNoteN2:'end level from Williams 2014',reb:'rebound from tissues'
};
/* French 1997: how many exchanges, by severity */
const PX_NUM={
  mild:{name:'Mild (91 people)',arms:[{n:0,lab:'No exchanges'},{n:2,lab:'Two exchanges'}],
    rows:[{m:'Median days to onset of motor recovery',v:[8,4],max:12,unit:' days',better:'lower'}],
    s:'In mildly affected people, two exchanges beat none: median time to onset of motor recovery 4 against 8 days [[FrenchCooperative1997]]. Cochrane reports the same comparison as 6 against 10 days in 91 people, and the reason for the difference could not be checked from the abstracts [[Chevret2017]].'},
  moderate:{name:'Moderate (304 people)',arms:[{n:2,lab:'Two exchanges'},{n:4,lab:'Four exchanges'}],
    rows:[{m:'Median days to walk with aid',v:[24,20],max:30,unit:' days',better:'lower'},{m:'Full strength at 1 year',v:[46,64],max:100,unit:'%',better:'higher'}],
    s:'In moderately affected people, four exchanges beat two: median time to walk with aid 20 against 24 days, and full strength at 1 year in 64% against 46% [[FrenchCooperative1997]].'},
  vent:{name:'Ventilated (161 people)',arms:[{n:4,lab:'Four exchanges'},{n:6,lab:'Six exchanges'}],rows:[],
    none:'Six were no better than four',
    s:'In people on a ventilator, six exchanges were no better than four [[FrenchCooperative1997]]. Group sizes from the 2023 EAN/PNS guideline [[vanDoorn2023]].'}
};
/* Cochrane 2017: plasma exchange against supportive care */
const PX_FOREST=[
  {k:'Improved 1+ grade at 4 weeks',kn:'Improved 1+ grade, 4 weeks',rr:1.64,lo:1.37,hi:1.96,s:'Improvement by one or more disability grades at 4 weeks: RR 1.64 (95% CI 1.37 to 1.96; 5 trials, 623 people) [[Chevret2017]].'},
  {k:'Walking with aid at 4 weeks',kn:'Walking with aid, 4 weeks',rr:1.60,lo:1.19,hi:2.15,s:'Recovered walking with aid at 4 weeks: RR 1.60 (95% CI 1.19 to 2.15; 3 trials, 349 people) [[Chevret2017]].'},
  {k:'Walking without aid',kn:'Walking without aid',rr:1.72,lo:1.06,hi:2.79,s:'Recovered walking without aid: RR 1.72 (95% CI 1.06 to 2.79; 3 trials, 349 people) [[Chevret2017]].'},
  {k:'Needing a ventilator',kn:'Needing a ventilator',rr:.53,lo:.39,hi:.74,s:'Need for ventilation: RR 0.53 (95% CI 0.39 to 0.74; 5 trials, 623 people). Fewer people needed a ventilator with plasma exchange [[Chevret2017]].'},
  {k:'Full strength at 1 year',kn:'Full strength, 1 year',rr:1.24,lo:1.07,hi:1.45,s:'Full muscle strength at 1 year: RR 1.24 (95% CI 1.07 to 1.45; 5 trials, 404 people) [[Chevret2017]].'},
  {k:'Severe motor sequelae',kn:'Severe motor sequelae',rr:.65,lo:.44,hi:.96,s:'Severe motor sequelae: RR 0.65 (95% CI 0.44 to 0.96; 6 trials, 649 people) [[Chevret2017]].'},
  {k:'Death',kn:'Death',rr:.86,lo:.45,hi:1.65,s:'Death: RR 0.86 (95% CI 0.45 to 1.65). The interval crosses 1, so this neither confirms nor refutes a lower risk of death [[Chevret2017]]. Neither IVIg nor plasma exchange has been shown to reduce mortality [[Hughes2007]].'},
  {k:'Relapse by end of follow-up',kn:'Relapse, end of follow-up',rr:2.89,lo:1.05,hi:7.93,s:'Relapse by the end of follow-up was more frequent with plasma exchange: RR 2.89 (95% CI 1.05 to 7.93). The interval is wide, and long-term outcomes still favoured plasma exchange [[Chevret2017]].'}
];
const PX_FT={less:'less likely with plasma exchange',more:'more likely with plasma exchange',lessN:'less likely',moreN:'more likely',rr:'risk ratio (log scale)'};
inits.plex=()=>{
  const tx=(x,y,s,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`;
  /* polyline helpers: length and the point at a fraction */
  const plen=P=>{let l=0;for(let i=1;i<P.length;i++)l+=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);return l};
  function pat(P,f){let L=plen(P)*clamp(f);for(let i=1;i<P.length;i++){const d=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);if(L<=d||i===P.length-1){const k=d?clamp(L/d):0;return [lerp(P[i-1][0],P[i][0],k),lerp(P[i-1][1],P[i][1],k)]}L-=d}return P[P.length-1]}
  function tube(P,col,on,t,dot,n){let s=`<path d="${ptsD(P)}" style="fill:none;stroke:var(--device);stroke-width:7;stroke-linejoin:round;stroke-linecap:round;opacity:.35"/><path d="${ptsD(P)}" style="fill:none;stroke:${on>0?col:'var(--line)'};stroke-width:3.4;stroke-linejoin:round;stroke-linecap:round;opacity:${f1(.3+.7*on)}"/>`;
    if(on>0){const k=n||Math.max(3,Math.round(plen(P)/34));for(let i=0;i<k;i++){const p=pat(P,((i/k)+t*6)%1);s+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="3.4" style="fill:${dot};stroke:var(--panel);stroke-width:1;opacity:${f1(on)}"/>`}}
    return s}
  function bag(x,y,w,h,lvl,fill,lab,abN,seed){const r=rng(seed||2),ly=y+16+(h-22)*(1-lvl);
    let s=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="12" style="fill:var(--panel);stroke:var(--device);stroke-width:2"/>`;
    if(lvl>0)s+=`<rect x="${f1(x+4)}" y="${f1(ly)}" width="${f1(w-8)}" height="${f1(y+h-4-ly)}" rx="9" style="fill:${fill};opacity:.55"/>`;
    for(let i=0;i<abN;i++){s+=antibody(x+12+r()*(w-24),ly+6+r()*Math.max(2,(y+h-ly-26)),11,{ang:(r()-.5)*120})}
    s+=kitLabel(x+w/2,y+h+15,lab,{a:'m'});return s}
  /* the removal model */
  const PX_G=Math.pow(.18,1/6)/Math.exp(-1);
  function swLevel(d){let pre=1;for(let i=0;i<6;i++){const s0=2*i;if(d<s0)return pre;const post=pre*Math.exp(-1),nxt=post*PX_G;
      if(d<s0+2){const k=1.6;return post+(nxt-post)*(1-Math.exp(-k*(d-s0)))/(1-Math.exp(-2*k))}pre=nxt}return pre}
  /* ---------- main player ---------- */
  const svg=$('#pxSvg'),rg=$('#pxT');let setSt=()=>{};
  function draw(t){
    const N=vb(svg,'720 440','400 720'),p=phaseOf(PX_STEPS,t),P=PX_STEPS[p];
    const sep=ramp(t,.16,.24),out=ramp(t,.32,.38),rep=ramp(t,.48,.54),flow=ramp(t,.02,.08);
    let s='';
    s+=tx(16,28,P.sv,'t-big','font-size:18px')+tx(16,46,P.sub,'t-sm');
    /* layout */
    const L=N?{bx:62,by:64,bs:150,dr:[220,150],r:40,wb:[292,200,84,96],ab:[30,276,76,80],J:[220,372],
               cx:44,cy:438,cw:330,ch:200}
             :{bx:76,by:62,bs:176,dr:[330,150],r:46,wb:[470,52,92,104],ab:[600,52,84,94],J:[560,214],
               cx:70,cy:290,cw:560,ch:110};
    const B=bodyFront(L.bx,L.by,L.bs,{});s+=B.svg;
    const nk=[B.at.mouth[0]+6,B.at.mouth[1]+(N?16:18)];
    const [dx,dy]=L.dr,r=L.r,[wx,wy,ww,wh]=L.wb,[ax,ay,aw,ah]=L.ab,[jx,jy]=L.J;
    const outP=N?[nk,[150,nk[1]],[150,dy],[dx-r,dy]]:[nk,[200,nk[1]],[200,dy],[dx-r,dy]];
    const plP=N?[[dx+r,dy],[wx+ww/2,dy],[wx+ww/2,wy]]:[[dx,dy-r],[dx,wy+wh/2],[wx,wy+wh/2]];
    const ceP=N?[[dx,dy+r],[dx,jy]]:[[dx+r,dy],[jx,dy],[jx,jy]];
    const alP=N?[[ax+aw,ay+ah/2],[jx-34,ay+ah/2],[jx-34,jy],[jx,jy]]:[[ax+aw/2,ay+ah],[ax+aw/2,jy],[jx,jy]];
    const reP=N?[[jx,jy],[jx,jy+20],[14,jy+20],[14,nk[1]+8],[nk[0]-4,nk[1]+8]]:[[jx,jy],[jx,252],[150,252],[150,nk[1]+10],[nk[0]+4,nk[1]+10]];
    s+=tube(outP,'var(--blood)',flow,t,'var(--blood)');
    s+=tube(plP,'var(--plasma)',out,t,'var(--plasma)');
    s+=tube(ceP,'var(--blood)',sep,t,'var(--blood)');
    s+=tube(alP,'var(--care)',rep,t,'var(--care)');
    s+=tube(reP,'var(--blood)',Math.max(sep*.6,rep),t,'var(--blood)');
    /* the separator drum */
    const rot=(t*2600)%360;
    s+=`<circle cx="${f1(dx)}" cy="${f1(dy)}" r="${f1(r+6)}" style="fill:var(--panel);stroke:var(--device);stroke-width:2"/>`;
    s+=`<circle cx="${f1(dx)}" cy="${f1(dy)}" r="${f1(r)}" style="fill:var(--blood);opacity:${f1(.25+.25*flow)}"/>`;
    if(sep>0)s+=`<circle cx="${f1(dx)}" cy="${f1(dy)}" r="${f1(r*.62*sep)}" style="fill:var(--plasma);opacity:.85"/>`;
    s+=`<g transform="rotate(${f1(rot*Math.min(1,flow*2))} ${f1(dx)} ${f1(dy)})">`;for(let i=0;i<3;i++){const a=i*2*Math.PI/3;s+=`<line x1="${f1(dx)}" y1="${f1(dy)}" x2="${f1(dx+Math.cos(a)*r*.92)}" y2="${f1(dy+Math.sin(a)*r*.92)}" style="stroke:var(--device);stroke-width:2.4;stroke-linecap:round"/>`}s+='</g>';
    s+=`<circle cx="${f1(dx)}" cy="${f1(dy)}" r="5" style="fill:var(--device)"/>`;
    /* bags */
    const abN=Math.round(8*out*(p>=4?1:ramp(t,.32,.5)));
    s+=bag(wx,wy,ww,wh,.08+.8*out*ramp(t,.32,.6),'var(--plasma)',PX_L.waste,abN,4);
    s+=`<g style="opacity:${f1(.35+.65*rep)}">`+bag(ax,ay,aw,ah,.85-.4*rep*ramp(t,.48,.8),'var(--care)',PX_L.alb,0,6)+'</g>';
    /* labels */
    s+=kitLabel(nk[0]+10,nk[1]-10,PX_L.cath,{});
    s+=kitLabel(dx,dy+r+(N?-r*2-14:22),PX_L.sep,{a:'m'});
    if(!N){s+=kitLabel(dx+r+48,dy+20,PX_L.cells,{a:'m'});s+=kitLabel(240,nk[1]-8,PX_L.blood,{a:'m'});s+=kitLabel(360,248,PX_L.ret,{a:'m'})}
    else{s+=kitLabel(dx+8,wy+wh+40,PX_L.cells,{});s+=kitLabel(150,jy+36,PX_L.ret,{a:'m'})}
    /* chart */
    const cx=L.cx,cy=L.cy,cw=L.cw,ch=L.ch;
    if(p<5){/* within one session */
      const v=p<2?0:p===2?lerp(0,.5,ramp(t,.34,.46)):p===3?lerp(.5,1,ramp(t,.5,.62)):lerp(1,3,ramp(t,.65,.78));
      const C=curve(cx,cy,cw,ch,x=>Math.exp(-x),{x0:0,x1:3,y0:0,y1:1,upto:Math.max(.001,v),col:'var(--plasma)',fill:true,dot:true});
      s+=`<path d="${(()=>{let d='';for(let i=0;i<=60;i++){const x=3*i/60;d+=(i?'L':'M')+f1(C.X(x))+' '+f1(C.Y(Math.exp(-x)))}return d})()}" style="fill:none;stroke:var(--muted);stroke-width:1.2;stroke-dasharray:3 4"/>`+C.svg;
      [1,2,3].forEach((x,i)=>{s+=`<line x1="${f1(C.X(x))}" x2="${f1(C.X(x))}" y1="${f1(cy+ch)}" y2="${f1(cy+ch+5)}" class="axis"/>`+tx(C.X(x),cy+ch+16,x,'t-xs t-mid');
        if(v>=x-.001){const yy=C.Y(Math.exp(-x));s+=`<circle cx="${f1(C.X(x))}" cy="${f1(yy)}" r="4" style="fill:var(--plasma);stroke:var(--ink)"/>`+kitLabel(C.X(x)+(i===2?-6:6),yy-(N?10+ (2-i)*0:8),PX_L.rem[i],{a:i===2?'e':''})}});
      s+=tx(cx-6,cy+5,'100%','t-xs t-end')+tx(cx-6,cy+ch,'0','t-xs t-end');
      s+=tx(cx,cy-8,PX_L.chY,'t-xs')+tx(cx+cw,cy+ch+30,N?PX_L.chXN:PX_L.chX,'t-xs t-end');
      s+=tx(cx,cy+ch+(N?46:44),N?PX_L.modelN:PX_L.model,'t-xs','font-style:italic');
    }else{/* sawtooth over the course */
      const u=ramp(t,.82,.97),upto=-1+13*u;
      const C=curve(cx,cy,cw,ch,swLevel,{x0:-1,x1:12,y0:0,y1:1.25,upto:Math.max(-.99,upto),col:'var(--antibody)',lw:2.4,dot:true});
      s+=`<rect x="${f1(cx)}" y="${f1(C.Y(.2))}" width="${f1(cw)}" height="${f1(C.Y(1/6)-C.Y(.2))}" style="fill:var(--good);opacity:.25"/>`;
      s+=C.svg;
      s+=tx(C.X(-.8),C.Y(1/6)+11,PX_L.band,'t-xs','fill:var(--ink)');
      for(let i=0;i<6;i++){const d=2*i;s+=`<line x1="${f1(C.X(d))}" x2="${f1(C.X(d))}" y1="${f1(cy+ch)}" y2="${f1(cy+ch+5)}" class="axis"/>`+tx(C.X(d),cy+ch+16,d,'t-xs t-mid');
        if(upto>=d)s+=`<path d="M${f1(C.X(d))} ${f1(cy+12)}l-5 -8h10z" style="fill:var(--plasma);stroke:var(--device)"/>`}
      s+=tx(C.X(12),cy+ch+16,12,'t-xs t-mid');
      if(upto>3)s+=kitLabel(C.X(3),C.Y(swLevel(3))-12,PX_L.reb,{a:'m'});
      s+=tx(cx-6,C.Y(1)+3,'100%','t-xs t-end')+tx(cx-6,cy+ch,'0','t-xs t-end');
      s+=tx(cx,cy-8,PX_L.swY,'t-xs')+tx(cx+cw,cy+ch+30,PX_L.swX,'t-xs t-end');
      if(N){s+=tx(cx,cy+ch+46,PX_L.swNoteN1,'t-xs','font-style:italic')+tx(cx,cy+ch+60,PX_L.swNoteN2,'t-xs','font-style:italic')}
      else s+=tx(cx,cy+ch+44,PX_L.swNote,'t-xs','font-style:italic');
    }
    svg.innerHTML=s;
    setSt(p);$('#pxNote').innerHTML=noteHTML(P);
  }
  const stop=playWire(rg,$('#pxPlay'),draw,22000,'%t:player.replay%','plex');
  setSt=stepWire($('#pxSteps'),PX_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- how many exchanges ---------- */
  const nsvg=$('#pxNumSvg');let grp='moderate';
  function drawNum(){
    const N=vb(nsvg,'720 200','400 400'),G=PX_NUM[grp];
    let s=tx(16,24,G.name,'t-lbl');
    const armY=N?[56,120]:[60,110];
    G.arms.forEach((A,i)=>{const y=armY[i];s+=tx(16,y,A.lab,'t-sm','fill:var(--ink);font-weight:700');
      for(let k=0;k<6;k++){const x=(N?20:20)+k*24,on=k<A.n;s+=`<path d="M${f1(x+8)} ${f1(y+10)}c-6 8 -7 12 -7 15a7 7 0 0 0 14 0c0 -3 -1 -7 -7 -15z" style="fill:${on?'var(--plasma)':'none'};stroke:${on?'var(--device)':'var(--line)'};stroke-width:1.4"/>`}
      if(A.n===0)s+=tx(20,y+30,'0','t-sm','fill:var(--ink)')});
    if(G.rows.length){G.rows.forEach((R,ri)=>{
      const x0=N?20:220+ri*250,y0=N?190+ri*110:44,w=N?330:220;
      s+=tx(x0,y0,R.m,'t-xs','fill:var(--ink);font-weight:700');
      G.arms.forEach((A,i)=>{const v=R.v[i],y=y0+14+i*42,bw=w*v/R.max,best=(R.better==='lower')===(v===Math.min(...R.v));
        s+=`<rect x="${f1(x0)}" y="${f1(y)}" width="${f1(w)}" height="18" rx="4" style="fill:var(--panel-2)"/><rect x="${f1(x0)}" y="${f1(y)}" width="${f1(bw)}" height="18" rx="4" style="fill:${best?'var(--good)':'var(--muted)'};opacity:.8"/>`;
        s+=tx(x0+bw+6,y+13,v+R.unit,'t-sm','fill:var(--ink);font-weight:700');
        s+=tx(x0,y+31,A.lab,'t-xs')});
    })}else{s+=tx(N?20:220,N?200:96,G.none,'t-lbl','fill:var(--ink)')}
    nsvg.innerHTML=s;
    $('#pxNumNote').innerHTML=G.s;
    $$('[data-pxn]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.pxn===grp));
  }
  $$('[data-pxn]').forEach(b=>b.addEventListener('click',()=>{grp=b.dataset.pxn;drawNum()}));
  drawNum();

  /* ---------- forest plot ---------- */
  const fsvg=$('#pxForestSvg');let fsel=0;
  function drawForest(){
    const N=vb(fsvg,'720 380','400 560');
    const L=N?{x:24,w:300,y0:40,rh:58,lab:-14,vx:390}:{x:290,w:340,y0:40,rh:36,lab:0,vx:704};
    const lg=v=>Math.log2(v),X=v=>L.x+L.w*(lg(v)+2)/5;
    let s='';
    const yEnd=L.y0+PX_FOREST.length*L.rh;
    PX_FOREST.forEach((F,i)=>{const y=L.y0+i*L.rh+(N?14:0),on=i===fsel;
      s+=`<g data-pxf="${i}" style="cursor:pointer">`;
      s+=`<rect x="4" y="${f1(y-(N?30:16))}" width="${N?392:712}" height="${f1(N?L.rh-4:L.rh-4)}" rx="8" style="fill:${on?'var(--rx-soft)':'transparent'}"/>`;
      if(N)s+=tx(L.x,y-14,F.kn,'t-sm','fill:var(--ink);font-weight:'+(on?700:500));
      else s+=tx(16,y+4,F.k,'t-sm','fill:var(--ink);font-weight:'+(on?700:500));
      s+=`<line x1="${f1(X(1))}" x2="${f1(X(1))}" y1="${f1(y-(N?9:L.rh/2))}" y2="${f1(y+(N?14:L.rh/2))}" style="stroke:var(--muted);stroke-width:1.4"/>`;
      s+=`<line x1="${f1(X(F.lo))}" x2="${f1(X(F.hi))}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:var(--ink);stroke-width:2.2"/>`;
      s+=`<rect x="${f1(X(F.rr)-6)}" y="${f1(y-6)}" width="12" height="12" style="fill:${F.rr<1?'var(--care)':'var(--rx)'};stroke:var(--ink)"/>`;
      s+=tx(L.vx,y+4,F.rr.toFixed(2),'t-sm t-end','fill:var(--ink);font-weight:700');
      s+='</g>'});
    [.25,.5,1,2,4,8].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${f1(yEnd)}" y2="${f1(yEnd+5)}" class="axis"/>`+tx(X(v),yEnd+17,v,'t-xs t-mid')});
    s+=`<line x1="${f1(L.x)}" x2="${f1(L.x+L.w)}" y1="${f1(yEnd)}" y2="${f1(yEnd)}" class="axis"/>`;
    s+=tx(X(1)-8,yEnd+34,N?PX_FT.lessN:PX_FT.less,'t-xs t-end')+tx(X(1)+8,yEnd+34,N?PX_FT.moreN:PX_FT.more,'t-xs');
    s+=tx(L.x+L.w/2,yEnd+50,PX_FT.rr,'t-xs t-mid');
    fsvg.innerHTML=s;
    $('#pxForestNote').innerHTML=`<h4>${PX_FOREST[fsel].k}</h4><p>${PX_FOREST[fsel].s}</p>`;
    $$('[data-pxfb]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.pxfb===fsel));
  }
  fsvg.addEventListener('click',e=>{const g=e.target.closest('[data-pxf]');if(!g)return;fsel=+g.dataset.pxf;drawForest()});
  $$('[data-pxfb]').forEach(b=>b.addEventListener('click',()=>{fsel=+b.dataset.pxfb;drawForest()}));
  drawForest();
  const prev=redraws.plex;redraws.plex=()=>{prev&&prev();drawNum();drawForest()};
};
