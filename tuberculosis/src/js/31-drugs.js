/* =============== 3.1 How TB drugs work =============== */
const DR_COL={H:'var(--dH)',R:'var(--dR)',Z:'var(--dZ)',E:'var(--dE)'};
const DR_NM={H:'isoniazid',R:'rifampicin',Z:'pyrazinamide',E:'ethambutol'};
/* Schematic kill rates (log10 per day) for each drug in each of Mitchison's places.
   A: cavity wall, fast-growing extracellular bacilli. B: acid-inhibited bacilli in inflamed tissue and macrophages.
   C: near-dormant bacilli in solid caseum. Drawn to show the idea, not measured. */
const DR_K={A:{H:.62,R:.18,E:.045,Z:0},B:{H:.01,R:.05,E:0,Z:.11},C:{H:0,R:.028,E:0,Z:.012}};
const DR_L0={A:8,B:5.6,C:4.8};
const DR_DAYS=182;
/* the time axis: the first 14 days take 22% of the width */
const drT2d=t=>t<=.22?14*t/.22:14+168*(t-.22)/.78;
const drD2t=d=>d<=14?.22*d/14:.22+.78*(d-14)/168;
/* daily simulation of the three places plus two resistant mutant lines in the cavity wall */
function drSim(on,stopZE){
  const S=[];let a=DR_L0.A,rh=.6,rr=-1.4,b=DR_L0.B,c=DR_L0.C;
  const add=(x,y)=>Math.max(x,y)+Math.log10(1+Math.pow(10,-Math.abs(x-y)));
  for(let d=0;d<=DR_DAYS;d++){
    const A=add(add(a,rh),rr);S.push({d,a,rh,rr,A,b,c});
    const act=k=>on[k]&&!(stopZE&&(k==='Z'||k==='E')&&d>=56);
    const kill=(P,skip)=>['H','R','Z','E'].reduce((s,k)=>s+(act(k)&&k!==skip?DR_K[P][k]:0),0);
    const kA=kill('A'),kAh=kill('A','H'),kAr=kill('A','R'),kB=kill('B'),kC=kill('C');
    const grow=(x,k,cap,g)=>k>0?x-k:Math.min(cap,x+g);
    a=a>-1?grow(a,kA,8.4,.08):a;
    rh=rh>-2?grow(rh,kAh,8.4,.12):rh;
    rr=rr>-3?grow(rr,kAr,8.4,.12):rr;
    b=b>-1?grow(b,kB,6,.02):b;
    c=c>-1?(kC>0?c-kC:c):c;
  }
  return S}
function drAt(S,d){const i=clamp(Math.floor(d),0,DR_DAYS-1),f=clamp(d-i,0,1),p=S[i],q=S[Math.min(DR_DAYS,i+1)],o={};
  ['a','rh','rr','A','b','c'].forEach(k=>o[k]=lerp(p[k],q[k],f));o.d=d;return o}
const drFmtD=d=>d<14?(d<1.95?f1(d)+' days':Math.round(d)+' days'):'week '+Math.round(d/7);

const DR_STEPS=[
 {from:0,at:drD2t(1),k:'Days 0–2',t:'Isoniazid strikes first',
  txt:`The cavity wall holds the most bacilli, growing fast in air-filled tissue where the immune response has failed locally. Isoniazid, a prodrug switched on by the bacterium's own KatG enzyme, is bactericidal against actively growing organisms, so it does most of the early killing: about 95% of organisms in the first two days. In a study of 100 people given 22 regimens, the fast kill of the first 2 days was driven mainly by isoniazid and rifampin. [[Kaplan2003,Eum2010,FDA-Isoniazid,Mitchison2000,Jindani2003]]`,
  pt:`In the first two days most of the germs die, mainly from isoniazid. That is why people often stop being infectious quite soon, but it is far from a cure.`,
  hook:`Early bactericidal activity (EBA): the fall in viable sputum bacilli over the first days. Isoniazid dominates it. [[Mitchison2000,Jindani2003]]`},
 {from:drD2t(2),at:drD2t(8),k:'Days 2–14',t:'Rifampicin and pyrazinamide take over',
  txt:`After the first days, rifampicin and pyrazinamide take over the bactericidal role through the intensive phase. On days 2 to 14 the sterilising activity came from rifampin, not from isoniazid or pyrazinamide. Rifampicin binds the β subunit of RNA polymerase and blocks the growing RNA once it is 2 to 3 nucleotides long. On its own at 10 mg/kg it lowered sputum bacterial load by 0.176 log10 CFU/mL a day over 14 days. [[Mitchison2000,Jindani2003,Campbell2001Rif,Boeree2015]]`,
  pt:`Once the easy germs are gone, the slower ones are left. Rifampicin is the medicine that keeps killing those.`,
  hook:`Isoniazid = main early bactericidal drug. Rifampicin = key sterilising drug. [[Jindani2003]]`},
 {from:drD2t(16),at:drD2t(35),k:'Weeks 2–8',t:'The acid niche: pyrazinamide',
  txt:`Mitchison's framework separates actively growing, slowly or intermittently metabolising, acid-inhibited and near-dormant bacilli, each with different drug susceptibility. Pyrazinamide enters by passive diffusion and is turned into pyrazinoic acid by pyrazinamidase (pncA). Under acid conditions the protonated acid builds up inside, because efflux is weak, and the drug is more active against old, slow bacilli than against growing cultures. It acts with rifampicin as a sterilising agent. Note that the bacillus's own phagosome resists full acidification, stopping at about pH 6.3 to 6.5. Turn Z off to see this middle line clear more slowly. [[Mitchison2000,Zhang2003PZA,SturgillKoszycki1994]]`,
  pt:`Some germs sit in sour, inflamed pockets. Pyrazinamide works best exactly there, which is why it is in the first two months.`,
  hook:`Pyrazinamide needs pyrazinamidase (pncA) and acid pH. pncA mutations cause resistance. [[Zhang2003PZA,Scorpio1996]]`},
 {from:drD2t(50),at:drD2t(56),k:'Week 8',t:'Two months: sputum turns negative',
  txt:`What reaches the sputum comes mostly from the cavity wall, so cultures turn negative long before the last bacilli die. With daily dosing, 85% of people (700/828) were culture-negative at 2 months, against 77% with a thrice-weekly intensive phase. In the standard regimen, pyrazinamide and ethambutol stop here. [[Jindani2004,WHO-Mod4-2025]]`,
  pt:`A negative sputum test at two months is good news, but germs are still hiding where the test cannot see them.`,
  hook:`A positive 2-month culture predicts relapse poorly: sensitivity 40%, specificity 85%. [[Horne2010]]`},
 {from:drD2t(63),at:drD2t(140),k:'Months 3–6',t:'Persisters: why treatment lasts months',
  txt:`In an isoniazid-rifampicin continuation phase, rifampicin is the only drug that acts on persisters: people whose strain was isoniazid-resistant at the start did about as well as those whose strain was not. In rabbit cavity caseum, bacilli were largely non-replicating and only the rifamycins fully sterilised it; pyrazinamide also killed there. Rifampicin accumulates in caseum. Turn R off: the lowest line stalls and bacilli survive to the end. [[Mitchison2000,Sarathy2018,Prideaux2015]]`,
  pt:`The last germs are almost asleep inside dead, cheesy tissue. Only a long course of rifampicin reliably finishes them off, which is why you keep taking it after you feel well.`,
  hook:`Rifampicin for 6 months, not 2: relapse 3.1% vs 8.2% with fully susceptible TB, and 5.5% vs 38% with isoniazid resistance at the start. [[WHO-Mod4-2025]]`},
 {from:drD2t(168),at:1,k:'Week 26',t:'Why one drug is never enough',
  txt:`Resistance arises by chance chromosomal mutation, not by passing genes between bacteria. Mutation rates per bacterium per generation were 2.56 × 10⁻⁸ for isoniazid, 10⁻⁷ for ethambutol and 2.25 × 10⁻¹⁰ for rifampicin. In a large population a few resistant mutants are already present before treatment starts; one drug alone kills the rest and lets them take over. Press <b>Isoniazid alone</b> to watch it happen. A bacillus resistant to two drugs at once would need two independent rare mutations, so a combination covers both. [[David1970,Mitchison2000]]`,
  pt:`A few germs are born resistant to any one medicine. A second medicine kills those few, which is why TB is always treated with several medicines at once.`,
  hook:`Combination therapy exists because resistance mutations are rare and independent. The mutation rate to rifampicin resistance is the lowest: 2.25 × 10⁻¹⁰ per bacterium per generation. [[David1970,Mitchison2000]]`}
];

/* ---- mechanism cards ---- */
const DR_MX=[
 {id:'H',lt:'H',c:'var(--dH)',n:'Isoniazid',cl:'Hydrazide prodrug',tg:'myc',bk:'Activated by KatG, then blocks InhA: no mycolic acids for the waxy coat.',
  txt:`<b>Isoniazid</b> is a prodrug. A single gene, katG (catalase-peroxidase), restored isoniazid sensitivity in a resistant mutant, and deleting katG went with resistance in patient isolates. Its target, InhA, is an enoyl reductase in mycolic acid synthesis; a missense mutation in inhA gave resistance to both isoniazid and ethionamide. The US label lists resistance mutations in katG, inhA, kasA and ahpC. [[Zhang1992,Banerjee1994,FDA-Isoniazid]]`},
 {id:'R',lt:'R',c:'var(--dR)',n:'Rifampicin',cl:'Rifamycin',tg:'rnap',bk:'Plugs RNA polymerase (β subunit): genes cannot be read.',
  txt:`<b>Rifampicin</b> binds a pocket of the RNA polymerase β subunit more than 12 Å from the active site and blocks the path of the growing RNA once it is 2 to 3 nucleotides long. Resistance maps to a 23-amino-acid hot spot of rpoB: mutations there were found in 64 of 66 resistant isolates and in none of 56 susceptible ones, which is what rapid molecular tests read. [[Campbell2001Rif,Telenti1993]]`},
 {id:'Z',lt:'Z',c:'var(--dZ)',n:'Pyrazinamide',cl:'Prodrug (pyrazinoic acid)',tg:'cyto',bk:'Turned into pyrazinoic acid by pncA; builds up under acid conditions.',
  txt:`<b>Pyrazinamide</b> enters by passive diffusion and is converted to pyrazinoic acid by pyrazinamidase (pncA). Protonated pyrazinoic acid accumulates under acid conditions because efflux is weak. Resistance comes from highly diverse pncA mutations that remove the enzyme, and a functional pncA restored susceptibility in resistant strains. [[Zhang2003PZA,Scorpio1996]]`},
 {id:'E',lt:'E',c:'var(--dE)',n:'Ethambutol',cl:'Arabinan synthesis inhibitor',tg:'ara',bk:'Blocks arabinan polymerisation in the arabinogalactan layer (embCAB).',
  txt:`<b>Ethambutol</b> inhibits polymerisation of cell-wall arabinan. Resistance comes from overexpression of Emb proteins, structural mutations in EmbB, or both, in the embCAB cluster that encodes arabinosyl transferases; it was found in up to 4% of clinical isolates at the time. [[Telenti1997]]`},
 {id:'FQ',lt:'FQ',c:'var(--dNew)',n:'Fluoroquinolones',cl:'Moxifloxacin, levofloxacin',tg:'dna',bk:'Target DNA gyrase: the DNA cannot be unwound and copied.',
  txt:`<b>Fluoroquinolones</b> target DNA gyrase. gyrA mutations were found in all 14 isolates with a ciprofloxacin MIC above 2 µg/mL, and resistant mutants arose at a frequency of 1 in 10⁷ to 10⁸. Moxifloxacin speeds early culture conversion but diffuses poorly into caseum. [[Takiff1994,Dorman2021,Prideaux2015]]`},
 {id:'B',lt:'B',c:'var(--dNew)',n:'Bedaquiline',cl:'Diarylquinoline',tg:'atp',bk:'Jams ATP synthase in the membrane: the bacillus runs out of energy.',
  txt:`<b>Bedaquiline</b> inhibits mycobacterial ATP synthase. In early work its MIC was 0.06 µg/mL against both drug-susceptible and drug-resistant strains, and resistant mutants pointed to the ATP synthase proton pump. In the C208 trial it shortened median time to culture conversion from 125 to 83 days. [[Andries2005,Diacon2014]]`},
 {id:'Pa',lt:'Pa',c:'var(--dNew)',n:'Pretomanid',cl:'Nitroimidazooxazine',tg:'myc2',bk:'Activated by Ddn; blocks mycolic acid synthesis and releases nitric oxide.',
  txt:`<b>Pretomanid</b> is activated by Ddn, an F420-dependent nitroreductase. Its main metabolite generates reactive nitrogen species including nitric oxide, and the label says it inhibits mycolic acid biosynthesis. Unlike older drugs it killed both replicating and static bacilli. [[Singh2008,FDA-Pretomanid,Stover2000]]`},
 {id:'L',lt:'Lzd',c:'var(--dNew)',n:'Linezolid',cl:'Oxazolidinone',tg:'none',bk:'Resistant mutants can be selected in the lab, so resistance is monitored.',
  txt:`<b>Linezolid</b> is an oxazolidinone, a core drug of the 6-month regimens for drug-resistant TB. Resistant mutants can be selected in vitro, so emergent resistance is monitored. Its molecular target is not drawn here because it is outside the sources gathered for this guide. Its toxicity is well documented: see <a href="#safety" data-go="safety">Side effects</a>. [[Hillemann2008,WHO-Mod4-2025]]`}
];

inits.drugs=()=>{
  const svg=$('#drSvg'),rg=$('#drT');
  const on={H:true,R:true,Z:true,E:true};let stopZE=true,S=drSim(on,stopZE),setSt=()=>{};
  const PL=[{k:'A',n:'Cavity wall',n2:'fast-growing, outside cells',col:'var(--tb)'},{k:'B',n:'Acid pockets',n2:'inflamed tissue, macrophages',col:'var(--gold)'},{k:'C',n:'Caseum',n2:'near-dormant, solid lesion',col:'var(--accent)'}];
  const val=(P,o)=>P==='A'?o.A:P==='B'?o.b:o.c;
  const act=(k,d)=>on[k]&&!(stopZE&&(k==='Z'||k==='E')&&d>=56);
  function status(P,o){const v=val(P,o),d=o.d;if(v<0)return['cleared','var(--good)'];
    if(P==='A'&&Math.max(o.rh,o.rr)>o.a&&Math.max(o.rh,o.rr)>1.5&&d>4)return['resistant mutants','var(--bad)'];
    const prev=drAt(S,Math.max(0,d-2));if(d>.5&&prev[P==='A'?'A':P.toLowerCase()]<=v+.002&&d>1)return[v>=(P==='A'?7.9:P==='B'?5.5:4.7)?'untouched':'stalled','var(--warn)'];
    return['falling','var(--muted)']}
  function panel(P,x,y,w,h,o,N){const v=val(P,o),L0=DR_L0[P],d=o.d;
    let s=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    const p=PL.find(q=>q.k===P);
    s+=`<text x="${x+10}" y="${y+18}" class="t-lbl" style="fill:${p.col}">${p.n}</text>`;
    if(!N)s+=`<text x="${x+10}" y="${y+31}" class="t-xs">${p.n2}</text>`;
    else s+=`<text x="${x+10}" y="${y+31}" class="t-xs">${p.n2.split(',')[0]}</text>`;
    const cx=x+w/2,cy=y+h*.52,r=Math.min(w,h)*(N?.3:.27);
    const alive=Math.round(clamp(v/L0,0,1.08)*14),dead=Math.max(0,14-alive);
    const rr=rng(P.charCodeAt(0)*7);
    if(P==='A'){s+=granuloma(cx,cy+r*.18,r,1,{bac:0,seed:4});
      const resShare=o.A>-1?Math.pow(10,Math.max(o.rh,o.rr)-o.A):0;
      for(let i=0;i<14;i++){const ang=Math.PI*(1.05+i/13*.9),rad=r*.42;const bx=cx+Math.cos(ang)*rad*1.3,by=cy+r*.18+Math.sin(ang)*rad*.9-r*.1;
        const isA=i<alive,isRes=isA&&i<Math.round(alive*resShare);
        s+=bacillus(bx+(rr()-.5)*4,by+(rr()-.5)*4,r*.15,rr()*180,{dead:!isA,res:isRes})}}
    else if(P==='B'){[[-.5,-.15],[.48,-.2],[0,.42]].forEach((q,i)=>{s+=macrophage(cx+q[0]*r,cy+q[1]*r,r*.42,{seed:i+5,kind:i===2?'foamy':'resting'})});
      for(let i=0;i<14;i++){const m=i%3,q=[[-.5,-.15],[.48,-.2],[0,.42]][m],a=rr()*Math.PI*2,dd=r*.12+rr()*r*.2;
        s+=bacillus(cx+q[0]*r+r*.1+Math.cos(a)*dd,cy+q[1]*r+Math.sin(a)*dd*.8,r*.14,rr()*180,{dead:i>=alive})}}
    else{s+=granuloma(cx,cy,r,.72,{bac:0,seed:8});
      for(let i=0;i<14;i++){const a=rr()*Math.PI*2,dd=Math.sqrt(rr())*r*.26;s+=bacillus(cx+Math.cos(a)*dd,cy+Math.sin(a)*dd,r*.13,rr()*180,{dormant:i<alive,dead:i>=alive})}}
    /* drug pills that act here now */
    let px=x+10;const py=y+h-36;
    ['H','R','Z','E'].forEach(k=>{if(DR_K[P][k]<=0)return;const a2=act(k,d);
      s+=pill(px+9,py,18,DR_COL[k],{label:k,op:a2?1:.18});px+=22});
    const st=status(P,o);
    s+=`<text x="${x+10}" y="${y+h-10}" class="t-sm" style="fill:${st[1]};font-weight:700">${st[0].toUpperCase()}</text>`;
    s+=`<text x="${x+w-10}" y="${y+h-10}" class="t-xs t-end">${v<0?'&lt;1':'10^'+f1(v)}</text>`;
    return s}
  function draw(t){
    const N=vb(svg,'720 410','400 640');const d=drT2d(t),o=drAt(S,d);let s=`<defs>${marker('drAr','var(--muted)')}</defs>`;
    /* panels */
    if(!N){PL.forEach((p,i)=>{s+=panel(p.k,12+i*236,8,224,178,o,false)})}
    else{PL.forEach((p,i)=>{s+=panel(p.k,6+i*130,8,126,214,o,true)})}
    /* chart */
    const C=N?{x0:44,x1:388,y0:262,y1:540,ax:556}:{x0:58,x1:700,y0:212,y1:368,ax:384};
    const X=dd=>C.x0+(C.x1-C.x0)*drD2t(dd),Y=v=>lerp(C.y1,C.y0,(clamp(v,-.6,9)+.6)/9.6);
    for(let v=0;v<=8;v+=2)s+=`<line x1="${C.x0}" x2="${C.x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="${v?'grid':'axis'}"/><text x="${C.x0-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v?'10'+['','','²','','⁴','','⁶','','⁸'][v]:'1'}</text>`;
    s+=`<text x="${C.x0}" y="${C.y0-8}" class="t-xs">viable bacilli · log scale · schematic</text>`;
    /* detection line and 2-month band */
    s+=`<rect x="${f1(X(52))}" y="${C.y0}" width="${f1(X(60)-X(52))}" height="${C.y1-C.y0}" style="fill:var(--rx);opacity:.09"/>`;
    s+=`<line x1="${C.x0}" x2="${C.x1}" y1="${f1(Y(1.5))}" y2="${f1(Y(1.5))}" style="stroke:var(--rx);stroke-width:1;stroke-dasharray:5 4"/><text x="${C.x1}" y="${f1(Y(1.5)-4)}" class="t-xs t-end" style="fill:var(--rx)">${N?'culture limit (schematic)':'below this, sputum culture is negative (schematic)'}</text>`;
    [[0,'0'],[2,'2 d'],[7,'1 wk'],[14,'2 wk'],[56,'8 wk'],[112,'16 wk'],[182,'26 wk']].forEach(q=>{s+=`<line x1="${f1(X(q[0]))}" x2="${f1(X(q[0]))}" y1="${C.y1}" y2="${C.y1+4}" class="axis"/><text x="${f1(X(q[0]))}" y="${C.ax}" class="t-xs t-mid">${q[1]}</text>`});
    s+=`<line x1="${f1(X(14))}" x2="${f1(X(14))}" y1="${C.y0}" y2="${C.y1}" style="stroke:var(--line);stroke-dasharray:1 3"/>`;
    if(!N)s+=`<text x="${f1(X(7))}" y="${C.y1-4}" class="t-xs t-mid" style="opacity:.7">days stretched</text>`;
    /* lines, drawn up to d */
    const line=(key,col,w,dash)=>{let p='';const end=d;const pts=[];
      for(let dd=0;dd<=end+1e-9;dd+=(dd<14?.25:1)){pts.push(dd)}pts.push(end);
      pts.forEach((dd,i)=>{const q=drAt(S,dd);p+=(i?'L':'M')+f1(X(dd))+' '+f1(Y(q[key]))});
      return `<path d="${p}" style="fill:none;stroke:${col};stroke-width:${w};${dash?'stroke-dasharray:'+dash:''};stroke-linejoin:round"/>`};
    s+=line('c','var(--accent)',2.4)+line('b','var(--gold)',2.4)+line('A','var(--tb)',2.8);
    if(Math.max(o.rh,o.rr)>1&&Math.max(o.rh,o.rr)>o.a)s+=line(o.rh>o.rr?'rh':'rr','var(--bad)',1.4,'3 3');
    /* playhead + dots */
    s+=`<line x1="${f1(X(d))}" x2="${f1(X(d))}" y1="${C.y0}" y2="${C.y1}" style="stroke:var(--ink);opacity:.3"/>`;
    [['c','var(--accent)'],['b','var(--gold)'],['A','var(--tb)']].forEach(q=>{s+=`<circle cx="${f1(X(d))}" cy="${f1(Y(o[q[0]]))}" r="3.6" style="fill:${q[1]}"/>`});
    /* anchors */
    if(on.H&&d>=2){const q=drAt(S,2);s+=`<circle cx="${f1(X(2))}" cy="${f1(Y(q.A))}" r="5.5" style="fill:none;stroke:var(--ink);stroke-width:1.6"/><text x="${f1(X(2)+8)}" y="${f1(Y(q.A)-6)}" class="t-xs" style="fill:var(--ink)">≈95% killed by day 2</text>`}
    if(d>=56&&on.H&&on.R){s+=`<text x="${f1(X(56)+4)}" y="${C.y1-6}" class="t-xs" style="fill:var(--rx)">${N?'2 mo: 85% culture-neg.':'2 months: 85% culture-negative (daily treatment)'}</text>`}
    /* legend */
    const lg=[['var(--tb)','cavity wall'],['var(--gold)','acid pockets'],['var(--accent)','caseum'],['var(--bad)','resistant mutants']];
    if(N)lg.forEach((q,i)=>{const lx=44+(i%2)*170,ly=588+Math.floor(i/2)*18;s+=`<line x1="${lx}" x2="${lx+18}" y1="${ly-3}" y2="${ly-3}" style="stroke:${q[0]};stroke-width:3;${i===3?'stroke-dasharray:3 3':''}"/><text x="${lx+24}" y="${ly}" class="t-xs">${q[1]}</text>`});
    else lg.forEach((q,i)=>{const lx=150+i*130;s+=`<line x1="${lx}" x2="${lx+18}" y1="${401}" y2="${401}" style="stroke:${q[0]};stroke-width:3;${i===3?'stroke-dasharray:3 3':''}"/><text x="${lx+24}" y="${404}" class="t-xs">${q[1]}</text>`});
    if(N)s+=`<text x="200" y="630" class="t-xs t-mid">time on treatment (first 2 weeks stretched)</text>`;
    svg.innerHTML=s;
    const ph=phaseOf(DR_STEPS,t);setSt(ph);
    $('#drNote').innerHTML=noteHTML(DR_STEPS[ph]);
    const now=['H','R','Z','E'].filter(k=>act(k,d));
    $('#drRead').innerHTML=`<span>time <b>${drFmtD(d)}</b></span><span>drugs now <b>${now.length?now.join(''):'none'}</b></span><span>cavity wall <b>${o.A<0?'cleared':'10^'+f1(o.A)}</b></span><span>acid pockets <b>${o.b<0?'cleared':'10^'+f1(o.b)}</b></span><span>caseum <b>${o.c<0?'cleared':'10^'+f1(o.c)}</b></span>`;
  }
  function verdict(){const v=$('#drVerdict'),E=S[DR_DAYS];const minA=Math.min(...S.map(q=>q.A));
    const list=['H','R','Z','E'].filter(k=>on[k]);
    if(!list.length){v.className='verdict no';v.textContent='No drugs: the bacilli keep growing in the cavity wall and nothing clears.';return}
    if(E.A>minA+1){v.className='verdict no';v.textContent=`${list.join('')}${stopZE&&(on.Z||on.E)?' (Z/E stopped at 2 months)':''}: the cavity wall falls, then climbs back. Mutants resistant to the one drug acting there took over. Schematic.`;return}
    const left=[];if(E.A>=0)left.push('cavity wall');if(E.b>=0)left.push('acid pockets');if(E.c>=0)left.push('caseum');
    if(left.length){v.className='verdict maybe';v.textContent=`${list.join('')}: bacilli still survive at 6 months in the ${left.join(' and ')}. Sputum may look clear, but this is the set-up for relapse. Schematic.`;return}
    const day=S.find(q=>q.A<0&&q.b<0&&q.c<0);v.className='verdict yes';v.textContent=`${list.join('')}: all three places cleared by about week ${Math.ceil(day.d/7)} in this sketch. In real life no test can see the last bacilli, which is why the full course is given.`}
  const stop=playWire(rg,$('#drPlay'),draw,22000,'%t:player.replay%','drugs');
  setSt=stepWire($('#drSteps'),DR_STEPS,rg,draw,stop);
  const sync=()=>{$$('[data-drd]').forEach(b=>b.setAttribute('aria-pressed',on[b.dataset.drd]));$('#drStop').setAttribute('aria-pressed',stopZE);
    const key=['H','R','Z','E'].filter(k=>on[k]).join('');$$('[data-drp]').forEach(b=>b.setAttribute('aria-current',b.dataset.drp===key?'true':'false'));
    S=drSim(on,stopZE);verdict();draw(+rg.value)};
  $$('[data-drd]').forEach(b=>b.addEventListener('click',()=>{on[b.dataset.drd]=!on[b.dataset.drd];sync()}));
  $('#drStop').addEventListener('click',()=>{stopZE=!stopZE;sync()});
  $$('[data-drp]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.drp;['H','R','Z','E'].forEach(x=>on[x]=k.includes(x));stopZE=true;sync();if(+rg.value<.5){rg.value=1;draw(1)}}));
  sync();

  /* ---- mechanism glyph ---- */
  const ms=$('#drMech');let sel='H';
  function drawM(){const N=vb(ms,'720 330','400 560');const m=DR_MX.find(q=>q.id===sel);
    const B=N?{x:20,y:16,w:360,h:300}:{x:16,y:24,w:420,h:282};
    let s='';const lay=[{k:'myc',n:'Mycolic acids (waxy outer layer)',w:20,c:'var(--caseum)',l:'var(--gold)'},{k:'ara',n:'Arabinogalactan',w:13,c:'var(--mac)',l:'var(--mac-line)'},{k:'pg',n:'Peptidoglycan',w:9,c:'var(--fibro)',l:'var(--fibro)'},{k:'mem',n:'Cell membrane',w:7,c:'var(--accent-soft)',l:'var(--accent)'}];
    const hl=k=>m.tg===k||(m.tg==='myc2'&&(k==='myc'||k==='ribo'))||(m.tg==='atp'&&k==='mem');
    let off=0;const rx0=B.h/2;
    lay.forEach((L,i)=>{const H=hl(L.k);s+=`<rect x="${f1(B.x+off)}" y="${f1(B.y+off)}" width="${f1(B.w-2*off)}" height="${f1(B.h-2*off)}" rx="${f1(rx0-off)}" style="fill:${L.c};stroke:${H?'var(--rx)':L.l};stroke-width:${H?3:1};opacity:${m.tg==='none'||H||m.tg==='cyto'?1:.55}"/>`;off+=L.w});
    const ix=B.x+off,iy=B.y+off,iw=B.w-2*off,ih=B.h-2*off;
    s+=`<rect x="${f1(ix)}" y="${f1(iy)}" width="${f1(iw)}" height="${f1(ih)}" rx="${f1(rx0-off)}" style="fill:${m.tg==='cyto'?'var(--gold-soft)':'var(--cell)'};stroke:${m.tg==='cyto'?'var(--rx)':'none'};stroke-width:3"/>`;
    const cx=B.x+B.w/2,cy=B.y+B.h/2;
    /* DNA coil */
    let dp='';for(let i=0;i<=80;i++){const u=i/80,xx=lerp(cx-iw*.32,cx+iw*.3,u),yy=cy-ih*.02+Math.sin(u*Math.PI*7)*ih*.09+Math.sin(u*Math.PI*2)*ih*.06;dp+=(i?'L':'M')+f1(xx)+' '+f1(yy)}
    s+=`<path d="${dp}" style="fill:none;stroke:${hl('dna')?'var(--rx)':'var(--nuc)'};stroke-width:${hl('dna')?3.4:2};opacity:${hl('dna')?1:.6}"/>`;
    /* RNA polymerase on the DNA */
    const rp=[cx+iw*.08,cy-ih*.08];s+=`<ellipse cx="${f1(rp[0])}" cy="${f1(rp[1])}" rx="${f1(iw*.07)}" ry="${f1(ih*.11)}" style="fill:${hl('rnap')?'var(--dR)':'var(--panel-2)'};stroke:${hl('rnap')?'var(--rx)':'var(--muted)'};stroke-width:${hl('rnap')?3:1}"/>`;
    /* ribosomes */
    const rr=rng(5);for(let i=0;i<9;i++){const a=rr(),b2=rr();const px=cx-iw*.38+a*iw*.76,py=cy+ih*.18+b2*ih*.14;s+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="${hl('ribo')?4.2:3.2}" style="fill:${hl('ribo')?'var(--dNew)':'var(--muted)'};opacity:${hl('ribo')?.9:.45}"/>`}
    /* ATP synthase in the membrane, bottom */
    const ax=cx-iw*.22,ay=B.y+B.h-off+3;
    s+=`<rect x="${f1(ax-7)}" y="${f1(ay-14)}" width="14" height="16" rx="3" style="fill:${hl('atp')?'var(--dNew)':'var(--accent)'};stroke:${hl('atp')?'var(--rx)':'none'};stroke-width:2.5"/><circle cx="${f1(ax)}" cy="${f1(ay-22)}" r="9" style="fill:${hl('atp')?'var(--dNew)':'var(--accent)'};stroke:${hl('atp')?'var(--rx)':'none'};stroke-width:2.5"/>`;
    /* KatG and InhA for isoniazid */
    if(sel==='H'){const kx=cx-iw*.3,ky=cy-ih*.3,ix2=cx-iw*.05,iy2=B.y+off+6;
      s+=`<circle cx="${f1(kx)}" cy="${f1(ky)}" r="8" style="fill:var(--dH)"/><text x="${f1(kx)}" y="${f1(ky+20)}" class="t-xs t-mid" style="fill:var(--ink)">KatG</text>`;
      s+=`<rect x="${f1(ix2-9)}" y="${f1(iy2)}" width="18" height="11" rx="3" style="fill:var(--dH)"/><text x="${f1(ix2+14)}" y="${f1(iy2+10)}" class="t-xs" style="fill:var(--ink)">InhA</text>`;
      s+=`<path d="M${f1(kx+8)} ${f1(ky-4)}Q${f1((kx+ix2)/2)} ${f1(ky-20)} ${f1(ix2-6)} ${f1(iy2+14)}" class="arrow" marker-end="url(#drAr2)"/>`}
    if(sel==='Z'){const rr2=rng(9);for(let i=0;i<14;i++)s+=`<circle cx="${f1(cx-iw*.4+rr2()*iw*.8)}" cy="${f1(cy-ih*.36+rr2()*ih*.2)}" r="2.6" style="fill:var(--dZ)"/>`;
      s+=`<text x="${f1(cx-iw*.38)}" y="${f1(cy-ih*.38)}" class="t-xs" style="fill:var(--ink)">pyrazinoic acid builds up</text>`}
    if(sel==='Pa')s+=`<text x="${f1(cx+iw*.05)}" y="${f1(cy+ih*.42)}" class="t-xs t-mid" style="fill:var(--ink)">NO released</text>`;
    /* numbered labels */
    const tags=[{k:'myc',n:'Mycolic acids',p:[B.x+8,B.y+B.h*.5]},{k:'ara',n:'Arabinogalactan',p:[B.x+24,B.y+B.h*.32]},{k:'pg',n:'Peptidoglycan',p:[B.x+36,B.y+B.h*.68]},{k:'mem',n:'Membrane + ATP synthase',p:[ax+14,ay-22]},{k:'dna',n:'DNA (gyrase acts here)',p:[cx-iw*.32,cy+ih*.08]},{k:'rnap',n:'RNA polymerase',p:[rp[0]+iw*.08,rp[1]-ih*.1]},{k:'ribo',n:'Ribosomes (protein synthesis)',p:[cx+iw*.38,cy+ih*.3]}];
    tags.forEach((g,i)=>{const H=hl(g.k)||(g.k==='mem'&&hl('atp'));s+=`<circle cx="${f1(g.p[0])}" cy="${f1(g.p[1])}" r="8" style="fill:${H?'var(--rx)':'var(--panel)'};stroke:var(--ink);stroke-width:.8"/><text x="${f1(g.p[0])}" y="${f1(g.p[1]+3.5)}" class="t-xs t-mid" style="fill:${H?'#fff':'var(--ink)'};font-weight:700">${i+1}</text>`});
    const LX=N?24:456,LY=N?340:40,dy=N?20:21;
    s+=`<text x="${LX}" y="${LY}" class="t-sm" style="fill:${m.c};font-weight:700">${m.n.toUpperCase()}</text>`;
    tags.forEach((g,i)=>{const H=hl(g.k)||(g.k==='mem'&&hl('atp'));s+=`<text x="${LX}" y="${LY+22+i*dy}" class="${N?'t-sm':'t-xs'}" style="fill:${H?'var(--rx)':'var(--muted)'};font-weight:${H?700:500}">${i+1}  ${g.n}</text>`});
    const msg=m.tg==='none'?'target not drawn (see note)':m.bk;
    const words=msg.split(' ');let line='',lines=[];words.forEach(w=>{if((line+' '+w).length>(N?52:42)){lines.push(line);line=w}else line=(line?line+' ':'')+w});lines.push(line);
    lines.forEach((l,i)=>s+=`<text x="${LX}" y="${LY+22+tags.length*dy+12+i*15}" class="t-xs" style="fill:var(--ink)">${l}</text>`);
    ms.innerHTML=`<defs>${marker('drAr2','var(--dH)')}</defs>`+s;
    $('#drMechNote').innerHTML=`<p>${m.txt}</p>`;
  }
  const fl=$('#drFlip');
  fl.innerHTML=DR_MX.map(m=>`<button data-drm="${m.id}" aria-pressed="false"><span class="lt" style="background:${m.c}">${m.lt}</span><b>${m.n}</b><small class="fr">${m.cl} · tap to flip</small><span class="bk">${m.bk}</span></button>`).join('');
  fl.addEventListener('click',e=>{const b=e.target.closest('[data-drm]');if(!b)return;const was=b.getAttribute('aria-pressed')==='true';b.setAttribute('aria-pressed',!was);sel=b.dataset.drm;drawM()});
  drawM();
  redraws.drugs=(()=>{const p=redraws.drugs;return()=>{p&&p();drawM()}})();
};
