/* =============== 3.4 Thiamine, Wernicke and Korsakoff =============== */
const WE_STEPS=[
 {from:0,at:.1,k:'Scene 1 · The store',t:'A store that runs low'},
 {from:.2,at:.31,k:'Scene 2 · The brain',t:'Vulnerable brain regions'},
 {from:.4,at:.52,k:'Scene 3 · Glucose',t:'Glucose and thiamine'},
 {from:.6,at:.73,k:'Scene 4 · The signs',t:'The triad is rarely complete'},
 {from:.8,at:.93,k:'Scene 5 · Memory',t:'Korsakoff syndrome'}];
/* Harper 1986: 131 necropsy cases; 16% had the classic triad, 19% no documented signs, 80% not diagnosed in life */
const WE_N=131,WE_TRIAD=Math.round(WE_N*.16),WE_NONE=Math.round(WE_N*.19),WE_MISSED=Math.round(WE_N*.8);
/* small glyphs for the three classic signs */
function weGlyph(kind,x,y,s,col,op){let g=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})" style="opacity:${f1(op)}">`;
  if(kind==='conf')g+=`<circle r="15" style="fill:var(--panel);stroke:${col};stroke-width:1.6"/><path d="M0 0m-7 0a7 5 0 1 1 7 5a4 3 0 1 1 -3.5 -2.4" style="fill:none;stroke:${col};stroke-width:1.8;stroke-linecap:round"/><text y="5" x="8" style="font:700 9px var(--body);fill:${col}">?</text>`;
  if(kind==='atax')g+=`<circle r="15" style="fill:var(--panel);stroke:${col};stroke-width:1.6"/>`+[[-6,7,-20],[3,1,25],[-4,-6,-15],[5,-11,20]].map(([a,b,r])=>`<ellipse cx="${a}" cy="${b}" rx="2.6" ry="4.2" transform="rotate(${r} ${a} ${b})" style="fill:${col}"/>`).join('');
  if(kind==='eye')g+=`<circle r="15" style="fill:var(--panel);stroke:${col};stroke-width:1.6"/><path d="M-10 0Q0 -8 10 0Q0 8 -10 0Z" style="fill:none;stroke:${col};stroke-width:1.6"/><circle cx="3.5" cy="0" r="2.8" style="fill:${col}"/><path d="M-6 -10.5h-4M-10 -10.5l2 -2M-10 -10.5l2 2M6 10.5h4M10 10.5l-2 -2M10 10.5l-2 2" style="stroke:${col};stroke-width:1.2;fill:none;stroke-linecap:round"/>`;
  return g+'</g>'}
function weNote(i,thi){const o=Object.assign({},WE_STEPS[i]);o.k+=thi?' · thiamine given early':' · no thiamine yet';
  if(i===0){o.t='A store that runs low';
    o.txt=`Wernicke encephalopathy is an acute neuropsychiatric syndrome caused by thiamine deficiency. [[Sechi2007]] In modern cohorts at least 90% of people with Wernicke encephalopathy or Korsakoff syndrome have heavy alcohol use. [[Arts2017]] ASAM 2020 prefers thiamine by injection (IV or IM) for people with poor nutrition, malabsorption or severe complications, and the Royal College of Physicians advises B vitamins at the outset for people with chronic heavy drinking and a suspected poor diet. [[ASAM2020Withdrawal,Thomson2002RCP]]`+(thi?' Here the toggle refills the store from scene 3 on.':' Press <b>Give thiamine early</b> to compare.');
    o.pt='Heavy drinking can use up vitamin B1 (thiamine). When too little comes in and too little is absorbed, the body\'s store runs low. [[Galvin2010EFNS,Sechi2007]]';
    o.hook='The first Caine criterion is dietary deficiency: ask about eating, not only drinking. [[Caine1997]]'}
  if(i===1){o.t='Vulnerable brain regions';
    o.txt=`Korsakoff syndrome is linked to lesions of the mammillary bodies and the anterior thalamus, highlighted here. [[Kopelman2009,Arts2017]] In active Wernicke encephalopathy at autopsy in Oslo, stupor and coma dominated the clinical picture. [[Torvik1982]] MRI supports the diagnosis (sensitivity 53%, specificity 93% in 15 patients), but a normal scan does not exclude it, and CT "proved not useful". [[Antunez1998,Galvin2010EFNS]] In severe withdrawal with delirium tremens, telling DT and Wernicke encephalopathy apart can be hard. [[Jesse2017]]`;
    o.pt='Low thiamine harms small, deep parts of the brain that help lay down new memories and keep balance and eye movements steady.';
    o.hook='Mammillary bodies + anterior thalamus = the Korsakoff lesions. A normal MRI does not rule out Wernicke encephalopathy. [[Arts2017,Antunez1998]]'}
  if(i===2){o.t=thi?'Glucose with thiamine':'Glucose without thiamine';
    o.txt=`The older rule, kept by EFNS 2010, is thiamine before any carbohydrate-containing fluid or food. ASAM 2020 says thiamine and glucose may be given "in any order or concurrently". [[Galvin2010EFNS,ASAM2020Withdrawal]] The evidence behind the old rule is case reports: prolonged glucose without thiamine may be a risk factor, so low blood sugar should be treated at once, with thiamine promptly after or alongside. [[Schabelman2012]] <span class="ev early">Early evidence</span> In 120 emergency visits where dextrose came first, no Wernicke encephalopathy was found within 90 days. [[Jasti2025]] The US injection label says people with marginal thiamine status receiving dextrose "should receive 100 mg thiamine hydrochloride in each of the first few liters of IV fluid" (quoted, not an instruction). [[FDA-ThiamineInj]]`;
    o.pt='Low blood sugar is treated straight away. Thiamine is given promptly too: today the guidance is not to delay either one.';
    o.hook='EFNS: thiamine before carbohydrate. ASAM 2020: either order, or together. Never delay glucose for hypoglycaemia. [[Galvin2010EFNS,ASAM2020Withdrawal,Schabelman2012]]'}
  if(i===3){o.t='The triad is rarely complete';
    o.txt=`In 131 cases diagnosed at autopsy, 80% had not been diagnosed in life, only 16% had the classic triad of confusion, ataxia and eye-movement problems, and 19% had no documented clinical signs at all. [[Harper1986JNNP]] A later review says Wernicke encephalopathy usually (in 50–70%) has an "unobtrusive" course, and most cases are missed because the classic signs are absent. [[Arts2017,IsenbergGrzeda2012]] That is why the Caine criteria need only 2 of 4 signs (checklist below). [[Caine1997]]`+(thi?' The earlier thiamine is started, the faster the recovery, whatever the first presentation. [[Jesse2017]]':'');
    o.pt='Most people with Wernicke encephalopathy do not show all three classic signs. That is why thiamine is given whenever the risk is there, without waiting for the full picture.';
    o.hook='Classic triad in only 16% at autopsy (Harper 1986); 80% missed in life. Caine: 2 of 4 (diet, eyes, cerebellum, mental state). [[Harper1986JNNP,Caine1997]]'}
  if(i===4){o.t=thi?'A memory disorder that can be prevented':'Korsakoff syndrome';
    o.txt=`Korsakoff syndrome is a preventable memory disorder that usually follows an episode of Wernicke encephalopathy. Episodic memory (remembering events) is badly affected while implicit memory (skills, habits) is preserved, and people can learn in a calm, structured, cued setting. [[Kopelman2009]] How often Wernicke encephalopathy leads to Korsakoff syndrome is uncertain: the often-quoted 84% comes from one monograph and was not meant as a general estimate; a later study found 56%, and Arts calls the higher figure "an unreliably high estimation". [[Arts2017]] When the deficiency comes without heavy drinking, Korsakoff syndrome rarely follows treatment. [[Thomson2006Natural]]`;
    o.pt='Korsakoff syndrome makes new memories slip away, but skills stay. With structure and memory aids people can still learn routines. [[Kopelman2009,Arts2017]]';
    o.hook='Korsakoff = severe anterograde episodic memory loss with confabulation, a residual syndrome after Wernicke encephalopathy. [[Kopelman2009,Arts2017]]'}
  return o}

inits.wernicke=()=>{
  const svg=$('#weSvg'),rg=$('#weT');let thi=false;
  const level=t=>{let v=lerp(.9,.36,ease(ramp(t,0,.2)));v=lerp(v,.22,ease(ramp(t,.2,.4)));
    if(thi)v=lerp(v,.82,ease(ramp(t,.42,.6)));else v=lerp(v,.07,ease(ramp(t,.42,.58)));return v};
  /* the grid order: triad cases first, then partial signs, then no documented signs */
  const GR=rng(34),ORD=[...Array(WE_N).keys()].sort(()=>GR()-.5);
  function draw(t){
    const N=vb(svg,'720 400','400 676'),ph=phaseOf(WE_STEPS,t),lv=level(t),glow=clamp(ramp(.4-lv,0,.3));let s='';
    /* ---- tank ---- */
    const T=N?{x:28,y:62,w:74,h:170}:{x:44,y:70,w:92,h:220};
    s+=`<text x="${T.x+T.w/2}" y="${T.y-38}" class="t-sm t-mid" style="font-weight:600">THIAMINE STORE</text>`;
    const inflow=thi&&t>.42?1:lerp(.9,.15,ramp(t,0,.2));
    s+=tank(T.x,T.y,T.w,T.h,lv,{low:.3,inflow,outflow:.2+.8*ramp(t,0,.2)*(thi&&t>.45?.3:1),label:'',sub:''});
    for(let i=0;i<Math.round(lv*14);i++){const cx=T.x+12+(i%4)*((T.w-24)/3),cy=T.y+T.h-12-Math.floor(i/4)*16;s+=mol(cx,cy,'thi',{r:4,op:.9})}
    s+=`<text x="${T.x+T.w/2}" y="${T.y+T.h+(N?50:46)}" class="t-big t-mid" style="fill:${lv<.3?'var(--bad)':'var(--ink)'}">${Math.round(lv*100)}%</text><text x="${T.x+T.w/2}" y="${T.y+T.h+(N?63:60)}" class="t-xs t-mid">schematic level</text>`;
    const lx=T.x+T.w+8;
    s+=`<text x="${T.x+T.w/2+12}" y="${T.y-12}" class="t-xs" style="fill:${thi&&t>.42?'var(--thi)':'var(--muted)'}">${thi&&t>.42?'+ thiamine IV/IM':N?'poor diet':'less in: poor diet'}</text><text x="${T.x+T.w/2+12}" y="${T.y+T.h+20}" class="t-xs">${N?'malabsorption':'less kept: malabsorption'}</text>`;
    /* ---- brain ---- */
    const B=N?{x:282,y:150,s:1.12}:{x:300,y:176,s:1.45};
    const hb=brain(B.x,B.y,B.s,{hl:{mb:glow*ramp(t,.15,.3),thal:glow*ramp(t,.15,.3)*.85}});
    s+=hb.svg;
    if(t>=.18){const lab=(k,txt,lx,ly,anc)=>{const [ax,ay]=hb.at[k];return `<line x1="${f1(ax)}" y1="${f1(ay)}" x2="${f1(lx)}" y2="${f1(ly-10)}" style="stroke:var(--muted);stroke-width:.8"/><text x="${f1(lx)}" y="${f1(ly)}" class="t-xs ${anc}" style="fill:var(--ink)">${txt}</text>`};
      s+=lab('mb','Mammillary bodies',B.x-(N?62:84),B.y+(N?76:86),'t-mid')+lab('thal','Thalamus',B.x+(N?70:96),B.y+(N?76:86),'t-mid')}
    s+=`<text x="${B.x}" y="${N?B.y-92:B.y-108}" class="t-sm t-mid" style="font-weight:600">${N?'BRAIN AT RISK':'BRAIN REGIONS AT RISK'}</text>`;
    if(t>=.2&&glow>.05)s+=`<text x="${B.x}" y="${f1(B.y+(N?94:106))}" class="t-xs t-mid" style="fill:var(--bad)">${N?'low thiamine: these glow':'low thiamine: mammillary bodies and thalamus glow'}</text>`;
    if(thi&&t>.5)s+=`<text x="${B.x}" y="${f1(B.y+(N?94:106))}" class="t-xs t-mid" style="fill:var(--good)">thiamine given: glow fades (schematic)</text>`;
    /* ---- right panel: changes with the scene ---- */
    const P=N?{x:16,y:330,w:368,h:334}:{x:448,y:40,w:262,h:340};
    s+=`<rect x="${P.x}" y="${P.y}" width="${P.w}" height="${P.h}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    const px=P.x+14,pw=P.w-28;let py=P.y+24;
    if(ph===0){s+=`<text x="${px}" y="${py}" class="t-sm" style="font-weight:600">WHY THE STORE RUNS LOW</text>`;py+=26;
      [['Heavy drinking can use up thiamine','Galvin 2010, Sechi 2007'],['Poor nutrition: less comes in','ASAM 2020'],['Malabsorption: less is taken up','ASAM 2020'],['More than 90% of Wernicke-Korsakoff cases: alcohol dependence','Dingwall 2022']].forEach(([a,b],i)=>{const op=clamp(ramp(t,i*.04,i*.04+.05));
        const L=dxWrap(a,N?50:34);s+=`<circle cx="${px+5}" cy="${py-4}" r="4" style="fill:var(--thi-fill);opacity:${f1(op)}"/>`;L.forEach((l,j)=>s+=`<text x="${px+16}" y="${py+j*14}" style="font:700 12px var(--body);fill:var(--ink);opacity:${f1(op)}">${l}</text>`);py+=L.length*14;s+=`<text x="${px+16}" y="${py}" class="t-xs" style="opacity:${f1(op)}">${b}</text>`;py+=22});}
    if(ph===1){s+=`<text x="${px}" y="${py}" class="t-sm" style="font-weight:600">MRI IN ACUTE WE (15 PATIENTS)</text>`;py+=22;
      [['sensitivity',53,'var(--accent)'],['specificity',93,'var(--rx)']].forEach(([l,v,c])=>{const w=pw*v/100*ease(ramp(t,.2,.3));s+=`<text x="${px}" y="${py+10}" class="t-xs">${l}</text><rect x="${px+78}" y="${py}" width="${f1(pw-78)}" height="14" rx="4" style="fill:var(--panel-2)"/><rect x="${px+78}" y="${py}" width="${f1(w*(pw-78)/pw)}" height="14" rx="4" style="fill:${c}"/><text x="${f1(px+82+w*(pw-78)/pw)}" y="${py+11}" class="t-xs" style="fill:var(--ink)">${v}%</text>`;py+=26});
      py+=10;['A normal MRI does not exclude it;','CT "proved not useful".','Lesions linked to Korsakoff:','mammillary bodies, anterior thalamus.'].forEach((l,i)=>{s+=`<text x="${px}" y="${py}" style="font:${i===2?700:400} 12px var(--body);fill:var(--ink)">${l}</text>`;py+=17});
      s+=`<text x="${px}" y="${P.y+P.h-14}" class="t-xs">Antunez 1998; Kopelman 2009; Arts 2017</text>`}
    if(ph===2){/* glucose bag dripping toward the tank */
      const bx=px+pw-70,by=py+4;s+=`<rect x="${bx}" y="${by}" width="56" height="74" rx="10" style="fill:var(--panel);stroke:var(--brain-line);stroke-width:1.5"/><rect x="${bx+4}" y="${by+26}" width="48" height="44" rx="7" style="fill:var(--eth-soft)"/><text x="${bx+28}" y="${by+18}" class="t-xs t-mid" style="fill:var(--ink)">glucose</text><line x1="${bx+28}" y1="${by+74}" x2="${bx+28}" y2="${by+104}" style="stroke:var(--brain-line);stroke-width:2"/>`;
      const u=ramp(t,.4,.6);for(let i=0;i<6;i++){const f=(u*3+i/6)%1,dy=by+80+f*24;s+=`<path d="M${bx+28} ${f1(dy)}q3 4 0 6q-3 -2 0 -6Z" style="fill:var(--eth-fill);opacity:${f1(u>0?.9:0)}"/>`}
      if(thi){s+=`<rect x="${bx-70}" y="${by+8}" width="52" height="52" rx="9" style="fill:var(--panel);stroke:var(--thi);stroke-width:1.5"/><text x="${bx-44}" y="${by+30}" class="t-xs t-mid" style="fill:var(--thi)">thiamine</text><text x="${bx-44}" y="${by+44}" class="t-xs t-mid" style="fill:var(--thi)">IV/IM</text>`}
      else s+=`<text x="${px}" y="${by+40}" style="font:700 12px var(--body);fill:var(--bad)">No thiamine yet:</text><text x="${px}" y="${by+56}" class="t-xs" style="fill:var(--bad)">the store drains further</text><text x="${px}" y="${by+70}" class="t-xs" style="fill:var(--bad)">(case-report evidence)</text>`;
      let gy=by+128;[['EFNS 2010','thiamine before any','carbohydrate','var(--accent)'],['ASAM 2020','"in any order or','concurrently"','var(--rx)']].forEach(([a,b,c,col])=>{s+=`<rect x="${px}" y="${gy}" width="${pw}" height="50" rx="9" style="fill:var(--panel);stroke:${col};stroke-width:1.4"/><text x="${px+10}" y="${gy+18}" style="font:700 12px var(--body);fill:${col}">${a}</text><text x="${px+10}" y="${gy+32}" class="t-xs" style="fill:var(--ink)">${b}</text><text x="${px+10}" y="${gy+44}" class="t-xs" style="fill:var(--ink)">${c}</text>`;gy+=58});
      if(gy<P.y+P.h-4)s+=`<text x="${px}" y="${P.y+P.h-12}" class="t-xs">Never delay glucose for low blood sugar.</text>`}
    if(ph===3){const g=[['conf','confusion'],['atax','ataxia'],['eye','eye signs']];const u=ramp(t,.6,.75);
      g.forEach(([k,l],i)=>{const gx=px+24+i*(pw-48)/2,op=clamp(ramp(t,.6+i*.02,.63+i*.02));s+=weGlyph(k,gx,py+6,1,'var(--accent)',op)+`<text x="${f1(gx)}" y="${py+36}" class="t-xs t-mid" style="opacity:${f1(op)}">${l}</text>`});
      const cols=N?16:12,cell=N?Math.min(20,pw/cols):pw/cols,gy=py+54;let nT=0,nN=0;const shown=Math.round(WE_N*u);
      ORD.forEach((id,j)=>{const cx=px+(j%cols)*cell+cell/2,cy=gy+Math.floor(j/cols)*cell+cell/2;const k=id<WE_TRIAD?'tri':id<WE_TRIAD+WE_NONE?'none':'part';const on=j<shown;
        if(on){if(k==='tri')nT++;if(k==='none')nN++}
        const fill=!on?'var(--panel-2)':k==='tri'?'var(--accent)':k==='none'?'var(--panel)':'var(--muted)';
        s+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(cell*.36)}" style="fill:${fill};stroke:${on&&k==='none'?'var(--muted)':'none'};stroke-width:1;opacity:${on&&k==='part'?.45:1}"/>`});
      const ly=gy+Math.ceil(WE_N/cols)*cell+16;
      s+=`<circle cx="${px+5}" cy="${ly-4}" r="4.5" style="fill:var(--accent)"/><text x="${px+14}" y="${ly}" class="t-xs" style="fill:var(--ink)">all three: ${nT} (16%)</text><circle cx="${px+(N?140:5)}" cy="${(N?ly:ly+16)-4}" r="4.5" style="fill:var(--panel);stroke:var(--muted)"/><text x="${px+(N?149:14)}" y="${N?ly:ly+16}" class="t-xs" style="fill:var(--ink)">no signs recorded: ${nN} (19%)</text>`;
      s+=`<text x="${px}" y="${N?ly+18:ly+34}" class="t-xs" style="fill:var(--bad)">not diagnosed in life: ${Math.round(WE_MISSED*u)} of 131 (80%)</text><text x="${px}" y="${N?ly+32:ly+48}" class="t-xs">Harper 1986, 131 autopsy cases</text>`}
    if(ph===4){const u=ramp(t,.8,.95);s+=`<text x="${px}" y="${py}" class="t-sm" style="font-weight:600">MEMORY ${thi?'(PROTECTED)':'IN KORSAKOFF SYNDROME'}</text>`;py+=26;
      s+=`<text x="${px}" y="${py}" style="font:700 12px var(--body);fill:var(--ink)">New events (episodic memory)</text>`;py+=14;
      for(let i=0;i<10;i++){const born=i/10,age=u-born;if(age<0)continue;const fade=thi?1:clamp(1-age*4.5);const cx=px+10+i*(pw-20)/9;s+=`<circle cx="${f1(cx)}" cy="${py+8}" r="7" style="fill:var(--thal);opacity:${f1(.15+.85*fade)}"/>`;if(!thi&&fade<.2)s+=`<circle cx="${f1(cx)}" cy="${py+8}" r="7" style="fill:none;stroke:var(--muted);stroke-dasharray:2 2"/>`}
      py+=32;s+=`<text x="${px}" y="${py}" style="font:700 12px var(--body);fill:var(--ink)">Skills and habits (implicit memory)</text>`;py+=10;
      s+=`<rect x="${px}" y="${py}" width="${f1(pw*u)}" height="12" rx="4" style="fill:var(--rx)"/>`;py+=30;
      s+=`<text x="${px}" y="${py}" class="t-xs" style="fill:var(--ink)">How often WE leads to Korsakoff syndrome:</text>`;py+=12;
      [['84% (one monograph; "unreliably high")',84,'var(--muted)'],['56% (a later study)',56,'var(--accent)']].forEach(([l,v,c])=>{s+=`<rect x="${px}" y="${py}" width="${f1(pw*v/100*ease(u))}" height="12" rx="3" style="fill:${c}"/><text x="${px}" y="${py+24}" class="t-xs">${l}</text>`;py+=36});
      s+=`<text x="${px}" y="${P.y+P.h-12}" class="t-xs">Kopelman 2009; Arts 2017</text>`}
    svg.innerHTML=s;setSt(ph);
    $('#weRead').innerHTML=`<span>scene <b>${WE_STEPS[ph].t}</b></span><span>thiamine store <b>${Math.round(lv*100)}%</b> (schematic)</span><span>thiamine <b>${thi?'given early':'not yet given'}</b></span>`;
    $('#weNote').innerHTML=noteHTML(weNote(ph,thi));
  }
  const stop=playWire(rg,$('#wePlay'),draw,22000,'Replay','wernicke');
  const setSt=stepWire($('#weSteps'),WE_STEPS,rg,draw,stop);
  $('#weThi').addEventListener('click',()=>{thi=!thi;$('#weThi').setAttribute('aria-pressed',thi);draw(+rg.value)});
  draw(+rg.value);

  /* ---- Caine checklist ---- */
  const cs=$('#weCaineSvg'),CK={diet:false,eye:false,cbl:false,mind:false,he:false};
  const TILES=[['diet','Dietary','deficiency'],['eye','Eye','signs'],['cbl','Cerebellar','dysfunction'],['mind','Mental state','or memory']];
  function drawC(){const N=vb(cs,'720 260','400 400');let s='';const n=['diet','eye','cbl','mind'].filter(k=>CK[k]).length,tri=['eye','cbl','mind'].filter(k=>CK[k]).length;
    const tw=N?176:150,th=N?62:70,gap=N?12:20,x0=N?18:40,y0=N?40:50;
    const pos=i=>N?[x0+(i%2)*(tw+gap),y0+Math.floor(i/2)*(th+gap)]:[x0+i*(tw+gap),y0];
    /* triad bracket over tiles 2-4 (wide) */
    if(!N){const a=pos(1)[0],b=pos(3)[0]+tw;s+=`<path d="M${a} ${y0-8}v-8H${b}v8" style="fill:none;stroke:var(--accent);stroke-width:1.4"/><text x="${(a+b)/2}" y="${y0-22}" class="t-xs t-mid" style="fill:var(--accent)">classic triad: all three needed</text>`}
    else s+=`<text x="${x0}" y="${y0-14}" class="t-xs" style="fill:var(--accent)">classic triad = the three tiles marked ▲</text>`;
    TILES.forEach(([k,a,b],i)=>{const [x,y]=pos(i),on=CK[k];
      s+=`<rect x="${x}" y="${y}" width="${tw}" height="${th}" rx="10" style="fill:${on?'var(--accent-soft)':'var(--panel-2)'};stroke:${on?'var(--accent)':'var(--line)'};stroke-width:${on?2:1}"/>`;
      s+=`<text x="${x+14}" y="${y+26}" style="font:700 13px var(--body);fill:var(--ink)">${a}</text><text x="${x+14}" y="${y+44}" class="t-xs">${b}</text>`;
      s+=`<circle cx="${x+tw-18}" cy="${y+20}" r="9" style="fill:${on?'var(--accent)':'none'};stroke:${on?'var(--accent)':'var(--muted)'};stroke-width:1.5"/>${on?`<path d="M${x+tw-22} ${y+20}l3 3l6 -6" style="fill:none;stroke:var(--panel);stroke-width:2;stroke-linecap:round"/>`:''}`;
      if(N&&k!=='diet')s+=`<text x="${x+tw-12}" y="${y+th-8}" class="t-xs t-end" style="fill:var(--accent)">▲</text>`});
    /* two meters */
    const my=N?y0+2*(th+gap)+20:y0+th+46,mw=N?364:300;
    const meter=(x,y,lab,k,need,tot,col)=>{let m=`<text x="${x}" y="${y}" style="font:700 12px var(--body);fill:var(--ink)">${lab}</text>`;const sw=(mw-(tot-1)*6)/tot;
      for(let i=0;i<tot;i++)m+=`<rect x="${f1(x+i*(sw+6))}" y="${y+8}" width="${f1(sw)}" height="16" rx="4" style="fill:${i<k?col:'var(--panel-2)'};stroke:${i===need-1?'var(--ink)':'none'};stroke-width:1.4"/>`;
      m+=`<text x="${x}" y="${y+40}" class="t-xs" style="fill:${k>=need?col:'var(--muted)'}">${k} of ${tot} · ${k>=need?'met':'not met'} (needs ${need})</text>`;return m};
    s+=meter(x0,my,'Caine rule: 2 of 4',n,2,4,'var(--accent)');
    s+=meter(N?x0:x0+mw+60,N?my+62:my,'Classic triad: 3 of 3',tri,3,3,'var(--rx)');
    cs.innerHTML=s;
    const he=CK.he;
    $('#weCaineOut').innerHTML=`<div class="verdict ${n>=2?'yes':'no'}">Caine (2 of 4): ${n} of 4 ticked · ${n>=2?'meets the operational criteria in this imaginary case':'does not meet them'}</div>`+
      `<div class="verdict ${tri===3?'yes':'maybe'}">Classic triad: ${tri} of 3 · ${tri===3?'complete, as in only 16% of autopsy cases':'incomplete, as in most real cases'}</div>`+
      (he?`<div class="verdict maybe">Hepatic encephalopathy: in Caine's study, Wernicke encephalopathy was under-recognised only when hepatic encephalopathy was also present (50% sensitivity). [[Caine1997]]</div>`:'')+
      `<p class="stage-cap">Caine 1997 tested the rule on 106 cases from a necropsy sample; rater classification was 100% reliable. EFNS 2010 adopted the 2-of-4 rule for people with heavy alcohol use (Level B). A teaching tool only: not a diagnosis and not for checking yourself or anyone else. If someone who drinks heavily is confused, very unsteady or has odd eye movements, get medical help. [[Caine1997,Galvin2010EFNS]]</p>`}
  $$('[data-wc]').forEach(b=>b.addEventListener('change',()=>{CK[b.dataset.wc]=b.checked;b.closest('label').classList.toggle('on',b.checked);drawC()}));
  drawC();
  const prevR=redraws.wernicke;redraws.wernicke=()=>{prevR&&prevR();drawC()};
};
