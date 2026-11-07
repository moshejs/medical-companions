/* =============== 5.2 Living with COPD =============== */
/* Three widgets: (1) the main scrubber follows one written action plan through six steps beside a figure and
   three schematic symptom meters, with a panel of the key trial number for each step; (2) a pursed-lip
   breathing player that compares a chest-wall volume trace with ordinary breathing (Bianchi 2004 deltas);
   (3) a flying explainer that sorts entered readings through the Norwegian pre-flight algorithm (Edvardsen
   2012) and the BTS 2022 reading of a hypoxic challenge test. All clinical numbers live in the strings below,
   each with its citation in the HTML or the step text. */
const LV_STEPS=[
 {from:0,at:.06,k:'Know your baseline',t:'Your usual day',
  txt:'A written action plan starts from a person\'s stable, usual symptoms and is normally one part of a structured self-management programme. In a Cochrane review of 22 studies (3,854 people), self-management that included a written action plan for exacerbations improved quality of life over 12 months (SGRQ −2.69 points, 95% CI −4.49 to −0.90; high-quality evidence) [[Lenferink2017]].',
  pt:'A written plan describes what a normal day looks like for you, so that you and your team can tell when things change [[Lenferink2017]].',
  hook:'Self-management with a written action plan: SGRQ −2.69 at 12 months (Cochrane 2017) [[Lenferink2017]].'},
 {from:.17,at:.23,k:'Spot the change',t:'Symptoms worsen',
  txt:'The plan names the warning signs of an exacerbation, such as more breathlessness or more, or greener, sputum [[Lenferink2017]]. In 121 people seen in primary care with an exacerbation, purulent (green) sputum grew bacteria in 84% compared with 38% for mucoid (white) sputum, and green sputum was 94.4% sensitive and 77.0% specific for a high bacterial load [[Stockley2000]].',
  pt:'More breathlessness and more or greener phlegm than usual are the changes a plan asks you to watch for [[Stockley2000,Lenferink2017]].',
  hook:'Green sputum: 84% culture-positive vs 38% for mucoid sputum [[Stockley2000]].'},
 {from:.33,at:.4,k:'Act early',t:'Start the plan',
  txt:'Plans include what to do when symptoms change, agreed in advance with the care team. With self-management plus an action plan, the odds of at least one respiratory-related admission were lower (OR 0.69, 95% CI 0.51 to 0.94; 14 studies). Treating 12 people at high baseline risk for a year prevented one admission (17 at low risk). All-cause admissions were not significantly lower (OR 0.74, 95% CI 0.54 to 1.03) [[Lenferink2017]].',
  pt:'Acting early, as your plan says, kept some people out of hospital [[Lenferink2017]].',
  hook:'Action plans: respiratory admissions OR 0.69; NNT 12 at high risk, 17 at low risk [[Lenferink2017]].'},
 {from:.5,at:.56,k:'Breathe and pace',t:'Pursed lips, fan, rest',
  txt:'Pursed-lip breathing lengthens the breath out: in 22 people it lowered end-expiratory chest-wall volume by 0.33 ± 0.24 L and raised tidal volume by 0.65 ± 0.48 L, and Borg breathlessness fell [[Bianchi2004]]. In a crossover trial in 50 people with advanced disease, a handheld fan blown across the nose and mouth for 5 minutes reduced breathlessness compared with the fan aimed at the leg (P = 0.003) [[Galbraith2010]].',
  pt:'Breathing out slowly through pursed lips, as if blowing out a candle, and a small fan on the face can both ease breathlessness [[Bianchi2004,Galbraith2010]].',
  hook:'Pursed-lip breathing lengthens expiration and lowers end-expiratory volume (−0.33 L) [[Bianchi2004]].'},
 {from:.67,at:.73,k:'Call for help',t:'Contact the team',
  txt:'Self-management did not work for everyone. In the Glasgow supported self-management trial (464 people after an admission), COPD readmission or death did not differ (48% vs 47%; HR 1.05), and only 42% of the intervention group became "successful self managers"; they were younger and more often lived with others [[Bucknall2012]]. A US Veterans Affairs programme was stopped early for excess deaths (28 vs 10) [[Fan2012]], so support, follow-up and programme design matter [[Schrijver2022]].',
  pt:'A plan works best with a care team behind it. Not everyone can manage alone, and that is not a failure [[Bucknall2012]].',
  hook:'Glasgow trial: only 42% became successful self-managers; a VA programme was stopped for excess deaths (28 vs 10) [[Bucknall2012,Fan2012]].'},
 {from:.83,at:.9,k:'Plan ahead',t:'Future wishes',
  txt:'GOLD 2023 states that all patients with advanced COPD should be considered for end-of-life and palliative care support [[Agusti2023]]. In a cluster-randomised trial in 165 people with advanced COPD, one 1.5-hour, structured, nurse-led advance care planning session improved the quality of end-of-life communication with physicians (p &lt; 0.001) and made an advance care planning discussion within 6 months more likely (p = 0.003), without raising distress [[Houben2019]].',
  pt:'It is normal to talk with your team about the care you would want if you became very ill. One planned talk with a nurse helped people and their families [[Houben2019]].',
  hook:'One nurse-led advance care planning session improved end-of-life communication without raising distress [[Houben2019]].'}
];
const LV_TXT={
  plan:'My written action plan',
  zones:[['My usual day','usual breathing, cough and sputum'],['Worse than usual','more breathless, more or greener sputum: start the plan'],
    ['Get help','contact the care team as the plan says'],['Future wishes','what matters to me if I become very ill']],
  meters:['Breathlessness','Amount of sputum','Sputum colour'],
  white:'white (mucoid)',green:'green (purulent)',
  fan:'handheld fan',lips:'pursed lips',team:'care team',
  panels:[
    {h:'Self-management with a plan',big:'−2.69',l1:'SGRQ points at 12 months (lower is better)',l2:'22 studies, 3,854 people'},
    {h:'Sputum colour and bacteria',b1:'green sputum: bacteria grew',b2:'white sputum: bacteria grew',v1:84,v2:38},
    {h:'Respiratory admissions: OR 0.69',l1:'treat 12 people at high risk for a year',l2:'to prevent one admission (17 at low risk)'},
    {h:'Pursed lips and a fan',l1:'end-expiratory volume −0.33 L',l2:'tidal volume +0.65 L',l3:'fan to the face: less breathless'},
    {h:'Who managed alone?',b1:'became successful self-managers',v1:42,l1:'Glasgow trial, 464 people'},
    {h:'Advance care planning',l1:'one nurse-led session, 1.5 hours',l2:'better end-of-life communication',l3:'no rise in distress'}],
  pct:v=>v+'%',
  /* pursed-lip breathing widget */
  plbAxis:'chest-wall volume',plbTime:'time →',plbOrd:'ordinary breathing',plbPlb:'pursed lips',
  plbIn:'breathing in',plbOutO:'breathing out',plbOutP:'breathing out slowly through pursed lips',
  plbEEV:'end of breath out',plbEIV:'end of breath in',plbVt:'tidal volume',
  plbEEVv:'−0.33 L',plbEIVv:'+0.32 L',plbVtv:'+0.65 L',
  plbRowEEV:'End of breath out: −0.33 L',plbRowEIV:'End of breath in: +0.32 L',plbRowVt:'Tidal volume: +0.65 L',
  plbNote:[
    {k:'Reference',t:'Ordinary breathing',txt:'This is the comparison trace: ordinary breathing at rest. Switch to pursed lips to see the measured changes. Why air gets trapped in COPD is shown in <a href="#breathless" data-go="breathless">Air trapping &amp; breathlessness</a>.',
     pt:'Press "Pursed lips" to compare the two ways of breathing.'},
    {k:'Pursed lips',t:'A longer breath out',txt:'In 22 people with COPD, pursed-lip breathing lengthened expiratory time. Compared with spontaneous breathing, end-expiratory chest-wall volume fell by 0.33 ± 0.24 L, end-inspiratory volume rose by 0.32 L and tidal volume rose by 0.65 ± 0.48 L; Borg breathlessness scores fell. The fall in end-expiratory volume explained 27% of the variation in breathlessness [[Bianchi2004]]. Single trials of pursed-lip breathing also improved 6-minute walk distance (50 m) [[Holland2012]].',
     pt:'Breathing out slowly lets more air leave the lungs, so there is more room for the next breath in [[Bianchi2004]].',
     hook:'Pursed-lip breathing: end-expiratory volume −0.33 L, tidal volume +0.65 L [[Bianchi2004]].'}],
  /* flying widget */
  pctOut:v=>v+'%',
  altSea:'sea level',alt8:'2,438 m (8,000 ft): cabin limit',alt8b:'healthy SaO2 stays above 90%',
  alt10:'3,048 m (10,000 ft)',alt10b:'healthy SaO2 about 89%',
  hct1:'Hypoxic challenge test:',hct2:'breathing 15% oxygen',hct3:'≈ air at a 2,438 m cabin',
  flowA:'Sea-level SpO2 and lowest SpO2 on a 6-minute walk',flowAs:'Norwegian pre-flight algorithm',
  flowB:[['Fly without further testing','SpO2 above 95% and walk 84% or more'],['Hypoxic challenge test','all other readings'],['In-flight oxygen','SpO2 below 92%, or 92–95% with walk below 84%']],
  flowC:[['Oxygen not required','SpO2 ≥ 85% or PaO2 ≥ 6.6 kPa'],['Oxygen recommended','SpO2 below 85% or PaO2 below 6.6 kPa']],
  flowCs:'BTS 2022 reading of the test',
  out:{
    fly:'Norwegian algorithm: no further testing',
    hct:'Norwegian algorithm: hypoxic challenge test',
    o2:'Norwegian algorithm: in-flight oxygen',
    flyP:'In the study, people with sea-level SpO2 above 95% and walk SpO2 of 84% or more could fly without further testing [[Edvardsen2012]].',
    hctP:'Readings outside the two other branches pointed to a hypoxic challenge test [[Edvardsen2012]].',
    o2P:'SpO2 below 92%, or 92–95% with a walk SpO2 below 84%, pointed to in-flight oxygen [[Edvardsen2012]].',
    h0:'No hypoxic challenge result entered.',
    h1:'BTS 2022: in-flight oxygen not required',h1P:'The statement reads PaO2 ≥ 6.6 kPa (≥ 50 mm Hg) or SpO2 ≥ 85% on the test as not requiring in-flight oxygen [[Coker2022]].',
    h2:'BTS 2022: in-flight oxygen recommended',h2P:'The statement reads PaO2 below 6.6 kPa or SpO2 below 85% on the test as in-flight oxygen recommended [[Coker2022]].',
    crit:(s,w)=>`With resting SpO2 ${s}% and a walk SpO2 of ${w}%, ${s<=95||w<84?'at least one of the BTS reasons to consider testing applies (resting SpO2 ≤ 95% or walk desaturation below 84%)':'neither the resting SpO2 nor the walk-test reason the BTS statement lists for considering testing applies; it also lists MRC score 3 or more and concerns about hypercapnia'} [[Coker2022]].`}
};
function lvTx(x,y,s,cls='t-sm',st='',an){return `<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${an?` text-anchor="${an}"`:''}${st?` style="${st}"`:''}>${s}</text>`}
function lvKey(K,t){for(let i=1;i<K.length;i++){if(t<=K[i][0]){const a=K[i-1],b=K[i];return lerp(a[1],b[1],ease(ramp(t,a[0],b[0])))}}return K[K.length-1][1]}
function lvFan(x,y,s,ph){/* a handheld fan: handle, round guard, spinning blades and air lines to the left */
  let g=`<path d="M${f1(x)} ${f1(y+s*.5)}V${f1(y+s*1.2)}" style="stroke:var(--muted);stroke-width:${f1(s*.14)};stroke-linecap:round"/>`;
  g+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(s*.5)}" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.4"/>`;
  for(let i=0;i<3;i++){const a=ph*12+i*2.094;g+=`<ellipse cx="${f1(x+Math.cos(a)*s*.22)}" cy="${f1(y+Math.sin(a)*s*.22)}" rx="${f1(s*.2)}" ry="${f1(s*.09)}" transform="rotate(${f1(a*57.3)} ${f1(x+Math.cos(a)*s*.22)} ${f1(y+Math.sin(a)*s*.22)})" style="fill:var(--air-soft);stroke:var(--air)"/>`}
  for(let i=0;i<3;i++){const k=(ph*3+i/3)%1;g+=`<path d="M${f1(x-s*.6-k*s*.9)} ${f1(y-s*.25+i*s*.25)}h${f1(-s*.4)}" style="stroke:var(--air);stroke-width:1.6;stroke-linecap:round;opacity:${f1(1-k)}"/>`}
  return g}
function lvPhone(x,y,s,ph){let g=`<rect x="${f1(x-s*.28)}" y="${f1(y-s*.5)}" width="${f1(s*.56)}" height="${f1(s)}" rx="${f1(s*.1)}" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.4"/><rect x="${f1(x-s*.2)}" y="${f1(y-s*.38)}" width="${f1(s*.4)}" height="${f1(s*.62)}" rx="2" style="fill:var(--rec-soft)"/>`;
  for(let i=1;i<=3;i++){const op=(Math.sin(ph*10-i)+1)/2;g+=`<path d="M${f1(x+s*(.35+i*.14))} ${f1(y-s*(.2+i*.1))}a${f1(s*(.2+i*.14))} ${f1(s*(.2+i*.14))} 0 0 1 0 ${f1(s*(.4+i*.2))}" style="fill:none;stroke:var(--rec);stroke-width:1.6;opacity:${f1(.3+.7*op)}"/>`}
  return g}
function lvSheet(x,y,s){let g=`<path d="M${f1(x)} ${f1(y)}h${f1(s*.6)}l${f1(s*.2)} ${f1(s*.2)}v${f1(s*.8)}h${f1(-s*.8)}Z" style="fill:var(--panel);stroke:var(--rec);stroke-width:1.4"/>`;
  for(let i=0;i<4;i++)g+=`<line x1="${f1(x+s*.12)}" x2="${f1(x+s*.66)}" y1="${f1(y+s*(.32+i*.16))}" y2="${f1(y+s*(.32+i*.16))}" style="stroke:var(--line);stroke-width:1.4"/>`;return g}
inits.living=()=>{
  /* ---------- 1. the action plan scrubber ---------- */
  const svg=$('#lvSvg'),rg=$('#lvT'),note=$('#lvNote');
  const BR=[[0,.22],[.17,.25],[.3,.72],[.45,.76],[.56,.58],[.67,.46],[.83,.34],[1,.3]],
    SP=[[0,.22],[.17,.26],[.3,.66],[.5,.62],[.67,.45],[1,.3]],GR=[[0,0],[.17,0],[.29,1],[.6,1],[.76,.4],[1,.1]];
  const ZC=[['var(--good)','var(--good-soft)'],['var(--warn)','var(--warn-soft)'],['var(--bad)','var(--bad-soft)'],['var(--rec)','var(--rec-soft)']];
  function panel(p,x,y,w,u){const P=LV_TXT.panels[p];let s=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="118" rx="10" style="fill:var(--panel-2)"/>`+lvTx(x+12,y+22,P.h,'t-lbl');
    const a=ease(ramp(u,.05,.5));
    const bar=(by,v,lab,col)=>{const bw=w-24;return lvTx(x+12,by,lab,'t-xs','fill:var(--ink)')+`<rect x="${f1(x+12)}" y="${f1(by+5)}" width="${f1(bw)}" height="12" rx="6" style="fill:var(--panel)"/><rect x="${f1(x+12)}" y="${f1(by+5)}" width="${f1(bw*v/100*a)}" height="12" rx="6" style="fill:${col}"/>`+lvTx(x+w-14,by,LV_TXT.pct(v),'t-sm','fill:var(--ink);font-weight:700','end')};
    if(p===0)s+=lvTx(x+12,y+62,P.big,'t-big','font-size:30px;fill:var(--rec)')+lvTx(x+12,y+84,P.l1,'t-xs','fill:var(--ink)')+lvTx(x+12,y+102,P.l2,'t-xs');
    if(p===1)s+=bar(y+46,P.v1,P.b1,'var(--bact)')+bar(y+84,P.v2,P.b2,'var(--smoke)');
    if(p===2){const n=12,sp=Math.min(20,(w-24)/n);for(let i=0;i<n;i++){const on=i===n-1&&u>.3;s+=`<circle cx="${f1(x+20+i*sp)}" cy="${f1(y+50)}" r="7" style="fill:${on?'var(--rec)':'var(--panel)'};stroke:${on?'var(--rec)':'var(--muted)'};stroke-width:1.2"/>`}
      s+=lvTx(x+12,y+82,P.l1,'t-xs','fill:var(--ink)')+lvTx(x+12,y+98,P.l2,'t-xs','fill:var(--ink)')}
    if(p===3||p===5)s+=[P.l1,P.l2,P.l3].map((l,i)=>`<g style="opacity:${f1(ramp(u,.05+i*.15,.2+i*.15))}">`+`<circle cx="${f1(x+17)}" cy="${f1(y+46+i*24)}" r="4" style="fill:var(--rec)"/>`+lvTx(x+28,y+50+i*24,l,'t-sm','fill:var(--ink)')+'</g>').join('');
    if(p===4)s+=bar(y+48,P.v1,P.b1,'var(--rec)')+lvTx(x+12,y+96,P.l1,'t-xs');
    return s}
  function draw(t){
    const N=vb(svg,'720 400','400 720'),p=phaseOf(LV_STEPS,t),S=LV_STEPS[p],nx=LV_STEPS[p+1]?LV_STEPS[p+1].from:1.0001,u=clamp((t-S.from)/(nx-S.from));
    const L=N?{tx:16,cx:16,cy:58,cw:368,wrap:52,px:96,py:560,ps:140,mx:186,my:356,mw:198,ex:16,ey:584,ew:368,sx:16,sw:368,sy:708}
             :{tx:20,cx:20,cy:62,cw:250,wrap:36,px:340,py:318,ps:150,mx:440,my:76,mw:260,ex:440,ey:208,ew:260,sx:20,sw:680,sy:372};
    const br=lvKey(BR,t),sp=lvKey(SP,t),gr=lvKey(GR,t);
    let s=lvTx(L.tx,26,S.t,'t-big','fill:var(--rec)')+lvTx(L.tx,42,S.k,'t-sm');
    /* the plan card */
    const zi=p===0?0:p<4?1:p===4?2:3;
    s+=`<rect x="${L.cx}" y="${L.cy}" width="${L.cw}" height="270" rx="12" style="fill:var(--field);stroke:var(--line)"/>`+lvTx(L.cx+14,L.cy+21,LV_TXT.plan,'t-lbl');
    LV_TXT.zones.forEach((z,i)=>{const ry=L.cy+32+i*60,rh=i===3?52:54,on=i===zi,op=i===3&&p<5?.25:on?1:.5;
      s+=`<g style="opacity:${op}"><rect x="${L.cx+10}" y="${ry}" width="${L.cw-20}" height="${rh}" rx="8" style="fill:${ZC[i][1]};stroke:${on?ZC[i][0]:'var(--line)'};stroke-width:${on?2.4:1}"/><rect x="${L.cx+10}" y="${ry}" width="7" height="${rh}" rx="3" style="fill:${ZC[i][0]}"/>`;
      s+=lvTx(L.cx+26,ry+19,z[0],'t-lbl')+wrapT(L.cx+26,ry+35,z[1],L.wrap,{cls:'t-xs',lh:12,style:'fill:var(--ink)'}).svg;
      if(i===3&&p===5)s+=lvSheet(L.cx+L.cw-50,ry+8,36*ease(ramp(u,0,.4))+.01);
      s+='</g>'});
    /* the person, with props by step */
    const lean=clamp((br-.3)*1.5),ph=t*8;
    s+=`<line x1="${f1(L.px-L.ps*.4)}" x2="${f1(L.px+L.ps*.45)}" y1="${L.py}" y2="${L.py}" style="stroke:var(--line);stroke-width:2"/>`;
    s+=person(L.px,L.py,L.ps,{col:'var(--brand)',lean,breath:p===3?(Math.sin(t*90)+1)/2:0});
    const hx=L.px+lean*L.ps*.18,hy=L.py-L.ps*(.9-.08*lean);
    if(p===3){s+=lvFan(hx+L.ps*.42,hy+L.ps*.06,L.ps*.13,ph)+lvTx(hx+L.ps*.42,hy+L.ps*.36,LV_TXT.fan,'t-xs','fill:var(--air-ink)','middle')+lvTx(hx,hy-L.ps*.14,LV_TXT.lips,'t-xs','fill:var(--air-ink)','middle')}
    if(p===4){s+=lvPhone(hx-L.ps*.36,hy+L.ps*.12,L.ps*.16,ph)+lvTx(hx-L.ps*.36,hy-L.ps*.1,LV_TXT.team,'t-xs','fill:var(--rec)','middle')}
    /* symptom meters */
    [br,sp].forEach((v,i)=>{const y=L.my+i*44;s+=lvTx(L.mx,y,LV_TXT.meters[i],'t-sm','fill:var(--ink)')+`<rect x="${L.mx}" y="${y+7}" width="${L.mw}" height="12" rx="6" style="fill:var(--panel-2)"/><rect x="${L.mx}" y="${y+7}" width="${f1(L.mw*v)}" height="12" rx="6" style="fill:${v>.55?'var(--warn)':'var(--rec)'}"/>`});
    {const y=L.my+88;s+=lvTx(L.mx,y,LV_TXT.meters[2],'t-sm','fill:var(--ink)')+`<circle cx="${L.mx+12}" cy="${y+16}" r="10" style="fill:var(--cell);stroke:var(--line)"/><circle cx="${L.mx+12}" cy="${y+16}" r="10" style="fill:var(--bact);opacity:${f1(gr)}"/>`+lvTx(L.mx+30,y+20,gr>.5?LV_TXT.green:LV_TXT.white,'t-xs','fill:var(--ink)')}
    /* evidence panel */
    s+=panel(p,L.ex,L.ey,L.ew,u);
    /* the step strip */
    const sw=L.sw/6;LV_STEPS.forEach((q,j)=>{s+=`<rect x="${f1(L.sx+j*sw+1)}" y="${L.sy}" width="${f1(sw-2)}" height="5" rx="2.5" style="fill:${j===p?'var(--rec)':'var(--panel-2)'}"/>`});
    s+=`<circle cx="${f1(L.sx+L.sw*t)}" cy="${L.sy+2.5}" r="5" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;
    svg.innerHTML=s;setSt(p);note.innerHTML=noteHTML(S);
  }
  let setSt=()=>{};
  const stop=playWire(rg,$('#lvPlay'),draw,30000,'%t:player.replay%','living');
  setSt=stepWire($('#lvSteps'),LV_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- 2. pursed-lip breathing ---------- */
  const psvg=$('#lvPlbSvg'),prg=$('#lvPlbT'),pnote=$('#lvPlbNote'),tog=$('#lvPlbTog');let mode=0;
  /* schematic volumes in litres relative to the ordinary end-expiratory level: the ordinary breath size (0.6)
     is drawn for illustration; the pursed-lip levels add Bianchi's measured deltas (−0.33 and +0.32) */
  const PB=[{ee:0,ei:.6,ti:1,te:2},{ee:-.33,ei:.92,ti:1.2,te:3.4}],TT=12;
  const dec=u=>(Math.exp(-3.2*u)-Math.exp(-3.2))/(1-Math.exp(-3.2));
  const vol=(m,tau)=>{const B=PB[m],b=B.ti+B.te,q=tau%b;return q<B.ti?{v:B.ee+(B.ei-B.ee)*ease(q/B.ti),inn:true}:{v:B.ee+(B.ei-B.ee)*dec((q-B.ti)/B.te),inn:false}};
  function pdraw(t){
    const N=vb(psvg,'720 300','400 520');
    const L=N?{lx:200,ly:22,ls:150,st:212,gx:46,gy:244,gw:338,gh:170,ax:0}:{lx:118,ly:34,ls:180,st:262,gx:262,gy:30,gw:300,gh:210,ax:574};
    const Y=v=>L.gy+L.gh-(v+.5)/1.55*L.gh,X=tau=>L.gx+tau/TT*L.gw,tau=t*TT,cur=vol(mode,tau),B=PB[mode];
    let s=`<defs>${marker('lvPa','var(--air)',6)}</defs>`;
    /* lungs swell with the trace */
    const fill=clamp((cur.v-B.ee)/(B.ei-B.ee));
    s+=lungs(L.lx,L.ly,L.ls,{breathe:fill,hyper:mode?.3-.2*fill:.45,tree:true});
    const ay=L.ly-4,dir=cur.inn?1:-1;
    for(let i=0;i<3;i++){const k=(tau*.9+i/3)%1,yy=cur.inn?ay-24+k*20:ay-4-k*(mode?30:20);s+=`<path d="M${f1(L.lx-8+i*8)} ${f1(yy)}v${f1(dir*8)}" style="stroke:var(--air);stroke-width:${mode&&!cur.inn?1.4:2.4};opacity:${f1(1-k)}" marker-end="url(#lvPa)"/>`}
    s+=lvTx(L.lx,L.st,cur.inn?LV_TXT.plbIn:mode?LV_TXT.plbOutP:LV_TXT.plbOutO,'t-sm','fill:var(--air-ink)','middle');
    /* the trace */
    s+=axes(L.gx,L.gy,L.gw,L.gh,{xt:[],yt:[],grid:false})+lvTx(L.gx,L.gy-8,LV_TXT.plbAxis,'t-xs')+lvTx(L.gx+L.gw,L.gy+L.gh+15,LV_TXT.plbTime,'t-xs','','end');
    [[PB[0].ee,'var(--muted)'],[PB[0].ei,'var(--muted)']].forEach(q=>s+=`<line x1="${L.gx}" x2="${L.gx+L.gw}" y1="${f1(Y(q[0]))}" y2="${f1(Y(q[0]))}" class="grid"/>`);
    const tr=(m,upto)=>{let d='';const n=240;for(let i=0;i<=n;i++){const tt=upto*i/n;d+=(i?'L':'M')+f1(X(tt))+' '+f1(Y(vol(m,tt).v))}return d};
    if(mode)s+=`<path d="${tr(0,TT)}" style="fill:none;stroke:var(--muted);stroke-width:1.4;stroke-dasharray:4 4"/>`;
    s+=`<path d="${tr(mode,Math.max(tau,.01))}" style="fill:none;stroke:${mode?'var(--air)':'var(--brand)'};stroke-width:2.6"/><circle cx="${f1(X(tau))}" cy="${f1(Y(cur.v))}" r="5" style="fill:${mode?'var(--air)':'var(--brand)'};stroke:var(--panel);stroke-width:2"/>`;
    /* legend */
    s+=`<line x1="${L.gx+L.gw-150}" x2="${L.gx+L.gw-132}" y1="${L.gy-12}" y2="${L.gy-12}" style="stroke:var(--brand);stroke-width:2.6"/>`+lvTx(L.gx+L.gw-128,L.gy-8,LV_TXT.plbOrd,'t-xs');
    if(mode)s+=`<line x1="${L.gx+L.gw-150}" x2="${L.gx+L.gw-132}" y1="${L.gy+4}" y2="${L.gy+4}" style="stroke:var(--air);stroke-width:2.6"/>`+lvTx(L.gx+L.gw-128,L.gy+8,LV_TXT.plbPlb,'t-xs');
    if(mode){const ee=Y(PB[1].ee),ei=Y(PB[1].ei);
      s+=`<line x1="${L.gx}" x2="${L.gx+L.gw}" y1="${f1(ee)}" y2="${f1(ee)}" style="stroke:var(--air);stroke-dasharray:2 3"/><line x1="${L.gx}" x2="${L.gx+L.gw}" y1="${f1(ei)}" y2="${f1(ei)}" style="stroke:var(--air);stroke-dasharray:2 3"/>`;
      if(N){s+=lvTx(L.gx,L.gy+L.gh+40,LV_TXT.plbRowEEV,'t-sm','fill:var(--ink)')+lvTx(L.gx,L.gy+L.gh+60,LV_TXT.plbRowEIV,'t-sm','fill:var(--ink)')+lvTx(L.gx,L.gy+L.gh+80,LV_TXT.plbRowVt,'t-sm','fill:var(--ink)')}
      else{s+=lvTx(L.ax,ee+4,LV_TXT.plbEEVv,'t-lbl','fill:var(--air-ink)')+lvTx(L.ax,ee+18,LV_TXT.plbEEV,'t-xs')+lvTx(L.ax,ei+4,LV_TXT.plbEIVv,'t-lbl','fill:var(--air-ink)')+lvTx(L.ax,ei+18,LV_TXT.plbEIV,'t-xs')+
        lvTx(L.ax,L.gy+L.gh+2,LV_TXT.plbVt+' '+LV_TXT.plbVtv,'t-xs','fill:var(--ink)')}}
    psvg.innerHTML=s;
  }
  function setMode(m){mode=m;$$('[data-lvplb]',tog).forEach(b=>b.setAttribute('aria-pressed',+b.dataset.lvplb===m?'true':'false'));pnote.innerHTML=noteHTML(LV_TXT.plbNote[m]);pdraw(+prg.value)}
  tog.addEventListener('click',e=>{const b=e.target.closest('[data-lvplb]');if(b)setMode(+b.dataset.lvplb)});
  playWire(prg,$('#lvPlbPlay'),pdraw,12000,'%t:player.replay%','living');
  setMode(0);

  /* ---------- 3. flying ---------- */
  const fs=$('#lvFlyS'),fw=$('#lvFlyW'),fh=$('#lvFlyH'),fsvg=$('#lvFlySvg'),fout=$('#lvFlyOut');
  const branch=(S,W)=>S>95&&W>=84?0:(S<92||(S<=95&&W<84))?2:1;
  function box(x,y,w,h,ti,sub,on,col,mx){const op=on?1:.5;
    return `<g style="opacity:${op}"><rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="9" style="fill:${on?col[1]:'var(--panel)'};stroke:${on?col[0]:'var(--line)'};stroke-width:${on?2.2:1}"/>`+
      wrapT(x+10,y+18,ti,mx,{cls:'t-lbl',lh:15}).svg+wrapT(x+10,y+18+15*Math.ceil(ti.length/mx)+2,sub,Math.round(mx*1.3),{cls:'t-xs',lh:12,style:'fill:var(--ink)'}).svg+'</g>'}
  function fdraw(){
    const N=vb(fsvg,'720 340','400 650'),S=+fs.value,W=+fw.value,H=+fh.value,b=branch(S,W);
    const G=['var(--rec)','var(--rec-soft)'],A=['var(--warn)','var(--warn-soft)'];
    let s=`<defs>${marker('lvFa','var(--muted)',6)}${marker('lvFb','var(--rec)',6)}</defs>`;
    /* altitude column */
    const C=N?{x:24,top:40,sea:232,lx:52}:{x:30,top:46,sea:300,lx:58},Ya=m=>C.sea-m/3300*(C.sea-C.top);
    s+=`<line x1="${C.x}" x2="${C.x}" y1="${C.top-10}" y2="${C.sea}" style="stroke:var(--muted);stroke-width:1.6" marker-start="url(#lvFa)"/>`;
    s+=`<line x1="${C.x-6}" x2="${C.x+6}" y1="${C.sea}" y2="${C.sea}" style="stroke:var(--muted);stroke-width:1.6"/>`+lvTx(C.lx,C.sea+4,LV_TXT.altSea,'t-sm');
    const y8=Ya(2438),y10=Ya(3048);
    s+=`<line x1="${C.x-6}" x2="${C.x+(N?340:190)}" y1="${f1(y8)}" y2="${f1(y8)}" style="stroke:var(--warn);stroke-width:1.6;stroke-dasharray:5 3"/>`+lvTx(C.lx,y8-6,LV_TXT.alt8,'t-xs','fill:var(--ink);font-weight:600')+lvTx(C.lx,y8+12,LV_TXT.alt8b,'t-xs');
    s+=`<line x1="${C.x-6}" x2="${C.x+6}" y1="${f1(y10)}" y2="${f1(y10)}" style="stroke:var(--muted);stroke-width:1.6"/>`+lvTx(C.lx,y10-6,LV_TXT.alt10,'t-xs','fill:var(--ink);font-weight:600')+lvTx(C.lx,y10+8,LV_TXT.alt10b,'t-xs');
    /* aircraft on the cabin line */
    const px=N?C.x+300:C.x+170;s+=`<path d="M${px-22} ${f1(y8-4)}h36l8 -4h4l-4 6h-44z M${px-6} ${f1(y8-4)}l-8 -10h6l12 10z" style="fill:var(--brand)"/>`;
    const hy=N?y8+44:y8+62;s+=`<rect x="${C.lx-6}" y="${f1(hy-14)}" width="${N?250:176}" height="50" rx="8" style="fill:var(--dx-soft)"/>`+lvTx(C.lx+2,hy+1,LV_TXT.hct1,'t-xs','fill:var(--dx);font-weight:700')+lvTx(C.lx+2,hy+15,LV_TXT.hct2,'t-xs','fill:var(--ink)')+lvTx(C.lx+2,hy+29,LV_TXT.hct3,'t-xs','fill:var(--ink)');
    /* the flow chart */
    if(!N){const ax=250,aw=460;
      s+=`<rect x="${ax}" y="28" width="${aw}" height="46" rx="9" style="fill:var(--panel-2)"/>`+lvTx(ax+12,47,LV_TXT.flowA,'t-lbl')+lvTx(ax+12,64,LV_TXT.flowAs,'t-xs');
      const bx=[250,407,564],bw=146;
      bx.forEach((x,i)=>{const on=b===i;s+=`<path d="M${ax+aw/2} 74V92H${x+bw/2}V112" style="fill:none;stroke:${on?'var(--rec)':'var(--line)'};stroke-width:${on?2.4:1.2}" marker-end="url(#${on?'lvFb':'lvFa'})"/>`;
        s+=box(x,114,bw,84,LV_TXT.flowB[i][0],LV_TXT.flowB[i][1],on,i===1?A:G,18)});
      const cx=[300,492],cw=172;
      cx.forEach((x,i)=>{const on=H===i+1;s+=`<path d="M480 198V222H${x+cw/2}V240" style="fill:none;stroke:${on?'var(--rec)':'var(--line)'};stroke-width:${on?2.4:1.2}" marker-end="url(#${on?'lvFb':'lvFa'})"/>`;
        s+=box(x,242,cw,64,LV_TXT.flowC[i][0],LV_TXT.flowC[i][1],on,G,22)});
      s+=lvTx(300,326,LV_TXT.flowCs,'t-xs')}
    else{const ax=16,aw=368,ay=290;
      s+=`<rect x="${ax}" y="${ay}" width="${aw}" height="50" rx="9" style="fill:var(--panel-2)"/>`+wrapT(ax+12,ay+19,LV_TXT.flowA,44,{cls:'t-sm',lh:13,style:'fill:var(--ink);font-weight:600'}).svg+lvTx(ax+12,ay+44,LV_TXT.flowAs,'t-xs');
      const order=[0,2,1],by=[358,426,494];
      s+=`<line x1="26" x2="26" y1="${ay+50}" y2="${by[2]+30}" style="stroke:var(--line);stroke-width:1.2"/>`;
      order.forEach((i,k)=>{const on=b===i,y=by[k];s+=`<path d="M26 ${y+30}H36" style="stroke:${on?'var(--rec)':'var(--line)'};stroke-width:${on?2.4:1.2}" marker-end="url(#${on?'lvFb':'lvFa'})"/>`;
        s+=box(38,y,346,58,LV_TXT.flowB[i][0],LV_TXT.flowB[i][1],on,i===1?A:G,44)});
      [16,206].forEach((x,i)=>{const on=H===i+1;s+=`<path d="M211 552V562H${x+89}V570" style="fill:none;stroke:${on?'var(--rec)':'var(--line)'};stroke-width:${on?2.4:1.2}" marker-end="url(#${on?'lvFb':'lvFa'})"/>`;
        s+=box(x,572,178,62,LV_TXT.flowC[i][0],LV_TXT.flowC[i][1],on,G,22)});
      s+=lvTx(16,646,LV_TXT.flowCs,'t-xs')}
    fsvg.innerHTML=s;
    $('#lvFlySO').textContent=LV_TXT.pctOut(S);$('#lvFlyWO').textContent=LV_TXT.pctOut(W);
    const O=LV_TXT.out,k=['fly','hct','o2'][b];
    let h=`<div class="verdict ${b===0?'yes':'maybe'}">${O[k]}</div><p>${O[k+'P']}</p><p>${O.crit(S,W)}</p>`;
    h+=H?`<div class="verdict ${H===1?'yes':'maybe'}">${O['h'+H]}</div><p>${O['h'+H+'P']}</p>`:`<p>${O.h0}</p>`;
    fout.innerHTML=h;
  }
  [fs,fw].forEach(el=>el.addEventListener('input',fdraw));fh.addEventListener('change',fdraw);
  fdraw();
  const prevR=redraws.living;redraws.living=()=>{prevR&&prevR();fdraw()};
};
