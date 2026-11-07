/* =============== 5.1 Lung volume reduction, transplant & palliative care =============== */
/* Three widgets: (1) the main scrubber: hyperinflated lungs (kit lungs()) with a swollen target lobe that is cut
   out (surgery), then collapsed by one-way valves (air leaves on breathing out, cannot return) while the diaphragm
   rises; a collateral-ventilation toggle keeps the lobe inflated; then donor lungs, alpha-1 augmentation and a
   person with a handheld fan, beside a step panel; (2) a NETT subgroup explorer; (3) pneumothorax bars for the
   valve trials. Numbers from research pass F, cited in steps, captions and HTML. */
const AV_STEPS=[
 {from:0,at:.08,k:'Hyperinflation',t:'The over-full lung',
  txt:'GOLD 2023 states that in selected patients with heterogeneous or homogeneous emphysema and significant hyperinflation refractory to optimised care, surgical or bronchoscopic lung volume reduction "may be considered". Homogeneous emphysema means a < 10% difference in destruction between the target lobe and the neighbouring lobe on quantitative CT; more than 10% is heterogeneous [[Agusti2023]].',
  pt:'In severe emphysema, damaged parts of the lung hold on to air and the lungs become over-full, which pushes the breathing muscle flat [[Agusti2023]].',
  hook:'Lung volume reduction is for significant hyperinflation refractory to optimised care (GOLD 2023) [[Agusti2023]].'},
 {from:.17,at:.27,k:'Surgery',t:'Remove the worst tissue',
  txt:'NETT randomised 1218 people with severe emphysema to lung volume reduction surgery or medical treatment. Overall mortality was the same (0.11 deaths per person-year; risk ratio 1.01). Surgery lowered mortality in upper-lobe-predominant emphysema with low exercise capacity (risk ratio 0.47, P = 0.005) and raised it in non-upper-lobe emphysema with high exercise capacity (risk ratio 2.06) [[Fishman2003]].',
  pt:'Surgery to remove the most damaged part helped some people live longer, but only a well-defined group [[Fishman2003]].',
  hook:'NETT: LVRS survival benefit only in upper-lobe emphysema with low exercise capacity (RR 0.47) [[Fishman2003]].'},
 {from:.34,at:.47,k:'Valves',t:'Collapse a lobe from inside',
  txt:'One-way valves let air out of a hyperinflated lobe but not back in, so the lobe collapses; collateral ventilation from neighbouring lobes "prevents lobar atelectasis" [[Davey2015]]. STELVIO excluded 13 of 84 people for collateral ventilation; at 6 months valves improved FEV1 by 140 mL, FVC by 347 mL and 6MWD by 74 m more than control, and pneumothorax occurred in 18% [[Klooster2015]].',
  pt:'Tiny one-way valves placed through a camera tube let air out of the worst part of the lung so it shrinks, giving the rest more room [[Klooster2015]].',
  hook:'Valves need absent collateral ventilation (intact fissures); pneumothorax is the main early risk (about 18–30%) [[Klooster2015,Kemp2017,Criner2018]].'},
 {from:.51,at:.59,k:'Transplant',t:'New lungs',
  txt:'ISHLT 2021 calls BODE 7–10 "the best guideline for listing patients", with FEV1 < 20% predicted as an additional consideration, and suggests referral at BODE 5–6 with FEV1 20–25% predicted [[Leard2021]]. In 9883 people with COPD in the ISHLT registry (1987–2006), median survival after transplant was 5.0 years: 6.41 years after bilateral and 4.59 after single transplant [[Thabut2008]].',
  pt:'A lung transplant replaces the damaged lungs with donor lungs. It is an option for a small group, chosen with scores like BODE [[Leard2021]].',
  hook:'ISHLT 2021 listing: BODE 7–10 or FEV1 < 20%; median post-transplant survival for COPD 5.0 years [[Leard2021,Thabut2008]].'},
 {from:.67,at:.75,k:'Alpha-1',t:'Replace the missing protein',
  txt:'RAPID randomised 180 non-smokers with severe alpha-1 antitrypsin deficiency to intravenous A1PI 60 mg/kg weekly or placebo for 24 months. CT lung-density loss at TLC was slower with A1PI: −1.45 versus −2.19 g/L per year (P = 0.03); the combined TLC+FRC endpoint missed significance (P = 0.06) [[Chapman2015]]. In the extension, "Lost lung density was never recovered" [[McElvaney2017]].',
  pt:'For people with alpha-1 deficiency, weekly infusions of the missing protein slowed the loss of lung tissue on scans, but did not bring lost tissue back [[Chapman2015,McElvaney2017]].',
  hook:'RAPID: A1PI slowed CT density loss at TLC (−1.45 vs −2.19 g/L/yr) [[Chapman2015]].'},
 {from:.84,at:.92,k:'Comfort',t:'Palliative care alongside',
  txt:'GOLD 2023 states that all patients with advanced COPD should be considered for end-of-life and palliative care support [[Agusti2023]]. A breathlessness support service combining palliative care, respiratory medicine, physiotherapy and occupational therapy improved breathlessness mastery (MD 0.58) [[Higginson2014]], and a handheld fan directed at the face reduced breathlessness compared with the legs (P = 0.003) [[Galbraith2010]].',
  pt:'A small fan blowing on the face can ease breathlessness, and palliative care teams help with symptoms and with planning ahead [[Galbraith2010,Higginson2014]].',
  hook:'Handheld fan to the face reduced breathlessness (P = 0.003); palliative oxygen was no better than air [[Galbraith2010,Abernethy2010]].'}
];
const AV_TXT={
  lobe:'target lobe',fiss:'fissure',valve:'one-way valve',scope:'bronchoscope',donor:'donor lungs',drip:'A1PI infusion',lowZ:'lower-zone emphysema',
  stat:['flat diaphragm, over-full lungs','damaged lobe removed: diaphragm rises','valves: lobe collapses, diaphragm rises','collateral air keeps the lobe full','donor lungs','weekly infusion, lower-zone emphysema','a fan directed at the face'],
  p0:{h:'The over-full lung',l:'GOLD 2023: volume reduction "may be considered" with hyperinflation refractory to optimised care',ct:'destruction, target vs neighbouring lobe (quantitative CT)',
    het:'heterogeneous: more than 10% difference',hom:'homogeneous: less than 10% difference'},
  p1:{h:'NETT: risk ratio for death',n:'1218 people, surgery vs medical',rows:[['overall',1.01],['upper-lobe, low exercise',.47],['non-upper, high exercise',2.06]],f0:'favours surgery',f1:'favours medical'},
  p2:{h:'STELVIO, 6 months',s:[['FEV1','+140 mL'],['FVC','+347 mL'],['6MWD','+74 m'],['pneumothorax','18%']],sub:'valves minus control',
    cvH:'Collateral ventilation',cv:'Air from the neighbouring lobe leaks across an incomplete fissure, so the lobe refills and does not collapse. STELVIO excluded 13 of 84 people for this reason.'},
  p3:{h:'Transplant',l1:'listing: BODE 7–10 or FEV1 below 20%',l2:'referral: BODE 5–6, FEV1 20–25%',r1:'median survival: bilateral',r2:'median survival: single',yr:v=>v+' y'},
  p4:{h:'RAPID: density loss',r1:'A1PI, at TLC',r2:'placebo, at TLC',u:'CT lung-density loss, g/L a year',ole:'extension: placebo switchers slowed from −2.26 to −1.26 g/L a year'},
  p5:{h:'Care for breathlessness',f:'fan to the face vs legs: P = 0.003',m:'breathlessness service: mastery +0.58',sv:'6-month survival 94% vs 75%',ev:'early evidence'},
  /* NETT explorer */
  nett:[['all','Overall, whole trial','RR 1.01',1.01],['all','Overall, 5 years','RR 0.86',.86],['upper-low','Upper-lobe, low exercise','RR 0.47',.47],['upper-low','Upper-lobe, low exercise, 5 years','RR 0.67',.67],['non-high','Non-upper-lobe, high exercise','RR 2.06',2.06]],
  nettF0:'← fewer deaths with surgery',nettF1:'more deaths with surgery →',
  nettOut:{
   'upper-low':{cls:'yes',v:'Surgery lowered mortality',p:'In upper-lobe-predominant emphysema with low baseline exercise capacity, surgery lowered mortality (risk ratio 0.47, P = 0.005) [[Fishman2003]], and the 5-year risk ratio was 0.67 [[Naunheim2006]].'},
   'non-high':{cls:'no',v:'Surgery raised mortality',p:'In non-upper-lobe emphysema with high exercise capacity, surgery raised mortality (risk ratio 2.06) [[Fishman2003]].'},
   'upper-high':{cls:'maybe',v:'Not quoted in this guide\'s research',p:'The research summarised here reports the overall result (risk ratio 1.01; 5-year 0.86) and the two subgroups shown highlighted for other choices; the result for upper-lobe emphysema with high exercise capacity is not quoted [[Fishman2003,Naunheim2006]].'},
   'non-low':{cls:'maybe',v:'Not quoted in this guide\'s research',p:'The research summarised here reports the overall result (risk ratio 1.01; 5-year 0.86) and the two subgroups shown highlighted for other choices; the result for non-upper-lobe emphysema with low exercise capacity is not quoted [[Fishman2003,Naunheim2006]].'}},
  ptx:[['STELVIO',18],['TRANSFORM',29.2],['LIBERATE',26.6],['IMPACT',25.6],['EMPROVE (serious)',12.4]],pct:v=>v+'%'
};
function avTx(x,y,s,cls='t-sm',st='',an){return `<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${an?` text-anchor="${an}"`:''}${st?` style="${st}"`:''}>${s}</text>`}
function avBar(x,y,w,l,v,max,col,vl){const bw=w-70,ww=Math.max(2,bw*v/max);
  return avTx(x,y,l,'t-xs')+`<rect x="${f1(x)}" y="${f1(y+5)}" width="${f1(bw)}" height="12" rx="3" style="fill:var(--panel-2)"/><rect x="${f1(x)}" y="${f1(y+5)}" width="${f1(ww)}" height="12" rx="3" style="fill:${col}"/>`+avTx(x+bw+6,y+15,vl,'t-lbl')}
/* the target lobe: emphysematous (pale with bullae) when full, denser when collapsed */
function avLobe(x,y,rx,ry,k,op){const c=clamp((1.1-k)/.7),R=rng(21);let g=`<g style="opacity:${f1(op)}">`;
  g+=`<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(rx*k)}" ry="${f1(ry*k)}" style="fill:var(--panel);stroke:var(--alv-edge);stroke-width:1.6"/>`;
  g+=`<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(rx*k)}" ry="${f1(ry*k)}" style="fill:var(--bronchi);opacity:${f1(c*.55)}"/>`;
  for(let i=0;i<7;i++){const a=R()*6.283,d=R()*.62,rr=lerp(.16,.3,R());if(1-c<.05)break;
    g+=`<circle cx="${f1(x+Math.cos(a)*rx*k*d)}" cy="${f1(y+Math.sin(a)*ry*k*d)}" r="${f1(Math.min(rx,ry)*k*rr)}" style="fill:none;stroke:var(--alv-edge);stroke-width:1;opacity:${f1(1-c)}"/>`}
  return g+'</g>'}
function avValve(x,y,s,op){return `<g style="opacity:${f1(op)}"><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(s)}" style="fill:var(--rx-soft);stroke:var(--rx);stroke-width:2"/><path d="M${f1(x+s*.45)} ${f1(y-s*.5)}L${f1(x-s*.35)} ${f1(y+s*.05)}L${f1(x+s*.45)} ${f1(y+s*.5)}" style="fill:none;stroke:var(--rx);stroke-width:2;stroke-linejoin:round"/></g>`}
function avFan(x,y,s,ph){let g=`<path d="M${f1(x)} ${f1(y+s*.5)}V${f1(y+s*1.25)}" style="stroke:var(--muted);stroke-width:${f1(s*.14)};stroke-linecap:round"/><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(s*.5)}" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.4"/>`;
  for(let i=0;i<3;i++){const a=ph*12+i*2.094,bx=x+Math.cos(a)*s*.22,by=y+Math.sin(a)*s*.22;g+=`<ellipse cx="${f1(bx)}" cy="${f1(by)}" rx="${f1(s*.2)}" ry="${f1(s*.09)}" transform="rotate(${f1(a*57.3)} ${f1(bx)} ${f1(by)})" style="fill:var(--air-soft);stroke:var(--air)"/>`}
  for(let i=0;i<3;i++){const k=(ph*3+i/3)%1;g+=`<path d="M${f1(x-s*.6-k*s*.8)} ${f1(y-s*.25+i*s*.25)}h${f1(-s*.35)}" style="stroke:var(--air);stroke-width:1.8;stroke-linecap:round;opacity:${f1(1-k)}"/>`}
  return g}
inits.advanced=()=>{
  const svg=$('#avSvg'),rg=$('#avT'),T=AV_TXT;let cv=0;
  function draw(t){
    const N=vb(svg,'720 400','400 720'),p=phaseOf(AV_STEPS,t);
    const L=N?{cx:200,y:28,s:248,px:20,py:340,pw:360,ph:364}:{cx:200,y:30,s:296,px:404,py:24,pw:304,ph:352};
    const br=(Math.sin(t*Math.PI*2*14)+1)/2,out=Math.cos(t*Math.PI*2*14)<0;/* out: breathing out */
    let hy=1,k=1.12,lop=1,vl=0,cut=0,stap=0,lowerB=false,bul=.85,old=1,nw=0,showL=1;
    if(p===1){cut=ramp(t,.18,.23);lop=1-ramp(t,.23,.31);hy=1-.4*ramp(t,.23,.31);stap=ramp(t,.28,.32)}
    if(p===2){vl=ramp(t,.36,.4);const c=ease(ramp(t,.4,.49));k=cv?lerp(1.12,1.06,c):lerp(1.12,.38,c);hy=cv?lerp(1,.95,c):lerp(1,.5,c)}
    if(p===3){const c=ease(ramp(t,.51,.56));old=1-c;nw=c;hy=1}
    if(p===4){hy=.65;lowerB=true;bul=.9;lop=0}
    if(p===5){showL=1-ramp(t,.84,.87)}
    if(p>=3)lop=p===3?old:0;
    const h=L.s,w=h*(.92+.14*hy),top=L.y+h*.08,bot=L.y+h*(.92+.08*hy);
    const lx=L.cx+w*.27,ly=top+h*.27,rx=w*.13,ry=h*.15;
    let s='';
    if(showL>0){let g='';
      if(p<3||old>0)g+=`<g style="opacity:${f1(p===3?old:1)}">`+lungs(L.cx,L.y,h,{hyper:hy,bullae:lowerB?bul:bul,lower:lowerB,breathe:br*.5})+'</g>';
      if(nw>0)g+=`<g style="opacity:${f1(nw)}">`+lungs(L.cx,L.y,h,{hyper:0,bullae:0,breathe:br})+'</g>';
      /* fissure and the target lobe */
      if(p<=2){const fx0=L.cx+w*.13,fy0=top+h*.49,fx1=L.cx+w*.49,fy1=top+h*.42;
        g+=`<path d="M${f1(fx0)} ${f1(fy0)}Q${f1((fx0+fx1)/2)} ${f1(fy0+h*.02)} ${f1(fx1)} ${f1(fy1)}" style="fill:none;stroke:var(--bronchi);stroke-width:1.6;${p===2&&cv?'stroke-dasharray:6 5;':''}"/>`;
        g+=avLobe(lx,ly,rx,ry,k+(p===0?.03*br:0),lop);
        if(cut>0)g+=`<ellipse cx="${f1(lx)}" cy="${f1(ly)}" rx="${f1(rx*1.22)}" ry="${f1(ry*1.22)}" style="fill:none;stroke:var(--fl);stroke-width:2;stroke-dasharray:7 5;opacity:${f1(cut*(1-ramp(t,.29,.33)))}"/>`;
        if(stap>0)g+=`<path d="M${f1(lx-rx*.9)} ${f1(ly+ry*.95)}L${f1(lx+rx*.9)} ${f1(ly+ry*.6)}" style="stroke:var(--rx);stroke-width:2.4;stroke-dasharray:3 3;opacity:${f1(stap)}"/>`;
        if(p===0||p===2)g+=avTx(lx+20,top-20,T.lobe,'t-xs','fill:var(--ink)','middle');
        if(p===2&&cv)g+=avTx(fx1-4,fy1+16,T.fiss,'t-xs','fill:var(--ink)','end')}
      /* valve, bronchoscope and air particles */
      if(p===2){const bx=L.cx+w*.16,by=top+h*.42,vx=bx+w*.075,vy=by-h*.075;
        const sc=ramp(t,.35,.37)*(1-ramp(t,.4,.42));
        if(sc>0)g+=`<path d="M${f1(L.cx)} ${f1(L.y-20)}V${f1(top+h*.28)}Q${f1(L.cx+h*.05)} ${f1(top+h*.34)} ${f1(bx)} ${f1(by)}L${f1(vx)} ${f1(vy)}" style="fill:none;stroke:var(--ink);stroke-width:3.4;opacity:${f1(sc*.6)}"/>`;
        g+=avValve(vx,vy,Math.max(1,9*vl),vl);
        if(vl>=1&&t<.5){const n=5;for(let i=0;i<n;i++){const u=((t*14*2)+i/n)%1;
          if(out&&k>.45){const px=lerp(lx,L.cx,u),py=lerp(ly,top+h*.25,u)-Math.sin(u*Math.PI)*8;g+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="3" style="fill:var(--air)"/>`}
          else if(!out){const uu=u*.9,px=lerp(L.cx,vx,uu),py=lerp(top+h*.25,vy,uu);g+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="3" style="fill:var(--air);opacity:.8"/>`}}
          if(!out)g+=`<path d="M${f1(vx-6)} ${f1(vy-16)}l8 8m0 -8l-8 8" style="stroke:var(--bad);stroke-width:2.2"/>`;
          if(cv){for(let i=0;i<4;i++){const u=((t*20)+i/4)%1,sx=L.cx+w*.34,sy=top+h*.66;g+=`<circle cx="${f1(lerp(sx,lx,u))}" cy="${f1(lerp(sy,ly+ry*.3,u))}" r="3" style="fill:var(--air);opacity:${f1(1-u*.4)}"/>`}}}
        if(vl>0)g+=`<g style="opacity:${f1(vl)}"><path d="M${f1(lx+20)} ${f1(top-2)}L${f1(vx+4)} ${f1(vy-10)}" style="stroke:var(--rx);stroke-width:1.2"/>`+avTx(lx+20,top-6,T.valve,'t-xs','fill:var(--rx)','middle')+'</g>'}
      /* diaphragm marker */
      /* alpha-1 drip */
      if(p===4){const ix=L.cx-w*.5+4,iy=L.y+8;g+=`<rect x="${f1(ix-14)}" y="${f1(iy)}" width="28" height="40" rx="6" style="fill:var(--air-soft);stroke:var(--air);stroke-width:1.4"/><path d="M${f1(ix)} ${f1(iy+40)}V${f1(iy+70)}" style="stroke:var(--air);stroke-width:2"/>`;
        const d=(t*30)%1;g+=`<circle cx="${f1(ix)}" cy="${f1(iy+46+d*20)}" r="2.6" style="fill:var(--air)"/>`+avTx(ix-14,iy-6,T.drip,'t-xs','fill:var(--air-ink)')}
      if(p===3&&nw>.5)g+=avTx(L.cx,L.y-8,T.donor,'t-sm','fill:var(--rec)','middle');
      s+=`<g style="opacity:${f1(showL)}">${g}</g>`}
    if(p===5){const a=ramp(t,.85,.89),px=L.cx-30,py=bot;s+=`<g style="opacity:${f1(a)}">`+person(px,py,h*.62,{col:'var(--rec)',lean:.2})+avFan(px+h*.3,py-h*.56,h*.11,t*6)+'</g>'}
    const si=p===0?0:p===1?1:p===2?(cv?3:2):p===3?4:p===4?5:6;
    s+=avTx(L.cx,L.y+h+(N?22:28),T.stat[si],'t-sm','fill:var(--ink)','middle');
    s+=avPanel(L,t,p);
    svg.innerHTML=s;setSt(p);$('#avNote').innerHTML=noteHTML(AV_STEPS[p]);
  }
  function avPanel(L,t,p){const x=L.px,y=L.py,w=L.pw,h=L.ph,cx=x+w/2,wide=w>320;let g=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="14" style="fill:var(--panel-2);opacity:.55"/>`;
    if(p===0){const P=T.p0;g+=avTx(x+16,y+28,P.h,'t-big')+wrapT(x+16,y+54,P.l,wide?46:40,{cls:'t-xs',lh:13}).svg;
      g+=wrapT(x+16,y+120,P.ct,wide?46:40,{cls:'t-xs',lh:13,style:'fill:var(--ink)'}).svg;
      const bw=w-120,row=(yy,a,b,l,c)=>avTx(x+16,yy,l,'t-xs',`fill:${c}`)+`<rect x="${f1(x+16)}" y="${f1(yy+6)}" width="${f1(bw*a)}" height="10" rx="3" style="fill:${c}"/><rect x="${f1(x+16)}" y="${f1(yy+19)}" width="${f1(bw*b)}" height="10" rx="3" style="fill:var(--smoke)"/>`;
      g+=row(y+168,.8,.35,P.het,'var(--fl)')+row(y+228,.62,.56,P.hom,'var(--accent)')}
    else if(p===1){const P=T.p1,lo=.25,hi=4,x0=x+20,x1=x+w-20,sc=v=>x0+(Math.log(v)-Math.log(lo))/(Math.log(hi)-Math.log(lo))*(x1-x0),a=ramp(t,.18,.26);
      g+=avTx(x+16,y+28,P.h,'t-big')+avTx(x+16,y+46,P.n,'t-xs');
      g+=`<line x1="${f1(sc(1))}" x2="${f1(sc(1))}" y1="${f1(y+62)}" y2="${f1(y+250)}" style="stroke:var(--muted);stroke-width:2"/>`;
      P.rows.forEach(([l,v],i)=>{const yy=y+80+i*58,c=v<1?'var(--rec)':v>1.5?'var(--bad)':'var(--ink)';
        g+=avTx(x0,yy,l,'t-xs','fill:var(--ink)')+`<rect x="${f1(sc(v)-6)}" y="${f1(yy+12)}" width="12" height="12" style="fill:${c};opacity:${f1(a)}"/>`+avTx(sc(v)+(v>2?-10:10),yy+22,v.toFixed(2),'t-lbl',`fill:${c}`,v>2?'end':'start')});
      [.25,.5,1,2,4].forEach(v=>g+=avTx(sc(v),y+268,String(v),'t-xs','','middle'));
      g+=avTx(sc(1)-6,y+292,P.f0,'t-xs','fill:var(--rec)','end')+avTx(sc(1)+6,y+292,P.f1,'t-xs','fill:var(--bad)')}
    else if(p===2){const P=T.p2;
      if(cv){g+=avTx(x+16,y+28,P.cvH,'t-big','fill:var(--fl)')+wrapT(x+16,y+58,P.cv,wide?44:36,{cls:'t-sm',lh:16,style:'fill:var(--ink)'}).svg}
      else{g+=avTx(x+16,y+28,P.h,'t-big')+avTx(x+16,y+46,P.sub,'t-xs');const a=ramp(t,.42,.48);
        P.s.forEach(([l,v],i)=>{const c=i%2,r=Math.floor(i/2),bx=x+16+c*(w-32)/2,by=y+70+r*110,bw=(w-32)/2-10;
          g+=`<rect x="${f1(bx)}" y="${f1(by)}" width="${f1(bw)}" height="96" rx="10" style="fill:var(--panel);stroke:${i===3?'var(--fl)':'var(--rx)'};opacity:${f1(.4+.6*a)}"/>`+
            avTx(bx+bw/2,by+50,v,'t-big',`font-size:22px;fill:${i===3?'var(--fl)':'var(--rx)'}`,'middle')+avTx(bx+bw/2,by+74,l,'t-xs','','middle')})}}
    else if(p===3){const P=T.p3,a=ease(ramp(t,.52,.58));g+=avTx(x+16,y+28,P.h,'t-big');
      g+=chip(x+16,y+64,P.l1,{col:'var(--rec)',fill:'var(--rec-soft)',size:wide?12:12.5})+chip(x+16,y+104,P.l2,{col:'var(--dx)',fill:'var(--dx-soft)',size:wide?12:12.5});
      g+=avBar(x+16,y+150,w-32,P.r1,6.41*a,8,'var(--rec)',P.yr(6.41))+avBar(x+16,y+192,w-32,P.r2,4.59*a,8,'var(--smoke)',P.yr(4.59))}
    else if(p===4){const P=T.p4,a=ease(ramp(t,.67,.74));g+=avTx(x+16,y+28,P.h,'t-big');
      g+=avBar(x+16,y+62,w-32,P.r1,1.45*a,2.5,'var(--air)','−1.45')+avBar(x+16,y+104,w-32,P.r2,2.19*a,2.5,'var(--smoke)','−2.19')+avTx(x+16,y+144,P.u,'t-xs');
      g+=wrapT(x+16,y+190,P.ole,wide?40:44,{cls:'t-sm',lh:16,style:'fill:var(--ink)'}).svg}
    else{const P=T.p5,a=ramp(t,.85,.9);g+=avTx(x+16,y+28,P.h,'t-big');
      [[P.f,'var(--air)'],[P.m,'var(--rec)']].forEach(([l,c],i)=>{g+=`<g style="opacity:${f1(a)}">`+chip(x+16,y+70+i*46,l,{col:c,fill:'var(--panel)',size:12})+'</g>'});
      g+=chip(x+16,y+162,P.sv,{col:'var(--warn)',fill:'var(--warn-soft)',size:12})+avTx(x+20,y+190,P.ev,'t-xs','fill:var(--warn)')}
    return g}
  const stop=playWire(rg,$('#avPlay'),draw,17000,'%t:player.replay%','advanced');
  const setSt=stepWire($('#avSteps'),AV_STEPS,rg,draw,stop);
  $('#avCv').addEventListener('click',e=>{const b=e.target.closest('[data-cv]');if(!b)return;cv=+b.dataset.cv;
    $$('[data-cv]',$('#avCv')).forEach(x=>x.setAttribute('aria-pressed',x===b));const tt=+rg.value;
    if(tt<.34||tt>=.51){stop();rg.value=.47}draw(+rg.value)});
  draw(+rg.value);

  /* ---- NETT explorer ---- */
  const nsv=$('#avNett');let dist='upper',ex='low';
  function drawNett(){const N=vb(nsv,'560 260','400 330'),key=dist+'-'+ex,rows=T.nett,rh=N?54:40,top=16,lo=.25,hi=4;
    const x0=N?24:300,x1=N?376:544,sc=v=>x0+(Math.log(v)-Math.log(lo))/(Math.log(hi)-Math.log(lo))*(x1-x0),yb=top+rows.length*rh;
    let g='';[.25,.5,1,2,4].forEach(v=>{g+=`<line x1="${f1(sc(v))}" x2="${f1(sc(v))}" y1="${top}" y2="${f1(yb)}" style="stroke:var(--line);stroke-width:${v===1?2:1};${v===1?'':'stroke-dasharray:2 4'}"/>`+avTx(sc(v),yb+14,String(v),'t-xs','','middle')});
    rows.forEach(([m,l,vt,v],i)=>{const y=top+i*rh,on=m===key,ry=N?y+36:y+20,c=on?(v<1?'var(--rec)':'var(--bad)'):m==='all'?'var(--ink)':'var(--muted)';
      if(on)g+=`<rect x="4" y="${f1(y+2)}" width="${N?392:552}" height="${rh-4}" rx="8" style="fill:var(--rec-soft);opacity:.7"/>`;
      g+=avTx(N?12:12,y+(N?16:18),l,'t-xs',`fill:var(--ink)`)+avTx(N?12:12,y+(N?29:31),vt,'t-xs');
      g+=`<rect x="${f1(sc(v)-6)}" y="${f1(ry-6)}" width="12" height="12" style="fill:${c}"/>`});
    g+=avTx(12,yb+34,T.nettF0,'t-xs','fill:var(--rec)')+avTx(N?388:548,yb+34,T.nettF1,'t-xs','fill:var(--bad)','end');
    nsv.innerHTML=g;const O=T.nettOut[key];$('#avNettOut').innerHTML=`<p class="verdict ${O.cls}">${O.v}</p><p>${O.p}</p>`}
  $('#avDist').addEventListener('click',e=>{const b=e.target.closest('[data-d]');if(!b)return;dist=b.dataset.d;$$('[data-d]',$('#avDist')).forEach(x=>x.setAttribute('aria-pressed',x===b));drawNett()});
  $('#avEx').addEventListener('click',e=>{const b=e.target.closest('[data-e]');if(!b)return;ex=b.dataset.e;$$('[data-e]',$('#avEx')).forEach(x=>x.setAttribute('aria-pressed',x===b));drawNett()});
  drawNett();

  /* ---- pneumothorax bars ---- */
  const psv=$('#avPtx');
  function drawPtx(){const N=vb(psv,'560 220','400 270');let g='';const rows=T.ptx,rh=N?42:36,bx=N?16:170,bw=N?310:320,mx=35;
    rows.forEach(([l,v],i)=>{const y=12+i*rh;g+=N?avTx(16,y+10,l,'t-xs','fill:var(--ink)'):avTx(bx-10,y+16,l,'t-xs','fill:var(--ink)','end');
      const yy=N?y+15:y+5;g+=`<rect x="${f1(bx)}" y="${f1(yy)}" width="${f1(bw*v/mx)}" height="15" rx="3" style="fill:var(--fl)"/>`+avTx(bx+bw*v/mx+6,yy+12,T.pct(v),'t-lbl')});
    const ay=12+rows.length*rh+4;g+=`<line x1="${bx}" x2="${bx+bw}" y1="${ay}" y2="${ay}" class="axis"/>`;[0,10,20,30].forEach(v=>g+=avTx(bx+bw*v/mx,ay+14,v+'%','t-xs','','middle'));
    psv.innerHTML=g}
  drawPtx();
  const prev=redraws.advanced;redraws.advanced=()=>{prev&&prev();drawNett();drawPtx()};
};
