
/* =============== home: one waking day of fatigable weakness =============== */
inits.home=()=>{
  const svg=$('#heroSvg'),rg=$('#heroT');
  /* schematic strength over a day, 0..1: falls with use, recovers with rest (rest breaks at 12:30 and 17:00) */
  const H0=7,H1=23,REST=[[12.5,13.5],[17,17.5]];
  function strength(h){let s=1,last=H0;for(let x=H0;x<h;x+=.05){const r=REST.some(([a,b])=>x>=a&&x<b);s+=r?.06*(1-s):-.0022*(1+.8*ramp(x,15,22));s=clamp(s,.2,1)}return s}
  const S=[];for(let i=0;i<=320;i++){const h=lerp(H0,H1,i/320);S.push([h,strength(h)])}
  const sAt=h=>{const i=clamp(Math.round((h-H0)/(H1-H0)*320),0,320);return S[i][1]};
  function draw(t){const N=vb(svg,'520 300','400 380');
    const h=lerp(H0,H1,t),x0=N?34:40,x1=N?380:330,y0=N?196:70,y1=N?320:230,X=v=>lerp(x0,x1,(v-H0)/(H1-H0)),Y=v=>lerp(y1,y0,v);let s='';
    REST.forEach(([a,b])=>{s+=`<rect x="${f1(X(a))}" y="${y0-8}" width="${f1(X(b)-X(a))}" height="${f1(y1-y0+8)}" rx="4" style="fill:var(--achr-soft)"/>`});
    REST.forEach(([a,b])=>{s+=`<text x="${f1((X(a)+X(b))/2)}" y="${y1-6}" class="t-xs t-mid" style="fill:var(--achr)">rest</text>`});
    s+=`<line x1="${x0}" x2="${x1}" y1="${y1}" y2="${y1}" class="axis"/>`;
    [7,11,15,19,23].forEach(v=>{s+=`<text x="${f1(X(v))}" y="${y1+15}" class="t-xs ${v===7?'':v===23?'t-end':'t-mid'}">${String(v).padStart(2,'0')}:00</text>`});
    s+=`<text x="${x0}" y="${y0-12}" class="t-xs" style="fill:var(--nerve)">STRENGTH WITH USE ↑</text>`;
    let d='';for(const [hh,v] of S){if(hh>h)break;d+=(d?'L':'M')+f1(X(hh))+' '+f1(Y(v))}
    s+=`<path d="${d}" style="fill:none;stroke:var(--nerve);stroke-width:3;stroke-linejoin:round"/>`;
    const v=sAt(h);s+=`<circle cx="${f1(X(h))}" cy="${f1(Y(v))}" r="5" style="fill:var(--nerve)"/>`;
    const ex=N?200:430,ey=N?92:120;s+=eyelid(ex,ey,N?120:110,clamp((1-v)*1.15));
    s+=`<text x="${ex}" y="${ey+(N?52:50)}" class="t-sm t-mid">${String(Math.floor(h)).padStart(2,'0')}:${String(Math.floor((h%1)*60)).padStart(2,'0')}</text>`;
    s+=`<text x="${ex}" y="${ey+(N?68:66)}" class="t-xs t-mid" style="fill:var(--ab)">${v>.8?'lids open':v>.55?'lid starting to droop':'ptosis by evening'}</text>`;
    svg.innerHTML=s}
  playWire(rg,$('#heroPlay'),draw,9000,'Replay','home');draw(+rg.value);
};
