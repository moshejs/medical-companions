/* =============== 3.1 Blood tests, scans & biopsy =============== */
/* the seven tiles of the dashboard: dir = typical direction as cirrhosis advances (0 = no single direction shown) */
const TE_TILES=[
 {k:'ALT',sub:'leaks from injured cells',dir:0,txt:'read it beside AST',st:0},
 {k:'AST',sub:'also leaks from cells',dir:1,txt:'AST/ALT often above 1',st:0},
 {k:'ALP',sub:'bile-duct enzyme',dir:1,txt:'high in cholestatic causes',st:1},
 {k:'Bilirubin',sub:'yellow bile pigment',dir:1,txt:'conjugated part rises',st:1},
 {k:'Albumin',sub:'protein the liver makes',dir:-1,txt:'falls: less is made',st:2},
 {k:'INR',sub:'clotting-time ratio',dir:1,txt:'higher adds score points',st:2},
 {k:'Platelets',sub:'clotting cells',dir:-1,txt:'spleen holds them',st:2}
];
const TE_STEPS=[
 {from:0,at:.09,k:'Step 1 · liver-cell enzymes',t:'ALT and AST',
  txt:`ALT and AST leak from injured liver cells. ACG defines a hepatocellular pattern as AST and ALT raised out of proportion to alkaline phosphatase, and gives a "true healthy normal" ALT of 29–33 IU/L for males and 19–25 IU/L for females. In 100 people with chronic hepatitis B, the mean AST/ALT ratio was 0.59 without cirrhosis and 1.02 with it; the ratio often rose above 1.0 as cirrhosis first appeared. [[Kwo2017ACG,Williams1988ASTALT]]`,
  pt:`ALT and AST show whether liver cells are being hurt. In cirrhosis the balance between them often shifts, so doctors look at the ratio, not just whether each is "high".`,
  hook:`AST/ALT ratio &gt;1 in non-alcohol-related chronic liver disease suggests cirrhosis; a ratio &gt;2 is usually seen in alcohol-related liver disease.`},
 {from:.2,at:.29,k:'Step 2 · bile flow',t:'ALP and bilirubin',
  txt:`A cholestatic pattern is alkaline phosphatase raised out of proportion to AST and ALT; a hepatic ALP rise prompts testing for primary biliary cholangitis (PBC) and primary sclerosing cholangitis (PSC). Most circulating bilirubin is unconjugated; a raised conjugated (direct) bilirubin implies hepatocellular disease or biliary obstruction in most settings. [[Kwo2017ACG]]`,
  pt:`Alkaline phosphatase and bilirubin rise when bile cannot flow freely or the liver cannot clear it. Bilirubin is the pigment that turns skin and eyes yellow.`,
  hook:`Hepatocellular = AST/ALT ≫ ALP. Cholestatic = ALP ≫ AST/ALT. Raised conjugated bilirubin = liver disease or obstruction.`},
 {from:.4,at:.5,k:'Step 3 · function and pressure',t:'Albumin, INR, platelets',
  txt:`Reduced synthesis in liver disease is the best-understood cause of a chronically low albumin. INR sits in both Child–Pugh and MELD, and a higher INR adds points. Platelets below 150,000/µL have been seen in up to 76% of people with chronic liver disease, from splenic sequestration, marrow suppression and less thrombopoietin; a count below 160 ×10³/µL raised the likelihood of cirrhosis (LR 6.3). [[Levitt2016,Peng2016ChildMELD,Kim2008MELDNa,Afdhal2008Platelets,Udell2012JAMA]]`,
  pt:`When the liver scars, the spleen can grow and hold on to platelets, so a low platelet count can be a clue to cirrhosis. A low albumin can mean the liver is making less protein.`,
  hook:`Platelets &lt;160 ×10³/µL: LR 6.3 for cirrhosis. Platelets ≥160: LR 0.29.`},
 {from:.6,at:.7,k:'Step 4 · the scan',t:'Ultrasound features',
  txt:`In 300 people with raised aminotransferases who had both ultrasound and biopsy, liver surface nodularity was the most accurate sign of severe fibrosis or cirrhosis (specificity 95%, LR+ 11.6). It alone raised the post-test probability from 35% to 86%; adding caudate hypertrophy and hepatic-vein flow raised it only to 88%. The right lobe shrinks and the caudate lobe enlarges: a caudate-to-right-lobe ratio was 84% sensitive and 100% specific in a small 1980 series. Ascites on examination carries an LR of 7.2. [[Colli2003US,Harbin1980Caudate,Udell2012JAMA]]`,
  pt:`An ultrasound can show a bumpy liver surface, a change in the shape of the liver's lobes, and fluid in the belly. A smooth scan does not fully rule cirrhosis out.`,
  hook:`Best single ultrasound sign of cirrhosis: surface nodularity (specificity 95%).`},
 {from:.8,at:.92,k:'Step 5 · tissue',t:'Biopsy: role and risks',
  txt:`An optimal specimen is 20–25 mm long and/or holds more than 11 complete portal tracts; published percutaneous series averaged 17.7 mm. Samples from the right and left lobes differed by at least one fibrosis stage in 33.1%, which the authors attribute to sampling error. In 61,187 elective biopsies in England, major bleeding was about 6 per 1000 and deaths directly due to biopsy at most about 1 in 10,000. [[Cholongitas2006Biopsy,Regev2002,West2010Biopsy]]`,
  pt:`A liver biopsy takes a tiny piece of liver. Serious bleeding happens in about 6 in 1000 biopsies, which is why blood tests and scans are tried first.`,
  hook:`Biopsy can miss cirrhosis through sampling error: in 14.5% of paired-lobe biopsies one lobe read as cirrhosis and the other as stage 3.`}
];
/* practice cases for the sorter: d = directions for the seven tiles (1 up, -1 down, 0 not mentioned, 2 strongly up) */
const TE_CASES=[
 {txt:`<b>Case 1.</b> ALT and AST are both clearly raised; alkaline phosphatase is only slightly above its range. Bilirubin, albumin, INR and platelets are not mentioned as abnormal.`,d:[2,2,1,0,0,0,0],a:'h',
  why:`ALT and AST raised out of proportion to ALP is ACG's definition of a hepatocellular pattern. The ACG work-up for it covers hepatitis A, B and C, fatty liver disease, alcohol-related liver disease, haemochromatosis, autoimmune hepatitis, Wilson disease, alpha-1 antitrypsin deficiency and a medicine history. [[Kwo2017ACG]]`},
 {txt:`<b>Case 2.</b> Alkaline phosphatase is raised well out of proportion to ALT and AST, and the conjugated (direct) bilirubin is up.`,d:[1,1,2,1,0,0,0],a:'c',
  why:`ALP raised out of proportion to AST and ALT defines a cholestatic pattern, and a raised conjugated bilirubin implies hepatocellular disease or biliary obstruction in most settings. A hepatic ALP elevation prompts testing for PBC and PSC. <button class="btn ghost" data-go="othercauses">Bile-duct diseases →</button> [[Kwo2017ACG]]`},
 {txt:`<b>Case 3.</b> Albumin is low, INR and bilirubin are high and platelets are low, while ALT and AST are only mildly abnormal.`,d:[1,1,0,1,-1,1,-1],a:'a',
  why:`Bilirubin, albumin and INR are three of the five Child–Pugh items, and bilirubin and INR are in MELD: they describe how well the liver is working, not how much it is injured today. Reduced synthesis is the best-understood cause of a chronically low albumin, and low platelets point to the spleen holding them. <button class="btn ghost" data-go="scores">Child–Pugh &amp; MELD →</button> [[Peng2016ChildMELD,Kim2008MELDNa,Levitt2016,Afdhal2008Platelets]]`},
 {txt:`<b>Case 4.</b> AST is more than twice ALT; both are raised. Alkaline phosphatase is near its range.`,d:[1,2,0,0,0,0,0],a:'h',
  why:`AST and ALT dominate, so this is a hepatocellular pattern. Williams and Hoofnagle noted that an AST/ALT ratio above 2.0 is usually seen in alcohol-related liver disease and below 1.0 in chronic hepatitis, though the ratio is less helpful for telling causes apart once cirrhosis is present. [[Kwo2017ACG,Williams1988ASTALT]]`},
 {txt:`<b>Case 5.</b> A person with hepatitis C has an AST/ALT ratio of 1 or more and a low platelet count.`,d:[1,1,0,0,0,0,-1],a:'a',
  why:`In 252 people with hepatitis C-related chronic liver disease, an AST/ALT ratio ≥1 was more frequent in cirrhosis, and AST/ALT combined with the platelet count gave a 97.0% positive and 97.9% negative predictive value for cirrhosis in that cohort. Low platelets are also an HCC risk marker. [[Giannini2003ASTALT,Ioannou2007HCC]]`},
 {txt:`<b>Case 6.</b> A woman's ALT is 45 IU/L. Her laboratory's printed range says "normal" up to 50; everything else is unremarkable.`,d:[1,0,0,0,0,0,0],a:'h',
  why:`ACG gives a "true healthy normal" ALT of 19–25 IU/L for females (29–33 for males) and says levels above this should be assessed; an elevated ALT has been associated with increased liver-related mortality. A mild, isolated ALT rise is still a hepatocellular pattern. [[Kwo2017ACG]]`}
];
const TE_ANS={h:'Hepatocellular',c:'Cholestatic',a:'Signs of advanced disease'};
function teArrow(x,y,dir,s=1,col='var(--dx)'){
  if(!dir)return `<line x1="${f1(x-6*s)}" x2="${f1(x+6*s)}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:var(--muted);stroke-width:${f1(2.2*s)};stroke-linecap:round"/>`;
  const d=dir>0?-1:1,n=Math.abs(dir)>1?2:1;let g='';
  for(let i=0;i<n;i++){const ox=(i-(n-1)/2)*9*s;g+=`<path d="M${f1(x+ox)} ${f1(y-d*7*s)}L${f1(x+ox)} ${f1(y+d*6*s)}M${f1(x+ox-4.5*s)} ${f1(y+d*1.5*s)}L${f1(x+ox)} ${f1(y+d*6.5*s)}L${f1(x+ox+4.5*s)} ${f1(y+d*1.5*s)}" style="fill:none;stroke:${col};stroke-width:${f1(2.2*s)};stroke-linecap:round;stroke-linejoin:round"/>`}
  return g}
inits.tests=()=>{
  const svg=$('#teSvg'),rg=$('#teT');
  /* one dashboard tile: lp = how far its marker has travelled (0..1) */
  function tile(T,x,y,w,h,lp,on,N){
    const act=lp>0,col=on?'var(--dx)':'var(--muted)';
    let s=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="10" style="fill:${on?'var(--dx-soft)':'var(--panel)'};stroke:${on?'var(--dx)':'var(--line)'};stroke-width:${on?1.6:1}"/>`;
    s+=`<text x="${f1(x+10)}" y="${f1(y+(N?16:19))}" class="t-lbl">${T.k}</text>`;
    s+=`<text x="${f1(x+10)}" y="${f1(y+(N?29:34))}" class="t-xs">${T.sub}</text>`;
    /* low-high track with a schematic marker */
    const tx0=x+10,tx1=x+w-34,ty=y+(N?42:50);
    s+=`<line x1="${f1(tx0)}" x2="${f1(tx1)}" y1="${f1(ty)}" y2="${f1(ty)}" style="stroke:var(--line);stroke-width:4;stroke-linecap:round"/>`;
    s+=`<text x="${f1(tx0)}" y="${f1(ty-5)}" class="t-xs" style="font-size:7.5px">low</text><text x="${f1(tx1)}" y="${f1(ty-5)}" class="t-xs t-end" style="font-size:7.5px">high</text>`;
    const m=.5+T.dir*.36*ease(clamp(lp));
    s+=`<circle cx="${f1(lerp(tx0,tx1,m))}" cy="${f1(ty)}" r="5" style="fill:${act&&T.dir?'var(--dx)':'var(--panel)'};stroke:${col};stroke-width:1.6"/>`;
    if(act)s+=`<g style="opacity:${f1(clamp(lp*2))}">${teArrow(x+w-16,y+h/2-2,T.dir,1.15,col)}</g>`;
    if(act)s+=`<text x="${f1(x+10)}" y="${f1(y+h-(N?7:10))}" class="t-xs" style="fill:${col};opacity:${f1(clamp(lp*2))}">${T.txt}</text>`;
    return s}
  function draw(t){
    const N=vb(svg,'720 380','400 640'),p=phaseOf(TE_STEPS,t),st=TE_STEPS[p],nx=p<TE_STEPS.length-1?TE_STEPS[p+1].from:1.0001,lp=ramp(t,st.from,nx);
    let s=`<defs>${marker('teAr','var(--muted)')}</defs>`;
    /* ---- dashboard ---- */
    const D=N?{x:12,y:8,w:184,h:68,gx:8,gy:6}:{x:12,y:14,w:186,h:82,gx:8,gy:7};
    TE_TILES.forEach((T,i)=>{const c=i%2,r=Math.floor(i/2),x=D.x+c*(D.w+D.gx),y=D.y+r*(D.h+D.gy);
      const tp=TE_STEPS[T.st].from,tn=T.st<4?TE_STEPS[T.st+1].from:1,lp2=ramp(t,tp,tp+(tn-tp)*.55);
      s+=tile(T,x,y,D.w,D.h,lp2,p===T.st,N)});
    {const x=D.x+D.w+D.gx,y=D.y+3*(D.h+D.gy);
      s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(D.w)}" height="${f1(D.h)}" rx="10" style="fill:none;stroke:var(--line);stroke-dasharray:4 4"/>`;
      s+=teArrow(x+18,y+(N?20:24),1,1)+`<text x="${f1(x+32)}" y="${f1(y+(N?24:28))}" class="t-xs">typical direction</text>`;
      s+=`<text x="${f1(x+10)}" y="${f1(y+(N?42:50))}" class="t-xs">markers are schematic,</text><text x="${f1(x+10)}" y="${f1(y+(N?54:63))}" class="t-xs">not values</text>`}
    /* ---- scene panel ---- */
    const S=N?{x:12,y:310,w:376,h:322}:{x:404,y:14,w:304,h:352};
    s+=`<rect x="${S.x}" y="${S.y}" width="${S.w}" height="${S.h}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    const cx=S.x+S.w/2;
    if(p<3){
      /* liver scarring as the panel is read; spleen and blood vessel with particles */
      const fib=lerp(0,4,ramp(t,0,.56)),lx=S.x+(N?104:96),ly=S.y+(N?84:96),ls=N?.82:.86;
      s+=liver(lx,ly,ls,{fib,seed:11}).svg;
      const stg=fib<.5?'healthy':fib<2.6?'fibrosis':fib<3.6?'bridging scar':'cirrhosis';
      s+=`<text x="${f1(lx)}" y="${f1(ly-(N?52:58))}" class="t-xs t-mid">liver: ${stg} (schematic)</text>`;
      const spg=ramp(t,.42,.6),spx=S.x+S.w-(N?64:62),spy=ly-4;
      s+=`<ellipse cx="${f1(spx)}" cy="${f1(spy)}" rx="${f1(16*(1+spg*.6))}" ry="${f1(26*(1+spg*.6))}" transform="rotate(20 ${f1(spx)} ${f1(spy)})" style="fill:var(--nh3-soft);stroke:var(--nh3);stroke-width:1.5"/>`;
      s+=`<text x="${f1(spx)}" y="${f1(spy-34-spg*16)}" class="t-xs t-mid">spleen${spg>.5?' (enlarged)':''}</text>`;
      /* blood vessel */
      const vy=S.y+(N?180:200),vx0=S.x+14,vx1=S.x+S.w-14;
      s+=`<path d="M${vx0} ${vy-11}H${vx1}M${vx0} ${vy+11}H${vx1}" style="stroke:var(--artery);stroke-width:1.4;opacity:.6"/>`;
      s+=`<text x="${f1(vx0)}" y="${f1(vy-16)}" class="t-xs">blood sample</text>`;
      /* leaks from liver into the vessel */
      const ph=(t*60)%1,rr=rng(5);
      const nEnz=p===0?Math.round(4+lp*8):6,nBil=p>=1?Math.round(3+ramp(t,.2,.4)*7):0,nAlb=Math.round(lerp(9,3,ramp(t,.4,.58))),nPlt=Math.round(lerp(10,3,ramp(t,.42,.6)));
      const dot=(i,n,col,r,off,lab)=>{let g='';for(let k=0;k<n;k++){const u=(ph+k/n+off)%1,x=lerp(vx0+6,vx1-30,u),y=vy+(rr()-.5)*14;g+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" style="fill:${col};opacity:.85"/>`}return g};
      s+=dot(0,nEnz,'var(--dx)',2.6,0)+dot(1,nBil,'var(--bile)',2.6,.13)+dot(2,nAlb,'var(--brand)',2.2,.31);
      /* platelets: some drift up into the spleen */
      for(let k=0;k<nPlt;k++){const u=(ph+k/nPlt+.57)%1;s+=`<ellipse cx="${f1(lerp(vx0+6,vx1-30,u))}" cy="${f1(vy+(k%3-1)*4)}" rx="3.2" ry="1.8" style="fill:var(--artery);opacity:.8"/>`}
      if(spg>0)for(let k=0;k<Math.round(spg*7);k++){const a=k*1.7;s+=`<ellipse cx="${f1(spx+Math.cos(a)*9)}" cy="${f1(spy+Math.sin(a)*14)}" rx="3.2" ry="1.8" style="fill:var(--artery);opacity:.85"/>`}
      /* leak arrows */
      if(p===0)s+=`<path d="M${f1(lx+20)} ${f1(ly+30)}Q${f1(lx+40)} ${f1(vy-30)} ${f1(lx+70)} ${f1(vy-14)}" class="arrow" marker-end="url(#teAr)"/><text x="${f1(lx+76)}" y="${f1(vy-24)}" class="t-xs" style="fill:var(--dx)">AST, ALT leak</text>`;
      if(p===1)s+=`<path d="M${f1(lx-30)} ${f1(ly+34)}Q${f1(lx-10)} ${f1(vy-26)} ${f1(lx+30)} ${f1(vy-14)}" class="arrow" marker-end="url(#teAr)"/><text x="${f1(lx+34)}" y="${f1(vy-24)}" class="t-xs" style="fill:var(--accent)">bilirubin, ALP</text>`;
      if(p===2)s+=`<path d="M${f1(spx-20)} ${f1(vy-14)}Q${f1(spx-26)} ${f1(spy+50)} ${f1(spx-10)} ${f1(spy+30+spg*10)}" class="arrow" marker-end="url(#teAr)"/><text x="${f1(spx-30)}" y="${f1(vy-28)}" class="t-xs t-end" style="fill:var(--artery)">platelets held</text>`;
      /* legend */
      const lgY=vy+(N?30:32);[['var(--dx)','enzymes'],['var(--bile)','bilirubin'],['var(--brand)','albumin'],['var(--artery)','platelets']].forEach(([c,l],k)=>{const x=S.x+14+k*(N?90:72);s+=`<circle cx="${x+3}" cy="${lgY-3}" r="3" style="fill:${c}"/><text x="${x+10}" y="${lgY}" class="t-xs">${l}</text>`});
      /* key numbers per step */
      const K=[[`AST/ALT ratio, chronic hepatitis B:`,`no cirrhosis`,.59,`cirrhosis`,1.02],[`Hepatocellular: AST, ALT ≫ ALP`,`Cholestatic: ALP ≫ AST, ALT`],[`Platelets <150,000/µL:`,`up to 76% in chronic liver disease`]][p];
      const ky=S.y+S.h-(N?66:76);
      if(p===0){const bx=S.x+16,bx0=bx+78,bw=S.w-32-78,v1=.59*ramp(lp,0,.4),v2=1.02*ramp(lp,.3,.8),X=v=>bx0+bw*v/1.2;
        s+=`<text x="${bx}" y="${ky}" class="t-sm">${K[0]}</text>`;
        [[v1,K[1],.59,'var(--muted)'],[v2,K[3],1.02,'var(--dx)']].forEach(([v,l,full,c],k)=>{const y=ky+12+k*22;s+=`<text x="${bx}" y="${y+11}" class="t-xs">${l}</text><rect x="${bx0}" y="${y}" width="${f1(Math.max(0,X(v)-bx0))}" height="14" rx="3" style="fill:${c};opacity:.75"/><text x="${f1(X(v)-4)}" y="${y+11}" class="t-xs t-end" style="fill:var(--on-brand);font-weight:700">${v>.2?v.toFixed(2):''}</text>`});
        s+=`<line x1="${f1(X(1))}" x2="${f1(X(1))}" y1="${ky+6}" y2="${ky+52}" style="stroke:var(--ink);stroke-dasharray:3 3"/><text x="${f1(X(1))}" y="${ky+62}" class="t-xs t-mid">ratio 1.0</text>`}
      else{K.forEach((l,k)=>{s+=`<text x="${S.x+16}" y="${ky+16+k*18}" class="${k?'t-xs':'t-sm'}" style="${k&&p===2?'fill:var(--artery)':''}">${l}</text>`});
        if(p===2){const bx=S.x+16,bw=S.w-32,v=76*ramp(lp,.1,.7);s+=`<rect x="${bx}" y="${ky+40}" width="${bw}" height="12" rx="3" style="fill:var(--panel-2)"/><rect x="${bx}" y="${ky+40}" width="${f1(bw*v/100)}" height="12" rx="3" style="fill:var(--artery);opacity:.7"/><text x="${f1(bx+bw*v/100+4)}" y="${ky+50}" class="t-xs">${Math.round(v)}%</text>`}
        if(p===1){s+=`<text x="${S.x+16}" y="${ky+52}" class="t-xs" style="fill:var(--accent)">raised conjugated bilirubin: liver disease or obstruction</text>`}}
    }else if(p===3){
      /* ---- ultrasound fan ---- */
      const ax=cx,ay=S.y+(N?22:26),R=N?236:262,A=N?.62:.66,u=ease(lp);
      const fan=`M${ax} ${ay}L${f1(ax-Math.sin(A)*R)} ${f1(ay+Math.cos(A)*R)}A${R} ${R} 0 0 0 ${f1(ax+Math.sin(A)*R)} ${f1(ay+Math.cos(A)*R)}Z`;
      const fid=uid('tefan');
      s+=`<clipPath id="${fid}"><path d="${fan}"/></clipPath><path d="${fan}" style="fill:var(--panel-2);stroke:var(--line)"/>`;
      s+=`<rect x="${ax-26}" y="${ay-14}" width="52" height="14" rx="5" style="fill:var(--ink);opacity:.8"/><text x="${ax}" y="${ay-18}" class="t-xs t-mid">probe</text>`;
      s+=`<g clip-path="url(#${fid})">`;
      /* liver cross-section: surface becomes nodular, right lobe narrows, caudate grows */
      const top=ay+(N?48:52),xl=ax-lerp(118,94,u),xr=ax+120,amp=u*5.5,bot=top+(N?118:132);
      const P=[];for(let i=0;i<=24;i++){const x=lerp(xl,xr,i/24);P.push([x,top+Math.pow((x-ax)/150,2)*30+Math.sin(i*1.9)*amp*(i%2?1:.6)])}
      for(let i=0;i<=8;i++){const x=lerp(xr,xl,i/8);P.push([x,bot-Math.pow((x-ax)/160,2)*26])}
      const ld=smoothPath(P);s+=`<path d="${ld}" style="fill:var(--liver-soft);stroke:var(--liver);stroke-width:1.6"/>`;
      const rr=rng(21);for(let i=0;i<70;i++){const p2=[lerp(xl,xr,rr()),lerp(top+8,bot-8,rr())];if(inPoly(p2,P))s+=`<circle cx="${f1(p2[0])}" cy="${f1(p2[1])}" r="${f1(.8+rr()*1.4)}" style="fill:var(--scar-line);opacity:${f1(.3+u*.4)}"/>`}
      const cdx=ax+18,cdy=bot-30,crx=lerp(16,27,u),cry=lerp(10,17,u);
      s+=`<ellipse cx="${cdx}" cy="${cdy}" rx="${f1(crx)}" ry="${f1(cry)}" style="fill:var(--nodule);opacity:.45;stroke:var(--liver);stroke-dasharray:3 2"/>`;
      /* ascites: dark fluid crescent */
      const asc=ramp(lp,.55,.9);if(asc>0)s+=`<path d="M${f1(xl-8)} ${f1(top+20)}Q${f1(ax-40)} ${f1(top-22)} ${f1(xr+10)} ${f1(top+14)}" style="fill:none;stroke:var(--fluid-fill);stroke-width:${f1(3+asc*9)};opacity:${f1(.75*asc)};stroke-linecap:round"/>`;
      s+=`</g>`;
      s+=`<text x="${f1(ax-60)}" y="${f1(bot-16)}" class="t-xs t-mid">right lobe</text><text x="${f1(cdx)}" y="${f1(cdy+4)}" class="t-xs t-mid">caudate</text>`;
      s+=`<text x="${f1(xr-6)}" y="${f1(top-10)}" class="t-xs t-end" style="fill:var(--dx)">${u>.35?'nodular surface':'smooth surface'}</text>`;
      if(asc>.2)s+=`<text x="${f1(xl+6)}" y="${f1(top-18)}" class="t-xs" style="fill:var(--fluid)">fluid (ascites)</text>`;
      /* post-test probability bar */
      const by=S.y+S.h-(N?60:66),bx=S.x+16,bw=S.w-32,pr=lerp(35,86,ramp(lp,.15,.6))+2*ramp(lp,.7,.95);
      s+=`<text x="${bx}" y="${by-6}" class="t-sm">Post-test probability with nodularity</text>`;
      s+=`<rect x="${bx}" y="${by}" width="${bw}" height="14" rx="4" style="fill:var(--panel-2)"/><rect x="${bx}" y="${by}" width="${f1(bw*pr/100)}" height="14" rx="4" style="fill:var(--dx);opacity:.8"/>`;
      s+=`<line x1="${f1(bx+bw*.35)}" x2="${f1(bx+bw*.35)}" y1="${by-2}" y2="${by+16}" style="stroke:var(--ink);stroke-dasharray:2 2"/><text x="${f1(bx+bw*.35)}" y="${by+28}" class="t-xs t-mid">before 35%</text>`;
      s+=`<text x="${f1(Math.min(bx+bw*pr/100,bx+bw)-4)}" y="${by+11}" class="t-xs t-end" style="fill:var(--on-brand);font-weight:700">${Math.round(pr)}%</text>`;
      s+=`<text x="${f1(bx+bw)}" y="${by+28}" class="t-xs t-end">${lp>.7?'+ caudate, vein flow: 88%':'nodularity: spec 95%'}</text>`;
    }else{
      /* ---- biopsy ---- */
      const lx=S.x+(N?96:92),ly=S.y+(N?62:66),ls=N?.6:.62;
      s+=liver(lx,ly,ls,{fib:4,seed:11,gb:false}).svg;
      const ins=ramp(lp,0,.25),out=ramp(lp,.25,.45),nd=ins*(1-out);
      const nx0=lx+70,ny0=ly-28,nx1=lx+18,ny1=ly+2,nxx=lerp(nx0,nx1,nd),nyy=lerp(ny0,ny1,nd);
      s+=`<line x1="${f1(nxx+50)}" y1="${f1(nyy-34)}" x2="${f1(nxx)}" y2="${f1(nyy)}" style="stroke:var(--ink);stroke-width:2.4;stroke-linecap:round"/><rect x="${f1(nxx+44)}" y="${f1(nyy-44)}" width="18" height="10" rx="2" transform="rotate(-34 ${f1(nxx+53)} ${f1(nyy-39)})" style="fill:var(--dx)"/>`;
      s+=`<text x="${f1(nx0+40)}" y="${f1(ny0-24)}" class="t-xs t-end">needle</text>`;
      /* core sample and ruler */
      const ry=S.y+(N?122:132),rx=S.x+16,mm=N?6.6:5.4,cl=ramp(lp,.35,.55);
      s+=`<text x="${rx}" y="${ry-8}" class="t-sm">Core length (mm)</text>`;
      s+=`<rect x="${f1(rx+20*mm)}" y="${ry}" width="${f1(5*mm)}" height="12" style="fill:var(--good-soft);stroke:var(--good)"/><text x="${f1(rx+22.5*mm)}" y="${ry+24}" class="t-xs t-mid" style="fill:var(--good)">optimal 20–25</text>`;
      if(cl>0){s+=`<rect x="${rx}" y="${ry+2}" width="${f1(17.7*mm*cl)}" height="8" rx="3" style="fill:var(--nodule);stroke:var(--liver)"/>`;for(let k=0;k<Math.floor(17.7*cl/2.2);k++)s+=`<circle cx="${f1(rx+3+k*2.2*mm)}" cy="${ry+6}" r="2" style="fill:none;stroke:var(--scar-line)"/>`;
        s+=`<text x="${rx}" y="${ry+24}" class="t-xs">average 17.7</text>`}
      for(let m2=0;m2<=25;m2+=5)s+=`<line x1="${f1(rx+m2*mm)}" x2="${f1(rx+m2*mm)}" y1="${ry+12}" y2="${ry+16}" style="stroke:var(--muted)"/>`;
      /* 1000-dot grid: major bleeding about 6 per 1000 */
      const gy=S.y+(N?172:186),gx=S.x+16,sp=N?5.2:5,gl=ramp(lp,.45,.68),hit=[37,212,388,561,744,903];
      s+=`<text x="${gx}" y="${gy-8}" class="t-sm">1000 biopsies</text>`;
      for(let k=0;k<1000;k++){const c=k%40,r=Math.floor(k/40),on=hit.includes(k)&&gl>hit.indexOf(k)/6;s+=`<circle cx="${f1(gx+c*sp+2)}" cy="${f1(gy+r*sp+2)}" r="${on?2.3:1.25}" style="fill:${on?'var(--bad)':'var(--muted)'};opacity:${on?1:.35}"/>`}
      const tx=gx+40*sp+10,cnt=hit.filter((h,i)=>gl>i/6).length;
      if(N){s+=`<text x="${tx}" y="${gy+14}" class="t-big" style="fill:var(--bad)">≈${cnt}</text><text x="${tx}" y="${gy+30}" class="t-xs">major</text><text x="${tx}" y="${gy+42}" class="t-xs">bleeds</text><text x="${tx}" y="${gy+54}" class="t-xs">(England,</text><text x="${tx}" y="${gy+66}" class="t-xs">1998–2005)</text>`;
        s+=`<text x="${gx}" y="${gy+25*sp+18}" class="t-xs">Deaths directly due to biopsy: at most about 1 in 10,000</text>`}
      else{s+=`<text x="${tx}" y="${gy+16}" class="t-big" style="fill:var(--bad)">≈${cnt}</text><text x="${tx}" y="${gy+32}" class="t-xs">major</text><text x="${tx}" y="${gy+44}" class="t-xs">bleeds</text><text x="${tx}" y="${gy+62}" class="t-xs">England</text><text x="${tx}" y="${gy+74}" class="t-xs">1998–2005</text>`;
        s+=`<text x="${gx}" y="${gy+25*sp+16}" class="t-xs">Deaths directly due to biopsy:</text><text x="${gx}" y="${gy+25*sp+28}" class="t-xs">at most about 1 in 10,000</text>`}
      /* sampling error: two lobes, two stages */
      const sx=S.x+S.w-(N?124:118),sy=S.y+(N?64:70),se=ramp(lp,.15,.4);
      if(se>0){s+=`<g style="opacity:${f1(se)}"><text x="${sx}" y="${sy}" class="t-xs">one liver, two lobes:</text>`;
        [['right lobe','stage 4','var(--bad)'],['left lobe','stage 3','var(--warn)']].forEach(([l,v,c],k)=>{const y=sy+14+k*20;s+=`<rect x="${sx}" y="${y-8}" width="34" height="8" rx="3" style="fill:var(--nodule);stroke:var(--liver)"/><text x="${sx+40}" y="${y}" class="t-xs">${l}:</text><text x="${sx+40}" y="${y+10}" class="t-xs" style="fill:${c};font-weight:700">${v}</text>`});
        s+=`</g>`}
    }
    svg.innerHTML=s;
    setSt(p);
    $('#teRead').innerHTML=`<span>step <b>${p+1} of ${TE_STEPS.length}</b></span><span>focus <b>${st.t}</b></span>${p<3?`<span>tiles lit <b>${TE_TILES.filter(T=>T.st<=p).length} of 7</b></span>`:''}`;
    $('#teNote').innerHTML=noteHTML(st);
  }
  const stop=playWire(rg,$('#tePlay'),draw,30000,'Replay','tests');
  const setSt=stepWire($('#teSteps'),TE_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- pattern sorter ---- */
  const cs=$('#teCaseSvg');let ci=0,pick=null;
  function drawCase(){const N=vb(cs,'720 120','400 200'),C=TE_CASES[ci];let s='';
    const cols=N?4:7,w=N?92:96,h=N?84:96,gx=N?4:6;
    TE_TILES.forEach((T,i)=>{const c=i%cols,r=Math.floor(i/cols),x=(N?6:8)+c*(w+gx),y=(N?6:12)+r*(h+8),d=C.d[i];
      s+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" style="fill:${d?'var(--dx-soft)':'var(--panel)'};stroke:${d?'var(--dx)':'var(--line)'}"/>`;
      s+=`<text x="${f1(x+w/2)}" y="${y+20}" class="t-lbl t-mid">${T.k}</text>`;
      s+=teArrow(x+w/2,y+h/2+6,d===2?2:d,1.4,d?'var(--dx)':'var(--muted)');
      s+=`<text x="${f1(x+w/2)}" y="${y+h-10}" class="t-xs t-mid">${d===2?'strongly up':d>0?'up':d<0?'down':'not noted'}</text>`});
    cs.innerHTML=s}
  function showCase(){const C=TE_CASES[ci];
    $('#teProg').textContent=`Practice case ${ci+1} of ${TE_CASES.length}`;
    $('#teCase').innerHTML=C.txt;
    $$('[data-teans]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.teans===pick?'true':'false'));
    if(!pick)$('#teSortNote').innerHTML=`<div class="kicker">Your call</div><h4>Which pattern is this?</h4><p>Look at which tests lead. Injury enzymes far above alkaline phosphatase point one way; alkaline phosphatase far above the injury enzymes points another; low albumin, high INR or bilirubin and low platelets describe how advanced the disease is.</p><div class="pt"><b>In plain words</b>"Liver tests" mostly show whether liver cells are hurt (ALT, AST) or bile flow is blocked (alkaline phosphatase, bilirubin). They do not measure how well the liver works on their own. [[Kwo2017ACG]]</div>`;
    else{const ok=pick===C.a;
      $('#teSortNote').innerHTML=`<div class="kicker">Practice case ${ci+1}</div><div class="verdict ${ok?'yes':'no'}">${ok?'Yes: ':'Not quite: '}${TE_ANS[C.a]}${ok?'':` (you chose ${TE_ANS[pick].toLowerCase()})`}</div><p>${C.why}</p><div class="hook"><b>Exam hook</b>Hepatocellular = AST/ALT ≫ ALP. Cholestatic = ALP ≫ AST/ALT. Albumin, INR and bilirubin feed the severity scores.</div>`}
    drawCase()}
  $$('[data-teans]').forEach(b=>b.addEventListener('click',()=>{pick=b.dataset.teans;showCase()}));
  $('#teNext').addEventListener('click',()=>{ci=(ci+1)%TE_CASES.length;pick=null;showCase()});
  $('#tePrev').addEventListener('click',()=>{ci=(ci-1+TE_CASES.length)%TE_CASES.length;pick=null;showCase()});
  showCase();
  const prevR=redraws.tests;redraws.tests=()=>{prevR&&prevR();drawCase()};
};
