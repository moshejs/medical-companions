/* =============== 1.1 What EDS is =============== */
inits.what=()=>{
  const svg=$('#whSvg'),rg=$('#whT');
  let scope='all',mode='wales';

  /* ---------- data (every number cited in the note panel or the table) ---------- */
  /* 13 types of 2017: abbreviation, inheritance (d dominant, r recessive, b both), size rank (log of published frequency), label */
  const TYPES=[
    {a:'hEDS',inh:'d',sz:5,f:'most common · no gene test',g:'gene unknown',hatch:true},
    {a:'cEDS',inh:'d',sz:4,f:'~1 in 20,000',g:'COL5A1/2'},
    {a:'vEDS',inh:'d',sz:3,f:'1 in 50–200k',g:'COL3A1'},
    {a:'kEDS',inh:'r',sz:2,f:'~1 in 100k',g:'PLOD1'},
    {a:'aEDS',inh:'d',sz:1,f:'<1/1M'},
    {a:'dEDS',inh:'r',sz:1,f:'<1/1M'},
    {a:'clEDS',inh:'r',sz:1,f:'<1/1M'},
    {a:'spEDS',inh:'r',sz:1,f:'<1/1M'},
    {a:'mcEDS',inh:'r',sz:1,f:'<1/1M'},
    {a:'mEDS',inh:'b',sz:1,f:'<1/1M'},
    {a:'pEDS',inh:'d',sz:1,f:'<1/1M'},
    {a:'cvEDS',inh:'r',sz:0,f:'7 people'},
    {a:'BCS',inh:'r',sz:0,f:'no estimate'}];
  const SEX={
    all:[{l:'Wales · EDS or JHS',v:70},{l:'Denmark · EDS',v:73.9},{l:'Sweden · EDS',v:74},{l:'US claims · new EDS',v:78},{l:'Netherlands · vEDS',v:50,hl:1}],
    h:[{l:'Sweden · hypermobility synd.',v:67},{l:'Mayo · hEDS (preprint)',v:90.6},{l:'HEDGE study · hEDS',v:92},{l:'Mayo · HSD (preprint)',v:95.2}]};
  const DELAY={
    all:[{l:'Germany · all types',v:22.0},{l:'Germany · cEDS/clEDS',v:14.5},{l:'Global Registry · hEDS',v:10.39}],
    h:[{l:'Germany · hEDS/HSD',v:23.0},{l:'Global Registry · hEDS',v:10.39},{l:'older reports',v:5,ge:1}]};
  /* "crowds of 1,000" needed to meet one person */
  const CROWDS=[{l:'cEDS',n:20,txt:'~1 in 20,000'},{l:'kEDS',n:100,txt:'~1 in 100,000'},{l:'vEDS',n:50,n2:200,txt:'1 in 50,000–200,000'},{l:'each ultra-rare type',n:1000,more:1,txt:'fewer than 1 in 1,000,000'}];

  const STEPS=[
    {from:0,at:.2,k:'Scene 1 · the body\'s glue',t:'Connective tissue everywhere',
     txt:`The Ehlers-Danlos syndromes are a family of conditions that affect connective tissue, the material that holds skin, joints, blood vessels and organs together. Most of the known EDS genes encode the fibrillar collagens I, III and V, the enzymes that modify or process them, or enzymes that modify the sugar chains of proteoglycans. Type III collagen is a major protein of vessel walls and hollow organs such as the bowel, which is why vascular EDS affects them. [[Malfait2017,Malfait2020,Byers2017]]`,
     pt:`Connective tissue is the body's glue and scaffolding. In EDS it is built a little differently, so skin, joints and other tissues can be stretchier or more fragile than usual.`,
     hook:`EDS = heritable disorders of connective tissue. Most known genes: collagens I, III, V and their processing enzymes. [[Malfait2020]]`},
    {from:.25,at:.45,k:'Scene 2 · the 2017 classification',t:'Thirteen types',
     txt:`The 2017 International Classification recognises 13 types, each with suggestive clinical criteria. For every type except hypermobile EDS, the definite diagnosis "relies on molecular confirmation": finding the causative variant. hEDS is the only clinical diagnosis, and it is the most common type. Green tiles are dominant (a child of an affected parent has a 50% chance of inheriting the variant); amber tiles are recessive (both parents carry a variant). Myopathic EDS has been reported with both patterns. [[Malfait2017,Tinkle2017,MalfaitGR-cEDS,RohrbachGR-kEDS,Zou2014COL12A1]]`,
     pt:`There are 13 kinds of EDS. Twelve can be confirmed with a gene test. The most common one, hypermobile EDS, cannot yet: doctors use a checklist and an examination.`,
     hook:`13 types in 2017; all except hEDS need a causative variant. The 2020 primer counts 14 (classical-like type 2, AEBP1) and 20 genes. [[Malfait2017,Malfait2020]]`},
    {from:.5,at:.7,k:'Scene 3 · how common',t:'How common is EDS?',
     txt:`In Wales, linked primary-care and hospital records found 6,021 people with a coded diagnosis of EDS or joint hypermobility syndrome: 194.2 per 100,000 in 2016/17, or about 1 in 500. Most (84%) carried the joint hypermobility syndrome label, which the authors map mainly to hEDS or HSD. Single types are far rarer: classical EDS about 1 in 20,000, vascular EDS 1 in 50,000 to 200,000, kyphoscoliotic about 1 in 100,000, and seven types fewer than 1 in 1,000,000. These count diagnosed people, so true numbers depend on case-finding and on the criteria in use. [[Demmler2019,VanDijk2024,Byers2017]]`,
     pt:`About 1 in every 500 people in Wales has been diagnosed with EDS or a related joint hypermobility condition. Most single types of EDS are much rarer.`,
     hook:`Wales: diagnosed EDS + JHS 194.2 per 100,000 (≈1 in 500), about four times the EU rare-disease threshold of 50 per 100,000. [[Demmler2019]]`},
    {from:.75,at:.97,k:'Scene 4 · who gets the diagnosis',t:'Who is diagnosed, and when',
     txt:`About 70–78% of people with a diagnosis in national registers and claims are female, and more than 90% in specialist hEDS cohorts, although an autosomal dominant condition should affect men and women equally. The reason is unknown: hormonal effects on tissue and pain, and under-recognition in males, are proposed (<span class="ev hyp">Hypothesis</span>). Vascular EDS, defined by a gene test, was 50% female in the Dutch cohort. In Wales, males were most often diagnosed at 5–9 years and females at 15–19, and women were diagnosed 8.5 years later than men on average. In a survey of 505 adults with hEDS the mean wait was 10.39 years; a German service reported 23.0 years for hEDS/HSD. [[Demmler2019,KulasSoborg2017,Cederlof2016,Oyediran2026,Halverson2023,Wilson2026Preprint,Forghani2019,Douglas2026,Demirdas2024,Rauterberg2025]]`,
     pt:`More women than men are diagnosed with hypermobile EDS, and doctors do not yet know why. Boys are often diagnosed in childhood, many women only as adults, and many people wait 10 years or more.`,
     hook:`Wales: women diagnosed on average 8.5 years later than men (95% CI 7.70–9.22); 72% of males vs 41% of females diagnosed before 18. [[Demmler2019]]`}];
  const setSt=stepWire($('#whSteps'),STEPS,rg,t=>draw(t),()=>stop());

  /* ---------- glyphs ---------- */
  function body(cx,top,s,lit){const P=(x,y)=>f1(cx+x*s)+' '+f1(top+y*s);let g='';
    const limb=d=>`<path d="${d}" style="fill:none;stroke:var(--line);stroke-width:${f1(17*s)};stroke-linecap:round;stroke-linejoin:round"/><path d="${d}" style="fill:none;stroke:var(--panel-2);stroke-width:${f1(13*s)};stroke-linecap:round;stroke-linejoin:round"/>`;
    g+=limb(`M${P(-30,46)}L${P(-44,98)}L${P(-50,150)}`)+limb(`M${P(30,46)}L${P(44,98)}L${P(50,150)}`);
    g+=limb(`M${P(-13,128)}L${P(-16,198)}L${P(-18,258)}`)+limb(`M${P(13,128)}L${P(16,198)}L${P(18,258)}`);
    g+=`<path d="M${P(-34,42)}Q${P(0,34)} ${P(34,42)}L${P(26,134)}Q${P(0,142)} ${P(-26,134)}Z" style="fill:var(--panel-2);stroke:var(--line);stroke-width:2"/>`;
    g+=`<rect x="${f1(cx-6*s)}" y="${f1(top+26*s)}" width="${f1(12*s)}" height="${f1(14*s)}" style="fill:var(--panel-2)"/><circle cx="${f1(cx)}" cy="${f1(top+15*s)}" r="${f1(15*s)}" style="fill:var(--panel-2);stroke:var(--line);stroke-width:2"/>`;
    /* faint inner organs that light up */
    if(lit[2]>0)g+=`<path d="M${P(-4,40)}L${P(-4,120)}M${P(-4,120)}L${P(-14,136)}M${P(-4,120)}L${P(8,136)}" style="fill:none;stroke:var(--vessel);stroke-width:${f1(3.2*s)};stroke-linecap:round;opacity:${f1(lit[2])}"/>`;
    if(lit[3]>0)g+=`<path d="${gutPath(cx-14*s,top+92*s,28*s,26*s)}" style="fill:none;stroke:var(--muscle);stroke-width:${f1(4*s)};stroke-linecap:round;opacity:${f1(lit[3])}"/>`;
    return g}
  const SITES=[[-47,124,'skin'],[16,198,'joint'],[-4,62,'vessel'],[0,104,'gut']];
  function gutPath(x,y,w,h){let d=`M${f1(x)} ${f1(y)}`;const n=3;for(let i=0;i<n;i++){const yy=y+h*i/n,y2=y+h*(i+.5)/n;
      d+=i%2?`C${f1(x+w)} ${f1(yy)} ${f1(x+w)} ${f1(yy)} ${f1(x+w*.5)} ${f1(y2)}C${f1(x)} ${f1(y2+h/(2*n))} ${f1(x)} ${f1(y2)} ${f1(x)} ${f1(y+h*(i+1)/n)}`
                :`C${f1(x+w*.3)} ${f1(yy-4)} ${f1(x+w)} ${f1(yy)} ${f1(x+w)} ${f1(y2)}C${f1(x+w)} ${f1(y2+h/(2*n))} ${f1(x+w*.7)} ${f1(y+h*(i+1)/n)} ${f1(x+w*.5)} ${f1(y+h*(i+1)/n)}`}
    return d}
  function gut(x,y,w,h,ph){const d=gutPath(x,y,w,h);
    return `<path d="${d}" style="fill:none;stroke:var(--skin-line);stroke-width:17;stroke-linecap:round;stroke-linejoin:round"/><path d="${d}" style="fill:none;stroke:var(--muscle);stroke-width:14;stroke-linecap:round;stroke-linejoin:round"/><path d="${d}" style="fill:none;stroke:var(--skin-derm);stroke-width:6;stroke-linecap:round;stroke-dasharray:10 8;stroke-dashoffset:${f1(-ph*90)}"/>`}
  function tile(x,y,w,T,op){const fill=T.inh==='r'?'var(--gold-soft)':'var(--accent-soft)',st=T.inh==='r'?'var(--gold)':'var(--accent)';let g='';
    g+=`<g style="opacity:${f1(op)}"><rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(w)}" rx="8" style="fill:${fill};stroke:${st};stroke-width:1.6"/>`;
    if(T.inh==='b')g+=`<path d="M${f1(x+w)} ${f1(y)}L${f1(x+w)} ${f1(y+w-8)}Q${f1(x+w)} ${f1(y+w)} ${f1(x+w-8)} ${f1(y+w)}L${f1(x)} ${f1(y+w)}Z" style="fill:var(--gold-soft);opacity:.9"/><rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(w)}" rx="8" style="fill:none;stroke:var(--gold);stroke-width:1.6;stroke-dasharray:4 3"/>`;
    if(T.hatch)g+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(w)}" rx="8" style="fill:url(#whHatch)"/>`;
    const big=w>=90,mid=w>=60;
    g+=`<text x="${f1(x+w/2)}" y="${f1(y+(big?w*.42:w/2+(mid?-2:2)))}" class="${big?'t-big':'t-lbl'} t-mid" style="${big?'font-size:24px':mid?'':'font-size:11.5px'}">${T.a}</text>`;
    if(big||mid)g+=`<text x="${f1(x+w/2)}" y="${f1(y+(big?w*.42+20:w/2+13))}" class="t-xs t-mid" style="fill:var(--ink)">${T.f}</text>`;
    else g+=`<text x="${f1(x+w/2)}" y="${f1(y+w/2+15)}" class="t-xs t-mid" style="font-size:8.5px">${T.f}</text>`;
    if(big&&T.g)g+=`<text x="${f1(x+w/2)}" y="${f1(y+w*.42+36)}" class="t-xs t-mid" style="fill:${T.hatch?'var(--variant)':'var(--muted)'};font-weight:600">${T.g}</text>`;
    return g+'</g>'}
  /* shelf packing of the 13 tiles */
  function pack(x0,y0,W,sizes,gap){let x=x0,y=y0,rowH=0;return sizes.map(w=>{if(x+w>x0+W+.5){x=x0;y+=rowH+gap;rowH=0}const p={x,y,w};x+=w+gap;rowH=Math.max(rowH,w);return p})}

  /* ---------- the scene ---------- */
  function draw(t){const N=vb(svg,'720 380','400 560');const W=N?400:720;let s='';
    const ph=phaseOf(STEPS,t);
    s+=`<defs><pattern id="whHatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="8" style="stroke:var(--variant);stroke-width:2;opacity:.45"/></pattern>${marker('whArr','var(--muted)')}</defs>`;
    s+=`<text x="16" y="28" class="t-big">${STEPS[ph].t}</text><text x="${W-16}" y="28" class="t-sm t-end">${ph+1} / 4</text>`;
    let read='';
    if(ph===0){const u=ramp(t,0,.23);const lit=[0,1,2,3].map(i=>ease(ramp(u,i*.22,i*.22+.16)));
      const bx=N?92:150,bt=N?66:70,bs=N?.9:1.12;
      s+=body(bx,bt,bs,lit);
      const PN=N?[0,1,2,3].map(i=>({x:184,y:52+i*124,w:206,h:114})):[0,1,2,3].map(i=>({x:300+(i%2)*208,y:48+Math.floor(i/2)*162,w:200,h:152}));
      const LBL=[['SKIN','stretch, scars, bruising'],['JOINTS','capsule and ligaments'],['BLOOD VESSELS','artery wall layers'],['GUT & HOLLOW ORGANS','bowel wall']];
      PN.forEach((p,i)=>{const L=lit[i],sx=bx+SITES[i][0]*bs,sy=bt+SITES[i][1]*bs;
        s+=`<line x1="${f1(sx)}" y1="${f1(sy)}" x2="${f1(p.x)}" y2="${f1(p.y+p.h/2)}" style="stroke:var(--accent);stroke-width:1.4;stroke-dasharray:3 3;opacity:${f1(L)}"/>`;
        s+=`<circle cx="${f1(sx)}" cy="${f1(sy)}" r="${f1(5+3*bump(u,i*.22,i*.22+.3))}" style="fill:var(--accent);opacity:${f1(.2+.8*L)}"/>`;
        s+=`<clipPath id="whc${i}"><rect x="${p.x}" y="${p.y}" width="${p.w}" height="${p.h}" rx="10"/></clipPath>`;
        s+=`<rect x="${p.x}" y="${p.y}" width="${p.w}" height="${p.h}" rx="10" style="fill:var(--field);stroke:${L>.5?'var(--accent)':'var(--line)'};stroke-width:${L>.5?1.6:1}"/>`;
        let g='';const lu=ramp(u,i*.22,1);
        if(i===0)g=skin(p.x+8,p.y+(N?50:62),p.w-16,{h:N?56:78,pull:.85*bump(lu,.05,.7),max:N?26:34,fingers:true}).svg;
        if(i===1)g=joint(p.x+p.w/2,p.y+(N?66:88),N?.42:.55,{lax:.55,ang:12*Math.sin(lu*Math.PI*2),slip:.15*bump(lu,.2,.8),muscle:.3});
        if(i===2)g=artery(p.x+6,p.y+(N?68:92),p.w-12,{r:N?10:13,media:N?5:7,flow:t*14});
        if(i===3)g=gut(p.x+40,p.y+(N?40:52),p.w-80,N?54:74,t*6);
        s+=`<g clip-path="url(#whc${i})" style="opacity:${f1(.18+.82*L)}">${g}</g>`;
        s+=`<rect x="${p.x+6}" y="${p.y+6}" width="${f1(Math.min(p.w-12,LBL[i][0].length*7.2+14))}" height="18" rx="5" style="fill:var(--panel);opacity:.9"/><text x="${p.x+13}" y="${p.y+19}" class="t-sm" style="fill:${L>.5?'var(--accent)':'var(--muted)'};font-weight:600">${LBL[i][0]}</text>`;
        s+=`<text x="${p.x+p.w-8}" y="${p.y+p.h-8}" class="t-xs t-end" style="fill:var(--ink);opacity:${f1(L)}">${LBL[i][1]}</text>`});
      if(!N)s+=`<text x="16" y="368" class="t-xs">Schematic: one connective-tissue system, many places it shows.</text>`;
      read=`<span>places lit <b>${lit.filter(v=>v>.5).length} of 4</b></span><span>collagens most often involved <b>I, III, V</b></span>`}
    if(ph===1){const u=ramp(t,.25,.47);
      const nx=N?200:78,ny=N?92:200;
      const sizes=N?[136,88,72,60,48,48,48,48,48,48,48,40,40]:[146,96,78,64,52,52,52,52,52,52,52,44,44];
      const P=N?pack(16,134,368,sizes,8):pack(166,58,540,sizes,9);
      TYPES.forEach((T,i)=>{const p=P[i],e=ease(ramp(u,i*.035,i*.035+.42));
        const x=lerp(nx-p.w/2*.3,p.x,e),y=lerp(ny-p.w/2*.3,p.y,e),w=lerp(p.w*.3,p.w,e);
        s+=`<line x1="${nx}" y1="${ny}" x2="${f1(x+w/2)}" y2="${f1(y+w/2)}" style="stroke:var(--line);stroke-width:1;opacity:${f1(.8*(1-e*.6))}"/>`;
        s+=tile(x,y,w,T,.25+.75*e)});
      s+=zebra(nx,ny,N?22:28,{id:'whZ'})+`<text x="${nx}" y="${ny+(N?38:46)}" class="t-lbl t-mid">EDS</text>`;
      const shown=TYPES.filter((T,i)=>ramp(u,i*.035,i*.035+.42)>.5).length;
      s+=`<text x="${nx}" y="${ny+(N?54:64)}" class="t-sm t-mid">${shown} of 13</text>`;
      /* legend */
      const ly=N?440:352,lx=N?16:166;const lg=[['var(--accent-soft)','var(--accent)','dominant'],['var(--gold-soft)','var(--gold)','recessive'],['url(#whHatch)','var(--variant)','gene unknown']];
      lg.forEach((L,i)=>{const x=lx+i*(N?120:128);s+=`<rect x="${x}" y="${ly-10}" width="14" height="14" rx="3" style="fill:${L[0]};stroke:${L[1]};stroke-width:1.4"/><text x="${x+20}" y="${ly+1}" class="t-sm">${L[2]}</text>`});
      s+=`<text x="${lx}" y="${ly+(N?22:20)}" class="t-xs">${N?'Tile size ≈ published frequency (log scale).':'Tile size ≈ published frequency on a log scale; mEDS (dashed) is reported as dominant or recessive.'}</text>`;
      if(N)s+=`<text x="${lx}" y="${ly+38}" class="t-xs">mEDS (dashed): dominant or recessive.</text><text x="${lx}" y="${ly+54}" class="t-xs">Abbreviations: see the table below.</text>`;
      read=`<span>types shown <b>${shown} / 13</b></span><span>confirmed by a gene test <b>12</b></span><span>clinical diagnosis only <b>hEDS</b></span><span>2020 primer <b>14 types · 20 genes</b></span>`}
    if(ph===2){const u=ramp(t,.5,.72);
      if(mode==='wales'){const cols=N?40:50,cs=9,gx=N?20:24,gy=N?62:66,rows=1000/cols;
        const shown=Math.round(1000*ease(ramp(u,0,.45)));let g='';
        const rate=1.942,jhs=.84;const hi=ramp(u,.5,.8);
        /* pick two fixed cells to light */
        const pick=[Math.floor(rows*.38)*cols+Math.floor(cols*.62),Math.floor(rows*.71)*cols+Math.floor(cols*.21)];
        for(let k=0;k<shown;k++){const cx=gx+(k%cols)*cs+cs/2,cy=gy+Math.floor(k/cols)*cs+cs/2;
          const which=pick.indexOf(k);let col='var(--line)',r=2.6;
          if(which>=0&&hi>0){r=2.6+hi*1.6;
            if(scope==='all')col=which===0?'var(--accent)':'var(--accent)';
            else col='var(--accent)'}
          g+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r)}" style="fill:${col}"/>`;
          if(which>=0&&hi>.2)g+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(6+hi*4)}" style="fill:none;stroke:var(--accent);stroke-width:1.6;opacity:${f1(hi)}"/>`}
        /* second dot is 0.94 of a person: shade the missing slice */
        s+=g;
        const gw=cols*cs,gh=rows*cs;
        s+=`<text x="${gx}" y="${gy-8}" class="t-sm">${shown.toLocaleString('en-GB')} people${N?'':' · one dot each'}</text>`;
        /* EU threshold marker: 0.5 per 1,000 = half a dot */
        const ix=N?20:gx+gw+22,iy=N?gy+gh+30:76,iw=N?360:W-ix-16;
        const val=scope==='all'?rate:rate*jhs;
        s+=`<text x="${ix}" y="${iy}" class="t-sm" style="fill:var(--accent)">${scope==='all'?'DIAGNOSED EDS OR JHS':'CODED JHS (≈ hEDS/HSD)'}</text>`;
        s+=`<text x="${ix}" y="${iy+(N?38:44)}" class="t-big" style="font-size:${N?36:42}px;fill:var(--accent)">${(val*hi).toFixed(2)}</text><text x="${ix+(N?96:112)}" y="${iy+(N?38:44)}" class="t-sm">per 1,000</text>`;
        s+=`<text x="${ix}" y="${iy+(N?58:66)}" class="t-xs" style="fill:var(--ink)">Wales, 2016/17 · ≈ 1 in ${scope==='all'?'500':'600'}</text>`;
        /* bar comparing to EU rare threshold and other registers */
        const bars=scope==='all'?[['Wales EDS+JHS',1.942],['Sweden EDS+JHS',1.2],['EU rare threshold',.5,1],['Denmark EDS only',.2]]:[['Wales, coded JHS',1.631],['Wales, coded EDS',.311],['EU rare threshold',.5,1]];
        const by=iy+(N?80:92),bw=iw-(N?118:0),bx0=ix+(N?118:0);
        bars.forEach((b,i)=>{const yy=N?by+i*20:by+i*34,len=bw*b[1]/2.2*ease(ramp(u,.55+i*.06,.85+i*.04));
          if(N)s+=`<text x="${ix}" y="${yy+9}" class="t-xs" style="fill:var(--ink)">${b[0]}</text>`;else s+=`<text x="${bx0}" y="${yy}" class="t-xs" style="fill:var(--ink)">${b[0]}</text>`;
          const ry=N?yy:yy+5;
          s+=`<rect x="${bx0}" y="${ry}" width="${f1(Math.max(1,len))}" height="10" rx="3" style="fill:${b[2]?'none':'var(--accent)'};stroke:${b[2]?'var(--warn)':'none'};stroke-dasharray:${b[2]?'3 2':'0'};opacity:${b[2]?1:.85}"/>`;
          s+=`<text x="${f1(bx0+len+5)}" y="${ry+9}" class="t-xs">${b[1].toFixed(b[1]<1?1:2).replace(/\.0$/,'')}</text>`});
        read=`<span>people shown <b>${shown}</b></span><span>${scope==='all'?'diagnosed EDS or JHS':'coded JHS'} <b>${(val*hi).toFixed(2)} per 1,000</b></span><span>EU rare threshold <b>0.5 per 1,000</b></span><span>count <b>${scope==='all'?'all EDS':'hEDS + HSD only'}</b></span>`}
      else{/* type-specific: crowds of 1,000 needed to meet one person */
        const lx=N?16:24,sx=N?16:186,cs=N?3.6:4,per=100;let y=N?68:72;
        s+=`<text x="${lx}" y="${y}" class="t-sm">${N?'One square = a crowd of 1,000 people.':'One square = a crowd of 1,000 people. Squares needed to meet one person with the type:'}</text>`;y+=N?14:22;
        if(N){s+=`<text x="${lx}" y="${y}" class="t-sm">Squares needed to meet one person:</text>`;y+=18}
        const hl=scope==='h';
        s+=`<rect x="${lx}" y="${y-2}" width="${W-2*lx}" height="${N?40:30}" rx="8" style="fill:${hl?'var(--warn-soft)':'var(--panel-2)'}"/>`;
        s+=`<text x="${lx+10}" y="${y+(N?15:18)}" class="t-lbl" style="font-size:12.5px">hEDS</text><text x="${lx+(N?52:60)}" y="${y+(N?15:18)}" class="t-xs" style="fill:var(--ink)">${N?'no type-specific estimate: no gene test.':'no type-specific estimate: there is no gene test to count it by. Wales counts it inside 1.94 per 1,000.'}</text>`;
        if(N)s+=`<text x="${lx+52}" y="${y+30}" class="t-xs" style="fill:var(--ink)">Wales counts it in 1.94 per 1,000.</text>`;
        y+=N?56:46;
        CROWDS.forEach((c,ci)=>{const e=ease(ramp(u,ci*.12,ci*.12+.45)),n=Math.round(c.n*e),n2=c.n2?Math.round(c.n2*e):0,tot=Math.max(n,n2);
          const lines=Math.max(1,Math.ceil(tot/per));
          s+=`<g style="opacity:${hl?.4:1}">`;
          s+=`<text x="${lx}" y="${y+(N?0:9)}" class="t-lbl" style="font-size:12.5px">${c.l}</text><text x="${N?W-16:lx}" y="${y+(N?0:24)}" class="t-xs ${N?'t-end':''}" style="fill:var(--ink)">${c.txt}</text>`;
          const yy=N?y+8:y;
          let g='';for(let k=0;k<tot;k++){const cx=sx+(k%per)*cs,cy=yy+Math.floor(k/per)*cs;const lo=k<n;g+=`<rect x="${f1(cx)}" y="${f1(cy)}" width="${f1(cs-1)}" height="${f1(cs-1)}" style="fill:${lo?'var(--accent)':'var(--accent-soft)'};stroke:${lo?'none':'var(--accent)'};stroke-width:.4"/>`}
          s+=g;
          const endTxt=c.more?`${tot>=c.n?'1,000+':tot}`:c.n2?`${n}–${n2}`:`${n}`;
          const ex=sx+Math.min(per,tot)*cs+6;
          s+=`<text x="${f1(Math.min(ex,W-60))}" y="${f1(yy+Math.min(lines,1)*cs+(N?8:6))}" class="t-sm" style="fill:var(--accent);font-weight:600">${endTxt}</text>`;
          s+=`</g>`;
          y=yy+lines*cs+(N?24:30)});
        read=`<span>cEDS <b>20 crowds</b></span><span>vEDS <b>50–200 crowds</b></span><span>kEDS <b>100 crowds</b></span><span>ultra-rare types <b>1,000+ crowds</b></span>`}}
    if(ph===3){const u=ramp(t,.75,.97);
      const A=N?{x:16,y:62,w:368,lw:150}:{x:20,y:66,w:330,lw:156},B=N?{x:16,y:N?318:0,w:368}:{x:384,y:66,w:320};
      const sex=SEX[scope];
      s+=`<text x="${A.x}" y="${A.y}" class="t-sm" style="fill:var(--accent)">SHARE FEMALE · ${scope==='all'?'all diagnosed EDS':'hEDS / HSD cohorts'}</text>`;
      const bx=A.x+A.lw,bw=A.w-A.lw-34,row=N?24:28;
      sex.forEach((d,i)=>{const yy=A.y+16+i*row,e=ease(ramp(u,i*.06,.45+i*.06));
        s+=`<text x="${bx-6}" y="${yy+11}" class="t-xs t-end" style="fill:var(--ink)">${d.l}</text>`;
        s+=`<rect x="${bx}" y="${yy}" width="${bw}" height="14" rx="3" style="fill:var(--panel-2)"/>`;
        s+=`<rect x="${bx}" y="${yy}" width="${f1(bw*d.v/100*e)}" height="14" rx="3" style="fill:${d.hl?'var(--vas)':'var(--accent)'};opacity:.85"/>`;
        s+=`<text x="${f1(bx+bw*d.v/100*e+4)}" y="${yy+11}" class="t-xs" style="fill:var(--ink)">${f1(d.v*e).replace('.0','')}%</text>`});
      const half=bx+bw/2,ytop=A.y+12,ybot=A.y+16+sex.length*row-6;
      s+=`<line x1="${f1(half)}" x2="${f1(half)}" y1="${ytop}" y2="${ybot}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:3 3"/><text x="${f1(half)}" y="${ybot+13}" class="t-xs t-mid" style="fill:var(--ink)">50% = what a dominant gene predicts</text>`;
      /* panel B: age and delay */
      const by=N?A.y+16+sex.length*row+34:B.y;
      s+=`<text x="${B.x}" y="${by}" class="t-sm" style="fill:var(--accent)">AGE AT DIAGNOSIS · WALES</text>`;
      const ax0=B.x+(N?40:44),ax1=B.x+B.w-10,AX=a=>lerp(ax0,ax1,a/40),ay=by+30;
      s+=`<line x1="${ax0}" x2="${ax1}" y1="${ay}" y2="${ay}" class="axis"/>`;[0,10,20,30,40].forEach(a=>s+=`<text x="${f1(AX(a))}" y="${ay+13}" class="t-xs t-mid">${a}</text>`);
      s+=`<text x="${ax1}" y="${ay+26}" class="t-xs t-end">years</text>`;
      const pk=[['male',5,9,'var(--dx)',-14],['female',15,19,'var(--accent)',-14]];
      pk.forEach((p,i)=>{const e=ease(ramp(u,.15+i*.1,.45+i*.1));s+=`<rect x="${f1(AX(p[1]))}" y="${ay+p[4]}" width="${f1((AX(p[2])-AX(p[1]))*e)}" height="10" rx="3" style="fill:${p[3]}"/><text x="${f1(AX(p[1]))}" y="${ay+p[4]-4}" class="t-xs" style="fill:${p[3]};font-weight:600">${p[0]} peak ${p[1]}–${p[2]}</text>`});
      s+=`<text x="${B.x}" y="${ay-4}" class="t-xs">peak</text>`;
      /* childhood share */
      const cy=ay+44;s+=`<text x="${B.x}" y="${cy}" class="t-xs" style="fill:var(--ink)">diagnosed before 18: males <tspan style="fill:var(--dx);font-weight:700">${Math.round(72*ease(ramp(u,.3,.6)))}%</tspan> · females <tspan style="fill:var(--accent);font-weight:700">${Math.round(41*ease(ramp(u,.3,.6)))}%</tspan> · women ${f1(8.5*ease(ramp(u,.35,.65)))} y later</text>`;
      /* delay bars */
      const dy=cy+26;s+=`<text x="${B.x}" y="${dy}" class="t-sm" style="fill:var(--accent)">YEARS TO DIAGNOSIS · mean</text>`;
      const dl=DELAY[scope],dlw=N?150:146,dx0=B.x+dlw,dw=B.x+B.w-dx0-40;
      dl.forEach((d,i)=>{const yy=dy+12+i*(N?22:24),e=ease(ramp(u,.4+i*.08,.75+i*.06));
        s+=`<text x="${dx0-6}" y="${yy+10}" class="t-xs t-end" style="fill:var(--ink)">${d.l}</text>`;
        s+=`<rect x="${dx0}" y="${yy}" width="${f1(dw*d.v/25*e)}" height="12" rx="3" style="fill:var(--gold);opacity:.8"/><text x="${f1(dx0+dw*d.v/25*e+4)}" y="${yy+10}" class="t-xs" style="fill:var(--ink)">${d.ge?'≥ ':''}${(d.v*e).toFixed(d.v%1?d.v===10.39?2:1:0)} y</text>`});
      read=`<span>female share <b>${sex.map(d=>d.v+'%').join(' · ')}</b></span><span>diagnostic delay <b>${dl.map(d=>d.v).join(' / ')} y</b></span><span>count <b>${scope==='all'?'all EDS':'hEDS + HSD only'}</b></span>`}
    svg.innerHTML=s;
    setSt(ph);
    $('#whNote').innerHTML=noteHTML(STEPS[ph]);
    $('#whRead').innerHTML=read;
  }
  const stop=playWire(rg,$('#whPlay'),draw,24000,'%t:player.replay%','what');
  $$('[data-whscope]').forEach(b=>b.addEventListener('click',()=>{scope=b.dataset.whscope;$$('[data-whscope]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  $$('[data-whmode]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.whmode;$$('[data-whmode]').forEach(x=>x.setAttribute('aria-pressed',x===b));
    if(+rg.value<.5||+rg.value>=.75){stop();rg.value=.7}draw(+rg.value)}));
  draw(+rg.value);

  /* ---------- zebra flip cards ---------- */
  $$('#whZebra .fc').forEach(c=>c.addEventListener('click',()=>{const on=c.getAttribute('aria-pressed')!=='true';c.setAttribute('aria-pressed',on);c.classList.toggle('flip',on)}));

  /* ---------- population calculator ---------- */
  const pop=$('#whPop'),pre=$('#whPreset');
  const fmt=v=>v>=100?Math.round(v).toLocaleString('en-GB'):v>=10?Math.round(v).toString():v>=1?f1(v):v>=.01?v.toFixed(2):'<0.01';
  function calc(){let n=Math.max(0,+pop.value||0);
    const rows=[[n*194.2/1e5,'diagnosed EDS or joint hypermobility syndrome, at the Welsh rate'],[n/2e4,'with classical EDS (about 1 in 20,000)'],[[n/2e5,n/5e4],'with vascular EDS (1 in 200,000 to 1 in 50,000)'],[n/1e5,'with kyphoscoliotic EDS (about 1 in 100,000)'],[n/1e6,'with each ultra-rare type (fewer than 1 in 1,000,000)',1]];
    $('#whCalcOut').innerHTML=rows.map(r=>`<div><b>${Array.isArray(r[0])?fmt(r[0][0])+'–'+fmt(r[0][1]):(r[2]?'&lt; ':'')+fmt(r[0])}</b><span>${r[1]}</span></div>`).join('');
    $('#whCalcCap').innerHTML=`Expected numbers in ${Math.round(n).toLocaleString('en-GB')} people, applying published rates. These are population statistics: they say nothing about any one person, and real counts depend on testing, coding and criteria. [[Demmler2019,VanDijk2024,Byers2017]]`}
  pop.addEventListener('input',()=>{pre.value='';calc()});
  pre.addEventListener('change',()=>{if(pre.value){pop.value=pre.value;calc()}});
  calc();
};
