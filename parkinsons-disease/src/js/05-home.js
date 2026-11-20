
/* =============== home: thirty years, schematic =============== */
inits.home=()=>{
  const svg=$('#heroSvg'),rg=$('#heroT');
  const sig=(x,m,k)=>1/(1+Math.exp(-(x-m)/k));
  const CUR=[
   {k:'syn',l:'alpha-synuclein spread',c:'var(--rose)',f:y=>sig(y,10,3)},
   {k:'nm',l:'non-motor signs',c:'var(--violet)',f:y=>sig(y,15,2.6)*.8},
   {k:'da',l:'dopamine neurons left',c:'var(--amber)',f:y=>1-.75*sig(y,20,3.2)},
   {k:'mot',l:'movement signs',c:'var(--sage)',f:y=>sig(y,23,1.8)}];
  function draw(t){
    const N=vb(svg,'520 320','400 388');
    const Y=t*30, x0=N?34:40, x1=N?390:500, y0=N?46:40, y1=N?250:230, X=y=>lerp(x0,x1,y/30), V=v=>lerp(y1,y0,v);
    let s='';
    // a midbrain silhouette whose substantia nigra pales as the neurons are lost
    const bx=N?318:112, by=N?316:92, sc=N?.72:.8, da=CUR[2].f(Y), syn=CUR[0].f(Y);
    s+=`<g transform="translate(${bx} ${by}) scale(${sc})" aria-hidden="true">`;
    s+=`<path d="M-50 -30c10-18 34-26 50-26s40 8 50 26c6 14 0 34-14 44-10 8-24 10-36 10s-26-2-36-10c-14-10-20-30-14-44z" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2"/>`;
    s+=`<path d="M-8 -40v26M8 -40v26" style="stroke:var(--cell-line);stroke-width:1.4;opacity:.6"/>`;
    [-1,1].forEach(side=>{s+=`<path d="M${side*12} 4 q${side*18} -6 ${side*30} 6 q-${side*4} 10 -${side*22} 10z" style="fill:var(--ink);opacity:${f1(.15+.7*da)}"/>`});
    const r=rng(5);for(let i=0;i<10;i++){const px=-34+r()*68,py=-34+r()*52,on=clamp(syn*1.5-i/10);if(on>0)s+=lewyBody(px,py,2+2.4*on,on*.85)}
    s+='</g>';
    // axes
    s+=`<line x1="${x0}" x2="${x1}" y1="${y1}" y2="${y1}" class="axis"/>`;
    [0,10,20,30].forEach((y,i,a)=>s+=`<text x="${f1(X(y))}" y="${y1+16}" class="t-xs ${i===0?'':i===a.length-1?'t-end':'t-mid'}">${y===0?'year 0':y}</text>`);
    // diagnosis marker
    const sx=X(22);
    s+=`<line x1="${f1(sx)}" x2="${f1(sx)}" y1="${y0-14}" y2="${y1}" style="stroke:var(--muted);stroke-width:1;stroke-dasharray:3 4"/>`;
    s+=`<text x="${f1(sx-4)}" y="${y0-18}" class="t-xs t-end">diagnosis</text>`;
    CUR.forEach((c,i)=>{
      s+=`<path d="${pathFn(u=>c.f(u*30),x0,x1,y1,y0)}" style="fill:none;stroke:${c.c};stroke-width:1.4;opacity:.3"/>`;
      s+=`<path d="${pathFn(u=>u*30<=Y?c.f(u*30):NaN,x0,x1,y1,y0).replace(/[ML][^ML]*NaN[^ML]*/g,'')}" style="fill:none;stroke:${c.c};stroke-width:3.2"/>`;
      const v=c.f(Y);s+=`<circle cx="${f1(X(Y))}" cy="${f1(V(v))}" r="4.5" style="fill:${c.c}"/>`;
      s+=`<text x="${x0+(N?0:(i%2)*190)}" y="${f1(y1+34+(N?i:Math.floor(i/2))*15)}" class="t-xs" style="fill:${c.c}">● ${c.l}</text>`});
    s+=`<line x1="${f1(X(Y))}" x2="${f1(X(Y))}" y1="${y0-6}" y2="${y1}" style="stroke:var(--ink);stroke-width:1.2;opacity:.3"/>`;
    svg.innerHTML=s;
    $('#heroCap').textContent=Y<14?`Year ${Y.toFixed(0)}. Synuclein is spreading in the brainstem and gut nerves, with no symptoms yet.`:Y<22?`Year ${Y.toFixed(0)}. Non-motor signs such as dream enactment or loss of smell may appear; dopamine neurons are being lost.`:`Year ${Y.toFixed(0)}. Movement signs and a diagnosis, after much of the dopamine is gone. Schematic, not to scale.`;
    rg.setAttribute('aria-valuetext',`Year ${Y.toFixed(0)} of 30`);
  }
  playWire(rg,$('#heroPlay'),draw,9000,'Replay','home');draw(+rg.value);
};
