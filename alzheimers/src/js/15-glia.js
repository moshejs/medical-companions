
/* =============== 1.5 glia: microglia and the lost synapse =============== */
const GL_STEPS=[
 {from:0,at:.04,k:'Step 1 · Healthy tissue',t:'Synapses and resting microglia',
  txt:'Each contact here is a synapse: a swelling on an axon (the bouton) facing a small spine on a dendrite. Microglia, the brain\'s resident immune cells, sit among them with long branching processes. During development, complement proteins tag extra synapses and microglia prune them; in mouse models of Alzheimer\'s that pruning appears to be switched back on. [[Hong2016]]',
  pt:'Nerve cells pass messages at tiny contact points called synapses. Small immune cells called microglia keep watch between them.'},
 {from:.12,at:.18,k:'Step 2 · Oligomers',t:'Soluble amyloid gathers',
  txt:'Small soluble clumps of amyloid beta, called oligomers, collect near synapses. In mouse models, the complement protein C1q was needed for these oligomers to harm synapses. [[Hong2016]] How oligomers form is shown in <a href="#amyloid" data-go="amyloid">Amyloid, animated</a>.',
  pt:'Small sticky clumps of amyloid start to collect at the contact points.'},
 {from:.26,at:.34,k:'Step 3 · Complement tags',t:'C1q, then C3, mark synapses',
  txt:'In Alzheimer\'s mouse models, C1q rises at synapses before plaques appear. C3 is then deposited, and the microglial receptor CR3 recognises it. Blocking C1q, C3 or CR3 reduced early synapse loss. [[Hong2016]] <span class="ev early">Mouse evidence</span>',
  pt:'Proteins called complement stick "remove me" labels on some contact points.',
  hook:'Complement in synapse loss: C1q tags the synapse, C3 is deposited, microglial CR3 recognises it, the synapse is engulfed. Developmental pruning, wrongly reactivated (mouse models).'},
 {from:.42,at:.48,k:'Step 4 · Microglia switch on',t:'From surveying to activated',
  txt:'Microglia pull in their branches and round up. Single-cell mapping in mice found "disease-associated microglia" that contain amyloid beta. They switch on in two steps: the first does not need TREM2, the second does. [[KerenShaul2017]]',
  pt:'The immune cells change shape. They stop patrolling and get ready to clear things away.'},
 {from:.54,at:.64,k:'Step 5 · Engulfment',t:'Tagged synapses are swallowed',
  txt:'Microglia engulf tagged synapses and the count falls. In human hippocampus (area CA1), people with MCI had 18% fewer synapses and people with mild Alzheimer\'s 55% fewer than cognitively normal people. Synapse number tracked how well people recalled words, not their Braak tangle stage. [[Scheff2007]]',
  pt:'The immune cells swallow the labelled contact points. With fewer contacts, messages get through less well.',
  hook:'CA1 synapse loss: about 18% in MCI, about 55% in mild Alzheimer\'s. It correlates with recall, not with Braak stage. [[Scheff2007]]'},
 {from:.74,at:.8,k:'Step 6 · The plaque barrier',t:'TREM2 and the microglial wall',
  txt:'A plaque forms. Microglia need the receptor TREM2 to wrap around plaques. In mice without TREM2, plaques were more diffuse and surrounded by more damaged neurites, which suggests the wrap is a protective barrier. [[Wang2016]] A rare TREM2 variant, R47H, raised Alzheimer\'s risk about 2.9-fold in Iceland (odds ratio 2.92), and the finding replicated in other groups. [[Jonsson2013,Guerreiro2013]]',
  pt:'Immune cells normally build a wall around each plaque. A rare change in TREM2, a gene these cells need to build that wall, nearly triples the risk of Alzheimer\'s.',
  hook:'TREM2 is a microglial receptor. R47H: odds ratio about 2.9; it was carried by 0.46% of Icelandic controls aged 85 and over. [[Jonsson2013]]'},
 {from:.88,at:.95,k:'Step 7 · Astrocytes',t:'Astrocytes react, synapses keep falling',
  txt:'Activated microglia release IL-1α, TNF and C1q, which push astrocytes into a reactive state that supports neurons less well. [[Liddelow2017]] Synapse density, falling here, is the strongest structural correlate of cognitive decline, as the next chart shows. [[Terry1991]]',
  pt:'Support cells called astrocytes are pulled in too. The more contact points are lost, the more memory and thinking suffer.',
  hook:'Strongest structural correlate of cognition in Alzheimer\'s: synapse loss (Terry 1991); plaques and tangles correlated only weakly. [[Terry1991]]'}
];
inits.glia=()=>{
  const svg=$('#glSvg'),rg=$('#glT');let r47=false,block=false,lastNote='';
  /* order in which tagged synapses are lost: 0..11 on the top dendrite, 12..23 on the bottom one */
  const LOSS=[1,13,3,15,8,19,4,21,10,22,6,17,18];
  const LT=LOSS.map((_,k)=>k<10?.54+k*.02:.8+(k-10)*.04);
  const BLOCK_LOSS=new Set([4,18,21]);
  const OR=rng(15),OLI=LOSS.map(()=>({dx:(OR()-.5)*1.6,dy:OR(),j:OR()}));
  function draw(t){
    const N=vb(svg,'720 400','400 590');
    const L=N?{x0:28,dx:31,yA:56,yB:300,sp:24,bo:39,rh:5,rb:6,mg:[[95,178],[300,178]],pl:[200,178],as:[362,178],mr:11,fw:400,fh:330,lab:16}
             :{x0:50,dx:40,yA:70,yB:330,sp:26,bo:42,rh:6,rb:7,mg:[[140,200],[400,200]],pl:[270,200],as:[482,200],mr:13,fw:530,fh:400,lab:20};
    const syn=i=>{const top=i<12,k=i%12,x=L.x0+k*L.dx,y=top?L.yA:L.yB,s=top?1:-1;return{x,y,s,head:y+s*L.sp,bout:y+s*L.bo,cl:y+s*(L.sp+L.bo)/2}};
    const act=ramp(t,.42,.5);
    let s=`<defs>${marker('glA','var(--muted)')}</defs><rect width="${L.fw}" height="${L.fh}" rx="12" style="fill:var(--field)"/>`;
    // dendrites and axons
    [[L.yA,1],[L.yB,-1]].forEach(([y,sg])=>{const xa=L.x0-18,xb=L.x0+11*L.dx+18;
      s+=`<path d="M${xa} ${y} H${xb}" style="stroke:var(--cell-line);stroke-width:8;stroke-linecap:round"/>`;
      s+=`<path d="M${xa} ${y+sg*L.bo} H${xb}" style="stroke:var(--axon);stroke-width:2.4;stroke-linecap:round;opacity:.8"/>`});
    s+=`<text x="${L.x0-18}" y="${L.yA-12}" class="t-xs">dendrite</text><text x="${L.x0-18}" y="${L.yB+22}" class="t-xs">dendrite</text>`;
    // which synapses are lost, and how far along
    const lossP=i=>{const k=LOSS.indexOf(i);if(k<0)return 0;if(block&&!BLOCK_LOSS.has(i))return 0;return ease(ramp(t,LT[k],LT[k]+.06))};
    const nearM=x=>Math.abs(x-L.mg[0][0])<Math.abs(x-L.mg[1][0])?0:1;
    const eaten=[0,0];let lost=0;
    for(let i=0;i<24;i++){const S=syn(i),p=lossP(i),k=LOSS.indexOf(i);
      if(p>=.5)lost++;
      if(p>0)s+=`<circle cx="${S.x}" cy="${f1(S.cl)}" r="${L.rb+4}" style="fill:none;stroke:var(--muted);stroke-width:1;stroke-dasharray:2 3;opacity:${f1(.6*p)}"/>`;
      let gx=S.x,gy=S.cl,sc=1,o=1;
      if(p>0){if(block){o=1-p}else{const m=nearM(S.x),M=L.mg[m];gx=lerp(S.x,M[0],p);gy=lerp(S.cl,M[1],p);sc=1-.75*p;o=1-ramp(p,.6,1);if(p>=1)eaten[m]++}}
      if(o<=0.01)continue;
      // stalk only while attached
      if(p===0)s+=`<path d="M${S.x} ${S.y} V${f1(S.head)}" style="stroke:var(--sage);stroke-width:${N?2.6:3}"/>`;
      const hy=(S.head-S.cl),by=(S.bout-S.cl);
      s+=`<g transform="translate(${f1(gx)} ${f1(gy)}) scale(${f1(sc)})" style="opacity:${f1(o)}"><circle cy="${f1(hy)}" r="${L.rh}" style="fill:var(--sage-soft);stroke:var(--sage);stroke-width:2"/><circle cy="${f1(by)}" r="${L.rb}" style="fill:var(--panel);stroke:var(--axon);stroke-width:2"/><circle cx="-2" cy="${f1(by)}" r="1.4" style="fill:var(--axon)"/><circle cx="2" cy="${f1(by+S.s*-1.5)}" r="1.4" style="fill:var(--axon)"/></g>`;
      // complement tags (none when blocked)
      if(k>=0&&!block){const c1=ramp(t,.27+k*.006,.3+k*.006)*(1-ramp(p,.2,.6)),c3=ramp(t,.35+k*.005,.38+k*.005)*(1-ramp(p,.2,.6));
        if(c1>0)s+=`<circle cx="${S.x}" cy="${f1(S.cl)}" r="${L.rb+5}" style="fill:none;stroke:var(--rose);stroke-width:1.8;opacity:${f1(c1)}"/>`;
        if(c3>0){const dx=S.x+L.rb+6,dy=S.cl;s+=`<path d="M${dx} ${f1(dy-4)} l4 4 l-4 4 l-4 -4z" style="fill:var(--rose);opacity:${f1(c3)}"/>`}}
      // oligomers drifting to tagged synapses
      if(k>=0){const O=OLI[k],a=ramp(t,.12+k*.008,.2+k*.008)*(1-ramp(p,.1,.5));
        if(a>0){const mv=ease(ramp(t,.12,.3)),tx=S.x+(N?-8:-10),ty=S.bout+S.s*(N?14:15),sx=S.x+O.dx*L.dx,sy=(L.yA+L.yB)/2+(O.dy-.5)*40;
          const ox=lerp(sx,tx,mv),oy=lerp(sy,ty,mv);
          for(let j=0;j<3;j++)s+=`<circle cx="${f1(ox+(j-1)*4.2)}" cy="${f1(oy+(j%2)*3.5)}" r="2.3" style="fill:var(--amber);opacity:${f1(a)}"/>`}}
    }
    // exemplar labels for the tags
    if(!block){const S=syn(1),o=ramp(t,.3,.36)*(1-ramp(t,.52,.56));
      if(o>0)s+=`<g style="opacity:${f1(o)}"><text x="${S.x+16}" y="${f1(S.cl+(N?30:34))}" class="t-xs" style="fill:var(--rose)">ring = C1q tag</text><text x="${S.x+16}" y="${f1(S.cl+(N?42:47))}" class="t-xs" style="fill:var(--rose)">◆ = C3</text></g>`}
    // plaque (from step 6)
    const po=ramp(t,.74,.8),wrap=ramp(t,.8,.87);
    if(po>0){const [px,py]=L.pl;s+=plaque(px,py,r47?(N?24:28):(N?18:21),7,po*(r47?.7:1));
      if(r47){for(let i=0;i<6;i++){const a=i/6*Math.PI*2+.5,R=N?32:36;s+=`<ellipse cx="${f1(px+Math.cos(a)*R)}" cy="${f1(py+Math.sin(a)*R*.8)}" rx="5" ry="3.6" style="fill:var(--rose);opacity:${f1(.85*wrap)}"/>`}
        s+=microglia(px+(N?52:62),py+(N?34:40),L.mr*.8,po,1)}
      else{const R=N?22:26,C=2*Math.PI*R;s+=`<circle cx="${px}" cy="${py}" r="${R}" transform="rotate(150 ${px} ${py})" style="fill:none;stroke:var(--glia);stroke-width:6;stroke-linecap:round;stroke-dasharray:${f1(C*.72*wrap)} ${f1(C)};opacity:.9"/>`;
        s+=microglia(lerp(px+(N?52:62),px+R*.75,wrap),lerp(py+(N?34:40),py-R*.75,wrap),L.mr*.8,po,1)}
      s+=`<text x="${px}" y="${py-(N?36:40)}" class="t-xs t-mid" style="opacity:${f1(po)}">${r47?(N?'plaque, no wrap (R47H)':'plaque, no microglial wrap (R47H)'):(N?'plaque, wrapped':'plaque wrapped by microglia')}</text>`}
    // microglia, with engulfed debris
    L.mg.forEach(([x,y],m)=>{s+=microglia(x,y,L.mr,1,act>0?act:0);
      for(let d=0;d<Math.min(4,eaten[m]);d++)s+=`<circle cx="${f1(x-4+(d%2)*8)}" cy="${f1(y-3+Math.floor(d/2)*6)}" r="2.2" style="fill:var(--sage-soft);stroke:var(--sage);stroke-width:1"/>`});
    s+=`<text x="${L.mg[0][0]}" y="${L.mg[0][1]+(N?34:38)}" class="t-xs t-mid">microglia</text>`;
    // astrocyte
    const re=ramp(t,.88,.95),[ax,ay]=L.as;
    for(let i=0;i<8;i++){const a=i/8*Math.PI*2+.2,len=(N?18:20)+7*re;s+=`<path d="M${ax} ${ay} l${f1(Math.cos(a)*len)} ${f1(Math.sin(a)*len)}" style="stroke:var(--cell-line);stroke-width:${f1(2.4+2.2*re)};stroke-linecap:round"/>`}
    s+=`<circle cx="${ax}" cy="${ay}" r="7" style="fill:var(--panel-2);stroke:var(--cell-line);stroke-width:2"/>`;
    s+=`<text x="${ax}" y="${ay+(N?40:42)}" class="t-xs t-mid">${re>.5?'reactive':'astrocyte'}</text>`;
    if(re>0){const x1=L.mg[1][0]+(N?14:16),x2=ax-(N?24:26);s+=`<g style="opacity:${f1(re)}"><path d="M${x1} ${ay} H${x2}" class="arrow" marker-end="url(#glA)"/><text x="${f1((x1+x2)/2)}" y="${ay-(N?38:34)}" class="t-xs t-mid">IL-1α, TNF, C1q</text></g>`}
    // ---- panel: synapses remaining ----
    const n=24-lost,frac=n/24;
    const state=t<.42?'resting, surveying':t<.54?'activated':t<.8?(block?'activated, few tags':'engulfing synapses'):(r47?'not wrapping plaque':'wrapping the plaque');
    const P=N?{x:16,tY:356,cY:392,bx:160,bY:376,bw:220,l1:402,l2:416,cap:432,mY:460,sY:478,lg:[[16,506],[210,506],[16,528],[210,528],[16,550],[210,550],[16,572]]}
             :{x:548,tY:40,cY:80,bx:548,bY:92,bw:150,l1:122,l2:136,cap:152,mY:188,sY:206,lg:[[548,240],[548,260],[548,280],[548,300],[548,320],[548,340],[548,360]]};
    s+=`<text x="${P.x}" y="${P.tY}" class="t-sm">SYNAPSES REMAINING</text>`;
    s+=`<text x="${P.x}" y="${P.cY}" class="t-big" style="font-size:30px">${n}<tspan class="t-sm" dx="6">of 24</tspan></text>`;
    s+=`<rect x="${P.bx}" y="${P.bY}" width="${P.bw}" height="12" rx="6" style="fill:var(--panel-2)"/><rect x="${P.bx}" y="${P.bY}" width="${f1(P.bw*frac)}" height="12" rx="6" style="fill:var(--sage)"/>`;
    [[.82,'MCI −18%',P.l1],[.45,'mild AD −55%',P.l2]].forEach(([f,l,y])=>{const x=P.bx+P.bw*f;s+=`<path d="M${f1(x)} ${P.bY-4} V${P.bY+16}" style="stroke:var(--ink);stroke-width:1.5"/><text x="${f1(x)}" y="${y}" class="t-xs t-mid" style="fill:var(--ink)">${l}</text>`});
    s+=`<text x="${P.bx}" y="${P.cap}" class="t-xs">ticks: human CA1 counts</text>`;
    s+=`<text x="${P.x}" y="${P.mY}" class="t-sm">MICROGLIA</text><text x="${P.x}" y="${P.sY}" class="t-lbl">${state}</text>`;
    // legend: shape and word, never colour alone
    const LG=[
      [(x,y)=>`<circle cx="${x+2}" cy="${y}" r="4" style="fill:var(--sage-soft);stroke:var(--sage);stroke-width:1.6"/><circle cx="${x+12}" cy="${y}" r="4.5" style="fill:var(--panel);stroke:var(--axon);stroke-width:1.6"/>`,'synapse'],
      [(x,y)=>[0,1,2].map(j=>`<circle cx="${x+2+j*4.5}" cy="${y+(j%2)*3-1}" r="2.3" style="fill:var(--amber)"/>`).join(''),'Aβ oligomers'],
      [(x,y)=>`<circle cx="${x+7}" cy="${y}" r="6" style="fill:none;stroke:var(--rose);stroke-width:1.8"/>`,'C1q tag (ring)'],
      [(x,y)=>`<path d="M${x+7} ${y-4} l4 4 l-4 4 l-4 -4z" style="fill:var(--rose)"/>`,'C3 tag (diamond)'],
      [(x,y)=>plaque(x+7,y,7,7,1),'amyloid plaque'],
      [(x,y)=>[0,1,2,3,4,5].map(j=>{const a=j/6*Math.PI*2;return `<path d="M${x+7} ${y} l${f1(Math.cos(a)*7)} ${f1(Math.sin(a)*7)}" style="stroke:var(--cell-line);stroke-width:2"/>`}).join(''),'astrocyte'],
      [(x,y)=>`<ellipse cx="${x+7}" cy="${y}" rx="5" ry="3.6" style="fill:var(--rose)"/>`,'damaged neurite']];
    LG.forEach(([ic,l],i)=>{const [x,y]=P.lg[i];s+=ic(x,y)+`<text x="${x+22}" y="${y+3.5}" class="t-xs">${l}</text>`});
    svg.innerHTML=s;
    const p=phaseOf(GL_STEPS,t);setSt(p);
    let S={...GL_STEPS[p]};
    if(block&&(p===2||p===4))S={...S,t:p===2?'Complement blocked':'Far fewer synapses lost',txt:'In the mouse experiments, blocking C1q, C3 or the microglial receptor CR3 reduced early synapse loss. Here the tags never form and only a few synapses are lost; the size of the effect drawn is illustrative. [[Hong2016]] <span class="ev early">Mouse evidence</span>'};
    if(r47&&p>=5&&p<6)S={...S,t:'R47H: the wall does not form',txt:'With this switch on, the drawing shows microglia that fail to wrap the plaque, which stays diffuse with damaged neurites around it, as in mice lacking TREM2. [[Wang2016]] R47H itself raised Alzheimer\'s risk about 2.9-fold, odds ratio 2.92 (95% CI 2.09–4.09) in Iceland and 2.90 in combined samples. [[Jonsson2013,Guerreiro2013]]'};
    const html=noteHTML(S)+`<p class="readout">Synapses remaining <b>${n} of 24</b> · Microglia <b>${state}</b></p>`;
    if(html!==lastNote){$('#glNote').innerHTML=html;lastNote=html}
    $('#glRead').innerHTML=`Synapses remaining <b>${n} of 24</b> · Microglia <b>${state}</b>${block?' · <b>complement blocked</b>':''}${r47?' · <b>TREM2 R47H</b>':''}`;
  }
  const stop=playWire(rg,$('#glPlay'),draw,18000,'Replay','glia');
  const setSt=stepWire($('#glSteps'),GL_STEPS,rg,draw,stop);
  $('#glTrem').onclick=()=>{r47=!r47;$('#glTrem').setAttribute('aria-pressed',r47);draw(+rg.value)};
  $('#glBlock').onclick=()=>{block=!block;$('#glBlock').setAttribute('aria-pressed',block);draw(+rg.value)};

  /* ---- Terry 1991: synapses vs cognition (schematic points, published r) ---- */
  const tsv=$('#glTerry'),trg=$('#glTT');let mode='syn';
  const PTS=(()=>{const r=rng(1991),P=[];for(let i=0;i<24;i++){const ctl=i<9,syn=ctl?.72+r()*.22:.1+r()*.6,cog=clamp(.05+.92*syn+(r()-.5)*.07,.03,.97);
    const pla=ctl?.03+r()*.35:.2+r()*.75,tan=ctl?.02+r()*.25:clamp(.35*(1-cog)+.6*r(),.05,.97);P.push({ctl,syn,cog,pla,tan})}return P})();
  let X=PTS.map(q=>q.syn),stopM=null;
  const TX={syn:['Synapse density, midfrontal (schematic units)','Synapse density (schematic)'],pla:['Plaque count (schematic units)','Plaque count (schematic)'],tan:['Tangle count (schematic units)','Tangle count (schematic)']};
  function drawT(t){
    const N=vb(tsv,'720 340','400 540');
    const L=N?{x0:52,x1:384,y0:24,y1:290,xl:322}:{x0:80,x1:470,y0:30,y1:280,xl:312};
    const px=v=>lerp(L.x0,L.x1,v),py=v=>lerp(L.y1,L.y0,v);
    let s=`<rect x="${L.x0}" y="${L.y0}" width="${L.x1-L.x0}" height="${L.y1-L.y0}" style="fill:var(--field)"/>`;
    for(let g=0;g<=4;g++){s+=`<path d="M${L.x0} ${f1(py(g/4))} H${L.x1}" class="grid"/>`}
    s+=`<path d="M${L.x0} ${L.y0} V${L.y1} H${L.x1}" class="axis" style="stroke:var(--muted);fill:none"/>`;
    s+=`<text x="${(L.x0+L.x1)/2}" y="${L.xl}" class="t-sm t-mid">${TX[mode][N?1:0]} →</text>`;
    s+=`<text transform="translate(${L.x0-(N?30:40)} ${(L.y0+L.y1)/2}) rotate(-90)" class="t-sm t-mid">${N?'Cognition (Mattis DRS) →':'Cognition, Mattis DRS (higher = better) →'}</text>`;
    s+=`<text x="${L.x0}" y="${L.y1+14}" class="t-xs">low</text><text x="${L.x1}" y="${L.y1+14}" class="t-xs t-end">high</text>`;
    let shown=[];
    PTS.forEach((q,i)=>{const a=ramp(t,i/24*.6,i/24*.6+.05);if(a<=0)return;shown.push(i);const x=px(X[i]),y=py(q.cog),r=lerp(9,5,a);
      s+=q.ctl?`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="fill:var(--panel);stroke:var(--sage);stroke-width:2;opacity:${f1(a)}"/>`
              :`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="fill:var(--rose);opacity:${f1(a*.9)}"/>`});
    const ln=ramp(t,.62,.8);
    if(ln>0&&shown.length>2){const xs=shown.map(i=>X[i]),ys=shown.map(i=>PTS[i].cog),mx=xs.reduce((a,b)=>a+b)/xs.length,my=ys.reduce((a,b)=>a+b)/ys.length;
      let sxy=0,sxx=0;xs.forEach((x,i)=>{sxy+=(x-mx)*(ys[i]-my);sxx+=(x-mx)*(x-mx)});const b=sxy/sxx,a0=my-b*mx;
      const lo=Math.min(...xs),hi=Math.max(...xs),he=lerp(lo,hi,ln);
      s+=`<path d="M${f1(px(lo))} ${f1(py(clamp(a0+b*lo)))} L${f1(px(he))} ${f1(py(clamp(a0+b*he)))}" style="stroke:var(--ink);stroke-width:2;stroke-dasharray:6 4"/>`}
    const ro=ramp(t,.8,.9);
    const P=N?{x:16,y:368,lx:220,ly:368}:{x:500,y:50,lx:500,ly:230};
    s+=`<g style="opacity:${f1(Math.max(ro,.25))}"><text x="${P.x}" y="${P.y}" class="t-sm">PUBLISHED RESULT</text>`;
    const lines=mode==='syn'?['two-region synapse model','vs Mattis DRS, 15 with AD','and 9 controls; plaques','contributed only 26% of that']
                             :['in this 1991 sample, plaques','and tangles correlated','only weakly with cognition'];
    s+=`<text x="${P.x}" y="${P.y+38}" class="t-big" style="font-size:30px">${mode==='syn'?'r = 0.96':'weak'}</text>`;
    lines.forEach((l,i)=>{s+=`<text x="${P.x}" y="${P.y+60+i*15}" class="t-xs">${l}</text>`});s+='</g>';
    s+=`<circle cx="${P.lx+6}" cy="${P.ly+(N?18:0)-4}" r="5" style="fill:var(--rose)"/><text x="${P.lx+18}" y="${P.ly+(N?18:0)}" class="t-xs">with Alzheimer's</text>`;
    s+=`<circle cx="${P.lx+6}" cy="${P.ly+(N?38:20)-4}" r="5" style="fill:var(--panel);stroke:var(--sage);stroke-width:2"/><text x="${P.lx+18}" y="${P.ly+(N?38:20)}" class="t-xs">control</text>`;
    s+=`<path d="M${P.lx} ${P.ly+(N?54:36)} h14" style="stroke:var(--ink);stroke-width:2;stroke-dasharray:4 3"/><text x="${P.lx+18}" y="${P.ly+(N?58:40)}" class="t-xs">fit to drawn points</text>`;
    s+=`<text x="${N?16:500}" y="${N?512:300}" class="t-xs">Points are schematic,</text><text x="${N?16:500}" y="${N?526:314}" class="t-xs">not Terry's data.</text>`;
    tsv.innerHTML=s;
    trg.setAttribute('aria-valuetext',`${Math.round(ramp(t,0,.6)*24)} of 24 people plotted`);
  }
  const TN={
    syn:{k:'Terry et al., 1991',t:'Synapse density predicts cognition',txt:'A model using synapse density in two cortical regions (midfrontal and inferior parietal) correlated with Mattis Dementia Rating Scale scores at r = 0.96. Plaques contributed only 26% of that. [[Terry1991]] A later study in hippocampus found the same: synapse number tracked recall, not tangle stage. [[Scheff2007]]',
      pt:'How many connections are left matches how well a person thinks far better than how many plaques they have.',
      hook:'Synapse loss = strongest structural correlate of cognitive impairment in Alzheimer\'s (Terry 1991, r = 0.96 for a two-region model). Plaques correlate weakly.'},
    pla:{k:'Terry et al., 1991',t:'Plaques line up poorly',txt:'In the same brains, plaque counts correlated only weakly with cognition. [[Terry1991]] Amyloid positivity is also common in cognitively normal older people: 10% at age 50 and 44% at age 90 in a large meta-analysis. [[Jansen2015]]',
      pt:'Many people have lots of plaques and still think well. Plaque counts alone say little about symptoms.'},
    tan:{k:'Terry et al., 1991 · and later work',t:'Tangles: weak here, better elsewhere',txt:'In Terry\'s 1991 sample, tangles also correlated only weakly. Other studies found neocortical tangle counts track dementia severity better than plaques, and a consensus review agreed. [[Terry1991,Arriagada1992,Nelson2012]] Neuron loss tracked tangles but exceeded tangle counts many times over. [[GomezIsla1997]]',
      pt:'Tangles track symptoms better than plaques, but lost connections track them best of all.'}};
  function setMode(m){if(m===mode)return;const from=X.slice();mode=m;
    ['syn','pla','tan'].forEach(k=>$('#glX'+k).setAttribute('aria-pressed',k===m));
    $('#glTNote').innerHTML=noteHTML(TN[m]);
    if(stopM)stopM();stopM=animate(700,p=>{X=from.map((v,i)=>lerp(v,PTS[i][m],ease(p)));drawT(+trg.value)},()=>{stopM=null})}
  ['syn','pla','tan'].forEach(k=>{$('#glX'+k).onclick=()=>setMode(k)});
  $('#glTNote').innerHTML=noteHTML(TN.syn);
  playWire(trg,$('#glTPlay'),drawT,9000,'Replay','glia');
  draw(+rg.value);drawT(+trg.value);
};
