/* =============== 4.5 Nutrition & enzymes =============== */
/* Three interactives. (1) nuSvg: a meal's fat travels from the plate through the stomach and small intestine; without
   enzymes most of it reaches the stool; an enzyme capsule swallowed with the food passes the stomach closed, its
   microspheres release in the small intestine and the fat is absorbed; then the label's dosing figures on a dose
   axis (a teaching readout, never a calculator) and the fibrosing colonopathy relative risks. (2) nuVit: the CFF
   consensus fat-soluble vitamin doses for two age bands, as tabulated. (3) nuGrow: growth and BMI goals as published,
   and weight on elexacaftor/tezacaftor/ivacaftor. Schematic drawing; every number drawn is a cited figure. */
inits.nutrition=()=>{
  const svg=$('#nuSvg'),rg=$('#nuT'),note=$('#nuNote');
  const STEPS=[
    {from:0,at:.07,k:'Without enzymes',t:'A meal with fat, and no enzymes',sub:'most of the fat reaches the stool unabsorbed',
      txt:'About 85% of people with CF are pancreatic insufficient [[Singh2017PI]], and 80% to 90% need pancreatic enzyme replacement therapy (PERT) to prevent malnutrition [[Somaraju2020]]. In the drawing, fat droplets from the meal travel through the stomach and small intestine; with too little lipase most of them reach the stool.',
      pt:'Without enough of the pancreas\'s digestive juices, fat from food is not taken in and leaves in the stool.',
      hook:'80–90% of people with CF need PERT [[Somaraju2020]].'},
    {from:.16,at:.25,k:'With the meal',t:'The capsule goes down with the food',sub:'the coating keeps it closed in the stomach',
      txt:'Creon is a delayed-release pancrelipase capsule; dosing is based on lipase units [[FDA-Creon]]. The label says to swallow capsules whole; if needed, the contents can be sprinkled on acidic soft food with a pH of 4.5 or less, such as applesauce. They should not be crushed or chewed, because losing the enteric coating can irritate the mouth and inactivate the enzyme [[FDA-Creon]].',
      pt:'Enzyme capsules are taken with meals and snacks, swallowed whole, so they work where the food is [[FDA-Creon]].',
      hook:'Never crush or chew: the enteric coating protects the enzyme (Creon label) [[FDA-Creon]].'},
    {from:.33,at:.43,k:'Small intestine',t:'Microspheres open beside the fat',sub:'lipase meets the droplets and breaks them up',
      txt:'In the drawing the capsule reaches the small intestine and its coated microspheres release the enzyme among the fat droplets. A Cochrane review of 14 trials (641 children and adults) found evidence of moderate to very low quality, with limited evidence favouring enteric-coated microspheres over non-enteric-coated preparations [[Somaraju2020]].',
      pt:'The tiny beads inside the capsule open in the gut and mix with the food, breaking the fat into pieces the body can take in.',
      hook:'Enteric-coated microspheres: limited evidence of an advantage (Cochrane 2020) [[Somaraju2020]].'},
    {from:.5,at:.59,k:'Absorption',t:'Fat is absorbed, with vitamins A, D, E, K',sub:'the coefficient of fat absorption rises',
      txt:'Enzymes help the body take in fat and the fat-soluble vitamins A, D, E and K [[FDA-Creon,FitzSimmons1997]]. The CFF infant guideline lists a coefficient of fat absorption below 85% among the reasons to start PERT, with symptoms, faecal elastase below 200 µg/g, or two CFTR variants associated with pancreatic insufficiency [[Borowitz2009]].',
      pt:'Enzymes help the body take in fat and fat-soluble vitamins. The dose is set by the CF team; more is not always better [[FDA-Creon,FitzSimmons1997]].',
      hook:'CFA below 85% is one listed reason to start PERT in infants [[Borowitz2009]].'},
    {from:.66,at:.75,k:'Dosing, as the label states it',t:'Dose ranges: lipase units per kg per meal',sub:'a teaching readout, never a dose calculator',
      txt:'The Creon label gives starting doses for people older than 12 months of 1,000 lipase units/kg/meal for ages over 12 months to under 4 years, and 500 lipase units/kg/meal from 4 years. It says not to exceed 2,500 lipase units/kg/meal, 10,000 lipase units/kg/day or 4,000 lipase units/g of fat ingested/day "without further investigation". Snacks take about half the meal dose. For infants up to 12 months it gives 3,000 lipase units (one capsule) per 120 mL of formula or per breastfeeding [[FDA-Creon]]. These figures are quoted for teaching; each person\'s dose is set by their CF team.',
      pt:'There is a starting dose and a ceiling. The team adjusts within them, for meals and snacks [[FDA-Creon]].',
      hook:'Label ceiling: 2,500 U/kg/meal, 10,000 U/kg/day or 4,000 U/g fat/day [[FDA-Creon]].'},
    {from:.83,at:.92,k:'Too much',t:'Very high doses: fibrosing colonopathy',sub:'relative risk by daily dose band, US case-control study',
      txt:'In a US case-control study of 29 children who needed colectomy for fibrosing colonopathy (1990–1994) and 105 matched controls with CF, the mean enzyme dose was 50,046 lipase units/kg/day in cases against 18,985 in controls. Compared with 0–24,000 units/kg/day, the adjusted relative risk was 10.9 for 24,001–50,000 and 199.5 for more than 50,000 units/kg/day; the authors supported keeping most daily doses below 10,000 lipase units/kg [[FitzSimmons1997]]. The Creon label states that doses above 6,000 lipase units/kg/meal have been associated with colonic stricture in children younger than 12 [[FDA-Creon]].',
      pt:'Far too much enzyme, for a long time, can scar and narrow the large bowel. That is why there is a ceiling [[FitzSimmons1997]].',
      hook:'Fibrosing colonopathy: relative risk 199.5 above 50,000 U/kg/day [[FitzSimmons1997]].'}
  ];
  const STRIP=['no enzymes','capsule','open','absorbed','dose range','colonopathy'];
  const tx=(x,y,s,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`;
  const ink='fill:var(--ink)',bold='fill:var(--ink);font-weight:600';
  const num=v=>v.toLocaleString('en-GB');
  function along(P,u){const L=[0];for(let i=1;i<P.length;i++)L.push(L[i-1]+Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]));
    const d=clamp(u)*L[L.length-1];for(let i=1;i<P.length;i++)if(d<=L[i]){const k=(d-L[i-1])/((L[i]-L[i-1])||1);return [lerp(P[i-1][0],P[i][0],k),lerp(P[i-1][1],P[i][1],k),i-1,k]}
    const q=P[P.length-1];return [q[0],q[1],P.length-2,1]}
  /* layout of the gut scene */
  function lay(N){return N?{plate:[70,86],st:[150,104,150,92],tube:[[60,290],[360,290]],th:30,vy:250,stool:[300,336,70,34],meter:[30,410,340]}
                          :{plate:[70,128],st:[130,156,150,104],tube:[[300,282],[560,282]],th:30,vy:236,stool:[580,264,80,36],meter:[400,112,280]}}
  function scene(t,N,p){const G=lay(N),[sx,sy,sw,sh]=G.st,t0=G.tube[0],t1=G.tube[1];
    const enz=ramp(t,.4,.47),abs=lerp(.15,.9,ramp(t,.42,.55));let g='';
    /* the plate */
    const [px,py]=G.plate;g+=`<ellipse cx="${px}" cy="${py}" rx="46" ry="16" style="fill:var(--pill);stroke:var(--line);stroke-width:1.4"/><ellipse cx="${px}" cy="${py-3}" rx="30" ry="9" style="fill:var(--pancreas)"/>`;
    for(let i=0;i<4;i++)g+=`<circle cx="${px-16+i*11}" cy="${py-6+(i%2)*4}" r="3.6" style="fill:var(--mucus);stroke:var(--mucus-ink);stroke-width:.7"/>`;
    g+=tx(px,py+30,'a meal with fat','t-xs t-mid',bold);
    /* the stomach */
    const SP=`M${sx} ${sy+10}C${sx+sw*.2} ${sy-8} ${sx+sw*.85} ${sy-10} ${sx+sw} ${sy+sh*.35}C${sx+sw*1.05} ${sy+sh*.75} ${sx+sw*.8} ${sy+sh} ${sx+sw*.45} ${sy+sh*.92}C${sx+sw*.12} ${sy+sh*.85} ${sx-6} ${sy+sh*.5} ${sx} ${sy+10}Z`;
    g+=`<path d="${SP}" style="fill:var(--gut);stroke:var(--duct);stroke-width:1.4"/>`+tx(sx+sw*.5,sy+sh+16,'stomach (acid)','t-xs t-mid',ink);
    for(let i=0;i<6;i++){const u=((t*5+i/6)%1+1)%1;g+=`<circle cx="${f1(sx+sw*(.2+.12*i))}" cy="${f1(sy+sh*(.85-.5*u))}" r="2.2" style="fill:none;stroke:var(--warn);stroke-width:1;opacity:${f1(.8*(1-u))}"/>`}
    /* the small intestine and a blood vessel above it */
    g+=`<path d="M${f1(sx+sw*.9)} ${f1(sy+sh*.7)}C${f1(sx+sw*1.2)} ${f1(t0[1])} ${f1(t0[0]-40)} ${f1(t0[1])} ${f1(t0[0])} ${f1(t0[1])}" style="fill:none;stroke:var(--gut);stroke-width:${G.th};stroke-linecap:round"/>`;
    g+=`<rect x="${f1(t0[0])}" y="${f1(t0[1]-G.th/2)}" width="${f1(t1[0]-t0[0])}" height="${G.th}" style="fill:var(--gut)"/><line x1="${f1(t0[0])}" x2="${f1(t1[0])}" y1="${f1(t0[1]-G.th/2)}" y2="${f1(t0[1]-G.th/2)}" style="stroke:var(--duct);stroke-width:1.2"/><line x1="${f1(t0[0])}" x2="${f1(t1[0])}" y1="${f1(t0[1]+G.th/2)}" y2="${f1(t0[1]+G.th/2)}" style="stroke:var(--duct);stroke-width:1.2"/>`;
    g+=tx(t0[0],t0[1]+G.th/2+14,'small intestine','t-xs',ink);
    g+=`<line x1="${f1(t0[0])}" x2="${f1(t1[0])}" y1="${G.vy}" y2="${G.vy}" style="stroke:var(--inflamed);stroke-width:5;stroke-linecap:round;opacity:.5"/>`+tx(t0[0],G.vy-8,'blood: fat taken into the body','t-xs',ink);
    const [bx,by,bw,bh]=G.stool;g+=`<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="9" style="fill:var(--panel-2);stroke:var(--line)"/>`+tx(bx+bw/2,by+bh+13,'stool','t-xs t-mid',ink);
    if(N)g+=`<path d="M${t1[0]} ${t1[1]}Q${t1[0]+10} ${t1[1]+10} ${bx+bw/2} ${by}" style="fill:none;stroke:var(--gut);stroke-width:14;stroke-linecap:round"/>`;
    else g+=`<line x1="${t1[0]}" x2="${bx}" y1="${t1[1]}" y2="${t1[1]}" style="stroke:var(--gut);stroke-width:${G.th}"/>`;
    /* fat droplets along the path */
    const PATH=[[px,py-4],[sx+sw*.5,sy+sh*.5],[sx+sw*.9,sy+sh*.7],t0,t1,[bx+bw/2,by+bh/2]];
    const n=12;let lost=0;
    for(let i=0;i<n;i++){const u=((i/n+t*3.2)%1+1)%1,q=along(PATH,u),isAbs=((i*7)%n)/n<abs;
      const inTube=q[2]===3;let x=q[0],y=q[1],r=5;
      if(inTube&&isAbs){const k=q[3];r=lerp(5,2.2,ramp(k,0,.4));if(k>.4){y=lerp(t0[1],G.vy,ramp(k,.4,.75));if(k>.75)continue}}
      if(q[2]>=4&&isAbs)continue;
      if(q[2]>=4)lost++;
      if(inTube&&enz>0&&isAbs&&q[3]<.4){for(let j=0;j<3;j++)g+=`<circle cx="${f1(x+(j-1)*5)}" cy="${f1(y+(j%2?3:-3))}" r="${f1(r*.55)}" style="fill:var(--mucus);stroke:var(--mucus-ink);stroke-width:.6"/>`}
      else g+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="fill:var(--mucus);stroke:var(--mucus-ink);stroke-width:.7"/>`}
    /* the capsule */
    const mv1=ramp(t,.17,.27),mv2=ramp(t,.34,.4),open=ramp(t,.4,.46);
    if(t>=.16&&t<.62){let cx,cy;if(mv2<=0){const a=along([[px+30,py-6],[sx+sw*.45,sy+sh*.55]],mv1);cx=a[0];cy=a[1]}else{const a=along([[sx+sw*.45,sy+sh*.55],[sx+sw*.9,sy+sh*.7],[t0[0]+30,t0[1]]],mv2);cx=a[0];cy=a[1]}
      g+=capsule(cx,cy,30,{open,ang:mv2>0&&mv2<1?18:0});
      if(open<.5&&mv1>.5)g+=tx(cx,cy-16,'enteric-coated','t-xs t-mid','fill:var(--enzyme);font-weight:600');
      if(open>=.5)g+=tx(cx,cy-18,'microspheres release','t-xs t-mid','fill:var(--enzyme);font-weight:600')}
    /* enzyme beads moving along the intestine */
    if(enz>0)for(let i=0;i<10;i++){const u=((i/10+t*2.4)%1+1)%1,x=lerp(t0[0]+30,t1[0],u);g+=`<circle cx="${f1(x)}" cy="${f1(t0[1]+((i%3)-1)*8)}" r="2.3" style="fill:var(--enzyme);opacity:${f1(enz)}"/>`}
    /* the meter */
    const [mx,my,mh]=G.meter;
    {const mw=mh;g+=tx(mx,my-8,'fat absorbed (schematic)','t-xs',bold)+`<rect x="${mx}" y="${my}" width="${mw}" height="14" rx="5" style="fill:var(--panel-2)"/><rect x="${mx}" y="${my}" width="${f1(mw*abs)}" height="14" rx="5" style="fill:${abs>=.85?'var(--good)':'var(--warn)'}"/>`;
      const x85=mx+mw*.85;g+=`<line x1="${f1(x85)}" x2="${f1(x85)}" y1="${my-4}" y2="${my+18}" style="stroke:var(--ink);stroke-width:1.4"/>`+tx(x85,my+30,'85%','t-xs t-mid',bold)+tx(mx,my+46,'CFA below 85% is one listed reason to start PERT','t-xs')}
    void lost;void p;return g}
  /* phase 4: a log dose axis */
  function doses(t,N){const k=ramp(t,.67,.8),x0=N?24:60,x1=N?376:660,y=N?150:128,L=v=>x0+(x1-x0)*(Math.log10(v)-2)/2,cur=Math.pow(10,2+2*k);let g='';
    g+=`<rect x="${N?16:40}" y="${N?50:52}" width="${N?368:640}" height="24" rx="8" style="fill:var(--warn-soft)"/>`+tx(N?200:360,N?66:68,N?'Teaching readout of the label. Not a calculator.':'Teaching readout of the Creon label. Not a dose calculator.','t-xs t-mid','fill:var(--warn);font-weight:700');
    const Z=[[500,2500,'var(--good)','label start to ceiling'],[2500,6000,'var(--warn)','above the ceiling'],[6000,10000,'var(--bad)','stricture warning (&lt;12 y)']];
    Z.forEach(([a,b,c,l],i)=>{g+=`<rect x="${f1(L(a))}" y="${y-16}" width="${f1(L(b)-L(a))}" height="32" style="fill:${c};opacity:.18"/>`;
      const lx=N?(i===2?16:16+i*160):x0+i*200,ly=N?y-40+(i===2?14:0):y-28;g+=`<rect x="${lx}" y="${ly-8}" width="10" height="9" style="fill:${c};opacity:.5"/>`+tx(lx+14,ly,l,'t-xs',ink)});
    g+=`<line x1="${x0}" x2="${x1}" y1="${y}" y2="${y}" class="axis"/>`;
    [100,300,1000,3000,10000].forEach(v=>{g+=`<line x1="${f1(L(v))}" x2="${f1(L(v))}" y1="${y-4}" y2="${y+4}" class="axis"/>`+tx(L(v),y+28,num(v),'t-xs t-mid')});
    g+=tx(x1,y+42,'lipase units per kg per meal (log scale)','t-xs t-end');
    const M=[[500,'500','start, age 4 years and over'],[1000,'1,000','start, over 12 months to under 4 years'],[2500,'2,500','ceiling per meal, "without further investigation"'],[6000,'6,000','above this: colonic stricture reported in children under 12']];
    M.forEach(([v,l,d],i)=>{const xx=L(v),yy=y+(N?64:62)+i*(N?26:18),on=cur>=v;
      g+=`<circle cx="${f1(xx)}" cy="${y}" r="7" style="fill:${on?'var(--ink)':'var(--panel-2)'};stroke:var(--ink)"/><text x="${f1(xx)}" y="${y+3.5}" class="t-xs t-mid" style="fill:${on?'var(--panel)':'var(--ink)'};font-weight:700">${i+1}</text>`;
      if(!on)return;
      if(N)g+=tx(16,yy,`${i+1} · ${l} U/kg/meal`,'t-xs',bold)+tx(16,yy+11,d,'t-xs',ink);
      else g+=tx(x0,yy,`${i+1} · ${l} lipase units/kg/meal: ${d}`,'t-xs',bold)});
    g+=`<path d="M${f1(L(cur))} ${y-20}l-5 -8h10z" style="fill:var(--brand)"/>`;
    const yb=N?y+184:y+148;
    if(k>.98){g+=tx(N?16:x0,yb,'Also on the label:','t-sm',bold);
      const A=N?['no more than 10,000 lipase units/kg/day,','or 4,000 lipase units/g fat/day','snacks: about half the meal dose','infants: 3,000 lipase units per 120 mL','of formula or per breastfeeding']
               :['no more than 10,000 lipase units/kg/day, or 4,000 lipase units/g fat/day','snacks: about half the meal dose; about 3 meals and 2–3 snacks a day','infants: 3,000 lipase units per 120 mL of formula or per breastfeeding'];
      A.forEach((a,i)=>{g+=tx(N?16:x0,yb+15+i*13,(N&&(i===1||i===4)?'  ':'· ')+a,'t-xs',ink)})}
    return g}
  /* phase 5: relative risk of fibrosing colonopathy */
  function colono(t,N){const k=ramp(t,.84,.95),x0=N?20:60,w=N?280:420,y0=N?70:76,Lg=v=>Math.log10(Math.max(1,v))/Math.log10(250);let g='';
    g+=tx(x0,y0,'adjusted relative risk, by daily dose','t-sm',bold)+tx(x0,y0+13,'lipase units/kg/day; log scale; reference = 1','t-xs');
    const R=[['0–24,000 (reference)',1,'1'],['24,001–50,000',10.9,'10.9'],['over 50,000',199.5,'199.5']];
    R.forEach(([l,v,s],i)=>{const yy=y0+36+i*36,bw=Math.max(3,w*Lg(v)*k);g+=tx(x0,yy-4,l,'t-xs',ink)+`<rect x="${x0}" y="${yy}" width="${f1(w)}" height="14" rx="3" style="fill:var(--panel-2)"/><rect x="${x0}" y="${yy}" width="${f1(bw)}" height="14" rx="3" style="fill:${i===2?'var(--bad)':i===1?'var(--warn)':'var(--muted)'}"/>`+tx(x0+bw+6,yy+11,k>.98?s:'','t-sm',bold)});
    const y2=y0+(N?168:164),sc=w/60000;g+=tx(x0,y2,'mean enzyme dose, lipase units/kg/day','t-sm',bold);
    [['children with fibrosing colonopathy (29)',50046],['matched controls with CF (105)',18985]].forEach(([l,v],i)=>{const yy=y2+22+i*32;g+=tx(x0,yy-4,l,'t-xs',ink)+`<rect x="${x0}" y="${yy}" width="${f1(v*sc*k)}" height="12" rx="3" style="fill:${i?'var(--rx)':'var(--bad)'}"/>`+tx(x0+v*sc*k+6,yy+10,k>.98?num(v):'','t-xs',bold)});
    const xl=x0+sc*10000;g+=[[y2+19,y2+37],[y2+51,y2+69]].map(([a,b])=>`<line x1="${f1(xl)}" x2="${f1(xl)}" y1="${a}" y2="${b}" style="stroke:var(--good);stroke-width:1.6;stroke-dasharray:3 2"/>`).join('')+tx(xl+4,y2+(N?88:86),'10,000: the authors\' suggested daily ceiling','t-xs','fill:var(--good);font-weight:600');
    return g}
  function draw(t){const N=vb(svg,'720 384','400 560'),p=phaseOf(STEPS,t),P=STEPS[p];
    const L=N?{tx:16,ty:26,sx:16,sy:528,sw:368}:{tx:20,ty:28,sx:20,sy:352,sw:680};
    let s=`<text x="${L.tx}" y="${L.ty}" class="t-big">${P.t}</text><text x="${L.tx}" y="${L.ty+16}" class="t-sm">${P.sub}</text>`;
    s+=p<4?scene(t,N,p):p===4?doses(t,N):colono(t,N);
    const sw=L.sw/STRIP.length;
    STRIP.forEach((q,i)=>{const on=i===p,x=L.sx+i*sw;s+=`<rect x="${f1(x+1)}" y="${L.sy}" width="${f1(sw-2)}" height="6" rx="3" style="fill:${on?'var(--rx)':'var(--panel-2)'}"/><text x="${f1(x+sw/2)}" y="${L.sy+20}" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:600':''}">${N&&q.length>9?q.split(' ')[0]:q}</text>`});
    s+=`<circle cx="${f1(L.sx+L.sw*t)}" cy="${L.sy+3}" r="5.5" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;
    svg.innerHTML=s;note.innerHTML=noteHTML(P);setA(p)}
  const stop=playWire(rg,$('#nuPlay'),draw,30000,'%t:player.replay%','nutrition');
  const setA=stepWire($('#nuSteps'),STEPS,rg,draw,stop);
  draw(+rg.value);

  /* =============== fat-soluble vitamins, as tabulated =============== */
  const vs=$('#nuVit');let age='inf';
  const VIT={inf:{lab:'infants 0–12 months',A:'1,500 IU',D:'400 IU',E:'40–50 IU',K:'300–500 µg',a:1500,d:400,e:50,kk:500},
             tod:{lab:'ages 1–3 years',A:'5,000 IU',D:'400–800 IU',E:'80–150 IU',K:'300–500 µg',a:5000,d:800,e:150,kk:500}};
  function drawVit(){const N=vb(vs,'720 200','400 330'),V=VIT[age];let s='';
    const T=[['A',V.A,V.a/5000],['D',V.D,V.d/800],['E',V.E,V.e/150],['K',V.K,V.kk/500]];
    const cw=N?176:162,ch=N?132:150,gp=N?16:14;
    T.forEach(([l,d,f],i)=>{const x=N?16+(i%2)*(cw+gp):20+i*(cw+gp),y=N?14+Math.floor(i/2)*(ch+14):18;
      s+=`<rect x="${x}" y="${y}" width="${cw}" height="${ch}" rx="12" style="fill:var(--panel-2);stroke:var(--line)"/>`;
      s+=`<text x="${x+16}" y="${y+48}" class="t-big" style="font-size:40px;fill:var(--rx)">${l}</text>`+tx(x+16,y+70,'vitamin '+l,'t-xs',ink);
      s+=`<text x="${x+16}" y="${y+(N?100:104)}" class="t-big" style="font-size:${N?17:18}px">${d}</text>`+tx(x+16,y+(N?116:122),'per day','t-xs');
      const bh=ch-28;s+=`<rect x="${x+cw-26}" y="${y+14}" width="10" height="${bh}" rx="4" style="fill:var(--panel)"/><rect x="${x+cw-26}" y="${f1(y+14+bh*(1-f))}" width="10" height="${f1(bh*f)}" rx="4" style="fill:var(--rx);opacity:.7"/>`});
    vs.innerHTML=s;$$('[data-vit]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.vit===age))}
  $('#nuVitBtns').addEventListener('click',e=>{const b=e.target.closest('[data-vit]');if(!b)return;age=b.dataset.vit;drawVit()});
  drawVit();

  /* =============== growth goals and weight on modulators =============== */
  const gs=$('#nuGrow'),gcap=$('#nuGrowCap');let gv='child';
  const GCAP={child:'CFF goal: BMI at or above the 50th percentile for ages 2–20 (Stallings 2008, as restated in the ADA/CFF guideline) [[Moran2010CFRD,Stallings2008]]; for infants, weight-for-length at or above the 50th percentile by 2 years [[Borowitz2009]]. Keeping growth measures above the 50th percentile from infancy went with better FEV1% predicted 4 to 16 years later, with no extra gain above the 85th; a 70th percentile cut-off is suggested with WHO growth charts [[McDonald2021]]. Weight-for-age above the 10th percentile at age 4 was linked to better lung function from 6 to 18 [[Yen2013]].',
    women:'CFF goal for adult women: BMI at or above 22 kg/m² (Stallings 2008, as restated in the ADA/CFF guideline) [[Moran2010CFRD,Stallings2008]]. ADA/CFF 2010 describes energy needs of usually 120–150% of the recommended intake for age [[Moran2010CFRD]].',
    men:'CFF goal for adult men: BMI at or above 23 kg/m² (Stallings 2008, as restated in the ADA/CFF guideline) [[Moran2010CFRD,Stallings2008]]. ADA/CFF 2010 describes energy needs of usually 120–150% of the recommended intake for age [[Moran2010CFRD]].',
    eti:'UK adults (n = 40): median BMI rose from 23.0 to 24.6 kg/m² after elexacaftor/tezacaftor/ivacaftor while reported energy intake fell from 2,551 to 2,153 kcal/day [[Caley2023]]. In 134 US adults the rate of BMI change was 1.47 kg/m² per year greater after starting it [[Petersen2022ETI]]. Overweight and obesity are estimated at 13% to 18% of people with CF [[McDonald2021]], and reviews describe a shift of concern from undernutrition toward overweight and metabolic disease <span class="ev early">Early evidence</span> [[Harindhanavudhi2026]]. Why weight rises is unclear <span class="ev hyp">Hypothesis</span>: lower energy expenditure and better absorption are proposed [[McDonald2021,Caley2023]].'};
  function ruler(x,y,w,a,b,fmtv,step){const X=v=>x+w*(v-a)/(b-a);let s=`<line x1="${x}" x2="${x+w}" y1="${y}" y2="${y}" style="stroke:var(--muted);stroke-width:2"/>`;
    for(let v=a;v<=b+1e-9;v+=step)s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${y-5}" y2="${y+5}" style="stroke:var(--muted)"/>`+tx(X(v),y+18,fmtv(v),'t-xs t-mid');
    return {s,X}}
  function drawGrow(){const N=vb(gs,'720 210','400 250');let s='';const x=N?24:60,w=N?352:600,y=N?70:70;
    const list=(rows,y0)=>rows.map(([c,l],i)=>`<circle cx="${x+5}" cy="${y0+i*16-3}" r="6" style="fill:${c}"/><text x="${x+5}" y="${y0+i*16}" class="t-xs t-mid" style="fill:var(--panel);font-weight:700">${i+1}</text>`+tx(x+16,y0+i*16,l,'t-xs',ink)).join('');
    if(gv==='child'){const R=ruler(x,y,w,0,100,v=>N&&v%20?'':v+'th',10);s+=tx(x,y-44,'BMI percentile, ages 2–20','t-sm',bold);
      s+=`<rect x="${f1(R.X(50))}" y="${y-14}" width="${f1(R.X(100)-R.X(50))}" height="28" style="fill:var(--good);opacity:.14"/>`+R.s+tx(R.X(75),y-20,'goal zone','t-xs t-mid','fill:var(--good);font-weight:600');
      const M=[[10,'var(--muted)','10th: weight-for-age above it at 4, better lungs later'],[50,'var(--good)','50th: the CFF goal is at or above this'],[70,'var(--rx)','70th: suggested cut-off when WHO charts are used'],[85,'var(--warn)','85th: no extra lung-function gain above this']];
      M.forEach(([v,c],i)=>{const xx=R.X(v);s+=`<circle cx="${f1(xx)}" cy="${y}" r="7" style="fill:${c}"/><text x="${f1(xx)}" y="${y+3.5}" class="t-xs t-mid" style="fill:var(--panel);font-weight:700">${i+1}</text>`});
      s+=list(M.map(m=>[m[1],m[2]]),y+46)}
    else if(gv==='women'||gv==='men'){const goal=gv==='women'?22:23,R=ruler(x,y,w,16,32,v=>v,2);s+=tx(x,y-44,`BMI, kg/m², adult ${gv}`,'t-sm',bold);
      s+=`<rect x="${f1(R.X(goal))}" y="${y-14}" width="${f1(R.X(32)-R.X(goal))}" height="28" style="fill:var(--good);opacity:.14"/>`+R.s;
      s+=`<line x1="${f1(R.X(goal))}" x2="${f1(R.X(goal))}" y1="${y-26}" y2="${y}" style="stroke:var(--good);stroke-width:2"/><circle cx="${f1(R.X(goal))}" cy="${y}" r="6" style="fill:var(--good)"/>`+tx(R.X(goal)+6,y-24,`CFF goal: ${goal} or above`,'t-sm','fill:var(--good);font-weight:700');
      s+=tx(x,y+46,'the sources used here give a goal, not an upper limit;','t-xs',ink)+tx(x,y+60,'overweight is covered under the modulator tab','t-xs')}
    else{const R=ruler(x,y,w,20,28,v=>v,1);s+=tx(x,y-44,'median BMI, kg/m², UK adults (n = 40)','t-sm',bold)+R.s;
      const a=R.X(23),b=R.X(24.6);s+=`<circle cx="${f1(a)}" cy="${y}" r="6" style="fill:var(--muted)"/><path d="M${f1(a+8)} ${y-16}H${f1(b-8)}" style="stroke:var(--rx);stroke-width:2.4" marker-end="url(#nuAr)"/><circle cx="${f1(b)}" cy="${y}" r="7" style="fill:var(--rx)"/>`;
      s+=`<defs>${marker('nuAr','var(--rx)',6)}</defs>`+tx(a-4,y-20,'23.0 before','t-xs t-end',bold)+tx(b+4,y-20,'24.6 after ETI','t-xs',`fill:var(--rx);font-weight:700`);
      const y2=y+50,bw=N?200:260,sc=bw/2600;s+=tx(x,y2,'reported energy intake, kcal/day','t-xs',bold);
      s+=`<rect x="${x}" y="${y2+8}" width="${f1(2551*sc)}" height="11" rx="3" style="fill:var(--muted)"/>`+tx(x+2551*sc+5,y2+18,'2,551 before','t-xs',ink);
      s+=`<rect x="${x}" y="${y2+24}" width="${f1(2153*sc)}" height="11" rx="3" style="fill:var(--rx)"/>`+tx(x+2153*sc+5,y2+34,'2,153 after','t-xs',ink);
      const ix=N?x:x+bw+110,iy=N?y2+58:y2;s+=tx(ix,iy,'overweight or obese: 13–18% of people with CF','t-xs',bold)+icons(ix,iy+8,{n:20,cols:20,k:3,size:N?9:7,gap:N?3:2,col:'var(--warn)',shape:'dot'}).svg+tx(ix,iy+(N?34:32),'about 3 in 20','t-xs')}
    gs.innerHTML=s;gcap.innerHTML=GCAP[gv];$$('[data-grow]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.grow===gv))}
  $('#nuGrowBtns').addEventListener('click',e=>{const b=e.target.closest('[data-grow]');if(!b)return;gv=b.dataset.grow;drawGrow()});
  drawGrow();
  const prevR=redraws.nutrition;redraws.nutrition=()=>{prevR&&prevR();drawVit();drawGrow()};
};
