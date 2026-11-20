/* =============== 4.3 Stents or bypass? Revascularisation choices =============== */
inits.cabg=()=>{
  const svg=$('#cbSvg'),rg=$('#cbT');
  /* grafts in the heart kit's local 200 x 200 box: cubic Bezier [p0, c1, c2, p1] */
  const GR={
    lima:{seg:[[132,2],[170,12],[152,92],[125,128]],col:'var(--rx)',lab:'LIMA → LAD'},
    svgR:{seg:[[88,50],[48,38],[16,104],[48,152]],col:'var(--accent)',lab:'vein → RCA'},
    svgL:{seg:[[95,40],[142,26],[182,62],[161,104]],col:'var(--accent)',lab:'vein → LCx'},
    svgA:{seg:[[92,44],[112,40],[134,90],[125,128]],col:'var(--accent)',lab:'vein → LAD'}
  };
  Object.values(GR).forEach(g=>g.P=bezPts([g.seg],40));
  const THREE=[['lad',.36],['lcx',.42],['rca',.36]];
  const CLR={pci:'var(--accent)',cabg:'var(--rx)',oth:'var(--muted)',vein:'var(--accent)',lima:'var(--rx)'};
  const SC=[
    {L:'Primary PCI',R:'Bypass (CABG)',les:[['lad',.3,1]],pci:1,gr:[],rn:'if PCI is not feasible or has failed',
     bars:[{m:'Short-term death',a:[['Primary PCI',7,'pci'],['Fibrinolysis',9,'oth']]},{m:'Reinfarction',a:[['Primary PCI',3,'pci'],['Fibrinolysis',7,'oth']]},{m:'Stroke',a:[['Primary PCI',1,'pci'],['Fibrinolysis',2,'oth']]}],
     src:'23 RCTs, primary PCI vs fibrinolysis [[Keeley2003]]'},
    {L:'PCI: three stents',R:'CABG: three grafts',les:THREE,pci:1,gr:['lima','svgR','svgL'],
     bars:[{m:'MACCE at 1 year',a:[['PCI',17.8,'pci'],['CABG',12.4,'cabg']]},{m:'Repeat revascularisation, 1 year',a:[['PCI',13.5,'pci'],['CABG',5.9,'cabg']]},{m:'Stroke, 1 year',a:[['PCI',.6,'pci'],['CABG',2.2,'cabg']]},{m:'Death at 10 years, three-vessel',a:[['PCI',28,'pci'],['CABG',21,'cabg']]}],
     src:'SYNTAX [[Serruys2009SYNTAX,Thuijs2019SYNTAXES]]'},
    {L:'PCI: left main stent',R:'CABG: LIMA + vein',les:[['lm',.5]],pci:1,gr:['lima','svgL'],
     bars:[{m:'EXCEL 5 y: death, stroke or MI',a:[['PCI','22.0','pci'],['CABG',19.2,'cabg']]},{m:'EXCEL 5 y: all-cause death',a:[['PCI','13.0','pci'],['CABG',9.9,'cabg']]},{m:'NOBLE 5 y: MACCE',a:[['PCI',28,'pci'],['CABG',19,'cabg']]},{m:'NOBLE 5 y: all-cause death',a:[['PCI',9,'pci'],['CABG',9,'cabg']]},{m:'SYNTAX 10 y: death, left main',a:[['PCI',27,'pci'],['CABG',28,'cabg']]}],
     src:'EXCEL, NOBLE, SYNTAX [[Stone2019EXCEL,Holm2020NOBLE,Thuijs2019SYNTAXES]]'},
    {L:'PCI: four stents',R:'CABG: three grafts',les:[['lad',.3],['lad',.62],['lcx',.42],['rca',.36]],pci:1,gr:['lima','svgR','svgL'],dm:1,
     bars:[{m:'FREEDOM 5 y: death, MI or stroke',a:[['PCI',26.6,'pci'],['CABG',18.7,'cabg']]},{m:'FREEDOM: stroke',a:[['PCI',2.4,'pci'],['CABG',5.2,'cabg']]},{m:'Pooled trials 5 y: death, diabetes + multivessel',a:[['PCI',15.5,'pci'],['CABG','10.0','cabg']]}],
     src:'FREEDOM; pooled 11 trials [[Farkouh2012FREEDOM,Head2018]]'},
    {L:'Vein grafts only',R:'Mammary artery to LAD',les:THREE,pci:0,grL:['svgA','svgR','svgL'],gr:['lima','svgR','svgL'],
     bars:[{m:'10-year survival, three-vessel',a:[['Vein grafts only','71.0','vein'],['Mammary graft',82.6,'lima']]},{m:'ART 10 y: death',a:[['Two mammary grafts',20.3,'lima'],['One mammary graft',21.2,'oth']]}],
     src:'Loop 1986; ART [[Loop1986,Taggart2019ART]]'},
    {L:'Angioplasty',R:'Emergency CABG',les:[['lad',.3,1]],pci:1,gr:['lima'],shock:1,
     bars:[{m:'SHOCK: how early revascularisation was done',a:[['Angioplasty',55,'pci'],['CABG',38,'cabg']]},{m:'CABG after MI, New York: in-hospital death',a:[['within 6 h',11.8,'cabg'],['6 h to 1 day',9.5,'cabg'],['after 1 day',2.8,'cabg']]}],
     src:'SHOCK; New York State [[Hochman2001SHOCK1y,Lee2001CABGtiming]]'}
  ];
  const STEPS=[
    {k:'Acute MI · one artery',t:'One blocked artery',
     txt:`During a heart attack the blocked (culprit) artery is usually reopened with primary PCI: a wire, a balloon and a stent, through an artery in the wrist or groin. Across 23 randomised trials, primary PCI beat clot-dissolving drugs: short-term death 7% vs 9%, reinfarction 3% vs 7%, stroke 1% vs 2%. [[Keeley2003]] Bypass surgery is the back-up: ESC 2023 says "Emergency coronary artery bypass grafting (CABG) surgery should be considered for patients" in whom PCI is not feasible or has failed (quoted in part). [[Byrne2023ESC]]`,
     pt:`Doctors open a blocked heart artery with a thin tube, a tiny balloon and a mesh tube (stent), usually through the wrist. [[Keeley2003,Valgimigli2015MATRIX]]`,
     hook:`Primary PCI vs fibrinolysis (23 RCTs): death 7% vs 9%, reinfarction 3% vs 7%, stroke 1% vs 2%. [[Keeley2003]]`},
    {k:'Stable disease · three vessels',t:'Three-vessel disease',
     txt:`SYNTAX randomised 1,800 people with three-vessel or left main disease to PCI or CABG; acute MI was excluded. At 1 year, major adverse cardiac or cerebrovascular events (MACCE) were 17.8% with PCI vs 12.4% with CABG, mainly from repeat revascularisation (13.5% vs 5.9%), while stroke was higher with CABG (2.2% vs 0.6%). [[Serruys2009SYNTAX]] At 10 years, all-cause death was 28% vs 24% overall (HR 1.19, 95% CI 0.99–1.43) and 28% vs 21% in three-vessel disease (HR 1.42). [[Thuijs2019SYNTAXES]]`,
     pt:`With many narrowed arteries, surgery meant fewer repeat procedures and, in three-vessel disease, fewer deaths over 10 years, but a little more stroke early on. [[Serruys2009SYNTAX,Thuijs2019SYNTAXES]]`,
     hook:`SYNTAX: PCI needed more repeat revascularisation; CABG had more stroke. 10-year death in three-vessel disease 28% vs 21% (HR 1.42). [[Serruys2009SYNTAX,Thuijs2019SYNTAXES]]`},
    {k:'Stable disease · left main',t:'Left main disease',
     txt:`The left main artery feeds both the LAD and the circumflex. EXCEL (1,905 people, low or intermediate complexity) found 5-year death, stroke or MI of 22.0% with PCI vs 19.2% with CABG, a difference that was not significant (95% CI −0.9 to 6.5); all-cause death was 13.0% vs 9.9%. [[Stone2019EXCEL]] NOBLE (1,201 people) found 5-year MACCE of 28% vs 19% (HR 1.58) with mortality 9% vs 9%. [[Holm2020NOBLE]] Pooling four trials (4,394 people), 5-year death was 11.2% vs 10.2% (HR 1.10), with more spontaneous MI and repeat revascularisation after PCI; the authors gave an 85.7% Bayesian probability that death is higher with PCI, probably by less than 0.2% a year. [[Sabatine2021]]`,
     pt:`For the main trunk artery, results were close in some trials and favoured surgery in others. Stents meant more repeat procedures. [[Sabatine2021]]`,
     hook:`Left main: EXCEL composite not significantly different; NOBLE favoured CABG for MACCE; similar mortality in NOBLE (9% vs 9%). [[Stone2019EXCEL,Holm2020NOBLE]]`},
    {k:'Stable disease · diabetes',t:'Diabetes with multivessel disease',
     txt:`FREEDOM enrolled 1,900 people with diabetes, 83% with three-vessel disease. 5-year death, MI or stroke was 26.6% with PCI vs 18.7% with CABG (P = 0.005), but stroke was higher with CABG (5.2% vs 2.4%). [[Farkouh2012FREEDOM]] In pooled individual data from 11 trials (11,518 people without acute MI), 5-year mortality with multivessel disease and diabetes was 15.5% after PCI vs 10.0% after CABG (HR 1.48). [[Head2018]] The extra narrowing drawn here is schematic.`,
     pt:`Bypass surgery is often chosen for people with diabetes and many blocked arteries. [[Farkouh2012FREEDOM]]`,
     hook:`Diabetes plus multivessel disease: CABG beat PCI for death/MI/stroke in FREEDOM (18.7% vs 26.6%), at the cost of more stroke. [[Farkouh2012FREEDOM]]`},
    {k:'Inside the operation',t:'Which graft? LIMA to LAD',
     txt:`Grafts come from the internal mammary (internal thoracic) artery inside the chest wall, or from leg veins. Loop and colleagues compared 2,306 patients with a mammary-artery graft to the LAD with 3,625 who had vein grafts only: vein-only patients had 1.61 times the risk of death over 10 years, and in three-vessel disease 10-year survival was 82.6% with a mammary graft vs 71.0% without. [[Loop1986]] Using both mammary arteries did not improve 10-year survival in ART (death 20.3% vs 21.2%; HR 0.96). [[Taggart2019ART]]`,
     pt:`Bypass surgery uses a blood vessel from your chest or leg to route blood around blocked arteries. People who had the chest artery joined to the front artery of the heart lived longer in this study. [[Loop1986]]`,
     hook:`Internal mammary artery to LAD: the survival-defining graft in CABG. [[Loop1986]]`},
    {k:'Emergencies',t:'Shock and timing',
     txt:`In the SHOCK trial, the early revascularisation group was treated with angioplasty in 55% and CABG in 38%. [[Hochman2001SHOCK1y]] ESC 2023: "Early revascularization with either PCI or CABG is recommended for patients with AMI complicated by CS". [[Byrne2023ESC]] Timing matters for surgery: in 44,365 New York CABG patients, in-hospital mortality was 11.8% when CABG was done within 6 hours of an acute MI, 9.5% at 6 hours to 1 day and 2.8% after 1 day, and was higher after transmural MI within 7 days (observational data). [[Lee2001CABGtiming]] See <a href="#complications" data-go="complications">Complications &amp; cardiogenic shock</a>.`,
     pt:`When surgery is not urgent, waiting a little after a heart attack was linked with lower risk in one large study. [[Lee2001CABGtiming]]`,
     hook:`CABG after acute MI (New York): in-hospital death 11.8% <6 h, 9.5% 6 h–1 d, 2.8% >1 day; observational. [[Lee2001CABGtiming]]`}
  ];
  STEPS.forEach((s,i)=>{s.from=i/6;s.at=i/6+.1});

  /* draw a partial polyline of a graft, plus moving blood dots once complete */
  const loc=(x,y,s)=>p=>[x+(p[0]-100)*s,y+(p[1]-100)*s];
  function graft(T,g,f,s,t,hi){if(f<=0)return '';const P=g.P.map(T),n=Math.max(2,Math.round(P.length*clamp(f)));const Q=P.slice(0,n);
    let o=`<path d="${ptsD(Q)}" style="fill:none;stroke:var(--panel);stroke-width:${f1(7*s)};stroke-linecap:round"/><path d="${ptsD(Q)}" style="fill:none;stroke:${g.col};stroke-width:${f1((hi?5:4)*s)};stroke-linecap:round"/>`;
    if(f>=1){for(let j=0;j<3;j++){const q=P[Math.floor(((t*14+j/3)%1)*(P.length-1))];o+=`<circle cx="${f1(q[0])}" cy="${f1(q[1])}" r="${f1(1.8*s+.6)}" style="fill:var(--blood)"/>`}
      const e=P[P.length-1];o+=`<circle cx="${f1(e[0])}" cy="${f1(e[1])}" r="${f1(3*s)}" style="fill:${g.col};stroke:var(--panel);stroke-width:1"/>`}
    return o}
  function lesion(H,a,u,s,occ){const p=H.along(a,u);return occ?'':`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="${f1(4.2*s)}" style="fill:var(--plaque);stroke:var(--core);stroke-width:1.4"/>`}
  function stentAt(H,a,u,s,e){if(e<=0)return '';const p0=H.along(a,Math.max(0,u-.07)),p1=H.along(a,Math.min(1,u+.07));
    return `<path d="M${f1(p0[0])} ${f1(p0[1])}L${f1(p1[0])} ${f1(p1[1])}" style="fill:none;stroke:var(--stent);stroke-width:${f1((3+3.6*e)*s)};stroke-dasharray:${f1(1.6*s)} ${f1(1.4*s)};stroke-linecap:butt"/>`}
  function drawHeart(x,y,s,S,side,e,t,id){const T=loc(x,y,s),occ=S.les.find(l=>l[2]),pci=side==='L'&&S.pci;
    const list=side==='L'?(S.grL||[]):(S.gr||[]);
    let open=0;if(occ&&(pci||list.length))open=e;
    const o={labels:['lad','lcx','rca'],id};
    if(occ){o.occl={a:occ[0],at:occ[1],v:pci?1-open:Math.max(.44,1-open)};o.terr={lad:.9*(1-open)}}
    const H=heart(x,y,s,o);let g=H.svg;
    S.les.forEach(l=>{if(!l[2])g+=lesion(H,l[0],l[1],s)});
    if(pci)S.les.forEach((l,i)=>g+=stentAt(H,l[0],l[1],s,clamp(e*S.les.length-i)));
    list.forEach((k,i)=>{const f=clamp(e*list.length*1.1-i*1.05);g+=graft(T,GR[k],f,s,t,k==='lima'&&S.grL);
});
    if(side==='R'&&!list.length&&S.rn)g+=`<text x="${x}" y="${f1(y+s*112)}" class="t-xs t-mid" style="fill:var(--muted)">${S.rn}</text>`;
    if(occ&&!pci&&open>.9)g+=`<text x="${x}" y="${f1(y+s*112)}" class="t-xs t-mid" style="fill:var(--rx)">graft carries blood past the block</text>`;
    if(occ&&pci&&open>.9)g+=`<text x="${x}" y="${f1(y+s*112)}" class="t-xs t-mid" style="fill:var(--rx)">culprit artery reopened</text>`;
    if(S.dm)g+=`<text x="${f1(T([30,180])[0])}" y="${f1(T([30,180])[1])}" class="t-xs" style="fill:var(--warn);font-weight:600">${side==='L'?'diabetes':''}</text>`;
    return g}
  function draw(t){const N=vb(svg,'720 420','400 700'),ph=phaseOf(STEPS,t),S=SC[ph],st=STEPS[ph];
    const e=ease(ramp(t,st.from+.004,st.from+.08)),eb=ease(ramp(t,st.from+.02,st.from+.095));
    const L=N?{h:[[100,178],[300,178]],s:.86,ty:30,tx:[20,220],bx0:20,bx1:384,by:362,gw:20}:{h:[[112,204],[322,204]],s:.94,ty:44,tx:[20,232],bx0:450,bx1:706,by:66,gw:16};
    let s='';
    s+=`<text x="${L.tx[0]}" y="${L.ty}" class="t-sm" style="fill:var(--accent)">${S.L.toUpperCase()}</text><text x="${L.tx[1]}" y="${L.ty}" class="t-sm" style="fill:var(--rx)">${S.R.toUpperCase()}</text>`;
    s+=`<text x="${L.tx[0]}" y="${L.ty+15}" class="t-xs">${st.k}</text>`;
    s+=drawHeart(L.h[0][0],L.h[0][1],L.s,S,'L',e,t,'cbHL')+drawHeart(L.h[1][0],L.h[1][1],L.s,S,'R',e,t,'cbHR');
    if(!N)s+=`<line x1="217" x2="217" y1="80" y2="330" style="stroke:var(--line);stroke-dasharray:3 4"/>`;
    {let ly=L.h[0][1]+L.s*92+(N?40:46),used=new Set([...(S.grL||[]),...S.gr]);let lx=L.tx[0];const items=[];
      if(S.pci&&!S.grL)items.push(['var(--stent)','stent','dash']);
      if(used.has('lima'))items.push(['var(--rx)','LIMA (mammary artery) → LAD']);
      if(used.has('svgR')||used.has('svgL')||used.has('svgA'))items.push(['var(--accent)','vein grafts (from the leg)']);
      if(S.les.some(l=>!l[2]))items.push(['var(--plaque)','narrowing','dot']);
      items.forEach(([c,l,k])=>{if(lx+l.length*5.8+21>(N?388:436)){lx=L.tx[0];ly+=16}s+=k==='dot'?`<circle cx="${lx+7}" cy="${ly-3}" r="4" style="fill:${c};stroke:var(--core)"/>`:`<line x1="${lx}" x2="${lx+16}" y1="${ly-3}" y2="${ly-3}" style="stroke:${c};stroke-width:4${k==='dash'?';stroke-dasharray:1.6 1.4':''}"/>`;
        s+=`<text x="${lx+21}" y="${ly}" class="t-xs" style="fill:var(--ink)">${l}</text>`;lx+=l.length*5.8+36})}
    /* outcome bars */
    const mx=Math.max(...S.bars.flatMap(b=>b.a.map(a=>+a[1]))),top=Math.max(10,Math.ceil(mx/10)*10),W=L.bx1-L.bx0-118;
    let y=L.by;s+=`<text x="${L.bx0}" y="${y-18}" class="t-sm" style="fill:var(--rx)">WHAT THE TRIAL FOUND · %</text>`;
    S.bars.forEach(b=>{s+=`<text x="${L.bx0}" y="${y}" class="t-xs" style="fill:var(--ink);font-weight:600">${b.m}</text>`;
      b.a.forEach((a,j)=>{const v=+a[1],dp=(String(a[1]).split('.')[1]||'').length,by=y+5+j*15,w=W*v/top*eb;s+=`<rect x="${L.bx0}" y="${by}" width="${f1(Math.max(w,eb>0?1.5:0))}" height="11" rx="3" style="fill:${CLR[a[2]]};opacity:${a[2]==='oth'?.6:.9}"/><text x="${f1(L.bx0+w+5)}" y="${by+9}" class="t-xs" style="fill:var(--ink)">${a[0]} ${eb>0?(eb>.995?v:v*eb).toFixed(dp)+'%':''}</text>`});
      y+=b.a.length*15+L.gw+8});
    s+=`<text x="${L.bx0}" y="${f1(y)}" class="t-xs">${S.src.replace(/<sup[\s\S]*?<\/sup>/g,'').trim()}</text>`;
    if(N)svg.setAttribute('viewBox','0 0 400 '+Math.max(560,Math.round(y+24)));
    svg.innerHTML=s;setSt(ph);
    $('#cbRead').innerHTML=`<span>scenario <b>${ph+1} of 6 · ${st.t}</b></span><span>evidence <b>${S.src}</b></span>`;
    $('#cbNote').innerHTML=noteHTML(st);
  }
  let setSt=()=>{};
  const stop=playWire(rg,$('#cbPlay'),draw,30000,'Replay','cabg');
  setSt=stepWire($('#cbSteps'),STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- heart-team factor board ---------- */
  const FAC={
    acute:{n:'Heart attack happening now',tag:['PCI first','rx'],ev:[
      ['Primary PCI vs fibrinolysis, 23 RCTs','Short-term death 7% vs 9% with primary PCI. [[Keeley2003]]'],
      ['ESC 2023','Emergency CABG "should be considered" when PCI is not feasible or has failed (quoted in part). [[Byrne2023ESC]]'],
      ['COMPLETE','STEMI with multivessel disease, after culprit PCI: complete revascularisation cut CV death or MI (7.8% vs 10.5%). [[Mehta2019COMPLETE]]'],
      ['CULPRIT-SHOCK','In cardiogenic shock: culprit lesion only first (death or RRT 45.9% vs 55.4%). [[Thiele2017CULPRIT]]'],
      ['Caution','SYNTAX excluded acute MI, and the pooled 11-trial analysis studied people without acute MI: the PCI-or-CABG trials are mostly about stable disease. [[Thuijs2019SYNTAXES,Head2018]]']]},
    complex:{n:'Three-vessel disease',tag:['trials favoured CABG','good'],ev:[
      ['SYNTAX, 1 year','MACCE 17.8% PCI vs 12.4% CABG, mainly repeat revascularisation; stroke 0.6% vs 2.2%. [[Serruys2009SYNTAX]]'],
      ['SYNTAX, 10 years','Death in three-vessel disease 28% vs 21% (HR 1.42). [[Thuijs2019SYNTAXES]]']]},
    lm:{n:'Left main disease',tag:['mixed results','warn'],ev:[
      ['EXCEL (low or intermediate complexity)','5-year death, stroke or MI 22.0% vs 19.2%, not significant; all-cause death 13.0% vs 9.9%. [[Stone2019EXCEL]]'],
      ['NOBLE','5-year MACCE 28% vs 19% (HR 1.58); mortality 9% vs 9%. [[Holm2020NOBLE]]'],
      ['Four-trial meta-analysis','5-year death 11.2% vs 10.2% (HR 1.10); more MI and repeat revascularisation after PCI. [[Sabatine2021]]'],
      ['SYNTAX, 10 years','Left main subgroup: death 27% PCI vs 28% CABG. [[Thuijs2019SYNTAXES]]']]},
    dm:{n:'Diabetes',tag:['trials favoured CABG','good'],ev:[
      ['FREEDOM','5-year death, MI or stroke 26.6% PCI vs 18.7% CABG; stroke 2.4% vs 5.2%. [[Farkouh2012FREEDOM]]'],
      ['Pooled 11 trials','Multivessel disease with diabetes: 5-year death 15.5% vs 10.0% (HR 1.48). [[Head2018]]']]},
    lv:{n:'Weak heart muscle (low LV function)',tag:['not tested here','gap'],ev:[
      ['Gap','None of the trials summarised on this page tested PCI against CABG by LV function, so this companion gives no figures for it. Heart teams weigh it using evidence not covered here.']]},
    risk:{n:'Older age or high surgical risk',tag:['partly covered','warn'],ev:[
      ['Stroke trade-off','Stroke was higher with CABG in SYNTAX (2.2% vs 0.6% at 1 year) and FREEDOM (5.2% vs 2.4%). [[Serruys2009SYNTAX,Farkouh2012FREEDOM]]'],
      ['FIRE (age 75 and over, after MI)','Physiology-guided complete revascularisation cut death, MI, stroke or revascularisation at 1 year (15.7% vs 21.0%). [[Biscaglia2023FIRE]]'],
      ['Timing of surgery after MI','In New York, CABG within 6 hours of an MI carried 11.8% in-hospital mortality vs 2.8% after 1 day (observational). [[Lee2001CABGtiming]]'],
      ['Gap','No trial on this page compared PCI with CABG in people at high surgical risk.']]}
  };
  const TAGC={rx:'rx',good:'good',warn:'warn',gap:''};
  function drawBoard(){const on=$$('[data-cbf]').filter(b=>b.getAttribute('aria-pressed')==='true').map(b=>b.dataset.cbf);
    const B=$('#cbBoard');
    if(!on.length){B.innerHTML=`<p class="empty">Switch on one or more factors above.</p>`;$('#cbSum').textContent='No factors selected.';return}
    B.innerHTML=on.map(k=>{const F=FAC[k];return `<div class="card"><span class="tag ${TAGC[F.tag[1]]}">${F.tag[0]}</span><h4>${F.n}</h4><ul>${F.ev.map(e=>`<li><b>${e[0]}:</b> ${e[1]}</li>`).join('')}</ul></div>`}).join('');
    const gaps=on.filter(k=>FAC[k].tag[1]==='gap'||FAC[k].tag[1]==='warn').length;
    $('#cbSum').textContent=`${on.length} factor${on.length>1?'s':''} on · ${on.reduce((n,k)=>n+FAC[k].ev.filter(e=>e[0]!=='Gap').length,0)} pieces of evidence · ${gaps} with mixed results or gaps`;
  }
  $$('[data-cbf]').forEach(b=>b.addEventListener('click',()=>{b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')!=='true');drawBoard()}));
  drawBoard();
};
