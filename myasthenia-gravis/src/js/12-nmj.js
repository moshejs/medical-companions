/* =============== 1.2 The neuromuscular junction =============== */
const NMJ_STEPS=[
 {from:0,at:.05,k:'Step 1 · Arrival',t:'The action potential reaches the terminal',
  txt:'The motor axon ends in fine branches with swellings (boutons) usually 1–5 µm across. Inside are synaptic vesicles about 50 nm wide, clustered at dense active zones in the membrane that faces the muscle. [[Slater2017]] The active zones line up with the openings of the folds below, so transmitter is released opposite the receptor-rich crests. [[Slater2017]]',
  pt:'An electrical signal runs down the nerve to its tip, where packets of a chemical messenger wait.',
  mg:'The attack in MG is on the muscle side: the antibodies target proteins of the postsynaptic membrane. [[Gilhus2019]]'},
 {from:.12,at:.17,k:'Step 2 · Calcium',t:'P/Q-type calcium channels open',
  txt:'Depolarisation opens voltage-gated calcium channels. Calcium floods in and triggers near-simultaneous release of a number of quanta. [[Slater2017]] At the normal human junction these channels are P/Q-type (CaV2.1): P-type blockers stopped transmission in human muscle, while L-type and N-type blockers did not. [[Protti1996]]',
  pt:'The signal opens calcium gates in the nerve tip. Calcium is the trigger for release.',
  hook:'Presynaptic or postsynaptic? Lambert-Eaton syndrome is the presynaptic disease, with P/Q-type calcium-channel antibodies in 91–100% of patients. [[Lennon1995]] MG is postsynaptic. See <a href="#ddx" data-go="ddx">The differential</a>.'},
 {from:.24,at:.31,k:'Step 3 · Release',t:'Vesicles fuse: quanta of ACh',
  txt:'Each vesicle holds one quantum of about 10,000 ACh molecules; an independent estimate puts it below 10,000. [[Slater2017,Kuffler1975]] A human nerve impulse releases only about 20–30 quanta, the fewest known among the vertebrates studied (mouse: 50–100). [[Slater2017]] Between impulses, single vesicles fuse about once a second, each giving a miniature endplate potential (mEPP) of about 1 mV: the inset on the trace. [[Slater2017]]',
  pt:'Each packet holds about ten thousand messenger molecules. One impulse empties a few dozen packets.',
  mg:'Release is turned up in MG: quantal content was considerably raised in MG muscle, most at the endplates with the smallest mEPPs. [[Plomp1995]]',
  hook:'One quantum = one vesicle ≈ 10,000 ACh ≈ one mEPP of about 1 mV. Human quantal content ≈ 20–30. [[Slater2017]]'},
 {from:.38,at:.44,k:'Step 4 · Binding',t:'Two ACh open each receptor',
  txt:'ACh diffuses across a cleft about 50–100 nm wide. On the fold crests, receptors are packed at about 10,000 per µm². [[Slater2017,Gautam1995]] Each receptor has two ACh sites and needs both filled to open: dose-response curves have a limiting Hill slope of two. [[Sine2012]] An open channel stays open about 1 ms and lets cations in. [[Slater2017]]',
  pt:'The messenger drifts across the gap. Each catcher needs two molecules before it opens.',
  mg:'MG deltoid had 0.7 × 10⁷ receptors per junction against 2.1 × 10⁷ in controls, about a third. [[Pestronk1985]] MG mEPPs were 53% of control. [[Ruff2008]]',
  hook:'Two ACh per receptor, at the α–δ and α–ε interfaces (α–γ in the fetal receptor). [[Sine2012]]'},
 {from:.52,at:.585,k:'Step 5 · Endplate potential',t:'Depolarisation crosses threshold',
  txt:'Many receptors opening together depolarise the endplate: the endplate potential (EPP). When it crosses threshold, NaV1.4 channels packed in the fold troughs fire a muscle action potential that spreads along the fibre. [[Slater2017,Flucher1989]] In control human muscle the endplate needed 13.5 mV of depolarisation to fire, 11.8 mV less than membrane away from the junction, because of those trough Na⁺ channels. [[Ruff2008]]',
  pt:'When enough catchers open, the muscle membrane tips past its trigger point and the fibre fires.',
  mg:'MG endplates needed 21.6 mV to fire, because endplate Na⁺ current had fallen to about 60% of control along with the folds that carry the channels. [[Ruff2008,Ruff1998]] MG EPPs were 58% of control, so the EPP only just reaches the higher threshold. [[Ruff2008]]'},
 {from:.66,at:.71,k:'Step 6 · Clean-up',t:'AChE clears ACh in under a millisecond',
  txt:'ACh unbinds and acetylcholinesterase (AChE), held in the basal lamina by its collagen tail ColQ, splits it. [[Slater2017,Feng1999]] ACh is gone from the cleft in under a millisecond, while the depolarisation fades over several more. [[Sine2012]] The choline is taken back into the terminal and made into new ACh. [[Slater2017]]',
  pt:'A clean-up enzyme chops the messenger within a millisecond, so each signal is short and sharp.',
  mg:'Inhibit the enzyme and quanta overlap and add up, prolonging the synaptic current. [[Hartzell1976]] That is how a cholinesterase inhibitor such as pyridostigmine helps: see <a href="#pyrido" data-go="pyrido">Pyridostigmine, animated</a>. [[FDAMestinon2020]]'},
 {from:.80,at:.92,k:'Step 7 · Safety factor',t:'A healthy EPP is about three times threshold',
  txt:'The safety factor is the EPP divided by E_AP, the depolarisation needed to reach threshold. In human intercostal muscle it was 2.98 in controls. [[Ruff2008]] Reviews give the normal margin as 2–4 times, 3–5, or 4–5 times what is needed. [[Slater2017,Wood2001,Kouyoumdjian2023]]',
  pt:'A healthy junction makes about three times the signal it needs. That spare is the safety margin.',
  mg:'In MG it was 1.09, 37% of control; loss of Na⁺ current accounted for 40% of the drop. [[Ruff2008]] Human MG endplates show the EPP directly, because many EPPs fail to reach threshold. [[Slater2017]]',
  hook:'SF = EPP ÷ E_AP. Healthy ≈ 3 (2.98); MG ≈ 1 (1.09). Fewer AChRs shrink the EPP and fewer trough Na⁺ channels raise the threshold. [[Ruff2008]]'}
];
const NMJ_LATE='Later in a train, quantal content and the EPP fall as the ready-to-release vesicle store runs down; healthy EPPs stay above threshold. [[Slater2017,Kouyoumdjian2023]] With a thin margin the EPP drops below threshold and that fibre fails. [[Sine2012]] The 20% fall drawn here is illustrative, not a measured value.';
/* the measured numbers behind the trace (Ruff & Lennon 2008, human intercostal): threshold depolarisation and safety factor;
   EPP amplitude = SF × threshold (derived). Resting potential about −75 mV (Slater 2017). */
const NMJ_V={rest:-75,h:{thr:13.5,sf:2.98},m:{thr:21.6,sf:1.09},late:.8};
/* slow-motion clock: t (0..1) to real time in ms on the trace */
const NMJ_TK=[0,.24,.38,.52,.66,.80,1], NMJ_MS=[-.6,-.1,.18,.27,1.0,1.8,7];
function nmjPw(x,X,Y){if(x<=X[0])return Y[0];for(let i=0;i<X.length-1;i++)if(x<=X[i+1])return lerp(Y[i],Y[i+1],(x-X[i])/(X[i+1]-X[i]));return Y[Y.length-1]}
const NMJ_T0=.2,NMJ_TR=.32,NMJ_TD=1.6;
const nmjRaw=u=>u<=0?0:(1-Math.exp(-u/NMJ_TR))*Math.exp(-u/NMJ_TD);
const NMJ_UPK=-NMJ_TR*Math.log(NMJ_TR/(NMJ_TR+NMJ_TD)),NMJ_FPK=nmjRaw(NMJ_UPK);
const nmjF=ms=>nmjRaw(ms-NMJ_T0)/NMJ_FPK;          // 0..1, peak 1 at about 0.77 ms
const nmjAP=u=>u<=0?0:u<.15?u/.15:Math.max(0,1-(u-.15)/.85);
/* the AChE glyph: a small enzyme on the basal lamina */
function nmjAche(x,y,o=1){return `<g transform="translate(${f1(x)} ${f1(y)})" style="opacity:${(+o).toFixed(2)}"><path d="M0 0L4.2 -2.4A4.8 4.8 0 1 0 4.2 2.4Z" style="fill:var(--muted)"/><path d="M-3 3.5V7" style="stroke:var(--muted);stroke-width:1.2"/></g>`}
function nmjNav(x,y,o=1,glow=0){return `${glow>0?`<rect x="${f1(x-4)}" y="${f1(y-5)}" width="8" height="10" rx="3" style="fill:none;stroke:var(--nerve);stroke-width:2;opacity:${f1(glow)}"/>`:''}<rect x="${f1(x-2)}" y="${f1(y-3)}" width="4" height="6" rx="1" style="fill:var(--nerve);opacity:${(+o).toFixed(2)}"/>`}

inits.nmj=()=>{
  const svg=$('#nmSvg'),rg=$('#nmT');
  let mg=false,late=false,qc=false;
  const LW={W:720,H:460,lx:8,jx0:112,jx1:446,topY:62,preY:172,postY:206,mBot:350,D:96,nf:5,
     leg:{x:[8,158,308],y:[384,410]},
     tr:{tl:470,ty:22,x0:522,x1:708,y0:56,y1:288},sf:{x:470,y:318,w:240,k:3.4}};
  const LN={W:400,H:892,lx:6,jx0:96,jx1:392,topY:62,preY:172,postY:206,mBot:350,D:96,nf:4,
     leg:{x:[6,204],y:[382,404,426]},
     tr:{tl:12,ty:468,x0:56,x1:388,y0:500,y1:712},sf:{x:12,y:748,w:376,k:6}};
  const geoCache={};
  function geo(L,key){
    if(geoCache[key])return geoCache[key];
    const span=L.jx1-L.jx0,fc=[];for(let i=0;i<L.nf;i++)fc.push(L.jx0+(i+.5)*span/L.nf);
    const sw=14,segs=[[L.jx0,fc[0]-sw/2]];
    for(let i=0;i<L.nf-1;i++)segs.push([fc[i]+sw/2,fc[i+1]-sw/2]);
    segs.push([fc[L.nf-1]+sw/2,L.jx1]);
    const rec=[];segs.forEach(([a,b])=>{const w=b-a,n=Math.max(1,Math.floor((w+6)/15)),c=(a+b)/2;for(let j=0;j<n;j++)rec.push(c+(j-(n-1)/2)*15)});
    const ache=[];fc.forEach(x=>{ache.push(x-24,x+24)});
    const near=x=>{let b=0;fc.forEach((f,i)=>{if(Math.abs(f-x)<Math.abs(fc[b]-x))b=i});return b};
    const nearA=x=>ache.reduce((p,a)=>Math.abs(a-x)<Math.abs(p-x)?a:p,ache[0]);
    const r=rng(41),dots=[];
    rec.forEach((x,k)=>{const az=near(x);for(let s=0;s<2;s++){const t0=.29+r()*.03;dots.push({az,rk:k,sx:fc[az]+(r()-.5)*10,tx:x+(s?2.4:-2.4),t0,t1:t0+.07+r()*.03,tu:.58+r()*.05,ax:nearA(x+(s?6:-6)),m1:t0+.08+r()*.05})}});
    fc.forEach((f,az)=>{for(let s=0;s<3;s++){const t0=.29+r()*.03,tx=f+(r()-.5)*40;dots.push({az,rk:-1,sx:f+(r()-.5)*10,tx,t0,t1:t0+.05+r()*.04,ax:nearA(tx)})}});
    const res=[];for(let i=0;i<13;i++)res.push({x:lerp(L.jx0+16,L.jx1-16,(i+r()*.6)/13),y:lerp(118,144,r())});
    const ca=[];fc.forEach(f=>[-13,13].forEach(d=>{for(let s=0;s<3;s++)ca.push({x:f+d,dx:(r()-.5)*14,t0:.13+r()*.05})}));
    return geoCache[key]={fc,rec,ache,dots,res,ca,span};
  }
  function trace(){ // amplitude, threshold, crossing
    const v=mg?NMJ_V.m:NMJ_V.h,thr=v.thr,A=v.sf*thr*(late?NMJ_V.late:1),fires=A>=thr;
    let tc=null;if(fires){for(let ms=NMJ_T0;ms<=NMJ_T0+NMJ_UPK+.01;ms+=.002)if(A*nmjF(ms)>=thr){tc=ms;break}}
    return {thr,A,fires,tc,tF:tc==null?null:nmjPw(tc,NMJ_MS,NMJ_TK),sf:A/thr};
  }
  function draw(t){
    const N=vb(svg,'720 460','400 892'),L=N?LN:LW,G=geo(L,N?'n':'w'),TR=trace();
    const ms=nmjPw(t,NMJ_TK,NMJ_MS),mid=(L.jx0+L.jx1)/2,blY=183;
    const axX=mid;
    const emptyAZ=late?1:-1;
    let s=`<defs>${marker('nmAr','var(--nerve)')}<clipPath id="nmClip"><rect x="${L.tr.x0}" y="${L.tr.y0}" width="${L.tr.x1-L.tr.x0}" height="${L.tr.y1-L.tr.y0}"/></clipPath></defs>`;
    /* ---- left labels ---- */
    const lab=(y,a,b,tx,ty)=>`<text x="${L.lx}" y="${y}" class="t-xs" style="fill:var(--ink);font-weight:600">${a}</text><text x="${L.lx}" y="${y+11}" class="t-xs">${b}</text><path d="M${L.jx0-30} ${y+3}L${f1(tx)} ${f1(ty)}" style="stroke:var(--line);stroke-width:1;fill:none"/>`;
    s+=lab(114,'NERVE','TERMINAL',L.jx0+2,120);
    s+=lab(180,'CLEFT','50–100 nm',L.jx0+3,189);
    s+=lab(222,'CREST','AChR',G.rec[0]-6,204);
    const fd=mg?L.D*.36:L.D;
    s+=lab(266,'TROUGH','NaV1.4',G.fc[0]-8,L.postY+fd*.75);
    s+=`<text x="${L.lx}" y="${L.mBot-24}" class="t-xs" style="fill:var(--ink);font-weight:600">MUSCLE</text><text x="${L.lx}" y="${L.mBot-13}" class="t-xs">FIBRE</text>`;
    /* ---- muscle, folds, troughs ---- */
    const epp=TR.A*nmjF(ms),eppFrac=clamp(epp/40);
    s+=`<rect x="${L.jx0-6}" y="${L.postY}" width="${L.jx1-L.jx0+12}" height="${L.mBot-L.postY}" rx="6" style="fill:var(--muscle)"/>`;
    if(eppFrac>.01)s+=`<ellipse cx="${f1(mid)}" cy="${L.postY+60}" rx="${f1(G.span*.5)}" ry="60" style="fill:var(--achr-soft);opacity:${f1(.9*eppFrac)}"/>`;
    s+=`<path d="M${L.jx0-6} ${L.postY}H${L.jx1+6}" style="stroke:var(--memb);stroke-width:2.4"/>`;
    const glow=TR.fires?bump(t,TR.tF,TR.tF+.12):0;
    G.fc.forEach((x,i)=>{
      if(mg&&i%2)return;
      const w=mg?12:14,d=fd;
      s+=`<path d="M${f1(x-w/2)} ${L.postY-1.2}V${f1(L.postY+d-w/2)}Q${f1(x-w/2)} ${f1(L.postY+d)} ${f1(x)} ${f1(L.postY+d)}Q${f1(x+w/2)} ${f1(L.postY+d)} ${f1(x+w/2)} ${f1(L.postY+d-w/2)}V${L.postY-1.2}" style="fill:var(--field);stroke:var(--memb);stroke-width:1.6"/>`;
      (mg?[.62]:[.48,.7,.9]).forEach(fr=>{const y=L.postY+d*fr;s+=nmjNav(x-w/2-2.4,y,1,glow)+nmjNav(x+w/2+2.4,y,1,glow)});
    });
    /* muscle action potential spreading, or failure */
    if(TR.fires&&t>=TR.tF){const p=ease(ramp(t,TR.tF,TR.tF+.16)),y=L.mBot-30,hw=G.span/2+2;
      s+=`<path d="M${f1(mid-hw*p)} ${y}H${f1(mid+hw*p)}" style="stroke:var(--nerve);stroke-width:3;opacity:${f1(1-.4*p)}"/>`;
      if(p>.05)s+=`<path d="M${f1(mid)} ${y}H${f1(mid+hw*p)}" style="stroke:none;fill:none" marker-end="url(#nmAr)"/><path d="M${f1(mid)} ${y}H${f1(mid-hw*p)}" style="stroke:none;fill:none" marker-end="url(#nmAr)"/>`;
      s+=`<text x="${f1(mid)}" y="${L.mBot-12}" class="t-xs t-mid" style="fill:var(--nerve);opacity:${f1(ramp(t,TR.tF,TR.tF+.04))}">muscle action potential spreads along the fibre</text>`}
    else if(!TR.fires&&t>.6)s+=`<text x="${f1(mid)}" y="${L.mBot-14}" class="t-sm t-mid" style="fill:var(--ab);opacity:${f1(ramp(t,.6,.64))}">EPP below threshold: no action potential</text>`;
    /* ---- nerve terminal ---- */
    const term=`M${L.jx0} ${L.preY}V${L.topY+34}Q${L.jx0} ${L.topY} ${L.jx0+34} ${L.topY}H${f1(axX-13)}V2H${f1(axX+13)}V${L.topY}H${L.jx1-34}Q${L.jx1} ${L.topY} ${L.jx1} ${L.topY+34}V${L.preY}Z`;
    s+=`<path d="${term}" style="fill:var(--nerve-soft);stroke:var(--nerve);stroke-width:2"/>`;
    const fl=bump(t,.07,.17);if(fl>.02)s+=`<path d="${term}" style="fill:none;stroke:var(--nerve);stroke-width:5;opacity:${f1(fl*.8)}"/>`;
    if(t<.11){const y=lerp(4,L.topY+6,ease(ramp(t,0,.09)));s+=`<ellipse cx="${f1(axX)}" cy="${f1(y)}" rx="11" ry="9" style="fill:var(--nerve);opacity:${f1(1-ramp(t,.08,.11))}"/>`}
    s+=`<text x="${f1(axX+20)}" y="16" class="t-xs">motor axon</text>`;
    if(t<.16)s+=`<text x="${f1(axX+20)}" y="30" class="t-xs" style="fill:var(--nerve);opacity:${f1(1-ramp(t,.12,.16))}">action potential ↓</text>`;
    /* reserve vesicles */
    G.res.forEach((v,i)=>{if(late&&i%3===0)return;s+=vesicle(v.x,v.y,7,.9,4)});
    /* active zones, Ca channels */
    const caOpen=bump(t,.12,.3);
    G.fc.forEach(x=>{s+=`<rect x="${f1(x-8)}" y="${L.preY-3}" width="16" height="3" style="fill:var(--nerve);opacity:.75"/>`;
      [-13,13].forEach(d=>{const g=1+2.4*caOpen;s+=`<rect x="${f1(x+d-g-3)}" y="${L.preY-6}" width="3" height="12" rx="1" style="fill:var(--nuc)"/><rect x="${f1(x+d+g)}" y="${L.preY-6}" width="3" height="12" rx="1" style="fill:var(--nuc)"/>`})});
    G.ca.forEach(c=>{const p=ramp(t,c.t0,c.t0+.07);if(p<=0||t>.34)return;const o=1-ramp(t,.27,.34);
      s+=`<circle cx="${f1(c.x+c.dx*p)}" cy="${f1(lerp(L.preY+9,L.preY-24,ease(p)))}" r="2.2" style="fill:var(--nuc);opacity:${f1(o)}"/>`});
    /* docked vesicles fuse */
    G.fc.forEach((x,az)=>{
      if(az===emptyAZ){s+=`<text x="${f1(x)}" y="${L.preY-8}" class="t-xs t-mid" style="fill:var(--ab)">empty</text>`;return}
      const dn=ease(ramp(t,.24,.28)),fu=ramp(t,.27,.32);
      if(fu<1)s+=vesicle(x,lerp(L.preY-14,L.preY-9,dn),8,1-fu,5);
      const om=bump(t,.27,.36);if(om>.02)s+=`<path d="M${f1(x-7)} ${L.preY}Q${f1(x)} ${L.preY-13*om} ${f1(x+7)} ${L.preY}" style="fill:var(--vesicle);stroke:var(--ach);stroke-width:1.2;opacity:${f1(om)}"/>`;
      /* a reserve vesicle moves in to refill the site */
      const rf=ease(ramp(t,.4,.62));if(t>.4&&!(late))s+=vesicle(lerp(x+(az%2?16:-16),x,rf),lerp(L.preY-34,L.preY-14,rf),8,.85,5);
    });
    /* ---- cleft: basal lamina + AChE ---- */
    s+=`<path d="M${L.jx0} ${blY}H${L.jx1}" style="stroke:var(--line);stroke-width:1.4;stroke-dasharray:3 3"/>`;
    G.ache.forEach(x=>s+=nmjAche(x,blY,1));
    /* ---- receptors ---- */
    const have=k=>!mg||k%3===0;
    const dotFate=d=>{if(d.az===emptyAZ)return 'none';if(d.rk>=0&&have(d.rk))return 'bind';return 'ache'};
    const recOpen=G.rec.map(()=>[]);
    G.dots.forEach(d=>{if(dotFate(d)==='bind')recOpen[d.rk].push(d)});
    G.rec.forEach((x,k)=>{if(!have(k))return;const ds=recOpen[k];let op=0;
      if(ds.length===2){const a=Math.min(ramp(t,ds[0].t1-.008,ds[0].t1+.008),ramp(t,ds[1].t1-.008,ds[1].t1+.008)),tu=Math.min(ds[0].tu,ds[1].tu);op=a*(1-ramp(t,tu,tu+.02))}
      s+=achr(x,L.postY,9,op,1);
      if(op>.5)for(let q=0;q<2;q++){const ph=(t*30+q*.5+k*.13)%1;s+=`<circle cx="${f1(x)}" cy="${f1(L.postY-8+ph*18)}" r="1.5" style="fill:var(--nerve);opacity:${f1(1-ph)}"/>`}});
    /* ---- ACh dots ---- */
    G.dots.forEach(d=>{const fate=dotFate(d);if(fate==='none'||t<d.t0)return;
      const sx=d.sx,sy=L.preY+2;let x,y,split=-1;
      if(fate==='bind'){const ty=L.postY-15;
        if(t<d.t1){const p=ease(ramp(t,d.t0,d.t1));x=lerp(sx,d.tx,p);y=lerp(sy,ty,p)+Math.sin(p*Math.PI)*3}
        else if(t<d.tu){x=d.tx;y=ty}
        else if(t<d.tu+.05){const p=ease(ramp(t,d.tu,d.tu+.05));x=lerp(d.tx,d.ax,p);y=lerp(ty,blY-1,p)}
        else{x=d.ax;y=blY-1;split=ramp(t,d.tu+.05,d.tu+.13)}}
      else{const t1=d.rk>=0?d.m1:d.t1;
        if(t<t1){const p=ease(ramp(t,d.t0,t1));x=lerp(sx,d.ax,p);y=lerp(sy,blY-1,p)}
        else{x=d.ax;y=blY-1;split=ramp(t,t1,t1+.08)}}
      if(split<0)s+=achDot(x,y,2.2,1);
      else if(split<1){s+=achDot(x-1-3*split,y+2*split,1.5,1-split)+`<circle cx="${f1(x+1+2*split)}" cy="${f1(lerp(y,L.preY-8,split))}" r="1.5" style="fill:var(--muted);opacity:${f1(1-split*.8)}"/>`}
    });
    if(t>.66&&t<.86)s+=`<text x="${L.jx0+12}" y="${L.topY+46}" class="t-xs" style="opacity:${f1(bump(t,.66,.86))}">choline taken back up ↑</text>`;
    /* ---- quanta counter ---- */
    if(qc){const nQ=late?20:25,k=Math.round(nQ*ramp(t,.25,.33)),nf=L.nf-(late?1:0);
      s+=`<text x="${L.jx1-10}" y="${L.topY+20}" class="t-sm t-end" style="fill:var(--ink)">quanta: ${k} of ~${nQ}${mg?' or more':''}</text>`;
      s+=`<text x="${L.jx1-10}" y="${L.topY+32}" class="t-xs t-end">${mg?'MG: release turned up':'≈'+(k*10000).toLocaleString('en-US')+' ACh ○ derived'} · slice shows ${nf}</text>`}
    /* ---- legend ---- */
    const LG=[[vesicle(0,-3,6,1,4),'vesicle = 1 quantum'],[achDot(0,-3,2.6),'ACh'],[`<circle cx="0" cy="-3" r="2.4" style="fill:var(--nuc)"/>`,'Ca²⁺ (P/Q channel)'],
      [achr(0,2,9,0,1),'AChR on crests'],[nmjNav(0,-3),'NaV1.4 in troughs'],[nmjAche(0,-3),'AChE (ColQ)']];
    LG.forEach((g,i)=>{const c=i%L.leg.x.length,r=Math.floor(i/L.leg.x.length),x=L.leg.x[c],y=L.leg.y[r];s+=`<g transform="translate(${x+8} ${y})">${g[0]}</g><text x="${x+22}" y="${y}" class="t-sm">${g[1]}</text>`});
    /* ---- the EPP trace ---- */
    const T=L.tr,X=m=>T.x0+(m+.6)/7.6*(T.x1-T.x0),Y=v=>T.y1-(v+80)/60*(T.y1-T.y0),rest=NMJ_V.rest,vThr=rest+TR.thr;
    s+=`<text x="${T.tl}" y="${T.ty}" class="t-sm" style="fill:var(--ink);font-weight:600">ENDPLATE POTENTIAL</text><text x="${T.x1}" y="${T.ty}" class="t-xs t-end" style="fill:${mg?'var(--ab)':'var(--achr)'}">${mg?'MG':'HEALTHY'}${late?' · LATER IMPULSE':''}</text>`;
    s+=`<text x="${T.tl}" y="${T.ty+14}" class="t-xs">shape schematic · ● published  ○ derived</text>`;
    [-80,-60,-40,-20].forEach(v=>{s+=`<path d="M${T.x0} ${f1(Y(v))}H${T.x1}" class="grid"/><text x="${T.x0-5}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v<0?'−'+(-v):v}${v===-20?' mV':''}</text>`});
    [0,2,4,6].forEach(m=>s+=`<text x="${f1(X(m))}" y="${T.y1+14}" class="t-xs t-mid">${m}${m===6?' ms':''}</text>`);
    s+=`<path d="M${T.x0} ${T.y0}V${T.y1}H${T.x1}" class="axis" style="fill:none"/>`;
    s+=`<path d="M${T.x0} ${f1(Y(rest))}H${T.x1}" style="stroke:var(--muted);stroke-width:1;stroke-dasharray:1 3"/><circle cx="${T.x0+4}" cy="${f1(Y(rest))}" r="3.2" style="fill:var(--ink)"/><text x="${T.x1-2}" y="${f1(Y(rest)+12)}" class="t-xs t-end">rest −75 mV</text>`;
    s+=`<path d="M${T.x0} ${f1(Y(vThr))}H${T.x1}" style="stroke:var(--warn);stroke-width:1.6;stroke-dasharray:5 4"/><circle cx="${T.x0+12}" cy="${f1(Y(vThr))}" r="3.2" style="fill:var(--warn)"/><text x="${T.x1-2}" y="${f1(Y(vThr)-5)}" class="t-xs t-end" style="fill:var(--warn)">threshold</text>`;
    const eppPath=(m1)=>{let d='';const n=160;for(let i=0;i<=n;i++){const m=lerp(-.6,m1,i/n);d+=(i?'L':'M')+f1(X(m))+' '+f1(Y(rest+TR.A*nmjF(m)))}return d};
    s+=`<path d="${eppPath(7)}" style="fill:none;stroke:var(--achr);stroke-width:1.4;stroke-dasharray:3 4;opacity:.35"/>`;
    s+=`<path d="${eppPath(Math.max(-.59,ms))}" style="fill:none;stroke:var(--achr);stroke-width:2.6;stroke-linejoin:round"/>`;
    if(TR.fires&&ms>TR.tc){let d='';const m1=Math.min(ms,TR.tc+1.05),n=80;for(let i=0;i<=n;i++){const m=lerp(TR.tc,m1,i/n),ve=rest+TR.A*nmjF(m),v=ve+(30-ve)*nmjAP(m-TR.tc);d+=(i?'L':'M')+f1(X(m))+' '+f1(Y(v))}
      s+=`<path d="${d}" clip-path="url(#nmClip)" style="fill:none;stroke:var(--nerve);stroke-width:2"/>`;
      if(ms>TR.tc+.9)s+=`<text x="${f1(X(TR.tc+.95))}" y="${T.y0+12}" class="t-xs" style="fill:var(--nerve)">AP ↑</text>`}
    const mPk=NMJ_T0+NMJ_UPK;
    if(ms>=mPk){const xp=X(mPk),yp=Y(rest+TR.A);s+=`<circle cx="${f1(xp)}" cy="${f1(yp)}" r="3.6" style="fill:var(--panel);stroke:var(--achr);stroke-width:2"/>${TR.fires?`<text x="${f1(xp+22)}" y="${f1(yp-10)}" class="t-xs" style="fill:var(--ink)">≈${f1(TR.A)} mV ○</text>`:`<text x="${f1(xp+22)}" y="${f1(Y(vThr)-18)}" class="t-xs" style="fill:var(--ab)">≈${f1(TR.A)} mV ○ · fails ✗</text>`}`}
    s+=`<path d="M${f1(X(ms))} ${T.y0}V${T.y1}" style="stroke:var(--muted);stroke-width:1;opacity:.45"/>`;
    /* mEPP inset */
    {const bx=T.x1-92,by=T.y0+4,bw=88,bh=36,amp=mg?.53:1;
      s+=`<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="6" style="fill:var(--panel);stroke:var(--line)"/><text x="${bx+6}" y="${by+11}" class="t-xs">mEPP ×10</text>`;
      let d='';for(let i=0;i<=40;i++){const u=i/40,m=u*4;d+=(i?'L':'M')+f1(bx+6+u*(bw-12))+' '+f1(by+bh-5-amp*16*nmjRaw(m-.4)/NMJ_FPK)}
      s+=`<path d="${d}" style="fill:none;stroke:var(--ach);stroke-width:1.8"/><circle cx="${f1(bx+6+(.4+NMJ_UPK)/4*(bw-12))}" cy="${f1(by+bh-5-amp*16)}" r="2.6" style="fill:var(--ach)"/><text x="${bx+bw-5}" y="${by+11}" class="t-xs t-end">${mg?'53%':'≈1 mV'}</text>`}
    /* ---- safety factor box ---- */
    {const B=L.sf,k=B.k,x=B.x,y=B.y,bx=x+44,eNow=ms>=NMJ_T0+NMJ_UPK?TR.A:Math.max(0,epp);
      s+=`<rect x="${x-6}" y="${y}" width="${B.w+8}" height="136" rx="10" style="fill:var(--panel-2)"/>`;
      s+=`<text x="${x}" y="${y+16}" class="t-sm" style="fill:var(--ink);font-weight:600">SAFETY FACTOR = EPP ÷ E_AP</text>`;
      s+=`<text x="${x}" y="${y+38}" class="t-xs">E_AP</text><rect x="${bx}" y="${y+30}" width="${f1(TR.thr*k)}" height="10" rx="3" style="fill:var(--warn)"/><text x="${f1(bx+TR.thr*k+5)}" y="${y+38}" class="t-xs">${TR.thr} mV ●</text>`;
      s+=`<text x="${x}" y="${y+60}" class="t-xs">EPP</text><rect x="${bx}" y="${y+52}" width="${f1(eNow*k)}" height="10" rx="3" style="fill:var(--achr)"/>`;
      for(let n=1;n*TR.thr<=TR.A*1.001+TR.thr*.4&&n<=3;n++){const xx=bx+n*TR.thr*k;s+=`<path d="M${f1(xx)} ${y+48}V${y+66}" style="stroke:var(--warn);stroke-width:1.2;stroke-dasharray:2 2"/><text x="${f1(xx)}" y="${y+76}" class="t-xs t-mid">${n}×</text>`}
      if(eNow>.5)s+=`<text x="${x+B.w}" y="${y+60}" class="t-xs t-end">${f1(eNow)} mV</text>`;
      const done=ms>=mPk,sf=done?TR.sf:eNow/TR.thr;
      s+=`<text x="${x}" y="${y+98}" class="t-big" style="fill:${TR.fires?'var(--ink)':'var(--ab)'}">SF ${sf.toFixed(2)}${done?'':' …'}</text><text x="${x+96}" y="${y+98}" class="t-sm">${done?(TR.fires?'fires':'fails'):'EPP rising'}</text>`;
      const msg=late?'○ derived: illustrative 20% rundown':mg?'● measured in MG: 37% of control':'● measured in controls';
      s+=`<text x="${x}" y="${y+114}" class="t-xs">${msg}</text>`;
      s+=`<text x="${x}" y="${y+128}" class="t-xs">human intercostal, Ruff &amp; Lennon 2008</text>`}
    svg.innerHTML=s;
    const p=phaseOf(NMJ_STEPS,t);setSt(p);const P=NMJ_STEPS[p];
    $('#nmNote').innerHTML=noteHTML(P)+(mg&&P.mg?`<div class="callout"><b>In MG.</b> ${P.mg}</div>`:'')+(late&&p>=4?`<div class="callout"><b>Later in a train.</b> ${NMJ_LATE}</div>`:'');
    $('#nmCap').textContent=`${mg?'Myasthenia gravis':'Healthy'} junction · ${late?'later impulse (illustrative rundown)':'first impulse'} · ${TR.fires?'the fibre fires':'the fibre fails'}. Schematic, not to scale; the animation runs in uneven slow motion, the trace's time axis is real milliseconds.`;
  }
  const stop=playWire(rg,$('#nmPlay'),draw,18000,'Replay','nmj');
  const setSt=stepWire($('#nmSteps'),NMJ_STEPS,rg,draw,stop);
  const pair=(a,b,v)=>{a.setAttribute('aria-pressed',v);b.setAttribute('aria-pressed',!v)};
  $('#nmHealthy').onclick=()=>{mg=false;pair($('#nmHealthy'),$('#nmMG'),true);draw(+rg.value)};
  $('#nmMG').onclick=()=>{mg=true;pair($('#nmHealthy'),$('#nmMG'),false);draw(+rg.value)};
  $('#nmFirst').onclick=()=>{late=false;pair($('#nmFirst'),$('#nmLate'),true);draw(+rg.value)};
  $('#nmLate').onclick=()=>{late=true;pair($('#nmFirst'),$('#nmLate'),false);draw(+rg.value)};
  $('#nmQuanta').onclick=()=>{qc=!qc;$('#nmQuanta').setAttribute('aria-pressed',qc);draw(+rg.value)};
  draw(+rg.value);

  /* ---- the receptor pentamers (card) ---- */
  const pent=(cx,cy,sub,title)=>{let g='';const R=36;
    sub.forEach((u,i)=>{const a=-Math.PI/2+i*2*Math.PI/5,x=cx+R*Math.cos(a),y=cy+R*Math.sin(a),al=u==='α';
      const sp=u==='γ'?'var(--ach)':u==='ε'?'var(--nerve)':'var(--achr)';
      g+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="19" style="fill:${al?'var(--achr)':'var(--achr-soft)'};stroke:${sp};stroke-width:2"/><text x="${f1(x)}" y="${f1(y+5)}" class="t-lbl t-mid" style="fill:${al?'var(--panel)':'var(--ink)'}">${u}</text>`;
      if(al){const xm=cx+(R+25)*Math.cos(a),ym=cy+(R+25)*Math.sin(a);g+=`<path d="M${f1(xm)} ${f1(ym-4)}l4 7h-8z" style="fill:var(--ab)"/>`}});
    [0,2].forEach(k=>{const a=-Math.PI/2+(k+.5)*2*Math.PI/5;g+=`<circle cx="${f1(cx+(R+1)*Math.cos(a))}" cy="${f1(cy+(R+1)*Math.sin(a))}" r="4.5" style="fill:var(--ach);stroke:var(--panel);stroke-width:1.5"/>`});
    g+=`<circle cx="${cx}" cy="${cy}" r="6" style="fill:var(--panel);stroke:var(--line)"/><text x="${cx}" y="${cy+78}" class="t-sm t-mid" style="fill:var(--ink)">${title}</text>`;return g};
  $('#nmPentA').innerHTML=pent(80,72,['α','ε','α','δ','β'],'adult α2βδε');
  $('#nmPentF').innerHTML=pent(240,72,['α','γ','α','δ','β'],'fetal α2βγδ')+`<circle cx="70" cy="168" r="4" style="fill:var(--ach)"/><text x="78" y="171" class="t-xs">ACh site</text><path d="M170 164l4 7h-8z" style="fill:var(--ab)"/><text x="178" y="171" class="t-xs">MIR on α1</text>`;

  /* ---- the zoom ladder ---- */
  const zs=$('#nmZoomSvg');let z=0,stopZ=null;
  const ZCAP=['<b>Whole muscle.</b> A motor nerve enters the muscle and branches, and its terminals reach the fibres in a band, the endplate zone. Each terminal on a fibre is one neuromuscular junction.',
    '<b>Endplate.</b> On one fibre, fine terminal branches (about 0.1 µm) swell into boutons usually 1–5 µm across. [[Slater2017]] Human endplates are small and broken into coin-shaped ("nummular") patches, and they stay stable from age 34 to 92. [[Jones2017]]',
    '<b>Fold.</b> Under one bouton: vesicles about 50 nm across at the active zones, a cleft about 50–100 nm wide, and folds up to about 1 µm deep that raise the membrane area about 8-fold. AChRs pack the crests at about 10,000 per µm²; Na⁺ channels line the troughs. [[Slater2017,Flucher1989]]'];
  /* each scene is drawn in a W×H frame; zBox is the area the next level magnifies (same aspect as the frame) */
  function zScene(i,W,H,N){let g='';
    if(i===0){const cx=W/2,cy=H*.56,rx=W*.38,ry=H*.27;
      g+=`<path d="M${f1(cx-rx-30)} ${f1(cy)}Q${f1(cx-rx)} ${f1(cy-ry*.25)} ${f1(cx-rx*.6)} ${f1(cy-ry)}Q${f1(cx)} ${f1(cy-ry*1.35)} ${f1(cx+rx*.6)} ${f1(cy-ry)}Q${f1(cx+rx)} ${f1(cy-ry*.25)} ${f1(cx+rx+30)} ${f1(cy)}Q${f1(cx+rx)} ${f1(cy+ry*.25)} ${f1(cx+rx*.6)} ${f1(cy+ry)}Q${f1(cx)} ${f1(cy+ry*1.35)} ${f1(cx-rx*.6)} ${f1(cy+ry)}Q${f1(cx-rx)} ${f1(cy+ry*.25)} ${f1(cx-rx-30)} ${f1(cy)}Z" style="fill:var(--muscle);stroke:var(--memb);stroke-width:2"/>`;
      for(let k=-3;k<=3;k++){const yy=cy+k*ry*.26,ins=Math.abs(k)*Math.abs(k)*7;g+=`<path d="M${f1(cx-rx*.9+ins)} ${f1(yy)}H${f1(cx+rx*.9-ins)}" style="stroke:var(--memb);stroke-width:1;opacity:.6"/>`}
      g+=`<path d="M${f1(cx-rx-30)} ${f1(cy)}H${f1(Math.max(2,cx-rx-48))}M${f1(cx+rx+30)} ${f1(cy)}H${f1(Math.min(W-2,cx+rx+48))}" style="stroke:var(--muted);stroke-width:5;stroke-linecap:round"/>`;
      g+=`<path d="M${f1(cx-70)} 6C${f1(cx-60)} ${f1(cy-ry*1.2)} ${f1(cx)} ${f1(cy-ry*1.1)} ${f1(cx)} ${f1(cy-ry*.9)}" style="fill:none;stroke:var(--nerve);stroke-width:3"/>`;
      for(let k=-3;k<=3;k++){const yy=cy+k*ry*.26,xx=cx+(k%2?10:-8);g+=`<path d="M${f1(cx)} ${f1(cy-ry*.9)}Q${f1(xx-12)} ${f1((cy-ry*.9+yy)/2)} ${f1(xx)} ${f1(yy)}" style="fill:none;stroke:var(--nerve);stroke-width:1.4"/><circle cx="${f1(xx)}" cy="${f1(yy)}" r="3.4" style="fill:var(--achr)"/>`}
      g+=`<text x="${f1(cx-78)}" y="18" class="t-xs t-end">motor nerve</text><text x="${f1(cx+rx*.62)}" y="${f1(cy-ry-16)}" class="t-xs t-mid">muscle fibres</text><text x="${f1(cx)}" y="${f1(cy+ry+28)}" class="t-xs t-mid">endplate zone: one junction per fibre</text>${N?'':`<text x="${f1(cx-rx-62)}" y="${f1(cy+20)}" class="t-xs">tendon</text>`}`;
    }else if(i===1){const y0=H*.47,h=H*.3,cx=W/2,sc=N?.75:1;
      g+=`<rect x="10" y="${f1(y0-h/2)}" width="${W-20}" height="${f1(h)}" rx="${f1(h/2)}" style="fill:var(--muscle);stroke:var(--memb);stroke-width:2"/>`;
      for(let x=26;x<W-24;x+=9)g+=`<path d="M${x} ${f1(y0-h/2+5)}V${f1(y0+h/2-5)}" style="stroke:var(--memb);stroke-width:1;opacity:.35"/>`;
      const bx=[-62,-34,-8,20,48,74],by=[-8,10,-14,6,-6,12];
      g+=`<path d="M${f1(cx-30)} 4C${f1(cx-30)} ${f1(y0-h)} ${f1(cx)} ${f1(y0-h*.8)} ${f1(cx)} ${f1(y0-h*.45)}" style="fill:none;stroke:var(--nerve);stroke-width:3"/>`;
      bx.forEach((d,k)=>{const x=cx+d*sc,y=y0+by[k]*sc;g+=`<path d="M${f1(cx)} ${f1(y0-h*.45)}Q${f1(cx+d*sc*.5)} ${f1(y0-h*.4)} ${f1(x)} ${f1(y)}" style="fill:none;stroke:var(--nerve);stroke-width:1.2"/><ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1((9+k%3*2)*sc)}" ry="${f1((8+k%2*2)*sc)}" style="fill:var(--achr-soft);stroke:var(--achr);stroke-width:1.6"/>`});
      g+=`<text x="${f1(cx-38)}" y="16" class="t-xs t-end">terminal branch</text><text x="${f1(cx)}" y="${f1(y0+h/2+20)}" class="t-xs t-mid">boutons: coin-shaped patches, usually 1–5 µm</text><text x="16" y="${f1(y0-h/2-8)}" class="t-xs">one muscle fibre</text>`;
    }else{const a=N?.27:.36,cx=W/2,top=H*.1,pre=H*.4,post=H*.5,dep=H*.28,lx=cx+W*(a+.04);
      g+=`<path d="M${f1(cx-W*a)} ${f1(pre)}V${f1(top+20)}Q${f1(cx-W*a)} ${f1(top)} ${f1(cx-W*a+20)} ${f1(top)}H${f1(cx+W*a-20)}Q${f1(cx+W*a)} ${f1(top)} ${f1(cx+W*a)} ${f1(top+20)}V${f1(pre)}Z" style="fill:var(--nerve-soft);stroke:var(--nerve);stroke-width:2"/>`;
      const v0=cx-W*(a-.05),v1=cx+W*(a-.05);for(let k=0;k<9;k++)g+=vesicle(lerp(v0,v1,k/8),lerp(top+18,pre-12,(k*37%10)/10),6,1,4);
      g+=`<rect x="${f1(cx-W*(a+.03))}" y="${f1(post)}" width="${f1(W*(2*a+.06))}" height="${f1(H*.44)}" rx="6" style="fill:var(--muscle)"/><path d="M${f1(cx-W*(a+.03))} ${f1(post)}H${f1(cx+W*(a+.03))}" style="stroke:var(--memb);stroke-width:2"/>`;
      const nf=N?4:5,f0=cx-W*a,sp=2*W*a/nf,rp=N?[.35,.65]:[.3,.5,.7];
      for(let k=0;k<nf;k++){const x=f0+(k+.5)*sp;g+=`<path d="M${f1(x-6)} ${f1(post-1)}V${f1(post+dep-6)}Q${f1(x)} ${f1(post+dep+2)} ${f1(x+6)} ${f1(post+dep-6)}V${f1(post-1)}" style="fill:var(--field);stroke:var(--memb);stroke-width:1.4"/>`+nmjNav(x-9,post+dep*.75)+nmjNav(x+9,post+dep*.75)}
      for(let k=0;k<=nf;k++){const c0=f0+(k-.5)*sp;rp.forEach(q=>{const x=c0+q*sp;if(x>f0+4&&x<f0+2*W*a-4)g+=achr(x,post,8,0,1)})}
      g+=`<text x="${f1(lx)}" y="${f1(top+18)}" class="t-xs">vesicles</text><text x="${f1(lx)}" y="${f1(top+30)}" class="t-xs">≈50 nm</text><text x="${f1(lx)}" y="${f1(pre+2)}" class="t-xs">cleft</text><text x="${f1(lx)}" y="${f1(pre+14)}" class="t-xs">50–100 nm</text><text x="${f1(lx)}" y="${f1(post+dep*.5)}" class="t-xs">folds</text><text x="${f1(lx)}" y="${f1(post+dep*.5+12)}" class="t-xs">to ≈1 µm</text><text x="${f1(cx-W*(a+.03))}" y="${f1(post+dep+24)}" class="t-xs">AChR on crests ≈10,000/µm² · NaV1.4 in troughs</text>`;
    }
    return g}
  function zBox(i,W,H){return i===0?{x:W*.41,y:H*.47,w:W*.18,h:H*.18}:{x:W*.34,y:H*.31,w:W*.32,h:H*.32}}
  function zDraw(v){const N=vb(zs,'720 270','400 300'),W=N?400:720,H=N?300:270;
    let s='';
    if(v>=2)s+=zScene(2,W,H,N);
    else{const i=Math.floor(v),e=ease(v-i),B=zBox(i,W,H);
      const sc=lerp(1,W/B.w,e),bx=lerp(B.x,0,e),by=lerp(B.y,0,e),ox=bx-B.x*sc,oy=by-B.y*sc;
      s+=`<g transform="translate(${f1(ox)} ${f1(oy)}) scale(${sc.toFixed(4)})" style="opacity:${f1(1-e)}">${zScene(i,W,H,N)}<rect x="${f1(B.x)}" y="${f1(B.y)}" width="${f1(B.w)}" height="${f1(B.h)}" rx="4" style="fill:none;stroke:var(--ab);stroke-width:${(2/sc).toFixed(3)};stroke-dasharray:${(5/sc).toFixed(3)} ${(3/sc).toFixed(3)}"/></g>`;
      if(e>0)s+=`<g transform="translate(${f1(bx)} ${f1(by)}) scale(${lerp(B.w/W,1,e).toFixed(4)})" style="opacity:${f1(e)}">${zScene(i+1,W,H,N)}</g>`}
    const lvl=Math.round(v);
    zs.innerHTML=s;$('#nmZoomCap').innerHTML=`<span class="kicker">Level ${lvl+1} of 3${lvl<2?' · the dashed box is the next level':''}</span><br>`+ZCAP[lvl];
    [0,1,2].forEach(k=>$('#nmZ'+k).setAttribute('aria-pressed',k===lvl))}
  function zGo(to){if(stopZ)stopZ();const from=z;stopZ=animate(Math.max(1,Math.abs(to-from))*700,p=>{z=lerp(from,to,p);zDraw(z)},()=>{z=to;zDraw(z);stopZ=null})}
  [0,1,2].forEach(k=>$('#nmZ'+k).onclick=()=>zGo(k));
  zDraw(0);
  {const prev=redraws.nmj;redraws.nmj=()=>{prev&&prev();zDraw(z)}}
};
