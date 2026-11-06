/* =============== 1.4 How CFTR works =============== */
/* Three scenes: one channel's gating cycle (main scrubber), the airway surface with and without CFTR,
   and the sweat duct against the airway. All drawings are schematic; numbers in the text come from pass C. */
const CT_STEPS=[
 {from:0,at:.06,k:'Step 1 · at rest',sv:'Closed: the R domain blocks it',sub:'no phosphate, no ATP: the gate stays shut',
  t:'Closed: the R domain blocks the gate',
  txt:'CFTR has five domains: two membrane-spanning domains that form the pore, two nucleotide-binding domains (NBD1, NBD2) whose ATP binding and hydrolysis control gating, and a regulatory (R) domain [[Sheppard1999,Csanady2019]]. In structures without phosphorylation, the R domain sits between the NBDs (zebrafish, 3.7 Å) or inside the intracellular vestibule (human, 3.9 Å), and blocks opening [[Zhang2016Cell,Liu2017Cryo]].',
  pt:'CFTR is a tiny gate in the surface of cells lining the lungs, gut, pancreas and sweat glands. At rest it is shut [[Csanady2019,Mall2020]].',
  hook:'F508, the site of the commonest CF variant, lies in NBD1 [[Riordan1989]].'},
 {from:.17,at:.27,k:'Step 2 · permission',sv:'PKA tags the R domain',sub:'cAMP-dependent kinase adds phosphate',
  t:'The "go" signal: PKA phosphorylates the R domain',
  txt:'Activation needs cAMP-dependent protein kinase (PKA) to phosphorylate the R domain [[Csanady2019]]. PKA targets serines 660, 737, 795 and 813: mutating any one leaves the cAMP response intact, mutating all four abolishes it, so the sites back each other up [[Cheng1991]]. Once phosphorylated, the R domain moves out of its inhibitory position [[Zhang2017Cell]].',
  pt:'The gate opens only when the cell sends a "go" signal: PKA sticks phosphate tags on the R domain [[Csanady2019]].',
  hook:'No phosphorylation of the R domain, no opening [[Csanady2019,Cheng1991]].'},
 {from:.36,at:.45,k:'Step 3 · fuel',sv:'ATP binds, the NBDs dimerise',sub:'the two NBDs close around ATP',
  t:'ATP binds and the two NBDs come together',
  txt:'With the R domain out of the way, the NBDs form a "head-to-tail" dimer around ATP (phosphorylated, ATP-bound zebrafish CFTR, 3.4 Å) [[Zhang2017Cell]]. In single-channel recordings, residues on opposite sides of the NBD1–NBD2 interface became energetically coupled only when the channel opened, tying ATP-driven tight dimerisation to pore opening <span class="ev est">Established</span> [[Vergani2005]].',
  pt:'The gate uses energy from ATP, the cell\'s fuel, to swing open [[Csanady2019]].',
  hook:'CFTR is an ABC transporter that works as a channel: phosphorylated R domain plus an ATP-driven NBD dimer opens it [[Csanady2019,Vergani2005]].'},
 {from:.52,at:.6,k:'Step 4 · open',sv:'Open: Cl⁻ and HCO₃⁻ leave',sub:'anions flow out of the cell',
  t:'The gate opens: chloride and bicarbonate flow',
  txt:'The anion pathway is lined with positively charged residues [[Zhang2016Cell]]. Changing lysine 95 or 335 altered which anions passed best, which proved CFTR is itself the chloride channel [[Anderson1991]]. One channel conducts 10.4 ± 0.5 pS in 150 mM chloride, and its Cl⁻:HCO₃⁻ permeability ratio is 3.8 ± 1.0, so it carries bicarbonate about a quarter as well as chloride [[Poulsen1994]].',
  pt:'Chloride and bicarbonate, both negatively charged, leave the cell through the open gate [[Poulsen1994]].',
  hook:'CFTR conducts Cl⁻ and HCO₃⁻, HCO₃⁻ about one-quarter as well as Cl⁻ [[Poulsen1994]].'},
 {from:.68,at:.75,k:'Step 5 · water',sv:'Water follows; ATP is spent',sub:'the gate flickers while it stays phosphorylated',
  t:'Water follows, and ATP use resets the gate',
  txt:'ATP binding and hydrolysis at the NBDs drive the pore open and shut, so a phosphorylated channel keeps cycling [[Csanady2019]]. Water follows the anions out [[Csanady2019,Mall2020]]. In the airway, blended chloride secretion and sodium absorption keep the periciliary liquid about 7 µm deep, which cilia need to beat and move mucus [[Tarran2001JGP,Tarran2006JGP]].',
  pt:'Where salt goes, water follows. That water keeps the layer around the cilia deep enough for them to sweep mucus [[Tarran2006JGP,Matsui1998]].',
  hook:'Normal periciliary layer: about 7 µm [[Tarran2001JGP,Tarran2006JGP]].'},
 {from:.84,at:.93,k:'Step 6 · in CF',sv:'No CFTR: two explanations',sub:'what goes wrong on the airway surface',
  t:'When CFTR fails: two leading explanations',
  txt:'Liquid depletion: CF cultures absorbed surface liquid abnormally fast, the periciliary layer collapsed and mucus transport stopped <span class="ev est">Established</span> in cultures [[Matsui1998]]. Acidic surface: in newborn CF pigs the ASL was more acidic and killed bacteria less well <span class="ev early">Early evidence</span> [[Pezzulo2012]], but probes in living children found similar pH with and without CF [[Schultz2017]]. That mucins need bicarbonate to unfold is a <span class="ev hyp">Hypothesis</span> [[Quinton2008]].',
  pt:'Without working CFTR, the liquid layer gets too thin and the mucus gets thick and sticky [[Matsui1998,Henderson2014]].',
  hook:'Classic airway model: too much Na⁺ and liquid absorbed, the ~7 µm periciliary layer depleted, mucus transport stopped [[Boucher1986,Matsui1998,Tarran2001JGP]].'}
];
inits.cftr=()=>{
  /* ---------- main: one channel's gating cycle ---------- */
  const svg=$('#ctSvg'),rg=$('#ctT'),note=$('#ctNote');let setSt=()=>{};
  const tx=(x,y,s,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`;
  const INK='fill:var(--ink);font-weight:600';
  function state(t){const cf=ramp(t,.84,.88);
    let op=.35*ramp(t,.42,.48)+.65*ramp(t,.52,.58);
    const op0=op;if(t>.7&&t<.86){const w=Math.sin((t-.7)*95);op*=w<-.55?.25:1}
    return {op0:op0*(1-cf),pka:ramp(t,.17,.23),pkaOut:ramp(t,.3,.36),p:ramp(t,.22,.3),atpMv:ramp(t,.36,.43),op:op*(1-cf),
      flow:ramp(t,.55,.62)*(op>.5?1:.15)*(1-cf),water:ramp(t,.68,.76)*(1-cf),cf}}
  function hypCards(x,y,w,h,N,u){/* two explanation cards in step 6 */
    let s='';const ch=(h-10)/2;
    [0,1].forEach(i=>{const yy=y+i*(ch+10),a=clamp(u*2-i*.6);
      s+=`<g style="opacity:${f1(a)}"><rect x="${f1(x)}" y="${f1(yy)}" width="${f1(w)}" height="${f1(ch)}" rx="10" style="fill:var(--panel);stroke:var(--line)"/>`;
      if(i===0){const E=epithelium(x+8,yy+22,N?120:116,ch-30,{n:3,asl:.12,mucus:.7,thick:.85,beat:.1,ph:u*3,cftr:0,seed:4});
        s+=E.svg+tx(x+8,yy+15,'A · too little liquid','t-sm',INK);
        const lx=x+(N?140:134);s+=tx(lx,yy+38,'periciliary layer collapses')+tx(lx,yy+52,'cilia flatten, mucus stops')+tx(lx,yy+66,'shown in CF cultures');
        s+=`<rect x="${f1(lx)}" y="${f1(yy+ch-26)}" width="128" height="16" rx="4" style="fill:var(--good-soft)"/>`+tx(lx+5,yy+ch-15,'ESTABLISHED (CULTURES)','t-xs','fill:var(--good);font-weight:600')}
      else{const bx=x+12,bw=N?118:110,by=yy+(N?30:44);
        s+=tx(x+8,yy+15,'B · too acidic','t-sm',INK);
        s+=`<defs><linearGradient id="ctPhG" x1="0" x2="1"><stop offset="0" style="stop-color:var(--inflamed)"/><stop offset="1" style="stop-color:var(--bicarb)"/></linearGradient></defs><rect x="${f1(bx)}" y="${f1(by)}" width="${bw}" height="10" rx="5" style="fill:url(#ctPhG);opacity:.75"/>`;
        s+=tx(bx,by+22,'acid')+tx(bx+bw,by+22,'alkaline','t-xs t-end');
        const m=bx+bw*lerp(.5,.3,clamp(u*1.5));s+=`<path d="M${f1(m-5)} ${f1(by-8)}h10l-5 7z" style="fill:var(--ink)"/>`;
        for(let k=0;k<3;k++)s+=bacterium(bx+18+k*34,by+(N?26:42),13,{ang:k*40-20,flag:false});
        s+=tx(bx,by+(N?44:64),'bacteria survive','t-xs');
        const lx=x+(N?140:134);s+=tx(lx,yy+38,'no HCO₃⁻: ASL more acidic')+tx(lx,yy+52,'newborn pigs: weaker killing')+tx(lx,yy+66,'living children: pH similar');
        s+=`<rect x="${f1(lx)}" y="${f1(yy+ch-26)}" width="140" height="16" rx="4" style="fill:var(--warn-soft)"/>`+tx(lx+5,yy+ch-15,'EARLY EVIDENCE · CONTESTED','t-xs','fill:var(--warn);font-weight:600')}
      s+='</g>'});
    return s}
  function draw(t){const N=vb(svg,'720 380','400 600'),S=state(t),p=phaseOf(CT_STEPS,t),P=CT_STEPS[p];
    const L=N?{cx:200,cy:180,s:128,mw:370,px:14,py:322,pw:372,sy:578}:{cx:192,cy:188,s:138,mw:368,px:414,py:40,pw:292,sy:354};
    const {cx,cy,s:sc}=L,ny=cy+sc*.62*.38+sc*.16,nr=sc*.13,nd=lerp(sc*.2,sc*.12,S.op);
    let g=`<defs>${marker('ctAr','var(--muted)',6)}</defs>`;
    /* compartment names */
    g+=tx(12,N?20:22,'OUTSIDE · airway surface','t-xs','letter-spacing:.08em')+tx(12,cy+sc*.13+16,'INSIDE · cytoplasm','t-xs','letter-spacing:.08em');
    if(S.cf<.5){
      const C=cftr(cx,cy,sc,{state:'open',open:S.op,atp:S.atpMv>=1?1:0,flow:S.flow,ph:t*7,hco3:true,water:S.water,mw:L.mw});
      g+=C.svg;
      /* the R domain: wedged between the NBDs, swung aside once phosphorylated */
      const rp=ease(S.p),rx=lerp(cx,cx+sc*.36,rp),ry=lerp(ny,ny+sc*.24,rp),rr=sc*.075;
      g+=`<ellipse cx="${f1(rx)}" cy="${f1(ry)}" rx="${f1(rr*1.25)}" ry="${f1(rr)}" style="fill:var(--brand-soft);stroke:var(--cftr);stroke-width:1.6"/>`+tx(rx,ry+3,'R','t-xs t-mid',INK);
      for(let i=0;i<4;i++){const a=clamp(S.p*4-i);if(a<=0)continue;const ang=-2.4+i*.95,px=rx+Math.cos(ang)*rr*1.9,py=ry+Math.sin(ang)*rr*1.6;
        g+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="${f1(sc*.033)}" style="fill:var(--gold);opacity:${f1(a)}"/><text x="${f1(px)}" y="${f1(py+2.6)}" class="t-mid" style="font:700 7px var(--mono);fill:var(--panel);opacity:${f1(a)}">P</text>`}
      /* PKA arrives, tags, leaves */
      const pin=ease(S.pka),pout=ease(S.pkaOut),pa=Math.min(pin,1-pout);
      if(pa>0){const kx=lerp(cx-sc*1.05,rx-sc*.3,pin)-pout*sc*.6,ky=lerp(cy+sc*.85,ry+sc*.16,pin)+pout*sc*.25;
        g+=`<g style="opacity:${f1(pa)}"><rect x="${f1(kx-24)}" y="${f1(ky-11)}" width="48" height="22" rx="11" style="fill:var(--accent-soft);stroke:var(--accent);stroke-width:1.4"/>${tx(kx,ky+4,'PKA','t-xs t-mid','fill:var(--accent);font-weight:700')}</g>`;
        if(pin<1)g+=tx(kx,ky+24,'cAMP signal','t-xs t-mid')}
      /* ATP travels up to the NBDs */
      if(S.atpMv>0&&S.atpMv<1)[-1,1].forEach(k=>{const u=ease(S.atpMv),ax=lerp(cx+k*sc*.7,cx+k*nd*.35,u),ay=lerp(cy+sc*1.05,ny-nr*.25,u);
        g+=`<circle cx="${f1(ax)}" cy="${f1(ay)}" r="${f1(sc*.05)}" style="fill:var(--gold)"/>`+tx(ax,ay+18,'ATP','t-xs t-mid','fill:var(--gold);font-weight:700')});
      /* labels */
      g+=tx(cx-nd-nr-5,ny+3,'NBD1','t-xs t-end',INK)+tx(cx+nd+nr+5,ny+3,'NBD2','t-xs',INK);
      g+=tx(cx-sc*.42,cy-sc*.3,'MSD1','t-xs t-end',INK)+tx(cx+sc*.42,cy-sc*.3,'MSD2','t-xs',INK);
      if(S.atpMv>=1&&S.op<.9&&p<3)g+=tx(cx-sc*.12,ny+nr+20,'ATP bound','t-xs t-end','fill:var(--gold);font-weight:700');
      if(p===4&&t>.7){const hy=Math.sin((t-.7)*95)<-.55;g+=tx(cx-sc*.12,ny+nr+(N?22:24),hy?'ATP → ADP + Pi: gate shuts':'ATP bound: gate open','t-xs t-end','fill:var(--gold);font-weight:700')}
      if(S.flow>.3)g+=tx(cx+sc*.2,cy-sc*.62,'Cl⁻  HCO₃⁻ out','t-xs','fill:var(--ink)');
      if(S.water>.4)g+=tx(cx+sc*.5,cy-sc*.86,'water follows','t-xs','fill:var(--ink)')}
    else{const C=cftr(cx,cy,sc,{state:'absent',mw:L.mw});g+=C.svg;
      g+=`<path d="M${f1(cx-16)} ${f1(cy-16)}l32 32M${f1(cx+16)} ${f1(cy-16)}l-32 32" style="stroke:var(--bad);stroke-width:3;stroke-linecap:round"/>`;
      g+=tx(cx,cy+sc*.55,'no working CFTR at the surface','t-sm t-mid',INK)+tx(cx,cy+sc*.55+16,'(variant classes: module 1.3)','t-xs t-mid')}
    /* the panel */
    g+=tx(L.px,L.py,P.sv,'t-big',`fill:${p===5?'var(--brand)':'var(--ink)'}`)+tx(L.px,L.py+16,P.sub,'t-sm');
    if(p<5){const rows=[['R domain phosphorylated (PKA)',S.p],['ATP bound at both NBDs',S.atpMv>=1?1:0],['NBDs dimerised',ramp(S.op0,.2,.35)],['gate open, anions flow',ramp(t,.55,.6)*(1-S.cf)],['water follows',S.water]];
      const ry0=L.py+(N?40:44),rs=N?22:26;
      rows.forEach((r,i)=>{const on=r[1]>.5,yy=ry0+i*rs;
        g+=`<circle cx="${f1(L.px+8)}" cy="${f1(yy-4)}" r="7" style="fill:${on?'var(--cftr)':'var(--panel)'};stroke:${on?'var(--cftr)':'var(--line)'};stroke-width:1.6"/>`;
        if(on)g+=`<path d="M${f1(L.px+4.5)} ${f1(yy-4)}l2.5 2.6l4.5-5" style="fill:none;stroke:var(--panel);stroke-width:1.8"/>`;
        g+=tx(L.px+22,yy,r[0],'t-sm',on?'fill:var(--ink)':'')});
      /* numbers, from step 4 */
      const na=ramp(t,.52,.58);
      if(na>0){const by=ry0+5*rs+(N?2:6),bw=L.pw-20;
        g+=`<g style="opacity:${f1(na)}"><rect x="${f1(L.px)}" y="${f1(by)}" width="${f1(L.pw)}" height="${N?84:92}" rx="10" style="fill:var(--panel-2)"/>`;
        g+=tx(L.px+10,by+18,'one channel conducts','t-xs')+tx(L.px+L.pw-10,by+20,'10.4 pS','t-big t-end');
        const w1=bw*.7,w2=w1/3.8;
        g+=tx(L.px+10,by+38,'relative permeability, Cl⁻ : HCO₃⁻ = 3.8 : 1','t-xs');
        g+=`<rect x="${f1(L.px+10)}" y="${f1(by+46)}" width="${f1(w1)}" height="10" rx="3" style="fill:var(--cl)"/>`+tx(L.px+16+w1,by+55,'Cl⁻','t-xs',INK);
        g+=`<rect x="${f1(L.px+10)}" y="${f1(by+62)}" width="${f1(w2)}" height="10" rx="3" style="fill:var(--bicarb)"/>`+tx(L.px+16+w2,by+71,'HCO₃⁻ ≈ ¼','t-xs',INK);
        g+='</g>'}}
    else g+=hypCards(L.px,L.py+(N?28:30),L.pw,N?220:270,N,ramp(t,.86,.95));
    /* phase strip */
    const sw=(N?372:688)/6,sx=N?14:16;
    CT_STEPS.forEach((q,i)=>{const on=i===p,x=sx+i*sw;g+=`<rect x="${f1(x+1)}" y="${L.sy}" width="${f1(sw-2)}" height="6" rx="3" style="fill:${on?'var(--brand)':'var(--panel-2)'}"/>`+tx(x+sw/2,L.sy+19,['closed','PKA','ATP','open','water','in CF'][i],'t-xs t-mid',on?INK:'')});
    g+=`<circle cx="${f1(sx+(N?372:688)*t)}" cy="${L.sy+3}" r="5.5" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;
    svg.innerHTML=g;note.innerHTML=noteHTML(P);setSt(p)}
  const stop=playWire(rg,$('#ctPlay'),draw,26000,'%t:player.replay%','cftr');
  setSt=stepWire($('#ctSteps'),CT_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- the airway surface, with and without CFTR ---------- */
  const as=$('#ctAsl'),ar=$('#ctAslT'),ac=$('#ctAslCap'),hy=$('#ctHyper');let k=0,kTo=0,kStop=null;
  function drawAsl(t){const N=vb(as,'720 330','400 600'),hyper=hy.checked,ph=t*14;
    const asl=lerp(1,.12,k),beat=lerp(1,.08,k),na=1+(hyper?1.6:0)*k;
    const E0=N?{x:10,y:30,w:380,h:280}:{x:14,y:30,w:440,h:284};
    let g=tx(E0.x,18,k<.5?'With CFTR':'Without CFTR','t-big',`fill:${k<.5?'var(--ink)':'var(--brand)'}`);
    const E=epithelium(E0.x,E0.y,E0.w,E0.h,{n:6,asl,mucus:lerp(.4,.72,k),thick:lerp(0,.9,k),beat,ph,cftr:1-k,move:clamp(1-k*1.6),labels:true,seed:5});
    g+=E.svg;const {cellTop,aslTop,mucTop,cells}=E.at;
    /* Na+ moving down into the cells through ENaC */
    cells.forEach(([cx],c)=>{const n=Math.round(1+na*1.2);for(let i=0;i<n;i++){const u=((i/n+ph*.9+c*.23)%1+1)%1;
      g+=ion(cx+14+(i%2)*5,lerp(aslTop+3,cellTop+14,u),'na',{r:2.6,op:Math.min(1,u*4,(1-u)*3)})}
      g+=`<rect x="${f1(cx+12)}" y="${f1(cellTop-3)}" width="7" height="7" rx="1.5" style="fill:var(--na);opacity:.8"/>`});
    /* mucus specks, carried along when transport works */
    const sp=(1-k)*(1-k);for(let i=0;i<9;i++){const u=((i/9+t*2.4*sp)%1+1)%1,mx=E0.x+8+(E0.w-16)*u,my=mucTop+(aslTop-mucTop)*(.35+.3*((i*37)%10)/10);
      g+=`<circle cx="${f1(mx)}" cy="${f1(my)}" r="2.6" style="fill:var(--mucus-ink);opacity:.65"/>`}
    /* the panel */
    const px=N?14:478,py=N?338:46,pw=N?372:228;
    const rows=[['Periciliary layer',k<.5?'≈7 µm, cilia upright':'collapsed',k<.5?'good':'bad'],
      ['Cilia',k<.5?'beating':'flattened',k<.5?'good':'bad'],
      ['Mucus',k<.5?'carried along':'concentrated, stuck',k<.5?'good':'bad'],
      ['Cl⁻ and HCO₃⁻ out (CFTR)',k<.5?'secreted':'none',k<.5?'good':'bad'],
      ['Na⁺ in (ENaC)',k<.5?'absorbed, balanced':hyper?'raised: classic model':'not raised: pig, human cultures',k<.5?'good':hyper?'bad':'warn']];
    g+=tx(px,py-12,'WHAT THE LINING DOES','t-xs','letter-spacing:.1em');
    rows.forEach((r,i)=>{const yy=py+i*(N?44:50);g+=`<rect x="${f1(px)}" y="${f1(yy)}" width="${f1(pw)}" height="${N?38:42}" rx="8" style="fill:var(--${r[2]}-soft)"/>`+tx(px+10,yy+15,r[0],'t-xs')+tx(px+10,yy+(N?31:33),r[1],'t-sm',`fill:var(--${r[2]});font-weight:700`)});
    /* depth gauge */
    const gx=E0.x+18,gy=cellTop,gh=(cellTop-aslTop);
    g+=`<path d="M${f1(gx)} ${f1(gy)}V${f1(gy-gh)}" style="stroke:var(--ink);stroke-width:1.2" marker-end="url(#ctAr2)" marker-start="url(#ctAr2)"/><defs>${marker('ctAr2','var(--ink)',5)}</defs>`;
    as.innerHTML=g;
    $$('[data-asl]').forEach(b=>b.setAttribute('aria-pressed',(b.dataset.asl==='off')===(kTo===1)));
    ac.innerHTML=kTo===0?'<b>With CFTR.</b> Chloride and bicarbonate leave the cells while ENaC takes sodium back, and the balance holds the periciliary layer at about 7 µm, deep enough for cilia to beat and carry mucus [[Tarran2001JGP,Tarran2006JGP]].'
      :hyper?'<b>Without CFTR, classic model.</b> CF nasal tissue absorbed Na⁺ at a raised rate [[Boucher1986]], CFTR normally restrains ENaC [[Stutts1995]], and extra ENaC alone gives mice CF-like lung disease [[Mall2004]]. The liquid layer is absorbed away and mucus transport stops [[Matsui1998]].'
      :'<b>Without CFTR, anion-loss model.</b> In newborn CF pigs and human CF cultures, sodium absorption was not raised: the defect is lost Cl⁻ and HCO₃⁻ secretion [[Chen2010Cell,Itani2011]]. The surface still dries and thickens in CF cultures, and mucus stops [[Matsui1998,Henderson2014]]. Untick and tick the box to compare.'}
  const aStop=playWire(ar,$('#ctAslPlay'),drawAsl,16000,'%t:player.replay%','cftr');
  function setK(v){if(kStop)kStop();kTo=v;const k0=k;kStop=animate(900,q=>{k=lerp(k0,v,ease(q));drawAsl(+ar.value)},()=>{kStop=null})}
  $$('[data-asl]').forEach(b=>b.addEventListener('click',()=>setK(b.dataset.asl==='off'?1:0)));
  hy.addEventListener('change',()=>drawAsl(+ar.value));
  drawAsl(+ar.value);

  /* ---------- the sweat duct against the airway ---------- */
  const sws=$('#ctSw'),swr=$('#ctSwT'),swc=$('#ctSwCap');let cfv=0,cfTo=0,cfStop=null;
  function cellRow(x,y,w,h,o){/* a strip of cells with a lumen band above; o.dir 'in' (lumen to cell) or 'out' */
    const n=3,cw=w/n,lumH=h*.36,ct=y+lumH,f=o.f,ph=o.ph;let s=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(lumH)}" rx="6" style="fill:var(--water-soft)"/>`;
    s+=tx(x+6,y+12,o.lum,'t-xs',INK);
    for(let c=0;c<n;c++){const cx0=x+cw*c+1.5;s+=`<rect x="${f1(cx0)}" y="${f1(ct)}" width="${f1(cw-3)}" height="${f1(h-lumH)}" rx="5" style="fill:var(--tissue);stroke:var(--airway);stroke-width:1.2"/><ellipse cx="${f1(cx0+cw/2)}" cy="${f1(ct+(h-lumH)*.62)}" rx="${f1(cw*.18)}" ry="${f1((h-lumH)*.16)}" style="fill:var(--nucleus)"/>`;
      const mx=cx0+cw*.32;s+=`<rect x="${f1(mx-6)}" y="${f1(ct-3)}" width="4" height="7" rx="1" style="fill:${f>.5?'var(--cftr)':'var(--muted)'}"/><rect x="${f1(mx+2)}" y="${f1(ct-3)}" width="4" height="7" rx="1" style="fill:${f>.5?'var(--cftr)':'var(--muted)'}"/>`;
      if(o.na)s+=`<rect x="${f1(cx0+cw*.7-3)}" y="${f1(ct-3)}" width="7" height="7" rx="1.5" style="fill:var(--na);opacity:${f1(.4+.5*f)}"/>`;
      for(let i=0;i<2;i++){const u=((i/2+ph+c*.3)%1+1)%1,yy=o.dir==='in'?lerp(y+lumH*.35,ct+16,u):lerp(ct+16,y+lumH*.3,u),op=f*Math.min(1,u*4,(1-u)*3);
        s+=ion(mx,yy,'cl',{r:3,op});if(o.na)s+=ion(cx0+cw*.7+.5,yy+4,'na',{r:3,op})}
      if(f<.5)s+=`<path d="M${f1(mx-7)} ${f1(ct-13)}l14 14M${f1(mx+7)} ${f1(ct-13)}l-14 14" style="stroke:var(--bad);stroke-width:2;stroke-linecap:round;opacity:${f1(1-f*2)}"/>`}
    /* salt left in the lumen (sweat duct only) */
    if(o.keep){const nk=Math.round(o.keep*8);for(let i=0;i<nk;i++){const lx=x+10+((i*53)%Math.max(1,w-20)),ly=y+lumH*.55+(i%2)*6;s+=ion(lx,ly,i%2?'cl':'na',{r:2.6})}}
    s+=tx(x+6,y+h+14,o.cap,'t-xs');
    return s}
  function drawSw(t){const N=vb(sws,'720 300','400 640'),ph=t*6,f=1-cfv;
    let g='';
    const G=N?{x:96,y:56,s:1.05}:{x:96,y:62,s:1.15};
    g+=tx(14,20,'SWEAT GLAND','t-xs','letter-spacing:.1em');
    g+=sweatGland(G.x,G.y,G.s,{cf:cfv,ph:t*4,labels:true}).svg;
    /* salt-on-skin meter */
    const mx=N?232:22,my=N?84:G.y+G.s*160+18;
    if(N){g+=tx(mx,my-10,'salt left on the skin','t-xs',INK);g+=`<rect x="${mx}" y="${my}" width="150" height="10" rx="5" style="fill:var(--panel-2)"/><rect x="${mx}" y="${my}" width="${f1(150*lerp(.12,1,cfv))}" height="10" rx="5" style="fill:var(--salt-edge)"/>`;
      g+=tx(mx,my+28,cfv>.5?'salt stays in the sweat':'salt taken back in the duct','t-sm',`fill:${cfv>.5?'var(--bad)':'var(--good)'};font-weight:700`)}
    else{g+=tx(mx,my,'salt left on the skin','t-xs',INK)+`<rect x="${mx}" y="${my+6}" width="150" height="9" rx="4.5" style="fill:var(--panel-2)"/><rect x="${mx}" y="${my+6}" width="${f1(150*lerp(.12,1,cfv))}" height="9" rx="4.5" style="fill:var(--salt-edge)"/>`}
    const D=N?{x:14,y:270,w:372,h:140}:{x:232,y:40,w:224,h:200},A=N?{x:14,y:462,w:372,h:140}:{x:484,y:40,w:224,h:200};
    g+=tx(D.x,D.y-12,'SWEAT DUCT · CFTR takes salt back IN','t-xs',`letter-spacing:.06em;${INK}`);
    g+=cellRow(D.x,D.y,D.w,D.h,{dir:'in',f,ph,na:true,keep:cfv,lum:'sweat in the duct',cap:cfv>.5?'Cl⁻ stuck in the sweat; ENaC fails too':'Na⁺ (ENaC) and Cl⁻ (CFTR) reabsorbed'});
    g+=tx(A.x,A.y-12,'AIRWAY · CFTR sends chloride OUT','t-xs',`letter-spacing:.06em;${INK}`);
    g+=cellRow(A.x,A.y,A.w,A.h,{dir:'out',f,ph:ph*.8,na:false,lum:'airway surface liquid',cap:cfv>.5?'no Cl⁻ or HCO₃⁻ out: surface dries':'Cl⁻ and HCO₃⁻ out; water follows'});
    if(!N)g+=tx(D.x+D.w/2,D.y+D.h+34,cfv>.5?'reabsorption fails':'reabsorption','t-sm t-mid',`fill:${cfv>.5?'var(--bad)':'var(--good)'};font-weight:700`)+tx(A.x+A.w/2,A.y+A.h+34,cfv>.5?'secretion fails':'secretion','t-sm t-mid',`fill:${cfv>.5?'var(--bad)':'var(--good)'};font-weight:700`);
    sws.innerHTML=g;
    $$('[data-sw]').forEach(b=>b.setAttribute('aria-pressed',(b.dataset.sw==='cf')===(cfTo===1)));
    swc.innerHTML=cfTo===0?'<b>CFTR working.</b> Primary sweat starts salty. Along the duct, chloride leaves through CFTR and sodium through ENaC, whose activity depends on CFTR, so the sweat reaching the skin has lost most of its salt [[Quinton1983,Reddy1999]].'
      :'<b>Cystic fibrosis.</b> Chloride cannot leave the duct, and the sodium conductance cannot be activated either, so NaCl stays in the sweat [[Quinton1983,Reddy1999]]. This is why a sweat test can point to CF, and why sweat-gland dysfunction can cause salt depletion ("heat shock") [[Elborn2016]]. In the airway, the same loss stops secretion instead.'}
  playWire(swr,$('#ctSwPlay'),drawSw,14000,'%t:player.replay%','cftr');
  function setCf(v){if(cfStop)cfStop();cfTo=v;const c0=cfv;cfStop=animate(900,q=>{cfv=lerp(c0,v,ease(q));drawSw(+swr.value)},()=>{cfStop=null})}
  $$('[data-sw]').forEach(b=>b.addEventListener('click',()=>setCf(b.dataset.sw==='cf'?1:0)));
  drawSw(+swr.value);
};
