/* =============== 3.2 IVIg =============== */
/* Three players: the main story (pool, course, the attack it meets, proposed actions, IgG levels, the trial verdict),
   a regimen arithmetic explorer, and a clickable map of the label warnings. Every number is from research pass E;
   drawings are schematic. The IgG panel joins published medians with straight lines and says so. */
const IV_STEPS=[
 {from:0,at:.05,k:'Step 1 · the product',sv:'Pooled from many donors',sub:'polyclonal IgG from thousands of people',
  t:'Antibodies pooled from many donors',
  txt:'IVIg is polyclonal serum IgG pooled from thousands of donors; the Bivigam label states not less than 1,000 donors per pool [[Lunemann2015,FDA-Bivigam]]. Because it is a blood product, labels also warn of a theoretical risk of transmissible agents, such as CJD [[FDA-Bivigam]].',
  pt:'IVIg is a drip of antibodies collected from many blood donors [[Lunemann2015]].',
  hook:'IVIg = pooled polyclonal IgG, at least 1,000 donors per pool on the Bivigam label [[FDA-Bivigam]].'},
 {from:.16,at:.24,k:'Step 2 · the course',sv:'Five days, 2 g/kg in all',sub:'0.4 g/kg a day for 5 days, as published',
  t:'The published course: 0.4 g/kg a day for 5 days',
  txt:'The 2023 EAN/PNS guideline strongly recommends starting IVIg as soon as possible in people unable to walk unaided (GBS disability score 3 or more) within 2 weeks of onset of weakness, and weakly recommends the standard 0.4 g/kg/day for 5 days over shorter, longer or 2-day courses [[vanDoorn2023]]. The total is 2 g/kg: at 70 kg, 28 g a day and 140 g in all (arithmetic) [[vanDoorn2023]]. Quoted as published, not as instructions.',
  pt:'It is usually given once a day for 5 days [[vanDoorn2023]].',
  hook:'IVIg 0.4 g/kg/day × 5 days = 2 g/kg, within 2 weeks of onset [[vanDoorn2023,Leonhard2019]].'},
 {from:.33,at:.4,k:'Step 3 · the target',sv:'What it meets at the nerve',sub:'antibodies on the node, complement, macrophages',
  t:'The attack IVIg meets',
  txt:'In the antibody-mediated forms of GBS, anti-ganglioside antibodies bind the nerve membrane and complement is activated, ending in membrane attack complexes; macrophages then move in. This module asks how a flood of donor IgG might interrupt that chain. Module 1.3 shows the attack itself.',
  pt:'In GBS, the body\'s own antibodies stick to the nerve and call in other parts of the immune system that damage it.',
  hook:'IVIg and plasma exchange both target the antibody-driven part of the attack; neither repairs nerve directly.'},
 {from:.5,at:.58,k:'Step 4 · how it might work',sv:'Three proposed actions',sub:'none proven in people with GBS',
  t:'How IVIg might work: the mechanism is not settled',
  txt:'A 2015 review says IVIg\'s mechanisms "are poorly understood" <span class="ev est">Established</span> [[Lunemann2015]]. Proposed actions include blocking complement and membrane attack complex formation, saturating macrophage Fc receptors, neutralising pathogenic cytokines and antibodies, and speeding antibody breakdown <span class="ev hyp">Hypothesis</span> [[Dalakas1998,Rajabally2022]]. Anti-idiotype neutralisation has lab support: IVIg reduced the nerve-blocking activity of GBS sera on mouse muscle, and Fab fragments worked as well as whole IVIg <span class="ev early">Early evidence</span> [[Buchwald2002,Yuki1996]].',
  pt:'Nobody knows exactly how IVIg helps. It may mop up the harmful antibodies, or stop other parts of the immune system from doing damage [[Lunemann2015,Rajabally2022]].',
  hook:'IVIg mechanism: proposed, not proven; many actions come from lab or animal work, not human tissue [[Dalakas2014]].'},
 {from:.67,at:.76,k:'Step 5 · in the blood',sv:'IgG rises, then falls',sub:'median serum IgG in the SID-GBS trial',
  t:'Serum IgG after one course, and after two',
  txt:'In the SID-GBS pharmacokinetic analysis, median IgG went from 12.5 g/L at baseline to 21.2 g/L at week 2 and 15.4 g/L at week 4 after one course; with a second course it reached 35.5 g/L at week 2 [[vanTilburg2025]]. In 174 Dutch people the rise at 2 weeks varied widely (mean 7.8 g/L, SD 5.6), and a small rise was linked to slower recovery [[Kuitwaard2009Pharm]]. Yet a second course raised IgG without improving outcome [[vanTilburg2025,Walgaard2021]].',
  pt:'After IVIg, the antibody level in the blood goes up and then slowly comes down again. How high it goes differs a lot between people [[Kuitwaard2009Pharm]].',
  hook:'Low ΔIgG is associated with poor outcome, but giving more IVIg (SID-GBS) did not help [[Kuitwaard2009Pharm,Walgaard2021]].'},
 {from:.84,at:.93,k:'Step 6 · the verdict',sv:'As good as plasma exchange',sub:'the head-to-head trials and Cochrane',
  t:'Equal to plasma exchange, easier to complete',
  txt:'In the Dutch trial, 53% improved by a grade or more at 4 weeks with IVIg against 34% with plasma exchange [[vanDerMeche1992]]. In the larger 1997 trial, mean improvement was 0.8 grade with IVIg and 0.9 with plasma exchange, a difference that was not significant [[PSGBS1997]]. Cochrane found 0.02 grade more improvement with IVIg (95% CI -0.20 to 0.25) and IVIg "significantly much more likely to be completed" [[Hughes2014]].',
  pt:'IVIg and plasma exchange work about equally well. IVIg is often chosen because it is easier to give [[vanDoorn2023,Leonhard2019]].',
  hook:'IVIg = plasma exchange in efficacy; no adequate placebo-controlled adult IVIg trial exists, so the evidence is indirect [[Hughes2014,vanDoorn2023]].'}
];
/* labels drawn inside the SVGs */
const IV_L={
  donors:'donors',pool:'one pool',bag:'IVIg',polyW:['polyclonal IgG','pooled from thousands','of donors'],polyN:['polyclonal IgG from','thousands of donors'],
  label1000:'Bivigam label: at least 1,000 per pool',
  day:'Day',perDay:'0.4 g/kg',total:'course total',zero:'0',twoG:'2 g/kg',
  ex70:'Arithmetic at 70 kg: 28 g a day, 140 g in all',exGuide:'Published window: within 2 weeks of onset',
  exGuideN:'Window: within 2 weeks of onset',
  attack1:'anti-ganglioside antibodies bind the node',attack2:'complement punches pores',macro:'macrophage',
  attackN1:'antibodies bind the node,',attackN2:'complement punches pores',
  act:[
   {t:'Neutralise the antibody',tag:'EARLY EVIDENCE',cls:'early',l:['donor IgG binds the','harmful antibody\'s tips','(anti-idiotype; lab data)']},
   {t:'Block complement',tag:'HYPOTHESIS',cls:'hyp',l:['fewer membrane attack','pores form','(inferred across diseases)']},
   {t:'Busy the macrophage',tag:'HYPOTHESIS',cls:'hyp',l:['donor IgG fills the','Fc receptors it uses','to grab coated targets']}],
  harm:'harmful antibody',donor:'donor IgG',gangl:'ganglioside left free',
  igY:'serum IgG, g/L',igX:'days from first dose',wk:['baseline','week 2','week 4'],
  one:'one course (median, IQR)',two:'second course (median, IQR)',days15:'IVIg days 1 to 5',
  igNote1:'Lines join medians; the path',igNote2:'between them was not measured.',
  igK1:'Rise at 2 weeks (174 people):',igK2:'mean 7.8 g/L, SD 5.6',igK3:'A small rise went with slower',igK4:'recovery, but a second course',igK5:'did not improve outcome.',
  v1:'Dutch trial 1992: improved 1 grade or more at 4 weeks',v1N:['Dutch trial 1992: improved','1 grade or more at 4 weeks'],
  v2:'1997 trial: mean grade improvement at 4 weeks',v2N:['1997 trial: mean grade','improvement at 4 weeks'],
  v3:'Cochrane 2014: IVIg minus plasma exchange (5 trials, 536 people)',v3N:['Cochrane 2014: IVIg minus plasma','exchange (5 trials, 536 people)'],
  pe:'Plasma exchange',ivig:'IVIg',both:'PE then IVIg',favPE:'favours PE',favIV:'favours IVIg',grade:'grade'
};
/* the regimen explorer: courses compared in the guideline, quoted as published */
const IV_REG={
  std:{n:5,d:.4,name:'Standard: 0.4 g/kg a day for 5 days',
    s:'The 2023 EAN/PNS guideline weakly recommends this standard course over a low-dose, high-dose or 2-day course [[vanDoorn2023]]. The 1992 and 1997 trials used it [[vanDerMeche1992,PSGBS1997]].'},
  low:{n:3,d:.4,name:'Lower: 0.4 g/kg a day for 3 days',
    s:'The EAN/PNS panel considered the evidence too thin to support a lower dose than standard [[vanDoorn2023]]. In a trial of 3 versus 6 days in 39 people who could not have plasma exchange, improvement was non-significantly faster with 6 days (low certainty) [[vanDoorn2023]].'},
  high:{n:6,d:.4,name:'Higher: 0.4 g/kg a day for 6 days',
    s:'In that 39-person trial, 6 days gave non-significantly faster improvement, with a significant difference only in the ventilated subgroup (low certainty). The panel did not support a higher dose than standard [[vanDoorn2023]].'},
  two:{n:2,d:1,name:'Two days: 1 g/kg a day for 2 days',
    s:'In a German trial in children, 2 days versus 5 days made no significant difference to recovery (median time to unaided walking 19 versus 13 days), but early transient worsening was more frequent with 2 days: 5 of 23 against 0 of 23 [[Korinthenberg2005]]. The EAN/PNS panel found the evidence too thin to support a 2-day course [[vanDoorn2023]].'}
};
const IV_DOSE_TPL='At {w} kg: {d} g a day for {n} days, {T} g in all ({k} g/kg).';
/* the safety map: label warnings, quoted from the US labels */
const IV_SAFE=[
  {id:'clot',lab:'Blood clots',short:'Clots',t:'Thrombosis (boxed warning)',
   s:'All current labels carry a boxed warning for thrombosis, renal dysfunction and acute renal failure [[FDA-Bivigam,FDA-Asceniv]]. Label risk factors include advanced age, prolonged immobilisation, hypercoagulable states, past thrombosis, oestrogens, central venous catheters, hyperviscosity and cardiovascular risk factors; thrombosis can occur without any [[FDA-Bivigam]]. In US admissions data, the odds of venous thromboembolism in the 30 days after IVIg for neurological disease were raised (OR 3.33, 95% CI 1.34 to 8.30), as they were after plasma exchange (OR 4.29) [[Jin2020]].'},
  {id:'kid',lab:'Kidneys',short:'Kidneys',t:'Renal dysfunction and acute renal failure (boxed warning)',
   s:'Label risk factors for renal failure: pre-existing renal insufficiency, diabetes, age over 65, volume depletion, sepsis, paraproteinaemia and nephrotoxic drugs. Risk is reported as higher with sucrose-containing products [[FDA-GamunexC,FDA-Bivigam]].'},
  {id:'head',lab:'Head',short:'Head',t:'Headache and aseptic meningitis',
   s:'Aseptic meningitis syndrome usually begins within several hours to 2 days of treatment, may be more frequent with high doses (2 g/kg) or rapid infusion, and has remitted within several days of stopping [[FDA-Bivigam]]. Headache was among the common reactions in an immunodeficiency trial, which was not a GBS population at GBS doses [[FDA-Bivigam]].'},
  {id:'lung',lab:'Lungs',short:'Lungs',t:'Transfusion-related acute lung injury',
   s:'Labels warn of transfusion-related acute lung injury (TRALI), typically 1 to 6 hours after treatment [[FDA-Bivigam]].'},
  {id:'blood',lab:'Red cells',short:'Red cells',t:'Haemolysis and thicker blood',
   s:'Blood group antibodies in the product can coat red cells. Named risk factors: high doses (for example 2 g/kg or more, single or divided), non-O blood group and underlying inflammatory disease [[FDA-Asceniv]]. Labels also warn of hyperproteinaemia, raised serum viscosity and true or pseudo-hyponatraemia [[FDA-Bivigam]].'},
  {id:'allergy',lab:'Allergy',short:'Allergy',t:'Hypersensitivity and IgA deficiency',
   s:'Labels contraindicate IVIg after anaphylaxis or a severe systemic reaction to human immune globulin, and in IgA-deficient people with anti-IgA antibodies and a history of hypersensitivity [[FDA-Bivigam,FDA-Asceniv,FDA-GamunexC]].'}
];
inits.ivig=()=>{
  const tx=(x,y,s,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`;
  const INK='fill:var(--ink);font-weight:600';
  /* an infusion bag with a liquid level and IgG molecules inside */
  function ivBag(x,y,w,h,lvl,seed){const r=rng(seed||3),ly=y+18+(h-26)*(1-lvl);
    let s=`<rect x="${f1(x+w/2-7)}" y="${f1(y-10)}" width="14" height="12" rx="4" style="fill:none;stroke:var(--device);stroke-width:2"/>`;
    s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="14" style="fill:var(--panel);stroke:var(--device);stroke-width:2"/>`;
    if(lvl>0)s+=`<rect x="${f1(x+4)}" y="${f1(ly)}" width="${f1(w-8)}" height="${f1(y+h-4-ly)}" rx="10" style="fill:var(--ivig);opacity:.22"/>`;
    const n=Math.round(10*lvl);for(let i=0;i<n;i++){const ax=x+14+r()*(w-28),ay=ly+10+r()*Math.max(4,(y+h-ly-30));s+=antibody(ax,ay,11,{ang:(r()-.5)*90,col:'var(--ivig)'})}
    s+=`<rect x="${f1(x+w/2-5)}" y="${f1(y+h)}" width="10" height="10" style="fill:var(--device)"/>`;
    s+=tx(x+w/2,y+16,IV_L.bag,'t-lbl t-mid');
    return s}
  function arrow(x1,y1,x2,y2){return `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" class="arrow" marker-end="url(#ivAr)"/>`}
  /* ---------- main player ---------- */
  const svg=$('#ivSvg'),rg=$('#ivT');
  function draw(t){
    const N=vb(svg,'720 400','400 640'),p=phaseOf(IV_STEPS,t),P=IV_STEPS[p];
    const nx=IV_STEPS[p+1]?IV_STEPS[p+1].from:1.0001,u=ramp(t,P.from,nx-.02),fade=ramp(t,P.from,P.from+.03);
    let s=`<defs>${marker('ivAr','var(--muted)')}</defs>`;
    s+=tx(16,28,P.sv,'t-big','font-size:18px')+tx(16,46,P.sub,'t-sm');
    s+=`<g style="opacity:${f1(.25+.75*fade)}">`;
    if(p===0){/* donors to one pool */
      const L=N?{ix:68,iy:72,sz:20,ax1:200,ay1:270,ax2:200,ay2:300,bx:140,by:318,bw:120,bh:170,lx:200,ly:530}:{ix:30,iy:84,sz:20,ax1:310,ay1:190,ax2:370,ay2:190,bx:392,by:84,bw:130,bh:220,lx:548,ly:150};
      const I=icons(L.ix,L.iy,{n:60,cols:10,size:L.sz,gap:7,k:Math.round(ease(u)*60),col:'var(--ivig)',base:'var(--line)'});
      s+=I.svg+tx(L.ix,L.iy+I.h+10,IV_L.donors,'t-sm');
      s+=arrow(L.ax1,L.ay1,L.ax2,L.ay2);
      s+=ivBag(L.bx,L.by,L.bw,L.bh,.15+.85*ease(u),5);
      if(N){IV_L.polyN.forEach((l,i)=>{s+=tx(L.lx,L.ly+i*18,l,'t-lbl t-mid')});s+=tx(L.lx,L.ly+48,IV_L.label1000,'t-xs t-mid')}
      else{IV_L.polyW.forEach((l,i)=>{s+=tx(L.lx,L.ly+i*20,l,'t-lbl')});s+=tx(L.lx,L.ly+76,IV_L.label1000,'t-xs')}
    }
    else if(p===1){/* five days */
      const L=N?{bx:24,by:84,bw:70,bh:120,dx:116,dy:74,dw:264,dh:42,gap:8,col:true,tx:20,ty:376,tw:360,gy:440}
               :{bx:30,by:84,bw:90,bh:140,dx:170,dy:84,dw:96,dh:100,gap:8,col:false,tx:170,ty:246,tw:512,gy:330};
      s+=ivBag(L.bx,L.by,L.bw,L.bh,1-.8*u,7);
      const lx=L.bx+L.bw/2;
      if(L.col){s+=`<path d="M${f1(lx)} ${f1(L.by+L.bh+10)}V${f1(L.by+L.bh+40)}" style="fill:none;stroke:var(--ivig);stroke-width:3"/>`}
      else{s+=`<path d="M${f1(lx)} ${f1(L.by+L.bh+10)}V${f1(L.by+L.bh+24)}H${f1(L.dx-18)}V${f1(L.dy+L.dh/2)}H${f1(L.dx-4)}" style="fill:none;stroke:var(--ivig);stroke-width:3;stroke-linejoin:round"/>`}
      for(let i=0;i<5;i++){const f=ramp(u,i/5,(i+.9)/5);
        const x=L.col?L.dx:L.dx+i*(L.dw+L.gap),y=L.col?L.dy+i*(L.dh+L.gap):L.dy;
        s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(L.dw)}" height="${f1(L.dh)}" rx="8" style="fill:var(--panel-2);stroke:var(--line)"/>`;
        if(f>0)s+=L.col?`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(L.dw*f)}" height="${f1(L.dh)}" rx="8" style="fill:var(--ivig);opacity:.35"/>`
                        :`<rect x="${f1(x)}" y="${f1(y+L.dh*(1-f))}" width="${f1(L.dw)}" height="${f1(L.dh*f)}" rx="8" style="fill:var(--ivig);opacity:.35"/>`;
        if(L.col){s+=tx(x+12,y+26,IV_L.day+' '+(i+1),'t-lbl')+tx(x+L.dw-12,y+26,IV_L.perDay,'t-sm t-end','fill:var(--ink)')}
        else{s+=tx(x+L.dw/2,y+24,IV_L.day+' '+(i+1),'t-lbl t-mid')+tx(x+L.dw/2,y+L.dh-14,IV_L.perDay,'t-sm t-mid','fill:var(--ink)')}}
      /* running total */
      const tw=L.tw,ty=L.ty,tot=clamp(u/.98);
      s+=tx(L.tx,ty-8,IV_L.total,'t-sm');
      s+=`<rect x="${f1(L.tx)}" y="${f1(ty)}" width="${f1(tw)}" height="22" rx="6" style="fill:var(--panel-2);stroke:var(--line)"/><rect x="${f1(L.tx)}" y="${f1(ty)}" width="${f1(tw*tot)}" height="22" rx="6" style="fill:var(--ivig);opacity:.55"/>`;
      s+=tx(L.tx,ty+38,IV_L.zero,'t-xs')+tx(L.tx+tw,ty+38,IV_L.twoG,'t-xs t-end');
      s+=tx(L.tx+Math.max(30,tw*tot),ty+16,(2*tot).toFixed(1)+' g/kg','t-sm t-end','fill:var(--ink);font-weight:700');
      s+=tx(L.tx,L.gy,IV_L.ex70,'t-sm','fill:var(--ink)')+tx(L.tx,L.gy+20,N?IV_L.exGuideN:IV_L.exGuide,'t-sm');
    }
    else if(p===2){/* the attack */
      const L=N?{zx:20,zy:70,zs:1.2,mx:310,my:380,mr:30,cx:200,cy:450}:{zx:60,zy:68,zs:1.35,mx:610,my:170,mr:36,cx:265,cy:360};
      const Z=nodeZoom(L.zx,L.zy,L.zs,{mode:'aman',ab:ease(ramp(u,0,.45)),c3:ease(ramp(u,.35,.8)),nav:.35*ramp(u,.5,1),labels:true});
      s+=Z.svg;
      s+=`<g style="opacity:${f1(ramp(u,.55,.9))}">`+macrophage(L.mx,L.my,L.mr,{seed:4,reach:.6,dir:'l'})+kitLabel(L.mx,L.my+L.mr+18,IV_L.macro,{a:'m'})+'</g>';
      if(N){s+=tx(L.cx-180,L.cy+20,IV_L.attackN1,'t-sm','fill:var(--ink)')+tx(L.cx-180,L.cy+38,IV_L.attackN2,'t-sm','fill:var(--ink)')}
      else s+=tx(L.cx,L.cy+20,IV_L.attack1+'; '+IV_L.attack2,'t-sm t-mid','fill:var(--ink)');
    }
    else if(p===3){/* three proposed actions */
      IV_L.act.forEach((A,i)=>{const a=ease(ramp(u,i*.22,i*.22+.4));
        const x=N?16:16+i*233,y=N?62+i*190:66,w=N?368:222,h=N?178:310;
        const dc=N?[x+96,y+112]:[x+w/2,y+160];
        s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="12" style="fill:var(--panel);stroke:var(--line)"/>`;
        s+=tx(x+12,y+22,A.t,'t-lbl');
        const tagW=A.tag.length*6.2+12,tagC=A.cls==='early'?'warn':'rx';
        s+=`<rect x="${f1(x+12)}" y="${f1(y+30)}" width="${f1(tagW)}" height="16" rx="4" style="fill:var(--${tagC}-soft)"/>`+tx(x+18,y+41.5,A.tag,'t-xs',`fill:var(--${tagC});font-weight:700`);
        const [cx,cy]=dc;
        if(i===0){/* anti-idiotype */
          s+=`<line x1="${f1(cx-70)}" x2="${f1(cx+(N?14:70))}" y1="${f1(cy+52)}" y2="${f1(cy+52)}" style="stroke:var(--axon-line);stroke-width:3"/>`;
          const gx=cx+(N?0:40);
          s+=ganglioside(gx,cy+52,1.4,{kind:'GM1'});
          s+=antibody(cx-34,cy-6,24,{});
          s+=antibody(cx-34,cy-6-(1-a)*36,24,{ang:180,col:'var(--ivig)',op:.2+.8*a});
          s+=kitLabel(cx-16,cy+14,IV_L.harm,{});s+=`<g style="opacity:${f1(a)}">`+kitLabel(cx-16,cy-22,IV_L.donor,{})+(N?kitLabel(gx+22,cy+56,IV_L.gangl,{}):kitLabel(gx,cy+72,IV_L.gangl,{a:'m'}))+'</g>';
        }else if(i===1){/* complement */
          s+=`<rect x="${f1(cx-80)}" y="${f1(cy+20)}" width="160" height="12" rx="6" style="fill:var(--axon);stroke:var(--axon-line)"/>`;
          [-50,-10,30,62].forEach((dx,k)=>{s+=mac(cx+dx,cy+26,6,{op:1-a*.85})});
          s+=`<g style="opacity:${f1(1-a*.7)}">`+c3dots(cx-75,cy+12,150,9,4+i)+'</g>';
          [-60,-25,10,45,72].forEach((dx,k)=>{s+=antibody(cx+dx,cy-30+(k%2)*14-(1-a)*30,16,{ang:(k-2)*16,col:'var(--ivig)',op:a})});
        }else{/* Fc receptors */
          s+=macrophage(cx,cy+6,34,{seed:9});
          [-60,-20,20,60].forEach((deg,k)=>{const r=Math.PI*(deg-90)/180,px=cx+Math.cos(r)*36,py=cy+6+Math.sin(r)*36,d=(1-a)*24;
            s+=antibody(px+Math.cos(r)*(20+d),py+Math.sin(r)*(20+d),18,{ang:deg,col:'var(--ivig)',op:.15+.85*a})});
        }
        const lx=N?x+196:x+12,ly=N?y+76:y+250;
        A.l.forEach((l,k)=>{s+=tx(lx,ly+k*16,l,'t-sm','fill:var(--ink)')});
      });
    }
    else if(p===4){/* IgG levels */
      const L=N?{x:56,y:76,w:318,h:250,tx:20,ty:380}:{x:70,y:72,w:400,h:270,tx:500,ty:96};
      const X=d=>L.x+L.w*d/30,Y=g=>L.y+L.h-L.h*g/45;
      s+=`<rect x="${f1(L.x)}" y="${f1(L.y)}" width="${f1(L.w)}" height="${f1(L.h)}" style="fill:var(--field)"/>`;
      s+=`<rect x="${f1(X(0))}" y="${f1(L.y)}" width="${f1(X(5)-X(0))}" height="${f1(L.h)}" style="fill:var(--ivig);opacity:.12"/>`+tx(X(.6),L.y+14,IV_L.days15,'t-xs');
      [0,10,20,30,40].forEach(g=>{s+=`<line x1="${f1(L.x)}" x2="${f1(L.x+L.w)}" y1="${f1(Y(g))}" y2="${f1(Y(g))}" class="grid"/>`+tx(L.x-6,Y(g)+3,g,'t-xs t-end')});
      [0,14,28].forEach((d,i)=>{s+=tx(X(d),L.y+L.h+16,IV_L.wk[i],'t-xs t-mid')});
      s+=`<line x1="${f1(L.x)}" x2="${f1(L.x+L.w)}" y1="${f1(L.y+L.h)}" y2="${f1(L.y+L.h)}" class="axis"/><line x1="${f1(L.x)}" x2="${f1(L.x)}" y1="${f1(L.y)}" y2="${f1(L.y+L.h)}" class="axis"/>`;
      s+=tx(L.x,L.y-8,IV_L.igY,'t-xs')+tx(L.x+L.w,L.y+L.h+32,IV_L.igX,'t-xs t-end');
      const series=[{P:[ [0,12.5,12.5,12.5],[14,21.2,18.1,23.2],[28,15.4,13.6,17.2] ],col:'var(--ivig)',dash:'',a:ramp(u,0,.5),lab:IV_L.one},
                    {P:[ [0,12.1,12.1,12.1],[14,35.5,30.9,42.7],[28,19.4,15.9,21.9] ],col:'var(--rx)',dash:'6 4',a:ramp(u,.5,.95),lab:IV_L.two}];
      series.forEach((S,si)=>{if(S.a<=0)return;const pts=S.P.map(q=>[X(q[0]),Y(q[1])]);
        const k=S.a*2,seg=Math.min(2,k);let d=`M${f1(pts[0][0])} ${f1(pts[0][1])}`;
        for(let j=1;j<=2;j++){const f=clamp(seg-(j-1));if(f<=0)break;const a0=pts[j-1],a1=pts[j];d+=`L${f1(lerp(a0[0],a1[0],f))} ${f1(lerp(a0[1],a1[1],f))}`}
        s+=`<path d="${d}" style="fill:none;stroke:${S.col};stroke-width:2.6${S.dash?';stroke-dasharray:'+S.dash:''}"/>`;
        S.P.forEach((q,j)=>{if(j>seg+.01)return;const px=X(q[0])+(si?5:-5);
          if(q[2]!==q[3])s+=`<line x1="${f1(px)}" x2="${f1(px)}" y1="${f1(Y(q[2]))}" y2="${f1(Y(q[3]))}" style="stroke:${S.col};stroke-width:2"/>`;
          s+=`<circle cx="${f1(px)}" cy="${f1(Y(q[1]))}" r="5" style="fill:${S.col};stroke:var(--panel);stroke-width:2"/>`;
          if(j>0)s+=si?kitLabel(px+10,Y(q[1])+4,q[1].toFixed(1),{}):kitLabel(px-8,Y(q[1])+(j===1?-8:18),q[1].toFixed(1),{a:'e'})});
      });
      /* legend and notes */
      const lx=L.tx,ly=L.ty;
      s+=`<line x1="${f1(lx)}" x2="${f1(lx+24)}" y1="${f1(ly)}" y2="${f1(ly)}" style="stroke:var(--ivig);stroke-width:2.6"/>`+tx(lx+30,ly+4,IV_L.one,'t-sm','fill:var(--ink)');
      s+=`<g style="opacity:${f1(.25+.75*ramp(u,.5,.6))}"><line x1="${f1(lx)}" x2="${f1(lx+24)}" y1="${f1(ly+20)}" y2="${f1(ly+20)}" style="stroke:var(--rx);stroke-width:2.6;stroke-dasharray:6 4"/>`+tx(lx+30,ly+24,IV_L.two,'t-sm','fill:var(--ink)')+'</g>';
      const notes=[IV_L.igNote1,IV_L.igNote2,'',IV_L.igK1,IV_L.igK2,'',IV_L.igK3,IV_L.igK4,IV_L.igK5];
      notes.forEach((l,i)=>{if(l)s+=tx(lx,ly+52+i*17,l,i===3||i===4?'t-sm':'t-xs',i===4?'fill:var(--ink);font-weight:700':'')});
    }
    else{/* verdict */
      const bx=N?20:250,bw=N?300:330,lw=N?0:230,rowH=24;
      const blocks=N?[66,250,440]:[66,186,306];
      const bar=(x,y,w,frac,col,lab,val)=>`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="16" rx="4" style="fill:var(--panel-2)"/><rect x="${f1(x)}" y="${f1(y)}" width="${f1(w*frac)}" height="16" rx="4" style="fill:${col}"/>`+tx(x+w*frac+6,y+12.5,val,'t-sm','fill:var(--ink);font-weight:700');
      const a1=ease(ramp(u,0,.35)),a2=ease(ramp(u,.25,.6)),a3=ease(ramp(u,.5,.9));
      /* block 1 */
      let y=blocks[0];
      if(N){IV_L.v1N.forEach((l,i)=>{s+=tx(16,y+i*16,l,'t-lbl')});y+=30}else{s+=tx(16,y,IV_L.v1,'t-lbl');y+=14}
      [[IV_L.pe,34,'var(--plasma)'],[IV_L.ivig,53,'var(--ivig)']].forEach(([n,v,c],i)=>{const yy=y+i*rowH+(N?18:0);
        if(N)s+=tx(bx,yy-4,n,'t-xs');else s+=tx(bx-10,yy+12.5,n,'t-sm t-end','fill:var(--ink)');
        s+=bar(bx,yy,bw,v/100*a1,c,n,Math.round(v*a1)+'%')});
      /* block 2 */
      y=blocks[1];
      if(N){IV_L.v2N.forEach((l,i)=>{s+=tx(16,y+i*16,l,'t-lbl')});y+=30}else{s+=tx(16,y,IV_L.v2,'t-lbl');y+=14}
      [[IV_L.pe,.9,'var(--plasma)'],[IV_L.ivig,.8,'var(--ivig)'],[IV_L.both,1.1,'var(--muted)']].forEach(([n,v,c],i)=>{const yy=y+i*rowH+(N?18+i*6:0);
        if(N)s+=tx(bx,yy-4,n,'t-xs');else s+=tx(bx-10,yy+12.5,n,'t-sm t-end','fill:var(--ink)');
        s+=bar(bx,yy,bw,v/1.5*a2,c,n,(v*a2).toFixed(1))});
      /* block 3: a one-row forest */
      y=blocks[2];
      if(N){IV_L.v3N.forEach((l,i)=>{s+=tx(16,y+i*16,l,'t-lbl')});y+=34}else{s+=tx(16,y,IV_L.v3,'t-lbl');y+=18}
      const fx=N?40:250,fw=N?320:330,F=v=>fx+fw*(v+.5);
      s+=`<line x1="${f1(fx)}" x2="${f1(fx+fw)}" y1="${f1(y+30)}" y2="${f1(y+30)}" class="axis"/>`;
      [-.5,-.25,0,.25,.5].forEach(v=>{s+=`<line x1="${f1(F(v))}" x2="${f1(F(v))}" y1="${f1(y+26)}" y2="${f1(y+34)}" class="axis"/>`+tx(F(v),y+46,v===0?'0':(v>0?'+':'')+v,'t-xs t-mid')});
      s+=`<line x1="${f1(F(0))}" x2="${f1(F(0))}" y1="${f1(y)}" y2="${f1(y+30)}" style="stroke:var(--muted);stroke-dasharray:3 3"/>`;
      s+=`<g style="opacity:${f1(a3)}"><line x1="${f1(F(-.20))}" x2="${f1(F(.25))}" y1="${f1(y+12)}" y2="${f1(y+12)}" style="stroke:var(--ink);stroke-width:2.4"/><rect x="${f1(F(.02)-6)}" y="${f1(y+6)}" width="12" height="12" style="fill:var(--ivig);stroke:var(--ink)"/></g>`;
      s+=tx(F(-.5),y+62,IV_L.favPE,'t-xs')+tx(F(.5),y+62,IV_L.favIV,'t-xs t-end');
    }
    s+='</g>';
    svg.innerHTML=s;
    setSt(p);$('#ivNote').innerHTML=noteHTML(P);
  }
  let setSt=()=>{};
  const stop=playWire(rg,$('#ivPlay'),draw,22000,'%t:player.replay%','ivig');
  setSt=stepWire($('#ivSteps'),IV_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- regimen arithmetic ---------- */
  const dsvg=$('#ivDoseSvg'),wIn=$('#ivW');let reg='std';
  function drawDose(){
    const N=vb(dsvg,'720 250','400 300'),R=IV_REG[reg],w=+wIn.value,g=R.d*w,T=g*R.n;
    const L=N?{x0:20,cw:56,gap:6,base:200,maxH:120,tY:262,tx:20,tw:360}:{x0:40,cw:80,gap:14,base:170,maxH:120,tY:206,tx:40,tw:560};
    let s='';
    s+=tx(L.x0,24,R.name,'t-lbl');
    for(let i=0;i<6;i++){const x=L.x0+i*(L.cw+L.gap),on=i<R.n,h=on?L.maxH*R.d:0;
      s+=`<rect x="${f1(x)}" y="${f1(L.base-L.maxH)}" width="${f1(L.cw)}" height="${f1(L.maxH)}" rx="6" style="fill:var(--panel-2);opacity:.6"/>`;
      if(on){s+=`<rect x="${f1(x)}" y="${f1(L.base-h)}" width="${f1(L.cw)}" height="${f1(h)}" rx="6" style="fill:var(--ivig);opacity:.7"/>`;
        s+=tx(x+L.cw/2,L.base-h-8,Math.round(g)+' g','t-sm t-mid','fill:var(--ink);font-weight:700');
        s+=tx(x+L.cw/2,L.base-h+16,R.d+' g/kg','t-xs t-mid','fill:var(--ink)')}
      s+=tx(x+L.cw/2,L.base+16,IV_L.day+' '+(i+1),'t-xs t-mid')}
    /* total against the standard 2 g/kg */
    const tot=R.d*R.n,TW=L.tw,mx=2.4;
    s+=`<rect x="${f1(L.tx)}" y="${f1(L.tY)}" width="${f1(TW)}" height="14" rx="5" style="fill:var(--panel-2)"/><rect x="${f1(L.tx)}" y="${f1(L.tY)}" width="${f1(TW*tot/mx)}" height="14" rx="5" style="fill:var(--ivig)"/>`;
    s+=`<line x1="${f1(L.tx+TW*2/mx)}" x2="${f1(L.tx+TW*2/mx)}" y1="${f1(L.tY-6)}" y2="${f1(L.tY+20)}" style="stroke:var(--ink);stroke-width:2"/>`;
    s+=tx(L.tx+TW*2/mx,L.tY-10,IV_L.twoG,'t-xs t-mid','fill:var(--ink)');
    if(!N)s+=tx(L.tx+TW+10,L.tY+11,tot.toFixed(1)+' g/kg','t-sm','fill:var(--ink);font-weight:700');
    dsvg.innerHTML=s;
    $('#ivDoseOut').textContent=IV_DOSE_TPL.replace('{w}',w).replace('{d}',Math.round(g)).replace('{n}',R.n).replace('{T}',Math.round(T)).replace('{k}',tot.toFixed(1));
    $('#ivDoseSay').innerHTML=R.s;
    $$('[data-ivr]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.ivr===reg));
  }
  $$('[data-ivr]').forEach(b=>b.addEventListener('click',()=>{reg=b.dataset.ivr;drawDose()}));
  wIn.addEventListener('input',drawDose);
  drawDose();

  /* ---------- safety map ---------- */
  const ssvg=$('#ivSafeSvg');let sel=0;
  function drawSafe(){
    const N=vb(ssvg,'720 330','400 420');
    const B=N?bodyFront(200,22,330,{}):bodyFront(360,16,290,{});
    const A=B.at,leg=[A.foot[0],lerp(A.back[1],A.foot[1],.62)];
    const pts={clot:leg,kid:[A.back[0]+(N?14:12),A.back[1]],head:[A.head[0],A.head[1]-(N?10:8)],lung:[A.chest[0]-(N?18:16),A.chest[1]],blood:A.hand,allergy:A.mouth};
    /* label slots: left and right columns */
    const slots=N?{head:[12,60],lung:[12,150],clot:[12,300],allergy:[388,60],kid:[388,170],blood:[388,250]}
                 :{head:[150,50],lung:[150,140],clot:[150,270],allergy:[570,50],kid:[570,150],blood:[570,232]};
    let s=B.svg;
    IV_SAFE.forEach((S,i)=>{const p=pts[S.id],sl=slots[S.id],on=i===sel,right=sl[0]>(N?200:360),lab=N?S.short:S.lab;
      const ex=right?sl[0]-(N?0:0):sl[0];
      s+=`<g data-ivs="${i}" style="cursor:pointer">`;
      s+=`<path d="M${f1(right?sl[0]-4-lab.length*(N?7:7.6):sl[0]+4+lab.length*(N?7:7.6))} ${f1(sl[1]-4)}L${f1(p[0])} ${f1(p[1])}" style="fill:none;stroke:${on?'var(--rx)':'var(--muted)'};stroke-width:${on?2:1.2};stroke-dasharray:${on?'none':'3 3'}"/>`;
      s+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="${on?9:6}" style="fill:${on?'var(--rx)':'var(--panel)'};stroke:var(--rx);stroke-width:2"/>`;
      s+=`<text x="${f1(ex)}" y="${f1(sl[1])}" class="t-lbl${right?' t-end':''}" style="fill:${on?'var(--rx)':'var(--ink)'}">${lab}</text>`;
      s+='</g>'});
    ssvg.innerHTML=s;
    const S=IV_SAFE[sel];$('#ivSafeNote').innerHTML=`<h4>${S.t}</h4><p>${S.s}</p>`;
    $$('[data-ivsb]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.ivsb===sel));
  }
  ssvg.addEventListener('click',e=>{const g=e.target.closest('[data-ivs]');if(!g)return;sel=+g.dataset.ivs;drawSafe()});
  $$('[data-ivsb]').forEach(b=>b.addEventListener('click',()=>{sel=+b.dataset.ivsb;drawSafe()}));
  drawSafe();
  const prev=redraws.ivig;redraws.ivig=()=>{prev&&prev();drawDose();drawSafe()};
};
