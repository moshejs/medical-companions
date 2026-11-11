/* =============== 1.4 Subtypes: AIDP, AMAN and AMSAN =============== */
/* Main scene: two motor fibres (AIDP above, AMAN below) and a node close-up, through six steps.
   Second scene: a 100-dot block per cohort for subtype shares. Numbers come from research pass C. */
const SB_STEPS=[
 {from:0,at:.06,k:'Step 1 · healthy nerve',t:'A healthy motor fibre',
  txt:'A myelinated motor fibre carries the signal from the spinal cord (left) to the muscle (right). Myelin insulates the axon, and the signal jumps between the gaps in it, the nodes of Ranvier, where sodium channels cluster [[Susuki2007]]. In GBS the immune attack can land on the myelin (AIDP) or on the axon at the node (AMAN and AMSAN). In 12 people examined at autopsy in northern China, 3 had AIDP, 6 an axonal pattern and 3 only very mild changes despite paralysis, which points to block at the node or the nerve terminal [[Griffin1995]].',
  pt:'A nerve is like an electric cable. The nodes of Ranvier are small gaps in the insulation, where the signal jumps along.',
  hook:'AIDP targets the Schwann cell surface and myelin; AMAN targets the axolemma at the node of Ranvier [[HaferMacko1996AIDP,HaferMacko1996AMAN]].'},
 {from:.15,at:.27,k:'Step 2 · AIDP',t:'AIDP: the attack on myelin',
  txt:'In 3 people autopsied 3 to 9 days after onset, the complement products C3d and C5b-9 (the membrane attack complex) lay along the outer surface of the Schwann cell. Myelin broke into vesicles before macrophages invaded it, so the authors suggest antibody binds the Schwann cell surface first <span class="ev early">Early evidence</span> [[HaferMacko1996AIDP]]. Lymphocytes infiltrate and macrophages strip the myelin [[Griffin1995]]. Nerve tests then show reduced velocities, abnormal temporal dispersion or partial motor block [[Leonhard2019]].',
  pt:'In AIDP the immune system damages the insulation around the nerve. Where the insulation is lost, signals slow down or stop.',
  hook:'AIDP: complement on the outer Schwann cell surface and vesicular myelin change, then macrophages strip the myelin [[HaferMacko1996AIDP]].'},
 {from:.33,at:.46,k:'Step 3 · AMAN',t:'AMAN: the attack at the node',
  txt:'In 7 fatal AMAN cases, IgG and the complement product C3d were bound to the axolemma of motor fibres, most often at the node [[HaferMacko1996AMAN]]. The earliest change was a lengthened node with distorted paranodal myelin; macrophages then entered at the node and slid into the space under the myelin, which stayed intact [[Griffin1996Nodal]]. In an animal model, sodium channel clusters at lengthened nodes were disrupted or lost <span class="ev est">Established in the model</span> [[Susuki2007]]. There is little demyelination or lymphocytic inflammation, and sensory fibres are spared [[HaferMacko1996AMAN]].',
  pt:'In AMAN the antibodies attack the nerve fibre itself, at the small gaps in the insulation. The signal stops at those gaps.',
  hook:'AMAN earliest pathology: nodal lengthening, then macrophages in the periaxonal space under an intact myelin sheath [[Griffin1996Nodal]].'},
 {from:.52,at:.62,k:'Step 4 · two courses',t:'A block that lifts, or an axon that breaks',
  txt:'Of 18 people with AMAN studied serially, 12 (67%) had definite or probable conduction block. It reversed in 7 and was followed by axonal degeneration in 6 (one person had both). Every block had gone or begun to resolve within 3 weeks, with no sign of remyelination [[Kokubun2010]]. Clinical and antibody profiles did not differ, so the authors see reversible block, block then degeneration, and degeneration without block as one continuum [[Kokubun2010]]. In the animal model, channels redistributed during recovery [[Susuki2007]].',
  pt:'Sometimes antibodies only stop the signal at the gaps for a while. When that clears up, strength can come back quickly. If the nerve fibre itself breaks, it has to regrow.',
  hook:'Reversible conduction failure: a block or small response that recovers fast, with no remyelination signature [[Kuwabara1998GM1,Kokubun2010]].'},
 {from:.69,at:.77,k:'Step 5 · AMSAN',t:'AMSAN: sensory axons too',
  txt:'Autopsies of 4 people with AMSAN, who died 7, 7, 18 and 60 days after onset, showed Wallerian-like degeneration in ventral and dorsal roots and peripheral nerves, with minimal demyelination or lymphocytes in the 3 early cases. The 60-day case had extensive loss of large fibres with little remyelination [[Griffin1996AMSAN]]. AMAN and AMSAN share an antibody profile, IgG to GM1, GM1b and GD1a [[Yuki1999AMSAN]], and the authors read AMSAN as the most severe end of one spectrum of attack on axons [[Griffin1996AMSAN]].',
  pt:'In AMSAN the attack hits the nerve fibres that carry feeling as well as the ones that move muscles.',
  hook:'The first axonal GBS report: 5 people with electrically inexcitable motor nerves, all unable to move arms and legs; 3 of the 4 who survived recovered poorly [[Feasby1986]].'},
 {from:.85,at:.95,k:'Step 6 · recovery',t:'Repair: new myelin, or a regrowing axon',
  txt:'In northern China, the median time to walk 5 metres with help was 31 days in AMAN (n = 32) and 32 days in AIDP (n = 8), too fast for regrowth along a whole nerve [[Ho1997Recovery]]. Proposed reasons are repair at the node and regrowth of short motor nerve terminals <span class="ev early">Early evidence</span> [[Ho1997Recovery,Griffin1996Nodal]]. In Japan, 14% with AMAN (6 of 44) and 6% with AIDP (2 of 33) could not walk alone at 6 months; 4 of those 6 walked by one year and 2 at 28 and 57 months [[Hiraga2005]]. Repaired myelin leaves slow, dispersed components on nerve tests, which reversible failure lacks [[Kuwabara1998GM1]].',
  pt:'If the nerve fibre itself is badly damaged it has to regrow, and that can take many months. Some people keep improving for years. These numbers describe groups of people. They cannot tell you exactly what will happen to you.',
  hook:'AMAN can recover as fast as AIDP: a median 31 against 32 days to walk 5 m with help [[Ho1997Recovery]].'}
];
/* every visible SVG string */
const SB_TX={laneA:'AIDP · attack on myelin',laneB:'AMAN · attack on the axon at the node',laneB4:'AMSAN · motor and sensory axons',
  zoomT:'Close-up: one node of Ranvier',strip:'macrophage strips myelin',remy:'thin new myelin',hit:'antibodies and complement at the nodes',
  cord:'from spinal cord',muscle:'to muscle',mxT:'Which fibres are hit',mxM:'Motor',mxS:'Sensory',
  recT1:'Days to walk 5 m with help, median',recS1:'northern China',recT2:'Cannot walk alone at 6 months',recS2:'Japan',recN:'Group figures, not a forecast for one person.'};
const SB_ST=[['signal on time','signal on time'],['slowed, then blocked','healthy, for comparison'],['slowed or blocked','blocked at the nodes'],
  ['slowed or blocked','two possible courses'],['slowed or blocked','both axons degenerate'],['new thin myelin','fast or slow recovery']];
const SB_DUAL={3:['reversible conduction failure','axon breaks: Wallerian-like degeneration'],4:['motor axon','sensory axon'],5:['block lifted: fast recovery','regrowing axon: slow recovery']};
const SB_CAP=[['Sodium channels cluster in the node gap;','gangliosides stand on the membrane.'],
  ['AIDP: antibody and complement on the','Schwann cell surface; myelin is stripped.'],
  ['AMAN: IgG and complement on the axon','at the node; sodium channels are lost.'],
  ['The antibody clears and channels return','(animal model), or the axon breaks.']];
const SB_MX=[['AIDP','myelin','myelin'],['AMAN','axon','spared'],['AMSAN','axon','axon']];
const SB_REC=[[ ['AMAN',31,'31 days'],['AIDP',32,'32 days'] ],[ ['AMAN',14,'14% (6 of 44)'],['AIDP',6,'6% (2 of 33)'] ]];
const SB_LG=['antibody','complement pore','macrophage','node of Ranvier','sodium channel','impulse'];
/* cohorts: v = shares (demyelinating, axonal, other) as printed; d = dots out of 100 */
const SB_CATS=[['Demyelinating','AIDP pattern'],['Axonal','AMAN or AMSAN pattern'],['Other','equivocal, inexcitable, normal or unclassified']];
const SB_REG=[
 {id:'eu',b:'IGOS: Europe and the Americas, 573 studies',d:[55,6,39],l:['55%','6%','39%'],
  cap:'<b>International GBS Outcome Study (IGOS), first 1,000 inclusions.</b> Of 573 people with nerve studies in Europe and the Americas, 55% (312) were classed as demyelinating and 6% (33) as axonal. The 39% shown as other is the remainder, derived here [[Doets2018]].'},
 {id:'asia',b:'IGOS: Asia without Bangladesh, 65 studies',d:[45,6,49],l:['45%','6%','49%'],
  cap:'<b>IGOS, Asia excluding Bangladesh.</b> 45% (29 of 65) demyelinating and 6% (4 of 65) axonal; the other 49% is the remainder [[Doets2018]]. Only 65 Asian studies were analysed, and reviews report AMAN in 30–65% of people in Asia and Central and South America [[Kuwabara2013]].'},
 {id:'bd',b:'IGOS: Bangladesh, 94 studies',d:[40,36,24],l:['40%','36%','24%'],
  cap:'<b>IGOS, Bangladesh.</b> 40% (38 of 94) demyelinating and 36% (34 of 94) axonal, so demyelinating was still the most common subtype in every IGOS region. The commonest clinical variant there was pure motor, in 69% [[Doets2018]].'},
 {id:'trial',b:'Plasma Exchange/Sandoglobulin trial, 369 people',d:[69,3,28],l:['69%','3%','28%'],
  cap:'<b>The 1990s Plasma Exchange/Sandoglobulin trial.</b> 369 people tested within 15 days of onset and classed by Hadden\'s criteria: 69% demyelinating, 3% axonal, 3% inexcitable, 2% normal and 23% equivocal [[Hadden1998]]. In the same cohort 16% had pure motor GBS, more often with IgG anti-GM1 and preceding diarrhoea [[Hadden1998]].'},
 {id:'china',b:'Northern China, 1991–92, 129 people',d:[24,65,11],l:['24%','65%','11%'],
  cap:'<b>Northern China, 1991–92.</b> AMAN 65%, AIDP 24% and unclassifiable 11% [[Ho1995]]. The northern Chinese epidemics came mostly in summer, in children and young adults in rural areas [[McKhann1993]].'},
 {id:'japan',b:'Japan, 97 consecutive people',d:[34,45,21],l:['34%','45%','21%'],
  cap:'<b>Japan, 97 consecutive people.</b> AMAN 45%, AIDP 34% and unclassified 21% [[Hiraga2005]].'},
 {id:'spain',b:'Spain, 56 people, serial studies',d:[62,29,9],l:['62.5%','28.5%','9%'],
  cap:'<b>Spain, 56 consecutive people with serial studies.</b> 62.5% demyelinating, 28.5% axonal, 1.8% inexcitable, 1.8% equivocal and 5.4% normal [[Sedano2019]]. In an Italian series, serial studies moved people mostly from AIDP or equivocal to axonal [[Uncini2010]].'}
];
inits.subtypes=()=>{
  const svg=$('#sbSvg'),rg=$('#sbT');
  const tx=(x,y,s,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`;
  const INK='fill:var(--ink);font-weight:700';
  function legend(x,y,cols,dx,dy){let s='';
    SB_LG.forEach((l,i)=>{const cx=x+(i%cols)*dx,cy=y+Math.floor(i/cols)*dy;
      if(i===0)s+=antibody(cx+7,cy-14,12);
      else if(i===1)s+=mac(cx+7,cy-5,5);
      else if(i===2)s+=macrophage(cx+8,cy-5,8,{seed:3});
      else if(i===3)s+=`<rect x="${f1(cx+3)}" y="${f1(cy-12)}" width="8" height="12" rx="2" style="fill:var(--node)"/>`;
      else if(i===4)s+=`<rect x="${f1(cx+4)}" y="${f1(cy-12)}" width="5" height="12" rx="2" style="fill:var(--nav);stroke:var(--ink);stroke-width:.8"/>`;
      else s+=`<circle cx="${f1(cx+7)}" cy="${f1(cy-6)}" r="6" style="fill:var(--impulse);stroke:var(--ink);stroke-width:1"/>`;
      s+=tx(cx+20,cy-2,l)});
    return s}
  function matrix(x,y,w){let s=tx(x,y,SB_TX.mxT,'t-lbl');const c1=x+w*.47,c2=x+w*.81;
    s+=tx(c1,y+28,SB_TX.mxM,'t-sm t-mid',INK)+tx(c2,y+28,SB_TX.mxS,'t-sm t-mid',INK);
    SB_MX.forEach((r,i)=>{const yy=y+44+i*36;
      s+=`<rect x="${f1(x-4)}" y="${f1(yy-2)}" width="${f1(w+4)}" height="32" rx="8" style="fill:${i===2?'var(--panel-2)':'none'}"/>`;
      s+=tx(x+4,yy+19,r[0],'t-lbl');
      [r[1],r[2]].forEach((v,j)=>{const cx=j?c2:c1,fill=v==='myelin'?'var(--brand-soft)':v==='axon'?'var(--warn-soft)':'var(--panel)',col=v==='myelin'?'var(--brand)':v==='axon'?'var(--warn)':'var(--muted)';
        s+=`<rect x="${f1(cx-34)}" y="${f1(yy+3)}" width="68" height="22" rx="6" style="fill:${fill};stroke:var(--line)"/>`+tx(cx,yy+18,v,'t-sm t-mid',`fill:${col};font-weight:700`)})});
    return s}
  function recovery(x,y,w){let s='';const bx=x+52,bw=w-52-104;
    [[SB_TX.recT1,SB_TX.recS1,40],[SB_TX.recT2,SB_TX.recS2,20]].forEach(([tt,sb,mx],k)=>{const yy=y+k*96;
      s+=tx(x,yy,tt,'t-lbl')+tx(x,yy+15,sb,'t-xs');
      SB_REC[k].forEach((r,i)=>{const by=yy+26+i*24,ww=bw*r[1]/mx;
        s+=tx(x,by+12,r[0],'t-sm',INK)+`<rect x="${f1(bx)}" y="${f1(by)}" width="${f1(ww)}" height="16" rx="4" style="fill:${i?'var(--brand)':'var(--accent)'};opacity:.85"/>`+tx(bx+ww+6,by+12,r[2],'t-sm')})});
    return s+tx(x,y+196,SB_TX.recN,'t-xs')}
  function draw(t){
    const N=vb(svg,'720 352','400 690'),p=phaseOf(SB_STEPS,t);
    const L=N?{fx:12,fw:376,aT:24,aS:40,aY:100,bT:176,bS:192,bY:258,bY1:250,bY2:312,px:12,py:350,pw:376,zx:50,zy:366,zs:1,cy:578,lx:14,ly:640,lc:3,ldx:128,ldy:28}
             :{fx:16,fw:424,aT:24,aS:24,aY:88,bT:166,bS:166,bY:232,bY1:214,bY2:276,px:468,py:24,pw:236,zx:468,zy:40,zs:.787,cy:212,lx:16,ly:340,lc:6,ldx:118,ldy:0};
    const ph=(t*30)%1,st=SB_ST[p];
    let s='';
    /* orientation */
    s+=tx(L.fx,N?L.aY+52:L.aY+50,SB_TX.cord,'t-xs')+tx(L.fx+L.fw,N?L.aY+52:L.aY+50,SB_TX.muscle,'t-xs t-end');
    /* lane A: AIDP */
    const aD=ramp(t,.17,.3),rm=ramp(t,.86,.97),aMac=ramp(t,.19,.26)*(1-rm),dimA=p>=2&&p<=4?.55:0;
    s+=tx(L.fx,L.aT,SB_TX.laneA,'t-lbl',p===1||p===5?'fill:var(--brand)':'');
    s+=N?tx(L.fx,L.aS,st[0],'t-sm'):tx(L.fx+L.fw,L.aT,st[0],'t-sm t-end');
    const A=nerveFibre(L.fx,L.aY,L.fw,{n:5,h:34,demy:[aD*.35,aD,aD*.9,aD*.25,0],mac:[0,aMac,aMac*.8,0,0],remy:[rm*.6,rm,rm,rm*.5,0],
      pulse:ph,snap:aD<.3||rm>.6,block:aD>.7&&rm<.6?1:undefined,dim:dimA});
    s+=A.svg;
    if(p>=1&&p<=4&&aMac>.3)s+=kitLabel((A.at.nodes[2][0]+A.at.nodes[3][0])/2,L.aY+36,SB_TX.strip,{a:'m'});
    if(p===5&&rm>.3)s+=kitLabel((A.at.nodes[1][0]+A.at.nodes[2][0])/2,L.aY+36,SB_TX.remy,{a:'m'});
    /* lane B: AMAN, then two courses, AMSAN, recovery */
    const nh=ramp(t,.35,.46),dimB=p===1?.55:0,pat=v=>[0,v*.6,v,v,v*.6,0];
    s+=tx(L.fx,L.bT,p===4?SB_TX.laneB4:SB_TX.laneB,'t-lbl',p>=2&&p<=4?'fill:var(--warn)':'');
    s+=N?tx(L.fx,L.bS,st[1],'t-sm'):tx(L.fx+L.fw,L.bT,st[1],'t-sm t-end');
    if(p<=2){const B=nerveFibre(L.fx,L.bY,L.fw,{n:5,h:34,nodeHit:pat(nh),pulse:ph,block:nh>.6?1:undefined,dim:dimB});
      s+=B.svg;if(p===2&&nh>.3)s+=kitLabel(B.at.nodes[2][0],L.bY+34,SB_TX.hit,{a:'m'})}
    else{const lab=SB_DUAL[p];let o1,o2;
      if(p===3){const clr=1-ramp(t,.58,.66),cutOn=ramp(t,.55,.6)>.5;
        o1={nodeHit:pat(clr),block:clr>.5?1:undefined};
        o2={nodeHit:pat(cutOn?.4:1),cut:cutOn?.44:null,block:cutOn?2:1}}
      else if(p===4){o1={nodeHit:pat(.3),cut:.44,block:2};o2={nodeHit:pat(.3),cut:.44,block:2,demy:0}}
      else{o1={nodeHit:pat(0)};o2={cut:.44,regrow:ramp(t,.87,1),block:2}}
      [[L.bY1,o1,lab[0]],[L.bY2,o2,lab[1]]].forEach(([yy,o,lb])=>{s+=tx(L.fx,yy-30,lb,'t-sm',INK)+nerveFibre(L.fx,yy,L.fw,Object.assign({n:5,h:26,pulse:ph},o)).svg})}
    /* side panel */
    if(p<=3){const zo=p===0?{mode:'aman'}:p===1?{mode:'aidp',ab:ramp(t,.17,.21),c3:ramp(t,.2,.24),mac:ramp(t,.23,.31)}
        :p===2?{mode:'aman',ab:ramp(t,.35,.39),c3:ramp(t,.38,.42),nav:ramp(t,.41,.47),mac:ramp(t,.45,.51)}
        :{mode:'aman',ab:1-ramp(t,.58,.66),c3:1-ramp(t,.58,.66),nav:1-ramp(t,.6,.68)};
      zo.labels=true;
      s+=tx(L.px,L.py,SB_TX.zoomT,'t-lbl');
      s+=`<rect x="${f1(L.zx-2)}" y="${f1(L.zy-2)}" width="${f1(300*L.zs+4)}" height="${f1(190*L.zs+4)}" rx="8" style="fill:var(--field);stroke:var(--line)"/>`;
      s+=nodeZoom(L.zx,L.zy,L.zs,zo).svg;
      SB_CAP[p].forEach((c,i)=>{s+=tx(L.px,L.cy+i*15,c,'t-xs')})}
    else if(p===4)s+=matrix(L.px,L.py,L.pw);
    else s+=recovery(L.px,L.py,L.pw);
    s+=legend(L.lx,L.ly,L.lc,L.ldx,L.ldy);
    svg.innerHTML=s;
    setSt(p);$('#sbNote').innerHTML=noteHTML(SB_STEPS[p]);
  }
  const stop=playWire(rg,$('#sbPlay'),draw,16000,'%t:player.replay%','subtypes');
  const setSt=stepWire($('#sbSteps'),SB_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- cohorts: 100 dots ---------- */
  const rs=$('#sbReg'),rc=$('#sbRegCap');let rCur='eu',rPrev='eu',rq=1,rStop=null;
  const cats=d=>{const a=[];for(let i=0;i<100;i++)a.push(i<d[0]?0:i<d[0]+d[1]?1:2);return a};
  function dot(cx,cy,k,r=7){
    if(k===0)return `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r)}" style="fill:var(--brand)"/>`;
    if(k===1)return `<rect x="${f1(cx-r*.75)}" y="${f1(cy-r*.75)}" width="${f1(r*1.5)}" height="${f1(r*1.5)}" transform="rotate(45 ${f1(cx)} ${f1(cy)})" style="fill:var(--accent)"/>`;
    return `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r*.72)}" style="fill:none;stroke:var(--muted);stroke-width:1.6"/>`}
  function drawReg(){const N=vb(rs,'720 250','400 450'),D=SB_REG.find(d=>d.id===rCur),P=SB_REG.find(d=>d.id===rPrev);
    const ca=cats(D.d),cp=cats(P.d),G=N?{x:100,y:44}:{x:24,y:40},R=N?{x:12,y:282,w:376}:{x:268,y:66,w:436};
    let s=tx(N?12:24,22,D.b,'t-lbl');
    for(let i=0;i<100;i++){const c=i%10,r=Math.floor(i/10),k=i<rq*100?ca[i]:cp[i];s+=dot(G.x+c*20+10,G.y+r*20+10,k)}
    SB_CATS.forEach((c,k)=>{const yy=R.y+k*58;
      s+=dot(R.x+8,yy-5,k,7)+tx(R.x+24,yy+2,D.l[k],'t-big','font-size:20px');
      s+=tx(R.x+96,yy-4,c[0],'t-lbl')+tx(R.x+96,yy+10,c[1],'t-xs');
      const bw=(R.w-96)*D.d[k]/100;s+=`<rect x="${f1(R.x+96)}" y="${f1(yy+17)}" width="${f1(R.w-96)}" height="7" rx="3.5" style="fill:var(--panel-2)"/><rect x="${f1(R.x+96)}" y="${f1(yy+17)}" width="${f1(bw)}" height="7" rx="3.5" style="fill:${k===0?'var(--brand)':k===1?'var(--accent)':'var(--muted)'}"/>`});
    rs.innerHTML=s;rc.innerHTML=D.cap;
    $$('[data-sbreg]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.sbreg===rCur))}
  $$('[data-sbreg]').forEach(b=>b.addEventListener('click',()=>{if(b.dataset.sbreg===rCur)return;if(rStop)rStop();
    rPrev=rCur;rCur=b.dataset.sbreg;rq=0;rStop=animate(800,u=>{rq=ease(u);drawReg()},()=>{rStop=null;rPrev=rCur})}));
  const prevR=redraws.subtypes;redraws.subtypes=()=>{prevR&&prevR();drawReg()};
  drawReg();
};
