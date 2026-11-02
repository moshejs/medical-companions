/* =============== 1.2 Words, identity & neurodiversity =============== */
/* identity-first [0] and person-first [1] forms; {key} tokens in step text are filled live */
const WO_W={p:['autistic people','people with autism'],P:['Autistic people','People with autism'],a:['autistic adults','adults with autism'],A:['Autistic adults','Adults with autism'],
 o:['an autistic person','a person with autism'],O:['An autistic person','A person with autism'],f:['autistic women','women with autism'],m:['autistic men','men with autism'],
 /* short forms for SVG labels */
 r1:['Chain 1 · autistic people','Chain 1 · people with autism'],r3:['Chain 3 · mixed: autistic and non-autistic','Chain 3 · mixed: people with and without autism'],
 r3n:['Chain 3 · mixed','Chain 3 · mixed'],g1:['autistic','with autism'],chainA:['autistic chains','chains of people with autism']};
let woPF=0;
const woW=k=>(WO_W[k]||[k,k])[woPF];
const woFill=s=>s.replace(/\{(\w+)\}/g,(m,k)=>WO_W[k]?woW(k):m);
const WO_STEPS=[
 {from:0,at:.2,k:'Chain 1',t:'Autistic to autistic',
  txt:`In 2012 Damian Milton, an autistic sociologist, described the "double empathy problem": social difficulty as a two-way mismatch between autistic and non-autistic people, not a one-sided deficit. Crompton and colleagues tested it with diffusion chains: a 30-detail story passed person to person along chains of eight. Chains of {p} recalled a mean of 12.96 details. <span class="ev hyp">Hypothesis, with supporting studies</span> [[Milton2012,Milton2022,Crompton2020]]`,
  pt:`{P} passed the story to each other as well as anyone did.`,
  hook:`Double empathy problem: Milton, 2012. The misunderstanding runs both ways, not from one side.`},
 {from:.22,at:.42,k:'Chain 2',t:'Non-autistic to non-autistic',
  txt:`Chains of non-autistic people recalled 12.40 details on average, no different from the chains of {p} (Tukey p = 0.92). [[Crompton2020]]`,
  pt:`Chains where everyone shared a way of communicating kept about the same amount of the story.`,
  hook:`Crompton 2020: 72 adults in nine eight-person chains: 3 autistic, 3 non-autistic, 3 mixed. [[Crompton2020]]`},
 {from:.44,at:.68,k:'Chain 3',t:'Mixed chain',
  txt:`In chains that mixed {p} and non-autistic people, only 8.92 details survived on average, significantly fewer, and detail was lost faster along the chain. The breaks are drawn from both sides: neither group caused them alone. [[Crompton2020]]`,
  pt:`When the two groups passed the story to each other, more of it got lost, in both directions.`,
  hook:`Mean details recalled (of 30): {chainA} 12.96, non-autistic chains 12.40, mixed chains 8.92. [[Crompton2020]]`},
 {from:.7,at:.8,k:'Rapport',t:'Who feels at ease',
  txt:`Rapport ratings were lower in mixed chains. In groups of four, all-autistic groups had rapport similar to all-non-autistic groups and rated enjoyment and friendliness higher than mixed groups did; the rapport of {p} fell as more non-autistic people joined. Non-autistic observers formed less favourable first impressions of {p} from seconds-long videos, but not from transcripts alone: "style, not substance". <span class="ev est">Established across three studies</span> [[Crompton2020,Foster2025,Sasson2017]]`,
  pt:`People tend to feel most at ease with people who communicate the way they do.`,
  hook:`Sasson 2017 "thin slices": the first-impression bias disappeared when observers read transcripts. [[Sasson2017]]`},
 {from:.86,at:1,k:'2025',t:'A larger replication',
  txt:`A larger pre-registered replication (N = 311) found no difference in information transfer between single-neurotype and mixed chains. Non-autistic chains reported higher rapport, and disclosing a diagnosis improved rapport. Mitchell and colleagues propose that misperceptions by the majority lead to exclusion, which harms mental health (Hypothesis). <span class="ev early">Early evidence: mixed</span> [[Crompton2025,Mitchell2021]]`,
  pt:`The newest, bigger study did not find the gap in passing on information, so the science is still settling. Understanding on both sides still matters.`,
  hook:`Crompton 2020 found a mixed-chain penalty; Crompton 2025 (N = 311) did not. [[Crompton2020,Crompton2025]]`}];
/* a made-up day: hours, social demand 0..1 */
const WO_SEG=[{a:7,b:8,n:'Getting ready',d:.15},{a:8,b:9,n:'Commute',d:.45},{a:9,b:12,n:'Lessons or meetings',d:.6},{a:12,b:13,n:'Lunch: unstructured time',d:.95},
 {a:13,b:16,n:'Afternoon tasks',d:.6},{a:16,b:17,n:'Commute home',d:.45},{a:17,b:23,n:'Home',d:0,home:1}];
inits.words=()=>{
  const sec=$('#m-words');
  /* ---- energy curves (schematic) ---- */
  const seg=h=>WO_SEG.find(s=>h>=s.a&&h<s.b)||WO_SEG[WO_SEG.length-1];
  function energy(mask){const pts=[];let e=1;const dt=.05;
    for(let h=7;h<=23+1e-9;h+=dt){pts.push([h,e]);const s=seg(h);
      if(s.home){const rec=mask?(h<19?0:.06):.08;e=Math.min(1,e+rec*dt)}
      else e=Math.max(.04,e-(mask?(.035+.1*s.d):(.02+.05*s.d))*dt)}
    return pts}
  const EM=energy(true),EF=energy(false);
  const eAt=(P,h)=>P[clamp(Math.round((h-7)/.05),0,P.length-1)][1];
  const recBy=P=>{for(const[h,e]of P)if(h>=17&&e>=.9)return h;return null};

  /* ---- preference chart ---- */
  const pf=$('#woPref');
  function drawPref(){const N=vb(pf,'720 262','400 392');let s='';
    const x0=N?16:250,x1=N?340:630,X=v=>lerp(x0,x1,v/100);
    const rows=[{h:'Across studies in a 19-study review (Schuck 2025): % rating terms acceptable'},{l:'Identity-first terms',a:40,b:97,k:0},{l:'Person-first terms',a:5,b:53,k:1},
      {h:'UK autistic adults: % endorsing functioning labels'},{l:'"high-functioning"',b:20,approx:1},{l:'"low-functioning"',b:10,lt:1}];
    let y=N?20:26;
    for(let v=0;v<=100;v+=20)s+=`<text x="${f1(X(v))}" y="${N?384:256}" class="t-xs t-mid">${v}%</text>`;
    rows.forEach(r=>{
      if(r.h){if(y>30)y+=N?6:10;s+=`<text x="${N?16:16}" y="${y+4}" class="t-sm" style="fill:var(--ink);font-weight:600">${N?r.h.replace(': ',':|').split('|').map((q,i)=>`<tspan x="16" dy="${i?13:0}">${q}</tspan>`).join(''):r.h}</text>`;y+=N?38:30;return}
      const on=r.k!=null&&r.k===woPF,col=r.k==null?'var(--muted)':on?'var(--brand)':'var(--accent)';
      if(N){s+=`<text x="16" y="${y}" class="t-sm" style="fill:var(--ink)">${r.l}${on?' · this page':''}</text>`;y+=8}
      else s+=`<text x="${x0-12}" y="${y+12}" class="t-sm t-end" style="fill:var(--ink)">${r.l}${on?' ◂':''}</text>`;
      s+=`<line x1="${x0}" x2="${x1}" y1="${y+8}" y2="${y+8}" style="stroke:var(--line);stroke-width:8;stroke-linecap:round"/>`;
      const a=r.a==null?0:r.a;
      s+=`<rect x="${f1(X(a))}" y="${y}" width="${f1(X(r.b)-X(a))}" height="16" rx="8" style="fill:${col};opacity:${on||r.k==null?.95:.6}"/>`;
      const lab=r.a!=null?`${r.a}–${r.b}%`:(r.lt?'under 10%':'about 20%');
      s+=`<text x="${f1(X(r.b)+8)}" y="${y+12}" class="t-sm" style="fill:var(--ink);font-weight:700">${lab}</text>`;
      y+=N?40:34});
    for(let v=0;v<=100;v+=20)s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${N?40:20}" y2="${N?370:244}" class="grid"/>`;
    pf.innerHTML=s}

  /* ---- main scrubber: diffusion chains ---- */
  const svg=$('#woSvg'),rg=$('#woT'),note=$('#woNote');
  const ROWS=[{a:0,b:.2,mix:0,m:12.96,lab:'r1',sub:'recalled 12.96',dec:.9},{a:.22,b:.42,mix:0,non:1,m:12.40,lab:'',sub:'recalled 12.40',dec:.9},{a:.44,b:.68,mix:1,m:8.92,lab:'r3',sub:'recalled 8.92',dec:.8}];
  function draw(t){
    const N=vb(svg,'720 380','400 620');let s=`<defs>${marker('woAr','var(--muted)')}${marker('woArB','var(--bad)')}</defs>`;
    const L=N?{ry:i=>96+i*162,px:k=>30+k*48,ps:30,lx:16,bx0:30,bx1:330,by:44}:{ry:i=>66+i*110,px:k=>186+k*52,ps:38,lx:14,bx0:574,bx1:704,by:8};
    const BX=v=>lerp(L.bx0,L.bx1,v/30);
    if(!N)s+=`<text x="${L.bx0}" y="26" class="t-xs">mean details recalled</text><text x="${L.bx0}" y="38" class="t-xs">(of 30)</text>`;
    ROWS.forEach((R,i)=>{const y=L.ry(i),p=ramp(t,R.a,R.b),pos=p*7,act=t>=R.a-.001;
      const lab=i===0?woW('r1'):i===1?'Chain 2 · non-autistic people':(N?woW('r3n'):woW('r3'));
      if(N){s+=`<text x="${L.lx}" y="${y-58}" class="t-lbl">${lab}</text>`;if(i===2)s+=`<text x="${L.lx}" y="${y-44}" class="t-xs">alternating: ${woW('g1')} and not</text>`}
      else{const w=lab.split(' · ');s+=`<text x="${L.lx}" y="${y+8}" class="t-lbl">${w[0]}</text>`;
        const ws=w[1].split(' ');let ln=[''];ws.forEach(q=>{if((ln[ln.length-1]+' '+q).trim().length>24)ln.push(q);else ln[ln.length-1]=(ln[ln.length-1]+' '+q).trim()});
        ln.forEach((q,k)=>s+=`<text x="${L.lx}" y="${y+23+k*12}" class="t-xs">${q}</text>`)}
      /* people */
      for(let k=0;k<8;k++){const aut=R.mix?k%2===0:!R.non,col=aut?'var(--brand)':'var(--accent)',heard=act&&k<=pos+.02;
        s+=person(L.px(k),y,L.ps,col,{op:heard?1:.35})}
      /* passes between neighbours */
      for(let k=0;k<7;k++){if(!act||pos<k+.95)continue;const xa=L.px(k)+L.ps*.32,xb=L.px(k+1)-L.ps*.32,ym=y+L.ps*.55;
        if(R.mix&&t>=R.a){s+=`<path d="M${f1(xa)} ${f1(ym-4)}L${f1((xa+xb)/2-3)} ${f1(ym-4)}M${f1((xa+xb)/2+3)} ${f1(ym-4)}L${f1(xb)} ${f1(ym-4)}" style="stroke:var(--bad);stroke-width:1.4;stroke-dasharray:3 2" marker-end="url(#woArB)"/><path d="M${f1(xb)} ${f1(ym+4)}L${f1((xa+xb)/2+3)} ${f1(ym+4)}M${f1((xa+xb)/2-3)} ${f1(ym+4)}L${f1(xa)} ${f1(ym+4)}" style="stroke:var(--bad);stroke-width:1.4;stroke-dasharray:3 2" marker-end="url(#woArB)"/>`}
        else s+=`<path d="M${f1(xa)} ${f1(ym)}L${f1(xb)} ${f1(ym)}" style="stroke:var(--muted);stroke-width:1.4" marker-end="url(#woAr)"/>`}
      /* the travelling bubble with a schematic detail bar */
      if(act&&p<1){const k=Math.floor(pos),u=pos-k,bx=lerp(L.px(k),L.px(Math.min(7,k+1)),ease(u)),det=Math.pow(R.dec,pos),bw=N?40:46,bh=N?18:20,byy=y-bh-(N?14:12);
        s+=bubble(bx-bw/2,byy,bw,bh,{tail:'down',col:R.mix?'var(--bad)':'var(--line)',broken:R.mix&&u>.3&&u<.7});
        s+=`<rect x="${f1(bx-bw/2+6)}" y="${f1(byy+bh/2-3)}" width="${f1((bw-12)*det)}" height="6" rx="3" style="fill:${R.mix?'var(--bad)':'var(--brand)'}"/>`}
      /* published mean */
      const bp=ramp(t,R.b-.03,R.b+.02);
      if(bp>0){const by=N?y+L.by:y+L.by;
        s+=`<rect x="${L.bx0}" y="${by}" width="${f1((BX(R.m)-L.bx0)*ease(bp))}" height="16" rx="4" style="fill:${R.mix?'var(--bad)':i===0?'var(--brand)':'var(--accent)'};opacity:.85"/>`;
        s+=`<line x1="${f1(BX(30))}" x2="${f1(BX(30))}" y1="${by-2}" y2="${by+18}" style="stroke:var(--muted);stroke-dasharray:2 2"/>`;
        if(bp>.6)s+=`<text x="${f1(BX(R.m)+6)}" y="${by+12}" class="t-sm" style="fill:var(--ink);font-weight:700">${R.m.toFixed(2)}</text>`;
        if(N&&bp>.6)s+=`<text x="${f1(BX(30))}" y="${by+12}" class="t-xs t-end">of 30</text>`}
      /* rapport */
      if(t>=.7){const hi=!R.mix,op=clamp((t-.7)/.04);const rx=N?L.lx:L.bx0,ry=N?y+L.by+34:y+L.by+36;
        s+=`<g style="opacity:${f1(op)}"><text x="${rx}" y="${ry}" class="t-xs" style="fill:${hi?'var(--good)':'var(--warn)'};font-weight:600">rapport: ${hi?'higher':'lower'}${t>=.86&&i===1?' (2025: highest)':''}</text></g>`}
    });
    /* 2025 replication stamp */
    if(t>=.86){const op=clamp((t-.86)/.05),x=N?16:574,y=N?516:300,w=N?368:136,h=N?50:66;
      s+=`<g style="opacity:${f1(op)}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" style="fill:var(--warn-soft);stroke:var(--warn)"/>`;
      const T=N?['2025 replication, N = 311:','no difference in information transfer','between same and mixed chains']:['2025 replication','N = 311: no','difference in','information transfer'];
      T.forEach((q,k)=>s+=`<text x="${x+8}" y="${y+15+k*(N?13:13)}" class="t-xs" style="fill:var(--warn);${k===0?'font-weight:700':''}">${q}</text>`);s+='</g>'}
    s+=`<g transform="translate(${N?16:186} ${N?600:368})">${person(0,-12,14,'var(--brand)')}<text x="10" y="0" class="t-xs">${woW('g1')}</text>${person(N?110:120,-12,14,'var(--accent)')}<text x="${N?120:130}" y="0" class="t-xs">non-autistic</text><line x1="${N?220:236}" x2="${N?244:260}" y1="-4" y2="-4" style="stroke:var(--bad);stroke-width:1.4;stroke-dasharray:3 2"/><text x="${N?248:264}" y="0" class="t-xs">${N?'misread,':'misunderstood, both ways'}</text>${N?'<text x="248" y="12" class="t-xs">both ways</text>':''}</g>`;
    svg.innerHTML=s;
    const ph=phaseOf(WO_STEPS,t),P=WO_STEPS[ph];note.innerHTML=noteHTML({k:P.k,t:woFill(P.t),txt:woFill(P.txt),pt:woFill(P.pt),hook:woFill(P.hook)});setA(ph)}
  const stop=playWire(rg,$('#woPlay'),draw,16000,'%t:player.replay%','words');
  const setA=stepWire($('#woSteps'),WO_STEPS,rg,draw,stop);

  /* ---- the masking day ---- */
  const dy=$('#woDay'),hr=$('#woH'),dn=$('#woDayNote');let mask=true;
  const clock=h=>{const H=Math.floor(h),M=Math.floor((h-H)*60/15)*15;return `${H}:${String(M).padStart(2,'0')}`};
  function drawDay(t){const N=vb(dy,'720 300','400 452');const h=lerp(7,23,clamp(t)),S=seg(h),P=mask?EM:EF,e=eAt(P,h);let s='';
    const fx=N?78:96,fy=N?96:118,fr=N?38:44;
    s+=`<text x="${N?16:20}" y="${N?26:28}" class="t-big">${clock(h)}</text><text x="${N?16:20}" y="${N?44:46}" class="t-sm" style="fill:var(--ink)">${S.n}</text>`;
    const social=!S.home&&S.d>=.4,earDef=!mask&&S.d>=.9;
    s+=face(fx,fy,fr,{mouth:mask&&social?'flat':S.home&&!mask?'smile':S.home?'flat':'flat',brows:e<.35?'tense':'calm',gaze:mask&&social?null:20,ear:earDef});
    if(mask&&!S.home&&S.d>0){/* the mask: an outward smile held over the face */
      s+=`<path d="M${f1(fx-fr*.95)} ${f1(fy-fr*.15)}Q${f1(fx)} ${f1(fy-fr*.42)} ${f1(fx+fr*.95)} ${f1(fy-fr*.15)}Q${f1(fx+fr*.9)} ${f1(fy+fr*.95)} ${f1(fx)} ${f1(fy+fr*1.0)}Q${f1(fx-fr*.9)} ${f1(fy+fr*.95)} ${f1(fx-fr*.95)} ${f1(fy-fr*.15)}Z" style="fill:var(--bubble);stroke:var(--muted);stroke-width:1.4;opacity:.9"/>`;
      [-1,1].forEach(k=>s+=`<ellipse cx="${f1(fx+k*fr*.36)}" cy="${f1(fy+fr*.02)}" rx="${f1(fr*.16)}" ry="${f1(fr*.1)}" style="fill:var(--ink);opacity:.75"/>`);
      s+=`<path d="M${f1(fx-fr*.3)} ${f1(fy+fr*.42)}Q${f1(fx)} ${f1(fy+fr*.7)} ${f1(fx+fr*.3)} ${f1(fy+fr*.42)}" style="fill:none;stroke:var(--ink);stroke-width:2.4;stroke-linecap:round"/>`;
      s+=`<text x="${fx}" y="${fy+fr+18}" class="t-xs t-mid">mask on</text>`}
    else if(!mask&&!S.home&&S.d>0)s+=`<text x="${fx}" y="${fy+fr+18}" class="t-xs t-mid">${earDef?'ear defenders, quiet corner':'stimming is fine here'}</text>`;
    else s+=`<text x="${fx}" y="${fy+fr+18}" class="t-xs t-mid">${S.home?(mask&&h<19?'crash: needs to be alone':'recharging'):''}</text>`;
    /* battery */
    const bx=N?286:96,by=N?96:236,br=N?52:56;
    s+=dial(bx,by,br,e,{battery:true,label:'energy (schematic)'});
    /* plot */
    const P0=N?{x0:40,x1:384,y0:200,y1:420}:{x0:250,x1:704,y0:24,y1:250};
    const X=q=>lerp(P0.x0,P0.x1,(q-7)/16),Y=q=>lerp(P0.y1,P0.y0,q);
    WO_SEG.forEach(g=>{if(g.d>0)s+=`<rect x="${f1(X(g.a))}" y="${P0.y0}" width="${f1(X(g.b)-X(g.a))}" height="${P0.y1-P0.y0}" style="fill:var(--warn);opacity:${f1(.04+.16*g.d)}"/>`});
    s+=`<rect x="${f1(X(17))}" y="${P0.y0}" width="${f1(X(23)-X(17))}" height="${P0.y1-P0.y0}" style="fill:var(--calm);opacity:.07"/>`;
    s+=`<text x="${f1(X(12.5))}" y="${P0.y0+12}" class="t-xs t-mid" style="fill:var(--warn)">lunch</text><text x="${f1(X(20))}" y="${P0.y0+12}" class="t-xs t-mid" style="fill:var(--calm)">home</text>`;
    for(let q=8;q<=22;q+=N?4:2)s+=`<line x1="${f1(X(q))}" x2="${f1(X(q))}" y1="${P0.y1}" y2="${P0.y1+4}" style="stroke:var(--muted)"/><text x="${f1(X(q))}" y="${P0.y1+16}" class="t-xs t-mid">${q}:00</text>`;
    s+=`<line x1="${P0.x0}" x2="${P0.x1}" y1="${P0.y1}" y2="${P0.y1}" style="stroke:var(--muted)"/><text x="${P0.x0-4}" y="${Y(1)+4}" class="t-xs t-end">full</text><text x="${P0.x0-4}" y="${Y(0)}" class="t-xs t-end">low</text>`;
    const path=(Q,hm)=>Q.filter(p=>p[0]<=hm+1e-9).map((p,i)=>(i?'L':'M')+f1(X(p[0]))+' '+f1(Y(p[1]))).join('');
    [[EM,true,'var(--brand)','masking'],[EF,false,'var(--rx)','able to unmask']].forEach(([Q,m,c,l])=>{const sel=m===mask;
      s+=`<path d="${path(Q,23)}" style="fill:none;stroke:${c};stroke-width:1.4;opacity:.3;stroke-dasharray:4 3"/>`;
      if(sel)s+=`<path d="${path(Q,h)}" style="fill:none;stroke:${c};stroke-width:3;stroke-linejoin:round"/>`;
      const ey=Y(Q[Q.length-1][1]);s+=`<text x="${P0.x1}" y="${f1(ey+(m?14:-8))}" class="t-xs t-end" style="fill:${c};${sel?'font-weight:700':''}">${l}</text>`});
    s+=`<line x1="${f1(X(h))}" x2="${f1(X(h))}" y1="${P0.y0}" y2="${P0.y1}" style="stroke:var(--ink);opacity:.4"/><circle cx="${f1(X(h))}" cy="${f1(Y(e))}" r="5" style="fill:${mask?'var(--brand)':'var(--rx)'};stroke:var(--panel);stroke-width:1.5"/>`;
    const rb=recBy(P);if(h>=17){const tx=rb?`back to ~90% by ${clock(rb)}`:'still recovering at bedtime';s+=`<text x="${P0.x1-4}" y="${P0.y0+28}" class="t-xs t-end" style="fill:var(--ink);font-weight:600">${tx}</text>`}
    dy.innerHTML=s;
    /* note */
    let k=`${clock(h)} · ${S.n}`,ti,tx,pt,hk;
    if(S.home){ti=mask?'The cost comes due':'Recovery';
      tx=mask?`In a survey of 277 ${woW('a')}, camouflaging was described as both protective (access to social spaces, safety) and harmful (exhaustion, isolation, loss of identity, delayed diagnosis); the time spent camouflaging seemed most damaging. ${woW('A')} describe autistic burnout as chronic exhaustion, loss of skills and reduced tolerance to stimuli. <span class="ev early">Early evidence</span> [[Bradley2021,Raymaker2020]]`
        :`Unmasking and acceptance were linked with recovery from autistic burnout. Places where people can relax and be themselves help. <span class="ev early">Early evidence</span> [[Raymaker2020,Bradley2021]]`;
      pt=mask?'After a day of hiding, many people need long, quiet time alone before they feel like themselves again.':'When people can be themselves during the day, there is more left at the end of it.';
      hk=`Autistic burnout (Raymaker 2020): chronic exhaustion, loss of skills, reduced tolerance to stimuli. [[Raymaker2020]]`}
    else{ti=mask?'Masking':'Able to unmask';
      tx=mask?`Camouflaging is motivated by fitting in and connecting with others, and done by masking and compensation; its consequences include exhaustion. ${S.d>=.9?'Unstructured social time asks the most of the mask in this made-up day. ':''}Higher self-reported camouflaging goes with worse mental health in a review of 29 studies, though samples were not representative. [[Hull2017,Cook2021Camouflaging]]`
        :`The same day with fewer demands to hide: ${S.d>=.9?'ear defenders and a quiet corner at lunch, ':''}room to stim, and people who know. Camouflaging can be protective, so being able to unmask depends on the place being safe and accepting. [[Bradley2021,Lai2014]]`;
      pt=mask?'Masking means hiding or covering autistic traits to fit in. It can work in the moment and still use up a lot of energy.':'Unmasking is not a switch a person flips alone: it depends on the people and the place around them.';
      hk=`CAT-Q: 25 items, three factors (compensation, masking, assimilation); a research measure, not a diagnostic test. [[Hull2019CATQ]]`}
    dn.innerHTML=noteHTML({k,t:ti,txt:tx,pt,hook:hk})}
  const stopD=playWire(hr,$('#woDayPlay'),drawDay,12000,'%t:player.replay%','words');
  $$('[data-wom]').forEach(b=>b.addEventListener('click',()=>{mask=b.dataset.wom==='mask';$$('[data-wom]').forEach(q=>q.setAttribute('aria-pressed',q===b));drawDay(+hr.value)}));

  /* ---- the wording switch ---- */
  function applyWords(){$$('.wo-w',sec).forEach(el=>{el.textContent=woW(el.dataset.w)});
    $$('[data-wolang]').forEach(b=>b.setAttribute('aria-pressed',(b.dataset.wolang==='pf')===!!woPF));
    $$('#woSteps [data-st] span').forEach((sp,i)=>sp.textContent=woFill(WO_STEPS[i].t));
    drawPref();draw(+rg.value);drawDay(+hr.value)}
  $$('[data-wolang]').forEach(b=>b.addEventListener('click',()=>{woPF=b.dataset.wolang==='pf'?1:0;store.set('wording',woPF);applyWords()}));
  woPF=store.get('wording',0)?1:0;
  applyWords();
  const pr=redraws.words;redraws.words=()=>{pr&&pr();drawPref()};
};
