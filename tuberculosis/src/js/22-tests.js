/* =============== 2.2 TB infection tests: TST & IGRA =============== */
/* illustrative values per person: ind/ery mm, QFT IU/mL (tb1, tb2, mitogen, nil), T-SPOT spots (a, b, mitogen, nil) */
const TS_PEOPLE={
 'inf':{ind:14,ery:21,tb1:1.6,tb2:2.2,mit:9,nil:.08,sa:18,sb:12,sm:40,sn:1},
 'inf+bcg':{ind:17,ery:25,tb1:1.6,tb2:2.2,mit:9,nil:.08,sa:18,sb:12,sm:40,sn:1},
 'no':{ind:0,ery:4,tb1:.1,tb2:.13,mit:8.5,nil:.08,sa:1,sb:0,sm:38,sn:0},
 'no+bcg':{ind:11,ery:17,tb1:.1,tb2:.13,mit:8.5,nil:.08,sa:1,sb:0,sm:38,sn:0}};
const TS_HOURS=t=>t<.08?t/.08*.5:.5+(t-.08)/.92*71.5;
const TS_STEPS=[
 {from:0,at:.03,k:'Hour 0 · one visit for blood, the first of two for the skin',t:'Injection and blood draw',
  txt:`The Mantoux TST is 0.1 mL of 5 tuberculin units (TU) of purified protein derivative (PPD), injected into the skin of the forearm, which raises a small pale bleb. It is read 48–72 hours later. [[ATS2000]] For an IGRA, blood is drawn into tubes at the same visit; no second visit is needed. [[Mazurek2010]]`,
  pt:`The skin test is a tiny injection just under the skin, and you come back 2 or 3 days later. The blood test is one ordinary blood sample.`,
  hook:`Mantoux: 0.1 mL of 5 TU PPD intradermally; read at 48–72 h.`},
 {from:.08,at:.18,k:'Hours 1–20',t:'The immune system remembers',
  txt:`Both tests show whether the body has met the TB bacterium. Neither can tell TB infection from TB disease. [[Lewinsohn2017]] In someone infected, T cells gather where the tuberculin was injected and a firm swelling builds over the next 2–3 days (drawn schematically here). Meanwhile the IGRA tubes incubate for 16–24 hours with TB antigens. [[Mazurek2010]]`,
  pt:`If your body has met TB before, its defence cells recognise the test material and react. That reaction is what both tests detect.`,
  hook:`TST and IGRA detect immune memory, not live bacteria. A positive test never proves TB disease.`},
 {from:.3,at:.35,k:'Hour 24 · QuantiFERON',t:'Interferon-γ in the tubes',
  txt:`QuantiFERON is positive when the TB antigen response minus Nil is at least 0.35 IU/mL and at least 25% of the Nil value, with Nil at 8.0 IU/mL or less. It is indeterminate if Nil is above 8.0, or if the TB response is negative and the mitogen control is below 0.5 IU/mL. [[Mazurek2010]] QFT-Plus adds a second antigen tube (TB2) that stimulates CD8+ as well as CD4+ T cells; the first FDA record naming it is dated 7 June 2017. [[Barcellini2016,FDA-QFTPlus]] The antigens, ESAT-6 and CFP-10, are absent from BCG. [[Andersen2000]]`,
  pt:`In the lab, your blood is mixed with pieces of the TB germ. If your defence cells know TB, they release a chemical signal, interferon-gamma, that the test measures.`,
  hook:`QFT positive: TB − Nil ≥ 0.35 IU/mL (and ≥ 25% of Nil). The mitogen tube is the positive control.`},
 {from:.4,at:.47,k:'Hour 24–30 · T-SPOT.TB',t:'Counting spots',
  txt:`T-SPOT.TB counts the cells that release interferon-γ, one spot each. It is positive at 8 spots or more, borderline at 5–7 and negative at 4 or fewer, provided Nil is 10 spots or fewer; a mitogen well under 20 spots with a negative TB response is indeterminate. [[Mazurek2010]] Pooled sensitivity in confirmed TB was 90% for T-SPOT.TB and 70% for QFT-GIT. [[Pai2008]]`,
  pt:`This version of the blood test counts reacting cells one by one, as dots in a tiny well.`,
  hook:`T-SPOT.TB: ≥ 8 spots positive, 5–7 borderline, ≤ 4 negative.`},
 {from:.62,at:.74,k:'Hours 48–72 · the return visit',t:'Measuring the induration',
  txt:`Only the raised, firm part, the induration, is measured across the forearm, never the redness around it. [[ATS2000]] A result of 5 mm or more is positive in close contacts, immunosuppressed people (including people with HIV), people with evidence of current or past TB and people taking TNF blockers; 10 mm in other risk groups; 15 mm in everyone else. [[Lewinsohn2017]] TST specificity is about 97% without BCG but about 60% with a BCG history. [[Lewinsohn2017]]`,
  pt:`A nurse feels for the firm bump and measures it in millimetres with a ruler. Redness alone does not count.`,
  hook:`Measure induration, not erythema. Cut-offs: 5, 10 or 15 mm by risk group.`},
 {from:.86,at:.97,k:'After the result',t:'What a positive result means',
  txt:`A positive test shows infection, not illness, so TB disease must be excluded (usually with symptoms and a chest X-ray) before preventive treatment. [[Lewinsohn2017]] Most people with a positive test never develop TB disease: positive predictive values for progression were 2.7% for commercial IGRAs and 1.5% for the TST, with negative predictive values of 99.7% and 99.4%. [[Diel2012]] Next: <a href="#tpt" data-go="tpt">Treating TB infection</a>.`,
  pt:`Most people with a positive skin or blood test never get sick with TB. Preventive treatment lowers the risk further.`,
  hook:`PPV for progression under 3% for both tests; NPV over 99%. [[Diel2012,Hamada2023]]`}];

inits.tests=()=>{
  const svg=$('#tsSvg'),rg=$('#tsT');let view='both',inf=true,bcg=false,setSt=()=>{};
  const who=()=>TS_PEOPLE[(inf?'inf':'no')+(bcg?'+bcg':'')];
  const sq=v=>Math.sqrt(clamp(v/10,0,1));/* square-root scale for interferon-γ, 0–10 IU/mL */
  function tst(B,h,P){let s='';const fw=Math.min(B.w-20,440),fx=B.x+(B.w-fw)/2,fy=B.y+34,fh=fw*.3,mm=fw/120,cx=fx+fw*.55,cy=fy+fh*.48;
    s+=`<text x="${B.x}" y="${B.y+12}" class="t-sm" style="fill:var(--accent)">SKIN TEST · TST (MANTOUX)</text>`;
    const g=ease(ramp(h,6,48)),ind=P.ind*g,ery=P.ery*ease(ramp(h,4,40)),bleb=ramp(h,.05,.3)*(1-ramp(h,.6,8));
    s+=forearm(fx,fy,fw,ind,{ery,bleb,ruler:h>=48});
    /* the syringe comes in at a shallow angle, then leaves */
    const sa=h<.5?1:1-ramp(h,.5,1.5);
    if(sa>0){const nx=cx+4+(1-ramp(h,0,.12))*40;s+=`<g style="opacity:${f1(sa)}" transform="rotate(-12 ${f1(nx)} ${f1(cy)})"><line x1="${f1(nx)}" y1="${f1(cy)}" x2="${f1(nx+30)}" y2="${f1(cy)}" style="stroke:var(--muted);stroke-width:1.4"/><rect x="${f1(nx+30)}" y="${f1(cy-6)}" width="70" height="12" rx="2" style="fill:var(--panel);stroke:var(--muted)"/><rect x="${f1(nx+32)}" y="${f1(cy-4)}" width="${f1(40*(1-ramp(h,.12,.4)))}" height="8" style="fill:var(--accent);opacity:.35"/><rect x="${f1(nx+100)}" y="${f1(cy-9)}" width="5" height="18" style="fill:var(--muted)"/></g>`}
    if(h>=48){const ok=ind>=.5;s+=`<text x="${f1(cx)}" y="${f1(fy-6)}" class="t-lbl t-mid" style="fill:var(--accent)">${ok?'induration '+Math.round(ind)+' mm':'no induration (0 mm)'}</text>`;
      if(P.ery>ind+3)s+=`<text x="${f1(fx+fw)}" y="${f1(fy+fh+(h>=48?44:16))}" class="t-xs t-end">redness ${Math.round(ery)} mm: not measured</text>`}
    /* under the skin: an inset of T cells gathering */
    const R=Math.min(58,B.w*.17),ix=B.x+B.w/2,iy=fy+fh+56+R;
    s+=`<line x1="${f1(cx)}" y1="${f1(cy+4)}" x2="${f1(ix)}" y2="${f1(iy-R)}" style="stroke:var(--line);stroke-width:1;stroke-dasharray:3 3"/>`;
    s+=`<clipPath id="tsClip"><circle cx="${f1(ix)}" cy="${f1(iy)}" r="${f1(R)}"/></clipPath><circle cx="${f1(ix)}" cy="${f1(iy)}" r="${f1(R)}" style="fill:var(--skin);fill-opacity:.35;stroke:var(--skin-line)"/>`;
    s+=`<g clip-path="url(#tsClip)"><path d="M${f1(ix-R)} ${f1(iy+R*.55)}Q${f1(ix)} ${f1(iy+R*.35)} ${f1(ix+R)} ${f1(iy+R*.6)}" style="fill:none;stroke:var(--vessel);stroke-width:5;opacity:.35"/>`;
    const q=rng(41),nT=Math.round((P.ind?16:2)*ramp(h,2,40)),pull=ramp(h,2,46);
    for(let i=0;i<16;i++){const a=q()*Math.PI*2,d=R*(.2+q()*.55),sx=ix+(q()-.5)*R*1.6,sy=iy+R*.5;if(i>=Math.max(nT,P.ind?0:2))continue;
      const tx=ix+Math.cos(a)*d*.75,ty=iy-R*.15+Math.sin(a)*d*.5,k=P.ind?pull:ramp(h,2,30)*.4;s+=tcell(lerp(sx,tx,k),lerp(sy,ty,k),4.2,{act:P.ind>0&&h>20})}
    s+='</g>';
    s+=`<text x="${f1(ix)}" y="${f1(iy+R+14)}" class="t-xs t-mid">${N0?'under the skin (schematic)':'under the skin: T cells gather (schematic)'}</text>`;
    return s}
  let N0=false;
  function igra(B,h,P){let s='';s+=`<text x="${B.x}" y="${B.y+12}" class="t-sm" style="fill:var(--accent)">BLOOD TEST · IGRA (QFT-PLUS, T-SPOT.TB)</text>`;
    const tubes=[['Nil',P.nil,'var(--fibro)'],['TB1',P.tb1,'var(--accent)'],['TB2',P.tb2,'var(--accent)'],['Mitogen',P.mit,'var(--gold)']];
    const gap=Math.min(70,(B.w-20)/4),tx0=B.x+(B.w-gap*4)/2+gap/2,ty=B.y+30,th=62,fill=ramp(h,0,.4);
    tubes.forEach((tb,i)=>{const x=tx0+i*gap;s+=`<rect x="${f1(x-10)}" y="${ty+8}" width="20" height="${th}" rx="8" style="fill:var(--panel);stroke:var(--muted)"/><rect x="${f1(x-8.5)}" y="${f1(ty+8+th-2-(th-6)*.8*fill)}" width="17" height="${f1((th-6)*.8*fill)}" rx="6" style="fill:var(--blood);opacity:.75"/><rect x="${f1(x-12)}" y="${ty}" width="24" height="10" rx="3" style="fill:${tb[2]}"/><text x="${f1(x)}" y="${ty+th+22}" class="t-xs t-mid" style="fill:var(--ink)">${tb[0]}</text>`});
    const inc=ramp(h,.5,24),py=ty+th+32;
    s+=`<rect x="${f1(tx0-gap/2+4)}" y="${py}" width="${f1(gap*4-8)}" height="6" rx="3" style="fill:var(--panel-2)"/><rect x="${f1(tx0-gap/2+4)}" y="${py}" width="${f1((gap*4-8)*inc)}" height="6" rx="3" style="fill:var(--accent)"/><text x="${f1(tx0-gap/2+4)}" y="${py+18}" class="t-xs">${h<24?'incubating with TB antigens · 16–24 h':'incubation done · interferon-γ measured'}</text>`;
    /* bars: response minus Nil, square-root scale */
    const by=py+46,bh=96,bx0=tx0-gap/2+30,bw=gap*4-40,Y=v=>by+bh-bh*sq(v),grow=ease(ramp(h,24,28));
    s+=`<line x1="${f1(bx0)}" x2="${f1(bx0+bw)}" y1="${by+bh}" y2="${by+bh}" class="axis"/>`;
    [0,.35,1,4,10].forEach(v=>{s+=`<text x="${f1(bx0-5)}" y="${f1(Y(v)+3)}" class="t-xs t-end"${v===.35?' style="fill:var(--bad)"':''}>${v}</text>`});
    s+=`<line x1="${f1(bx0)}" x2="${f1(bx0+bw)}" y1="${f1(Y(.35))}" y2="${f1(Y(.35))}" style="stroke:var(--bad);stroke-width:1.3;stroke-dasharray:5 3"/><text x="${f1(bx0)}" y="${by+bh+27}" class="t-xs" style="fill:var(--bad)">- - - cut-off: TB − Nil ≥ 0.35 IU/mL</text>`;
    const bars=[['TB1 − Nil',P.tb1-P.nil],['TB2 − Nil',P.tb2-P.nil],['Mitogen − Nil',P.mit-P.nil]];
    bars.forEach((b,i)=>{const w=bw/3*.5,x=bx0+bw/3*(i+.25),v=Math.max(0,b[1])*grow;s+=`<rect x="${f1(x)}" y="${f1(Y(v))}" width="${f1(w)}" height="${f1(by+bh-Y(v))}" style="fill:${i===2?'var(--gold)':'var(--accent)'};opacity:.85"/><text x="${f1(x+w/2)}" y="${by+bh+12}" class="t-xs t-mid">${b[0]}</text>`;
      if(grow>.95)s+=`<text x="${f1(x+w/2)}" y="${f1(Y(v)-4)}" class="t-xs t-mid" style="fill:var(--ink)">${b[1].toFixed(2)}</text>`});
    s+=`<text x="${f1(bx0-28)}" y="${f1(by-12)}" class="t-xs">IU/mL (√ scale)</text>`;
    if(h>=26){const pos=Math.max(P.tb1,P.tb2)-P.nil>=.35;s+=`<text x="${f1(bx0+bw)}" y="${f1(by-12)}" class="t-lbl t-end" style="fill:${pos?'var(--tb)':'var(--good)'}">QFT ${pos?'positive':'negative'}</text>`}
    /* T-SPOT wells */
    const wy=by+bh+64,wr=Math.min(19,gap*.3),sp=ramp(h,26,34),W=[['Nil',P.sn],['Panel A',P.sa],['Panel B',P.sb],['Control',P.sm]];
    s+=`<text x="${f1(tx0-gap/2+4)}" y="${f1(wy-wr-8)}" class="t-xs" style="fill:var(--accent)">T-SPOT.TB wells · ≥ 8 spots positive</text>`;
    W.forEach((w,i)=>{const x=tx0+i*gap,q=rng(60+i),n=Math.round(Math.min(w[1],40)*sp);s+=`<circle cx="${f1(x)}" cy="${f1(wy)}" r="${f1(wr)}" style="fill:var(--field);stroke:var(--muted)"/>`;
      for(let k=0;k<n;k++){const a=q()*Math.PI*2,d=Math.sqrt(q())*wr*.82;s+=`<circle cx="${f1(x+Math.cos(a)*d)}" cy="${f1(wy+Math.sin(a)*d)}" r="1.5" style="fill:var(--nuc)"/>`}
      s+=`<text x="${f1(x)}" y="${f1(wy+wr+12)}" class="t-xs t-mid" style="fill:var(--ink)">${w[0]}</text>`;if(sp>0)s+=`<text x="${f1(x)}" y="${f1(wy+wr+24)}" class="t-xs t-mid">${w[1]>=40&&sp>=1?'≥ 20':n} spots</text>`});
    return s}
  function draw(t){const P=who(),h=TS_HOURS(t);
    let s='',W,Hh,boxes;
    N0=NARROW();
    if(N0){if(view==='both'){W=400;Hh=780;boxes={tst:{x:10,y:44,w:380},igra:{x:10,y:392,w:380}}}else if(view==='tst'){W=400;Hh=390;boxes={tst:{x:10,y:44,w:380}}}else{W=400;Hh=440;boxes={igra:{x:10,y:44,w:380}}}}
    else{if(view==='both'){W=720;Hh=440;boxes={tst:{x:12,y:44,w:350},igra:{x:378,y:44,w:330}}}else if(view==='tst'){W=720;Hh=412;boxes={tst:{x:40,y:44,w:640}}}else{W=720;Hh=440;boxes={igra:{x:120,y:44,w:480}}}}
    svg.setAttribute('viewBox',`0 0 ${W} ${Hh}`);svg.dataset.mode=N0?'n':'w';
    /* hours axis with milestones */
    const ax0=40,ax1=W-20,X=v=>lerp(ax0,ax1,v/72);
    s+=`<line x1="${ax0}" x2="${ax1}" y1="20" y2="20" class="axis"/>`;
    [0,12,24,36,48,60,72].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="16" y2="24" class="axis"/><text x="${f1(X(v))}" y="34" class="t-xs t-mid">${v} h</text>`});
    s+=`<rect x="${f1(X(48))}" y="15" width="${f1(X(72)-X(48))}" height="10" rx="3" style="fill:var(--accent);opacity:.15"/><text x="${f1(X(60))}" y="12" class="t-xs t-mid" style="fill:var(--accent)">TST reading window</text>`;
    if(!N0)s+=`<text x="${f1(X(24))}" y="12" class="t-xs t-mid" style="fill:var(--accent)">IGRA result</text>`;
    s+=`<circle cx="${f1(X(h))}" cy="20" r="5" style="fill:var(--accent)"/>`;
    if(view==='both'&&!N0)s+=`<line x1="370" x2="370" y1="50" y2="${Hh-10}" style="stroke:var(--line)"/>`;
    if(boxes.tst)s+=tst(boxes.tst,h,P);
    if(boxes.igra)s+=igra(boxes.igra,h,P);
    svg.innerHTML=s;
    const ph=phaseOf(TS_STEPS,t);setSt(ph);
    const ind=Math.round(P.ind*ease(ramp(h,6,48)));
    const cut=c=>h>=48?(P.ind>=c?'<b style="color:var(--tb)">+</b>':'<b>−</b>'):'…';
    $('#tsRead').innerHTML=`<span>hour <b>${h<1?h.toFixed(1):Math.round(h)}</b></span><span>person <b>${inf?'TB infection':'no TB infection'}${bcg?', BCG after age 1':''}</b></span><span>TST <b>${h>=48?ind+' mm':'not yet readable'}</b> · at 5 mm ${cut(5)} 10 mm ${cut(10)} 15 mm ${cut(15)}</span><span>IGRA <b>${h>=26?(Math.max(P.tb1,P.tb2)-P.nil>=.35?'positive':'negative'):'pending'}</b></span>`;
    const st=Object.assign({},TS_STEPS[ph]);
    if(ph===4){const P2=P;st.txt+=` <b>This person:</b> ${P2.ind?P2.ind+' mm':'0 mm'}${!inf&&bcg?`. This is BCG, not infection: after BCG given past age 1, 41.8% had a TST of 10 mm or more. Positive at the 5 and 10 mm cut-offs, negative at 15 mm, while the IGRA stays negative. [[Farhat2006,Pai2008]]`:inf?`, positive at every cut-off.`:`, negative.`}`}
    $('#tsNote').innerHTML=noteHTML(st)}
  const stop=playWire(rg,$('#tsPlay'),draw,18000,'Replay','tests');
  setSt=stepWire($('#tsSteps'),TS_STEPS,rg,draw,stop);
  $$('[data-tsv]').forEach(b=>b.addEventListener('click',()=>{view=b.dataset.tsv;$$('[data-tsv]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  $('#tsInf').addEventListener('click',()=>{inf=!inf;$('#tsInf').setAttribute('aria-pressed',inf);draw(+rg.value)});
  $('#tsBcg').addEventListener('click',()=>{bcg=!bcg;$('#tsBcg').setAttribute('aria-pressed',bcg);draw(+rg.value)});
  draw(+rg.value);

  /* ---- TST cut-off calculator ---- */
  const GRP={'5a':[5,'a close contact of a person with TB'],'5b':[5,'immunosuppressed, including people with HIV'],'5c':[5,'someone with evidence of current or past TB'],'5d':[5,'someone taking TNF blockers'],
    '10a':[10,'someone born in a high-incidence country'],'10b':[10,'someone with occupational exposure'],'10c':[10,'someone with medical risk factors for progression'],'15':[15,'someone with no risk factors']};
  const cs=$('#tsCalc'),iR=$('#tsInd'),gS=$('#tsGrp'),pOn=$('#tsPrevOn'),pR=$('#tsPrev');
  function calc(){const N=vb(cs,'720 232','400 200'),ind=+iR.value,g=GRP[gS.value],cut=g[0],prev=+pR.value;
    const fw=N?360:440,fx=N?20:140,fy=24,mm=fw/120,cx=fx+fw*.55;
    let s=forearm(fx,fy,fw,ind,{ery:ind?ind+6:0,ruler:true});
    const ry=fy+fw*.3+10,x0=cx-15*mm;
    if(cut<=30){const xc=x0+(15-cut/2)*mm,xc2=x0+(15+cut/2)*mm;s+=`<path d="M${f1(xc)} ${f1(ry+18)}V${f1(ry+26)}M${f1(xc2)} ${f1(ry+18)}V${f1(ry+26)}M${f1(xc)} ${f1(ry+22)}H${f1(xc2)}" style="stroke:var(--bad);stroke-width:1.4"/><text x="${f1(cx)}" y="${f1(ry+38)}" class="t-xs t-mid" style="fill:var(--bad)">cut-off for this group: ${cut} mm</text>`}
    s+=`<text x="${f1(cx)}" y="${f1(fy-8)}" class="t-lbl t-mid" style="fill:var(--accent)">${ind} mm induration</text>`;
    cs.innerHTML=s;
    $('#tsIndV').textContent=ind+' mm';$('#tsPrevV').textContent=prev+' mm';pR.disabled=!pOn.checked;
    const pos=ind>=cut,conv=pOn.checked&&ind-prev>=10;
    const v=$('#tsVerdict');v.className='verdict '+(pos?'no':'yes');
    v.innerHTML=`${ind} mm in ${g[1]}: <b>${pos?'positive':'negative'}</b> at the ${cut} mm cut-off.${pOn.checked?` ${conv?`An increase of ${ind-prev} mm within 2 years: <b>this meets the conversion rule</b> (10 mm or more), which suggests recent infection.`:`An increase of ${Math.max(0,ind-prev)} mm within 2 years does not meet the 10 mm conversion rule.`}`:''}<small>A teaching tool, not an interpretation of your result. A positive TST shows infection, not disease; a clinician checks for TB disease next. [[Lewinsohn2017,ATS2000]]</small>`;
    const other=[5,10,15].filter(c=>c!==cut).map(c=>`${c} mm: ${ind>=c?'positive':'negative'}`).join(', ');
    $('#tsCalcNote').innerHTML=noteHTML({k:'TST cut-offs',t:pos?'Positive for this group':'Negative for this group',
      txt:`The same ${ind} mm would read ${other} in the other groups. The 5 mm groups are close contacts, immunosuppressed people (including people with HIV), people with evidence of current or past TB and people taking TNF blockers; the 10 mm groups are other people at increased risk, such as people born in high-incidence countries, with occupational exposure or with medical risk factors for progression; 15 mm applies to everyone else. [[Lewinsohn2017]] In a BCG-vaccinated person at increased risk, a positive TST is taken to show infection, because no method reliably tells a BCG reaction apart. [[ATS2000]]`,
      pt:`The lower the cut-off, the more seriously a small reaction is taken. That is because TB would be more likely, or more dangerous, for people in those groups.`,
      hook:`5 mm: contacts, HIV/immunosuppression, TNF blockers, prior TB on X-ray. 10 mm: other risk groups. 15 mm: no risk factors. Conversion: ≥ 10 mm rise in 2 years.`})}
  [iR,pR].forEach(e=>e.addEventListener('input',calc));[gS,pOn].forEach(e=>e.addEventListener('change',calc));
  calc();

  /* ---- TST or IGRA decision tree ---- */
  const tr=$('#tsTree'),Q={age:$('#tsQAge'),risk:$('#tsQRisk'),bcg:$('#tsQBcg'),ret:$('#tsQRet'),ser:$('#tsQSer')};
  function tree(){const N=vb(tr,'720 300','400 520'),u5=Q.age.value==='u5',hi=Q.risk.value==='hi',b=Q.bcg.value==='y',noRet=Q.ret.value==='n',ser=Q.ser.value==='y';
    /* nodes: id, x, y, label lines, kind (q question, a answer) */
    const W=N?{q1:[200,30],q2:[260,120],q3:[290,220],a1:[90,120],a2:[100,220],a3:[120,320],a4:[300,320]}:{q1:[120,40],q2:[330,40],q3:[540,40],a1:[120,170],a2:[330,170],a3:[540,170],a4:[630,262]};
    const nodes={q1:['Under 5','and healthy?'],q2:['High risk of','progression?'],q3:['BCG, or unlikely','to return?'],
      a1:['TST suggested','conditional · very low'],a2:['Insufficient data','to prefer either test'],a3:['IGRA recommended','strong · moderate quality'],a4:['Strong IGRA rec.','does not apply']};
    const path=u5?['q1','a1']:hi?['q1','q2','a2']:(b||noRet)?['q1','q2','q3','a3']:['q1','q2','q3','a4'];
    const edges=[['q1','a1','yes'],['q1','q2','no'],['q2','a2','yes'],['q2','q3','no'],['q3','a3','yes'],['q3','a4','no']];
    let s=`<defs>${marker('tsAr','var(--muted)')}${marker('tsArH','var(--accent)')}</defs>`;const bw=N?150:170,bh=40;
    edges.forEach(e=>{const A=W[e[0]],Bn=W[e[1]],on=path.includes(e[0])&&path.includes(e[1]);
      const x1=A[0],y1=A[1]+bh/2,x2=Bn[0],y2=Bn[1]-bh/2;let d;
      if(!N&&A[1]===Bn[1])d=`M${A[0]+bw/2} ${A[1]}H${Bn[0]-bw/2-4}`;else if(!N&&e[1]==='a4')d=`M${A[0]+bw/2} ${A[1]}H${Bn[0]}V${Bn[1]-bh/2-4}`;else d=`M${x1} ${y1}C${x1} ${(y1+y2)/2} ${x2} ${(y1+y2)/2} ${x2} ${y2-4}`;
      s+=`<path d="${d}" style="fill:none;stroke:${on?'var(--accent)':'var(--line)'};stroke-width:${on?2.4:1.4}" marker-end="url(#${on?'tsArH':'tsAr'})"/>`;
      const m=(!N&&A[1]===Bn[1])?[(A[0]+Bn[0])/2,A[1]-9]:(!N&&e[1]==='a4')?[Bn[0]+8,A[1]+40]:[(x1+x2)/2+(x2<x1?-12:12),(y1+y2)/2];
      s+=`<text x="${f1(m[0])}" y="${f1(m[1])}" class="t-xs t-mid" style="fill:${on?'var(--accent)':'var(--muted)'}">${e[2]}</text>`});
    Object.keys(nodes).forEach(k=>{const [x,y]=W[k],on=path.includes(k),isA=k[0]==='a',L=nodes[k];
      s+=`<rect x="${x-bw/2}" y="${y-bh/2}" width="${bw}" height="${bh}" rx="${isA?6:18}" style="fill:${on?(isA?'var(--accent)':'var(--accent-soft)'):'var(--panel)'};stroke:${on?'var(--accent)':'var(--line)'};stroke-width:1.4"/>`;
      s+=`<text x="${x}" y="${y-3}" class="t-lbl t-mid" style="font-size:12px;fill:${on&&isA?'var(--panel)':'var(--ink)'}">${L[0]}</text><text x="${x}" y="${y+12}" class="t-xs t-mid" style="fill:${on&&isA?'var(--panel)':'var(--muted)'}">${L[1]}</text>`});
    if(ser){const sx=20,sy=N?380:232;s+=`<rect x="${sx}" y="${sy}" width="${N?360:420}" height="${N?120:58}" rx="8" style="fill:var(--warn-soft);stroke:var(--warn)"/>`;
      const lines=N?['Serial testing: most IGRA conversions','in low-incidence settings were false','positives (76% of QFT converters were','negative again at 6 months). Retest.','Repeated TSTs can boost BCG reactivity.']:['Serial testing: 76% of QFT and 77% of T-SPOT.TB converters','were negative again 6 months later. Retest apparent converters.','Repeated TSTs can boost BCG reactivity.'];
      lines.forEach((l,i)=>s+=`<text x="${sx+10}" y="${sy+16+i*(N?20:15)}" class="t-xs" style="fill:var(--ink)">${l}</text>`)}
    tr.innerHTML=s;
    const end=path[path.length-1];
    const TX={a1:`For healthy children under 5, the guideline suggests a TST over an IGRA (conditional recommendation; very low-quality evidence). [[Lewinsohn2017]]`,
      a2:`For people at high risk of progression, there were insufficient data to recommend one test over the other. [[Lewinsohn2017]] TST sensitivity is about 43% in people with HIV. [[Lewinsohn2017]]`,
      a3:`The guideline strongly recommends an IGRA over the TST for people aged 5 or older who are likely infected, at low or intermediate risk of progression, and either BCG-vaccinated or unlikely to return for a TST reading (moderate-quality evidence). [[Lewinsohn2017]]`,
      a4:`Not BCG-vaccinated and likely to return: the strong IGRA recommendation quoted here does not cover this case; the full guideline has the details. [[Lewinsohn2017]]`};
    $('#tsTreeNote').innerHTML=noteHTML({k:'Choosing a test',t:nodes[end][0],txt:TX[end]+(ser?` In 2,418 US healthcare workers tested every 6 months, 6.1% converted on QFT-GIT, 8.3% on T-SPOT.TB and 0.9% on the TST, and most IGRA converters reverted; repeat draws 2 weeks apart disagreed in 8.8–12.6%. [[Dorman2014HCW]]`:''),
      pt:`Both tests answer the same question. The choice depends on age, BCG, and whether coming back in 2–3 days is realistic.`,
      hook:`IGRA preferred after BCG and for people unlikely to return; TST suggested for healthy children under 5. [[Lewinsohn2017]]`})}
  Object.values(Q).forEach(e=>e.addEventListener('change',tree));
  redraws.tests=(()=>{const prv=redraws.tests;return()=>{prv&&prv();calc();tree()}})();
  tree();
};
