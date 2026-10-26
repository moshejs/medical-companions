/* =============== 2.2 Colonoscopy, animated =============== */
const CO_STEPS=[
 {from:0,at:.09,k:'Step 1 · Prep',t:'Bowel preparation',
  txt:`The bowel must be empty for the lining to be seen. Prep quality is scored on the Boston Bowel Preparation Scale: 0–3 for each of three segments, 0–9 in total. In validation, scores of 5 or more were linked to a higher polyp detection rate (40% vs 24%). The 2024 indicators expect an adequate prep (at least 2 in every segment) in ≥90% of exams. In a randomised trial after positive FIT, split-dose prep raised ADR from 40.9% to 53.0%. [[Lai2009,Rex2024,Radaelli2017]]`,
  poor:` With a poor prep, stool stays on the lining and a segment scores below 2.`,
  pt:`A good bowel prep, split between the evening before and the morning of the test, helps the doctor see small polyps. [[Radaelli2017]]`,
  hook:`BBPS: 3 segments × 0–3 = 0–9. Adequate = ≥2 in each segment. [[Lai2009,Rex2024]]`},
 {from:.16,at:.3,k:'Step 2 · Insertion',t:'To the caecum',
  txt:`The scope is advanced through the rectum, sigmoid, descending, transverse and ascending colon to the caecum, the very start of the large bowel. Reaching it is documented with a photo. Targets: caecal intubation ≥95% (ACG/ASGE 2024); ESGE's minimum is 90%. Using CO2 instead of air cut moderate or severe pain afterwards from 16.7% to 4.2%. [[Rex2024,Kaminski2017ESGE,Bretthauer2016]]`,
  pt:`If the scope does not reach the caecum, part of the bowel goes unseen.`,
  hook:`Caecal intubation ≥95% with photo documentation. [[Rex2024]]`},
 {from:.4,at:.52,k:'Step 3 · Withdrawal',t:'Careful inspection on the way out',
  txt:`The real examination happens during withdrawal, looking behind each fold. Endoscopists with mean withdrawal times of 6 minutes or more found neoplasia in 28.3% of patients vs 11.8% for faster ones. Each extra minute raised ADR by 3.6%, and withdrawal under 6 minutes was linked to 2.3 times the interval-cancer rate. The 2024 target is an average of ≥8 minutes in normal colonoscopies. [[Barclay2006,Shaukat2015,Rex2024]]`,
  pt:`Slow and careful finds more. The clock that matters is the one running on the way out.`,
  hook:`Withdrawal <6 min: interval-cancer IRR 2.3. Target average ≥8 min. [[Shaukat2015,Rex2024]]`},
 {from:.6,at:.67,k:'Step 4 · Polyp found',t:'A polyp behind a fold',
  txt:`A small polyp appears on the far side of a fold. In tandem studies colonoscopy missed 26% of adenomas, 9% of advanced adenomas and 27% of serrated polyps. Physicians with higher ADRs had fewer interval cancers: 9.8 down to 4.8 per 10,000 person-years from the lowest to the highest ADR quintile. [[Zhao2019,Corley2014]]`,
  poor:` <b>Poor prep:</b> here the polyp is covered by stool and is not seen. An adequate prep must show polyps larger than 5 mm. [[Gupta2020]]`,
  pt:`A careful colonoscopy finds more polyps. Doctors who find more polyps have patients who get fewer later cancers. [[Corley2014]]`,
  hook:`Screening ADR target ≥35% (≥40% men, ≥30% women). [[Rex2024]]`},
 {from:.72,at:.8,k:'Step 5 · Polypectomy',t:'Snare and cut',
  txt:`A wire snare is passed through the scope, opened around the polyp's base and closed to cut it off. The 2024 indicators expect a cold snare (no electric current) for 4–9 mm lesions in ≥90% of cases. Polypectomy adds risk: perforation 0.8 and post-polypectomy bleeding 9.8 per 1,000. Removing adenomas works: the National Polyp Study found 76–90% lower CRC incidence and 53% fewer CRC deaths. [[Rex2024,Reumkens2016,Winawer1993,Zauber2012]]`,
  poor:` <b>Poor prep:</b> there is nothing to snare because the polyp was never seen.`,
  pt:`Colonoscopy can find and remove a polyp in the same visit, before it can turn into cancer. [[Zauber2012]]`,
  hook:`National Polyp Study: incidence −76 to 90%, mortality −53%. [[Winawer1993,Zauber2012]]`},
 {from:.86,at:.97,k:'Step 6 · Retrieval',t:'To pathology, then a plan',
  txt:`The polyp is suctioned into a trap and sent to pathology. What it turns out to be, and how many there were, sets the next colonoscopy (module 2.3). Serious harms of screening colonoscopy are uncommon: perforation 3.1 and major bleeding 14.6 per 10,000 procedures. [[Gupta2020,Lin2021]]`,
  poor:` <b>Poor prep:</b> the polyp is left behind, unseen.`,
  pt:`Serious problems from colonoscopy are rare: about 3 tears and 15 major bleeds for every 10,000 tests. [[Lin2021]]`,
  hook:`1–2 tubular adenomas <10 mm → next colonoscopy in 7–10 years (USMSTF 2020). [[Gupta2020]]`}
];
const CO_FIT=[['8–30 d',30,8],['2 mo',28,7],['3 mo',31,7],['4–6 mo',31,9],['7–9 mo',43,13],['10–12 mo',49,19],['>12 mo',76,31]];
inits.colonoscopy=()=>{
  const svg=$('#coSvg'),rg=$('#coT'),note=$('#coNote');
  let poor=false;const UP=.42;
  const R0=rng(11),STOOL=[...Array(9)].map(()=>({a:R0()*Math.PI*2,d:.35+R0()*.5,r:.08+R0()*.1}));
  const MAPST=[.06,.18,.31,.45,.58,.69,.79,.88,.95];
  function cam(cx,cy,R,o){
    let s=`<defs><clipPath id="coClip"><circle cx="${cx}" cy="${cy}" r="${R}"/></clipPath></defs><g clip-path="url(#coClip)">`;
    s+=`<rect x="${cx-R}" y="${cy-R}" width="${2*R}" height="${2*R}" style="fill:var(--mucosa)"/>`;
    const lx=cx+Math.cos(o.rot)*R*.1,ly=cy+Math.sin(o.rot)*R*.08;
    for(let j=7;j>=0;j--){let d=((j+o.z)%8+8)%8/8;const r=R*(.13+1.05*Math.pow(d,1.7));
      const ex=lerp(lx,cx,d),ey=lerp(ly,cy,d);
      s+=`<ellipse cx="${f1(ex)}" cy="${f1(ey)}" rx="${f1(r)}" ry="${f1(r*.9)}" style="fill:none;stroke:var(--mucosa-line);stroke-width:${f1(1+4*d)};opacity:${f1(.2+.6*d)}"/>`}
    s+=`<path d="M${f1(cx-R*.7)} ${f1(cy-R*.2)}q${f1(R*.2)} ${f1(-R*.15)} ${f1(R*.35)} ${f1(-R*.05)}t${f1(R*.3)} ${f1(-R*.12)}M${f1(cx+R*.2)} ${f1(cy+R*.55)}q${f1(R*.15)} ${f1(-R*.1)} ${f1(R*.3)} 0" style="fill:none;stroke:var(--vessel);stroke-width:1.2;opacity:.45"/>`;
    s+=`<circle cx="${f1(lx)}" cy="${f1(ly)}" r="${f1(R*.12)}" style="fill:var(--scope);opacity:.85"/>`;
    if(o.land>0)s+=`<g style="opacity:${f1(o.land)}"><path d="M${f1(cx-R*.45)} ${f1(cy+R*.3)}q${f1(R*.12)} ${f1(-R*.12)} ${f1(R*.24)} 0" style="fill:none;stroke:var(--mucosa-line);stroke-width:3"/><path d="M${f1(cx+R*.15)} ${f1(cy-R*.45)}q${f1(R*.25)} ${f1(R*.05)} ${f1(R*.45)} ${f1(R*.2)}" style="fill:none;stroke:var(--mucosa-line);stroke-width:5;opacity:.8"/>
      <text x="${f1(cx-R*.33)}" y="${f1(cy+R*.48)}" class="t-xs t-mid" style="fill:var(--ink)">appendiceal orifice</text><text x="${f1(cx+R*.4)}" y="${f1(cy-R*.5)}" class="t-xs t-mid" style="fill:var(--ink)">ileocaecal valve</text></g>`;
    const P=o.polyp;
    if(P&&P.k>0&&!P.gone){const sz=R*(.16+.22*P.k),px=lerp(cx+R*.28,lx,P.suck||0),py=lerp(cy+R*.5,ly,P.suck||0),sc=1-(P.suck||0)*.85;
      s+=`<g transform="translate(${f1(px)} ${f1(py)}) scale(${f1(sc)}) translate(${f1(-px)} ${f1(-py)})">`;
      if(!P.lift)s+=`<path d="M${f1(px-sz*1.2)} ${f1(py+2)}q${f1(sz*1.2)} ${f1(-6)} ${f1(sz*2.4)} 0" style="fill:none;stroke:var(--mucosa-line);stroke-width:2"/>`;
      s+=`<g transform="translate(0 ${f1(-(P.lift||0)*sz*.6)})">${polyp(px,py,sz,.12,{seed:4})}</g></g>`;
      if(P.cut>0&&!P.suck)s+=`<ellipse cx="${f1(cx+R*.28)}" cy="${f1(cy+R*.5+3)}" rx="${f1(sz*.35)}" ry="${f1(sz*.12)}" style="fill:var(--cell);stroke:var(--mucosa-line);opacity:${f1(P.cut)}"/>`;
    }
    if(P&&P.snare>0){const sz=R*.38,px=cx+R*.28,py=cy+R*.5-sz*.15,c=P.snare;
      s+=`<path d="M${f1(cx-R*.75)} ${f1(cy+R*.85)}L${f1(px-sz*(1-.55*c))} ${f1(py)}" style="stroke:var(--scope);stroke-width:4;stroke-linecap:round"/>`;
      s+=`<ellipse cx="${f1(px)}" cy="${f1(py)}" rx="${f1(sz*(1-.55*c))}" ry="${f1(sz*.32*(1-.35*c))}" style="fill:none;stroke:var(--scope);stroke-width:2.2"/>`}
    if(o.stool>0)STOOL.forEach((b,i)=>{const bx=cx+Math.cos(b.a)*R*b.d,by=cy+Math.sin(b.a)*R*b.d*.9;s+=`<ellipse cx="${f1(bx)}" cy="${f1(by)}" rx="${f1(R*b.r*1.3)}" ry="${f1(R*b.r)}" style="fill:var(--stool);opacity:${f1(o.stool*.85)}"/>`});
    if(o.cover)s+=`<ellipse cx="${f1(cx+R*.28)}" cy="${f1(cy+R*.44)}" rx="${f1(R*.3)}" ry="${f1(R*.2)}" style="fill:var(--stool);opacity:.95"/><ellipse cx="${f1(cx+R*.18)}" cy="${f1(cy+R*.36)}" rx="${f1(R*.14)}" ry="${f1(R*.1)}" style="fill:var(--stool);opacity:.9"/>`;
    if(o.flash>0)s+=`<rect x="${cx-R}" y="${cy-R}" width="${2*R}" height="${2*R}" style="fill:var(--panel);opacity:${f1(o.flash*.7)}"/>`;
    s+=`</g><circle cx="${cx}" cy="${cy}" r="${R}" style="fill:none;stroke:var(--scope);stroke-width:7"/>`;
    return s}
  function prepPanel(cx,cy,R,p){
    const sc=poor?[1,1,2]:[3,3,3],nm=['Rt','Tr','Lt'];
    let s=`<circle cx="${cx}" cy="${cy}" r="${R}" style="fill:var(--panel-2);stroke:var(--line);stroke-width:2"/>`;
    s+=`<text x="${cx}" y="${f1(cy-R*.62)}" class="t-lbl t-mid">Split-dose prep</text>`;
    [['Evening before',ramp(p,0,.45)],['Morning of',ramp(p,.5,.95)]].forEach(([n,q],i)=>{const x=cx-R*.74+i*R*.38,y=cy-R*.42,h=R*.42;
      s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(R*.2)}" height="${f1(h)}" rx="4" style="fill:var(--panel);stroke:var(--accent);stroke-width:1.4"/><rect x="${f1(x+2)}" y="${f1(y+h*(.1+.88*q))}" width="${f1(R*.2-4)}" height="${f1(h*.88*(1-q))}" rx="3" style="fill:var(--rx);opacity:.6"/>`;
      s+=`<text x="${f1(x+R*.1)}" y="${f1(y+h+12)}" class="t-xs t-mid">${i?'morning':'evening'}</text>`});
    let tot=0;
    sc.forEach((v,i)=>{const now=Math.round(lerp(0,v,ramp(p,.1+i*.1,.85)));tot+=now;const x=cx+R*.05+i*R*.24,base=cy+R*.12,h=R*.42;
      s+=`<rect x="${f1(x)}" y="${f1(base-h)}" width="${f1(R*.16)}" height="${f1(h)}" rx="3" style="fill:var(--panel);stroke:var(--line)"/>`;
      s+=`<rect x="${f1(x)}" y="${f1(base-h*now/3)}" width="${f1(R*.16)}" height="${f1(h*now/3)}" rx="3" style="fill:${now>=2?'var(--good)':'var(--warn)'}"/>`;
      s+=`<line x1="${f1(x-2)}" x2="${f1(x+R*.16+2)}" y1="${f1(base-h*2/3)}" y2="${f1(base-h*2/3)}" style="stroke:var(--ink);stroke-dasharray:2 2;opacity:.5"/>`;
      s+=`<text x="${f1(x+R*.08)}" y="${f1(base+12)}" class="t-xs t-mid">${nm[i]}</text><text x="${f1(x+R*.08)}" y="${f1(base-h*now/3-4)}" class="t-xs t-mid" style="fill:var(--ink)">${now}</text>`});
    const ok=sc.every(v=>v>=2)&&p>.85;
    s+=`<text x="${cx}" y="${f1(cy+R*.48)}" class="t-lbl t-mid">BBPS ${tot}/9</text><text x="${f1(cx+R*.33)}" y="${f1(cy+R*.31)}" class="t-xs t-mid">right · transverse · left</text>`;
    s+=`<text x="${cx}" y="${f1(cy+R*.64)}" class="t-xs t-mid" style="fill:${p>.85?(ok?'var(--good)':'var(--bad)'):'var(--muted)'}">${p>.85?(ok?'adequate: ≥2 in every segment':'inadequate: a segment below 2'):'dashed line = score 2'}</text>`;
    return s}
  function draw(t){
    const N=vb(svg,'720 380','400 680');
    const L=N?{mx:52,my:52,ms:1,cx:200,cy:458,R:112,sy:612}:{mx:36,my:56,ms:1,cx:548,cy:170,R:118,sy:336};
    const C=colon(L.mx,L.my,L.ms,{w:20});
    const pPrep=ramp(t,0,.15),pIn=ease(ramp(t,.16,.37)),pW=ramp(t,.4,.6),pF=ramp(t,.6,.68),pSn=ramp(t,.73,.81),pCut=ramp(t,.81,.86),pSu=ramp(t,.86,.9),pOut=ramp(t,.9,1);
    let u=1;if(t>=.16)u=1-pIn;if(t>=.4)u=lerp(0,UP,pW);if(t>=.6)u=UP;if(t>=.9)u=lerp(UP,1,pOut);
    const stool=poor?.85:1-pPrep;
    let s=C.svg;
    /* labels inside the frame */
    const lab=(uu,dx,dy,txt,anc)=>{const p=C.at(uu);return `<text x="${f1(p[0]+dx)}" y="${f1(p[1]+dy)}" class="t-xs ${anc||''}">${txt}</text>`};
    s+=lab(.15,16,0,'Ascending')+lab(.41,0,26,'Transverse','t-mid')+lab(.64,-16,0,'Descending','t-end')+lab(.82,8,-16,'Sigmoid','t-mid')+lab(.965,16,4,'Rectum')+lab(0,-2,34,'Caecum','t-mid');
    MAPST.forEach((m,i)=>{const p=C.at(m);if(stool>0)s+=`<circle cx="${f1(p[0]+(i%2?3:-3))}" cy="${f1(p[1]+(i%3-1)*3)}" r="4.2" style="fill:var(--stool);opacity:${f1(stool*.9)}"/>`});
    /* polyp on the map */
    const pp=C.at(UP),removed=!poor&&t>=.82;
    if(!removed){s+=`<circle cx="${f1(pp[0])}" cy="${f1(pp[1]+4)}" r="4.5" style="fill:var(--polyp);stroke:var(--polyp-line);opacity:${t>=.6||poor?1:.55}"/>`;
      if(poor&&t>=.86)s+=`<text x="${f1(pp[0])}" y="${f1(pp[1]+30)}" class="t-xs t-mid" style="fill:var(--bad);font-weight:700">missed</text>`}
    else s+=`<text x="${f1(pp[0])}" y="${f1(pp[1]+30)}" class="t-xs t-mid" style="fill:var(--good)">removed</text>`;
    /* inserted scope */
    if(t>=.16&&u<.999){let d='';for(let i=0;i<=60;i++){const q=C.at(lerp(1,u,i/60));d+=(i?'L':'M')+f1(q[0])+' '+f1(q[1])}
      const a0=C.at(1);s+=`<path d="M${f1(a0[0])} ${f1(a0[1]+(N?12:30))}L${f1(a0[0])} ${f1(a0[1])}${d.slice(d.indexOf('L'))}" style="fill:none;stroke:var(--scope);stroke-width:3.4;stroke-linejoin:round;stroke-linecap:round"/>`;
      const tp=C.at(u),tq=C.at(Math.max(0,u-.012)),an=u>.005?Math.atan2(tq[1]-tp[1],tq[0]-tp[0])*180/Math.PI:180;
      s+=scope(tp[0],tp[1],an,{light:true})}
    /* camera or prep */
    const cx=L.cx,cy=L.cy,R=L.R;
    if(t<.16)s+=prepPanel(cx,cy,R,pPrep);
    else{
      const z=t<.4?pIn*7:t<.6?-pW*4:t>=.9?-pOut*5:0;
      const P={k:pF,snare:poor?0:(t>=.73&&t<.86?pSn:0),cut:poor?0:pCut,lift:poor?0:pCut,suck:poor?0:pSu,gone:poor?false:t>=.9};
      s+=cam(cx,cy,R,{z,rot:t*9,stool:poor?.8:.0,polyp:t>=.6?P:null,cover:poor&&t>=.6&&t<.9,land:bump(t,.36,.43),flash:bump(t,.395,.415)});
      const segName=(()=>{for(const k in C.seg){const r=C.seg[k];if(u>=r[0]&&u<=r[1])return k}return 'rectum'})();
      s+=`<text x="${cx}" y="${cy-R-12}" class="t-sm t-mid">endoscope view · ${t>=.36&&t<.43?'caecum reached: photo':segName}</text>`;
      if(t>=.6&&t<.9){const msg=poor?(t<.73?'polyp hidden under stool':'nothing seen to remove'):(t<.73?'polyp, ~6 mm':t<.81?'cold snare closing':'cut: polyp detached');
        s+=`<text x="${cx}" y="${cy+R+20}" class="t-lbl t-mid" style="fill:${poor?'var(--bad)':'var(--ink)'}">${msg}</text>`}
      if(t>=.86&&!poor){const k=ramp(t,.88,.95);s+=`<g style="opacity:${f1(k)}"><rect x="${f1(cx+R*.7)}" y="${f1(cy+R*.62)}" width="52" height="30" rx="6" style="fill:var(--panel);stroke:var(--accent);stroke-width:1.4"/>${polyp(cx+R*.7+26,cy+R*.62+24,13,.12,{seed:4})}<text x="${f1(cx+R*.7+26)}" y="${f1(cy+R*.62+44)}" class="t-xs t-mid">to pathology</text></g>`}
    }
    /* status strip */
    const wd=t<.4?0:t<.6?4.5*pW:t<.86?4.5+2.5*ramp(t,.6,.86):7+2.5*ramp(t,.86,1);
    const bb=poor?4:Math.round(9*Math.min(1,pPrep/.85));
    const items=[[`BBPS ${t<.16?Math.round((poor?4:9)*ramp(pPrep,.1,.85)):(poor?4:9)}/9`,poor?(t>.13?'inadequate':'…'):(t>.13?'adequate':'…'),poor&&t>.13?'var(--bad)':'var(--good)'],
      [t>=.4?'Caecum ✓':'Caecum …',t>=.4?'reached, photo':'not yet',t>=.4?'var(--good)':'var(--muted)'],
      [`Polyps out: ${removed?1:0}`,poor&&t>=.86?'1 missed':'',poor&&t>=.86?'var(--bad)':'var(--ink)']];
    const sx=N?14:20,sw=N?372:300,sy=L.sy;
    items.forEach((it,i)=>{const x=N?sx+i*124:sx+i*104,y=N?sy:sy;
      s+=`<text x="${x}" y="${y}" class="t-sm" style="fill:${it[2]};font-weight:700">${it[0]}</text><text x="${x}" y="${y+13}" class="t-xs">${it[1]}</text>`});
    /* withdrawal clock */
    const wx=N?14:360,wy=N?sy+34:sy-4,ww=N?372:340,M=12;
    s+=`<text x="${wx}" y="${wy}" class="t-sm" style="fill:var(--ink);font-weight:700">Withdrawal ${Math.floor(wd)}:${String(Math.floor((wd%1)*60)).padStart(2,'0')} min</text>`;
    const bx=wx+(N?150:150),bw=ww-(N?150:150);
    s+=`<rect x="${bx}" y="${wy-9}" width="${bw}" height="10" rx="4" style="fill:var(--panel-2)"/><rect x="${bx}" y="${wy-9}" width="${f1(Math.min(wd,M)/M*bw)}" height="10" rx="4" style="fill:${wd>=8?'var(--good)':wd>=6?'var(--warn)':'var(--accent)'}"/>`;
    [[6,'6',' t-end',-2],[8,'8 min target','',2]].forEach(([m,l,an,dx])=>{const x=bx+m/M*bw;s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${wy-13}" y2="${wy+3}" style="stroke:var(--ink);stroke-width:1.4"/><text x="${f1(x+dx)}" y="${wy+14}" class="t-xs${an}">${l}</text>`});
    s+=`<text x="${N?14:20}" y="${N?24:26}" class="t-lbl">${poor?'Poor prep':'Good prep (split dose)'} · ${['prep','insertion','withdrawal','polyp','polypectomy','retrieval'][phaseOf(CO_STEPS,t)]}</text>`;
    svg.innerHTML=s;
    const ph=phaseOf(CO_STEPS,t),st=CO_STEPS[ph];
    note.innerHTML=noteHTML(poor&&st.poor?{...st,txt:st.txt+st.poor}:st);setSt(ph);
  }
  const stop=playWire(rg,$('#coPlay'),draw,26000,'Replay','colonoscopy');
  const setSt=stepWire($('#coSteps'),CO_STEPS,rg,draw,stop);
  $$('[data-coprep]').forEach(b=>b.addEventListener('click',()=>{poor=b.dataset.coprep==='poor';$$('[data-coprep]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---- quality gauge ---- */
  const qs=$('#coQual'),adr=$('#coAdr'),wdr=$('#coWd'),qn=$('#coQualNote');
  const TG=[[20,'<20%','var(--bad)'],[25,'25%','var(--warn)'],[30,'♀30','var(--good)'],[35,'35%','var(--good)'],[40,'♂40','var(--good)'],[50,'post-FIT 50','var(--accent)']];
  function drawQ(){
    const N=vb(qs,'720 320','400 640'),a=+adr.value,w=+wdr.value;
    $('#coAdrV').textContent=a+'%';$('#coWdV').textContent=w+' min';
    adr.setAttribute('aria-valuetext',a+' percent');wdr.setAttribute('aria-valuetext',w+' minutes');
    const gx=N?200:190,gy=N?190:200,gr=N?140:150,ang=v=>Math.PI*(1-clamp(v,0,60)/60);
    const P=(v,r)=>[gx+Math.cos(ang(v))*r,gy-Math.sin(ang(v))*r];
    let s='';
    const arc=(v0,v1,c)=>{const p0=P(v0,gr),p1=P(v1,gr);return `<path d="M${f1(p0[0])} ${f1(p0[1])}A${gr} ${gr} 0 0 1 ${f1(p1[0])} ${f1(p1[1])}" style="fill:none;stroke:${c};stroke-width:16;opacity:.35"/>`};
    s+=arc(0,20,'var(--bad)')+arc(20,35,'var(--warn)')+arc(35,60,'var(--good)');
    [0,10,20,30,40,50,60].forEach(v=>{const p=P(v,gr+18);s+=`<text x="${f1(p[0])}" y="${f1(p[1]+4)}" class="t-xs t-mid">${v}</text>`});
    TG.forEach(([v,l,c])=>{const p0=P(v,gr-10),p1=P(v,gr+10),pl=P(v,gr-26);s+=`<line x1="${f1(p0[0])}" y1="${f1(p0[1])}" x2="${f1(p1[0])}" y2="${f1(p1[1])}" style="stroke:${c};stroke-width:2.4"/><text x="${f1(pl[0])}" y="${f1(pl[1]+3)}" class="t-xs t-mid" style="fill:${c};font-weight:700">${l}</text>`});
    const np=P(a,gr-40);
    s+=`<line x1="${gx}" y1="${gy}" x2="${f1(np[0])}" y2="${f1(np[1])}" style="stroke:var(--ink);stroke-width:3.5;stroke-linecap:round"/><circle cx="${gx}" cy="${gy}" r="7" style="fill:var(--ink)"/>`;
    s+=`<text x="${gx}" y="${gy+34}" class="t-mid" style="font:800 30px var(--display);fill:var(--ink)">${a}%</text><text x="${gx}" y="${gy+52}" class="t-xs t-mid">adenoma detection rate</text>`;
    const met=[a>=35?'meets the 2024 overall target (≥35%)':'below the 2024 overall target (≥35%)',a>=25?'meets ESGE 2017 minimum (25%)':'below ESGE 2017 minimum (25%)'];
    s+=`<text x="${gx}" y="${gy+72}" class="t-xs t-mid" style="fill:${a>=35?'var(--good)':a>=25?'var(--warn)':'var(--bad)'}">${met[0]}</text>`;
    /* withdrawal */
    const wx=N?20:410,wy=N?330:44,ww=N?360:290,M=14;
    s+=`<text x="${wx}" y="${wy}" class="t-lbl">Withdrawal time: ${w} min</text>`;
    s+=`<rect x="${wx}" y="${wy+10}" width="${ww}" height="14" rx="5" style="fill:var(--panel-2)"/><rect x="${wx}" y="${wy+10}" width="${f1(w/M*ww)}" height="14" rx="5" style="fill:${w>=8?'var(--good)':w>=6?'var(--warn)':'var(--bad)'}"/>`;
    [[6,'6 min'],[8,'8 min']].forEach(([m,l])=>{const x=wx+m/M*ww;s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${wy+6}" y2="${wy+28}" style="stroke:var(--ink);stroke-width:1.4"/><text x="${f1(x)}" y="${wy+40}" class="t-xs t-mid">${l}</text>`});
    const wt=w<6?['Under 6 minutes: linked to 2.3 times the','interval-cancer rate (IRR 2.3).']:w<8?['≥6 minutes: neoplasia found in 28.3% vs 11.8%','for faster endoscopists; target average is ≥8.']:['Meets the ≥8-minute average target','for normal colonoscopies.'];
    s+=`<text x="${wx}" y="${wy+58}" class="t-xs" style="fill:var(--ink)">${wt[0]}</text><text x="${wx}" y="${wy+71}" class="t-xs" style="fill:var(--ink)">${wt[1]}</text>`;
    /* Corley quintiles */
    const qx=N?40:430,qy=N?600:290,qw=N?340:270,qh=N?160:130,Q=[9.8,8.6,8.0,7.0,4.8];
    s+=`<text x="${N?20:410}" y="${qy-qh-26}" class="t-lbl">Interval cancers per 10,000 person-years</text><text x="${N?20:410}" y="${qy-qh-12}" class="t-xs">by physician ADR quintile (Kaiser Permanente)</text>`;
    Q.forEach((v,i)=>{const bw=qw/5-14,x=qx+i*qw/5,h=v/10*qh;
      s+=`<rect x="${f1(x)}" y="${f1(qy-h)}" width="${f1(bw)}" height="${f1(h)}" rx="3" style="fill:var(--accent);opacity:${f1(.45+i*.12)}"/><text x="${f1(x+bw/2)}" y="${f1(qy-h-4)}" class="t-xs t-mid" style="fill:var(--ink)">${v.toFixed(1)}</text><text x="${f1(x+bw/2)}" y="${qy+12}" class="t-xs t-mid">Q${i+1}</text>`});
    s+=`<text x="${qx}" y="${qy+25}" class="t-xs">lowest ADR</text><text x="${qx+qw-14}" y="${qy+25}" class="t-xs t-end">highest ADR</text>`;
    qs.innerHTML=s;
    qn.innerHTML=noteHTML({k:'Quality check',t:a>=35&&w>=8?'Meets the 2024 targets shown':a<20?'An ADR below 20%':'Room to improve',
      txt:a<20?`In Poland's screening programme, endoscopists with an ADR below 20% had interval-cancer hazard ratios of 10.75–12.50. [[Kaminski2010]]`
        :`Each 1% rise in ADR was linked to a 3% lower interval-cancer risk (HR 0.97); the highest ADR quintile had a fatal interval-cancer HR of 0.38 compared with the lowest. Each extra minute of withdrawal raised ADR by 3.6%. [[Corley2014,Shaukat2015]]`,
      pt:'A careful colonoscopy finds more polyps, and patients of doctors who find more get fewer later cancers.',
      hook:'ADR ≥35% overall (♂40, ♀30), ≥50% after positive stool test; withdrawal ≥8 min average. [[Rex2024]]'});
  }
  adr.addEventListener('input',drawQ);wdr.addEventListener('input',drawQ);drawQ();

  /* ---- time to colonoscopy after positive FIT ---- */
  const fsv=$('#coFit'),fr=$('#coFitT'),fn=$('#coFitNote');
  function drawF(t){
    const N=vb(fsv,'720 320','400 520');let s='';const n=CO_FIT.length,mx=80;
    const g=i=>ease(ramp(t,i/n*.8,i/n*.8+.18));
    if(!N){const x0=70,base=262,H=200,gw=88;
      [0,20,40,60,80].forEach(v=>{const y=base-v/mx*H;s+=`<line x1="${x0-6}" x2="700" y1="${f1(y)}" y2="${f1(y)}" style="stroke:var(--line)"/><text x="${x0-10}" y="${f1(y+4)}" class="t-xs t-end">${v}</text>`});
      s+=`<text x="${x0-10}" y="24" class="t-xs">per 1,000 with a positive FIT</text>`;
      const bk=ramp(t,.75,.9);if(bk>0)s+=`<g style="opacity:${f1(bk)}"><path d="M${x0+4} 52V44H${x0+4*gw-8}V52" style="fill:none;stroke:var(--rx);stroke-width:1.6"/><text x="${x0+2*gw-2}" y="38" class="t-xs t-mid" style="fill:var(--rx);font-weight:700">ACS 2026: colonoscopy preferably within 6 months</text></g>`;
      CO_FIT.forEach(([lab,a,b],i)=>{const k=g(i),x=x0+i*gw+8,bw=32;
        s+=`<rect x="${x}" y="${f1(base-a/mx*H*k)}" width="${bw}" height="${f1(a/mx*H*k)}" rx="3" style="fill:var(--tumour);opacity:.85"/>`;
        s+=`<rect x="${x+bw+4}" y="${f1(base-b/mx*H*k)}" width="${bw}" height="${f1(b/mx*H*k)}" rx="3" style="fill:var(--lymph)"/>`;
        if(k>.95)s+=`<text x="${x+bw/2}" y="${f1(base-a/mx*H-5)}" class="t-xs t-mid" style="fill:var(--ink)">${a}</text><text x="${x+bw*1.5+4}" y="${f1(base-b/mx*H-5)}" class="t-xs t-mid" style="fill:var(--ink)">${b}</text>`;
        s+=`<text x="${x+bw+2}" y="${base+16}" class="t-xs t-mid" style="${i>=5?'fill:var(--bad);font-weight:700':''}">${lab}</text>`;
        if(i===5&&k>.95)s+=`<text x="${x+bw+2}" y="${base+30}" class="t-xs t-mid" style="fill:var(--bad)">OR 1.48 · 1.97</text>`;
        if(i===6&&k>.95)s+=`<text x="${x+bw+2}" y="${base+30}" class="t-xs t-mid" style="fill:var(--bad)">OR 2.25 · 3.22</text>`});
      s+=`<rect x="440" y="15" width="12" height="10" style="fill:var(--tumour)"/><text x="458" y="24" class="t-xs">any colorectal cancer</text><rect x="590" y="15" width="12" height="10" style="fill:var(--lymph)"/><text x="608" y="24" class="t-xs">stage III–IV</text>`;
    }else{const x0=86,x1=372,y0=74,rh=58;
      s+=`<text x="14" y="22" class="t-xs">per 1,000 with a positive FIT</text><rect x="14" y="34" width="12" height="10" style="fill:var(--tumour)"/><text x="30" y="43" class="t-xs">any CRC</text><rect x="110" y="34" width="12" height="10" style="fill:var(--lymph)"/><text x="126" y="43" class="t-xs">stage III–IV</text>`;
      CO_FIT.forEach(([lab,a,b],i)=>{const k=g(i),y=y0+i*rh,W=x1-x0;
        s+=`<text x="14" y="${y+12}" class="t-xs" style="${i>=5?'fill:var(--bad);font-weight:700':'fill:var(--ink)'}">${lab}</text>`;
        s+=`<rect x="${x0}" y="${y}" width="${f1(a/mx*W*k)}" height="14" rx="3" style="fill:var(--tumour);opacity:.85"/><rect x="${x0}" y="${y+18}" width="${f1(b/mx*W*k)}" height="12" rx="3" style="fill:var(--lymph)"/>`;
        if(k>.95)s+=`<text x="${f1(x0+a/mx*W+4)}" y="${y+11}" class="t-xs" style="fill:var(--ink)">${a}</text><text x="${f1(x0+b/mx*W+4)}" y="${y+28}" class="t-xs" style="fill:var(--ink)">${b}${i===5?' · OR 1.48 / 1.97':i===6?' · OR 2.25 / 3.22':''}</text>`});
      const bk=ramp(t,.75,.9);if(bk>0)s+=`<g style="opacity:${f1(bk)}"><path d="M8 ${y0-4}H4V${y0+4*rh-12}H8" style="fill:none;stroke:var(--rx);stroke-width:1.8"/><text x="14" y="${y0+7*rh+6}" class="t-xs" style="fill:var(--rx);font-weight:700">bracket: ACS 2026, preferably within 6 months</text></g>`;
    }
    fsv.innerHTML=s;
    const i=clamp(Math.floor(t/.8*n),0,n-1),c=CO_FIT[i];
    fn.innerHTML=noteHTML({k:'Time to colonoscopy',t:c[0]+': '+c[1]+' cancers per 1,000',
      txt:i<4?`Up to 6 months the rates stay flat: colonoscopy at 2–9 months carried no excess risk compared with 8–30 days. ACS 2026 says a positive non-colonoscopy test needs colonoscopy, preferably within 6 months. [[Corley2017,Wolf2026]]`
        :`At 10–12 months, CRC was more likely (OR 1.48; 49 vs 30 per 1,000) and so was stage III–IV disease (OR 1.97). After 12 months: OR 2.25 for CRC (76 per 1,000) and 3.22 for advanced stage (31 per 1,000). In Denmark, colonoscopy more than 90 days after the invitation was linked to more CRC (OR 3.49). [[Corley2017,Kaalby2019]]`,
      pt:'If a stool test is positive, the colonoscopy should happen within a few months, not put off for a year.',
      hook:'Waiting more than 10 months after a positive FIT raises the risk of cancer and of advanced stage. [[Corley2017]]'});
  }
  playWire(fr,$('#coFitPlay'),drawF,7000,'Replay','colonoscopy');
  drawF(+fr.value);
  const prevR=redraws.colonoscopy;redraws.colonoscopy=()=>{prevR&&prevR();drawQ();drawF(+fr.value)};
};
