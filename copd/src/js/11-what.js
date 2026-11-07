/* =============== 1.1 What COPD is =============== */
/* Main player: a healthy lung turns into the two faces of COPD (small-airway disease / chronic bronchitis and
   emphysema), with a face toggle, then the slow breath out, the PRISm map and the five etiotypes.
   Then a regional explorer (four measures) and an age-sex prevalence chart with a 100-person icon array.
   Every figure is from research pass A (Adeloye2022, Safiri2022 and others); citations sit in HTML text only. */
const WH_STEPS=[
 {from:0,at:.06,k:'Healthy',t:'Open airways, elastic sacs',
  txt:'Lungs grow until about age 20–25 (earlier in females), then plateau briefly before a mild age-related decline [[Agusti2023]]. In the magnified views the small airway is held open and many small air sacs swap oxygen for carbon dioxide.',
  pt:'Healthy lungs have open tubes and springy air sacs that empty fully when you breathe out.',
  hook:'Lung function peaks in early adulthood (about age 20–25), plateaus briefly, then declines slowly [[Agusti2023]].'},
 {from:.16,at:.27,k:'Airways',t:'Bronchitis and bronchiolitis',
  txt:'GOLD 2023 names abnormalities of the airways (bronchitis, bronchiolitis) as one of the two sources of obstruction [[Agusti2023]]. Small airways under 2 mm are the main site [[McDonough2011]]: their walls thicken with inflammatory cells and connective tissue, and mucus collects in the lumen [[Hogg2004Lancet]]. Mucus from goblet cells can plug them and help them collapse [[Kim2013]].',
  pt:'The small breathing tubes become swollen, thick-walled and clogged with mucus.',
  hook:'The main site of obstruction in COPD is the small airways, under 2 mm across [[McDonough2011]].'},
 {from:.33,at:.44,k:'Alveoli',t:'Emphysema',
  txt:'The second abnormality is emphysema: enlarged airspaces with loss of alveolar walls, as the ATS defined it in 1962 [[Agusti2023,Petty2006]]. Laënnec saw emphysematous lungs that stayed inflated and did not empty [[Petty2006]]. Alveolar surface area was 33% lower even in GOLD 1 [[Koo2018]].',
  pt:'The thin walls between the tiny air sacs break down, leaving fewer, bigger, floppy spaces.',
  hook:'Emphysema is defined anatomically: enlarged airspaces with loss of alveolar walls [[Petty2006]].'},
 {from:.5,at:.6,k:'Obstruction',t:'Breathing out is slow',
  txt:'Narrowed small airways plus a floppier emphysematous lung lengthen the time the lung takes to empty [[Hogg2004Lancet]]. Spirometry shows this as a post-bronchodilator FEV1/FVC below 0.7 [[Agusti2023]]. A single result between 0.60 and 0.80 should be confirmed on another occasion [[Agusti2023]].',
  pt:'Air comes out slowly, so less of the breath is blown out in the first second.',
  hook:'Diagnosis: post-bronchodilator FEV1/FVC below 0.7, with symptoms and/or exposure to risk factors [[Agusti2023]].'},
 {from:.67,at:.75,k:'Before COPD',t:'Pre-COPD and PRISm',
  txt:'Pre-COPD means symptoms and/or structural or functional abnormalities with a ratio above 0.7. PRISm is a ratio of at least 0.7 with FEV1 below 80% of reference; reported prevalence ranges from 7.1% to 20.3%, it is linked to higher all-cause mortality, and it can shift to normal, obstructive or restrictive spirometry over time [[Agusti2023]].',
  pt:'Some people have lung trouble before the test meets the COPD cut-off. Some get better and some get worse.',
  hook:'PRISm = FEV1/FVC ≥0.7 with FEV1 below 80% predicted [[Agusti2023]].'},
 {from:.83,at:.9,k:'Many causes',t:'Etiotypes',
  txt:'GOLD 2023 and the Lancet Commission classify COPD by cause: genes, early life, infection, smoking or vaping, and environment [[Agusti2023,Stolz2022]]. GOLD 2023 states that non-smoking risk factors account for over 50% of the global burden [[Agusti2023]].',
  pt:'COPD has many causes, not only smoking.',
  hook:'Lancet Commission 2022: five cause-based types of COPD (early evidence) [[Stolz2022]].'}
];
const WH_TXT={
 lungs:'lungs',airway:'small airway, cut across',sacs:'air sacs',inn:'breathing in',out:'breathing out',
 face:{both:'Airways and air sacs',airway:'Airway disease only',emph:'Emphysema only'},
 rowHead:'What has changed',
 rows:[{k:'AIRWAY WALL',ok:'thin and calm',bad:'thick, inflamed',src:'a'},
   {k:'MUCUS',ok:'a thin layer',bad:'more, plugging',src:'a'},
   {k:'SUPPORT AROUND AIRWAYS',ok:'holds them open',bad:'lost with sac walls',src:'e'},
   {k:'AIR SACS',ok:'many, small',bad:'fewer, larger',src:'e'},
   {k:'BREATHING OUT',ok:'empties fully',bad:'slow, air trapped',src:'x'}],
 vtTitle:'A forced breath out',vtX:'seconds',vtY:'volume blown out',one:'1 s',healthy:'healthy',copd:'COPD',
 fev1:'FEV1',fvc:'FVC',ratioOk:'Healthy: FEV1/FVC 0.7 or more',ratioLow:'COPD: FEV1/FVC below 0.7',
 mapTitle:'Spirometry after a bronchodilator',mapX:'FEV1/FVC',mapY:'FEV1, % of reference',
 zNorm:'normal',zPrism:'PRISm',zObs:'obstruction',zObs2:'COPD if symptoms',zObs3:'or exposure',
 pre:'pre-COPD: symptoms or abnormal',pre2:'lungs with a ratio above 0.7',person:'one person, over time',
 etHead:'Five types by cause',
 et:[['Genetic','alpha-1, TERT mutations'],['Early life','lung growth, prematurity'],['Infection','TB, HIV, early pneumonia'],['Smoking or vaping','tobacco, e-cigarettes'],['Environment','smoke, outdoor air, work']],
 etFoot:'Lancet Commission proposal'
};
/* the regional explorer: [label, value, kind]; kind w = world, hi = highest reported, lo = lowest reported, o = other */
const WH_MEAS={
 who:{unit:'%',max:14,dec:1,rows:[['World, GOLD fixed ratio',10.3,'w'],['Western Pacific (highest WHO region)',11.7,'hi'],['Americas (lowest WHO region)',6.8,'lo'],['LMICs, adjusted for age and sex',10.3,'o'],['High-income countries, adjusted',10.1,'o'],['World, lower limit of normal',7.6,'o']],
   cap:'Prevalence among people aged 30–79 in 2019, by WHO region and income group [[Adeloye2022]]. The research pass gives the highest and lowest WHO regions only.',
   note:{k:'Ages 30–79 · 2019',t:'About 1 in 10 worldwide',txt:'Prevalence was highest in the Western Pacific (11.7%) and lowest in the Americas (6.8%). Once age and sex were taken into account, it was 10.3% in low- and middle-income countries and 10.1% in high-income countries [[Adeloye2022]].',pt:'COPD is common everywhere. Poorer countries have most of the people with it because they have most of the world\'s people.',hook:'Global prevalence 10.3% (GOLD) vs 7.6% (LLN); 80.5% of the 391.9 million live in LMICs [[Adeloye2022]].'}},
 gbd:{unit:'per 100,000',max:4500,dec:1,rows:[['World',2638.2,'w'],['Denmark (highest country)',4299.5,'hi'],['Myanmar',3963.7,'o'],['Belgium',3927.7,'o'],['High-income North America (highest region)',3558.4,'hi'],['South Asia',3298.8,'o'],['Australasia',3192.8,'o'],['Andean Latin America (lowest region)',1382.6,'lo']],
   cap:'Age-standardised point prevalence, Global Burden of Disease 2019, all ages [[Safiri2022]]. Only the top three countries and regions and the lowest region are in the research pass.',
   note:{k:'GBD 2019 · all ages',t:'212.3 million cases',txt:'The GBD study counted 212.3 million prevalent cases. The age-standardised prevalence of 2,638.2 per 100,000 was 8.7% lower than in 1990 [[Safiri2022]]. GBD uses a different case definition and method from the spirometry-based estimate, so its count is lower [[Adeloye2022,Safiri2022]].',pt:'Different studies count COPD in different ways, so their totals differ.',hook:'GBD 2019: highest age-standardised prevalence in Denmark, Myanmar and Belgium [[Safiri2022]].'}},
 death:{unit:'per 100,000',max:200,dec:1,rows:[['World',42.5,'w'],['Nepal (highest country)',182.5,'hi'],['Oceania (highest region)',112.1,'hi'],['South Asia',93.2,'o'],['East Asia',64.6,'o'],['Japan (lowest country)',7.4,'lo']],
   cap:'Age-standardised COPD death rate, Global Burden of Disease 2019 [[Safiri2022]].',
   note:{k:'Deaths · 2019',t:'3.3 million deaths',txt:'COPD caused 3.3 million deaths in 2019, up from 2.5 million in 1990, while the age-standardised death rate fell by 41.7% [[Safiri2022]]. Nepal had the highest rate (182.5 per 100,000) and Japan the lowest (7.4), a difference of more than twenty-fold [[Safiri2022]].',pt:'Where you live makes a big difference to the risk of dying from COPD.',hook:'Highest age-standardised death rates by region: Oceania, South Asia, East Asia [[Safiri2022]].'}},
 count:{unit:'million',max:620,dec:1,rows:[['Ages 30–79, GOLD ratio, 2019',391.9,'w'],['of whom in LMICs',315.5,'o'],['Ages 30–79, LLN, 2019',292.0,'o'],['All ages, GBD 2019',212.3,'o'],['Projected 2050, ages 25+ (about)',600,'o']],
   cap:'Number of people with COPD by each method [[Adeloye2022,Safiri2022]], and the 2050 projection [[Boers2023]].',
   note:{k:'Counting',t:'Between 212 and 392 million now',txt:'The count depends on the definition and the ages included: 391.9 million by the GOLD ratio and 292.0 million by the LLN at ages 30–79 [[Adeloye2022]], or 212.3 million at all ages in GBD [[Safiri2022]]. A modelling study projects a 23% rise in cases from 2020 to 2050, approaching 600 million [[Boers2023]].',pt:'Hundreds of millions of people have COPD, and the number is expected to grow.',hook:'Projection to 2050: cases in women up 47.1%, men 9.4% [[Boers2023]].'}}
};
const WH_KIND={w:'var(--brand)',hi:'var(--bad)',lo:'var(--good)',o:'var(--dx)'};
const WH_AGE={bands:['30–34','35–39','40–44','45–49','50–54','55–59','60–64','65–69','70–74','75–79'],
 all:[3.8,4.9,6.3,8.0,10.2,12.8,15.8,19.5,23.4,27.8],
 men:[5.4,null,8.9,null,14.3,null,22.0,null,32.1,38.0],
 women:[2.1,null,3.6,null,6.0,null,9.9,null,15.8,19.8]};
const WH_ATXT={
 who:{all:'Everyone',men:'Men',women:'Women'},col:{all:'var(--brand)',men:'var(--dx)',women:'var(--accent)'},
 yl:'% with COPD',xl:'age, years',none:'no figure',noneLong:'The research pass has no figure for this group',
 years:a=>`${a} years`,
 read:(who,age,v,n)=>`${who} aged ${age}: <b>${v}%</b>, about <b>${n} in 100</b>`,
 arr:(who,n)=>`${who}: ${n} in 100`,
 note:(age)=>({k:'Age and sex · 2019',t:`Ages ${age}`,
  txt:'Prevalence rises steeply with age, from 3.8% at 30–34 to 27.8% at 75–79 worldwide by the GOLD ratio [[Adeloye2022]]. At every age shown, men\'s prevalence is higher than women\'s; in GBD 2019, though, COPD was more common in women older than 74, and the death rate was higher in men in every age group [[Adeloye2022,Safiri2022]].',
  pt:'The older the group, the more people in it have COPD.',
  hook:'Ages 30–79 worldwide: men 14.1%, women 6.5% [[Adeloye2022]].'})
};
inits.what=()=>{
  const svg=$('#whSvg'),rg=$('#whT');let face='both';
  function draw(t){
    const N=vb(svg,'720 400','400 720'),p=phaseOf(WH_STEPS,t),P=WH_STEPS[p];
    const L=N?{tx:16,ty:26,lx:105,ly:62,ls:176,ax:300,ay:112,ar:38,vx:300,vy:268,vs:88,px:16,py:368,pw:368,ph:336,rowH:56,cw:40}
             :{tx:20,ty:28,lx:128,ly:66,ls:214,ax:362,ay:136,ar:50,vx:362,vy:300,vs:116,px:474,py:62,pw:230,ph:318,rowH:54,cw:36};
    const A=face!=='emph'?ramp(t,.16,.3):0,E=face!=='airway'?ramp(t,.33,.47):0,O=ramp(t,.5,.6);
    const ph=(t*14)%1,br=ph<.5?ease(ph*2):1-ease((ph-.5)*2),out=ph>=.5;
    let s=`<text x="${L.tx}" y="${L.ty}" class="t-big">${P.t}</text><text x="${L.tx}" y="${L.ty+17}" class="t-sm">${WH_TXT.face[face]}</text>`;
    /* lungs with a zoom spot */
    s+=lungs(L.lx,L.ly,L.ls,{hyper:O*Math.max(A*.45,E),bullae:E*.9,mucus:A*.8,inflam:A,breathe:br});
    const zx=L.lx+L.ls*.3,zy=L.ly+L.ls*.5;
    s+=`<circle cx="${f1(zx)}" cy="${f1(zy)}" r="9" style="fill:none;stroke:var(--ink);stroke-width:1.4"/>`;
    s+=`<path d="M${f1(zx+8)} ${f1(zy-4)}L${f1(L.ax-L.ar*1.5)} ${f1(L.ay)}M${f1(zx+8)} ${f1(zy+4)}L${f1(L.vx-L.vs*.6)} ${f1(L.vy)}" style="stroke:var(--muted);stroke-width:1;stroke-dasharray:3 3;fill:none"/>`;
    s+=`<text x="${L.lx}" y="${f1(L.ly+L.ls*(1+.08*O)+20)}" class="t-xs t-mid">${WH_TXT.lungs}</text>`;
    /* magnified small airway */
    const AW=airway(L.ax,L.ay,L.ar,{wall:A*.85,squeeze:A*.35,mucus:A*.5,inflam:A,tether:1-E*.85,collapse:out?O*(.3*A+.7*E):0,ph:t*10,seed:4});
    s+=AW.svg+`<text x="${L.ax}" y="${f1(L.ay+L.ar*1.45+16)}" class="t-xs t-mid">${WH_TXT.airway}</text>`;
    /* magnified air sacs */
    const AV=alveoli(L.vx,L.vy,L.vs,{destroy:E*.85,o2:(1-E*.5)*(out?.35:1),co2:.5,trap:O*Math.max(E,A*.5),elastin:true,ph:t*8,seed:6});
    s+=AV.svg+`<text x="${L.vx}" y="${f1(L.vy+L.vs*.62+14)}" class="t-xs t-mid">${WH_TXT.sacs}</text>`;
    s+=`<text x="${L.ax}" y="${f1(L.ay-L.ar*1.45-6)}" class="t-xs t-mid" style="fill:var(--air-ink)">${out?WH_TXT.out:WH_TXT.inn}</text>`;
    /* the side panel changes with the phase */
    const fade=clamp((t-P.from)/.03+(p===0?1:0));
    s+=`<g style="opacity:${f1(fade)}">`;
    const X=L.px,Y=L.py,W=L.pw;
    if(p<=2){
      s+=`<text x="${X}" y="${Y+4}" class="t-lbl">${WH_TXT.rowHead}</text>`;
      WH_TXT.rows.forEach((r,i)=>{const v=r.src==='a'?A:r.src==='e'?E:Math.max(A,E),bad=v>.5,y=Y+30+i*L.rowH;
        s+=`<text x="${X}" y="${y}" class="t-xs" style="letter-spacing:.06em">${r.k}</text>`;
        s+=chip(X,y+17,bad?r.bad:r.ok,{col:bad?'var(--bad)':'var(--good)',fill:bad?'var(--bad-soft)':'var(--good-soft)'})});
    }else if(p===3){
      const gx=X+34,gy=Y+34,gw=W-50,gh=N?190:170,u=ramp(t,.5,.62);
      s+=`<text x="${X}" y="${Y+4}" class="t-lbl">${WH_TXT.vtTitle}</text>`;
      s+=axes(gx,gy,gw,gh,{xt:[[0,'0'],[1/6,'1'],[.5,'3'],[1,'6']],yt:[],grid:false,xl:WH_TXT.vtX});
      s+=`<text x="${gx}" y="${gy-8}" class="t-xs">${WH_TXT.vtY}</text>`;
      const hf=spiroVT(.8,1),cf=spiroVT(.55,1),ch=.8;
      s+=`<path d="${pathFn(v=>1-hf(v*u),gx,gx+gw*u,gy+gh,gy,90)}" style="fill:none;stroke:var(--muted);stroke-width:2;stroke-dasharray:5 4"/>`;
      s+=`<path d="${pathFn(v=>1-cf(v*u)*ch,gx,gx+gw*u,gy+gh,gy,90)}" style="fill:none;stroke:var(--o2);stroke-width:2.8"/>`;
      const x1=gx+gw/6;s+=`<line x1="${f1(x1)}" x2="${f1(x1)}" y1="${gy}" y2="${gy+gh}" style="stroke:var(--ink);stroke-width:1;stroke-dasharray:2 3"/>`;
      if(u>=1/6){const yh=gy+gh*(1-hf(1/6)),yc=gy+gh*(1-cf(1/6)*ch);
        s+=`<circle cx="${f1(x1)}" cy="${f1(yh)}" r="4" style="fill:var(--muted)"/><circle cx="${f1(x1)}" cy="${f1(yc)}" r="4.5" style="fill:var(--o2)"/>`;
        s+=`<text x="${f1(x1+8)}" y="${f1(yc+14)}" class="t-xs" style="fill:var(--o2-ink)">${WH_TXT.fev1}</text>`}
      if(u>.9){s+=`<text x="${gx+gw}" y="${f1(gy+gh*(1-hf(1))-6)}" class="t-xs t-end">${WH_TXT.healthy} ${WH_TXT.fvc}</text><text x="${gx+gw}" y="${f1(gy+gh*(1-cf(1)*ch)+14)}" class="t-xs t-end" style="fill:var(--o2-ink)">${WH_TXT.copd} ${WH_TXT.fvc}</text>`}
      const ry=gy+gh+52;
      s+=`<line x1="${X}" x2="${X+18}" y1="${ry-4}" y2="${ry-4}" style="stroke:var(--muted);stroke-width:2;stroke-dasharray:5 4"/><text x="${X+24}" y="${ry}" class="t-sm" style="fill:var(--ink)">${WH_TXT.ratioOk}</text>`;
      s+=`<line x1="${X}" x2="${X+18}" y1="${ry+18}" y2="${ry+18}" style="stroke:var(--o2);stroke-width:2.8"/><text x="${X+24}" y="${ry+22}" class="t-sm" style="fill:var(--o2-ink)">${WH_TXT.ratioLow}</text>`;
    }else if(p===4){
      const gx=X+36,gy=Y+40,gw=W-46,gh=N?200:180;
      const xr=v=>gx+gw*(v-.4)/.55,yr=v=>gy+gh*(1-(v-40)/80);
      s+=`<text x="${X}" y="${Y+4}" class="t-lbl">${WH_TXT.mapTitle}</text>`;
      s+=`<rect x="${f1(gx)}" y="${f1(gy)}" width="${f1(xr(.7)-gx)}" height="${f1(gh)}" style="fill:var(--bad-soft)"/>`;
      s+=`<rect x="${f1(xr(.7))}" y="${f1(gy)}" width="${f1(gx+gw-xr(.7))}" height="${f1(yr(80)-gy)}" style="fill:var(--good-soft)"/>`;
      s+=`<rect x="${f1(xr(.7))}" y="${f1(yr(80))}" width="${f1(gx+gw-xr(.7))}" height="${f1(gy+gh-yr(80))}" style="fill:var(--warn-soft)"/>`;
      s+=`<rect x="${f1(xr(.7)+3)}" y="${f1(gy+3)}" width="${f1(gx+gw-xr(.7)-6)}" height="${f1(gh-6)}" rx="8" style="fill:none;stroke:var(--rx);stroke-width:1.6;stroke-dasharray:5 4;opacity:${f1(ramp(t,.71,.74))}"/>`;
      s+=axes(gx,gy,gw,gh,{xt:[[(.5-.4)/.55,'0.5'],[(.7-.4)/.55,'0.7'],[(.9-.4)/.55,'0.9']],yt:[[.25,'60'],[.5,'80'],[.75,'100']],grid:false});
      s+=`<text x="${gx+gw}" y="${gy+gh+30}" class="t-xs t-end">${WH_TXT.mapX}</text><text x="${X}" y="${gy-10}" class="t-xs">${WH_TXT.mapY}</text>`;
      const cxo=(gx+xr(.7))/2;
      s+=`<text x="${f1(cxo)}" y="${f1(gy+gh*.42)}" class="t-lbl t-mid" style="fill:var(--bad)">${WH_TXT.zObs}</text><text x="${f1(cxo)}" y="${f1(gy+gh*.42+16)}" class="t-xs t-mid">${WH_TXT.zObs2}</text><text x="${f1(cxo)}" y="${f1(gy+gh*.42+28)}" class="t-xs t-mid">${WH_TXT.zObs3}</text>`;
      const cxr=(xr(.7)+gx+gw)/2;
      s+=`<text x="${f1(cxr)}" y="${f1(gy+22)}" class="t-lbl t-mid" style="fill:var(--good)">${WH_TXT.zNorm}</text>`;
      s+=`<text x="${f1(cxr)}" y="${f1(gy+gh-12)}" class="t-lbl t-mid" style="fill:var(--warn)">${WH_TXT.zPrism}</text>`;
      /* one person's path: normal, then PRISm, then either way */
      const K=[[.84,104],[.8,92],[.78,70],[.74,64],[.64,60]],q=ramp(t,.68,.82)*(K.length-1),i0=Math.min(K.length-2,Math.floor(q)),fr=q-i0;
      const px=xr(lerp(K[i0][0],K[i0+1][0],fr)),py=yr(lerp(K[i0][1],K[i0+1][1],fr));
      let tr='';for(let k=0;k<=i0;k++)tr+=(k?'L':'M')+f1(xr(K[k][0]))+' '+f1(yr(K[k][1]));tr+='L'+f1(px)+' '+f1(py);
      s+=`<path d="${tr}" style="fill:none;stroke:var(--ink);stroke-width:1.2;stroke-dasharray:2 3"/><circle cx="${f1(px)}" cy="${f1(py)}" r="6" style="fill:var(--ink)"/>`;
      const ly=gy+gh+48;
      s+=`<text x="${X}" y="${ly}" class="t-xs" style="fill:var(--rx)">${WH_TXT.pre}</text><text x="${X}" y="${ly+13}" class="t-xs" style="fill:var(--rx)">${WH_TXT.pre2}</text>`;
      s+=`<circle cx="${X+4}" cy="${ly+29}" r="4" style="fill:var(--ink)"/><text x="${X+14}" y="${ly+33}" class="t-xs">${WH_TXT.person}</text>`;
    }else{
      s+=`<text x="${X}" y="${Y+4}" class="t-lbl">${WH_TXT.etHead}</text>`;
      const cols=['var(--rx)','var(--rec)','var(--bact)','var(--smoke)','var(--dx)'];
      WH_TXT.et.forEach((e,i)=>{const on=ramp(t,.84+i*.025,.86+i*.025),y=Y+30+i*L.rowH;
        s+=`<g style="opacity:${f1(.25+.75*on)}"><rect x="${X}" y="${y-6}" width="6" height="${L.rowH-14}" rx="3" style="fill:${cols[i]}"/>`;
        s+=`<text x="${X+16}" y="${y+10}" class="t-lbl">${e[0]}</text><text x="${X+16}" y="${y+26}" class="t-xs">${e[1]}</text></g>`});
      s+=`<text x="${X}" y="${Y+30+5*L.rowH}" class="t-xs" style="font-style:italic">${WH_TXT.etFoot}</text>`;
    }
    s+='</g>';
    svg.innerHTML=s;setSt(p);$('#whNote').innerHTML=noteHTML(P);
  }
  const stop=playWire(rg,$('#whPlay'),draw,22000,'%t:player.replay%','what');
  const setSt=stepWire($('#whSteps'),WH_STEPS,rg,draw,stop);
  $('#whFace').addEventListener('click',e=>{const b=e.target.closest('[data-face]');if(!b)return;face=b.dataset.face;
    $$('#whFace [data-face]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)});
  draw(+rg.value);

  /* ---- regional explorer ---- */
  const ms=$('#whMap');let meas='who',stopM=null;
  function drawMap(g=1){
    const M=WH_MEAS[meas],n=M.rows.length,N0=NARROW(),rh=N0?50:38,top=N0?30:34;
    const N=vb(ms,'720 '+(top+n*rh+44),'400 '+(top+n*rh+44));
    const L=N?{lx:16,bx:16,bw:300,vx:322}:{lx:20,bx:300,bw:330,vx:638};
    const X=v=>L.bx+L.bw*clamp(v/M.max);
    let s=`<text x="${L.lx}" y="18" class="t-xs">${M.unit}</text>`;
    M.rows.forEach((r,i)=>{const y=top+i*rh,by=N?y+18:y+4,c=WH_KIND[r[2]];
      s+=`<text x="${L.lx}" y="${N?y+10:y+16}" class="t-sm" style="fill:var(--ink)${r[2]==='w'?';font-weight:700':''}">${r[0]}</text>`;
      s+=`<rect x="${L.bx}" y="${by}" width="${L.bw}" height="16" rx="4" style="fill:var(--panel-2)"/>`;
      s+=`<rect x="${L.bx}" y="${by}" width="${f1(Math.max(2,(X(r[1])-L.bx)*ease(g)))}" height="16" rx="4" style="fill:${c}"/>`;
      s+=`<text x="${L.vx}" y="${by+13}" class="t-sm" style="fill:var(--ink);font-weight:600">${r[1].toLocaleString('en-GB',{minimumFractionDigits:r[1]%1?1:0,maximumFractionDigits:1})}</text>`});
    const wv=M.rows.find(r=>r[2]==='w'),wx=X(wv[1]),yb=top+n*rh;
    s+=`<line x1="${f1(wx)}" x2="${f1(wx)}" y1="${top-6}" y2="${yb}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:3 3"/>`;
    s+=`<text x="${L.bx}" y="${yb+16}" class="t-xs">0</text><text x="${L.bx+L.bw}" y="${yb+16}" class="t-xs t-end">${M.max.toLocaleString('en-GB')}</text>`;
    const lg=[['w','world'],['hi','highest'],['lo','lowest']];
    lg.forEach((k,i)=>{const lx=L.lx+i*(N?110:120);s+=`<rect x="${lx}" y="${yb+28}" width="12" height="8" rx="2" style="fill:${WH_KIND[k[0]]}"/><text x="${lx+18}" y="${yb+36}" class="t-xs">${WH_LEG[k[1]]}</text>`});
    ms.innerHTML=s;$('#whMapCap').innerHTML=M.cap;$('#whMapNote').innerHTML=noteHTML(M.note);
  }
  $('#whMeas').addEventListener('click',e=>{const b=e.target.closest('[data-meas]');if(!b)return;meas=b.dataset.meas;
    $$('#whMeas [data-meas]').forEach(x=>x.setAttribute('aria-pressed',x===b));stopM&&stopM();stopM=animate(600,drawMap)});
  drawMap(1);

  /* ---- age and sex ---- */
  const as=$('#whAgeSvg'),ar=$('#whAge');let sex='all';
  function drawAge(){
    const ai=+ar.value,band=WH_AGE.bands[ai],ser=sex==='both'?['men','women']:[sex];
    const N=vb(as,'720 340','400 640');
    const L=N?{gx:40,gy:44,gw:344,gh:200,ix:20,iy:330,iw:360,ih:280}:{gx:52,gy:40,gw:380,gh:250,ix:466,iy:46,iw:238,ih:250};
    const Y=v=>L.gy+L.gh*(1-v/40),bw=L.gw/10;
    let s=axes(L.gx,L.gy,L.gw,L.gh,{yt:[[0,'0'],[.25,'10'],[.5,'20'],[.75,'30'],[1,'40']],xt:[],grid:true,yl:WH_ATXT.yl});
    WH_AGE.bands.forEach((b,i)=>{const x0=L.gx+i*bw,sel=i===ai;
      s+=`<g class="clk" data-ab="${i}" style="opacity:${sel?1:.55}">`;
      s+=`<rect x="${f1(x0)}" y="${L.gy}" width="${f1(bw)}" height="${L.gh}" style="fill:${sel?'var(--brand-soft)':'transparent'}"/>`;
      ser.forEach((k,j)=>{const v=WH_AGE[k][i],w=(bw-8)/ser.length,x=x0+4+j*w;
        if(v==null){s+=`<line x1="${f1(x+w/2)}" x2="${f1(x+w/2)}" y1="${f1(L.gy+L.gh-14)}" y2="${f1(L.gy+L.gh-2)}" style="stroke:${WH_ATXT.col[k]};stroke-width:1.4;stroke-dasharray:2 2"/>`;return}
        s+=`<rect x="${f1(x)}" y="${f1(Y(v))}" width="${f1(w-1)}" height="${f1(L.gy+L.gh-Y(v))}" rx="2" style="fill:${WH_ATXT.col[k]}"/>`;
        if(sel&&!N&&ser.length===1)s+=`<text x="${f1(x+w/2)}" y="${f1(Y(v)-4)}" class="t-xs t-mid" style="fill:var(--ink)">${v}</text>`});
      s+=`</g>`;
      if(!N||i%2===0)s+=`<text x="${f1(x0+bw/2)}" y="${L.gy+L.gh+14}" class="t-xs t-mid">${N?b.split('–')[0]:b}</text>`});
    s+=`<text x="${L.gx+L.gw}" y="${L.gy+L.gh+30}" class="t-xs t-end">${WH_ATXT.xl}</text>`;
    /* icon arrays */
    const k=ser.length,gap=16,cell=Math.min((L.iw-(k-1)*gap)/k/10,L.ih/11.2);
    const rd=[];
    ser.forEach((key,j)=>{const v=WH_AGE[key][ai],ox=L.ix+j*(cell*10+gap),oy=L.iy+18;
      if(v==null){const w=wrapT(ox,oy+20,WH_ATXT.noneLong,Math.floor(cell*10/6.5),{cls:'t-sm'});s+=`<text x="${f1(ox)}" y="${f1(oy-4)}" class="t-lbl" style="fill:${WH_ATXT.col[key]}">${WH_ATXT.who[key]}</text>`+w.svg;rd.push(`${WH_ATXT.who[key]} ${band}: ${WH_ATXT.none}`);return}
      const n=Math.round(v);
      s+=`<text x="${f1(ox)}" y="${f1(oy-4)}" class="t-lbl" style="fill:${WH_ATXT.col[key]}">${WH_ATXT.arr(WH_ATXT.who[key],n)}</text>`;
      for(let q=0;q<100;q++){const cx=ox+(q%10+.5)*cell,cy=oy+(Math.floor(q/10)+.5)*cell*1.1,on=q<n,c=on?WH_ATXT.col[key]:'var(--line)';
        s+=`<circle cx="${f1(cx)}" cy="${f1(cy-cell*.22)}" r="${f1(cell*.16)}" style="fill:${c}"/><rect x="${f1(cx-cell*.2)}" y="${f1(cy-cell*.04)}" width="${f1(cell*.4)}" height="${f1(cell*.4)}" rx="${f1(cell*.12)}" style="fill:${c}"/>`}
      rd.push(WH_ATXT.read(WH_ATXT.who[key],band,v,n))});
    as.innerHTML=s;$('#whAgeV').textContent=WH_ATXT.years(band);ar.setAttribute('aria-valuetext',WH_ATXT.years(band));
    $('#whAgeRead').innerHTML=rd.map(x=>`<span>${x}</span>`).join('');$('#whAgeNote').innerHTML=noteHTML(WH_ATXT.note(band));
  }
  ar.addEventListener('input',drawAge);
  as.addEventListener('click',e=>{const g=e.target.closest('[data-ab]');if(!g)return;ar.value=g.dataset.ab;drawAge()});
  $('#whSex').addEventListener('click',e=>{const b=e.target.closest('[data-sex]');if(!b)return;sex=b.dataset.sex;
    $$('#whSex [data-sex]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawAge()});
  drawAge();
  const prev=redraws.what;redraws.what=()=>{prev&&prev();drawMap(1);drawAge()};
};
const WH_LEG={world:'world',highest:'highest reported',lowest:'lowest reported'};
