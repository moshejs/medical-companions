/* =============== 4.2 Infection control & contacts =============== */
const IC_PRE=[{},{tri:1},{tri:1,iso:1},{tri:1,iso:1,tx:1},{tri:1,iso:1,tx:1,uv:1,n95:1},{tri:1,iso:1,tx:1,uv:1,n95:1}];
const IC_STEPS=[
 {from:0,at:.07,k:'09:00 · waiting room',t:'Not yet recognised',
  txt:`A person with a cough of several weeks sits in a closed waiting room. CDC credits its 1994 controls with fewer US outbreaks and says the remaining risk comes mainly from people with unsuspected, undiagnosed TB. A 2026 review of 86 studies found 7.1% of exposed people infected in health care (3.8% after the 2005 ventilation standards), linked to long contact, no respirator and no negative-pressure room. [[Jensen2005,Manzoor2026]]`,
  pt:`The biggest risk in a clinic is TB nobody has noticed yet. Nobody here has done anything wrong.`,
  hook:`Hierarchy of TB infection control: administrative → environmental → respiratory protection. Administrative controls are "the first and most important level". [[WHO-IPC2019,Jensen2005]]`},
 {from:.15,at:.24,k:'09:05 · triage',t:'Find: triage and a mask',
  txt:`FAST: <b>F</b>ind cases <b>A</b>ctively, <b>S</b>eparate safely, <b>T</b>reat effectively. A cough screen at the door fast-tracks people with presumed TB and cuts their time in the building. A surgical mask on the person with TB is source control: worn by people with MDR-TB, it cut guinea-pig infection from 76.6% to 40%, a 56% reduction. WHO's respiratory hygiene asks anyone coughing to cover the mouth and nose, then clean their hands. [[Tierney2022,WHO-IPC2019,Dharmadhikari2012]]`,
  pt:`Someone at the entrance asks about cough and offers a mask. It protects everyone else, and it is offered to anyone coughing.`,
  hook:`FAST = Find cases Actively, Separate safely, Treat effectively. Patient surgical mask: −56% transmission. [[Tierney2022,Dharmadhikari2012]]`},
 {from:.32,at:.43,k:'09:20 · isolation room',t:'Separate: negative pressure',
  txt:`CDC defines an airborne infection isolation room as under negative pressure, so air flows from the corridor into the room, preferably exhausted outside: at least 0.01 inch of water gauge, and at least 12 air changes an hour for construction since 2001 (6 for older rooms). ACH = exhaust airflow (ft³/min) ÷ room volume (ft³) × 60. Where mechanical rooms are lacking, opening windows and doors gave a median 28 ACH in Lima. [[Jensen2005,Escombe2007]]`,
  pt:`A separate room pulls air in from the corridor and blows it outside, so nothing drifts back to the waiting room.`,
  hook:`AII room: negative pressure ≥0.01 in. w.g., ≥12 ACH (6 ACH if built before 2001), exhaust outside. [[Jensen2005]]`},
 {from:.5,at:.58,k:'Same day · rapid test',t:'Treat effectively',
  txt:`Effective treatment is the strongest control. On an HIV–TB ward in Lima, 90% of transmission came from MDR-TB not yet on effective treatment. In a Lima hospital using FAST, drug-susceptibility testing rose from 57.8% to 98.7% and 73.3% against 51.3% started treatment in hospital. In Viet Nam, 79.0% of people whose first test was a positive Xpert started likely effective treatment within 2 days. [[Escombe2008,Tierney2022,Le2019IJTLD]]`,
  pt:`A fast test shows which medicines will work. Starting them quickly is what stops the spread.`,
  hook:`WHO Rec. 3: prompt initiation of effective treatment (strong recommendation). Rapid DST is infection control. [[WHO-IPC2019,Dharmadhikari2014]]`},
 {from:.66,at:.74,k:'During the stay',t:'Protect staff: respirators and UV',
  txt:`Staff wear at least an N95 respirator, fit-tested at first and periodically, with annual training; for bronchoscopy or autopsy a higher level such as a powered air-purifying respirator may be considered. Upper-room UV in Lima cut guinea-pig infection from 35% to 9.5% (70% prevented on model analysis), given adequate air mixing. In 2017, health workers' TB notification rate was twice that of the general adult population. [[Jensen2005,Escombe2009,WHO-IPC2019]]`,
  pt:`Staff wear a fitted mask that filters the air they breathe. A UV lamp near the ceiling cleans the air above everyone's heads.`,
  hook:`Patients wear surgical masks (source control); staff wear fit-tested N95 or higher (respiratory protection). [[Jensen2005,Fennelly2020]]`},
 {from:.82,at:.97,k:'Weeks 0–2+',t:'Ending precautions',
  txt:`For confirmed TB in hospital, CDC keeps airborne precautions until all three apply: three consecutive negative AFB smears collected 8–24 hours apart with at least one early-morning specimen, at least 2 weeks of standard multidrug treatment, and clinical improvement. Discharge home before smear conversion is possible with a TB-programme plan and DOT arranged, if no children under 4 or immunocompromised people live there. Quoted as published, for teaching. [[Jensen2005]]`,
  pt:`Isolation ends once tests and your care team say it is safe, often after a few weeks of treatment.`,
  hook:`Confirmed TB, hospital release (CDC): 3 negative smears + ≥2 weeks of therapy + clinical improvement. [[Jensen2005]]`}
];
const IC_CON=[
 {n:'Partner',d:'shares a bedroom',ring:0,a:-55,ref:'h',res:'inf',why:'Sharing a bedroom with the index person was a risk factor for TB in contacts.',c:'[[Reichler2020Risk]]'},
 {n:'Daughter, 3',d:'household, under 5',ring:0,a:55,ref:'h',res:'win',why:'NTCA/CDC: contacts under 5 years are high priority.',c:'[[NTCA2005]]'},
 {n:'Son, 14',d:'household',ring:0,a:180,ref:'h',res:'dis',why:'Household contacts are the highest-yield group in every setting.',c:'[[Fox2013]]'},
 {n:'Grandmother',d:'prednisone 20 mg for 2 months',ring:1,a:-120,ref:'h',res:'inf',why:'NTCA/CDC: more than 15 mg prednisone a day for over 4 weeks makes a contact high priority.',c:'[[NTCA2005]]'},
 {n:'Friend with HIV',d:'visits weekly',ring:1,a:0,ref:'h',res:'neg',why:'NTCA/CDC: people with HIV are high priority; WHO also recommends preventive treatment for people living with HIV once TB disease is excluded.',c:'[[NTCA2005,WHO-Mod1-2024]]'},
 {n:'Coworker',d:'shared office, 40 h/week',ring:1,a:100,ref:'m',res:'inf',why:'Long exposure: infection prevalence rose 8.2% per 250 exposure hours.',c:'[[Reichler2020Hours]]'},
 {n:'Carpool colleague',d:'1 h a day in a car',ring:1,a:150,ref:'m',res:'neg',why:'Regular shared air in a small space, fewer hours than the household.',c:'[[Reichler2020Hours]]'},
 {n:'Teammate',d:'football, outdoors',ring:2,a:-75,ref:'l',res:'neg',why:'Brief or outdoor contact: evaluated only if the investigation expands.',c:'[[NTCA2005]]'},
 {n:'Neighbour',d:'chats at the door',ring:2,a:25,ref:'l',res:'neg',why:'Brief contact: evaluated only if the investigation expands.',c:'[[NTCA2005]]'},
 {n:'Bus passenger',d:'one 20-minute ride',ring:2,a:112,ref:'l',res:'neg',why:'Brief contact: evaluated only if the investigation expands.',c:'[[NTCA2005]]'}];
inits.control=()=>{
  const svg=$('#icSvg'),rg=$('#icT');const S={tri:0,iso:0,tx:0,uv:0,n95:0};let lastPh=-1,setSt=()=>{};
  const sync=()=>$$('[data-icl]').forEach(b=>b.setAttribute('aria-pressed',!!S[b.dataset.icl]));
  const R=rng(4242),DOTS=[];for(let i=0;i<40;i++)DOTS.push([R(),R(),R()*6.28,R()<.25]);
  function zones(N){return N?{A:[14,40,386,190],C:[14,190,386,250],W:[14,250,250,450],K:[250,250,386,450],T:[14,450,386,540]}
    :{W:[20,40,300,290],T:[20,290,300,400],C:[300,40,410,400],A:[410,40,700,210],K:[410,230,700,400]}}
  const at=(z,u,v)=>[lerp(z[0],z[2],u),lerp(z[1],z[3],v)];
  function draw(t){
    const N=vb(svg,'720 430','400 600'),Z=zones(N);
    const ph=phaseOf(IC_STEPS,t);if(ph!==lastPh){lastPh=ph;Object.keys(S).forEach(k=>S[k]=IC_PRE[ph][k]?1:0);sync()}
    const st=IC_STEPS[ph],nx=ph<IC_STEPS.length-1?IC_STEPS[ph+1].from:1,k=ramp(t,st.from,nx);
    /* source and concentrations (relative to an unrecognised source in the closed waiting room) */
    const txF=S.tx?(ph===3?lerp(1,.05,ease(k)):.05):1,q=(S.tri?.44:1)*txF,uvF=S.uv?.3:1,inA=!!S.iso;
    const rel={W:inA?0:q*uvF,T:inA?0:q*.7*uvF,C:inA?0:q*.35*uvF,K:inA?0:q*.08*uvF,A:inA?q*1.6/12*uvF:0};
    let s=`<defs>${marker('icAr','var(--air)')}${marker('icArO','var(--muted)')}</defs>`;
    /* haze per room */
    Object.keys(Z).forEach(n=>{const z=Z[n],o=Math.sqrt(clamp(rel[n]))*.42;s+=`<rect x="${z[0]}" y="${z[1]}" width="${z[2]-z[0]}" height="${z[3]-z[1]}" style="fill:var(--field)"/>`;
      if(o>.01)s+=`<rect x="${z[0]}" y="${z[1]}" width="${z[2]-z[0]}" height="${z[3]-z[1]}" style="fill:var(--tb);opacity:${f1(o*100)/100}"/>`;
      const nd=Math.round(Math.sqrt(clamp(rel[n]))*(n==='C'?10:16)),tau=t*300;
      for(let i=0;i<nd;i++){const d=DOTS[(i*7+n.charCodeAt(0))%DOTS.length];const u=((d[0]+tau*.002*(1+i%3))%1),v=clamp(d[1]+.06*Math.sin(tau*.04+d[2]),.05,.95);s+=droplet(lerp(z[0]+6,z[2]-6,u),lerp(z[1]+6,z[3]-6,v),2.4,{bac:d[3]})}
      if(S.uv&&n!=='A'&&n!=='K')s+=`<rect x="${z[0]}" y="${z[1]}" width="${z[2]-z[0]}" height="${N&&n==='T'?8:12}" style="fill:var(--vax);opacity:.35"/>`});
    /* walls with door gaps */
    Object.keys(Z).forEach(n=>{const z=Z[n];s+=`<rect x="${z[0]}" y="${z[1]}" width="${z[2]-z[0]}" height="${z[3]-z[1]}" style="fill:none;stroke:var(--ink);stroke-width:2"/>`});
    const gap=(x1,y1,x2,y2)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" style="stroke:var(--field);stroke-width:5"/>`;
    const dA=N?[200,190]:[410,150],dW=N?[150,250]:[300,170],dK=N?[318,250]:[410,320],dT=N?[150,450]:[160,290],dEx=N?[14,500]:[20,370];
    s+=N?gap(180,190,220,190)+gap(130,250,170,250)+gap(298,250,338,250)+gap(110,450,190,450)+gap(14,485,14,520)
        :gap(410,130,410,170)+gap(300,150,300,190)+gap(410,300,410,340)+gap(130,290,190,290)+gap(20,355,20,390);
    /* room labels */
    const lab=(n,txt)=>{const z=Z[n];s+=`<text x="${z[0]+6}" y="${z[3]-6}" class="t-xs">${txt}</text>`};
    lab('W','WAITING ROOM · windows closed');lab('T',N?'ENTRANCE · TRIAGE':'ENTRANCE · TRIAGE DESK');lab('C','CORRIDOR');lab('A',inA?'ISOLATION ROOM · ≥12 ACH':'ISOLATION ROOM');lab('K','CONSULTING');
    /* negative pressure and exhaust */
    if(inA){const off=(t*300)%24;
      s+=N?`<path d="M200 226V200" style="stroke:var(--air);stroke-width:2.2;fill:none;stroke-dasharray:6 6;stroke-dashoffset:${f1(off)}" marker-end="url(#icAr)"/><path d="M360 60V24" style="stroke:var(--air);stroke-width:2.2;fill:none" marker-end="url(#icAr)"/><text x="354" y="20" class="t-xs t-end" style="fill:var(--air)">exhaust outside</text><text x="210" y="216" class="t-xs" style="fill:var(--air)">air flows in (negative pressure)</text>`
         :`<path d="M372 150H404" style="stroke:var(--air);stroke-width:2.2;fill:none;stroke-dasharray:6 6;stroke-dashoffset:${f1(-off)}" marker-end="url(#icAr)"/><path d="M680 60V18" style="stroke:var(--air);stroke-width:2.2;fill:none" marker-end="url(#icAr)"/><text x="674" y="16" class="t-xs t-end" style="fill:var(--air)">exhaust outside</text><text x="318" y="140" class="t-xs" style="fill:var(--air)">air in</text>`}
    /* people in the waiting room */
    const sp=N?34:44,others=N?[[.45,.3],[.7,.32],[.62,.68],[.85,.7]]:[[.5,.25],[.75,.25],[.6,.62],[.85,.6],[.4,.62]];
    others.forEach(([u,v],i)=>{const[x,y]=at(Z.W,u,v);s+=person(x,y-sp/2,sp,'var(--muted)',{face:i%2?1:-1,op:.8})});
    /* staff */
    const[nx0,ny0]=at(Z.T,.55,.35);s+=`<rect x="${f1(nx0-22)}" y="${f1(ny0+sp*.55)}" width="44" height="8" rx="2" style="fill:var(--fibro)"/>`+person(nx0,ny0-6,sp,'var(--rx)',{n95:!!S.n95,face:-1});
    const[dx0,dy0]=at(Z.K,.86,.55);s+=person(dx0,dy0-sp/2,sp,'var(--rx)',{n95:!!S.n95,face:-1});
    if(ph>=4&&inA){const[ax,ay]=at(Z.A,.28,.5);s+=person(ax,ay-sp/2,sp,'var(--rx)',{n95:!!S.n95,face:1});if(S.n95)s+=`<text x="${f1(ax)}" y="${f1(ay+sp*.62)}" class="t-xs t-mid" style="fill:var(--rx)">fit-tested N95</text>`}
    /* the person with TB: path between places */
    const seatW=at(Z.W,.2,.4),seatApart=at(Z.W,.12,.18),desk=at(Z.T,.3,.4),bed=at(Z.A,.62,.5),exitP=N?[30,505]:[40,372];
    let P=seatW;
    const path=pts=>{const L=[];let tot=0;for(let i=1;i<pts.length;i++){const d=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);L.push(d);tot+=d}return u=>{let d=u*tot;for(let i=0;i<L.length;i++){if(d<=L[i])return[lerp(pts[i][0],pts[i+1][0],d/L[i]),lerp(pts[i][1],pts[i+1][1],d/L[i])];d-=L[i]}return pts[pts.length-1]}};
    if(inA){P=bed;if(ph===2&&k<.45)P=path([S.tri?seatApart:seatW,dW,N?[160,220]:[355,170],N?[200,220]:[355,150],dA,bed])(ease(k/.45));
      if(ph===5&&k>.8)P=path([bed,dA,N?[200,220]:[355,150],N?[30,220]:[355,372],exitP])(ease(ramp(k,.8,1)))}
    else if(S.tri){P=ph===1&&k<.4?path([seatW,dT,desk])(ease(k/.4)):ph===1&&k<.6?desk:ph===1?path([desk,dT,seatApart])(ease(ramp(k,.6,.85))):seatApart}
    const coughing=!S.tri&&txF>.5&&Math.sin(t*900)>.2;
    s+=person(P[0],P[1]-sp/2,sp,'var(--tb)',{cough:coughing,mask:!!S.tri,face:1});
    s+=`<text x="${f1(P[0])}" y="${f1(P[1]+sp*.62)}" class="t-xs t-mid" style="fill:var(--tb)">${S.tri?'masked':'coughing'}</text>`;
    if(S.tx){s+=pill(P[0]+sp*.55,P[1]-sp*.2,16,'var(--dR)',{ang:-30})}
    /* step-specific overlays */
    if(ph===1&&k<.7){const[x,y]=at(Z.T,.55,.85);s+=`<text x="${f1(x)}" y="${f1(y)}" class="t-xs t-mid" style="fill:var(--rx)">cough screen · mask offered</text>`}
    if(ph===3){const[x,y]=at(Z.A,.62,.18);s+=sputum(x-40,y+8,.7,{fill:.5})+`<text x="${f1(x-20)}" y="${f1(y+6)}" class="t-xs" style="fill:var(--accent)">${k>.3?'rapid test: drug-susceptible':'rapid molecular test…'}</text>`}
    if(ph===5){const z=Z.K,x=z[0]+10,y=z[1]+18;let c=`<text x="${x}" y="${y}" class="t-xs" style="fill:var(--ink);font-weight:700">CDC release checklist</text>`;
      [['smear 1 negative',.1],['smear 2 negative',.25],['smear 3 negative (early morning)',.4],['≥2 weeks of standard treatment',.55],['clinical improvement',.7]].forEach(([l,a],i)=>{const on=k>a;c+=`<text x="${x}" y="${y+16+i*14}" class="t-xs" style="fill:${on?'var(--good)':'var(--muted)'}">${on?'✓':'○'} ${N&&l.length>22?l.replace(' (early morning)','').replace('of standard ',''):l}</text>`});
      s+=`<rect x="${z[0]+4}" y="${z[1]+4}" width="${N?128:196}" height="88" rx="6" style="fill:var(--panel);stroke:var(--line)"/>`+c}
    svg.innerHTML=s;setSt(ph);
    const pc=v=>Math.round(clamp(v)*100)+'%';
    $('#icRead').innerHTML=`<span>waiting room <b>${pc(rel.W)}</b></span><span>corridor <b>${pc(rel.C)}</b></span><span>isolation room <b>${pc(rel.A)}</b></span><span>staff respirators <b>${S.n95?'on':'off'}</b></span><span class="stage-cap">vs. the unrecognised start</span>`;
    $('#icNote').innerHTML=noteHTML(st);
  }
  const stop=playWire(rg,$('#icPlay'),draw,26000,'Replay','control');
  setSt=stepWire($('#icSteps'),IC_STEPS,rg,draw,stop);
  $$('[data-icl]').forEach(b=>b.addEventListener('click',()=>{const kk=b.dataset.icl;S[kk]=S[kk]?0:1;sync();draw(+rg.value)}));
  draw(+rg.value);

  /* ---- contact investigation ---- */
  const csv=$('#ciSvg'),cr=$('#ciT'),PR={h:'High',m:'Medium',l:'Low'};let check=false;
  $('#ciSel').innerHTML=IC_CON.map((c,i)=>`<label for="ciP${i}">${c.n}<small>${c.d}</small><select id="ciP${i}"><option value="">Choose…</option><option value="h">High</option><option value="m">Medium</option><option value="l">Low</option></select></label>`).join('');
  const pri=i=>$('#ciP'+i).value;
  const EXP=21;/* day the illustrative investigation expands (a secondary case is found) */
  function state(i,d){const c=IC_CON[i],p=pri(i);if(!p)return{s:'listed',l:'not yet prioritised'};
    const expand=d>=EXP&&IC_CON.some((x,j)=>x.res==='dis'&&pri(j)&&pri(j)!=='l');
    const tday=p==='h'?7:p==='m'?14:expand?EXP+7:null;
    if(tday==null)return d>=3?{s:'wait',l:'low priority: evaluated only if the investigation expands'}:{s:'listed',l:'listed'};
    if(d<Math.min(3,tday))return{s:'listed',l:'listed'};
    if(d<tday)return{s:'assessed',l:'assessed face to face'};
    if(d<tday+3)return{s:'tested',l:'tested'};
    if(c.res==='inf')return{s:'inf',l:'TB infection · disease excluded · preventive treatment offered'};
    if(c.res==='dis')return{s:'dis',l:'TB disease found · treatment started'};
    if(c.res==='win')return d>=63?{s:'neg',l:'retest at 8–10 weeks negative · window treatment stops'}:{s:'win',l:'first test negative · window prophylaxis until retest'};
    return{s:'neg',l:c.ref==='h'&&/HIV/.test(c.n)?'negative · TPT considered (HIV)':'negative · no further action'}}
  function drawC(){const N=vb(csv,'720 420','400 690'),d=+cr.value,setv=$('#ciSet').value;
    const O=N?{cx:200,cy:204,R:[80,138,190]}:{cx:200,cy:212,R:[80,138,192]};let s='';
    const ringC=['var(--tb)','var(--warn)','var(--accent)'],ringN=['household','close','casual'];
    for(let r=2;r>=0;r--)s+=`<circle cx="${O.cx}" cy="${O.cy}" r="${O.R[r]}" style="fill:${ringC[r]};fill-opacity:.06;stroke:var(--line);stroke-width:1.2"/><text x="${O.cx-O.R[r]+5}" y="${O.cy+4}" class="t-xs">${ringN[r]}</text>`;
    const exp=d>=EXP&&IC_CON.some((x,j)=>x.res==='dis'&&pri(j)&&pri(j)!=='l');
    if(exp)s+=`<circle cx="${O.cx}" cy="${O.cy}" r="${O.R[2]+6}" style="fill:none;stroke:var(--warn);stroke-width:2;stroke-dasharray:6 4"/>`;
    s+=person(O.cx,O.cy-18,34,'var(--tb)',{})+`<text x="${O.cx}" y="${O.cy+28}" class="t-xs t-mid" style="fill:var(--tb)">person with TB</text>`;
    const colP={h:'var(--bad)',m:'var(--warn)',l:'var(--accent)','':'var(--muted)'};
    IC_CON.forEach((c,i)=>{const ang=(c.a-90)*Math.PI/180;
      const rad=c.ring===0?54:c.ring===1?110:166;const x=O.cx+Math.cos(ang)*rad,y=O.cy+Math.sin(ang)*rad;
      const p=pri(i),st=state(i,d),sz=26;
      s+=person(x,y-sz/2,sz,colP[p],{});
      const bx=x+11,by=y-sz/2;
      if(st.s==='assessed')s+=`<circle cx="${f1(bx)}" cy="${f1(by)}" r="5" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.2"/>`;
      if(st.s==='tested')s+=`<circle cx="${f1(bx)}" cy="${f1(by)}" r="5.5" style="fill:var(--accent)"/><text x="${f1(bx)}" y="${f1(by+3)}" class="t-xs t-mid" style="fill:var(--panel);font-size:7px">T</text>`;
      if(st.s==='inf')s+=`<circle cx="${f1(bx)}" cy="${f1(by)}" r="6.5" style="fill:var(--gold)"/><text x="${f1(bx)}" y="${f1(by+3)}" class="t-xs t-mid" style="fill:var(--panel);font-size:7px;font-weight:700">TPT</text>`;
      if(st.s==='dis')s+=`<circle cx="${f1(bx)}" cy="${f1(by)}" r="6.5" style="fill:var(--bad)"/><text x="${f1(bx)}" y="${f1(by+3)}" class="t-xs t-mid" style="fill:var(--panel);font-size:7px;font-weight:700">Rx</text>`;
      if(st.s==='win')s+=`<circle cx="${f1(bx)}" cy="${f1(by)}" r="6.5" style="fill:var(--vax)"/><text x="${f1(bx)}" y="${f1(by+3)}" class="t-xs t-mid" style="fill:var(--panel);font-size:7px;font-weight:700">W</text>`;
      if(st.s==='neg')s+=`<path d="M${f1(bx-4)} ${f1(by)}l3 3l6 -6" style="fill:none;stroke:var(--good);stroke-width:2"/>`;
      if(check&&p)s+=`<text x="${f1(x-12)}" y="${f1(by)}" class="t-xs t-end" style="fill:${p===c.ref?'var(--good)':'var(--warn)'};font-weight:700">${p===c.ref?'✓':'?'}</text>`;
      s+=`<text x="${f1(x)}" y="${f1(y+sz/2+10)}" class="t-xs t-mid" style="fill:var(--ink)">${c.n}</text>`});
    /* side panel: milestones and yield */
    const P=N?{x:20,y:410,w:360}:{x:410,y:24,w:296};
    s+=`<text x="${P.x}" y="${P.y}" class="t-sm" style="fill:var(--vax)">DAY ${d} · ${d<7?'week 1':'week '+Math.floor(d/7+1)}</text>`;
    const MS=[[0,'report to public health; interview'],[3,'first assessments (3 working days)'],[7,'high priority tested (7 working days)'],[14,'medium priority tested (14 days)'],[EXP,'secondary case → widen the circle'],[56,'under-5 retest at 8–10 weeks']];
    MS.forEach(([dd,l],i)=>{const on=d>=dd,y=P.y+18+i*16;s+=`<circle cx="${P.x+5}" cy="${y-3}" r="4" style="fill:${on?'var(--vax)':'var(--panel)'};stroke:var(--vax)"/><text x="${P.x+14}" y="${y}" class="t-xs" style="fill:${on?'var(--ink)':'var(--muted)'}">day ${dd}: ${l}</text>`});
    const Y={lmic:{dis:3.1,inf:51.5,n:'low- and middle-income settings'},hic:{dis:1.4,inf:28.1,n:'high-income settings'}}[setv];
    const gy=P.y+130,gs=N?13:11.5,nd=Math.round(Y.dis),ni=Math.round(Y.inf);
    s+=`<text x="${P.x}" y="${gy-10}" class="t-sm">OF 100 CONTACTS · ${N?'published average':'published average'}</text>`;
    for(let i=0;i<100;i++){const x=P.x+(i%20)*gs,y=gy+Math.floor(i/20)*gs,col=i<nd?'var(--bad)':i<nd+ni?'var(--gold)':'var(--panel-2)';s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(gs-2)}" height="${f1(gs-2)}" rx="2" style="fill:${col}"/>`}
    const ly=gy+5*gs+14;
    s+=`<text x="${P.x}" y="${ly}" class="t-xs"><tspan style="fill:var(--bad)">■ TB disease ${Y.dis}%</tspan>   <tspan style="fill:var(--gold)">■ TB infection ${Y.inf}%</tspan></text><text x="${P.x}" y="${ly+14}" class="t-xs">${Y.n}</text><text x="${P.x}" y="${ly+28}" class="t-xs">separate pooled figures, rounded</text>`;
    s+=`<text x="${P.x}" y="${ly+50}" class="t-xs"><tspan style="fill:var(--accent)">T</tspan> tested   <tspan style="fill:var(--gold)">TPT</tspan> preventive treatment</text><text x="${P.x}" y="${ly+64}" class="t-xs"><tspan style="fill:var(--vax)">W</tspan> window prophylaxis   <tspan style="fill:var(--bad)">Rx</tspan> TB treatment   <tspan style="fill:var(--good)">✓</tspan> negative</text>`;
    csv.innerHTML=s;
    /* select feedback */
    IC_CON.forEach((c,i)=>{const lb=$('#ciP'+i).parentElement,p=pri(i);lb.classList.toggle('ok',check&&p===c.ref);lb.classList.toggle('off',check&&!!p&&p!==c.ref)});
    /* note */
    const chosen=IC_CON.filter((c,i)=>pri(i)).length,kidLow=pri(1)==='l'||(!pri(1)&&d>=7);
    let txt,k2,t2;
    if(check){const ok=IC_CON.filter((c,i)=>pri(i)===c.ref).length;k2='Compared with the criteria';t2=`${ok} of 10 match`;
      txt=IC_CON.map((c,i)=>`<b>${c.n}</b>: ${PR[c.ref]}. ${c.why} ${c.c}`).join('<br>')}
    else if(chosen<10&&d<3){k2='Day 0';t2='Report, interview, list';txt=`Public health hears of the case the day it is reported and interviews the person in their own language, protecting confidentiality. The infectious period is set to start 3 months before diagnosis. Choose a priority for each contact above, then move the timeline. [[Jensen2005,NTCA2005]]`}
    else if(kidLow){k2='A risk to watch';t2='The youngest contact waits';txt=`The 3-year-old has not been given high priority. NTCA/CDC makes contacts under 5 high priority, tested within 7 working days and, if the first test is negative and exposure was under 8 weeks ago, given window prophylaxis until a retest at 8–10 weeks. Among child contacts, 83% of TB in under-5s was diagnosed within 90 days of the first visit. [[NTCA2005,Martinez2020Lancet]]`}
    else if(d<EXP){k2='Weeks 1–3';t2='Testing by priority';txt=`High-priority contacts should have a skin test within 7 working days and medium-priority within 14; an induration of 5 mm or more counts as positive for any contact. Infection or disease is looked for first, because contact investigation finds disease as much as it prevents it: in Amsterdam, 57 of 739 infected contacts had TB at screening against 14 who developed it later. [[NTCA2005,Sloot2014]]`}
    else if(d<56){k2='Week 4 onward';t2=exp?'The circle widens':'Holding the line';txt=`${exp?'A secondary case (the son) is evidence of more transmission than expected, so the investigation expands to the next circle. ':''}NTCA/CDC expands beyond high- and medium-priority contacts only on such evidence: infection or disease in 10% of high-priority contacts (or twice the background), secondary cases, or infection in children under 5. Among 1406 skin-test-positive contacts, TB developed in 9.8% who never started preventive treatment and 0.2% who completed it. [[NTCA2005,Reichler2020Risk]]`}
    else{k2='Weeks 8–12';t2='Retest and follow up';txt=`The window retest at 8–10 weeks decides whether the young child stops or completes preventive treatment. Among close contacts in the US and Canada, 51% of contact TB was diagnosed by 1 month, 75% by 3 months and 92% by 12 months, and the investigation itself found 77% of it. In Viet Nam's ACT2 trial, active household investigation registered 1788 TB cases per 100,000 contacts against 703 with passive case finding. [[NTCA2005,Reichler2018,Fox2018NEJM]]`}
    $('#ciNote').innerHTML=noteHTML({k:k2,t:t2,txt,
      pt:`Health workers check the people who shared air with the person with TB, starting with young children and those with weaker immunity, and offer preventive medicine to those who need it.`,
      hook:`High priority (NTCA/CDC): under 5, HIV, >15 mg prednisone for >4 weeks or other immunosuppression. First assessment within 3 working days; window prophylaxis for under-5s. [[NTCA2005]]`});
  }
  cr.addEventListener('input',drawC);$('#ciSet').addEventListener('change',drawC);
  $$('#ciSel select').forEach(x=>x.addEventListener('change',drawC));
  $('#ciCheck').addEventListener('click',()=>{check=!check;$('#ciCheck').setAttribute('aria-pressed',check);drawC()});
  drawC();
  redraws.control=(f=>()=>{f&&f();drawC()})(redraws.control);
};
