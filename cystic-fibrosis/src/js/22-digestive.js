/* =============== 2.2 Pancreas, gut & liver =============== */
/* Two interactives. (1) dgSvg: a scrubber through a lifetime of the gut in CF: the pancreatic duct plugs, fat is
   malabsorbed, meconium ileus at birth, DIOS against constipation, CF liver disease, and colorectal cancer screening.
   (2) dgMap: a schematic digestive tract with a toggle per complication; each toggle lights its site and adds a card
   of figures from the research pass. Every drawing is schematic: positions and sizes are not measurements; numbers
   drawn in the panels are the cited figures. */
inits.digestive=()=>{
  const svg=$('#dgSvg'),rg=$('#dgT'),note=$('#dgNote');
  const STEPS=[
    {from:0,at:.08,k:'From birth · pancreas',t:'Thick secretions plug the ducts',sub:'enzymes are made but stop short of the gut',
      txt:'About 85% of people with CF are pancreatic insufficient (PI); most are PI soon after birth, and some keep pancreatic sufficiency (PS) for part or all of life [[Singh2017PI]]. In the drawing, thick secretions plug the pancreatic duct, so the orange enzyme granules made in the gland stop short of the gut.',
      pt:'The pancreas makes the juices that digest food. In most people with CF the tubes that carry those juices into the gut are blocked from early life.',
      hook:'About 85% of people with CF are pancreatic insufficient [[Singh2017PI]]. Each complete CFTR genotype goes with PI or with PS, never both [[Kristidis1992]].'},
    {from:.16,at:.25,k:'Infancy onward · absorption',t:'Fat passes through unabsorbed',sub:'the gland scars; fat leaves in the stool',
      txt:'With too little enzyme in the gut, fat is poorly absorbed. A Cochrane review states that 80% to 90% of people with CF need pancreatic enzyme replacement therapy (PERT) to prevent malnutrition [[Somaraju2020]]. Faecal elastase-1 measures exocrine function: the CFF infant guideline lists a level below 200 µg/g, or a coefficient of fat absorption below 85%, among the reasons to start PERT [[Borowitz2009]]; below 100 µg/g has been used as severe insufficiency [[Green2026PROMISEPeds]]. As the gland scars (the hatching), damage spreads to the insulin-making islets, one root of CF-related diabetes in module 2.3 [[Ode2022ISPAD]].',
      pt:'Undigested fat leaves in the stool instead of feeding the body. Enzyme capsules taken with food make up the shortfall [[Somaraju2020]].',
      hook:'Faecal elastase below 200 µg/g supports PI; below 100 µg/g is severe [[Borowitz2009,Green2026PROMISEPeds]].'},
    {from:.33,at:.41,k:'Newborn · small bowel',t:'Meconium ileus: the first stool blocks',sub:'thick meconium plugs the bowel; it swells above',
      txt:'Meconium ileus is often the first sign of CF and occurs in about 20% of people diagnosed with CF [[Sathe2017MI]]; a review gives 13% to 17% of all people with CF [[vanderDoef2011]]. First-year survival after meconium ileus rose from 55% for babies born 1958–1972 to 96% for those born 1973–1987 [[vanderDoef2011]]. A history of meconium ileus raises the later risk of liver disease (incidence rate ratio 5.5) [[Colombo2002Liver]].',
      pt:'Some babies with CF are born with the bowel blocked by thick first stool (meconium). It is treated soon after birth [[Sathe2017MI]].',
      hook:'Meconium ileus: about 1 in 5 newborns with CF, and often the first sign of CF [[Sathe2017MI,vanderDoef2011]].'},
    {from:.5,at:.58,k:'Childhood & adult life · colon',t:'DIOS or constipation?',sub:'an acute block at one spot, or a slow jam everywhere',
      txt:'The ESPGHAN CF Working Group defines DIOS as "an acute complete or incomplete faecal obstruction in the ileocaecum", and constipation as gradual faecal impaction of the total colon [[Houwen2010]]. Lifetime DIOS is about 8% in children and 16% in adults; lifetime constipation is 26–47% in children and 42% in adults [[vanderDoef2011]]. In children, conservative treatment worked in 49 of 51 DIOS episodes (96%) [[Houwen2010]].',
      pt:'Constipation is very common in CF. A sudden blockage near the end of the small bowel (DIOS) needs quick medical care [[vanderDoef2010,Munck2016]].',
      hook:'DIOS = acute, at the ileocaecum; constipation = gradual, the whole colon [[Houwen2010]].'},
    {from:.66,at:.74,k:'First decade onward · liver',t:'CF liver disease: patches to cirrhosis',sub:'focal scarring, nodules, then portal hypertension',
      txt:'In the drawing, plugged small bile ducts leave patches of scarring, then nodules spread through the liver and the spleen swells. The CFF 2024 guideline counts focal biliary cirrhosis among the milder hepatobiliary findings, and multilobular cirrhosis or non-cirrhotic portal hypertension as advanced CF liver disease [[Sellers2024]]. About 5–10% of people with CF develop multilobular cirrhosis during the first decade of life; most then develop portal hypertension, mainly variceal bleeding, and liver failure usually comes later [[Debray2011]].',
      pt:'The liver can be affected in CF. Yearly blood tests and regular ultrasounds help the team find problems early [[Sellers2024]].',
      hook:'Multilobular cirrhosis in about 5–10%, usually in the first decade [[Debray2011]]; routine ursodeoxycholic acid is not recommended [[Sellers2024,Cheng2017]].'},
    {from:.83,at:.91,k:'Adulthood · bowel cancer',t:'Colorectal cancer screening from 40',sub:'colonoscopy; from 30 after an organ transplant',
      txt:'In the US CF registry, overall cancer risk was close to background but digestive-tract cancer was raised (SIR 3.5) [[Maisonneuve2013]]; a meta-analysis gives a pooled gastrointestinal cancer SIR of 8.13, and 21.13 after lung transplant [[Yamada2018]]. The CFF task force recommends colonoscopy as the preferred method, starting at age 40, with 5-year re-screening and 3-year surveillance intervals; transplant recipients begin at age 30, within 2 years of transplantation [[Hadjiliadis2018]]. These ratios describe populations, not any one person.',
      pt:'Bowel cancer is more common in adults with CF, so CF guidance starts camera checks of the bowel (colonoscopy) at 40, or at 30 after a transplant [[Hadjiliadis2018]].',
      hook:'CF colonoscopy: from age 40, or 30 after transplant; re-screen every 5 years [[Hadjiliadis2018]].'}
  ];
  const STRIP=['pancreas','absorption','newborn','DIOS','liver','cancer'];
  /* ---- small helpers, local to this module ---- */
  const tx=(x,y,s,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`;
  const ink='fill:var(--ink)',bold='fill:var(--ink);font-weight:600';
  function hbar(x,y,w,v,max,col,lab,val,o={}){const h=o.h||11,vv=clamp(v/max);let s=tx(x,y-4,lab,'t-xs',ink);
    s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${h}" rx="3" style="fill:var(--panel-2)"/>`;
    if(o.lo!=null){const a=clamp(o.lo/max);s+=`<rect x="${f1(x+w*a)}" y="${f1(y)}" width="${f1(Math.max(0,w*(vv-a)))}" height="${h}" rx="3" style="fill:${col};opacity:.45"/><rect x="${f1(x)}" y="${f1(y)}" width="${f1(w*Math.min(a,vv))}" height="${h}" rx="3" style="fill:${col}"/>`}
    else s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w*vv)}" height="${h}" rx="3" style="fill:${col}"/>`;
    return s+tx(x+w*vv+5,y+h-2,val,'t-xs',bold)}
  function along(P,u){const L=[0];for(let i=1;i<P.length;i++)L.push(L[i-1]+Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]));
    const d=clamp(u)*L[L.length-1];for(let i=1;i<P.length;i++)if(d<=L[i]){const k=(d-L[i-1])/((L[i]-L[i-1])||1);return [lerp(P[i-1][0],P[i][0],k),lerp(P[i-1][1],P[i][1],k)]}
    return P[P.length-1]}
  /* a colon frame in the box: caecum bottom-left (the body's right), ascending, transverse, descending, rectum */
  function colonPts(x,y,w,h){return [[x+w*.16,y+h*.86],[x+w*.16,y+h*.14],[x+w*.84,y+h*.14],[x+w*.84,y+h*.8],[x+w*.6,y+h*.92],[x+w*.56,y+h*1]]}
  function colon(P,wd=14,col='var(--gut)'){return `<path d="${ptsD(P)}" style="fill:none;stroke:var(--duct);stroke-width:${wd+2.4};stroke-linejoin:round;stroke-linecap:round;opacity:.55"/><path d="${ptsD(P)}" style="fill:none;stroke:${col};stroke-width:${wd};stroke-linejoin:round;stroke-linecap:round"/>`}
  function tube(P,wd,fill='var(--gut)'){const d=smoothPath(P,false);return `<path d="${d}" style="fill:none;stroke:var(--duct);stroke-width:${f1(wd+2.4)};stroke-linecap:round;stroke-linejoin:round;opacity:.55"/><path d="${d}" style="fill:none;stroke:${fill};stroke-width:${f1(wd)};stroke-linecap:round;stroke-linejoin:round"/>`}
  /* ---- scene 1 and 2: pancreas + a strip of gut with fat droplets ---- */
  function scPanc(S,t,N){const s=Math.min(S.w*.88/200,S.h*.58/100),px=S.x+(S.w-196*s)/2,py=S.y+6;
    const block=ramp(t,.03,.14),fib=ramp(t,.19,.3),reach=1-.85*block;
    let g=pancreas(px,py,s,{block,flow:1,ph:t*7,fib,islets:1-.65*ramp(t,.2,.32),labels:true}).svg;
    if(block>.15){const bx=px+110*s,by=py+43.5*s,lx=S.x+S.w,ly=py+2;g+=`<g style="opacity:${f1(ramp(block,.15,.5))}"><line x1="${f1(bx)}" y1="${f1(by-5)}" x2="${f1(bx+14)}" y2="${f1(ly+9)}" style="stroke:var(--mucus-ink);stroke-width:1"/>${tx(lx,ly+6,'thick secretions plug the duct','t-xs t-end',bold)}</g>`}
    if(fib>.2)g+=tx(px+150*s,py+66*s,'scarring','t-xs',`fill:var(--ink);opacity:${f1(fib)}`);
    if(fib>.2)g+=tx(px+58*s,py+20*s,'islets fade','t-xs',`fill:var(--bicarb);opacity:${f1(fib)}`);
    /* the gut strip */
    const gy=py+100*s+(N?30:34),gx0=S.x+8,gx1=S.x+S.w-(N?64:72),gh=26;
    g+=`<rect x="${f1(gx0)}" y="${f1(gy)}" width="${f1(gx1-gx0)}" height="${gh}" rx="13" style="fill:var(--gut);stroke:var(--duct);stroke-width:1.2"/>`;
    g+=`<line x1="${f1(gx0+10)}" x2="${f1(gx1-10)}" y1="${f1(gy+gh+5)}" y2="${f1(gy+gh+5)}" style="stroke:var(--water);stroke-width:3;stroke-linecap:round;opacity:.6"/>`;
    g+=tx(gx0,gy-6,'small intestine: fat droplets from a meal','t-xs',ink);
    const n=9;let lost=0;
    for(let i=0;i<n;i++){const u=((i/n+t*4)%1+1)%1,x=lerp(gx0+12,gx1+40,u),abs=((i*5)%n)/n<reach;
      if(abs){const k=ramp(u,.2,.62),r=5.2*(1-k);if(r>.6)g+=`<circle cx="${f1(Math.min(x,gx1-8))}" cy="${f1(gy+gh/2+k*6)}" r="${f1(r)}" style="fill:var(--mucus);stroke:var(--mucus-ink);stroke-width:.8"/>`;
        if(k>0&&k<1)g+=`<circle cx="${f1(Math.min(x,gx1-8))}" cy="${f1(gy+gh+5)}" r="2" style="fill:var(--mucus-ink);opacity:${f1(bump(k,0,1))}"/>`}
      else{if(x<gx1+30)g+=`<circle cx="${f1(x)}" cy="${f1(gy+gh/2)}" r="5.2" style="fill:var(--mucus);stroke:var(--mucus-ink);stroke-width:.8"/>`;lost++}}
    /* the stool at the end */
    const sx=gx1+14;g+=`<rect x="${f1(sx)}" y="${f1(gy-2)}" width="${N?44:52}" height="${gh+4}" rx="8" style="fill:var(--panel-2);stroke:var(--line)"/>`+tx(sx+(N?22:26),gy+gh+18,'stool','t-xs t-mid',ink);
    g+=tx(gx0,gy+gh+20,'↓ absorbed into the body (blue line)','t-xs');
    const word=reach>.7?'little fat in the stool':reach>.35?'more fat in the stool':'fatty, greasy stool';
    g+=tx(gx0,gy+gh+34,word,'t-xs',`font-weight:600;fill:${reach>.7?'var(--good)':'var(--bad)'}`);
    return g}
  function pnPanc(P,t,N,p){let g='';
    if(p===0){const k=Math.round(85*ramp(t,.03,.15)),cols=10,sz=N?11:12,gp=3,w=cols*(sz+gp);
      const ix=N?P.x+4:P.x+(P.w-w)/2,iy=P.y+(N?24:34);
      g+=tx(N?P.x:P.x+P.w/2,P.y+10,'100 people with CF','t-sm'+(N?'':' t-mid'),bold);
      g+=icons(ix,iy,{n:100,cols,k,size:sz,gap:gp,col:'var(--enzyme)',base:'var(--line)',shape:'dot'}).svg;
      const ly=N?P.y+60:iy+10*(sz+gp*1.4)+18,lx=N?P.x+w+22:P.x+12;
      g+=`<circle cx="${f1(lx+5)}" cy="${f1(ly-4)}" r="5" style="fill:var(--enzyme)"/>`+tx(lx+15,ly,`${k} pancreatic insufficient`,'t-xs',bold);
      g+=`<circle cx="${f1(lx+5)}" cy="${f1(ly+12)}" r="5" style="fill:var(--line)"/>`+tx(lx+15,ly+16,'pancreatic sufficient','t-xs',ink);
      g+=tx(lx,ly+40,'genotype decides which:','t-xs',ink)+tx(lx,ly+54,'two "severe" alleles → PI','t-xs')+tx(lx,ly+68,'a "mild" allele (e.g. R117H) → PS','t-xs')}
    else{const cx=P.x+P.w/2,cy=P.y+(N?100:120),r=N?72:76,v=lerp(420,55,ramp(t,.17,.3));
      g+=tx(cx,P.y+10,'faecal elastase-1 (µg/g)','t-sm t-mid',bold);
      g+=gauge(cx,cy,r,v,500,{bands:[{to:100,col:'var(--bad)'},{to:200,col:'var(--warn)'},{to:500,col:'var(--good)'}]});
      [['var(--bad)','&lt;100 severe'],['var(--warn)','&lt;200'],['var(--good)','&gt;200 normal']].forEach(([c,l],i)=>{const lx=cx-98+[0,82,132][i];g+=`<circle cx="${f1(lx+4)}" cy="${f1(cy+58)}" r="4" style="fill:${c}"/>`+tx(lx+11,cy+61,l,'t-xs',ink)});
      g+=tx(cx,cy+30,v<100?'severe insufficiency':v<200?'supports insufficiency':'normal range','t-sm t-mid',`font-weight:700;fill:${v<200?'var(--bad)':'var(--good)'}`);
      g+=tx(cx,cy+80,'needle schematic; bands as published','t-xs t-mid')}
    return g}
  /* ---- scene 3: meconium ileus ---- */
  function scMI(S,t,N){const d=ramp(t,.35,.46),pl=ramp(t,.33,.39),X=u=>S.x+S.w*u,Y=v=>S.y+S.h*v;
    const A=[[X(.06),Y(.14)],[X(.4),Y(.12)],[X(.7),Y(.15)],[X(.76),Y(.27)],[X(.5),Y(.36)],[X(.18),Y(.36)],[X(.08),Y(.48)],[X(.2),Y(.6)],[X(.5),Y(.6)],[X(.64),Y(.62)]];
    const B=[[X(.7),Y(.66)],[X(.74),Y(.78)],[X(.5),Y(.86)],[X(.28),Y(.86)],[X(.1),Y(.9)]];
    let g=tube(A,lerp(13,(N?22:26),d))+tube(B,6.5);
    /* gas and fluid in the swollen loops */
    for(let i=0;i<7;i++){const p=along(A,i/7+.04);g+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="${f1(lerp(1.5,5,d))}" style="fill:var(--water-soft);opacity:.9"/>`}
    /* the meconium plug */
    for(let i=0;i<4;i++){if(pl<=i/4)continue;const p=along([[X(.64),Y(.62)],[X(.7),Y(.66)]],i/3);g+=`<ellipse cx="${f1(p[0]+(i%2?3:-3))}" cy="${f1(p[1])}" rx="${f1(7*Math.min(1,(pl-i/4)*4))}" ry="6" style="fill:var(--mucus-thick);stroke:var(--mucus-ink);stroke-width:1"/>`}
    g+=tx(X(.4),Y(.03),'bowel swells above the block','t-xs t-mid',`${bold};opacity:${f1(.3+.7*d)}`);
    g+=`<line x1="${f1(X(.72))}" y1="${f1(Y(.64))}" x2="${f1(X(.8))}" y2="${f1(Y(.64))}" style="stroke:var(--mucus-ink);stroke-width:1"/>`;
    g+=tx(X(.81),Y(.64)+3,'thick meconium','t-xs',bold)+tx(X(.81),Y(.64)+15,'plugs the bowel','t-xs',ink);
    g+=tx(X(.12),Y(.97),'narrow, empty bowel below','t-xs','fill:var(--ink)');
    return g}
  function pnMI(P,t,N){const g0=ramp(t,.37,.47);let g='';
    g+=`<text x="${f1(P.x)}" y="${f1(P.y+36)}" class="t-big" style="font-size:34px;fill:var(--brand)">1 in 5</text>`;
    g+=tx(P.x+(N?118:112),P.y+22,'of people diagnosed','t-xs',ink)+tx(P.x+(N?118:112),P.y+35,'with CF (about 20%)','t-xs',ink);
    g+=tx(P.x,P.y+58,'13–17% of all people with CF (review)','t-xs');
    const bw=P.w-50;g+=tx(P.x,P.y+80,'first-year survival','t-sm',bold)+tx(P.x,P.y+93,'after meconium ileus','t-xs',ink);
    g+=hbar(P.x,P.y+114,bw,55*g0,100,'var(--muted)','born 1958–1972',`${Math.round(55*g0)}%`);
    g+=hbar(P.x,P.y+144,bw,96*g0,100,'var(--good)','born 1973–1987',`${Math.round(96*g0)}%`);
    g+=tx(P.x,P.y+(N?176:178),'later liver disease: incidence rate','t-xs',ink)+tx(P.x,P.y+(N?189:191),'ratio 5.5 after meconium ileus','t-xs',ink);
    return g}
  /* ---- scene 4: DIOS against constipation ---- */
  function scDIOS(S,t,N){const gw=S.w*.47,gh=S.h*.74,y0=S.y+12,u=ramp(t,.5,.62);let g='';
    [[S.x,'DIOS'],[S.x+S.w-gw,'constipation']].forEach(([x0,kind],j)=>{
      const C=colonPts(x0,y0,gw,gh);g+=colon(C,N?12:14);
      /* small bowel loops entering the caecum */
      const sb=[[x0+gw*.5,y0+gh*.3],[x0+gw*.7,y0+gh*.4],[x0+gw*.36,y0+gh*.5],[x0+gw*.66,y0+gh*.62],[x0+gw*.3,y0+gh*.74],[x0+gw*.2,y0+gh*.82]];
      g+=tube(sb,j===0?lerp(7,12,u):7);
      if(j===0){const m=[x0+gw*.18,y0+gh*.8];g+=`<ellipse cx="${f1(m[0])}" cy="${f1(m[1])}" rx="${f1(4+8*u)}" ry="${f1(4+7*u)}" style="fill:var(--duct);stroke:var(--mucus-ink);stroke-width:1"/>`;
        g+=`<circle cx="${f1(m[0])}" cy="${f1(m[1])}" r="${f1(14+8*u)}" style="fill:none;stroke:var(--bad);stroke-width:1.6;stroke-dasharray:3 3;opacity:${f1(u)}"/>`}
      else{const n=Math.round(4+18*u);for(let i=0;i<n;i++){const p=along(C,(i+.5)/22);g+=`<ellipse cx="${f1(p[0])}" cy="${f1(p[1])}" rx="4.2" ry="3.4" style="fill:var(--duct);opacity:.9"/>`}}
      const cx=x0+gw/2;g+=tx(cx,y0+gh+28,kind==='DIOS'?'DIOS':'Constipation','t-lbl t-mid');
      g+=tx(cx,y0+gh+42,kind==='DIOS'?'acute block at the ileocaecum':'gradual, the whole colon','t-xs t-mid',ink)});
    return g}
  function pnDIOS(P,t,N){const g0=ramp(t,.52,.62),bw=P.w-58;let g=tx(P.x,P.y+10,'lifetime prevalence (review)','t-sm',bold);
    g+=hbar(P.x,P.y+32,bw,8*g0,50,'var(--bad)','DIOS, children',`${Math.round(8*g0)}%`);
    g+=hbar(P.x,P.y+62,bw,16*g0,50,'var(--bad)','DIOS, adults',`${Math.round(16*g0)}%`);
    g+=hbar(P.x,P.y+92,bw,47*g0,50,'var(--duct)','constipation, children',g0>.99?'26–47%':`${Math.round(47*g0)}%`,{lo:26*g0});
    g+=hbar(P.x,P.y+122,bw,42*g0,50,'var(--duct)','constipation, adults',`${Math.round(42*g0)}%`);
    g+=tx(P.x,P.y+156,'DIOS in children: 6.2 episodes','t-xs',ink)+tx(P.x,P.y+169,'per 1,000 patient-years','t-xs',ink);
    g+=tx(P.x,P.y+189,'conservative treatment worked','t-xs',ink)+tx(P.x,P.y+202,'in 49 of 51 episodes (96%)','t-xs',bold);
    return g}
  /* ---- scene 5: the liver ---- */
  const LIV='M10 50C30 10 140 4 196 26C186 62 130 108 66 122C30 130 2 100 10 50Z';
  const LIVP=bezPts([[[10,50],[30,10],[140,4],[196,26]],[[196,26],[186,62],[130,108],[66,122]],[[66,122],[30,130],[2,100],[10,50]]],12);
  const TIPS=[[30,62],[50,34],[92,26],[134,26],[168,36],[122,66],[62,86]];
  function scLiver(S,t,N){const k=Math.min(S.w*.96/262,S.h*.8/150),ox=S.x+(S.w-262*k)/2,oy=S.y+18,T=(a,b)=>[ox+a*k,oy+b*k];
    const pl=ramp(t,.66,.7),foc=ramp(t,.69,.74),nod=ramp(t,.74,.8),sp=ramp(t,.76,.82);
    let g=`<g transform="translate(${f1(ox)} ${f1(oy)}) scale(${f1(k)})">`;
    g+=`<path d="${LIV}" style="fill:var(--airway);stroke:var(--bronchi);stroke-width:${f1(1.4/k)}"/>`;
    if(nod>0)g+=`<path d="${LIV}" style="fill:var(--duct);opacity:${f1(.28*nod)}"/>`;
    /* spleen and the portal vein */
    g+=`<ellipse cx="238" cy="70" rx="${f1(lerp(12,22,sp))}" ry="${f1(lerp(22,38,sp))}" style="fill:var(--bronchi);opacity:.75"/>`;
    g+=`<path d="M220 88C180 110 120 112 82 104" style="fill:none;stroke:var(--bicarb);stroke-width:${f1(lerp(3,7,sp))};stroke-linecap:round;opacity:.75"/>`;
    if(sp>0)g+=`<path d="M150 122q6 -8 12 0t12 0t12 0" style="fill:none;stroke:var(--bad);stroke-width:2.4;opacity:${f1(sp)}"/>`;
    /* bile ducts from the hilum */
    TIPS.forEach(p=>{g+=`<path d="M80 104Q${f1((80+p[0])/2+6)} ${f1((104+p[1])/2+8)} ${p[0]} ${p[1]}" style="fill:none;stroke:var(--mucus);stroke-width:${f1(2.2)};stroke-linecap:round"/>`});
    TIPS.forEach((p,i)=>{if(pl>i/TIPS.length)g+=`<circle cx="${p[0]}" cy="${p[1]}" r="3.4" style="fill:var(--mucus-thick)"/>`});
    [0,3,5].forEach(i=>{const p=TIPS[i];if(foc>0)g+=`<circle cx="${p[0]}" cy="${p[1]}" r="${f1(11*foc)}" style="fill:var(--duct);opacity:.35"/><circle cx="${p[0]}" cy="${p[1]}" r="${f1(11*foc)}" style="fill:none;stroke:var(--duct);stroke-width:1;stroke-dasharray:2 2"/>`});
    if(nod>0)for(let a=18;a<200;a+=17)for(let b=18;b<130;b+=16){const q=[a+(b%32?8:0),b];if([[0,0],[7,0],[-7,0],[0,7],[0,-7]].every(d=>inPoly([q[0]+d[0],q[1]+d[1]],LIVP)))g+=`<circle cx="${q[0]}" cy="${q[1]}" r="6" style="fill:none;stroke:var(--duct);stroke-width:1.2;opacity:${f1(nod*.85)}"/>`}
    g+='</g>';
    g+=tx(T(4,-4)[0],T(4,-4)[1],'liver, with its bile ducts (yellow)','t-xs',bold);
    if(foc>.2)g+=tx(T(28,136)[0],T(28,136)[1]+(N?2:0),'patches: focal biliary cirrhosis','t-xs',`fill:var(--ink);opacity:${f1(foc)}`);
    if(nod>.2)g+=tx(T(28,136)[0],T(28,136)[1]+14,'nodules: multilobular cirrhosis','t-xs',`font-weight:600;fill:var(--ink);opacity:${f1(nod)}`);
    const sl=T(238,8);g+=tx(sl[0],sl[1]-4,sp>.3?'spleen enlarges':'spleen','t-xs t-mid',ink);
    if(sp>.3)g+=tx(sl[0],sl[1]+8,'portal hypertension','t-xs t-mid',`fill:var(--bicarb);font-weight:600;opacity:${f1(sp)}`);
    if(sp>.3){const vp=T(192,124);g+=tx(vp[0],vp[1]+3,'varices','t-xs',`fill:var(--bad);font-weight:600;opacity:${f1(sp)}`)}
    return g}
  function pnLiver(P,t,N){const age=30*ramp(t,.67,.81),x=P.x+26,y=P.y+30,w=P.w-40,h=N?118:150,X=a=>x+w*a/30,Y=v=>y+h-h*v/35;
    let g=tx(P.x,P.y+10,'cumulative CF liver disease, %','t-sm',bold)+tx(P.x,P.y+22,'French cohort, 3,328 people','t-xs');
    g+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" style="fill:var(--field)"/>`;
    [10,20,30].forEach(v=>{g+=`<line x1="${f1(x)}" x2="${f1(x+w)}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/>`+tx(x-4,Y(v)+3,v,'t-xs t-end')});
    g+=`<line x1="${f1(x)}" x2="${f1(x+w)}" y1="${f1(y+h)}" y2="${f1(y+h)}" class="axis"/><line x1="${f1(x)}" x2="${f1(x)}" y1="${f1(y)}" y2="${f1(y+h)}" class="axis"/>`;
    [0,10,20,30].forEach(a=>{g+=tx(X(a),y+h+12,a,'t-xs t-mid')});g+=tx(x+w,y+h+24,'age, years','t-xs t-end');
    const a1=Math.min(age,25);if(a1>0)g+=`<path d="M${f1(X(0))} ${f1(Y(0))}L${f1(X(a1))} ${f1(Y(32.2*a1/25))}" style="stroke:var(--brand);stroke-width:2.6;stroke-linecap:round"/><circle cx="${f1(X(a1))}" cy="${f1(Y(32.2*a1/25))}" r="4" style="fill:var(--brand)"/>`;
    if(age>=25)g+=tx(X(25)-4,Y(32.2)-8,'any CFLD 32.2% by 25','t-xs t-end',bold);
    if(age>5){const a2=age;g+=`<path d="M${f1(X(0))} ${f1(Y(0))}L${f1(X(5))} ${f1(Y(0))}L${f1(X(a2))} ${f1(Y(10*(a2-5)/25))}" style="fill:none;stroke:var(--bad);stroke-width:2.6;stroke-linecap:round;stroke-dasharray:5 3"/>`}
    if(age>=29.5)g+=tx(X(30)-2,Y(10)-8,'severe 10% by 30','t-xs t-end','fill:var(--bad);font-weight:600');
    g+=tx(P.x,y+h+(N?40:42),'lines join the published anchor points','t-xs');
    return g}
  /* ---- scene 6: colorectal cancer screening ---- */
  function scCancer(S,t,N){const age=70*ramp(t,.84,.97),tx0=S.x+14,tw=S.w-28,ty1=S.y+S.h*.5,ty2=S.y+S.h*.8;let g='';
    const C=colonPts(S.x+S.w/2-56,S.y+6,112,S.h*.3);g+=colon(C,10);
    const pp=along(C,.55);g+=`<circle cx="${f1(pp[0])}" cy="${f1(pp[1])}" r="4" style="fill:var(--inflamed)"/>`;
    g+=tx(S.x+S.w/2+70,S.y+S.h*.17,'colonoscopy looks','t-xs',ink)+tx(S.x+S.w/2+70,S.y+S.h*.17+12,'inside the colon','t-xs',ink);
    [[ty1,'people with CF',40],[ty2,'after an organ transplant',30]].forEach(([yy,lab,st],j)=>{
      const tl=tline(tx0,yy,tw,{min:0,max:70,step:10});g+=tl.svg+tx(tx0,yy-22,lab,'t-sm',bold);
      if(age>0)g+=`<line x1="${f1(tl.X(0))}" x2="${f1(tl.X(Math.min(age,70)))}" y1="${f1(yy)}" y2="${f1(yy)}" style="stroke:var(--brand);stroke-width:3;opacity:.5"/>`;
      if(age>=st){const xs=tl.X(st);g+=`<circle cx="${f1(xs)}" cy="${f1(yy)}" r="7" style="fill:var(--brand)"/>`+tx(xs,yy-10,`start at ${st}`,'t-xs t-mid','fill:var(--brand);font-weight:700');
        if(j===0)for(let a=45;a<=Math.min(age,70);a+=5)g+=`<circle cx="${f1(tl.X(a))}" cy="${f1(yy)}" r="4" style="fill:var(--panel);stroke:var(--brand);stroke-width:2"/>`;
        if(j===1)g+=tx(xs,yy+30,'within 2 years of transplant','t-xs t-mid',ink)}});
    g+=tx(tx0+tw,ty1+30,'○ re-screen every 5 years','t-xs t-end',ink);
    g+=tx(tx0,ty2+44,'age, years · CFF 2018 recommendations','t-xs');
    return g}
  function pnCancer(P,t,N){const g0=ramp(t,.85,.95),bw=P.w-50;let g=tx(P.x,P.y+10,'gastrointestinal cancer, SIR','t-sm',bold)+tx(P.x,P.y+23,'1 = the general population','t-xs');
    g+=hbar(P.x,P.y+48,bw,1,25,'var(--muted)','general population','1');
    g+=hbar(P.x,P.y+78,bw,4.18*g0,25,'var(--brand)','CF, no transplant',g0>.99?'4.18':f1(4.18*g0));
    g+=hbar(P.x,P.y+108,bw,8.13*g0,25,'var(--brand)','all people with CF',g0>.99?'8.13':f1(8.13*g0));
    g+=hbar(P.x,P.y+144,bw,21.13*g0,25,'var(--bad)','after lung transplant',g0>.99?'21.13':f1(21.13*g0));
    g+=tx(P.x,P.y+170,'pooled, 6 cohorts, 99,925 people','t-xs')+tx(P.x,P.y+184,'population figures, not a forecast','t-xs',ink);
    return g}
  const SCN=[scPanc,scPanc,scMI,scDIOS,scLiver,scCancer],PAN=[pnPanc,pnPanc,pnMI,pnDIOS,pnLiver,pnCancer];
  function draw(t){const N=vb(svg,'720 384','400 600'),p=phaseOf(STEPS,t),P=STEPS[p];
    const L=N?{tx:16,ty:26,S:{x:16,y:54,w:368,h:250},P:{x:16,y:330,w:368,h:210},sx:16,sy:566,sw:368}
             :{tx:20,ty:28,S:{x:20,y:60,w:420,h:268},P:{x:466,y:60,w:236,h:268},sx:20,sy:352,sw:680};
    let s=`<text x="${L.tx}" y="${L.ty}" class="t-big">${P.t}</text><text x="${L.tx}" y="${L.ty+16}" class="t-sm">${P.sub}</text>`;
    if(!N)s+=`<line x1="${L.P.x-12}" x2="${L.P.x-12}" y1="${L.P.y}" y2="${L.P.y+L.P.h}" style="stroke:var(--line)"/>`;
    else s+=`<line x1="${L.P.x}" x2="${L.P.x+L.P.w}" y1="${L.P.y-14}" y2="${L.P.y-14}" style="stroke:var(--line)"/>`;
    s+=SCN[p](L.S,t,N,p)+PAN[p](L.P,t,N,p);
    const sw=L.sw/STRIP.length;
    STRIP.forEach((q,i)=>{const on=i===p,x=L.sx+i*sw;s+=`<rect x="${f1(x+1)}" y="${L.sy}" width="${f1(sw-2)}" height="6" rx="3" style="fill:${on?'var(--brand)':'var(--panel-2)'}"/><text x="${f1(x+sw/2)}" y="${L.sy+20}" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:600':''}">${q}</text>`});
    s+=`<circle cx="${f1(L.sx+L.sw*t)}" cy="${L.sy+3}" r="5.5" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;
    svg.innerHTML=s;note.innerHTML=noteHTML(P);setA(p)}
  const stop=playWire(rg,$('#dgPlay'),draw,30000,'%t:player.replay%','digestive');
  const setA=stepWire($('#dgSteps'),STEPS,rg,draw,stop);
  draw(+rg.value);

  /* =============== where in the gut: the map =============== */
  const map=$('#dgMap'),info=$('#dgMapInfo');
  const CX={
    panc:{t:'Pancreas: insufficiency and pancreatitis',tag:'pancreas',items:[
      'About 85% of people with CF are pancreatic insufficient [[Singh2017PI]]; 80% to 90% need enzyme replacement to prevent malnutrition [[Somaraju2020]].',
      'Faecal elastase below 200 µg/g is one listed reason to start enzymes in infants (CFF 2009) [[Borowitz2009]]; the best cut-off in 725 people with CF was 184 µg/g, and the authors suggest a 160–200 µg/g range [[Walkowiak2002]].',
      'Pancreatitis needs surviving gland tissue, so it is a complication of pancreatic sufficiency <span class="ev est">Established</span>: 62 of 277 pancreatic-sufficient people (22%) had it, and by age 50 it had affected 50% with mild-genotype scores against 27% with moderate-severe ones [[Ooi2011Pancreatitis]].']},
    mi:{t:'Meconium ileus (newborn)',tag:'small bowel',items:[
      'Often the first sign of CF; about 20% of people diagnosed with CF [[Sathe2017MI]], or 13% to 17% of all people with CF [[vanderDoef2011]].',
      'First-year survival rose from 55% (born 1958–1972) to 96% (born 1973–1987) [[vanderDoef2011]].',
      'A risk factor for later liver disease: incidence rate ratio 5.5 (95% CI 2.7–11) [[Colombo2002Liver]], and an independent risk factor in a French cohort of 3,328 people [[Boelle2019]].']},
    dios:{t:'DIOS: distal intestinal obstruction syndrome',tag:'ileocaecum',items:[
      '"An acute complete or incomplete faecal obstruction in the ileocaecum" (ESPGHAN CF Working Group); 6.2 episodes per 1,000 patient-years in children at 8 European centres [[Houwen2010]].',
      'Lifetime about 8% in children and 16% in adults; 10% to 20% of people have an episode early after lung transplant [[vanderDoef2011]].',
      'More common with past meconium ileus (40% vs 18%), diabetes (49% vs 25%) and liver disease (22% vs 12%); medical treatment failed only in complete DIOS (11%) [[Munck2016]].',
      'ECFS guidance: treatment is rehydration plus stool softeners or gut lavage [[Colombo2011DIOS]].']},
    con:{t:'Constipation',tag:'whole colon',items:[
      'Gradual faecal impaction of the total colon [[Houwen2010]].',
      'Present in 47% of 214 children with CF; low total fat absorption and meconium ileus were independent risk factors, while fibre and fluid intake were not [[vanderDoef2010]].',
      'Lifetime 26–47% in children and 42% in adults [[vanderDoef2011]].']},
    gerd:{t:'Gastro-oesophageal reflux',tag:'oesophagus',items:[
      'Common in children and adults with CF; pathological reflux is frequent at all ages [[Maqbool2017GERD]].',
      'Pooled incidence in children 46% (range 19–81%; 7 studies, 212 patients). After antireflux surgery in 82 children, 18% had major complications and 59% had better symptoms at a median of 2 years [[Ng2021GERD]].']},
    liver:{t:'CF liver disease',tag:'liver',items:[
      'About 5–10% develop multilobular cirrhosis in the first decade; most then develop portal hypertension (mainly variceal bleeding) [[Debray2011]].',
      'Any CF liver disease reached 32.2% by age 25 and severe disease 10% by 30 in a French cohort; male sex, F508del homozygosity and meconium ileus were risk factors [[Boelle2019]].',
      'Hepatomegaly, reported in up to 30%, is the most common finding. CFF 2024 screening: yearly liver blood tests and abdominal examination, and an ultrasound at least every 2 years from age 3 until late adolescence [[Sellers2024]].',
      'CFF 2024 recommends against routine ursodeoxycholic acid to prevent advanced liver disease [[Sellers2024]]; Cochrane found "insufficient evidence to justify its routine use" [[Cheng2017]].']},
    gb:{t:'Gallbladder and bile ducts',tag:'gallbladder',items:[
      'Gallbladder and bile-duct disease, including gallstones, are common complications of CF [[Assis2017]].',
      'CFF 2024 lists cholelithiasis and sclerosing cholangitis within CF hepatobiliary involvement, and recommends cholecystectomy for symptomatic gallbladder disease [[Sellers2024]].']},
    ca:{t:'Gastrointestinal cancer',tag:'bowel',items:[
      'Pooled SIR 8.13 for gastrointestinal cancer: small bowel 18.94, biliary tract 17.87, colon 10.91, pancreas 6.18 [[Yamada2018]].',
      'CFF task force: colorectal cancer risk is 5–10 times the general population, 25–30 times after organ transplantation; colonoscopy from age 40, or 30 after transplant [[Hadjiliadis2018]].',
      'These are population ratios, not an individual forecast.']}
  };
  const ORDER=['panc','mi','dios','con','gerd','liver','gb','ca'];
  const on=new Set(['panc','dios']);
  /* the map, in a 400 x 440 frame (the person's right is on the viewer's left) */
  const ST='M212 96C246 86 286 102 286 140C286 178 254 198 224 192C206 189 198 178 204 168C214 152 232 152 236 138C238 122 222 114 210 110Z';
  const LV='M60 96C100 70 190 74 216 98C208 124 182 144 150 154C118 164 82 160 62 144C50 130 50 108 60 96Z';
  const COL=[[110,372],[110,268],[310,268],[310,366],[240,392],[226,428]];
  const SB=[[196,248],[254,286],[150,300],[262,316],[150,334],[252,350],[122,364]];
  const OES=[[200,8],[204,60],[212,100]];
  function hl(d,on,kind='path'){return on?`<path d="${d}" style="fill:none;stroke:var(--brand);stroke-width:9;opacity:.22;stroke-linejoin:round;stroke-linecap:round"/><path d="${d}" style="fill:none;stroke:var(--brand);stroke-width:2.4;stroke-linejoin:round;stroke-linecap:round;stroke-dasharray:${kind==='dash'?'5 4':'none'}"/>`:''}
  function drawMap(){const N=NARROW();map.setAttribute('viewBox','0 0 420 450');let s='';
    /* body outline */
    s+=`<path d="M128 4H272C300 40 352 70 370 140C384 220 380 330 350 440H70C40 330 36 220 50 140C68 70 100 40 128 4Z" style="fill:var(--skin);opacity:.45"/>`;
    s+=`<path d="${ptsD(OES)}" style="fill:none;stroke:var(--gut);stroke-width:11;stroke-linecap:round"/><path d="${ptsD(OES)}" style="fill:none;stroke:var(--duct);stroke-width:1;opacity:.6"/>`;
    s+=`<path d="${LV}" style="fill:var(--airway);stroke:var(--bronchi);stroke-width:1.4"/>`;
    s+=`<ellipse cx="146" cy="158" rx="11" ry="16" transform="rotate(-20 146 158)" style="fill:var(--bact);opacity:.55;stroke:var(--bact)"/>`;
    s+=`<path d="${ST}" style="fill:var(--gut);stroke:var(--duct);stroke-width:1.4"/>`;
    s+=colon(COL,18);
    s+=pancreas(150,176,.72,{flow:.6,ph:.2}).svg;
    s+=tube(SB,10);
    s+=`<path d="M110 372L110 390" style="stroke:var(--gut);stroke-width:12;stroke-linecap:round"/>`;
    /* highlights */
    s+=hl(ptsD(OES)+'M204 100C220 96 236 104 240 114',on.has('gerd'));
    s+=hl(LV,on.has('liver'));
    if(on.has('gb'))s+=`<ellipse cx="146" cy="158" rx="16" ry="21" transform="rotate(-20 146 158)" style="fill:none;stroke:var(--brand);stroke-width:2.4"/>`;
    if(on.has('panc'))s+=`<path d="${PANC}" transform="translate(150 176) scale(.72)" style="fill:var(--brand);fill-opacity:.12;stroke:var(--brand);stroke-width:3.4"/>`;
    s+=hl(smoothPath(SB.slice(-3),false),on.has('mi'));
    if(on.has('dios'))s+=`<circle cx="116" cy="366" r="20" style="fill:var(--brand);fill-opacity:.12;stroke:var(--brand);stroke-width:2.4"/>`;
    s+=hl(ptsD(COL),on.has('con'));
    if(on.has('ca'))s+=hl(ptsD(COL),true,'dash')+hl(smoothPath(SB,false),true,'dash');
    /* labels with leader lines */
    const LB=[['oesophagus',212,40,228,34,'gerd'],['stomach',280,112,300,100,'gerd'],['liver',70,92,22,70,'liver'],['gallbladder',140,170,22,190,'gb'],
      ['pancreas',286,196,304,214,'panc'],['small bowel',258,320,316,300,'mi'],['ileocaecum',112,370,22,400,'dios'],['colon',310,320,336,346,'con']];
    LB.forEach(([n,ax,ay,lx,ly,k])=>{const act=on.has(k)||(k==='mi'&&on.has('ca'))||(k==='con'&&on.has('ca'));
      s+=`<line x1="${ax}" y1="${ay}" x2="${lx+(lx<ax?40:0)}" y2="${ly-3}" style="stroke:${act?'var(--brand)':'var(--muted)'};stroke-width:1"/>`+tx(lx,ly,n,'t-sm',act?'fill:var(--brand);font-weight:700':'fill:var(--ink)')});
    void N;map.innerHTML=s;
    const ks=ORDER.filter(k=>on.has(k));
    info.innerHTML=ks.length?ks.map(k=>{const c=CX[k];return `<div class="card"><span class="tag brand">${c.tag}</span><h4>${c.t}</h4><ul>${c.items.map(i=>`<li>${i}</li>`).join('')}</ul></div>`}).join(''):'<p class="stage-cap">Switch on a complication above to see its figures.</p>';
    $$('[data-dg]').forEach(b=>b.setAttribute('aria-pressed',on.has(b.dataset.dg)))}
  $('#dgMapBtns').addEventListener('click',e=>{const x=e.target.closest('[data-dgx]');if(x){x.dataset.dgx==='all'?ORDER.forEach(q=>on.add(q)):on.clear();drawMap();return}
    const b=e.target.closest('[data-dg]');if(!b)return;const k=b.dataset.dg;on.has(k)?on.delete(k):on.add(k);drawMap()});
  drawMap();
  const prevR=redraws.digestive;redraws.digestive=()=>{prevR&&prevR();drawMap()};
};
