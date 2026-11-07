/* =============== 1.3 Inside the lungs =============== */
/* Main scrubber: a zoom from the whole lung to one small airway cut across (smoke and oxidants, the cells
   arriving, CD8+ cells and a B-cell follicle, a thick wall and a mucus plug), then to a fan of terminal
   bronchioles that drop out, then to the air sacs where neutrophil elastase breaks the elastin. A side column
   shows the published numbers for each step. Second widget: the cell cast. Third: centrilobular versus
   panlobular emphysema in one lobule with a severity scrubber. Fourth: a mucus-plug mortality chart.
   Every drawing is schematic: counts of cells, branches and sacs are illustrative, and the bars marked
   "schematic" come from the drawing, not from a measurement. */
const LU_STEPS=[
 {from:0,at:.08,k:'Breathe in',t:'Smoke reaches the small airways',sub:'oxidants weaken the lung’s own anti-elastase',
  txt:`Each breath of tobacco smoke carries oxidants deep into the lung. In lavage fluid, the elastase-inhibiting capacity of alpha-1 antitrypsin (α1-PI) was 40% lower in 26 healthy smokers than in 24 non-smokers, and the smokers’ inhibitor carried oxidised methionine. The authors proposed that oxidants inactivate α1-PI even when the gene is normal <span class="ev early">Early evidence</span> [[Carp1982]]. Oxidative stress is a major predisposing factor in COPD and persists long after quitting, because the body keeps producing reactive oxygen species [[Kirkham2013]].`,
  pt:`Smoke brings in chemicals that weaken the lung’s natural shield against enzymes that can eat away lung tissue [[Hautamaki1997,Carp1982]].`,
  hook:`Smoke oxidises methionine in α1-PI and cuts its anti-elastase activity by about 40% [[Carp1982]].`},
 {from:.17,at:.25,k:'Alarm',t:'Macrophages and neutrophils arrive',sub:'defence cells crowd into the airway wall',
  txt:`COPD inflammation mainly affects the peripheral airways and the lung tissue: alveolar macrophages, neutrophils, T lymphocytes and innate lymphoid cells all increase, and structural cells add cytokines, chemokines and lipid mediators [[Barnes2016]]. Induced sputum from people with COPD had more neutrophils and higher TNF-α and IL-8 than sputum from smoking and non-smoking controls [[Keatings1996]]. In mice, macrophage elastase is required: knockout mice exposed to smoke for a long time developed no emphysema <span class="ev est">Established in animal models</span> [[Hautamaki1997]].`,
  pt:`The lung’s defence cells rush in. They release enzymes and signals that keep the inflammation going [[Barnes2016,Hautamaki1997]].`,
  hook:`Macrophage elastase knockout mice do not develop smoke-induced emphysema [[Hautamaki1997]].`},
 {from:.34,at:.42,k:'Memory',t:'CD8+ T cells and B-cell follicles',sub:'the adaptive immune system joins in',
  txt:`Smokers with chronic bronchitis and airflow limitation had more CD8+ T cells and more smooth-muscle area in their peripheral airways than smokers with normal lung function, while neutrophil, macrophage and CD4+ counts were similar [[Saetta1998]]. In resected lungs, the share of small airways containing CD8 cells, B cells and lymphoid follicles rose as COPD progressed (follicles P=0.003) [[Hogg2004]]. In severe emphysema, the CT extent of destruction tracked tissue CD8 cell density most closely (R²=0.858) [[Retamales2001]].`,
  pt:`Over time the immune system’s memory cells join in, and small clusters of immune cells form in the airway walls [[Hogg2004]].`,
  hook:`CD8+ T cells and smooth-muscle area separate smokers with COPD from smokers without it [[Saetta1998]].`},
 {from:.5,at:.58,k:'Narrowing',t:'Walls thicken, mucus plugs the lumen',sub:'a thicker wall, more goblet cells, a mucus plug',
  txt:`In lung tissue from 159 patients across GOLD stages 0–4, progression was strongly linked to thicker small-airway walls (P<0.001) and to inflammatory mucous exudates in the lumen (P<0.001) [[Hogg2004]]. Hogg describes four narrowing processes: a broken epithelial barrier, failing mucus clearance, inflammatory cells in the wall and connective tissue laid down in the wall. Thick walls also stop the airway widening as the lung inflates [[Hogg2004Lancet]]. Smokers with chronic bronchitis and airflow limitation had more goblet cells in the peripheral airway epithelium than non-smokers [[Saetta2000]].`,
  pt:`The tiniest airways get narrow, clogged and scarred [[McDonough2011,Koo2018]].`,
  hook:`Small airways under 2 mm across are the main site of obstruction in COPD [[McDonough2011]].`},
 {from:.67,at:.75,k:'Vanishing',t:'Terminal bronchioles disappear',sub:'whole branches drop out of the airway tree',
  txt:`Compared with smokers with normal lung function, terminal bronchioles were 40% fewer in GOLD 1 and 43% fewer in GOLD 2, and transitional bronchioles 56% and 59% fewer. Bronchiolar loss was found even in samples with a normal alveolar surface area [[Koo2018]]. MicroCT of GOLD 4 lungs removed at transplant showed 72–89% fewer terminal bronchioles than controls, and narrowing and loss came before emphysematous destruction (P<0.001) [[McDonough2011]].`,
  pt:`Many of the tiniest airways disappear altogether, often before the air sacs are damaged [[McDonough2011,Koo2018]].`,
  hook:`Terminal bronchioles are lost before emphysema develops: 40% fewer already in GOLD 1 [[Koo2018,McDonough2011]].`},
 {from:.83,at:.93,k:'Destruction',t:'Alveolar walls break down',sub:'elastase cuts the elastin and the air sacs merge',
  txt:`The Prolastin-C label describes emphysema through the protease–antiprotease imbalance model: α1-PI is the main antiprotease of the lower respiratory tract and blocks neutrophil elastase, and smoking and infection raise elastase by recruiting neutrophils [[FDA-ProlastinC]]. Centrilobular emphysema, most closely linked to smoking, starts around the respiratory bronchioles and its lesions merge; panacinar (panlobular) emphysema involves the acinus more evenly and is associated with alpha-1 antitrypsin deficiency [[Hogg2004Lancet,Hogg2009]]. Alveolar surface area was 33% lower in GOLD 1 and 45% lower in GOLD 2 [[Koo2018]].`,
  pt:`Emphysema means the walls between air sacs break down. The lung loses its spring, so air gets trapped [[Hogg2004Lancet]].`,
  hook:`Centrilobular emphysema goes with smoking and starts at the respiratory bronchioles. Panacinar (panlobular) goes with AATD [[Hogg2004Lancet]].`}
];
const LU_TXT={
 lvl:['Whole lung','Small airway <2 mm','Terminal bronchioles','Air sacs (alveoli)'],
 lumen:'lumen',wall:'wall',muscle:'muscle',mucus:'mucus',follicle:'follicle',elastin:'elastin',elastase:'elastase',sac:'air sac',
 a1:'α1-PI anti-elastase capacity in lung fluid',nonsm:'non-smokers',sm:'smokers: 40% lower',
 sput:'Sputum in COPD has more neutrophils, IL-8 and TNF-α',neut:'neutrophil',macro:'macrophage',
 adapt:'More small airways hold these cells as GOLD stage rises',cd8:'CD8+ T cell',bcell:'B-cell follicle',
 open:'open lumen (drawn)',goblet:'goblet cells: more',muc:'mucus in the lumen',
 tbT:'terminal bronchioles lost',g1:'GOLD 1',g2:'GOLD 2',g4:'GOLD 4',g1v:'−40%',g2v:'−43%',g4v:'−72 to −89%',
 tbFoot:'GOLD 1–2 vs smokers with normal lungs; GOLD 4 vs controls',lostLbl:'dashed: lost',tbLbl:'terminal bronchioles',
 area:'gas-exchange surface',surf:'Alveolar surface area: 33% lower in GOLD 1, 45% lower in GOLD 2',
 il8:'IL-8',tnf:'TNF-α',ox:'oxidants'
};
/* the cell cast: name, colour token and what the research says */
const LU_CAST=[
 {k:'neut',n:'Neutrophil',txt:`Induced sputum from people with COPD had more neutrophils and higher IL-8 and TNF-α than sputum from controls [[Keatings1996]]. Most patients have neutrophilic inflammation [[Barnes2016]]. In the protease–antiprotease model the Prolastin-C label describes, smoking and infection raise elastase by recruiting neutrophils [[FDA-ProlastinC]].`},
 {k:'macro',n:'Alveolar macrophage',txt:`Alveolar macrophages increase in COPD [[Barnes2016]]. In mice, macrophage elastase is required for smoke-induced emphysema: knockout mice had no rise in lung macrophages and no emphysema, and when macrophages were recruited with monocyte chemoattractant protein-1 there was still no airspace enlargement <span class="ev est">Established in animal models</span> [[Hautamaki1997]].`},
 {k:'cd8',n:'CD8+ T cell',txt:`Smokers with COPD had more CD8+ T cells in their peripheral airways than smokers with normal lung function [[Saetta1998]]. In severe emphysema, CT extent of destruction tracked tissue CD8 cell density most closely of all cell types (R²=0.858) [[Retamales2001]]. CD8+ cells are also raised in the walls of the pulmonary arteries in smokers and in COPD [[Peinado1999]].`},
 {k:'bcell',n:'B cells and lymphoid follicles',txt:`Lymphoid aggregates with follicles became more common as COPD progressed (P=0.003), evidence of an adaptive immune response in the small airways [[Hogg2004]]. Antielastin antibodies and Th1 responses tracked emphysema severity in smokers, so emphysema may have an autoimmune component <span class="ev hyp">Hypothesis</span> [[Lee2007]].`},
 {k:'goblet',n:'Goblet cell',txt:`In chronic bronchitis goblet cells overproduce and hypersecrete mucus, which plugs small airways, remodels the epithelium and changes surface tension so airways collapse more easily [[Kim2013]]. Smokers with chronic bronchitis and airflow limitation had more goblet cells in the peripheral airway epithelium than non-smokers [[Saetta2000]].`},
 {k:'eos',n:'Eosinophil',txt:`A subset of patients has raised eosinophils, possibly driven by Th2 cells and type 2 innate lymphoid cells after epithelial IL-33 release, and these patients may respond better to corticosteroids [[Barnes2016]]. In 182 exacerbations, 28% were linked to sputum eosinophilia [[Bafadhel2011]].`},
 {k:'epi',n:'Epithelial cell',txt:`A broken epithelial barrier is one of the four processes Hogg describes that narrow small airways [[Hogg2004Lancet]]. Structural cells add cytokines, chemokines and lipid mediators [[Barnes2016]]. Alveolar epithelial cells expressing adenoviral E1A protein were 5- to 40-fold more common in mild and severe disease, a proposed amplifier of inflammation <span class="ev hyp">Hypothesis</span> [[Retamales2001]].`}
];
/* emphysema in one lobule */
const LU_EM={
 cl:{n:'Centrilobular',grades:['trace','mild','moderate','confluent','advanced destructive'],
  txt:`Most closely linked to smoking. It starts around the respiratory bronchioles at the centre of the lobule, and the separate lesions merge to destroy large volumes of lung [[Hogg2004Lancet,Hogg2009]]. The Fleischner Society grades it as trace, mild, moderate, confluent or advanced destructive [[Lynch2015]]. In MESA COPD, centrilobular emphysema was linked to 21 more pack-years [[Smith2014]].`},
 pl:{n:'Panlobular (panacinar)',grades:null,
  txt:`Involves the acinus more evenly and is associated with alpha-1 antitrypsin deficiency [[Hogg2004Lancet,Hogg2009]]. In MESA COPD, panlobular emphysema was linked to a body mass index 5 kg/m² lower. Both centrilobular and panlobular emphysema came with more dyspnoea, shorter walk distance, more hyperinflation and lower diffusing capacity [[Smith2014]].`}
};
const LU_EMT={bron:'respiratory bronchiole',lucent:'destroyed, air-filled space',intact:'intact air sacs',edge:'lobule edge',
 none:'no emphysema drawn',grade:g=>`Fleischner grade name: ${g}`,sch:'severity drawn: schematic',
 sevLbl:v=>`${Math.round(v*100)}% of the scale`};
const LU_PLUG={rows:[{seg:'0 segments',share:59.3,died:34.0},{seg:'1–2 segments',share:21.8,died:46.7},{seg:'3 or more segments',share:18.9,died:54.1}],
 ttl:'Died during follow-up (median 9.5 years)',share:v=>`${v}% of patients`,val:v=>`${v.toFixed(1)}%`};
/* a small cell icon at (x,y) with radius r; colours from the cell tokens */
function luCell(k,x,y,r,op=1){const X=f1(x),Y=f1(y),sw=f1(Math.max(1,r*.16));let g=`<g style="opacity:${f1(op)}">`;
 if(k==='neut'){g+=`<circle cx="${X}" cy="${Y}" r="${f1(r)}" style="fill:var(--cell);stroke:var(--neut);stroke-width:${sw}"/>`;
  [[-.4,-.12],[.02,.3],[.4,-.16]].forEach(([a,b])=>g+=`<circle cx="${f1(x+a*r)}" cy="${f1(y+b*r)}" r="${f1(r*.3)}" style="fill:var(--neut)"/>`)}
 else if(k==='macro'){let d='';for(let i=0;i<=12;i++){const a=i/12*Math.PI*2,rr=r*(1+.13*Math.sin(i*2.3));d+=(i?'L':'M')+f1(x+Math.cos(a)*rr)+' '+f1(y+Math.sin(a)*rr)}
  g+=`<path d="${d}Z" style="fill:var(--cell);stroke:var(--macro);stroke-width:${sw};stroke-linejoin:round"/><ellipse cx="${f1(x-r*.2)}" cy="${f1(y+r*.12)}" rx="${f1(r*.42)}" ry="${f1(r*.3)}" style="fill:var(--macro)"/>`+
   `<circle cx="${f1(x+r*.42)}" cy="${f1(y-r*.35)}" r="${f1(r*.16)}" style="fill:none;stroke:var(--macro);stroke-width:1"/><circle cx="${f1(x+r*.2)}" cy="${f1(y+r*.5)}" r="${f1(r*.12)}" style="fill:none;stroke:var(--macro);stroke-width:1"/>`}
 else if(k==='cd8'){g+=`<circle cx="${X}" cy="${Y}" r="${f1(r)}" style="fill:var(--cell);stroke:var(--co2);stroke-width:${sw}"/><circle cx="${X}" cy="${Y}" r="${f1(r*.66)}" style="fill:var(--co2)"/>`}
 else if(k==='bcell'){g+=`<circle cx="${X}" cy="${Y}" r="${f1(r)}" style="fill:var(--co2-soft);stroke:var(--co2-ink);stroke-width:1;stroke-dasharray:3 2"/>`;
  [[0,0],[.5,0],[-.5,0],[.25,.44],[-.25,.44],[.25,-.44],[-.25,-.44]].forEach(([a,b])=>g+=`<circle cx="${f1(x+a*r)}" cy="${f1(y+b*r)}" r="${f1(r*.22)}" style="fill:var(--cell);stroke:var(--co2-ink);stroke-width:1"/>`)}
 else if(k==='goblet'){g+=`<path d="M${f1(x-r*.3)} ${f1(y+r)}C${f1(x-r*.9)} ${f1(y+r*.2)} ${f1(x-r*.75)} ${f1(y-r*.75)} ${f1(x)} ${f1(y-r*.85)}C${f1(x+r*.75)} ${f1(y-r*.75)} ${f1(x+r*.9)} ${f1(y+r*.2)} ${f1(x+r*.3)} ${f1(y+r)}Z" style="fill:var(--mucus-soft);stroke:var(--mucus-ink);stroke-width:${sw}"/>`+
   `<circle cx="${X}" cy="${f1(y-r*.25)}" r="${f1(r*.38)}" style="fill:var(--mucus)"/><ellipse cx="${X}" cy="${f1(y+r*.62)}" rx="${f1(r*.22)}" ry="${f1(r*.14)}" style="fill:var(--nucleus)"/>`}
 else if(k==='eos'){g+=`<circle cx="${X}" cy="${Y}" r="${f1(r)}" style="fill:var(--cell);stroke:var(--eos);stroke-width:${sw}"/><circle cx="${f1(x-r*.3)}" cy="${Y}" r="${f1(r*.3)}" style="fill:var(--eos)"/><circle cx="${f1(x+r*.3)}" cy="${Y}" r="${f1(r*.3)}" style="fill:var(--eos)"/>`;
  [[0,-.62],[-.5,.5],[.5,.5],[.62,-.3],[-.62,-.3]].forEach(([a,b])=>g+=`<circle cx="${f1(x+a*r)}" cy="${f1(y+b*r)}" r="${f1(Math.max(.8,r*.08))}" style="fill:var(--eos)"/>`)}
 else if(k==='epi'){g+=`<rect x="${f1(x-r*.5)}" y="${f1(y-r*.8)}" width="${f1(r)}" height="${f1(r*1.8)}" rx="${f1(r*.18)}" style="fill:var(--cell);stroke:var(--bronchi);stroke-width:${sw}"/><ellipse cx="${X}" cy="${f1(y+r*.4)}" rx="${f1(r*.28)}" ry="${f1(r*.34)}" style="fill:var(--nucleus)"/>`;
  let d='';for(let i=0;i<5;i++){const cx=x-r*.4+i*r*.2;d+=`M${f1(cx)} ${f1(y-r*.8)}l${f1(r*.06)} ${f1(-r*.34)}`}g+=`<path d="${d}" style="stroke:var(--bronchi);stroke-width:1.2;fill:none"/>`}
 return g+'</g>'}
/* a small elastase diamond */
function luNE(x,y,s,op){return `<path d="M${f1(x)} ${f1(y-s)}L${f1(x+s)} ${f1(y)}L${f1(x)} ${f1(y+s)}L${f1(x-s)} ${f1(y)}Z" style="fill:var(--inflamed);opacity:${f1(op)}"/>`}
inits.lungs=()=>{
  const svg=$('#luSvg'),rg=$('#luT');
  /* the order in which the 20 terminal branches drop out (fixed, so scrubbing is repeatable) */
  const R0=rng(17),order=[...Array(20).keys()].map(i=>[i,R0()]).sort((a,b)=>a[1]-b[1]).map(a=>a[0]),rank=[];order.forEach((k,i)=>rank[k]=i);
  function lbl(x1,y1,x2,y2,txt,op=1){return `<g style="opacity:${f1(op)}"><path d="M${f1(x1)} ${f1(y1)}L${f1(x2-3)} ${f1(y2-3)}" style="stroke:var(--muted);stroke-width:1;fill:none"/><circle cx="${f1(x1)}" cy="${f1(y1)}" r="2" style="fill:var(--ink)"/><text x="${f1(x2)}" y="${f1(y2)}" class="t-xs" style="fill:var(--ink)">${txt}</text></g>`}
  function bar(x,y,w,h,v,col,bg='var(--panel-2)'){return `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="3" style="fill:${bg}"/><rect x="${f1(x)}" y="${f1(y)}" width="${f1(Math.max(0,w*clamp(v)))}" height="${f1(h)}" rx="3" style="fill:${col}"/>`}
  function draw(t){
    const N=vb(svg,'720 400','400 650'),p=phaseOf(LU_STEPS,t),S=LU_STEPS[p];
    const L=N?{M:{x:16,y:58,w:368,h:150},mx:90,my:68,ms:128,Z:[128,150],ld:{x:184,y:82,dy:22},P:{x:16,y:222,w:368,h:412},D:{x:164,y:350,r:72},LX:278,C:{x:32,y:496,w:336},cw:52,
               tr:{x0:46,x1:316,y0:252,y1:470},trL:236,al:210}
             :{M:{x:16,y:58,w:176,h:302},mx:104,my:74,ms:170,Z:[152,190],ld:{x:34,y:284,dy:20},P:{x:208,y:58,w:496,h:302},D:{x:335,y:210,r:82},LX:464,C:{x:536,y:86,w:156},cw:24,
               tr:{x0:236,x1:494,y0:84,y1:344},trL:72,al:244};
    let s=`<text x="16" y="26" class="t-big">${S.t}</text><text x="16" y="44" class="t-sm">${S.sub}</text>`;
    /* ---- the map: whole lung with a zoom target ---- */
    const M=L.M,lv=[1,1,1,1,2,3][p],[zx,zy]=L.Z,P=L.P;
    s+=`<rect x="${M.x}" y="${M.y}" width="${M.w}" height="${M.h}" rx="12" style="fill:none;stroke:var(--line)"/><rect x="${P.x}" y="${P.y}" width="${P.w}" height="${P.h}" rx="12" style="fill:none;stroke:var(--line)"/>`;
    s+=lungs(L.mx,L.my,L.ms,{tree:true,inflam:ramp(t,.17,.3)*.6,mucus:ramp(t,.53,.64)*.8,bullae:ramp(t,.86,1)*.7,breathe:(Math.sin(t*70)+1)/4});
    const sm=1-ramp(t,.17,.26);
    if(sm>0)for(let i=0;i<7;i++){const u=(t*30+i/7)%1;s+=`<circle cx="${f1(L.mx+Math.sin(i*1.7)*2)}" cy="${f1(lerp(L.my-4,L.my+L.ms*.32,u))}" r="2.2" style="fill:var(--smoke);opacity:${f1(sm*(1-u*.6))}"/>`}
    const zr=[10,10,10,10,7,5][p];
    s+=N?`<path d="M${zx} ${zy}L${P.x+6} ${P.y}M${zx} ${zy}L${P.x+P.w-6} ${P.y}" style="stroke:var(--brand);stroke-width:1;stroke-dasharray:3 4;opacity:.6"/>`
        :`<path d="M${zx} ${zy}L${P.x} ${P.y+6}M${zx} ${zy}L${P.x} ${P.y+P.h-6}" style="stroke:var(--brand);stroke-width:1;stroke-dasharray:3 4;opacity:.6"/>`;
    s+=`<circle cx="${zx}" cy="${zy}" r="${zr}" style="fill:none;stroke:var(--brand);stroke-width:2"/>`;
    LU_TXT.lvl.forEach((n,i)=>{const y=L.ld.y+i*L.ld.dy,on=i===lv,past=i<lv;
      s+=`<circle cx="${L.ld.x-10}" cy="${y-4}" r="${on?4.5:3}" style="fill:${on?'var(--brand)':past?'var(--muted)':'none'};stroke:var(--brand);stroke-width:1.2"/><text x="${L.ld.x}" y="${y}" class="t-sm" style="${on?'fill:var(--brand);font-weight:700':past?'fill:var(--ink)':''}">${n}</text>`});
    /* ---- the scene ---- */
    const D=L.D,r=D.r,C=L.C,LX=L.LX,ph=t*40;
    let col='';
    if(p<=3){
      const inf=ramp(t,.17,.3)*.75,wall=ramp(t,.5,.62)*.9,mu=ramp(t,.53,.64)*.62,sq=ramp(t,.52,.64)*.45;
      const rw=r*(.2+.22*wall),lr=(r-rw)*(1-.55*sq);
      const A=airway(D.x,D.y,r,{wall,squeeze:sq,mucus:mu,inflam:inf,ph,seed:4});s+=A.svg;
      /* smoke and oxidants in the lumen */
      if(sm>0){const R=rng(5);for(let i=0;i<16;i++){const a=R()*Math.PI*2+t*3,d=lr*.8*Math.sqrt(R());
        s+=`<circle cx="${f1(D.x+Math.cos(a)*d)}" cy="${f1(D.y+Math.sin(a)*d)}" r="${i%3?2.4:1.7}" style="fill:${i%3?'var(--smoke)':'var(--tar)'};opacity:${f1(sm*.85)}"/>`}
        if(sm>.5)s+=chip(D.x,D.y-lr*.45,LU_TXT.ox,{anchor:'middle',size:11,col:'var(--tar)',tcol:'var(--ink)'})}
      /* cells arriving from the blood: neutrophils and macrophages, then CD8+ cells */
      const R=rng(21);
      for(let i=0;i<10;i++){const a=R()*Math.PI*2,dst=lerp(lr+(r-lr)*.3,r*.9,R()),u=ease(ramp(t,.18+i*.008,.27+i*.008));if(u<=0)continue;
        const d=lerp(r*1.55,dst,u),k=i%3?'neut':'macro';s+=luCell(k,D.x+Math.cos(a)*d,D.y+Math.sin(a)*d,k==='neut'?r*.065:r*.085)}
      const R2=rng(33);
      for(let i=0;i<7;i++){const a=R2()*Math.PI*2,dst=lerp(lr+(r-lr)*.3,r*.9,R2()),u=ease(ramp(t,.35+i*.008,.44+i*.008));if(u<=0)continue;
        const d=lerp(r*1.55,dst,u);s+=luCell('cd8',D.x+Math.cos(a)*d,D.y+Math.sin(a)*d,r*.055)}
      const fo=ramp(t,.38,.48),fa=-.55,fx=D.x+Math.cos(fa)*r*.86,fy=D.y+Math.sin(fa)*r*.86;
      if(fo>0)s+=luCell('bcell',fx,fy,r*.15*fo);
      /* goblet cells line the lumen as the wall remodels */
      const gb=ramp(t,.5,.6);if(gb>0)for(let i=0;i<6;i++){const a=i/6*Math.PI*2+.3,gx=D.x+Math.cos(a)*(lr+r*.04),gy=D.y+Math.sin(a)*(lr+r*.04);s+=luCell('goblet',gx,gy,r*.07,gb)}
      if(p===1){s+=chip(D.x-r*.95,D.y-r*1.2,LU_TXT.il8,{anchor:'middle',size:11,col:'var(--inflamed)',tcol:'var(--ink)'})+chip(D.x+r*.2,D.y+r*1.3,LU_TXT.tnf,{anchor:'middle',size:11,col:'var(--inflamed)',tcol:'var(--ink)'})}
      /* labels to the right */
      const lx=LX;
      if(lr>r*.25)s+=lbl(D.x+lr*.35,D.y-lr*.5,lx,D.y-r*.95,LU_TXT.lumen);
      if(p>=2)s+=lbl(fx+r*.08,fy-r*.05,lx,D.y-r*.6,LU_TXT.follicle,fo);
      s+=lbl(D.x+Math.cos(-.12)*(r-rw*.12),D.y+Math.sin(-.12)*(r-rw*.12),lx,D.y-r*.22,LU_TXT.wall);
      s+=lbl(D.x+Math.cos(.35)*(r-rw*.35),D.y+Math.sin(.35)*(r-rw*.35),lx,D.y+r*.38,LU_TXT.muscle);
      if(mu>.1)s+=lbl(D.x+lr*.2,D.y+lr*.3,lx,D.y+r*.95,LU_TXT.mucus);
      /* side column */
      if(p===0){const T=wrapT(C.x,C.y,LU_TXT.a1,L.cw,{cls:'t-sm',style:'fill:var(--ink)'});let y=C.y+T.h+6;
        col+=T.svg+`<text x="${C.x}" y="${y+6}" class="t-xs">${LU_TXT.nonsm}</text>`+bar(C.x,y+12,C.w,12,1,'var(--dx)');
        y+=40;col+=`<text x="${C.x}" y="${y+6}" class="t-xs">${LU_TXT.sm}</text>`+bar(C.x,y+12,C.w,12,1-.4*ramp(t,.02,.1),'var(--dx)','var(--smoke-soft)')}
      else if(p===1){const T=wrapT(C.x,C.y,LU_TXT.sput,L.cw,{cls:'t-sm',style:'fill:var(--ink)'});let y=C.y+T.h+12;col+=T.svg;
        [['neut',LU_TXT.neut],['macro',LU_TXT.macro]].forEach(([k,n],i)=>{col+=luCell(k,C.x+7,y+i*24-4,7)+`<text x="${C.x+22}" y="${y+i*24}" class="t-xs" style="fill:var(--ink)">${n}</text>`})}
      else if(p===2){const T=wrapT(C.x,C.y,LU_TXT.adapt,L.cw,{cls:'t-sm',style:'fill:var(--ink)'});let y=C.y+T.h+12;col+=T.svg;
        [['cd8',LU_TXT.cd8],['bcell',LU_TXT.bcell]].forEach(([k,n],i)=>{col+=luCell(k,C.x+7,y+i*26-4,k==='bcell'?9:6)+`<text x="${C.x+22}" y="${y+i*26}" class="t-xs" style="fill:var(--ink)">${n}</text>`})}
      else{const ol=Math.pow(A.lumen/(r*.8),2);col+=`<text x="${C.x}" y="${C.y}" class="t-sm" style="fill:var(--ink)">${LU_TXT.open}</text>`+bar(C.x,C.y+8,C.w,14,ol,'var(--air)');
        col+=luCell('goblet',C.x+7,C.y+44,7)+`<text x="${C.x+22}" y="${C.y+48}" class="t-xs" style="fill:var(--ink)">${LU_TXT.goblet}</text>`;
        col+=`<rect x="${C.x}" y="${C.y+62}" width="14" height="10" rx="3" style="fill:var(--mucus)"/><text x="${C.x+22}" y="${C.y+71}" class="t-xs" style="fill:var(--ink)">${LU_TXT.muc}</text>`}
    }else if(p===4){
      /* a fan of terminal bronchioles: 5 branches of 4; branches drop out as GOLD stage rises */
      const T=L.tr,my=(T.y0+T.y1)/2,xa=lerp(T.x0,T.x1,.26),xb=lerp(T.x0,T.x1,.6),u=ramp(t,.68,.81);
      const f=u<.33?lerp(0,.40,u/.33):u<.66?lerp(.40,.43,(u-.33)/.33):lerp(.43,.8,(u-.66)/.34),lostN=Math.round(20*f),gi=u<.33?0:u<.66?1:2;
      s+=`<text x="${T.x1+12}" y="${L.trL}" class="t-xs" text-anchor="end" style="fill:var(--ink)">${LU_TXT.tbLbl}</text>`;
      s+=`<path d="M${T.x0} ${f1(my)}L${f1(xa)} ${f1(my)}" style="stroke:var(--bronchi);stroke-width:9;stroke-linecap:round;fill:none"/>`;
      for(let i=0;i<5;i++){const yb=lerp(T.y0+(T.y1-T.y0)*.1,T.y1-(T.y1-T.y0)*.1,i/4);let alive=0;
        let tb='';for(let j=0;j<4;j++){const k=i*4+j,yt=lerp(T.y0,T.y1,k/19),gone=rank[k]<lostN;if(!gone)alive++;
          tb+=gone?`<path d="M${f1(xb)} ${f1(yb)}L${T.x1} ${f1(yt)}" style="stroke:var(--muted);stroke-width:1.2;stroke-dasharray:3 3;fill:none;opacity:.6"/><circle cx="${T.x1+8}" cy="${f1(yt)}" r="5" style="fill:none;stroke:var(--line);stroke-dasharray:2 2"/>`
                  :`<path d="M${f1(xb)} ${f1(yb)}L${T.x1} ${f1(yt)}" style="stroke:var(--bronchi);stroke-width:2.6;stroke-linecap:round;fill:none"/><circle cx="${T.x1+8}" cy="${f1(yt)}" r="5.5" style="fill:var(--alv);stroke:var(--alv-edge);stroke-width:1.2"/>`}
        s+=`<path d="M${f1(xa)} ${f1(my)}C${f1(lerp(xa,xb,.5))} ${f1(my)} ${f1(lerp(xa,xb,.5))} ${f1(yb)} ${f1(xb)} ${f1(yb)}" style="stroke:var(--bronchi);stroke-width:5;stroke-linecap:round;fill:none;opacity:${alive?1:.35}"/>`+tb}
      /* column: the three published losses */
      col+=`<text x="${C.x}" y="${C.y}" class="t-xs" style="fill:var(--ink);font-weight:700">${LU_TXT.tbT}</text>`;
      [[LU_TXT.g1,LU_TXT.g1v,.40,null],[LU_TXT.g2,LU_TXT.g2v,.43,null],[LU_TXT.g4,LU_TXT.g4v,.72,.89]].forEach(([g,v,a,b],i)=>{const y=C.y+12+i*32,on=i===gi,op=i<=gi?1:.35;
        col+=`<g style="opacity:${op}"><text x="${C.x}" y="${y+9}" class="t-xs" style="${on?'fill:var(--ink);font-weight:700':''}">${g}</text><text x="${C.x+C.w}" y="${y+9}" class="t-xs" text-anchor="end" style="fill:var(--ink)">${v}</text>`+bar(C.x,y+13,C.w,11,a,'var(--bad)');
        if(b)col+=`<rect x="${f1(C.x+C.w*a)}" y="${y+13}" width="${f1(C.w*(b-a))}" height="11" style="fill:var(--bad-soft);stroke:var(--bad);stroke-dasharray:2 2"/>`;
        col+='</g>'});
      col+=wrapT(C.x,C.y+112,LU_TXT.tbFoot,N?54:26,{cls:'t-xs',lh:12}).svg;
      s+=`<path d="M${T.x0} ${L.trL-3}h16" style="stroke:var(--muted);stroke-width:1.2;stroke-dasharray:3 3"/><text x="${T.x0+22}" y="${L.trL}" class="t-xs">${LU_TXT.lostLbl}</text>`;
    }else{
      /* air sacs: neutrophils release elastase onto the elastin and the walls give way */
      const de=ramp(t,.86,.98)*.85,sz=L.al,V=alveoli(D.x,D.y,sz,{destroy:de,elastin:true,cap:true,o2:.8*(1-de*.6),ph:t*30,seed:6});s+=V.svg;
      const r0=sz*.16*(1+de*.4);
      const cells=[['neut',-.85,-1.45],['neut',.9,.05],['neut',-.95,1.5],['macro',.95,-1.55],['macro',.05,.98],['cd8',-1.0,.05]];
      cells.forEach(([k,a,b],i)=>{const x=D.x+a*r0,y=D.y+b*r0;s+=luCell(k,x,y,k==='macro'?sz*.035:sz*.026);
        if(k==='neut')for(let j=0;j<3;j++){const u=(t*14+j/3+i*.2)%1,tx=x+(Math.sign(a)||1)*r0*.55*u,ty=y+(b>0?-1:1)*r0*.35*u;s+=luNE(tx,ty,2.6,(1-u)*ramp(t,.84,.87))}});
      s+=lbl(D.x+1.7*r0+r0*.1,D.y-.9*r0-r0*.75,LX,D.y-r*1.2,LU_TXT.elastin);
      s+=lbl(D.x+.9*r0+sz*.02,D.y+.05*r0+3,LX,D.y-r*.3,LU_TXT.elastase);
      s+=lbl(D.x+1.8*r0+r0*.4,D.y+1*r0+r0*.3,LX,D.y+r*.9,LU_TXT.sac);
      col+=`<text x="${C.x}" y="${C.y}" class="t-sm" style="fill:var(--ink)">${LU_TXT.area}</text>`+bar(C.x,C.y+8,C.w,14,V.area,'var(--alv-edge)');
      col+=wrapT(C.x,C.y+42,LU_TXT.surf,L.cw,{cls:'t-xs',lh:13,style:'fill:var(--ink)'}).svg;
      col+=luNE(C.x+5,C.y+(N?72:100),4,1)+`<text x="${C.x+16}" y="${C.y+(N?76:104)}" class="t-xs">${LU_TXT.elastase}</text>`;
    }
    s+=col;svg.innerHTML=s;
    setSt(p);$('#luNote').innerHTML=noteHTML(S);
  }
  const stop=playWire(rg,$('#luPlay'),draw,18000,'%t:player.replay%','lungs');
  const setSt=stepWire($('#luSteps'),LU_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- the cell cast ---- */
  const cs=$('#luCastSvg'),cb=$('#luCastBtns'),cn=$('#luCastNote');let ci=0;
  cb.innerHTML=LU_CAST.map((c,i)=>`<button class="btn" data-ci="${i}" aria-pressed="${i===0}">${c.n}</button>`).join('');
  function drawCast(){const N=vb(cs,'720 170','400 300');let s='';
    LU_CAST.forEach((c,i)=>{const per=N?4:7,row=Math.floor(i/per),col=i%per,sw=N?92:688/7,x=(N?16+(400-32-sw*per)/2:16)+sw*(col+.5),y=(N?50:58)+row*140,on=i===ci,rr=on?26:20;
      if(on)s+=`<circle cx="${f1(x)}" cy="${y}" r="${rr+8}" style="fill:var(--brand-soft);stroke:var(--brand);stroke-width:2"/>`;
      s+=luCell(c.k,x,y,rr,on?1:.75);
      s+=wrapT(x,y+rr+(on?24:20),c.n,13,{cls:'t-xs',lh:12,anchor:'middle',style:on?'fill:var(--ink);font-weight:700':''}).svg});
    cs.innerHTML=s;cn.innerHTML=`<div class="kicker">${LU_CASTK}</div><h4>${LU_CAST[ci].n}</h4><p>${LU_CAST[ci].txt}</p>`;
    $$('[data-ci]',cb).forEach((b,k)=>b.setAttribute('aria-pressed',k===ci))}
  cb.addEventListener('click',e=>{const b=e.target.closest('[data-ci]');if(!b)return;ci=+b.dataset.ci;drawCast()});
  drawCast();

  /* ---- centrilobular vs panlobular ---- */
  const es=$('#luEmSvg'),eb=$('#luEmBtns'),er=$('#luEmS'),eo=$('#luEmV'),en=$('#luEmNote');let em='cl';
  function drawEm(){const N=vb(es,'720 300','400 420'),sev=+er.value,E=LU_EM[em];
    const cx=N?200:190,cy=N?148:150,R=N?124:122,sp=R*.15,ar=sp*.46;let s='';
    const hex=k=>{let d='';for(let i=0;i<6;i++){const a=i/6*Math.PI*2;d+=(i?'L':'M')+f1(cx+Math.cos(a)*R*k)+' '+f1(cy+Math.sin(a)*R*k)}return d+'Z'};
    const inside=(x,y,m)=>{const dx=Math.abs(x-cx),dy=Math.abs(y-cy),h=.866*R-m;return dy<=h&&dx*.866+dy*.5<=h};
    s+=`<path d="${hex(1)}" style="fill:var(--alv);opacity:.45"/>`;
    const R1=rng(31),pts=[];
    for(let j=-9;j<=9;j++)for(let i=-9;i<=9;i++){const x=cx+(i+(j&1?.5:0))*sp,y=cy+j*sp*.866;if(!inside(x,y,ar*1.1))continue;const dn=Math.hypot(x-cx,y-cy)/R;if(dn<.1)continue;
      const nz=R1();const dmg=em==='cl'?clamp((sev*1.3-dn)*2.6+(nz-.5)*.35):clamp(sev*1.15-.12+(nz-.5)*.3);pts.push([x,y,dmg])}
    pts.forEach(([x,y,d])=>{if(d>.45)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(ar*1.35)}" style="fill:var(--panel);opacity:${f1(clamp((d-.45)*2.2))}"/>`});
    pts.forEach(([x,y,d])=>{if(d<.97)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(ar*(1+.3*d))}" style="fill:var(--alv);stroke:var(--alv-edge);stroke-width:${f1(1.3*(1-d)+.3)};opacity:${f1(1-.8*d)}"/>`});
    s+=`<path d="${hex(1)}" style="fill:none;stroke:var(--alv-edge);stroke-width:3"/>`;
    s+=`<circle cx="${cx}" cy="${cy}" r="${f1(sp*.6)}" style="fill:var(--airway);stroke:var(--bronchi);stroke-width:1.4"/><circle cx="${cx}" cy="${cy}" r="${f1(sp*.32)}" style="fill:var(--air-soft)"/>`;
    const gname=sev<.04?LU_EMT.none:E.grades?LU_EMT.grade(E.grades[Math.min(4,Math.floor(sev*5))]):LU_EMT.sch;
    const leg=(x,y)=>`<circle cx="${x+6}" cy="${y-4}" r="6" style="fill:var(--alv);stroke:var(--alv-edge);stroke-width:1.3"/><text x="${x+20}" y="${y}" class="t-xs" style="fill:var(--ink)">${LU_EMT.intact}</text>`+
      `<rect x="${x}" y="${y+12}" width="12" height="12" rx="3" style="fill:var(--panel);stroke:var(--line)"/><text x="${x+20}" y="${y+22}" class="t-xs" style="fill:var(--ink)">${LU_EMT.lucent}</text>`+
      `<path d="M${x} ${y+40}h12" style="stroke:var(--alv-edge);stroke-width:3"/><text x="${x+20}" y="${y+44}" class="t-xs" style="fill:var(--ink)">${LU_EMT.edge}</text>`;
    if(N){s+=`<path d="M${cx} ${f1(cy+sp*.6)}V${f1(cy+R*.866+18)}" style="stroke:var(--ink);stroke-width:1"/><text x="${cx}" y="${f1(cy+R*.866+30)}" class="t-xs" text-anchor="middle" style="fill:var(--ink)">${LU_EMT.bron}</text>`;
      s+=`<text x="16" y="322" class="t-big">${E.n}</text><text x="16" y="340" class="t-sm">${gname}</text>`+leg(16,366)}
    else{s+=`<path d="M${f1(cx+sp*.6)} ${cy}L360 ${cy}" style="stroke:var(--ink);stroke-width:1"/><text x="366" y="${cy+4}" class="t-xs" style="fill:var(--ink)">${LU_EMT.bron}</text>`;
      s+=`<text x="366" y="56" class="t-big">${E.n}</text><text x="366" y="76" class="t-sm">${gname}</text>`+leg(366,214)}
    es.innerHTML=s;eo.textContent=LU_EMT.sevLbl(sev);en.innerHTML=`<h4>${E.n}</h4><p>${E.txt}</p>`;
    $$('[data-em]',eb).forEach(b=>b.setAttribute('aria-pressed',b.dataset.em===em))}
  eb.addEventListener('click',e=>{const b=e.target.closest('[data-em]');if(!b)return;em=b.dataset.em;drawEm()});
  er.addEventListener('input',drawEm);drawEm();

  /* ---- mucus plugs and mortality ---- */
  const ps=$('#luPlugSvg');
  function drawPlug(){const N=vb(ps,'720 190','400 236');let s=`<text x="16" y="22" class="t-sm" style="fill:var(--ink)">${LU_PLUG.ttl}</text>`;
    LU_PLUG.rows.forEach((r,i)=>{const v=r.died/60;
      if(N){const y=46+i*64;s+=`<text x="16" y="${y}" class="t-xs" style="fill:var(--ink);font-weight:700">${r.seg}</text><text x="384" y="${y}" class="t-xs" text-anchor="end">${LU_PLUG.share(r.share)}</text>`+
        `<rect x="16" y="${y+8}" width="300" height="20" rx="4" style="fill:var(--panel-2)"/><rect x="16" y="${y+8}" width="${f1(300*v)}" height="20" rx="4" style="fill:var(--mucus)"/><text x="${f1(22+300*v)}" y="${y+23}" class="t-sm" style="fill:var(--ink)">${LU_PLUG.val(r.died)}</text>`}
      else{const y=48+i*48;s+=`<text x="16" y="${y+14}" class="t-xs" style="fill:var(--ink);font-weight:700">${r.seg}</text><text x="16" y="${y+28}" class="t-xs">${LU_PLUG.share(r.share)}</text>`+
        `<rect x="180" y="${y}" width="440" height="22" rx="4" style="fill:var(--panel-2)"/><rect x="180" y="${y}" width="${f1(440*v)}" height="22" rx="4" style="fill:var(--mucus)"/><text x="${f1(188+440*v)}" y="${y+16}" class="t-sm" style="fill:var(--ink)">${LU_PLUG.val(r.died)}</text>`}});
    ps.innerHTML=s}
  drawPlug();
  const prev=redraws.lungs;redraws.lungs=()=>{prev&&prev();drawCast();drawEm();drawPlug()};
};
const LU_CASTK='Cell cast';
