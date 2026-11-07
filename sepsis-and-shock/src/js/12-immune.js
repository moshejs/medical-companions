/* ===== 1.2 Infection to dysregulated host response ===== */
/* (1) the cascade in tissue + a schematic two-curve timeline (current concurrent model or classic SIRS-then-CARS);
   (2) evidence of immune exhaustion (Drewry, Monneret, Boomer); (3) the failed anti-inflammatory trials. */
const IM_T=(x,y,txt,c='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${txt}</text>`;
const IM_TH=(x,y,txt,c='t-xs t-mid',col='var(--ink)')=>IM_T(x,y,txt,c,`fill:${col};font-weight:700;paint-order:stroke;stroke:var(--panel);stroke-width:3px;stroke-linejoin:round`);
const IM_PH=[
 {from:0,at:.07,k:'Phase 1 · invasion',t:'Germs multiply and shed fragments',
  txt:`Bacteria grow in the tissue and shed pieces of themselves. Gram-negative bacteria carry lipopolysaccharide (LPS, endotoxin) in their outer membrane; Gram-positive bacteria carry lipoteichoic acid and peptidoglycan. These are PAMPs, pathogen-associated molecular patterns. [[Poltorak1998,Schwandner1999,Hotchkiss2016NRDP]] Injured host cells release their own alarm molecules, DAMPs, such as mitochondrial DNA, histones and HMGB1. [[Zhang2010mtDAMPs,Xu2009Histones,Wang1999HMGB1]]`,
  pt:`Germs growing in the body shed tiny pieces of themselves. Damaged body cells also leak "danger" signals.`,
  hook:`PAMPs come from microbes; DAMPs from injured host cells. Both trigger the same sensors. [[Hotchkiss2016NRDP]]`},
 {from:.16,at:.24,k:'Phase 2 · recognition',t:'Sensors raise the alarm',
  txt:`A macrophage's toll-like receptors bind the fragments: TLR4 senses LPS, TLR2 senses Gram-positive lipoteichoic acid and peptidoglycan. [[Poltorak1998,Schwandner1999]] The signal runs through MAP kinases, JAK and STAT and moves NF-κB into the nucleus, which switches on "early activation genes" including TNF, IL-1, IL-12, IL-18 and type I interferons. [[Hotchkiss2016NRDP]] Inside the cell, the NLRP3 inflammasome uses caspase-1 to mature IL-1β and IL-18. [[Neumann2026NLRP3]]`,
  pt:`Immune cells carry sensors that spot pieces of germs, like a smoke alarm spotting smoke. Once they spot them, they send out chemical messages.`,
  hook:`LPS → TLR4; lipoteichoic acid/peptidoglycan → TLR2; both → NF-κB. [[Poltorak1998,Schwandner1999]]`},
 {from:.32,at:.4,k:'Phase 3 · cytokines',t:'Cytokines and complement spread',
  txt:`TNF, IL-1 and IL-6 pour out. In healthy volunteers given endotoxin, TNF peaked 90 to 180 minutes later as "a brief pulse". [[Michie1988]] Complement activates as soon as PAMPs and DAMPs appear; C5a is a potent chemoattractant that calls neutrophils, monocytes and macrophages in. [[Hotchkiss2016NRDP]] Blocking TNF 2 hours before lethal <i>E. coli</i> fully protected baboons, but 1 hour before did not prevent organ failure. [[Tracey1987]]`,
  pt:`The chemical messages, called cytokines, call more immune cells in and cause fever.`,
  hook:`TNF after endotoxin: peak at 90–180 min, then falls. [[Michie1988]]`},
 {from:.48,at:.56,k:'Phase 4 · neutrophils',t:'Neutrophils throw out traps',
  txt:`Neutrophils roll along the vessel wall, squeeze into the tissue and release neutrophil extracellular traps (NETs): fibres of chromatin and granule proteins that bind and kill bacteria. [[Brinkmann2004]] Platelet TLR4 makes platelets bind neutrophils and trigger NETs, which catch bacteria in liver sinusoids and lung capillaries. [[Clark2007NETs]] NETs and tissue factor on monocytes also start clotting: "thromboinflammation". Microclots appear. [[Iba2023DIC]]`,
  pt:`White blood cells rush in and throw out sticky nets to catch germs. The nets also make blood clot in tiny vessels.`,
  hook:`NETs = chromatin + granule proteins; they kill bacteria and promote immunothrombosis. [[Brinkmann2004,Iba2023DIC]]`},
 {from:.64,at:.72,k:'Phase 5 · dysregulated',t:'The response spreads and harms',
  txt:`The response is no longer local. Sepsis is "life-threatening organ dysfunction caused by a dysregulated host response to infection". [[Singer2016Sepsis3]] Pro- and anti-inflammatory mediators rise together: in pneumonia, the highest risk of death came with both IL-6 and IL-10 high (hazard ratio 20.5), and in mouse sepsis both rose at the same time in animals that died early. [[Kellum2007GenIMS,Osuchowski2006]] Too much C5a can paralyse phagocytes. [[Ward2004C5a]] Vessels leak. [[Hotchkiss2016NRDP]]`,
  pt:`The alarm rings far too loud and spreads through the whole body. The body's own defences start to hurt its blood vessels and organs.`,
  hook:`Worst cytokine pattern in pneumonia sepsis: high IL-6 and high IL-10 (HR 20.5). [[Kellum2007GenIMS]]`},
 {from:.8,at:.9,k:'Phase 6 · exhaustion',t:'The immune system wears out',
  txt:`Many patients enter immunosuppression ("immunoparalysis"). [[Hotchkiss2013NRI]] Lymphocytes die by caspase-3-mediated apoptosis, and persistent lymphopenia predicts death. [[Hotchkiss1999,Hotchkiss2016NRDP]] Monocytes lose HLA-DR: below 30% on days 3–4 independently predicted death in septic shock (adjusted OR 6.48). [[Monneret2006]] T cells raise PD-1. [[Hotchkiss2016NRDP]] Falling natural killer cell interferon-γ often comes before cytomegalovirus reactivation. [[Hotchkiss2013NRI]]`,
  pt:`Later in sepsis, some people's defences are so tired that new infections, or old sleeping viruses, take hold more easily.`,
  hook:`Immunoparalysis markers: low monocyte HLA-DR, lymphopenia, PD-1 up. [[Monneret2006,Drewry2014,Hotchkiss2016NRDP]]`}
];
/* schematic curves, x = timeline position 0..1 */
const IM_G=(x,c,w)=>Math.exp(-Math.pow((x-c)/w,2));
const IM_MOD={
 now:{H:x=>.08+.82*IM_G(x,.4,.16),S:x=>.08+.6*ramp(x,.12,.5),Ss:x=>.08+.6*ramp(x,.12,.5)-.5*ramp(x,.62,.95),
  txt:`<b>Current view.</b> Pro-inflammatory and anti-inflammatory (suppressive) responses start together and vary from person to person. In survivors suppression resolves; in others it persists. Mouse and human data show both arms rising together, with the worst outcome when both are high. <span class="ev early">Early evidence</span> [[Osuchowski2006,Kellum2007GenIMS,vanderPoll2017]]`},
 old:{H:x=>.08+.82*IM_G(x,.3,.13),S:x=>.08+.7*ramp(x,.42,.76),Ss:x=>.08+.7*ramp(x,.42,.76)-.6*ramp(x,.82,1),
  txt:`<b>Classic view.</b> A hyperinflammatory phase (SIRS) is followed by a compensatory anti-inflammatory phase (CARS) and immunoparalysis. This sequence shaped decades of trials of drugs to block the early storm. [[Hotchkiss2013NRI]] The field has largely moved to the concurrent, individually variable model.`}
};
const IM_TR=[
 {k:'TNFR:Fc',n:'TNFR:Fc (anti-TNF), highest dose',p:30,d:53,sig:1,src:'[[Fisher1996TNFR]]',txt:`An etanercept-type fusion protein in 141 people with septic shock. 28-day mortality rose with dose: placebo 30%, low dose 30%, middle 48%, high 53% (P = 0.02 for dose-response). Another anti-TNF agent, p55-IgG (498 people), showed no overall benefit (P = .30); a subgroup signal was not confirmed. [[Abraham1997p55]]`,hook:`Blocking TNF raised mortality dose-dependently (30% → 53%).`},
 {k:'IL-1ra',n:'IL-1 receptor antagonist',p:36.4,d:33.1,src:'[[Opal1997IL1ra]]',txt:`Recombinant IL-1 receptor antagonist (anakinra-type) in 696 people: 28-day mortality 33.1% vs 36.4% with placebo (p = .36). The trial was stopped at interim analysis.`},
 {k:'HA-1A',n:'HA-1A (anti-endotoxin antibody), CHESS',p:32,d:33,src:'[[McCloskey1994CHESS]]',txt:`The 1991 trial reported 30% vs 49% mortality in 200 people with proven Gram-negative bacteraemia (P = 0.014), but 39% vs 43% in all 543 treated. [[Ziegler1991HA1A]] The confirmatory CHESS trial (2,199 enrolled) found no benefit in Gram-negative bacteraemia and shock (14-day mortality 33% vs 32%), and a trend to harm without Gram-negative bacteraemia (41% vs 37%).`,hook:`A subgroup win (HA-1A 1991) that vanished in the confirmatory trial.`},
 {k:'Eritoran',n:'Eritoran (TLR4 blocker), ACCESS',p:26.9,d:28.1,src:'[[Opal2013ACCESS]]',txt:`A TLR4–MD2 antagonist that blocks LPS, in 1,961 people with severe sepsis in 197 ICUs: 28-day mortality 28.1% vs 26.9% (HR 1.05; 95% CI 0.88–1.26); 1-year mortality 44.1% vs 43.3%.`,hook:`Blocking the LPS receptor TLR4 did not help (ACCESS).`},
 {k:'546C88',n:'546C88 (nitric oxide synthase inhibitor)',p:49,d:59,sig:1,src:'[[Lopez2004NOS]]',txt:`A non-selective nitric oxide synthase inhibitor in 797 people with septic shock. It raised blood pressure, but day-28 mortality was 59% vs 49% (p < .001), with excess cardiovascular events, and the trial was stopped early.`,hook:`Raising blood pressure by blocking NO increased deaths (59% vs 49%).`},
 {k:'PROWESS',n:'Drotrecogin alfa (activated protein C), PROWESS',p:30.8,d:24.7,src:'[[Bernard2001PROWESS]]',txt:`1,690 people: 28-day mortality 24.7% vs 30.8%, a 6.1% absolute reduction (P = 0.005); serious bleeding 3.5% vs 2.0%. It was approved after this single trial, which was stopped early for efficacy. [[MedLett2011Xigris,Angus2012Drotrecogin]]`,hook:`The only positive trial: PROWESS 2001. Not confirmed; drug withdrawn 2011.`},
 {k:'PROWESS-SHOCK',n:'Drotrecogin alfa, PROWESS-SHOCK',p:24.2,d:26.4,src:'[[Ranieri2012PROWESSSHOCK]]',txt:`1,697 people with septic shock: 28-day mortality 26.4% vs 24.2% (RR 1.09; 95% CI 0.92–1.28); 90-day 34.1% vs 32.7%. The manufacturer withdrew drotrecogin alfa (Xigris) worldwide in 2011 after this trial failed. [[MedLett2011Xigris]]`},
 {k:'KyberSept',n:'High-dose antithrombin, KyberSept',p:38.7,d:38.9,src:'[[Warren2001KyberSept]]',txt:`2,314 people: 28-day mortality 38.9% vs 38.7% (P = .94). Bleeding with concomitant heparin was 23.8% vs 13.5% (P < .001).`},
 {k:'SCARLET',n:'Recombinant thrombomodulin, SCARLET',p:29.4,d:26.8,src:'[[Vincent2019SCARLET]]',txt:`800 people with sepsis-associated coagulopathy: 28-day mortality 26.8% vs 29.4% (P = .32). Reviewers attribute the anticoagulant failures partly to enrolling patients who were not coagulopathic. [[Iba2023DIC]]`},
 {k:'EUPHRATES',n:'Polymyxin B haemoperfusion, EUPHRATES',p:34.5,d:37.7,src:'[[Dellinger2018EUPHRATES]]',txt:`Endotoxin removal in 450 people with septic shock and endotoxin activity ≥ 0.60: 28-day mortality 37.7% vs 34.5% with sham (RR 1.09; 95% CI 0.85–1.39). The SSC 2021 "suggest[s] against" it. [[Evans2021SSC]]`,ctl:'sham'},
 {k:'TESTS',n:'Thymosin α1, TESTS',p:24.1,d:23.4,src:'[[Wu2025TESTS]]',txt:`An immune-modulating peptide in 1,089 people analysed: 28-day mortality 23.4% vs 24.1% (HR 0.99; 95% CI 0.77–1.27).`}
];
inits.immune=()=>{
  /* ---------- 1. the cascade ---------- */
  const svg=$('#imSvg'),rg=$('#imT');let model='now',setSt=()=>{};
  function plot(f,X,Y,a,b){let d='';const n=60;for(let i=0;i<=n;i++){const x=a+(b-a)*i/n;d+=(i?'L':'M')+f1(X(x))+' '+f1(Y(f(x)))}return d}
  function lymph(x,y,r,dead){if(dead<.5)return `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="fill:var(--cell);stroke:var(--immune);stroke-width:1.2;opacity:${f1(1-dead)}"/><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r*.72)}" style="fill:var(--immune);opacity:${f1(1-dead)}"/>`;
    let s='';for(let i=0;i<5;i++){const a=i*1.26,d=r*(.4+dead*.9);s+=`<circle cx="${f1(x+Math.cos(a)*d)}" cy="${f1(y+Math.sin(a)*d)}" r="${f1(r*.3)}" style="fill:var(--immune);opacity:${f1(1.3-dead)}"/>`}return s}
  function draw(t){const N=vb(svg,'720 380','400 620'),p=phaseOf(IM_PH,t),P=IM_PH[p],M=IM_MOD[model];
    const TB=N?{x:16,y:56,w:368,h:170}:{x:16,y:56,w:420,h:180},VB=N?{x:16,y:232,w:368,h:76}:{x:16,y:244,w:420,h:84},CP=N?{x:44,y:362,w:326,h:180}:{x:478,y:72,w:222,h:206};
    const exh=ramp(t,.8,.92),inf=Math.max(.3,ramp(t,0,.1))*(1-.45*ramp(t,.52,.66)),cyto=ramp(t,.3,.42),spread=ramp(t,.62,.74)*(.4+.6*M.H(t)/.9),neu=ramp(t,.46,.56),net=ramp(t,.54,.64)*(1-exh*.5);
    let s=IM_T(N?16:20,26,P.t,'t-big')+IM_T(N?16:20,43,P.k,'t-sm');
    s+=`<rect x="${TB.x}" y="${TB.y}" width="${TB.w}" height="${TB.h}" rx="10" style="fill:var(--field);stroke:var(--line)"/>`;
    if(spread>0)s+=`<rect x="${TB.x}" y="${TB.y}" width="${TB.w}" height="${TB.h}" rx="10" style="fill:var(--fever-soft);opacity:${f1(spread*.7)}"/>`;
    /* host tissue cells along the top; two near the germs are injured and leak DAMPs */
    const B=[TB.x+TB.w*.2,TB.y+TB.h*.6],Mc=[TB.x+TB.w*.47,TB.y+TB.h*.56],dmg=ramp(t,.06,.2);
    for(let i=0;i<6;i++){const cx=TB.x+TB.w*(.06+i*.1),cy=TB.y+20,hurt=i<3?dmg*(i===1?1:.6):spread*.5;
      s+=`<ellipse cx="${f1(cx)}" cy="${cy}" rx="${f1(TB.w*.042)}" ry="11" style="fill:${hurt>.5?'var(--organ-fail)':'var(--skin)'};stroke:var(--organ-dark);stroke-width:1;opacity:.9"/><circle cx="${f1(cx)}" cy="${cy}" r="3.5" style="fill:var(--organ-dark);opacity:.6"/>`;
      if(hurt>.2&&t<.8)for(let k=0;k<3;k++){const u=(t*6+k/3+i*.2)%1;s+=`<rect x="${f1(cx-3+k*3)}" y="${f1(cy+12+u*24)}" width="3" height="3" style="fill:var(--organ-fail-dark);opacity:${f1(hurt*(1-u))}"/>`}}
    /* bacteria shedding LPS */
    const nb=Math.round(2+inf*6),rr=rng(4);for(let i=0;i<nb;i++){const a=i*2.2+.5,d=8+(i%3)*11;s+=bacterium(B[0]+Math.cos(a)*d*1.3,B[1]+Math.sin(a)*d*.8,13,{ang:a*50+t*40,lps:ramp(t,.04,.16)*(1-exh*.6),div:(t*3+i*.3)%1*.6,seed:i+1})}
    /* LPS fragments drifting to the macrophage */
    const fl=ramp(t,.06,.18)*(1-ramp(t,.44,.52));if(fl>0)for(let i=0;i<6;i++){const u=(t*5+i/6)%1,x=lerp(B[0]+18,Mc[0]-22,u),y=lerp(B[1],Mc[1],u)+Math.sin(u*6+i)*6;s+=`<path d="M${f1(x)} ${f1(y-3)}l3 5h-6z" style="fill:var(--pathogen-dark);opacity:${f1(fl)}"/>`}
    /* the macrophage: receptors (TLRs / antigen-presenting markers) lost in exhaustion */
    s+=macrophage(Mc[0],Mc[1],46,{act:ramp(t,.16,.3)*(1-.6*exh),tlr:t<.86,eat:ramp(t,.3,.45)*(1-exh),seed:9});
    if(cyto>0)s+=cytokines(Mc[0],Mc[1],46,{v:cyto,n:16,seed:5,op:1-spread*.4});
    if(spread>0)for(let k=0;k<3;k++)s+=cytokines(TB.x+TB.w*(.25+k*.25),TB.y+TB.h*.55,TB.w*.22,{v:spread,n:12,seed:20+k,op:spread*.85,size:2.2});
    /* neutrophils leave the vessel and throw NETs around the germs */
    if(neu>0)for(let i=0;i<3;i++){const u=ramp(t,.48+i*.02,.58+i*.02),a=i*2.1+1,tx=B[0]+Math.cos(a)*34,ty=B[1]+Math.sin(a)*22,x=lerp(TB.x+TB.w*(.15+i*.12),tx,u),y=lerp(TB.y+TB.h-6,ty,u);
      if(u>0)s+=neutrophil(x,y,22,{act:u,net:net,seed:i+2,op:u})}
    /* new germs in exhaustion: a virus reactivating, a second infection */
    const sec=ramp(t,.86,.96);if(sec>0){const vx=TB.x+TB.w*.32,vy=TB.y+TB.h*.33;s+=virus(vx,vy,16,{op:sec})+virus(vx+22,vy-6,12,{op:sec*.8})+bacterium(TB.x+TB.w*.58,TB.y+TB.h*.86,14,{kind:'coccus',op:sec});
      s+=IM_TH(vx+10,vy+20,'virus reactivates','t-xs t-mid','var(--pathogen-dark)')+IM_TH(TB.x+TB.w*.58,TB.y+TB.h-4,'new infection','t-xs t-mid','var(--pathogen-dark)')}
    /* labels */
    s+=IM_TH(B[0],B[1]+42,neu>.5?'neutrophils + NETs':'bacteria','t-xs t-mid',neu>.5?'var(--immune)':'var(--pathogen-dark)');
    s+=IM_TH(Mc[0],Mc[1]+38,exh>.5?'macrophage: HLA-DR ↓':'macrophage','t-xs t-mid','var(--immune)');
    if(dmg>.3&&t<.4)s+=IM_TH(TB.x+TB.w*.2,TB.y+48,'injured cells leak DAMPs','t-xs t-mid','var(--organ-fail-dark)');
    /* the close-up: inside the macrophage (recognition) or the exhausted immune system */
    const Z=[TB.x+TB.w*.81,TB.y+TB.h*.56],zr=Math.min(TB.h*.4,TB.w*.16),zIn=ramp(t,.16,.24)*(1-ramp(t,.6,.66)),zEx=ramp(t,.8,.86);
    if(zIn>0||zEx>0){const op=Math.max(zIn,zEx);s+=`<g style="opacity:${f1(op)}"><line x1="${f1(Mc[0]+22)}" y1="${f1(Mc[1]-10)}" x2="${f1(Z[0]-zr*.98)}" y2="${f1(Z[1]-zr*.2)}" style="stroke:var(--muted);stroke-dasharray:3 3"/><circle cx="${f1(Z[0])}" cy="${f1(Z[1])}" r="${f1(zr)}" style="fill:var(--panel);stroke:var(--immune);stroke-width:1.6"/>`;
      if(zIn>=zEx){const mx=Z[0]-zr*.55;s+=`<path d="M${f1(mx)} ${f1(Z[1]-zr*.8)}Q${f1(mx-6)} ${f1(Z[1])} ${f1(mx)} ${f1(Z[1]+zr*.8)}" style="fill:none;stroke:var(--immune);stroke-width:3"/>`;
        const ry=Z[1]-zr*.25;s+=`<path d="M${f1(mx-12)} ${f1(ry-7)}L${f1(mx-4)} ${f1(ry)}L${f1(mx-12)} ${f1(ry+7)}M${f1(mx-4)} ${f1(ry)}H${f1(mx+4)}" style="fill:none;stroke:var(--immune);stroke-width:2.2;stroke-linecap:round"/>`;
        const dock=ramp(t,.18,.24);s+=`<path d="M${f1(mx-28+dock*12)} ${f1(ry-4)}l4 7h-8z" style="fill:var(--pathogen-dark)"/>`;
        s+=IM_T(mx-6,ry-12,'TLR4','t-xs t-mid','fill:var(--immune);font-weight:700');
        const nx=Z[0]+zr*.3,ny=Z[1]-zr*.05,sig=ramp(t,.2,.3);s+=`<ellipse cx="${f1(nx)}" cy="${f1(ny)}" rx="${f1(zr*.34)}" ry="${f1(zr*.28)}" style="fill:var(--immune-soft);stroke:var(--immune)"/>`;
        s+=`<path d="M${f1(mx+6)} ${f1(ry)}L${f1(lerp(mx+6,nx-zr*.34,sig))} ${f1(lerp(ry,ny,sig))}" style="stroke:var(--fever);stroke-width:2;stroke-dasharray:3 2"/>`;
        s+=IM_T(nx,ny+3,'NF-κB','t-xs t-mid','fill:var(--ink);font-weight:700');
        if(cyto>0)s+=IM_T(Z[0],Z[1]+zr*.62,'TNF · IL-1 · IL-6','t-xs t-mid',`fill:var(--accent);font-weight:700;opacity:${f1(cyto)}`);
        s+=IM_T(Z[0],Z[1]-zr-5,'inside the macrophage','t-xs t-mid','fill:var(--ink)')}
      else{const dead=ramp(t,.84,.96);[[-.45,-.3],[.1,-.42],[.45,-.05],[-.3,.25],[.15,.3]].forEach((q,i)=>{s+=lymph(Z[0]+q[0]*zr,Z[1]+q[1]*zr,zr*.13,i<4?dead:0)});
        s+=IM_T(Z[0],Z[1]+zr*.7,'PD-1 ↑ · HLA-DR ↓','t-xs t-mid','fill:var(--immune);font-weight:700');
        s+=IM_T(Z[0],Z[1]-zr-5,'lymphocytes die (apoptosis)','t-xs t-mid','fill:var(--ink)')}
      s+='</g>'}
    /* the vessel below: rolling neutrophils, microclots, leak */
    const lk=ramp(t,.64,.76)*(1-.4*exh);
    const V=vessel(VB.x,VB.y,VB.w,VB.h,{ph:t*12,cells:neu*(1-exh*.7),clots:.66*ramp(t,.54,.68),leak:lk,dilate:lk*.6,o2:1-.5*lk,seed:8});
    s+=V.svg+IM_TH(VB.x+VB.w-6,VB.y+VB.h-4,lk>.3?'vessel leaks':'small blood vessel','t-xs t-end',lk>.3?'var(--fluid)':'var(--ink)');
    /* the two-curve timeline */
    const X=x=>CP.x+CP.w*x,Y=v=>CP.y+CP.h-CP.h*v;
    s+=`<rect x="${CP.x}" y="${CP.y}" width="${CP.w}" height="${CP.h}" style="fill:var(--field)"/><line x1="${CP.x}" x2="${CP.x+CP.w}" y1="${CP.y+CP.h}" y2="${CP.y+CP.h}" class="axis"/><line x1="${CP.x}" x2="${CP.x}" y1="${CP.y}" y2="${CP.y+CP.h}" class="axis"/>`;
    s+=IM_T(CP.x,CP.y-26,model==='now'?'Current view: both at once':'Classic view: SIRS, then CARS','t-sm','fill:var(--ink);font-weight:700')+IM_T(CP.x,CP.y-10,'level, schematic','t-xs');
    [['hours',.1],['days',.45],['weeks',.85]].forEach(([a,x])=>{s+=IM_T(X(x),CP.y+CP.h+14,a,'t-xs t-mid')});
    s+=`<path d="${plot(M.H,X,Y,0,1)}" style="fill:none;stroke:var(--fever);stroke-width:1.4;opacity:.3"/><path d="${plot(M.S,X,Y,0,1)}" style="fill:none;stroke:var(--immune);stroke-width:1.4;opacity:.3"/><path d="${plot(M.Ss,X,Y,.55,1)}" style="fill:none;stroke:var(--good);stroke-width:1.4;stroke-dasharray:4 3;opacity:.35"/>`;
    if(t>0){s+=`<path d="${plot(M.H,X,Y,0,t)}" style="fill:none;stroke:var(--fever);stroke-width:3"/><path d="${plot(M.S,X,Y,0,t)}" style="fill:none;stroke:var(--immune);stroke-width:3"/>`;
      if(t>.55)s+=`<path d="${plot(M.Ss,X,Y,.55,t)}" style="fill:none;stroke:var(--good);stroke-width:2.4;stroke-dasharray:5 3"/>`}
    s+=`<line x1="${f1(X(t))}" x2="${f1(X(t))}" y1="${CP.y}" y2="${CP.y+CP.h}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:2 3"/><circle cx="${f1(X(t))}" cy="${f1(Y(M.H(t)))}" r="4.5" style="fill:var(--fever);stroke:var(--panel);stroke-width:1.5"/><circle cx="${f1(X(t))}" cy="${f1(Y(M.S(t)))}" r="4.5" style="fill:var(--immune);stroke:var(--panel);stroke-width:1.5"/>`;
    const lgY=CP.y+CP.h+30;[['pro-inflammatory','var(--fever)',''],['immune suppression','var(--immune)',''],['suppression, survivors','var(--good)','4 3']].forEach(([a,c,d],i)=>{const lx=CP.x,ly=lgY+i*15;
      s+=`<line x1="${lx}" x2="${lx+16}" y1="${ly-3}" y2="${ly-3}" style="stroke:${c};stroke-width:3${d?';stroke-dasharray:'+d:''}"/>`+IM_T(lx+21,ly,a,'t-xs','fill:var(--ink)')});
    svg.innerHTML=s;setSt(p);
        $('#imRead').innerHTML=`<span>phase <b>${p+1} of 6</b></span><span>model <b>${model==='now'?'concurrent':'SIRS then CARS'}</b></span>`;
    $('#imNote').innerHTML=noteHTML(P)}
  const stop=playWire(rg,$('#imPlay'),draw,24000,'%t:player.replay%','immune');
  setSt=stepWire($('#imSteps'),IM_PH,rg,draw,stop);
  const mdl=$('#imModel');mdl.innerHTML=IM_MOD.now.txt;
  $$('[data-im]').forEach(b=>b.addEventListener('click',()=>{model=b.dataset.im;$$('[data-im]').forEach(x=>x.setAttribute('aria-pressed',x===b));mdl.innerHTML=IM_MOD[model].txt;draw(+rg.value)}));
  draw(+rg.value);

  /* ---------- 2. immune exhaustion: three small charts ---------- */
  const sup=$('#imSupSvg');
  function drawSup(){const N=vb(sup,'720 270','400 760');let s='';
    const PN=N?[{x:56,y:40,w:300,h:150},{x:56,y:290,w:300,h:150},{x:96,y:540,w:260,h:160}]:[{x:56,y:44,w:170,h:170},{x:300,y:44,w:160,h:170},{x:578,y:44,w:120,h:170}];
    /* A: lymphocytes, Drewry */
    let A=PN[0],Y=v=>A.y+A.h-A.h*v/1.4,X=i=>A.x+A.w*(.15+.7*i);
    s+=IM_T(A.x-40,A.y-22,'Lymphocytes (×10³/μL)','t-sm','fill:var(--ink);font-weight:700')+IM_T(A.x-40,A.y-8,'335 adults with bacteraemia','t-xs');
    s+=`<line x1="${A.x}" x2="${A.x+A.w}" y1="${A.y+A.h}" y2="${A.y+A.h}" class="axis"/><line x1="${A.x}" x2="${A.x}" y1="${A.y}" y2="${A.y+A.h}" class="axis"/>`;
    [0,.5,1].forEach(v=>{s+=IM_T(A.x-6,Y(v)+3,v,'t-xs t-end')});s+=IM_T(X(0),A.y+A.h+14,'onset','t-xs t-mid')+IM_T(X(1),A.y+A.h+14,'day 4','t-xs t-mid');
    [['survivors',.7,1.1,'var(--good)'],['non-survivors',.6,.7,'var(--bad)']].forEach(([a,v0,v1,c])=>{s+=`<line x1="${f1(X(0))}" y1="${f1(Y(v0))}" x2="${f1(X(1))}" y2="${f1(Y(v1))}" style="stroke:${c};stroke-width:2.6"/><circle cx="${f1(X(0))}" cy="${f1(Y(v0))}" r="4.5" style="fill:${c}"/><circle cx="${f1(X(1))}" cy="${f1(Y(v1))}" r="4.5" style="fill:${c}"/>`+IM_TH(X(1)-4,Y(v1)-9,`${a} ${v1}`,'t-xs t-end',c)});
    /* B: monocyte HLA-DR, Monneret */
    A=PN[1];Y=v=>A.y+A.h-A.h*v/60;
    s+=IM_T(A.x-40,A.y-22,'Monocyte HLA-DR, days 3–4','t-sm','fill:var(--ink);font-weight:700')+IM_T(A.x-40,A.y-8,'93 people with septic shock','t-xs');
    s+=`<line x1="${A.x}" x2="${A.x+A.w}" y1="${A.y+A.h}" y2="${A.y+A.h}" class="axis"/>`;[0,30,60].forEach(v=>{s+=IM_T(A.x-6,Y(v)+3,v+'%','t-xs t-end')});
    [['survivors',43,'var(--good)'],['non-survivors',18,'var(--bad)']].forEach(([a,v,c],i)=>{const bx=A.x+A.w*(.12+i*.46),bw=A.w*.32;s+=`<rect x="${f1(bx)}" y="${f1(Y(v))}" width="${f1(bw)}" height="${f1(Y(0)-Y(v))}" rx="4" style="fill:${c};opacity:.85"/>`+IM_T(bx+bw/2,Y(v)-5,v+'%','t-sm t-mid','fill:var(--ink);font-weight:700')+IM_T(bx+bw/2,A.y+A.h+14,a,'t-xs t-mid')});
    s+=`<line x1="${A.x}" x2="${A.x+A.w}" y1="${f1(Y(30))}" y2="${f1(Y(30))}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:4 3"/>`+IM_TH(A.x+A.w,Y(30)-5,'< 30%: OR 6.48 for death','t-xs t-end');
    /* C: splenocyte cytokines, Boomer */
    A=PN[2];const C=[['TNF',418,5361],['IFN-γ',37.5,1374],['IL-6',365,3691],['IL-10',58,633]],bh=A.h/C.length;
    s+=IM_T(A.x-(N?80:76),A.y-22,'Spleen cells after sepsis death','t-sm','fill:var(--ink);font-weight:700')+IM_T(A.x-(N?80:76),A.y-8,'cytokine secreted, % of controls','t-xs');
    C.forEach(([a,v,c],i)=>{const y=A.y+i*bh+6,pc=v/c*100;s+=IM_T(A.x-6,y+12,a,'t-xs t-end','fill:var(--ink)')+`<rect x="${A.x}" y="${f1(y)}" width="${A.w}" height="16" rx="3" style="fill:var(--panel-2)"/><rect x="${A.x}" y="${f1(y)}" width="${f1(A.w*pc/100)}" height="16" rx="3" style="fill:var(--immune)"/>`+IM_T(A.x+A.w*pc/100+5,y+12,f1(pc)+'%','t-xs','fill:var(--ink);font-weight:700')});
    s+=IM_T(A.x+A.w,A.y+A.h+8,'controls = 100%','t-xs t-end');
    sup.innerHTML=s}
  drawSup();

  /* ---------- 3. the trials ---------- */
  const tr=$('#imTrSvg'),ch=$('#imTrChips');let sel=4;
  ch.innerHTML=IM_TR.map((x,i)=>`<button class="tag" data-tr="${i}" aria-pressed="${i===sel}">${x.k}</button>`).join('');
  function drawTr(){const N=vb(tr,'720 340','400 560'),rh=N?46:26,top=N?24:30,X0=N?16:270,X1=N?384:690,X=v=>X0+(X1-X0)*v/70;let s='';
    for(let v=0;v<=70;v+=10){s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${top-6}" y2="${top+IM_TR.length*rh}" class="grid"/>`+IM_T(X(v),top+IM_TR.length*rh+14,v+'%','t-xs t-mid')}
    IM_TR.forEach((r,i)=>{const y=top+i*rh+(N?28:rh/2),on=i===sel,worse=r.d>r.p,c=worse?'var(--bad)':'var(--good)';
      if(on)s+=`<rect x="${N?8:12}" y="${f1(top+i*rh)}" width="${N?384:696}" height="${rh}" rx="6" style="fill:var(--brand-soft)"/>`;
      s+=N?IM_T(16,top+i*rh+14,r.n,'t-xs',`fill:var(--ink);font-weight:${on?700:500}`):IM_T(258,y+4,r.k,'t-sm t-end',`fill:var(--ink);font-weight:${on?700:500}`);
      s+=`<line x1="${f1(X(r.p))}" x2="${f1(X(r.d))}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:${c};stroke-width:${on?3:2}"/><circle cx="${f1(X(r.p))}" cy="${f1(y)}" r="5" style="fill:var(--muted)"/><circle cx="${f1(X(r.d))}" cy="${f1(y)}" r="5.5" style="fill:${c};stroke:var(--panel);stroke-width:1.5"/>`;
      if(on||!N)s+=IM_T(X(Math.max(r.p,r.d))+9,y+4,`${r.d}% vs ${r.p}%`,'t-xs',`fill:var(--ink);font-weight:${on?700:500}`)});
    s+=IM_T(X0,top-12,'grey: placebo or sham · coloured: drug (red = higher mortality, green = lower)','t-xs');
    tr.innerHTML=s;
    const r=IM_TR[sel];$('#imTrNote').innerHTML=noteHTML({k:'Trial · 28-day mortality',t:r.n,txt:`${r.d}% with the drug vs ${r.p}% with ${r.ctl||'placebo'}. ${r.txt} ${r.src}`,pt:`Lower is better. ${r.sig?'More people died with the treatment than without it.':r.k==='PROWESS'?'Fewer people died with the treatment, but a later trial did not confirm it.':'The treatment showed no clear benefit.'} These are figures for groups of people in a trial.`,hook:r.hook?r.hook+' '+r.src:''})}
  ch.addEventListener('click',e=>{const b=e.target.closest('[data-tr]');if(!b)return;sel=+b.dataset.tr;$$('[data-tr]',ch).forEach(x=>x.setAttribute('aria-pressed',x===b));drawTr()});
  drawTr();
  const prevR=redraws.immune;redraws.immune=()=>{prevR&&prevR();drawSup();drawTr()};
};
