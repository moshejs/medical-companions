/* =============== 1.2 Plaque, rupture & clot =============== */
const PL_SPLIT=.72; /* t < PL_SPLIT: decades (age 10 to 60); after: minutes after the plaque fails */
const PL_COMMON=[
 {from:0,at:.06,k:'Childhood and teens',t:'LDL gets trapped in the wall',
  txt:'Atherosclerosis is the build-up of fibrofatty lesions in the artery wall. It causes most heart attacks, and its development "probably requires" low-density lipoprotein (LDL), the particle that carries cholesterol in the blood. [[Libby2019Primer]] The key first step is the <b>retention</b> of apoB-containing lipoproteins such as LDL beneath the endothelium, the artery\'s inner lining. A chronic inflammatory response led by macrophages and T cells then drives the lesion\'s growth. [[Tabas2007]] The earliest lesion (AHA type I) has extra macrophages in the intima and scattered lipid-filled macrophages, called foam cells. [[Stary1994]]',
  pt:'Particles that carry cholesterol slip into the artery wall and get stuck there. White blood cells move in to clear them and fill up with fat.',
  hook:'The initiating event is subendothelial retention of apoB lipoproteins. Populations with lifelong low apoB lipoproteins have about 90% lower coronary risk. [[Tabas2007]]'},
 {from:.14,at:.22,k:'Teens and twenties',t:'The fatty streak',
  txt:'Type II lesions include the fatty streak, the first lesion visible to the naked eye: layers of foam cells, and lipid droplets inside smooth muscle cells. Types I and II are generally the only lesions found in children. [[Stary1994]] In the PDAY autopsy study of 2876 people aged 15–34 who died of external causes, lesions were present in every aorta and in more than half of right coronary arteries even at ages 15–19. [[Strong1999PDAY]] In Bogalusa autopsies of young people, fatty streaks covered 1.3% of the coronary surface with no risk factors and 11.0% with 3 or 4. [[Berenson1998Bogalusa]]',
  pt:'This often starts young. A fatty streak is a thin yellow line in the wall. It does not narrow the artery and causes no symptoms.',
  hook:'Fatty streak = AHA type II, the first lesion visible to the naked eye. Intravascular ultrasound found coronary atherosclerosis in "1 of 6 teenagers". [[Stary1994,Tuzcu2001]]'},
 {from:.3,at:.42,k:'Thirties and forties',t:'A fibroatheroma: core and cap',
  txt:'Type III lesions add pools of lipid outside the cells. They appear in "adaptive intimal thickenings", which everyone has at the same sites from birth and which is where lesions progress most. [[Stary1994,Stary1995]] Type IV lesions (atheroma) have a confluent lipid core and can cause symptoms. From around the fourth decade, lesions may add thick fibrous layers: type V, the fibroatheroma. [[Stary1995]] Through inflammation, necrosis, fibrosis and calcification, plaques can grow quietly for decades before suddenly causing a clot. [[Bentzon2014]]',
  pt:'The bump now has a soft, fatty centre (the yellow core) and a tough lid of fibrous tissue (the cap) between the core and the blood.',
  hook:'AHA types: I foam cells → II fatty streak → III extracellular lipid pools → IV atheroma → V fibroatheroma → VI complicated (fissure, haematoma, thrombus). [[Stary1994,Stary1995]]'}];
const PL_STEPS={
 rupture:PL_COMMON.concat([
 {from:.5,at:.66,k:'Fifties and later',t:'The cap thins',
  txt:'The <b>thin-cap fibroatheroma</b> (TCFA) is the lesion that most resembles a ruptured plaque: a necrotic core under a fibrous cap less than 65 µm thick, with few smooth muscle cells and many macrophages. In more than 75% of TCFAs the artery is less than 75% narrowed by area (under 50% by diameter), and they usually grow outward (positive remodelling) rather than narrowing the channel severely. [[Virmani2006]] In 295 plaques from sudden deaths, cap thickness separated plaque types best: ruptured caps were under 55 µm, every stable fibroatheroma cap was over 84 µm, and most TCFAs were 54–84 µm. [[Narula2013]] <span class="ev early">Early evidence</span> Bleeding into the plaque enlarges the core and may add to instability. [[Kolodgie2003]]',
  pt:'The lid over the soft core gets very thin and fills with inflammatory cells, yet the channel for blood may still look only mildly narrowed.',
  hook:'TCFA: cap &lt;65 µm (Virmani). Ruptured caps &lt;55 µm; stable fibroatheroma caps &gt;84 µm (Narula). [[Virmani2006,Narula2013]]'},
 {from:PL_SPLIT,at:.79,k:'Minute 0',t:'The cap ruptures',
  txt:'Rupture is the most common cause of acute MI, especially in men. [[Falk2013]] A tear in the thin cap exposes highly thrombogenic, red-cell-rich core material to the blood. [[Bentzon2014]] Exposed plaque components activate <b>tissue factor</b>, which starts the coagulation cascade that lays down fibrin, while circulating platelets and inflammatory cells are recruited. [[Badimon2014]] Rupture caused 56% of coronary thrombi in one autopsy series of sudden deaths and 69% in another; in living patients with acute coronary syndrome imaged by OCT it was the culprit in 43.7%. [[Farb1996,Burke1997,Jia2013OCT]]',
  pt:'The thin lid cracks open. The core underneath is highly clot-provoking, so the blood that touches it starts to clot.',
  hook:'Rupture is the most common cause of coronary thrombosis, especially in men. The total-to-HDL cholesterol ratio was 8.5 in rupture deaths vs 5.0 with erosion. [[Falk2013,Burke1997]]'},
 {from:.84,at:.97,k:'Minutes to hours',t:'A clot blocks the artery',
  txt:'Exposed plaque, platelet receptors and clotting factors interact. Platelets activate and aggregate, and a thrombus builds on the plaque that may block the artery and cause an acute ischaemic syndrome. [[Badimon2014]] Clots often build in stages: in 115 culprit thrombi from sudden coronary deaths, 69% were days to weeks old. [[Kramer2010JACC]] With the channel blocked, blood stops downstream and the heart muscle that the artery feeds begins to die: see <a href="#ischaemia" data-go="ischaemia">Ischaemia: time is muscle</a>. Drugs aimed at platelets and clotting are in <a href="#antithrombotic" data-go="antithrombotic">Antiplatelets &amp; anticoagulants</a>.',
  pt:'Sticky blood cells called platelets pile up and a clot grows until blood cannot get past. That blockage is the heart attack.',
  hook:'Atherothrombosis = plaque disruption + platelet activation and aggregation + coagulation (tissue factor → fibrin). [[Badimon2014]]'}]),
 erosion:PL_COMMON.concat([
 {from:.5,at:.66,k:'Fifties and later',t:'A plaque with a thick cap',
  txt:'Erosion usually happens on pathological intimal thickening or a fibroatheroma. [[Bentzon2014]] Eroded plaques are often negatively remodelled, rich in smooth muscle cells and proteoglycans, and have little or no inflammation. [[Falk2013]] On OCT, culprit erosions had thicker caps than ruptures (mean 169.3 vs 60.4 µm), less lipid and the least narrowing (55.4% vs 68.8% diameter stenosis). [[Jia2013OCT]]',
  pt:'In this version the lid stays thick and there is less fat. The trouble will start on the surface instead.',
  hook:'Erosion: thick cap, less lipid, less stenosis and less inflammation. Macrophages infiltrated the cap in 50% of erosions vs 100% of ruptures. [[Farb1996,Jia2013OCT]]'},
 {from:PL_SPLIT,at:.79,k:'Minute 0',t:'The surface erodes',
  txt:'In erosion the surface of the plaque wears away without a tear into the lipid core. Its mechanisms remain "largely unknown", although coronary spasm is suspected. [[Bentzon2014]] In 50 sudden deaths from coronary thrombosis, 44% had erosion; those people were younger (mean 44 vs 53 years) and more often women (50% vs 18%). [[Farb1996]] Autopsy data show that women under 50 more often have erosion. [[Falk2013]] On OCT, erosion was the culprit in 31.0% of patients with acute coronary syndrome, who more often presented without ST elevation (61.5% vs 29.1%). [[Jia2013OCT]]',
  pt:'The lid does not crack. Its surface wears away, and that is enough to start a clot.',
  hook:'Erosion is relatively more common in younger patients, in women and in non-ST-elevation ACS. [[Farb1996,Jia2013OCT]]'},
 {from:.84,at:.97,k:'Minutes to hours',t:'A clot on an eroded plaque',
  txt:'Platelets and fibrin build a thrombus on the exposed surface, as they do on a rupture. [[Badimon2014]] In sudden coronary deaths, clots that were days to weeks old were more common on erosions (88%) than on ruptures (54%), so the thrombus often built up in stages. [[Kramer2010JACC]] <span class="ev early">Early evidence</span> In the single-centre, uncontrolled EROSION study, 60 patients with an erosion treated with antithrombotic drugs and no stent were followed: 78.3% had more than a 50% reduction in thrombus volume at 1 month. No randomised trial was found. [[Jia2017EROSION]]',
  pt:'A clot can grow on the worn surface just as it does on a crack, and it can block the artery.',
  hook:'Rupture vs erosion: autopsy 56% vs 44% (Farb) and 69% vs 31% (Burke); OCT 43.7% vs 31.0%, with calcified nodules 7.9%. [[Farb1996,Burke1997,Jia2013OCT]]'}])
};

inits.plaque=()=>{
  const svg=$('#plSvg'),rg=$('#plT'),note=$('#plNote'),read=$('#plRead');
  let mode='rupture',setSt=()=>{};
  const ageOf=t=>lerp(10,60,clamp(t/PL_SPLIT)),minOf=t=>lerp(0,60,ramp(t,PL_SPLIT,1));
  /* the plaque's state at time t */
  function state(t){const er=mode==='erosion';
    const plq=.22*ramp(t,.12,.3)+.33*ramp(t,.3,.5)+(er?0:.12)*ramp(t,.5,.7);
    const cap=t<.5?1:er?.88:lerp(1,.04,ease(ramp(t,.5,.69)));
    const fail=ramp(t,PL_SPLIT+.005,.79),clot=ease(ramp(t,.775,.965));
    return {plq,cap,ldl:ramp(t,0,.07)*(1-.55*ramp(t,.45,.7)),foam:ramp(t,.04,.24),
      rupture:er?0:fail,erode:er?fail:0,clot,er}}
  /* cap thickness for the gauge, µm (schematic marker; reference lines are published) */
  function capUm(t,S){if(t<.3)return null;if(S.er)return 172;if(t<.5)return 190;if(t<PL_SPLIT)return lerp(190,50,ease(ramp(t,.5,.69)));return 48}
  function lesion(t,S){if(t<.12)return 'Type I: foam cells';if(t<.3)return 'Type II: fatty streak';if(t<.4)return 'Type III: extracellular lipid pools';
    if(t<.5)return 'Types IV–V: atheroma, fibroatheroma';if(t<PL_SPLIT)return S.er?'Fibroatheroma, thick cap':'Thin-cap fibroatheroma';return 'Type VI: complicated, with thrombus'}
  let RB=720,N0=false;const lbl=(x1,y1,x2,y2,txt,anc,col)=>{const tw=txt.replace(/&[a-z]+;/g,'x').length*6.7;if(anc!=='t-end')x2=Math.min(x2,RB-tw-4);else x2=Math.max(x2,RB-(N0?380:452)+tw+4);return `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" style="stroke:var(--muted);stroke-width:1"/><circle cx="${f1(x1)}" cy="${f1(y1)}" r="2" style="fill:var(--muted)"/><text x="${f1(x2+(anc==='t-end'?-3:3))}" y="${f1(y2+3.5)}" class="t-sm ${anc||''}" style="fill:${col||'var(--ink)'}">${txt}</text>`};
  function gauge(x,y,w,um,S){const U=v=>x+w*clamp(v/220);let s=`<text x="${f1(x)}" y="${f1(y-15)}" class="t-sm" style="fill:var(--ink)">Fibrous cap thickness</text>`;
    s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="10" rx="5" style="fill:var(--panel-2)"/><rect x="${f1(x)}" y="${f1(y)}" width="${f1(U(65)-x)}" height="10" rx="5" style="fill:var(--bad);opacity:.28"/>`;
    [[55,'55','t-end',-2],[65,'',''],[84,'84','',2],[169.3,'169','t-mid',0]].forEach(([v,l,a,dx])=>{s+=`<line x1="${f1(U(v))}" x2="${f1(U(v))}" y1="${f1(y-3)}" y2="${f1(y+13)}" style="stroke:var(--ink);stroke-width:1;opacity:.6"/>`+(l?`<text x="${f1(U(v)+dx)}" y="${f1(y+24)}" class="t-xs ${a}">${l}</text>`:'')});
    s+=`<text x="${f1(x+w)}" y="${f1(y+24)}" class="t-xs t-end">µm</text>`;
    if(um!=null){const mx=U(um),thin=um<65;s+=`<path d="M${f1(mx)} ${f1(y-2)}l-6 -9h12z" style="fill:${thin?'var(--bad)':'var(--good)'}"/>`}
    return s}
  function draw(t){
    const N=vb(svg,'720 380','400 530'),S=state(t),ph=(t*34)%1;
    let s=`<defs>${marker('plArr','var(--muted)')}</defs>`;
    const A=N?{x:10,y:58,w:380,h:168}:{x:16,y:46,w:452,h:196};
    const X=N?{cx:96,cy:352,r:70}:{cx:604,cy:132,r:80};RB=A.x+A.w;N0=N;
    const G=N?{x:196,y:326,w:186}:{x:510,y:250,w:186};
    /* heading */
    const dec=t<PL_SPLIT,hd=dec?`Age about ${Math.round(ageOf(t))} (illustrative)`:`Minute ${Math.round(minOf(t))} after the ${S.er?'surface erodes':'cap ruptures'}`;
    s+=`<text x="${f1(A.x)}" y="${N?22:22}" class="t-lbl">${hd}</text><text x="${f1(A.x)}" y="${N?40:38}" class="t-sm">Long view · blood flows left to right →</text>`;
    const ar=artery(A.x,A.y,A.w,A.h,{plaque:S.plq,cap:S.cap,ldl:S.ldl,rupture:S.rupture,erode:S.erode,clot:S.clot,ph,px:.52,seed:12});
    s+=ar.svg;const cx=ar.at.cx,bot=ar.at.bot,top=ar.at.top,H=bot-ar.at.plaque[1],L=A.w*.2;
    /* foam cells: lipid-filled macrophages in the intima, then inside the growing plaque */
    const nf=Math.round(S.foam*9),rr=rng(5);
    for(let i=0;i<nf;i++){const u=(i/8-.5)*1.3,fx=cx+u*L*.9+(rr()-.5)*6;let fy;
      if(H<3)fy=bot+3+rr()*2;else{const hh=H*(1-Math.pow(Math.abs(u)/1.1,2));fy=bot-Math.max(2,hh*(.25+.45*rr()))}
      s+=`<circle cx="${f1(fx)}" cy="${f1(fy)}" r="3.4" style="fill:var(--plaque);stroke:var(--core);stroke-width:.8"/><circle cx="${f1(fx+.9)}" cy="${f1(fy-.6)}" r="1.1" style="fill:var(--isch)"/>`}
    /* tissue factor sparks at the failure site */
    const fl=Math.max(S.rupture,S.erode);
    if(fl>0&&S.clot<.6){for(let i=0;i<6;i++){const a=i/6*Math.PI*2+t*30,rx=cx-L*.1+Math.cos(a)*(8+fl*10),ry=ar.at.plaque[1]-6+Math.sin(a)*(4+fl*5);s+=`<circle cx="${f1(rx)}" cy="${f1(ry)}" r="1.5" style="fill:var(--warn);opacity:${f1(fl*(1-S.clot))}"/>`}}
    /* platelets drifting in and sticking */
    if(t>.76){for(let i=0;i<7;i++){const p=ease(ramp(t,.765+i*.024,.83+i*.024));if(p<=0)continue;
      const sx=lerp(A.x+18+i*7,cx-L*.55+i*L*.16,p),sy=lerp(top+(bot-top)*(.3+.06*(i%3)),ar.at.plaque[1]-4-(i%3)*5-S.clot*(bot-top)*.45*(i%2),p);
      s+=platelet(sx,sy,N?10:12,{act:p,ang:i*40})}}
    /* labels */
    const py=ar.at.plaque[1];
    if(t<.14){s+=lbl(cx+L*.6,bot+4,cx+L*.9,A.y+A.h+14,N?'LDL enters':'LDL enters the wall');s+=lbl(cx-L*.4,bot+3,cx-L*.9,A.y+A.h+14,'foam cells','t-end')}
    else if(t<.3){s+=lbl(cx,bot-2,cx+L*.6,A.y+A.h+14,'fatty streak (foam cells)')}
    else if(t<PL_SPLIT){s+=lbl(cx+L*.25,bot-H*.42,cx+L*.9,A.y+A.h+14,'necrotic core');s+=lbl(cx-L*.15,py+1,cx-L*1.2,top+12,S.er?'thick fibrous cap':t>=.55?'thin cap (&lt;65 µm)':'fibrous cap','t-end',!S.er&&t>=.55?'var(--bad)':'')}
    else if(S.clot<.55){s+=lbl(cx-L*.12,py+2,cx-L*1.2,top+12,S.er?'eroded surface':'cap ruptures','t-end','var(--bad)');s+=lbl(cx+L*.3,py-8,cx+L*1.3,top+12,'platelets stick')}
    else{s+=lbl(cx,py-(bot-top)*S.clot*.5,cx+L*1.3,top+12,'thrombus');s+=`<text x="${f1(A.x+A.w-6)}" y="${f1(A.y+A.h+16)}" class="t-sm t-end" style="fill:var(--bad)">${S.clot>.95?'no flow downstream':'flow falling downstream'}</text>`}
    /* cross-section */
    s+=`<text x="${f1(X.cx)}" y="${f1(X.cy-X.r-10)}" class="t-sm t-mid">Cross-section at the plaque</text>`;
    s+=xsec(X.cx,X.cy,X.r,{plaque:S.plq*1.05,cap:S.cap,clot:S.clot,rupture:S.rupture}).svg;
    if(S.erode>0){for(let i=0;i<5;i++){const a=Math.PI*(.32+i*.09),rl=X.r*.62*(1-S.plq*1.05*.6),ly=X.cy-(X.r*.7-rl)*.92*Math.min(1,S.plq*3.15);
      s+=`<circle cx="${f1(X.cx+Math.cos(a)*rl)}" cy="${f1(ly+Math.sin(a)*rl)}" r="1.8" style="fill:var(--clot);opacity:${f1(S.erode)}"/>`}}
    if(N){s+=`<text x="${f1(X.cx)}" y="${f1(X.cy+X.r+16)}" class="t-xs t-mid">lumen ${S.clot>.95?'blocked':S.plq>.35?'narrowed':'open'}</text>`}
    /* cap gauge */
    s+=gauge(G.x,G.y,G.w,capUm(t,S),S);
    if(N){s+=`<text x="${f1(G.x)}" y="${f1(G.y+54)}" class="t-xs">55 ruptured caps (below)</text><text x="${f1(G.x)}" y="${f1(G.y+67)}" class="t-xs">65 thin-cap fibroatheroma (below)</text><text x="${f1(G.x)}" y="${f1(G.y+80)}" class="t-xs">84 stable fibroatheroma (above)</text><text x="${f1(G.x)}" y="${f1(G.y+93)}" class="t-xs">169 mean erosion cap on OCT</text>`}
    else{s+=`<text x="${f1(G.x)}" y="${f1(G.y+40)}" class="t-xs">red: under 65 µm (TCFA)</text><text x="${f1(G.x)}" y="${f1(G.y+52)}" class="t-xs">ruptured &lt;55 · stable &gt;84</text><text x="${f1(G.x)}" y="${f1(G.y+64)}" class="t-xs">erosion, OCT mean: 169</text>`}
    /* timeline: decades, then minutes */
    const TY=N?496:346,x0=N?20:28,x1=N?380:692,xs=lerp(x0,x1,PL_SPLIT);
    s+=`<line x1="${f1(x0)}" x2="${f1(xs-4)}" y1="${TY}" y2="${TY}" class="axis" style="stroke-width:2"/><line x1="${f1(xs+4)}" x2="${f1(x1)}" y1="${TY}" y2="${TY}" class="axis" style="stroke-width:2"/><path d="M${f1(xs-7)} ${TY+6}l4 -12M${f1(xs+1)} ${TY+6}l4 -12" style="stroke:var(--muted);stroke-width:1.4"/>`;
    const ages=N?[10,30,50]:[10,20,30,40,50];ages.forEach(a=>{const xx=lerp(x0,xs,(a-10)/50);s+=`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${TY-4}" y2="${TY+4}" class="axis"/><text x="${f1(xx)}" y="${TY+17}" class="t-xs t-mid">${a===10?'age 10':a}</text>`});
    [0,30,60].forEach(m=>{const xx=lerp(xs,x1,m/60);s+=`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${TY-4}" y2="${TY+4}" class="axis"/><text x="${f1(xx)}" y="${TY+17}" class="t-xs t-mid">${m===0?'0':m+(m===60?' min':'')}</text>`});
    s+=`<text x="${f1(lerp(x0,xs,.5))}" y="${TY-10}" class="t-xs t-mid">decades</text><text x="${f1(lerp(xs,x1,.5))}" y="${TY-10}" class="t-xs t-mid">minutes</text>`;
    const mx=lerp(x0,x1,t);s+=`<circle cx="${f1(mx)}" cy="${TY}" r="6" style="fill:var(--brand);stroke:var(--panel);stroke-width:2"/>`;
    svg.innerHTML=s;
    const steps=PL_STEPS[mode],ph2=phaseOf(steps,t);note.innerHTML=noteHTML(steps[ph2]);setSt(ph2);
    const capTxt=t<.3?'not formed yet':S.er?'thick, intact':t<.5?'thick':t<PL_SPLIT?(t<.6?'thinning':'thin (TCFA range, &lt;65 µm)'):'torn';
    read.innerHTML=`<span>Lesion <b>${lesion(t,S)}</b></span><span>Cap <b>${capTxt}</b></span><span>Flow downstream <b>${S.clot>.95?'stopped':S.clot>.3?'falling':'normal'}</b></span>`;
  }
  const stop=playWire(rg,$('#plPlay'),draw,24000,'Replay','plaque');
  function wire(){const old=$('#plSteps'),nu=old.cloneNode(false);old.replaceWith(nu);setSt=stepWire(nu,PL_STEPS[mode],rg,draw,stop)}
  $$('[data-plm]').forEach(b=>b.addEventListener('click',()=>{stop();mode=b.dataset.plm;$$('[data-plm]').forEach(x=>x.setAttribute('aria-pressed',x===b));wire();draw(+rg.value)}));
  wire();draw(+rg.value);

  /* ---- comparator: stable vs vulnerable ---- */
  const cs=$('#plComp'),cn=$('#plCompNote');let view='angio';
  const CV={
   angio:{k:'View 1 · the angiogram',t:'Which plaque looks dangerous?',
    txt:'On an angiogram, dye fills the channel. Plaque A makes a tight waist; plaque B barely shows. Of 29 patients who had an angiogram before their MI, the artery that later blocked had been less than 50% narrowed in 19 (66%), and only 10 of the 29 MIs (34%) came from the artery with the most severe narrowing. [[Little1988]]',
    pt:'The tightest narrowing is not always the one that causes the heart attack.',
    hook:'About two-thirds of later MI culprit arteries had &lt;50% stenosis on the earlier angiogram. [[Little1988]]'},
   wall:{k:'View 2 · inside the wall',t:'Plaque B has grown outward',
    txt:'Thin-cap fibroatheromas usually show positive (outward) remodelling rather than severe narrowing; in more than 75% the lumen is less than 75% narrowed by area. [[Virmani2006]] Ruptured plaques go with expansive remodelling, a large necrotic core and a thin cap infiltrated by foamy macrophages. [[Falk2013]] Yet tight plaques matter too: in 295 autopsy plaques, more than 75% area stenosis was seen in 70% of ruptures and 40% of TCFAs. [[Narula2013]]',
    pt:'Plaque B hides its fat in the wall. Its lid is thin, so it is more likely to break even though the channel looks fine.',
    hook:'Vulnerable plaque features: thin cap, large necrotic core, macrophages, outward remodelling. [[Virmani2006,Falk2013,Narula2013]]'},
   follow:{k:'View 3 · follow-up',t:'What predicted the next event',
    txt:'In PROSPECT, 697 patients had intravascular ultrasound of all three coronary arteries after an acute coronary syndrome. Over 3 years, 20.4% had a major adverse event: 12.9% related to the original culprit lesions and 11.6% to other lesions. Those other lesions were usually mild on angiography (mean diameter stenosis 32.3%), but more often had plaque burden ≥70% (HR 5.03), a thin-cap appearance (HR 3.35) or a minimal lumen area ≤4.0 mm² (HR 3.21). [[Stone2011PROSPECT]]',
    pt:'Doctors can see these features with imaging inside the artery, but no test can say which plaque will cause the next heart attack. Lowering risk everywhere is the aim.',
    hook:'PROSPECT high-risk non-culprit features: plaque burden ≥70%, MLA ≤4.0 mm², TCFA. [[Stone2011PROSPECT]]'}};
  function angio(x,y,w,h,dep,lab,sub){let d='',d2='';const f=u=>1-dep*Math.exp(-Math.pow((u-.5)/.09,2));
    for(let i=0;i<=60;i++){const u=i/60,xx=x+u*w,hh=h/2*f(u);d+=(i?'L':'M')+f1(xx)+' '+f1(y+h/2-hh);d2=`L${f1(xx)} ${f1(y+h/2+hh)}`+d2}
    return `<path d="${d}${d2.replace(/^L/,'L')}Z" style="fill:var(--ink);opacity:.82"/><text x="${f1(x+w/2)}" y="${f1(y-12)}" class="t-lbl t-mid">${lab}</text><text x="${f1(x+w/2)}" y="${f1(y+h+20)}" class="t-sm t-mid">${sub}</text>`}
  function drawC(){const N=vb(cs,'720 330','400 560');let s='';
    if(view==='follow'){
      const ic=icons(N?24:30,N?60:64,{n:29,cols:N?10:15,size:N?26:24,gap:N?8:9,k:0,base:'var(--line)'});
      let g='';for(let i=0;i<29;i++){const p=ic.at(i),c=i<19?'var(--good)':i<28?'var(--warn)':'var(--bad)';g+=person(p[0]+(N?13:12),p[1],N?26:24,c)}
      s+=`<text x="${N?24:30}" y="30" class="t-lbl">29 patients: how narrowed was the artery that later blocked?</text>`.replace('29 patients: how narrowed was the artery that later blocked?',N?'Before the MI: how narrowed was the later culprit?':'29 patients: how narrowed was the artery that later blocked?');
      s+=g;const ly=N?232:180;
      s+=`<rect x="${N?24:30}" y="${ly}" width="12" height="12" rx="3" style="fill:var(--good)"/><text x="${N?42:48}" y="${ly+10}" class="t-sm" style="fill:var(--ink)">&lt;50% narrowed: 19 (66%)</text>`;
      s+=`<rect x="${N?24:250}" y="${N?ly+20:ly}" width="12" height="12" rx="3" style="fill:var(--warn)"/><text x="${N?42:268}" y="${N?ly+30:ly+10}" class="t-sm" style="fill:var(--ink)">50–69%: 9</text>`;
      s+=`<rect x="${N?24:380}" y="${N?ly+40:ly}" width="12" height="12" rx="3" style="fill:var(--bad)"/><text x="${N?42:398}" y="${N?ly+50:ly+10}" class="t-sm" style="fill:var(--ink)">≥70%: 1</text>`;
      /* PROSPECT hazard ratios */
      const bx=N?24:470,by=N?330:60,bw=N?330:220;s+=`<text x="${bx}" y="${by-20}" class="t-lbl">PROSPECT: features of later culprits</text>`;
      [['Plaque burden ≥70%',5.03],['Thin-cap appearance',3.35],['Lumen area ≤4.0 mm²',3.21]].forEach((r,i)=>{const yy=by+i*44,ww=bw*r[1]/6;
        s+=`<text x="${bx}" y="${yy+6}" class="t-sm" style="fill:var(--ink)">${r[0]}</text><rect x="${bx}" y="${yy+12}" width="${f1(ww)}" height="14" rx="4" style="fill:var(--brand);opacity:.8"/><text x="${f1(bx+ww+6)}" y="${yy+24}" class="t-sm" style="fill:var(--ink)">HR ${r[1]}</text>`});
      s+=`<line x1="${f1(bx+bw/6)}" x2="${f1(bx+bw/6)}" y1="${by+6}" y2="${by+3*44}" style="stroke:var(--muted);stroke-dasharray:3 3"/><text x="${f1(bx+bw/6)}" y="${by+3*44+12}" class="t-xs t-mid">HR 1</text>`;
      s+=`<text x="${N?24:30}" y="${N?530:300}" class="t-sm">Only 10 of the 29 MIs came from the most narrowed artery. [Little 1988]</text>`;
    }else{
      const wall=view==='wall';
      if(!wall){
        const a=N?{x:40,y:70,w:320,h:60}:{x:40,y:90,w:290,h:64},b=N?{x:40,y:300,w:320,h:60}:{x:390,y:90,w:290,h:64};
        s+=angio(a.x,a.y,a.w,a.h,.72,'Plaque A','tight waist: looks severe');
        s+=angio(b.x,b.y,b.w,b.h,.22,'Plaque B','barely visible: looks mild');
        s+=`<text x="${N?200:360}" y="${N?220:250}" class="t-sm t-mid">Dye fills only the channel (lumen), not the wall.</text>`;
      }else{
        const A=N?{cx:120,cy:150,r:78}:{cx:170,cy:160,r:88},B=N?{cx:120,cy:400,r:96}:{cx:500,cy:160,r:104};
        s+=`<text x="${A.cx}" y="${f1(A.cy-A.r-18)}" class="t-lbl t-mid">Plaque A: tight but stable</text>`;
        s+=xsec(A.cx,A.cy,A.r,{plaque:.82,cap:1}).svg;
        s+=`<text x="${B.cx}" y="${f1(B.cy-B.r-18)}" class="t-lbl t-mid">Plaque B: mild but vulnerable</text>`;
        s+=xsec(B.cx,B.cy,B.r,{plaque:.3,cap:0}).svg;
        /* B's bigger core, drawn over: it has grown outward into the wall */
        s+=`<ellipse cx="${B.cx}" cy="${f1(B.cy+B.r*.42)}" rx="${f1(B.r*.42)}" ry="${f1(B.r*.2)}" style="fill:var(--core);opacity:.75"/>`;
        s+=`<circle cx="${B.cx}" cy="${B.cy}" r="${f1(B.r+5)}" style="fill:none;stroke:var(--muted);stroke-dasharray:4 4"/>`;
        const T=(x,y,t2,anc)=>`<text x="${f1(x)}" y="${f1(y)}" class="t-sm ${anc||''}" style="fill:var(--ink)">${t2}</text>`;
        if(N){s+=T(214,120,'thick cap')+T(214,136,'(stable: &gt;84 µm)')+T(214,158,'small core')+T(214,174,'lumen narrowed');
          s+=T(228,370,'thin cap')+T(228,386,'(TCFA: &lt;65 µm)')+T(228,408,'large necrotic core')+T(228,424,'outward remodelling')+T(228,440,'lumen nearly normal')}
        else{s+=T(70,290,'thick cap (stable fibroatheromas: &gt;84 µm)')+T(70,306,'small core · lumen narrowed');
          s+=T(400,300,'thin cap (TCFA: &lt;65 µm) · large core')+T(400,316,'grown outward · lumen nearly normal')}
      }
    }
    cs.innerHTML=s;cn.innerHTML=noteHTML(CV[view]);}
  $$('[data-plv]').forEach(b=>b.addEventListener('click',()=>{view=b.dataset.plv;$$('[data-plv]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawC()}));
  drawC();
  const prevR=redraws.plaque;redraws.plaque=()=>{prevR&&prevR();drawC()};
};
