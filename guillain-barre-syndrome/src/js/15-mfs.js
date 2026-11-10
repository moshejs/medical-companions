/* =============== 1.5 Miller Fisher syndrome and other variants =============== */
/* Main scene: one course of MFS against a day axis (the first two weeks stretched): body, eyes close-up,
   triad status rows, then why the eyes and balance (anatomy), and a Gantt of the published medians.
   Second scene: the 60 people of Sekiguchi 2016, by overlap. Numbers from research pass C. */
const MF_STEPS=[
 {from:0,at:.06,k:'Before onset',t:'An infection, then anti-GQ1b antibodies',
  txt:'In the first report, IgG against the ganglioside GQ1b was raised early in all 6 people with typical MFS, fell with time, and was absent in controls, including people with GBS [[Chiba1992]]. Positivity differs by series: 95% (18 of 19) [[Chiba1993]], 81% (13 of 16) [[Yuki1993GQ1b]] and 83% of 466 people with Fisher syndrome, of whom 21% had recent <i>Campylobacter jejuni</i> [[Ito2008]].',
  pt:'Many people have an infection first. The immune system then makes antibodies that also stick to the nerves that move the eyes and to nerve cells that sense body position.',
  hook:'Fisher syndrome antibody: anti-GQ1b, cross-reacting with GT1a [[Chiba1993]].'},
 {from:.17,at:.21,k:'Days 0 to 3',t:'The triad: eyes, balance, reflexes',
  txt:'MFS is defined by ophthalmoplegia, ataxia and areflexia. In 50 consecutive people, pupil abnormalities, drooping eyelids (ptosis) and facial palsy were frequent, while sensory loss was unusual despite profound ataxia [[Mori2001MFS]]. Its estimated share of the GBS spectrum is 5–25% [[Leonhard2019]].',
  pt:'Miller Fisher syndrome affects the eyes, balance and reflexes. Eye movements are weak, walking is unsteady and reflexes are missing.',
  hook:'Triad of MFS: ophthalmoplegia, ataxia, areflexia [[Mori2001MFS]].'},
 {from:.24,at:.3,k:'Days 0 to 7',t:'The first week: watch for spread',
  txt:'In 60 consecutive people who began with the triad alone, half stayed pure and half overlapped: with pharyngeal-cervical-brachial weakness in 23%, conventional GBS in 15% and Bickerstaff brainstem encephalitis in 12%. The overlaps began at a median of day 5, 3 and 3, and every one within 7 days [[Sekiguchi2016]]. In a Dutch cohort, 10 of 23 (43%) developed limb weakness, all in the first week, with no early predictor [[Verboon2017MFS]]. Overlap needed ventilation in 24% of one series [[Funakoshi2009]].',
  pt:'Miller Fisher syndrome can spread to the arms, legs, swallowing or breathing in the first week. That is why doctors watch closely at first.',
  hook:'Fisher overlap occurs in the first week: monitor at least 7 days [[Sekiguchi2016,Verboon2017MFS]].'},
 {from:.36,at:.42,k:'Why these signs',t:'Why the eyes and balance',
  txt:'A monoclonal anti-GQ1b antibody stained the paranodal regions of the human oculomotor, trochlear and abducens nerves, and oculomotor nerve contained more GQ1b than spinal roots; every anti-GQ1b serum also reacted with GT1a [[Chiba1993]]. The other lesion site is the group Ia neurons in the dorsal root ganglion: ataxia and areflexia reflect an impaired proprioceptive afferent system [[Kuwabara2017]]. Anti-GQ1b was found in 5 of 6 people with GBS and ophthalmoplegia, and in none of 23 without it [[Chiba1993]].',
  pt:'The antibodies stick to the nerves that move the eyes, and to nerve cells that tell the brain where the body is. That is why the eyes and balance are hit.',
  hook:'MFS lesion sites: the oculomotor nerves and group Ia neurons in the dorsal root ganglion [[Kuwabara2017]].'},
 {from:.5,at:.6,k:'About a month',t:'The antibody fades, then balance returns',
  txt:'Antibody titres peak at clinical presentation and can be undetectable as early as about one month after onset, so a late sample may miss them [[Overell2007]]. In an untreated series of 28 (Mori, as summarised by Cochrane), ataxia had gone at a median of 32 days, with a range of 8 to 271 [[Overell2007]].',
  pt:'The antibody level falls over weeks. In the published series, balance came back before eye movements did.',
  hook:'Timing matters: anti-GQ1b titres peak at presentation and can be undetectable by about one month [[Overell2007]].'},
 {from:.76,at:.88,k:'Months 2 to 6',t:'Eye movements return',
  txt:'In the same untreated series, ophthalmoplegia had gone at a median of 88 days, with a range of 29 to 165 [[Overell2007]]. In a later cohort of 92, 96% (89 people) had complete remission of ophthalmoplegia and ataxia at one year, with no deaths recorded [[Overell2007]]. Most people with pure MFS recover completely without treatment within 6 months [[Leonhard2019]].',
  pt:'Most people with Miller Fisher syndrome recover fully, usually within 6 months. These numbers describe groups of people. They cannot tell you exactly what will happen to you.',
  hook:'Untreated MFS: ataxia gone at a median 32 days, ophthalmoplegia at 88 days [[Overell2007]].'}
];
const MF_TX={eyesT:'Eye movements',eyesS:'following a moving target',chart:'Days from onset',band:'first week: when overlap began',
  ab:'anti-GQ1b IgG (schematic shape, no scale)',atx:'Ataxia: gone at a median of 32 days',oph:'Eye movements: weak until a median of 88 days',
  abGone:['antibody can be undetectable','by about one month'],axis:'first two weeks stretched',before:'before onset',dayFmt:n=>`day ${n}`,
  rows:[['Eyes','normal','movements limited','moving again'],['Balance','steady','unsteady (ataxia)','steady again'],['Reflexes','present','absent','absent at onset']],
  anT1:'Eye-movement nerves',anS1:'GQ1b at the paranodes',anT2:'Position sense',anS2:['group Ia neurons in the','dorsal root ganglion'],
  an3:'III, IV, VI',anSp:'to cord',anMs:'from spindle',anDrg:'ganglion'};
/* Sekiguchi 2016, 60 people: dot counts derived here from the published percentages */
const MF_OV=[
 {id:'pure',n:30,share:'50%',t:'Stayed pure Fisher syndrome',d:'the triad only',z:{eyes:1},
  cap:'<b>Stayed pure: 30 of 60 (50%).</b> The triad of ophthalmoplegia, ataxia and areflexia without wider weakness [[Sekiguchi2016]].'},
 {id:'pcb',n:14,share:'23%',t:'Pharyngeal-cervical-brachial overlap',d:'median day 5 (range 1–7)',z:{eyes:1,face:.7,neck:1,arms:1},
  cap:'<b>Pharyngeal-cervical-brachial overlap: 23%.</b> Throat, neck and arm weakness joined the triad at a median of day 5 (range 1–7) [[Sekiguchi2016]]. Anti-GT1a IgG was found in 51% of people with this variant [[Nagashima2007]].'},
 {id:'gbs',n:9,share:'15%',t:'Overlap with classic GBS',d:'median day 3 (range 1–4)',z:{eyes:1,legs:1,arms:1},
  cap:'<b>Overlap with conventional GBS: 15%.</b> Limb weakness joined the triad at a median of day 3 (range 1–4) [[Sekiguchi2016]]. Descending tetraparesis and early titubation marked those who needed ventilation in another series [[Funakoshi2009]].'},
 {id:'bbe',n:7,share:'12%',t:'Overlap with Bickerstaff encephalitis',d:'median day 3 (range 1–5)',z:{eyes:1},bbe:1,
  cap:'<b>Overlap with Bickerstaff brainstem encephalitis: 12%.</b> Drowsiness or brisk reflexes joined the triad at a median of day 3 (range 1–5) [[Sekiguchi2016,Odaka2003]].'}];
const MF_OVALL={t:'All 60 people with Fisher syndrome',d:'every overlap began within 7 days',
  cap:'<b>60 consecutive people with Fisher syndrome</b> all started with the triad alone; 50% stayed pure and 50% overlapped, every overlap within 7 days of onset [[Sekiguchi2016]]. Dot counts are rounded from the published percentages.'};
const MF_OVTX={brain:'drowsy, brisk reflexes',note:'shaded: where weakness spread'};
/* day axis: t in [0,.5] covers day -7 to 14, t in [.5,1] covers day 14 to 120 */
const mfDay=t=>t<=.5?-7+t/.5*21:14+(t-.5)/.5*106;
const MF_AB=monoFn([ [-7,0],[-3,.35],[0,.9],[2,1],[8,.82],[16,.45],[30,.06],[45,0],[120,0] ]);
inits.mfs=()=>{
  const svg=$('#mfSvg'),rg=$('#mfT');
  const tx=(x,y,s,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`;
  const INK='fill:var(--ink);font-weight:700';
  const lev=(d,on,off)=>d<0?0:d<on+1?ramp(d,on,on+1):d<off-6?1:1-ramp(d,off-6,off);
  function eyes(cx,cy,oph,ph){let s='';const g=Math.sin(ph)*12;
    [[-1,1],[1,.7]].forEach(([side,k],i)=>{const ex=cx+side*42,off=g*(1-oph*k)+(i?oph*5:0);
      s+=`<ellipse cx="${f1(ex)}" cy="${f1(cy)}" rx="30" ry="17" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.4"/>`;
      s+=`<circle cx="${f1(ex+off)}" cy="${f1(cy)}" r="10" style="fill:var(--brand)"/><circle cx="${f1(ex+off)}" cy="${f1(cy)}" r="${f1(4+oph*1.2)}" style="fill:var(--ink)"/>`;
      const lid=-17+oph*9;s+=`<path d="M${f1(ex-30)} ${f1(cy)}Q${f1(ex)} ${f1(cy-34)} ${f1(ex+30)} ${f1(cy)}Q${f1(ex)} ${f1(cy+lid*1.6+12)} ${f1(ex-30)} ${f1(cy)}Z" style="fill:var(--skin);stroke:var(--ink);stroke-width:1.2;opacity:${f1(.25+oph*.75)}"/>`});
    const tgx=cx+g*3.2;s+=`<circle cx="${f1(tgx)}" cy="${f1(cy-34)}" r="4" style="fill:var(--accent)"/>`;
    return s}
  function rows(x,y,w,d,dy){let s='';const st=d<0?1:0;
    MF_TX.rows.forEach((r,i)=>{const yy=y+i*dy;let k=d<0?1:2;if(i===0&&d>=88)k=3;if(i===1&&d>=32)k=3;if(i===2&&d>=0)k=d<8?2:3;
      const bad=k===2||(i===2&&k===3);
      s+=`<rect x="${f1(x)}" y="${f1(yy)}" width="${f1(w)}" height="26" rx="7" style="fill:${bad?'var(--dx-soft)':'var(--panel-2)'};stroke:var(--line)"/>`;
      s+=tx(x+10,yy+17,r[0],'t-sm',INK)+tx(x+w-10,yy+17,r[k],'t-sm t-end',bad?'fill:var(--dx);font-weight:700':'')});
    return s}
  function anatomy(x,y,w,h){let s='';
    /* box 1: the eye-movement nerves */
    s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="10" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=tx(x+8,y+16,MF_TX.anT1,'t-sm',INK)+tx(x+8,y+30,MF_TX.anS1,'t-xs');
    const ey=y+h-26,exx=x+w-30;
    s+=`<ellipse cx="${f1(exx)}" cy="${f1(ey)}" rx="18" ry="12" style="fill:var(--panel);stroke:var(--ink)"/><circle cx="${f1(exx-4)}" cy="${f1(ey)}" r="5" style="fill:var(--brand)"/>`;
    [-10,0,10].forEach((o,i)=>{s+=`<path d="M${f1(x+10)} ${f1(ey+o)}C${f1(x+w*.4)} ${f1(ey+o)} ${f1(exx-34)} ${f1(ey+o*.5)} ${f1(exx-18)} ${f1(ey+o*.4)}" style="fill:none;stroke:var(--axon-line);stroke-width:3"/>`});
    for(let i=0;i<3;i++){const gx=x+22+i*24;s+=ganglioside(gx,ey-10,13,{kind:'GQ1b'})+antibody(gx,ey-21,11,{ang:180,op:.95})}
    s+=tx(x+8,y+h-6,MF_TX.an3,'t-xs');
    return s}
  function anatomy2(x,y,w,h){let s=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="10" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=tx(x+8,y+16,MF_TX.anT2,'t-sm',INK);MF_TX.anS2.forEach((l,i)=>{s+=tx(x+8,y+30+i*12,l,'t-xs')});
    const cy=y+h-30,cx=x+w*.5;
    s+=`<path d="M${f1(x+10)} ${f1(cy+14)}H${f1(x+w-10)}M${f1(cx)} ${f1(cy+14)}V${f1(cy)}" style="fill:none;stroke:var(--axon-line);stroke-width:3"/>`;
    s+=`<circle cx="${f1(cx)}" cy="${f1(cy-4)}" r="11" style="fill:var(--axon);stroke:var(--axon-line);stroke-width:1.4"/>`;
    s+=antibody(cx-14,cy-11,11,{ang:130})+antibody(cx+14,cy-11,11,{ang:-130})+antibody(cx,cy-16,11,{ang:180});
    s+=tx(x+10,cy+26,MF_TX.anSp,'t-xs')+tx(x+w-10,cy+26,MF_TX.anMs,'t-xs t-end');
    return s}
  function chart(x,y,w,d,N){let s='';const X=v=>v<=14?x+(v+7)/21*.45*w:x+.45*w+(v-14)/106*.55*w,top=y+20,bot=y+240;s+=`<rect x="${f1(x)}" y="${f1(top)}" width="${f1(w)}" height="${f1(bot-top)}" style="fill:var(--field)"/>`;
    s+=tx(x,y,MF_TX.chart,'t-lbl');
    s+=`<rect x="${f1(X(0))}" y="${f1(top)}" width="${f1(X(7)-X(0))}" height="${f1(bot-top)}" style="fill:var(--warn-soft)"/>`+tx(X(0)+2,y+14,MF_TX.band,'t-xs','fill:var(--warn);font-weight:700');
    /* antibody curve */
    const cy0=y+42,ch=52;s+=tx(x+4,y+34,MF_TX.ab,'t-xs');
    let pth='';for(let i=0;i<=120;i++){const dd=-7+i*127/120;pth+=(i?'L':'M')+f1(X(dd))+' '+f1(cy0+ch-ch*MF_AB(dd))}
    s+=`<path d="${pth}" style="fill:none;stroke:var(--antibody);stroke-width:2.4;stroke-dasharray:${d<45?'none':'5 4'}"/>`;
    const ay=cy0+ch-ch*MF_AB(d);s+=`<circle cx="${f1(X(d))}" cy="${f1(ay)}" r="4.5" style="fill:var(--antibody);stroke:var(--panel);stroke-width:2"/>`;
    s+=`<line x1="${f1(X(30))}" x2="${f1(X(30))}" y1="${f1(cy0+4)}" y2="${f1(y+232)}" class="grid"/>`;
    MF_TX.abGone.forEach((l,i)=>{s+=tx(X(30)+4,cy0+18+i*12,l,'t-xs')});
    /* Gantt bars of the medians */
    [[MF_TX.atx,32,'var(--dx)',y+128],[MF_TX.oph,88,'var(--brand)',y+174]].forEach(([lb,m,col,yy])=>{
      s+=tx(x,yy-6,lb,'t-sm',INK);
      s+=`<rect x="${f1(X(0))}" y="${f1(yy)}" width="${f1(X(m)-X(0))}" height="16" rx="4" style="fill:none;stroke:${col};stroke-width:1.4"/>`;
      if(d>0)s+=`<rect x="${f1(X(0))}" y="${f1(yy)}" width="${f1(X(Math.min(d,m))-X(0))}" height="16" rx="4" style="fill:${col};opacity:.75"/>`;
      s+=`<line x1="${f1(X(m))}" x2="${f1(X(m))}" y1="${f1(yy-3)}" y2="${f1(yy+19)}" style="stroke:var(--ink);stroke-width:2"/>`});
    s+=`<line x1="${f1(x)}" x2="${f1(x+w)}" y1="${f1(bot)}" y2="${f1(bot)}" class="axis"/>`;
    [0,7,14,30,60,90,120].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${f1(bot-4)}" y2="${f1(bot+4)}" class="axis"/>`+tx(X(v),bot+16,v,'t-xs t-mid')});
    s+=tx(x+w,bot+32,MF_TX.axis,'t-xs t-end');
    /* cursor */
    const cx=X(d);s+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${f1(top)}" y2="${f1(bot)}" style="stroke:var(--ink);stroke-width:1.6"/>`;
    const lab=d<0?MF_TX.before:MF_TX.dayFmt(Math.round(d)),right=cx>x+w-70;
    s+=tx(right?cx-5:cx+5,bot-6,lab,right?'t-sm t-end':'t-sm',INK);
    return s}
  function draw(t){
    const N=vb(svg,'720 330','400 630'),p=phaseOf(MF_STEPS,t),d=mfDay(t);
    const L=N?{bx:70,by:34,bs:150,ex:282,ey:104,eT:48,rx:12,ry:206,rw:376,rdy:32,ax:12,ay:200,aw:182,ah:118,a2x:206,cx:20,cy:348,cw:364}
             :{bx:80,by:34,bs:176,ex:236,ey:110,eT:48,rx:16,ry:226,rw:296,rdy:32,ax:16,ay:220,aw:144,ah:106,a2x:168,cx:340,cy:30,cw:364};
    const oph=lev(d,0,88),atx=lev(d,0,32);
    let s='';
    const sw=Math.sin(t*140)*5*atx;
    s+=`<g transform="translate(${f1(sw)} 0)">`+bodyFront(L.bx,L.by,L.bs,{zones:{eyes:oph}}).svg+'</g>';
    s+=tx(L.ex,L.eT,MF_TX.eyesT,'t-sm t-mid',INK)+tx(L.ex,L.eT+13,MF_TX.eyesS,'t-xs t-mid');
    s+=eyes(L.ex,L.ey,oph,t*90);
    if(p===3){s+=anatomy(L.ax,L.ay,L.aw,L.ah)+anatomy2(L.a2x,L.ay,L.aw,L.ah)}
    else s+=rows(L.rx,L.ry,L.rw,d,L.rdy);
    s+=chart(L.cx,L.cy,L.cw,d,N);
    svg.innerHTML=s;
    setSt(p);$('#mfNote').innerHTML=noteHTML(MF_STEPS[p]);
  }
  const stop=playWire(rg,$('#mfPlay'),draw,16000,'%t:player.replay%','mfs');
  const setSt=stepWire($('#mfSteps'),MF_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- overlap explorer: 60 people ---------- */
  const os=$('#mfOv'),oc=$('#mfOvCap');let sel='all',oq=1,oStop=null;
  const SH=['ring','sq','dia','tri'],COL=['var(--muted)','var(--dx)','var(--accent)','var(--rx)'];
  function mk(cx,cy,k,op){const c=COL[k],r=7;let g='';
    if(k===0)g=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r*.8)}" style="fill:none;stroke:${c};stroke-width:2"/>`;
    else if(k===1)g=`<rect x="${f1(cx-r*.8)}" y="${f1(cy-r*.8)}" width="${f1(r*1.6)}" height="${f1(r*1.6)}" rx="2" style="fill:${c}"/>`;
    else if(k===2)g=`<rect x="${f1(cx-r*.7)}" y="${f1(cy-r*.7)}" width="${f1(r*1.4)}" height="${f1(r*1.4)}" transform="rotate(45 ${f1(cx)} ${f1(cy)})" style="fill:${c}"/>`;
    else g=`<path d="M${f1(cx)} ${f1(cy-r)}L${f1(cx+r)} ${f1(cy+r*.8)}L${f1(cx-r)} ${f1(cy+r*.8)}Z" style="fill:${c}"/>`;
    return `<g style="opacity:${f1(op)}">${g}</g>`}
  function drawOv(){const N=vb(os,'720 260','400 510'),gi=MF_OV.findIndex(g=>g.id===sel),G=gi<0?MF_OVALL:MF_OV[gi];
    const D=N?{gx:90,gy:46,lx:12,ly:206,bx:200,by:330,bs:150,tx:12,ty:510}:{gx:24,gy:46,lx:270,ly:58,bx:640,by:40,bs:170,tx:270,ty:200};
    let s=tx(N?12:24,22,G.t,'t-lbl')+tx(N?12:24,36,G.d,'t-xs');
    let i=0;MF_OV.forEach((g,k)=>{for(let j=0;j<g.n;j++,i++){const c=i%10,r=Math.floor(i/10);s+=mk(D.gx+c*22+11,D.gy+r*22+11,k,gi<0||gi===k?1:.22)}});
    MF_OV.forEach((g,k)=>{const yy=D.ly+k*(N?26:30);s+=mk(D.lx+8,yy-4,k,1)+tx(D.lx+24,yy,g.share,'t-sm',INK)+tx(D.lx+64,yy,g.t,'t-sm',gi===k?INK:'')});
    const z=gi<0?{eyes:1}:G.z,a=ease(oq),zz={};Object.keys(z).forEach(k=>{zz[k]=z[k]*a});
    const B=bodyFront(D.bx,D.by,D.bs,{zones:zz});s+=B.svg;
    if(gi>=0&&G.bbe)s+=kitLabel(B.at.head[0],D.by-6,MF_OVTX.brain,{a:'m'});
    s+=tx(D.bx,D.by+D.bs+16,MF_OVTX.note,'t-xs t-mid');
    os.innerHTML=s;oc.innerHTML=G.cap;
    $$('[data-mfov]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.mfov===sel))}
  $$('[data-mfov]').forEach(b=>b.addEventListener('click',()=>{if(oStop)oStop();sel=b.dataset.mfov;oq=0;oStop=animate(700,u=>{oq=u;drawOv()},()=>{oStop=null})}));
  const prevR=redraws.mfs;redraws.mfs=()=>{prevR&&prevR();drawOv()};
  drawOv();
};
