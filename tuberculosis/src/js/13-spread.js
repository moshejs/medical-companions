/* =============== 1.3 How TB spreads =============== */
/* Ventilation presets: air changes per hour (Escombe 2007 Lima measurements; closed = 28/18, derived) */
const SP_VENT={closed:{ach:1.6,n:'closed room'},mech:{ach:12,n:'mechanical ventilation'},open:{ach:28,n:'windows and door open'}};
const SP_Q0=13,SP_V=30,SP_P=.6;           /* source quanta/h (Nardell 1991), room m³ and breathing m³/h (model inputs) */
const SP_STEPS=[
 {from:0,at:.06,k:'Second 0 · one cough',t:'A cough makes droplet nuclei',pre:{vent:'closed',tx:false},
  txt:`A person with TB disease in the lungs coughs. The big droplets fall to the floor within seconds; what matters is what is left in the air. Of the cough particles that carried culturable <i>M. tuberculosis</i> in Kampala, 96.4% were 0.65–4.7 µm across: small enough to stay airborne and be breathed deep into the lung. Across respiratory infections, the pathogens ride mostly in particles under 5 µm. [[Fennelly2012,Fennelly2020]]`,
  pt:`A cough throws out big drops that fall, and tiny dried specks that float. The specks carry TB.`,
  hook:`Droplet nuclei: culturable TB particles 0.65–4.7 µm in 96.4% of cases. Respirable, not large droplets. [[Fennelly2012]]`},
 {from:.12,at:.3,k:'Hours 0–8 · closed room',t:'Shared air, for hours',pre:{vent:'closed',tx:false},
  txt:`With windows and doors shut, the Lima rooms changed their air about 1.6 times an hour (28 ÷ 18, derived), so the nuclei build up. The Wells–Riley model counts infectious doses as <b>quanta</b>: in an office outbreak, one coworker with cavitary TB was estimated to add about 13 quanta an hour, and 27 of 67 workers (40%) converted their skin test over about 4 weeks. Time matters as much as distance. [[Escombe2007,Nardell1991]]`,
  pt:`In a closed room the specks keep piling up. The longer two people share that air, the higher the chance of passing TB on.`,
  hook:`Wells–Riley: P = 1 − e^(−I·q·p·t/Q). Infection rises with quanta (q), breathing (p) and time (t); falls with fresh-air flow (Q).`},
 {from:.4,at:.47,k:'Hours 8–10 · the other person',t:'Breathing is not catching',pre:{vent:'closed',tx:false},
  txt:`The second person breathes the haze, but infection is a probability, not a certainty. Only 28 of 101 people with culture-confirmed TB in Kampala (27.7%) produced any culturable cough aerosol; in households, 69% of contacts of high-aerosol producers were newly infected, against 25–30% for the rest. And most people who become infected never develop TB disease: about a quarter of the world has been infected. [[Fennelly2012,JonesLopez2013,Houben2016]]`,
  pt:`Sharing air with someone who has TB does not mean you will get it. Many people with TB give off very little.`,
  hook:`High-aerosol index case: the only predictor of new household infection, adjusted OR 4.81 (95% CI 1.20–19.23). [[JonesLopez2013]]`},
 {from:.55,at:.62,k:'Hours 10–12 · windows open',t:'Fresh air',pre:{vent:'open',tx:false},
  txt:`Opening windows and doors in Lima hospitals gave a median 28 air changes per hour: more than double the 12 ACH recommended for mechanically ventilated high-risk rooms, and 18 times the closed rate. Pre-1950 rooms with big windows and high ceilings reached 40 ACH. Modelled over 24 hours with the office-outbreak source, 39% of susceptible people would be infected in mechanically ventilated rooms against 11% in old rooms with windows open. With fast air change, the haze clears within minutes. [[Escombe2007]]`,
  pt:`Opening windows and doors swaps the room's air quickly, and it costs nothing.`,
  hook:`Windows and doors open: median 28 ACH vs 12 ACH for mechanical negative-pressure rooms. [[Escombe2007]]`},
 {from:.75,at:.95,k:'Days 0–21 · effective treatment',t:'Treatment started',pre:{vent:'open',tx:true},
  txt:`The biggest lever is the source. In guinea-pig studies, transmission was minimal from 27 people with MDR-TB newly started on <i>effective</i> treatment, and cough-aerosol cultures fell within the first 3 weeks. Sputum smears and cultures turn negative much later, so "still smear-positive" is not the same as "still infectious". Here the source is drawn as a steep fall: the studies say "minimal", not a number. [[Dharmadhikari2014,Fennelly2004]]`,
  pt:`Once someone takes TB medicine that works against their germ, they stop spreading it quickly, long before their tests turn negative.`,
  hook:`Drug susceptibility, not smear status, governs how fast infectiousness falls: rapid DST is an infection-control measure. [[Dharmadhikari2014,Escombe2008]]`}
];
inits.spread=()=>{
  const svg=$('#spSvg'),rg=$('#spT');
  const S={vent:'closed',uv:false,mask:false,tx:false};let lastPh=-1,setSt=()=>{};
  const R=rng(1303),PT=[];for(let i=0;i<110;i++)PT.push({u:R(),v:R(),ph:R()*6.28,sp:.5+R(),bac:R()<.22,r:1.6+R()*1.4});
  const BIG=[],SM=[];for(let i=0;i<12;i++)BIG.push({vx:.25+R()*.55,vy:-.15+R()*.3,r:3.5+R()*2.5});for(let i=0;i<26;i++)SM.push({d:.18+R()*.5,a:(R()-.5)*1.1,r:3+R()*1.5,bac:R()<.3});
  function sync(){$$('[data-spv]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.spv===S.vent));$('#spUv').setAttribute('aria-pressed',S.uv);$('#spMask').setAttribute('aria-pressed',S.mask);$('#spTx').setAttribute('aria-pressed',S.tx)}
  /* time model: hours of shared air and days of treatment from t */
  function clock(t){if(t<.12)return{h:0,lab:'the cough'};if(t<.4){const h=lerp(0,8,ramp(t,.12,.4));return{h,lab:'hour '+f1(h)}}
    if(t<.55){const h=lerp(8,10,ramp(t,.4,.55));return{h,lab:'hour '+f1(h)}}if(t<.75){const h=lerp(10,12,ramp(t,.55,.75));return{h,lab:'hour '+f1(h)}}
    const d=lerp(0,21,ramp(t,.75,1));return{h:12,d,lab:'day '+Math.round(d)+' of treatment'}}
  function model(t){const c=clock(t),ach=SP_VENT[S.vent].ach;
    let txF=1;if(S.tx)txF=c.d!=null?Math.max(.02,Math.exp(-c.d/4)):.05;
    const q=SP_Q0*(S.mask?.44:1)*txF,uvF=S.uv?.3:1;
    const build=t<.12?0:1-Math.exp(-ach*Math.max(c.h,0));
    const C=q/(SP_V*ach)*build,Ceff=C*uvF,risk8=1-Math.exp(-SP_P*8*q*uvF/(SP_V*ach));
    return{c,ach,q,C,Ceff,risk8,build,txF}}
  const Cref=SP_Q0/(SP_V*1.6);
  function draw(t){
    const N=vb(svg,'720 400','400 560');
    const ph=phaseOf(SP_STEPS,t);if(ph!==lastPh){lastPh=ph;const p=SP_STEPS[ph].pre;if(p){S.vent=p.vent;S.tx=p.tx;sync()}}
    const M=model(t),dens=clamp(Math.sqrt(M.Ceff/Cref));
    const L=N?{x0:14,x1:386,y0:44,y1:332,s:112,meter:{x:20,y:394,w:360}}:{x0:24,x1:560,y0:44,y1:338,s:130,meter:{x:590,y:60,w:110}};
    const W=L.x1-L.x0,H=L.y1-L.y0,X=u=>L.x0+u*W,Y=v=>L.y0+v*H;
    const pA={x:X(.2),y:L.y1-L.s},pB={x:X(.8),y:L.y1-L.s},rH=L.s*.17,mA=[pA.x+rH*1.2,pA.y+rH*1.25],mB=[pB.x-rH*1.2,pB.y+rH*1.25];
    let s=`<defs>${marker('spAr','var(--air)')}<clipPath id="spClip"><rect x="${L.x0}" y="${L.y0}" width="${W}" height="${H}"/></clipPath></defs>`;
    /* room shell */
    s+=`<rect x="${L.x0}" y="${L.y0}" width="${W}" height="${H}" style="fill:var(--field);stroke:none"/>`;
    /* haze: grid shading, densest near the source until the air is mixed */
    const mix=t<.12?0:ramp(M.c.h,0,1.2),GX=N?14:22,GY=N?11:10;let hz='';
    for(let i=0;i<GX;i++)for(let j=0;j<GY;j++){const u=(i+.5)/GX,v=(j+.5)/GY,d=Math.hypot((u-.2)*W,(v-.42)*H)/W;
      let f=dens*(lerp(1.6*Math.exp(-d/.18),.75+.5*Math.exp(-d/.5),mix));
      if(S.vent!=='closed')f*=lerp(.8,1.2,u);if(S.uv&&v<.26)f*=.45;
      if(f>.02)hz+=`<rect x="${f1(X(i/GX))}" y="${f1(Y(j/GY))}" width="${f1(W/GX)}" height="${f1(H/GY)}" style="fill:var(--tb);opacity:${f1(clamp(f)*.3*100)/100}"/>`}
    s+=`<g clip-path="url(#spClip)" shape-rendering="crispEdges">${hz}</g>`;
    /* UV band */
    if(S.uv){s+=`<rect x="${L.x0}" y="${L.y0}" width="${W}" height="${f1(H*.26)}" style="fill:var(--vax);opacity:.12"/><line x1="${L.x0}" x2="${L.x1}" y1="${f1(Y(.26))}" y2="${f1(Y(.26))}" style="stroke:var(--vax);stroke-width:1;stroke-dasharray:4 4"/>`;
      [L.x0+4,L.x1-22].forEach((x,i)=>{s+=`<rect x="${f1(x)}" y="${f1(Y(.1))}" width="18" height="10" rx="2" style="fill:var(--vax)"/>`;for(let k=0;k<3;k++)s+=`<line x1="${f1(i?x:x+18)}" y1="${f1(Y(.1)+5)}" x2="${f1(i?x-26:x+44)}" y2="${f1(Y(.1)+5+(k-1)*9)}" style="stroke:var(--vax);stroke-width:1.2;opacity:.6"/>`});
      s+=`<text x="${f1(X(.5))}" y="${f1(Y(.26)-6)}" class="t-xs t-mid" style="fill:var(--vax)">upper-room UV zone: nuclei carried up by mixing are killed</text>`}
    /* airflow */
    const tau=t*420;
    if(S.vent==='open'){for(let k=0;k<3;k++){const yy=Y(.4+k*.18),off=(tau*3+k*40)%80;
        s+=`<path d="M${f1(L.x0-14)} ${f1(yy)}H${f1(L.x1+16)}" style="stroke:var(--air);stroke-width:1.6;fill:none;stroke-dasharray:18 62;stroke-dashoffset:${f1(-off)};opacity:.5"/>`}
      s+=`<path d="M${f1(L.x1-30)} ${f1(Y(.48))}h44" style="stroke:var(--air);stroke-width:2;fill:none" marker-end="url(#spAr)"/><path d="M${f1(L.x0-14)} ${f1(Y(.8))}h44" style="stroke:var(--air);stroke-width:2;fill:none" marker-end="url(#spAr)"/>`}
    else if(S.vent==='mech'){const sx=X(.12),ex=X(.88),off=(tau*2)%40;
      s+=`<rect x="${f1(sx-16)}" y="${L.y0}" width="32" height="6" style="fill:var(--muted)"/><rect x="${f1(ex-16)}" y="${L.y0}" width="32" height="6" style="fill:var(--muted)"/>`;
      s+=`<path d="M${f1(sx)} ${L.y0+8}C${f1(sx)} ${f1(Y(.7))} ${f1(ex)} ${f1(Y(.7))} ${f1(ex)} ${L.y0+10}" style="stroke:var(--air);stroke-width:1.6;fill:none;stroke-dasharray:10 30;stroke-dashoffset:${f1(-off)};opacity:.7" marker-end="url(#spAr)"/>`;
      s+=`<text x="${f1(sx)}" y="${L.y0+18}" class="t-xs t-mid">supply</text><text x="${f1(ex)}" y="${L.y0+18}" class="t-xs t-mid">exhaust</text>`}
    /* walls, window, door */
    const wy0=Y(.3),wy1=Y(.62),dy0=Y(.42);
    s+=`<path d="M${L.x0} ${L.y0}H${L.x1}V${f1(wy0)}M${L.x1} ${f1(wy1)}V${L.y1}H${L.x0}V${f1(dy0)}M${L.x0} ${f1(Y(.3))}V${L.y0}" style="fill:none;stroke:var(--ink);stroke-width:2.4"/>`;
    s+=S.vent==='open'?`<line x1="${L.x1}" y1="${f1(wy0)}" x2="${L.x1+16}" y2="${f1(wy0-10)}" style="stroke:var(--ink);stroke-width:2"/><line x1="${L.x0}" y1="${f1(dy0)}" x2="${L.x0-12}" y2="${f1(dy0+30)}" style="stroke:var(--ink);stroke-width:2"/>`
      :`<line x1="${L.x1}" y1="${f1(wy0)}" x2="${L.x1}" y2="${f1(wy1)}" style="stroke:var(--accent);stroke-width:3;opacity:.7"/><line x1="${L.x0}" y1="${f1(Y(.3))}" x2="${L.x0}" y2="${f1(dy0)}" style="stroke:var(--line);stroke-width:2.4"/><line x1="${L.x0}" y1="${f1(dy0)}" x2="${L.x0}" y2="${L.y1}" style="stroke:var(--muted);stroke-width:3"/>`;
    s+=`<text x="${f1(L.x1-4)}" y="${f1(wy1+12)}" class="t-xs t-end">window</text><text x="${f1(L.x0+4)}" y="${f1(dy0-6)}" class="t-xs">door</text>`;
    /* people */
    const coughing=t<.12||(Math.sin(tau*.9)>.93&&M.txF>.3);
    s+=person(pA.x,pA.y,L.s,'var(--tb)',{cough:coughing&&!S.mask,face:1,mask:S.mask});
    s+=person(pB.x,pB.y,L.s,'var(--muted)',{face:-1});
    s+=`<text x="${f1(pA.x)}" y="${L.y1+16}" class="t-xs t-mid" style="fill:var(--tb)">${N?'person with TB':'person with TB of the lungs'}</text><text x="${f1(pB.x)}" y="${L.y1+16}" class="t-xs t-mid">${N?'shares the air':'another person sharing the air'}</text>`;
    if(S.tx){s+=pill(pA.x-L.s*.42,pA.y+L.s*.55,18,'var(--dR)',{ang:-30});s+=`<text x="${f1(pA.x-L.s*.42)}" y="${f1(pA.y+L.s*.55-12)}" class="t-xs t-mid" style="fill:var(--rx)">${M.c.d!=null?'day '+Math.round(M.c.d):'on Rx'}</text>`}
    /* cough burst */
    if(t<.16){const k=ramp(t,0,.12),fade=1-ramp(t,.12,.16);
      BIG.forEach(b=>{const x=mA[0]+b.vx*k*W*.5,y=Math.min(L.y1-b.r,mA[1]+b.vy*k*H*.3+k*k*H*1.2);s+=droplet(x,y,b.r,{op:fade*(y>=L.y1-b.r-1?.5:1)})});
      SM.forEach(d=>{const e=1-Math.exp(-4*k),x=mA[0]+e*d.d*W*.55,y=mA[1]+Math.sin(d.a)*e*d.d*H*.5-k*8;s+=droplet(x,y,lerp(d.r,1.8,k),{bac:d.bac&&k>.4,op:fade})});
      if(k>.3)s+=`<text x="${f1(mA[0]+W*.1)}" y="${f1(L.y1-24)}" class="t-xs" style="fill:var(--air)">big droplets fall</text><text x="${f1(mA[0]+W*.16)}" y="${f1(mA[1]-H*.2)}" class="t-xs" style="fill:var(--air)">tiny nuclei float</text>`}
    /* floating droplet nuclei */
    const nVis=t<.12?0:Math.round(PT.length*dens*.9),flow=S.vent==='open'?.0035:S.vent==='mech'?.0016:.0003;
    let pts='';for(let i=0;i<nVis;i++){const p=PT[i];let u=((p.u+tau*flow*p.sp)%1+1)%1,v=p.v+.05*Math.sin(tau*.03*p.sp+p.ph);
      u=lerp(.2+(u-.2)*.25,u,mix);v=lerp(.42+(v-.42)*.3,v,mix);v=clamp(v,.03,.97);
      const dead=S.uv&&v<.26;pts+=droplet(X(u),Y(v),p.r,{bac:p.bac&&!dead,op:dead?.35:.95});
      if(dead)pts+=bacillus(X(u),Y(v),p.r*1.3,35,{w:p.r*.45,dead:true})}
    s+=`<g clip-path="url(#spClip)">${pts}</g>`;
    /* breathing in */
    if(t>=.12&&dens>.05){const br=.5+.5*Math.sin(tau*.12);s+=`<path d="M${f1(mB[0]-30)} ${f1(mB[1]-4)}Q${f1(mB[0]-14)} ${f1(mB[1]+2)} ${f1(mB[0]-2)} ${f1(mB[1])}" style="fill:none;stroke:var(--air);stroke-width:1.4;opacity:${f1(.3+.6*br)}" marker-end="url(#spAr)"/>`}
    /* labels: clock and ACH */
    s+=`<text x="${L.x0}" y="${L.y0-24}" class="t-lbl">${M.c.lab}</text><text x="${L.x0}" y="${L.y0-9}" class="t-xs">${SP_VENT[S.vent].n} · ${M.ach} air changes/hour</text>`;
    /* meter: modelled 8-hour risk for the other person */
    const m=L.meter,pc=Math.round(M.risk8*100);
    if(N){s+=`<text x="${m.x}" y="${m.y-14}" class="t-sm">IF THIS LASTED 8 HOURS · WELLS–RILEY ESTIMATE</text><rect x="${m.x}" y="${m.y}" width="${m.w}" height="18" rx="4" style="fill:var(--panel-2)"/><rect x="${m.x}" y="${m.y}" width="${f1(m.w*M.risk8)}" height="18" rx="4" style="fill:var(--tb)"/><text x="${m.x+m.w}" y="${m.y+36}" class="t-big t-end">${pc}%</text><text x="${m.x}" y="${m.y+34}" class="t-xs">of susceptible people infected</text>`;
      s+=`<text x="${m.x}" y="${m.y+64}" class="t-sm">ROOM CONCENTRATION vs CLOSED</text><rect x="${m.x}" y="${m.y+72}" width="${m.w}" height="12" rx="3" style="fill:var(--panel-2)"/><rect x="${m.x}" y="${m.y+72}" width="${f1(m.w*clamp(M.Ceff/Cref))}" height="12" rx="3" style="fill:var(--air)"/><text x="${m.x+m.w}" y="${m.y+100}" class="t-xs t-end">${Math.round(M.Ceff/Cref*100)}% of the closed-room level</text>`;
      s+=`<text x="${m.x}" y="${m.y+128}" class="t-xs" style="fill:var(--warn)">TEACHING MODEL · not a prediction for anyone</text>`}
    else{const mh=200,my=m.y+40;s+=`<text x="${m.x}" y="${m.y}" class="t-sm">8-HOUR</text><text x="${m.x}" y="${m.y+13}" class="t-sm">ESTIMATE</text><text x="${m.x}" y="${m.y+26}" class="t-xs">Wells–Riley</text>`;
      s+=`<rect x="${m.x+6}" y="${my}" width="28" height="${mh}" rx="5" style="fill:var(--panel-2)"/><rect x="${m.x+6}" y="${f1(my+mh*(1-M.risk8))}" width="28" height="${f1(mh*M.risk8)}" rx="5" style="fill:var(--tb)"/>`;
      s+=`<rect x="${m.x+60}" y="${my}" width="28" height="${mh}" rx="5" style="fill:var(--panel-2)"/><rect x="${m.x+60}" y="${f1(my+mh*(1-clamp(M.Ceff/Cref)))}" width="28" height="${f1(mh*clamp(M.Ceff/Cref))}" rx="5" style="fill:var(--air)"/>`;
      s+=`<text x="${m.x+20}" y="${my+mh+18}" class="t-big t-mid">${pc}%</text><text x="${m.x+20}" y="${my+mh+32}" class="t-xs t-mid">infected</text><text x="${m.x+74}" y="${my+mh+18}" class="t-big t-mid">${Math.round(M.Ceff/Cref*100)}</text><text x="${m.x+74}" y="${my+mh+32}" class="t-xs t-mid">% haze</text>`;
      s+=`<text x="${L.x0}" y="${L.y1+40}" class="t-xs" style="fill:var(--warn)">TEACHING MODEL · haze relative to the closed room; not a prediction for anyone</text>`}
    svg.innerHTML=s;setSt(ph);
    $('#spRead').innerHTML=`<span>source <b>${f1(M.q)} quanta/h</b>${S.mask?' (mask −56%)':''}${S.tx?' (on effective treatment)':''}</span><span>air changes <b>${M.ach}/h</b></span>${S.uv?'<span>UV <b>−70%</b> infectious doses</span>':''}<span>8-hour estimate <b>${pc}%</b></span>`;
    $('#spNote').innerHTML=noteHTML(SP_STEPS[ph]);
  }
  const stop=playWire(rg,$('#spPlay'),draw,24000,'Replay','spread');
  setSt=stepWire($('#spSteps'),SP_STEPS,rg,draw,stop);
  $$('[data-spv]').forEach(b=>b.addEventListener('click',()=>{S.vent=b.dataset.spv;sync();draw(+rg.value)}));
  [['#spUv','uv'],['#spMask','mask'],['#spTx','tx']].forEach(([id,k])=>$(id).addEventListener('click',()=>{S[k]=!S[k];sync();draw(+rg.value)}));
  draw(+rg.value);

  /* ---- Wells–Riley calculator ---- */
  const wsv=$('#wrSvg'),ACHS=[1.6,6,12,17,28,40];
  const wr=(q,p,h,ach,V)=>1-Math.exp(-q*p*h/(ach*V));
  function drawW(){const N=vb(wsv,'720 300','400 330');
    const q=+$('#wrQ').value,ach=+$('#wrAch').value,H=+$('#wrH').value,V=+$('#wrV').value,p=+$('#wrP').value;
    $('#wrHo').textContent=H+' h';$('#wrVo').textContent=V+' m³';$('#wrPo').textContent=p.toFixed(2);
    const xm=H<=24?24:40,C=N?{x0:44,x1:384,y0:30,y1:266}:{x0:60,x1:600,y0:26,y1:252};
    const X=h=>lerp(C.x0,C.x1,h/xm),Yv=v=>lerp(C.y1,C.y0,v);let s='';
    [0,.25,.5,.75,1].forEach(v=>s+=`<line x1="${C.x0}" x2="${C.x1}" y1="${f1(Yv(v))}" y2="${f1(Yv(v))}" class="${v?'grid':'axis'}"/><text x="${C.x0-6}" y="${f1(Yv(v)+3)}" class="t-xs t-end">${v*100}%</text>`);
    (xm===24?[0,4,8,12,16,20,24]:[0,8,16,24,32,40]).forEach(h=>s+=`<text x="${f1(X(h))}" y="${C.y1+14}" class="t-xs t-mid">${h}</text>`);
    s+=`<text x="${C.x1}" y="${C.y1+28}" class="t-xs t-end">hours of shared air</text><text x="${C.x0}" y="${C.y0-12}" class="t-sm">SHARE OF SUSCEPTIBLE PEOPLE INFECTED (MODEL)</text>`;
    ACHS.forEach(a=>{const sel=a===ach;const d=pathFn(u=>1-wr(q,p,u*xm,a,V),C.x0,C.x1,C.y0,C.y1,80);
      s+=`<path d="${d}" style="fill:none;stroke:${sel?'var(--tb)':'var(--muted)'};stroke-width:${sel?2.8:1.1};opacity:${sel?1:.45}"/>`;
      if(!N||sel){const yv=wr(q,p,xm,a,V);s+=`<text x="${C.x1+6}" y="${f1(Yv(yv)+3)}" class="t-xs" style="fill:${sel?'var(--tb)':'var(--muted)'}">${a} ACH</text>`}});
    const P=wr(q,p,H,ach,V);s+=`<line x1="${f1(X(H))}" x2="${f1(X(H))}" y1="${C.y0}" y2="${C.y1}" style="stroke:var(--ink);opacity:.3"/><circle cx="${f1(X(H))}" cy="${f1(Yv(P))}" r="6" style="fill:var(--tb);stroke:var(--panel);stroke-width:2"/>`;
    s+=`<text x="${f1(X(H)+(H>xm*.7?-10:10))}" y="${f1(Yv(P)-10)}" class="t-lbl${H>xm*.7?' t-end':''}">${(P*100).toFixed(P<.1?1:0)}%</text>`;
    if(N)s+=`<text x="${C.x0}" y="${C.y1+44}" class="t-xs">faint lines: the other ventilation rates</text>`;
    wsv.innerHTML=s;
    const P24=ACHS.map(a=>wr(q,p,24,a,V));
    $('#wrOut').innerHTML=`<div><div class="big-num">${(P*100).toFixed(P<.1?1:0)}%</div><small>predicted infected after ${H} h</small></div><div><b>${f1(q*H)}</b><small>quanta released into the room</small></div><div><b>${f1(ach*V*H)} m³</b><small>fresh air supplied</small></div><div><b>${Math.round(P24[2]*100)}% → ${Math.round(P24[5]*100)}%</b><small>24 h at 12 ACH vs 40 ACH</small></div>`;
    const big=q>=40;
    $('#wrNote').innerHTML=noteHTML({k:'Reading the model',t:big?'A very strong source beats ventilation':ach<6?'Little fresh air, fast build-up':'Diminishing returns',
      txt:big?`With a source like the most infectious patients on the Lima HIV–TB ward (226, 52 and 40 quanta per hour), even good ventilation leaves a high predicted risk. The office-outbreak model shows the same limit: as a source's infectiousness rises, building ventilation offers progressively less protection. That is why finding the source and starting effective treatment comes first. [[Escombe2008,Nardell1991]]`
        :`Each extra unit of fresh air helps less than the last. In the office-outbreak model, raising outdoor air from about 15 to 25 cubic feet per minute per person cut infections by 33%, and going to 35 cut them by a further 19%. Mean monthly infectiousness on the Lima ward ranged from 0 to 44 quanta per hour, so the risk to someone breathing that air varied just as widely. [[Nardell1991,Escombe2007CID]]`,
      pt:`More fresh air and less time together both lower the odds. A very infectious person, though, needs treatment, not just an open window.`,
      hook:`Quanta: HIV-positive patients in Lima averaged 8.2/h vs 1.25/h for HIV-negative patients in the 1950s studies. [[Escombe2007CID]]`});
  }
  ['#wrQ','#wrAch'].forEach(id=>$(id).addEventListener('change',drawW));['#wrH','#wrV','#wrP'].forEach(id=>$(id).addEventListener('input',drawW));
  drawW();redraws.spread=(f=>()=>{f&&f();drawW()})(redraws.spread);

  /* ---- flip cards ---- */
  $$('#spFlips .flip').forEach(b=>b.addEventListener('click',()=>b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')!=='true')));
};
