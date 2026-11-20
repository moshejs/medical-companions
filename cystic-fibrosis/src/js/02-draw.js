/* ---- drawing kit for this subject ----
   All colours come from CSS tokens, so they follow the theme. Every function returns an SVG string
   (or an object with .svg) to concatenate into an <svg>'s innerHTML. Everything here is schematic:
   no glyph encodes a measured value unless the caller passes one in, and the kit holds no clinical
   numbers (no sweat-chloride bands, no FEV1 bands, no carrier frequencies, no enzyme doses, no
   eligibility genotypes): callers pass them in from the research, with the citation in the
   surrounding text. Proportions below (cilia length, liquid depth, FEV1/FVC shape) are drawing
   proportions, not physiology.
   Orientation: the airway lumen (outside the cell, the apical side) is UP, the cytoplasm DOWN.
   membrane(x,y,w,o)          a lipid bilayer from x to x+w centred on y: two rows of heads with tails.
                              o: {h (thickness, 14), gap ([x0,x1] or a list of them: left open for a channel),
                              op (1)}.
   cftr(x,y,s,o)              one CFTR channel in close-up sitting in a membrane centred on (x,y), s = height
                              (about 0.9*s wide). Two membrane-spanning halves (MSD1, MSD2) around a pore, two
                              nucleotide-binding domains (NBD1, NBD2) below them in the cytoplasm and the R
                              domain between. o: {state ('open' | 'closed' | 'misfold' | 'absent'; default
                              'closed'), open (0..1 gate opening; overrides the state's default), p (0..1 the R
                              domain phosphorylated: a 'P' tag), atp (0..1 ATP dots at the NBDs), flow (0..1
                              ions passing up through the pore), ph (phase of the moving ions: pass t times a
                              speed), hco3 (true: bicarbonate among the ions, every third one), water (0..1
                              water drops gathering above), fold (0..1 for 'misfold': 0 a tangled chain in the
                              cytoplasm, 1 folded; lets a corrector scene refold it), corr (0..1 a corrector
                              moving in and docking on MSD1), pot (0..1 a potentiator docking at the gate),
                              labels (true: MSD, NBD, R and the outside / inside names), membrane (false: no
                              bilayer drawn), mw (bilayer width, 2.6*s)}.
                              'misfold' draws an empty membrane with a dashed ghost and the tangled protein
                              below it; 'absent' draws only the ghost. Returns {svg, at:{pore:[x,y], top, bot,
                              msd1:[x,y], nbd:[x,y], blob:[x,y]}}.
   ion(x,y,kind,o)            one ion or a water drop at (x,y): kind 'cl' (chloride, green), 'hco3'
                              (bicarbonate, blue), 'na' (sodium, violet), 'h2o' (a water drop). o: {r (5),
                              lbl (true: Cl-, HCO3-, Na+ beside it), op}.
   epithelium(x,y,w,h,o)      an airway lining in the box: a row of ciliated cells at the bottom, the airway
                              surface liquid (periciliary layer) over them and a mucus layer on top, the lumen
                              above. o: {n (cells, 5), asl (0..1 depth of the liquid layer: 1 deep enough for
                              the cilia to stand and beat, 0 collapsed), mucus (0..1 mucus layer thickness),
                              thick (0..1 how thick and sticky the mucus looks: amber to dark amber, with
                              strands), beat (0..1 how strongly the cilia beat), ph (phase of the beat and of
                              moving ions: pass t times a speed), cftr (0..1 CFTR function: channel marks on the
                              top of each cell, ions rising from them as it rises; null hides them), bact (0..1
                              how many bacteria sit in the mucus), inflam (0..1 the cells redden: inflamed),
                              move (0..1 an arrow showing mucus carried along), labels (true: names at the
                              right edge), seed}. Returns {svg, at:{cellTop, aslTop, mucTop, cells:[[cx,top],...]}}.
   mucusPlug(x,y,r,o)         a blob of mucus of radius r: o {thick (0..1 colour and strands), bact (number of
                              rods in it), seed, wob (0..1 wobble phase)}.
   bacterium(x,y,s,o)         a rod-shaped bacterium (Pseudomonas aeruginosa style), s = length. o: {ang
                              (degrees), flag (true: a flagellum), mucoid (0..1 a slimy halo: the mucoid,
                              biofilm form), col (var(--bact)), op}.
   lungs(x,y,s,o)             a front view of both lungs centred on (x,y) with the trachea and a branching
                              bronchial tree; s = scale (1 = 200 wide, about 200 tall); the person's right lung
                              (three lobes) is on the viewer's LEFT. o: {bx (0..1 bronchiectasis: the smaller
                              airways widen and end in sacs), plugs (0..1 mucus plugs at airway ends), inflam
                              (0..1 lung tissue reddens), hl ('r' | 'l': one lung highlighted), id (unique clip
                              id when two sets share an svg), labels (true: right / left)}.
                              Returns {svg, at:{trachea:[x,y], carina:[x,y], r:[x,y], l:[x,y], tips:[[x,y],...]}}.
   pancreas(x,y,s,o)          the pancreas (head on the left, inside the curve of the duodenum, body and tail to
                              the right) with its main duct; s = scale (1 = 200 wide, 100 tall; (x,y) the top
                              left). o: {block (0..1 thick secretions plugging the duct), flow (0..1 enzyme
                              granules travelling along the duct into the gut), ph (phase), fib (0..1 scarring:
                              hatching over the tissue), islets (true: islet dots, for CF-related diabetes;
                              0..1 also accepted, fading them), labels}. Returns {svg, at:{head, tail, exit}}.
   sweatGland(x,y,s,o)        a sweat gland in the skin: the coiled gland deep down, a straight duct up to a pore
                              in the skin surface; (x,y) = the pore, s = scale (1 = about 100 wide, 160 tall).
                              o: {cf (0..1: 0 the duct takes salt back (Na+ and Cl- leave the duct), 1 it
                              cannot, so salt reaches the skin), ph (phase of the sweat moving up), salt (0..1
                              salt crystals on the skin; default cf), labels}. Returns {svg, at:{coil, pore}}.
   chrom(x,y,h,o)             a chromosome ideogram, h tall, with bands and a centromere; o {band (0..1 the
                              position of a highlighted band from the top), label (under it), w (h*.16)}.
   geneStrip(x,y,w,o)         a gene drawn as exon boxes on an intron line, x to x+w: o {n (exons, 27), mark
                              (index of an exon carrying a variant: a triangle and a tick), label (beside the
                              marker), seed, h (14), zoom (0..1 the marked exon grows)}. Returns {svg, X(i) the
                              centre of exon i, y}.
   folding(x,y,s,o)           a protein chain of beads centred at (x,y), s = its width when stretched out:
                              o {fold (0..1: 0 a straight new chain, 1 folded compact), mis (0..1 how far the
                              fold goes wrong: a tangle), col (default var(--cftr), or var(--misfold) as mis
                              rises), seed}.
   modulator(x,y,s,o)         a modulator molecule, s = size: o {kind ('corr' a corrector: a teal hexagon,
                              'pot' a potentiator: a light-teal rounded diamond), lbl (a letter printed on it;
                              default C or P), op, ang}.
   spiro(x,y,w,h,o)           a forced exhalation: o {mode ('vt' volume against time, 'fv' flow against volume),
                              ratio (FEV1/FVC as a drawing proportion, .8; lower = obstruction, a scooped
                              flow-volume loop), fvc (0..1 of the box height reached, .85), upto (0..1 of the
                              blow drawn, for a pen), col (var(--dx)), marks (true: FEV1 and FVC marked)}.
                              Returns {svg, fev1:[x,y], fvc:[x,y]}. No reference values: callers add any.
   punnett(x,y,s,o)           a Punnett square with cell size s: a header row and column of alleles and four
                              child cells. o {a (the first parent's two alleles, e.g. ['N','v']), b (the
                              other's), show (0..1 cells revealed one by one), hl (index 0..3 highlighted),
                              lbl ({cf,carrier,none} cell captions; default 'CF', 'carrier', 'neither'),
                              va ('v': the allele letter that means a CF-causing variant)}. A child with two
                              variant alleles is filled var(--variant), one is half-shaded, none is plain.
                              Returns {svg, cell(i)->[x,y] (centres), n:{cf,carrier,none}}.
   capsule(x,y,s,o)           an enzyme capsule, s = length: o {open (0..1 the halves part and the beads
                              spill), ang (degrees), col (var(--enzyme))}.
   pill(x,y,s,o)              a tablet centred at (x,y), s = length; o: {ang (degrees), col (var(--rx)),
                              txt (a short label printed on it), round (true: a round tablet)}.
   clock(cx,cy,r,min,o)       a clock face with hands at min minutes past o.h0 (hours, 0) and a filled sector
                              for the time elapsed: o {full (minutes for a full sector, 60), col (var(--brand)),
                              label (under the face), ticks (12)}. For a 'day with CF' pass full: 1440.
   icons(x,y,o)               an icon array: o {n (100), cols (10), k (number highlighted), size (12), gap (3),
                              col (var(--brand)), base (var(--line)), shape ('person' or 'dot')}.
                              Returns {svg, h (height), at(i)->[x,y]}.
   curve(x,y,w,h,f,o)         a plotted function f(x) in the box with axes. o: {x0,x1 (domain, default 0..1),
                              y0,y1 (range, default 0..1), upto, col (var(--brand)), fill, bands ([{from,to,
                              col,label}] horizontal shaded bands in y units from the caller's source), dot,
                              lw (2.6), dash}. Returns {svg, X(xv)->px, Y(yv)->px, at(xv)->[px,py]}.
   monoFn(P)                  a monotone cubic through the caller's points [[x,y],...]: returns f(x), for
                              curve() when the data are cited points (registry series, trial time courses).
   tline(x,y,w,o)             a horizontal time axis: o {min, max, step, fmt(v)->label, label, big (ticks
                              above)}. Returns {svg, X(v)->x}.
   gauge(cx,cy,r,v,max,o)     a half-dial gauge (0 at the left, max at the right) with a needle at v, e.g. the
                              chloride output of a channel. o: {bands ([{to, col, label}] from the caller's
                              cited source; none by default), label, big (true: v as a large number)}.
   ladder(x,y,w,h,steps,o)    rising stairs from bottom-left, one step per label (a treatment ladder, a care
                              pathway). o: {at (index highlighted), col (var(--rx)), done}. Returns {svg, top(i)}.
   person(x,y,s,fill,o)       a person pictogram for icon arrays (s = height, (x,y) the top), fill a CSS
                              colour; o.op.
   ped(x,y,sex,aff,o)         a pedigree symbol: sex 'm' square, 'f' circle; aff 0 unaffected, 1 affected
                              (filled), .5 carrier (half shaded in var(--variant)); o: {dead, proband, r}. A
                              proband arrow needs marker('pedArrow',...) in the same svg's <defs>.
   marker(id,color)           an arrowhead <marker> for <defs>. */
function membrane(x,y,w,o={}){const h=o.h||14,hr=h*.2,step=hr*2.3,gaps=o.gap?(Array.isArray(o.gap[0])?o.gap:[o.gap]):[];
  const inGap=px=>gaps.some(g=>px>g[0]-hr&&px<g[1]+hr);let t='',hd='';
  for(let px=x+hr;px<=x+w-hr+.01;px+=step){if(inGap(px))continue;
    t+=`M${f1(px)} ${f1(y-h/2+hr)}V${f1(y-1)}M${f1(px)} ${f1(y+1)}V${f1(y+h/2-hr)}`;
    hd+=`<circle cx="${f1(px)}" cy="${f1(y-h/2+hr)}" r="${f1(hr)}"/><circle cx="${f1(px)}" cy="${f1(y+h/2-hr)}" r="${f1(hr)}"/>`}
  return `<g style="opacity:${o.op==null?1:o.op}"><path d="${t}" style="stroke:var(--membrane-tail);stroke-width:${f1(hr*.8)}"/><g style="fill:var(--membrane)">${hd}</g></g>`}
function ion(x,y,kind='cl',o={}){const r=o.r||5,op=o.op==null?1:o.op;
  if(kind==='h2o')return `<path d="M${f1(x)} ${f1(y-r*1.3)}C${f1(x+r*.2)} ${f1(y-r*.6)} ${f1(x+r)} ${f1(y-r*.1)} ${f1(x+r)} ${f1(y+r*.35)}A${f1(r)} ${f1(r)} 0 0 1 ${f1(x-r)} ${f1(y+r*.35)}C${f1(x-r)} ${f1(y-r*.1)} ${f1(x-r*.2)} ${f1(y-r*.6)} ${f1(x)} ${f1(y-r*1.3)}Z" style="fill:var(--water);opacity:${f1(op)}"/>`;
  const col={cl:'var(--cl)',hco3:'var(--bicarb)',na:'var(--na)'}[kind]||'var(--cl)',L={cl:'Cl⁻',hco3:'HCO₃⁻',na:'Na⁺'}[kind]||'';
  let s=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="fill:${col};stroke:var(--panel);stroke-width:${f1(Math.max(.8,r*.18))};opacity:${f1(op)}"/>`;
  if(o.lbl)s+=`<text x="${f1(x+r+3)}" y="${f1(y+3.2)}" class="t-xs" style="fill:var(--ink);opacity:${f1(op)}">${L}</text>`;
  return s}
function folding(x,y,s,o={}){const n=11,fd=clamp(o.fold||0),mis=clamp(o.mis||0),rr=rng(o.seed||5),col=o.col||(mis>.5?'var(--misfold)':'var(--cftr)');
  const P=[];for(let i=0;i<n;i++){const u=i/(n-1),ex=[x-s/2+s*u,y+Math.sin(u*Math.PI*3)*s*.03];
    const a=u*Math.PI*1.75-Math.PI*.4,fo=[x+Math.cos(a)*s*.2*(1-.25*Math.sin(u*9)),y+Math.sin(a)*s*.16];
    const tg=[x+(rr()-.5)*s*.5,y+(rr()-.5)*s*.34],tgt=[lerp(fo[0],tg[0],mis),lerp(fo[1],tg[1],mis)];
    P.push([lerp(ex[0],tgt[0],fd),lerp(ex[1],tgt[1],fd)])}
  const r=Math.max(2,s*.045);let g=`<path d="${smoothPath(P,false)}" style="fill:none;stroke:${col};stroke-width:${f1(r*.9)};stroke-linecap:round;stroke-linejoin:round"/>`;
  P.forEach((p,i)=>{g+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="${f1(i===0||i===n-1?r*1.15:r)}" style="fill:${i%3?col:'var(--panel)'};stroke:${col};stroke-width:1.2"/>`});
  return g}
function modulator(x,y,s=16,o={}){const k=o.kind||'corr',op=o.op==null?1:o.op,r=s/2,lb=o.lbl==null?(k==='pot'?'P':'C'):o.lbl;let d='';
  if(k==='pot')d=`M${f1(x)} ${f1(y-r)}Q${f1(x+r*.2)} ${f1(y-r*.2)} ${f1(x+r)} ${f1(y)}Q${f1(x+r*.2)} ${f1(y+r*.2)} ${f1(x)} ${f1(y+r)}Q${f1(x-r*.2)} ${f1(y+r*.2)} ${f1(x-r)} ${f1(y)}Q${f1(x-r*.2)} ${f1(y-r*.2)} ${f1(x)} ${f1(y-r)}Z`;
  else{for(let i=0;i<6;i++){const a=Math.PI/3*i+Math.PI/6;d+=(i?'L':'M')+f1(x+r*Math.cos(a))+' '+f1(y+r*Math.sin(a))}d+='Z'}
  return `<g style="opacity:${f1(op)}" transform="rotate(${f1(o.ang||0)} ${f1(x)} ${f1(y)})"><path d="${d}" style="fill:${k==='pot'?'var(--pot)':'var(--mod)'};stroke:var(--panel);stroke-width:1.2"/>${lb?`<text x="${f1(x)}" y="${f1(y+s*.17)}" class="t-mid" style="font:700 ${f1(s*.46)}px var(--mono);fill:var(--panel)">${lb}</text>`:''}</g>`}
function cftr(x,y,s=80,o={}){const st=o.state||'closed',ok=st==='open'||st==='closed',op=clamp(o.open==null?(st==='open'?1:0):o.open),mw=o.mw||s*2.6,mh=s*.26;
  const hw=s*.22,hh=s*.62,gp=s*.03+s*.07*op,top=y-hh*.62,bot=y+hh*.38,x1=x-gp/2-hw,x2=x+gp/2;
  let g=o.membrane===false?'':membrane(x-mw/2,y,mw,{h:mh,gap:ok?[x-gp/2-hw,x+gp/2+hw]:null});
  const at={pore:[x,y],top,bot,msd1:[x1,y],nbd:[x,bot+s*.2],blob:[x,y+s*.62]};
  const ghost=`<path d="M${f1(x1)} ${f1(top)}h${f1(hw*2+gp)}v${f1(hh)}h${f1(-hw*2-gp)}Z" style="fill:none;stroke:var(--muted);stroke-width:1.2;stroke-dasharray:3 3"/>`;
  if(!ok){g+=ghost;if(st==='misfold'){const fd=clamp(o.fold||0);g+=folding(x,at.blob[1],s*.8,{fold:1,mis:1-fd,seed:9,col:fd>.6?'var(--cftr)':'var(--misfold)'})}
    if(o.corr){const c=clamp(o.corr);g+=modulator(lerp(x-s*.9,x-s*.28,c),lerp(at.blob[1]+s*.35,at.blob[1]-s*.02,c),s*.2,{kind:'corr',op:Math.min(1,c*2)})}
    if(o.labels)g+=`<text x="${f1(x+mw/2-4)}" y="${f1(y-mh/2-6)}" class="t-xs t-end">outside (airway)</text><text x="${f1(x+mw/2-4)}" y="${f1(y+mh/2+12)}" class="t-xs t-end">inside the cell</text>`;
    return {svg:g,at}}
  /* NBDs and R domain */
  const ny=bot+s*.16,nr=s*.13,nd=lerp(s*.2,s*.12,op);
  g+=`<path d="M${f1(x-nd)} ${f1(ny)}Q${f1(x)} ${f1(ny+s*.32)} ${f1(x+nd)} ${f1(ny)}" style="fill:none;stroke:var(--cftr);stroke-width:${f1(s*.035)};stroke-linecap:round;opacity:.7"/>`;
  g+=`<circle cx="${f1(x-nd)}" cy="${f1(ny)}" r="${f1(nr)}" style="fill:var(--cftr);opacity:.85"/><circle cx="${f1(x+nd)}" cy="${f1(ny)}" r="${f1(nr)}" style="fill:var(--cftr);opacity:.85"/>`;
  if(o.p){g+=`<circle cx="${f1(x)}" cy="${f1(ny+s*.17)}" r="${f1(s*.07)}" style="fill:var(--gold);opacity:${f1(clamp(o.p))}"/><text x="${f1(x)}" y="${f1(ny+s*.17+s*.035)}" class="t-mid" style="font:700 ${f1(s*.09)}px var(--mono);fill:var(--panel);opacity:${f1(clamp(o.p))}">P</text>`}
  if(o.atp){const a=clamp(o.atp);[-1,1].forEach(k=>{g+=`<circle cx="${f1(x+k*nd*.35)}" cy="${f1(ny-nr*.25)}" r="${f1(s*.035)}" style="fill:var(--gold);opacity:${f1(a)}"/>`})}
  /* two membrane-spanning halves */
  const half=(hx,flip)=>`<path d="M${f1(hx)} ${f1(top+s*.04)}Q${f1(hx)} ${f1(top)} ${f1(hx+s*.04)} ${f1(top)}H${f1(hx+hw-s*.04)}Q${f1(hx+hw)} ${f1(top)} ${f1(hx+hw)} ${f1(top+s*.04)}V${f1(bot)}${flip?`L${f1(hx+hw*.3)} ${f1(ny-nr*.6)}`:`L${f1(hx+hw*.7)} ${f1(ny-nr*.6)}`}L${f1(hx)} ${f1(bot)}Z" style="fill:var(--cftr);stroke:var(--panel);stroke-width:1.2"/>`;
  g+=half(x1,false)+half(x2,true);
  [x1,x2].forEach(hx=>{for(let k=1;k<3;k++)g+=`<line x1="${f1(hx+hw*k/3)}" x2="${f1(hx+hw*k/3)}" y1="${f1(top+s*.06)}" y2="${f1(bot-s*.04)}" style="stroke:var(--panel);stroke-width:1;opacity:.35"/>`});
  /* ions up through the pore, water above */
  const fl=clamp(o.flow||0);
  if(fl>0){const N=6,ph=o.ph||0;for(let i=0;i<N;i++){const u=((i/N+ph)%1+1)%1,yy=lerp(bot+s*.08,top-s*.55,u),fade=Math.min(1,u*5,(1-u)*4)*fl;
    const kind=o.hco3&&i%3===2?'hco3':'cl';g+=ion(x+(u>.75?(i%2?1:-1)*(u-.75)*s*.8:0),yy,kind,{r:s*.055,op:fade})}}
  if(o.water){const wv=clamp(o.water);for(let i=0;i<5;i++){const a=i/4;g+=ion(x-s*.5+a*s,top-s*.62-(i%2)*s*.12,'h2o',{r:s*.05,op:wv*.9})}}
  if(o.corr){const c=clamp(o.corr);g+=modulator(lerp(x-s*.95,x1-s*.02,c),lerp(y+s*.55,y+s*.12,c),s*.2,{kind:'corr',op:Math.min(1,c*2)})}
  if(o.pot){const p=clamp(o.pot);g+=modulator(lerp(x+s*.95,x2+hw+s*.03,p),lerp(y-s*.5,y-s*.12,p),s*.2,{kind:'pot',op:Math.min(1,p*2)})}
  if(o.labels){g+=`<text x="${f1(x+mw/2-4)}" y="${f1(y-mh/2-6)}" class="t-xs t-end">outside (airway)</text><text x="${f1(x+mw/2-4)}" y="${f1(y+mh/2+12)}" class="t-xs t-end">inside the cell</text>`;
    g+=`<text x="${f1(x1-6)}" y="${f1(top+10)}" class="t-xs t-end">MSD</text><text x="${f1(x-nd-nr-4)}" y="${f1(ny+3)}" class="t-xs t-end">NBD</text><text x="${f1(x+s*.16)}" y="${f1(ny+s*.3)}" class="t-xs">R</text>`}
  return {svg:g,at}}
function bacterium(x,y,s=14,o={}){const a=o.ang||0,w=s*.38,col=o.col||'var(--bact)',m=clamp(o.mucoid||0),op=o.op==null?1:o.op;
  let g=`<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(a)})" style="opacity:${f1(op)}">`;
  if(m>0)g+=`<rect x="${f1(-s/2-w*.8)}" y="${f1(-w*1.3)}" width="${f1(s+w*1.6)}" height="${f1(w*2.6)}" rx="${f1(w*1.3)}" style="fill:var(--biofilm);opacity:${f1(.4+.5*m)}"/>`;
  if(o.flag!==false)g+=`<path d="M${f1(s/2)} 0q${f1(s*.15)} ${f1(-w*.8)} ${f1(s*.3)} 0t${f1(s*.3)} 0" style="fill:none;stroke:${col};stroke-width:1"/>`;
  g+=`<rect x="${f1(-s/2)}" y="${f1(-w/2)}" width="${f1(s)}" height="${f1(w)}" rx="${f1(w/2)}" style="fill:${col};stroke:var(--panel);stroke-width:.8"/></g>`;
  return g}
function mucusPlug(x,y,r,o={}){const th=clamp(o.thick==null?.5:o.thick),rr=rng(o.seed||3),wob=o.wob||0,n=10,P=[];
  for(let i=0;i<n;i++){const a=i/n*Math.PI*2,k=1+(rr()-.5)*.36+Math.sin(a*3+wob*6.28)*.05;P.push([x+Math.cos(a)*r*k,y+Math.sin(a)*r*k*.86])}
  let g=`<path d="${smoothPath(P)}" style="fill:var(--mucus)"/><path d="${smoothPath(P)}" style="fill:var(--mucus-thick);opacity:${f1(th*.85)}"/>`;
  if(th>.4){for(let i=0;i<3;i++){const a=rr()*6.28,b=a+1.6+rr();g+=`<path d="M${f1(x+Math.cos(a)*r*.55)} ${f1(y+Math.sin(a)*r*.5)}Q${f1(x)} ${f1(y)} ${f1(x+Math.cos(b)*r*.55)} ${f1(y+Math.sin(b)*r*.5)}" style="fill:none;stroke:var(--mucus-soft);stroke-width:1;opacity:${f1((th-.4)*1.4)}"/>`}}
  for(let i=0;i<(o.bact||0);i++)g+=bacterium(x+(rr()-.5)*r*1.1,y+(rr()-.5)*r*.9,r*.42,{ang:rr()*180,flag:false});
  return g}
function epithelium(x,y,w,h,o={}){const n=o.n||5,asl=clamp(o.asl==null?1:o.asl),muc=clamp(o.mucus==null?.4:o.mucus),th=clamp(o.thick||0),beat=clamp(o.beat==null?1:o.beat),ph=o.ph||0,rr=rng(o.seed||11);
  const cellTop=y+h*.5,cl=h*.13,aslTop=cellTop-cl*(.3+.8*asl),mucH=h*(.08+.2*muc),mucTop=aslTop-mucH,cw=w/n;
  let g=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="8" style="fill:var(--field)"/>`;
  /* airway surface liquid, then mucus with a wavy top */
  g+=`<rect x="${f1(x)}" y="${f1(aslTop)}" width="${f1(w)}" height="${f1(cellTop-aslTop)}" style="fill:var(--water-soft)"/>`;
  let d=`M${f1(x)} ${f1(aslTop)}`;for(let i=0;i<=24;i++){const u=i/24;d+=`L${f1(x+w*u)} ${f1(mucTop+Math.sin(u*9+ph*2)*h*.012*(1+th))}`}
  d+=`L${f1(x+w)} ${f1(aslTop)}Z`;
  g+=`<path d="${d}" style="fill:var(--mucus);opacity:.9"/><path d="${d}" style="fill:var(--mucus-thick);opacity:${f1(th*.8)}"/>`;
  if(th>.3)for(let i=0;i<5;i++){const xx=x+w*(i+.3+rr()*.4)/5;g+=`<path d="M${f1(xx)} ${f1(mucTop+mucH*.3)}q${f1(cw*.2)} ${f1(mucH*.3)} ${f1(cw*.45)} 0" style="fill:none;stroke:var(--mucus-soft);stroke-width:1.1;opacity:${f1((th-.3)*1.3)}"/>`}
  /* cilia: upright and beating in deep liquid, bent flat when the liquid collapses */
  const cells=[];
  for(let c=0;c<n;c++){const cx=x+cw*(c+.5),k=7;cells.push([cx,cellTop]);
    for(let i=0;i<k;i++){const bx=x+cw*c+cw*(.14+.72*i/(k-1)),wave=Math.sin(ph*6.283*2+bx*.09);
      const tilt=((1-asl)*68+beat*asl*wave*24)*Math.PI/180,len=cl*(.75+.25*asl);
      const ex=bx+Math.sin(tilt)*len,ey=cellTop-Math.cos(tilt)*len,mx=bx+Math.sin(tilt*.5)*len*.5,my=cellTop-Math.cos(tilt*.5)*len*.55;
      g+=`<path d="M${f1(bx)} ${f1(cellTop)}Q${f1(mx)} ${f1(my)} ${f1(ex)} ${f1(ey)}" style="fill:none;stroke:var(--bronchi);stroke-width:1.3;stroke-linecap:round"/>`}}
  /* cells */
  const inf=clamp(o.inflam||0);
  for(let c=0;c<n;c++){const cx0=x+cw*c+1.2,ww=cw-2.4,hh=y+h-cellTop-2;
    g+=`<rect x="${f1(cx0)}" y="${f1(cellTop)}" width="${f1(ww)}" height="${f1(hh)}" rx="5" style="fill:var(--tissue);stroke:var(--airway);stroke-width:1.2"/>`;
    if(inf>0)g+=`<rect x="${f1(cx0)}" y="${f1(cellTop)}" width="${f1(ww)}" height="${f1(hh)}" rx="5" style="fill:var(--inflamed);opacity:${f1(inf*.32)}"/>`;
    g+=`<ellipse cx="${f1(cx0+ww/2)}" cy="${f1(cellTop+hh*.62)}" rx="${f1(ww*.24)}" ry="${f1(hh*.17)}" style="fill:var(--nucleus)"/>`}
  /* CFTR on the top of each cell, ions rising from it */
  if(o.cftr!=null){const f=clamp(o.cftr);cells.forEach(([cx],c)=>{const gp=1+2.4*f;
    g+=`<rect x="${f1(cx-gp/2-4)}" y="${f1(cellTop-3)}" width="4" height="7" rx="1" style="fill:${f>.05?'var(--cftr)':'var(--muted)'};opacity:${f>.05?1:.5}"/><rect x="${f1(cx+gp/2)}" y="${f1(cellTop-3)}" width="4" height="7" rx="1" style="fill:${f>.05?'var(--cftr)':'var(--muted)'};opacity:${f>.05?1:.5}"/>`;
    if(f>.02)for(let i=0;i<3;i++){const u=((i/3+ph*1.5+c*.17)%1+1)%1;g+=ion(cx+Math.sin(u*6+c)*3,cellTop-4-u*(cellTop-aslTop-2),i===2?'hco3':'cl',{r:2.4,op:f*Math.min(1,(1-u)*3)})}})}
  /* bacteria in the mucus */
  const nb=Math.round(clamp(o.bact||0)*9);for(let i=0;i<nb;i++){const bx=x+w*(.06+.88*rr()),by=mucTop+mucH*(.25+.5*rr());g+=bacterium(bx,by,Math.min(13,h*.06),{ang:rr()*160,mucoid:th*.8,flag:false})}
  if(o.move){const m=clamp(o.move),ay=mucTop-7;g+=`<defs>${marker('epMv','var(--muted)')}</defs><path d="M${f1(x+w*.08)} ${f1(ay)}h${f1(w*.22)}" style="stroke:var(--muted);stroke-width:1.4;opacity:${f1(m)}" marker-end="url(#epMv)"/><text x="${f1(x+w*.32)}" y="${f1(ay+3)}" class="t-xs" style="opacity:${f1(m)}">mucus carried along</text>`}
  if(o.labels){const lx=x+w-5,H='fill:var(--ink);font-weight:600;paint-order:stroke;stroke:var(--field);stroke-width:3px;stroke-linejoin:round';g+=`<text x="${f1(lx)}" y="${f1((mucTop+aslTop)/2+3)}" class="t-xs t-end" style="${H};stroke:var(--mucus)">mucus</text><text x="${f1(lx)}" y="${f1(Math.max((aslTop+cellTop)/2+3,aslTop+9))}" class="t-xs t-end" style="${H}">liquid layer</text><text x="${f1(lx-3)}" y="${f1(y+h-6)}" class="t-xs t-end" style="${H};stroke:var(--tissue)">airway cells</text>`}
  return {svg:g,at:{cellTop,aslTop,mucTop,cells}}}
/* lungs: local 200 x 200 box centred on (100,100) */
const LUNG_R='M90 46C72 44 50 62 40 94C30 126 25 158 29 184C50 194 76 192 93 182C97 140 97 92 90 46Z';
const LUNG_L='M110 46C128 44 150 62 160 94C170 126 175 158 171 184C150 194 126 192 112 184C116 168 124 152 113 140C106 120 106 84 110 46Z';
function lungs(x,y,s=1,o={}){const T=(px,py)=>[x+(px-100)*s,y+(py-100)*s],id=o.id||('lg'+Math.round(x)+'_'+Math.round(y)),bx=clamp(o.bx||0),pl=clamp(o.plugs||0),inf=clamp(o.inflam||0),rr=rng(o.seed||21);
  let g=`<g transform="translate(${f1(x-100*s)} ${f1(y-100*s)}) scale(${s})">`;
  g+=`<clipPath id="${id}"><path d="${LUNG_R}"/><path d="${LUNG_L}"/></clipPath>`;
  [['r',LUNG_R],['l',LUNG_L]].forEach(([k,d])=>{g+=`<path d="${d}" style="fill:var(--lung);stroke:var(--bronchi);stroke-width:${f1(1.4/s)};${o.hl&&o.hl!==k?'opacity:.45':''}"/>`;
    if(inf>0)g+=`<path d="${d}" style="fill:var(--inflamed);opacity:${f1(inf*.28)}"/>`});
  g+=`<path d="M58 106Q74 112 92 108M48 142Q70 140 93 150M138 120Q152 128 166 126" style="fill:none;stroke:var(--bronchi);stroke-width:${f1(.9/s)};opacity:.5"/>`;
  /* the bronchial tree */
  const tips=[];let tr='',sac='';
  function br(px,py,a,len,gen,wd){const ex=px+Math.sin(a)*len,ey=py+Math.cos(a)*len,ww=gen>=2?wd*(1+bx*1.3):wd;
    tr+=`<path d="M${f1(px)} ${f1(py)}L${f1(ex)} ${f1(ey)}" style="stroke-width:${f1(ww)}"/>`;
    if(gen>=4){tips.push([ex,ey]);if(bx>.05)sac+=`<circle cx="${f1(ex)}" cy="${f1(ey)}" r="${f1(1+bx*3.2)}"/>`;return}
    const sp=.42+rr()*.12;br(ex,ey,a-sp,len*.74,gen+1,wd*.72);br(ex,ey,a+sp*.9,len*.7,gen+1,wd*.72)}
  br(100,70,-0.62,22,1,4.2);br(100,70,0.66,20,1,4.2);
  g+=`<g clip-path="url(#${id})" style="fill:none;stroke:var(--bronchi);stroke-linecap:round">${tr}<g style="fill:var(--lung);stroke-width:${f1(1.1/s)}">${sac}</g></g>`;
  g+=`<path d="M100 12V70M100 70L86 84M100 70L113 83" style="fill:none;stroke:var(--bronchi);stroke-width:7;stroke-linecap:round"/><path d="M100 14V68" style="fill:none;stroke:var(--airway-soft);stroke-width:3;stroke-linecap:round"/>`;
  for(let i=1;i<6;i++)g+=`<line x1="96.5" x2="103.5" y1="${12+i*9}" y2="${12+i*9}" style="stroke:var(--airway-soft);stroke-width:1.2"/>`;
  if(pl>0){const k=Math.round(pl*tips.length*.5);for(let i=0;i<k;i++){const p=tips[(i*7)%tips.length];g+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="${f1(2.2+bx*1.6)}" style="fill:var(--mucus-thick);stroke:var(--mucus);stroke-width:${f1(.8/s)}"/>`}}
  g+='</g>';
  if(o.labels)g+=`<text x="${f1(T(40,200)[0])}" y="${f1(T(40,204)[1]+8)}" class="t-xs t-mid">right</text><text x="${f1(T(160,200)[0])}" y="${f1(T(160,204)[1]+8)}" class="t-xs t-mid">left</text>`;
  return {svg:g,at:{trachea:T(100,20),carina:T(100,70),r:T(62,130),l:T(140,130),tips:tips.map(p=>T(p[0],p[1]))}}}
/* pancreas: local 200 x 100 box, (x,y) its top left */
const PANC='M24 62C14 44 30 26 52 30C80 36 110 31 140 25C165 20 188 24 191 36C193 48 173 53 150 55C121 59 97 65 77 75C57 86 32 82 24 62Z';
const PANC_DUCT=[[38,60],[60,54],[90,47],[120,42],[150,38],[178,36]];
function pancreas(x,y,s=1,o={}){const T=(px,py)=>[x+px*s,y+py*s],bl=clamp(o.block||0),fl=clamp(o.flow||0),ph=o.ph||0,fib=clamp(o.fib||0),rr=rng(o.seed||31);
  let g=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})">`;
  g+=`<path d="M30 6C2 22 2 82 32 98" style="fill:none;stroke:var(--gut);stroke-width:13;stroke-linecap:round"/><path d="M30 6C2 22 2 82 32 98" style="fill:none;stroke:var(--airway);stroke-width:1;opacity:.6"/>`;
  g+=`<path d="${PANC}" style="fill:var(--pancreas);stroke:var(--duct);stroke-width:${f1(1.2/s)}"/>`;
  for(let i=0;i<16;i++){const px=40+rr()*140,py=34+rr()*20-(px-40)*.08;g+=`<circle cx="${f1(px)}" cy="${f1(py+(i%2?8:-2))}" r="2.4" style="fill:var(--enzyme);opacity:${f1(.35+bl*.45)}"/>`}
  if(o.islets){const a=o.islets===true?1:clamp(o.islets);[[70,44],[112,40],[150,34],[96,52]].forEach(p=>{g+=`<circle cx="${p[0]}" cy="${p[1]}" r="3.6" style="fill:var(--panel);stroke:var(--bicarb);stroke-width:1.2;opacity:${f1(a)}"/>`})}
  const dd=ptsD(PANC_DUCT)+'L14 62';
  g+=`<path d="${dd}" style="fill:none;stroke:var(--duct);stroke-width:4;stroke-linecap:round;stroke-linejoin:round"/><path d="${dd}" style="fill:none;stroke:var(--gut);stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round"/>`;
  if(bl>0)[[150,38],[110,43.5],[70,52]].forEach((p,i)=>{if(bl>i/3)g+=`<ellipse cx="${p[0]}" cy="${p[1]}" rx="${f1(5*Math.min(1,(bl-i/3)*3))}" ry="3.2" style="fill:var(--mucus-thick)"/>`});
  if(fl>0){const pts=[...PANC_DUCT].reverse().concat([[14,62]]),N=7;for(let i=0;i<N;i++){const u=((i/N+ph)%1+1)%1,stop=bl>0?1-bl*.85:1;if(u>stop)continue;
      const f=u*(pts.length-1),k=Math.min(pts.length-2,Math.floor(f)),v=f-k,p=[lerp(pts[k][0],pts[k+1][0],v),lerp(pts[k][1],pts[k+1][1],v)];
      g+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="2.2" style="fill:var(--enzyme);opacity:${f1(fl)}"/>`}}
  if(fib>0){let hd='';for(let i=0;i<14;i++){const px=36+i*11;hd+=`M${px} 30l-10 34`}g+=`<clipPath id="pf${Math.round(x)}"><path d="${PANC}"/></clipPath><path d="${hd}" clip-path="url(#pf${Math.round(x)})" style="stroke:var(--duct);stroke-width:1.2;opacity:${f1(fib*.7)}"/>`}
  g+='</g>';
  if(o.labels)g+=`<text x="${f1(T(30,104)[0])}" y="${f1(T(30,104)[1]+6)}" class="t-xs t-mid">gut (duodenum)</text><text x="${f1(T(120,70)[0])}" y="${f1(T(120,70)[1]+6)}" class="t-xs">pancreas</text>`;
  return {svg:g,at:{head:T(40,58),tail:T(182,36),exit:T(14,62)}}}
function sweatGland(x,y,s=1,o={}){const cf=clamp(o.cf||0),ph=o.ph||0,salt=clamp(o.salt==null?cf:o.salt),T=(px,py)=>[x+px*s,y+py*s];
  let g=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})">`;
  g+=`<rect x="-50" y="0" width="100" height="16" style="fill:var(--skin)"/><rect x="-50" y="16" width="100" height="144" style="fill:var(--tissue);opacity:.7"/><line x1="-50" x2="50" y1="0" y2="0" style="stroke:var(--muted);stroke-width:1"/>`;
  g+=`<path d="M0 0V112" style="fill:none;stroke:var(--airway);stroke-width:8;stroke-linecap:round"/><path d="M0 2V112" style="fill:none;stroke:var(--water-soft);stroke-width:4"/>`;
  g+=`<path d="M0 112C-22 112 -24 132 -8 134C10 136 14 120 2 118C-12 116 -16 146 6 146C26 146 24 124 12 126" style="fill:none;stroke:var(--airway);stroke-width:8;stroke-linecap:round"/>`;
  for(let i=0;i<5;i++){const u=((i/5+ph)%1+1)%1;g+=ion(0,lerp(124,4,u),'h2o',{r:2.6,op:Math.min(1,(1-u)*4)})}
  /* salt reabsorption along the duct: ions leave sideways when CFTR works */
  for(let i=0;i<4;i++){const yy=30+i*20,u=((ph*2+i*.27)%1+1)%1,k=1-cf;g+=ion(-5-u*22,yy,'na',{r:2.4,op:k*(1-u)})+ion(5+u*22,yy+6,'cl',{r:2.4,op:k*(1-u)})}
  if(salt>0)for(let i=0;i<6;i++){const sx=-34+i*13+(i%2)*3,sz=3+(i%3);g+=`<path d="M${sx} ${f1(-sz*1.4)}l${sz} ${sz}l${-sz} ${sz}l${-sz} ${-sz}Z" transform="translate(0 ${f1(-1)})" style="fill:var(--salt);stroke:var(--salt-edge);stroke-width:.8;opacity:${f1(salt)}"/>`}
  g+='</g>';
  if(o.labels)g+=`<text x="${f1(T(52,8)[0])}" y="${f1(T(52,8)[1])}" class="t-xs">skin</text><text x="${f1(T(10,70)[0])}" y="${f1(T(10,70)[1])}" class="t-xs">duct</text><text x="${f1(T(30,140)[0])}" y="${f1(T(30,140)[1])}" class="t-xs">gland</text>`;
  return {svg:g,at:{coil:T(0,132),pore:T(0,0)}}}
function chrom(x,y,h,o={}){const w=o.w||h*.16,cy=y+h*.38,r=w/2;
  let g=`<path d="M${f1(x-r)} ${f1(y+r)}A${f1(r)} ${f1(r)} 0 0 1 ${f1(x+r)} ${f1(y+r)}V${f1(cy-r*.6)}Q${f1(x+r*.35)} ${f1(cy)} ${f1(x+r)} ${f1(cy+r*.6)}V${f1(y+h-r)}A${f1(r)} ${f1(r)} 0 0 1 ${f1(x-r)} ${f1(y+h-r)}V${f1(cy+r*.6)}Q${f1(x-r*.35)} ${f1(cy)} ${f1(x-r)} ${f1(cy-r*.6)}Z" style="fill:var(--panel-2);stroke:var(--ink);stroke-width:1.2"/>`;
  [.12,.22,.5,.6,.7,.84].forEach((b,i)=>{const by=y+h*b;g+=`<rect x="${f1(x-r+1)}" y="${f1(by)}" width="${f1(w-2)}" height="${f1(h*(i%2?.04:.06))}" style="fill:var(--muted);opacity:.45"/>`});
  if(o.band!=null){const by=y+h*clamp(o.band);g+=`<rect x="${f1(x-r-3)}" y="${f1(by-2.5)}" width="${f1(w+6)}" height="5" rx="2" style="fill:var(--variant)"/>`}
  if(o.label)g+=`<text x="${f1(x)}" y="${f1(y+h+14)}" class="t-xs t-mid">${o.label}</text>`;
  return g}
function geneStrip(x,y,w,o={}){const n=o.n||27,hh=o.h||14,rr=rng(o.seed||27),z=clamp(o.zoom||0);const ws=[];let tot=0;
  for(let i=0;i<n;i++){const v=.6+rr()*.9+(o.mark===i?z*4:0);ws.push(v);tot+=v}
  const gap=w*.35/(n+1),scale=(w-gap*(n+1))/tot,X=[];let s=`<line x1="${f1(x)}" x2="${f1(x+w)}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:var(--muted);stroke-width:1.4"/>`,cx=x+gap;
  for(let i=0;i<n;i++){const ew=ws[i]*scale,on=o.mark===i;X.push(cx+ew/2);
    s+=`<rect x="${f1(cx)}" y="${f1(y-hh/2)}" width="${f1(ew)}" height="${f1(hh)}" rx="2" style="fill:${on?'var(--dna)':'var(--panel-2)'};stroke:var(--dna);stroke-width:1"/>`;cx+=ew+gap}
  if(o.mark!=null){const mx=X[o.mark];s+=`<path d="M${f1(mx-5)} ${f1(y-hh/2-11)}h10l-5 7z" style="fill:var(--variant)"/>`;
    if(o.label)s+=`<text x="${f1(mx)}" y="${f1(y-hh/2-15)}" class="t-xs t-mid" style="fill:var(--ink);font-weight:600">${o.label}</text>`}
  return {svg:s,X:i=>X[i],y}}
function spiro(x,y,w,h,o={}){const mode=o.mode||'vt',ratio=clamp(o.ratio==null?.8:o.ratio,.2,.97),fvc=clamp(o.fvc==null?.85:o.fvc),up=clamp(o.upto==null?1:o.upto),col=o.col||'var(--dx)';
  const tau=-1/Math.log(1-ratio),V=t=>fvc*(1-Math.exp(-t/tau))/(1-Math.exp(-6/tau)),T=6;
  let s=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" style="fill:var(--field)"/><line x1="${f1(x)}" x2="${f1(x+w)}" y1="${f1(y+h)}" y2="${f1(y+h)}" class="axis"/><line x1="${f1(x)}" x2="${f1(x)}" y1="${f1(y)}" y2="${f1(y+h)}" class="axis"/>`;
  let d='',fev1=null,fv=null;const N=120;
  if(mode==='vt'){const X=t=>x+w*t/T,Y=v=>y+h-h*v;
    for(let i=0;i<=N*up;i++){const t=T*i/N;d+=(i?'L':'M')+f1(X(t))+' '+f1(Y(V(t)))}
    fev1=[X(1),Y(V(1))];fv=[X(T),Y(V(T))];
    s+=`<text x="${f1(x+w-3)}" y="${f1(y+h+13)}" class="t-xs t-end">time</text><text x="${f1(x+4)}" y="${f1(y+10)}" class="t-xs">volume</text>`;
    if(o.marks!==false&&up*T>=1)s+=`<path d="M${f1(fev1[0])} ${f1(y+h)}V${f1(fev1[1])}H${f1(x)}" style="fill:none;stroke:${col};stroke-width:1;stroke-dasharray:3 3"/><text x="${f1(fev1[0]+4)}" y="${f1(fev1[1]+12)}" class="t-xs" style="fill:var(--ink);font-weight:600">FEV1</text><text x="${f1(fev1[0])}" y="${f1(y+h+13)}" class="t-xs t-mid">1 s</text>`;
    if(o.marks!==false&&up>.98)s+=`<line x1="${f1(x)}" x2="${f1(x+w)}" y1="${f1(fv[1])}" y2="${f1(fv[1])}" style="stroke:var(--muted);stroke-width:1;stroke-dasharray:2 4"/><text x="${f1(x+w-4)}" y="${f1(fv[1]-4)}" class="t-xs t-end" style="fill:var(--ink);font-weight:600">FVC</text>`}
  else{/* flow-volume: a fast rise to peak flow, then a fall that is straight when ratio is high and scooped when low */
    const X=v=>x+w*v,pk=.92*fvc,vp=fvc*.12,sc=clamp((.8-ratio)*2.4);
    const F=v=>v<vp?pk*Math.sin(Math.PI/2*v/vp):pk*Math.pow(clamp((fvc-v)/(fvc-vp)),1+sc*1.6),Y=f=>y+h-h*f;
    for(let i=0;i<=N*up;i++){const v=fvc*i/N;d+=(i?'L':'M')+f1(X(v))+' '+f1(Y(F(v)))}
    fev1=[X(V(1)),Y(F(V(1)))];fv=[X(fvc),y+h];
    s+=`<text x="${f1(x+w-3)}" y="${f1(y+h+13)}" class="t-xs t-end">volume</text><text x="${f1(x+4)}" y="${f1(y+10)}" class="t-xs">flow</text>`;
    if(o.marks!==false&&up>.98)s+=`<text x="${f1(fv[0])}" y="${f1(y+h-5)}" class="t-xs t-mid" style="fill:var(--ink);font-weight:600">FVC</text>`}
  s+=`<path d="${d}" style="fill:none;stroke:${col};stroke-width:2.6;stroke-linejoin:round;stroke-linecap:round"/>`;
  return {svg:s,fev1,fvc:fv}}
function punnett(x,y,s,o={}){const a=o.a||['N','v'],b=o.b||['N','v'],va=o.va||'v',sh=clamp(o.show==null?1:o.show),L=Object.assign({cf:'CF',carrier:'carrier',none:'neither'},o.lbl||{});
  const hs=s*.55,n={cf:0,carrier:0,none:0},C=[];let g='';
  const al=(cx,cy,t)=>`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(hs*.36)}" style="fill:${t===va?'var(--variant)':'var(--panel)'};stroke:var(--ink);stroke-width:1.2"/><text x="${f1(cx)}" y="${f1(cy+4)}" class="t-mid" style="font:700 11px var(--mono);fill:${t===va?'var(--panel)':'var(--ink)'}">${t}</text>`;
  a.forEach((t,i)=>{g+=al(x+hs/2,y+hs+s*(i+.5),t)});b.forEach((t,j)=>{g+=al(x+hs+s*(j+.5),y+hs/2,t)});
  for(let i=0;i<2;i++)for(let j=0;j<2;j++){const k=i*2+j,cx=x+hs+s*j,cy=y+hs+s*i,v=(a[i]===va)+(b[j]===va),key=v===2?'cf':v===1?'carrier':'none';n[key]++;C.push([cx+s/2,cy+s/2]);
    const vis=clamp(sh*4-k),cid='pn'+Math.round(cx)+'_'+Math.round(cy);
    g+=`<rect x="${f1(cx+2)}" y="${f1(cy+2)}" width="${f1(s-4)}" height="${f1(s-4)}" rx="8" style="fill:var(--panel);stroke:${o.hl===k?'var(--ink)':'var(--line)'};stroke-width:${o.hl===k?2.2:1.2}"/>`;
    if(vis>0){if(v===2)g+=`<rect x="${f1(cx+2)}" y="${f1(cy+2)}" width="${f1(s-4)}" height="${f1(s-4)}" rx="8" style="fill:var(--variant);opacity:${f1(.85*vis)}"/>`;
      if(v===1)g+=`<clipPath id="${cid}"><rect x="${f1(cx+2)}" y="${f1(cy+2)}" width="${f1((s-4)/2)}" height="${f1(s-4)}"/></clipPath><rect x="${f1(cx+2)}" y="${f1(cy+2)}" width="${f1(s-4)}" height="${f1(s-4)}" rx="8" clip-path="url(#${cid})" style="fill:var(--variant);opacity:${f1(.45*vis)}"/>`;
      g+=`<text x="${f1(cx+s/2)}" y="${f1(cy+s/2-2)}" class="t-mid" style="font:700 12px var(--mono);fill:${v===2?'var(--panel)':'var(--ink)'};opacity:${f1(vis)}">${a[i]}${b[j]}</text><text x="${f1(cx+s/2)}" y="${f1(cy+s/2+12)}" class="t-xs t-mid" style="fill:${v===2?'var(--panel)':'var(--ink)'};opacity:${f1(vis)}">${L[key]}</text>`}}
  return {svg:g,cell:i=>C[i],n}}
function capsule(x,y,s=30,o={}){const op=clamp(o.open||0),col=o.col||'var(--enzyme)',r=s*.22,sep=op*s*.35,rr=rng(7);
  let g=`<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.ang||0)})">`;
  if(op>0)for(let i=0;i<9;i++){const a=rr()*6.28,d=op*s*(.2+rr()*.4);g+=`<circle cx="${f1(Math.cos(a)*d)}" cy="${f1(Math.sin(a)*d*.7)}" r="${f1(s*.05)}" style="fill:${col};opacity:${f1(.4+.6*op)}"/>`}
  g+=`<path d="M${f1(-sep/2)} ${f1(-r)}H${f1(-s/2+r-sep/2)}A${f1(r)} ${f1(r)} 0 0 0 ${f1(-s/2+r-sep/2)} ${f1(r)}H${f1(-sep/2)}Z" style="fill:${col};stroke:var(--ink);stroke-width:1"/>`;
  g+=`<path d="M${f1(sep/2)} ${f1(-r)}H${f1(s/2-r+sep/2)}A${f1(r)} ${f1(r)} 0 0 1 ${f1(s/2-r+sep/2)} ${f1(r)}H${f1(sep/2)}Z" style="fill:var(--pill);stroke:var(--ink);stroke-width:1"/>`;
  if(op<.2)for(let i=0;i<4;i++)g+=`<circle cx="${f1(s*.08+i*s*.08)}" cy="${f1((i%2?-1:1)*r*.3)}" r="${f1(s*.04)}" style="fill:${col};opacity:.7"/>`;
  return g+'</g>'}
function smoothPath(P,closed=true){const n=P.length;let d=`M${f1(P[0][0])} ${f1(P[0][1])}`;
  for(let i=0;i<(closed?n:n-1);i++){const p0=P[(i-1+n)%n],p1=P[i],p2=P[(i+1)%n],p3=P[(i+2)%n];
    const c1=[p1[0]+(p2[0]-p0[0])/6,p1[1]+(p2[1]-p0[1])/6],c2=[p2[0]-(p3[0]-p1[0])/6,p2[1]-(p3[1]-p1[1])/6];
    d+=`C${f1(c1[0])} ${f1(c1[1])} ${f1(c2[0])} ${f1(c2[1])} ${f1(p2[0])} ${f1(p2[1])}`}
  return d+(closed?'Z':'')}
function inPoly(p,P){let c=false;for(let i=0,j=P.length-1;i<P.length;j=i++){const a=P[i],b=P[j];if((a[1]>p[1])!==(b[1]>p[1])&&p[0]<(b[0]-a[0])*(p[1]-a[1])/(b[1]-a[1])+a[0])c=!c}return c}
const ptsD=P=>P.map((p,i)=>(i?'L':'M')+f1(p[0])+' '+f1(p[1])).join('');
/* sample a chain of cubic Bezier segments [[p0,c1,c2,p1],...] into points */
function bezPts(segs,N=22){const out=[];segs.forEach((g,j)=>{for(let i=j?1:0;i<=N;i++){const t=i/N,m=1-t;
  out.push([m*m*m*g[0][0]+3*m*m*t*g[1][0]+3*m*t*t*g[2][0]+t*t*t*g[3][0],m*m*m*g[0][1]+3*m*m*t*g[1][1]+3*m*t*t*g[2][1]+t*t*t*g[3][1]])}});return out}
function monoFn(P){const n=P.length,dx=[],m=[],t=[];for(let i=0;i<n-1;i++){dx[i]=P[i+1][0]-P[i][0];m[i]=(P[i+1][1]-P[i][1])/dx[i]}
  t[0]=m[0];t[n-1]=m[n-2];for(let i=1;i<n-1;i++)t[i]=m[i-1]*m[i]<=0?0:3*(dx[i-1]+dx[i])/((2*dx[i]+dx[i-1])/m[i-1]+(dx[i]+2*dx[i-1])/m[i]);
  return v=>{if(v<=P[0][0])return P[0][1];if(v>=P[n-1][0])return P[n-1][1];let i=0;while(v>P[i+1][0])i++;const h=dx[i],u=(v-P[i][0])/h,u2=u*u,u3=u2*u;
    return (2*u3-3*u2+1)*P[i][1]+(u3-2*u2+u)*h*t[i]+(-2*u3+3*u2)*P[i+1][1]+(u3-u2)*h*t[i+1]}}
function clock(cx,cy,r,min,o={}){const full=o.full||60,u=clamp(min/full),col=o.col||'var(--brand)',A=v=>(v*360-90)*Math.PI/180,n=o.ticks||12;
  let s=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r)}" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.6"/>`;
  if(u>0){const a=A(u),large=u>.5?1:0;s+=u>=.999?`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r-3)}" style="fill:${col};opacity:.22"/>`:`<path d="M${f1(cx)} ${f1(cy)}L${f1(cx)} ${f1(cy-r+3)}A${f1(r-3)} ${f1(r-3)} 0 ${large} 1 ${f1(cx+(r-3)*Math.cos(a))} ${f1(cy+(r-3)*Math.sin(a))}Z" style="fill:${col};opacity:.22"/>`}
  for(let i=0;i<n;i++){const a=A(i/n);s+=`<line x1="${f1(cx+Math.cos(a)*r*.8)}" y1="${f1(cy+Math.sin(a)*r*.8)}" x2="${f1(cx+Math.cos(a)*r*.93)}" y2="${f1(cy+Math.sin(a)*r*.93)}" style="stroke:var(--muted);stroke-width:${i%3?1:1.8}"/>`}
  const mA=A((min%60)/60),hA=A((((o.h0||0)*60+min)/60%12)/12);
  s+=`<line x1="${f1(cx)}" y1="${f1(cy)}" x2="${f1(cx+Math.cos(hA)*r*.5)}" y2="${f1(cy+Math.sin(hA)*r*.5)}" style="stroke:var(--ink);stroke-width:2.6;stroke-linecap:round"/><line x1="${f1(cx)}" y1="${f1(cy)}" x2="${f1(cx+Math.cos(mA)*r*.78)}" y2="${f1(cy+Math.sin(mA)*r*.78)}" style="stroke:${col};stroke-width:1.8;stroke-linecap:round"/><circle cx="${f1(cx)}" cy="${f1(cy)}" r="2.6" style="fill:var(--ink)"/>`;
  if(o.label)s+=`<text x="${f1(cx)}" y="${f1(cy+r+15)}" class="t-xs t-mid">${o.label}</text>`;
  return s}
function icons(x,y,o={}){const n=o.n||100,c=o.cols||10,sz=o.size||12,gp=o.gap==null?3:o.gap,k=o.k||0,col=o.col||'var(--brand)',base=o.base||'var(--line)';
  const at=i=>[x+(i%c)*(sz+gp),y+Math.floor(i/c)*(sz+gp*1.4)];let s='';
  for(let i=0;i<n;i++){const[px,py]=at(i),f=i<k?col:base;s+=o.shape==='dot'?`<circle cx="${f1(px+sz/2)}" cy="${f1(py+sz/2)}" r="${f1(sz*.42)}" style="fill:${f}"/>`:person(px+sz/2,py,sz,f)}
  return {svg:s,h:Math.ceil(n/c)*(sz+gp*1.4),at}}
function curve(x,y,w,h,f,o={}){const x0=o.x0||0,x1=o.x1==null?1:o.x1,y0=o.y0||0,y1=o.y1==null?1:o.y1,up=o.upto==null?x1:clamp(o.upto,x0,x1),col=o.col||'var(--brand)';
  const X=v=>x+w*(v-x0)/(x1-x0),Y=v=>y+h-h*(clamp(v,y0-(y1-y0)*.02,y1+(y1-y0)*.02)-y0)/(y1-y0),at=v=>[X(v),Y(f(v))];
  let s=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" style="fill:var(--field)"/>`;
  (o.bands||[]).forEach(b=>{const ya=Y(Math.min(b.to,y1)),yb=Y(Math.max(b.from,y0));s+=`<rect x="${f1(x)}" y="${f1(ya)}" width="${f1(w)}" height="${f1(Math.max(0,yb-ya))}" style="fill:${b.col};opacity:.18"/>`;
    if(b.label)s+=`<text x="${f1(x+w-4)}" y="${f1(ya+11)}" class="t-xs t-end">${b.label}</text>`});
  s+=`<line x1="${f1(x)}" x2="${f1(x+w)}" y1="${f1(y+h)}" y2="${f1(y+h)}" class="axis"/><line x1="${f1(x)}" x2="${f1(x)}" y1="${f1(y)}" y2="${f1(y+h)}" class="axis"/>`;
  if(up>x0){const N=Math.max(2,Math.round(160*(up-x0)/(x1-x0)));let d='';for(let i=0;i<=N;i++){const p=at(x0+(up-x0)*i/N);d+=(i?'L':'M')+f1(p[0])+' '+f1(p[1])}
    if(o.fill)s+=`<path d="${d}L${f1(X(up))} ${f1(y+h)}L${f1(X(x0))} ${f1(y+h)}Z" style="fill:${col};opacity:.18"/>`;
    s+=`<path d="${d}" style="fill:none;stroke:${col};stroke-width:${o.lw||2.6};stroke-linejoin:round;stroke-linecap:round${o.dash?';stroke-dasharray:'+o.dash:''}"/>`;
    if(o.dot){const p=at(up);s+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="5" style="fill:${col};stroke:var(--panel);stroke-width:2"/>`}}
  return {svg:s,X,Y,at}}
function tline(x,y,w,o={}){const mn=o.min||0,mx=o.max==null?1:o.max,st=o.step||(mx-mn)/5,fmt=o.fmt||(v=>v),X=v=>x+w*(v-mn)/(mx-mn);
  let s=`<line x1="${f1(x)}" x2="${f1(x+w)}" y1="${f1(y)}" y2="${f1(y)}" class="axis"/>`;
  for(let v=mn;v<=mx+1e-9;v+=st){const xx=X(v);s+=`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${f1(y-4)}" y2="${f1(y+4)}" class="axis"/><text x="${f1(xx)}" y="${f1(o.big?y-8:y+16)}" class="t-xs t-mid">${fmt(v)}</text>`}
  if(o.label)s+=`<text x="${f1(x+w)}" y="${f1(o.big?y+16:y+30)}" class="t-xs t-end">${o.label}</text>`;
  return {svg:s,X}}
function gauge(cx,cy,r,v,max,o={}){const A=u=>Math.PI*(1-clamp(u)),P=(u,rr)=>[cx+rr*Math.cos(A(u)),cy-rr*Math.sin(A(u))],arc=(u0,u1,rr)=>{const p0=P(u0,rr),p1=P(u1,rr);return `M${f1(p0[0])} ${f1(p0[1])}A${f1(rr)} ${f1(rr)} 0 0 1 ${f1(p1[0])} ${f1(p1[1])}`};
  const rw=r*.2;let s=`<path d="${arc(0,1,r-rw/2)}" style="fill:none;stroke:var(--panel-2);stroke-width:${f1(rw)}"/>`;let u0=0;
  (o.bands||[]).forEach(b=>{const u1=clamp(b.to/max);s+=`<path d="${arc(u0,u1,r-rw/2)}" style="fill:none;stroke:${b.col};stroke-width:${f1(rw)};opacity:.75"/>`;u0=u1});
  const u=clamp(v/max),p=P(u,r-rw-4);s+=`<line x1="${f1(cx)}" y1="${f1(cy)}" x2="${f1(p[0])}" y2="${f1(p[1])}" style="stroke:var(--ink);stroke-width:2.6;stroke-linecap:round"/><circle cx="${f1(cx)}" cy="${f1(cy)}" r="4" style="fill:var(--ink)"/>`;
  s+=`<text x="${f1(cx-r)}" y="${f1(cy+14)}" class="t-xs t-mid">0</text><text x="${f1(cx+r)}" y="${f1(cy+14)}" class="t-xs t-mid">${max}</text>`;
  if(o.big)s+=`<text x="${f1(cx)}" y="${f1(cy-r*.32)}" class="t-big t-mid" style="font-size:${f1(r*.38)}px">${Math.round(v)}</text>`;
  if(o.label)s+=`<text x="${f1(cx)}" y="${f1(cy+16)}" class="t-sm t-mid">${o.label}</text>`;
  return s}
function ladder(x,y,w,h,steps,o={}){const n=steps.length,sw=w/n,sh=h/n,at=o.at==null?-1:o.at,col=o.col||'var(--rx)';let s='';
  const top=i=>[x+sw*(i+.5),y+h-sh*(i+1)];
  steps.forEach((t,i)=>{const sx=x+sw*i,sy=y+h-sh*(i+1),on=i===at,done=o.done&&i<at;
    s+=`<rect x="${f1(sx)}" y="${f1(sy)}" width="${f1(sw-3)}" height="${f1(sh*(i+1))}" rx="6" style="fill:${on?col:done?'var(--rx-soft)':'var(--panel-2)'};stroke:${on?col:'var(--line)'};stroke-width:1.2;opacity:${on||done?1:.9}"/>`;
    s+=`<text x="${f1(sx+(sw-3)/2)}" y="${f1(sy+16)}" class="t-xs t-mid" style="fill:${on?'var(--on-brand)':'var(--ink)'}">${t}</text>`});
  return {svg:s,top}}
function pill(x,y,s=30,o={}){const col=o.col||'var(--rx)',r=s*.22;let g=`<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.ang||0)})">`;
  if(o.round)g+=`<circle r="${f1(s/2)}" style="fill:var(--pill);stroke:${col};stroke-width:1.6"/><line x1="${f1(-s*.3)}" x2="${f1(s*.3)}" y1="0" y2="0" style="stroke:${col};stroke-width:1.2;opacity:.6"/>`;
  else g+=`<rect x="${f1(-s/2)}" y="${f1(-r)}" width="${f1(s)}" height="${f1(2*r)}" rx="${f1(r)}" style="fill:var(--pill);stroke:${col};stroke-width:1.6"/><path d="M0 ${f1(-r)}V${f1(r)}H${f1(s/2-r)}A${f1(r)} ${f1(r)} 0 0 0 ${f1(s/2-r)} ${f1(-r)}Z" style="fill:${col};opacity:.75"/>`;
  if(o.txt)g+=`<text x="${o.round?0:f1(-s/4)}" y="${f1(r*.42)}" class="t-mid" style="font:700 ${f1(r*1.05)}px var(--mono);fill:var(--ink)">${o.txt}</text>`;
  return g+'</g>'}
function person(x,y,s=14,fill='var(--muted)',o={}){const r=s*.17;return `<g transform="translate(${f1(x)} ${f1(y)})" style="opacity:${o.op==null?1:o.op}"><circle cx="0" cy="${f1(r)}" r="${f1(r)}" style="fill:${fill}"/><path d="M${f1(-s*.26)} ${f1(s)}V${f1(s*.6)}Q${f1(-s*.26)} ${f1(s*.4)} 0 ${f1(s*.4)}Q${f1(s*.26)} ${f1(s*.4)} ${f1(s*.26)} ${f1(s*.6)}V${f1(s)}Z" style="fill:${fill}"/></g>`}
function ped(x,y,sex='m',aff=0,o={}){const r=o.r||11;let g='';const sh=sex==='m'?`<rect x="${f1(x-r)}" y="${f1(y-r)}" width="${2*r}" height="${2*r}" rx="1.5"`:`<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}"`;
  g+=`${sh} style="fill:${aff>=1?'var(--ink)':'var(--panel)'};stroke:var(--ink);stroke-width:1.5"/>`;
  if(aff>0&&aff<1){const cid='pc'+Math.round(x)+'_'+Math.round(y);g+=`<clipPath id="${cid}"><rect x="${f1(x-r)}" y="${f1(y-r)}" width="${r}" height="${2*r}"/></clipPath>${sh} clip-path="url(#${cid})" style="fill:var(--variant);stroke:none"/>${sh} style="fill:none;stroke:var(--ink);stroke-width:1.5"/>`}
  if(o.dead)g+=`<line x1="${f1(x-r*1.3)}" y1="${f1(y+r*1.3)}" x2="${f1(x+r*1.3)}" y2="${f1(y-r*1.3)}" style="stroke:var(--ink);stroke-width:1.4"/>`;
  if(o.proband)g+=`<path d="M${f1(x-r*2.2)} ${f1(y+r*1.9)}L${f1(x-r*1.15)} ${f1(y+r*.95)}" style="stroke:var(--ink);stroke-width:1.6" marker-end="url(#pedArrow)"/>`;
  return g}
