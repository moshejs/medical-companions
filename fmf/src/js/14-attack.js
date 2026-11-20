
/* =============== 1.4 attack =============== */
const AT_SITES={
 perit:{n:'Abdomen (peritonitis)',cav:'PERITONEAL CAVITY',lay:'mesothelium',dot:[30,62],
  txt:'The most common attack. Diffuse or localized abdominal pain, guarding and rebound tenderness, sometimes ileus with constipation. Peritonitis occurs in more than 90% of patients (93.7% in the Turkish registry of 2,838). It can be indistinguishable from a surgical abdomen; in one Israeli series 40% of patients had an appendectomy and most of those appendices were not inflamed. [[Tunca2005,Tufan2020,Lidar2008]]',
  pt:'Severe belly pain with fever that looks like an emergency, then fades within about three days.',
  hook:'Recurrent "surgical abdomen" with fever that resolves on its own in 1–3 days: think FMF. Repeated sterile peritonitis can leave adhesions.'},
 pleura:{n:'Chest (pleuritis)',cav:'PLEURAL SPACE',lay:'mesothelium',dot:[24,44],
  txt:'Pleuritis affects about a third of patients (31.2% in the Turkish registry). It is sudden, usually one-sided chest pain that worsens with breathing, sometimes with a small effusion, and resolves in 1–3 days. [[Tunca2005,Tufan2020]]',
  pt:'A sharp pain on one side of the chest that hurts more when you breathe in.',
  hook:'Unilateral pleuritic pain with fever, recurring and self-limited.'},
 joint:{n:'Joint (arthritis)',cav:'JOINT SPACE',lay:'synovium',dot:[24,104],
  txt:'Arthritis affects roughly half of patients (47.4% in the Turkish registry). It is usually one large leg joint (knee, ankle, hip) with a sterile but inflammatory effusion that can mimic septic arthritis. Joint attacks peak in 1–3 days and settle within about a week, sometimes up to two. Protracted arthritis occurs in under 5%. [[Tunca2005,Tufan2020,PRINTO2016]]',
  pt:'One big joint, often a knee or ankle, swells and hurts, then settles down.',
  hook:'Acute <b>monoarthritis</b> of a large lower-limb joint with a sterile neutrophilic effusion.'},
 scrot:{n:'Scrotum',cav:'TUNICA VAGINALIS',lay:'mesothelium',dot:[30,80],
  txt:'Inflammation of the tunica vaginalis, a pouch of peritoneum, causes a painful swollen scrotum. In one series of 175 boys with FMF, 9% had scrotal attacks lasting 8 hours to 5 days; for a quarter of them it was the first sign of FMF, and 38% had surgery. [[Majeed2000]]',
  pt:'In boys, a painful swollen scrotum that can look like an emergency.',
  hook:'The tunica vaginalis is peritoneum that followed the testis down, so it is a serosal surface too.'},
 skin:{n:'Skin (erysipelas-like erythema)',cav:'EPIDERMIS',lay:'basement membrane',dot:[34,116],
  txt:'A tender, red, erysipelas-like plaque on the lower leg, ankle or top of the foot, often brought on by long walking or travel. It occurred in 20.9% of the Turkish registry and about 7.5% of one pediatric cohort, where it went with arthritis, M694V homozygosity and higher colchicine needs. [[Tunca2005,Tufan2020,GezginYildirim2020]]',
  pt:'A red, sore, warm patch on the lower leg that looks like a skin infection but is not one.',
  hook:'Erysipelas-like erythema (ELE) is the characteristic skin sign of FMF and is more common with M694V.'}
};
const AT_VARS={
 typ:{n:'Typical attack',axis:120,unit:'Hours',fmt:h=>`${Math.round(h)} h`,
  steps:[{from:0,at:.01,k:'Hour 0',t:'A trigger',txt:'Many attacks have no obvious cause. In questionnaires patients most often name emotional stress, cold, tiredness and menstruation. The strongest study, a case-crossover design in 104 Armenian patients, found each stressful event raised the odds of an attack two days later by about 70%, while strenuous exercise and fatty meals did not. In a survey of women with FMF, 79% reported attacks with their period, mostly abdominal attacks they could tell apart from period pain. About half of all patients feel a prodrome, averaging about 20 hours. [[Karadag2013,Parlar2024,Yenokyan2012,Guzelant2017,Lidar2006]]',pt:'Many attacks come out of the blue. Stress is the best-documented trigger; cold, tiredness and periods are often reported too.',hook:'Triggers lower the bar for an already jumpy pyrin. They do not cause the disease.'},
   {from:2/120,at:5/120,k:'Hours 1–8',t:'Fever and pain begin',txt:'Fever starts suddenly and peaks within hours, with pain at one serosal site. IL-1β is a potent endogenous pyrogen: in humans, nanogram-per-kilogram doses cause fever. [[Tufan2020,Dinarello2011]]',pt:'Fever and pain come on fast, within hours.',hook:'Fever + serositis at one site at a time is the usual pattern.'},
   {from:8/120,at:16/120,k:'Hours 8–24',t:'Neutrophil flood',txt:'Neutrophils pour out of the capillaries into the serosal space, forming a sterile exudate. Pain and signs peak. CRP and SAA rise steeply as the liver responds to IL-1β and IL-6; in one cohort attack medians were SAA 693 mg/L and CRP 115 mg/L. [[Lachmann2006,Dinarello2011]]',pt:'Huge numbers of white cells rush in. The pain peaks, and blood markers of inflammation climb.',hook:'The fluid is <b>sterile</b>: neutrophils, no bacteria. Cultures are negative.'},
   {from:24/120,at:40/120,k:'Hours 24–72',t:'Resolution',txt:'The attack stops by itself, usually within 12–72 hours, without antibiotics. The Livneh criteria define a typical attack as febrile (≥38 °C) and lasting 12 hours to 3 days. CRP and SAA lag behind the symptoms. [[Livneh1997,Tufan2020]]',pt:'It goes away on its own, usually within three days.',hook:'Self-limited, 12–72 h: the duration itself is a diagnostic clue (TRAPS lasts longer, PFAPA comes like clockwork).'},
   {from:72/120,at:100/120,k:'After 72 h',t:'Between attacks',txt:'Most patients feel well between attacks. Median between-attack SAA was 6 mg/L in one cohort, but only 29% of measurements were fully normal (<3 mg/L) and 13% were above 50 mg/L. How common subclinical inflammation looks depends heavily on which marker and cut-off a study uses. Persistently raised SAA is what drives amyloidosis. [[Lachmann2006,Tufan2020,Lachmann2007]]',pt:'You usually feel normal again. Blood tests between attacks show whether hidden inflammation continues.',hook:'Check CRP/SAA <b>between</b> attacks: persistent elevation means inadequate control even if attacks seem rare.'}],
  curves:{temp:h=>ramp(h,1,7)*(1-ramp(h,26,52)),pain:h=>ramp(h,.5,6)*(1-ramp(h,30,66)),crp:h=>{const x=h/40;return h<=0?0:Math.min(1,Math.pow(x,2.2)*Math.exp(2.2*(1-x)))},saa:h=>{const x=h/32;return h<=0?0:Math.min(1,Math.pow(x,2)*Math.exp(2*(1-x)))},neut:h=>ramp(h,2,12)*(1-ramp(h,40,72))}},
 pfm:{n:'Protracted febrile myalgia',axis:56,unit:'Days',fmt:d=>`day ${Math.round(d)}`,
  steps:[{from:0,at:.02,k:'Days 0–3',t:'Severe muscle pain',txt:'Protracted febrile myalgia (PFM) is a rare manifestation: severe, disabling muscle pain with fever, a very high ESR and raised globulins. It was first described in 14 patients and can occur even on colchicine. In a review of 78 children, more than half had PFM as their first FMF sign. [[Langevitz1994,Hospach2024]]',pt:'A rare form with very severe muscle pain and fever that does not go away in a few days.',hook:'PFM: fever + severe myalgia lasting <b>weeks</b>, very high ESR, colchicine does not prevent it.'},
   {from:.1,at:.25,k:'Weeks 1–4',t:'Weeks, not days',txt:'Untreated, PFM lasted up to about 6 weeks in the first series, and later reviews describe episodes up to about 10 weeks, with muscle edema on MRI. [[Langevitz1994,Tufan2020]]',pt:'Untreated it can last about six weeks.',hook:'Weeks, not days: duration separates PFM from an ordinary attack.'},
   {from:.6,at:.75,k:'Weeks 4–8',t:'Settles, faster with steroids',txt:'PFM responds promptly to corticosteroids. In the pediatric review steroids worked in 77%, and anakinra worked in every steroid-refractory case. [[Langevitz1994,Hospach2024]]',pt:'Doctors usually treat it with steroids, which make it settle much faster.',hook:'One of the few FMF situations where glucocorticoids are standard.'}],
  curves:{temp:d=>ramp(d,0,2)*(1-ramp(d,30,48))*.75,pain:d=>ramp(d,0,1.5)*(1-ramp(d,28,48)),crp:d=>ramp(d,0,5)*(1-ramp(d,34,54)),saa:d=>ramp(d,0,4)*(1-ramp(d,32,52)),neut:d=>ramp(d,0,3)*(1-ramp(d,30,48))*.7}},
 peri:{n:'Pericarditis',axis:120,unit:'Hours',fmt:h=>`${Math.round(h)} h`,
  steps:[{from:0,at:.03,k:'Rare',t:'Chest pain, worse lying flat',txt:'Pericarditis is rare: 27 of about 4,000 Israeli patients over 20 years, and 1.4% of the Turkish registry. That is still about ten times the background rate. [[Kees1997,Tunca2005]]',pt:'Rarely, the sac around the heart becomes inflamed for a few days.',hook:'Recurrent pericarditis with fever in an at-risk population: consider FMF.'},
   {from:24/120,at:40/120,k:'1–3 days',t:'Self-limited',txt:'Each patient in the Israeli series had 1–3 pericardial attacks lasting a mean of 4.2 days, with no lasting damage. [[Kees1997]]',pt:'It settles in a few days.',hook:'Same serosal biology, different membrane.'}],
  curves:null}
};
AT_VARS.peri.curves=AT_VARS.typ.curves;
inits.attack=()=>{
  const svg=$('#atSvg'),rg=$('#atT');let site='perit',vk='typ';
  const r=rng(41);const NE=Array.from({length:22},()=>({x:20+r()*270,ph:r(),y:r()}));
  $('#atSites').innerHTML='<span class="kicker">Site</span>'+Object.entries(AT_SITES).map(([k,v])=>`<button class="btn" data-site="${k}" aria-pressed="${k===site}">${v.n}</button>`).join('');
  $('#atVars').innerHTML='<span class="kicker">Type</span>'+Object.entries(AT_VARS).map(([k,v])=>`<button class="btn" data-var="${k}" aria-pressed="${k===vk}">${v.n}</button>`).join('');
  function body(){const S=AT_SITES[vk==='peri'?'pleura':site];const [dx,dy]=vk==='peri'?[28,48]:vk==='pfm'?[30,120]:S.dot;
    return `<g transform="translate(262 10)"><circle cx="30" cy="12" r="9" style="fill:none;stroke:var(--muted);stroke-width:1.5"/><path d="M18 26 h24 l4 50 h-6 l-2 -30 M18 26 l-4 50 h6 l2 -30 M22 72 l-2 52 h6 l4 -44 l4 44 h6 l-2 -52" style="fill:none;stroke:var(--muted);stroke-width:1.5;stroke-linejoin:round"/><circle cx="${dx}" cy="${dy}" r="6" style="fill:var(--terra)"/></g>`}
  function draw(u){
    const V=AT_VARS[vk],S=AT_SITES[site],x=u*V.axis,C=V.curves;
    const joint=site==='joint'&&vk==='typ', sx=joint?.65:1; // joint attacks run longer
    const val=k=>C[k](x*sx);
    const nf=val('neut'),fever=val('temp');
    const N=vb(svg,'720 420','400 960');
    let s=(N?`<g transform="scale(1.212)">`:'')+`<rect x="0" y="0" width="330" height="420" rx="12" style="fill:var(--field)"/>`;
    // tissue scene
    const isSkin=site==='skin'&&vk==='typ';
    const cav=vk==='peri'?'PERICARDIAL SPACE':vk==='pfm'?'MUSCLE':S.cav;
    const redden=nf;
    if(isSkin){
      s+=`<rect x="10" y="40" width="310" height="70" style="fill:var(--cyto)"/><rect x="10" y="40" width="310" height="70" style="fill:var(--bad);opacity:${f1(.35*redden)}"/>`;
      for(let i=0;i<14;i++)s+=`<rect x="${12+i*22}" y="${50+(i%2)*4}" width="20" height="50" rx="4" style="fill:none;stroke:var(--memb);stroke-width:1;opacity:.6"/>`;
      s+=`<text x="16" y="34" class="t-sm">EPIDERMIS</text><path d="M10 112 H320" style="stroke:var(--memb);stroke-width:3"/><text x="16" y="132" class="t-sm">DERMIS</text>`;
      s+=`<rect x="10" y="114" width="310" height="230" style="fill:var(--bad);opacity:${f1(.12*redden)}"/>`;
    }else{
      s+=`<rect x="10" y="40" width="310" height="120" style="fill:var(--panel)"/><text x="16" y="34" class="t-sm">${cav}</text>`;
      // exudate
      const ex=vk==='pfm'?0:nf;
      s+=`<rect x="10" y="${f1(160-110*ex)}" width="310" height="${f1(110*ex)}" style="fill:var(--sea);opacity:.18"/>`;
      if(ex>.15)s+=`<text x="240" y="${f1(156-110*ex+18)}" class="t-xs t-end" style="fill:var(--sea)">sterile exudate</text>`;
      if(vk!=='pfm')for(let i=0;i<14;i++)s+=`<rect x="${12+i*22}" y="160" width="20" height="8" rx="4" style="fill:var(--memb)"/>`;
      else for(let i=0;i<6;i++)s+=`<rect x="14" y="${46+i*19}" width="302" height="14" rx="7" style="fill:var(--bad-soft);stroke:var(--bad);stroke-width:.8"/>`;
      s+=`<text x="16" y="186" class="t-sm">${vk==='pfm'?'muscle fibers':vk==='peri'?'mesothelium':S.lay}</text>`;
      s+=`<rect x="10" y="170" width="310" height="174" style="fill:var(--bad);opacity:${f1(.12*redden)}"/>`;
    }
    // capillary
    s+=`<rect x="10" y="280" width="310" height="44" rx="22" style="fill:var(--bad-soft);stroke:var(--bad);stroke-width:2"/><text x="16" y="342" class="t-sm">CAPILLARY</text>`;
    for(let i=0;i<9;i++){const xx=((i*40+u*2600)%330)+0;s+=`<ellipse cx="${f1(xx)}" cy="${300+(i%3-1)*6}" rx="7" ry="4" style="fill:var(--bad);opacity:.7"/>`}
    // neutrophils leaving vessel toward cavity
    NE.forEach((n,i)=>{const on=clamp(nf*1.25-i/NE.length*.9);if(on<=0)return;const top=isSkin?150:vk==='pfm'?120:90+n.y*60;
      const prog=clamp(on*1.4);const y=lerp(300,top,ease(prog));const xx=n.x+Math.sin((u*40+n.ph*6))*4;s+=neutro(xx,y,9,clamp(on*2))});
    s+=body();
    // fever thermometer
    const T=37+2.8*fever;s+=`<g transform="translate(18 360)"><rect x="0" y="0" width="200" height="12" rx="6" style="fill:var(--panel-2)"/><rect x="0" y="0" width="${f1(200*fever)}" height="12" rx="6" style="fill:var(--terra)"/><text x="0" y="32" class="t-lbl">Temperature ${T.toFixed(1)} °C</text></g>`;
    s+=`<text x="16" y="408" class="t-sm">${V.fmt(x)}</text><text x="318" y="408" class="t-xs t-end" style="fill:var(--warn)">ILLUSTRATIVE</text>`;
    if(N)s+='</g>';
    // charts: beside the scene when wide, stacked under it when narrow
    const CX0=N?48:372, CX1=N?392:708, CY=N?548:14;
    const CH=[['temp','Fever','var(--terra)'],['pain','Pain','var(--bad)'],['crp','CRP','var(--sea)'],['saa','SAA','var(--gold)']];
    CH.forEach(([k,l,c],i)=>{const y0=CY+i*100,y1=y0+78,x0=CX0,x1=CX1;
      s+=`<line x1="${x0}" x2="${x1}" y1="${y1}" y2="${y1}" class="axis"/><text x="${x0}" y="${y0-2}" class="t-sm" style="fill:${c}">${l.toUpperCase()}</text>`;
      s+=`<path d="${pathFn(v=>C[k](v*V.axis*sx),x0,x1,y1,y0+10)}" style="fill:none;stroke:${c};stroke-width:1.2;opacity:.35"/>`;
      s+=`<path d="${pathFn(v=>v<=u?C[k](v*V.axis*sx):NaN,x0,x1,y1,y0+10).replace(/[ML][^ML]*NaN[^ML]*/g,'')}" style="fill:none;stroke:${c};stroke-width:3"/>`;
      const cx=lerp(x0,x1,u),cy=lerp(y1,y0+10,C[k](x*sx));s+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="5" style="fill:${c}"/>`;
      if(i===3){const ticks=vk==='pfm'?[0,14,28,42,56]:[0,24,48,72,96,120];ticks.forEach((tk,ti)=>{const last=ti===ticks.length-1,first=ti===0;
        s+=`<text x="${f1(lerp(x0,x1,tk/V.axis))}" y="${y1+14}" class="t-xs ${last?'t-end':first?'':'t-mid'}">${vk==='pfm'?'d'+tk:tk+'h'}</text>`})}});
    s+=`<line x1="${f1(lerp(CX0,CX1,u))}" x2="${f1(lerp(CX0,CX1,u))}" y1="${CY-6}" y2="${CY+380}" style="stroke:var(--ink);stroke-width:1;opacity:.25"/>`;
    svg.innerHTML=s;
    const p=phaseOf(V.steps,u);setSt(p);const P=V.steps[p];
    $('#atNote').innerHTML=noteHTML(P)+(vk==='typ'?`<div class="kv"><div><dt>This site: ${S.n}</dt><dd>${S.txt}</dd></div></div>`+(p===2?`<div class="pt"><b>In plain words</b>${S.pt}</div><div class="hook"><b>Exam hook</b>${S.hook}</div>`:''):'');
    $('#atRead').innerHTML=`<span>time <b>${V.fmt(x)}</b></span><span>fever <b>${(37+2.8*fever).toFixed(1)} °C</b></span><span>CRP <b>${Math.round(val('crp')*100)}%</b> of peak</span><span>SAA <b>${Math.round(val('saa')*100)}%</b> of peak</span>`;
  }
  let setSt=()=>{};let stop=playWire(rg,$('#atPlay'),draw,14000,'Replay','attack');
  function setVar(){const V=AT_VARS[vk];setSt=stepWire($('#atSteps'),V.steps,rg,draw,stop);$('#atUnit').textContent=V.unit;$('#atSites').style.display=vk==='typ'?'':'none';rg.value=V.steps[0].at;draw(+rg.value)}
  $('#atSites').addEventListener('click',e=>{const b=e.target.closest('[data-site]');if(!b)return;site=b.dataset.site;$$('[data-site]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)});
  $('#atVars').addEventListener('click',e=>{const b=e.target.closest('[data-var]');if(!b)return;stop();vk=b.dataset.var;$$('[data-var]').forEach(x=>x.setAttribute('aria-pressed',x===b));setVar()});
  setVar();

  /* years */
  const ys=$('#atYears'),yr=$('#ayT');let pat='mod',col=false;
  const PAT={freq:['Every 2–4 weeks',16],mod:['Every 1–3 months',7],rare:['A few a year',3]};
  $('#atFreq').innerHTML='<span class="kicker">Untreated pattern</span>'+Object.entries(PAT).map(([k,v])=>`<button class="btn" data-pat="${k}" aria-pressed="${k===pat}">${v[0]}</button>`).join('');
  $('#atYearsTxt').innerHTML='Attacks come at irregular intervals, unlike the clockwork of PFAPA, and frequency varies widely between people. The site can change from attack to attack. Attack frequency is often said to fall with age, but in treated populations that is hard to separate from the effect of colchicine, so read it with care. 80–90% of patients have their first attack before age 20. Daily colchicine cuts attack frequency in most patients and prevents amyloidosis. [[BenChetrit2019,PRINTO2016,Tufan2020,Zemer1986]]';
  function gen(){const rr=rng(pat.length*97+(col?1:0));const out=[];const rate=PAT[pat][1];
    for(let y=0;y<5;y++)for(let d=0;d<365;d+=1){const tY=y+d/365;let p=rate/365;
      if(col&&tY>2){const k=ramp(tY,2,2.5);p*=lerp(1,.12,k)}
      if(rr()<p){out.push({tY,s:.5+rr()*.5,site:Math.floor(rr()*4)});d+=4}}
    return out}
  let EV=gen();
  function drawY(t){const T=t*5;let s='';
    const NY=vb(ys,'720 230','400 300');
    const x0=NY?14:60, x1=NY?392:706, rowH=NY?52:38, top=NY?30:24, trk=NY?22:24;
    for(let y=0;y<5;y++){const yy=top+y*rowH;
      s+=`<text x="${NY?x0:10}" y="${f1(yy+(NY?-4:16))}" class="t-sm">Year ${y+1}</text><line x1="${x0}" x2="${x1}" y1="${yy+trk}" y2="${yy+trk}" class="axis"/>`;
      ['J','F','M','A','M','J','J','A','S','O','N','D'].forEach((m,i)=>{if(y===4)s+=`<text x="${f1(x0+(i+.5)/12*(x1-x0))}" y="${yy+trk+16}" class="t-xs t-mid">${m}</text>`});
      const n=EV.filter(e=>Math.floor(e.tY)===y&&e.tY<=T).length;s+=`<text x="${x1}" y="${f1(yy+(NY?-4:6))}" class="t-xs t-end">${n} attacks</text>`}
    if(col){const yy=top+2*rowH;s+=`<rect x="${x0}" y="${f1(yy-(NY?18:4))}" width="${x1-x0}" height="${3*rowH+6}" rx="6" style="fill:var(--crocus-soft);opacity:.55"/><text x="${x0+4}" y="${f1(yy+(NY?-6:6))}" class="t-xs" style="fill:var(--crocus)">on colchicine →</text>`}
    const cols=['var(--terra)','var(--sea)','var(--gold)','var(--bad)'];
    EV.forEach(e=>{if(e.tY>T)return;const y=Math.floor(e.tY),xx=x0+(e.tY-y)*(x1-x0),yy=top+y*rowH+trk;s+=`<path d="M${f1(xx-4)} ${yy} L${f1(xx)} ${f1(yy-20*e.s)} L${f1(xx+4)} ${yy}" style="fill:${cols[e.site]};opacity:.9"/>`});
    if(t<1){const y=Math.min(4,Math.floor(T)),xx=x0+(T-y)*(x1-x0);s+=`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${top+y*rowH}" y2="${top+y*rowH+trk+2}" style="stroke:var(--ink);stroke-width:2"/>`}
    ys.innerHTML=s;
    const pre=EV.filter(e=>e.tY<2).length/2,post=EV.filter(e=>e.tY>=2.5).length/2.5;
    $('#ayCap').textContent=col?`Schematic simulation. About ${pre.toFixed(1)} attacks a year before colchicine, about ${post.toFixed(1)} a year once the drug has had months to work. Colors mark different sites.`:'Schematic simulation of an untreated course. Colors mark different attack sites (abdomen, chest, joint, skin).'}
  const ystop=playWire(yr,$('#ayPlay'),drawY,9000,'Replay','attack');
  $('#atFreq').addEventListener('click',e=>{const b=e.target.closest('[data-pat]');if(!b)return;pat=b.dataset.pat;$$('[data-pat]').forEach(x=>x.setAttribute('aria-pressed',x===b));EV=gen();drawY(+yr.value)});
  $('#ayCol').onclick=()=>{col=!col;$('#ayCol').setAttribute('aria-pressed',col);EV=gen();drawY(+yr.value)};
  drawY(+yr.value);
};
