/* =============== 3.5 Treating bipolar depression =============== */
const DE_STEPS=[
 {from:0,at:.06,k:'STEP-BD, 2007',t:'The question',
  txt:`STEP-BD asked whether adding an antidepressant helps bipolar depression. 366 people already taking a mood stabiliser were randomised to add an antidepressant or a placebo, for up to 26 weeks. [[Sachs2007STEPBD]]`,
  pt:`Everyone in the trial kept their mood stabiliser. Half also got an antidepressant, half a dummy pill, and nobody knew which.`},
 {from:.12,at:.3,k:'STEP-BD, 2007',t:'No added recovery',
  txt:`Durable recovery occurred in 23.5% (42 of 179) with the antidepressant and 27.3% (51 of 187) with placebo (P = 0.40). Rates of treatment-emergent affective switch were similar in the two arms. [[Sachs2007STEPBD]]`,
  pt:`Adding a standard antidepressant did not help more people get better than adding a dummy pill, and it did not cause more switches into mania in this trial.`,
  hook:`STEP-BD: adding an antidepressant to a mood stabiliser gave no added recovery (23.5% vs 27.3%) and no increased switch.`},
 {from:.36,at:.5,k:'ISBD task force, 2013',t:'Weak evidence, wide use',
  txt:`The ISBD task force found <i>"striking incongruity between the wide use of and the weak evidence base"</i> for antidepressants in bipolar disorder, and reached consensus on 12 statements. SSRIs and bupropion <i>"may have lower rates of manic switch"</i> than tricyclics, tetracyclics and SNRIs. In bipolar I, antidepressants <i>"should be prescribed only as an adjunct to mood-stabilizing medications"</i>. A 2004 review found switch rates of 10% with tricyclics vs 3.2% with all other antidepressants combined. [[Pacchiarotti2013,Gijsman2004]]`,
  pt:`Standard antidepressants on their own can tip some people with bipolar disorder into mania. Doctors usually use them, if at all, only together with a mood stabiliser.`,
  hook:`Tricyclics carry the highest switch risk: 10% vs 3.2% for other antidepressants.`},
 {from:.56,at:.76,k:'CANMAT/ISBD 2018',t:'First-line for bipolar I depression',
  txt:`CANMAT/ISBD 2018 lists its first-line choices for bipolar I depression in this hierarchy order: quetiapine; lurasidone plus lithium or divalproex; lithium; lamotrigine; lurasidone; and adjunctive lamotrigine. Rankings weigh efficacy, clinical experience, and safety, tolerability and switch risk. [[Yatham2018]]`,
  pt:`Several medicines are recommended as a first choice. Which one suits a person depends on their past response, other conditions and side effects.`,
  hook:`CANMAT 2018 first-line bipolar I depression: quetiapine, lurasidone + Li/DVP, lithium, lamotrigine, lurasidone, adjunctive lamotrigine.`},
 {from:.8,at:.88,k:'CANMAT/ISBD 2018',t:'Second-line, and not recommended',
  txt:`Divalproex, adjunctive SSRIs or bupropion (moved down from first-line in 2013 because of weak efficacy data) and ECT are second-line. The guideline states <i>"Antidepressant monotherapy should NOT be used for the treatment of BDI depression"</i>, and aripiprazole monotherapy is not recommended (level 1 negative). Antidepressants should ideally be avoided or used cautiously after antidepressant-induced mania or hypomania, with mixed features, or with recent rapid cycling. [[Yatham2018]]`,
  hook:`Antidepressant monotherapy should not be used in bipolar I depression (CANMAT/ISBD 2018).`},
 {from:.93,at:1,k:'Bipolar II and NICE',t:'Bipolar II, and the UK view',
  txt:`For bipolar II depression, quetiapine is <i>"the only recommended first‐line treatment"</i>; lithium, sertraline, venlafaxine, lamotrigine and ECT are second-line. NICE CG185, for moderate or severe bipolar depression in someone not on treatment: <i>"offer fluoxetine combined with olanzapine, or quetiapine on its own"</i>, with olanzapine alone or lamotrigine alone if the person prefers. [[Yatham2018,NICE2014CG185F]]`,
  pt:`Guidelines from different countries agree on the main options but rank them a little differently.`}
];
const DE_LAD=['Quetiapine','Lurasidone + lithium or divalproex','Lithium','Lamotrigine','Lurasidone','Adjunctive lamotrigine'];
const DE_ISBD=[['“Striking incongruity” between wide use','and the weak evidence base'],['SSRIs and bupropion may switch less','than tricyclics, tetracyclics and SNRIs'],['Bipolar I: only as an adjunct','to mood-stabilising medication']];
inits.depression=()=>{
  const svg=$('#deSvg'),rg=$('#deT');
  function draw(t){
    const N=vb(svg,'720 380','400 600'),p=phaseOf(DE_STEPS,t);
    const oA=1-ramp(t,.32,.36),oB=ramp(t,.34,.38)*(1-ramp(t,.52,.56)),oC=ramp(t,.54,.58);let s='';
    if(oA>0){/* STEP-BD */
      const L=N?{ax:[60,220],bw:110,base:420,top:180,lab:440,px:[40,48]}:{ax:[140,330],bw:120,base:320,top:110,lab:342,px:[0,0]};
      const g=ramp(t,.12,.28),Hs=v=>(L.base-L.top)*v/40;
      s+=`<g style="opacity:${f1(oA)}">`;
      s+=`<text x="12" y="26" class="t-lbl">STEP-BD: durable recovery</text><text x="${N?12:708}" y="${N?44:26}" class="t-xs ${N?'':'t-end'}">366 people on a mood stabiliser, up to 26 weeks</text>`;
      [0,10,20,30,40].forEach(v=>{const y=L.base-Hs(v);s+=`<line x1="${N?40:100}" x2="${N?390:500}" y1="${f1(y)}" y2="${f1(y)}" class="${v?'grid':'axis'}"/><text x="${N?34:94}" y="${f1(y+3)}" class="t-xs t-end">${v}%</text>`});
      [['+ antidepressant',23.5,'42 of 179','var(--rx)',true],['+ placebo',27.3,'51 of 187','var(--muted)',false]].forEach(([nm,v,n,c,ad],i)=>{
        const x=(N?[70,230]:[150,330])[i],h=Hs(v)*ease(g);
        s+=`<rect x="${x}" y="${f1(L.base-h)}" width="${L.bw}" height="${f1(h)}" rx="6" style="fill:${c};opacity:.85"/>`;
        if(g>0)s+=`<text x="${x+L.bw/2}" y="${f1(L.base-h-10)}" class="t-mid" style="font:800 20px var(--display);fill:var(--ink)">${(v*ease(g)).toFixed(1)}%</text>`;
        s+=pill(x+30,(N?L.top-50:76),30,{txt:'MS'})+pill(x+80,(N?L.top-50:76),30,{col:ad?'var(--rx)':'var(--muted)',txt:ad?'AD':'P'});
        s+=`<text x="${x+L.bw/2}" y="${L.base+18}" class="t-sm t-mid" style="fill:var(--ink)">${nm}</text><text x="${x+L.bw/2}" y="${L.base+32}" class="t-xs t-mid">${g>=1?n:''}</text>`});
      const sw=ramp(t,.22,.3);
      if(sw>0){const bx=N?40:530,by=N?500:150;
        s+=`<g style="opacity:${f1(sw)}"><rect x="${bx}" y="${by}" width="${N?350:178}" height="${N?70:120}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
        s+=`<text x="${bx+12}" y="${by+24}" class="t-lbl">P = 0.40</text><text x="${bx+12}" y="${by+44}" class="t-xs">no significant difference</text>`;
        s+=`<text x="${bx+12}" y="${by+(N?60:70)}" class="t-xs" style="fill:var(--up)">${N?'switch to mania or hypomania: similar in both arms':'switch to mania or'}</text>${N?'':`<text x="${bx+12}" y="${by+84}" class="t-xs" style="fill:var(--up)">hypomania: similar</text><text x="${bx+12}" y="${by+98}" class="t-xs" style="fill:var(--up)">in both arms</text>`}</g>`}
      s+=`<text x="12" y="${N?L.top-80:370}" class="t-xs">MS mood stabiliser · AD antidepressant · P placebo</text>`;
      s+='</g>'}
    if(oB>0){/* ISBD statements */
      s+=`<g style="opacity:${f1(oB)}">`;
      s+=`<text x="12" y="26" class="t-lbl">ISBD task force on antidepressants (2013)</text><text x="12" y="44" class="t-xs">consensus on 12 statements; three of them</text>`;
      DE_ISBD.forEach((ln,i)=>{const a=ramp(t,.37+i*.035,.4+i*.035);if(a<=0)return;const x=N?12:16,y=(N?64:62)+i*(N?74:70),w=N?376:420;
        s+=`<g style="opacity:${f1(a)}" transform="translate(${f1((1-a)*-20)} 0)"><rect x="${x}" y="${y}" width="${w}" height="58" rx="10" style="fill:var(--dx-soft);stroke:var(--dx)"/><text x="${x+14}" y="${y+24}" class="t-lbl">${ln[0]}</text><text x="${x+14}" y="${y+43}" class="t-sm">${ln[1]}</text></g>`});
      const b=ramp(t,.46,.5),bx=N?40:470,by=N?300:70,bh=N?220:220,sc=v=>bh*v/12;
      if(b>0){s+=`<g style="opacity:${f1(b)}"><text x="${N?12:bx}" y="${by-0}" class="t-sm" style="fill:var(--ink)">Switch rates, 2004 review</text>`;
        [['Tricyclics',10,'var(--up-fill)'],['All other',3.2,'var(--rx)']].forEach(([nm,v,c],i)=>{const x=bx+20+i*100,h=sc(v)*ease(b),yb=by+20+bh;
          s+=`<rect x="${x}" y="${f1(yb-h)}" width="64" height="${f1(h)}" rx="5" style="fill:${c};opacity:.85"/><text x="${x+32}" y="${f1(yb-h-8)}" class="t-lbl t-mid">${v}%</text><text x="${x+32}" y="${yb+16}" class="t-xs t-mid">${nm}</text>`});
        s+=`<line x1="${bx}" x2="${bx+230}" y1="${by+20+bh}" y2="${by+20+bh}" class="axis"/></g>`}
      s+='</g>'}
    if(oC>0){/* CANMAT ladder */
      s+=`<g style="opacity:${f1(oC)}">`;
      s+=`<text x="12" y="26" class="t-lbl">CANMAT/ISBD 2018: bipolar I depression</text><text x="12" y="44" class="t-xs">first-line, in hierarchy order</text>`;
      const lx=N?24:30,top=N?62:60,rh=N?40:44,n=DE_LAD.length;
      s+=`<line x1="${lx}" x2="${lx}" y1="${top-6}" y2="${top+n*rh}" style="stroke:var(--muted);stroke-width:3;stroke-linecap:round"/><line x1="${lx+40}" x2="${lx+40}" y1="${top-6}" y2="${top+n*rh}" style="stroke:var(--muted);stroke-width:3;stroke-linecap:round"/>`;
      DE_LAD.forEach((nm,i)=>{const a=ramp(t,.57+i*.028,.6+i*.028);const y=top+i*rh+14;
        s+=`<line x1="${lx}" x2="${lx+40}" y1="${y}" y2="${y}" style="stroke:${a>0?'var(--rx)':'var(--line)'};stroke-width:3;stroke-linecap:round"/>`;
        if(a>0)s+=`<g style="opacity:${f1(a)}"><circle cx="${lx+60}" cy="${y}" r="10" style="fill:var(--rx)"/><text x="${lx+60}" y="${y+4}" class="t-xs t-mid" style="fill:var(--panel);font-weight:700">${i+1}</text><text x="${lx+78}" y="${y+5}" class="t-lbl">${nm}</text></g>`});
      const s2=ramp(t,.8,.84),s3=ramp(t,.93,.97);
      const bx=N?12:420,by=N?318:60,bw=N?376:290;
      if(s2>0){s+=`<g style="opacity:${f1(s2)}"><rect x="${bx}" y="${by}" width="${bw}" height="${N?120:150}" rx="12" style="fill:var(--warn-soft);stroke:var(--warn)"/>`;
        s+=`<text x="${bx+14}" y="${by+22}" class="t-sm" style="fill:var(--warn)">SECOND-LINE (examples)</text><text x="${bx+14}" y="${by+42}" class="t-lbl">Divalproex</text><text x="${bx+14}" y="${by+60}" class="t-lbl">Adjunctive SSRIs or bupropion</text><text x="${bx+14}" y="${by+78}" class="t-lbl">ECT</text>`;
        s+=`<text x="${bx+14}" y="${by+(N?100:104)}" class="t-xs" style="fill:var(--bad)">NOT recommended: antidepressant</text><text x="${bx+14}" y="${by+(N?113:118)}" class="t-xs" style="fill:var(--bad)">monotherapy; aripiprazole monotherapy</text></g>`}
      if(s3>0){const cy=N?452:226;s+=`<g style="opacity:${f1(s3)}"><rect x="${bx}" y="${cy}" width="${bw}" height="${N?100:96}" rx="12" style="fill:var(--down-soft);stroke:var(--down)"/>`;
        s+=`<text x="${bx+14}" y="${cy+22}" class="t-sm" style="fill:var(--down)">BIPOLAR II DEPRESSION</text><text x="${bx+14}" y="${cy+42}" class="t-lbl">First-line: quetiapine only</text><text x="${bx+14}" y="${cy+62}" class="t-xs">Second-line: lithium, sertraline,</text><text x="${bx+14}" y="${cy+76}" class="t-xs">venlafaxine, lamotrigine, ECT</text></g>`}
      s+='</g>'}
    svg.innerHTML=s;setSt(p);$('#deNote').innerHTML=noteHTML(DE_STEPS[p]);
  }
  const stop=playWire(rg,$('#dePlay'),draw,22000,'%t:player.replay%','depression');
  const setSt=stepWire($('#deSteps'),DE_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- switch risk explainer ---------- */
  const sw=$('#deSw');let mode='mono',prog=1,stopA=null;
  const CRS={mono:moodSeries([[0,-.62],[.15,-.55],[.35,-.25],[.5,.05],[.65,.32],[.8,.42],[1,.38]]),
             ms:moodSeries([[0,-.62],[.15,-.55],[.35,-.3],[.55,-.1],[.75,.02],[1,.04]])};
  const HR={mono:[2.83,1.12,7.19,'Antidepressant alone'],ms:[.79,.54,1.15,'With a mood stabiliser']};
  const NOTES={mono:{k:'Antidepressant alone',t:'Mania hazard nearly tripled',
     txt:`In the first 3 months after starting an antidepressant without a mood stabiliser, the hazard ratio for mania was 2.83 (95% CI 1.12–7.19). Across 109 trials, mania averaged 12.5% with antidepressants vs 7.5% without. [[Viktorin2014,Tondo2010]]`,
     pt:`Taking an antidepressant on its own raised the chance of a switch into mania in this study.`,
     hook:`Antidepressant monotherapy in bipolar disorder raises mania risk (HR 2.83); with a mood stabiliser it does not (HR 0.79).`},
   ms:{k:'With a mood stabiliser',t:'No rise in mania risk',
     txt:`With a concurrent mood stabiliser there was no rise (HR 0.79, 0.54–1.15): the interval crosses 1. NICE: if mania or hypomania develops on antidepressant monotherapy, consider stopping the antidepressant and offer an antipsychotic <i>"regardless of whether the antidepressant is stopped"</i>. [[Viktorin2014,NICE2014CG185F]]`,
     pt:`When an antidepressant is used in bipolar disorder, it is usually alongside a mood stabiliser. Any change is planned with the prescriber.`}};
  function drawSw(){
    const N=vb(sw,'720 300','400 520'),f=CRS[mode];let s='';
    const L=N?{cx:16,cy:40,cw:370,ch:200,fx0:40,fx1:370,fy:330}:{cx:16,cy:40,cw:380,ch:220,fx0:440,fx1:700,fy:90};
    s+=`<text x="${L.cx}" y="24" class="t-lbl">After starting an antidepressant (schematic)</text>`;
    s+=lifechart(L.cx,L.cy,L.cw,L.ch,f,{upto:prog,id:'desw',labels:true,dot:true}).svg;
    s+=`<text x="${L.cx}" y="${L.cy+L.ch+16}" class="t-xs">start</text><text x="${L.cx+L.cw}" y="${L.cy+L.ch+16}" class="t-xs t-end">about 3 months →</text>`;
    /* forest plot, log scale 0.4..8 */
    const lg=v=>Math.log(v),X=v=>L.fx0+(L.fx1-L.fx0)*(lg(v)-lg(.4))/(lg(8)-lg(.4));
    s+=`<text x="${N?16:L.fx0}" y="${L.fy-46}" class="t-lbl">Mania, 0–3 months: hazard ratio</text><text x="${N?16:L.fx0}" y="${L.fy-30}" class="t-xs">Viktorin 2014, 3,240 people (log scale)</text>`;
    s+=`<line x1="${f1(X(1))}" x2="${f1(X(1))}" y1="${L.fy-14}" y2="${L.fy+106}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:3 3"/>`;
    [.5,1,2,4,8].forEach(v=>{s+=`<text x="${f1(X(v))}" y="${L.fy+120}" class="t-xs t-mid">${v}</text>`});
    s+=`<text x="${f1(X(.5))}" y="${L.fy+136}" class="t-xs">← lower risk</text><text x="${f1(X(8))}" y="${L.fy+136}" class="t-xs t-end">higher risk →</text>`;
    ['mono','ms'].forEach((k,i)=>{const [h,lo,hi,nm]=HR[k],y=L.fy+16+i*52,on=k===mode,c=k==='mono'?'var(--up)':'var(--eu)';
      s+=`<g style="opacity:${on?1:.35}"><text x="${f1(L.fx0)}" y="${y-12}" class="t-xs" style="fill:var(--ink);paint-order:stroke;stroke:var(--panel);stroke-width:4px">${nm}</text><line x1="${f1(X(lo))}" x2="${f1(X(hi))}" y1="${y}" y2="${y}" style="stroke:${c};stroke-width:3;stroke-linecap:round"/><rect x="${f1(X(h)-7)}" y="${y-7}" width="14" height="14" style="fill:${c}"/><text x="${f1(Math.min(X(hi)+8,L.fx1-30))}" y="${y+18}" class="t-sm" style="fill:${c};font-weight:700;paint-order:stroke;stroke:var(--panel);stroke-width:4px">${h.toFixed(2)}</text></g>`});
    sw.innerHTML=s;$('#deSwNote').innerHTML=noteHTML(NOTES[mode]);
  }
  $$('[data-desw]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.desw;$$('[data-desw]').forEach(x=>x.setAttribute('aria-pressed',x===b));
    if(stopA)stopA();prog=0;stopA=animate(2200,p=>{prog=p;drawSw()},()=>{stopA=null})}));
  drawSw();
  onHide.depression=(prev=>()=>{prev&&prev();if(stopA){stopA();stopA=null;prog=1}})(onHide.depression);
  redraws.depression=(prevR=>()=>{prevR&&prevR();drawSw()})(redraws.depression);
};
