/* =============== 1.5 fat tissue as an organ =============== */
/* Main player: body -> belly cross-section -> a sheet of fat cells that enlarge, run short of oxygen, gather
   macrophages, shift their signals and finally spill fatty acids into liver, muscle and pancreas. All levels are
   schematic; the numbers in the notes come from the research pass, cited. */
const AD_STEPS=[
 {from:0,at:.07,k:'The body',t:'Two places to store fat',
  txt:'Fat under the skin is subcutaneous fat; fat inside the abdomen, around the organs, is visceral fat. In 3001 Framingham participants, visceral fat was more strongly linked to metabolic risk: the odds ratio for metabolic syndrome per 1-SD increase was 4.7 for visceral vs 3.0 for subcutaneous fat in women, and 4.2 vs 2.5 in men. Only visceral fat added information after adjusting for BMI and waist. [[Fox2007Framingham]] Visceral fat measured by CT or MRI is an independent marker of cardiovascular and metabolic risk and death. [[Neeland2019]]',
  pt:'Where fat is stored matters. Fat deep in the belly and fat in the liver are more closely linked to diabetes and heart disease than fat under the skin. [[Fox2007Framingham,Neeland2019]]',
  hook:'Visceral fat outranks subcutaneous fat: OR for metabolic syndrome 4.7 vs 3.0 per SD in women. [[Fox2007Framingham]]'},
 {from:.17,at:.27,k:'Zoom in',t:'Fat cells grow',
  txt:'Fat tissue can expand through bigger cells (hypertrophy) or more cells (hyperplasia). Cell number is most likely to rise in the first years of life and again at about age 9 to 13. [[Salans1973]] In adults the number stays constant, even after marked weight loss. [[Spalding2008]] In 764 adults, hypertrophic fat (few large cells) went with higher fasting insulin and lower insulin sensitivity, independent of fat mass; people with hypertrophy made 70% fewer new fat cells per year than people with hyperplasia. [[Arner2010]]',
  pt:'Each fat cell is mostly one big droplet of stored fat. When there is more to store, the cells mainly get bigger. [[Spalding2008,Arner2010]]',
  hook:'Hypertrophy (bigger cells) vs hyperplasia (more cells); hypertrophic fat is the less insulin-sensitive pattern. [[Arner2010]]'},
 {from:.34,at:.42,k:'Growing pains',t:'Oxygen runs short',
  txt:'Healthy expansion of fat tissue needs new blood vessels and immune remodelling. Growing fat cells can quickly reach the limit of how far oxygen diffuses from a capillary, and this hypoxia is an early factor that limits healthy expansion. [[Sun2011]] In the drawing, cells far from the vessel turn grey-blue.',
  pt:'Very large fat cells sit further from the nearest blood vessel, so they can run short of oxygen. [[Sun2011]]',
  hook:'Hypoxia is an early limit on healthy adipose expansion. [[Sun2011]]'},
 {from:.5,at:.59,k:'Inflammation',t:'Crown-like structures',
  txt:'More than 90% of the macrophages in the white fat of mice and humans with obesity sit around dead fat cells. They fuse and scavenge the leftover lipid droplet, forming "crown-like structures". Fat-cell death was 30-fold higher in obese db/db mice and rose with cell size. [[Cinti2005]] Macrophage content rose with fat-cell size and body mass in mice and in human fat under the skin, and macrophages made almost all of the tissue\'s TNF-alpha. [[Weisberg2003]]',
  pt:'When fat cells get too big, some die. Immune cells called macrophages crowd round them to clear up, and the tissue becomes mildly inflamed. [[Cinti2005,Weisberg2003]]',
  hook:'Crown-like structure = macrophages ringing a dead, hypertrophic adipocyte; >90% of fat macrophages in obesity. [[Cinti2005]]'},
 {from:.66,at:.75,k:'An endocrine organ',t:'Signals shift',
  txt:'Fat tissue secretes leptin, adiponectin, cytokines, complement, PAI-1, renin-angiotensin proteins and resistin. [[Kershaw2004]] Leptin rises with body fat (31.3 vs 7.5 ng/mL in people with and without obesity). [[Considine1996]] Adiponectin, made only by fat cells, is paradoxically lower in obesity. [[Arita1999]] TNF-alpha is induced in fat in rodent obesity, and neutralising it improved insulin-stimulated glucose uptake in obese rats. [[Hotamisligil1993]] In mice, inflammatory genes in fat rose before the sharp rise in blood insulin. [[Xu2003]]',
  pt:'As fat tissue gets inflamed, the messages it sends change: more inflammatory signals, less of the helpful hormone adiponectin. [[Arita1999,Hotamisligil1993]]',
  hook:'Adiponectin is made only by fat, yet is lower in obesity. [[Arita1999]] Fat macrophages make almost all fat-tissue TNF-alpha. [[Weisberg2003]]'},
 {from:.83,at:.93,k:'Ectopic fat',t:'Fat spills over',
  txt:'In obesity, fat tissue releases more fatty acids, glycerol, hormones and inflammatory cytokines, which drive insulin resistance; type 2 diabetes develops when beta-cell dysfunction is added. [[Kahn2006]] Visceral obesity goes with fat tissue under the skin that cannot expand properly and triglyceride stored in the wrong places: high triglycerides, liver insulin resistance, small dense LDL and low HDL. [[Tchernof2013]] It can reverse: on a 600 kcal/day research diet, liver fat in 11 people with type 2 diabetes fell from 12.8% to 2.9% in 8 weeks and pancreatic fat from 8.0% to 6.2%. [[Lim2011]] More in <a href="#diabetes" data-go="diabetes">Obesity &amp; type 2 diabetes</a>.',
  pt:'When fat tissue is full and inflamed, fat ends up in the liver, muscles and pancreas. There it makes insulin work less well. [[Kahn2006,Tchernof2013]]',
  hook:'Ectopic fat (liver, pancreas) links visceral obesity to insulin resistance and type 2 diabetes. [[Tchernof2013,Kahn2006]]'}
];
const AD_LBL={body:'the body',zoom:'inside fat tissue (zoomed in)',sig:'signals from fat',org:'other organs',sub:'subcutaneous',vis:'visceral',
  adipo:'adiponectin',lep:'leptin',tnf:'inflammatory signals',ffa:'fatty acids',ir:'insulin resistance',o2:'low oxygen',clsx:'crown-like structure',
  liver:'liver',muscle:'muscle',panc:'pancreas',size:['small cells','enlarging cells','enlarged cells']};

/* white / beige / brown */
const AD_KINDS=[
 {id:'white',n:'White fat',
  warm:{t:'White fat: the store',txt:'White fat stores surplus energy. [[Becher2021,Wu2012]] Each cell is one big lipid droplet with the nucleus pressed against the rim. Cold does not turn it into a heater. White fat is also the tissue that sends leptin and adiponectin. [[Kershaw2004]]'},
  cold:{t:'White fat in the cold',txt:'White fat stores energy rather than burning it as heat; heat production through UCP1 belongs to brown and beige fat. [[Becher2021,Wu2012]]'}},
 {id:'beige',n:'Beige fat',
  warm:{t:'Beige fat, switched off',txt:'Beige fat cells appear within white fat and have very low basal UCP1. [[Wu2012]] At rest they look much like small white fat cells with several droplets.'},
  cold:{t:'Beige fat, switched on',txt:'When stimulated, beige cells switch on high UCP1 and respiration, like brown fat. Evidence suggests the brown fat found in adults is made of beige cells. [[Wu2012]] <span class="ev early">Early evidence</span>'}},
 {id:'brown',n:'Brown fat',
  warm:{t:'Brown fat at room temperature',txt:'Brown fat burns energy as heat through UCP1. [[Becher2021]] At 22 °C, brown fat activity was not seen in a group of young men. [[vanMarkenLichtenbelt2009]] On routine PET-CT scans it was found in 7.5% of women and 3.1% of men, less often with older age, warmer weather, beta-blockers and, in older people, higher BMI. [[Cypess2009]]'},
  cold:{t:'Brown fat in the cold',txt:'At 16 °C, activity appeared in 23 of 24 young men; it was lower in men with overweight or obesity and tracked resting metabolic rate. [[vanMarkenLichtenbelt2009]] After 2 hours at 19 °C it was seen in 17 of 32 adults aged 23 to 35 but only 2 of 24 aged 38 to 65. [[Saito2009]] Cold raised glucose uptake 15-fold in neck fat, and biopsies showed UCP1-positive brown fat cells. [[Virtanen2009]]'}}
];
const AD_BAT=[
 {n:'routine PET-CT, women',v:7.5},{n:'routine PET-CT, men',v:3.1},{n:'young men, 16 °C',v:96},{n:'2 h at 19 °C, age 23–35',v:53},{n:'2 h at 19 °C, age 38–65',v:8}
];
const AD_TXT={cold:'Cold on',heat:'heat (UCP1)',ucp:'UCP1 heat output (schematic)',bat:'active brown fat detected, % of people',kind:'Type'};

inits.adipose=()=>{
  /* ---------- the main player ---------- */
  const svg=$('#adSvg'),rg=$('#adT');
  /* belly cross-section: subcutaneous ring, abdominal cavity with bowel loops, visceral fat between them */
  function disc(cx,cy,R,vis,hl){
    const ri=R*(.8-.05*vis);let s='';
    s+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(R)}" style="fill:var(--fat);stroke:var(--figure-line);stroke-width:1.6"/>`;
    s+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(ri)}" style="fill:var(--panel-2);stroke:var(--fat-line);stroke-width:1"/>`;
    const V=[[-.42,-.18],[.4,-.22],[0,-.48],[-.3,.3],[.34,.26],[.02,.08]],G=[[-.18,-.32],[.2,-.36],[-.44,.08],[.44,.04],[-.12,.36],[.16,.4],[0,-.12],[-.22,.12],[.24,-.06]];
    V.forEach((p,i)=>{s+=`<path d="${blob(cx+p[0]*ri,cy+p[1]*ri,ri*(.1+.16*vis),31+i,{rough:.22})}" style="fill:var(--fat);stroke:var(--fat-line);stroke-width:.8"/>`});
    G.forEach(p=>{s+=`<circle cx="${f1(cx+p[0]*ri)}" cy="${f1(cy+p[1]*ri)}" r="${f1(ri*.13)}" style="fill:var(--gut);stroke:var(--gut-line);stroke-width:1"/>`});
    s+=`<circle cx="${f1(cx)}" cy="${f1(cy+ri*.74)}" r="${f1(ri*.15)}" style="fill:var(--figure);stroke:var(--figure-line);stroke-width:1"/>`;
    if(hl>0)s+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(ri-3)}" style="fill:none;stroke:var(--ink);stroke-width:1.6;stroke-dasharray:4 3;opacity:${f1(hl)}"/>`;
    return s}
  function muscle(x,y,w,h,fat){let s=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(h/2)}" style="fill:var(--lean);stroke:var(--ink);stroke-opacity:.4;stroke-width:1"/>`;
    for(let i=1;i<6;i++)s+=`<path d="M${f1(x+h*.4)} ${f1(y+h*i/6)}L${f1(x+w-h*.4)} ${f1(y+h*i/6)}" style="stroke:var(--panel);stroke-width:1;opacity:.45"/>`;
    const rr=rng(5),n=Math.round(fat*12);for(let i=0;i<n;i++)s+=`<circle cx="${f1(x+h*.5+rr()*(w-h))}" cy="${f1(y+h*.2+rr()*h*.6)}" r="${f1(2+rr()*1.6)}" style="fill:var(--liverfat)"/>`;
    return s}
  function pancreas(x,y,w,fat){const P=[[0,.5],[.15,.2],[.45,.18],[.8,.05],[1,.22],[.96,.5],[.6,.62],[.3,.8],[.06,.84]].map(p=>[x+p[0]*w,y+p[1]*w*.42]);
    let s=`<path d="${smoothPath(P)}" style="fill:var(--cyto);stroke:var(--gut-line);stroke-width:1.2"/>`;
    const rr=rng(9),n=Math.round(fat*9);for(let i=0;i<n;i++)s+=`<circle cx="${f1(x+w*(.12+rr()*.72))}" cy="${f1(y+w*.42*(.3+rr()*.36))}" r="${f1(1.8+rr()*1.5)}" style="fill:var(--liverfat)"/>`;
    return s}
  function draw(t){
    const N=vb(svg,'720 380','400 560');
    const L=N?{px:46,py:22,ps:160,dc:[150,100],dR:46,bx:20,by:214,bw:360,bh:170,sx:214,sy:30,sw:112,sgh:40,org:'row',oy:418}
             :{px:56,py:46,ps:270,dc:[160,152],dR:50,bx:236,by:44,bw:236,bh:240,sx:500,sy:44,sw:120,sgh:36,org:'col',oy:178};
    const p=phaseOf(AD_STEPS,t),P=AD_STEPS[p];
    const size=lerp(.18,.95,ramp(t,.17,.34)),hyp=ramp(t,.34,.5)*.9,inf=ramp(t,.5,.64)*.38,mac=ramp(t,.52,.68),spill=ramp(t,.83,.97);
    const vis=lerp(.35,1,ramp(t,.05,.6)),hl=bump(t,0,.17);
    let s='';
    /* panel titles */
    s+=`<text x="${N?16:16}" y="${N?14:24}" class="t-xs" style="fill:var(--ink);font-weight:700">${AD_LBL.body}</text>`;
    s+=`<text x="${L.bx}" y="${L.by-8}" class="t-xs" style="fill:var(--ink);font-weight:700">${AD_LBL.zoom}</text>`;
    s+=`<text x="${L.sx}" y="${L.sy-12}" class="t-xs" style="fill:var(--ink);font-weight:700">${AD_LBL.sig}</text>`;
    /* body and cross-section */
    const pe=person(L.px,L.py,L.ps,{size:.55});s+=pe.svg;
    const b=pe.at.belly,[cx,cy]=L.dc,R=L.dR;
    s+=`<circle cx="${f1(b[0])}" cy="${f1(b[1])}" r="${N?7:10}" style="fill:none;stroke:var(--ink);stroke-width:1.4"/><path d="M${f1(b[0]+(N?7:10))} ${f1(b[1])}L${f1(cx-R)} ${f1(cy)}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:3 3"/>`;
    s+=disc(cx,cy,R,vis,hl);
    s+=kitLabel(cx,cy-R-6,AD_LBL.sub,{a:'m'})+kitLabel(cx,cy+R+14,AD_LBL.vis+' (inside)',{a:'m'});
    /* zoom wedge from the cross-section to the tissue box */
    const zx=cx+R*.55,zy=cy-R*.55;
    s+=`<circle cx="${f1(zx)}" cy="${f1(zy)}" r="6" style="fill:none;stroke:var(--ink);stroke-width:1.2"/>`;
    s+=N?`<path d="M${f1(zx-5)} ${f1(zy+4)}L${L.bx} ${L.by}M${f1(zx+5)} ${f1(zy+4)}L${f1(L.bx+L.bw*.4)} ${L.by}" style="stroke:var(--line);stroke-width:1.2;fill:none"/>`
        :`<path d="M${f1(zx+4)} ${f1(zy-4)}L${L.bx} ${L.by}M${f1(zx+4)} ${f1(zy+4)}L${L.bx} ${L.by+L.bh}" style="stroke:var(--line);stroke-width:1.2;fill:none"/>`;
    /* the tissue */
    const tis=adiposeTissue(L.bx,L.by,L.bw,L.bh,{size,inflamed:inf,macro:mac,vessel:1,hypoxia:hyp,seed:9,frame:true,cell:N?30:32});
    s+=tis.svg;
    const sz=size<.35?0:size<.7?1:2;
    s+=kitLabel(L.bx+8,L.by+L.bh-8,AD_LBL.size[sz]+(hyp>.3?' · '+AD_LBL.o2:'')+(mac>.3?' · '+AD_LBL.clsx+'s':''),{});
    /* signals */
    const SG=[{n:AD_LBL.adipo,v:.78-.5*ramp(t,.6,.8),col:'var(--brand)'},{n:AD_LBL.lep,v:.28+.55*ramp(t,.15,.45),col:'var(--leptin)'},{n:AD_LBL.tnf,v:.08+.8*ramp(t,.5,.8),col:'var(--macro)'}];
    SG.forEach((g,i)=>{const y=L.sy+i*L.sgh,base=[.78,.28,.08][i],d=g.v-base;
      s+=`<text x="${L.sx}" y="${y+4}" class="t-xs" style="fill:var(--ink)">${g.n}</text>`;
      s+=`<rect x="${L.sx}" y="${y+9}" width="${L.sw}" height="10" rx="3" style="fill:var(--panel-2)"/><rect x="${L.sx}" y="${y+9}" width="${f1(L.sw*g.v)}" height="10" rx="3" style="fill:${g.col}"/>`;
      s+=`<rect x="${f1(L.sx+L.sw*base-1)}" y="${y+6}" width="2" height="16" style="fill:var(--ink);opacity:.5"/>`;
      if(Math.abs(d)>.08)s+=`<text x="${L.sx+L.sw+8}" y="${y+18}" class="t-sm" style="fill:var(--ink);font-weight:700">${d>0?'▲':'▼'}</text>`});
    /* organs and the spill-over of fatty acids */
    let O;
    if(N)O=[{n:AD_LBL.liver,at:[66,L.oy+44],d:()=>liver(18,L.oy+10,.68,{fat:spill*.85}).svg},
            {n:AD_LBL.muscle,at:[200,L.oy+44],d:()=>muscle(154,L.oy+26,92,34,spill)},
            {n:AD_LBL.panc,at:[320,L.oy+44],d:()=>pancreas(272,L.oy+22,100,spill)}];
    else O=[{n:AD_LBL.liver,at:[548,L.oy+40],lp:[548,L.oy+88],d:()=>liver(498,L.oy+8,.72,{fat:spill*.85}).svg},
            {n:AD_LBL.muscle,at:[662,L.oy+39],lp:[662,L.oy+74],d:()=>muscle(616,L.oy+22,92,34,spill)},
            {n:AD_LBL.panc,at:[554,L.oy+122],lp:[554,L.oy+156],d:()=>pancreas(506,L.oy+104,96,spill)}];
    s+=`<text x="${N?16:500}" y="${N?L.oy-4:L.oy-6}" class="t-xs" style="fill:var(--ink);font-weight:700">${AD_LBL.org}${spill>.05?' ← '+AD_LBL.ffa:''}</text>`;
    O.forEach((o,k)=>{s+=o.d();
      const lp=o.lp||[o.at[0],o.at[1]+44];
      s+=kitLabel(lp[0],lp[1],o.n,{a:'m'});
      if(spill>.05){const src=N?[L.bx+L.bw*(.2+.3*k),L.by+L.bh]:[L.bx+L.bw,L.by+L.bh*(.45+.2*k)],dst=o.at,
          c=N?[(src[0]+dst[0])/2,(src[1]+dst[1])/2-4]:[(src[0]+dst[0])/2,src[1]];
        s+=`<path d="M${f1(src[0])} ${f1(src[1])}Q${f1(c[0])} ${f1(c[1])} ${f1(dst[0])} ${f1(dst[1])}" style="fill:none;stroke:var(--fat-line);stroke-width:1.2;stroke-dasharray:3 4;opacity:${f1(spill*.7)}"/>`;
        for(let i=0;i<5;i++){const u=(t*14+i/5+k*.13)%1,q=1-u,x=q*q*src[0]+2*q*u*c[0]+u*u*dst[0],y=q*q*src[1]+2*q*u*c[1]+u*u*dst[1];
          s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="3" style="fill:var(--fat);stroke:var(--fat-line);stroke-width:1;opacity:${f1(spill*bump(u,0,1)*1.2)}"/>`}}
      if(spill>.5)s+=`<circle cx="${f1(o.at[0])}" cy="${f1(o.at[1])}" r="${N?30:32}" style="fill:none;stroke:var(--risk);stroke-width:1.6;stroke-dasharray:5 4;opacity:${f1(ramp(spill,.5,1))}"/>`});
    if(spill>.5)s+=N?kitLabel(200,L.oy+128,AD_LBL.ir,{a:'m'}):kitLabel(662,L.oy+128,AD_LBL.ir,{a:'m'});
    svg.innerHTML=s;
    setSt(p);$('#adNote').innerHTML=noteHTML(P);
  }
  const stop=playWire(rg,$('#adPlay'),draw,22000,'%t:player.replay%','adipose');
  const setSt=stepWire($('#adSteps'),AD_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- white / beige / brown ---------- */
  const ks=$('#adKind'),kb=$('#adKindBtns'),kn=$('#adKindNote');let ki=0,cold=false;
  kb.innerHTML=`<span class="lbl">${AD_TXT.kind}</span>`+AD_KINDS.map((k,i)=>`<button class="btn" data-kind="${i}" aria-pressed="${i===0}">${k.n}</button>`).join('')+`<button class="btn ghost" id="adCold" aria-pressed="false">❄ ${AD_TXT.cold}</button>`;
  function heat(x,y,w,n,lvl){if(lvl<=.05)return '';let s='';for(let i=0;i<n;i++){const xx=x+w*(i+.5)/n;
      s+=`<path class="ad-heat" d="M${f1(xx)} ${f1(y)}c-6 -8 6 -14 0 -22c-6 -8 6 -14 0 -22" style="fill:none;stroke:var(--fat-hot);stroke-width:2.2;stroke-linecap:round;opacity:${f1(lvl)};animation-delay:${f1(-i*.37)}s"/>`}return s}
  function drawKind(){
    const N=vb(ks,'720 300','400 560'),K=AD_KINDS[ki],lvl={white:0,beige:cold?.85:.06,brown:cold?1:.15}[K.id];
    const L=N?{cx:104,cy:156,r:62,px:214,py:80,pw:170,ph:150,mx:24,my:250,mw:180,bx:20,by:312,bw:250,bh:46}
             :{cx:126,cy:166,r:72,px:250,py:62,pw:170,ph:176,mx:30,my:272,mw:200,bx:456,by:52,bw:180,bh:46};
    let s=`<text x="${N?16:20}" y="${N?22:24}" class="t-big">${K.n}${cold&&K.id!=='white'?' · ❄':''}</text>`;
    s+=heat(L.cx-L.r*.8,L.cy-L.r-6,L.r*1.6,4,lvl)+heat(L.px+10,L.py-4,L.pw-20,4,lvl);
    s+=adipocyte(L.cx,L.cy+8,L.r,{kind:K.id,size:.55,seed:K.id==='white'?0:5}).svg;
    s+=adiposeTissue(L.px,L.py,L.pw,L.ph,{kind:K.id,size:K.id==='white'?.55:.15,cell:K.id==='white'?30:26,vessel:1,seed:4,frame:true}).svg;
    /* UCP1 meter */
    s+=`<text x="${L.mx}" y="${L.my}" class="t-xs" style="fill:var(--ink)">${AD_TXT.ucp}</text><rect x="${L.mx}" y="${L.my+6}" width="${L.mw}" height="10" rx="3" style="fill:var(--panel-2)"/><rect x="${L.mx}" y="${L.my+6}" width="${f1(Math.max(2,L.mw*lvl))}" height="10" rx="3" style="fill:var(--fat-hot)"/>`;
    /* detection bars */
    s+=`<text x="${L.bx}" y="${L.by-14}" class="t-xs" style="fill:var(--ink);font-weight:700">${AD_TXT.bat}</text>`;
    AD_BAT.forEach((d,i)=>{const y=L.by+i*L.bh;s+=`<text x="${L.bx}" y="${y+4}" class="t-xs" style="fill:var(--ink)">${d.n}</text><rect x="${L.bx}" y="${y+10}" width="${L.bw}" height="12" rx="3" style="fill:var(--panel-2)"/><rect x="${L.bx}" y="${y+10}" width="${f1(Math.max(2,L.bw*d.v/100))}" height="12" rx="3" style="fill:var(--brownfat)"/><text x="${f1(L.bx+L.bw+6)}" y="${y+20}" class="t-xs" style="fill:var(--ink);font-weight:700">${d.v}%</text>`});
    ks.innerHTML=s;
    const nt=cold?K.cold:K.warm;kn.innerHTML=`<div class="kicker">${K.n}${cold?' · '+AD_TXT.cold:''}</div><h4>${nt.t}</h4><p>${nt.txt}</p>`;
  }
  kb.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
    if(b.id==='adCold'){cold=!cold;b.setAttribute('aria-pressed',cold)}else{ki=+b.dataset.kind;$$('[data-kind]',kb).forEach(x=>x.setAttribute('aria-pressed',x===b))}
    drawKind()});
  drawKind();
  const pk=redraws.adipose;redraws.adipose=()=>{pk&&pk();drawKind();drawTurn(+$('#adTurnT').value)};

  /* ---------- turnover of 100 fat cells ---------- */
  const ts=$('#adTurn'),trg=$('#adTurnT'),tb=$('#adTurnBtns'),tn=$('#adTurnNote');let loss=false;
  const LAM=-Math.log(.9),YMAX=20,rr=rng(2024);
  /* each cell's death (and replacement) times, drawn from about 10% renewal per year */
  const CELLS=[];for(let i=0;i<100;i++){const D=[];let y=0;while(y<YMAX+2){y+=-Math.log(1-rr()*.999)/LAM;D.push(y)}CELLS.push({D,ang:rr()*360})}
  tb.innerHTML=[['stable','Weight stable'],['loss','After weight loss']].map((x,i)=>`<button class="btn" data-w="${x[0]}" aria-pressed="${i===0}">${x[1]}</button>`).join('');
  function drawTurn(y){
    const N=vb(ts,'720 300','400 560');
    const L=N?{gx:90,gy:30,pc:22,cx:200,cy:282,ax:56,ay:396,aw:310,ah:126}:{gx:30,gy:40,pc:22,cx:262,cy:80,ax:430,ay:40,aw:260,ah:190};
    const shrink=loss?.55:1;let s='',renewed=0;
    CELLS.forEach((c,i)=>{const gen=c.D.filter(d=>d<=y).length,born=gen?c.D[gen-1]:-5,next=c.D[gen];
      if(gen)renewed++;
      const grow=gen?ramp(y-born,0,1.2):1,die=ramp(next-y,0,.35),x=L.gx+(i%10)*L.pc+L.pc/2,yy=L.gy+Math.floor(i/10)*L.pc+L.pc/2;
      s+=adipocyte(x,yy,9.2*shrink,{size:lerp(.05,.6,grow),ang:c.ang,op:lerp(.25,1,die)}).svg;
      if(gen)s+=`<rect x="${f1(x-L.pc/2+1)}" y="${f1(yy-L.pc/2+1)}" width="${L.pc-2}" height="${L.pc-2}" rx="4" style="fill:none;stroke:var(--brand);stroke-width:1.4"/>`});
    /* counters */
    const ca=N?'t-mid':'';
    s+=`<text x="${L.cx}" y="${L.cy}" class="t-sm ${ca}" style="fill:var(--ink)">fat cells</text><text x="${L.cx}" y="${L.cy+34}" class="t-big ${ca}" style="font-size:34px">100</text>`;
    s+=`<text x="${L.cx}" y="${L.cy+(N?56:66)}" class="t-sm ${ca}" style="fill:var(--ink)">year ${f1(y)}</text>`;
    s+=`<text x="${L.cx}" y="${L.cy+(N?74:90)}" class="t-sm ${ca}" style="fill:var(--brand);font-weight:700">${renewed} new (outlined)</text>`;
    if(!N)s+=`<text x="${L.cx}" y="${L.cy+112}" class="t-xs">${loss?'smaller cells, same number':'number holds steady'}</text>`;
    /* chart: share of original cells still present */
    const A=curveAxes(L.ax,L.ay,L.aw,L.ah,{x0:0,x1:YMAX,y0:0,y1:100,xt:[0,5,10,15,20],yt:[0,50,100],yfmt:v=>v+'%',xlabel:'years',ylabel:'original cells still present'});
    s+=A.svg;
    const M=[];for(let k=0;k<=40;k++){const yy=YMAX*k/40;M.push([yy,100*Math.pow(.9,yy)])}
    s+=plotLine(M,A.X,A.Y,{col:'var(--muted)',lw:1.6,dash:'4 4'}).svg+plotLine(M,A.X,A.Y,{col:'var(--brand)',upto:y,dot:true}).svg;
    s+=`<circle cx="${f1(A.X(y))}" cy="${f1(A.Y(100-renewed))}" r="4" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.6"/>`;
    s+=kitLabel(A.X(y)+8,A.Y(100-renewed)-8,(100-renewed)+' of 100',{});
    ts.innerHTML=s;
    tn.innerHTML=`<div class="kicker">Year ${f1(y)}</div><h4>${renewed} of 100 cells are new; the total is still 100</h4><p>${y<.5?'Each year roughly one cell in ten dies and is replaced, at all adult ages and body sizes. [[Spalding2008]]':'Fat cells die at about 10% a year and live about 10 years on average, so after a decade most of the original cells have been replaced. [[Arner2010]]'}</p>`+
      (loss?`<div class="pt"><b>%t:note.plain%</b>After weight loss the cells are smaller, but there are just as many of them: adipocyte number stayed constant even after marked weight loss. [[Spalding2008]]</div>`
           :`<div class="hook"><b>%t:note.hook%</b>Adipocyte number is set in childhood and adolescence and stays constant in adults; about 10% are renewed each year. [[Spalding2008]]</div>`);
  }
  tb.addEventListener('click',e=>{const b=e.target.closest('[data-w]');if(!b)return;loss=b.dataset.w==='loss';$$('[data-w]',tb).forEach(x=>x.setAttribute('aria-pressed',x===b));drawTurn(+trg.value)});
  playWire(trg,$('#adTurnPlay'),drawTurn,16000,'%t:player.replay%','adipose');
  drawTurn(+trg.value);
};
