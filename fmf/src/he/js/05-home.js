
/* =============== home: two years, before and after colchicine =============== */
inits.home=()=>{
  const svg=$('#heroSvg'),rg=$('#heroT');const r=rng(17);
  const EV=[];for(let d=0;d<730;d++){const m=d/30.4;let p=1.5/30;if(m>12)p*=lerp(1,.08,ease(ramp(m,12,15)));if(r()<p&&!(EV.length&&d-EV[EV.length-1].d<7))EV.push({d,h:.55+r()*.45})}
  function draw(t){const N=vb(svg,'520 300','400 340');
    const D=t*730,x0=N?34:40,x1=N?392:500,y0=40,y1=N?150:170,X=d=>lerp(x0,x1,d/730);let s='';
    s+=`<rect x="${f1(X(365))}" y="20" width="${f1(x1-X(365))}" height="${N?258:250}" rx="8" style="fill:var(--crocus-soft);opacity:.6"/>`;
    s+=`<text x="${f1(X(365)+8)}" y="36" class="t-xs" style="fill:var(--crocus)">קולכיצין יומי →</text><text x="${x0}" y="36" class="t-xs" style="fill:var(--terra)">ללא טיפול</text>`;
    s+=`<line x1="${x0}" x2="${x1}" y1="${y1}" y2="${y1}" class="axis"/>`;
    for(let m=0;m<=24;m+=6)s+=`<text x="${f1(X(m*30.4))}" y="${y1+16}" class="t-xs ${m===0?'':m===24?'t-end':'t-mid'}">${m===0?'חודש 0':m}</text>`;
    EV.forEach(e=>{if(e.d>D)return;const x=X(e.d),h=(y1-y0-10)*e.h,age=clamp((D-e.d)/20);s+=`<path d="M${f1(x-5)} ${y1} L${f1(x)} ${f1(y1-h)} L${f1(x+5)} ${y1}z" style="fill:var(--terra);opacity:${f1(1-.45*age)}"/>`});
    // SAA between attacks
    const sy=N?240:250;let sd='';for(let d=0;d<=Math.min(D,730);d+=5){const m=d/30.4;const v=lerp(.8,.06,ease(ramp(m,12.5,18)));sd+=(sd?'L':'M')+f1(X(d))+' '+f1(sy-60*v)}
    s+=`<line x1="${x0}" x2="${x1}" y1="${sy}" y2="${sy}" class="axis"/><text x="${x0}" y="${sy+16}" class="t-xs" style="fill:var(--gold)">\u2067SAA בין התקפים ↑\u2069</text><path d="${sd}" style="fill:none;stroke:var(--gold);stroke-width:3"/>`;
    s+=`<line x1="${f1(X(D))}" x2="${f1(X(D))}" y1="24" y2="${sy+12}" style="stroke:var(--ink);stroke-width:1.2;opacity:.35"/>`;
    const n1=EV.filter(e=>e.d<=Math.min(D,365)).length,n2=EV.filter(e=>e.d>365&&e.d<=D).length;
    s+=`<text x="${x1}" y="${sy+(N?56:36)}" class="t-sm t-end">\u2067התקפים: שנה 1 <tspan style="fill:var(--terra);font-weight:700">${n1}</tspan> · שנה 2 <tspan style="fill:var(--crocus);font-weight:700">${n2}</tspan>\u2069</text>`;
    svg.innerHTML=s}
  playWire(rg,$('#heroPlay'),draw,9000,'הפעלה חוזרת','home');draw(+rg.value);
};
