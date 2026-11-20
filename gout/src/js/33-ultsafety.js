/* =============== 3.3 safety of urate-lowering drugs =============== */
const US_GRP={
 all:{n:'All starters',p:null,
  txt:'In 400,401 new allopurinol users in US Medicaid, 1 in 1972 was hospitalised with a severe cutaneous adverse reaction; the mean stay was 9.6 days and 21% (43/203) died. [[Keller2018]] About 90% of hypersensitivity reactions begin within 60 days of starting. [[Ramasamy2013]] Pick a group to see how common the HLA-B*58:01 allele is.',
  pt:'Out of about two thousand people who start allopurinol, one ends up in hospital with a severe skin reaction.'},
 ea:{n:'Han Chinese, Korean, Thai',p:.074,src:'ACR 2020',
  txt:'ACR 2020 quotes an HLA-B*58:01 prevalence of 7.4% in Han Chinese, Korean and Thai people and conditionally recommends testing before allopurinol in people of Southeast Asian descent. [[FitzGerald2020]] Asian people had about 3 times the risk of white or Hispanic people in US Medicaid (RR 3.03). [[Keller2018]]',
  pt:'In this group, about 1 person in 14 carries the gene variant, and testing first is advised.'},
 aa:{n:'African American',p:.038,src:'ACR 2020',
  txt:'ACR 2020 quotes 3.8% in African Americans and conditionally recommends testing before allopurinol. [[FitzGerald2020]] Black people had RR 3.00 in US Medicaid. [[Keller2018]] CPIC\'s allele frequency for African American and Afro-Caribbean people is also 3.8%. [[CPIC-HLAB-Allopurinol]]',
  pt:'About 1 person in 26 carries the variant, and testing first is advised.'},
 wh:{n:'White and Hispanic',p:.007,src:'ACR 2020',
  txt:'ACR 2020 quotes 0.7% in white and Hispanic people and conditionally recommends against universal testing outside the groups it names. [[FitzGerald2020]] CPIC gives an allele frequency of 0.77% in Europeans and 1.4% in Latinos. [[CPIC-HLAB-Allopurinol]]',
  pt:'The variant is rare here, so routine testing is not advised; starting low and watching for a rash still apply.'},
 tw:{n:'Taiwan allopurinol candidates',p:.196,src:'Ko 2015',
  txt:'In Taiwan, 19.6% (571/2910) of Han Chinese allopurinol candidates tested positive. Carriers were given alternatives, and 2339 non-carriers took allopurinol: none developed a severe reaction, against 7 expected from the historical rate (P = 0.0026). Mild rash still occurred in 3%. [[Ko2015]]',
  pt:'Testing everyone first and steering carriers to another drug stopped the severe reactions in this study.'}
};
const US_TRV={
 rates:{t:'Event rates, febuxostat vs allopurinol',
  rows:[['CARES · cardiovascular death',1.5,1.1,'HR 1.34'],['CARES · all-cause death',2.6,2.2,'HR 1.22'],['FAST · primary endpoint (on treatment)',1.72,2.05,'HR 0.85']],mx:3,unit:' per 100 PY',
  txt:'From the US label\'s account of CARES: cardiovascular deaths 134 (1.5 per 100 patient-years) on febuxostat vs 100 (1.1), sudden cardiac death 83 (2.7%) vs 56 (1.8%), all-cause deaths 243 (2.6 per 100 PY) vs 199 (2.2). [[FDA-Uloric]] FAST\'s on-treatment primary endpoint: 1.72 vs 2.05 events per 100 patient-years. [[Mackenzie2020]]',
  pt:'In CARES, a few more people died on febuxostat. In FAST, slightly fewer did. The two trials point different ways.'},
 hr:{t:'Hazard ratios, febuxostat vs allopurinol',
  rows:[['CARES · major CV events',1.03,null,1.23],['CARES · cardiovascular death',1.34,1.03,1.73],['CARES · all-cause death',1.22,1.01,1.47],['FAST · primary endpoint',.85,.70,1.03]],
  txt:'CARES was non-inferior for its primary endpoint (HR 1.03; upper bound of the one-sided 98.5% CI 1.23, under the 1.3 margin), yet cardiovascular death (HR 1.34, 95% CI 1.03–1.73) and all-cause death (HR 1.22, 1.01–1.47) were higher. [[White2018]] FAST was non-inferior: adjusted HR 0.85 (0.70–1.03). [[Mackenzie2020]]',
  pt:'Right of the line means more events on febuxostat. CARES\'s death results sit just right of it; FAST sits left.'},
 fu:{t:'Stopping the drug and losing follow-up',
  rows:[['CARES · stopped trial drug (both arms)',56.6,null],['CARES · stopped follow-up (both arms)',45.0,null],['FAST · stopped randomised drug',32.4,16.5],['FAST · lost from all follow-up',6.2,5.5]],mx:70,unit:'%',
  txt:'In CARES, 56.6% stopped the trial drug and 45.0% stopped follow-up. [[White2018]] In FAST, the randomised drug was stopped by 32.4% on febuxostat vs 16.5% on allopurinol, but only 6.2% vs 5.5% were lost from all follow-up. [[Mackenzie2020]] FAST was open label and enrolled people already tolerating allopurinol. [[Mackenzie2020]]',
  pt:'Nearly half of CARES dropped out of follow-up, which makes its death figures harder to trust; FAST kept almost everyone.'}
};
inits.ultsafety=()=>{
  /* ---- the icon grid ---- */
  const gs=$('#usGrid');let grp='all',scr=false,stopG=null;
  const R=rng(58),PERM=Array.from({length:1972},(_,i)=>i);for(let i=PERM.length-1;i>0;i--){const j=Math.floor(R()*(i+1));[PERM[i],PERM[j]]=[PERM[j],PERM[i]]}
  function wrapT(txt,n){const ws=String(txt).split(' '),o=[];let l='';ws.forEach(w=>{if(l&&(l+' '+w).length>n){o.push(l);l=w}else l=l?l+' '+w:w});if(l)o.push(l);return o}
  function drawG(k){
    const N=vb(gs,'720 320','400 640'),G=US_GRP[grp];
    const cols=N?44:58,sp=N?8.4:7.6,ox=N?17:20,oy=N?44:40;
    const cnt=G.p==null?0:Math.round(1972*G.p),shown=Math.round(cnt*k),car=new Set(PERM.slice(0,shown)),cs=PERM[0];
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    s+=`<text x="${ox-4}" y="22" class="t-sm" style="fill:var(--bad)">1972 PEOPLE STARTING ALLOPURINOL</text><text x="${ox-4}" y="34" class="t-xs">${G.n}${G.p!=null?' · '+(G.p*100).toFixed(1)+'% carriers ('+G.src+')':''}</text>`;
    for(let i=0;i<1972;i++){if(i===cs)continue;const x=ox+(i%cols)*sp,y=oy+Math.floor(i/cols)*sp;
      if(car.has(i))s+=scr?`<circle cx="${f1(x)}" cy="${f1(y)}" r="2.5" style="fill:none;stroke:var(--sea);stroke-width:1.2"/>`:`<circle cx="${f1(x)}" cy="${f1(y)}" r="2.8" style="fill:var(--warn)"/>`;
      else s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="2.3" style="fill:var(--muted);opacity:.32"/>`}
    const cx=ox+(cs%cols)*sp,cy=oy+Math.floor(cs/cols)*sp,prevented=scr&&G.p!=null;
    s+=prevented?`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="7" style="fill:none;stroke:var(--sea);stroke-width:1.6;stroke-dasharray:3 2"/>`:`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="4.6" style="fill:var(--bad)"/><circle cx="${f1(cx)}" cy="${f1(cy)}" r="9" style="fill:none;stroke:var(--bad);stroke-width:1.4"/>`;
    // side or bottom panel
    const px=N?16:484;let py=N?oy+Math.ceil(1972/cols)*sp+20:56;
    const line=(t,c,cl='t-xs')=>{s+=`<text x="${px}" y="${f1(py)}" class="${cl}" style="fill:${c||'var(--ink)'}">${t}</text>`;py+=cl==='t-big'?22:15};
    line('1 in 1972','var(--bad)','t-big');
    wrapT('hospitalised with a severe skin reaction in US Medicaid; 21% of them died',N?58:36).forEach(l=>line(l));py+=6;
    const leg=(c,hol,t)=>{s+=hol?`<circle cx="${px+5}" cy="${f1(py-4)}" r="4" style="fill:none;stroke:${c};stroke-width:1.4"/>`:`<circle cx="${px+5}" cy="${f1(py-4)}" r="4" style="fill:${c}"/>`;s+=`<text x="${px+16}" y="${f1(py)}" class="t-xs" style="fill:var(--ink)">${t}</text>`;py+=16};
    leg(prevented?'var(--sea)':'var(--bad)',prevented,prevented?'the one case, schematically avoided':'the one hospitalised case');
    if(G.p!=null)leg(scr?'var(--sea)':'var(--warn)',scr,scr?'carrier, offered another drug':'HLA-B*58:01 carrier');
    leg('var(--muted)',false,'everyone else');py+=6;
    if(G.p!=null)line(`${cnt} carriers in 1972 people`,'var(--warn)','t-sm');
    if(scr&&G.p!=null){py+=4;wrapT('Taiwan, testing first: 0 severe reactions in 2339 non-carriers, against 7 expected (Ko 2015)',N?58:36).forEach(l=>line(l,'var(--sea)'))}
    else if(scr){py+=4;wrapT('Pick a group: testing only changes the picture once carriers are known',N?58:36).forEach(l=>line(l,'var(--muted)'))}
    else{py+=4;wrapT('About 90% of reactions begin within 60 days of starting (literature series)',N?58:36).forEach(l=>line(l,'var(--muted)'))}
    if(N)gs.setAttribute('viewBox','0 0 400 '+Math.round(py+10));
    gs.innerHTML=s;
    let x='';if(scr)x=`<div class="kv"><div><dt>Testing first</dt><dd>${G.p==null?'Testing only helps where carriers can be identified. ':''}CPIC: carriers should not take allopurinol (strong). [[CPIC-HLAB-Allopurinol,Hershfield2013]] In Taiwan, screening and steering carriers to alternatives prevented every expected severe reaction (0 vs 7). [[Ko2015]] The test is not perfect at predicting harm: in Thailand, a positive result carried a 1.52% positive predictive value, while a negative one was 100% reassuring for SJS/TEN. [[Tassaneeyakul2009]]</dd></div></div>`;
    $('#usGridNote').innerHTML=`<div class="kicker">Allopurinol hypersensitivity · ${G.n}</div><h4>${G.p==null?'Rare, early and serious':scr?'Testing first removes the carriers':'How common is HLA-B*58:01?'}</h4><p>${G.txt}</p>${x}<div class="pt"><b>In plain words</b>${G.pt}</div><div class="hook"><b>Exam hook</b>Onset typically in the <b>first 8 weeks</b>; risk factors <b>HLA-B*58:01, CKD, high starting dose</b>. [[Halevy2008,Ramasamy2013,Keller2018,Stamp2012]]</div>`;
  }
  const runG=()=>drawG(1);
  $$('[data-usa]').forEach(b=>b.onclick=()=>{grp=b.dataset.usa;$$('[data-usa]').forEach(q=>q.setAttribute('aria-pressed',q===b));runG()});
  $('#usScr').onclick=e=>{scr=!scr;e.currentTarget.setAttribute('aria-pressed',scr);drawG(1)};
  drawG(1);

  /* ---- starting-dose rule ---- */
  const ds=$('#usDose'),er=$('#usE');
  function drawD(){
    const N=vb(ds,'720 200','400 206'),e=+er.value,lim=1.5*e;$('#usEOut').textContent=e;
    const X0=N?20:40,X1=N?380:690,xm=v=>lerp(X0,X1,clamp(v/400)),by=N?92:84;
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    s+=`<text x="${X0}" y="22" class="t-sm" style="fill:var(--sea)">STARTING DOSE, mg/day</text><text x="${X0}" y="38" class="t-xs">Stamp 2012 limit: 1.5 × eGFR ${e} = ${Math.round(lim)} mg/day</text>`;
    s+=`<rect x="${X0}" y="${by}" width="${X1-X0}" height="22" rx="6" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    s+=`<rect x="${X0}" y="${by}" width="${f1(xm(lim)-X0)}" height="22" rx="6" style="fill:var(--sea);opacity:.85"/>`;
    s+=`<text x="${f1(Math.min(xm(lim)+6,X1-40))}" y="${by+15}" class="t-xs" style="fill:var(--ink);font-weight:700">≤${Math.round(lim)}</text>`;
    const mk=(v,c,l,up)=>{const x=xm(v);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${by-14}" y2="${by+36}" style="stroke:${c};stroke-width:1.6;stroke-dasharray:4 3"/><text x="${f1(x)}" y="${up?by-20:by+50}" class="t-xs t-mid" style="fill:${c}">${l}</text>`};
    mk(50,'var(--good)',N?'≤50 CKD':'ACR: ≤50 considered in CKD',true);mk(100,'var(--good)',N?'≤100':'ACR: ≤100',false);mk(200,'var(--bad)',N?'≥200':'EuroSCAR: ≥200, OR 36',true);
    [0,100,200,300,400].forEach(v=>s+=`<text x="${f1(xm(v))}" y="${by+(N?76:72)}" class="t-xs t-mid">${v}</text>`);
    s+=`<text x="${X0}" y="${N?by+102:by+96}" class="t-xs" style="fill:var(--warn)">arithmetic of a published rule · not a dose for anyone</text>`;
    ds.innerHTML=s;
    $('#usDoseNote').innerHTML=`<div class="kicker">Stamp 2012 · 54 cases, 157 controls</div><h4>The rule at eGFR ${e}: 1.5 × ${e} = ${Math.round(lim)} mg</h4><p>91% of people with allopurinol hypersensitivity, against 36% of controls, had started at ≥1.5 mg per mL/min of eGFR; the highest quintile of starting dose per eGFR carried an odds ratio of 23.2. The authors proposed starting at ≤1.5 mg × eGFR, then escalating. [[Stamp2012]] ACR 2020 starts at ≤100 mg/day and considers ≤50 mg/day in CKD. [[FitzGerald2020]] Starting above 100 mg/day carried 1.9-fold risk in US Medicaid. [[Keller2018]]</p><div class="pt"><b>In plain words</b>Starting with a small dose lowers the chance of the dangerous reaction. The dose can then go up slowly. [[Stamp2012,Stamp2011]]</div><div class="hook"><b>Exam hook</b>Low start, slow climb: escalating above the old creatinine-clearance dose reached target in 69% vs 32%. [[Stamp2017RCT]]</div>`;
  }
  er.addEventListener('input',drawD);drawD();
  redraws.ultsafety=()=>{drawG(1);drawD();drawT()};

  /* ---- CARES vs FAST ---- */
  const ts=$('#usTrials');let view='rates';
  function drawT(){
    const N=vb(ts,'720 340','400 430'),V=US_TRV[view];
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/><text x="16" y="24" class="t-sm" style="fill:var(--ink)">${V.t.toUpperCase()}</text>`;
    const L=N?16:250,X0=N?16:260,X1=N?384:690,rowH=N?(view==='hr'?84:92):(view==='hr'?64:66),top=N?54:52;
    if(view!=='hr')s+=`<g><rect x="${N?16:420}" y="34" width="10" height="10" style="fill:var(--warn)"/><text x="${N?30:434}" y="43" class="t-xs" style="fill:var(--ink)">febuxostat</text><rect x="${N?110:520}" y="34" width="10" height="10" style="fill:var(--sea)"/><text x="${N?124:534}" y="43" class="t-xs" style="fill:var(--ink)">allopurinol</text></g>`;
    if(view==='hr'){
      const XH=N?292:590,lg=v=>Math.log(v),xv=v=>lerp(X0,XH,(lg(v)-lg(.5))/(lg(2)-lg(.5)));
      const yb=top+V.rows.length*rowH;
      [.5,.7,1,1.3,2].forEach(v=>s+=`<line x1="${f1(xv(v))}" x2="${f1(xv(v))}" y1="${top}" y2="${yb}" style="stroke:var(--line);stroke-width:${v===1?1.8:1};${v===1.3?'stroke-dasharray:5 4;stroke:var(--warn)':''}"/><text x="${f1(xv(v))}" y="${yb+16}" class="t-xs t-mid">${v}</text>`);
      s+=`<text x="${f1(xv(1.3)+4)}" y="${top+10}" class="t-xs" style="fill:var(--warn)">CARES margin 1.3</text>`;
      s+=`<text x="${X0}" y="${yb+32}" class="t-xs">← fewer on febuxostat</text><text x="${XH}" y="${yb+32}" class="t-xs t-end">more on febuxostat →</text>`;
      V.rows.forEach((r,i)=>{const y=top+i*rowH+(N?44:rowH/2),c='var(--ink)';
        s+=`<text x="${N?16:L}" y="${f1(N?y-18:y+4)}" class="t-xs ${N?'':'t-end'}" style="fill:var(--ink)">${r[0]}</text>`;
        if(r[2]!=null)s+=`<line x1="${f1(xv(r[2]))}" x2="${f1(xv(r[3]))}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:${c};stroke-width:2.4"/>`;
        else s+=`<line x1="${f1(xv(r[1]))}" x2="${f1(xv(r[3]))}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:${c};stroke-width:2;stroke-dasharray:3 3"/>`;
        s+=`<rect x="${f1(xv(r[1])-6)}" y="${f1(y-6)}" width="12" height="12" style="fill:${c}"/><text x="${f1(xv(r[3])+6)}" y="${f1(y+4)}" class="t-xs" style="fill:var(--ink);font-weight:700">${r[1].toFixed(2)}${r[2]!=null?' ('+r[2].toFixed(2)+'–'+r[3].toFixed(2)+')':' (upper '+r[3].toFixed(2)+')'}</text>`});
    }else{
      const xv=v=>lerp(X0,X1-40,v/V.mx);
      V.rows.forEach((r,i)=>{const y=top+i*rowH+(N?28:16);
        s+=`<text x="${N?16:L}" y="${f1(N?y-6:y+14)}" class="t-xs ${N?'':'t-end'}" style="fill:var(--ink)">${r[0]}</text>`;
        const bar=(v,c,yy,lbl)=>{s+=`<rect x="${X0}" y="${f1(yy)}" width="${f1(Math.max(2,xv(v)-X0))}" height="16" rx="4" style="fill:${c}"/><text x="${f1(xv(v)+6)}" y="${f1(yy+12)}" class="t-xs" style="fill:var(--ink);font-weight:700">${view==='fu'?v.toFixed(1):v}${V.unit}${lbl?' '+lbl:''}</text>`};
        if(r[2]==null)bar(r[1],'var(--muted)',y+2,'');else{bar(r[1],'var(--warn)',y,'');bar(r[2],'var(--sea)',y+20,r[3]?'· '+r[3]:'')}});
    }
    const H=Math.round(top+V.rows.length*rowH+(view==='hr'?44:14));ts.setAttribute('viewBox','0 0 '+(N?400:720)+' '+Math.max(N?300:260,H));
    ts.innerHTML=s;
    $('#usTrNote').innerHTML=`<div class="kicker">CARES 2018 · FAST 2020</div><h4>${V.t}</h4><p>${V.txt}</p><div class="pt"><b>In plain words</b>${V.pt}</div><div class="hook"><b>Exam hook</b>CARES: CV death <b>HR 1.34</b>, all-cause death <b>HR 1.22</b>, MACE non-inferior → FDA boxed warning 2019. FAST: <b>HR 0.85</b>, non-inferior. [[White2018,Mackenzie2020,FDA-Uloric]]</div>`;
  }
  $$('[data-ust]').forEach(b=>b.onclick=()=>{view=b.dataset.ust;$$('[data-ust]').forEach(q=>q.setAttribute('aria-pressed',q===b));drawT()});
  drawT();
  onHide.ultsafety=()=>{if(stopG)stopG()};
};
