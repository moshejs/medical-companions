/* =============== 3.3 Skin, scars & bruising =============== */
inits.skin=()=>{
  const svg=$('#skSvg'),rg=$('#skT');
  let ty='c';

  /* ---------- the four skins (lifts are illustrative; cut-offs and features cited in the notes) ---------- */
  const TYPES={
    typ:{n:'Typical skin',col:'var(--good)',lift:1.0,thin:false,cut:6,scar:.05,bruise:.22,recoil:1,
      f:['stops below the cut-off','heals to a fine line','bruises only with real knocks']},
    h:{n:'Hypermobile EDS',col:'var(--dx)',lift:1.6,thin:false,cut:9,scar:.32,bruise:.45,recoil:1,
      f:['soft, velvety, mildly stretchy','atrophic scars possible, not papyraceous','true fragility is not typical']},
    c:{n:'Classical EDS',col:'var(--variant)',lift:3.0,thin:false,cut:22,scar:1,bruise:.72,recoil:1.25,
      f:['stretches far, snaps back','splits after minor trauma','wide, thin atrophic scars']},
    v:{n:'Vascular EDS',col:'var(--vas)',lift:.8,thin:true,cut:8,scar:.22,bruise:1,recoil:1,
      f:['thin, translucent, veins visible','not markedly stretchy','bruises without trauma']}};

  const STEPS=[
    {from:0,at:.08,k:'Step 1 · pinch',t:'Pinch',
     txt:`Skin hyperextensibility is measured by lifting the skin between finger and thumb. The cut-offs restated from the 2017 criteria are 1.5 cm at the distal forearms and the back of the hands, and 3 cm at the neck, elbows and knees. A dermatology review describes lifting from the back of the non-dominant distal forearm. [[Ritelli2020C,Stembridge2023,Malfait2017]]`,
     pt:`A doctor gently pinches and lifts the skin on the back of the forearm or hand to see how far it stretches. Stretchy skin on its own does not mean EDS, and this is not a test to do on yourself.`,
     hook:`Skin hyperextensibility cut-offs: 1.5 cm at the distal forearm and back of the hand; 3 cm at the neck, elbows and knees. [[Ritelli2020C,Stembridge2023]]`},
    {from:.15,at:.28,k:'Step 2 · stretch',t:'Stretch',
     txt:`Classical EDS skin is soft, velvety or doughy and hyperextensible, lifting well past the cut-off. hEDS skin is milder in every respect: soft or velvety with mild hyperextensibility. vEDS usually lacks marked hyperextensibility. Stretchiness rises with joint hypermobility: in benign joint hypermobility, forearm skin extensibility was 3.6 cm vs 1.3 cm in controls. [[MalfaitGR-cEDS,Stembridge2023,Magnusson2001]]`,
     pt:`In classical EDS the skin can be pulled much further than usual. In hypermobile EDS it is a little stretchy and feels soft. In vascular EDS it hardly stretches, but it is thin.`,
     hook:`cEDS major criteria: generalised joint hypermobility plus skin hyperextensibility with atrophic scarring. [[VanDijk2024]]`},
    {from:.34,at:.42,k:'Step 3 · release',t:'Release',
     txt:`Let go, and classical EDS skin snaps back: it is elastic, not loose. That is the difference from the sagging, redundant skin of dermatosparaxis EDS, or the acquired cutis laxa and premature ageing seen in 41.3% of a cEDS cohort. On 20-MHz ultrasound, skin was thinner than normal in cEDS and hEDS. [[MalfaitGR-cEDS,Stembridge2023,Ritelli2020C,Eisenbeiss2003]]`,
     pt:`Stretchy skin in classical EDS springs straight back when you let go, like a rubber band, rather than hanging loose.`,
     hook:`dEDS: ADAMTS-2 deficiency, extreme fragility and redundant, sagging skin at wrists and ankles. [[VanDamme2016,Stembridge2023]]`},
    {from:.48,at:.56,k:'Step 4 · minor cut',t:'A minor injury',
     txt:`cEDS skin splits after minor trauma, especially over pressure points and the shins, and the wound gapes. In the col5a1+/− mouse model of cEDS, both normal and wounded skin had lower tensile strength. True skin fragility, such as an open wound from trivial trauma, is not a typical feature of hEDS. [[MalfaitGR-cEDS,Wenstrup2006,Stembridge2023]]`,
     pt:`In classical EDS a small knock can split the skin open, often on the shins, knees or elbows. In hypermobile EDS this kind of splitting is not usual.`,
     hook:`Skin fragility (an open wound from trivial trauma) points away from hEDS and towards cEDS or other types. [[Stembridge2023]]`},
    {from:.62,at:.72,k:'Step 5 · healing',t:'Healing: a fine line or a wide scar',
     txt:`Delayed healing with atrophic scars is a hallmark of cEDS: 92% of 75 confirmed people had extensive, widened atrophic scars, papyraceous in 65.3%, haemosiderotic in 54.7% and "cigarette paper" in 40%. The hEDS checklist allows atrophic scars at two or more sites without papyraceous or haemosiderin scars. vEDS scars are narrower than in cEDS. [[Malfait2020,Ritelli2020C,Stembridge2023,Malfait2017]]`,
     pt:`Cuts in classical EDS often heal into wide, thin, shiny scars that look like crumpled paper, so wounds need extra care.`,
     hook:`cEDS signature: hyperextensible skin plus widened atrophic (papyraceous, haemosiderotic) scars, in 92% of confirmed cases. [[Ritelli2020C]]`},
    {from:.8,at:.92,k:'Step 6 · bruise',t:'Bruising',
     txt:`Easy bruising occurs to a variable degree in all types, from fragile capillaries and perivascular tissue; clotting tests are usually normal. vEDS bruising occurs without trauma and at unusual sites such as the cheeks and back, and its thin, translucent skin shows the veins beneath, most on the backs of the hands, upper chest and shoulders. In a bleeding-score study, 62% of people with EDS scored abnormal vs 0% of controls. [[DePaepe2004,Stembridge2023,Kumskova2023]]`,
     pt:`Bruises come easily because tiny blood vessels and the tissue around them are fragile, even though blood clotting tests are usually normal.`,
     hook:`EDS bruising: normal clotting factors, platelets and bleeding time; only the Hess (Rumpel-Leede) test may be abnormal. [[DePaepe2004]]`}];
  const setSt=stepWire($('#skSteps'),STEPS,rg,t=>draw(t),()=>stop());

  /* ---------- timeline ---------- */
  function pullOf(t,T){if(t<.15)return .25*ease(ramp(t,0,.12));if(t<.34)return lerp(.25,1,ease(ramp(t,.15,.3)));
    /* release: overshoot below zero for elastic cEDS skin */
    const r=ramp(t,.34,.46);return Math.max(0,(1-ease(r))+(T.recoil>1?-.04*Math.sin(r*Math.PI*2)*(1-r):0))}

  function draw(t){const N=vb(svg,'720 380','400 560'),W=N?400:720,T=TYPES[ty],ph=phaseOf(STEPS,t);
    const x0=N?16:24,w=N?368:440,y0=N?280:262,H=N?118:96,ppc=N?40:38;
    const pull=pullOf(t,T),maxPx=T.lift*ppc,liftCm=T.lift*clamp(pull);
    const cutO=ease(ramp(t,.49,.56))*(1-ease(ramp(t,.63,.74))),heal=ease(ramp(t,.63,.76)),br=ease(ramp(t,.8,.92));
    let s=`<text x="16" y="28" class="t-big">${STEPS[ph].t}</text>`;
    if(!N)s+=`<text x="${W-16}" y="28" class="t-sm t-end">${T.n} · ${ph+1} / 6</text>`;
    /* ruler and threshold */
    const rx=x0+w/2+(N?70:84);
    for(let c=0;c<=3;c+=.5){const yy=y0-c*ppc;if(yy<52)break;s+=`<line x1="${rx}" y1="${f1(yy)}" x2="${rx+(c%1?5:9)}" y2="${f1(yy)}" style="stroke:var(--muted);stroke-width:1"/>`;if(c%1===0&&c>0)s+=`<text x="${rx+12}" y="${f1(yy+4)}" class="t-xs">${c} cm</text>`}
    s+=`<line x1="${rx}" y1="${y0}" x2="${rx}" y2="${f1(y0-3*ppc)}" style="stroke:var(--muted);stroke-width:1"/>`;
    const thY=y0-1.5*ppc;s+=`<line x1="${x0}" y1="${f1(thY)}" x2="${x0+w}" y2="${f1(thY)}" style="stroke:var(--accent);stroke-width:1.4;stroke-dasharray:6 4"/><text x="${x0+4}" y="${f1(thY-6)}" class="t-xs" style="fill:var(--accent);font-weight:600">1.5 cm cut-off</text>`;
    /* the skin */
    const sk=skin(x0,y0,w,{h:H,pull:clamp(pull),max:maxPx,thin:T.thin,fingers:pull>.02,scar:heal>0?Math.max(.001,heal*T.scar):0,bruise:br*T.bruise});
    s+=sk.svg;
    /* the cut: a V notch that gapes by type, then fills in as the scar forms */
    if(cutO>.01){const cx=x0+w*.75,g=T.cut*cutO,dep=H*(T.thin?.28:.42)*cutO;
      s+=`<path d="M${f1(cx-g/2-2)} ${y0}L${f1(cx)} ${f1(y0+dep)}L${f1(cx+g/2+2)} ${y0}Z" style="fill:var(--blood);opacity:.8;stroke:var(--skin-line);stroke-width:1"/>`;
      for(let i=0;i<3;i++)s+=`<circle cx="${f1(cx-4+i*4)}" cy="${f1(y0-3-i%2*3)}" r="${f1(1.6+cutO)}" style="fill:var(--blood);opacity:${f1(cutO*.8)}"/>`}
    if(heal>.6&&ty==='typ'){const cx=x0+w*.75;s+=`<line x1="${f1(cx-6)}" y1="${y0+.5}" x2="${f1(cx+6)}" y2="${y0+.5}" style="stroke:var(--skin-line);stroke-width:1.6"/>`}
    /* labels */
    const lx=x0+w+(N?0:12);
    if(!N){s+=`<text x="${x0+w+8}" y="${y0+8}" class="t-xs">epidermis</text><text x="${x0+w+8}" y="${f1(y0+H*(T.thin?.22:.36))}" class="t-xs">dermis</text><text x="${x0+w+8}" y="${f1(y0+H*.8)}" class="t-xs">fat</text>`}
    if(T.thin)s+=`<text x="${x0+8}" y="${f1(y0+H*.3+4)}" class="t-xs" style="fill:var(--vessel)">vein shows through</text>`;
    if(heal>.3)s+=`<text x="${f1(x0+w*.75)}" y="${f1(y0+H+16)}" class="t-xs t-mid" style="fill:var(--ink)">${ty==='typ'?'fine scar':ty==='c'?'widened atrophic scar':'atrophic scar'}</text>`;
    if(br>.3)s+=`<text x="${f1(x0+w*.25)}" y="${f1(y0+H+16)}" class="t-xs t-mid" style="fill:var(--nerve)">bruise${ty==='v'?' (no trauma)':''}</text>`;
    /* lift readout bubble at the apex */
    if(pull>.05){const ay=sk.top,over=liftCm>1.5;s+=`<rect x="${f1(x0+w/2-34)}" y="${f1(ay-62)}" width="68" height="20" rx="10" style="fill:var(--panel);stroke:${over?'var(--variant)':'var(--line)'};stroke-width:1.4"/><text x="${f1(x0+w/2)}" y="${f1(ay-48)}" class="t-sm t-mid" style="fill:${over?'var(--variant)':'var(--ink)'};font-weight:600">${liftCm.toFixed(1)} cm</text>`}
    /* side panel (wide) or lower panel (narrow) */
    const px=N?16:530,py=N?416:64,pw=N?368:174;
    s+=`<rect x="${px}" y="${py}" width="${pw}" height="${N?142:270}" rx="12" style="fill:var(--field);stroke:${T.col};stroke-width:1.4"/>`;
    s+=`<text x="${px+14}" y="${py+24}" class="t-lbl" style="fill:${T.col}">${T.n}</text>`;
    const maxNow=Math.max(liftCm,0);
    s+=`<text x="${px+14}" y="${py+44}" class="t-xs">lift now / at full stretch</text><text x="${px+14}" y="${py+64}" class="t-big" style="font-size:20px">${maxNow.toFixed(1)} / ${T.lift.toFixed(1)} cm</text>`;
    const over=T.lift>1.5;s+=`<text x="${px+14}" y="${py+82}" class="t-xs" style="fill:${over?'var(--variant)':'var(--good)'};font-weight:600">${over?'past':'below'} the 1.5 cm cut-off</text>`;
    if(N){T.f.forEach((f,i)=>{s+=`<text x="${px+14}" y="${py+104+i*14}" class="t-sm" style="fill:var(--ink)">· ${f}</text>`})}
    else{T.f.forEach((f,i)=>{const words=f.split(' ');let l1='',l2='';words.forEach(wd=>{(l1+' '+wd).trim().length<=26&&!l2?l1=(l1+' '+wd).trim():l2=(l2+' '+wd).trim()});
      const yy=py+112+i*44;s+=`<text x="${px+14}" y="${yy}" class="t-xs" style="fill:var(--ink)">· ${l1}</text>`;if(l2)s+=`<text x="${px+22}" y="${yy+13}" class="t-xs" style="fill:var(--ink)">${l2}</text>`});
      s+=`<text x="${px+14}" y="${py+256}" class="t-xs">illustrative lift</text>`}
    svg.innerHTML=s;setSt(ph);
    $('#skNote').innerHTML=noteHTML(STEPS[ph]);
    $('#skRead').innerHTML=`<span>skin <b>${T.n}</b></span><span>lift <b>${liftCm.toFixed(1)} cm</b></span><span>scar <b>${heal>.3?(ty==='typ'?'fine line':ty==='c'?'widened, atrophic':'atrophic, narrower'):'none yet'}</b></span><span>bruise <b>${br>.3?(ty==='v'?'large, spontaneous':ty==='typ'?'small':'moderate'):'none yet'}</b></span>`}
  const stop=playWire(rg,$('#skPlay'),draw,20000,'%t:player.replay%','skin');
  $$('[data-sktype]').forEach(b=>b.addEventListener('click',()=>{ty=b.dataset.sktype;$$('[data-sktype]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---------- flip cards ---------- */
  $$('#skCards .fc').forEach(c=>c.addEventListener('click',()=>{const on=c.getAttribute('aria-pressed')!=='true';c.setAttribute('aria-pressed',on);c.classList.toggle('flip',on)}));

  /* ---------- matching exercise ---------- */
  const OPTS=[['typ','Not specific (common without EDS)'],['h','Hypermobile EDS'],['c','Classical EDS'],['v','Vascular EDS'],['d','Dermatosparaxis EDS']];
  const Q=[
    {q:'Thin, translucent skin with veins visible on the chest and backs of the hands',a:'v',why:`Typical of vEDS, which usually lacks marked hyperextensibility. [[Stembridge2023]]`},
    {q:'Wide, paper-thin (papyraceous) or brown-stained (haemosiderotic) scars',a:'c',why:`Widened atrophic scars were present in 92% of confirmed cEDS; the hEDS checklist excludes papyraceous and haemosiderin scars. [[Ritelli2020C,Stembridge2023]]`},
    {q:'Tears at or after birth, with redundant, sagging skin at the wrists and ankles',a:'d',why:`Extreme, premature fragility and redundant skin mark dEDS (ADAMTS-2 deficiency). [[Stembridge2023,VanDamme2016]]`},
    {q:'Soft, velvety skin, only mildly stretchy, with unexplained stretch marks',a:'h',why:`These are 2017 hEDS skin items; hEDS skin is milder than cEDS in every respect. [[Stembridge2023,Malfait2017]]`},
    {q:'Fleshy nodules with scars over the elbows and knees (molluscoid pseudotumours)',a:'c',why:`Rare, but highly diagnostic of cEDS. [[Ritelli2020C,Stembridge2023]]`},
    {q:'Bruises on the cheeks and back without any injury',a:'v',why:`vEDS bruising occurs without trauma and at unusual sites. [[Stembridge2023]]`},
    {q:'Soft bumps on the heels that appear on standing (piezogenic papules)',a:'typ',why:`72% of healthy children had at least one, and hypermobile children had no more than others, so the sign is not specific, though it is frequent in cEDS (86.7%). [[vanStraaten1991,Ritelli2020C]]`}];
  const box=$('#skMatch');
  box.innerHTML=Q.map((x,i)=>`<div class="sk-row" id="skRow${i}"><p id="skQ${i}l">${i+1}. ${x.q}</p><select id="skQ${i}" aria-labelledby="skQ${i}l"><option value="">Choose a type…</option>${OPTS.map(o=>`<option value="${o[0]}">${o[1]}</option>`).join('')}</select><div class="fb" id="skFb${i}"></div></div>`).join('');
  function score(){let right=0,done=0;Q.forEach((x,i)=>{const v=$('#skQ'+i).value,row=$('#skRow'+i);row.classList.remove('ok','no');
      if(!v){$('#skFb'+i).innerHTML='';return}done++;const ok=v===x.a;if(ok)right++;row.classList.add(ok?'ok':'no');
      $('#skFb'+i).innerHTML=`<b>${ok?'Right.':'Not quite: '+OPTS.find(o=>o[0]===x.a)[1]+'.'}</b> ${x.why}`});
    $('#skScore').innerHTML=`<span>answered <b>${done} of ${Q.length}</b></span><span>correct <b>${right}</b></span>`}
  Q.forEach((x,i)=>$('#skQ'+i).addEventListener('change',score));
  score();
};
