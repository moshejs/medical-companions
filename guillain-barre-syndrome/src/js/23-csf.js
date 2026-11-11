/* =============== 2.3 Lumbar puncture & CSF =============== */
/* Main player: a lumbar puncture, a magnified sample whose protein specks multiply with the days (schematic), and a
   chart of the published windows for raised protein (Fokke2014, Doets2018), then cell counts (AlHakem2023).
   Widgets: a sample reader against fixed and age-adjusted limits (Bourque2019), and an icon array of sensitivity. */
const CS_STEPS=[
 {from:0,at:.06,k:'Step 1 · the sample',sv:'A sample from the lower back',sub:'spinal fluid taken from the lower back',
  t:'Lumbar puncture: a sample of spinal fluid',
  txt:`A lumbar puncture takes a sample of cerebrospinal fluid (CSF) from the spinal canal in the lower back. In GBS the classic result is raised protein with a normal cell count, albuminocytological dissociation [[Leonhard2019]]. As published, the guideline advises CSF examination particularly when the diagnosis is uncertain or another cause must be excluded [[vanDoorn2023]].`,
  pt:`A doctor takes a little fluid from the lower back with a thin needle. The lab measures the protein and counts the white cells in it.`,
  hook:`Albuminocytological dissociation: raised protein, normal cell count [[Leonhard2019]].`},
 {from:.16,at:.3,k:'Step 2 · days 0 to 3',sv:'Days 0 to 3: often still normal',sub:'about half are raised this early',
  t:'In the first days, protein is often still normal',
  txt:`Protein was raised in 49% on the first day after weakness began in a Dutch cohort of 494 [[Fokke2014]]. In IGOS, 50% were raised within 3 days, with a median of 0.45 g/l (IQR 0.33–0.73) [[Doets2018]]. A normal protein this early does not exclude GBS [[Leonhard2019,vanDoorn2023]].`,
  pt:`In the first few days the fluid can look normal, and the person can still have GBS.`,
  hook:`A normal CSF protein in week 1 does not rule out GBS: about 50% are raised within 3 days [[Doets2018]].`},
 {from:.36,at:.46,k:'Step 3 · the first week',sv:'The first week: rising',sub:'normal in 30 to 50% during week 1',
  t:'Through the first week, protein rises',
  txt:`Protein is normal in 30–50% of people in the first week and in 10–30% in the second [[Leonhard2019]]. In Ottawa, first-week sensitivity was 70% with the fixed 0.45 g/l limit and 45% with age-adjusted limits [[Bourque2019]].`,
  pt:`As the days pass, more people have a high protein level.`,
  hook:`Normal protein: 30–50% in week 1, 10–30% in week 2 [[Leonhard2019]].`},
 {from:.52,at:.64,k:'Step 4 · after the first week',sv:'After a week: mostly raised',sub:'84% after day 7, 88% after 2 weeks',
  t:'After the first week, most samples are raised',
  txt:`In IGOS, 84% were raised after 7 days, with a median of 0.98 g/l (IQR 0.59–1.84) [[Doets2018]]. In the Dutch cohort, 88% were raised after 2 weeks [[Fokke2014]]. The larger IGOS analysis found dissociation in 57% at 4 days or fewer and 84% beyond 4 days [[AlHakem2023]].`,
  pt:`By the second week, most people with GBS have a high protein level in the spinal fluid.`,
  hook:`Raised protein: 49% on day 1, 88% after 2 weeks [[Fokke2014]].`},
 {from:.7,at:.78,k:'Step 5 · cells',sv:'White cells stay low',sub:'usually under 5 per µl',
  t:'White cells usually stay under 5 per microlitre',
  txt:`In the IGOS analysis of 1,500 patients, 83% had under 5 cells/µl, 16% had 5–49 and 1% had 50 or more [[AlHakem2023]]. Marked pleocytosis above 50/µl suggests leptomeningeal malignancy or infectious or inflammatory disease of the cord or roots [[Leonhard2019]], though rare counts of 50 or more are compatible with GBS after a thorough search for other causes [[AlHakem2023]].`,
  pt:`The fluid usually has very few white cells. Many white cells make doctors look for an infection or another illness.`,
  hook:`CSF over 50 cells/µl should send you looking for another diagnosis [[vanDoorn2023]].`},
 {from:.86,at:.93,k:'Step 6 · caveats',sv:'Not specific, and IVIg muddies it',sub:'many conditions raise protein',
  t:'Raised protein is not specific',
  txt:`Among 2,627 samples with raised protein and few cells, a diagnosis explaining the protein was found in 57% [[Brooks2019]], so raised protein has many causes. After IVIg, both protein and cell count may be artefactually raised [[vanDoorn2023]].`,
  pt:`A high protein level is a clue, not proof. It can be high for other reasons, and treatment with IVIg can change the result.`,
  hook:`Albuminocytological dissociation is not specific to GBS [[Brooks2019]].`}];
/* published windows for raised protein (% of people), drawn as points or bars; d0..d1 in days from weakness onset */
const CS_WIN=[
 {s:'f',d0:1,d1:1,v:49,show:1,lab:'49% day 1',pos:'below'},
 {s:'i',d0:0,d1:3,v:50,show:2,lab:'50% by day 3',pos:'above'},
 {s:'i',d0:7,d1:21,v:84,show:7.5,lab:'84% after day 7',pos:'below'},
 {s:'f',d0:14,d1:21,v:88,show:14.5,lab:'88% after 2 wk',pos:'above'}];
const CS_CELLS=[83,16,1];
const CS_TXT={canal:'spinal canal: CSF',vert:'vertebra',needle:'needle',mag:'magnified sample',ivig:'after IVIg?',
  prot:'protein',cell:'white cell',chart:'Raised CSF protein, % of people',lf:'Dutch cohort',li:'IGOS',
  cells:'White cells, IGOS 1,500',c1:'under 5/µl: 83%',c2:'5–49: 16% · 50+: 1%',day:'days',
  early:['IGOS median,','days 0–3:','0.45 g/l'],mid:['rising','(schematic)'],late:['IGOS median,','after day 7:','0.98 g/l']};
function csDay(t){if(t<.16)return 0;if(t<.36)return 3*ramp(t,.16,.36);if(t<.52)return lerp(3,7,ramp(t,.36,.52));return lerp(7,21,ramp(t,.52,.68))}

/* the sample reader */
const CS_AGE={30:.54,40:.57,50:.60,60:.63,70:.67};  /* Ottawa age-adjusted upper limits, g/l [[Bourque2019]] */
const CS_CELLBAND=['under 5','5–49','50 or more'];
const CS_RD={
 aboveBoth:`Above both the fixed 0.45 g/l limit and the age-adjusted limit for this age [[Bourque2019]].`,
 aboveFixed:`Above the fixed 0.45 g/l limit, but at or below the age-adjusted limit for this age, so it would be read as normal under age-adjusted limits [[Bourque2019]].`,
 below:`Not raised by either limit.`,
 early0:`In the first 3 days, about half of people with GBS still have a normal protein (50% raised in IGOS) [[Doets2018]]; a normal result does not exclude GBS [[Leonhard2019,vanDoorn2023]].`,
 early1:`In the first week, protein is normal in 30–50% of people with GBS [[Leonhard2019]].`,
 late:`After the first week most people with GBS have raised protein: 84% after day 7 in IGOS [[Doets2018]].`,
 c0:`Under 5 cells/µl: the usual finding in GBS (83% in IGOS) [[AlHakem2023]].`,
 c1:`5–9 cells/µl: "rarely 5–50" in the guideline's words [[vanDoorn2023]]; 16% of IGOS had 5–49 [[AlHakem2023]].`,
 c2:`10–49 cells/µl: mild pleocytosis is compatible with GBS but should prompt consideration of infectious polyradiculitis [[Leonhard2019]].`,
 c3:`50/µl or more: very rare in GBS (1% in IGOS) [[AlHakem2023]] and a red flag that suggests leptomeningeal malignancy, or infectious or inflammatory disease of the cord or roots [[Leonhard2019]].`,
 ivig:`After IVIg, CSF protein and cell count may be artefactually raised [[vanDoorn2023]].`,
 acd:`Raised protein with under 5 cells: the classic dissociation. It is still not specific: many other conditions raise protein [[Brooks2019]].`};
/* the sensitivity icon array: % of people with GBS above the limit (Ottawa) [[Bourque2019]]; an array is a range */
const CS_SENS={fixed:{d3:null,w1:70,w2:[74,87]},age:{d3:32,w1:45,w2:[74,87]}};
const CS_SCAP={
 fixed:{d3:`For days 0–3 the Ottawa paper reports sensitivity only for age-adjusted limits [[Bourque2019]].`,
  w1:`First week, fixed 0.45 g/l limit: 70% of people with GBS had raised protein [[Bourque2019]].`,
  w2:`Second week: every limit reached statistically similar sensitivities of 74–87% [[Bourque2019]].`},
 age:{d3:`Days 0–3, age-adjusted limits: 32% of people with GBS had raised protein [[Bourque2019]].`,
  w1:`First week, age-adjusted limits: 45% [[Bourque2019]].`,
  w2:`Second week: every limit reached statistically similar sensitivities of 74–87% [[Bourque2019]].`},
 nr:'not reported for this limit',of:'of 100 people with GBS'};

inits.csf=()=>{
  const T=(x,y,s,c='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${s}</text>`;
  const INK='fill:var(--ink);font-weight:700';
  const rr=rng(23),SPK=Array.from({length:40},()=>[rr(),rr()]),CEL=[ [.3,.62],[.7,.3],[.55,.85] ];
  /* ---------- main player ---------- */
  const svg=$('#csSvg'),rg=$('#csT'),note=$('#csNote');let setSt=()=>{};
  function spine(t){let s='';
    s+=`<rect x="40" y="58" width="14" height="256" rx="4" style="fill:var(--skin)"/>`;
    [92,152,212,272].forEach(y=>{s+=`<rect x="62" y="${y-18}" width="50" height="36" rx="12" style="fill:var(--panel-2);stroke:var(--ink);stroke-width:1;opacity:.9"/>`});
    s+=`<rect x="122" y="54" width="30" height="262" rx="6" style="fill:var(--csf);stroke:var(--line)"/>`;
    for(let i=0;i<4;i++){let d=`M${128+i*6} 60`;for(let y=60;y<=312;y+=12)d+=`L${f1(128+i*6+Math.sin(y/14+i)*1.6)} ${y}`;s+=`<path d="${d}" style="fill:none;stroke:var(--axon-line);stroke-width:1;opacity:.7"/>`}
    [92,152,212,272].forEach(y=>{s+=`<rect x="162" y="${y-24}" width="64" height="48" rx="9" style="fill:var(--panel-2);stroke:var(--ink);stroke-width:1"/>`});
    [122,182,242].forEach(y=>{s+=`<line x1="164" x2="224" y1="${y}" y2="${y}" style="stroke:var(--muted);stroke-width:3;opacity:.5"/>`});
    /* needle */
    const adv=ease(ramp(t,.01,.08)),tip=lerp(46,140,adv),tail=tip-118;
    s+=`<line x1="${f1(tail)}" y1="182" x2="${f1(tip)}" y2="182" style="stroke:var(--device);stroke-width:2.6;stroke-linecap:round"/><rect x="${f1(tail-12)}" y="176" width="14" height="12" rx="3" style="fill:var(--device)"/>`;
    /* drips into a small tube under the hub */
    const fill=ramp(t,.07,.15),hx=tail-5;
    if(adv>=1){for(let k=0;k<3;k++){const u=((t*30)+k/3)%1;if(t<.16||t>.2)s+=`<circle cx="${f1(hx)}" cy="${f1(196+u*26)}" r="2.4" style="fill:var(--csf);stroke:var(--dx);stroke-width:.8;opacity:${f1(1-u*.6)}"/>`}}
    s+=`<path d="M${f1(hx-11)} 226V292Q${f1(hx-11)} 302 ${f1(hx)} 302Q${f1(hx+11)} 302 ${f1(hx+11)} 292V226" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.2"/>`;
    if(fill>0){const top=lerp(298,240,fill);s+=`<path d="M${f1(hx-10)} ${f1(top)}V292Q${f1(hx-10)} 301 ${f1(hx)} 301Q${f1(hx+10)} 301 ${f1(hx+10)} 292V${f1(top)}Z" style="fill:var(--csf)"/>`}
    s+=kitLabel(137,330,CS_TXT.canal,{a:'m'})+kitLabel(194,345,CS_TXT.vert,{a:'m'})+kitLabel(Math.max(2,tail-12),170,CS_TXT.needle);
    return {svg:s,tube:[hx,240]}}
  function draw(t){const N=vb(svg,'720 400','400 712'),p=phaseOf(CS_STEPS,t),P=CS_STEPS[p],day=csDay(t);
    const L=N?{tx:12,ty:22,mx:282,my:76,mw:56,mh:212,cx:46,cy:400,cw:338,ch:190,ry:310}
             :{tx:16,ty:24,mx:262,my:76,mw:56,mh:212,cx:410,cy:70,cw:294,ch:198,ry:310};
    let s=T(L.tx,L.ty,P.sv,'t-big')+T(L.tx,L.ty+16,P.sub,'t-sm');
    const S=spine(t);s+=S.svg;
    /* magnified tube */
    const fill=ramp(t,.07,.15),mx=L.mx,my=L.my,mw=L.mw,mh=L.mh;
    s+=T(mx+mw/2,my-10,p===5?CS_TXT.ivig:CS_TXT.mag,'t-xs t-mid',p===5?'fill:var(--warn);font-weight:700':INK);
    s+=`<path d="M${mx} ${my}V${my+mh-mw/2}A${mw/2} ${mw/2} 0 0 0 ${mx+mw} ${my+mh-mw/2}V${my}" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.4"/>`;
    if(fill>0){const top=lerp(my+mh-4,my+24,fill),id='csClip';
      s+=`<clipPath id="${id}"><path d="M${mx+2} ${f1(top)}V${my+mh-mw/2}A${mw/2-2} ${mw/2-2} 0 0 0 ${mx+mw-2} ${my+mh-mw/2}V${f1(top)}Z"/></clipPath><rect x="${mx}" y="${f1(top)}" width="${mw}" height="${mh}" style="fill:var(--csf)" clip-path="url(#${id})"/>`;
      const n=Math.round(lerp(4,26,ramp(day,1,12)))+(p===5?6:0);
      SPK.slice(0,n).forEach(([a,b],i)=>{const x=mx+8+a*(mw-16),y=lerp(top+10,my+mh-12,b);
        s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="2.6" style="fill:var(--protein);${p===5&&i>=n-6?'stroke:var(--warn);stroke-dasharray:2 1.5;fill-opacity:.4':''}" clip-path="url(#${id})"/>`});
      CEL.slice(0,p>=4?2:1).forEach(([a,b])=>{const x=mx+8+a*(mw-16),y=lerp(top+10,my+mh-14,b);s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="6" style="fill:var(--cell);stroke:var(--ink);stroke-width:.8"/><circle cx="${f1(x-1)}" cy="${f1(y)}" r="2.4" style="fill:var(--ink);opacity:.45"/>`})}
    /* legend and readout under the tube */
    const ly=L.ry;s+=`<circle cx="${mx+4}" cy="${ly-3}" r="2.8" style="fill:var(--protein)"/>`+T(mx+12,ly,CS_TXT.prot)+`<circle cx="${mx+4}" cy="${ly+12}" r="5" style="fill:var(--cell);stroke:var(--ink);stroke-width:.8"/>`+T(mx+12,ly+15,CS_TXT.cell);
    if(fill>.5){const R=day<=3?CS_TXT.early:day<=7?CS_TXT.mid:CS_TXT.late;R.forEach((r,i)=>{s+=T(mx-4,ly+36+i*13,r,i===R.length-1?'t-sm':'t-xs',i===R.length-1?INK:'')})}
    /* the chart */
    const c=curve(L.cx,L.cy,L.cw,L.ch,()=>0,{x0:0,x1:21,y0:0,y1:100,upto:0}),X=c.X,Y=c.Y;
    s+=c.svg+T(L.cx,L.cy-8,CS_TXT.chart,'t-xs',INK);
    [50,100].forEach(v=>{s+=`<line x1="${f1(L.cx)}" x2="${f1(L.cx+L.cw)}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/>`+T(L.cx-5,Y(v)+3,v+'%','t-xs t-end')});
    s+=T(L.cx-5,Y(0)+3,'0','t-xs t-end');
    [0,7,14,21].forEach(d=>{s+=T(X(d),L.cy+L.ch+14,d?d/7+' wk':'onset','t-xs t-mid')});
    const dim=p===5?.5:1;let g=`<g style="opacity:${dim}">`;
    CS_WIN.forEach(w=>{const a=ramp(day,w.show-.5,w.show);if(a<=0)return;const col=w.s==='f'?'var(--accent)':'var(--dx)',y=Y(w.v);
      g+=`<g style="opacity:${f1(a)}">`;
      if(w.d0===w.d1)g+=`<rect x="${f1(X(w.d0)-5)}" y="${f1(y-5)}" width="10" height="10" transform="rotate(45 ${f1(X(w.d0))} ${f1(y)})" style="fill:${col};stroke:var(--panel);stroke-width:1.5"/>`;
      else g+=`<rect x="${f1(X(w.d0))}" y="${f1(y-3.5)}" width="${f1(X(w.d1)-X(w.d0))}" height="7" rx="3.5" style="fill:${col};${w.s==='f'?'opacity:.85':''}"/>`;
      const lx=w.d0===w.d1?X(w.d0)+8:X(w.d0)+2;g+=kitLabel(lx,w.pos==='above'?y-9:y+17,w.lab,{halo:'var(--field)'});g+='</g>'});
    g+='</g>';s+=g;
    if(day>0&&day<21||p>=1&&p<=3){const x=X(day);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${f1(L.cy)}" y2="${f1(L.cy+L.ch)}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:3 3"/>`}
    /* legend */
    const lgy=L.cy+L.ch+32;s+=`<rect x="${f1(L.cx)}" y="${f1(lgy-8)}" width="9" height="9" transform="rotate(45 ${f1(L.cx+4.5)} ${f1(lgy-3.5)})" style="fill:var(--accent)"/>`+T(L.cx+14,lgy,CS_TXT.lf)+`<rect x="${f1(L.cx+110)}" y="${f1(lgy-7)}" width="22" height="7" rx="3.5" style="fill:var(--dx)"/>`+T(L.cx+138,lgy,CS_TXT.li);
    /* cells bar */
    const ca=ramp(t,.7,.74);if(ca>0){const by=lgy+30;let x=L.cx;let cg=`<g style="opacity:${f1(ca)}">`+T(L.cx,by-6,CS_TXT.cells,'t-xs',INK);
      const cols=[ ['var(--dx-soft)','var(--dx)'],['var(--warn-soft)','var(--warn)'],['var(--bad-soft)','var(--bad)'] ];
      CS_CELLS.forEach((v,i)=>{const w=L.cw*v/100*ease(ca);cg+=`<rect x="${f1(x)}" y="${f1(by)}" width="${f1(Math.max(2,w))}" height="14" style="fill:${cols[i][0]};stroke:${cols[i][1]};stroke-width:1.2"/>`;x+=w});
      cg+=T(L.cx,by+28,CS_TXT.c1,'t-xs','fill:var(--ink)')+T(L.cx+L.cw,by+28,CS_TXT.c2,'t-xs t-end','fill:var(--ink)');s+=cg+'</g>'}
    svg.innerHTML=s;setSt(p);note.innerHTML=noteHTML(P)}
  const stop=playWire(rg,$('#csPlay'),draw,16000,'%t:player.replay%','csf');
  setSt=stepWire($('#csSteps'),CS_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- sample reader ---------- */
  const rd=$('#csRead'),ro=$('#csReadOut'),pv=$('#csProtV');
  function readUpd(){const age=+$('#csAge').value,pr=+$('#csProt').value,ce=+$('#csCells').value,dy=+$('#csDay').value,iv=$('#csIvig').checked,lim=CS_AGE[age];
    pv.textContent=pr.toFixed(2)+' g/l';
    vb(rd,'400 200','400 200');const x0=16,x1=384,X=v=>x0+(x1-x0)*v/2;
    let s=T(x0,14,'CSF protein, g/l','t-xs',INK);
    s+=`<rect x="${x0}" y="56" width="${x1-x0}" height="14" rx="7" style="fill:var(--panel-2)"/><rect x="${x0}" y="56" width="${f1(X(pr)-x0)}" height="14" rx="7" style="fill:${pr>lim?'var(--protein)':'var(--dx)'};opacity:.8"/>`;
    [0,.5,1,1.5,2].forEach(v=>{s+=T(X(v),100,v.toFixed(1),'t-xs '+(v===0?'':v===2?'t-end':'t-mid'))});
    s+=`<line x1="${f1(X(.45))}" x2="${f1(X(.45))}" y1="48" y2="76" style="stroke:var(--ink);stroke-width:2"/>`+T(X(.45)-4,46,'fixed 0.45','t-xs t-end',INK);
    s+=`<line x1="${f1(X(lim))}" x2="${f1(X(lim))}" y1="52" y2="80" style="stroke:var(--ink);stroke-width:2;stroke-dasharray:3 2"/>`+T(X(lim)+4,88,`age ${age}: ${lim.toFixed(2)}`,'t-xs',INK);
    const vx=X(pr);s+=`<path d="M${f1(vx-6)} 42L${f1(vx+6)} 42L${f1(vx)} 52Z" style="fill:var(--ink)"/>`+T(Math.min(Math.max(vx,x0+30),x1-30),34,pr.toFixed(2)+' g/l','t-sm t-mid',INK);
    /* cells */
    const band=ce===0?0:ce===3?2:1,sw=(x1-x0)/3,cy=134;s+=T(x0,124,'White cells per µl','t-xs',INK);
    const cols=[ ['var(--dx-soft)','var(--dx)'],['var(--warn-soft)','var(--warn)'],['var(--bad-soft)','var(--bad)'] ];
    CS_CELLBAND.forEach((b,i)=>{const on=i===band;s+=`<rect x="${f1(x0+i*sw+1)}" y="${cy}" width="${f1(sw-2)}" height="24" rx="5" style="fill:${cols[i][0]};stroke:${cols[i][1]};stroke-width:${on?2.6:1};opacity:${on?1:.5}"/>`+T(x0+i*sw+sw/2,cy+16,b,'t-xs t-mid',`fill:${cols[i][1]};font-weight:700`)});
    s+=`<path d="M${f1(x0+band*sw+sw/2-6)} ${cy+36}L${f1(x0+band*sw+sw/2+6)} ${cy+36}L${f1(x0+band*sw+sw/2)} ${cy+28}Z" style="fill:var(--ink)"/>`+T(x0+band*sw+sw/2,cy+50,'this sample','t-xs t-mid',INK);
    rd.innerHTML=s;
    const L=[pr>lim?CS_RD.aboveBoth:pr>.45?CS_RD.aboveFixed:CS_RD.below];
    if(pr<=lim)L.push(dy===0?CS_RD.early0:dy===1?CS_RD.early1:CS_RD.late);
    L.push(CS_RD['c'+ce]);
    if(pr>.45&&ce===0)L.push(CS_RD.acd);
    if(iv)L.push(CS_RD.ivig);
    ro.innerHTML=`<div class="kicker">What the sources say</div><h4>${pr.toFixed(2)} g/l, ${CS_CELLBAND[band]} cells/µl</h4><ul class="csout">${L.map(x=>`<li>${x}</li>`).join('')}</ul>`}
  ['csAge','csCells','csDay','csIvig'].forEach(i=>$('#'+i).addEventListener('change',readUpd));$('#csProt').addEventListener('input',readUpd);
  readUpd();

  /* ---------- sensitivity icon array ---------- */
  const se=$('#csSens'),scap=$('#csSensCap');let lim='fixed',win='w1';
  function sensDraw(){const N=vb(se,'720 130','400 330'),v=CS_SENS[lim][win],lo=v==null?0:Array.isArray(v)?v[0]:v,hi=v==null?0:Array.isArray(v)?v[1]:v;
    const cols=N?10:20,sz=N?17:15,gp=N?6:4,x0=16,y0=16;let s='';
    for(let i=0;i<100;i++){const cx=x0+(i%cols)*(sz+gp)+sz/2,cy=y0+Math.floor(i/cols)*(sz+gp)+sz/2,on=i<lo,mid=i>=lo&&i<hi;
      s+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(sz*.42)}" style="fill:${on?'var(--dx)':mid?'var(--dx-soft)':'var(--panel-2)'};stroke:${mid?'var(--dx)':'none'};stroke-width:1.2;${mid?'stroke-dasharray:2 2':''}"/>`}
    const tx=N?x0:x0+cols*(sz+gp)+28,ty=N?y0+10*(sz+gp)+34:y0+30;
    s+=T(tx,ty,v==null?'—':Array.isArray(v)?`${v[0]}–${v[1]}%`:v+'%','t-big','font-size:34px;fill:var(--dx)');
    s+=T(tx,ty+22,v==null?CS_SCAP.nr:CS_SCAP.of,'t-sm');
    if(Array.isArray(v))s+=`<circle cx="${tx+6}" cy="${ty+42}" r="6" style="fill:var(--dx-soft);stroke:var(--dx);stroke-dasharray:2 2"/>`+T(tx+18,ty+46,'range across limits','t-xs');
    se.innerHTML=s;scap.innerHTML=CS_SCAP[lim][win];
    $$('[data-csl]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.csl===lim));$$('[data-csw]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.csw===win))}
  $$('[data-csl]').forEach(b=>b.addEventListener('click',()=>{lim=b.dataset.csl;sensDraw()}));
  $$('[data-csw]').forEach(b=>b.addEventListener('click',()=>{win=b.dataset.csw;sensDraw()}));
  sensDraw();
  const prev=redraws.csf;redraws.csf=()=>{prev&&prev();readUpd();sensDraw()};
};
