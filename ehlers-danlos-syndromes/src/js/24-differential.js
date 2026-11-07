/* =============== 2.4 Look-alikes & red flags =============== */
inits.differential=()=>{
  const T=(x,y,s,cls='t-sm',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`;
  const R=(x,y,w,h,st,rx=0)=>`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(Math.max(0,w))}" height="${f1(Math.max(0,h))}" rx="${rx}" style="${st}"/>`;
  const press=(sel,attr,val)=>$$(sel).forEach(b=>b.setAttribute('aria-pressed',String(b.dataset[attr]===val)));

  /* ================= 1. feature matrix ================= */
  const svg=$('#dfSvg'),rg=$('#dfT');let flag=false;
  const ROWS=[['Vascular EDS','vEDS',1],['Classical EDS','cEDS',0],['Hypermobile EDS','hEDS',0],['Marfan','Marfan',1],['Loeys-Dietz','Loeys-Dietz',1],
    ['Osteogenesis imp.','OI',0],['Cutis laxa','Cutis laxa',0],['Stickler','Stickler',0],['Fibromyalgia','Fibromyalgia',0],['Inflamm. arthritis','Infl. arthritis',0]];
  const COLS=[['joint','hypermob.','joint hypermobility',0],['skin','stretch','skin hyperextensibility',0],['atrophic','scars','atrophic scars',0],['aortic','root','aortic root dilation',1],
    ['arterial','tortuosity','arterial tortuosity',1],['lens','disloc.','lens dislocation',0],['fractures','','fractures',0],['blue','sclerae','blue sclerae',0],['bifid uvula','/ cleft','bifid uvula or cleft palate',0]];
  /* cells: row -> {col:[level,label]}; level 3 hallmark/criterion, 2 published frequency, 1 reported/minor */
  const CELL=[{0:[2,'40.7%'],1:[1,'minor'],4:[1,'early']},{0:[3,'58.7%'],1:[3,''],2:[3,''],3:[2,'33%']},{0:[3,''],1:[1,'mild'],2:[1,''],3:[2,'21%'],6:[1,'']},
    {3:[3,''],5:[3,'≈60%']},{3:[3,''],4:[3,''],8:[3,'']},{6:[3,'']},{1:[1,'no recoil']},{8:[1,'cleft']},{},{}];
  const STEPS=[
    {from:0,at:.06,k:'Feature 1 of 9',t:'Joint hypermobility',
     txt:`Generalised joint hypermobility is Criterion 1 of hEDS and a major criterion of classical EDS, yet only 58.66% of 75 molecularly confirmed cEDS patients had a Beighton score of 5 or more. In confirmed vEDS, 40.7% had joint hypermobility, against 68.4% of people diagnosed on clinical grounds alone, many of whom turned out not to have vEDS. Peripheral (hands and feet) hypermobility may be a clue to vEDS. [[Fairweather2025,Ritelli2020C,Shalhub2020,Carroll2023]]`,
     pt:`Bendy joints are common and appear in many conditions, so on their own they do not point to one diagnosis.`,
     hook:`A low Beighton score does not exclude classical EDS. [[Ritelli2020C]]`},
    {from:.1,at:.16,k:'Feature 2 of 9',t:'Skin hyperextensibility',
     txt:`Stretchy skin with atrophic scarring is the first major criterion of classical EDS: the skin stretches easily and snaps back. hEDS allows only mild hyperextensibility (over 1.5 cm at the distal forearm or back of the hand, over 3 cm at the neck, elbow or knee). In cutis laxa the skin is loose and redundant from fragmented elastic fibres and hangs in folds. Skin hyperextensibility was a minor criterion in a US vEDS study. [[Malfait2024GeneReviews,Thwaites2022,Beyens2021,Shalhub2020]]`,
     pt:`Skin that stretches and springs back suggests classical EDS. Skin that hangs loose suggests cutis laxa.`,
     hook:`Stretch and snap back = classical EDS; loose folds without recoil = cutis laxa. [[Malfait2024GeneReviews,Beyens2021]]`},
    {from:.2,at:.26,k:'Feature 3 of 9',t:'Atrophic scars',
     txt:`In 126 people with suspected classical EDS, every type V collagen defect was in someone with dystrophic scarring; none of the 24 without it had one. hEDS counts atrophic scars at 2 or more sites only when they are not the truly papyraceous (paper-thin) or haemosiderotic (iron-stained) scars of classical EDS. [[Symoens2012,Fairweather2025]]`,
     pt:`Wide, thin, shiny scars that stretch out over time point toward classical EDS.`,
     hook:`No dystrophic scarring: no type V collagen defect in 24 of 24. [[Symoens2012]]`},
    {from:.3,at:.36,k:'Feature 4 of 9',t:'Aortic root dilation',
     txt:`Aortic root aneurysm is a cardinal feature of Marfan syndrome. In 71 consecutive people with EDS, 28% had aortic root dilation above +2 SD (14 of 42 classical, 6 of 29 hypermobile), and it is item 12 of hEDS Feature A. In Loeys-Dietz syndrome, dissection has occurred at root diameters of 3.9–4.0 cm. In vEDS, arteries can rupture "even without significant dilation". [[Loeys2010,Wenstrup2002,Fairweather2025,MacCarrick2014,Isselbacher2022]]`,
     pt:`A widened aorta near the heart is the key sign of Marfan syndrome, but it is also found in some people with EDS.`,
     hook:`Marfan cardinal features: aortic root aneurysm + ectopia lentis. [[Loeys2010]]`},
    {from:.4,at:.46,k:'Feature 5 of 9',t:'Arterial tortuosity',
     txt:`Twisting arteries with aneurysms are part of the Loeys-Dietz triad. In vEDS, a height-adjusted vertebral tortuosity index of 15.5 or more was associated with cardiovascular events (<span class="ev early">Early evidence</span>). Across 1,780 people with aortopathy genes, arterial events beyond the aorta were most common with COL3A1 (20.8%) and rarest with FBN1 (1.5%). [[Loeys2006,Stephens2023,CalderonMartinez2025]]`,
     pt:`Twisty arteries on a scan are a clue to Loeys-Dietz syndrome.`,
     hook:`Loeys-Dietz triad: arterial tortuosity and aneurysms, hypertelorism, bifid uvula or cleft palate. [[Loeys2006]]`},
    {from:.5,at:.56,k:'Feature 6 of 9',t:'Lens dislocation',
     txt:`Ectopia lentis occurs in about 60% of people with Marfan syndrome, and with aortic root aneurysm it is enough for the diagnosis when there is no family history. Its absence is one clue that separates Loeys-Dietz from Marfan syndrome. [[DietzGR-Marfan,Loeys2010,MacCarrick2014]]`,
     pt:`A slipped lens in the eye is a strong pointer to Marfan syndrome, not EDS.`,
     hook:`Lens dislocation: Marfan yes, Loeys-Dietz no. [[MacCarrick2014]]`},
    {from:.6,at:.66,k:'Feature 7 of 9',t:'Fractures',
     txt:`Bone fragility is the hallmark of osteogenesis imperfecta, caused by COL1A1 or COL1A2 variants in about 85%. In hEDS and cEDS, bone density is at most mildly lower and higher fracture rates are not clearly shown (<span class="ev est">Established</span>), although one study found vertebral fractures in 32% vs 8% of controls. EDS as an explanation for infant fractures remains unproven (<span class="ev hyp">Hypothesis</span>). [[Marini2017,Basalom2020,EllerVainicher2016,Castori2015]]`,
     pt:`Bones that break easily point toward osteogenesis imperfecta rather than EDS.`,
     hook:`OI = bone fragility, mostly COL1A1/COL1A2; hEDS lists skeletal dysplasias such as OI as exclusions. [[Marini2017,Fairweather2025]]`},
    {from:.7,at:.76,k:'Feature 8 of 9',t:'Blue sclerae',
     txt:`The research behind this guide has no citable frequency of blue sclerae for any of these ten conditions, so this column stays empty. That is a gap in this guide's sources, not evidence that the sign never occurs.`,
     pt:`An empty column here means "not covered by our sources", not "never seen".`,
     hook:`Read an empty cell as missing evidence in this guide, not as a negative finding.`},
    {from:.8,at:.86,k:'Feature 9 of 9',t:'Bifid uvula or cleft palate',
     txt:`A bifid uvula or cleft palate is part of the Loeys-Dietz triad. Stickler syndrome, a type II/XI collagenopathy, also causes cleft palate, with myopia, retinal detachment, hearing loss and early joint disease. hEDS Feature A includes dental crowding with a high or narrow palate, which is different. [[Loeys2006,MortierGR-Stickler,Fairweather2025]]`,
     pt:`A split uvula at the back of the mouth is an easy-to-check clue to Loeys-Dietz syndrome.`,
     hook:`Stickler: the commonest inherited cause of rhegmatogenous retinal detachment. [[Snead2011]]`},
    {from:.9,at:.98,k:'All features',t:'The pattern, not one sign',
     txt:`No single feature decides. hEDS is the only type without a known gene; the rest need molecular confirmation. In 72 children referred for suspected EDS, 25% met clinical criteria for a subtype and 83% of those were confirmed molecularly; a gene panel still found a variant in 28% of those who did not meet criteria. Fibromyalgia and inflammatory arthritis share none of these signs, but their pain overlaps with hEDS Feature C. [[Malfait2017,Damseh2022,Thwaites2022]]`,
     pt:`Doctors look at the whole pattern of signs, the family history and often a gene test.`,
     hook:`Children should not be diagnosed with hEDS before biological maturity. [[Tofts2023]]`}
  ];
  function draw(t){
    const N=vb(svg,'720 420','400 566');
    const L=N?{lx:10,cx:110,cw:31.5,hy:34,ry:56,rh:30,rmax:9}:{lx:16,cx:150,cw:62,hy:30,ry:70,rh:29,rmax:11};
    const p=phaseOf(STEPS,t);let s='';
    const shown=k=>clamp((t-k*.1)/.06);
    /* column headers and current band */
    COLS.forEach((c,k)=>{const x=L.cx+k*L.cw+L.cw/2,cur=p===k,op=shown(k)>0?1:.4;
      if(cur)s+=R(L.cx+k*L.cw+1,L.hy-(N?18:22),L.cw-2,L.ry+10*L.rh-L.hy+(N?14:18),'fill:var(--dx-soft)',6);
      if(flag&&c[3])s+=R(L.cx+k*L.cw+2,L.hy-(N?16:20),L.cw-4,L.ry+10*L.rh-L.hy+(N?12:16),'fill:none;stroke:var(--vas);stroke-width:1.6;stroke-dasharray:4 3',6);
      if(N)s+=T(x,L.hy,k+1,'t-sm t-mid',`opacity:${op};${cur?'fill:var(--dx);font-weight:700':''}`);
      else{s+=T(x,L.hy,c[0],'t-xs t-mid',`opacity:${op};${cur?'fill:var(--dx);font-weight:700':''}`);if(c[1])s+=T(x,L.hy+12,c[1],'t-xs t-mid',`opacity:${op};${cur?'fill:var(--dx);font-weight:700':''}`)}});
    ROWS.forEach((r,i)=>{const y=L.ry+i*L.rh;
      if(i%2===0)s+=R(L.lx-4,y-L.rh/2,L.cx+9*L.cw-L.lx+4,L.rh,'fill:var(--panel-2);opacity:.45',4);
      if(flag&&r[2])s+=R(L.lx-6,y-L.rh/2+1,L.cx+9*L.cw-L.lx+8,L.rh-2,'fill:none;stroke:var(--vas);stroke-width:1.8',6);
      s+=T(L.lx,y+4,N?r[1]:r[0],N?'t-sm':'t-lbl',flag&&r[2]?'fill:var(--vas);font-weight:700':'fill:var(--ink)');
      COLS.forEach((c,k)=>{const v=CELL[i][k],x=L.cx+k*L.cw+L.cw/2,a=shown(k);if(!v||a<=0){if(a>0)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="1.4" style="fill:var(--line)"/>`;return}
        const rad=[0,L.rmax*.42,L.rmax*.68,L.rmax][v[0]]*ease(a),op=[0,.45,.7,1][v[0]],col=flag&&(r[2]||c[3])?'var(--vas)':'var(--dx)';
        const dx=!N&&v[1]?-15:0;
        s+=`<circle cx="${f1(x+dx)}" cy="${f1(y)}" r="${f1(rad)}" style="fill:${col};opacity:${op}"/>`;
        if(!N&&v[1]&&a>.6)s+=T(x+dx+rad+3,y+4,v[1],'t-xs','fill:var(--ink)')})});
    if(N){const ly=L.ry+10*L.rh+10;s+=T(L.lx,ly,'COLUMNS','t-xs','font-weight:600');
      COLS.forEach((c,k)=>{const y=ly+18+k*17;s+=T(L.lx,y,(k+1)+'  '+c[2],'t-sm',p===k?'fill:var(--dx);font-weight:700':'fill:var(--ink)')})}
    const capY=N?552:398;
    if(flag)s+=T(L.lx,capY,N?'Red outline: vascular rows and columns':'Red outline: conditions and features that raise a heritable vascular disorder','t-sm','fill:var(--vas);font-weight:600');
    else s+=T(L.lx,capY,p<9?(N?'Showing: ':'Revealing column: ')+COLS[p][2]:'All nine features shown','t-sm','fill:var(--dx);font-weight:600');
    svg.innerHTML=s;setSt(p);
    rg.setAttribute('aria-valuetext',STEPS[p].t);
    $('#dfNote').innerHTML=noteHTML(STEPS[p])+(flag?`<div class="kv"><div><dt>Red flags on</dt><dd>Arterial rupture or dissection under 40, spontaneous sigmoid perforation, third-trimester uterine rupture or carotid-cavernous fistula raise vEDS; tortuosity with a bifid uvula raises Loeys-Dietz; aortic root plus lens raises Marfan. [[Demirdas2024,Loeys2006,Loeys2010]]</dd></div></div>`:'');
  }
  const stop=playWire(rg,$('#dfPlay'),draw,24000,'%t:player.replay%','differential');
  const setSt=stepWire($('#dfSteps'),STEPS,rg,draw,stop);
  $('#dfFlag').addEventListener('click',()=>{flag=!flag;$('#dfFlag').setAttribute('aria-pressed',String(flag));draw(+rg.value)});
  draw(+rg.value);

  /* ================= 2. teaching decision tree ================= */
  const tree=$('#dfTree');let pic='vas',ref={aor:'no',jh:'yes'};
  const PICS=[['vas','Rupture: artery, bowel, uterus',['Rupture: artery,','bowel or uterus']],['aor','Aortic root or lens',['Aortic root','or lens']],['skin','Stretchy skin + scars',['Stretchy skin','+ scars']],
    ['jh','Hypermobility, no fragility',['Hypermobility,','no fragility']],['pain','Widespread pain only',['Widespread','pain only']],['syn','Inflamed joints',['Swollen,','inflamed joints']],['bone','Fractures',['Fractures','']]];
  const OUT={
    vas:{l:'COL3A1 test (often a gene panel)',n:['COL3A1 test','(gene panel)'],h:'Suspected vascular EDS: confirm the gene',tag:'tag vas',
      li:[`The consensus recommends identifying the causative COL3A1 variant before applying the diagnosis. [[Byers2017]]`,
        `Minimal criteria prompting testing: family history, arterial rupture or dissection under 40, unexplained sigmoid colon rupture, or spontaneous pneumothorax with other features. [[Wang2026OJRD,Malfait2017]]`,
        `A clinical diagnosis alone "cannot be trusted": 9.8% had non-pathogenic changes. [[Shalhub2020]]`,
        `Atypical COL3A1 variants once called uncertain were reclassified as pathogenic, which supports multigene panels; without a COL3A1 variant, 12 of 40 vEDS-like people had TGFBR1/2 variants. [[Ghali2019GenetMed,Loeys2006]]`]},
    aor_no:{l:'Revised Ghent nosology + FBN1',n:['Ghent nosology','+ FBN1'],h:'Marfan pathway: revised Ghent nosology',tag:'tag',
      li:[`Without a family history: aortic Z-score of 2 or more plus ectopia lentis, an FBN1 variant, or a systemic score of 7 or more; or ectopia lentis plus an FBN1 variant linked to aortic dilation. [[Pollock2021,Loeys2010]]`,
        `These rules apply only when nothing points to Shprintzen-Goldberg, Loeys-Dietz or vascular EDS. [[Pollock2021]]`,
        `FBN1 testing has more weight since 2010 but is not mandatory; molecular confirmation is possible in over 95%. [[Pollock2021,Loeys2010]]`]},
    aor_yes:{l:'Loeys-Dietz gene panel (TGF-β)',n:['Loeys-Dietz','gene panel'],h:'Loeys-Dietz pathway: TGF-β pathway genes',tag:'tag',
      li:[`Classic triad: arterial tortuosity and aneurysms, hypertelorism, bifid uvula or cleft palate. [[Loeys2006]]`,
        `Genes: TGFBR1, TGFBR2, SMAD2, SMAD3, TGFB2, TGFB3 (dominant) and IPO8 (recessive). [[LoeysGR-LDS]]`,
        `Baseline head-to-pelvis vascular imaging is recommended; dissection has occurred at root diameters of 3.9–4.0 cm. [[MacCarrick2014]]`]},
    skin:{l:'cEDS molecular test (COL5A1/2)',n:['cEDS test','COL5A1/2'],h:'Classical EDS: molecular testing',tag:'tag dx',
      li:[`Testing is prompted by major criterion 1 (skin hyperextensibility plus atrophic scarring) plus either major criterion 2 (joint hypermobility) or 3 minor criteria. [[Ritelli2020C]]`,
        `Over 90% of people meeting all major criteria had a type V collagen defect. [[Symoens2012]]`,
        `Fragile skin in someone with hypermobility points away from hEDS, which requires no unusual skin fragility. [[Fairweather2025]]`]},
    jh_yes:{l:'2017 hEDS criteria (clinical)',n:['2017 hEDS','criteria'],h:'Hypermobile EDS: clinical criteria',tag:'tag dx',
      li:[`All three criteria are needed: generalised joint hypermobility, two of Features A–C, and exclusion of other causes. [[Fairweather2025,Thwaites2022]]`,
        `There is no gene test: clinical exome found no candidate variant in children compatible with hEDS or HSD. [[FozFelipe2025]]`,
        `A teaching checklist is in <a href="#" data-go="criteria">The 2017 hEDS criteria</a>.`]},
    jh_no:{l:'Hypermobility spectrum disorder',n:['HSD','framework'],h:'Hypermobility spectrum disorder (HSD)',tag:'tag dx',
      li:[`HSD is joint hypermobility (generalised, peripheral, localised or historical) plus at least one secondary musculoskeletal manifestation. [[Carroll2023,Castori2017]]`,
        `Arachnodactyly, arm span to height of 1.05 or more, soft or stretchy skin, piezogenic papules, atrophic scars, mitral valve prolapse or aortic root dilatation point toward a heritable connective tissue disorder instead. [[Carroll2023]]`,
        `See <a href="#" data-go="hsd">hEDS or HSD?</a>`]},
    pain:{l:'Fibromyalgia criteria (2016)',n:['Fibromyalgia','criteria 2016'],h:'Widespread pain: fibromyalgia criteria',tag:'tag',
      li:[`The physician-based 2016 criteria are valid for individual diagnosis; the 2010/2011 criteria had a median sensitivity of 86% and specificity of 90%. [[Wolfe2016]]`,
        `Fibromyalgia can now be diagnosed alongside another condition. [[Wolfe2016]]`,
        `About 70% of patients at one EDS clinic had previously been diagnosed with fibromyalgia. [[Fairweather2025]]`]},
    syn:{l:'ACR/EULAR 2010 arthritis criteria',n:['ACR/EULAR','2010'],h:'Inflamed joints: inflammatory arthritis criteria',tag:'tag',
      li:[`"Definite rheumatoid arthritis" needs confirmed synovitis in at least one joint, no better explanation, and a score of 6 or more out of 10. [[Aletaha2010]]`,
        `Overt synovitis is unusual in HSD, though small effusions occur. [[Carroll2023]]`,
        `With an autoimmune rheumatic disease present, hEDS needs Features A and B; Feature C cannot be counted. [[Fairweather2025]]`]},
    bone:{l:'OI testing (COL1A1/COL1A2)',n:['OI test','COL1A1/2'],h:'Bone fragility: osteogenesis imperfecta',tag:'tag',
      li:[`Dominant COL1A1 or COL1A2 variants cause about 85% of OI. [[Marini2017]]`,
        `In hEDS and cEDS, higher fracture rates are not clearly shown. [[Basalom2020]]`,
        `Bruising in a child: EDS belongs on the differential, but EDS as an explanation for infant fractures is unproven. [[Castori2015]]`]}
  };
  const outKey=k=>k==='aor'?'aor_'+ref.aor:k==='jh'?'jh_'+ref.jh:k;
  function drawTree(){
    const N=vb(tree,'720 330','400 560');let s='';
    if(!N){const rx=16,ry=150;s+=R(rx,ry,118,36,'fill:var(--ink)',10)+T(rx+59,ry+15,'Presenting','t-xs t-mid','fill:var(--bg);font-weight:700')+T(rx+59,ry+28,'picture','t-xs t-mid','fill:var(--bg);font-weight:700');
      PICS.forEach(([k,l],i)=>{const y=14+i*44,on=k===pic,o=OUT[outKey(k)];
        s+=`<path d="M${rx+118} ${ry+18}C${rx+140} ${ry+18} ${150} ${y+15} 168 ${y+15}" style="fill:none;stroke:${on?'var(--dx)':'var(--line)'};stroke-width:${on?2.4:1.2}"/>`;
        s+=R(168,y,190,30,`fill:${on?'var(--dx-soft)':'var(--panel)'};stroke:${on?'var(--dx)':'var(--line)'};stroke-width:${on?2:1}`,8)+T(178,y+19,l,'t-xs',on?'fill:var(--dx);font-weight:700':'fill:var(--ink)');
        s+=`<path d="M358 ${y+15}H392" style="stroke:${on?'var(--dx)':'var(--line)'};stroke-width:${on?2.4:1.2}"/>`;
        s+=R(392,y,312,30,`fill:${on?'var(--dx)':'var(--panel-2)'};opacity:${on?1:.7}`,8)+T(404,y+19,o.l,'t-xs',on?'fill:var(--bg);font-weight:700':'fill:var(--muted)')});}
    else{s+=R(12,8,376,30,'fill:var(--ink)',10)+T(200,28,'Presenting picture → published pathway','t-sm t-mid','fill:var(--bg);font-weight:700');
      PICS.forEach(([k,l,n2],i)=>{const y=52+i*72,on=k===pic,o=OUT[outKey(k)];
        s+=R(12,y,170,56,`fill:${on?'var(--dx-soft)':'var(--panel)'};stroke:${on?'var(--dx)':'var(--line)'};stroke-width:${on?2:1}`,8);
        n2.forEach((ln,j)=>s+=T(22,y+24+j*16,ln,'t-sm',on?'fill:var(--dx);font-weight:700':'fill:var(--ink)'));
        s+=`<path d="M182 ${y+28}H206" style="stroke:${on?'var(--dx)':'var(--line)'};stroke-width:${on?2.4:1.2}"/>`;
        s+=R(206,y,182,56,`fill:${on?'var(--dx)':'var(--panel-2)'};opacity:${on?1:.7}`,8);
        o.n.forEach((ln,j)=>s+=T(216,y+24+j*16,ln,'t-sm',on?'fill:var(--bg);font-weight:700':'fill:var(--muted)'))});}
    tree.innerHTML=s;
    const o=OUT[outKey(pic)];
    $('#dfOut').innerHTML=`<span class="${o.tag}" style="align-self:flex-start">Teaching pathway</span><h4>${o.h}</h4><ul>${o.li.map(x=>`<li>${x}</li>`).join('')}</ul>`;
    const rf=$('#dfRefine');
    if(pic==='aor')rf.innerHTML=`<span class="kicker">Also tortuous arteries, wide-set eyes or bifid uvula?</span><button class="btn" data-dfref="yes" aria-pressed="${ref.aor==='yes'}">Yes</button><button class="btn" data-dfref="no" aria-pressed="${ref.aor==='no'}">No</button>`;
    else if(pic==='jh')rf.innerHTML=`<span class="kicker">All three 2017 hEDS criteria met?</span><button class="btn" data-dfref="yes" aria-pressed="${ref.jh==='yes'}">Yes</button><button class="btn" data-dfref="no" aria-pressed="${ref.jh==='no'}">No</button>`;
    else rf.innerHTML=`<span class="kicker">No refining question for this picture</span>`;
  }
  $$('[data-dfpic]').forEach(b=>b.addEventListener('click',()=>{pic=b.dataset.dfpic;press('[data-dfpic]','dfpic',pic);drawTree()}));
  $('#dfRefine').addEventListener('click',e=>{const b=e.target.closest('[data-dfref]');if(!b)return;ref[pic]=b.dataset.dfref;drawTree()});
  redraws.differential=(prev=>()=>{prev&&prev();drawTree()})(redraws.differential);
  drawTree();
};
