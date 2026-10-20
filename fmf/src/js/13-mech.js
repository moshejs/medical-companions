
/* =============== 1.3 mechanism =============== */
const MX=[
 {from:0,at:.06,k:'Step 1 · Resting',t:'RhoA on, pyrin held off',
  txt:'Active RhoA (bound to GTP) switches on two kinases, PKN1 and PKN2. They put phosphate groups on pyrin at serine 208 and serine 242. 14-3-3 proteins grab those phosphates and hold pyrin in an inactive shape. [[Park2016,Gao2016]]',
  pt:'Pyrin is a guard that is kept asleep as long as a cell switch called RhoA stays on.',
  hook:'Pyrin is a <b>guard</b> of RhoA activity, not a direct sensor of microbial molecules. Phospho-S208/S242 + 14-3-3 = OFF.'},
 {from:.15,at:.22,k:'Step 2 · The switch dips',t:'RhoA activity falls',
  txt:'Several bacteria make toxins or effectors that modify and inactivate RhoA. Pyrin evolved to notice that loss of RhoA signaling, a classic "guard" strategy. [[Xu2014]]',
  pt:'Some germs switch RhoA off. Pyrin notices the switch going quiet.',
  hook:'Xu et al. 2014 showed pyrin senses <b>modification of Rho GTPases</b>, not the bacterium itself.'},
 {from:.32,at:.38,k:'Step 3 · Release',t:'PKN stops, phosphates drop off',
  txt:'Without RhoA, PKN activity falls, pyrin is dephosphorylated and 14-3-3 lets go. A second, microtubule-dependent step is then needed for pyrin to assemble in normal cells. FMF-associated B30.2 variants make pyrin need less: dephosphorylation alone can be enough. FMF cells are not switched on all the time: they respond to stimuli too weak to move normal cells, more strongly with two variants than one. [[Park2016,VanGorp2016,Magnotti2019,Jamilloux2018]] Exactly how the variants weaken the brake is debated: Park 2016 found reduced PKN and 14-3-3 binding, while other work points to the later, microtubule-dependent control step. [[Park2016,Masters2016,Magnotti2019]]',
  pt:'With the switch off, the brakes on pyrin come off. In FMF the brakes are weaker to begin with.',
  hook:'Normal pyrin needs <b>two</b> steps (dephosphorylation + a microtubule-dependent step). FMF pyrin needs less, so it fires at a lower threshold.'},
 {from:.45,at:.53,k:'Step 4 · Inflammasome',t:'Pyrin–ASC–caspase-1 speck',
  txt:'Freed pyrin binds the adaptor ASC through its PYD domain. ASC polymerizes into one large "speck" per cell and recruits pro-caspase-1, which activates itself. [[Richards2001,Lu2014,Broz2016]]',
  pt:'Pyrin pulls helper proteins together into one big alarm complex.',
  hook:'Inflammasome = sensor (pyrin) + adaptor (<b>ASC</b>) + effector (<b>caspase-1</b>).'},
 {from:.62,at:.70,k:'Step 5 · Cytokines',t:'IL-1β and IL-18 are cut and released',
  txt:'Caspase-1 cleaves inactive pro-IL-1β and pro-IL-18 into their active forms. IL-1β is the main driver of fever, neutrophil recruitment and the acute-phase response (CRP and SAA from the liver). [[Schnappauf2019,Dinarello2011]]',
  pt:'The alarm complex cuts two messenger proteins into their active forms. One of them, IL-1β, causes the fever.',
  hook:'Blocking IL-1 (anakinra, canakinumab, rilonacept) works in colchicine-resistant FMF because IL-1β is downstream of pyrin.'},
 {from:.78,at:.9,k:'Step 6 · Pyroptosis',t:'Gasdermin D pores, the cell bursts',
  txt:'Caspase-1 also cuts gasdermin D. Its N-terminal fragment punches pores in the cell membrane. IL-1β leaves through the pores, then the swollen cell ruptures: pyroptosis, an inflammatory cell death. The pores are roughly 10–14 nm wide. More neutrophils are called in. [[Shi2015,Liu2016,Evavold2018]]',
  pt:'The cell opens holes in its own surface, lets the alarm out and then bursts, calling more white cells to the spot.',
  hook:'Pyroptosis is inflammatory (contents spill). Apoptosis is quiet. Gasdermin D is the pore-former.'}
];
inits.mech=()=>{
  const svg=$('#mxSvg'),rg=$('#mxT');let mut=false,path=false;
  const TH={norm:.3,mut:.72};
  const r=rng(5);const ASC=Array.from({length:26},(_,i)=>({a:i/26*Math.PI*2,d:24+r()*12}));
  const fires=()=>{const lvl=path?.1:.6;return lvl<(mut?TH.mut:TH.norm)};
  function draw(t){
    const lvlTarget=path?.1:.6, th=mut?TH.mut:TH.norm, fire=fires();
    const dip=ramp(t,.15,.3);const recover=fire?0:ramp(t,.55,.8);
    const lvl=lerp(1,lerp(lvlTarget,1,recover),dip);
    const rel=fire?ease(ramp(t,.32,.45)):0, asm=fire?ease(ramp(t,.45,.6)):0, cut=fire?ease(ramp(t,.62,.76)):0, pore=fire?ease(ramp(t,.78,.9)):0, burst=fire?ramp(t,.9,1):0;
    const sw=1+.05*pore+.04*burst;
    const N=vb(svg,'720 390','400 712');
    const L=N
      ? {cx:200,cy:352,W:168,H:180, gx:20,gy:20,gbx:20,gbw:360, vx:20,vy:78,vAnchor:'',
         rx:90,ry:236, pknX:152,pknY:220, phA:208,phB:248,
         pxA:52,pxB:44, pyA:330,pyB:442, PS:.78,
         speckX:165,speckY:452, caspX:252,caspY:400,
         cytX:232,cytY:288,cytStep:30, exitX:352,
         nfX:30,nfY:556,nfW:340, neuX0:430,neuX1:312,neuY:596,neuStep:34, feverX:380,feverY:700}
      : {cx:300,cy:215,W:250,H:150, gx:40,gy:18,gbx:144,gbw:196, vx:350,vy:28,vAnchor:'',
         rx:110,ry:140, pknX:165,pknY:124, phA:222,phB:262,
         pxA:270,pxB:250, pyA:140,pyB:250, PS:1,
         speckX:250,speckY:250, caspX:330,caspY:205,
         cytX:390,cytY:200,cytStep:36, exitX:null,
         nfX:360,nfY:230,nfW:230, neuX0:760,neuX1:640,neuY:90,neuStep:110, feverX:700,feverY:370};
    let s=`<defs>${marker('mxA')}${marker('mxAt','var(--terra)')}</defs>`;
    // outside + membrane
    const cx=L.cx,cy=L.cy,W=L.W*sw,H=L.H*sw;
    s+=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    const poreAng=[-.5,-.15,.2,.55];
    s+=`<ellipse cx="${cx}" cy="${cy}" rx="${f1(W)}" ry="${f1(H)}" style="fill:var(--cyto);stroke:var(--memb);stroke-width:5;${burst>.5?'stroke-dasharray:'+f1(30-20*burst)+' '+f1(6+30*burst):''}"/>`;
    if(pore>0)poreAng.forEach(a=>{const x=cx+W*Math.cos(a),y=cy+H*Math.sin(a);s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(7*pore)}" style="fill:var(--field);stroke:var(--terra);stroke-width:2"/>`});
    s+=`<text x="${f1(cx-W+14)}" y="${f1(cy-H+26)}" class="t-sm">NEUTROPHIL CYTOPLASM</text>`;
    // gauge
    s+=`<text x="${L.gx}" y="${L.gy+8}" class="t-sm">RhoA ACTIVITY</text><rect x="${L.gbx}" y="${N?L.gy+18:L.gy}" width="${L.gbw}" height="12" rx="6" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    const gby=N?L.gy+18:L.gy;
    s+=`<rect x="${L.gbx}" y="${gby}" width="${f1(L.gbw*lvl)}" height="12" rx="6" style="fill:var(--sea)"/>`;
    const tx=L.gbx+L.gbw*th;
    s+=`<line x1="${f1(tx)}" x2="${f1(tx)}" y1="${gby-5}" y2="${gby+17}" style="stroke:var(--terra);stroke-width:3"/><text x="${f1(clamp(tx,56,L.gbx+L.gbw-56))}" y="${gby+30}" class="t-xs t-mid" style="fill:var(--terra)">${mut?'M694V threshold':'normal threshold'}</text>`;
    s+=`<text x="${L.vx}" y="${L.vy}" class="t-sm">${lvl<th?'<tspan style="fill:var(--terra)">below threshold → fire</tspan>':'above threshold → stay off'}</text>`;
    // RhoA + PKN
    const on=lvl;
    s+=`<circle cx="${L.rx}" cy="${L.ry}" r="${f1(20+6*on)}" style="fill:var(--sea);opacity:${f1(.15+.25*on)}"/><circle cx="${L.rx}" cy="${L.ry}" r="20" style="fill:var(--panel);stroke:var(--sea);stroke-width:2.5"/><text x="${L.rx}" y="${L.ry+4}" class="t-lbl t-mid">RhoA</text>`;
    s+=`<text x="${L.rx}" y="${L.ry+36}" class="t-xs t-mid" style="fill:${on>.5?'var(--sea)':'var(--muted)'}">${on>.5?'GTP · ON':'GDP · off'}</text>`;
    if(path&&dip>.2)s+=`<g style="opacity:${f1(dip)}"><path d="M${L.rx-50} ${L.ry-48} l20 10 -14 4z" style="fill:var(--terra)"/><text x="${L.rx-70}" y="${L.ry-54}" class="t-xs" style="fill:var(--terra)">toxin modifies RhoA</text></g>`;
    s+=`<path d="M${L.rx+25} ${L.ry} H${L.pknX-3}" class="arrow" marker-end="url(#mxA)" style="opacity:${f1(on)}"/>`;
    s+=`<rect x="${L.pknX}" y="${L.pknY}" width="56" height="32" rx="9" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.5;opacity:${f1(.35+.65*on)}"/><text x="${L.pknX+28}" y="${L.pknY+20}" class="t-lbl t-mid" style="opacity:${f1(.35+.65*on)}">PKN1/2</text>`;
    // phosphate traveling
    if(on>.5){const ph=(t*6)%1,phx=lerp(L.phA,L.phB,ph),phy=L.ry-8*Math.sin(ph*Math.PI);s+=`<circle cx="${f1(phx)}" cy="${f1(phy)}" r="6" style="fill:var(--gold)"/><text x="${f1(phx)}" y="${f1(phy+3)}" class="t-xs t-mid" style="fill:var(--panel);font-weight:700">P</text>`}
    // pyrin molecule (resting position → speck)
    const px=lerp(L.pxA,L.pxB,rel),py=lerp(L.pyA,L.pyB,asm),PS=L.PS*(1-.25*asm);
    const pyr=(x,y,sc=1,op=1)=>{let g=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(sc)})" style="opacity:${f1(op)}">`;
      g+=`<circle cx="0" cy="0" r="13" style="fill:var(--terra-soft);stroke:var(--terra);stroke-width:2"/><text x="0" y="4" class="t-xs t-mid" style="fill:var(--terra);font-weight:700">PYD</text>`;
      g+=`<path d="M13 0 H34" style="stroke:var(--muted);stroke-width:2"/><rect x="34" y="-9" width="24" height="18" rx="4" style="fill:var(--panel-2);stroke:var(--muted)"/><text x="46" y="4" class="t-xs t-mid">bZIP</text>`;
      g+=`<rect x="62" y="-9" width="24" height="18" rx="9" style="fill:var(--panel-2);stroke:var(--muted)"/><text x="74" y="4" class="t-xs t-mid">B</text>`;
      g+=`<path d="M90 0 q6 -10 12 0 t12 0 12 0" style="fill:none;stroke:var(--muted);stroke-width:2.4"/>`;
      g+=`<rect x="128" y="-15" width="40" height="30" rx="6" style="fill:var(--panel);stroke:var(--crocus);stroke-width:2"/><text x="148" y="4" class="t-xs t-mid">B30.2</text>`;
      if(mut)g+=`<circle cx="164" cy="-13" r="5" style="fill:var(--bad)"/><text x="164" y="-22" class="t-xs t-mid" style="fill:var(--bad)">M694V</text>`;
      return g+'</g>'};
    s+=pyr(px,py,PS,1);
    s+=`<text x="${f1(px+84*PS)}" y="${f1(py+30*L.PS+16-10*asm)}" class="t-sm t-mid" style="opacity:${f1(1-asm)}">pyrin (781 aa)</text>`;
    // phosphates + 14-3-3 clamp on the linker (S208/S242 lie between PYD and B-box)
    const phO=1-rel;
    [[38,'S208'],[56,'S242']].forEach(([dx,l])=>{const x=px+dx*PS,y=py-22*L.PS;
      s+=`<g style="opacity:${f1(phO)}"><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(7*L.PS)}" style="fill:var(--gold)"/><text x="${f1(x)}" y="${f1(y+3)}" class="t-xs t-mid" style="fill:var(--panel);font-weight:700">P</text><text x="${f1(x)}" y="${f1(y-11*L.PS)}" class="t-xs t-mid">${l}</text></g>`});
    const cl=rel*50;
    s+=`<g style="opacity:${f1(1-rel*.9)}" transform="translate(${f1(px+47*PS)} ${f1(py-(52+cl)*L.PS)}) scale(${f1(L.PS)})"><path d="M-30 -4 Q-30 22 -14 22 H14 Q30 22 30 -4" style="fill:none;stroke:var(--sea);stroke-width:6;stroke-linecap:round"/><text x="0" y="-10" class="t-xs t-mid" style="fill:var(--sea)">14-3-3</text></g>`;
    // non-firing message
    if(!fire&&t>.32)s+=`<g style="opacity:${f1(ramp(t,.32,.4))}"><rect x="${L.nfX}" y="${L.nfY}" width="${L.nfW}" height="58" rx="10" style="fill:var(--good-soft);stroke:var(--good)"/><text x="${L.nfX+L.nfW/2}" y="${L.nfY+24}" class="t-lbl t-mid" style="fill:var(--good)">Threshold not crossed</text><text x="${L.nfX+L.nfW/2}" y="${L.nfY+44}" class="t-sm t-mid">pyrin stays phosphorylated · no attack</text></g>`;
    // ASC speck + caspase-1
    if(asm>0){ASC.forEach(a=>{const rr=a.d*asm;s+=`<circle cx="${f1(L.speckX+Math.cos(a.a)*rr)}" cy="${f1(L.speckY+Math.sin(a.a)*rr)}" r="4.2" style="fill:var(--crocus);opacity:${f1(asm*.9)}"/>`});
      s+=`<text x="${L.speckX}" y="${f1(L.speckY+50+4*asm)}" class="t-sm t-mid" style="opacity:${f1(asm)}">ASC speck</text>`;
      for(let k=0;k<5;k++){const a=k/5*Math.PI*2+.3,rr=lerp(90,46,asm);s+=`<rect x="${f1(L.speckX+Math.cos(a)*rr-7)}" y="${f1(L.speckY+Math.sin(a)*rr-7)}" width="14" height="14" rx="3" style="fill:var(--terra);opacity:${f1(asm)}"/>`}
      s+=`<text x="${L.caspX}" y="${L.caspY}" class="t-xs" style="fill:var(--terra);opacity:${f1(asm)}">caspase-1</text>`}
    // pro-IL-1β → IL-1β
    if(t>.55&&fire){const o=ramp(t,.55,.62),x0=L.cytX;
      for(let k=0;k<3;k++){const y=L.cytY+k*L.cytStep;
        s+=`<rect x="${x0}" y="${y}" width="${f1(lerp(70,30,cut)*(N?.7:1))}" height="12" rx="6" style="fill:var(--gold);opacity:${f1(o*(1-.8*cut))}"/>`;
        const tgt=L.exitX!=null?L.exitX+k*5:cx+W+40+k*18;
        const ex=lerp(x0+44,tgt,ease(ramp(t,.82+k*.03,1))),ey=lerp(y,cy+H*Math.sin(poreAng[k+1]),ease(ramp(t,.82,.95)));
        s+=`<circle cx="${f1(ex)}" cy="${f1(ey+6)}" r="${f1(6*cut)}" style="fill:var(--terra)"/>`}
      s+=`<text x="${x0}" y="${L.cytY-12}" class="t-xs" style="opacity:${f1(o)}">${cut>.5?'IL-1β · IL-18 active':(N?'pro-IL-1β / IL-18':'pro-IL-1β · pro-IL-18')}</text>`}
    // gasdermin D
    if(pore>0)s+=`<text x="${f1(cx+W-10)}" y="${f1(cy-H-8)}" class="t-xs t-end" style="fill:var(--terra)">gasdermin D pores</text>`;
    // incoming neutrophils + fever
    if(burst>0){for(let k=0;k<3;k++)s+=neutro(lerp(L.neuX0,L.neuX1-k*10,ease(ramp(burst,k*.15,1))),L.neuY+k*L.neuStep,13,1);
      s+=`<text x="${L.feverX}" y="${L.feverY}" class="t-sm t-end" style="fill:var(--terra)">IL-1β → fever, more neutrophils</text>`}
    svg.innerHTML=s;
    const p=phaseOf(MX,t);setSt(p);
    const P=MX[p];let extra='';
    if(!fire&&p>=2)extra=`<div class="hook"><b>What you just saw</b>${mut?'':'Normal pyrin ignored a small, everyday dip in RhoA. That is the healthy state: it fires only when a pathogen shuts RhoA down hard.'}</div>`;
    $('#mxNote').innerHTML=(!fire&&p>=2?noteHTML({k:'Steps 3–6 · Not triggered',t:'Nothing happens, RhoA recovers',txt:'The dip did not cross normal pyrin\'s threshold. Pyrin stays phosphorylated and bound to 14-3-3, so no inflammasome forms. Try the M694V genotype with the same small dip.',pt:'A healthy guard ignores small bumps.'}):noteHTML(P))+extra;
    $('#mxCap').textContent=`${mut?'M694V/M694V':'Normal'} pyrin · ${path?'pathogen switches RhoA off':'small everyday dip'} · ${fire?'inflammasome fires':'no inflammasome'}. Schematic, not to scale.`;
  }
  const stop=playWire(rg,$('#mxPlay'),draw,16000,'Replay','mech');
  const setSt=stepWire($('#mxSteps'),MX,rg,draw,stop);
  const tog=(a,b,v)=>{a.setAttribute('aria-pressed',v);b.setAttribute('aria-pressed',!v)};
  $('#mxNorm').onclick=()=>{mut=false;tog($('#mxNorm'),$('#mxMut'),true);draw(+rg.value)};
  $('#mxMut').onclick=()=>{mut=true;tog($('#mxNorm'),$('#mxMut'),false);draw(+rg.value)};
  $('#mxMinor').onclick=()=>{path=false;tog($('#mxMinor'),$('#mxPath'),true);draw(+rg.value)};
  $('#mxPath').onclick=()=>{path=true;tog($('#mxMinor'),$('#mxPath'),false);draw(+rg.value)};
  $('#mxGrid').innerHTML=`<tr><th>Normal pyrin</th><td><span class="tag good">No response</span> Correctly ignored.</td><td><span class="tag sea">Fires</span> Appropriate defense against a RhoA-modifying pathogen.</td></tr>
   <tr class="hl"><th>FMF variant pyrin</th><td><span class="tag terra">Fires</span> The disease: an attack with no real threat.</td><td><span class="tag terra">Fires strongly</span> May have helped carriers survive certain infections (a hypothesis). [[Park2020]]</td></tr>`;
  $('#mxCards').innerHTML=`
   <div class="card"><h4>Where pyrin lives</h4><p>Pyrin is made mainly in innate immune cells: neutrophils, eosinophils, monocytes and dendritic cells, all of which come from bone-marrow stem cells. That is why FMF inflammation is neutrophil-rich, and why marrow replacement is discussed in <a href="#cure" data-go="cure">Toward a cure</a>. [[Centola2000,Schnappauf2019]]</p></div>
   <div class="card"><h4>What finishes the second step</h4><p>A chemical screen found that two of the body's own steroid breakdown products, etiocholanolone and pregnanolone, can drive the second activation step directly. The explicit "two-step" description of pyrin activation comes from that work. [[Magnotti2022]]</p></div>
   <div class="card"><h4>Not the same as NLRP3</h4><p>NLRP3 senses many kinds of cell stress (potassium efflux, crystals). Pyrin senses one thing: loss of RhoA signaling. Both feed the same ASC → caspase-1 → IL-1β machinery. [[Heilig2018]]</p></div>
   <div class="card"><h4>A gain of function</h4><p>FMF is recessive, yet the variants make pyrin <b>more</b> active, not less. In mice, human B30.2 variants knocked into pyrin caused IL-1β–dependent autoinflammation. [[Chae2011]]</p></div>
   <div class="card"><h4>The same switch in HIDS/MKD</h4><p>In mevalonate kinase deficiency, too little geranylgeranyl pyrophosphate means RhoA cannot be prenylated and anchored, so RhoA is functionally off and pyrin is released. One RhoA node links two different fever syndromes. [[Park2016]]</p></div>
   <div class="card"><h4>PAAND: the other pyrin disease</h4><p>A dominant variant at S242 (S242R) removes a phosphorylation site directly, so 14-3-3 cannot bind. It causes neutrophilic dermatosis rather than classic FMF, which supports the whole phosphorylation model. A second variant at the same site, E244K, does the same thing. [[Masters2016,Moghaddas2017]]</p></div>`;
  draw(+rg.value);
};
