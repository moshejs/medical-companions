
/* =============== 1.4 a flare, hour by hour =============== */
/* the track: the first 24 h take half of it on a log-like scale, days 1–14 the other half */
const FL_K=3,FL_E=Math.exp(FL_K)-1;
const flH=u=>u<=.5?24*(Math.exp(FL_K*u/.5)-1)/FL_E:24+(u-.5)/.5*312;
const flU=h=>h<=24?.5*Math.log(1+h*FL_E/24)/FL_K:.5+.5*(h-24)/312;
const flFmt=h=>h<1?`${Math.round(h*60)} min`:h<48?`hour ${h<10?f1(h):Math.round(h)}`:`day ${f1(h/24)}`;
/* monotone cubic through anchor points (no overshoot at the pain peak) */
function flMono(xs,ys){const n=xs.length,d=[],m=[];for(let i=0;i<n-1;i++)d.push((ys[i+1]-ys[i])/(xs[i+1]-xs[i]));
  m[0]=d[0];m[n-1]=d[n-2];for(let i=1;i<n-1;i++)m[i]=d[i-1]*d[i]<=0?0:(d[i-1]+d[i])/2;
  for(let i=0;i<n-1;i++){if(d[i]===0){m[i]=m[i+1]=0;continue}const a=m[i]/d[i],b=m[i+1]/d[i],q=a*a+b*b;if(q>9){const t=3/Math.sqrt(q);m[i]=t*a*d[i];m[i+1]=t*b*d[i]}}
  return x=>{if(x<=xs[0])return ys[0];if(x>=xs[n-1])return ys[n-1];let i=0;while(x>xs[i+1])i++;const h=xs[i+1]-xs[i],t=(x-xs[i])/h,t2=t*t,t3=t2*t;
    return(2*t3-3*t2+1)*ys[i]+(t3-2*t2+t)*h*m[i]+(-2*t3+3*t2)*ys[i+1]+(t3-t2)*h*m[i+1]}}
const FL_PAIN=flMono([0,12,24,120,168,336],[1,7,9,6,3,0]);
const FL_CRP=h=>{const x=h/60;return h<=0?0:Math.min(1,x*x*Math.exp(2*(1-x)))};
const FL_STEPS=[
 {from:0,at:.02,k:'Hour 0',t:'Crystals shed into the joint',
  txt:'The crystals were there before the flare. A large deposit does not by itself cause flares: people with tophi do not necessarily have them, and MSU crystals alone had no effect on healthy blood mononuclear cells [[Joosten2010]]. Flares are 2.36 times as likely to begin overnight as in the daytime [[Choi2015]]. Purine intake over the previous 2 days (OR 4.76, top vs bottom fifth) and alcohol in the previous 24 hours (OR 1.36 for more than 1–2 drinks) raised the odds of a flare [[Zhang2012,Neogi2014]]. One idea is that a resolving effusion loses water faster than urate, so local urate briefly rises <span class="ev hyp">Hypothesis</span> [[Simkin1977]].',
  pt:'The crystals were already sitting in the joint. Something loosens a few of them, very often during the night.',
  hook:'Flare onset is most likely <b>overnight</b>: OR 2.36 against the daytime [[Choi2015]].'},
 {from:flU(.5),at:flU(1.2),k:'Hours 0–2 · schematic',t:'Signal 1: priming',
  txt:'A resident macrophage needs a first signal before it can make mature IL-1β: without one, monocytes and macrophages cultured with MSU crystals do not secrete it [[Busso2010]]. That signal builds a stock of inactive pro-IL-1β. In human cells, the saturated fatty acid C18:0 (stearic acid) plus MSU crystals drove large IL-1β release through TLR2 <span class="ev early">Early evidence</span> [[Joosten2010]]. TLR2- and TLR4-knockout macrophages made less IL-1β, but another study found no TLR that responded to MSU, so the receptor step is disputed [[Busso2010,Chen2006]].',
  pt:'The immune cell gets a first warning and starts building an inactive alarm protein, ready to use.',
  hook:'Two signals: <b>signal 1</b> primes (pro-IL-1β is made), <b>signal 2</b> activates the inflammasome [[Busso2010]].'},
 {from:flU(2),at:flU(3.4),k:'Hours 1–4 · schematic',t:'Signal 2: NLRP3 assembles',
  txt:'The macrophage swallows a crystal. With silica and alum crystals, phagocytosis ruptured lysosomes, and blocking cathepsin B impaired NLRP3 activation; MSU is assumed to work the same way [[Hornung2008]]. Across NLRP3 activators, the one shared event was K⁺ leaving the cell: a fall in cytosolic K⁺ was necessary and sufficient, and reactive oxygen species were not required [[MunozPlanillo2013]]. Active NLRP3 nucleates ASC filaments, which gather caspase-1 so that it activates itself by proximity [[Lu2014]]. Macrophages lacking caspase-1, ASC or NALP3 are defective in crystal-induced IL-1β activation [[Martinon2006]].',
  pt:'The cell eats a crystal, which tears its digestive sac. Potassium leaks out, and that switches on an alarm complex called NLRP3.',
  hook:'The essential trigger for NLRP3 is <b>K⁺ efflux</b>; ROS are not required [[MunozPlanillo2013]]. Inflammasome = NLRP3 + ASC + caspase-1 [[Martinon2006]].'},
 {from:flU(4),at:flU(7),k:'Hours 4–12 · schematic',t:'IL-1β calls neutrophils',
  txt:'Caspase-1 cuts pro-IL-1β into active IL-1β and also cleaves gasdermin D, whose pores let IL-1β out [[Shi2015,Liu2016,Evavold2018]]. IL-1 and its receptor are essential for MSU inflammation, and the receptor is needed on non-bone-marrow cells, most probably the endothelium, not on leukocytes [[Chen2006,Busso2010]]. Chemokines follow: in a mouse air pouch, neutrophil inflammation 4 hours after crystal injection depended entirely on CXCR2 ligands, and in rabbits blocking IL-8 stopped the later influx at 24 hours (animal data) [[Busso2010]].',
  pt:'The alarm, IL-1β, leaves the cell and tells the nearby blood vessel to let white blood cells through.',
  hook:'IL-1β acts on IL-1R/MyD88 on <b>non-haematopoietic</b> cells such as endothelium [[Chen2006]]. That is why IL-1 blockers work in gout [[So2007]].'},
 {from:flU(12),at:flU(19),k:'Hours 12–24',t:'Peak: hot, red, untouchable',
  txt:'Time to maximal pain under 24 hours is a typical-episode feature in the 2015 ACR/EULAR criteria [[Neogi2015]]; in the study behind them it discriminated crystal-proven gout (OR 1.32) [[Taylor2015]]. Synovial fluid in the first 48 hours carries high IL-1β, IL-6, IL-8 and TNF and a high white cell count [[Scanu2012]]. Among 67 people in hospital with gout or pseudogout, 34% had fever from the synovitis [[Ho1993]]. Serum urate can be normal now: it was in 20 of 41 people (49%) [[Urano2002]].',
  pt:'Within a day the joint is at its worst: hot, red, swollen, and too sore to touch. Your blood urate may read normal.',
  hook:'Maximal pain within <b>24 h</b>. A normal serum urate during a flare does not exclude gout [[Neogi2015,Urano2002]].'},
 {from:flU(48),at:flU(100),k:'Days 2–7',t:'NETs aggregate and mop up',
  txt:'Recruited neutrophils form extracellular traps (NETs). At high neutrophil density the NETs aggregate and degrade cytokines and chemokines with serine proteases, and people with impaired NET formation had persistent inflammation [[Schauer2014]]. Differentiated macrophages release TGF-β1, which suppresses endothelial E-selectin and neutrophil capture; cells from 40-hour resolving skin blisters made TGF-β1, cells from 16-hour acute blisters did not [[Yagnik2004]]. In synovial fluid, TGF-β1 rose at days 3–4 and peaked at days 5–7, when white cells and cytokines were lowest [[Scanu2012]]. The crystal coat changes from IgG to apolipoprotein B as inflammation subsides [[OrtizBravo1993]].',
  pt:'The white cells throw out sticky nets that trap and break down the alarm signals. The flare starts to burn out.',
  hook:'<b>Aggregated NETs</b> degrade cytokines and help end the flare [[Schauer2014]]; TGF-β1 switches the vessel wall off [[Yagnik2004]].'},
 {from:flU(168),at:flU(270),k:'Days 7–14',t:'Resolution, crystals remain',
  txt:'Resolution within 14 days is a typical-episode feature in the 2015 criteria [[Neogi2015]]. Without effective treatment, 11 volunteers with podagra were observed: 2 withdrew on day 4 with severe pain, all remaining improved in pain by day 5 and in swelling by day 7, but only 3 were pain-free within the 7 days [[Bellamy1987]]. Inflammation resolves even though MSU crystals can still be found in synovial fluid and tissues [[Schauer2014]]. Gout is a chronic disease even though it shows itself as flares [[Dalbeth2021]].',
  pt:'Within one to two weeks the flare settles by itself. The crystals are still there, so another flare can come unless urate is lowered.',
  hook:'Resolution ≤ 14 days, but the crystals stay. Only lowering urate removes them [[Neogi2015,Schauer2014,Dalbeth2021]].'}
];
const FL_DRUG={
 none:null,
 colch:{n:'Colchicine',w:'colchicine',c:'var(--crocus)',bg:'var(--crocus-soft)',lab:['colchicine ⊣ microtubules','colchicine ⊣ sticking'],
  txt:'Colchicine stops tubulin forming microtubules, which prevents neutrophil activation, degranulation and migration [[FDA-Colcrys]]. NLRP3 assembly also needs microtubules to bring ASC to NLRP3 [[Misawa2013]], and reviews describe colchicine\'s microtubule block as dampening that step [[Leung2015,Dalbeth2014ClinTher]]. At very low concentrations it changed how E-selectin sits on endothelial cells and abolished their extra stickiness for neutrophils [[Cronstein1995]]. EULAR 2016 recommends starting within 12 h of flare onset, the shaded window on the curves [[Richette2017]].'},
 nsaid:{n:'NSAID',w:'an NSAID',c:'var(--sea)',bg:'var(--sea-soft)',lab:['NSAID ⊣ COX in inflamed tissue'],
  txt:'NSAIDs block cyclo-oxygenase (COX); non-selective NSAIDs and COX-2 inhibitors gave similar pain relief in flares, but non-selective ones caused more gastrointestinal adverse events [[vanDurme2021]]. They are drawn downstream, on the inflamed tissue, because they do not target the crystal–inflammasome step. In CONTACT, naproxen matched low-dose colchicine for pain over 7 days [[Roddy2020]].'},
 gc:{n:'Glucocorticoid',w:'a glucocorticoid',c:'var(--sea)',bg:'var(--sea-soft)',lab:['glucocorticoid ⊣ inflammatory genes'],
  txt:'Glucocorticoids act broadly inside cells; the badge on the nucleus is a simplification, not a single proven target in gout. In trials, prednisolone 35 mg once daily for 5 days was equivalent to naproxen 500 mg twice daily [[Janssens2008]], and across 6 trials pain was no different from NSAIDs, with less indigestion, nausea and vomiting [[Billy2018]].'},
 il1:{n:'IL-1 blocker',w:'an IL-1 blocker',c:'var(--sea)',bg:'var(--sea-soft)',lab:['IL-1 blocker ⊣ IL-1β → IL-1R'],
  txt:'Canakinumab is an antibody against IL-1β [[IlarisPIG]]; anakinra is an IL-1 receptor antagonist [[KineretPI]]. Both cut the link between the inflammasome and the vessel wall, which is essential in mice [[Chen2006]]. In an open pilot, all 10 people given anakinra 100 mg daily for 3 days responded [[So2007]]; canakinumab 150 mg gave lower 72-hour pain than triamcinolone 40 mg [[Schlesinger2012]].'}
};
inits.flare=()=>{
  const svg=$('#flSvg'),rg=$('#flT');let drug='none';
  const r=rng(1414);
  const DEP=Array.from({length:22},()=>({x:r(),y:r(),a:(r()-.5)*40,l:.8+r()*.4}));
  const SHED=Array.from({length:4},()=>({x:r(),y:r(),a:r()*180}));
  const NE=Array.from({length:32},(_,k)=>({w:r(),tx:r(),ty:r(),b:k%4===3,ph:r()}));
  const ASC=Array.from({length:24},(_,i)=>({a:i/24*Math.PI*2,d:20+r()*10}));
  const NETS=Array.from({length:3},()=>Array.from({length:9},()=>({a:r()*Math.PI*2,l:16+r()*20,c:(r()-.5)*28})));
  const ILD=Array.from({length:7},()=>({x:r(),y:r()}));
  const WIDE={vb:'720 470',sc:[0,0,720,300],cart:{x:0,y:272,w:604,h:28,top:false},dep:[24,232,252,266],depLab:[10,292],
    mac:{cx:255,cy:140,W:150,H:98},nuc:[205,166,32,22],tlrA:-2.45,ffa:[40,86],pro:[226,92],
    phE:[288,236],ph:[305,186],kA:-.78,speck:[350,134],spDx:0,spDy:-46,kLab:null,tgf:[275,212],caspLab:[306,152],pores:[-.28,.02,.32],
    ves:{x:614,y:0,w:70,h:300,vert:true},nA:[420,24,598,262],nB:[30,206,214,246],nets:[[478,200],[548,82],[84,238]],
    time:[14,26],macLab:[255,60],lanes:{x0:62,x1:704,p0:330,p1:376,c0:398,c1:438,tick:454,foot:468,
      ticks:[[0,'0'],[1,'1 h'],[4,'4 h'],[12,'12 h'],[24,'24 h'],[72,'day 3'],[168,'day 7'],[336,'day 14']]},
    badges:{colch:[[400,96,355,118],[470,282,614,236]],nsaid:[[430,36,500,140]],gc:[[14,100,176,160]],il1:[[430,258,614,140]]}};
  const NARROW_L={vb:'400 820',sc:[0,0,400,560],cart:{x:0,y:0,w:400,h:26,top:true},dep:[30,220,30,44],depLab:[10,17],
    mac:{cx:190,cy:204,W:160,H:104},nuc:[148,230,32,22],tlrA:-2.45,ffa:[14,74],pro:[166,148],
    phE:[217,101],ph:[242,170],kA:-.45,speck:[270,236],spDx:46,spDy:4,kLab:[392,92],tgf:[118,284],caspLab:[222,262],pores:[.95,1.2,1.45],
    ves:{x:0,y:484,w:400,h:66,vert:false},nA:[20,322,384,470],nB:[60,52,384,90],nets:[[108,398],[292,372],[300,70]],
    time:[392,316],macLab:[190,122],lanes:{x0:44,x1:388,p0:600,p1:664,c0:690,c1:752,tick:770,foot:792,
      ticks:[[0,'0'],[4,'4 h'],[12,'12 h'],[24,'24 h'],[168,'day 7'],[336,'day 14']]},
    badges:{colch:[[200,332,270,250],[20,452,110,484]],nsaid:[[150,330,220,410]],gc:[[14,320,140,250]],il1:[[150,452,250,484]]}};
  const HALO='paint-order:stroke;stroke:var(--field);stroke-width:3px;stroke-linejoin:round;';
  const yglyph=(x,y,dx,dy,col,o,len=9)=>{const tx=x+dx*len,ty=y+dy*len,px=-dy,py=dx;return `<path d="M${f1(x)} ${f1(y)} L${f1(tx)} ${f1(ty)} M${f1(tx)} ${f1(ty)} L${f1(tx+dx*5+px*4)} ${f1(ty+dy*5+py*4)} M${f1(tx)} ${f1(ty)} L${f1(tx+dx*5-px*4)} ${f1(ty+dy*5-py*4)}" style="fill:none;stroke:${col};stroke-width:2;stroke-linecap:round;opacity:${f1(o)}"/>`};
  function draw(u){
    const N=NARROW();const L=N?NARROW_L:WIDE;vb(svg,WIDE.vb,NARROW_L.vb);
    const h=flH(u);
    const shed=ease(ramp(h,0,1)),prime=ramp(h,.4,2),toE=ease(ramp(h,0,1)),toP=ease(ramp(h,1,2)),lys=ramp(h,1.5,2),rupt=ramp(h,2,3),kef=ramp(h,2.5,4);
    const asm=ease(ramp(h,3,4.5)),cut=ease(ramp(h,4,6)),pore=ease(ramp(h,4.5,6.5)),il1=ramp(h,5,10);
    const nets=ramp(h,40,100)*(1-.5*ramp(h,200,330)),tgf=ramp(h,40,120);
    const esel=ramp(h,6,11)*(1-.85*tgf);
    const A=ramp(h,4,20)*(1-.8*ramp(h,96,168))*(1-ramp(h,168,320));
    const inflam=ramp(h,5,16)*(1-ramp(h,60,300));
    const fade=1-.65*ramp(h,150,300);
    const M=L.mac,V=L.ves,mp=a=>[M.cx+M.W*Math.cos(a),M.cy+M.H*Math.sin(a)];
    let s=`<defs>${marker('flA')}${marker('flAt','var(--terra)')}</defs>`;
    const [sx,sy,sw,sh]=L.sc;
    s+=`<rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" rx="12" style="fill:var(--field)"/>`;
    s+=`<rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" rx="12" style="fill:var(--terra);opacity:${(.16*inflam).toFixed(3)}"/>`;
    // cartilage + crystal deposit
    const C=L.cart;s+=`<rect x="${C.x}" y="${C.y}" width="${C.w}" height="${C.h}" style="fill:var(--panel-2);stroke:var(--memb);stroke-width:1.2"/>`;
    s+=`<text x="${L.depLab[0]}" y="${L.depLab[1]}" class="t-xs">CARTILAGE · crystal deposit</text>`;
    const [dx0,dx1,dy0,dy1]=L.dep;
    DEP.forEach(n=>{s+=needle(lerp(dx0,dx1,n.x),lerp(dy0,dy1,n.y),12*n.l,n.a,1)});
    if(h>190)s+=`<text x="${dx1+8}" y="${f1((dy0+dy1)/2+3)}" class="t-sm" style="${HALO}fill:var(--xtal);opacity:${f1(ramp(h,190,250))}">crystals remain</text>`;
    // venule
    const vr=V.vert?V.w/2:V.h/2;
    s+=`<rect x="${V.x}" y="${V.y}" width="${V.w}" height="${V.h}" rx="${vr}" style="fill:var(--bad-soft);stroke:var(--bad);stroke-width:2"/>`;
    for(let i=0;i<9;i++){if(V.vert){const cy=V.y+((i*37+u*2600)%V.h);s+=`<ellipse cx="${V.x+V.w/2+(i%3-1)*15}" cy="${f1(cy)}" rx="5" ry="8" style="fill:var(--bad);opacity:.6"/>`}
      else{const cx=V.x+((i*47+u*2600)%V.w);s+=`<ellipse cx="${f1(cx)}" cy="${V.y+V.h/2+(i%3-1)*15}" rx="8" ry="5" style="fill:var(--bad);opacity:.6"/>`}}
    s+=V.vert?`<text x="${V.x+V.w/2}" y="${V.y+16}" class="t-xs t-mid" style="fill:var(--bad)">VENULE</text><text x="${V.x-4}" y="${V.y+V.h-8}" class="t-xs t-end">endothelium</text>`
             :`<text x="${V.x+V.w/2}" y="${V.y+V.h-6}" class="t-xs t-mid" style="fill:var(--bad)">VENULE</text><text x="${V.x+V.w-6}" y="${V.y-6}" class="t-xs t-end">endothelium</text>`;
    const wp=q=>V.vert?[V.x,V.y+24+q*(V.h-48)]:[V.x+24+q*(V.w-48),V.y], wd=V.vert?[-1,0]:[0,-1];
    if(esel>0)for(let k=0;k<7;k++){const [x,y]=wp(k/6);s+=yglyph(x,y,wd[0],wd[1],'var(--terra)',esel,7)}
    if(esel>.3)s+=`<text x="${V.vert?V.x-6:V.x+V.w-6}" y="${V.vert?V.y+40:V.y-20}" class="t-xs t-end" style="${HALO}fill:var(--terra);opacity:${f1(esel)}">E-selectin up</text>`;
    // macrophage
    s+=`<ellipse cx="${M.cx}" cy="${M.cy}" rx="${M.W}" ry="${M.H}" style="fill:var(--cyto);stroke:var(--memb);stroke-width:4"/>`;
    s+=`<text x="${L.macLab[0]}" y="${L.macLab[1]}" class="t-xs t-mid">RESIDENT MACROPHAGE</text>`;
    const [nx,ny,nrx,nry]=L.nuc;
    s+=`<ellipse cx="${nx}" cy="${ny}" rx="${nrx}" ry="${nry}" style="fill:var(--nuc);opacity:.85;stroke:${prime>.3?'var(--gold)':'none'};stroke-width:2"/><text x="${nx}" y="${ny+nry+12}" class="t-xs t-mid">nucleus</text>`;
    // signal 1: fatty acid + TLR2/4 → NF-κB → pro-IL-1β
    const [tx,ty]=mp(L.tlrA),tn=[Math.cos(L.tlrA),Math.sin(L.tlrA)];
    s+=yglyph(tx,ty,tn[0],tn[1],'var(--ink)',1,10);
    s+=`<text x="${f1(tx+16)}" y="${f1(ty+18)}" class="t-xs">TLR2/4</text>`;
    const fp=ease(ramp(h,0,.8)),fx=lerp(L.ffa[0],tx+tn[0]*24,fp),fy=lerp(L.ffa[1],ty+tn[1]*24,fp);
    if(h<40){let zz=`M${f1(fx-14)} ${f1(fy)}`;for(let k=1;k<=7;k++)zz+=` L${f1(fx-14+k*4)} ${f1(fy+(k%2?-3:3))}`;
      s+=`<path d="${zz}" style="fill:none;stroke:var(--warn);stroke-width:2;opacity:${f1(1-ramp(h,8,40))}"/><text x="${f1(fx-14)}" y="${f1(fy+(N?16:-9))}" class="t-xs" style="${HALO}fill:var(--warn);opacity:${f1(1-ramp(h,8,40))}">fatty acid C18:0</text>`}
    if(prime>0){s+=`<path d="M${f1(tx-tn[0]*6)} ${f1(ty-tn[1]*6)} Q${f1((tx+nx)/2+10)} ${f1((ty+ny)/2-14)} ${f1(nx-nrx*.4)} ${f1(ny-nry)}" class="arrow" marker-end="url(#flA)" style="stroke-dasharray:4 3;opacity:${f1(prime)}"/>`;
      s+=`<text x="${f1((tx+nx)/2+8)}" y="${f1((ty+ny)/2-14)}" class="t-xs" style="opacity:${f1(prime)}">NF-κB</text>`}
    // pro-IL-1β bars → IL-1β
    const [px,py]=L.pro;
    if(prime>0){for(let k=0;k<3;k++)s+=`<rect x="${px}" y="${py+k*13}" width="${f1(lerp(6,38,prime)*(1-.75*cut))}" height="9" rx="4.5" style="fill:var(--gold);opacity:${f1(prime*(1-.7*cut))}"/>`;
      s+=`<text x="${px}" y="${py-6}" class="t-xs" style="opacity:${f1(prime)}">${cut>.5?'IL-1β (active)':'pro-IL-1β'}</text>`}
    // shed crystals; one is swallowed
    const [ex,ey]=L.phE,[qx,qy]=L.ph,dmid=[(dx0+dx1)/2,(dy0+dy1)/2];
    SHED.forEach((n,k)=>{const fxp=lerp(dmid[0]+(n.x-.5)*80,dmid[0]+(n.x-.5)*160,shed),fyp=lerp(dmid[1],dmid[1]+(C.top?1:-1)*(16+n.y*30),shed);s+=needle(fxp,fyp,11,n.a+h*8,shed*fade)});
    const cx=h<1?lerp(dmid[0],ex,toE):lerp(ex,qx,toP),cy=h<1?lerp(dmid[1],ey,toE):lerp(ey,qy,toP);
    if(lys>0){s+=`<circle cx="${qx}" cy="${qy}" r="17" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.6;${rupt>0?'stroke-dasharray:'+f1(8-6*rupt)+' '+f1(2+8*rupt)+';':''}opacity:${f1(lys*(1-.6*ramp(h,30,120)))}"/>`}
    s+=needle(cx,cy,13,35,1);
    if(lys>0&&h<30)s+=`<text x="${qx+22}" y="${qy+4}" class="t-xs" style="${HALO}opacity:${f1(lys)}">${rupt>.2?'lysosome ruptures':'phagolysosome'}</text>`;
    if(rupt>0&&h<40){for(let k=0;k<7;k++){const a=k/7*Math.PI*2+.3,rr=17+18*rupt;s+=`<circle cx="${f1(qx+Math.cos(a)*rr)}" cy="${f1(qy+Math.sin(a)*rr)}" r="2.6" style="fill:var(--warn);opacity:${f1(rupt*(1-ramp(h,12,40)))}"/>`}
      s+=`<text x="${qx+22}" y="${qy+16}" class="t-xs" style="${HALO}fill:var(--warn);opacity:${f1(rupt*(1-ramp(h,12,40)))}">cathepsin B</text>`}
    // K+ efflux
    if(kef>0){const [kx,ky]=mp(L.kA),kd=[Math.cos(L.kA),Math.sin(L.kA)],ko=1-ramp(h,24,72);
      for(let k=0;k<6;k++){const p=clamp(kef*1.6-k*.12);if(p<=0)continue;const ox=kx-kd[0]*24+kd[0]*60*p+(k%3-1)*8*kd[1],oy=ky-kd[1]*24+kd[1]*60*p-(k%3-1)*8*kd[0];
        s+=`<circle cx="${f1(ox)}" cy="${f1(oy)}" r="6" style="fill:var(--panel);stroke:var(--sea);stroke-width:1.4;opacity:${f1(ko)}"/><text x="${f1(ox)}" y="${f1(oy+3)}" class="t-xs t-mid" style="fill:var(--sea);font-size:7.5px;opacity:${f1(ko)}">K⁺</text>`}
      const [klx,kly]=L.kLab||[kx+kd[0]*50,ky+kd[1]*50-14];s+=`<text x="${f1(klx)}" y="${f1(kly)}" class="t-xs ${N?'t-end':''}" style="${HALO}fill:var(--sea);opacity:${f1(kef*ko)}">K⁺ efflux: the essential step</text><text x="${f1(klx)}" y="${f1(kly+12)}" class="t-xs ${N?'t-end':''}" style="${HALO}opacity:${f1(kef*ko*.8)}">ROS: not required</text>`}
    // NLRP3 – ASC speck – caspase-1
    const [spx,spy]=L.speck;
    if(asm>0){const so=asm*(1-.6*ramp(h,48,200));ASC.forEach(a=>{const rr=a.d*asm;s+=`<circle cx="${f1(spx+Math.cos(a.a)*rr)}" cy="${f1(spy+Math.sin(a.a)*rr)}" r="3.8" style="fill:var(--crocus);opacity:${f1(so*.9)}"/>`});
      s+=`<circle cx="${spx}" cy="${spy}" r="${f1(8*asm)}" style="fill:var(--terra-soft);stroke:var(--terra);stroke-width:1.5;opacity:${f1(so)}"/>`;
      for(let k=0;k<4;k++){const a=k/4*Math.PI*2+.4,rr=lerp(70,40,asm);s+=`<rect x="${f1(spx+Math.cos(a)*rr-6)}" y="${f1(spy+Math.sin(a)*rr-6)}" width="12" height="12" rx="3" style="fill:var(--terra);opacity:${f1(so)}"/>`}
      s+=` <text x="${spx+L.spDx}" y="${spy+L.spDy}" class="t-xs ${L.spDx?'':'t-mid'}" style="${HALO}opacity:${f1(so)}">NLRP3 speck</text><text x="${L.caspLab[0]}" y="${L.caspLab[1]}" class="t-xs t-end" style="${HALO}fill:var(--terra);opacity:${f1(so)}">caspase-1</text>`}
    // gasdermin D pores and IL-1β leaving toward the venule
    if(pore>0){L.pores.forEach(a=>{const [x,y]=mp(a);s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(6*pore)}" style="fill:var(--field);stroke:var(--terra);stroke-width:2"/>`});
      const [lx,ly]=mp(L.pores[0]);s+=`<text x="${f1(lx+(V.vert?10:-14))}" y="${f1(ly+(V.vert?-10:4))}" class="t-xs ${V.vert?'':'t-end'}" style="${HALO}fill:var(--terra);opacity:${f1(pore*(1-ramp(h,30,90)))}">gasdermin D pores</text>`}
    if(cut>0){const no=1-nets;ILD.forEach((d,k)=>{const [ppx,ppy]=mp(L.pores[k%3]),[wx,wy]=wp(.15+d.x*.7);const p=ease(clamp(il1*1.4-k*.06));
        const x=lerp(ppx,wx+wd[0]*(10+d.y*30),p),y=lerp(ppy,wy+wd[1]*(10+d.y*30),p);s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(4.5*cut)}" style="fill:var(--terra);opacity:${f1(cut*no)}"/>`});
      if(il1>.3&&nets<.6)s+=`<text x="${V.vert?V.x-8:V.x+V.w/2}" y="${V.vert?V.y+V.h/2-30:V.y-26}" class="t-xs ${V.vert?'t-end':'t-mid'}" style="${HALO}fill:var(--terra);opacity:${f1(il1*(1-nets))}">IL-1β → IL-1R on endothelium</text>`}
    // neutrophils
    NE.forEach((n,k)=>{const on=clamp((A-k/NE.length*.92)*5);if(on<=0)return;const z=n.b?L.nB:L.nA;
      const [wx,wy]=wp(n.w),tx2=lerp(z[0],z[2],n.tx),ty2=lerp(z[1],z[3],n.ty),p=ease(clamp(on*1.2));
      s+=neutro(lerp(wx,tx2,p)+Math.sin(u*60+n.ph*6)*2,lerp(wy,ty2,p)+Math.cos(u*50+n.ph*6)*2,9,clamp(on*2))});
    // aggregated NETs
    if(nets>0){L.nets.forEach(([cx2,cy2],c)=>{NETS[c].forEach(st=>{const x2=cx2+Math.cos(st.a)*st.l,y2=cy2+Math.sin(st.a)*st.l;
        s+=`<path d="M${cx2} ${cy2} Q${f1((cx2+x2)/2+st.c)} ${f1((cy2+y2)/2-st.c)} ${f1(x2)} ${f1(y2)}" style="fill:none;stroke:var(--nuc);stroke-width:1.4;opacity:${f1(.7*nets)}"/>`});
        for(let k=0;k<4;k++)s+=`<circle cx="${f1(cx2+Math.cos(k*1.7)*10)}" cy="${f1(cy2+Math.sin(k*1.7)*8)}" r="3" style="fill:var(--terra);opacity:${f1(.6*nets*(1-ramp(h,120,220)))}"/>`});
      const [lx,ly]=L.nets[0];s+=`<text x="${lx}" y="${ly+36}" class="t-xs t-mid" style="${HALO}fill:var(--nuc);opacity:${f1(nets)}">aggregated NETs trap cytokines</text>`}
    // TGF-β1
    if(tgf>0)s+=`<text x="${L.tgf[0]}" y="${L.tgf[1]}" class="t-xs t-mid" style="${HALO}fill:var(--sea);font-weight:700;opacity:${f1(tgf)}">TGF-β1 released</text>`;
    // clock
    s+=`<text x="${L.time[0]}" y="${L.time[1]}" class="t-big ${N?'t-end':''}">${flFmt(h)}</text>`;
    // drug badges
    const D=FL_DRUG[drug];
    if(D){L.badges[drug].forEach(([bx,by,tx3,ty3],k)=>{const lab=D.lab[k]||D.lab[0],bw=lab.length*5.9+16,cxB=clamp(bx,4,sw-bw-4);
      const ax=cxB+bw/2,ay=by+10,ang=Math.atan2(ty3-ay,tx3-ax),pxp=-Math.sin(ang)*7,pyp=Math.cos(ang)*7;
      s+=`<line x1="${f1(ax)}" y1="${f1(ay)}" x2="${tx3}" y2="${ty3}" style="stroke:${D.c};stroke-width:2.2"/><line x1="${f1(tx3-pxp)}" y1="${f1(ty3-pyp)}" x2="${f1(tx3+pxp)}" y2="${f1(ty3+pyp)}" style="stroke:${D.c};stroke-width:3.4;stroke-linecap:round"/>`;
      s+=`<circle cx="${tx3}" cy="${ty3}" r="15" style="fill:none;stroke:${D.c};stroke-width:1.6;stroke-dasharray:3 3"/>`;
      s+=`<rect x="${f1(cxB)}" y="${by}" width="${f1(bw)}" height="20" rx="10" style="fill:${D.bg};stroke:${D.c};stroke-width:1.4"/><text x="${f1(ax)}" y="${by+14}" class="t-xs t-mid" style="fill:${D.c};font-weight:700">${lab}</text>`})}
    // ---- lanes: pain and CRP, the first day stretched ----
    const G=L.lanes,ux=v=>lerp(G.x0,G.x1,v);
    [[0,48,'SF phase I'],[48,96,'II'],[96,168,'III']].forEach(([a,b,l],k)=>{const x0=ux(flU(a)),x1=ux(flU(b));
      s+=`<rect x="${f1(x0)}" y="${G.p0-4}" width="${f1(x1-x0)}" height="${G.c1-G.p0+4}" style="fill:var(--panel-2);opacity:${k%2?.9:.5}"/><text x="${f1((x0+x1)/2)}" y="${G.c1-4}" class="t-xs t-mid">${l}</text>`});
    if(drug==='colch'){const x1=ux(flU(12));s+=`<rect x="${G.x0}" y="${G.p0-4}" width="${f1(x1-G.x0)}" height="${G.c1-G.p0+4}" style="fill:var(--crocus-soft);opacity:.55"/><text x="${f1(x1-3)}" y="${G.p0+8}" class="t-xs t-end" style="fill:var(--crocus)">start within 12 h</text>`}
    const lane=(y0,y1,fn,col,title)=>{let q=`<text x="${G.x0}" y="${y0-8}" class="t-sm" style="fill:${col}">${title}</text><line x1="${G.x0}" x2="${G.x1}" y1="${y1}" y2="${y1}" class="axis"/>`;
      q+=`<path d="${pathFn(v=>fn(flH(v)),G.x0,G.x1,y1,y0)}" style="fill:none;stroke:${col};stroke-width:1.2;opacity:.35"/>`;
      q+=`<path d="${pathFn(v=>v<=u?fn(flH(v)):NaN,G.x0,G.x1,y1,y0).replace(/[ML][^ML]*NaN[^ML]*/g,'')}" style="fill:none;stroke:${col};stroke-width:3"/>`;
      return q+`<circle cx="${f1(ux(u))}" cy="${f1(lerp(y1,y0,fn(h)))}" r="5" style="fill:${col}"/>`};
    s+=lane(G.p0,G.p1,x=>FL_PAIN(x)/10,'var(--terra)','PAIN 0–10 · schematic, untreated');
    s+=lane(G.c0,G.c1,FL_CRP,'var(--warn)','CRP · schematic shape');
    const x24=ux(.5);s+=`<line x1="${f1(x24)}" x2="${f1(x24)}" y1="${G.p0-6}" y2="${G.c1}" style="stroke:var(--terra);stroke-width:1;stroke-dasharray:3 3"/><text x="${f1(x24+4)}" y="${G.p0+4}" class="t-xs" style="fill:var(--terra)">max pain &lt; 24 h</text>`;
    G.ticks.forEach(([hh,l],k)=>{const x=ux(flU(hh));s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${G.c1}" y2="${G.c1+4}" class="axis"/><text x="${f1(x)}" y="${G.tick}" class="t-xs ${k===0?'':k===G.ticks.length-1?'t-end':'t-mid'}">${l}</text>`});
    s+=`<text x="${G.x0}" y="${G.foot}" class="t-xs" style="fill:var(--warn)">${N?'TEACHING SKETCH · first 24 h stretched':'TEACHING SKETCH · hour boundaries schematic · first 24 h stretched'}</text>`;
    s+=`<line x1="${f1(ux(u))}" x2="${f1(ux(u))}" y1="${G.p0-6}" y2="${G.c1}" style="stroke:var(--ink);stroke-width:1;opacity:.3"/>`;
    svg.innerHTML=s;
    const p=phaseOf(FL_STEPS,u);setSt(p);
    const nst=A<.05?(h>100?'cleared':'few'):A<.5?(h<48?'arriving':'leaving'):'flood';
    $('#flRead').innerHTML=`<span>time <b>${flFmt(h)}</b></span><span>pain <b>${f1(FL_PAIN(h))}</b>/10</span><span>CRP <b>${Math.round(FL_CRP(h)*100)}%</b> of peak</span><span>neutrophils <b>${nst}</b></span>`;
    $('#flNote').innerHTML=noteHTML(FL_STEPS[p])+(D?`<div class="kv"><div><dt>Where ${D.w} acts</dt><dd>${D.txt}</dd></div></div>`:'');
  }
  const stop=playWire(rg,$('#flPlay'),draw,24000,'Replay','flare');
  const setSt=stepWire($('#flSteps'),FL_STEPS,rg,draw,stop);
  $$('[data-fld]').forEach(b=>b.onclick=()=>{drug=b.dataset.fld;$$('[data-fld]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)});
  draw(+rg.value);

  /* ---- night-time onset (Choi 2015) ---- */
  (function clock(){const el=$('#flClock'),cx=110,cy=150;let s='';
    const sec=[[0,8,733,'00:00–07:59','733 flares · OR 2.36',1],[8,16,310,'08:00–15:59','310 flares · ref.',.3],[16,24,390,'16:00–23:59','390 flares · OR 1.26',.55]];
    const pt=(hh,rr)=>{const a=(-90+hh*15)*Math.PI/180;return[cx+Math.cos(a)*rr,cy+Math.sin(a)*rr]};
     s+=`<circle cx="${cx}" cy="${cy}" r="88" style="fill:none;stroke:var(--line);stroke-dasharray:2 4"/>`;
    sec.forEach(([a,b,n,l1,l2,o],k)=>{const rr=88*Math.sqrt(n/733),[x0,y0]=pt(a,rr),[x1,y1]=pt(b,rr);
      s+=`<path d="M${cx} ${cy} L${f1(x0)} ${f1(y0)} A${f1(rr)} ${f1(rr)} 0 0 1 ${f1(x1)} ${f1(y1)}Z" style="fill:var(--terra);opacity:${o};stroke:var(--panel);stroke-width:2"/>`;
      const ly=86+k*56;s+=`<rect x="220" y="${ly-10}" width="12" height="12" rx="3" style="fill:var(--terra);opacity:${o}"/><text x="238" y="${ly}" class="t-sm">${l1}</text><text x="238" y="${ly+15}" class="t-xs">${l2}</text>`});
    [[0,'midnight'],[6,'6'],[12,'noon'],[18,'18']].forEach(([hh,l])=>{const [x,y]=pt(hh,100);s+=`<text x="${f1(x)}" y="${f1(y+3)}" class="t-xs t-mid">${l}</text>`});
    s+=`<text x="0" y="14" class="t-xs">START OF 1,433 FLARES BY CLOCK TIME</text>`;
    el.innerHTML=s})();

  /* ---- serum urate during vs between flares (Urano 2002) ---- */
  (function ur(){const el=$('#flUrate');let s='';const yv=v=>lerp(240,50,v/10);
    s+=`<text x="0" y="14" class="t-xs">MEAN SERUM URATE, mg/dL</text>`;
    [0,2,4,6,8,10].forEach(v=>s+=`<line x1="30" x2="176" y1="${f1(yv(v))}" y2="${f1(yv(v))}" class="grid"/><text x="24" y="${f1(yv(v)+3)}" class="t-xs t-end">${v}</text>`);
    [[48,8.5,.9,'between','506 µmol/L',.9],[112,7.5,1.4,'during','446 µmol/L',.55]].forEach(([x,v,sd,l,mm,o])=>{
      s+=`<rect x="${x}" y="${f1(yv(v))}" width="46" height="${f1(yv(0)-yv(v))}" rx="4" style="fill:var(--gold);opacity:${o}"/>`;
      s+=`<line x1="${x+23}" x2="${x+23}" y1="${f1(yv(v+sd))}" y2="${f1(yv(v-sd))}" style="stroke:var(--ink);stroke-width:1.4"/><line x1="${x+17}" x2="${x+29}" y1="${f1(yv(v+sd))}" y2="${f1(yv(v+sd))}" style="stroke:var(--ink);stroke-width:1.4"/><line x1="${x+17}" x2="${x+29}" y1="${f1(yv(v-sd))}" y2="${f1(yv(v-sd))}" style="stroke:var(--ink);stroke-width:1.4"/>`;
      s+=`<text x="${x+23}" y="${f1(yv(v+sd)-6)}" class="t-lbl t-mid">${v}</text><text x="${x+23}" y="256" class="t-sm t-mid">${l}</text><text x="${x+23}" y="270" class="t-xs t-mid">${mm}</text>`});
    s+=`<line x1="30" x2="176" y1="${f1(yv(6.8))}" y2="${f1(yv(6.8))}" style="stroke:var(--xtal);stroke-width:1.6;stroke-dasharray:6 4"/><text x="30" y="286" class="t-xs" style="fill:var(--xtal)">dashed line: 6.8 mg/dL saturation</text>`;
    s+=`<text x="200" y="40" class="t-xs">41 PEOPLE DURING A FLARE</text>`;
    for(let k=0;k<41;k++){const x=208+(k%7)*20,y=60+Math.floor(k/7)*22;s+=`<circle cx="${x}" cy="${y}" r="7" style="fill:${k<20?'var(--sea)':'var(--panel-2)'};stroke:${k<20?'var(--sea)':'var(--line)'}"/>`}
    s+=`<text x="200" y="210" class="t-sm" style="fill:var(--sea)">normal urate: 20 of 41</text><text x="200" y="226" class="t-sm" style="fill:var(--sea)">(49%)</text>`;
    el.innerHTML=s})();

  $('#flCards').innerHTML=`
   <div class="card"><span class="ev hyp">Open question</span><h4>Is NLRP3 itself required?</h4><p>Macrophages lacking inflammasome parts fail to activate IL-1β with MSU crystals [[Martinon2006]]. Yet with MSU plus a free fatty acid, IL-1β release needed ASC and caspase-1 but not NLRP3 [[Joosten2010]], and neutrophil and mast cell proteases can also process IL-1β [[Busso2010]]. The IL-1β and IL-1 receptor step is firmly established [[Chen2006,So2007]].</p></div>
   <div class="card"><span class="ev hyp">Open question</span><h4>Do TLRs see the crystals?</h4><p>TLR2 and TLR4 and CD14 contribute in some models [[Busso2010,Joosten2010]]. In another, mice lacking various TLRs had normal neutrophil influx, and none of TLR1–11 responded to MSU in reporter cells [[Chen2006]]. The animation draws TLR2/4 because the fatty-acid signal used TLR2.</p></div>
   <div class="card"><h4>Animal clocks, human clocks</h4><ul><li>Mouse air pouch: neutrophils at 4 h depend on CXCR2 ligands [[Busso2010]].</li><li>Rabbit: blocking IL-8 stops the later influx at 24 h [[Busso2010]].</li><li>Human skin blisters: TNF but no TGF-β1 at 16 h, TGF-β1 at 40 h [[Yagnik2004]].</li><li>Human synovial fluid: phases at 0–48 h, days 3–4 and days 5–7 [[Scanu2012]].</li></ul></div>
   <div class="card"><h4>More players</h4><p>MSU activates the classical complement pathway, amplified by CRP and IgG, and the alternative pathway, with C5a made by a convertase that forms on the crystal surface [[Busso2010]]. In mice, mast-cell IL-1β adds to swelling early in MSU arthritis <span class="ev early">Early evidence</span> [[Reber2014]].</p></div>
   <div class="card"><h4>Is this a flare?</h4><p>For people already diagnosed, a validated rule calls it a flare when at least 3 of 4 are present: the person says it is a flare, pain at rest above 3 out of 10, at least one swollen joint, and at least one warm joint. It had 85% sensitivity and 95% specificity in 509 patients [[Gaffo2018]].</p></div>
   <div class="card"><h4>After the flare: the tophus</h4><p>Tophi share features with aggregated NETs [[Schauer2014]]. In surgically removed tophi, the corona zone held many macrophage-lineage cells and large numbers of IL-1β-expressing cells, a cycle of chronic inflammation, attempted resolution and remodelling [[Dalbeth2010]]. See <a href="#crystals" data-go="crystals">Crystals vs serum urate</a> for how they dissolve.</p></div>`;
};
