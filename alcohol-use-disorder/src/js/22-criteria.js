/* =============== 2.2 Diagnosis: DSM-5-TR criteria & severity =============== */
/* the 11 criteria, paraphrased (APA 2022), grouped in four clusters */
const CR_G=[{n:'Impaired control',c:'var(--dx)'},{n:'Social impairment',c:'var(--accent)'},{n:'Risky use',c:'var(--warn)'},{n:'Pharmacological',c:'var(--gaba)'}];
const CR_C=[
 {g:0,s:'Larger or longer',d:'than intended',l:'Drinking more, or for longer, than intended'},
 {g:0,s:'Cutting down fails',d:'persistent wish or efforts',l:'A persistent wish, or failed efforts, to cut down or control drinking'},
 {g:0,s:'Much time spent',d:'getting, using, recovering',l:'Much time spent getting alcohol, drinking or recovering'},
 {g:0,s:'Craving',d:'added in DSM-5',l:'Craving: a strong desire or urge to drink'},
 {g:1,s:'Role obligations',d:'major roles not met',l:'Failure to meet major role obligations at work, school or home'},
 {g:1,s:'Social problems',d:'continued despite them',l:'Continued drinking despite social or interpersonal problems'},
 {g:1,s:'Activities given up',d:'important ones dropped',l:'Important social, work or leisure activities given up'},
 {g:2,s:'Hazardous situations',d:'physically hazardous use',l:'Drinking in physically hazardous situations'},
 {g:2,s:'Health problems',d:'physical or psychological',l:'Continued drinking despite physical or psychological problems'},
 {g:3,s:'Tolerance',d:'pharmacological',l:'Tolerance'},
 {g:3,s:'Withdrawal',d:'pharmacological; see 3.1',l:'Withdrawal'}];
const CR_SEV=[{n:'No diagnosis',c:'var(--muted)',r:'0–1'},{n:'Mild',c:'var(--warn)',r:'2–3',p:7.3,a:30.1,tr:2.7},{n:'Moderate',c:'var(--accent)',r:'4–5',p:3.2,a:25.9,tr:4.9},{n:'Severe',c:'var(--bad)',r:'6–11',p:3.4,a:23.9,tr:21.3}];
const crSev=n=>n>=6?3:n>=4?2:n>=2?1:0;
const CR_ON=[.13,.17,.21,.25,.34,.38,.42,.5,.54,.62,.66];
const CR_MO=[1.5,3,4.5,5.5,6.5,7.5,8.5,9.2,10,10.8,11.5];
const CR_STEPS=[
 {from:0,at:.06,k:'Step 1 · The frame',t:'11 criteria, one 12-month window',
  txt:`DSM-5-TR defines alcohol use disorder as a problematic pattern of alcohol use causing clinically significant impairment or distress, shown by at least 2 of 11 criteria within a 12-month period. The work group chose 2 because it gave the best agreement with the combined prevalence of DSM-IV abuse and dependence. The criteria describe a dimensional condition with no natural cut-point, so the count itself is the severity. [[APA2022,Hasin2013]]`,
  pt:`Alcohol use disorder is a medical condition. A clinician diagnoses it by asking about 11 kinds of problems over the past year.`,
  hook:`AUD = ≥2 of 11 criteria within 12 months.`},
 {from:.12,at:.3,k:'Step 2 · Impaired control',t:'Impaired control (1–4)',
  txt:`The first cluster is about control: drinking more or longer than intended, a persistent wish or failed efforts to cut down, much time spent getting, drinking or recovering, and craving. Watch the meter: at 2 criteria it reads mild, at 4 moderate. Craving was added in DSM-5; its psychometric benefit was equivocal, but the view that it may become a biological treatment target prevailed. [[APA2022,Hasin2013]]`,
  pt:`Two or three criteria is mild, four or five is moderate, six or more is severe.`,
  hook:`Severity by count: mild 2–3, moderate 4–5, severe 6+. Craving was added in DSM-5.`},
 {from:.32,at:.46,k:'Step 3 · Social impairment',t:'Social impairment (5–7)',
  txt:`Failing to meet major role obligations, continuing to drink despite social or interpersonal problems, and giving up important activities. Legal problems, a DSM-IV abuse criterion, are not here: they were dropped for very low prevalence, low discrimination and poor fit with the other criteria. Seven criteria is severe AUD, which 3.4% of US adults had in the past year. [[APA2022,Hasin2013,Grant2015NESARC]]`,
  pt:`The count says how many kinds of problems are present, not how "bad" a person is.`,
  hook:`DSM-5 removed "recurrent legal problems" and added craving: still 11 criteria.`},
 {from:.48,at:.58,k:'Step 4 · Risky use',t:'Risky use (8–9)',
  txt:`Drinking in physically hazardous situations, and continuing to drink despite physical or psychological problems. Treatment seeking rises with severity: 2.7% of people with mild, 4.9% with moderate and 21.3% with severe 12-month AUD sought treatment. [[APA2022,Grant2015NESARC]]`,
  pt:`Most people with alcohol use disorder never get treatment, even though treatment helps.`,
  hook:`Treatment seeking: 2.7% mild, 4.9% moderate, 21.3% severe (NESARC-III).`},
 {from:.6,at:.7,k:'Step 5 · Pharmacological',t:'Tolerance and withdrawal (10–11)',
  txt:`The last two criteria are tolerance and withdrawal. They are two of eleven: neither is required, and the DSM-5 physiological specifier was eliminated. For substance use disorders in general, tolerance and withdrawal that occur only during appropriate, supervised medical use are not counted. Withdrawal after long, heavy daily drinking can be dangerous: get medical help to stop safely. [[Hasin2013]]`,
  pt:`Someone can have alcohol use disorder without withdrawal symptoms. If withdrawal does happen, it needs medical care.`,
  hook:`Tolerance and withdrawal are not required for the diagnosis; the physiological specifier was dropped in DSM-5.`},
 {from:.74,at:.95,k:'Step 6 · Remission',t:'Early and sustained remission',
  txt:`After full criteria were met, early remission means at least 3 but less than 12 months without meeting any criterion except craving; sustained remission means 12 months or more. Craving may persist in both. A further specifier, "in a controlled environment", applies when the person is somewhere access to alcohol is restricted. [[Hasin2013,APA2022]]`,
  pt:`"Remission" means going at least 3 months without the problems on the list. Cravings can still happen, and that is common.`,
  hook:`Early remission 3 to &lt;12 months; sustained ≥12 months; craving is the one criterion allowed in both.`}];

/* animate() with a safety net: if frames are throttled (a background tab), finish anyway */
function crAnim(dur,step,done){let fin=false;const end=()=>{if(fin)return;fin=true;clearTimeout(to);done&&done()};const st=animate(dur,step,end);const to=setTimeout(()=>{st();step(1);end()},dur+200);return ()=>{fin=true;clearTimeout(to);st()}}
inits.criteria=()=>{
  const svg=$('#crSvg'),rg=$('#crT'),note=$('#crNote');
  function tilePos(N){/* x,y of each tile and each cluster header */
    const P=[],H=[];
    if(N){const tw=180,gx=[14,206];let y=8;CR_G.forEach((g,gi)=>{H.push([14,y+11]);const idx=CR_C.map((c,i)=>c.g===gi?i:-1).filter(i=>i>=0);idx.forEach((i,k)=>P[i]=[gx[k%2],y+18+Math.floor(k/2)*34,tw]);y+=18+Math.ceil(idx.length/2)*34+6});return {P,H,end:y}}
    const tw=222,cx=[14,252],cy=[10,182];CR_G.forEach((g,gi)=>{const X=cx[gi%2],Y=cy[Math.floor(gi/2)];H.push([X,Y+11]);CR_C.forEach((c,i)=>{if(c.g===gi){const k=CR_C.slice(0,i).filter(q=>q.g===gi).length;P[i]=[X,Y+18+k*34,tw]}})});return {P,H,end:290}}
  function draw(t){const N=vb(svg,'720 380','400 560'),p=phaseOf(CR_STEPS,t);setSt(p);note.innerHTML=noteHTML(CR_STEPS[p]);
    const T=tilePos(N),rem=ramp(t,.74,.8);let s='';
    const lit=CR_ON.map(a=>ramp(t,a,a+.025));const n=lit.filter(v=>v>=1).length,cnt=rem>0?0:n;
    CR_G.forEach((g,gi)=>{const [hx,hy]=T.H[gi];s+=`<text x="${hx}" y="${hy}" class="t-sm" style="fill:${g.c};font-weight:600">${g.n.toUpperCase()}</text>`});
    CR_C.forEach((c,i)=>{const [x,y,w]=T.P[i],g=CR_G[c.g],craveKeep=i===3?.45:0,v=Math.max(lit[i]*(1-rem),lit[i]>0?craveKeep*rem:0);
      s+=`<rect x="${x}" y="${y}" width="${w}" height="30" rx="7" style="fill:var(--panel);stroke:${v>0?g.c:'var(--line)'};stroke-width:${v>0?1.8:1}"/>`;
      if(v>0)s+=`<rect x="${x}" y="${y}" width="${w}" height="30" rx="7" style="fill:${g.c};opacity:${f1(v*.2)}"/>`;
      s+=`<circle cx="${x+15}" cy="${y+15}" r="10" style="fill:${v>0?g.c:'var(--panel-2)'};opacity:${v>0?.4+v*.6:1}"/><text x="${x+15}" y="${y+19}" class="t-xs t-mid" style="fill:${v>0?'var(--panel)':'var(--muted)'};font-weight:700">${i+1}</text>`;
      s+=`<text x="${x+32}" y="${y+13}" class="t-lbl" style="font-size:12px;${v>0?'':'fill:var(--muted)'}">${c.s}</text><text x="${x+32}" y="${y+25}" class="t-xs">${i===3&&rem>.5?'may persist in remission':c.d}</text>`});
    /* severity meter */
    const M=N?{x:14,y:T.end+14,w:372}:{x:494,y:14,w:212},sv=crSev(cnt),S=CR_SEV[sv];
    s+=`<rect x="${M.x-4}" y="${M.y-4}" width="${M.w+8}" height="${N?122:268}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=`<text x="${M.x+8}" y="${M.y+14}" class="t-sm" style="fill:var(--dx);font-weight:600">CRITERIA MET</text>`;
    s+=`<text x="${M.x+8}" y="${M.y+(N?48:54)}" style="font:800 ${N?30:36}px var(--display);fill:${rem>0?'var(--good)':S.c}">${cnt}<tspan style="font-size:${N?16:18}px;fill:var(--muted)"> / 11</tspan></text>`;
    const mo0=18*ramp(t,.8,.95),lab=rem>0?(mo0<3?'Not yet in remission':mo0<12?'Early remission':'Sustained remission'):S.n;
    s+=`<text x="${M.x+(N?110:8)}" y="${M.y+(N?46:84)}" class="t-big" style="font-size:${N?20:22}px;fill:${rem>0?'var(--good)':S.c}">${lab}</text>`;
    const sy=M.y+(N?62:100),sw=(M.w-16)/11;
    for(let k=0;k<11;k++){const bs=CR_SEV[crSev(k+1)];s+=`<rect x="${f1(M.x+8+k*sw+1)}" y="${sy}" width="${f1(sw-2)}" height="16" rx="3" style="fill:${k<cnt?bs.c:'var(--panel-2)'};opacity:${k<cnt?.85:1}"/>`}
    [[1,3,1],[3,5,2],[5,11,3]].forEach(([a,b,si])=>{const xa=M.x+8+a*sw,xb=M.x+8+b*sw-2,bs=CR_SEV[si];s+=`<path d="M${f1(xa)} ${sy+22}v4H${f1(xb)}v-4" style="fill:none;stroke:${bs.c};stroke-width:1.2"/><text x="${f1((xa+xb)/2)}" y="${sy+(!N&&si===2?50:38)}" class="t-xs t-mid" style="fill:${bs.c}">${bs.n.toLowerCase()} ${bs.r}</text>`});
    if(!N){const by=sy+62;
      if(rem>0)s+=`<text x="${M.x+8}" y="${by}" class="t-xs">Months without any criterion</text><text x="${M.x+8}" y="${by+13}" class="t-xs">except craving: see below.</text>`;
      else if(S.p){[['US adults, past 12 months',S.p+'%'],['Mean age at onset',S.a+' y'],['Sought treatment',S.tr+'%']].forEach(([a,b],i)=>s+=`<text x="${M.x+8}" y="${by+i*30}" class="t-xs">${a}</text><text x="${M.x+M.w-8}" y="${by+i*30+14}" class="t-lbl t-end" style="fill:${S.c}">${b}</text>`);s+=`<text x="${M.x+8}" y="${by+92}" class="t-xs">NESARC-III population estimates</text>`}
      else s+=`<text x="${M.x+8}" y="${by}" class="t-xs">Fewer than 2 criteria:</text><text x="${M.x+8}" y="${by+13}" class="t-xs">no AUD diagnosis.</text>`}
    else if(S.p&&rem===0)s+=`<text x="${M.x+8}" y="${M.y+112}" class="t-xs" style="fill:${S.c}">${S.p}% of US adults · onset ${S.a} y · ${S.tr}% sought care</text>`;
    /* lower strip: the 12-month window, then the remission timeline */
    const W=N?{x:14,y:T.end+156,w:372}:{x:14,y:300,w:460};
    if(rem<1){const X=m=>W.x+W.w*m/12,op=1-rem;
      s+=`<g style="opacity:${f1(op)}"><text x="${W.x}" y="${W.y}" class="t-sm" style="fill:var(--dx);font-weight:600">THE SAME 12-MONTH WINDOW</text>`;
      s+=`<rect x="${W.x}" y="${W.y+14}" width="${W.w}" height="26" rx="6" style="fill:var(--dx-soft);opacity:.6"/>`;
      for(let m=0;m<=12;m+=3)s+=`<line x1="${f1(X(m))}" x2="${f1(X(m))}" y1="${W.y+40}" y2="${W.y+45}" class="axis"/><text x="${f1(X(m))}" y="${W.y+56}" class="t-xs ${m===0?'':m===12?'t-end':'t-mid'}">${m===0?'12 months ago':m===12?'now':''}</text>`;
      CR_C.forEach((c,i)=>{if(lit[i]>0)s+=`<circle cx="${f1(X(CR_MO[i]))}" cy="${W.y+27}" r="${f1(3+lit[i]*4)}" style="fill:${CR_G[c.g].c};opacity:.85"/><text x="${f1(X(CR_MO[i]))}" y="${W.y+30}" class="t-xs t-mid" style="fill:var(--panel);font-size:8px;font-weight:700">${lit[i]>=1?i+1:''}</text>`});
      s+=`<text x="${W.x}" y="${W.y+72}" class="t-xs">${N?'Months are illustrative.':'Months are illustrative: what matters is that criteria cluster within 12 months.'}</text></g>`}
    if(rem>0){const X=m=>W.x+W.w*m/18,mo=18*ramp(t,.8,.95),op=rem;
      s+=`<g style="opacity:${f1(op)}"><text x="${W.x}" y="${W.y}" class="t-sm" style="fill:var(--good);font-weight:600">MONTHS WITHOUT ANY CRITERION EXCEPT CRAVING</text>`;
      [[0,3,'var(--panel-2)','not yet'],[3,12,'var(--good-soft)','early remission'],[12,18,'var(--good)','sustained']].forEach(([a,b,c,l],i)=>s+=`<rect x="${f1(X(a))}" y="${W.y+14}" width="${f1(X(b)-X(a))}" height="26" style="fill:${c};opacity:${i===2?.5:1}"/><text x="${f1((X(a)+X(b))/2)}" y="${W.y+31}" class="t-xs t-mid" style="fill:var(--ink)">${l}</text>`);
      [0,3,6,9,12,15,18].forEach(m=>s+=`<line x1="${f1(X(m))}" x2="${f1(X(m))}" y1="${W.y+40}" y2="${W.y+45}" class="axis"/><text x="${f1(X(m))}" y="${W.y+56}" class="t-xs t-mid">${m}</text>`);
      const tx=X(mo);s+=`<path d="M${f1(tx)} ${W.y+12}l-6 -9h12Z" style="fill:var(--ink)"/>`;
      const spec=mo<3?'not yet in remission':mo<12?'early remission':'sustained remission';
      s+=`<text x="${W.x}" y="${W.y+74}" class="t-lbl" style="fill:var(--good)">${f1(mo)} months: ${spec}</text></g>`}
    svg.innerHTML=s}
  const stop=playWire(rg,$('#crPlay'),draw,24000,'Replay','criteria');
  const setSt=stepWire($('#crSteps'),CR_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- criteria counter ---------- */
  const box=$('#crBox'),cs=$('#crCalcSvg'),cn=$('#crCalcNote'),rs=$('#crRem'),env=$('#crEnv');
  box.innerHTML=CR_G.map((g,gi)=>`<p class="crg" style="color:${g.c}">${g.n}</p>`+CR_C.map((c,i)=>c.g===gi?`<label for="crK${i}"><input type="checkbox" id="crK${i}" data-crk="${i}"><span><b>${i+1}.</b> ${c.l}</span></label>`:'').join('')).join('');
  function calc(){const on=CR_C.map((_,i)=>$('#crK'+i).checked),n=on.filter(Boolean).length,sv=crSev(n),S=CR_SEV[sv],r=rs.value,nonCrave=on.filter((v,i)=>v&&i!==3).length;
    const N=vb(cs,'720 96','400 110'),x0=N?16:30,x1=N?384:690,sw=(x1-x0)/11;let s='';
    s+=`<text x="${x0}" y="18" class="t-sm" style="fill:var(--dx);font-weight:600">${n} OF 11 · ${S.n.toUpperCase()}</text>`;
    for(let k=0;k<11;k++){const bs=CR_SEV[crSev(k+1)];s+=`<rect x="${f1(x0+k*sw+1)}" y="28" width="${f1(sw-2)}" height="20" rx="4" style="fill:${k<n?bs.c:'var(--panel-2)'};opacity:${k<n?.85:1}"/><text x="${f1(x0+k*sw+sw/2)}" y="${N?62:64}" class="t-xs t-mid">${k+1}</text>`}
    [[1,3,1],[3,5,2],[5,11,3]].forEach(([a,b,si])=>{const xa=x0+a*sw,xb=x0+b*sw-2,bs=CR_SEV[si];s+=`<path d="M${f1(xa)} ${N?70:72}v4H${f1(xb)}v-4" style="fill:none;stroke:${bs.c};stroke-width:1.2"/><text x="${f1((xa+xb)/2)}" y="${N?90:90}" class="t-xs t-mid" style="fill:${bs.c}">${bs.n.toLowerCase()} ${bs.r}</text>`});
    cs.innerHTML=s;
    let h=`<div class="kicker">Teaching count · not a diagnosis</div><div style="display:flex;gap:14px;align-items:baseline;flex-wrap:wrap"><span class="crbig" style="color:${S.c}">${n}</span><b style="color:${S.c}">${n<2?'Fewer than 2 criteria: the threshold is not reached':S.n+' ('+S.r+' criteria)'}</b></div>`;
    if(r==='na'){h+=n>=2?`<p>${S.n} severity is set by the count alone. As a population figure, ${S.p}% of US adults had ${S.n.toLowerCase()} AUD in the past year; mean age at onset ${S.a} years; ${S.tr}% sought treatment. [[Hasin2013,Grant2015NESARC]]</p>`:`<p>DSM-5-TR needs at least 2 criteria in the same 12 months, together with clinically significant impairment or distress. [[APA2022]]</p>`}
    else{const sp={lt3:'Under 3 months: too soon for a remission specifier.',early:'Early remission: at least 3 but less than 12 months.',sust:'Sustained remission: 12 months or more.'}[r];
      h+=nonCrave?`<div class="verdict maybe">Remission needs that no criterion except craving has been met during that time; ${nonCrave} other criterion${nonCrave>1?'a are':' is'} ticked. [[Hasin2013]]</div>`:`<div class="verdict yes">${sp}${r!=='lt3'&&env.checked?' Specifier added: in a controlled environment.':''}${on[3]&&r!=='lt3'?' Craving alone does not prevent remission.':''} [[Hasin2013,APA2022]]</div>`}
    if(n>=4)h+=`<p>DSM-IV dependence lines up best with 4 or more DSM-5 criteria, so trials of people with DSM-IV dependence apply best to moderate or severe AUD. [[Compton2013Crosswalk]]</p>`;
    h+=`<div class="pt"><b>In plain words</b>The number counts kinds of problems; it does not measure a person's worth or willpower. AUD at any severity is treatable. [[Hasin2013]]</div>`;
    h+=`<div class="hook"><b>Exam hook</b>Mild 2–3, moderate 4–5, severe 6+; craving is the one criterion allowed during early or sustained remission. [[Hasin2013,APA2022]]</div>`;
    cn.innerHTML=h}
  box.addEventListener('change',calc);rs.addEventListener('change',calc);env.addEventListener('change',calc);
  $('#crReset').addEventListener('click',()=>{CR_C.forEach((_,i)=>$('#crK'+i).checked=false);rs.selectedIndex=0;env.checked=false;calc()});
  calc();

  /* ---------- DSM-IV to DSM-5 ---------- */
  const iv=$('#crIv'),ivn=$('#crIvNote');
  const CR_IV=[/* id, label, DSM-IV home (a = abuse, d = dependence, null = not a criterion), DSM-5 number */
    ['larger','Larger or longer','d',1],['cut','Cutting down fails','d',2],['time','Much time spent','d',3],['crave','Craving',null,4],
    ['role','Role obligations','a',5],['social','Social problems','a',6],['give','Activities given up','d',7],['haz','Hazardous situations','a',8],
    ['harm','Health problems','d',9],['tol','Tolerance','d',10],['wd','Withdrawal','d',11],['legal','Legal problems','a',0]];
  function pos(N,v){/* chip positions: v 4 = DSM-IV, 5 = DSM-5 */
    const P={},cw=N?176:200;
    if(v===4){const ab=CR_IV.filter(c=>c[2]==='a'),de=CR_IV.filter(c=>c[2]==='d');
      if(N){ab.forEach((c,i)=>P[c[0]]=[22+(i%2)*184,62+Math.floor(i/2)*34]);de.forEach((c,i)=>P[c[0]]=[22+(i%2)*184,176+Math.floor(i/2)*34])}
      else{ab.forEach((c,i)=>P[c[0]]=[26,64+i*36]);de.forEach((c,i)=>P[c[0]]=[296+(i%2)*208,64+Math.floor(i/2)*36])}
      P.crave=N?[22+184,176+3*34+44]:[504,64+3*36+46]}
    else{const d5=CR_IV.filter(c=>c[3]>0).sort((a,b)=>a[3]-b[3]);
      d5.forEach((c,i)=>P[c[0]]=N?[22+(i%2)*184,62+Math.floor(i/2)*34]:[26+(i%3)*226,64+Math.floor(i/3)*36]);
      P.legal=N?[22,300]:[26,236]}
    return {P,cw}}
  let ivV=4,ivT=0,stopV=null;
  function drawV(u){const N=vb(iv,'720 272','400 350');const A=pos(N,4),B=pos(N,5),cw=A.cw;let s='';
    /* boxes cross-fade */
    const o4=1-u,o5=u;
    if(N){s+=`<g style="opacity:${f1(o4)}"><rect x="14" y="30" width="372" height="${2*34+40}" rx="12" style="fill:var(--accent-soft);opacity:.5;stroke:var(--accent)"/><text x="24" y="50" class="t-sm" style="fill:var(--accent);font-weight:600">DSM-IV ALCOHOL ABUSE (HISTORICAL TERM)</text>`;
      s+=`<rect x="14" y="144" width="372" height="${4*34+40}" rx="12" style="fill:var(--dx-soft);opacity:.5;stroke:var(--dx)"/><text x="24" y="164" class="t-sm" style="fill:var(--dx);font-weight:600">DSM-IV ALCOHOL DEPENDENCE</text></g>`;
      s+=`<g style="opacity:${f1(o5)}"><rect x="14" y="30" width="372" height="${6*34+40}" rx="12" style="fill:var(--dx-soft);opacity:.5;stroke:var(--dx)"/><text x="24" y="50" class="t-sm" style="fill:var(--dx);font-weight:600">DSM-5 ALCOHOL USE DISORDER · 11 CRITERIA</text><text x="24" y="292" class="t-sm" style="fill:var(--bad);font-weight:600">REMOVED</text></g>`}
    else{s+=`<g style="opacity:${f1(o4)}"><rect x="14" y="30" width="248" height="${4*36+44}" rx="12" style="fill:var(--accent-soft);opacity:.5;stroke:var(--accent)"/><text x="26" y="50" class="t-sm" style="fill:var(--accent);font-weight:600">DSM-IV ABUSE (HISTORICAL)</text>`;
      s+=`<rect x="284" y="30" width="422" height="${4*36+44}" rx="12" style="fill:var(--dx-soft);opacity:.5;stroke:var(--dx)"/><text x="296" y="50" class="t-sm" style="fill:var(--dx);font-weight:600">DSM-IV DEPENDENCE</text>`;
      s+=`<text x="14" y="244" class="t-xs">Hierarchy: dependence trumped abuse. Two dependence criteria and no abuse criterion = no diagnosis (a "diagnostic orphan").</text></g>`;
      s+=`<g style="opacity:${f1(o5)}"><rect x="14" y="30" width="692" height="${4*36+44}" rx="12" style="fill:var(--dx-soft);opacity:.5;stroke:var(--dx)"/><text x="26" y="50" class="t-sm" style="fill:var(--dx);font-weight:600">DSM-5 ALCOHOL USE DISORDER · 11 CRITERIA · 2 OR MORE IN 12 MONTHS</text><text x="26" y="228" class="t-sm" style="fill:var(--bad);font-weight:600">REMOVED</text></g>`}
    CR_IV.forEach(c=>{const a=A.P[c[0]],b=B.P[c[0]],e=ease(u),x=lerp(a[0],b[0],e),y=lerp(a[1],b[1],e);
      const isLegal=c[0]==='legal',isCrave=c[0]==='crave',op=isCrave?u:1,col=isLegal?(u>.5?'var(--bad)':'var(--accent)'):isCrave?'var(--good)':c[2]==='a'?'var(--accent)':'var(--dx)';
      if(op<=0.01)return;
      s+=`<g style="opacity:${f1(isLegal?1-u*.45:op)}"><rect x="${f1(x)}" y="${f1(y)}" width="${cw-8}" height="28" rx="14" style="fill:var(--panel);stroke:${col};stroke-width:1.6"/>`;
      s+=`<text x="${f1(x+14)}" y="${f1(y+18)}" class="t-lbl" style="font-size:12px">${c[3]?(u>.5?c[3]+'. ':''):''}${c[1]}${isCrave?' (new)':''}</text>`;
      if(isLegal&&u>0)s+=`<line x1="${f1(x+10)}" x2="${f1(x+10+(cw-28)*ramp(u,.4,1))}" y1="${f1(y+14)}" y2="${f1(y+14)}" style="stroke:var(--bad);stroke-width:2"/>`;
      s+='</g>'});
    if(N&&u<.5)s+=`<text x="14" y="340" class="t-xs">Two dependence criteria, no abuse = no diagnosis.</text>`;
    iv.innerHTML=s}
  function setV(v,anim){ivV=v;$$('[data-crv]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.crv===v));const target=v===5?1:0;
    if(stopV){stopV();stopV=null}
    const from=ivT;
    if(anim&&from!==target)stopV=crAnim(900,p=>{ivT=lerp(from,target,p);drawV(ivT)},()=>{stopV=null;ivT=target;drawV(target)});
    else ivT=target;
    drawV(target);if(!stopV)ivT=target;
    ivn.innerHTML=v===4?`<div class="kicker">DSM-IV · 1994</div><h4>Two diagnoses in a hierarchy</h4><p>DSM-IV split the criteria into “alcohol abuse” (role failure, hazardous use, legal problems, social problems) and “alcohol dependence” (the other seven). The hierarchy created “diagnostic orphans”: people with two dependence criteria and no abuse criterion received no diagnosis at all. [[Hasin2013,Peer2013DSM5]]</p><div class="pt"><b>In plain words</b>The old system had two labels, and some people with real problems fell between them.</div><div class="hook"><b>Exam hook</b>Diagnostic orphan = 2 dependence criteria, 0 abuse criteria: no DSM-IV diagnosis, but mild AUD in DSM-5.</div>`
      :`<div class="kicker">DSM-5 · 2013, kept in DSM-5-TR</div><h4>One disorder, 11 criteria</h4><p>Abuse and dependence were merged; legal problems were dropped (very low prevalence, low discrimination, poor fit) and craving was added. In 7,543 people from genetic studies, the switch modestly increased prevalence, mostly by capturing diagnostic orphans; adding craving did not substantially change diagnosis rates. [[Hasin2013,Peer2013DSM5,APA2022]]</p><div class="pt"><b>In plain words</b>One label on a scale from mild to severe replaced two separate labels.</div><div class="hook"><b>Exam hook</b>DSM-5: −legal problems, +craving, still 11 criteria; threshold 2.</div>`}
  $$('[data-crv]').forEach(b=>b.addEventListener('click',()=>setV(+b.dataset.crv,true)));
  setV(4,false);
  {const prevR=redraws.criteria;redraws.criteria=()=>{prevR&&prevR();calc();drawV(ivT)}}
};
