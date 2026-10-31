(()=>{
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const store={get(k,d){try{const v=localStorage.getItem('crc:'+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem('crc:'+k,JSON.stringify(v))}catch(e){}}};
function rng(seed){let a=seed>>>0;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const lerp=(a,b,t)=>a+(b-a)*t, clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)), ramp=(x,a,b)=>clamp((x-a)/(b-a));
const ease=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
const bump=(x,a,b)=>Math.sin(Math.PI*ramp(x,a,b));
const f1=n=>(+n).toFixed(1);
function animate(dur,step,done){
  if(RM){step(1);done&&done();return()=>{}}
  let s=null,id;const f=ts=>{if(s==null)s=ts;const p=Math.min(1,(ts-s)/dur);step(p);if(p<1)id=requestAnimationFrame(f);else done&&done()};
  id=requestAnimationFrame(f);return()=>cancelAnimationFrame(id);
}
/* polyline path from function over [0,1] */
function pathFn(fn,x0,x1,y0,y1,N=120){let d='';for(let i=0;i<=N;i++){const u=i/N,v=clamp(fn(u),-.05,1.05);d+=(i?'L':'M')+f1(lerp(x0,x1,u))+' '+f1(lerp(y0,y1,v))}return d}
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
function marker(id,color='var(--muted)'){return `<marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:${color}"/></marker>`}

/* =============== routing =============== */
const MODS=[
 {id:'home',t:'Start here',g:0,n:'00',d:''},
 {id:'what',t:'What colorectal cancer is',g:1,n:'1.1',d:'Who gets it, the numbers, the rise under 50, where in the bowel'},
 {id:'colon',t:'The colon & its lining',g:1,n:'1.2',d:'Crypts, stem cells and a lining that renews itself every few days'},
 {id:'sequence',t:'From polyp to cancer',g:1,n:'1.3',d:'The adenoma–carcinoma sequence, the serrated pathway, CIN and MSI'},
 {id:'risk',t:'Risk factors & prevention',g:1,n:'1.4',d:'Age, family, IBD, meat, alcohol, weight, activity and aspirin'},
 {id:'genes',t:'Lynch syndrome & FAP',g:1,n:'1.5',d:'Inherited colorectal cancer, mismatch repair and a pedigree'},
 {id:'screening',t:'Screening tests compared',g:2,n:'2.1',d:'FIT, stool DNA, colonoscopy, CT colonography and blood tests'},
 {id:'colonoscopy',t:'Colonoscopy, animated',g:2,n:'2.2',d:'Prep, the scope’s path, removing a polyp, quality measures'},
 {id:'schedule',t:'When to start, how often',g:2,n:'2.3',d:'Start age, intervals and surveillance after polyps: a calculator'},
 {id:'symptoms',t:'Symptoms & red flags',g:3,n:'3.1',d:'Bleeding, anaemia, bowel changes and the path to diagnosis'},
 {id:'staging',t:'Staging: TNM calculator',g:3,n:'3.2',d:'How deep, how many nodes, how far: stage and survival'},
 {id:'biomarkers',t:'Tumour biomarkers',g:3,n:'3.3',d:'MMR/MSI, RAS, BRAF, HER2 and sidedness, and what each changes'},
 {id:'surgery',t:'Surgery',g:4,n:'4.1',d:'Colectomy, total mesorectal excision, lymph nodes and stomas'},
 {id:'chemo',t:'Chemotherapy after surgery',g:4,n:'4.2',d:'FOLFOX and CAPOX, 3 or 6 months, and who benefits'},
 {id:'rectal',t:'Rectal cancer pathway',g:4,n:'4.3',d:'Total neoadjuvant therapy, watch-and-wait, dMMR rectal cancer'},
 {id:'metastatic',t:'Metastatic disease',g:4,n:'4.4',d:'Liver and lung spread, targeted drugs, immunotherapy, surgery'},
 {id:'cure',t:'Toward a cure',g:4,n:'4.5',d:'ctDNA, blood tests, vaccines, new drugs, with evidence labels'},
 {id:'living',t:'Living with colorectal cancer',g:5,n:'5.1',d:'Stoma, bowel function, neuropathy, exercise and follow-up'},
 {id:'nursing',t:'Nursing care',g:5,n:'5.2',d:'Prep teaching, stoma care, chemotherapy safety and monitoring'},
 {id:'history',t:'History & people',g:6,n:'6.1',d:'From Dukes to Vogelstein, FIT and immunotherapy'},
 {id:'review',t:'Flashcards & mnemonics',g:6,n:'6.2',d:'Flip cards by part'},
 {id:'quiz',t:'Quiz',g:6,n:'6.3',d:'Questions with explanations'},
 {id:'glossary',t:'Glossary',g:6,n:'6.4',d:'Every term, searchable'},
 {id:'sources',t:'Sources',g:6,n:'6.5',d:'Every reference behind the app'}
];
const GROUPS={1:['The disease','g-dz','c-dz'],2:['Screening','g-screen','c-screen'],3:['Diagnosis & staging','g-dx','c-dx'],4:['Treatment','g-rx','c-rx'],5:['Living with CRC','g-live','c-live'],6:['Context & review','g-ix','c-ix']};
const inits={},onShow={},onHide={};let cur=null;
/* Each module is its own page, so search engines can index it: the body names the
   module (data-page) and the way back up to the companion's first page (data-root).
   A page that carries every module, like the artifact, has no data-page and switches
   modules by #hash. */
const PAGE=document.body.dataset.page||'',UP=document.body.dataset.root||'';
const href=id=>PAGE?(id==='home'?UP||'./':UP+id+'/'):'#'+id;
function go(id,hash,replace){const u=href(id)+(location.protocol==='file:'?'index.html':'')+(hash||'');replace?location.replace(u):location.assign(u)}
/* the first page opened in a tab (not one reached by a click inside the guide) may reopen the module last read */
let fresh=false;try{fresh=!sessionStorage.getItem('crc:tab');sessionStorage.setItem('crc:tab','1')}catch(e){}
(function buildNav(){
  let h='';
  for(const g of Object.keys(GROUPS).map(Number)){
    h+=`<div class="navgroup ${GROUPS[g][1]}"><h3>${GROUPS[g][0]}</h3><ol>`;
    MODS.filter(m=>m.g===g).forEach(m=>{h+=`<li><a class="navbtn" href="${href(m.id)}" data-go="${m.id}"><span class="n">${m.n}</span><span>${m.t.replace('&','&amp;')}</span></a></li>`});
    h+='</ol></div>';
  }
  $('#navgroups').innerHTML=h;
  let u='';
  Object.keys(GROUPS).map(Number).forEach(g=>{
    u+=`<div class="unit"><p class="eyebrow">Part ${g}</p><h2>${GROUPS[g][0].replace('&','&amp;')}</h2><ol>`;
    MODS.filter(m=>m.g===g).forEach(m=>{u+=`<li><button data-go="${m.id}"><span class="n">${m.n}</span><b>${m.t.replace('&','&amp;')}</b><small>${m.d}</small></button></li>`});
    u+='</ol></div>';
  });
  if($('#homeUnits'))$('#homeUnits').innerHTML=u;
  MODS.forEach((m,i)=>{
    const sec=$('#m-'+m.id);if(!sec)return;
    if(m.g)sec.classList.add(GROUPS[m.g][2]);
    if(m.id==='home')return;
    const p=MODS[i-1],n=MODS[i+1];
    const pg=document.createElement('div');pg.className='pager';
    pg.innerHTML=(p?`<button data-go="${p.id}"><small>← Previous</small><span>${p.t.replace('&','&amp;')}</span></button>`:'')+(n?`<button class="next" data-go="${n.id}"><small>Next →</small><span>${n.t.replace('&','&amp;')}</span></button>`:'');
    sec.appendChild(pg);
  });
})();
function show(id,keepScroll){
  if(!MODS.some(m=>m.id===id))id='home';
  if(PAGE&&id!==PAGE){
    /* boot asks first: for the #module of an old link, or for the module last read */
    if(cur){go(id);return}
    if(location.hash.slice(1)===id||(PAGE==='home'&&fresh)){go(id,'',true);return}
    id=PAGE;
  }
  const first=!cur;
  if(cur&&onHide[cur])onHide[cur]();
  $$('[data-mod]').forEach(s=>s.hidden=s.dataset.mod!==id);
  $$('.navbtn').forEach(b=>b.setAttribute('aria-current',b.dataset.go===id?'page':'false'));
  cur=id;
  if(inits[id]&&!inits[id].done){inits[id].done=true;inits[id]()}
  guardLive($('#m-'+id)||document);
  if(onShow[id])onShow[id]();
  store.set('last',id);
  if(!PAGE)try{history.replaceState(null,'','#'+id)}catch(e){}
  if(!keepScroll)window.scrollTo(0,0);
  const nb=$(`.navbtn[data-go="${id}"]`);
  if(nb&&matchMedia('(max-width:900px)').matches){const side=$('#side');side.scrollTo({left:nb.offsetLeft-side.clientWidth/2+nb.offsetWidth/2,behavior:RM?'auto':'smooth'})}
  if(first&&location.hash.startsWith('#src-'))flashSrc(location.hash.slice(5));
}
function flashSrc(k){const li=document.getElementById('src-'+k);if(li){li.scrollIntoView({block:'center',behavior:RM?'auto':'smooth'});li.classList.add('flash');setTimeout(()=>li.classList.remove('flash'),2200)}}
document.addEventListener('click',e=>{
  const sk=e.target.closest('.skip');if(sk){e.preventDefault();const m=$('#main');m&&m.focus();return}
  const c=e.target.closest('sup.c');
  if(c){e.preventDefault();const k=c.dataset.ref.split(',')[0];if(PAGE&&PAGE!=='sources'){go('sources','#src-'+k);return}show('sources');flashSrc(k);return}
  const b=e.target.closest('[data-go]');if(b){if(b.href&&(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey))return;e.preventDefault();show(b.dataset.go)}
});
/* theme: auto → light → dark */
/* language switch keeps the current module */
(function lang(){const a=$('#langBtn');if(!a)return;const base=a.getAttribute('href');
  const upd=()=>a.setAttribute('href',base+location.hash);['pointerdown','focus','click','mouseenter'].forEach(e=>a.addEventListener(e,upd));upd()})();
(function theme(){
  const btn=$('#themeBtn');const modes=['auto','light','dark'];let m=store.get('theme','auto');
  function apply(){if(m==='auto')document.documentElement.removeAttribute('data-theme');else document.documentElement.setAttribute('data-theme',m);btn.textContent='Theme: '+{auto:'auto',light:'light',dark:'dark'}[m]}
  btn.addEventListener('click',()=>{m=modes[(modes.indexOf(m)+1)%3];store.set('theme',m);apply()});apply();
})();
/* ---- narrow mode ----
   Phone stages are too small for the 720-wide layouts, so draw() asks NARROW()
   and lays its panels out in a tall column instead of a wide row. Modules that
   register a player are redrawn automatically when the stage crosses the
   threshold, so a rotation or a window resize re-lays-out the scene. */
const NARROW=()=>matchMedia('(max-width:820px)').matches;
const redraws={};
let _wasNarrow=NARROW(),_rt;
addEventListener('resize',()=>{clearTimeout(_rt);_rt=setTimeout(()=>{
  const n=NARROW();if(n===_wasNarrow)return;_wasNarrow=n;
  const f=redraws[cur];if(f)try{f()}catch(e){}
},160)});
/* fit the viewBox to the mode: wide|narrow are "w h" pairs */
function vb(svg,wide,narrow){const v=NARROW()?narrow:wide;svg.setAttribute('viewBox','0 0 '+v);svg.dataset.mode=NARROW()?'n':'w';return NARROW()}

/* ---- live regions ----
   Every frame of an animation rewrites its note panel, and a screen reader will
   announce an aria-live region each time its contents are replaced, even with the
   same text. Shadow innerHTML on those elements so an identical write is dropped:
   the reader hears the note once per real change, not sixty times a second. */
const _ihDesc=Object.getOwnPropertyDescriptor(Element.prototype,'innerHTML');
function guardLive(root=document){
  $$('[aria-live]',root).forEach(el=>{
    if(el._lguard)return;el._lguard=true;
    Object.defineProperty(el,'innerHTML',{configurable:true,
      get(){return _ihDesc.get.call(this)},
      set(v){if(v===this._lastHTML)return;this._lastHTML=v;_ihDesc.set.call(this,v)}});
  });
}

/* the shared player: a range input + a play button drive draw(t) */
function playWire(rg,pb,draw,dur,doneLabel='Replay',hideKey){
  let stopA=null;function stop(){if(stopA)stopA();stopA=null;pb.textContent='Play'}
  rg.addEventListener('input',()=>{stop();draw(+rg.value)});
  rg.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pb.click()}});
  if(!rg.getAttribute('aria-keyshortcuts'))rg.setAttribute('aria-keyshortcuts','Enter Space');
  pb.addEventListener('click',()=>{if(stopA){stop();return}let t0=+rg.value;const mx=+rg.max||1,mn=+rg.min||0;if(t0>=mx-(mx-mn)*.01)t0=mn;pb.textContent='Pause';
    stopA=animate((mx-t0)/(mx-mn)*dur,p=>{const t=t0+(mx-t0)*p;rg.value=t;draw(t)},()=>{stopA=null;pb.textContent=doneLabel})});
  if(hideKey){const prev=onHide[hideKey];onHide[hideKey]=()=>{prev&&prev();stop()}}
  if(hideKey){const prevR=redraws[hideKey];redraws[hideKey]=()=>{prevR&&prevR();stop();draw(+rg.value)}}
  return stop;
}
/* stepper buttons that jump the timeline */
function stepWire(el,steps,rg,draw,stop){
  el.innerHTML=steps.map((s,i)=>`<button data-st="${i}" aria-pressed="false"><b>${String(i+1).padStart(2,'0')}</b><span>${s.t}</span></button>`).join('');
  el.addEventListener('click',e=>{const b=e.target.closest('[data-st]');if(!b)return;stop&&stop();const s=steps[+b.dataset.st];rg.value=s.at;draw(s.at)});
  el.setAttribute('role','group');el.setAttribute('aria-label','Steps');
  return i=>{$$('[data-st]',el).forEach((b,k)=>b.setAttribute('aria-pressed',k===i));
    /* screen readers hear the step name, not a bare number, when the slider moves */
    if(rg&&steps[i])rg.setAttribute('aria-valuetext',`Step ${i+1} of ${steps.length}: ${steps[i].t}`)};
}
function phaseOf(steps,t){let p=0;steps.forEach((s,i)=>{if(t>=s.from)p=i});return p}
function noteHTML(P){return `<div class="kicker">${P.k||''}</div><h4>${P.t}</h4>${P.txt?`<p>${P.txt}</p>`:''}${P.pt?`<div class="pt"><b>In plain words</b>${P.pt}</div>`:''}${P.hook?`<div class="hook"><b>Exam hook</b>${P.hook}</div>`:''}`}
const SOURCES=[{"key": "Aaltonen1993", "text": "Aaltonen LA, Peltomäki P, Leach FS, Sistonen P, Pylkkänen L, Mecklin JP, et al. Clues to the pathogenesis of familial colorectal cancer. Science. 1993;260(5109):812-6. PMID 8484121; doi:10.1126/science.8484121.", "link": "https://doi.org/10.1126/science.8484121", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Abar2018", "text": "Abar L, Vieira AR, Aune D, Sobiecki JG, Vingeliene S, Polemiti E, et al. Height and body fatness and colorectal cancer risk: an update of the WCRF-AICR systematic review of published prospective studies. Eur J Nutr. 2018;57(5):1701-1720. PMID 29080978; PMCID PMC6060816; doi:10.1007/s00394-017-1557-1.", "link": "https://doi.org/10.1007/s00394-017-1557-1", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "ACCMAP1992", "text": "Advanced Colorectal Cancer Meta-Analysis Project. Modulation of fluorouracil by leucovorin in patients with advanced colorectal cancer: evidence in terms of response rate. J Clin Oncol. 1992;10(6):896-903. PMID 1534121; doi:10.1200/JCO.1992.10.6.896.", "link": "https://doi.org/10.1200/jco.1992.10.6.896", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Adam2024", "text": "Adam R, Piedvache C, Chiche L, Adam JP, Salamé E, Bucur P, et al. Liver transplantation plus chemotherapy versus chemotherapy alone in patients with permanently unresectable colorectal liver metastases (TransMet): results from a multicentre, open-label, prospective, randomised controlled trial. Lancet. 2024;404(10458):1107-1118. PMID 39306468; doi:10.1016/S0140-6736(24)01595-2.", "link": "https://doi.org/10.1016/s0140-6736(24)01595-2", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Akimoto2021", "text": "Akimoto N, Ugai T, Zhong R, Hamada T, Fujiyoshi K, Giannakis M, et al. Rising incidence of early-onset colorectal cancer - a call to action. Nat Rev Clin Oncol. 2021;18(4):230-243. PMID 33219329; PMCID PMC7994182; doi:10.1038/s41571-020-00445-1.", "link": "https://doi.org/10.1038/s41571-020-00445-1", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "AliKhan2020", "text": "Ali Khan U, Fallah M, Tian Y, Sundquist K, Sundquist J, Brenner H, et al. Personal History of Diabetes as Important as Family History of Colorectal Cancer for Risk of Colorectal Cancer: A Nationwide Cohort Study. Am J Gastroenterol. 2020;115(7):1103-1109. PMID 32618661; doi:10.14309/ajg.0000000000000669.", "link": "https://doi.org/10.14309/ajg.0000000000000669", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Allemani2018", "text": "Allemani C, Matsuda T, Di Carlo V, Harewood R, Matz M, Nikšić M, et al. Global surveillance of trends in cancer survival 2000-14 (CONCORD-3): analysis of individual records for 37 513 025 patients diagnosed with one of 18 cancers from 322 population-based registries in 71 countries. Lancet. 2018;391(10125):1023-1075. PMID 29395269; PMCID PMC5879496; doi:10.1016/S0140-6736(17)33326-3.", "link": "https://doi.org/10.1016/s0140-6736(17)33326-3", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "AlSukhni2012", "text": "Al-Sukhni E, Milot L, Fruitman M, Beyene J, Victor JC, Schmocker S, et al. Diagnostic accuracy of MRI for assessment of T category, lymph node metastases, and circumferential resection margin involvement in patients with rectal cancer: a systematic review and meta-analysis. Ann Surg Oncol. 2012;19(7):2212-23. PMID 22271205; doi:10.1245/s10434-011-2210-5.", "link": "https://doi.org/10.1245/s10434-011-2210-5", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Amado2008", "text": "Amado RG, Wolf M, Peeters M, Van Cutsem E, Siena S, Freeman DJ, et al. Wild-type KRAS is required for panitumumab efficacy in patients with metastatic colorectal cancer. J Clin Oncol. 2008;26(10):1626-34. PMID 18316791; doi:10.1200/JCO.2007.14.7116.", "link": "https://doi.org/10.1200/jco.2007.14.7116", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Amin2017AJCC", "text": "Amin MB, Edge SB, Greene FL, Byrd DR, Brookland RK, Washington MK, et al., eds. AJCC Cancer Staging Manual. 8th ed. Cham: Springer International Publishing; 2017. doi:10.1007/978-3-319-40618-3. Book; the colon and rectum chapter text was not accessed directly.", "link": "https://doi.org/10.1007/978-3-319-40618-3", "areas": ["E"], "unverified": false, "validated": "Crossref"}, {"key": "Amstutz2018", "text": "Amstutz U, Henricks LM, Offer SM, Barbarino J, Schellens JHM, Swen JJ, et al. Clinical Pharmacogenetics Implementation Consortium (CPIC) Guideline for Dihydropyrimidine Dehydrogenase Genotype and Fluoropyrimidine Dosing: 2017 Update. Clin Pharmacol Ther. 2018;103(2):210-216. PMID 29152729; PMCID PMC5760397; doi:10.1002/cpt.911. Frequencies and dosing table read from PMC full text.", "link": "https://doi.org/10.1002/cpt.911", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Andre2004", "text": "André T, Boni C, Mounedji-Boudiaf L, Navarro M, Tabernero J, Hickish T, et al. Oxaliplatin, fluorouracil, and leucovorin as adjuvant treatment for colon cancer. N Engl J Med. 2004;350(23):2343-51. PMID 15175436; doi:10.1056/NEJMoa032709.", "link": "https://doi.org/10.1056/nejmoa032709", "areas": ["A", "F", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Andre2009", "text": "André T, Boni C, Navarro M, Tabernero J, Hickish T, Topham C, et al. Improved overall survival with oxaliplatin, fluorouracil, and leucovorin as adjuvant treatment in stage II or III colon cancer in the MOSAIC trial. J Clin Oncol. 2009;27(19):3109-3116. PMID 19451431; doi:10.1200/jco.2008.20.6771.", "link": "https://doi.org/10.1200/jco.2008.20.6771", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Andre2015", "text": "André T, de Gramont A, Vernerey D, Chibaudel B, Bonnetain F, Tijeras-Raballand A, et al. Adjuvant Fluorouracil, Leucovorin, and Oxaliplatin in Stage II to III Colon Cancer: Updated 10-Year Survival and Outcomes According to BRAF Mutation and Mismatch Repair Status of the MOSAIC Study. J Clin Oncol. 2015;33(35):4176-4187. PMID 26527776; doi:10.1200/jco.2015.63.4238.", "link": "https://doi.org/10.1200/jco.2015.63.4238", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Andre2018", "text": "André T, Vernerey D, Mineur L, Bennouna J, Desrame J, Faroux R, et al. Three Versus 6 Months of Oxaliplatin-Based Adjuvant Chemotherapy for Patients With Stage III Colon Cancer: Disease-Free Survival Results From a Randomized, Open-Label, International Duration Evaluation of Adjuvant (IDEA) France, Phase III Trial. J Clin Oncol. 2018;36(15):1469-1477. PMID 29620995; doi:10.1200/JCO.2017.76.0355.", "link": "https://doi.org/10.1200/jco.2017.76.0355", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Andre2020", "text": "André T, Shiu KK, Kim TW, Jensen BV, Jensen LH, Punt C, et al. Pembrolizumab in Microsatellite-Instability-High Advanced Colorectal Cancer. N Engl J Med. 2020;383(23):2207-2218. PMID 33264544; doi:10.1056/NEJMoa2017699.", "link": "https://doi.org/10.1056/nejmoa2017699", "areas": ["A", "E", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Andre2020IDEA", "text": "André T, Meyerhardt J, Iveson T, Sobrero A, Yoshino T, Souglakos I, et al. Effect of duration of adjuvant chemotherapy for patients with stage III colon cancer (IDEA collaboration): final results from a prospective, pooled analysis of six randomised, phase 3 trials. Lancet Oncol. 2020;21(12):1620-1629. PMID 33271092; PMCID PMC7786835; doi:10.1016/s1470-2045(20)30527-1.", "link": "https://doi.org/10.1016/s1470-2045(20)30527-1", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Andre2024", "text": "André T, Elez E, Van Cutsem E, Jensen LH, Bennouna J, Mendez G, et al. Nivolumab plus Ipilimumab in Microsatellite-Instability-High Metastatic Colorectal Cancer. N Engl J Med. 2024;391(21):2014-2026. PMID 39602630; doi:10.1056/NEJMoa2402141.", "link": "https://doi.org/10.1056/nejmoa2402141", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Andre2025", "text": "André T, Elez E, Lenz HJ, Jensen LH, Touchefeu Y, Van Cutsem E, et al. Nivolumab plus ipilimumab versus nivolumab in microsatellite instability-high metastatic colorectal cancer (CheckMate 8HW): a randomised, open-label, phase 3 trial. Lancet. 2025;405(10476):383-395. PMID 39874977; doi:10.1016/S0140-6736(24)02848-4.", "link": "https://doi.org/10.1016/s0140-6736(24)02848-4", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Antoniou2018", "text": "Antoniou SA, Agresta F, Garcia Alamino JM, Berger D, Berrevoet F, Brandsma HT, et al. European Hernia Society guidelines on prevention and treatment of parastomal hernias. Hernia. 2018;22(1):183-198. PMID 29134456; doi:10.1007/s10029-017-1697-5.", "link": "https://doi.org/10.1007/s10029-017-1697-5", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Arnold2017", "text": "Arnold D, Lueza B, Douillard JY, Peeters M, Lenz HJ, Venook A, et al. Prognostic and predictive value of primary tumour side in patients with RAS wild-type metastatic colorectal cancer treated with chemotherapy and EGFR directed antibodies in six randomized trials. Ann Oncol. 2017;28(8):1713-1729. PMID 28407110; PMCID PMC6246616; doi:10.1093/annonc/mdx175.", "link": "https://doi.org/10.1093/annonc/mdx175", "areas": ["C", "E"], "unverified": false, "validated": "Europe PMC"}, {"key": "Arnold2019", "text": "Arnold M, Rutherford MJ, Bardot A, Ferlay J, Andersson TM, Myklebust TÅ, et al. Progress in cancer survival, mortality, and incidence in seven high-income countries 1995-2014 (ICBP SURVMARK-2): a population-based study. Lancet Oncol. 2019;20(11):1493-1505. PMID 31521509; PMCID PMC6838671; doi:10.1016/S1470-2045(19)30456-5.", "link": "https://doi.org/10.1016/s1470-2045(19)30456-5", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Arthur2012", "text": "Arthur JC, Perez-Chanona E, Mühlbauer M, Tomkovich S, Uronis JM, Fan TJ, et al. Intestinal inflammation targets cancer-inducing activity of the microbiota. Science. 2012;338(6103):120-3. PMID 22903521; PMCID PMC3645302; doi:10.1126/science.1224820.", "link": "https://doi.org/10.1126/science.1224820", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Askari2017", "text": "Askari A, Nachiappan S, Currie A, Bottle A, Abercrombie J, Athanasiou T, et al. Who requires emergency surgery for colorectal cancer and can national screening programmes reduce this need? Int J Surg. 2017;42:60-68. PMID 28456708; doi:10.1016/j.ijsu.2017.04.050.", "link": "https://doi.org/10.1016/j.ijsu.2017.04.050", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Astin2011", "text": "Astin M, Griffin T, Neal RD, Rose P, Hamilton W. The diagnostic value of symptoms for colorectal cancer in primary care: a systematic review. Br J Gen Pract. 2011;61(586):e231-43. PMID 21619747; PMCID PMC3080228; doi:10.3399/bjgp11X572427.", "link": "https://doi.org/10.3399/bjgp11x572427", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Astler1954", "text": "Astler VB, Coller FA. The prognostic significance of direct extension of carcinoma of the colon and rectum. Ann Surg. 1954;139(6):846-52. PMID 13159135; PMCID PMC1609522; doi:10.1097/00000658-195406000-00015.", "link": "https://doi.org/10.1097/00000658-195406000-00015", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Atkin2010", "text": "Atkin WS, Edwards R, Kralj-Hans I, Wooldrage K, Hart AR, Northover JM, et al. Once-only flexible sigmoidoscopy screening in prevention of colorectal cancer: a multicentre randomised controlled trial. Lancet. 2010;375(9726):1624-33. PMID 20430429; doi:10.1016/S0140-6736(10)60551-X.", "link": "https://doi.org/10.1016/s0140-6736(10)60551-x", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Atkin2017", "text": "Atkin W, Wooldrage K, Parkin DM, Kralj-Hans I, MacRae E, Shah U, et al. Long term effects of once-only flexible sigmoidoscopy screening after 17 years of follow-up: the UK Flexible Sigmoidoscopy Screening randomised controlled trial. Lancet. 2017;389(10076):1299-1311. PMID 28236467; PMCID PMC6168937; doi:10.1016/S0140-6736(17)30396-3.", "link": "https://doi.org/10.1016/s0140-6736(17)30396-3", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Aune2011", "text": "Aune D, Chan DS, Lau R, Vieira R, Greenwood DC, Kampman E, et al. Dietary fibre, whole grains, and risk of colorectal cancer: systematic review and dose-response meta-analysis of prospective studies. BMJ. 2011;343:d6617. PMID 22074852; PMCID PMC3213242; doi:10.1136/bmj.d6617.", "link": "https://doi.org/10.1136/bmj.d6617", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Aune2012", "text": "Aune D, Lau R, Chan DSM, Vieira R, Greenwood DC, Kampman E, et al. Dairy products and colorectal cancer risk: a systematic review and meta-analysis of cohort studies. Ann Oncol. 2012;23(1):37-45. PMID 21617020; doi:10.1093/annonc/mdr269.", "link": "https://doi.org/10.1093/annonc/mdr269", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Azzouz2023", "text": "Azzouz LL, Sharma S. Physiology, Large Intestine. In: StatPearls [Internet]. Treasure Island (FL): StatPearls Publishing; 2023 (updated 2023 Jul 31). PMID 29939634.", "link": "https://pubmed.ncbi.nlm.nih.gov/29939634/", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Back2021", "text": "Back E, Häggström J, Holmgren K, Haapamäki MM, Matthiessen P, Rutegård J, et al. Permanent stoma rates after anterior resection for rectal cancer: risk prediction scoring using preoperative variables. Br J Surg. 2021;108(11):1388-1395. PMID 34508549; PMCID PMC10364873; doi:10.1093/bjs/znab260.", "link": "https://doi.org/10.1093/bjs/znab260", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Bahadoer2021", "text": "Bahadoer RR, Dijkstra EA, van Etten B, Marijnen CAM, Putter H, Kranenbarg EM, et al. Short-course radiotherapy followed by chemotherapy before total mesorectal excision (TME) versus preoperative chemoradiotherapy, TME, and optional adjuvant chemotherapy in locally advanced rectal cancer (RAPIDO): a randomised, open-label, phase 3 trial. Lancet Oncol. 2021;22(1):29-42. PMID 33301740; doi:10.1016/s1470-2045(20)30555-6.", "link": "https://doi.org/10.1016/s1470-2045(20)30555-6", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Baidoo2024", "text": "Baidoo N, Sanger GJ. Age-related decline in goblet cell numbers and mucin content of the human colon: Implications for lower bowel functions in the elderly. Exp Mol Pathol. 2024;139:104923. PMID 39154390; doi:10.1016/j.yexmp.2024.104923.", "link": "https://doi.org/10.1016/j.yexmp.2024.104923", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Bailey2021", "text": "Bailey JA, Weller J, Chapman CJ, Ford A, Hardy K, Oliver S, et al. Faecal immunochemical testing and blood tests for prioritization of urgent colorectal cancer referrals in symptomatic patients: a 2-year evaluation. BJS Open. 2021;5(2). PMID 33693553; PMCID PMC7947575; doi:10.1093/bjsopen/zraa056.", "link": "https://doi.org/10.1093/bjsopen/zraa056", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Baker2011", "text": "Baker ML, Williams RN, Nightingale JM. Causes and management of a high-output stoma. Colorectal Dis. 2011;13(2):191-7. PMID 19888956; doi:10.1111/j.1463-1318.2009.02107.x.", "link": "https://doi.org/10.1111/j.1463-1318.2009.02107.x", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Baker2014", "text": "Baker AM, Cereser B, Melton S, Fletcher AG, Rodriguez-Justo M, Tadrous PJ, et al. Quantification of crypt and stem cell evolution in the normal and neoplastic human colon. Cell Rep. 2014;8(4):940-7. PMID 25127143; PMCID PMC4471679; doi:10.1016/j.celrep.2014.07.019.", "link": "https://doi.org/10.1016/j.celrep.2014.07.019", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Baker2019", "text": "Baker AM, Gabbutt C, Williams MJ, Cereser B, Jawad N, Rodriguez-Justo M, et al. Crypt fusion as a homeostatic mechanism in the human colon. Gut. 2019;68(11):1986-1993. PMID 30872394; PMCID PMC6839731; doi:10.1136/gutjnl-2018-317540.", "link": "https://doi.org/10.1136/gutjnl-2018-317540", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Bando2026", "text": "Bando H, Watanabe J, Takahashi Y, Kotaka M, Matsuhashi N, Oki E, et al. Post-adjuvant chemotherapy in ctDNA-positive patients with resected colorectal cancer: a randomized phase 3 trial. Nat Med. 2026;32(7):2473-2480. PMID 42260101; PMCID PMC13375530; doi:10.1038/s41591-026-04428-0.", "link": "https://doi.org/10.1038/s41591-026-04428-0", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Baran2018", "text": "Baran B, Mert Ozupek N, Yerli Tetik N, Acar E, Bekcioglu O, Baskin Y. Difference Between Left-Sided and Right-Sided Colorectal Cancer: A Focused Review of Literature. Gastroenterology Res. 2018;11(4):264-273. PMID 30116425; PMCID PMC6089587; doi:10.14740/gr1062w.", "link": "https://doi.org/10.14740/gr1062w", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Barclay2006", "text": "Barclay RL, Vicari JJ, Doughty AS, Johanson JF, Greenlaw RL. Colonoscopic withdrawal times and adenoma detection during screening colonoscopy. N Engl J Med. 2006;355(24):2533-41. PMID 17167136; doi:10.1056/NEJMoa055498.", "link": "https://doi.org/10.1056/nejmoa055498", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Barker2007", "text": "Barker N, van Es JH, Kuipers J, Kujala P, van den Born M, Cozijnsen M, et al. Identification of stem cells in small intestine and colon by marker gene Lgr5. Nature. 2007;449(7165):1003-7. PMID 17934449; doi:10.1038/nature06196.", "link": "https://doi.org/10.1038/nature06196", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Barnell2023", "text": "Barnell EK, Wurtzler EM, La Rocca J, Fitzgerald T, Petrone J, Hao Y, et al. Multitarget Stool RNA Test for Colorectal Cancer Screening. JAMA. 2023;330(18):1760-1768. PMID 37870871; PMCID PMC10594178; doi:10.1001/jama.2023.22231.", "link": "https://doi.org/10.1001/jama.2023.22231", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Baron1999", "text": "Baron JA, Beach M, Mandel JS, van Stolk RU, Haile RW, Sandler RS, et al. Calcium supplements for the prevention of colorectal adenomas. Calcium Polyp Prevention Study Group. N Engl J Med. 1999;340(2):101-7. PMID 9887161; doi:10.1056/NEJM199901143400204.", "link": "https://doi.org/10.1056/nejm199901143400204", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Baron2003", "text": "Baron JA, Cole BF, Sandler RS, Haile RW, Ahnen D, Bresalier R, et al. A randomized trial of aspirin to prevent colorectal adenomas. N Engl J Med. 2003;348(10):891-9. PMID 12621133; doi:10.1056/NEJMoa021735.", "link": "https://doi.org/10.1056/nejmoa021735", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Baron2015", "text": "Baron JA, Barry EL, Mott LA, Rees JR, Sandler RS, Snover DC, et al. A Trial of Calcium and Vitamin D for the Prevention of Colorectal Adenomas. N Engl J Med. 2015;373(16):1519-30. PMID 26465985; PMCID PMC4643064; doi:10.1056/NEJMoa1500409.", "link": "https://doi.org/10.1056/nejmoa1500409", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Baskarane2026", "text": "Baskarane H, Sahni S, Nagpal C, Divakar MK, Pathak N, Kumar S, et al. Preventing Hand-Foot Syndrome in Patients With Cancer: A Systematic Review and Network Meta-Analysis. JAMA Dermatol. 2026;162(4):386-394. PMID 41779386; PMCID PMC12961603; doi:10.1001/jamadermatol.2026.0042.", "link": "https://doi.org/10.1001/jamadermatol.2026.0042", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Baxter2022", "text": "Baxter NN, Kennedy EB, Bergsland E, Berlin J, George TJ, Gill S, et al. Adjuvant Therapy for Stage II Colon Cancer: ASCO Guideline Update. J Clin Oncol. 2022;40(8):892-910. PMID 34936379; doi:10.1200/JCO.21.02538.", "link": "https://doi.org/10.1200/jco.21.02538", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Beggs2010", "text": "Beggs AD, Latchford AR, Vasen HF, Moslein G, Alonso A, Aretz S, et al. Peutz-Jeghers syndrome: a systematic review and recommendations for management. Gut. 2010;59(7):975-86. PMID 20581245; doi:10.1136/gut.2009.198499.", "link": "https://doi.org/10.1136/gut.2009.198499", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Beijers2015", "text": "Beijers AJ, Mols F, Tjan-Heijnen VC, Faber CG, van de Poll-Franse LV, Vreugdenhil G. Peripheral neuropathy in colorectal cancer survivors: the influence of oxaliplatin administration. Results from the population-based PROFILES registry. Acta Oncol. 2015;54(4):463-9. PMID 25417732; doi:10.3109/0284186X.2014.980912.", "link": "https://doi.org/10.3109/0284186x.2014.980912", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Beijers2020", "text": "Beijers AJM, Bonhof CS, Mols F, Ophorst J, de Vos-Geelen J, Jacobs EMG, et al. Multicenter randomized controlled trial to evaluate the efficacy and tolerability of frozen gloves for the prevention of chemotherapy-induced peripheral neuropathy. Ann Oncol. 2020;31(1):131-136. PMID 31912787; doi:10.1016/j.annonc.2019.09.006.", "link": "https://doi.org/10.1016/j.annonc.2019.09.006", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Bennouna2026", "text": "Bennouna J, André T, Martin E, Cremolini C, Gill S, Asmis T, et al. A randomised phase III trial of adjuvant treatment intensification with mFOLFIRINOX versus mFOLFOX6 in high-risk stage III colon cancer: Results of the international IROCAS study. Ann Oncol. 2026 (online ahead of print 25 Oct 2026). PMID 42927853; doi:10.1016/j.annonc.2026.10.104.", "link": "https://doi.org/10.1016/j.annonc.2026.10.104", "areas": ["F"], "unverified": false, "validated": "PubMed, 2026-10-29"}, {"key": "Benson2004", "text": "Benson AB 3rd, Schrag D, Somerfield MR, Cohen AM, Figueredo AT, Flynn PJ, et al. American Society of Clinical Oncology recommendations on adjuvant chemotherapy for stage II colon cancer. J Clin Oncol. 2004;22(16):3408-19. PMID 15199089; doi:10.1200/JCO.2004.05.063.", "link": "https://doi.org/10.1200/jco.2004.05.063", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Benson2021", "text": "Benson AB, Venook AP, Al-Hawary MM, Arain MA, Chen YJ, Ciombor KK, et al. Colon Cancer, Version 2.2021, NCCN Clinical Practice Guidelines in Oncology. J Natl Compr Canc Netw. 2021;19(3):329-359. PMID 33724754; doi:10.6004/jnccn.2021.0012.", "link": "https://doi.org/10.6004/jnccn.2021.0012", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Benson2022", "text": "Benson AB, Venook AP, Al-Hawary MM, Azad N, Chen YJ, Ciombor KK, et al. Rectal Cancer, Version 2.2022, NCCN Clinical Practice Guidelines in Oncology. J Natl Compr Canc Netw. 2022;20(10):1139-1167. PMID 36240850; doi:10.6004/jnccn.2022.0051.", "link": "https://doi.org/10.6004/jnccn.2022.0051", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "BerringtondeGonzalez2011", "text": "Berrington de González A, Kim KP, Knudsen AB, Lansdorp-Vogelaar I, Rutter CM, Smith-Bindman R, et al. Radiation-related cancer risks from CT colonography screening: a risk-benefit analysis. AJR Am J Roentgenol. 2011;196(4):816-23. PMID 21427330; PMCID PMC3470483; doi:10.2214/AJR.10.4907.", "link": "https://doi.org/10.2214/ajr.10.4907", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Bettegowda2014", "text": "Bettegowda C, Sausen M, Leary RJ, Kinde I, Wang Y, Agrawal N, et al. Detection of circulating tumor DNA in early- and late-stage human malignancies. Sci Transl Med. 2014;6(224):224ra24. PMID 24553385; PMCID PMC4017867; doi:10.1126/scitranslmed.3007094.", "link": "https://doi.org/10.1126/scitranslmed.3007094", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Bettington2017", "text": "Bettington M, Walker N, Rosty C, Brown I, Clouston A, McKeone D, et al. Clinicopathological and molecular features of sessile serrated adenomas with dysplasia or carcinoma. Gut. 2017;66(1):97-106. PMID 26475632; doi:10.1136/gutjnl-2015-310456.", "link": "https://doi.org/10.1136/gutjnl-2015-310456", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Biagi2011", "text": "Biagi JJ, Raphael MJ, Mackillop WJ, Kong W, King WD, Booth CM. Association between time to initiation of adjuvant chemotherapy and survival in colorectal cancer: a systematic review and meta-analysis. JAMA. 2011;305(22):2335-2342. PMID 21642686; doi:10.1001/jama.2011.749.", "link": "https://doi.org/10.1001/jama.2011.749", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "BibbinsDomingo2016", "text": "Bibbins-Domingo K. Aspirin Use for the Primary Prevention of Cardiovascular Disease and Colorectal Cancer: U.S. Preventive Services Task Force Recommendation Statement. Ann Intern Med. 2016;164(12):836-45. PMID 27064677; doi:10.7326/M16-0577.", "link": "https://doi.org/10.7326/m16-0577", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Bojesson2024", "text": "Bojesson A, Brun E, Eberhard J, Segerlantz M. Quality of life for patients with advanced gastrointestinal cancer randomised to early specialised home-based palliative care: the ALLAN trial. Br J Cancer. 2024;131(4):729-736. PMID 38951699; PMCID PMC11333621; doi:10.1038/s41416-024-02764-x.", "link": "https://doi.org/10.1038/s41416-024-02764-x", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Boland1984", "text": "Boland CR, Troncale FJ. Familial colonic cancer without antecedent polyposis. Ann Intern Med. 1984;100(5):700-1. PMID 6712034; doi:10.7326/0003-4819-100-5-700.", "link": "https://doi.org/10.7326/0003-4819-100-5-700", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Boland2010", "text": "Boland CR, Goel A. Microsatellite instability in colorectal cancer. Gastroenterology. 2010;138(6):2073-2087.e3. PMID 20420947; PMCID PMC3037515; doi:10.1053/j.gastro.2009.12.064.", "link": "https://doi.org/10.1053/j.gastro.2009.12.064", "areas": ["C", "E"], "unverified": false, "validated": "PubMed"}, {"key": "Bonadona2011", "text": "Bonadona V, Bonaïti B, Olschwang S, Grandjouan S, Huiart L, Longy M, et al. Cancer risks associated with germline mutations in MLH1, MSH2, and MSH6 genes in Lynch syndrome. JAMA. 2011;305(22):2304-10. PMID 21642682; doi:10.1001/jama.2011.743.", "link": "https://doi.org/10.1001/jama.2011.743", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Bond2023", "text": "Bond MJG, Bolhuis K, Loosveld OJL, de Groot JWB, Droogendijk H, Helgason HH, et al. First-line systemic treatment strategies in patients with initially unresectable colorectal cancer liver metastases (CAIRO5): an open-label, multicentre, randomised, controlled, phase 3 study from the Dutch Colorectal Cancer Group. Lancet Oncol. 2023;24(7):757-771. PMID 37329889; doi:10.1016/S1470-2045(23)00219-X.", "link": "https://doi.org/10.1016/s1470-2045(23)00219-x", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Bonhof2021", "text": "Bonhof CS, van de Poll-Franse LV, Wasowicz DK, Beerepoot LV, Vreugdenhil G, Mols F. The course of peripheral neuropathy and its association with health-related quality of life among colorectal cancer patients. J Cancer Surviv. 2021;15(2):190-200. PMID 33185839; PMCID PMC7966630; doi:10.1007/s11764-020-00923-6.", "link": "https://doi.org/10.1007/s11764-020-00923-6", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Bonjer2015", "text": "Bonjer HJ, Deijen CL, Abis GA, Cuesta MA, van der Pas MH, de Lange-de Klerk ES, et al. A randomized trial of laparoscopic versus open surgery for rectal cancer. N Engl J Med. 2015;372(14):1324-1332. PMID 25830422; doi:10.1056/nejmoa1414882.", "link": "https://doi.org/10.1056/nejmoa1414882", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Borucki2021", "text": "Borucki JP, Schlaeger S, Crane J, Hernon JM, Stearns AT. Risk and consequences of dehydration following colorectal cancer resection with diverting ileostomy. A systematic review and meta-analysis. Colorectal Dis. 2021;23(7):1721-1732. PMID 33783976; doi:10.1111/codi.15654.", "link": "https://doi.org/10.1111/codi.15654", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Botteri2008", "text": "Botteri E, Iodice S, Bagnardi V, Raimondi S, Lowenfels AB, Maisonneuve P. Smoking and colorectal cancer: a meta-analysis. JAMA. 2008;300(23):2765-78. PMID 19088354; doi:10.1001/jama.2008.839.", "link": "https://doi.org/10.1001/jama.2008.839", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Bouvard2015", "text": "Bouvard V, Loomis D, Guyton KZ, Grosse Y, Ghissassi FE, Benbrahim-Tallaa L, et al. Carcinogenicity of consumption of red and processed meat. Lancet Oncol. 2015;16(16):1599-600. PMID 26514947; doi:10.1016/S1470-2045(15)00444-1.", "link": "https://doi.org/10.1016/s1470-2045(15)00444-1", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Bray2024", "text": "Bray F, Laversanne M, Sung H, Ferlay J, Siegel RL, Soerjomataram I, et al. Global cancer statistics 2022: GLOBOCAN estimates of incidence and mortality worldwide for 36 cancers in 185 countries. CA Cancer J Clin. 2024;74(3):229-263. PMID 38572751; doi:10.3322/caac.21834.", "link": "https://doi.org/10.3322/caac.21834", "areas": ["A", "B", "D"], "unverified": false, "validated": "PubMed"}, {"key": "Brenner2007", "text": "Brenner H, Hoffmeister M, Stegmaier C, Brenner G, Altenhofen L, Haug U. Risk of progression of advanced adenomas to colorectal cancer by age and sex: estimates based on 840,149 screening colonoscopies. Gut. 2007;56(11):1585-9. PMID 17591622; PMCID PMC2095643; doi:10.1136/gut.2007.122739.", "link": "https://doi.org/10.1136/gut.2007.122739", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Brenner2011", "text": "Brenner H, Altenhofen L, Katalinic A, Lansdorp-Vogelaar I, Hoffmeister M. Sojourn time of preclinical colorectal cancer by sex and age: estimates from the German national screening colonoscopy database. Am J Epidemiol. 2011;174(10):1140-6. PMID 21984657; doi:10.1093/aje/kwr188.", "link": "https://doi.org/10.1093/aje/kwr188", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Brenner2014", "text": "Brenner H, Stock C, Hoffmeister M. Effect of screening sigmoidoscopy and screening colonoscopy on colorectal cancer incidence and mortality: systematic review and meta-analysis of randomised controlled trials and observational studies. BMJ. 2014;348:g2467. PMID 24922745; PMCID PMC3980789; doi:10.1136/bmj.g2467.", "link": "https://doi.org/10.1136/bmj.g2467", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Brenner2017", "text": "Brenner H, Werner S. Selecting a Cut-off for Colorectal Cancer Screening With a Fecal Immunochemical Test. Clin Transl Gastroenterol. 2017;8(8):e111. PMID 28771240; PMCID PMC5587839; doi:10.1038/ctg.2017.37.", "link": "https://doi.org/10.1038/ctg.2017.37", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Bretthauer2016", "text": "Bretthauer M, Kaminski MF, Løberg M, Zauber AG, Regula J, Kuipers EJ, et al. Population-Based Colonoscopy Screening for Colorectal Cancer: A Randomized Clinical Trial. JAMA Intern Med. 2016;176(7):894-902. PMID 27214731; PMCID PMC5333856; doi:10.1001/jamainternmed.2016.0960.", "link": "https://doi.org/10.1001/jamainternmed.2016.0960", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Bretthauer2022", "text": "Bretthauer M, Løberg M, Wieszczy P, Kalager M, Emilsson L, Garborg K, et al. Effect of Colonoscopy Screening on Risks of Colorectal Cancer and Related Death. N Engl J Med. 2022;387(17):1547-1556. PMID 36214590; doi:10.1056/NEJMoa2208375.", "link": "https://doi.org/10.1056/nejmoa2208375", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Bronner1994", "text": "Bronner CE, Baker SM, Morrison PT, Warren G, Smith LG, Lescoe MK, et al. Mutation in the DNA mismatch repair gene homologue hMLH1 is associated with hereditary non-polyposis colon cancer. Nature. 1994;368(6468):258-61. PMID 8145827; doi:10.1038/368258a0.", "link": "https://doi.org/10.1038/368258a0", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Brosens2007", "text": "Brosens LA, van Hattem A, Hylind LM, Iacobuzio-Donahue C, Romans KE, Axilbund J, et al. Risk of colorectal cancer in juvenile polyposis. Gut. 2007;56(7):965-7. PMID 17303595; PMCID PMC1994351; doi:10.1136/gut.2006.116913.", "link": "https://doi.org/10.1136/gut.2006.116913", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Buisman2022", "text": "Buisman FE, Filipe WF, Galjart B, Grünhagen DJ, Homs MYV, Moelker A, et al. Adjuvant intra-arterial chemotherapy for patients with resected colorectal liver metastases: a systematic review and meta-analysis. HPB (Oxford). 2022;24(3):299-308. PMID 34895829; doi:10.1016/j.hpb.2021.10.014.", "link": "https://doi.org/10.1016/j.hpb.2021.10.014", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Bullman2017", "text": "Bullman S, Pedamallu CS, Sicinska E, Clancy TE, Zhang X, Cai D, et al. Analysis of Fusobacterium persistence and antibiotic response in colorectal cancer. Science. 2017;358(6369):1443-1448. PMID 29170280; PMCID PMC5823247; doi:10.1126/science.aal5240.", "link": "https://doi.org/10.1126/science.aal5240", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Bulow2004", "text": "Bülow S, Björk J, Christensen IJ, Fausa O, Järvinen H, Moesgaard F, et al. Duodenal adenomatosis in familial adenomatous polyposis. Gut. 2004;53(3):381-6. PMID 14960520; PMCID PMC1773976; doi:10.1136/gut.2003.027771.", "link": "https://doi.org/10.1136/gut.2003.027771", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Burn2011", "text": "Burn J, Gerdes AM, Macrae F, Mecklin JP, Moeslein G, Olschwang S, et al. Long-term effect of aspirin on cancer risk in carriers of hereditary colorectal cancer: an analysis from the CAPP2 randomised controlled trial. Lancet. 2011;378(9809):2081-7. PMID 22036019; PMCID PMC3243929; doi:10.1016/S0140-6736(11)61049-0.", "link": "https://doi.org/10.1016/s0140-6736(11)61049-0", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Burn2020", "text": "Burn J, Sheth H, Elliott F, Reed L, Macrae F, Mecklin JP, et al. Cancer prevention with aspirin in hereditary colorectal cancer (Lynch syndrome), 10-year follow-up and registry-based 20-year data in the CAPP2 study: a double-blind, randomised, placebo-controlled trial. Lancet. 2020;395(10240):1855-1863. PMID 32534647; PMCID PMC7294238; doi:10.1016/S0140-6736(20)30366-4.", "link": "https://doi.org/10.1016/s0140-6736(20)30366-4", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Butterworth2006", "text": "Butterworth AS, Higgins JP, Pharoah P. Relative and absolute risk of colorectal cancer for individuals with a family history: a meta-analysis. Eur J Cancer. 2006;42(2):216-27. PMID 16338133; doi:10.1016/j.ejca.2005.09.023.", "link": "https://doi.org/10.1016/j.ejca.2005.09.023", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Campos2024", "text": "Campos FG, Bustamante-Lopez LA, D'Albuquerque LAC, Ribeiro Junior U, Herman P, Martinez CAR. A REVIEW TO HONOR THE HISTORICAL CONTRIBUTIONS OF PAULINE GROSS, ALDRED WARTHIN, AND HENRY LYNCH IN THE DESCRIPTION AND RECOGNITION OF INHERITANCE IN COLORECTAL CANCER. Arq Bras Cir Dig. 2024;37:e1812. PMID 38958348; PMCID PMC11216406; doi:10.1590/0102-6720202400019e1812.", "link": "https://doi.org/10.1590/0102-6720202400019e1812", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Carne2003", "text": "Carne PW, Robertson GM, Frizelle FA. Parastomal hernia. Br J Surg. 2003;90(7):784-93. PMID 12854101; doi:10.1002/bjs.4220.", "link": "https://doi.org/10.1002/bjs.4220", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Castellarin2012", "text": "Castellarin M, Warren RL, Freeman JD, Dreolini L, Krzywinski M, Strauss J, et al. Fusobacterium nucleatum infection is prevalent in human colorectal carcinoma. Genome Res. 2012;22(2):299-306. PMID 22009989; PMCID PMC3266037; doi:10.1101/gr.126516.111.", "link": "https://doi.org/10.1101/gr.126516.111", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Castells2025", "text": "Castells A, Quintero E, Bujanda L, Castán-Cameo S, Cubiella J, Díaz-Tasende J, et al. Effect of invitation to colonoscopy versus faecal immunochemical test screening on colorectal cancer mortality (COLONPREV): a pragmatic, randomised, controlled, non-inferiority trial. Lancet. 2025;405(10486):1231-1239. PMID 40158525; doi:10.1016/S0140-6736(25)00145-X.", "link": "https://doi.org/10.1016/s0140-6736(25)00145-x", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Castells2026", "text": "Castells A, Quintero E, Chen H, Bujanda L, Castán-Cameo S, Cubiella J, et al. Colonoscopy versus biennial FIT screening: a post hoc sustained-strategy analysis of the COLONPREV Trial. Gut. 2026 (online ahead of print; volume and pages not yet assigned). PMID 42270316; doi:10.1136/gutjnl-2026-338896.", "link": "https://doi.org/10.1136/gutjnl-2026-338896", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Cercek2022", "text": "Cercek A, Lumish M, Sinopoli J, Weiss J, Shia J, Lamendola-Essel M, et al. PD-1 Blockade in Mismatch Repair-Deficient, Locally Advanced Rectal Cancer. N Engl J Med. 2022;386(25):2363-2376. PMID 35660797; PMCID PMC9492301; doi:10.1056/NEJMoa2201445.", "link": "https://doi.org/10.1056/nejmoa2201445", "areas": ["A", "F", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Cercek2025", "text": "Cercek A, Foote MB, Rousseau B, Smith JJ, Shia J, Sinopoli J, et al. Nonoperative Management of Mismatch Repair-Deficient Tumors. N Engl J Med. 2025;392(23):2297-2308. PMID 40293177; PMCID PMC12661660; doi:10.1056/nejmoa2404512.", "link": "https://doi.org/10.1056/nejmoa2404512", "areas": ["F", "G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Cercek2026", "text": "Cercek A, Bachet JB, Folprecht G, Bando H, Seligmann J, Starling N, et al. Clinical Complete Response with Dostarlimab Monotherapy in dMMR/MSI-H Locally Advanced Rectal Cancer: First Results from the Global AZUR-1 Trial. Ann Oncol. 2026 (online ahead of print 25 Oct 2026). PMID 42927858; doi:10.1016/j.annonc.2026.10.1280.", "link": "https://doi.org/10.1016/j.annonc.2026.10.1280", "areas": ["F"], "unverified": false, "validated": "PubMed, 2026-10-29"}, {"key": "Chalabi2024", "text": "Chalabi M, Verschoor YL, Tan PB, Balduzzi S, Van Lent AU, Grootscholten C, et al. Neoadjuvant Immunotherapy in Locally Advanced Mismatch Repair-Deficient Colon Cancer. N Engl J Med. 2024;390(21):1949-1958. PMID 38838311; doi:10.1056/nejmoa2400634.", "link": "https://doi.org/10.1056/nejmoa2400634", "areas": ["F", "G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Chan2005", "text": "Chan AT, Giovannucci EL, Meyerhardt JA, Schernhammer ES, Curhan GC, Fuchs CS. Long-term use of aspirin and nonsteroidal anti-inflammatory drugs and risk of colorectal cancer. JAMA. 2005;294(8):914-23. PMID 16118381; PMCID PMC1550973; doi:10.1001/jama.294.8.914.", "link": "https://doi.org/10.1001/jama.294.8.914", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Chan2011", "text": "Chan DS, Lau R, Aune D, Vieira R, Greenwood DC, Kampman E, et al. Red and processed meat and colorectal cancer incidence: meta-analysis of prospective studies. PLoS One. 2011;6(6):e20456. PMID 21674008; PMCID PMC3108955; doi:10.1371/journal.pone.0020456.", "link": "https://doi.org/10.1371/journal.pone.0020456", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Chang2007", "text": "Chang GJ, Rodriguez-Bigas MA, Skibber JM, Moyer VA. Lymph node evaluation and survival after curative resection of colon cancer: systematic review. J Natl Cancer Inst. 2007;99(6):433-41. PMID 17374833; doi:10.1093/jnci/djk092.", "link": "https://doi.org/10.1093/jnci/djk092", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Chia2025", "text": "Chia JWK, Segelov E, Deng Y, Ho GF, Wang W, Han S, et al. Aspirin after completion of standard adjuvant therapy for colorectal cancer (ASCOLT): an international, multicentre, phase 3, randomised, double-blind, placebo-controlled trial. Lancet Gastroenterol Hepatol. 2025;10(3):198-209. PMID 39824200; doi:10.1016/S2468-1253(24)00387-X.", "link": "https://doi.org/10.1016/s2468-1253(24)00387-x", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Chiu2015", "text": "Chiu HM, Chen SL, Yen AM, Chiu SY, Fann JC, Lee YC, et al. Effectiveness of fecal immunochemical testing in reducing colorectal cancer mortality from the One Million Taiwanese Screening Program. Cancer. 2015;121(18):3221-9. PMID 25995082; PMCID PMC4676309; doi:10.1002/cncr.29462.", "link": "https://doi.org/10.1002/cncr.29462", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Chiu2021", "text": "Chiu HM, Jen GH, Wang YW, Fann JC, Hsu CY, Jeng YC, et al. Long-term effectiveness of faecal immunochemical test screening for proximal and distal colorectal cancers. Gut. 2021;70(12):2321-2329. PMID 33495268; PMCID PMC8588305; doi:10.1136/gutjnl-2020-322545.", "link": "https://doi.org/10.1136/gutjnl-2020-322545", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Christensen2021", "text": "Christensen P, Im Baeten C, Espín-Basany E, Martellucci J, Nugent KP, Zerbib F, et al. Management guidelines for low anterior resection syndrome - the MANUEL project. Colorectal Dis. 2021;23(2):461-475. PMID 33411977; PMCID PMC7986060; doi:10.1111/codi.15517. LARS item points read from the full text (Europe PMC).", "link": "https://doi.org/10.1111/codi.15517", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Chung2024", "text": "Chung DC, Gray DM, Singh H, Issaka RB, Raymond VM, Eagle C, et al. A Cell-free DNA Blood-Based Test for Colorectal Cancer Screening. N Engl J Med. 2024;390(11):973-983. PMID 38477985; doi:10.1056/NEJMoa2304714.", "link": "https://doi.org/10.1056/nejmoa2304714", "areas": ["D", "E", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Church2014", "text": "Church TR, Wandell M, Lofton-Day C, Mongin SJ, Burger M, Payne SR, et al. Prospective evaluation of methylated SEPT9 in plasma for detection of asymptomatic colorectal cancer. Gut. 2014;63(2):317-25. PMID 23408352; PMCID PMC3913123; doi:10.1136/gutjnl-2012-304149.", "link": "https://doi.org/10.1136/gutjnl-2012-304149", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Clevers2012", "text": "Clevers H, Nusse R. Wnt/β-catenin signaling and disease. Cell. 2012;149(6):1192-205. PMID 22682243; doi:10.1016/j.cell.2012.05.012.", "link": "https://doi.org/10.1016/j.cell.2012.05.012", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Click2018", "text": "Click B, Pinsky PF, Hickey T, Doroudi M, Schoen RE. Association of Colonoscopy Adenoma Findings With Long-term Colorectal Cancer Incidence. JAMA. 2018;319(19):2021-2031. PMID 29800214; PMCID PMC6583246; doi:10.1001/jama.2018.5809.", "link": "https://doi.org/10.1001/jama.2018.5809", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "COLOR2009", "text": "Colon Cancer Laparoscopic or Open Resection Study Group, Buunen M, Veldkamp R, Hop WC, Kuhry E, Jeekel J, et al. Survival after laparoscopic surgery versus open surgery for colon cancer: long-term outcome of a randomised clinical trial. Lancet Oncol. 2009;10(1):44-52. PMID 19071061; doi:10.1016/s1470-2045(08)70310-3.", "link": "https://doi.org/10.1016/s1470-2045(08)70310-3", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Compton2000", "text": "Compton CC, Fielding LP, Burgart LJ, Conley B, Cooper HS, Hamilton SR, et al. Prognostic factors in colorectal cancer. College of American Pathologists Consensus Statement 1999. Arch Pathol Lab Med. 2000;124(7):979-94. PMID 10888773; doi:10.5858/2000-124-0979-PFICC.", "link": "https://doi.org/10.5858/2000-124-0979-pficc", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Conroy2021", "text": "Conroy T, Bosset JF, Etienne PL, Rio E, François É, Mesgouez-Nebout N, et al. Neoadjuvant chemotherapy with FOLFIRINOX and preoperative chemoradiotherapy for patients with locally advanced rectal cancer (UNICANCER-PRODIGE 23): a multicentre, randomised, open-label, phase 3 trial. Lancet Oncol. 2021;22(5):702-715. PMID 33862000; doi:10.1016/s1470-2045(21)00079-6.", "link": "https://doi.org/10.1016/s1470-2045(21)00079-6", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Corley2014", "text": "Corley DA, Jensen CD, Marks AR, Zhao WK, Lee JK, Doubeni CA, et al. Adenoma detection rate and risk of colorectal cancer and death. N Engl J Med. 2014;370(14):1298-306. PMID 24693890; PMCID PMC4036494; doi:10.1056/NEJMoa1309086.", "link": "https://doi.org/10.1056/nejmoa1309086", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Corley2017", "text": "Corley DA, Jensen CD, Quinn VP, Doubeni CA, Zauber AG, Lee JK, et al. Association Between Time to Colonoscopy After a Positive Fecal Test Result and Risk of Colorectal Cancer and Cancer Stage at Diagnosis. JAMA. 2017;317(16):1631-1641. PMID 28444278; PMCID PMC6343838; doi:10.1001/jama.2017.3634.", "link": "https://doi.org/10.1001/jama.2017.3634", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "COST2004", "text": "Clinical Outcomes of Surgical Therapy Study Group, Nelson H, Sargent DJ, Wieand HS, Fleshman J, Anvari M, et al. A comparison of laparoscopically assisted and open colectomy for colon cancer. N Engl J Med. 2004;350(20):2050-2059. PMID 15141043; doi:10.1056/nejmoa032651.", "link": "https://doi.org/10.1056/nejmoa032651", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Courneya2025", "text": "Courneya KS, Vardy JL, O'Callaghan CJ, Gill S, Friedenreich CM, Wong RKS, et al. Structured Exercise after Adjuvant Chemotherapy for Colon Cancer. N Engl J Med. 2025;393(1):13-25. PMID 40450658; doi:10.1056/NEJMoa2502760.", "link": "https://doi.org/10.1056/nejmoa2502760", "areas": ["G", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Cremolini2015", "text": "Cremolini C, Loupakis F, Antoniotti C, Lupi C, Sensi E, Lonardi S, et al. FOLFOXIRI plus bevacizumab versus FOLFIRI plus bevacizumab as first-line treatment of patients with metastatic colorectal cancer: updated overall survival and molecular subgroup analyses of the open-label, phase 3 TRIBE study. Lancet Oncol. 2015;16(13):1306-15. PMID 26338525; doi:10.1016/S1470-2045(15)00122-9.", "link": "https://doi.org/10.1016/s1470-2045(15)00122-9", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Cremolini2020", "text": "Cremolini C, Antoniotti C, Rossini D, Lonardi S, Loupakis F, Pietrantonio F, et al. Upfront FOLFOXIRI plus bevacizumab and reintroduction after progression versus mFOLFOX6 plus bevacizumab followed by FOLFIRI plus bevacizumab in the treatment of patients with metastatic colorectal cancer (TRIBE2): a multicentre, open-label, phase 3, randomised, controlled trial. Lancet Oncol. 2020;21(4):497-507. PMID 32164906; doi:10.1016/S1470-2045(19)30862-9.", "link": "https://doi.org/10.1016/s1470-2045(19)30862-9", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "CReST2022", "text": "CReST Collaborative Group. Colorectal Endoscopic Stenting Trial (CReST) for obstructing left-sided colorectal cancer: randomized clinical trial. Br J Surg. 2022;109(11):1073-1080. PMID 35986684; doi:10.1093/bjs/znac141.", "link": "https://doi.org/10.1093/bjs/znac141", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Crockett2019", "text": "Crockett SD, Nagtegaal ID. Terminology, Molecular Features, Epidemiology, and Management of Serrated Colorectal Neoplasia. Gastroenterology. 2019;157(4):949-966.e4. PMID 31323292; doi:10.1053/j.gastro.2019.06.041.", "link": "https://doi.org/10.1053/j.gastro.2019.06.041", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Croese2018", "text": "Croese AD, Lonie JM, Trollope AF, Vangaveti VN, Ho YH. A meta-analysis of the prevalence of Low Anterior Resection Syndrome and systematic review of risk factors. Int J Surg. 2018;56:234-241. PMID 29936195; doi:10.1016/j.ijsu.2018.06.031.", "link": "https://doi.org/10.1016/j.ijsu.2018.06.031", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Cunningham2004", "text": "Cunningham D, Humblet Y, Siena S, Khayat D, Bleiberg H, Santoro A, et al. Cetuximab monotherapy and cetuximab plus irinotecan in irinotecan-refractory metastatic colorectal cancer. N Engl J Med. 2004;351(4):337-45. PMID 15269313; doi:10.1056/NEJMoa033025.", "link": "https://doi.org/10.1056/nejmoa033025", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Cuzick2015", "text": "Cuzick J, Thorat MA, Bosetti C, Brown PH, Burn J, Cook NR, et al. Estimates of benefits and harms of prophylactic use of aspirin in the general population. Ann Oncol. 2015;26(1):47-57. PMID 25096604; PMCID PMC4269341; doi:10.1093/annonc/mdu225.", "link": "https://doi.org/10.1093/annonc/mdu225", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Dasari2023", "text": "Dasari A, Lonardi S, Garcia-Carbonero R, Elez E, Yoshino T, Sobrero A, et al. Fruquintinib versus placebo in patients with refractory metastatic colorectal cancer (FRESCO-2): an international, multicentre, randomised, double-blind, phase 3 study. Lancet. 2023;402(10395):41-53. PMID 37331369; doi:10.1016/S0140-6736(23)00772-9.", "link": "https://doi.org/10.1016/s0140-6736(23)00772-9", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Day2011", "text": "Day LW, Kwon A, Inadomi JM, Walter LC, Somsouk M. Adverse events in older patients undergoing colonoscopy: a systematic review and meta-analysis. Gastrointest Endosc. 2011;74(4):885-96. PMID 21951478; PMCID PMC3371336; doi:10.1016/j.gie.2011.06.023.", "link": "https://doi.org/10.1016/j.gie.2011.06.023", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Dejea2018", "text": "Dejea CM, Fathi P, Craig JM, Boleij A, Taddese R, Geis AL, et al. Patients with familial adenomatous polyposis harbor colonic biofilms containing tumorigenic bacteria. Science. 2018;359(6375):592-597. PMID 29420293; PMCID PMC5881113; doi:10.1126/science.aah3648.", "link": "https://doi.org/10.1126/science.aah3648", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Dekker2019", "text": "Dekker E, Tanis PJ, Vleugels JLA, Kasi PM, Wallace MB. Colorectal cancer. Lancet. 2019;394(10207):1467-1480. PMID 31631858; doi:10.1016/S0140-6736(19)32319-0.", "link": "https://doi.org/10.1016/s0140-6736(19)32319-0", "areas": ["A", "B", "C", "D", "F", "G"], "unverified": false, "validated": "PubMed"}, {"key": "deKlerk2019", "text": "de Klerk CM, Wieten E, Lansdorp-Vogelaar I, Bossuyt PM, Spaander MC, Dekker E. Performance of two faecal immunochemical tests for the detection of advanced neoplasia at different positivity thresholds: a cross-sectional study of the Dutch national colorectal cancer screening programme. Lancet Gastroenterol Hepatol. 2019;4(2):111-118. PMID 30497962; doi:10.1016/S2468-1253(18)30319-4.", "link": "https://doi.org/10.1016/s2468-1253(18)30319-4", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Demb2024", "text": "Demb J, Kolb JM, Dounel J, Fritz CDL, Advani SM, Cao Y, et al. Red Flag Signs and Symptoms for Patients With Early-Onset Colorectal Cancer: A Systematic Review and Meta-Analysis. JAMA Netw Open. 2024;7(5):e2413157. PMID 38787555; PMCID PMC11127127; doi:10.1001/jamanetworkopen.2024.13157.", "link": "https://doi.org/10.1001/jamanetworkopen.2024.13157", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "denDulk2007", "text": "den Dulk M, Smit M, Peeters KC, Kranenbarg EM, Rutten HJ, Wiggers T, et al. A multivariate analysis of limiting factors for stoma reversal in patients with rectal cancer entered into the total mesorectal excision (TME) trial: a retrospective study. Lancet Oncol. 2007;8(4):297-303. PMID 17395102; doi:10.1016/S1470-2045(07)70047-5.", "link": "https://doi.org/10.1016/s1470-2045(07)70047-5", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "deWith2023", "text": "de With M, Sadlon A, Cecchin E, Haufroid V, Thomas F, Joerger M, et al. Implementation of dihydropyrimidine dehydrogenase deficiency testing in Europe. ESMO Open. 2023;8(2):101197. PMID 36989883; PMCID PMC10163157; doi:10.1016/j.esmoop.2023.101197.", "link": "https://doi.org/10.1016/j.esmoop.2023.101197", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Diaz2022", "text": "Diaz LA Jr, Shiu KK, Kim TW, Jensen BV, Jensen LH, Punt C, et al. Pembrolizumab versus chemotherapy for microsatellite instability-high or mismatch repair-deficient metastatic colorectal cancer (KEYNOTE-177): final analysis of a randomised, open-label, phase 3 study. Lancet Oncol. 2022;23(5):659-670. PMID 35427471; PMCID PMC9533375; doi:10.1016/S1470-2045(22)00197-8.", "link": "https://doi.org/10.1016/s1470-2045(22)00197-8", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "DiazGay2025", "text": "Díaz-Gay M, Dos Santos W, Moody S, Kazachkova M, Abbasi A, Steele CD, et al. Geographic and age variations in mutational processes in colorectal cancer. Nature. 2025;643(8070):230-240. PMID 40267983; PMCID PMC12221974; doi:10.1038/s41586-025-09025-8.", "link": "https://doi.org/10.1038/s41586-025-09025-8", "areas": ["C", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Dienstmann2017", "text": "Dienstmann R, Vermeulen L, Guinney J, Kopetz S, Tejpar S, Tabernero J. Consensus molecular subtypes and the evolution of precision medicine in colorectal cancer. Nat Rev Cancer. 2017;17(2):79-92. PMID 28050011; doi:10.1038/nrc.2016.126.", "link": "https://doi.org/10.1038/nrc.2016.126", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Dijkstra2023", "text": "Dijkstra EA, Nilsson PJ, Nilsson PJ, Hospers GAP, Bahadoer RR, Meershoek-Klein Kranenbarg E, et al. Locoregional Failure During and After Short-course Radiotherapy Followed by Chemotherapy and Surgery Compared With Long-course Chemoradiotherapy and Surgery: A 5-Year Follow-up of the RAPIDO Trial. Ann Surg. 2023;278(4):e766-e772. PMID 36661037; PMCID PMC10481913; doi:10.1097/sla.0000000000005799.", "link": "https://doi.org/10.1097/sla.0000000000005799", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Doebele2020", "text": "Doebele RC, Drilon A, Paz-Ares L, Siena S, Shaw AT, Farago AF, et al. Entrectinib in patients with advanced or metastatic NTRK fusion-positive solid tumours: integrated analysis of three phase 1-2 trials. Lancet Oncol. 2020;21(2):271-282. PMID 31838007; PMCID PMC7461630; doi:10.1016/S1470-2045(19)30691-6.", "link": "https://doi.org/10.1016/s1470-2045(19)30691-6", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "DominguezValentin2020", "text": "Dominguez-Valentin M, Sampson JR, Seppälä TT, Ten Broeke SW, Plazzer JP, Nakken S, et al. Cancer risks by gene, age, and gender in 6350 carriers of pathogenic mismatch repair variants: findings from the Prospective Lynch Syndrome Database. Genet Med. 2020;22(1):15-25. PMID 31337882; PMCID PMC7371626; doi:10.1038/s41436-019-0596-9.", "link": "https://doi.org/10.1038/s41436-019-0596-9", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "DominguezValentin2021", "text": "Dominguez-Valentin M, Crosbie EJ, Engel C, Aretz S, Macrae F, Winship I, et al. Risk-reducing hysterectomy and bilateral salpingo-oophorectomy in female heterozygotes of pathogenic mismatch repair variants: a Prospective Lynch Syndrome Database report. Genet Med. 2021;23(4):705-712. PMID 33257847; PMCID PMC8026395; doi:10.1038/s41436-020-01029-1.", "link": "https://doi.org/10.1038/s41436-020-01029-1", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Doubeni2024", "text": "Doubeni CA, Corley DA, Jensen CD, Levin TR, Ghai NR, Cannavale K, et al. Fecal Immunochemical Test Screening and Risk of Colorectal Cancer Death. JAMA Netw Open. 2024;7(7):e2423671. PMID 39028667; PMCID PMC11259903; doi:10.1001/jamanetworkopen.2024.23671.", "link": "https://doi.org/10.1001/jamanetworkopen.2024.23671", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Douglas2005", "text": "Douglas JA, Gruber SB, Meister KA, Bonner J, Watson P, Krush AJ, et al. History and molecular genetics of Lynch syndrome in family G: a century later. JAMA. 2005;294(17):2195-202. PMID 16264161; doi:10.1001/jama.294.17.2195.", "link": "https://doi.org/10.1001/jama.294.17.2195", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Douillard2013", "text": "Douillard JY, Oliner KS, Siena S, Tabernero J, Burkes R, Barugel M, et al. Panitumumab-FOLFOX4 treatment and RAS mutations in colorectal cancer. N Engl J Med. 2013;369(11):1023-34. PMID 24024839; doi:10.1056/NEJMoa1305275.", "link": "https://doi.org/10.1056/nejmoa1305275", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Drilon2018", "text": "Drilon A, Laetsch TW, Kummar S, DuBois SG, Lassen UN, Demetri GD, et al. Efficacy of Larotrectinib in TRK Fusion-Positive Cancers in Adults and Children. N Engl J Med. 2018;378(8):731-739. PMID 29466156; PMCID PMC5857389; doi:10.1056/NEJMoa1714448.", "link": "https://doi.org/10.1056/nejmoa1714448", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "DSouza2021CD", "text": "D'Souza N, Monahan K, Benton SC, Wilde L, Abulafi M. Finding the needle in the haystack: the diagnostic accuracy of the faecal immunochemical test for colorectal cancer in younger symptomatic patients. Colorectal Dis. 2021;23(10):2539-2549. PMID 34240526; doi:10.1111/codi.15786.", "link": "https://doi.org/10.1111/codi.15786", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "DSouza2021Gut", "text": "D'Souza N, Georgiou Delisle T, Chen M, Benton S, Abulafi M. Faecal immunochemical test is superior to symptoms in predicting pathology in patients with suspected colorectal cancer symptoms referred on a 2WW pathway: a diagnostic accuracy study. Gut. 2021;70(6):1130-1138. PMID 33087488; PMCID PMC8108285; doi:10.1136/gutjnl-2020-321956.", "link": "https://doi.org/10.1136/gutjnl-2020-321956", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Duffy2001", "text": "Duffy MJ. Carcinoembryonic antigen as a marker for colorectal cancer: is it clinically useful? Clin Chem. 2001;47(4):624-30. PMID 11274010.", "link": "https://pubmed.ncbi.nlm.nih.gov/11274010/", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Dukes1932", "text": "Dukes CE. The classification of cancer of the rectum. J Pathol Bacteriol. 1932;35(3):323-332. doi:10.1002/path.1700350303.", "link": "https://doi.org/10.1002/path.1700350303", "areas": ["A", "E"], "unverified": false, "validated": "Crossref"}, {"key": "DziubanskaKusibab2020", "text": "Dziubańska-Kusibab PJ, Berger H, Battistini F, Bouwman BAM, Iftekhar A, Katainen R, et al. Colibactin DNA-damage signature indicates mutational impact in colorectal cancer. Nat Med. 2020;26(7):1063-1069. PMID 32483361; doi:10.1038/s41591-020-0908-2.", "link": "https://doi.org/10.1038/s41591-020-0908-2", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Eaden2001", "text": "Eaden JA, Abrams KR, Mayberry JF. The risk of colorectal cancer in ulcerative colitis: a meta-analysis. Gut. 2001;48(4):526-35. PMID 11247898; PMCID PMC1728259; doi:10.1136/gut.48.4.526.", "link": "https://doi.org/10.1136/gut.48.4.526", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "EGAPP2009", "text": "Evaluation of Genomic Applications in Practice and Prevention (EGAPP) Working Group. Recommendations from the EGAPP Working Group: genetic testing strategies in newly diagnosed individuals with colorectal cancer aimed at reducing morbidity and mortality from Lynch syndrome in relatives. Genet Med. 2009;11(1):35-41. PMID 19125126; PMCID PMC2743612; doi:10.1097/GIM.0b013e31818fa2ff.", "link": "https://doi.org/10.1097/gim.0b013e31818fa2ff", "areas": ["B", "E"], "unverified": false, "validated": "PubMed"}, {"key": "Elez2025", "text": "Elez E, Yoshino T, Shen L, Lonardi S, Van Cutsem E, Eng C, et al. Encorafenib, Cetuximab, and mFOLFOX6 in BRAF-Mutated Colorectal Cancer. N Engl J Med. 2025;392(24):2425-2437. PMID 40444708; PMCID PMC12197837; doi:10.1056/NEJMoa2501912.", "link": "https://doi.org/10.1056/nejmoa2501912", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "ElJawahri2017", "text": "El-Jawahri A, Greer JA, Pirl WF, Park ER, Jackson VA, Back AL, et al. Effects of Early Integrated Palliative Care on Caregivers of Patients with Lung and Gastrointestinal Cancer: A Randomized Clinical Trial. Oncologist. 2017;22(12):1528-1534. PMID 28894017; PMCID PMC5728034; doi:10.1634/theoncologist.2017-0227.", "link": "https://doi.org/10.1634/theoncologist.2017-0227", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "EllissBrookes2012", "text": "Elliss-Brookes L, McPhail S, Ives A, Greenslade M, Shelton J, Hiom S, et al. Routes to diagnosis for cancer - determining the patient journey using multiple routine data sets. Br J Cancer. 2012;107(8):1220-6. PMID 22996611; PMCID PMC3494426; doi:10.1038/bjc.2012.408.", "link": "https://doi.org/10.1038/bjc.2012.408", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Emmertsen2012", "text": "Emmertsen KJ, Laurberg S. Low anterior resection syndrome score: development and validation of a symptom-based scoring system for bowel dysfunction after low anterior resection for rectal cancer. Ann Surg. 2012;255(5):922-928. PMID 22504191; doi:10.1097/sla.0b013e31824f1c21.", "link": "https://doi.org/10.1097/sla.0b013e31824f1c21", "areas": ["F", "H"], "unverified": false, "validated": "Europe PMC"}, {"key": "Engstrand2018", "text": "Engstrand J, Nilsson H, Strömberg C, Jonas E, Freedman J. Colorectal cancer liver metastases - a population-based study on incidence, management and survival. BMC Cancer. 2018;18(1):78. PMID 29334918; PMCID PMC5769309; doi:10.1186/s12885-017-3925-x.", "link": "https://doi.org/10.1186/s12885-017-3925-x", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Erlandsson2017", "text": "Erlandsson J, Holm T, Pettersson D, Berglund Å, Cedermark B, Radu C, et al. Optimal fractionation of preoperative radiotherapy and timing to surgery for rectal cancer (Stockholm III): a multicentre, randomised, non-blinded, phase 3, non-inferiority trial. Lancet Oncol. 2017;18(3):336-346. PMID 28190762; doi:10.1016/s1470-2045(17)30086-4.", "link": "https://doi.org/10.1016/s1470-2045(17)30086-4", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Fakih2023", "text": "Fakih MG, Salvatore L, Esaki T, Modest DP, Lopez-Bravo DP, Taieb J, et al. Sotorasib plus Panitumumab in Refractory Colorectal Cancer with Mutated KRAS G12C. N Engl J Med. 2023;389(23):2125-2139. PMID 37870968; doi:10.1056/NEJMoa2308795.", "link": "https://doi.org/10.1056/nejmoa2308795", "areas": ["E", "G"], "unverified": false, "validated": "PubMed"}, {"key": "FDA-Avastin", "text": "Genentech. AVASTIN (bevacizumab) prescribing information, BLA125085, effective 2025-01-06, set id 939b5d1f-9fb2-4499-80ef-0607aa6b114e.", "link": "", "areas": ["G"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Braftovi", "text": "Array BioPharma. BRAFTOVI (encorafenib) prescribing information, NDA210496, effective 2026-02-26, set id 235dfc38-0f0b-4037-b501-7a9f4294740c.", "link": "", "areas": ["G"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Cologuard", "text": "Exact Sciences Corporation. COLOGUARD, PMA P130017, original approval 2014-08-11 (indication: adults 50 years or older at typical average risk); supplement S029 approved 2019-09-20 expanding the indicated age to 45 years or older. openFDA device PMA records.", "link": "", "areas": ["D"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-CologuardPlus", "text": "Exact Sciences Corporation. Multi-Target Stool DNA (mtsDNA) Test, Cologuard Plus, PMA P230043, original approval 2024-10-03 (indication: adults 45 years or older at average risk). openFDA device PMA record.", "link": "", "areas": ["D"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-ColoSense", "text": "Geneoscopy, Inc. ColoSense (multitarget stool RNA), PMA P230001, original approval 2024-05-03 (indication: adults 45 years or older at average risk). openFDA device PMA record.", "link": "", "areas": ["D"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-DrugsAtFDA", "text": "US Food and Drug Administration. Drugs@FDA submission records via openFDA drugsfda endpoint: Braftovi NDA210496 SUPPL-17 efficacy (priority) 2024-12-20; Fruzaqla NDA217564 ORIG 2023-11-08; Krazati NDA216340 SUPPL-5 efficacy 2024-06-21; Tukysa NDA213411 SUPPL-4 efficacy 2023-01-19; Lumakras NDA214665 SUPPL-9 efficacy 2025-01-16; Opdivo BLA125554 SUPPL-132 and Yervoy BLA125377 SUPPL-135 efficacy (priority) 2025-04-08; Keytruda BLA125514 efficacy supplements June 2020 incl. 2020-06-29 (accessed 2026-10-25).", "link": "", "areas": ["G"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Enhertu", "text": "Daiichi Sankyo. ENHERTU (fam-trastuzumab deruxtecan-nxki) prescribing information, BLA761139, effective 2026-05-15, set id 7e67e73e-ddf4-4e4d-8b50-09d7514910b6.", "link": "", "areas": ["G"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Erbitux", "text": "ImClone LLC. ERBITUX (cetuximab) prescribing information, BLA125084, effective 2026-04-16, set id 8bc6397e-4bd8-4d37-a007-a327e4da34d9.", "link": "", "areas": ["E", "G"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Fluorouracil", "text": "Fluorouracil injection, US prescribing information (Eugia US LLC). openFDA drug label, set_id 199ef964-8a9b-403e-a2ae-759280b3d1d1, effective 2026-01-19.", "link": "", "areas": ["F"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-FluorouracilFK", "text": "Fluorouracil injection. US prescribing information (Fresenius Kabi USA, LLC), effective 2026-06-08. openFDA drug label set_id 21af1777-87f7-4e40-9917-f1677e7ff1a5. Boxed warning (complete DPD deficiency; test for DPYD variants), section 5.1.", "link": "", "areas": ["H"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Fruzaqla", "text": "Takeda. FRUZAQLA (fruquintinib) prescribing information, NDA217564, effective 2026-07-31, set id 186d786e-dc8a-45f2-b5e1-01ac0201879f.", "link": "", "areas": ["G"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Jemperli", "text": "JEMPERLI (dostarlimab-gxly) injection, US prescribing information (GlaxoSmithKline LLC). DailyMed SPL set id 095eab9f-545a-4f12-bfb7-19477fb901a5, version 15, effective 2026-10-19 (published 2026-10-23).", "link": "", "areas": ["F"], "unverified": false, "validated": "DailyMed, 2026-10-29; replaces the 2025-09-02 openFDA label"}, {"key": "FDA-Keytruda", "text": "Merck Sharp & Dohme. KEYTRUDA (pembrolizumab) prescribing information, BLA125514, effective 2026-07-10, set id 9333c79b-d487-4538-a9f0-71b91a02b287.", "link": "", "areas": ["G"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Krazati", "text": "Bristol-Myers Squibb (Mirati). KRAZATI (adagrasib) prescribing information, NDA216340, DailyMed SPL set id 0b8bf078-34c2-4f45-9012-38a8ac082b01, version 14, effective 2026-08-31 (published 2026-10-23); colorectal indication removed 08/2026.", "link": "", "areas": ["G"], "unverified": false, "validated": "DailyMed, 2026-10-29; replaces the 2026-03-25 openFDA label"}, {"key": "FDA-Lonsurf", "text": "Taiho Pharmaceutical. LONSURF (trifluridine and tipiracil) prescribing information, NDA207981, effective 2025-11-05, set id f5beed22-d71d-4c0d-8dca-2c7317d65d85.", "link": "", "areas": ["G"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Lumakras", "text": "Amgen. LUMAKRAS (sotorasib) prescribing information, NDA214665, effective 2025-01-22, set id c80a362c-7ac3-4894-a076-0691e68ef8c1.", "link": "", "areas": ["G"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Opdivo", "text": "E.R. Squibb & Sons. OPDIVO (nivolumab) prescribing information, BLA125554, effective 2026-08-12, set id f570b9c4-6846-4de2-abfa-4d0a4ae4e394.", "link": "", "areas": ["G"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Oxaliplatin", "text": "Oxaliplatin injection USP, US prescribing information (Shandong New Time Pharmaceutical Co., Ltd.). openFDA drug label, set_id 1ac38523-480b-4c0f-97a1-7dfa1432923c, effective 2026-04-14.", "link": "", "areas": ["F"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-OxaliplatinGland", "text": "Oxaliplatin injection. US prescribing information (Gland Pharma Limited), effective 2026-08-24. openFDA drug label set_id a6f89dc3-a594-4b5b-8728-272e20c1ecb5. Section 5.2 (acute and delayed neuropathy; adjuvant trial neuropathy over time) and patient counselling on cold avoidance.", "link": "", "areas": ["H"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Shield", "text": "Guardant Health, Inc. Shield (cell-free DNA blood test), PMA P230009, original approval 2024-07-26 (indication: average-risk individuals aged 45 years or older; positive results to be followed by colonoscopy). openFDA device PMA record.", "link": "", "areas": ["D"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-SimpleScreen", "text": "Freenome, LLC. SimpleScreen CRC (cell-free DNA blood test), PMA P250029, original approval 2026-07-24 (indication: colorectal cancer screening in adults aged 45 years and older at average risk; positive results to be followed by colonoscopy; not a replacement for diagnostic or surveillance colonoscopy in high-risk individuals). openFDA device PMA record.", "link": "", "areas": ["D"], "unverified": false, "validated": "openFDA, 2026-10-30"}, {"key": "FDA-Stivarga", "text": "Bayer HealthCare. STIVARGA (regorafenib) prescribing information, NDA203085, effective 2026-02-09, set id 824f19c9-0546-4a8a-8d8f-c4055c04f7c7.", "link": "", "areas": ["G"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Tecentriq", "text": "TECENTRIQ (atezolizumab) injection, US prescribing information (Genentech, Inc.). DailyMed SPL set id 6fa682c9-a312-4932-9831-f286908660ee, version 46, effective 2026-10-13 (published 2026-10-16); indication 1.7, stage III dMMR colon cancer. Validated: DailyMed, 2026-10-31.", "link": "", "areas": ["F"], "unverified": true}, {"key": "FDA-Tukysa", "text": "Seagen. TUKYSA (tucatinib) prescribing information, NDA213411, effective 2024-11-04, set id f27eb1b9-b7fc-424e-988f-84dd7bb195a3 (label record lacks openfda metadata; sponsor from Drugs@FDA).", "link": "", "areas": ["G"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Vectibix", "text": "Amgen. VECTIBIX (panitumumab) prescribing information, BLA125147, effective 2026-06-23, set id e0fa4bca-f245-4d92-ae29-b0c630a315c2.", "link": "", "areas": ["E", "G"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Vitrakvi", "text": "Bayer HealthCare. VITRAKVI (larotrectinib) prescribing information, NDA210861/NDA211710, effective 2026-05-22, set id 0c8ca614-58b2-4aa4-83d3-0387a8f782fd.", "link": "", "areas": ["G"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Xeloda", "text": "XELODA (capecitabine) tablets, US prescribing information (H2-Pharma, LLC). openFDA drug label, set_id e702d84d-7162-4751-bf37-d724cc7e45a5, effective 2026-02-05.", "link": "", "areas": ["F", "H"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Yervoy", "text": "E.R. Squibb & Sons. YERVOY (ipilimumab) prescribing information, BLA125377, effective 2026-08-20, set id 2265ef30-253e-11df-8a39-0800200c9a66.", "link": "", "areas": ["G"], "unverified": false, "validated": "openFDA"}, {"key": "Fearon1990", "text": "Fearon ER, Vogelstein B. A genetic model for colorectal tumorigenesis. Cell. 1990;61(5):759-67. PMID 2188735; doi:10.1016/0092-8674(90)90186-i.", "link": "https://doi.org/10.1016/0092-8674(90)90186-i", "areas": ["A", "C"], "unverified": false, "validated": "PubMed"}, {"key": "Fedirko2011", "text": "Fedirko V, Tramacere I, Bagnardi V, Rota M, Scotti L, Islami F, et al. Alcohol drinking and colorectal cancer risk: an overall and dose-response meta-analysis of published studies. Ann Oncol. 2011;22(9):1958-1972. PMID 21307158; doi:10.1093/annonc/mdq653.", "link": "https://doi.org/10.1093/annonc/mdq653", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Feng2022", "text": "Feng Q, Yuan W, Li T, Tang B, Jia B, Zhou Y, et al. Robotic versus laparoscopic surgery for middle and low rectal cancer (REAL): short-term outcomes of a multicentre randomised controlled trial. Lancet Gastroenterol Hepatol. 2022;7(11):991-1004. PMID 36087608; doi:10.1016/s2468-1253(22)00248-5.", "link": "https://doi.org/10.1016/s2468-1253(22)00248-5", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Feng2025", "text": "Feng Q, Yuan W, Li T, Tang B, Jia B, Zhou Y, et al. Robotic vs Laparoscopic Surgery for Middle and Low Rectal Cancer: The REAL Randomized Clinical Trial. JAMA. 2025;334(2):136-148. PMID 40455621; PMCID PMC12131176; doi:10.1001/jama.2025.8123.", "link": "https://doi.org/10.1001/jama.2025.8123", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Fishel1993", "text": "Fishel R, Lescoe MK, Rao MR, Copeland NG, Jenkins NA, Garber J, et al. The human mutator gene homolog MSH2 and its association with hereditary nonpolyposis colon cancer. Cell. 1993;75(5):1027-38. PMID 8252616; doi:10.1016/0092-8674(93)90546-3.", "link": "https://doi.org/10.1016/0092-8674(93)90546-3", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Fleshman2015", "text": "Fleshman J, Branda M, Sargent DJ, Boller AM, George V, Abbas M, et al. Effect of Laparoscopic-Assisted Resection vs Open Resection of Stage II or III Rectal Cancer on Pathologic Outcomes: The ACOSOG Z6051 Randomized Clinical Trial. JAMA. 2015;314(13):1346-1355. PMID 26441179; PMCID PMC5140087; doi:10.1001/jama.2015.10529.", "link": "https://doi.org/10.1001/jama.2015.10529", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Fleshman2019", "text": "Fleshman J, Branda ME, Sargent DJ, Boller AM, George VV, Abbas MA, et al. Disease-free Survival and Local Recurrence for Laparoscopic Resection Compared With Open Resection of Stage II to III Rectal Cancer: Follow-up Results of the ACOSOG Z6051 Randomized Controlled Trial. Ann Surg. 2019;269(4):589-595. PMID 30080730; PMCID PMC6360134; doi:10.1097/sla.0000000000003002.", "link": "https://doi.org/10.1097/sla.0000000000003002", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Forsberg2022", "text": "Forsberg A, Westerberg M, Metcalfe C, Steele R, Blom J, Engstrand L, et al. Once-only colonoscopy or two rounds of faecal immunochemical testing 2 years apart for colorectal cancer screening (SCREESCO): preliminary report of a randomised controlled trial. Lancet Gastroenterol Hepatol. 2022;7(6):513-521. PMID 35298893; doi:10.1016/S2468-1253(21)00473-8.", "link": "https://doi.org/10.1016/s2468-1253(21)00473-8", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Forsmo2016", "text": "Forsmo HM, Pfeffer F, Rasdal A, Sintonen H, Körner H, Erichsen C. Pre- and postoperative stoma education and guidance within an enhanced recovery after surgery (ERAS) programme reduces length of hospital stay in colorectal surgery. Int J Surg. 2016;36(Pt A):121-126. PMID 27780772; doi:10.1016/j.ijsu.2016.10.031.", "link": "https://doi.org/10.1016/j.ijsu.2016.10.031", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Fritz2023", "text": "Fritz CDL, Otegbeye EE, Zong X, Demb J, Nickel KB, Olsen MA, et al. Red-flag signs and symptoms for earlier diagnosis of early-onset colorectal cancer. J Natl Cancer Inst. 2023;115(8):909-916. PMID 37138415; PMCID PMC10407716; doi:10.1093/jnci/djad068.", "link": "https://doi.org/10.1093/jnci/djad068", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Galiatsatos2006", "text": "Galiatsatos P, Foulkes WD. Familial adenomatous polyposis. Am J Gastroenterol. 2006;101(2):385-98. PMID 16454848; doi:10.1111/j.1572-0241.2006.00375.x.", "link": "https://doi.org/10.1111/j.1572-0241.2006.00375.x", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Gandhi2018", "text": "Gandhi K, Tofani C, Sokach C, Patel D, Kastenberg D, Daskalakis C. Patient Characteristics Associated With Quality of Colonoscopy Preparation: A Systematic Review and Meta-analysis. Clin Gastroenterol Hepatol. 2018;16(3):357-369.e10. PMID 28826680; doi:10.1016/j.cgh.2017.08.016.", "link": "https://doi.org/10.1016/j.cgh.2017.08.016", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "GarciaAguilar2022", "text": "Garcia-Aguilar J, Patil S, Gollub MJ, Kim JK, Yuval JB, Thompson HM, et al. Organ Preservation in Patients With Rectal Adenocarcinoma Treated With Total Neoadjuvant Therapy. J Clin Oncol. 2022;40(23):2546-2556. PMID 35483010; PMCID PMC9362876; doi:10.1200/jco.22.00032.", "link": "https://doi.org/10.1200/jco.22.00032", "areas": ["F", "G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Gardner1951", "text": "Gardner EJ. A genetic and clinical study of intestinal polyposis, a predisposing factor for carcinoma of the colon and rectum. Am J Hum Genet. 1951;3(2):167-76. PMID 14902760; PMCID PMC1716321.", "link": "https://pubmed.ncbi.nlm.nih.gov/14902760/", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Gardner1953", "text": "Gardner EJ, Richards RC. Multiple cutaneous and subcutaneous lesions occurring simultaneously with hereditary polyposis and osteomatosis. Am J Hum Genet. 1953;5(2):139-47. PMID 13065261; PMCID PMC1716470.", "link": "https://pubmed.ncbi.nlm.nih.gov/13065261/", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Greco2014", "text": "Greco M, Capretti G, Beretta L, Gemma M, Pecorelli N, Braga M. Enhanced recovery program in colorectal surgery: a meta-analysis of randomized controlled trials. World J Surg. 2014;38(6):1531-1541. PMID 24368573; doi:10.1007/s00268-013-2416-8.", "link": "https://doi.org/10.1007/s00268-013-2416-8", "areas": ["F", "H"], "unverified": false, "validated": "Europe PMC"}, {"key": "Greegor1967", "text": "Greegor DH. Diagnosis of large-bowel cancer in the asymptomatic patient. JAMA. 1967;201(12):943-5. PMID 6072632.", "link": "https://pubmed.ncbi.nlm.nih.gov/6072632/", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Grobbee2017", "text": "Grobbee EJ, Schreuders EH, Hansen BE, Bruno MJ, Lansdorp-Vogelaar I, Spaander MCW, et al. Association Between Concentrations of Hemoglobin Determined by Fecal Immunochemical Tests and Long-term Development of Advanced Colorectal Neoplasia. Gastroenterology. 2017;153(5):1251-1259.e2. PMID 28760383; doi:10.1053/j.gastro.2017.07.034.", "link": "https://doi.org/10.1053/j.gastro.2017.07.034", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Groden1991", "text": "Groden J, Thliveris A, Samowitz W, Carlson M, Gelbert L, Albertsen H, et al. Identification and characterization of the familial adenomatous polyposis coli gene. Cell. 1991;66(3):589-600. PMID 1651174; doi:10.1016/0092-8674(81)90021-0.", "link": "https://doi.org/10.1016/0092-8674(81)90021-0", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Grothey2013", "text": "Grothey A, Van Cutsem E, Sobrero A, Siena S, Falcone A, Ychou M, et al. Regorafenib monotherapy for previously treated metastatic colorectal cancer (CORRECT): an international, multicentre, randomised, placebo-controlled, phase 3 trial. Lancet. 2013;381(9863):303-12. PMID 23177514; doi:10.1016/S0140-6736(12)61900-X.", "link": "https://doi.org/10.1016/s0140-6736(12)61900-x", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Grothey2018", "text": "Grothey A, Sobrero AF, Shields AF, Yoshino T, Paul J, Taieb J, et al. Duration of Adjuvant Chemotherapy for Stage III Colon Cancer. N Engl J Med. 2018;378(13):1177-1188. PMID 29590544; PMCID PMC6426127; doi:10.1056/nejmoa1713709.", "link": "https://doi.org/10.1056/nejmoa1713709", "areas": ["F", "H"], "unverified": false, "validated": "Europe PMC"}, {"key": "Gryfe2000", "text": "Gryfe R, Kim H, Hsieh ET, Aronson MD, Holowaty EJ, Bull SB, et al. Tumor microsatellite instability and clinical outcome in young patients with colorectal cancer. N Engl J Med. 2000;342(2):69-77. PMID 10631274; doi:10.1056/NEJM200001133420201.", "link": "https://doi.org/10.1056/nejm200001133420201", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Guastadisegni2010", "text": "Guastadisegni C, Colafranceschi M, Ottini L, Dogliotti E. Microsatellite instability as a marker of prognosis and response to therapy: a meta-analysis of colorectal cancer survival data. Eur J Cancer. 2010;46(15):2788-98. PMID 20627535; doi:10.1016/j.ejca.2010.05.009.", "link": "https://doi.org/10.1016/j.ejca.2010.05.009", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Guillou2005", "text": "Guillou PJ, Quirke P, Thorpe H, Walker J, Jayne DG, Smith AM, et al. Short-term endpoints of conventional versus laparoscopic-assisted surgery in patients with colorectal cancer (MRC CLASICC trial): multicentre, randomised controlled trial. Lancet. 2005;365(9472):1718-1726. PMID 15894098; doi:10.1016/s0140-6736(05)66545-2.", "link": "https://doi.org/10.1016/s0140-6736(05)66545-2", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Guinney2015", "text": "Guinney J, Dienstmann R, Wang X, de Reyniès A, Schlicker A, Soneson C, et al. The consensus molecular subtypes of colorectal cancer. Nat Med. 2015;21(11):1350-6. PMID 26457759; PMCID PMC4636487; doi:10.1038/nm.3967.", "link": "https://doi.org/10.1038/nm.3967", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Gunderson2010", "text": "Gunderson LL, Jessup JM, Sargent DJ, Greene FL, Stewart AK. Revised TN categorization for colon cancer based on national survival outcomes data. J Clin Oncol. 2010;28(2):264-71. PMID 19949014; PMCID PMC2815715; doi:10.1200/JCO.2009.24.0952.", "link": "https://doi.org/10.1200/jco.2009.24.0952", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Guo2017", "text": "Guo X, Yang Z, Zhao L, Leung F, Luo H, Kang X, et al. Enhanced instructions improve the quality of bowel preparation for colonoscopy: a meta-analysis of randomized controlled trials. Gastrointest Endosc. 2017;85(1):90-97.e6. PMID 27189659; doi:10.1016/j.gie.2016.05.012.", "link": "https://doi.org/10.1016/j.gie.2016.05.012", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Gupta2013", "text": "Gupta S, Halm EA, Rockey DC, Hammons M, Koch M, Carter E, et al. Comparative effectiveness of fecal immunochemical test outreach, colonoscopy outreach, and usual care for boosting colorectal cancer screening among the underserved: a randomized clinical trial. JAMA Intern Med. 2013;173(18):1725-32. PMID 23921906; PMCID PMC5228201; doi:10.1001/jamainternmed.2013.9294.", "link": "https://doi.org/10.1001/jamainternmed.2013.9294", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Gupta2020", "text": "Gupta S, Lieberman D, Anderson JC, Burke CA, Dominitz JA, Kaltenbach T, et al. Recommendations for Follow-Up After Colonoscopy and Polypectomy: A Consensus Update by the US Multi-Society Task Force on Colorectal Cancer. Gastroenterology. 2020;158(4):1131-1153.e5. PMID 32044092; PMCID PMC7672705; doi:10.1053/j.gastro.2019.10.026. Tables read from PMC full text.", "link": "https://doi.org/10.1053/j.gastro.2019.10.026", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Gustafsson2019", "text": "Gustafsson UO, Scott MJ, Hubner M, Nygren J, Demartines N, Francis N, et al. Guidelines for Perioperative Care in Elective Colorectal Surgery: Enhanced Recovery After Surgery (ERAS®) Society Recommendations: 2018. World J Surg. 2019;43(3):659-695. PMID 30426190; doi:10.1007/s00268-018-4844-y.", "link": "https://doi.org/10.1007/s00268-018-4844-y", "areas": ["F", "H"], "unverified": false, "validated": "Europe PMC"}, {"key": "HabrGama2004", "text": "Habr-Gama A, Perez RO, Nadalin W, Sabbaga J, Ribeiro U Jr, Silva e Sousa AH Jr, et al. Operative versus nonoperative treatment for stage 0 distal rectal cancer following chemoradiation therapy: long-term results. Ann Surg. 2004;240(4):711-7; discussion 717-8. PMID 15383798; doi:10.1097/01.sla.0000141194.27992.32.", "link": "https://doi.org/10.1097/01.sla.0000141194.27992.32", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Hackl2014", "text": "Hackl C, Neumann P, Gerken M, Loss M, Klinkhammer-Schalke M, Schlitt HJ. Treatment of colorectal liver metastases in Germany: a ten-year population-based analysis of 5772 cases of primary colorectal adenocarcinoma. BMC Cancer. 2014;14:810. PMID 25369977; PMCID PMC4230526; doi:10.1186/1471-2407-14-810.", "link": "https://doi.org/10.1186/1471-2407-14-810", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Haggitt1985", "text": "Haggitt RC, Glotzbach RE, Soffer EE, Wruble LD. Prognostic factors in colorectal carcinomas arising in adenomas: implications for lesions removed by endoscopic polypectomy. Gastroenterology. 1985;89(2):328-336. PMID 4007423; doi:10.1016/0016-5085(85)90333-6.", "link": "https://doi.org/10.1016/0016-5085(85)90333-6", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Half2009", "text": "Half E, Bercovich D, Rozen P. Familial adenomatous polyposis. Orphanet J Rare Dis. 2009;4:22. PMID 19822006; PMCID PMC2772987; doi:10.1186/1750-1172-4-22.", "link": "https://doi.org/10.1186/1750-1172-4-22", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Haller2011", "text": "Haller DG, Tabernero J, Maroun J, de Braud F, Price T, Van Cutsem E, et al. Capecitabine plus oxaliplatin compared with fluorouracil and folinic acid as adjuvant therapy for stage III colon cancer. J Clin Oncol. 2011;29(11):1465-1471. PMID 21383294; doi:10.1200/jco.2010.33.6297.", "link": "https://doi.org/10.1200/jco.2010.33.6297", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Hallin2022", "text": "Hallin J, Bowcut V, Calinisan A, Briere DM, Hargis L, Engstrom LD, et al. Anti-tumor efficacy of a potent and selective non-covalent KRASG12D inhibitor. Nat Med. 2022;28(10):2171-2182. PMID 36216931; doi:10.1038/s41591-022-02007-7.", "link": "https://doi.org/10.1038/s41591-022-02007-7", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Hamilton2005", "text": "Hamilton W, Round A, Sharp D, Peters TJ. Clinical features of colorectal cancer before diagnosis: a population-based case-control study. Br J Cancer. 2005;93(4):399-405. PMID 16106247; PMCID PMC2361578; doi:10.1038/sj.bjc.6602714.", "link": "https://doi.org/10.1038/sj.bjc.6602714", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Hamilton2008", "text": "Hamilton W, Lancashire R, Sharp D, Peters TJ, Cheng KK, Marshall T. The importance of anaemia in diagnosing colorectal cancer: a case-control study using electronic primary care records. Br J Cancer. 2008;98(2):323-7. PMID 18219289; PMCID PMC2361444; doi:10.1038/sj.bjc.6604165.", "link": "https://doi.org/10.1038/sj.bjc.6604165", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Hamilton2009", "text": "Hamilton W, Lancashire R, Sharp D, Peters TJ, Cheng K, Marshall T. The risk of colorectal cancer with symptoms at different ages and between the sexes: a case-control study. BMC Med. 2009;7:17. PMID 19374736; PMCID PMC2675533; doi:10.1186/1741-7015-7-17.", "link": "https://doi.org/10.1186/1741-7015-7-17", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Hampel2005", "text": "Hampel H, Frankel WL, Martin E, Arnold M, Khanduja K, Kuebler P, et al. Screening for the Lynch syndrome (hereditary nonpolyposis colorectal cancer). N Engl J Med. 2005;352(18):1851-60. PMID 15872200; doi:10.1056/NEJMoa043146.", "link": "https://doi.org/10.1056/nejmoa043146", "areas": ["B", "C"], "unverified": false, "validated": "PubMed"}, {"key": "Hampel2008", "text": "Hampel H, Frankel WL, Martin E, Arnold M, Khanduja K, Kuebler P, et al. Feasibility of screening for Lynch syndrome among patients with colorectal cancer. J Clin Oncol. 2008;26(35):5783-8. PMID 18809606; PMCID PMC2645108; doi:10.1200/JCO.2008.17.5950.", "link": "https://doi.org/10.1200/jco.2008.17.5950", "areas": ["B", "C"], "unverified": false, "validated": "PubMed"}, {"key": "Hanahan2011", "text": "Hanahan D, Weinberg RA. Hallmarks of cancer: the next generation. Cell. 2011;144(5):646-74. PMID 21376230; doi:10.1016/j.cell.2011.02.013.", "link": "https://doi.org/10.1016/j.cell.2011.02.013", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Hanahan2022", "text": "Hanahan D. Hallmarks of Cancer: New Dimensions. Cancer Discov. 2022;12(1):31-46. PMID 35022204; doi:10.1158/2159-8290.CD-21-1059.", "link": "https://doi.org/10.1158/2159-8290.cd-21-1059", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Hardcastle1996", "text": "Hardcastle JD, Chamberlain JO, Robinson MH, Moss SM, Amar SS, Balfour TW, et al. Randomised controlled trial of faecal-occult-blood screening for colorectal cancer. Lancet. 1996;348(9040):1472-7. PMID 8942775; doi:10.1016/S0140-6736(96)03386-7.", "link": "https://doi.org/10.1016/s0140-6736(96)03386-7", "areas": ["A", "D"], "unverified": false, "validated": "PubMed"}, {"key": "Harkins2023", "text": "Harkins JM, Sajjad H. Anatomy, Abdomen and Pelvis, Sigmoid Colon. In: StatPearls [Internet]. Treasure Island (FL): StatPearls Publishing; 2023 (updated 2023 Jul 24). PMID 31751014.", "link": "https://pubmed.ncbi.nlm.nih.gov/31751014/", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Hassan2019", "text": "Hassan C, East J, Radaelli F, Spada C, Benamouzig R, Bisschops R, et al. Bowel preparation for colonoscopy: European Society of Gastrointestinal Endoscopy (ESGE) Guideline - Update 2019. Endoscopy. 2019;51(8):775-794. PMID 31295746; doi:10.1055/a-0959-0505.", "link": "https://doi.org/10.1055/a-0959-0505", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Hassan2020", "text": "Hassan C, Antonelli G, Dumonceau JM, Regula J, Bretthauer M, Chaussade S, et al. Post-polypectomy colonoscopy surveillance: European Society of Gastrointestinal Endoscopy (ESGE) Guideline - Update 2020. Endoscopy. 2020;52(8):687-700. PMID 32572858; doi:10.1055/a-1185-3109.", "link": "https://doi.org/10.1055/a-1185-3109", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Hassan2021", "text": "Hassan C, Spadaccini M, Iannone A, Maselli R, Jovani M, Chandrasekar VT, et al. Performance of artificial intelligence in colonoscopy for adenoma and polyp detection: a systematic review and meta-analysis. Gastrointest Endosc. 2021;93(1):77-85.e6. PMID 32598963; doi:10.1016/j.gie.2020.06.059.", "link": "https://doi.org/10.1016/j.gie.2020.06.059", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Heald1982", "text": "Heald RJ, Husband EM, Ryall RD. The mesorectum in rectal cancer surgery--the clue to pelvic recurrence? Br J Surg. 1982;69(10):613-6. PMID 6751457; doi:10.1002/bjs.1800691019.", "link": "https://doi.org/10.1002/bjs.1800691019", "areas": ["A", "F"], "unverified": false, "validated": "PubMed"}, {"key": "Heald1986", "text": "Heald RJ, Ryall RD. Recurrence and survival after total mesorectal excision for rectal cancer. Lancet. 1986;1(8496):1479-82. PMID 2425199; doi:10.1016/s0140-6736(86)91510-2.", "link": "https://doi.org/10.1016/s0140-6736(86)91510-2", "areas": ["A", "F"], "unverified": false, "validated": "PubMed"}, {"key": "Heidelberger1957", "text": "Heidelberger C, Chaudhuri NK, Danneberg P, Mooren D, Griesbach L, Duschinsky R, et al. Fluorinated pyrimidines, a new class of tumour-inhibitory compounds. Nature. 1957;179(4561):663-6. PMID 13418758; doi:10.1038/179663a0.", "link": "https://doi.org/10.1038/179663a0", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Heinemann2014", "text": "Heinemann V, von Weikersthal LF, Decker T, Kiani A, Vehling-Kaiser U, Al-Batran SE, et al. FOLFIRI plus cetuximab versus FOLFIRI plus bevacizumab as first-line treatment for patients with metastatic colorectal cancer (FIRE-3): a randomised, open-label, phase 3 trial. Lancet Oncol. 2014;15(10):1065-75. PMID 25088940; doi:10.1016/S1470-2045(14)70330-4.", "link": "https://doi.org/10.1016/s1470-2045(14)70330-4", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Heitman2009", "text": "Heitman SJ, Ronksley PE, Hilsden RJ, Manns BJ, Rostom A, Hemmelgarn BR. Prevalence of adenomas and colorectal cancer in average risk individuals: a systematic review and meta-analysis. Clin Gastroenterol Hepatol. 2009;7(12):1272-8. PMID 19523536; doi:10.1016/j.cgh.2009.05.032.", "link": "https://doi.org/10.1016/j.cgh.2009.05.032", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Henricks2018", "text": "Henricks LM, Lunenburg CATC, de Man FM, Meulendijks D, Frederix GWJ, Kienhuis E, et al. DPYD genotype-guided dose individualisation of fluoropyrimidine therapy in patients with cancer: a prospective safety analysis. Lancet Oncol. 2018;19(11):1459-1467. PMID 30348537; doi:10.1016/S1470-2045(18)30686-7.", "link": "https://doi.org/10.1016/s1470-2045(18)30686-7", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Herman1998", "text": "Herman JG, Umar A, Polyak K, Graff JR, Ahuja N, Issa JP, et al. Incidence and functional consequences of hMLH1 promoter hypermethylation in colorectal carcinoma. Proc Natl Acad Sci U S A. 1998;95(12):6870-5. PMID 9618505; PMCID PMC22665; doi:10.1073/pnas.95.12.6870.", "link": "https://doi.org/10.1073/pnas.95.12.6870", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Hewitson2007", "text": "Hewitson P, Glasziou P, Irwig L, Towler B, Watson E. Screening for colorectal cancer using the faecal occult blood test, Hemoccult. Cochrane Database Syst Rev. 2007;2007(1):CD001216. PMID 17253456; PMCID PMC6769059; doi:10.1002/14651858.CD001216.pub2.", "link": "https://doi.org/10.1002/14651858.cd001216.pub2", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Hohenberger2009", "text": "Hohenberger W, Weber K, Matzel K, Papadopoulos T, Merkel S. Standardized surgery for colonic cancer: complete mesocolic excision and central ligation--technical notes and outcome. Colorectal Dis. 2009;11(4):354-64. PMID 19016817; doi:10.1111/j.1463-1318.2008.01735.x.", "link": "https://doi.org/10.1111/j.1463-1318.2008.01735.x", "areas": ["C", "F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Holderfield2024", "text": "Holderfield M, Lee BJ, Jiang J, Tomlinson A, Seamon KJ, Mira A, et al. Concurrent inhibition of oncogenic and wild-type RAS-GTP for cancer therapy. Nature. 2024;629(8013):919-926. PMID 38589574; PMCID PMC11111408; doi:10.1038/s41586-024-07205-6.", "link": "https://doi.org/10.1038/s41586-024-07205-6", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Holme2014", "text": "Holme Ø, Løberg M, Kalager M, Bretthauer M, Hernán MA, Aas E, et al. Effect of flexible sigmoidoscopy screening on colorectal cancer incidence and mortality: a randomized clinical trial. JAMA. 2014;312(6):606-15. PMID 25117129; PMCID PMC4495882; doi:10.1001/jama.2014.8266.", "link": "https://doi.org/10.1001/jama.2014.8266", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Holme2018", "text": "Holme Ø, Løberg M, Kalager M, Bretthauer M, Hernán MA, Aas E, et al. Long-Term Effectiveness of Sigmoidoscopy Screening on Colorectal Cancer Incidence and Mortality in Women and Men: A Randomized Trial. Ann Intern Med. 2018;168(11):775-782. PMID 29710125; PMCID PMC6853067; doi:10.7326/M17-1441.", "link": "https://doi.org/10.7326/m17-1441", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Holmgren2017", "text": "Holmgren K, Kverneng Hultberg D, Haapamäki MM, Matthiessen P, Rutegård J, Rutegård M. High stoma prevalence and stoma reversal complications following anterior resection for rectal cancer: a population-based multicentre study. Colorectal Dis. 2017;19(12):1067-1075. PMID 28612478; doi:10.1111/codi.13771.", "link": "https://doi.org/10.1111/codi.13771", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Hu2019", "text": "Hu Z, Ding J, Ma Z, Sun R, Seoane JA, Scott Shaffer J, et al. Quantitative evidence for early metastatic seeding in colorectal cancer. Nat Genet. 2019;51(7):1113-1122. PMID 31209394; PMCID PMC6982526; doi:10.1038/s41588-019-0423-x.", "link": "https://doi.org/10.1038/s41588-019-0423-x", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Hugen2014", "text": "Hugen N, van de Velde CJH, de Wilt JHW, Nagtegaal ID. Metastatic pattern in colorectal cancer is strongly influenced by histological subtype. Ann Oncol. 2014;25(3):651-657. PMID 24504447; PMCID PMC4433523; doi:10.1093/annonc/mdt591.", "link": "https://doi.org/10.1093/annonc/mdt591", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Humphries2008", "text": "Humphries A, Wright NA. Colonic crypt organization and tumorigenesis. Nat Rev Cancer. 2008;8(6):415-24. PMID 18480839; doi:10.1038/nrc2392.", "link": "https://doi.org/10.1038/nrc2392", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Hurwitz2004", "text": "Hurwitz H, Fehrenbacher L, Novotny W, Cartwright T, Hainsworth J, Heim W, et al. Bevacizumab plus irinotecan, fluorouracil, and leucovorin for metastatic colorectal cancer. N Engl J Med. 2004;350(23):2335-42. PMID 15175435; doi:10.1056/NEJMoa032691.", "link": "https://doi.org/10.1056/nejmoa032691", "areas": ["A", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Hutchins2011", "text": "Hutchins G, Southward K, Handley K, Magill L, Beaumont C, Stahlschmidt J, et al. Value of mismatch repair, KRAS, and BRAF mutations in predicting recurrence and benefits from chemotherapy in colorectal cancer. J Clin Oncol. 2011;29(10):1261-70. PMID 21383284; doi:10.1200/JCO.2010.30.1366.", "link": "https://doi.org/10.1200/jco.2010.30.1366", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Iacopetta2002", "text": "Iacopetta B. Are there two sides to colorectal cancer? Int J Cancer. 2002;101(5):403-8. PMID 12216066; doi:10.1002/ijc.10635.", "link": "https://doi.org/10.1002/ijc.10635", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "IJspeert2015", "text": "IJspeert JE, Vermeulen L, Meijer GA, Dekker E. Serrated neoplasia-role in colorectal carcinogenesis and clinical implications. Nat Rev Gastroenterol Hepatol. 2015;12(7):401-9. PMID 25963511; doi:10.1038/nrgastro.2015.73.", "link": "https://doi.org/10.1038/nrgastro.2015.73", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Imperiale2000", "text": "Imperiale TF, Wagner DR, Lin CY, Larkin GN, Rogge JD, Ransohoff DF. Risk of advanced proximal neoplasms in asymptomatic adults according to the distal colorectal findings. N Engl J Med. 2000;343(3):169-74. PMID 10900275; doi:10.1056/NEJM200007203430302.", "link": "https://doi.org/10.1056/nejm200007203430302", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Imperiale2014", "text": "Imperiale TF, Ransohoff DF, Itzkowitz SH, Levin TR, Lavin P, Lidgard GP, et al. Multitarget stool DNA testing for colorectal-cancer screening. N Engl J Med. 2014;370(14):1287-97. PMID 24645800; doi:10.1056/NEJMoa1311194.", "link": "https://doi.org/10.1056/nejmoa1311194", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Imperiale2019", "text": "Imperiale TF, Gruber RN, Stump TE, Emmett TW, Monahan PO. Performance Characteristics of Fecal Immunochemical Tests for Colorectal Cancer and Advanced Adenomatous Polyps: A Systematic Review and Meta-analysis. Ann Intern Med. 2019;170(5):319-329. PMID 30802902; doi:10.7326/M18-2390.", "link": "https://doi.org/10.7326/m18-2390", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Imperiale2024", "text": "Imperiale TF, Porter K, Zella J, Gagrat ZD, Olson MC, Statz S, et al. Next-Generation Multitarget Stool DNA Test for Colorectal Cancer Screening. N Engl J Med. 2024;390(11):984-993. PMID 38477986; doi:10.1056/NEJMoa2310336.", "link": "https://doi.org/10.1056/nejmoa2310336", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Ingeman2026", "text": "Ingeman K, Carstensen TBW, Smith AB, Simard S, Frostholm L, Ørnbøl E, et al. Validation of the fear of cancer recurrence inventory-short form in long-term colorectal cancer survivors. J Patient Rep Outcomes. 2026;10(1). PMID 41999527; PMCID PMC13341998; doi:10.1186/s41687-026-01051-y.", "link": "https://doi.org/10.1186/s41687-026-01051-y", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Ionov1993", "text": "Ionov Y, Peinado MA, Malkhosyan S, Shibata D, Perucho M. Ubiquitous somatic mutations in simple repeated sequences reveal a new mechanism for colonic carcinogenesis. Nature. 1993;363(6429):558-61. PMID 8505985; doi:10.1038/363558a0.", "link": "https://doi.org/10.1038/363558a0", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Islami2018", "text": "Islami F, Goding Sauer A, Miller KD, Siegel RL, Fedewa SA, Jacobs EJ, et al. Proportion and number of cancer cases and deaths attributable to potentially modifiable risk factors in the United States. CA Cancer J Clin. 2018;68(1):31-54. PMID 29160902; doi:10.3322/caac.21440.", "link": "https://doi.org/10.3322/caac.21440", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Islami2024", "text": "Islami F, Marlow EC, Thomson B, McCullough ML, Rumgay H, Gapstur SM, et al. Proportion and number of cancer cases and deaths attributable to potentially modifiable risk factors in the United States, 2019. CA Cancer J Clin. 2024;74(5):405-432. PMID 38990124; doi:10.3322/caac.21858.", "link": "https://doi.org/10.3322/caac.21858", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Iveson2018", "text": "Iveson TJ, Kerr RS, Saunders MP, Cassidy J, Hollander NH, Tabernero J, et al. 3 versus 6 months of adjuvant oxaliplatin-fluoropyrimidine combination therapy for colorectal cancer (SCOT): an international, randomised, phase 3, non-inferiority trial. Lancet Oncol. 2018;19(4):562-578. PMID 29611518; PMCID PMC5883334; doi:10.1016/s1470-2045(18)30093-7.", "link": "https://doi.org/10.1016/s1470-2045(18)30093-7", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Jacobson2025", "text": "Jacobson BC, Anderson JC, Burke CA, Dominitz JA, Gross SA, May FP, et al. Optimizing Bowel Preparation Quality for Colonoscopy: Consensus Recommendations by the US Multi-Society Task Force on Colorectal Cancer. Gastroenterology. 2025;168(4):798-829. PMID 40047732; doi:10.1053/j.gastro.2025.02.002. Co-published in Gastrointest Endosc (PMID 40047767) and Am J Gastroenterol (PMID 40035345).", "link": "https://doi.org/10.1053/j.gastro.2025.02.002", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Janes2009", "text": "Jänes A, Cengiz Y, Israelsson LA. Preventing parastomal hernia with a prosthetic mesh: a 5-year follow-up of a randomized study. World J Surg. 2009;33(1):118-21; discussion 122-3. PMID 19011935; doi:10.1007/s00268-008-9785-4.", "link": "https://doi.org/10.1007/s00268-008-9785-4", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Jarvinen2000", "text": "Järvinen HJ, Aarnio M, Mustonen H, Aktan-Collan K, Aaltonen LA, Peltomäki P, et al. Controlled 15-year trial on screening for colorectal cancer in families with hereditary nonpolyposis colorectal cancer. Gastroenterology. 2000;118(5):829-34. PMID 10784581; doi:10.1016/s0016-5085(00)70168-5.", "link": "https://doi.org/10.1016/s0016-5085(00)70168-5", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Jasperson2010", "text": "Jasperson KW, Tuohy TM, Neklason DW, Burt RW. Hereditary and familial colon cancer. Gastroenterology. 2010;138(6):2044-58. PMID 20420945; PMCID PMC3057468; doi:10.1053/j.gastro.2010.01.054.", "link": "https://doi.org/10.1053/j.gastro.2010.01.054", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Jayne2010", "text": "Jayne DG, Thorpe HC, Copeland J, Quirke P, Brown JM, Guillou PJ. Five-year follow-up of the Medical Research Council CLASICC trial of laparoscopically assisted versus open surgery for colorectal cancer. Br J Surg. 2010;97(11):1638-1645. PMID 20629110; doi:10.1002/bjs.7160.", "link": "https://doi.org/10.1002/bjs.7160", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Jayne2017", "text": "Jayne D, Pigazzi A, Marshall H, Croft J, Corrigan N, Copeland J, et al. Effect of Robotic-Assisted vs Conventional Laparoscopic Surgery on Risk of Conversion to Open Laparotomy Among Patients Undergoing Resection for Rectal Cancer: The ROLARR Randomized Clinical Trial. JAMA. 2017;318(16):1569-1580. PMID 29067426; PMCID PMC5818805; doi:10.1001/jama.2017.7219.", "link": "https://doi.org/10.1001/jama.2017.7219", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Jiang2011", "text": "Jiang Y, Ben Q, Shen H, Lu W, Zhang Y, Zhu J. Diabetes mellitus and incidence and mortality of colorectal cancer: a systematic review and meta-analysis of cohort studies. Eur J Epidemiol. 2011;26(11):863-76. PMID 21938478; doi:10.1007/s10654-011-9617-y.", "link": "https://doi.org/10.1007/s10654-011-9617-y", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Jiricny2006", "text": "Jiricny J. The multifaceted mismatch-repair system. Nat Rev Mol Cell Biol. 2006;7(5):335-46. PMID 16612326; doi:10.1038/nrm1907.", "link": "https://doi.org/10.1038/nrm1907", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Johns2001", "text": "Johns LE, Houlston RS. A systematic review and meta-analysis of familial colorectal cancer risk. Am J Gastroenterol. 2001;96(10):2992-3003. PMID 11693338; doi:10.1111/j.1572-0241.2001.04677.x.", "link": "https://doi.org/10.1111/j.1572-0241.2001.04677.x", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Johnson2008", "text": "Johnson CD, Chen MH, Toledano AY, Heiken JP, Dachman A, Kuo MD, et al. Accuracy of CT colonography for detection of large adenomas and cancers. N Engl J Med. 2008;359(12):1207-17. PMID 18799557; PMCID PMC2654614; doi:10.1056/NEJMoa0800996.", "link": "https://doi.org/10.1056/nejmoa0800996", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Johnson2014", "text": "Johnson DA, Barkun AN, Cohen LB, Dominitz JA, Kaltenbach T, Martel M, et al. Optimizing adequacy of bowel cleansing for colonoscopy: recommendations from the US multi-society task force on colorectal cancer. Gastroenterology. 2014;147(4):903-24. PMID 25239068; doi:10.1053/j.gastro.2014.07.002. Cited only as the predecessor of Jacobson2025 (no abstract; paywalled).", "link": "https://doi.org/10.1053/j.gastro.2014.07.002", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Jones2007", "text": "Jones R, Latinovic R, Charlton J, Gulliford MC. Alarm symptoms in early diagnosis of cancer in primary care: cohort study using General Practice Research Database. BMJ. 2007;334(7602):1040. PMID 17493982; PMCID PMC1871798; doi:10.1136/bmj.39171.637106.AE.", "link": "https://doi.org/10.1136/bmj.39171.637106.ae", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Jones2008", "text": "Jones S, Chen WD, Parmigiani G, Diehl F, Beerenwinkel N, Antal T, et al. Comparative lesion sequencing provides insights into tumor evolution. Proc Natl Acad Sci U S A. 2008;105(11):4283-8. PMID 18337506; PMCID PMC2393770; doi:10.1073/pnas.0712345105.", "link": "https://doi.org/10.1073/pnas.0712345105", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Juul2014", "text": "Juul T, Ahlberg M, Biondo S, Emmertsen KJ, Espin E, Jimenez LM, et al. International validation of the low anterior resection syndrome score. Ann Surg. 2014;259(4):728-34. PMID 23598379; doi:10.1097/SLA.0b013e31828fac0b.", "link": "https://doi.org/10.1097/sla.0b013e31828fac0b", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Juul2019", "text": "Juul T, Elfeki H, Christensen P, Laurberg S, Emmertsen KJ, Bager P. Normative Data for the Low Anterior Resection Syndrome Score (LARS Score). Ann Surg. 2019;269(6):1124-1128. PMID 31082911; doi:10.1097/SLA.0000000000002750.", "link": "https://doi.org/10.1097/sla.0000000000002750", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Juul2022", "text": "Juul FE, Cross AJ, Schoen RE, Senore C, Pinsky P, Miller E, et al. 15-Year Benefits of Sigmoidoscopy Screening on Colorectal Cancer Incidence and Mortality: A Pooled Analysis of Randomized Trials. Ann Intern Med. 2022;175(11):1525-1533. PMID 36215714; doi:10.7326/M22-0835.", "link": "https://doi.org/10.7326/m22-0835", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Kaalby2019", "text": "Kaalby L, Rasmussen M, Zimmermann-Nielsen E, Buijs MM, Baatrup G. Time to colonoscopy, cancer probability, and precursor lesions in the Danish colorectal cancer screening program. Clin Epidemiol. 2019;11:659-667. PMID 31440102; PMCID PMC6679696; doi:10.2147/CLEP.S206873.", "link": "https://doi.org/10.2147/clep.s206873", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Kaminski2010", "text": "Kaminski MF, Regula J, Kraszewska E, Polkowski M, Wojciechowska U, Didkowska J, et al. Quality indicators for colonoscopy and the risk of interval cancer. N Engl J Med. 2010;362(19):1795-803. PMID 20463339; doi:10.1056/NEJMoa0907667.", "link": "https://doi.org/10.1056/nejmoa0907667", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Kaminski2017ESGE", "text": "Kaminski MF, Thomas-Gibson S, Bugajski M, Bretthauer M, Rees CJ, Dekker E, et al. Performance measures for lower gastrointestinal endoscopy: a European Society of Gastrointestinal Endoscopy (ESGE) Quality Improvement Initiative. Endoscopy. 2017;49(4):378-397. PMID 28268235; doi:10.1055/s-0043-103411.", "link": "https://doi.org/10.1055/s-0043-103411", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Kaminski2017Gastro", "text": "Kaminski MF, Wieszczy P, Rupinski M, Wojciechowska U, Didkowska J, Kraszewska E, et al. Increased Rate of Adenoma Detection Associates With Reduced Risk of Colorectal Cancer and Death. Gastroenterology. 2017;153(1):98-105. PMID 28428142; doi:10.1053/j.gastro.2017.04.006.", "link": "https://doi.org/10.1053/j.gastro.2017.04.006", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Kanas2012", "text": "Kanas GP, Taylor A, Primrose JN, Langeberg WJ, Kelsh MA, Mowat FS, et al. Survival after liver resection in metastatic colorectal cancer: review and meta-analysis of prognostic factors. Clin Epidemiol. 2012;4:283-301. PMID 23152705; PMCID PMC3496330; doi:10.2147/CLEP.S34285.", "link": "https://doi.org/10.2147/clep.s34285", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Kapidzic2014", "text": "Kapidzic A, Grobbee EJ, Hol L, van Roon AH, van Vuuren AJ, Spijker W, et al. Attendance and yield over three rounds of population-based fecal immunochemical test screening. Am J Gastroenterol. 2014;109(8):1257-64. PMID 24980879; doi:10.1038/ajg.2014.168.", "link": "https://doi.org/10.1038/ajg.2014.168", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Kapiteijn2001", "text": "Kapiteijn E, Marijnen CA, Nagtegaal ID, Putter H, Steup WH, Wiggers T, et al. Preoperative radiotherapy combined with total mesorectal excision for resectable rectal cancer. N Engl J Med. 2001;345(9):638-646. PMID 11547717; doi:10.1056/nejmoa010580.", "link": "https://doi.org/10.1056/nejmoa010580", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Karapetis2008", "text": "Karapetis CS, Khambata-Ford S, Jonker DJ, O'Callaghan CJ, Tu D, Tebbutt NC, et al. K-ras mutations and benefit from cetuximab in advanced colorectal cancer. N Engl J Med. 2008;359(17):1757-65. PMID 18946061; doi:10.1056/NEJMoa0804385.", "link": "https://doi.org/10.1056/nejmoa0804385", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Kemeny1999", "text": "Kemeny N, Huang Y, Cohen AM, Shi W, Conti JA, Brennan MF, et al. Hepatic arterial infusion of chemotherapy after resection of hepatic metastases from colorectal cancer. N Engl J Med. 1999;341(27):2039-48. PMID 10615075; doi:10.1056/NEJM199912303412702.", "link": "https://doi.org/10.1056/nejm199912303412702", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Keum2014", "text": "Keum N, Aune D, Greenwood DC, Ju W, Giovannucci EL. Calcium intake and colorectal cancer risk: dose-response meta-analysis of prospective observational studies. Int J Cancer. 2014;135(8):1940-8. PMID 24623471; doi:10.1002/ijc.28840.", "link": "https://doi.org/10.1002/ijc.28840", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Kinzler1991", "text": "Kinzler KW, Nilbert MC, Su LK, Vogelstein B, Bryan TM, Levy DB, et al. Identification of FAP locus genes from chromosome 5q21. Science. 1991;253(5020):661-5. PMID 1651562; doi:10.1126/science.1651562.", "link": "https://doi.org/10.1126/science.1651562", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Klingbiel2015", "text": "Klingbiel D, Saridaki Z, Roth AD, Bosman FT, Delorenzi M, Tejpar S. Prognosis of stage II and III colon cancer treated with adjuvant 5-fluorouracil or FOLFIRI in relation to microsatellite status: results of the PETACC-3 trial. Ann Oncol. 2015;26(1):126-132. PMID 25361982; doi:10.1093/annonc/mdu499.", "link": "https://doi.org/10.1093/annonc/mdu499", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Knudsen2021", "text": "Knudsen AB, Rutter CM, Peterse EFP, Lietz AP, Seguin CL, Meester RGS, et al. Colorectal Cancer Screening: An Updated Modeling Study for the US Preventive Services Task Force. JAMA. 2021;325(19):1998-2011. PMID 34003219; PMCID PMC8409520; doi:10.1001/jama.2021.5746.", "link": "https://doi.org/10.1001/jama.2021.5746", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Ko2010", "text": "Ko CW, Riffle S, Michaels L, Morris C, Holub J, Shapiro JA, et al. Serious complications within 30 days of screening and surveillance colonoscopy are uncommon. Clin Gastroenterol Hepatol. 2010;8(2):166-73. PMID 19850154; PMCID PMC2821994; doi:10.1016/j.cgh.2009.10.007.", "link": "https://doi.org/10.1016/j.cgh.2009.10.007", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Koopman2009", "text": "Koopman M, Kortman GA, Mekenkamp L, Ligtenberg MJ, Hoogerbrugge N, Antonini NF, et al. Deficient mismatch repair system in patients with sporadic advanced colorectal cancer. Br J Cancer. 2009;100(2):266-73. PMID 19165197; PMCID PMC2634718; doi:10.1038/sj.bjc.6604867.", "link": "https://doi.org/10.1038/sj.bjc.6604867", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Kooyker2020", "text": "Kooyker AI, Toes-Zoutendijk E, Opstal-van Winden AWJ, Spaander MCW, Buskermolen M, van Vuuren HJ, et al. The second round of the Dutch colorectal cancer screening program: Impact of an increased fecal immunochemical test cut-off level on yield of screening. Int J Cancer. 2020;147(4):1098-1106. PMID 31853977; PMCID PMC7383838; doi:10.1002/ijc.32839.", "link": "https://doi.org/10.1002/ijc.32839", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Kopetz2019", "text": "Kopetz S, Grothey A, Yaeger R, Van Cutsem E, Desai J, Yoshino T, et al. Encorafenib, Binimetinib, and Cetuximab in BRAF V600E-Mutated Colorectal Cancer. N Engl J Med. 2019;381(17):1632-1643. PMID 31566309; doi:10.1056/NEJMoa1908075.", "link": "https://doi.org/10.1056/nejmoa1908075", "areas": ["E", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Kopetz2025", "text": "Kopetz S, Yoshino T, Van Cutsem E, Eng C, Kim TW, Wasan HS, et al. Encorafenib, cetuximab and chemotherapy in BRAF-mutant colorectal cancer: a randomized phase 3 trial. Nat Med. 2025;31(3):901-908. PMID 39863775; PMCID PMC11922750; doi:10.1038/s41591-024-03443-3.", "link": "https://doi.org/10.1038/s41591-024-03443-3", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Kopetz2026", "text": "Kopetz S, Tabernero J, Lonardi S, Shen L, Wasan HS, Yoshino T, et al. A randomised study of encorafenib, cetuximab, and FOLFIRI versus FOLFIRI with or without bevacizumab in BRAF V600E-mutant colorectal cancer: BREAKWATER Cohort 3. Ann Oncol. 2026;37(8):1133-1143. PMID 42219860; doi:10.1016/j.annonc.2026.04.017.", "link": "https://doi.org/10.1016/j.annonc.2026.04.017", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Korinek1997", "text": "Korinek V, Barker N, Morin PJ, van Wichen D, de Weger R, Kinzler KW, et al. Constitutive transcriptional activation by a beta-catenin-Tcf complex in APC-/- colon carcinoma. Science. 1997;275(5307):1784-7. PMID 9065401; doi:10.1126/science.275.5307.1784.", "link": "https://doi.org/10.1126/science.275.5307.1784", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Kostic2012", "text": "Kostic AD, Gevers D, Pedamallu CS, Michaud M, Duke F, Earl AM, et al. Genomic analysis identifies association of Fusobacterium with colorectal carcinoma. Genome Res. 2012;22(2):292-8. PMID 22009990; PMCID PMC3266036; doi:10.1101/gr.126573.111.", "link": "https://doi.org/10.1101/gr.126573.111", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Kotani2023", "text": "Kotani D, Oki E, Nakamura Y, Yukami H, Mishima S, Bando H, et al. Molecular residual disease and efficacy of adjuvant chemotherapy in patients with colorectal cancer. Nat Med. 2023;29(1):127-134. PMID 36646802; PMCID PMC9873552; doi:10.1038/s41591-022-02115-4.", "link": "https://doi.org/10.1038/s41591-022-02115-4", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Kotronoulas2017", "text": "Kotronoulas G, Papadopoulou C, Burns-Cunningham K, Simpson M, Maguire R. A systematic review of the supportive care needs of people living with and beyond cancer of the colon and/or rectum. Eur J Oncol Nurs. 2017;29:60-70. PMID 28720267; doi:10.1016/j.ejon.2017.05.004.", "link": "https://doi.org/10.1016/j.ejon.2017.05.004", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Kronborg1996", "text": "Kronborg O, Fenger C, Olsen J, Jørgensen OD, Søndergaard O. Randomised study of screening for colorectal cancer with faecal-occult-blood test. Lancet. 1996;348(9040):1467-71. PMID 8942774; doi:10.1016/S0140-6736(96)03430-7.", "link": "https://doi.org/10.1016/s0140-6736(96)03430-7", "areas": ["A", "D"], "unverified": false, "validated": "PubMed"}, {"key": "Kuebler2007", "text": "Kuebler JP, Wieand HS, O'Connell MJ, Smith RE, Colangelo LH, Yothers G, et al. Oxaliplatin combined with weekly bolus fluorouracil and leucovorin as surgical adjuvant chemotherapy for stage II and III colon cancer: results from NSABP C-07. J Clin Oncol. 2007;25(16):2198-2204. PMID 17470851; doi:10.1200/jco.2006.08.2974.", "link": "https://doi.org/10.1200/jco.2006.08.2974", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Kunkel2005", "text": "Kunkel TA, Erie DA. DNA mismatch repair. Annu Rev Biochem. 2005;74:681-710. PMID 15952900; doi:10.1146/annurev.biochem.74.082803.133243.", "link": "https://doi.org/10.1146/annurev.biochem.74.082803.133243", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Ladabaum2024AIM", "text": "Ladabaum U, Mannalithara A, Schoen RE, Dominitz JA, Lieberman D. Projected Impact and Cost-Effectiveness of Novel Molecular Blood-Based or Stool-Based Screening Tests for Colorectal Cancer. Ann Intern Med. 2024;177(12):1610-1620. PMID 39467291; PMCID PMC12302969; doi:10.7326/ANNALS-24-00910.", "link": "https://doi.org/10.7326/annals-24-00910", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Ladabaum2024Gastro", "text": "Ladabaum U, Mannalithara A, Weng Y, Schoen RE, Dominitz JA, Desai M, et al. Comparative Effectiveness and Cost-Effectiveness of Colorectal Cancer Screening With Blood-Based Biomarkers (Liquid Biopsy) vs Fecal Tests or Colonoscopy. Gastroenterology. 2024;167(2):378-391. PMID 38552670; PMCID PMC12279009; doi:10.1053/j.gastro.2024.03.011.", "link": "https://doi.org/10.1053/j.gastro.2024.03.011", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Lai2009", "text": "Lai EJ, Calderwood AH, Doros G, Fix OK, Jacobson BC. The Boston bowel preparation scale: a valid and reliable instrument for colonoscopy-oriented research. Gastrointest Endosc. 2009;69(3 Pt 2):620-5. PMID 19136102; PMCID PMC2763922; doi:10.1016/j.gie.2008.05.057.", "link": "https://doi.org/10.1016/j.gie.2008.05.057", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Lange2009", "text": "Lange MM, Marijnen CA, Maas CP, Putter H, Rutten HJ, Stiggelbout AM, et al. Risk factors for sexual dysfunction after rectal cancer treatment. Eur J Cancer. 2009;45(9):1578-88. PMID 19147343; doi:10.1016/j.ejca.2008.12.014.", "link": "https://doi.org/10.1016/j.ejca.2008.12.014", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Lange2011", "text": "Lange MM, van de Velde CJ. Urinary and sexual dysfunction after rectal cancer treatment. Nat Rev Urol. 2011;8(1):51-7. PMID 21135876; doi:10.1038/nrurol.2010.206.", "link": "https://doi.org/10.1038/nrurol.2010.206", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Larsson2005", "text": "Larsson SC, Orsini N, Wolk A. Diabetes mellitus and risk of colorectal cancer: a meta-analysis. J Natl Cancer Inst. 2005;97(22):1679-87. PMID 16288121; doi:10.1093/jnci/dji375.", "link": "https://doi.org/10.1093/jnci/dji375", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Laurberg2021", "text": "Laurberg JR, Laurberg VR, Elfeki H, Jensen JB, Emmertsen KJ. Male erectile function after treatment for colorectal cancer: a population-based cross-sectional study. Colorectal Dis. 2021;23(2):367-375. PMID 33306262; doi:10.1111/codi.15482.", "link": "https://doi.org/10.1111/codi.15482", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Le2015", "text": "Le DT, Uram JN, Wang H, Bartlett BR, Kemberling H, Eyring AD, et al. PD-1 Blockade in Tumors with Mismatch-Repair Deficiency. N Engl J Med. 2015;372(26):2509-20. PMID 26028255; PMCID PMC4481136; doi:10.1056/NEJMoa1500596.", "link": "https://doi.org/10.1056/nejmoa1500596", "areas": ["A", "C"], "unverified": false, "validated": "PubMed"}, {"key": "Le2017", "text": "Le DT, Durham JN, Smith KN, Wang H, Bartlett BR, Aulakh LK, et al. Mismatch repair deficiency predicts response of solid tumors to PD-1 blockade. Science. 2017;357(6349):409-413. PMID 28596308; PMCID PMC5576142; doi:10.1126/science.aan6733.", "link": "https://doi.org/10.1126/science.aan6733", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Leach1993", "text": "Leach FS, Nicolaides NC, Papadopoulos N, Liu B, Jen J, Parsons R, et al. Mutations of a mutS homolog in hereditary nonpolyposis colorectal cancer. Cell. 1993;75(6):1215-25. PMID 8261515; doi:10.1016/0092-8674(93)90330-s.", "link": "https://doi.org/10.1016/0092-8674(93)90330-s", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Lederhuber2023", "text": "Lederhuber H, Massey LH, Kantola VE, Siddiqui MRS, Sayers AE, McDermott FD, et al. Clinical management of high-output stoma: a systematic literature review and meta-analysis. Tech Coloproctol. 2023;27(12):1139-1154. PMID 37330988; doi:10.1007/s10151-023-02830-1.", "link": "https://doi.org/10.1007/s10151-023-02830-1", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Lee2014", "text": "Lee JK, Liles EG, Bent S, Levin TR, Corley DA. Accuracy of fecal immunochemical tests for colorectal cancer: systematic review and meta-analysis. Ann Intern Med. 2014;160(3):171. PMID 24658694; PMCID PMC4189821; doi:10.7326/M13-1484.", "link": "https://doi.org/10.7326/m13-1484", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Lee2015", "text": "Lee GH, Malietzis G, Askari A, Bernardo D, Al-Hassi HO, Clark SK. Is right-sided colon cancer different to left-sided colorectal cancer? - a systematic review. Eur J Surg Oncol. 2015;41(3):300-8. PMID 25468456; doi:10.1016/j.ejso.2014.11.001.", "link": "https://doi.org/10.1016/j.ejso.2014.11.001", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "LeeSix2019", "text": "Lee-Six H, Olafsson S, Ellis P, Osborne RJ, Sanders MA, Moore L, et al. The landscape of somatic mutation in normal colorectal epithelial cells. Nature. 2019;574(7779):532-537. PMID 31645730; doi:10.1038/s41586-019-1672-7.", "link": "https://doi.org/10.1038/s41586-019-1672-7", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Lengauer1997", "text": "Lengauer C, Kinzler KW, Vogelstein B. Genetic instability in colorectal cancers. Nature. 1997;386(6625):623-7. PMID 9121588; doi:10.1038/386623a0.", "link": "https://doi.org/10.1038/386623a0", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Lenz2022", "text": "Lenz HJ, Van Cutsem E, Luisa Limon M, Wong KYM, Hendlisz A, Aglietta M, et al. First-Line Nivolumab Plus Low-Dose Ipilimumab for Microsatellite Instability-High/Mismatch Repair-Deficient Metastatic Colorectal Cancer: The Phase II CheckMate 142 Study. J Clin Oncol. 2022;40(2):161-170. PMID 34637336; doi:10.1200/JCO.21.01015.", "link": "https://doi.org/10.1200/jco.21.01015", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Leslie2002", "text": "Leslie A, Carey FA, Pratt NR, Steele RJ. The colorectal adenoma-carcinoma sequence. Br J Surg. 2002;89(7):845-60. PMID 12081733; doi:10.1046/j.1365-2168.2002.02120.x.", "link": "https://doi.org/10.1046/j.1365-2168.2002.02120.x", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Levin2018", "text": "Levin TR, Corley DA, Jensen CD, Schottinger JE, Quinn VP, Zauber AG, et al. Effects of Organized Colorectal Cancer Screening on Cancer Incidence and Mortality in a Large Community-Based Population. Gastroenterology. 2018;155(5):1383-1391.e5. PMID 30031768; PMCID PMC6240353; doi:10.1053/j.gastro.2018.07.017.", "link": "https://doi.org/10.1053/j.gastro.2018.07.017", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "LeVoyer2003", "text": "Le Voyer TE, Sigurdson ER, Hanlon AL, Mayer RJ, Macdonald JS, Catalano PJ, et al. Colon cancer survival is associated with increasing number of lymph nodes analyzed: a secondary survey of intergroup trial INT-0089. J Clin Oncol. 2003;21(15):2912-9. PMID 12885809; doi:10.1200/JCO.2003.05.062.", "link": "https://doi.org/10.1200/jco.2003.05.062", "areas": ["E", "F"], "unverified": false, "validated": "PubMed"}, {"key": "Li2008", "text": "Li GM. Mechanisms and functions of DNA mismatch repair. Cell Res. 2008;18(1):85-98. PMID 18157157; doi:10.1038/cr.2007.115.", "link": "https://doi.org/10.1038/cr.2007.115", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Li2020", "text": "Li H, Fu G, Wei W, Huang Y, Wang Z, Liang T, et al. Re-Evaluation of the Survival Paradox Between Stage IIB/IIC and Stage IIIA Colon Cancer. Front Oncol. 2020;10:595107. PMID 33312954; PMCID PMC7708319; doi:10.3389/fonc.2020.595107.", "link": "https://doi.org/10.3389/fonc.2020.595107", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Li2021", "text": "Li SJ, Sharples LD, Benton SC, Blyuss O, Mathews C, Sasieni P, et al. Faecal immunochemical testing in bowel cancer screening: Estimating outcomes for different diagnostic policies. J Med Screen. 2021;28(3):277-285. PMID 33342370; PMCID PMC8366184; doi:10.1177/0969141320980501. Threshold table read from PMC full text.", "link": "https://doi.org/10.1177/0969141320980501", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Li2022", "text": "Li SJ, Seedher T, Sharples LD, Benton SC, Mathews C, Gabe R, et al. Impact of changes to the interscreening interval and faecal immunochemical test threshold in the national bowel cancer screening programme in England: results from the FIT pilot study. Br J Cancer. 2022;127(8):1525-1533. PMID 35974099; PMCID PMC9553931; doi:10.1038/s41416-022-01919-y.", "link": "https://doi.org/10.1038/s41416-022-01919-y", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Liang2009", "text": "Liang PS, Chen TY, Giovannucci E. Cigarette smoking and colorectal cancer incidence and mortality: systematic review and meta-analysis. Int J Cancer. 2009;124(10):2406-15. PMID 19142968; doi:10.1002/ijc.24191.", "link": "https://doi.org/10.1002/ijc.24191", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Lichtenstein2000", "text": "Lichtenstein P, Holm NV, Verkasalo PK, Iliadou A, Kaprio J, Koskenvuo M, et al. Environmental and heritable factors in the causation of cancer--analyses of cohorts of twins from Sweden, Denmark, and Finland. N Engl J Med. 2000;343(2):78-85. PMID 10891514; doi:10.1056/NEJM200007133430201.", "link": "https://doi.org/10.1056/nejm200007133430201", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Lieberman2000", "text": "Lieberman DA, Weiss DG, Bond JH, Ahnen DJ, Garewal H, Chejfec G. Use of colonoscopy to screen asymptomatic adults for colorectal cancer. Veterans Affairs Cooperative Study Group 380. N Engl J Med. 2000;343(3):162-8. PMID 10900274; doi:10.1056/NEJM200007203430301.", "link": "https://doi.org/10.1056/nejm200007203430301", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Liebig2009", "text": "Liebig C, Ayala G, Wilks J, Verstovsek G, Liu H, Agarwal N, et al. Perineural invasion is an independent predictor of outcome in colorectal cancer. J Clin Oncol. 2009;27(31):5131-7. PMID 19738119; PMCID PMC2773472; doi:10.1200/JCO.2009.22.4949.", "link": "https://doi.org/10.1200/jco.2009.22.4949", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Ligtenberg2009", "text": "Ligtenberg MJ, Kuiper RP, Chan TL, Goossens M, Hebeda KM, Voorendt M, et al. Heritable somatic methylation and inactivation of MSH2 in families with Lynch syndrome due to deletion of the 3' exons of TACSTD1. Nat Genet. 2009;41(1):112-7. PMID 19098912; doi:10.1038/ng.283.", "link": "https://doi.org/10.1038/ng.283", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Lin2021", "text": "Lin JS, Perdue LA, Henrikson NB, Bean SI, Blasi PR. Screening for Colorectal Cancer: Updated Evidence Report and Systematic Review for the US Preventive Services Task Force. JAMA. 2021;325(19):1978-1998. PMID 34003220; PMCID PMC13509038; doi:10.1001/jama.2021.4417.", "link": "https://doi.org/10.1001/jama.2021.4417", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Lirici2016", "text": "Lirici MM, Hüscher CG. Techniques and technology evolution of rectal cancer surgery: a history of more than a hundred years. Minim Invasive Ther Allied Technol. 2016;25(5):226-33. PMID 27415777; doi:10.1080/13645706.2016.1198381.", "link": "https://doi.org/10.1080/13645706.2016.1198381", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Ljungqvist2017", "text": "Ljungqvist O, Scott M, Fearon KC. Enhanced Recovery After Surgery: A Review. JAMA Surg. 2017;152(3):292-298. PMID 28097305; doi:10.1001/jamasurg.2016.4952.", "link": "https://doi.org/10.1001/jamasurg.2016.4952", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Lochhead2015", "text": "Lochhead P, Chan AT, Nishihara R, Fuchs CS, Beck AH, Giovannucci E, et al. Etiologic field effect: reappraisal of the field effect concept in cancer predisposition and progression. Mod Pathol. 2015;28(1):14-29. PMID 24925058; PMCID PMC4265316; doi:10.1038/modpathol.2014.81.", "link": "https://doi.org/10.1038/modpathol.2014.81", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Locker2006", "text": "Locker GY, Hamilton S, Harris J, Jessup JM, Kemeny N, Macdonald JS, et al. ASCO 2006 update of recommendations for the use of tumor markers in gastrointestinal cancer. J Clin Oncol. 2006;24(33):5313-27. PMID 17060676; doi:10.1200/JCO.2006.08.2644.", "link": "https://doi.org/10.1200/jco.2006.08.2644", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "LockhartMummery1925", "text": "Lockhart-Mummery P. Cancer and heredity. Lancet. 1925;205(5296):427-429. doi:10.1016/S0140-6736(00)95996-8.", "link": "https://doi.org/10.1016/s0140-6736(00)95996-8", "areas": ["A"], "unverified": false, "validated": "Crossref"}, {"key": "LockhartMummery1939", "text": "Lockhart-Mummery JP, Dukes CE. Familial adenomatosis of colon and rectum. Lancet. 1939;234(6054):586-589. doi:10.1016/S0140-6736(00)73982-1.", "link": "https://doi.org/10.1016/s0140-6736(00)73982-1", "areas": ["A"], "unverified": false, "validated": "Crossref"}, {"key": "Lonardi2026", "text": "Lonardi S, Lenz HJ, Elez E, Jensen LH, Van Cutsem E, Touchefeu Y, et al. Final results of nivolumab plus ipilimumab versus nivolumab or chemotherapy in microsatellite instability-high/mismatch repair-deficient metastatic colorectal cancer from CheckMate 8HW. Ann Oncol. 2026 (online ahead of print). PMID 42926106; doi:10.1016/j.annonc.2026.09.009.", "link": "https://doi.org/10.1016/j.annonc.2026.09.009", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Loprinzi2014", "text": "Loprinzi CL, Qin R, Dakhil SR, Fehrenbacher L, Flynn KA, Atherton P, et al. Phase III randomized, placebo-controlled, double-blind study of intravenous calcium and magnesium to prevent oxaliplatin-induced sensory neurotoxicity (N08CB/Alliance). J Clin Oncol. 2014;32(10):997-1005. PMID 24297951; PMCID PMC3965262; doi:10.1200/JCO.2013.52.0536.", "link": "https://doi.org/10.1200/jco.2013.52.0536", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Loprinzi2020", "text": "Loprinzi CL, Lacchetti C, Bleeker J, Cavaletti G, Chauhan C, Hertz DL, et al. Prevention and Management of Chemotherapy-Induced Peripheral Neuropathy in Survivors of Adult Cancers: ASCO Guideline Update. J Clin Oncol. 2020;38(28):3325-3348. PMID 32663120; doi:10.1200/JCO.20.01399.", "link": "https://doi.org/10.1200/jco.20.01399", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Loupakis2014", "text": "Loupakis F, Cremolini C, Masi G, Lonardi S, Zagonel V, Salvatore L, et al. Initial therapy with FOLFOXIRI and bevacizumab for metastatic colorectal cancer. N Engl J Med. 2014;371(17):1609-18. PMID 25337750; doi:10.1056/NEJMoa1403108.", "link": "https://doi.org/10.1056/nejmoa1403108", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Loupakis2015", "text": "Loupakis F, Yang D, Yau L, Feng S, Cremolini C, Zhang W, et al. Primary tumor location as a prognostic factor in metastatic colorectal cancer. J Natl Cancer Inst. 2015;107(3):dju427. PMID 25713148; PMCID PMC4565528; doi:10.1093/jnci/dju427.", "link": "https://doi.org/10.1093/jnci/dju427", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Lowery2016", "text": "Lowery JT, Ahnen DJ, Schroy PC 3rd, Hampel H, Baxter N, Boland CR, et al. Understanding the contribution of family history to colorectal cancer risk and its clinical implications: A state-of-the-science review. Cancer. 2016;122(17):2633-45. PMID 27258162; PMCID PMC5575812; doi:10.1002/cncr.30080.", "link": "https://doi.org/10.1002/cncr.30080", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Luchini2019", "text": "Luchini C, Bibeau F, Ligtenberg MJL, Singh N, Nottegar A, Bosse T, et al. ESMO recommendations on microsatellite instability testing for immunotherapy in cancer, and its relationship with PD-1/PD-L1 expression and tumour mutational burden: a systematic review-based approach. Ann Oncol. 2019;30(8):1232-1243. PMID 31056702; doi:10.1093/annonc/mdz116.", "link": "https://doi.org/10.1093/annonc/mdz116", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Lugli2017", "text": "Lugli A, Kirsch R, Ajioka Y, Bosman F, Cathomas G, Dawson H, et al. Recommendations for reporting tumor budding in colorectal cancer based on the International Tumor Budding Consensus Conference (ITBCC) 2016. Mod Pathol. 2017;30(9):1299-1311. PMID 28548122; doi:10.1038/modpathol.2017.46.", "link": "https://doi.org/10.1038/modpathol.2017.46", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Lynch1966", "text": "Lynch HT, Shaw MW, Magnuson CW, Larsen AL, Krush AJ. Hereditary factors in cancer. Study of two large midwestern kindreds. Arch Intern Med. 1966;117(2):206-12. PMID 5901552.", "link": "https://pubmed.ncbi.nlm.nih.gov/5901552/", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Ma2013", "text": "Ma Y, Yang Y, Wang F, Zhang P, Shi C, Zou Y, et al. Obesity and risk of colorectal cancer: a systematic review of prospective studies. PLoS One. 2013;8(1):e53916. PMID 23349764; PMCID PMC3547959; doi:10.1371/journal.pone.0053916.", "link": "https://doi.org/10.1371/journal.pone.0053916", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Mandel1993", "text": "Mandel JS, Bond JH, Church TR, Snover DC, Bradley GM, Schuman LM, et al. Reducing mortality from colorectal cancer by screening for fecal occult blood. Minnesota Colon Cancer Control Study. N Engl J Med. 1993;328(19):1365-71. PMID 8474513; doi:10.1056/NEJM199305133281901.", "link": "https://doi.org/10.1056/nejm199305133281901", "areas": ["A", "D"], "unverified": false, "validated": "PubMed"}, {"key": "Mandel1999", "text": "Mandel JS, Church TR, Ederer F, Bond JH. Colorectal cancer mortality: effectiveness of biennial screening for fecal occult blood. J Natl Cancer Inst. 1999;91(5):434-7. PMID 10070942; doi:10.1093/jnci/91.5.434.", "link": "https://doi.org/10.1093/jnci/91.5.434", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Mandel2000", "text": "Mandel JS, Church TR, Bond JH, Ederer F, Geisser MS, Mongin SJ, et al. The effect of fecal occult-blood screening on the incidence of colorectal cancer. N Engl J Med. 2000;343(22):1603-7. PMID 11096167; doi:10.1056/NEJM200011303432203.", "link": "https://doi.org/10.1056/nejm200011303432203", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Manfredi2006", "text": "Manfredi S, Lepage C, Hatem C, Coatmeur O, Faivre J, Bouvier AM. Epidemiology and management of liver metastases from colorectal cancer. Ann Surg. 2006;244(2):254-9. PMID 16858188; doi:10.1097/01.sla.0000217629.94941.cf.", "link": "https://doi.org/10.1097/01.sla.0000217629.94941.cf", "areas": ["C", "G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Manson2019", "text": "Manson JE, Cook NR, Lee IM, Christen W, Bassuk SS, Mora S, et al. Vitamin D Supplements and Prevention of Cancer and Cardiovascular Disease. N Engl J Med. 2019;380(1):33-44. PMID 30415629; PMCID PMC6425757; doi:10.1056/NEJMoa1809944.", "link": "https://doi.org/10.1056/nejmoa1809944", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Martel2015", "text": "Martel M, Barkun AN, Menard C, Restellini S, Kherad O, Vanasse A. Split-Dose Preparations Are Superior to Day-Before Bowel Cleansing Regimens: A Meta-analysis. Gastroenterology. 2015;149(1):79-88. PMID 25863216; doi:10.1053/j.gastro.2015.04.004.", "link": "https://doi.org/10.1053/j.gastro.2015.04.004", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Martling2025", "text": "Martling A, Hed Myrberg I, Nilbert M, Grönberg H, Granath F, Eklund M, et al. Low-Dose Aspirin for PI3K-Altered Localized Colorectal Cancer. N Engl J Med. 2025;393(11):1051-1064. PMID 40961426; doi:10.1056/NEJMoa2504650.", "link": "https://doi.org/10.1056/nejmoa2504650", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Matthiessen2007", "text": "Matthiessen P, Hallböök O, Rutegård J, Simert G, Sjödahl R. Defunctioning stoma reduces symptomatic anastomotic leakage after low anterior resection of the rectum for cancer: a randomized multicenter trial. Ann Surg. 2007;246(2):207-214. PMID 17667498; doi:10.1097/sla.0b013e3180603024.", "link": "https://doi.org/10.1097/sla.0b013e3180603024", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Mayer2015", "text": "Mayer RJ, Van Cutsem E, Falcone A, Yoshino T, Garcia-Carbonero R, Mizunuma N, et al. Randomized trial of TAS-102 for refractory metastatic colorectal cancer. N Engl J Med. 2015;372(20):1909-19. PMID 25970050; doi:10.1056/NEJMoa1414325.", "link": "https://doi.org/10.1056/nejmoa1414325", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "McCleary2013", "text": "McCleary NJ, Meyerhardt JA, Green E, Yothers G, de Gramont A, Van Cutsem E, et al. Impact of age on the efficacy of newer adjuvant therapies in patients with stage II/III colon cancer: findings from the ACCENT database. J Clin Oncol. 2013;31(20):2600-2606. PMID 23733765; PMCID PMC3699725; doi:10.1200/jco.2013.49.6638.", "link": "https://doi.org/10.1200/jco.2013.49.6638", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "McNeil2018", "text": "McNeil JJ, Nelson MR, Woods RL, Lockery JE, Wolfe R, Reid CM, et al. Effect of Aspirin on All-Cause Mortality in the Healthy Elderly. N Engl J Med. 2018;379(16):1519-1528. PMID 30221595; PMCID PMC6433466; doi:10.1056/NEJMoa1803955.", "link": "https://doi.org/10.1056/nejmoa1803955", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "McNeil2021", "text": "McNeil JJ, Gibbs P, Orchard SG, Lockery JE, Bernstein WB, Cao Y, et al. Effect of Aspirin on Cancer Incidence and Mortality in Older Adults. J Natl Cancer Inst. 2021;113(3):258-265. PMID 32778876; PMCID PMC7936068; doi:10.1093/jnci/djaa114.", "link": "https://doi.org/10.1093/jnci/djaa114", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "McPhail2022", "text": "McPhail S, Swann R, Johnson SA, Barclay ME, Abd Elkader H, Alvi R, et al. Risk factors and prognostic implications of diagnosis of cancer within 30 days after an emergency hospital admission (emergency presentation): an International Cancer Benchmarking Partnership (ICBP) population-based study. Lancet Oncol. 2022;23(5):587-600. PMID 35397210; PMCID PMC9046095; doi:10.1016/S1470-2045(22)00127-9.", "link": "https://doi.org/10.1016/s1470-2045(22)00127-9", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Meester2015", "text": "Meester RG, Doubeni CA, Zauber AG, Goede SL, Levin TR, Corley DA, et al. Public health impact of achieving 80% colorectal cancer screening rates in the United States by 2018. Cancer. 2015;121(13):2281-5. PMID 25763558; PMCID PMC4567966; doi:10.1002/cncr.29336.", "link": "https://doi.org/10.1002/cncr.29336", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Meester2015JAMA", "text": "Meester RG, Doubeni CA, Lansdorp-Vogelaar I, Jensen CD, van der Meulen MP, Levin TR, et al. Variation in Adenoma Detection Rate and the Lifetime Benefits and Cost of Colorectal Cancer Screening: A Microsimulation Model. JAMA. 2015;313(23):2349-58. PMID 26080339; PMCID PMC4631392; doi:10.1001/jama.2015.6251.", "link": "https://doi.org/10.1001/jama.2015.6251", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "MERCURY2006", "text": "MERCURY Study Group. Diagnostic accuracy of preoperative magnetic resonance imaging in predicting curative resection of rectal cancer: prospective observational study. BMJ. 2006;333(7572):779. PMID 16984925; PMCID PMC1602032; doi:10.1136/bmj.38937.646400.55.", "link": "https://doi.org/10.1136/bmj.38937.646400.55", "areas": ["E", "F"], "unverified": false, "validated": "PubMed"}, {"key": "MERCURY2007", "text": "MERCURY Study Group. Extramural depth of tumor invasion at thin-section MR in patients with rectal cancer: results of the MERCURY study. Radiology. 2007;243(1):132-9. PMID 17329685; doi:10.1148/radiol.2431051825.", "link": "https://doi.org/10.1148/radiol.2431051825", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Messaris2012", "text": "Messaris E, Sehgal R, Deiling S, Koltun WA, Stewart D, McKenna K, et al. Dehydration is the most common indication for readmission after diverting ileostomy creation. Dis Colon Rectum. 2012;55(2):175-80. PMID 22228161; doi:10.1097/DCR.0b013e31823d0ec5.", "link": "https://doi.org/10.1097/dcr.0b013e31823d0ec5", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Meulendijks2015", "text": "Meulendijks D, Henricks LM, Sonke GS, Deenen MJ, Froehlich TK, Amstutz U, et al. Clinical relevance of DPYD variants c.1679T>G, c.1236G>A/HapB3, and c.1601G>A as predictors of severe fluoropyrimidine-associated toxicity: a systematic review and meta-analysis of individual patient data. Lancet Oncol. 2015;16(16):1639-50. PMID 26603945; doi:10.1016/S1470-2045(15)00286-7.", "link": "https://doi.org/10.1016/s1470-2045(15)00286-7", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Meyerhardt2006", "text": "Meyerhardt JA, Heseltine D, Niedzwiecki D, Hollis D, Saltz LB, Mayer RJ, et al. Impact of physical activity on cancer recurrence and survival in patients with stage III colon cancer: findings from CALGB 89803. J Clin Oncol. 2006;24(22):3535-41. PMID 16822843; doi:10.1200/JCO.2006.06.0863.", "link": "https://doi.org/10.1200/jco.2006.06.0863", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Meyerhardt2007", "text": "Meyerhardt JA, Niedzwiecki D, Hollis D, Saltz LB, Hu FB, Mayer RJ, et al. Association of dietary patterns with cancer recurrence and survival in patients with stage III colon cancer. JAMA. 2007;298(7):754-64. PMID 17699009; doi:10.1001/jama.298.7.754.", "link": "https://doi.org/10.1001/jama.298.7.754", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Meyerhardt2013", "text": "Meyerhardt JA, Mangu PB, Flynn PJ, Korde L, Loprinzi CL, Minsky BD, et al. Follow-up care, surveillance protocol, and secondary prevention measures for survivors of colorectal cancer: American Society of Clinical Oncology clinical practice guideline endorsement. J Clin Oncol. 2013;31(35):4465-70. PMID 24220554; doi:10.1200/JCO.2013.50.7442.", "link": "https://doi.org/10.1200/jco.2013.50.7442", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Miles1908", "text": "Miles WE. A method of performing abdomino-perineal excision for carcinoma of the rectum and of the terminal portion of the pelvic colon. Lancet. 1908;172(4451):1812-1813. doi:10.1016/S0140-6736(00)99076-7.", "link": "https://doi.org/10.1016/s0140-6736(00)99076-7", "areas": ["A"], "unverified": false, "validated": "Crossref"}, {"key": "Mima2016", "text": "Mima K, Nishihara R, Qian ZR, Cao Y, Sukawa Y, Nowak JA, et al. Fusobacterium nucleatum in colorectal carcinoma tissue and patient prognosis. Gut. 2016;65(12):1973-1980. PMID 26311717; PMCID PMC4769120; doi:10.1136/gutjnl-2015-310101.", "link": "https://doi.org/10.1136/gutjnl-2015-310101", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Missiaglia2014", "text": "Missiaglia E, Jacobs B, D'Ario G, Di Narzo AF, Soneson C, Budinska E, et al. Distal and proximal colon cancers differ in terms of molecular, pathological, and clinical features. Ann Oncol. 2014;25(10):1995-2001. PMID 25057166; doi:10.1093/annonc/mdu275.", "link": "https://doi.org/10.1093/annonc/mdu275", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Mitry2010", "text": "Mitry E, Guiu B, Cosconea S, Jooste V, Faivre J, Bouvier AM. Epidemiology, management and prognosis of colorectal cancer with lung metastases: a 30-year population-based study. Gut. 2010;59(10):1383-8. PMID 20732912; doi:10.1136/gut.2010.211557.", "link": "https://doi.org/10.1136/gut.2010.211557", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Moertel1990", "text": "Moertel CG, Fleming TR, Macdonald JS, Haller DG, Laurie JA, Goodman PJ, et al. Levamisole and fluorouracil for adjuvant therapy of resected colon carcinoma. N Engl J Med. 1990;322(6):352-8. PMID 2300087; doi:10.1056/NEJM199002083220602.", "link": "https://doi.org/10.1056/nejm199002083220602", "areas": ["A", "F"], "unverified": false, "validated": "PubMed"}, {"key": "Moller2018", "text": "Møller P, Seppälä TT, Bernstein I, Holinski-Feder E, Sala P, Gareth Evans D, et al. Cancer risk and survival in path_MMR carriers by gene and gender up to 75 years of age: a report from the Prospective Lynch Syndrome Database. Gut. 2018;67(7):1306-1316. PMID 28754778; PMCID PMC6031262; doi:10.1136/gutjnl-2017-314057.", "link": "https://doi.org/10.1136/gutjnl-2017-314057", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Mols2018", "text": "Mols F, Schoormans D, de Hingh I, Oerlemans S, Husson O. Symptoms of anxiety and depression among colorectal cancer survivors from the population-based, longitudinal PROFILES Registry: Prevalence, predictors, and impact on quality of life. Cancer. 2018;124(12):2621-2628. PMID 29624635; PMCID PMC6033166; doi:10.1002/cncr.31369.", "link": "https://doi.org/10.1002/cncr.31369", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Monahan2020", "text": "Monahan KJ, Bradshaw N, Dolwani S, Desouza B, Dunlop MG, East JE, et al. Guidelines for the management of hereditary colorectal cancer from the British Society of Gastroenterology (BSG)/Association of Coloproctology of Great Britain and Ireland (ACPGBI)/United Kingdom Cancer Genetics Group (UKCGG). Gut. 2020;69(3):411-444. PMID 31780574; PMCID PMC7034349; doi:10.1136/gutjnl-2019-319915.", "link": "https://doi.org/10.1136/gutjnl-2019-319915", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Monahan2022", "text": "Monahan KJ, Davies MM, Abulafi M, Banerjea A, Nicholson BD, Arasaradnam R, et al. Faecal immunochemical testing (FIT) in patients with signs or symptoms of suspected colorectal cancer (CRC): a joint guideline from the Association of Coloproctology of Great Britain and Ireland (ACPGBI) and the British Society of Gastroenterology (BSG). Gut. 2022;71(10):1939-62. PMID 35820780; PMCID PMC9484376; doi:10.1136/gutjnl-2022-327985.", "link": "https://doi.org/10.1136/gutjnl-2022-327985", "areas": ["A", "E"], "unverified": false, "validated": "PubMed"}, {"key": "Moreira2012", "text": "Moreira L, Balaguer F, Lindor N, de la Chapelle A, Hampel H, Aaltonen LA, et al. Identification of Lynch syndrome among patients with colorectal cancer. JAMA. 2012;308(15):1555-65. PMID 23073952; PMCID PMC3873721; doi:10.1001/jama.2012.13088.", "link": "https://doi.org/10.1001/jama.2012.13088", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Morgan2023", "text": "Morgan E, Arnold M, Gini A, Lorenzoni V, Cabasag CJ, Laversanne M, et al. Global burden of colorectal cancer in 2020 and 2040: incidence and mortality estimates from GLOBOCAN. Gut. 2023;72(2):338-344. PMID 36604116; doi:10.1136/gutjnl-2022-327736.", "link": "https://doi.org/10.1136/gutjnl-2022-327736", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Morin1997", "text": "Morin PJ, Sparks AB, Korinek V, Barker N, Clevers H, Vogelstein B, et al. Activation of beta-catenin-Tcf signaling in colon cancer by mutations in beta-catenin or APC. Science. 1997;275(5307):1787-90. PMID 9065402; doi:10.1126/science.275.5307.1787.", "link": "https://doi.org/10.1126/science.275.5307.1787", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Morris2015", "text": "Morris EJ, Rutter MD, Finan PJ, Thomas JD, Valori R. Post-colonoscopy colorectal cancer (PCCRC) rates vary considerably depending on the method used to calculate them: a retrospective observational population-based study of PCCRC in the English National Health Service. Gut. 2015;64(8):1248-56. PMID 25416064; PMCID PMC4515989; doi:10.1136/gutjnl-2014-308362.", "link": "https://doi.org/10.1136/gutjnl-2014-308362", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Morris2023", "text": "Morris VK, Kennedy EB, Baxter NN, Benson AB, Cercek A, Cho M, et al. Treatment of Metastatic Colorectal Cancer: ASCO Guideline. J Clin Oncol. 2023;41(3):678-700. PMID 36252154; PMCID PMC10506310; doi:10.1200/JCO.22.01690.", "link": "https://doi.org/10.1200/jco.22.01690", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Morton2023", "text": "Morton D, Seymour M, Magill L, Handley K, Glasbey J, Glimelius B, et al. Preoperative Chemotherapy for Operable Colon Cancer: Mature Results of an International Randomized Controlled Trial. J Clin Oncol. 2023;41(8):1541-1552. PMID 36657089; PMCID PMC10022855; doi:10.1200/jco.22.00046.", "link": "https://doi.org/10.1200/jco.22.00046", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Moss2017", "text": "Moss S, Mathews C, Day TJ, Smith S, Seaman HE, Snowball J, et al. Increased uptake and improved outcomes of bowel cancer screening with a faecal immunochemical test: results from a pilot study within the national screening programme in England. Gut. 2017;66(9):1631-1644. PMID 27267903; doi:10.1136/gutjnl-2015-310691.", "link": "https://doi.org/10.1136/gutjnl-2015-310691", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Movahedi2015", "text": "Movahedi M, Bishop DT, Macrae F, Mecklin JP, Moeslein G, Olschwang S, et al. Obesity, Aspirin, and Risk of Colorectal Cancer in Carriers of Hereditary Colorectal Cancer: A Prospective Investigation in the CAPP2 Study. J Clin Oncol. 2015;33(31):3591-7. PMID 26282643; doi:10.1200/JCO.2014.58.9952.", "link": "https://doi.org/10.1200/jco.2014.58.9952", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Mulder2011", "text": "Mulder SA, Kranse R, Damhuis RA, de Wilt JH, Ouwendijk RJ, Kuipers EJ, et al. Prevalence and prognosis of synchronous colorectal cancer: a Dutch population-based study. Cancer Epidemiol. 2011;35(5):442-7. PMID 21470938; doi:10.1016/j.canep.2010.12.007.", "link": "https://doi.org/10.1016/j.canep.2010.12.007", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Muto1975", "text": "Muto T, Bussey HJ, Morson BC. The evolution of cancer of the colon and rectum. Cancer. 1975;36(6):2251-70. PMID 1203876; doi:10.1002/cncr.2820360944.", "link": "https://doi.org/10.1002/cncr.2820360944", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Nagtegaal2002", "text": "Nagtegaal ID, van de Velde CJ, van der Worp E, Kapiteijn E, Quirke P, van Krieken JH, et al. Macroscopic evaluation of rectal cancer resection specimen: clinical significance of the pathologist in quality control. J Clin Oncol. 2002;20(7):1729-1734. PMID 11919228; doi:10.1200/jco.2002.07.010.", "link": "https://doi.org/10.1200/jco.2002.07.010", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Nagtegaal2008", "text": "Nagtegaal ID, Quirke P. What is the role for the circumferential margin in the modern treatment of rectal cancer? J Clin Oncol. 2008;26(2):303-12. PMID 18182672; doi:10.1200/JCO.2007.12.7027.", "link": "https://doi.org/10.1200/jco.2007.12.7027", "areas": ["E", "F"], "unverified": false, "validated": "PubMed"}, {"key": "Nagtegaal2017", "text": "Nagtegaal ID, Knijn N, Hugen N, Marshall HC, Sugihara K, Tot T, et al. Tumor Deposits in Colorectal Cancer: Improving the Value of Modern Staging-A Systematic Review and Meta-Analysis. J Clin Oncol. 2017;35(10):1119-1127. PMID 28029327; doi:10.1200/JCO.2016.68.9091.", "link": "https://doi.org/10.1200/jco.2016.68.9091", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Nakamura2024", "text": "Nakamura Y, Watanabe J, Akazawa N, Hirata K, Kataoka K, Yokota M, et al. ctDNA-based molecular residual disease and survival in resectable colorectal cancer. Nat Med. 2024;30(11):3272-3283. PMID 39284954; PMCID PMC11564113; doi:10.1038/s41591-024-03254-6.", "link": "https://doi.org/10.1038/s41591-024-03254-6", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "NCT00883792", "text": "The Northern-European Initiative on Colorectal Cancer (NordICC). Oslo University Hospital. Start 2009-05; enrollment 95,000 (actual); status active, not recruiting; primary completion 2026-06.", "link": "", "areas": ["D"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT01239082", "text": "Colonoscopy Versus Fecal Immunochemical Test in Reducing Mortality From Colorectal Cancer (CONFIRM). VA Office of Research and Development. Start 2012-04-30; enrollment 50,126 (actual); active, not recruiting; primary completion 2028-12-01.", "link": "", "areas": ["D"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT02804815", "text": "Add-Aspirin: aspirin after primary therapy in common non-metastatic solid tumours. Phase 3, active not recruiting, estimated enrollment 11,000. ClinicalTrials.gov NCT02804815 (accessed 2026-10-25).", "link": "", "areas": ["G"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT04136002", "text": "Evaluation of the ctDNA LUNAR Test in an Average Patient Screening Episode (ECLIPSE). Guardant Health, Inc. Start 2019-10-08; enrollment 44,467 (actual); primary completion 2024-03-20.", "link": "", "areas": ["D"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT04144738", "text": "Clinical Validation of An Optimized Multi-Target Stool DNA (Mt-sDNA 2.0) Test, for Colorectal Cancer Screening \"BLUE-C\". Exact Sciences Corporation. Start 2019-11-15; enrollment 26,758 (actual); completed; primary completion 2023-03-30.", "link": "", "areas": ["D"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT04165772", "text": "Memorial Sloan Kettering Cancer Center. A Phase II Study of Induction PD-1 Blockade in Subjects With Locally Advanced Mismatch Repair Deficient Solid Tumors. ClinicalTrials.gov NCT04165772; start 2019-12-11; status recruiting; estimated enrollment 212.", "link": "", "areas": ["F"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT05174169", "text": "CIRCULATE-US: Colon adjuvant chemotherapy based on evaluation of residual disease. Phase 2/3, recruiting, estimated enrollment 1912. ClinicalTrials.gov NCT05174169 (accessed 2026-10-25).", "link": "", "areas": ["G"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT05253651", "text": "MOUNTAINEER-03: Tucatinib with trastuzumab and mFOLFOX6 versus standard of care in first-line HER2+ metastatic colorectal cancer. Phase 3, recruiting, estimated enrollment 400. ClinicalTrials.gov NCT05253651 (accessed 2026-10-25).", "link": "", "areas": ["G"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT05379985", "text": "Study of RMC-6236 in patients with advanced solid tumors harboring specific mutations in RAS. Phase 1/2, recruiting, estimated enrollment 754. ClinicalTrials.gov NCT05379985 (accessed 2026-10-25).", "link": "", "areas": ["G"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "Neal2015", "text": "Neal RD, Tharmanathan P, France B, Din NU, Cotton S, Fallon-Ferguson J, et al. Is increased time to diagnosis and treatment in symptomatic cancer associated with poorer outcomes? Systematic review. Br J Cancer. 2015;112 Suppl 1(Suppl 1):S92-107. PMID 25734382; PMCID PMC4385982; doi:10.1038/bjc.2015.48.", "link": "https://doi.org/10.1038/bjc.2015.48", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Nerad2016", "text": "Nerad E, Lahaye MJ, Maas M, Nelemans P, Bakers FC, Beets GL, et al. Diagnostic Accuracy of CT for Local Staging of Colon Cancer: A Systematic Review and Meta-Analysis. AJR Am J Roentgenol. 2016;207(5):984-995. PMID 27490941; doi:10.2214/AJR.15.15785.", "link": "https://doi.org/10.2214/ajr.15.15785", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Nicholson2015", "text": "Nicholson BD, Shinkins B, Pathiraja I, Roberts NW, James TJ, Mallett S, et al. Blood CEA levels for detecting recurrent colorectal cancer. Cochrane Database Syst Rev. 2015;2015(12):CD011134. PMID 26661580; PMCID PMC7092609; doi:10.1002/14651858.CD011134.pub2.", "link": "https://doi.org/10.1002/14651858.cd011134.pub2", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Nicholson2018", "text": "Nicholson AM, Olpe C, Hoyle A, Thorsen AS, Rus T, Colombé M, et al. Fixation and Spread of Somatic Mutations in Adult Human Colonic Epithelium. Cell Stem Cell. 2018;22(6):909-918.e8. PMID 29779891; PMCID PMC5989058; doi:10.1016/j.stem.2018.04.020.", "link": "https://doi.org/10.1016/j.stem.2018.04.020", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Nightingale2022", "text": "Nightingale JMD. How to manage a high-output stoma. Frontline Gastroenterol. 2022;13(2):140-151. PMID 35300464; PMCID PMC8862462; doi:10.1136/flgastro-2018-101108.", "link": "https://doi.org/10.1136/flgastro-2018-101108", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Nishihara2013", "text": "Nishihara R, Wu K, Lochhead P, Morikawa T, Liao X, Qian ZR, et al. Long-term colorectal-cancer incidence and mortality after lower endoscopy. N Engl J Med. 2013;369(12):1095-105. PMID 24047059; PMCID PMC3840160; doi:10.1056/NEJMoa1301969.", "link": "https://doi.org/10.1056/nejmoa1301969", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Nishisho1991", "text": "Nishisho I, Nakamura Y, Miyoshi Y, Miki Y, Ando H, Horii A, et al. Mutations of chromosome 5q21 genes in FAP and colorectal cancer patients. Science. 1991;253(5020):665-9. PMID 1651563; doi:10.1126/science.1651563.", "link": "https://doi.org/10.1126/science.1651563", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Nitsche2013", "text": "Nitsche U, Zimmermann A, Späth C, Müller T, Maak M, Schuster T, et al. Mucinous and signet-ring cell colorectal cancers differ from classical adenocarcinomas in tumor biology and prognosis. Ann Surg. 2013;258(5):775-82; discussion 782-3. PMID 23989057; PMCID PMC3888475; doi:10.1097/SLA.0b013e3182a69f7e.", "link": "https://doi.org/10.1097/sla.0b013e3182a69f7e", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Nordlinger2008", "text": "Nordlinger B, Sorbye H, Glimelius B, Poston GJ, Schlag PM, Rougier P, et al. Perioperative chemotherapy with FOLFOX4 and surgery versus surgery alone for resectable liver metastases from colorectal cancer (EORTC Intergroup trial 40983): a randomised controlled trial. Lancet. 2008;371(9617):1007-16. PMID 18358928; PMCID PMC2277487; doi:10.1016/S0140-6736(08)60455-9.", "link": "https://doi.org/10.1016/s0140-6736(08)60455-9", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Nordlinger2013", "text": "Nordlinger B, Sorbye H, Glimelius B, Poston GJ, Schlag PM, Rougier P, et al. Perioperative FOLFOX4 chemotherapy and surgery versus surgery alone for resectable liver metastases from colorectal cancer (EORTC 40983): long-term results of a randomised, controlled, phase 3 trial. Lancet Oncol. 2013;14(12):1208-15. PMID 24120480; doi:10.1016/S1470-2045(13)70447-9.", "link": "https://doi.org/10.1016/s1470-2045(13)70447-9", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Nougayrede2006", "text": "Nougayrède JP, Homburg S, Taieb F, Boury M, Brzuszkiewicz E, Gottschalk G, et al. Escherichia coli induces DNA double-strand breaks in eukaryotic cells. Science. 2006;313(5788):848-51. PMID 16902142; doi:10.1126/science.1127059.", "link": "https://doi.org/10.1126/science.1127059", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Nozawa2024", "text": "Nozawa H, Sasaki S, Hayashi C, Kawasaki A, Sasaki K, Murono K, et al. Preoperative stoma site marking reduces postoperative stoma-related complications in emergency surgery: A single center retrospective cohort study. Scand J Surg. 2024;113(1):40-49. PMID 37462098; doi:10.1177/14574969231186282.", "link": "https://doi.org/10.1177/14574969231186282", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Nusse2017", "text": "Nusse R, Clevers H. Wnt/β-Catenin Signaling, Disease, and Emerging Therapeutic Modalities. Cell. 2017;169(6):985-999. PMID 28575679; doi:10.1016/j.cell.2017.05.016.", "link": "https://doi.org/10.1016/j.cell.2017.05.016", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "OConnell2004", "text": "O'Connell JB, Maggard MA, Ko CY. Colon cancer survival rates with the new American Joint Committee on Cancer sixth edition staging. J Natl Cancer Inst. 2004;96(19):1420-5. PMID 15467030; doi:10.1093/jnci/djh275.", "link": "https://doi.org/10.1093/jnci/djh275", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Olen2020CD", "text": "Olén O, Erichsen R, Sachs MC, Pedersen L, Halfvarson J, Askling J, et al. Colorectal cancer in Crohn's disease: a Scandinavian population-based cohort study. Lancet Gastroenterol Hepatol. 2020;5(5):475-484. PMID 32066530; doi:10.1016/S2468-1253(20)30005-4.", "link": "https://doi.org/10.1016/s2468-1253(20)30005-4", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Olen2020UC", "text": "Olén O, Erichsen R, Sachs MC, Pedersen L, Halfvarson J, Askling J, et al. Colorectal cancer in ulcerative colitis: a Scandinavian population-based cohort study. Lancet. 2020;395(10218):123-131. PMID 31929014; doi:10.1016/S0140-6736(19)32545-0.", "link": "https://doi.org/10.1016/s0140-6736(19)32545-0", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Omole2025", "text": "Omole AE, Mandiga P, Kahai P, Lobo S. Anatomy, Abdomen and Pelvis: Large Intestine. In: StatPearls [Internet]. Treasure Island (FL): StatPearls Publishing; 2025 (updated 2025 Apr 6). PMID 29261962; NCBI Bookshelf NBK470577.", "link": "https://pubmed.ncbi.nlm.nih.gov/29261962/", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Omole2026a", "text": "Omole AE, Van Fossen K. Anatomy, Abdomen and Pelvis: Inferior Mesenteric Artery. In: StatPearls [Internet]. Treasure Island (FL): StatPearls Publishing; 2026 (updated 2026 Sep 14). PMID 29489246.", "link": "https://pubmed.ncbi.nlm.nih.gov/29489246/", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Omole2026b", "text": "Omole AE, Khorasani-Zadeh A. Anatomy, Abdomen and Pelvis: Superior Mesenteric Artery. In: StatPearls [Internet]. Treasure Island (FL): StatPearls Publishing; 2026 (updated 2026 Sep 14). PMID 30137844.", "link": "https://pubmed.ncbi.nlm.nih.gov/30137844/", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Ozturk2019", "text": "Öztürk E, Kuzu MA, Öztuna D, Işık Ö, Canda AE, Balık E, et al. Fall of another myth for colon cancer: Duration of symptoms does not differ between right- or left-sided colon cancers. Turk J Gastroenterol. 2019;30(8):686-694. PMID 31418412; PMCID PMC6699570; doi:10.5152/tjg.2019.17770.", "link": "https://doi.org/10.5152/tjg.2019.17770", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Pachman2015", "text": "Pachman DR, Qin R, Seisler DK, Smith EM, Beutler AS, Ta LE, et al. Clinical Course of Oxaliplatin-Induced Neuropathy: Results From the Randomized Phase III Trial N08CB (Alliance). J Clin Oncol. 2015;33(30):3416-22. PMID 26282635; PMCID PMC4606060; doi:10.1200/JCO.2014.58.8533.", "link": "https://doi.org/10.1200/jco.2014.58.8533", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Pant2024", "text": "Pant S, Wainberg ZA, Weekes CD, Furqan M, Kasi PM, Devoe CE, et al. Lymph-node-targeted, mKRAS-specific amphiphile vaccine in pancreatic and colorectal cancer: the phase 1 AMPLIFY-201 trial. Nat Med. 2024;30(2):531-542. PMID 38195752; PMCID PMC10878978; doi:10.1038/s41591-023-02760-3.", "link": "https://doi.org/10.1038/s41591-023-02760-3", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Pascual2022", "text": "Pascual J, Attard G, Bidard FC, Curigliano G, De Mattos-Arruda L, Diehn M, et al. ESMO recommendations on the use of circulating tumour DNA assays for patients with cancer: a report from the ESMO Precision Medicine Working Group. Ann Oncol. 2022;33(8):750-768. PMID 35809752; doi:10.1016/j.annonc.2022.05.520.", "link": "https://doi.org/10.1016/j.annonc.2022.05.520", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Patel2022", "text": "Patel SG, May FP, Anderson JC, Burke CA, Dominitz JA, Gross SA, et al. Updates on Age to Start and Stop Colorectal Cancer Screening: Recommendations From the U.S. Multi-Society Task Force on Colorectal Cancer. Gastroenterology. 2022;162(1):285-299. PMID 34794816; doi:10.1053/j.gastro.2021.10.007.", "link": "https://doi.org/10.1053/j.gastro.2021.10.007", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Patel2022EOCRC", "text": "Patel SG, Karlitz JJ, Yen T, Lieu CH, Boland CR. The rising tide of early-onset colorectal cancer: a comprehensive review of epidemiology, clinical features, biology, risk factors, prevention, and early detection. Lancet Gastroenterol Hepatol. 2022;7(3):262-274. PMID 35090605; doi:10.1016/S2468-1253(21)00426-X.", "link": "https://doi.org/10.1016/s2468-1253(21)00426-x", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Pearlman2017", "text": "Pearlman R, Frankel WL, Swanson B, Zhao W, Yilmaz A, Miller K, et al. Prevalence and Spectrum of Germline Cancer Susceptibility Gene Mutations Among Patients With Early-Onset Colorectal Cancer. JAMA Oncol. 2017;3(4):464-471. PMID 27978560; PMCID PMC5564179; doi:10.1001/jamaoncol.2016.5194.", "link": "https://doi.org/10.1001/jamaoncol.2016.5194", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Peltomaki1993", "text": "Peltomäki P, Aaltonen LA, Sistonen P, Pylkkänen L, Mecklin JP, Järvinen H, et al. Genetic mapping of a locus predisposing to human colorectal cancer. Science. 1993;260(5109):810-2. PMID 8484120; doi:10.1126/science.8484120.", "link": "https://doi.org/10.1126/science.8484120", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Peng2019", "text": "Peng YN, Huang ML, Kao CH. Prevalence of Depression and Anxiety in Colorectal Cancer Patients: A Literature Review. Int J Environ Res Public Health. 2019;16(3). PMID 30709020; PMCID PMC6388369; doi:10.3390/ijerph16030411.", "link": "https://doi.org/10.3390/ijerph16030411", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Peng2025", "text": "Peng C, Littman D, Masri L, Sherman S, Makarov DV, Becker DJ. Fertility counseling in early-onset colorectal cancer and the impact of patient characteristics. Support Care Cancer. 2025;33(6):466. PMID 40347312; doi:10.1007/s00520-025-09517-3.", "link": "https://doi.org/10.1007/s00520-025-09517-3", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Petrelli2017", "text": "Petrelli F, Tomasello G, Borgonovo K, Ghidini M, Turati L, Dallera P, et al. Prognostic Survival Associated With Left-Sided vs Right-Sided Colon Cancer: A Systematic Review and Meta-analysis. JAMA Oncol. 2017;3(2):211-219. PMID 27787550; doi:10.1001/jamaoncol.2016.4227.", "link": "https://doi.org/10.1001/jamaoncol.2016.4227", "areas": ["C", "E"], "unverified": false, "validated": "Europe PMC"}, {"key": "Pickhardt2003", "text": "Pickhardt PJ, Choi JR, Hwang I, Butler JA, Puckett ML, Hildebrandt HA, et al. Computed tomographic virtual colonoscopy to screen for colorectal neoplasia in asymptomatic adults. N Engl J Med. 2003;349(23):2191-200. PMID 14657426; doi:10.1056/NEJMoa031618.", "link": "https://doi.org/10.1056/nejmoa031618", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Pietrantonio2017", "text": "Pietrantonio F, Di Nicolantonio F, Schrock AB, Lee J, Tejpar S, Sartore-Bianchi A, et al. ALK, ROS1, and NTRK Rearrangements in Metastatic Colorectal Cancer. J Natl Cancer Inst. 2017;109(12):djx089. PMID 29370427; doi:10.1093/jnci/djx089.", "link": "https://doi.org/10.1093/jnci/djx089", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Pietrantonio2025", "text": "Pietrantonio F, Salvatore L, Esaki T, Modest DP, Lopez-Bravo DP, Taieb J, et al. Overall Survival Analysis of the Phase III CodeBreaK 300 Study of Sotorasib Plus Panitumumab Versus Investigator's Choice in Chemorefractory KRAS G12C Colorectal Cancer. J Clin Oncol. 2025;43(19):2147-2154. PMID 40215429; PMCID PMC12199804; doi:10.1200/JCO-24-02026.", "link": "https://doi.org/10.1200/jco-24-02026", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Pino2010", "text": "Pino MS, Chung DC. The chromosomal instability pathway in colon cancer. Gastroenterology. 2010;138(6):2059-72. PMID 20420946; PMCID PMC4243705; doi:10.1053/j.gastro.2009.12.065.", "link": "https://doi.org/10.1053/j.gastro.2009.12.065", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "PinVieito2022", "text": "Pin-Vieito N, Tejido-Sandoval C, de Vicente-Bielza N, Sánchez-Gómez C, Cubiella J. Faecal immunochemical tests safely enhance rational use of resources during the assessment of suspected symptomatic colorectal cancer in primary care: systematic review and meta-analysis. Gut. 2022;71(5):950-960. PMID 34108236; doi:10.1136/gutjnl-2021-324856.", "link": "https://doi.org/10.1136/gutjnl-2021-324856", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "PleguezuelosManzano2020", "text": "Pleguezuelos-Manzano C, Puschhof J, Rosendahl Huber A, van Hoeck A, Wood HM, Nomburg J, et al. Mutational signature in colorectal cancer caused by genotoxic pks+ E. coli. Nature. 2020;580(7802):269-273. PMID 32106218; PMCID PMC8142898; doi:10.1038/s41586-020-2080-8.", "link": "https://doi.org/10.1038/s41586-020-2080-8", "areas": ["C", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Pooler2023", "text": "Pooler BD, Kim DH, Matkowskyj KA, Newton MA, Halberg RB, Grady WM, et al. Growth rates and histopathological outcomes of small (6-9 mm) colorectal polyps based on CT colonography surveillance and endoscopic removal. Gut. 2023;72(12):2321-2328. PMID 37507217; PMCID PMC10822024; doi:10.1136/gutjnl-2022-326970.", "link": "https://doi.org/10.1136/gutjnl-2022-326970", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Popat2005", "text": "Popat S, Hubner R, Houlston RS. Systematic review of microsatellite instability and colorectal cancer prognosis. J Clin Oncol. 2005;23(3):609-18. PMID 15659508; doi:10.1200/JCO.2005.01.086.", "link": "https://doi.org/10.1200/jco.2005.01.086", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Powell1992", "text": "Powell SM, Zilz N, Beazer-Barclay Y, Bryan TM, Hamilton SR, Thibodeau SN, et al. APC mutations occur early during colorectal tumorigenesis. Nature. 1992;359(6392):235-7. PMID 1528264; doi:10.1038/359235a0.", "link": "https://doi.org/10.1038/359235a0", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Prager2023", "text": "Prager GW, Taieb J, Fakih M, Ciardiello F, Van Cutsem E, Elez E, et al. Trifluridine-Tipiracil and Bevacizumab in Refractory Metastatic Colorectal Cancer. N Engl J Med. 2023;388(18):1657-1667. PMID 37133585; doi:10.1056/NEJMoa2214963.", "link": "https://doi.org/10.1056/nejmoa2214963", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Primrose2014", "text": "Primrose JN, Perera R, Gray A, Rose P, Fuller A, Corkhill A, et al. Effect of 3 to 5 years of scheduled CEA and CT follow-up to detect recurrence of colorectal cancer: the FACS randomized clinical trial. JAMA. 2014;311(3):263-70. PMID 24430319; doi:10.1001/jama.2013.285718.", "link": "https://doi.org/10.1001/jama.2013.285718", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Qaseem2023", "text": "Qaseem A, Harrod CS, Crandall CJ, Wilt TJ, Clinical Guidelines Committee of the American College of Physicians, et al. Screening for Colorectal Cancer in Asymptomatic Average-Risk Adults: A Guidance Statement From the American College of Physicians (Version 2). Ann Intern Med. 2023;176(8):1092-1100. PMID 37523709; doi:10.7326/M23-0779.", "link": "https://doi.org/10.7326/m23-0779", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "QUASAR2007", "text": "Quasar Collaborative Group, Gray R, Barnwell J, McConkey C, Hills RK, Williams NS, et al. Adjuvant chemotherapy versus observation in patients with colorectal cancer: a randomised study. Lancet. 2007;370(9604):2020-2029. PMID 18083404; doi:10.1016/s0140-6736(07)61866-2.", "link": "https://doi.org/10.1016/s0140-6736(07)61866-2", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Quenet2021", "text": "Quénet F, Elias D, Roca L, Goéré D, Ghouti L, Pocard M, et al. Cytoreductive surgery plus hyperthermic intraperitoneal chemotherapy versus cytoreductive surgery alone for colorectal peritoneal metastases (PRODIGE 7): a multicentre, randomised, open-label, phase 3 trial. Lancet Oncol. 2021;22(2):256-266. PMID 33476595; doi:10.1016/S1470-2045(20)30599-4.", "link": "https://doi.org/10.1016/s1470-2045(20)30599-4", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Quintero2012", "text": "Quintero E, Castells A, Bujanda L, Cubiella J, Salas D, Lanas Á, et al. Colonoscopy versus fecal immunochemical testing in colorectal-cancer screening. N Engl J Med. 2012;366(8):697-706. PMID 22356323; doi:10.1056/NEJMoa1108895.", "link": "https://doi.org/10.1056/nejmoa1108895", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Quirke1986", "text": "Quirke P, Durdey P, Dixon MF, Williams NS. Local recurrence of rectal adenocarcinoma due to inadequate surgical resection. Histopathological study of lateral tumour spread and surgical excision. Lancet. 1986;2(8514):996-999. PMID 2430152; doi:10.1016/s0140-6736(86)92612-7.", "link": "https://doi.org/10.1016/s0140-6736(86)92612-7", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Radaelli2017", "text": "Radaelli F, Paggi S, Hassan C, Senore C, Fasoli R, Anderloni A, et al. Split-dose preparation for colonoscopy increases adenoma detection rate: a randomised controlled trial in an organised screening programme. Gut. 2017;66(2):270-277. PMID 26657900; doi:10.1136/gutjnl-2015-310685.", "link": "https://doi.org/10.1136/gutjnl-2015-310685", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Raghav2024", "text": "Raghav K, Siena S, Takashima A, Kato T, Van den Eynde M, Pietrantonio F, et al. Trastuzumab deruxtecan in patients with HER2-positive advanced colorectal cancer (DESTINY-CRC02): primary results from a multicentre, randomised, phase 2 trial. Lancet Oncol. 2024;25(9):1147-1162. PMID 39116902; doi:10.1016/S1470-2045(24)00380-2.", "link": "https://doi.org/10.1016/s1470-2045(24)00380-2", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Rahib2021", "text": "Rahib L, Wehner MR, Matrisian LM, Nead KT. Estimated Projection of US Cancer Incidence and Death to 2040. JAMA Netw Open. 2021;4(4):e214708. PMID 33825840; PMCID PMC8027914; doi:10.1001/jamanetworkopen.2021.4708.", "link": "https://doi.org/10.1001/jamanetworkopen.2021.4708", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Reinert2019", "text": "Reinert T, Henriksen TV, Christensen E, Sharma S, Salari R, Sethi H, et al. Analysis of Plasma Cell-Free DNA by Ultradeep Sequencing in Patients With Stages I to III Colorectal Cancer. JAMA Oncol. 2019;5(8):1124-1131. PMID 31070691; PMCID PMC6512280; doi:10.1001/jamaoncol.2019.0528.", "link": "https://doi.org/10.1001/jamaoncol.2019.0528", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Reumkens2016", "text": "Reumkens A, Rondagh EJ, Bakker CM, Winkens B, Masclee AA, Sanduleanu S. Post-Colonoscopy Complications: A Systematic Review, Time Trends, and Meta-Analysis of Population-Based Studies. Am J Gastroenterol. 2016;111(8):1092-101. PMID 27296945; doi:10.1038/ajg.2016.234.", "link": "https://doi.org/10.1038/ajg.2016.234", "areas": ["D", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Rex2017", "text": "Rex DK, Boland CR, Dominitz JA, Giardiello FM, Johnson DA, Kaltenbach T, et al. Colorectal Cancer Screening: Recommendations for Physicians and Patients From the U.S. Multi-Society Task Force on Colorectal Cancer. Gastroenterology. 2017;153(1):307-323. PMID 28600072; doi:10.1053/j.gastro.2017.05.013.", "link": "https://doi.org/10.1053/j.gastro.2017.05.013", "areas": ["B", "D"], "unverified": false, "validated": "PubMed"}, {"key": "Rex2024", "text": "Rex DK, Anderson JC, Butterly LF, Day LW, Dominitz JA, Kaltenbach T, et al. Quality Indicators for Colonoscopy. Am J Gastroenterol. 2024;119(9):1754-1780. PMID 39167112; PMCID PMC13489032; doi:10.14309/ajg.0000000000002972. Targets read from PMC full text.", "link": "https://doi.org/10.14309/ajg.0000000000002972", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Rex2026SPS", "text": "Rex DK, Anderson JC, Burke CA, Jacobson BC, May FP, Patel SG, et al. Serrated Polyposis Syndrome: A Review and Consensus Statement by the US Multi-Society Task Force on Colorectal Cancer. Gastroenterology. 2026 (online ahead of print). PMID 42814045; doi:10.1053/j.gastro.2026.09.001.", "link": "https://doi.org/10.1053/j.gastro.2026.09.001", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Ribic2003", "text": "Ribic CM, Sargent DJ, Moore MJ, Thibodeau SN, French AJ, Goldberg RM, et al. Tumor microsatellite-instability status as a predictor of benefit from fluorouracil-based adjuvant chemotherapy for colon cancer. N Engl J Med. 2003;349(3):247-57. PMID 12867608; PMCID PMC3584639; doi:10.1056/NEJMoa022289.", "link": "https://doi.org/10.1056/nejmoa022289", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Riihimaki2016", "text": "Riihimäki M, Hemminki A, Sundquist J, Hemminki K. Patterns of metastasis in colon and rectal cancer. Sci Rep. 2016;6:29765. PMID 27416752; PMCID PMC4945942; doi:10.1038/srep29765.", "link": "https://doi.org/10.1038/srep29765", "areas": ["C", "G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Robertson2023", "text": "Robertson DJ, Dominitz JA, Beed A, Boardman KD, Del Curto BJ, Guarino PD, et al. Baseline Features and Reasons for Nonparticipation in the Colonoscopy Versus Fecal Immunochemical Test in Reducing Mortality From Colorectal Cancer (CONFIRM) Study, a Colorectal Cancer Screening Trial. JAMA Netw Open. 2023;6(7):e2321730. PMID 37432690; PMCID PMC10336619; doi:10.1001/jamanetworkopen.2023.21730.", "link": "https://doi.org/10.1001/jamanetworkopen.2023.21730", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Rock2022", "text": "Rock CL, Thomson CA, Sullivan KR, Howe CL, Kushi LH, Caan BJ, et al. American Cancer Society nutrition and physical activity guideline for cancer survivors. CA Cancer J Clin. 2022;72(3):230-262. PMID 35294043; doi:10.3322/caac.21719.", "link": "https://doi.org/10.3322/caac.21719", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Roos2019", "text": "Roos VH, Mangas-Sanjuan C, Rodriguez-Girondo M, Medina-Prado L, Steyerberg EW, Bossuyt PMM, et al. Effects of Family History on Relative and Absolute Risks for Colorectal Cancer: A Systematic Review and Meta-Analysis. Clin Gastroenterol Hepatol. 2019;17(13):2657-2667.e9. PMID 31525516; doi:10.1016/j.cgh.2019.09.007.", "link": "https://doi.org/10.1016/j.cgh.2019.09.007", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Rosati2016", "text": "Rosati G, Ambrosini G, Barni S, Andreoni B, Corradini G, Luchena G, et al. A randomized trial of intensive versus minimal surveillance of patients with resected Dukes B2-C colorectal carcinoma. Ann Oncol. 2016;27(2):274-80. PMID 26578734; doi:10.1093/annonc/mdv541.", "link": "https://doi.org/10.1093/annonc/mdv541", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Roth2010", "text": "Roth AD, Tejpar S, Delorenzi M, Yan P, Fiocca R, Klingbiel D, et al. Prognostic role of KRAS and BRAF in stage II and III resected colon cancer: results of the translational study on the PETACC-3, EORTC 40993, SAKK 60-00 trial. J Clin Oncol. 2010;28(3):466-74. PMID 20008640; doi:10.1200/JCO.2009.23.3452.", "link": "https://doi.org/10.1200/jco.2009.23.3452", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Rothwell2010", "text": "Rothwell PM, Wilson M, Elwin CE, Norrving B, Algra A, Warlow CP, et al. Long-term effect of aspirin on colorectal cancer incidence and mortality: 20-year follow-up of five randomised trials. Lancet. 2010;376(9754):1741-50. PMID 20970847; doi:10.1016/S0140-6736(10)61543-7.", "link": "https://doi.org/10.1016/s0140-6736(10)61543-7", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Rothwell2011", "text": "Rothwell PM, Fowkes FG, Belch JF, Ogawa H, Warlow CP, Meade TW. Effect of daily aspirin on long-term risk of death due to cancer: analysis of individual patient data from randomised trials. Lancet. 2011;377(9759):31-41. PMID 21144578; doi:10.1016/S0140-6736(10)62110-1.", "link": "https://doi.org/10.1016/s0140-6736(10)62110-1", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Rothwell2012", "text": "Rothwell PM, Price JF, Fowkes FG, Zanchetti A, Roncaglioni MC, Tognoni G, et al. Short-term effects of daily aspirin on cancer incidence, mortality, and non-vascular death: analysis of the time course of risks and benefits in 51 randomised controlled trials. Lancet. 2012;379(9826):1602-12. PMID 22440946; doi:10.1016/S0140-6736(11)61720-0.", "link": "https://doi.org/10.1016/s0140-6736(11)61720-0", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Ruers2017", "text": "Ruers T, Van Coevorden F, Punt CJ, Pierie JE, Borel-Rinkes I, Ledermann JA, et al. Local Treatment of Unresectable Colorectal Liver Metastases: Results of a Randomized Phase II Trial. J Natl Cancer Inst. 2017;109(9):djx015. PMID 28376151; PMCID PMC5408999; doi:10.1093/jnci/djx015.", "link": "https://doi.org/10.1093/jnci/djx015", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Rutter2018", "text": "Rutter MD, Beintaris I, Valori R, Chiu HM, Corley DA, Cuatrecasas M, et al. World Endoscopy Organization Consensus Statements on Post-Colonoscopy and Post-Imaging Colorectal Cancer. Gastroenterology. 2018;155(3):909-925.e3. PMID 29958856; doi:10.1053/j.gastro.2018.05.038.", "link": "https://doi.org/10.1053/j.gastro.2018.05.038", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Sakakida2026", "text": "Sakakida T, Taniguchi H, Asayama M, Suwa Y, Shimura T, Mitani S, et al. 14-day versus 28-day trifluridine-tipiracil plus bevacizumab for refractory metastatic colorectal cancer (PRABITAS): a pragmatic, multicentre, open-label, randomised, phase 3, non-inferiority trial in Japan. Lancet. 2026 (online ahead of print). PMID 42925880; doi:10.1016/S0140-6736(26)01782-4.", "link": "https://doi.org/10.1016/s0140-6736(26)01782-4", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Salvadalena2015", "text": "Salvadalena G, Hendren S, McKenna L, Muldoon R, Netsch D, Paquette I, et al. WOCN Society and ASCRS Position Statement on Preoperative Stoma Site Marking for Patients Undergoing Colostomy or Ileostomy Surgery. J Wound Ostomy Continence Nurs. 2015;42(3):249-52. PMID 25695929; doi:10.1097/WON.0000000000000119.", "link": "https://doi.org/10.1097/won.0000000000000119", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Sargent2005", "text": "Sargent DJ, Wieand HS, Haller DG, Gray R, Benedetti JK, Buyse M, et al. Disease-free survival versus overall survival as a primary end point for adjuvant colon cancer studies: individual patient data from 20,898 patients on 18 randomized trials. J Clin Oncol. 2005;23(34):8664-70. PMID 16260700; doi:10.1200/JCO.2005.01.6071.", "link": "https://doi.org/10.1200/jco.2005.01.6071", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Sargent2010", "text": "Sargent DJ, Marsoni S, Monges G, Thibodeau SN, Labianca R, Hamilton SR, et al. Defective mismatch repair as a predictive marker for lack of efficacy of fluorouracil-based adjuvant therapy in colon cancer. J Clin Oncol. 2010;28(20):3219-26. PMID 20498393; PMCID PMC2903323; doi:10.1200/JCO.2009.27.1825.", "link": "https://doi.org/10.1200/jco.2009.27.1825", "areas": ["E", "F"], "unverified": false, "validated": "PubMed"}, {"key": "SartoreBianchi2016", "text": "Sartore-Bianchi A, Trusolino L, Martino C, Bencardino K, Lonardi S, Bergamo F, et al. Dual-targeted therapy with trastuzumab and lapatinib in treatment-refractory, KRAS codon 12/13 wild-type, HER2-positive metastatic colorectal cancer (HERACLES): a proof-of-concept, multicentre, open-label, phase 2 trial. Lancet Oncol. 2016;17(6):738-746. PMID 27108243; doi:10.1016/S1470-2045(16)00150-9.", "link": "https://doi.org/10.1016/s1470-2045(16)00150-9", "areas": ["E", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Sasaki2016", "text": "Sasaki N, Sachs N, Wiebrands K, Ellenbroek SI, Fumagalli A, Lyubimova A, et al. Reg4+ deep crypt secretory cells function as epithelial niche for Lgr5+ stem cells in colon. Proc Natl Acad Sci U S A. 2016;113(37):E5399-407. PMID 27573849; PMCID PMC5027439; doi:10.1073/pnas.1607327113.", "link": "https://doi.org/10.1073/pnas.1607327113", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Sato2011", "text": "Sato T, van Es JH, Snippert HJ, Stange DE, Vries RG, van den Born M, et al. Paneth cells constitute the niche for Lgr5 stem cells in intestinal crypts. Nature. 2011;469(7330):415-8. PMID 21113151; PMCID PMC3547360; doi:10.1038/nature09637.", "link": "https://doi.org/10.1038/nature09637", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Sauer2004", "text": "Sauer R, Becker H, Hohenberger W, Rödel C, Wittekind C, Fietkau R, et al. Preoperative versus postoperative chemoradiotherapy for rectal cancer. N Engl J Med. 2004;351(17):1731-1740. PMID 15496622; doi:10.1056/nejmoa040694.", "link": "https://doi.org/10.1056/nejmoa040694", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Sauer2012", "text": "Sauer R, Liersch T, Merkel S, Fietkau R, Hohenberger W, Hess C, et al. Preoperative versus postoperative chemoradiotherapy for locally advanced rectal cancer: results of the German CAO/ARO/AIO-94 randomized phase III trial after a median follow-up of 11 years. J Clin Oncol. 2012;30(16):1926-1933. PMID 22529255; doi:10.1200/jco.2011.40.1836.", "link": "https://doi.org/10.1200/jco.2011.40.1836", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Savitch2024", "text": "Savitch SL, Marzoughi M, Suwanabol PA. Fertility Concerns Related to Surgery for Colorectal Cancer: An Under-Discussed Topic. Cancers (Basel). 2024;16(19). PMID 39409996; PMCID PMC11475783; doi:10.3390/cancers16193376.", "link": "https://doi.org/10.3390/cancers16193376", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Schmoll2015", "text": "Schmoll HJ, Tabernero J, Maroun J, de Braud F, Price T, Van Cutsem E, et al. Capecitabine Plus Oxaliplatin Compared With Fluorouracil/Folinic Acid As Adjuvant Therapy for Stage III Colon Cancer: Final Results of the NO16968 Randomized Controlled Phase III Trial. J Clin Oncol. 2015;33(32):3733-3740. PMID 26324362; doi:10.1200/jco.2015.60.9107.", "link": "https://doi.org/10.1200/jco.2015.60.9107", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Schoen2012", "text": "Schoen RE, Pinsky PF, Weissfeld JL, Yokochi LA, Church T, Laiyemo AO, et al. Colorectal-cancer incidence and mortality with screening flexible sigmoidoscopy. N Engl J Med. 2012;366(25):2345-57. PMID 22612596; PMCID PMC3641846; doi:10.1056/NEJMoa1114635.", "link": "https://doi.org/10.1056/nejmoa1114635", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Schoen2015", "text": "Schoen RE, Razzak A, Yu KJ, Berndt SI, Firl K, Riley TL, et al. Incidence and mortality of colorectal cancer in individuals with a family history of colorectal cancer. Gastroenterology. 2015;149(6):1438-1445.e1. PMID 26255045; PMCID PMC4628587; doi:10.1053/j.gastro.2015.07.055.", "link": "https://doi.org/10.1053/j.gastro.2015.07.055", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Scholefield2012", "text": "Scholefield JH, Moss SM, Mangham CM, Whynes DK, Hardcastle JD. Nottingham trial of faecal occult blood testing for colorectal cancer: a 20-year follow-up. Gut. 2012;61(7):1036-40. PMID 22052062; doi:10.1136/gutjnl-2011-300774.", "link": "https://doi.org/10.1136/gutjnl-2011-300774", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Schrag2023", "text": "Schrag D, Shi Q, Weiser MR, Gollub MJ, Saltz LB, Musher BL, et al. Preoperative Treatment of Locally Advanced Rectal Cancer. N Engl J Med. 2023;389(4):322-334. PMID 37272534; PMCID PMC10775881; doi:10.1056/nejmoa2303269.", "link": "https://doi.org/10.1056/nejmoa2303269", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Schreuders2019", "text": "Schreuders EH, Grobbee EJ, Nieuwenburg SAV, Kapidzic A, van Roon AHC, van Vuuren AJ, et al. Multiple rounds of one sample versus two sample faecal immunochemical test-based colorectal cancer screening: a population-based study. Lancet Gastroenterol Hepatol. 2019;4(8):622-631. PMID 31196734; doi:10.1016/S2468-1253(19)30176-1.", "link": "https://doi.org/10.1016/s2468-1253(19)30176-1", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Segelman2012", "text": "Segelman J, Granath F, Holm T, Machado M, Mahteme H, Martling A. Incidence, prevalence and risk factors for peritoneal carcinomatosis from colorectal cancer. Br J Surg. 2012;99(5):699-705. PMID 22287157; doi:10.1002/bjs.8679.", "link": "https://doi.org/10.1002/bjs.8679", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Selby2019", "text": "Selby K, Levine EH, Doan C, Gies A, Brenner H, Quesenberry C, et al. Effect of Sex, Age, and Positivity Threshold on Fecal Immunochemical Test Accuracy: A Systematic Review and Meta-analysis. Gastroenterology. 2019;157(6):1494-1505. PMID 31472152; PMCID PMC6878177; doi:10.1053/j.gastro.2019.08.023.", "link": "https://doi.org/10.1053/j.gastro.2019.08.023", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Seppala2021", "text": "Seppälä TT, Latchford A, Negoi I, Sampaio Soares A, Jimenez-Rodriguez R, Sánchez-Guillén L, et al. European guidelines from the EHTG and ESCP for Lynch syndrome: an updated third edition of the Mallorca guidelines based on gene and gender. Br J Surg. 2021;108(5):484-498. PMID 34043773; PMCID PMC10364896; doi:10.1002/bjs.11902.", "link": "https://doi.org/10.1002/bjs.11902", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Sepulveda2017", "text": "Sepulveda AR, Hamilton SR, Allegra CJ, Grody W, Cushman-Vokoun AM, Funkhouser WK, et al. Molecular Biomarkers for the Evaluation of Colorectal Cancer: Guideline From the American Society for Clinical Pathology, College of American Pathologists, Association for Molecular Pathology, and the American Society of Clinical Oncology. J Clin Oncol. 2017;35(13):1453-1486. PMID 28165299; doi:10.1200/JCO.2016.71.9807. Statements and frequencies read from the simultaneously published open-access version, Am J Clin Pathol 2017;147(3):221-260 (PMID 28165529; PMCID PMC7263311).", "link": "https://doi.org/10.1200/jco.2016.71.9807", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Shao2026", "text": "Shao X, Ma Y, Wang Y, Lin X, Wang X, Zheng A. Prevalence and determinants of financial toxicity in patients with colorectal cancer: a systematic review and meta-analysis. Int J Equity Health. 2026;25(1). PMID 41721326; PMCID PMC13032382; doi:10.1186/s12939-026-02794-2.", "link": "https://doi.org/10.1186/s12939-026-02794-2", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Shaukat2013", "text": "Shaukat A, Mongin SJ, Geisser MS, Lederle FA, Bond JH, Mandel JS, et al. Long-term mortality after screening for colorectal cancer. N Engl J Med. 2013;369(12):1106-14. PMID 24047060; doi:10.1056/NEJMoa1300720.", "link": "https://doi.org/10.1056/nejmoa1300720", "areas": ["A", "D"], "unverified": false, "validated": "PubMed"}, {"key": "Shaukat2015", "text": "Shaukat A, Rector TS, Church TR, Lederle FA, Kim AS, Rank JM, et al. Longer Withdrawal Time Is Associated With a Reduced Incidence of Interval Cancer After Screening Colonoscopy. Gastroenterology. 2015;149(4):952-7. PMID 26164494; doi:10.1053/j.gastro.2015.06.044.", "link": "https://doi.org/10.1053/j.gastro.2015.06.044", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Shi2025", "text": "Shi V, McKechnie T, Anant S, Pedroso CM, Ahmed M, Patel J, et al. The impact of preoperative stoma education on postoperative outcomes for patients with new stomas after colorectal surgery: a systematic review and meta-analysis. Tech Coloproctol. 2025;29(1):183. PMID 41105284; PMCID PMC12534360; doi:10.1007/s10151-025-03213-4.", "link": "https://doi.org/10.1007/s10151-025-03213-4", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Siegel2017", "text": "Siegel RL, Fedewa SA, Anderson WF, Miller KD, Ma J, Rosenberg PS, et al. Colorectal Cancer Incidence Patterns in the United States, 1974-2013. J Natl Cancer Inst. 2017;109(8):djw322. PMID 28376186; PMCID PMC6059239; doi:10.1093/jnci/djw322.", "link": "https://doi.org/10.1093/jnci/djw322", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Siegel2019", "text": "Siegel RL, Torre LA, Soerjomataram I, Hayes RB, Bray F, Weber TK, et al. Global patterns and trends in colorectal cancer incidence in young adults. Gut. 2019;68(12):2179-2185. PMID 31488504; doi:10.1136/gutjnl-2019-319511.", "link": "https://doi.org/10.1136/gutjnl-2019-319511", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Siegel2023CRC", "text": "Siegel RL, Wagle NS, Cercek A, Smith RA, Jemal A. Colorectal cancer statistics, 2023. CA Cancer J Clin. 2023;73(3):233-254. PMID 36856579; doi:10.3322/caac.21772.", "link": "https://doi.org/10.3322/caac.21772", "areas": ["A", "B", "C", "D", "E", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Siegel2024", "text": "Siegel RL, Giaquinto AN, Jemal A. Cancer statistics, 2024. CA Cancer J Clin. 2024;74(1):12-49. PMID 38230766; doi:10.3322/caac.21820.", "link": "https://doi.org/10.3322/caac.21820", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Siegel2025", "text": "Siegel RL, Kratzer TB, Giaquinto AN, Sung H, Jemal A. Cancer statistics, 2025. CA Cancer J Clin. 2025;75(1):10-45. PMID 39817679; PMCID PMC11745215; doi:10.3322/caac.21871.", "link": "https://doi.org/10.3322/caac.21871", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Siegel2026", "text": "Siegel RL, Kratzer TB, Wagle NS, Sung H, Jemal A. Cancer statistics, 2026. CA Cancer J Clin. 2026;76(1):e70043. PMID 41528114; PMCID PMC12798275; doi:10.3322/caac.70043.", "link": "https://doi.org/10.3322/caac.70043", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Siegel2026CRC", "text": "Siegel RL, Wagle NS, Star J, Kratzer TB, Smith RA, Jemal A. Colorectal cancer statistics, 2026. CA Cancer J Clin. 2026;76(2):e70067. PMID 41769777; PMCID PMC12951547; doi:10.3322/caac.70067.", "link": "https://doi.org/10.3322/caac.70067", "areas": ["A", "E"], "unverified": false, "validated": "PubMed"}, {"key": "Siena2021", "text": "Siena S, Di Bartolomeo M, Raghav K, Masuishi T, Loupakis F, Kawakami H, et al. Trastuzumab deruxtecan (DS-8201) in patients with HER2-expressing metastatic colorectal cancer (DESTINY-CRC01): a multicentre, open-label, phase 2 trial. Lancet Oncol. 2021;22(6):779-789. PMID 33961795; doi:10.1016/S1470-2045(21)00086-3.", "link": "https://doi.org/10.1016/s1470-2045(21)00086-3", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Singal2017", "text": "Singal AG, Gupta S, Skinner CS, Ahn C, Santini NO, Agrawal D, et al. Effect of Colonoscopy Outreach vs Fecal Immunochemical Test Outreach on Colorectal Cancer Screening Completion: A Randomized Clinical Trial. JAMA. 2017;318(9):806-815. PMID 28873161; PMCID PMC5648645; doi:10.1001/jama.2017.11389.", "link": "https://doi.org/10.1001/jama.2017.11389", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Sinicrope2026", "text": "Sinicrope FA, Ou FS, Arnold D, Peters WR, Behrens RJ, Lieu CH, et al. Atezolizumab plus FOLFOX for Stage III Mismatch Repair-Deficient Colon Cancer. N Engl J Med. 2026;394(12):1155-1166. PMID 41880612; PMCID PMC13020640; doi:10.1056/nejmoa2507874.", "link": "https://doi.org/10.1056/nejmoa2507874", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Smith2008", "text": "Smith NJ, Barbachano Y, Norman AR, Swift RI, Abulafi AM, Brown G. Prognostic significance of magnetic resonance imaging-detected extramural vascular invasion in rectal cancer. Br J Surg. 2008;95(2):229-36. PMID 17932879; doi:10.1002/bjs.5917.", "link": "https://doi.org/10.1002/bjs.5917", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Smith2013", "text": "Smith EM, Pang H, Cirrincione C, Fleishman S, Paskett ED, Ahles T, et al. Effect of duloxetine on pain, function, and quality of life among patients with chemotherapy-induced painful peripheral neuropathy: a randomized clinical trial. JAMA. 2013;309(13):1359-67. PMID 23549581; PMCID PMC3912515; doi:10.1001/jama.2013.2813.", "link": "https://doi.org/10.1001/jama.2013.2813", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Snover2011", "text": "Snover DC. Update on the serrated pathway to colorectal carcinoma. Hum Pathol. 2011;42(1):1-10. PMID 20869746; doi:10.1016/j.humpath.2010.06.002.", "link": "https://doi.org/10.1016/j.humpath.2010.06.002", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Soff2026", "text": "Soff J, Demirer I, Sibert NT, Breidenbach C, Ernstmann N, Heidkamp P, et al. Social inequalities in return-to-work among colorectal cancer survivors in Germany. Support Care Cancer. 2026;34(7). PMID 42283908; PMCID PMC13263287; doi:10.1007/s00520-026-10827-3.", "link": "https://doi.org/10.1007/s00520-026-10827-3", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Soleymanjahi2024", "text": "Soleymanjahi S, Huebner J, Elmansy L, Rajashekar N, Lüdtke N, Paracha R, et al. Artificial Intelligence-Assisted Colonoscopy for Polyp Detection: A Systematic Review and Meta-analysis. Ann Intern Med. 2024;177(12):1652-1663. PMID 39531400; doi:10.7326/ANNALS-24-00981.", "link": "https://doi.org/10.7326/annals-24-00981", "areas": ["G"], "unverified": false, "validated": "Europe PMC"}, {"key": "Solomon2020", "text": "Solomon JP, Linkov I, Rosado A, Mullaney K, Rosen EY, Frosina D, et al. NTRK fusion detection across multiple assays and 33,997 cases: diagnostic implications and pitfalls. Mod Pathol. 2020;33(1):38-46. PMID 31375766; PMCID PMC7437403; doi:10.1038/s41379-019-0324-7.", "link": "https://doi.org/10.1038/s41379-019-0324-7", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Song2026", "text": "Song JQ, Li KX, Sun Z, Li HB, Zhang HQ, Wu B, et al. [Clinical utility of the newly revised AJCC 9th edition colon cancer staging: a single-center retrospective study]. Zhonghua Wei Chang Wai Ke Za Zhi. 2026;29(3):338-346. PMID 41856645; doi:10.3760/cma.j.cn441530-20250926-00361.", "link": "https://doi.org/10.3760/cma.j.cn441530-20250926-00361", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Sottoriva2015", "text": "Sottoriva A, Kang H, Ma Z, Graham TA, Salomon MP, Zhao J, et al. A Big Bang model of human colorectal tumor growth. Nat Genet. 2015;47(3):209-16. PMID 25665006; PMCID PMC4575589; doi:10.1038/ng.3214.", "link": "https://doi.org/10.1038/ng.3214", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Spada2020", "text": "Spada C, Hassan C, Bellini D, Burling D, Cappello G, Carretero C, et al. Imaging alternatives to colonoscopy: CT colonography and colon capsule. European Society of Gastrointestinal Endoscopy (ESGE) and European Society of Gastrointestinal and Abdominal Radiology (ESGAR) Guideline - Update 2020. Endoscopy. 2020;52(12):1127-1141. PMID 33105507; doi:10.1055/a-1258-4819.", "link": "https://doi.org/10.1055/a-1258-4819", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Spring2025", "text": "Spring A, Calegari MA, Valente G, Caira G, Barone D, Schietroma F, et al. Fertility and sexuality in early-onset colorectal cancer patients: a monocentric survey. ESMO Gastrointest Oncol. 2025;9:100213. PMID 41647995; PMCID PMC12836514; doi:10.1016/j.esmogo.2025.100213.", "link": "https://doi.org/10.1016/j.esmogo.2025.100213", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "SRCT1997", "text": "Swedish Rectal Cancer Trial, Cedermark B, Dahlberg M, Glimelius B, Påhlman L, Rutqvist LE, et al. Improved survival with preoperative radiotherapy in resectable rectal cancer. N Engl J Med. 1997;336(14):980-987. PMID 9091798; doi:10.1056/nejm199704033361402.", "link": "https://doi.org/10.1056/nejm199704033361402", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Stamos2013", "text": "Stamos JL, Weis WI. The β-catenin destruction complex. Cold Spring Harb Perspect Biol. 2013;5(1):a007898. PMID 23169527; PMCID PMC3579403; doi:10.1101/cshperspect.a007898.", "link": "https://doi.org/10.1101/cshperspect.a007898", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Stapley2006", "text": "Stapley S, Peters TJ, Sharp D, Hamilton W. The mortality of colorectal cancer in relation to the initial symptom at presentation to primary care and to the duration of symptoms: a cohort study using medical records. Br J Cancer. 2006;95(10):1321-5. PMID 17060933; PMCID PMC2360591; doi:10.1038/sj.bjc.6603439.", "link": "https://doi.org/10.1038/sj.bjc.6603439", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Stevenson2015", "text": "Stevenson AR, Solomon MJ, Lumley JW, Hewett P, Clouston AD, Gebski VJ, et al. Effect of Laparoscopic-Assisted Resection vs Open Resection on Pathological Outcomes in Rectal Cancer: The ALaCaRT Randomized Clinical Trial. JAMA. 2015;314(13):1356-1363. PMID 26441180; doi:10.1001/jama.2015.12009.", "link": "https://doi.org/10.1001/jama.2015.12009", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Stokes2017", "text": "Stokes AL, Tice S, Follett S, Paskey D, Abraham L, Bealer C, et al. Institution of a Preoperative Stoma Education Group Class Decreases Rate of Peristomal Complications in New Stoma Patients. J Wound Ostomy Continence Nurs. 2017;44(4):363-367. PMID 28549049; doi:10.1097/WON.0000000000000338.", "link": "https://doi.org/10.1097/won.0000000000000338", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Strickler2023", "text": "Strickler JH, Cercek A, Siena S, André T, Ng K, Van Cutsem E, et al. Tucatinib plus trastuzumab for chemotherapy-refractory, HER2-positive, RAS wild-type unresectable or metastatic colorectal cancer (MOUNTAINEER): a multicentre, open-label, phase 2 study. Lancet Oncol. 2023;24(5):496-508. PMID 37142372; doi:10.1016/S1470-2045(23)00150-X.", "link": "https://doi.org/10.1016/s1470-2045(23)00150-x", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Strickler2026", "text": "Strickler JH, Cercek A, Siena S, André T, Ng K, Van Cutsem E, et al. Tucatinib plus trastuzumab for chemotherapy-refractory, HER2+, RAS wild-type metastatic colorectal cancer (MOUNTAINEER): final analysis. Nat Commun. 2026;17(1):1068. PMID 41526345; PMCID PMC12852713; doi:10.1038/s41467-025-67824-z.", "link": "https://doi.org/10.1038/s41467-025-67824-z", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Stryker1987", "text": "Stryker SJ, Wolff BG, Culp CE, Libbe SD, Ilstrup DM, MacCarty RL. Natural history of untreated colonic polyps. Gastroenterology. 1987;93(5):1009-13. PMID 3653628; doi:10.1016/0016-5085(87)90563-4.", "link": "https://doi.org/10.1016/0016-5085(87)90563-4", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Sulz2016", "text": "Sulz MC, Kröger A, Prakash M, Manser CN, Heinrich H, Misselwitz B. Meta-Analysis of the Effect of Bowel Preparation on Adenoma Detection: Early Adenomas Affected Stronger than Advanced Adenomas. PLoS One. 2016;11(6):e0154149. PMID 27257916; PMCID PMC4892520; doi:10.1371/journal.pone.0154149.", "link": "https://doi.org/10.1371/journal.pone.0154149", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Sung2025", "text": "Sung H, Siegel RL, Laversanne M, Jiang C, Morgan E, Zahwe M, et al. Colorectal cancer incidence trends in younger versus older adults: an analysis of population-based cancer registry data. Lancet Oncol. 2025;26(1):51-63. PMID 39674189; PMCID PMC11695264; doi:10.1016/S1470-2045(24)00600-4.", "link": "https://doi.org/10.1016/s1470-2045(24)00600-4", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Sung2026", "text": "Sung H, Filho AM, Laversanne M, Ferlay J, Siegel RL, Soerjomataram I, et al. Global cancer statistics 2024: GLOBOCAN estimates of incidence and mortality worldwide for 34 cancers in 186 countries. CA Cancer J Clin. 2026;76(4):e70090. PMID 42417444; PMCID PMC13343830; doi:10.3322/caac.70090.", "link": "https://doi.org/10.3322/caac.70090", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Syngal2015", "text": "Syngal S, Brand RE, Church JM, Giardiello FM, Hampel HL, Burt RW. ACG clinical guideline: Genetic testing and management of hereditary gastrointestinal cancer syndromes. Am J Gastroenterol. 2015;110(2):223-62; quiz 263. PMID 25645574; PMCID PMC4695986; doi:10.1038/ajg.2014.435.", "link": "https://doi.org/10.1038/ajg.2014.435", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Tashiro2026", "text": "Tashiro K, Osumi H, Kataoka K, Shimada Y, Inomata M, Hamaguchi T, et al. Time-dependent recurrence patterns after curative resection for stage II/III colorectal cancer: An integrated analysis of four phase III randomized controlled trials (JCOG2310A-S4). Eur J Cancer. 2026;245:116957. PMID 42520593; doi:10.1016/j.ejca.2026.116957.", "link": "https://doi.org/10.1016/j.ejca.2026.116957", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Taylor2010", "text": "Taylor DP, Burt RW, Williams MS, Haug PJ, Cannon-Albright LA. Population-based family history-specific risks for colorectal cancer: a constellation approach. Gastroenterology. 2010;138(3):877-85. PMID 19932107; PMCID PMC2831153; doi:10.1053/j.gastro.2009.11.044.", "link": "https://doi.org/10.1053/j.gastro.2009.11.044", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Taylor2014", "text": "Taylor FG, Quirke P, Heald RJ, Moran BJ, Blomqvist L, Swift IR, et al. Preoperative magnetic resonance imaging assessment of circumferential resection margin predicts disease-free survival and local recurrence: 5-year follow-up results of the MERCURY study. J Clin Oncol. 2014;32(1):34-43. PMID 24276776; doi:10.1200/JCO.2012.45.3258.", "link": "https://doi.org/10.1200/jco.2012.45.3258", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "TCGA2012", "text": "Cancer Genome Atlas Network. Comprehensive molecular characterization of human colon and rectal cancer. Nature. 2012;487(7407):330-7. PMID 22810696; PMCID PMC3401966; doi:10.1038/nature11252.", "link": "https://doi.org/10.1038/nature11252", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Tejpar2017", "text": "Tejpar S, Stintzing S, Ciardiello F, Tabernero J, Van Cutsem E, Beier F, et al. Prognostic and Predictive Relevance of Primary Tumor Location in Patients With RAS Wild-Type Metastatic Colorectal Cancer: Retrospective Analyses of the CRYSTAL and FIRE-3 Trials. JAMA Oncol. 2017;3(2):194-201. PMID 27722750; PMCID PMC7505121; doi:10.1001/jamaoncol.2016.3797.", "link": "https://doi.org/10.1001/jamaoncol.2016.3797", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Temel2010", "text": "Temel JS, Greer JA, Muzikansky A, Gallagher ER, Admane S, Jackson VA, et al. Early palliative care for patients with metastatic non-small-cell lung cancer. N Engl J Med. 2010;363(8):733-42. PMID 20818875; doi:10.1056/NEJMoa1000678.", "link": "https://doi.org/10.1056/nejmoa1000678", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Temel2017", "text": "Temel JS, Greer JA, El-Jawahri A, Pirl WF, Park ER, Jackson VA, et al. Effects of Early Integrated Palliative Care in Patients With Lung and GI Cancer: A Randomized Clinical Trial. J Clin Oncol. 2017;35(8):834-841. PMID 28029308; PMCID PMC5455686; doi:10.1200/JCO.2016.70.5046.", "link": "https://doi.org/10.1200/jco.2016.70.5046", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "tenBroeke2015", "text": "ten Broeke SW, Brohet RM, Tops CM, van der Klift HM, Velthuizen ME, Bernstein I, et al. Lynch syndrome caused by germline PMS2 mutations: delineating the cancer risk. J Clin Oncol. 2015;33(4):319-25. PMID 25512458; doi:10.1200/JCO.2014.57.8088.", "link": "https://doi.org/10.1200/jco.2014.57.8088", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Thibodeau1993", "text": "Thibodeau SN, Bren G, Schaid D. Microsatellite instability in cancer of the proximal colon. Science. 1993;260(5109):816-9. PMID 8484122; doi:10.1126/science.8484122.", "link": "https://doi.org/10.1126/science.8484122", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Tie2016", "text": "Tie J, Wang Y, Tomasetti C, Li L, Springer S, Kinde I, et al. Circulating tumor DNA analysis detects minimal residual disease and predicts recurrence in patients with stage II colon cancer. Sci Transl Med. 2016;8(346):346ra92. PMID 27384348; PMCID PMC5346159; doi:10.1126/scitranslmed.aaf6219.", "link": "https://doi.org/10.1126/scitranslmed.aaf6219", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Tie2022", "text": "Tie J, Cohen JD, Lahouel K, Lo SN, Wang Y, Kosmider S, et al. Circulating Tumor DNA Analysis Guiding Adjuvant Therapy in Stage II Colon Cancer. N Engl J Med. 2022;386(24):2261-2272. PMID 35657320; PMCID PMC9701133; doi:10.1056/NEJMoa2200075.", "link": "https://doi.org/10.1056/nejmoa2200075", "areas": ["E", "F", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Tie2025", "text": "Tie J, Wang Y, Loree JM, Cohen JD, Wong R, Price T, et al. Circulating tumor DNA-guided adjuvant therapy in locally advanced colon cancer: the randomized phase 2/3 DYNAMIC-III trial. Nat Med. 2025;31(12):4291-4300. PMID 41115959; doi:10.1038/s41591-025-04030-w.", "link": "https://doi.org/10.1038/s41591-025-04030-w", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "ToesZoutendijk2020", "text": "Toes-Zoutendijk E, Kooyker AI, Dekker E, Spaander MCW, Opstal-van Winden AWJ, Ramakers C, et al. Incidence of Interval Colorectal Cancer After Negative Results From First-Round Fecal Immunochemical Screening Tests, by Cutoff Value and Participant Sex and Age. Clin Gastroenterol Hepatol. 2020;18(7):1493-1500. PMID 31442598; doi:10.1016/j.cgh.2019.08.021.", "link": "https://doi.org/10.1016/j.cgh.2019.08.021", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Tomasetti2015", "text": "Tomasetti C, Vogelstein B. Cancer etiology. Variation in cancer risk among tissues can be explained by the number of stem cell divisions. Science. 2015;347(6217):78-81. PMID 25554788; PMCID PMC4446723; doi:10.1126/science.1260825.", "link": "https://doi.org/10.1126/science.1260825", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Tomasetti2017", "text": "Tomasetti C, Li L, Vogelstein B. Stem cell divisions, somatic mutations, cancer etiology, and cancer prevention. Science. 2017;355(6331):1330-1334. PMID 28336671; PMCID PMC5852673; doi:10.1126/science.aaf9011.", "link": "https://doi.org/10.1126/science.aaf9011", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Tomlinson2007", "text": "Tomlinson JS, Jarnagin WR, DeMatteo RP, Fong Y, Kornprat P, Gonen M, et al. Actual 10-year survival after resection of colorectal liver metastases defines cure. J Clin Oncol. 2007;25(29):4575-80. PMID 17925551; doi:10.1200/JCO.2007.11.0833.", "link": "https://doi.org/10.1200/jco.2007.11.0833", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Tong2018", "text": "Tong GJ, Zhang GY, Liu J, Zheng ZZ, Chen Y, Niu PP, et al. Comparison of the eighth version of the American Joint Committee on Cancer manual to the seventh version for colorectal cancer: A retrospective review of our data. World J Clin Oncol. 2018;9(7):148-161. PMID 30425940; PMCID PMC6230917; doi:10.5306/wjco.v9.i7.148.", "link": "https://doi.org/10.5306/wjco.v9.i7.148", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Torring2011", "text": "Tørring ML, Frydenberg M, Hansen RP, Olesen F, Hamilton W, Vedsted P. Time to diagnosis and mortality in colorectal cancer: a cohort study in primary care. Br J Cancer. 2011;104(6):934-40. PMID 21364593; PMCID PMC3065288; doi:10.1038/bjc.2011.60.", "link": "https://doi.org/10.1038/bjc.2011.60", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Toyota1999", "text": "Toyota M, Ahuja N, Ohe-Toyota M, Herman JG, Baylin SB, Issa JP. CpG island methylator phenotype in colorectal cancer. Proc Natl Acad Sci U S A. 1999;96(15):8681-6. PMID 10411935; PMCID PMC17576; doi:10.1073/pnas.96.15.8681.", "link": "https://doi.org/10.1073/pnas.96.15.8681", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Tran2011", "text": "Tran B, Kopetz S, Tie J, Gibbs P, Jiang ZQ, Lieu CH, et al. Impact of BRAF mutation and microsatellite instability on the pattern of metastatic spread and prognosis in metastatic colorectal cancer. Cancer. 2011;117(20):4623-32. PMID 21456008; PMCID PMC4257471; doi:10.1002/cncr.26086.", "link": "https://doi.org/10.1002/cncr.26086", "areas": ["C", "E"], "unverified": false, "validated": "Europe PMC"}, {"key": "Treasure2019", "text": "Treasure T, Farewell V, Macbeth F, Monson K, Williams NR, Brew-Graves C, et al. Pulmonary Metastasectomy versus Continued Active Monitoring in Colorectal Cancer (PulMiCC): a multicentre randomised clinical trial. Trials. 2019;20(1):718. PMID 31831062; PMCID PMC6909580; doi:10.1186/s13063-019-3837-y.", "link": "https://doi.org/10.1186/s13063-019-3837-y", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Twelves2005", "text": "Twelves C, Wong A, Nowacki MP, Abt M, Burris H 3rd, Carrato A, et al. Capecitabine as adjuvant treatment for stage III colon cancer. N Engl J Med. 2005;352(26):2696-2704. PMID 15987918; doi:10.1056/nejmoa043116.", "link": "https://doi.org/10.1056/nejmoa043116", "areas": ["F", "H"], "unverified": false, "validated": "Europe PMC"}, {"key": "Ugai2024", "text": "Ugai S, Yao Q, Takashima Y, Zhong Y, Matsuda K, Kawamura H, et al. Clinicopathological, molecular, and prognostic features of colorectal carcinomas with KRAS c.34G>T (p.G12C) mutation. Cancer Sci. 2024;115(10):3455-3465. PMID 39039804; PMCID PMC11448363; doi:10.1111/cas.16262.", "link": "https://doi.org/10.1111/cas.16262", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Umar2004", "text": "Umar A, Boland CR, Terdiman JP, Syngal S, de la Chapelle A, Rüschoff J, et al. Revised Bethesda Guidelines for hereditary nonpolyposis colorectal cancer (Lynch syndrome) and microsatellite instability. J Natl Cancer Inst. 2004;96(4):261-8. PMID 14970275; PMCID PMC2933058; doi:10.1093/jnci/djh034.", "link": "https://doi.org/10.1093/jnci/djh034", "areas": ["B", "E"], "unverified": false, "validated": "PubMed"}, {"key": "USPSTF2021", "text": "Davidson KW, Barry MJ, Mangione CM, Cabana M, Caughey AB, Davis EM, et al. Screening for Colorectal Cancer: US Preventive Services Task Force Recommendation Statement. JAMA. 2021;325(19):1965-1977. PMID 34003218; doi:10.1001/jama.2021.6238.", "link": "https://doi.org/10.1001/jama.2021.6238", "areas": ["A", "B", "D"], "unverified": false, "validated": "PubMed"}, {"key": "USPSTF2022Aspirin", "text": "Davidson KW, Barry MJ, Mangione CM, Cabana M, Chelmow D, Coker TR, et al. Aspirin Use to Prevent Cardiovascular Disease: US Preventive Services Task Force Recommendation Statement. JAMA. 2022;327(16):1577-1584. PMID 35471505; doi:10.1001/jama.2022.4983.", "link": "https://doi.org/10.1001/jama.2022.4983", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Utano2022", "text": "Utano K, Nagata K, Honda T, Kato T, Lefor AK, Togashi K. Bowel habits and gender correlate with colon length measured by CT colonography. Jpn J Radiol. 2022;40(3):298-307. PMID 34633598; PMCID PMC8891197; doi:10.1007/s11604-021-01204-7.", "link": "https://doi.org/10.1007/s11604-021-01204-7", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "VanBlarigan2018", "text": "Van Blarigan EL, Fuchs CS, Niedzwiecki D, Zhang S, Saltz LB, Mayer RJ, et al. Association of Survival With Adherence to the American Cancer Society Nutrition and Physical Activity Guidelines for Cancer Survivors After Colon Cancer Diagnosis: The CALGB 89803/Alliance Trial. JAMA Oncol. 2018;4(6):783-790. PMID 29710284; doi:10.1001/jamaoncol.2018.0126.", "link": "https://doi.org/10.1001/jamaoncol.2018.0126", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "VanCutsem2011", "text": "Van Cutsem E, Köhne CH, Láng I, Folprecht G, Nowacki MP, Cascinu S, et al. Cetuximab plus irinotecan, fluorouracil, and leucovorin as first-line treatment for metastatic colorectal cancer: updated analysis of overall survival according to tumor KRAS and BRAF mutation status. J Clin Oncol. 2011;29(15):2011-9. PMID 21502544; doi:10.1200/JCO.2010.33.5091.", "link": "https://doi.org/10.1200/jco.2010.33.5091", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "VanCutsem2015", "text": "Van Cutsem E, Lenz HJ, Köhne CH, Heinemann V, Tejpar S, Melezínek I, et al. Fluorouracil, leucovorin, and irinotecan plus cetuximab treatment and RAS mutations in colorectal cancer. J Clin Oncol. 2015;33(7):692-700. PMID 25605843; doi:10.1200/JCO.2014.59.4812.", "link": "https://doi.org/10.1200/jco.2014.59.4812", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "VanDerFlier2009", "text": "van der Flier LG, Clevers H. Stem cells, self-renewal, and differentiation in the intestinal epithelium. Annu Rev Physiol. 2009;71:241-60. PMID 18808327; doi:10.1146/annurev.physiol.010908.163145.", "link": "https://doi.org/10.1146/annurev.physiol.010908.163145", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "vanderGeest2015", "text": "van der Geest LG, Lam-Boer J, Koopman M, Verhoef C, Elferink MA, de Wilt JH. Nationwide trends in incidence, treatment and survival of colorectal cancer patients with synchronous metastases. Clin Exp Metastasis. 2015;32(5):457-65. PMID 25899064; doi:10.1007/s10585-015-9719-0.", "link": "https://doi.org/10.1007/s10585-015-9719-0", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "vanderLei2025", "text": "van der Lei S, Puijk RS, Dijkstra M, Schulz HH, Vos DJW, De Vries JJJ, et al. Thermal ablation versus surgical resection of small-size colorectal liver metastases (COLLISION): an international, randomised, controlled, phase 3 non-inferiority trial. Lancet Oncol. 2025;26(2):187-199. PMID 39848272; doi:10.1016/S1470-2045(24)00660-0.", "link": "https://doi.org/10.1016/s1470-2045(24)00660-0", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "vanderPas2013", "text": "van der Pas MH, Haglind E, Cuesta MA, Fürst A, Lacy AM, Hop WC, et al. Laparoscopic versus open surgery for rectal cancer (COLOR II): short-term outcomes of a randomised, phase 3 trial. Lancet Oncol. 2013;14(3):210-218. PMID 23395398; doi:10.1016/s1470-2045(13)70016-0.", "link": "https://doi.org/10.1016/s1470-2045(13)70016-0", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "vanderValk2018", "text": "van der Valk MJM, Hilling DE, Bastiaannet E, Meershoek-Klein Kranenbarg E, Beets GL, Figueiredo NL, et al. Long-term outcomes of clinical complete responders after neoadjuvant treatment for rectal cancer in the International Watch & Wait Database (IWWD): an international multicentre registry study. Lancet. 2018;391(10139):2537-2545. PMID 29976470; doi:10.1016/s0140-6736(18)31078-x.", "link": "https://doi.org/10.1016/s0140-6736(18)31078-x", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "vanGijn2011", "text": "van Gijn W, Marijnen CA, Nagtegaal ID, Kranenbarg EM, Putter H, Wiggers T, et al. Preoperative radiotherapy combined with total mesorectal excision for resectable rectal cancer: 12-year follow-up of the multicentre, randomised controlled TME trial. Lancet Oncol. 2011;12(6):575-582. PMID 21596621; doi:10.1016/s1470-2045(11)70097-3.", "link": "https://doi.org/10.1016/s1470-2045(11)70097-3", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "vanLeerdam2019", "text": "van Leerdam ME, Roos VH, van Hooft JE, Balaguer F, Dekker E, Kaminski MF, et al. Endoscopic management of Lynch syndrome and of familial risk of colorectal cancer: European Society of Gastrointestinal Endoscopy (ESGE) Guideline. Endoscopy. 2019;51(11):1082-1093. PMID 31597170; doi:10.1055/a-1016-4977.", "link": "https://doi.org/10.1055/a-1016-4977", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Vasen1999", "text": "Vasen HF, Watson P, Mecklin JP, Lynch HT. New clinical criteria for hereditary nonpolyposis colorectal cancer (HNPCC, Lynch syndrome) proposed by the International Collaborative group on HNPCC. Gastroenterology. 1999;116(6):1453-6. PMID 10348829; doi:10.1016/s0016-5085(99)70510-x.", "link": "https://doi.org/10.1016/s0016-5085(99)70510-x", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Veldkamp2005", "text": "Veldkamp R, Kuhry E, Hop WC, Jeekel J, Kazemier G, Bonjer HJ, et al. Laparoscopic surgery versus open surgery for colon cancer: short-term outcomes of a randomised trial. Lancet Oncol. 2005;6(7):477-484. PMID 15992696; doi:10.1016/s1470-2045(05)70221-7.", "link": "https://doi.org/10.1016/s1470-2045(05)70221-7", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Venderbosch2014", "text": "Venderbosch S, Nagtegaal ID, Maughan TS, Smith CG, Cheadle JP, Fisher D, et al. Mismatch repair status and BRAF mutation status in metastatic colorectal cancer patients: a pooled analysis of the CAIRO, CAIRO2, COIN, and FOCUS studies. Clin Cancer Res. 2014;20(20):5322-30. PMID 25139339; PMCID PMC4201568; doi:10.1158/1078-0432.CCR-14-0332.", "link": "https://doi.org/10.1158/1078-0432.ccr-14-0332", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Venook2017", "text": "Venook AP, Niedzwiecki D, Lenz HJ, Innocenti F, Fruth B, Meyerhardt JA, et al. Effect of First-Line Chemotherapy Combined With Cetuximab or Bevacizumab on Overall Survival in Patients With KRAS Wild-Type Advanced or Metastatic Colorectal Cancer: A Randomized Clinical Trial. JAMA. 2017;317(23):2392-2401. PMID 28632865; PMCID PMC5545896; doi:10.1001/jama.2017.7105.", "link": "https://doi.org/10.1001/jama.2017.7105", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Verheij2024", "text": "Verheij FS, Omer DM, Williams H, Lin ST, Qin LX, Buckley JT, et al. Long-Term Results of Organ Preservation in Patients With Rectal Adenocarcinoma Treated With Total Neoadjuvant Therapy: The Randomized Phase II OPRA Trial. J Clin Oncol. 2024;42(5):500-506. PMID 37883738; PMCID PMC11578087; doi:10.1200/jco.23.01208.", "link": "https://doi.org/10.1200/jco.23.01208", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Vieira2017", "text": "Vieira AR, Abar L, Chan DSM, Vingeliene S, Polemiti E, Stevens C, et al. Foods and beverages and colorectal cancer risk: a systematic review and meta-analysis of cohort studies, an update of the evidence of the WCRF-AICR Continuous Update Project. Ann Oncol. 2017;28(8):1788-1802. PMID 28407090; doi:10.1093/annonc/mdx171.", "link": "https://doi.org/10.1093/annonc/mdx171", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Vilar2010", "text": "Vilar E, Gruber SB. Microsatellite instability in colorectal cancer-the stable evidence. Nat Rev Clin Oncol. 2010;7(3):153-62. PMID 20142816; PMCID PMC3427139; doi:10.1038/nrclinonc.2009.237.", "link": "https://doi.org/10.1038/nrclinonc.2009.237", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Vogel2022", "text": "Vogel I, Shinkwin M, van der Storm SL, Torkington J, A Cornish J, Tanis PJ, et al. Overall readmissions and readmissions related to dehydration after creation of an ileostomy: a systematic review and meta-analysis. Tech Coloproctol. 2022;26(5):333-349. PMID 35192122; PMCID PMC9018644; doi:10.1007/s10151-022-02580-6.", "link": "https://doi.org/10.1007/s10151-022-02580-6", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Vogelstein1988", "text": "Vogelstein B, Fearon ER, Hamilton SR, Kern SE, Preisinger AC, Leppert M, et al. Genetic alterations during colorectal-tumor development. N Engl J Med. 1988;319(9):525-32. PMID 2841597; doi:10.1056/NEJM198809013190901.", "link": "https://doi.org/10.1056/nejm198809013190901", "areas": ["A", "C"], "unverified": false, "validated": "PubMed"}, {"key": "Vogelstein2013", "text": "Vogelstein B, Papadopoulos N, Velculescu VE, Zhou S, Diaz LA Jr, Kinzler KW. Cancer genome landscapes. Science. 2013;339(6127):1546-58. PMID 23539594; PMCID PMC3749880; doi:10.1126/science.1235122.", "link": "https://doi.org/10.1126/science.1235122", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Vuik2019", "text": "Vuik FE, Nieuwenburg SA, Bardou M, Lansdorp-Vogelaar I, Dinis-Ribeiro M, Bento MJ, et al. Increasing incidence of colorectal cancer in young adults in Europe over the last 25 years. Gut. 2019;68(10):1820-1826. PMID 31097539; PMCID PMC6839794; doi:10.1136/gutjnl-2018-317592.", "link": "https://doi.org/10.1136/gutjnl-2018-317592", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Wainberg2025", "text": "Wainberg ZA, Weekes CD, Furqan M, Kasi PM, Devoe CE, Leal AD, et al. Lymph node-targeted, mKRAS-specific amphiphile vaccine in pancreatic and colorectal cancer: phase 1 AMPLIFY-201 trial final results. Nat Med. 2025;31(11):3648-3653. PMID 40790272; PMCID PMC12618236; doi:10.1038/s41591-025-03876-4.", "link": "https://doi.org/10.1038/s41591-025-03876-4", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Wang2023", "text": "Wang YHW, Wiseman J. Anatomy, Abdomen and Pelvis, Rectum. In: StatPearls [Internet]. Treasure Island (FL): StatPearls Publishing; 2023 (updated 2023 Jul 25). PMID 30725930.", "link": "https://pubmed.ncbi.nlm.nih.gov/30725930/", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Wang2024CG", "text": "Wang J, Duan Y, Geng L, Li X, Yue S, Liu H. Trajectory of Caregiver Burden and Associated Factors in Family Caregivers of Individuals with Colorectal Cancer: A Longitudinal, Observational Multicenter Study. Patient Prefer Adherence. 2024;18:879-892. PMID 38645699; PMCID PMC11033041; doi:10.2147/PPA.S451487.", "link": "https://doi.org/10.2147/ppa.s451487", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Wang2024LRD", "text": "Wang F, Huang X, Wang Z, Yan Z, Wang S, Pan P, et al. One-day versus three-day low-residue diet bowel preparation regimens before colonoscopy: a meta-analysis of randomized controlled trials. J Gastroenterol Hepatol. 2024;39(5):787-795. PMID 38251810; doi:10.1111/jgh.16466.", "link": "https://doi.org/10.1111/jgh.16466", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Warthin1913", "text": "Warthin AS. Heredity with reference to carcinoma. Arch Intern Med. 1913;XII(5):546. doi:10.1001/archinte.1913.00070050063006.", "link": "https://doi.org/10.1001/archinte.1913.00070050063006", "areas": ["A"], "unverified": false, "validated": "Crossref"}, {"key": "Watanabe2023", "text": "Watanabe J, Muro K, Shitara K, Yamazaki K, Shiozawa M, Ohori H, et al. Panitumumab vs Bevacizumab Added to Standard First-line Chemotherapy and Overall Survival Among Patients With RAS Wild-type, Left-Sided Metastatic Colorectal Cancer: A Randomized Clinical Trial. JAMA. 2023;329(15):1271-1282. PMID 37071094; PMCID PMC10114040; doi:10.1001/jama.2023.4428.", "link": "https://doi.org/10.1001/jama.2023.4428", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Weisenberger2006", "text": "Weisenberger DJ, Siegmund KD, Campan M, Young J, Long TI, Faasse MA, et al. CpG island methylator phenotype underlies sporadic microsatellite instability and is tightly associated with BRAF mutation in colorectal cancer. Nat Genet. 2006;38(7):787-93. PMID 16804544; doi:10.1038/ng1834.", "link": "https://doi.org/10.1038/ng1834", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Weiser2018", "text": "Weiser MR. AJCC 8th Edition: Colorectal Cancer. Ann Surg Oncol. 2018;25(6):1454-1455. PMID 29616422; doi:10.1245/s10434-018-6462-1. Two-page editorial without abstract; full text paywalled and not read.", "link": "https://doi.org/10.1245/s10434-018-6462-1", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Westerberg2026", "text": "Westerberg M, Ludvigsson JF, Metcalfe C, Strömberg U, Blom J, Engstrand L, et al. Colonoscopy and fecal immunochemical testing versus usual care in diagnostic colorectal cancer screening: the SCREESCO randomized controlled trial. Nat Med. 2026;32(4):1278-1285. PMID 41721101; PMCID PMC13099434; doi:10.1038/s41591-026-04225-9.", "link": "https://doi.org/10.1038/s41591-026-04225-9", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Westwood2017", "text": "Westwood M, Lang S, Armstrong N, van Turenhout S, Cubiella J, Stirk L, et al. Faecal immunochemical tests (FIT) can help to rule out colorectal cancer in patients presenting in primary care with lower abdominal symptoms: a systematic review conducted to inform new NICE DG30 diagnostic guidance. BMC Med. 2017;15(1):189. PMID 29061126; PMCID PMC5654140; doi:10.1186/s12916-017-0944-z.", "link": "https://doi.org/10.1186/s12916-017-0944-z", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "WilleJorgensen2018", "text": "Wille-Jørgensen P, Syk I, Smedh K, Laurberg S, Nielsen DT, Petersen SH, et al. Effect of More vs Less Frequent Follow-up Testing on Overall and Colorectal Cancer-Specific Mortality in Patients With Stage II or III Colorectal Cancer: The COLOFOL Randomized Clinical Trial. JAMA. 2018;319(20):2095-2103. PMID 29800179; doi:10.1001/jama.2018.5623.", "link": "https://doi.org/10.1001/jama.2018.5623", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Williams2025", "text": "Williams H, Fokas E, Diefenhardt M, Lee C, Verheij FS, Omer DM, et al. Survival among patients treated with total mesorectal excision or selective watch-and-wait after total neoadjuvant therapy: a pooled analysis of the CAO/ARO/AIO-12 and OPRA randomized phase II trials. Ann Oncol. 2025;36(5):543-547. PMID 39848335; PMCID PMC12034476; doi:10.1016/j.annonc.2025.01.006.", "link": "https://doi.org/10.1016/j.annonc.2025.01.006", "areas": ["F"], "unverified": false, "validated": "Europe PMC"}, {"key": "Win2014", "text": "Win AK, Dowty JG, Cleary SP, Kim H, Buchanan DD, Young JP, et al. Risk of colorectal cancer for carriers of mutations in MUTYH, with and without a family history of cancer. Gastroenterology. 2014;146(5):1208-11.e1-5. PMID 24444654; PMCID PMC3992182; doi:10.1053/j.gastro.2014.01.022.", "link": "https://doi.org/10.1053/j.gastro.2014.01.022", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Win2017", "text": "Win AK, Jenkins MA, Dowty JG, Antoniou AC, Lee A, Giles GG, et al. Prevalence and Penetrance of Major Genes and Polygenes for Colorectal Cancer. Cancer Epidemiol Biomarkers Prev. 2017;26(3):404-412. PMID 27799157; PMCID PMC5336409; doi:10.1158/1055-9965.EPI-16-0693.", "link": "https://doi.org/10.1158/1055-9965.epi-16-0693", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Winawer1993", "text": "Winawer SJ, Zauber AG, Ho MN, O'Brien MJ, Gottlieb LS, Sternberg SS, et al. Prevention of colorectal cancer by colonoscopic polypectomy. The National Polyp Study Workgroup. N Engl J Med. 1993;329(27):1977-81. PMID 8247072; doi:10.1056/NEJM199312303292701.", "link": "https://doi.org/10.1056/nejm199312303292701", "areas": ["A", "C", "D"], "unverified": false, "validated": "PubMed"}, {"key": "Wolf2018", "text": "Wolf AMD, Fontham ETH, Church TR, Flowers CR, Guerra CE, LaMonte SJ, et al. Colorectal cancer screening for average-risk adults: 2018 guideline update from the American Cancer Society. CA Cancer J Clin. 2018;68(4):250-281. PMID 29846947; doi:10.3322/caac.21457.", "link": "https://doi.org/10.3322/caac.21457", "areas": ["A", "B", "D"], "unverified": false, "validated": "PubMed"}, {"key": "Wolf2026", "text": "Wolf AMD, Hoffman RM, Walter LC, Zeigler-Johnson C, Church TR, Guerra CE, et al. Colorectal cancer screening: An update to the American Cancer Society guideline, 2026. CA Cancer J Clin. 2026;76(3):e70083. PMID 42200680; doi:10.3322/caac.70083.", "link": "https://doi.org/10.3322/caac.70083", "areas": ["A", "B", "D"], "unverified": false, "validated": "PubMed"}, {"key": "Wolff1973AnnSurg", "text": "Wolff WI, Shinya H. A new approach to colonic polyps. Ann Surg. 1973;178(3):367-78. PMID 4542334; PMCID PMC1355821; doi:10.1097/00000658-197309000-00017.", "link": "https://doi.org/10.1097/00000658-197309000-00017", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Wolff1973NEJM", "text": "Wolff WI, Shinya H. Polypectomy via the fiberoptic colonoscope. Removal of neoplasms beyond reach of the sigmoidoscope. N Engl J Med. 1973;288(7):329-32. PMID 4682941; doi:10.1056/NEJM197302152880701.", "link": "https://doi.org/10.1056/nejm197302152880701", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Wolin2009", "text": "Wolin KY, Yan Y, Colditz GA, Lee IM. Physical activity and colon cancer prevention: a meta-analysis. Br J Cancer. 2009;100(4):611-6. PMID 19209175; PMCID PMC2653744; doi:10.1038/sj.bjc.6604917.", "link": "https://doi.org/10.1038/sj.bjc.6604917", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Wong2018", "text": "Wong MCS, Chan CH, Lin J, Huang JLW, Huang J, Fang Y, et al. Lower Relative Contribution of Positive Family History to Colorectal Cancer Risk with Increasing Age: A Systematic Review and Meta-Analysis of 9.28 Million Individuals. Am J Gastroenterol. 2018;113(12):1819-1827. PMID 29867176; PMCID PMC6768593; doi:10.1038/s41395-018-0075-y.", "link": "https://doi.org/10.1038/s41395-018-0075-y", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Wong2019", "text": "Wong SH, Yu J. Gut microbiota in colorectal cancer: mechanisms of action and clinical applications. Nat Rev Gastroenterol Hepatol. 2019;16(11):690-704. PMID 31554963; doi:10.1038/s41575-019-0209-8.", "link": "https://doi.org/10.1038/s41575-019-0209-8", "areas": ["C"], "unverified": false, "validated": "Europe PMC"}, {"key": "Yaeger2023", "text": "Yaeger R, Weiss J, Pelster MS, Spira AI, Barve M, Ou SI, et al. Adagrasib with or without Cetuximab in Colorectal Cancer with Mutated KRAS G12C. N Engl J Med. 2023;388(1):44-54. PMID 36546659; PMCID PMC9908297; doi:10.1056/NEJMoa2212419.", "link": "https://doi.org/10.1056/nejmoa2212419", "areas": ["E", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Yaeger2024", "text": "Yaeger R, Uboha NV, Pelster MS, Bekaii-Saab TS, Barve M, Saltzman J, et al. Efficacy and Safety of Adagrasib plus Cetuximab in Patients with KRASG12C-Mutated Metastatic Colorectal Cancer. Cancer Discov. 2024;14(6):982-993. PMID 38587856; PMCID PMC11152245; doi:10.1158/2159-8290.CD-24-0217.", "link": "https://doi.org/10.1158/2159-8290.cd-24-0217", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Yoshino2023", "text": "Yoshino T, Di Bartolomeo M, Raghav K, Masuishi T, Loupakis F, Kawakami H, et al. Final results of DESTINY-CRC01 investigating trastuzumab deruxtecan in patients with HER2-expressing metastatic colorectal cancer. Nat Commun. 2023;14(1):3332. PMID 37286557; PMCID PMC10247780; doi:10.1038/s41467-023-38032-4.", "link": "https://doi.org/10.1038/s41467-023-38032-4", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Young2025", "text": "Young GP, Benton SC, Bresalier RS, Chiu HM, Dekker E, Fraser CG, et al. Fecal Immunochemical Test Positivity Thresholds: An International Survey of Population-Based Screening Programs. Dig Dis Sci. 2025;70(5):1637-1645. PMID 39528850; PMCID PMC12125024; doi:10.1007/s10620-024-08664-7.", "link": "https://doi.org/10.1007/s10620-024-08664-7", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Yu2024", "text": "Yu C, Shi Z, Zhou G, Chang X. Revisiting the survival paradox between stage IIB/C and IIIA colon cancer. Sci Rep. 2024;14(1):22133. PMID 39333782; PMCID PMC11436827; doi:10.1038/s41598-024-73496-4.", "link": "https://doi.org/10.1038/s41598-024-73496-4", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Yurgelun2017", "text": "Yurgelun MB, Kulke MH, Fuchs CS, Allen BA, Uno H, Hornick JL, et al. Cancer Susceptibility Gene Mutations in Individuals With Colorectal Cancer. J Clin Oncol. 2017;35(10):1086-1095. PMID 28135145; PMCID PMC5455355; doi:10.1200/JCO.2016.71.0012.", "link": "https://doi.org/10.1200/jco.2016.71.0012", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Zaffaroni2024", "text": "Zaffaroni G, Mannucci A, Koskenvuo L, de Lacy B, Maffioli A, Bisseling T, et al. Updated European guidelines for clinical management of familial adenomatous polyposis (FAP), MUTYH-associated polyposis (MAP), gastric adenocarcinoma, proximal polyposis of the stomach (GAPPS) and other rare adenomatous polyposis syndromes: a joint EHTG-ESCP revision. Br J Surg. 2024;111(5):znae070. PMID 38722804; PMCID PMC11081080; doi:10.1093/bjs/znae070.", "link": "https://doi.org/10.1093/bjs/znae070", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Zauber2012", "text": "Zauber AG, Winawer SJ, O'Brien MJ, Lansdorp-Vogelaar I, van Ballegooijen M, Hankey BF, et al. Colonoscopic polypectomy and long-term prevention of colorectal-cancer deaths. N Engl J Med. 2012;366(8):687-96. PMID 22356322; PMCID PMC3322371; doi:10.1056/NEJMoa1100370.", "link": "https://doi.org/10.1056/nejmoa1100370", "areas": ["A", "C", "D"], "unverified": false, "validated": "PubMed"}, {"key": "Zeineddine2023", "text": "Zeineddine FA, Zeineddine MA, Yousef A, Gu Y, Chowdhury S, Dasari A, et al. Survival improvement for patients with metastatic colorectal cancer over twenty years. NPJ Precis Oncol. 2023;7(1):16. PMID 36781990; PMCID PMC9925745; doi:10.1038/s41698-023-00353-4.", "link": "https://doi.org/10.1038/s41698-023-00353-4", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Zhao2019", "text": "Zhao S, Wang S, Pan P, Xia T, Chang X, Yang X, et al. Magnitude, Risk Factors, and Factors Associated With Adenoma Miss Rate of Tandem Colonoscopy: A Systematic Review and Meta-analysis. Gastroenterology. 2019;156(6):1661-1674.e11. PMID 30738046; doi:10.1053/j.gastro.2019.01.260.", "link": "https://doi.org/10.1053/j.gastro.2019.01.260", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Zhu2024", "text": "Zhu L, Li X, Zhang H, Li H, Shen X. Urinary and sexual function after robotic and laparoscopic rectal cancer surgery: a systematic review and meta-analysis. J Robot Surg. 2024;18(1):262. PMID 38907844; doi:10.1007/s11701-024-02019-0.", "link": "https://doi.org/10.1007/s11701-024-02019-0", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Zorzi2015", "text": "Zorzi M, Fedeli U, Schievano E, Bovo E, Guzzinati S, Baracco S, et al. Impact on colorectal cancer mortality of screening programmes based on the faecal immunochemical test. Gut. 2015;64(5):784-90. PMID 25179811; doi:10.1136/gutjnl-2014-307508.", "link": "https://doi.org/10.1136/gutjnl-2014-307508", "areas": ["D"], "unverified": false, "validated": "PubMed"}];

/* =============== home: a polyp's fifteen years, with and without screening =============== */
const HERO_CAP=['Schematic, not to scale; the years are illustrative. In one sequencing study, a large adenoma took about 17 years to become an advanced cancer.<sup class="c" data-ref="Jones2008" title="Source 270">270</sup>','Schematic: a colonoscopy finds the polyp and removes it before it can become a cancer, which is how screening prevents some cancers as well as finding them early.<sup class="c" data-ref="Winawer1993,Zauber2012" title="Source 583,598">583,598</sup>'];
inits.home=()=>{
  const svg=$('#heroSvg'),rg=$('#heroT'),sb=$('#heroScr'),cap=$('#heroCap');let scr=false;
  /* schematic stage of the lesion at year y (0..15): an adenoma appears at year 1, becomes advanced by
     about year 7 and invasive near year 11. The timing is illustrative, not a measured course. */
  const YRS=15,SNARE=6.2;
  const stageAt=y=>y<1?0:y<11?ramp(y,1,11)*.85:.85+ramp(y,11,14)*.15;
  function draw(t){const N=vb(svg,'520 300','400 360');const y=t*YRS;
    const W=N?360:460,x0=N?20:30,yl=N?190:170;let s='';
    const caught=scr&&y>=SNARE;
    /* lumen and the mucosal surface */
    s+=`<rect x="${x0}" y="${yl-120}" width="${W}" height="120" rx="12" style="fill:var(--field)"/>`;
    const w=wall(x0,yl,W,{h:N?110:96,labels:false});s+=w.svg;
    const px=x0+W*.5,ps=N?70:84;
    if(!caught&&y>=1)s+=polyp(px,yl,ps*(.35+.65*ramp(y,1,9)),stageAt(y),{ped:false,seed:4});
    if(caught){s+=`<circle cx="${f1(px)}" cy="${yl}" r="6" style="fill:var(--good);opacity:.35"/><text x="${f1(px)}" y="${yl-18}" class="t-sm t-mid" style="fill:var(--good)">polyp removed at year ${Math.round(SNARE)}</text>`}
    /* the scope comes in from the right around the screening year */
    if(scr){const k=bump(y,SNARE-1.6,SNARE+1.6),sx=lerp(x0+W+30,px+40,k),sy=yl-46;
      if(k>.02){s+=`<path d="M${f1(x0+W+40)} ${sy}H${f1(sx+14)}" style="stroke:var(--scope);stroke-width:9;stroke-linecap:round;opacity:.85"/>`+scope(sx,sy,180,{light:true});
        if(y>SNARE-.6&&y<SNARE+.4)s+=`<ellipse cx="${f1(px)}" cy="${f1(yl-ps*.22)}" rx="${f1(ps*.36)}" ry="${f1(ps*.2)}" style="fill:none;stroke:var(--accent);stroke-width:2;stroke-dasharray:3 3"/>`}}
    /* label for the current stage */
    const st=caught?'Clear bowel lining':y<1?'Normal lining':stageAt(y)<.42?'Small adenoma (polyp)':stageAt(y)<.7?'Large adenoma':stageAt(y)<.86?'Advanced adenoma, high-grade dysplasia':'Carcinoma, invading the wall';
    const col=caught||y<1?'var(--good)':stageAt(y)<.86?'var(--polyp-line)':'var(--tumour)';
    s+=`<text x="${x0+12}" y="${yl-96}" class="t-big" style="fill:${col}">${st}</text>`;
    s+=`<text x="${x0+12}" y="${yl-76}" class="t-sm">Year ${y.toFixed(1)} of a schematic 15</text>`;
    /* a year ruler */
    const ry=N?336:282;s+=`<line x1="${x0}" x2="${x0+W}" y1="${ry}" y2="${ry}" class="axis"/>`;
    for(let k=0;k<=YRS;k+=N?5:3){const xx=x0+W*k/YRS;s+=`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${ry-4}" y2="${ry+4}" class="axis"/><text x="${f1(xx)}" y="${ry-8}" class="t-xs t-mid">${k}y</text>`}
    s+=`<circle cx="${f1(x0+W*y/YRS)}" cy="${ry}" r="5" style="fill:var(--brand)"/>`;
    if(scr)s+=`<path d="M${f1(x0+W*SNARE/YRS)} ${ry-14}v10" style="stroke:var(--accent);stroke-width:2"/><text x="${f1(x0+W*SNARE/YRS)}" y="${ry-18}" class="t-xs t-mid" style="fill:var(--accent)">screen</text>`;
    svg.innerHTML=s}
  sb.addEventListener('click',()=>{scr=!scr;sb.setAttribute('aria-pressed',scr);cap.innerHTML=scr?HERO_CAP[1]:HERO_CAP[0];draw(+rg.value)});
  playWire(rg,$('#heroPlay'),draw,9000,'Replay','home');draw(+rg.value);
};
/* =============== 1.1 What colorectal cancer is =============== */
/* Six scenes on one scrubber. Each step carries an incidence note and, where the sources give
   death figures, a mortality note (mort); steps without one append a line saying so. */
const WH_STEPS=[
 {from:0,at:.06,k:'Worldwide · GLOBOCAN 2022 and 2024',t:'A common cancer worldwide',
  txt:`In GLOBOCAN 2022, colorectal cancer was the third most diagnosed cancer in the world: 9.6% of all new cancers, after lung (12.4%) and female breast (11.6%). The 2024 estimates, published in 2026, count 2,041,007 new cases (rank 3): 1,138,656 in men and 902,351 in women. The age-standardised rate is 22.4 per 100,000 in men and 15.3 in women, and the cumulative risk from birth to 74 is 2.58% and 1.72%. <sup class="c" data-ref="Bray2024,Sung2026" title="Source 71,519">71,519</sup>`,
  pt:`About 2 million people in the world learn they have bowel cancer each year. <sup class="c" data-ref="Sung2026" title="Source 519">519</sup>`,
  hook:`CRC is the third most common cancer and the second leading cause of cancer death worldwide. <sup class="c" data-ref="Bray2024,Sung2026" title="Source 71,519">71,519</sup>`,
  mort:{txt:`Colorectal cancer was the second leading cause of cancer death in GLOBOCAN 2022: 9.3% of cancer deaths, after lung (18.7%). In 2024 it caused an estimated 917,895 deaths (rank 2): 504,807 men and 413,088 women, age-standardised 9.6 and 6.3 per 100,000. <sup class="c" data-ref="Bray2024,Sung2026" title="Source 71,519">71,519</sup>`,
   pt:`Only lung cancer kills more people with cancer worldwide. <sup class="c" data-ref="Bray2024" title="Source 71">71</sup>`}},
 {from:.15,at:.255,k:'Worldwide · 2020 → 2040',t:'A growing burden',
  txt:`GLOBOCAN 2020 counted over 1.9 million new cases; the 2024 round counts 2,041,007. A projection from the 2020 estimates expects 3.2 million new cases a year by 2040, mostly in countries with a high or very high Human Development Index (HDI). Japan's incidence quadrupled between 1970 and 1990 alongside post-war economic development, and similar rises are now seen in many transitioning countries <span class="ev est">Established</span>. <sup class="c" data-ref="Morgan2023,Sung2026" title="Source 377,519">377,519</sup>`,
  pt:`Ageing populations, Western diets, obesity, inactivity and smoking are pushing the numbers up. <sup class="c" data-ref="Dekker2019" title="Source 123">123</sup>`,
  hook:`2040 projection: 3.2 million new cases and 1.6 million deaths a year. <sup class="c" data-ref="Morgan2023" title="Source 377">377</sup>`,
  mort:{txt:`GLOBOCAN 2020 counted 930,000 deaths and the 2024 round 917,895. They come from different estimation rounds, so the small difference is not a trend. The 2040 projection is 1.6 million deaths a year. About 10% of new cases worldwide are attributed to modifiable risk factors (in men: smoking, alcohol, high BMI and inactivity); a US study with a broader set of factors estimated that up to 55% could be prevented. <sup class="c" data-ref="Morgan2023,Sung2026" title="Source 377,519">377,519</sup>`,
   pt:`Deaths are expected to rise with the number of cases, unless prevention and screening reach more people. <sup class="c" data-ref="Morgan2023,Sung2026" title="Source 377,519">377,519</sup>`}},
 {from:.32,at:.385,k:'Worldwide · rates per 100,000',t:'Five- to six-fold variation',
  txt:`Incidence varies five- to six-fold between regions. The highest rates are in Europe, Australia/New Zealand and Northern America (30–40 per 100,000 in men, 24–32 in women); the lowest are in Eastern, Western and Middle Africa and South-Central Asia (5–8). In 2020 the extremes were 40.6 (men, Australia/New Zealand and European regions) and 4.4 (women, Southern Asia). Incidence is up to four times higher in higher-HDI countries. <sup class="c" data-ref="Sung2026,Morgan2023" title="Source 377,519">377,519</sup>`,
  pt:`Bowel cancer is far more common in richer countries, but people diagnosed in poorer countries are more likely to die of it. <sup class="c" data-ref="Sung2026" title="Source 519">519</sup>`,
  hook:`Higher-HDI countries: higher incidence. Lower-HDI countries: higher case fatality, so mortality varies less. <sup class="c" data-ref="Sung2026" title="Source 519">519</sup>`,
  mort:{txt:`Death rates vary less than case rates, because case fatality is higher in lower-HDI countries. In 2020, mortality ranged from 20.2 per 100,000 (men, Eastern Europe) to 2.5 (women, Southern Asia). Long-standing falls in incidence and mortality in historically high-risk countries in Europe, Oceania and Northern America reflect lifestyle change, such as less smoking, and screening, which has sped up progress since the early 2000s <span class="ev est">Established</span>. <sup class="c" data-ref="Sung2026,Morgan2023" title="Source 377,519">377,519</sup>`}},
 {from:.47,at:.555,k:'Where in the bowel · US 2018–2022',t:'Where in the bowel',
  txt:`Colorectal cancer can start anywhere from the caecum to the rectum. US incidence by subsite (per 100,000, all ages, 2018–2022) is 13.3 for the proximal colon, 8.7 for the distal colon, 11.1 for the rectum and 2.2 not otherwise specified. As shares, that is about 38% proximal, 25% distal, 31% rectum and 6% unspecified: these shares are derived from ACS incidence rates, not published as such. Rectal cancer made up 32% of all colorectal cancer in 2022, up from 27% in 2004, and its incidence rose 1% a year from 2018 to 2022. <sup class="c" data-ref="Siegel2026CRC" title="Source 495">495</sup>`,
  pt:`About two in three bowel cancers start in the colon and one in three in the rectum, the last part of the bowel before the anus. <sup class="c" data-ref="Siegel2026CRC" title="Source 495">495</sup>`,
  hook:`Men's excess grows along the bowel: incidence 9% higher than women's for the proximal colon, 41% for the distal colon, 57% for the rectum. <sup class="c" data-ref="Siegel2026CRC" title="Source 495">495</sup>`,
  mortNote:'The sources give no death rates by subsite, so this scene shows incidence in both modes.'},
 {from:.63,at:.715,k:'Age · US 2026 projection',t:'Mostly after 50, rising younger',
  txt:`Of the 158,850 US cases projected for 2026, 24,640 (16%) are in people under 50, 47,600 (30%) at 50–64 and 86,610 (55%) at 65 or older. From 2002 to 2012 incidence at 65 and older fell 4–5% a year, credited to widespread colonoscopy after Medicare expanded coverage in 2001. From 2013 to 2022 it fell 2.5% a year at 65 and older but rose 0.4% a year at 50–64 and 3% a year at 20–49. 45% of new diagnoses are now in people under 65, up from 27% in 1995. <sup class="c" data-ref="Siegel2026CRC" title="Source 495">495</sup>`,
  pt:`Most bowel cancer happens in people over 50, but it is becoming more common in younger adults. Doctors do not yet know why. <sup class="c" data-ref="Siegel2026CRC" title="Source 495">495</sup>`,
  hook:`US lifetime risk: about 1 in 24 men and 1 in 26 women; 0.4% before age 50. <sup class="c" data-ref="Siegel2025" title="Source 493">493</sup>`,
  mort:{txt:`Of 55,230 US deaths projected for 2026, 3,890 (7%) are under 50, 13,480 (24%) at 50–64 and 37,860 (69%) at 65 or older. Death rates have risen 1% a year under 50 since 2004 and 1.2% a year at 50–64 from 2019 to 2023, but fallen 2.3% a year at 65 and older since 2012. In the late 1990s colorectal cancer was the fourth leading cause of cancer death in adults under 50; it now ranks first. <sup class="c" data-ref="Siegel2026CRC,Siegel2024" title="Source 492,495">492,495</sup>`,
   hook:`CRC is now the leading cause of cancer death in US adults under 50. <sup class="c" data-ref="Siegel2026CRC" title="Source 495">495</sup>`}},
 {from:.8,at:.97,k:'Birth cohort · US SEER 1974–2013',t:'Born later, higher risk',
  txt:`Risk tracks when you were born more than when you were diagnosed <span class="ev est">Established</span>. In US SEER data (490,305 cases, 1974–2013), people born around 1990 had about double the colon cancer risk (incidence rate ratio 2.40, 95% CI 1.11–5.19) and four times the rectal cancer risk (IRR 4.32, 2.19–8.51) of people born around 1950. Risk is rising in every US generation born after about 1950, and after about 1960 in Canada, Australia and England. Under 50, the distribution tilts to the left side: rectum 5.7, distal colon 4.1 and proximal colon 2.9 per 100,000, while at 65 and older the proximal colon dominates. <sup class="c" data-ref="Siegel2017,Siegel2026CRC" title="Source 489,495">489,495</sup>`,
  pt:`Someone born in 1990 has a higher chance of bowel cancer at a given age than someone born in 1950 had at that age. <sup class="c" data-ref="Siegel2017" title="Source 489">489</sup>`,
  hook:`Born ~1990 vs ~1950: colon IRR 2.40, rectal IRR 4.32. The young-onset rise is led by the distal colon and rectum. <sup class="c" data-ref="Siegel2017,Siegel2026CRC" title="Source 489,495">489,495</sup>`,
  mortNote:'Birth-cohort ratios in the sources are for incidence; this scene shows incidence in both modes.'}
];
const WH_SURV_STEPS=[
 {from:0,at:.58,k:'US five-year relative survival',t:'Better over five decades',
  txt:`Five-year relative survival for colorectal cancer in the US rose from 50% for people diagnosed in 1975–77 to 61% in 1995–97 and 65% in 2015–2021 (64% in the 2014–20 table). Regional-stage survival rose from 52% to 74% and distant-stage survival from 5% to 15%. Distant-stage rectal cancer had one of the largest gains of any cancer, from 8% in the mid-1990s to 18%. New treatment options have doubled overall survival for advanced disease to about 3 years. <sup class="c" data-ref="Siegel2025,Siegel2026,Siegel2026CRC,Dekker2019" title="Source 123,493,494,495">123,493,494,495</sup>`,
  pt:`More people survive bowel cancer than 50 years ago. These are averages across many people, not a promise for any one person. <sup class="c" data-ref="Siegel2026CRC" title="Source 495">495</sup>`,
  hook:`US 5-year relative survival: 50% (1975–77) → 65% (2015–21). <sup class="c" data-ref="Siegel2026CRC" title="Source 495">495</sup>`},
 {from:.62,at:1,k:'By SEER summary stage, 2015–2021',t:'Stage at diagnosis',
  txt:`Stage is the strongest predictor: 91% for localized disease, 74% for regional and 15% for distant. Regional-stage survival ranges from 81% under 50 to 69% at 65 and older; distant-stage survival is 23% under 50, 17% at 50–64 and 10% at 65 or older. Yet 60% of US cases were diagnosed at an advanced (regional or distant) stage in 2019, up from 52% in the mid-2000s. Internationally, CONCORD-3 found the highest colon cancer survival in South Korea (71.8%, 2010–14). How stage is defined: <a href="#staging" data-go="staging">Staging: TNM calculator</a>. <sup class="c" data-ref="Siegel2026,Siegel2026CRC,Siegel2023CRC,Allemani2018" title="Source 7,491,494,495">7,491,494,495</sup>`,
  pt:`Cancer found early is much easier to treat. In the US, about 9 in 10 people with cancer that has not spread are alive 5 years later. These are averages, not a promise for any one person. <sup class="c" data-ref="Siegel2026CRC" title="Source 495">495</sup>`,
  hook:`5-year relative survival by stage: localized 91%, regional 74%, distant 15%. <sup class="c" data-ref="Siegel2026" title="Source 494">494</sup>`}
];

inits.what=()=>{
  const svg=$('#whSvg'),rg=$('#whT');let M='inc',setSt=()=>{};
  const fmt=n=>Math.round(n).toLocaleString('en-US');
  const T=(x,y,s,c='t-sm',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${s}</text>`;
  const R=(x,y,w,h,st)=>`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(Math.max(0,w))}" height="${f1(Math.max(0,h))}" style="${st}"/>`;
  const Ln=(x1,y1,x2,y2,st)=>`<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" style="${st}"/>`;
  const lines=(x,y,arr,c='t-sm',dy=15,st='')=>arr.map((l,i)=>T(x,y+i*dy,l,c,st)).join('');
  const loc=(ph,t)=>{const a=WH_STEPS[ph].from,b=ph<WH_STEPS.length-1?WH_STEPS[ph+1].from:1.04;return ease(clamp((t-a)/((b-a)*.75)))};
  const head=(x,y,s)=>T(x,y,s,'t-sm','fill:var(--tumour);font-weight:600');
  const incOnly=(N)=>M==='mort'?T(N?380:700,N?548:372,'deaths not broken down here: showing incidence','t-xs t-end','fill:var(--warn)'):'';

  /* ---- scene 0: rank and 2024 counts ---- */
  function s0(N,p){const inc=M==='inc';let s='';
    const bars=inc?[['Lung',12.4],['Female breast',11.6],['Colorectum',9.6]]:[['Lung',18.7],['Colorectum',9.3]];
    const bx0=N?112:130,bx1=N?350:400,by=N?62:86,gap=N?42:62,X=v=>bx0+(bx1-bx0)*v/25;
    s+=head(20,N?30:40,inc?'SHARE OF ALL NEW CANCERS · WORLD 2022':'SHARE OF ALL CANCER DEATHS · WORLD 2022');
    const yb=by+gap*3-10;
    [0,5,10,15,20,25].forEach(v=>{s+=Ln(X(v),by-10,X(v),yb,v?'stroke:var(--line);stroke-dasharray:2 4':'stroke:var(--line)')+T(X(v),yb+14,v+'%','t-xs t-mid')});
    bars.forEach(([n,v],i)=>{const y=by+i*gap,crc=n==='Colorectum',k=clamp(p*1.7-i*.25);
      s+=T(bx0-8,y+15,n,'t-lbl t-end',crc?'fill:var(--tumour)':'');
      s+=R(bx0,y,(X(v)-bx0)*k,22,`fill:${crc?'var(--tumour)':'var(--muted)'};opacity:${crc?1:.4}`);
      if(k>.97)s+=T(X(v)+6,y+16,f1(v)+'%  #'+(i+1),'t-sm',crc?'fill:var(--tumour);font-weight:600':'')});
    const rx=N?20:462,ry=N?266:62,W=N?360:236;
    const tot=inc?2041007:917895,men=inc?1138656:504807,wom=inc?902351:413088,am=inc?22.4:9.6,aw=inc?15.3:6.3,k=ramp(p,.15,.85);
    s+=head(rx,ry,inc?'NEW CASES · WORLD 2024':'DEATHS · WORLD 2024');
    s+=T(rx,ry+44,fmt(tot*k),'t-big','font-size:36px;fill:'+(inc?'var(--tumour)':'var(--ink)'));
    s+=T(rx,ry+66,inc?'rank 3 among all cancers':'rank 2 among cancer deaths','t-sm');
    const by2=ry+92,wm=W*men/tot*k,ww=W*wom/tot*k;
    s+=R(rx,by2,wm,24,'fill:var(--accent)')+R(rx+wm+2,by2,ww,24,'fill:var(--brand)');
    if(k>.97){s+=T(rx,by2+42,'Men '+fmt(men),'t-sm','fill:var(--accent);font-weight:600')+T(rx,by2+58,'ASR '+am,'t-xs');
      s+=T(rx+W,by2+42,'Women '+fmt(wom),'t-sm t-end','fill:var(--brand);font-weight:600')+T(rx+W,by2+58,'ASR '+aw,'t-xs t-end');
      s+=lines(rx,by2+86,['ASR: age-standardised rate per 100,000,','world standard population'],'t-xs',13)}
    if(p>.6){const cy=N?526:350;s+=T(20,cy,'Cumulative risk, birth to 74 (2024): ','t-sm')+T(N?20:262,N?cy+20:cy,inc?'men 2.58% · women 1.72%':'men 1.00% · women 0.64%','t-lbl',inc?'fill:var(--tumour)':'')}
    return s}

  /* ---- scene 1: 2020 → 2024 → 2040 ---- */
  function s1(N,p){const inc=M==='inc';let s='';
    const D=inc?[[2020,1.9,'over 1.9 M'],[2024,2.041,'2.04 M'],[2040,3.2,'3.2 M']]:[[2020,.93,'930,000'],[2024,.918,'917,895'],[2040,1.6,'1.6 M']];
    const x0=N?56:76,x1=N?384:440,y0=N?62:64,y1=N?300:318,Y=v=>y1-(y1-y0)*v/3.5;
    s+=head(20,N?30:40,inc?'NEW CASES A YEAR, WORLD':'DEATHS A YEAR, WORLD');
    [0,1,2,3].forEach(v=>s+=Ln(x0,Y(v),x1,Y(v),v?'stroke:var(--line);stroke-dasharray:2 4':'stroke:var(--line)')+T(x0-8,Y(v)+4,v?v+' M':'0','t-xs t-end'));
    const step=(x1-x0)/3,bw=N?64:78;
    D.forEach(([yr,v,l],i)=>{const k=ease(clamp(p*3.2-i*1.05)),cx=x0+step*(i+.5),h=(y1-Y(v))*k,proj=yr===2040;
      const col=inc?'var(--tumour)':'var(--ink)';
      s+=R(cx-bw/2,y1-h,bw,h,`fill:${col};opacity:${proj?.22:.85}`);
      if(proj&&k>0)s+=R(cx-bw/2,y1-h,bw,h,`fill:none;stroke:${col};stroke-width:1.6;stroke-dasharray:5 4`);
      s+=T(cx,y1+18,yr,'t-lbl t-mid')+T(cx,y1+32,proj?'projected':i?'GLOBOCAN 2024':'GLOBOCAN 2020','t-xs t-mid');
      if(k>.96)s+=T(cx,Y(v)-9,l,'t-lbl t-mid',`fill:${col}`)});
    const tx=N?20:478,ty=N?372:90;
    const L=inc?['2040 projection (from 2020):','3.2 million new cases a year,','mostly in high or very high','HDI countries.','','2020 and 2024 are separate','estimation rounds, not one','series.']
      :['2040 projection (from 2020):','1.6 million deaths a year.','','About 10% of cases worldwide','are attributed to modifiable','risk factors.','','2020 and 2024 are separate','estimation rounds.'];
    if(p>.7)s+=`<g style="opacity:${f1(ramp(p,.7,.9))}">${lines(tx,ty,L,'t-sm',17)}</g>`;
    return s}

  /* ---- scene 2: regional variation ---- */
  function s2(N,p){const inc=M==='inc';let s='';
    const rows=inc?[['Highest 2020: men, Aus/NZ & Europe',40.6],['Highest regions 2024: men',30,40],['Highest regions 2024: women',24,32],['World average 2024: men',22.4],['World average 2024: women',15.3],['Lowest regions 2024 (Africa, S-C Asia)',5,8],['Lowest 2020: women, Southern Asia',4.4]]
      :[['Highest 2020: men, Eastern Europe',20.2],['World average 2024: men',9.6],['World average 2024: women',6.3],['Lowest 2020: women, Southern Asia',2.5]];
    s+=head(20,N?30:40,inc?'INCIDENCE PER 100,000 (AGE-STANDARDISED)':'MORTALITY PER 100,000 (AGE-STANDARDISED)');
    const ax0=N?24:300,ax1=N?372:690,X=v=>ax0+(ax1-ax0)*v/45,ry0=N?70:70,dy=N?(inc?64:90):(inc?38:56);
    const yb=N?510:inc?330:300;
    [0,10,20,30,40].forEach(v=>s+=Ln(X(v),ry0-14,X(v),yb-12,v?'stroke:var(--line);stroke-dasharray:2 4':'stroke:var(--line)')+T(X(v),yb+2,v,'t-xs t-mid'));
    const col=inc?'var(--tumour)':'var(--ink)';
    rows.forEach((r,i)=>{const k=clamp(p*2.4-i*.22),y=ry0+i*dy;if(k<=0)return;
      if(N)s+=T(ax0,y-8,r[0],'t-sm');else s+=T(ax0-12,y+4,r[0],'t-sm t-end');
      const yy=N?y+6:y;
      if(r.length>2){s+=R(X(r[1]),yy-6,(X(r[2])-X(r[1]))*k,12,`fill:${col};opacity:.75;rx:6`);if(k>.97)s+=T(X(r[2])+8,yy+4,r[1]+'–'+r[2],'t-sm',`fill:${col}`)}
      else{s+=`<circle cx="${f1(X(r[1]))}" cy="${f1(yy)}" r="${f1(6.5*k)}" style="fill:${/World/.test(r[0])?'var(--panel)':col};stroke:${col};stroke-width:2"/>`;if(k>.97)s+=T(X(r[1])+11,yy+4,r[1],'t-sm',`fill:${col}`)}});
    if(p>.75)s+=T(N?20:ax0,N?545:yb+30,inc?'Incidence up to 4× higher in higher- than lower-HDI countries':'Case fatality is higher in lower-HDI countries, so death rates vary less','t-sm','fill:var(--ink)');
    return s}

  /* ---- scene 3: where in the bowel ---- */
  function s3(N,p){let s='';
    const cx=N?40:46,cy=N?52:66,sc=N?1.07:1.02;
    s+=head(20,N?30:40,'WHERE IT STARTS · US, ALL AGES, 2018–2022');
    const C=colon(cx,cy,sc,{w:24});s+=C.svg;
    const seg=(u0,u1,col,op,w)=>{let d='';for(let i=0;i<=50;i++){const q=C.at(lerp(u0,u1,i/50));d+=(i?'L':'M')+f1(q[0])+' '+f1(q[1])}return `<path d="${d}" style="fill:none;stroke:${col};stroke-width:${w};stroke-linecap:round;stroke-linejoin:round;opacity:${f1(op)}"/>`};
    const G=[{n:'Proximal colon',u:[0,.55],v:13.3,sh:38,c:'var(--accent)'},{n:'Distal colon',u:[.55,.89],v:8.7,sh:25,c:'var(--polyp)'},{n:'Rectum',u:[.89,1],v:11.1,sh:31,c:'var(--tumour)'},{n:'Not specified',v:2.2,sh:6,c:'var(--muted)'}];
    G.forEach((g,i)=>{const k=clamp(p*4.2-i*.95);g.k=k;if(g.u&&k>0)s+=seg(g.u[0],g.u[0]+(g.u[1]-g.u[0])*k,g.c,.35+.55*g.sh/38,17)});
    const P=(u)=>C.at(u);
    if(G[0].k>.9){const a=P(.38);s+=T(a[0],a[1]+40,'Proximal','t-lbl t-mid','fill:var(--accent)')+T(a[0],a[1]+54,'(right) colon','t-xs t-mid')}
    if(G[1].k>.9){const a=P(.64);s+=T(a[0]-24,a[1]+4,'Distal','t-lbl t-end','fill:var(--polyp-line)')+T(a[0]-24,a[1]+18,'(left) colon','t-xs t-end')}
    if(G[2].k>.9){const a=P(.95);s+=T(a[0]+20,a[1]+4,'Rectum','t-lbl','fill:var(--tumour)')}
    const c0=P(0);s+=T(c0[0]+20,c0[1]+38,'caecum','t-xs');
    const bx=N?20:420,by=N?352:78,dy=N?48:64,bw=N?250:200;
    G.forEach((g,i)=>{const y=by+i*dy,k=g.k;
      s+=T(bx,y,g.n,'t-lbl',`fill:${g.c==='var(--muted)'?'var(--ink)':g.c==='var(--polyp)'?'var(--polyp-line)':g.c}`);
      s+=R(bx,y+7,bw*g.sh/40*k,16,`fill:${g.c};opacity:.85`);
      if(k>.97)s+=T(bx+bw*g.sh/40+8,y+20,'≈'+g.sh+'% · '+g.v,'t-sm')});
    s+=lines(bx,by+4*dy+4,N?['Shares derived from ACS incidence rates','(per 100,000), not published as shares.']:['Shares derived from ACS incidence rates;','numbers after the share are per 100,000.'],'t-xs',13,'fill:var(--warn)');
    return s+incOnly(N)}

  /* ---- scene 4: age ---- */
  function s4(N,p){const inc=M==='inc';let s='';
    s+=head(20,N?30:40,'US 2026 PROJECTION BY AGE');
    const x0=N?78:96,W=N?300:590,ys=N?[70,128]:[72,124];
    const A=[{n:'Under 50',c:'var(--tumour)'},{n:'50–64',c:'var(--gold)'},{n:'65+',c:'var(--accent)'}];
    const B=[{l:'Cases',v:[24640,47600,86610],pc:[16,30,55],on:inc},{l:'Deaths',v:[3890,13480,37860],pc:[7,24,69],on:!inc}];
    const k=ease(clamp(p*1.6));
    B.forEach((b,bi)=>{const y=ys[bi],tot=b.v.reduce((a,c)=>a+c,0);let xx=x0;
      s+=T(x0-10,y+17,b.l,'t-lbl t-end',b.on?'':'fill:var(--muted)');
      b.v.forEach((v,i)=>{const w=W*v/tot*k;s+=R(xx,y,w-1.5,24,`fill:${A[i].c};opacity:${b.on?.9:.3}`);
        if(k>.97){s+=T(xx+w/2,y+40,b.pc[i]+'%','t-sm t-mid',b.on?'fill:var(--ink);font-weight:600':'');if(bi===0)s+=T(xx+w/2,y-6,A[i].n,'t-xs t-mid')}
        xx+=w})});
    const tr=inc?[{a:'Ages 20–49',v:3,per:'a year, 2013–2022'},{a:'Ages 50–64',v:.4,per:'a year, 2013–2022'},{a:'65 and older',v:-2.5,per:'a year, 2013–2022'}]
      :[{a:'Under 50',v:1,per:'a year since 2004'},{a:'Ages 50–64',v:1.2,per:'a year, 2019–2023'},{a:'65 and older',v:-2.3,per:'a year since 2012'}];
    const kt=ramp(p,.35,.85),ty=N?218:214;
    s+=T(20,ty,inc?'INCIDENCE TREND':'DEATH-RATE TREND','t-sm','fill:var(--muted);font-weight:600');
    tr.forEach((r,i)=>{const cx=N?20:20+i*235,cy=N?ty+28+i*84:ty+30,w=N?150:150,base=cy+46,col=r.v>0?'var(--bad)':'var(--good)';
      s+=T(cx,cy,r.a,'t-lbl',`fill:${A[i].c}`)+T(N?cx+110:cx,N?cy:cy+15,r.per,'t-xs');
      s+=Ln(cx,base,cx+w,base,'stroke:var(--line)');
      s+=Ln(cx,base,cx+w*kt,base-r.v*9*kt,`stroke:${col};stroke-width:3;stroke-linecap:round`);
      if(kt>.97){const lx=N?cx+w+16:cx+w+8;s+=T(lx,base-r.v*9+4,(r.v>0?'+':'−')+Math.abs(r.v)+'%','t-lbl',`fill:${col}`)}});
    if(p>.8)s+=T(20,N?548:368,inc?'45% of new US diagnoses are now under 65 (27% in 1995)':'Now the leading cause of cancer death in US adults under 50','t-sm','fill:var(--ink)');
    s+=T(N?380:700,N?190:186,'slopes drawn from the stated annual change','t-xs t-end');
    return s}

  /* ---- scene 5: birth cohort ---- */
  function s5(N,p){let s='';
    s+=head(20,N?30:40,'RISK VS PEOPLE BORN ~1950 · US SEER 1974–2013');
    const x0=N?92:100,x1=N?372:390,lv=v=>Math.log(v/.7)/Math.log(10/.7),X=v=>x0+(x1-x0)*lv(v);
    const yA=N?62:70,rows=[{n:'Colon',v:2.4,lo:1.11,hi:5.19,c:'var(--polyp)'},{n:'Rectum',v:4.32,lo:2.19,hi:8.51,c:'var(--tumour)'}];
    const k=ease(clamp(p*1.5)),yAx=yA+112;
    [1,2,4,8].forEach(v=>s+=Ln(X(v),yA-6,X(v),yAx-12,v===1?'stroke:var(--ink);stroke-width:1.4;stroke-dasharray:4 3':'stroke:var(--line);stroke-dasharray:2 4')+T(X(v),yAx,v+'×','t-xs t-mid'));
    s+=T(X(1)-4,yA-12,'born ~1950 = 1','t-xs t-end');
    rows.forEach((r,i)=>{const y=yA+12+i*46,vk=Math.exp(Math.log(r.v)*k);
      s+=T(x0-10,y+15,r.n,'t-lbl t-end',`fill:${r.c==='var(--polyp)'?'var(--polyp-line)':r.c}`);
      s+=R(X(1),y,X(vk)-X(1),22,`fill:${r.c};opacity:.85`);
      if(k>.97){s+=Ln(X(r.lo),y+11,X(r.hi),y+11,'stroke:var(--ink);stroke-width:1.4')+Ln(X(r.lo),y+5,X(r.lo),y+17,'stroke:var(--ink);stroke-width:1.4')+Ln(X(r.hi),y+5,X(r.hi),y+17,'stroke:var(--ink);stroke-width:1.4');
        s+=T(X(r.v),y-4,r.v.toFixed(2)+'×','t-lbl t-mid',`fill:${r.c==='var(--polyp)'?'var(--polyp-line)':r.c}`)}});
    s+=T(x0,yAx+16,k>.97?'born ~1990 vs ~1950, with 95% CI · bars grow for effect, ends are data':'born ~1950 → ~1990 …','t-xs');
    /* early-onset 1998 → 2022 */
    const sy=N?240:262,sx0=N?60:90,sx1=N?250:280,sH=N?70:62,V=v=>sy+sH-sH*v/7,k2=ramp(p,.3,.75);
    s+=T(20,sy-14,'AGES 20–49, PER 100,000: 1998 → 2022','t-sm','fill:var(--muted);font-weight:600');
    s+=Ln(sx0,sy+sH,sx1,sy+sH,'stroke:var(--line)')+T(sx0,sy+sH+14,'1998','t-xs t-mid')+T(sx1,sy+sH+14,'2022','t-xs t-mid');
    [['Rectum',3.6,6.6,'var(--tumour)'],['Sigmoid',2.1,3.7,'var(--polyp)']].forEach(([n,a,b,c])=>{
      s+=Ln(sx0,V(a),lerp(sx0,sx1,k2),V(lerp(a,b,k2)),`stroke:${c};stroke-width:3;stroke-linecap:round`)+`<circle cx="${sx0}" cy="${f1(V(a))}" r="3.5" style="fill:${c}"/>`+T(sx0-8,V(a)+4,a,'t-xs t-end');
      if(k2>.97)s+=`<circle cx="${sx1}" cy="${f1(V(b))}" r="3.5" style="fill:${c}"/>`+T(sx1+8,V(b)+4,n+' '+b,'t-sm',`fill:${c==='var(--polyp)'?'var(--polyp-line)':c}`)});
    if(k2>.97)s+=T(sx1+8,sy+sH-2,'proximal +26%','t-xs');
    /* subsite by age */
    const bx=N?20:450,by=N?380:84,k3=ramp(p,.5,.95),bw=N?220:170;
    s+=T(bx,by-14,N?'BY SUBSITE, 2018–2022 (per 100,000)':'BY SUBSITE, 2018–2022','t-sm','fill:var(--muted);font-weight:600');
    const grp=[{n:'Under 50 (ages 20–49)',mx:6,r:[['Rectum',5.7,'var(--tumour)'],['Distal colon',4.1,'var(--polyp)'],['Proximal colon',2.9,'var(--accent)']]},
      {n:'65 and older',mx:75,r:[['Proximal colon',73.1,'var(--accent)'],['Rectum',36.6,'var(--tumour)'],['Distal colon',31.5,'var(--polyp)']]}];
    grp.forEach((g,gi)=>{const gy=by+gi*(N?84:128);s+=T(bx,gy+4,g.n,'t-lbl');
      g.r.forEach(([n,v,c],i)=>{const y=gy+14+i*(N?20:30);s+=T(bx,y+(N?12:10),n,'t-xs');
        const bx2=bx+(N?96:0),yy=N?y+3:y+14;s+=R(bx2,yy,bw*v/g.mx*k3,N?11:10,`fill:${c};opacity:.85`);
        if(k3>.97)s+=T(bx2+bw*v/g.mx+6,yy+(N?10:9),v,'t-xs','fill:var(--ink)')})});
    if(!N)s+=T(bx,by+250,'separate scales for each age group','t-xs');
    return s+incOnly(N)}

  const SC=[s0,s1,s2,s3,s4,s5];
  const READ=[
    ()=>M==='inc'?'<span>world 2024 <b>2,041,007 cases</b></span><span>rank <b>3</b></span><span>men <b>1,138,656</b> · women <b>902,351</b></span>':'<span>world 2024 <b>917,895 deaths</b></span><span>rank <b>2</b></span>',
    ()=>M==='inc'?'<span>2020 <b>&gt;1.9 M</b></span><span>2024 <b>2.04 M</b></span><span>2040 <b>3.2 M (projected)</b></span>':'<span>2020 <b>930,000</b></span><span>2024 <b>917,895</b></span><span>2040 <b>1.6 M (projected)</b></span>',
    ()=>M==='inc'?'<span>range <b>5–8 to 30–40</b> per 100,000</span><span>2020 extremes <b>4.4 → 40.6</b></span>':'<span>2020 extremes <b>2.5 → 20.2</b> per 100,000</span>',
    ()=>'<span>proximal <b>≈38%</b></span><span>distal <b>≈25%</b></span><span>rectum <b>≈31%</b></span><span>unspecified <b>≈6%</b></span><span>(derived)</span>',
    ()=>M==='inc'?'<span>under 50 <b>16%</b> of cases</span><span>20–49 trend <b>+3%/yr</b></span>':'<span>under 50 <b>7%</b> of deaths</span><span>under-50 trend <b>+1%/yr</b></span>',
    ()=>'<span>colon IRR <b>2.40</b></span><span>rectal IRR <b>4.32</b></span><span>born ~1990 vs ~1950</span>'];
  function draw(t){const N=vb(svg,'720 380','400 560'),ph=phaseOf(WH_STEPS,t),p=loc(ph,t);
    svg.innerHTML=SC[ph](N,p);
    setSt(ph);
    const S=WH_STEPS[ph];let P=S;
    if(M==='mort'){if(S.mort)P=Object.assign({},S,S.mort);else if(S.mortNote)P=Object.assign({},S,{txt:S.txt+` <i>${S.mortNote}</i>`})}
    $('#whNote').innerHTML=noteHTML(P);
    $('#whRead').innerHTML=READ[ph]()}
  const stop=playWire(rg,$('#whPlay'),draw,30000,'Replay','what');
  setSt=stepWire($('#whSteps'),WH_STEPS,rg,draw,stop);
  $$('[data-wh-m]').forEach(b=>b.addEventListener('click',()=>{M=b.dataset.whM;$$('[data-wh-m]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---- survival over time, then by stage ---- */
  const sv=$('#whSurv'),sr=$('#whSurvT');let setS=()=>{};
  const SER=[{n:'Regional stage',c:'var(--polyp)',lc:'var(--polyp-line)',p:[[1976,52],[1996,66],[2018,74]]},{n:'All stages',c:'var(--tumour)',lc:'var(--tumour)',p:[[1976,50],[1996,61],[2018,65]]},{n:'Distant stage',c:'var(--ink)',lc:'var(--ink)',p:[[1976,5],[1996,8],[2018,15]]}];
  function drawS(t){const N=vb(sv,'720 300','400 480');let s='';
    const x0=N?46:60,x1=N?330:370,y0=N?36:34,y1=N?206:240,X=y=>x0+(x1-x0)*(y-1970)/(2025-1970),Y=v=>y1-(y1-y0)*v/100;
    const yc=lerp(1974,2020,ramp(t,0,.56));
    s+=T(x0-40,y0-14,'5-YEAR RELATIVE SURVIVAL, US','t-sm','fill:var(--tumour);font-weight:600');
    [0,25,50,75,100].forEach(v=>s+=Ln(x0,Y(v),x1,Y(v),v?'stroke:var(--line);stroke-dasharray:2 4':'stroke:var(--line)')+T(x0-6,Y(v)+4,v+'%','t-xs t-end'));
    [[1976,'1975–77'],[1996,'1995–97'],[2018,'2015–21']].forEach(([y,l])=>s+=T(X(y),y1+16,l,'t-xs t-mid'));
    s+=T(x1,y1+30,'year of diagnosis','t-xs t-end');
    SER.forEach(S=>{const pts=S.p.filter(q=>q[0]<=yc);let d='';
      S.p.forEach((q,i)=>{if(i===0||q[0]<=yc){d+=(i?'L':'M')+f1(X(q[0]))+' '+f1(Y(q[1]))}else if(S.p[i-1][0]<yc){const a=S.p[i-1],u=(yc-a[0])/(q[0]-a[0]);d+='L'+f1(X(yc))+' '+f1(Y(lerp(a[1],q[1],u)))}});
      if(yc>=1976)s+=`<path d="${d}" style="fill:none;stroke:${S.c};stroke-width:2.6;stroke-linejoin:round"/>`;
      pts.forEach(q=>s+=`<circle cx="${f1(X(q[0]))}" cy="${f1(Y(q[1]))}" r="4" style="fill:var(--panel);stroke:${S.c};stroke-width:2"/>`+(q[0]>2010?T(X(q[0])+9,Y(q[1])+(S.n==='Regional stage'?0:S.n==='All stages'?10:4),q[1]+'% '+({'Regional stage':'regional','All stages':'all stages','Distant stage':'distant'})[S.n],'t-sm',`fill:${S.lc};font-weight:600`):T(X(q[0]),Y(q[1])-(S.n==='Regional stage'?9:-16),q[1]+'%','t-sm t-mid',`fill:${S.lc};font-weight:600`)))});
    s+=Ln(X(yc),y0,X(yc),y1,'stroke:var(--ink);opacity:.25');
    /* by stage */
    const k=ease(ramp(t,.62,.9)),k2=ramp(t,.88,1);
    const bx0=N?60:470,bx1=N?370:700,by0=N?284:y0,by1=N?434:y1,BY=v=>by1-(by1-by0)*v/100;
    s+=T(bx0-(N?40:10),by0-14,'BY STAGE, 2015–2021','t-sm',`fill:var(--tumour);font-weight:600;opacity:${t<.6?.35:1}`);
    s+=Ln(bx0,by1,bx1,by1,'stroke:var(--line)');
    const ST=[['Localized',91,'var(--good)'],['Regional',74,'var(--polyp)'],['Distant',15,'var(--tumour)']],bw=N?54:48,gp=(bx1-bx0)/3;
    ST.forEach(([n,v,c],i)=>{const cx=bx0+gp*(i+.5),h=(by1-BY(v))*k;
      s+=R(cx-bw/2,by1-h,bw,h,`fill:${c};opacity:.85`)+T(cx,by1+16,n,'t-xs t-mid');
      if(k>.97)s+=T(cx,BY(v)-8,v+'%','t-lbl t-mid')});
    if(k2>0){const g=`opacity:${f1(k2)}`;
      s+=`<g style="${g}">`+T(bx0+gp*1.5,by1+30,'81% under 50 · 69% at 65+','t-xs t-mid')+T(bx0+gp*2.5,BY(15)-26,'<50: 23%','t-xs t-mid')+T(bx0+gp*2.5,BY(15)-40,'50–64: 17%','t-xs t-mid')+T(bx0+gp*2.5,BY(15)-54,'65+: 10%','t-xs t-mid')+'</g>'}
    sv.innerHTML=s;
    const ph=phaseOf(WH_SURV_STEPS,t);setS(ph);$('#whSurvNote').innerHTML=noteHTML(WH_SURV_STEPS[ph])}
  const stopS=playWire(sr,$('#whSurvPlay'),drawS,12000,'Replay','what');
  setS=stepWire($('#whSurvSteps'),WH_SURV_STEPS,sr,drawS,stopS);
  drawS(+sr.value);
};
/* =============== 1.2 The colon & its lining =============== */
/* the tour: u along the bowel (0 caecum .. 1 anal verge) is t/.7; the wall zoom fills t .7..1 */
const CL_SEGS=[
 {id:'caecum',n:'Caecum',o:'Midgut',a:'SMA',side:'Right',f:'Where the small bowel joins the colon'},
 {id:'ascending',n:'Ascending colon',o:'Midgut',a:'SMA',side:'Right',f:'MSI and CIMP tumours lean right'},
 {id:'transverse',n:'Transverse colon',o:'Midgut, then hindgut',a:'SMA, then IMA (distal third)',side:'Right, then left',f:'Griffith point: a watershed at the splenic flexure'},
 {id:'descending',n:'Descending colon',o:'Hindgut',a:'IMA',side:'Left',f:'CIN and FAP tumours lean left'},
 {id:'sigmoid',n:'Sigmoid colon',o:'Hindgut',a:'IMA',side:'Left',f:'Shares the hindgut supply, nerves and lymph'},
 {id:'rectum',n:'Rectum',o:'Hindgut',a:'IMA (superior rectal artery)',side:'Left',f:'Share of US colorectal cancers in the rectum'}
];
const CL_STEPS=[
 {from:0,at:.04,k:'Right colon · midgut',t:'Caecum & ascending colon',
  txt:`The large intestine runs from the caecum, where the small bowel joins it, through the colon and rectum to the anal canal. It is shorter than the small intestine but wider, and is marked by three longitudinal muscle bands (teniae coli), pouches (haustra) and fat-filled tags. Its main job is to absorb water, vitamins and electrolytes. The caecum, ascending colon and first part of the transverse colon come from the embryonic midgut and are supplied by the superior mesenteric artery (SMA), which arises at L1. <sup class="c" data-ref="Omole2025,Azzouz2023,Omole2026b" title="Source 31,415,417">31,415,417</sup>`,
  pt:`The large bowel is a wide tube about 1.5 metres long. Its main job is to take water back out of what we cannot digest.`,
  hook:`Right colon (caecum, ascending, proximal transverse) = midgut = SMA. Right-sided tumours are more often MSI and CIMP. <sup class="c" data-ref="Iacopetta2002" title="Source 247">247</sup>`},
 {from:.19,at:.29,k:'Across the top',t:'Transverse colon',
  txt:`The transverse colon crosses from right to left. Its first two-thirds belong to the midgut (SMA); its distal third belongs to the hindgut, supplied by the inferior mesenteric artery (IMA, arising at L3). The marginal artery of Drummond links the two territories, but fewer than 50% of people have a fully continuous channel around the splenic flexure (Griffith point), a watershed for ischaemia. <sup class="c" data-ref="Omole2026a,Omole2026b" title="Source 416,417">416,417</sup>`,
  pt:`Two main arteries feed the colon, one for the right side and one for the left. They meet near the upper left corner.`,
  hook:`Griffith point = splenic flexure watershed between SMA and IMA territory; the marginal artery is incomplete there in more than half of people.`},
 {from:.385,at:.48,k:'Left colon · hindgut',t:'Descending & sigmoid colon',
  txt:`The descending and sigmoid colon are hindgut structures. The IMA supplies them through its left colic and sigmoid branches, and the sigmoid shares the hindgut's nerves and lymphatic drainage. Lymph drains along the supplying vessels, which is why standard cancer surgery removes the mesocolon as an intact envelope with its lymph nodes and ties the vessels at their roots (complete mesocolic excision). In one centre this went with a fall in 5-year local recurrence from 6.5% to 3.6% (historical comparison). <sup class="c" data-ref="Omole2026a,Harkins2023,Hohenberger2009" title="Source 225,237,416">225,237,416</sup>`,
  pt:`Lymph from each part of the bowel drains along its blood vessels. Surgeons remove the bowel with that whole envelope of fat and lymph nodes.`,
  hook:`Left colon = hindgut = IMA. Left-sided tumours are more often CIN; FAP tumours occur mainly on the left. <sup class="c" data-ref="Iacopetta2002" title="Source 247">247</sup>`},
 {from:.623,at:.66,k:'The last segment',t:'Rectum',
  txt:`The rectum is the most distal part of the large intestine, between the sigmoid colon and the anal canal, and the most posterior organ in the pelvis. The IMA ends here as the superior rectal artery. In the US, the rectum's share of colorectal cancers rose from 27% in 1995 to 31% in 2019. Rectal cancers spread to the lungs more often than colon cancers (odds ratio 2.80 for synchronous lung metastases). <sup class="c" data-ref="Wang2023,Omole2026a,Siegel2023CRC,Mitry2010" title="Source 370,416,491,570">370,416,491,570</sup>`,
  pt:`The rectum is the last part of the bowel before the back passage. A growing share of bowel cancers start here.`,
  hook:`US data show a shift to the left: rectal cancer rose from 27% to 31% of CRC between 1995 and 2019. <sup class="c" data-ref="Siegel2023CRC" title="Source 491">491</sup>`},
 {from:.72,at:.94,k:'Zoom in',t:'The wall in layers',
  txt:`Cut through the wall and it has layers: the mucosa on the inside (the lining, folded into crypts), the submucosa, the muscularis propria, the subserosa and serosa, and fat beyond the wall. How far a cancer has grown through these layers is the "T" of its stage: see <a href="#staging" data-go="staging">Staging: TNM calculator</a>. Almost every colorectal cancer starts in the mucosa, in a crypt, which is where the next animation goes. <sup class="c" data-ref="Humphries2008,Fearon1990" title="Source 181,244">181,244</sup>`,
  pt:`The bowel wall is built in layers like a sandwich. Cancer starts in the thin inner lining and can grow outwards through the others.`,
  hook:`The intestinal epithelium is the most rapidly self-renewing tissue in adult mammals. <sup class="c" data-ref="Barker2007" title="Source 42">42</sup>`}
];
const CL_CR_N=[
 {from:0,at:.03,k:'Day 0',t:'Stem cells at the base',
  txt:`At the bottom of each crypt sit a few stem cells, marked by Lgr5, a Wnt target gene. In mouse lineage tracing a single Lgr5+ cell made every type of lining cell over 60 days. Human colonic crypts hold 5 to 10 active stem cells (mean 7); mitochondrial lineage tracing gives a "functional" number of 5 to 6. They replace one another about 1.3 times per crypt per year, by neutral drift. <sup class="c" data-ref="Barker2007,Nicholson2018,Baker2014" title="Source 37,42,402">37,42,402</sup>`,
  pt:`Each pit in the lining has a handful of stem cells at the bottom. They keep making new lining cells all your life.`,
  hook:`Lgr5 marks crypt-base stem cells (Clevers lab, 2007). Human colonic crypts: about 7 active stem cells each. <sup class="c" data-ref="Barker2007,Nicholson2018" title="Source 42,402">42,402</sup>`},
 {from:.15,at:.4,k:'Days 1–3',t:'Daughters climb as Wnt fades',
  txt:`The Wnt signal is strongest at the crypt base and fades towards the top (shaded band). Wnts drive most adult tissue stem cells. Daughter cells pushed upward leave the Wnt-rich niche, stop dividing and mature, many into mucus-making goblet cells: about 72 to 75 per crypt section in adults up to 60, and 51 to 54 in adults aged 67 or older. <sup class="c" data-ref="Nusse2017,Clevers2012,Baidoo2024" title="Source 34,104,411">34,104,411</sup>`,
  pt:`New cells are pushed up the wall like a slow escalator. As they leave the bottom, they stop dividing and take on their adult jobs.`,
  hook:`Wnt high at the base keeps cells dividing; low Wnt near the top lets them differentiate.`},
 {from:.6,at:.7,k:'The brake',t:'A destruction complex',
  txt:`Inside each cell, without a Wnt signal, a "destruction complex" breaks β-catenin down. Axin scaffolds the kinases GSK-3 and CK1, which phosphorylate a motif near β-catenin's N-terminus; with APC and PP2A in the complex, β-TrCP recognises the phosphorylated motif and ubiquitinates it, and the proteasome degrades it. The inset shows this cycle. <sup class="c" data-ref="Stamos2013" title="Source 510">510</sup>`,
  pt:`Each cell has a shredder that keeps a growth signal, β-catenin, switched off. APC is one of the shredder's key parts.`,
  hook:`Destruction complex = APC + Axin + GSK-3 + CK1 (+ PP2A); β-TrCP ubiquitinates phosphorylated β-catenin. <sup class="c" data-ref="Stamos2013" title="Source 510">510</sup>`},
 {from:.85,at:.95,k:'Days 4–5',t:'Shed after 4–5 days',
  txt:`The traced cell reaches the mouth of the crypt and is shed into the bowel. The single layer of lining cells is renewed every 4 to 5 days, which makes the intestinal epithelium the most rapidly self-renewing tissue in adult mammals. Because stem cells keep dividing all life, a tumour in a 90-year-old has nearly twice as many passenger mutations as an identical tumour in a 45-year-old. <sup class="c" data-ref="VanDerFlier2009,Barker2007,Vogelstein2013" title="Source 42,551,567">42,551,567</sup>`,
  pt:`Your bowel lining replaces itself every few days. All that copying of DNA is why small mistakes add up with age.`,
  hook:`Epithelial turnover: 4–5 days. Crypt fission, by contrast, is rare in normal colon (about once every 30–40 years per crypt). <sup class="c" data-ref="VanDerFlier2009,Baker2014" title="Source 37,551">37,551</sup>`}
];
const CL_CR_A=[
 {from:0,at:.04,k:'The first hit',t:'One stem cell loses APC',
  txt:`APC mutations occur early: they were found in 63% of adenomas and 60% of carcinomas, including adenomas as small as 0.5 cm, and the frequency stayed the same from benign to malignant stages. In Vogelstein's summary, an APC mutation in the colon gives a microscopic clone that grows into a slow-growing small adenoma. <sup class="c" data-ref="Powell1992,Vogelstein2013" title="Source 437,567">437,567</sup>`,
  pt:`One stem cell picks up a fault in the APC gene, the gene that normally keeps the growth signal switched off.`,
  hook:`APC is the "gatekeeper": mutated early, and no more often in cancers than in adenomas. <sup class="c" data-ref="Powell1992" title="Source 437">437</sup>`},
 {from:.15,at:.35,k:'Years (schematic)',t:'The clone takes over the crypt',
  txt:`A mutation becomes fixed in a crypt in two steps: one of about 7 stem cells is hit, then its progeny take over the whole crypt by drift and selection, which takes several years. The amber cells are the mutant clone. In adenomas, crypt fission speeds up by at least an order of magnitude, so the clone spreads to neighbouring crypts. <sup class="c" data-ref="Nicholson2018,Baker2014" title="Source 37,402">37,402</sup>`,
  pt:`The faulty stem cell's offspring gradually take over the whole pit, and then start to spread to the pits next door.`,
  hook:`Fixation = hit one stem cell, then win the crypt (years). Adenomas divide crypts at least 10 times faster. <sup class="c" data-ref="Nicholson2018,Baker2014" title="Source 37,402">37,402</sup>`},
 {from:.45,at:.55,k:'Inside the mutant cells',t:'β-catenin switches genes on',
  txt:`Without APC the destruction complex fails. β-catenin builds up, enters the nucleus and binds TCF-4 (TCF7L2): APC-deficient colon cancer cells carry a permanently active β-catenin–TCF-4 complex, and putting APC back removes β-catenin from TCF-4. Tumours with intact APC instead carry activating β-catenin (CTNNB1) mutations at its phosphorylation sites. In TCGA, 93% of colorectal cancers had a deregulated Wnt pathway, about 80% through APC or CTNNB1. <sup class="c" data-ref="Korinek1997,Morin1997,TCGA2012" title="Source 293,378,524">293,378,524</sup>`,
  pt:`With the shredder broken, the growth signal piles up and reaches the cell's control centre, telling it to keep dividing.`,
  hook:`APC loss → β-catenin stabilised → β-catenin/TCF4 → Wnt target genes on, whatever the Wnt signal outside. <sup class="c" data-ref="Korinek1997,Morin1997" title="Source 293,378">293,378</sup>`},
 {from:.7,at:.92,k:'Cells stop leaving',t:'Cells pile up: a microscopic clone',
  txt:`Mutant cells behave as if they were still in the Wnt-rich base: they keep dividing, and instead of being shed they crowd the crypt mouth. Pathologists call such an early lesion an aberrant crypt focus; Vogelstein describes it as a microscopic clone that can grow into a small adenoma. Further hits are needed for cancer: see <a href="#sequence" data-go="sequence">From polyp to cancer</a>. <sup class="c" data-ref="Vogelstein2013,Fearon1990" title="Source 181,567">181,567</sup>`,
  pt:`The cells that should have been shed stay and pile up. This tiny lump is the very first step towards a polyp.`,
  hook:`Most colorectal cancers start with a Wnt hit (APC or CTNNB1), then gather KRAS, SMAD4/18q and TP53/17p changes. <sup class="c" data-ref="TCGA2012,Vogelstein1988" title="Source 524,566">524,566</sup>`}
];
/* the kit's crypt path, reproduced so a traced cell can travel along it */
function clCryptAt(x,y,w,h,u){const cw=w*.34,L=h-w/2,arc=Math.PI*w/2*.5,tot=2*L+arc,d=u*tot;
  if(d<L)return[x-w/2+cw/2,y+d];if(d<L+arc){const a=Math.PI-(d-L)/arc*Math.PI;return[x+Math.cos(a)*(w/2-cw/2),y+L+Math.sin(a)*(w/2-cw/2)]}return[x+w/2-cw/2,y+L-(d-L-arc)]}
function clWrap(t,n){const w=t.split(' '),L=[];let l='';w.forEach(x=>{if((l+' '+x).trim().length>n){L.push(l);l=x}else l=(l+' '+x).trim()});if(l)L.push(l);return L}
const clFmt=n=>Math.round(n).toLocaleString('en-GB');

inits.colon=()=>{
  /* ---------- 1. the bowel tour ---------- */
  const svg=$('#clSvg'),rg=$('#clT');let setSt=()=>{};
  function draw(t){
    const N=vb(svg,'720 380','400 640');
    const C=N?{x:52,y:40,s:.95}:{x:44,y:44,s:1.08};
    const zoom=ramp(t,.7,.8),u=clamp(t/.7);
    const col=colon(C.x,C.y,C.s,{hl:null});
    const SEG=col.seg;let si=0;CL_SEGS.forEach((S,i)=>{if(u>=SEG[S.id][0])si=i});
    const S=CL_SEGS[si];
    let s=`<defs>${marker('clArr','var(--muted)')}</defs>`;
    s+=`<g style="opacity:${f1(1-zoom*.55)}">`;
    /* arteries: the aorta with the SMA (right colon) and the IMA (left colon) */
    const W=300*C.s,H=240*C.s,ax=C.x+W*.45,mid=si<=2,ima=si>=2;
    const art=(d,on)=>`<path d="${d}" style="fill:none;stroke:var(--vessel);stroke-width:${on?3.2:1.6};opacity:${on?1:.35};stroke-linecap:round"/>`;
    s+=`<path d="M${f1(ax)} ${f1(C.y+H*.22)}V${f1(C.y+H*1.02)}" style="stroke:var(--vessel);stroke-width:5;opacity:.55;stroke-linecap:round"/>`;
    s+=art(`M${f1(ax)} ${f1(C.y+H*.34)}Q${f1(C.x+W*.2)} ${f1(C.y+H*.3)} ${f1(C.x+W*.04)} ${f1(C.y+H*.55)}M${f1(ax)} ${f1(C.y+H*.34)}Q${f1(C.x+W*.3)} ${f1(C.y+H*.12)} ${f1(C.x+W*.3)} ${f1(C.y+H*.04)}`,mid&&t<.7);
    s+=art(`M${f1(ax)} ${f1(C.y+H*.62)}Q${f1(C.x+W*.8)} ${f1(C.y+H*.5)} ${f1(C.x+W*.96)} ${f1(C.y+H*.42)}M${f1(ax)} ${f1(C.y+H*.62)}Q${f1(C.x+W*.68)} ${f1(C.y+H*.66)} ${f1(C.x+W*.74)} ${f1(C.y+H*.74)}M${f1(ax)} ${f1(C.y+H*.62)}Q${f1(C.x+W*.56)} ${f1(C.y+H*.74)} ${f1(C.x+W*.56)} ${f1(C.y+H*.9)}M${f1(ax)} ${f1(C.y+H*.34)}Q${f1(C.x+W*.62)} ${f1(C.y+H*.2)} ${f1(C.x+W*.74)} ${f1(C.y+H*.04)}`,ima&&t<.7);
    s+=`<text x="${f1(ax-6)}" y="${f1(C.y+H*.34-6)}" class="t-sm t-end" style="fill:var(--vessel)">SMA</text>`;
    s+=`<text x="${f1(ax+7)}" y="${f1(C.y+H*.62+14)}" class="t-sm" style="fill:var(--vessel)">IMA</text>`;
    s+=`<text x="${f1(ax+7)}" y="${f1(C.y+H*.24)}" class="t-xs">aorta</text>`;
    s+=col.svg;
    /* every segment already passed keeps a faint glow; the current one is bright */
    CL_SEGS.forEach((Q,i)=>{if(i>si||t>=.7&&Q.id!=='descending')return;const [a,b]=SEG[Q.id];let d='';const b2=i===si?Math.min(b,Math.max(a+.01,u)):b;
      for(let k=0;k<=24;k++){const p=col.at(lerp(a,b2,k/24));d+=(k?'L':'M')+f1(p[0])+' '+f1(p[1])}
      s+=`<path d="${d}" style="fill:none;stroke:var(--tumour);stroke-width:${f1(22*C.s*(i===si?.55:.3))};stroke-linecap:round;stroke-linejoin:round;opacity:${i===si?.75:.25}"/>`});
    /* segment labels */
    const lab=[['Caecum',.01,14,22,''],['Ascending',.16,16,0,''],['Transverse',.41,0,30,'t-mid'],['Descending',.64,-16,0,'t-end'],['Sigmoid',.8,-6,-20,'t-end'],['Rectum',.95,16,4,'']];
    lab.forEach(([n,uu,dx,dy,cl],i)=>{const p=col.at(uu);s+=`<text x="${f1(p[0]+dx)}" y="${f1(p[1]+dy)}" class="${i===si&&t<.7?'t-lbl':'t-sm'} ${cl}">${n}</text>`});
    if(si===2&&t<.7){const p=col.at(.55);s+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="${f1(20*C.s)}" style="fill:none;stroke:var(--gold);stroke-width:2;stroke-dasharray:4 3"/><text x="${f1(p[0]-8)}" y="${f1(p[1]-26)}" class="t-sm t-mid" style="fill:var(--gold)">Griffith point</text>`}
    /* the travelling marker */
    if(t<.7){const p=col.at(u);s+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="7" style="fill:var(--gold);stroke:var(--panel);stroke-width:2"/>`}
    s+='</g>';
    /* ---- right (or lower) panel: segment card, then the wall ---- */
    const P=N?{x:20,y:318,w:360}:{x:420,y:44,w:290};
    if(zoom<1){s+=`<g style="opacity:${f1(1-zoom)}">`;
      s+=`<rect x="${P.x}" y="${P.y}" width="${P.w}" height="${N?300:290}" rx="12" style="fill:var(--panel-2)"/>`;
      let yy=P.y+26;s+=`<text x="${P.x+16}" y="${yy}" class="t-xs">SEGMENT ${si+1} OF 6</text>`;yy+=26;
      s+=`<text x="${P.x+16}" y="${yy}" class="t-big">${S.n}</text>`;yy+=28;
      [['Embryo',S.o],['Artery',S.a],['Side',S.side]].forEach(([k,v])=>{s+=`<text x="${P.x+16}" y="${yy}" class="t-xs">${k.toUpperCase()}</text><text x="${P.x+82}" y="${yy}" class="t-lbl" style="font-size:12.5px">${v}</text>`;yy+=22});
      yy+=4;clWrap(S.f,N?44:38).forEach(l=>{s+=`<text x="${P.x+16}" y="${yy}" class="t-sm" style="fill:var(--ink)">${l}</text>`;yy+=16});yy+=2;
      if(S.id==='rectum'){const bw=P.w-120;[[1995,27],[2019,31]].forEach(([yr,v],i)=>{const by=yy+6+i*24;s+=`<text x="${P.x+16}" y="${by+11}" class="t-sm">${yr}</text><rect x="${P.x+56}" y="${by}" width="${f1(bw*v/50*ramp(t,.62,.68))}" height="14" rx="3" style="fill:var(--tumour);opacity:${i?1:.55}"/><text x="${f1(P.x+62+bw*v/50*ramp(t,.62,.68))}" y="${by+11}" class="t-sm" style="fill:var(--ink)">${v}%</text>`});yy+=54}
      /* the length bar: published mean and range */
      const ly=P.y+(N?270:256),lx=P.x+16,lw=P.w-32,sc=v=>lx+lw*(v-100)/(200-100);
      s+=`<text x="${lx}" y="${ly-14}" class="t-xs">MEASURED COLON LENGTH (CT, 295 ADULTS)</text>`;
      s+=`<line x1="${lx}" x2="${lx+lw}" y1="${ly}" y2="${ly}" class="axis"/><rect x="${f1(sc(109.7))}" y="${ly-5}" width="${f1(sc(195.9)-sc(109.7))}" height="10" rx="5" style="fill:var(--mucosa);opacity:.7"/>`;
      s+=`<line x1="${f1(sc(150.3))}" x2="${f1(sc(150.3))}" y1="${ly-9}" y2="${ly+9}" style="stroke:var(--ink);stroke-width:2.5"/><text x="${f1(sc(150.3))}" y="${ly+22}" class="t-sm t-mid" style="fill:var(--ink)">150.3 cm mean</text>`;
      s+=`<text x="${f1(sc(109.7))}" y="${ly+22}" class="t-xs t-mid">110</text><text x="${f1(sc(195.9))}" y="${ly+22}" class="t-xs t-mid">196</text>`;
      s+='</g>'}
    if(zoom>0){
      const p=col.at(.62),Wx=N?{x:30,y:338,w:170,h:220}:{x:430,y:70,w:140,h:250};
      s+=`<g style="opacity:${f1(zoom)}">`;
      s+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="16" style="fill:none;stroke:var(--ink);stroke-width:2"/>`;
      s+=`<path d="M${f1(p[0]+(N?-6:12))} ${f1(p[1]+(N?15:-10))}L${Wx.x} ${Wx.y}M${f1(p[0]+(N?6:12))} ${f1(p[1]+(N?15:10))}L${N?Wx.x+Wx.w:Wx.x} ${N?Wx.y:Wx.y+Wx.h}" style="stroke:var(--muted);stroke-width:1;stroke-dasharray:3 3"/>`;
      const wl=wall(Wx.x,Wx.y,Wx.w,{h:Wx.h});s+=wl.svg;
      const rev=lerp(Wx.y,wl.y.bottom+2,ramp(t,.76,.92));
      s+=`<rect x="${Wx.x-2}" y="${f1(rev)}" width="${N?372:290}" height="${f1(Math.max(0,wl.y.bottom+4-rev))}" style="fill:var(--panel)"/>`;
      s+=`<text x="${Wx.x}" y="${Wx.y-12}" class="t-sm" style="fill:var(--ink)">Lumen (inside of the bowel)</text>`;
      if(t>.9){s+=`<path d="M${Wx.x+Wx.w*.5} ${f1(wl.y.submucosa+16)}V${f1(wl.y.submucosa+3)}" style="stroke:var(--ink);stroke-width:1.4" marker-end="url(#clArr)"/>`;
        s+=`<text x="${Wx.x+Wx.w*.5}" y="${f1(wl.y.submucosa+28)}" class="t-xs t-mid" style="fill:var(--ink)">crypts in the mucosa</text>`}
      s+='</g>'}
    svg.innerHTML=s;
    const ph=phaseOf(CL_STEPS,t);setSt(ph);$('#clNote').innerHTML=noteHTML(CL_STEPS[ph]);
    $('#clRead').innerHTML=t<.7?`<span>Segment <b>${S.n}</b></span><span>Origin <b>${S.o}</b></span><span>Artery <b>${S.a}</b></span>`:`<span>View <b>the bowel wall in section</b></span><span>Layers shown <b>${Math.min(6,1+Math.floor(ramp(t,.76,.92)*6))} of 6</b></span>`;
  }
  const stop=playWire(rg,$('#clPlay'),draw,16000,'Replay','colon');
  setSt=stepWire($('#clSteps'),CL_STEPS,rg,draw,stop);draw(+rg.value);

  /* ---------- 2. the crypt ---------- */
  const cs=$('#clCrypt'),cr=$('#clCrT');let apc=false,setCr=()=>{};
  const RATE=12.5/4.5;/* cell slots climbed per day: base to mouth in about 4.5 days */
  function inset(t,apcLost){
    let g=`<rect x="0" y="0" width="300" height="300" rx="12" style="fill:var(--panel-2)"/>`;
    g+=`<text x="14" y="22" class="t-xs">INSIDE EACH LINING CELL</text>`;
    /* the complex */
    const dim=apcLost?.35:1;
    const parts=[['Axin',95,98,17,'var(--accent-soft)'],['APC',62,72,15,'var(--brand-soft)'],['GSK-3',130,70,15,'var(--gold-soft)'],['CK1',128,126,12,'var(--gold-soft)']];
    parts.forEach(([n,x,y,r,c])=>{const isA=n==='APC';g+=`<circle cx="${x}" cy="${y}" r="${r}" style="fill:${c};stroke:var(--muted);stroke-width:1.2;opacity:${isA&&apcLost?.45:dim}"/><text x="${x}" y="${y+3.5}" class="t-xs t-mid" style="fill:var(--ink);opacity:${isA&&apcLost?.5:1}">${n}</text>`});
    if(apcLost)g+=`<path d="M50 60L74 84M74 60L50 84" style="stroke:var(--bad);stroke-width:3;stroke-linecap:round"/>`;
    g+=`<text x="95" y="160" class="t-xs t-mid">destruction complex</text>`;
    /* proteasome */
    g+=`<rect x="214" y="80" width="54" height="36" rx="10" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.4;opacity:${dim}"/>`;
    for(let k=1;k<4;k++)g+=`<line x1="${214+k*13.5}" x2="${214+k*13.5}" y1="82" y2="114" style="stroke:var(--line);stroke-width:1"/>`;
    g+=`<text x="241" y="134" class="t-xs t-mid">proteasome</text>`;
    /* nucleus */
    g+=`<ellipse cx="150" cy="218" rx="134" ry="50" style="fill:var(--field);stroke:var(--nuc);stroke-width:1.6"/><text x="40" y="214" class="t-xs" style="fill:var(--nuc)">NUCLEUS</text>`;
    g+=`<path d="${pathFn(v=>.5+.35*Math.sin(v*Math.PI*10),30,270,230,242,80)}" style="fill:none;stroke:var(--nuc);stroke-width:1.6;opacity:.7"/>`;
    g+=`<rect x="128" y="220" width="44" height="18" rx="5" style="fill:var(--panel);stroke:var(--nuc);stroke-width:1.2"/><text x="150" y="233" class="t-xs t-mid" style="fill:var(--ink)">TCF4</text>`;
    const bc=(x,y,o=1,p=0)=>`<circle cx="${f1(x)}" cy="${f1(y)}" r="9" style="fill:var(--accent);opacity:${f1(o)}"/>`+(p?`<circle cx="${f1(x+8)}" cy="${f1(y-7)}" r="4.5" style="fill:var(--gold)"/><text x="${f1(x+8)}" y="${f1(y-4.6)}" class="t-xs t-mid" style="fill:var(--panel);font-size:7px">P</text>`:'');
    if(!apcLost){
      const c=(t*5)%1;
      if(c<.3){const k=ease(c/.3);g+=bc(lerp(12,92,k),lerp(90,98,k))}
      else if(c<.5){g+=bc(95,98,1,1)}
      else if(c<.72){const k=ease((c-.5)/.22),x=lerp(95,206,k),y=lerp(98,98,k);g+=bc(x,y,1,1);for(let j=0;j<3;j++)g+=`<circle cx="${f1(x-12-j*7)}" cy="${f1(y+8)}" r="3.4" style="fill:var(--brand)"/>`}
      else{const k=(c-.72)/.28;for(let j=0;j<4;j++){const a=-.9+j*.6;g+=`<rect x="${f1(272+k*26*Math.cos(a))}" y="${f1(96+k*26*Math.sin(a))}" width="5" height="5" style="fill:var(--accent);opacity:${f1(1-k)}"/>`}}
      g+=`<text x="150" y="290" class="t-sm t-mid">Wnt target genes: off</text>`;
      g+=`<text x="14" y="40" class="t-xs">β-catenin is tagged, then destroyed</text>`;
    }else{
      const rr=rng(31),k=1+Math.floor(ramp(t,0,.7)*7);
      for(let j=0;j<k;j++)g+=bc(150+rr()*48,62+rr()*90,.9);
      const nin=Math.floor(ramp(t,.25,.9)*4);
      for(let j=0;j<nin;j++)g+=bc(110+j*20,202,1);
      const c=(t*5)%1;if(c<.6)g+=bc(lerp(12,170,c/.6),lerp(92,205,ease(c/.6)),.8);
      g+=`<path d="M176 229h46" style="stroke:var(--tumour);stroke-width:2.4" marker-end="url(#clArr2)"/>`;
      g+=`<text x="150" y="290" class="t-sm t-mid" style="fill:var(--tumour)">${nin?'Growth genes ON (β-catenin + TCF4)':'β-catenin is building up'}</text>`;
      g+=`<text x="14" y="40" class="t-xs" style="fill:var(--bad)">APC lost: the complex cannot work</text>`;
    }
    return g}
  function crDraw(t){
    const N=vb(cs,'720 400','400 766');
    const steps=apc?CL_CR_A:CL_CR_N;
    const K=N?{x:190,y:96,w:112,h:256,wb:96,lx:258}:{x:200,y:100,w:124,h:276,wb:100,lx:272};
    const day=t*5;
    const Nn=11,st=3,NC=2*Nn+st,mid=(NC-1)/2;
    let mut=[],crowd=0,sh=0;
    if(apc){const m=Math.round(lerp(1,NC,ramp(t,.04,.55)));for(let i=0;i<NC;i++)if(Math.abs(i-mid)<=(m-1)/2)mut.push(i);crowd=ramp(t,.62,1)}
    else sh=(day*RATE)%1;
    let s=`<defs>${marker('clArr2','var(--tumour)')}<linearGradient id="clWnt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--accent);stop-opacity:.04"/><stop offset="1" style="stop-color:var(--accent);stop-opacity:.85"/></linearGradient></defs>`;
    /* lumen and surface */
    s+=`<rect x="${K.x-140}" y="${K.y-58}" width="${N?320:330}" height="58" rx="10" style="fill:var(--field)"/>`;
    s+=`<text x="${K.x-130}" y="${K.y-42}" class="t-xs">LUMEN</text>`;
    s+=`<rect x="${K.x-140}" y="${K.y}" width="${N?320:330}" height="${K.h+4}" rx="4" style="fill:var(--submucosa);opacity:.4"/>`;
    /* Wnt band */
    s+=`<rect x="${K.wb}" y="${K.y}" width="16" height="${K.h}" rx="6" style="fill:url(#clWnt)"/>`;
    if(apc&&mut.length>4)s+=`<rect x="${K.wb}" y="${K.y}" width="16" height="${K.h}" rx="6" style="fill:var(--polyp);opacity:${f1(.6*ramp(t,.3,.6))}"/>`;
    s+=`<text transform="translate(${K.wb-6} ${K.y+K.h/2}) rotate(-90)" class="t-sm t-mid">Wnt signal</text>`;
    s+=`<text x="${K.wb+8}" y="${K.y-6}" class="t-xs t-mid">low</text><text x="${K.wb+8}" y="${K.y+K.h+14}" class="t-xs t-mid">high</text>`;
    const cy=crypt(K.x,K.y,K.w,K.h,{n:Nn,stem:st,shift:sh,mut,crowd});s+=cy.svg;
    /* β-catenin in mutant nuclei */
    if(apc&&t>.4)cy.cells.forEach(c=>{if(mut.includes(c.i))s+=`<circle cx="${f1(c.x)}" cy="${f1(c.y)}" r="3" style="fill:var(--accent);opacity:${f1(ramp(t,.4,.6))}"/>`});
    const r=Math.min(K.w*.34*.48,K.h/(Nn*2.1));
    if(!apc){
      /* cells shed at the mouth float into the lumen */
      for(let k=0;k<3;k++){const ph=((day*RATE)+k)/3%1;[-1,1].forEach(sd=>{const x=K.x+sd*(K.w/2-K.w*.17)+sd*ph*18,y=K.y-r-ph*50;
        s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r*.9)}" style="fill:var(--mucosa);stroke:var(--mucosa-line);opacity:${f1(.9*(1-ph))}"/>`})}
      /* the traced cell */
      const slots=day*RATE,uu=.5-slots/NC;let p;
      if(uu>=0)p=clCryptAt(K.x,K.y,K.w,K.h,uu);else{const q=clCryptAt(K.x,K.y,K.w,K.h,0);p=[q[0]-(slots-mid-.5)*6,K.y-r-(slots-mid-.5)*14]}
      const op=uu>=0?1:clamp(1-(slots-mid-.5)/2.5);
      s+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="${f1(r+3)}" style="fill:none;stroke:var(--ink);stroke-width:2.4;opacity:${f1(op)}"/>`;
      if(op>.05)s+=uu>=0?`<text x="${K.x}" y="${f1(Math.min(p[1]+4,K.y+K.h-K.w*.5))}" class="t-xs t-mid" style="fill:var(--ink)">traced</text>`:`<text x="${f1(p[0]+r+6)}" y="${f1(p[1]+4)}" class="t-xs" style="fill:var(--ink);opacity:${f1(op)}">shed</text>`;
    }
    /* labels */
    s+=`<text x="${K.lx}" y="${K.y+K.h-4}" class="t-sm" style="fill:var(--stem)">Stem cells (Lgr5+)</text>`;
    if(!apc){s+=`<text x="${K.lx}" y="${K.y+K.h*.45}" class="t-sm">Maturing cells</text><text x="${K.lx}" y="${K.y+K.h*.45+14}" class="t-xs">climb towards the top</text>`;
      s+=`<text x="${K.lx}" y="${K.y-30}" class="t-sm">Old cells shed</text>`}
    else{s+=`<text x="${K.lx}" y="${K.y+K.h*.45}" class="t-sm" style="fill:var(--polyp-line)">APC-mutant clone</text><text x="${K.lx}" y="${K.y+K.h*.45+14}" class="t-xs">${mut.length}/${NC} cells mutant</text>`;
      if(crowd>.2)s+=`<text x="${K.lx}" y="${K.y+K.h*.2}" class="t-sm" style="fill:var(--polyp-line)">Cells pile up,</text><text x="${K.lx}" y="${K.y+K.h*.2+14}" class="t-sm" style="fill:var(--polyp-line)">none are shed</text>`}
    const title=apc?(t<.15?'One stem cell loses APC':t<.45?'The clone takes over':t<.7?'β-catenin reaches the nucleus':'An aberrant crypt focus'):`Day ${day.toFixed(1)} of a 4–5 day cycle`;
    s+=`<text x="${N?20:20}" y="${N?24:26}" class="t-big" style="fill:${apc?'var(--polyp-line)':'var(--ink)'}">${title}</text>`;
    s+=`<g transform="translate(${N?12:405} ${N?384:56}) scale(${N?1.25:1})">${inset(t,apc)}</g>`;
    cs.innerHTML=s;
    const ph=phaseOf(steps,t);setCr(ph);$('#clCrNote').innerHTML=noteHTML(steps[ph]);
    $('#clCrRead').innerHTML=apc?`<span>Mode <b>APC lost</b></span><span>Mutant cells <b>${mut.length}/${NC}</b></span><span>Shedding <b>stopped</b></span>`:
      `<span>Day <b>${day.toFixed(1)}</b></span><span>Traced cell <b>${day<4.5?'climbing':'shed'}</b></span><span><i style="display:inline-block;width:10px;height:10px;border-radius:50%;background:var(--stem);vertical-align:middle"></i> stem <i style="display:inline-block;width:10px;height:10px;border-radius:50%;background:var(--mucosa);vertical-align:middle;margin-left:6px"></i> lining <i style="display:inline-block;width:10px;height:10px;border-radius:50%;background:var(--accent);vertical-align:middle;margin-left:6px"></i> β-catenin</span>`;
  }
  const crStop=playWire(cr,$('#clCrPlay'),crDraw,14000,'Replay','colon');
  function crWire(){const old=$('#clCrSteps'),nu=old.cloneNode(false);old.replaceWith(nu);setCr=stepWire(nu,apc?CL_CR_A:CL_CR_N,cr,crDraw,crStop)}
  $('#clApc').addEventListener('click',()=>{crStop();apc=!apc;$('#clApc').setAttribute('aria-pressed',apc);
    $('#clCrLbl').textContent=apc?'Years (schematic)':'Days';
    $('#clCrCap').innerHTML=apc?'Schematic, not to scale. The time axis is not measured: fixing a mutation in a crypt takes several years. <sup class="c" data-ref="Nicholson2018" title="Source 402">402</sup>':'Schematic, not to scale. A real crypt holds far more cells; about 7 of them are active stem cells. <sup class="c" data-ref="Nicholson2018,Baker2014" title="Source 37,402">37,402</sup>';
    cr.value=apc?.04:.05;crWire();crDraw(+cr.value)});
  crWire();crDraw(+cr.value);

  /* ---------- 3. a lifetime of renewal ---------- */
  const ag=$('#clAge');
  function calc(){const a=+ag.value;$('#clAgeOut').textContent=a;
    const gob=a<=60?'72 / 75':a>=67?'51 / 54':'between the groups';
    const g1=v=>v<10?f1(v):String(Math.round(v));
    const cards=[
      [`${clFmt(a*365/5)}–${clFmt(a*365/4)}`,`times the lining has been rebuilt, at one renewal every 4–5 days`],
      [`${g1(a*.65)}–${g1(a*2.7)}`,`stem-cell replacements inside one crypt (mean ${g1(a*1.3)}), at 0.65–2.7 a year`],
      [`${f1(a/40)}–${f1(a/30)}`,`crypt fissions per crypt at one per 30–40 years (Baker 2014)`],
      [`${f1(a*.007)} or ${f1(a*.011)}`,`fissions per crypt at 0.7% a year (Nicholson 2018) or 0.011 a year (Baker 2019): estimates differ several-fold`],
      [gob,`goblet cells per crypt section, ascending / descending colon (published groups: up to 60, and 67 or older)`],
      ['≈2×',`passenger mutations in a tumour at 90 compared with an identical tumour at 45, because stem cells divide all life`]];
    $('#clNums').innerHTML=cards.map(([b,s])=>`<div class="clnum"><b>${b}</b><span>${s}</span></div>`).join('')}
  ag.addEventListener('input',calc);calc();
  $('#clAgeCap').innerHTML='Rates: renewal every 4–5 days; stem-cell replacement 1.3 per crypt per year (0.65–2.7); crypt fission once every 30–40 years, 0.7% of crypts a year, or 0.011 a year (Early evidence); goblet-cell counts by age group; passenger mutations by age. <sup class="c" data-ref="VanDerFlier2009,Nicholson2018,Baker2014,Baker2019,Baidoo2024,Vogelstein2013" title="Source 34,37,38,402,551,567">34,37,38,402,551,567</sup>';
};
/* =============== 1.3 From polyp to cancer =============== */
const SQ_Y=22;/* schematic years on the scrubber */
const sqT=y=>y/SQ_Y;
const SQ_STEPS={
 conv:[
  {from:0,at:sqT(.9),k:'The first hit · timing not measured',t:'APC: the gatekeeper',
   txt:`The sequence usually starts with a Wnt-pathway hit. APC mutations were found in 63% of adenomas, including ones as small as 0.5 cm, and in 60% of carcinomas: the frequency does not rise from benign to malignant, so the hit comes first. In Vogelstein's summary, an APC mutation gives a microscopic clone that grows into a slow-growing small adenoma. In TCGA, 93% of colorectal cancers had a deregulated Wnt pathway. <sup class="c" data-ref="Powell1992,Vogelstein2013,TCGA2012" title="Source 437,524,567">437,524,567</sup>`,
   pt:`It usually starts when one cell in the bowel lining loses a gene called APC, which normally keeps cell growth in check.`,
   hook:`APC = gatekeeper: mutated early (63% of adenomas), not more often in cancers (60%). <sup class="c" data-ref="Powell1992" title="Source 437">437</sup>`},
  {from:sqT(1.5),at:sqT(2.3),k:'A small polyp',t:'Small adenoma (under 1 cm)',
   txt:`A small adenoma, under 1 cm. At this stage few carry the later changes: ras mutations in 9% and 18q loss in 11–13% (Vogelstein 1988, 172 tumours). Pooled screening studies found an adenoma in 30.2% of average-risk North Americans. Small polyps do not all grow: of 6–9 mm polyps watched by CT colonography for a mean 4.7 years, 24.9% grew, 62.0% stayed stable and 13.1% shrank, and the growing ones more often had advanced histology (23.2% vs 7.0%). <sup class="c" data-ref="Vogelstein1988,Heitman2009,Pooler2023" title="Source 233,435,566">233,435,566</sup>`,
   pt:`About 3 in 10 adults of screening age have at least one small, harmless polyp of this kind. Most never become cancer.`,
   hook:`Small polyps (6–9 mm) over about 5 years: a quarter grew, most stayed the same, about 1 in 8 shrank. <sup class="c" data-ref="Pooler2023" title="Source 435">435</sup>`},
  {from:sqT(3),at:sqT(7.5),k:'Second clonal expansion',t:'KRAS: a large adenoma',
   txt:`A second mutation such as KRAS unleashes a second clonal expansion. ras mutations rose from 9% of adenomas under 1 cm to 58% of adenomas over 1 cm (47% of carcinomas). From here the comparative-sequencing clock runs: about 17 years for a large benign tumour to evolve into an advanced cancer. Of polyps of 10 mm or more left in place in the Mayo series, 37% enlarged. <sup class="c" data-ref="Vogelstein2013,Vogelstein1988,Jones2008,Stryker1987" title="Source 270,516,566,567">270,516,566,567</sup>`,
   pt:`A second gene change makes the polyp grow bigger. This usually takes years, which is the window that screening uses.`,
   hook:`KRAS appears as adenomas grow: 9% under 1 cm vs 58% over 1 cm. <sup class="c" data-ref="Vogelstein1988" title="Source 566">566</sup>`},
  {from:sqT(12),at:sqT(14.5),k:'Advanced adenoma',t:'18q/SMAD4 loss: high-grade dysplasia',
   txt:`Loss of chromosome 18q, which carries SMAD4, marks the advanced adenoma: 11–13% of early adenomas, 47% of advanced adenomas and 73% of carcinomas. The cells look increasingly abnormal (high-grade dysplasia). In German screening data, advanced adenomas became cancer at about 2.6% a year at ages 55–59, rising to 5.6% (women) and 5.1% (men) at 80 or over. Advanced adenomas were found in 5.7% of average-risk adults. <sup class="c" data-ref="Vogelstein1988,Brenner2007,Heitman2009" title="Source 72,233,566">72,233,566</sup>`,
   pt:`The polyp is now large and its cells look more abnormal. Each year, a few of these become cancer, more often in older people.`,
   hook:`Advanced adenoma → cancer: 2.6–5.6% per year (annual rates, not lifetime risks). <sup class="c" data-ref="Brenner2007" title="Source 72">72</sup>`},
  {from:sqT(17),at:sqT(18.6),k:'The line is crossed',t:'TP53/17p: invasive carcinoma',
   txt:`Loss of 17p, with TP53, was found in 75% of carcinomas and usually only in carcinomas. The tumour breaks through the muscularis mucosae into the submucosa and becomes an invasive cancer. Further mutations (PIK3CA, SMAD4, TP53) make a malignant, invasive tumour; a typical one carries 2–8 driver mutations. The accumulation of changes matters more than their exact order. Cancer can be found by screening for a mean of 4.5 to 5.8 years before it causes symptoms. <sup class="c" data-ref="Vogelstein1988,Vogelstein2013,Fearon1990,Brenner2011" title="Source 73,181,566,567">73,181,566,567</sup>`,
   pt:`The growth breaks through the thin muscle under the lining. That is the moment it becomes a cancer.`,
   hook:`Fearon–Vogelstein: APC → KRAS → 18q/SMAD4 → 17p/TP53; the accumulation, not the order, matters most. <sup class="c" data-ref="Fearon1990,Vogelstein1988" title="Source 181,566">181,566</sup>`},
  {from:sqT(20),at:sqT(21.4),k:'Under 2 years more',t:'A metastatic clone',
   txt:`Comparative lesion sequencing suggested that cells within an advanced cancer gain the ability to metastasise in under 2 years, with few if any extra selective events. Other modelling suggests seeding is often much earlier (Early evidence), and primary and metastasis differ little genetically. Colorectal cancer spreads most often to the liver: synchronous liver metastases in 14.5–17.7% in registries, about a quarter at any time. Rectal cancers reach the lungs more often (synchronous OR 2.80). <sup class="c" data-ref="Jones2008,Hu2019,Manfredi2006,Hackl2014,Mitry2010" title="Source 212,242,270,348,370">212,242,270,348,370</sup>`,
   pt:`Some cancer cells get into the blood and settle in other organs, most often the liver. Cancers low in the rectum reach the lungs more often.`,
   hook:`About 17 years from large adenoma to advanced cancer, but under 2 years to a metastatic clone. <sup class="c" data-ref="Jones2008" title="Source 270">270</sup>`}],
 serr:[
  {from:0,at:sqT(.9),k:'A different first hit',t:'BRAF V600E',
   txt:`The serrated pathway starts differently: RAS or RAF mutations (in most cases BRAF), disrupted Wnt signalling and widespread CpG island methylation. WHO 2019 groups serrated polyps into hyperplastic polyps, traditional serrated adenomas and sessile serrated lesions (SSLs); TSAs and SSLs are cancer precursors. <sup class="c" data-ref="Crockett2019" title="Source 116">116</sup>`,
   pt:`Here the first change is in a different gene, BRAF. The polyp it makes has a saw-tooth edge under the microscope.`,
   hook:`Serrated pathway = BRAF (or KRAS) + CIMP, often ending in MSI through MLH1 methylation. <sup class="c" data-ref="Crockett2019,Weisenberger2006" title="Source 116,575">116,575</sup>`},
  {from:sqT(1.5),at:sqT(5),k:'Flat and right-sided',t:'A sessile serrated lesion',
   txt:`Serrated-class polyps are found in 20–40% of average-risk people, mostly hyperplastic. SSLs, the commonest premalignant type, are found in up to 15% by high-detecting endoscopists. They are flat and mostly proximal: 86.5% of SSLs with dysplasia or carcinoma were in the proximal colon (median size 9 mm). Risk factors include white race, a family history of colorectal cancer, smoking and alcohol. <sup class="c" data-ref="Crockett2019,Bettington2017" title="Source 58,116">58,116</sup>`,
   pt:`These polyps are flat, pale and often on the right side of the bowel, so they are easier to miss during colonoscopy.`,
   hook:`SSL: proximal, flat, BRAF-mutant, CIMP-positive, and the main precursor of sporadic MSI cancer. <sup class="c" data-ref="Bettington2017" title="Source 58">58</sup>`},
  {from:sqT(6),at:sqT(9),k:'Promoters go silent',t:'CIMP: methylation spreads',
   txt:`The CpG island methylator phenotype (CIMP) silences many gene promoters. CIMP-positive tumours include almost all BRAF-mutant colorectal cancers (odds ratio 203). Of 30 loci studied, 19 became methylated with age in normal colon and 7 only in cancers; the cancer-specific set defined CIMP. In SSLs with dysplasia or cancer, 92.7% were BRAF-mutant and 94.0% CIMP-positive. <sup class="c" data-ref="Weisenberger2006,Toyota1999,Bettington2017" title="Source 58,539,575">58,539,575</sup>`,
   pt:`Chemical tags pile up on the DNA and switch many genes off, without changing the genetic code itself.`,
   hook:`CIMP and BRAF go together (OR 203). <sup class="c" data-ref="Weisenberger2006" title="Source 575">575</sup>`},
  {from:sqT(14),at:sqT(15),k:'A fast turn · Early evidence',t:'MLH1 silenced: dysplasia',
   txt:`Methylation of the MLH1 promoter silences the MLH1 protein and with it mismatch repair; demethylation restored MLH1 and repair in cell lines. 74.5% of SSLs with dysplasia or carcinoma had lost MLH1. These "caught in the act" lesions are rare and occur at a similar age to SSLs with carcinoma, which suggests a long dwell as a non-dysplastic SSL and then a rapid transition once dysplasia appears (Early evidence). <sup class="c" data-ref="Herman1998,Bettington2017" title="Source 58,235">58,235</sup>`,
   pt:`When the polyp switches off a DNA repair gene, mistakes pile up fast and it can turn into cancer quickly.`,
   hook:`Sporadic MSI with BRAF V600E points to MLH1 methylation within CIMP, not Lynch syndrome. <sup class="c" data-ref="Weisenberger2006,Herman1998" title="Source 235,575">235,575</sup>`},
  {from:sqT(16),at:sqT(18),k:'Invasion',t:'Serrated carcinoma',
   txt:`The share of colorectal cancers that arise this way is disputed: at least 15% in some estimates, about 35% in another. Cancers from serrated lesions are not prevented by removing conventional adenomas and may be missed in routine screening; post-colonoscopy cancers may arise from serrated polyps even more often. MSI tumours tend to be proximal, with a lymphocytic infiltrate and a mucinous or poorly differentiated look, and a slightly better prognosis. <sup class="c" data-ref="IJspeert2015,Snover2011,Boland2010" title="Source 63,248,501">63,248,501</sup>`,
   pt:`Some bowel cancers grow from these flat polyps. That is one reason a careful, high-quality colonoscopy matters.`,
   hook:`Serrated share of CRC: ≥15% vs about 35%; estimates are indirect. <sup class="c" data-ref="IJspeert2015,Snover2011" title="Source 248,501">248,501</sup>`},
  {from:sqT(19.5),at:sqT(21.4),k:'Spread',t:'BRAF-mutant spread',
   txt:`BRAF-mutant tumours were 11% of metastatic colorectal cancer in a two-centre cohort, linked to right-sided primaries and MSI, and to shorter median survival (10.4 vs 34.7 months). They have a distinct pattern of metastatic spread. Right-sided colon cancer also predicted metachronous peritoneal spread (HR 1.77). <sup class="c" data-ref="Tran2011,Segelman2012" title="Source 481,540">481,540</sup>`,
   pt:`Cancers with the BRAF change can be harder to treat once they spread. Doctors test for it to plan treatment.`,
   hook:`BRAF V600E in metastatic CRC: about 11%, right-sided, MSI-linked, median survival 10.4 vs 34.7 months. <sup class="c" data-ref="Tran2011" title="Source 540">540</sup>`}]
};
const SQ_COMBO={
 'conv-cin':`<b>Conventional + CIN.</b> The classic route: most colorectal cancers arise through chromosomal instability, with arm losses such as 18q and 17p. CIN tumours lean to the left colon, as do FAP tumours. <sup class="c" data-ref="Pino2010,TCGA2012,Iacopetta2002" title="Source 247,432,524">247,432,524</sup>`,
 'conv-msi':`<b>Conventional + MSI.</b> The Lynch-syndrome route: an inherited mismatch-repair fault, about 3% of all colorectal cancers. Lynch tumours occur mainly in the right colon. Hypermutated tumours carried APC (51% vs 81%) and TP53 (20% vs 60%) mutations less often than other tumours. <sup class="c" data-ref="Boland2010,Iacopetta2002,TCGA2012" title="Source 63,247,524">63,247,524</sup>`,
 'serr-msi':`<b>Serrated + MSI.</b> CIMP silences MLH1 by promoter methylation: the sporadic MSI route, about 12% of all colorectal cancers. <sup class="c" data-ref="Boland2010,Weisenberger2006,Herman1998" title="Source 63,235,575">63,235,575</sup>`,
 'serr-cin':`<b>Serrated, microsatellite stable.</b> Not every serrated cancer loses mismatch repair: about a quarter of SSLs with dysplasia or carcinoma had kept MLH1 (74.5% had lost it). <sup class="c" data-ref="Bettington2017" title="Source 58">58</sup>`};
const SQ_CAP={conv:'Schematic, not to scale. Years before the large adenoma are not measured; the bars are from different studies (ras, 18q, 17p: Vogelstein 1988, 172 tumours; APC: Powell 1992, 41 tumours). <sup class="c" data-ref="Vogelstein1988,Powell1992,Jones2008" title="Source 270,437,566">270,437,566</sup>',
 serr:'Schematic, not to scale. No study has followed single serrated lesions over time, so the timeline is drawn, not measured; bars are from 137 SSLs with dysplasia or carcinoma. <sup class="c" data-ref="Bettington2017,IJspeert2015" title="Source 58,248">58,248</sup>'};

inits.sequence=()=>{
  const svg=$('#sqSvg'),rg=$('#sqT');let pw='conv',inst='cin',setSt=()=>{};
  const lab=(x,y,t,c='t-sm',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}" ${st?`style="${st}"`:''}>${t}</text>`;
  /* stage of the lesion for the kit's polyp(): size (base width) and stage 0..1 */
  function lesion(y){
    if(pw==='conv'){
      if(y<1.5)return{s:0,k:0,name:'Aberrant crypt',col:'var(--polyp-line)'};
      if(y<3)return{s:lerp(18,30,ramp(y,1.5,3)),k:0,name:'Small adenoma (<1 cm)',col:'var(--polyp-line)'};
      if(y<12)return{s:lerp(30,62,ramp(y,3,12)),k:.5*ramp(y,3,12),name:'Large adenoma (>1 cm)',col:'var(--polyp-line)'};
      if(y<17)return{s:lerp(62,78,ramp(y,12,17)),k:lerp(.55,.82,ramp(y,12,17)),name:'Advanced adenoma, high-grade dysplasia',col:'var(--dysplasia)'};
      return{s:lerp(78,92,ramp(y,17,21)),k:lerp(.87,1,ramp(y,17,19.5)),name:y<20?'Invasive carcinoma':'Carcinoma with a metastatic clone',col:'var(--tumour)'}}
    if(y<1.5)return{s:0,k:0,name:'BRAF-mutant crypt',col:'var(--polyp-line)'};
    if(y<14)return{s:lerp(32,80,ramp(y,1.5,14)),k:0,name:'Sessile serrated lesion',col:'var(--polyp-line)'};
    if(y<16)return{s:lerp(80,84,ramp(y,14,16)),k:lerp(.6,.82,ramp(y,14,16)),name:'SSL with dysplasia',col:'var(--dysplasia)'};
    return{s:lerp(84,96,ramp(y,16,21)),k:lerp(.87,1,ramp(y,16,18.5)),name:y<19.5?'Invasive carcinoma':'Carcinoma, spreading',col:'var(--tumour)'}}
  const GENES={conv:[{n:'APC',y:.5},{n:'KRAS',y:3},{n:'18q/SMAD4',y:12},{n:'17p/TP53',y:17}],
    serr:[{n:'BRAF V600E',y:.4},{n:'Proximal',y:1.5},{n:'CIMP',y:6},{n:'MLH1 meth.',y:14}]};
  /* Vogelstein 1988 (ras, 18q, 17p) and Powell 1992 (APC): % of tumours, by stage */
  const BARS_C=[{n:'APC',v:[63,63,60],l:['63','63','60']},{n:'ras',v:[9,58,47]},{n:'18q',v:[12,47,73],l:['11–13','47','73']},{n:'17p',v:[0,0,75],l:['–','–','75']}];
  const BARS_S=[{n:'BRAF',v:92.7,y:.4},{n:'Proximal',v:86.5,y:1.5},{n:'CIMP+',v:94.0,y:6},{n:'MLH1 lost',v:74.5,y:14}];
  function right(y,PW,N_){let g='';const G=GENES[pw],bw=(PW-3*6)/4;
    /* gene badges */
    G.forEach((b,i)=>{let on=y>=b.y;let txt=b.n;if(pw==='serr'&&i===3&&inst==='cin'){txt='MLH1 kept';on=on}
      const x=i*(bw+6),c=pw==='serr'&&i===3&&inst==='cin'?'var(--muted)':i===3||pw==='serr'&&i===0?'var(--tumour)':'var(--polyp-line)';
      g+=`<rect x="${f1(x)}" y="0" width="${f1(bw)}" height="26" rx="13" style="fill:${on?c:'none'};stroke:${on?c:'var(--line)'};stroke-width:1.4;opacity:${on?1:.9}"/>`;
      g+=`<text x="${f1(x+bw/2)}" y="16.5" class="t-xs t-mid" style="fill:${on?'var(--panel)':'var(--muted)'};font-weight:600;font-size:${N_?11:10}px">${txt}</text>`});
    const bx=62,bl=PW-bx-44;
    if(pw==='conv'){
      const col=y<3?0:y<17?1:2;
      g+=lab(0,48,'% OF TUMOURS WITH THE CHANGE, BY STAGE','t-xs');
      ['<1 cm','>1 cm','cancer'].forEach((h,j)=>{g+=`<rect x="${f1(bx+j*76)}" y="56" width="10" height="10" rx="2" style="fill:var(--tumour);opacity:${[.35,.65,1][j]}"/>`+lab(bx+j*76+14,65,h,'t-xs',j===col?'fill:var(--ink);font-weight:700':'')});
      BARS_C.forEach((B,i)=>{const yy=76+i*38;g+=lab(0,yy+19,B.n,'t-lbl');
        B.v.forEach((v,j)=>{const by=yy+j*12,shown=j<=col,w=bl*v/100*(j<col?1:j===col?ramp(y,[0,3,17][j],[0,3,17][j]+1.2):0);
          g+=`<rect x="${bx}" y="${by}" width="${f1(bl)}" height="9" rx="3" style="fill:var(--panel-2)"/>`;
          if(shown&&v>0)g+=`<rect x="${bx}" y="${by}" width="${f1(w)}" height="9" rx="3" style="fill:var(--tumour);opacity:${[.35,.65,1][j]}"/>`;
          if(shown)g+=lab(bx+bl+5,by+8.5,(B.l?B.l[j]:v)+(v>0?'%':''),'t-xs',j===col?'fill:var(--ink)':'')})});
    }else{
      g+=lab(0,48,'% OF 137 SSLs WITH DYSPLASIA OR CANCER','t-xs');
      BARS_S.forEach((B,i)=>{const yy=66+i*36,on=y>=B.y,w=bl*B.v/100*ramp(y,B.y,B.y+1.2);
        g+=lab(0,yy+13,B.n,'t-lbl');g+=`<rect x="${bx}" y="${yy+2}" width="${f1(bl)}" height="14" rx="4" style="fill:var(--panel-2)"/>`;
        if(on)g+=`<rect x="${bx}" y="${yy+2}" width="${f1(w)}" height="14" rx="4" style="fill:${i===3&&inst==='cin'?'var(--muted)':'var(--tumour)'}"/>`+lab(bx+bl+5,yy+13,B.v+'%','t-xs','fill:var(--ink)')});
      if(inst==='cin'&&y>=14)g+=lab(0,214,'This tumour kept MLH1: about 1 in 4 do','t-xs','fill:var(--ink)');
    }
    /* genome panel */
    const gy=230;g+=`<line x1="0" x2="${PW}" y1="${gy-8}" y2="${gy-8}" class="axis"/>`;
    g+=lab(0,gy+8,inst==='cin'?'CHROMOSOMES (CIN)':'NEAR-DIPLOID (MSI)','t-xs');
    const ch=(x,yb,h,o={})=>{const w=7,cp=yb+h*.4;let s=`<rect x="${f1(x)}" y="${f1(yb)}" width="${w}" height="${f1(h*.4-1.5)}" rx="3.5" style="fill:${o.c||'var(--lymph)'};opacity:${o.lp?.2:.85}${o.lp?';stroke:var(--lymph);stroke-dasharray:2 2':''}"/>`;
      s+=`<rect x="${f1(x)}" y="${f1(cp+1.5)}" width="${w}" height="${f1(h*.6-1.5)}" rx="3.5" style="fill:${o.c||'var(--lymph)'};opacity:${o.lq?.2:.85}"/>`;return s};
    const cin=inst==='cin',L18=cin&&(pw==='conv'?y>=12:y>=16),L17=cin&&(pw==='conv'?y>=17:y>=17.5),GAIN=cin&&y>=(pw==='conv'?15:17);
    const cy0=gy+16,H=40;
    [['17',0],['18',1],['',2],['',3]].forEach(([n,i])=>{const x=8+i*34;
      g+=ch(x,cy0,H,{lp:n==='17'&&L17,lq:n==='18'&&L18});g+=ch(x+10,cy0,H);
      if(n==='' &&i===2&&GAIN)g+=ch(x+20,cy0,H,{c:'var(--gold)'});
      g+=lab(x+8,cy0+H+12,n||'·','t-xs t-mid')});
    const lost=[L18?'18q':'',L17?'17p':''].filter(Boolean);
    g+=lab(0,cy0+H+26,lost.length?lost.join(' + ')+' lost':cin?'no arm losses yet':'chromosomes intact','t-xs',lost.length?'fill:var(--tumour)':'');
    if(GAIN)g+=lab(0,cy0+H+38,'+1 whole chromosome','t-xs','fill:var(--gold)');
    /* mutation dots: each dot about 20 mutations; mean 73 (pMMR) vs 1,782 (dMMR) */
    const tgt=cin?73:1782,k=ramp(y,0,pw==='conv'?18:16),m=Math.round(!cin&&pw==='serr'?(y<14?73*ramp(y,0,14):lerp(73,1782,ramp(y,14,17))):tgt*k),nd=Math.round(m/20);
    const dx=146,cols=Math.floor((PW-dx)/7.5);
    for(let i=0;i<nd;i++)g+=`<circle cx="${f1(dx+3+(i%cols)*7.5)}" cy="${f1(cy0+2+Math.floor(i/cols)*7.5)}" r="2.6" style="fill:${cin?'var(--muted)':'var(--accent)'}"/>`;
    g+=lab(dx,cy0+H+26,`${m.toLocaleString('en-GB')} mutations`,'t-xs','fill:var(--ink)');
    g+=lab(dx,cy0+H+38,'mean pMMR 73 · dMMR 1,782','t-xs');g+=lab(dx,cy0+H+50,'1 dot ≈ 20 mutations','t-xs');
    return g}
  function timeline(y,x0,x1,ty,N){let g='';const X=v=>lerp(x0,x1,v/SQ_Y);
    g+=`<line x1="${x0}" x2="${x1}" y1="${ty}" y2="${ty}" class="axis"/>`;
    for(let v=0;v<=SQ_Y;v+=2)g+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${ty-3}" y2="${ty+3}" class="axis"/>`+lab(X(v),ty+15,v,'t-xs t-mid');
    const br=(a,b,yy,t,c,up=1,an)=>`<path d="M${f1(X(a))} ${yy+4*up}V${yy}H${f1(X(b))}V${yy+4*up}" style="fill:none;stroke:${c};stroke-width:1.6"/>`+lab(an?X(b):(X(a)+X(b))/2,yy-4*up+(up<0?10:0),t,an?'t-xs t-end':'t-xs t-mid',`fill:${c}`);
    if(pw==='conv'){
      g+=`<rect x="${f1(X(0))}" y="${ty-6}" width="${f1(X(3)-X(0))}" height="12" style="fill:var(--line);opacity:.5"/>`;
      g+=br(0,3,ty-14,N?'?':'not measured','var(--muted)');
      g+=br(3,20,ty-14,N?'~17 years to advanced cancer':'~17 years: large adenoma → advanced cancer','var(--polyp-line)');
      g+=br(20,22,ty-14,'<2 y','var(--tumour)');
      g+=br(17,22,ty+24,'screen-detectable before symptoms: mean 4.5–5.8 y','var(--accent)',-1,1);
    }else{
      g+=br(1.5,14,ty-14,N?'long dwell (not measured)':'long dwell as an SSL (not measured)','var(--polyp-line)');
      g+=br(14,17,ty-14,'rapid','var(--tumour)');
      g+=br(17,22,ty+24,'screen-detectable before symptoms: mean 4.5–5.8 y','var(--accent)',-1,1);
    }
    g+=`<circle cx="${f1(X(y))}" cy="${ty}" r="6" style="fill:var(--tumour);stroke:var(--panel);stroke-width:2"/>`;
    return g}
  function draw(t){
    const N=vb(svg,'720 460','400 840'),y=t*SQ_Y,L=lesion(y);
    const x0=N?10:14,W1=N?380:390,wy=150,cx=x0+W1*.48;
    let s=`<defs>${marker('sqArr','var(--tumour)')}</defs>`;
    s+=lab(x0,24,L.name,'t-big',`fill:${L.col}`);
    s+=lab(x0,42,`Year ${y.toFixed(1)} of a schematic ${SQ_Y}`,'t-sm');
    s+=`<rect x="${x0}" y="52" width="${W1}" height="${wy-52}" rx="10" style="fill:var(--field)"/>`+lab(x0+8,66,'LUMEN','t-xs');
    const w=wall(x0,wy,W1,{h:200,labels:false});s+=w.svg;
    const Y=w.y;
    /* layer names on the left edge */
    [['Mucosa',Y.mucosa,Y.submucosa],['Submucosa',Y.submucosa,Y.muscularis],['Muscularis propria',Y.muscularis,Y.subserosa],['Subserosa',Y.subserosa,Y.serosa]].forEach(([n,a,b])=>{s+=lab(x0+6,(a+b)/2+3.5,n,'t-xs','fill:var(--ink);opacity:.8')});
    /* muscularis mucosae: a thin line under the mucosa, broken by invasion */
    const inv=L.k>.86?ramp(L.k,.86,1):0,gap=L.s*.42*inv;
    const mmY=Y.submucosa-1.5;
    s+=`<path d="M${x0} ${mmY}H${f1(cx-gap)}M${f1(cx+gap)} ${mmY}H${x0+W1}" style="stroke:var(--muscle);stroke-width:2.6"/>`;
    s+=lab(x0+W1-6,mmY-4,'muscularis mucosae','t-xs t-end','fill:var(--ink)');
    /* the lesion */
    if(L.s===0){const k=ramp(y,0,1.5);s+=`<rect x="${f1(cx-5)}" y="${f1(Y.mucosa)}" width="10" height="${f1((Y.submucosa-Y.mucosa)*.85)}" rx="4" style="fill:var(--polyp);opacity:${f1(.3+.7*k)}"/>`;
      s+=`<ellipse cx="${f1(cx)}" cy="${Y.mucosa}" rx="${f1(6+6*k)}" ry="${f1(3+3*k)}" style="fill:var(--polyp);stroke:var(--polyp-line)"/>`;
      s+=`<path d="M${f1(cx+40)} ${Y.mucosa-34}L${f1(cx+10)} ${Y.mucosa-8}" style="stroke:var(--muted);stroke-width:1.2"/>`+lab(cx+44,Y.mucosa-36,pw==='conv'?'one crypt, APC lost':'one crypt, BRAF mutant','t-xs','fill:var(--ink)')}
    else{
      /* deeper invasion strands, drawn below the kit's own */
      if(inv>0){const rr=rng(9),dep=lerp(Y.submucosa+6,y>=19.5?Y.subserosa-4:Y.muscularis+10,ramp(y,pw==='conv'?17:16,21));
        const hw=L.s*.42;let d=`M${f1(cx-hw)} ${f1(Y.mucosa)}`;const M=9;
        for(let i=0;i<=M;i++){const u=i/M,xx=cx-hw*1.15+hw*2.3*u,bulge=Math.sin(Math.PI*u),yy=lerp(Y.mucosa+8,dep,bulge)+(i%2?-8:6)*bulge*rr();d+=`L${f1(xx)} ${f1(yy)}`}
        d+=`L${f1(cx+hw)} ${f1(Y.mucosa)}Z`;s+=`<path d="${d}" style="fill:var(--tumour);opacity:.85;stroke:var(--tumour);stroke-width:1.5;stroke-linejoin:round"/>`;
        for(let i=0;i<5;i++){const xx=cx+(rr()-.5)*hw*2.4,yy=lerp(Y.mucosa+14,dep+6,rr());s+=`<circle cx="${f1(xx)}" cy="${f1(yy)}" r="${f1(2+rr()*2)}" style="fill:var(--tumour)"/>`}}
      {const sq=pw==='serr'&&L.k<.85?.6:.72;s+=`<g transform="translate(0 ${f1(Y.mucosa*(1-sq))}) scale(1 ${sq})">${polyp(cx,Y.mucosa,L.s,L.k,{serrated:pw==='serr',seed:pw==='conv'?5:8})}</g>`}}
    /* a vessel in the submucosa, and spread to the liver */
    const vx=x0+W1*.82,vy=(Y.submucosa+Y.muscularis)/2;
    s+=`<ellipse cx="${f1(vx)}" cy="${f1(vy)}" rx="16" ry="9" style="fill:var(--vessel-soft);stroke:var(--vessel);stroke-width:1.4"/>`+lab(vx,vy+22,'vein','t-xs t-mid');
    const met=pw==='conv'?20:19.5;
    if(y>=met){const k=ramp(y,met,SQ_Y);for(let i=0;i<4;i++){const ph=(k*3+i/4)%1,px=lerp(cx+L.s*.25,vx,Math.min(1,ph*1.4)),py=lerp(Y.submucosa+8,vy,Math.min(1,ph*1.4));
        s+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="3.4" style="fill:var(--tumour);opacity:${f1(ph<.7?1:1-(ph-.7)/.3)}"/>`}
      const lx=x0+W1-62,ly=96;s+=`<rect x="${lx-52}" y="58" width="108" height="78" rx="10" style="fill:var(--panel);stroke:var(--line)"/>`+liver(lx,ly+6,.62,Math.round(1+k*4),4)+lab(lx,72,'Liver (portal blood)','t-xs t-mid','fill:var(--ink)');
      s+=`<path d="M${f1(vx)} ${f1(vy-12)}C${f1(vx)} ${f1(Y.mucosa-20)} ${f1(lx-30)} 150 ${f1(lx-30)} 138" style="fill:none;stroke:var(--tumour);stroke-width:1.6;stroke-dasharray:4 3" marker-end="url(#sqArr)"/>`}
    /* right panel */
    const RP=N?{x:10,y:378,w:380}:{x:428,y:24,w:280};
    s+=`<g transform="translate(${RP.x} ${RP.y})">${right(y,RP.w,N)}</g>`;
    s+=timeline(y,N?24:30,N?376:700,N?790:404,N);
    svg.innerHTML=s;
    const ST=SQ_STEPS[pw],ph=phaseOf(ST,t);setSt(ph);$('#sqNote').innerHTML=noteHTML(ST[ph]);
    const lit=GENES[pw].filter(b=>y>=b.y).map(b=>b.n.split(' ')[0]).join(' → ')||'none yet';
    $('#sqRead').innerHTML=`<span>Year <b>${y.toFixed(1)}</b></span><span>Stage <b>${L.name}</b></span><span>Changes <b>${lit}</b></span>`;
  }
  const stop=playWire(rg,$('#sqPlay'),draw,24000,'Replay','sequence');
  function wire(){const old=$('#sqSteps'),nu=old.cloneNode(false);old.replaceWith(nu);setSt=stepWire(nu,SQ_STEPS[pw],rg,draw,stop)}
  function meta(){$('#sqCombo').innerHTML=SQ_COMBO[pw+'-'+inst];$('#sqCap').innerHTML=SQ_CAP[pw]}
  $$('[data-sqpw]').forEach(b=>b.addEventListener('click',()=>{stop();pw=b.dataset.sqpw;$$('[data-sqpw]').forEach(x=>x.setAttribute('aria-pressed',x===b));
    inst=pw==='serr'?'msi':'cin';$$('[data-sqin]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.sqin===inst));meta();wire();draw(+rg.value)}));
  $$('[data-sqin]').forEach(b=>b.addEventListener('click',()=>{stop();inst=b.dataset.sqin;$$('[data-sqin]').forEach(x=>x.setAttribute('aria-pressed',x===b));meta();draw(+rg.value)}));
  meta();wire();draw(+rg.value);

  /* ---------- progression risk ---------- */
  const rs=$('#sqRisk'),rr=$('#sqRiskT');let age='55',sex='w';
  const STRY=[[0,0],[5,2.5],[10,8],[20,24]];
  const BREN={w:{'55':[2.6,25.4],'80':[5.6,42.9]},m:{'55':[2.6,25.2],'80':[5.1,39.7]}};
  const interp=(P,x)=>{for(let i=1;i<P.length;i++)if(x<=P[i][0]){const a=P[i-1],b=P[i];return a[1]+(b[1]-a[1])*(x-a[0])/(b[0]-a[0])}return P[P.length-1][1]};
  function drawR(t){const N=vb(rs,'720 330','400 420'),Yr=t*20;
    const px0=N?44:60,px1=N?380:690,py0=N?30:24,py1=N?340:270,X=v=>lerp(px0,px1,v/20),Yv=v=>lerp(py1,py0,v/60);
    let s='';
    for(let v=0;v<=60;v+=10)s+=`<line x1="${px0}" x2="${px1}" y1="${f1(Yv(v))}" y2="${f1(Yv(v))}" class="grid"/>`+lab(px0-8,Yv(v)+4,v+'%','t-xs t-end');
    for(let v=0;v<=20;v+=5)s+=lab(X(v),py1+16,v+' y','t-xs t-mid');
    s+=`<line x1="${px0}" x2="${px1}" y1="${py1}" y2="${py1}" class="axis"/>`;
    s+=lab(px0,py1+(N?36:40),'Years after the polyp was found','t-sm');
    /* Stryker: up to the current year */
    let d='';for(let k=0;k<=80;k++){const v=Yr*k/80;d+=(k?'L':'M')+f1(X(v))+' '+f1(Yv(interp(STRY,v)))}
    s+=`<path d="${d}" style="fill:none;stroke:var(--tumour);stroke-width:3;stroke-linejoin:round"/>`;
    STRY.slice(1).forEach(([a,b])=>{if(Yr>=a)s+=`<circle cx="${f1(X(a))}" cy="${f1(Yv(b))}" r="5.5" style="fill:var(--panel);stroke:var(--tumour);stroke-width:2.4"/>`+lab(X(a)-(a===20?8:0),Yv(b)-12,b+'%',a===20?'t-sm t-end':'t-sm t-mid','fill:var(--tumour);font-weight:700')});
    /* Brenner: projected 10-year risk */
    const B=BREN[sex][age],bk=clamp(Yr/10);
    s+=`<path d="M${X(0)} ${Yv(0)}L${f1(X(10*bk))} ${f1(Yv(B[1]*bk))}" style="stroke:var(--accent);stroke-width:2.4;stroke-dasharray:6 4"/>`;
    if(Yr>=10)s+=`<circle cx="${f1(X(10))}" cy="${f1(Yv(B[1]))}" r="5.5" style="fill:var(--panel);stroke:var(--accent);stroke-width:2.4"/>`+lab(X(10)+10,Yv(B[1])-6,B[1]+'% at 10 y','t-sm','fill:var(--accent);font-weight:700');
    /* legend */
    const lgx=px0+12,lgy=py0+10;
    s+=`<line x1="${lgx}" x2="${lgx+24}" y1="${lgy}" y2="${lgy}" style="stroke:var(--tumour);stroke-width:3"/>`+lab(lgx+30,lgy+4,'Untreated polyps ≥10 mm (Mayo, 1987)','t-sm','fill:var(--ink)');
    s+=`<line x1="${lgx}" x2="${lgx+24}" y1="${lgy+18}" y2="${lgy+18}" style="stroke:var(--accent);stroke-width:2.4;stroke-dasharray:6 4"/>`+lab(lgx+30,lgy+22,`Advanced adenoma, ${sex==='w'?'women':'men'} ${age} (Germany, 2007)`,'t-sm','fill:var(--ink)');
    s+=`<line x1="${f1(X(Yr))}" x2="${f1(X(Yr))}" y1="${py0+34}" y2="${py1}" style="stroke:var(--muted);stroke-width:1;stroke-dasharray:2 3"/>`;
    rs.innerHTML=s;
    const st=interp(STRY,Yr);
    $('#sqRiskNote').innerHTML=noteHTML({k:`Year ${Yr.toFixed(1)}`,t:`${f1(st)}% by year ${Math.round(Yr)} (polyps ≥10 mm)`,
      txt:`In the Mayo series (226 people, barium-enema era), the cumulative risk of cancer at the polyp site was 2.5% at 5 years, 8% at 10 years and 24% at 20 years; invasive cancers appeared at a mean of 108 months. Values between the circles are drawn straight. In German screening data, an advanced adenoma at age ${age==='55'?'55–59':'80 or over'} became cancer at about ${B[0]}% a year in ${sex==='w'?'women':'men'}, a projected ${B[1]}% over 10 years at age ${age}. These are annual transition rates and projections, not lifetime risks. <sup class="c" data-ref="Stryker1987,Brenner2007" title="Source 72,516">72,516</sup>`,
      pt:`Most large polyps do not turn into cancer quickly, but the risk builds up over the years. Removing them takes that risk away.`,
      hook:`Untreated polyps ≥10 mm: 2.5% / 8% / 24% cancer at 5 / 10 / 20 years (Stryker 1987).`})}
  playWire(rr,$('#sqRiskPlay'),drawR,9000,'Replay','sequence');
  $$('[data-sqage]').forEach(b=>b.addEventListener('click',()=>{age=b.dataset.sqage;$$('[data-sqage]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawR(+rr.value)}));
  $$('[data-sqsex]').forEach(b=>b.addEventListener('click',()=>{sex=b.dataset.sqsex;$$('[data-sqsex]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawR(+rr.value)}));
  drawR(+rr.value);

  /* ---------- prevalence: 1,000 dots ---------- */
  const ps=$('#sqPrev');let grp='any';
  const ORDER=(()=>{const a=[...Array(1000).keys()],r=rng(77);for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a})();
  const RANK=new Array(1000);ORDER.forEach((v,i)=>RANK[v]=i);
  const PREV={any:[302,'var(--polyp)','any adenoma, 30.2%'],adv:[57,'var(--dysplasia)','an advanced adenoma, 5.7%'],ca:[3,'var(--tumour)','colorectal cancer, 0.3%']};
  function drawP(){const N=vb(ps,'720 300','400 642'),cols=N?25:50,sp=N?14.6:13.8,r=N?5:4.8,ox=N?(400-cols*sp)/2+sp/2:(720-cols*sp)/2+sp/2,oy=N?20:18;
    const [n,c,l]=PREV[grp];let s='';
    for(let i=0;i<1000;i++){const x=ox+(i%cols)*sp,y=oy+Math.floor(i/cols)*sp,on=RANK[i]<n;
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${on&&grp==='ca'?r+1.5:r}" style="fill:${on?c:'var(--panel-2)'};${on?'':'stroke:var(--line);stroke-width:.8'}"/>`}
    if(N){s+=lab(200,616,`${n} of 1,000 average-risk adults screened`,'t-sm t-mid','fill:var(--ink)')+lab(200,632,`had ${l}`,'t-sm t-mid','fill:var(--ink)')}else s+=lab(360,294,`${n} of 1,000 average-risk adults screened had ${l}`,'t-sm t-mid','fill:var(--ink)');
    ps.innerHTML=s;
    $('#sqPrevCap').innerHTML=`Pooled prevalence: any adenoma 30.2%, non-advanced adenoma 17.7%, advanced adenoma 5.7%, cancer 0.3%; higher in cohorts with a mean age of 65 or more. <sup class="c" data-ref="Heitman2009" title="Source 233">233</sup>`}
  $$('[data-sqprev]').forEach(b=>b.addEventListener('click',()=>{grp=b.dataset.sqprev;$$('[data-sqprev]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawP()}));
  drawP();
  const pr=redraws.sequence;redraws.sequence=()=>{pr&&pr();drawP()};
};
/* =============== 1.4 Risk factors & prevention =============== */
/* Rows of the forest plot: published pooled estimate, 95% CI, source.
   r = time on the scrubber at which the row slides in. */
const RK_BASE=3.42; /* % lifetime risk from age 50 without screening, US microsimulation [Meester2015JAMA] */
const RK_ROWS=[
 {n:'≥1 first-degree relative',sn:'≥1 FDR',rr:2.24,lo:2.06,hi:2.43,g:1,r:.10,m:'pooled RR, 47 studies',c:'<sup class="c" data-ref="Butterworth2006" title="Source 85">85</sup>'},
 {n:'Ulcerative colitis',sn:'Ulcerative colitis',rr:1.66,lo:1.57,hi:1.76,g:1,r:.15,m:'HR, Nordic cohort 1969–2017',c:'<sup class="c" data-ref="Olen2020UC" title="Source 414">414</sup>'},
 {n:"Crohn's disease",sn:"Crohn's disease",rr:1.40,lo:1.27,hi:1.53,g:1,r:.20,m:'adjusted HR, Nordic cohort',c:'<sup class="c" data-ref="Olen2020CD" title="Source 413">413</sup>'},
 {n:'Processed meat, per 50 g/day',sn:'Processed meat 50 g',rr:1.18,lo:1.10,hi:1.28,g:2,r:.28,m:'RR per 50 g/day, prospective studies',c:'<sup class="c" data-ref="Chan2011" title="Source 96">96</sup>'},
 {n:'Red meat, per 100 g/day',sn:'Red meat 100 g',rr:1.17,lo:1.05,hi:1.31,g:2,r:.32,m:'RR per 100 g/day, prospective studies',c:'<sup class="c" data-ref="Chan2011" title="Source 96">96</sup>'},
 {n:'Alcohol, 2–3 drinks/day',sn:'Alcohol 2–3/day',rr:1.21,lo:1.13,hi:1.28,g:2,r:.36,m:'RR vs non-drinkers, 61 studies',c:'<sup class="c" data-ref="Fedirko2011" title="Source 182">182</sup>'},
 {n:'Alcohol, ≥4 drinks/day',sn:'Alcohol ≥4/day',rr:1.52,lo:1.27,hi:1.81,g:2,r:.40,m:'RR vs non-drinkers, 61 studies',c:'<sup class="c" data-ref="Fedirko2011" title="Source 182">182</sup>'},
 {n:'Smoking, ever vs never',sn:'Smoking (ever)',rr:1.18,lo:1.11,hi:1.25,g:3,r:.48,m:'incidence RR',c:'<sup class="c" data-ref="Botteri2008" title="Source 69">69</sup>'},
 {n:'Obesity vs normal BMI',sn:'Obesity',rr:1.33,lo:1.25,hi:1.42,g:3,r:.53,m:'RR, 41 studies',c:'<sup class="c" data-ref="Ma2013" title="Source 344">344</sup>'},
 {n:'Diabetes',sn:'Diabetes',rr:1.27,lo:1.21,hi:1.34,g:3,r:.58,m:'summary RR, 30 cohorts',c:'<sup class="c" data-ref="Jiang2011" title="Source 264">264</sup>'},
 {n:'Most vs least active (colon)',sn:'Physically active',rr:.76,lo:.72,hi:.81,g:4,r:.66,m:'RR for colon cancer, 52 studies',c:'<sup class="c" data-ref="Wolin2009" title="Source 588">588</sup>'},
 {n:'Fibre, per 10 g/day',sn:'Fibre 10 g',rr:.90,lo:.86,hi:.94,g:4,r:.69,m:'RR per 10 g/day total fibre',c:'<sup class="c" data-ref="Aune2011" title="Source 29">29</sup>'},
 {n:'Whole grains, per 3 servings/day',sn:'Whole grains ×3',rr:.83,lo:.78,hi:.89,g:4,r:.72,m:'RR per 3 servings/day',c:'<sup class="c" data-ref="Aune2011" title="Source 29">29</sup>'},
 {n:'Dairy, per 400 g/day',sn:'Dairy 400 g',rr:.83,lo:.78,hi:.88,g:4,r:.75,m:'RR per 400 g/day, cohorts',c:'<sup class="c" data-ref="Aune2012" title="Source 30">30</sup>'},
 {n:'Calcium, per 300 mg/day',sn:'Calcium 300 mg',rr:.92,lo:.89,hi:.95,g:4,r:.78,m:'RR per 300 mg/day total calcium',c:'<sup class="c" data-ref="Keum2014" title="Source 283">283</sup>'},
 {n:'Aspirin, trials (colon cancer)',sn:'Aspirin (trials)',rr:.76,lo:.60,hi:.96,g:5,r:.88,m:'HR for colon cancer incidence, 20-year trial follow-up',c:'<sup class="c" data-ref="Rothwell2010" title="Source 460">460</sup>'}
];
const RK_STEPS=[
 {from:0,at:.04,k:'Before the rows',t:'How to read a forest plot',
  txt:`Each row will be one risk factor. The square is the pooled relative risk (RR): how many times more, or less, often colorectal cancer occurred in people with the factor than without it. The line through it is the 95% confidence interval. The vertical line at 1 means no effect: rows whose whole line sits to the right raise risk, to the left lower it. The scale is logarithmic, so 0.5 and 2 are the same distance from 1. Press <b>Absolute risk</b> to turn each RR into cases per 1,000 people, using a 3.42% lifetime risk from age 50 without screening as the baseline. <sup class="c" data-ref="Meester2015JAMA" title="Source 359">359</sup>`,
  pt:`A relative risk of 2 means twice as likely, not 2% more likely. Twice a small number is still a small number.`,
  hook:`An RR whose 95% CI crosses 1 is not statistically significant.`},
 {from:.08,at:.25,k:'Rows 1–3 · family and colitis',t:'The strongest factors you cannot change',
  txt:`One or more affected first-degree relatives (parent, sibling, child): RR 2.24 (2.06–2.43) across 47 studies; two or more: 3.97. <sup class="c" data-ref="Butterworth2006" title="Source 85">85</sup> The family-history RR is highest when the person at risk is young: 3.29 under 40, 1.42 at 40 and older. <sup class="c" data-ref="Wong2018" title="Source 589">589</sup> Nordic twin registries put the heritable share of colorectal cancer at 35%. <span class="ev est">Established</span> <sup class="c" data-ref="Lichtenstein2000" title="Source 324">324</sup> Ulcerative colitis: HR 1.66 over 1969–2017, falling to 1.38 in 2013–2017. Crohn's disease: HR 1.40, with the excess in colonic disease, diagnosis before 40, or primary sclerosing cholangitis. <sup class="c" data-ref="Olen2020UC,Olen2020CD" title="Source 413,414">413,414</sup>`,
  pt:`Having a parent, brother, sister or child with bowel cancer about doubles your own risk. Most people with a family history still never get it.`,
  hook:`One affected FDR ≈ RR 2.2; two or more ≈ RR 4. The RR falls with the age of the person at risk. <sup class="c" data-ref="Butterworth2006,Wong2018" title="Source 85,589">85,589</sup>`},
 {from:.26,at:.45,k:'Rows 4–7 · what we eat and drink',t:'Meat and alcohol',
  txt:`Processed meat: RR 1.18 per 50 g a day; fresh red meat: 1.17 per 100 g a day. The curve is roughly linear up to about 140 g a day, then flattens. <sup class="c" data-ref="Chan2011" title="Source 96">96</sup> The IARC classified processed meat as Group 1 (carcinogenic) and red meat as Group 2A (probably carcinogenic). <span class="ev est">Established</span> <sup class="c" data-ref="Bouvard2015" title="Source 70">70</sup> Alcohol: RR 1.21 for 2–3 drinks a day and 1.52 for 4 or more, compared with non-drinkers; the WCRF/AICR update found 7% more risk per 10 g of ethanol a day. <sup class="c" data-ref="Fedirko2011,Vieira2017" title="Source 182,563">182,563</sup>`,
  pt:`Eating less bacon, ham, sausages and red meat, and drinking less alcohol, lowers risk a little.`,
  hook:`Processed meat = IARC Group 1; red meat = Group 2A. About +18% per 50 g/day of processed meat. <sup class="c" data-ref="Bouvard2015,Chan2011" title="Source 70,96">70,96</sup>`},
 {from:.46,at:.63,k:'Rows 8–10 · smoking, weight, diabetes',t:'Smoking, body fat and diabetes',
  txt:`Ever-smoking: incidence RR 1.18 (10.8 extra cases per 100,000 person-years) and mortality RR 1.25; the excess appears after 30 years of smoking and is stronger for rectal cancer. <sup class="c" data-ref="Botteri2008" title="Source 69">69</sup> Obesity: RR 1.33 vs normal BMI; a large waist: 1.46. <sup class="c" data-ref="Ma2013" title="Source 344">344</sup> Diabetes: summary RR 1.27 in 30 cohorts, similar in women and men. <sup class="c" data-ref="Jiang2011,Larsson2005" title="Source 264,305">264,305</sup>`,
  pt:`Not smoking and keeping a healthy weight both lower risk. Smoking's effect on the bowel takes decades to show.`,
  hook:`Obesity RR 1.33; diabetes RR about 1.27; smoking RR 1.18, significant only after 30 years. <sup class="c" data-ref="Ma2013,Jiang2011,Botteri2008" title="Source 69,264,344">69,264,344</sup>`},
 {from:.64,at:.83,k:'Rows 11–15 · lower risk',t:'Activity, fibre, whole grains, dairy, calcium',
  txt:`The most physically active people had 24% less colon cancer than the least active (RR 0.76 in 52 studies; 0.83 in cohorts only). <sup class="c" data-ref="Wolin2009" title="Source 588">588</sup> Each 10 g of fibre a day: RR 0.90; three servings of whole grains a day: 0.83. <sup class="c" data-ref="Aune2011" title="Source 29">29</sup> Dairy, per 400 g a day: 0.83; calcium, per 300 mg a day: 0.92. <sup class="c" data-ref="Aune2012,Keum2014" title="Source 30,283">30,283</sup> Fruit, coffee, tea, cheese, poultry and legumes showed no association in the WCRF/AICR update. <sup class="c" data-ref="Vieira2017" title="Source 563">563</sup> These are observational: randomised trials of calcium and vitamin D supplements were mostly null (see below).`,
  pt:`Staying active and eating whole grains and fibre are linked to a lower risk.`,
  hook:`Physical activity RR 0.76 for colon cancer (Wolin 2009). Fibre RR 0.90 per 10 g/day. <sup class="c" data-ref="Wolin2009,Aune2011" title="Source 29,588">29,588</sup>`},
 {from:.86,at:.97,k:'Row 16 · a drug, tested in trials',t:'Aspirin: years of use, then benefit',
  txt:`In 20-year follow-up of trials (14,033 people, mean 6 years of aspirin), colon cancer incidence fell (HR 0.76; 0.60–0.96) and mortality fell (HR 0.65), with no effect on rectal cancer overall. Five years or more of aspirin cut proximal colon cancer by about 70%. Doses above 75 mg a day added nothing. <sup class="c" data-ref="Rothwell2010" title="Source 460">460</sup> But in ASPREE, in people 70 and older, aspirin did not reduce cancer and cancer deaths were higher (3.1% vs 2.3%). <sup class="c" data-ref="McNeil2018,McNeil2021" title="Source 355,356">355,356</sup> The USPSTF now treats aspirin as a cardiovascular decision only. <sup class="c" data-ref="USPSTF2022Aspirin" title="Source 546">546</sup>`,
  pt:`Aspirin can lower bowel cancer risk, but it takes years and it can cause bleeding. In people over 70 it did not help. It is a decision to make with a doctor.`,
  hook:`Aspirin's CRC benefit appears after ≥5 years, mostly in the proximal colon; ASPREE (≥70 years) showed harm. <sup class="c" data-ref="Rothwell2010,McNeil2021" title="Source 356,460">356,460</sup>`}
];
inits.risk=()=>{
  const svg=$('#rkSvg'),rg=$('#rkT');let mode='rel',pick=-1,setSt=()=>{};
  /* the pick list for the icon array */
  $('#rkPick').innerHTML+=RK_ROWS.map((r,i)=>`<option value="${i}">${r.n}</option>`).join('');
  const per1000=rr=>Math.round(RK_BASE*10*rr);
  /* icon array: one <use> per person, coloured through currentColor */
  function icons(x0,y0,cols,dx,dy,s,rr){const n0=per1000(1),n1=rr==null?n0:per1000(rr);let g='';
    for(let i=0;i<1000;i++){const cx=x0+(i%cols)*dx,cy=y0+Math.floor(i/cols)*dy;
      let col='var(--muted)',op=';opacity:.32';
      if(i<Math.min(n0,n1))col='var(--accent)';else if(i<n1)col='var(--tumour)';else if(i<n0)col='var(--good)';
      g+=`<use href="#rkPer" x="${f1(cx)}" y="${f1(cy)}" style="color:${col}${col==='var(--muted)'?op:''}"/>`}
    return g}
  function draw(t){const rel=mode==='rel',N=vb(svg,rel?'720 610':'720 900',rel?'400 640':'400 830');
    const L=N?{lx:4,x0:150,x1:388,y0:46,dy:23.5,gap:14,s:'sn',vx:0}:{lx:8,x0:262,x1:640,y0:58,dy:25,gap:16,s:'n',vx:712};
    const yr=i=>L.y0+i*L.dy+(i>=10?L.gap:0),yEnd=yr(15)+L.dy*.6;
    const lx0=Math.log(.5),lx1=Math.log(3);
    const X=rel?(v=>lerp(L.x0,L.x1,(Math.log(clamp(v,.5,3))-lx0)/(lx1-lx0))):(v=>lerp(L.x0,L.x1,clamp(v,0,9)/9));
    const val=v=>rel?v:v*RK_BASE;
    let s=`<defs><g id="rkPer">${person(0,0,N?8.6:12,'currentColor')}</g></defs>`;
    /* header */
    s+=`<text x="${L.lx}" y="${L.y0-30}" class="t-sm" style="fill:var(--tumour)">${N?'RAISES RISK':'RAISES RISK →'}</text>`;
    s+=`<text x="${L.lx}" y="${f1(yr(10)-L.dy*.62)}" class="t-sm" style="fill:var(--good)">${N?'LOWER RISK':'LINKED TO LOWER RISK ←'}</text>`;
    s+=`<text x="${N?L.x1:L.vx}" y="${L.y0-30}" class="t-xs t-end">${rel?'relative risk (log scale)':'lifetime risk from age 50, %'}</text>`;
    const ticks=rel?[.5,.75,1,1.5,2,3]:[0,2,4,6,8];
    ticks.forEach(v=>{const x=X(v);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${L.y0-16}" y2="${f1(yEnd)}" class="grid"/><text x="${f1(x)}" y="${f1(yEnd+14)}" class="t-xs t-mid">${rel?v:v+'%'}</text>`});
    s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${f1(yEnd)}" y2="${f1(yEnd)}" class="axis"/>`;
    const xr=X(rel?1:RK_BASE);
    s+=`<line x1="${f1(xr)}" x2="${f1(xr)}" y1="${L.y0-18}" y2="${f1(yEnd)}" style="stroke:var(--ink);stroke-width:1.4"/>`;
    s+=`<text x="${f1(xr+4)}" y="${L.y0-18}" class="t-xs" style="fill:var(--ink)">${rel?'no effect (1)':'baseline '+RK_BASE+'%'}</text>`;
    if(!N)s+=`<text x="${L.vx}" y="${L.y0-18}" class="t-xs t-end">${rel?'RR':'risk'}</text>`;
    /* rows */
    let curI=-1;RK_ROWS.forEach((r,i)=>{if(t>=r.r)curI=i});
    const fi=pick>=0?pick:curI,R=fi>=0?RK_ROWS[fi]:null;
    RK_ROWS.forEach((r,i)=>{const p=ease(ramp(t,r.r,r.r+.035)),y=yr(i);
      const on=p>0,col=r.g<4?'var(--tumour)':r.g===5?'var(--rx)':'var(--good)';
      if(fi===i)s+=`<rect x="0" y="${f1(y-L.dy/2+1)}" width="${N?400:720}" height="${f1(L.dy-2)}" rx="5" style="fill:var(--panel-2)"/>`;
      s+=`<text x="${L.lx}" y="${f1(y+3.5)}" class="${N?'t-xs':'t-sm'}" style="fill:var(--ink);opacity:${on||fi===i?1:.3}">${r[L.s]}</text>`;
      if(!on)return;
      const m=lerp(val(1),val(r.rr),p),lo=lerp(m,val(r.lo),p),hi=lerp(m,val(r.hi),p);
      s+=`<line x1="${f1(X(lo))}" x2="${f1(X(hi))}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:${col};stroke-width:2"/>`;
      const sz=N?5:6;s+=`<rect x="${f1(X(m)-sz)}" y="${f1(y-sz)}" width="${2*sz}" height="${2*sz}" style="fill:${col}"/>`;
      if(!N&&p>.95)s+=`<text x="${L.vx}" y="${f1(y+3.5)}" class="t-sm t-end" style="fill:var(--ink)">${rel?r.rr.toFixed(2):f1(r.rr*RK_BASE)+'%'}</text>`;
    });
    /* focus panel below the plot */
    const P={x:N?0:2,y:yEnd+34,w:N?400:716};
    const H=(N?(rel?640:830):(rel?610:900))-P.y-2;
    s+=`<rect x="${P.x}" y="${f1(P.y)}" width="${P.w}" height="${f1(H)}" rx="10" style="fill:none;stroke:var(--line)"/>`;
    const tx=P.x+12,ty=P.y+20,nm=R?R.n:'';
    if(rel){
      if(R){const pct=Math.round((R.rr-1)*100),colR=R.rr>1?'var(--tumour)':'var(--good)';
        s+=`<text x="${tx}" y="${f1(ty)}" class="t-xs">${pick>=0?'CHOSEN ROW':'NEWEST ROW'}</text><text x="${tx}" y="${f1(ty+20)}" class="t-lbl">${nm}</text>`;
        s+=`<text x="${tx}" y="${f1(ty+66)}" style="font:800 40px var(--display);fill:${colR}">${R.rr.toFixed(2)}</text>`;
        s+=`<text x="${tx+100}" y="${f1(ty+50)}" class="t-sm" style="fill:var(--ink)">${pct>0?pct+'% higher risk':Math.abs(pct)+'% lower risk'}</text><text x="${tx+100}" y="${f1(ty+66)}" class="t-xs">95% CI ${R.lo.toFixed(2)}–${R.hi.toFixed(2)}</text>`;
        if(N)s+=`<text x="${tx}" y="${f1(ty+90)}" class="t-xs">${R.m.length>58?R.m.slice(0,58)+'…':R.m}</text><text x="${tx}" y="${f1(ty+112)}" class="t-xs" style="fill:var(--ink)">An RR does not say how common the cancer is:</text><text x="${tx}" y="${f1(ty+126)}" class="t-xs" style="fill:var(--ink)">press "Absolute risk" to see it as people.</text>`;
        else{const bx=380,bw=v=>v/2.5*300;
          s+=`<text x="${bx}" y="${f1(ty)}" class="t-xs">${R.m}</text>`;
          s+=`<text x="${bx}" y="${f1(ty+22)}" class="t-xs">without the factor</text><rect x="${bx}" y="${f1(ty+28)}" width="${f1(bw(1))}" height="12" rx="3" style="fill:var(--accent)"/><text x="${f1(bx+bw(1)+6)}" y="${f1(ty+38)}" class="t-xs">1</text>`;
          s+=`<text x="${bx}" y="${f1(ty+56)}" class="t-xs">with it</text><rect x="${bx}" y="${f1(ty+62)}" width="${f1(bw(R.rr))}" height="12" rx="3" style="fill:${colR}"/><text x="${f1(bx+bw(R.rr)+6)}" y="${f1(ty+72)}" class="t-xs">${R.rr.toFixed(2)}</text>`;
          s+=`<text x="${tx}" y="${f1(ty+96)}" class="t-xs" style="fill:var(--ink)">A relative risk does not say how common the cancer is. Press "Absolute risk" to see it as people.</text>`}
      }else s+=`<text x="${tx}" y="${f1(ty)}" class="t-xs">NO ROW YET</text><text x="${tx}" y="${f1(ty+24)}" class="t-sm" style="fill:var(--ink)">Press Play or a step: the first row is family history.</text>`;
    }else{
      const n0=per1000(1),n1=R?per1000(R.rr):n0,cN=n1>n0?'var(--tumour)':n1<n0?'var(--good)':'var(--ink)';
      s+=`<text x="${tx}" y="${f1(ty)}" class="t-xs">${N?'PER 1,000 FROM AGE 50, UNSCREENED':'PER 1,000 PEOPLE FROM AGE 50, UNSCREENED · ILLUSTRATION'}</text>`;
      s+=`<text x="${tx}" y="${f1(ty+22)}" class="t-lbl">${R?nm:'Baseline only'}</text>`;
      s+=`<text x="${N?tx:tx+330}" y="${f1(N?ty+42:ty+22)}" class="t-sm" style="fill:var(--ink)">${n0} → <tspan style="font-weight:700;fill:${cN}">${n1}</tspan>${n1>n0?' (+'+(n1-n0)+')':n1<n0?' ('+(n1-n0)+')':''} would develop it</text>`;
      const leg=[['var(--accent)','cases at baseline'],[n1>=n0?'var(--tumour)':'var(--good)',n1>=n0?'extra cases with the factor':'cases avoided'],['var(--line)','no colorectal cancer']];
      const ly=N?ty+60:ty+42;
      leg.forEach(([c,l],k)=>{const lx=tx+k*(N?126:190);s+=`<rect x="${lx}" y="${f1(ly-8)}" width="9" height="9" rx="2" style="fill:${c}"/><text x="${lx+13}" y="${f1(ly)}" class="t-xs">${N?['baseline',n1>=n0?'extra cases':'avoided','no cancer'][k]:l}</text>`});
      s+=N?icons(tx+4,ly+14,40,9.4,10.4,8.6,R?R.rr:null):icons(tx+8,ly+16,50,13.8,15.4,12,R?R.rr:null);
    }
    svg.innerHTML=s;
    const ph=phaseOf(RK_STEPS,t);setSt(ph);
    $('#rkNote').innerHTML=noteHTML(RK_STEPS[ph]);
    $('#rkRead').innerHTML=R?`<span><b>${R.n}</b></span><span>${R.g===5?'HR':'RR'} <b>${R.rr.toFixed(2)}</b> (95% CI ${R.lo.toFixed(2)}–${R.hi.toFixed(2)}), ${R.m} ${R.c}</span><span>per 1,000 from 50 <b>${per1000(1)} → ${per1000(R.rr)}</b> (illustration)</span>`:`<span>Baseline: <b>${RK_BASE}%</b> lifetime risk from age 50 without screening (US microsimulation) <sup class="c" data-ref="Meester2015JAMA" title="Source 359">359</sup></span>`;
  }
  const stop=playWire(rg,$('#rkPlay'),draw,24000,'Replay','risk');
  setSt=stepWire($('#rkSteps'),RK_STEPS,rg,draw,stop);
  $$('[data-rkm]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.rkm;$$('[data-rkm]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  $('#rkPick').addEventListener('change',e=>{pick=+e.target.value;draw(+rg.value)});
  draw(+rg.value);

  /* ---------- family-history calculator ---------- */
  const fs=$('#rkFhSvg'),bandOf=a=>a<45?'40':a<50?'47':a<60?'55':'65';
  const FH_BARS=[
    {l:'No family history',v:1.8,lo:null,hi:null,k:0},
    {l:'≥1 affected relative',v:3.4,lo:2.8,hi:4.0,k:1},
    {l:'≥2 affected relatives',v:6.9,lo:4.5,hi:10.4,k:2}];
  function fh(){
    const n=+$('#rkFdr').value;let a=parseInt($('#rkFexact').value,10);if(!(a>=15&&a<=100))a=+$('#rkFage').value;
    const sel=Math.min(n,2),young=a<50,vy=a<45;
    /* chart */
    const N=vb(fs,'720 230','400 330');
    const C=N?{lx:6,x0:6,x1:380,y0:40,dy:84,bh:14}:{lx:8,x0:200,x1:680,y0:40,dy:54,bh:18};
    const X=v=>lerp(C.x0,C.x1,v/12);
    let s='';
    [0,3,6,9,12].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${C.y0-20}" y2="${C.y0+C.dy*3-14}" class="grid"/><text x="${f1(X(v))}" y="${C.y0+C.dy*3}" class="t-xs t-mid">${v}%</text>`});
    s+=`<text x="${C.x1}" y="${C.y0-26}" class="t-xs t-end">lifetime risk</text>`;
    FH_BARS.forEach((b,i)=>{const y=C.y0+i*C.dy,on=i===sel,col=on?(i?'var(--tumour)':'var(--accent)'):'var(--line)';
      const by=N?y+8:y-C.bh/2;
      s+=`<text x="${C.lx}" y="${f1(N?y:y+4)}" class="${on?'t-lbl':'t-sm'}">${b.l}</text>`;
      s+=`<rect x="${C.x0}" y="${f1(by)}" width="${f1(X(b.v)-C.x0)}" height="${C.bh}" rx="3" style="fill:${col}"/>`;
      if(b.lo!=null)s+=`<line x1="${f1(X(b.lo))}" x2="${f1(X(b.hi))}" y1="${f1(by+C.bh/2)}" y2="${f1(by+C.bh/2)}" style="stroke:var(--ink);stroke-width:1.4"/><line x1="${f1(X(b.lo))}" x2="${f1(X(b.lo))}" y1="${f1(by+3)}" y2="${f1(by+C.bh-3)}" style="stroke:var(--ink);stroke-width:1.4"/><line x1="${f1(X(b.hi))}" x2="${f1(X(b.hi))}" y1="${f1(by+3)}" y2="${f1(by+C.bh-3)}" style="stroke:var(--ink);stroke-width:1.4"/>`;
      s+=`<text x="${f1(X(b.hi||b.v)+6)}" y="${f1(by+C.bh/2+4)}" class="t-sm" style="fill:var(--ink);font-weight:${on?700:500}">${b.v}%${on?' ←':''}</text>`;
      /* Roos 2019 to 85 */
      const ro=i===0?null:i===1?(young?11:4.8):8.2;
      if(ro!=null){const ry=by+C.bh+(N?16:12);const lft=X(ro)>(N?250:520);s+=`<circle cx="${f1(X(ro))}" cy="${f1(ry-3)}" r="3.5" style="fill:none;stroke:var(--brand);stroke-width:1.6"/><text x="${f1(X(ro)+(lft?-7:7))}" y="${f1(ry)}" class="t-xs${lft?' t-end':''}" style="fill:var(--brand)">${ro}% to age 85${i===1&&young?' (FDR <50)':''}</text>`}
    });
    s+=N?`<text x="${C.lx}" y="312" class="t-xs">bar = a 50-year-old (Butterworth 2006)</text><text x="${C.lx}" y="325" class="t-xs">circle = to age 85, W. Europe (Roos 2019)</text>`:`<text x="${C.lx}" y="224" class="t-xs">bar = for a 50-year-old (Butterworth 2006) · circle = to 85, W. Europe (Roos 2019)</text>`;
    fs.innerHTML=s;
    /* result text */
    let rr,abs,more='',us,uk,cls;
    if(n===0){rr=`RR <b>1</b> (reference)`;abs=`1.8%`;cls='yes';
      us=`Average risk: USPSTF and the American Cancer Society start screening at 45; ACS reaffirmed 45 in 2026. <sup class="c" data-ref="USPSTF2021,Wolf2018,Wolf2026" title="Source 545,584,585">545,584,585</sup>`;
      uk=`Not in a UK family-history risk category. <sup class="c" data-ref="Monahan2020" title="Source 374">374</sup>`}
    else if(n===1){rr=vy?`RR <b>3.87</b> (2.40–6.22) when the relative was diagnosed before 45 <sup class="c" data-ref="Johns2001" title="Source 266">266</sup>`:`RR <b>2.24</b> (2.06–2.43) <sup class="c" data-ref="Butterworth2006" title="Source 85">85</sup>`;
      abs=`3.4% (2.8–4.0)`;cls=young?'no':'maybe';
      if(young)more=`In cohort studies an FDR diagnosed before 50 gave RR 3.26 (2.82–3.77) and an 11% risk to 85. <sup class="c" data-ref="Roos2019" title="Source 457">457</sup>`;
      us=a<60?`USMSTF 2017: colonoscopy every 5 years from age 40, or 10 years before the relative's diagnosis, whichever is earlier: here from <b>${Math.min(40,a-10)}</b>. <sup class="c" data-ref="Rex2017" title="Source 450">450</sup>`:`USMSTF 2017: a single FDR diagnosed at 60 or older means average-risk screening options, starting at 40. <sup class="c" data-ref="Rex2017" title="Source 450">450</sup>`;
      uk=young?`BSG/ACPGBI/UKCGG 2020: moderate risk (one FDR diagnosed before 50): a one-off colonoscopy at 55. <sup class="c" data-ref="Monahan2020" title="Source 374">374</sup>`:`BSG/ACPGBI/UKCGG 2020: below the moderate-risk threshold (one FDR before 50, or two FDRs at any age). <sup class="c" data-ref="Monahan2020" title="Source 374">374</sup>`}
    else{rr=`RR <b>3.97</b> (2.60–6.06) with two or more affected relatives <sup class="c" data-ref="Butterworth2006" title="Source 85">85</sup>`;abs=`6.9% (4.5–10.4)`;cls='no';
      more=`Roos 2019 gives 8.2% (6.1–10.9) to age 85 with two or more FDRs. <sup class="c" data-ref="Roos2019" title="Source 457">457</sup>`;
      us=`USMSTF 2017: two FDRs at any age means colonoscopy every 5 years from 40, or 10 years before the youngest relative's diagnosis, whichever is earlier: here from <b>${Math.min(40,a-10)}</b>. <sup class="c" data-ref="Rex2017" title="Source 450">450</sup>`;
      uk=n===3?`BSG/ACPGBI/UKCGG 2020: high risk (three or more FDRs across two or more generations): colonoscopy every 5 years from 40 to 75. <sup class="c" data-ref="Monahan2020" title="Source 374">374</sup>`:`BSG/ACPGBI/UKCGG 2020: moderate risk (two FDRs at any age): a one-off colonoscopy at 55. <sup class="c" data-ref="Monahan2020" title="Source 374">374</sup>`;
      if(n===3&&young)more+=` Three relatives over two generations, one diagnosed before 50, is the shape of the Amsterdam II criteria for Lynch syndrome (which also count endometrial and other Lynch cancers): see <a href="#genes" data-go="genes">Lynch syndrome &amp; FAP</a>. <sup class="c" data-ref="Vasen1999,Syngal2015" title="Source 520,558">520,558</sup>`}
    $('#rkFhOut').innerHTML=`<div class="kicker">Your selection</div>
      <div><span class="big-num">${abs}</span><p>lifetime risk for a 50-year-old with this family history, against 1.8% with none (life-table estimate). <sup class="c" data-ref="Butterworth2006" title="Source 85">85</sup></p></div>
      <p>${rr}</p>${more?`<p>${more}</p>`:''}
      <div class="verdict ${cls}">${n===0?'No affected first-degree relative':n===1?(young?'One relative, diagnosed young':'One relative'):'Two or more relatives'}</div>
      <p><b>US:</b> ${us}</p><p><b>UK:</b> ${uk}</p>
      <p class="stage-cap">The RR is larger for a younger person at risk (2.81 under 50, 1.47 at 50 or older) and smaller in cohort-only data. Screening adherence among people with a family history is below 50%. <sup class="c" data-ref="Wong2018,Roos2019,Lowery2016" title="Source 340,457,589">340,457,589</sup></p>
      <div class="pt"><b>In plain words</b>Even with a family history, most people never get bowel cancer. The doubling starts from a small number. <sup class="c" data-ref="Butterworth2006,Roos2019" title="Source 85,457">85,457</sup></div>`;
  }
  $('#rkFdr').addEventListener('change',fh);
  $('#rkFage').addEventListener('change',()=>{const v=+$('#rkFage').value;$('#rkFexact').value={40:42,47:47,55:55,65:65}[v];fh()});
  $('#rkFexact').addEventListener('input',()=>{const a=parseInt($('#rkFexact').value,10);if(a>=15&&a<=100)$('#rkFage').value=bandOf(a);fh()});
  fh();
  const prevR=redraws.risk;redraws.risk=()=>{prevR&&prevR();fh()};
};
/* =============== 1.5 Lynch syndrome & FAP =============== */
/* ---- the pedigree: one illustrative family drawn three ways ----
   x,y in the wide layout; p = parents (couple key) for transmission paths.
   per mode: a (0 unaffected, 1 affected), l (label lines), g ('+' carrier, '−' tested negative, 'c' recessive carrier,
   '' not tested), o (order of cascade testing), dead, odds (label shown during transmission) */
const GN_NODES=[
 {id:'I1',sex:'m',x:165,y:70},{id:'I2',sex:'f',x:245,y:70},
 {id:'II1',sex:'f',x:80,y:190,p:'I'},{id:'IIs',sex:'m',x:170,y:190},{id:'II2',sex:'m',x:330,y:190,p:'I'},{id:'IIt',sex:'f',x:415,y:190},
 {id:'III1',sex:'f',x:42,y:310,p:'II1',pro:1},{id:'III2',sex:'m',x:125,y:310,p:'II1'},{id:'III3',sex:'f',x:208,y:310,p:'II1'},
 {id:'III4',sex:'m',x:330,y:310,p:'II2'},{id:'III5',sex:'f',x:415,y:310,p:'II2'}];
const GN_COUPLES={I:['I1','I2'],II1:['II1','IIs'],II2:['II2','IIt']};
const GN_FAM={
 lynch:{name:'Lynch syndrome',
  I1:{a:1,l:['CRC 52','died 60'],g:'+',dead:1,inf:1},I2:{a:0,l:['age 78'],g:''},
  II1:{a:1,l:['endometrial','cancer 49'],g:'+',o:1},IIs:{a:0,l:['age 58'],g:''},II2:{a:0,l:['age 50'],g:'+',o:2},IIt:{a:0,l:['age 49'],g:''},
  III1:{a:1,l:['CRC 44'],g:'+',o:0},III2:{a:0,l:['age 41'],g:'+',o:3},III3:{a:0,l:['age 37'],g:'−',o:4},III4:{a:0,l:['age 24'],g:'+',o:5},III5:{a:0,l:['age 20'],g:'−',o:6},
  odds:{II1:'1 in 2',II2:'1 in 2',III1:'1 in 2',III2:'1 in 2',III3:'1 in 2',III4:'1 in 2',III5:'1 in 2'},
  plan:{'+':'colonoscopy','−':'usual risk'}},
 fap:{name:'FAP',
  I1:{a:1,l:['CRC 39','died 41'],g:'+',dead:1,inf:1},I2:{a:0,l:['age 70'],g:''},
  II1:{a:1,l:['colectomy','at 21'],g:'+',o:1},IIs:{a:0,l:['age 50'],g:''},II2:{a:0,l:['age 47'],g:'−',o:2},IIt:{a:0,l:['age 45'],g:''},
  III1:{a:1,l:['polyposis','at 19'],g:'+',o:0},III2:{a:0,l:['age 15'],g:'+',o:3},III3:{a:0,l:['age 12'],g:'−',o:4},III4:{a:0,l:['age 18'],g:'',na:1},III5:{a:0,l:['age 16'],g:'',na:1},
  odds:{II1:'1 in 2',II2:'1 in 2',III1:'1 in 2',III2:'1 in 2',III3:'1 in 2'},
  plan:{'+':'scope from 12','−':'usual risk'}},
 map:{name:'MUTYH-associated polyposis',
  I1:{a:0,l:['age 80'],g:''},I2:{a:0,l:['age 77'],g:''},
  II1:{a:0,l:['age 70'],g:'c',o:1},IIs:{a:0,l:['age 72'],g:'c',o:2},II2:{a:0,l:['age 66'],g:'c',o:3},IIt:{a:0,l:['age 64'],g:''},
  III1:{a:1,l:['polyps, CRC','at 47'],g:'aa',o:0},III2:{a:0,l:['age 44'],g:'c',o:4},III3:{a:0,l:['age 40'],g:'−',o:5},III4:{a:0,l:['age 38'],g:'c',o:6},III5:{a:0,l:['age 35'],g:'−',o:7},
  odds:{III1:'1 in 4',III2:'1 in 4',III3:'1 in 4',III4:'carrier 1 in 2',III5:'carrier 1 in 2'},
  plan:{aa:'yearly scope',c:'no extra','−':'usual risk'}}
};
/* step timing, shared by the three modes */
const GN_T=[0,.2,.42,.62,.82];
const GN_STEPS={
 lynch:[
  {k:'Step 1 · the proband',t:'A woman of 44 with colorectal cancer',
   txt:`The arrow marks the proband: the first person in the family to come to medical attention. Her tumour is tested for mismatch repair deficiency, as guidelines now advise for every new colorectal cancer, and shows loss of MSH2 and MSH6. <sup class="c" data-ref="Syngal2015,Seppala2021" title="Source 483,520">483,520</sup> Lynch syndrome is autosomal dominant, caused by a germline variant in MLH1, MSH2, MSH6, PMS2 or EPCAM. <sup class="c" data-ref="Syngal2015" title="Source 520">520</sup>`,
   pt:`Many hospitals now test every bowel cancer for signs of Lynch syndrome, so relatives can be warned. <sup class="c" data-ref="Syngal2015,Seppala2021" title="Source 483,520">483,520</sup>`,
   hook:`Universal MMR tumour testing: sensitivity 100% vs 87.8% for the Bethesda guidelines. <sup class="c" data-ref="Moreira2012" title="Source 376">376</sup>`},
  {k:'Step 2 · the family history',t:'Three cancers, two generations, one before 50',
   txt:`Her mother had endometrial cancer at 49 and her grandfather colorectal cancer at 52. That fits Amsterdam II: at least three relatives with a Lynch-associated cancer (here counting the proband), one a first-degree relative of the other two, two successive generations, one diagnosed before 50, FAP excluded. <sup class="c" data-ref="Vasen1999,Syngal2015" title="Source 520,558">520,558</sup> Family criteria miss many families: 28% of Lynch cases in one cohort did not meet the revised Bethesda guidelines. <sup class="c" data-ref="Hampel2008" title="Source 221">221</sup>`,
   pt:`Bowel and womb cancer in the same family, some at young ages, is a pattern doctors look for.`,
   hook:`Amsterdam II = "3-2-1-0": 3 relatives, 2 generations, 1 before 50, 0 FAP. <sup class="c" data-ref="Vasen1999,Syngal2015" title="Source 520,558">520,558</sup>`},
  {k:'Step 3 · transmission',t:'Each child: a 1 in 2 chance',
   txt:`A carrier passes either the variant copy or the normal copy to each child, so every child has a 50% chance of inheriting it, whatever happened to the brothers and sisters. <sup class="c" data-ref="Syngal2015" title="Source 520">520</sup> Grandfather is an obligate carrier: he links the affected mother to the variant. The variant can pass through people who never develop cancer, like the uncle here.`,
   pt:`Each child of a parent with Lynch syndrome has a 1 in 2 chance of inheriting it. It is a coin toss for every child, not a quota per family. <sup class="c" data-ref="Syngal2015" title="Source 520">520</sup>`,
   hook:`Autosomal dominant: 50% per child, both sexes, vertical transmission.`},
  {k:'Step 4 · cascade testing',t:'Testing relatives for the family variant',
   txt:`Once the proband's variant is known, relatives can have a targeted test. In a population study each Lynch proband had on average three relatives who also carried the variant. <sup class="c" data-ref="Hampel2008" title="Source 221">221</sup> Here four relatives carry it: the mother, who already had cancer, and three who have not: the uncle, a brother and a cousin. Relatives who test negative return to population risk. EGAPP found sufficient evidence to offer Lynch testing to everyone with newly diagnosed colorectal cancer, to benefit their relatives. <sup class="c" data-ref="EGAPP2009" title="Source 145">145</sup>`,
   pt:`About 1 in 300 people carry a Lynch syndrome gene change, and most do not know it. <sup class="c" data-ref="Win2017,DominguezValentin2020" title="Source 133,582">133,582</sup>`,
   hook:`About 3% of colorectal cancer patients have Lynch syndrome. <sup class="c" data-ref="Hampel2008,Moreira2012" title="Source 221,376">221,376</sup>`},
  {k:'Step 5 · surveillance',t:'What carriers are offered',
   txt:`ACG 2015: colonoscopy "at least every 2 years, beginning between ages 20 and 25 years", considering annual colonoscopy. The UK advises every 2 years until 75, from 25 for MLH1/MSH2 and from 35 for MSH6/PMS2. <sup class="c" data-ref="Syngal2015,Monahan2020" title="Source 374,520">374,520</sup> In a 15-year trial, colonoscopy every 3 years cut colorectal cancer from 16% to 6%, with no colorectal cancer deaths in the screened group. <sup class="c" data-ref="Jarvinen2000" title="Source 260">260</sup> European and UK guidelines also discuss daily aspirin (CAPP2: 9% vs 13%). <sup class="c" data-ref="Burn2020,Seppala2021,Monahan2020" title="Source 84,374,483">84,374,483</sup>`,
   pt:`If you have Lynch syndrome, regular colonoscopy greatly lowers your chance of dying from bowel cancer. <sup class="c" data-ref="Jarvinen2000" title="Source 260">260</sup>`,
   hook:`Järvinen 2000: CRC 6% vs 16% (−62%) with 3-yearly colonoscopy in Lynch families.`}],
 fap:[
  {k:'Step 1 · the proband',t:'A woman of 19 with hundreds of polyps',
   txt:`FAP is autosomal dominant, caused by germline APC variants on chromosome 5q21. Carriers develop hundreds of adenomas, and without treatment cancer follows at an average age of 35–40. <sup class="c" data-ref="Galiatsatos2006" title="Source 191">191</sup> It occurs in about 1 in 8,300 births and causes less than 1% of colorectal cancer. <sup class="c" data-ref="Half2009" title="Source 214">214</sup>`,
   pt:`FAP causes hundreds of polyps. Without surgery to remove the large bowel, cancer is almost certain. <sup class="c" data-ref="Zaffaroni2024" title="Source 597">597</sup>`,
   hook:`FAP: APC, 5q21, dominant; CRC risk "virtually 100% by 60 years" untreated. <sup class="c" data-ref="Zaffaroni2024" title="Source 597">597</sup>`},
  {k:'Step 2 · the family history',t:'A grandfather who died at 41',
   txt:`Her grandfather died of colorectal cancer at 41 and her mother had her colon removed at 21. About 70% of people with FAP have a family history; 15–30% of APC variants arise de novo, so a child can be the first in the family. <sup class="c" data-ref="Half2009,Zaffaroni2024" title="Source 214,597">214,597</sup> In the St Mark's series the average age at cancer was 39, with 87% affected by 45. <sup class="c" data-ref="Syngal2015" title="Source 520">520</sup>`,
   pt:`Some people with FAP are the first in their family: the gene change started with them.`,
   hook:`15–30% of APC variants are de novo: no family history does not exclude FAP. <sup class="c" data-ref="Zaffaroni2024" title="Source 597">597</sup>`},
  {k:'Step 3 · transmission',t:'Each child: a 1 in 2 chance',
   txt:`As in Lynch syndrome, each child of a carrier has a 50% chance of inheriting the variant. <sup class="c" data-ref="Galiatsatos2006" title="Source 191">191</sup> Unlike Lynch syndrome, carriers develop hundreds of adenomas, and without treatment cancer almost inevitably follows. <sup class="c" data-ref="Galiatsatos2006" title="Source 191">191</sup>`,
   pt:`Each child of a parent with FAP has a 1 in 2 chance of inheriting it. <sup class="c" data-ref="Syngal2015" title="Source 520">520</sup>`,
   hook:`Autosomal dominant: 50% per child.`},
  {k:'Step 4 · cascade testing',t:'Children are tested young',
   txt:`Her younger brother (15) carries the variant; her sister (12) does not. Her uncle tests negative, so his children are not at risk and need no testing. Registry data show why this matters: colorectal cancer was present in 3–10% of people found by registry surveillance against 50–70% of those who came with symptoms. <sup class="c" data-ref="Monahan2020" title="Source 374">374</sup> If no APC variant has been found in a family, UK guidance advises colonoscopy from 12–14, then every 5 years, for at-risk relatives. <sup class="c" data-ref="Monahan2020" title="Source 374">374</sup>`,
   pt:`Testing a family early means polyps are found before they turn into cancer.`,
   hook:`Children of a relative who tested negative are not at risk.`},
  {k:'Step 5 · surveillance and surgery',t:'From 12, then a colectomy',
   txt:`Europe 2024: colonoscopy from age 12 in classic FAP, by 18–20 in attenuated FAP. UK 2020: from 12–14, then every 1–3 years, with upper GI surveillance from 25. <sup class="c" data-ref="Zaffaroni2024,Monahan2020" title="Source 374,597">374,597</sup> Prophylactic colectomy is usually advised by the late teens or early twenties. <sup class="c" data-ref="Half2009" title="Source 214">214</sup> After colectomy, duodenal cancer and desmoid tumours are the two main causes of death. <sup class="c" data-ref="Half2009" title="Source 214">214</sup>`,
   pt:`People with FAP have their large bowel removed as young adults, then keep having checks of the upper gut.`,
   hook:`After colectomy, duodenal cancer and desmoids are the leading causes of death in FAP. <sup class="c" data-ref="Half2009" title="Source 214">214</sup>`}],
 map:[
  {k:'Step 1 · the proband',t:'A woman of 47 with polyps and cancer',
   txt:`MUTYH-associated polyposis (MAP) is autosomal recessive: both copies of MUTYH carry a variant. It causes about 7% of adenomatous polyposis and 0.7% of colorectal cancer, and 77.4% of patients have fewer than 100 adenomas. Mean age at colorectal cancer is 47.85 years. <sup class="c" data-ref="Zaffaroni2024" title="Source 597">597</sup>`,
   pt:`In MAP a person inherits one faulty copy from each parent.`,
   hook:`MAP: biallelic MUTYH, recessive, often fewer than 100 adenomas. <sup class="c" data-ref="Zaffaroni2024" title="Source 597">597</sup>`},
  {k:'Step 2 · the family history',t:'Nobody else is affected',
   txt:`The parents and grandparents had no polyposis. A recessive condition typically shows up in one generation, among brothers and sisters, not down a line of parents and children. One in 45 people carries a MUTYH variant, mostly in one copy. <sup class="c" data-ref="Win2017" title="Source 582">582</sup>`,
   pt:`No family history does not rule out an inherited cause.`,
   hook:`Recessive pattern: affected siblings, unaffected carrier parents.`},
  {k:'Step 3 · transmission',t:'Two carrier parents: 1 in 4',
   txt:`When both parents carry one MUTYH variant, each child has a 25% chance of being affected (two copies), 50% of being a carrier (one copy) and 25% of inheriting neither. <sup class="c" data-ref="Galiatsatos2006,Zaffaroni2024" title="Source 191,597">191,597</sup> Her uncle's children can be carriers, but not affected, because their mother carries no variant.`,
   pt:`If both parents carry one copy, each child has a 1 in 4 chance of MAP.`,
   hook:`Autosomal recessive: 25% affected, 50% carriers, 25% unaffected non-carriers.`},
  {k:'Step 4 · cascade testing',t:'Carriers shown half-shaded',
   txt:`Both parents, the uncle, a brother and a cousin carry one copy. Single-copy carriers have a colorectal cancer risk to 70 of 7.2% (men) and 5.6% (women), against 2.9% and 2.1% in the general population; with a first-degree relative diagnosed by 50, 12.5% and 10%. <sup class="c" data-ref="Win2014" title="Source 581">581</sup>`,
   pt:`Carrying one copy raises risk a little. It does not cause polyposis.`,
   hook:`Monoallelic MUTYH: about 2–3 times population risk. <sup class="c" data-ref="Win2014" title="Source 581">581</sup>`},
  {k:'Step 5 · surveillance',t:'Yearly for MAP, not for carriers',
   txt:`UK 2020 advises colonoscopy from 18–20, then yearly, for MAP, and does not recommend routine colonoscopy for single-copy carriers. <sup class="c" data-ref="Monahan2020" title="Source 374">374</sup> ACG gives a MAP colorectal cancer risk of 19% by 50 and 43% by 60. <sup class="c" data-ref="Syngal2015" title="Source 520">520</sup> Whether single-copy carriers need more screening is debated. <sup class="c" data-ref="Win2014,Monahan2020" title="Source 374,581">374,581</sup>`,
   pt:`People with MAP have a colonoscopy every year. Carriers of one copy usually follow normal screening.`,
   hook:`MAP: colonoscopy yearly from 18–20 (UK 2020). <sup class="c" data-ref="Monahan2020" title="Source 374">374</sup>`}]
};
GN_STEPS.lynch.forEach((s,i)=>{['lynch','fap','map'].forEach(m=>{GN_STEPS[m][i].from=GN_T[i];GN_STEPS[m][i].at=GN_T[i]+(i?.1:.08)})});

/* ---- mismatch repair ---- */
const GN_MMR_T=[0,.12,.25,.45,.6,.8];
const GN_MMR={
 p:[
  {k:'Replication',t:'Copying a microsatellite',txt:`DNA polymerase copies the template strand. Here it reaches a microsatellite, a run of ten A·T pairs. Short repeats like (A)n or (CA)n are especially error-prone. Mismatch repair corrects base–base mismatches and insertion/deletion mispairs that escape the polymerase's own proofreading, improving replication fidelity by several orders of magnitude. <sup class="c" data-ref="Vilar2010,Jiricny2006,Kunkel2005" title="Source 265,299,564">265,299,564</sup>`,
   pt:`Repeats like AAAAAAAAAA are where the cell's DNA copier most easily stutters.`},
  {k:'Slippage',t:'The new strand slips',txt:`Inside the repeat the new strand dissociates and re-anneals out of register, leaving an extra A looped out: an insertion–deletion loop. <sup class="c" data-ref="Vilar2010" title="Source 564">564</sup>`,
   pt:`The copier loses its place in a stretch of identical letters and adds one too many.`,hook:`Microsatellite slippage creates insertion–deletion loops, the lesion that MMR fixes and MSI reveals.`},
  {k:'Recognition',t:'MutSα finds the loop',txt:`MSH2 pairs with MSH6 to form MutSα, best at single-base mismatches; MSH2 with MSH3 forms MutSβ, for larger loops. The complex clamps onto the error. <sup class="c" data-ref="Vilar2010,Boland2010,Li2008" title="Source 63,319,564">63,319,564</sup>`,
   hook:`MutSα = MSH2 + MSH6 (recognition). MutSβ = MSH2 + MSH3 (larger loops). <sup class="c" data-ref="Vilar2010,Boland2010" title="Source 63,564">63,564</sup>`},
  {k:'Recruitment',t:'MutLα joins',txt:`MLH1 pairs with PMS2 to form MutLα. The MutS–MutL sliding clamp interacts with replication factor C and PCNA, the ring that marks the newly made strand. <sup class="c" data-ref="Vilar2010,Boland2010,Li2008" title="Source 63,319,564">63,319,564</sup>`,
   hook:`MutLα = MLH1 + PMS2, recruited after MutSα recognises the error. <sup class="c" data-ref="Vilar2010,Boland2010" title="Source 63,564">63,564</sup>`},
  {k:'Excision',t:'Exonuclease 1 removes the error',txt:`Exonuclease 1 removes the stretch of the new strand that contains the error, loop and all. <sup class="c" data-ref="Vilar2010,Li2008" title="Source 319,564">319,564</sup>`,
   pt:`The spell-checker cuts out the badly copied section of the new strand.`},
  {k:'Resynthesis',t:'Refilled and sealed: ten repeats',txt:`DNA polymerase δ fills the gap and DNA ligase seals it. The repeat is back to ten. <sup class="c" data-ref="Vilar2010,Li2008" title="Source 319,564">319,564</sup>`,
   pt:`The section is copied again, correctly, and the cell's DNA stays the same length.`}],
 d:[
  {k:'Replication',t:'Copying a microsatellite',txt:`Same copying, but this cell has lost mismatch repair: in Lynch syndrome the story starts with an inherited faulty MMR gene; in about 12% of colorectal cancers MLH1 is silenced by promoter methylation instead. <sup class="c" data-ref="Boland2010,Herman1998" title="Source 63,235">63,235</sup>`,
   pt:`In about 15 in 100 bowel cancers, the cell's spell-checker for DNA is broken. <sup class="c" data-ref="Boland2010" title="Source 63">63</sup>`},
  {k:'Slippage',t:'The same slip happens',txt:`The new strand slips in the repeat and an extra A loops out, exactly as in a normal cell. Slippage itself is not the problem; leaving it unrepaired is. <sup class="c" data-ref="Vilar2010" title="Source 564">564</sup>`},
  {k:'Recognition',t:'Nothing comes',txt:`No working MutSα (MSH2–MSH6) or MutLα (MLH1–PMS2): the loop is not recognised. Losing mismatch repair creates a mutator phenotype. <sup class="c" data-ref="Jiricny2006,Kunkel2005" title="Source 265,299">265,299</sup>`,
   hook:`MSI in about 15% of CRC: about 3% Lynch, about 12% sporadic MLH1 methylation. <sup class="c" data-ref="Boland2010" title="Source 63">63</sup>`},
  {k:'Next division',t:'The error is copied in',txt:`At the next division the looped strand becomes a template, and one daughter cell carries eleven repeats instead of ten. Inside a gene, such insertions and deletions cause frameshifts that truncate proteins: targets include TGFβR2, ACVR2, BAX and caspase-5. <sup class="c" data-ref="Vilar2010,Boland2010" title="Source 63,564">63,564</sup>`,
   hook:`Coding microsatellites hit by MSI: TGFBR2, ACVR2, BAX, caspase-5. <sup class="c" data-ref="Boland2010" title="Source 63">63</sup>`},
  {k:'Instability',t:'Repeat lengths drift: MSI',txt:`Every microsatellite in the genome drifts like this: microsatellite instability. Every human MMR gene except MLH1 has its own mononucleotide repeat of at least A7, so repair can decay further. <sup class="c" data-ref="Boland2010" title="Source 63">63</sup> TCGA found 16% of colorectal cancers hypermutated, three-quarters of them MSI-high. <sup class="c" data-ref="TCGA2012" title="Source 524">524</sup>`},
  {k:'Consequence',t:'A tumour full of mutations',txt:`Whole-exome sequencing found a mean of 1,782 somatic mutations in dMMR tumours against 73 in pMMR tumours. <sup class="c" data-ref="Le2015" title="Source 307">307</sup> The resulting neoantigens help explain why dMMR cancers respond to PD-1 blockade: see <a href="#biomarkers" data-go="biomarkers">Tumour biomarkers</a>. <sup class="c" data-ref="Le2017" title="Source 308">308</sup>`,
   pt:`A broken spell-checker means thousands of typos. The immune system can spot the odd proteins they make, which is why immunotherapy works well here.`,
   hook:`dMMR ≈ 1,782 mutations vs pMMR ≈ 73 (Le 2015).`}]
};
['p','d'].forEach(m=>GN_MMR[m].forEach((s,i)=>{s.from=GN_MMR_T[i];s.at=GN_MMR_T[i]+(i===5?.12:.08)}));

/* ---- PLSD 2020 cumulative incidence (age, %) ---- */
const GN_PLSD={
 MLH1:{F:[ [30,0],[40,11.8],[50,20.8],[60,32.2],[70,44.1],[75,48.3] ],M:[ [30,4.5],[40,16.4],[50,33.6],[60,45.2],[70,52.8],[75,57.1] ],c:'var(--tumour)'},
 MSH2:{F:[ [30,1.9],[40,6.9],[50,16.9],[60,26.2],[70,41.9],[75,46.6] ],M:[ [30,2.6],[40,9.9],[50,18.1],[60,34.1],[70,46.3],[75,51.4] ],c:'var(--brand)'},
 MSH6:{F:[ [40,2.5],[50,4.4],[60,8.9],[70,20.3],[75,20.3] ],M:[ [40,6.3],[50,6.3],[60,8.9],[70,11.7],[75,18.2] ],c:'var(--accent)'},
 PMS2:{F:[ [50,0],[60,0],[70,3.4],[75,10.4] ],M:[ [50,0],[60,0],[70,3.4],[75,10.4] ],c:'var(--rx)'}
};

inits.genes=()=>{
  /* ================= pedigree ================= */
  const svg=$('#gnSvg'),rg=$('#gnT');let fam='lynch',setSt=()=>{};
  const byId={};GN_NODES.forEach(n=>byId[n.id]=n);
  function draw(t){const N=vb(svg,'720 420','400 600');const F=GN_FAM[fam];
    const P=n=>N?[n.x*.84+16,n.y]:[n.x+10,n.y];
    const ph=phaseOf(GN_STEPS[fam],t);
    const pHist=ramp(t,GN_T[1],GN_T[1]+.12),pTr=ramp(t,GN_T[2],GN_T[2]+.14),pCas=ramp(t,GN_T[3],GN_T[3]+.16),pPlan=ramp(t,GN_T[4],GN_T[4]+.08);
    const r=N?10:11;
    let s=`<defs>${marker('pedArrow','var(--ink)')}</defs>`;
    s+=`<text x="${N?8:10}" y="22" class="t-sm" style="fill:var(--tumour)">${F.name.toUpperCase()}</text>`;
    ['I','II','III'].forEach((g,i)=>s+=`<text x="${N?4:2}" y="${74+i*120}" class="t-sm" style="font-weight:700">${g}</text>`);
    /* lines */
    const line=(a,b,c,d)=>`<line x1="${f1(a)}" y1="${f1(b)}" x2="${f1(c)}" y2="${f1(d)}" style="stroke:var(--ink);stroke-width:1.3"/>`;
    Object.entries(GN_COUPLES).forEach(([k,[a,b]])=>{const A=P(byId[a]),B=P(byId[b]);s+=line(A[0]+r,A[1],B[0]-r,B[1]);
      const kids=GN_NODES.filter(n=>n.p===k);if(!kids.length)return;const mx=(A[0]+B[0])/2,sy=A[1]+60;
      s+=line(mx,A[1],mx,sy);const xs=kids.map(n=>P(n)[0]);s+=line(Math.min(...xs,mx),sy,Math.max(...xs,mx),sy);
      kids.forEach(n=>{const C=P(n);s+=line(C[0],sy,C[0],C[1]-r)})});
    /* transmission: a dot runs from the couple to each child, with the odds */
    if(pTr>0){Object.entries(GN_COUPLES).forEach(([k,[a,b]])=>{const A=P(byId[a]),B=P(byId[b]),mx=(A[0]+B[0])/2,sy=A[1]+60;
      GN_NODES.filter(n=>n.p===k&&F.odds[n.id]).forEach((n,j)=>{const C=P(n),u=clamp(pTr*1.4-j*.08);if(u<=0)return;
        const pts=[[mx,A[1]],[mx,sy],[C[0],sy],[C[0],C[1]-r]],L1=sy-A[1],L2=Math.abs(C[0]-mx),L3=C[1]-r-sy,tot=L1+L2+L3;let d=u*tot,x,y;
        if(d<L1){x=mx;y=A[1]+d}else if(d<L1+L2){x=lerp(mx,C[0],(d-L1)/L2);y=sy}else{x=C[0];y=sy+(d-L1-L2)}
        const live=t<GN_T[3]+.1;
        if(live)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="4.5" style="fill:var(--gold)"/>`;
        if(u>=1&&live)s+=`<rect x="${f1(C[0]-(N?26:28))}" y="${f1(C[1]-r-30)}" width="${N?52:56}" height="15" rx="7" style="fill:var(--gold-soft);stroke:var(--gold)"/><text x="${f1(C[0])}" y="${f1(C[1]-r-19.5)}" class="t-xs t-mid" style="fill:var(--ink)">${F.odds[n.id].replace('carrier ','c ')}</text>`})})}
    /* symbols */
    let carriers=0,tested=0;
    GN_NODES.forEach(n=>{const d=F[n.id],[x,y]=P(n);
      let aff=n.pro?1:(pHist>0?(d.a?1:0):0);
      const shown=n.pro||pHist*12>GN_NODES.indexOf(n)*.6;if(!n.pro&&!shown)aff=0;
      const order=d.o==null?99:d.o,known=pCas>0&&order<99&&pCas*8>order;
      if(fam==='map'&&known&&d.g==='c')aff=.5;
      if(fam!=='map'&&d.inf&&pCas>.5)aff=d.a?1:aff;
      s+=`<g style="opacity:${n.pro||shown?1:.45}">${ped(x,y,n.sex,aff,{r,dead:d.dead&&shown,proband:n.pro})}</g>`;
      if(fam!=='map'&&known&&d.g==='+'&&!d.a)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="3.6" style="fill:var(--ink)"/>`;
      if(n.pro||shown)d.l.forEach((l,i)=>s+=`<text x="${f1(x+(n.pro?9:0))}" y="${f1(y+r+12+i*11)}" class="t-xs t-mid" style="fill:${d.a?'var(--tumour)':'var(--muted)'}">${l}</text>`);
      /* genotype badge */
      let badge='',bc='var(--muted)';
      if(known){badge=d.g==='+'?'+':d.g==='−'?'−':d.g==='c'?'carrier':d.g==='aa'?'2 copies':'';bc=d.g==='−'?'var(--good)':d.g==='c'?'var(--polyp-line)':'var(--tumour)';tested++;if(d.g==='+'||d.g==='c')carriers++}
      else if(d.inf&&pCas>.5){badge='obligate +';bc='var(--tumour)'}
      else if(d.na&&pCas>.5){badge='not at risk';bc='var(--good)'}
      if(badge){const w=badge.length*5.8+10;s+=`<rect x="${f1(x-w/2)}" y="${f1(y-r-18)}" width="${f1(w)}" height="14" rx="7" style="fill:var(--panel);stroke:${bc}"/><text x="${f1(x)}" y="${f1(y-r-8)}" class="t-xs t-mid" style="fill:${bc};font-weight:700">${badge}</text>`}
      if(pPlan>0&&known&&F.plan[d.g]){const pl=F.plan[d.g],good=d.g==='−';
        s+=`<text x="${f1(x+(n.pro?9:0))}" y="${f1(y+r+12+d.l.length*11+2)}" class="t-xs t-mid" style="fill:${good?'var(--good)':'var(--accent)'};font-weight:700;opacity:${pPlan}">${pl}</text>`}
    });
    /* side panel */
    const Q=N?{x:8,y:398,w:384,h:194}:{x:486,y:36,w:226,h:370};
    s+=`<rect x="${Q.x}" y="${Q.y}" width="${Q.w}" height="${Q.h}" rx="10" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    const qx=Q.x+12;let qy=Q.y+22;const T=(txt,cls='t-sm',st='')=>{s+=`<text x="${qx}" y="${f1(qy)}" class="${cls}" style="${st}">${txt}</text>`;qy+=cls==='t-lbl'?20:15};
    if(ph===0){T('THE PROBAND','t-xs');T(fam==='lynch'?'Tumour: MSH2/MSH6 lost':fam==='fap'?'Hundreds of adenomas':'Polyps + cancer at 47','t-lbl');
      T(fam==='lynch'?'dMMR → germline test':fam==='fap'?'APC germline test':'MUTYH germline test');
      T(fam==='lynch'?'Lynch: MLH1, MSH2, MSH6,':fam==='fap'?'APC on chromosome 5q21':'Biallelic MUTYH','t-sm','fill:var(--ink)');if(fam==='lynch')T('PMS2 or EPCAM','t-sm','fill:var(--ink)');
      T('Legend','t-xs');qy+=4;s+=ped(qx+10,qy,'f',1,{r:8})+`<text x="${qx+26}" y="${qy+4}" class="t-xs">affected</text>`+ped(qx+110,qy,'m',0,{r:8})+`<text x="${qx+126}" y="${qy+4}" class="t-xs">unaffected</text>`;qy+=24;
      s+=ped(qx+10,qy,'f',.5,{r:8})+`<text x="${qx+26}" y="${qy+4}" class="t-xs">carrier (recessive)</text>`;qy+=24;
      s+=ped(qx+10,qy,'m',0,{r:8,dead:1})+`<text x="${qx+26}" y="${qy+4}" class="t-xs">died</text>`;}
    else if(ph===1){T('FAMILY HISTORY','t-xs');
      if(fam==='lynch'){T('Amsterdam II check','t-lbl');
        [['3 relatives, Lynch cancers',.15],['1 is FDR of the other 2',.35],['2 successive generations',.55],['1 diagnosed before 50',.75],['FAP excluded',.92]].forEach(([l,k])=>{const ok=pHist>=k;s+=`<text x="${qx}" y="${f1(qy)}" class="t-sm" style="fill:${ok?'var(--good)':'var(--muted)'}">${ok?'✓':'·'} ${l}</text>`;qy+=17});
        qy+=6;T(pHist>=.92?'Criteria met: "3-2-1-0"':'checking…','t-sm','fill:var(--ink);font-weight:700')}
      else if(fam==='fap'){T('Polyposis, two generations','t-lbl');T('Grandfather: CRC 39');T('Mother: colectomy at 21');T('~70% have a family history');T('15–30% of APC variants');T('arise de novo')}
      else{T('One generation only','t-lbl');T('Parents: no polyps');T('Grandparents: no polyps');T('1 in 45 people carry');T('a MUTYH variant');T('(mostly one copy)')}}
    else if(ph===2){T('INHERITANCE','t-xs');T(fam==='map'?'Carrier × carrier':'Carrier × non-carrier','t-lbl');
      /* Punnett square */
      const cs=N?42:46,px=qx+30,py=qy+16,A=fam==='map'?['M','m']:['V','n'],B=fam==='map'?['M','m']:['n','n'];
      s+=`<text x="${px+cs}" y="${py-4}" class="t-xs t-mid">${A[0]}</text><text x="${px+cs*2}" y="${py-4}" class="t-xs t-mid">${A[1]}</text>`;
      for(let i=0;i<2;i++){s+=`<text x="${px+cs*.5-6}" y="${f1(py+cs*(i+.5)+4)}" class="t-xs t-mid">${B[i]}</text>`;
        for(let j=0;j<2;j++){const k=i*2+j,shown=pTr*4>k;let fill='var(--panel)',lab='';
          if(fam==='map'){const nv=(A[j]==='m')+(B[i]==='m');fill=nv===2?'var(--tumour)':nv===1?'var(--polyp)':'var(--good-soft)';lab=nv===2?'MAP':nv===1?'carrier':'clear'}
          else{const v=A[j]==='V';fill=v?'var(--tumour)':'var(--good-soft)';lab=v?'carrier':'clear'}
          s+=`<rect x="${px+cs*(j+.5)}" y="${f1(py+cs*i)}" width="${cs}" height="${cs}" style="fill:${shown?fill:'var(--panel)'};stroke:var(--ink);stroke-width:1"/>`;
          if(shown)s+=`<text x="${f1(px+cs*(j+1))}" y="${f1(py+cs*(i+.5)+3)}" class="t-xs t-mid" style="fill:${lab==='clear'?'var(--good)':'#fff'};font-weight:700">${lab}</text>`}}
      qy=py+cs*2+20;
      if(N){/* narrow: text to the right of the square */qy=Q.y+60;const rx=px+cs*3;[fam==='map'?'1 in 4 affected':'1 in 2 inherit it',fam==='map'?'2 in 4 carriers':'every child, every time',fam==='map'?'1 in 4 clear':'both sexes alike'].forEach((l,i)=>s+=`<text x="${rx}" y="${qy+i*18}" class="t-sm" style="fill:var(--ink)">${l}</text>`)}
      else{T(fam==='map'?'1 in 4 affected (MAP)':'1 in 2 inherit the variant','t-sm','fill:var(--ink);font-weight:700');T(fam==='map'?'2 in 4 carriers':'for every child,');T(fam==='map'?'1 in 4 inherit neither':'regardless of siblings')}}
    else if(ph===3){T('CASCADE TESTING','t-xs');T(`${tested} tested`,'t-lbl');T(`${Math.max(0,carriers-1)} relatives carry it`,'t-sm','fill:var(--ink);font-weight:700');
      T(fam==='lynch'?'Typical: about 3 relatives':fam==='fap'?'Uncle negative: his':'Carriers half-shaded');T(fam==='lynch'?'per proband (Hampel 2008)':fam==='fap'?'children not at risk':'Single copy: risk to 70');if(fam==='map')T('7.2% men, 5.6% women');}
    else{T('SURVEILLANCE, AS PUBLISHED','t-xs');
      const L={lynch:['Carriers: colonoscopy','every 1–2 y from 20–25 (ACG)','every 2 y to 75 (UK)','Aspirin discussed (CAPP2)','Negative relatives:','population screening'],
        fap:['Carriers: colonoscopy','from 12 (Europe 2024)','12–14, every 1–3 y (UK)','Colectomy by late teens','or early twenties','Upper GI checks from 25'],
        map:['MAP: colonoscopy','from 18–20, then yearly','(UK 2020)','Single-copy carriers:','no routine extra','colonoscopy (UK 2020)']}[fam];
      L.forEach((l,i)=>T(l,i===0||i===3?'t-lbl':'t-sm',i===0||i===3?'font-size:12.5px':''))}
    svg.innerHTML=s;
    setSt(ph);
    $('#gnNote').innerHTML=noteHTML(GN_STEPS[fam][ph]);
    const aff=GN_NODES.filter(n=>F[n.id].a).length;
    $('#gnRead').innerHTML=`<span>syndrome <b>${F.name}</b></span><span>inheritance <b>${fam==='map'?'autosomal recessive':'autosomal dominant'}</b></span><span>affected <b>${pHist>0?aff:1}</b></span><span>carriers found by testing <b>${pCas>0?Math.max(0,carriers-1):'–'}</b></span>`;
  }
  const stop=playWire(rg,$('#gnPlay'),draw,22000,'Replay','genes');
  function wire(){const old=$('#gnSteps'),nu=old.cloneNode(false);old.replaceWith(nu);setSt=stepWire(nu,GN_STEPS[fam],rg,draw,stop)}
  $$('[data-gnm]').forEach(b=>b.addEventListener('click',()=>{stop();fam=b.dataset.gnm;$$('[data-gnm]').forEach(x=>x.setAttribute('aria-pressed',x===b));wire();draw(+rg.value)}));
  wire();draw(+rg.value);

  /* ================= mismatch repair ================= */
  const ms=$('#gnMmr'),mr=$('#gnMmrT');let mm='p',setM=()=>{};
  function drawM(t){const N=vb(ms,'720 330','400 470');const dm=mm==='d';
    const nB=N?14:22,bw=N?26:28,x0=N?18:52,r0=N?2:6,r1=r0+9,yN=N?120:96,yT=yN+34;
    const tmpl=(N?'GC':'GCATCG')+'TTTTTTTTTT'+(N?'AG':'GACTCG'),comp={A:'T',T:'A',G:'C',C:'G'};
    const bx=i=>x0+i*bw+bw/2;
    const pSyn=ramp(t,0,.24),pSlip=ramp(t,.12,.2),pS=ramp(t,.25,.4),pL=ramp(t,.45,.56),pX=ramp(t,.6,.76),pR=ramp(t,.8,.92);
    const loopI=r0+5;let s=`<defs>${marker('gnArr','var(--muted)')}</defs>`;
    const base=(x,y,ch,col,op=1,hl)=>`<g style="opacity:${f1(op)}"><rect x="${f1(x-bw/2+2)}" y="${f1(y-11)}" width="${bw-4}" height="22" rx="4" style="fill:${hl?'var(--polyp)':col};stroke:var(--line)"/><text x="${f1(x)}" y="${f1(y+4)}" class="t-sm t-mid" style="fill:${hl?'#fff':'var(--ink)'};font-weight:700">${ch}</text></g>`;
    s+=`<text x="${x0}" y="${yN-34}" class="t-xs">NEW STRAND (5′→3′)</text><text x="${x0}" y="${yT+30}" class="t-xs">TEMPLATE STRAND</text>`;
    s+=`<rect x="${f1(x0+r0*bw)}" y="${yN-20}" width="${(r1-r0+1)*bw}" height="${yT-yN+40}" rx="8" style="fill:none;stroke:var(--gold);stroke-dasharray:4 3"/><text x="${f1(x0+(r0+r1+1)/2*bw)}" y="${yT+30}" class="t-xs t-mid" style="fill:var(--gold)">microsatellite (A)10</text>`;
    /* template */
    [...tmpl].forEach((c,i)=>s+=base(bx(i),yT,c,'var(--panel-2)'));
    /* new strand: synthesised up to k bases; excised range fades; resynthesis restores */
    const k=pSyn*nB,exL=r0-1,exR=r1+1,dmLate=false;
    for(let i=0;i<nB;i++){if(i+1>k+.001&&i>=k)continue;let op=clamp(k-i);
      if(!dm&&i>=exL&&i<=exR){const cut=clamp(pX*(exR-exL+2)-(i-exL));op*=1-cut;if(pR>0)op=Math.max(op,clamp(pR*(exR-exL+2)-(i-exL)))}
      s+=base(bx(i),yN,comp[tmpl[i]],'var(--mucosa)',op,dmLate&&i>=r0&&i<=r1&&false)}
    /* hydrogen bonds */
    for(let i=0;i<Math.floor(k);i++)s+=`<line x1="${f1(bx(i))}" x2="${f1(bx(i))}" y1="${yN+11}" y2="${yT-11}" style="stroke:var(--muted);stroke-width:1;opacity:.5"/>`;
    /* the loop */
    const loopOp=dm?pSlip:pSlip*(1-ramp(pX,.35,.6));
    if(pSlip>0&&loopOp>0){const lx=(bx(loopI)+bx(loopI+1))/2,ly=yN-20-14*pSlip;
      s+=`<path d="M${f1(lx-bw/2)} ${yN-11}Q${f1(lx)} ${f1(ly-6)} ${f1(lx+bw/2)} ${yN-11}" style="fill:none;stroke:var(--tumour);stroke-width:2;opacity:${f1(loopOp)}"/>`;
      s+=`<g style="opacity:${f1(loopOp)}">${base(lx,ly-6,'A','var(--tumour-soft)')}</g>${pS<.15?`<text x="${f1(lx+bw/2+4)}" y="${f1(ly-14)}" class="t-xs" style="fill:var(--tumour);opacity:${f1(loopOp)}">extra A looped out</text>`:''}`}
    /* polymerase */
    if(pSyn<1||(!dm&&pR>0&&pR<1)){const px=pSyn<1?bx(Math.min(nB-1,k)):bx(lerp(exL,exR,pR));
      s+=`<ellipse cx="${f1(px+6)}" cy="${f1((yN+yT)/2)}" rx="${N?22:26}" ry="34" style="fill:var(--accent);opacity:.22;stroke:var(--accent)"/><text x="${f1(px+6)}" y="${f1(yT+52)}" class="t-xs t-mid" style="fill:var(--accent)">${pSyn<1?'DNA polymerase':'polymerase δ'}</text>`}
    const lx=(bx(loopI)+bx(loopI+1))/2;
    if(!dm){
      /* MutS alpha slides in and clamps */
      if(pS>0&&pX<.7){const x=lerp(x0-30,lx,ease(pS)),op=1-ramp(pX,.4,.7);
        s+=`<g style="opacity:${f1(op)}"><path d="M${f1(x-30)} ${yN-46}Q${f1(x-34)} ${yN+10} ${f1(x-12)} ${yN+18}L${f1(x-12)} ${yN-2}Q${f1(x-18)} ${yN-26} ${f1(x)} ${yN-30}Q${f1(x+18)} ${yN-26} ${f1(x+12)} ${yN-2}L${f1(x+12)} ${yN+18}Q${f1(x+34)} ${yN+10} ${f1(x+30)} ${yN-46}Z" style="fill:var(--rx);opacity:.75"/><text x="${f1(x)}" y="${yN-52}" class="t-xs t-mid" style="fill:var(--rx);font-weight:700">MutSα · MSH2–MSH6</text></g>`}
      if(pL>0&&pX<.7){const op=(1-ramp(pX,.4,.7))*pL,yy=lerp(yN-110,yN-74,ease(pL));
        s+=`<g style="opacity:${f1(op)}"><rect x="${f1(lx-38)}" y="${f1(yy-14)}" width="76" height="22" rx="11" style="fill:var(--lymph)"/><text x="${f1(lx)}" y="${f1(yy+1)}" class="t-xs t-mid" style="fill:#fff;font-weight:700">MutLα</text><text x="${f1(lx+44)}" y="${f1(yy+1)}" class="t-xs" style="fill:var(--lymph)">MLH1–PMS2</text></g>`;
        s+=`<g style="opacity:${f1(op)}"><ellipse cx="${f1(bx(exL-1))}" cy="${yN}" rx="10" ry="20" style="fill:none;stroke:var(--gold);stroke-width:3"/><text x="${f1(bx(exL-1))}" y="${yN-26}" class="t-xs t-mid" style="fill:var(--gold)">PCNA</text></g>`}
      if(pX>0&&pR<.2){const x=bx(lerp(exL,exR,pX)),op=1-ramp(pR,0,.2);
        s+=`<g style="opacity:${f1(op)}"><path d="M${f1(x+16)} ${yN-14}A16 16 0 1 0 ${f1(x+16)} ${yN+14}L${f1(x)} ${yN}Z" style="fill:var(--warn)"/><text x="${f1(x)}" y="${yN-24}" class="t-xs t-mid" style="fill:var(--warn);font-weight:700">EXO1</text></g>`}
      if(pR>=1){s+=`<text x="${f1(lx)}" y="${yN-30}" class="t-sm t-mid" style="fill:var(--good);font-weight:700">✓ ten repeats, sealed by ligase</text>`}
      const pD=ramp(t,.9,.98),yD=yT+(N?100:72);
      if(pD>0){s+=`<text x="${x0}" y="${yD-24}" class="t-xs" style="opacity:${f1(pD)}">NEXT DIVISION: THE DAUGHTER CELL'S TEMPLATE</text>`;
        [...tmpl].forEach((c,i)=>{const op=clamp(pD*nB-i);s+=`<g style="opacity:${f1(op)}">${base(bx(i),yD,c,i>=r0&&i<=r1?'var(--good-soft)':'var(--panel-2)')}</g>`});
        if(pD>=1)s+=`<text x="${f1(x0+(r0+r1+1)/2*bw)}" y="${yD+30}" class="t-sm t-mid" style="fill:var(--good);font-weight:700">(T)10: unchanged, microsatellite stable</text>`}
    }else{
      if(pS>0){s+=`<text x="${f1(lx)}" y="${yN-50}" class="t-sm t-mid" style="fill:var(--bad);font-weight:700;opacity:${f1(pS)}">✕ no MutSα / MutLα</text>`}
      /* daughter duplex with 11 repeats */
      const pD=ramp(t,.45,.6),yD=yT+(N?100:72);
      if(pD>0){const seq=(N?'GC':'GCATCG')+'TTTTTTTTTTT'+(N?'AG':'GACTCG');
        s+=`<text x="${x0}" y="${yD-24}" class="t-xs" style="opacity:${f1(pD)}">NEXT DIVISION: THE DAUGHTER CELL'S TEMPLATE</text>`;
        const w2=bw*nB/(nB+1);
        [...seq].forEach((c,i)=>{const op=clamp(pD*(nB+1)-i);s+=`<g style="opacity:${f1(op)}"><rect x="${f1(x0+i*w2+2)}" y="${yD-11}" width="${f1(w2-4)}" height="22" rx="4" style="fill:${i>=r0&&i<=r1+1?'var(--tumour-soft)':'var(--panel-2)'};stroke:var(--line)"/><text x="${f1(x0+i*w2+w2/2)}" y="${yD+4}" class="t-sm t-mid" style="fill:var(--ink);font-weight:700">${c}</text></g>`});
        if(pD>=1)s+=`<text x="${f1(x0+(r0+r1+2)/2*w2)}" y="${yD+30}" class="t-sm t-mid" style="fill:var(--tumour);font-weight:700">(T)11: one repeat longer</text>`}
      const pI=ramp(t,.6,.78);
      if(pI>0){/* fragment-length peaks: normal vs tumour */
        const gy=N?yD+70:yD+48,gx=N?x0+20:x0+340,gw=N?300:300;
        s+=`<text x="${gx}" y="${gy-4}" class="t-xs" style="opacity:${f1(pI)}">MICROSATELLITE LENGTHS, NORMAL vs TUMOUR</text>`;
        [ [0,'var(--accent)','normal'],[1,'var(--tumour)','tumour'] ].forEach(([j,c,l])=>{const yb=gy+22+j*26;
          s+=`<line x1="${gx}" x2="${gx+gw}" y1="${yb}" y2="${yb}" class="axis" style="opacity:${f1(pI)}"/><text x="${gx-4}" y="${yb}" class="t-xs t-end" style="opacity:${f1(pI)}">${l}</text>`;
          const pk=j?[ [-2,.5],[-1,.8],[0,.45],[1,.9],[2,.35] ]:[ [0,1] ];pk.forEach(([o,h])=>{const xx=gx+gw/2+o*24*pI;s+=`<path d="M${f1(xx-7)} ${yb}Q${f1(xx)} ${f1(yb-20*h*pI)} ${f1(xx+7)} ${yb}" style="fill:${c};opacity:.8"/>`})})}
    }
    ms.innerHTML=s;
    const ph=phaseOf(GN_MMR[mm],t);setM(ph);$('#gnMmrNote').innerHTML=noteHTML(GN_MMR[mm][ph]);
  }
  const stopM=playWire(mr,$('#gnMmrPlay'),drawM,16000,'Replay','genes');
  function wireM(){const old=$('#gnMmrSteps'),nu=old.cloneNode(false);old.replaceWith(nu);setM=stepWire(nu,GN_MMR[mm],mr,drawM,stopM)}
  $$('[data-gnr]').forEach(b=>b.addEventListener('click',()=>{stopM();mm=b.dataset.gnr;$$('[data-gnr]').forEach(x=>x.setAttribute('aria-pressed',x===b));wireM();drawM(+mr.value)}));
  wireM();drawM(+mr.value);

  /* ================= risk curves ================= */
  const cv=$('#gnCurve'),cr=$('#gnCurveT');let sex='F';const on={MLH1:1,MSH2:1,MSH6:1,PMS2:1};
  const interp=(pts,a)=>{if(a<pts[0][0])return null;for(let i=1;i<pts.length;i++)if(a<=pts[i][0]){const p=pts[i-1],q=pts[i];return p[1]+(q[1]-p[1])*(a-p[0])/(q[0]-p[0])}return pts[pts.length-1][1]};
  function drawC(t){const N=vb(cv,'720 360','400 420');const age=lerp(30,75,t);
    const C=N?{x0:44,x1:300,y0:34,y1:370}:{x0:56,x1:510,y0:34,y1:320};
    const X=a=>lerp(C.x0,C.x1,(a-30)/45),Y=v=>lerp(C.y1,C.y0,v/60);
    let s='';
    [0,10,20,30,40,50,60].forEach(v=>s+=`<line x1="${C.x0}" x2="${C.x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="${v?'grid':'axis'}"/><text x="${C.x0-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}%</text>`);
    [30,40,50,60,70,75].forEach(a=>s+=`<text x="${f1(X(a))}" y="${C.y1+15}" class="t-xs t-mid">${a}</text>`);
    s+=`<text x="${C.x1}" y="${C.y1+30}" class="t-xs t-end">age</text><text x="${C.x0}" y="${C.y0-12}" class="t-xs">cumulative colorectal cancer incidence, ${sex==='F'?'women':'men'}</text>`;
    /* population reference at 70 */
    const pop=sex==='F'?2.1:2.9;
    s+=`<circle cx="${f1(X(70))}" cy="${f1(Y(pop))}" r="4" style="fill:var(--muted)"/><text x="${f1(X(70)-6)}" y="${f1(Y(pop)-7)}" class="t-xs t-end">general population ${pop}%</text>`;
    const labs=[];
    Object.entries(GN_PLSD).forEach(([g,D])=>{if(!on[g])return;const pts=D[sex];if(age<pts[0][0])return;
      const vis=pts.filter(p=>p[0]<=age);const cur=interp(pts,age);let d='';vis.concat([ [age,cur] ]).forEach((p,i)=>d+=(i?'L':'M')+f1(X(p[0]))+' '+f1(Y(p[1])));
      s+=`<path d="${d}" style="fill:none;stroke:${D.c};stroke-width:2.6;stroke-linejoin:round"/>`;
      vis.forEach(p=>s+=`<circle cx="${f1(X(p[0]))}" cy="${f1(Y(p[1]))}" r="3.6" style="fill:var(--panel);stroke:${D.c};stroke-width:2"/>`);
      labs.push({g,c:D.c,v:cur,y:Y(cur)})});
    /* end labels, de-overlapped */
    labs.sort((a,b)=>a.y-b.y);for(let i=1;i<labs.length;i++)if(labs[i].y-labs[i-1].y<14)labs[i].y=labs[i-1].y+14;
    labs.forEach(l=>s+=`<text x="${f1(X(age)+8)}" y="${f1(l.y+4)}" class="t-sm" style="fill:${l.c};font-weight:700">${l.g} ${f1(l.v)}%</text>`);
    s+=`<line x1="${f1(X(age))}" x2="${f1(X(age))}" y1="${C.y0}" y2="${C.y1}" style="stroke:var(--ink);opacity:.3"/>`;
    if(!N){const bx=636;s+=`<text x="${bx}" y="50" class="t-xs">CARRIERS IN THE</text><text x="${bx}" y="62" class="t-xs">POPULATION</text>`;
      [ ['MLH1','1 in 1,946'],['MSH2','1 in 2,841'],['MSH6','1 in 758'],['PMS2','1 in 714'],['any','1 in 279'] ].forEach(([g,v],i)=>s+=`<text x="${bx}" y="${88+i*30}" class="t-sm" style="fill:${GN_PLSD[g]?GN_PLSD[g].c:'var(--ink)'};font-weight:700">${g}</text><text x="${bx}" y="${101+i*30}" class="t-xs">${v}</text>`)}
    cv.innerHTML=s;
    $('#gnCurveRead').innerHTML=`<span>age <b>${Math.round(age)}</b></span>`+Object.entries(GN_PLSD).filter(([g])=>on[g]).map(([g,D])=>{const v=interp(D[sex],age);return `<span>${g} <b>${v==null?'no data':f1(v)+'%'}</b></span>`}).join('')+`<span>carrier frequency: any MMR gene <b>1 in 279</b> <sup class="c" data-ref="Win2017" title="Source 582">582</sup></span>`;
    $('#gnCurveNote').innerHTML=noteHTML({k:'PLSD 2020 · 6,350 carriers',t:age<50?'Little risk before 50 for MSH6 and PMS2':'By 75: about half for MLH1 and MSH2',
      txt:`Cumulative colorectal cancer incidence to 75: MLH1 48.3% (women) and 57.1% (men); MSH2 46.6% and 51.4%; MSH6 20.3% and 18.2%; PMS2 10.4%. PMS2 carriers had no increased cancer risk before 50, and ten-year crude survival after colon, endometrial or ovarian cancer was over 80%. These carriers were under colonoscopy surveillance, so the curves describe cancers that still occurred despite it. <sup class="c" data-ref="DominguezValentin2020" title="Source 133">133</sup>`,
      pt:`A Lynch gene change raises the chance of bowel cancer a lot, but by how much depends on which gene. Regular colonoscopy is offered to find problems early.`,
      hook:`MLH1/MSH2 high (≈45–57% to 75), MSH6 moderate, PMS2 low; MSH6 has a high endometrial but modest CRC risk. <sup class="c" data-ref="DominguezValentin2020" title="Source 133">133</sup>`});
  }
  playWire(cr,$('#gnCurvePlay'),drawC,9000,'Replay','genes');
  $$('[data-gng]').forEach(b=>b.addEventListener('click',()=>{on[b.dataset.gng]=!on[b.dataset.gng];b.setAttribute('aria-pressed',!!on[b.dataset.gng]);drawC(+cr.value)}));
  $$('[data-gns]').forEach(b=>b.addEventListener('click',()=>{sex=b.dataset.gns;$$('[data-gns]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawC(+cr.value)}));
  drawC(+cr.value);
};
/* =============== 2.1 Screening tests compared =============== */
/* Per 1,000 people, one round. All "derived" rows apply the published sensitivity/specificity to
   7 CRC + 76 advanced precancerous lesions (APL) + 917 with neither (prevalence of Imperiale2014). */
const SC_TESTS=[
 {id:'fit',b:'FIT',s:'FIT',crc:5.2,apl:18,fp:47,col:70,
  r:`<b>FIT</b>: the FIT arm of the 2014 stool DNA trial (cancer sensitivity 73.8%, advanced precancerous lesions 23.8%, specificity 94.9%), applied to 1,000 people. About 7 in every 100 people need a colonoscopy. <sup class="c" data-ref="Imperiale2014" title="Source 250">250</sup>`},
 {id:'gfobt',b:'gFOBT',s:'gFOBT',crc:4.4,apl:null,fp:28,col:32,
  r:`<b>High-sensitivity guaiac test</b>: pooled cancer sensitivity 0.50–0.75 and specificity 0.96–0.98; the midpoints are drawn (cancers found 3.5–5.3, false alarms 18–37). Its sensitivity for advanced lesions is not given in our sources, so those 76 people stay grey, and the colonoscopy count is a lower bound. <sup class="c" data-ref="Lin2021" title="Source 328">328</sup>`},
 {id:'sdna',b:'mt-sDNA (Cologuard)',s:'mt-sDNA',crc:6.5,apl:32,fp:123,col:162,
  r:`<b>Multitarget stool DNA</b>: sensitivity 92.3% for cancer and 42.4% for advanced precancerous lesions, specificity 86.6%. It finds more than FIT, and sends more than twice as many people to colonoscopy. <sup class="c" data-ref="Imperiale2014" title="Source 250">250</sup>`},
 {id:'ng',b:'Next-gen mt-sDNA',s:'Next-gen mt-sDNA',crc:6.6,apl:33,fp:86,col:126,
  r:`<b>Next-generation mt-sDNA</b> (BLUE-C, 20,176 people): cancer sensitivity 93.9%, advanced precancerous lesions 43.4%, specificity for advanced neoplasia 90.6%, applied to the same population. <sup class="c" data-ref="Imperiale2024,Imperiale2014" title="Source 250,252">250,252</sup>`},
 {id:'rna',b:'mt-sRNA (ColoSense)',s:'mt-sRNA',crc:6.6,apl:35,fp:110,col:152,
  r:`<b>Multitarget stool RNA</b> (CRC-PREVENT, 8,920 people): cancer sensitivity 94%, advanced adenomas 46%, specificity 88% for "no lesions". Because that specificity is for no lesions at all, the false-alarm count here is approximate. <sup class="c" data-ref="Barnell2023,Imperiale2014" title="Source 43,250">43,250</sup>`},
 {id:'shield',b:'Blood cfDNA (Shield)',s:'Shield (blood)',crc:5.8,apl:10,fp:95,col:111,
  r:`<b>Cell-free DNA blood test</b> (ECLIPSE, 7,861 evaluable): cancer sensitivity 83.1%, advanced precancerous lesions 13.2%, specificity 89.6%. It finds most cancers but very few precancerous lesions, so it prevents fewer cancers. <sup class="c" data-ref="Chung2024,Imperiale2014" title="Source 102,250">102,250</sup>`},
 {id:'sept9',b:'Blood SEPT9',s:'SEPT9 (blood)',crc:3.4,apl:8.5,fp:78,col:90,
  r:`<b>Plasma methylated SEPT9</b>: standardised cancer sensitivity 48.2% (stage I 35.0%), advanced adenomas 11.2%, specificity 91.5%. USMSTF 2017 suggests it not be used. <sup class="c" data-ref="Church2014,Rex2017" title="Source 103,450">103,450</sup>`},
 {id:'ctc',b:'CT colonography',s:'CT colonography',crc:6.3,apl:68.4,fp:128.4,col:203,
  r:`<b>CT colonography</b> (ACRIN, 2,531 people): per-patient sensitivity 0.90 and specificity 0.86 for adenomas or cancers ≥10 mm. Here 0.90 is applied to cancers and advanced lesions alike, an approximation because "≥10 mm" is not the same as "advanced". Extracolonic findings are of uncertain net value. <sup class="c" data-ref="Johnson2008,Lin2021" title="Source 267,328">267,328</sup>`},
 {id:'fs',b:'Flexible sigmoidoscopy',s:'Sigmoidoscopy',sig:true,col:null,
  r:`<b>Flexible sigmoidoscopy</b> sees only the lower bowel, and our sources give no single sensitivity for it. Its trials measured outcomes instead: pooled over 15 years, 0.51 fewer cancers and 0.13 fewer CRC deaths per 100 people, drawn here as about 5 and 1 per 1,000. <sup class="c" data-ref="Juul2022" title="Source 273">273</sup>`},
 {id:'col',b:'Colonoscopy',s:'Colonoscopy',all:true,crc:7,apl:69.2,fp:0,col:1000,
  r:`<b>Colonoscopy</b> examines everyone and removes polyps in the same visit. It is the reference standard, so all 7 cancers are drawn as found, but tandem studies miss 9% of advanced adenomas (drawn: 69 of 76 found) and 26% of all adenomas. Expected serious harms: about 1.8 per 1,000. <sup class="c" data-ref="Zhao2019,Lin2021" title="Source 328,600">328,600</sup>`}
];
const SC_STEPS=[
 {from:0,at:.15,k:'Step 1 · The people',t:'1,000 people, one round',
  txt:`Picture 1,000 people at average risk, each taking one screening test. In the 2014 stool DNA trial 0.7% had colorectal cancer and 7.6% an advanced precancerous lesion: about 7 and 76 people here, shown in colour. No one can see these yet. Disease is usually symptomatic only at an advanced stage, which is the case for organised screening. <sup class="c" data-ref="Imperiale2014,Dekker2019" title="Source 123,250">123,250</sup>`,
  pt:`Most people screened are healthy. A test has to find the few who are not, without alarming too many who are.`,
  hook:`USPSTF 2021: grade B at 45–49, A at 50–75, C at 76–85. <sup class="c" data-ref="USPSTF2021" title="Source 545">545</sup>`},
 {from:.2,at:.35,k:'Step 2 · The test',t:'Who tests positive',
  txt:`Each test flags some people (navy). A positive result is not a diagnosis: it means a colonoscopy is needed to find out why. More sensitive tests flag more people, including more who turn out to have nothing serious. Against FIT, mt-sDNA had higher cancer sensitivity (92.3% vs 73.8%) but lower specificity (86.6% vs 94.9%). <sup class="c" data-ref="Imperiale2014" title="Source 250">250</sup>`,
  pt:`A positive stool or blood test means "look closer", not "you have cancer".`,
  hook:`mt-sDNA vs FIT: sensitivity 92.3% vs 73.8%; specificity 86.6% vs 94.9%. <sup class="c" data-ref="Imperiale2014" title="Source 250">250</sup>`},
 {from:.4,at:.52,k:'Step 3 · Follow-up',t:'Colonoscopy sorts the positives',
  txt:`ACS 2026 states that any positive non-colonoscopy test needs a follow-up colonoscopy, preferably within 6 months. Ringed people had one: it shows which positives were cancers, which were precancerous lesions (removed on the spot) and which were false alarms (violet). Each colonoscopy carries a small risk: 3.1 perforations and 14.6 major bleeds per 10,000 screening colonoscopies. <sup class="c" data-ref="Wolf2026,Lin2021" title="Source 328,585">328,585</sup>`,
  pt:`The colonoscopy is part of the test. A positive stool test only helps if the colonoscopy happens.`,
  hook:`After a positive FIT, colonoscopy at 10–12 months carried more cancers (OR 1.48) and more stage III–IV disease (OR 1.97) than at 8–30 days. <sup class="c" data-ref="Corley2017" title="Source 110">110</sup>`},
 {from:.6,at:.72,k:'Step 4 · Found and missed',t:'Cancers found, cancers missed',
  txt:`Faded icons are people the test missed this round. FIT's one-time sensitivity for advanced adenomas is low at any threshold (0.40 even at 10 µg/g), which is why stool tests are repeated every year or two. The Shield blood test found 83.1% of cancers but only 13.2% of advanced precancerous lesions. <sup class="c" data-ref="Imperiale2019,Chung2024" title="Source 102,251">102,251</sup>`,
  pt:`One round can miss things. Repeating the test on schedule is what makes stool testing work.`,
  hook:`Shield: 83% of CRC but only 13% of advanced precancerous lesions. <sup class="c" data-ref="Chung2024" title="Source 102">102</sup>`},
 {from:.8,at:.95,k:'Step 5 · The trade-off',t:'Colonoscopies versus cancers found',
  txt:`Side by side: follow-up colonoscopies per 1,000 people for each test, and how many of the 7 cancers each finds in one round. In modelling, CRC death rates relative to no screening were 0.19 for colonoscopy every 10 years, 0.25 for annual FIT, 0.28 for triennial next-generation mt-sDNA and 0.44 for triennial Shield. Number needed to screen to detect one cancer: 154 with colonoscopy, 166 with mt-sDNA, 208 with FIT. <sup class="c" data-ref="Ladabaum2024AIM,Imperiale2014" title="Source 250,300">250,300</sup>`,
  pt:`The best test is the one you actually do. A home stool test done on schedule is a good choice. <sup class="c" data-ref="Wolf2026" title="Source 585">585</sup>`,
  hook:`Modelled CRC death relative rate vs no screening: colonoscopy 0.19, annual FIT 0.25, next-gen mt-sDNA 0.28, Shield 0.44. <sup class="c" data-ref="Ladabaum2024AIM" title="Source 300">300</sup>`}
];
/* published FIT thresholds only (Li2021): [µg/g, CRC sens %, HRA sens %, referred %, no CRC/HRA above threshold %] */
const SC_THR=[[4,95.6,90.2,21.3,null],[10,90.0,77.7,12.6,null],[20,82.2,64.3,7.8,4.5],[40,73.3,50.0,5.2,2.9],[80,58.9,32.1,2.9,1.5],[120,47.8,25.0,2.1,1.1],[150,44.4,20.8,1.8,0.9],[180,40.0,17.6,1.5,null]];
const SC_L22={20:'58,812 colonoscopies, 550 cancers prevented, 1,216 detected',120:'16,092 colonoscopies, 186 cancers prevented, 1,142 detected',180:'11,500 colonoscopies, 131 cancers prevented'};
/* mortality forest: [label, group, itt, lo, hi, pp, ppLabel, key-ish note] */
const SC_FOREST=[
 {g:'Guaiac stool test (gFOBT)'},
 {n:'Minnesota, annual (18 y)',v:.67,lo:.51,hi:.83},
 {n:'Minnesota, biennial (18 y)',v:.79,lo:.62,hi:.97},
 {n:'Nottingham, biennial (7.8 y)',v:.85,lo:.74,hi:.98},
 {n:'Funen, biennial (10 y)',v:.82,lo:.68,hi:.99},
 {n:'Cochrane, 4 RCTs pooled',v:.84,lo:.78,hi:.90,pp:.75,ppn:'attended ≥1 round'},
 {g:'Flexible sigmoidoscopy'},
 {n:'UK FSST, once-only (17 y)',v:.70,pp:.59,ppn:'−41%'},
 {n:'PLCO (11.9 y)',v:.74},
 {n:'NORCCAP (10.9 y)',v:.73},
 {n:'4 RCTs pooled (15 y)',v:.80},
 {g:'Colonoscopy'},
 {n:'NordICC, invited vs usual care (10 y)',v:.90,lo:.64,hi:1.16,pp:.50,ppn:'−50%'},
 {n:'COLONPREV, colonoscopy vs FIT (10 y)',v:.92,lo:.64,hi:1.32,cmp:true}
];
inits.screening=()=>{
  const svg=$('#scSvg'),rg=$('#scT'),note=$('#scNote'),read=$('#scRead');
  let cur=0;
  /* fixed population: shuffled order, first 7 CRC, next 76 APL, rest healthy */
  const R=rng(2021),ord=[...Array(1000).keys()];
  for(let i=999;i>0;i--){const j=Math.floor(R()*(i+1));[ord[i],ord[j]]=[ord[j],ord[i]]}
  const role=new Array(1000),rank=new Array(1000);
  ord.forEach((cell,k)=>{if(k<7){role[cell]='c';rank[cell]=k}else if(k<83){role[cell]='a';rank[cell]=k-7}else{role[cell]='h';rank[cell]=k-83}});
  const rd=x=>Math.round(x-.001);
  const fmt=v=>v==null?'–':v>=1000?Math.round(v).toLocaleString('en-GB'):v>=20?String(Math.round(v)):(Math.round(v*10)/10).toString();
  $('#scTests').innerHTML=SC_TESTS.map((T,i)=>`<button class="btn" data-sct="${i}" aria-pressed="${i===0}">${T.b}</button>`).join('');
  function draw(t){
    const N=vb(svg,'720 380','400 640'),T=SC_TESTS[cur];
    const L=N?{gx:14,gy:52,cw:9.4,rh:11.2,ps:8.6,px:12,py:350,pw:376,rowH:26}:{gx:16,gy:50,cw:11,rh:12.8,ps:10,px:478,py:56,pw:234,rowH:31};
    const p1=ramp(t,.01,.16),p2=ramp(t,.21,.36),p3=ramp(t,.41,.53),p4=ramp(t,.61,.73),p5=ramp(t,.81,.93);
    const nc=T.sig?0:rd(T.crc),na=T.sig||T.apl==null?0:rd(T.apl),nf=T.sig?0:rd(T.fp);
    const harmN=T.all?2:0;
    let s=`<defs><g id="scPer">${person(0,0,L.ps,'currentColor')}</g></defs>`;
    s+=`<text x="${L.gx}" y="${N?22:24}" class="t-lbl">1,000 people at average risk · one round of ${T.s}</text>`;
    s+=`<text x="${L.gx}" y="${N?38:40}" class="t-xs">${t<.2?'who has what (unknown to anyone yet)':t<.4?'test result':t<.6?'after follow-up colonoscopy':'found and missed'}</text>`;
    let rings='';
    for(let i=0;i<1000;i++){
      const x=L.gx+(i%40)*L.cw+L.cw/2-L.ps*.0,y=L.gy+Math.floor(i/40)*L.rh,ro=role[i],rk=rank[i];
      const ord01=i/1000;
      const pos=!T.sig&&!T.all&&((ro==='c'&&rk<nc)||(ro==='a'&&rk<na)||(ro==='h'&&rk<nf));
      const found=(ro==='c'&&rk<nc)||(ro==='a'&&rk<na);
      let col='var(--line)',op=1;
      if(t<.2){
        if(ro==='c'&&p1>rk/7*.4)col='var(--tumour)';
        else if(ro==='a'&&p1>.4+rk/76*.6)col='var(--polyp)';
      }else if(T.sig){
        if(p2>ord01)col='var(--accent-soft)';
        if(ro==='c')col='var(--tumour)',op=.45;else if(ro==='a')col='var(--polyp)',op=.4;
        if(p4>0&&ro==='h'&&rk<6&&p4>rk/6){col='var(--good)';op=1;rings+=`<circle cx="${f1(x)}" cy="${f1(y+L.ps*.55)}" r="${f1(L.ps*.62)}" style="fill:none;stroke:var(--good);stroke-width:1.3${rk===5?';stroke-dasharray:2 1.5':''}"/>`}
      }else if(T.all){
        if(p2>ord01)col='var(--accent-soft)';
        if(t>=.4&&p3>ord01){if(ro==='c')col='var(--tumour)';else if(ro==='a'&&found)col='var(--polyp)';
          if(ro==='h'&&rk>=900&&rk<900+harmN)rings+=`<circle cx="${f1(x)}" cy="${f1(y+L.ps*.55)}" r="${f1(L.ps*.66)}" style="fill:none;stroke:var(--bad);stroke-width:1.6"/>`}
        if(t>=.6&&ro==='a'&&!found&&p4>.3)col='var(--polyp)',op=.35;
      }else{
        if(pos&&p2>ord01)col='var(--accent)';
        if(t>=.4&&pos&&p3>ord01){col=ro==='c'?'var(--tumour)':ro==='a'?'var(--polyp)':'var(--lymph)';
          rings+=`<circle cx="${f1(x)}" cy="${f1(y+L.ps*.55)}" r="${f1(L.ps*.62)}" style="fill:none;stroke:var(--accent);stroke-width:1"/>`}
        if(t>=.6&&!pos&&p4>.2){if(ro==='c')col='var(--tumour)',op=.38;else if(ro==='a'&&T.apl!=null)col='var(--polyp)',op=.32}
        if(t>=.6&&!pos&&ro==='c'&&p4>.2)rings+=`<circle cx="${f1(x)}" cy="${f1(y+L.ps*.55)}" r="${f1(L.ps*.66)}" style="fill:none;stroke:var(--bad);stroke-width:1.2;stroke-dasharray:2 1.6"/>`;
        if(t>=.6&&T.apl==null&&ro==='a'&&p4>.2)rings+=`<circle cx="${f1(x)}" cy="${f1(y+L.ps*.55)}" r="${f1(L.ps*.5)}" style="fill:none;stroke:var(--polyp);stroke-width:.8;stroke-dasharray:1.5 1.5"/>`;
      }
      s+=`<use href="#scPer" x="${f1(x)}" y="${f1(y)}" style="color:${col};opacity:${op}"/>`;
    }
    s+=rings;
    /* right / lower panel */
    const px=L.px,py=L.py,pw=L.pw;
    if(p5<=0){
      const tp=T.sig||T.all?null:T.crc+(T.apl||0)+T.fp;
      const harms=T.col==null?null:T.col*(3.1+14.6)/10000;
      const rows=T.sig?[
        ['1,000','people examined','var(--ink)',0,1],['7','with colorectal cancer','var(--tumour)',0,p1],['76','with an advanced lesion','var(--polyp)',0,p1],
        ['distal','colon only: rectum, sigmoid','var(--accent)',1,p2],['?','follow-up rate not reported','var(--muted)',2,p3],
        ['−5.1','fewer cancers (15 years)','var(--good)',3,p4],['−1.3','fewer CRC deaths (15 years)','var(--good)',3,p4],
        ['0.73','mortality ratio, men','var(--good)',3,p4],['0.91','mortality ratio, women','var(--warn)',3,p4]
      ]:[
        ['1,000','people tested','var(--ink)',0,1],
        [fmt(7*p1),'with colorectal cancer','var(--tumour)',0,p1],
        [fmt(76*ramp(p1,.4,1)),'with an advanced lesion','var(--polyp)',0,p1],
        [T.all?fmt(1000*p2):fmt(tp*p2),T.all?'colonoscopies done':'test positive','var(--accent)',1,p2],
        [fmt(T.fp*p3),T.all?'false alarms (none)':'false alarms','var(--lymph)',2,p3],
        [harms==null?'–':(harms*p3).toFixed(2),'serious harms expected','var(--bad)',2,p3],
        [fmt(T.crc*p4),'of 7 cancers found','var(--tumour)',3,p4],
        [fmt((7-T.crc)*p4),'cancers missed','var(--bad)',3,p4],
        [T.apl==null?'?':fmt(T.apl*p4),'of 76 advanced lesions found','var(--polyp)',3,p4]
      ];
      if(!T.sig&&!T.all)rows.splice(4,0,[fmt(T.col*p3),'follow-up colonoscopies','var(--accent)',2,p3]);
      const ph=t<.2?0:t<.4?1:t<.6?2:3;
      rows.forEach((r,k)=>{const y=py+k*L.rowH+(N?0:4),on=ph>=r[3],cur2=ph===r[3]&&r[3]>0;
        s+=`<g style="opacity:${on?1:.22}"><rect x="${px}" y="${f1(y-13)}" width="4" height="${N?18:20}" rx="2" style="fill:${r[2]}"/>`;
        s+=`<text x="${px+12}" y="${f1(y+1)}" class="t-lbl" style="fill:${r[2]}${cur2?';font-size:14px':''}">${on?r[0]:'·'}</text>`;
        s+=`<text x="${px+(N?84:66)}" y="${f1(y+1)}" class="t-xs" style="${cur2?'fill:var(--ink)':''}">${r[1]}</text></g>`});
    }else{
      /* comparison: follow-up colonoscopies per 1,000 and cancers found of 7 */
      const nameW=N?118:100,bx=px+nameW,bw=N?150:74,vmax=250,rh=N?24:28;
      s+=`<text x="${px}" y="${py-6+(N?0:0)}" class="t-xs" style="fill:var(--ink)">colonoscopies per 1,000 · cancers found (of 7)</text>`;
      SC_TESTS.forEach((X,k)=>{const y=py+14+k*rh,me=k===cur,g=p5;
        s+=`<text x="${px}" y="${y+4}" class="t-xs" style="${me?'fill:var(--ink);font-weight:700':''}">${X.s}</text>`;
        if(X.col==null){s+=`<text x="${bx}" y="${y+4}" class="t-xs">not in sources</text>`;return}
        const w=Math.min(X.col,vmax)/vmax*bw*g;
        s+=`<rect x="${bx}" y="${y-5}" width="${f1(w)}" height="11" rx="2" style="fill:var(--accent);opacity:${me?1:.45}"/>`;
        if(X.col>vmax&&g>.95)s+=`<path d="M${f1(bx+bw-14)} ${y-7}l4 15M${f1(bx+bw-9)} ${y-7}l4 15" style="stroke:var(--panel);stroke-width:2.4"/>`;
        s+=`<text x="${f1(bx+bw+6)}" y="${y+4}" class="t-xs" style="${me?'fill:var(--ink);font-weight:700':''}">${fmt(X.col)}${X.id==='gfobt'?'+':''} · ${fmt(X.crc)}</text>`});
    }
    svg.innerHTML=s;
    const ph=phaseOf(SC_STEPS,t);note.innerHTML=noteHTML(SC_STEPS[ph]);setSt(ph);
  }
  function pick(i){cur=i;$$('[data-sct]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.sct===i));read.innerHTML=SC_TESTS[i].r;draw(+rg.value)}
  const stop=playWire(rg,$('#scPlay'),draw,22000,'Replay','screening');
  const setSt=stepWire($('#scSteps'),SC_STEPS,rg,draw,stop);
  $('#scTests').addEventListener('click',e=>{const b=e.target.closest('[data-sct]');if(b)pick(+b.dataset.sct)});
  pick(0);

  /* ---- FIT threshold: snaps to the published thresholds only ---- */
  const fs=$('#scFitSvg'),thr=$('#scThr'),fnote=$('#scFitNote');
  let shown=SC_THR[2].slice(1,4),stopT=null;
  function drawFit(v,k){
    const N=vb(fs,'720 310','400 580'),row=SC_THR[k],[c,h,r]=v;
    let s='';
    const G=N?[{x:22,y:58},{x:212,y:58}]:[{x:24,y:58},{x:226,y:58}],sp=N?17:17;
    [[c,'cancers','var(--tumour)'],[h,'high-risk adenomas','var(--polyp)']].forEach((g,gi)=>{const o=G[gi],n=Math.round(g[0]);
      s+=`<text x="${o.x}" y="${o.y-22}" class="t-lbl">Of 100 ${g[1]}</text><text x="${o.x}" y="${o.y-8}" class="t-xs">FIT positive: <tspan style="fill:${g[2]};font-weight:700">${f1(g[0])}%</tspan></text>`;
      for(let j=0;j<100;j++){const cx=o.x+7+(j%10)*sp,cy=o.y+7+Math.floor(j/10)*sp,on=j<n;
        s+=`<circle cx="${cx}" cy="${cy}" r="6.3" style="fill:${on?g[2]:'var(--panel)'};stroke:${g[2]};stroke-width:1.2;opacity:${on?1:.55}"/>`}});
    /* referred */
    const rx=N?22:430,ry=N?286:58,rw=N?356:270,max=25;
    s+=`<text x="${rx}" y="${ry-22}" class="t-lbl">Of every 1,000 people tested</text>`;
    s+=`<text x="${rx}" y="${ry-8}" class="t-xs">referred for colonoscopy: <tspan style="fill:var(--accent);font-weight:700">${Math.round(r*10)}</tspan> (${f1(r)}%)</text>`;
    s+=`<rect x="${rx}" y="${ry}" width="${rw}" height="18" rx="4" style="fill:var(--panel-2)"/><rect x="${rx}" y="${ry}" width="${f1(r/max*rw)}" height="18" rx="4" style="fill:var(--accent)"/>`;
    [0,5,10,15,20,25].forEach(q=>s+=`<text x="${f1(rx+q/max*rw)}" y="${ry+32}" class="t-xs t-mid">${q}%</text>`);
    const o2=row[4];
    s+=`<text x="${rx}" y="${ry+56}" class="t-xs">people with no cancer or high-risk adenoma</text><text x="${rx}" y="${ry+69}" class="t-xs">who are above the threshold:</text>`;
    s+=`<text x="${rx+(N?190:180)}" y="${ry+69}" class="t-lbl" style="fill:var(--lymph)">${o2==null?'not reported':f1(o2)+'%'}</text>`;
    if(o2!=null)s+=`<rect x="${rx}" y="${ry+78}" width="${rw}" height="10" rx="3" style="fill:var(--panel-2)"/><rect x="${rx}" y="${ry+78}" width="${f1(o2/max*rw)}" height="10" rx="3" style="fill:var(--lymph)"/>`;
    const l22=SC_L22[row[0]];
    s+=`<text x="${rx}" y="${ry+112}" class="t-xs" style="font-weight:700;fill:var(--ink)">England model over 15 years,</text><text x="${rx}" y="${ry+125}" class="t-xs" style="font-weight:700;fill:var(--ink)">per 100,000 screened every 2 years:</text>`;
    if(l22){const parts=l22.split(', ');parts.forEach((p,i)=>s+=`<text x="${rx}" y="${ry+140+i*13}" class="t-xs">${p}</text>`)}
    else s+=`<text x="${rx}" y="${ry+140}" class="t-xs">modelled only at 20, 120 and 180 µg/g</text>`;
    /* scale of published stops */
    const sy=N?526:262,sx0=N?30:40,sx1=N?370:690,stp=(sx1-sx0)/7;
    s+=`<line x1="${sx0}" x2="${sx1}" y1="${sy}" y2="${sy}" style="stroke:var(--line);stroke-width:3"/>`;
    SC_THR.forEach((q,i)=>{const x=sx0+i*stp,me=i===k;
      s+=`<circle cx="${f1(x)}" cy="${sy}" r="${me?8:5}" style="fill:${me?'var(--accent)':'var(--panel)'};stroke:var(--accent);stroke-width:1.6"/>`;
      s+=`<text x="${f1(x)}" y="${sy-14}" class="t-xs t-mid" style="${me?'fill:var(--ink);font-weight:700':''}">${q[0]}</text>`;
      if(q[0]===120)s+=`<text x="${f1(x)}" y="${sy+22}" class="t-xs t-mid" style="fill:var(--accent)">England</text>`;
      if(q[0]===20)s+=`<text x="${f1(x)}" y="${sy+22}" class="t-xs t-mid" style="fill:var(--accent)">${N?'most used':'most common'}</text>`});
    s+=`<text x="${sx1}" y="${sy+36}" class="t-xs t-end">µg Hb/g · published stops only, evenly spaced</text>`;
    fs.innerHTML=s;
  }
  function setThr(k,instant){
    const row=SC_THR[k],to=row.slice(1,4),from=shown.slice();
    $('#scThrVal').textContent=row[0]+' µg/g';thr.setAttribute('aria-valuetext',row[0]+' micrograms per gram');
    fnote.innerHTML=noteHTML({k:'Threshold '+row[0]+' µg/g',t:`${f1(row[1])}% of cancers, ${Math.round(row[3]*10)} referrals per 1,000`,
      txt:`At ${row[0]} µg/g the English pilot estimated that FIT identifies ${f1(row[1])}% of cancers and ${f1(row[2])}% of high-risk adenomas, and refers ${f1(row[3])}% of participants for colonoscopy.${row[0]===120?' This is England’s programme threshold.':row[0]===20?' This is the threshold 15 of 38 programmes use.':''} <sup class="c" data-ref="Li2021,Young2025" title="Source 321,594">321,594</sup>`,
      pt:k<3?'A low cut-off catches more, but many more people need a colonoscopy, and most of them will be fine.':'A high cut-off saves colonoscopies but misses more cancers in each round.',
      hook:'England: 120 µg/g catches 47.8% of CRC per round versus 82.2% at 20 µg/g, but needs far fewer colonoscopies (16,092 vs 58,812 per 100,000 over 15 years). <sup class="c" data-ref="Li2021,Li2022" title="Source 321,322">321,322</sup>'});
    if(stopT)stopT();
    if(instant){shown=to;drawFit(to,k);return}
    stopT=animate(450,p=>{const e=ease(p);shown=from.map((a,i)=>lerp(a,to[i],e));drawFit(shown,k)},()=>{stopT=null});
  }
  thr.addEventListener('input',()=>setThr(+thr.value));
  setThr(+thr.value,true);

  /* ---- trial forest plot ---- */
  const fo=$('#scForest'),fnote2=$('#scForestNote');let mode='itt',mk=0,stopF=null;
  function drawForest(k){
    const N=vb(fo,'720 450','400 700');
    const ax0=N?40:360,ax1=N?380:700,v0=.3,v1=1.4,X=v=>ax0+(clamp(v,v0,v1)-v0)/(v1-v0)*(ax1-ax0);
    let s='',y=N?20:24;const step=N?47:27.5;
    const top=y;
    s+=`<rect x="${f1(X(.3))}" y="0" width="${f1(X(1)-X(.3))}" height="${N?640:410}" style="fill:var(--good-soft);opacity:.35"/>`;
    SC_FOREST.forEach(r=>{
      if(r.g){s+=`<text x="${N?12:12}" y="${f1(y+4)}" class="t-lbl" style="fill:var(--accent)">${r.g}</text>`;y+=N?26:24;return}
      const ly=N?y:y,py=N?y+16:y;
      const has=mode==='pp'&&r.pp!=null,v=lerp(r.v,r.pp!=null?r.pp:r.v,r.pp!=null?k:0);
      s+=`<text x="${N?20:20}" y="${f1(ly+4)}" class="t-sm" style="fill:var(--ink);${mode==='pp'&&r.pp==null?'opacity:.5':''}">${r.n}</text>`;
      if(r.lo!=null){const a=1-(r.pp!=null?k:0);s+=`<line x1="${f1(X(r.lo))}" x2="${f1(X(r.hi))}" y1="${f1(py)}" y2="${f1(py)}" style="stroke:var(--ink);stroke-width:1.6;opacity:${f1(.15+.85*a)}"/>`}
      const ppNow=r.pp!=null&&k>.5;
      s+=`<rect x="${f1(X(v)-5)}" y="${f1(py-5)}" width="10" height="10" ${ppNow?'rx="5"':''} style="fill:${ppNow?'var(--panel)':r.cmp?'var(--muted)':'var(--accent)'};stroke:var(--accent);stroke-width:2;opacity:${mode==='pp'&&r.pp==null?.4:1}"/>`;
      const lab=(ppNow?(r.ppn+' → '+f1(v).replace(/^0/,'0')):v.toFixed(2))+(r.lo!=null&&!ppNow?` (${r.lo.toFixed(2)}–${r.hi.toFixed(2)})`:'');
      s+=N?`<text x="380" y="${f1(ly+4)}" class="t-xs t-end" style="fill:var(--ink)">${ppNow?(r.ppn+' ('+v.toFixed(2)+')'):lab}</text>`:`<text x="${f1(X(v))}" y="${f1(py-9)}" class="t-xs t-mid" style="fill:var(--ink)">${ppNow?(r.ppn+' ('+v.toFixed(2)+')'):lab}</text>`;
      y+=step});
    const by=y+4;
    s+=`<line x1="${f1(X(1))}" x2="${f1(X(1))}" y1="${top-10}" y2="${by}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:4 3"/>`;
    s+=`<line x1="${ax0}" x2="${ax1}" y1="${by}" y2="${by}" class="axis" style="stroke:var(--muted)"/>`;
    [.4,.6,.8,1,1.2,1.4].forEach(v=>s+=`<text x="${f1(X(v))}" y="${by+14}" class="t-xs t-mid">${v.toFixed(1)}</text>`);
    s+=`<text x="${f1(X(.62))}" y="${by+28}" class="t-xs t-mid" style="fill:var(--good)">← fewer CRC deaths</text><text x="${f1(X(1.22))}" y="${by+28}" class="t-xs t-mid">more →</text>`;
    fo.innerHTML=s;
  }
  function forestNote(){fnote2.innerHTML=mode==='itt'?noteHTML({k:'Intention to screen',t:'Everyone invited, attended or not',
      txt:`Every person randomised is counted in the group they were assigned to. This answers "what does offering screening do for a population?". In NordICC only 42.0% of those invited attended, and the CRC death ratio was 0.90 (0.64–1.16), not significant at 10 years, while CRC incidence fell 18%. <sup class="c" data-ref="Bretthauer2022" title="Source 77">77</sup>`,
      pt:'If most people invited never have the test, the trial result mostly measures the invitation, not the test.',
      hook:'NordICC: 18% lower CRC incidence at 10 years among those invited, no significant drop in CRC deaths; only 42% attended. <sup class="c" data-ref="Bretthauer2022" title="Source 77">77</sup>'})
    :noteHTML({k:'Per protocol',t:'Only the people who were screened',
      txt:`Restricting to people who were actually screened shows a larger effect: NordICC 31% lower incidence and 50% lower CRC mortality (as the 2024 quality indicators report it); UK sigmoidoscopy 41% lower mortality at 17 years; gFOBT 25% among attenders. People who attend may be healthier in other ways, which is why the intention-to-screen result stays primary. Critics of NordICC also raise quality: 28.6% of its endoscopists missed the 25% ADR benchmark. <sup class="c" data-ref="Rex2024,Atkin2017,Hewitson2007,Bretthauer2016" title="Source 28,76,236,451">28,76,236,451</sup>`,
      pt:'For someone who actually has the test, the benefit is larger than the headline trial result.',
      hook:'UKFSST at 17 years: mortality −30% intention to treat, −41% per protocol. <sup class="c" data-ref="Atkin2017" title="Source 28">28</sup>'})}
  $$('[data-scfp]').forEach(b=>b.addEventListener('click',()=>{const m=b.dataset.scfp;if(m===mode)return;mode=m;
    $$('[data-scfp]').forEach(x=>x.setAttribute('aria-pressed',x===b));forestNote();
    if(stopF)stopF();const from=mk,to=m==='pp'?1:0;
    /* the analysis label must show the end state while it slides */
    stopF=animate(700,p=>{mk=lerp(from,to,ease(p));drawForest(mk)},()=>{stopF=null})}));
  drawForest(0);forestNote();
  const prevR=redraws.screening;redraws.screening=()=>{prevR&&prevR();drawFit(shown,+thr.value);drawForest(mk)};
};
/* =============== 2.2 Colonoscopy, animated =============== */
const CO_STEPS=[
 {from:0,at:.09,k:'Step 1 · Prep',t:'Bowel preparation',
  txt:`The bowel must be empty for the lining to be seen. Prep quality is scored on the Boston Bowel Preparation Scale: 0–3 for each of three segments, 0–9 in total. In validation, scores of 5 or more were linked to a higher polyp detection rate (40% vs 24%). The 2024 indicators expect an adequate prep (at least 2 in every segment) in ≥90% of exams. In a randomised trial after positive FIT, split-dose prep raised ADR from 40.9% to 53.0%. <sup class="c" data-ref="Lai2009,Rex2024,Radaelli2017" title="Source 302,445,451">302,445,451</sup>`,
  poor:` With a poor prep, stool stays on the lining and a segment scores below 2.`,
  pt:`A good bowel prep, split between the evening before and the morning of the test, helps the doctor see small polyps. <sup class="c" data-ref="Radaelli2017" title="Source 445">445</sup>`,
  hook:`BBPS: 3 segments × 0–3 = 0–9. Adequate = ≥2 in each segment. <sup class="c" data-ref="Lai2009,Rex2024" title="Source 302,451">302,451</sup>`},
 {from:.16,at:.3,k:'Step 2 · Insertion',t:'To the caecum',
  txt:`The scope is advanced through the rectum, sigmoid, descending, transverse and ascending colon to the caecum, the very start of the large bowel. Reaching it is documented with a photo. Targets: caecal intubation ≥95% (ACG/ASGE 2024); ESGE's minimum is 90%. Using CO2 instead of air cut moderate or severe pain afterwards from 16.7% to 4.2%. <sup class="c" data-ref="Rex2024,Kaminski2017ESGE,Bretthauer2016" title="Source 76,276,451">76,276,451</sup>`,
  pt:`If the scope does not reach the caecum, part of the bowel goes unseen.`,
  hook:`Caecal intubation ≥95% with photo documentation. <sup class="c" data-ref="Rex2024" title="Source 451">451</sup>`},
 {from:.4,at:.52,k:'Step 3 · Withdrawal',t:'Careful inspection on the way out',
  txt:`The real examination happens during withdrawal, looking behind each fold. Endoscopists with mean withdrawal times of 6 minutes or more found neoplasia in 28.3% of patients vs 11.8% for faster ones. Each extra minute raised ADR by 3.6%, and withdrawal under 6 minutes was linked to 2.3 times the interval-cancer rate. The 2024 target is an average of ≥8 minutes in normal colonoscopies. <sup class="c" data-ref="Barclay2006,Shaukat2015,Rex2024" title="Source 41,451,487">41,451,487</sup>`,
  pt:`Slow and careful finds more. The clock that matters is the one running on the way out.`,
  hook:`Withdrawal <6 min: interval-cancer IRR 2.3. Target average ≥8 min. <sup class="c" data-ref="Shaukat2015,Rex2024" title="Source 451,487">451,487</sup>`},
 {from:.6,at:.67,k:'Step 4 · Polyp found',t:'A polyp behind a fold',
  txt:`A small polyp appears on the far side of a fold. In tandem studies colonoscopy missed 26% of adenomas, 9% of advanced adenomas and 27% of serrated polyps. Physicians with higher ADRs had fewer interval cancers: 9.8 down to 4.8 per 10,000 person-years from the lowest to the highest ADR quintile. <sup class="c" data-ref="Zhao2019,Corley2014" title="Source 109,600">109,600</sup>`,
  poor:` <b>Poor prep:</b> here the polyp is covered by stool and is not seen. An adequate prep must show polyps larger than 5 mm. <sup class="c" data-ref="Gupta2020" title="Source 209">209</sup>`,
  pt:`A careful colonoscopy finds more polyps. Doctors who find more polyps have patients who get fewer later cancers. <sup class="c" data-ref="Corley2014" title="Source 109">109</sup>`,
  hook:`Screening ADR target ≥35% (≥40% men, ≥30% women). <sup class="c" data-ref="Rex2024" title="Source 451">451</sup>`},
 {from:.72,at:.8,k:'Step 5 · Polypectomy',t:'Snare and cut',
  txt:`A wire snare is passed through the scope, opened around the polyp's base and closed to cut it off. The 2024 indicators expect a cold snare (no electric current) for 4–9 mm lesions in ≥90% of cases. Polypectomy adds risk: perforation 0.8 and post-polypectomy bleeding 9.8 per 1,000. Removing adenomas works: the National Polyp Study found 76–90% lower CRC incidence and 53% fewer CRC deaths. <sup class="c" data-ref="Rex2024,Reumkens2016,Winawer1993,Zauber2012" title="Source 449,451,583,598">449,451,583,598</sup>`,
  poor:` <b>Poor prep:</b> there is nothing to snare because the polyp was never seen.`,
  pt:`Colonoscopy can find and remove a polyp in the same visit, before it can turn into cancer. <sup class="c" data-ref="Zauber2012" title="Source 598">598</sup>`,
  hook:`National Polyp Study: incidence −76 to 90%, mortality −53%. <sup class="c" data-ref="Winawer1993,Zauber2012" title="Source 583,598">583,598</sup>`},
 {from:.86,at:.97,k:'Step 6 · Retrieval',t:'To pathology, then a plan',
  txt:`The polyp is suctioned into a trap and sent to pathology. What it turns out to be, and how many there were, sets the next colonoscopy (module 2.3). Serious harms of screening colonoscopy are uncommon: perforation 3.1 and major bleeding 14.6 per 10,000 procedures. <sup class="c" data-ref="Gupta2020,Lin2021" title="Source 209,328">209,328</sup>`,
  poor:` <b>Poor prep:</b> the polyp is left behind, unseen.`,
  pt:`Serious problems from colonoscopy are rare: about 3 tears and 15 major bleeds for every 10,000 tests. <sup class="c" data-ref="Lin2021" title="Source 328">328</sup>`,
  hook:`1–2 tubular adenomas <10 mm → next colonoscopy in 7–10 years (USMSTF 2020). <sup class="c" data-ref="Gupta2020" title="Source 209">209</sup>`}
];
const CO_FIT=[['8–30 d',30,8],['2 mo',28,7],['3 mo',31,7],['4–6 mo',31,9],['7–9 mo',43,13],['10–12 mo',49,19],['>12 mo',76,31]];
inits.colonoscopy=()=>{
  const svg=$('#coSvg'),rg=$('#coT'),note=$('#coNote');
  let poor=false;const UP=.42;
  const R0=rng(11),STOOL=[...Array(9)].map(()=>({a:R0()*Math.PI*2,d:.35+R0()*.5,r:.08+R0()*.1}));
  const MAPST=[.06,.18,.31,.45,.58,.69,.79,.88,.95];
  function cam(cx,cy,R,o){
    let s=`<defs><clipPath id="coClip"><circle cx="${cx}" cy="${cy}" r="${R}"/></clipPath></defs><g clip-path="url(#coClip)">`;
    s+=`<rect x="${cx-R}" y="${cy-R}" width="${2*R}" height="${2*R}" style="fill:var(--mucosa)"/>`;
    const lx=cx+Math.cos(o.rot)*R*.1,ly=cy+Math.sin(o.rot)*R*.08;
    for(let j=7;j>=0;j--){let d=((j+o.z)%8+8)%8/8;const r=R*(.13+1.05*Math.pow(d,1.7));
      const ex=lerp(lx,cx,d),ey=lerp(ly,cy,d);
      s+=`<ellipse cx="${f1(ex)}" cy="${f1(ey)}" rx="${f1(r)}" ry="${f1(r*.9)}" style="fill:none;stroke:var(--mucosa-line);stroke-width:${f1(1+4*d)};opacity:${f1(.2+.6*d)}"/>`}
    s+=`<path d="M${f1(cx-R*.7)} ${f1(cy-R*.2)}q${f1(R*.2)} ${f1(-R*.15)} ${f1(R*.35)} ${f1(-R*.05)}t${f1(R*.3)} ${f1(-R*.12)}M${f1(cx+R*.2)} ${f1(cy+R*.55)}q${f1(R*.15)} ${f1(-R*.1)} ${f1(R*.3)} 0" style="fill:none;stroke:var(--vessel);stroke-width:1.2;opacity:.45"/>`;
    s+=`<circle cx="${f1(lx)}" cy="${f1(ly)}" r="${f1(R*.12)}" style="fill:var(--scope);opacity:.85"/>`;
    if(o.land>0)s+=`<g style="opacity:${f1(o.land)}"><path d="M${f1(cx-R*.45)} ${f1(cy+R*.3)}q${f1(R*.12)} ${f1(-R*.12)} ${f1(R*.24)} 0" style="fill:none;stroke:var(--mucosa-line);stroke-width:3"/><path d="M${f1(cx+R*.15)} ${f1(cy-R*.45)}q${f1(R*.25)} ${f1(R*.05)} ${f1(R*.45)} ${f1(R*.2)}" style="fill:none;stroke:var(--mucosa-line);stroke-width:5;opacity:.8"/>
      <text x="${f1(cx-R*.33)}" y="${f1(cy+R*.48)}" class="t-xs t-mid" style="fill:var(--ink)">appendiceal orifice</text><text x="${f1(cx+R*.4)}" y="${f1(cy-R*.5)}" class="t-xs t-mid" style="fill:var(--ink)">ileocaecal valve</text></g>`;
    const P=o.polyp;
    if(P&&P.k>0&&!P.gone){const sz=R*(.16+.22*P.k),px=lerp(cx+R*.28,lx,P.suck||0),py=lerp(cy+R*.5,ly,P.suck||0),sc=1-(P.suck||0)*.85;
      s+=`<g transform="translate(${f1(px)} ${f1(py)}) scale(${f1(sc)}) translate(${f1(-px)} ${f1(-py)})">`;
      if(!P.lift)s+=`<path d="M${f1(px-sz*1.2)} ${f1(py+2)}q${f1(sz*1.2)} ${f1(-6)} ${f1(sz*2.4)} 0" style="fill:none;stroke:var(--mucosa-line);stroke-width:2"/>`;
      s+=`<g transform="translate(0 ${f1(-(P.lift||0)*sz*.6)})">${polyp(px,py,sz,.12,{seed:4})}</g></g>`;
      if(P.cut>0&&!P.suck)s+=`<ellipse cx="${f1(cx+R*.28)}" cy="${f1(cy+R*.5+3)}" rx="${f1(sz*.35)}" ry="${f1(sz*.12)}" style="fill:var(--cell);stroke:var(--mucosa-line);opacity:${f1(P.cut)}"/>`;
    }
    if(P&&P.snare>0){const sz=R*.38,px=cx+R*.28,py=cy+R*.5-sz*.15,c=P.snare;
      s+=`<path d="M${f1(cx-R*.75)} ${f1(cy+R*.85)}L${f1(px-sz*(1-.55*c))} ${f1(py)}" style="stroke:var(--scope);stroke-width:4;stroke-linecap:round"/>`;
      s+=`<ellipse cx="${f1(px)}" cy="${f1(py)}" rx="${f1(sz*(1-.55*c))}" ry="${f1(sz*.32*(1-.35*c))}" style="fill:none;stroke:var(--scope);stroke-width:2.2"/>`}
    if(o.stool>0)STOOL.forEach((b,i)=>{const bx=cx+Math.cos(b.a)*R*b.d,by=cy+Math.sin(b.a)*R*b.d*.9;s+=`<ellipse cx="${f1(bx)}" cy="${f1(by)}" rx="${f1(R*b.r*1.3)}" ry="${f1(R*b.r)}" style="fill:var(--stool);opacity:${f1(o.stool*.85)}"/>`});
    if(o.cover)s+=`<ellipse cx="${f1(cx+R*.28)}" cy="${f1(cy+R*.44)}" rx="${f1(R*.3)}" ry="${f1(R*.2)}" style="fill:var(--stool);opacity:.95"/><ellipse cx="${f1(cx+R*.18)}" cy="${f1(cy+R*.36)}" rx="${f1(R*.14)}" ry="${f1(R*.1)}" style="fill:var(--stool);opacity:.9"/>`;
    if(o.flash>0)s+=`<rect x="${cx-R}" y="${cy-R}" width="${2*R}" height="${2*R}" style="fill:var(--panel);opacity:${f1(o.flash*.7)}"/>`;
    s+=`</g><circle cx="${cx}" cy="${cy}" r="${R}" style="fill:none;stroke:var(--scope);stroke-width:7"/>`;
    return s}
  function prepPanel(cx,cy,R,p){
    const sc=poor?[1,1,2]:[3,3,3],nm=['Rt','Tr','Lt'];
    let s=`<circle cx="${cx}" cy="${cy}" r="${R}" style="fill:var(--panel-2);stroke:var(--line);stroke-width:2"/>`;
    s+=`<text x="${cx}" y="${f1(cy-R*.62)}" class="t-lbl t-mid">Split-dose prep</text>`;
    [['Evening before',ramp(p,0,.45)],['Morning of',ramp(p,.5,.95)]].forEach(([n,q],i)=>{const x=cx-R*.74+i*R*.38,y=cy-R*.42,h=R*.42;
      s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(R*.2)}" height="${f1(h)}" rx="4" style="fill:var(--panel);stroke:var(--accent);stroke-width:1.4"/><rect x="${f1(x+2)}" y="${f1(y+h*(.1+.88*q))}" width="${f1(R*.2-4)}" height="${f1(h*.88*(1-q))}" rx="3" style="fill:var(--rx);opacity:.6"/>`;
      s+=`<text x="${f1(x+R*.1)}" y="${f1(y+h+12)}" class="t-xs t-mid">${i?'morning':'evening'}</text>`});
    let tot=0;
    sc.forEach((v,i)=>{const now=Math.round(lerp(0,v,ramp(p,.1+i*.1,.85)));tot+=now;const x=cx+R*.05+i*R*.24,base=cy+R*.12,h=R*.42;
      s+=`<rect x="${f1(x)}" y="${f1(base-h)}" width="${f1(R*.16)}" height="${f1(h)}" rx="3" style="fill:var(--panel);stroke:var(--line)"/>`;
      s+=`<rect x="${f1(x)}" y="${f1(base-h*now/3)}" width="${f1(R*.16)}" height="${f1(h*now/3)}" rx="3" style="fill:${now>=2?'var(--good)':'var(--warn)'}"/>`;
      s+=`<line x1="${f1(x-2)}" x2="${f1(x+R*.16+2)}" y1="${f1(base-h*2/3)}" y2="${f1(base-h*2/3)}" style="stroke:var(--ink);stroke-dasharray:2 2;opacity:.5"/>`;
      s+=`<text x="${f1(x+R*.08)}" y="${f1(base+12)}" class="t-xs t-mid">${nm[i]}</text><text x="${f1(x+R*.08)}" y="${f1(base-h*now/3-4)}" class="t-xs t-mid" style="fill:var(--ink)">${now}</text>`});
    const ok=sc.every(v=>v>=2)&&p>.85;
    s+=`<text x="${cx}" y="${f1(cy+R*.48)}" class="t-lbl t-mid">BBPS ${tot}/9</text><text x="${f1(cx+R*.33)}" y="${f1(cy+R*.35)}" class="t-xs t-mid">right · transverse · left</text>`;
    s+=`<text x="${cx}" y="${f1(cy+R*.64)}" class="t-xs t-mid" style="fill:${p>.85?(ok?'var(--good)':'var(--bad)'):'var(--muted)'}">${p>.85?(ok?'adequate: ≥2 in every segment':'inadequate: a segment below 2'):'dashed line = score 2'}</text>`;
    return s}
  function draw(t){
    const N=vb(svg,'720 380','400 680');
    const L=N?{mx:52,my:52,ms:1,cx:200,cy:458,R:112,sy:612}:{mx:36,my:56,ms:1,cx:548,cy:170,R:118,sy:336};
    const C=colon(L.mx,L.my,L.ms,{w:20});
    const pPrep=ramp(t,0,.15),pIn=ease(ramp(t,.16,.37)),pW=ramp(t,.4,.6),pF=ramp(t,.6,.68),pSn=ramp(t,.73,.81),pCut=ramp(t,.81,.86),pSu=ramp(t,.86,.9),pOut=ramp(t,.9,1);
    let u=1;if(t>=.16)u=1-pIn;if(t>=.4)u=lerp(0,UP,pW);if(t>=.6)u=UP;if(t>=.9)u=lerp(UP,1,pOut);
    const stool=poor?.85:1-pPrep;
    let s=C.svg;
    /* labels inside the frame */
    const lab=(uu,dx,dy,txt,anc)=>{const p=C.at(uu);return `<text x="${f1(p[0]+dx)}" y="${f1(p[1]+dy)}" class="t-xs ${anc||''}">${txt}</text>`};
    s+=lab(.15,16,0,'Ascending')+lab(.41,0,26,'Transverse','t-mid')+lab(.64,-16,0,'Descending','t-end')+lab(.82,8,-16,'Sigmoid','t-mid')+lab(.965,16,4,'Rectum')+lab(0,-2,34,'Caecum','t-mid');
    MAPST.forEach((m,i)=>{const p=C.at(m);if(stool>0)s+=`<circle cx="${f1(p[0]+(i%2?3:-3))}" cy="${f1(p[1]+(i%3-1)*3)}" r="4.2" style="fill:var(--stool);opacity:${f1(stool*.9)}"/>`});
    /* polyp on the map */
    const pp=C.at(UP),removed=!poor&&t>=.82;
    if(!removed){s+=`<circle cx="${f1(pp[0])}" cy="${f1(pp[1]+4)}" r="4.5" style="fill:var(--polyp);stroke:var(--polyp-line);opacity:${t>=.6||poor?1:.55}"/>`;
      if(poor&&t>=.86)s+=`<text x="${f1(pp[0])}" y="${f1(pp[1]+30)}" class="t-xs t-mid" style="fill:var(--bad);font-weight:700">missed</text>`}
    else s+=`<text x="${f1(pp[0])}" y="${f1(pp[1]+30)}" class="t-xs t-mid" style="fill:var(--good)">removed</text>`;
    /* inserted scope */
    if(t>=.16&&u<.999){let d='';for(let i=0;i<=60;i++){const q=C.at(lerp(1,u,i/60));d+=(i?'L':'M')+f1(q[0])+' '+f1(q[1])}
      const a0=C.at(1);s+=`<path d="M${f1(a0[0])} ${f1(a0[1]+(N?12:30))}L${f1(a0[0])} ${f1(a0[1])}${d.slice(d.indexOf('L'))}" style="fill:none;stroke:var(--scope);stroke-width:3.4;stroke-linejoin:round;stroke-linecap:round"/>`;
      const tp=C.at(u),tq=C.at(Math.max(0,u-.012)),an=u>.005?Math.atan2(tq[1]-tp[1],tq[0]-tp[0])*180/Math.PI:180;
      s+=scope(tp[0],tp[1],an,{light:true})}
    /* camera or prep */
    const cx=L.cx,cy=L.cy,R=L.R;
    if(t<.16)s+=prepPanel(cx,cy,R,pPrep);
    else{
      const z=t<.4?pIn*7:t<.6?-pW*4:t>=.9?-pOut*5:0;
      const P={k:pF,snare:poor?0:(t>=.73&&t<.86?pSn:0),cut:poor?0:pCut,lift:poor?0:pCut,suck:poor?0:pSu,gone:poor?false:t>=.9};
      s+=cam(cx,cy,R,{z,rot:t*9,stool:poor?.8:.0,polyp:t>=.6?P:null,cover:poor&&t>=.6&&t<.9,land:bump(t,.36,.43),flash:bump(t,.395,.415)});
      const segName=(()=>{for(const k in C.seg){const r=C.seg[k];if(u>=r[0]&&u<=r[1])return k}return 'rectum'})();
      s+=`<text x="${cx}" y="${cy-R-12}" class="t-sm t-mid">endoscope view · ${t>=.36&&t<.43?'caecum reached: photo':segName}</text>`;
      if(t>=.6&&t<.9){const msg=poor?(t<.73?'polyp hidden under stool':'nothing seen to remove'):(t<.73?'polyp, ~6 mm':t<.81?'cold snare closing':'cut: polyp detached');
        s+=`<text x="${cx}" y="${cy+R+20}" class="t-lbl t-mid" style="fill:${poor?'var(--bad)':'var(--ink)'}">${msg}</text>`}
      if(t>=.86&&!poor){const k=ramp(t,.88,.95);s+=`<g style="opacity:${f1(k)}"><rect x="${f1(cx+R*.7)}" y="${f1(cy+R*.62)}" width="52" height="30" rx="6" style="fill:var(--panel);stroke:var(--accent);stroke-width:1.4"/>${polyp(cx+R*.7+26,cy+R*.62+24,13,.12,{seed:4})}<text x="${f1(cx+R*.7+26)}" y="${f1(cy+R*.62+44)}" class="t-xs t-mid">to pathology</text></g>`}
    }
    /* status strip */
    const wd=t<.4?0:t<.6?4.5*pW:t<.86?4.5+2.5*ramp(t,.6,.86):7+2.5*ramp(t,.86,1);
    const bb=poor?4:Math.round(9*Math.min(1,pPrep/.85));
    const items=[[`BBPS ${t<.16?Math.round((poor?4:9)*ramp(pPrep,.1,.85)):(poor?4:9)}/9`,poor?(t>.13?'inadequate':'…'):(t>.13?'adequate':'…'),poor&&t>.13?'var(--bad)':'var(--good)'],
      [t>=.4?'Caecum ✓':'Caecum …',t>=.4?'reached, photo':'not yet',t>=.4?'var(--good)':'var(--muted)'],
      [`Polyps out: ${removed?1:0}`,poor&&t>=.86?'1 missed':'',poor&&t>=.86?'var(--bad)':'var(--ink)']];
    const sx=N?14:20,sw=N?372:300,sy=L.sy;
    items.forEach((it,i)=>{const x=N?sx+i*124:sx+i*104,y=N?sy:sy;
      s+=`<text x="${x}" y="${y}" class="t-sm" style="fill:${it[2]};font-weight:700">${it[0]}</text><text x="${x}" y="${y+13}" class="t-xs">${it[1]}</text>`});
    /* withdrawal clock */
    const wx=N?14:360,wy=N?sy+34:sy-4,ww=N?372:340,M=12;
    s+=`<text x="${wx}" y="${wy}" class="t-sm" style="fill:var(--ink);font-weight:700">Withdrawal ${Math.floor(wd)}:${String(Math.floor((wd%1)*60)).padStart(2,'0')} min</text>`;
    const bx=wx+(N?150:150),bw=ww-(N?150:150);
    s+=`<rect x="${bx}" y="${wy-9}" width="${bw}" height="10" rx="4" style="fill:var(--panel-2)"/><rect x="${bx}" y="${wy-9}" width="${f1(Math.min(wd,M)/M*bw)}" height="10" rx="4" style="fill:${wd>=8?'var(--good)':wd>=6?'var(--warn)':'var(--accent)'}"/>`;
    [[6,'6',' t-end',-2],[8,'8 min target','',2]].forEach(([m,l,an,dx])=>{const x=bx+m/M*bw;s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${wy-13}" y2="${wy+3}" style="stroke:var(--ink);stroke-width:1.4"/><text x="${f1(x+dx)}" y="${wy+14}" class="t-xs${an}">${l}</text>`});
    s+=`<text x="${N?14:20}" y="${N?24:26}" class="t-lbl">${poor?'Poor prep':'Good prep (split dose)'} · ${['prep','insertion','withdrawal','polyp','polypectomy','retrieval'][phaseOf(CO_STEPS,t)]}</text>`;
    svg.innerHTML=s;
    const ph=phaseOf(CO_STEPS,t),st=CO_STEPS[ph];
    note.innerHTML=noteHTML(poor&&st.poor?{...st,txt:st.txt+st.poor}:st);setSt(ph);
  }
  const stop=playWire(rg,$('#coPlay'),draw,26000,'Replay','colonoscopy');
  const setSt=stepWire($('#coSteps'),CO_STEPS,rg,draw,stop);
  $$('[data-coprep]').forEach(b=>b.addEventListener('click',()=>{poor=b.dataset.coprep==='poor';$$('[data-coprep]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---- quality gauge ---- */
  const qs=$('#coQual'),adr=$('#coAdr'),wdr=$('#coWd'),qn=$('#coQualNote');
  const TG=[[20,'<20%','var(--bad)'],[25,'25%','var(--warn)'],[30,'♀30','var(--good)'],[35,'35%','var(--good)'],[40,'♂40','var(--good)'],[50,'post-FIT 50','var(--accent)']];
  function drawQ(){
    const N=vb(qs,'720 320','400 670'),a=+adr.value,w=+wdr.value;
    $('#coAdrV').textContent=a+'%';$('#coWdV').textContent=w+' min';
    adr.setAttribute('aria-valuetext',a+' percent');wdr.setAttribute('aria-valuetext',w+' minutes');
    const gx=N?200:190,gy=N?190:200,gr=N?140:150,ang=v=>Math.PI*(1-clamp(v,0,60)/60);
    const P=(v,r)=>[gx+Math.cos(ang(v))*r,gy-Math.sin(ang(v))*r];
    let s='';
    const arc=(v0,v1,c)=>{const p0=P(v0,gr),p1=P(v1,gr);return `<path d="M${f1(p0[0])} ${f1(p0[1])}A${gr} ${gr} 0 0 1 ${f1(p1[0])} ${f1(p1[1])}" style="fill:none;stroke:${c};stroke-width:16;opacity:.35"/>`};
    s+=arc(0,20,'var(--bad)')+arc(20,35,'var(--warn)')+arc(35,60,'var(--good)');
    [0,10,20,30,40,50,60].forEach(v=>{const p=P(v,gr+18);s+=`<text x="${f1(p[0])}" y="${f1(p[1]+4)}" class="t-xs t-mid">${v}</text>`});
    TG.forEach(([v,l,c])=>{const p0=P(v,gr-10),p1=P(v,gr+10),pl=P(v,gr-26);s+=`<line x1="${f1(p0[0])}" y1="${f1(p0[1])}" x2="${f1(p1[0])}" y2="${f1(p1[1])}" style="stroke:${c};stroke-width:2.4"/><text x="${f1(pl[0])}" y="${f1(pl[1]+3)}" class="t-xs t-mid" style="fill:${c};font-weight:700">${l}</text>`});
    const np=P(a,gr-40);
    s+=`<line x1="${gx}" y1="${gy}" x2="${f1(np[0])}" y2="${f1(np[1])}" style="stroke:var(--ink);stroke-width:3.5;stroke-linecap:round"/><circle cx="${gx}" cy="${gy}" r="7" style="fill:var(--ink)"/>`;
    s+=`<text x="${gx}" y="${gy+34}" class="t-mid" style="font:800 30px var(--display);fill:var(--ink)">${a}%</text><text x="${gx}" y="${gy+52}" class="t-xs t-mid">adenoma detection rate</text>`;
    const met=[a>=35?'meets the 2024 overall target (≥35%)':'below the 2024 overall target (≥35%)',a>=25?'meets ESGE 2017 minimum (25%)':'below ESGE 2017 minimum (25%)'];
    s+=`<text x="${gx}" y="${gy+72}" class="t-xs t-mid" style="fill:${a>=35?'var(--good)':a>=25?'var(--warn)':'var(--bad)'}">${met[0]}</text>`;
    /* withdrawal */
    const wx=N?20:410,wy=N?330:44,ww=N?360:290,M=14;
    s+=`<text x="${wx}" y="${wy}" class="t-lbl">Withdrawal time: ${w} min</text>`;
    s+=`<rect x="${wx}" y="${wy+10}" width="${ww}" height="14" rx="5" style="fill:var(--panel-2)"/><rect x="${wx}" y="${wy+10}" width="${f1(w/M*ww)}" height="14" rx="5" style="fill:${w>=8?'var(--good)':w>=6?'var(--warn)':'var(--bad)'}"/>`;
    [[6,'6 min'],[8,'8 min']].forEach(([m,l])=>{const x=wx+m/M*ww;s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${wy+6}" y2="${wy+28}" style="stroke:var(--ink);stroke-width:1.4"/><text x="${f1(x)}" y="${wy+40}" class="t-xs t-mid">${l}</text>`});
    const wt=w<6?['Under 6 minutes: linked to 2.3 times the','interval-cancer rate (IRR 2.3).']:w<8?['≥6 minutes: neoplasia found in 28.3% vs 11.8%','for faster endoscopists; target average is ≥8.']:['Meets the ≥8-minute average target','for normal colonoscopies.'];
    s+=`<text x="${wx}" y="${wy+58}" class="t-xs" style="fill:var(--ink)">${wt[0]}</text><text x="${wx}" y="${wy+71}" class="t-xs" style="fill:var(--ink)">${wt[1]}</text>`;
    /* Corley quintiles */
    const qx=N?40:430,qy=N?630:290,qw=N?340:270,qh=N?160:130,Q=[9.8,8.6,8.0,7.0,4.8];
    s+=`<text x="${N?20:410}" y="${qy-qh-26}" class="t-lbl">Interval cancers per 10,000 person-years</text><text x="${N?20:410}" y="${qy-qh-12}" class="t-xs">by physician ADR quintile (Kaiser Permanente)</text>`;
    Q.forEach((v,i)=>{const bw=qw/5-14,x=qx+i*qw/5,h=v/10*qh;
      s+=`<rect x="${f1(x)}" y="${f1(qy-h)}" width="${f1(bw)}" height="${f1(h)}" rx="3" style="fill:var(--accent);opacity:${f1(.45+i*.12)}"/><text x="${f1(x+bw/2)}" y="${f1(qy-h-4)}" class="t-xs t-mid" style="fill:var(--ink)">${v.toFixed(1)}</text><text x="${f1(x+bw/2)}" y="${qy+12}" class="t-xs t-mid">Q${i+1}</text>`});
    s+=`<text x="${qx}" y="${qy+25}" class="t-xs">lowest ADR</text><text x="${qx+qw-14}" y="${qy+25}" class="t-xs t-end">highest ADR</text>`;
    qs.innerHTML=s;
    qn.innerHTML=noteHTML({k:'Quality check',t:a>=35&&w>=8?'Meets the 2024 targets shown':a<20?'An ADR below 20%':'Room to improve',
      txt:a<20?`In Poland's screening programme, endoscopists with an ADR below 20% had interval-cancer hazard ratios of 10.75–12.50. <sup class="c" data-ref="Kaminski2010" title="Source 275">275</sup>`
        :`Each 1% rise in ADR was linked to a 3% lower interval-cancer risk (HR 0.97); the highest ADR quintile had a fatal interval-cancer HR of 0.38 compared with the lowest. Each extra minute of withdrawal raised ADR by 3.6%. <sup class="c" data-ref="Corley2014,Shaukat2015" title="Source 109,487">109,487</sup>`,
      pt:'A careful colonoscopy finds more polyps, and patients of doctors who find more get fewer later cancers.',
      hook:'ADR ≥35% overall (♂40, ♀30), ≥50% after positive stool test; withdrawal ≥8 min average. <sup class="c" data-ref="Rex2024" title="Source 451">451</sup>'});
  }
  adr.addEventListener('input',drawQ);wdr.addEventListener('input',drawQ);drawQ();

  /* ---- time to colonoscopy after positive FIT ---- */
  const fsv=$('#coFit'),fr=$('#coFitT'),fn=$('#coFitNote');
  function drawF(t){
    const N=vb(fsv,'720 320','400 520');let s='';const n=CO_FIT.length,mx=80;
    const g=i=>ease(ramp(t,i/n*.8,i/n*.8+.18));
    if(!N){const x0=70,base=262,H=200,gw=88;
      [0,20,40,60,80].forEach(v=>{const y=base-v/mx*H;s+=`<line x1="${x0-6}" x2="700" y1="${f1(y)}" y2="${f1(y)}" style="stroke:var(--line)"/><text x="${x0-10}" y="${f1(y+4)}" class="t-xs t-end">${v}</text>`});
      s+=`<text x="${x0-10}" y="24" class="t-xs">per 1,000 with a positive FIT</text>`;
      const bk=ramp(t,.75,.9);if(bk>0)s+=`<g style="opacity:${f1(bk)}"><path d="M${x0+4} 52V44H${x0+4*gw-8}V52" style="fill:none;stroke:var(--rx);stroke-width:1.6"/><text x="${x0+2*gw-2}" y="38" class="t-xs t-mid" style="fill:var(--rx);font-weight:700">ACS 2026: colonoscopy preferably within 6 months</text></g>`;
      CO_FIT.forEach(([lab,a,b],i)=>{const k=g(i),x=x0+i*gw+8,bw=32;
        s+=`<rect x="${x}" y="${f1(base-a/mx*H*k)}" width="${bw}" height="${f1(a/mx*H*k)}" rx="3" style="fill:var(--tumour);opacity:.85"/>`;
        s+=`<rect x="${x+bw+4}" y="${f1(base-b/mx*H*k)}" width="${bw}" height="${f1(b/mx*H*k)}" rx="3" style="fill:var(--lymph)"/>`;
        if(k>.95)s+=`<text x="${x+bw/2}" y="${f1(base-a/mx*H-5)}" class="t-xs t-mid" style="fill:var(--ink)">${a}</text><text x="${x+bw*1.5+4}" y="${f1(base-b/mx*H-5)}" class="t-xs t-mid" style="fill:var(--ink)">${b}</text>`;
        s+=`<text x="${x+bw+2}" y="${base+16}" class="t-xs t-mid" style="${i>=5?'fill:var(--bad);font-weight:700':''}">${lab}</text>`;
        if(i===5&&k>.95)s+=`<text x="${x+bw+2}" y="${base+30}" class="t-xs t-mid" style="fill:var(--bad)">OR 1.48 · 1.97</text>`;
        if(i===6&&k>.95)s+=`<text x="${x+bw+2}" y="${base+30}" class="t-xs t-mid" style="fill:var(--bad)">OR 2.25 · 3.22</text>`});
      s+=`<rect x="440" y="15" width="12" height="10" style="fill:var(--tumour)"/><text x="458" y="24" class="t-xs">any colorectal cancer</text><rect x="590" y="15" width="12" height="10" style="fill:var(--lymph)"/><text x="608" y="24" class="t-xs">stage III–IV</text>`;
    }else{const x0=86,x1=372,y0=74,rh=58;
      s+=`<text x="14" y="22" class="t-xs">per 1,000 with a positive FIT</text><rect x="14" y="34" width="12" height="10" style="fill:var(--tumour)"/><text x="30" y="43" class="t-xs">any CRC</text><rect x="110" y="34" width="12" height="10" style="fill:var(--lymph)"/><text x="126" y="43" class="t-xs">stage III–IV</text>`;
      CO_FIT.forEach(([lab,a,b],i)=>{const k=g(i),y=y0+i*rh,W=x1-x0;
        s+=`<text x="14" y="${y+12}" class="t-xs" style="${i>=5?'fill:var(--bad);font-weight:700':'fill:var(--ink)'}">${lab}</text>`;
        s+=`<rect x="${x0}" y="${y}" width="${f1(a/mx*W*k)}" height="14" rx="3" style="fill:var(--tumour);opacity:.85"/><rect x="${x0}" y="${y+18}" width="${f1(b/mx*W*k)}" height="12" rx="3" style="fill:var(--lymph)"/>`;
        if(k>.95)s+=`<text x="${f1(x0+a/mx*W+4)}" y="${y+11}" class="t-xs" style="fill:var(--ink)">${a}</text><text x="${f1(x0+b/mx*W+4)}" y="${y+28}" class="t-xs" style="fill:var(--ink)">${b}${i===5?' · OR 1.48 / 1.97':i===6?' · OR 2.25 / 3.22':''}</text>`});
      const bk=ramp(t,.75,.9);if(bk>0)s+=`<g style="opacity:${f1(bk)}"><path d="M8 ${y0-4}H4V${y0+4*rh-12}H8" style="fill:none;stroke:var(--rx);stroke-width:1.8"/><text x="14" y="${y0+7*rh+6}" class="t-xs" style="fill:var(--rx);font-weight:700">bracket: ACS 2026, preferably within 6 months</text></g>`;
    }
    fsv.innerHTML=s;
    const i=clamp(Math.floor(t/.8*n),0,n-1),c=CO_FIT[i];
    fn.innerHTML=noteHTML({k:'Time to colonoscopy',t:c[0]+': '+c[1]+' cancers per 1,000',
      txt:i<4?`Up to 6 months the rates stay flat: colonoscopy at 2–9 months carried no excess risk compared with 8–30 days. ACS 2026 says a positive non-colonoscopy test needs colonoscopy, preferably within 6 months. <sup class="c" data-ref="Corley2017,Wolf2026" title="Source 110,585">110,585</sup>`
        :`At 10–12 months, CRC was more likely (OR 1.48; 49 vs 30 per 1,000) and so was stage III–IV disease (OR 1.97). After 12 months: OR 2.25 for CRC (76 per 1,000) and 3.22 for advanced stage (31 per 1,000). In Denmark, colonoscopy more than 90 days after the invitation was linked to more CRC (OR 3.49). <sup class="c" data-ref="Corley2017,Kaalby2019" title="Source 110,274">110,274</sup>`,
      pt:'If a stool test is positive, the colonoscopy should happen within a few months, not put off for a year.',
      hook:'Waiting more than 10 months after a positive FIT raises the risk of cancer and of advanced stage. <sup class="c" data-ref="Corley2017" title="Source 110">110</sup>'});
  }
  playWire(fr,$('#coFitPlay'),drawF,7000,'Replay','colonoscopy');
  drawF(+fr.value);
  const prevR=redraws.colonoscopy;redraws.colonoscopy=()=>{prevR&&prevR();drawQ();drawF(+fr.value)};
};
/* =============== 2.3 When to start, how often =============== */
const SH_TESTS={
 fit:{n:'FIT',iv:1,ic:'t',q:`FIT every year (USPSTF 2021, ACS); the ACP 2023 says every 2 years. <sup class="c" data-ref="USPSTF2021,Wolf2018,Qaseem2023" title="Source 440,545,584">440,545,584</sup>`},
 gfobt:{n:'High-sensitivity gFOBT',iv:1,ic:'t',q:`High-sensitivity gFOBT every year (USPSTF 2021, ACS 2018); every 2 years (ACP 2023). <sup class="c" data-ref="USPSTF2021,Wolf2018,Qaseem2023" title="Source 440,545,584">440,545,584</sup>`},
 sdna:{n:'mt-sDNA',iv:3,ic:'t',q:`Stool DNA-FIT every 1–3 years (USPSTF 2021); mt-sDNA every 3 years (ACS). Drawn at 3 years. <sup class="c" data-ref="USPSTF2021,Wolf2018" title="Source 545,584">545,584</sup>`},
 ng:{n:'Next-gen mt-sDNA',iv:3,ic:'t',q:`ACS 2026 adds the next-generation mt-sDNA test as a preferred stool option at 3-year intervals. <sup class="c" data-ref="Wolf2026" title="Source 585">585</sup>`},
 rna:{n:'mt-sRNA',iv:3,ic:'t',q:`ACS 2026 adds the mt-sRNA test as a preferred stool option at 3-year intervals. <sup class="c" data-ref="Wolf2026" title="Source 585">585</sup>`},
 ctc:{n:'CT colonography',iv:5,ic:'c',q:`CT colonography every 5 years (USPSTF 2021, ACS 2018). <sup class="c" data-ref="USPSTF2021,Wolf2018" title="Source 545,584">545,584</sup>`},
 fs:{n:'Sigmoidoscopy',iv:5,ic:'s',q:`Flexible sigmoidoscopy every 5 years (USPSTF 2021, ACS 2018). <sup class="c" data-ref="USPSTF2021,Wolf2018" title="Source 545,584">545,584</sup>`},
 fsfit:{n:'Sigmoidoscopy + FIT',iv:10,ic:'s',fit:true,q:`Flexible sigmoidoscopy every 10 years plus annual FIT (USPSTF 2021). <sup class="c" data-ref="USPSTF2021" title="Source 545">545</sup>`},
 col:{n:'Colonoscopy',iv:10,ic:'o',q:`Colonoscopy every 10 years (USPSTF 2021, ACS, USMSTF tier 1). <sup class="c" data-ref="USPSTF2021,Wolf2018,Rex2017" title="Source 450,545,584">450,545,584</sup>`},
 blood:{n:'Blood test',iv:null,ic:'b',q:`ACS 2026 recommends blood-based tests only for people who decline or do not complete the preferred tests; a repeat interval is not given in our sources. The Shield label says a positive result should be followed by colonoscopy. <sup class="c" data-ref="Wolf2026,FDA-Shield" title="Source 172,585">172,585</sup>`}
};
/* USMSTF 2020 (Gupta2020): iv [lo,hi] years; after = next interval if the first surveillance exam is normal; esge: ESGE 2020 (Hassan2020) */
const SH_FIND={
 none:{n:'no colonoscopy yet'},
 normal:{n:'a normal colonoscopy',iv:[10,10],ev:'strong recommendation, high-quality evidence'},
 ta12:{n:'1–2 tubular adenomas <10 mm',iv:[7,10],ev:'strong, moderate-quality evidence',after:10,esge:'none'},
 ta34:{n:'3–4 tubular adenomas <10 mm',iv:[3,5],ev:'weak, very-low-quality evidence',after:10,esge:'none'},
 ta510:{n:'5–10 tubular adenomas <10 mm',iv:[3,3],ev:'strong, moderate-quality evidence',after:5,esge:3},
 ad10:{n:'an adenoma ≥10 mm',iv:[3,3],ev:'strong, high-quality evidence',after:5,esge:3},
 tv:{n:'a tubulovillous or villous adenoma',iv:[3,3],ev:'strong, moderate-quality evidence',after:5},
 hgd:{n:'an adenoma with high-grade dysplasia',iv:[3,3],ev:'strong, moderate-quality evidence',after:5,esge:3},
 gt10:{n:'more than 10 adenomas',iv:[1,1],ev:'weak, very-low-quality evidence',gen:true},
 pm20:{n:'an adenoma ≥20 mm removed piecemeal',iv:[.5,.5],ev:'strong, moderate-quality evidence',esge:'pm'},
 hp:{n:'≤20 hyperplastic polyps <10 mm in the rectum or sigmoid',iv:[10,10]},
 ssl12:{n:'1–2 sessile serrated lesions <10 mm',iv:[5,10],esge:'none'},
 ssl34:{n:'3–4 sessile serrated lesions <10 mm',iv:[3,5],esge:'none'},
 ssl510:{n:'5–10 sessile serrated lesions <10 mm',iv:[3,3],esge:'none'},
 ssl10:{n:'a sessile serrated lesion ≥10 mm',iv:[3,3],esge:3},
 ssld:{n:'a sessile serrated lesion with dysplasia',iv:[3,3],esge:3},
 tsa:{n:'a traditional serrated adenoma',iv:[3,3]},
 hp10:{n:'a hyperplastic polyp ≥10 mm',iv:[3,5],esge:3},
 pmssl:{n:'a sessile serrated lesion ≥20 mm removed piecemeal',iv:[.5,.5],esge:'pm'}
};
const SH_STEPS=[
 {from:0,at:.03,k:'Age 45–49',t:'Grade B: start at 45',
  txt:`USPSTF 2021 recommends screening adults aged 45–49 (grade B: moderate certainty of moderate net benefit). ACS calls starting at 45 a qualified recommendation; USMSTF 2022 also suggests 45. The ACP 2023 suggests considering not screening at 45–49. Lowering the start age from 50 to 45 was modelled to add 22–27 life-years, 161–784 colonoscopies and 0.1–2 complications per 1,000 people. <sup class="c" data-ref="USPSTF2021,Wolf2018,Patel2022,Qaseem2023,Knudsen2021" title="Source 286,422,440,545,584">286,422,440,545,584</sup>`,
  pt:`Most US groups now say to start at 45 if your risk is average. One group (the ACP) still says 50. <sup class="c" data-ref="USPSTF2021,Qaseem2023" title="Source 440,545">440,545</sup>`,
  hook:`USPSTF: B at 45–49, A at 50–75, C at 76–85. <sup class="c" data-ref="USPSTF2021" title="Source 545">545</sup>`},
 {from:.125,at:.2,k:'Age 50–75',t:'Grade A: the core years',
  txt:`USPSTF 2021 has high certainty of substantial net benefit for screening at 50–75 (grade A). The tests repeat at their published intervals. In 2016, 26% of eligible US adults had never been screened, and in 2018, 31% were not up to date. <sup class="c" data-ref="USPSTF2021" title="Source 545">545</sup>`,
  pt:`The best test is the one you actually do, repeated on time. <sup class="c" data-ref="Wolf2026" title="Source 585">585</sup>`,
  hook:`Strategies: FIT yearly; stool DNA-FIT 1–3 y; CTC 5 y; sigmoidoscopy 5 y (or 10 y + yearly FIT); colonoscopy 10 y. <sup class="c" data-ref="USPSTF2021" title="Source 545">545</sup>`},
 {from:.3,at:.36,k:'What if',t:'If a test is positive',
  txt:`Any positive non-colonoscopy test needs a follow-up colonoscopy, preferably within 6 months (ACS 2026). After a colonoscopy, the schedule switches to surveillance based on what was found (the calculator above). In Kaiser Permanente, 79.4% of people with a positive FIT had a colonoscopy within 1 year. <sup class="c" data-ref="Wolf2026,Gupta2020,Doubeni2024" title="Source 135,209,585">135,209,585</sup>`,
  pt:`A positive stool test means a colonoscopy within a few months. After that, the colonoscopy findings set the timetable. <sup class="c" data-ref="Corley2017,Wolf2026" title="Source 110,585">110,585</sup>`,
  hook:`Colonoscopy >10 months after a positive FIT: more CRC (OR 1.48 at 10–12 months) and more advanced stage. <sup class="c" data-ref="Corley2017" title="Source 110">110</sup>`},
 {from:.775,at:.82,k:'Age 76–85',t:'Grade C: an individual choice',
  txt:`USPSTF 2021 recommends selectively offering screening at 76–85 (grade C), weighing overall health, prior screening and preferences; people never screened are more likely to benefit. ACS individualises at 76–85 and discourages screening over 85; USMSTF does not recommend it after 85. The ACP says stop after 75, or when life expectancy is 10 years or less. <sup class="c" data-ref="USPSTF2021,Wolf2018,Patel2022,Qaseem2023" title="Source 422,440,545,584">422,440,545,584</sup>`,
  pt:`After 75, whether to keep screening depends on health and past results. After 85, screening is generally not recommended.`,
  hook:`ACS: continue through 75 if life expectancy is over 10 years; individualise 76–85; discourage over 85. <sup class="c" data-ref="Wolf2018" title="Source 584">584</sup>`},
 {from:.93,at:1,k:'Lifetime',t:'Modelled totals per 1,000',
  txt:`In CISNET modelling for the USPSTF, screening strategies gave 171–381 life-years gained per 1,000 40-year-olds, averted 16–74 CRC cases and 15–32 CRC deaths per 1,000, and caused 5–22 complications per 1,000. Colonoscopy every 10 years from 45 to 75 needed 4,212–4,300 colonoscopies per 1,000; annual FIT needed 1,602–1,824. <sup class="c" data-ref="Knudsen2021" title="Source 286">286</sup>`,
  pt:`Numbers like these describe 1,000 people over a lifetime, not what will happen to any one person. <sup class="c" data-ref="Bretthauer2022" title="Source 77">77</sup>`,
  hook:`41 of the 49 strategies efficient in all 3 models began at age 45. <sup class="c" data-ref="Knudsen2021" title="Source 286">286</sup>`}
];
inits.schedule=()=>{
  const ts=$('#shTime'),out=$('#shOut'),read=$('#shRead');
  const sel=id=>$('#'+id).value;
  /* tiny event glyphs */
  function glyph(x,y,ic,o={}){const c=o.col||'var(--accent)',h=o.hollow;
    if(ic==='t')return `<rect x="${f1(x-3.5)}" y="${f1(y-6)}" width="7" height="12" rx="2.5" style="fill:${h?'var(--panel)':c};stroke:${c};stroke-width:1.4"/>`;
    if(ic==='b')return `<path d="M${f1(x)} ${f1(y-7)}C${f1(x+6)} ${f1(y)} ${f1(x+5)} ${f1(y+6)} ${f1(x)} ${f1(y+6)}C${f1(x-5)} ${f1(y+6)} ${f1(x-6)} ${f1(y)} ${f1(x)} ${f1(y-7)}Z" style="fill:${h?'var(--panel)':'var(--blood)'};stroke:var(--blood);stroke-width:1.3"/>`;
    if(ic==='c')return `<rect x="${f1(x-6)}" y="${f1(y-6)}" width="12" height="12" rx="2" style="fill:${h?'var(--panel)':c};stroke:${c};stroke-width:1.4"/><circle cx="${f1(x)}" cy="${f1(y)}" r="2.8" style="fill:var(--panel)"/>`;
    if(ic==='s')return `<path d="M${f1(x-6)} ${f1(y+5)}L${f1(x)} ${f1(y-6)}L${f1(x+6)} ${f1(y+5)}Z" style="fill:${h?'var(--panel)':c};stroke:${c};stroke-width:1.4"/>`;
    return `<circle cx="${f1(x)}" cy="${f1(y)}" r="${o.r||6.5}" style="fill:${h?'var(--panel)':c};stroke:${c};stroke-width:1.6"/>`}
  /* the guideline scenario from the inputs */
  function plan(){
    const risk=sel('shRisk'),tk=sel('shTest'),fk=sel('shLast'),ageL=+sel('shAge'),rel=+sel('shRel');
    const T=SH_TESTS[tk],F=SH_FIND[fk];
    const P={ev:[],band:null,esge:[],quotes:[],head:'',sub:'',minA:40,link:false,note:''};
    if(risk==='fap'){P.head='FAP: see the genetics module';P.sub='Our screening sources give no FAP schedule; FAP care is covered in 1.5.';P.link=true;P.quotes.push('The screening and surveillance sources used here do not cover FAP surveillance. Module 1.5 covers inherited syndromes.');return P}
    if(risk==='lynch12'||risk==='lynch6p'){const st=risk==='lynch12'?25:35;P.minA=20;
      P.ev.push({a:st,ic:'o',lab:'start '+st,big:true});
      P.head=`Colonoscopy surveillance from age ${st}`;P.sub='ESGE 2019; the repeat interval is not in our sources, so only the start is drawn.';P.link=true;
      P.quotes.push(`In Lynch syndrome, ESGE recommends colonoscopy surveillance from age 25 for MLH1 and MSH2 carriers and from age 35 for MSH6 and PMS2 carriers. <sup class="c" data-ref="vanLeerdam2019" title="Source 557">557</sup>`);return P}
    let start=45,iv=T.iv,ic=T.ic,useCol=false;
    if(risk==='fdr60'){start=Math.min(40,rel-10);iv=5;ic='o';useCol=true;P.minA=Math.min(40,Math.floor((start-2)/5)*5);
      P.quotes.push(`USMSTF 2017: colonoscopy every 5 years, starting at 40 or 10 years before the youngest relative's diagnosis (whichever is earlier), for a first-degree relative with CRC or a documented advanced adenoma before 60, or two first-degree relatives at any age. <sup class="c" data-ref="Rex2017" title="Source 450">450</sup>`);
      P.quotes.push(`ESGE defines familial risk as ≥2 first-degree relatives with CRC, or ≥1 diagnosed before 50, and recommends colonoscopy surveillance in those families. <sup class="c" data-ref="vanLeerdam2019" title="Source 557">557</sup>`)}
    else if(risk==='fdr60p'){start=40;P.quotes.push(`USMSTF 2017: one first-degree relative diagnosed at ≥60 with CRC or an advanced adenoma → average-risk screening options, starting at age 40. <sup class="c" data-ref="Rex2017" title="Source 450">450</sup>`)}
    else P.quotes.push(`USPSTF 2021: screen all adults aged 50–75 (A) and adults aged 45–49 (B); selectively offer screening at 76–85 (C). <sup class="c" data-ref="USPSTF2021" title="Source 545">545</sup>`);
    if(!useCol)P.quotes.push(T.q);
    const scopeAt=fk==='none'?null:ageL;
    /* screening events up to the colonoscopy (or to 85) */
    const until=scopeAt==null?85:scopeAt;
    if(iv==null){if(start<until)P.ev.push({a:start,ic:'b',lab:'blood test'})}
    else for(let a=start;a<until-.01&&a<=85;a+=iv){P.ev.push({a,ic,hollow:a>75,past:scopeAt!=null});if(T.fit&&!useCol)for(let k=1;k<iv&&a+k<until&&a+k<=85;k++)P.ev.push({a:a+k,ic:'t',small:true,hollow:a+k>75,past:scopeAt!=null})}
    if(scopeAt!=null){
      P.ev.push({a:scopeAt,ic:'o',big:true,col:'var(--polyp)',lab:'colonoscopy: '+(fk==='normal'?'normal':'polyps')});
      const [lo,hi]=F.iv;
      P.band={a0:scopeAt+lo,a1:scopeAt+hi};
      P.ev.push({a:scopeAt+lo,ic:'o',lab:lo===hi?(lo<1?'+6 months':`+${lo} y`):`+${lo}–${hi} y`,next:true});
      if(F.after)P.ev.push({a:scopeAt+hi+F.after,ic:'o',hollow:true,dash:true,lab:`if normal: +${F.after} y`});
      else if(fk==='normal'||fk==='hp')for(let a=scopeAt+20;a<=85;a+=10)P.ev.push({a,ic:'o',hollow:true,dash:true});
      if(useCol)P.note='The family-history interval (5 years) and the polyp-based interval are both shown in the quotes; how to combine them is not covered by our sources.';
      const nx=scopeAt+lo;
      P.head=lo<1?'Repeat colonoscopy at 6 months':lo===hi?`Next colonoscopy in ${lo} years (age ${nx})`:`Next colonoscopy in ${lo}–${hi} years (age ${scopeAt+lo}–${scopeAt+hi})`;
      P.sub=`USMSTF 2020 after ${F.n}${F.ev?' ('+F.ev+')':''}.`;
      P.quotes.push(`USMSTF 2020 interval after ${F.n}: ${lo<1?'6 months':lo===hi?lo+' years':lo+'–'+hi+' years'}${F.ev?'; '+F.ev:''}. These intervals assume a complete, high-quality exam. <sup class="c" data-ref="Gupta2020" title="Source 209">209</sup>`);
      if(F.after)P.quotes.push(`If the first surveillance colonoscopy is normal: next in ${F.after} years (USMSTF 2020). <sup class="c" data-ref="Gupta2020" title="Source 209">209</sup>`);
      if(F.gen)P.quotes.push(`More than 10 adenomas: genetic testing may be needed (USMSTF 2020). <sup class="c" data-ref="Gupta2020" title="Source 209">209</sup>`),P.link=true;
      if(F.esge==='none'){P.esge.push({a:scopeAt+10,lab:'back to screening (10 y if no programme)'});P.quotes.push(`ESGE 2020: completely removed 1–4 adenomas <10 mm with low-grade dysplasia, or serrated polyps <10 mm without dysplasia, need no surveillance; return to screening. <sup class="c" data-ref="Hassan2020" title="Source 227">227</sup>`)}
      else if(F.esge===3){P.esge.push({a:scopeAt+3,lab:'3 y'});P.quotes.push(`ESGE 2020 also recommends surveillance at 3 years for this finding. <sup class="c" data-ref="Hassan2020" title="Source 227">227</sup>`)}
      else if(F.esge==='pm'){P.esge.push({a:scopeAt+.375,lab:'3–6 mo'},{a:scopeAt+1.375,lab:'then +12 mo'});P.quotes.push(`ESGE 2020: after piecemeal resection of a lesion ≥20 mm, repeat at 3–6 months, then surveillance 12 months later. <sup class="c" data-ref="Hassan2020" title="Source 227">227</sup>`)}
      if(scopeAt<start&&risk!=='fdr60')P.sub+=' (A colonoscopy before the usual start age is drawn as given.)';
    }else{
      const nx=P.ev.length?P.ev[0].a:start;
      P.head=useCol?`Colonoscopy every 5 years from age ${start}`:T.fit?`Sigmoidoscopy every 10 years plus FIT every year from age ${start}`:iv==null?`${T.n}: from age ${start}, only if the preferred tests are declined`:`${T.n} ${iv===1?'every year':'every '+iv+' years'} from age ${start}`;
      P.sub=risk==='avg'?'Through 75, then an individual decision at 76–85.':risk==='fdr60p'?'Average-risk options, starting at 40.':'Family history: colonoscopy, whatever test was selected.';
      if(risk==='avg'&&tk!=='blood')P.quotes.push(`ACS 2026 reaffirms starting at 45 and continuing through 75 when life expectancy is over 10 years. ACP 2023 starts at 50. <sup class="c" data-ref="Wolf2026,Qaseem2023" title="Source 440,585">440,585</sup>`);
      P.ev.forEach(e=>{if(e===P.ev[0])e.lab='start '+e.a});
      void nx;
    }
    if(tk!=='col'&&!useCol)P.quotes.push(`A positive non-colonoscopy test needs a follow-up colonoscopy, preferably within 6 months (ACS 2026). <sup class="c" data-ref="Wolf2026" title="Source 585">585</sup>`);
    return P}
  function drawT(){
    const P=plan(),hasE=P.esge.length>0||P.link,N=vb(ts,hasE?'720 270':'720 222',hasE?'400 300':'400 236');
    const A0=P.minA,A1=85,ax0=N?62:92,ax1=N?388:704,X=a=>ax0+(clamp(a,A0,A1)-A0)/(A1-A0)*(ax1-ax0);
    let s='';const lx=N?6:10;
    /* guideline bands */
    const by=N?28:30,bh=16;
    s+=`<text x="${lx}" y="${by+12}" class="t-xs" style="fill:var(--ink);font-weight:700">USPSTF</text>`;
    [[45,50,'B','var(--accent-soft)','var(--accent)'],[50,76,'A 50–75','var(--accent)','var(--on-brand)'],[76,85,'C 76–85','var(--panel-2)','var(--accent)']].forEach(([a,b,l,f,tc])=>{if(b<=A0)return;
      s+=`<rect x="${f1(X(a))}" y="${by}" width="${f1(X(b)-X(a)-1)}" height="${bh}" rx="3" style="fill:${f};stroke:var(--accent);stroke-width:.8"/><text x="${f1((X(a)+X(b))/2)}" y="${by+12}" class="t-xs t-mid" style="fill:${tc};font-weight:700">${l}</text>`});
    const ay=by+24;
    s+=`<text x="${lx}" y="${ay+12}" class="t-xs" style="fill:var(--ink);font-weight:700">ACP</text><rect x="${f1(X(50))}" y="${ay}" width="${f1(X(76)-X(50)-1)}" height="${bh}" rx="3" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:.8"/><text x="${f1((X(50)+X(76))/2)}" y="${ay+12}" class="t-xs t-mid" style="fill:var(--ink)">50–75</text>`;
    /* scenario track */
    const ty=N?140:136;
    s+=`<text x="${lx}" y="${ty+4}" class="t-xs" style="fill:var(--ink);font-weight:700">${N?'Track':'Guideline track'}</text>`;
    s+=`<line x1="${ax0}" x2="${ax1}" y1="${ty}" y2="${ty}" style="stroke:var(--line);stroke-width:3"/>`;
    if(P.band)s+=`<rect x="${f1(X(P.band.a0)-4)}" y="${ty-16}" width="${f1(Math.max(8,X(P.band.a1)-X(P.band.a0)+8))}" height="32" rx="8" style="fill:var(--good-soft);stroke:var(--good);stroke-width:1.4"/>`;
    let lastLab=-99,row=0;
    P.ev.filter(e=>e.a<=85.01).forEach(e=>{const x=X(e.a);
      if(e.dash)s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${ty-10}" y2="${ty+10}" style="stroke:var(--accent);stroke-dasharray:2 2"/>`;
      s+=`<g style="opacity:${e.past?.4:1}">${glyph(x,ty,e.small?'t':e.ic,{hollow:e.hollow,col:e.col||(e.next?'var(--good)':'var(--accent)'),r:e.big?8:6})}</g>`;
      if(e.lab){row=x-lastLab<(N?70:96)?1-row:0;lastLab=x;const ly=row?ty+30:ty-24;
        s+=`<text x="${f1(clamp(x,ax0+20,ax1-30))}" y="${ly}" class="t-xs t-mid" style="fill:${e.next?'var(--good)':e.col||'var(--ink)'};font-weight:700">${e.lab}</text>`}});
    if(P.link)s+=`<text x="${f1(X(A0)+4)}" y="${ty+52}" class="t-xs" style="fill:var(--brand)">→ see module 1.5, Lynch syndrome &amp; FAP</text>`;
    /* ESGE row */
    if(P.esge.length){const ey=ty+(N?60:58);s+=`<text x="${lx}" y="${ey+4}" class="t-xs" style="fill:var(--ink);font-weight:700">ESGE 2020</text><line x1="${ax0}" x2="${ax1}" y1="${ey}" y2="${ey}" style="stroke:var(--line);stroke-width:2;stroke-dasharray:4 3"/>`;
      P.esge.forEach((e,i)=>{const x=X(e.a);s+=glyph(x,ey,'o',{col:'var(--rx)',r:5.5})+`<text x="${f1(clamp(x,ax0+30,ax1-60))}" y="${ey+(i%2?22:-12)}" class="t-xs t-mid" style="fill:var(--rx);font-weight:700">${e.lab}</text>`})}
    /* axis */
    const yy=hasE?(N?262:236):(N?198:188);
    s+=`<line x1="${ax0}" x2="${ax1}" y1="${yy}" y2="${yy}" style="stroke:var(--muted)"/>`;
    for(let a=Math.ceil(A0/5)*5;a<=85;a+=5)s+=`<line x1="${f1(X(a))}" x2="${f1(X(a))}" y1="${yy}" y2="${yy+5}" style="stroke:var(--muted)"/><text x="${f1(X(a))}" y="${yy+17}" class="t-xs t-mid">${a}</text>`;
    s+=`<text x="${ax1}" y="${yy-6}" class="t-xs t-end">age</text>`;
    ts.innerHTML=s;
    out.innerHTML=`<div class="kicker">What the guidelines say</div><h4>${P.head}</h4>${P.sub?`<p>${P.sub}</p>`:''}<ul>${P.quotes.map(q=>`<li>${q}</li>`).join('')}</ul>${P.note?`<p class="stage-cap">${P.note}</p>`:''}${P.link?'<button class="btn ghost" data-go="genes">Open 1.5 Lynch syndrome &amp; FAP →</button>':''}`;
    read.innerHTML=`<b>Key:</b> filled marks are tests within the recommended years; hollow marks fall at 76–85, where the decision is individual; faded marks are tests before the last colonoscopy; the green bracket is the next surveillance interval as published; dashed marks are later steps that depend on results.`;
    $('#shRel').disabled=sel('shRisk')!=='fdr60';$('#shAge').disabled=sel('shLast')==='none';
  }
  ['shRisk','shRel','shTest','shLast','shAge'].forEach(id=>$('#'+id).addEventListener('change',()=>{drawT();drawL(+rg.value)}));

  /* ---- lifetime animation: average risk, from 45, chosen test ---- */
  const ls=$('#shLife'),rg=$('#shT'),note=$('#shNote');
  function drawL(t){
    const N=vb(ls,'720 340','400 440'),tk=sel('shTest'),T=SH_TESTS[tk];
    const age=45+t*40,ax0=N?30:60,ax1=N?380:700,X=a=>ax0+(a-45)/40*(ax1-ax0);
    let s='';
    const by=N?40:40;
    [[45,50,'B','var(--accent-soft)','var(--accent)'],[50,76,'A','var(--accent)','var(--on-brand)'],[76,85,'C','var(--panel-2)','var(--accent)']].forEach(([a,b,l,f,tc])=>{
      s+=`<rect x="${f1(X(a))}" y="${by}" width="${f1(X(b)-X(a)-1)}" height="18" rx="3" style="fill:${f};stroke:var(--accent);stroke-width:.8;opacity:${age>=a?1:.35}"/><text x="${f1((X(a)+X(b))/2)}" y="${by+13}" class="t-xs t-mid" style="fill:${tc};font-weight:700;opacity:${age>=a?1:.4}">${l}</text>`});
    s+=`<text x="${ax0}" y="${by-10}" class="t-xs" style="fill:var(--ink);font-weight:700">USPSTF grade · ${T.n}</text>`;
    const gy=N?150:150;
    s+=`<line x1="${ax0}" x2="${ax1}" y1="${gy}" y2="${gy}" style="stroke:var(--line);stroke-width:4;stroke-linecap:round"/><line x1="${ax0}" x2="${f1(X(age))}" y1="${gy}" y2="${gy}" style="stroke:var(--accent);stroke-width:4;stroke-linecap:round"/>`;
    for(let a=45;a<=85;a+=5)s+=`<text x="${f1(X(a))}" y="${gy+22}" class="t-xs t-mid" style="${Math.abs(a-age)<2.5?'fill:var(--ink);font-weight:700':''}">${a}</text>`;
    let done=0,opt=0;const ev=[];
    if(T.iv==null)ev.push({a:45,ic:'b'});else for(let a=45;a<=85;a+=T.iv){ev.push({a,ic:T.ic});if(T.fit)for(let k=1;k<T.iv&&a+k<=85;k++)ev.push({a:a+k,ic:'t',small:true})}
    ev.forEach(e=>{const on=age>=e.a,pop=bump(age,e.a,e.a+1.2),x=X(e.a),hollow=e.a>75;
      if(on){if(hollow)opt++;else done++}
      s+=`<g style="opacity:${on?1:.18}" transform="translate(${f1(x)} ${f1(gy-14-pop*10)}) scale(${f1(1+pop*.6)}) translate(${f1(-x)} ${f1(-(gy-14))})">${glyph(x,gy-14,e.small?'t':e.ic,{hollow,r:5})}</g>`});
    /* the person */
    const px=X(Math.min(age,85)),step=Math.sin(age*4)*2;
    s+=person(px,gy+28+step*.2,N?24:26,'var(--brand)');
    /* what-if branch at 58 */
    const wi=bump(t,.3,.46)>0?clamp(ramp(t,.3,.36)):0,keep=t>=.3&&t<.77;
    if(keep&&tk!=='col'){const x=X(58),x2=X(58.5);
      s+=`<g style="opacity:${f1(Math.min(1,wi*1.2))}"><path d="M${f1(x)} ${gy-14}Q${f1(x)} ${gy-58} ${f1(x2+30)} ${gy-62}" style="fill:none;stroke:var(--bad);stroke-width:1.6;stroke-dasharray:4 3"/>${glyph(x2+38,gy-62,'o',{col:'var(--bad)'})}<text x="${f1(x2+50)}" y="${gy-66}" class="t-xs" style="fill:var(--bad);font-weight:700">what if positive?</text><text x="${f1(x2+50)}" y="${gy-54}" class="t-xs" style="fill:var(--bad)">colonoscopy, preferably ≤6 months</text></g>`}
    else if(keep){const x=X(55);s+=`<g style="opacity:${f1(wi)}"><path d="M${f1(x)} ${gy-20}Q${f1(x)} ${gy-58} ${f1(x+30)} ${gy-62}" style="fill:none;stroke:var(--polyp);stroke-width:1.6;stroke-dasharray:4 3"/><text x="${f1(x+36)}" y="${gy-66}" class="t-xs" style="fill:var(--polyp-line);font-weight:700">what if polyps are found?</text><text x="${f1(x+36)}" y="${gy-54}" class="t-xs" style="fill:var(--polyp-line)">surveillance by findings (USMSTF 2020)</text></g>`}
    /* counter */
    const cy=N?250:236,cx=N?30:60;
    s+=`<text x="${cx}" y="${cy}" class="t-lbl">Age ${Math.floor(age)}</text><text x="${cx}" y="${cy+20}" class="t-sm" style="fill:var(--ink)">${T.iv==null?'blood test: interval not given in our sources':`${done} test${done===1?'':'s'} in the recommended years (45–75)`}</text>`;
    if(opt)s+=`<text x="${cx}" y="${cy+36}" class="t-sm">+ ${opt} optional at 76–85 (individual decision)</text>`;
    if(age>=85)s+=`<text x="${cx}" y="${cy+52}" class="t-sm" style="fill:var(--bad)">after 85: screening not recommended</text>`;
    /* modelled totals */
    const k=ramp(t,.93,1);
    if(k>0){const M=tk==='col'?[['4,212–4,300','colonoscopies'],['301–369','life-years gained'],['3–8','CRC deaths remaining']]:tk==='fit'?[['1,602–1,824','colonoscopies'],['291–348','life-years gained'],['6–10','CRC deaths remaining']]:null;
      const mx=N?30:400,my=N?332:226,w=N?340:300;
      s+=`<g style="opacity:${f1(k)}"><rect x="${mx-10}" y="${my-22}" width="${w}" height="${M?102:66}" rx="10" style="fill:var(--panel-2);stroke:var(--line)"/>`;
      s+=`<text x="${mx}" y="${my-4}" class="t-xs" style="fill:var(--ink);font-weight:700">Modelled per 1,000, screening 45–75 (CISNET)</text>`;
      if(M)M.forEach((m,i)=>{s+=`<text x="${mx}" y="${my+20+i*22}" class="t-lbl" style="fill:var(--accent)">${m[0]}</text><text x="${mx+(N?100:100)}" y="${my+20+i*22}" class="t-xs">${m[1]}</text>`});
      else s+=`<text x="${mx}" y="${my+16}" class="t-xs">This strategy's totals are not in our sources.</text><text x="${mx}" y="${my+30}" class="t-xs">All strategies: 171–381 life-years gained per 1,000.</text>`;
      s+='</g>'}
    ls.innerHTML=s;
    const ph=phaseOf(SH_STEPS,t);note.innerHTML=noteHTML(SH_STEPS[ph]);setSt(ph);
    rg.setAttribute('aria-valuetext','Age '+Math.floor(age));
  }
  const stop=playWire(rg,$('#shPlay'),drawL,20000,'Replay','schedule');
  const setSt=stepWire($('#shSteps'),SH_STEPS,rg,drawL,stop);
  drawT();drawL(+rg.value);
  const prevR=redraws.schedule;redraws.schedule=()=>{prevR&&prevR();drawT()};
};
/* =============== 3.1 Symptoms & red flags =============== */
/* Primary-care positive predictive values as published. head = the value drawn in the 1,000-dot grid. */
const SY_SYM={
 bleed:{n:'Rectal bleeding',head:0,ppv:[['Exeter, age 40+',2.4],['First episode, men (3-year)',2.4],['First episode, women (3-year)',2.0],['Men aged 80+ (GPRD)',4.5],['Pooled, age 50+ (23 studies)',8.1]],
  txt:`In the Exeter case-control study (349 cases aged 40 and over, 1,744 controls) the positive predictive value of rectal bleeding in primary care was 2.4%. In a GPRD cohort of 762,325 patients, the 3-year PPV of a first episode was 2.4% in men and 2.0% in women and rose with age; in men aged 80 and over it reached 4.5% in a GPRD case-control study. A systematic review of 23 primary-care studies pooled 8.1% in people aged 50 and over. Bleeding as the first symptom was associated with less advanced stage and lower mortality (HR 0.56). <sup class="c" data-ref="Hamilton2005,Jones2007,Hamilton2009,Astin2011,Stapley2006" title="Source 25,217,219,269,511">25,217,219,269,511</sup>`,
  pt:`Blood from your bottom is the most common warning sign in younger people, but it is frequently caused by piles. A doctor needs to check it. <sup class="c" data-ref="Demb2024,Monahan2022" title="Source 125,375">125,375</sup>`,
  hook:`PPV of rectal bleeding in primary care: about 2–8%, depending on age and setting. <sup class="c" data-ref="Hamilton2005,Astin2011,Jones2007" title="Source 25,217,269">25,217,269</sup>`},
 habit:{n:'Change in bowel habit',head:0,ppv:[['Diarrhoea (Exeter)',0.94],['Constipation (Exeter)',0.42],['Change in habit, men 80+ (GPRD)',3.9]],
  txt:`In the Exeter study the PPV was 0.94% for diarrhoea and 0.42% for constipation. In the larger GPRD case-control study (5,477 cases, 38,314 controls), change in bowel habit reached a PPV of 3.9% in men aged 80 and over; values were lower in women and younger patients. Rectal bleeding and change in bowel habit were the two higher-risk symptoms, yet only 27% of patients had reported either: most symptomatic cancers present with a low-risk symptom. <sup class="c" data-ref="Hamilton2005,Hamilton2009" title="Source 217,219">217,219</sup>`,
  pt:`Changes in bowel habit are common and usually come from something like irritable bowel, but they can be a sign of bowel cancer. <sup class="c" data-ref="Monahan2022,Hamilton2009" title="Source 219,375">219,375</sup>`,
  hook:`Rectal bleeding with a change in bowel habit: pooled positive likelihood ratio 1.8. <sup class="c" data-ref="Astin2011" title="Source 25">25</sup>`},
 pain:{n:'Abdominal pain',head:0,ppv:[['Abdominal pain (Exeter)',1.1],['Abdominal tenderness (Exeter)',1.1],['Abdominal pain, pooled',3.3]],
  txt:`In the Exeter study the PPV of abdominal pain was 1.1%, and abdominal tenderness on examination also 1.1%. The systematic review pooled 3.3% (95% CI 0.7–16%). Under 50, abdominal pain is the second most common presenting feature (pooled prevalence 40%). <sup class="c" data-ref="Hamilton2005,Astin2011,Demb2024" title="Source 25,125,217">25,125,217</sup>`,
  pt:`Tummy pain is common, and on its own it is rarely caused by bowel cancer. <sup class="c" data-ref="Hamilton2005" title="Source 217">217</sup>`,
  hook:`Abdominal pain PPV: 1.1% (Exeter), 3.3% pooled. <sup class="c" data-ref="Hamilton2005,Astin2011" title="Source 25,217">25,217</sup>`},
 weight:{n:'Weight loss',head:0,ppv:[['Weight loss (Exeter)',1.2]],
  txt:`In the Exeter study the PPV of weight loss was 1.2%. Rectal bleeding together with weight loss raised the pooled positive likelihood ratio to 1.9. In a Turkish cohort of 1,795 patients, weight loss was associated with a longer symptom time <span class="ev early">Early evidence</span>. <sup class="c" data-ref="Hamilton2005,Astin2011,Ozturk2019" title="Source 25,217,418">25,217,418</sup>`,
  pt:`Losing weight without trying matters more when it comes with bleeding from the bottom. <sup class="c" data-ref="Astin2011" title="Source 25">25</sup>`,
  hook:`Weight loss PPV 1.2%; with rectal bleeding, LR+ 1.9. <sup class="c" data-ref="Hamilton2005,Astin2011" title="Source 25,217">25,217</sup>`},
 anaemia:{n:'Anaemia',head:3,ppv:[['Hb below 10 g/dL (Exeter)',2.3],['Anaemia, pooled',9.7],['Women, Hb <10 + iron deficiency',7.7],['Men over 60, Hb <11 + iron deficiency',13.3]],
  txt:`In the Exeter study, haemoglobin below 10.0 g/dL had a PPV of 2.3%; the systematic review pooled 9.7% for anaemia (95% CI 3.5–27%). Among 6,442 cases in the THIN database, haemoglobin below 9.0 g/dL carried a likelihood ratio of 27 in men and 41 in women. With iron deficiency the PPV was 13.3% in men over 60 with Hb below 11 g/dL and 7.7% in women with Hb below 10 g/dL. Mild anaemia (Hb 10.0–12.9 g/dL) at presentation went with more advanced stage and higher mortality (adjusted HR 1.7). <sup class="c" data-ref="Hamilton2005,Astin2011,Hamilton2008,Stapley2006" title="Source 25,217,218,511">25,217,218,511</sup>`,
  pt:`Feeling tired from low iron (anaemia) can be a sign of bowel cancer, especially in older adults. <sup class="c" data-ref="Hamilton2008" title="Source 218">218</sup>`,
  hook:`Iron-deficiency anaemia, man over 60, Hb below 11 g/dL: PPV 13.3%. <sup class="c" data-ref="Hamilton2008" title="Source 218">218</sup>`},
 exam:{n:'Abnormal rectal examination',head:0,ppv:[['Abnormal rectal exam (Exeter)',4.0]],
  txt:`An abnormal rectal examination had a PPV of 4.0% in the Exeter study, higher than any single symptom it measured. Other signs and tests in the same study: abdominal tenderness 1.1%, haemoglobin below 10.0 g/dL 2.3%, blood glucose above 10 mmol/L 0.78%. <sup class="c" data-ref="Hamilton2005" title="Source 217">217</sup>`,
  pt:`An examination finding predicted cancer better than any single symptom in that study. <sup class="c" data-ref="Hamilton2005" title="Source 217">217</sup>`,
  hook:`Abnormal rectal examination: PPV 4.0% (Exeter). <sup class="c" data-ref="Hamilton2005" title="Source 217">217</sup>`},
 fob:{n:'Positive faecal occult blood',head:0,ppv:[['Positive faecal occult blood (Exeter)',7.1]],
  txt:`A positive faecal occult blood test had a PPV of 7.1% in the Exeter study, higher than any symptom. Today a quantitative faecal immunochemical test (FIT) is used to sort people with symptoms by urgency: follow the pathway below. <sup class="c" data-ref="Hamilton2005,Monahan2022" title="Source 217,375">217,375</sup>`,
  pt:`A stool test can find blood you cannot see. <sup class="c" data-ref="Monahan2022" title="Source 375">375</sup>`,
  hook:`In the NICE FIT study, FIT predicted cancer better than symptoms (area under the ROC curve 0.93). <sup class="c" data-ref="DSouza2021Gut" title="Source 140">140</sup>`}
};
const SY_SIDE={
 right:{n:'Right (proximal) colon',u:[0,.55],txt:`Right-sided tumours: cancers missed by FIT in one UK cohort were right-sided (caecal), mostly in people with iron-deficiency anaemia, so a low FIT result is less reassuring when there is iron-deficiency anaemia <span class="ev early">Early evidence</span>. In a cohort of 1,795 patients, anaemia and a right-colon tumour were each associated with a longer symptom time, although overall symptom duration did not differ by tumour site <span class="ev early">Early evidence</span>. <sup class="c" data-ref="Monahan2022,Ozturk2019" title="Source 375,418">375,418</sup>`},
 left:{n:'Left (distal) colon',u:[.55,.89],txt:`Left-sided tumours: in the same 1,795-patient cohort, the principal presenting symptoms were significantly associated with left colon cancer <span class="ev early">Early evidence</span>. The rise of colorectal cancer in younger adults is dominated by left-sided tumours, which the ACS links to more rectal bleeding in younger patients. <sup class="c" data-ref="Ozturk2019,Siegel2026CRC" title="Source 418,495">418,495</sup>`},
 rectal:{n:'Rectum',u:[.89,1],txt:`Rectal tumours: rectal bleeding as a first symptom was associated with less advanced stage. Rectal cancer had the lowest share of emergency presentations among the cancers studied in six high-income countries (12.1% on average). The guideline suggests flexible sigmoidoscopy for persistent anorectal bleeding even when fHb is below 10 µg Hb/g (weak recommendation). <sup class="c" data-ref="Stapley2006,McPhail2022,Monahan2022" title="Source 357,375,511">357,375,511</sup>`}
};
const SY_FIT={2:{pos:37.2,sens:97.0,ppv:8.7,npv:99.8,x:`Lower thresholds catch more cancers at the cost of more referrals. At the limit of detection (≥2 to ≥7 µg Hb/g), pooled primary-care data gave sensitivity 93.4% and specificity 76.9%. <sup class="c" data-ref="DSouza2021Gut,Monahan2022" title="Source 140,375">140,375</sup>`},
 10:{pos:19.0,sens:90.9,ppv:16.1,npv:99.6,x:`At 10 µg/g, a primary-care meta-analysis (23 studies, 69,536 people) found sensitivity 87.2% and specificity 84.4%. In people with iron-deficiency anaemia, FIT sensitivity was 80.0% against 89.0% with other symptoms <span class="ev early">Early evidence</span>. <sup class="c" data-ref="PinVieito2022,Monahan2022" title="Source 375,433">375,433</sup>`},
 150:{pos:7.6,sens:70.8,ppv:31.1,npv:98.9,x:`At ≥150 µg/g a positive result is much more likely to mean cancer, but more cancers are missed: pooled sensitivity was 64.1% with specificity 95.0%. <sup class="c" data-ref="PinVieito2022" title="Source 433">433</sup>`}};
const SY_STEPS=[
 {from:0,at:.06,k:'Step 1 · primary care',t:'A symptom',
  txt:`Most colorectal cancers are diagnosed after symptoms begin, and most present in primary care <span class="ev est">Established</span>. The ACS names four red flags for public and clinician awareness: rectal bleeding, abdominal pain, diarrhoea and iron-deficiency anaemia. Combinations matter: rectal bleeding with weight loss or with a change in bowel habit had pooled positive likelihood ratios of 1.9 and 1.8, while bleeding with abdominal pain, diarrhoea or constipation had ratios of 1 or less. <sup class="c" data-ref="Hamilton2005,Astin2011,Siegel2026CRC" title="Source 25,217,495">25,217,495</sup>`,
  pt:`Most of the time these symptoms are caused by something less serious, like piles or irritable bowel. That is why a doctor needs to check them. <sup class="c" data-ref="Monahan2022" title="Source 375">375</sup>`,
  hook:`Most symptomatic CRCs present with a low-risk symptom: only 27% had reported rectal bleeding or change in bowel habit. <sup class="c" data-ref="Hamilton2009" title="Source 219">219</sup>`},
 {from:.17,at:.3,k:'Step 2 · FIT in primary care',t:'A FIT stool test',txt:'',
  pt:`A simple poo test called FIT looks for tiny amounts of blood. It helps doctors decide who needs a camera test quickly. <sup class="c" data-ref="Monahan2022" title="Source 375">375</sup>`,
  hook:`NICE FIT study at 10 µg/g: sensitivity 90.9%, NPV 99.6%. UK urgent-referral threshold: fHb ≥10 µg Hb/g. <sup class="c" data-ref="DSouza2021Gut,Monahan2022" title="Source 140,375">140,375</sup>`},
 {from:.4,at:.52,k:'Step 3 · endoscopy',t:'Colonoscopy and biopsy',
  txt:`Colonoscopy examines the bowel and takes biopsies of anything suspicious. The whole colon matters: in a Dutch registry, 3.9% of people with colorectal cancer (534 of 13,683, about 1 in 25) had a second, separate cancer at the same time, and in 34% of those the tumours lay in different surgical segments, so the authors concluded the whole colon should be examined, preferably before surgery. For people with symptoms, the ACPGBI/BSG guideline treats CT colonography as equivalent to colonoscopy for detecting cancer. The procedure step by step: <a href="#colonoscopy" data-go="colonoscopy">Colonoscopy, animated</a>. <sup class="c" data-ref="Mulder2011,Monahan2022" title="Source 375,384">375,384</sup>`,
  pt:`The whole bowel is checked, because about 1 in 25 people with bowel cancer have a second cancer elsewhere in it. <sup class="c" data-ref="Mulder2011" title="Source 384">384</sup>`,
  hook:`Synchronous CRC: 3.9% (about 1 in 25); examine the whole colon, preferably before surgery. <sup class="c" data-ref="Mulder2011" title="Source 384">384</sup>`},
 {from:.6,at:.7,k:'Step 4 · staging',t:'CT and MRI staging',
  txt:`Scans then show how far the cancer has spread. In a meta-analysis, CT detected growth beyond the bowel wall (T3–T4) with sensitivity 90% and specificity 69%, but was less accurate for lymph nodes (71% and 67%). For rectal cancer, high-resolution pelvic MRI in the MERCURY study predicted a clear circumferential resection margin (CRM) with 92% specificity and measured spread beyond the wall to within 0.5 mm of the pathology. ASCO recommends a CEA blood test before surgery if it would help with staging and surgical planning. How the stage is worked out: <a href="#staging" data-go="staging">Staging: TNM calculator</a>. <sup class="c" data-ref="Nerad2016,MERCURY2006,MERCURY2007,Locker2006" title="Source 332,360,361,400">332,360,361,400</sup>`,
  pt:`Scans show how deep the cancer has grown and whether it has spread. For rectal cancer, MRI shows how close it is to the edge the surgeon will cut along. <sup class="c" data-ref="Nerad2016,MERCURY2006" title="Source 360,400">360,400</sup>`,
  hook:`MRI-involved CRM (tumour ≤1 mm from the mesorectal fascia): 5-year OS 42.2% vs 62.2% when clear. <sup class="c" data-ref="Taylor2014" title="Source 523">523</sup>`},
 {from:.8,at:.95,k:'Routes · England 2006–2008',t:'Routes to diagnosis',
  txt:`Of 91,416 colorectal cancers in England, 26% were diagnosed after an emergency presentation, 27% through the urgent 2-week-wait route, 20% through routine GP referral and 2% by screening. One-year relative survival was 50% after emergency presentation, 82% via the 2-week wait and 98% when screen-detected (74% for all routes). These are population statistics; emergency presentation is more likely at older age and advanced stage. <sup class="c" data-ref="EllissBrookes2012,McPhail2022" title="Source 148,357">148,357</sup>`,
  pt:`About 1 in 4 bowel cancers in England were found only after an emergency hospital visit. People found this way did less well. <sup class="c" data-ref="EllissBrookes2012" title="Source 148">148</sup>`,
  hook:`Emergency presentation: 26% of English CRCs; 1-year survival 50% vs 82% via the 2-week wait. <sup class="c" data-ref="EllissBrookes2012" title="Source 148">148</sup>`}
];

inits.symptoms=()=>{
  const T=(x,y,s,c='t-sm',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${s}</text>`;
  const R=(x,y,w,h,st)=>`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(Math.max(0,w))}" height="${f1(Math.max(0,h))}" style="${st}"/>`;
  const Ln=(x1,y1,x2,y2,st)=>`<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" style="${st}"/>`;
  const lines=(x,y,arr,c='t-sm',dy=15,st='')=>arr.map((l,i)=>T(x,y+i*dy,l,c,st)).join('');
  const head=(x,y,s)=>T(x,y,s,'t-sm','fill:var(--brand);font-weight:600');
  const drop=(x,y,r,col)=>`<path d="M${f1(x)} ${f1(y-r*1.6)}Q${f1(x+r)} ${f1(y-r*.3)} ${f1(x+r)} ${f1(y+r*.2)}A${f1(r)} ${f1(r)} 0 0 1 ${f1(x-r)} ${f1(y+r*.2)}Q${f1(x-r)} ${f1(y-r*.3)} ${f1(x)} ${f1(y-r*1.6)}Z" style="fill:${col}"/>`;
  const segPath=(C,u0,u1,col,w,op)=>{let d='';for(let i=0;i<=40;i++){const q=C.at(lerp(u0,u1,i/40));d+=(i?'L':'M')+f1(q[0])+' '+f1(q[1])}return `<path d="${d}" style="fill:none;stroke:${col};stroke-width:${w};stroke-linecap:round;stroke-linejoin:round;opacity:${f1(op)}"/>`};
  /* 1,000 dots, n of them lit */
  function dots(x,y,pitch,n,k,col){let s='';const lit=Math.round(n*k);
    for(let i=0;i<1000;i++){const c=i%50,r=Math.floor(i/50);s+=`<circle cx="${f1(x+c*pitch)}" cy="${f1(y+r*pitch)}" r="${f1(pitch*.34)}" style="fill:${i<lit?col:'var(--line)'}"/>`}return s}

  /* ---------- symptom map ---------- */
  const bs=$('#syBody');let sym='bleed',side=null,bp=1,bStop=null;
  function body(x,y,sc){const P=(a,b)=>f1(x+a*sc)+' '+f1(y+b*sc);
    return `<circle cx="${f1(x+130*sc)}" cy="${f1(y+30*sc)}" r="${f1(24*sc)}" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.4"/>`+
      `<path d="M${P(88,62)}Q${P(58,66)} ${P(50,100)}L${P(30,210)}Q${P(26,224)} ${P(38,224)}L${P(56,140)}L${P(54,206)}Q${P(52,266)} ${P(76,306)}L${P(184,306)}Q${P(208,266)} ${P(206,206)}L${P(204,140)}L${P(222,224)}Q${P(234,224)} ${P(230,210)}L${P(210,100)}Q${P(202,66)} ${P(172,62)}Z" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.4;stroke-linejoin:round"/>`}
  function drawB(){const N=vb(bs,'720 380','400 690'),S=SY_SYM[sym],p=bp;let s='';
    const bx=N?70:20,by=N?16:22,sc=N?1:1.05;
    s+=body(bx,by,sc);
    if(sym==='weight')s+=`<path d="M${f1(bx+100*sc)} ${f1(by+150*sc)}L${f1(bx+96*sc)} ${f1(by+290*sc)}M${f1(bx+160*sc)} ${f1(by+150*sc)}L${f1(bx+164*sc)} ${f1(by+290*sc)}" style="stroke:var(--warn);stroke-width:1.6;stroke-dasharray:5 4;opacity:${f1(p)}"/>`+T(bx+130*sc,by+322*sc,'weight loss','t-xs t-mid','fill:var(--warn)');
    if(sym==='anaemia')s+=`<rect x="${f1(bx)}" y="${f1(by)}" width="${f1(260*sc)}" height="${f1(310*sc)}" style="fill:var(--panel);opacity:${f1(.45*p)}"/>`;
    const C=colon(bx+76*sc,by+150*sc,.36*sc,{w:9*sc});s+=C.svg;
    if(side){const D=SY_SIDE[side];s+=segPath(C,D.u[0],D.u[1],'var(--accent)',13*sc,.85)}
    const an=C.at(1);
    if(sym==='bleed')for(let i=0;i<3;i++){const fy=(p*1.6+i*.33)%1;s+=drop(an[0]+(i-1)*7,an[1]+12+fy*28,3.2,'var(--blood)')}
    if(sym==='habit')s+=segPath(C,.6,.95,'var(--polyp)',6*sc,.4+.5*Math.abs(Math.sin(p*Math.PI*3)));
    if(sym==='pain'){const c=C.at(.42),cx=bx+130*sc,cy=by+205*sc;for(let i=0;i<8;i++){const a=i/8*Math.PI*2,r0=26*sc,r1=r0+12*sc*p;s+=Ln(cx+Math.cos(a)*r0,cy+Math.sin(a)*r0,cx+Math.cos(a)*r1,cy+Math.sin(a)*r1,'stroke:var(--warn);stroke-width:2.2;stroke-linecap:round')}}
    if(sym==='anaemia'){const cx=bx+165*sc,cy=by+100*sc;s+=drop(cx,cy,10*sc,'var(--blood)')+T(cx+16*sc,cy+5,'Hb ↓','t-lbl','fill:var(--blood)')}
    if(sym==='exam'){const q=C.at(.96);s+=`<circle cx="${f1(q[0])}" cy="${f1(q[1])}" r="${f1(5*sc*p+.1)}" style="fill:var(--tumour)"/>`+`<path d="M${f1(q[0]+48*sc)} ${f1(q[1]+30*sc)}L${f1(q[0]+10)} ${f1(q[1]+4)}" style="stroke:var(--ink);stroke-width:1.6" marker-end="url(#syArr)"/>`+T(q[0]+50*sc,q[1]+44*sc,'lump felt','t-xs t-mid','fill:var(--ink)')}
    if(sym==='fob')s+=tube(bx+236*sc,by+250*sc,.9*sc,{fill:p})+drop(bx+236*sc,by+214*sc,5,'var(--blood)');
    if(side)s+=T(bx+130*sc,by+(N?328:350),'Tumour: '+SY_SIDE[side].n,'t-sm t-mid','fill:var(--accent);font-weight:600');
    /* PPV bars */
    const rx=N?20:322,ry=N?370:40,rw=N?250:300,rh=N?26:30;
    s+=head(rx,ry,'PPV IN PRIMARY CARE · '+S.n.toUpperCase());
    S.ppv.forEach(([l,v],i)=>{const y=ry+14+i*rh,k=clamp(p*1.6-i*.15);
      s+=T(rx,y+8,l,'t-xs',i===S.head?'fill:var(--ink);font-weight:700':'');
      s+=R(rx,y+12,rw*v/14*k,10,`fill:var(--tumour);opacity:${i===S.head?1:.5}`);
      if(k>.97)s+=T(rx+rw*v/14+6,y+21,v+'%','t-sm',i===S.head?'fill:var(--tumour);font-weight:600':'')});
    const hv=S.ppv[S.head][1],gy=N?ry+14+5*rh+8:206,gp=N?6.6:7;
    s+=T(rx,gy,`≈ ${Math.round(hv*10)} in 1,000 have colorectal cancer (${hv}%, bold bar)`,'t-xs','fill:var(--ink)');
    s+=dots(rx+3,gy+12,gp,hv*10,ramp(p,.2,1),'var(--tumour)');
    s+=T(rx,gy+12+20*gp+8,`the other ≈ ${1000-Math.round(hv*10)} do not`,'t-xs');
    bs.innerHTML=`<defs>${marker('syArr','var(--ink)')}</defs>`+s;
    let h=noteHTML(Object.assign({k:'Symptom · primary care',t:S.n},S));
    if(side)h+=`<div class="callout"><p>${SY_SIDE[side].txt}</p><p class="stage-cap" style="margin-top:6px">Textbook patterns by side are tendencies, not rules: no source with numbers for the classic “right = anaemia, left = obstruction” teaching was found for this guide.</p></div>`;
    $('#syBodyNote').innerHTML=h}
  function runB(){if(bStop)bStop();bp=0;bStop=animate(1400,q=>{bp=q;drawB()},()=>{bStop=null})}
  $$('[data-sy-sym]').forEach(b=>b.addEventListener('click',()=>{sym=b.dataset.sySym;$$('[data-sy-sym]').forEach(x=>x.setAttribute('aria-pressed',x===b));runB()}));
  $$('[data-sy-side]').forEach(b=>b.addEventListener('click',()=>{side=side===b.dataset.sySide?null:b.dataset.sySide;$$('[data-sy-side]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.sySide===side));drawB()}));
  onHide.symptoms=()=>{if(bStop){bStop();bStop=null;bp=1}};
  drawB();

  /* ---------- the pathway ---------- */
  const svg=$('#sySvg'),rg=$('#syT');let thr=10,setSt=()=>{};
  const KN=[[0,0],[.12,0],[.24,1],[.4,1],[.48,2],[.6,2],[.66,3],[1,3]];
  const posAt=t=>{for(let i=1;i<KN.length;i++)if(t<=KN[i][0]){const a=KN[i-1],b=KN[i];return lerp(a[1],b[1],ease((t-a[0])/(b[0]-a[0])))}return 3};
  const loc=(ph,t)=>{const a=SY_STEPS[ph].from,b=ph<SY_STEPS.length-1?SY_STEPS[ph+1].from:1.04;return clamp((t-a)/((b-a)*.8))};
  function stations(N,pos,ph){let s='';const xs=N?[50,150,250,350]:[90,270,450,630],y=N?44:50,lab=N?['Symptom','FIT','Colonoscopy','Scans']:['Symptom in primary care','FIT stool test','Colonoscopy + biopsy','CT / MRI staging'];
    s+=Ln(xs[0],y,xs[3],y,'stroke:var(--line);stroke-width:4;stroke-linecap:round');
    s+=Ln(xs[0],y,lerp(xs[0],xs[3],pos/3),y,'stroke:var(--brand);stroke-width:4;stroke-linecap:round');
    xs.forEach((x,i)=>{const on=Math.round(pos)===i&&ph<4;s+=`<circle cx="${x}" cy="${y}" r="${N?17:20}" style="fill:var(--panel);stroke:${pos>=i-.02?'var(--brand)':'var(--line)'};stroke-width:${on?3:1.6}"/>`;
      if(i===0)s+=person(x,y-11,22,'var(--muted)');
      if(i===1)s+=tube(x,y+4,.55);
      if(i===2)s+=scope(x+3,y,0);
      if(i===3)s+=`<circle cx="${x}" cy="${y}" r="9" style="fill:none;stroke:var(--accent);stroke-width:3"/><circle cx="${x}" cy="${y}" r="3" style="fill:var(--accent)"/>`;
      s+=T(x,y+(N?32:36),lab[i],'t-xs t-mid',on?'fill:var(--ink);font-weight:600':'')});
    const tx=lerp(xs[0],xs[3],pos/3);if(ph<4)s+=`<circle cx="${f1(tx)}" cy="${y-(N?24:28)}" r="5" style="fill:var(--brand)"/><path d="M${f1(tx-5)} ${y-(N?21:25)}L${f1(tx)} ${y-(N?14:18)}L${f1(tx+5)} ${y-(N?21:25)}Z" style="fill:var(--brand)"/>`;
    return s}
  function p0(N,p){let s='';const y0=N?110:118;
    s+=head(20,y0,'ACS RED FLAGS');
    ['Rectal bleeding','Abdominal pain','Diarrhoea','Iron-deficiency anaemia'].forEach((l,i)=>{const k=clamp(p*3-i*.4);if(k<=0)return;const cx=N?20+(i%2)*186:20,cy=N?y0+14+Math.floor(i/2)*36:y0+14+i*40,w=N?176:200;
      s+=`<g style="opacity:${f1(k)}"><rect x="${cx}" y="${cy}" width="${w}" height="28" rx="14" style="fill:var(--tumour-soft);stroke:var(--tumour)"/>${T(cx+w/2,cy+18,l,'t-sm t-mid','fill:var(--tumour);font-weight:600')}</g>`});
    const lx=N?20:280,ly=N?y0+110:y0,lw=N?250:300,X=v=>lx+lw*v/2.2;
    s+=head(lx,ly,'POOLED LIKELIHOOD RATIO (LR+), RECTAL BLEEDING PLUS…');
    const rows=[['… weight loss',1.9],['… change in bowel habit',1.8],['… pain, diarrhoea or constipation',1]];
    rows.forEach(([l,v],i)=>{const y=ly+18+i*(N?46:52),k=clamp(p*2-.3-i*.2);s+=T(lx,y+10,l,'t-xs','fill:var(--ink)');
      s+=R(lx,y+16,(X(v)-lx)*k,14,`fill:${i<2?'var(--tumour)':'var(--muted)'};opacity:.85`);
      if(k>.97)s+=T(X(v)+6,y+28,i<2?v.toFixed(1):'≤ 1','t-sm',i<2?'fill:var(--tumour);font-weight:600':'')});
    const yb=ly+18+3*(N?46:52);s+=Ln(X(1),ly+20,X(1),yb,'stroke:var(--ink);stroke-dasharray:3 3;opacity:.6')+T(X(1),yb+12,'1 = no change in odds','t-xs t-mid');
    s+=T(N?20:280,N?530:356,'Only 27% of patients reported either higher-risk symptom','t-xs','fill:var(--ink)');
    return s}
  function p1(N,p){let s='';const F=SY_FIT[thr],POS=Math.round(F.pos*10),CA=33,CAUGHT=Math.round(CA*F.sens/100),MISS=CA-CAUGHT;
    const gx=N?22:40,gy=N?122:132,pt=N?7.2:7.4,k=Math.round(p*1000);
    s+=head(gx,gy-14,`1,000 PEOPLE REFERRED · FIT AT ${thr} µg Hb/g`);
    for(let i=0;i<1000;i++){const c=Math.floor(i/20),r=i%20,x=gx+c*pt,y=gy+r*pt;if(i>=k){s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(pt*.3)}" style="fill:var(--line)"/>`;continue}
      const pos=i<POS,ca=i<CAUGHT||(i>=POS&&i<POS+MISS);
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(pt*.36)}" style="fill:${ca?'var(--tumour)':pos?'var(--warn-soft)':'var(--panel-2)'};stroke:${pos?'var(--warn)':'none'};stroke-width:1"/>`}
    const bxp=gx+Math.ceil(POS/20)*pt-pt/2;if(p>.5)s+=Ln(bxp,gy-6,bxp,gy+20*pt-2,'stroke:var(--ink);stroke-width:1.4;stroke-dasharray:3 3')+T(bxp-4,gy+20*pt+12,'← test positive','t-xs t-end','fill:var(--warn)')+T(bxp+4,gy+20*pt+12,'test negative →','t-xs');
    const tx=N?22:430,ty=N?318:132;
    if(p>.6){const L=[[`${POS} test positive (${F.pos}%)`,'var(--warn)'],[`${CAUGHT} of 33 cancers caught`,'var(--tumour)'],[`${MISS} cancer${MISS===1?'':'s'} missed (negative test)`,'var(--ink)'],['',''],[`Published sensitivity ${F.sens}%`,'var(--ink)'],[`Published PPV ${F.ppv}%`,'var(--ink)'],[`Published NPV ${F.npv}%`,'var(--ink)']];
      L.forEach(([l,c],i)=>{if(l)s+=T(tx,ty+i*(N?19:22),l,'t-lbl',`fill:${c}`)});
      s+=lines(tx,ty+7*(N?19:22)+8,['Counts derived: 3.3% prevalence,','published positivity and sensitivity.'],'t-xs',13)}
    return s}
  function p2(N,p){let s='';const cx=N?50:46,cy=N?118:128,sc=N?.98:.8;
    const C=colon(cx,cy,sc,{w:20*sc});s+=C.svg;
    const tu=C.at(.8);s+=`<circle cx="${f1(tu[0])}" cy="${f1(tu[1])}" r="${f1(9*sc)}" style="fill:var(--tumour);stroke:var(--field);stroke-width:1.5"/>`;
    const u=1-p*.97;let d='';for(let i=0;i<=40;i++){const q=C.at(lerp(1,u,i/40));d+=(i?'L':'M')+f1(q[0])+' '+f1(q[1])}
    const an=C.at(1);d='M'+f1(an[0])+' '+f1(an[1]+40)+'L'+d.slice(1);
    s+=`<path d="${d}" style="fill:none;stroke:var(--scope);stroke-width:3.2;stroke-linecap:round;stroke-linejoin:round"/>`;
    const a=C.at(u),b=C.at(Math.max(0,u-.01));s+=scope(a[0],a[1],Math.atan2(b[1]-a[1],b[0]-a[0])*180/Math.PI,{light:true});
    if(u<.82){s+=`<circle cx="${f1(tu[0])}" cy="${f1(tu[1])}" r="${f1(15*sc)}" style="fill:none;stroke:var(--gold);stroke-width:1.6;stroke-dasharray:3 3"/>`+T(tu[0]+18*sc,tu[1]+26*sc,'biopsy','t-sm','fill:var(--gold);font-weight:600')}
    if(p>.95)s+=T(C.at(0)[0]+16,C.at(0)[1]+34,'caecum reached','t-xs','fill:var(--good)');
    const tx=N?22:360,ty=N?405:140,dy=N?17:20;
    if(p>.3)s+=lines(tx,ty,['Second, separate cancer at the same','time: 3.9% (about 1 in 25)','','In 34% of those, the tumours were','in different surgical segments','','For symptoms: CT colonography treated','as equivalent for detecting cancer'],'t-sm',dy,'fill:var(--ink)');
    return s}
  function p3(N,p){let s='';
    const ax=N?20:30,ay=N?110:118,aw=N?360:320;
    s+=head(ax,ay,'CT · COLON CANCER (META-ANALYSIS)');
    [['Beyond the wall (T3–T4)',90,69],['Lymph nodes',71,67]].forEach(([l,se,sp],i)=>{const y=ay+22+i*(N?62:70),k=clamp(p*2-i*.3);
      s+=T(ax,y,l,'t-lbl');
      s+=R(ax,y+8,aw*.62*se/100*k,12,'fill:var(--accent)')+R(ax,y+24,aw*.62*sp/100*k,12,'fill:var(--accent);opacity:.45');
      if(k>.97)s+=T(ax+aw*.62*se/100+6,y+18,'sensitivity '+se+'%','t-xs','fill:var(--ink)')+T(ax+aw*.62*sp/100+6,y+34,'specificity '+sp+'%','t-xs')});
    const mx=N?110:500,my=N?400:236,R0=N?62:72,k=ease(clamp(p*1.6-.2));
    s+=head(N?20:390,N?262:118,'PELVIC MRI · RECTAL CANCER (MERCURY)');
    s+=`<circle cx="${mx}" cy="${my}" r="${R0}" style="fill:var(--fat);opacity:.7;stroke:var(--accent);stroke-width:1.8;stroke-dasharray:6 4"/>`;
    s+=`<circle cx="${mx}" cy="${my}" r="${R0*.48}" style="fill:var(--mucosa);stroke:var(--mucosa-line);stroke-width:2"/><circle cx="${mx}" cy="${my}" r="${R0*.2}" style="fill:var(--field)"/>`;
    const ang=-.9,tr=R0*(.48+.36*k);s+=`<path d="M${f1(mx+Math.cos(ang-.6)*R0*.3)} ${f1(my+Math.sin(ang-.6)*R0*.3)}Q${f1(mx+Math.cos(ang)*tr*1.1)} ${f1(my+Math.sin(ang)*tr*1.1)} ${f1(mx+Math.cos(ang+.6)*R0*.3)} ${f1(my+Math.sin(ang+.6)*R0*.3)}Z" style="fill:var(--tumour);opacity:.9"/>`;
    if(k>.95){const ex=mx+Math.cos(ang)*tr,ey=my+Math.sin(ang)*tr,fx=mx+Math.cos(ang)*R0,fy=my+Math.sin(ang)*R0;s+=Ln(ex,ey,fx,fy,'stroke:var(--ink);stroke-width:1.6')+T(fx+8,fy-4,'CRM','t-sm','fill:var(--ink);font-weight:600')}
    s+=T(mx,my+R0+16,'mesorectal fascia (dashed)','t-xs t-mid');
    const tx=N?190:590,ty=N?330:150;
    if(p>.55)s+=lines(tx,ty,N?['Clear-margin','prediction:','specificity 92%','','Spread beyond','the wall: within','0.5 mm of','pathology','','Involved CRM','= tumour ≤1 mm','from the fascia']:['Clear-margin','prediction:','specificity 92%','','Depth beyond','the wall: within','0.5 mm of','pathology','','Involved CRM:','≤1 mm from','the fascia'],'t-xs',14,'fill:var(--ink)');
    return s}
  function p4(N,p){let s='';const rows=[['Emergency',26,50],['Two-week wait',27,82],['GP referral',20,null],['Screen-detected',2,98]];
    const y0=N?120:122;s+=head(20,y0-4,'ROUTES TO DIAGNOSIS · ENGLAND 2006–2008');
    const sx=N?20:190,sw=N?170:230,vx=N?220:480,vw=N?160:210,dy=N?92:48,rt=N?y0+30:y0+26;
    s+=T(sx,rt,'share of cancers','t-xs')+T(vx,rt,'1-year relative survival','t-xs');
    rows.forEach(([l,sh,sv],i)=>{const y=(N?y0+56:y0+46)+i*dy,k=clamp(p*2.2-i*.25);
      if(N)s+=T(20,y-6,l,'t-lbl',i===0?'fill:var(--tumour)':'');else s+=T(sx-12,y+12,l,'t-lbl t-end',i===0?'fill:var(--tumour)':'');
      s+=R(sx,y,sw*sh/30*k,18,`fill:${i===0?'var(--tumour)':'var(--muted)'};opacity:.85`);if(k>.97)s+=T(sx+sw*sh/30+6,y+14,sh+'%','t-sm','fill:var(--ink)');
      s+=Ln(vx,y+9,vx+vw,y+9,'stroke:var(--line)');
      if(sv!=null){const cx=vx+vw*sv/100*k;s+=`<circle cx="${f1(cx)}" cy="${y+9}" r="7" style="fill:${i===0?'var(--tumour)':i===3?'var(--good)':'var(--accent)'}"/>`;if(k>.97)s+=T(cx,y-3,sv+'%','t-sm t-mid','fill:var(--ink);font-weight:600')}
      else if(k>.97)s+=T(vx+vw/2,y+13,'not reported here','t-xs t-mid')});
    const fy=(N?y0+56:y0+46)+4*dy+(N?-10:6);s+=T(20,fy,'All routes: 1-year relative survival 74%','t-sm','fill:var(--ink)');
    return s}
  const PS=[p0,p1,p2,p3,p4];
  function note(ph){const S=SY_STEPS[ph];if(ph!==1)return S;const F=SY_FIT[thr];
    return Object.assign({},S,{txt:`A faecal immunochemical test (FIT) measures haemoglobin in a stool sample (µg Hb/g faeces). In the NICE FIT study, 9,822 people referred on the urgent 2-week-wait pathway gave a sample and 3.3% had colorectal cancer. At ${thr} µg/g, ${F.pos}% tested positive; sensitivity was ${F.sens}%, PPV ${F.ppv}% and NPV ${F.npv}%. FIT predicted cancer better than symptoms (area under the ROC curve 0.93). The ACPGBI/BSG guideline recommends fHb ≥10 µg Hb/g to select people with lower GI symptoms for urgent referral, and that nobody be excluded from referral on FIT alone: persistent unexplained symptoms with ongoing GP concern still warrant referral. <sup class="c" data-ref="DSouza2021Gut,Monahan2022" title="Source 140,375">140,375</sup> ${F.x}`})}
  function draw(t){const N=vb(svg,'720 380','400 560'),ph=phaseOf(SY_STEPS,t),p=loc(ph,t);
    svg.innerHTML=stations(N,posAt(t),ph)+PS[ph](N,ph===4?p:ease(p));
    setSt(ph);$('#syNote').innerHTML=noteHTML(note(ph));
    const F=SY_FIT[thr];
    $('#syRead').innerHTML=[`<span>red flags <b>bleeding · pain · diarrhoea · IDA</b></span>`,`<span>FIT <b>${thr} µg/g</b></span><span>positive <b>${F.pos}%</b></span><span>sensitivity <b>${F.sens}%</b></span><span>PPV <b>${F.ppv}%</b></span><span>NPV <b>${F.npv}%</b></span>`,
      `<span>synchronous cancer <b>3.9%</b></span>`,`<span>CT T3–T4 sens/spec <b>90/69%</b></span><span>MRI clear-CRM spec <b>92%</b></span>`,`<span>emergency <b>26%</b> · 1-yr survival <b>50%</b></span><span>2-week wait <b>82%</b></span><span>screen-detected <b>98%</b></span>`][ph]}
  const stop=playWire(rg,$('#syPlay'),draw,26000,'Replay','symptoms');
  setSt=stepWire($('#sySteps'),SY_STEPS,rg,draw,stop);
  $$('[data-sy-fit]').forEach(b=>b.addEventListener('click',()=>{thr=+b.dataset.syFit;$$('[data-sy-fit]').forEach(x=>x.setAttribute('aria-pressed',x===b));
    const t=+rg.value;if(phaseOf(SY_STEPS,t)!==1){stop();rg.value=SY_STEPS[1].at}draw(+rg.value)}));
  draw(+rg.value);

  /* ---------- early onset ---------- */
  const es=$('#syEo');let rf=1,ep=1,eStop=null;const OR={1:1.94,2:3.59,3:6.52};
  function drawE(){const N=vb(es,'720 270','400 580');let s='';const p=ep;
    const A={x:N?20:20,y:N?24:30,w:N?250:150},B={x:N?20:262,y:N?200:30,w:N?340:200},Cc={x:N?20:510,y:N?412:30,w:N?280:150};
    s+=head(A.x,A.y,N?'PRESENTING FEATURES UNDER 50 (POOLED)':'FEATURES UNDER 50');
    [['Visible blood (haematochezia)',45],['Abdominal pain',40],['Altered bowel habit',27]].forEach(([l,v],i)=>{const y=A.y+20+i*(N?42:58),k=clamp(p*2-i*.2);
      s+=T(A.x,y+8,l,'t-xs','fill:var(--ink)')+R(A.x,y+14,A.w*v/50*k,14,'fill:var(--tumour);opacity:.85');if(k>.97)s+=T(A.x+A.w*v/50+6,y+26,v+'%','t-sm','fill:var(--ink)')});
    if(!N)s+=T(A.x,A.y+200,'81 studies, pooled prevalence','t-xs');
    s+=head(B.x,B.y,'MONTHS FROM SYMPTOM TO DIAGNOSIS');
    const X=m=>B.x+B.w*m/14,by=B.y+(N?30:40);
    [0,4,8,12].forEach(m=>s+=Ln(X(m),by,X(m),by+(N?120:170),'stroke:var(--line);stroke-dasharray:2 4')+T(X(m),by+(N?132:184),m,'t-xs t-mid'));
    [['Mean 6.4 (23 studies)',6.4,1.8,13.7],['Median 4 (16 studies)',4,2,8.7],['Median interval, US study',8.7,null,null]].forEach(([l,v,lo,hi],i)=>{const y=by+10+i*(N?38:52),k=ease(clamp(p*2-i*.25));
      s+=T(B.x,y,l,'t-xs','fill:var(--ink)')+R(B.x,y+6,(X(v)-B.x)*k,12,`fill:${i<2?'var(--warn)':'var(--accent)'};opacity:.85`);
      if(k>.97&&lo!=null)s+=Ln(X(lo),y+12,X(hi),y+12,'stroke:var(--ink);stroke-width:1.3')+Ln(X(lo),y+7,X(lo),y+17,'stroke:var(--ink)')+Ln(X(hi),y+7,X(hi),y+17,'stroke:var(--ink)')});
    s+=T(B.x+B.w,by+(N?146:198),'months; whiskers = range of study values','t-xs t-end');
    s+=head(Cc.x,Cc.y,N?'ODDS OF EARLY-ONSET CRC BY NUMBER OF RED FLAGS':'ODDS BY RED-FLAG COUNT');
    const H=N?100:150,bb=Cc.y+30+H,V=v=>bb-H*v/7,bw=N?60:36;
    s+=Ln(Cc.x,V(1),Cc.x+Cc.w,V(1),'stroke:var(--ink);stroke-dasharray:3 3;opacity:.6')+T(Cc.x+Cc.w,V(1)-4,'OR 1','t-xs t-end');
    [1,2,3].forEach((n,i)=>{const cx=Cc.x+(N?40:24)+i*(N?90:52),on=n===rf,k=on?ease(p):1,v=1+(OR[n]-1)*k;
      s+=R(cx-bw/2,V(v),bw,bb-V(v),`fill:var(--tumour);opacity:${on?1:.3}`)+T(cx,bb+14,n===3?'3+':n,'t-sm t-mid',on?'fill:var(--ink);font-weight:600':'');
      s+=T(cx,V(v)-6,OR[n].toFixed(2),'t-sm t-mid',on?'fill:var(--tumour);font-weight:600':'')});
    s+=N?T(Cc.x,bb+30,'red flags 3 months–2 years before diagnosis','t-xs'):lines(Cc.x,bb+30,['red flags, 3 months to','2 years before diagnosis'],'t-xs',12);
    es.innerHTML=s;
    $('#syEoCap').innerHTML=`With ${rf===3?'3 or more red flags':rf+' red flag'+(rf>1?'s':'')}, the odds of early-onset colorectal cancer were ${OR[rf]} times those with none (US case-control study, 5,075 cases). About 19.3% had their first sign 3 months to 2 years before diagnosis; the median diagnostic interval was 8.7 months. In a meta-analysis of 81 studies, visible blood carried at least a 5-fold risk (estimates 5.2–54.0) and time from symptom to diagnosis averaged 6.4 months. <sup class="c" data-ref="Fritz2023,Demb2024" title="Source 125,190">125,190</sup>`}
  $$('[data-sy-rf]').forEach(b=>b.addEventListener('click',()=>{rf=+b.dataset.syRf;$$('[data-sy-rf]').forEach(x=>x.setAttribute('aria-pressed',x===b));if(eStop)eStop();ep=0;eStop=animate(900,q=>{ep=q;drawE()},()=>{eStop=null})}));
  const prevH=onHide.symptoms;onHide.symptoms=()=>{prevH&&prevH();if(eStop){eStop();eStop=null;ep=1}};
  const prevR=redraws.symptoms;redraws.symptoms=()=>{prevR&&prevR();drawB();drawE()};
  drawE();
};
/* =============== 3.2 Staging: TNM calculator =============== */
const ST_T=['Tis','T1','T2','T3','T4a','T4b'];
const ST_N=['N0','N1a','N1b','N1c','N2a','N2b'];
const ST_M=['M0','M1a','M1b','M1c'];
/* AJCC 8th edition stage groups: the research pass's machine-readable table, evaluated in order; M overrides T and N */
const ST_ROWS=[['0','Tis','N0','M0'],['I','T1|T2','N0','M0'],['IIA','T3','N0','M0'],['IIB','T4a','N0','M0'],['IIC','T4b','N0','M0'],
 ['IIIA','T1|T2','N1a|N1b|N1c','M0'],['IIIA','T1','N2a','M0'],['IIIB','T3|T4a','N1a|N1b|N1c','M0'],['IIIB','T2|T3','N2a','M0'],['IIIB','T1|T2','N2b','M0'],
 ['IIIC','T4a','N2a','M0'],['IIIC','T3|T4a','N2b','M0'],['IIIC','T4b','N1a|N1b|N1c|N2a|N2b','M0'],
 ['IVA','any','any','M1a'],['IVB','any','any','M1b'],['IVC','any','any','M1c']];
function stStage(T,N,M){const ok=(p,v)=>p==='any'||p.split('|').includes(v);for(const r of ST_ROWS)if(ok(r[1],T)&&ok(r[2],N)&&ok(r[3],M))return r[0];return null}
const ST_LADDER=['0','I','IIA','IIB','IIC','IIIA','IIIB','IIIC','IVA','IVB','IVC'];
const stGrp=s=>s==null?-1:s==='0'?0:s==='I'?1:s.startsWith('IV')?4:s.startsWith('III')?3:2;
const ST_GC=['var(--good)','var(--good)','var(--warn)','var(--lymph)','var(--tumour)'];
const ST_GS=['var(--good-soft)','var(--good-soft)','var(--warn-soft)','var(--lymph-soft)','var(--tumour-soft)'];
const stCol=s=>stGrp(s)<0?'var(--muted)':ST_GC[stGrp(s)], stSoft=s=>stGrp(s)<0?'var(--panel-2)':ST_GS[stGrp(s)];
const ST_TD={Tis:'carcinoma in situ or intramucosal carcinoma: limited to the epithelium or lamina propria',T1:'invades the submucosa',T2:'invades the muscularis propria',T3:'grows through the muscularis propria into pericolorectal tissues',T4a:'penetrates the visceral peritoneum',T4b:'directly invades or adheres to other organs or structures'};
const ST_ND={N0:'no regional lymph-node metastasis and no tumour deposits',N1a:'metastasis in 1 regional lymph node',N1b:'metastasis in 2–3 regional lymph nodes',N1c:'no positive nodes, but tumour deposits in the subserosa, mesentery or non-peritonealised pericolic or perirectal tissue',N2a:'metastasis in 4–6 regional lymph nodes',N2b:'metastasis in 7 or more regional lymph nodes'};
const ST_MD={M0:'no distant metastasis',M1a:'metastasis confined to one organ or site (for example liver, lung, ovary or a non-regional node), without peritoneal metastasis',M1b:'metastasis to two or more organs or sites, without peritoneal metastasis',M1c:'metastasis to the peritoneal surface, alone or with other sites'};
/* 5-year overall survival by 8th-edition stage in one single-centre cohort (n=1,090); IVB and IVC groups were very small */
const ST_TONG={'0':100,I:98.5,IIA:82.6,IIB:76.8,IIC:67.7,IIIA:65.4,IIIB:60,IIIC:44.9,IVA:8.3};
const ST_STEPS=[
 {from:0,at:.06,k:'T · primary tumour',t:'Tis: in situ',
  txt:`Every colorectal cancer starts in the mucosa, the lining layer. Tis is carcinoma in situ or intramucosal carcinoma: tumour limited to the epithelium or invading the lamina propria, without extension through the muscularis mucosae. With N0 M0 this is stage 0. <sup class="c" data-ref="Amin2017AJCC,Tong2018" title="Source 10,537">10,537</sup>`,
  pt:`The cancer cells are still only in the inner lining of the bowel.`,
  hook:`T is about depth, not size. The layers in order: mucosa, submucosa, muscularis propria, subserosa, serosa.`},
 {from:.1,at:.17,k:'T · primary tumour',t:'T1: submucosa',
  txt:`T1 tumours break through the muscularis mucosae into the submucosa but not into the muscularis propria. The submucosa holds lymphatics and vessels, which is why depth starts to matter here: in pT1 cancers, tumour budding at the invasive front independently predicts lymph-node metastasis. T1 N0 M0 is stage I. <sup class="c" data-ref="Amin2017AJCC,Tong2018,Lugli2017" title="Source 10,342,537">10,342,537</sup>`,
  pt:`The tumour has reached the second layer, which has small blood and lymph vessels.`,
  hook:`T1 = submucosa. A tumour bud = 1–4 tumour cells at the invasive front.`},
 {from:.2,at:.27,k:'T · primary tumour',t:'T2: muscle layer',
  txt:`T2 tumours invade the muscularis propria, the thick muscle coat that moves bowel contents along. T2 N0 M0 is still stage I. Stage I colon cancer had 93.2% 5-year survival in SEER under the 6th edition (population figure, diagnoses 1991–2000). <sup class="c" data-ref="Amin2017AJCC,Tong2018,OConnell2004" title="Source 10,412,537">10,412,537</sup>`,
  pt:`The tumour is in the muscle of the bowel wall but has not gone through it.`,
  hook:`T1–T2 N0 M0 = stage I.`},
 {from:.3,at:.37,k:'T · primary tumour',t:'T3: through the wall',
  txt:`T3 tumours grow through the muscularis propria into the pericolorectal tissues (the subserosa and fat around the bowel). T3 N0 M0 is stage IIA. CT detects growth beyond the wall (T3–T4) with pooled sensitivity 90% and specificity 69%. <sup class="c" data-ref="Amin2017AJCC,Tong2018,Nerad2016" title="Source 10,400,537">10,400,537</sup>`,
  pt:`The tumour has grown all the way through the muscle into the fatty tissue around the bowel.`,
  hook:`T3 N0 M0 = IIA; T4a N0 = IIB; T4b N0 = IIC.`},
 {from:.4,at:.47,k:'T · primary tumour',t:'T4a: serosa',
  txt:`T4a tumours penetrate the visceral peritoneum, the serosa that covers the bowel. The AJCC also counts gross perforation through tumour, and continuous invasion through inflammation to the peritoneal surface, as T4a. T4a N0 M0 is stage IIB. ASCO 2022: people with T4 tumours are at higher risk of recurrence and should be offered adjuvant chemotherapy. <sup class="c" data-ref="Amin2017AJCC,Tong2018,Baxter2022" title="Source 10,48,537">10,48,537</sup>`,
  pt:`The tumour has broken through the bowel's thin outer covering.`,
  hook:`T4a = visceral peritoneum (serosa). T4 is the strongest high-risk feature in stage II.`},
 {from:.5,at:.57,k:'T · primary tumour',t:'T4b: other organ',
  txt:`T4b tumours directly invade or stick to other organs or structures. T4b N0 M0 is stage IIC. T categories did not change between the 7th and 8th editions; the SEER and NCDB data behind them showed that T4a does better than T4b within each N category. <sup class="c" data-ref="Amin2017AJCC,Tong2018,Gunderson2010" title="Source 10,206,537">10,206,537</sup>`,
  pt:`The tumour has grown into a neighbouring organ, such as another loop of bowel.`,
  hook:`T4b = adjacent organ. T4b with any positive node is IIIC.`},
 {from:.6,at:.705,k:'N · regional nodes',t:'N1: 1–3 nodes or deposits',
  txt:`Tumour cells travel along lymph vessels to the regional nodes. N1a is 1 positive node, N1b is 2–3. N1c means no positive node but tumour deposits: nodules of tumour in the subserosa, mesentery or pericolic fat with no node structure. Deposits never change T, and once any node is positive they are not added to the count. <sup class="c" data-ref="Amin2017AJCC,Tong2018" title="Source 10,537">10,537</sup>`,
  pt:`Lymph nodes are small filters along the bowel's drainage. Here 1 to 3 of them contain cancer, or there are cancer nodules in the nearby fat.`,
  hook:`N1a = 1 node; N1b = 2–3; N1c = deposits with no positive nodes.`},
 {from:.72,at:.81,k:'N · regional nodes',t:'N2: 4 or more nodes',
  txt:`N2a is 4–6 positive nodes; N2b is 7 or more. The pathologist should examine at least 12 nodes: in a 17-study review, 16 found that survival in stage II rose with the number of nodes evaluated. Any positive node with M0 makes the cancer stage III, and the exact substage depends on T. <sup class="c" data-ref="Amin2017AJCC,Tong2018,Chang2007,Baxter2022" title="Source 10,48,97,537">10,48,97,537</sup>`,
  pt:`Four or more lymph nodes contain cancer. Checking at least 12 nodes makes sure none is missed.`,
  hook:`N2a = 4–6; N2b = 7 or more. Look for ≥12 nodes.`},
 {from:.84,at:.99,k:'M · distant spread',t:'M1: distant organs',
  txt:`M1a is spread to one organ or site (such as the liver, lung, ovary or a non-regional node) without peritoneum; M1b is two or more organs; M1c is the peritoneal surface, alone or with other sites. M1c and stage IVC were the main change in the 8th edition: in the 7th, peritoneal disease sat in M1b. Any M1 is stage IV, whatever T and N. <sup class="c" data-ref="Amin2017AJCC,Tong2018,Weiser2018" title="Source 10,537,576">10,537,576</sup>`,
  pt:`The cancer has spread through the blood or across the belly lining to places far from the bowel.`,
  hook:`M1a = one organ; M1b = two or more; M1c = peritoneum (new in the 8th edition, stage IVC).`}
];
/* the animation's own state at time t: T index and growth, N category and positive-node count, deposits, M category */
function stState(t){
  const ti=t<.6?Math.min(5,Math.floor(t/.1)):5,tg=t<.6?ease(ramp(t-ti*.1,0,.07)):1;
  let N='N0',kf=0,dep=0;
  const sub=(a,b,lo,hi)=>lerp(lo-1,hi,ramp(t,a,a+(b-a)*.75));
  if(t>=.6&&t<.64){N='N1a';kf=sub(.6,.64,1,1)}
  else if(t>=.64&&t<.68){N='N1b';kf=sub(.64,.68,2,3)}
  else if(t>=.68&&t<.72){N='N1c';kf=0;dep=ramp(t,.68,.695)}
  else if(t>=.72&&t<.78){N='N2a';kf=sub(.72,.78,4,6);dep=1}
  else if(t>=.78){N='N2b';kf=sub(.78,.84,7,9);dep=1}
  const lo={N0:0,N1a:1,N1b:2,N1c:0,N2a:4,N2b:7}[N],hi={N0:0,N1a:1,N1b:3,N1c:0,N2a:6,N2b:9}[N];
  const k=clamp(Math.ceil(kf-.001),lo,hi);
  const M=t<.84?'M0':t<.89?'M1a':t<.94?'M1b':'M1c';
  return {ti,tg,T:ST_T[ti],N,kf,k,dep,M,liv:ramp(t,.845,.875),lun:ramp(t,.895,.925),per:ramp(t,.945,.98)}}
function stLung(x,y,s,mets){let g=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})"><path d="M0 -40V-14M0 -14L-8 -6M0 -14L8 -6" style="fill:none;stroke:var(--mucosa-line);stroke-width:3;stroke-linecap:round"/>`;
  g+=`<path d="M-8 -8C-26 -16 -42 6 -40 28C-38 42 -20 44 -10 36C-5 30 -5 6 -8 -8Z" style="fill:var(--mucosa);opacity:.75;stroke:var(--mucosa-line);stroke-width:1.5"/><path d="M8 -8C26 -16 42 6 40 28C38 42 20 44 10 36C5 30 5 6 8 -8Z" style="fill:var(--mucosa);opacity:.75;stroke:var(--mucosa-line);stroke-width:1.5"/>`;
  [[-24,8],[22,18],[-18,28]].slice(0,mets).forEach(([a,b])=>g+=`<circle cx="${a}" cy="${b}" r="5" style="fill:var(--cell);stroke:var(--tumour);stroke-width:2"/>`);
  return g+'</g>'}
function stPerit(x,y,s,seed){let g=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})"><path d="M-36 -24Q-40 10 -14 30Q10 44 34 24Q44 4 34 -24" style="fill:var(--fat);opacity:.6;stroke:var(--serosa);stroke-width:3"/><path d="M-18 -6q6 -10 12 0t12 0t12 0M-20 12q6 -10 12 0t12 0t12 0" style="fill:none;stroke:var(--mucosa-line);stroke-width:4;stroke-linecap:round;opacity:.6"/>`;
  const pts=[[-34,-10],[-30,16],[-12,30],[10,36],[30,20],[36,-4],[-36,4]];
  pts.slice(0,Math.round(seed*pts.length)).forEach(([a,b])=>g+=`<circle cx="${a}" cy="${b}" r="3.6" style="fill:var(--tumour)"/>`);
  return g+'</g>'}
function stTumour(cx,y0,D,hw,bh){const rr=rng(11),pts=[];
  for(let i=0;i<=16;i++){const a=Math.PI+i/16*Math.PI,j=1+(rr()-.5)*.14;pts.push([cx+Math.cos(a)*hw*1.04*j,y0+Math.sin(a)*bh*j])}
  const dep=Math.max(4,D-y0),n=12;
  for(let i=1;i<=n;i++){const u=i/n,w=hw*(1-.55*u)*(1+(rr()-.5)*.3);pts.push([cx+w,y0+dep*u])}
  for(let i=n;i>=1;i--){const u=i/n,w=hw*(1-.55*u)*(1+(rr()-.5)*.3);pts.push([cx-w,y0+dep*u])}
  let s=`<path d="M${pts.map(p=>f1(p[0])+' '+f1(p[1])).join('L')}Z" style="fill:var(--tumour);opacity:.9;stroke:var(--tumour);stroke-width:1.5;stroke-linejoin:round"/>`;
  for(let i=0;i<9;i++){const u=rr(),px=cx+(rr()-.5)*hw*(1-.5*u)*1.2,py=y0-bh*.6+(dep+bh*.6)*u;s+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="2.2" style="fill:var(--cell);opacity:.55"/>`}
  return s}
inits.staging=()=>{
  const svg=$('#stSvg'),rg=$('#stT');let setSt=()=>{};
  function draw(t){
    const Nn=vb(svg,'720 380','400 560'),S=stState(t);
    const L=Nn?{wx:14,wy:60,ww:196,wh:172,lx:218,dh:[14,282],liv:[60,322,.5],lun:[180,322,.62],per:[310,322,.62],dl:362,nh:[14,384],tr:[30,386,430],nx:[92,50],ny:[408,452],nr:9,dep:[50,430],vx:6,sy:486,sc:[14,62,494,54]}
                :{wx:20,wy:62,ww:230,wh:210,lx:258,dh:[440,40],liv:[486,92,.62],lun:[592,92,.7],per:[672,92,.72],dl:146,nh:[440,176],tr:[432,708,222],nx:[488,40],ny:[198,246],nr:10,dep:[446,222],vx:420,sy:318,sc:[20,115,326,46]};
    const W=wall(L.wx,L.wy,L.ww,{h:L.wh,labels:false}),Y=W.y;let s=W.svg;
    /* layer labels with the T letter each layer defines */
    const lab=[['Mucosa · Tis',(Y.mucosa+Y.submucosa)/2,0],['Submucosa · T1',(Y.submucosa+Y.muscularis)/2,1],['Muscularis propria · T2',(Y.muscularis+Y.subserosa)/2,2],['Subserosa · T3',(Y.subserosa+Y.serosa)/2,3],['Serosa · T4a',(Y.serosa+Y.fat)/2+5,4],['Beyond the serosa',Y.fat+(Y.bottom-Y.fat)*.42,-1]];
    lab.forEach(([n,y,i])=>s+=`<text x="${L.lx}" y="${f1(y+4)}" class="t-sm" style="${i===S.ti?'fill:var(--tumour);font-weight:700':''}">${n}</text>`);
    /* adjacent organ for T4b */
    const oy=Y.bottom+6,oh=Nn?24:26,orgHit=S.ti===5?S.tg:0;
    s+=`<rect x="${L.wx+8}" y="${f1(oy)}" width="${L.ww-16}" height="${oh}" rx="12" style="fill:var(--mucosa);opacity:${f1(.3+.25*orgHit)};stroke:${orgHit>0?'var(--tumour)':'var(--mucosa-line)'};stroke-width:${orgHit>0?2:1}"/>`;
    s+=`<text x="${L.lx}" y="${f1(oy+oh/2+4)}" class="t-sm" style="${S.ti===5?'fill:var(--tumour);font-weight:700':''}">Other organ · T4b</text>`;
    /* tumour depth by T */
    const mid=(a,b,f)=>a+(b-a)*f;
    const DEP=[mid(Y.mucosa,Y.submucosa,.72),mid(Y.submucosa,Y.muscularis,.62),mid(Y.muscularis,Y.subserosa,.66),mid(Y.subserosa,Y.serosa,.8),mid(Y.fat,Y.bottom,.4),oy+oh*.55];
    const D=S.ti===0?lerp(Y.mucosa+3,DEP[0],S.tg):lerp(DEP[S.ti-1],DEP[S.ti],S.tg);
    const cx=L.wx+L.ww*.4,hw=L.ww*(.08+.017*(S.ti+S.tg)),bh=6+2.6*(S.ti+S.tg);
    s+=stTumour(cx,Y.mucosa,D,hw,bh);
    if(S.ti>=1)[[-.28,6],[.3,4],[.05,9]].forEach(([a,b])=>s+=`<circle cx="${f1(cx+a*hw)}" cy="${f1(D+b)}" r="2.4" style="fill:var(--tumour);opacity:${f1(.8*(D<Y.fat?1:.4))}"/>`);
    if(S.ti>=4){const by=Y.serosa+2;s+=`<path d="M${f1(cx-hw*.7)} ${f1(by)}L${f1(cx-hw*.95)} ${f1(by-6)}M${f1(cx+hw*.7)} ${f1(by)}L${f1(cx+hw*.95)} ${f1(by-6)}" style="stroke:var(--gold);stroke-width:2;stroke-linecap:round"/>`}
    /* header readout */
    const st=stStage(S.T,S.N,S.M);
    s+=`<text x="${L.wx}" y="28" class="t-big" style="font-variant-numeric:lining-nums"><tspan style="fill:${S.ti<6&&t<.6?'var(--tumour)':'var(--ink)'}">${S.T}</tspan> <tspan style="fill:${S.N!=='N0'?'var(--lymph)':'var(--ink)'}">${S.N}</tspan> <tspan style="fill:${S.M!=='M0'?'var(--tumour)':'var(--ink)'}">${S.M}</tspan><tspan style="fill:var(--muted)"> → </tspan><tspan style="fill:${stCol(st)}">Stage ${st}</tspan></text>`;
    /* distant sites */
    s+=`<text x="${L.dh[0]}" y="${L.dh[1]}" class="t-sm" style="${S.M!=='M0'?'fill:var(--tumour);font-weight:700':''}">DISTANT SITES · ${S.M}</text>`;
    s+=liver(L.liv[0],L.liv[1],L.liv[2],Math.round(S.liv*4),4);
    s+=stLung(L.lun[0],L.lun[1],L.lun[2],Math.round(S.lun*3));
    s+=stPerit(L.per[0],L.per[1],L.per[2],S.per);
    [['Liver',L.liv[0],S.liv],['Lung',L.lun[0],S.lun],['Peritoneum',L.per[0],S.per]].forEach(([n,x,v])=>s+=`<text x="${x}" y="${L.dl}" class="t-xs t-mid" style="${v>0?'fill:var(--tumour);font-weight:700':''}">${n}</text>`);
    /* a travelling tumour cell toward the organ being seeded */
    const fly=(p,tx,ty)=>{if(p<=0||p>=1)return'';const sx=cx,sy=Y.muscularis,qx=(sx+tx)/2,qy=Math.min(sy,ty)-40,x=(1-p)*(1-p)*sx+2*(1-p)*p*qx+p*p*tx,y=(1-p)*(1-p)*sy+2*(1-p)*p*qy+p*p*ty;return `<circle cx="${f1(x)}" cy="${f1(y)}" r="4" style="fill:var(--tumour);stroke:var(--panel);stroke-width:1.2"/>`};
    s+=fly(ramp(t,.84,.86),L.liv[0],L.liv[1])+fly(ramp(t,.89,.91),L.lun[0],L.lun[1])+fly(ramp(t,.94,.96),L.per[0],L.per[1]);
    /* regional nodes: a lymph vessel from the tumour to a trunk with 12 nodes */
    const vy=Y.fat+(Y.bottom-Y.fat)*.78,[t0,t1,ty]=L.tr;
    const vpath=Nn?`M${f1(cx)} ${f1(D)}L${f1(cx)} ${f1(vy)}H${L.vx}V${ty}H${t1}`:`M${f1(cx)} ${f1(D)}L${f1(cx)} ${f1(vy)}H${L.vx}V${ty}H${t1}`;
    s+=`<path d="${vpath}" style="fill:none;stroke:var(--lymph);stroke-width:1.6;opacity:${t>=.58?.8:.3};stroke-dasharray:${t>=.58?'0':'3 3'}"/>`;
    s+=`<text x="${L.nh[0]}" y="${L.nh[1]}" class="t-sm" style="${S.N!=='N0'?'fill:var(--lymph);font-weight:700':''}">REGIONAL NODES · ${S.k} of 12 positive</text>`;
    for(let i=0;i<12;i++){const col=i%6,row=Math.floor(i/6),x=L.nx[0]+col*L.nx[1],y=L.ny[row],ord=col*2+row,fill=clamp(S.kf-ord);
      s+=`<line x1="${x}" x2="${x}" y1="${y}" y2="${ty}" style="stroke:var(--lymph);stroke-width:1.2;opacity:.6"/>`+node(x,y,L.nr,fill)}
    /* travelling cell along the trunk to the node being filled */
    if(S.kf>0&&S.kf<9){const ord=Math.floor(S.kf),fr=S.kf-ord;if(fr>.02&&fr<.98){const col=Math.floor(ord/2),x=lerp(t0,L.nx[0]+col*L.nx[1],fr);s+=`<circle cx="${f1(x)}" cy="${ty}" r="3.6" style="fill:var(--tumour)"/>`}}
    if(S.dep>0){const [dx,dy]=L.dep;s+=`<path d="M${dx-7} ${dy-2}Q${dx-6} ${dy-9} ${dx} ${dy-8}Q${dx+8} ${dy-7} ${dx+7} ${dy}Q${dx+6} ${dy+8} ${dx-1} ${dy+7}Q${dx-8} ${dy+6} ${dx-7} ${dy-2}Z" style="fill:var(--tumour);opacity:${f1(S.dep*(S.N==='N1c'?.95:.4))}"/>`;
      s+=`<text x="${Nn?dx:dx-12}" y="${Nn?dy+24:dy-12}" class="t-xs ${Nn?'t-mid':''}" style="fill:var(--tumour);opacity:${f1(S.N==='N1c'?1:.7)}">${S.N==='N1c'?'deposit':'not added'}</text>`}
    /* strip: the stage each T would give with the current N and M */
    const [sx0,cw,sy0,ch]=L.sc;
    s+=`<text x="${sx0}" y="${L.sy}" class="t-sm">STAGE FOR EACH T WITH ${S.N} ${S.M}</text>`;
    ST_T.forEach((T,i)=>{const g=stStage(T,S.N,S.M),x=sx0+i*cw,on=i===S.ti;
      s+=`<rect x="${x+1}" y="${sy0}" width="${cw-4}" height="${ch}" rx="7" style="fill:${stSoft(g)};stroke:${on?'var(--ink)':stCol(g)};stroke-width:${on?2.2:1}"/>`;
      s+=`<text x="${f1(x+cw/2-1)}" y="${sy0+15}" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:700':''}">${T}</text><text x="${f1(x+cw/2-1)}" y="${sy0+ch-9}" class="t-big t-mid" style="fill:${stCol(g)};font-variant-numeric:lining-nums">${g||'n/a'}</text>`});
    svg.innerHTML=s;
    const p=phaseOf(ST_STEPS,t);setSt(p);
    rg.setAttribute('aria-valuetext',`${S.T} ${S.N} ${S.M}, stage ${st}`);
    $('#stRead').innerHTML=`<span><b>${S.T}</b> ${ST_TD[S.T]}</span><span><b>${S.N}</b> ${ST_ND[S.N]}</span><span><b>${S.M}</b> ${ST_MD[S.M]}</span>`;
    $('#stNote').innerHTML=noteHTML(ST_STEPS[p])+`<div class="kv"><div><dt>Now: ${S.T} ${S.N} ${S.M} → stage ${st}</dt><dd>${S.N==='N1c'?'The deposit counts only because no node is positive. ':''}${S.N.startsWith('N2')?'The deposit is still there, but with positive nodes it is not added to the count. ':''}The strip under the picture shows how the same N and M would stage with each depth. <sup class="c" data-ref="Amin2017AJCC,Tong2018" title="Source 10,537">10,537</sup></dd></div></div>`;
  }
  const stop=playWire(rg,$('#stPlay'),draw,26000,'Replay','staging');
  setSt=stepWire($('#stSteps'),ST_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---- calculator ---- */
  const C={T:'T3',N:'N1b',M:'M0'};
  const mk=(el,arr,key)=>{$(el).innerHTML=arr.map(v=>`<button class="btn" data-stc="${key}" data-v="${v}" aria-pressed="${C[key]===v}">${v}</button>`).join(' ')};
  mk('#stCT',ST_T,'T');mk('#stCN',ST_N,'N');mk('#stCM',ST_M,'M');
  const lad=$('#stLad');let ladP=1,ladStop=null;
  function drawL(){const NL=vb(lad,'720 210','400 230'),st=stStage(C.T,C.N,C.M),ci=ST_LADDER.indexOf(st);
    const G=NL?{x0:14,dx:34,w:29,b:184,h0:16,dh:11.5,ly:200,gy:220}:{x0:34,dx:62,w:52,b:166,h0:18,dh:12.5,ly:184,gy:202};let s='';
    ST_LADDER.forEach((r,i)=>{const x=G.x0+i*G.dx,h=G.h0+i*G.dh,on=i===ci;
      s+=`<rect x="${x}" y="${f1(G.b-h)}" width="${G.w}" height="${f1(h)}" rx="4" style="fill:${on?stCol(r):stSoft(r)};stroke:${stCol(r)};stroke-width:${on?2:1}"/>`;
      s+=`<text x="${f1(x+G.w/2)}" y="${G.ly}" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:700':''}">${r}</text>`});
    [['Stage 0–I',0,1],['Stage II',2,4],['Stage III',5,7],['Stage IV',8,10]].forEach(([n,a,b])=>{const xa=G.x0+a*G.dx,xb=G.x0+b*G.dx+G.w;
      s+=`<line x1="${xa}" x2="${xb}" y1="${G.gy-12}" y2="${G.gy-12}" style="stroke:${stCol(ST_LADDER[a+(a===0?1:0)])};stroke-width:2"/><text x="${f1((xa+xb)/2)}" y="${G.gy}" class="t-xs t-mid">${n}</text>`});
    if(ci>=0){const x=G.x0+ci*G.dx+G.w/2,h=G.h0+ci*G.dh,yy=G.b-h-8-14*(1-ladP);
      s+=`<path d="M${f1(x-7)} ${f1(yy-12)}L${f1(x+7)} ${f1(yy-12)}L${f1(x)} ${f1(yy-1)}Z" style="fill:var(--ink)"/>`;
      const tx=clamp(x,NL?44:60,NL?356:660);s+=`<text x="${f1(tx)}" y="${f1(yy-18)}" class="t-lbl t-mid">Stage ${st}</text>`}
    else s+=`<text x="${NL?200:360}" y="${NL?40:36}" class="t-lbl t-mid">${C.T} ${C.N} ${C.M}: not in the AJCC table</text>`;
    lad.innerHTML=s}
  function calc(anim){const st=stStage(C.T,C.N,C.M);
    $$('[data-stc]').forEach(b=>b.setAttribute('aria-pressed',C[b.dataset.stc]===b.dataset.v));
    const tong=ST_TONG[st];
    const surv=st==null?'':tong!=null?`In one single-centre cohort staged by the 8th edition (1,090 patients), 5-year overall survival for stage ${st} was ${tong}%. One hospital's patients, treated in one era: a population statistic, not a prediction for any one person. <sup class="c" data-ref="Tong2018" title="Source 537">537</sup>`:`In the single-centre 8th-edition cohort, the IVB and IVC groups were too small for a meaningful figure. US 5-year relative survival for distant-stage colorectal cancer is 15% overall (diagnosed 2015–2021), and distant-stage survival has tripled since the 1970s. <sup class="c" data-ref="Tong2018,Siegel2026" title="Source 494,537">494,537</sup>`;
    const why=st==null?`The AJCC 8th-edition stage-group table has no row for Tis with positive nodes, so no stage is given.`:
      C.M!=='M0'?`Any M1 makes it stage IV, whatever T and N: ${C.M} gives stage ${st}.`:
      C.N==='N0'?`No nodes and no distant spread, so depth alone decides: ${C.T} N0 is stage ${st}.`:
      `A positive node (or a deposit) with M0 makes it stage III; depth and node count together choose the substage.`;
    const hrisk=st&&st.startsWith('II')&&!st.startsWith('III')?`<div><dt>Stage II</dt><dd>Adjuvant chemotherapy is not routine for stage II colon cancer outside a high-risk subgroup (ASCO 2022); see the checklist below. <sup class="c" data-ref="Baxter2022" title="Source 48">48</sup></dd></div>`:'';
    const para=(st==='IIB'||st==='IIC'||st==='IIIA')?`<div><dt>Paradox</dt><dd>In SEER, IIIA has done better than IIB and IIC: 3-year cancer-specific survival 91.0% vs 73.1% and 70.3% (2018–2021). <sup class="c" data-ref="Yu2024" title="Source 595">595</sup></dd></div>`:'';
    $('#stCalcNote').innerHTML=`<div class="kicker">AJCC 8th edition stage group</div><div class="stbig" style="color:${stCol(st)}">${st==null?'—':'Stage '+st}<small>${C.T} ${C.N} ${C.M}</small></div><p>${why} <sup class="c" data-ref="Amin2017AJCC,Tong2018" title="Source 10,537">10,537</sup></p>
      <div class="kv"><div><dt>${C.T}</dt><dd>${ST_TD[C.T]}</dd></div><div><dt>${C.N}</dt><dd>${ST_ND[C.N]}</dd></div><div><dt>${C.M}</dt><dd>${ST_MD[C.M]}</dd></div>${hrisk}${para}${surv?`<div><dt>Survival, population statistic</dt><dd>${surv}</dd></div>`:''}</div>
      <div class="hook"><b>Exam hook</b>Stage III = any N+ with M0. Stage IV = any M1. T4b with any N+ = IIIC; T1 with N2a is still IIIA.</div>`;
    if(anim){if(ladStop)ladStop();ladStop=animate(420,p=>{ladP=ease(p);drawL()})}else{ladP=1;drawL()}}
  $('#m-staging .stcalc').addEventListener('click',e=>{const b=e.target.closest('[data-stc]');if(!b)return;C[b.dataset.stc]=b.dataset.v;calc(true)});
  $('#stCalcReset').addEventListener('click',()=>{C.T='T3';C.N='N1b';C.M='M0';calc(true)});
  $('#stCalcShow').addEventListener('click',()=>{stop();const ti=ST_T.indexOf(C.T);let tt=ti*.1+.075;
    if(C.M!=='M0')tt={M1a:.87,M1b:.92,M1c:.985}[C.M];else if(C.N!=='N0')tt={N1a:.635,N1b:.675,N1c:.715,N2a:.775,N2b:.835}[C.N];
    rg.value=tt;draw(tt);svg.scrollIntoView({behavior:RM?'auto':'smooth',block:'center'})});
  calc(false);

  /* ---- SEER summary stage ---- */
  const SEER={crc:[91,74,15],colon:[91,74,14],rectum:[90,74,18]},TREND=[[82,89],[52,66],[5,8]];
  const seer=$('#stSeer');let which='crc',sp=1,sStop=null;
  function drawS(){const NS=vb(seer,'400 330','400 330'),v=SEER[which];
    const G=NS?{x0:30,dx:124,w:84,b:250,h:190,ly:270,dy:286,dy2:300}:{x0:80,dx:210,w:130,b:236,h:190,ly:258,dy:276,dy2:290};let s='';
    [0,25,50,75,100].forEach(p=>{const y=G.b-G.h*p/100;s+=`<line x1="${G.x0-14}" x2="${G.x0+2*G.dx+G.w+10}" y1="${f1(y)}" y2="${f1(y)}" class="grid"/><text x="${G.x0-18}" y="${f1(y+4)}" class="t-xs t-end">${p}</text>`});
    const nm=['Localized','Regional','Distant'],ds=NS?[['only in','the bowel'],['nearby tissue','or nodes'],['spread','far']]:[['found only in','the bowel'],['reached nearby','tissue or nodes'],['spread to','distant sites']],cc=['var(--good)','var(--lymph)','var(--tumour)'];
    v.forEach((val,i)=>{const x=G.x0+i*G.dx,h=G.h*val/100*sp;
      s+=`<rect x="${x}" y="${f1(G.b-h)}" width="${G.w}" height="${f1(h)}" rx="5" style="fill:${cc[i]};opacity:.85"/><text x="${f1(x+G.w/2)}" y="${f1(G.b-h-8)}" class="t-big t-mid" style="font-variant-numeric:lining-nums">${Math.round(val*sp)}%</text>`;
      s+=`<text x="${f1(x+G.w/2)}" y="${G.ly}" class="t-lbl t-mid">${nm[i]}</text><text x="${f1(x+G.w/2)}" y="${G.dy}" class="t-xs t-mid">${ds[i][0]}</text><text x="${f1(x+G.w/2)}" y="${G.dy2}" class="t-xs t-mid">${ds[i][1]}</text>`;
      if(which==='crc')TREND[i].forEach((tv,k)=>{const y=G.b-G.h*tv/100;s+=`<line x1="${x-6}" x2="${x+G.w+6}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:var(--ink);stroke-width:1.6;stroke-dasharray:4 3;opacity:${f1(.35+.25*k)}"/>`;
        if(!NS)s+=`<text x="${x+G.w+10}" y="${f1(y+(i===2&&k===0?10:4))}" class="t-xs">${k?'1995–97':'1975–77'}: ${tv}%</text>`})});
    if(NS&&which==='crc')s+=`<text x="${G.x0-14}" y="16" class="t-xs">dashed: 1975–77 and 1995–97</text>`;
    seer.innerHTML=s}
  $$('[data-sts]').forEach(b=>b.addEventListener('click',()=>{which=b.dataset.sts;$$('[data-sts]').forEach(x=>x.setAttribute('aria-pressed',x===b));if(sStop)sStop();sStop=animate(500,p=>{sp=ease(p);drawS()})}));
  drawS();

  /* ---- the paradox ---- */
  const PAR={css:[73.1,70.3,91.0],os:[64.9,63.0,83.1]},par=$('#stPar');let pm='css',pp=1,pStop=null;
  function drawP(){const NP=vb(par,'400 330','400 330'),v=PAR[pm];
    const G=NP?{x0:40,dx:118,w:84,b:262,h:200,ly:284}:{x0:90,dx:200,w:120,b:250,h:190,ly:274};let s='';
    [0,25,50,75,100].forEach(p=>{const y=G.b-G.h*p/100;s+=`<line x1="${G.x0-14}" x2="${G.x0+2*G.dx+G.w+10}" y1="${f1(y)}" y2="${f1(y)}" class="grid"/><text x="${G.x0-18}" y="${f1(y+4)}" class="t-xs t-end">${p}</text>`});
    ['IIB','IIC','IIIA'].forEach((n,i)=>{const x=G.x0+i*G.dx,h=G.h*v[i]/100*pp;
      s+=`<rect x="${x}" y="${f1(G.b-h)}" width="${G.w}" height="${f1(h)}" rx="5" style="fill:${stCol(n)};opacity:.85"/><text x="${f1(x+G.w/2)}" y="${f1(G.b-h-8)}" class="t-big t-mid" style="font-variant-numeric:lining-nums">${(v[i]*pp).toFixed(1)}%</text><text x="${f1(x+G.w/2)}" y="${G.ly}" class="t-lbl t-mid">Stage ${n}</text>`});
    const ax=G.x0+G.w+8,bx=G.x0+2*G.dx-8,ay=G.b-G.h*v[0]/100-34,by=G.b-G.h*v[2]/100-30;
    s+=`<defs>${marker('stArr','var(--ink)')}</defs><path d="M${ax} ${f1(ay)}Q${f1((ax+bx)/2)} ${f1(Math.min(ay,by)-26)} ${bx} ${f1(by)}" style="fill:none;stroke:var(--ink);stroke-width:1.5;opacity:${f1(pp)}" marker-end="url(#stArr)"/>`;
    s+=`<text x="${f1((ax+bx)/2)}" y="${f1(Math.min(ay,by)-30)}" class="t-xs t-mid" style="fill:var(--ink);opacity:${f1(pp)}">stage III, yet higher</text>`;
    par.innerHTML=s}
  $$('[data-stp]').forEach(b=>b.addEventListener('click',()=>{pm=b.dataset.stp;$$('[data-stp]').forEach(x=>x.setAttribute('aria-pressed',x===b));if(pStop)pStop();pStop=animate(500,p=>{pp=ease(p);drawP()})}));
  drawP();

  /* ---- high-risk stage II checklist (ASCO 2022 wording) ---- */
  const HR=[['t4','T4 tumour (T4a or T4b)'],['ln','Fewer than 12 lymph nodes sampled'],['pni','Perineural invasion'],['lvi','Lymphovascular invasion'],['gr','Poorly differentiated or undifferentiated grade'],['obs','Intestinal obstruction'],['perf','Tumour perforation'],['bd3','Grade BD3 tumour budding'],['dmmr','Tumour is dMMR/MSI (not a risk factor; changes the advice)']];
  $('#stChk').innerHTML=HR.map(([k,n])=>`<label for="stHr_${k}"><input type="checkbox" id="stHr_${k}" data-sthr="${k}"><span>${n}</span></label>`).join('');
  function chk(){const on=HR.filter(([k])=>$('#stHr_'+k).checked).map(([k])=>k),risk=on.filter(k=>k!=='dmmr'),dm=on.includes('dmmr');
    let h;
    if(!risk.length)h=`<p><b>No listed high-risk feature ticked.</b> ASCO 2022: adjuvant chemotherapy is not routine for stage II colon cancer outside a high-risk subgroup.${dm?' ASCO 2022 also says people with dMMR/MSI tumours should not routinely be offered adjuvant chemotherapy; in pooled trial data, stage II dMMR tumours did not benefit from fluorouracil alone.':''} ${dm?'<sup class="c" data-ref="Baxter2022,Sargent2010" title="Source 48,468">48,468</sup>':'<sup class="c" data-ref="Baxter2022" title="Source 48">48</sup>'}</p>`;
    else h=`<p><b>${risk.length} high-risk feature${risk.length>1?'s':''} ticked.</b> ${risk.includes('t4')?'ASCO 2022: patients with T4 tumours are at higher risk of recurrence and should be offered adjuvant chemotherapy. ':''}${risk.some(k=>k!=='t4')?'ASCO 2022 lists the other ticked features as high-risk factors that may lead to an offer of adjuvant chemotherapy. ':''}${dm?'With dMMR plus high-risk features, if chemotherapy is offered, ASCO 2022 recommends an oxaliplatin-containing regimen.':''} <sup class="c" data-ref="Baxter2022" title="Source 48">48</sup></p>`;
    $('#stChkOut').innerHTML=h+`<p class="stage-cap">Guideline statements as published, not advice for any one person. Treatment detail: <button class="stlink" data-go="chemo">chemotherapy after surgery</button>.</p>`}
  $('#stChk').addEventListener('change',chk);chk();

  /* ---- CEA threshold ---- */
  const CEA=[{th:'2.5',se:82,sc:'78–86',sp:80,pc:'59–92',n:7},{th:'5',se:71,sc:'64–76',sp:88,pc:'84–92',n:23},{th:'10',se:68,sc:'53–79',sp:97,pc:'90–99',n:7}];
  const cs=$('#stCeaSvg'),cr=$('#stCea');let cStop=null,cCur={se:71,fa:12};
  function drawC(){const NC=vb(cs,'720 250','400 480'),c=CEA[clamp(Math.round(+cr.value),0,2)];
    const G=NC?[{x:20,y:84,tx:200},{x:20,y:314,tx:200}]:[{x:30,y:78,tx:215},{x:390,y:78,tx:575}],dd=NC?16:16.5;let s='';
    const se=Math.round(cCur.se),fa=Math.round(cCur.fa);
    const grid=(g,n,col,title,sub)=>{s+=`<text x="${g.x}" y="${g.y-30}" class="t-sm">${title}</text><text x="${g.x}" y="${g.y-16}" class="t-xs">${sub}</text>`;
      for(let i=0;i<100;i++){const r=Math.floor(i/10),q=i%10,on=i<n;s+=`<circle cx="${f1(g.x+6+q*dd)}" cy="${f1(g.y+6+r*dd)}" r="5.6" style="fill:${on?col:'var(--panel-2)'};stroke:${on?col:'var(--line)'};stroke-width:1"/>`}};
    grid(G[0],se,'var(--tumour)','100 PEOPLE WHOSE CANCER CAME BACK','filled: CEA above the threshold');
    grid(G[1],fa,'var(--warn)','100 PEOPLE WITHOUT RECURRENCE','filled: false alarm');
    const big=(g,n,a,b,col)=>{s+=`<text x="${g.tx}" y="${g.y+40}" style="font:800 34px var(--display);fill:${col};font-variant-numeric:lining-nums">${n}</text><text x="${g.tx}" y="${g.y+62}" class="t-lbl">${a}</text><text x="${g.tx}" y="${g.y+80}" class="t-xs">${b}</text>`};
    big(G[0],se,'flagged','sensitivity '+c.se+'% ('+c.sc+')','var(--tumour)');big(G[1],fa,'false alarms','specificity '+c.sp+'% ('+c.pc+')','var(--warn)');
    s+=`<text x="${G[0].tx}" y="${G[0].y+108}" class="t-xs">missed: ${100-se}</text><text x="${G[1].tx}" y="${G[1].y+108}" class="t-xs">correctly reassured: ${100-fa}</text>`;
    s+=`<text x="${NC?20:30}" y="${NC?20:22}" class="t-big" style="font-variant-numeric:lining-nums">Threshold ${c.th} µg/L</text>`;
    cs.innerHTML=s;
    cr.setAttribute('aria-valuetext',`${c.th} micrograms per litre: sensitivity ${c.se}%, specificity ${c.sp}%`);
    $('#stCeaRead').innerHTML=CEA.map(x=>`<span${x===c?' style="color:var(--ink)"':''}>≥${x.th} µg/L <b>${x.se}% / ${x.sp}%</b> (${x.n} studies)</span>`).join('');
    $('#stCeaNote').innerHTML=noteHTML({k:'Cochrane review · 52 studies',t:`CEA ≥${c.th} µg/L`,
      txt:`Pooled sensitivity ${c.se}% (95% CI ${c.sc}) and specificity ${c.sp}% (${c.pc}) for detecting recurrence after curative treatment. A lower threshold catches more recurrences but raises more false alarms; a higher one does the reverse. Cochrane concluded that CEA is not sensitive enough to use alone, even at a low threshold, and recommended monitoring with more than one modality, using the highest cut-off assessed (10 µg/L). ASCO 2006 set no specific threshold. <sup class="c" data-ref="Nicholson2015,Locker2006" title="Source 332,401">332,401</sup>`,
      pt:`A blood marker that rises with some recurrences. Set the alarm low and it catches more but also worries more people needlessly.`,
      hook:`CEA is not a screening test. Recurrence: 2.5 µg/L → 82%/80%; 10 µg/L → 68%/97% (sensitivity/specificity).`})}
  cr.addEventListener('input',()=>{const c=CEA[clamp(Math.round(+cr.value),0,2)],a={...cCur};if(cStop)cStop();cStop=animate(450,p=>{const e=ease(p);cCur={se:lerp(a.se,c.se,e),fa:lerp(a.fa,100-c.sp,e)};drawC()})});
  drawC();
  const prevR=redraws.staging;redraws.staging=()=>{prevR&&prevR();drawL();drawS();drawP();drawC()};
};
/* =============== 3.3 Tumour biomarkers =============== */
const BM_DEF={mmr:'p',ras:'wt',g12c:'no',braf:'wt',her2:'neg',side:'left'};
/* tree geometry: boxes {x,y,w,h,t:[lines]} for the wide and narrow layouts */
const BM_GW={root:{x:8,y:176,w:100,h:46,t:['mCRC:','tumour tested']},mmr:{x:136,y:176,w:96,h:46,t:['MMR / MSI']},ras:{x:262,y:226,w:96,h:46,t:['RAS','KRAS + NRAS']},
 braf:{x:386,y:140,w:90,h:46,t:['BRAF','V600E?']},side:{x:494,y:186,w:62,h:46,t:['Side']},g12c:{x:386,y:290,w:90,h:46,t:['KRAS','G12C?']},her2:{x:262,y:340,w:96,h:46,t:['HER2','IHC + ISH']},
 L1:{x:596,y:20,w:118,h:40,t:['Immunotherapy','PD-1 ± CTLA-4']},L2:{x:596,y:74,w:118,h:40,t:['BRAF inhibitor','+ anti-EGFR']},L3:{x:596,y:128,w:118,h:40,t:['Chemo +','anti-EGFR']},
 L4:{x:596,y:182,w:118,h:40,t:['Chemo +','anti-VEGF']},L5:{x:596,y:236,w:118,h:40,t:['Chemo ± anti-VEGF','no anti-EGFR']},L6:{x:596,y:290,w:118,h:40,t:['G12C inhibitor','+ anti-EGFR']},L7:{x:596,y:344,w:118,h:40,t:['HER2-targeted','later line']}};
const BM_GN={root:{x:30,y:8,w:112,h:40,t:['mCRC:','tumour tested']},mmr:{x:30,y:76,w:112,h:40,t:['MMR / MSI']},ras:{x:30,y:150,w:112,h:40,t:['RAS','KRAS + NRAS']},
 braf:{x:30,y:224,w:112,h:40,t:['BRAF V600E?']},side:{x:30,y:298,w:112,h:40,t:['Side']},g12c:{x:30,y:420,w:112,h:40,t:['KRAS G12C?']},her2:{x:30,y:560,w:112,h:40,t:['HER2','IHC + ISH']},
 L1:{x:196,y:76,w:196,h:40,t:['Immunotherapy','PD-1 ± CTLA-4']},L2:{x:196,y:224,w:196,h:40,t:['BRAF inhibitor','+ anti-EGFR']},L3:{x:196,y:280,w:196,h:40,t:['Chemo + anti-EGFR']},
 L4:{x:196,y:330,w:196,h:40,t:['Chemo + anti-VEGF']},L5:{x:196,y:404,w:196,h:40,t:['Chemo ± anti-VEGF','no anti-EGFR']},L6:{x:196,y:454,w:196,h:40,t:['G12C inhibitor','+ anti-EGFR']},L7:{x:196,y:560,w:196,h:40,t:['HER2-targeted','later line']}};
const bmR=b=>[b.x+b.w,b.y+b.h/2],bmL=b=>[b.x,b.y+b.h/2],bmB=b=>[b.x+b.w/2,b.y+b.h],bmTp=b=>[b.x+b.w/2,b.y];
const bmEl=(a,b,mx)=>{mx=mx==null?(a[0]+b[0])/2:mx;return[a,[mx,a[1]],[mx,b[1]],b]};
/* edges: id, points, label [x,y,anchor,text] */
function bmEdges(G,N){const E={};
  if(!N){E.e0=[[bmR(G.root),bmL(G.mmr)],null];E.eD=[[bmTp(G.mmr),[bmTp(G.mmr)[0],40],bmL(G.L1)],[390,34,'mid','dMMR / MSI-H']];
    E.eP=[bmEl(bmR(G.mmr),bmL(G.ras)),[243,236,'end','pMMR']];E.eRw=[bmEl(bmR(G.ras),bmL(G.braf)),[368,206,'end','wild-type']];E.eRm=[bmEl(bmR(G.ras),bmL(G.g12c)),[368,292,'end','mutant']];
    E.eBv=[bmEl(bmR(G.braf),bmL(G.L2),536),[540,128,'start','V600E']];E.eBw=[bmEl(bmR(G.braf),bmL(G.side),486),[484,236,'mid','WT']];
    E.eSl=[bmEl(bmR(G.side),bmL(G.L3),576),[572,178,'end','left']];E.eSr=[bmEl(bmR(G.side),bmL(G.L4),576),[572,246,'end','right']];
    E.eGn=[bmEl(bmR(G.g12c),bmL(G.L5),536),[540,276,'start','other']];E.eGy=[bmEl(bmR(G.g12c),bmL(G.L6),536),[540,328,'start','G12C']];
    E.eH0=[[bmB(G.root),[bmB(G.root)[0],bmL(G.her2)[1]],bmL(G.her2)],[64,300,'start','also tested']];E.eH1=[[bmR(G.her2),bmL(G.L7)],[470,358,'mid','HER2-positive']]}
  else{const c=90;E.e0=[[bmB(G.root),bmTp(G.mmr)],null];E.eD=[[bmR(G.mmr),bmL(G.L1)],[173,90,'mid','dMMR']];
    E.eP=[[bmB(G.mmr),bmTp(G.ras)],[92,137,'start','pMMR']];E.eRw=[[bmB(G.ras),bmTp(G.braf)],[92,211,'start','wild-type']];
    E.eRm=[[bmL(G.ras),[16,bmL(G.ras)[1]],[16,bmL(G.g12c)[1]],bmL(G.g12c)],[20,412,'start','mutant']];
    E.eBv=[[bmR(G.braf),bmL(G.L2)],[173,238,'mid','V600E']];E.eBw=[[bmB(G.braf),bmTp(G.side)],[92,285,'start','WT']];
    E.eSl=[bmEl(bmR(G.side),bmL(G.L3)),[171,312,'end','left']];E.eSr=[bmEl(bmR(G.side),bmL(G.L4)),[171,346,'end','right']];
    E.eGn=[bmEl(bmR(G.g12c),bmL(G.L5)),[171,434,'end','other']];E.eGy=[bmEl(bmR(G.g12c),bmL(G.L6)),[171,468,'end','G12C']];
    E.eH0=[[bmL(G.root),[6,bmL(G.root)[1]],[6,bmL(G.her2)[1]],bmL(G.her2)],[12,546,'start','also tested']];E.eH1=[[bmR(G.her2),bmL(G.L7)],[173,574,'mid','HER2+']];void c}
  return E}
/* the lit path for a set of results: edges in order, leaves reached */
function bmPath(S){const e=['e0'],lv=[];
  if(S.mmr==='d'){e.push('eD');lv.push('L1')}
  else{e.push('eP');
    if(S.ras==='mut'){e.push('eRm');if(S.g12c==='yes'){e.push('eGy');lv.push('L6')}else{e.push('eGn');lv.push('L5')}}
    else{e.push('eRw');if(S.braf==='v600e'){e.push('eBv');lv.push('L2')}else{e.push('eBw');if(S.side==='left'){e.push('eSl');lv.push('L3')}else{e.push('eSr');lv.push('L4')}}}}
  if(S.her2==='pos'){e.push('eH0','eH1');lv.push('L7')}
  return{e,lv}}
const BM_NODE_OF={eD:'L1',eP:'ras',eRw:'braf',eRm:'g12c',eBv:'L2',eBw:'side',eSl:'L3',eSr:'L4',eGn:'L5',eGy:'L6',eH0:'her2',eH1:'L7',e0:'mmr'};
/* drug classes: status for the current results; st: open | partner | closed | na */
function bmDrugs(S){const ras=S.ras==='mut',d=S.mmr==='d',v=S.braf==='v600e',left=S.side==='left',D=[];
  D.push({n:'Immunotherapy (PD-1 blockade, ± CTLA-4)',st:d?'open':'closed',
    tx:d?'First-line for MSI-H/dMMR mCRC: pembrolizumab doubled median PFS (16.5 vs 8.2 months); nivolumab plus ipilimumab gave 72% 24-month PFS vs 14% with chemotherapy. <sup class="c" data-ref="Andre2020,Andre2024,FDA-Keytruda" title="Source 16,18,165">16,18,165</sup>':'Not effective in pMMR tumours: in the first trial, 0 of 18 pMMR vs 4 of 10 dMMR colorectal cancers responded to pembrolizumab. <sup class="c" data-ref="Le2015" title="Source 307">307</sup>'});
  D.push({n:'Anti-EGFR (cetuximab, panitumumab)',st:ras?(S.g12c==='yes'?'partner':'closed'):d?'na':v?'partner':left?'open':'closed',
    tx:ras?(S.g12c==='yes'?'Closed on its own for RAS-mutant cancer; panitumumab is labelled with sotorasib, and cetuximab is used with adagrasib, for KRAS G12C. <sup class="c" data-ref="FDA-Vectibix,Yaeger2023" title="Source 177,591">177,591</sup>':'Closed: cetuximab is "not indicated for treatment of Ras-mutant colorectal cancer"; panitumumab likewise needs RAS wild-type. <sup class="c" data-ref="FDA-Erbitux,FDA-Vectibix" title="Source 160,177">160,177</sup>')
      :d?'RAS wild-type keeps it possible, but dMMR first-line goes to checkpoint inhibitors. <sup class="c" data-ref="Morris2023" title="Source 380">380</sup>'
      :v?'Used as the partner of encorafenib for BRAF V600E. <sup class="c" data-ref="FDA-Erbitux,Kopetz2019" title="Source 160,290">160,290</sup>'
      :left?'Open first-line with chemotherapy for left-sided RAS wild-type pMMR disease (ASCO 2023). Benefit is concentrated on the left: OS HR 0.75. <sup class="c" data-ref="Morris2023,Arnold2017" title="Source 21,380">21,380</sup>'
      :'Little benefit on the right (OS HR 1.12, retrospective subgroups); ASCO 2023 recommends chemotherapy plus anti-VEGF first-line here. <sup class="c" data-ref="Arnold2017,Morris2023" title="Source 21,380">21,380</sup>'});
  D.push({n:'Anti-VEGF (bevacizumab)',st:(!d&&((ras&&S.g12c!=='yes')||(!ras&&!v&&!left)))?'open':'avail',
    tx:'No biomarker needed: labelled with fluorouracil-based chemotherapy for mCRC. The usual first-line partner for tumours outside the other groups. <sup class="c" data-ref="FDA-Avastin,Morris2023" title="Source 153,380">153,380</sup>'});
  D.push({n:'BRAF-targeted (encorafenib + cetuximab)',st:v&&!ras&&!d?'open':v?'partner':'na',
    tx:v?`Open: BEACON (previously treated) median OS 9.0 vs 5.4 months; BREAKWATER first-line with mFOLFOX6, 30.3 vs 15.1 months at interim. ${ras?'RAS and BRAF mutations are largely mutually exclusive, so this combination is unusual. ':''}${d?'With dMMR, first-line still goes to immunotherapy in the published order. ':''}<sup class="c" data-ref="Kopetz2019,Elez2025,Sepulveda2017" title="Source 146,290,484">146,290,484</sup>`:'Only for BRAF V600E. <sup class="c" data-ref="FDA-Braftovi" title="Source 154">154</sup>'});
  D.push({n:'KRAS G12C inhibitor + anti-EGFR',st:S.g12c==='yes'&&!d?'open':S.g12c==='yes'?'partner':'na',
    tx:S.g12c==='yes'?'After fluoropyrimidine, oxaliplatin and irinotecan: sotorasib plus panitumumab (PFS 5.6 vs 2.2 months) or adagrasib plus cetuximab (response 46% vs 19% alone; its US colorectal indication was removed in August 2026). <sup class="c" data-ref="Fakih2023,Yaeger2023,FDA-Lumakras,FDA-Krazati" title="Source 152,166,168,591">152,166,168,591</sup>':'Only for KRAS G12C (3–4% of mCRC). <sup class="c" data-ref="Fakih2023" title="Source 152">152</sup>'});
  D.push({n:'HER2-targeted (tucatinib + trastuzumab; trastuzumab deruxtecan)',st:S.her2==='pos'?(ras?'partner':'open'):'na',
    tx:S.her2==='pos'?(ras?'The tucatinib label covers RAS wild-type, HER2-positive mCRC only. Trastuzumab deruxtecan has a tumour-agnostic label for HER2 IHC 3+ after prior treatment. <sup class="c" data-ref="FDA-Tukysa,FDA-Enhertu" title="Source 159,176">159,176</sup>':'Later line: tucatinib plus trastuzumab gave a 38.1% response rate in MOUNTAINEER; trastuzumab deruxtecan 45.3% in HER2-positive tumours. <sup class="c" data-ref="Strickler2023,Yoshino2023,FDA-Tukysa" title="Source 176,514,593">176,514,593</sup>'):'Only for HER2-positive tumours. <sup class="c" data-ref="SartoreBianchi2016" title="Source 469">469</sup>'});
  return D}
const BM_ST={open:['good','Opens'],partner:['warn','Conditional'],closed:['bad','Closed'],na:['','Not relevant'],avail:['','Available']};
/* universal testing cases: lost proteins, BRAF, methylation, outcome */
const BM_CASES={a:{lost:['MLH1','PMS2'],braf:true,meth:true,out:'O1',lab:'MLH1 + PMS2 lost'},b:{lost:['MLH1','PMS2'],braf:false,meth:false,out:'O2',lab:'MLH1 + PMS2 lost'},c:{lost:['MSH2','MSH6'],out:'O2',lab:'MSH2 + MSH6 lost'},d:{lost:[],out:'O3',lab:'All 4 retained'}};
const BM_PROT=['MLH1','PMS2','MSH2','MSH6'];
const BM_TSTEPS=[
 {from:0,at:.09,k:'Universal testing',t:'Tissue from the tumour',
  txt:`Thin slices are cut from the biopsy or the resected tumour. Guidelines say clinicians should order MMR testing in patients with CRC, to identify those at high risk of Lynch syndrome and for prognosis; EGAPP found enough evidence to offer Lynch testing to everyone with newly diagnosed CRC, to protect relatives. <sup class="c" data-ref="Sepulveda2017,EGAPP2009" title="Source 145,484">145,484</sup>`,
  pt:`The same piece of tumour that confirmed the cancer is used again. No extra procedure is needed.`,
  hook:`Test every new colorectal cancer for MMR, not just young patients or strong family histories.`},
 {from:.18,at:.36,k:'Immunohistochemistry',t:'Stain four proteins',
  txt:`ESMO recommends immunohistochemistry (IHC) for MLH1, MSH2, MSH6 and PMS2 as the first test; PCR of microsatellite markers (five markers including at least BAT-25 and BAT-26) is the second method. A brown nucleus means the protein is there; a nucleus that stays blue in the tumour means it is lost. <sup class="c" data-ref="Luchini2019" title="Source 341">341</sup>`,
  pt:`Four stains, one for each repair protein. If a protein is missing from the cancer cells, its stain stays blank in them.`,
  hook:`IHC first (MLH1, MSH2, MSH6, PMS2); MSI PCR second.`},
 {from:.45,at:.55,k:'Reading the slides',t:'Which proteins are lost?',
  txt:`The proteins work in pairs: MLH1 with PMS2 (MutLα), MSH2 with MSH6 (MutSα). About 15% of CRCs are MSI: roughly 3% from Lynch syndrome and 12% from sporadic MLH1 promoter hypermethylation. dMMR occurs in 15–20% of CRCs, about three-quarters of them from MLH1 silencing. <sup class="c" data-ref="Vilar2010,Boland2010,Sepulveda2017" title="Source 63,484,564">63,484,564</sup>`,
  pt:`Which stains are blank tells the lab which repair partnership is broken.`,
  hook:`MLH1 pairs with PMS2; MSH2 pairs with MSH6.`},
 {from:.62,at:.72,k:'Reflex test',t:'MLH1 lost: BRAF or methylation',
  txt:`Tumours with MLH1 loss should have BRAF V600 or MLH1 promoter-methylation testing. About three-quarters of CRCs with MSI from MLH1 promoter hypermethylation also carry an acquired BRAF mutation. MSH2 or MSH6 loss is not explained this way. <sup class="c" data-ref="Syngal2015,Sepulveda2017" title="Source 484,520">484,520</sup>`,
  pt:`Most MLH1 losses happen by chance inside the tumour: the gene is switched off by chemical tags, often alongside a BRAF mutation.`,
  hook:`BRAF V600E in an MLH1-deficient tumour points to sporadic cancer, not Lynch.`},
 {from:.8,at:.92,k:'The answer',t:'Sporadic, or test for Lynch?',
  txt:`A BRAF mutation strongly favours sporadic disease, but its absence does not exclude Lynch syndrome. Fewer than one-third of people with dMMR/MSI CRC have a germline mutation in MLH1, MSH2, MSH6 or PMS2 (or, rarely, an EPCAM deletion). Relatives who inherit one have about a 45% risk of CRC by age 70. <sup class="c" data-ref="Sepulveda2017,EGAPP2009" title="Source 145,484">145,484</sup>`,
  pt:`If the lab cannot explain the missing protein by chance changes in the tumour, the next step is a blood or saliva test for an inherited cause, with genetic counselling.`,
  hook:`dMMR ≠ Lynch: under one-third of dMMR CRCs are Lynch syndrome.`}
];
/* a slide of tissue: glands of tumour nuclei and scattered stromal nuclei */
function bmSlide(x,y,w,h,stain,lost,hl,seed){const rr=rng(seed);let s=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="8" style="fill:var(--cell);stroke:${hl?'var(--bad)':'var(--line)'};stroke-width:${hl?2.4:1}"/>`;
  const nuc=(cx,cy,rx,ry,brown)=>`<ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="${rx}" ry="${ry}" style="fill:var(--goblet);opacity:.85"/>`+(brown>0?`<ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="${rx}" ry="${ry}" style="fill:var(--liver);opacity:${f1(brown)}"/>`:'');
  [[.32,.42,.2],[.7,.6,.17]].forEach(([gx,gy,gr])=>{const cx=x+w*gx,cy=y+h*gy,R=Math.min(w,h)*gr;
    s+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(R*1.25)}" style="fill:var(--mucosa);opacity:.35"/><circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(R*.55)}" style="fill:var(--field)"/>`;
    for(let i=0;i<12;i++){const a=i/12*Math.PI*2;s+=nuc(cx+Math.cos(a)*R*.9,cy+Math.sin(a)*R*.9,4.2,3,lost?0:stain)}});
  for(let i=0;i<11;i++){const px=x+8+rr()*(w-16),py=y+8+rr()*(h-16);s+=nuc(px,py,2.4,2.4,stain)}
  return s}
function bmBox(b,lines,on,col,soft){let s=`<rect x="${f1(b.x)}" y="${f1(b.y)}" width="${b.w}" height="${b.h}" rx="9" style="fill:${on?soft:'var(--panel)'};stroke:${on?col:'var(--line)'};stroke-width:${on?2:1}"/>`;
  const n=lines.length;lines.forEach((l,i)=>s+=`<text x="${f1(b.x+b.w/2)}" y="${f1(b.y+b.h/2+4+(i-(n-1)/2)*14)}" class="t-sm t-mid" style="${on?'fill:var(--ink);font-weight:700':'fill:var(--ink)'}">${l}</text>`);return s}
inits.biomarkers=()=>{
  /* ---- decision tree ---- */
  const svg=$('#bmSvg'),S={...BM_DEF};let tp=1,tStop=null;
  function plen(P){let L=0;for(let i=1;i<P.length;i++)L+=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);return L}
  function partial(P,f){if(f>=1)return P;const tot=plen(P)*f,out=[P[0]];let acc=0;for(let i=1;i<P.length;i++){const d=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);if(acc+d>=tot){const k=(tot-acc)/(d||1);out.push([lerp(P[i-1][0],P[i][0],k),lerp(P[i-1][1],P[i][1],k)]);return out}acc+=d;out.push(P[i])}return out}
  const pd=P=>'M'+P.map(p=>f1(p[0])+' '+f1(p[1])).join('L');
  function drawTree(){const N=vb(svg,'720 400','400 610'),G=N?BM_GN:BM_GW,E=bmEdges(G,N),{e:path,lv}=bmPath(S);let s='';
    const n=path.length,lit=new Set();
    Object.keys(E).forEach(id=>{s+=`<path d="${pd(E[id][0])}" style="fill:none;stroke:var(--line);stroke-width:1.6;${id.startsWith('eH')?'stroke-dasharray:4 3':''}"/>`});
    let head=null;
    path.forEach((id,i)=>{const f=clamp(tp*n-i);if(f<=0)return;const P=partial(E[id][0],f);s+=`<path d="${pd(P)}" style="fill:none;stroke:${id.startsWith('eH')?'var(--warn)':'var(--brand)'};stroke-width:3.2;stroke-linejoin:round;stroke-linecap:round"/>`;
      if(f<1)head=P[P.length-1];if(f>=1)lit.add(BM_NODE_OF[id])});
    if(head)s+=`<circle cx="${f1(head[0])}" cy="${f1(head[1])}" r="5.5" style="fill:var(--brand);stroke:var(--panel);stroke-width:1.5"/>`;
    Object.keys(E).forEach(id=>{const lb=E[id][1];if(!lb)return;const on=path.includes(id);s+=`<text x="${lb[0]}" y="${lb[1]}" class="t-xs ${lb[2]==='mid'?'t-mid':lb[2]==='end'?'t-end':''}" style="${on?'fill:var(--ink);font-weight:700':''}">${lb[3]}</text>`});
    lit.add('root');
    ['root','mmr','ras','braf','side','g12c','her2'].forEach(k=>s+=bmBox(G[k],G[k].t,lit.has(k),k==='her2'?'var(--warn)':'var(--brand)',k==='her2'?'var(--warn-soft)':'var(--brand-soft)'));
    ['L1','L2','L3','L4','L5','L6','L7'].forEach(k=>{const on=lv.includes(k)&&lit.has(k);s+=bmBox(G[k],G[k].t,on,'var(--rx)','var(--rx-soft)');
      if(on)s+=`<circle cx="${f1(G[k].x+G[k].w-8)}" cy="${f1(G[k].y+8)}" r="4" style="fill:var(--rx)"/>`});
    svg.innerHTML=s}
  function note(){const D=bmDrugs(S),{lv}=bmPath(S);
    const warn=S.ras==='mut'&&S.braf==='v600e'?'<p class="stage-cap">RAS and BRAF mutations are largely mutually exclusive, so this combination is rare; the tree follows RAS first. <sup class="c" data-ref="Sepulveda2017" title="Source 484">484</sup></p>':'';
    const dm=S.mmr==='d'?`<p>dMMR is ${S.side==='left'?'uncommon on the left (3% of left-sided colon, 1% of rectal tumours)':'much commoner on the right (26% of right-sided colon tumours)'}, and 34.6% of dMMR metastatic tumours also carry BRAF, against 6.8% of pMMR. <sup class="c" data-ref="Hutchins2011,Venderbosch2014" title="Source 246,560">246,560</sup></p>`:'';
    $('#bmNote').innerHTML=`<div class="kicker">${lv.length} branch${lv.length>1?'es':''} lit</div><h4>What these results open</h4>${dm}${warn}<ul class="bmdrug">${D.map(d=>`<li><span class="hd"><span class="tag ${BM_ST[d.st][0]}">${BM_ST[d.st][1]}</span>${d.n}</span><span>${d.tx}</span></li>`).join('')}</ul>
      <div class="hook"><b>Exam hook</b>Extended RAS (KRAS and NRAS exons 2, 3, 4) before any anti-EGFR; anti-EGFR benefit sits in left-sided RAS wild-type; dMMR → checkpoint inhibitor. <sup class="c" data-ref="Sepulveda2017,Arnold2017,Andre2020" title="Source 16,21,484">16,21,484</sup></div>`}
  function run(){if(tStop)tStop();tp=0;tStop=animate(1300,p=>{tp=p;drawTree()},()=>{tStop=null})}
  function setBtn(){$$('[data-bm]').forEach(b=>b.setAttribute('aria-pressed',S[b.dataset.bm]===b.dataset.v))}
  $('#bmToggles').addEventListener('click',e=>{const b=e.target.closest('[data-bm]');if(!b)return;const k=b.dataset.bm,v=b.dataset.v;S[k]=v;
    if(k==='g12c'&&v==='yes')S.ras='mut';if(k==='ras'&&v==='wt')S.g12c='no';
    setBtn();note();run()});
  $('#bmTreePlay').addEventListener('click',run);
  $('#bmTreeReset').addEventListener('click',()=>{Object.assign(S,BM_DEF);setBtn();note();run()});
  setBtn();note();drawTree();

  /* ---- universal testing scrubber ---- */
  const isv=$('#bmIhc'),rg=$('#bmT');let cs='a',setSt=()=>{};
  function draw(t){const N=vb(isv,'720 380','400 640'),C=BM_CASES[cs],stain=ramp(t,.2,.42),read=t>=.45,test=t>=.62,ans=t>=.8;let s='';
    /* four slides fly out of the block, then stain */
    const fly=ease(ramp(t,.02,.16));
    const bx=N?200:360,by=N?190:105;
    if(fly<1)s+=`<rect x="${bx-34}" y="${by-24}" width="68" height="48" rx="6" style="fill:var(--gold-soft);stroke:var(--gold);stroke-width:1.5;opacity:${f1(1-fly)}"/><text x="${bx}" y="${by+4}" class="t-xs t-mid" style="opacity:${f1(1-fly)}">tissue block</text>`;
    BM_PROT.forEach((pn,i)=>{const P=N?{x:14+(i%2)*192,y:40+Math.floor(i/2)*170,w:180,h:140}:{x:16+i*176,y:30,w:160,h:150};
      const x=lerp(bx-P.w/2,P.x,fly),y=lerp(by-P.h/2,P.y,fly),lost=C.lost.includes(pn);
      s+=`<g style="opacity:${f1(.25+.75*fly)}">${bmSlide(x,y,P.w,P.h,stain,lost,read&&lost,9)}</g>`;
      s+=`<text x="${f1(x)}" y="${f1(y-8)}" class="t-sm" style="fill:var(--ink);font-weight:700;opacity:${f1(fly)}">${pn}</text>`;
      if(read)s+=`<text x="${f1(P.x+P.w)}" y="${f1(P.y-8)}" class="t-xs t-end" style="fill:${lost?'var(--bad)':'var(--good)'};font-weight:700">${lost?'LOST in tumour':'retained'}</text>`});
    /* flow chart */
    const F=N?{A:{x:14,y:390,w:180,h:46},B:{x:206,y:390,w:180,h:46},C:{x:206,y:466,w:180,h:62},O3:{x:14,y:466,w:180,h:46},O1:{x:14,y:560,w:180,h:58},O2:{x:206,y:560,w:180,h:72}}
             :{A:{x:16,y:230,w:150,h:50},B:{x:196,y:230,w:150,h:50},C:{x:378,y:214,w:170,h:66},O1:{x:574,y:208,w:138,h:58},O2:{x:574,y:296,w:138,h:72},O3:{x:16,y:316,w:150,h:46}};
    const route={a:['A','B','C','O1'],b:['A','B','C','O2'],c:['A','B','O2'],d:['A','O3']}[cs];
    const stage=ans?4:test?3:read?2:t>=.18?1:0;
    const on=k=>{const i=route.indexOf(k);return i>=0&&i<stage};
    const ed=N?{AB:[bmR(F.A),bmL(F.B)],BC:[bmB(F.B),bmTp(F.C)],BO2:[bmR(F.B),[394,bmR(F.B)[1]],[394,bmR(F.O2)[1]],bmR(F.O2)],CO1:[[260,F.C.y+F.C.h],[260,544],[104,544],bmTp(F.O1)],CO2:[[330,F.C.y+F.C.h],bmTp(F.O2)],AO3:[bmB(F.A),bmTp(F.O3)]}
               :{AB:[bmR(F.A),bmL(F.B)],BC:bmEl(bmR(F.B),bmL(F.C)),BO2:[[346,270],[364,270],[364,350],[574,350]],CO1:bmEl(bmR(F.C),bmL(F.O1)),CO2:[[530,F.C.y+F.C.h],[530,318],[574,318]],AO3:[bmB(F.A),bmTp(F.O3)]};
    const eOn={AB:on('B'),BC:on('C'),BO2:cs==='c'&&on('O2'),CO1:on('O1')&&route.includes('C'),CO2:cs==='b'&&on('O2'),AO3:on('O3')};
    const eLab=N?{BC:[302,458,'start','MLH1 lost'],BO2:[390,500,'end','MSH2/6'],CO1:[180,540,'end','yes'],CO2:[336,550,'start','no'],AO3:[110,458,'start','none lost']}
                :{BC:[362,206,'mid','MLH1 lost'],BO2:[372,344,'start','MSH2 / MSH6 lost'],CO1:[561,232,'mid','yes'],CO2:[536,312,'start','no'],AO3:[96,302,'start','none lost']};
    Object.keys(ed).forEach(k=>{s+=`<path d="${'M'+ed[k].map(p=>f1(p[0])+' '+f1(p[1])).join('L')}" style="fill:none;stroke:${eOn[k]?'var(--brand)':'var(--line)'};stroke-width:${eOn[k]?3:1.4}"/>`;
      if(eLab[k]){const l=eLab[k];s+=`<text x="${l[0]}" y="${l[1]}" class="t-xs ${l[2]==='mid'?'t-mid':l[2]==='end'?'t-end':''}" style="${eOn[k]?'fill:var(--ink);font-weight:700':''}">${l[3]}</text>`}});
    s+=bmBox(F.A,['IHC result',read?C.lab:'…'],on('A'),'var(--brand)','var(--brand-soft)');
    s+=bmBox(F.B,['Is MLH1 lost?'],on('B'),'var(--brand)','var(--brand-soft)');
    const tested=on('C');
    s+=bmBox({...F.C,h:F.C.h-18},['BRAF V600E or','MLH1 methylation'],tested,'var(--brand)','var(--brand-soft)');
    s+=`<rect x="${F.C.x}" y="${F.C.y+F.C.h-18}" width="${F.C.w}" height="18" rx="4" style="fill:${tested?'var(--brand-soft)':'var(--panel)'};stroke:${tested?'var(--brand)':'var(--line)'}"/>`;
    for(let i=0;i<6;i++){const lx=F.C.x+10+i*11,ly=F.C.y+F.C.h-9,m=tested&&C.meth&&ramp(t,.64,.72)>i/6;s+=`<line x1="${lx}" x2="${lx}" y1="${ly}" y2="${ly-5}" style="stroke:var(--muted)"/><circle cx="${lx}" cy="${ly-6}" r="3.2" style="fill:${m?'var(--ink)':'var(--panel)'};stroke:var(--ink);stroke-width:1"/>`}
    s+=`<text x="${F.C.x+F.C.w-6}" y="${F.C.y+F.C.h-5}" class="t-xs t-end" style="${tested?'fill:var(--ink);font-weight:700':''}">${tested&&t>=.7?(C.braf?'V600E · methyl.':'WT · unmethyl.'):'promoter'}</text>`;
    s+=bmBox(F.O1,N?['Sporadic dMMR','(BRAF / methylation)']:['Sporadic dMMR','BRAF-mutant or','methylated'],on('O1'),'var(--good)','var(--good-soft)');
    s+=bmBox(F.O2,['Lynch not excluded:','genetic counselling','+ germline MMR test'],on('O2'),'var(--warn)','var(--warn-soft)');
    s+=bmBox(F.O3,['pMMR: repair intact'],on('O3'),'var(--good)','var(--good-soft)');
    isv.innerHTML=s;
    const p=phaseOf(BM_TSTEPS,t);setSt(p);
    rg.setAttribute('aria-valuetext',`Step ${p+1}: ${BM_TSTEPS[p].t}`);
    const res={a:'Sporadic: the MLH1 loss is explained by promoter methylation, with a BRAF V600E mutation in the tumour.',b:'Neither BRAF V600E nor methylation explains the MLH1 loss, so Lynch syndrome is not excluded: genetic counselling and germline testing come next.',c:'MSH2/MSH6 loss is not explained by MLH1 methylation, so the next step is genetic counselling and germline testing.',d:'All four proteins are present: the tumour is mismatch-repair proficient (pMMR).'}[cs];
    $('#bmIhcNote').innerHTML=noteHTML(BM_TSTEPS[p])+`<div class="kv"><div><dt>This example · ${C.lab}</dt><dd>${ans?res:'Scrub on to see where this tumour ends up.'} <sup class="c" data-ref="Sepulveda2017,Syngal2015" title="Source 484,520">484,520</sup></dd></div>${cs!=='d'?`<div><dt>Also for treatment</dt><dd>A dMMR result also matters for treatment: no fluorouracil alone in stage II, immunotherapy if metastatic. <sup class="c" data-ref="Baxter2022,Andre2020" title="Source 16,48">16,48</sup></dd></div>`:''}</div>`}
  const stop=playWire(rg,$('#bmPlay'),draw,18000,'Replay','biomarkers');
  setSt=stepWire($('#bmSteps'),BM_TSTEPS,rg,draw,stop);
  $$('[data-bmcase]').forEach(b=>b.addEventListener('click',()=>{cs=b.dataset.bmcase;$$('[data-bmcase]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---- dMMR frequency bars ---- */
  const fs=$('#bmFreq');
  function drawF(){const NF=vb(fs,'720 300','400 380');const rows=[['Right colon (QUASAR)',26,26,'var(--tumour)'],['Left colon (QUASAR)',3,3,'var(--accent)'],['Rectum (QUASAR)',1,1,'var(--accent)'],['All colorectal cancer',15,15,'var(--brand)'],['Stage II–III trial cohorts',15,16.7,'var(--brand)'],['Metastatic',3.5,5,'var(--lymph)']];
    const G=NF?{lx:14,x0:14,x1:360,y0:24,dy:58,bh:16,ty:-6}:{lx:20,x0:250,x1:640,y0:30,dy:44,bh:20,ty:15};const X=v=>lerp(G.x0,G.x1,v/30);let s='';
    [0,10,20,30].forEach(v=>s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${G.y0-8}" y2="${G.y0+6*G.dy-10}" class="grid"/><text x="${f1(X(v))}" y="${G.y0+6*G.dy+4}" class="t-xs t-mid">${v}%</text>`);
    rows.forEach(([n,a,b,c],i)=>{const y=G.y0+i*G.dy+(NF?14:0);s+=`<text x="${G.lx}" y="${y+G.ty}" class="t-sm" style="fill:var(--ink)">${n}</text>`;
      s+=`<rect x="${G.x0}" y="${y}" width="${f1(X(a)-G.x0)}" height="${G.bh}" rx="4" style="fill:${c};opacity:.85"/>`;
      if(b>a)s+=`<rect x="${f1(X(a))}" y="${y}" width="${f1(X(b)-X(a))}" height="${G.bh}" rx="4" style="fill:${c};opacity:.35"/>`;
      s+=`<text x="${f1(X(b)+6)}" y="${y+G.bh-4}" class="t-lbl">${b>a?a+'–'+b:a}%</text>`});
    fs.innerHTML=s}
  drawF();
  const prevR=redraws.biomarkers;redraws.biomarkers=()=>{prevR&&prevR();drawTree();drawF()};
};
/* =============== 4.1 Surgery =============== */
/* word-wrap a plain string into lines of at most n characters */
function suWrap(s,n){const w=s.split(' '),L=[];let c='';w.forEach(x=>{if((c+' '+x).trim().length>n){if(c)L.push(c);c=x}else c=(c+' '+x).trim()});if(c)L.push(c);return L}
/* operations by tumour site. seg: the resected stretch of bowel in colon() units (0 caecum .. 1 anal verge) */
const SU_OPS={
 right:{site:'Caecum / ascending colon',op:'Right hemicolectomy',seg:[0,.31],tu:.08,ties:['ileocolic','right colic'],cut:['ileocolic','right colic'],ileum:true,recon:'join',reconTxt:'ileum joined to transverse colon',
  key:'CME: 5-y local recurrence 6.5% → 3.6%',
  read:`Right hemicolectomy: the caecum, ascending colon and the end of the ileum come out, with the ileocolic and right colic vessels tied at their roots. In Erlangen, adopting complete mesocolic excision went with 5-year local recurrence falling from 6.5% to 3.6% (single-centre before–after data). <sup class="c" data-ref="Hohenberger2009" title="Source 237">237</sup>`},
 transverse:{site:'Transverse colon',op:'Transverse colectomy',seg:[.31,.51],tu:.41,ties:['middle colic'],cut:['middle colic'],recon:'join',reconTxt:'colon joined to colon',
  key:'Lap vs open colon: 3-y recurrence 16% vs 18%',
  read:`Transverse colon: the segment comes out with the middle colic vessels and their nodes. Across colon cancer, laparoscopic surgery matched open surgery in COST (3-year recurrence 16% vs 18%; overall survival 86% vs 85%). <sup class="c" data-ref="COST2004" title="Source 111">111</sup>`},
 left:{site:'Descending colon',op:'Left hemicolectomy',seg:[.53,.75],tu:.64,ties:['left colic'],cut:['left colic'],recon:'join',reconTxt:'colon joined to colon',
  key:'COLOR: median stay shorter after keyhole surgery',
  read:`Left hemicolectomy: the descending colon comes out with the left colic vessels. Right, left and sigmoid cancers made up the COLOR trial; keyhole surgery meant less blood loss (100 vs 175 mL), earlier bowel recovery and a shorter stay, with 17% converted to open. <sup class="c" data-ref="Veldkamp2005" title="Source 559">559</sup>`},
 sigmoid:{site:'Sigmoid colon',op:'Sigmoid colectomy',seg:[.74,.885],tu:.81,ties:['sigmoid'],cut:['sigmoid'],recon:'join',reconTxt:'colon joined to upper rectum',
  key:'Nodes examined: median 11 (range 1–87)',
  read:`Sigmoid colectomy: the sigmoid comes out with its arteries and nodes. In INT-0089 (3,411 stage II–III patients) the median node harvest was 11, and survival rose as more nodes were examined, even in node-negative disease. <sup class="c" data-ref="LeVoyer2003,Veldkamp2005" title="Source 318,559">318,559</sup>`},
 upper:{site:'Upper rectum',op:'High anterior resection',seg:[.78,.95],tu:.915,ties:['IMA'],cut:['sigmoid','superior rectal','trunk'],recon:'join',reconTxt:'colon joined to the rectal stump',
  key:'ROLARR: high anterior resection for the upper rectum',
  read:`Upper rectum: a high anterior resection, as described in ROLARR, removes the upper rectum with its mesorectum; the inferior mesenteric (IMA) trunk is tied centrally. <sup class="c" data-ref="Jayne2017" title="Source 263">263</sup> Heald found cancer deposits in the mesorectum several centimetres below the visible tumour, which is why the envelope matters. <sup class="c" data-ref="Heald1982" title="Source 229">229</sup>`},
 lar:{site:'Low rectum',op:'Low anterior resection (TME)',seg:[.78,.99],tu:.965,ties:['IMA'],cut:['sigmoid','superior rectal','trunk'],recon:'lar',reconTxt:'low join + temporary loop ileostomy',
  key:'Leak 28.0% without vs 10.3% with a stoma',
  read:`Low anterior resection with total mesorectal excision: the whole rectum and mesorectum come out and the colon is joined just above the anal canal. In a Swedish trial, a defunctioning stoma cut symptomatic leaks from 28.0% to 10.3% and urgent reoperation from 25.4% to 8.6%. In ACOSOG Z6051, 76.7% had a low anterior resection. <sup class="c" data-ref="Matthiessen2007,Fleshman2015" title="Source 186,352">186,352</sup>`},
 apr:{site:'Low rectum, involving the sphincters',op:'Abdominoperineal resection',seg:[.78,1],tu:.985,ties:['IMA'],cut:['sigmoid','superior rectal','trunk'],recon:'apr',reconTxt:'permanent end colostomy',
  key:'Heald: APR kept to 11% of resections',
  read:`Abdominoperineal resection removes the rectum, anal canal and sphincters through the abdomen and the perineum, so the colon ends as a permanent colostomy. In Heald's series, low anterior resections kept APR with a permanent colostomy to 11%; in ACOSOG Z6051 it was 23.3%. <sup class="c" data-ref="Heald1986,Fleshman2015,Jayne2017" title="Source 186,230,263">186,230,263</sup>`}
};
/* vessels: o = origin (S superior mesenteric, I inferior mesenteric, B IMA branch point), u = where they meet the bowel */
const SU_V={ileocolic:{o:'S',u:.025},'right colic':{o:'S',u:.17},'middle colic':{o:'S',u:.41},'left colic':{o:'I',u:.63},sigmoid:{o:'B',u:.81},'superior rectal':{o:'B',u:.93}};
const SU_STEPS=[
 {from:0,at:.1,k:'Step 1 · where is it?',t:'The site decides the operation',
  txt:`For non-metastatic bowel cancer, curative treatment ranges from endoscopic and local excision for early lesions to extensive surgery for locoregional disease, sometimes after radiotherapy or drugs to shrink the tumour. Survival is best when the cancer has not spread. The operation is named after the stretch of bowel it removes: choose a site above. <sup class="c" data-ref="Dekker2019" title="Source 123">123</sup>`,
  pt:`The surgeon removes the part of the bowel that holds the tumour, together with the fatty tissue and glands that drain it.`,
  hook:`Colon: right hemicolectomy, left hemicolectomy, sigmoid colectomy. Rectum: high anterior, low anterior or abdominoperineal resection. <sup class="c" data-ref="Veldkamp2005,Jayne2017" title="Source 263,559">263,559</sup>`},
 {from:.2,at:.3,k:'Step 2 · central vascular ligation',t:'Tie the vessels at their roots',
  txt:`In complete mesocolic excision (CME), the surgeon separates the mesocolic plane from the parietal plane and ties the supplying arteries and draining veins "right at their roots". The aim is one intact package of tumour plus its lymphatic drainage, the colon's version of total mesorectal excision. <sup class="c" data-ref="Hohenberger2009" title="Source 237">237</sup>`,
  pt:`The blood vessels to this part of the bowel are tied off close to where they start, so everything they drain can come out together.`,
  hook:`CME = mesocolic plane + central ligation: TME's colon analogue. <span class="ev early">Early evidence</span> <sup class="c" data-ref="Hohenberger2009" title="Source 237">237</sup>`},
 {from:.4,at:.5,k:'Step 3 · the lymph-node field',t:'The nodes travel with the vessels',
  txt:`Lymph drains along the blood vessels, so tying them centrally takes the whole chain of nodes in the fan of fat (violet). How many nodes the pathologist examines is itself prognostic: in INT-0089 (3,411 stage II–III patients) the median was 11 (range 1–87), and survival rose as more nodes were analysed, even when none held cancer. In MERCURY the median rectal harvest was 12. <sup class="c" data-ref="LeVoyer2003,MERCURY2006" title="Source 318,360">318,360</sup>`,
  pt:`The glands are checked under the microscope. Finding cancer in them, or not, is what decides whether chemotherapy is offered.`,
  hook:`More nodes examined, better survival, even in node-negative patients (INT-0089, P=.0005). <sup class="c" data-ref="LeVoyer2003" title="Source 318">318</sup>`},
 {from:.6,at:.7,k:'Step 4 · the specimen',t:'One intact package',
  txt:`The segment comes out with its vessels, fat and nodes in one piece. In Erlangen, as CME was adopted, cancer-related 5-year survival after curative resection rose from 82.1% to 89.1% (before–after data from one centre). For the rectum the same idea is total mesorectal excision: see the cross-section below. <sup class="c" data-ref="Hohenberger2009,Heald1986" title="Source 230,237">230,237</sup>`,
  pt:`What comes out goes to the pathology lab, where it is measured, sliced and staged.`,
  hook:`Rectum: an intact mesorectum matters. Incomplete mesorectum: recurrence 36.1% vs 20.3% with a complete one. <sup class="c" data-ref="Nagtegaal2002" title="Source 386">386</sup>`},
 {from:.8,at:.95,k:'Step 5 · reconstruction',t:'Join the ends, or make a stoma',
  txt:`Usually the two ends are joined (an anastomosis). After a very low join, a temporary loop ileostomy protects it: in a Swedish trial of 234 people, symptomatic leaks were 10.3% with a defunctioning stoma vs 28.0% without. At a median 42 months, 13.8% and 16.9% still had a stoma of some kind. When the sphincters must go, the colon ends as a permanent colostomy. <sup class="c" data-ref="Matthiessen2007" title="Source 352">352</sup>`,
  pt:`Most people are joined back up. After a very low join, a temporary bag rests the join while it heals and makes a dangerous leak less likely.`,
  hook:`Defunctioning stoma after low anterior resection: symptomatic leak 28.0% → 10.3% (OR 3.4). <sup class="c" data-ref="Matthiessen2007" title="Source 352">352</sup>`}
];
const SU_TSTEPS=[
 {from:0,at:.1,k:'Anatomy',t:'The rectum in its envelope',
  txt:`The rectum is wrapped in a cuff of fat, the mesorectum, that carries its lymph nodes and is bounded by a thin fascia. In 1982 Heald found minute deposits of cancer in the mesorectum several centimetres below the visible lower edge of the tumour in 5 cases, and began removing the whole mesorectum. <sup class="c" data-ref="Heald1982" title="Source 229">229</sup>`,
  pt:`The back passage sits inside a fatty sleeve. Cancer can spread into that sleeve, so the whole sleeve is taken.`,
  hook:`TME = sharp dissection removing the rectum with its intact mesorectal envelope. <sup class="c" data-ref="Heald1986" title="Source 230">230</sup>`},
 {from:.2,at:.38,k:'Tumour growth',t:'T3: through the wall into the fat',
  txt:`A T3 tumour grows through the muscle into the mesorectal fat. The distance left between tumour and fascia predicts the circumferential margin. In MERCURY (408 people), MRI predicted a clear margin with 92% specificity: 327 of the 349 cases MRI called clear were clear at surgery. <sup class="c" data-ref="MERCURY2006" title="Source 360">360</sup>`,
  pt:`The scan before surgery shows how close the tumour is to the edge of the sleeve. That shapes the whole plan.`,
  hook:`MRI-predicted CRM is the key measurement on rectal staging MRI (MERCURY: specificity 92%). <sup class="c" data-ref="MERCURY2006" title="Source 360">360</sup>`},
 {from:.45,at:.56,k:'The operation',t:'Dissecting in the "holy plane"',
  txt:`The surgeon cuts along the shiny plane just outside the fascia, so the envelope comes out whole. In Heald's series, an average of 4.2 years after TME there were 3 pelvic recurrences and no staple-line recurrences after curative surgery; corrected 5-year survival was 87%. With the mesorectum intact, the distal margin on the bowel could often be short enough to save the sphincters (39 had margins under 2.5 cm). <sup class="c" data-ref="Heald1986" title="Source 230">230</sup>`,
  pt:`The surgeon follows a natural layer around the fatty sleeve, like peeling an orange with its pith intact.`,
  hook:`Heald 1986: 87% corrected 5-year survival after TME; no staple-line recurrences. <sup class="c" data-ref="Heald1986" title="Source 230">230</sup>`},
 {from:.65,at:.76,k:'Pathology',t:'Ink the surface, measure the margin',
  txt:`The pathologist inks the outer surface of the specimen and slices it across. In Quirke's 1986 study of 52 rectal cancers, tumour reached the circumferential margin in 14 (27%), and 12 of those 14 developed pelvic recurrence. As a predictor of recurrence, margin involvement had a sensitivity of 95% and a specificity of 92%. The pathologist also grades the mesorectum as complete or not. <sup class="c" data-ref="Quirke1986,Nagtegaal2002" title="Source 386,444">386,444</sup>`,
  pt:`If cancer cells touch the inked edge, some may have been left behind.`,
  hook:`Quirke 1986: involved CRM in 14/52; 12 of 14 recurred in the pelvis. <sup class="c" data-ref="Quirke1986" title="Source 444">444</sup>`},
 {from:.85,at:.95,k:'Why it matters',t:'Margin and plane predict recurrence',
  txt:`Across more than 17,500 patients, an involved CRM predicted local recurrence (HR 6.3 after neoadjuvant therapy, 2.0 without), distant metastases (HR 2.8) and survival (HR 1.7). In the Dutch TME trial, recurrence was 36.1% with an incomplete mesorectum vs 20.3% with a complete one. In ACOSOG Z6051, a positive CRM worsened disease-free survival (HR 2.31). <sup class="c" data-ref="Nagtegaal2008,Nagtegaal2002,Fleshman2019" title="Source 187,386,387">187,386,387</sup>`,
  pt:`A clean edge and an intact sleeve are the best protection against the cancer coming back in the pelvis.`,
  hook:`Involved CRM after neoadjuvant therapy: local recurrence HR 6.3. <sup class="c" data-ref="Nagtegaal2008" title="Source 387">387</sup>`}
];

inits.surgery=()=>{
  /* ---------------- 1. the operation by site ---------------- */
  const svg=$('#suSvg'),rg=$('#suT');let site='right',setSt=()=>{};
  const qp=(a,c,b,f)=>[ (1-f)*(1-f)*a[0]+2*(1-f)*f*c[0]+f*f*b[0], (1-f)*(1-f)*a[1]+2*(1-f)*f*c[1]+f*f*b[1] ];
  function draw(t){
    const N=vb(svg,'720 330','400 540');const O=SU_OPS[site],ph=phaseOf(SU_STEPS,t);
    const G=N?{x:56,y:44,s:.96,px:20,py:340,pw:360}:{x:44,y:46,s:1,px:396,py:40,pw:316};
    const S=G.s,W=20*S,C=colon(G.x,G.y,S,{w:W}),A=(a,b)=>[G.x+a*300*S,G.y+b*240*S];
    const kV=ramp(t,.18,.34),kN=ramp(t,.38,.54),kR=ease(ramp(t,.6,.76)),kJ=ramp(t,.8,.94);
    let s=`<defs>${marker('suAr','var(--muted)')}</defs>`;
    /* abdominal wall */
    const ab=[A(-.12,-.1),A(1.1,1.14)];
    s+=`<rect x="${f1(ab[0][0])}" y="${f1(ab[0][1])}" width="${f1(ab[1][0]-ab[0][0])}" height="${f1(ab[1][1]-ab[0][1])}" rx="38" style="fill:none;stroke:var(--line);stroke-width:2;stroke-dasharray:6 5"/>`;
    s+=`<text x="${f1(ab[0][0]+8)}" y="${f1(ab[0][1]-6)}" class="t-xs">patient's right</text><text x="${f1(ab[1][0]-8)}" y="${f1(ab[0][1]-6)}" class="t-xs t-end">patient's left</text>`;
    /* aorta and origins */
    const S0=A(.43,.17),I0=A(.43,.47),B0=A(.5,.6);
    s+=`<line x1="${f1(A(.43,.02)[0])}" y1="${f1(A(.43,.02)[1])}" x2="${f1(A(.43,.86)[0])}" y2="${f1(A(.43,.86)[1])}" style="stroke:var(--vessel);stroke-width:${f1(7*S)};stroke-linecap:round;opacity:.55"/>`;
    s+=`<text x="${f1(A(.43,.86)[0])}" y="${f1(A(.43,.86)[1]+14)}" class="t-xs t-mid">aorta</text>`;
    const org={S:S0,I:I0,B:B0};
    const vEnd=u=>{const p=C.at(u),c=[G.x+150*S,G.y+120*S],d=Math.hypot(c[0]-p[0],c[1]-p[1])||1;return[p[0]+(c[0]-p[0])/d*W*.55,p[1]+(c[1]-p[1])/d*W*.55]};
    const vPath=n=>{const v=SU_V[n],o=org[v.o],e=vEnd(v.u),c=[o[0]+(e[0]-o[0])*.25,o[1]+(e[1]-o[1])*.85];return{o,c,e}};
    const cut=O.cut,inSpec=n=>cut.includes(n);
    /* bowel (with the gap once the specimen is lifted) */
    if(O.ileum||site==='right'){}
    const il0=A(.3,1.0),ilC=A(.12,1.02),il1=A(.035,.86);
    const ileumPath=`M${f1(il0[0])} ${f1(il0[1])}Q${f1(ilC[0])} ${f1(ilC[1])} ${f1(il1[0])} ${f1(il1[1])}`;
    s+=`<path d="${ileumPath}" style="fill:none;stroke:var(--mucosa-line);stroke-width:${f1(W*.7+3)};stroke-linecap:round"/><path d="${ileumPath}" style="fill:none;stroke:var(--mucosa);stroke-width:${f1(W*.7)};stroke-linecap:round"/>`;
    if(!N||true)s+=`<text x="${f1(il0[0]+6)}" y="${f1(il0[1]+4)}" class="t-xs">ileum</text>`;
    s+=C.svg;
    const segPath=(u0,u1)=>{let d='';for(let i=0;i<=30;i++){const p=C.at(lerp(u0,u1,i/30));d+=(i?'L':'M')+f1(p[0])+' '+f1(p[1])}return d};
    /* anus marker */
    const an=C.at(1);s+=`<text x="${f1(an[0]+W*.8)}" y="${f1(an[1]+3)}" class="t-xs">anus</text>`;
    /* vessels not in the specimen */
    Object.keys(SU_V).forEach(n=>{if(inSpec(n)&&kR>0)return;const P=vPath(n);s+=`<path d="M${f1(P.o[0])} ${f1(P.o[1])}Q${f1(P.c[0])} ${f1(P.c[1])} ${f1(P.e[0])} ${f1(P.e[1])}" style="fill:none;stroke:var(--vessel);stroke-width:${f1(2.6*S)};stroke-linecap:round"/>`});
    if(!(inSpec('trunk')&&kR>0))s+=`<line x1="${f1(I0[0])}" y1="${f1(I0[1])}" x2="${f1(B0[0])}" y2="${f1(B0[1])}" style="stroke:var(--vessel);stroke-width:${f1(3.4*S)};stroke-linecap:round"/>`;
    else s+=`<line x1="${f1(I0[0])}" y1="${f1(I0[1])}" x2="${f1(lerp(I0[0],B0[0],.4))}" y2="${f1(lerp(I0[1],B0[1],.4))}" style="stroke:var(--vessel);stroke-width:${f1(3.4*S)};stroke-linecap:round"/>`;
    s+=`<text x="${f1(S0[0]+7)}" y="${f1(S0[1]-4)}" class="t-xs" style="fill:var(--vessel)">SMA</text><text x="${f1(I0[0]-7)}" y="${f1(I0[1]-3)}" class="t-xs t-end" style="fill:var(--vessel)">IMA</text>`;
    /* ties */
    const tiePts=O.ties.map(n=>{if(n==='IMA')return[lerp(I0[0],B0[0],.42),lerp(I0[1],B0[1],.42),Math.atan2(B0[1]-I0[1],B0[0]-I0[0])];const P=vPath(n),p=qp(P.o,P.c,P.e,.16),q=qp(P.o,P.c,P.e,.2);return[p[0],p[1],Math.atan2(q[1]-p[1],q[0]-p[0])]});
    /* the specimen: field, segment, cut vessels, nodes, tumour */
    const u0=O.seg[0],u1=O.seg[1],tp=tiePts[0];
    let sp='';
    if(kN>0){let d=`M${f1(tp[0])} ${f1(tp[1])}`;for(let i=0;i<=24;i++){const p=C.at(lerp(u0,u1,i/24));d+=`L${f1(p[0])} ${f1(p[1])}`}
      tiePts.slice(1).forEach(q=>d+=`L${f1(q[0])} ${f1(q[1])}`);
      sp+=`<path d="${d}Z" style="fill:var(--lymph-soft);stroke:var(--lymph);stroke-width:1.4;stroke-dasharray:4 3;opacity:${f1(.25+.6*kN)}"/>`}
    if(kR>0){sp+=`<path d="${segPath(u0,u1)}" style="fill:none;stroke:var(--mucosa-line);stroke-width:${f1(W+3)};stroke-linecap:round;stroke-linejoin:round"/><path d="${segPath(u0,u1)}" style="fill:none;stroke:var(--mucosa);stroke-width:${f1(W)};stroke-linecap:round;stroke-linejoin:round"/>`;
      if(site==='right'){const c=C.at(0);sp+=`<circle cx="${f1(c[0])}" cy="${f1(c[1]+W*.3)}" r="${f1(W*.62)}" style="fill:var(--mucosa);stroke:var(--mucosa-line);stroke-width:1.5"/><path d="M${f1(A(.13,1.01)[0])} ${f1(A(.13,1.01)[1])}Q${f1(A(.07,.98)[0])} ${f1(A(.07,.98)[1])} ${f1(il1[0])} ${f1(il1[1])}" style="fill:none;stroke:var(--mucosa);stroke-width:${f1(W*.7)};stroke-linecap:round"/>`}
      cut.forEach(n=>{if(n==='trunk'){sp+=`<line x1="${f1(lerp(I0[0],B0[0],.46))}" y1="${f1(lerp(I0[1],B0[1],.46))}" x2="${f1(B0[0])}" y2="${f1(B0[1])}" style="stroke:var(--vessel);stroke-width:${f1(3.4*S)};stroke-linecap:round"/>`;return}
        const P=vPath(n),p=qp(P.o,P.c,P.e,.22);sp+=`<path d="M${f1(p[0])} ${f1(p[1])}Q${f1(lerp(p[0],P.c[0],.6))} ${f1(lerp(p[1],P.c[1],.6))} ${f1(P.e[0])} ${f1(P.e[1])}" style="fill:none;stroke:var(--vessel);stroke-width:${f1(2.6*S)};stroke-linecap:round"/>`})}
    if(kN>0){const rr=rng(7+u0*100);const nn=[];
      cut.forEach(n=>{if(n==='trunk'){nn.push([lerp(I0[0],B0[0],.75),lerp(I0[1],B0[1],.75)]);return}const P=vPath(n);[.4,.65,.88].forEach(f=>{const p=qp(P.o,P.c,P.e,f);nn.push([p[0]+(rr()-.5)*8,p[1]+(rr()-.5)*8])})});
      for(let i=0;i<3;i++){const p=C.at(lerp(u0,u1,.2+i*.3)),d=Math.hypot(tp[0]-p[0],tp[1]-p[1])||1;nn.push([p[0]+(tp[0]-p[0])/d*W*1.1,p[1]+(tp[1]-p[1])/d*W*1.1])}
      nn.forEach((p,i)=>{const show=ramp(kN,i/nn.length*.7,i/nn.length*.7+.3);if(show>0)sp+=node(p[0],p[1],5.5*S*show,i===nn.length-2&&kN>.9?.6:0)})}
    {const p=C.at(O.tu);sp+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="${f1(W*.62*(1+.12*Math.sin(t*40)*(ph===0?1:0)))}" style="fill:var(--tumour);stroke:var(--panel);stroke-width:1.5"/>`}
    /* gap left in the bowel, then the specimen lifted away */
    if(kR>0){s+=`<path d="${segPath(u0+.006,Math.min(1,u1-.004))}" style="fill:none;stroke:var(--panel);stroke-width:${f1(W+6)};stroke-linecap:butt;stroke-linejoin:round"/>`;
      if(site==='right'){const c=C.at(0);s+=`<circle cx="${f1(c[0])}" cy="${f1(c[1]+W*.3)}" r="${f1(W*.62+3)}" style="fill:var(--panel)"/><path d="M${f1(A(.14,1.012)[0])} ${f1(A(.14,1.012)[1])}Q${f1(A(.07,.98)[0])} ${f1(A(.07,.98)[1])} ${f1(il1[0])} ${f1(il1[1])}" style="fill:none;stroke:var(--panel);stroke-width:${f1(W*.7+6)}"/>`}
      if(O.recon==='apr')s+=`<circle cx="${f1(an[0])}" cy="${f1(an[1])}" r="${f1(W*.7)}" style="fill:var(--panel)"/>`;
      /* dashed ghost where the segment was */
      s+=`<path d="${segPath(u0,u1)}" style="fill:none;stroke:var(--muted);stroke-width:1;stroke-dasharray:3 4;opacity:${f1(.6*kR)}"/>`}
    const mid=C.at((u0+u1)/2),cx=G.x+150*S,cy=G.y+120*S,dd=Math.hypot(mid[0]-cx,mid[1]-cy)||1;
    const dx=(mid[0]-cx)/dd*16*kR,dy=(mid[1]-cy)/dd*16*kR+(site==='lar'||site==='apr'||site==='upper'?26*kR:14*kR);
    s+=`<g transform="translate(${f1(dx)} ${f1(dy)})" style="opacity:${f1(1-.15*kR)}">${sp}</g>`;
    if(kR>.6){s+=`<text x="${f1(mid[0]+dx)}" y="${f1(mid[1]+dy+(mid[1]<G.y+40?-W-4:W+14))}" class="t-xs t-mid" style="fill:var(--ink)">specimen</text>`}
    /* ties drawn on top */
    if(kV>0)tiePts.forEach(p=>{const a=p[2]+Math.PI/2,L=7*S,o=Math.cos(p[2])*3,q=Math.sin(p[2])*3;
      [-1,1].forEach(k=>s+=`<line x1="${f1(p[0]+k*o-Math.cos(a)*L*kV)}" y1="${f1(p[1]+k*q-Math.sin(a)*L*kV)}" x2="${f1(p[0]+k*o+Math.cos(a)*L*kV)}" y2="${f1(p[1]+k*q+Math.sin(a)*L*kV)}" style="stroke:var(--ink);stroke-width:2.4;stroke-linecap:round"/>`)});
    /* reconstruction */
    if(kJ>0){const e0=O.ileum?A(.14,1.012):C.at(u0),e1=O.recon==='apr'?A(.98,.98):C.at(Math.min(1,u1)),mm=[(e0[0]+e1[0])/2,(e0[1]+e1[1])/2+(O.recon==='apr'?0:18)];
      const bp=`M${f1(e0[0])} ${f1(e0[1])}Q${f1(mm[0])} ${f1(mm[1])} ${f1(e1[0])} ${f1(e1[1])}`,len=Math.hypot(e1[0]-e0[0],e1[1]-e0[1])*1.2+20;
      s+=`<path d="${bp}" style="fill:none;stroke:var(--mucosa-line);stroke-width:${f1(W*.75+3)};stroke-linecap:round;stroke-dasharray:${f1(len*kJ)} ${f1(len)}"/><path d="${bp}" style="fill:none;stroke:var(--mucosa);stroke-width:${f1(W*.75)};stroke-linecap:round;stroke-dasharray:${f1(len*kJ)} ${f1(len)}"/>`;
      if(kJ>.95){if(O.recon==='apr'){s+=`<circle cx="${f1(e1[0])}" cy="${f1(e1[1])}" r="${f1(W*.55)}" style="fill:var(--brand-soft);stroke:var(--brand);stroke-width:2"/><text x="${f1(e1[0]-4)}" y="${f1(e1[1]+W+12)}" class="t-xs t-end" style="fill:var(--brand)">end colostomy</text>`;
          s+=`<path d="M${f1(an[0]-6)} ${f1(an[1]-6)}l12 12M${f1(an[0]+6)} ${f1(an[1]-6)}l-12 12" style="stroke:var(--bad);stroke-width:2.2"/><text x="${f1(an[0]-10)}" y="${f1(an[1]+4)}" class="t-xs t-end" style="fill:var(--bad)">anus closed</text>`}
        else{const j=O.ileum?e1:e1;s+=`<circle cx="${f1(j[0])}" cy="${f1(j[1])}" r="${f1(W*.5)}" style="fill:none;stroke:var(--rx);stroke-width:2;stroke-dasharray:2 2"/>`;
          s+=`<text x="${f1(j[0]+(j[0]>cx?-W:W))}" y="${f1(j[1]+(j[1]>cy?W+8:W+16))}" class="t-xs${j[0]>cx?' t-end':''}" style="fill:var(--rx)">anastomosis</text>`}
        if(O.recon==='lar'){const st=A(.05,1.0);s+=`<circle cx="${f1(st[0])}" cy="${f1(st[1])}" r="${f1(W*.5)}" style="fill:var(--brand-soft);stroke:var(--brand);stroke-width:2"/><text x="${f1(st[0])}" y="${f1(st[1]+W+10)}" class="t-xs t-mid" style="fill:var(--brand)">loop ileostomy</text>`}}}
    /* ---- information panel ---- */
    let y=G.py;const px=G.px,cw=N?40:33;
    s+=`<text x="${px}" y="${y}" class="t-sm" style="fill:var(--rx)">${O.site.toUpperCase()}</text>`;y+=22;
    s+=`<text x="${px}" y="${y}" class="t-big">${O.op}</text>`;y+=N?18:24;
    const rows=[[kV,'Tie',O.ties.map(n=>n==='IMA'?'inferior mesenteric (IMA) trunk':n+' vessels').join(' + ')+', at the root'],[kN,'Nodes','the fan of fat and nodes along the tied vessels'],[kR,'Remove',site==='right'?'caecum, ascending colon, end of ileum':site==='lar'?'rectum with the whole mesorectum (TME)':site==='apr'?'rectum, anal canal and sphincters':site==='upper'?'sigmoid end + upper rectum and its mesorectum':'the '+O.site.toLowerCase()+' with its mesentery'],[kJ,'Rebuild',O.reconTxt]];
    rows.forEach(([k,h,v])=>{const on=k>0;s+=`<text x="${px}" y="${y}" class="t-sm" style="fill:${on?'var(--rx)':'var(--muted)'};font-weight:700">${on?'✓':'○'} ${h.toUpperCase()}</text>`;
      suWrap(v,cw).forEach((l,i)=>{s+=`<text x="${px+80}" y="${y+i*15}" class="t-sm" style="fill:${on?'var(--ink)':'var(--muted)'};opacity:${on?1:.6}">${l}</text>`;});y+=15*Math.max(1,suWrap(v,cw).length)+(N?7:10)});
    y+=N?2:8;
    s+=`<rect x="${px}" y="${y}" width="${G.pw}" height="${N?30:34}" rx="8" style="fill:var(--rx-soft)"/><text x="${px+10}" y="${y+(N?19:21)}" class="t-sm" style="fill:var(--rx)">${O.key}</text>`;
    svg.innerHTML=s;
    setSt(ph);
    const P=SU_STEPS[ph];
    $('#suNote').innerHTML=noteHTML(P);
    $('#suRead').innerHTML=`<span>${O.read}</span>`;
  }
  const stop=playWire(rg,$('#suPlay'),draw,16000,'Replay','surgery');
  setSt=stepWire($('#suSteps'),SU_STEPS,rg,draw,stop);
  $$('[data-su-site]').forEach(b=>b.addEventListener('click',()=>{stop();site=b.dataset.suSite;$$('[data-su-site]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---------------- 2. TME cross-section ---------------- */
  const tv=$('#suTme'),tr=$('#suTmeT');let mode='clear',breach=false,setT=()=>{};
  function drawT(t){
    const N=vb(tv,'720 340','400 580');const ph=phaseOf(SU_TSTEPS,t);
    const cx=N?200:200,cy=N?176:168,FX=N?128:132,FY=N?100:104,RW=46,RM=33,RL=20;
    const kG=ease(ramp(t,.2,.42)),kD=ramp(t,.45,.6),kP=ramp(t,.65,.78),kW=ramp(t,.85,.95);
    const ta=-Math.PI*.74,tw=.62;/* tumour centred toward the front-left */
    const fR=a=>1/Math.sqrt(Math.pow(Math.cos(a)/FX,2)+Math.pow(Math.sin(a)/FY,2));
    const maxD=mode==='threat'?fR(ta)-RM-1:fR(ta)-RM-22;
    const depth=lerp(4,maxD,kG);
    const mmPer=.2,crm=Math.max(0,(fR(ta)-RM-depth)*mmPer);
    let s='';
    /* pelvis: sacrum behind (bottom), side walls */
    s+=`<path d="M${cx-FX-34} ${cy+FY+44}Q${cx} ${cy+FY+6} ${cx+FX+34} ${cy+FY+44}L${cx+FX+34} ${cy+FY+66}Q${cx} ${cy+FY+28} ${cx-FX-34} ${cy+FY+66}Z" style="fill:var(--serosa);stroke:var(--muted);stroke-width:1"/>`;
    s+=`<text x="${cx}" y="${cy+FY+58}" class="t-xs t-mid">sacrum (back)</text><text x="${cx}" y="${cy-FY-22}" class="t-xs t-mid">front (bladder, prostate or vagina)</text>`;
    /* mesorectum + fascia, with a breach notch */
    const bA=Math.PI*.18;
    let mp='';for(let i=0;i<=72;i++){const a=i/72*Math.PI*2;let r=fR(a);if(breach&&kD>0){const da=Math.atan2(Math.sin(a-bA),Math.cos(a-bA));if(Math.abs(da)<.32)r-=(1-Math.abs(da)/.32)*30*Math.min(1,kD*2)}mp+=(i?'L':'M')+f1(cx+Math.cos(a)*r)+' '+f1(cy+Math.sin(a)*r)}
    const sx=(kP>0?-(N?0:0):0);
    if(breach&&kD>0){/* fat left behind in the pelvis */let lb='';for(let i=0;i<=20;i++){const a=bA-.32+i/20*.64,r=fR(a);lb+=(i?'L':'M')+f1(cx+Math.cos(a)*r)+' '+f1(cy+Math.sin(a)*r)}
      for(let i=20;i>=0;i--){const a=bA-.32+i/20*.64,da=Math.atan2(Math.sin(a-bA),Math.cos(a-bA)),r=fR(a)-(1-Math.abs(da)/.32)*30*Math.min(1,kD*2);lb+='L'+f1(cx+Math.cos(a)*r)+' '+f1(cy+Math.sin(a)*r)}
      s+=`<path d="${lb}Z" style="fill:var(--fat);stroke:var(--bad);stroke-width:1.4"/>`;
      const la=bA,lr=fR(la)+12;s+=`<text x="${f1(cx+Math.cos(la)*lr+4)}" y="${f1(cy+Math.sin(la)*lr+4)}" class="t-xs" style="fill:var(--bad)">${N?'fat left behind':'mesorectum left behind'}</text>`}
    s+=`<path d="${mp}Z" style="fill:var(--fat);stroke:${kP>0?'var(--accent)':'var(--muted)'};stroke-width:${kP>0?f1(1.2+3*kP):1.2}"/>`;
    if(kP>0)s+=`<text x="${f1(cx-FX-6)}" y="${f1(cy-FY*.55)}" class="t-xs t-end" style="fill:var(--accent)">ink</text>`;
    /* nodes */
    const nodes=[[-.75,.55],[.65,.6],[.2,-.72],[-.15,.78],[.8,-.2],[-.85,-.1]];
    nodes.forEach(([a,b],i)=>{const x=cx+a*FX*.82,y=cy+b*FY*.82;s+=node(x,y,7,mode==='threat'&&i===5&&kG>.7?.7:0)});
    /* rectal wall layers */
    s+=`<circle cx="${cx}" cy="${cy}" r="${RW}" style="fill:var(--muscle);opacity:.85;stroke:var(--mucosa-line);stroke-width:1"/><circle cx="${cx}" cy="${cy}" r="${RM}" style="fill:var(--mucosa);stroke:var(--mucosa-line)"/><circle cx="${cx}" cy="${cy}" r="${RL}" style="fill:var(--field)"/>`;
    /* tumour wedge */
    {let d='';const rr=rng(9),n=16;for(let i=0;i<=n;i++){const a=ta-tw/2+i/n*tw,bump0=Math.sin(i/n*Math.PI),r=RM+depth*(0.55+.45*bump0)*(1+(rr()-.5)*.12);d+=(i?'L':'M')+f1(cx+Math.cos(a)*r)+' '+f1(cy+Math.sin(a)*r)}
      for(let i=n;i>=0;i--){const a=ta-tw/2+i/n*tw;d+='L'+f1(cx+Math.cos(a)*(RL+3))+' '+f1(cy+Math.sin(a)*(RL+3))}
      s+=`<path d="${d}Z" style="fill:var(--tumour);opacity:.9;stroke:var(--tumour);stroke-linejoin:round"/>`}
    /* dissection line traced around the fascia */
    if(kD>0){let dp='';for(let i=0;i<=72;i++){const a=Math.PI/2+i/72*Math.PI*2;let r=fR(a)+5;if(breach){const da=Math.atan2(Math.sin(a-bA),Math.cos(a-bA));if(Math.abs(da)<.32)r-=(1-Math.abs(da)/.32)*35}dp+=(i?'L':'M')+f1(cx+Math.cos(a)*r)+' '+f1(cy+Math.sin(a)*r)}
      const L=2*Math.PI*Math.max(FX,FY)+60;s+=`<path d="${dp}" style="fill:none;stroke:${breach?'var(--bad)':'var(--rx)'};stroke-width:2;stroke-dasharray:${f1(L*kD)} ${f1(L)}"/>`;
      const sc=[cx+Math.cos(Math.PI/2+kD*Math.PI*2)*(fR(Math.PI/2+kD*Math.PI*2)+5),cy+Math.sin(Math.PI/2+kD*Math.PI*2)*(fR(Math.PI/2+kD*Math.PI*2)+5)];
      if(kD<1)s+=`<circle cx="${f1(sc[0])}" cy="${f1(sc[1])}" r="4" style="fill:var(--rx)"/>`}
    /* margin ruler */
    if(kG>.3){const r1=RM+depth,r2=fR(ta),p1=[cx+Math.cos(ta)*r1,cy+Math.sin(ta)*r1],p2=[cx+Math.cos(ta)*r2,cy+Math.sin(ta)*r2];
      s+=`<line x1="${f1(p1[0])}" y1="${f1(p1[1])}" x2="${f1(p2[0])}" y2="${f1(p2[1])}" style="stroke:var(--ink);stroke-width:1.4"/><circle cx="${f1(p2[0])}" cy="${f1(p2[1])}" r="2.5" style="fill:var(--ink)"/>`;
      s+=`<text x="${f1(p2[0]-6)}" y="${f1(p2[1]-6)}" class="t-sm t-end" style="fill:${crm<=1?'var(--bad)':'var(--ink)'}">CRM ${crm<=.05?'0':f1(crm)} mm</text>`}
    /* labels */
    if(!N||true){s+=`<text x="${cx}" y="${cy+4}" class="t-xs t-mid">lumen</text>`;
      const la=Math.PI*.82,lr=FX*.98;s+=`<text x="${f1(cx+Math.cos(la)*lr-8)}" y="${f1(cy+Math.sin(la)*lr+30)}" class="t-xs t-end">mesorectum</text>`;
      s+=`<text x="${f1(cx+FX+8)}" y="${f1(cy+6)}" class="t-xs">fascia</text>`}
    /* side panel */
    const px=N?20:400,py=N?378:36,pw=N?360:300;let y=py;
    s+=`<text x="${px}" y="${y}" class="t-sm" style="fill:var(--rx)">${SU_TSTEPS[ph].k.toUpperCase()}</text>`;y+=24;
    const verdict=crm<=1?(mode==='threat'?'CRM involved (≤1 mm)':'margin narrowing'):'CRM clear';
    s+=`<text x="${px}" y="${y}" class="t-big" style="fill:${crm<=1&&mode==='threat'?'var(--bad)':'var(--ink)'}">${kG>.3?verdict:'Rectum, mesorectum, fascia'}</text>`;y+=22;
    s+=`<text x="${px}" y="${y}" class="t-xs">plane: ${breach?'breached (incomplete mesorectum)':'intact (complete mesorectum)'}</text>`;y+=24;
    if(ph>=3){/* Quirke: 14 margin-positive cases, 12 recurred */
      s+=`<text x="${px}" y="${y}" class="t-xs" style="fill:var(--ink)">Quirke 1986: 14 of 52 had an involved margin;</text>`;y+=13;s+=`<text x="${px}" y="${y}" class="t-xs" style="fill:var(--ink)">12 of those 14 recurred in the pelvis</text>`;y+=12;
      const n=Math.round(14*(ph===3?kP:1));for(let i=0;i<14;i++){const x=px+8+i*(N?24:20);s+=person(x,y,16,i<n?(i<12?'var(--bad)':'var(--good)'):'var(--line)')}y+=32}
    if(ph>=4){const bars=breach?[['incomplete mesorectum',36.1,'var(--bad)'],['complete mesorectum',20.3,'var(--good)']]:[['CRM involved, after neoadjuvant Rx','HR 6.3','var(--bad)'],['CRM involved, no neoadjuvant Rx','HR 2.0','var(--warn)']];
      s+=`<text x="${px}" y="${y}" class="t-xs" style="fill:var(--ink)">${breach?'Dutch TME trial: recurrence':'Local recurrence risk, involved vs clear CRM'}</text>`;y+=8;
      bars.forEach(([l,v,c])=>{const w=(pw-10)*(typeof v==='number'?v/40:(parseFloat(v.slice(3))/7))*kW;s+=`<rect x="${px}" y="${y}" width="${f1(Math.max(2,w))}" height="14" rx="3" style="fill:${c};opacity:.8"/><text x="${px+4}" y="${y+26}" class="t-xs">${l}: <tspan style="fill:var(--ink);font-weight:700">${typeof v==='number'?v+'%':v}</tspan></text>`;y+=34})}
    tv.innerHTML=s;setT(ph);$('#suTmeNote').innerHTML=noteHTML(SU_TSTEPS[ph]);
  }
  const stopT=playWire(tr,$('#suTmePlay'),drawT,14000,'Replay','surgery');
  setT=stepWire($('#suTmeSteps'),SU_TSTEPS,tr,drawT,stopT);
  $$('[data-su-tme]').forEach(b=>b.addEventListener('click',()=>{stopT();mode=b.dataset.suTme;$$('[data-su-tme]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawT(+tr.value)}));
  $('#suBreach').addEventListener('click',()=>{breach=!breach;$('#suBreach').setAttribute('aria-pressed',breach);drawT(+tr.value)});
  drawT(+tr.value);

  /* ---------------- 3. leaks and stomas: 100 people ---------------- */
  const LK={noStoma:{v:28.0,c:'var(--bad)',w:'symptomatic anastomotic leak',t:'Low join without a defunctioning stoma',
     txt:`In the Swedish randomised trial (234 people having low anterior resection; median join 5 cm from the anal verge; 79% had radiotherapy first), 28.0% of those without a defunctioning stoma had a symptomatic leak, and 25.4% needed urgent reoperation. <sup class="c" data-ref="Matthiessen2007" title="Source 352">352</sup>`,pt:`About 28 in 100 had a leak from the join when it was not protected.`},
   stoma:{v:10.3,c:'var(--bad)',w:'symptomatic anastomotic leak',t:'Low join protected by a loop stoma',
     txt:`With a temporary defunctioning stoma, symptomatic leaks fell to 10.3% (OR 3.4; 95% CI 1.6–6.9) and urgent reoperation to 8.6%. The stoma is usually closed later; at a median 42 months, 13.8% of this group still had a stoma of some kind. <sup class="c" data-ref="Matthiessen2007" title="Source 352">352</sup>`,pt:`A temporary bag cut leaks to about 10 in 100.`},
   emerg:{v:67.9,c:'var(--brand)',w:'had a stoma formed',t:'Obstructing cancer: emergency surgery',
     txt:`In CReST (245 people with left-sided malignant obstruction), 67.9% of those treated with curative intent who went straight to emergency surgery had a stoma formed. 30-day mortality was 5.6%. <sup class="c" data-ref="CReST2022" title="Source 115">115</sup>`,pt:`About 68 in 100 needed a stoma when the blocked bowel was operated on as an emergency.`},
   stent:{v:47.5,c:'var(--brand)',w:'had a stoma formed',t:'Obstructing cancer: stent, then planned surgery',
     txt:`A stent relieved obstruction in 82.4% of attempts. Stent-then-elective surgery led to a stoma in 47.5% (P=.003 vs emergency surgery), with 30-day mortality 3.6% (not significantly different) and no difference in 3-year recurrence. <sup class="c" data-ref="CReST2022" title="Source 115">115</sup>`,pt:`A stent first meant fewer people needed a stoma: about 48 in 100.`}};
  const lv=$('#suLeak');let lk='noStoma',stopL=null;
  function drawL(k){const N=vb(lv,'520 200','400 300'),D=LK[lk],n=Math.round(D.v);let s='';const cols=N?10:20,sz=N?22:18,gx=N?36:24,gy=N?26:30,x0=N?14:22,y0=N?40:40;
    s+=`<text x="${x0}" y="22" class="t-sm" style="fill:${D.c}">${f1(D.v)} IN 100 ${D.w.toUpperCase()}</text>`;
    for(let i=0;i<100;i++){const r=Math.floor(i/cols),c=i%cols,on=i<n*k;s+=person(x0+gx*c+gx/2,y0+r*gy,sz,on?D.c:'var(--line)')}
    lv.innerHTML=s}
  function showL(){$('#suLeakNote').innerHTML=noteHTML({k:'Trial arm',t:LK[lk].t,txt:LK[lk].txt,pt:LK[lk].pt,hook:lk==='noStoma'||lk==='stoma'?'Defunctioning stoma after low anterior resection: leak 28.0% → 10.3%. <sup class="c" data-ref="Matthiessen2007" title="Source 352">352</sup>':'CReST: stent as a bridge cut stoma formation from 67.9% to 47.5%. <sup class="c" data-ref="CReST2022" title="Source 115">115</sup>'});
    if(stopL)stopL();stopL=animate(900,p=>drawL(ease(p)))}
  $$('[data-su-leak]').forEach(b=>b.addEventListener('click',()=>{lk=b.dataset.suLeak;$$('[data-su-leak]').forEach(x=>x.setAttribute('aria-pressed',x===b));showL()}));
  drawL(1);showL();
  onHide.surgery=(f=>()=>{f&&f();if(stopL)stopL()})(onHide.surgery);
  const prevR=redraws.surgery;redraws.surgery=()=>{prevR&&prevR();drawL(1);drawH()};

  /* ---------------- 4. Haggitt levels ---------------- */
  const hv=$('#suHag');let lev=4;
  const HG=[{n:'Level 0',t:'Carcinoma confined to the mucosa',d:'Intramucosal carcinoma: none of 65 patients with carcinoma confined to the mucosa had an adverse outcome over a mean 81 months.',pt:'Cancer cells are still only in the surface layer of the polyp. Removing the polyp is expected to be enough.'},
   {n:'Level 1',t:'Invasion into the head',d:'Carcinoma has crossed into the submucosa of the polyp head. Of 64 patients with invasive carcinoma, 8 had an adverse outcome overall.',pt:'The cancer has gone a little deeper, but is still in the top of the polyp.'},
   {n:'Level 2',t:'Invasion to the neck',d:'Invasion reaches the junction of head and stalk. Level 4 invasion and rectal location were the only significant adverse factors.',pt:'The cancer reaches where the head meets the stalk.'},
   {n:'Level 3',t:'Invasion into the stalk',d:'Invasion reaches the stalk but not the bowel wall below it.',pt:'The cancer is in the stalk, still above the bowel wall.'},
   {n:'Level 4',t:'Invasion into the bowel wall',d:'Invasion reaches the submucosa of the bowel wall below the stalk (as in any sessile polyp with invasion). Seven of 28 level-4 lesions had an adverse outcome. With rectal location, this was the only significant adverse factor.',pt:'The cancer has reached the bowel wall under the polyp. Surgery to remove that part of the bowel is usually discussed.'}];
  function drawH(){const N=vb(hv,'520 300','400 330');let s='';const cx=N?150:170,base=N?222:206,W0=N?250:280,x0=cx-W0/2;
    const w=wall(x0,base,W0,{h:N?100:90,labels:false});s+=w.svg;
    const hy=N?92:84,hr=N?62:64,hh=N?48:46,neck=hy+hh*.78;
    /* stalk */
    s+=`<path d="M${cx-14} ${base}C${cx-12} ${base-30} ${cx-16} ${neck+20} ${cx-22} ${neck}L${cx+22} ${neck}C${cx+16} ${neck+20} ${cx+12} ${base-30} ${cx+14} ${base}Z" style="fill:var(--submucosa);stroke:var(--mucosa-line);stroke-width:1.4"/>`;
    s+=`<ellipse cx="${cx}" cy="${hy}" rx="${hr}" ry="${hh}" style="fill:var(--polyp);stroke:var(--polyp-line);stroke-width:1.6"/><ellipse cx="${cx}" cy="${hy+4}" rx="${hr-9}" ry="${hh-9}" style="fill:var(--submucosa);opacity:.8"/>`;
    /* cancer extent */
    const yl=[hy-hh+6,hy+6,neck+2,base-6,base+w.y.muscularis-w.y.mucosa-4][lev];
    s+=`<clipPath id="suHclip"><rect x="0" y="0" width="520" height="${f1(yl)}"/></clipPath>`;
    s+=`<g clip-path="url(#suHclip)"><path d="M${cx-30} ${hy-hh+2}Q${cx} ${hy-hh-6} ${cx+30} ${hy-hh+2}L${cx+18} ${hy+hh}L${cx+8} ${base+40}L${cx-8} ${base+40}L${cx-18} ${hy+hh}Z" style="fill:var(--tumour);opacity:.85"/></g>`;
    /* level guide lines */
    const LY=[hy-hh+4,hy-6,neck,(neck+base)/2,base+(w.y.submucosa-w.y.mucosa)+8],nm=['0 mucosa','1 head','2 neck','3 stalk','4 wall submucosa'];
    LY.forEach((y,i)=>{const on=i===lev;s+=`<line x1="${cx+hr*.4}" x2="${N?x0+W0+4:cx+W0/2+10}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:${on?'var(--tumour)':'var(--muted)'};stroke-width:${on?1.8:1};stroke-dasharray:3 3"/><text x="${N?x0+W0+8:cx+W0/2+14}" y="${f1(y+4)}" class="t-sm" style="fill:${on?'var(--tumour)':'var(--muted)'};font-weight:${on?700:500}">${N?nm[i].split(' ')[0]+' '+nm[i].split(' ')[1]:nm[i]}</text>`});
    s+=`<text x="${x0}" y="${base+(N?96:84)}" class="t-xs">bowel wall: mucosa, submucosa, muscle</text>`;
    hv.innerHTML=s;
    const H=HG[lev];$('#suHagNote').innerHTML=noteHTML({k:H.n+' · Haggitt 1985',t:H.t,txt:H.d+' <sup class="c" data-ref="Haggitt1985" title="Source 213">213</sup>',pt:H.pt,hook:'Haggitt levels: 0 mucosa, 1 head, 2 neck, 3 stalk, 4 submucosa of the wall below the stalk. Level 4 and rectal site predicted adverse outcome. <sup class="c" data-ref="Haggitt1985" title="Source 213">213</sup>'})}
  $$('[data-su-hag]').forEach(b=>b.addEventListener('click',()=>{lev=+b.dataset.suHag;$$('[data-su-hag]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawH()}));
  drawH();
};
/* =============== 4.2 Chemotherapy after surgery =============== */
const CH_WK=30;/* weeks shown on the calendar */
/* regimen facts: cycle length (days), cycles in 3 and 6 months, oxaliplatin per cycle (label), IDEA grade >=2 neuropathy */
const CH_REG={
 folfox:{n:'FOLFOX',len:14,cyc:{3:6,6:12},ox:85,neu:{3:16.6,6:47.7},
  d1:'Day 1: oxaliplatin 85 mg/m² + leucovorin, then 5-FU bolus and 22-hour infusion; day 2: leucovorin and 5-FU again'},
 capox:{n:'CAPOX',len:21,cyc:{3:4,6:8},ox:130,neu:{3:14.2,6:44.9},
  d1:'Day 1: oxaliplatin 130 mg/m²; capecitabine 1,000 mg/m² twice daily on days 1–14, then a week off'}
};
/* schematic cumulative neuropathy: rises as a power curve to the published value at the end of the
   measuring window (end of treatment + about 4 weeks), then stays flat */
function chNeu(reg,dur,w){const P=CH_REG[reg].neu[dur],T=(dur===3?12:24)+4;return P*Math.pow(clamp(w/T),1.5)}
const CH_STEPS=[
 {from:0,at:.03,k:'Week 0 · after surgery',t:'Starting after the operation',
  txt:`Chemotherapy after surgery ("adjuvant") aims to kill cancer cells left behind that no scan can see. Timing matters: in a meta-analysis of 15,410 patients, each 4-week delay in starting was associated with worse overall survival (HR 1.14), though the data are observational. Before capecitabine or 5-FU, US labels now carry a boxed warning to test for DPYD variants unless treatment is urgent. <sup class="c" data-ref="Biagi2011,FDA-Xeloda,FDA-Fluorouracil" title="Source 59,161,179">59,161,179</sup>`,
  pt:`The operation removed what can be seen. Chemotherapy goes after cells too small to see, and works best if it starts once recovery allows.`,
  hook:`Each 4-week delay to adjuvant chemotherapy: overall survival HR 1.14 (observational). <sup class="c" data-ref="Biagi2011" title="Source 59">59</sup>`},
 {from:.06,at:.14,k:'Weeks 1–6',t:'Cycle by cycle',
  txt:`FOLFOX4 runs every 14 days: oxaliplatin, leucovorin and a fluorouracil bolus plus a 22-hour infusion on day 1, repeated on day 2. CAPOX runs every 21 days: oxaliplatin on day 1 and capecitabine tablets twice daily on days 1–14. The evidence behind them: in MOSAIC, adding oxaliplatin to 5-FU/leucovorin raised 3-year disease-free survival from 72.9% to 78.2%, and capecitabine was at least as good as IV fluorouracil in X-ACT. <sup class="c" data-ref="FDA-Oxaliplatin,FDA-Xeloda,Andre2004,Twelves2005" title="Source 12,170,179,542">12,170,179,542</sup>`,
  pt:`FOLFOX means a drip every two weeks with a small pump carried home. CAPOX means a drip every three weeks and tablets at home.`,
  hook:`Label maximum: FOLFOX4 up to 12 cycles; capecitabine with oxaliplatin up to 8 cycles. <sup class="c" data-ref="FDA-Oxaliplatin,FDA-Xeloda" title="Source 170,179">170,179</sup>`},
 {from:.2,at:.3,k:'Weeks 6–12',t:'The nerves keep count',
  txt:`Oxaliplatin causes an acute, cold-triggered neuropathy and a cumulative, delayed one in the hands and feet (the label says to "avoid topical application of ice"). The cumulative kind rises with every cycle, so it depends on total dose more than on regimen: compare the oxaliplatin total in the readout. <sup class="c" data-ref="FDA-Oxaliplatin,Grothey2018" title="Source 170,201">170,201</sup>`,
  pt:`Tingling and numbness in the fingers and toes build up with each cycle. Tell the team early: they can reduce or stop the oxaliplatin.`,
  hook:`Six FOLFOX cycles (6 × 85) and four CAPOX cycles (4 × 130) give a similar oxaliplatin total, about 510–520 mg/m². <sup class="c" data-ref="FDA-Oxaliplatin,FDA-Xeloda" title="Source 170,179">170,179</sup>`},
 {from:.43,at:.5,k:'Week 12 · 3 months',t:'The IDEA stopping point',
  txt:`IDEA (12,834 people) asked whether stopping here is enough. Overall, non-inferiority of 3 months was not confirmed (DFS HR 1.07). It was for CAPOX (HR 0.95) but not for FOLFOX (HR 1.16). In lower-risk disease (T1–3 N1), 3-year DFS was 83.1% at 3 months vs 83.3% at 6. Grade ≥2 neuropathy was 16.6% with 3 months of FOLFOX and 14.2% with CAPOX. <sup class="c" data-ref="Grothey2018" title="Source 201">201</sup>`,
  pt:`For many people with lower-risk stage III cancer, 3 months of CAPOX works about as well as 6 and causes much less nerve damage.`,
  hook:`IDEA: 3 months of CAPOX is enough for low-risk T1–3 N1 disease. <sup class="c" data-ref="Grothey2018" title="Source 201">201</sup>`},
 {from:.6,at:.95,k:'Weeks 12–28 · 6 months',t:'Six months: a small gain, a large cost',
  txt:`With 6 months, grade ≥2 neuropathy reached 47.7% (FOLFOX) and 44.9% (CAPOX), roughly triple. In higher-risk disease (T4 and/or N2), 6 months was better: 3-year DFS 64.4% vs 62.7%. Neuropathy fades for many: in MOSAIC grade 3 sensory neuropathy was 12.4% during treatment, 1.3% at 12 months and 0.7% at 48 months. <sup class="c" data-ref="Grothey2018,Andre2004,Andre2009" title="Source 12,13,201">12,13,201</sup>`,
  pt:`Numbness and tingling get worse the longer treatment goes on. For most people it improves after treatment ends, but for some it lasts.`,
  hook:`Grade ≥2 neuropathy, 6 vs 3 months: FOLFOX 47.7% vs 16.6%; CAPOX 44.9% vs 14.2%. <sup class="c" data-ref="Grothey2018" title="Source 201">201</sup>`}
];
const CH_IDEA={
 risk:{t:'3-year disease-free survival by risk group',groups:[['Low risk (T1–3 N1)',83.1,83.3],['High risk (T4 and/or N2)',62.7,64.4]],max:100,unit:'%',
  note:{k:'IDEA · Grothey 2018',t:'Risk group decides the duration',txt:`Lower-risk stage III (T1–3 N1): 3-year DFS 83.1% with 3 months vs 83.3% with 6 (HR 1.01). Higher-risk (T4 and/or N2): 6 months was superior, 64.4% vs 62.7% (HR 1.12; P=.01). <sup class="c" data-ref="Grothey2018" title="Source 201">201</sup>`,
   pt:`In the lower-risk group the bars are almost identical. In the higher-risk group, the longer course kept a small lead.`,hook:`Low risk = T1–3 N1; high risk = T4 and/or N2. <sup class="c" data-ref="Grothey2018" title="Source 201">201</sup>`}},
 hr:{t:'Disease-free survival, hazard ratio for 3 vs 6 months',rows:[['All patients',1.07,1.00,1.15],['CAPOX',.95,.85,1.06],['FOLFOX',1.16,1.06,1.26]],
  note:{k:'IDEA · non-inferiority',t:'CAPOX passes, FOLFOX does not',txt:`A hazard ratio above 1 means more events with 3 months. Three months counts as non-inferior only if the whole confidence interval stays below the pre-set margin of 1.12. CAPOX (0.95; 0.85–1.06) passes; FOLFOX (1.16; 1.06–1.26) and the overall result (1.07; 1.00–1.15) do not. <sup class="c" data-ref="Grothey2018" title="Source 201">201</sup>`,
   pt:`Read each line as a range of plausible results. If the whole range sits left of the dashed line, the shorter course is "not worse" by the trial's rule.`,hook:`IDEA overall DFS HR 1.07 (95% CI 1.00–1.15) vs margin 1.12: non-inferiority not confirmed. <sup class="c" data-ref="Grothey2018" title="Source 201">201</sup>`}},
 os:{t:'5-year overall survival',groups:[['All patients',82.4,82.8],['CAPOX',82.1,81.2],['FOLFOX',82.6,83.8]],max:100,unit:'%',
  note:{k:'IDEA final · André 2020',t:'Survival: almost the same',txt:`With a median 72 months of follow-up (12,835 patients), 5-year OS was 82.4% with 3 months vs 82.8% with 6 (HR 1.02); non-inferiority was not formally met. CAPOX 82.1% vs 81.2% (HR 0.96); FOLFOX 82.6% vs 83.8% (HR 1.07). The authors concluded the results support 3 months of CAPOX for most patients. <sup class="c" data-ref="Andre2020IDEA" title="Source 17">17</sup>`,
   pt:`Five years on, about 82 in 100 were alive whichever length they had.`,hook:`IDEA final OS: absolute gap 0.4% (82.4% vs 82.8%). <sup class="c" data-ref="Andre2020IDEA" title="Source 17">17</sup>`}}
};
const CH_WHO={
 'III-low':[`<span class="ev est">Established</span> IDEA: 3-year DFS 83.1% with 3 months vs 83.3% with 6. Three months of CAPOX was non-inferior (HR 0.95), with grade ≥2 neuropathy 14.2% vs 44.9%. <sup class="c" data-ref="Grothey2018" title="Source 201">201</sup>`,`Final IDEA overall survival supports 3 months of CAPOX for most patients. <sup class="c" data-ref="Andre2020IDEA" title="Source 17">17</sup>`,`The oxaliplatin label indication is adjuvant treatment of stage III colon cancer after complete resection. <sup class="c" data-ref="FDA-Oxaliplatin" title="Source 170">170</sup>`],
 'III-high':[`<span class="ev est">Established</span> IDEA: for T4 and/or N2 disease, 6 months was superior (3-year DFS 64.4% vs 62.7%; HR 1.12). <sup class="c" data-ref="Grothey2018" title="Source 201">201</sup>`,`MOSAIC: adding oxaliplatin gave a 10-year overall survival of 67.1% vs 59.0% in stage III. <sup class="c" data-ref="Andre2015" title="Source 14">14</sup>`,`SCOT (67% CAPOX, high-risk II and III) met non-inferiority for 3 months overall (3-year DFS 76.7% vs 77.1%). <sup class="c" data-ref="Iveson2018" title="Source 257">257</sup>`,`<span class="ev est">Established</span> IROCAS (795 people, T4 and/or N2): adding irinotecan (mFOLFIRINOX) did not improve 3-year DFS over mFOLFOX6 (65.6% vs 66.3%; HR 1.07) and caused more grade ≥3 diarrhoea (15.6% vs 3.8%). <sup class="c" data-ref="Bennouna2026" title="Source 52">52</sup>`],
 'II-p':[`<span class="ev est">Established</span> QUASAR (91% stage II): FU/folinic acid lowered the risk of death (RR 0.82), an absolute gain of only about 3.6% if 5-year mortality without chemotherapy is 20%. <sup class="c" data-ref="QUASAR2007" title="Source 441">441</sup>`,`MOSAIC 10-year OS in stage II: 78.4% with FOLFOX4 vs 79.5% without oxaliplatin (HR 1.00). <sup class="c" data-ref="Andre2015" title="Source 14">14</sup>`,`<span class="ev early">Early evidence</span> DYNAMIC: ctDNA-guided care cut chemotherapy use from 28% to 15% with non-inferior 2-year recurrence-free survival. <sup class="c" data-ref="Tie2022" title="Source 531">531</sup>`],
 'II-d':[`<span class="ev est">Established</span> Sargent 2010: dMMR tumours gained no DFS benefit from fluorouracil (HR 1.10), and in stage II dMMR, FU was associated with worse overall survival (HR 2.95; 95% CI 1.02–8.54). <sup class="c" data-ref="Sargent2010" title="Source 468">468</sup>`,`dMMR made up 15% of the Sargent sample and 9.4% of MOSAIC specimens tested. <sup class="c" data-ref="Sargent2010,Andre2015" title="Source 14,468">14,468</sup>`,`Mismatch-repair testing is covered in <a href="#biomarkers" data-go="biomarkers">Tumour biomarkers</a>.`],
 'III-d':[`<span class="ev est">Established</span> ATOMIC (712 people, resected stage III dMMR): adding atezolizumab to mFOLFOX6 raised 3-year DFS from 76.2% to 86.3% (HR 0.50), with more grade 3–4 adverse events (84.1% vs 71.9%). <sup class="c" data-ref="Sinicrope2026" title="Source 498">498</sup>`,`<span class="ev early">Early evidence</span> NICHE-2: nivolumab plus ipilimumab before surgery gave a 68% complete pathological response in dMMR colon cancer. <sup class="c" data-ref="Chalabi2024" title="Source 94">94</sup>`,`FOxTROT found little benefit from neoadjuvant chemotherapy in dMMR tumours. <sup class="c" data-ref="Morton2023" title="Source 381">381</sup>`],
 'old':[`<span class="tag warn">Uncertain</span> ACCENT (11,953 patients): at 70 or older, adding oxaliplatin to IV fluorouracil gave little benefit (DFS HR 0.94; OS HR 1.04), but the age interaction was not statistically significant. <sup class="c" data-ref="McCleary2013" title="Source 354">354</sup>`,`Oral fluoropyrimidines kept their efficacy at all ages in ACCENT. <sup class="c" data-ref="McCleary2013" title="Source 354">354</sup>`,`Capecitabine alone (X-ACT) was at least equivalent to bolus FU/LV with fewer adverse events. <sup class="c" data-ref="Twelves2005" title="Source 542">542</sup>`],
 'neo':[`<span class="ev est">Established</span> FOxTROT (1,053 people, T3–4 on CT): 6 weeks of chemotherapy before surgery lowered residual or recurrent disease at 2 years (16.9% vs 21.5%; rate ratio 0.72) and raised complete resection (94% vs 89%). <sup class="c" data-ref="Morton2023" title="Source 381">381</sup>`,`4.3% developed obstruction needing earlier surgery, yet serious postoperative complications were fewer. There was little benefit in dMMR tumours. <sup class="c" data-ref="Morton2023" title="Source 381">381</sup>`],
 'time':[`<span class="ev est">Established association</span> Each 4-week delay in starting adjuvant chemotherapy was associated with worse overall survival (HR 1.14; 95% CI 1.10–1.17) and DFS (HR 1.14), across 10 studies and 15,410 patients. The data are observational. <sup class="c" data-ref="Biagi2011" title="Source 59">59</sup>`,`Enhanced-recovery programmes shorten hospital stay by about 2.28 days. <sup class="c" data-ref="Greco2014" title="Source 196">196</sup> See <a href="#surgery" data-go="surgery">Surgery</a>.`]
};

inits.chemo=()=>{
  const svg=$('#chSvg'),rg=$('#chT');let reg='capox',dur=3;
  function draw(t){
    const N=vb(svg,'720 390','400 525');const R=CH_REG[reg],w=t*CH_WK,day=w*7,ph=phaseOf(CH_STEPS,t);
    const nCyc=R.cyc[dur],endDay=nCyc*R.len;let s='';
    const kind=d=>{if(d>=endDay)return'off';const c=d%R.len;if(reg==='folfox')return c===0?'ox':c===1?'fu':'rest';return c===0?'ox':c<14?'cap':'rest'};
    const fill={ox:'var(--rx)',fu:'var(--accent)',cap:'var(--gold)',rest:'var(--panel-2)',off:'none'};
    /* calendar */
    const cols=N?15:CH_WK,cs=N?20:18.6,rh=N?12:12,x0=N?50:74,blocks=N?2:1,by=[N?44:50,N?44+7*rh+34:0];
    s+=`<text x="${x0}" y="${N?18:22}" class="t-sm" style="fill:var(--rx)">${R.n} · ${dur} MONTHS · ${nCyc} CYCLES</text>`;
    for(let b=0;b<blocks;b++){const y0=by[b];
      for(let c=0;c<cols;c++){const wk=b*cols+c;if(wk>=CH_WK)break;
        if(wk%4===0)s+=`<text x="${f1(x0+c*cs+cs/2)}" y="${y0-5}" class="t-xs t-mid">wk ${wk}</text>`;
        for(let r=0;r<7;r++){const d=wk*7+r,k=kind(d),past=d<=day,x=x0+c*cs+1,y=y0+r*rh+1;
          s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(cs-2)}" height="${rh-2}" rx="2" style="fill:${past?fill[k]:'none'};stroke:${k==='off'?'var(--line)':past?'none':'var(--line)'};${!past&&k!=='off'?'opacity:.8':''}"/>`;
          if(past&&k==='ox')s+=`<circle cx="${f1(x+cs/2-1)}" cy="${f1(y+rh/2-1)}" r="2" style="fill:var(--panel)"/>`}}
      if(N)s+=`<text x="${x0-6}" y="${f1(y0+rh*3.5+3)}" class="t-xs t-end">${b?'wk 15–29':'wk 0–14'}</text>`}
    if(!N)s+=`<text x="${x0-8}" y="${f1(by[0]+rh*3.5+3)}" class="t-xs t-end">7 days</text>`;
    /* end-of-course marker */
    const endW=endDay/7,colOf=wk=>N?wk%cols:wk,blkOf=wk=>N?Math.floor(wk/cols):0;
    {const ex=x0+colOf(endW)*cs,ey=by[blkOf(endW)];s+=`<line x1="${f1(ex)}" x2="${f1(ex)}" y1="${ey-2}" y2="${ey+7*rh+2}" style="stroke:var(--ink);stroke-width:2"/><text x="${f1(ex+3)}" y="${ey+7*rh+12}" class="t-xs" style="fill:var(--ink)">last cycle ends</text>`}
    /* legend */
    const ly=N?by[1]+7*rh+30:by[0]+7*rh+30;
    const leg=reg==='folfox'?[['ox','oxaliplatin day'],['fu','5-FU pump'],['rest','no drug']]:[['ox','oxaliplatin day'],['cap','tablets'],['rest','week off']];
    leg.forEach(([k,l],i)=>{const lx=x0+i*(N?115:150);s+=`<rect x="${lx}" y="${ly-8}" width="12" height="9" rx="2" style="fill:${fill[k]}"/><text x="${lx+16}" y="${ly}" class="t-xs">${l}</text>`});
    /* neuropathy chart */
    const C=N?{x0:50,x1:380,y0:ly+46,y1:ly+206}:{x0:74,x1:632,y0:ly+40,y1:ly+190};
    const X=v=>lerp(C.x0,C.x1,v/CH_WK),Y=v=>lerp(C.y1,C.y0,v/60);
    s+=`<text x="${C.x0}" y="${C.y0-14}" class="t-sm" style="fill:var(--bad)">${N?'GRADE ≥2 NEUROPATHY, % (IDEA)':'PEOPLE WITH GRADE ≥2 NEUROPATHY, % (IDEA, schematic curve)'}</text>`;
    [0,20,40,60].forEach(v=>s+=`<line x1="${C.x0}" x2="${C.x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="${v?'grid':'axis'}"/><text x="${C.x0-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}%</text>`);
    [0,4,8,12,16,20,24,28].forEach(v=>{if(N&&v%8)return;s+=`<text x="${f1(X(v))}" y="${C.y1+13}" class="t-xs t-mid">${v}</text>`});
    s+=`<text x="${C.x1}" y="${C.y1+26}" class="t-xs t-end">weeks</text>`;
    [3,6].forEach(D=>{const on=D===dur,e=Math.min(w,CH_WK);if(e<=0)return;
      s+=`<path d="${pathFn(u=>chNeu(reg,D,u*e)/60,C.x0,X(e),C.y1,C.y0,80)}" style="fill:none;stroke:${on?'var(--bad)':'var(--muted)'};stroke-width:${on?2.8:1.4};${on?'':'stroke-dasharray:4 4;opacity:.7'}"/>`;
      const T=(D===3?12:24)+4,P=R.neu[D];if(w>=T){const lx=X(T),lyy=Y(P);s+=`<circle cx="${f1(lx)}" cy="${f1(lyy)}" r="5" style="fill:none;stroke:${on?'var(--ink)':'var(--muted)'};stroke-width:1.8"/><text x="${f1(lx+(D===6?-8:8))}" y="${f1(lyy-8)}" class="t-xs${D===6?' t-end':''}" style="fill:${on?'var(--ink)':'var(--muted)'};font-weight:${on?700:500}">${f1(P)}% · ${D} mo</text>`}});
    s+=`<line x1="${f1(X(Math.min(w,CH_WK)))}" x2="${f1(X(Math.min(w,CH_WK)))}" y1="${C.y0}" y2="${C.y1}" style="stroke:var(--ink);opacity:.3"/>`;
    svg.innerHTML=s;
    const done=Math.min(nCyc,Math.floor(day/R.len)+(day>=0?1:0)),cd=Math.min(done,nCyc);
    $('#chRead').innerHTML=`<span>week <b>${f1(w)}</b></span><span>cycles started <b>${cd} of ${nCyc}</b></span><span>oxaliplatin so far <b>${cd*R.ox} mg/m²</b> (${cd} × ${R.ox}, label dose)</span><span>neuropathy grade ≥2 <b>≈${Math.round(chNeu(reg,dur,w))}%</b> (schematic)</span><span>${R.d1} <sup class="c" data-ref="FDA-Oxaliplatin,FDA-Xeloda" title="Source 170,179">170,179</sup></span>`;
    setSt(ph);$('#chNote').innerHTML=noteHTML(CH_STEPS[ph]);
  }
  const stop=playWire(rg,$('#chPlay'),draw,15000,'Replay','chemo');
  const setSt=stepWire($('#chSteps'),CH_STEPS,rg,draw,stop);
  $$('[data-ch-reg]').forEach(b=>b.addEventListener('click',()=>{stop();reg=b.dataset.chReg;$$('[data-ch-reg]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  $$('[data-ch-dur]').forEach(b=>b.addEventListener('click',()=>{stop();dur=+b.dataset.chDur;$$('[data-ch-dur]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ---- IDEA results ---- */
  const iv=$('#chIdea');let view='risk',stopI=null;
  function drawI(k){const V=CH_IDEA[view],nn=(V.groups||V.rows).length,N=vb(iv,'720 '+(V.groups?Math.round(84+nn*(230/nn)):270),'400 '+(V.groups?84+nn*100:300));let s='';
    s+=`<text x="${N?16:30}" y="22" class="t-sm" style="fill:var(--rx)">${V.t.toUpperCase()}</text>`;
    if(V.groups){const n=V.groups.length,x0=N?92:200,x1=N?380:680,rowH=N?100:(230/n),bh=N?18:20;
      const Xs=v=>lerp(x0,x1,v/100);
      [0,25,50,75,100].forEach(v=>s+=`<line x1="${f1(Xs(v))}" x2="${f1(Xs(v))}" y1="40" y2="${f1(44+rowH*n)}" class="grid"/><text x="${f1(Xs(v))}" y="${f1(58+rowH*n)}" class="t-xs t-mid">${v}%</text>`);
      V.groups.forEach(([l,a,b],i)=>{const y=46+i*rowH;
        suWrap(l,N?12:26).forEach((ll,j)=>s+=`<text x="${x0-10}" y="${f1(y+16+j*13)}" class="t-sm t-end" style="fill:var(--ink)">${ll}</text>`);
        [[a,'3 months','var(--rx)'],[b,'6 months','var(--accent)']].forEach(([v,lab,c],j)=>{const yy=y+j*(bh+6),wv=Xs(v*k)-x0;
          s+=`<rect x="${x0}" y="${f1(yy)}" width="${f1(Math.max(0,wv))}" height="${bh}" rx="3" style="fill:${c};opacity:.85"/>`;
          s+=`<text x="${f1(x0+6)}" y="${f1(yy+bh/2+4)}" class="t-xs" style="fill:var(--panel);font-weight:700">${lab}</text>`;
          if(k>.9)s+=`<text x="${f1(Math.max(x0+wv-6,x0+70))}" y="${f1(yy+bh/2+4)}" class="t-xs t-end" style="fill:var(--panel);font-weight:700">${f1(v)}%</text>`})})}
    else{const x0=N?120:240,x1=N?380:660,lo=.8,hi=1.3,Xh=v=>lerp(x0,x1,(v-lo)/(hi-lo)),n=V.rows.length,rowH=N?70:56,y0=60;
      [.8,.9,1,1.1,1.2,1.3].forEach(v=>s+=`<line x1="${f1(Xh(v))}" x2="${f1(Xh(v))}" y1="${y0-14}" y2="${y0+rowH*n-20}" class="${v===1?'axis':'grid'}"/><text x="${f1(Xh(v))}" y="${y0+rowH*n}" class="t-xs t-mid">${v.toFixed(1)}</text>`);
      s+=`<line x1="${f1(Xh(1.12))}" x2="${f1(Xh(1.12))}" y1="${y0-24}" y2="${y0+rowH*n-20}" style="stroke:var(--bad);stroke-width:1.6;stroke-dasharray:5 4"/><text x="${f1(Xh(1.12)+4)}" y="${y0-26}" class="t-xs" style="fill:var(--bad)">margin 1.12</text>`;
      s+=`<text x="${f1(Xh(.9))}" y="${y0+rowH*n+16}" class="t-xs t-mid">← 3 months better</text><text x="${f1(Xh(1.2))}" y="${y0+rowH*n+16}" class="t-xs t-mid">6 months better →</text>`;
      V.rows.forEach(([l,h,a,b],i)=>{const y=y0+i*rowH,ok=b<1.12,c=ok?'var(--good)':'var(--bad)',m=lerp(1,h,k),la=lerp(1,a,k),lb=lerp(1,b,k);
        s+=`<text x="${x0-12}" y="${y+4}" class="t-sm t-end" style="fill:var(--ink)">${l}</text><text x="${x0-12}" y="${y+18}" class="t-xs t-end">${h.toFixed(2)} (${a.toFixed(2)}–${b.toFixed(2)})</text>`;
        s+=`<line x1="${f1(Xh(la))}" x2="${f1(Xh(lb))}" y1="${y}" y2="${y}" style="stroke:${c};stroke-width:2.6"/><rect x="${f1(Xh(m)-6)}" y="${y-6}" width="12" height="12" style="fill:${c}"/>`;
        if(k>.95)s+=`<text x="${f1(Xh(b)+8)}" y="${y+4}" class="t-xs" style="fill:${c};font-weight:700">${ok?'non-inferior':'not shown'}</text>`})}
    iv.innerHTML=s}
  function showI(){$('#chIdeaNote').innerHTML=noteHTML(CH_IDEA[view].note);if(stopI)stopI();stopI=animate(900,p=>drawI(ease(p)))}
  $$('[data-ch-idea]').forEach(b=>b.addEventListener('click',()=>{view=b.dataset.chIdea;$$('[data-ch-idea]').forEach(x=>x.setAttribute('aria-pressed',x===b));showI()}));
  drawI(1);$('#chIdeaNote').innerHTML=noteHTML(CH_IDEA[view].note);
  onHide.chemo=(f=>()=>{f&&f();if(stopI)stopI()})(onHide.chemo);
  const prevR=redraws.chemo;redraws.chemo=()=>{prevR&&prevR();drawI(1)};

  /* ---- who benefits ---- */
  const sel=$('#chWho');
  function who(){const L=CH_WHO[sel.value];$('#chWhoOut').innerHTML=`<ul>${L.map(x=>`<li>${x}</li>`).join('')}</ul>`}
  sel.addEventListener('change',who);who();
};
/* =============== 4.3 Rectal cancer pathway =============== */
const RE_M=30;/* months on the timeline */
/* phases of each approach: id, label, start and end month, colour; the branch after restaging depends on the response */
function rePhases(mode,ccr){
  if(mode==='tnt'){const P=[{id:'mri',n:'MRI',a:0,b:.5,c:'var(--accent)'},{id:'scrt',n:'5×5 Gy',a:.5,b:.8,c:'var(--gold)'},{id:'chemo',n:'CAPOX × 6',a:1,b:5.2,c:'var(--rx)'},{id:'restage',n:'Restage',a:5.4,b:6,c:'var(--accent)'}];
    return P.concat(ccr?[{id:'ww',n:'Watch & wait',a:6,b:RE_M,c:'var(--good)'}]:[{id:'tme',n:'TME',a:6.4,b:7,c:'var(--tumour)'},{id:'fu',n:'Follow-up',a:7,b:RE_M,c:'var(--panel-2)'}])}
  const P=[{id:'mri',n:'MRI',a:0,b:.5,c:'var(--accent)'},{id:'crt',n:'CRT',a:.5,b:1.75,c:'var(--gold)'},{id:'wait',n:'Wait',a:1.75,b:3,c:'var(--line)'},{id:'restage',n:'Restage',a:3,b:3.4,c:'var(--accent)'}];
  return P.concat(ccr?[{id:'ww',n:'Watch & wait',a:3.4,b:RE_M,c:'var(--good)'}]:[{id:'tme',n:'TME',a:3.6,b:4.1,c:'var(--tumour)'},{id:'adj',n:'Chemo (optional)',a:4.8,b:8.8,c:'var(--rx)'},{id:'fu',n:'Follow-up',a:8.8,b:RE_M,c:'var(--panel-2)'}])}
/* tumour size 0..1 at month m (drawn, not measured) */
function reSize(mode,ccr,m){const end=ccr?0:(mode==='tnt'?.38:.45),a=.5,b=mode==='tnt'?5.2:3;return m<a?1:lerp(1,end,ease(clamp((m-a)/(b-a))))}
const RE_TXT={
 mri:{k:'Month 0 · staging',t:'MRI plans everything',
  txt:`High-resolution pelvic MRI shows how deep the tumour goes, which nodes look involved and how close it comes to the mesorectal fascia, the future circumferential margin. In MERCURY (408 people), MRI predicted a clear margin with 92% specificity. The 2022 NCCN rectal update rebuilt its stage II–III algorithms around total neoadjuvant therapy and added watch-and-wait for complete responders. <sup class="c" data-ref="MERCURY2006,Benson2022" title="Source 55,360">55,360</sup>`,
  pt:`The MRI scan is the map. It tells the team whether surgery alone is enough or whether treatment should come first.`,
  hook:`MRI-predicted CRM decides whether a tumour is "high risk" before treatment. <sup class="c" data-ref="MERCURY2006" title="Source 360">360</sup>`},
 scrt:{k:'Week 1 · short-course radiotherapy',t:'Five fractions of 5 Gy',
  txt:`Short-course radiotherapy gives 25 Gy in 5 fractions over a week. Before standard TME, the Swedish trial (1,168 patients) cut 5-year local recurrence from 27% to 11% and raised overall survival from 48% to 58%. Added to TME in the Dutch trial (1,861), it lowered local recurrence from 8.2% to 2.4% at 2 years and from 11% to 5% at 10 years, without an overall survival difference. <sup class="c" data-ref="SRCT1997,Kapiteijn2001,vanGijn2011" title="Source 280,509,556">280,509,556</sup>`,
  pt:`One week of daily radiotherapy to the pelvis lowers the chance the cancer comes back there.`,
  hook:`Short-course RT = 5 × 5 Gy. Dutch TME trial: 10-year local recurrence 5% vs 11%, no overall survival gain. <sup class="c" data-ref="vanGijn2011" title="Source 556">556</sup>`},
 crt:{k:'Weeks 1–6 · chemoradiation',t:'Long-course chemoradiation',
  txt:`The standard arm of RAPIDO gave 50.4 or 50 Gy with capecitabine 825 mg/m² twice daily (the capecitabine label lists 825 mg/m² twice daily with concomitant radiation). In the German CAO/ARO/AIO-94 trial, giving chemoradiation before rather than after surgery lowered 5-year local relapse from 13% to 6% and grade 3–4 acute toxicity from 40% to 27%, with equal survival. <sup class="c" data-ref="Bahadoer2021,FDA-Xeloda,Sauer2004" title="Source 33,179,472">33,179,472</sup>`,
  pt:`About five weeks of daily radiotherapy with chemotherapy tablets, to shrink the tumour before the operation.`,
  hook:`Preoperative beats postoperative chemoradiation for local control (6% vs 13%) and toxicity, with equal survival. <sup class="c" data-ref="Sauer2004" title="Source 472">472</sup>`},
 wait:{k:'Weeks 6–12 · the interval',t:'Waiting for the response',
  txt:`Surgery is usually not done straight after radiotherapy. In Stockholm III (840 patients), short-course radiotherapy with surgery delayed by 4–8 weeks gave local recurrence similar to immediate surgery, and the delay lowered postoperative complications (OR 0.61). In the German trial's long follow-up, 10-year distant metastases were about 30% in both arms, the gap TNT tries to close. <sup class="c" data-ref="Erlandsson2017,Sauer2012" title="Source 151,473">151,473</sup>`,
  pt:`There is a pause of several weeks before the scan that checks the response.`,
  hook:`Chemoradiation improved local control but not distant spread (10-year distant metastases 29.8% vs 29.6%). <sup class="c" data-ref="Sauer2012" title="Source 473">473</sup>`},
 chemo:{k:'Months 1–5 · consolidation chemotherapy',t:'Total neoadjuvant therapy',
  txt:`In RAPIDO (920 high-risk patients), short-course radiotherapy was followed by 6 cycles of CAPOX or 9 of FOLFOX4, then TME. Disease-related treatment failure at 3 years was 23.7% vs 30.4% with standard chemoradiation (HR 0.75). The cost: grade ≥3 diarrhoea before surgery in 18% vs 9%. PRODIGE 23 gave FOLFIRINOX before chemoradiation instead and raised 3-year DFS from 69% to 76%. <sup class="c" data-ref="Bahadoer2021,Conroy2021" title="Source 33,108">33,108</sup>`,
  pt:`All the chemotherapy is given before the operation, while the person is fit, instead of some of it afterwards.`,
  hook:`RAPIDO: TNT lowered disease-related treatment failure (23.7% vs 30.4%). <sup class="c" data-ref="Bahadoer2021" title="Source 33">33</sup>`},
 restage:{k:'Restaging',t:'Has the tumour gone?',
  txt:`MRI and endoscopy look again. In Habr-Gama's series (265 people with distal rectal cancer after 5-FU chemoradiation), 71 (26.8%) had a clinical complete response and were observed without surgery: 5-year overall and disease-free survival were 100% and 92%. In OPRA, consolidation chemotherapy after chemoradiation preserved the rectum more often than induction chemotherapy before it (3-year TME-free survival 53% vs 41%). <sup class="c" data-ref="HabrGama2004,GarciaAguilar2022" title="Source 193,211">193,211</sup>`,
  pt:`If nothing can be seen on the scan or through the scope, some people can avoid the operation and be watched closely instead.`,
  hook:`OPRA: 3-year TME-free survival 41% (induction) vs 53% (consolidation); DFS 76% in both. <sup class="c" data-ref="GarciaAguilar2022" title="Source 193">193</sup>`},
 tme:{k:'Surgery',t:'Total mesorectal excision',
  txt:`If tumour remains, the rectum and its mesorectum come out (see <a href="#surgery" data-go="surgery">Surgery</a>). RAPIDO's 5-year follow-up found more locoregional recurrence after resection in the TNT arm (10% vs 6%; P=.027), more often when the mesorectum was breached, while its gain in distant control persisted. <sup class="c" data-ref="Dijkstra2023" title="Source 131">131</sup>`,
  pt:`The operation removes the rest of the tumour with the fatty sleeve around the rectum.`,
  hook:`RAPIDO 5 years: locoregional recurrence after resection 10% (TNT) vs 6%. <sup class="c" data-ref="Dijkstra2023" title="Source 131">131</sup>`},
 adj:{k:'After surgery',t:'Optional chemotherapy afterwards',
  txt:`In RAPIDO's standard arm, chemotherapy after surgery was optional. PRODIGE 23 gave 3 months of adjuvant chemotherapy after FOLFIRINOX, chemoradiation and TME, against 6 months after chemoradiation and TME in its control arm, and had less neurotoxicity during adjuvant therapy (12% vs 21%). <sup class="c" data-ref="Bahadoer2021,Conroy2021" title="Source 33,108">33,108</sup>`,
  pt:`Some people have more chemotherapy after the operation. In the newer approach most of it is given before.`,
  hook:`PRODIGE 23: 3-year DFS 76% vs 69% (HR 0.69). <sup class="c" data-ref="Conroy2021" title="Source 108">108</sup>`},
 ww:{k:'Watch & wait',t:'Close surveillance instead of surgery',
  txt:`In the International Watch &amp; Wait Database (880 people with a clinical complete response, 47 institutes), the 2-year cumulative local regrowth was 25.2%; 88% of regrowths were found within 2 years and 97% were in the bowel wall. Distant metastases occurred in 8%. 5-year overall survival was 85% and disease-specific survival 94% (registry data). <sup class="c" data-ref="vanderValk2018" title="Source 555">555</sup>`,
  pt:`About 1 in 4 people see the tumour grow back, mostly in the first 2 years. It can usually still be removed then.`,
  hook:`Watch-and-wait: 2-year local regrowth 25.2%; 97% of regrowth is in the bowel wall and usually salvageable. <sup class="c" data-ref="vanderValk2018" title="Source 555">555</sup>`},
 fu:{k:'Follow-up',t:'Life after treatment',
  txt:`Bowel function after a low join can change (low anterior resection syndrome), worse after radiotherapy. Long-term outcomes: in OPRA, disease-free survival was 64% both after TME at restaging and after TME for regrowth, so waiting did not cost those who later needed surgery. See <a href="#living" data-go="living">Living with colorectal cancer</a>. <sup class="c" data-ref="Emmertsen2012,Verheij2024" title="Source 149,562">149,562</sup>`,
  pt:`Regular check-ups continue for years. Changes in bowel habit are common and there is help for them.`,
  hook:`OPRA: DFS 64% after restaging TME and after TME for regrowth. <sup class="c" data-ref="Verheij2024" title="Source 562">562</sup>`}
};
const RE_PANEL={
 mri:{l:['MRI: depth, nodes, distance to the fascia','MERCURY: of 349 MRI-clear margins,','327 (94%) were clear at surgery']},
 scrt:{l:['Short-course RT: 5 × 5 Gy','Dutch TME trial, local recurrence:'],bars:[['RT + TME, 10 y',5,'var(--rx)'],['TME alone, 10 y',11,'var(--bad)']],max:30},
 crt:{l:['50.4 Gy + capecitabine','German trial, 5-y local relapse:'],bars:[['chemoradiation before',6,'var(--rx)'],['chemoradiation after',13,'var(--bad)']],max:30},
 wait:{l:['Waiting several weeks','Stockholm III: delayed surgery after','short-course RT, fewer complications']},
 chemo:{l:['Consolidation: 6 × CAPOX (RAPIDO)','3-y disease-related treatment failure:'],bars:[['TNT (RAPIDO)',23.7,'var(--rx)'],['standard',30.4,'var(--bad)']],max:40},
 restage:{l:['MRI + endoscopy again']},
 tme:{l:['TME: rectum + mesorectum removed','RAPIDO 5-y locoregional recurrence:'],bars:[['after TNT',10,'var(--bad)'],['after standard CRT',6,'var(--rx)']],max:30},
 adj:{l:['Optional adjuvant chemotherapy','PRODIGE 23, 3-y disease-free survival:'],bars:[['FOLFIRINOX first',76,'var(--rx)'],['standard',69,'var(--muted)']],max:100},
 ww:{l:['Surveillance: MRI + endoscopy','Local regrowth, cumulative (IWWD):']},
 fu:{l:['Follow-up for years','RAPIDO 3-y treatment failure:'],bars:[['TNT',23.7,'var(--rx)'],['standard',30.4,'var(--bad)']],max:40}
};
/* cumulative local regrowth after a clinical complete response, % at m months: drawn through 25.2% at 24 months and
   flattening after (88% of regrowths fell within 2 years). Shape schematic. */
const reRegrow=m=>25.2*(1-Math.exp(-Math.max(0,m)/11.3))/(1-Math.exp(-24/11.3));
/* OPRA TME-free survival, % at year y: through 41/53 at 3 years and 39/54 at 5 years (regrowth mostly early) */
const reOpra=(p3,p5,y)=>y<=3?100-(100-p3)*(1-Math.exp(-y/.8))/(1-Math.exp(-3/.8)):lerp(p3,p5,(y-3)/2);

inits.rectal=()=>{
  const svg=$('#reSvg'),rg=$('#reT');let mode='tnt',ccr=false,steps=[],setSt=()=>{};
  function buildSteps(){const P=rePhases(mode,ccr),g=id=>P.find(p=>p.id===id),T=m=>m/RE_M;
    const ids=mode==='tnt'?['mri','scrt','chemo','restage']:['mri','crt','wait','restage'];
    const S=ids.map(id=>{const p=g(id);return Object.assign({from:T(p.a),at:T(Math.min(p.b-.05,p.a+(p.b-p.a)*.5))},RE_TXT[id])});
    if(ccr){const w=g('ww');S.push(Object.assign({from:T(w.a),at:T(w.a+8)},RE_TXT.ww));S.push(Object.assign({from:T(w.a+14),at:T(w.a+22)},RE_TXT.fu,{t:'Two years on',k:'Watch & wait · year 2',
      txt:`In OPRA's 5-year update, 94% of 81 regrowths had occurred within 2 years and 99% within 3. 5-year TME-free survival was 39% (induction) vs 54% (consolidation). A pooled analysis of CAO/ARO/AIO-12 (mandatory TME) and OPRA found no survival difference between the strategies (non-randomised). <sup class="c" data-ref="Verheij2024,Williams2025" title="Source 562,580">562,580</sup>`,
      hook:`OPRA: 94% of regrowths within 2 years, 99% within 3. <sup class="c" data-ref="Verheij2024" title="Source 562">562</sup>`}))}
    else{const tm=g('tme');S.push(Object.assign({from:T(tm.a),at:T(tm.a+.3)},RE_TXT.tme));
      if(mode==='std'){const a=g('adj');S.push(Object.assign({from:T(a.a),at:T(a.a+2)},RE_TXT.adj))}
      else{const f=g('fu');S.push(Object.assign({from:T(f.a+.5),at:T(f.a+8)},RE_TXT.fu))}}
    steps=S}
  function draw(t){
    const N=vb(svg,'720 410','400 610'),m=t*RE_M,P=rePhases(mode,ccr);
    const cur=P.reduce((a,p)=>m>=p.a?p:a,P[0]),ph=phaseOf(steps,t);
    const L=N?{x0:24,x1:384,ty:54,cx:200,cy:236,FX:104,FY:80,px:20,py:390,pw:360}:{x0:60,x1:700,ty:54,cx:190,cy:262,FX:116,FY:88,px:390,py:132,pw:316};
    const X=v=>lerp(L.x0,L.x1,v/RE_M);let s='';
    /* ---- timeline ---- */
    s+=`<text x="${L.x0}" y="16" class="t-sm" style="fill:var(--rx)">${mode==='tnt'?'TOTAL NEOADJUVANT THERAPY':'STANDARD CHEMORADIATION'} · ${ccr?'COMPLETE RESPONSE':'TUMOUR REMAINS'}</text>`;
    s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${L.ty+22}" y2="${L.ty+22}" class="axis"/>`;
    for(let k=0;k<=RE_M;k+=N?6:3)s+=`<line x1="${f1(X(k))}" x2="${f1(X(k))}" y1="${L.ty+22}" y2="${L.ty+26}" class="axis"/><text x="${f1(X(k))}" y="${L.ty+37}" class="t-xs t-mid">${k}</text>`;
    s+=`<text x="${L.x1}" y="${L.ty+50}" class="t-xs t-end">months</text>`;
    let stag=0;P.forEach(p=>{const xa=X(p.a),xb=X(p.b),w=xb-xa,on=m>=p.a;
      s+=`<rect x="${f1(xa)}" y="${L.ty}" width="${f1(Math.max(2,w))}" height="18" rx="3" style="fill:${p.c};opacity:${on?.9:.25};${p.id==='adj'?'stroke:var(--ink);stroke-dasharray:3 2;':''}"/>`;
      const tw=p.n.length*6.2+8;
      if(w>tw)s+=`<text x="${f1(xa+w/2)}" y="${L.ty+13}" class="t-xs t-mid" style="fill:${p.id==='fu'||p.id==='wait'?'var(--ink)':'var(--panel)'};font-weight:700">${p.n}</text>`;
      else{s+=`<text x="${f1(xa+w/2)}" y="${L.ty-4-(stag++%3)*10}" class="t-xs t-mid" style="fill:var(--ink)">${p.n}</text>`}});
    s+=`<line x1="${f1(X(m))}" x2="${f1(X(m))}" y1="${L.ty-6}" y2="${L.ty+24}" style="stroke:var(--ink);stroke-width:2"/><circle cx="${f1(X(m))}" cy="${L.ty+22}" r="4" style="fill:var(--ink)"/>`;
    /* ---- cross-section ---- */
    const {cx,cy,FX,FY}=L,RW=40,RM=29,RL=17,fR=a=>1/Math.sqrt(Math.pow(Math.cos(a)/FX,2)+Math.pow(Math.sin(a)/FY,2));
    const tmeP=P.find(p=>p.id==='tme'),gone=tmeP&&m>=tmeP.a+.25,kT=tmeP?ramp(m,tmeP.a,tmeP.a+.25):0,kOut=tmeP?ramp(m,tmeP.a+.25,tmeP.b):0;
    s+=`<path d="M${cx-FX-26} ${cy+FY+30}Q${cx} ${cy+FY-4} ${cx+FX+26} ${cy+FY+30}L${cx+FX+26} ${cy+FY+46}Q${cx} ${cy+FY+12} ${cx-FX-26} ${cy+FY+46}Z" style="fill:var(--serosa);stroke:var(--muted);stroke-width:1"/>`;
    s+=`<text x="${cx}" y="${cy+FY+42}" class="t-xs t-mid">sacrum</text>`;
    const sz=reSize(mode,ccr,m);
    let rect='';
    rect+=`<ellipse cx="${cx}" cy="${cy}" rx="${FX}" ry="${FY}" style="fill:var(--fat);stroke:var(--muted);stroke-width:1.2"/>`;
    [[-.7,.5],[.6,.55],[.75,-.3],[-.2,.75]].forEach(([a,b],i)=>rect+=node(cx+a*FX*.8,cy+b*FY*.8,6.5,i===0?clamp(sz*1.1-.1):0));
    rect+=`<circle cx="${cx}" cy="${cy}" r="${RW}" style="fill:var(--muscle);opacity:.85"/><circle cx="${cx}" cy="${cy}" r="${RM}" style="fill:var(--mucosa);stroke:var(--mucosa-line)"/><circle cx="${cx}" cy="${cy}" r="${RL}" style="fill:var(--field)"/>`;
    const ta=-Math.PI*.7,maxD=fR(ta)-RM-10,tw=.35+.6*sz;
    if(sz>.02){let d='';const rr=rng(4),n=14,dep=4+maxD*sz;for(let i=0;i<=n;i++){const a=ta-tw/2+i/n*tw,b0=Math.sin(i/n*Math.PI),r=RM+dep*(.5+.5*b0)*(1+(rr()-.5)*.14);d+=(i?'L':'M')+f1(cx+Math.cos(a)*r)+' '+f1(cy+Math.sin(a)*r)}
      for(let i=n;i>=0;i--){const a=ta-tw/2+i/n*tw;d+='L'+f1(cx+Math.cos(a)*(RL+2))+' '+f1(cy+Math.sin(a)*(RL+2))}
      rect+=`<path d="${d}Z" style="fill:var(--tumour);opacity:${f1(.5+.45*sz)}"/>`}
    else rect+=`<path d="M${f1(cx+Math.cos(ta-.25)*(RM+3))} ${f1(cy+Math.sin(ta-.25)*(RM+3))}A${RM+3} ${RM+3} 0 0 1 ${f1(cx+Math.cos(ta+.25)*(RM+3))} ${f1(cy+Math.sin(ta+.25)*(RM+3))}" style="fill:none;stroke:var(--cell);stroke-width:4;stroke-linecap:round"/>`;
    if(tmeP&&kT>0){rect+=`<ellipse cx="${cx}" cy="${cy}" rx="${FX+4}" ry="${FY+4}" style="fill:none;stroke:var(--rx);stroke-width:2;stroke-dasharray:${f1(kT*600)} 700"/>`}
    if(gone){s+=`<ellipse cx="${cx}" cy="${cy}" rx="${FX}" ry="${FY}" style="fill:none;stroke:var(--line);stroke-width:1.4;stroke-dasharray:4 4"/>`;
      const fade=1-.5*kOut-.5*ramp(m,tmeP.b,tmeP.b+1);
      if(fade>.02)s+=`<g transform="translate(${f1(kOut*(N?0:60))} ${f1(-kOut*(N?12:20))}) scale(${f1(1-.45*kOut)})" style="transform-origin:${cx}px ${cy}px;opacity:${f1(fade)}">${rect}</g>`;
      else s+=`<text x="${cx}" y="${cy+4}" class="t-xs t-mid">rectum and mesorectum removed</text>`;
      if(kOut>.6&&fade>.3)s+=`<text x="${cx}" y="${cy+4}" class="t-xs t-mid" style="fill:var(--ink)">specimen → pathology</text>`}
    else s+=rect;
    if(!gone){s+=`<text x="${cx}" y="${cy+3}" class="t-xs t-mid">lumen</text>`;
      if(sz>.02)s+=`<text x="${f1(cx+Math.cos(ta)*(fR(ta)+6)-4)}" y="${f1(cy+Math.sin(ta)*(fR(ta)+6))}" class="t-xs t-end" style="fill:var(--tumour)">tumour ${Math.round(sz*100)}%</text>`;
      else s+=`<text x="${f1(cx+Math.cos(ta)*(fR(ta)+6)-4)}" y="${f1(cy+Math.sin(ta)*(fR(ta)+6))}" class="t-xs t-end" style="fill:var(--good)">scar only</text>`}
    /* treatment overlays */
    if(cur.id==='mri'||cur.id==='restage'){s+=`<rect x="${cx-FX-14}" y="${cy-FY-14}" width="${2*FX+28}" height="${2*FY+28}" rx="14" style="fill:none;stroke:var(--accent);stroke-width:2;stroke-dasharray:6 4"/><text x="${cx+FX+10}" y="${cy-FY-2}" class="t-sm t-end" style="fill:var(--accent)">MRI</text>`;
      if(cur.id==='restage')s+=scope(cx-RL+6,cy,0,{light:true})}
    if(cur.id==='scrt'||cur.id==='crt'){const pulse=.25+.25*Math.sin(m*40);[[-1,0],[1,0],[0,1],[-.7,-.7],[.7,-.7]].forEach(([a,b])=>{const ox=cx+a*(FX+50),oy=cy+b*(FY+40);s+=`<path d="M${f1(ox-b*14)} ${f1(oy+a*14)}L${cx} ${cy}L${f1(ox+b*14)} ${f1(oy-a*14)}Z" style="fill:var(--gold);opacity:${f1(pulse)}"/>`});
      s+=`<text x="${cx-FX-10}" y="${cy-FY-24}" class="t-sm" style="fill:var(--gold)">${cur.id==='scrt'?'5 × 5 Gy':'50.4 Gy + capecitabine'}</text>`}
    if(cur.id==='chemo'||cur.id==='adj'){for(let i=0;i<8;i++){const a=i/8*Math.PI*2+m,r=(FX+30)*(1-((m*1.7+i*.37)%1)*.7);s+=`<circle cx="${f1(cx+Math.cos(a)*r)}" cy="${f1(cy+Math.sin(a)*r*FY/FX)}" r="3.4" style="fill:var(--rx)"/>`}
      s+=`<text x="${cx-FX-10}" y="${cy-FY-24}" class="t-sm" style="fill:var(--rx)">${cur.id==='chemo'?'CAPOX cycle '+Math.min(6,1+Math.floor((m-1)/(4.2/6))):'adjuvant chemotherapy'}</text>`}
    if(cur.id==='ww'){const since=m-cur.a,chk=since%3<.35;s+=`<text x="${cx-FX-10}" y="${cy-FY-24}" class="t-sm" style="fill:var(--good)">${chk?'check: MRI + endoscopy':'surveillance'}</text>`;if(chk)s+=scope(cx-RL+6,cy,0,{light:true})}
    /* ---- panel ---- */
    const PN=RE_PANEL[cur.id]||{l:[]};let y=L.py;
    s+=`<text x="${L.px}" y="${y}" class="t-big">${cur.n}</text>`;y+=20;
    const lines=PN.l.slice();if(cur.id==='restage')lines.push(ccr?'No visible tumour: clinical complete response':'Tumour still visible: surgery planned');
    lines.forEach((l,i)=>{s+=`<text x="${L.px}" y="${y}" class="t-sm" style="fill:${i?'var(--muted)':'var(--ink)'}">${l}</text>`;y+=15});
    if(PN.bars){y+=4;PN.bars.forEach(([l,v,c])=>{const w=(L.pw-60)*v/PN.max*clamp((m-cur.a)/Math.max(.3,(cur.b-cur.a)*.5)+.2);s+=`<rect x="${L.px}" y="${y}" width="${f1(Math.max(2,w))}" height="16" rx="3" style="fill:${c};opacity:.85"/><text x="${f1(L.px+Math.max(2,w)+6)}" y="${y+12}" class="t-sm" style="fill:var(--ink);font-weight:700">${v}%</text><text x="${L.px}" y="${y+29}" class="t-xs">${l}</text>`;y+=40})}
    if(cur.id==='ww'){const C={x0:L.px+28,x1:L.px+L.pw-20,y0:y+8,y1:y+(N?130:110)},Xm=v=>lerp(C.x0,C.x1,v/24),Yp=v=>lerp(C.y1,C.y0,v/30),since=Math.min(24,m-cur.a);
      [0,10,20,30].forEach(v=>s+=`<line x1="${C.x0}" x2="${C.x1}" y1="${f1(Yp(v))}" y2="${f1(Yp(v))}" class="${v?'grid':'axis'}"/><text x="${C.x0-5}" y="${f1(Yp(v)+3)}" class="t-xs t-end">${v}%</text>`);
      [0,12,24].forEach(v=>s+=`<text x="${f1(Xm(v))}" y="${C.y1+13}" class="t-xs t-mid">${v}</text>`);s+=`<text x="${C.x1}" y="${C.y1+25}" class="t-xs t-end">months on watch-and-wait</text>`;
      if(since>0)s+=`<path d="${pathFn(u=>reRegrow(u*since)/30,C.x0,Xm(since),C.y1,C.y0,60)}" style="fill:none;stroke:var(--bad);stroke-width:2.6"/>`;
      if(since>=24)s+=`<circle cx="${f1(Xm(24))}" cy="${f1(Yp(25.2))}" r="5" style="fill:none;stroke:var(--ink);stroke-width:1.8"/><text x="${f1(Xm(24)-8)}" y="${f1(Yp(25.2)-8)}" class="t-xs t-end" style="fill:var(--ink);font-weight:700">25.2% at 2 years</text>`}
    svg.innerHTML=s;
    setSt(ph);$('#reNote').innerHTML=noteHTML(steps[ph]);
    $('#reRead').innerHTML=`<span>month <b>${f1(m)}</b></span><span>phase <b>${cur.n}</b></span><span>tumour <b>${gone?'removed':sz<.02?'not visible':Math.round(sz*100)+'% of starting size'}</b> (drawn)</span>${cur.id==='ww'?`<span>regrowth so far <b>${f1(reRegrow(Math.min(24,m-cur.a)))}%</b> of people (IWWD, schematic between published points) <sup class="c" data-ref="vanderValk2018" title="Source 555">555</sup></span>`:''}`;
  }
  const stop=playWire(rg,$('#rePlay'),draw,22000,'Replay','rectal');
  function wire(){buildSteps();const old=$('#reSteps'),nu=old.cloneNode(false);old.replaceWith(nu);setSt=stepWire(nu,steps,rg,draw,stop)}
  $$('[data-re-mode]').forEach(b=>b.addEventListener('click',()=>{stop();mode=b.dataset.reMode;$$('[data-re-mode]').forEach(x=>x.setAttribute('aria-pressed',x===b));wire();draw(+rg.value)}));
  $$('[data-re-resp]').forEach(b=>b.addEventListener('click',()=>{stop();ccr=b.dataset.reResp==='ccr';$$('[data-re-resp]').forEach(x=>x.setAttribute('aria-pressed',x===b));wire();draw(+rg.value)}));
  wire();draw(+rg.value);

  /* ---- watch-and-wait outcomes ---- */
  const wv=$('#reWw'),wr=$('#reWwT');let ds='iwwd';
  const WN={iwwd:{k:'IWWD · van der Valk 2018',t:'About 1 in 4 regrow, mostly early',
     txt:`Among 880 people with a clinical complete response managed without surgery (47 institutes, 15 countries, median follow-up 3.3 years), the 2-year cumulative local regrowth was 25.2% (95% CI 22.2–28.5). 88% of regrowths were found in the first 2 years and 97% were in the bowel wall. Distant metastases occurred in 8%; 5-year overall survival was 85% and disease-specific survival 94%. <sup class="c" data-ref="vanderValk2018" title="Source 555">555</sup>`,
     pt:`Most regrowths show up in the first 2 years, which is why checks are most frequent then.`,hook:`IWWD: 25.2% local regrowth at 2 years; 88% of regrowths within 2 years. <sup class="c" data-ref="vanderValk2018" title="Source 555">555</sup>`},
   opra:{k:'OPRA · Garcia-Aguilar 2022, Verheij 2024',t:'Consolidation keeps more rectums',
     txt:`OPRA randomised 324 people to 4 months of FOLFOX or CAPOX before chemoradiation (induction) or after it (consolidation), offering watch-and-wait for a complete or near-complete response. TME-free survival was 41% vs 53% at 3 years and 39% vs 54% at 5 years (P=.012), with similar disease-free survival (71% vs 69% at 5 years). 94% of regrowths occurred within 2 years. <sup class="c" data-ref="GarciaAguilar2022,Verheij2024" title="Source 193,562">193,562</sup>`,
     pt:`About half of people given chemotherapy after chemoradiation still had their rectum five years later.`,hook:`OPRA 5-year TME-free survival: 54% consolidation vs 39% induction. <sup class="c" data-ref="Verheij2024" title="Source 562">562</sup>`}};
  function drawW(t){const N=vb(wv,'720 290','400 420'),Y=t*5;let s='';const C=N?{x0:50,x1:384,y0:40,y1:330}:{x0:70,x1:690,y0:40,y1:240};
    const X=v=>lerp(C.x0,C.x1,v/5),V=v=>lerp(C.y1,C.y0,v/100);
    [0,25,50,75,100].forEach(v=>s+=`<line x1="${C.x0}" x2="${C.x1}" y1="${f1(V(v))}" y2="${f1(V(v))}" class="${v?'grid':'axis'}"/><text x="${C.x0-6}" y="${f1(V(v)+3)}" class="t-xs t-end">${v}%</text>`);
    [0,1,2,3,4,5].forEach(v=>s+=`<text x="${f1(X(v))}" y="${C.y1+14}" class="t-xs t-mid">${v}</text>`);s+=`<text x="${C.x1}" y="${C.y1+28}" class="t-xs t-end">years</text>`;
    const pt=(x,y,l,c,left)=>`<circle cx="${f1(X(x))}" cy="${f1(V(y))}" r="5" style="fill:none;stroke:var(--ink);stroke-width:1.8"/><text x="${f1(X(x)+(left?-8:8))}" y="${f1(V(y)-8)}" class="t-xs${left?' t-end':''}" style="fill:${c};font-weight:700">${l}</text>`;
    if(ds==='iwwd'){s+=`<text x="${C.x0}" y="22" class="t-sm" style="fill:var(--bad)">${N?'LOCAL REGROWTH, CUMULATIVE (IWWD)':'CUMULATIVE LOCAL REGROWTH AFTER A CLINICAL COMPLETE RESPONSE (IWWD, n=880)'}</text>`;
      if(Y>0)s+=`<path d="${pathFn(u=>reRegrow(u*Y*12)/100,C.x0,X(Y),C.y1,C.y0,80)}" style="fill:none;stroke:var(--bad);stroke-width:2.8"/>`;
      if(Y>=2)s+=pt(2,25.2,'25.2% at 2 years','var(--bad)',false);
      if(Y>=4.9)s+=`<text x="${f1(X(5)-4)}" y="${f1(V(94)+4)}" class="t-xs t-end" style="fill:var(--good)">5-y disease-specific survival 94%</text><text x="${f1(X(5)-4)}" y="${f1(V(85)+4)}" class="t-xs t-end" style="fill:var(--accent)">5-y overall survival 85%</text>`}
    else{s+=`<text x="${C.x0}" y="22" class="t-sm" style="fill:var(--rx)">${N?'ALIVE WITH RECTUM KEPT (OPRA)':'TME-FREE SURVIVAL: STILL HAVE THE RECTUM (OPRA, n=324)'}</text>`;
      [[53,54,'var(--rx)','consolidation'],[41,39,'var(--accent)','induction']].forEach(([a,b,c,l],i)=>{if(Y>0)s+=`<path d="${pathFn(u=>reOpra(a,b,u*Y)/100,C.x0,X(Y),C.y1,C.y0,80)}" style="fill:none;stroke:${c};stroke-width:2.6"/>`;
        if(Y>=3)s+=pt(3,a,a+'%','var(--ink)',true);if(Y>=5)s+=pt(5,b,b+'% '+l,c,true)})}
    s+=`<line x1="${f1(X(Y))}" x2="${f1(X(Y))}" y1="${C.y0}" y2="${C.y1}" style="stroke:var(--ink);opacity:.3"/>`;
    wv.innerHTML=s;
    $('#reWwCap').innerHTML=ds==='iwwd'?`Year ${f1(Y)}: about ${f1(reRegrow(Math.min(Y,5)*12))}% regrown. The curve is drawn through the published 2-year point and flattens because 88% of regrowths came in the first 2 years; its exact shape is not published here. Registry data. <sup class="c" data-ref="vanderValk2018" title="Source 555">555</sup>`
      :`Year ${f1(Y)}. Curves drawn through the published 3- and 5-year points; the early shape reflects that 94% of regrowths happened within 2 years. Randomised phase II data. <sup class="c" data-ref="GarciaAguilar2022,Verheij2024" title="Source 193,562">193,562</sup>`;
    $('#reWwNote').innerHTML=noteHTML(WN[ds])}
  playWire(wr,$('#reWwPlay'),drawW,7000,'Replay','rectal');
  $$('[data-re-ww]').forEach(b=>b.addEventListener('click',()=>{ds=b.dataset.reWw;$$('[data-re-ww]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawW(+wr.value)}));
  drawW(+wr.value);

  /* ---- dMMR and dostarlimab ---- */
  const dv=$('#reDm');let yr='2025',stopD=null;
  const DN={'2022':{k:'Cercek 2022 · NEJM',t:'12 of 12: every tumour vanished',
     txt:`<span class="ev early">Early evidence</span> People with stage II–III dMMR rectal cancer received dostarlimab every 3 weeks for 6 months. All 12 who completed treatment (100%; 95% CI 74–100) had a clinical complete response; none needed chemoradiation or surgery, and there were no grade ≥3 adverse events, at 6–25 months of follow-up. <sup class="c" data-ref="Cercek2022" title="Source 91">91</sup>`,
     pt:`In a small trial, a single immunotherapy drug made every one of these tumours disappear on scans and scope.`,hook:`dMMR rectal cancer + dostarlimab: 12/12 clinical complete responses. <sup class="c" data-ref="Cercek2022" title="Source 91">91</sup>`},
   '2025':{k:'Cercek 2025 · NEJM',t:'49 of 49 who completed treatment',
     txt:`<span class="ev early">Early evidence</span> In the update (dostarlimab 500 mg IV every 3 weeks for 9 cycles), the rectal cohort had 50 people. All 49 who completed treatment had a clinical complete response and chose nonoperative management; 37 had a sustained response of at least 12 months at data cut. 2-year recurrence-free survival was 96% (median follow-up 30.2 months). The global AZUR-1 trial (154 people, interim analysis) found a clinical complete response sustained for 12 months in 68% of 144 people followed for at least 12 months. Regulatory status: since October 2026 the JEMPERLI US label includes dostarlimab alone for stage II/III MSI-H or dMMR locally advanced rectal cancer (500 mg every 3 weeks for 9 cycles), "approved under accelerated approval based on sustained clinical complete response for 12 months"; "the long-term risk of relapse is unknown". <sup class="c" data-ref="Cercek2025,Cercek2026,FDA-Jemperli" title="Source 92,93,164">92,93,164</sup>`,
     pt:`In the US this is now an approved option, on an accelerated basis: how long the responses last over many years is not yet known. It applies only to the small dMMR group.`,hook:`Cercek 2025: 49/49 cCR in those completing treatment; 2-year RFS 96%. FDA accelerated approval for dMMR locally advanced rectal cancer, October 2026. <sup class="c" data-ref="Cercek2025,FDA-Jemperli" title="Source 92,164">92,164</sup>`}};
  function drawD(k){const N=vb(dv,'520 250','400 300'),n=yr==='2022'?12:50;let s='';const cols=N?10:15,g=N?34:30,x0=N?30:36,y0=N?58:58;
    s+=`<text x="${x0-14}" y="22" class="t-sm" style="fill:var(--good)">${yr==='2022'?'12 PEOPLE COMPLETED TREATMENT':'RECTAL COHORT: 50 PEOPLE'}</text>`;
    for(let i=0;i<n;i++){const r=Math.floor(i/cols),c=i%cols,x=x0+c*g,y=y0+r*g,inc=yr==='2025'&&i===n-1,on=i<n*k;
      s+=`<circle cx="${x}" cy="${y}" r="${N?12:11}" style="fill:${inc?'none':on?'var(--good)':'var(--line)'};stroke:${inc?'var(--muted)':'none'};stroke-width:1.6;${inc?'stroke-dasharray:3 2':''}"/>`;
      if(on&&!inc)s+=`<path d="M${x-5} ${y}l3.5 4l6.5 -8" style="fill:none;stroke:var(--panel);stroke-width:2.2;stroke-linecap:round"/>`}
    const ly=y0+Math.ceil(n/cols)*g+4;
    s+=`<circle cx="${x0-4}" cy="${ly}" r="6" style="fill:var(--good)"/><text x="${x0+8}" y="${ly+4}" class="t-xs">clinical complete response</text>`;
    if(yr==='2025')s+=`<circle cx="${x0+(N?190:200)}" cy="${ly}" r="6" style="fill:none;stroke:var(--muted);stroke-dasharray:3 2"/><text x="${x0+(N?202:212)}" y="${ly+4}" class="t-xs">not yet completed</text>`;
    dv.innerHTML=s}
  function showD(){$('#reDmNote').innerHTML=noteHTML(DN[yr]);if(stopD)stopD();stopD=animate(1000,p=>drawD(ease(p)))}
  $$('[data-re-dm]').forEach(b=>b.addEventListener('click',()=>{yr=b.dataset.reDm;$$('[data-re-dm]').forEach(x=>x.setAttribute('aria-pressed',x===b));showD()}));
  drawD(1);$('#reDmNote').innerHTML=noteHTML(DN[yr]);
  onHide.rectal=(f=>()=>{f&&f();if(stopD)stopD()})(onHide.rectal);
  const prevR=redraws.rectal;redraws.rectal=()=>{prevR&&prevR();drawD(1)};
};
/* =============== 4.4 Metastatic disease =============== */
const MT_STEPS=[
 {from:0,at:.17,k:'Step 1 · Breaking away',t:'Cells leave the primary tumour',
  txt:`A cancer that has invaded the bowel wall can shed cells into its veins. Sequencing of paired lesions suggests that cells within a cancer gain the ability to metastasise in under 2 years, with few if any extra selective events <sup class="c" data-ref="Jones2008" title="Source 270">270</sup>. Modelling of biopsies suggested that seeding often happened while the primary was still clinically undetectable, typically under 0.01 cm³ <span class="ev early">Early evidence</span> <sup class="c" data-ref="Hu2019" title="Source 242">242</sup>. In the Burgundy registry, 14.5% of people already had liver metastases at diagnosis, and the 5-year cumulative rate of later liver metastases was also 14.5% <sup class="c" data-ref="Manfredi2006" title="Source 348">348</sup>.`,
  pt:`Spread happens when a few cancer cells get into the bloodstream and settle in another organ, sometimes before the bowel tumour is even found.`,
  hook:`Synchronous metastases are present at diagnosis; metachronous ones appear later. For the liver, both were 14.5% in Burgundy.`},
 {from:.2,at:.36,k:'Step 2 · The liver',t:'Up the portal vein to the liver',
  txt:`Veins from the colon and upper rectum drain into the portal vein, which runs to the liver first (textbook anatomy, not stated in the cited abstracts). The liver is the commonest site: in a German registry 24.7% developed liver metastases, 71% of them synchronous <sup class="c" data-ref="Hackl2014" title="Source 212">212</sup>; in Stockholm, 26.5% within 5 years, more often after left-sided than right-sided colon cancer (28.4% vs 22.1%) <sup class="c" data-ref="Engstrand2018" title="Source 150">150</sup>. The 5-year risk of later liver metastases rises with stage: 3.7% after stage I, 13.3% after stage II and 30.4% after stage III <sup class="c" data-ref="Manfredi2006" title="Source 348">348</sup>.`,
  pt:`Blood from the bowel passes through the liver before it goes anywhere else, so the liver is the most common place for colorectal cancer to spread.`,
  hook:`Later liver metastases within 5 years: stage I 3.7%, stage II 13.3%, stage III 30.4%.`},
 {from:.4,at:.56,k:'Step 3 · Lungs and peritoneum',t:'The lungs and the abdominal lining',
  txt:`Veins of the low rectum drain into the systemic circulation (textbook anatomy), and rectal cancer spreads to the chest more often than colon cancer (OR 2.4) and to the peritoneum less often (OR 0.3) <sup class="c" data-ref="Riihimaki2016" title="Source 454">454</sup>. Synchronous lung metastases were found in 11.0% in Burgundy <sup class="c" data-ref="Mitry2010" title="Source 370">370</sup>, and peritoneal spread in 8.3% in Stockholm, the only metastatic site in 4.8% <sup class="c" data-ref="Segelman2012" title="Source 481">481</sup>. Mucinous and signet-ring tumours favour the peritoneum (OR 3.8 in colon cancer) and the liver less (OR 0.5) <sup class="c" data-ref="Riihimaki2016" title="Source 454">454</sup>.`,
  pt:`Cancer low in the rectum can bypass the liver and reach the lungs. Cells can also drop into the lining of the belly, called the peritoneum.`,
  hook:`Rectal cancer → lungs more often than colon cancer (OR 2.4). Mucinous or signet-ring → peritoneum.`},
 {from:.6,at:.76,k:'Path A · Resectable liver metastases',t:'Removing the liver metastases',
  txt:`If every liver metastasis can be removed, hepatectomy offers a chance of cure: in 612 consecutive patients, about one in six were actual 10-year survivors, and 97% of those were disease-free <sup class="c" data-ref="Tomlinson2007" title="Source 536">536</sup>. EORTC 40983 gave 6 cycles of FOLFOX4 before and 6 after surgery to people with up to 4 resectable metastases. Three-year PFS rose from 28.1% to 35.4% (HR 0.79; p=0.058) <sup class="c" data-ref="Nordlinger2008" title="Source 407">407</sup>, but 5-year OS did not differ: 51.2% vs 47.8% (HR 0.88; p=0.34) <sup class="c" data-ref="Nordlinger2013" title="Source 408">408</sup>. ASCO 2023: perioperative chemotherapy or surgery alone "should be offered" <sup class="c" data-ref="Morris2023" title="Source 380">380</sup>.`,
  pt:`Spread to the liver is not always incurable. When surgeons can remove every spot, some people stay free of cancer for good.`,
  hook:`EORTC 40983: perioperative FOLFOX4 improved PFS, not OS. About 1 in 6 people having hepatectomy are cured (actual 10-year survivors).`},
 {from:.8,at:.97,k:'Path B · Systemic therapy',t:'Treating the whole body',
  txt:`When the spots cannot all be removed, systemic therapy reaches every site, chosen by the tumour's biomarkers (see the ladder below). In one US centre, median OS rose from 22.6 months (2004–2012) to 28.8 (2013–2015) and 32.4 months (2016–2019). Longer survival was linked to liver resection (HR 0.26), immunotherapy (HR 0.44) and third-line drugs (HR 0.74), not to calendar year itself <sup class="c" data-ref="Zeineddine2023" title="Source 599">599</sup>. Population medians are lower: 12 months for all stage IV patients in the Netherlands in 2008–2011 <sup class="c" data-ref="vanderGeest2015" title="Source 552">552</sup>.`,
  pt:`Medicines that travel in the blood reach every spot. On average people now live longer than 20 years ago, but these are group figures and each person's course differs.`,
  hook:`Median OS by era (one US centre): 22.6 → 28.8 → 32.4 months. Liver resection carried the largest survival association (HR 0.26).`}
];
const MT_PROF={
 msi:{n:'MSI-H / dMMR',d:`Mismatch-repair-deficient tumours carry many mutations and respond to checkpoint inhibitors, which often work better than chemotherapy with fewer serious side effects. <sup class="c" data-ref="Andre2020,Andre2024" title="Source 16,18">16,18</sup>`},
 ras:{n:'RAS wild-type, left-sided (MSS)',d:`For MSS/pMMR, left-sided, RAS wild-type disease, ASCO 2023 recommends chemotherapy plus anti-EGFR first-line. RAS testing must cover KRAS and NRAS exons 2–4: other RAS mutations were found in 14.7% of KRAS exon 2 wild-type tumours in CRYSTAL, and those did not benefit from cetuximab. <sup class="c" data-ref="Morris2023,VanCutsem2015" title="Source 380,550">380,550</sup>`},
 braf:{n:'BRAF V600E',d:`BRAF V600E is linked to right-sided primaries and shorter survival (median 10.4 vs 34.7 months in one metastatic cohort). Encorafenib is given with cetuximab because EGFR feedback undoes BRAF inhibition alone. <sup class="c" data-ref="Tran2011,Kopetz2019" title="Source 290,540">290,540</sup>`},
 her2:{n:'HER2-amplified',d:`About 5% (48 of 914) of KRAS exon 2 wild-type tumours were HER2-positive in HERACLES. First-line choice still follows RAS, side and MMR status; HER2 guides later lines. <sup class="c" data-ref="SartoreBianchi2016,Morris2023" title="Source 380,469">380,469</sup>`},
 g12c:{n:'KRAS G12C',d:`KRAS G12C was found in 3.2% of colorectal carcinomas in a US cohort and was linked to higher CRC-specific mortality (HR 1.82). A G12C inhibitor works best paired with an anti-EGFR antibody, in later lines. <sup class="c" data-ref="Ugai2024,Fakih2023,Yaeger2023" title="Source 152,543,591">152,543,591</sup>`},
 oth:{n:'None of these: MSS, RAS-mutant or right-sided',d:`For RAS-mutant or right-sided disease, ASCO 2023 recommends chemotherapy plus anti-VEGF. Doublet chemotherapy "should be offered", or triplet "may be offered". <sup class="c" data-ref="Morris2023" title="Source 380">380</sup>`}
};
const MT_ALL=['msi','ras','braf','her2','g12c','oth'];
const MT_RX=[
 {l:1,p:['msi'],n:'Pembrolizumab',tr:'KEYNOTE-177',k:'PFS 16.5 vs 8.2 months',
  r:`First-line, 307 people: median PFS 16.5 vs 8.2 months with chemotherapy (HR 0.60); grade ≥3 treatment-related events 22% vs 66%. Final OS: not reached vs 36.7 months (HR 0.74, 0.53–1.03), missing significance with 60% crossover. <sup class="c" data-ref="Andre2020,Diaz2022" title="Source 16,128">16,128</sup>`,
  lab:`Keytruda label: for unresectable or metastatic MSI-H or dMMR CRC "as determined by an FDA-authorized test". <sup class="c" data-ref="FDA-Keytruda" title="Source 165">165</sup>`},
 {l:1,p:['msi'],n:'Nivolumab + ipilimumab',tr:'CheckMate 8HW (final OS 2026)',k:'24-month PFS 72% vs 14%',
  r:`First-line: 24-month PFS 72% vs 14% with chemotherapy; grade 3–4 treatment-related events 23% vs 48%. Across all lines it beat nivolumab alone on PFS (HR 0.62). Final analysis at 68 months: OS HR 0.37 vs chemotherapy and 0.61 vs nivolumab. <sup class="c" data-ref="Andre2024,Andre2025,Lonardi2026" title="Source 18,19,335">18,19,335</sup>`,
  lab:`Opdivo and Yervoy labels: for adults and children 12 years and older with unresectable or metastatic MSI-H or dMMR CRC. <sup class="c" data-ref="FDA-Opdivo,FDA-Yervoy" title="Source 169,180">169,180</sup>`},
 {l:1,p:['ras'],n:'Chemotherapy + anti-EGFR (panitumumab or cetuximab)',tr:'PARADIGM · CRYSTAL',k:'OS 37.9 vs 34.3 months (PARADIGM)',
  r:`PARADIGM, left-sided RAS wild-type: panitumumab plus mFOLFOX6 gave OS 37.9 vs 34.3 months with bevacizumab (HR 0.82), response 80.2% vs 68.6%, acneiform rash 74.8%. CRYSTAL, KRAS wild-type: FOLFIRI plus cetuximab OS 23.5 vs 20.0 months. <sup class="c" data-ref="Watanabe2023,VanCutsem2011" title="Source 549,574">549,574</sup>`,
  lab:`Erbitux label: "not indicated for treatment of Ras-mutant colorectal cancer or when the results of the Ras mutation tests are unknown." Vectibix: RAS status confirmed across KRAS and NRAS exons 2, 3 and 4. <sup class="c" data-ref="FDA-Erbitux,FDA-Vectibix" title="Source 160,177">160,177</sup>`},
 {l:1,p:['oth','her2','g12c'],n:'Doublet chemotherapy + bevacizumab',tr:'Hurwitz 2004',k:'OS 20.3 vs 15.6 months',
  r:`Adding bevacizumab to IFL: OS 20.3 vs 15.6 months (HR 0.66), PFS 10.6 vs 6.2 months; grade 3 hypertension 11.0% vs 2.3%. <sup class="c" data-ref="Hurwitz2004" title="Source 245">245</sup>`,
  lab:`Avastin label: with IV fluorouracil-based chemotherapy, first- or second-line; it "is not indicated for adjuvant treatment of colon cancer". <sup class="c" data-ref="FDA-Avastin" title="Source 153">153</sup>`},
 {l:1,p:['oth','her2','g12c'],n:'FOLFOXIRI + bevacizumab (triplet)',tr:'TRIBE',k:'OS 29.8 vs 25.8 months',
  r:`Against FOLFIRI-bevacizumab: PFS 12.1 vs 9.7 months, response 65% vs 53%, OS 29.8 vs 25.8 months (HR 0.80), with more neutropenia, diarrhoea, stomatitis and neurotoxicity. For fit, selected patients. <sup class="c" data-ref="Loupakis2014,Cremolini2015" title="Source 113,338">113,338</sup>`,lab:''},
 {l:1,p:['braf'],n:'Encorafenib + cetuximab + mFOLFOX6',tr:'BREAKWATER',k:'OS 30.3 vs 15.1 months',
  r:`First-line BRAF V600E: PFS 12.8 vs 7.1 months (HR 0.53); interim OS 30.3 vs 15.1 months (HR 0.49); response 60.9% vs 40.0%. With FOLFIRI (cohort 3): PFS 15.2 vs 8.3 months. <sup class="c" data-ref="Elez2025,Kopetz2025,Kopetz2026" title="Source 146,291,292">146,291,292</sup>`,
  lab:`Braftovi label: with cetuximab and fluorouracil-based chemotherapy for BRAF V600E mCRC "as detected by an FDA-authorized test". <sup class="c" data-ref="FDA-Braftovi" title="Source 154">154</sup>`},
 {l:2,p:['oth','ras','her2','g12c','msi'],n:'Switch the chemotherapy backbone, keep a biologic',tr:'Avastin label · TRIBE2',k:'FOLFOX ↔ FOLFIRI',
  r:`TRIBE2 compared mFOLFOX6-bevacizumab followed by FOLFIRI-bevacizumab with upfront FOLFOXIRI-bevacizumab and reintroduction (PFS2 16.4 vs 19.2 months). After first-line immunotherapy, the chemotherapy-based options follow. <sup class="c" data-ref="Cremolini2020,Morris2023" title="Source 114,380">114,380</sup>`,
  lab:`Avastin label: second-line with fluoropyrimidine-irinotecan or -oxaliplatin chemotherapy after progression on a first-line bevacizumab regimen. <sup class="c" data-ref="FDA-Avastin" title="Source 153">153</sup>`},
 {l:2,p:['braf'],n:'Encorafenib + cetuximab',tr:'BEACON',k:'OS 8.4 vs 5.4 months',
  r:`After 1–2 prior regimens: OS 9.0 months with binimetinib added and 8.4 months with the doublet vs 5.4 with control; confirmed response 26% vs 2%. <sup class="c" data-ref="Kopetz2019" title="Source 290">290</sup>`,
  lab:`Erbitux label: with encorafenib for BRAF V600E mCRC "after prior therapy". <sup class="c" data-ref="FDA-Erbitux" title="Source 160">160</sup>`},
 {l:2,p:['msi'],n:'Nivolumab + ipilimumab (if not used first)',tr:'CheckMate 8HW, all lines',k:'PFS HR 0.62 vs nivolumab',
  r:`Across lines, the combination beat nivolumab alone: PFS HR 0.62 (median not reached vs 39.3 months) and final OS HR 0.61. <sup class="c" data-ref="Andre2025,Lonardi2026" title="Source 19,335">19,335</sup>`,lab:''},
 {l:3,p:['her2'],n:'Tucatinib + trastuzumab',tr:'MOUNTAINEER',k:'Response 38.1%',
  r:`Chemotherapy-refractory, RAS wild-type: response 38.1%; final analysis response 39.3%, duration 15.2 months, PFS 8.1 and OS 23.9 months (single arm). Diarrhoea 64%. MOUNTAINEER-03 is testing it first-line. <sup class="c" data-ref="Strickler2023,Strickler2026,NCT05253651" title="Source 397,514,515">397,514,515</sup>`,
  lab:`Tukysa label: accelerated approval "based on tumor response rate and durability of response", after fluoropyrimidine, oxaliplatin and irinotecan. <sup class="c" data-ref="FDA-Tukysa" title="Source 176">176</sup>`},
 {l:3,p:['her2'],n:'Trastuzumab deruxtecan',tr:'DESTINY-CRC02',k:'Response 37.8%',
  r:`At 5.4 mg/kg: response 37.8%; drug-related ILD or pneumonitis 8%, all grade 1–2. In DESTINY-CRC01, two of five ILD cases were fatal. <sup class="c" data-ref="Raghav2024,Siena2021" title="Source 446,496">446,496</sup>`,
  lab:`Enhertu label: tumour-agnostic accelerated approval for HER2-positive (IHC 3+) solid tumours; boxed warning for interstitial lung disease. <sup class="c" data-ref="FDA-Enhertu" title="Source 159">159</sup>`},
 {l:3,p:['g12c'],n:'Sotorasib + panitumumab',tr:'CodeBreaK 300',k:'PFS 5.6 vs 2.2 months',
  r:`Chemorefractory KRAS G12C: PFS 5.6 vs 2.2 months with trifluridine/tipiracil or regorafenib (HR 0.49); response 26.4% vs 0%. OS HR 0.70 (0.41–1.18), not adequately powered. <sup class="c" data-ref="Fakih2023,Pietrantonio2025" title="Source 152,431">152,431</sup>`,
  lab:`Lumakras label: 960 mg once daily with panitumumab after fluoropyrimidine, oxaliplatin and irinotecan (label wording). <sup class="c" data-ref="FDA-Lumakras" title="Source 168">168</sup>`},
 {l:3,p:['g12c'],n:'Adagrasib + cetuximab',tr:'KRYSTAL-1',k:'Response 34.0%',
  r:`Response 46% in the first 28 patients and 34.0% in 94; PFS 6.9 and OS 15.9 months (single arm). Adagrasib alone: 19%. <sup class="c" data-ref="Yaeger2023,Yaeger2024" title="Source 591,592">591,592</sup>`,
  lab:`Krazati label: the colorectal accelerated-approval indication was removed in August 2026; the US label now covers lung cancer only. <sup class="c" data-ref="FDA-Krazati" title="Source 166">166</sup>`},
 {l:3,p:['msi'],n:'Nivolumab alone (if no checkpoint inhibitor yet)',tr:'Opdivo label',k:'labelled after 3 chemotherapy drugs',
  r:`The label covers nivolumab alone after progression on a fluoropyrimidine, oxaliplatin and irinotecan; in CheckMate 8HW the combination beat nivolumab alone. <sup class="c" data-ref="FDA-Opdivo,Andre2025" title="Source 19,169">19,169</sup>`,lab:''},
 {l:3,p:MT_ALL,n:'Regorafenib',tr:'CORRECT',k:'OS 6.4 vs 5.0 months',
  r:`OS 6.4 vs 5.0 months with placebo (HR 0.77); grade ≥3 hand-foot skin reaction 17%. <sup class="c" data-ref="Grothey2013" title="Source 200">200</sup>`,
  lab:`Stivarga boxed warning: "Severe and sometimes fatal hepatotoxicity has occurred in clinical trials". <sup class="c" data-ref="FDA-Stivarga" title="Source 174">174</sup>`},
 {l:3,p:MT_ALL,n:'Trifluridine/tipiracil ± bevacizumab',tr:'RECOURSE · SUNLIGHT · PRABITAS',k:'OS 10.8 vs 7.5 months (SUNLIGHT)',
  r:`RECOURSE: OS 7.1 vs 5.3 months with placebo (HR 0.68). SUNLIGHT: adding bevacizumab, OS 10.8 vs 7.5 months (HR 0.61). PRABITAS: a 14-day schedule was non-inferior to 28-day (OS 11.3 vs 10.3 months) and cut grade ≥3 neutropenia from 39% to 13%. <sup class="c" data-ref="Mayer2015,Prager2023,Sakakida2026" title="Source 353,438,465">353,438,465</sup>`,
  lab:`Lonsurf label: alone or with bevacizumab after fluoropyrimidine, oxaliplatin and irinotecan chemotherapy, an anti-VEGF agent and (if RAS wild-type) an anti-EGFR agent. <sup class="c" data-ref="FDA-Lonsurf" title="Source 167">167</sup>`},
 {l:3,p:MT_ALL,n:'Fruquintinib',tr:'FRESCO-2',k:'OS 7.4 vs 4.8 months',
  r:`After a median of 4 prior lines: OS 7.4 vs 4.8 months with placebo (HR 0.66); grade ≥3 hypertension 14%. <sup class="c" data-ref="Dasari2023" title="Source 120">120</sup>`,
  lab:`Fruzaqla label: for previously treated mCRC, with anti-EGFR "if RAS wild-type and medically appropriate"; first FDA approval 2023-11-08. <sup class="c" data-ref="FDA-Fruzaqla,FDA-DrugsAtFDA" title="Source 158,163">158,163</sup>`}
];
const MT_KM=[
 {id:'era',b:'Eras',t:'Median OS by era of diagnosis (one US centre)',m:'alive',x:72,arms:[['2004–2012',22.6,50],['2013–2015',28.8,50],['2016–2019',32.4,50]],
  txt:`1420 people with de novo metastatic CRC at one US centre. Five-year survival rose from 15.7% (2004–2006) to 26% (2013–2015). The gains track liver resection, immunotherapy and third-line drugs. <sup class="c" data-ref="Zeineddine2023" title="Source 599">599</sup>`},
 {id:'hur',b:'Hurwitz',t:'Bevacizumab added to IFL (2004)',m:'alive',x:48,arms:[['IFL + placebo',15.6,50],['IFL + bevacizumab',20.3,50]],
  txt:`813 people, first-line. OS HR 0.66 (P<0.001); response 44.8% vs 34.8%; grade 3 hypertension 11.0% vs 2.3%. <sup class="c" data-ref="Hurwitz2004" title="Source 245">245</sup>`},
 {id:'tribe',b:'TRIBE',t:'Triplet vs doublet with bevacizumab',m:'alive',x:66,arms:[['FOLFIRI + bevacizumab',25.8,50],['FOLFOXIRI + bevacizumab',29.8,50]],
  txt:`508 people. OS HR 0.80 (0.65–0.98). By subgroup, median OS was 37.1 months for RAS/BRAF wild-type, 25.6 for RAS-mutant and 13.4 for BRAF-mutant tumours. <sup class="c" data-ref="Cremolini2015,Loupakis2014" title="Source 113,338">113,338</sup>`},
 {id:'para',b:'PARADIGM',t:'Anti-EGFR vs anti-VEGF, left-sided RAS wild-type',m:'alive',x:72,arms:[['mFOLFOX6 + bevacizumab',34.3,50],['mFOLFOX6 + panitumumab',37.9,50]],
  txt:`823 people with RAS wild-type disease. Left-sided OS HR 0.82 (P=0.03) while PFS was similar (13.1 vs 11.9 months). CRYSTAL showed the earlier cetuximab gain (OS 23.5 vs 20.0 months, KRAS wild-type). <sup class="c" data-ref="Watanabe2023,VanCutsem2011" title="Source 549,574">549,574</sup>`},
 {id:'k177',b:'KEYNOTE-177',t:'Pembrolizumab vs chemotherapy, MSI-H/dMMR (PFS)',m:'progression-free',x:36,arms:[['Chemotherapy',8.2,50],['Pembrolizumab',16.5,50]],
  txt:`307 people, first-line MSI-H/dMMR. PFS HR 0.60 (0.45–0.80). Among responders, 83% vs 35% had ongoing responses at 24 months. <sup class="c" data-ref="Andre2020" title="Source 16">16</sup>`},
 {id:'hw',b:'CheckMate 8HW',t:'Nivolumab + ipilimumab vs chemotherapy (PFS)',m:'progression-free',x:36,arms:[['Chemotherapy',24,14],['Nivolumab + ipilimumab',24,72]],
  txt:`Curves drawn through the 24-month PFS rates (72% vs 14%), as medians were not the headline. The 2026 final analysis (68 months' follow-up) gave first-line PFS HR 0.21 and OS HR 0.37 vs chemotherapy. <sup class="c" data-ref="Andre2024,Lonardi2026" title="Source 18,335">18,335</sup>`},
 {id:'bw',b:'BREAKWATER',t:'Encorafenib + cetuximab + mFOLFOX6, BRAF V600E first-line',m:'alive',x:54,arms:[['Standard care',15.1,50],['Encorafenib + cetuximab + mFOLFOX6',30.3,50]],
  txt:`Interim OS HR 0.49 (0.38–0.63); PFS 12.8 vs 7.1 months. Historically, OS after failure of initial therapy was 4–6 months. <sup class="c" data-ref="Elez2025,Kopetz2019" title="Source 146,290">146,290</sup>`},
 {id:'beacon',b:'BEACON',t:'BRAF V600E after 1–2 prior regimens',m:'alive',x:24,arms:[['Control',5.4,50],['Encorafenib + cetuximab',8.4,50],['Encorafenib + binimetinib + cetuximab',9.0,50]],
  txt:`665 people. OS HR 0.52 (triplet) and 0.60 (doublet); confirmed response 26% vs 2%. <sup class="c" data-ref="Kopetz2019" title="Source 290">290</sup>`},
 {id:'cb',b:'CodeBreaK 300',t:'Sotorasib + panitumumab, KRAS G12C (PFS)',m:'progression-free',x:12,arms:[[`Investigator's choice`,2.2,50],['Sotorasib 960 mg + panitumumab',5.6,50]],
  txt:`160 people, chemorefractory. PFS HR 0.49 (0.30–0.80); updated response 30.2% vs 1.9%. <sup class="c" data-ref="Fakih2023,Pietrantonio2025" title="Source 152,431">152,431</sup>`},
 {id:'correct',b:'CORRECT',t:'Regorafenib vs placebo',m:'alive',x:18,arms:[['Placebo',5.0,50],['Regorafenib',6.4,50]],
  txt:`760 people. OS HR 0.77 (0.64–0.94): a median gain of 1.4 months. <sup class="c" data-ref="Grothey2013" title="Source 200">200</sup>`},
 {id:'recourse',b:'RECOURSE',t:'Trifluridine/tipiracil vs placebo',m:'alive',x:18,arms:[['Placebo',5.3,50],['Trifluridine/tipiracil',7.1,50]],
  txt:`OS HR 0.68 (0.58–0.81); neutropenia 38%. <sup class="c" data-ref="Mayer2015" title="Source 353">353</sup>`},
 {id:'sun',b:'SUNLIGHT',t:'Trifluridine/tipiracil ± bevacizumab',m:'alive',x:30,arms:[['Trifluridine/tipiracil',7.5,50],['+ bevacizumab',10.8,50]],
  txt:`492 people. OS HR 0.61 (0.49–0.77); PFS 5.6 vs 2.4 months. The largest refractory-line gain: +3.3 months. <sup class="c" data-ref="Prager2023" title="Source 438">438</sup>`},
 {id:'fresco',b:'FRESCO-2',t:'Fruquintinib vs placebo',m:'alive',x:18,arms:[['Placebo',4.8,50],['Fruquintinib',7.4,50]],
  txt:`691 people after a median of 4 prior lines. OS HR 0.66 (0.55–0.80). <sup class="c" data-ref="Dasari2023" title="Source 120">120</sup>`},
 {id:'prab',b:'PRABITAS',t:'14-day vs 28-day trifluridine/tipiracil + bevacizumab',m:'alive',x:30,arms:[['28-day schedule',10.3,50],['14-day schedule',11.3,50]],
  txt:`970 people in Japan. Non-inferior (OS HR 0.93), with grade ≥3 neutropenia falling from 39% to 13%. A trial of gentler scheduling, not a new drug. <sup class="c" data-ref="Sakakida2026" title="Source 465">465</sup>`}
];
function mtAlong(P,u){u=clamp(u);const seg=[];let L=0;for(let i=1;i<P.length;i++){const l=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);seg.push(l);L+=l}
  let d=u*L;for(let i=0;i<seg.length;i++){if(d<=seg[i]||i===seg.length-1){const k=seg[i]?Math.min(1,d/seg[i]):0;return [lerp(P[i][0],P[i+1][0],k),lerp(P[i][1],P[i+1][1],k)]}d-=seg[i]}}
const mtPathD=P=>P.map((p,i)=>(i?'L':'M')+f1(p[0])+' '+f1(p[1])).join('');
inits.metastatic=()=>{
  /* ---------- main animation ---------- */
  const svg=$('#mtSvg'),rg=$('#mtT');
  const LIV=[150,128,1.2],Lm=(x,y)=>[LIV[0]+x*LIV[2],LIV[1]+y*LIV[2]];
  const MA=[[28,-20],[42,-8],[22,-2],[46,-24]],MB=[[-40,-12],[-20,8],[-30,-26],[-4,-26]];
  const LUNG=[[100,42],[134,62],[264,40],[238,62]],PER=[[46,262],[326,240],[150,370],[262,370]];
  function body(t){
    const C=colon(72,186,.7,{hl:'sigmoid'}),T=C.at(.81),R=C.at(.95);
    const portal=[T,[T[0]-22,T[1]-34],[200,252],[178,198],[160,150]];
    const sysBase=[R,[250,360],[318,334],[318,100],[196,78]];
    const sys=k=>sysBase.concat([k%2?[248,52]:[122,52]]);
    const vis=t<.6?1:t<.8?1-ramp(t,.6,.63):ramp(t,.8,.83);
    const pathB=t>=.8,shrink=pathB?1-.5*ease(ramp(t,.86,.99)):1;
    let s=`<rect x="28" y="4" width="316" height="372" rx="46" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    /* lungs and heart */
    s+=`<ellipse cx="120" cy="48" rx="54" ry="36" style="fill:var(--mucosa);opacity:.55;stroke:var(--mucosa-line)"/><ellipse cx="252" cy="48" rx="50" ry="36" style="fill:var(--mucosa);opacity:.55;stroke:var(--mucosa-line)"/>`;
    s+=`<circle cx="190" cy="78" r="13" style="fill:var(--vessel-soft);stroke:var(--vessel);stroke-width:1.2"/>`;
    s+=`<text x="186" y="24" class="t-xs t-mid">lungs</text>`;
    /* peritoneum */
    s+=`<rect x="46" y="182" width="280" height="188" rx="34" style="fill:none;stroke:var(--brand);stroke-width:1.2;stroke-dasharray:5 4;opacity:.6"/><text x="100" y="364" class="t-xs">peritoneum</text>`;
    /* veins */
    s+=`<path d="${mtPathD(portal)}" style="fill:none;stroke:var(--vessel);stroke-width:4;opacity:.5;stroke-linecap:round;stroke-linejoin:round"/>`;
    s+=`<path d="${mtPathD(sysBase)}M196 78L122 52M196 78L248 52" style="fill:none;stroke:var(--vessel);stroke-width:3;opacity:.35;stroke-linecap:round;stroke-linejoin:round"/>`;
    s+=`<text x="206" y="232" class="t-xs" style="fill:var(--vessel)">portal vein</text>`;
    s+=`<text x="332" y="220" class="t-xs t-mid" transform="rotate(-90 332 220)" style="fill:var(--vessel)">systemic veins → heart → lungs</text>`;
    s+=C.svg;
    /* liver: whole, or cut into the kept part and the removed part */
    const cut=t>=.6&&t<.8,mv=cut?ease(ramp(t,.66,.74)):0,fade=cut?1-.75*ramp(t,.7,.77):1;
    const metsA=(dx,dy)=>MA.map((m,i)=>{const arr=.1+i*.05+.12,g=ramp(t,arr,arr+.04);if(g<=0)return'';const [x,y]=Lm(m[0],m[1]);return `<circle cx="${f1(x+dx)}" cy="${f1(y+dy)}" r="${f1((4+i%2*1.5)*g*shrink)}" style="fill:var(--cell);stroke:var(--tumour);stroke-width:1.8"/>`}).join('');
    const xc=Lm(12,0)[0];
    s+=`<clipPath id="mtClipL"><rect x="60" y="60" width="${f1(xc-60)}" height="130"/></clipPath><clipPath id="mtClipR"><rect x="${f1(xc)}" y="60" width="100" height="130"/></clipPath>`;
    if(cut){
      s+=`<g clip-path="url(#mtClipL)">${liver(LIV[0],LIV[1],LIV[2],0)}</g>`;
      s+=`<g transform="translate(${f1(mv*30)} ${f1(-mv*16)})" style="opacity:${f1(fade)}"><g clip-path="url(#mtClipR)">${liver(LIV[0],LIV[1],LIV[2],0)}</g>${metsA(0,0)}</g>`;
      const cl=ramp(t,.63,.66);if(cl>0&&mv<1)s+=`<line x1="${f1(xc)}" y1="80" x2="${f1(xc)}" y2="${f1(80+96*cl)}" style="stroke:var(--ink);stroke-width:1.6;stroke-dasharray:4 3"/>`;
      if(mv>.3)s+=`<text x="286" y="150" class="t-xs t-mid" style="fill:var(--good)">segment removed</text>`;
    }else{
      s+=liver(LIV[0],LIV[1],LIV[2],0)+metsA(0,0);
      if(pathB)MB.forEach((m,i)=>{const g=ramp(t,.8+i*.01,.84+i*.01);const [x,y]=Lm(m[0],m[1]);if(g>0)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(4.5*g*shrink)}" style="fill:var(--cell);stroke:var(--tumour);stroke-width:1.8"/>`});
    }
    s+=`<text x="236" y="122" class="t-lbl">liver</text>`;
    /* primary tumour */
    const pr=4+8*ramp(t,0,.1);
    s+=`<circle cx="${f1(T[0])}" cy="${f1(T[1])}" r="${f1(pr)}" style="fill:var(--tumour);opacity:.9"/><text x="${f1(T[0]+14)}" y="${f1(T[1]+22)}" class="t-xs">primary (sigmoid)</text>`;
    /* travelling cells: portal */
    MA.forEach((m,i)=>{const a=.1+i*.05,u=ramp(t,a,a+.12);if(u<=0||u>=1)return;const P=portal.concat([Lm(m[0],m[1])]),[x,y]=mtAlong(P,u);
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="3.4" style="fill:var(--tumour);stroke:var(--panel);stroke-width:1"/>`});
    /* systemic to lungs */
    LUNG.forEach((m,i)=>{const a=.4+i*.025,u=ramp(t,a,a+.09);if(u>0&&u<1){const [x,y]=mtAlong(sys(i).concat([m]),u);s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="3.4" style="fill:var(--tumour);stroke:var(--panel);stroke-width:1"/>`}
      const g=ramp(t,a+.09,a+.12)*vis;if(g>0)s+=`<circle cx="${m[0]}" cy="${m[1]}" r="${f1(5*g*shrink)}" style="fill:var(--cell);stroke:var(--tumour);stroke-width:1.8;opacity:${f1(Math.max(vis,.0))}"/>`});
    /* peritoneal seeding */
    PER.forEach((m,i)=>{const a=.46+i*.025,u=ramp(t,a,a+.07);if(u>0&&u<1){const x=lerp(T[0],m[0],u),y=lerp(T[1],m[1],u);s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="3" style="fill:var(--tumour);opacity:.8"/>`}
      const g=ramp(t,a+.07,a+.1)*vis;if(g>0)s+=`<ellipse cx="${m[0]}" cy="${m[1]}" rx="${f1(6*g*shrink)}" ry="${f1(4*g*shrink)}" style="fill:var(--cell);stroke:var(--tumour);stroke-width:1.6"/>`});
    /* drugs: perioperative (path A) and systemic (path B) */
    const dA=t>=.6&&t<.8?Math.max(bump(t,.6,.67),bump(t,.74,.8)):0,dB=pathB?ramp(t,.81,.85):0,dr=Math.max(dA,dB);
    if(dr>0){for(let k=0;k<14;k++){const P=k%2?portal.slice().reverse():sys(k),u=(t*9+k/14)%1,[x,y]=mtAlong(P,u);s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="2.6" style="fill:var(--rx);opacity:${f1(dr*.9)}"/>`}}
    if(t>=.6&&t<.8){const lab=t<.66?'FOLFOX4 ×6 before surgery':t<.74?'hepatectomy':'FOLFOX4 ×6 after surgery';s+=`<text x="186" y="164" class="t-sm t-mid" style="fill:var(--rx)">${lab}</text>`;
      if(vis<.5)s+=`<text x="186" y="290" class="t-xs t-mid">liver-only disease</text>`}
    if(pathB)s+=`<text x="186" y="164" class="t-sm t-mid" style="fill:var(--rx)">${t<.86?'spread too wide to remove':'drugs reach every site'}</text>`;
    const nL=MA.filter((m,i)=>t>=.1+i*.05+.12).length*(t>=.6&&t<.8&&mv>.5?0:1)+(pathB?MB.filter((m,i)=>t>=.8+i*.01).length:0);
    const nLu=t<.6||pathB?LUNG.filter((m,i)=>t>=.4+i*.025+.09).length:0,nP=t<.6||pathB?PER.filter((m,i)=>t>=.46+i*.025+.07).length:0;
    return {s,nL,nLu,nP}}
  function bar(x,y,w,frac,col,lab,val){return `<text x="${f1(x)}" y="${f1(y)}" class="t-sm" style="fill:var(--ink)">${lab}</text><rect x="${f1(x)}" y="${f1(y+4)}" width="${f1(w)}" height="11" rx="3" style="fill:var(--panel-2)"/><rect x="${f1(x)}" y="${f1(y+4)}" width="${f1(Math.max(0,w*frac))}" height="11" rx="3" style="fill:${col}"/><text x="${f1(x+w*frac+6)}" y="${f1(y+13)}" class="t-sm" style="fill:var(--ink);font-weight:700">${val}</text>`}
  function panel(px,py,pw,ph,t,p,N){const st=MT_STEPS[p],g=ease(ramp(t,st.from+.01,st.from+.12)),x=px+14,w=pw-28-58,rh=N?27:46;let y=py+62;
    const H=[['AT DIAGNOSIS · BURGUNDY','Spread at diagnosis'],['LATER SPREAD · BY STAGE','Liver metastases within 5 years'],['WHERE ELSE · REGISTRIES','Lungs and peritoneum'],['PATH A · EORTC 40983','Perioperative FOLFOX4 + surgery'],['PATH B · ONE US CENTRE','Median overall survival by era']][p];
    let s=`<rect x="${px}" y="${py}" width="${pw}" height="${ph}" rx="12" style="fill:var(--field);stroke:var(--line)"/><text x="${x}" y="${py+24}" class="t-sm">${H[0]}</text><text x="${x}" y="${py+44}" class="t-big">${H[1]}</text>`;
    if(p===0){const big=(v,xx,l1,l2)=>`<text x="${xx}" y="${y+26}" style="font:800 30px var(--display);fill:var(--tumour)">${f1(v)}%</text><text x="${xx}" y="${y+45}" class="t-sm">${l1}</text><text x="${xx}" y="${y+60}" class="t-sm">${l2}</text>`;
      s+=big(14.5*g,x,'liver metastases','already at diagnosis');s+=big(14.5*ease(ramp(t,.08,.18)),x+pw/2-6,'more appeared','within 5 years');
      y+=N?86:90;s+=`<text x="${x}" y="${y}" style="font:800 22px var(--display);fill:var(--brand)">&lt; 2 years</text><text x="${x}" y="${y+17}" class="t-sm">for cells in a cancer to gain the ability</text><text x="${x}" y="${y+32}" class="t-sm">to metastasise (sequencing estimate)</text>`;
      if(!N){y+=62;s+=`<text x="${x}" y="${y}" style="font:800 22px var(--display);fill:var(--polyp-line)">≈ 17 years</text><text x="${x}" y="${y+17}" class="t-sm">for a large benign tumour to evolve</text><text x="${x}" y="${y+32}" class="t-sm">into an advanced cancer</text>`;
        s+=`<text x="${x}" y="${py+ph-14}" class="t-sm">Population registry figures, earlier era.</text>`}}
    else if(p===1){[['Stage I',3.7],['Stage II',13.3],['Stage III',30.4]].forEach(([l,v],i)=>{s+=bar(x,y+i*rh,w,v/35*g,'var(--liver)',`after ${l}`,f1(v*g)+'%')});
      y+=3*rh+12;s+=`<text x="${x}" y="${y}" class="t-sm" style="fill:var(--ink)">About 1 in 4 developed liver metastases</text><text x="${x}" y="${y+15}" class="t-sm">overall (24.7%, German registry)</text>`;
      if(!N)s+=`<text x="${x}" y="${y+36}" class="t-sm" style="fill:var(--ink)">26.5% within 5 years in Stockholm;</text><text x="${x}" y="${y+53}" class="t-sm">more often from left-sided colon cancer</text>`}
    else if(p===2){[['Liver, at diagnosis (Burgundy)',14.5,'var(--liver)'],['Lungs, at diagnosis (Burgundy)',11.0,'var(--vessel)'],['Peritoneum, any time (Stockholm)',8.3,'var(--brand)']].forEach(([l,v,c],i)=>{s+=bar(x,y+i*rh,w,v/20*g,c,l,f1(v*g)+'%')});
      y+=3*rh+12;s+=`<text x="${x}" y="${y}" class="t-sm" style="fill:var(--ink)">Rectal vs colon cancer: lungs OR 2.4,</text><text x="${x}" y="${y+15}" class="t-sm" style="fill:var(--ink)">peritoneum OR 0.3 (Sweden)</text>`;
      if(!N)s+=`<text x="${x}" y="${y+36}" class="t-sm" style="fill:var(--ink)">Mucinous or signet-ring tumours:</text><text x="${x}" y="${y+53}" class="t-sm">peritoneum OR 3.8, liver OR 0.5 (colon)</text>`}
    else if(p===3){[['3-yr PFS · surgery alone',28.1,'var(--muted)'],['3-yr PFS · + FOLFOX4',35.4,'var(--rx)'],['5-yr OS · surgery alone',47.8,'var(--muted)'],['5-yr OS · + FOLFOX4',51.2,'var(--rx)']].forEach(([l,v,c],i)=>{s+=bar(x,y+i*rh,w,v/60*g,c,l,f1(v*g)+'%')});
      y+=4*rh+4;const k=ramp(t,.72,.78);
      for(let i=0;i<6;i++)s+=person(x+8+i*22,y,20,i===0&&k>0?'var(--good)':'var(--muted)',{op:i===0?1:.45});
      s+=`<text x="${x+140}" y="${y+10}" class="t-sm" style="fill:var(--ink)">≈ 1 in 6 cured after</text><text x="${x+140}" y="${y+22}" class="t-sm" style="fill:var(--ink)">hepatectomy (10-yr survivors)</text>`}
    else{[['2004–2012',22.6,'var(--muted)'],['2013–2015',28.8,'var(--accent)'],['2016–2019',32.4,'var(--rx)']].forEach(([l,v,c],i)=>{s+=bar(x,y+i*rh,w,v/40*g,c,'diagnosed '+l,f1(v*g)+' mo')});
      y+=3*rh;s+=bar(x,y,w,12/40*g,'var(--warn)','Netherlands, all stage IV, 2008–2011',f1(12*g)+' mo');
      y+=rh+10;s+=`<text x="${x}" y="${y}" class="t-sm">Cohort and population medians, not predictions.</text>`}
    return s}
  function draw(t){const N=vb(svg,'720 380','400 640');const p=phaseOf(MT_STEPS,t),B=body(t);
    let s=`<defs>${marker('mtArr','var(--muted)')}</defs>`;
    s+=N?`<g transform="translate(14 0)">${B.s}</g>`+panel(12,394,376,236,t,p,true):B.s+panel(372,14,336,352,t,p,false);
    svg.innerHTML=s;setSt(p);
    $('#mtNote').innerHTML=noteHTML(MT_STEPS[p]);
    $('#mtRead').innerHTML=`<span>liver spots <b>${B.nL}</b></span><span>lung spots <b>${B.nLu}</b></span><span>peritoneal <b>${B.nP}</b></span><span>stage <b>${MT_STEPS[p].k}</b></span>`}
  const stop=playWire(rg,$('#mtPlay'),draw,26000,'Replay','metastatic');
  const setSt=stepWire($('#mtSteps'),MT_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- biomarker ladder ---------- */
  let prof='ras',line=0;
  function ladder(){
    const cols=[1,2,3],nm=['','1st line','2nd line','Later lines'];
    $('#mtLad').innerHTML=cols.map(c=>`<div class="mt-col${line&&line!==c?' off':''}"><h4>${nm[c]}</h4>`+MT_RX.filter(r=>r.l===c).map(r=>{const on=r.p.includes(prof);
      return `<div class="mt-rx ${on?'lit':'dim'}"><b>${r.n}</b><small>${r.tr}</small>${on?`<span class="mt-k">${r.k}</span>`:''}</div>`}).join('')+'</div>').join('');
    const lit=MT_RX.filter(r=>r.p.includes(prof)&&(!line||r.l===line));
    $('#mtLadNote').innerHTML=`<div class="kicker">${MT_PROF[prof].n} · ${line?nm[line]:'all lines'}</div><h4>${lit.length} matching regimen${lit.length===1?'':'s'}</h4><p>${MT_PROF[prof].d}</p>`+
      `<div class="mt-det">${lit.map(r=>`<p><b>${r.n}</b> (${nm[r.l]}, ${r.tr}). ${r.r}</p>${r.lab?`<p class="lbl">${r.lab}</p>`:''}`).join('')}</div>`+
      `<div class="hook"><b>Exam hook</b>Test RAS (KRAS and NRAS exons 2–4) before any anti-EGFR antibody. MSI-H → checkpoint inhibitor; BRAF V600E → encorafenib + cetuximab; HER2 and KRAS G12C guide later lines.</div>`;
    $$('[data-mtp]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.mtp===prof));
    $$('[data-mtl]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.mtl===line))}
  $$('[data-mtp]').forEach(b=>b.addEventListener('click',()=>{prof=b.dataset.mtp;ladder()}));
  $$('[data-mtl]').forEach(b=>b.addEventListener('click',()=>{line=+b.dataset.mtl;ladder()}));
  ladder();

  /* ---------- schematic survival curves ---------- */
  const ks=$('#mtKm'),kr=$('#mtKmT');let km=MT_KM[0];
  $('#mtKmBtns').innerHTML=`<span class="kicker">Compare</span>`+MT_KM.map((k,i)=>`<button class="btn" data-mtk="${i}" aria-pressed="${i===0}">${k.b}</button>`).join('');
  const S=(a,m)=>Math.pow(a[2]/100,m/a[1]);
  function drawK(u){const N=vb(ks,'720 320','400 '+(344+32*km.arms.length));const X0=N?46:56,X1=N?384:470,Y0=N?40:34,Y1=N?250:270,xm=km.x,M=u*xm;
    const X=m=>lerp(X0,X1,m/xm),Y=v=>lerp(Y1,Y0,v);
    const cols=km.arms.length===3?['var(--muted)','var(--accent)','var(--rx)']:['var(--muted)','var(--rx)'];
    let s=`<text x="${X0}" y="${N?20:20}" class="t-sm">${km.m==='alive'?'% ALIVE':'% PROGRESSION-FREE'} · SCHEMATIC</text>`;
    [0,.25,.5,.75,1].forEach(v=>s+=`<line x1="${X0}" x2="${X1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/><text x="${X0-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v*100}%</text>`);
    const step=xm<=18?3:xm<=36?6:12;for(let m=0;m<=xm;m+=step)s+=`<text x="${f1(X(m))}" y="${Y1+16}" class="t-xs t-mid">${m}</text>`;
    s+=`<text x="${X1}" y="${Y1+30}" class="t-xs t-end">months</text><line x1="${X0}" x2="${X1}" y1="${Y1}" y2="${Y1}" class="axis"/>`;
    km.arms.forEach((a,i)=>{const c=cols[i];
      s+=`<path d="${pathFn(v=>1-S(a,v*xm),X0,X1,Y0,Y1)}" style="fill:none;stroke:${c};stroke-width:1.5;opacity:.22"/>`;
      if(M>0)s+=`<path d="${pathFn(v=>1-S(a,v*M),X0,X(M),Y0,Y1,80)}" style="fill:none;stroke:${c};stroke-width:2.6"/>`;
      if(M>=a[1]){const yy=Y(a[2]/100);s+=`<line x1="${f1(X(a[1]))}" x2="${f1(X(a[1]))}" y1="${f1(yy)}" y2="${Y1}" style="stroke:${c};stroke-width:1.2;stroke-dasharray:3 3"/><circle cx="${f1(X(a[1]))}" cy="${f1(yy)}" r="4" style="fill:${c}"/>`}});
    s+=`<line x1="${f1(X(M))}" x2="${f1(X(M))}" y1="${Y0-6}" y2="${Y1}" style="stroke:var(--ink);opacity:.35"/><text x="${f1(clamp(X(M),X0+20,X1-20))}" y="${Y0-10}" class="t-xs t-mid" style="fill:var(--ink)">${f1(M)} mo</text>`;
    km.arms.forEach((a,i)=>{const v=S(a,M);s+=`<circle cx="${f1(X(M))}" cy="${f1(Y(v))}" r="3.5" style="fill:var(--panel);stroke:${cols[i]};stroke-width:2"/>`});
    /* legend + readout */
    const lx=N?X0-30:490;let ly=N?Y1+50:44;
    s+=`<text x="${lx}" y="${ly}" class="t-sm" style="fill:var(--ink)">${km.b}</text>`;ly+=18;
    km.arms.forEach((a,i)=>{const v=S(a,M),mark=a[2]===50?`median ${f1(a[1])} mo`:`${a[2]}% at ${a[1]} mo`;
      s+=`<rect x="${lx}" y="${ly-8}" width="14" height="5" rx="2" style="fill:${cols[i]}"/><text x="${lx+20}" y="${ly-2}" class="t-xs" style="fill:var(--ink);font-weight:700">${a[0]}</text>`;
      s+=`<text x="${lx+20}" y="${ly+11}" class="t-xs">${mark} · at cursor ≈ ${Math.round(v*100)}%</text>`;ly+=N?32:36});
    if(!N)s+=`<text x="${lx}" y="${Y1}" class="t-xs">Dots mark the published anchor.</text>`;
    ks.innerHTML=s;
    kr.setAttribute('aria-valuetext',`${f1(M)} months: `+km.arms.map(a=>`${a[0]} about ${Math.round(S(a,M)*100)}%`).join(', '));
    $('#mtKmNote').innerHTML=`<div class="kicker">${km.b} · schematic curves</div><h4>${km.t}</h4><p>${km.txt}</p><div class="pt"><b>In plain words</b>The further right a curve stays high, the longer that group did on average. A median is the point where half the group has had the event.</div>`}
  playWire(kr,$('#mtKmPlay'),drawK,9000,'Replay','metastatic');
  $$('[data-mtk]').forEach(b=>b.addEventListener('click',()=>{km=MT_KM[+b.dataset.mtk];$$('[data-mtk]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawK(+kr.value)}));
  drawK(+kr.value);
};
/* =============== 4.5 Toward a cure =============== */
const CU_STEPS=[
 {from:0,at:.12,k:'DYNAMIC · Step 1',t:'After surgery for stage II colon cancer',
  txt:`DYNAMIC randomised 455 people with stage II colon cancer, after surgery, to standard management or to ctDNA-guided management. The question: can a blood test pick out who needs adjuvant chemotherapy, so that others can safely skip it? <sup class="c" data-ref="Tie2022" title="Source 531">531</sup>`,
  pt:`After the operation, some people still have a few cancer cells left. Chemotherapy is meant to mop them up, but most people with stage II cancer do not need it.`,
  hook:`ctDNA = circulating tumour DNA; detecting it after surgery signals molecular residual disease (MRD).`},
 {from:.2,at:.36,k:'DYNAMIC · Step 2',t:'A blood test for tumour DNA',
  txt:`In the guided arm, blood was tested for circulating tumour DNA after surgery. ctDNA-positive patients received adjuvant chemotherapy; ctDNA-negative patients did not. ctDNA is a powerful prognostic marker: in GALAXY, positivity 4 weeks after surgery carried an HR of 10.0 for recurrence <span class="ev est">Established</span> <sup class="c" data-ref="Tie2022,Kotani2023" title="Source 295,531">295,531</sup>.`,
  pt:`Tumours shed tiny pieces of DNA into the blood. If none can be found after surgery, the chance that cancer is left behind is lower.`,
  hook:`DYNAMIC: ctDNA-positive → chemotherapy; ctDNA-negative → no chemotherapy.`},
 {from:.42,at:.56,k:'DYNAMIC · Step 3',t:'Who got chemotherapy',
  txt:`ctDNA guidance cut adjuvant chemotherapy use to 15%, against 28% with standard care: roughly half as many people exposed to its side effects <sup class="c" data-ref="Tie2022" title="Source 531">531</sup>.`,
  pt:`With the blood test, about half as many people had chemotherapy.`,
  hook:`DYNAMIC chemotherapy use: 15% (ctDNA-guided) vs 28% (standard).`},
 {from:.62,at:.76,k:'DYNAMIC · Step 4',t:'Two years later',
  txt:`Two-year recurrence-free survival was 93.5% with ctDNA guidance and 92.4% with standard care: a difference of 1.1 points (95% CI −4.1 to 6.2), which met non-inferiority <sup class="c" data-ref="Tie2022" title="Source 531">531</sup>.`,
  pt:`Skipping chemotherapy when the test was negative did not let more cancers come back in this trial.`,
  hook:`DYNAMIC: less chemotherapy, same 2-year RFS (93.5% vs 92.4%). <span class="ev est">Established</span> for stage II.`},
 {from:.82,at:.96,k:'DYNAMIC · Step 5',t:'What the result says, and what it does not',
  txt:`Inside the guided arm, 3-year RFS was 86.4% for ctDNA-positive patients given chemotherapy and 92.5% for ctDNA-negative patients who skipped it. De-escalation is supported by one RCT in stage II; escalating treatment for ctDNA-positive disease has not yet improved outcomes <span class="ev early">Early evidence</span> <sup class="c" data-ref="Tie2022,Tie2025,Bando2026" title="Source 39,531,532">39,531,532</sup>.`,
  pt:`A negative test can spare chemotherapy. A positive test warns of risk, but trials have not yet found a better treatment for those people.`,
  hook:`ctDNA: strongly prognostic; de-escalation proven only in stage II (DYNAMIC).`}
];
function cuSet(seed,n,excl){const r=rng(seed),a=[...Array(100).keys()].filter(i=>!(excl||[]).includes(i));for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a.slice(0,n)}
inits.cure=()=>{
  /* ---------- DYNAMIC ---------- */
  const svg=$('#cuSvg'),rg=$('#cuT');
  const PB=cuSet(11,15),NB=[...Array(100).keys()].filter(i=>!PB.includes(i));
  const RB=PB.slice(0,2).concat(cuSet(29,5,PB)),CA=cuSet(5,28),RA=cuSet(17,8);
  function grid(x0,y0,sp,arm,t,p,N){let s='';const sz=sp*.8;
    const scan=ramp(t,.22,.4)*10,chem=ramp(t,.44,.56),rec=ramp(t,.64,.74),dimA=arm==='A'&&p===4;
    for(let i=0;i<100;i++){const c=i%10,r=Math.floor(i/10),x=x0+c*sp+sp/2,y=y0+r*sp;
      let fill='var(--muted)',op=.55,ring=false;
      if(arm==='B'){if(scan>r+.5){fill=PB.includes(i)?'var(--tumour)':'var(--good)';op=1}
        if(PB.includes(i)&&chem*15>PB.indexOf(i))ring=true}
      else{if(CA.includes(i)&&chem*28>CA.indexOf(i)){ring=true;fill='var(--ink)';op=.8}}
      const R=arm==='A'?RA:RB,ri=R.indexOf(i),gone=ri>=0&&rec*R.length>ri;
      if(gone){fill='var(--bad)';op=1}
      if(dimA)op*=.35;
      if(p===4&&arm==='B'&&!PB.includes(i)&&!gone)op=.55;
      s+=person(x,y,sz,fill,{op:f1(op)});
      if(ring)s+=`<circle cx="${f1(x)}" cy="${f1(y+sz*.5)}" r="${f1(sp*.5)}" style="fill:none;stroke:var(--rx);stroke-width:1.6;opacity:${dimA?.35:1}"/>`;
      if(gone)s+=`<path d="M${f1(x-sp*.3)} ${f1(y-1)}l${f1(sp*.6)} ${f1(sp*.6)}m0 ${f1(-sp*.6)}l${f1(-sp*.6)} ${f1(sp*.6)}" style="stroke:var(--bad);stroke-width:1.3;opacity:${dimA?.35:1}"/>`}
    /* scan line + tube */
    if(arm==='B'&&t>=.2&&t<.42){const yy=y0+Math.min(scan,10)*sp-2;s+=`<line x1="${x0-4}" x2="${x0+10*sp+4}" y1="${f1(yy)}" y2="${f1(yy)}" style="stroke:var(--accent);stroke-width:2;opacity:.8"/>`+tube(x0+10*sp+14,yy+6,.55,{fill:.7})}
    return s}
  function bar(x,y,w,frac,col,lab,val){return `<text x="${f1(x)}" y="${f1(y)}" class="t-sm" style="fill:var(--ink)">${lab}</text><rect x="${f1(x)}" y="${f1(y+5)}" width="${f1(w)}" height="13" rx="3" style="fill:var(--panel-2)"/><rect x="${f1(x)}" y="${f1(y+5)}" width="${f1(Math.max(0,w*frac))}" height="13" rx="3" style="fill:${col}"/><text x="${f1(x+w*frac+6)}" y="${f1(y+16)}" class="t-sm" style="fill:var(--ink);font-weight:700">${val}</text>`}
  function panel(px,py,pw,ph,t,p,N){const st=CU_STEPS[p],g=ease(ramp(t,st.from+.01,st.from+.12)),x=px+14,w=pw-28-60,rh=N?40:48;let y=py+70;
    const H=[['455 PEOPLE · STAGE II','Who needs chemotherapy?'],['THE BLOOD TEST','Sorting by ctDNA'],['ADJUVANT CHEMOTHERAPY','Chemotherapy use'],['2-YEAR RECURRENCE-FREE','Same protection'],['INSIDE THE GUIDED ARM','3-year RFS by ctDNA result']][p];
    let s=`<rect x="${px}" y="${py}" width="${pw}" height="${ph}" rx="12" style="fill:var(--field);stroke:var(--line)"/><text x="${x}" y="${py+24}" class="t-sm">${H[0]}</text><text x="${x}" y="${py+46}" class="t-big" style="font-size:18px">${H[1]}</text>`;
    if(p===0){s+=`<text x="${x}" y="${y+24}" style="font:800 34px var(--display);fill:var(--brand)">${Math.round(455*g)}</text><text x="${x+84}" y="${y+10}" class="t-sm">people randomised after</text><text x="${x+84}" y="${y+26}" class="t-sm">surgery for stage II colon cancer</text>`;
      y+=58;s+=`<rect x="${x}" y="${y}" width="${f1((pw-28)/2-6)}" height="44" rx="8" style="fill:var(--panel-2)"/><text x="${x+10}" y="${y+18}" class="t-sm" style="fill:var(--ink);font-weight:700">Standard care</text><text x="${x+10}" y="${y+34}" class="t-sm">clinician decides</text>`;
      const x2=x+(pw-28)/2+6;s+=`<rect x="${x2}" y="${y}" width="${f1((pw-28)/2-6)}" height="44" rx="8" style="fill:var(--accent-soft)"/><text x="${x2+10}" y="${y+18}" class="t-sm" style="fill:var(--ink);font-weight:700">ctDNA-guided</text><text x="${x2+10}" y="${y+34}" class="t-sm">blood test decides</text>`;
      if(!N)s+=`<text x="${x}" y="${y+80}" class="t-sm">Each icon on the left = 1% of an arm.</text>`}
    else if(p===1){const sc=Math.min(10,ramp(t,.22,.4)*10),rev=i=>Math.floor(i/10)<sc-.5;const pos=PB.filter(rev).length,neg=NB.filter(rev).length;
      const bx=(c,yy,col,soft,a,b,n)=>`<rect x="${x}" y="${yy}" width="${pw-28}" height="46" rx="8" style="fill:${soft}"/><circle cx="${x+16}" cy="${yy+23}" r="7" style="fill:${col}"/><text x="${x+32}" y="${yy+19}" class="t-sm" style="fill:var(--ink);font-weight:700">${a}</text><text x="${x+32}" y="${yy+35}" class="t-sm">${b}</text><text x="${x+pw-42}" y="${yy+29}" class="t-mid" style="font:800 20px var(--display);fill:${col}">${n}</text>`;
      s+=bx(0,y,'var(--good)','var(--good-soft)','ctDNA not found','no chemotherapy',neg);s+=bx(0,y+56,'var(--tumour)','var(--tumour-soft)','ctDNA found','chemotherapy',pos);
      s+=`<text x="${x}" y="${y+124}" class="t-sm">Counts are icons in the schematic arm.</text>`;
      if(!N)s+=`<text x="${x}" y="${y+160}" class="t-sm" style="fill:var(--ink)">Without treatment, ctDNA rarely clears</text><text x="${x}" y="${y+176}" class="t-sm">by itself: 1.9% in GALAXY.</text>`}
    else if(p===2){s+=bar(x,y,w,.28*g/.35,'var(--ink)','Standard care',Math.round(28*g)+'%');s+=bar(x,y+rh,w,.15*g/.35,'var(--rx)','ctDNA-guided',Math.round(15*g)+'%');
      y+=2*rh+14;s+=`<text x="${x}" y="${y}" style="font:800 22px var(--display);fill:var(--rx)">≈ half as much</text><text x="${x}" y="${y+18}" class="t-sm">adjuvant chemotherapy with ctDNA guidance</text>`;
      if(!N)s+=`<text x="${x}" y="${y+56}" class="t-sm" style="fill:var(--ink)">In stage III (DYNAMIC-III), de-escalation</text><text x="${x}" y="${y+72}" class="t-sm">cut oxaliplatin use to 34.8% vs 88.6%.</text>`}
    else if(p===3){s+=bar(x,y,w,.924*g,'var(--ink)','Standard care',f1(92.4*g)+'%');s+=bar(x,y+rh,w,.935*g,'var(--rx)','ctDNA-guided',f1(93.5*g)+'%');
      y+=2*rh+14;s+=`<text x="${x}" y="${y}" style="font:800 22px var(--display);fill:var(--good)">Non-inferior</text><text x="${x}" y="${y+18}" class="t-sm">difference 1.1 points (95% CI −4.1 to 6.2)</text>`;
      y+=44;const cx=v=>lerp(x+10,x+pw-38,(v+6)/14),cg=ease(ramp(t,.7,.78));
      s+=`<line x1="${f1(cx(-6))}" x2="${f1(cx(8))}" y1="${y+20}" y2="${y+20}" class="axis"/>`;[-6,-4,-2,0,2,4,6,8].forEach(v=>s+=`<text x="${f1(cx(v))}" y="${y+36}" class="t-xs t-mid">${v>0?'+':''}${v}</text>`);
      s+=`<line x1="${f1(cx(0))}" x2="${f1(cx(0))}" y1="${y+4}" y2="${y+24}" style="stroke:var(--muted);stroke-dasharray:3 3"/>`;
      s+=`<line x1="${f1(cx(1.1-5.2*cg))}" x2="${f1(cx(1.1+5.1*cg))}" y1="${y+12}" y2="${y+12}" style="stroke:var(--good);stroke-width:3;stroke-linecap:round"/><circle cx="${f1(cx(1.1))}" cy="${y+12}" r="5" style="fill:var(--good)"/>`;
      s+=`<text x="${x}" y="${y+54}" class="t-xs">RFS difference, guided minus standard (points)</text>`}
    else{s+=bar(x,y,w,.864*g,'var(--tumour)','ctDNA+ · chemotherapy',f1(86.4*g)+'%');s+=bar(x,y+rh,w,.925*g,'var(--good)','ctDNA− · no chemotherapy',f1(92.5*g)+'%');
      y+=2*rh+14;s+=`<text x="${x}" y="${y}" style="font:800 22px var(--display);fill:var(--tumour)">HR 10.0</text><text x="${x}" y="${y+18}" class="t-sm">for recurrence if ctDNA-positive 4 weeks</text><text x="${x}" y="${y+33}" class="t-sm">after surgery (GALAXY)</text>`;
      if(!N)s+=`<text x="${x}" y="${y+66}" class="t-sm" style="fill:var(--ink)">But treating ctDNA-positive disease early</text><text x="${x}" y="${y+82}" class="t-sm">(ALTAIR) did not clearly help: HR 0.79.</text>`}
    return s}
  function draw(t){const N=vb(svg,'720 380','400 600');const p=phaseOf(CU_STEPS,t);
    const L=N?{a:20,b:212,y0:66,sp:17,hy:30,lg:250,px:12,py:300,pw:376,ph:290}:{a:22,b:204,y0:70,sp:16.5,hy:36,lg:256,px:394,py:14,pw:314,ph:352};
    let s='';const fi=ramp(t,0,.08);
    s+=`<g style="opacity:${f1(.25+.75*fi)}">`;
    s+=`<text x="${L.a}" y="${L.hy}" class="t-lbl">Standard care</text><text x="${L.a}" y="${L.hy+16}" class="t-xs">clinician decides</text>`;
    s+=`<text x="${L.b}" y="${L.hy}" class="t-lbl" style="fill:var(--accent)">ctDNA-guided</text><text x="${L.b}" y="${L.hy+16}" class="t-xs">blood test decides</text>`;
    s+=grid(L.a,L.y0,L.sp,'A',t,p,N)+grid(L.b,L.y0,L.sp,'B',t,p,N)+'</g>';
    /* legend */
    const lg=[['var(--good)','no ctDNA'],['var(--tumour)','ctDNA found'],['var(--rx)','chemotherapy','ring'],['var(--bad)','recurred']];
    lg.forEach((d,i)=>{const lx=L.a+(N?(i%2)*190:i*86),ly=L.lg+(N?Math.floor(i/2)*18:0);
      s+=d[2]?`<circle cx="${lx+6}" cy="${ly-4}" r="6" style="fill:none;stroke:${d[0]};stroke-width:1.8"/>`:`<circle cx="${lx+6}" cy="${ly-4}" r="5" style="fill:${d[0]}"/>`;
      s+=`<text x="${lx+16}" y="${ly}" class="t-xs">${d[1]}</text>`});
    if(!N){const tl=[['surgery',0],['blood test',.2],['chemotherapy',.42],['2 years',.62],['3 years',.82]];
      s+=`<line x1="30" x2="356" y1="300" y2="300" class="axis"/>`;
      tl.forEach(([l,v])=>{const x=30+v*326/.82*.98;s+=`<circle cx="${f1(x)}" cy="300" r="4" style="fill:${t>=v?'var(--rx)':'var(--panel-2)'};stroke:var(--rx)"/><text x="${f1(x)}" y="318" class="t-xs t-mid">${l}</text>`});
      s+=`<circle cx="${f1(30+Math.min(t,.82)*326/.82*.98)}" cy="300" r="7" style="fill:none;stroke:var(--ink);stroke-width:1.5"/>`}
    s+=panel(L.px,L.py,L.pw,L.ph,t,p,N);
    svg.innerHTML=s;setSt(p);
    $('#cuNote').innerHTML=noteHTML(CU_STEPS[p]);
    const chem=ramp(t,.44,.56);
    $('#cuRead').innerHTML=`<span>chemotherapy <b>${Math.round(28*chem)}% vs ${Math.round(15*chem)}%</b></span><span>2-year RFS <b>${t>=.62?'92.4% vs 93.5%':'—'}</b></span><span>arms <b>standard vs ctDNA-guided</b></span>`}
  const stop=playWire(rg,$('#cuPlay'),draw,22000,'Replay','cure');
  const setSt=stepWire($('#cuSteps'),CU_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- DYNAMIC-III ---------- */
  const ds=$('#cuD3'),dr=$('#cuD3T');let mode='pn';
  const D3={pn:{arms:[['ctDNA-negative after surgery',87,'var(--good)'],['ctDNA-positive after surgery',49,'var(--tumour)']],k:'ctDNA-negative vs positive'},
            q:{arms:[['Lowest ctDNA-burden quartile',77,'var(--warn)'],['Highest ctDNA-burden quartile',23,'var(--tumour)']],k:'ctDNA burden, positive patients'}};
  function drawD(u){const N=vb(ds,'720 300','400 420'),M=u*36,D=D3[mode];
    const X0=N?46:60,X1=N?384:470,Y0=N?96:86,Y1=N?286:262,X=m=>lerp(X0,X1,m/36),Y=v=>lerp(Y1,Y0,v);
    let s='';
    /* split bar */
    const bw=(N?372:410),bx=N?14:60,neg=.725*ease(ramp(u,0,.15));
    s+=`<text x="${bx}" y="20" class="t-sm">AFTER SURGERY · 968 EVALUABLE · STAGE III</text>`;
    s+=`<rect x="${bx}" y="30" width="${bw}" height="22" rx="5" style="fill:var(--tumour-soft)"/><rect x="${bx}" y="30" width="${f1(bw*neg)}" height="22" rx="5" style="fill:var(--good-soft);stroke:var(--good)"/>`;
    s+=`<text x="${bx+8}" y="46" class="t-sm" style="fill:var(--good);font-weight:700">${f1(neg*100)}% ctDNA-negative</text><text x="${bx+bw-8}" y="46" class="t-sm t-end" style="fill:var(--tumour);font-weight:700">${f1(100-neg*100)}% positive</text>`;
    s+=`<text x="${X0}" y="${Y0-12}" class="t-sm">% RECURRENCE-FREE · SCHEMATIC</text>`;
    [0,.25,.5,.75,1].forEach(v=>s+=`<line x1="${X0}" x2="${X1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/><text x="${X0-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v*100}%</text>`);
    for(let m=0;m<=36;m+=6)s+=`<text x="${f1(X(m))}" y="${Y1+15}" class="t-xs t-mid">${m}</text>`;
    s+=`<line x1="${X0}" x2="${X1}" y1="${Y1}" y2="${Y1}" class="axis"/><text x="${X1}" y="${Y1+28}" class="t-xs t-end">months</text>`;
    const S=(a,m)=>Math.pow(a[1]/100,m/36);
    D.arms.forEach(a=>{s+=`<path d="${pathFn(v=>1-S(a,v*36),X0,X1,Y0,Y1)}" style="fill:none;stroke:${a[2]};stroke-width:1.5;opacity:.22"/>`;
      if(M>0)s+=`<path d="${pathFn(v=>1-S(a,v*M),X0,X(M),Y0,Y1,80)}" style="fill:none;stroke:${a[2]};stroke-width:2.8"/>`;
      s+=`<circle cx="${f1(X(M))}" cy="${f1(Y(S(a,M)))}" r="4" style="fill:var(--panel);stroke:${a[2]};stroke-width:2"/>`;
      if(M>=35.9)s+=`<text x="${f1(X1-6)}" y="${f1(Y(a[1]/100)-8)}" class="t-lbl t-end" style="fill:${a[2]}">${a[1]}%</text>`});
    s+=`<line x1="${f1(X(M))}" x2="${f1(X(M))}" y1="${Y0}" y2="${Y1}" style="stroke:var(--ink);opacity:.3"/>`;
    const lx=N?X0-30:492;let ly=N?Y1+50:Y0+10;
    D.arms.forEach(a=>{s+=`<rect x="${lx}" y="${ly-8}" width="14" height="5" rx="2" style="fill:${a[2]}"/><text x="${lx+20}" y="${ly-2}" class="t-xs" style="fill:var(--ink);font-weight:700">${a[0]}</text><text x="${lx+20}" y="${ly+12}" class="t-xs">3-year RFS ${a[1]}% · now ≈ ${Math.round(S(a,M)*100)}%</text>`;ly+=36});
    if(!N)s+=`<text x="${lx}" y="${ly+6}" class="t-xs">Month ${Math.round(M)} of 36</text>`;
    ds.innerHTML=s;
    dr.setAttribute('aria-valuetext',`Month ${Math.round(M)}: `+D.arms.map(a=>`${a[0]} about ${Math.round(S(a,M)*100)}%`).join(', '));
    $('#cuD3Note').innerHTML=noteHTML(mode==='pn'?{k:'DYNAMIC-III · '+D.k,t:'A strong warning signal',
      txt:`Three-year RFS was 87% for ctDNA-negative vs 49% for ctDNA-positive patients. In ctDNA-negative patients, de-escalation cut oxaliplatin use (34.8% vs 88.6%) and hospitalisation (8.5% vs 13.2%), but RFS was slightly lower (85.3% vs 88.1%) and missed the non-inferiority margin <span class="ev early">Early evidence</span>. <sup class="c" data-ref="Tie2025" title="Source 532">532</sup>`,
      pt:`A negative blood test after surgery meant a much better outlook. But using it to give less chemotherapy in stage III was not proven safe.`,
      hook:`DYNAMIC-III: 3-year RFS 87% (ctDNA−) vs 49% (ctDNA+); 72.5% were negative.`}
     :{k:'DYNAMIC-III · '+D.k,t:'More ctDNA, more risk',
      txt:`Among ctDNA-positive patients, 3-year RFS fell from 77% in the lowest ctDNA-burden quartile to 23% in the highest. Escalated chemotherapy did not improve 2-year RFS over standard therapy (51% vs 61%), and in ALTAIR early trifluridine/tipiracil did not significantly improve DFS (HR 0.79). <sup class="c" data-ref="Tie2025,Bando2026" title="Source 39,532">39,532</sup>`,
      pt:`The more tumour DNA in the blood, the higher the chance of the cancer coming back. Simply giving stronger chemotherapy did not help.`,
      hook:`ctDNA escalation (DYNAMIC-III, ALTAIR): no benefit yet; new strategies needed.`})}
  playWire(dr,$('#cuD3Play'),drawD,8000,'Replay','cure');
  $$('[data-cud3]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.cud3;$$('[data-cud3]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawD(+dr.value)}));
  drawD(+dr.value);

  /* ---------- evidence filter ---------- */
  const cards=$$('#cuCards .card'),NM={all:'routes',est:'established routes',early:'routes with early evidence',hyp:'hypotheses'};
  function filt(f){let n=0;cards.forEach(c=>{const on=f==='all'||c.dataset.ev===f;c.hidden=!on;if(on)n++});
    $$('[data-cuf]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.cuf===f));$('#cuCount').textContent=`${n} ${NM[f]}`}
  $$('[data-cuf]').forEach(b=>b.addEventListener('click',()=>filt(b.dataset.cuf)));
  filt('all');
};
/* =============== 5.1 Living with colorectal cancer =============== */
const LV_REC=[12,14,8,5,3];
const LV_SCHED={
 asco:{n:'ASCO 2013',cea:{range:true},ct:[12,24,36],sc:[12],
  note:`ASCO's endorsement of the Cancer Care Ontario guideline: history, examination and CEA every 3–6 months for 5 years (toward the more frequent end for higher-risk patients); CT chest/abdomen yearly for 3 years in most cases; colonoscopy 1 year after surgery, then every 5 years depending on findings; no PET for routine surveillance. <sup class="c" data-ref="Meyerhardt2013" title="Source 366">366</sup>`},
 facs:{n:'FACS · CEA + CT arm',cea:{pts:[3,6,9,12,15,18,21,24,30,36,42,48,54,60]},ct:[6,12,18,24,36,48,60],sc:[],
  note:`FACS schedule: CEA every 3 months for 2 years, then every 6 months for 3 years; CT every 6 months for 2 years, then yearly for 3 years. Curative-intent surgery for recurrence was 6.6% in the CEA + CT arm vs 2.3% with minimum follow-up, but deaths did not differ significantly (18.2% intensive vs 15.9% minimum). Colonoscopy timing is not part of the schedule summarised here. <sup class="c" data-ref="Primrose2014" title="Source 439">439</sup>`},
 colhi:{n:'COLOFOL · high-frequency',cea:{pts:[6,12,18,24,36]},ct:[6,12,18,24,36],sc:[],
  note:`COLOFOL high-frequency arm: CT and CEA at 6, 12, 18, 24 and 36 months. 5-year overall mortality 13.0% vs 14.1% with the low-frequency arm (risk difference 1.1%, P = 0.43). Colonoscopy is not part of the comparison summarised here. <sup class="c" data-ref="WilleJorgensen2018" title="Source 579">579</sup>`},
 collo:{n:'COLOFOL · low-frequency',cea:{pts:[12,36]},ct:[12,36],sc:[],
  note:`COLOFOL low-frequency arm: CT and CEA at 12 and 36 months only. Cancer-specific mortality was 11.4% vs 10.6% in the high-frequency arm, and recurrence 19.4% vs 21.6%: no significant survival difference. <sup class="c" data-ref="WilleJorgensen2018" title="Source 579">579</sup>`}
};
const LV_STEPS=[
 {from:0,at:.06,k:'Months 0–6',t:'The plan after surgery',
  txt:`After cure-intent treatment, ASCO endorses CEA (a blood marker) every 3–6 months for 5 years, CT of chest and abdomen yearly for 3 years in most cases, and colonoscopy 1 year after surgery. If the whole bowel was not examined before diagnosis, colonoscopy should be done after adjuvant therapy, before 1 year. Surveillance tests are not advised for people who could not have surgery or systemic therapy because of severe illness. <sup class="c" data-ref="Meyerhardt2013" title="Source 366">366</sup>`,
  pt:`Check-ups usually mean a blood test every few months, a scan once a year for a few years, and a colonoscopy after one year.`,
  hook:`ASCO: CEA every 3–6 months × 5 years; CT yearly × 3 years; colonoscopy at 1 year; no routine PET.`},
 {from:.1,at:.2,k:'Year 1',t:'The first colonoscopy, the riskiest months',
  txt:`In 3655 Japanese trial patients with stage II–III disease, the hazard of recurrence peaked 10.0 months after surgery for stage II and 12.8 months for stage III; liver metastasis peaked earliest, at 8.0 months. In pooled adjuvant colon trials, 12% recurred in year 1. <sup class="c" data-ref="Tashiro2026,Sargent2005" title="Source 467,521">467,521</sup>`,
  pt:`The first year or two after surgery is when the cancer is most likely to come back, so tests are closest together then.`,
  hook:`Recurrence hazard peaks around 10–13 months after surgery; liver earliest (≈8 months).`},
 {from:.3,at:.5,k:'Years 2–3',t:'Most recurrences show by year 3',
  txt:`Recurrence rates were 14% in year 2 and 8% in year 3, and <b>80% of all recurrences occurred in the first 3 years</b> (18 trials, 20,898 patients). In the older fluorouracil-era trials, the median time from recurrence to death was 12 months. 5-year relapse-free survival was 87.9% for stage II and 77.0% for stage III in the Japanese trials. <sup class="c" data-ref="Sargent2005,Tashiro2026" title="Source 467,521">467,521</sup>`,
  pt:`Most recurrences that happen show up in the first 3 years. Each clear check-up after that is more reassuring.`,
  hook:`80% of colon cancer recurrences happen within 3 years of surgery.`},
 {from:.6,at:.8,k:'Years 4–5',t:'Fewer tests as the risk falls',
  txt:`Recurrence rates fell to 5% in year 4 and 3% in year 5. In the ASCO schedule, yearly CT stops after 3 years while CEA continues to 5 years. ASCO also lists keeping a healthy body weight and an active lifestyle as secondary prevention. <sup class="c" data-ref="Sargent2005,Meyerhardt2013" title="Source 366,467">366,467</sup>`,
  pt:`By years 4 and 5 the chance of the cancer coming back each year is small, and check-ups thin out.`,
  hook:`Annual recurrence rate, years 1–5: 12, 14, 8, 5, 3%.`},
 {from:.95,at:1,k:'The trials',t:'Does testing more often help?',
  txt:`<span class="ev est">Established</span> FACS, COLOFOL and GILDA all found that more intensive testing detects recurrence earlier, and FACS found more recurrences that could be operated on, but none showed a clear gain in overall survival. Switch schedules above to compare them. <sup class="c" data-ref="Primrose2014,WilleJorgensen2018,Rosati2016" title="Source 439,458,579">439,458,579</sup>`,
  pt:`Testing more often finds a returning cancer sooner, but trials have not shown that it helps people live longer.`,
  hook:`FACS: curative surgery for recurrence 2.3% minimum vs 6.6–8% with CEA/CT, but no mortality difference.`}
];
inits.living=()=>{
  /* ===== follow-up timeline ===== */
  const svg=$('#lvSvg'),rg=$('#lvT');let sk='asco';
  const evAt=(S,kind)=>kind==='cea'?(S.cea.range?[...Array(20)].map((_,i)=>(i+1)*3):S.cea.pts):S[kind];
  function counts(S,m){const c=a=>a.filter(x=>x<=m+.001).length;
    const cea=S.cea.range?`${Math.floor(m/6+.001)}–${Math.floor(m/3+.001)}`:String(c(S.cea.pts));
    return{cea,ct:c(S.ct),sc:c(S.sc)}}
  function draw(t){
    const N=vb(svg,'720 380','400 500');const S=LV_SCHED[sk],m=t*60;
    const L=N?{x0:66,x1:386,r:[58,92,126],lx:8,yl:150,cy0:196,cb:404,ch:150,ttl:18,br:184}
             :{x0:118,x1:704,r:[58,94,130],lx:14,yl:156,cy0:198,cb:348,ch:118,ttl:22,br:186};
    const X=mm=>lerp(L.x0,L.x1,mm/60);let s='';
    s+=`<text x="${L.lx}" y="${L.ttl}" class="t-sm" style="fill:var(--brand)">${N?S.n.toUpperCase():'FOLLOW-UP · '+S.n.toUpperCase()}</text>`;
    /* year bands */
    for(let y=0;y<5;y++){const a=X(y*12),b=X(y*12+12);s+=`<rect x="${f1(a)}" y="${L.r[0]-18}" width="${f1(b-a)}" height="${L.r[2]-L.r[0]+36}" style="fill:${y%2?'var(--panel-2)':'var(--field)'};opacity:.7"/>`;
      s+=`<text x="${f1((a+b)/2)}" y="${L.yl}" class="t-xs t-mid" style="${m>=y*12?'fill:var(--ink);font-weight:700':''}">Year ${y+1}</text>`}
    for(let mm=0;mm<=60;mm+=12)s+=`<line x1="${f1(X(mm))}" x2="${f1(X(mm))}" y1="${L.r[0]-18}" y2="${L.r[2]+18}" class="axis"/>`;
    const rows=[['CEA blood test','CEA','var(--gold)'],['CT scan','CT','var(--accent)'],['Colonoscopy','Scope','var(--rx)']];
    rows.forEach((r,i)=>s+=`<text x="${L.lx}" y="${L.r[i]+4}" class="t-lbl" style="fill:${r[2]}">${N?r[1]:r[0]}</text>`);
    /* CEA */
    const ce=L.r[0];
    if(S.cea.range){s+=`<line x1="${f1(X(3))}" x2="${f1(X(60))}" y1="${ce}" y2="${ce}" style="stroke:var(--gold);stroke-width:6;opacity:.18;stroke-linecap:round"/>`;
      for(let k=1;k<=20;k++){const mm=k*3,done=mm<=m,six=mm%6===0;
        s+=`<circle cx="${f1(X(mm))}" cy="${ce}" r="${six?5:3.4}" style="fill:${done&&six?'var(--gold)':'var(--panel)'};stroke:var(--gold);stroke-width:${six?1.8:1.2};opacity:${done?1:.55}"/>`}
      if(!N)s+=`<text x="${f1(X(60))}" y="${ce-11}" class="t-xs t-end">every 3–6 months (● 6-monthly, ○ added at 3-monthly)</text>`;
      else s+=`<text x="${f1(X(60))}" y="${ce-11}" class="t-xs t-end">every 3–6 months</text>`}
    else S.cea.pts.forEach(mm=>{const done=mm<=m;s+=`<circle cx="${f1(X(mm))}" cy="${ce}" r="5" style="fill:${done?'var(--gold)':'var(--panel)'};stroke:var(--gold);stroke-width:1.8;opacity:${done?1:.55}"/>`});
    /* CT */
    S.ct.forEach(mm=>{const done=mm<=m,x=X(mm),y=L.r[1];s+=`<rect x="${f1(x-7)}" y="${y-7}" width="14" height="14" rx="3" style="fill:${done?'var(--accent)':'var(--panel)'};stroke:var(--accent);stroke-width:1.8;opacity:${done?1:.55}"/>`;
      if(done)s+=`<circle cx="${f1(x)}" cy="${y}" r="3" style="fill:var(--panel)"/>`});
    /* colonoscopy */
    S.sc.forEach(mm=>{const done=mm<=m,x=X(mm),y=L.r[2];s+=`<circle cx="${f1(x)}" cy="${y}" r="7.5" style="fill:${done?'var(--rx)':'var(--panel)'};stroke:var(--rx);stroke-width:1.8;opacity:${done?1:.55}"/><circle cx="${f1(x)}" cy="${y}" r="3" style="fill:var(--panel)"/>`});
    if(sk==='asco')s+=`<text x="${f1(X(60))}" y="${L.r[2]+4}" class="t-xs t-end">then every 5 years, per findings →</text>`;
    else s+=`<text x="${f1(X(60))}" y="${L.r[2]+4}" class="t-xs t-end">not in this schedule</text>`;
    /* recurrence bars */
    const bw=(X(12)-X(0))*.56,mx=14;
    s+=`<text x="${L.lx}" y="${L.cy0-4}" class="t-sm" style="fill:var(--tumour)">${N?'RECURRENCE RATE BY YEAR':'RECURRENCE RATE IN EACH YEAR AFTER SURGERY'}</text>`;
    s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${L.cb}" y2="${L.cb}" class="axis"/>`;
    [5,10].forEach(v=>{const y=L.cb-L.ch*v/mx;s+=`<line x1="${L.x0}" x2="${L.x1}" y1="${f1(y)}" y2="${f1(y)}" class="grid"/><text x="${L.x0-6}" y="${f1(y+3)}" class="t-xs t-end">${v}%</text>`});
    LV_REC.forEach((v,i)=>{const p=ramp(m,i*12,i*12+12),cx=X(i*12+6),h=L.ch*v/mx*p;
      s+=`<rect x="${f1(cx-bw/2)}" y="${f1(L.cb-L.ch*v/mx)}" width="${f1(bw)}" height="${f1(L.ch*v/mx)}" rx="3" style="fill:none;stroke:var(--tumour);stroke-dasharray:3 3;opacity:.4"/>`;
      if(h>0)s+=`<rect x="${f1(cx-bw/2)}" y="${f1(L.cb-h)}" width="${f1(bw)}" height="${f1(h)}" rx="3" style="fill:var(--tumour);opacity:${i<3?.85:.55}"/>`;
      if(p>0)s+=`<text x="${f1(cx)}" y="${f1(L.cb-L.ch*v/mx-6)}" class="t-lbl t-mid">${p>=1?v:Math.round(v*p)}%</text>`;
      s+=`<text x="${f1(cx)}" y="${L.cb+(N?34:30)}" class="t-xs t-mid" style="opacity:${m>=36&&N?0:1}">${N?'':'yr '+(i+1)}</text>`});
    /* Tashiro peak-hazard marks */
    if(m>=6&&m<30){[8,10,12.8].forEach(mm=>{const x=X(mm);s+=`<path d="M${f1(x)} ${L.cb+2}l-4 7h8z" style="fill:var(--lymph)"/>`});
      s+=`<text x="${f1(X(14.5))}" y="${L.cb+10}" class="t-xs" style="fill:var(--lymph)">${N?'◀ peak hazard 8–12.8 mo':'◀ peak recurrence hazard: liver 8, stage II 10, stage III 12.8 months'}</text>`}
    /* 80% bracket */
    if(m>=36){const a=X(0)+6,b=X(36)-6,y=L.cb-L.ch*14/mx-24;
      s+=`<path d="M${f1(a)} ${f1(y+6)}V${f1(y)}H${f1(b)}V${f1(y+6)}" style="fill:none;stroke:var(--ink);stroke-width:1.4"/><text x="${f1((a+b)/2)}" y="${f1(y-5)}" class="t-lbl t-mid">80% of recurrences: first 3 years</text>`}
    /* cursor */
    const cx=X(m);s+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${L.r[0]-24}" y2="${L.cb}" style="stroke:var(--brand);stroke-width:1.6;opacity:.75"/><path d="M${f1(cx-6)} ${L.r[0]-30}h12l-6 7z" style="fill:var(--brand)"/>`;
    s+=`<text x="${f1(clamp(cx,L.x0+20,L.x1-20))}" y="${L.r[0]-34}" class="t-xs t-mid" style="fill:var(--brand);font-weight:700">month ${Math.round(m)}</text>`;
    svg.innerHTML=s;
    const p=phaseOf(LV_STEPS,t);setSt(p);const C=counts(S,m);
    rg.setAttribute('aria-valuetext',`Month ${Math.round(m)}: ${C.cea} CEA tests, ${C.ct} CT scans, ${C.sc} colonoscopies so far`);
    $('#lvRead').innerHTML=`<span>month <b>${Math.round(m)}</b></span><span>CEA so far <b>${C.cea}</b></span><span>CT so far <b>${C.ct}</b></span><span>colonoscopy <b>${S.sc.length?C.sc:'–'}</b></span>`;
    $('#lvNote').innerHTML=noteHTML(LV_STEPS[p])+`<div class="kv"><div><dt>${S.n}</dt><dd>${S.note}</dd></div></div>`;
  }
  const stop=playWire(rg,$('#lvPlay'),draw,20000,'Replay','living');
  const setSt=stepWire($('#lvSteps'),LV_STEPS,rg,draw,stop);
  $$('[data-lvs]').forEach(b=>b.addEventListener('click',()=>{sk=b.dataset.lvs;$$('[data-lvs]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)}));
  draw(+rg.value);

  /* ===== LARS calculator ===== */
  const ls=$('#lvLars'),IT=['Flatus','Liquid stool','Frequency','Clustering','Urgency'],ICOL=['var(--accent)','var(--lymph)','var(--gold)','var(--rx)','var(--brand)'];
  function lars(){const v=[1,2,3,4,5].map(i=>+$('#lvL'+i).value),tot=v.reduce((a,b)=>a+b,0);
    const band=tot<=20?0:tot<=29?1:2,BN=['No LARS','Minor LARS','Major LARS'],BC=['yes','maybe','no'];
    const NL=vb(ls,'720 150','400 196');const x0=NL?16:24,x1=NL?384:696,X=s=>lerp(x0,x1,s/42),y=NL?92:70;let s='';
    [[0,20.5,'var(--good-soft)','var(--good)','No LARS 0–20'],[20.5,29.5,'var(--warn-soft)','var(--warn)','Minor 21–29'],[29.5,42,'var(--bad-soft)','var(--bad)','Major 30–42']].forEach(([a,b,f,c,l])=>{
      s+=`<rect x="${f1(X(a))}" y="${y}" width="${f1(X(b)-X(a))}" height="22" style="fill:${f};stroke:${c};stroke-width:.8"/><text x="${f1((X(a)+X(b))/2)}" y="${y+38}" class="t-xs t-mid" style="fill:${c};font-weight:700">${l}</text>`});
    for(let k=0;k<=42;k+=(NL?6:3))s+=`<text x="${f1(X(k))}" y="${y+52}" class="t-xs t-mid">${k}</text>`;
    /* stacked item segments above the ruler */
    let acc=0;v.forEach((p,i)=>{if(!p)return;const a=X(acc),b=X(acc+p);s+=`<rect x="${f1(a)}" y="${y-22}" width="${f1(b-a-1)}" height="14" rx="3" style="fill:${ICOL[i]};opacity:.85"/>`;
      const lb=`${NL?IT[i].split(' ')[0]:IT[i]} ${p}`;if(b-a>lb.length*5.9+6)s+=`<text x="${f1((a+b)/2)}" y="${y-12}" class="t-xs t-mid" style="fill:var(--panel);font-weight:700">${NL?IT[i].split(' ')[0]:IT[i]} ${p}</text>`;acc+=p});
    s+=`<path d="M${f1(X(tot)-7)} ${y-4}h14l-7 9z" style="fill:var(--ink)"/>`;
    s+=`<text x="${f1(clamp(X(tot),x0+40,x1-40))}" y="${y-30}" class="t-lbl t-mid">score ${tot}</text>`;
    s+=`<text x="${x0}" y="${NL?20:18}" class="t-sm">${NL?'LARS SCORE (0–42)':'LARS SCORE · 0–42 · bands from the 961-patient development study'}</text>`;
    if(NL)s+=`<text x="${x0}" y="${36}" class="t-xs">bands from the 961-patient study</text>`;
    ls.innerHTML=s;
    const top=v.indexOf(Math.max(...v));
    $('#lvLNote').innerHTML=`<div class="kicker">Your teaching score</div><div class="lv-band"><span class="big-num">${tot}</span><span>/ 42</span></div><div class="verdict ${BC[band]}">${BN[band]} (${['0–20','21–29','30–42'][band]})</div>
      <p>${tot?`The biggest contributor here is <b>${IT[top].toLowerCase()}</b> (${v[top]} points). `:''}Urgency carries the most weight (up to 16 points), then clustering (up to 11). For major LARS, the cut-off had 72.5% sensitivity and 82.5% specificity in the development study. <sup class="c" data-ref="Christensen2021,Emmertsen2012" title="Source 101,149">101,149</sup></p>
      <div class="kv"><div><dt>Compare</dt><dd>Major LARS in 41% after rectal cancer resection (meta-analysis). But in Danish adults aged 50–79 with no rectal surgery, 18.8% of women and 9.6% of men also scored 30 or more, so the score needs normative data to interpret. <sup class="c" data-ref="Croese2018,Juul2019" title="Source 117,272">117,272</sup></dd></div>
      <div><dt>What helps (MANUEL guidance)</dt><dd>Stepwise care: best supportive care first (diet, loperamide, skin care, pads), then pelvic floor rehabilitation, then transanal irrigation if supportive care has not worked. Most recommendations rest on expert opinion. <sup class="c" data-ref="Christensen2021" title="Source 101">101</sup></dd></div></div>
      <div class="pt"><b>In plain words</b>After rectal surgery, many people have urgent, frequent or clustered bowel movements. This 5-question score tells your team how much it affects you, and there are treatments that help.</div>
      <div class="hook"><b>Exam hook</b>LARS score: 5 items, 0–42. No LARS 0–20, minor 21–29, major 30–42. Risk factors: radiotherapy and a low anastomosis.</div>`;
  }
  [1,2,3,4,5].forEach(i=>{const el=$('#lvL'+i);el.addEventListener('change',lars);el.addEventListener('input',lars)});
  $('#lvLReset').addEventListener('click',()=>{[1,2,4,5].forEach(i=>$('#lvL'+i).value='0');$('#lvL3').value='0';lars()});
  lars();

  /* ===== stoma explorer ===== */
  const st=$('#lvStoma');let ty='ileo',it='temp',stT=1,stStop=null;
  function drawSt(){const NS=vb(st,'720 330','400 400');let s='';
    const T=NS?{cx:200,top:24,w:300,h:300}:{cx:220,top:16,w:300,h:298};
    const tl=T.cx-T.w/2,tr=T.cx+T.w/2,tb=T.top+T.h;
    /* torso outline */
    s+=`<path d="M${tl+30} ${T.top}Q${tl} ${T.top+20} ${tl+6} ${T.top+110}Q${tl+14} ${tb-50} ${tl+40} ${tb}H${tr-40}Q${tr-14} ${tb-50} ${tr-6} ${T.top+110}Q${tr} ${T.top+20} ${tr-30} ${T.top}Z" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.4"/>`;
    s+=`<circle cx="${T.cx}" cy="${T.top+150}" r="3" style="fill:var(--muted)"/>`;
    const C=colon(T.cx-95,T.top+40,.63,{w:15});
    const ileo=ty==='ileo',temp=it==='temp',restOp=temp?.35:.12;
    /* the large bowel: in use or resting */
    if(ileo){s+=`<g style="opacity:${restOp+.25}">${C.svg}</g>`}
    else{/* colon in use up to the sigmoid; below rests (temporary) or is out of use (permanent) */
      s+=`<g>${C.svg}</g>`;
      const p0=C.at(.8),p1=C.at(1);s+=`<path d="M${f1(p0[0])} ${f1(p0[1])}L${f1(C.at(.89)[0])} ${f1(C.at(.89)[1])}L${f1(p1[0])} ${f1(p1[1])}" style="fill:none;stroke:var(--panel-2);stroke-width:13;opacity:${temp?.55:.9}"/>`;
      s+=`<path d="M${f1(p0[0])} ${f1(p0[1])}L${f1(C.at(.89)[0])} ${f1(C.at(.89)[1])}L${f1(p1[0])} ${f1(p1[1])}" style="fill:none;stroke:var(--mucosa-line);stroke-width:1.4;stroke-dasharray:4 4"/>`}
    /* small bowel loops */
    let sb='';const sbx=T.cx-30,sby=T.top+120;for(let i=0;i<=60;i++){const u=i/60,x=sbx+Math.sin(u*Math.PI*6)*34+u*20,y=sby+u*80;sb+=(i?'L':'M')+f1(x)+' '+f1(y)}
    s+=`<path d="${sb}" style="fill:none;stroke:var(--mucosa-line);stroke-width:11;stroke-linecap:round;stroke-linejoin:round;opacity:.9"/><path d="${sb}" style="fill:none;stroke:var(--mucosa);stroke-width:8;stroke-linecap:round;stroke-linejoin:round"/>`;
    const sbEnd=[sbx+20+Math.sin(Math.PI*6)*34,sby+80];
    let stoma;
    if(ileo){stoma=[tl+62,T.top+196];
      s+=`<path d="M${f1(sbEnd[0])} ${f1(sbEnd[1])}Q${f1(stoma[0]+40)} ${f1(stoma[1]+30)} ${f1(stoma[0]+6)} ${f1(stoma[1])}" style="fill:none;stroke:var(--mucosa-line);stroke-width:11;stroke-linecap:round"/><path d="M${f1(sbEnd[0])} ${f1(sbEnd[1])}Q${f1(stoma[0]+40)} ${f1(stoma[1]+30)} ${f1(stoma[0]+6)} ${f1(stoma[1])}" style="fill:none;stroke:var(--mucosa);stroke-width:8;stroke-linecap:round"/>`;
      if(temp){const cc=C.at(0);s+=`<path d="M${f1(stoma[0]+12)} ${f1(stoma[1]+6)}Q${f1(cc[0]+10)} ${f1(cc[1]+16)} ${f1(cc[0])} ${f1(cc[1]+8)}" style="fill:none;stroke:var(--mucosa-line);stroke-width:7;stroke-dasharray:4 4;opacity:.7"/>`}}
    else{stoma=[tr-62,T.top+200];const sg=C.at(.8);
      s+=`<path d="M${f1(sg[0])} ${f1(sg[1])}Q${f1(stoma[0]-10)} ${f1(stoma[1]-30)} ${f1(stoma[0]-6)} ${f1(stoma[1])}" style="fill:none;stroke:var(--mucosa-line);stroke-width:14;stroke-linecap:round"/><path d="M${f1(sg[0])} ${f1(sg[1])}Q${f1(stoma[0]-10)} ${f1(stoma[1]-30)} ${f1(stoma[0]-6)} ${f1(stoma[1])}" style="fill:none;stroke:var(--mucosa);stroke-width:11;stroke-linecap:round"/>`}
    /* stoma and pouch */
    s+=`<circle cx="${f1(stoma[0])}" cy="${f1(stoma[1])}" r="9" style="fill:var(--tumour);opacity:.55;stroke:var(--mucosa-line);stroke-width:1.5"/>`;
    const px=stoma[0],py=stoma[1]-8,pw=44,ph=70,fill=ileo?clamp(stT*.7):clamp(stT*.45);
    s+=`<defs><clipPath id="lvPouch"><path d="M${f1(px-pw/2)} ${f1(py)}Q${f1(px-pw/2)} ${f1(py+ph)} ${f1(px)} ${f1(py+ph)}Q${f1(px+pw/2)} ${f1(py+ph)} ${f1(px+pw/2)} ${f1(py)}Z"/></clipPath></defs>`;
    s+=`<rect x="${f1(px-pw/2)}" y="${f1(py+ph*(1-fill))}" width="${pw}" height="${f1(ph*fill)}" clip-path="url(#lvPouch)" style="fill:var(--stool);opacity:.55"/>`;
    s+=`<path d="M${f1(px-pw/2)} ${f1(py)}Q${f1(px-pw/2)} ${f1(py+ph)} ${f1(px)} ${f1(py+ph)}Q${f1(px+pw/2)} ${f1(py+ph)} ${f1(px+pw/2)} ${f1(py)}Z" style="fill:none;stroke:var(--accent);stroke-width:1.8"/>`;
    s+=`<circle cx="${f1(stoma[0])}" cy="${f1(stoma[1])}" r="8" style="fill:var(--tumour);opacity:.6;stroke:var(--mucosa-line);stroke-width:1.5"/>`;
    /* label column */
    const lx=NS?14:420,ly=NS?T.top+T.h+26:44;
    const lines=NS?[]:[];
    if(!NS){
      s+=`<text x="${lx}" y="${ly}" class="t-big">${ileo?'Ileostomy':'Colostomy'} · ${temp?'temporary':'permanent'}</text>`;
      const L2=ileo?[['small bowel (ileum) to the skin','var(--ink)'],['high output: more than about','var(--bad)'],['1.5–2.0 L in 24 hours','var(--bad)']]:[['colon to the skin','var(--ink)'],['parastomal hernia is commonest','var(--muted)'],['after end colostomy; EHS strongly','var(--muted)'],['recommends prophylactic mesh','var(--muted)']];
      L2.push(temp?[ileo?'faded bowel: resting until closure':'dashed bowel below: resting','var(--muted)']:['no closure planned','var(--muted)']);
      L2.forEach(([l,c],k)=>s+=`<text x="${lx}" y="${ly+24+k*17}" class="t-sm" style="fill:${c}">${l}</text>`);
      const big=ileo?(temp?['20%','readmitted within 30 days of','ileostomy creation; 6% for dehydration']:['up to 31%','of small-bowel stomas have','high output']):(temp?['19%','of TME-trial stomas were','never reversed']:['4.0–48.1%','parastomal hernia after end','colostomy (older literature)']);
      s+=`<text x="${lx}" y="${ly+150}" style="font:800 34px var(--display);fill:var(--brand)">${big[0]}</text><text x="${lx}" y="${ly+172}" class="t-sm">${big[1]}</text><text x="${lx}" y="${ly+188}" class="t-sm">${big[2]}</text>`;
      s+=`<text x="${f1(px)}" y="${f1(py+ph+14)}" class="t-xs t-mid">pouch</text>`}
    else{s+=`<text x="${lx}" y="${ly}" class="t-big">${ileo?'Ileostomy':'Colostomy'} · ${temp?'temporary':'permanent'}</text>`;
      s+=`<text x="${lx}" y="${ly+20}" class="t-sm">${ileo?'small bowel (ileum) to the skin':'colon to the skin'}</text>`;
      s+=`<text x="${lx}" y="${ly+38}" class="t-sm">${temp?(ileo?'faded bowel rests until closure':'dashed bowel below rests'):'no closure planned'}</text>`;
      void lines}
    s+=`<text x="${f1(tl+8)}" y="${T.top+14}" class="t-xs">their right</text><text x="${f1(tr-8)}" y="${T.top+14}" class="t-xs t-end">their left</text>`;
    st.innerHTML=s;
    const NT={
     'ileo-temp':{k:'Ileostomy · temporary',t:'A loop ileostomy protects a low join',txt:`In the Dutch TME trial, 57% of patients who had low anterior resection got a primary stoma. Readmission within 30 days of ileostomy creation was 20%, 6% for dehydration; after colorectal cancer resection with a diverting ileostomy, dehydration affected 9.0% (relative risk 3.37 vs no ileostomy). Postoperative diuretic use was the only independent risk factor for dehydration readmission in one series of 603. <sup class="c" data-ref="denDulk2007,Vogel2022,Borucki2021,Messaris2012" title="Source 68,126,362,565">68,126,362,565</sup>`,
      pt:`With an ileostomy, watch your output. If the bag fills much more than usual (around 1.5 litres a day or more), or you feel very thirsty, dizzy or are passing little urine, call your team.`,hook:`About 1 in 5 people with a new ileostomy are readmitted within 30 days; dehydration is the leading cause (6%).`},
     'ileo-perm':{k:'Ileostomy · permanent',t:'High output and magnesium',txt:`High-output stoma (above about 1.5–2.0 L/24 h) causes water, sodium and often magnesium loss and occurs in up to 31% of small-bowel stomas. In one UK series, early high output resolved by itself in 49%; all 26 people with late high output had low magnesium and 11 were admitted with kidney impairment. Parastomal hernia after end ileostomy ranged from 1.8% to 28.3% in the older literature. <sup class="c" data-ref="Nightingale2022,Baker2011,Carne2003" title="Source 36,87,403">36,87,403</sup>`,
      pt:`A permanent ileostomy can lose a lot of salt and water. Knowing your usual output, and when it is too high, is part of daily life.`,hook:`High-output stoma ≈ >1.5–2 L/day: water, sodium and magnesium depletion.`},
     'colo-temp':{k:'Colostomy · temporary',t:'Will it be reversed?',txt:`Temporary stomas are not always closed. In the TME trial, 19% were never reversed, and complications after surgery predicted a permanent stoma. In Swedish data, 9% of reversals had a major complication (return to theatre, intensive care or death). Defunctioning stomas may reduce the chance of ending up stoma-free (Early evidence; registry analysis). <sup class="c" data-ref="denDulk2007,Holmgren2017,Back2021" title="Source 32,126,241">32,126,241</sup>`,
      pt:`A "temporary" stoma usually gets closed, but for some people it stays. Ask your surgeon about your own chance.`,hook:`TME trial: 19% of stomas meant to be temporary were never reversed.`},
     'colo-perm':{k:'Colostomy · permanent',t:'Parastomal hernia and mesh',txt:`End colostomy carries a higher parastomal hernia rate than other stomas: 4.0–48.1% in the older literature. The European Hernia Society strongly recommends a prophylactic synthetic non-absorbable mesh when an end colostomy is made, and strongly recommends against suture repair for elective hernia repair. Diagnosis is by examination, with CT or ultrasound if unsure. <sup class="c" data-ref="Carne2003,Antoniou2018" title="Source 20,87">20,87</sup>`,
      pt:`A bulge next to a colostomy is common. A mesh placed when the stoma is made lowers the chance of it happening.`,hook:`Parastomal hernia: commonest after end colostomy; prophylactic mesh strongly recommended (EHS).`}
    }[ty+'-'+it];
    $('#lvStNote').innerHTML=noteHTML(NT);
  }
  const stAnim=()=>{stStop&&stStop();stStop=animate(1400,p=>{stT=p;drawSt()},()=>{stStop=null})};
  $$('[data-lvt]').forEach(b=>b.addEventListener('click',()=>{ty=b.dataset.lvt;$$('[data-lvt]').forEach(x=>x.setAttribute('aria-pressed',x===b));stAnim()}));
  $$('[data-lvi]').forEach(b=>b.addEventListener('click',()=>{it=b.dataset.lvi;$$('[data-lvi]').forEach(x=>x.setAttribute('aria-pressed',x===b));stAnim()}));
  drawSt();

  /* ===== oxaliplatin neuropathy over time ===== */
  const ns=$('#lvNeuro'),nr=$('#lvNT');
  const NP=[{m:0,l:'during',ll:'during',any:92,g2:null,g3:13},{m:1,l:'28 d',ll:'28 days after',any:60,g2:16,g3:5},{m:6,l:'6 mo',ll:'6 months after',any:39,g2:7,g3:1},{m:18,l:'18 mo',ll:'18 months after',any:21,g2:3,g3:1}];
  const NNOTE=[
   {k:'During treatment',t:'92% have some neuropathy',txt:`In the adjuvant trial, peripheral sensory neuropathy occurred in 92% (all grades), 13% grade 3; the median time to grade 3 was 9 cycles. The acute pattern was seen in about 56%, and 80% of people with grade 3 persistent neuropathy had progressed from grade 1–2. In N08CB, 71% felt cold items as abnormal with cycle 1. <sup class="c" data-ref="FDA-OxaliplatinGland,Pachman2015" title="Source 171,419">171,419</sup>`,
    pt:`Oxaliplatin can make cold things feel like pins and needles in your hands, mouth or throat for a few days after each dose. The label advises avoiding cold drinks, ice and cold on the skin.`,hook:`Acute oxaliplatin neuropathy: cold-triggered, within hours to 2 days, resolves within 14 days.`},
   {k:'28 days after the last cycle',t:'Still common a month on',txt:`60% still had some neuropathy (16% grade 2, 5% grade 3). In IDEA, 3 months of adjuvant therapy cut grade 2 or worse neurotoxicity to 16.6% (FOLFOX) and 14.2% (CAPOX), from 47.7% and 44.9% with 6 months. <sup class="c" data-ref="FDA-OxaliplatinGland,Grothey2018" title="Source 171,201">171,201</sup>`,
    pt:`Tell your team early if buttons, keys or walking get harder, because they can lower or stop the dose.`,hook:`IDEA: 3 months instead of 6 cut grade ≥2 neurotoxicity from ≈45–48% to ≈14–17%.`},
   {k:'6 months after',t:'Slowly improving',txt:`39% still had some neuropathy (7% grade 2, 1% grade 3). Lowering the cumulative dose was the only effective lever in PROFILES survivors; dose delays did not reduce long-term neuropathy. ASCO 2020 recommends no agent to prevent it, and IV calcium and magnesium did not help in a phase III trial. <sup class="c" data-ref="FDA-OxaliplatinGland,Beijers2015,Loprinzi2020,Loprinzi2014" title="Source 50,171,336,337">50,171,336,337</sup>`,
    pt:`Numbness often gets better over months. No pill has been shown to prevent it.`,hook:`No drug is recommended to prevent CIPN; calcium/magnesium infusions do not work.`},
   {k:'18 months after',t:'One in five still affected',txt:`21% still had some neuropathy (3% grade 2, 1% grade 3). By 18 months symptoms were worse in the feet than the hands in N08CB. For established painful neuropathy, duloxetine is the only agent with appropriate evidence, and its benefit is limited (pain fell 1.06 vs 0.34 points on a 0–10 scale). <sup class="c" data-ref="FDA-OxaliplatinGland,Pachman2015,Loprinzi2020,Smith2013" title="Source 171,337,419,500">171,337,419,500</sup>`,
    pt:`For some people the numbness does not fully go away. Help is available for painful neuropathy, though it is modest.`,hook:`Duloxetine is the only drug with evidence for painful CIPN.`}];
  function drawN(t){const NN=vb(ns,'720 300','400 420');const mo=t*18;
    const G=NN?{x0:44,x1:384,y0:44,y1:220,hx:200,hy:300,lbl:236}:{x0:70,x1:470,y0:30,y1:240,hx:600,hy:110,lbl:258};
    /* x scale: during at left, then 0..18 months */
    const xd=G.x0+22,X=mm=>lerp(G.x0+(G.x1-G.x0)*.24,G.x1,mm/18),Y=v=>lerp(G.y1,G.y0,v/100);let s='';
    [0,25,50,75,100].forEach(v=>s+=`<line x1="${G.x0}" x2="${G.x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/><text x="${G.x0-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}%</text>`);
    s+=`<line x1="${G.x0}" x2="${G.x1}" y1="${G.y1}" y2="${G.y1}" class="axis"/>`;
    /* published points and stacked grades */
    let ln='';NP.forEach((p,k)=>{const x=k===0?xd:X(p.m);ln+=(k?'L':'M')+f1(x)+' '+f1(Y(p.any))});
    s+=`<path d="${ln}" style="fill:none;stroke:var(--brand);stroke-width:1.4;stroke-dasharray:4 4;opacity:.4"/>`;
    /* drawn-in line up to the cursor */
    const curX=t<=0?xd:lerp(xd,X(18),t);let dl='';
    NP.forEach((p,k)=>{if(k===0){dl='M'+f1(xd)+' '+f1(Y(p.any));return}const pr=NP[k-1];
      const xa=k===1?xd:X(pr.m),xb=X(p.m);if(curX<=xa)return;const u=clamp((curX-xa)/(xb-xa));dl+='L'+f1(lerp(xa,xb,u))+' '+f1(Y(lerp(pr.any,p.any,u)))});
    s+=`<path d="${dl}" style="fill:none;stroke:var(--brand);stroke-width:2.6"/>`;
    let last=0;NP.forEach((p,k)=>{const x=k===0?xd:X(p.m),on=k===0||curX>=x-.5;if(on)last=k;
      const bw=NN?12:16;
      if(on){if(p.g3)s+=`<rect x="${f1(x-bw/2)}" y="${f1(Y(p.g3))}" width="${bw}" height="${f1(G.y1-Y(p.g3))}" style="fill:var(--tumour);opacity:.85"/>`;
        if(p.g2)s+=`<rect x="${f1(x-bw/2)}" y="${f1(Y(p.g3+p.g2))}" width="${bw}" height="${f1(Y(p.g3)-Y(p.g3+p.g2))}" style="fill:var(--warn);opacity:.8"/>`}
      s+=`<circle cx="${f1(x)}" cy="${f1(Y(p.any))}" r="${k===last&&on?6.5:5}" style="fill:${on?'var(--brand)':'var(--panel)'};stroke:var(--brand);stroke-width:2"/>`;
      s+=`<text x="${f1(x+(k===0?10:0))}" y="${f1(Y(p.any)-10)}" class="t-lbl ${k===0?'':'t-mid'}" style="opacity:${on?1:.4}">${p.any}%</text>`;
      s+=`<text x="${f1(x)}" y="${G.lbl}" class="t-xs t-mid">${NN?p.l:p.ll.replace(' after','')}</text>`});
    s+=`<line x1="${f1(curX)}" x2="${f1(curX)}" y1="${G.y0-8}" y2="${G.y1}" style="stroke:var(--ink);opacity:.3"/>`;
    s+=`<text x="${G.x1}" y="${G.lbl+14}" class="t-xs t-end">months after the last cycle →</text>`;
    /* legend */
    const lgx=NN?G.x0:G.x0+120,lgy=NN?G.y0-24:G.y0-14;
    s+=`<rect x="${lgx}" y="${lgy-8}" width="10" height="8" style="fill:var(--warn)"/><text x="${lgx+14}" y="${lgy}" class="t-xs">grade 2</text><rect x="${lgx+70}" y="${lgy-8}" width="10" height="8" style="fill:var(--tumour)"/><text x="${lgx+84}" y="${lgy}" class="t-xs">grade 3</text><circle cx="${lgx+150}" cy="${lgy-4}" r="4" style="fill:var(--brand)"/><text x="${lgx+158}" y="${lgy}" class="t-xs">any grade</text>`;
    /* a hand with tingling points */
    const P=NP[last],hx=G.hx,hy=G.hy,hs=NN?.8:1;
    s+=`<g transform="translate(${hx} ${hy}) scale(${hs})"><path d="M-30 70V10Q-30 0 -22 0Q-14 0 -14 10V-30Q-14 -40 -6 -40Q2 -40 2 -30V-44Q2 -54 10 -54Q18 -54 18 -44V-32Q18 -42 26 -42Q34 -42 34 -32V-20Q34 -28 42 -28Q50 -28 50 -18V40Q50 70 30 80H-14Q-30 80 -30 70Z" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.6"/>`;
    const rr=rng(11),nDots=Math.round(P.any/4);for(let i=0;i<25;i++){const x=-24+rr()*70,y=-46+rr()*120,on=i<nDots;const ph=Math.sin(t*40+i);
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${on?f1(2.4+ph*.6):1.6}" style="fill:${on?'var(--brand)':'var(--line)'};opacity:${on?.85:.6}"/>`}
    s+=`</g><text x="${hx}" y="${f1(hy+hs*100)}" class="t-xs t-mid">${P.any}% with any grade</text>`;
    if(!NN)s+=`<text x="${hx}" y="${f1(hy-66)}" class="t-sm t-mid" style="fill:var(--brand)">${last===0?'DURING TREATMENT':P.ll.toUpperCase()}</text>`;
    ns.innerHTML=s;
    nr.setAttribute('aria-valuetext',`${last===0?'During treatment':'Up to '+Math.round(mo*10)/10+' months after'}: latest published point ${P.ll}, ${P.any}% any grade`);
    $('#lvNNote').innerHTML=noteHTML(NNOTE[last]);
  }
  playWire(nr,$('#lvNPlay'),drawN,9000,'Replay','living');
  drawN(+nr.value);

  /* ===== CHALLENGE ===== */
  const ex=$('#lvEx');let xo='dfs',xT=1;
  const XD={dfs:{a:80.3,b:73.9,u:'disease-free at 5 years',hr:'HR 0.72 (95% CI 0.55–0.94)',k:'Disease-free survival'},
            os:{a:90.3,b:83.2,u:'alive at 8 years',hr:'HR 0.63 (95% CI 0.43–0.94)',k:'Overall survival'},
            ae:{a:18.5,b:11.5,u:'musculoskeletal adverse events',hr:'more with exercise',k:'Harms'}};
  function drawX(){const NX=vb(ex,'720 210','400 250');const D=XD[xo];
    const x0=NX?16:200,x1=NX?384:600,y=NX?64:56,bh=NX?30:34,gap=NX?66:62;let s='';
    s+=`<text x="${NX?16:24}" y="${NX?22:24}" class="t-sm" style="fill:var(--brand)">${D.k.toUpperCase()} · ${D.hr}</text>`;
    [['Structured exercise',D.a,'var(--rx)'],['Health education',D.b,'var(--muted)']].forEach(([l,v,c],k)=>{const yy=y+k*gap,w=(x1-x0)*v/100*ease(xT);
      if(NX)s+=`<text x="${x0}" y="${yy-6}" class="t-lbl">${l}</text>`;else s+=`<text x="${x0-12}" y="${yy+bh/2+5}" class="t-lbl t-end">${l}</text>`;
      s+=`<rect x="${x0}" y="${yy}" width="${f1(x1-x0)}" height="${bh}" rx="6" style="fill:var(--panel-2)"/><rect x="${x0}" y="${yy}" width="${f1(w)}" height="${bh}" rx="6" style="fill:${c};opacity:.85"/>`;
      s+=`<text x="${f1(Math.min(x0+w+8,x1-50))}" y="${yy+bh/2+5}" class="t-lbl" style="${x0+w+8>x1-50?'fill:var(--panel)':''}">${(v*ease(xT)).toFixed(1)}%</text>`});
    const ly=y+2*gap+(NX?2:6);s+=`<text x="${NX?16:24}" y="${ly}" class="t-xs">${xo==='ae'?'Exercise is not free of harm: more strains and joint problems.':'Difference: '+(D.a-D.b).toFixed(1)+' percentage points, '+D.u+'.'}</text>`;
    ex.innerHTML=s;
    $('#lvExNote').innerHTML=noteHTML({k:'CHALLENGE · phase 3',t:xo==='ae'?'The cost: more aches and strains':'Exercise as treatment',
      txt:`A 3-year structured exercise programme after adjuvant chemotherapy improved disease-free survival (HR 0.72; 5-year DFS 80.3% vs 73.9%), and overall survival was consistent with benefit (HR 0.63; 8-year OS 90.3% vs 83.2%). Musculoskeletal adverse events were more common with exercise (18.5% vs 11.5%). It is the first phase 3 trial to show that exercise after treatment improves cancer outcomes in colon cancer. <span class="ev est">Established</span> for this population. Earlier, in the observational CALGB 89803 cohort, 18–26.9 MET-h/week of activity was linked to better disease-free survival (HR 0.51). <sup class="c" data-ref="Courneya2025,Meyerhardt2006" title="Source 112,364">112,364</sup>`,
      pt:`Regular exercise after chemotherapy helped people with colon cancer stay cancer-free longer in a large trial.`,
      hook:`CHALLENGE: structured exercise after adjuvant chemotherapy, DFS HR 0.72 (80.3% vs 73.9% at 5 years).`});
  }
  $$('[data-lvx]').forEach(b=>b.addEventListener('click',()=>{xo=b.dataset.lvx;$$('[data-lvx]').forEach(x=>x.setAttribute('aria-pressed',x===b));animate(700,p=>{xT=p;drawX()})}));
  drawX();
  const prevR=redraws.living;redraws.living=()=>{prevR&&prevR();lars();drawSt();drawX()};
};
/* =============== 5.2 Nursing care =============== */
const NU_STEPS=[
 {from:0,at:.08,k:'Before · colonoscopy',t:'Bowel-prep teaching',
  txt:`The 2025 US Multi-Society Task Force update (replacing 2014) recommends split-dose preparation and suggests a 2 L regimen may be enough. Same-day prep is acceptable for afternoon colonoscopy but inferior for a morning one. Diet restriction is limited to the day before, with clear liquids or low-fibre, low-residue meals for breakfast and lunch; oral simethicone is suggested. Units should track adequate preps, with a target above 90% per endoscopist. ESGE adds: start the last dose within 5 hours of colonoscopy and finish at least 2 hours before. <sup class="c" data-ref="Jacobson2025,Johnson2014,Hassan2019" title="Source 226,258,268">226,258,268</sup>`,
  pt:`Split the laxative between the evening before and the morning of the test, eat light low-fibre food the day before, and follow the written instructions closely.`,
  hook:`Split-dose beats day-before prep (OR 2.51). USMSTF target: more than 90% adequate preps. <sup class="c" data-ref="Martel2015,Jacobson2025" title="Source 258,350">258,350</sup>`},
 {from:.17,at:.25,k:'Before · surgery',t:'Stoma site marking and teaching',
  txt:`The WOCN Society/ASCRS position statement says marking the best stoma site before surgery makes independent stoma care, predictable pouch wear and a return to normal activities more likely; colorectal surgeons and certified ostomy nurses are best placed to mark. In emergency surgery at one centre, grade 2 or worse stoma complications were 24% with marking vs 36% without (<span class="ev early">Early evidence</span>, retrospective). Preoperative education halved peristomal skin complications (9.5% vs 19.4%; very low certainty). <sup class="c" data-ref="Salvadalena2015,Nozawa2024,Shi2025" title="Source 410,466,488">410,466,488</sup>`,
  pt:`Having a stoma nurse mark the best spot on your belly before surgery, and learning bag care early, can mean fewer skin problems.`,
  hook:`Not marking the site was an independent risk factor for stoma complications (adjusted OR 1.69). <sup class="c" data-ref="Nozawa2024" title="Source 410">410</sup>`},
 {from:.34,at:.42,k:'Before and after surgery',t:'Enhanced recovery (ERAS)',
  txt:`ERAS replaces overnight fasting with carbohydrate drinks up to 2 hours before surgery, and adds minimally invasive surgery, balanced IV fluids, early removal of drains and tubes, early mobilisation, and drinking and eating on the day of the operation. An ERAS coordinator, often a nurse, is part of the team. Across 16 RCTs, morbidity fell (RR 0.60) and stay was 2.28 days shorter with no rise in readmissions. With dedicated stoma education inside ERAS, median stay was 6 vs 9 days. <sup class="c" data-ref="Ljungqvist2017,Greco2014,Forsmo2016" title="Source 189,196,330">189,196,330</sup>`,
  pt:`After bowel surgery, getting up, drinking and eating early is part of the plan, not a risk.`,
  hook:`ERAS: carbohydrate drink to 2 h pre-op, early mobilisation, early feeding; stay 30–50% shorter. <sup class="c" data-ref="Ljungqvist2017" title="Source 330">330</sup>`},
 {from:.5,at:.58,k:'Before chemotherapy',t:'DPYD testing',
  txt:`Fluoropyrimidines cause severe toxicity in up to 30% of patients, often because of reduced DPD activity. US capecitabine and fluorouracil labels now carry a <b>boxed warning</b> to test for DPYD variants before starting unless immediate treatment is necessary. CPIC states that an intermediate metabolizer with activity score 1 should have the starting dose reduced by 50% (strong recommendation). The 2020 EMA recommendation accepts phenotyping (blood uracil) or genotyping. <sup class="c" data-ref="Henricks2018,FDA-Xeloda,FDA-FluorouracilFK,Amstutz2018,deWith2023" title="Source 11,127,162,179,234">11,127,162,179,234</sup>`,
  pt:`Before 5-FU or capecitabine, a blood test for a gene (DPYD) can show if your body clears the drug slowly, so the dose can be adjusted.`,
  hook:`CPIC: DPYD activity score 1 → 50% starting-dose reduction; activity score 0 → avoid fluoropyrimidines.`},
 {from:.67,at:.75,k:'During chemotherapy',t:'Toxicity watch',
  txt:`Capecitabine's hallmark is hand-foot syndrome: 60% any grade and 17% grade 3–4 in X-ACT, with a median onset of 2.6 months in single-agent data. The Xeloda label prints grade 2 diarrhoea as "an increase of 4 to 6 stools/day or nocturnal stools" and tells patients to stop and call at grade 2 or worse, and to call promptly for fever of 100.5°F or more. Grade 3–4 neutropenia was 20.3% with 3 months of FOLFOX in IDEA. Oxaliplatin neuropathy is acute (within hours to 2 days, resolves within 14 days, cold-triggered) or delayed (persists beyond 14 days). <sup class="c" data-ref="FDA-Xeloda,Grothey2018,FDA-OxaliplatinGland" title="Source 171,179,201">171,179,201</sup>`,
  pt:`On capecitabine, stop the tablets and call your team if your hands or feet become red and sore enough to affect daily life, or if you have 4 or more extra bowel movements a day.`,
  hook:`Xeloda label: grade 2 diarrhoea = an increase of 4–6 stools/day or nocturnal stools.`},
 {from:.84,at:.92,k:'After',t:'Stoma care and survivorship',
  txt:`Dehydration was the commonest reason for readmission after a diverting loop ileostomy (43.1% of readmissions in 603 patients); one study defined it as output of 1500 mL or more in 24 h plus a BUN/creatinine ratio of 20 or more, or physical signs. Expert first-line management of high output is to rehydrate, restrict hypotonic drinks, sip a glucose-saline solution and give antimotility drugs, though pooled trials of the drugs showed no significant effect (<span class="ev early">Early evidence</span>). Survivorship teaching covers follow-up, exercise and fear of recurrence. <sup class="c" data-ref="Messaris2012,Nightingale2022,Lederhuber2023,Meyerhardt2013,Courneya2025,Kotronoulas2017" title="Source 112,296,310,362,366,403">112,296,310,362,366,403</sup>`,
  pt:`With an ileostomy, watch your output. If the bag fills much more than usual, or you feel very thirsty, dizzy or are passing little urine, call your team.`,
  hook:`About 1 in 5 new ileostomies are readmitted within 30 days; 6% for dehydration. <sup class="c" data-ref="Vogel2022" title="Source 565">565</sup>`}
];
const NU_FLIPS=[
 {k:'DPYD',f:'A normal DPYD test means 5-FU is safe.',b:`Testing the four main variants explains only 20–30% of early severe 5-FU toxicity, so a negative test does not rule out DPD deficiency. The Xeloda label notes serious reactions can still occur when no variant is found. <sup class="c" data-ref="Amstutz2018,FDA-Xeloda" title="Source 11,179">11,179</sup>`},
 {k:'DPYD',f:'A dose cut for DPYD stays cut for the whole course.',b:`CPIC states the dose should be increased in later cycles if the first two cycles are tolerated, so that efficacy is maintained. <sup class="c" data-ref="Amstutz2018" title="Source 11">11</sup>`},
 {k:'Oxaliplatin',f:'Ice chips help mouth sores during oxaliplatin.',b:`The oxaliplatin label says to avoid topical ice for mucositis prophylaxis, because cold worsens acute neurological symptoms. <sup class="c" data-ref="FDA-OxaliplatinGland" title="Source 171">171</sup>`},
 {k:'Oxaliplatin',f:'Calcium and magnesium infusions prevent the neuropathy.',b:`A phase III placebo-controlled trial (N08CB, 353 patients) found IV calcium and magnesium did not reduce acute or cumulative neurotoxicity. ASCO recommends no agent for prevention. <sup class="c" data-ref="Loprinzi2014,Loprinzi2020" title="Source 336,337">336,337</sup>`},
 {k:'Oxaliplatin',f:'The numbness is gone once chemo stops.',b:`In the adjuvant trial, 21% still had some neuropathy 18 months after the last cycle; by then symptoms were worse in the feet than the hands. <sup class="c" data-ref="FDA-OxaliplatinGland,Pachman2015" title="Source 171,419">171,419</sup>`},
 {k:'Stoma',f:'A temporary stoma is always reversed.',b:`In the TME trial, 19% of stomas were never reversed; in a Swedish series, 24% had a permanent stoma at the end of follow-up. <sup class="c" data-ref="denDulk2007,Holmgren2017" title="Source 126,241">126,241</sup>`},
 {k:'Stoma',f:'With high ileostomy output, drink as much water as you can.',b:`Expert guidance is to rehydrate first, then restrict oral hypotonic fluid and sip a glucose-saline solution, with antimotility drugs. Plain water can add to the losses. <sup class="c" data-ref="Nightingale2022" title="Source 403">403</sup>`},
 {k:'Prep',f:'Three days of low-residue diet clean the bowel better than one.',b:`A meta-analysis of RCTs found one day as effective as three (OR 0.89 for adequate prep) and better tolerated. <sup class="c" data-ref="Wang2024LRD" title="Source 572">572</sup>`},
 {k:'Follow-up',f:'More frequent scans after surgery help people live longer.',b:`FACS, COLOFOL and GILDA found earlier detection but no clear overall survival gain from intensive follow-up. <sup class="c" data-ref="Primrose2014,WilleJorgensen2018,Rosati2016" title="Source 439,458,579">439,458,579</sup>`}
];
const NU_DP={
 '2':{ph:'Normal metabolizer',c:'var(--good)',dose:[1,1],lab:'no reduction listed',txt:`Activity score 2 is a normal metabolizer. The dose reductions CPIC lists are for intermediate and poor metabolizers. A normal result still does not rule out DPD deficiency: the four main variants explain only 20–30% of early severe toxicity. <sup class="c" data-ref="Amstutz2018" title="Source 11">11</sup>`},
 '1.5':{ph:'Intermediate metabolizer',c:'var(--warn)',dose:[.5,.75],lab:'reduce by 25–50%',txt:`CPIC 2017: reduce the starting dose by 25–50% (moderate recommendation). In a prospective Dutch study, 25% reductions may have been too small for c.2846A>T and c.1236G>A carriers, so this point is still evolving. <sup class="c" data-ref="Amstutz2018,Henricks2018" title="Source 11,234">11,234</sup>`},
 '1':{ph:'Intermediate metabolizer',c:'var(--warn)',dose:[.5,.5],lab:'reduce by 50%',txt:`CPIC 2017: reduce the starting dose by 50% (strong recommendation), then increase in later cycles if the first two cycles are tolerated, to maintain efficacy. With genotype-guided dosing, the relative risk of severe toxicity in DPYD*2A carriers fell to 1.31, vs 2.87 in a historical full-dose cohort. <sup class="c" data-ref="Amstutz2018,Henricks2018" title="Source 11,234">11,234</sup>`},
 '0.5':{ph:'Poor metabolizer',c:'var(--bad)',dose:null,lab:'avoid; strongly reduced only if no alternative',txt:`CPIC 2017: avoid 5-FU and its prodrugs. At activity score 0.5, if no alternative is suitable, a strongly reduced dose with early therapeutic drug monitoring may be considered. The US labels state that no dose has been proven safe in complete DPD deficiency. <sup class="c" data-ref="Amstutz2018,FDA-Xeloda,FDA-FluorouracilFK" title="Source 11,162,179">11,162,179</sup>`},
 '0':{ph:'Poor metabolizer',c:'var(--bad)',dose:null,lab:'avoid 5-FU and its prodrugs',txt:`CPIC 2017: avoid 5-FU and its prodrugs. The US labels say to avoid the drug in patients with certain homozygous or compound heterozygous DPYD variants that cause complete DPD deficiency. <sup class="c" data-ref="Amstutz2018,FDA-Xeloda,FDA-FluorouracilFK" title="Source 11,162,179">11,162,179</sup>`}
};
inits.nursing=()=>{
  const svg=$('#nuSvg'),rg=$('#nuT');
  const T=(x,y,txt,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${txt}</text>`;
  const tick=(x,y,on)=>on?`<path d="M${f1(x-5)} ${f1(y)}l4 4 7-9" style="fill:none;stroke:var(--good);stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round"/>`:`<rect x="${f1(x-6)}" y="${f1(y-6)}" width="12" height="12" rx="3" style="fill:none;stroke:var(--muted)"/>`;
  const bar=(x,y,w,v,mx,c,lab,val)=>`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="14" rx="4" style="fill:var(--panel-2)"/><rect x="${f1(x)}" y="${f1(y)}" width="${f1(w*v/mx)}" height="14" rx="4" style="fill:${c}"/>${T(x,y-4,lab)}${T(x+w*v/mx+5,y+11,val,'t-xs','fill:var(--ink);font-weight:700')}`;
  const glass=(x,y,lvl,c='var(--rx)')=>`<path d="M${f1(x-9)} ${f1(y-26)}L${f1(x-7)} ${f1(y)}H${f1(x+7)}L${f1(x+9)} ${f1(y-26)}Z" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.4"/><path d="M${f1(x-7+ (1-lvl)*1.5)} ${f1(y-24*lvl)}L${f1(x-7)} ${f1(y)}H${f1(x+7)}L${f1(x+7-(1-lvl)*1.5)} ${f1(y-24*lvl)}Z" style="fill:${c};opacity:.6"/>`;
  /* ---- vignettes: A and B are regions {x,y,w,h} ---- */
  function vPrep(A,B,f){let s=T(A.x,A.y+12,'SPLIT-DOSE PREP · RELATIVE TIMELINE','t-sm','fill:var(--rx)');
    const y=A.y+132,x0=A.x+10,x1=A.x+A.w-14,X=u=>lerp(x0,x1,u),cur=ease(clamp(f*1.15));
    s+=`<line x1="${x0}" x2="${x1}" y1="${y}" y2="${y}" style="stroke:var(--muted);stroke-width:2"/>`;
    s+=`<rect x="${f1(x0)}" y="${y-4}" width="${f1(X(.56)-x0)}" height="8" style="fill:var(--panel-2)"/>`;
    s+=T(X(.02),y+20,'DAY BEFORE','t-xs','font-weight:700')+T(X(.6),y+20,'PROCEDURE DAY','t-xs','font-weight:700');
    /* meals */
    s+=`<circle cx="${f1(X(.12))}" cy="${y-40}" r="12" style="fill:var(--panel);stroke:var(--gold);stroke-width:1.6"/><circle cx="${f1(X(.12))}" cy="${y-40}" r="6" style="fill:var(--gold-soft);stroke:var(--gold)"/>`;
    s+=T(X(.02),y-86,'breakfast &amp; lunch:')+T(X(.02),y-74,'clear liquids or')+T(X(.02),y-62,'low-fibre meals');
    /* dose 1 and 2 */
    const d1=X(.45),d2=X(.74),col=X(1);
    s+=glass(d1,y-14,cur<.4?1:clamp(1-(cur-.4)/.1))+T(d1,y-58,'evening:','t-xs t-mid')+T(d1,y-46,'dose 1','t-xs t-mid','font-weight:700');
    s+=glass(d2,y-14,cur<.74?1:clamp(1-(cur-.74)/.1))+T(d2,y-58,'morning:','t-xs t-mid')+T(d2,y-46,'dose 2','t-xs t-mid','font-weight:700');
    /* ESGE windows */
    const w5=X(.68),w2=X(.88);
    s+=`<path d="M${f1(w5)} ${y+34}V${y+40}H${f1(col)}V${y+34}" style="fill:none;stroke:var(--accent);stroke-width:1.3"/>`+T(col,y+54,'start last dose ≤ 5 h before','t-xs t-end','fill:var(--accent)');
    s+=`<path d="M${f1(w2)} ${y+64}V${y+70}H${f1(col)}V${y+64}" style="fill:none;stroke:var(--bad);stroke-width:1.3"/>`+T(col,y+84,'finish ≥ 2 h before','t-xs t-end','fill:var(--bad)');
    s+=scope(col-14,y-14,0,{})+T(col,y-46,'colonoscopy','t-xs t-end','font-weight:700');
    s+=`<line x1="${f1(X(cur))}" x2="${f1(X(cur))}" y1="${y-88}" y2="${y+6}" style="stroke:var(--ink);opacity:.3"/>`;
    /* B: quality */
    s+=T(B.x,B.y+12,'WHY THE DETAILS MATTER','t-sm','fill:var(--rx)');
    const g=ramp(f,.1,.6),bw=B.w-50;
    s+=bar(B.x,B.y+44,bw,90*g,100,'var(--rx)','adequate preps per endoscopist',`${Math.round(90*g)}%`);
    s+=`<line x1="${f1(B.x+bw*.9)}" x2="${f1(B.x+bw*.9)}" y1="${B.y+38}" y2="${B.y+64}" style="stroke:var(--ink);stroke-width:1.6"/>`+T(B.x+bw*.9,B.y+76,'USMSTF target > 90%','t-xs t-mid');
    const facts=[['Split vs day-before','OR 2.51 for adequate cleansing'],['Enhanced instructions','OR 2.35'],['1 day vs 3 days low-residue','equal (OR 0.89), better tolerated'],['Simethicone','suggested as an add-on']];
    facts.forEach(([a,b],k)=>{const yy=B.y+104+k*34,on=f>.25+k*.15;s+=tick(B.x+6,yy-4,on)+T(B.x+20,yy-2,a,'t-xs','fill:var(--ink);font-weight:700;opacity:'+(on?1:.45))+T(B.x+20,yy+10,b,'t-xs','opacity:'+(on?1:.45))});
    return s}
  function vMark(A,B,f){let s=T(A.x,A.y+12,'PRE-OPERATIVE STOMA SITE MARKING','t-sm','fill:var(--brand)');
    const cx=A.x+A.w*.32,top=A.y+30,w=150,h=196,l=cx-w/2,r=cx+w/2,b=top+h;
    s+=`<path d="M${l+22} ${top}Q${l} ${top+14} ${l+5} ${top+80}Q${l+10} ${b-36} ${l+30} ${b}H${r-30}Q${r-10} ${b-36} ${r-5} ${top+80}Q${r} ${top+14} ${r-22} ${top}Z" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.4"/>`;
    s+=`<circle cx="${cx}" cy="${top+104}" r="2.6" style="fill:var(--muted)"/>`+T(cx+6,top+100,'navel','t-xs');
    /* skin folds when sitting */
    s+=`<path d="M${l+14} ${top+132}Q${cx} ${top+142} ${r-14} ${top+132}" style="fill:none;stroke:var(--muted);stroke-dasharray:3 3;opacity:.7"/>`+T(r-12,top+128,'fold','t-xs t-end');
    const tx=cx-40,ty=top+118,p=ramp(f,.1,.5),px=lerp(cx+90,tx,ease(p)),py=lerp(top-6,ty,ease(p));
    if(f>.5){const k=ramp(f,.5,.7);s+=`<circle cx="${tx}" cy="${ty}" r="${f1(12*k)}" style="fill:none;stroke:var(--brand);stroke-width:2"/><path d="M${tx-7} ${ty}h14M${tx} ${ty-7}v14" style="stroke:var(--brand);stroke-width:2;opacity:${k}"/>`}
    s+=`<g transform="translate(${f1(px)} ${f1(py)}) rotate(35)"><rect x="-3" y="-34" width="6" height="30" rx="2" style="fill:var(--brand)"/><path d="M-3 -4L0 3L3 -4Z" style="fill:var(--ink)"/></g>`;
    s+=T(r+10,top+60,'marked by a colorectal','t-xs')+T(r+10,top+72,'surgeon or certified','t-xs')+T(r+10,top+84,'ostomy nurse','t-xs');
    s+=T(r+10,top+110,'aims: independent care,','t-xs','fill:var(--ink)')+T(r+10,top+122,'predictable pouch wear,','t-xs','fill:var(--ink)')+T(r+10,top+134,'back to normal activities','t-xs','fill:var(--ink)');
    s+=T(B.x,B.y+12,'MARKED OR TAUGHT vs NOT','t-sm','fill:var(--brand)');
    const g=ease(ramp(f,.2,.8)),bw=B.w-46,rows=[['Stoma complications grade ≥ 2 · marked',24,'var(--brand)'],['not marked (emergency surgery)',36,'var(--muted)'],['Peristomal dermatitis · marked',10,'var(--brand)'],['not marked',18,'var(--muted)'],['Skin complications · pre-op education',9.5,'var(--rx)'],['no education',19.4,'var(--muted)']];
    rows.forEach(([l2,v,c],k)=>s+=bar(B.x,B.y+40+k*34+(k>>1)*6,bw,v*g,40,c,l2,`${(v*g).toFixed(v%1?1:0)}%`));
    return s}
  function vEras(A,B,f){let s=T(A.x,A.y+12,'ERAS PATHWAY ELEMENTS','t-sm','fill:var(--rx)');
    const items=['Carbohydrate drinks up to 2 h before, not overnight fasting','Minimally invasive surgery','Balanced rather than large-volume IV fluids','Drains and tubes avoided or removed early','Early mobilisation','Drinks and food on the day of the operation'];
    items.forEach((it,k)=>{const on=f>.08+k*.1,yy=A.y+42+k*32;s+=tick(A.x+8,yy-4,on)+T(A.x+24,yy,it.length>40?it.slice(0,it.lastIndexOf(' ',40)):it,'t-xs','fill:var(--ink);opacity:'+(on?1:.45));
      if(it.length>40)s+=T(A.x+24,yy+12,it.slice(it.lastIndexOf(' ',40)+1),'t-xs','fill:var(--ink);opacity:'+(on?1:.45))});
    s+=T(A.x,A.y+A.h-6,'An ERAS coordinator, often a nurse, runs the pathway.','t-xs','fill:var(--rx)');
    s+=T(B.x,B.y+12,'HOSPITAL STAY · MEDIAN DAYS','t-sm','fill:var(--rx)');
    const g=ease(ramp(f,.2,.75)),bw=B.w-40;
    s+=bar(B.x,B.y+44,bw,6*g,10,'var(--rx)','ERAS + stoma education',`${(6*g).toFixed(0)} d`)+bar(B.x,B.y+80,bw,9*g,10,'var(--muted)','standard care',`${(9*g).toFixed(0)} d`);
    s+=T(B.x,B.y+120,'16 RCTs, 2376 patients:','t-xs','fill:var(--ink);font-weight:700')+T(B.x,B.y+134,'morbidity RR 0.60','t-xs')+T(B.x,B.y+148,'stay 2.28 days shorter','t-xs')+T(B.x,B.y+162,'no rise in readmissions','t-xs');
    return s}
  function vDpyd(A,B,f){let s=T(A.x,A.y+12,'WHERE A 5-FU DOSE GOES','t-sm','fill:var(--accent)');
    const y=A.y+96,x0=A.x+20,gx=A.x+A.w*.55,x1=A.x+A.w-20,rr=rng(4);
    s+=`<rect x="${f1(gx-24)}" y="${y-34}" width="48" height="68" rx="10" style="fill:var(--accent-soft);stroke:var(--accent);stroke-width:1.6"/>`+T(gx,y+4,'DPD','t-lbl t-mid','fill:var(--accent)');
    s+=T(x0-6,y-46,'dose','t-xs');
    for(let i=0;i<20;i++){const ph=clamp(f*1.6-i*.03),broken=i%5!==4;let x,yy;
      if(ph<=.5){x=lerp(x0,gx-26,ph/.5);yy=y-24+(i%4)*14+(rr()-.5)*2}
      else if(broken){const u=(ph-.5)/.5;x=lerp(gx,gx+20,u);yy=lerp(y,A.y+A.h-50,u)}
      else{const u=(ph-.5)/.5;x=lerp(gx+26,x1,u);yy=y-12+(i%3)*10}
      s+=`<circle cx="${f1(x)}" cy="${f1(yy)}" r="4.2" style="fill:${ph>.5&&broken?'var(--muted)':'var(--gold)'};opacity:${ph>.5&&broken?.55:.95}"/>`}
    s+=T(gx+30,A.y+A.h-34,'≈ 80% broken down by DPD','t-xs','fill:var(--accent);font-weight:700');
    s+=T(x1,y-40,'only 1–3% becomes','t-xs t-end')+T(x1,y-28,'cytotoxic metabolites','t-xs t-end');
    s+=T(A.x,A.y+A.h-6,'Less DPD activity → the drug lingers → toxicity','t-xs','fill:var(--ink)');
    /* B: boxed warning */
    s+=`<rect x="${B.x}" y="${B.y+4}" width="${B.w}" height="124" rx="8" style="fill:var(--panel);stroke:var(--ink);stroke-width:2.4"/>`;
    s+=T(B.x+12,B.y+24,'BOXED WARNING · US LABELS','t-sm','fill:var(--ink);font-weight:700');
    ['"Test patients for genetic variants','of DPYD prior to initiating"','capecitabine or fluorouracil','"unless immediate treatment','is necessary"'].forEach((l,k)=>s+=T(B.x+12,B.y+46+k*15,l,'t-xs','fill:var(--ink)'));
    const on=f>.45;s+=`<rect x="${B.x}" y="${B.y+144}" width="${B.w}" height="70" rx="8" style="fill:var(--warn-soft);stroke:var(--warn);opacity:${on?1:.35}"/>`;
    s+=T(B.x+12,B.y+164,'CPIC 2017, as published:','t-xs','fill:var(--warn);font-weight:700;opacity:'+(on?1:.35))+T(B.x+12,B.y+180,'activity score 1 → reduce the','t-xs','fill:var(--ink);opacity:'+(on?1:.35))+T(B.x+12,B.y+194,'starting dose by 50% (strong)','t-xs','fill:var(--ink);opacity:'+(on?1:.35));
    return s}
  function vTox(P,f,N){let s='';const cols=N?2:4,gap=10,tw=(P.w-gap*(cols-1)-24)/cols,th=N?236:248;
    const tiles=[
     {c:'var(--bad)',h:'HANDS AND FEET',l:['Hand-foot syndrome on','capecitabine (X-ACT):','60% any grade','17% grade 3–4','Label: stop and call','at grade 2 or worse']},
     {c:'var(--warn)',h:'BOWELS',l:['Label grade 2 diarrhoea:','"an increase of 4 to 6','stools/day or nocturnal','stools"','Stop capecitabine and','call at grade 2 or worse']},
     {c:'var(--tumour)',h:'TEMPERATURE',l:['Call promptly for fever','≥ 100.5°F (label)','Grade 3–4 neutropenia','(IDEA, 3 months):','FOLFOX 20.3%','CAPOX 7.7%']},
     {c:'var(--accent)',h:'NERVES',l:['Acute: hours to 2 days,','resolves ≤ 14 days,','cold-triggered','Delayed: persists','> 14 days; can impair','daily activities']}];
    tiles.forEach((T0,k)=>{const cx=P.x+12+(k%cols)*(tw+gap),cy=P.y+12+Math.floor(k/cols)*(th+gap),on=ramp(f,k*.18,k*.18+.2);
      s+=`<rect x="${f1(cx)}" y="${f1(cy)}" width="${f1(tw)}" height="${th}" rx="10" style="fill:var(--panel);stroke:${T0.c};stroke-width:1.4;opacity:${.35+.65*on}"/>`;
      s+=T(cx+10,cy+18,T0.h,'t-sm','fill:'+T0.c+';font-weight:700');
      const ix=cx+tw/2,iy=cy+70;
      if(k===0){s+=`<path d="M${f1(ix-18)} ${iy+32}V${iy}Q${f1(ix-18)} ${iy-8} ${f1(ix-12)} ${iy-8}Q${f1(ix-6)} ${iy-8} ${f1(ix-6)} ${iy}V${iy-24}Q${f1(ix-6)} ${iy-30} ${f1(ix)} ${iy-30}Q${f1(ix+6)} ${iy-30} ${f1(ix+6)} ${iy-24}V${iy-4}Q${f1(ix+6)} ${iy-14} ${f1(ix+12)} ${iy-14}Q${f1(ix+18)} ${iy-14} ${f1(ix+18)} ${iy-4}V${iy+20}Q${f1(ix+18)} ${iy+34} ${f1(ix+6)} ${iy+38}H${f1(ix-10)}Z" style="fill:var(--bad-soft);stroke:var(--bad);stroke-width:1.4"/><ellipse cx="${f1(ix)}" cy="${iy+16}" rx="14" ry="12" style="fill:var(--bad);opacity:${f1(.6*on)}"/>`}
      if(k===1){const n=Math.round(6*on);for(let i=0;i<6;i++){const x=ix-48+i*19;s+=`<rect x="${f1(x)}" y="${iy-8}" width="14" height="22" rx="5" style="fill:${i<n?(i>=3?'var(--warn)':'var(--gold-soft)'):'var(--panel-2)'};stroke:var(--warn);stroke-width:1"/>`}
        s+=`<line x1="${f1(ix-48+3*19-3)}" x2="${f1(ix-48+3*19-3)}" y1="${iy-16}" y2="${iy+22}" style="stroke:var(--warn);stroke-width:1.6;stroke-dasharray:3 2"/>`+T(ix,iy+36,`+${n} stools/day vs usual`,'t-xs t-mid','fill:var(--ink)')}
      if(k===2){const lvl=on;s+=`<rect x="${f1(ix-6)}" y="${iy-34}" width="12" height="56" rx="6" style="fill:var(--panel);stroke:var(--tumour)"/><circle cx="${f1(ix)}" cy="${iy+26}" r="10" style="fill:var(--tumour)"/><rect x="${f1(ix-3)}" y="${f1(iy+20-48*lvl)}" width="6" height="${f1(48*lvl)}" style="fill:var(--tumour)"/><line x1="${f1(ix+8)}" x2="${f1(ix+22)}" y1="${iy-22}" y2="${iy-22}" style="stroke:var(--ink)"/>`+T(ix+24,iy-19,'100.5°F','t-xs','fill:var(--ink)')}
      if(k===3){s+=`<g transform="translate(${f1(ix)} ${iy})" style="stroke:var(--accent);stroke-width:2;stroke-linecap:round">${[0,60,120].map(a=>`<path d="M0 -22V22M-6 -16L0 -10L6 -16M-6 16L0 10L6 16" transform="rotate(${a})"/>`).join('')}</g><g style="opacity:${on}">${[...Array(6)].map((_,i)=>`<circle cx="${f1(ix-30+i*12)}" cy="${iy+34}" r="2" style="fill:var(--accent)"/>`).join('')}</g>`}
      T0.l.forEach((l,j)=>s+=T(cx+10,cy+(N?126:134)+j*15,l,'t-xs',(j>=4&&k!==2?'fill:var(--ink);font-weight:700;':'fill:var(--ink);')+'opacity:'+(.4+.6*on)))});
    return s}
  function vAfter(A,B,f){let s=T(A.x,A.y+12,'ILEOSTOMY OUTPUT · 24 HOURS','t-sm','fill:var(--brand)');
    const x0=A.x+38,x1=A.x+A.w-10,y0=A.y+40,y1=A.y+A.h-34,X=h=>lerp(x0,x1,h/24),Y=ml=>lerp(y1,y0,ml/2000);
    [0,500,1000,1500,2000].forEach(v=>s+=`<line x1="${x0}" x2="${x1}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/>`+T(x0-4,Y(v)+3,v?v+'':'0','t-xs t-end'));
    s+=`<line x1="${x0}" x2="${x1}" y1="${f1(Y(1500))}" y2="${f1(Y(1500))}" style="stroke:var(--bad);stroke-width:1.6;stroke-dasharray:6 3"/>`+T(x0+4,Y(1500)-5,'1500 mL / 24 h','t-xs','fill:var(--bad);font-weight:700');
    [0,6,12,18,24].forEach(h=>s+=T(X(h),y1+14,h+' h','t-xs t-mid'));
    const hrs=24*ease(clamp(f*1.2)),out=h=>1900*h/24;let d=`M${x0} ${y1}`;for(let h=0;h<=hrs;h+=.5)d+=`L${f1(X(h))} ${f1(Y(out(h)))}`;
    s+=`<path d="${d}L${f1(X(hrs))} ${y1}Z" style="fill:var(--stool);opacity:.35"/><path d="${d.replace(`M${x0} ${y1}`,`M${x0} ${f1(Y(0))}`)}" style="fill:none;stroke:var(--stool);stroke-width:2.2"/>`;
    const tot=out(hrs);s+=T(X(hrs)-4,Y(tot)-8,Math.round(tot/10)*10+' mL','t-xs t-end','fill:var(--ink);font-weight:700');
    if(tot>=1500){s+=T(x1,Y(1500)+16,'≥ 1500 mL + BUN/Cr ≥ 20','t-xs t-end','fill:var(--bad)')+T(x1,Y(1500)+28,'or signs = dehydration','t-xs t-end','fill:var(--bad)')+T(x1,Y(1500)+40,'(one study\'s definition)','t-xs t-end','fill:var(--bad)')}
    s+=T(B.x,B.y+12,'SURVIVORSHIP TEACHING','t-sm','fill:var(--brand)');
    const L=[['Follow-up plan','CEA 3–6-monthly, CT yearly × 3,','colonoscopy at 1 year'],['Exercise','structured exercise: DFS HR 0.72','(CHALLENGE)'],['Fear of recurrence','the most common need;','FCRI-SF cut-off 22'],['After rectal surgery','LARS score 0–42',''],['Fertility, work, money','ask early; often missed','']];
    L.forEach(([a,b,c],k)=>{const on=f>.15+k*.14,yy=B.y+40+k*42;s+=tick(B.x+6,yy-4,on)+T(B.x+20,yy-2,a,'t-xs','fill:var(--ink);font-weight:700;opacity:'+(on?1:.45))+T(B.x+20,yy+11,b,'t-xs','opacity:'+(on?1:.45))+(c?T(B.x+20,yy+23,c,'t-xs','opacity:'+(on?1:.45)):'')});
    return s}
  const VIG=[vPrep,vMark,vEras,vDpyd,null,vAfter];
  const STN=[['Bowel prep','Prep'],['Site marking','Marking'],['ERAS','ERAS'],['DPYD test','DPYD'],['Toxicity watch','Toxicity'],['Stoma & survivorship','After']];
  function draw(t){const N=vb(svg,'720 400','400 640');
    const sx=N?[34,100,166,234,300,366]:[80,192,304,424,536,648],py=68;
    const P=N?{x:8,y:118,w:384,h:514}:{x:16,y:116,w:688,h:276};
    const A=N?{x:20,y:130,w:360,h:236}:{x:32,y:128,w:360,h:252},B=N?{x:20,y:384,w:360,h:240}:{x:412,y:128,w:280,h:252};
    const p=phaseOf(NU_STEPS,t),nx=p<5?NU_STEPS[p+1].from:1.0001,f=ramp(t,NU_STEPS[p].from,nx-.015);
    let s='';
    /* group headers */
    const grp=[[0,2,'BEFORE SURGERY','BEFORE'],[3,4,'DURING CHEMOTHERAPY','CHEMO'],[5,5,'AFTER','AFTER']];
    grp.forEach(([a,b,l,ln])=>{const xa=sx[a]-(N?24:40),xb=sx[b]+(N?24:40);s+=`<path d="M${xa} 24V18H${xb}V24" style="fill:none;stroke:var(--muted);stroke-width:1"/>`+T((xa+xb)/2,12,N?ln:l,'t-xs t-mid','font-weight:700')});
    s+=`<line x1="${sx[0]}" x2="${sx[5]}" y1="${py}" y2="${py}" style="stroke:var(--line);stroke-width:6;stroke-linecap:round"/>`;
    const wx=p<5?lerp(sx[p],sx[p+1],ease(ramp(f,.88,1))):sx[5];
    s+=`<line x1="${sx[0]}" x2="${f1(wx)}" y1="${py}" y2="${py}" style="stroke:var(--brand);stroke-width:6;stroke-linecap:round;opacity:.7"/>`;
    sx.forEach((x,i)=>{const cur=i===p,done=i<p;s+=`<circle cx="${x}" cy="${py}" r="${cur?14:11}" style="fill:${cur?'var(--brand)':done?'var(--brand-soft)':'var(--panel)'};stroke:var(--brand);stroke-width:1.8"/>`+T(x,py+4,String(i+1),'t-xs t-mid',`fill:${cur?'var(--on-brand)':'var(--ink)'};font-weight:700`);
      s+=T(x,py+(N?30:32),N?STN[i][1]:STN[i][0],'t-xs t-mid',cur?'fill:var(--ink);font-weight:700':'')});
    s+=person(wx+(p<5&&wx===sx[p]?0:0),py-38,20,'var(--ink)');
    s+=`<rect x="${P.x}" y="${P.y}" width="${P.w}" height="${P.h}" rx="12" style="fill:var(--field);stroke:var(--line)"/>`;
    if(!N&&p!==4)s+=`<line x1="${B.x-12}" x2="${B.x-12}" y1="${P.y+14}" y2="${P.y+P.h-14}" style="stroke:var(--line)"/>`;
    if(N&&p!==4)s+=`<line x1="${P.x+14}" x2="${P.x+P.w-14}" y1="${B.y-12}" y2="${B.y-12}" style="stroke:var(--line)"/>`;
    s+=p===4?vTox(P,f,N):VIG[p](A,B,f);
    svg.innerHTML=s;setSt(p);
    rg.setAttribute('aria-valuetext',`Step ${p+1} of 6: ${NU_STEPS[p].t}`);
    $('#nuNote').innerHTML=noteHTML(NU_STEPS[p]);
  }
  const stop=playWire(rg,$('#nuPlay'),draw,36000,'Replay','nursing');
  const setSt=stepWire($('#nuSteps'),NU_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ===== DPYD teaching widget ===== */
  const ds=$('#nuDpyd');let as='1',dT=1,dStop=null;
  function drawD(){const ND=vb(ds,'720 250','400 330');const D=NU_DP[as],v=+as;let s='';
    const R=ND?{x0:24,x1:376,y:56}:{x0:30,x1:330,y:64},X=a=>lerp(R.x0,R.x1,a/2);
    s+=T(R.x0,R.y-38,'DPYD ACTIVITY SCORE → PHENOTYPE','t-sm','fill:var(--accent)');
    [[-.15,.65,'poor','var(--bad)','var(--bad-soft)'],[.85,1.65,'intermediate','var(--warn)','var(--warn-soft)'],[1.85,2.15,'normal','var(--good)','var(--good-soft)']].forEach(([a,b,l,c,cs])=>{const xa=X(Math.max(a,-.12)),xb=X(Math.min(b,2.12));
      s+=`<rect x="${f1(xa)}" y="${R.y-12}" width="${f1(xb-xa)}" height="24" rx="6" style="fill:${cs};stroke:${c}"/>`+T((xa+xb)/2,R.y+28,l,'t-xs t-mid','fill:'+c+';font-weight:700')});
    [0,.5,1,1.5,2].forEach(a=>s+=`<circle cx="${f1(X(a))}" cy="${R.y}" r="${a===v?8:4}" style="fill:${a===v?'var(--ink)':'var(--panel)'};stroke:var(--ink);stroke-width:1.4"/>`+T(X(a),R.y-18,String(a),'t-xs t-mid',a===v?'fill:var(--ink);font-weight:700':''));
    /* dose bar */
    const Bx=ND?24:390,Bw=ND?352:300,By=ND?136:64;
    s+=T(Bx,By-38,'STARTING DOSE AS CPIC STATES','t-sm','fill:var(--accent)');
    s+=`<rect x="${Bx}" y="${By-12}" width="${Bw}" height="24" rx="6" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    [0,.25,.5,.75,1].forEach(u=>s+=T(Bx+Bw*u,By+28,Math.round(u*100)+'%','t-xs t-mid'));
    const g=ease(dT);
    if(D.dose){const [a,b]=D.dose;s+=`<rect x="${Bx}" y="${By-12}" width="${f1(Bw*a*g)}" height="24" rx="6" style="fill:${D.c};opacity:.85"/>`;
      if(b>a)s+=`<rect x="${f1(Bx+Bw*a)}" y="${By-12}" width="${f1(Bw*(b-a)*g)}" height="24" style="fill:${D.c};opacity:.35"/>`;
      if(as==='2')s+=`<rect x="${Bx}" y="${By-12}" width="${Bw}" height="24" rx="6" style="fill:none;stroke:var(--good);stroke-width:2;stroke-dasharray:5 3"/>`}
    else s+=`<path d="M${Bx+Bw/2-14} ${By-10}l28 20M${Bx+Bw/2+14} ${By-10}l-28 20" style="stroke:var(--bad);stroke-width:3;stroke-linecap:round;opacity:${g}"/>`;
    s+=T(Bx,By+48,D.lab,'t-lbl','fill:'+D.c);
    /* breakdown particles: schematic, slower with lower activity */
    const Py=ND?250:178,px0=ND?24:30,px1=ND?376:690,gx=lerp(px0,px1,.45);
    s+=T(px0,Py-26,'SCHEMATIC: THE SAME DOSE MEETS LESS DPD','t-sm','fill:var(--accent)');
    s+=`<rect x="${f1(gx-22)}" y="${Py-14}" width="44" height="44" rx="8" style="fill:var(--accent-soft);stroke:var(--accent);opacity:${.3+.35*v}"/>`+T(gx,Py+12,'DPD','t-xs t-mid','fill:var(--accent);font-weight:700');
    const rr=rng(9);let left=0;
    for(let i=0;i<24;i++){const ph=clamp(dT*1.4-i*.016),brk=rr()<v/2*.9;let x,y;
      if(ph<.5){x=lerp(px0,gx-24,ph/.5);y=Py-6+(i%4)*9}else if(brk){x=gx-6+(i%4)*4;y=Py+40+(i%3)*5}else{x=lerp(gx+24,px1-10,(ph-.5)/.5)-(i%6)*6;y=Py-6+(i%4)*9;left++}
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="3.6" style="fill:${ph>=.5&&brk?'var(--muted)':'var(--gold)'};opacity:${ph>=.5&&brk?.5:.95}"/>`}
    s+=T(ND?px0:px1,Py+(ND?70:48),'gold: drug still circulating · grey: broken down','t-xs'+(ND?'':' t-end'));
    ds.innerHTML=s;
    $('#nuDNote').innerHTML=`<div class="kicker">Activity score ${as} · ${D.ph}</div><h4>${D.lab[0].toUpperCase()+D.lab.slice(1)}</h4><p>${D.txt}</p>
      <div class="kv"><div><dt>Phenotypes (CPIC)</dt><dd>Normal metabolizer: activity score 2. Intermediate: 1 or 1.5. Poor: 0 or 0.5. <sup class="c" data-ref="Amstutz2018" title="Source 11">11</sup></dd></div>
      <div><dt>Severe toxicity risk by variant (IPD meta-analysis)</dt><dd>Adjusted relative risk 4.40 for c.1679T&gt;G, 3.02 for c.2846A&gt;T, 2.85 for DPYD*2A and 1.59 for c.1236G&gt;A/HapB3. <sup class="c" data-ref="Meulendijks2015" title="Source 363">363</sup></dd></div>
      <div><dt>Genotype-guided dosing in practice</dt><dd>In 1103 Dutch patients, 8% carried a variant and got 25% or 50% reduced starting doses; severe toxicity was 39% in carriers vs 23% in wild-type patients. <sup class="c" data-ref="Henricks2018" title="Source 234">234</sup></dd></div></div>
      <div class="hook"><b>Exam hook</b>CPIC: activity score 1 → 50% starting-dose reduction (strong); activity score 0 → avoid fluoropyrimidines. A negative test does not rule out DPD deficiency.</div>`;
  }
  $$('[data-nud]').forEach(b=>b.addEventListener('click',()=>{as=b.dataset.nud;$$('[data-nud]').forEach(x=>x.setAttribute('aria-pressed',x===b));dStop&&dStop();dStop=animate(1800,p=>{dT=p;drawD()},()=>{dStop=null})}));
  drawD();

  /* ===== carriers per 100 ===== */
  const ic=$('#nuIcons');let pop='eu';
  function drawI(){const NI=vb(ic,'720 150','400 180');const n=pop==='eu'?7:5,cols=NI?20:25,rows=100/cols,sz=NI?16:20,gx=NI?19:27,gy=NI?24:32,x0=NI?14:24,y0=NI?16:6;let s='';
    for(let i=0;i<100;i++){const c=i%cols,r=Math.floor(i/cols),hit=i<n;s+=person(x0+c*gx+sz/2,y0+r*gy,sz,hit?'var(--brand)':'var(--line)')}
    const cap=pop==='eu'?['≈ 7 in 100 Europeans carry one of the','four main decreased-function variants']:['≈ 5 in 100 people of African ancestry','carry c.557A&gt;G'];
    if(NI)cap.forEach((l,k)=>s+=T(14,y0+rows*gy+12+k*13,l,'t-xs','fill:var(--ink)'));else s+=T(x0,y0+rows*gy+14,cap.join(' '),'t-xs','fill:var(--ink)');
    ic.innerHTML=s;
    $('#nuIconCap').innerHTML=pop==='eu'?`Carrier frequencies in Europeans: HapB3 (c.1129–5923C&gt;G) 4.1–4.8%, c.1905+1G&gt;A (DPYD*2A) 1–1.2%, c.2846A&gt;T 0.8–1.4%; about 7% carry at least one of the four. <sup class="c" data-ref="Amstutz2018" title="Source 11">11</sup>`:`In people of African ancestry, c.557A&gt;G has a carrier frequency of about 5%. <sup class="c" data-ref="Amstutz2018" title="Source 11">11</sup>`}
  $$('[data-nup]').forEach(b=>b.addEventListener('click',()=>{pop=b.dataset.nup;$$('[data-nup]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawI()}));
  drawI();

  /* ===== misunderstandings ===== */
  $('#nuFlips').innerHTML=NU_FLIPS.map((c,i)=>`<button class="nu-flip" data-nuf="${i}" aria-pressed="false"><span class="nu-k">${c.k} · ${'Myth'}</span><span class="nu-f">${c.f}</span><span class="nu-b">${c.b}</span></button>`).join('');
  $('#nuFlips').addEventListener('click',e=>{const b=e.target.closest('[data-nuf]');if(!b||e.target.closest('sup.c'))return;b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')!=='true')});
  const prevR=redraws.nursing;redraws.nursing=()=>{prevR&&prevR();drawD();drawI()};
};
/* =============== 6.1 History & people =============== */
const HI_Y0=1905,HI_Y1=2026,hiT=y=>(y-HI_Y0)/(HI_Y1-HI_Y0);
/* lanes: s surgery & pathology, g heredity & genes, c screening & endoscopy, d drugs, r guidelines */
const HI_LANE={s:['Surgery & pathology','var(--tumour)'],g:['Heredity & genes','var(--lymph)'],c:['Screening & endoscopy','var(--accent)'],d:['Drugs','var(--rx)'],r:['Guidelines','var(--gold)']};
const HI_EV=[
 {y:1908,l:'s',t:'Miles: abdominoperineal excision',txt:`W. Ernest Miles described abdominoperineal excision for carcinoma of the rectum and the terminal pelvic colon in The Lancet. A historical review dates his first radical operation to 1907; abdominoperineal resection became a gold standard for many years. <sup class="c" data-ref="Miles1908,Lirici2016" title="Source 329,367">329,367</sup>`},
 {y:1913,l:'g',t:'Warthin: Family G',txt:`Aldred Scott Warthin published "Heredity with reference to carcinoma", describing his "Family G" from cases seen since 1895, when the seamstress Pauline Gross told him her family history. Family G is now recognised as the first reported Lynch syndrome family; by 2005 it had 929 known descendants and a confirmed MSH2 splice-site mutation. <sup class="c" data-ref="Warthin1913,Campos2024,Douglas2005" title="Source 86,136,573">86,136,573</sup>`},
 {y:1925,l:'g',t:'Lockhart-Mummery: Cancer and heredity',txt:`P. Lockhart-Mummery published "Cancer and heredity" in The Lancet. <sup class="c" data-ref="LockhartMummery1925" title="Source 333">333</sup>`},
 {y:1932,l:'s',t:'Dukes classification',txt:`Cuthbert Dukes published his classification of cancer of the rectum, the basis of "Dukes stage". It was still used in later surgical series: Heald's 1986 total mesorectal excision results reported tumour-free survival by Dukes A, B and C. The picture above shows the stages as they are usually summarised (growth within the wall, through the wall, and to lymph nodes); the original paper was not read for this guide. <sup class="c" data-ref="Dukes1932,Heald1986" title="Source 142,230">142,230</sup>`},
 {y:1939,l:'g',t:'Familial adenomatosis',txt:`Lockhart-Mummery and Dukes reported on familial adenomatosis of the colon and rectum, the condition now called familial adenomatous polyposis (FAP). <sup class="c" data-ref="LockhartMummery1939,Nishisho1991" title="Source 334,405">334,405</sup>`},
 {y:1951,l:'g',t:'Gardner: polyposis',txt:`Eldon Gardner published a genetic and clinical study of intestinal polyposis as a predisposing factor for carcinoma of the colon and rectum. In 1953, Gardner and Richards described skin and soft-tissue lesions together with hereditary polyposis and osteomatosis, later known as Gardner syndrome. <sup class="c" data-ref="Gardner1951,Gardner1953,Nishisho1991" title="Source 194,195,405">194,195,405</sup>`},
 {y:1957,l:'d',t:'5-fluorouracil',txt:`Heidelberger and colleagues reported the fluorinated pyrimidines, including 5-fluorouracil, as a new class of tumour-inhibitory compounds. Fluorouracil remains the backbone of colorectal chemotherapy: see <a href="#chemo" data-go="chemo">Chemotherapy after surgery</a>. <sup class="c" data-ref="Heidelberger1957" title="Source 231">231</sup>`},
 {y:1966,l:'g',t:'Lynch: two kindreds',txt:`Henry Lynch and colleagues described two large Midwestern kindreds with hereditary cancer. The condition first called "cancer family syndrome" was later renamed Lynch syndrome in recognition of his work. <sup class="c" data-ref="Lynch1966,Campos2024" title="Source 86,343">86,343</sup>`},
 {y:1967,l:'c',t:'Greegor: occult blood',txt:`Greegor published "Diagnosis of large-bowel cancer in the asymptomatic patient", an early report on finding colorectal cancer before symptoms appear. <sup class="c" data-ref="Greegor1967" title="Source 197">197</sup>`},
 {y:1973,l:'c',t:'Colonoscopic polypectomy',txt:`Wolff and Shinya reported polypectomy through the fibreoptic colonoscope, removing neoplasms beyond the reach of the sigmoidoscope. <sup class="c" data-ref="Wolff1973NEJM,Wolff1973AnnSurg" title="Source 586,587">586,587</sup>`},
 {y:1975,l:'s',t:'Polyp-to-cancer sequence',txt:`Muto, Bussey and Morson presented evidence that most colorectal cancers evolve through a polyp-to-cancer sequence. Malignant potential rises with adenoma size, villous histology and degree of atypia, but most adenomas never become cancer. <sup class="c" data-ref="Muto1975" title="Source 385">385</sup>`},
 {y:1982,l:'s',t:'Heald: total mesorectal excision',txt:`Heald, Husband and Ryall found tumour foci in the mesorectum several centimetres beyond the visible tumour edge and proposed total excision of the mesorectum (TME). In 50 curative resections followed for over 2 years there was no pelvic or staple-line recurrence. In 1986 Heald reported 5-year survival of 87%, tumour-free survival of 94%, 87% and 58% for Dukes A, B and C, and permanent colostomy in 11%. TME is now the gold standard for rectal cancer surgery. <sup class="c" data-ref="Heald1982,Heald1986,Lirici2016" title="Source 229,230,329">229,230,329</sup>`},
 {y:1984,l:'g',t:'Boland & Troncale',txt:`Boland and Troncale described "familial colonic cancer without antecedent polyposis", the pattern later called hereditary non-polyposis colorectal cancer (HNPCC). <sup class="c" data-ref="Boland1984,Fishel1993" title="Source 62,185">62,185</sup>`},
 {y:1988,l:'g',t:'Vogelstein: genes accumulate',txt:`Vogelstein and colleagues showed four genetic alterations accumulating along with clinical tumour progression in 172 tumours: ras mutations in 9% of adenomas under 1 cm vs 58% over 1 cm, chromosome 18q loss in 47% of advanced adenomas and 73% of carcinomas, and 17p (TP53) loss in 75% of carcinomas. <sup class="c" data-ref="Vogelstein1988" title="Source 566">566</sup>`},
 {y:1990,l:'g',t:'Fearon–Vogelstein model',txt:`Fearon and Vogelstein proposed their genetic model of multistep colorectal tumorigenesis: activation of oncogenes plus inactivation of several tumour-suppressor genes, where the accumulation of changes matters more than their exact order <span class="ev est">Established</span>. The model is animated in <a href="#sequence" data-go="sequence">From polyp to cancer</a>. <sup class="c" data-ref="Fearon1990" title="Source 181">181</sup>`},
 {y:1990.4,l:'d',t:'Adjuvant 5-FU + levamisole',txt:`Adjuvant fluorouracil plus levamisole for resected stage C (node-positive) colon cancer cut recurrence by 41% and overall deaths by 33%; the authors concluded it should be standard treatment for stage C colon cancer. <sup class="c" data-ref="Moertel1990" title="Source 371">371</sup>`},
 {y:1991,l:'g',t:'APC gene identified',txt:`The APC gene on chromosome 5q21 was identified, and germline APC mutations were shown to cause both FAP and Gardner syndrome. APC mutations occur early: in 63% of adenomas and 60% of carcinomas, including adenomas as small as 0.5 cm. <sup class="c" data-ref="Kinzler1991,Groden1991,Nishisho1991,Powell1992" title="Source 199,284,405,437">199,284,405,437</sup>`},
 {y:1992,l:'d',t:'Leucovorin + 5-FU',txt:`A meta-analysis of nine trials showed that leucovorin doubled the tumour response to fluorouracil in advanced colorectal cancer (23% vs 11%), with no detectable difference in overall survival. <sup class="c" data-ref="ACCMAP1992" title="Source 3">3</sup>`},
 {y:1993,l:'g',t:'MSH2 and microsatellite instability',txt:`A predisposition locus was mapped to chromosome 2, familial tumours showed widespread microsatellite alterations (also in 13% of sporadic cancers), and MSH2 was identified as the first HNPCC mismatch-repair gene. MLH1 followed in 1994. Separately, about 12% of colorectal carcinomas carried a "mutator" signature, and microsatellite instability went with proximal location and longer survival. <sup class="c" data-ref="Peltomaki1993,Aaltonen1993,Fishel1993,Leach1993,Bronner1994,Ionov1993,Thibodeau1993" title="Source 1,78,185,254,309,425,529">1,78,185,254,309,425,529</sup>`},
 {y:1993.4,l:'c',t:'Minnesota trial & National Polyp Study',txt:`In the Minnesota trial (46,551 people aged 50–80), annual guaiac faecal occult blood testing with rehydration cut 13-year colorectal cancer mortality by 33% (5.88 vs 8.83 per 1,000). In the National Polyp Study, colorectal cancer incidence after adenoma removal was 76–90% lower than in three reference groups. <sup class="c" data-ref="Mandel1993,Winawer1993" title="Source 345,583">345,583</sup>`},
 {y:1996,l:'c',t:'Nottingham & Funen trials',txt:`Biennial guaiac testing cut colorectal cancer mortality by 15% in Nottingham (about 150,000 people; OR 0.85) and gave a mortality ratio of 0.82 in Funen, Denmark (61,933 people). At 19.5 years, Nottingham's reduction was 13%, with no significant fall in incidence. <sup class="c" data-ref="Hardcastle1996,Kronborg1996,Scholefield2012" title="Source 224,297,478">224,297,478</sup>`},
 {y:2004,l:'d',t:'MOSAIC, bevacizumab, cetuximab',txt:`MOSAIC: adding oxaliplatin to 5-FU/leucovorin after resection of stage II–III colon cancer improved 3-year disease-free survival (78.2% vs 72.9%; HR 0.77). Bevacizumab plus IFL raised median survival in metastatic colorectal cancer from 15.6 to 20.3 months (HR 0.66). In BOND, cetuximab plus irinotecan gave a 22.9% response rate in irinotecan-refractory disease vs 10.8% with cetuximab alone. <sup class="c" data-ref="Andre2004,Hurwitz2004,Cunningham2004" title="Source 12,118,245">12,118,245</sup>`},
 {y:2012,l:'c',t:'Polypectomy prevents deaths',txt:`Long-term National Polyp Study follow-up: after adenoma removal there were 12 colorectal cancer deaths against 25.4 expected (standardised incidence-based mortality ratio 0.47), suggesting a 53% reduction. In 2013, Minnesota's 30-year results showed mortality relative risks of 0.68 (annual) and 0.78 (biennial). <sup class="c" data-ref="Zauber2012,Shaukat2013" title="Source 486,598">486,598</sup>`},
 {y:2015,l:'d',t:'PD-1 blockade in dMMR',txt:`Pembrolizumab achieved a 40% immune-related response rate in mismatch-repair-deficient colorectal cancer against 0% in mismatch-repair-proficient cancer. The same year, six expression-based classifications converged on four consensus molecular subtypes (CMS1–4). <sup class="c" data-ref="Le2015,Guinney2015" title="Source 205,307">205,307</sup>`},
 {y:2017,l:'s',t:'AJCC 8th edition TNM',txt:`The AJCC 8th edition, published in 2017, is the current reference TNM system for colon and rectum. TNM is preferred over Dukes because it records depth (T), the number of positive nodes (N) and metastatic sites (M) separately; the main change from the 7th edition was a new M1c category for peritoneal metastasis. Also in 2017, a SEER analysis showed that people born around 1990 had about double the colon cancer risk and four times the rectal cancer risk of those born around 1950. <sup class="c" data-ref="Amin2017AJCC,Tong2018,Gunderson2010,Siegel2017" title="Source 10,206,489,537">10,206,489,537</sup>`},
 {y:2018,l:'r',t:'ACS: screen from 45',txt:`The American Cancer Society lowered its recommended starting age for average-risk screening to 45. <sup class="c" data-ref="Wolf2018" title="Source 584">584</sup>`},
 {y:2020,l:'d',t:'KEYNOTE-177',txt:`First-line pembrolizumab against chemotherapy in MSI-H/dMMR metastatic colorectal cancer doubled median progression-free survival (16.5 vs 8.2 months; HR 0.60), with grade 3 or worse treatment-related adverse events in 22% vs 66%. <sup class="c" data-ref="Andre2020" title="Source 16">16</sup>`},
 {y:2021,l:'r',t:'USPSTF: 45 to 49 added',txt:`The US Preventive Services Task Force recommended screening at 50–75 (grade A) and added ages 45–49 (grade B). <sup class="c" data-ref="USPSTF2021" title="Source 545">545</sup>`},
 {y:2022,l:'d',t:'Dostarlimab in dMMR rectal cancer',txt:`Dostarlimab alone in 12 patients with mismatch-repair-deficient locally advanced rectal cancer gave a 100% clinical complete response; none needed chemoradiotherapy or surgery during 6–25 months of follow-up <span class="ev early">Early evidence: 12 patients</span>. See <a href="#rectal" data-go="rectal">Rectal cancer pathway</a>. <sup class="c" data-ref="Cercek2022" title="Source 91">91</sup>`},
 {y:2026,l:'r',t:'ACS 2026 update',txt:`The ACS reaffirmed screening from 45 through 75, added next-generation multitarget stool DNA and multitarget stool RNA tests as preferred stool options every 3 years, and recommended blood-based tests only for people who decline the preferred tests. The same year's statistics report colorectal cancer as the leading cause of cancer death in US adults under 50. <sup class="c" data-ref="Wolf2026,Siegel2026CRC" title="Source 495,585">495,585</sup>`}
];
const HI_STEPS=[
 {from:0,at:hiT(1908),k:'1908–1939',t:'Surgeons & pathologists',
  pt:`A hundred years ago the main treatment was an operation, and pathologists began sorting cancers by how far they had spread. <sup class="c" data-ref="Miles1908,Dukes1932" title="Source 142,367">142,367</sup>`,
  hook:`Dukes (1932) gave the first staging of rectal cancer; Heald's 1986 series still reported survival by Dukes stage. <sup class="c" data-ref="Dukes1932,Heald1986" title="Source 142,230">142,230</sup>`},
 {from:hiT(1945),at:hiT(1951),k:'1951–1967',t:'Families & a first drug',
  pt:`Doctors noticed that bowel cancer runs in some families long before anyone knew about genes. <sup class="c" data-ref="Warthin1913,Lynch1966,Campos2024" title="Source 86,343,573">86,343,573</sup>`,
  hook:`Gardner syndrome = hereditary polyposis + osteomas + skin and soft-tissue lesions; germline APC mutations cause both FAP and Gardner syndrome. <sup class="c" data-ref="Gardner1953,Nishisho1991" title="Source 195,405">195,405</sup>`},
 {from:hiT(1970),at:hiT(1975),k:'1973–1986',t:'Polyps, scopes & TME',
  pt:`Most bowel cancers grow slowly from small growths called polyps. Removing polyps during a colonoscopy can stop cancer before it starts. <sup class="c" data-ref="Muto1975,Winawer1993" title="Source 385,583">385,583</sup>`,
  hook:`Muto, Bussey and Morson (1975): the polyp-to-cancer sequence. Heald (1982): total mesorectal excision. <sup class="c" data-ref="Muto1975,Heald1982" title="Source 229,385">229,385</sup>`},
 {from:hiT(1987.5),at:hiT(1991),k:'1988–1996',t:'Genes & trials',
  pt:`Scientists found the genes that go wrong, and trials showed that a simple stool test could save lives. <sup class="c" data-ref="Fearon1990,Mandel1993" title="Source 181,345">181,345</sup>`,
  hook:`Minnesota trial: annual guaiac FOBT cut CRC mortality by 33% at 13 years. <sup class="c" data-ref="Mandel1993" title="Source 345">345</sup>`},
 {from:hiT(2000),at:hiT(2004),k:'2004–2015',t:'Drugs & prevention',
  pt:`New drugs added to chemotherapy helped people with advanced bowel cancer live longer. <sup class="c" data-ref="Hurwitz2004" title="Source 245">245</sup>`,
  hook:`MOSAIC (2004): FOLFOX after surgery, 3-year DFS 78.2% vs 72.9%. <sup class="c" data-ref="Andre2004" title="Source 12">12</sup>`},
 {from:hiT(2016.5),at:hiT(2020),k:'2017–2026',t:'Immunotherapy & age 45',
  pt:`In the US, adults at average risk are advised to start screening at age 45. <sup class="c" data-ref="USPSTF2021,Wolf2026" title="Source 545,585">545,585</sup>`,
  hook:`KEYNOTE-177 (2020): first-line pembrolizumab for MSI-H/dMMR metastatic CRC; median PFS 16.5 vs 8.2 months. <sup class="c" data-ref="Andre2020" title="Source 16">16</sup>`}
];

inits.history=()=>{
  const svg=$('#hiSvg'),rg=$('#hiT');let pick=null,setSt=()=>{};
  const T=(x,y,s,c='t-sm',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${s}</text>`;
  const Ln=(x1,y1,x2,y2,st)=>`<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" style="${st}"/>`;
  const head=(x,y,s)=>T(x,y,s,'t-sm','fill:var(--brand);font-weight:600');
  const yearOf=t=>lerp(HI_Y0,HI_Y1,t);
  const curEv=Y=>{let i=-1;HI_EV.forEach((e,k)=>{if(e.y<=Y+1e-6)i=k});return i};

  /* the era picture: a teaching drawing that changes with the year */
  function picture(N,Y,x,y,w,h){let s='';
    if(Y<1932){s+=head(x,y,'1908 · AN OPERATION, NO STAGING YET');
      const C=colon(x+20,y+18,N?.62:.56,{w:14});s+=C.svg;
      let d='';for(let i=0;i<=30;i++){const q=C.at(lerp(.8,1,i/30));d+=(i?'L':'M')+f1(q[0])+' '+f1(q[1])}
      s+=`<path d="${d}" style="fill:none;stroke:var(--tumour);stroke-width:16;stroke-linecap:round;opacity:.55"/>`;
      const q=C.at(.96);s+=T(q[0]+22,q[1]+4,'rectum and end of the','t-xs','fill:var(--ink)')+T(q[0]+22,q[1]+16,'pelvic colon removed','t-xs','fill:var(--ink)');
      return s}
    if(Y<1975){s+=head(x,y,'1932 · DUKES STAGES (AS USUALLY SUMMARISED)');
      const W=wall(x,y+34,w*.78,{h:h-52,labels:false});s+=W.svg;const yy=W.y;
      const st=[['A','within the wall',yy.muscularis+ (yy.subserosa-yy.muscularis)*.5],['B','through the wall',yy.fat+ (W.y.bottom-yy.fat)*.4],['C','+ lymph nodes',yy.fat+(W.y.bottom-yy.fat)*.4]];
      st.forEach(([l,txt,dep],i)=>{const cx=x+w*.78*(i+.5)/3;
        s+=`<path d="M${f1(cx-18)} ${f1(yy.mucosa)}Q${f1(cx-16)} ${f1(dep)} ${f1(cx)} ${f1(dep)}Q${f1(cx+16)} ${f1(dep)} ${f1(cx+18)} ${f1(yy.mucosa)}Z" style="fill:var(--tumour);opacity:.85"/>`;
        if(i===2)s+=node(cx+30,W.y.bottom-10,8,1);
        s+=T(cx,yy.mucosa-6,'Dukes '+l,'t-lbl t-mid','fill:var(--tumour)')+T(cx,W.y.bottom+12,txt,'t-xs t-mid','fill:var(--ink)')});
      s+=T(x+w*.78+6,yy.mucosa+10,'mucosa','t-xs')+T(x+w*.78+6,yy.muscularis+12,'muscle','t-xs')+T(x+w*.78+6,yy.fat+10,'fat','t-xs');
      return s}
    const gen=Y>=1988,tnm=Y>=2017;
    if(!tnm){s+=head(x,y,gen?'1988–1991 · THE SEQUENCE AND ITS GENES':'1975 · POLYP TO CANCER');
      const base=y+h*.62;s+=Ln(x,base,x+w,base,'stroke:var(--mucosa-line);stroke-width:2');
      const G=[['APC','63% adenomas'],['KRAS','ras 9%→58%'],['18q loss','47% adv. ad.'],['TP53/17p','75% cancers']];
      [0,.4,.75,1].forEach((k,i)=>{const cx=x+w*(i+.5)/4;s+=polyp(cx,base,N?44:40,k,{seed:3+i});
        s+=T(cx,base+30,['small adenoma','large adenoma','high-grade','carcinoma'][i],'t-xs t-mid','fill:var(--ink)');
        if(gen){s+=T(cx,y+20,G[i][0],'t-lbl t-mid','fill:var(--lymph)')+T(cx,y+34,G[i][1],'t-xs t-mid')}
        if(i<3)s+=`<path d="M${f1(cx+w/8-8)} ${f1(base-16)}l12 0" style="stroke:var(--muted);stroke-width:1.6" marker-end="url(#hiArr)"/>`});
      if(!gen)s+=T(x,y+24,'most adenomas never become cancer','t-xs','fill:var(--ink)');
      return s}
    s+=head(x,y,'2017 · AJCC 8TH EDITION: T, N AND M');
    const W=wall(x,y+34,w*.6,{h:h-52,labels:false});s+=W.svg;const yy=W.y;
    const T4=[['T1',yy.submucosa+(yy.muscularis-yy.submucosa)*.6],['T2',yy.muscularis+(yy.subserosa-yy.muscularis)*.6],['T3',yy.subserosa+(yy.serosa-yy.subserosa)*.7],['T4',yy.fat+6]];
    T4.forEach(([l,dep],i)=>{const cx=x+w*.6*(i+.5)/4;s+=`<path d="M${f1(cx-12)} ${f1(yy.mucosa)}Q${f1(cx-10)} ${f1(dep)} ${f1(cx)} ${f1(dep)}Q${f1(cx+10)} ${f1(dep)} ${f1(cx+12)} ${f1(yy.mucosa)}Z" style="fill:var(--tumour);opacity:.85"/>`+T(cx,yy.mucosa-6,l,'t-lbl t-mid','fill:var(--tumour)')});
    const nx=x+w*.68;s+=node(nx+10,y+50,9,.7)+T(nx+26,y+54,'N: how many nodes','t-xs','fill:var(--ink)');
    s+=liver(nx+40,y+h-36,.42,2,5)+T(nx+26,y+h-6,'M: spread to organs','t-xs','fill:var(--ink)');
    return s}
  /* US survival and death rate */
  function chart(N,Y,x,y,w,h){let s='';const X=v=>x+w*(v-1970)/(2026-1970),V=v=>y+h-h*v/100;
    s+=head(x,y-10,'US · 5-YEAR SURVIVAL & DEATH RATE');
    [0,50,100].forEach(v=>s+=Ln(x,V(v),x+w,V(v),v?'stroke:var(--line);stroke-dasharray:2 4':'stroke:var(--line)')+T(x-4,V(v)+4,v+'%','t-xs t-end'));
    [1970,1990,2010].forEach(v=>s+=T(X(v),y+h+13,v,'t-xs t-mid'));
    if(Y<1970){s+=T(x+w/2,y+h/2,'series start in 1970','t-xs t-mid');return s}
    const line=(pts,col,dash)=>{const P=[];for(let i=0;i<pts.length;i++){const q=pts[i];if(q[0]<=Y)P.push(q);else{if(i>0&&pts[i-1][0]<=Y){const a=pts[i-1];P.push([Y,lerp(a[1],q[1],(Y-a[0])/(q[0]-a[0]))])}break}}
      if(P.length<2)return '';return `<path d="${P.map((q,i)=>(i?'L':'M')+f1(X(q[0]))+' '+f1(V(q[1]))).join('')}" style="fill:none;stroke:${col};stroke-width:2.4;${dash?'stroke-dasharray:5 3':''}"/>`};
    const sv=[[1976,50],[1996,61],[2018,65]],mr=[[1970,29.1],[2023,12.7]];
    s+=line(sv,'var(--good)')+line(mr,'var(--tumour)',1);
    sv.forEach(q=>{if(q[0]<=Y)s+=`<circle cx="${f1(X(q[0]))}" cy="${f1(V(q[1]))}" r="3.5" style="fill:var(--good)"/>`+T(X(q[0]),V(q[1])-7,q[1]+'%','t-xs t-mid','fill:var(--good)')});
    s+=T(X(1970),V(29.1)-6,'29.1','t-xs','fill:var(--tumour)');if(Y>=2023)s+=T(X(2023),V(12.7)-6,'12.7','t-xs t-end','fill:var(--tumour)');
    s+=T(x+w,y+h+26,'— survival  - - deaths per 100,000','t-xs t-end');
    return s}
  function lanes(N,Y,x,y,w,ci){let s='';const X=v=>x+w*(v-HI_Y0)/(HI_Y1-HI_Y0),keys=Object.keys(HI_LANE),lh=N?24:22;
    keys.forEach((k,i)=>{const ly=y+i*lh;s+=Ln(x,ly,x+w,ly,'stroke:var(--line)');if(!N)s+=T(x-8,ly+3,HI_LANE[k][0],'t-xs t-end')});
    [1910,1930,1950,1970,1990,2010].forEach(v=>s+=Ln(X(v),y-10,X(v),y+lh*4+10,'stroke:var(--line);stroke-dasharray:2 4')+T(X(v),y+lh*4+24,v,'t-xs t-mid'));
    HI_EV.forEach((e,i)=>{const ly=y+keys.indexOf(e.l)*lh,on=i===ci,past=e.y<=Y+1e-6,col=HI_LANE[e.l][1];
      s+=`<circle cx="${f1(X(e.y))}" cy="${ly}" r="${on?7:4.2}" style="fill:${past?col:'var(--panel)'};stroke:${col};stroke-width:${on?2.5:1.4}"/>`});
    s+=Ln(X(Y),y-16,X(Y),y+lh*4+12,'stroke:var(--ink);stroke-width:1.6');
    s+=T(X(Y),y-20,Math.floor(Y),'t-lbl t-mid','fill:var(--ink)');
    if(ci>=0){const e=HI_EV[ci],ex=X(e.y),ly=y+keys.indexOf(e.l)*lh,anchor=ex>x+w*.62?'t-end':ex<x+w*.3?'':'t-mid';
      s+=T(ex+(anchor==='t-end'?-10:anchor===''?10:0),y+lh*4+42,`${Math.floor(e.y)} · ${e.t}`,'t-lbl '+anchor,`fill:${HI_LANE[e.l][1]}`)}
    if(N)s+=T(x,y+lh*4+60,'lanes: surgery · genes · screening · drugs · guidelines','t-xs');
    return s}
  function draw(t){const N=vb(svg,'720 400','400 600'),Y=yearOf(t);let ci=curEv(Y);if(pick!=null&&HI_EV[pick].y<=Y+1e-6&&Math.abs(HI_EV[pick].y-Y)<1)ci=pick;
    let s=`<defs>${marker('hiArr','var(--muted)')}</defs>`;
    if(N){s+=picture(N,Y,20,26,360,190)+chart(N,Y,50,262,320,110)+lanes(N,Y,20,442,360,ci)}
    else{s+=picture(N,Y,20,26,380,180)+chart(N,Y,462,40,236,140)+lanes(N,Y,170,250,530,ci)}
    svg.innerHTML=s;
    const ph=phaseOf(HI_STEPS,t);setSt(ph);
    const e=ci>=0?HI_EV[ci]:null,S=HI_STEPS[ph];
    $('#hiNote').innerHTML=noteHTML(e?{k:Math.floor(e.y)+' · '+HI_LANE[e.l][0],t:e.t,txt:e.txt,pt:S.pt,hook:S.hook}:{k:'1905',t:'Before the timeline',txt:'Press Play or pick a year.',pt:S.pt,hook:S.hook});
    $$('#hiYears .tag').forEach((b,i)=>b.setAttribute('aria-pressed',i===ci));
    const past=HI_EV.filter(x=>x.y<=Y+1e-6).length;
    $('#hiRead').innerHTML=`<span>year <b>${Math.floor(Y)}</b></span><span>milestones so far <b>${past} of ${HI_EV.length}</b></span>${Y>=1976?`<span>US 5-year survival <b>${Y>=2018?65:Y>=1996?61:50}%</b> (latest published era)</span>`:''}`}
  $('#hiYears').innerHTML=HI_EV.map((e,i)=>`<button class="tag" data-hi-ev="${i}" aria-pressed="false"><b style="color:${HI_LANE[e.l][1]}">${Math.floor(e.y)}</b> ${e.t}</button>`).join('');
  const stop=playWire(rg,$('#hiPlay'),t=>{pick=null;draw(t)},40000,'Replay','history');
  setSt=stepWire($('#hiSteps'),HI_STEPS,rg,t=>{pick=null;draw(t)},stop);
  $('#hiYears').addEventListener('click',ev=>{const b=ev.target.closest('[data-hi-ev]');if(!b)return;stop();pick=+b.dataset.hiEv;const t=hiT(HI_EV[pick].y)+1e-4;rg.value=t;draw(t)});
  draw(+rg.value);
};
/* =============== 6.2 flashcards & mnemonics =============== */
const CR_PARTN={1:"Part 1 · The disease",2:"Part 2 · Screening",3:"Part 3 · Diagnosis & staging",4:"Part 4 · Treatment",5:"Part 5 · Living with CRC",6:"Part 6 · History"};
const CR_FC=[
 /* ---- Part 1: the disease ---- */
 [1,`Where does colorectal cancer rank worldwide?`,`Third most diagnosed cancer (9.6% of new cancers) and second leading cause of cancer death (9.3%) in GLOBOCAN 2022 <sup class="c" data-ref="Bray2024" title="Source 71">71</sup>. GLOBOCAN 2024 counted 2,041,007 new cases and 917,895 deaths <sup class="c" data-ref="Sung2026" title="Source 519">519</sup>.`],
 [1,`What is the US lifetime risk of colorectal cancer?`,`4.1% (about 1 in 24) for males and 3.8% (about 1 in 26) for females, for 2018–2021 <sup class="c" data-ref="Siegel2025" title="Source 493">493</sup>.`],
 [1,`Where does colorectal cancer rank as a cause of cancer death in US adults under 50?`,`First. Across all ages it is the second most common cause of cancer death in the United States <sup class="c" data-ref="Siegel2026CRC" title="Source 495">495</sup>.`],
 [1,`What is the birth-cohort effect in early-onset colorectal cancer?`,`Risk tracks when you were born. Compared with people born around 1950, those born around 1990 have about double the colon cancer risk (IRR 2.40) and about four times the rectal cancer risk (IRR 4.32) <sup class="c" data-ref="Siegel2017" title="Source 489">489</sup>.`],
 [1,`Which part of the bowel drives the rise in early-onset cancer?`,`The left side. From 1998 to 2022, at ages 20–49, sigmoid cancer rose from 2.1 to 3.7 and rectal cancer from 3.6 to 6.6 per 100,000, compared with a 26% rise in proximal tumours <sup class="c" data-ref="Siegel2026CRC" title="Source 495">495</sup>.`],
 [1,`How often does the colonic lining renew itself?`,`Every 4–5 days <sup class="c" data-ref="VanDerFlier2009" title="Source 551">551</sup>. The intestinal epithelium is the most rapidly self-renewing tissue in adult mammals <sup class="c" data-ref="Barker2007" title="Source 42">42</sup>.`],
 [1,`Which marker identifies the crypt-base stem cell?`,`Lgr5, a Wnt target gene. In adult mice a single Lgr5+ cell generated all epithelial lineages over 60 days <sup class="c" data-ref="Barker2007" title="Source 42">42</sup>.`],
 [1,`What does the APC destruction complex do to β-catenin?`,`APC and Axin scaffold GSK-3 and CK1, which phosphorylate β-catenin; β-TrCP then ubiquitinates it and the proteasome degrades it <sup class="c" data-ref="Stamos2013" title="Source 510">510</sup>.`],
 [1,`What happens to β-catenin when APC is lost?`,`It accumulates and binds Tcf-4, forming a constitutively active transcription complex in the nucleus <sup class="c" data-ref="Korinek1997" title="Source 293">293</sup>. Tumours with intact APC can carry activating β-catenin mutations instead <sup class="c" data-ref="Morin1997" title="Source 378">378</sup>.`],
 [1,`In the Fearon–Vogelstein model, which matters more: the order of mutations or their accumulation?`,`Their accumulation. Cancer results from activated oncogenes plus inactivated tumour-suppressor genes <sup class="c" data-ref="Fearon1990" title="Source 181">181</sup>.`],
 [1,`How common are ras mutations in small vs large adenomas?`,`9% of adenomas under 1 cm, 58% of adenomas over 1 cm and 47% of carcinomas; chromosome 18q loss reached 73% of carcinomas <sup class="c" data-ref="Vogelstein1988" title="Source 566">566</sup>.`],
 [1,`How long does a large adenoma take to become an advanced cancer?`,`About 17 years, by comparative lesion sequencing; cells within that cancer then need under 2 years to gain the ability to metastasise <sup class="c" data-ref="Jones2008" title="Source 270">270</sup>.`],
 [1,`Which serrated polyps are cancer precursors?`,`Sessile serrated lesions and traditional serrated adenomas; hyperplastic polyps are the third, mostly harmless, group in WHO 2019 <sup class="c" data-ref="Crockett2019" title="Source 116">116</sup>.`],
 [1,`What are the three pathways of genomic instability in colorectal cancer?`,`Chromosomal instability (CIN), microsatellite instability (MSI) and the CpG island methylator phenotype (CIMP). Most colorectal cancers arise through CIN <sup class="c" data-ref="Pino2010" title="Source 432">432</sup>.`],
 [1,`How much does one affected first-degree relative raise risk?`,`Roughly doubles it: pooled RR 2.24 with one or more affected first-degree relatives and 3.97 with two or more <sup class="c" data-ref="Butterworth2006" title="Source 85">85</sup>.`],
 [1,`How does IARC classify processed and red meat?`,`Processed meat is carcinogenic to humans (Group 1); red meat is probably carcinogenic (Group 2A) <sup class="c" data-ref="Bouvard2015" title="Source 70">70</sup>.`],
 [1,`What did ASPREE show about aspirin in people aged 70 and older?`,`100 mg a day did not reduce cancer and was linked to more cancer deaths (HR 1.31) <sup class="c" data-ref="McNeil2018" title="Source 355">355</sup>, and to more metastatic or stage 4 cancer at diagnosis <sup class="c" data-ref="McNeil2021" title="Source 356">356</sup>.`],
 [1,`Which genes cause Lynch syndrome?`,`Germline variants in MLH1, MSH2, MSH6 or PMS2, or deletions in EPCAM <sup class="c" data-ref="Syngal2015" title="Source 520">520</sup>. EPCAM deletions silence the neighbouring MSH2 by methylation <sup class="c" data-ref="Ligtenberg2009" title="Source 327">327</sup>.`],
 [1,`How common is Lynch syndrome?`,`About 1 in 279 people carry a mismatch-repair gene variant <sup class="c" data-ref="Win2017" title="Source 582">582</sup>, and about 2.8% (1 in 35) of people with colorectal cancer have Lynch syndrome <sup class="c" data-ref="Hampel2008" title="Source 221">221</sup>.`],
 [1,`Which Lynch genes carry the highest colorectal cancer risk to age 75?`,`MLH1 (48.3% women, 57.1% men) and MSH2 (46.6%, 51.4%). MSH6 is moderate (20.3%, 18.2%) and PMS2 low (10.4%) <sup class="c" data-ref="DominguezValentin2020" title="Source 133">133</sup>.`],
 [1,`What causes FAP, and what is the cancer risk without treatment?`,`Germline APC variants on chromosome 5q21, inherited autosomal dominantly; hundreds of adenomas develop <sup class="c" data-ref="Galiatsatos2006" title="Source 191">191</sup>. Without prophylactic treatment colorectal cancer risk reaches "virtually 100% by 60 years" <sup class="c" data-ref="Zaffaroni2024" title="Source 597">597</sup>.`],
 [1,`What is colibactin, and why is it linked to early-onset cancer?`,`A genotoxin made by pks+ E. coli that leaves a mutational signature in colorectal genomes <sup class="c" data-ref="PleguezuelosManzano2020" title="Source 434">434</sup>. Its signatures were 3.3 times more common in people diagnosed before 40 than after 70 <span class="ev early">Early evidence</span> <sup class="c" data-ref="DiazGay2025" title="Source 129">129</sup>.`],
 /* ---- Part 2: screening ---- */
 [2,`What are the USPSTF 2021 screening grades by age?`,`45–49: B. 50–75: A. 76–85: C, offered selectively <sup class="c" data-ref="USPSTF2021" title="Source 545">545</sup>.`],
 [2,`Which guideline is the outlier on starting age?`,`ACP 2023 starts screening at 50, uses FIT every 2 years and advises against stool DNA, CT colonography and blood tests <sup class="c" data-ref="Qaseem2023" title="Source 440">440</sup>.`],
 [2,`How accurate is a single FIT for colorectal cancer?`,`Pooled sensitivity 0.79 and specificity 0.94; one sample performed as well as several <sup class="c" data-ref="Lee2014" title="Source 311">311</sup>.`],
 [2,`Why must FIT be repeated?`,`Its one-time sensitivity for advanced adenomas is only about 0.40, even at 10 µg/g <sup class="c" data-ref="Imperiale2019" title="Source 251">251</sup>.`],
 [2,`What does England's 120 µg/g FIT threshold trade away?`,`The pilot estimated it finds 47.8% of cancers and refers 2.1% of participants; at 20 µg/g it would find 82.2% but refer 7.8% <sup class="c" data-ref="Li2021" title="Source 321">321</sup>.`],
 [2,`Multitarget stool DNA vs FIT: sensitivity and specificity?`,`Cancer sensitivity 92.3% vs 73.8%; specificity 86.6% vs 94.9% <sup class="c" data-ref="Imperiale2014" title="Source 250">250</sup>.`],
 [2,`What did the Shield cfDNA blood test detect in ECLIPSE?`,`83.1% of colorectal cancers but only 13.2% of advanced precancerous lesions, with 89.6% specificity for advanced neoplasia <sup class="c" data-ref="Chung2024" title="Source 102">102</sup>.`],
 [2,`What did NordICC show?`,`An invitation to one colonoscopy (42% attended) lowered 10-year colorectal cancer risk (RR 0.82) but not significantly the risk of death (RR 0.90) <sup class="c" data-ref="Bretthauer2022" title="Source 77">77</sup>.`],
 [2,`What is the adenoma detection rate, and why does it matter?`,`The share of screening colonoscopies finding at least one adenoma. Each 1% rise is linked to a 3% lower interval-cancer risk <sup class="c" data-ref="Corley2014" title="Source 109">109</sup>.`],
 [2,`What are the 2024 ACG/ASGE colonoscopy quality targets?`,`Screening ADR ≥35% (≥40% men, ≥30% women), caecal intubation ≥95%, adequate prep ≥90% and average withdrawal time ≥8 minutes <sup class="c" data-ref="Rex2024" title="Source 451">451</sup>.`],
 [2,`How often does screening colonoscopy cause serious harm?`,`Perforation about 3.1 and major bleeding about 14.6 per 10,000 procedures <sup class="c" data-ref="Lin2021" title="Source 328">328</sup>.`],
 [2,`How long can colonoscopy wait after a positive FIT?`,`2–9 months carried no excess risk compared with 8–30 days; at 10–12 months cancer was more likely (OR 1.48) and beyond 12 months more so (OR 2.25) <sup class="c" data-ref="Corley2017" title="Source 110">110</sup>.`],
 [2,`When is the next colonoscopy after 1–2 tubular adenomas under 10 mm?`,`7–10 years. An adenoma ≥10 mm means 3 years; piecemeal resection of a lesion ≥20 mm means 6 months <sup class="c" data-ref="Gupta2020" title="Source 209">209</sup>.`],
 [2,`When should someone whose parent had colorectal cancer at 52 start screening?`,`USMSTF 2017: colonoscopy every 5 years from 40, or 10 years before the relative's diagnosis, whichever is earlier (first-degree relative diagnosed before 60) <sup class="c" data-ref="Rex2017" title="Source 450">450</sup>.`],
 /* ---- Part 3: diagnosis & staging ---- */
 [3,`What are the commonest presenting features of colorectal cancer under 50?`,`Haematochezia (45%), abdominal pain (40%) and altered bowel habit (27%); haematochezia carries at least a 5-fold risk <sup class="c" data-ref="Demb2024" title="Source 125">125</sup>.`],
 [3,`What FIT threshold does UK guidance use for symptomatic patients?`,`fHb ≥10 µg Hb/g selects patients for urgent referral, but no one should be excluded from referral on FIT alone <sup class="c" data-ref="Monahan2022" title="Source 375">375</sup>.`],
 [3,`How often is colorectal cancer diagnosed as an emergency in England, and with what outcome?`,`26% of cases (2006–2008), with 1-year relative survival of 50% vs 98% for screen-detected cancer <sup class="c" data-ref="EllissBrookes2012" title="Source 148">148</sup>.`],
 [3,`How common is a synchronous second colorectal cancer?`,`3.9% (about 1 in 25); in a third the tumours were in different surgical segments, so the whole colon should be examined <sup class="c" data-ref="Mulder2011" title="Source 384">384</sup>.`],
 [3,`What does an MRI-involved circumferential margin mean in MERCURY?`,`Tumour ≤1 mm from the mesorectal fascia. It predicted worse 5-year survival (HR 1.97) and more local recurrence (HR 3.50) <sup class="c" data-ref="Taylor2014" title="Source 523">523</sup>.`],
 [3,`Is CEA a screening test?`,`No. It is "of little use in detecting early colorectal cancer" <sup class="c" data-ref="Duffy2001" title="Source 141">141</sup>, but is used before surgery for prognosis and planning and serially for surveillance <sup class="c" data-ref="Locker2006" title="Source 332">332</sup>.`],
 [3,`Define T1, T2, T3, T4a and T4b.`,`T1 submucosa; T2 muscularis propria; T3 through the muscularis propria into pericolorectal tissue; T4a visceral peritoneum; T4b other organs or structures <sup class="c" data-ref="Amin2017AJCC,Tong2018" title="Source 10,537">10,537</sup>.`],
 [3,`Define N1a, N1b, N1c, N2a and N2b.`,`N1a 1 node; N1b 2–3 nodes; N1c tumour deposits with no positive nodes; N2a 4–6 nodes; N2b 7 or more <sup class="c" data-ref="Amin2017AJCC,Tong2018" title="Source 10,537">10,537</sup>.`],
 [3,`What was new in AJCC 8th edition M staging?`,`M1c for peritoneal metastasis, giving stage IVC; in the 7th edition peritoneal disease was part of M1b <sup class="c" data-ref="Tong2018" title="Source 537">537</sup>.`],
 [3,`What is the stage III "survival paradox"?`,`Stage IIIA did better than stage IIB in SEER (83.4% vs 72.2% 5-year survival), partly because stage III patients got chemotherapy <sup class="c" data-ref="OConnell2004" title="Source 412">412</sup>.`],
 [3,`How many lymph nodes should be examined?`,`At least 12. Fewer than 12 counts as a high-risk feature in stage II colon cancer <sup class="c" data-ref="Baxter2022,Chang2007" title="Source 48,97">48,97</sup>.`],
 [3,`What is US 5-year relative survival by stage?`,`Localized 91%, regional 74%, distant 15% (diagnosed 2015–2021). These are population statistics, not individual predictions <sup class="c" data-ref="Siegel2026" title="Source 494">494</sup>.`],
 [3,`An MLH1-deficient tumour carries BRAF V600E. What does it suggest?`,`Sporadic disease from MLH1 promoter methylation, not Lynch syndrome; but a BRAF-wild-type result does not exclude Lynch <sup class="c" data-ref="Sepulveda2017" title="Source 484">484</sup>.`],
 [3,`What is extended RAS testing?`,`KRAS and NRAS codons 12 and 13 (exon 2), 59 and 61 (exon 3), and 117 and 146 (exon 4), required before anti-EGFR therapy <sup class="c" data-ref="Sepulveda2017" title="Source 484">484</sup>.`],
 [3,`Which tumours benefit from anti-EGFR antibodies by side?`,`Left-sided RAS wild-type tumours (OS HR 0.75); right-sided tumours did not benefit (HR 1.12) <sup class="c" data-ref="Arnold2017" title="Source 21">21</sup>.`],
 /* ---- Part 4: treatment ---- */
 [4,`What is total mesorectal excision (TME)?`,`Removing the rectum with its intact mesorectal envelope. Heald's 1986 series reported corrected 5-year survival of 87% and no staple-line recurrences after curative surgery <sup class="c" data-ref="Heald1986" title="Source 230">230</sup>.`],
 [4,`Is laparoscopic colectomy as good as open surgery for colon cancer?`,`In COST, 3-year recurrence was 16% vs 18% and survival 86% vs 85%, with a shorter stay <sup class="c" data-ref="COST2004" title="Source 111">111</sup>.`],
 [4,`What does a defunctioning stoma do after low anterior resection?`,`It cut symptomatic anastomotic leak from 28.0% to 10.3% in a Swedish randomised trial <sup class="c" data-ref="Matthiessen2007" title="Source 352">352</sup>.`],
 [4,`What did MOSAIC add to adjuvant 5-FU/leucovorin?`,`Oxaliplatin (FOLFOX4): 3-year DFS 78.2% vs 72.9% <sup class="c" data-ref="Andre2004" title="Source 12">12</sup>, with an overall survival benefit in stage III only <sup class="c" data-ref="Andre2009" title="Source 13">13</sup>.`],
 [4,`What did IDEA conclude about 3 vs 6 months of adjuvant therapy?`,`Overall non-inferiority was not met (HR 1.07); 3 months was non-inferior for CAPOX and enough for low-risk T1–3 N1 disease <sup class="c" data-ref="Grothey2018" title="Source 201">201</sup>.`],
 [4,`Why does stage II dMMR colon cancer not get fluorouracil alone?`,`FU gave no DFS benefit in dMMR tumours (HR 1.10), and in pooled stage II dMMR data it was linked to worse survival (HR 2.95) <sup class="c" data-ref="Sargent2010" title="Source 468">468</sup>.`],
 [4,`What did the Dutch TME trial show for 5×5 Gy before TME?`,`10-year local recurrence 5% vs 11%, without an overall survival gain <sup class="c" data-ref="vanGijn2011" title="Source 556">556</sup>.`],
 [4,`Preoperative or postoperative chemoradiotherapy for rectal cancer?`,`Preoperative: 5-year local relapse 6% vs 13% with less toxicity and equal survival in CAO/ARO/AIO-94 <sup class="c" data-ref="Sauer2004" title="Source 472">472</sup>.`],
 [4,`How often does a tumour regrow under watch-and-wait?`,`2-year local regrowth was 25.2% in the International Watch & Wait Database; 97% of regrowths were in the bowel wall <sup class="c" data-ref="vanderValk2018" title="Source 555">555</sup>.`],
 [4,`What happened with dostarlimab in dMMR rectal cancer?`,`12 of 12, then all 49 rectal patients who completed treatment, had a clinical complete response <span class="ev early">Early evidence</span> <sup class="c" data-ref="Cercek2022,Cercek2025" title="Source 91,92">91,92</sup>.`],
 [4,`What boxed warning do the capecitabine and fluorouracil labels carry?`,`Serious or fatal reactions with DPD deficiency: "Test patients for genetic variants of DPYD prior to initiating" unless immediate treatment is necessary <sup class="c" data-ref="FDA-Xeloda,FDA-Fluorouracil" title="Source 161,179">161,179</sup>.`],
 [4,`What did KEYNOTE-177 show?`,`First-line pembrolizumab in MSI-H/dMMR metastatic CRC: median PFS 16.5 vs 8.2 months, grade ≥3 treatment-related events 22% vs 66% <sup class="c" data-ref="Andre2020" title="Source 16">16</sup>.`],
 [4,`Can liver metastases be cured?`,`Sometimes: in one series of 612 hepatectomies, actual 10-year survivors were almost all disease-free, "at least a one in six chance of cure" <sup class="c" data-ref="Tomlinson2007" title="Source 536">536</sup>.`],
 [4,`Which combination treats BRAF V600E metastatic CRC?`,`Encorafenib plus cetuximab, now with chemotherapy first-line: BREAKWATER interim median OS 30.3 vs 15.1 months <sup class="c" data-ref="Elez2025" title="Source 146">146</sup>.`],
 [4,`What did DYNAMIC show for ctDNA in stage II colon cancer?`,`ctDNA-guided care cut adjuvant chemotherapy from 28% to 15% with non-inferior 2-year RFS (93.5% vs 92.4%) <sup class="c" data-ref="Tie2022" title="Source 531">531</sup>.`],
 /* ---- Part 5: living with CRC ---- */
 [5,`What does the LARS score measure, and what are its cut-offs?`,`Five items (flatus incontinence, liquid-stool incontinence, frequency, clustering, urgency), total 0–42: 0–20 no LARS, 21–29 minor, 30–42 major <sup class="c" data-ref="Emmertsen2012" title="Source 149">149</sup>.`],
 [5,`How common is major LARS after rectal cancer resection?`,`About 41%; radiotherapy and a low anastomosis are the most consistent risk factors <sup class="c" data-ref="Croese2018" title="Source 117">117</sup>.`],
 [5,`What does the European Hernia Society recommend when an end colostomy is made?`,`A prophylactic synthetic non-absorbable mesh (strong recommendation); end colostomy has the highest parastomal hernia incidence <sup class="c" data-ref="Antoniou2018" title="Source 20">20</sup>.`],
 [5,`Why are people with a new ileostomy readmitted?`,`20% are readmitted within 30 days, and dehydration accounts for 6% <sup class="c" data-ref="Vogel2022" title="Source 565">565</sup>.`],
 [5,`What is a high-output stoma?`,`Small-bowel output above about 1.5–2.0 L in 24 h, causing water, sodium and often magnesium depletion <sup class="c" data-ref="Nightingale2022" title="Source 403">403</sup>.`],
 [5,`How does acute oxaliplatin neuropathy behave?`,`It starts within hours to 2 days of a dose, is triggered or worsened by cold, and resolves within 14 days <sup class="c" data-ref="FDA-OxaliplatinGland" title="Source 171">171</sup>.`],
 [5,`Which drug has evidence for painful chemotherapy-induced neuropathy?`,`Duloxetine, with limited benefit; no agent is recommended to prevent it <sup class="c" data-ref="Loprinzi2020" title="Source 337">337</sup>.`],
 [5,`What is capecitabine's hallmark toxicity?`,`Hand-foot syndrome: 60% any grade and 17% grade 3–4 in the X-ACT label table <sup class="c" data-ref="FDA-Xeloda" title="Source 179">179</sup>.`],
 [5,`What does CPIC say for a DPYD activity score of 1?`,`Intermediate metabolizer: reduce the starting dose by 50%, as published; poor metabolizers avoid 5-FU and its prodrugs <sup class="c" data-ref="Amstutz2018" title="Source 11">11</sup>.`],
 [5,`What follow-up does ASCO endorse after curative treatment?`,`History, examination and CEA every 3–6 months for 5 years; CT chest/abdomen yearly for 3 years; colonoscopy at 1 year <sup class="c" data-ref="Meyerhardt2013" title="Source 366">366</sup>.`],
 [5,`When do most recurrences happen?`,`80% within 3 years of surgery, in 18 pooled adjuvant colon trials <sup class="c" data-ref="Sargent2005" title="Source 467">467</sup>.`],
 [5,`What did the CHALLENGE trial show?`,`A 3-year structured exercise programme after adjuvant chemotherapy improved disease-free survival (HR 0.72; 5-year DFS 80.3% vs 73.9%) <sup class="c" data-ref="Courneya2025" title="Source 112">112</sup>.`],
 [5,`Does more intensive follow-up lengthen life?`,`No: FACS, COLOFOL and GILDA found recurrence earlier but no overall survival gain <sup class="c" data-ref="Primrose2014,WilleJorgensen2018,Rosati2016" title="Source 439,458,579">439,458,579</sup>.`],
 [5,`Why mark the stoma site before surgery?`,`It makes independent stoma care and predictable pouch wear more likely <sup class="c" data-ref="Salvadalena2015" title="Source 466">466</sup>; in emergency surgery complications fell from 36% to 24% <span class="ev early">Early evidence</span> <sup class="c" data-ref="Nozawa2024" title="Source 410">410</sup>.`],
 [5,`Split-dose or day-before bowel prep?`,`Split-dose: better cleansing (OR 2.51) and more willingness to repeat <sup class="c" data-ref="Martel2015" title="Source 350">350</sup>.`],
 /* ---- Part 6: history ---- */
 [6,`Who described abdominoperineal excision, and when?`,`W. Ernest Miles, in The Lancet in 1908 <sup class="c" data-ref="Miles1908" title="Source 367">367</sup>.`],
 [6,`What did Cuthbert Dukes publish in 1932?`,`A classification of rectal cancer: A within the wall, B through the wall without nodes, C regional nodes <sup class="c" data-ref="Dukes1932" title="Source 142">142</sup>.`],
 [6,`What was Warthin's Family G?`,`A family described from 1895 and published in 1913, now recognised as the first reported Lynch syndrome family; an MSH2 splice-site mutation was later confirmed <sup class="c" data-ref="Warthin1913,Douglas2005,Campos2024" title="Source 86,136,573">86,136,573</sup>.`],
 [6,`What did Muto, Bussey and Morson establish in 1975?`,`That most colorectal cancers evolve through a polyp-to-cancer sequence, although most adenomas never become cancer <sup class="c" data-ref="Muto1975" title="Source 385">385</sup>.`],
 [6,`When was colonoscopic polypectomy first reported?`,`1973, by Wolff and Shinya, through the fibreoptic colonoscope <sup class="c" data-ref="Wolff1973NEJM" title="Source 587">587</sup>.`],
 [6,`What did the Minnesota trial show in 1993?`,`Annual guaiac FOBT cut 13-year colorectal cancer mortality by 33% <sup class="c" data-ref="Mandel1993" title="Source 345">345</sup>.`],
 [6,`When were APC and MSH2 identified?`,`APC on 5q21 in 1991 <sup class="c" data-ref="Kinzler1991,Groden1991" title="Source 199,284">199,284</sup>; MSH2, the first Lynch mismatch-repair gene, in 1993 <sup class="c" data-ref="Fishel1993,Leach1993" title="Source 185,309">185,309</sup>.`],
 [6,`What did Heald propose in 1982?`,`Total excision of the mesorectum, after finding tumour foci several centimetres beyond the visible tumour edge <sup class="c" data-ref="Heald1982" title="Source 229">229</sup>.`],
 [6,`What was the first evidence that dMMR colorectal cancer responds to PD-1 blockade?`,`Le 2015: pembrolizumab gave a 40% immune-related response in dMMR vs 0% in pMMR colorectal cancer <sup class="c" data-ref="Le2015" title="Source 307">307</sup>.`]
];
const CR_MN=[
 ["3-2-1-0","well known",`Amsterdam II: 3 relatives with a Lynch-associated cancer (one a first-degree relative of the other two), 2 successive generations, 1 diagnosed before 50, 0 FAP <sup class="c" data-ref="Vasen1999,Syngal2015" title="Source 520,558">520,558</sup>.`],
 ["APC opens, KRAS grows, 18q and 17p invade","memory aid",`The classic order: APC early (63% of adenomas, even 0.5 cm) <sup class="c" data-ref="Powell1992" title="Source 437">437</sup>, ras as adenomas grow (9% under 1 cm, 58% over), 18q loss in advanced adenomas and 17p/TP53 loss at carcinoma <sup class="c" data-ref="Vogelstein1988" title="Source 566">566</sup>. The accumulation matters more than the exact order <sup class="c" data-ref="Fearon1990" title="Source 181">181</sup>.`],
 ["15 = 3 + 12","memory aid",`MSI is about 15% of colorectal cancer: about 3% Lynch syndrome and about 12% sporadic MLH1 promoter methylation <sup class="c" data-ref="Boland2010" title="Source 63">63</sup>.`],
 ["S spots, L links","memory aid",`MutS (MSH2 with MSH6) spots the mismatch; MutL (MLH1 with PMS2) links it to the excision machinery <sup class="c" data-ref="Vilar2010,Boland2010" title="Source 63,564">63,564</sup>.`],
 ["One, two-three, four-six, seven","memory aid",`N1a 1 node, N1b 2–3, N2a 4–6, N2b 7 or more; N1c is tumour deposits with no positive nodes <sup class="c" data-ref="Amin2017AJCC,Tong2018" title="Source 10,537">10,537</sup>.`],
 ["12, 8, 35","memory aid",`Quality numbers: at least 12 nodes examined <sup class="c" data-ref="Baxter2022" title="Source 48">48</sup>; withdrawal ≥8 minutes and screening ADR ≥35% <sup class="c" data-ref="Rex2024" title="Source 451">451</sup>.`],
 ["Left loves EGFR","memory aid",`Anti-EGFR antibodies help left-sided RAS wild-type tumours, not right-sided ones (OS HR 0.75 vs 1.12) <sup class="c" data-ref="Arnold2017" title="Source 21">21</sup>. Check RAS first: RAS-mutant tumours do not benefit <sup class="c" data-ref="Sepulveda2017" title="Source 484">484</sup>.`],
 ["BRAF before Lynch","memory aid",`MLH1 lost and BRAF V600E present? Think sporadic methylation before Lynch syndrome; a wild-type BRAF does not exclude Lynch <sup class="c" data-ref="Sepulveda2017" title="Source 484">484</sup>.`],
 ["Cold bites oxaliplatin","memory aid",`Acute oxaliplatin neuropathy is triggered by cold, starts within hours to 2 days and resolves within 14 days; the label advises avoiding cold drinks and ice <sup class="c" data-ref="FDA-OxaliplatinGland" title="Source 171">171</sup>.`],
 ["Urgency 16, clustering 11","memory aid",`The two heaviest LARS items: urgency scores up to 16 and clustering up to 11 <sup class="c" data-ref="Christensen2021" title="Source 101">101</sup>; 30 or more is major LARS <sup class="c" data-ref="Emmertsen2012" title="Source 149">149</sup>.`]
];
const CR_RV_STEPS=[
 {from:0,at:.19,k:'3 · relatives',t:'Three relatives',txt:`Amsterdam II needs at least three relatives with a Lynch-associated cancer: colorectal, endometrial, small bowel, ureter or renal pelvis. One must be a first-degree relative of the other two <sup class="c" data-ref="Vasen1999,Syngal2015" title="Source 520,558">520,558</sup>. Here a grandfather and two of his children qualify.`,pt:'Three people in the family have had a cancer that Lynch syndrome can cause.',hook:'Lynch-associated cancers for Amsterdam II: colorectum, endometrium, small bowel, ureter, renal pelvis.'},
 {from:.25,at:.4,k:'2 · generations',t:'Two generations',txt:`At least two successive generations must be affected <sup class="c" data-ref="Vasen1999,Syngal2015" title="Source 520,558">520,558</sup>. The grandfather (generation I) and his son and daughter (generation II) make two. Lynch syndrome is autosomal dominant, so it passes vertically from parent to child <sup class="c" data-ref="Syngal2015" title="Source 520">520</sup>.`,pt:'The cancers show up in parents and their children, not only among brothers and sisters.',hook:'Autosomal dominant: vertical transmission, men and women affected alike.'},
 {from:.48,at:.6,k:'1 · before 50',t:'One before 50',txt:`At least one cancer must be diagnosed before age 50 <sup class="c" data-ref="Vasen1999,Syngal2015" title="Source 520,558">520,558</sup>. The daughter's endometrial cancer at 46 meets it. Endometrial cancer is common in Lynch syndrome: to age 75, 37.0% for MLH1, 48.9% for MSH2 and 41.1% for MSH6 carriers <sup class="c" data-ref="DominguezValentin2020" title="Source 133">133</sup>.`,pt:'Cancer at a young age is a warning sign of an inherited cause.',hook:'Endometrial cancer counts toward Amsterdam II, not only colorectal cancer.'},
 {from:.68,at:.79,k:'0 · FAP',t:'Zero FAP',txt:`Familial adenomatous polyposis must be excluded and the tumours verified where possible <sup class="c" data-ref="Vasen1999,Syngal2015" title="Source 520,558">520,558</sup>. FAP brings hundreds of adenomas <sup class="c" data-ref="Galiatsatos2006" title="Source 191">191</sup>; Lynch syndrome was first described as familial colonic cancer without antecedent polyposis <sup class="c" data-ref="Boland1984" title="Source 62">62</sup>.`,pt:'The family does not have the polyp condition (FAP), which needs a different plan.',hook:'3-2-1-0: 3 relatives, 2 generations, 1 before 50, 0 FAP.'},
 {from:.84,at:.97,k:'Next step',t:'Test the tumour, then the family',txt:`Each child of a carrier has a 50% chance of inheriting the variant <sup class="c" data-ref="Syngal2015" title="Source 520">520</sup>. Family criteria miss many carriers: 28% of Lynch cases in one cohort did not meet the revised Bethesda guidelines <sup class="c" data-ref="Hampel2008" title="Source 221">221</sup>, so all new colorectal cancers are tested for mismatch-repair deficiency <sup class="c" data-ref="Syngal2015" title="Source 520">520</sup>.`,pt:'A test on the tumour, then a blood test, shows who in the family carries the gene change and needs early colonoscopy.',hook:'Universal tumour MMR testing: sensitivity 100% vs 87.8% for the Bethesda guidelines <sup class="c" data-ref="Moreira2012" title="Source 376">376</sup>.'}
];
const CR_RV_PED=[
 /* key, x, y, sex, label, cancer, age, affected order */
 ['gf',118,64,'m','Grandfather','Colorectal','61',0],['gm',220,64,'f','Grandmother','','',-1],
 ['un',60,176,'m','Uncle','Colorectal','53',1],['au',158,176,'f','Aunt','','',-1],['mo',258,176,'f','Mother','Endometrial','46',2],['fa',356,176,'m','Father','','',-1],
 ['pb',258,290,'m','Proband','','',-1],['si',356,290,'f','Sister','','',-1]
];
inits.review=()=>{
  let filt='all',deck=[],i=0;
  const F=[['all','All cards'],...Object.keys(CR_PARTN).map(k=>[k,'Part '+k])];
  $('#fcFilter').innerHTML=F.map(([k,l])=>`<button class="btn" data-ff="${k}" aria-pressed="${k==='all'}">${l}</button>`).join('');
  const fc=$('#fc');
  function build(shuf){deck=CR_FC.filter(c=>filt==='all'||String(c[0])===filt);if(shuf){const r=rng(Date.now()%1e6);for(let k=deck.length-1;k>0;k--){const j=Math.floor(r()*(k+1));[deck[k],deck[j]]=[deck[j],deck[k]]}}i=0;render()}
  function render(){const c=deck[i];fc.classList.remove('flip');
    $('#fcTagF').textContent=CR_PARTN[c[0]]+' · question';$('#fcTagB').textContent=CR_PARTN[c[0]]+' · answer';
    $('#fcFront').textContent=c[1];$('#fcBack').innerHTML=c[2];$('#fcCount').textContent=`${i+1} / ${deck.length}`;$('#fcBar').style.width=((i+1)/deck.length*100)+'%'}
  const flip=()=>fc.classList.toggle('flip');
  fc.addEventListener('click',e=>{if(e.target.closest('sup.c'))return;flip()});$('#fcFlip').onclick=flip;
  const next=()=>{i=(i+1)%deck.length;render()},prev=()=>{i=(i-1+deck.length)%deck.length;render()};
  $('#fcNext').onclick=next;$('#fcPrev').onclick=prev;$('#fcShuf').onclick=()=>build(true);
  $('#fcFilter').addEventListener('click',e=>{const b=e.target.closest('[data-ff]');if(!b)return;filt=b.dataset.ff;$$('[data-ff]').forEach(x=>x.setAttribute('aria-pressed',x===b));build(false)});
  document.addEventListener('keydown',e=>{if(cur!=='review')return;if(e.target.closest('input')||(e.target.closest('button')&&e.target!==fc))return;
    if(e.key===' '||e.key==='Enter'){e.preventDefault();flip()}else if(e.key==='ArrowRight')next();else if(e.key==='ArrowLeft')prev()});
  build(false);
  $('#mnList').innerHTML=CR_MN.map(m=>`<div class="card"><span class="tag ${m[1]==='well known'?'good':'accent'}">${m[1]}</span><b class="big">${m[0]}</b><p>${m[2]}</p></div>`).join('');

  /* ---- mnemonic in motion: Amsterdam II, 3-2-1-0 ---- */
  const svg=$('#rvSvg'),rg=$('#rvT');
  /* a pedigree symbol with a fill that can fade in; half=true shades the left half (carrier chance) */
  const sym=(x,y,sex,fill,op,half)=>{const r=14;
    if(half)return sex==='m'?`<rect x="${x-r}" y="${y-r}" width="${r}" height="${2*r}" style="fill:${fill};opacity:${f1(op)}"/>`:`<path d="M${x} ${y-r}A${r} ${r} 0 0 0 ${x} ${y+r}Z" style="fill:${fill};opacity:${f1(op)}"/>`;
    return sex==='m'?`<rect x="${x-r}" y="${y-r}" width="${2*r}" height="${2*r}" rx="1.5" style="fill:${fill};opacity:${f1(op)}"/>`:`<circle cx="${x}" cy="${y}" r="${r}" style="fill:${fill};opacity:${f1(op)}"/>`};
  const outl=(x,y,sex)=>{const r=14;return sex==='m'?`<rect x="${x-r}" y="${y-r}" width="${2*r}" height="${2*r}" rx="1.5" style="fill:none;stroke:var(--ink);stroke-width:1.7"/>`:`<circle cx="${x}" cy="${y}" r="${r}" style="fill:none;stroke:var(--ink);stroke-width:1.7"/>`};
  const ln=(x1,y1,x2,y2)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" style="stroke:var(--ink);stroke-width:1.5"/>`;
  function draw(t){
    const N=vb(svg,'720 380','400 716');
    const P=N?{x:6,y:6}:{x:8,y:14},C=N?{x:24,y:372}:{x:408,y:22};
    const aff=[ramp(t,.03,.08),ramp(t,.08,.13),ramp(t,.13,.18)];
    const fdr=ramp(t,.15,.19)*(1-ramp(t,.27,.31));
    const g2=ramp(t,.27,.38),u50=ramp(t,.5,.6),fap=ramp(t,.69,.78),nx=ramp(t,.85,.95);
    let s=`<g transform="translate(${P.x} ${P.y})">`;
    /* generation bands */
    [64,176,290].forEach((y,k)=>{const on=k<2?g2:0;
      s+=`<rect x="0" y="${y-30}" width="386" height="62" rx="8" style="fill:var(--brand-soft);opacity:${f1(on*.85)}"/>`;
      s+=`<text class="t-lbl" x="6" y="${y+5}" style="fill:var(${on>.5?'--brand':'--muted'})">${['I','II','III'][k]}</text>`});
    /* lines: marriages, descent, sibships */
    s+=ln(132,64,206,64)+ln(169,64,169,124)+ln(60,124,258,124)+ln(60,124,60,162)+ln(158,124,158,162)+ln(258,124,258,162);
    s+=ln(272,176,342,176)+ln(307,176,307,238)+ln(258,238,356,238)+ln(258,238,258,276)+ln(356,238,356,276);
    /* first-degree links from the grandfather to his two affected children */
    if(fdr>0)s+=`<g style="opacity:${f1(fdr)}"><path d="M104 72 Q66 98 60 160" style="fill:none;stroke:var(--gold);stroke-width:2.4;stroke-dasharray:5 3"/><path d="M132 74 Q236 118 254 160" style="fill:none;stroke:var(--gold);stroke-width:2.4;stroke-dasharray:5 3"/><text class="t-sm" x="40" y="24" style="fill:var(--ink)">Grandfather: first-degree relative of both</text></g>`;
    CR_RV_PED.forEach(([key,x,y,sex,nm,ca,age,ord])=>{
      s+=sym(x,y,sex,'var(--panel)',1);
      if(ord>=0&&aff[ord]>0)s+=sym(x,y,sex,'var(--tumour)',aff[ord]);
      if((key==='pb'||key==='si')&&nx>0)s+=sym(x,y,sex,'var(--polyp)',nx,true);
      s+=outl(x,y,sex);
      s+=`<text class="t-sm t-mid" x="${x}" y="${y+30}" style="fill:var(--ink)">${nm}</text>`;
      if(ord>=0&&aff[ord]>0){const hot=key==='mo'&&u50>0;
        s+=`<text class="t-xs t-mid" x="${x}" y="${y+43}" style="opacity:${f1(aff[ord])};${hot?'fill:var(--ink);font-weight:700':''}">${ca}, ${age}</text>`}
      if((key==='pb'||key==='si')&&nx>0)s+=`<text class="t-xs t-mid" x="${x}" y="${y+43}" style="opacity:${f1(nx)};fill:var(--ink)">50% chance</text>`;
    });
    /* the under-50 ring */
    if(u50>0)s+=`<circle cx="258" cy="176" r="${f1(19+5*(1-u50))}" style="fill:none;stroke:var(--gold);stroke-width:3;opacity:${f1(u50)}"/><text class="t-lbl" x="282" y="156" style="opacity:${f1(u50)}">46 &lt; 50</text>`;
    /* proband arrow */
    if(nx>0)s+=`<g style="opacity:${f1(nx)}"><path d="M214 302 L236 296" style="stroke:var(--ink);stroke-width:1.8"/><path d="M243 294 L233 291 L235 300 Z" style="fill:var(--ink)"/></g>`;
    s+='</g>';
    /* the checklist */
    const n3=aff.filter(v=>v>.5).length;
    const met=[n3>=3,g2>.5,u50>.5,fap>.5],cnt=met.filter(Boolean).length;
    const rows=[['3','relatives with a Lynch cancer',`counted: ${n3} of 3`],['2','successive generations',g2>.5?'generations I and II':'not yet shown'],['1','diagnosed before age 50',u50>.5?'endometrial cancer at 46':'not yet shown'],['0','FAP',fap>.5?'excluded; tumours verified':'not yet checked']];
    s+=`<g transform="translate(${C.x} ${C.y})"><text class="t-lbl" x="0" y="12">Amsterdam II checklist</text>`;
    rows.forEach(([d,a,b],k)=>{const y=48+k*50,h=met[k];
      s+=`<circle cx="17" cy="${y}" r="16" style="fill:var(${h?'--good-soft':'--field'});stroke:var(${h?'--good':'--line'});stroke-width:1.8"/><text class="t-big t-mid" x="17" y="${y+6}" style="fill:var(${h?'--good':'--muted'})">${d}</text>`;
      s+=`<text class="t-lbl" x="44" y="${y-2}" style="${h?'':'fill:var(--muted)'}">${a}</text><text class="t-sm" x="44" y="${y+14}">${b}</text>`;
      if(h)s+=`<path d="M282 ${y-4} L288 ${y+3} L300 ${y-10}" style="fill:none;stroke:var(--good);stroke-width:2.6;stroke-linecap:round"/>`});
    /* FAP comparison: a few polyps here vs hundreds in FAP */
    if(fap>0){const rr=rng(11);let fp='';for(let k=0;k<70;k++)fp+=`<circle cx="${f1(170+rr()*122)}" cy="${f1(252+rr()*16)}" r="1.9" style="fill:var(--polyp)"/>`;
      s+=`<g style="opacity:${f1(fap)}"><rect x="0" y="246" width="130" height="28" rx="14" style="fill:var(--mucosa);stroke:var(--mucosa-line)"/><circle cx="48" cy="260" r="3" style="fill:var(--polyp)"/><circle cx="96" cy="258" r="2.5" style="fill:var(--polyp)"/>`;
      s+=`<rect x="166" y="246" width="130" height="28" rx="14" style="fill:var(--mucosa);stroke:var(--mucosa-line)"/>${fp}<text class="t-xs" x="0" y="288">this family: few polyps</text><text class="t-xs" x="166" y="288">FAP: hundreds of adenomas</text></g>`}
    const v=nx>.5?'Next: test tumour, then family':cnt<4?`Criteria met: ${cnt} of 4`:'Amsterdam II met: 3-2-1-0';
    s+=`<text class="t-big" x="0" y="${fap>0?318:300}" style="fill:var(${cnt===4?'--good':'--ink'})">${v}</text>`;
    if(nx>0)s+=`<text class="t-sm" x="0" y="338" style="opacity:${f1(nx)}">Each child of a carrier: a 50% chance</text>`;
    s+='</g>';
    svg.innerHTML=s;
    const p=phaseOf(CR_RV_STEPS,t);setSt(p);$('#rvNote').innerHTML=noteHTML(CR_RV_STEPS[p]);
  }
  const stop=playWire(rg,$('#rvPlay'),draw,15000,'Replay','review');
  const setSt=stepWire($('#rvSteps'),CR_RV_STEPS,rg,draw,stop);
  draw(+rg.value);
};

/* =============== 6.3 quiz =============== */
const CR_QZ=[
 /* ---- Part 1 ---- */
 [1,`As a cause of cancer death worldwide, colorectal cancer ranks:`,[`Second`,`First`,`Third`,`Fifth`],0,`Second (9.3% of cancer deaths), and third for new cases (9.6%) in GLOBOCAN 2022 <sup class="c" data-ref="Bray2024" title="Source 71">71</sup>.`],
 [1,`The US lifetime risk of developing colorectal cancer is closest to:`,[`1 in 8`,`1 in 24 for men`,`1 in 100`,`1 in 500`],1,`4.1% (1 in 24) for males and 3.8% (1 in 26) for females <sup class="c" data-ref="Siegel2025" title="Source 493">493</sup>.`],
 [1,`Compared with people born around 1950, those born around 1990 have a rectal cancer risk about:`,[`Half as high`,`The same`,`Twice as high`,`Four times as high`],3,`IRR 4.32 for rectal cancer and 2.40 for colon cancer in SEER 1974–2013 <sup class="c" data-ref="Siegel2017" title="Source 489">489</sup>.`],
 [1,`The rise in early-onset colorectal cancer is driven mainly by tumours in the:`,[`Caecum and ascending colon`,`Appendix only`,`Distal colon and rectum`,`Transverse colon`],2,`Sigmoid and rectal cancers nearly doubled at ages 20–49 from 1998 to 2022, against a 26% rise in proximal tumours <sup class="c" data-ref="Siegel2026CRC" title="Source 495">495</sup>.`],
 [1,`Which marker identifies the cycling stem cells at the base of colonic crypts?`,[`Lgr5`,`CDX2`,`CEA`,`Ki-67 only`],0,`Lgr5, a Wnt target gene; one Lgr5+ cell generated all epithelial lineages in mice <sup class="c" data-ref="Barker2007" title="Source 42">42</sup>.`],
 [1,`Loss of APC leads to:`,[`Degradation of β-catenin`,`Loss of KRAS activity`,`Mismatch-repair deficiency`,`Stabilised β-catenin binding Tcf-4`],3,`Without APC, β-catenin escapes the destruction complex and binds Tcf-4, switching on Wnt targets constitutively <sup class="c" data-ref="Korinek1997,Stamos2013" title="Source 293,510">293,510</sup>.`],
 [1,`In Vogelstein's 1988 data, ras mutations were found in what share of adenomas over 1 cm?`,[`9%`,`25%`,`58%`,`95%`],2,`58% of adenomas over 1 cm vs 9% under 1 cm, and 47% of carcinomas <sup class="c" data-ref="Vogelstein1988" title="Source 566">566</sup>.`],
 [1,`Which gene is called the "gatekeeper" because it is mutated early and its frequency does not rise from adenoma to carcinoma?`,[`TP53`,`SMAD4`,`APC`,`PIK3CA`],2,`APC mutations were found in 63% of adenomas, even 0.5 cm ones, and 60% of carcinomas <sup class="c" data-ref="Powell1992" title="Source 437">437</sup>.`],
 [1,`About how long does it take a large benign tumour to evolve into an advanced cancer?`,[`About 6 months`,`About 2 years`,`About 17 years`,`About 50 years`],2,`About 17 years by comparative lesion sequencing, but under 2 years to gain metastatic ability <sup class="c" data-ref="Jones2008" title="Source 270">270</sup>.`],
 [1,`What share of colorectal cancers show microsatellite instability?`,[`About 15%`,`About 1%`,`About 40%`,`About 75%`],0,`About 15%: about 3% from Lynch syndrome and about 12% from sporadic MLH1 promoter methylation <sup class="c" data-ref="Boland2010" title="Source 63">63</sup>.`],
 [1,`dMMR tumours carry about how many more somatic mutations than pMMR tumours?`,[`About the same`,`About 2 times`,`About 25 times`,`About 1,000 times`],2,`Mean 1,782 vs 73 somatic mutations per tumour <sup class="c" data-ref="Le2015" title="Source 307">307</sup>.`],
 [1,`One affected first-degree relative raises colorectal cancer risk roughly:`,[`10%`,`2-fold`,`5-fold`,`10-fold`],1,`Pooled RR 2.24, and 3.97 with two or more affected relatives <sup class="c" data-ref="Butterworth2006" title="Source 85">85</sup>.`],
 [1,`IARC classifies processed meat as:`,[`Group 1, carcinogenic to humans`,`Group 2A`,`Group 2B`,`Group 3, not classifiable`],0,`Processed meat is Group 1; red meat is Group 2A, probably carcinogenic <sup class="c" data-ref="Bouvard2015" title="Source 70">70</sup>.`],
 [1,`In ASPREE (people aged 70 and older), daily low-dose aspirin:`,[`Halved colorectal cancer`,`Cut all-cause death`,`Was linked to higher cancer mortality`,`Had no measurable effects of any kind`],2,`Cancer death 3.1% vs 2.3% (HR 1.31) <sup class="c" data-ref="McNeil2018" title="Source 355">355</sup>; aspirin was also linked to more stage 4 cancer at diagnosis <sup class="c" data-ref="McNeil2021" title="Source 356">356</sup>.`],
 [1,`Which is NOT a Lynch syndrome gene?`,[`MLH1`,`MSH6`,`EPCAM`,`APC`],3,`Lynch syndrome is caused by MLH1, MSH2, MSH6, PMS2 or EPCAM <sup class="c" data-ref="Syngal2015" title="Source 520">520</sup>. APC causes FAP <sup class="c" data-ref="Galiatsatos2006" title="Source 191">191</sup>.`],
 [1,`The Amsterdam II criteria require all of the following EXCEPT:`,[`Three relatives with a Lynch-associated cancer`,`Two successive generations`,`One diagnosis before 50`,`A proven germline variant`],3,`Amsterdam II is a family-history rule: 3 relatives, 2 generations, 1 before 50, FAP excluded <sup class="c" data-ref="Vasen1999,Syngal2015" title="Source 520,558">520,558</sup>.`],
 [1,`Universal MMR testing of tumours compared with the Bethesda guidelines for finding Lynch syndrome:`,[`Sensitivity 100% vs 87.8%`,`Sensitivity 50% vs 90%`,`Identical`,`Universal testing misses most cases`],0,`In 10,206 probands, universal tumour testing had 100% sensitivity vs 87.8% for Bethesda <sup class="c" data-ref="Moreira2012" title="Source 376">376</sup>.`],
 [1,`FAP is caused by germline variants in:`,[`MUTYH, recessive`,`STK11, dominant`,`APC, dominant`,`SMAD4, recessive`],2,`APC on 5q21, autosomal dominant <sup class="c" data-ref="Galiatsatos2006" title="Source 191">191</sup>. MUTYH causes recessive MAP; STK11 causes Peutz–Jeghers <sup class="c" data-ref="Zaffaroni2024,Beggs2010" title="Source 49,597">49,597</sup>.`],
 /* ---- Part 2 ---- */
 [2,`The USPSTF 2021 grade for screening adults aged 45–49 is:`,[`A`,`B`,`C`,`D`],1,`B for 45–49, A for 50–75 and C for 76–85 <sup class="c" data-ref="USPSTF2021" title="Source 545">545</sup>.`],
 [2,`Which guideline still starts average-risk screening at 50?`,[`USPSTF 2021`,`ACS 2026`,`USMSTF 2022`,`ACP 2023`],3,`ACP 2023 starts at 50 and suggests considering not screening at 45–49 <sup class="c" data-ref="Qaseem2023" title="Source 440">440</sup>.`],
 [2,`According to ACS 2026, blood-based screening tests are recommended:`,[`As first choice for everyone`,`Every year from 40`,`Never`,`Only for people who decline or do not complete preferred tests`],3,`Blood tests are reserved for people who decline or do not complete the preferred tests <sup class="c" data-ref="Wolf2026" title="Source 585">585</sup>.`],
 [2,`The pooled sensitivity and specificity of FIT for colorectal cancer are about:`,[`0.40 and 0.60`,`0.79 and 0.94`,`0.99 and 0.50`,`0.95 and 0.99`],1,`0.79 and 0.94 in a 19-study meta-analysis; one sample performed as well as several <sup class="c" data-ref="Lee2014" title="Source 311">311</sup>.`],
 [2,`A single FIT's sensitivity for advanced adenomas at 10 µg/g is about:`,[`0.10`,`0.40`,`0.75`,`0.95`],1,`0.40 (0.33–0.47), which is why FIT has to be repeated <sup class="c" data-ref="Imperiale2019" title="Source 251">251</sup>.`],
 [2,`Lowering England's FIT threshold from 120 to 20 µg/g would (pilot estimates):`,[`Find more cancers but refer more people`,`Find fewer cancers`,`Refer fewer people`,`Change nothing`],0,`Cancer sensitivity rises from 47.8% to 82.2% but referrals rise from 2.1% to 7.8% of participants <sup class="c" data-ref="Li2021" title="Source 321">321</sup>.`],
 [2,`Compared with FIT, multitarget stool DNA has:`,[`Higher sensitivity and higher specificity`,`Lower sensitivity and higher specificity`,`Higher sensitivity and lower specificity`,`Identical accuracy`],2,`Cancer sensitivity 92.3% vs 73.8%; specificity 86.6% vs 94.9% <sup class="c" data-ref="Imperiale2014" title="Source 250">250</sup>.`],
 [2,`In ECLIPSE, the Shield blood test detected what share of advanced precancerous lesions?`,[`13.2%`,`43.4%`,`83.1%`,`94%`],0,`13.2%, against 83.1% of cancers <sup class="c" data-ref="Chung2024" title="Source 102">102</sup>.`],
 [2,`In NordICC, an invitation to colonoscopy:`,[`Halved colorectal cancer deaths`,`Had no effect on incidence`,`Raised all-cause mortality`,`Lowered 10-year incidence (RR 0.82) without a significant drop in death`],3,`Only 42% attended. Incidence RR 0.82; colorectal cancer death RR 0.90, not significant <sup class="c" data-ref="Bretthauer2022" title="Source 77">77</sup>.`],
 [2,`Each 1% rise in a colonoscopist's adenoma detection rate is linked to about how much lower interval-cancer risk?`,[`0.1%`,`3%`,`30%`,`50%`],1,`HR 0.97 per 1% ADR in 314,872 colonoscopies <sup class="c" data-ref="Corley2014" title="Source 109">109</sup>.`],
 [2,`The 2024 ACG/ASGE minimum screening ADR overall is:`,[`15%`,`25%`,`35%`,`50%`],2,`≥35% overall (≥40% in men, ≥30% in women); ≥50% after a positive stool test <sup class="c" data-ref="Rex2024" title="Source 451">451</sup>.`],
 [2,`A withdrawal time under 6 minutes is linked to an interval-cancer rate about:`,[`Halved`,`Unchanged`,`2.3 times higher`,`10 times higher`],2,`IRR 2.3 (1.5–3.4) <sup class="c" data-ref="Shaukat2015" title="Source 487">487</sup>. The 2024 target is an average of at least 8 minutes <sup class="c" data-ref="Rex2024" title="Source 451">451</sup>.`],
 [2,`Serious harms of screening colonoscopy in the USPSTF review were about:`,[`3 perforations and 15 major bleeds per 10,000`,`1 perforation per 100`,`5 deaths per 1,000`,`No measurable harms`],0,`Perforation 3.1 and major bleeding 14.6 per 10,000 procedures <sup class="c" data-ref="Lin2021" title="Source 328">328</sup>.`],
 [2,`After a positive FIT, colonoscopy delayed beyond 12 months was associated with:`,[`More cancer (OR 2.25) and more advanced-stage disease`,`No change in risk`,`Fewer cancers`,`Only more polyps`],0,`OR 2.25 for cancer and 3.22 for advanced stage; 2–9 months carried no excess risk <sup class="c" data-ref="Corley2017" title="Source 110">110</sup>.`],
 [2,`USMSTF 2020 interval after removal of 1–2 tubular adenomas under 10 mm:`,[`1 year`,`3 years`,`7–10 years`,`Never again`],2,`7–10 years <sup class="c" data-ref="Gupta2020" title="Source 209">209</sup>.`],
 [2,`USMSTF 2020 interval after piecemeal resection of an adenoma ≥20 mm:`,[`6 months`,`3 years`,`5 years`,`10 years`],0,`6 months, to check for residual polyp <sup class="c" data-ref="Gupta2020" title="Source 209">209</sup>.`],
 [2,`A person whose sister had colorectal cancer at 48 should, per USMSTF 2017, start colonoscopy at:`,[`45`,`50`,`38`,`40, every 10 years`],2,`Age 40 or 10 years before the youngest relative's diagnosis, whichever is earlier: 48 − 10 = 38, then every 5 years <sup class="c" data-ref="Rex2017" title="Source 450">450</sup>.`],
 [2,`Flexible sigmoidoscopy in PLCO reduced mortality from:`,[`Proximal cancer only`,`Both equally`,`Distal cancer, not proximal`,`Neither`],2,`Distal colorectal cancer mortality fell 50%; proximal mortality RR 0.97 <sup class="c" data-ref="Schoen2012" title="Source 476">476</sup>.`],
 [2,`The National Polyp Study found that removing adenomas reduced colorectal cancer mortality by about:`,[`10%`,`25%`,`53%`,`90%`],2,`12 deaths vs 25.4 expected, a standardised ratio of 0.47 <sup class="c" data-ref="Zauber2012" title="Source 598">598</sup>.`],
 [2,`Compared with a day-before regimen, split-dose bowel preparation:`,[`Gave worse cleansing`,`Made no difference`,`Was too poorly tolerated to repeat`,`Gave better cleansing (OR 2.51)`],3,`Split dosing gave better cleansing and more willingness to repeat (OR 1.90) <sup class="c" data-ref="Martel2015" title="Source 350">350</sup>.`],
 /* ---- Part 3 ---- */
 [3,`The commonest presenting feature of colorectal cancer in people under 50 is:`,[`Haematochezia`,`Weight loss`,`Jaundice`,`Bowel obstruction`],0,`Haematochezia (45%), then abdominal pain (40%) and altered bowel habit (27%) <sup class="c" data-ref="Demb2024" title="Source 125">125</sup>.`],
 [3,`UK guidance uses which FIT result to select symptomatic patients for urgent referral?`,[`fHb ≥10 µg Hb/g`,`fHb ≥120 µg Hb/g`,`Any detectable blood`,`FIT is not used in symptomatic patients`],0,`fHb ≥10 µg Hb/g, and patients should not be excluded from referral on FIT alone <sup class="c" data-ref="Monahan2022" title="Source 375">375</sup>.`],
 [3,`In England 2006–2008, about what share of colorectal cancers were diagnosed as emergencies?`,[`2%`,`10%`,`26%`,`60%`],2,`26%, with 1-year relative survival of 50% vs 98% for screen-detected cancer <sup class="c" data-ref="EllissBrookes2012" title="Source 148">148</sup>.`],
 [3,`About how many people with colorectal cancer have a synchronous second colorectal cancer?`,[`1 in 4`,`1 in 1,000`,`1 in 25`,`None`],2,`3.9% in a Dutch registry, so the whole colon should be examined, preferably before surgery <sup class="c" data-ref="Mulder2011" title="Source 384">384</sup>.`],
 [3,`In MERCURY, an MRI-involved circumferential margin was defined as tumour within:`,[`1 mm of the mesorectal fascia`,`5 cm of the anal verge`,`2 cm of the distal margin`,`10 mm of a lymph node`],0,`≤1 mm; it predicted worse 5-year survival (HR 1.97) and local recurrence (HR 3.50) <sup class="c" data-ref="Taylor2014" title="Source 523">523</sup>.`],
 [3,`Which statement about CEA is correct?`,[`It is a good screening test`,`It is only used in Lynch syndrome`,`It replaces CT in follow-up`,`It is of little use for early detection but used for prognosis and surveillance`],3,`CEA is "of little use in detecting early colorectal cancer" <sup class="c" data-ref="Duffy2001" title="Source 141">141</sup>; ASCO uses it preoperatively and for surveillance <sup class="c" data-ref="Locker2006" title="Source 332">332</sup>.`],
 [3,`A tumour that invades through the muscularis propria into pericolorectal tissue is:`,[`T1`,`T2`,`T3`,`T4b`],2,`T3. T2 invades the muscularis propria; T4a reaches the visceral peritoneum <sup class="c" data-ref="Amin2017AJCC,Tong2018" title="Source 10,537">10,537</sup>.`],
 [3,`Metastasis in 4–6 regional lymph nodes is:`,[`N1b`,`N1c`,`N2a`,`N2b`],2,`N2a is 4–6 nodes; N2b is 7 or more <sup class="c" data-ref="Amin2017AJCC,Tong2018" title="Source 10,537">10,537</sup>.`],
 [3,`N1c means:`,[`Tumour deposits with no positive lymph nodes`,`One positive node`,`Seven or more nodes`,`Peritoneal metastasis`],0,`Tumour deposits in subserosa, mesentery or pericolic/perirectal tissue with no positive nodes <sup class="c" data-ref="Amin2017AJCC,Tong2018" title="Source 10,537">10,537</sup>.`],
 [3,`Peritoneal metastasis in the AJCC 8th edition is:`,[`M1a, stage IVA`,`M1b, stage IVB`,`M1c, stage IVC`,`T4a`],2,`M1c and stage IVC were the main new categories in the 8th edition <sup class="c" data-ref="Tong2018" title="Source 537">537</sup>.`],
 [3,`T3 N0 M0 is stage:`,[`I`,`IIA`,`IIIA`,`IVA`],1,`IIA. T4a N0 is IIB and T4b N0 is IIC <sup class="c" data-ref="Amin2017AJCC,Tong2018" title="Source 10,537">10,537</sup>.`],
 [3,`The "survival paradox" refers to:`,[`Stage I doing worse than stage II`,`Rectal cancer always doing worse`,`Stage IIIA doing better than stage IIB`,`Women doing worse than men`],2,`IIIA 83.4% vs IIB 72.2% 5-year survival in SEER <sup class="c" data-ref="OConnell2004" title="Source 412">412</sup>; it persists under the 8th edition <sup class="c" data-ref="Yu2024" title="Source 595">595</sup>.`],
 [3,`The minimum number of lymph nodes that should be examined is:`,[`4`,`8`,`12`,`20`],2,`At least 12; fewer than 12 is a high-risk feature in stage II <sup class="c" data-ref="Baxter2022,Chang2007" title="Source 48,97">48,97</sup>.`],
 [3,`Which is NOT an ASCO 2022 high-risk feature in stage II colon cancer?`,[`T4 tumour`,`Fewer than 12 nodes`,`Perforation`,`Left-sided location`],3,`High-risk features include T4, fewer than 12 nodes, perineural or lymphovascular invasion, poor grade, obstruction, perforation and BD3 budding <sup class="c" data-ref="Baxter2022" title="Source 48">48</sup>.`],
 [3,`US 5-year relative survival for distant-stage colorectal cancer (2015–2021) is about:`,[`5%`,`15%`,`50%`,`74%`],1,`Distant 15%, regional 74%, localized 91%; population statistics, not individual predictions <sup class="c" data-ref="Siegel2026" title="Source 494">494</sup>.`],
 [3,`An MLH1-deficient tumour with BRAF V600E most likely reflects:`,[`Lynch syndrome`,`FAP`,`MUTYH polyposis`,`Sporadic MLH1 promoter methylation`],3,`A BRAF mutation strongly favours sporadic disease, though its absence does not exclude Lynch <sup class="c" data-ref="Sepulveda2017" title="Source 484">484</sup>.`],
 [3,`Before cetuximab or panitumumab, which testing is required?`,[`Extended RAS: KRAS and NRAS exons 2, 3 and 4`,`KRAS exon 2 only`,`BRAF only`,`CEA level`],0,`Extended RAS testing; RAS-mutant tumours do not benefit <sup class="c" data-ref="Sepulveda2017,Douillard2013" title="Source 137,484">137,484</sup>.`],
 [3,`In stage II–III colon cancer, dMMR tumours are about what share?`,[`1%`,`15%`,`50%`,`80%`],1,`About 15% in adjuvant-trial cohorts, falling to 3.5–5% in metastatic disease <sup class="c" data-ref="Sargent2010,Koopman2009,Venderbosch2014" title="Source 288,468,560">288,468,560</sup>.`],
 [3,`In pooled first-line trials of RAS wild-type metastatic CRC, anti-EGFR therapy helped:`,[`Right-sided tumours only`,`Both sides equally`,`Left-sided tumours only`,`Neither side`],2,`OS HR 0.75 for left-sided vs 1.12 for right-sided tumours <sup class="c" data-ref="Arnold2017" title="Source 21">21</sup>.`],
 /* ---- Part 4 ---- */
 [4,`Total mesorectal excision removes:`,[`Only the tumour with a 5 cm margin`,`The whole colon`,`The anal sphincters routinely`,`The rectum with its intact mesorectal envelope`],3,`Heald found tumour foci in the mesorectum beyond the visible edge and proposed removing it intact <sup class="c" data-ref="Heald1982,Heald1986" title="Source 229,230">229,230</sup>.`],
 [4,`COST compared laparoscopic and open colectomy and found 3-year recurrence of:`,[`16% vs 18%`,`5% vs 30%`,`30% vs 5%`,`50% vs 50%`],0,`16% vs 18% (HR 0.86) with similar survival <sup class="c" data-ref="COST2004" title="Source 111">111</sup>.`],
 [4,`A defunctioning stoma after low anterior resection reduced symptomatic leak from:`,[`28.0% to 10.3%`,`10% to 5%`,`50% to 40%`,`It made no difference`],0,`28.0% to 10.3% in a Swedish RCT <sup class="c" data-ref="Matthiessen2007" title="Source 352">352</sup>.`],
 [4,`MOSAIC showed that adding oxaliplatin to 5-FU/leucovorin:`,[`Improved overall survival in stage II and III`,`Had no effect`,`Improved DFS, with an overall survival benefit in stage III`,`Worsened DFS`],2,`3-year DFS 78.2% vs 72.9% <sup class="c" data-ref="Andre2004" title="Source 12">12</sup>; 6-year OS benefit in stage III only <sup class="c" data-ref="Andre2009" title="Source 13">13</sup>.`],
 [4,`In IDEA, 3 months of adjuvant therapy was non-inferior to 6 months for:`,[`FOLFOX overall`,`All high-risk patients`,`No regimen`,`CAPOX`],3,`CAPOX HR 0.95 met non-inferiority; FOLFOX HR 1.16 did not <sup class="c" data-ref="Grothey2018" title="Source 201">201</sup>.`],
 [4,`In IDEA, grade ≥2 neurotoxicity with FOLFOX was 16.6% at 3 months vs what at 6 months?`,[`17.0%`,`25.0%`,`47.7%`,`90%`],2,`47.7%; CAPOX was 14.2% vs 44.9% <sup class="c" data-ref="Grothey2018" title="Source 201">201</sup>.`],
 [4,`For stage II dMMR colon cancer, fluorouracil alone:`,[`Gives no benefit and may harm`,`Doubles survival`,`Is the standard of care`,`Prevents Lynch cancers`],0,`DFS HR 1.10 in dMMR; pooled stage II dMMR OS HR 2.95 with FU <sup class="c" data-ref="Sargent2010" title="Source 468">468</sup>.`],
 [4,`Short-course radiotherapy for rectal cancer is:`,[`5 × 5 Gy`,`25 × 2 Gy`,`1 × 20 Gy`,`50.4 Gy with oxaliplatin`],0,`5 × 5 Gy; in the Dutch TME trial it cut 10-year local recurrence from 11% to 5% <sup class="c" data-ref="vanGijn2011" title="Source 556">556</sup>.`],
 [4,`In CAO/ARO/AIO-94, preoperative vs postoperative chemoradiotherapy gave:`,[`Better survival`,`Worse local control`,`Better local control and less toxicity, same survival`,`More long-term toxicity`],2,`5-year local relapse 6% vs 13%, survival 76% vs 74% <sup class="c" data-ref="Sauer2004" title="Source 472">472</sup>.`],
 [4,`RAPIDO's total neoadjuvant therapy lowered disease-related treatment failure but at 5 years showed:`,[`More locoregional recurrence after resection (10% vs 6%)`,`Better overall survival in every subgroup`,`No difference in anything`,`Fewer distant metastases only in stage I`],0,`Locoregional recurrence after resection was 10% vs 6% <sup class="c" data-ref="Dijkstra2023" title="Source 131">131</sup>; disease-related treatment failure 23.7% vs 30.4% <sup class="c" data-ref="Bahadoer2021" title="Source 33">33</sup>.`],
 [4,`With watch-and-wait after a clinical complete response, 2-year local regrowth is about:`,[`2%`,`25%`,`60%`,`90%`],1,`25.2% in the International Watch & Wait Database, 97% in the bowel wall <sup class="c" data-ref="vanderValk2018" title="Source 555">555</sup>.`],
 [4,`Which drug gave a 100% clinical complete response in the first 12 patients with dMMR rectal cancer?`,[`Bevacizumab`,`Cetuximab`,`Regorafenib`,`Dostarlimab`],3,`Dostarlimab, a PD-1 inhibitor; the US label added this use under accelerated approval in October 2026 <sup class="c" data-ref="Cercek2022,FDA-Jemperli" title="Source 91,164">91,164</sup>.`],
 [4,`The capecitabine label's boxed warning asks prescribers to:`,[`Test for DPYD variants before starting, unless treatment is urgent`,`Check CEA weekly`,`Avoid in left-sided tumours`,`Give with ice chips`],0,`Serious adverse reactions or death can occur with complete DPD deficiency <sup class="c" data-ref="FDA-Xeloda" title="Source 179">179</sup>.`],
 [4,`In KEYNOTE-177, first-line pembrolizumab in MSI-H/dMMR metastatic CRC gave median PFS of:`,[`16.5 vs 8.2 months`,`5.6 vs 2.2 months`,`30.3 vs 15.1 months`,`It was inferior to chemotherapy`],0,`16.5 vs 8.2 months, with fewer grade ≥3 treatment-related events (22% vs 66%) <sup class="c" data-ref="Andre2020" title="Source 16">16</sup>.`],
 [4,`For left-sided, RAS wild-type, MSS metastatic CRC, ASCO 2023 recommends first-line chemotherapy plus:`,[`Anti-EGFR therapy`,`Anti-VEGF only`,`Pembrolizumab`,`Encorafenib`],0,`Chemotherapy plus anti-EGFR; right-sided RAS wild-type disease gets anti-VEGF <sup class="c" data-ref="Morris2023" title="Source 380">380</sup>.`],
 [4,`BRAF V600E metastatic CRC is treated with encorafenib combined with:`,[`Cetuximab`,`Bevacizumab alone`,`Tamoxifen`,`Nothing else`],0,`An anti-EGFR antibody is needed; BEACON OS 9.0 vs 5.4 months with the triplet <sup class="c" data-ref="Kopetz2019" title="Source 290">290</sup>.`],
 [4,`After liver resection for colorectal metastases, actual 10-year survival suggested a cure rate of about:`,[`1 in 100`,`1 in 6`,`1 in 2`,`9 in 10`],1,`"At least a one in six chance of cure" in well-selected patients <sup class="c" data-ref="Tomlinson2007" title="Source 536">536</sup>.`],
 [4,`Which drug is NOT a later-line option for refractory metastatic CRC?`,[`Regorafenib`,`Trifluridine/tipiracil`,`Fruquintinib`,`Levamisole`],3,`Regorafenib, trifluridine/tipiracil and fruquintinib all extended survival in refractory disease <sup class="c" data-ref="Grothey2013,Mayer2015,Dasari2023" title="Source 120,200,353">120,200,353</sup>. Levamisole belongs to the 1990 adjuvant era <sup class="c" data-ref="Moertel1990" title="Source 371">371</sup>.`],
 [4,`In DYNAMIC, ctDNA-guided management of stage II colon cancer:`,[`Doubled chemotherapy use`,`Worsened recurrence-free survival`,`Cut chemotherapy use (15% vs 28%) with non-inferior RFS`,`Was only tested in rectal cancer`],2,`2-year RFS 93.5% vs 92.4% <sup class="c" data-ref="Tie2022" title="Source 531">531</sup>.`],
 /* ---- Part 5 ---- */
 [5,`A LARS score of 32 means:`,[`No LARS`,`Minor LARS`,`Major LARS`,`The score only runs to 20`],2,`0–20 no LARS, 21–29 minor, 30–42 major <sup class="c" data-ref="Emmertsen2012" title="Source 149">149</sup>.`],
 [5,`The single heaviest-weighted item on the LARS score is:`,[`Frequency`,`Flatus incontinence`,`Urgency`,`Liquid-stool leakage`],2,`Urgency scores up to 16 points; clustering up to 11 <sup class="c" data-ref="Christensen2021" title="Source 101">101</sup>.`],
 [5,`Prophylactic mesh is strongly recommended by the European Hernia Society when creating:`,[`A loop ileostomy`,`Any anastomosis`,`No stoma`,`An end colostomy`],3,`End colostomy has the highest parastomal hernia incidence <sup class="c" data-ref="Antoniou2018" title="Source 20">20</sup>.`],
 [5,`Within 30 days of ileostomy creation, about what share of patients are readmitted?`,[`1%`,`20%`,`50%`,`80%`],1,`20% for any cause; 6% for dehydration <sup class="c" data-ref="Vogel2022" title="Source 565">565</sup>.`],
 [5,`High-output stoma is usually taken as output above about:`,[`200 mL a day`,`500 mL a day`,`1.5–2.0 L a day`,`5 L a day`],2,`Above about 1.5–2.0 L in 24 h, depleting water, sodium and magnesium <sup class="c" data-ref="Nightingale2022" title="Source 403">403</sup>.`],
 [5,`Acute oxaliplatin neuropathy is typically triggered by:`,[`Cold`,`Heat`,`Bright light`,`Fasting`],0,`Cold temperature or cold objects can trigger or worsen it; it resolves within 14 days <sup class="c" data-ref="FDA-OxaliplatinGland" title="Source 171">171</sup>.`],
 [5,`Which statement on chemotherapy-induced neuropathy is correct per ASCO 2020?`,[`Calcium-magnesium infusions prevent it`,`Acetyl-L-carnitine is recommended`,`No agent is recommended for prevention; duloxetine has evidence for painful CIPN`,`Nothing can be done`],2,`No preventive agent is recommended <sup class="c" data-ref="Loprinzi2020" title="Source 337">337</sup>; IV calcium/magnesium did not prevent oxaliplatin neurotoxicity <sup class="c" data-ref="Loprinzi2014" title="Source 336">336</sup>.`],
 [5,`In the X-ACT label table, capecitabine caused hand-foot syndrome of any grade in about:`,[`9%`,`22%`,`60%`,`95%`],2,`60% any grade and 17% grade 3–4, vs 9% with FU/LV <sup class="c" data-ref="FDA-Xeloda" title="Source 179">179</sup>.`],
 [5,`CPIC 2017 guidance for a DPYD poor metabolizer (activity score 0) is to:`,[`Give the full dose`,`Reduce by 25%`,`Avoid 5-FU and its prodrugs`,`Double the dose`],2,`Avoid fluoropyrimidines; activity score 1 means a 50% starting-dose reduction, as published <sup class="c" data-ref="Amstutz2018" title="Source 11">11</sup>.`],
 [5,`After curative treatment, ASCO-endorsed follow-up includes colonoscopy at:`,[`1 month`,`5 years only`,`Never`,`1 year`],3,`Colonoscopy at 1 year, CEA every 3–6 months for 5 years and CT yearly for 3 years <sup class="c" data-ref="Meyerhardt2013" title="Source 366">366</sup>.`],
 [5,`What share of colon cancer recurrences occur within 3 years of surgery?`,[`20%`,`50%`,`80%`,`100%`],2,`80% in pooled adjuvant trials <sup class="c" data-ref="Sargent2005" title="Source 467">467</sup>.`],
 [5,`More intensive CEA and CT follow-up (FACS, COLOFOL, GILDA):`,[`Finds recurrence earlier but has not lengthened life`,`Doubles survival`,`Misses most recurrences`,`Was never tested`],0,`Earlier detection without an overall survival gain <sup class="c" data-ref="Primrose2014,WilleJorgensen2018,Rosati2016" title="Source 439,458,579">439,458,579</sup>.`],
 [5,`The CHALLENGE trial tested:`,[`A 3-year structured exercise programme after adjuvant chemotherapy`,`Aspirin after surgery`,`Vitamin D`,`A low-fat diet`],0,`Exercise improved DFS (HR 0.72) and overall survival (HR 0.63) <sup class="c" data-ref="Courneya2025" title="Source 112">112</sup>.`],
 [5,`Preoperative stoma education reduced peristomal skin complications from 19.4% to:`,[`9.5%`,`15%`,`19%`,`30%`],0,`RR 0.45, very low-certainty evidence <sup class="c" data-ref="Shi2025" title="Source 488">488</sup>.`],
 [5,`In a single US centre, what share of patients with early-onset colorectal cancer received fertility counselling?`,[`15.5%`,`50%`,`85%`,`100%`],0,`Only 15.5% of 194 <sup class="c" data-ref="Peng2025" title="Source 427">427</sup>.`],
 /* ---- Part 6 ---- */
 [6,`Abdominoperineal excision of the rectum was described in 1908 by:`,[`Cuthbert Dukes`,`Bill Heald`,`W. Ernest Miles`,`Henry Lynch`],2,`Miles, in The Lancet <sup class="c" data-ref="Miles1908" title="Source 367">367</sup>.`],
 [6,`Dukes C in the 1932 classification means:`,[`Growth limited to the wall`,`Spread through the wall without nodes`,`Regional lymph-node metastasis`,`Liver metastasis`],2,`A within the wall, B through it without nodes, C regional node metastasis <sup class="c" data-ref="Dukes1932" title="Source 142">142</sup>.`],
 [6,`Warthin's "Family G" is recognised as the first reported family with:`,[`FAP`,`Peutz–Jeghers syndrome`,`Juvenile polyposis`,`Lynch syndrome`],3,`An MSH2 splice-site mutation was later confirmed in the family <sup class="c" data-ref="Douglas2005,Campos2024" title="Source 86,136">86,136</sup>.`],
 [6,`The polyp-to-cancer sequence was set out in 1975 by:`,[`Muto, Bussey and Morson`,`Fearon and Vogelstein`,`Wolff and Shinya`,`Heald and Ryall`],0,`Muto, Bussey and Morson <sup class="c" data-ref="Muto1975" title="Source 385">385</sup>; Fearon and Vogelstein added the genetic model in 1990 <sup class="c" data-ref="Fearon1990" title="Source 181">181</sup>.`],
 [6,`The Minnesota trial (1993) showed that annual guaiac FOBT cut colorectal cancer mortality by:`,[`5%`,`15%`,`33%`,`75%`],2,`33% at 13 years <sup class="c" data-ref="Mandel1993" title="Source 345">345</sup>.`],
 [6,`The first mismatch-repair gene linked to Lynch syndrome (HNPCC), identified in 1993, was:`,[`MLH1`,`PMS2`,`MSH2`,`APC`],2,`MSH2 <sup class="c" data-ref="Fishel1993,Leach1993" title="Source 185,309">185,309</sup>; MLH1 followed in 1994 <sup class="c" data-ref="Bronner1994" title="Source 78">78</sup>.`],
 [6,`In 1990 Moertel showed that adjuvant fluorouracil plus levamisole for stage C colon cancer cut overall death rate by:`,[`5%`,`60%`,`It had no effect`,`33%`],3,`Recurrence fell 41% and deaths 33% <sup class="c" data-ref="Moertel1990" title="Source 371">371</sup>.`]
];
inits.quiz=()=>{
  const F=[['mix','Mixed (20)'],...Object.keys(CR_PARTN).map(k=>[k,'Part '+k])];
  $('#qFilter').innerHTML=F.map(([k,l])=>`<button class="btn" data-qf="${k}" aria-pressed="${k==='mix'}">${l}</button>`).join('');
  let list=[],i=0,score=0,missed=[],answered=false;
  function start(k){const r=rng(Date.now()%1e6);let L=CR_QZ.filter(q=>k==='mix'||String(q[0])===k).slice();for(let a=L.length-1;a>0;a--){const j=Math.floor(r()*(a+1));[L[a],L[j]]=[L[j],L[a]]}
    list=k==='mix'?L.slice(0,20):L;i=0;score=0;missed=[];q()}
  function q(){answered=false;$('#qBar').style.width=(i/list.length*100)+'%';
    if(i>=list.length){const pct=Math.round(score/list.length*100);
      $('#qCard').innerHTML=`<div class="kicker">Finished</div><div class="q">You scored ${score} / ${list.length} (${pct}%)</div><p>${pct>=85?'Excellent work.':pct>=65?'Solid. Review the ones you missed below.':'Worth another pass through the modules, then try again.'}</p>`+
       (missed.length?`<dl class="kv">${missed.map(m=>`<div><dt>${m[1]}</dt><dd><b>${m[2][m[3]]}.</b> ${m[4]}</dd></div>`).join('')}</dl>`:'')+`<div class="ctrls"><button class="btn primary" id="qAgain">Try again</button><button class="btn" data-go="review">Go to flashcards</button></div>`;
      $('#qAgain').onclick=()=>start($('[data-qf][aria-pressed="true"]').dataset.qf);return}
    const Q=list[i];
    $('#qCard').innerHTML=`<div class="readout"><span>question <b>${i+1} / ${list.length}</b></span><span>score <b>${score}</b></span><span>${CR_PARTN[Q[0]]}</span></div><div class="q">${Q[1]}</div><div class="opts">${Q[2].map((o,j)=>`<button class="opt" data-o="${j}"><span class="l">${'ABCD'[j]}</span><span>${o}</span></button>`).join('')}</div><div id="qFb"></div>`;
  }
  $('#qCard').addEventListener('click',e=>{const b=e.target.closest('.opt');if(b&&!answered){answered=true;const Q=list[i],j=+b.dataset.o,ok=j===Q[3];if(ok)score++;else missed.push(Q);
      $$('.opt',$('#qCard')).forEach((o,k)=>{o.disabled=true;if(k===Q[3])o.classList.add('right');else if(k===j)o.classList.add('wrong')});
      const ansL='ABCD'[Q[3]];
      $('#qFb').innerHTML=`<div class="expl"><b style="color:var(${ok?'--good':'--bad'})">${ok?'Correct.':'Not quite.'}</b> The answer is ${ansL}. ${Q[4]}</div><div class="ctrls" style="margin-top:12px"><button class="btn primary" id="qNext">${i+1<list.length?'Next question →':'See results'}</button></div>`;
      $('#qNext').onclick=()=>{i++;q()};$('#qNext').focus({preventScroll:true})}});
  $('#qFilter').addEventListener('click',e=>{const b=e.target.closest('[data-qf]');if(!b)return;$$('[data-qf]').forEach(x=>x.setAttribute('aria-pressed',x===b));start(b.dataset.qf)});
  start('mix');
};

/* =============== 6.4 glossary =============== */
const CR_GL=[
 ["Abdominoperineal resection (APR)",`Removal of the rectum and anus through the abdomen and perineum, leaving a permanent colostomy; first described by Miles in 1908 <sup class="c" data-ref="Miles1908" title="Source 367">367</sup>.`,"surgery"],
 ["Ablation (thermal)",`Destroying a tumour with heat. For liver metastases up to 3 cm it was non-inferior to resection for survival in COLLISION, with fewer adverse events <sup class="c" data-ref="vanderLei2025" title="Source 553">553</sup>.`,"metastatic"],
 ["Adenoma",`A benign glandular polyp, the usual precursor of colorectal cancer; most adenomas never become cancer <sup class="c" data-ref="Muto1975" title="Source 385">385</sup>.`,"sequence"],
 ["Adenoma–carcinoma sequence",`The stepwise progression from normal mucosa to adenoma to carcinoma as mutations accumulate <sup class="c" data-ref="Fearon1990,Muto1975" title="Source 181,385">181,385</sup>.`,"sequence"],
 ["Adenoma detection rate (ADR)",`The share of screening colonoscopies in which at least one adenoma is found; the 2024 minimum is 35% <sup class="c" data-ref="Rex2024" title="Source 451">451</sup>.`,"colonoscopy"],
 ["Adjuvant therapy",`Treatment given after surgery to lower the risk of recurrence, such as FOLFOX or CAPOX in stage III colon cancer <sup class="c" data-ref="Andre2004" title="Source 12">12</sup>.`,"chemo"],
 ["Advanced adenoma",`An adenoma with higher-risk features (in surveillance guidance: ≥10 mm, villous histology or high-grade dysplasia <sup class="c" data-ref="Gupta2020" title="Source 209">209</sup>); it turns into cancer at about 2.6–5.6% a year <sup class="c" data-ref="Brenner2007" title="Source 72">72</sup>.`,"sequence"],
 ["Amsterdam II criteria",`A family-history rule for suspected Lynch syndrome: 3 relatives with a Lynch-associated cancer, 2 generations, 1 diagnosed before 50, FAP excluded <sup class="c" data-ref="Vasen1999,Syngal2015" title="Source 520,558">520,558</sup>.`,"genes"],
 ["Anastomotic leak",`Leakage from the join between two bowel ends; after low anterior resection a defunctioning stoma lowered symptomatic leak from 28.0% to 10.3% <sup class="c" data-ref="Matthiessen2007" title="Source 352">352</sup>.`,"surgery"],
 ["Anterior resection",`Removal of the upper (high) or whole (low) rectum with a join to the colon, preserving the anus <sup class="c" data-ref="Jayne2017" title="Source 263">263</sup>.`,"surgery"],
 ["Anti-EGFR antibody",`Cetuximab or panitumumab; effective only in RAS wild-type tumours, mainly left-sided ones <sup class="c" data-ref="Sepulveda2017,Arnold2017" title="Source 21,484">21,484</sup>.`,"metastatic"],
 ["APC",`The gatekeeper tumour-suppressor gene on 5q21, mutated early in most colorectal tumours and in the germline in FAP <sup class="c" data-ref="Powell1992,Galiatsatos2006" title="Source 191,437">191,437</sup>.`,"sequence"],
 ["Aspirin (chemoprevention)",`Long-term aspirin lowered colon cancer incidence after years of use <sup class="c" data-ref="Rothwell2010" title="Source 460">460</sup> and colorectal cancer in Lynch carriers <sup class="c" data-ref="Burn2020" title="Source 84">84</sup>, but not in people over 70 <sup class="c" data-ref="McNeil2018" title="Source 355">355</sup>.`,"risk"],
 ["Attenuated FAP",`A milder form of FAP with usually 10–100 adenomas, later onset and lower cancer risk <sup class="c" data-ref="Half2009" title="Source 214">214</sup>.`,"genes"],
 ["Autosomal dominant",`Inheritance in which one variant copy is enough; each child of a carrier has a 50% chance of inheriting it (Lynch, FAP) <sup class="c" data-ref="Syngal2015" title="Source 520">520</sup>.`,"genes"],
 ["Autosomal recessive",`Inheritance needing two variant copies; MUTYH-associated polyposis follows this pattern <sup class="c" data-ref="Zaffaroni2024" title="Source 597">597</sup>.`,"genes"],
 ["Bethesda guidelines (revised)",`Criteria for testing tumours for MSI, such as colorectal cancer before 50; they missed 28% of Lynch cases in one cohort <sup class="c" data-ref="Umar2004,Hampel2008" title="Source 221,544">221,544</sup>.`,"genes"],
 ["Bevacizumab",`An anti-VEGF antibody; added to IFL it raised median survival from 15.6 to 20.3 months <sup class="c" data-ref="Hurwitz2004" title="Source 245">245</sup>. Not indicated for adjuvant treatment <sup class="c" data-ref="FDA-Avastin" title="Source 153">153</sup>.`,"metastatic"],
 ["Big Bang model",`The proposal that a colorectal tumour grows mainly as one expansion, with most subclonal changes arising early <span class="ev early">Early evidence</span> <sup class="c" data-ref="Sottoriva2015" title="Source 506">506</sup>.`,"sequence"],
 ["Boston Bowel Preparation Scale",`A 0–9 score (0–3 for each of 3 colon segments); adequate prep is ≥2 in each segment <sup class="c" data-ref="Lai2009,Rex2024" title="Source 302,451">302,451</sup>.`,"colonoscopy"],
 ["BRAF V600E",`An activating BRAF mutation in about 8% of advanced CRC, linked to right-sided, MSI tumours and poor prognosis; targeted with encorafenib plus cetuximab <sup class="c" data-ref="Sepulveda2017,Kopetz2019" title="Source 290,484">290,484</sup>.`,"biomarkers"],
 ["β-catenin",`The Wnt-pathway protein that, when APC is lost, accumulates and binds Tcf-4 to switch on growth genes <sup class="c" data-ref="Korinek1997" title="Source 293">293</sup>.`,"sequence"],
 ["CADe (computer-aided detection)",`Software that flags polyps during colonoscopy; it raised ADR from 36.7% to 44.7%, but a mortality benefit is not shown <span class="ev early">Early evidence</span> <sup class="c" data-ref="Soleymanjahi2024" title="Source 503">503</sup>.`,"cure"],
 ["Caecal intubation",`Reaching the caecum, the start of the colon, documented by photo; the 2024 target is ≥95% <sup class="c" data-ref="Rex2024" title="Source 451">451</sup>.`,"colonoscopy"],
 ["Caecum",`The first part of the large intestine, where the terminal ileum enters <sup class="c" data-ref="Omole2025" title="Source 415">415</sup>.`,"colon"],
 ["Capecitabine",`An oral fluoropyrimidine; at least equivalent to bolus FU/LV as adjuvant therapy, with hand-foot syndrome as its hallmark toxicity <sup class="c" data-ref="Twelves2005,FDA-Xeloda" title="Source 179,542">179,542</sup>.`,"chemo"],
 ["CAPOX",`Capecitabine plus oxaliplatin; in IDEA, 3 months was non-inferior to 6 months <sup class="c" data-ref="Grothey2018" title="Source 201">201</sup>.`,"chemo"],
 ["CEA (carcinoembryonic antigen)",`A blood tumour marker used before surgery and for surveillance, not for early detection <sup class="c" data-ref="Duffy2001,Locker2006" title="Source 141,332">141,332</sup>.`,"symptoms"],
 ["Cetuximab",`An anti-EGFR antibody, "not indicated" for Ras-mutant colorectal cancer or when Ras results are unknown <sup class="c" data-ref="FDA-Erbitux" title="Source 160">160</sup>.`,"metastatic"],
 ["Chromosomal instability (CIN)",`Widespread gain and loss of chromosomes; the commonest route to colorectal cancer <sup class="c" data-ref="Pino2010" title="Source 432">432</sup>.`,"genes"],
 ["CIMP",`CpG island methylator phenotype: widespread promoter methylation, including nearly all BRAF-mutant tumours <sup class="c" data-ref="Weisenberger2006,Toyota1999" title="Source 539,575">539,575</sup>.`,"genes"],
 ["Circulating tumour DNA (ctDNA)",`Tumour DNA in the blood. After surgery a positive result signals a high relapse risk <sup class="c" data-ref="Reinert2019,Nakamura2024" title="Source 389,448">389,448</sup>.`,"cure"],
 ["Circumferential resection margin (CRM)",`The cut outer surface of a rectal cancer specimen; an involved margin predicts local recurrence <sup class="c" data-ref="Quirke1986,Nagtegaal2008" title="Source 387,444">387,444</sup>.`,"staging"],
 ["Clinical complete response (cCR)",`No detectable tumour on examination, endoscopy and imaging after treatment; the gateway to watch-and-wait <sup class="c" data-ref="HabrGama2004" title="Source 211">211</sup>.`,"rectal"],
 ["Colibactin",`A genotoxin made by pks+ E. coli that leaves a mutational signature (SBS88/ID18) in colorectal genomes <sup class="c" data-ref="PleguezuelosManzano2020" title="Source 434">434</sup>.`,"sequence"],
 ["Colonoscopy",`Endoscopic examination of the whole colon that can remove polyps in the same visit <sup class="c" data-ref="Zauber2012" title="Source 598">598</sup>.`,"colonoscopy"],
 ["Colostomy",`A stoma made from the colon; end colostomy carries the highest parastomal hernia risk <sup class="c" data-ref="Antoniou2018" title="Source 20">20</sup>.`,"living"],
 ["Complete mesocolic excision (CME)",`Colon cancer surgery in the mesocolic plane with central vascular ligation, the colon's analogue of TME <sup class="c" data-ref="Hohenberger2009" title="Source 237">237</sup>.`,"surgery"],
 ["Consensus molecular subtypes (CMS)",`Four expression-based subtypes: CMS1 MSI immune, CMS2 canonical, CMS3 metabolic, CMS4 mesenchymal <sup class="c" data-ref="Guinney2015" title="Source 205">205</sup>.`,"biomarkers"],
 ["Crohn's disease",`Inflammatory bowel disease; colorectal cancer HR 1.40, with excess risk confined to early-onset, colonic or PSC-associated disease <sup class="c" data-ref="Olen2020CD" title="Source 413">413</sup>.`,"risk"],
 ["Crypt",`A tube-shaped pit of the colonic lining with stem cells at its base; each holds 5–10 active stem cells <sup class="c" data-ref="Nicholson2018" title="Source 402">402</sup>.`,"colon"],
 ["Crypt fission",`Division of one crypt into two; normal crypts divide about every 30–40 years, adenomas far faster <sup class="c" data-ref="Baker2014" title="Source 37">37</sup>.`,"colon"],
 ["CT colonography",`CT imaging of the air-distended colon; sensitivity 0.90 for lesions ≥10 mm in ACRIN <sup class="c" data-ref="Johnson2008" title="Source 267">267</sup>. Screening interval 5 years <sup class="c" data-ref="USPSTF2021" title="Source 545">545</sup>.`,"screening"],
 ["Cytoreductive surgery",`Removing all visible peritoneal tumour; adding HIPEC gave no survival benefit in PRODIGE 7 <sup class="c" data-ref="Quenet2021" title="Source 442">442</sup>.`,"metastatic"],
 ["Deep crypt secretory cell",`Reg4+ cells that replace Paneth cells as the colonic stem-cell niche <sup class="c" data-ref="Sasaki2016" title="Source 470">470</sup>.`,"colon"],
 ["Defunctioning stoma",`A temporary stoma that diverts stool from a new low join; 19% were never reversed in the Dutch TME trial <sup class="c" data-ref="denDulk2007" title="Source 126">126</sup>.`,"living"],
 ["Desmoid tumour",`A locally aggressive fibrous tumour; with duodenal cancer, a leading cause of death in FAP after colectomy <sup class="c" data-ref="Half2009" title="Source 214">214</sup>.`,"genes"],
 ["Disease-free survival (DFS)",`Time alive without recurrence; the main end point of adjuvant trials such as MOSAIC <sup class="c" data-ref="Andre2004" title="Source 12">12</sup>.`,"chemo"],
 ["dMMR / pMMR",`Mismatch-repair deficient or proficient, usually judged by immunohistochemistry for MLH1, MSH2, MSH6 and PMS2 <sup class="c" data-ref="Luchini2019" title="Source 341">341</sup>.`,"biomarkers"],
 ["Dostarlimab",`A PD-1 inhibitor that produced clinical complete responses in all early dMMR rectal cancer patients who completed treatment <span class="ev early">Early evidence</span> <sup class="c" data-ref="Cercek2022,Cercek2025" title="Source 91,92">91,92</sup>.`,"rectal"],
 ["DPD / DPYD",`Dihydropyrimidine dehydrogenase, which breaks down about 80% of a 5-FU dose, and its gene; variants raise toxicity <sup class="c" data-ref="Amstutz2018" title="Source 11">11</sup>.`,"chemo"],
 ["Dukes classification",`Cuthbert Dukes's 1932 rectal cancer staging: A within the wall, B through the wall, C lymph nodes <sup class="c" data-ref="Dukes1932" title="Source 142">142</sup>.`,"history"],
 ["Duloxetine",`An SNRI, the only agent with appropriate evidence for painful chemotherapy-induced neuropathy <sup class="c" data-ref="Loprinzi2020,Smith2013" title="Source 337,500">337,500</sup>.`,"nursing"],
 ["Early-onset colorectal cancer",`Colorectal cancer diagnosed before 50; incidence has risen 1–2% a year since the mid-1990s in the US <sup class="c" data-ref="Siegel2026CRC" title="Source 495">495</sup>.`,"what"],
 ["Emergency presentation",`Diagnosis after an emergency admission; 26% of English cases, with 1-year survival of 50% <sup class="c" data-ref="EllissBrookes2012" title="Source 148">148</sup>.`,"symptoms"],
 ["Encorafenib",`A BRAF inhibitor used with cetuximab, and first-line with chemotherapy, for BRAF V600E metastatic CRC <sup class="c" data-ref="Kopetz2019,Elez2025" title="Source 146,290">146,290</sup>.`,"metastatic"],
 ["EPCAM",`A gene next to MSH2; deletions of its 3′ end silence MSH2 and cause Lynch syndrome <sup class="c" data-ref="Ligtenberg2009" title="Source 327">327</sup>.`,"genes"],
 ["ERAS",`Enhanced recovery after surgery: a bundle including carbohydrate drinks, early feeding and mobilisation; it cut morbidity (RR 0.60) and stay by 2.28 days <sup class="c" data-ref="Greco2014" title="Source 196">196</sup>.`,"nursing"],
 ["Extended RAS testing",`Testing KRAS and NRAS exons 2, 3 and 4 before anti-EGFR therapy <sup class="c" data-ref="Sepulveda2017" title="Source 484">484</sup>.`,"biomarkers"],
 ["Extramural vascular invasion (EMVI)",`Tumour in veins beyond the bowel wall; MRI-EMVI predicted poorer 3-year relapse-free survival (35% vs 74%) <sup class="c" data-ref="Smith2008" title="Source 499">499</sup>.`,"staging"],
 ["Faecal immunochemical test (FIT)",`A stool test using antibodies to human haemoglobin; pooled sensitivity 0.79 and specificity 0.94 for cancer <sup class="c" data-ref="Lee2014" title="Source 311">311</sup>.`,"screening"],
 ["Familial adenomatous polyposis (FAP)",`Autosomal dominant APC syndrome with hundreds of adenomas and near-certain cancer without colectomy <sup class="c" data-ref="Galiatsatos2006,Zaffaroni2024" title="Source 191,597">191,597</sup>.`,"genes"],
 ["Family G",`Warthin's family, followed from 1895, now recognised as the first reported Lynch syndrome family <sup class="c" data-ref="Warthin1913,Campos2024" title="Source 86,573">86,573</sup>.`,"history"],
 ["Fear of recurrence",`Worry that cancer will return; the most prominent support need at every stage <sup class="c" data-ref="Kotronoulas2017" title="Source 296">296</sup>.`,"living"],
 ["fHb threshold",`The faecal haemoglobin cut-off above which FIT is called positive, in µg Hb/g; England's screening programme uses 120 <sup class="c" data-ref="Li2022" title="Source 322">322</sup>.`,"screening"],
 ["Field effect",`A field of cellular and molecular change that predisposes a whole territory of tissue to neoplasia <sup class="c" data-ref="Lochhead2015" title="Source 331">331</sup>.`,"sequence"],
 ["Financial toxicity",`Financial harm from cancer care; common in colorectal cancer across 65 studies <sup class="c" data-ref="Shao2026" title="Source 485">485</sup>.`,"living"],
 ["First-degree relative (FDR)",`A parent, sibling or child; one affected FDR roughly doubles colorectal cancer risk <sup class="c" data-ref="Butterworth2006" title="Source 85">85</sup>.`,"risk"],
 ["Flexible sigmoidoscopy",`Endoscopy of the distal colon; it prevents distal but not proximal cancer deaths <sup class="c" data-ref="Schoen2012" title="Source 476">476</sup>.`,"screening"],
 ["Fluorouracil (5-FU)",`The fluoropyrimidine backbone of colorectal chemotherapy, reported in 1957 <sup class="c" data-ref="Heidelberger1957" title="Source 231">231</sup>; its label carries a DPYD boxed warning <sup class="c" data-ref="FDA-Fluorouracil" title="Source 161">161</sup>.`,"chemo"],
 ["FOLFOX",`Infusional fluorouracil, leucovorin and oxaliplatin; FOLFOX4 improved DFS in MOSAIC <sup class="c" data-ref="Andre2004" title="Source 12">12</sup>.`,"chemo"],
 ["FOLFOXIRI",`A triplet of fluorouracil, leucovorin, oxaliplatin and irinotecan; with bevacizumab it raised PFS in TRIBE at the cost of more toxicity <sup class="c" data-ref="Loupakis2014" title="Source 338">338</sup>.`,"metastatic"],
 ["Fruquintinib",`A VEGFR inhibitor for refractory metastatic CRC; FRESCO-2 OS 7.4 vs 4.8 months <sup class="c" data-ref="Dasari2023" title="Source 120">120</sup>.`,"metastatic"],
 ["Fusobacterium nucleatum",`An oral bacterium enriched in colorectal tumours; high load linked to worse survival <span class="ev early">Early evidence</span> <sup class="c" data-ref="Kostic2012,Castellarin2012,Mima2016" title="Source 88,294,368">88,294,368</sup>.`,"sequence"],
 ["Gatekeeper gene",`A gene whose mutation starts the clonal expansion; APC in colorectal cancer <sup class="c" data-ref="Vogelstein2013" title="Source 567">567</sup>.`,"sequence"],
 ["gFOBT",`Guaiac faecal occult blood test; annual testing cut colorectal cancer mortality by 33% in the Minnesota trial <sup class="c" data-ref="Mandel1993" title="Source 345">345</sup>.`,"screening"],
 ["Goblet cell",`A mucin-producing cell of the colonic crypt <sup class="c" data-ref="Baidoo2024" title="Source 34">34</sup>.`,"colon"],
 ["Haematochezia",`Visible red blood from the rectum; the commonest presenting feature under 50 (45%) <sup class="c" data-ref="Demb2024" title="Source 125">125</sup>.`,"symptoms"],
 ["Haggitt levels",`Levels of invasion in a pedunculated malignant polyp, from 0 (mucosa) to 4 (submucosa below the stalk) <sup class="c" data-ref="Haggitt1985" title="Source 213">213</sup>.`,"surgery"],
 ["Hallmarks of cancer",`The capabilities cancers acquire, such as sustained proliferative signalling, invasion and immune evasion <sup class="c" data-ref="Hanahan2011,Hanahan2022" title="Source 222,223">222,223</sup>.`,"sequence"],
 ["Hand-foot syndrome",`Palmar-plantar erythrodysesthesia: red, painful palms and soles, in 60% on adjuvant capecitabine <sup class="c" data-ref="FDA-Xeloda" title="Source 179">179</sup>.`,"chemo"],
 ["HER2 amplification",`Found in about 5% of KRAS exon 2 wild-type metastatic CRC; targeted with trastuzumab-based combinations <sup class="c" data-ref="SartoreBianchi2016,Strickler2023" title="Source 469,514">469,514</sup>.`,"biomarkers"],
 ["High-output stoma",`Small-bowel stoma output above about 1.5–2.0 L a day, causing water, sodium and magnesium loss <sup class="c" data-ref="Nightingale2022" title="Source 403">403</sup>.`,"living"],
 ["HIPEC",`Hyperthermic intraperitoneal chemotherapy; adding it to cytoreductive surgery did not improve survival <sup class="c" data-ref="Quenet2021" title="Source 442">442</sup>.`,"metastatic"],
 ["Hyperplastic polyp",`The commonest serrated polyp, mostly harmless when small and distal <sup class="c" data-ref="Crockett2019,Gupta2020" title="Source 116,209">116,209</sup>.`,"sequence"],
 ["Ileostomy",`A stoma made from the small bowel; dehydration is the leading reason for readmission <sup class="c" data-ref="Vogel2022,Messaris2012" title="Source 362,565">362,565</sup>.`,"living"],
 ["Interval cancer",`A cancer found between scheduled screens or after a negative colonoscopy; lower ADR means more interval cancers <sup class="c" data-ref="Kaminski2010" title="Source 275">275</sup>.`,"colonoscopy"],
 ["Iron-deficiency anaemia",`Low haemoglobin from iron loss; Hb under 9.0 g/dL had a likelihood ratio for colorectal cancer of 27 in men <sup class="c" data-ref="Hamilton2008" title="Source 218">218</sup>.`,"symptoms"],
 ["Juvenile polyposis",`An autosomal dominant syndrome with five or more juvenile polyps; lifetime colorectal cancer risk about 38.7% <sup class="c" data-ref="Syngal2015,Brosens2007" title="Source 79,520">79,520</sup>.`,"genes"],
 ["KRAS",`An oncogene mutated as adenomas grow; RAS-mutant tumours do not respond to anti-EGFR therapy <sup class="c" data-ref="Vogelstein1988,Sepulveda2017" title="Source 484,566">484,566</sup>.`,"sequence"],
 ["KRAS G12C",`A KRAS mutation in about 3–4% of metastatic CRC, targeted by sotorasib or adagrasib with an anti-EGFR antibody <sup class="c" data-ref="Fakih2023,Yaeger2023" title="Source 152,591">152,591</sup>.`,"biomarkers"],
 ["Laparoscopic surgery",`Keyhole surgery; oncologically equivalent to open colectomy in COST <sup class="c" data-ref="COST2004" title="Source 111">111</sup>.`,"surgery"],
 ["LARS (low anterior resection syndrome)",`Urgency, frequency, clustering and incontinence after rectal resection; major LARS affects about 41% <sup class="c" data-ref="Croese2018" title="Source 117">117</sup>.`,"living"],
 ["LARS score",`A 5-item score from 0 to 42: 0–20 no LARS, 21–29 minor, 30–42 major <sup class="c" data-ref="Emmertsen2012" title="Source 149">149</sup>.`,"living"],
 ["Lgr5",`A Wnt target gene marking the stem cells at the crypt base <sup class="c" data-ref="Barker2007" title="Source 42">42</sup>.`,"colon"],
 ["Lymph-node yield",`The number of nodes the pathologist examines; at least 12 is the standard <sup class="c" data-ref="Baxter2022,Chang2007" title="Source 48,97">48,97</sup>.`,"staging"],
 ["Lynch syndrome",`Autosomal dominant mismatch-repair deficiency (MLH1, MSH2, MSH6, PMS2, EPCAM) causing colorectal, endometrial and other cancers <sup class="c" data-ref="Syngal2015" title="Source 520">520</sup>.`,"genes"],
 ["M1c",`AJCC 8th-edition category for peritoneal metastasis, giving stage IVC <sup class="c" data-ref="Tong2018" title="Source 537">537</sup>.`,"staging"],
 ["Malignant polyp",`A polyp containing invasive cancer; Haggitt level 4 invasion is an adverse factor <sup class="c" data-ref="Haggitt1985" title="Source 213">213</sup>.`,"surgery"],
 ["MERCURY",`A study of high-resolution pelvic MRI before TME that predicted a clear circumferential margin with 92% specificity <sup class="c" data-ref="MERCURY2006" title="Source 360">360</sup>.`,"staging"],
 ["Mesorectum",`The fatty envelope around the rectum holding its lymph nodes, removed intact in TME <sup class="c" data-ref="Heald1982" title="Source 229">229</sup>.`,"surgery"],
 ["Metachronous metastasis",`Spread found after the primary diagnosis; 5-year metachronous liver metastasis risk was 30.4% after stage III <sup class="c" data-ref="Manfredi2006" title="Source 348">348</sup>.`,"metastatic"],
 ["Microsatellite",`A short repeated DNA sequence, such as (A)n or (CA)n, prone to polymerase slippage <sup class="c" data-ref="Vilar2010" title="Source 564">564</sup>.`,"genes"],
 ["Microsatellite instability (MSI)",`Length changes in microsatellites caused by mismatch-repair loss; about 15% of colorectal cancers <sup class="c" data-ref="Boland2010" title="Source 63">63</sup>.`,"genes"],
 ["Mismatch repair (MMR)",`The DNA repair system correcting base mismatches and insertion-deletion loops after replication <sup class="c" data-ref="Jiricny2006,Li2008" title="Source 265,319">265,319</sup>.`,"genes"],
 ["MLH1",`Mismatch-repair gene; silenced by promoter methylation in most sporadic MSI cancers <sup class="c" data-ref="Herman1998" title="Source 235">235</sup>, and a high-risk Lynch gene <sup class="c" data-ref="DominguezValentin2020" title="Source 133">133</sup>.`,"genes"],
 ["Molecular residual disease (MRD)",`Cancer detectable only by ctDNA after curative treatment; not yet routine in early cancer per ESMO <sup class="c" data-ref="Pascual2022" title="Source 421">421</sup>.`,"cure"],
 ["MSH2",`Mismatch-repair gene, the first Lynch gene identified, in 1993 <sup class="c" data-ref="Fishel1993,Leach1993" title="Source 185,309">185,309</sup>.`,"genes"],
 ["MSH6",`Lynch gene with moderate colorectal but high endometrial cancer risk <sup class="c" data-ref="DominguezValentin2020" title="Source 133">133</sup>.`,"genes"],
 ["Mucinous adenocarcinoma",`A cancer with abundant extracellular mucin, 11% of colorectal cancers; not independently prognostic after stage adjustment <sup class="c" data-ref="Nitsche2013" title="Source 406">406</sup>.`,"staging"],
 ["Multitarget stool DNA (mt-sDNA)",`A stool test combining DNA markers with FIT; cancer sensitivity 92.3% vs 73.8% for FIT <sup class="c" data-ref="Imperiale2014" title="Source 250">250</sup>.`,"screening"],
 ["MutLα",`The MLH1–PMS2 heterodimer that recruits excision machinery in mismatch repair <sup class="c" data-ref="Vilar2010" title="Source 564">564</sup>.`,"genes"],
 ["MutSα",`The MSH2–MSH6 heterodimer that recognises single-base mismatches <sup class="c" data-ref="Vilar2010" title="Source 564">564</sup>.`,"genes"],
 ["MUTYH-associated polyposis (MAP)",`Autosomal recessive polyposis from biallelic MUTYH variants, often with fewer than 100 adenomas <sup class="c" data-ref="Zaffaroni2024" title="Source 597">597</sup>.`,"genes"],
 ["N1c",`Tumour deposits with no positive regional lymph nodes <sup class="c" data-ref="Amin2017AJCC,Tong2018" title="Source 10,537">10,537</sup>.`,"staging"],
 ["Neoadjuvant therapy",`Treatment given before surgery, such as chemoradiotherapy for rectal cancer <sup class="c" data-ref="Sauer2004" title="Source 472">472</sup> or chemotherapy for colon cancer in FOxTROT <sup class="c" data-ref="Morton2023" title="Source 381">381</sup>.`,"rectal"],
 ["Neoantigen",`A mutant peptide the immune system can recognise; dMMR tumours carry many, making them sensitive to PD-1 blockade <sup class="c" data-ref="Le2017" title="Source 308">308</sup>.`,"genes"],
 ["Nivolumab plus ipilimumab",`PD-1 plus CTLA-4 blockade for MSI-H/dMMR metastatic CRC; 24-month PFS 72% vs 14% with chemotherapy first-line <sup class="c" data-ref="Andre2024" title="Source 18">18</sup>.`,"metastatic"],
 ["NordICC",`A randomised trial of an invitation to one screening colonoscopy; incidence RR 0.82 at 10 years <sup class="c" data-ref="Bretthauer2022" title="Source 77">77</sup>.`,"screening"],
 ["NTRK fusion",`A rare gene fusion (0.2–2.4% with ALK and ROS1) targeted by tumour-agnostic TRK inhibitors <sup class="c" data-ref="Pietrantonio2017,Drilon2018" title="Source 138,430">138,430</sup>.`,"biomarkers"],
 ["Number needed to screen",`How many people must be screened to prevent one outcome; 489 to prevent one death with once-only sigmoidoscopy <sup class="c" data-ref="Atkin2010" title="Source 27">27</sup>.`,"screening"],
 ["Oligometastases",`A limited number of metastases that may be treated locally, for example with stereotactic radiotherapy <sup class="c" data-ref="Morris2023" title="Source 380">380</sup>.`,"metastatic"],
 ["Organ preservation",`Avoiding TME after a complete response; 3-year TME-free survival 53% with consolidation chemotherapy in OPRA <sup class="c" data-ref="GarciaAguilar2022" title="Source 193">193</sup>.`,"rectal"],
 ["Oxaliplatin",`A platinum drug whose dose-limiting toxicity is cumulative sensory neuropathy; acute symptoms are triggered by cold <sup class="c" data-ref="FDA-OxaliplatinGland" title="Source 171">171</sup>.`,"chemo"],
 ["Panitumumab",`An anti-EGFR antibody indicated for RAS wild-type metastatic CRC; boxed warning for skin toxicity <sup class="c" data-ref="FDA-Vectibix" title="Source 177">177</sup>.`,"metastatic"],
 ["Parastomal hernia",`A hernia next to a stoma, commonest after end colostomy <sup class="c" data-ref="Antoniou2018,Carne2003" title="Source 20,87">20,87</sup>.`,"living"],
 ["Pembrolizumab",`A PD-1 inhibitor; first-line in MSI-H/dMMR metastatic CRC after KEYNOTE-177 <sup class="c" data-ref="Andre2020" title="Source 16">16</sup>.`,"metastatic"],
 ["Perineural invasion",`Tumour growing along nerves; 5-year DFS 16% vs 65% without it in one series <sup class="c" data-ref="Liebig2009" title="Source 326">326</sup>.`,"staging"],
 ["Peutz–Jeghers syndrome",`Autosomal dominant STK11 syndrome with hamartomatous polyps and mucocutaneous pigmentation <sup class="c" data-ref="Beggs2010" title="Source 49">49</sup>.`,"genes"],
 ["PMS2",`The Lynch gene with the lowest colorectal cancer risk (10.4% to 75) <sup class="c" data-ref="DominguezValentin2020" title="Source 133">133</sup>.`,"genes"],
 ["Polypectomy",`Removal of a polyp at colonoscopy, first reported in 1973 <sup class="c" data-ref="Wolff1973NEJM" title="Source 587">587</sup>.`,"colonoscopy"],
 ["Positive predictive value (PPV)",`The share of positive results that are true positives; rectal bleeding in primary care has a PPV of about 2.4% <sup class="c" data-ref="Hamilton2005" title="Source 217">217</sup>.`,"symptoms"],
 ["Post-colonoscopy colorectal cancer (PCCRC)",`A cancer diagnosed after a colonoscopy that found none, standardised by the WEO <sup class="c" data-ref="Rutter2018" title="Source 464">464</sup>.`,"colonoscopy"],
 ["Primary sclerosing cholangitis (PSC)",`A bile-duct disease; in Crohn's disease, PSC is one of the settings where colorectal cancer risk is raised <sup class="c" data-ref="Olen2020CD" title="Source 413">413</sup>.`,"risk"],
 ["Processed meat",`Meat preserved by curing or smoking; IARC Group 1 <sup class="c" data-ref="Bouvard2015" title="Source 70">70</sup>; risk rises about 18% per 50 g/day <sup class="c" data-ref="Chan2011" title="Source 96">96</sup>.`,"risk"],
 ["Proximal (right-sided) colon",`Caecum, ascending colon, hepatic flexure and transverse colon; tumours here are more often MSI and BRAF-mutant <sup class="c" data-ref="Tejpar2017,Missiaglia2014" title="Source 369,525">369,525</sup>.`,"what"],
 ["R0 resection",`Complete removal with no tumour at the margins; 94% vs 89% with neoadjuvant chemotherapy in FOxTROT <sup class="c" data-ref="Morton2023" title="Source 381">381</sup>.`,"surgery"],
 ["Rectum",`The most distal part of the large intestine, between the sigmoid colon and the anal canal <sup class="c" data-ref="Wang2023" title="Source 570">570</sup>.`,"colon"],
 ["Regorafenib",`A multikinase inhibitor for refractory CRC; boxed warning for severe hepatotoxicity <sup class="c" data-ref="Grothey2013,FDA-Stivarga" title="Source 174,200">174,200</sup>.`,"metastatic"],
 ["Relative survival",`Survival of people with cancer compared with similar people without it; 5-year relative survival is 65% overall in the US <sup class="c" data-ref="Siegel2026CRC" title="Source 495">495</sup>.`,"what"],
 ["Robotic surgery",`Robot-assisted rectal surgery; ROLARR found no significant fall in conversion <sup class="c" data-ref="Jayne2017" title="Source 263">263</sup>.`,"surgery"],
 ["Sensitivity / specificity",`The share of people with disease who test positive, and without disease who test negative; FIT is about 0.79 and 0.94 for cancer <sup class="c" data-ref="Lee2014" title="Source 311">311</sup>.`,"screening"],
 ["Serrated pathway",`A route to cancer through sessile serrated lesions, with BRAF mutation and CIMP; at least 15% of colorectal cancers <sup class="c" data-ref="IJspeert2015,Crockett2019" title="Source 116,248">116,248</sup>.`,"sequence"],
 ["Serrated polyposis syndrome",`Many serrated polyps (WHO 2019 criteria); the commonest polyposis syndrome, often unrecognised <sup class="c" data-ref="Monahan2020,Rex2026SPS" title="Source 374,452">374,452</sup>.`,"genes"],
 ["Sessile serrated lesion (SSL)",`A flat, mostly proximal serrated precursor, typically BRAF-mutant and CIMP-positive <sup class="c" data-ref="Crockett2019,Bettington2017" title="Source 58,116">58,116</sup>.`,"sequence"],
 ["Short-course radiotherapy",`5 × 5 Gy before rectal surgery <sup class="c" data-ref="vanGijn2011" title="Source 556">556</sup>.`,"rectal"],
 ["Shield (cfDNA test)",`A blood test for cell-free DNA; 83.1% sensitivity for cancer, 13.2% for advanced precancerous lesions <sup class="c" data-ref="Chung2024,FDA-Shield" title="Source 102,172">102,172</sup>.`,"screening"],
 ["Sidedness",`Whether the primary is right- or left-sided; left-sided tumours have lower risk of death (HR 0.82) <sup class="c" data-ref="Petrelli2017" title="Source 428">428</sup>.`,"biomarkers"],
 ["Sigmoid colon",`The S-shaped hindgut segment before the rectum <sup class="c" data-ref="Harkins2023" title="Source 225">225</sup>.`,"colon"],
 ["Signet-ring cell carcinoma",`A rare (under 1%) subtype with intracellular mucin; independently worse prognosis (HR 2.5) <sup class="c" data-ref="Nitsche2013" title="Source 406">406</sup>.`,"staging"],
 ["Split-dose preparation",`Bowel prep divided between the evening before and the morning of colonoscopy; better cleansing (OR 2.51) <sup class="c" data-ref="Martel2015" title="Source 350">350</sup>.`,"colonoscopy"],
 ["Stoma",`An opening of the bowel on the abdomen, into which stool drains into a pouch <sup class="c" data-ref="denDulk2007" title="Source 126">126</sup>.`,"living"],
 ["Stoma site marking",`Choosing the best stoma position before surgery, ideally by a colorectal surgeon or certified ostomy nurse <sup class="c" data-ref="Salvadalena2015" title="Source 466">466</sup>.`,"nursing"],
 ["Surveillance colonoscopy",`Repeat colonoscopy after polyp removal at intervals set by the findings <sup class="c" data-ref="Gupta2020" title="Source 209">209</sup>.`,"schedule"],
 ["Survival paradox",`Stage IIIA doing better than stage IIB <sup class="c" data-ref="OConnell2004,Yu2024" title="Source 412,595">412,595</sup>.`,"staging"],
 ["Synchronous cancer",`A second primary colorectal cancer present at diagnosis, in 3.9% <sup class="c" data-ref="Mulder2011" title="Source 384">384</sup>.`,"symptoms"],
 ["T4a / T4b",`T4a penetrates the visceral peritoneum; T4b invades or adheres to other organs <sup class="c" data-ref="Amin2017AJCC" title="Source 10">10</sup>.`,"staging"],
 ["Tis",`Carcinoma in situ or intramucosal carcinoma, limited to the epithelium or lamina propria <sup class="c" data-ref="Amin2017AJCC,Tong2018" title="Source 10,537">10,537</sup>.`,"staging"],
 ["TNM",`The staging system for depth (T), nodes (N) and metastasis (M); the AJCC 8th edition covers colon and rectum together <sup class="c" data-ref="Amin2017AJCC" title="Source 10">10</sup>.`,"staging"],
 ["Total mesorectal excision (TME)",`Sharp dissection removing the rectum with its intact mesorectum; proposed by Heald in 1982 <sup class="c" data-ref="Heald1982" title="Source 229">229</sup>.`,"surgery"],
 ["Total neoadjuvant therapy (TNT)",`Giving radiotherapy and all systemic chemotherapy before rectal surgery, as in RAPIDO and PRODIGE 23 <sup class="c" data-ref="Bahadoer2021,Conroy2021" title="Source 33,108">33,108</sup>.`,"rectal"],
 ["TP53",`A tumour-suppressor gene on 17p whose loss marks the step from adenoma to carcinoma <sup class="c" data-ref="Vogelstein1988" title="Source 566">566</sup>.`,"sequence"],
 ["Traditional serrated adenoma (TSA)",`A serrated cancer precursor; surveillance at 3 years after removal <sup class="c" data-ref="Crockett2019,Gupta2020" title="Source 116,209">116,209</sup>.`,"sequence"],
 ["Trifluridine/tipiracil",`An oral drug for refractory CRC; with bevacizumab, median OS 10.8 vs 7.5 months <sup class="c" data-ref="Prager2023" title="Source 438">438</sup>.`,"metastatic"],
 ["Tumour budding",`Single cells or clusters of up to 4 at the invasive front, graded BD1–BD3 <sup class="c" data-ref="Lugli2017" title="Source 342">342</sup>.`,"staging"],
 ["Tumour deposit",`A discrete tumour nodule in pericolic fat without node structure; found in 22% of patients and linked to poor outcome <sup class="c" data-ref="Nagtegaal2017" title="Source 388">388</sup>.`,"staging"],
 ["Ulcerative colitis",`Inflammatory bowel disease with raised colorectal cancer risk (HR 1.66), falling over time <sup class="c" data-ref="Olen2020UC" title="Source 414">414</sup>.`,"risk"],
 ["Universal tumour testing",`MMR or MSI testing of every new colorectal cancer to find Lynch syndrome <sup class="c" data-ref="Syngal2015,Seppala2021" title="Source 483,520">483,520</sup>.`,"genes"],
 ["USPSTF",`US Preventive Services Task Force; its 2021 recommendation grades screening A at 50–75 and B at 45–49 <sup class="c" data-ref="USPSTF2021" title="Source 545">545</sup>.`,"screening"],
 ["Watch-and-wait",`Close surveillance instead of surgery after a clinical complete response of rectal cancer <sup class="c" data-ref="HabrGama2004,vanderValk2018" title="Source 211,555">211,555</sup>.`,"rectal"],
 ["Withdrawal time",`Time spent inspecting while withdrawing the colonoscope; the target average is ≥8 minutes <sup class="c" data-ref="Rex2024" title="Source 451">451</sup>.`,"colonoscopy"],
 ["Wnt signalling",`A pathway driving adult stem cells; deregulated in 93% of colorectal cancers <sup class="c" data-ref="Nusse2017,TCGA2012" title="Source 411,524">411,524</sup>.`,"sequence"]
];
inits.glossary=()=>{
  const inp=$('#glSearch');const tname=id=>{const m=MODS.find(x=>x.id===id);return m?m.t:''};
  /* drop citation markup and fold β to b and hyphens away, so 'b-catenin' and 'ctdna' match */
  const norm=s=>s.replace(/<sup[^>]*>.*?<\/sup>/g,'').replace(/<[^>]+>/g,'').toLowerCase().replace(/β/g,'b').replace(/[-–]/g,'');
  function render(){const q=norm(inp.value.trim());const L=CR_GL.filter(g=>!q||norm(g[0]).includes(q)||norm(g[1]).includes(q));
    $('#glList').innerHTML=L.map(g=>`<div><b>${g[0]}</b>${g[1]} <button class="btn ghost" style="padding:3px 9px;font-size:12px;margin-top:6px" data-go="${g[2]}">→ ${tname(g[2])}</button></div>`).join('')||'<p>No matching terms.</p>';
    $('#glCount').textContent=`${L.length} of ${CR_GL.length} terms`}
  inp.addEventListener('input',render);render();
};

/* =============== 6.5 sources =============== */
const CR_AREAN={A:'Epidemiology, symptoms & history',B:'Risk, prevention & hereditary syndromes',C:'Biology & the adenoma–carcinoma sequence',D:'Screening & colonoscopy',E:'Diagnosis, staging & biomarkers',F:'Treatment of localised disease',G:'Metastatic disease & research',H:'Living, survivorship & nursing'};
const CR_SVC=['PubMed','Europe PMC','Crossref','ClinicalTrials.gov','openFDA'];
const CR_svc=s=>s.unverified?[]:CR_SVC.filter(x=>(s.validated||'').includes(x));
/* a link cut at a parenthesis inside the DOI is rebuilt from the DOI in the citation text */
const CR_link=s=>{let l=s.link||'';if(l.split('(').length!==l.split(')').length){const m=s.text.match(/doi:\s*(\S+?)\.?(?=\s|$)/);l=m?'https://doi.org/'+m[1]:''}return l};
inits.sources=()=>{
  let area='all';const inp=$('#srcSearch');
  $('#srcFilter').innerHTML=[['all','All']].concat(Object.entries(CR_AREAN)).map(([k,l])=>`<button class="btn" data-sa="${k}" aria-pressed="${k==='all'}">${l}</button>`).join('');
  const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  /* counts come from the list itself, so they stay right when sources change */
  const nAll=SOURCES.length,nChk=SOURCES.filter(s=>s.unverified).length,by={};
  SOURCES.forEach(s=>CR_svc(s).forEach(v=>{by[v]=(by[v]||0)+1}));
  const svcTxt=CR_SVC.filter(v=>by[v]).map(v=>`${v} ${by[v]}`).join(' · ');
  $('#srcStats').innerHTML=`${nAll} sources in all. ${nAll-nChk} were confirmed against a database before inclusion (some by more than one: ${svcTxt}). ${nChk} are marked <span class="tag warn">check</span>.`;
  function render(){const q=inp.value.trim().toLowerCase();let n=0;
    $('#srcList').innerHTML=SOURCES.map((s,i)=>{const show=(area==='all'||(s.areas||[]).includes(area))&&(!q||s.text.toLowerCase().includes(q)||s.key.toLowerCase().includes(q)||(s.aliases||[]).some(a=>a.toLowerCase().includes(q)));if(!show)return'';n++;
      const sv=CR_svc(s).map(v=>`<span class="tag good" title="${esc('Validated: '+s.validated)}"><span class="sr">validated by </span>${esc(v)}</span>`).join('');
      return `<li id="src-${s.key}" value="${i+1}"><span class="key">[${i+1}] ${esc(s.key)}${s.aliases?' · also '+s.aliases.map(esc).join(', '):''}</span><span>${esc(s.text)}</span>${CR_link(s)?`<a href="${esc(CR_link(s))}" target="_blank" rel="noopener">${esc(CR_link(s))}</a>`:''}${s.note?`<span class="srcnote">${esc(s.note)}</span>`:''}<span class="mods">${(s.areas||[]).map(a=>`<span class="tag">${CR_AREAN[a]||a}</span>`).join('')}${sv}${s.unverified?'<span class="tag warn">check</span>':''}</span></li>`}).join('');
    $('#srcCount').textContent=`${n} of ${nAll} sources`}
  inp.addEventListener('input',render);
  $('#srcFilter').addEventListener('click',e=>{const b=e.target.closest('[data-sa]');if(!b)return;area=b.dataset.sa;$$('[data-sa]').forEach(x=>x.setAttribute('aria-pressed',x===b));render()});
  render();
};
onShow.sources=()=>{const inp=$('#srcSearch');if(inp&&inp.value){inp.value='';inp.dispatchEvent(new Event('input'))}
  if($('[data-sa="all"]')&&$('[data-sa="all"]').getAttribute('aria-pressed')!=='true')$('[data-sa="all"]').click()};

/* =============== boot =============== */
const h0=location.hash.slice(1);
show(MODS.some(m=>m.id===h0)?h0:store.get('last','home'),true);
window.addEventListener('hashchange',()=>{const h=location.hash.slice(1);if(h&&h!==cur&&MODS.some(m=>m.id===h))show(h)});
})();
