/* =============== 5.1 Advanced lung disease & transplant =============== */
/* Main scrubber: an illustrative FEV1 line falls past the CFF 2019 referral thresholds (50, 40, 30% predicted),
   then the lungs are replaced, the chart becomes the published post-transplant survival (US and Canada,
   2005-2016) and finally the fall in transplants in the ETI era. The FEV1 line is a drawing, not data; the
   thresholds, survival points and transplant numbers are from the research pass. Then a referral explainer
   (a teaching tool) and an icon array of outcomes after FEV1 <30%. */
inits.transplant=()=>{
  const svg=$('#txSvg'),rg=$('#txT'),pb=$('#txPlay'),note=$('#txNote'),stEl=$('#txSteps');
  const STEPS=[
    {from:0,at:.12,k:'FEV1 below 50%',t:'Start the conversation',
      txt:'The CFF 2019 referral guideline makes 21 recommendations. Recommendation 2: CF care teams should start a discussion about lung transplantation with everyone with CF and an FEV1 less than 50% predicted [[Ramos2019Referral]]. The guideline was built before ETI; how to time referral for people who respond partly to ETI is unsettled <span class="ev early">Open question</span> [[Ramos2019Referral,Merlo2025Transplant]].',
      pt:'Talking about lung transplant early does not mean things are hopeless. It is a normal part of planning ahead [[Ramos2019Referral]].',
      hook:'Discuss transplant at FEV1 <50% predicted (recommendation 2) [[Ramos2019Referral]].'},
    {from:.2,at:.34,k:'FEV1 below 40% and 30%',t:'Referral thresholds',
      txt:'For adults, the guideline says refer no later than when FEV1 is <50% and rapidly declining (&gt;20% relative decline in 12 months), <40% with markers of shortened survival, or <30% predicted. For children the thresholds are <50% and rapidly declining, <50% with markers, or <40% [[Ramos2019Referral]]. Among 3,340 US adults who reached FEV1 <30%, median transplant-free survival was 6.6 years; 37.4% died without a transplant and 28.5% had one (population statistics) [[Ramos2017FEV30]]. About 10% of US people with a stable FEV1 <30% die without transplant each year after reaching that point [[Ramos2019Referral]].',
      pt:'The lower the lung function goes, the sooner the guideline wants a transplant team involved, so there is time to assess and plan.',
      hook:'Adults: discuss <50%, refer by <40% with risk markers, refer by <30% in all cases. Children: refer by <40% [[Ramos2019Referral]].'},
    {from:.4,at:.52,k:'Listing and surgery',t:'Lung transplant',
      txt:'Listing is a transplant-centre decision; the guideline sets no FEV1 threshold for it [[Ramos2019Referral]]. Before deciding someone is not a candidate, it recommends consulting at least two transplant centres, and CF and transplant teams should talk at least every 6 months for candidates. B. cenocepacia, B. gladioli, B. dolosa, M. abscessus and Scedosporium may affect candidacy, depending on the centre [[Ramos2019Referral]]. Everyone being considered should be evaluated for NTM disease, and persistent M. abscessus or MAC is "not an absolute contraindication to lung transplant referral" [[Floto2016NTM]].',
      pt:'A lung transplant replaces the diseased lungs with donor lungs. Before listing, centres check for infections such as NTM, because some organisms can affect who is a candidate [[Ramos2019Referral,Floto2016NTM]].',
      hook:'B. cenocepacia (genomovar III) before transplant: highest 6-month mortality risk (5 of 12 deaths) [[Aris2001Bcc]].'},
    {from:.6,at:.74,k:'After transplant',t:'Survival after transplant',
      txt:'For CF lung transplants in 2005–2016, survival at 1, 3 and 5 years was 88.3%, 71.8% and 60.3% in the US (2,653 recipients) and 90.5%, 79.9% and 69.7% in Canada (470); people in the US were also more likely to die on the waitlist [[Stephenson2021Transplant]]. The CFF guideline quotes an ISHLT median post-transplant survival of 9.5 years among adults with CF [[Ramos2019Referral]]. These are registry population statistics, not predictions for any person.',
      pt:'Survival numbers after transplant come from large registries. They describe groups of people, not what will happen to any one person [[Stephenson2021Transplant]].',
      hook:'CF lung transplant, US 2005–2016: 5-year survival 60.3%; Canada 69.7% [[Stephenson2021Transplant]]. Median 9.5 years (ISHLT, as quoted) [[Ramos2019Referral]].'},
    {from:.8,at:.92,k:'The modulator era',t:'Fewer transplants',
      txt:'In US transplant registry data, new CF waitlistings fell 78% and CF lung transplants fell 72% in the ETI era compared with the pre-ETI modulator era, and waitlist removals for improving condition rose 18-fold [[Merlo2025Transplant]]. In France, first-time CF lung transplants fell from 13.4 to 1.8 per 1,000 non-transplanted people per year (2015–2019 versus 2020–2024), and a small group still needed a transplant [[Dhote2026Transplant]]. In the US, 29.3% of eligible recipients with CF were newly prescribed ETI after transplant [[Burdis2025ETILTx]].',
      pt:'Since the newest CFTR modulators arrived, far fewer people with CF have needed new lungs. Some still do, and the referral guidance still applies to them.',
      hook:'ETI era (US): CF lung transplants −72%, waitlistings −78% [[Merlo2025Transplant]]. France: 13.4 → 1.8 per 1,000 per year [[Dhote2026Transplant]].'}];
  const setA=stepWire(stEl,STEPS,rg,draw,()=>stop());
  const FEV=monoFn([[0,78],[2,70],[4,59],[5,53],[6,47],[7,41],[8,35],[9,29],[10,26]]);
  const US=monoFn([[0,100],[1,88.3],[3,71.8],[5,60.3]]),CA=monoFn([[0,100],[1,90.5],[3,79.9],[5,69.7]]);
  function draw(t){const N=vb(svg,'720 380','400 640'),p=phaseOf(STEPS,t);setA(p);note.innerHTML=noteHTML(STEPS[p]);
    const C=N?{x:46,y:58,w:330,h:230}:{x:56,y:58,w:400,h:270};
    const LG=N?{x:200,y:480,s:.92}:{x:590,y:196,s:1};
    let s=`<text x="${N?14:20}" y="26" class="t-big">${STEPS[p].t}</text>`;
    const fA=1-ramp(t,.6,.66),fB=ramp(t,.62,.68)*(1-ramp(t,.8,.86)),fC=ramp(t,.82,.88);
    /* panel A: FEV1 over time with the thresholds */
    if(fA>.01){const up=10*ramp(t,.02,.4),cv=curve(C.x,C.y,C.w,C.h,FEV,{x0:0,x1:10,y0:0,y1:100,upto:Math.max(.01,up),col:'var(--dx)',dot:true});
      let a=cv.svg;const cur=FEV(Math.max(.01,up));
      [[50,'discuss transplant',0],[40,'refer, with risk markers',1],[30,'refer (adults)',2]].forEach(([v,l,i])=>{const yy=cv.Y(v),on=cur<v;
        a+=`<line x1="${C.x}" x2="${C.x+C.w}" y1="${f1(yy)}" y2="${f1(yy)}" style="stroke:${on?'var(--rec)':'var(--line)'};stroke-width:${on?2:1.2};stroke-dasharray:6 4"/>`;
        a+=`<text x="${C.x-6}" y="${f1(yy+4)}" class="t-sm t-end" style="fill:var(--ink)">${v}%</text><text x="${C.x+6}" y="${f1(yy-5)}" class="t-sm" style="fill:${on?'var(--rec)':'var(--muted)'};font-weight:${on?700:500}">${on?'✓ ':''}${l}</text>`});
      for(let v=0;v<=100;v+=25)if(![25,50].includes(v))a+=`<text x="${C.x-6}" y="${f1(cv.Y(v)+4)}" class="t-xs t-end">${v}</text>`;
      a+=`<text x="${C.x}" y="${C.y-10}" class="t-sm" style="fill:var(--ink)">FEV1 % predicted · illustrative line, not data</text><text x="${C.x+C.w}" y="${C.y+C.h+18}" class="t-xs t-end">years (schematic)</text>`;
      if(up>.3){const[px,py]=cv.at(up);a+=`<text x="${f1(Math.min(px+8,C.x+C.w-40))}" y="${f1(py-10)}" class="t-lbl" style="fill:var(--dx)">${Math.round(cur)}%</text>`}
      if(t>=.4){const tx=cv.X(9.6),o=ramp(t,.42,.5);a+=`<line x1="${f1(tx)}" x2="${f1(tx)}" y1="${C.y}" y2="${C.y+C.h}" style="stroke:var(--rec);stroke-width:2.4;opacity:${f1(o)}"/><text x="${f1(tx-4)}" y="${C.y+14}" class="t-sm t-end" style="fill:var(--rec);font-weight:700;opacity:${f1(o)}">transplant</text>`}
      s+=`<g style="opacity:${f1(fA)}">${a}</g>`}
    /* panel B: post-transplant survival */
    if(fB>.01){const u=5*ramp(t,.64,.76);const c1=curve(C.x,C.y,C.w,C.h,CA,{x0:0,x1:5,y0:0,y1:100,upto:Math.max(.01,u),col:'var(--rec)',dot:true}),c2=curve(C.x,C.y,C.w,C.h,US,{x0:0,x1:5,y0:0,y1:100,upto:Math.max(.01,u),col:'var(--dx)',dot:true});
      let b=c1.svg+c2.svg.replace(/<rect[^>]*var\(--field\)[^>]*\/>/,'');
      for(let v=0;v<=100;v+=25)b+=`<text x="${C.x-6}" y="${f1(c1.Y(v)+4)}" class="t-xs t-end">${v}%</text>`;
      for(let y=0;y<=5;y++)b+=`<text x="${f1(c1.X(y))}" y="${C.y+C.h+14}" class="t-xs t-mid">${y}</text>`;
      b+=`<text x="${C.x+C.w}" y="${C.y+C.h+28}" class="t-xs t-end">years after transplant</text><text x="${N?14:C.x}" y="${C.y-10}" class="t-sm" style="fill:var(--ink)">Alive after a CF lung transplant, 2005–2016 (registry)</text>`;
      [[1,88.3,90.5],[3,71.8,79.9],[5,60.3,69.7]].forEach(([yr,us,ca])=>{if(u>=yr-.02){b+=`<text x="${f1(c1.X(yr)-(yr===5?4:-4))}" y="${f1(c2.Y(us)+16)}" class="t-sm${yr===5?' t-end':''}" style="fill:var(--dx);font-weight:700">${us}%</text><text x="${f1(c1.X(yr)-(yr===5?4:-4))}" y="${f1(c1.Y(ca)-8)}" class="t-sm${yr===5?' t-end':''}" style="fill:var(--rec);font-weight:700">${ca}%</text>`}});
      b+=`<rect x="${C.x+10}" y="${f1(c1.Y(18)-10)}" width="10" height="4" style="fill:var(--rec)"/><text x="${C.x+26}" y="${f1(c1.Y(18)-5)}" class="t-sm" style="fill:var(--ink)">Canada (470)</text><rect x="${C.x+10}" y="${f1(c1.Y(18)+6)}" width="10" height="4" style="fill:var(--dx)"/><text x="${C.x+26}" y="${f1(c1.Y(18)+11)}" class="t-sm" style="fill:var(--ink)">US (2,653)</text>`;
      s+=`<g style="opacity:${f1(fB)}">${b}</g>`}
    /* panel C: transplant numbers in the ETI era */
    if(fC>.01){const g=ramp(t,.84,.94);let c=`<text x="${N?14:C.x}" y="${C.y-10}" class="t-sm" style="fill:var(--ink)">First CF lung transplants, France, per 1,000/year</text>`;
      const bw=C.w*.28,base=C.y+C.h*.62,H=C.h*.5,sc=H/13.4;
      [['2015–2019',13.4,'var(--muted)'],['2020–2024',lerp(13.4,1.8,g),'var(--rec)']].forEach(([l,v,col],i)=>{const bx=C.x+20+i*(bw+40);c+=`<rect x="${f1(bx)}" y="${f1(base-v*sc)}" width="${f1(bw)}" height="${f1(v*sc)}" rx="4" style="fill:${col}"/><text x="${f1(bx+bw/2)}" y="${f1(base-v*sc-6)}" class="t-lbl t-mid" style="opacity:${f1(i?ramp(g,.7,1):1)}">${i?'1.8':'13.4'}</text><text x="${f1(bx+bw/2)}" y="${f1(base+16)}" class="t-sm t-mid" style="fill:var(--ink)">${l}</text>`});
      c+=`<text x="${C.x+20}" y="${f1(base+36)}" class="t-sm" style="fill:var(--ink);opacity:${f1(g)}">A small group still needed a transplant.</text>`;
      const ux=N?C.x:C.x+C.w+40,uy=N?base+64:C.y+30;
      c+=`<text x="${ux}" y="${uy}" class="t-sm" style="fill:var(--ink)">US, ETI era vs before:</text>`;
      [['transplants',-72],['waitlistings',-78]].forEach(([l,v],i)=>{const yy=uy+(N?24:30)+i*(N?36:52);c+=`<text x="${ux+(N?0:0)}" y="${yy+(N?0:6)}" class="t-big" style="font-size:${N?22:28}px;fill:var(--rec);opacity:${f1(ramp(g,.3,1))}">−${-v}%</text><text x="${ux+(N?70:84)}" y="${yy}" class="t-sm" style="fill:var(--ink)">${l}</text>`});
      if(!N)c+=`<text x="${ux}" y="${uy+150}" class="t-sm" style="fill:var(--ink)">removals for improving</text><text x="${ux}" y="${uy+164}" class="t-sm" style="fill:var(--ink)">condition: 18-fold</text>`;
      s+=`<g style="opacity:${f1(fC)}">${c}</g>`}
    /* the lungs: worsening, then replaced */
    const sick=ramp(t,.02,.4),swap=ramp(t,.44,.54);
    if(!N||true){const lab=N?LG.y-LG.s*112:LG.y-LG.s*114;
      const lo=N?1:1-fC;s+=`<g style="opacity:${f1((1-swap)*lo)}">${lungs(LG.x,LG.y,LG.s,{bx:sick,plugs:sick,inflam:sick*.8,id:'txOld'}).svg}</g>`;
      if(swap>.01)s+=`<g style="opacity:${f1(swap*lo)}">${lungs(LG.x,LG.y,LG.s,{id:'txNew'}).svg}</g>`;
      if(lo>.02)s+=`<text x="${LG.x}" y="${f1(lab)}" class="t-sm t-mid" style="fill:var(--ink);font-weight:700;opacity:${f1(lo)}">${swap>.5?'donor lungs (schematic)':sick>.5?'advanced lung disease':'lungs with CF'}</text>`;
      if(swap>.05&&swap<.95)s+=`<text x="${LG.x}" y="${f1(LG.y+LG.s*112)}" class="t-sm t-mid" style="fill:var(--rec);font-weight:700">lung transplant</text>`}
    svg.innerHTML=s}
  const stop=playWire(rg,pb,draw,16000,'Replay','transplant');
  draw(+rg.value);

  /* ---------- referral explainer (teaching tool) ---------- */
  const age=$('#txAge'),fev=$('#txFev'),fevO=$('#txFevO'),out=$('#txOut'),why=$('#txWhy'),lad=$('#txLad');
  const ck=id=>$('#'+id).checked;
  function calc(){const f=+fev.value,adult=age.value==='adult';fevO.textContent=f+'%';
    const anyAny=['txWalk','txHypox','txHyperc','txPH'].some(ck),mk=['txBmi','txExac','txHaem','txPtx'].some(ck),rap=ck('txRapid');
    const lines=[];let refer=false;
    if(anyAny){refer=true;lines.push('A marker that prompts referral regardless of FEV1 is ticked: 6-minute walk &lt;400 m, hypoxaemia, hypercarbia (PaCO2 &gt;50 mmHg) or pulmonary hypertension [[Ramos2019Referral]].')}
    if(adult){if(f<30){refer=true;lines.push('Adults: refer no later than FEV1 &lt;30% predicted [[Ramos2019Referral]].')}
      if(f<40&&mk){refer=true;lines.push('Adults: FEV1 &lt;40% with markers of shortened survival [[Ramos2019Referral]].')}
      if(f<50&&rap){refer=true;lines.push('Adults: FEV1 &lt;50% and rapidly declining (&gt;20% relative decline in 12 months) [[Ramos2019Referral]].')}}
    else{if(f<40){refer=true;lines.push('Children: refer no later than FEV1 &lt;40% predicted [[Ramos2019Referral]].')}
      if(f<50&&(rap||mk)){refer=true;lines.push('Children: FEV1 &lt;50% and rapidly declining, or &lt;50% with markers of shortened survival [[Ramos2019Referral]].')}}
    if(f<50)lines.push('FEV1 &lt;50%: the guideline recommends starting a discussion about transplantation (recommendation 2) [[Ramos2019Referral]].');
    if(ck('txSpecial'))lines.push('The guideline advises special consideration for referral for women, especially younger women, and people shorter than 162 cm, even when other thresholds are not met [[Ramos2019Referral]].');
    if(mk&&f>=40&&adult)lines.push('The risk markers ticked are listed for FEV1 &lt;40% in adults; at this FEV1 they do not by themselves meet an adult threshold.');
    out.className='verdict '+(refer?'yes':f<50||ck('txSpecial')?'maybe':'no');
    out.textContent=refer?'A referral threshold in the guideline is met by these inputs':f<50?'The guideline says: start the transplant conversation':ck('txSpecial')?'No threshold met; the guideline asks for special consideration':'No guideline trigger among these inputs';
    why.innerHTML=lines.length?lines.map(l=>`<li>${l}</li>`).join(''):'<li>None of the 2019 thresholds or markers is met by these inputs.</li>';
    /* the ladder */
    const N=vb(lad,'720 96','400 110'),x0=N?16:20,w=N?368:680,X=v=>x0+w*v/100;let s=`<rect x="${x0}" y="34" width="${w}" height="18" rx="9" style="fill:var(--panel-2)"/>`;
    const th=adult?[[50,'discuss'],[40,'+ markers'],[30,'refer']]:[[50,'discuss'],[40,'refer']];
    s+=`<rect x="${x0}" y="34" width="${f1(X(50)-x0)}" height="18" rx="9" style="fill:var(--rec);opacity:.18"/>`;
    th.forEach(([v,l],i)=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="28" y2="58" style="stroke:var(--rec);stroke-width:2"/><text x="${f1(X(v))}" y="${N?(i%2?82:72):72}" class="t-xs t-mid" style="fill:var(--ink)">${v}%</text>${N?'':`<text x="${f1(X(v))}" y="86" class="t-xs t-mid">${l}</text>`}`});
    s+=`<path d="M${f1(X(f))} 30l-7 -12h14z" style="fill:var(--ink)"/><text x="${f1(clamp(X(f),x0+30,x0+w-30))}" y="14" class="t-sm t-mid" style="fill:var(--ink);font-weight:700">FEV1 ${f}%</text>`;
    s+=`<text x="${x0}" y="${N?104:72}" class="t-xs">${N?(adult?'adult':'child')+' thresholds, CFF 2019':''}</text>`;
    lad.innerHTML=s}
  $$('#m-transplant .calc input,#m-transplant .calc select').forEach(e=>e.addEventListener(e.type==='range'?'input':'change',calc));calc();

  /* ---------- after FEV1 <30%: 100 people ---------- */
  const ia=$('#txIcons');
  function iaDraw(){const N=vb(ia,'720 150','400 250');const G=[[37,'var(--bad)','died without a transplant (37.4%)'],[29,'var(--rec)','had a transplant (28.5%)'],[28,'var(--dx)','alive without a transplant (27.5%)'],[6,'var(--muted)','lost to follow-up (6.6%)']];
    let s='',k=0;const cols=N?20:25,sz=N?15:16,gp=N?3.4:4;
    G.forEach(([n,col])=>{for(let i=0;i<n;i++,k++){const x=10+(k%cols)*(sz+gp),y=10+Math.floor(k/cols)*(sz+gp*1.6);s+=person(x+sz/2,y,sz,col)}});
    const lx=N?10:530,ly=N?132:24;G.forEach(([n,col,l],i)=>{s+=`<rect x="${lx}" y="${ly+i*(N?26:30)}" width="12" height="12" rx="3" style="fill:${col}"/><text x="${lx+18}" y="${ly+i*(N?26:30)+10}" class="t-sm" style="fill:var(--ink)">${l}</text>`});
    ia.innerHTML=s}
  iaDraw();
  redraws.transplant=(prev=>()=>{prev&&prev();calc();iaDraw()})(redraws.transplant);
};
