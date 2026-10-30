/* =============== 1.4 infection to granuloma =============== */
const GR_IM=[
 {n:'Intact immunity',loose:0,c:'var(--good)',
  s:`Interferon-gamma and TNF hold the structure together. Mice lacking either still form granulomas, but cannot restrict bacillary growth and develop necrosis. [[Flynn1993,Flynn1995]]`},
 {n:'TNF blocked',loose:.62,c:'var(--bad)',
  s:`Neutralising TNF unmasks TB. Of 70 cases reported after infliximab (median 12 weeks of therapy), 48 occurred after three or fewer infusions and 40 were extrapulmonary, 17 of them disseminated. In macaques, TNF neutralisation before infection produced fulminant disseminated disease by 8 weeks, and in animals with contained infection it caused reactivation in the majority. [[Keane2001,Lin2010]]`},
 {n:'Low CD4 (HIV)',loose:.45,c:'var(--warn)',
  s:`HIV depletes exactly the cells TB control needs: <i>M. tuberculosis</i>-specific CD4 T cells were lost rapidly after HIV-1 infection while cytomegalovirus-specific cells persisted. TB risk rises unexpectedly early after HIV seroconversion, and HIV co-infection is associated with less cavitation. [[Geldmacher2010,Sonnenberg2005,Flynn2001]]`}];
const GR_STEPS=[
 {from:0,at:.04,k:'Day 0 · the air sac',t:'One to five bacilli land',
  txt:`TB begins with deposition of <i>M. tuberculosis</i> in aerosol droplets onto alveolar surfaces; what happens next is determined largely by the host immune response, with contributions from host genetics, insults to immunity, nutrition and strain-to-strain differences in virulence. Review of the pathogenesis literature plus a guinea-pig airborne model concluded that the infecting dose is very low, usually 1–5 bacilli, and that the first implant can occur anywhere in the lung. [[Smith2003,Balasubramanian1994]]`,
  pt:`It takes astonishingly few germs — often just one to five — to start an infection, and they have to reach the smallest air sacs to do it.`,
  hook:`Usual infecting dose 1–5 bacilli; first implant anywhere in the lung; cavitary disease characteristically apical. [[Balasubramanian1994]]`},
 {from:.16,at:.21,k:'Days 0–4 · inside the macrophage',t:'Swallowed, but not digested',
  txt:`Early productive infection in mice happens almost exclusively inside airway-resident alveolar macrophages. Classic electron microscopy showed that phagosomes holding intact, multiplying bacilli rarely fused with lysosomes, while phagosomes holding damaged bacilli did. The vacuole fails to acidify below pH 6.3–6.5 and acquires the lysosomal membrane protein LAMP-1 but <b>not</b> the proton-ATPase that would acidify it; the block is an active, lipid-mediated subversion of PI3-phosphate-dependent trafficking rather than a passive failure. Infected — but not uninfected — alveolar macrophages then relocate to the lung interstitium, a step that requires an intact ESX-1 secretion system. [[Cohen2018,Armstrong1971,SturgillKoszycki1994,Vergne2005]]`,
  pt:`The cell that is supposed to destroy the germ swallows it, but the digestion never finishes. The germ lives and multiplies inside the very cell sent to kill it.`,
  hook:`Mycobacterial phagosomes stall at pH 6.3–6.5, acquire LAMP-1 and exclude the vesicular proton-ATPase. [[SturgillKoszycki1994]]`},
 {from:.34,at:.39,k:'Day ~10 · the lymph node',t:'A ten-day head start',
  txt:`Dissemination precedes immunity. In mice, bacteria reach the pulmonary lymph nodes 9–11 days after aerosol inoculation, specific T cells appear there 2–3 days later, and spread to spleen and liver occurs 11–14 days after infection — always before specific T cells arrive in that organ. Initial CD4 activation happens in the lung-draining mediastinal node and depends on bacteria producing antigen in the node itself, despite 100-fold more bacteria in the lungs. With ESAT-6-specific transgenic CD4 cells, priming began only after 10 days of infection; a larger inoculum advanced it by two days. Proposed reasons for the delay include inhibition of apoptosis, slow dendritic-cell migration and regulatory T cells. [[Chackerian2002,Wolf2008,Reiley2008,Urdahl2011]]`,
  pt:`The body needs a few weeks to learn to recognise the germ. That gap is why a skin test or blood test done straight after exposure can still be negative, and why contacts are re-tested later.`,
  hook:`Priming starts in the mediastinal node, only after about 10 days in mice — the biological reason for the window before tuberculin or IGRA conversion. [[Reiley2008,Wolf2008]]`},
 {from:.52,at:.57,k:'Weeks 2–6 · T cells answer',t:'Interferon-gamma and TNF arrive',
  txt:`CD4 and CD8 T cells, interferon-gamma, IL-12, TNF and IL-6, and macrophages are the core of the protective response. Mice with a disrupted interferon-gamma gene still form granulomas but make no reactive nitrogen intermediates, cannot restrict bacillary growth, show heightened tissue necrosis and die rapidly; exogenous interferon-gamma delayed but did not prevent that course. TNF is equally required: neutralising it, or deleting the 55 kDa receptor, abolished protection, and granulomas formed in equal numbers in control and TNF-deficient mice — but necrosis occurred only in the TNF-deficient animals. [[Flynn2001,Flynn1993,Cooper1993,Flynn1995]]`,
  pt:`Immune cells arrive and send chemical signals that switch the swallowing cells into a more aggressive state. The signals matter more than the wall itself.`,
  hook:`Interferon-gamma and TNF are each essential in mice; granulomas still form without them, but necrosis and uncontrolled growth follow. [[Flynn1993,Flynn1995]]`},
 {from:.68,at:.74,k:'Weeks to months · the granuloma',t:'The tubercle organises',
  txt:`Macrophages flatten into an epithelioid ring, some fuse into multinucleated Langhans giant cells, a cuff of lymphocytes gathers at the edge, a fibrous capsule forms and the centre turns to caseous necrosis. A lipid-laden "foamy" population appears: in a human in-vitro model, oxygenated mycolic acids drove monocyte-derived macrophages to become foamy, and inside them mycobacteria stopped replicating and switched to a dormant state. The centre is severely hypoxic — direct measurement in living infected rabbits found even 3 mm lesions at 1.6 ± 0.7 mm Hg — which is why metronidazole, active only at low oxygen, works in that model. [[Pagan2018,Peyron2008,Russell2009,Via2008]]`,
  pt:`The body builds a tight ball of cells around the germs. Inside there is almost no oxygen and the centre can turn into soft, cheese-like material that both the immune system and medicines struggle to reach.`,
  hook:`Granuloma anatomy: caseous centre → epithelioid macrophages and Langhans giant cells → lymphocyte cuff → fibrous capsule. Rabbit lesions measured 1.6 ± 0.7 mm Hg. [[Via2008]]`},
 {from:.86,at:.94,k:'Months to years · two endings',t:'Contained, or broken open',
  txt:`Most granulomas hold. Pre-antibiotic autopsy series found 96–98% of visible calcified tuberculous lung lesions in people who died of other causes to be sterile, and in macaques some lesions are sterilised by the host even while others progress in the same animal. Where containment fails, the caseous centre liquefies and empties into an airway. In lungs removed for incurable TB, numerous bacilli were found only at the surface of cavities — granulomas with a patent connection to an airway — and additional drug resistance was acquired preferentially there; CD4 and CD8 T cells were selectively absent from the cavity's luminal surface. Matrix metalloproteinase-1 drives that tissue destruction. Cavitation is associated with poor outcomes, relapse, higher transmission and the development of drug resistance. [[Behr2018,Lin2014,Kaplan2003,Elkington2011,Urbanowski2020]]`,
  pt:`If the ball of cells holds, the lesion can shrink, scar and turn chalky, and most people never know. If it breaks into an airway it leaves a hole full of germs — and that is what makes TB contagious.`,
  hook:`Neutrophils, not macrophages, dominate the airways in active TB: 86.6% ± 2.2% of sputum cells, with 67.6% ± 5.6% of intracellular bacilli inside them. Bacilli in cavities are the shortest (1.9 µm), consistent with rapid replication just before transmission. [[Eum2010]]`}];
const GR_PARTS=[
 {id:'cas',n:'Caseous centre',s:'soft, cheese-like necrosis',
  t:'Caseous necrosis, and almost no oxygen',
  txt:`The centre of an established granuloma dies and turns into a soft, cheese-like mass. Pimonidazole imaging in guinea pigs, rabbits and non-human primates showed discrete hypoxia around necrotic and caseous regions, and direct fibre-optic measurement in living infected rabbits found even small 3 mm lesions severely hypoxic at 1.6 ± 0.7 mm Hg. Metronidazole, which is active in vitro only at low oxygen, markedly reduced lung bacterial burden in rabbits. [[Via2008]]`,
  pt:`The middle of the lump has almost no oxygen and no blood supply, which is exactly where medicines struggle to reach.`,
  hook:`Only the rifamycins fully sterilised caseum ex vivo; moxifloxacin penetrates it poorly, matching its failure to shorten treatment in trials. [[Sarathy2018,Prideaux2015]]`},
 {id:'epi',n:'Epithelioid macrophages',s:'flattened, interlocking cells',
  t:'Macrophages that change shape',
  txt:`Granulomas are organised aggregates of macrophages, often with characteristic morphological changes, plus other immune cells, forming in response to persistent stimuli that a single macrophage cannot eradicate. They unfold as a stepwise programme of macrophage activations and transformations that recruit further cells and change the structure. The lung holds two distinct macrophage lineages — embryonically derived alveolar and recruited monocyte-derived interstitial — and the two respond divergently inside the same granuloma. [[Pagan2018,Flynn2011]]`,
  pt:`The swallowing cells flatten out and interlock like paving stones, forming the wall of the ball.`,
  hook:`Granuloma formation and maintenance depend on macrophage–T cell cross-talk. [[Flynn2011]]`},
 {id:'giant',n:'Langhans giant cells',s:'fused cells, nuclei in a horseshoe',
  t:'Several macrophages fused into one',
  txt:`Multinucleated giant cells are one of the characteristic morphological changes of granulomatous inflammation, in which macrophages fuse rather than remaining separate cells. Granuloma development, degeneration and necrosis is the hallmark of <i>M. tuberculosis</i> infection, and formation is facilitated by the emerging acquired response, with cytokines and chemokines controlling integrity. [[Pagan2018,Orme2014]]`,
  pt:`Some of the cells merge into one very large cell with its nuclei pushed around the edge — a classic sight under the microscope.`,
  hook:`Multinucleated giant cells with peripheral nuclei in a horseshoe are the named Langhans type seen in tuberculous granulomas. [[Pagan2018]]`},
 {id:'lymph',n:'Lymphocyte cuff',s:'T cells around the rim',
  t:'The ring of T cells',
  txt:`T cells gather at the margin of the granuloma, and the local response is far smaller than the blood suggests: on average only about 8% of granuloma T cells produce cytokine after stimulation with <i>M. tuberculosis</i> antigens. Sterile granulomas had modestly higher frequencies of T cells making IL-17, TNF and type-1 cytokines; bacterial burden correlated inversely with TNF and those responses; and blood responses did not reflect granuloma responses. [[Gideon2015]]`,
  pt:`A ring of immune cells surrounds the lump. A blood test cannot tell you what that ring is doing.`,
  hook:`About 8% of granuloma T cells are cytokine-positive; blood responses do not mirror granuloma responses. [[Gideon2015]]`},
 {id:'fib',n:'Fibrous capsule',s:'the scar that walls it off',
  t:'Walling the lesion off',
  txt:`A fibrous rim closes the structure. Human granulomas are spatially organised rather than uniform: laser-capture microdissection with mass spectrometry and confocal microscopy across six people with TB found a pro-inflammatory centre — antimicrobial peptides, reactive oxygen species, pro-inflammatory eicosanoids — and a comparatively anti-inflammatory rim around the caseum. Pre-antibiotic autopsy series found 96–98% of visible calcified lung lesions in people who died of other causes to be sterile. [[Marakalala2016,Behr2018]]`,
  pt:`Scar tissue closes around the lump. Over years it can turn chalky with calcium, and most such old lesions hold no living germs at all.`,
  hook:`96–98% of calcified tuberculous lung lesions in pre-antibiotic autopsy series were sterile. [[Behr2018]]`},
 {id:'foam',n:'Foamy macrophages',s:'lipid-laden, and useful to the bacillus',
  t:'Lipid droplets, and a dormant bacillus',
  txt:`Foamy macrophages are a granuloma-specific lipid-laden population, and a key participant both in sustaining persistent bacteria and in the tissue pathology that leads to cavitation and release of infectious bacilli. In a human in-vitro granuloma model, oxygenated mycolic acids from <i>M. tuberculosis</i> triggered monocyte-derived macrophages to become foamy; inside them the mycobacteria stopped replicating, switched to a dormant non-replicative state, and the bacterium-containing phagosomes migrated to and were engulfed by host lipid bodies. [[Russell2009,Peyron2008]]`,
  pt:`Some cells fill up with fat droplets, and the germs move in and go quiet — fed and sheltered at the same time.`,
  hook:`Foamy macrophages sustain persistent bacteria and contribute to the pathology that produces cavities. [[Russell2009]]`}];
inits.granuloma=()=>{
  const svg=$('#grSvg'),rg=$('#grT');let grIm=0;
  const INK='stroke:var(--ink);stroke-width:1.6;fill:none';
  function grDend(x,y,r,op){let s=`<g style="opacity:${op==null?1:op}">`;
    for(let i=0;i<9;i++){const a=i/9*Math.PI*2;s+=`<line x1="${f1(x+Math.cos(a)*r*.7)}" y1="${f1(y+Math.sin(a)*r*.7)}" x2="${f1(x+Math.cos(a)*r*1.5)}" y2="${f1(y+Math.sin(a)*r*1.5)}" style="stroke:var(--mac-line);stroke-width:1.3"/>`}
    s+=`<path d="${blob(x,y,r,13,1,1,12,.2)}" style="fill:var(--mac);fill-opacity:.85;stroke:var(--mac-line);stroke-width:1.2"/>`;
    s+=`<ellipse cx="${f1(x-r*.2)}" cy="${f1(y)}" rx="${f1(r*.3)}" ry="${f1(r*.24)}" style="fill:var(--nuc);opacity:.75"/>`;
    return s+'</g>'}
  function grTag(x,y,txt,col,op,anchor){
    return `<text x="${f1(x)}" y="${f1(y)}" class="t-xs${anchor?' '+anchor:''}" style="fill:${col};opacity:${op==null?1:f1(op)}">${txt}</text>`}
  /* ---- scene 1: the air sac ---- */
  function grAlv(L,a){
    const A=alveolus(L.cx,L.cy,L.sc*104);let s=A.svg;
    const [sx,sy,sr]=A.sacs[0],dy=lerp(L.y0-10,sy,ease(clamp(a*1.6)));
    if(a<.62)s+=droplet(sx,dy,9,{bac:true});
    else{const n=Math.min(5,1+Math.floor((a-.62)*12));
      for(let i=0;i<n;i++){const q=rng(i*9+4);s+=bacillus(sx+(q()-.5)*sr*.9,sy+(q()-.5)*sr*.9,7,q()*180)}
      s+=grTag(sx,sy-sr-8,n+' bacilli','var(--tb)',1,'t-mid')}
    s+=grTag(L.cx,L.y0+34,'an alveolus: five air sacs and a capillary','var(--muted)',1,'t-mid');
    s+=grTag(L.cx,L.y1-10,a<.62?'a droplet nucleus settles into a sac':'the usual infecting dose is 1–5 bacilli','var(--ink)',1,'t-mid');
    return s}
  /* ---- scene 2: the macrophage ---- */
  function grMac(L,a){
    const out=ramp(a,.66,1),mx=L.x0+L.sc*136,cy=L.cy+out*L.sc*50;let s='';
    s+=`<circle cx="${f1(mx)}" cy="${f1(L.cy-L.sc*12)}" r="${f1(L.sc*86)}" style="fill:var(--field);stroke:var(--lung-line);stroke-width:1.8"/>`;
    s+=grTag(mx,L.cy-L.sc*104,'one air sac','var(--muted)',1,'t-mid');
    s+=`<rect x="${L.x0+8}" y="${f1(L.cy+L.sc*84)}" width="${f1(L.x1-L.x0-16)}" height="${f1(L.y1-14-(L.cy+L.sc*84))}" rx="10" style="fill:var(--lung);fill-opacity:.35;stroke:var(--lung-line);stroke-dasharray:4 3"/>`;
    s+=grTag(L.x0+18,L.cy+L.sc*100,'lung interstitium','var(--lung-line)');
    const n=1+Math.floor(clamp(a*1.7)*7);
    s+=macrophage(mx,cy,L.sc*44,{bac:n,seed:5});
    s+=`<circle cx="${f1(mx+L.sc*7)}" cy="${f1(cy)}" r="${f1(L.sc*25)}" style="fill:none;stroke:var(--mac-line);stroke-width:1.4;stroke-dasharray:3 2"/>`;
    s+=grTag(mx+L.sc*7,cy-L.sc*29,'phagosome','var(--mac-line)',1,'t-mid');
    const gx=L.gx,gy0=L.gy0,gy1=L.gy1,pH=lerp(7.4,6.4,ease(clamp(a*1.5))),Y=p=>lerp(gy0,gy1,(7.4-p)/(7.4-4.3));
    s+=`<rect x="${gx}" y="${gy0}" width="14" height="${f1(gy1-gy0)}" rx="7" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    s+=`<rect x="${gx}" y="${gy0}" width="14" height="${f1(Y(pH)-gy0)}" rx="7" style="fill:var(--accent);opacity:.5"/>`;
    [7.4,6.4,5,4.3].forEach(p=>s+=`<line x1="${gx-4}" x2="${gx+18}" y1="${f1(Y(p))}" y2="${f1(Y(p))}" style="stroke:var(--muted);stroke-width:${p===6.4?1.6:.8}"/>`+grTag(gx+22,Y(p)+4,'pH '+p.toFixed(1),p===6.4?'var(--tb)':'var(--muted)'));
    s+=`<path d="M${gx-10} ${f1(Y(pH))}l8 -4v8Z" style="fill:var(--ink)"/>`;
    s+=grTag(gx-4,gy0-10,'phagosome pH','var(--muted)');
    ['stalls here:','no proton-ATPase,','LAMP-1 present'].forEach((t2,k)=>s+=grTag(gx+22,Y(6.4)+18+k*13,t2,'var(--tb)'));
    s+=grTag(gx+22,Y(4.3)+18,'a normal phagolysosome','var(--muted)');
    s+=grTag((L.x0+L.x1)/2,L.y1-22,out>.5?'the infected macrophage moves into the interstitium (needs ESX-1)':'bacilli multiply inside the cell: '+n,'var(--ink)',1,'t-mid');
    return s}
  /* ---- scene 3: priming in the node ---- */
  function grNode(L,a){
    const lx=L.x0+L.sc*56,ly=L.cy+L.sc*22,nx=L.x1-L.sc*104,ny=L.cy-L.sc*44,day=Math.round(lerp(0,12,a));let s='';
    s+=`<path d="M${f1(lx)} ${f1(ly)}Q${f1((lx+nx)/2)} ${f1(ly-L.sc*72)} ${f1(nx)} ${f1(ny)}" style="fill:none;stroke:var(--accent);stroke-width:7;opacity:.25"/>`;
    s+=grTag((lx+nx)/2,ly-L.sc*46,'lymphatic','var(--accent)',1,'t-mid');
    s+=macrophage(lx,ly,L.sc*24,{bac:3,seed:5});
    s+=grTag(lx,ly+L.sc*38,'the lung focus','var(--muted)',1,'t-mid');
    s+=`<path d="${blob(nx,ny,L.sc*42,7,1.15,.85,14,.14)}" style="fill:var(--accent-soft);stroke:var(--accent);stroke-width:1.6"/>`;
    s+=grTag(L.x1-10,ny-L.sc*54,'draining (mediastinal)','var(--accent)',1,'t-end');
    s+=grTag(L.x1-10,ny-L.sc*54+13,'lymph node','var(--accent)',1,'t-end');
    const p=ease(clamp(a*1.25)),dx=lerp(lx,nx,p),dyy=lerp(ly,ny,p)-Math.sin(Math.PI*p)*L.sc*42;
    s+=grDend(dx,dyy,L.sc*12,1);
    s+=grTag(clamp(dx,L.x0+90,L.x1-90),dyy-L.sc*22,'dendritic cell with antigen','var(--mac-line)',1,'t-mid');
    const prime=ramp(a,.72,1);
    for(let i=0;i<7;i++){const an=i/7*Math.PI*2;s+=tcell(nx+Math.cos(an)*L.sc*24,ny+Math.sin(an)*L.sc*17,L.sc*7,{op:f1(prime),act:prime>.6})}
    s+=`<rect x="${L.x0+10}" y="${L.y1-52}" width="${f1(L.x1-L.x0-20)}" height="20" rx="10" style="fill:var(--panel-2)"/>`;
    s+=`<rect x="${L.x0+10}" y="${L.y1-52}" width="${f1((L.x1-L.x0-20)*clamp(day/12))}" height="20" rx="10" style="fill:var(--accent);opacity:.35"/>`;
    s+=grTag((L.x0+L.x1)/2,L.y1-38,'day '+day+' after infection (mouse aerosol model)','var(--ink)',1,'t-mid');
    s+=grTag((L.x0+L.x1)/2,L.y1-18,prime>.6?'T cells primed → a skin test or IGRA can now turn positive':'no primed T cells yet → a skin test or IGRA can still be negative',prime>.6?'var(--good)':'var(--warn)',1,'t-mid');
    return s}
  /* ---- scene 4: the T-cell answer ---- */
  function grTh1(L,a){
    const lx=L.cx-L.sc*40,ly=L.cy,nx=L.x1-L.sc*58;let s='';
    s+=`<path d="${blob(nx,L.cy-L.sc*54,L.sc*34,7,1.15,.85,14,.14)}" style="fill:var(--accent-soft);stroke:var(--accent);stroke-width:1.4"/>`;
    s+=grTag(nx,L.cy-L.sc*96,'lymph node','var(--accent)',1,'t-mid');
    for(let i=0;i<5;i++){const an=i/5*Math.PI*2;s+=tcell(nx+Math.cos(an)*L.sc*20,L.cy-L.sc*54+Math.sin(an)*L.sc*15,L.sc*6,{act:true})}
    const act=ease(clamp(a*1.2));
    for(let i=0;i<4;i++){const p=clamp(act*1.3-i*.12),tx=lerp(nx-L.sc*30,lx+L.sc*30,p),ty=lerp(L.cy-L.sc*46,ly-L.sc*10+i*L.sc*16,p);
      if(p>0)s+=tcell(tx,ty,L.sc*8,{act:true,op:f1(clamp(p*2))})}
    for(let i=0;i<6;i++){const an=i/6*Math.PI*2,d=L.sc*(34+28*act);
      s+=macrophage(lx+Math.cos(an)*d,ly+Math.sin(an)*d*.78,L.sc*17,{kind:act>.55?'epithelioid':'resting',seed:i+2,bac:act>.55?0:1})}
    s+=clump(lx,ly,4,L.sc*12,{len:L.sc*7,seed:4});
    s+=grTag(lx,ly-L.sc*78,act>.55?'macrophages activated: epithelioid':'macrophages, not yet activated','var(--mac-line)',1,'t-mid');
    [['IFN-γ',-1],['TNF',1]].forEach(([n,k],i)=>{const op=f1(ramp(a,.3+i*.15,.6+i*.15));
      s+=`<rect x="${f1(L.cx+L.sc*16)}" y="${f1(L.cy+k*L.sc*34-11)}" width="58" height="22" rx="11" style="fill:var(--tcell);opacity:${op*.25}"/>`;
      s+=grTag(L.cx+L.sc*16+29,L.cy+k*L.sc*34+4,n,'var(--tcell)',op,'t-mid')});
    s+=grTag((L.x0+L.x1)/2,L.y1-8,'without interferon-gamma or TNF, granulomas still form — but necrosis and uncontrolled growth follow','var(--ink)',1,'t-mid');
    return s}
  /* ---- scene 5: the granuloma organises ---- */
  function grGran(L,a){
    const st=lerp(.08,.86,ease(a)),lo=GR_IM[grIm].loose*ramp(a,.25,.7),r=L.sc*96;let s='';
    s+=granuloma(L.cx,L.cy,r,st,{loose:lo,seed:21});
    const LB=[[.2,'macrophages gather',-1,-1.12],[.38,'epithelioid ring, giant cells',1,-.85],[.5,'lymphocyte cuff',-1,.5],[.62,'caseous centre',1,.2],[.78,'fibrous capsule',1,.95]];
    LB.forEach(([k,n,ux,uy])=>{if(st<k)return;const op=f1(ramp(st,k,k+.06));
      const px=ux>0?L.x1-12:L.x0+12,py=L.cy+uy*r*.98;
      s+=`<line x1="${f1(L.cx+ux*r*.72)}" y1="${f1(L.cy+uy*r*.7)}" x2="${f1(px+(ux>0?-4:4))}" y2="${f1(py)}" style="stroke:var(--muted);stroke-width:.9;opacity:${op*.7}"/>`;
      s+=grTag(px,py+3,n,'var(--ink)',op,ux>0?'t-end':'')});
    if(st>.6)s+=grTag(L.cx,L.cy+4,'1.6 mm Hg','var(--ink)',f1(ramp(st,.6,.7)),'t-mid');
    if(lo>.1){s+=`<rect x="${f1(L.cx-96)}" y="${f1(L.y1-30)}" width="192" height="22" rx="11" style="fill:${GR_IM[grIm].c};opacity:.18"/>`;
      s+=grTag(L.cx,L.y1-15,GR_IM[grIm].n+': the structure loosens',GR_IM[grIm].c,1,'t-mid')}
    else s+=grTag(L.cx,L.y1-15,'an organised granuloma: container and niche at once','var(--ink)',1,'t-mid');
    return s}
  /* ---- scene 6: two endings ---- */
  function grEnd(L,a){
    const r=L.sc*56,ax=L.cx-L.sc*106,bx=L.cx+L.sc*106,cy=L.cy-L.sc*2,lo=GR_IM[grIm].loose;let s='';
    s+=granuloma(ax,cy,r,.9,{calc:ease(clamp(a*1.4)),loose:lo*.4,seed:21,bac:0});
    s+=granuloma(bx,cy,r,lerp(.86,1,ease(clamp(a*1.3))),{loose:lo,seed:33});
    s+=grTag(ax,cy-r-30,'CONTAINED','var(--good)',1,'t-mid');
    s+=grTag(ax,cy-r-16,'scarred, then calcified','var(--muted)',1,'t-mid');
    s+=grTag(bx,cy-r-30,'CAVITY','var(--bad)',1,'t-mid');
    s+=grTag(bx,cy-r-16,'opens into an airway','var(--muted)',1,'t-mid');
    ['96–98% of calcified','lesions were sterile','at autopsy'].forEach((t2,k)=>s+=grTag(ax,cy+r+20+k*13,t2,'var(--ink)',1,'t-mid'));
    ['bacilli only at the','cavity surface; T cells','are absent there'].forEach((t2,k)=>s+=grTag(bx,cy+r+20+k*13,t2,'var(--ink)',1,'t-mid'));
    const V=[['Both endings occur in the same person, lesion by lesion.','var(--good)'],
             ['TNF blocked: TB often appears early; 40 of 70 reported cases were extrapulmonary.','var(--bad)'],
             ['Low CD4: TB risk rises early after HIV infection, with less cavitation.','var(--warn)']][grIm];
    s+=`<rect x="${L.x0+10}" y="${L.y1-34}" width="${f1(L.x1-L.x0-20)}" height="24" rx="12" style="fill:${V[1]};opacity:.16"/>`;
    s+=grTag((L.x0+L.x1)/2,L.y1-18,V[0],V[1],1,'t-mid');
    return s}
  /* ---- the lung inset ---- */
  function grLung(L,p){
    const les=[{side:'R',u:.45,v:.52,r:6,kind:'nodule'}];
    if(p>=2)les.push({side:'R',u:.08,v:.3,r:7,kind:'node'});
    if(p>=4)les.push({side:'R',u:.45,v:.52,r:8,kind:'infiltrate'});
    if(p>=5)les.push({side:'R',u:.42,v:.12,r:8,kind:'cavity'});
    let s=lung(L.lx,L.ly,L.ls,{lesions:les}).svg;
    const KEY=[['first focus in the lung','var(--caseum)',0],['draining hilar node','var(--caseum)',2],['apical cavity','var(--tb)',5]];
    let k=0;KEY.forEach(([n,c,from])=>{if(p<from)return;const y=L.ly+L.ls*206+k*14;k++;
      s+=`<circle cx="${f1(L.lx+6)}" cy="${f1(y-4)}" r="4" style="fill:${c};stroke:var(--mac-line);stroke-width:.8"/>`;
      s+=grTag(L.lx+16,y,n,'var(--muted)')});
    s+=grTag(L.lx,L.ly-8,'THE SAME EVENTS, SEEN FROM OUTSIDE','var(--muted)');
    return s}
  function draw(t){
    const N=vb(svg,'720 380','400 560');
    const L=N?{sc:.74,x0:10,y0:208,x1:390,y1:552,cx:200,cy:382,gx:286,gy0:250,gy1:366,lx:112,ly:28,ls:.56}
            :{sc:1,x0:20,y0:28,x1:470,y1:352,cx:238,cy:178,gx:316,gy0:70,gy1:236,lx:506,ly:44,ls:.76};
    const p=phaseOf(GR_STEPS,t);
    let s=grLung(L,p);
    s+=`<rect x="${L.x0}" y="${L.y0}" width="${f1(L.x1-L.x0)}" height="${f1(L.y1-L.y0)}" rx="14" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=grTag(L.x0+12,L.y0+18,GR_STEPS[p].k.toUpperCase(),'var(--tb)');
    if(p===0)s+=grAlv(L,ramp(t,0,.15));
    else if(p===1)s+=grMac(L,ramp(t,.17,.33));
    else if(p===2)s+=grNode(L,ramp(t,.35,.51));
    else if(p===3)s+=grTh1(L,ramp(t,.53,.67));
    else if(p===4)s+=grGran(L,ramp(t,.69,.85));
    else s+=grEnd(L,ramp(t,.87,1));
    svg.innerHTML=s;
    setSt(p);
    $('#grRead').innerHTML=`<span>step <b>${p+1} of 6</b></span><span>when <b>${GR_STEPS[p].k.split(' · ')[0]}</b></span><span>immune state <b>${GR_IM[grIm].n}</b></span>`;
    $('#grNote').innerHTML=noteHTML(GR_STEPS[p])+`<div class="kv"><div><dt>${GR_IM[grIm].n}</dt><dd>${GR_IM[grIm].s}</dd></div></div>`;
  }
  const stop=playWire(rg,$('#grPlay'),draw,34000,'%t:player.replay%','granuloma');
  const setSt=stepWire($('#grSteps'),GR_STEPS,rg,draw,stop);
  $$('[data-gi]').forEach(b=>b.addEventListener('click',()=>{grIm=+b.dataset.gi;
    $$('[data-gi]').forEach(x=>x.setAttribute('aria-pressed',x===b));
    if(+rg.value<.68){stop();rg.value=.78}
    draw(+rg.value)}));
  draw(+rg.value);

  /* ---- pick a part ---- */
  const ps=$('#grPartSvg');let grSel=0;
  $('#grParts').innerHTML=GR_PARTS.map((P,i)=>`<button data-gp="${i}" aria-pressed="${i===0}"><b>${P.n}</b><small>${P.s}</small></button>`).join('');
  function drawP(){
    const N=vb(ps,'520 330','400 330'),P=GR_PARTS[grSel];
    const cx=N?190:214,cy=168,r=N?124:136;let s='';
    s+=granuloma(cx,cy,r,.82,{seed:21,bac:4});
    s+=grTag(N?14:20,26,P.n.toUpperCase(),'var(--tb)');
    if(P.id==='cas')s+=`<circle cx="${cx}" cy="${cy}" r="${f1(r*.4)}" style="fill:none;stroke:var(--tb);stroke-width:2.6"/>`;
    if(P.id==='epi')s+=`<circle cx="${cx}" cy="${cy}" r="${f1(r*.6)}" style="fill:none;stroke:var(--tb);stroke-width:2.6;stroke-dasharray:7 5"/>`;
    if(P.id==='giant')[[-.8,-.25],[.7,.45]].forEach(([u2,v])=>s+=`<circle cx="${f1(cx+u2*r*.42)}" cy="${f1(cy+v*r*.42)}" r="${f1(r*.2)}" style="fill:none;stroke:var(--tb);stroke-width:2.6"/>`);
    if(P.id==='lymph')s+=`<circle cx="${cx}" cy="${cy}" r="${f1(r*.88)}" style="fill:none;stroke:var(--tb);stroke-width:2.6;stroke-dasharray:4 4"/>`;
    if(P.id==='fib')s+=`<circle cx="${cx}" cy="${cy}" r="${f1(r)}" style="fill:none;stroke:var(--tb);stroke-width:3"/>`;
    if(P.id==='foam')[[.1,-.62],[-.5,.5]].forEach(([u2,v],i)=>{s+=macrophage(cx+u2*r,cy+v*r,r*.14,{kind:'foamy',seed:40+i});
        s+=`<circle cx="${f1(cx+u2*r)}" cy="${f1(cy+v*r)}" r="${f1(r*.2)}" style="fill:none;stroke:var(--tb);stroke-width:2.4"/>`});
    s+=grTag(cx,cy+r+26,'a granuloma in section · '+P.s,'var(--muted)',1,'t-mid');
    ps.innerHTML=s;
    $('#grPartNote').innerHTML=noteHTML({k:P.n,t:P.t,txt:P.txt,pt:P.pt,hook:P.hook});
  }
  $('#grParts').addEventListener('click',e=>{const b=e.target.closest('[data-gp]');if(!b)return;
    grSel=+b.dataset.gp;$$('[data-gp]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawP()});
  drawP();
  const prevR=redraws.granuloma;redraws.granuloma=()=>{prevR&&prevR();drawP()};
};
