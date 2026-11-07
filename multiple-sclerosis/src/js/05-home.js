
/* =============== home: one signal, two fibres =============== */
inits.home=()=>{
  const svg=$('#heroSvg'),rg=$('#heroT');
  /* where the signal is at time t on each fibre, as a fraction of the length.
     Healthy: jumps node to node (saltatory). Damaged: the same until the bare stretch,
     where it creeps continuously and slowly, then jumps again. Schematic only. */
  const DM=[.42,.66];
  function front(t,nodes,x0,x1,damaged){
    const L=x1-x0,hop=.1;let tt=t*(damaged?1:1.9),i=0,x=x0;
    for(const n of nodes){const u=(n-x0)/L;
      if(damaged&&u>DM[0]&&u<=DM[1]+.04){const need=(n-x)/L*1.35;if(tt<need)return x+L*(tt/1.35);tt-=need;x=n;continue}
      if(tt<hop)return x;tt-=hop;x=n;i++}
    return x1}
  function draw(t){const N=vb(svg,'520 300','400 340');
    const x0=N?20:30,x1=N?380:490,yA=N?92:86,yB=N?222:206;let s='';
    const A=fiber(x0,x1,yA,{seg:N?40:52,gap:6,h:N?16:18}),B=fiber(x0,x1,yB,{seg:N?40:52,gap:6,h:N?16:18,demy:[DM],loss:1});
    s+=`<text x="${x0}" y="${yA-24}" class="t-sm" style="fill:var(--axon)">HEALTHY · myelinated</text><text x="${x0}" y="${yB-24}" class="t-sm" style="fill:var(--attack)">DEMYELINATED STRETCH</text>`;
    const bx0=lerp(x0,x1,DM[0]),bx1=lerp(x0,x1,DM[1]);
    s+=`<rect x="${f1(bx0)}" y="${yB-20}" width="${f1(bx1-bx0)}" height="40" rx="8" style="fill:var(--attack-soft);opacity:.7"/>`;
    s+=A.svg+B.svg;
    const fa=front(t,A.nodes,x0,x1,false),fb=front(t,B.nodes,x0,x1,true);
    const glow=(x,y)=>`<circle cx="${f1(x)}" cy="${y}" r="9" style="fill:var(--pulse);opacity:.25"/><circle cx="${f1(x)}" cy="${y}" r="4.5" style="fill:var(--pulse)"/>`;
    s+=`<line x1="${x0}" x2="${f1(fa)}" y1="${yA}" y2="${yA}" style="stroke:var(--pulse);stroke-width:2;opacity:.5"/>`+glow(fa,yA);
    s+=`<line x1="${x0}" x2="${f1(fb)}" y1="${yB}" y2="${yB}" style="stroke:var(--pulse);stroke-width:2;opacity:.5"/>`+glow(fb,yB);
    const doneA=fa>=x1-.5,doneB=fb>=x1-.5;
    s+=`<text x="${x1}" y="${yA+34}" class="t-sm t-end" style="fill:${doneA?'var(--good)':'var(--muted)'}">${doneA?'arrived':'jumping node to node'}</text>`;
    s+=`<text x="${x1}" y="${yB+34}" class="t-sm t-end" style="fill:${doneB?'var(--good)':fb>bx0&&fb<bx1?'var(--attack)':'var(--muted)'}">${doneB?'arrived, late':fb>bx0&&fb<bx1?'creeping across the bare stretch':'jumping node to node'}</text>`;
    s+=`<text x="${(x0+x1)/2}" y="${N?318:282}" class="t-xs t-mid">myelin (gold) · nodes of Ranvier (gaps) · signal (cyan)</text>`;
    svg.innerHTML=s}
  playWire(rg,$('#heroPlay'),draw,7000,'Replay','home');draw(+rg.value);
};
