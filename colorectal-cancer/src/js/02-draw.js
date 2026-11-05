/* ---- drawing kit for this subject ----
   All colours come from CSS tokens, so they follow the theme. Every function returns an SVG string
   (or an object with .svg) to concatenate into an <svg>'s innerHTML.
   crypt(x,y,w,h,o)        a colon crypt seen in section: a U of epithelial cells, opening at the top (y) and
                           closing at the base (y+h). o: {n (cells per side), stem (cells at the base drawn as
                           stem cells, green), mut:[i...] cell indices drawn mutant (amber), shift (0..1 moves
                           every cell one slot upward, for a renewal animation), crowd (0..1 extra cells piling
                           at the mouth, as when APC is lost), goblet (true: every 3rd cell a goblet cell)}.
                           Returns {svg, cells:[{x,y,i}]}.
   polyp(x,y,s,stage,o)    a polyp rising from a mucosal line at y. s = base width. stage 0..1: 0 a small
                           tubular adenoma (amber), .5 large adenoma, .75 high-grade dysplasia, 1 carcinoma
                           (crimson, irregular, invading below the line). o: {ped (on a stalk), serrated (saw edge),
                           seed}
   wall(x,y,w,o)           the bowel wall in cross-section from the lumen (top) down: mucosa, submucosa,
                           muscularis propria, subserosa and serosa, with pericolic fat below. o: {h (total
                           height), labels (true), compact}. Returns {svg, y:{mucosa,submucosa,muscularis,
                           subserosa,serosa,fat,bottom}} so a tumour can be drawn to a T depth.
   colon(x,y,s,o)          the large bowel as a frame (caecum lower left, ascending, transverse, descending,
                           sigmoid, rectum), anatomical view (patient's right on the left). s = scale (1 = 300
                           wide). o: {hl:'sigmoid'|..., w (tube width), lumen (true)}. Returns {svg, at(u)->[x,y]
                           along the bowel from the caecum (u=0) to the anal verge (u=1), seg:{name:[u0,u1]}}.
   node(x,y,r,pos,o)       a lymph node (bean); pos 0..1 fills it with tumour.
   liver(x,y,s,mets,seed)  a liver silhouette, s = scale (1 = 120 wide), with n metastases.
   scope(x,y,ang,o)        an endoscope tip pointing at ang degrees, with a light cone if o.light.
   person(x,y,s,fill,o)    a person pictogram for icon arrays (s = height), fill a CSS colour.
   ped(x,y,sex,aff,o)      a pedigree symbol: sex 'm' square, 'f' circle; aff 0 unaffected, 1 affected,
                           .5 carrier (half shaded); o: {dead, proband, r}.
   tube(x,y,s,o)           a stool sample tube (FIT kit). */
function crypt(x,y,w,h,o={}){const n=o.n||9,st=o.stem==null?3:o.stem,mut=o.mut||[],sh=o.shift||0,cw=w*.34,r=Math.min(cw*.48,h/(n*2.1));
  let s='',cells=[];
  /* path of the epithelium: down the left wall, round the base, up the right wall */
  const L=h-w/2,arc=Math.PI*w/2*.5,tot=2*L+arc;
  const at=u=>{const d=u*tot;if(d<L)return[x-w/2+cw/2,y+d];if(d<L+arc){const a=Math.PI-(d-L)/arc*Math.PI;return[x+Math.cos(a)*(w/2-cw/2),y+L+Math.sin(a)*(w/2-cw/2)]}return[x+w/2-cw/2,y+L-(d-L-arc)]};
  s+=`<path d="M${f1(x-w/2)} ${f1(y)}V${f1(y+L)}A${f1(w/2)} ${f1(w/2)} 0 0 0 ${f1(x+w/2)} ${f1(y+L)}V${f1(y)}" style="fill:var(--submucosa);stroke:var(--mucosa-line);stroke-width:1"/>`;
  s+=`<path d="M${f1(x-w/2+cw)} ${f1(y)}V${f1(y+L)}A${f1(w/2-cw)} ${f1(w/2-cw)} 0 0 0 ${f1(x+w/2-cw)} ${f1(y+L)}V${f1(y)}" style="fill:var(--field);stroke:var(--mucosa-line);stroke-width:.8"/>`;
  const N=2*n+st;
  for(let i=0;i<N;i++){let u=(i+.5)/N;
    /* shift moves cells from the base toward the mouth on both sides */
    const side=u<.5?-1:1,dist=Math.abs(u-.5);let du=Math.min(.5,dist+sh/N);u=.5+side*du;
    const [cx,cy]=at(u);const base=Math.abs(i-(N-1)/2)<st/2;const m=mut.includes(i);
    const fill=m?'var(--polyp)':base?'var(--stem)':(o.goblet&&i%3===1?'var(--goblet)':'var(--mucosa)');
    s+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r)}" style="fill:${fill};stroke:${m?'var(--polyp-line)':'var(--mucosa-line)'};stroke-width:.9"/>`;
    s+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r*.38)}" style="fill:var(--nuc);opacity:.7"/>`;
    cells.push({x:cx,y:cy,i})}
  const cr=o.crowd||0;
  if(cr>0){const k=Math.round(cr*10),rr=rng(7);for(let j=0;j<k;j++){const cx=x+(rr()-.5)*w*1.3,cy=y-r*(1+rr()*2.4*cr);
    s+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r)}" style="fill:var(--polyp);stroke:var(--polyp-line);stroke-width:.9"/><circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r*.38)}" style="fill:var(--nuc);opacity:.7"/>`}}
  return {svg:s,cells}}
function polyp(x,y,s,stage=0,o={}){const rr=rng(o.seed||5),k=clamp(stage),hgt=s*(.35+.55*Math.min(1,k*1.4)),ped=!!o.ped;
  const col=k<.6?'var(--polyp)':k<.85?'var(--dysplasia)':'var(--tumour)',line=k<.85?'var(--polyp-line)':'var(--tumour)';
  let g='';const N=22,top=y-hgt-(ped?s*.35:0),cx=x,rx=s/2*(ped?.7:1);
  let d='';for(let i=0;i<=N;i++){const a=Math.PI+i/N*Math.PI;let rad=1+(o.serrated?((i%2)?.06:-.04):0)+(k>.85?(rr()-.5)*.22:0);
    const px=cx+Math.cos(a)*rx*rad,py=(ped?top+hgt*.5:y)+Math.sin(a)*hgt*rad*(ped?.5:1);d+=(i?'L':'M')+f1(px)+' '+f1(py)}
  if(ped){g+=`<path d="M${f1(x-s*.08)} ${f1(y)}Q${f1(x-s*.05)} ${f1(top+hgt*.7)} ${f1(x-s*.12)} ${f1(top+hgt*.5)}L${f1(x+s*.12)} ${f1(top+hgt*.5)}Q${f1(x+s*.05)} ${f1(top+hgt*.7)} ${f1(x+s*.08)} ${f1(y)}Z" style="fill:var(--mucosa);stroke:var(--mucosa-line);stroke-width:1"/>`;
    d+=`Q${f1(cx)} ${f1(top+hgt*.75)} ${f1(cx-rx)} ${f1(top+hgt*.5)}Z`}else d+='Z';
  g+=`<path d="${d}" style="fill:${col};stroke:${line};stroke-width:1.4;stroke-linejoin:round"/>`;
  /* a few glands inside */
  for(let i=0;i<4;i++){const gx=cx+(i-1.5)*rx*.42,gy=(ped?top+hgt*.35:y-hgt*.45)+(rr()-.5)*hgt*.18;g+=`<ellipse cx="${f1(gx)}" cy="${f1(gy)}" rx="${f1(rx*.12)}" ry="${f1(hgt*.12*(ped?.6:1))}" style="fill:none;stroke:${line};stroke-width:.9;opacity:.6"/>`}
  if(k>.85&&!ped){const inv=(k-.85)/.15;for(let i=0;i<5;i++){const a=(i-2)*.28,len=s*.18*inv*(1+rr()*.6);g+=`<path d="M${f1(x+a*s*.6)} ${f1(y)}l${f1(Math.sin(a)*len*.6)} ${f1(len)}" style="stroke:var(--tumour);stroke-width:${f1(3+rr()*2)};stroke-linecap:round"/>`}}
  return g}
function wall(x,y,w,o={}){const H=o.h||200,fr=[.16,.17,.27,.12,.04],names=['Mucosa','Submucosa','Muscularis propria','Subserosa','Serosa'],cols=['var(--mucosa)','var(--submucosa)','var(--muscle)','var(--fat)','var(--serosa)'];
  let s='',yy=y,Y={};const keys=['mucosa','submucosa','muscularis','subserosa','serosa'];
  fr.forEach((f,i)=>{const h=H*f;s+=`<rect x="${f1(x)}" y="${f1(yy)}" width="${f1(w)}" height="${f1(h)}" style="fill:${cols[i]};${i===2?'opacity:.75':''}"/>`;
    if(i===2)for(let k=0;k<6;k++)s+=`<line x1="${f1(x)}" x2="${f1(x+w)}" y1="${f1(yy+h*(k+.5)/6)}" y2="${f1(yy+h*(k+.5)/6)}" style="stroke:var(--mucosa-line);stroke-width:.6;opacity:.35"/>`;
    if(i===0){const n=Math.floor(w/15);for(let k=0;k<n;k++){const cx=x+7.5+k*15;s+=`<path d="M${f1(cx-3)} ${f1(yy)}V${f1(yy+h*.8)}a3 3 0 0 0 6 0V${f1(yy)}" style="fill:var(--cell);stroke:var(--mucosa-line);stroke-width:.7;opacity:.85"/>`}}
    Y[keys[i]]=yy;yy+=h;
    if(o.labels!==false)s+=`<text x="${f1(x+w+8)}" y="${f1(yy-h/2+4)}" class="t-sm">${names[i]}</text>`});
  Y.fat=yy;const fh=H*.24;s+=`<rect x="${f1(x)}" y="${f1(yy)}" width="${f1(w)}" height="${f1(fh)}" style="fill:var(--fat);opacity:.55"/>`;
  if(o.labels!==false)s+=`<text x="${f1(x+w+8)}" y="${f1(yy+fh/2+4)}" class="t-sm">Fat beyond the wall</text>`;
  s+=`<line x1="${f1(x)}" x2="${f1(x+w)}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:var(--mucosa-line);stroke-width:1.4"/>`;
  Y.bottom=yy+fh;return {svg:s,y:Y}}
function colon(x,y,s=1,o={}){const W=o.w||22*s,P=[[0,.86],[0,.12],[.06,0],[.94,0],[1,.12],[1,.62],[.86,.78],[.62,.72],[.56,.84],[.56,1.04]].map(([a,b])=>[x+a*300*s,y+b*240*s]);
  /* cumulative length for at(u) */
  const segs=[];let tot=0;for(let i=1;i<P.length;i++){const l=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);segs.push(l);tot+=l}
  const at=u=>{let d=clamp(u)*tot;for(let i=0;i<segs.length;i++){if(d<=segs[i]||i===segs.length-1){const k=segs[i]?d/segs[i]:0;return[lerp(P[i][0],P[i+1][0],k),lerp(P[i][1],P[i+1][1],k)]}d-=segs[i]}};
  const SEG={caecum:[0,.05],ascending:[.05,.27],transverse:[.27,.55],descending:[.55,.74],sigmoid:[.74,.89],rectum:[.89,1]};
  const path=u0=>{let d='';for(let i=0;i<=40;i++){const p=at(lerp(u0[0],u0[1],i/40));d+=(i?'L':'M')+f1(p[0])+' '+f1(p[1])}return d};
  let g=`<path d="${path([0,1])}" style="fill:none;stroke:var(--mucosa-line);stroke-width:${f1(W+3)};stroke-linejoin:round;stroke-linecap:round"/>`;
  g+=`<path d="${path([0,1])}" style="fill:none;stroke:var(--mucosa);stroke-width:${f1(W)};stroke-linejoin:round;stroke-linecap:round"/>`;
  if(o.hl&&SEG[o.hl])g+=`<path d="${path(SEG[o.hl])}" style="fill:none;stroke:var(--brand);stroke-width:${f1(W*.55)};stroke-linecap:round;opacity:.55"/>`;
  if(o.lumen!==false)g+=`<path d="${path([0,1])}" style="fill:none;stroke:var(--field);stroke-width:${f1(W*.32)};stroke-linejoin:round;stroke-linecap:round;opacity:.9"/>`;
  /* haustra ticks */
  for(let i=1;i<34;i++){const u=i/34;if(u>.88)break;const p=at(u),q=at(u+.004),a=Math.atan2(q[1]-p[1],q[0]-p[0])+Math.PI/2;
    g+=`<line x1="${f1(p[0]+Math.cos(a)*W*.5)}" y1="${f1(p[1]+Math.sin(a)*W*.5)}" x2="${f1(p[0]+Math.cos(a)*W*.22)}" y2="${f1(p[1]+Math.sin(a)*W*.22)}" style="stroke:var(--mucosa-line);stroke-width:.9;opacity:.6"/>`}
  const c=at(0);g+=`<circle cx="${f1(c[0])}" cy="${f1(c[1]+W*.3)}" r="${f1(W*.62)}" style="fill:var(--mucosa);stroke:var(--mucosa-line);stroke-width:1.5"/>`;
  return {svg:g,at,seg:SEG}}
function node(x,y,r=9,pos=0,o={}){return `<g transform="translate(${f1(x)} ${f1(y)})"><path d="M${f1(-r)} 0C${f1(-r)} ${f1(-r*.9)} ${f1(-r*.1)} ${f1(-r*.85)} 0 ${f1(-r*.4)}C${f1(r*.1)} ${f1(-r*.85)} ${f1(r)} ${f1(-r*.9)} ${f1(r)} 0C${f1(r)} ${f1(r*.9)} ${f1(-r)} ${f1(r*.9)} ${f1(-r)} 0Z" style="fill:var(--lymph-soft);stroke:var(--lymph);stroke-width:1.4"/>${pos>0?`<circle r="${f1(r*.62*clamp(pos))}" cy="${f1(r*.12)}" style="fill:var(--tumour);opacity:.85"/>`:''}</g>`}
function liver(x,y,s=1,mets=0,seed=3){const rr=rng(seed);let g=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})"><path d="M-60 -10C-58 -36 -20 -42 14 -38C40 -35 62 -30 60 -16C58 -2 30 8 6 22C-14 34 -36 40 -50 30C-62 20 -62 6 -60 -10Z" style="fill:var(--liver);opacity:.85;stroke:var(--liver);stroke-width:1.5"/><path d="M8 -38C4 -20 6 0 6 22" style="fill:none;stroke:var(--field);stroke-width:1.2;opacity:.5"/>`;
  for(let i=0;i<mets;i++){const mx=-44+rr()*90,my=-28+rr()*44+(mx>20?-8:0),mr=3+rr()*5;g+=`<circle cx="${f1(mx)}" cy="${f1(my)}" r="${f1(mr)}" style="fill:var(--cell);stroke:var(--tumour);stroke-width:1.6"/>`}
  return g+'</g>'}
function scope(x,y,ang=0,o={}){let g=`<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(ang)})">`;
  if(o.light)g+=`<path d="M8 0L46 -16L46 16Z" style="fill:var(--gold);opacity:.18"/>`;
  g+=`<rect x="-14" y="-5" width="22" height="10" rx="4" style="fill:var(--scope)"/><circle cx="6" cy="-2" r="1.8" style="fill:var(--gold)"/><circle cx="6" cy="2.5" r="1.4" style="fill:var(--field)"/>`;
  return g+'</g>'}
function person(x,y,s=14,fill='var(--muted)',o={}){const r=s*.17;return `<g transform="translate(${f1(x)} ${f1(y)})" style="opacity:${o.op==null?1:o.op}"><circle cx="0" cy="${f1(r)}" r="${f1(r)}" style="fill:${fill}"/><path d="M${f1(-s*.26)} ${f1(s)}V${f1(s*.6)}Q${f1(-s*.26)} ${f1(s*.4)} 0 ${f1(s*.4)}Q${f1(s*.26)} ${f1(s*.4)} ${f1(s*.26)} ${f1(s*.6)}V${f1(s)}Z" style="fill:${fill}"/></g>`}
function ped(x,y,sex='m',aff=0,o={}){const r=o.r||11;let g='';const sh=sex==='m'?`<rect x="${f1(x-r)}" y="${f1(y-r)}" width="${2*r}" height="${2*r}" rx="1.5"`:`<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}"`;
  g+=`${sh} style="fill:${aff>=1?'var(--tumour)':'var(--panel)'};stroke:var(--ink);stroke-width:1.5"/>`;
  if(aff>0&&aff<1){const cid='pc'+Math.round(x)+'_'+Math.round(y);g+=`<clipPath id="${cid}"><rect x="${f1(x-r)}" y="${f1(y-r)}" width="${r}" height="${2*r}"/></clipPath>${sh} clip-path="url(#${cid})" style="fill:var(--polyp);stroke:none"/>${sh} style="fill:none;stroke:var(--ink);stroke-width:1.5"/>`}
  if(o.dead)g+=`<line x1="${f1(x-r*1.3)}" y1="${f1(y+r*1.3)}" x2="${f1(x+r*1.3)}" y2="${f1(y-r*1.3)}" style="stroke:var(--ink);stroke-width:1.4"/>`;
  if(o.proband)g+=`<path d="M${f1(x-r*2.2)} ${f1(y+r*1.9)}L${f1(x-r*1.15)} ${f1(y+r*.95)}" style="stroke:var(--ink);stroke-width:1.6" marker-end="url(#pedArrow)"/>`;
  return g}
function tube(x,y,s=1,o={}){return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})"><rect x="-7" y="-26" width="14" height="40" rx="6" style="fill:var(--panel);stroke:var(--accent);stroke-width:1.6"/><rect x="-8" y="-34" width="16" height="10" rx="2.5" style="fill:var(--accent)"/><rect x="-5" y="-4" width="10" height="${o.fill==null?14:f1(14*o.fill)}" rx="3" style="fill:var(--stool);opacity:.7"/></g>`}
