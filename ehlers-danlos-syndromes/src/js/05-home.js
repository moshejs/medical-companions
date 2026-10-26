/* =============== home: from one collagen chain to a working joint, with and without a variant =============== */
const HERO_CAP=['Schematic, not to scale.','Schematic, not to scale: one faulty link shown in orange, followed through each step.'];
inits.home=()=>{
  const svg=$('#heroSvg'),rg=$('#heroT'),vb2=$('#heroVar'),cap=$('#heroCap');let vr=false;
  /* three stacked strip panels (chain, helix, fibril) read top to bottom, then a tall tissue panel on
     the right; the timeline fills them in order and lights the current one */
  const STEPS=[['One chain','A collagen chain is made','A chain with one faulty link'],
               ['Triple helix','Three chains wind together','The helix kinks at the fault'],
               ['Fibril','Molecules line up into a fibril','The fibril forms unevenly'],
               ['Tissue','Fibrils hold the joint together','Looser tissue lets the joint shift']];
  function draw(t){const N=vb(svg,'520 300','400 380');let s='';
    const L=N?{x:12,w:250,y:56,h:100,g:8,jx:272,jw:116}:{x:12,w:330,y:52,h:76,g:7,jx:352,jw:156};
    const P=[0,1,2].map(i=>({x:L.x,y:L.y+i*(L.h+L.g),w:L.w,h:L.h}));
    P.push({x:L.jx,y:L.y,w:L.jw,h:3*L.h+2*L.g});
    const ph=t<.25?0:t<.5?1:t<.75?2:3;
    s+=`<text x="12" y="22" class="t-big" style="fill:${vr&&ph>0?'var(--variant)':'var(--ink)'}">${STEPS[ph][vr?2:1]}</text>`;
    s+=`<text x="12" y="40" class="t-sm">Step ${ph+1} of 4 · schematic</text>`;
    P.forEach((p,i)=>{const on=i===ph,done=i<ph,lit=on||done;
      s+=`<clipPath id="hc${i}"><rect x="${p.x}" y="${p.y}" width="${p.w}" height="${p.h}" rx="10"/></clipPath>`;
      s+=`<rect x="${p.x}" y="${p.y}" width="${p.w}" height="${p.h}" rx="10" style="fill:${on?'var(--accent-soft)':'var(--field)'};stroke:${on?'var(--accent)':'var(--line)'};stroke-width:${on?1.6:1}"/>`;
      s+=`<text x="${p.x+10}" y="${p.y+17}" class="t-sm" style="fill:${on?'var(--accent)':'var(--muted)'}">${i+1} · ${STEPS[i][0]}</text>`;
      /* chevrons: down between the strips, right from the fibril to the tissue */
      const ac=`fill:none;stroke:${lit?'var(--accent)':'var(--line)'};stroke-width:1.6`;
      if(i<2)s+=`<path d="M${p.x+p.w/2-5} ${p.y+p.h+1}l5 4l5-4" style="${ac}"/>`;
      if(i===2)s+=`<path d="M${p.x+p.w+2} ${p.y+p.h/2-5}l4 5l-4 5" style="${ac}"/>`;
      const cy=p.y+p.h/2+7;let g='';
      if(i===0)g=chain(p.x+22,cy,p.w-56,{n:N?19:24,show:Math.max(.06,ramp(t,0,.2)),hyd:ramp(t,.08,.24),sub:vr?(N?10:13):undefined});
      if(i===1)g=helix(p.x+12,cy,p.w-24,{amp:N?12:11,zip:ramp(t,.25,.47),phase:t*1.5,kink:vr&&t>=.25?.55:null,w:3});
      if(i===2){const rows=N?9:7,rh=N?7:6.6;g=fibril(p.x+10,cy-rows*rh/2,p.w-20,{rows,rh,grow:Math.max(.04,ramp(t,.5,.72)),irregular:vr,xlink:true,seed:7}).svg}
      if(i===3){const ld=ease(ramp(t,.78,.96)),sc=N?.82:.95,cx=p.x+p.w/2-(N?6:8),jy=p.y+p.h/2+12;
        g=joint(cx,jy,sc,{lax:vr?.95:.1,slip:ld*(vr?.62:.06),ang:ld*(vr?14:4),muscle:.35,hl:vr&&ld>.5});
        if(t>=.75)g+=`<path d="M${f1(p.x+p.w-6)} ${f1(jy+50*sc)}h${f1(-10-ld*12)}" style="stroke:var(--muted);stroke-width:2.2" marker-end="url(#hArr)"/><text x="${f1(p.x+p.w-8)}" y="${f1(jy+50*sc+18)}" class="t-xs t-end">load</text>`}
      s+=`<g clip-path="url(#hc${i})" style="opacity:${lit?1:.35}">${g}</g>`});
    svg.innerHTML=`<defs>${marker('hArr','var(--muted)')}</defs>`+s}
  vb2.addEventListener('click',()=>{vr=!vr;vb2.setAttribute('aria-pressed',vr);cap.innerHTML=vr?HERO_CAP[1]:HERO_CAP[0];draw(+rg.value)});
  playWire(rg,$('#heroPlay'),draw,10000,'%t:player.replay%','home');draw(+rg.value);
};
