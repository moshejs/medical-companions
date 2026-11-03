/* =============== 4.2 Suicide risk & crisis safety =============== */
/* safe messaging: no methods or means anywhere in this module; help-seeking and treatability throughout */
const CS_MOOD=[[0,.03],[.08,0],[.15,.02],[.2,-.24],[.25,-.28],[.31,-.66],[.38,-.72],[.43,-.46],[.5,-.4],[.55,-.34],[.62,-.22],[.68,-.12],[.76,-.05],[.85,.02],[1,0]];
const CS_MIX=[.43,.54],CS_HOSP=[.54,.64],CS_DIS=[.64,.78];
const CS_STEPS=[
 {from:0,at:.08,k:'The starting point',t:'Risk is raised, but most people stay safe',
  txt:`Suicide is more common in bipolar disorder than in the general population: about 20–30 times higher in systematic reviews, with a suicide standardised mortality ratio of 14.44. [[Plans2019,Miller2020Suicide,Hayes2015]] Yet in a Danish national cohort followed for up to 36 years, more than 92% of men and 95% of women with bipolar disorder did not die by suicide. Risk is serious, not inevitable. [[Nordentoft2011]] Remission, the steady band, is the reference for the bars below.`,
  pt:`Bipolar disorder raises the risk of suicide, but most people with it never die by suicide, and treatment lowers the risk further.`,
  hook:`ISBD pooled suicide rate: 164 per 100,000 person-years; 23–26% attempt suicide in epidemiological studies. Population statistics. [[Schaffer2015Epi]]`},
 {from:.16,at:.34,k:'Depressive phases',t:'Low mood raises risk, and lasts longer',
  txt:`In the Finnish Jorvi studies, which tracked each person's mood on a life chart, suicide attempts were 5 times more frequent in subthreshold depression and 25 times more frequent in a major depressive episode than in full remission. People with bipolar disorder spent 35% of follow-up in major depressive episodes and 39% in subthreshold depression, so much of the extra risk comes from time spent in high-risk states. [[Holma2014]]`,
  pt:`Low moods are the times to ask for extra help, because that is when suicidal thoughts are most likely.`,
  hook:`Attempt incidence vs remission (Holma 2014): subthreshold depression ×5, major depression ×25, mixed ×65.`},
 {from:.42,at:.49,k:'Mixed states',t:'Mixed states carry the highest risk',
  txt:`A mixed state brings depressive and elevated symptoms together. Compared with other phases, suicide attempts were 37-fold more frequent during mixed states and 18-fold during major depressive phases; being in a mixed or depressive phase, plus prior attempts, accounted for 86% of attempts. [[Valtonen2008]] Against full remission the mixed-state figure was 65-fold. [[Holma2014]] Mixed features in either pole bring "major increases of risk of suicidal behaviors". [[Tondo2020]] Suicide is associated with depressed or mixed states, not with mania. [[Miller2020Suicide]]`,
  pt:`Feeling agitated and low at the same time is a warning sign. It is a good moment to contact the care team.`,
  hook:`Mixed state: 37× vs other phases (Valtonen 2008); 65× vs remission (Holma 2014).`},
 {from:.54,at:.7,k:'In hospital and after',t:'The weeks after discharge',
  txt:`Across 100 studies, the suicide rate after psychiatric discharge was highest in the first 3 months: 1132 per 100,000 person-years, falling to 654 in the rest of the first year and 277 after 10 years. It was highest of all in people admitted with suicidal thoughts or behaviour (2078). [[Chung2017JAMAPsych]] Active contact and follow-up after an emergency visit for suicidal behaviour halved repeat attempts within 6 months (RR 0.48). [[Inagaki2019]] A review of 97 studies concludes that active follow-up after discharge "should be routine". [[Mann2021Suicide]]`,
  pt:`Leaving hospital is a fragile time. A follow-up appointment booked before going home is part of good care.`,
  hook:`Highest-risk time after discharge: the first 3 months, 1132 per 100,000 person-years. [[Chung2017JAMAPsych]]`},
 {from:.8,at:.84,k:'Who is at higher risk',t:'Risk factors, early illness, and their limits',
  txt:`The strongest risk factors for suicide death in bipolar disorder were a previous suicide attempt and hopelessness. For non-fatal suicidal behaviour they included a family history of suicide, early onset, more severe depression, mixed states and rapid cycling, and alcohol or drug misuse. [[Hawton2005Bipolar]] A 2020 review adds male gender, living alone, unemployment, younger (under 35) or older (over 75) age and predominant depressive polarity. [[Miller2020Suicide]] Bipolar II is not milder: lifetime attempts were 32.4% vs 36.3% in bipolar I, not significantly different. [[Novick2010]] But risk categories predict individuals poorly (56% sensitivity), so care is for everyone. [[Large2016]]`,
  pt:`Some things raise risk, but no checklist can tell who will be safe. Everyone deserves good care and a plan.`,
  hook:`Strongest predictors of suicide death in bipolar disorder: previous attempt and hopelessness. [[Hawton2005Bipolar]]`},
 {from:.88,at:1,k:'The counterweight',t:'What protects',
  txt:`Good social support, effective treatment of depression and regular follow-up after an attempt are protective and modifiable. [[Holma2014,Turecki2016Lancet]] Safety-planning-type interventions reduced suicidal behaviour (RR 0.57), and in emergency departments a safety plan plus follow-up calls cut suicidal behaviour over 6 months from 5.29% to 3.03%. [[Nuij2021,Stanley2018ED]] <span class="ev est">Established</span> Lithium is the medicine most consistently linked to fewer suicides: against placebo, OR 0.13 in a meta-analysis of 48 trials, and 14% fewer suicide-related events during lithium treatment within the same people in a Swedish register. [[Cipriani2013,Song2017]] A trial adding lithium after a recent suicidal event in veterans found no difference. [[Katz2022]] More in <a href="#lithium" data-go="lithium">Lithium</a>.`,
  pt:`Treatment, people around you, follow-up and a written plan all push the balance back towards safety.`,
  hook:`Lithium vs placebo for suicide: OR 0.13 (Cipriani 2013). Safety planning: RR 0.57, NNT 16 (Nuij 2021).`}
];
const CS_PLAN=[
 {k:'signs',s:'Signs',n:'My warning signs and triggers',h:'Thoughts, moods, sleep changes or situations that tell me a crisis may be building.',c:'[[NICE2014CG185]]'},
 {k:'cope',s:'Coping',n:'Things I can do on my own',h:'Coping strategies that have helped me before: activities, places, routines, things that calm me.',c:'[[NICE2014CG185,Stanley2012SPI]]'},
 {k:'people',s:'People',n:'People who support me',h:'Friends, family or groups I can be with or call, with their phone numbers.',c:'[[Stanley2012SPI,NICE2014CG185]]'},
 {k:'pros',s:'Services',n:'My care team and services',h:'My care team, doctor, out-of-hours and crisis services, their numbers, and what we agreed they will do.',c:'[[NICE2014CG185]]'},
 {k:'safe',s:'Safer',n:'Keeping my surroundings safer',h:'What I have agreed with my care team and the people I live with to make my surroundings safer.',c:'[[Zalsman2016,Mann2021Suicide]]'}
];
inits.crisis=()=>{
  const svg=$('#csSvg'),rg=$('#csT'),f=moodSeries(CS_MOOD);
  const seg=(u,a,b,e=.025)=>ramp(u,a,a+e)*(1-ramp(u,b-e,b));
  const state=u=>{if(u>=CS_MIX[0]&&u<CS_MIX[1])return 'mixed';const v=f(u);return v<-.5?'major':v<-.15?'sub':'rem'};
  const HOL=[['rem','Remission',1],['sub','Subthreshold depression',5],['major','Major depression',25],['mixed','Mixed state',65]];
  const DIS=[['0–3 months',1132],['3–12 months',654],['1–5 years',494],['5–10 years',366],['over 10 years',277]];
  function draw(t){
    const N=vb(svg,'720 430','400 732'),u=t,ph=phaseOf(CS_STEPS,t),st=state(u);
    const C=N?{x:44,y:34,w:340,h:150}:{x:44,y:34,w:400,h:160};
    const Bp=N?{cx:200,cy:232,L:118,hang:150,lab:446}:{cx:580,cy:60,L:84,hang:180,lab:322};
    const P=N?{x:16,y:470,w:368,h:250}:{x:16,y:236,w:440,h:186};
    let s='';
    /* ---- life chart ---- */
    const X=v=>C.x+C.w*v;
    [[CS_HOSP,'hospital','var(--panel-2)',0],[CS_DIS,N?'3 months after':'3 months after discharge','var(--accent-soft)',1]].forEach(([[a,b],l,c,k])=>{if(u<a)return;
      s+=`<rect x="${f1(X(a))}" y="${C.y}" width="${f1(X(Math.min(u,b))-X(a))}" height="${C.h}" style="fill:${c};opacity:.9"/>`;
      if(u>=b-.01)s+=`<text x="${f1(k?X(a)+3:X(b)-3)}" y="${C.y+C.h+12}" class="t-xs${k?'':' t-end'}" style="fill:${k?'var(--accent)':'var(--muted)'}">${l}</text>`});
    const lc=lifechart(C.x,C.y,C.w,C.h,f,{upto:u,id:'csl',labels:true,mixed:u>=CS_MIX[0]?[[CS_MIX[0],Math.min(u,CS_MIX[1])]]:[],dot:true});
    s+=lc.svg;
    s+=`<text x="${C.x}" y="${C.y-12}" class="t-sm">ONE ILLUSTRATIVE COURSE</text>`;
    /* ---- balance ---- */
    const risk=[],prot=[];
    const sw=seg(u,.18,.3),mw=seg(u,.29,.44),xw=seg(u,CS_MIX[0],CS_MIX[1]),dw=seg(u,CS_DIS[0],.8,.02);
    if(sw>0)risk.push(['low mood',sw]);if(mw>0)risk.push(['depression',2*mw]);if(xw>0)risk.push(['mixed state',3*xw]);if(dw>0)risk.push(['after discharge',2*dw]);
    ['previous attempt','hopelessness','substance use'].forEach((l,i)=>{const w=ramp(u,.8+i*.015,.82+i*.015);if(w>0)risk.push([l,w])});
    prot.push(['support',1]);
    ['treatment','follow-up','safety plan','lithium'].forEach((l,i)=>{const w=ramp(u,.885+i*.025,.905+i*.025);if(w>0)prot.push([l,w])});
    const R=risk.reduce((a,b)=>a+b[1],0),Pw=prot.reduce((a,b)=>a+b[1],0),ang=clamp((R-Pw)*.075,-.3,.3);
    const lx=Bp.cx-Bp.L*Math.cos(ang),ly=Bp.cy+Bp.L*Math.sin(ang),rx=Bp.cx+Bp.L*Math.cos(ang),ry=Bp.cy-Bp.L*Math.sin(ang);
    const base=Bp.cy+Bp.hang+28;
    s+=`<path d="M${Bp.cx} ${Bp.cy}V${base}" style="stroke:var(--muted);stroke-width:3"/><path d="M${Bp.cx-26} ${base+8}L${Bp.cx} ${base-6}L${Bp.cx+26} ${base+8}Z" style="fill:var(--panel-2);stroke:var(--muted)"/>`;
    s+=`<line x1="${f1(lx)}" y1="${f1(ly)}" x2="${f1(rx)}" y2="${f1(ry)}" style="stroke:var(--ink);stroke-width:4;stroke-linecap:round"/><circle cx="${Bp.cx}" cy="${Bp.cy}" r="5" style="fill:var(--ink)"/>`;
    const pan=(x,y,L,col,lab,name)=>{const ty=y+Bp.hang,bw=N?100:92;let g=`<path d="M${f1(x)} ${f1(y)}L${f1(x-bw/2-4)} ${f1(ty)}M${f1(x)} ${f1(y)}L${f1(x+bw/2+4)} ${f1(ty)}" style="stroke:var(--line);stroke-width:1.2"/>`;
      g+=`<path d="M${f1(x-bw/2-8)} ${f1(ty)}H${f1(x+bw/2+8)}l-8 8H${f1(x-bw/2)}Z" style="fill:${col}"/>`;
      let yy=ty-2;L.forEach(([l,w])=>{const h=Math.max(.5,16*Math.min(w,1.6)+(w>1.6?6:0));yy-=h+2;
        g+=`<rect x="${f1(x-bw/2)}" y="${f1(yy)}" width="${bw}" height="${f1(h)}" rx="4" style="fill:${col};opacity:${f1(.25+.6*clamp(w))}"/>`;
        if(h>10)g+=`<text x="${f1(x)}" y="${f1(yy+h/2+3.4)}" class="t-xs t-mid" style="fill:var(--ink);font-size:8.6px">${l}</text>`});
      g+=`<text x="${f1(x)}" y="${f1(ty+22)}" class="t-sm t-mid" style="fill:${col}">${name}</text>`;return g};
    s+=pan(lx,ly,risk,'var(--down-fill)','r','RISK')+pan(rx,ry,prot,'var(--good)','p','PROTECTION');
    const tilt=R-Pw>.3?'risk outweighs protection':Pw-R>.3?'protection outweighs risk':'about level';
    s+=`<text x="${Bp.cx}" y="${Bp.lab+(N?0:0)}" class="t-xs t-mid" style="fill:var(--muted)">${N?'':'balance: '}${tilt}</text>`;
    /* ---- bottom panel ---- */
    s+=`<rect x="${P.x}" y="${P.y}" width="${P.w}" height="${P.h}" rx="10" style="fill:var(--field);stroke:var(--line)"/>`;
    const lw=N?150:156,bx=P.x+lw,bwid=P.w-lw-50;
    if(ph<=2){
      s+=`<text x="${P.x+12}" y="${P.y+20}" class="t-sm">SUICIDE ATTEMPTS VS REMISSION</text><text x="${P.x+P.w-12}" y="${N?P.y+P.h-8:P.y+20}" class="t-xs t-end">log scale · [Holma 2014]</text>`;
      const rh=(P.h-40)/4;HOL.forEach(([k,l,v],i)=>{const y=P.y+34+i*rh,seen=k==='rem'||(k==='sub'&&u>=.19)||(k==='major'&&u>=.29)||(k==='mixed'&&u>=CS_MIX[0]),cur=st===k;
        const w=8+bwid*Math.log10(v)/Math.log10(65),col=k==='mixed'?'var(--mixed-fill)':k==='rem'?'var(--eu)':'var(--down-fill)';
        s+=`<text x="${bx-8}" y="${f1(y+rh/2+3)}" class="t-xs t-end" style="fill:${cur?'var(--ink)':'var(--muted)'};font-weight:${cur?700:500}">${l}</text>`;
        if(seen){s+=`<rect x="${bx}" y="${f1(y+rh*.2)}" width="${f1(w)}" height="${f1(rh*.6)}" rx="4" style="fill:${col};opacity:${cur?1:.5}"/><text x="${f1(bx+w+6)}" y="${f1(y+rh/2+4)}" class="t-lbl" style="fill:${cur?'var(--ink)':'var(--muted)'}">×${v}</text>`}
        else s+=`<rect x="${bx}" y="${f1(y+rh*.2)}" width="${f1(bwid)}" height="${f1(rh*.6)}" rx="4" style="fill:none;stroke:var(--line);stroke-dasharray:3 4"/>`});
    }else if(ph===3){const g=ease(ramp(u,CS_DIS[0],.7));
      s+=`<text x="${P.x+12}" y="${P.y+20}" class="t-sm">SUICIDE RATE AFTER DISCHARGE</text><text x="${P.x+P.w-12}" y="${P.y+20}" class="t-xs t-end">per 100,000 person-years</text>`;
      const rh=(P.h-40)/5;DIS.forEach(([l,v],i)=>{const y=P.y+32+i*rh,w=bwid*v/1200*clamp(g*1.6-i*.15);
        s+=`<text x="${bx-8}" y="${f1(y+rh/2+3)}" class="t-xs t-end" style="fill:${i?'var(--muted)':'var(--accent)'}">${l}</text><rect x="${bx}" y="${f1(y+rh*.2)}" width="${f1(Math.max(1,w))}" height="${f1(rh*.6)}" rx="4" style="fill:${i?'var(--muted)':'var(--accent)'};opacity:${i?.5:.95}"/>`;
        if(w>4)s+=`<text x="${f1(bx+w+6)}" y="${f1(y+rh/2+4)}" class="t-lbl" style="fill:${i?'var(--muted)':'var(--accent)'}">${Math.round(v*clamp(g*1.6-i*.15))}</text>`});
      s+=`<text x="${P.x+12}" y="${P.y+P.h-6}" class="t-xs">all diagnoses · [Chung 2017]</text>`;
    }else{const RF=ph===4?[['previous suicide attempt','strongest'],['hopelessness','strongest'],['family history of suicide',''],['early onset',''],['mixed states, rapid cycling',''],['alcohol or drug misuse',''],['living alone, unemployment','']]
        :[['effective treatment of depression',''],['social support, connection',''],['follow-up contact','RR 0.48'],['safety planning','RR 0.57'],['safety plan + calls','3.03% vs 5.29%'],['lithium vs placebo','OR 0.13']];
      const col=ph===4?'var(--down)':'var(--good)';
      s+=`<text x="${P.x+12}" y="${P.y+20}" class="t-sm" style="fill:${col}">${ph===4?'RISK FACTORS · POPULATION LEVEL':'WHAT PROTECTS'}</text>`;
      const rh=(P.h-34)/RF.length;RF.forEach(([l,n],i)=>{const a=ph===4?ramp(u,.8+i*.008,.81+i*.008):ramp(u,.885+i*.018,.9+i*.018),y=P.y+30+i*rh+rh/2;
        s+=`<g style="opacity:${f1(.15+.85*a)}"><circle cx="${P.x+20}" cy="${f1(y)}" r="4" style="fill:${col}"/><text x="${P.x+32}" y="${f1(y+4)}" class="t-lbl" style="font-size:${N?12.5:13}px">${l}</text>${n?`<text x="${P.x+P.w-12}" y="${f1(y+4)}" class="t-sm t-end" style="fill:${col}">${n}</text>`:''}</g>`});
    }
    svg.innerHTML=s;
    $('#csNote').innerHTML=noteHTML(CS_STEPS[ph]);setSt(ph);
  }
  const stop=playWire(rg,$('#csPlay'),draw,26000,'Replay','crisis');
  const setSt=stepWire($('#csSteps'),CS_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- safety plan builder: stored only in this browser ---- */
  const plan=Object.assign({},store.get('crisisPlan',{})),box=$('#csPlan'),lad=$('#csLadder');
  const esc=x=>String(x||'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  box.innerHTML=CS_PLAN.map((p,i)=>`<div class="cs-field"><span class="n">PART ${i+1}</span><label for="csF-${p.k}">${p.n}</label><small>${p.h} ${p.c}</small><textarea id="csF-${p.k}" data-pk="${p.k}" rows="3" autocomplete="off" spellcheck="true">${esc(plan[p.k])}</textarea></div>`).join('')
    +`<div class="cs-field"><span class="n">ALWAYS ON THE PLAN</span><label>Crisis lines</label><small>Printed on every plan.</small><p>Local emergency services. US: call or text <b>988</b>. UK &amp; Ireland: Samaritans <b>116 123</b>.</p></div>`;
  function drawL(){const N=vb(lad,'400 170','400 170');const filled=CS_PLAN.map(p=>(plan[p.k]||'').trim().length>0),n=filled.filter(Boolean).length;
    const L=ladder(14,40,372,118,CS_PLAN.map(p=>p.s).concat(['Lines']),{col:'var(--accent)'});
    let s=L.svg;
    CS_PLAN.concat([{s:'Lines'}]).forEach((p,i)=>{const on=i===CS_PLAN.length||filled[i],[x,y]=L.top(i);
      s+=`<circle cx="${f1(x)}" cy="${f1(y-12)}" r="9" style="fill:${on?'var(--accent)':'var(--panel)'};stroke:var(--accent);stroke-width:1.6"/>${on?`<path d="M${f1(x-4)} ${f1(y-12)}l3 3l5-6" style="fill:none;stroke:var(--panel);stroke-width:2;stroke-linecap:round"/>`:''}`});
    s+=`<text x="14" y="12" class="t-sm" style="fill:var(--accent)">${n} OF ${CS_PLAN.length} PARTS FILLED IN · CRISIS LINES INCLUDED</text>`;
    lad.innerHTML=s;$('#csLadderCap').textContent=n===CS_PLAN.length?'Every part has something in it. Share a copy with someone you trust and your care team.':'Fill in what you can. A short plan is still a plan.'}
  box.addEventListener('input',e=>{const ta=e.target.closest('[data-pk]');if(!ta)return;plan[ta.dataset.pk]=ta.value;store.set('crisisPlan',plan);drawL()});
  $('#csClear').addEventListener('click',()=>{if(!confirm('Clear your safety plan from this browser?'))return;CS_PLAN.forEach(p=>{plan[p.k]='';const ta=$('#csF-'+p.k);if(ta)ta.value=''});store.set('crisisPlan',{});drawL()});
  $('#csPrint').addEventListener('click',()=>{
    const body=CS_PLAN.map((p,i)=>`<h2>${i+1}. ${p.n}</h2><p>${esc(plan[p.k]).replace(/\n/g,'<br>')||'<span class="e">(not filled in yet)</span>'}</p>`).join('');
    const html=`<!doctype html><html lang="en"><head><meta charset="utf-8"><title>My safety plan</title><style>body{font:16px/1.5 Georgia,serif;color:#111;max-width:680px;margin:32px auto;padding:0 20px}h1{font-size:28px;margin:0 0 6px}h2{font-size:17px;margin:22px 0 6px;border-bottom:1px solid #999;padding-bottom:3px}p{margin:0;min-height:3em}.e{color:#777}.box{border:2px solid #a24a28;border-radius:10px;padding:10px 14px;margin:18px 0}small{color:#555}</style></head><body><h1>My safety plan</h1><small>Written ${new Date().toLocaleDateString()}. Keep it somewhere easy to find, and share it with people you trust and your care team.</small><div class="box"><b>If you are in crisis or thinking about suicide, contact local emergency services or a crisis line.</b><br>US: call or text <b>988</b> · UK &amp; Ireland: Samaritans <b>116 123</b></div>${body}</body></html>`;
    const w=window.open('','_blank');if(!w){window.print();return}
    w.document.open();w.document.write(html);w.document.close();w.focus();setTimeout(()=>{try{w.print()}catch(e){}},250)});
  drawL();
};
