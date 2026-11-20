/* =============== 1.3 Ischaemia: time is muscle =============== */
/* timeline knots: slider t -> hours since occlusion */
const IS_TK=[0,.12,.3,.55,.75,1],IS_HK=[0,.25,2/3,3,6,24];
const IS_STEPS=[
 {from:0,at:.06,k:'Minute 0',t:'The artery blocks',
  txt:'A clot has blocked the artery, so the muscle it feeds, the <b>area at risk</b>, gets no blood. In dogs, injury after up to 15 minutes of total proximal coronary occlusion is reversible: the muscle cells survive. [[Kloner2001Stunning]] The territory matters as well as time: the lateral edges of the infarct were set by the edges of the ischaemic bed, which ranged from 29% to 48% of the left ventricle in dogs. [[Reimer1979]] Press <b>Reopen the artery now</b> at any moment to see what is saved.',
  pt:'The muscle beyond the blockage is starved of oxygen straight away, but for the first few minutes it can still fully recover if blood returns.',
  hook:'Occlusion up to about 15 minutes: reversible injury, which can leave stunning behind. [[Kloner2001Stunning]]'},
 {from:.12,at:.24,k:'15–40 minutes',t:'Cells start to die, inner layer first',
  txt:'After 40 minutes of occlusion in dogs, necrosis was confined to the subendocardium, the inner layer of the wall next to the cavity, and reached 38% of the wall thickness. [[Reimer1977]] As a share of the muscle at risk, 28% was dead when blood was restored at 40 minutes. [[Reimer1979]] Brief warning episodes protect: four 5-minute occlusions before a 40-minute occlusion limited infarct size to 25% of that in controls (ischaemic preconditioning). [[Murry1986]]',
  pt:'The first cells to die are in the inner layer of the heart wall, next to the chamber.',
  hook:'The wavefront: necrosis starts in the subendocardium and spreads toward the subepicardium. [[Reimer1977]]'},
 {from:.3,at:.45,k:'40 minutes to 3 hours',t:'The wavefront moves outward',
  txt:'With longer occlusion, irreversible injury spread as a "wavefront" toward the outer wall: 57% of the wall thickness at 3 hours in dogs. [[Reimer1977]] With reperfusion at 3 hours, 70% of the muscle at risk was dead. [[Reimer1979]] In people, a cardiac MRI study after primary PCI found salvage "markedly reduced" once reperfusion took more than 90 minutes. [[Francone2009]] In dogs reperfused after 90 minutes, parts of the inner wall were not reperfused at all (no-reflow) because of severe capillary damage and cell swelling. [[Kloner1974NoReflow]]',
  pt:'Minute by minute, more of the wall dies. Opening the artery early saves the outer layers.',
  hook:'Clot-busting drugs saved 65 lives per 1000 treated in the first hour vs 29 per 1000 at 3–6 hours. [[Boersma1996]]'},
 {from:.55,at:.66,k:'3–6 hours',t:'The last layer that can be saved',
  txt:'Reimer and Jennings described a subepicardial zone of ischaemic but still viable muscle that can be salvaged for at least 3 and perhaps 6 hours after occlusion in the dog. By 6 hours, 71% of the wall thickness was dead. [[Reimer1977]] After 3 hours or more, the final extent depended on collateral flow to the outer wall (r = 0.92 at 3 hours). [[Reimer1979]] In people, reperfusion gives a "striking benefit" in the first 2–3 hours after symptoms begin; after that the mortality benefit continues but gets smaller. [[Gersh2005JAMA]]',
  pt:'Small side channels from other arteries (collaterals) can keep the outer layer alive for longer in some people.',
  hook:'Salvageable subepicardial zone: at least 3, perhaps 6 hours in dogs; the final size depends on collateral flow. [[Reimer1977,Reimer1979]]'},
 {from:.75,at:.93,k:'6–24 hours',t:'Nearly the full thickness',
  txt:'At 24 hours, necrosis reached 85% of the wall thickness. [[Reimer1977]] With a permanent occlusion, 79% of the muscle at risk died, little more than the 72% with reperfusion at 6 hours. [[Reimer1979]] Infarct size is a major determinant of prognosis: after primary PCI, each 5% larger infarct went with higher 1-year mortality (adjusted HR 1.19). [[Heusch2020,Stone2016InfarctSize]] How doctors reopen the artery is in <a href="#reperfusion" data-go="reperfusion">Reperfusion: PCI &amp; clot-busting drugs</a>.',
  pt:'After many hours most of the muscle in that territory has died and will become scar. A smaller heart attack is linked to a lower chance of heart failure and death later; these are averages across many people.',
  hook:'Dog wavefront: 38% (40 min) → 57% (3 h) → 71% (6 h) → 85% (24 h) of the wall thickness. [[Reimer1977]]'}];

inits.ischaemia=()=>{
  const svg=$('#isSvg'),rg=$('#isT'),note=$('#isNote'),read=$('#isRead'),rb=$('#isRep');
  const PL=(K,V,x)=>{if(x<=K[0])return V[0];for(let i=1;i<K.length;i++)if(x<=K[i])return V[i-1]+(V[i]-V[i-1])*(x-K[i-1])/(K[i]-K[i-1]);return V[V.length-1]};
  const hOf=t=>PL(IS_TK,IS_HK,t),tOf=h=>PL(IS_HK,IS_TK,h);
  const EXT=monoFn([[0,0],[.25,0],[2/3,38],[3,57],[6,71],[24,85]]);      /* % of wall thickness, dog [[Reimer1977]] */
  const AAR=monoFn([[0,0],[.25,0],[2/3,28],[3,70],[6,72],[24,79]]);      /* % of area at risk, dog [[Reimer1979]] */
  const fmtH=h=>{const m=Math.round(h*60);if(m<60)return m+' min';const hh=Math.floor(m/60),mm=m%60;return hh+' h'+(mm?' '+mm+' min':'')};
  let rep=null,setSt=()=>{};
  function draw(t){
    const N=vb(svg,'720 380','400 530'),h=hOf(t),open=rep!=null&&h>=rep,hE=rep!=null?Math.min(h,rep):h;
    const ext=clamp(EXT(hE)/100),dead=AAR(hE),isch=ramp(h,0,.03),ph=(t*28)%1;
    const W=N?{x:12,y:100,w:376,h:176,cols:17,b0:3,b1:13}:{x:30,y:100,w:440,h:180,cols:20,b0:4,b1:15};
    const rows=8,cw=W.w/W.cols,chh=W.h/rows,yEndo=W.y+W.h,bx0=W.x+W.b0*cw,bx1=W.x+(W.b1+1)*cw,bc=(bx0+bx1)/2,bhw=(bx1-bx0)/2;
    let s=`<defs>${marker('isArr','var(--muted)')}</defs>`;
    s+=`<text x="${W.x}" y="22" class="t-lbl">${h<.005?'The artery has just blocked':(open?'Reopened at '+fmtH(rep)+' · now '+fmtH(h)+(N?'':' since the block'):fmtH(h)+' since the artery blocked')}</text>`;
    /* the coronary artery on the outer surface, with its clot */
    const ay=56,ah=26,cx=W.x+cw*(W.b0-1.4);
    s+=`<rect x="${W.x}" y="${ay}" width="${W.w}" height="${ah}" rx="13" style="fill:var(--wall);stroke:var(--media);stroke-width:1.4"/><rect x="${W.x+4}" y="${ay+6}" width="${W.w-8}" height="${ah-12}" rx="7" style="fill:var(--blood-soft)"/>`;
    for(let i=0;i<16;i++){const u=((i/16)+ph)%1,x=W.x+8+u*(W.w-16),down=x>cx+8;if(down&&!open)continue;if(!open&&Math.abs(x-cx)<10)continue;
      s+=`<ellipse cx="${f1(x)}" cy="${f1(ay+ah/2+(i%2?3:-3))}" rx="4.5" ry="2.3" style="fill:var(--blood)"/>`}
    if(!open)s+=`<ellipse cx="${f1(cx)}" cy="${ay+ah/2}" rx="10" ry="${ah/2-2}" style="fill:var(--clot)"/><text x="${f1(cx)}" y="${ay-6}" class="t-sm t-mid" style="fill:var(--bad)">clot</text>`;
    else s+=`<text x="${W.x}" y="${ay-6}" class="t-sm" style="fill:var(--good)">artery reopened</text>`;
    /* small branches into the wall */
    for(let i=W.b0;i<=W.b1;i+=2){const x=W.x+(i+.5)*cw;s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${ay+ah}" y2="${W.y+6}" style="stroke:var(--coronary);stroke-width:1.6;${open?'':'stroke-dasharray:2 2;opacity:.5'}"/>`}
    /* the wall: rows of muscle cells; row 0 is the inner layer (subendocardium) */
    s+=`<rect x="${W.x}" y="${W.y}" width="${W.w}" height="${W.h}" rx="6" style="fill:var(--muscle-soft)"/>`;
    const nr=rep!=null&&rep>=1.5&&open;
    for(let j=0;j<rows;j++)for(let i=0;i<W.cols;i++){
      const x=W.x+i*cw+1.5,y=yEndo-(j+1)*chh+1.5,w=cw-3,hh=chh-3,xc=x+w/2,inBed=i>=W.b0&&i<=W.b1;
      const u=Math.abs(xc-bc)/bhw,front=ext*(1-.3*Math.pow(clamp(u),3)),d=(j+.5)/rows,nd=inBed?clamp((front-d)*rows+.5):0;
      const beat=!inBed||open?Math.sin((t*90+i*.15)*Math.PI*2)*.6:0;
      s+=`<rect x="${f1(x)}" y="${f1(y+beat)}" width="${f1(w)}" height="${f1(hh)}" rx="4" style="fill:var(--muscle)"/>`;
      if(inBed&&!open&&isch>0)s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(hh)}" rx="4" style="fill:var(--isch-fill);opacity:${f1(isch*.95)}"/>`;
      if(inBed&&open&&nd<.5)s+=`<rect x="${f1(x+.8)}" y="${f1(y+.8)}" width="${f1(w-1.6)}" height="${f1(hh-1.6)}" rx="4" style="fill:none;stroke:var(--good);stroke-width:1.3;stroke-dasharray:2.5 1.8"/>`;
      if(nd>0)s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(hh)}" rx="4" style="fill:var(--necro-fill);opacity:${f1(nd)}"/>`;
      if(nd<.6)s+=`<ellipse cx="${f1(xc)}" cy="${f1(y+hh/2+beat)}" rx="${f1(w*.16)}" ry="${f1(hh*.13)}" style="fill:var(--muscle-dark);opacity:.8"/>`;
      if(nr&&nd>.6&&j<2&&u<.7)s+=`<circle cx="${f1(xc)}" cy="${f1(y+hh/2)}" r="${f1(Math.min(w,hh)*.22)}" style="fill:var(--clot);opacity:.85"/>`}
    s+=`<rect x="${f1(bx0-1)}" y="${W.y-2}" width="${f1(bx1-bx0+2)}" height="${W.h+4}" rx="6" style="fill:none;stroke:var(--isch);stroke-width:1.6;stroke-dasharray:5 4"/>`;
    s+=`<text x="${W.x+W.w}" y="${W.y-6}" class="t-xs t-end">outer layer (epicardium)</text><text x="${W.x}" y="${yEndo+14}" class="t-xs">inner layer (subendocardium), next to the LV cavity</text>`;
    s+=`<text x="${f1(bc)}" y="${yEndo+28}" class="t-xs t-mid" style="fill:var(--isch)">dashed box: the area at risk</text>`;
    if(nr)s+=`<text x="${W.x+W.w}" y="${yEndo+28}" class="t-xs t-end" style="fill:var(--bad)">dark dots: no-reflow</text>`;
    /* panel: clock, counters */
    const P=N?{x:12,y:332}:{x:500,y:28};
    s+=clock(P.x+42,P.y+44,36,Math.min(h,1)*60,{full:60,col:open?'var(--good)':'var(--brand)'});
    s+=`<text x="${P.x+42}" y="${P.y+100}" class="t-sm t-mid" style="fill:var(--ink)">${fmtH(h)}</text>`;
    const nx=N?P.x+100:P.x,ny=N?P.y+14:P.y+124,c2x=N?nx+140:nx,c2y=N?ny:ny+56;
    s+=`<text x="${nx}" y="${ny}" class="t-sm">Wall thickness dead</text><text x="${nx}" y="${ny+30}" class="t-big" style="font-size:28px;fill:var(--ink)">${Math.round(ext*100)}%</text>`;
    s+=`<text x="${c2x}" y="${c2y}" class="t-sm">At-risk muscle dead</text><text x="${c2x}" y="${c2y+30}" class="t-big" style="font-size:28px;fill:var(--ink)">${Math.round(dead)}%</text>`;
    const bw=N?276:200,bx=N?nx:nx,by=N?ny+50:c2y+46;
    s+=`<rect x="${bx}" y="${by}" width="${bw}" height="16" rx="4" style="fill:${open?'var(--good)':'var(--isch-fill)'};opacity:${open?.55:.9}"/><rect x="${bx}" y="${by}" width="${f1(bw*dead/100)}" height="16" rx="4" style="fill:var(--necro-fill)"/>`;
    s+=`<text x="${bx}" y="${by+30}" class="t-xs">dark: dead · ${open?'green: saved':'violet: alive'}</text>`;
    const st=h<.25?['Reversible so far','(dogs: up to 15 min)']:open?['Saved vs a permanent block:',`${Math.round(dead)}% dead instead of 79%`]:h<6?['Cell death under way;','outer layer still salvageable']:['Little left to save',''];
    s+=`<text x="${bx}" y="${by+48}" class="t-sm" style="fill:${open?'var(--good)':'var(--ink)'}">${st[0]}</text><text x="${bx}" y="${by+63}" class="t-sm" style="fill:${open?'var(--good)':'var(--ink)'}">${st[1]}</text>`;
    /* timeline */
    const TY=N?500:350,x0=N?20:36,x1=N?380:688;
    s+=`<line x1="${x0}" x2="${x1}" y1="${TY}" y2="${TY}" class="axis" style="stroke-width:2"/>`;
    [[0,'0'],[.25,'15 min'],[2/3,'40 min'],[3,'3 h'],[6,'6 h'],[24,'24 h']].forEach(([hv,l],k)=>{const xx=lerp(x0,x1,tOf(hv));s+=`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${TY-4}" y2="${TY+4}" class="axis"/><text x="${f1(xx)}" y="${TY+17}" class="t-xs ${k===0?'':k===5?'t-end':'t-mid'}">${l}</text>`});
    if(rep!=null){const rx=lerp(x0,x1,tOf(rep));s+=`<path d="M${f1(rx)} ${TY}v-20h12l-4 5 4 5h-12" style="fill:var(--good);stroke:var(--good);stroke-width:1.4"/>`}
    s+=`<circle cx="${f1(lerp(x0,x1,t))}" cy="${TY}" r="6" style="fill:var(--brand);stroke:var(--panel);stroke-width:2"/>`;
    svg.innerHTML=s;
    const p=phaseOf(IS_STEPS,t);note.innerHTML=noteHTML(IS_STEPS[p]);setSt(p);
    read.innerHTML=`<span>Time <b>${fmtH(h)}</b></span><span>Transmural extent <b>${Math.round(ext*100)}%</b></span><span>Area at risk dead <b>${Math.round(dead)}%</b></span>`+(rep!=null?`<span>Reopened at <b>${fmtH(rep)}</b></span>`:'');
  }
  const stop=playWire(rg,$('#isPlay'),draw,26000,'Replay','ischaemia');
  setSt=stepWire($('#isSteps'),IS_STEPS,rg,draw,stop);
  rb.addEventListener('click',()=>{if(rep==null){rep=Math.max(.001,hOf(+rg.value));rb.setAttribute('aria-pressed','true');rb.textContent='Reopened: press to block again'}
    else{rep=null;rb.setAttribute('aria-pressed','false');rb.textContent='Reopen the artery now'}draw(+rg.value)});
  draw(+rg.value);

  /* ---- delay vs outcome ---- */
  const ds=$('#isDelay'),dr=$('#isD'),dn=$('#isDNote'),dread=$('#isDRead');let view='pci';
  const DV={
   pci:{k:'Primary PCI · 1791 patients',t:'Each 30 minutes of delay',
    txt:'In 1791 people treated with primary angioplasty for STEMI, each 30 minutes of delay was associated with a relative risk of 1-year death of 1.075 (95% CI 1.008–1.15), after adjustment for age, sex, diabetes and previous revascularisation. Longer ischaemic times went with age over 70, female sex, diabetes and previous revascularisation. [[DeLuca2004]] The curve assumes the per-30-minute estimate holds across the whole range: a simplification for teaching.',
    pt:'Every half hour of delay adds a little to the risk. Small steps add up.',
    hook:'Primary PCI: RR 1.075 for 1-year death per 30 minutes of delay. [[DeLuca2004]]'},
   lysis:{k:'Clot-busting drugs · 22 trials, 50,246 patients',t:'The golden hour',
    txt:'Across 22 fibrinolysis trials, lives saved per 1000 treated were 65, 37, 26 and 29 when treatment started 0–1, 1–2, 2–3 and 3–6 hours after symptoms began. The proportional mortality reduction was 44% (95% CI 32–53) within 2 hours vs 20% (15–25) later. [[Boersma1996]] The data fit a non-linear curve, steepest early. [[Boersma1996,Gersh2005JAMA]]',
    pt:'Treatment in the first hour saved more than twice as many lives as treatment 3 to 6 hours in.',
    hook:'Fibrinolysis: 65 lives saved per 1000 in the first hour; 44% proportional mortality reduction within 2 hours vs 20% later. [[Boersma1996]]'},
   cmr:{k:'Cardiac MRI · 70 patients with STEMI',t:'Muscle lost and saved',
    txt:'After primary PCI, mean infarct size rose with symptom-to-balloon time: 8% of the left ventricle at ≤90 minutes, 11.7% at >90–150, 12.7% at >150–360 and 17.9% beyond 360 minutes. Salvaged muscle fell from 8.5% to 3.2%, 2.4% and 2.1%, and microvascular obstruction rose from 0.5% to 6.6%. [[Francone2009]]',
    pt:'Past about an hour and a half, much less muscle could be saved.',
    hook:'CMR: salvage "markedly reduced" when reperfusion took more than 90 minutes. [[Francone2009]]'}};
  function drawD(v){const N=vb(ds,'720 330','400 436'),m=v*480;let s='';
    const C=N?{x:46,y:40,w:334,h:290}:{x:60,y:36,w:620,h:230};
    if(view==='pci'){
      const cu=curve(C.x,C.y,C.w,C.h,x=>Math.pow(1.075,x/30),{x0:0,x1:480,y0:1,y1:3.4,upto:m,dot:true,col:'var(--brand)'});s+=cu.svg;
      const full=curve(C.x,C.y,C.w,C.h,x=>Math.pow(1.075,x/30),{x0:0,x1:480,y0:1,y1:3.4,col:'var(--brand)',dash:'4 4',lw:1.4});s+=full.svg.replace(/<rect[^>]*\/>/,'').replace(/<line[^>]*class="axis"\/>/g,'');
      [1,1.5,2,2.5,3].forEach(y=>{const yy=cu.Y(y);s+=`<line x1="${C.x}" x2="${C.x+C.w}" y1="${f1(yy)}" y2="${f1(yy)}" class="grid"/><text x="${C.x-6}" y="${f1(yy+3)}" class="t-xs t-end">${y}</text>`});
      [0,120,240,360,480].forEach(x=>{s+=`<text x="${f1(cu.X(x))}" y="${C.y+C.h+15}" class="t-xs t-mid">${x}</text>`});
      s+=`<text x="${C.x}" y="${C.y-14}" class="t-sm">Relative risk of death at 1 year</text><text x="${C.x+C.w}" y="${C.y+C.h+30}" class="t-xs t-end">extra minutes of delay</text>`;
      const rr=Math.pow(1.075,m/30),p=cu.at(m);s+=`<text x="${f1(Math.min(p[0]+8,C.x+C.w-70))}" y="${f1(p[1]-12)}" class="t-lbl">RR ${rr.toFixed(2)}</text>`;
      dread.innerHTML=`<span>Extra delay <b>${Math.round(m)} min</b></span><span>Steps of 30 min <b>${f1(m/30)}</b></span><span>1.075<sup>${f1(m/30)}</sup> = <b>${rr.toFixed(2)}</b></span>`;
    }else if(view==='lysis'){
      const B=[[0,60,65],[60,120,37],[120,180,26],[180,360,29]],X=x=>C.x+C.w*x/360,Y=y=>C.y+C.h-C.h*y/70;
      s+=`<rect x="${C.x}" y="${C.y}" width="${C.w}" height="${C.h}" style="fill:var(--field)"/>`;
      [0,20,40,60].forEach(y=>{s+=`<line x1="${C.x}" x2="${C.x+C.w}" y1="${f1(Y(y))}" y2="${f1(Y(y))}" class="grid"/><text x="${C.x-6}" y="${f1(Y(y)+3)}" class="t-xs t-end">${y}</text>`});
      B.forEach(([a,b,val])=>{const on=m>=a&&(m<b||(b===360&&m<=360)),x=X(a)+3,w=X(b)-X(a)-6;
        s+=`<rect x="${f1(x)}" y="${f1(Y(val))}" width="${f1(w)}" height="${f1(Y(0)-Y(val))}" rx="4" style="fill:var(--brand);opacity:${on?.95:.35}"/><text x="${f1(x+w/2)}" y="${f1(Y(val)-6)}" class="t-lbl t-mid">${val}</text><text x="${f1(x+w/2)}" y="${C.y+C.h+15}" class="t-xs t-mid">${a/60}–${b/60} h</text>`});
      s+=`<line x1="${C.x}" x2="${C.x+C.w}" y1="${C.y+C.h}" y2="${C.y+C.h}" class="axis"/><text x="${C.x}" y="${C.y-14}" class="t-sm">Lives saved per 1000 treated</text><text x="${C.x+C.w}" y="${C.y+C.h+30}" class="t-xs t-end">hours from symptom onset to treatment</text>`;
      if(m<=360)s+=`<line x1="${f1(X(m))}" x2="${f1(X(m))}" y1="${C.y}" y2="${C.y+C.h}" style="stroke:var(--ink);stroke-width:1.4;stroke-dasharray:3 3"/>`;
      else s+=`<text x="${C.x+C.w-6}" y="${C.y+16}" class="t-sm t-end">beyond 6 h: not in this analysis</text>`;
      const band=B.find(([a,b])=>m>=a&&m<=b);
      dread.innerHTML=`<span>Time from symptom onset <b>${fmtH(m/60)}</b></span>`+(band&&m<=360?`<span>Lives saved per 1000 <b>${band[2]}</b></span><span>Proportional reduction <b>${m<=120?'44%':'20%'}</b></span>`:'<span>No band in this analysis</span>');
    }else{
      const G=[['≤90 min',0,90,8,8.5,.5],['>90–150',90,150,11.7,3.2,1.5],['>150–360',150,360,12.7,2.4,3.7],['>360 min',360,481,17.9,2.1,6.6]];
      const gw=C.w/4,Y=y=>C.y+C.h-C.h*y/20,bw=gw/4.4;
      s+=`<rect x="${C.x}" y="${C.y}" width="${C.w}" height="${C.h}" style="fill:var(--field)"/>`;
      [0,5,10,15,20].forEach(y=>{s+=`<line x1="${C.x}" x2="${C.x+C.w}" y1="${f1(Y(y))}" y2="${f1(Y(y))}" class="grid"/><text x="${C.x-6}" y="${f1(Y(y)+3)}" class="t-xs t-end">${y}</text>`});
      const cols=['var(--necro)','var(--good)','var(--bad)'];
      G.forEach((g,i)=>{const on=m>g[1]-(i===0?1:0)&&m<=g[2]||(i===0&&m===0),gx=C.x+i*gw+gw*.12;
        if(on)s+=`<rect x="${f1(C.x+i*gw+2)}" y="${C.y}" width="${f1(gw-4)}" height="${C.h}" style="fill:var(--brand-soft);opacity:.35"/>`;
        [3,4,5].forEach((k,q)=>{const val=g[k],x=gx+q*(bw+3);s+=`<rect x="${f1(x)}" y="${f1(Y(val))}" width="${f1(bw)}" height="${f1(Y(0)-Y(val))}" rx="3" style="fill:${cols[q]};opacity:${on?1:.45}"/>`;
          if(on||!N)s+=`<text x="${f1(x+bw/2)}" y="${f1(Y(val)-5)}" class="t-xs t-mid" style="fill:var(--ink)">${val}</text>`});
        s+=`<text x="${f1(C.x+i*gw+gw/2)}" y="${C.y+C.h+15}" class="t-xs t-mid">${g[0]}</text>`});
      s+=`<line x1="${C.x}" x2="${C.x+C.w}" y1="${C.y+C.h}" y2="${C.y+C.h}" class="axis"/><text x="${C.x}" y="${C.y-14}" class="t-sm">% of the left ventricle</text><text x="${C.x+C.w}" y="${C.y+C.h+30}" class="t-xs t-end">symptom onset to balloon</text>`;
      const lx=N?C.x:C.x+C.w-330,ly=N?C.y+C.h+50:C.y-14;
      [['infarct',0],['salvaged',1],['microvascular obstruction',2]].forEach(([l,q],k)=>{const xx=lx+(N?0:[0,80,170][k]),yy=ly+(N?k*16:0);s+=`<rect x="${xx}" y="${yy-9}" width="10" height="10" rx="2" style="fill:${cols[q]}"/><text x="${xx+14}" y="${yy}" class="t-xs">${l}</text>`});
      const g=G.find((g,i)=>(i===0&&m<=90)||(m>g[1]&&m<=g[2]))||G[3];
      dread.innerHTML=`<span>Symptom to balloon <b>${fmtH(m/60)}</b></span><span>Infarct <b>${g[3]}%</b></span><span>Salvaged <b>${g[4]}%</b></span><span>MVO <b>${g[5]}%</b></span>`;
    }
    ds.innerHTML=s;dn.innerHTML=noteHTML(DV[view]);}
  dr.addEventListener('input',()=>drawD(+dr.value));
  $$('[data-isv]').forEach(b=>b.addEventListener('click',()=>{view=b.dataset.isv;$$('[data-isv]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawD(+dr.value)}));
  drawD(+dr.value);
  const prevR=redraws.ischaemia;redraws.ischaemia=()=>{prevR&&prevR();drawD(+dr.value)};
};
