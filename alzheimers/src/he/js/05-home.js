
/* =============== home: thirty years, schematic =============== */
inits.home=()=>{
  const svg=$('#heroSvg'),rg=$('#heroT');
  const sig=(x,m,k)=>1/(1+Math.exp(-(x-m)/k));
  const CUR=[
   {k:'amy',l:'עמילואיד',c:'var(--amber)',f:y=>sig(y,9,2.4)},
   {k:'tau',l:'טאו',c:'var(--rose)',f:y=>sig(y,17,2.6)},
   {k:'mem',l:'שינוי בזיכרון',c:'var(--sage)',f:y=>sig(y,24,2.2)}];
  function draw(t){
    const N=vb(svg,'520 320','400 372');
    const Y=t*30, x0=N?34:40, x1=N?390:500, y0=N?46:40, y1=N?250:230, X=y=>lerp(x0,x1,y/30), V=v=>lerp(y1,y0,v);
    let s='';
    // the brain, darkening as tau spreads: a simple lateral silhouette
    const bx=N?320:112, by=N?306:86, sc=N?.8:.85, tauV=CUR[1].f(Y);
    s+=`<g transform="translate(${bx} ${by}) scale(${sc})" aria-hidden="true">`;
    s+=`<path d="M-48 6c-6-30 18-52 50-50 30 2 52 22 50 48-2 20-18 30-36 30h-8l-4 14h-12l2-14h-20c-14 0-22-10-22-28z" style="fill:var(--cell);stroke:var(--cell-line);stroke-width:2"/>`;
    s+=`<path d="M-20-24c10 6 6 16 18 18M10-34c-2 12 10 14 8 26M-36 4c12-2 16 8 28 6M4 10c8-6 20-4 26 4" style="fill:none;stroke:var(--cell-line);stroke-width:1.5;opacity:.6"/>`;
    const r=rng(5);for(let i=0;i<14;i++){const px=-34+r()*72,py=-28+r()*48,on=clamp(tauV*1.6-i/14);if(on>0)s+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="${f1(2+2*on)}" style="fill:var(--rose);opacity:${f1(on*.85)}"/>`}
    const ar=rng(9);for(let i=0;i<10;i++){const px=-38+ar()*76,py=-30+ar()*50,on=clamp(CUR[0].f(Y)*1.4-i/10);if(on>0)s+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="${f1(1.5+2.5*on)}" style="fill:var(--amber);opacity:${f1(on*.7)}"/>`}
    s+='</g>';
    // axes
    s+=`<line x1="${x0}" x2="${x1}" y1="${y1}" y2="${y1}" class="axis"/>`;
    [0,10,20,30].forEach((y,i,a)=>s+=`<text x="${f1(X(y))}" y="${y1+16}" class="t-xs ${i===0?'':i===a.length-1?'t-end':'t-mid'}">${y===0?'שנה 0':y}</text>`);
    // first symptoms marker
    const sx=X(22);
    s+=`<line x1="${f1(sx)}" x2="${f1(sx)}" y1="${y0-14}" y2="${y1}" style="stroke:var(--muted);stroke-width:1;stroke-dasharray:3 4"/>`;
    s+=`<text x="${f1(sx-4)}" y="${y0-18}" class="t-xs t-end">תסמינים ראשונים</text>`;
    // curves: faint full, solid to playhead
    CUR.forEach((c,i)=>{
      s+=`<path d="${pathFn(u=>c.f(u*30),x0,x1,y1,y0)}" style="fill:none;stroke:${c.c};stroke-width:1.4;opacity:.3"/>`;
      s+=`<path d="${pathFn(u=>u*30<=Y?c.f(u*30):NaN,x0,x1,y1,y0).replace(/[ML][^ML]*NaN[^ML]*/g,'')}" style="fill:none;stroke:${c.c};stroke-width:3.2"/>`;
      const v=c.f(Y);s+=`<circle cx="${f1(X(Y))}" cy="${f1(V(v))}" r="4.5" style="fill:${c.c}"/>`;
      s+=`<text x="${x0}" y="${f1(y1+34+i*15)}" class="t-xs" style="fill:${c.c}">● ${c.l}</text>`});
    s+=`<line x1="${f1(X(Y))}" x2="${f1(X(Y))}" y1="${y0-6}" y2="${y1}" style="stroke:var(--ink);stroke-width:1.2;opacity:.3"/>`;
    svg.innerHTML=s;
    $('#heroCap').textContent=Y<20?`שנה ${Y.toFixed(0)}. העמילואיד מצטבר כבר שנים, בלי תסמינים.`:Y<22?`שנה ${Y.toFixed(0)}. הטאו מתפשט; הזיכרון עומד להשתנות.`:`שנה ${Y.toFixed(0)}. תסמינים. השינויים התחילו שנים רבות קודם לכן. סכמטי, לא בקנה מידה.`;
    rg.setAttribute('aria-valuetext',`שנה ${Y.toFixed(0)} מתוך 30`);
  }
  playWire(rg,$('#heroPlay'),draw,9000,'הפעלה חוזרת','home');draw(+rg.value);
};
