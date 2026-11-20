/* =============== 4.2 Pregnancy & fertility =============== */
/* Main player: a preconception-to-postpartum timeline. Risk lamps light as the marker reaches the stage where each
   risk is usually discussed (placement schematic; the odds ratios are published), and a chart below fills the IOM 2009
   gestational weight gain range for the chosen pre-pregnancy BMI class (only the end-of-pregnancy totals are published;
   the straight path to them is schematic). */
const PG_STAGE=[{a:0,b:.16,n:'Before pregnancy',s:'Pre'},{a:.16,b:.38,n:'Trimester 1',s:'T1'},{a:.38,b:.58,n:'Trimester 2',s:'T2'},{a:.58,b:.78,n:'Trimester 3',s:'T3'},{a:.78,b:.84,n:'Birth',s:'Birth'},{a:.84,b:1,n:'After the birth',s:'After'}];
const PG_LAMP=[
 {t:.05,n:'Longer time to conceive',v:'OR 1.32 per BMI group'},
 {t:.2,n:'Neural tube defects',v:'OR 1.87'},
 {t:.27,n:'Early pregnancy loss',v:'higher risk'},
 {t:.43,n:'Gestational diabetes',v:'OR 3.56; severe 8.56'},
 {t:.61,n:'Pre-eclampsia',v:'~2× per 5–7 BMI units'},
 {t:.69,n:'Stillbirth',v:'RR 1.24 per 5 BMI units'},
 {t:.79,n:'Caesarean birth',v:'OR 2.26; BMI >35: 3.38'},
 {t:.815,n:'Shoulder dystocia, bleeding',v:'higher risk'},
 {t:.87,n:'Clots, low mood, feeding',v:'higher risk'},
 {t:.95,n:'Obesity in the child later',v:'OR 3.64'}
];
const PG_GWG=[{b:'BMI under 18.5',lo:12.5,hi:18},{b:'BMI 18.5 to 24.9',lo:11.5,hi:16},{b:'BMI 25 to 29.9',lo:7,hi:11},{b:'BMI 30 or more',lo:5,hi:9}];
const PG_STEPS=[
 {from:0,at:.06,k:'Before pregnancy',t:'Fertility and planning',
  txt:'Obesity is the most common medical condition in women of reproductive age. [[ACOG2021PB230,Catalano2017]] It reduces fertility and increases the time taken to conceive. [[Poston2016]] In 47,835 Danish couples, each step up in BMI group raised the odds of taking more than 12 months to conceive (OR 1.32 per group in women, 1.19 in men). [[RamlauHansen2007]] ACOG recommends that obesity management begin before pregnancy and continue through the postpartum period. [[ACOG2021PB230]]',
  pt:'Planning ahead helps: a check-up before pregnancy is a good time to talk about vitamins, any weight medicines and other health conditions.',
  hook:'Wegovy label: stop at least 2 months before a planned pregnancy. [[FDA-Wegovy]]'},
 {from:.16,at:.22,k:'Weeks 0 to 13',t:'The first trimester',
  txt:'Compared with mothers of recommended BMI, mothers with obesity had higher odds of neural tube defects (OR 1.87, 95% CI 1.62 to 2.15), spina bifida (2.24), cardiovascular anomalies (1.30) and hydrocephaly (1.68); gastroschisis was less common (OR 0.17). The authors note that the absolute increase in anomalies is likely small. [[Stothard2009]] Early pregnancy loss is also more likely. [[Poston2016]]',
  pt:'A few birth differences are a little more common at a higher weight. The extra risk for any one pregnancy is small.',
  hook:'Maternal obesity and neural tube defects: OR 1.87; gastroschisis less common (OR 0.17). [[Stothard2009]]'},
 {from:.38,at:.45,k:'Weeks 14 to 27',t:'Gestational diabetes',
  txt:'Compared with normal weight, the unadjusted odds of gestational diabetes were 2.14 with overweight, 3.56 with obesity and 8.56 with severe obesity. [[Chu2007]] Proposed mechanisms include higher insulin resistance, hyperinsulinaemia, inflammation and oxidative stress before pregnancy, which may affect early placental and fetal development. <span class="ev early">Early evidence</span> [[Catalano2017]]',
  pt:'Diabetes that starts in pregnancy is more common at a higher weight. Regular checks help find it early so it can be treated.',
  hook:'Gestational diabetes ORs: 2.14 overweight, 3.56 obesity, 8.56 severe obesity. [[Chu2007]]'},
 {from:.58,at:.66,k:'Weeks 28 to 40',t:'Pre-eclampsia and stillbirth',
  txt:'In 13 cohorts of nearly 1.4 million women, pre-eclampsia risk typically doubled with each 5 to 7 kg/m² rise in pre-pregnancy BMI. [[OBrien2003]] Each 5-unit rise in BMI was associated with a relative risk of 1.24 for stillbirth; absolute stillbirth risk was 40 per 10,000 pregnancies at BMI 20, 48 at BMI 25 and 59 at BMI 30. [[Aune2014]] These are population statistics.',
  pt:'High blood pressure in pregnancy is more common at a higher weight. Most pregnancies still go well; check-ups catch problems early.',
  hook:'Pre-eclampsia risk roughly doubles with each 5 to 7 kg/m² rise in pre-pregnancy BMI. [[OBrien2003]]'},
 {from:.78,at:.8,k:'Birth',t:'Birth',
  txt:'Compared with BMI 20 to 25, the crude odds of caesarean delivery in first pregnancies were 1.53 for overweight, 2.26 for BMI 30 to 35 and 3.38 for BMI over 35. [[Poobalan2009]] Shoulder dystocia and post-partum haemorrhage are also more likely. [[Poston2016]] A review of 22 systematic reviews found more instrumental and caesarean births and surgical site infection. [[Marchi2015]]',
  pt:'A caesarean birth is more likely at a higher weight. The care team plans for this, including the right equipment.',
  hook:'Caesarean odds (first births) vs BMI 20 to 25: 1.53, 2.26 and 3.38 with rising BMI. [[Poobalan2009]]'},
 {from:.84,at:.9,k:'After the birth',t:'Postpartum and beyond',
  txt:'After birth, risks include venous thromboembolism, depression and difficulty breastfeeding. [[Catalano2017]] Breastfeeding initiation is lower and stopping earlier. [[Marchi2015]] Maternal obesity before conception was associated with obesity in the child (OR 3.64, 95% CI 2.68 to 4.95). [[Heslehurst2019]] Weight kept on after the birth raises later cardiometabolic risk. [[Catalano2017]]',
  pt:'After the birth, support with feeding, mood and recovery matters. Ask for help early; it is part of good care.',
  hook:'Postpartum: VTE, depression and breastfeeding difficulty are more likely. [[Catalano2017]]'}
];
/* planning cards */
const PG_CARDS=[
 {b:'Semaglutide (Wegovy)',ax:{a:-6,b:9,step:3,u:'months relative to a planned conception'},
  bars:[{r:0,a:-6,b:-2,col:'var(--rx-drug)',l:'on semaglutide'},{r:0,a:-2,b:0,col:'var(--warn)',l:'2 months off',out:1}],
  marks:[{at:0,l:'planned conception'}],
  k:'Label statement, quoted',t:'Stop at least 2 months before',
  txt:'The Wegovy label: “discontinue WEGOVY in patients at least 2 months before they plan to become pregnant to account for the long half-life of semaglutide”. It also says to stop when pregnancy is recognised: weight loss offers no benefit in pregnancy and may cause fetal harm, and semaglutide caused embryofetal harm in animal studies. [[FDA-Wegovy]] In early-pregnancy data from mothers with type 2 diabetes (938 exposed infants), the adjusted RR for major malformations vs insulin was 0.95 (95% CI 0.72 to 1.26), reassuring but imprecise. <span class="ev early">Early evidence</span> [[Cesta2024Pregnancy]]'},
 {b:'Tirzepatide (Zepbound)',ax:{a:0,b:24,step:4,u:'weeks after starting'},
  bars:[{r:0,a:0,b:4,col:'var(--rx-drug)',l:'2.5 mg',op:.45},{r:0,a:4,b:8,col:'var(--rx-drug)',l:'5',op:.6},{r:0,a:8,b:12,col:'var(--rx-drug)',l:'7.5',op:.8},{r:0,a:12,b:24,col:'var(--rx-drug)',l:'10 mg maintenance'},
        {r:1,a:0,b:4,col:'var(--warn)',l:'4 wk',out:1},{r:1,a:4,b:8,col:'var(--warn)',l:'4 wk',out:1},{r:1,a:8,b:12,col:'var(--warn)',l:'4 wk',out:1},{r:1,a:12,b:16,col:'var(--warn)',l:'4 wk',out:1}],
  rows:['dose (one possible path)','backup method windows'],marks:[],
  k:'Label statement, quoted',t:'Pills may work less well: a backup method',
  txt:'Zepbound may reduce the efficacy of oral hormonal contraceptives. The label advises switching to a non-oral method, or adding a barrier method for 4 weeks after starting and for 4 weeks after each dose escalation. It also advises that weight loss is not recommended during pregnancy and to stop Zepbound when a pregnancy is recognised. [[FDA-Zepbound]] The doses drawn follow the label’s start of 2.5 mg for 4 weeks and 2.5 mg steps at least 4 weeks apart, here ending at 10 mg; real schedules vary. [[FDA-Zepbound]]'},
 {b:'Phentermine-topiramate (Qsymia)',ax:{a:0,b:6,step:1,u:'months on treatment'},
  bars:[{r:0,a:0,b:6,col:'var(--rx-drug)',l:'on treatment'}],marks:[0,1,2,3,4,5,6].map(m=>({at:m,l:m?'':'test',tick:1})),
  rows:['pregnancy test before start, then monthly'],
  k:'Label statement',t:'Contraindicated in pregnancy',
  txt:'Qsymia is contraindicated in pregnancy: first-trimester topiramate exposure raises the risk of major malformations, including oral clefts. A negative pregnancy test is advised before starting and monthly during treatment, and it is dispensed only through a REMS programme of certified pharmacies. [[FDA-Qsymia]] Contrave, Xenical and Saxenda labels say to stop when pregnancy is recognised. [[FDA-Contrave,FDA-Xenical,FDA-Saxenda]]'},
 {b:'After bariatric surgery',ax:{a:-3,b:30,step:6,u:'months after surgery'},
  bars:[{r:0,a:0,b:12,col:'var(--life)',l:'typically about 1 year',op:.75},{r:1,a:0,b:24,col:'var(--life)',l:'typically about 2 years',op:.75}],
  rows:['sleeve or bypass','band'],marks:[{at:-2,l:'contraception counselling'},{at:0,l:'surgery'}],
  k:'2019 international consensus',t:'Wait until weight is stable',
  txt:'The 2019 consensus advises postponing pregnancy until weight is stable, typically about 1 year after sleeve or bypass and 2 years after a band. [[Shawe2019ObesRev]] It notes that studies found no clear difference in outcomes by surgery-to-conception interval and that many recommendations lack high-quality evidence. [[Shawe2019ObesRev]] It advises contraceptive counselling before surgery, avoiding combined oral contraceptives and encouraging long-acting reversible contraception. [[Shawe2019ObesRev]]'},
 {b:'Vitamins after surgery',ax:{a:-12,b:40,step:13,u:'weeks of pregnancy (before 0: planning)',fmt:v=>v===-12?'':v},
  bars:[{r:0,a:-12,b:40,col:'var(--gold)',l:'consensus multivitamin, incl. folic acid 5 mg',op:.55}],
  rows:['supplement','blood tests each trimester'],marks:[{at:8,l:'',tick:1,r:1},{at:20,l:'',tick:1,r:1},{at:33,l:'',tick:1,r:1}],
  k:'2019 international consensus, as published',t:'Supplements and checks',
  txt:'After bariatric surgery, the consensus lists a minimum preconception multivitamin content including folic acid 5 mg, iron 45 to 60 mg, thiamine over 12 mg and vitamin A as beta-carotene 5000 IU, because the retinol form is teratogenic. It advises checking blood count, ferritin, folate, B12 and vitamin A every trimester. [[Shawe2019ObesRev]] Quoted as published, not as instructions. Use of 5 mg folic acid supplements is low: in Northern Ireland booking data (255,117 pregnancies) it rose only from 3.6% to 5.0% between 2015 and 2020, and most folic acid use started after conception. [[Cassinelli2026]]'},
 {b:'PCOS',pcos:1,
  k:'Polycystic ovary syndrome',t:'A common link with weight and fertility',
  txt:'Women with PCOS had a higher prevalence of obesity than women without it (RR 2.77, 95% CI 1.88 to 4.10) and of central obesity (RR 1.73). [[Lim2012PCOS]] The 2023 international PCOS guideline recognises its metabolic and cardiovascular features and a high risk of adverse pregnancy outcomes, recommends a healthy lifestyle with “awareness and consideration of weight stigma”, and calls for cheaper and safer fertility management. [[Teede2024PCOS]] An estimated 25% of ovulatory infertility in US women may be attributable to BMI 25 or more. [[RichEdwards2002]]'}
];
const PG_OUT=[
 {b:'Swedish register (Johansson 2015)',h:'670 pregnancies after surgery (filled) vs matched controls (outline), %',max:25,pair:1,
  rows:[{n:'Gestational diabetes',v:1.9,w:6.8},{n:'Large for gestational age',v:8.6,w:22.4},{n:'Small for gestational age',v:15.6,w:7.6},{n:'Stillbirth or neonatal death',v:1.7,w:.7}],
  k:'Johansson 2015',t:'Fewer large babies, more small ones',
  txt:'Compared with matched controls, gestational diabetes was lower (1.9% vs 6.8%, OR 0.25) and large-for-gestational-age babies fewer (8.6% vs 22.4%), but small-for-gestational-age babies were more common (15.6% vs 7.6%, OR 2.20). Stillbirth or neonatal death was 1.7% vs 0.7%, a non-significant difference (OR 2.39, 95% CI 0.98 to 5.85). [[Johansson2015NEJM]]'},
 {b:'Meta-analysis (Akhter 2019)',h:'Odds ratios after surgery vs no surgery (line at 1 = no difference)',max:3,or:1,
  rows:[{n:'Perinatal death',v:1.38},{n:'Congenital anomalies',v:1.29},{n:'Preterm birth',v:1.57},{n:'NICU admission',v:1.41},{n:'SGA, after bypass',v:2.72},{n:'LGA, after bypass',v:.24}],
  k:'33 studies, 14,880 pregnancies after surgery',t:'Higher odds of some problems, lower of others',
  txt:'Pregnancies after bariatric surgery had higher odds of perinatal death (OR 1.38), congenital anomalies (1.29), preterm birth (1.57) and NICU admission (1.41); after gastric bypass, small-for-gestational-age babies rose (OR 2.72) and large ones fell (OR 0.24). Babies weighed on average 242 g less. [[Akhter2019PLoSMed]] The status is counselling and nutritional monitoring. [[Johansson2015NEJM,Shawe2019ObesRev]]'}
];

inits.pregnancy=()=>{
  /* ---------- timeline player ---------- */
  const svg=$('#pgSvg'),rg=$('#pgT'),note=$('#pgNote'),gb=$('#pgGwgBtns');let setA=null,gi=3;
  gb.innerHTML=PG_GWG.map((c,i)=>`<button class="btn" data-gw="${i}" aria-pressed="${i===gi}">${c.b}</button>`).join('');
  function draw(t){
    const N=vb(svg,'720 400','400 660');
    const L=N?{tx:20,tw:360,ty:58,ry:106,rh:26,rx:24,rw:356,cx:52,cy:430,cw:318,ch:170}
             :{tx:40,tw:640,ty:58,ry:116,rh:27,rx:20,rw:344,cx:426,cy:136,cw:270,ch:196};
    const TX=u=>L.tx+L.tw*u;let g='';
    /* track */
    PG_STAGE.forEach((s,i)=>{const a=TX(s.a),b=TX(s.b),on=t>=s.a&&t<s.b+(i===5?.01:0);
      g+=`<rect x="${f1(a+1)}" y="${L.ty-7}" width="${f1(b-a-2)}" height="14" rx="5" style="fill:${on?'var(--life)':'var(--panel-2)'};stroke:var(--line)"/>`;
      g+=`<text x="${f1((a+b)/2)}" y="${L.ty-14}" class="t-xs t-mid" style="fill:var(--ink);font-weight:${on?700:500}">${N||i===4?s.s:s.n}</text>`});
    [[.16,'conception'],[.38,'wk 13'],[.58,'wk 27'],[.78,'wk 40']].forEach(([u,l])=>{g+=`<text x="${f1(TX(u))}" y="${L.ty+30}" class="t-xs t-mid">${N&&u===.16?'conc.':l}</text>`});
    const mx=TX(t);g+=`<path d="M${f1(mx)} ${L.ty+9}l-6 9h12z" style="fill:var(--ink)"/><circle cx="${f1(mx)}" cy="${L.ty}" r="5" style="fill:var(--panel);stroke:var(--ink);stroke-width:2.4"/>`;
    /* lamps */
    PG_LAMP.forEach((l,i)=>{const y=L.ry+i*L.rh,on=t>=l.t,fresh=on?1-ramp(t,l.t,l.t+.06):0;
      if(fresh>0)g+=`<circle cx="${L.rx+8}" cy="${y}" r="${f1(8+8*fresh)}" style="fill:var(--risk);opacity:${f1(.3*fresh)}"/>`;
      g+=`<circle cx="${L.rx+8}" cy="${y}" r="6.5" style="fill:${on?'var(--risk)':'var(--panel)'};stroke:${on?'var(--risk)':'var(--line)'};stroke-width:1.6"/>`;
      g+=`<text x="${L.rx+22}" y="${y+4}" class="t-sm" style="fill:${on?'var(--ink)':'var(--muted)'};font-weight:${on?700:500}">${l.n}</text>`;
      g+=`<text x="${L.rx+L.rw}" y="${y+4}" class="t-xs t-end" style="fill:${on?'var(--ink)':'var(--muted)'}">${on?l.v:'·'}</text>`});
    /* weight gain chart */
    const c=PG_GWG[gi],wk=40*ramp(t,.16,.78);
    const ax=curveAxes(L.cx,L.cy,L.cw,L.ch,{x0:0,x1:40,y0:0,y1:20,xt:[0,13,27,40],yt:[0,5,10,15,20],yfmt:v=>v+' kg',xlabel:'weeks of pregnancy',ylabel:'total gain: IOM 2009 range'});
    g+=ax.svg;const X=ax.X,Y=ax.Y;
    PG_GWG.forEach((o,i)=>{if(i===gi)return;g+=`<line x1="${f1(X(40)-6+i*0)}" x2="${f1(X(40)-6)}" y1="${f1(Y(o.lo))}" y2="${f1(Y(o.hi))}" style="stroke:var(--muted);stroke-width:3;opacity:.35"/>`});
    if(wk>0){g+=`<path d="M${f1(X(0))} ${f1(Y(0))}L${f1(X(wk))} ${f1(Y(c.hi*wk/40))}L${f1(X(wk))} ${f1(Y(c.lo*wk/40))}Z" style="fill:var(--life);opacity:.35"/>`;
      g+=`<line x1="${f1(X(0))}" y1="${f1(Y(0))}" x2="${f1(X(wk))}" y2="${f1(Y(c.hi*wk/40))}" style="stroke:var(--life);stroke-width:1.6"/><line x1="${f1(X(0))}" y1="${f1(Y(0))}" x2="${f1(X(wk))}" y2="${f1(Y(c.lo*wk/40))}" style="stroke:var(--life);stroke-width:1.6"/>`}
    g+=`<line x1="${f1(X(40)+6)}" x2="${f1(X(40)+6)}" y1="${f1(Y(c.lo))}" y2="${f1(Y(c.hi))}" style="stroke:var(--life);stroke-width:5;stroke-linecap:round"/>`;
    g+=kitLabel(X(1),Y(18.6),`${c.b}: ${c.lo} to ${c.hi} kg at term`)+kitLabel(X(1),Y(16.6),t<.16?'before pregnancy':t<.78?'week '+Math.round(wk):'term reached');
    svg.innerHTML=g;
    const p=phaseOf(PG_STEPS,t);note.innerHTML=noteHTML(PG_STEPS[p]);setA&&setA(p);
  }
  const stop=playWire(rg,$('#pgPlay'),draw,15000,'%t:player.replay%','pregnancy');
  setA=stepWire($('#pgSteps'),PG_STEPS,rg,draw,stop);
  gb.addEventListener('click',e=>{const b=e.target.closest('[data-gw]');if(!b)return;gi=+b.dataset.gw;$$('[data-gw]',gb).forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)});
  draw(+rg.value);

  /* ---------- planning cards ---------- */
  const psv=$('#pgPlan'),pb=$('#pgPlanBtns'),pnote=$('#pgPlanNote');let pi=0,pp=1,stopP=null;
  pb.innerHTML=PG_CARDS.map((c,i)=>`<button class="btn" data-pc="${i}" aria-pressed="${i===0}">${c.b}</button>`).join('');
  function drawPlan(){
    const N=vb(psv,'720 240','400 320'),c=PG_CARDS[pi];
    const L=N?{x:24,w:352,y:70,rh:70,lab:-14}:{x:40,w:640,y:64,rh:62,lab:-12};
    let g=`<text x="${L.x}" y="24" class="t-sm" style="fill:var(--ink);font-weight:700">${c.b}</text>`;
    if(c.pcos){const X=v=>L.x+L.w*v/4.5;
      g+=`<text x="${L.x}" y="44" class="t-xs">risk ratio vs women without PCOS (line at 1 = no difference)</text>`;
      [{n:'Obesity',v:2.77,lo:1.88,hi:4.1},{n:'Central obesity',v:1.73}].forEach((r,i)=>{const y=L.y+20+i*L.rh;
        g+=`<text x="${L.x}" y="${y-8}" class="t-sm" style="fill:var(--ink);font-weight:700">${r.n}</text><rect x="${L.x}" y="${y}" width="${f1(X(r.v*pp)-L.x)}" height="18" rx="4" style="fill:var(--hl)"/>`;
        if(r.lo&&pp>.98)g+=`<line x1="${f1(X(r.lo))}" x2="${f1(X(r.hi))}" y1="${y+9}" y2="${y+9}" style="stroke:var(--ink);stroke-width:1.6"/><line x1="${f1(X(r.lo))}" x2="${f1(X(r.lo))}" y1="${y+3}" y2="${y+15}" style="stroke:var(--ink);stroke-width:1.6"/><line x1="${f1(X(r.hi))}" x2="${f1(X(r.hi))}" y1="${y+3}" y2="${y+15}" style="stroke:var(--ink);stroke-width:1.6"/>`;
        g+=`<text x="${f1(X(r.v*pp)+(r.lo?X(4.1)-X(r.v)+8:8))}" y="${y+14}" class="t-xs" style="fill:var(--ink);font-weight:700">${pp>.98?'RR '+r.v:''}</text>`});
      g+=`<line x1="${f1(X(1))}" x2="${f1(X(1))}" y1="${L.y}" y2="${L.y+2*L.rh+10}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:4 3"/>`+kitLabel(X(1)+4,L.y+6,'1');
      psv.innerHTML=g;pnote.innerHTML=noteHTML(c);return}
    const A=c.ax,X=v=>L.x+L.w*(v-A.a)/(A.b-A.a),axY=L.y+(c.rows?c.rows.length:1)*L.rh+4;
    for(let v=Math.ceil(A.a/A.step)*A.step;v<=A.b;v+=A.step){g+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${axY}" y2="${axY+4}" class="axis"/><text x="${f1(X(v))}" y="${axY+16}" class="t-xs t-mid">${A.fmt?A.fmt(v):v}</text>`}
    g+=`<line x1="${L.x}" x2="${L.x+L.w}" y1="${axY}" y2="${axY}" class="axis"/><text x="${L.x+L.w}" y="${axY+32}" class="t-xs t-end">${A.u}</text>`;
    (c.rows||[]).forEach((r,i)=>{g+=`<text x="${L.x}" y="${L.y+i*L.rh+L.lab+4}" class="t-xs" style="fill:var(--ink);font-weight:700">${r}</text>`});
    const cut=A.a+(A.b-A.a)*pp;
    c.bars.forEach(b=>{if(b.a>=cut)return;const y=L.y+b.r*L.rh,x1=X(b.a),x2=X(Math.min(b.b,cut));
      g+=`<rect x="${f1(x1+1)}" y="${y}" width="${f1(Math.max(1,x2-x1-2))}" height="22" rx="5" style="fill:${b.out?'none':b.col};${b.out?'stroke:'+b.col+';stroke-width:1.6;stroke-dasharray:4 3':''};opacity:${b.op||1}"/>`;
      if(b.b<=cut)g+=`<text x="${f1((x1+x2)/2)}" y="${y+15}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">${b.l}</text>`});
    (c.marks||[]).forEach(m=>{if(m.at>cut)return;const x=X(m.at),y=L.y+(m.r||0)*L.rh;
      if(m.tick){g+=`<path d="M${f1(x)} ${y-2}l-5 -8h10z" style="fill:var(--hl)"/>`;if(m.l)g+=kitLabel(x,y-14,m.l,{a:'m'});return}
      g+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${L.y-20}" y2="${axY}" style="stroke:var(--ink);stroke-width:1.4;stroke-dasharray:5 3"/>`+kitLabel(x+4,L.y-24,m.l)});
    psv.innerHTML=g;pnote.innerHTML=noteHTML(c);
  }
  pb.addEventListener('click',e=>{const b=e.target.closest('[data-pc]');if(!b)return;pi=+b.dataset.pc;$$('[data-pc]',pb).forEach(x=>x.setAttribute('aria-pressed',x===b));
    stopP&&stopP();stopP=animate(900,q=>{pp=ease(q);drawPlan()},()=>{stopP=null;pp=1;drawPlan()})});
  drawPlan();

  /* ---------- outcomes after surgery ---------- */
  const osv=$('#pgOut'),ob=$('#pgOutBtns'),onote=$('#pgOutNote');let oi=0,op=1,stopO=null;
  ob.innerHTML=PG_OUT.map((c,i)=>`<button class="btn" data-po="${i}" aria-pressed="${i===0}">${c.b}</button>`).join('');
  function drawOut(){
    const N=vb(osv,'720 300','400 440'),c=PG_OUT[oi];
    const L=N?{lx:20,bx:20,bw:300,y0:62,rh:c.pair?86:62,bh:16}:{lx:20,bx:270,bw:380,y0:56,rh:c.pair?56:38,bh:16};
    const X=v=>L.bx+L.bw*v/c.max;
    let g=`<text x="20" y="22" class="t-sm" style="fill:var(--ink);font-weight:700">${c.h}</text>`;
    if(c.or)g+=`<line x1="${f1(X(1))}" x2="${f1(X(1))}" y1="34" y2="${L.y0+c.rows.length*L.rh-10}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:4 3"/>`+kitLabel(X(1),34,'1',{a:'m'});
    c.rows.forEach((r,i)=>{const y=L.y0+i*L.rh,by=N?y+6:y;
      g+=`<text x="${L.lx}" y="${N?y-4:by+12}" class="t-sm" style="fill:var(--ink);font-weight:700">${r.n}</text>`;
      if(c.or){const a=Math.min(X(1),X(lerp(1,r.v,op))),w=Math.abs(X(lerp(1,r.v,op))-X(1));
        g+=`<rect x="${f1(a)}" y="${by}" width="${f1(Math.max(2,w))}" height="${L.bh}" rx="4" style="fill:${r.v>1?'var(--risk)':'var(--good)'}"/><text x="${f1(Math.max(X(r.v),X(1))+6)}" y="${by+12}" class="t-xs" style="fill:var(--ink);font-weight:700">${op>.98?'OR '+r.v:''}</text>`}
      else{g+=`<rect x="${L.bx}" y="${by}" width="${f1(Math.max(2,X(r.v*op)-L.bx))}" height="${L.bh}" rx="4" style="fill:var(--life)"/><text x="${f1(X(r.v*op)+6)}" y="${by+12}" class="t-xs" style="fill:var(--ink);font-weight:700">${op>.98?r.v+'%':''}</text>`;
        g+=`<rect x="${L.bx}" y="${by+L.bh+4}" width="${f1(Math.max(2,X(r.w*op)-L.bx))}" height="${L.bh-4}" rx="3" style="fill:none;stroke:var(--ink);stroke-width:1.3"/><text x="${f1(X(r.w*op)+6)}" y="${by+L.bh+14}" class="t-xs">${op>.98?r.w+'%':''}</text>`}
    });
    osv.innerHTML=g;onote.innerHTML=noteHTML(c);
  }
  ob.addEventListener('click',e=>{const b=e.target.closest('[data-po]');if(!b)return;oi=+b.dataset.po;$$('[data-po]',ob).forEach(x=>x.setAttribute('aria-pressed',x===b));
    stopO&&stopO();stopO=animate(650,q=>{op=ease(q);drawOut()},()=>{stopO=null;op=1;drawOut()})});
  drawOut();
  const prevR=redraws.pregnancy;redraws.pregnancy=()=>{prevR&&prevR();drawPlan();drawOut()};
  const prevH=onHide.pregnancy;onHide.pregnancy=()=>{prevH&&prevH();stopP&&stopP();stopO&&stopO();stopP=stopO=null;pp=op=1};
};
