/* =============== 2.4 Nerve conduction studies =============== */
/* Main scene: a median-nerve study (arm, oscilloscope, readout) through six steps, with three sets of trace values.
   Second scene: a one-nerve criteria explorer (Hadden against Rajabally). Numbers from research pass C. */
const NC_STEPS=[
 {from:0,at:.1,k:'Step 1 · distal',t:'Stimulate at the wrist',
  txt:'A brief pulse at the wrist fires the motor fibres of the median nerve, and an electrode over the thumb muscles records the compound muscle action potential (CMAP). The distal motor latency (DML) is the time to its onset, and its height is the amplitude. In one published reference chart, the median nerve DML upper limit is 4.5 ms and the amplitude lower limit 4.1 mV; the lower limit falls with age, from 5.9 mV at 19–39 years to 3.8 mV at 60–79 [[Chen2016NCSRef]]. In the Korean first studies, median DML was 4.0 ms in axonal GBS and 5.7 ms in AIDP [[Koo2016]].',
  pt:'A nerve test sends small electric pulses along a nerve and measures the response.',
  hook:'The most common demyelinating feature in IGOS was a prolonged DML, in 55.6% of people [[Arends2024]].'},
 {from:.2,at:.3,k:'Step 2 · proximal',t:'Stimulate at the elbow: velocity',
  txt:'A pulse at the elbow gives a later response. The distance between the two sites divided by the difference in latency is the conduction velocity: over 250 mm, 50 m/s takes 5.0 ms and 35 m/s takes 7.1 ms (arithmetic, with the distance chosen for this demo) [[Chen2016NCSRef]]. The median motor velocity lower limit in the reference chart is 49 m/s [[Chen2016NCSRef]]. The Korean medians were 51.2 m/s in axonal GBS and 43.8 m/s in AIDP [[Koo2016]].',
  pt:'The test times how long the signal takes between two points. Where the insulation is damaged, the signal is slower.',
  hook:'Hadden demyelinating velocity: under 90% of the lower limit, or under 85% if the distal CMAP is below half the lower limit, in at least two nerves [[Arends2024]].'},
 {from:.38,at:.46,k:'Step 3 · compare',t:'Block and dispersion',
  txt:'If the elbow response is much smaller than the wrist response, some fibres are blocked in between. Hadden counts a proximal-to-distal ratio under 0.5 (with a distal CMAP of at least 20% of the lower limit) as demyelinating; Rajabally uses 0.7, but only alongside a demyelinating feature in another nerve [[Arends2024]]. The ratio is unreliable when the distal CMAP is under 1 mV [[Berciano2020]]. A longer, lower response means fibres arrive out of step (temporal dispersion): proximal duration was 9.8 ms in AIDP against 6.4 ms in axonal GBS [[Koo2016]]. Block does not prove demyelination: reversible block is common in AMAN [[Kokubun2010]].',
  pt:'If fewer signals arrive from the elbow than from the wrist, something between the two points is blocking the way.',
  hook:'Hadden block: proximal-to-distal ratio under 0.5, with a distal CMAP at least 20% of the lower limit [[Arends2024]].'},
 {from:.55,at:.63,k:'Step 4 · late responses',t:'F waves: a round trip to the cord',
  txt:'Part of the pulse runs back up to the spinal cord, re-fires a few motor neurons and returns as a small, late F wave, so it tests the proximal nerve and roots, where GBS lesions often start [[Berciano2017Proximal]]. In the first week (31 people), an absent H reflex (97%) and abnormal F waves (84%) were the commonest abnormalities [[Gordon2001]]. Hadden counts an F-wave latency over 120% of the upper limit as demyelinating [[Arends2024]]. Multiple A waves were seen in 13 of 14 people in the first week [[Kornhuber1999]].',
  pt:'Part of the test checks the signal\'s trip up to the spinal cord and back. That is often the first part to look abnormal.',
  hook:'Earliest sensitive signs are in late responses: absent H reflex 97%, abnormal F wave 84% in the first week [[Gordon2001]].'},
 {from:.7,at:.78,k:'Step 5 · sensory',t:'Sensory nerves and sural sparing',
  txt:'Sensory nerve action potentials (SNAPs) come from sensory fibres. The sural sparing pattern is an abnormal arm SNAP with a normal sural SNAP: against 38 mimics it was the most specific feature, with ulnar-sural specificity 0.95 and sensitivity 0.41 at one centre [[Derksen2014]]. In the Korean medians, the ulnar SNAP was 14.0 µV in axonal GBS and 1.8 µV in AIDP, while the sural was similar [[Koo2016]]. Reference lower limits: median 11, ulnar 10, sural 4 µV [[Chen2016NCSRef]]. The pattern also occurs in axonal GBS and MFS [[Umapathi2015]].',
  pt:'The test also checks nerves that carry feeling. In GBS the arm nerves can be hit while a nerve at the ankle is spared.',
  hook:'Sural sparing is specific (about 0.9) but insensitive (about 0.3 to 0.4) [[Derksen2014]].'},
 {from:.86,at:.94,k:'Step 6 · repeat',t:'A second study, weeks later',
  txt:'Studies in the first week can be normal, and a repeat 2–3 weeks later can help [[Leonhard2019]]. In IGOS, 37.0% of people with a normal or equivocal first study showed polyneuropathy on the second (Hadden), and subtype changed in 37.8% [[Arends2026]]. Reversible conduction failure is defined at the second study: one proposal needs, for example, a 50% rise in distal amplitude [[Chan2017]]. AIDP distal latencies tend to rise during the acute phase [[Shahrizaila2011]]. The second-study traces here are schematic.',
  pt:'A normal nerve test in the first days does not rule out GBS. The test may be repeated, and the label for your type can change.',
  hook:'Normal nerve studies in the first week do not exclude GBS [[Leonhard2019]].'}
];
/* trace values: Koo 2016 medians (aidp, axonal); rcf and every "b" (second study) are schematic, chosen for the demo */
const NC_PAT={
 aidp:{lab:'Traces: AIDP group medians (Koo 2016)',dl:5.7,cv:43.8,dA:3.5,pA:3.0,dD:8.4,pD:9.8,snap:[5.3,1.8,15.6],b:{dl:6.6,dA:3.4,dD:9}},
 axonal:{lab:'Traces: axonal GBS group medians (Koo 2016)',dl:4.0,cv:51.2,dA:3.9,pA:3.5,dD:6.2,pD:6.4,snap:[18.3,14.0,13.5],b:{dl:4.0,dA:2.5,dD:6.2}},
 rcf:{lab:'Traces: reversible block, schematic values',dl:4.0,cv:51.2,dA:2.0,pA:0.9,dD:6.2,pD:6.4,snap:[18.3,14.0,13.5],b:{dl:4.0,dA:3.2,dD:6.2,pA:3.0}}};
const NC_REF={dml:4.5,amp:4.1,cv:49,snap:[11,10,4],dist:250};
const NC_TX={cord:'spinal cord',elbow:'elbow',wrist:'wrist',rec:'recording: thumb muscles',dist:'250 mm (demo distance)',
  scope:'muscle response',ms:'ms after the pulse',mv:'mV',limA:'lower limit 4.1 mV',limL:'DML limit 4.5',
  dTr:'wrist',pTr:'elbow',first:'1st study',second:'2nd study (schematic)',lat:'difference in latency',latT:'distal motor latency',amp:'amplitude',dur:'duration',
  fT:'F waves: four sweeps (schematic, no scale)',fM:'M',fF:'F',fAx:'time (schematic)',
  sT:'Sensory responses (SNAP), µV',sNames:['median','ulnar','sural'],lim:'limit',
  roT:'Readout',
  rows:{dml:'Distal motor latency',amp:'Distal amplitude',cv:'Conduction velocity',rat:'Proximal / distal amplitude',dur:'Duration, distal / proximal',
    h:'Absent H reflex, first week',f:'Abnormal F waves, first week',fr:'Hadden F-wave rule',sn:['Median SNAP','Ulnar SNAP','Sural SNAP'],ch:'Distal amplitude, 1st to 2nd',chp:'Change'},
  lims:{dml:'upper limit 4.5 ms',amp:'lower limit 4.1 mV',cv:'lower limit 49 m/s',rat:'Hadden block: under 0.5',dur:'no cut-off shown',h:'Gordon 2001, 31 people',f:'Gordon 2001, 31 people',fr:'over 120% of upper limit',sn:['lower limit 11 µV','lower limit 10 µV','lower limit 4 µV'],ch:'',chp:'Chan 2017: rise of 50% or more'},
  st:{ok:'within limit',hi:'beyond limit',lo:'below limit',blk:'block by Hadden',nob:'no Hadden block',meet:'meets the 50% rise',miss:'no 50% rise',none:''}};
/* criteria explorer */
const NC_PRE={aidp:{dml:5.7,mcv:43.8,amp:3.5,rat:.86},axonal:{dml:4.0,mcv:51.2,amp:3.9,rat:.9},block:{dml:4.0,mcv:51.2,amp:2.0,rat:.45},tiny:{dml:4.2,mcv:50,amp:.6,rat:.9}};
const NC_CR={feat:['Distal motor latency','Conduction velocity','Proximal / distal ratio','Distal CMAP amplitude'],
  on:'demyelinating feature',off:'not met',na:'not assessable: distal CMAP under 20% of the lower limit',
  rOnly:'counts only with a demyelinating feature in another nerve',ax:'axonal feature, if no demyelinating feature',unob:'unobtainable: under 10% of the lower limit',
  rAx:'Rajabally axonal rules not modelled here',
  sum:{hD:'<b>Hadden:</b> this nerve has at least one demyelinating feature. The criteria need one in at least two nerves [[Arends2024]].',
    hA:'<b>Hadden:</b> a small response without demyelinating features counts towards axonal, which needs at least two nerves [[Arends2024]].',
    hU:'<b>Hadden:</b> the response is unobtainable; one demyelinating feature in one nerve is allowed in the axonal class when the distal CMAP is under 10% of the lower limit [[Arends2024]].',
    hN:'<b>Hadden:</b> no demyelinating or axonal feature in this nerve.',
    rD:'<b>Rajabally:</b> this nerve has a demyelinating feature by its stricter cut-offs (latency over 150% of the upper limit, velocity under 70% of the lower limit) [[Arends2024]].',
    rN:'<b>Rajabally:</b> no demyelinating feature by its stricter cut-offs [[Arends2024]].'},
  sc:[{lab:'Distal motor latency',u:'ms',mn:2,mx:10,f:2},{lab:'Conduction velocity',u:'m/s',mn:20,mx:65,f:1},{lab:'Distal CMAP amplitude',u:'mV',mn:0,mx:8,f:2},{lab:'Proximal / distal ratio',u:'',mn:0,mx:1.2,f:2}],
  mk:{uln:'ULN 4.5',lln:'LLN 49',llnA:'LLN 4.1',h:'Hadden',r:'Rajabally',p80:'80%',p50:'50%',p20:'20%',p10:'10%'}};
inits.ncs=()=>{
  const svg=$('#ncSvg'),rg=$('#ncT');let pat='aidp';
  const tx=(x,y,s,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`;
  const INK='fill:var(--ink);font-weight:700';
  /* a CMAP: negative-up biphasic wave, onset L ms, amplitude A mV, duration D ms */
  const cmap=(ms,L,A,D)=>{const u=(ms-L)/D;if(u<0||u>1)return 0;return u<.45?A*Math.sin(Math.PI*u/.45):-A*.35*Math.sin(Math.PI*(u-.45)/.55)};
  function arm(A,f){/* f: {stim:'wrist'|'elbow'|null, pos:[x,y]|null} */
    let s='';const y=A.y;
    s+=`<rect x="${f1(A.c0)}" y="${f1(y-30)}" width="${f1(A.c1-A.c0)}" height="60" rx="8" style="fill:var(--panel-2);stroke:var(--line)"/>`+tx(A.c0,y+46,NC_TX.cord,'t-xs');
    const armD=`M${f1(A.sh)} ${f1(y-4)}L${f1(A.el)} ${f1(y+4)}L${f1(A.wr)} ${f1(y+4)}`;
    s+=`<path d="${armD}" style="fill:none;stroke:var(--ink);stroke-width:${A.th+2};stroke-linecap:round;stroke-linejoin:round"/><path d="${armD}" style="fill:none;stroke:var(--skin);stroke-width:${A.th};stroke-linecap:round;stroke-linejoin:round"/>`;
    s+=`<ellipse cx="${f1(A.hc)}" cy="${f1(y+6)}" rx="${f1(A.hr)}" ry="${f1(A.th*.62)}" style="fill:var(--skin);stroke:var(--ink);stroke-width:1"/><ellipse cx="${f1(A.hc+A.hr*.3)}" cy="${f1(y-A.th*.55)}" rx="7" ry="${f1(A.th*.4)}" transform="rotate(28 ${f1(A.hc+A.hr*.3)} ${f1(y-A.th*.55)})" style="fill:var(--skin);stroke:var(--ink);stroke-width:1"/>`;
    s+=`<path d="M${f1(A.c1)} ${f1(y)}L${f1(A.el)} ${f1(y+6)}L${f1(A.wr)} ${f1(y+6)}L${f1(A.hc-6)} ${f1(y+2)}" style="fill:none;stroke:var(--axon-line);stroke-width:3;stroke-linejoin:round"/>`;
    /* recording electrode */
    s+=`<circle cx="${f1(A.hc-6)}" cy="${f1(y+2)}" r="6" style="fill:var(--device);stroke:var(--ink)"/><path d="M${f1(A.hc-6)} ${f1(y-4)}V${f1(y-A.th)}" style="stroke:var(--device);stroke-width:2"/>`+tx(A.hc-6,y-A.th-6,NC_TX.rec,'t-xs t-mid');
    /* stimulators */
    [[A.el,NC_TX.elbow,'elbow'],[A.wr,NC_TX.wrist,'wrist']].forEach(([sx,lb,k])=>{const on=f.stim===k;
      s+=`<rect x="${f1(sx-14)}" y="${f1(y+A.th*.5+6)}" width="28" height="12" rx="4" style="fill:${on?'var(--accent)':'var(--panel-2)'};stroke:var(--ink);stroke-width:1"/><path d="M${f1(sx-6)} ${f1(y+A.th*.5+6)}V${f1(y+8)}M${f1(sx+6)} ${f1(y+A.th*.5+6)}V${f1(y+8)}" style="stroke:var(--ink);stroke-width:1.4"/>`;
      if(on)s+=`<path d="M${f1(sx+18)} ${f1(y+A.th*.5+4)}l6 6h-5l6 7" style="fill:none;stroke:var(--accent);stroke-width:2"/>`;
      s+=tx(sx,y+A.th*.5+32,lb,'t-sm t-mid',on?INK:'')});
    /* distance bracket */
    const by=y-A.th*.5-12;s+=`<path d="M${f1(A.el)} ${f1(by+5)}V${f1(by)}H${f1(A.wr)}V${f1(by+5)}" style="fill:none;stroke:var(--muted);stroke-width:1.2"/>`+tx((A.el+A.wr)/2,by-5,NC_TX.dist,'t-xs t-mid');
    if(f.pos)s+=`<circle cx="${f1(f.pos[0])}" cy="${f1(f.pos[1])}" r="9" style="fill:var(--impulse);opacity:.4"/><circle cx="${f1(f.pos[0])}" cy="${f1(f.pos[1])}" r="5" style="fill:var(--impulse);stroke:var(--ink)"/>`;
    return s}
  /* point along the nerve from a to b (x positions), straight segments at the nerve's height */
  const nvY=(A,x)=>x<=A.el?lerp(A.y,A.y+6,(x-A.c1)/(A.el-A.c1)):x<=A.wr?A.y+6:lerp(A.y+6,A.y+2,(x-A.wr)/(A.hc-6-A.wr));
  const along=(A,a,b,u)=>{const x=lerp(a,b,clamp(u));return [x,nvY(A,x)]};
  function scope(S,P,step,u){let s='';const X=ms=>S.x+S.w*ms/24,Y=mv=>S.y+S.h-40-(S.h-60)*mv/6;
    s+=`<rect x="${f1(S.x)}" y="${f1(S.y)}" width="${f1(S.w)}" height="${f1(S.h)}" rx="6" style="fill:var(--field);stroke:var(--line)"/>`;
    const base=Y(0);s+=`<line x1="${f1(S.x)}" x2="${f1(S.x+S.w)}" y1="${f1(base)}" y2="${f1(base)}" class="axis"/>`;
    for(let v=0;v<=24;v+=4)s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${f1(S.y+S.h-5)}" y2="${f1(S.y+S.h)}" class="axis"/>`+tx(X(v),S.y+S.h+12,v,'t-xs t-mid');
    s+=tx(S.x+S.w,S.y+S.h+26,NC_TX.ms,'t-xs t-end');
    [2,4,6].forEach(v=>{s+=`<line x1="${f1(S.x)}" x2="${f1(S.x+S.w)}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/>`+tx(S.x-4,Y(v)+3,v,'t-xs t-end')});
    s+=tx(S.x-4,S.y+10,NC_TX.mv,'t-xs t-end');
    const path=(L,A,D,upto,col,w,dash)=>{let d='';for(let ms=0;ms<=upto+1e-6;ms+=.1)d+=(ms?'L':'M')+f1(X(ms))+' '+f1(Y(cmap(ms,L,A,D)));return `<path d="${d}" style="fill:none;stroke:${col};stroke-width:${w};stroke-linejoin:round${dash?';stroke-dasharray:'+dash:''}"/>`};
    const pl=P.dl+NC_REF.dist/P.cv;
    if(step===0){const up=24*clamp(u/.8);
      s+=`<line x1="${f1(X(NC_REF.dml))}" x2="${f1(X(NC_REF.dml))}" y1="${f1(S.y+6)}" y2="${f1(base)}" class="grid"/>`+tx(X(NC_REF.dml)+3,S.y+14,NC_TX.limL,'t-xs');
      s+=`<line x1="${f1(S.x)}" x2="${f1(S.x+S.w)}" y1="${f1(Y(NC_REF.amp))}" y2="${f1(Y(NC_REF.amp))}" style="stroke:var(--warn);stroke-width:1;stroke-dasharray:4 3"/>`+tx(S.x+S.w-4,Y(NC_REF.amp)-4,NC_TX.limA,'t-xs t-end');
      s+=path(P.dl,P.dA,P.dD,up,'var(--dx)',2.4);
      if(up>P.dl+P.dD*.45){const px=X(P.dl+P.dD*.225);
        const ly=S.y+S.h-12;s+=`<path d="M${f1(X(0))} ${f1(ly)}H${f1(X(P.dl))}M${f1(X(P.dl))} ${f1(ly-4)}V${f1(ly+4)}" style="stroke:var(--ink);stroke-width:1.4"/>`+tx(X(P.dl)+5,ly+3,NC_TX.latT,'t-xs');
        s+=`<path d="M${f1(px+16)} ${f1(base)}V${f1(Y(P.dA))}" style="stroke:var(--ink);stroke-width:1.4"/>`+tx(px+20,(base+Y(P.dA))/2,NC_TX.amp,'t-xs')}}
    else if(step===1||step===2){const up=step===1?24*clamp(u/.8):24;
      s+=path(P.dl,P.dA,P.dD,24,'var(--dx)',step===1?1.4:2.4,step===1?'4 3':'');
      s+=path(pl,P.pA,P.pD,up,'var(--accent)',2.4);
      s+=tx(X(P.dl+P.dD*.2)-6,Y(P.dA)-6,NC_TX.dTr,'t-xs t-end','fill:var(--dx);font-weight:700');
      if(up>pl+1)s+=tx(X(pl+P.pD*.2)+6,Y(P.pA)-6,NC_TX.pTr,'t-xs','fill:var(--accent);font-weight:700');
      if(step===1&&up>pl){const yy=S.y+22;s+=`<path d="M${f1(X(P.dl))} ${f1(yy)}H${f1(X(pl))}" style="stroke:var(--ink);stroke-width:1.4"/><path d="M${f1(X(P.dl))} ${f1(yy-4)}V${f1(yy+4)}M${f1(X(pl))} ${f1(yy-4)}V${f1(yy+4)}" style="stroke:var(--ink);stroke-width:1.4"/>`+tx(X(pl)+6,yy+3,NC_TX.lat,'t-xs')}
      if(step===2){s+=tx(X(P.dl)-6,S.y+28,NC_TX.dur,'t-xs t-end');[[P.dl,P.dD,'var(--dx)',S.y+18],[pl,P.pD,'var(--accent)',S.y+28]].forEach(([L,D,c,yy])=>{s+=`<path d="M${f1(X(L))} ${f1(yy)}H${f1(X(L+D))}" style="stroke:${c};stroke-width:4;stroke-linecap:round"/>`})}}
    else if(step===5){const B=P.b;
      s+=path(P.dl,P.dA,P.dD,24,'var(--dx)',1.6,'4 3')+path(B.dl,B.dA,B.dD,24*clamp(u/.8),'var(--brand)',2.6);
      s+=tx(S.x+8,S.y+16,NC_TX.first,'t-xs','fill:var(--dx);font-weight:700')+tx(S.x+8,S.y+29,NC_TX.second,'t-xs','fill:var(--brand);font-weight:700')}
    return s}
  function fwave(S,u){let s=`<rect x="${f1(S.x)}" y="${f1(S.y)}" width="${f1(S.w)}" height="${f1(S.h)}" rx="6" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=tx(S.x+8,S.y+16,NC_TX.fT,'t-xs',INK);const rr=rng(5),rows=4,rh=(S.h-50)/rows,up=clamp(u/.85);
    for(let r=0;r<rows;r++){const by=S.y+36+rh*(r+.6),fl=.62+rr()*.06,fa=.25+rr()*.25,show=up>r/rows;if(!show)continue;
      let d='';for(let i=0;i<=200;i++){const x=i/200,v=Math.exp(-Math.pow((x-.1)/.025,2))*1-Math.exp(-Math.pow((x-.14)/.03,2))*.4+Math.exp(-Math.pow((x-fl)/.02,2))*fa-Math.exp(-Math.pow((x-fl-.035)/.02,2))*fa*.6;
        d+=(i?'L':'M')+f1(S.x+10+x*(S.w-20))+' '+f1(by-v*rh*.55)}
      s+=`<path d="${d}" style="fill:none;stroke:var(--dx);stroke-width:1.6"/>`}
    s+=tx(S.x+10+.1*(S.w-20),S.y+S.h-8,NC_TX.fM,'t-sm t-mid',INK)+tx(S.x+10+.65*(S.w-20),S.y+S.h-8,NC_TX.fF,'t-sm t-mid',INK)+tx(S.x+S.w-6,S.y+S.h+14,NC_TX.fAx,'t-xs t-end');
    return s}
  function snaps(S,P,u){let s=`<rect x="${f1(S.x)}" y="${f1(S.y)}" width="${f1(S.w)}" height="${f1(S.h)}" rx="6" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=tx(S.x+8,S.y+16,NC_TX.sT,'t-xs',INK);const bw=S.w/3,base=S.y+S.h-24,Y=v=>base-(S.h-60)*v/20,g=ease(clamp(u/.6));
    P.snap.forEach((v,i)=>{const cx=S.x+bw*(i+.5),lim=NC_REF.snap[i],low=v<lim;
      s+=`<rect x="${f1(cx-22)}" y="${f1(Y(v*g))}" width="44" height="${f1(base-Y(v*g))}" rx="4" style="fill:${low?'var(--warn)':'var(--dx)'};opacity:.8"/>`;
      s+=`<line x1="${f1(cx-34)}" x2="${f1(cx+34)}" y1="${f1(Y(lim))}" y2="${f1(Y(lim))}" style="stroke:var(--ink);stroke-width:1.6;stroke-dasharray:4 3"/>`+tx(cx+36,Y(lim)+3,NC_TX.lim,'t-xs');
      s+=tx(cx,Y(v*g)-6,(v*g).toFixed(1),'t-sm t-mid',INK)+tx(cx,base+14,NC_TX.sNames[i],'t-sm t-mid')});
    return s}
  function readout(R,P,step){const T=NC_TX,rw=[],st=T.st,fx=(v,d=1)=>v.toFixed(d);
    if(step<=2||step===5){rw.push([T.rows.dml,fx(P.dl)+' ms',T.lims.dml,P.dl>NC_REF.dml?st.hi:st.ok,P.dl>NC_REF.dml]);
      rw.push([T.rows.amp,fx(P.dA)+' mV',T.lims.amp,P.dA<NC_REF.amp?st.lo:st.ok,P.dA<NC_REF.amp])}
    if(step===1||step===2)rw.push([T.rows.cv,fx(P.cv)+' m/s',T.lims.cv,P.cv<NC_REF.cv?st.lo:st.ok,P.cv<NC_REF.cv]);
    if(step===2){const r=P.pA/P.dA;rw.push([T.rows.rat,fx(r,2),T.lims.rat,r<.5&&P.dA>=.82?st.blk:st.nob,r<.5]);rw.push([T.rows.dur,fx(P.dD)+' / '+fx(P.pD)+' ms',T.lims.dur,st.none,false])}
    if(step===3){rw.push([T.rows.h,'97%',T.lims.h,st.none,false]);rw.push([T.rows.f,'84%',T.lims.f,st.none,false]);rw.push([T.rows.fr,'',T.lims.fr,st.none,false])}
    if(step===4)P.snap.forEach((v,i)=>{rw.push([T.rows.sn[i],fx(v)+' µV',T.lims.sn[i],v<NC_REF.snap[i]?st.lo:st.ok,v<NC_REF.snap[i]])});
    if(step===5){const B=P.b,ch=(B.dA-P.dA)/P.dA*100;rw.length=0;
      rw.push([T.rows.dml,fx(P.dl)+' → '+fx(B.dl)+' ms',T.lims.dml,B.dl>NC_REF.dml?st.hi:st.ok,B.dl>NC_REF.dml]);
      rw.push([T.rows.ch,fx(P.dA)+' → '+fx(B.dA)+' mV',T.lims.ch,st.none,false]);
      rw.push([T.rows.chp,(ch>=0?'+':'')+Math.round(ch)+'%',T.lims.chp,ch>=50?st.meet:st.miss,ch<50])}
    let s=tx(R.x,R.y,T.roT,'t-lbl');
    rw.forEach((r,i)=>{const yy=R.y+12+i*R.dy;
      s+=`<rect x="${f1(R.x)}" y="${f1(yy)}" width="${f1(R.w)}" height="${f1(R.dy-5)}" rx="7" style="fill:${r[4]?'var(--warn-soft)':'var(--panel-2)'}"/>`;
      s+=tx(R.x+8,yy+13,r[0],'t-xs',INK)+tx(R.x+8,yy+32,r[1],'t-big','font-size:15px');
      s+=tx(R.x+R.w-8,yy+25,r[3],'t-xs t-end',r[4]?'fill:var(--warn);font-weight:700':'fill:var(--good);font-weight:700')+tx(R.x+R.w-8,yy+35,r[2],'t-xs t-end')});
    return s}
  function draw(t){
    const N=vb(svg,'720 440','400 690'),p=phaseOf(NC_STEPS,t),P=NC_PAT[pat];
    const A=N?{c0:6,c1:30,sh:50,el:142,wr:286,hc:350,hr:32,y:84,th:32}:{c0:16,c1:52,sh:78,el:250,wr:520,hc:590,hr:40,y:84,th:40};
    const S=N?{x:34,y:196,w:350,h:186}:{x:42,y:196,w:392,h:172};
    const R=N?{x:12,y:430,w:376,dy:44}:{x:466,y:192,w:240,dy:44};
    const st=NC_STEPS[p],nx=NC_STEPS[p+1]?NC_STEPS[p+1].from:1.0001,u=ramp(t,st.from,nx-.02);
    const pl=P.dl+NC_REF.dist/P.cv,f={stim:null,pos:null};
    if(p===0||p===4||p===5){f.stim='wrist';const ms=24*clamp(u/.8);if(p!==4&&ms<P.dl)f.pos=along(A,A.wr,A.hc-6,ms/P.dl);if(p===4&&u<.35)f.pos=along(A,A.hc-6,A.wr,u/.35)}
    else if(p===1||p===2){f.stim='elbow';const ms=24*clamp(u/.8);if(p===1&&ms<pl)f.pos=along(A,A.el,A.hc-6,ms/pl)}
    else{f.stim='wrist';const q=(u*1.6)%1;f.pos=q<.5?along(A,A.wr,A.c1,q/.5):along(A,A.c1,A.hc-6,(q-.5)/.5)}
    let s=arm(A,f);
    s+=tx(S.x,S.y-10,P.lab,'t-sm',INK);
    if(p===3)s+=fwave(S,u);else if(p===4)s+=snaps(S,P,u);else s+=scope(S,P,p,u);
    s+=readout(R,P,p);
    svg.innerHTML=s;
    setSt(p);$('#ncNote').innerHTML=noteHTML(NC_STEPS[p]);
    $$('[data-ncp]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.ncp===pat));
  }
  const stop=playWire(rg,$('#ncPlay'),draw,18000,'%t:player.replay%','ncs');
  const setSt=stepWire($('#ncSteps'),NC_STEPS,rg,draw,stop);
  $$('[data-ncp]').forEach(b=>b.addEventListener('click',()=>{pat=b.dataset.ncp;draw(+rg.value)}));
  draw(+rg.value);

  /* ---------- criteria explorer ---------- */
  const cs=$('#ncCalc'),ins={dml:$('#ncDml'),mcv:$('#ncMcv'),amp:$('#ncAmp'),rat:$('#ncRat')},outs={dml:$('#ncDmlO'),mcv:$('#ncMcvO'),amp:$('#ncAmpO'),rat:$('#ncRatO')};
  function evalNerve(v){const pct=v.amp/NC_REF.amp*100,C=NC_CR;
    const hDml=v.dml>(pct>=50?4.95:5.40),hMcv=v.mcv<(pct>=50?44.1:41.65),hRat=pct>=20&&v.rat<.5,rDml=v.dml>6.75,rMcv=v.mcv<34.3,rRat=v.rat<.7;
    const unob=v.amp<.41,hDemy=hDml||hMcv||hRat,hAx=!unob&&v.amp<3.28&&!hDemy;
    return {pct,thr:{dml:pct>=50?4.95:5.40,mcv:pct>=50?44.1:41.65},rows:[
      [C.feat[0],hDml?C.on:C.off,hDml,rDml?C.on:C.off,rDml],
      [C.feat[1],hMcv?C.on:C.off,hMcv,rMcv?C.on:C.off,rMcv],
      [C.feat[2],pct<20?C.na:hRat?C.on:C.off,hRat,rRat?C.rOnly:C.off,rRat],
      [C.feat[3],unob?C.unob:hAx?C.ax:C.off,unob||hAx,unob?C.unob:C.rAx,unob]],
      sum:[unob?C.sum.hU:hDemy?C.sum.hD:hAx?C.sum.hA:C.sum.hN,(rDml||rMcv)?C.sum.rD:C.sum.rN]}}
  function drawCalc(){const N=vb(cs,'720 282','400 350'),v={dml:+ins.dml.value,mcv:+ins.mcv.value,amp:+ins.amp.value,rat:+ins.rat.value},E=evalNerve(v),M=NC_CR.mk;
    outs.dml.textContent=v.dml.toFixed(2)+' ms';outs.mcv.textContent=v.mcv.toFixed(1)+' m/s';outs.amp.textContent=v.amp.toFixed(2)+' mV';outs.rat.textContent=v.rat.toFixed(2);
    const G=N?{ax:20,aw:360,rh:84,top:8}:{ax:200,aw:440,rh:66,top:10};
    const mks=[
      [[4.5,M.uln,'a','var(--muted)'],[E.thr.dml,M.h+' '+(+E.thr.dml.toFixed(2)),'b','var(--dx)'],[6.75,M.r+' 6.75','a','var(--accent)']],
      [[49,M.lln,'a','var(--muted)'],[E.thr.mcv,M.h+' '+(+E.thr.mcv.toFixed(2)),'b','var(--dx)'],[34.3,M.r+' 34.3','a','var(--accent)']],
      [[4.1,M.llnA,'a','var(--muted)'],[3.28,M.p80,'b','var(--dx)'],[2.05,M.p50,'a','var(--muted)'],[.82,M.p20,'b','var(--muted)'],[.41,M.p10,'a','var(--muted)']],
      [[.5,M.h+' 0.5','a','var(--dx)'],[.7,M.r+' 0.7','b','var(--accent)']]];
    const bad=[v.dml>E.thr.dml,v.mcv<E.thr.mcv,v.rat<.5&&E.pct>=20,v.amp<3.28];
    let s='';
    NC_CR.sc.forEach((c,i)=>{const r=G.top+i*G.rh,val=[v.dml,v.mcv,v.amp,v.rat][i],X=q=>G.ax+G.aw*(q-c.mn)/(c.mx-c.mn);
      const ay=N?r+46:r+34,vs=val.toFixed(c.f)+(c.u?' '+c.u:'');
      if(N){s+=tx(G.ax,r+14,c.lab,'t-sm',INK)+tx(G.ax+G.aw,r+14,vs,'t-sm t-end',bad[i]?'fill:var(--bad);font-weight:700':INK)}
      else{s+=tx(16,r+28,c.lab,'t-sm',INK)+tx(16,r+44,vs,'t-big',bad[i]?'font-size:15px;fill:var(--bad)':'font-size:15px')}
      s+=`<line x1="${f1(G.ax)}" x2="${f1(G.ax+G.aw)}" y1="${f1(ay)}" y2="${f1(ay)}" style="stroke:var(--line);stroke-width:6;stroke-linecap:round"/>`;
      mks[i].forEach(([q,lb,pos,col])=>{const x=X(q);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${f1(ay-8)}" y2="${f1(ay+8)}" style="stroke:${col};stroke-width:2"/>`+tx(x,pos==='a'?ay-12:ay+20,lb,'t-xs t-mid',`fill:${col==='var(--muted)'?'var(--muted)':col};font-weight:700`)});
      const vx=X(clamp(val,c.mn,c.mx));s+=`<circle cx="${f1(vx)}" cy="${f1(ay)}" r="7" style="fill:${bad[i]?'var(--bad)':'var(--ink)'};stroke:var(--panel);stroke-width:2"/>`});
    cs.innerHTML=s;
    $('#ncRes').innerHTML=E.rows.map(r=>`<tr><th>${r[0]}</th><td class="${r[2]?'on':'off'}">${r[1]}</td><td class="${r[4]?'on':'off'}">${r[3]}</td></tr>`).join('');
    $('#ncSum').innerHTML=E.sum.map(x=>`<p>${x}</p>`).join('')}
  Object.values(ins).forEach(el=>el.addEventListener('input',()=>{$$('[data-ncpre]').forEach(b=>b.setAttribute('aria-pressed','false'));drawCalc()}));
  $$('[data-ncpre]').forEach(b=>b.addEventListener('click',()=>{const P=NC_PRE[b.dataset.ncpre];Object.keys(P).forEach(k=>{ins[k].value=P[k]});
    $$('[data-ncpre]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawCalc()}));
  const prevR=redraws.ncs;redraws.ncs=()=>{prevR&&prevR();drawCalc()};
  drawCalc();
};
