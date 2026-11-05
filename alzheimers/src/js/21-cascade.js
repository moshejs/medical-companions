
/* =============== 2.1 cascade: twenty years before symptoms =============== */
const CA_SIG=(x,m,k)=>1/(1+Math.exp(-(x-m)/k));
/* dominant: onset years y0 are DIAN's measured values; k (steepness) is schematic.
   The curve is placed so it leaves baseline (5%) at the measured onset. */
const CA_DOM=[
 {n:1,l:'CSF Aβ42 (falls)',y0:-25,k:2.2,c:'var(--amber)',d:'7 4',w:2.6},
 {n:2,l:'Amyloid PET',y0:-15,k:2.0,c:'var(--amber)',d:'',w:3},
 {n:3,l:'CSF tau (rises)',y0:-15,k:2.6,c:'var(--rose)',d:'',w:3},
 {n:4,l:'MRI atrophy',y0:-15,k:3.2,c:'var(--ink)',d:'',w:2},
 {n:5,l:'FDG-PET (glucose use)',y0:-10,k:2.2,c:'var(--ink)',d:'5 4',w:2},
 {n:6,l:'Cognition',y0:-10,k:3.0,c:'var(--violet)',d:'',w:3.6,sub:'memory −10, global −5'}].map(c=>({...c,m:c.y0+2.94*c.k}));
const CA_SPO=[
 {n:1,l:'Amyloid',f:u=>CA_SIG(u,.28,.05),c:'var(--amber)',d:'',w:3,sub:'CSF, PET, blood; first',m:.28},
 {n:2,l:'Tau',f:u=>.07*ramp(u,.02,.3)+.93*CA_SIG(u,.5,.05),c:'var(--rose)',d:'',w:3,sub:'CSF, PET; low, then faster',m:.5},
 {n:3,l:'Neurodegeneration',f:u=>CA_SIG(u,.6,.055),c:'var(--ink)',d:'',w:2.2,sub:'MRI, FDG; tracks symptoms',m:.6},
 {n:4,l:'Cognition (solid)',f:u=>CA_SIG(u,.72,.05),c:'var(--violet)',d:'',w:3.6,sub:'higher risk',m:.72},
 {n:5,l:'Cognition (dashed)',f:u=>CA_SIG(u,.84,.05),c:'var(--violet)',d:'7 5',w:3.6,sub:'more reserve, later decline',m:.84}];
const CA_STEPS=[
 {from:0,at:.04,t:'The silent years',
  dom:{k:'Dominantly inherited · −30 years',txt:'This view follows carriers of an APP, PSEN1 or PSEN2 mutation. Time is counted from the age their parent first had symptoms, the "expected onset". At −30 years the measures are still normal. The DIAN analysis placed 128 participants on this clock. [[Bateman2012]]',
   pt:'In families with a dominant gene, a parent\'s age at first symptoms lets researchers line everyone up on one clock.'},
  spo:{k:'Sporadic · schematic',txt:'In late-onset Alzheimer\'s there is no parent\'s age to anchor a clock, so the curves follow Jack\'s hypothetical model and carry no years. Amyloid is common without symptoms: among 7,583 people without dementia from 55 studies, amyloid positivity in cognitively normal people rose from 10% at 50 to 44% at 90. [[Jack2010,Jansen2015]]',
   pt:'For most people we cannot say exactly when changes began. The shape shows the usual order, not a timetable.'}},
 {from:.1,at:.2,t:'Amyloid first',
  dom:{k:'DIAN · −25 to −15 years',txt:'CSF amyloid β42 begins to fall about 25 years before expected onset as amyloid starts to deposit; amyloid PET becomes detectable about 15 years before. Longitudinal data from 217 people confirmed that amyloid measures change first. [[Bateman2012,McDade2018]]',
   pt:'The first sign is in the spinal fluid: amyloid drops there because it is getting stuck in the brain.',
   hook:'Low CSF Aβ42 = amyloid deposited in the brain (it is trapped in plaques, so less reaches the fluid). In DIAN it is the earliest change, at −25 years.'},
  spo:{k:'Sporadic · amyloid',txt:'In the 2010 model amyloid markers turn abnormal first, falling CSF Aβ42 and rising amyloid PET, while people are cognitively normal. APOE ε4 carriers had 2–3 times the amyloid prevalence of non-carriers; the strip at the bottom shows the age at which 15% of cognitively normal people were amyloid-positive. [[Jack2010,Jansen2015]]',
   pt:'Amyloid builds up first, often for many years, without any symptoms.'}},
 {from:.36,at:.44,t:'Tau and nerve-cell damage',
  dom:{k:'DIAN · −15 to −10 years',txt:'CSF tau rises and brain atrophy appears about 15 years before expected onset; glucose use on FDG-PET falls about 10 years before. In longitudinal data, metabolism declined about 7–10 years after amyloid, and the CSF tau timing differed from the cross-sectional estimate by more than 10 years. [[Bateman2012,McDade2018]]',
   pt:'Next, tau spreads and nerve cells start to struggle and shrink. Still no symptoms.'},
  spo:{k:'Sporadic · tau and neurodegeneration',txt:'The 2013 update proposed that in sporadic Alzheimer\'s, tau may start on its own in limbic and brainstem regions, and that amyloid then speeds it up. Neurodegeneration follows: rising CSF tau, atrophy on MRI and falling FDG uptake, which track symptom severity. [[Jack2013,Jack2010]]',
   pt:'Tau can be present early at low levels. Amyloid seems to make it spread faster.'}},
 {from:.5,at:.62,t:'Memory begins to slip',
  dom:{k:'DIAN · −10 to −5 years',txt:'Episodic memory impairment appears about 10 years before expected onset and global measures (MMSE, CDR) about 5 years before. In the Colombian PSEN1 E280A kindred, median ages were 44 for MCI and 49 for dementia. [[Bateman2012,AcostaBaena2011]]',
   pt:'Small memory changes show up years before anyone would call it dementia.'},
  spo:{k:'Sporadic · cognition',txt:'The 2013 update added person-to-person variation: with the same pathology, people with more reserve decline later (dashed) than people at higher risk (solid). For someone with preclinical Alzheimer\'s at 70, modelling across 6 cohorts estimated about 10 years preclinical and 4 with MCI. [[Jack2013,Vermunt2019]]',
   pt:'Two people with the same brain changes can show symptoms years apart.'}},
 {from:.84,at:.88,t:'Dementia',
  dom:{k:'DIAN · +3 years',txt:'On average, people met dementia criteria 3 years after their expected onset. [[Bateman2012]]',
   pt:'Dementia was diagnosed, on average, a few years after the age the parent had first shown symptoms.',
   hook:'DIAN order: CSF Aβ42 −25 → amyloid PET, CSF tau, atrophy −15 → FDG and episodic memory −10 → global cognition −5 → dementia +3.'},
  spo:{k:'Sporadic · dementia',txt:'Jansen and colleagues inferred an interval of about 20–30 years between first amyloid positivity and dementia. In the 70-year-old modelled above, about 6 years were spent with dementia. [[Jansen2015,Vermunt2019]]',
   pt:'From the first amyloid build-up to dementia can take two to three decades.',
   hook:'Jack model order: amyloid (CSF Aβ42, then PET) → tau → neurodegeneration (MRI, FDG) → cognition. Neurodegeneration tracks symptom severity; amyloid does not.'}},
 {from:.94,at:.98,t:'Measured or drawn?',
  dom:{k:'Reading the chart',txt:'Measured: the years on the top row, all cross-sectional DIAN estimates. Drawn: the shape of every curve between them. The authors caution the results may not apply to late-onset Alzheimer\'s, and longitudinal data showed CSF p-tau181 falling near symptom onset, which a rising curve does not show. [[Bateman2012,McDade2018]]',
   pt:'The years are real measurements. The smooth curves are a sketch to show the order.'},
  spo:{k:'Reading the chart',txt:'Measured: amyloid positivity at ages 50 and 90 and the APOE ages, all cross-sectional. Drawn: every curve above, and the straight lines between measured end points. The 2013 update itself changed the order of some biomarkers, so the order is a model, not a law. [[Jansen2015,Jack2013]]',
   pt:'Only the lower chart holds measured numbers. The top curves are a sketch of the usual order.'}}];
const CA_CLI=['gene carrier, tests normal','no symptoms','subtle decline','impaired, early','mild dementia','moderate dementia','severe dementia'];
const CA_CLI_S=['gene, tests normal','no symptoms','subtle decline','impaired, early','mild dementia','moderate dementia','severe dementia'];
const CA_PRE=[['No symptoms, amyloid only',1,0,1],['Gene carrier, tests normal',0,0,0],['Subtle decline, temporal tau',1,1,2],['MCI-like, amyloid only',1,0,3],['Mild dementia, high tau',1,3,4],['Memory problems, biomarkers normal',0,0,3]];
inits.cascade=()=>{
  const svg=$('#caSvg'),rg=$('#caT');let dom=true,lastN='';
  function draw(t){
    const N=vb(svg,dom?'720 300':'720 540',dom?'400 452':'400 744');
    const L=N?{x0:40,x1:388,yT:64,yB:270,tick:26,bd:40,ph:56,axl:286,axt:304,lg:i=>[i%2?206:16,330+Math.floor(i/2)*34],lgw:'n'}
             :{x0:60,x1:520,yT:64,yB:250,tick:30,bd:44,ph:58,axl:266,axt:286,lg:i=>[540,40+i*30],lgw:'w'};
    const X=u=>lerp(L.x0,L.x1,u),V=v=>lerp(L.yB,L.yT,v);
    const yr=-30+38*t, uOf=y=>(y+30)/38;
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    s+=`<rect x="${L.x0}" y="${L.yT}" width="${L.x1-L.x0}" height="${L.yB-L.yT}" style="fill:var(--panel)"/>`;
    s+=`<text transform="translate(${N?14:24} ${(L.yT+L.yB)/2}) rotate(-90)" class="t-xs t-mid">abnormality · shape schematic</text>`;
    const C=dom?CA_DOM:CA_SPO,val=dom?(c,u)=>CA_SIG(-30+38*u,c.m,c.k):(c,u)=>c.f(u);
    if(dom){
      // measured onset years on the top row
      const MY=[[-25,[1]],[-15,[2,3,4]],[-10,[5,6]],[-5,[6]],[3,[]]];
      s+=`<text x="${N?4:8}" y="${L.tick}" class="t-xs" style="fill:var(--ink)">measured</text>`;
      MY.forEach(([y,ns])=>{const x=X(uOf(y)),on=yr>=y;
        s+=`<path d="M${f1(x)} ${L.yT} V${L.yB}" style="stroke:${y===3?'var(--rose)':'var(--muted)'};stroke-width:${y===3?1.6:1};stroke-dasharray:${y===3?'6 4':'2 4'}"/>`;
        const lab=y===3?'+3 dementia':y===-5?'−5 global':'−'+(-y);
        s+=`<text x="${f1(x)}" y="${L.tick}" class="t-xs t-mid" style="fill:var(--ink);font-weight:${on?700:500}">${lab}</text>`;
        ns.forEach((n,j)=>{const bx=x+(j-(ns.length-1)/2)*(N?13:15),c=C[n-1];
          s+=`<circle cx="${f1(bx)}" cy="${L.bd}" r="${N?6:7}" style="fill:${on?'var(--panel)':'var(--field)'};stroke:${c.c};stroke-width:${on?2:1};opacity:${on?1:.45}"/><text x="${f1(bx)}" y="${L.bd+3.5}" class="t-xs t-mid" style="fill:var(--ink);opacity:${on?1:.45}">${n}</text>`});
      });
      s+=`<path d="M${f1(X(uOf(0)))} ${L.yB} v6" style="stroke:var(--ink);stroke-width:2"/>`;
      for(let y=-30;y<=5;y+=5)s+=`<text x="${f1(X(uOf(y)))}" y="${L.axl}" class="t-xs t-mid" style="${y===0?'fill:var(--ink);font-weight:700':''}">${y>0?'+'+y:y===0?'0':'−'+(-y)}</text>`;
      s+=`<text x="${(L.x0+L.x1)/2}" y="${L.axt}" class="t-xs t-mid">${N?'years from expected onset (DIAN)':'years from expected symptom onset (0 = parent\'s age at onset) · DIAN'}</text>`;
    }else{
      const th=V(.1);
      s+=`<path d="M${L.x0} ${f1(th)} H${L.x1}" style="stroke:var(--muted);stroke-dasharray:3 3"/><text x="${L.x0+4}" y="${f1(th-4)}" class="t-xs">threshold</text>`;
      const a=X(.17),b=X(.72),bo=ramp(t,.6,.7);
      s+=`<g style="opacity:${f1(Math.max(.3,bo))}"><path d="M${f1(a)} ${L.bd+4} v-8 H${f1(b)} v8" style="fill:none;stroke:var(--ink);stroke-width:1.4"/><text x="${f1((a+b)/2)}" y="${L.bd-8}" class="t-xs t-mid" style="fill:var(--ink)">${N?'≈20–30 y to dementia (inferred)':'about 20–30 years from amyloid-positive to dementia (inferred)'}</text></g>`;
      s+=`<text x="${(L.x0+L.x1)/2}" y="${L.axl}" class="t-xs t-mid">time → (schematic, no years)</text>`;
    }
    // curves: whole shape faint, drawn part solid up to the playhead
    C.forEach(c=>{const fn=u=>val(c,u);
      s+=`<path d="${pathFn(fn,L.x0,L.x1,L.yB,L.yT,140)}" style="fill:none;stroke:${c.c};stroke-width:${c.w};stroke-dasharray:${c.d||'none'};opacity:.16"/>`;
      if(t>0.004)s+=`<path d="${pathFn(u=>fn(u*t),L.x0,X(t),L.yB,L.yT,Math.max(4,Math.round(140*t)))}" style="fill:none;stroke:${c.c};stroke-width:${c.w};stroke-dasharray:${c.d||'none'};stroke-linecap:round"/>`;
      const v=fn(t);s+=`<circle cx="${f1(X(t))}" cy="${f1(V(v))}" r="3.5" style="fill:${c.c}"/>`;
      // number badge at the curve's half-way point, once the playhead passes it
      const um=dom?uOf(c.m):c.m;
      if(t>=um){s+=`<circle cx="${f1(X(um))}" cy="${f1(V(.5))}" r="${N?6.5:7.5}" style="fill:var(--panel);stroke:${c.c};stroke-width:2"/><text x="${f1(X(um))}" y="${f1(V(.5)+3.5)}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">${c.n}</text>`}});
    // playhead
    s+=`<path d="M${f1(X(t))} ${L.yT-2} V${L.yB}" style="stroke:var(--ink);stroke-width:1.5"/><text x="${f1(clamp(X(t),L.x0+30,L.x1-30))}" y="${L.ph}" class="t-xs t-mid" style="fill:var(--ink)">${dom?'now '+(yr>=0?'+':'')+Math.round(yr)+' y':'now'}</text>`;
    // legend
    C.forEach((c,i)=>{const [x,y]=L.lg(i);
      s+=`<path d="M${x} ${y-4} h22" style="stroke:${c.c};stroke-width:${c.w};stroke-dasharray:${c.d||'none'}"/><text x="${x+28}" y="${y}" class="t-sm" style="fill:var(--ink)">${c.n} ${c.l}</text>`;
      s+=`<text x="${x+28}" y="${y+13}" class="t-xs">${dom?(c.sub||'abnormal from −'+(-c.y0)+' y'):c.sub}</text>`});
    if(dom){const [x,y]=L.lg(6);s+=`<path d="M${x} ${y-4} h22" style="stroke:var(--rose);stroke-width:1.6;stroke-dasharray:6 4"/><text x="${x+28}" y="${y}" class="t-sm" style="fill:var(--ink)">dementia criteria met</text><text x="${x+28}" y="${y+13}" class="t-xs">+3 y (measured)</text>`}
    else{const [x,y]=L.lg(5);s+=`<path d="M${x} ${y-4} h22" style="stroke:var(--muted);stroke-dasharray:3 3"/><text x="${x+28}" y="${y}" class="t-sm" style="fill:var(--ink)">detection threshold</text><text x="${x+28}" y="${y+13}" class="t-xs">below it, tests read normal</text>`}
    // sporadic: measured amyloid positivity by age (Jansen 2015)
    if(!dom){const I=N?{y0:466,y1:586,tk:600,tt:616,ti:452,lg:[16,638],st:692,sl:714}:{y0:320,y1:440,tk:456,tt:472,ti:306,lg:[540,330],st:494,sl:516};
      const AX=a=>lerp(L.x0,L.x1,(a-40)/55),AY=p=>lerp(I.y1,I.y0,p/80),age=lerp(50,90,t);
      s+=`<text x="${L.x0}" y="${I.ti}" class="t-sm">AMYLOID-POSITIVE BY AGE · MEASURED</text>`;
      s+=`<rect x="${L.x0}" y="${I.y0}" width="${L.x1-L.x0}" height="${I.y1-I.y0}" style="fill:var(--panel)"/>`;
      [0,20,40,60,80].forEach(p=>{s+=`<path d="M${L.x0} ${f1(AY(p))} H${L.x1}" class="grid"/><text x="${L.x0-4}" y="${f1(AY(p)+3)}" class="t-xs t-end">${p}%</text>`});
      [40,50,60,70,80,90].forEach(a=>{s+=`<text x="${f1(AX(a))}" y="${I.tk}" class="t-xs t-mid">${a}</text>`});
      s+=`<text x="${(L.x0+L.x1)/2}" y="${I.tt}" class="t-xs t-mid">age (years) · cross-sectional meta-analysis</text>`;
      [['normal',10,44,'var(--sage)'],['MCI',27,71,'var(--violet)']].forEach(([l,a,b,c])=>{
        s+=`<path d="M${f1(AX(50))} ${f1(AY(a))} L${f1(AX(90))} ${f1(AY(b))}" style="stroke:${c};stroke-width:2.4;stroke-dasharray:6 4"/>`;
        [[50,a],[90,b]].forEach(([x,v])=>{s+=`<circle cx="${f1(AX(x))}" cy="${f1(AY(v))}" r="5" style="fill:${c}"/><text x="${f1(AX(x)+(x===50?-8:8))}" y="${f1(AY(v)-7)}" class="t-xs ${x===50?'t-end':''}" style="fill:var(--ink)">${v}%</text>`})});
      s+=`<path d="M${f1(AX(age))} ${I.y0} V${I.y1}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:2 3"/><text x="${f1(AX(age))}" y="${I.y0-4}" class="t-xs t-mid" style="fill:var(--ink)">age ${Math.round(age)}</text>`;
      const LG=N?[[0,'— normal cognition: 10% at 50, 44% at 90'],[16,'— MCI: 27% at 50, 71% at 90'],[30,'dashed lines between end points: schematic']]
                :[[0,'MEASURED END POINTS'],[20,'— normal cognition'],[33,'  10% at 50, 44% at 90'],[53,'— MCI'],[66,'  27% at 50, 71% at 90'],[90,'dashed lines between'],[103,'end points: schematic']];
      LG.forEach(([dy,l],i)=>{const col=l.includes('MCI')?'var(--violet)':l.includes('normal')?'var(--sage)':'var(--muted)';s+=`<text x="${I.lg[0]}" y="${I.lg[1]+dy}" class="${!N&&i===0?'t-sm':'t-xs'}" style="fill:${col};white-space:pre">${l}</text>`});
      // APOE strip: age at which 15% of cognitively normal people were amyloid-positive
      s+=`<text x="${N?16:L.x0}" y="${I.st}" class="t-xs" style="fill:var(--ink)">${N?'Age when 15% are amyloid-positive, by APOE':'Age at which 15% of cognitively normal people were amyloid-positive, by APOE genotype'}</text>`;
      s+=`<path d="M${L.x0} ${I.sl} H${L.x1}" class="axis" style="stroke:var(--muted)"/>`;
      [['ε4/ε4',40,1,'s'],['ε2/ε4',50,0,'m'],['ε3/ε4',55,1,'m'],['ε3/ε3',65,0,'m'],['ε2/ε3',95,1,'e']].forEach(([g,a,up,an])=>{const x=AX(a);
        s+=`<circle cx="${f1(x)}" cy="${I.sl}" r="5" style="fill:var(--amber)"/><text x="${f1(x)}" y="${up?I.sl-9:I.sl+17}" class="t-xs ${an==='m'?'t-mid':an==='e'?'t-end':''}" style="fill:var(--ink)">${g} · ${a}</text>`});
    }
    svg.innerHTML=s;
    const p=phaseOf(CA_STEPS,t);setSt(p);
    const st=CA_STEPS[p],S={...st[dom?'dom':'spo'],t:st.t};
    const ab=dom?C.filter(c=>yr>=c.y0).map(c=>c.l.replace(/ \(.*\)/,'')):C.filter(c=>c.f(t)>.1).map(c=>c.l.replace(/ \(.*\)/,''));
    const rd=`${dom?'Clock <b>'+(yr>=0?'+':'')+Math.round(yr)+' years</b> · ':''}Abnormal now: <b>${ab.length?ab.join(', '):'nothing yet'}</b>${dom&&yr>=3?' · <b>dementia criteria met</b>':''}`;
    $('#caRead').innerHTML=rd;
    const html=noteHTML(S)+`<p class="readout">${rd}</p>`;if(html!==lastN){$('#caNote').innerHTML=html;lastN=html}
    $('#caCap').textContent=dom?'Measured: the onset years on the top row and the +3 dementia line (DIAN, cross-sectional). Schematic: every curve shape.':'Schematic: every curve in the top chart. Measured: the end points and APOE ages in the lower chart (Jansen 2015, cross-sectional).';
  }
  const stop=playWire(rg,$('#caPlay'),draw,18000,'Replay','cascade');
  const setSt=stepWire($('#caSteps'),CA_STEPS,rg,draw,stop);
  const setDom=v=>{dom=v;$('#caDom').setAttribute('aria-pressed',v);$('#caSpo').setAttribute('aria-pressed',!v);lastN='';draw(+rg.value)};
  $('#caDom').onclick=()=>setDom(true);$('#caSpo').onclick=()=>setDom(false);

  /* ---------------- 2024 staging map ---------------- */
  const msv=$('#caMap');let amy=1,tau=0,cli=1,ring=null,stopR=null;
  $('#caPre').insertAdjacentHTML('beforeend',CA_PRE.map((p,i)=>`<button class="btn" data-pre="${i}">${p[0]}</button>`).join(''));
  $('#caAmy').insertAdjacentHTML('beforeend',['Normal','Abnormal'].map((l,i)=>`<button class="btn" data-amy="${i}" aria-pressed="${i===amy}">${l}</button>`).join(''));
  $('#caTau').insertAdjacentHTML('beforeend',['None','Medial temporal','Moderate neocortical','High neocortical'].map((l,i)=>`<button class="btn" data-tau="${i}" aria-pressed="${i===tau}">${l}</button>`).join(''));
  $('#caCli').insertAdjacentHTML('beforeend',CA_CLI.map((l,i)=>`<button class="btn" data-cli="${i}" aria-pressed="${i===cli}" aria-label="Clinical stage ${i}: ${l}">${i} · ${l}</button>`).join(''));
  const state=()=>{const bio=amy?['A','B','C','D'][tau]:(tau?'nonAD':'none');const col=amy?tau+1:0;const ec=amy&&cli===0?1:cli;return{bio,col,ec}};
  function drawM(){
    const N=vb(msv,'720 340','400 360'),{bio,col,ec}=state();
    const L=N?{x0:74,cw:64,top:50,rh:42,hl:22,hs:36,rl:66}:{x0:170,cw:104,top:64,rh:38,hl:24,hs:40,rl:160};
    const CX=c=>L.x0+c*L.cw+L.cw/2,RY=r=>L.top+r*L.rh+L.rh/2;
    let s=`<defs><pattern id="caHatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0 V6" style="stroke:var(--line);stroke-width:2"/></pattern></defs><rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    const HD=N?[['–','none'],['A','amyloid'],['B','MTL tau'],['C','mod. tau'],['D','high tau']]
              :[['–','no AD','biomarker'],['A','amyloid +,','no tau PET'],['B','tau: medial','temporal'],['C','moderate','neocortical tau'],['D','high','neocortical tau']];
    HD.forEach((h,c)=>{s+=`<text x="${CX(c)}" y="${L.hl}" class="t-big t-mid">${h[0]}</text><text x="${CX(c)}" y="${L.hs}" class="t-xs t-mid">${h[1]}</text>${h[2]?`<text x="${CX(c)}" y="${L.hs+12}" class="t-xs t-mid">${h[2]}</text>`:''}`});
    if(!N)s+=`<text x="${L.rl}" y="${L.hl}" class="t-xs t-end">biological →</text><text x="${L.rl}" y="${L.hs+12}" class="t-xs t-end">clinical ↓</text>`;
    const diag={1:1,2:2,3:3,4:4,5:4,6:4};
    for(let r=0;r<7;r++){s+=`<text x="${L.rl}" y="${RY(r)+4}" class="t-xs t-end" style="fill:${r===ec?'var(--ink)':'var(--muted)'};font-weight:${r===ec?700:500}">${N?'Stage '+r:r+' · '+CA_CLI_S[r]}</text>`;
      for(let c=0;c<5;c++){const x=L.x0+c*L.cw,y=L.top+r*L.rh,dg=diag[r]===c,hat=c===0&&r>0,st0=c===0&&r===0;
        s+=`<rect x="${x}" y="${y}" width="${L.cw}" height="${L.rh}" style="fill:${dg?'var(--sage-soft)':hat?'url(#caHatch)':'var(--panel)'};stroke:var(--line)"/>`;
        if(dg||st0)s+=`<text x="${x+L.cw/2}" y="${y+L.rh/2+4}" class="t-xs t-mid" style="fill:var(--sage)">${st0?'0':r+['','A','B','C','D'][c]}</text>`}}
    s+=`<path d="M${CX(1)} ${RY(1)} L${CX(2)} ${RY(2)} L${CX(3)} ${RY(3)} L${CX(4)} ${RY(4)} L${CX(4)} ${RY(6)}" style="fill:none;stroke:var(--sage);stroke-width:1.5;stroke-dasharray:4 4;opacity:.7"/>`;
    const tgt=[CX(col),RY(ec)];if(!ring)ring=tgt;
    const code=bio==='none'?(ec===0?'0':'—'):bio==='nonAD'?'A−T+':ec+bio;
    s+=`<rect x="${f1(ring[0]-L.cw/2+3)}" y="${f1(ring[1]-L.rh/2+3)}" width="${L.cw-6}" height="${L.rh-6}" rx="8" style="fill:var(--rose-soft);stroke:var(--rose);stroke-width:3"/><text x="${f1(ring[0])}" y="${f1(ring[1]+5)}" class="t-lbl t-mid" style="fill:var(--rose)">${code}</text>`;
    msv.innerHTML=s;
  }
  function noteM(){
    const {bio,col,ec}=state();let k,t,aa,iwg,off='';
    const HR={A:'1.5',B:'5.6',C:'39.9',D:'39.9'};
    if(bio==='none'&&cli===0){k='Clinical stage 0';t='Stage 0: a gene, nothing measurable yet';
      aa='Stage 0 is for an asymptomatic carrier of a deterministic gene whose biomarkers are still normal, for example a young PSEN1 carrier. [[Jack2024]]';
      iwg='The IWG summary used here does not say how it labels gene carriers with normal biomarkers. [[Dubois2024]]'}
    else if(bio==='none'){k='No Core 1 biomarker abnormal';t='Not Alzheimer\'s by these criteria';
      aa='With no Core 1 biomarker abnormal, the 2024 criteria would not diagnose Alzheimer\'s disease; symptoms would point to looking for other causes. [[Jack2024]] See <a href="#ddx" data-go="ddx">The differential</a>.';
      iwg='Without AD biomarkers, not Alzheimer\'s disease either. [[Dubois2024]]'}
    else if(bio==='nonAD'){k='Amyloid normal, tau abnormal';t='A−T+: not on the Alzheimer\'s continuum';
      aa='Biological staging A to D starts with abnormal amyloid. The 2018 framework called amyloid-normal, tau-abnormal profiles "non-Alzheimer\'s pathologic change". [[Jack2018,Jack2024]]';
      iwg='Not Alzheimer\'s disease on these biomarkers. [[Dubois2024]]'}
    else{k='Integrated stage '+ec+bio;t=ec<=1?'Biomarkers only, no symptoms':ec===2?'Subtle decline with biomarkers':'Symptoms with Alzheimer\'s biomarkers';
      aa=`Alzheimer\'s disease, integrated stage ${ec}${bio}. One abnormal Core 1 result is enough for the diagnosis. [[Jack2024]]`+(cli===0?' Stage 0 needs normal biomarkers, so with abnormal amyloid this person is clinical stage 1.':'');
      if(ec===1)aa+=` For unimpaired people, the hazard of progressing to dementia against A−T− was 1.5 for stage A, 5.6 for medial temporal tau and 39.9 for neocortical tau; this person\'s stage carries <b>${HR[bio]}</b>. The workgroup still recommends against diagnostic testing of unimpaired people outside research. [[Jack2024]]`;
      iwg=ec<=1&&bio==='A'?'"At risk for Alzheimer\'s disease", not AD. Amyloid-only and most other biomarker-positive, cognitively normal people should be called at risk; "presymptomatic AD" is kept for specific patterns showing symptoms are near. [[Dubois2024]]'
        :ec<=1?'Usually "at risk for Alzheimer\'s disease". The IWG keeps "presymptomatic AD" for specific biomarker patterns showing symptoms are near; the summary used here does not list which patterns qualify, so this person could fall under either label. [[Dubois2024]]'
        :ec===2?'Subtle decline sits at the border. The IWG summary used here does not say exactly how it would label this stage. [[Dubois2024]]'
        :'Symptoms plus Alzheimer\'s biomarkers fit the IWG\'s clinical-biological definition of Alzheimer\'s disease. [[Dubois2024]]';
      const exp={1:1,2:2,3:3,4:4,5:4,6:4}[ec];
      if(col<exp)off='Off the diagonal: symptoms are worse than the biology predicts. The workgroup notes such people often have co-pathology. [[Jack2024]] In a memory-clinic pilot this was true of 34.7%. [[Lu2024]]';
      else if(col>exp)off='Off the diagonal: doing better than the biology predicts, which may reflect cognitive reserve or resilience. [[Jack2024]] In a memory-clinic pilot this was true of 8.8%. [[Lu2024]]';
      else off='On the expected diagonal. In a memory-clinic pilot, clinical and biological stages matched in 56.5% of people. [[Lu2024]]'}
    $('#caMapNote').innerHTML=`<div class="kicker">${k}</div><h4>${t}</h4><div class="ca-two"><p class="aa"><b>Alzheimer\'s Association 2024.</b> ${aa}</p><p class="iwg"><b>IWG 2024.</b> ${iwg}</p></div>${off?`<p>${off}</p>`:''}<p><b>Where they agree:</b> both accept the same biomarkers and both advise against routine testing of people without symptoms outside research. They differ on the label, not the biology. [[Jack2024,Dubois2024]]</p><div class="pt"><b>In plain words</b>Two expert groups read the same test results. One says a person with amyloid but no symptoms has Alzheimer\'s disease at an early stage; the other says that person is at risk.</div><div class="hook"><b>Exam hook</b>2024 AA: biological (A–D by tau PET spread) × clinical (0–6), e.g. "2B". IWG 2024: biomarker-positive but cognitively normal = "at risk", not AD.</div>`;
  }
  function setM(a,ta,c){const from=ring;amy=a;tau=ta;cli=c;
    $$('[data-amy]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.amy===amy));
    $$('[data-tau]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.tau===tau));
    $$('[data-cli]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.cli===cli));
    noteM();ring=null;drawM();const to=ring;
    if(from&&to&&stopR==null){ring=from;stopR=animate(450,p=>{const e=ease(p);ring=[lerp(from[0],to[0],e),lerp(from[1],to[1],e)];drawM()},()=>{stopR=null;ring=null;drawM()})}
    else{if(stopR){stopR();stopR=null}ring=null;drawM()}}
  $('#m-cascade .ca-pick').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
    if(b.dataset.pre!=null){const P=CA_PRE[+b.dataset.pre];setM(P[1],P[2],P[3])}
    else if(b.dataset.amy!=null)setM(+b.dataset.amy,tau,cli);
    else if(b.dataset.tau!=null)setM(amy,+b.dataset.tau,cli);
    else if(b.dataset.cli!=null)setM(amy,tau,+b.dataset.cli)});
  const prevR=redraws.cascade;redraws.cascade=()=>{prevR&&prevR();ring=null;drawM()};
  noteM();drawM();draw(+rg.value);
};
