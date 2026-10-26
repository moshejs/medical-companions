/* =============== 4.3 Rectal cancer pathway =============== */
const RE_M=30;/* months on the timeline */
/* phases of each approach: id, label, start and end month, colour; the branch after restaging depends on the response */
function rePhases(mode,ccr){
  if(mode==='tnt'){const P=[{id:'mri',n:'MRI',a:0,b:.5,c:'var(--accent)'},{id:'scrt',n:'5×5 Gy',a:.5,b:.8,c:'var(--gold)'},{id:'chemo',n:'CAPOX × 6',a:1,b:5.2,c:'var(--rx)'},{id:'restage',n:'Restage',a:5.4,b:6,c:'var(--accent)'}];
    return P.concat(ccr?[{id:'ww',n:'Watch & wait',a:6,b:RE_M,c:'var(--good)'}]:[{id:'tme',n:'TME',a:6.4,b:7,c:'var(--tumour)'},{id:'fu',n:'Follow-up',a:7,b:RE_M,c:'var(--panel-2)'}])}
  const P=[{id:'mri',n:'MRI',a:0,b:.5,c:'var(--accent)'},{id:'crt',n:'CRT',a:.5,b:1.75,c:'var(--gold)'},{id:'wait',n:'Wait',a:1.75,b:3,c:'var(--line)'},{id:'restage',n:'Restage',a:3,b:3.4,c:'var(--accent)'}];
  return P.concat(ccr?[{id:'ww',n:'Watch & wait',a:3.4,b:RE_M,c:'var(--good)'}]:[{id:'tme',n:'TME',a:3.6,b:4.1,c:'var(--tumour)'},{id:'adj',n:'Chemo (optional)',a:4.8,b:8.8,c:'var(--rx)'},{id:'fu',n:'Follow-up',a:8.8,b:RE_M,c:'var(--panel-2)'}])}
/* tumour size 0..1 at month m (drawn, not measured) */
function reSize(mode,ccr,m){const end=ccr?0:(mode==='tnt'?.38:.45),a=.5,b=mode==='tnt'?5.2:3;return m<a?1:lerp(1,end,ease(clamp((m-a)/(b-a))))}
const RE_TXT={
 mri:{k:'Month 0 · staging',t:'MRI plans everything',
  txt:`High-resolution pelvic MRI shows how deep the tumour goes, which nodes look involved and how close it comes to the mesorectal fascia, the future circumferential margin. In MERCURY (408 people), MRI predicted a clear margin with 92% specificity. The 2022 NCCN rectal update rebuilt its stage II–III algorithms around total neoadjuvant therapy and added watch-and-wait for complete responders. [[MERCURY2006,Benson2022]]`,
  pt:`The MRI scan is the map. It tells the team whether surgery alone is enough or whether treatment should come first.`,
  hook:`MRI-predicted CRM decides whether a tumour is "high risk" before treatment. [[MERCURY2006]]`},
 scrt:{k:'Week 1 · short-course radiotherapy',t:'Five fractions of 5 Gy',
  txt:`Short-course radiotherapy gives 25 Gy in 5 fractions over a week. Before standard TME, the Swedish trial (1,168 patients) cut 5-year local recurrence from 27% to 11% and raised overall survival from 48% to 58%. Added to TME in the Dutch trial (1,861), it lowered local recurrence from 8.2% to 2.4% at 2 years and from 11% to 5% at 10 years, without an overall survival difference. [[SRCT1997,Kapiteijn2001,vanGijn2011]]`,
  pt:`One week of daily radiotherapy to the pelvis lowers the chance the cancer comes back there.`,
  hook:`Short-course RT = 5 × 5 Gy. Dutch TME trial: 10-year local recurrence 5% vs 11%, no overall survival gain. [[vanGijn2011]]`},
 crt:{k:'Weeks 1–6 · chemoradiation',t:'Long-course chemoradiation',
  txt:`The standard arm of RAPIDO gave 50.4 or 50 Gy with capecitabine 825 mg/m² twice daily (the capecitabine label lists 825 mg/m² twice daily with concomitant radiation). In the German CAO/ARO/AIO-94 trial, giving chemoradiation before rather than after surgery lowered 5-year local relapse from 13% to 6% and grade 3–4 acute toxicity from 40% to 27%, with equal survival. [[Bahadoer2021,FDA-Xeloda,Sauer2004]]`,
  pt:`About five weeks of daily radiotherapy with chemotherapy tablets, to shrink the tumour before the operation.`,
  hook:`Preoperative beats postoperative chemoradiation for local control (6% vs 13%) and toxicity, with equal survival. [[Sauer2004]]`},
 wait:{k:'Weeks 6–12 · the interval',t:'Waiting for the response',
  txt:`Surgery is usually not done straight after radiotherapy. In Stockholm III (840 patients), short-course radiotherapy with surgery delayed by 4–8 weeks gave local recurrence similar to immediate surgery, and the delay lowered postoperative complications (OR 0.61). In the German trial's long follow-up, 10-year distant metastases were about 30% in both arms, the gap TNT tries to close. [[Erlandsson2017,Sauer2012]]`,
  pt:`There is a pause of several weeks before the scan that checks the response.`,
  hook:`Chemoradiation improved local control but not distant spread (10-year distant metastases 29.8% vs 29.6%). [[Sauer2012]]`},
 chemo:{k:'Months 1–5 · consolidation chemotherapy',t:'Total neoadjuvant therapy',
  txt:`In RAPIDO (920 high-risk patients), short-course radiotherapy was followed by 6 cycles of CAPOX or 9 of FOLFOX4, then TME. Disease-related treatment failure at 3 years was 23.7% vs 30.4% with standard chemoradiation (HR 0.75). The cost: grade ≥3 diarrhoea before surgery in 18% vs 9%. PRODIGE 23 gave FOLFIRINOX before chemoradiation instead and raised 3-year DFS from 69% to 76%. [[Bahadoer2021,Conroy2021]]`,
  pt:`All the chemotherapy is given before the operation, while the person is fit, instead of some of it afterwards.`,
  hook:`RAPIDO: TNT lowered disease-related treatment failure (23.7% vs 30.4%). [[Bahadoer2021]]`},
 restage:{k:'Restaging',t:'Has the tumour gone?',
  txt:`MRI and endoscopy look again. In Habr-Gama's series (265 people with distal rectal cancer after 5-FU chemoradiation), 71 (26.8%) had a clinical complete response and were observed without surgery: 5-year overall and disease-free survival were 100% and 92%. In OPRA, consolidation chemotherapy after chemoradiation preserved the rectum more often than induction chemotherapy before it (3-year TME-free survival 53% vs 41%). [[HabrGama2004,GarciaAguilar2022]]`,
  pt:`If nothing can be seen on the scan or through the scope, some people can avoid the operation and be watched closely instead.`,
  hook:`OPRA: 3-year TME-free survival 41% (induction) vs 53% (consolidation); DFS 76% in both. [[GarciaAguilar2022]]`},
 tme:{k:'Surgery',t:'Total mesorectal excision',
  txt:`If tumour remains, the rectum and its mesorectum come out (see <a href="#surgery" data-go="surgery">Surgery</a>). RAPIDO's 5-year follow-up found more locoregional recurrence after resection in the TNT arm (10% vs 6%; P=.027), more often when the mesorectum was breached, while its gain in distant control persisted. [[Dijkstra2023]]`,
  pt:`The operation removes the rest of the tumour with the fatty sleeve around the rectum.`,
  hook:`RAPIDO 5 years: locoregional recurrence after resection 10% (TNT) vs 6%. [[Dijkstra2023]]`},
 adj:{k:'After surgery',t:'Optional chemotherapy afterwards',
  txt:`In RAPIDO's standard arm, chemotherapy after surgery was optional. PRODIGE 23 gave 3 months of adjuvant chemotherapy after FOLFIRINOX, chemoradiation and TME, against 6 months after chemoradiation and TME in its control arm, and had less neurotoxicity during adjuvant therapy (12% vs 21%). [[Bahadoer2021,Conroy2021]]`,
  pt:`Some people have more chemotherapy after the operation. In the newer approach most of it is given before.`,
  hook:`PRODIGE 23: 3-year DFS 76% vs 69% (HR 0.69). [[Conroy2021]]`},
 ww:{k:'Watch & wait',t:'Close surveillance instead of surgery',
  txt:`In the International Watch &amp; Wait Database (880 people with a clinical complete response, 47 institutes), the 2-year cumulative local regrowth was 25.2%; 88% of regrowths were found within 2 years and 97% were in the bowel wall. Distant metastases occurred in 8%. 5-year overall survival was 85% and disease-specific survival 94% (registry data). [[vanderValk2018]]`,
  pt:`About 1 in 4 people see the tumour grow back, mostly in the first 2 years. It can usually still be removed then.`,
  hook:`Watch-and-wait: 2-year local regrowth 25.2%; 97% of regrowth is in the bowel wall and usually salvageable. [[vanderValk2018]]`},
 fu:{k:'Follow-up',t:'Life after treatment',
  txt:`Bowel function after a low join can change (low anterior resection syndrome), worse after radiotherapy. Long-term outcomes: in OPRA, disease-free survival was 64% both after TME at restaging and after TME for regrowth, so waiting did not cost those who later needed surgery. See <a href="#living" data-go="living">Living with colorectal cancer</a>. [[Emmertsen2012,Verheij2024]]`,
  pt:`Regular check-ups continue for years. Changes in bowel habit are common and there is help for them.`,
  hook:`OPRA: DFS 64% after restaging TME and after TME for regrowth. [[Verheij2024]]`}
};
const RE_PANEL={
 mri:{l:['MRI: depth, nodes, distance to the fascia','MERCURY: of 349 MRI-clear margins,','327 (94%) were clear at surgery']},
 scrt:{l:['Short-course RT: 5 × 5 Gy','Dutch TME trial, local recurrence:'],bars:[['RT + TME, 10 y',5,'var(--rx)'],['TME alone, 10 y',11,'var(--bad)']],max:30},
 crt:{l:['50.4 Gy + capecitabine','German trial, 5-y local relapse:'],bars:[['chemoradiation before',6,'var(--rx)'],['chemoradiation after',13,'var(--bad)']],max:30},
 wait:{l:['Waiting several weeks','Stockholm III: delayed surgery after','short-course RT, fewer complications']},
 chemo:{l:['Consolidation: 6 × CAPOX (RAPIDO)','3-y disease-related treatment failure:'],bars:[['TNT (RAPIDO)',23.7,'var(--rx)'],['standard',30.4,'var(--bad)']],max:40},
 restage:{l:['MRI + endoscopy again']},
 tme:{l:['TME: rectum + mesorectum removed','RAPIDO 5-y locoregional recurrence:'],bars:[['after TNT',10,'var(--bad)'],['after standard CRT',6,'var(--rx)']],max:30},
 adj:{l:['Optional adjuvant chemotherapy','PRODIGE 23, 3-y disease-free survival:'],bars:[['FOLFIRINOX first',76,'var(--rx)'],['standard',69,'var(--muted)']],max:100},
 ww:{l:['Surveillance: MRI + endoscopy','Local regrowth, cumulative (IWWD):']},
 fu:{l:['Follow-up for years','RAPIDO 3-y treatment failure:'],bars:[['TNT',23.7,'var(--rx)'],['standard',30.4,'var(--bad)']],max:40}
};
/* cumulative local regrowth after a clinical complete response, % at m months: drawn through 25.2% at 24 months and
   flattening after (88% of regrowths fell within 2 years). Shape schematic. */
const reRegrow=m=>25.2*(1-Math.exp(-Math.max(0,m)/11.3))/(1-Math.exp(-24/11.3));
/* OPRA TME-free survival, % at year y: through 41/53 at 3 years and 39/54 at 5 years (regrowth mostly early) */
const reOpra=(p3,p5,y)=>y<=3?100-(100-p3)*(1-Math.exp(-y/.8))/(1-Math.exp(-3/.8)):lerp(p3,p5,(y-3)/2);

inits.rectal=()=>{
  const svg=$('#reSvg'),rg=$('#reT');let mode='tnt',ccr=false,steps=[],setSt=()=>{};
  function buildSteps(){const P=rePhases(mode,ccr),g=id=>P.find(p=>p.id===id),T=m=>m/RE_M;
    const ids=mode==='tnt'?['mri','scrt','chemo','restage']:['mri','crt','wait','restage'];
    const S=ids.map(id=>{const p=g(id);return Object.assign({from:T(p.a),at:T(Math.min(p.b-.05,p.a+(p.b-p.a)*.5))},RE_TXT[id])});
    if(ccr){const w=g('ww');S.push(Object.assign({from:T(w.a),at:T(w.a+8)},RE_TXT.ww));S.push(Object.assign({from:T(w.a+14),at:T(w.a+22)},RE_TXT.fu,{t:'Two years on',k:'Watch & wait · year 2',
      txt:`In OPRA's 5-year update, 94% of 81 regrowths had occurred within 2 years and 99% within 3. 5-year TME-free survival was 39% (induction) vs 54% (consolidation). A pooled analysis of CAO/ARO/AIO-12 (mandatory TME) and OPRA found no survival difference between the strategies (non-randomised). [[Verheij2024,Williams2025]]`,
      hook:`OPRA: 94% of regrowths within 2 years, 99% within 3. [[Verheij2024]]`}))}
    else{const tm=g('tme');S.push(Object.assign({from:T(tm.a),at:T(tm.a+.3)},RE_TXT.tme));
      if(mode==='std'){const a=g('adj');S.push(Object.assign({from:T(a.a),at:T(a.a+2)},RE_TXT.adj))}
      else{const f=g('fu');S.push(Object.assign({from:T(f.a+.5),at:T(f.a+8)},RE_TXT.fu))}}
    steps=S}
  function draw(t){
    const N=vb(svg,'720 410','400 610'),m=t*RE_M,P=rePhases(mode,ccr);
    const cur=P.reduce((a,p)=>m>=p.a?p:a,P[0]),ph=phaseOf(steps,t);
    const L=N?{x0:24,x1:384,ty:54,cx:200,cy:236,FX:104,FY:80,px:20,py:390,pw:360}:{x0:60,x1:700,ty:54,cx:190,cy:262,FX:116,FY:88,px:390,py:132,pw:316};
    const X=v=>lerp(L.x0,L.x1,v/RE_M);let s='';
    /* ---- timeline ---- */
    s+=`<text x="${L.x0}" y="16" class="t-sm" style="fill:var(--rx)">${mode==='tnt'?'TOTAL NEOADJUVANT THERAPY':'STANDARD CHEMORADIATION'} · ${ccr?'COMPLETE RESPONSE':'TUMOUR REMAINS'}</text>`;
    s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${L.ty+22}" y2="${L.ty+22}" class="axis"/>`;
    for(let k=0;k<=RE_M;k+=N?6:3)s+=`<line x1="${f1(X(k))}" x2="${f1(X(k))}" y1="${L.ty+22}" y2="${L.ty+26}" class="axis"/><text x="${f1(X(k))}" y="${L.ty+37}" class="t-xs t-mid">${k}</text>`;
    s+=`<text x="${L.x1}" y="${L.ty+50}" class="t-xs t-end">months</text>`;
    let stag=0;P.forEach(p=>{const xa=X(p.a),xb=X(p.b),w=xb-xa,on=m>=p.a;
      s+=`<rect x="${f1(xa)}" y="${L.ty}" width="${f1(Math.max(2,w))}" height="18" rx="3" style="fill:${p.c};opacity:${on?.9:.25};${p.id==='adj'?'stroke:var(--ink);stroke-dasharray:3 2;':''}"/>`;
      const tw=p.n.length*6.2+8;
      if(w>tw)s+=`<text x="${f1(xa+w/2)}" y="${L.ty+13}" class="t-xs t-mid" style="fill:${p.id==='fu'||p.id==='wait'?'var(--ink)':'var(--panel)'};font-weight:700">${p.n}</text>`;
      else{s+=`<text x="${f1(xa+w/2)}" y="${L.ty-4-(stag++%3)*10}" class="t-xs t-mid" style="fill:var(--ink)">${p.n}</text>`}});
    s+=`<line x1="${f1(X(m))}" x2="${f1(X(m))}" y1="${L.ty-6}" y2="${L.ty+24}" style="stroke:var(--ink);stroke-width:2"/><circle cx="${f1(X(m))}" cy="${L.ty+22}" r="4" style="fill:var(--ink)"/>`;
    /* ---- cross-section ---- */
    const {cx,cy,FX,FY}=L,RW=40,RM=29,RL=17,fR=a=>1/Math.sqrt(Math.pow(Math.cos(a)/FX,2)+Math.pow(Math.sin(a)/FY,2));
    const tmeP=P.find(p=>p.id==='tme'),gone=tmeP&&m>=tmeP.a+.25,kT=tmeP?ramp(m,tmeP.a,tmeP.a+.25):0,kOut=tmeP?ramp(m,tmeP.a+.25,tmeP.b):0;
    s+=`<path d="M${cx-FX-26} ${cy+FY+30}Q${cx} ${cy+FY-4} ${cx+FX+26} ${cy+FY+30}L${cx+FX+26} ${cy+FY+46}Q${cx} ${cy+FY+12} ${cx-FX-26} ${cy+FY+46}Z" style="fill:var(--serosa);stroke:var(--muted);stroke-width:1"/>`;
    s+=`<text x="${cx}" y="${cy+FY+42}" class="t-xs t-mid">sacrum</text>`;
    const sz=reSize(mode,ccr,m);
    let rect='';
    rect+=`<ellipse cx="${cx}" cy="${cy}" rx="${FX}" ry="${FY}" style="fill:var(--fat);stroke:var(--muted);stroke-width:1.2"/>`;
    [[-.7,.5],[.6,.55],[.75,-.3],[-.2,.75]].forEach(([a,b],i)=>rect+=node(cx+a*FX*.8,cy+b*FY*.8,6.5,i===0?clamp(sz*1.1-.1):0));
    rect+=`<circle cx="${cx}" cy="${cy}" r="${RW}" style="fill:var(--muscle);opacity:.85"/><circle cx="${cx}" cy="${cy}" r="${RM}" style="fill:var(--mucosa);stroke:var(--mucosa-line)"/><circle cx="${cx}" cy="${cy}" r="${RL}" style="fill:var(--field)"/>`;
    const ta=-Math.PI*.7,maxD=fR(ta)-RM-10,tw=.35+.6*sz;
    if(sz>.02){let d='';const rr=rng(4),n=14,dep=4+maxD*sz;for(let i=0;i<=n;i++){const a=ta-tw/2+i/n*tw,b0=Math.sin(i/n*Math.PI),r=RM+dep*(.5+.5*b0)*(1+(rr()-.5)*.14);d+=(i?'L':'M')+f1(cx+Math.cos(a)*r)+' '+f1(cy+Math.sin(a)*r)}
      for(let i=n;i>=0;i--){const a=ta-tw/2+i/n*tw;d+='L'+f1(cx+Math.cos(a)*(RL+2))+' '+f1(cy+Math.sin(a)*(RL+2))}
      rect+=`<path d="${d}Z" style="fill:var(--tumour);opacity:${f1(.5+.45*sz)}"/>`}
    else rect+=`<path d="M${f1(cx+Math.cos(ta-.25)*(RM+3))} ${f1(cy+Math.sin(ta-.25)*(RM+3))}A${RM+3} ${RM+3} 0 0 1 ${f1(cx+Math.cos(ta+.25)*(RM+3))} ${f1(cy+Math.sin(ta+.25)*(RM+3))}" style="fill:none;stroke:var(--cell);stroke-width:4;stroke-linecap:round"/>`;
    if(tmeP&&kT>0){rect+=`<ellipse cx="${cx}" cy="${cy}" rx="${FX+4}" ry="${FY+4}" style="fill:none;stroke:var(--rx);stroke-width:2;stroke-dasharray:${f1(kT*600)} 700"/>`}
    if(gone){s+=`<ellipse cx="${cx}" cy="${cy}" rx="${FX}" ry="${FY}" style="fill:none;stroke:var(--line);stroke-width:1.4;stroke-dasharray:4 4"/>`;
      const fade=1-.5*kOut-.5*ramp(m,tmeP.b,tmeP.b+1);
      if(fade>.02)s+=`<g transform="translate(${f1(kOut*(N?0:60))} ${f1(-kOut*(N?12:20))}) scale(${f1(1-.45*kOut)})" style="transform-origin:${cx}px ${cy}px;opacity:${f1(fade)}">${rect}</g>`;
      else s+=`<text x="${cx}" y="${cy+4}" class="t-xs t-mid">rectum and mesorectum removed</text>`;
      if(kOut>.6&&fade>.3)s+=`<text x="${cx}" y="${cy+4}" class="t-xs t-mid" style="fill:var(--ink)">specimen → pathology</text>`}
    else s+=rect;
    if(!gone){s+=`<text x="${cx}" y="${cy+3}" class="t-xs t-mid">lumen</text>`;
      if(sz>.02)s+=`<text x="${f1(cx+Math.cos(ta)*(fR(ta)+6)-4)}" y="${f1(cy+Math.sin(ta)*(fR(ta)+6))}" class="t-xs t-end" style="fill:var(--tumour)">tumour ${Math.round(sz*100)}%</text>`;
      else s+=`<text x="${f1(cx+Math.cos(ta)*(fR(ta)+6)-4)}" y="${f1(cy+Math.sin(ta)*(fR(ta)+6))}" class="t-xs t-end" style="fill:var(--good)">scar only</text>`}
    /* treatment overlays */
    if(cur.id==='mri'||cur.id==='restage'){s+=`<rect x="${cx-FX-14}" y="${cy-FY-14}" width="${2*FX+28}" height="${2*FY+28}" rx="14" style="fill:none;stroke:var(--accent);stroke-width:2;stroke-dasharray:6 4"/><text x="${cx+FX+10}" y="${cy-FY-2}" class="t-sm t-end" style="fill:var(--accent)">MRI</text>`;
      if(cur.id==='restage')s+=scope(cx-RL+6,cy,0,{light:true})}
    if(cur.id==='scrt'||cur.id==='crt'){const pulse=.25+.25*Math.sin(m*40);[[-1,0],[1,0],[0,1],[-.7,-.7],[.7,-.7]].forEach(([a,b])=>{const ox=cx+a*(FX+50),oy=cy+b*(FY+40);s+=`<path d="M${f1(ox-b*14)} ${f1(oy+a*14)}L${cx} ${cy}L${f1(ox+b*14)} ${f1(oy-a*14)}Z" style="fill:var(--gold);opacity:${f1(pulse)}"/>`});
      s+=`<text x="${cx-FX-10}" y="${cy-FY-24}" class="t-sm" style="fill:var(--gold)">${cur.id==='scrt'?'5 × 5 Gy':'50.4 Gy + capecitabine'}</text>`}
    if(cur.id==='chemo'||cur.id==='adj'){for(let i=0;i<8;i++){const a=i/8*Math.PI*2+m,r=(FX+30)*(1-((m*1.7+i*.37)%1)*.7);s+=`<circle cx="${f1(cx+Math.cos(a)*r)}" cy="${f1(cy+Math.sin(a)*r*FY/FX)}" r="3.4" style="fill:var(--rx)"/>`}
      s+=`<text x="${cx-FX-10}" y="${cy-FY-24}" class="t-sm" style="fill:var(--rx)">${cur.id==='chemo'?'CAPOX cycle '+Math.min(6,1+Math.floor((m-1)/(4.2/6))):'adjuvant chemotherapy'}</text>`}
    if(cur.id==='ww'){const since=m-cur.a,chk=since%3<.35;s+=`<text x="${cx-FX-10}" y="${cy-FY-24}" class="t-sm" style="fill:var(--good)">${chk?'check: MRI + endoscopy':'surveillance'}</text>`;if(chk)s+=scope(cx-RL+6,cy,0,{light:true})}
    /* ---- panel ---- */
    const PN=RE_PANEL[cur.id]||{l:[]};let y=L.py;
    s+=`<text x="${L.px}" y="${y}" class="t-big">${cur.n}</text>`;y+=20;
    const lines=PN.l.slice();if(cur.id==='restage')lines.push(ccr?'No visible tumour: clinical complete response':'Tumour still visible: surgery planned');
    lines.forEach((l,i)=>{s+=`<text x="${L.px}" y="${y}" class="t-sm" style="fill:${i?'var(--muted)':'var(--ink)'}">${l}</text>`;y+=15});
    if(PN.bars){y+=4;PN.bars.forEach(([l,v,c])=>{const w=(L.pw-60)*v/PN.max*clamp((m-cur.a)/Math.max(.3,(cur.b-cur.a)*.5)+.2);s+=`<rect x="${L.px}" y="${y}" width="${f1(Math.max(2,w))}" height="16" rx="3" style="fill:${c};opacity:.85"/><text x="${f1(L.px+Math.max(2,w)+6)}" y="${y+12}" class="t-sm" style="fill:var(--ink);font-weight:700">${v}%</text><text x="${L.px}" y="${y+29}" class="t-xs">${l}</text>`;y+=40})}
    if(cur.id==='ww'){const C={x0:L.px+28,x1:L.px+L.pw-20,y0:y+8,y1:y+(N?130:110)},Xm=v=>lerp(C.x0,C.x1,v/24),Yp=v=>lerp(C.y1,C.y0,v/30),since=Math.min(24,m-cur.a);
      [0,10,20,30].forEach(v=>s+=`<line x1="${C.x0}" x2="${C.x1}" y1="${f1(Yp(v))}" y2="${f1(Yp(v))}" class="${v?'grid':'axis'}"/><text x="${C.x0-5}" y="${f1(Yp(v)+3)}" class="t-xs t-end">${v}%</text>`);
      [0,12,24].forEach(v=>s+=`<text x="${f1(Xm(v))}" y="${C.y1+13}" class="t-xs t-mid">${v}</text>`);s+=`<text x="${C.x1}" y="${C.y1+25}" class="t-xs t-end">months on watch-and-wait</text>`;
      if(since>0)s+=`<path d="${pathFn(u=>reRegrow(u*since)/30,C.x0,Xm(since),C.y1,C.y0,60)}" style="fill:none;stroke:var(--bad);stroke-width:2.6"/>`;
      if(since>=24)s+=`<circle cx="${f1(Xm(24))}" cy="${f1(Yp(25.2))}" r="5" style="fill:none;stroke:var(--ink);stroke-width:1.8"/><text x="${f1(Xm(24)-8)}" y="${f1(Yp(25.2)-8)}" class="t-xs t-end" style="fill:var(--ink);font-weight:700">25.2% at 2 years</text>`}
    svg.innerHTML=s;
    setSt(ph);$('#reNote').innerHTML=noteHTML(steps[ph]);
    $('#reRead').innerHTML=`<span>month <b>${f1(m)}</b></span><span>phase <b>${cur.n}</b></span><span>tumour <b>${gone?'removed':sz<.02?'not visible':Math.round(sz*100)+'% of starting size'}</b> (drawn)</span>${cur.id==='ww'?`<span>regrowth so far <b>${f1(reRegrow(Math.min(24,m-cur.a)))}%</b> of people (IWWD, schematic between published points) [[vanderValk2018]]</span>`:''}`;
  }
  const stop=playWire(rg,$('#rePlay'),draw,22000,'%t:player.replay%','rectal');
  function wire(){buildSteps();const old=$('#reSteps'),nu=old.cloneNode(false);old.replaceWith(nu);setSt=stepWire(nu,steps,rg,draw,stop)}
  $$('[data-re-mode]').forEach(b=>b.addEventListener('click',()=>{stop();mode=b.dataset.reMode;$$('[data-re-mode]').forEach(x=>x.setAttribute('aria-pressed',x===b));wire();draw(+rg.value)}));
  $$('[data-re-resp]').forEach(b=>b.addEventListener('click',()=>{stop();ccr=b.dataset.reResp==='ccr';$$('[data-re-resp]').forEach(x=>x.setAttribute('aria-pressed',x===b));wire();draw(+rg.value)}));
  wire();draw(+rg.value);

  /* ---- watch-and-wait outcomes ---- */
  const wv=$('#reWw'),wr=$('#reWwT');let ds='iwwd';
  const WN={iwwd:{k:'IWWD · van der Valk 2018',t:'About 1 in 4 regrow, mostly early',
     txt:`Among 880 people with a clinical complete response managed without surgery (47 institutes, 15 countries, median follow-up 3.3 years), the 2-year cumulative local regrowth was 25.2% (95% CI 22.2–28.5). 88% of regrowths were found in the first 2 years and 97% were in the bowel wall. Distant metastases occurred in 8%; 5-year overall survival was 85% and disease-specific survival 94%. [[vanderValk2018]]`,
     pt:`Most regrowths show up in the first 2 years, which is why checks are most frequent then.`,hook:`IWWD: 25.2% local regrowth at 2 years; 88% of regrowths within 2 years. [[vanderValk2018]]`},
   opra:{k:'OPRA · Garcia-Aguilar 2022, Verheij 2024',t:'Consolidation keeps more rectums',
     txt:`OPRA randomised 324 people to 4 months of FOLFOX or CAPOX before chemoradiation (induction) or after it (consolidation), offering watch-and-wait for a complete or near-complete response. TME-free survival was 41% vs 53% at 3 years and 39% vs 54% at 5 years (P=.012), with similar disease-free survival (71% vs 69% at 5 years). 94% of regrowths occurred within 2 years. [[GarciaAguilar2022,Verheij2024]]`,
     pt:`About half of people given chemotherapy after chemoradiation still had their rectum five years later.`,hook:`OPRA 5-year TME-free survival: 54% consolidation vs 39% induction. [[Verheij2024]]`}};
  function drawW(t){const N=vb(wv,'720 290','400 420'),Y=t*5;let s='';const C=N?{x0:50,x1:384,y0:40,y1:330}:{x0:70,x1:690,y0:40,y1:240};
    const X=v=>lerp(C.x0,C.x1,v/5),V=v=>lerp(C.y1,C.y0,v/100);
    [0,25,50,75,100].forEach(v=>s+=`<line x1="${C.x0}" x2="${C.x1}" y1="${f1(V(v))}" y2="${f1(V(v))}" class="${v?'grid':'axis'}"/><text x="${C.x0-6}" y="${f1(V(v)+3)}" class="t-xs t-end">${v}%</text>`);
    [0,1,2,3,4,5].forEach(v=>s+=`<text x="${f1(X(v))}" y="${C.y1+14}" class="t-xs t-mid">${v}</text>`);s+=`<text x="${C.x1}" y="${C.y1+28}" class="t-xs t-end">years</text>`;
    const pt=(x,y,l,c,left)=>`<circle cx="${f1(X(x))}" cy="${f1(V(y))}" r="5" style="fill:none;stroke:var(--ink);stroke-width:1.8"/><text x="${f1(X(x)+(left?-8:8))}" y="${f1(V(y)-8)}" class="t-xs${left?' t-end':''}" style="fill:${c};font-weight:700">${l}</text>`;
    if(ds==='iwwd'){s+=`<text x="${C.x0}" y="22" class="t-sm" style="fill:var(--bad)">${N?'LOCAL REGROWTH, CUMULATIVE (IWWD)':'CUMULATIVE LOCAL REGROWTH AFTER A CLINICAL COMPLETE RESPONSE (IWWD, n=880)'}</text>`;
      if(Y>0)s+=`<path d="${pathFn(u=>reRegrow(u*Y*12)/100,C.x0,X(Y),C.y1,C.y0,80)}" style="fill:none;stroke:var(--bad);stroke-width:2.8"/>`;
      if(Y>=2)s+=pt(2,25.2,'25.2% at 2 years','var(--bad)',false);
      if(Y>=4.9)s+=`<text x="${f1(X(5)-4)}" y="${f1(V(94)+4)}" class="t-xs t-end" style="fill:var(--good)">5-y disease-specific survival 94%</text><text x="${f1(X(5)-4)}" y="${f1(V(85)+4)}" class="t-xs t-end" style="fill:var(--accent)">5-y overall survival 85%</text>`}
    else{s+=`<text x="${C.x0}" y="22" class="t-sm" style="fill:var(--rx)">${N?'ALIVE WITH RECTUM KEPT (OPRA)':'TME-FREE SURVIVAL: STILL HAVE THE RECTUM (OPRA, n=324)'}</text>`;
      [[53,54,'var(--rx)','consolidation'],[41,39,'var(--accent)','induction']].forEach(([a,b,c,l],i)=>{if(Y>0)s+=`<path d="${pathFn(u=>reOpra(a,b,u*Y)/100,C.x0,X(Y),C.y1,C.y0,80)}" style="fill:none;stroke:${c};stroke-width:2.6"/>`;
        if(Y>=3)s+=pt(3,a,a+'%','var(--ink)',true);if(Y>=5)s+=pt(5,b,b+'% '+l,c,true)})}
    s+=`<line x1="${f1(X(Y))}" x2="${f1(X(Y))}" y1="${C.y0}" y2="${C.y1}" style="stroke:var(--ink);opacity:.3"/>`;
    wv.innerHTML=s;
    $('#reWwCap').innerHTML=ds==='iwwd'?`Year ${f1(Y)}: about ${f1(reRegrow(Math.min(Y,5)*12))}% regrown. The curve is drawn through the published 2-year point and flattens because 88% of regrowths came in the first 2 years; its exact shape is not published here. Registry data. [[vanderValk2018]]`
      :`Year ${f1(Y)}. Curves drawn through the published 3- and 5-year points; the early shape reflects that 94% of regrowths happened within 2 years. Randomised phase II data. [[GarciaAguilar2022,Verheij2024]]`;
    $('#reWwNote').innerHTML=noteHTML(WN[ds])}
  playWire(wr,$('#reWwPlay'),drawW,7000,'%t:player.replay%','rectal');
  $$('[data-re-ww]').forEach(b=>b.addEventListener('click',()=>{ds=b.dataset.reWw;$$('[data-re-ww]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawW(+wr.value)}));
  drawW(+wr.value);

  /* ---- dMMR and dostarlimab ---- */
  const dv=$('#reDm');let yr='2025',stopD=null;
  const DN={'2022':{k:'Cercek 2022 · NEJM',t:'12 of 12: every tumour vanished',
     txt:`<span class="ev early">Early evidence</span> People with stage II–III dMMR rectal cancer received dostarlimab every 3 weeks for 6 months. All 12 who completed treatment (100%; 95% CI 74–100) had a clinical complete response; none needed chemoradiation or surgery, and there were no grade ≥3 adverse events, at 6–25 months of follow-up. [[Cercek2022]]`,
     pt:`In a small trial, a single immunotherapy drug made every one of these tumours disappear on scans and scope.`,hook:`dMMR rectal cancer + dostarlimab: 12/12 clinical complete responses. [[Cercek2022]]`},
   '2025':{k:'Cercek 2025 · NEJM',t:'49 of 49 who completed treatment',
     txt:`<span class="ev early">Early evidence</span> In the update (dostarlimab 500 mg IV every 3 weeks for 9 cycles), the rectal cohort had 50 people. All 49 who completed treatment had a clinical complete response and chose nonoperative management; 37 had a sustained response of at least 12 months at data cut. 2-year recurrence-free survival was 96% (median follow-up 30.2 months). Regulatory status: the JEMPERLI US label (effective 2025-09-02) covers endometrial cancer and previously treated "dMMR recurrent or advanced solid tumors"; it has <b>no indication for localised rectal cancer</b>, and the trial is still recruiting. [[Cercek2025,FDA-Jemperli,NCT04165772]]`,
     pt:`This is a trial result, not yet an approved standard treatment. It applies only to the small dMMR group.`,hook:`Cercek 2025: 49/49 cCR in those completing treatment; 2-year RFS 96%. Not in the FDA label. [[Cercek2025,FDA-Jemperli]]`}};
  function drawD(k){const N=vb(dv,'520 250','400 300'),n=yr==='2022'?12:50;let s='';const cols=N?10:15,g=N?34:30,x0=N?30:36,y0=N?58:58;
    s+=`<text x="${x0-14}" y="22" class="t-sm" style="fill:var(--good)">${yr==='2022'?'12 PEOPLE COMPLETED TREATMENT':'RECTAL COHORT: 50 PEOPLE'}</text>`;
    for(let i=0;i<n;i++){const r=Math.floor(i/cols),c=i%cols,x=x0+c*g,y=y0+r*g,inc=yr==='2025'&&i===n-1,on=i<n*k;
      s+=`<circle cx="${x}" cy="${y}" r="${N?12:11}" style="fill:${inc?'none':on?'var(--good)':'var(--line)'};stroke:${inc?'var(--muted)':'none'};stroke-width:1.6;${inc?'stroke-dasharray:3 2':''}"/>`;
      if(on&&!inc)s+=`<path d="M${x-5} ${y}l3.5 4l6.5 -8" style="fill:none;stroke:var(--panel);stroke-width:2.2;stroke-linecap:round"/>`}
    const ly=y0+Math.ceil(n/cols)*g+4;
    s+=`<circle cx="${x0-4}" cy="${ly}" r="6" style="fill:var(--good)"/><text x="${x0+8}" y="${ly+4}" class="t-xs">clinical complete response</text>`;
    if(yr==='2025')s+=`<circle cx="${x0+(N?190:200)}" cy="${ly}" r="6" style="fill:none;stroke:var(--muted);stroke-dasharray:3 2"/><text x="${x0+(N?202:212)}" y="${ly+4}" class="t-xs">not yet completed</text>`;
    dv.innerHTML=s}
  function showD(){$('#reDmNote').innerHTML=noteHTML(DN[yr]);if(stopD)stopD();stopD=animate(1000,p=>drawD(ease(p)))}
  $$('[data-re-dm]').forEach(b=>b.addEventListener('click',()=>{yr=b.dataset.reDm;$$('[data-re-dm]').forEach(x=>x.setAttribute('aria-pressed',x===b));showD()}));
  drawD(1);$('#reDmNote').innerHTML=noteHTML(DN[yr]);
  onHide.rectal=(f=>()=>{f&&f();if(stopD)stopD()})(onHide.rectal);
  const prevR=redraws.rectal;redraws.rectal=()=>{prevR&&prevR();drawD(1)};
};
