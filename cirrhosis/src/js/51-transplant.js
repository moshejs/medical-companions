/* =============== 5.1 Liver transplant =============== */
inits.transplant=()=>{
  const T=(x,y,s,c='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${s}</text>`;
  let donor='dd';
  const STEPS=[
    {from:0,at:.07,k:'Station 1',t:'Referral',
     txt:`Transplant helps most when the liver is sickest. Among 12,996 US waitlist candidates, a deceased donor transplant cut mortality risk by 79% overall (HR 0.21). But at MELD 6–11 and 12–14, recipients had higher first-year mortality than people still waiting (HR 3.64 and 2.35); at MELD 40 the risk was 96% lower. This is the evidence behind referral once MELD reaches the mid-teens. [[Merion2005]]`,
     pt:`A transplant is a big operation with its own risks. It is offered when the danger from the liver disease is greater than the danger of the surgery.`,
     hook:`Merion 2005: below MELD 15, transplant did not improve first-year survival (HR 3.64 at MELD 6–11). [[Merion2005]]`},
    {from:.15,at:.24,k:'Station 2',t:'Evaluation',
     txt:`The team looks at the whole person: liver function and scores, heart and kidneys, any liver cancer against the Milan criteria, strength and frailty, nutrition, and support at home. The Liver Frailty Index combines grip strength, chair stands and balance; added to MELD-Na it predicted 3-month waitlist death better (C-statistic 0.82 vs 0.80). For severe alcohol-associated hepatitis, ACG 2024 asks for rigorous psychosocial evaluation. Goals-of-care discussions should be prioritised too. [[Lai2017LFI,Mazzaferro1996Milan,Jophlin2024ACG,Rogal2022AASLD]]`,
     pt:`Many tests and conversations check that a transplant is safe and likely to work, and that the person has support afterwards.`,
     hook:`Liver Frailty Index = grip strength + chair stands + balance. [[Lai2017LFI]]`},
    {from:.32,at:.42,k:'Station 3',t:'The waiting list',
     txt:`In 2023, 24,492 US adults were on the list at some point and a record 13,954 were newly added. Of adults listed in 2018–2020, after 3 years 58.3% had received a deceased donor liver, 3.3% a living donor liver, 8.6% had died, 22.8% were removed for other reasons and 7.0% were still waiting. Pretransplant mortality fell from 16.9 to 12.9 deaths per 100 patient-years over the decade; it was highest for alcohol-associated hepatitis (29.4) and MASH (16.5). MELD 3.0 replaced MELD-Na for US allocation in July 2023. [[Kwong2025OPTN]]`,
     pt:`Waiting can take a long time, and not everyone reaches a transplant. The sickest people are offered livers first.`,
     hook:`US adults listed 2018–2020, at 3 years: 58.3% deceased donor LT, 3.3% living donor LT, 8.6% died. [[Kwong2025OPTN]]`},
    {from:.5,at:.6,k:'Station 4',t:'Surgery',
     txt:`The scarred liver is removed and the donor liver put in its place. The US performed 10,659 liver transplants in 2023 and 11,458 in 2024, both records. Living donors provided 5.7% of adult and 14.6% of paediatric transplants in 2023. Five-year graft survival was 75.6% for livers donated after circulatory death and 79.2% for brain-death donors. Press <b>Living donor</b> to switch. [[Kwong2025OPTN,Kwong2026SRTR]]`,
     pt:`The operation swaps the scarred liver for a healthy one, from a person who has died or from a living volunteer.`,
     hook:`Living donors: 5.7% of US adult and 14.6% of paediatric liver transplants (2023). [[Kwong2025OPTN]]`},
    {from:.66,at:.75,k:'Station 5',t:'Recovery and anti-rejection medicine',
     txt:`At discharge in 2023, 66.6% of recipients took tacrolimus + mycophenolate + steroids, 18.7% tacrolimus + mycophenolate and 4.4% tacrolimus + steroids. Acute rejection by 1 year was 20.2% at ages 18–34 and 7.9% at 65 or over. The tacrolimus label carries a boxed warning for serious infections and cancers. [[Kwong2025OPTN,FDA-Prograf]]`,
     pt:`After a transplant, people take medicines every day to stop the body rejecting the new liver, and have regular blood tests.`,
     hook:`Tacrolimus boxed warning: serious infections and malignancies; avoid grapefruit. [[FDA-Prograf]]`},
    {from:.82,at:.97,k:'Station 6',t:'Years later',
     txt:`For adult deceased donor recipients, 1-year survival was 92.0% for the graft and 93.5% for the patient (2024 report). For those transplanted in 2016–2018, 5-year graft survival ranged from 75.0% (65 and over) to 82.2% (35–49), and patient survival exceeded 75.1% in every age group. For adult living donor transplants, graft failure was 6.6% at 1 year, 21.2% at 5 years and 40.8% at 10 years. [[Kwong2026SRTR,Kwong2025OPTN]]`,
     pt:`In the US more than 9 in 10 adults are alive one year after a transplant, and about 3 in 4 or more at five years. These are averages for large groups, not a prediction for you.`,
     hook:`US 1-year patient survival after deceased donor LT: 93.5% (2024 report). [[Kwong2026SRTR]]`}];
  const NAMES=['Referral','Evaluation','Waiting list','Surgery','Recovery','Years later'];
  const svg=$('#txSvg'),rg=$('#txT');let setSt=()=>{};
  function draw(t){
    const N=vb(svg,'720 380','400 560');const p=phaseOf(STEPS,t),u=ramp(t,STEPS[p].from,Math.min(1,STEPS[p].at+.04));let s='';
    /* the path */
    const x0=N?36:60,x1=N?364:660,py=N?40:44,SX=i=>x0+(x1-x0)*i/5;
    s+=`<line x1="${x0}" x2="${x1}" y1="${py}" y2="${py}" style="stroke:var(--line);stroke-width:4;stroke-linecap:round"/>`;
    const pos=lerp(p,Math.min(5,p+1),0)+(p<5?ramp(t,STEPS[p].at,(STEPS[p+1]||{from:1}).from)*1:0);
    s+=`<line x1="${x0}" x2="${f1(SX(Math.min(5,pos)))}" y1="${py}" y2="${py}" style="stroke:var(--rx);stroke-width:4;stroke-linecap:round"/>`;
    NAMES.forEach((n,i)=>{const on=i<=p;s+=`<circle cx="${f1(SX(i))}" cy="${py}" r="${i===p?9:6}" style="fill:${on?'var(--rx)':'var(--panel)'};stroke:var(--rx);stroke-width:2"/>`+T(SX(i),py+(N?22:24),N?String(i+1):n,'t-xs t-mid',i===p?'fill:var(--ink);font-weight:700':'')});
    s+=person(SX(Math.min(5,pos))-6,py-30,18,'var(--ink)');
    if(N)s+=T(200,py+40,NAMES[p],'t-lbl t-mid');
    const R=N?{x:20,y:100,w:360,h:440}:{x:30,y:88,w:660,h:280};
    if(p===0){/* survival benefit by MELD band: diverging log bars around HR 1 */
      const D=[['MELD 6–11',3.64],['MELD 12–14',2.35],['MELD 18–20',.62],['MELD 40',.04]];
      const cx=N?R.x+R.w*.5:R.x+R.w*.5,sc=N?110:200,L=v=>cx+Math.log10(v)*sc,rowH=N?70:54,top=R.y+(N?70:50);
      s+=N?T(cx,R.y+8,'Risk of death in the first year:','t-sm t-mid','fill:var(--ink)')+T(cx,R.y+24,'recipients vs people still waiting','t-sm t-mid','fill:var(--ink)'):T(cx,R.y+8,'Risk of death in the first year: transplant recipients vs people still waiting','t-sm t-mid','fill:var(--ink)');
      s+=`<line x1="${cx}" x2="${cx}" y1="${top-14}" y2="${top+rowH*4}" style="stroke:var(--ink);stroke-width:1.5"/>`+T(cx,top+rowH*4+14,'HR 1: no difference','t-xs t-mid');
      s+=T(L(.04),top-18,'← transplant lowered risk','t-xs','fill:var(--rx)')+T(L(3.64)+10,top-18,'raised →','t-xs t-end','fill:var(--bad)');
      D.forEach(([n,v],i)=>{const y=top+i*rowH,g=ease(ramp(u,i*.15,i*.15+.45)),xe=lerp(cx,L(v),g),col=v>1?'var(--bad)':'var(--rx)';
        s+=`<rect x="${f1(Math.min(cx,xe))}" y="${y}" width="${f1(Math.abs(xe-cx))}" height="${N?26:30}" rx="4" style="fill:${col};opacity:.85"/>`;
        s+=T(v>1?cx-8:cx+8,y+(N?17:19),n,'t-sm'+(v>1?' t-end':''),'fill:var(--ink)');
        if(g>.9)s+=T(v>1?xe+6:xe-6,y+(N?17:19),'HR '+v,'t-sm'+(v>1?'':' t-end'),`fill:${col};font-weight:700`)});
    }else if(p===1){const items=[['Liver','scores: MELD 3.0 adds sex and albumin','var(--dx)'],['Cancer','Milan: 1 tumour ≤5 cm or ≤3 each ≤3 cm','var(--accent)'],['Strength','Liver Frailty Index: grip, chairs, balance','var(--rx)'],['Heart & kidneys','fit for a long operation?','var(--artery)'],['Mind & support','psychosocial assessment, family, carers','var(--nh3)'],['Goals of care','what matters most, palliative support','var(--portal)']];
      const cols=N?1:2,cw=N?R.w:R.w/2-10,ch=N?62:76;
      items.forEach(([a,b,c],i)=>{const g=ease(ramp(u,i*.1,i*.1+.35));if(g<=0)return;const cx=R.x+(i%cols)*(cw+20),cy=R.y+Math.floor(i/cols)*(ch+(N?8:10));
        s+=`<g style="opacity:${f1(g)}"><rect x="${f1(cx)}" y="${f1(cy)}" width="${f1(cw)}" height="${ch}" rx="10" style="fill:var(--panel);stroke:${c};stroke-width:1.6"/><circle cx="${f1(cx+22)}" cy="${f1(cy+ch/2)}" r="10" style="fill:${c}"/><path d="M${f1(cx+17)} ${f1(cy+ch/2)}l4 4l7 -8" style="fill:none;stroke:var(--panel);stroke-width:2.2"/>`+T(cx+42,cy+ch/2-4,a,'t-lbl')+T(cx+42,cy+ch/2+13,b,'t-xs')+'</g>'});
    }else if(p===2){const F=[[58,'var(--rx)','deceased donor liver 58.3%'],[3,'var(--good)','living donor liver 3.3%'],[9,'var(--bad)','died 8.6%'],[23,'var(--muted)','removed, other reasons 22.8%'],[7,'var(--bile)','still waiting 7.0%']];
      const n=Math.round(100*ease(u));const A=N?{x:56,y:R.y+40,dx:29,dy:25,s:20}:{x:R.x+10,y:R.y+30,dx:30,dy:24,s:19};
      s+=T(N?200:R.x+150,R.y+(N?18:12),'100 adults listed 2018–2020, after 3 years','t-sm t-mid','fill:var(--ink)');
      let k=0;const col=[];F.forEach(([c,cl])=>{for(let i=0;i<c;i++)col.push(cl)});
      for(let i=0;i<100;i++){const r=Math.floor(i/10),c=i%10;s+=person(A.x+c*A.dx,A.y+r*A.dy,A.s,i<n?col[i]:'var(--muted)',{op:i<n?1:.2})}
      const lx=N?40:R.x+340,ly=N?R.y+300:R.y+40;F.forEach(([c,cl,l],i)=>{s+=`<rect x="${lx}" y="${ly+i*24-10}" width="12" height="12" rx="3" style="fill:${cl}"/>`+T(lx+20,ly+i*24,l,'t-sm','fill:var(--ink)')});
      s+=T(lx,ly+5*24+12,'Pretransplant deaths: 12.9 per 100 patient-years','t-xs')+T(lx,ly+5*24+26,'(16.9 a decade earlier)','t-xs');
    }else if(p===3){const cx=N?200:R.x+200,cy=N?R.y+120:R.y+120,k=ease(u);
      const oldX=lerp(cx,cx-(N?150:220),ramp(k,0,.5)),newX=lerp(cx+(N?150:240),cx,ramp(k,.5,1));
      s+=`<ellipse cx="${cx}" cy="${cy}" rx="${N?100:110}" ry="${N?70:76}" style="fill:none;stroke:var(--line);stroke-width:2;stroke-dasharray:6 6"/>`+T(cx,cy+(N?92:98),'liver space','t-xs t-mid');
      s+=`<g style="opacity:${f1(1-ramp(k,.35,.55))}">`+liver(oldX,cy,N?.9:1,{fib:4,seed:2}).svg+T(oldX,cy-60,'scarred liver','t-xs t-mid')+'</g>';
      s+=`<g style="opacity:${f1(ramp(k,.45,.6))}">`+liver(newX,cy,N?.9:1,{fib:0,seed:5}).svg+T(newX,cy-60,'donor liver','t-xs t-mid','fill:var(--rx)')+'</g>';
      const dx=N?200:R.x+520,dy=N?R.y+230:R.y+30;
      if(donor==='dd'){s+=`<rect x="${dx-44}" y="${dy}" width="88" height="56" rx="8" style="fill:var(--portal-soft);stroke:var(--portal);stroke-width:1.6"/><rect x="${dx-30}" y="${dy-8}" width="60" height="10" rx="3" style="fill:var(--portal)"/>`+T(dx,dy+34,'organ box','t-xs t-mid','fill:var(--ink)')+T(dx,dy+76,'deceased donor','t-sm t-mid','fill:var(--ink);font-weight:700')+T(dx,dy+94,'5-y graft survival: 79.2% brain death,','t-xs t-mid')+T(dx,dy+108,'75.6% circulatory death','t-xs t-mid');}
      else{s+=person(dx-14,dy-6,46,'var(--rx)')+T(dx,dy+66,'living donor','t-sm t-mid','fill:var(--ink);font-weight:700')+T(dx,dy+84,'5.7% of adult, 14.6% of paediatric','t-xs t-mid')+T(dx,dy+98,'US liver transplants (2023)','t-xs t-mid')+T(dx,dy+112,'659 living donors, 7.5% paired','t-xs t-mid');}
      s+=T(N?200:R.x+520,N?R.y+380:R.y+200,'US liver transplants: 10,659 (2023), 11,458 (2024)','t-sm t-mid','fill:var(--ink)');
    }else if(p===4){const B=N?{x:40,y:R.y+30,w:300}:{x:R.x+20,y:R.y+30,w:360};
      s+=T(B.x,B.y-8,'Immunosuppression at discharge (2023)','t-sm','fill:var(--ink)');
      [['tacrolimus + mycophenolate + steroids',66.6],['tacrolimus + mycophenolate',18.7],['tacrolimus + steroids',4.4]].forEach(([n,v],i)=>{const y=B.y+10+i*44,w=B.w*v/100*ease(ramp(u,i*.12,i*.12+.5));s+=`<rect x="${B.x}" y="${y}" width="${B.w}" height="16" rx="4" style="fill:var(--panel-2)"/><rect x="${B.x}" y="${y}" width="${f1(w)}" height="16" rx="4" style="fill:var(--rx)"/>`+T(B.x,y+30,`${v}% ${n}`,'t-xs','fill:var(--ink)')});
      const rx=N?40:R.x+430,ry=N?R.y+190:R.y+30;s+=T(rx,ry-8,'Acute rejection by 1 year','t-sm','fill:var(--ink)');
      [['ages 18–34',20.2],['65 or over',7.9]].forEach(([n,v],i)=>{const y=ry+10+i*44,w=(N?300:200)*v/25*ease(ramp(u,.3+i*.1,.8));s+=`<rect x="${rx}" y="${y}" width="${f1(w)}" height="16" rx="4" style="fill:var(--accent)"/>`+T(rx,y+30,`${v}% ${n}`,'t-xs','fill:var(--ink)')});
      const pxp=N?200:R.x+560,pyp=N?R.y+330:R.y+190;s+=pill(pxp-30,pyp,44,{ang:-20,txt:'Tac'})+pill(pxp+30,pyp+6,40,{ang:15,round:true});s+=T(pxp,pyp+44,'daily, with blood-level checks','t-xs t-mid');
    }else{const C=N?{x:56,y:R.y+30,w:300,h:250}:{x:R.x+50,y:R.y+20,w:400,h:220};
      const X=y=>C.x+C.w*y/10,Y=v=>C.y+C.h-C.h*(v-50)/50;
      s+=`<rect x="${C.x}" y="${C.y}" width="${C.w}" height="${C.h}" style="fill:var(--field)"/>`;
      [50,60,70,80,90,100].forEach(v=>{s+=`<line x1="${C.x}" x2="${C.x+C.w}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/>`+T(C.x-5,Y(v)+3,v+'%','t-xs t-end')});
      [0,1,5,10].forEach(y=>{s+=T(X(y),C.y+C.h+15,y,'t-xs t-mid')});s+=T(C.x+C.w,C.y+C.h+30,'years after transplant','t-xs t-end');
      const yr=10*ease(u);
      const series=donor==='dd'?[{n:'patient',col:'var(--rx)',pts:[[0,100],[1,93.5],[5,75.1]],lab:['93.5%',N?'>75.1%, all ages':'over 75.1% in every age group'],dy:[-9,18]},{n:'graft',col:'var(--portal)',pts:[[0,100],[1,92.0],[5,78.6]],lab:['92.0%',N?'75.0–82.2%':'75.0–82.2% by age'],dy:[16,-14],band:[75.0,82.2]}]
        :[{n:'graft (living donor)',col:'var(--rx)',pts:[[0,100],[1,93.4],[5,78.8],[10,59.2]],lab:['failure 6.6%','failure 21.2%','failure 40.8%'],dy:[-9,-9,-9]}];
      series.forEach((S,si)=>{const last=S.pts[S.pts.length-1][0],up=Math.min(yr,last);let d='';const N2=60;
        const at=y=>{for(let i=1;i<S.pts.length;i++)if(y<=S.pts[i][0]){const a=S.pts[i-1],b=S.pts[i];return a[1]+(b[1]-a[1])*(y-a[0])/(b[0]-a[0])}return S.pts[S.pts.length-1][1]};
        for(let i=0;i<=N2;i++){const y=up*i/N2;d+=(i?'L':'M')+f1(X(y))+' '+f1(Y(at(y)))}
        if(up>0)s+=`<path d="${d}" style="fill:none;stroke:${S.col};stroke-width:2.6;stroke-linejoin:round"/>`;
        if(S.band&&yr>=5)s+=`<line x1="${f1(X(5))}" x2="${f1(X(5))}" y1="${f1(Y(S.band[1]))}" y2="${f1(Y(S.band[0]))}" style="stroke:${S.col};stroke-width:6;opacity:.35;stroke-linecap:round"/>`;
        S.pts.slice(1).forEach(([y,v],i)=>{if(yr<y-.01)return;s+=`<circle cx="${f1(X(y))}" cy="${f1(Y(v))}" r="5" style="fill:var(--panel);stroke:${S.col};stroke-width:2"/>`+T(X(y)+(y===10?-8:8),Y(v)+S.dy[i],S.lab[i],'t-xs'+(y===10?' t-end':''),`fill:${S.col};font-weight:700`)})});
      const lx=N?40:C.x+C.w+30,ly=N?C.y+C.h+54:C.y+20;
      series.forEach((S,i)=>{s+=`<rect x="${lx}" y="${ly+i*22-9}" width="14" height="4" rx="2" style="fill:${S.col}"/>`+T(lx+20,ly+i*22-3,S.n+' survival','t-sm','fill:var(--ink)')});
      s+=T(lx,ly+56,donor==='dd'?'Adult deceased donor recipients.':'Adult living donor recipients.','t-xs')+T(lx,ly+70,donor==='dd'?'1 year: 2024 report; 5 years:':'Survival drawn from published','t-xs')+T(lx,ly+84,donor==='dd'?'transplanted 2016–2018. The graft':'graft failure at 1, 5 and 10 years.','t-xs')+T(lx,ly+98,donor==='dd'?'line is drawn to the middle of':'','t-xs')+T(lx,ly+112,donor==='dd'?'the age range at 5 years.':'','t-xs');
    }
    svg.innerHTML=s;
    $('#txNote').innerHTML=noteHTML(STEPS[p]);setSt(p);
    $('#txRead').innerHTML=`<span>Station: <b>${p+1} of 6 · ${NAMES[p]}</b></span><span>Donor: <b>${donor==='dd'?'deceased':'living'}</b></span>`;
  }
  const stop=playWire(rg,$('#txPlay'),draw,26000,'Replay','transplant');
  setSt=stepWire($('#txSteps'),STEPS,rg,draw,stop);draw(+rg.value);
  $$('[data-txdonor]').forEach(b=>b.addEventListener('click',()=>{donor=b.dataset.txdonor;$$('[data-txdonor]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));

  /* ---------- MELD bands as icon arrays ---------- */
  const MB=[
    {v:1.9,lab:'1.9 in 100',win:'within 3 months',score:'MELD under 9',src:'3,437 US waitlist adults, 1999–2001',
     txt:`At MELD under 9, 1.9% died within 3 months. Overall, 12% of these 3,437 waitlist adults died within 3 months, and MELD (C-statistic 0.83) predicted it better than Child–Turcotte–Pugh (0.76), which supported MELD-based allocation of donor livers. [[Wiesner2003]]`,
     pt:`With a low score, very few people die while waiting over the next three months.`,hook:`Wiesner 2003: 3-month waitlist mortality 1.9% at MELD <9, 71.3% at MELD ≥40. [[Wiesner2003]]`},
    {v:6,lab:'6 in 100',win:'within 6 months',score:'MELD-Na 20',src:'sodium-adjusted MELD, Biggins 2006',
     txt:`Adding sodium to MELD: scores of 20, 30 and 40 matched 6%, 16% and 37% mortality at 6 months. A low blood sodium adds risk that MELD alone missed: applied to 2006 data, MELD-Na would have ranked 7% of the people who died considerably higher. [[Biggins2006MELDNa,Kim2008MELDNa]]`,
     pt:`Low blood salt (sodium) is a warning sign in cirrhosis, so it was added to the score.`},
    {v:16,lab:'16 in 100',win:'within 6 months',score:'MELD-Na 30',src:'sodium-adjusted MELD, Biggins 2006',
     txt:`At MELD-Na 30, 16% died within 6 months. MELD 3.0, adopted for US allocation in July 2023, adds female sex and albumin and caps creatinine at 3.0 mg/dL; it discriminated slightly better than MELD-Na (C-statistic 0.869 vs 0.862). [[Biggins2006MELDNa,Kim2021MELD3,Kwong2025OPTN]]`,
     pt:`The newer MELD 3.0 score was designed partly so women, who often score lower on creatinine, are not disadvantaged.`,hook:`MELD 3.0 = MELD-Na + female sex + albumin, creatinine capped at 3.0 mg/dL. [[Kim2021MELD3]]`},
    {v:37,lab:'37 in 100',win:'within 6 months',score:'MELD-Na 40',src:'sodium-adjusted MELD, Biggins 2006',
     txt:`At MELD-Na 40, 37% died within 6 months. At these scores transplant brings the largest survival benefit: at MELD 40 a deceased donor transplant lowered the risk of death by 96%. [[Biggins2006MELDNa,Merion2005]]`,
     pt:`The higher the score, the more urgent the transplant and the more it helps.`},
    {v:71.3,lab:'71.3 in 100',win:'within 3 months',score:'MELD 40 or more',src:'3,437 US waitlist adults, 1999–2001',
     txt:`At MELD 40 or more, 71.3% died within 3 months. MELD cannot accurately predict survival in about 15–20% of patients, which is one reason teams look beyond the number. [[Wiesner2003,Kamath2007MELD]]`,
     pt:`At the very highest scores most people die within a few months without a transplant.`,hook:`MELD misjudges survival in about 15–20% of patients. [[Kamath2007MELD]]`}];
  const ms=$('#txMeld');let cur=2,shown=MB[2].v,stopA=null;
  function drawM(val){
    const N=vb(ms,'720 270','400 420');const B=MB[cur];let s='';
    const A=N?{x:52,y:40,dx:30,dy:28,s:21}:{x:40,y:30,dx:30,dy:23,s:19};
    for(let i=0;i<100;i++){const r=Math.floor(i/10),c=i%10,fr=clamp(val-i);const x=A.x+c*A.dx,y=A.y+r*A.dy;
      s+=person(x,y,A.s,'var(--muted)',{op:.28});
      if(fr>0){const id='txc'+i;s+=fr<1?`<clipPath id="${id}"><rect x="${f1(x-A.s*.3)}" y="${f1(y)}" width="${f1(A.s*.6*fr)}" height="${A.s}"/></clipPath><g clip-path="url(#${id})">${person(x,y,A.s,'var(--bad)')}</g>`:person(x,y,A.s,'var(--bad)')}}
    const tx=N?200:560,ty=N?340:80;
    s+=T(tx,ty,B.score,'t-lbl t-mid')+T(tx,ty+(N?34:46),(Math.round(val*10)/10)+' in 100','t-big t-mid','fill:var(--bad);font-size:'+(N?26:32)+'px')+T(tx,ty+(N?52:70),'died '+B.win,'t-sm t-mid','fill:var(--ink)')+T(tx,ty+(N?68:92),B.src,'t-xs t-mid');
    ms.innerHTML=s;
  }
  function setM(i){cur=i;$$('[data-txm]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.txm===i));const from=shown,to=MB[i].v;stopA&&stopA();
    stopA=animate(900,p=>{shown=lerp(from,to,ease(p));drawM(shown)},()=>{shown=to;stopA=null});
    $('#txMeldNote').innerHTML=noteHTML({k:'Published band',t:`${MB[i].score}: ${MB[i].lab} ${MB[i].win}`,txt:MB[i].txt,pt:MB[i].pt,hook:MB[i].hook});
    $('#txMeldCap').innerHTML=`<b>Population statistics.</b> The 3-month figures (MELD) and 6-month figures (MELD-Na) come from different studies and are not directly comparable. A partly filled icon shows a fraction of a person. [[Wiesner2003,Biggins2006MELDNa]]`;}
  $$('[data-txm]').forEach(b=>b.addEventListener('click',()=>setM(+b.dataset.txm)));
  drawM(shown);setM(2);
  const prevR=redraws.transplant;redraws.transplant=()=>{prevR&&prevR();drawM(shown)};
};
