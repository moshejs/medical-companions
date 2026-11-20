/* =============== 3.6 Metabolic & bariatric surgery =============== */
/* Main player: one gut drawn by gutTract() changes from a normal stomach into a sleeve gastrectomy, then (starting
   again from a normal stomach) into a Roux-en-Y gastric bypass; then the gut-hormone signals and the newer bile-acid and
   microbiome ideas. Hormone arrows show direction only, never measured levels. */
const SU_STEPS=[
 {from:0,at:.06,k:'Before surgery',t:'The stomach and gut',
  txt:'Food passes from the oesophagus into the stomach, then the duodenum, the small intestine and the colon. The stomach and gut also send hunger and fullness hormones such as ghrelin, GLP-1 and PYY (see <a href="#appetite" data-go="appetite">the gut-brain loop</a>). About 280,000 metabolic and bariatric operations were done in the United States in 2022, yet the ASMBS estimates that only about 1% of people who qualify have surgery. [[Clapp2024ASMBS]] Contemporary operations are done laparoscopically in the vast majority of cases. [[Nguyen2017NatRev]]',
  pt:'Weight-loss surgery changes the stomach and gut, and also the hormones that control hunger and fullness. It is more than "a smaller stomach".',
  hook:'Sleeve gastrectomy and Roux-en-Y gastric bypass together make up about 90% of operations worldwide. [[Eisenberg2022ASMBS]]'},
 {from:.17,at:.3,k:'Operation 1',t:'Sleeve gastrectomy',
  txt:'The surgeon removes the greater curvature of the stomach, leaving a narrow tube along the lesser curvature. One review describes resection of "approximately 80%" of the stomach; [[Kim2026Complications]] another describes a vertical division that reduces stomach size "by 75%" while keeping the pylorus. [[Lupoli2017]] In one series the cut started 6 cm from the pylorus and was sized on a 48 Fr bougie. [[Genco2017]] Removing the greater curvature lowers ghrelin. [[Kim2026Complications,Karamanakos2008]]',
  pt:'In a sleeve, most of the stomach is removed and the rest becomes a narrow tube. Food still takes its usual route through the gut.',
  hook:'Sleeve gastrectomy is the most performed operation worldwide (IFSO survey 2020 to 2021). [[Angrisani2024IFSO]]'},
 {from:.36,at:.5,k:'Operation 2',t:'Roux-en-Y gastric bypass',
  txt:'A small gastric pouch is joined to a jejunal Roux limb, so food bypasses most of the stomach, the duodenum and a variable length of upper small bowel. [[Kim2026Complications]] The bypassed stomach stays in place. Digestive juices from the liver and pancreas run down the biliary limb and meet food at the join. In the YOMEGA trial the Roux (alimentary) limb was 150 cm and the biliary limb 50 cm. [[Robert2019YOMEGA]] A longer biliopancreatic limb has been linked with more weight loss and better glucose control (<span class="ev early">Early evidence</span>). [[Kim2026Complications]]',
  pt:'In a bypass, a small pouch is made at the top of the stomach and joined straight to the small intestine. Food skips most of the stomach and the first part of the gut.',
  hook:'Bypass: pouch, alimentary (Roux) limb, biliopancreatic limb, common channel. YOMEGA limbs: 150 cm alimentary, 50 cm biliary. [[Robert2019YOMEGA]]'},
 {from:.56,at:.65,k:'Mechanism',t:'Gut hormones change',
  txt:'After gastric bypass, PYY and GLP-1 rose after meals and insulin responses came early and exaggerated, compared with lean controls and controls with obesity. None of these changes occurred in people who lost the same weight with a gastric band (<span class="ev est">Established</span>). [[leRoux2006]] After a diet-induced weight loss of 17%, 24-hour ghrelin rose by 24%; after a 36% loss with gastric bypass, it was 77% lower than in normal-weight controls. [[Cummings2002]] In a randomised study, fasting ghrelin fell markedly after sleeve but not significantly after bypass, and fasting PYY rose after both. [[Karamanakos2008]]',
  pt:'After a bypass, the gut sends stronger "I am full" signals after meals. Dieting tends to push the hunger hormone up; surgery does not do this in the same way.',
  hook:'Sleeve lowers ghrelin; bypass raises postprandial GLP-1 and PYY. [[Karamanakos2008,leRoux2006]]'},
 {from:.74,at:.86,k:'Newer ideas',t:'Beyond restriction',
  txt:'In mice with diet-induced obesity, the benefits of sleeve gastrectomy did not come from mechanical restriction: bile acids rose, gut microbes changed, and without the bile-acid receptor FXR the weight and glucose benefits were "substantially reduced" (<span class="ev early">Early evidence</span>, animal data). [[Ryan2014Nature]] Bypass produced lasting microbiome changes in people, and germ-free mice given these patients\' stool stored less fat (<span class="ev hyp">Hypothesis</span> for humans). [[Tremaroli2015]] A diabetes-surgery consensus calls the gut "a meaningful target" for treating type 2 diabetes. [[Rubino2016DSS]]',
  pt:'Surgery seems to work through hormones, bile acids and gut bacteria as well as through size. How much each part matters in people is still being studied.',
  hook:'Hormone changes are established in people; bile-acid/FXR and microbiome roles come mainly from mice. [[leRoux2006,Ryan2014Nature,Tremaroli2015]]'}
];
/* hormone rows per phase: [kind, name, direction (-1 falls, 0 no change, 1 rises, null: not reported), text] */
const SU_HROWS=[
 [['ghrelin','ghrelin',0,'stomach: meal-time rhythm'],['glp1','GLP-1',0,'L cells: after meals'],['pyy','PYY',0,'L cells: after meals'],['insulin','insulin',0,'pancreas']],
 [['ghrelin','ghrelin',-1,'fasting level falls'],['glp1','GLP-1',null,'not measured in that trial'],['pyy','PYY',1,'fasting level rises'],['insulin','insulin',null,'not measured in that trial']],
 [['ghrelin','ghrelin',0,'fasting: no significant change'],['glp1','GLP-1',1,'rises after meals'],['pyy','PYY',1,'rises after meals'],['insulin','insulin',1,'early, exaggerated']],
 [['ghrelin','ghrelin',0,'fasting: no significant change'],['glp1','GLP-1',1,'rises after meals'],['pyy','PYY',1,'rises after meals'],['insulin','insulin',1,'early, exaggerated']],
 [['ghrelin','ghrelin',0,'fasting: no significant change'],['glp1','GLP-1',1,'rises after meals'],['pyy','PYY',1,'rises after meals'],['insulin','insulin',1,'early, exaggerated']]
];
const SU_TITLE=[['A normal stomach and gut','food takes the usual route'],['Sleeve gastrectomy','a narrow tube; the pylorus is kept'],['Roux-en-Y gastric bypass','a small pouch joined to the small bowel'],['Gut hormones after bypass','direction of change, not measured levels'],['Beyond restriction','bile acids and gut microbes']];

/* the procedure explorer: route segments and what happens to each */
const SU_SEGS=['Oesophagus','Stomach','Duodenum','Upper small bowel','Lower small bowel (ileum)','Colon'];
const SU_PX={
 sleeve:{lab:'Sleeve',pass:[1,1,1,1,1,1],how:['food passes','a narrow tube','food passes','food passes','food passes','food passes'],
  note:{k:'Sleeve gastrectomy',t:'A narrow tube, same route',
   txt:'The greater curvature is removed and the pylorus kept, so food still passes the duodenum. [[Lupoli2017]] One review gives "approximately 80%" of the stomach removed. [[Kim2026Complications]] It remained the most performed operation worldwide in 2020 to 2021. [[Angrisani2024IFSO]] Reflux is its signature late problem: endoscopic oesophagitis in 31% after sleeve versus 7% after bypass at 10 years in SLEEVEPASS. [[Salminen2022SLEEVEPASS]]',
   pt:'The stomach is made much smaller, but nothing is rerouted.',
   hook:'Sleeve: resecting the greater curvature lowers plasma ghrelin, a hunger-promoting hormone. [[Kim2026Complications,Karamanakos2008]]'}},
 bypass:{lab:'Bypass',pass:[1,.5,0,.5,1,1],how:['food passes','small pouch only','bypassed','biliary limb bypassed','food meets digestive juices','food passes'],
  note:{k:'Roux-en-Y gastric bypass',t:'A pouch and a new route',
   txt:'A small pouch is joined to a jejunal Roux limb, bypassing most of the stomach, the duodenum and some upper small bowel. [[Kim2026Complications]] YOMEGA used a 150 cm alimentary limb and a 50 cm biliary limb. [[Robert2019YOMEGA]] The one-anastomosis bypass uses a single join with a 200 cm biliopancreatic limb; it was non-inferior for weight at 2 years (excess BMI loss 87.9% versus 85.8%) but had more serious adverse events (42 versus 24), including nine nutritional complications versus none. [[Robert2019YOMEGA]]',
   pt:'Food goes from a small pouch straight into the small intestine, skipping most of the stomach and the first part of the gut.',
   hook:'Vitamin B12 deficiency affects 19 to 35% at 5 years after bypass and biliopancreatic diversion, because the duodenum is bypassed and gastric acid and intrinsic factor fall. [[Lupoli2017]]'}},
 band:{lab:'Band',pass:[1,1,1,1,1,1],how:['food passes','through the band\'s outlet','food passes','food passes','food passes','food passes'],
  note:{k:'Adjustable gastric band',t:'A band that can be adjusted',
   txt:'A silicone band sits a few centimetres below the cardia; the outlet is adjusted by adding or removing saline through a port under the skin. [[Lupoli2017]] Its use "has diminished significantly over the past decade" [[Eisenberg2022ASMBS]] and continued to decline worldwide. [[Angrisani2024IFSO]] In LABS-2, weight loss at 7 years averaged 14.9% after a band versus 28.4% after bypass, and 160 band versus 14 bypass participants had reoperations. [[Courcoulas2018LABS]]',
   pt:'A band is a ring around the top of the stomach. It can be tightened or loosened, but it is now used much less often.',
   hook:'After a band, the gut-hormone changes seen after bypass did not occur, despite equal weight loss. [[leRoux2006]]'}},
 switch:{lab:'Duodenal switch',pass:[1,1,.3,0,1,1],how:['food passes','a sleeve','divided just past the pylorus','bypassed','food joins a short common channel','food passes'],
  note:{k:'Biliopancreatic diversion and duodenal switch',t:'The most malabsorptive operations',
   txt:'Biliopancreatic diversion leaves 200 to 250 mL of upper stomach joined to the last 250 cm of small bowel, with a 50 cm common channel where food and digestive juices mix, producing marked fat and protein malabsorption; it and its duodenal-switch variant are used in under 2% of operations because of nutritional risk. [[Lupoli2017]] In people with BMI 50 to 60, BMI fell by 22.1 units after duodenal switch versus 13.6 after bypass at 5 years, but 44.8% versus 9.7% needed further procedures. [[Risstad2015JAMASurg]] SADI-S, a single-join variant, appears in the IFSO/ASMBS evidence review. [[DeLuca2024IFSO]]',
   pt:'This operation combines a sleeve with a long bypass. It gives the most weight loss and the most risk of missing vitamins and protein.',
   hook:'Biliopancreatic diversion/duodenal switch: most weight loss, most malabsorption. [[Risstad2015JAMASurg,Buchwald2004JAMA]]'}}
};

/* SOS weight change: overall surgery and control groups to 20 years [[Sjostrom2013JIM]]; by operation to 10 years,
   with the maximum (reached at 1 to 2 years) plotted at 1.5 years [[Sjostrom2007SOS]] */
const SU_SOS=[
 {id:'all',lab:'All surgery',col:'var(--tx)',dash:'',on:1,P:[[0,0],[2,-23],[10,-17],[15,-16],[20,-18]]},
 {id:'ctl',lab:'Controls (usual care)',col:'var(--muted)',dash:'6 4',on:1,P:[[0,0],[2,0],[10,1],[15,-1],[20,-1]]},
 {id:'gbp',lab:'Gastric bypass',col:'var(--brand)',dash:'',on:0,P:[[0,0],[1.5,-32],[10,-25]]},
 {id:'vbg',lab:'Vertical banded gastroplasty',col:'var(--accent)',dash:'2 3',on:0,P:[[0,0],[1.5,-25],[10,-16]]},
 {id:'band',lab:'Banding',col:'var(--hl)',dash:'9 3 2 3',on:0,P:[[0,0],[1.5,-20],[10,-14]]}
];
/* STAMPEDE 5-year results [[Schauer2017STAMPEDE]] */
const SU_ST={
 a1c:{lab:'HbA1c 6.0% or less',head:'% reaching HbA1c of 6.0% or less at 5 years',v:[5,29,23],max:40,fmt:v=>v+'%'},
 wt:{lab:'Weight change',head:'% weight change at 5 years',v:[-5,-23,-19],max:30,fmt:v=>'−'+Math.abs(v)+'%'},
 ins:{lab:'Insulin use',head:'fall in the share using insulin at 5 years (% points)',v:[13,35,34],max:40,fmt:v=>v+'%'}
};
const SU_ARMS=['Intensive medical therapy','Gastric bypass','Sleeve gastrectomy'];

inits.surgery=()=>{
  /* ---------- main player ---------- */
  const svg=$('#suSvg'),rg=$('#suT'),note=$('#suNote');
  const arrow=(x,y,dir,col,op=1)=>{
    if(dir==null)return `<text x="${f1(x)}" y="${f1(y+4)}" class="t-sm t-mid" style="opacity:${f1(op)}">n/a</text>`;
    if(dir===0)return `<path d="M${f1(x-7)} ${f1(y)}H${f1(x+7)}" style="stroke:var(--muted);stroke-width:2.4;stroke-linecap:round;opacity:${f1(op)}"/>`;
    const d=dir;return `<path d="M${f1(x)} ${f1(y-8*d)}V${f1(y+8*d)}M${f1(x-5)} ${f1(y-3*d)}L${f1(x)} ${f1(y-8*d)}L${f1(x+5)} ${f1(y-3*d)}" style="fill:none;stroke:${col};stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round;opacity:${f1(op)}"/>`};
  const box=(x,y,w,h)=>`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="12" style="fill:var(--panel-2);stroke:var(--line)"/>`;
  const tiles=(x,y,w,h,items,u)=>{let s='';const n=items.length,tw=(w-(n-1)*8)/n;
    items.forEach((it,i)=>{const tx=x+i*(tw+8),op=clamp(.4+u*4-i*.4);
      s+=`<g style="opacity:${f1(op)}"><rect x="${f1(tx)}" y="${f1(y)}" width="${f1(tw)}" height="${f1(h)}" rx="10" style="fill:var(--panel);stroke:var(--line)"/>`;
      s+=`<text x="${f1(tx+10)}" y="${f1(y+30)}" class="t-big" style="font-size:22px;fill:var(--tx)">${it.v}</text>`;
      it.l.forEach((ln,j)=>{s+=`<text x="${f1(tx+10)}" y="${f1(y+50+j*13)}" class="t-xs" style="fill:var(--ink)">${ln}</text>`});s+='</g>'});
    return s};
  function stat(p,u,m,x,y,w,h,N){
    let s=box(x,y,w,h);const ix=x+12,iw=w-24;
    if(p===0)s+=tiles(ix,y+12,iw,h-24,[{v:'280,000',l:['US operations','in 2022']},{v:'~1%',l:['of people who','qualify (estimate)']},{v:'~90%',l:['sleeve or bypass,','worldwide']}],u);
    else if(p===1){const v=Math.round(80*m);
      s+=`<text x="${f1(ix)}" y="${f1(y+26)}" class="t-xs" style="fill:var(--ink);font-weight:700">stomach removed in a sleeve (one review)</text>`;
      s+=`<text x="${f1(ix)}" y="${f1(y+74)}" class="t-big" style="font-size:44px;fill:var(--tx)">${v}%</text>`;
      const bx=ix+(N?120:130),bw=iw-(N?120:130),by=y+46,bh=26;
      s+=`<rect x="${f1(bx)}" y="${by}" width="${f1(bw)}" height="${bh}" rx="6" style="fill:var(--stomach);stroke:var(--gut-line)"/>`;
      s+=`<rect x="${f1(bx+bw*(1-.8*m))}" y="${by}" width="${f1(bw*.8*m)}" height="${bh}" rx="6" style="fill:var(--panel);stroke:var(--gut-line);stroke-dasharray:4 3"/>`;
      s+=`<text x="${f1(bx+4)}" y="${by+bh+14}" class="t-xs">kept</text><text x="${f1(bx+bw)}" y="${by+bh+14}" class="t-xs t-end">removed</text>`;
      s+=`<text x="${f1(ix)}" y="${f1(y+h-14)}" class="t-xs" style="fill:var(--ink)">${N?'another review: "by 75%"; pylorus kept':'another review says "by 75%", keeping the pylorus'}</text>`}
    else if(p===2){const lw=N?118:150,sc=(iw-lw-20)/200;
      s+=`<text x="${f1(ix)}" y="${f1(y+24)}" class="t-xs" style="fill:var(--ink);font-weight:700">limb lengths in the YOMEGA trial</text>`;
      [['alimentary (Roux) limb',150,'var(--gut)','150 cm','food'],['biliary limb',50,'var(--gip)','50 cm','juices'],['common channel',0,'','the rest','both']].forEach((r,i)=>{
        const yy=y+(N?40:34)+i*(N?30:22),grow=clamp(m*1.6-i*.3);
        s+=`<text x="${f1(ix)}" y="${f1(yy+12)}" class="t-xs" style="fill:var(--ink)">${r[0]}</text>`;
        if(r[1]){s+=`<rect x="${f1(ix+lw)}" y="${f1(yy+2)}" width="${f1(r[1]*sc*grow)}" height="14" rx="5" style="fill:${r[2]};stroke:var(--gut-line)"/>`;
          if(grow>.95)s+=`<text x="${f1(ix+lw+r[1]*sc+6)}" y="${f1(yy+13)}" class="t-xs" style="fill:var(--ink);font-weight:700">${r[3]}</text>`}
        else s+=`<rect x="${f1(ix+lw)}" y="${f1(yy+2)}" width="${f1((iw-lw-60)*grow)}" height="14" rx="5" style="fill:none;stroke:var(--gut-line);stroke-dasharray:4 3"/><text x="${f1(ix+iw)}" y="${f1(yy+13)}" class="t-xs t-end" style="opacity:${f1(grow)}">${r[3]}</text>`});
      s+=`<text x="${f1(ix)}" y="${f1(y+h-12)}" class="t-xs">the gastric pouch volume is not given in our sources</text>`}
    else if(p===3){const c1=x+(N?168:200),c2=x+(N?286:320);
      s+=`<text x="${f1(ix)}" y="${f1(y+24)}" class="t-xs" style="fill:var(--ink);font-weight:700">same weight lost, different signals</text>`;
      s+=`<text x="${f1(c1)}" y="${f1(y+(N?44:40))}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">after bypass</text><text x="${f1(c2)}" y="${f1(y+(N?44:40))}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">after band</text>`;
      [['glp1','GLP-1 after meals'],['pyy','PYY after meals'],['insulin','early insulin']].forEach((r,i)=>{const yy=y+(N?64:58)+i*(N?22:18),op=clamp(u*3-i*.5);
        s+=hormoneDot(ix+6,yy-3,r[0],{r:4.5})+`<text x="${f1(ix+18)}" y="${f1(yy+1)}" class="t-xs" style="fill:var(--ink)">${r[1]}</text>`;
        s+=arrow(c1,yy-3,1,HORMONE_INFO[r[0]].col,op)+`<g style="opacity:${f1(op)}">${arrow(c2,yy-3,0,'',1)}</g>`});
      s+=`<text x="${f1(ix)}" y="${f1(y+h-12)}" class="t-xs">le Roux 2006; arrows: direction only</text>`}
    else{const tg=[['Gut hormones in people','Established','var(--good-soft)','var(--good)'],['Bile acids and FXR (mice)','Early evidence','var(--warn-soft)','var(--warn)'],['Microbiome (mouse transfer)','Hypothesis','var(--hl-soft)','var(--hl)']];
      tg.forEach((r,i)=>{const yy=y+14+i*((h-28)/3),op=clamp(u*3-i*.6),hh=(h-28)/3-8;
        s+=`<g style="opacity:${f1(op)}"><rect x="${f1(ix)}" y="${f1(yy)}" width="${f1(iw)}" height="${f1(hh)}" rx="9" style="fill:${r[2]}"/><text x="${f1(ix+10)}" y="${f1(yy+hh/2+4)}" class="t-xs" style="fill:var(--ink);font-weight:700">${r[0]}</text><text x="${f1(ix+iw-10)}" y="${f1(yy+hh/2+4)}" class="t-xs t-end" style="fill:${r[3]};font-weight:700">${r[1].toUpperCase()}</text></g>`})}
    return s}
  function draw(t){
    const N=vb(svg,'720 380','400 510');
    const p=phaseOf(SU_STEPS,t),P=SU_STEPS[p],nx=SU_STEPS[p+1],u=clamp((t-P.from)/((nx?nx.from:1)-P.from));
    const L=N?{gx:8,gy:62,gs:1,bx:300,by:58,bs:.56,tx:16,ty:24,rx:214,ry:150,rh:34,sx:14,sy:344,sw:372,sh:154}
             :{gx:24,gy:34,gs:1.2,bx:600,by:62,bs:.66,tx:300,ty:36,rx:300,ry:96,rh:27,sx:300,sy:238,sw:410,sh:128};
    let variant='normal',morph=0;
    if(p===1){variant='sleeve';morph=ease(ramp(t,.19,.31))}
    else if(p>=2){variant='bypass';morph=p===2?ease(ramp(t,.38,.5)):1}
    const pulse=.5+.5*Math.sin(t*90);
    const glow={stomach:p===0?.75:p===1?lerp(.75,.12,morph):.35,ileum:p<2?.3:p===2?lerp(.3,.7,morph):.55+.4*pulse,pancreas:p>=3?.4+.5*pulse:0};
    const food=(t*8)%1;
    const g=gutTract(L.gx,L.gy,L.gs,{variant,morph,food:food<.97?food:null,glow,labels:true,fill:p===0?.35:0});
    let s=g.svg;const A=g.at;
    /* operation labels on the gut */
    if(p===1&&morph>.5)s+=kitLabel(A.stomach[0]+4,A.stomach[1]-14,'removed part (dashed)',{a:'m'});
    if(p>=2&&morph>.6){const op=ramp(morph,.6,1);
      s+=`<g style="opacity:${f1(op)}">`+kitLabel(A.pouch[0]+14,A.pouch[1]-2,'pouch')+kitLabel(A.join[0]+10,A.join[1]-9,'join')+`<circle cx="${f1(A.join[0])}" cy="${f1(A.join[1])}" r="7" style="fill:none;stroke:var(--ink);stroke-width:1.2;stroke-dasharray:2 2"/>`;
      if(!N||p===2)s+=kitLabel(A.duo[0]-2,A.duo[1]+30,'biliary limb',{a:'e'});
      s+='</g>'}
    /* bile acids and microbes */
    if(p===4){const bu=ramp(u,0,.4);
      const bp=polyAt([A.duo,[lerp(A.duo[0],A.join[0],.5),lerp(A.duo[1],A.join[1],.5)+10*L.gs],A.join]);
      for(let i=0;i<6;i++){const q=bp(((t*5)+i/6)%1);s+=`<path d="M${f1(q[0])} ${f1(q[1]-5)}Q${f1(q[0]+4)} ${f1(q[1]+1)} ${f1(q[0])} ${f1(q[1]+3)}Q${f1(q[0]-4)} ${f1(q[1]+1)} ${f1(q[0])} ${f1(q[1]-5)}Z" style="fill:var(--gold);stroke:var(--panel);stroke-width:.8;opacity:${f1(bu)}"/>`}
      const rr=rng(9),cx=A.colon[0],cy=A.colon[1];
      for(let i=0;i<9;i++){const a=rr()*6.28,d=rr()*16*L.gs,x=cx+Math.cos(a)*d*.5,y=cy+Math.sin(a)*d*2+Math.sin(t*40+i)*2;
        s+=`<rect x="${f1(x-4)}" y="${f1(y-2)}" width="8" height="4" rx="2" transform="rotate(${f1(rr()*180)} ${f1(x)} ${f1(y)})" style="fill:var(--macro);opacity:${f1(ramp(u,.2,.6))}"/>`}
      s+=`<g style="opacity:${f1(ramp(u,.1,.4))}">`+kitLabel(A.colon[0]-6,A.colon[1]+40*L.gs,'gut microbes change',{a:N?'':'m'})+kitLabel(A.join[0]+10,A.join[1]-24,'bile acids rise (mice)')+'</g>'}
    /* brain */
    const br=brainHypothalamus(L.bx,L.by,L.bs,{inset:false,pomc:p>=2?.4+.4*pulse*(p>=3?1:0):.2});s+=br.svg;
    s+=`<text x="${f1(L.bx+40*L.bs)}" y="${f1(L.by-6)}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">brain</text>`;
    /* hormone dots travelling to the brain */
    const hy=br.at.hypo;
    const lane=(src)=>N?polyAt([src,[200,140],[270,128],hy]):polyAt([src,[288,224],[560,222],[612,180],hy]);
    const dots=[];
    if(p<=1){const n=p===0?4:Math.round(4*(1-morph*.75));for(let i=0;i<n;i++)dots.push(['ghrelin',A.stomach,i/4])}
    if(p>=2){const n=p===2?Math.round(4*morph):6;for(let i=0;i<n;i++)dots.push([i%2?'pyy':'glp1',A.ileum,i/Math.max(n,1)])}
    if(p===0)for(let i=0;i<2;i++)dots.push([i?'pyy':'glp1',A.ileum,i/2+.25]);
    dots.forEach(d=>{const f=lane(d[1]),q=f((t*6+d[2])%1);s+=hormoneDot(q[0],q[1],d[0],{r:4.5})});
    /* title */
    const T=SU_TITLE[p];
    s+=`<text x="${L.tx}" y="${L.ty}" class="t-big" style="font-size:${N?17:19}px">${T[0]}</text><text x="${L.tx}" y="${L.ty+(N?17:20)}" class="t-sm">${T[1]}</text>`;
    /* hormone rows */
    const R=SU_HROWS[p];
    R.forEach((r,i)=>{const y=L.ry+i*L.rh,op=p===4?.55:1,col=HORMONE_INFO[r[0]].col;
      s+=hormoneDot(L.rx+6,y,r[0],{r:5,op});
      s+=`<text x="${L.rx+18}" y="${y+4}" class="t-lbl" style="font-size:12px;opacity:${op}">${r[1]}</text>`;
      if(N){s+=arrow(L.rx+92,y,r[2],col,op*clamp(u*4))+`<text x="${L.rx}" y="${y+19}" class="t-xs" style="fill:var(--ink);opacity:${op}">${r[3]}</text>`}
      else s+=arrow(L.rx+86,y,r[2],col,op*clamp(u*4))+`<text x="${L.rx+102}" y="${y+4}" class="t-xs" style="fill:var(--ink);opacity:${op}">${r[3]}</text>`});
    /* stat box */
    s+=stat(p,u,morph,L.sx,L.sy,L.sw,L.sh,N);
    svg.innerHTML=s;
    setSt(p);note.innerHTML=noteHTML(P);
  }
  const stop=playWire(rg,$('#suPlay'),draw,26000,'%t:player.replay%','surgery');
  const setSt=stepWire($('#suSteps'),SU_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- procedure explorer ---------- */
  const px=$('#suPx'),pr=$('#suPxT'),pb=$('#suPxBtns'),pn=$('#suPxNote');let pv='sleeve';
  pb.innerHTML=Object.keys(SU_PX).map(k=>`<button class="btn" data-px="${k}" aria-pressed="${k===pv}">${SU_PX[k].lab}</button>`).join('');
  function drawPx(t){
    const N=vb(px,'720 340','400 620'),D=SU_PX[pv];
    const L=N?{gx:96,gy:16,gs:1,lx:16,ly:300,lw:368,lh:40,lg:8}:{gx:24,gy:18,gs:1.12,lx:300,ly:20,lw:400,lh:42,lg:9};
    const g=gutTract(L.gx,L.gy,L.gs,{variant:pv,morph:1,food:t>0&&t<1?t:null,labels:true,fill:.3});
    let s=g.svg;
    const passed=D.pass.map((v,i)=>v>0?i:-1).filter(i=>i>=0),ci=passed[Math.min(passed.length-1,Math.floor(t*passed.length))];
    SU_SEGS.forEach((nm,i)=>{const y=L.ly+i*(L.lh+L.lg),v=D.pass[i],cur=i===ci&&t>0&&t<1,done=passed.indexOf(i)>=0&&passed.indexOf(i)<passed.indexOf(ci);
      const fill=v===0?'var(--panel)':cur?'var(--tx-soft)':'var(--panel-2)',stroke=cur?'var(--tx)':'var(--line)';
      s+=`<rect x="${L.lx}" y="${y}" width="${L.lw}" height="${L.lh}" rx="10" style="fill:${fill};stroke:${stroke};stroke-width:${cur?2:1}${v===0?';stroke-dasharray:5 4':''}"/>`;
      s+=`<circle cx="${L.lx+18}" cy="${y+L.lh/2}" r="6" style="fill:${v===0?'none':done||cur?'var(--gut-line)':'var(--gut)'};stroke:var(--gut-line);stroke-width:1.4${v===0?';stroke-dasharray:2 2':''}"/>`;
      s+=`<text x="${L.lx+34}" y="${y+17}" class="t-lbl" style="font-size:12.5px;${v===0?'fill:var(--muted)':''}">${nm}</text>`;
      s+=`<text x="${L.lx+34}" y="${y+32}" class="t-xs" style="fill:${v===0?'var(--muted)':'var(--ink)'}">${D.how[i]}${v>0&&v<1?' (part)':''}</text>`;
      if(i<SU_SEGS.length-1)s+=`<path d="M${L.lx+18} ${y+L.lh/2+7}V${y+L.lh+L.lg+L.lh/2-7}" style="stroke:var(--gut-line);stroke-width:1.4;opacity:.5"/>`});
    px.innerHTML=s;
  }
  const stopPx=playWire(pr,$('#suPxPlay'),drawPx,7000,'%t:player.replay%','surgery');
  pb.addEventListener('click',e=>{const b=e.target.closest('[data-px]');if(!b)return;pv=b.dataset.px;
    $$('[data-px]',pb).forEach(x=>x.setAttribute('aria-pressed',x===b));pn.innerHTML=noteHTML(SU_PX[pv].note);stopPx();drawPx(+pr.value)});
  pn.innerHTML=noteHTML(SU_PX[pv].note);drawPx(+pr.value);

  /* ---------- SOS weight curves ---------- */
  const so=$('#suSos'),sr=$('#suSosT'),sbt=$('#suSosBtns'),sread=$('#suSosRead');
  const on={};SU_SOS.forEach(S=>on[S.id]=!!S.on);
  sbt.innerHTML=SU_SOS.map(S=>`<button class="btn" data-sos="${S.id}" aria-pressed="${on[S.id]}"><span class="su-key" style="border-top-color:${S.col};border-top-style:${S.dash?'dashed':'solid'}"></span>${S.lab}</button>`).join('');
  function drawSos(t){
    const N=vb(so,'720 330','400 380'),yr=20*t;
    const L=N?{x:46,y:30,w:330,h:290}:{x:60,y:28,w:600,h:252};
    const ax=curveAxes(L.x,L.y,L.w,L.h,{x0:0,x1:20,y0:-35,y1:5,xt:[0,2,5,10,15,20],yt:[-30,-20,-10,0],yfmt:v=>(v>0?'+':v<0?'−':'')+Math.abs(v)+'%',xfmt:v=>v+(v===20?' y':''),ylabel:'weight change from baseline',xlabel:N?'':'years after surgery'});
    let s=ax.svg;
    s+=`<line x1="${L.x}" x2="${L.x+L.w}" y1="${f1(ax.Y(0))}" y2="${f1(ax.Y(0))}" style="stroke:var(--ink);stroke-width:1;opacity:.5"/>`;
    SU_SOS.forEach(S=>{if(!on[S.id])return;
      const last=S.P[S.P.length-1][0];
      s+=plotLine(S.P,ax.X,ax.Y,{col:S.col,lw:1.4,dash:S.dash||'3 3',smooth:true}).svg.replace('<path','<path opacity=".3"');
      const pl=plotLine(S.P,ax.X,ax.Y,{col:S.col,lw:3,dash:S.dash,smooth:true,upto:Math.min(yr,last)});s+=pl.svg;
      S.P.forEach(q=>{if(q[0]>yr+1e-6||q[0]===0)return;s+=`<circle cx="${f1(ax.X(q[0]))}" cy="${f1(ax.Y(q[1]))}" r="4.2" style="fill:${S.col};stroke:var(--panel);stroke-width:1.6"/>`});
      if(yr>=last-1e-6){const e=[ax.X(last),ax.Y(S.P[S.P.length-1][1])];
        const lbl=S.id==='all'?(N?'all':'all surgery'):S.id==='ctl'?'controls':S.id==='gbp'?'bypass':S.id==='vbg'?'VBG':'band';
        const end=last===20;s+=kitLabel(end?e[0]-4:e[0]+8,e[1]+(S.id==='ctl'?-8:S.id==='all'?14:4),lbl+' '+(S.P[S.P.length-1][1]>0?'+':S.P[S.P.length-1][1]<0?'−':'')+Math.abs(S.P[S.P.length-1][1])+'%',{a:end?'e':''})}});
    s+=`<line x1="${f1(ax.X(yr))}" x2="${f1(ax.X(yr))}" y1="${L.y}" y2="${L.y+L.h}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:4 3"/>`;
    s+=`<text x="${f1(Math.min(ax.X(yr)+6,L.x+L.w-60))}" y="${L.y+14}" class="t-sm" style="fill:var(--ink);font-weight:700">year ${yr.toFixed(yr<10?1:0)}</text>`;
    so.innerHTML=s;
    const shown=SU_SOS.filter(S=>on[S.id]);
    sread.innerHTML=shown.map(S=>{let q=null;S.P.forEach(p=>{if(p[0]<=yr+1e-6&&p[0]>0)q=p});
      return `<span><b>${S.lab}:</b> ${q?(q[1]>0?'+':q[1]<0?'−':'')+Math.abs(q[1])+'% at '+(q[0]===1.5?'maximum (1 to 2 years)':q[0]+' years'):'no published point yet'}</span>`}).join('');
  }
  playWire(sr,$('#suSosPlay'),drawSos,12000,'%t:player.replay%','surgery');
  sbt.addEventListener('click',e=>{const b=e.target.closest('[data-sos]');if(!b)return;const k=b.dataset.sos;on[k]=!on[k];
    if(!Object.values(on).some(Boolean))on[k]=true;b.setAttribute('aria-pressed',on[k]);drawSos(+sr.value)});
  drawSos(+sr.value);

  /* ---------- STAMPEDE bars ---------- */
  const st=$('#suSt'),stb=$('#suStBtns');let sm='a1c',grow=1,stopG=null;
  stb.innerHTML=Object.keys(SU_ST).map(k=>`<button class="btn" data-stm="${k}" aria-pressed="${k===sm}">${SU_ST[k].lab}</button>`).join('');
  function drawSt(){
    const N=vb(st,'720 250','400 300'),M=SU_ST[sm];
    const L=N?{x:16,y:44,w:368,bh:56,gap:22,lw:0}:{x:220,y:46,w:420,bh:42,gap:20,lw:200};
    let s=`<text x="16" y="22" class="t-xs" style="fill:var(--ink);font-weight:700">${M.head}</text>`;
    M.v.forEach((v,i)=>{const y=L.y+i*(L.bh+L.gap),a=Math.abs(v)/M.max*grow,col=i===0?'var(--muted)':i===1?'var(--brand)':'var(--tx)';
      const by=N?y+18:y,bh=N?L.bh-22:L.bh;
      s+=`<text x="${N?L.x:L.x-12}" y="${N?y+12:y+bh/2+4}" class="t-lbl ${N?'':'t-end'}" style="font-size:12.5px">${SU_ARMS[i]}</text>`;
      s+=`<rect x="${L.x}" y="${f1(by)}" width="${f1(L.w)}" height="${f1(bh)}" rx="7" style="fill:var(--field);stroke:var(--line)"/>`;
      s+=`<rect x="${L.x}" y="${f1(by)}" width="${f1(Math.max(2,L.w*a))}" height="${f1(bh)}" rx="7" style="fill:${col}"/>`;
      s+=`<text x="${f1(L.x+L.w*a+8)}" y="${f1(by+bh/2+5)}" class="t-big" style="font-size:16px">${M.fmt(Math.round(v*grow))}</text>`});
    s+=N?`<text x="16" y="276" class="t-xs">150 people with type 2 diabetes, BMI 27 to 43;</text><text x="16" y="290" class="t-xs">group results at 5 years</text>`:`<text x="${L.x}" y="240" class="t-xs">150 people with type 2 diabetes, BMI 27 to 43; group results at 5 years</text>`;
    st.innerHTML=s}
  stb.addEventListener('click',e=>{const b=e.target.closest('[data-stm]');if(!b)return;sm=b.dataset.stm;
    $$('[data-stm]',stb).forEach(x=>x.setAttribute('aria-pressed',x===b));if(stopG)stopG();grow=0;drawSt();stopG=animate(700,q=>{grow=ease(q);drawSt()},()=>{stopG=null})});
  drawSt();
  const prevR=redraws.surgery;redraws.surgery=()=>{prevR&&prevR();drawSt()};

  /* ---------- eligibility explainer ---------- */
  const eb=$('#suBmi'),em=$('#suMet'),ea=$('#suAsian'),eo=$('#suElig');
  function elig(){
    const b=+eb.value,met=em.checked,as=ea.checked;let a,ac,n,nc;
    if(b>=35){a='ASMBS/IFSO 2022: surgery "is recommended for individuals with a body mass index (BMI) >35 kg/m², regardless of presence, absence, or severity of co-morbidities".';ac='yes'}
    else if(as&&b>=27.5){a='ASMBS/IFSO 2022: in Asian populations, "individuals with BMI >27.5 kg/m² should be offered" surgery.';ac='yes'}
    else if(b>=30&&met){a='ASMBS/IFSO 2022: surgery "should be considered for individuals with metabolic disease and BMI of 30-34.9 kg/m²".';ac='maybe'}
    else if(b>=30){a='ASMBS/IFSO 2022 names BMI 30 to 34.9 only together with metabolic disease (or above 27.5 in Asian populations).';ac='out'}
    else if(as&&b>=25){a='ASMBS/IFSO 2022: in Asian populations a BMI above 25 suggests clinical obesity; the surgery threshold as published is above 27.5.';ac='out'}
    else{a='Below the BMI thresholds in the ASMBS/IFSO 2022 statement.';ac='out'}
    if(b>=40){n='1991 NIH: within the old threshold of BMI above 40.';nc='yes'}
    else if(b>=35&&met){n='1991 NIH: within the old threshold of BMI above 35 with comorbidities.';nc='yes'}
    else if(b>=35){n='1991 NIH: outside the old threshold, which required comorbidities between BMI 35 and 40.';nc='out'}
    else{n='1991 NIH: outside the old thresholds (BMI above 40, or above 35 with comorbidities).';nc='out'}
    eo.innerHTML=`<div class="verdict ${ac}"><span class="kicker">2022 statement, as published</span><br>${a} [[Eisenberg2022ASMBS]]</div><div class="verdict ${nc}"><span class="kicker">1991 thresholds, for comparison</span><br>${n} [[Eisenberg2022ASMBS,Arterburn2020JAMA]]</div>`}
  [eb,em,ea].forEach(el=>el.addEventListener('change',elig));elig();
};
