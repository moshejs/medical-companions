/* =============== 1.4 Risk factors & prevention =============== */
/* Rows of the forest plot: published pooled estimate, 95% CI, source.
   r = time on the scrubber at which the row slides in. */
const RK_BASE=3.42; /* % lifetime risk from age 50 without screening, US microsimulation [Meester2015JAMA] */
const RK_ROWS=[
 {n:'≥1 first-degree relative',sn:'≥1 FDR',rr:2.24,lo:2.06,hi:2.43,g:1,r:.10,m:'pooled RR, 47 studies',c:'[[Butterworth2006]]'},
 {n:'Ulcerative colitis',sn:'Ulcerative colitis',rr:1.66,lo:1.57,hi:1.76,g:1,r:.15,m:'HR, Nordic cohort 1969–2017',c:'[[Olen2020UC]]'},
 {n:"Crohn's disease",sn:"Crohn's disease",rr:1.40,lo:1.27,hi:1.53,g:1,r:.20,m:'adjusted HR, Nordic cohort',c:'[[Olen2020CD]]'},
 {n:'Processed meat, per 50 g/day',sn:'Processed meat 50 g',rr:1.18,lo:1.10,hi:1.28,g:2,r:.28,m:'RR per 50 g/day, prospective studies',c:'[[Chan2011]]'},
 {n:'Red meat, per 100 g/day',sn:'Red meat 100 g',rr:1.17,lo:1.05,hi:1.31,g:2,r:.32,m:'RR per 100 g/day, prospective studies',c:'[[Chan2011]]'},
 {n:'Alcohol, 2–3 drinks/day',sn:'Alcohol 2–3/day',rr:1.21,lo:1.13,hi:1.28,g:2,r:.36,m:'RR vs non-drinkers, 61 studies',c:'[[Fedirko2011]]'},
 {n:'Alcohol, ≥4 drinks/day',sn:'Alcohol ≥4/day',rr:1.52,lo:1.27,hi:1.81,g:2,r:.40,m:'RR vs non-drinkers, 61 studies',c:'[[Fedirko2011]]'},
 {n:'Smoking, ever vs never',sn:'Smoking (ever)',rr:1.18,lo:1.11,hi:1.25,g:3,r:.48,m:'incidence RR',c:'[[Botteri2008]]'},
 {n:'Obesity vs normal BMI',sn:'Obesity',rr:1.33,lo:1.25,hi:1.42,g:3,r:.53,m:'RR, 41 studies',c:'[[Ma2013]]'},
 {n:'Diabetes',sn:'Diabetes',rr:1.27,lo:1.21,hi:1.34,g:3,r:.58,m:'summary RR, 30 cohorts',c:'[[Jiang2011]]'},
 {n:'Most vs least active (colon)',sn:'Physically active',rr:.76,lo:.72,hi:.81,g:4,r:.66,m:'RR for colon cancer, 52 studies',c:'[[Wolin2009]]'},
 {n:'Fibre, per 10 g/day',sn:'Fibre 10 g',rr:.90,lo:.86,hi:.94,g:4,r:.69,m:'RR per 10 g/day total fibre',c:'[[Aune2011]]'},
 {n:'Whole grains, per 3 servings/day',sn:'Whole grains ×3',rr:.83,lo:.78,hi:.89,g:4,r:.72,m:'RR per 3 servings/day',c:'[[Aune2011]]'},
 {n:'Dairy, per 400 g/day',sn:'Dairy 400 g',rr:.83,lo:.78,hi:.88,g:4,r:.75,m:'RR per 400 g/day, cohorts',c:'[[Aune2012]]'},
 {n:'Calcium, per 300 mg/day',sn:'Calcium 300 mg',rr:.92,lo:.89,hi:.95,g:4,r:.78,m:'RR per 300 mg/day total calcium',c:'[[Keum2014]]'},
 {n:'Aspirin, trials (colon cancer)',sn:'Aspirin (trials)',rr:.76,lo:.60,hi:.96,g:5,r:.88,m:'HR for colon cancer incidence, 20-year trial follow-up',c:'[[Rothwell2010]]'}
];
const RK_STEPS=[
 {from:0,at:.04,k:'Before the rows',t:'How to read a forest plot',
  txt:`Each row will be one risk factor. The square is the pooled relative risk (RR): how many times more, or less, often colorectal cancer occurred in people with the factor than without it. The line through it is the 95% confidence interval. The vertical line at 1 means no effect: rows whose whole line sits to the right raise risk, to the left lower it. The scale is logarithmic, so 0.5 and 2 are the same distance from 1. Press <b>Absolute risk</b> to turn each RR into cases per 1,000 people, using a 3.42% lifetime risk from age 50 without screening as the baseline. [[Meester2015JAMA]]`,
  pt:`A relative risk of 2 means twice as likely, not 2% more likely. Twice a small number is still a small number.`,
  hook:`An RR whose 95% CI crosses 1 is not statistically significant.`},
 {from:.08,at:.25,k:'Rows 1–3 · family and colitis',t:'The strongest factors you cannot change',
  txt:`One or more affected first-degree relatives (parent, sibling, child): RR 2.24 (2.06–2.43) across 47 studies; two or more: 3.97. [[Butterworth2006]] The family-history RR is highest when the person at risk is young: 3.29 under 40, 1.42 at 40 and older. [[Wong2018]] Nordic twin registries put the heritable share of colorectal cancer at 35%. <span class="ev est">Established</span> [[Lichtenstein2000]] Ulcerative colitis: HR 1.66 over 1969–2017, falling to 1.38 in 2013–2017. Crohn's disease: HR 1.40, with the excess in colonic disease, diagnosis before 40, or primary sclerosing cholangitis. [[Olen2020UC,Olen2020CD]]`,
  pt:`Having a parent, brother, sister or child with bowel cancer about doubles your own risk. Most people with a family history still never get it.`,
  hook:`One affected FDR ≈ RR 2.2; two or more ≈ RR 4. The RR falls with the age of the person at risk. [[Butterworth2006,Wong2018]]`},
 {from:.26,at:.45,k:'Rows 4–7 · what we eat and drink',t:'Meat and alcohol',
  txt:`Processed meat: RR 1.18 per 50 g a day; fresh red meat: 1.17 per 100 g a day. The curve is roughly linear up to about 140 g a day, then flattens. [[Chan2011]] The IARC classified processed meat as Group 1 (carcinogenic) and red meat as Group 2A (probably carcinogenic). <span class="ev est">Established</span> [[Bouvard2015]] Alcohol: RR 1.21 for 2–3 drinks a day and 1.52 for 4 or more, compared with non-drinkers; the WCRF/AICR update found 7% more risk per 10 g of ethanol a day. [[Fedirko2011,Vieira2017]]`,
  pt:`Eating less bacon, ham, sausages and red meat, and drinking less alcohol, lowers risk a little.`,
  hook:`Processed meat = IARC Group 1; red meat = Group 2A. About +18% per 50 g/day of processed meat. [[Bouvard2015,Chan2011]]`},
 {from:.46,at:.63,k:'Rows 8–10 · smoking, weight, diabetes',t:'Smoking, body fat and diabetes',
  txt:`Ever-smoking: incidence RR 1.18 (10.8 extra cases per 100,000 person-years) and mortality RR 1.25; the excess appears after 30 years of smoking and is stronger for rectal cancer. [[Botteri2008]] Obesity: RR 1.33 vs normal BMI; a large waist: 1.46. [[Ma2013]] Diabetes: summary RR 1.27 in 30 cohorts, similar in women and men. [[Jiang2011,Larsson2005]]`,
  pt:`Not smoking and keeping a healthy weight both lower risk. Smoking's effect on the bowel takes decades to show.`,
  hook:`Obesity RR 1.33; diabetes RR about 1.27; smoking RR 1.18, significant only after 30 years. [[Ma2013,Jiang2011,Botteri2008]]`},
 {from:.64,at:.83,k:'Rows 11–15 · lower risk',t:'Activity, fibre, whole grains, dairy, calcium',
  txt:`The most physically active people had 24% less colon cancer than the least active (RR 0.76 in 52 studies; 0.83 in cohorts only). [[Wolin2009]] Each 10 g of fibre a day: RR 0.90; three servings of whole grains a day: 0.83. [[Aune2011]] Dairy, per 400 g a day: 0.83; calcium, per 300 mg a day: 0.92. [[Aune2012,Keum2014]] Fruit, coffee, tea, cheese, poultry and legumes showed no association in the WCRF/AICR update. [[Vieira2017]] These are observational: randomised trials of calcium and vitamin D supplements were mostly null (see below).`,
  pt:`Staying active and eating whole grains and fibre are linked to a lower risk.`,
  hook:`Physical activity RR 0.76 for colon cancer (Wolin 2009). Fibre RR 0.90 per 10 g/day. [[Wolin2009,Aune2011]]`},
 {from:.86,at:.97,k:'Row 16 · a drug, tested in trials',t:'Aspirin: years of use, then benefit',
  txt:`In 20-year follow-up of trials (14,033 people, mean 6 years of aspirin), colon cancer incidence fell (HR 0.76; 0.60–0.96) and mortality fell (HR 0.65), with no effect on rectal cancer overall. Five years or more of aspirin cut proximal colon cancer by about 70%. Doses above 75 mg a day added nothing. [[Rothwell2010]] But in ASPREE, in people 70 and older, aspirin did not reduce cancer and cancer deaths were higher (3.1% vs 2.3%). [[McNeil2018,McNeil2021]] The USPSTF now treats aspirin as a cardiovascular decision only. [[USPSTF2022Aspirin]]`,
  pt:`Aspirin can lower bowel cancer risk, but it takes years and it can cause bleeding. In people over 70 it did not help. It is a decision to make with a doctor.`,
  hook:`Aspirin's CRC benefit appears after ≥5 years, mostly in the proximal colon; ASPREE (≥70 years) showed harm. [[Rothwell2010,McNeil2021]]`}
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
    $('#rkRead').innerHTML=R?`<span><b>${R.n}</b></span><span>${R.g===5?'HR':'RR'} <b>${R.rr.toFixed(2)}</b> (95% CI ${R.lo.toFixed(2)}–${R.hi.toFixed(2)}), ${R.m} ${R.c}</span><span>per 1,000 from 50 <b>${per1000(1)} → ${per1000(R.rr)}</b> (illustration)</span>`:`<span>Baseline: <b>${RK_BASE}%</b> lifetime risk from age 50 without screening (US microsimulation) [[Meester2015JAMA]]</span>`;
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
    s+=`<text x="${C.lx}" y="${N?322:224}" class="t-xs">bar = for a 50-year-old (Butterworth 2006) · circle = to 85, W. Europe (Roos 2019)</text>`;
    fs.innerHTML=s;
    /* result text */
    let rr,abs,more='',us,uk,cls;
    if(n===0){rr=`RR <b>1</b> (reference)`;abs=`1.8%`;cls='yes';
      us=`Average risk: USPSTF and the American Cancer Society start screening at 45; ACS reaffirmed 45 in 2026. [[USPSTF2021,Wolf2018,Wolf2026]]`;
      uk=`Not in a UK family-history risk category. [[Monahan2020]]`}
    else if(n===1){rr=vy?`RR <b>3.87</b> (2.40–6.22) when the relative was diagnosed before 45 [[Johns2001]]`:`RR <b>2.24</b> (2.06–2.43) [[Butterworth2006]]`;
      abs=`3.4% (2.8–4.0)`;cls=young?'no':'maybe';
      if(young)more=`In cohort studies an FDR diagnosed before 50 gave RR 3.26 (2.82–3.77) and an 11% risk to 85. [[Roos2019]]`;
      us=a<60?`USMSTF 2017: colonoscopy every 5 years from age 40, or 10 years before the relative's diagnosis, whichever is earlier: here from <b>${Math.min(40,a-10)}</b>. [[Rex2017]]`:`USMSTF 2017: a single FDR diagnosed at 60 or older means average-risk screening options, starting at 40. [[Rex2017]]`;
      uk=young?`BSG/ACPGBI/UKCGG 2020: moderate risk (one FDR diagnosed before 50): a one-off colonoscopy at 55. [[Monahan2020]]`:`BSG/ACPGBI/UKCGG 2020: below the moderate-risk threshold (one FDR before 50, or two FDRs at any age). [[Monahan2020]]`}
    else{rr=`RR <b>3.97</b> (2.60–6.06) with two or more affected relatives [[Butterworth2006]]`;abs=`6.9% (4.5–10.4)`;cls='no';
      more=`Roos 2019 gives 8.2% (6.1–10.9) to age 85 with two or more FDRs. [[Roos2019]]`;
      us=`USMSTF 2017: two FDRs at any age means colonoscopy every 5 years from 40, or 10 years before the youngest relative's diagnosis, whichever is earlier: here from <b>${Math.min(40,a-10)}</b>. [[Rex2017]]`;
      uk=n===3?`BSG/ACPGBI/UKCGG 2020: high risk (three or more FDRs across two or more generations): colonoscopy every 5 years from 40 to 75. [[Monahan2020]]`:`BSG/ACPGBI/UKCGG 2020: moderate risk (two FDRs at any age): a one-off colonoscopy at 55. [[Monahan2020]]`;
      if(n===3&&young)more+=` Three relatives over two generations, one diagnosed before 50, is the shape of the Amsterdam II criteria for Lynch syndrome (which also count endometrial and other Lynch cancers): see <a href="#genes" data-go="genes">Lynch syndrome &amp; FAP</a>. [[Vasen1999,Syngal2015]]`}
    $('#rkFhOut').innerHTML=`<div class="kicker">Your selection</div>
      <div><span class="big-num">${abs}</span><p>lifetime risk for a 50-year-old with this family history, against 1.8% with none (life-table estimate). [[Butterworth2006]]</p></div>
      <p>${rr}</p>${more?`<p>${more}</p>`:''}
      <div class="verdict ${cls}">${n===0?'No affected first-degree relative':n===1?(young?'One relative, diagnosed young':'One relative'):'Two or more relatives'}</div>
      <p><b>US:</b> ${us}</p><p><b>UK:</b> ${uk}</p>
      <p class="stage-cap">The RR is larger for a younger person at risk (2.81 under 50, 1.47 at 50 or older) and smaller in cohort-only data. Screening adherence among people with a family history is below 50%. [[Wong2018,Roos2019,Lowery2016]]</p>
      <div class="pt"><b>In plain words</b>Even with a family history, most people never get bowel cancer. The doubling starts from a small number. [[Butterworth2006,Roos2019]]</div>`;
  }
  $('#rkFdr').addEventListener('change',fh);
  $('#rkFage').addEventListener('change',()=>{const v=+$('#rkFage').value;$('#rkFexact').value={40:42,47:47,55:55,65:65}[v];fh()});
  $('#rkFexact').addEventListener('input',()=>{const a=parseInt($('#rkFexact').value,10);if(a>=15&&a<=100)$('#rkFage').value=bandOf(a);fh()});
  fh();
  const prevR=redraws.risk;redraws.risk=()=>{prevR&&prevR();fh()};
};
