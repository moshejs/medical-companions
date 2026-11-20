/* =============== 3.6 Vascular EDS =============== */
inits.vascular=()=>{
  /* small text helpers (local to this module) */
  const T=(x,y,s,cls='t-sm',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`;
  const TL=(x,y,lines,cls,lh,st)=>lines.map((l,i)=>T(x,y+i*lh,l,cls,st)).join('');
  const R=(x,y,w,h,st,rx=0)=>`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(Math.max(0,w))}" height="${f1(Math.max(0,h))}" rx="${rx}" style="${st}"/>`;
  const LN=(x1,y1,x2,y2,st)=>`<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" style="${st}"/>`;
  const press=(sel,attr,val)=>$$(sel).forEach(b=>b.setAttribute('aria-pressed',String(b.dataset[attr]===val)));

  /* ================= 1. the artery: wall, fault, tear, dissection, rupture ================= */
  let wall='veds';
  const svg=$('#vaSvg'),rg=$('#vaT');
  const STEPS=[
    {from:0,at:.1,k:'Step 1 · anatomy',t:'Three wall layers',
     txt:`A medium artery has three layers: the intima lining the channel (lumen), the muscular media, and the outer adventitia. Type III collagen, built from three identical α1(III) chains, is found in skin, blood vessels and the intestine, and is a major protein of vessel walls and hollow organs. [[Shoulders2009,Byers2017]]`,
     pt:`Type III collagen is part of the scaffolding that keeps artery walls and the bowel strong.`,
     hook:`Type III collagen = α1(III)<sub>3</sub>, encoded by <i>COL3A1</i>; vascular EDS is the <i>COL3A1</i> type.`},
    {from:.18,at:.32,k:'Step 2 · the fault',t:'Faulty or too little type III collagen',
     txt:`vEDS is autosomal dominant: one copy of <i>COL3A1</i> is changed. In a Dutch cohort, 76.8% of variants were predicted to act dominant-negatively, where faulty chains are built into the molecule. The commonest kind replaces a glycine, the residue needed at every third position of the helix. Null variants work differently: they reduce the amount of protein. In the vEDS setting of the animation, the media thins (schematic). [[Byers2017,Demirdas2024,Shoulders2009,Schwarze2001]]`,
     pt:`In vEDS the body builds artery walls with weak or too little collagen III, so the walls are fragile.`,
     hook:`Gly-X-Y: glycine every third residue. Glycine substitutions are the commonest vEDS variant class. [[Shoulders2009,Frank2015]]`},
    {from:.38,at:.49,k:'Step 3 · tear',t:'An intimal tear',
     txt:`Arterial rupture may be preceded by aneurysm, arteriovenous fistula or dissection, or may happen without warning. In vEDS the aorta and its branches can rupture or dissect "even without significant dilation", so a normal-sized artery is not proof of safety. Across 11 US institutions, 61.6% of people with confirmed vEDS had arterial pathology, at a median age of 33. [[Byers2025GeneReviews,Isselbacher2022,Shalhub2019JVS]]`,
     pt:`A small split in the inner lining lets blood push into the wall of the artery.`,
     hook:`The most commonly affected arterial bed in confirmed vEDS: mesenteric arteries (31.7%). [[Shalhub2019JVS]]`},
    {from:.56,at:.67,k:'Step 4 · dissection',t:'Dissection: a false lumen',
     txt:`Blood tracking along the media splits the wall and opens a false channel beside the true one. vEDS favours medium-sized arteries: after the mesenteric arteries come cerebrovascular (16.5%), iliac (16.5%) and renal (12.2%) arteries. Most arterial disease in that cohort was managed medically; when intervention was needed, embolisation (13.4%) and stenting (2.5%) were the main approaches. [[Shalhub2019JVS]]`,
     pt:`The blood digs a second channel inside the wall, which weakens it further.`,
     hook:`Arterial rupture or dissection under 40 is among the major criteria proposed as indications for vEDS testing. [[Demirdas2024]]`},
    {from:.74,at:.84,k:'Step 5 · rupture',t:'Rupture',
     txt:`Most deaths in vEDS result from arterial rupture. Bowel rupture, often of the sigmoid colon, makes up about a quarter of complications but rarely causes death. In France the first events were arterial in 48% and digestive in 24%, at a median age of 29. 37.4% of arterial events presented as emergencies. [[Pepin2000,Frank2015,Shalhub2019JVS]]`,
     pt:`When the wall gives way, blood escapes from the artery. This is life-threatening and needs a hospital at once.`,
     hook:`vEDS deaths: mostly arterial rupture. Classic gut event: spontaneous sigmoid colon perforation. [[Pepin2000,ElMasri2018]]`},
    {from:.9,at:.98,k:'Step 6 · act',t:'Emergency: act on sudden pain',
     txt:`Dissection or rupture of a vessel, perforation of the gut or rupture of an organ is how most adults with vEDS present. GeneReviews advises immediate medical attention for sudden, unexplained pain, and carrying documentation of the diagnosis. A 2026 review describes emergency care in vEDS as "deliberately counter-intuitive": it avoids catheter angiography, elective endoscopy and unnecessary surgery. [[Byers2025GeneReviews,Byers2017,Corrao2026]]`,
     pt:`For someone with vEDS, sudden severe pain is an emergency. Get help straight away and show the vEDS card.`,
     hook:`Avoid diagnostic arteriography in vEDS: one historical series reported a 67% complication rate. [[Cikrit1987,Byers2025GeneReviews]]`}
  ];
  const SITES=[['mesenteric',31.7],['cerebrovascular',16.5],['iliac',16.5],['renal',12.2]];
  function panel(L,t,p,V){
    const x=L.px,y=L.py,w=L.pw;let s=R(x,y,w,L.ph,'fill:var(--field);stroke:var(--line)',12);
    const ix=x+14,iw=w-28;let yy=y+24;
    const head=(a,c='var(--ink)')=>{s+=T(ix,yy,a,'t-lbl',`fill:${c}`);yy+=20};
    if(!V&&p>=2){head('Typical wall');
      s+=TL(ix,yy,['Shown for comparison: a thicker','media between the blood and','the outside (schematic).','','The tear sequence is drawn on','the vEDS wall. Press','"vEDS wall" to see it.'],'t-sm',16);
      s+=helix(ix,y+L.ph-34,iw,{amp:7,phase:t*3});return s}
    if(p===0){head('Type III collagen');
      s+=TL(ix,yy,['three identical α1(III) chains','in skin, blood vessels and','the intestine'],'t-sm',15);yy+=58;
      s+=helix(ix,yy,iw,{amp:7,phase:t*3});yy+=26;
      s+=fibril(ix,yy,iw,{rows:5,rh:6,grow:1,seed:7}).svg;yy+=44;
      s+=T(ix,yy,'molecules pack into fibrils','t-xs');return s}
    if(p===1){if(!V){head('Typical type III collagen');s+=TL(ix,yy,['every third residue glycine;','fibrils pack tightly'],'t-sm',15);yy+=44;s+=helix(ix,yy,iw,{amp:7,phase:t*3});yy+=30;s+=fibril(ix,yy,iw,{rows:5,grow:1,seed:7}).svg;return s}
      head('One changed COL3A1 copy','var(--vas)');
      s+=T(ix,yy,'Glycine substitution','t-xs','fill:var(--ink)');yy+=22;
      s+=helix(ix,yy,iw,{amp:7,phase:t*3,kink:.5});yy+=26;
      s+=T(ix,yy,'76.8% dominant-negative (Dutch cohort)','t-xs');yy+=22;
      s+=T(ix,yy,'Null variant: less protein made','t-xs','fill:var(--ink)');yy+=8;
      s+=fibril(ix,yy,iw,{rows:4,rh:6,grow:.5+.5*(1-ramp(t,.2,.34)),seed:7}).svg;yy+=36;
      s+=T(ix,yy,'→ a thinner, weaker media','t-sm','fill:var(--vas)');return s}
    if(p===2||p===3){head(p===2?'Intimal tear':'Dissection','var(--vas)');
      s+=TL(ix,yy,p===2?['blood enters the wall through','a split in the lining']:['blood splits the media and','opens a false lumen'],'t-sm',15);yy+=38;
      s+=T(ix,yy,'Arterial sites, % of 139 pathologies','t-xs');yy+=14;
      const gr=ramp(t,.4,.7);SITES.forEach(([n,v],i)=>{const bw=(iw-40)*v/31.7*clamp(gr*1.6-i*.15);
        s+=T(ix,yy+10,n,'t-xs','fill:var(--ink)');s+=R(ix,yy+14,bw,9,'fill:var(--vas);opacity:.8',3);s+=T(ix+bw+4,yy+22,v+'%','t-xs');yy+=31});
      return s}
    if(p===4){head('Rupture','var(--vas)');
      s+=TL(ix,yy,['most vEDS deaths are from','arterial rupture'],'t-sm',15);yy+=36;
      s+=T(ix,yy,'First events, French cohort (215)','t-xs');yy+=8;
      const gr=ramp(t,.74,.86);[['arterial',48],['digestive',24]].forEach(([n,v])=>{const bw=(iw-40)*v/48*gr;
        s+=T(ix,yy+12,n,'t-xs','fill:var(--ink)');s+=R(ix,yy+16,bw,10,'fill:var(--vas);opacity:.8',3);s+=T(ix+bw+4,yy+25,v+'%','t-xs');yy+=34});
      yy+=4;s+=TL(ix,yy,['37.4% of arterial events','presented as emergencies'],'t-sm',15,'fill:var(--ink)');return s}
    /* p===5: the emergency card */
    const cx=ix,cy=yy-6,cw=iw,ch=L.ph-44;
    s+=R(cx,cy,cw,ch,'fill:var(--panel);stroke:var(--vas);stroke-width:2',10);
    s+=zebra(cx+22,cy+24,13,{id:'vaZb'+(L.N?'n':'w')});
    s+=T(cx+42,cy+20,'VASCULAR EDS','t-lbl','fill:var(--vas)');s+=T(cx+42,cy+34,'COL3A1 confirmed · see plan','t-xs');
    const EL=[['Sudden, unexplained pain:','immediate medical attention'],['Arteriography only to find','life-threatening bleeding'],['No elective surgery unless','the benefit is substantial'],['Specialist team and','management plan enclosed']];
    EL.forEach((pr,i)=>{const y=cy+60+i*(ch>200?40:32);s+=`<circle cx="${f1(cx+15)}" cy="${f1(y-3)}" r="2.4" style="fill:var(--vas)"/>`+TL(cx+24,y,pr,'t-xs',13,'fill:var(--ink)')});
    return s}
  function draw(t){
    const N=vb(svg,'720 380','400 600');
    const L=N?{N,ax:16,al:368,ay:104,r:24,m:26,px:16,py:236,pw:368,ph:236,bY:488,bH:96,W:400}
             :{N,ax:24,al:424,ay:132,r:30,m:32,px:466,py:34,pw:238,ph:244,bY:296,bH:72,W:720};
    const p=phaseOf(STEPS,t),V=wall==='veds';
    const thin=V?ease(ramp(t,.2,.34)):0,m=lerp(L.m,L.m*.42,thin);
    const tear=V?ramp(t,.4,.54)*.3+ramp(t,.58,.72)*.7:0,rup=V?ramp(t,.76,.88):0;
    let s=`<defs>${marker('vaAr','var(--muted)')}</defs>`;
    s+=T(L.ax,22,'MEDIUM ARTERY · LONG SECTION','t-sm');
    s+=T(L.ax+L.al,22,V?(thin>.5?'vEDS wall: thin media':'vEDS wall'):'typical wall','t-sm t-end',`fill:${V?'var(--vas)':'var(--ink)'};font-weight:600`);
    s+=artery(L.ax,L.ay,L.al,{r:L.r,media:m,flow:(t*14)%1,tear:0,rupture:0});
    const top=L.ay-L.r,tx=L.ax+L.al*.42,rx=L.ax+L.al*.62;
    /* intimal tear and false lumen, drawn larger than the glyph's own */
    if(tear>0){const fl=L.al*.38*tear,fy=top-m*.5,fh=m*.36*Math.min(1,tear*2.2);
      s+=`<path d="M${f1(tx)} ${f1(top+1)}L${f1(tx+4)} ${f1(fy)}" style="stroke:var(--variant);stroke-width:2.6;stroke-linecap:round"/>`;
      s+=`<path d="M${f1(tx+3)} ${f1(fy)}Q${f1(tx+fl*.5)} ${f1(fy-fh)} ${f1(tx+fl)} ${f1(fy)}Q${f1(tx+fl*.5)} ${f1(fy+fh)} ${f1(tx+3)} ${f1(fy)}Z" style="fill:var(--blood);opacity:.8"/>`;
      s+=`<path d="M${f1(tx-26)} ${f1(L.ay-4)}Q${f1(tx-8)} ${f1(top+6)} ${f1(tx+1)} ${f1(top+3)}" class="arrow" marker-end="url(#vaAr)"/>`;
      const ly=L.ay+L.r+m+26;
      if(tear<.32)s+=LN(tx,top+2,tx,ly-12,'stroke:var(--variant);stroke-width:1;stroke-dasharray:2 3')+T(tx,ly,'intimal tear','t-sm t-mid','fill:var(--variant);font-weight:600');
      else if(rup<=0){const fx=tx+fl*.55;s+=LN(fx,fy-fh-2,fx,fy-fh-16,'stroke:var(--vas);stroke-width:1')+T(fx,fy-fh-20,'false lumen','t-sm t-mid','fill:var(--vas);font-weight:600')}}
    if(rup>0){const oy=top-m-4,rr=rng(3);
      s+=`<path d="M${f1(rx-6)} ${f1(top-m*.4)}L${f1(rx-1)} ${f1(oy-2)}L${f1(rx+3)} ${f1(top-m*.5)}L${f1(rx+7)} ${f1(oy-1)}" style="fill:none;stroke:var(--variant);stroke-width:2.4"/>`;
      for(let i=0;i<14;i++){const a=-Math.PI*(.15+.7*rr()),d=(8+rr()*34)*rup;s+=`<circle cx="${f1(rx+Math.cos(a)*d*1.3)}" cy="${f1(oy+Math.sin(a)*d)}" r="${f1(2+rr()*3*rup)}" style="fill:var(--blood);opacity:${f1(.35+.5*rup)}"/>`}
      s+=`<ellipse cx="${f1(rx)}" cy="${f1(oy-10*rup)}" rx="${f1(10+30*rup)}" ry="${f1(5+12*rup)}" style="fill:var(--blood);opacity:${f1(.18*rup)}"/>`;
      if(rup>.3)s+=T(Math.min(rx+46,L.ax+L.al-4),oy-26,'rupture','t-sm '+(rx+46>L.ax+L.al-60?'t-end':''),'fill:var(--vas);font-weight:700')}
    /* layer labels on the lower wall (anatomy and fault steps) */
    const lo=L.ay+L.r,lop=p<=1||!V?1:.0;
    if(lop>0){const ly=lo+m+4+24,xs=N?[L.ax+20,L.ax+130,L.ax+268]:[L.ax+40,L.ax+170,L.ax+320];
      const lay=[[lo+1,'intima','lining'],[lo+m*.5,'media',V&&thin>.5?'thin (schematic)':'muscle + collagen'],[lo+m+2,'adventitia','outer coat']];
      lay.forEach(([yy,a,b],i)=>{s+=LN(xs[i],yy,xs[i],ly-12,'stroke:var(--muted);stroke-width:1');s+=`<circle cx="${f1(xs[i])}" cy="${f1(yy)}" r="2" style="fill:var(--ink)"/>`;
        s+=T(xs[i],ly,a,'t-lbl t-mid')+T(xs[i],ly+14,b,'t-xs t-mid',i===1&&V&&thin>.5?'fill:var(--vas)':'')});
      s+=T(L.ax+10,L.ay+4,'lumen · blood flow →','t-xs','fill:var(--ink)')}
    /* media thickness bracket at the right end of the upper wall */
    const bx=L.ax+L.al+(N?-12:8);if(!N)s+=`<path d="M${f1(bx)} ${f1(top)}h4v${f1(-m)}h-4" style="fill:none;stroke:var(--ink);stroke-width:1"/>`;
    if(V&&p>=2){const ev=['tear','dissection','rupture','act'],ty=lo+m+4+(N?30:40),tw=(L.al-20)/4;
      ev.forEach((e,i)=>{const on=p-2>=i,x=L.ax+10+i*tw;s+=R(x,ty,tw-10,24,`fill:${on?'var(--vas-soft)':'var(--panel-2)'};stroke:${on?'var(--vas)':'var(--line)'}`,12)+T(x+(tw-10)/2,ty+16,(N?'':(i+1)+' · ')+e,'t-sm t-mid',on?'fill:var(--vas);font-weight:700':'');
});}
    s+=panel(L,t,p,V);
    /* emergency banner */
    const ba=ramp(t,.9,.95);
    if(ba>0){const y=L.bY,h=L.bH;s+=`<g style="opacity:${f1(ba)}">`+R(L.ax,y,L.W-2*L.ax,h,'fill:var(--vas-soft);stroke:var(--vas);stroke-width:2',12);
      s+=`<circle cx="${f1(L.ax+28)}" cy="${f1(y+h/2)}" r="14" style="fill:var(--vas)"/>`+R(L.ax+26,y+h/2-9,4,11,'fill:var(--panel)',2)+`<circle cx="${f1(L.ax+28)}" cy="${f1(y+h/2+7)}" r="2.2" style="fill:var(--panel)"/>`;
      const lines=N?['Sudden, severe or unexplained pain','in someone with vEDS is an emergency.','Get emergency care now and','show the vEDS card or passport.']
                   :['Sudden, severe or unexplained pain in someone with vEDS is an emergency.','Get emergency care now, and show the vEDS card or passport.'];
      s+=TL(L.ax+52,y+(N?24:30),lines,'t-lbl',N?18:20,'fill:var(--vas)')+'</g>'}
    else if(!N){s+=T(L.ax,L.bY+44,V?'Scrub or press Play: tear → dissection → rupture → what to do':'Typical wall: compare the thickness of the media','t-sm')}
    else s+=T(L.ax,L.bY+40,V?'Scrub: tear → dissection → rupture':'Typical wall for comparison','t-sm');
    svg.innerHTML=s;
    setSt(p);
    $('#vaNote').innerHTML=noteHTML(STEPS[p]);
  }
  const stop=playWire(rg,$('#vaPlay'),draw,22000,'%t:player.replay%','vascular');
  const setSt=stepWire($('#vaSteps'),STEPS,rg,draw,stop);
  $$('[data-vawall]').forEach(b=>b.addEventListener('click',()=>{wall=b.dataset.vawall;press('[data-vawall]','vawall',wall);draw(+rg.value)}));
  draw(+rg.value);

  /* ================= 2. course by age ================= */
  let vvar='all';
  const ag=$('#vaAge'),arg=$('#vaAgeT');
  const COMP=[[0,0],[20,25],[40,80]];          /* first complication, index patients [[Pepin2000]] */
  const FREE=[[0,100],[20,90],[40,39],[60,20]]; /* free of vascular complications, Mayo [[Oderich2005]] */
  const SURV=[{a:48,v:50,l:'median 48 y (2000)'},{a:50,v:68,l:'68% alive at 50 (Mayo)'},{a:51,v:50,l:'median 51 y (2014)'}];
  const VAR={
    all:{bars:[{l:'Dutch · first major event',med:41,q1:31,q3:55},{l:'French · first complication',med:29,q1:22,q3:39}],
      txt:`Dutch national cohort: median age at first major event 41.0 years (IQR 31.0–55.0). French cohort: median age at first complication 29 (IQR 22–39). [[Demirdas2024,Frank2015]]`},
    gly:{bars:[{l:'Glycine substitution · Dutch',med:40.5,q1:31,q3:53.25}],
      txt:`Glycine substitutions: median 40.5 years (IQR 31.0–53.25) to first major event in the Dutch cohort. In France, glycine substitutions were among the more severe groups. Substitutions by a large amino acid had earlier arterial pathology (30 vs 36 years), but this was not statistically significant (P=0.065). [[Demirdas2024,Frank2015,Shalhub2019JVS]]`},
    spl:{bars:[{l:'Splice / delins / deletion · Dutch',med:30,q1:21,q3:45}],
      txt:`Splice-site, delins or deletion variants: median 30.0 years (IQR 21.0–45.0) to first major event, the earliest group in the Dutch cohort. Splice and in-frame variants were also among the more severe groups in France. [[Demirdas2024,Frank2015]]`},
    null:{bars:[{l:'Haploinsufficient (null) · Dutch',med:53,q1:43,q3:58}],
      txt:`Predicted haploinsufficient (null) variants: median 53.0 years (IQR 43.0–58.0). The first complication came almost 15 years later than with missense or exon-skipping variants, and complications were almost all vascular. Only 28% of relatives carrying a null variant had a complication; some reached their seventies or eighties without incident. [[Demirdas2024,Leistritz2011]]`}
  };
  const ASTEPS=[
    {from:0,at:.12,k:'Age 0–17',t:'Childhood',
     txt:`Complications are rare in childhood. In London's national service, 13 of 63 people diagnosed as children had 18 events in childhood, the first at a median age of 11. In the UK cohort the youngest vascular event was an axillary artery rupture in a 12-year-old, and the youngest pneumothorax happened at one day old. Newborns may have clubfoot or hip dislocation. [[Pepin2000,Wilkinson2025,Bowen2023vEDS,Byers2025GeneReviews]]`,
     pt:`Most children with vEDS have no major problems, but a few do, which is why families are offered testing.`,
     hook:`About 60% of people diagnosed with vEDS before 18 are found through a family history. [[Byers2025GeneReviews]]`},
    {from:.3,at:.334,k:'Age 20',t:'One in four by 20',
     txt:`By age 20, 25% of 220 index patients had had a first complication. In the Mayo Clinic series, 90% were still free of vascular complications at 20. In the UK, bowel perforations peaked in the mid-teens and early twenties. [[Pepin2000,Oderich2005,Bowen2023vEDS]]`,
     pt:`By 20, about 1 in 4 people diagnosed because of symptoms have had a serious problem.`,
     hook:`vEDS: first complication in about 25% by 20 and more than 80% by 40. [[Pepin2000]]`},
    {from:.45,at:.484,k:'Age 29',t:'The median first complication',
     txt:`In 215 people with molecularly proven vEDS in France, the median age at first complication was 29 (IQR 22–39); first events were arterial in 48% and digestive in 24%. Medians across variant groups ranged from 23 to 47 years. In the US multi-institution cohort, arterial pathology appeared at a median age of 33. [[Frank2015,Shalhub2019JVS]]`,
     pt:`In the French study, half of people had their first serious problem before about age 30. Try the variant buttons to see how the gene change shifts this.`,
     hook:`Glycine-substitution and splice variants are more severe; null (haploinsufficient) variants are milder and later. [[Frank2015,Leistritz2011]]`},
    {from:.62,at:.667,k:'Age 40',t:'More than 8 in 10 by 40',
     txt:`More than 80% of index patients had at least one complication by 40, and survival free of vascular complications in the Mayo series fell to 39%. The Dutch national cohort, which includes relatives found by family testing, found a major event in 52%, at a median age of 41.0. Men had major events more often and younger (OR 3.61, 95% CI 1.82–7.14). [[Pepin2000,Oderich2005,Demirdas2024]]`,
     pt:`By 40 most people diagnosed because of symptoms have had a serious problem. Men tend to be affected earlier.`,
     hook:`Men with vEDS have major events earlier and more often, and lower survival. [[Demirdas2024,Pepin2014]]`},
    {from:.78,at:.85,k:'Age 48–51',t:'Median survival around 50',
     txt:`Calculated median survival was 48 years in the 2000 series and 51 years in the 2014 series of 1,231 people, lower in men and varying with variant type. In the Mayo series, 68% were alive at 50. In the Dutch cohort, median age at death was 43 for index patients and 65 for relatives. In the UK national service, 90.53% were alive 5 years after their first visit. [[Pepin2000,Pepin2014,Oderich2005,Demirdas2024,Bowen2023vEDS]]`,
     pt:`These are averages from groups of people, not a prediction for anyone. Recent clinics report that about 9 in 10 people are alive 5 years after joining care.`,
     hook:`vEDS median survival: 48 years (2000) and 51 years (2014). [[Pepin2000,Pepin2014]]`}
  ];
  const interp=(pts,a)=>{for(let i=1;i<pts.length;i++)if(a<=pts[i][0]){const[a0,v0]=pts[i-1],[a1,v1]=pts[i];return lerp(v0,v1,(a-a0)/(a1-a0))}return null};
  function drawAge(t){
    const N=vb(ag,'720 360','400 600');
    const L=N?{x0:46,x1:380,y0:30,y1:220,ax:236,vb:268,lg:{x:16,y:392},rd:{x:16,y:500},W:400}
             :{x0:58,x1:450,y0:28,y1:210,ax:226,vb:258,lg:{x:478,y:40},rd:{x:478,y:200},W:720};
    const age=t*60,X=a=>L.x0+(L.x1-L.x0)*a/60,Y=v=>L.y1-(L.y1-L.y0)*v/100;
    let s='';
    [0,25,50,75,100].forEach(v=>{s+=LN(L.x0,Y(v),L.x1,Y(v),v?'stroke:var(--line);stroke-dasharray:2 4':'stroke:var(--muted)');s+=T(L.x0-6,Y(v)+4,v+'%','t-xs t-end')});
    [0,10,20,30,40,50,60].forEach(a=>{s+=LN(X(a),L.y1,X(a),L.y1+4,'stroke:var(--muted)');s+=T(X(a),L.y1+16,a,'t-xs t-mid')});
    s+=T(L.x1,L.y1+30,'age (years)','t-xs t-end');
    /* reveal each line up to the cursor */
    const part=(pts,col,dash,w=2.6)=>{let d='';for(let i=0;i<pts.length;i++){const[a,v]=pts[i];if(a<=age)d+=(i?'L':'M')+f1(X(a))+' '+f1(Y(v));else{if(i>0){const v2=interp(pts,age);d+='L'+f1(X(age))+' '+f1(Y(v2))}break}}
      return d?`<path d="${d}" style="fill:none;stroke:${col};stroke-width:${w};stroke-linejoin:round;${dash?'stroke-dasharray:'+dash:''}"/>`:''};
    s+=part(FREE,'var(--ink)','6 4',2.2);
    s+=part(COMP,'var(--vas)','',3);
    if(age>40)s+=`<path d="M${f1(X(40))} ${f1(Y(80))}L${f1(X(Math.min(age,46)))} ${f1(Y(80+Math.min(age-40,6)*1.2))}" style="fill:none;stroke:var(--vas);stroke-width:2;stroke-dasharray:2 4"/>`;
    COMP.slice(1).forEach(([a,v])=>{if(age>=a){s+=`<circle cx="${f1(X(a))}" cy="${f1(Y(v))}" r="5" style="fill:var(--vas)"/>`;s+=T(X(a)-8,Y(v)-9,(a===40?'>':'')+v+'%','t-sm t-end','fill:var(--vas);font-weight:700')}});
    FREE.slice(1).forEach(([a,v])=>{if(age>=a){s+=`<circle cx="${f1(X(a))}" cy="${f1(Y(v))}" r="4.5" style="fill:var(--panel);stroke:var(--ink);stroke-width:2"/>`;s+=T(X(a)+8,Y(v)+(a===20?14:-8),v+'%','t-sm','fill:var(--ink);font-weight:700')}});
    SURV.forEach((o,i)=>{if(age>=o.a){s+=`<rect x="${f1(X(o.a)-4.5)}" y="${f1(Y(o.v)-4.5)}" width="9" height="9" transform="rotate(45 ${f1(X(o.a))} ${f1(Y(o.v))})" style="fill:var(--accent)"/>`;
      if(i===1)s+=T(X(o.a),Y(o.v)-10,'Mayo: 68% at 50','t-xs t-mid','fill:var(--accent);font-weight:600')}});
    if(age>=51)s+=T(X(49.5),Y(50)-10,'median 48 · 51 y','t-xs t-mid','fill:var(--accent);font-weight:600');
    /* cursor */
    s+=LN(X(age),L.y0-6,X(age),L.y1,'stroke:var(--muted);stroke-width:1.2');
    s+=`<rect x="${f1(clamp(X(age)-24,L.x0-20,L.x1-28))}" y="${f1(L.y0-24)}" width="48" height="16" rx="8" style="fill:var(--ink)"/>`+T(clamp(X(age),L.x0+4,L.x1-4),L.y0-12,'age '+Math.round(age),'t-xs t-mid','fill:var(--bg);font-weight:700');
    /* variant-class bars on the same age axis */
    const VB=VAR[vvar].bars;s+=T(L.x0-(N?30:40),L.vb,'Age at first event by variant class: median (IQR)','t-xs','fill:var(--ink);font-weight:600');
    VB.forEach((b,i)=>{const y=L.vb+18+i*44,inn=age>=b.q1&&age<=b.q3;
      s+=R(X(b.q1),y,X(b.q3)-X(b.q1),12,`fill:var(--vas-soft);stroke:var(--vas);stroke-width:${inn?2:1}`,6);
      s+=LN(X(b.med),y-3,X(b.med),y+15,'stroke:var(--vas);stroke-width:3');
      s+=T(X(b.med),y+28,b.l+' · '+b.med,'t-xs t-mid','fill:var(--ink)')});
    if(vvar==='null'){const y=L.vb+20;s+=`<path d="M${f1(X(38))} ${f1(y+6)}L${f1(X(42))} ${f1(y+6)}" class="arrow" marker-end="url(#vaAr2)"/>`+T(X(37),y+10,'≈15 y later','t-xs t-end')}
    /* legend */
    const lg=L.lg;const items=[['var(--vas)','','had a first complication','index patients, Pepin 2000'],['var(--ink)','6 4','free of vascular complications','Mayo series, Oderich 2005'],['var(--accent)','','survival points','Pepin 2000/2014, Mayo']];
    items.forEach(([c,d,a,b],i)=>{const y=lg.y+i*(N?34:38);s+=i<2?`<path d="M${lg.x} ${y}h24" style="stroke:${c};stroke-width:3;${d?'stroke-dasharray:'+d:''}"/>`:`<rect x="${lg.x+8}" y="${y-4}" width="8" height="8" transform="rotate(45 ${lg.x+12} ${y})" style="fill:${c}"/>`;
      s+=T(lg.x+32,y+4,a,'t-sm','fill:var(--ink)')+T(lg.x+32,y+18,b,'t-xs')});
    /* what has been passed */
    const rd=L.rd,c=interp(COMP,Math.min(age,40)),fr=interp(FREE,age);
    s+=T(rd.x,rd.y,'AT AGE '+Math.round(age)+' (joined points)','t-xs','font-weight:600');
    s+=T(rd.x,rd.y+20,age<=40?`≈${Math.round(c)}% first complication`:'>80% first complication','t-sm','fill:var(--vas)');
    s+=T(rd.x,rd.y+38,`≈${Math.round(fr)}% free of vascular events`,'t-sm','fill:var(--ink)');
    s+=TL(rd.x,rd.y+60,['between published points the','lines are straight joins, not data'],'t-xs',13);
    ag.innerHTML=`<defs>${marker('vaAr2','var(--muted)')}</defs>`+s;
    const p=phaseOf(ASTEPS,t);setASt(p);
    arg.setAttribute('aria-valuetext',`Age ${Math.round(age)}: ${ASTEPS[p].t}`);
    $('#vaAgeRead').innerHTML=`<span>age <b>${Math.round(age)}</b></span><span>variant class <b>${{all:'all',gly:'glycine substitution',spl:'splice / in-frame',null:'null'}[vvar]}</b></span>`;
    $('#vaAgeNote').innerHTML=noteHTML(ASTEPS[p])+`<div class="kv"><div><dt>Variant class</dt><dd>${VAR[vvar].txt}</dd></div></div>`;
  }
  const astop=playWire(arg,$('#vaAgePlay'),drawAge,16000,'%t:player.replay%','vascular');
  const setASt=stepWire($('#vaAgeSteps'),ASTEPS,arg,drawAge,astop);
  $$('[data-vavar]').forEach(b=>b.addEventListener('click',()=>{vvar=b.dataset.vavar;press('[data-vavar]','vavar',vvar);drawAge(+arg.value)}));
  drawAge(+arg.value);

  /* ================= 3. icon array: first complication by 20 / 40 ================= */
  const ic=$('#vaIcons');let icN=25,icStop=null;
  function drawIcons(n){
    const N=vb(ic,'720 230','400 450');
    const cols=N?10:20,sp=N?28:24,sz=N?22:19,x0=N?60:24,y0=N?16:22;let s='';
    for(let i=0;i<100;i++){const c=i%cols,r=Math.floor(i/cols),on=i<Math.round(n);
      s+=person(x0+c*sp+sp/2,y0+r*(sz+(N?6:12)),sz,on?'var(--vas)':'var(--line)')}
    const bx=N?20:530,by=N?330:58,age=icTarget===25?20:40;
    s+=T(bx,by,(age===40?'>':'')+Math.round(n),'t-big','font:400 46px var(--display);fill:var(--vas)');
    s+=T(bx+(N?(age===40?76:56):(age===40?82:62)),by,'in 100','t-lbl');
    s+=TL(bx,by+28,N?[`index patients had a first`,`complication by age ${age}`]:['index patients had a',`first complication by ${age}`],'t-sm',16,'fill:var(--ink)');
    s+=TL(bx,by+70,N?['220 index patients, Pepin 2000.','Relatives found through family','testing tend to do better.']:['220 index patients,','Pepin 2000. Relatives found','by family testing tend','to do better.'],N?'t-sm':'t-xs',N?16:14);
    ic.innerHTML=s}
  let icTarget=25;
  $$('[data-vaicon]').forEach(b=>b.addEventListener('click',()=>{const a=b.dataset.vaicon;press('[data-vaicon]','vaicon',a);
    const from=icN;icTarget=a==='20'?25:80;icStop&&icStop();icStop=animate(900,q=>{icN=lerp(from,icTarget,ease(q));drawIcons(icN)})}));
  drawIcons(icN);
  redraws.vascular=(prev=>()=>{prev&&prev();drawIcons(icN);drawTrial(trial,1)})(redraws.vascular);

  /* ================= 4. trials as icon arrays ================= */
  const tr=$('#vaTrial');let trial='bbest',trStop=null;
  const TRIALS={
    bbest:{arms:[{l:'Celiprolol',n:25,e:5},{l:'No treatment',n:28,e:14}],foot:'HR 0.36 (95% CI 0.15–0.88) · open-label, blinded endpoints · stopped early for benefit',out:'arterial rupture or dissection, mean 47 months',
      note:{k:'BBEST · Lancet 2010',t:'Celiprolol: 20% vs 50%',txt:`53 people with clinical vEDS were randomised to celiprolol or no treatment for a planned 5 years. Arterial rupture or dissection occurred in 5 of 25 on celiprolol and 14 of 28 controls (HR 0.36, 95% CI 0.15–0.88, p=0.040). The trial was open-label and stopped early for benefit; only 33 participants had a confirmed <i>COL3A1</i> variant. Side effects: severe fatigue in 1 and mild fatigue in 2. [[Ong2010,Shalhub2020]]`,
       pt:`In one small trial, fewer people taking celiprolol had an artery tear. It is not approved in the US.`,hook:`BBEST: 20% vs 50%, HR 0.36; celiprolol = β1 antagonist + β2 agonist. [[Ong2010,Isselbacher2022]]`}},
    arcade:{arms:[{l:'Irbesartan + celiprolol',n:29,e:8},{l:'Placebo + celiprolol',n:28,e:15}],foot:'HR 0.42 (95% CI 0.17–0.99) · double-blind, placebo-controlled · 2 years',out:'any arterial event or new or worsening lesion on imaging',
      note:{k:'ARCADE · Circulation 2025',t:'Adding irbesartan: 27.6% vs 53.6%',txt:`57 adults with vEDS on stable celiprolol were randomised to irbesartan (150 mg/day titrated to 300 mg/day in the protocol) or placebo for 2 years. The composite outcome, any vEDS-related arterial event or a new or worsening arterial lesion on systematic imaging, occurred in 8 of 29 vs 15 of 28 (HR 0.42, 95% CI 0.17–0.99). Systolic pressure fell 5.4 mm Hg, which did not explain the benefit; 11 episodes of low blood pressure led to dose reduction in 4 people. [[Jeunemaitre2025,NCT02597361]]`,
       pt:`A second, blinded trial found fewer artery problems when a blood-pressure medicine was added to celiprolol.`,hook:`The 2022 ACC/AHA guideline, written before ARCADE, said no studies showed a benefit of ARBs in vEDS. [[Isselbacher2022]]`}}
  };
  function drawTrial(k,q){
    const N=vb(tr,'720 250','400 370'),D=TRIALS[k];let s='';
    const per=N?10:29,sp=N?24:17,sz=N?20:16,ix=N?24:196;
    D.arms.forEach((a,ai)=>{const y0=N?20+ai*150:34+ai*92,iy=N?y0+30:y0;
      s+=T(N?ix:24,N?y0+8:y0+12,a.l,'t-lbl');
      s+=T(N?ix:24,N?y0+24:y0+30,`${a.e} of ${a.n} · ${f1(a.e/a.n*100).replace('.0','')}%`,'t-sm',`fill:${ai?'var(--ink)':'var(--accent)'};font-weight:700`);
      for(let i=0;i<a.n;i++){const c=i%per,r=Math.floor(i/per),on=i<Math.round(a.e*q);
        s+=person(ix+c*sp+sp/2,iy+r*(sz+8)-2,sz,on?'var(--vas)':'var(--line)')}});
    const fy=N?334:222;s+=TL(N?16:24,fy,N?[D.out,D.foot.split(' · ')[0]]:[D.foot],'t-xs',14,'fill:var(--ink)');
    if(!N)s+=T(24,fy+18,'outcome: '+D.out,'t-xs');
    tr.innerHTML=s;$('#vaTrialNote').innerHTML=noteHTML(D.note)}
  $$('[data-vatrial]').forEach(b=>b.addEventListener('click',()=>{trial=b.dataset.vatrial;press('[data-vatrial]','vatrial',trial);trStop&&trStop();trStop=animate(900,q=>drawTrial(trial,ease(q)))}));
  drawTrial(trial,1);
};
