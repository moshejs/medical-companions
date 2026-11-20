/* =============== 1.4 Shock and haemodynamics =============== */
/* ---- shared with 5.1 (othershock): a schematic circulation drawn as pump, pipes and tank ----
   shCircuit(x,y,w,h,o) draws, in the box, a heart (the pump) feeding an arterial pipe to a capillary bed, a
   venous pipe back to a reservoir (the tank, the blood volume) and a short return into the heart. Schematic only:
   no glyph encodes a measured value. o: {pump (0..1 strength), dim (0..1 heart muscle dims), tone (0 wide relaxed
   pipe .. 1 narrow; .5 normal), tank (0..1 level), flow (0..1.4 red-cell density), perf (0..1 capillaries open),
   leak (0..1 fluid escapes the capillary bed), bleed (0..1 drops lost from the tank), obs (0..1 obstruction),
   obsKind ('tamp' fluid round the heart, 'in' a pinched return, 'pe' a clot in the outflow), ph (cell phase),
   beat (beat phase), fail ([part,...] 'pump'|'pipes'|'tank'|'block' outlined), fv (0..1 outline opacity), id}. */
function shAlong(P,u){const L=[0];for(let i=1;i<P.length;i++)L.push(L[i-1]+Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]));
  const d=clamp(u)*L[L.length-1];for(let i=1;i<P.length;i++)if(d<=L[i]){const k=(d-L[i-1])/((L[i]-L[i-1])||1);return [lerp(P[i-1][0],P[i][0],k),lerp(P[i-1][1],P[i][1],k)]}
  return P[P.length-1]}
function shCircuit(x,y,w,h,o={}){
  const g=k=>o[k]==null?{pump:1,tone:.5,tank:.75,flow:1,perf:1}[k]||0:o[k];
  const pump=g('pump'),tone=g('tone'),tank=clamp(g('tank')),flow=g('flow'),perf=g('perf'),leak=clamp(g('leak')),bleed=clamp(g('bleed')),obs=clamp(g('obs')),dim=clamp(g('dim'));
  const kind=o.obsKind||'tamp',ph=o.ph||0,beat=o.beat||0,id=o.id||'shc',fail=o.fail||[],fv=o.fv==null?1:o.fv,k=Math.min(1.1,w/430);
  const s=Math.min(w*.21,h*.33),Px=x+w*.2,Py=y+h*.36;
  const bx=x+w*.62,by=y+h*.17,bw=w*.34,bh=h*.48;
  const tx=x+w*.05,ty=y+h*.64,tw=w*.3,th=h*.22;
  const A=[[Px+s*.18,Py-s*.34],[Px+s*.18,y+h*.06],[bx+bw*.12,y+h*.06],[bx+bw*.12,by+6]];
  const V=[[bx+bw*.88,by+bh-6],[bx+bw*.88,y+h*.78],[tx+tw,y+h*.78]];
  const R=[[tx+tw*.5,ty],[tx+tw*.5,Py+s*.36]];
  const aw=lerp(21,6,clamp(tone))*k,vw=11*k;
  const pipe=(P,wd,col)=>`<path d="${ptsD(P)}" style="fill:none;stroke:var(--wall);stroke-width:${f1(wd+4)};stroke-linejoin:round;stroke-linecap:round"/><path d="${ptsD(P)}" style="fill:none;stroke:${col};stroke-width:${f1(wd)};stroke-linejoin:round;stroke-linecap:round"/>`;
  let sv=`<defs>${marker(id+'A','var(--muted)',6)}</defs>`;
  /* the tank: a reservoir whose level is the blood volume */
  sv+=`<rect x="${f1(tx)}" y="${f1(ty)}" width="${f1(tw)}" height="${f1(th)}" rx="7" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.4"/>`;
  const lv=th*.9*tank;if(lv>.5)sv+=`<rect x="${f1(tx+2)}" y="${f1(ty+th-2-lv)}" width="${f1(tw-4)}" height="${f1(lv)}" rx="5" style="fill:var(--deoxy);opacity:.5"/>`;
  sv+=`<text x="${f1(tx+tw/2)}" y="${f1(ty+12)}" class="t-xs t-mid" style="fill:var(--ink);font-weight:600">TANK · blood volume</text>`;
  /* pipes */
  sv+=pipe(V,vw,'var(--blood-soft)')+pipe(R,vw,'var(--blood-soft)')+pipe(A,aw,'var(--blood-soft)');
  sv+=`<path d="M${f1(lerp(A[1][0],A[2][0],.42))} ${f1(A[1][1])}h${f1(24*k)}" style="stroke:var(--muted);stroke-width:1.3" marker-end="url(#${id}A)"/>`;
  sv+=`<path d="M${f1(lerp(V[1][0],V[2][0],.4))} ${f1(V[1][1])}h${f1(-24*k)}" style="stroke:var(--muted);stroke-width:1.3" marker-end="url(#${id}A)"/>`;
  /* red cells: oxygenated going out, deoxygenated coming back; density follows flow */
  const na=Math.round(3+7*clamp(flow,0,1.4)),VR=V.concat(R.slice());
  for(let i=0;i<na;i++){const u=(i/na+ph*.3)%1,p=shAlong(A,u);sv+=`<ellipse cx="${f1(p[0])}" cy="${f1(p[1])}" rx="${f1(Math.min(5,aw*.32))}" ry="${f1(Math.min(2.8,aw*.2))}" style="fill:var(--oxy)"/>`;
    const q=shAlong(V,u);sv+=`<ellipse cx="${f1(q[0])}" cy="${f1(q[1])}" rx="3.6" ry="2.2" style="fill:var(--deoxy)"/>`;
    if(i%2===0){const r2=shAlong(R,u);sv+=`<ellipse cx="${f1(r2[0])}" cy="${f1(r2[1])}" rx="2.2" ry="3.4" style="fill:var(--deoxy)"/>`}}
  /* the capillary bed (from the kit), with fluid leaking out as the lining fails */
  sv+=capbed(bx,by,bw,bh,{perf,ph:ph*.6,seed:7}).svg;
  sv+=`<text x="${f1(bx+bw*.56)}" y="${f1(by-6)}" class="t-xs t-mid" style="fill:var(--ink);font-weight:600">PIPES · vessels</text>`;
  if(leak>.02)for(let i=0;i<6;i++){const kk=(ph*1.4+i*.19)%1,dx=bx+bw*(.2+.12*i),dy=by+bh+4+kk*h*.05;
    sv+=`<path d="M${f1(dx)} ${f1(dy-3)}C${f1(dx+2.4)} ${f1(dy)} ${f1(dx+1.8)} ${f1(dy+2.6)} ${f1(dx)} ${f1(dy+2.6)}C${f1(dx-1.8)} ${f1(dy+2.6)} ${f1(dx-2.4)} ${f1(dy)} ${f1(dx)} ${f1(dy-3)}Z" style="fill:var(--fluid);opacity:${f1(leak*(1-kk*.7))}"/>`}
  if(leak>.3)sv+=`<text x="${f1(bx-6)}" y="${f1(by+bh+h*.06)}" class="t-xs t-end" style="fill:var(--fluid);font-weight:600;opacity:${f1(ramp(leak,.3,.6))}">fluid leaks out</text>`;
  /* blood lost from the tank */
  if(bleed>.02){for(let i=0;i<3;i++){const kk=(ph*1.2+i/3)%1,dx=tx+tw*(.22+i*.08),dy=ty+th+3+kk*h*.09;
      sv+=`<circle cx="${f1(dx)}" cy="${f1(dy)}" r="${f1(2.6*k+.6)}" style="fill:var(--oxy);opacity:${f1(bleed*(1-kk*.6))}"/>`}
    sv+=`<text x="${f1(tx+tw*.5)}" y="${f1(y+h*.985)}" class="t-xs" style="fill:var(--oxy);font-weight:600;opacity:${f1(bleed)}">blood or fluid lost</text>`}
  /* obstruction */
  if(obs>.02){if(kind==='in'){const m=shAlong(R,.45);sv+=`<path d="M${f1(m[0]-vw*1.6)} ${f1(m[1]-7)}l${f1(vw*1.6*obs*.75)} 7l${f1(-vw*1.6*obs*.75)} 7Z M${f1(m[0]+vw*1.6)} ${f1(m[1]-7)}l${f1(-vw*1.6*obs*.75)} 7l${f1(vw*1.6*obs*.75)} 7Z" style="fill:var(--ink);opacity:${f1(.4+.6*obs)}"/>`}
    else if(kind==='pe'){const m=shAlong(A,.18);sv+=`<path d="${smoothPath(blobPts(aw*.55*obs+2,9,.25,4).map(p=>[p[0]+m[0],p[1]+m[1]]))}" style="fill:var(--clot);opacity:${f1(.3+.7*obs)}"/>`}}
  /* the pump: a beating heart, squeezed by fluid in tamponade */
  const sq=kind==='tamp'?obs:0,sc=(1+.06*pump*Math.sin(beat*Math.PI*2))*(1-.16*sq);
  if(sq>.02)sv+=`<circle cx="${f1(Px)}" cy="${f1(Py)}" r="${f1(s*.56)}" style="fill:var(--fluid-soft);stroke:var(--fluid);stroke-width:${f1(1+9*sq*k)};opacity:${f1(.35+.6*sq)}"/>`;
  sv+=organ('heart',Px,Py,s*sc,{fail:dim});
  sv+=`<text x="${f1(x+4)}" y="${f1(y+h*.06+4)}" class="t-xs" style="fill:var(--ink);font-weight:600">PUMP · heart</text>`;
  /* outline the failing part */
  const box=(X,Y,W,H)=>`<rect x="${f1(X)}" y="${f1(Y)}" width="${f1(W)}" height="${f1(H)}" rx="9" style="fill:none;stroke:var(--bad);stroke-width:2;stroke-dasharray:5 4;opacity:${f1(fv)}"/>`;
  fail.forEach(p=>{if(p==='pump')sv+=box(Px-s*.62,Py-s*.62,s*1.24,s*1.24);
    else if(p==='pipes')sv+=box(bx-5,by-5,bw+10,bh+10);
    else if(p==='tank')sv+=box(tx-5,ty-5,tw+10,th+10);
    else if(p==='block'){if(kind==='tamp')sv+=box(Px-s*.66,Py-s*.66,s*1.32,s*1.32);else if(kind==='in'){const m=shAlong(R,.45);sv+=box(m[0]-vw*2,m[1]-12,vw*4,24)}else{const m=shAlong(A,.18);sv+=box(m[0]-aw-4,m[1]-aw-4,aw*2+8,aw*2+8)}}});
  return {svg:sv,at:{pump:[Px,Py],s,cap:[bx,by,bw,bh],tank:[tx,ty,tw,th]}}}
/* three bedside windows on perfusion (ESICM): skin, kidneys, brain. v = {skin, kid, brain} 0..1 worse */
function shWindows(x,y,w,v){const c=w/3;let s='';
  const sx=x+c*.5-22,sy=y;
  s+=`<rect x="${f1(sx)}" y="${f1(sy)}" width="44" height="34" rx="8" style="fill:var(--skin);stroke:var(--line)"/>`;
  [[10,9,6],[28,8,5],[20,22,7],[35,24,4.5],[8,25,4]].forEach((b,i)=>{s+=`<path d="${smoothPath(blobPts(b[2],7,.3,i+3).map(p=>[p[0]+sx+b[0],p[1]+sy+b[1]]))}" style="fill:var(--mottle);opacity:${f1(clamp(v.skin)*.85)}"/>`});
  s+=`<text x="${f1(x+c*.5)}" y="${f1(y+50)}" class="t-xs t-mid" style="fill:var(--ink)">skin</text><text x="${f1(x+c*.5)}" y="${f1(y+61)}" class="t-xs t-mid">mottling</text>`;
  s+=organ('kidney',x+c*1.5,y+16,34,{fail:v.kid})+`<text x="${f1(x+c*1.5)}" y="${f1(y+50)}" class="t-xs t-mid" style="fill:var(--ink)">kidneys</text><text x="${f1(x+c*1.5)}" y="${f1(y+61)}" class="t-xs t-mid">urine</text>`;
  s+=organ('brain',x+c*2.5,y+16,34,{fail:v.brain})+`<text x="${f1(x+c*2.5)}" y="${f1(y+50)}" class="t-xs t-mid" style="fill:var(--ink)">brain</text><text x="${f1(x+c*2.5)}" y="${f1(y+61)}" class="t-xs t-mid">alertness</text>`;
  return s}
const SH_N={pump:1,tone:.5,tank:.75,flow:1,perf:1,leak:0,bleed:0,obs:0,dim:0,map:1,co:1,skin:0,kid:0,brain:0,hr:1};
const SH_STEPS=[
 {from:0,at:.09,short:'normal',fail:[],kind:'tamp',sub:'all three parts working',flow:'normal',
  st:SH_N,
  k:'Scene 1 · the circuit',t:'Pump, pipes and tank',
  txt:`Cardiac output, the blood the heart pumps each minute, equals stroke volume times heart rate. It depends on four things: heart rate, contractility, preload and afterload [[Vincent2008CO]]. Preload is "the degree of myocardial distension prior to shortening": within limits, the more the muscle is stretched, the harder it contracts (Frank–Starling). Afterload is the force the ventricles eject against, set largely by arterial pressure and vascular tone [[Vincent2008CO]]. The RUSH bedside ultrasound exam checks the same three parts, the pump, the tank and the pipes, to identify the type of shock [[Perera2010RUSH]].`,
  pt:`The heart is a pump, the blood is the fluid in the tank, and the blood vessels are the pipes. Shock happens when one or more of these fails [[Perera2010RUSH]].`,
  hook:`CO = HR × SV. Its four determinants: heart rate, contractility, preload and afterload [[Vincent2008CO]].`},
 {from:1/6,at:1/6+.55/6,short:'distributive',fail:['pipes'],kind:'tamp',sub:'the pipes widen and leak',flow:'normal or high',
  st:{pump:1,tone:.02,tank:.66,flow:1.3,perf:.55,leak:.85,bleed:0,obs:0,dim:0,map:.52,co:1.22,skin:.5,kid:.55,brain:.45,hr:1.5},
  k:'Scene 2 · distributive',t:'The pipes fail',
  txt:`Distributive shock is "relative hypovolemia": the blood is still there, but widened, leaky vessels redistribute it [[Standl2018]]. It is the one hyperkinetic pattern of the four [[Cecconi2014ESICM]]: in sepsis, cardiac output is usually normal or high, because tachycardia and low vascular tone reduce afterload [[Vincent2008CO]]. Its subtypes are septic, anaphylactic and neurogenic shock, and Standl 2018 describes its treatment as vasoconstrictors plus fluid (quoted as published) [[Standl2018]].`,
  pt:`In septic shock the blood vessels relax and leak. The heart often pumps hard, but the pressure still falls [[Vincent2008CO,Singer2016Sepsis3]].`,
  hook:`Distributive = hyperkinetic: normal or high cardiac output with low vascular tone. Septic, anaphylactic, neurogenic [[Cecconi2014ESICM,Standl2018]].`},
 {from:2/6,at:2/6+.55/6,short:'cardiogenic',fail:['pump'],kind:'tamp',sub:'the pump weakens',flow:'low',
  st:{pump:.35,tone:.5,tank:.8,flow:.45,perf:.5,leak:0,bleed:0,obs:0,dim:.75,map:.5,co:.45,skin:.75,kid:.6,brain:.5,hr:1},
  k:'Scene 3 · cardiogenic',t:'The pump fails',
  txt:`In cardiogenic shock, primary pump failure lowers cardiac output: a low-flow state [[Vincent2008CO,Cecconi2014ESICM]]. Standl 2018 gives criteria of a cardiac index below 1.8 L/min/m² without support (below 2.0 with drug or mechanical support) together with a systolic pressure below 90 mmHg [[Standl2018]]. It occurs in up to 10% of people straight after a heart attack, and opening the blocked artery is the only treatment supported by randomised trials [[Samsky2021]]. The trials are in <a href="#othershock" data-go="othershock">module 5.1</a>.`,
  pt:`When heart muscle is badly damaged, for example by a heart attack, it cannot pump enough blood round the body, so the organs go short [[Samsky2021]].`,
  hook:`Cardiogenic shock: cardiac index &lt;1.8 L/min/m² without support plus SBP &lt;90 mmHg [[Standl2018]].`},
 {from:3/6,at:3/6+.55/6,short:'hypovolaemic',fail:['tank'],kind:'tamp',sub:'the tank drains',flow:'low',
  st:{pump:1,tone:.5,tank:.14,flow:.45,perf:.5,leak:0,bleed:1,obs:0,dim:0,map:.5,co:.45,skin:.75,kid:.6,brain:.5,hr:1},
  k:'Scene 4 · hypovolaemic',t:'The tank runs low',
  txt:`Hypovolaemic shock is loss of intravascular volume [[Standl2018]]. Standl 2018 splits it into haemorrhagic shock, traumatic haemorrhagic shock (bleeding plus tissue injury), hypovolaemic shock in the narrow sense (plasma loss without bleeding, as in persistent vomiting and diarrhoea such as cholera, or hyperthermia) and traumatic hypovolaemic shock such as large burns [[Standl2018]]. Venous return equals cardiac output, so with less blood coming back the heart has less to pump: a low-flow state [[Vincent2008CO,Cecconi2014ESICM]]. Standl 2018 says it is treated by fluid replacement with balanced crystalloids (quoted as published) [[Standl2018]].`,
  pt:`If the body loses a lot of blood or fluid, from bleeding, severe vomiting and diarrhoea, or burns, there is not enough left for the heart to pump round [[Standl2018]].`,
  hook:`Four hypovolaemic subtypes: haemorrhagic, traumatic haemorrhagic, hypovolaemic in the narrow sense, traumatic hypovolaemic (burns) [[Standl2018]].`},
 {from:4/6,at:4/6+.55/6,short:'obstructive',fail:['block'],kind:'tamp',sub:'fluid squeezes the heart',flow:'low',
  st:{pump:.8,tone:.5,tank:.78,flow:.4,perf:.45,leak:0,bleed:0,obs:1,dim:0,map:.45,co:.4,skin:.75,kid:.6,brain:.55,hr:1},
  k:'Scene 5 · obstructive',t:'Something blocks the flow',
  txt:`In obstructive shock, hypoperfusion comes from raised resistance or a blockage of flow [[Standl2018]]. Vena cava compression, tension pneumothorax and pericardial tamponade (shown: fluid squeezing the heart) reduce filling; pulmonary embolism or a mediastinal mass raise the load on the right ventricle [[Standl2018]]. It is likely the rarest type, 1–2% of shock in Standl's table, and Standl 2018 says it "shall be treated with an immediate life-saving intervention" [[Standl2018]].`,
  pt:`Sometimes the heart and blood are fine but something is in the way, such as fluid squeezing the heart, trapped air pressing on it, or a large clot in the lungs. The blockage has to be relieved quickly [[Standl2018]].`,
  hook:`Obstructive: tamponade, tension pneumothorax, vena cava compression (low preload); pulmonary embolism (high RV afterload) [[Standl2018]].`},
 {from:5/6,at:5/6+.55/6,short:'mixed',fail:['pipes','pump'],kind:'tamp',sub:'wide, leaky pipes and a tired pump',flow:'often normal',
  st:{pump:.6,tone:.05,tank:.45,flow:.85,perf:.45,leak:.85,bleed:0,obs:0,dim:.4,map:.45,co:.9,skin:.65,kid:.65,brain:.55,hr:1.4},
  k:'Scene 6 · mixed',t:'Septic shock is often mixed',
  txt:`"Shock can be due to a combination of processes" [[Cecconi2014ESICM]], and Standl 2018 calls septic shock "a mixed form of a variety of pathologies" [[Standl2018]]. The vessels widen and leak, and the heart muscle can be depressed too: in 20 people with septic shock, all had a normal or high cardiac index, yet 10 had an ejection fraction below 0.40, which returned to normal in survivors within about 10 days [[Parker1984]]. Sepsis-3 identifies septic shock by a vasopressor requirement to keep MAP at 65 mmHg or more with lactate above 2 mmol/L despite adequate fluids, with hospital mortality above 40%, a population figure [[Singer2016Sepsis3]].`,
  pt:`In septic shock several things go wrong at once: the vessels relax and leak, and the heart can tire for a while. In many people the heart recovers over days [[Standl2018,Parker1984]].`,
  hook:`Sepsis-3 septic shock: a vasopressor for MAP ≥65 mmHg plus lactate &gt;2 mmol/L without hypovolaemia; hospital mortality &gt;40% [[Singer2016Sepsis3]].`}
];
function shMix(a,b,k){const o={};for(const q in a)o[q]=lerp(a[q],b[q]==null?a[q]:b[q],k);return o}
/* shock types by source: Cecconi 2014 (SOAP II split) and Standl 2018 table 1 */
const SH_FQ={
 soap:{rows:[['Septic (distributive)',62],['Cardiogenic',17],['Hypovolaemic',16],['Other types (remainder)',5]],
  cap:`SOAP II enrolled 1679 intensive care patients with shock in Europe (2003–2007): septic shock 62%, cardiogenic 17% and hypovolaemic 16% [[Cecconi2014ESICM]]; the trial report gives the counts as 1044, 280 and 263 [[DeBacker2010SOAPII]]. The last bar is simply what is left over (5%), not a reported category.`},
 pub:{rows:[['Distributive',66],['Cardiogenic',16],['Hypovolaemic',16],['Obstructive',2]],
  cap:`Standl 2018 tabulates the share of each type from published figures: distributive 66%, hypovolaemic 16%, cardiogenic 16% and obstructive 2%. Obstructive shock is likely the rarest type [[Standl2018]].`},
 calc:{rows:[['Distributive',59],['Cardiogenic',13],['Hypovolaemic',27],['Obstructive',1]],
  cap:`Standl 2018 also gives the authors' own calculation: distributive 59%, hypovolaemic 27%, cardiogenic 13% and obstructive 1% [[Standl2018]]. Shares depend on the setting: an ICU trial sees more septic shock, while a trauma centre sees more bleeding.`}
};
inits.shock=()=>{
  /* ---------- main: the circuit through six scenes ---------- */
  const svg=$('#shSvg'),rg=$('#shT'),note=$('#shNote'),rd=$('#shRead');
  let setSt=()=>{};
  function param(t){const i=Math.min(5,Math.floor(t*6)),u=t*6-i;
    const k=i===0?0:i===5?ease(ramp(u,0,.3)):ease(ramp(u,0,.3))*(1-ease(ramp(u,.86,1)));
    return {i,k,P:shMix(SH_N,SH_STEPS[i].st,k)}}
  function draw(t){const N=vb(svg,'720 390','400 620'),{i,k,P}=param(t),S=SH_STEPS[i];
    const L=N?{hx:14,hy:24,cx:10,cy:52,cw:380,ch:270,gx:96,gy:408,gr:46,fx:190,fy:360,fw:196,wx:10,wy:480,ww:380,px:12,py:582,pw:376}
             :{hx:16,hy:26,cx:10,cy:46,cw:450,ch:290,gx:590,gy:110,gr:54,fx:486,fy:166,fw:216,wx:474,wy:250,ww:236,px:16,py:352,pw:688};
    let s=`<text x="${L.hx}" y="${L.hy}" class="t-big" style="fill:${i?'var(--brand)':'var(--ink)'}">${S.t}</text><text x="${L.hx}" y="${L.hy+16}" class="t-sm">${S.sub}</text>`;
    s+=shCircuit(L.cx,L.cy,L.cw,L.ch,{...P,obsKind:S.kind,ph:t*30,beat:t*110*P.hr,fail:S.fail,fv:k,id:'shM'}).svg;
    /* pressure dial (schematic) */
    s+=gauge(L.gx,L.gy,L.gr,P.map*100,130,{ticks:false,bands:[{to:45,col:'var(--bad)'},{to:75,col:'var(--warn)'},{to:130,col:'var(--good)'}]});
    s+=`<text x="${L.gx}" y="${L.gy+30}" class="t-sm t-mid" style="fill:var(--ink);font-weight:600">blood pressure</text><text x="${L.gx-L.gr}" y="${L.gy+14}" class="t-xs t-mid">low</text><text x="${L.gx+L.gr}" y="${L.gy+14}" class="t-xs t-mid">normal</text>`;
    /* flow bar (schematic cardiac output) */
    const fw=L.fw,fx=L.fx,fy=L.fy,u0=1/1.4;
    s+=`<text x="${fx}" y="${fy}" class="t-sm" style="fill:var(--ink);font-weight:600">flow (cardiac output)</text>`;
    s+=`<rect x="${fx}" y="${fy+7}" width="${fw}" height="12" rx="4" style="fill:var(--panel-2)"/><rect x="${fx}" y="${fy+7}" width="${f1(fw*clamp(P.co/1.4))}" height="12" rx="4" style="fill:${P.co<.7?'var(--bad)':'var(--rx)'};opacity:.8"/>`;
    s+=`<line x1="${f1(fx+fw*u0)}" x2="${f1(fx+fw*u0)}" y1="${fy+3}" y2="${fy+23}" style="stroke:var(--ink);stroke-width:1.4"/><text x="${f1(fx+fw*u0)}" y="${fy+34}" class="t-xs t-mid">usual</text>`;
    s+=`<text x="${fx}" y="${fy+48}" class="t-xs">${N?'':'pattern: '}${i===0?'normal':i===1||i===5?'hyperkinetic (distributive)':'low flow'}</text>`;
    /* the three windows */
    s+=`<text x="${L.wx+L.ww/2}" y="${L.wy-10}" class="t-sm t-mid" style="fill:var(--ink);font-weight:600">three windows on perfusion</text>`;
    s+=shWindows(L.wx,L.wy,L.ww,{skin:P.skin,kid:P.kid,brain:P.brain});
    /* scene strip */
    const sw=L.pw/6;SH_STEPS.forEach((q,j)=>{const on=j===i,xx=L.px+j*sw;
      s+=`<rect x="${f1(xx+1)}" y="${L.py}" width="${f1(sw-2)}" height="6" rx="3" style="fill:${on?(j?'var(--brand)':'var(--rx)'):'var(--panel-2)'}"/><text x="${f1(xx+sw/2)}" y="${L.py+20}" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:600':''}">${N?q.short.slice(0,7)+(q.short.length>7?'.':''):q.short}</text>`});
    s+=`<circle cx="${f1(L.px+L.pw*t)}" cy="${L.py+3}" r="5.5" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;
    svg.innerHTML=s;
    rd.innerHTML=`<span>Failing part <b>${i===0?'none':S.fail.map(f=>({pump:'pump',pipes:'pipes',tank:'tank',block:'blockage'}[f])).join(' + ')}</b></span><span>Flow <b>${S.flow}</b></span><span>Pressure <b>${i===0||k<.3?'holding':'falling'}</b></span>`;
    note.innerHTML=noteHTML(SH_STEPS[i]);setSt(i)}
  const stop=playWire(rg,$('#shPlay'),draw,36000,'Replay','shock');
  setSt=stepWire($('#shSteps'),SH_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- shock types by source ---------- */
  const fq=$('#shFq'),fqCap=$('#shFqCap');let fqCur='soap',fqVals=SH_FQ.soap.rows.map(r=>r[1]),fqStop=null;
  function drawFq(vals,key){const N=vb(fq,'720 220','400 260'),R=SH_FQ[key].rows;
    const lx=N?12:16,bx0=N?12:210,bw=N?320:440,rh=N?54:44,y0=N?26:30;let s='';
    s+=`<text x="${lx}" y="${y0-10}" class="t-xs">share of shock, %</text>`;
    R.forEach((r,j)=>{const y=y0+j*rh+(N?16:0),v=vals[j],w=bw*v/70,col=j===0?'var(--brand)':j===3?'var(--muted)':'var(--dx)';
      s+=`<text x="${N?lx:bx0-10}" y="${f1(N?y-5:y+14)}" class="t-sm${N?'':' t-end'}" style="fill:var(--ink);font-weight:600">${r[0]}</text>`;
      s+=`<rect x="${bx0}" y="${y}" width="${bw}" height="20" rx="5" style="fill:var(--panel-2)"/><rect x="${bx0}" y="${y}" width="${f1(Math.max(0,w))}" height="20" rx="5" style="fill:${col};opacity:${key==='soap'&&j===3?.45:.85}"/>`;
      s+=`<text x="${f1(bx0+Math.max(0,w)+8)}" y="${y+15}" class="t-sm" style="fill:var(--ink);font-weight:700">${Math.round(v)}%</text>`});
    fq.innerHTML=s}
  function setFq(key){if(fqStop)fqStop();const from=fqVals.slice(),to=SH_FQ[key].rows.map(r=>r[1]);fqCur=key;
    $$('[data-fq]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.fq===key));fqCap.innerHTML=SH_FQ[key].cap;
    fqStop=animate(600,p=>{fqVals=from.map((v,j)=>lerp(v,to[j],ease(p)));drawFq(fqVals,key)},()=>{fqStop=null})}
  $$('[data-fq]').forEach(b=>b.addEventListener('click',()=>setFq(b.dataset.fq)));
  fqCap.innerHTML=SH_FQ.soap.cap;drawFq(fqVals,'soap');

  /* ---------- sandbox: build a blood pressure ---------- */
  const lab=$('#shLab'),hr=$('#shHr'),sv=$('#shSv'),tn=$('#shTone'),lo=$('#shLabOut');
  const PRE={start:[75,70,1],tone:[75,70,.5],tonehr:[120,75,.5],sv:[75,35,1],svhr:[120,35,1]},CO0=75*70/1000;
  function drawLab(){const H=+hr.value,S=+sv.value,T=+tn.value,co=H*S/1000,rel=co/CO0,map=rel*T;
    $('#shHrO').textContent=H+' /min';$('#shSvO').textContent=S+' mL';$('#shToneO').textContent='×'+T.toFixed(2);
    const pk=Object.keys(PRE).find(q=>PRE[q][0]===H&&PRE[q][1]===S&&Math.abs(PRE[q][2]-T)<.005);
    $$('[data-pre]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.pre===pk));
    let s=`<defs>${marker('shLA','var(--muted)',6)}</defs>`;
    const hs=40+S*.36,pw=lerp(30,6,ramp(T,.4,1.8));
    s+=`<text x="12" y="18" class="t-sm" style="fill:var(--ink);font-weight:600">pump</text><text x="140" y="18" class="t-sm" style="fill:var(--ink);font-weight:600">pipes</text><text x="318" y="18" class="t-sm t-mid" style="fill:var(--ink);font-weight:600">pressure</text>`;
    s+=`<path d="M100 92H238" style="stroke:var(--wall);stroke-width:${f1(pw+5)};stroke-linecap:round"/><path d="M100 92H238" style="stroke:var(--blood-soft);stroke-width:${f1(pw)};stroke-linecap:round"/>`;
    const nc=Math.max(2,Math.round(rel*5));for(let i=0;i<nc;i++){const cx=lerp(112,226,(i+.5)/nc);s+=`<ellipse cx="${f1(cx)}" cy="92" rx="${f1(Math.min(6,pw*.32))}" ry="${f1(Math.min(3,pw*.2))}" style="fill:var(--oxy)"/>`}
    s+=`<path d="M146 ${f1(92+pw/2+12)}h40" style="stroke:var(--muted);stroke-width:1.3" marker-end="url(#shLA)"/><text x="168" y="${f1(92+pw/2+28)}" class="t-xs t-mid">tone ×${T.toFixed(2)}</text>`;
    s+=organ('heart',60,92,hs,{});
    s+=`<text x="60" y="${f1(92+hs*.5+16)}" class="t-xs t-mid">${S} mL × ${H}/min</text>`;
    s+=gauge(318,104,52,clamp(map,0,2)*100,200,{ticks:false,bands:[{to:70,col:'var(--bad)'},{to:90,col:'var(--warn)'},{to:200,col:'var(--good)'}]});
    s+=`<text x="318" y="128" class="t-big t-mid">${Math.round(map*100)}%</text><text x="318" y="142" class="t-xs t-mid">of the start</text>`;
    const bar=(y,lbl,val,max,txt,col)=>`<text x="12" y="${y}" class="t-sm" style="fill:var(--ink)">${lbl}</text><text x="388" y="${y}" class="t-sm t-end" style="fill:var(--ink);font-weight:700">${txt}</text><rect x="12" y="${y+6}" width="376" height="12" rx="4" style="fill:var(--panel-2)"/><rect x="12" y="${y+6}" width="${f1(376*clamp(val/max))}" height="12" rx="4" style="fill:${col};opacity:.85"/>`;
    s+=bar(186,'flow (cardiac output)',co,16,co.toFixed(1)+' L/min','var(--rx)');
    s+=bar(232,'oxygen delivery (relative)',rel,3,Math.round(rel*100)+'%','var(--oxy)');
    lab.innerHTML=s;
    const d=Math.round(map*100);
    lo.innerHTML=`Cardiac output <b>${co.toFixed(2)} L/min</b> (${S} mL × ${H} beats a minute). In this model the pressure is <b>${d}%</b> of the starting value${d<95?', a fall of '+(100-d)+'%':d>105?', a rise of '+(d-100)+'%':''}, and oxygen delivery is <b>${Math.round(rel*100)}%</b>.${T<.8&&rel>1.1&&d<95?' Output is high, yet the pressure is still low: the pipes are too wide.':''}`}
  [hr,sv,tn].forEach(e=>e.addEventListener('input',drawLab));
  $$('[data-pre]').forEach(b=>b.addEventListener('click',()=>{const p=PRE[b.dataset.pre];hr.value=p[0];sv.value=p[1];tn.value=p[2];drawLab()}));
  drawLab();

  /* ---------- bedside numbers: MAP and shock index ---------- */
  const sb=$('#shSbp'),db=$('#shDbp'),hb=$('#shHrB'),cv=$('#shCalcV'),co=$('#shCalcOut'),si=$('#shSi');
  function drawSi(v){const X=x=>20+360*(clamp(x,.3,1.8)-.3)/1.5;let s='';
    s+=`<rect x="20" y="34" width="360" height="20" rx="5" style="fill:var(--panel-2)"/>`;
    s+=`<rect x="${f1(X(.5))}" y="34" width="${f1(X(.7)-X(.5))}" height="20" style="fill:var(--good);opacity:.55"/><rect x="${f1(X(.7))}" y="34" width="${f1(X(.9)-X(.7))}" height="20" style="fill:var(--warn);opacity:.3"/><rect x="${f1(X(1))}" y="34" width="${f1(X(1.8)-X(1))}" height="20" rx="5" style="fill:var(--bad);opacity:.25"/>`;
    [.3,.6,1,1.4,1.8].forEach(q=>{s+=`<line x1="${f1(X(q))}" x2="${f1(X(q))}" y1="54" y2="60" class="axis"/><text x="${f1(X(q))}" y="70" class="t-xs t-mid">${q}</text>`});
    s+=`<text x="${f1((X(.5)+X(.7))/2)}" y="86" class="t-xs t-mid" style="fill:var(--good)">0.5–0.7 usual</text><text x="${f1(X(1.35))}" y="86" class="t-xs t-mid" style="fill:var(--bad)">&gt;1.0 higher mortality</text>`;
    s+=`<text x="20" y="106" class="t-xs">trauma groups (Mutschler 2013):</text>`;
    [[.3,.6,'10.9%'],[.6,1,''],[1,1.4,''],[1.4,1.8,'39.8%']].forEach((g,j)=>{s+=`<rect x="${f1(X(g[0])+1)}" y="112" width="${f1(X(g[1])-X(g[0])-2)}" height="8" rx="3" style="fill:var(--bad);opacity:${f1(.12+j*.2)}"/>`;if(g[2])s+=`<text x="${f1((X(g[0])+X(g[1]))/2)}" y="136" class="t-xs t-mid" style="fill:var(--ink)">${g[2]} died</text>`});
    if(v!=null){const mx=X(v);s+=`<path d="M${f1(mx)} 32l-6 -9h12z" style="fill:var(--ink)"/><line x1="${f1(mx)}" x2="${f1(mx)}" y1="32" y2="56" style="stroke:var(--ink);stroke-width:2.4"/><text x="${f1(clamp(mx,40,360))}" y="16" class="t-sm t-mid" style="fill:var(--ink);font-weight:700">SI ${v.toFixed(2)}</text>`}
    si.innerHTML=s}
  function calc(){const S=+sb.value,D=+db.value,H=+hb.value;
    if(!(S>0&&D>0&&H>0)||D>=S){cv.className='verdict no';cv.textContent='Enter a systolic pressure higher than the diastolic, and a heart rate.';co.innerHTML='';drawSi(null);return}
    const pp=S-D,m3=D+pp/3,m4=D+.412*pp,x=H/S;
    cv.className='verdict maybe';
    cv.textContent=`Shock index ${x.toFixed(2)} · MAP ${Math.round(m3)} mmHg`;
    co.innerHTML=`Pulse pressure <b>${pp} mmHg</b>. MAP by the traditional formula (DBP + ⅓ × pulse pressure): <b>${m3.toFixed(1)} mmHg</b>; with the 0.412 factor: <b>${m4.toFixed(1)} mmHg</b>. Shock index (HR ÷ SBP): <b>${x.toFixed(2)}</b>, ${x<.5?'below the 0.5–0.7 range usually quoted as normal':x<=.7?'inside the 0.5–0.7 range usually quoted as normal':x<1?'above the usual 0.5–0.7 range and below 1.0':'at or above 1.0, the range widely linked with higher mortality in the studies'}. These are formula results for study, not an assessment of anyone.`;
    drawSi(x)}
  [sb,db,hb].forEach(e=>e.addEventListener('input',calc));calc();
  redraws.shock=(()=>{const prev=redraws.shock;return()=>{prev&&prev();drawFq(fqVals,fqCur)}})();
};
