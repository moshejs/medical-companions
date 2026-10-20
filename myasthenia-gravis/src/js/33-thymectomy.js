/* =============== 3.3 Thymectomy over the years =============== */
/* monotone cubic (Fritsch-Carlson) through the plotted visits: it never overshoots,
   so an interpolated curve only moves between the values it connects */
function thyMono(P){const n=P.length,x=P.map(p=>p[0]),y=P.map(p=>p[1]),d=[],t=[];
  for(let i=0;i<n-1;i++)d.push((y[i+1]-y[i])/(x[i+1]-x[i]));
  t[0]=d[0];t[n-1]=d[n-2];
  for(let i=1;i<n-1;i++)t[i]=d[i-1]*d[i]<=0?0:(d[i-1]+d[i])/2;
  for(let i=0;i<n-1;i++){if(d[i]===0){t[i]=t[i+1]=0;continue}const a=t[i]/d[i],b=t[i+1]/d[i],h=a*a+b*b;if(h>9){const k=3/Math.sqrt(h);t[i]=k*a*d[i];t[i+1]=k*b*d[i]}}
  return v=>{if(v<=x[0])return y[0];if(v>=x[n-1])return y[n-1];let i=0;while(v>x[i+1])i++;
    const h=x[i+1]-x[i],s=(v-x[i])/h,s2=s*s,s3=s2*s;
    return (2*s3-3*s2+1)*y[i]+(s3-2*s2+s)*h*t[i]+(-2*s3+3*s2)*y[i+1]+(s3-s2)*h*t[i+1]}}
/* MGTX Figure 1, months 0-36. Month 0 is Table 1 (printed, 'm'); later visits were read
   from the published figure ('f': approximate, about ±0.2 QMG points and ±1-2 mg). */
const THY_Q={pa:[[0,12.35,'m'],[3,9.5,'f'],[6,8.1,'f'],[12,8.9,'f'],[24,8.2,'f'],[36,8.2,'f']],
             th:[[0,11.40,'m'],[3,7.4,'f'],[6,6.7,'f'],[12,6.0,'f'],[24,5.3,'f'],[30,4.8,'f'],[36,5.2,'f']]};
const THY_D={pa:[[1,78],[2,84],[3,84],[6,71],[12,60],[24,53],[36,44]],
             th:[[1,67],[2,80],[3,72],[6,61],[12,39],[24,33],[36,30]]};
const THY_FQ={pa:thyMono(THY_Q.pa),th:thyMono(THY_Q.th)}, THY_FD={pa:thyMono(THY_D.pa),th:thyMono(THY_D.th)};
const THY_STAGE=[
 {n:'I',d:'encapsulated, no invasion of the capsule',sv:92.6},
 {n:'II',d:'through the capsule into the surrounding fat or the mediastinal pleura',sv:85.7},
 {n:'III',d:'invading neighbouring organs',sv:69.6},
 {n:'IVa',d:'spread over the pleura or the pericardium',sv:50},
 {n:'IVb',d:'spread through lymph or blood',sv:50}];
const THY_STEPS=[
 {from:0,at:0,k:'Month 0 · Randomisation',t:'The gland and the trial',
  txt:'MGTX randomised 126 people at 36 sites between 2006 and 2012: 66 to extended transsternal thymectomy plus a standard alternate-day prednisone protocol, and 60 to the same prednisone protocol alone. Everyone was 18 to 65, with generalized MG of less than 5 years, AChR antibodies and no thymoma; 6,958 people were screened to find them. Median age was 32 and 33. Mean QMG at entry was 11.40 in the thymectomy arm and 12.35 with prednisone alone. [[Wolfe2016]] In early-onset MG the thymus often looks like a lymph node, with ectopic germinal centres and muscle-like myoid cells that carry AChR, where antibody-making B cells can be primed. [[Cron2018,Kao1977b]]',
  pt:'The thymus is a gland behind the breastbone. In many younger people with MG it holds small antibody-making centres that a healthy thymus does not have.',
  hook:'MGTX population: AChR-positive, generalized, <b>non-thymomatous</b>, age 18 to 65, under 5 years of disease.'},
 {from:.04,at:.6,k:'Month 0 to 1 · Surgery',t:'Extended transsternal thymectomy in MGTX',
  txt:'Surgery was done within 30 days of randomisation. MGTX used extended transsternal thymectomy: the breastbone is split and the thymus is removed with the fat around it, about 85 to 95% of all thymic tissue. To keep the raters blind, participants wore black high-collared shirts that hid the scar. Eight people assigned to surgery declined it, eight in the prednisone arm had it outside the protocol, and a thymoma was found in one; everyone was analysed as randomised. [[Wolfe2016]]',
  txtMI:'MGTX tested only the open, transsternal operation. Video-assisted (VATS) and robotic thymectomy reach the gland through small ports in the side of the chest. Across studies they give similar remission with a shorter hospital stay, but no randomised trial compares them with the open operation, and the concern is that ectopic thymic tissue in the surrounding fat may be left behind. By 2012 robotic thymectomy was done in more than 100 centres. [[Wolfe2016,LeeY2023,Rueckert2015]]',
  pt:'In the trial the surgeon opened the breastbone and took out the whole gland and the fat around it.',
  ptMI:'Keyhole and robotic operations reach the gland through small cuts in the side of the chest instead of opening the breastbone.',
  hook:'Transsternal means through the breastbone. MGTX is evidence for <b>extended transsternal</b> thymectomy; the 2020 AAN advisory says it is uncertain whether the benefit carries over to minimally invasive approaches. [[Gronseth2020]]'},
 {from:1.5,at:3,k:'Month 3',t:'The lines separate',
  txt:'Read from the published figure, mean QMG was about 9.5 with prednisone alone and about 7.4 with thymectomy at month 3, and the curves stayed apart. Prednisone doses peak at months 2 to 3 because the protocol climbs before it tapers: 10 mg on alternate days, raised in 10 mg steps to 100 mg (or 1.5 mg/kg if lower), held until minimal manifestation status, then tapered. Those are the trial protocol\'s doses, quoted to explain the curves; in practice doses are set by the treating clinician. [[Wolfe2016]]',
  pt:'Within a few months the surgery group was a little stronger on average, on slightly less prednisone.',
  hook:'The QMG gap opens by month 3 and stays open.'},
 {from:9,at:12,k:'Month 12',t:'Less prednisone for better control',
  txt:'By month 12 the mean alternate-day prednisone dose was about 60 mg without surgery and about 39 mg with it, and QMG was about 8.9 against 6.0 (both read from the figure). The dose gap was widest between months 12 and 30, at roughly 18 to 21 mg. Azathioprine could be added if minimal manifestation status had not been reached by month 12. The consensus guidance notes that the benefits appeared within the first year and lasted through year 3. [[Wolfe2016,Narayanaswami2021]]',
  pt:'After a year, people who had surgery were taking clearly less prednisone and were still doing better.',
  hook:'Two outcomes at once: better strength (QMG) <b>and</b> less steroid.'},
 {from:30,at:36,k:'Month 36 · Primary result',t:'The 3-year result',
  txt:'Over 3 years the time-weighted average QMG was 6.15 with thymectomy against 8.99 without (difference 2.85 points, P<0.001), and the average alternate-day prednisone dose was 44 mg against 60 mg (P<0.001). At month 36, 67% against 47% were in minimal manifestation status. Fewer needed azathioprine (17% against 48%) or were admitted for an MG exacerbation (9% against 37%). Treatment complications did not differ, and the surgery group reported fewer immunosuppression-related symptoms and less distress. [[Wolfe2016]]',
  pt:'Three years on, the surgery group was stronger on average, took less prednisone and went to hospital less often.',
  hook:'MGTX at 3 years: QMG <b>6.15 vs 8.99</b>; prednisone <b>44 vs 60 mg</b> on alternate days; MMS 67% vs 47%.'},
 {from:40,at:48,ext:true,k:'Month 48 · Extension',t:'The extension study',
  txt:'Of 111 people who completed 36 months, 68 (61%) entered a rater-blinded extension: 35 from the thymectomy arm and 33 from prednisone alone. At month 48, 74% against 52% were in minimal manifestation status (P=0.07). No per-visit QMG values from the extension are in our sources, so after month 36 the chart shows only what was printed. [[Wolfe2019]]',
  pt:'About 6 in 10 people stayed in the study for two more years.',
  hook:'Extension entrants are a self-selected subset of the trial.'},
 {from:55,at:60,ext:true,k:'Month 60 · Five years',t:'Five years: the gap widened',
  txt:'From month 0 to 60 the time-weighted average QMG was 5.47 with thymectomy against 9.34 without (difference 3.87, larger than at 3 years), and the average alternate-day prednisone dose 24 mg against 48 mg. In the surgery arm the mean dose was down to 11.9 mg on alternate days at month 60. Minimal manifestation status: 88% against 58%. Over the 5 years, azathioprine was used by 20% against 58%, IVIG by 9% against 33%, and 6% against 30% were admitted for an exacerbation. The authors note that only 45% of 3-year completers reached month 60 and that entrants were doing better at month 36, so selection bias cannot be excluded. [[Wolfe2019]] A post hoc analysis found sustained minimal manifestations with prednisone stopped in 64% against 38% over 5 years. [[Lee2020]]',
  pt:'Five years later the difference between the groups was bigger, not smaller.',
  hook:'MGTX at 5 years: QMG <b>5.47 vs 9.34</b>; prednisone <b>24 vs 48 mg</b>; MMS 88% vs 58%.'}
];
const THY_VIEW={
 late:'<div class="thy-view"><b>Late-onset view</b>MGTX\'s median age was 32 to 33. In a post hoc analysis, people aged 50 or over at entry showed no significant difference between the arms, and only 17 participants were in that group. A meta-analysis of 20 non-randomised studies in late-onset MG found an odds ratio for response of 1.42 with surgery (not significant), and 1.92 with onset at 45 or more or surgery at 50 or more. The late-onset thymus is often involuted, with less gland tissue and more fat. [[Narayanaswami2021,Heber2026,Chen2025,Sarkkinen2022]]</div>',
 thymoma:'<div class="thy-view"><b>Thymoma view</b>MGTX excluded thymoma, so its curves do not apply. With rare exceptions, guidance says everyone with MG and a thymoma should have surgery to remove the tumour and all thymic tissue; removing it may not improve the MG. In older or frail people, palliative radiotherapy or watching a small thymoma can be considered. Masaoka stage describes how far the tumour has spread; 5-year survival in the 1981 series was 92.6%, 85.7%, 69.6% and 50% for stages I to IV. [[Sanders2016,Masaoka1981]]</div>'
};

inits.thymectomy=()=>{
  const svg=$('#thySvg'),rg=$('#thyT'),stEl=$('#thySteps');
  let gland='early',appr='open',pred=true,ext=false,stage=0,stepIdx=-1,stepKey='';
  const MX=()=>ext?60:36;
  const steps=()=>THY_STEPS.filter(s=>ext||!s.ext);
  const T=(x,y,txt,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${txt}</text>`;
  const ln=(x1,y1,x2,y2,st)=>`<path d="M${f1(x1)} ${f1(y1)}L${f1(x2)} ${f1(y2)}" style="${st}"/>`;
  const dot=(x,y,col,kind)=>kind==='f'?`<circle cx="${f1(x)}" cy="${f1(y)}" r="3.6" style="fill:var(--panel);stroke:${col};stroke-width:1.8"/>`
                                     :`<circle cx="${f1(x)}" cy="${f1(y)}" r="4" style="fill:${col};stroke:var(--panel);stroke-width:1.2"/>`;
  const dia=(x,y,col)=>`<rect x="${f1(x-3.4)}" y="${f1(y-3.4)}" width="6.8" height="6.8" transform="rotate(45 ${f1(x)} ${f1(y)})" style="fill:${col};stroke:var(--panel);stroke-width:1"/>`;
  const poly=(fn,m0,m1,X,Y)=>{if(m1<=m0)return '';let d='';const n=Math.max(2,Math.ceil((m1-m0)*4));for(let i=0;i<=n;i++){const u=m0+(m1-m0)*i/n;d+=(i?'L':'M')+f1(X(u))+' '+f1(Y(fn(u)))}return d};
  /* a label with a soft background so it stays legible over the drawing */
  const tagT=(x,y,txt,anc='start',col='var(--ink)')=>{const w=txt.length*5.8+8,x0=anc==='middle'?x-w/2:anc==='end'?x-w:x;
    return `<rect x="${f1(x0)}" y="${f1(y-10)}" width="${f1(w)}" height="14" rx="4" style="fill:var(--panel);opacity:.92"/>`+T(anc==='middle'?x:anc==='end'?x-4:x0+4,y,txt,'t-xs'+(anc==='middle'?' t-mid':anc==='end'?' t-end':''),'fill:'+col)};
  /* labels at the end of lines: push apart so none overlap */
  const spread=(a,gap=11)=>{a.sort((p,q)=>p.y-q.y);for(let k=0;k<8;k++)for(let i=1;i<a.length;i++){const d=a[i].y-a[i-1].y;if(d<gap){const p=(gap-d)/2;a[i-1].y-=p;a[i].y+=p}}return a};
  const wrap=(txt,n)=>{const ws=String(txt).split(' '),o=[];let l='';ws.forEach(w=>{if(l&&(l+' '+w).length>n){o.push(l);l=w}else l=l?l+' '+w:w});if(l)o.push(l);return o};
  const R=rng(33),TC=Array.from({length:22},()=>[R(),R()]);

  /* ---------- the chest, front view (local 262 x 268) ---------- */
  function tumour(){const cx=148,cy=126,st='fill:var(--comp);fill-opacity:.26;stroke:var(--comp);stroke-width:2';let s='';
    if(stage===0)s+=`<circle cx="${cx}" cy="${cy}" r="19" style="${st}"/><circle cx="${cx}" cy="${cy}" r="15.5" style="fill:none;stroke:var(--comp);stroke-width:.8;stroke-dasharray:2 2"/>`;
    else{let d='';for(let i=0;i<18;i++){const a=i/18*Math.PI*2,r=i%2?19:24;d+=(i?'L':'M')+f1(cx+Math.cos(a)*r)+' '+f1(cy+Math.sin(a)*r)}s+=`<path d="${d}Z" style="${st}"/>`}
    if(stage>=2)s+=`<ellipse cx="158" cy="152" rx="17" ry="12" style="${st}"/>`;
    return s}
  function spreadMarks(){let s='';
    if(stage===3)[[62,120],[54,172],[204,132],[184,200],[112,214]].forEach(([x,y])=>s+=`<circle cx="${x}" cy="${y}" r="3.6" style="fill:var(--comp)"/>`);
    if(stage===4){[[96,40],[166,40],[92,52]].forEach(([x,y])=>s+=`<circle cx="${x}" cy="${y}" r="3.6" style="fill:var(--comp)"/>`);
      s+=`<path d="M226 150 V246" class="arrow" style="stroke:var(--comp)" marker-end="url(#thyAc)"/>`}
    if(stage>=3)s+=tagT(131,52,stage===3?'implants on pleura, pericardium':'lymph-node and distant spread','middle','var(--comp)');
    return s}
  function chest(m){
    const op=appr==='open',tm=gland==='thymoma',lo=gland==='late';
    const s1=ramp(m,.05,.25),s2=ramp(m,.25,.45),s3=ramp(m,.45,.75),s4=ramp(m,.75,.95);
    let s=`<rect x="0" y="0" width="262" height="268" rx="10" style="fill:var(--panel);stroke:var(--line)"/>`;
    s+=`<path d="M26 266 C28 186 30 112 44 74 Q56 46 92 36 Q108 32 110 16 H152 Q154 32 170 36 Q206 46 218 74 C232 112 234 186 236 266 Z" style="fill:var(--muscle);stroke:var(--memb);stroke-width:1.4"/>`;
    s+=`<path d="M114 66 Q72 62 56 108 Q42 160 48 236 Q82 250 114 236 Z" style="fill:var(--panel-2);stroke:var(--line);stroke-width:1.4"/>`;
    s+=`<path d="M148 66 Q190 62 206 108 Q220 160 214 236 Q180 250 148 236 Z" style="fill:var(--panel-2);stroke:var(--line);stroke-width:1.4"/>`;
    s+=`<path d="M110 158 Q98 196 134 228 Q176 218 182 184 Q186 152 150 150 Q124 148 110 158Z" style="fill:var(--bad-soft);stroke:var(--bad);stroke-width:1.4"/>`;
    for(let i=0;i<7;i++){const y=74+i*25;s+=`<path d="M122 ${y}Q86 ${y-8} 50 ${y+16}M140 ${y}Q176 ${y-8} 212 ${y+16}" style="fill:none;stroke:var(--memb);stroke-width:2;opacity:.32"/>`}
    // thymus, the fat around it and any tumour: lifted out during the operation
    const lift=op?`translate(0 ${f1(-64*s3)})`:`translate(${f1(56*s3)} ${f1(-6*s3)})`;
    let g=`<ellipse cx="131" cy="116" rx="46" ry="58" style="fill:var(--ach-soft);stroke:var(--ach);stroke-width:1.2;stroke-dasharray:3 3;opacity:${f1(.3+.6*bump(m,.15,.8))}"/>`;
    const sc=lo?.68:tm?.84:1,lobe=lo?'fill:var(--ach-soft);stroke:var(--ach)':'fill:var(--ab-soft);stroke:var(--ab)';
    g+=`<g transform="translate(131 112) scale(${sc}) translate(-131 -112)"><ellipse cx="117" cy="114" rx="15" ry="40" transform="rotate(9 117 114)" style="${lobe};stroke-width:1.6"/><ellipse cx="146" cy="116" rx="16" ry="42" transform="rotate(-9 146 116)" style="${lobe};stroke-width:1.6"/>`;
    if(gland==='early')[[118,96],[122,124],[116,140],[145,98],[141,130],[147,114]].forEach(([x,y])=>g+=`<circle cx="${x}" cy="${y}" r="3.4" style="fill:var(--ab)"/>`);
    if(lo)[[118,94],[121,112],[118,130],[144,96],[142,114],[146,132]].forEach(([x,y])=>g+=`<circle cx="${x}" cy="${y}" r="4.6" style="fill:var(--panel);stroke:var(--ach);stroke-width:1"/>`);
    g+='</g>';
    if(tm)g+=tumour();
    if(s3>=1)s+=`<g style="opacity:.75"><ellipse cx="117" cy="114" rx="15" ry="40" transform="rotate(9 117 114)" style="fill:none;stroke:var(--muted);stroke-width:1.2;stroke-dasharray:3 3"/><ellipse cx="146" cy="116" rx="16" ry="42" transform="rotate(-9 146 116)" style="fill:none;stroke:var(--muted);stroke-width:1.2;stroke-dasharray:3 3"/></g>`;
    s+=`<g transform="${lift}" style="opacity:${f1(1-.93*s3)}">${g}</g>`;
    if(tm)s+=spreadMarks();
    // breastbone: split and spread in the open operation, closed with wires
    const dx=op?14*s2*(1-s4):0,so=op?lerp(.62,.18,s2*(1-s4)):.62;
    const stern=(x,w)=>`<rect x="${f1(x)}" y="50" width="${w}" height="180" rx="5" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.2;opacity:${f1(so)}"/>`;
    s+=op&&s1>0?stern(122-dx,9)+stern(131+dx,9):stern(122,18);
    if(op&&s1>0&&s4<1)s+=ln(131,50,131,50+180*s1,'stroke:var(--bad);stroke-width:2;stroke-dasharray:4 3;opacity:'+f1(1-s4));
    if(op&&s4>0){s+=ln(131,52,131,228,'stroke:var(--memb);stroke-width:1.2;opacity:'+f1(s4));
      [72,102,132,162,192,216].forEach(y=>s+=`<path d="M127 ${y-3}L135 ${y+3}M135 ${y-3}L127 ${y+3}" style="stroke:var(--muted);stroke-width:1.6;opacity:${f1(s4)}"/>`)}
    if(!op&&s1>0){const P=[[204,108],[210,140],[202,172]],Q=[[152,104],[154,122],[150,140]];
      P.forEach(([x,y],i)=>{if(s2>0&&s4<1)s+=ln(x,y,lerp(x,Q[i][0],s2),lerp(y,Q[i][1],s2),`stroke:var(--muted);stroke-width:2.6;stroke-linecap:round;opacity:${f1(1-s4)}`);
        s+=`<circle cx="${x}" cy="${y}" r="${f1(lerp(5,2.6,s4))}" style="fill:var(--panel);stroke:var(--bad);stroke-width:1.6;opacity:${f1(s1)}"/>`});
      if(s3>=1&&!tm)s+=`<circle cx="100" cy="152" r="3" style="fill:var(--ab)"/><circle cx="166" cy="78" r="3" style="fill:var(--ab)"/>`+tagT(72,172,'ectopic tissue left in fat?','start','var(--ab)')}
    // labels
    if(s3<.3){s+=ln(131,36,131,64,'stroke:var(--muted);stroke-dasharray:2 2');s+=tagT(131,32,lo?'thymus, mostly fat, behind the breastbone':tm?'thymoma within the thymus':'thymus, behind the breastbone','middle',tm?'var(--comp)':'var(--ink)')}
    else s+=tagT(131,32,tm?'removed: tumour + all thymic tissue':'removed: thymus + surrounding fat','middle','var(--drug)');
    s+=tagT(70,206,'lung','middle')+tagT(162,206,'heart','start');
    if(s3>=1)s+=tagT(170,92,'empty bed','start','var(--muted)');
    const cap=m<.05?'breastbone':m<.95?(op?'breastbone split (sternotomy)':'ports between the ribs'):(op?'wires hold the breastbone':'three small scars');
    s+=tagT(131,258,cap,'middle',m>=.05&&m<.95?'var(--bad)':'var(--ink)');
    return s}

  /* ---------- inside the gland (local 262 x 150) ---------- */
  function detail(m){let s=`<rect x="0" y="0" width="262" height="150" rx="10" style="fill:var(--field);stroke:var(--line)"/>`;
    if(gland==='early'){
      s+=`<circle cx="66" cy="74" r="50" style="fill:var(--ab-soft);opacity:.75"/>`;
      for(let k=0;k<12;k++){const a=k/12*Math.PI*2;s+=`<circle cx="${f1(66+Math.cos(a)*34)}" cy="${f1(74+Math.sin(a)*34)}" r="6" style="fill:var(--panel);stroke:var(--ab);stroke-width:1.4"/>`}
      for(let k=0;k<6;k++){const a=k/6*Math.PI*2+.5;s+=`<circle cx="${f1(66+Math.cos(a)*17)}" cy="${f1(74+Math.sin(a)*17)}" r="5.4" style="fill:var(--panel);stroke:var(--ab);stroke-width:1.2"/>`}
      s+=`<circle cx="66" cy="74" r="8" style="fill:var(--nerve-soft);stroke:var(--nerve);stroke-width:1.4"/>`+T(66,77.5,'T','t-xs t-mid','fill:var(--nerve);font-weight:700');
      s+=`<rect x="146" y="26" width="92" height="18" rx="9" style="fill:var(--muscle);stroke:var(--memb);stroke-width:1.2"/>`;
      [160,180,200,220].forEach(x=>s+=achr(x,26,7,.3));
      s+=T(192,58,'myoid cell with AChR','t-xs t-mid');
      s+=`<ellipse cx="158" cy="98" rx="15" ry="12" style="fill:var(--ab-soft);stroke:var(--ab);stroke-width:1.4"/><circle cx="164" cy="98" r="5" style="fill:var(--nuc)"/>`;
      for(let i=0;i<5;i++){const q=(m*1.4+i/5)%1;s+=igg(lerp(178,248,q),98-22*q+4*Math.sin(q*9),6.5,.5,1-.75*q)}
      s+=T(196,128,'plasma cell makes IgG','t-xs t-mid')+T(66,142,'ectopic germinal centre','t-xs t-mid');
    }else if(gland==='late'){
      for(let i=0;i<5;i++)for(let j=0;j<3;j++)s+=`<circle cx="${30+i*50+(j%2)*12}" cy="${30+j*38}" r="18" style="fill:var(--panel);stroke:var(--ach);stroke-width:1.2;opacity:.85"/>`;
      TC.slice(0,12).forEach(([u,v])=>s+=`<circle cx="${f1(14+u*234)}" cy="${f1(14+v*100)}" r="2.4" style="fill:var(--nerve)"/>`);
      s+=T(131,140,'involuted: fat replaces most gland tissue','t-xs t-mid');
    }else{
      for(let r=0;r<3;r++)for(let c=0;c<6;c++){const cx=26+c*42+(r%2)*20,cy=28+r*36;let d='';for(let k=0;k<6;k++){const a=k/6*Math.PI*2+Math.PI/6;d+=(k?'L':'M')+f1(cx+Math.cos(a)*15)+' '+f1(cy+Math.sin(a)*15)}
        if(cx<250)s+=`<path d="${d}Z" style="fill:var(--panel);stroke:var(--comp);stroke-width:1.3"/>`}
      TC.forEach(([u,v])=>s+=`<circle cx="${f1(12+u*238)}" cy="${f1(12+v*104)}" r="2.2" style="fill:var(--nerve)"/>`);
      s+=T(131,140,'tumour epithelial cells + immature T cells','t-xs t-mid');
    }
    if(m>=.8)s+=`<rect x="1" y="1" width="260" height="17" rx="9" style="fill:var(--drug-soft);opacity:${f1(ramp(m,.8,.95))}"/>`+T(131,13,'thymectomy arm: removed in month 1','t-xs t-mid',`fill:var(--drug);opacity:${f1(ramp(m,.8,.95))}`);
    return s}

  /* ---------- QMG over the months ---------- */
  function qmgP(P,m){const {x,y,w}=P,Mx=MX();let s='';
    const px0=x+30,px1=x+w-78,py0=y+34,py1=y+156,X=v=>px0+v/Mx*(px1-px0),Y=v=>py1-v/14*(py1-py0);
    s+=T(x,y,'3 · QMG OVER THE TRIAL MONTHS','t-sm','fill:var(--ink)')+T(x,y+15,gland==='late'?'Mean QMG. Post hoc, age 50 or over: no significant gap.':'Mean QMG score; higher means weaker.');
    [0,4,8,12].forEach(v=>{s+=ln(px0,Y(v),px1,Y(v),'stroke:var(--line);stroke-dasharray:2 4')+T(px0-6,Y(v)+3,v,'t-xs t-end')});
    (ext?[0,12,24,36,48,60]:[0,6,12,18,24,30,36]).forEach(v=>{s+=T(X(v),py1+13,v,'t-xs t-mid')});
    s+=T(x,py1+13,'mo');
    if(ext){const xa=X(36);s+=`<rect x="${f1(xa)}" y="${py0}" width="${f1(px1-xa)}" height="${py1-py0}" style="fill:var(--panel-2);opacity:.6"/>`;
      s+=T((xa+px1)/2,py0+14,'EXTENSION','t-xs t-mid','font-weight:700');
      ['no per-visit QMG','in our sources;','only 4 rose ≥2 pts'].forEach((l,i)=>{s+=T((xa+px1)/2,py0+92+i*12,l,'t-xs t-mid')})}
    const mp=Math.min(m,36),pa=THY_FQ.pa,th=THY_FQ.th;
    if(mp>.05){let d=poly(pa,0,mp,X,Y);const back=poly(th,0,mp,X,Y).slice(1).split('L').reverse().join('L');d+='L'+back+'Z';s+=`<path d="${d}" style="fill:var(--drug-soft);opacity:.7"/>`}
    s+=`<path d="${poly(pa,0,mp,X,Y)}" style="fill:none;stroke:var(--muted);stroke-width:2.4"/><path d="${poly(th,0,mp,X,Y)}" style="fill:none;stroke:var(--drug);stroke-width:2.8"/>`;
    THY_Q.pa.forEach(p=>{if(m>=p[0]-.01)s+=dot(X(p[0]),Y(p[1]),'var(--muted)',p[2])});
    THY_Q.th.forEach(p=>{if(m>=p[0]-.01)s+=dot(X(p[0]),Y(p[1]),'var(--drug)',p[2])});
    const t3=ramp(m,35,36),t5=ext?ramp(m,59,60):0;
    if(t3>0){[ [8.99,'var(--muted)'],[6.15,'var(--drug)'] ].forEach(([v,c])=>s+=ln(X(0),Y(v),X(36),Y(v),`stroke:${c};stroke-width:1.6;stroke-dasharray:6 3;opacity:${f1(t3*(1-.65*t5))}`))}
    if(t5>0){[ [9.34,'var(--muted)'],[5.47,'var(--drug)'] ].forEach(([v,c])=>s+=ln(X(0),Y(v),X(60),Y(v),`stroke:${c};stroke-width:1.8;stroke-dasharray:6 3;opacity:${f1(t5)}`)+dot(X(60),Y(v),c,'m'))}
    s+=ln(X(m),py0,X(m),py1,'stroke:var(--ink);opacity:.3');
    const exact=m<.05,L=[{y:Y(pa(mp)),t:exact?'12.35':'≈'+f1(pa(mp)),c:'var(--muted)'},{y:Y(th(mp)),t:exact?'11.40':'≈'+f1(th(mp)),c:'var(--drug)'}];
    if(t3>0)L.push({y:Y(8.99),t:'3-yr avg 8.99',c:'var(--muted)',o:t3},{y:Y(6.15),t:'3-yr avg 6.15',c:'var(--drug)',o:t3});
    if(!ext||m<=37)spread(L).forEach(l=>{s+=T(X(mp)+6,l.y+3,l.t,'t-xs',`fill:${l.c};opacity:${f1(l.o==null?1:l.o)}`)});
    if(t5>0)spread([{y:Y(9.34),t:'5-yr avg 9.34',c:'var(--muted)'},{y:Y(5.47),t:'5-yr avg 5.47',c:'var(--drug)'}],12).forEach(l=>{s+=T(px1+8,l.y+3,l.t,'t-xs',`fill:${l.c};font-weight:700;opacity:${f1(t5)}`)});
    let r=exact?'Month 0 (Table 1): 12.35 vs 11.40, printed':`Month ${m<3?f1(m):Math.round(m)}: pred. alone ≈${f1(pa(mp))} · thymectomy ≈${f1(th(mp))} (approx.)`;
    if(m>36.2)r=m>=60?'Months 0 to 60, time-weighted: 9.34 vs 5.47 (printed)':'After month 36: only the printed averages';
    else if(m>=36)r='3-year time-weighted average: 8.99 vs 6.15 (printed)';
    s+=T(x,py1+30,r,'t-xs','fill:var(--ink)');
    return s}

  /* ---------- prednisone dose ---------- */
  function predP(P,m){const {x,y,w}=P,Mx=MX();let s='';
    const px0=x+30,px1=x+w-78,py0=y+30,py1=y+132,X=v=>px0+v/Mx*(px1-px0),Y=v=>py1-v/90*(py1-py0);
    s+=T(x,y,'4 · PREDNISONE DOSE','t-sm','fill:var(--ink)')+T(x,y+15,'Mean alternate-day dose, mg');
    [0,30,60,90].forEach(v=>{s+=ln(px0,Y(v),px1,Y(v),'stroke:var(--line);stroke-dasharray:2 4')+T(px0-6,Y(v)+3,v,'t-xs t-end')});
    (ext?[0,12,24,36,48,60]:[0,6,12,18,24,30,36]).forEach(v=>{s+=T(X(v),py1+13,v,'t-xs t-mid')});
    s+=T(x,py1+13,'mo');
    if(ext){const xa=X(36);s+=`<rect x="${f1(xa)}" y="${py0}" width="${f1(px1-xa)}" height="${py1-py0}" style="fill:var(--panel-2);opacity:.6"/>`;
      s+=T((xa+px1)/2,py0+11,'EXTENSION','t-xs t-mid','font-weight:700')+T((xa+px1)/2,py0+23,'path unpublished;','t-xs t-mid')+T((xa+px1)/2,py0+34,'line: schematic','t-xs t-mid')}
    s+=dia(X(0)-3,Y(42.5),'var(--muted)')+dia(X(0)+3,Y(43.4),'var(--drug)')+T(X(0)+9,Y(15)+3,'month 0, users: 42.5 / 43.4','t-xs');
    s+=ln(X(0)+2,Y(40),X(0)+6,Y(18),'stroke:var(--muted);stroke-width:.8');
    const mp=Math.min(m,36),pa=THY_FD.pa,th=THY_FD.th;
    if(m>=1){s+=`<path d="${poly(pa,1,mp,X,Y)}" style="fill:none;stroke:var(--muted);stroke-width:2.4"/><path d="${poly(th,1,mp,X,Y)}" style="fill:none;stroke:var(--drug);stroke-width:2.8"/>`}
    THY_D.pa.forEach(p=>{if(m>=p[0]-.01)s+=dot(X(p[0]),Y(p[1]),'var(--muted)','f')});
    THY_D.th.forEach(p=>{if(m>=p[0]-.01)s+=dot(X(p[0]),Y(p[1]),'var(--drug)','f')});
    const t3=ramp(m,35,36),t5=ext?ramp(m,59,60):0;
    if(ext&&m>36){const me=Math.min(m,60),v=lerp(30,11.9,(me-36)/24);s+=ln(X(36),Y(30),X(me),Y(v),'stroke:var(--drug);stroke-width:1.8;stroke-dasharray:3 3')}
    if(t5>0)s+=dot(X(60),Y(11.9),'var(--drug)','m')+T(X(60)-6,Y(11.9)+15,'11.9 mg','t-xs t-end','fill:var(--drug);font-weight:700');
    if(t3>0)[ [60,'var(--muted)'],[44,'var(--drug)'] ].forEach(([v,c])=>s+=ln(X(0),Y(v),X(36),Y(v),`stroke:${c};stroke-width:1.6;stroke-dasharray:6 3;opacity:${f1(t3*(1-.65*t5))}`));
    if(t5>0)[ [48,'var(--muted)'],[24,'var(--drug)'] ].forEach(([v,c])=>s+=ln(X(0),Y(v),X(60),Y(v),`stroke:${c};stroke-width:1.8;stroke-dasharray:6 3;opacity:${f1(t5)}`));
    s+=ln(X(m),py0,X(m),py1,'stroke:var(--ink);opacity:.3');
    if(m>=1){const L=[{y:Y(pa(mp)),t:'≈'+Math.round(pa(mp)),c:'var(--muted)'},{y:Y(th(mp)),t:'≈'+Math.round(th(mp)),c:'var(--drug)'}];
      if(t3>0)L.push({y:Y(60),t:'3-yr avg 60',c:'var(--muted)',o:t3},{y:Y(44),t:'3-yr avg 44',c:'var(--drug)',o:t3});
      if(!ext||m<=37)spread(L).forEach(l=>{s+=T(X(mp)+6,l.y+3,l.t,'t-xs',`fill:${l.c};opacity:${f1(l.o==null?1:l.o)}`)})}
    if(t5>0)spread([{y:Y(48),t:'5-yr avg 48',c:'var(--muted)'},{y:Y(24),t:'5-yr avg 24',c:'var(--drug)'}],12).forEach(l=>{s+=T(px1+8,l.y+3,l.t,'t-xs',`fill:${l.c};font-weight:700;opacity:${f1(t5)}`)});
    let r=m<1?'First plotted value is at month 1':`Month ${m<3?f1(m):Math.round(m)}: ≈${Math.round(pa(mp))} vs ≈${Math.round(th(mp))} mg (approx.)`;
    if(m>36.2)r=m>=60?'Months 0 to 60, time-weighted: 48 vs 24 mg (printed)':'Month 60: printed for the thymectomy arm only';
    else if(m>=36)r='3-year time-weighted average: 60 vs 44 mg (printed)';
    s+=T(x,py1+30,r,'t-xs','fill:var(--ink)');
    return s}

  /* ---------- outcomes printed at fixed times ---------- */
  function outP(P,m,N){const {x,y,w}=P;let s='';
    const five=ext&&m>=59.99;
    const rows=[{l:'MMS at month 36',a:47,b:67,at:36}];
    if(ext)rows.push({l:'MMS at month 48',a:52,b:74,at:48},{l:'MMS at month 60',a:58,b:88,at:60});
    rows.push({l:five?'Azathioprine, mo 0–60':'Azathioprine, mo 0–36',a:five?58:48,b:five?20:17,at:five?60:36},
              {l:five?'MG admission, mo 0–60':'MG admission, mo 0–36',a:five?30:37,b:five?6:9,at:five?60:36});
    if(ext)rows.push({l:'IVIG, mo 0–60',a:33,b:9,at:60});
    s+=T(x,y,'5 · OUTCOMES PRINTED AT FIXED TIMES','t-sm','fill:var(--ink)')+T(x+w,y,'% of each arm','t-xs t-end');
    const rh=N?34:26,bx=N?x:x+150,bw=w-(N?44:194);
    rows.forEach((r,i)=>{const ry=y+16+i*rh,k=ramp(m,r.at-1.5,r.at),by=N?ry+8:ry;
      s+=T(x,N?ry+3:ry+10,r.l,'t-xs','fill:var(--ink)');
      if(k<=0){s+=T(bx,N?ry+17:ry+10,`printed at month ${r.at}`,'t-xs','font-style:italic');return}
      [[r.a,'var(--muted)',0],[r.b,'var(--drug)',8]].forEach(([v,c,o])=>{const ww=bw*v/100*k;
        s+=`<rect x="${bx}" y="${by+o}" width="${f1(ww)}" height="6" rx="3" style="fill:${c}"/>`+T(bx+ww+4,by+o+6,Math.round(v*k)+'%','t-xs',`fill:${c};font-weight:700`)})});
    return {s,h:16+rows.length*rh}}

  function legend(x,y){const L=[
    [`<path d="M${x} ${y-3}H${x+16}" style="stroke:var(--muted);stroke-width:2.6"/>`,'prednisone alone'],
    [`<path d="M${x} ${y+11}H${x+16}" style="stroke:var(--drug);stroke-width:2.8"/>`,'thymectomy + prednisone'],
    [dot(x+8,y+25,'var(--muted)','m'),'printed trial value'],
    [dot(x+8,y+39,'var(--muted)','f'),'read from the published figure, approximate'],
    [`<path d="M${x} ${y+53}H${x+16}" style="stroke:var(--muted);stroke-width:1.6;stroke-dasharray:6 3"/>`,'time-weighted average (printed)']];
    let s='';L.forEach(([g,t],i)=>{s+=g+T(x+22,y+i*14,t)});
    s+=T(x,y+70,'Lines between dots are interpolated, not data.')+T(x,y+84,'Anatomy is schematic, not to scale.');
    return {s,h:90}}

  function draw(m){
    m=+m;const N=vb(svg,'720 600','400 1200'),tm=gland==='thymoma';
    const C=N?{x:12,y:16,w:376}:{x:12,y:16,w:262},G=N?{x:12,y:330,w:376}:{x:12,y:330,w:262};
    const Q=N?{x:12,y:520,w:376}:{x:296,y:16,w:412};
    const Pd=N?{x:12,y:730,w:376}:{x:296,y:226,w:412};
    const M=N?{x:12,y:pred?914:730,w:376}:{x:296,y:pred?412:226,w:412};
    let s=`<defs>${marker('thyAc','var(--comp)')}</defs><rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    const ox=C.x+(C.w-262)/2;
    s+=T(C.x,C.y,'1 · CHEST, FRONT VIEW','t-sm','fill:var(--ink)')+T(C.x+C.w,C.y,tm?'thymoma resection':'thymectomy arm','t-xs t-end');
    s+=`<g transform="translate(${f1(ox)} ${C.y+10})">${chest(m)}</g>`;
    s+=T(C.x,C.y+294,tm?'Guidance: remove tumour + all thymic tissue.':'The prednisone-alone arm kept its thymus.','t-xs');
    s+=T(G.x,G.y,'2 · INSIDE THE GLAND','t-sm','fill:var(--ink)')+T(G.x+G.w,G.y,{early:'early onset',late:'late onset',thymoma:'thymoma'}[gland],'t-xs t-end');
    s+=`<g transform="translate(${f1(ox)} ${G.y+10})">${detail(m)}</g>`;
    let rs=qmgP(Q,m);if(pred)rs+=predP(Pd,m);const o=outP(M,m,N);rs+=o.s;
    if(tm){s+=`<g style="opacity:.16">${rs}</g>`;
      const bx=Q.x+6,bw=Q.w-12,by=Q.y+30,n=Math.floor((bw-28)/6.7),st=THY_STAGE[stage];
      const L1=wrap('MGTX excluded thymoma; one was found at surgery. With rare exceptions, guidance says everyone with MG and a thymoma should have surgery to remove the tumour and all thymic tissue, and removing it may not improve the MG.',n);
      const L2=wrap(`Masaoka stage ${st.n}: ${st.d}.`,n);
      const L3=wrap('WHO histology types A, AB, B1, B2 and B3. MG goes mostly with cortical type B thymomas and is rare with type A. Pick a stage above the chart.',n);
      const bh=24+20+L1.length*15+8+L2.length*15+44+L3.length*15;
      s+=`<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="12" style="fill:var(--panel);stroke:var(--comp);stroke-width:1.4"/>`;
      let yy=by+24;s+=T(bx+14,yy,'THYMOMA: OUTSIDE THE MGTX TRIAL','t-sm','fill:var(--comp);font-weight:700');yy+=20;
      L1.forEach(l=>{s+=T(bx+14,yy,l,'t-sm','fill:var(--ink)');yy+=15});yy+=8;
      L2.forEach(l=>{s+=T(bx+14,yy,l,'t-sm','fill:var(--ink);font-weight:700');yy+=15});
      const sw=bw-28;s+=`<rect x="${bx+14}" y="${yy}" width="${sw}" height="9" rx="4.5" style="fill:var(--panel-2)"/><rect x="${bx+14}" y="${yy}" width="${f1(sw*st.sv/100)}" height="9" rx="4.5" style="fill:var(--comp)"/>`;
      s+=T(bx+14,yy+24,`5-year survival (1981 series): ${st.sv}%${stage>=3?', stage IV overall':''}`,'t-xs','fill:var(--ink)');yy+=44;
      L3.forEach(l=>{s+=T(bx+14,yy,l,'t-sm');yy+=15});
    }else s+=rs;
    const rightEnd=M.y+o.h+10,leftEnd=G.y+178;
    const lgY=N?rightEnd+16:leftEnd+20,lg=legend(N?12:12,lgY);s+=lg.s;
    const H=Math.ceil(Math.max(N?lgY+lg.h:Math.max(lgY+lg.h,rightEnd+6),0));
    svg.setAttribute('viewBox',`0 0 ${N?400:720} ${H}`);
    svg.innerHTML=s;
    $('#thyMo').textContent=m<.05?'month 0':`month ${f1(m)}`;
    const S=steps(),p=phaseOf(S,m);setSt(p,m);
    const P=S[p],mi=appr==='mi'&&P.txtMI;
    const note=noteHTML({k:P.k,t:mi?'VATS and robotic thymectomy':P.t,txt:mi?P.txtMI:P.txt,pt:mi?P.ptMI:P.pt,hook:P.hook});
    const mp=Math.min(m,36);
    const read=tm?'':`<p class="readout"><span>Month <b>${Math.round(m)}</b></span><span>QMG <b>${m<.05?'12.35 / 11.40':m>36.2?'printed averages only':'≈'+f1(THY_FQ.pa(mp))+' / ≈'+f1(THY_FQ.th(mp))}</b></span><span>Prednisone <b>${m<1?'not plotted yet':m>36.2?'—':'≈'+Math.round(THY_FD.pa(mp))+' / ≈'+Math.round(THY_FD.th(mp))+' mg'}</b></span><span>(prednisone alone / thymectomy)</span></p>`;
    $('#thyNote').innerHTML=note+(THY_VIEW[gland]||'')+read;
    $('#thyCap').textContent=`${{early:'Early-onset thymus',late:'Late-onset thymus',thymoma:'Thymoma, Masaoka stage '+THY_STAGE[stage].n}[gland]} · ${appr==='open'?'extended transsternal':'VATS or robotic'} · ${ext?'5 years':'3 years'}. Anatomy is schematic, not to scale. Filled dots are printed trial values; open dots were read from the published figure and are approximate; lines between them are interpolated.`;
  }
  function buildSteps(){const S=steps(),key=String(ext);if(key===stepKey)return;stepKey=key;
    stEl.innerHTML=S.map((s,i)=>`<button data-st="${i}" aria-pressed="false"><b>${String(i+1).padStart(2,'0')}</b><span>${s.t}</span></button>`).join('');stepIdx=-1}
  function setSt(i,m){const S=steps();if(i!==stepIdx){$$('[data-st]',stEl).forEach((b,k)=>b.setAttribute('aria-pressed',k===i));stepIdx=i}
    rg.setAttribute('aria-valuetext',`Month ${f1(m)}. Step ${i+1} of ${S.length}: ${S[i].t}`)}
  stEl.addEventListener('click',e=>{const b=e.target.closest('[data-st]');if(!b)return;stop();rg.value=steps()[+b.dataset.st].at;draw(+rg.value)});
  const stop=playWire(rg,$('#thyPlay'),draw,18000,'Replay','thymectomy');
  const press=(ids,on)=>ids.forEach(id=>$(id).setAttribute('aria-pressed',id===on));
  const G3=['#thyEO','#thyLO','#thyTM'];
  const setG=(g,id)=>{gland=g;press(G3,id);$('#thyStageRow').hidden=g!=='thymoma';draw(+rg.value)};
  $('#thyEO').onclick=()=>setG('early','#thyEO');$('#thyLO').onclick=()=>setG('late','#thyLO');$('#thyTM').onclick=()=>setG('thymoma','#thyTM');
  $('#thyOpen').onclick=()=>{appr='open';press(['#thyOpen','#thyMI'],'#thyOpen');draw(+rg.value)};
  $('#thyMI').onclick=()=>{appr='mi';press(['#thyOpen','#thyMI'],'#thyMI');draw(+rg.value)};
  $('#thyPred').onclick=()=>{pred=!pred;$('#thyPred').setAttribute('aria-pressed',pred);draw(+rg.value)};
  $('#thyExt').onclick=()=>{ext=!ext;$('#thyExt').setAttribute('aria-pressed',ext);stop();rg.max=MX();if(+rg.value>MX())rg.value=MX();buildSteps();draw(+rg.value)};
  $$('[data-thst]').forEach(b=>b.onclick=()=>{stage=+b.dataset.thst;$$('[data-thst]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+rg.value)});
  buildSteps();draw(+rg.value);

  /* ---------- the age-ceiling chart ---------- */
  const THY_AGE=[
   {l:'MGTX enrolled',a:18,b:65,c:'var(--drug)',txt:'MGTX enrolled ages 18 to 65. The first criteria were 18 to 60; they were widened in October 2008 to help recruitment. [[Wolfe2016]]'},
   {l:'2020 consensus: consider early',a:18,b:50,c:'var(--good)',txt:'The 2020 consensus says thymectomy should be considered early in AChR-positive generalized non-thymomatous MG at ages 18 to 50, because the post hoc analysis at 50 or over was negative. [[Narayanaswami2021]]'},
   {l:'Pathology review: up to 60',a:18,b:60,c:'var(--nerve)',txt:'A pathology review describes MGTX as showing benefit up to 60 years. [[Weis2018]]'},
   {l:'UK economic paper: under 45',a:18,b:45,c:'var(--ach)',txt:'The UK economic evaluation describes thymectomy as an adjunct for patients under 45. [[Lord2026]]'},
   {l:'MGTX post hoc: 50 or over',a:50,b:65,c:'var(--bad)',txt:'In a post hoc analysis, people aged 50 or over at entry showed no significant difference in QMG or prednisone dose; only 17 MGTX participants were in that group. [[Narayanaswami2021,Heber2026]]'},
   {l:'Late-onset meta-analysis',a:50,b:80,c:'var(--warn)',txt:'Across 20 non-randomised studies of late-onset MG, the odds ratio for response with surgery was 1.42 (not significant), and 1.92 with onset at 45 or more or surgery at 50 or more. Single cohorts disagree. No randomised trial exists. [[Chen2025,Latini2025,Heber2026]]'},
   {l:'Children',a:0,b:18,c:'var(--warn)',txt:'Before puberty the value of thymectomy is unclear. Guidance says to consider it in AChR-positive generalized MG that responds poorly to pyridostigmine and immunosuppression; the 17 studies in one review were all retrospective. [[Sanders2016,Ng2021]]'},
   {l:'Any age, if immunotherapy fails',a:18,b:80,c:'var(--muted)',txt:'At any age, thymectomy should be strongly considered in AChR-positive generalized MG if an adequate trial of immunotherapy fails or causes intolerable side effects. [[Narayanaswami2021]]'}];
  const ag=$('#thyAge'),ar=$('#thyAgeR');
  function drawAge(){const age=+ar.value,N=vb(ag,'720 300','400 360');
    const top=N?30:34,rh=N?36:28,ax0=N?14:256,ax1=N?386:704,X=v=>ax0+v/80*(ax1-ax0),H=top+THY_AGE.length*rh+(N?34:30);
    ag.setAttribute('viewBox',`0 0 ${N?400:720} ${H}`);
    let s=`<rect width="100%" height="100%" rx="12" style="fill:var(--field)"/>`;
    s+=T(N?14:16,20,'HOW EACH SOURCE FRAMES AGE','t-sm','fill:var(--ink)');
    const axY=top+THY_AGE.length*rh;
    [0,18,30,45,50,60,65,80].forEach(v=>{s+=ln(X(v),top-4,X(v),axY,'stroke:var(--line);stroke-dasharray:2 4')+T(X(v),axY+14,v,'t-xs t-mid')});
    s+=T(N?386:704,axY+28,'age in years','t-xs t-end');
    THY_AGE.forEach((r,i)=>{const ry=top+i*rh,inb=age>=r.a&&age<=r.b,by=N?ry+16:ry+6;
      s+=T(N?14:16,N?ry+11:ry+16,r.l,'t-sm',`fill:var(--ink);font-weight:${inb?700:500};opacity:${inb?1:.6}`);
      s+=`<rect x="${f1(X(r.a))}" y="${by}" width="${f1(X(r.b)-X(r.a))}" height="12" rx="6" style="fill:${r.c};opacity:${inb?.95:.3}"/>`});
    if(N)THY_AGE.forEach((r,i)=>{const by=top+i*rh+16;s+=ln(X(age),by-3,X(age),by+15,'stroke:var(--ink);stroke-width:2')});
    else s+=ln(X(age),top-8,X(age),axY+2,'stroke:var(--ink);stroke-width:2');
    s+=`<circle cx="${f1(X(age))}" cy="${N?axY+2:top-8}" r="4" style="fill:var(--ink)"/>`;
    ag.innerHTML=s;$('#thyAgeV').textContent=age;
    const hits=THY_AGE.filter(r=>age>=r.a&&age<=r.b),miss=THY_AGE.filter(r=>!(age>=r.a&&age<=r.b));
    $('#thyAgeNote').innerHTML=`<div class="kicker">Age ${age}</div><h4>${hits.length} of ${THY_AGE.length} framings include this age</h4><ul class="thy-ages">${hits.map(r=>`<li><span class="tag good">in</span><span>${r.txt}</span></li>`).join('')}${miss.map(r=>`<li><span class="tag">out</span><span>${r.l}</span></li>`).join('')}</ul>
     <div class="pt"><b>In plain words</b>The trial included people up to 65, but experts disagree about how strong the evidence is above 50.</div>
     <div class="hook"><b>Exam hook</b>Consensus 2020: consider thymectomy early for AChR+ generalized MG aged <b>18 to 50</b>; MGTX itself enrolled up to <b>65</b>.</div>`;
  }
  ar.addEventListener('input',drawAge);drawAge();
  const prevR=redraws.thymectomy;redraws.thymectomy=()=>{prevR&&prevR();drawAge()};

  /* ---------- who guidance recommends it for ---------- */
  $('#thyWho').innerHTML=`<table><thead><tr><th>Group</th><th>What the guidance says</th><th>The evidence behind it</th></tr></thead><tbody>
   <tr><th>AChR+ generalized, no thymoma, age 18 to 50</th><td>"Should be considered early in the disease" to improve outcomes and reduce immunotherapy needs and hospital admissions (2020 consensus). [[Narayanaswami2021]] The 2020 AAN advisory, not limited to 50, recommends discussing thymectomy with people with AChR+ generalized MG (Level B), based on one trial in people under 65. [[Gronseth2020]]</td><td><span class="ev est">Established</span> One randomised trial, MGTX, with a blinded primary outcome. [[Wolfe2016]]</td></tr>
   <tr><th>AChR+ generalized, any age</th><td>"Should be strongly considered" if an adequate trial of immunotherapy fails or causes intolerable side effects. [[Narayanaswami2021]]</td><td><span class="ev early">Consensus</span> Expert panel; MGTX did not test this group directly.</td></tr>
   <tr><th>Thymoma</th><td>With rare exceptions, surgery to remove the tumour and all thymic tissue; it may not improve the MG. Palliative radiotherapy or observing a small thymoma can be considered in older or multimorbid people. [[Sanders2016]]</td><td><span class="ev est">Standard practice</span> Consensus guidance; the surgery is for the tumour itself, and MGTX excluded thymoma. [[Sanders2016,Wolfe2016]]</td></tr>
   <tr><th>Seronegative generalized</th><td>"May be considered" if immunosuppression fails or causes intolerable effects. In children, congenital myasthenic syndromes should be ruled out first. [[Sanders2016,Narayanaswami2021]]</td><td><span class="ev early">Early evidence</span> About 75% of MuSK-negative seronegative thymi had lymph-node-type infiltrates like AChR-positive ones. [[Leite2005]]</td></tr>
   <tr><th>MuSK, LRP4 or agrin antibodies</th><td>"Current evidence does not support an indication for thymectomy." [[Sanders2016,Narayanaswami2021]]</td><td><span class="ev hyp">Not supported</span> MuSK thymi mostly resemble normal thymus. In one cohort 35% of operated against 55% of non-operated MuSK patients reached minimal manifestations or better (adjusted OR 0.43, 95% CI 0.12 to 1.53). [[Leite2005,Clifford2019]]</td></tr>
   <tr><th>Ocular, AChR+</th><td>"May be offered" to people who respond poorly to anticholinesterases and prefer not to take, cannot take or do not respond to immunosuppression. [[Narayanaswami2021]]</td><td><span class="ev early">Retrospective</span> One case-control study found no difference in stable remission; case series report complete remission in 26 to 51%. In a robotic cohort, surgery before generalization gave 49.5% against 33.4% 5-year complete stable remission. [[Narayanaswami2021,LiF2020]]</td></tr>
   <tr><th>Children</th><td>Value before puberty unclear; consider in AChR+ generalized MG with a poor response to pyridostigmine and immunosuppression, or to avoid immunosuppression complications. [[Sanders2016]]</td><td><span class="ev early">Retrospective</span> 17 studies (588 operated): 77% improved or needed less medication and 40% reached complete remission. A meta-analysis of 1,109 children found thymic hyperplasia in 64.9% of those examined and thymoma in 2.2%. [[Ng2021,Lin2023]]</td></tr>
   <tr><th>Late-onset (50 or over)</th><td>Not in the "consider early" group; the any-age statement after failed immunotherapy applies. [[Narayanaswami2021]]</td><td><span class="ev early">Conflicting</span> Meta-analysis OR 1.42 (not significant) overall; a Pisa cohort found an adjusted HR of 3.25 for remission with surgery. [[Chen2025,Latini2025]]</td></tr>
   </tbody></table>`;

  /* ---------- cards ---------- */
  $('#thyCards').innerHTML=`
   <div class="card"><span class="ev est">Guidance and trials</span><h4>Before and after the operation</h4>
    <p>Thymectomy is elective: the 2016 guidance gives its long delay in onset of effect as the reason. Guidance says it should be done when the person is stable and judged safe for an operation in which pain and chest mechanics can limit breathing, and recommends postponing it until after pregnancy. [[Sanders2016,Narayanaswami2021]]</p>
    <p>Whether to give IVIG or plasma exchange first is debated. Guidance lists them for preparing people with significant bulbar weakness. In a double-blind trial of 47 well-controlled patients, routine IVIG before surgery was judged unnecessary; a 2026 review suggests risk-based use rather than treating everyone. In a small trial of 24, plasma exchange was followed by longer intubation and surgery than IVIG. [[Sanders2016,Gamez2019,Alhammadi2026,AlipourFaz2017]]</p>
    <p>Post-operative myasthenic crisis is now reported below 10%. Risk factors include bulbar symptoms, previous crisis, lower lung function, high AChR antibody levels and thymoma. In 352 US operations for non-thymomatous MG there were no deaths within 30 days; Japan's registry reports 0.26% hospital mortality. [[Alhammadi2026,Liu2020,Carrera2026,Nakajima2026]]</p>
    <p class="cardnote">New trouble breathing or swallowing in a person with MG can signal a crisis and is treated as an emergency: see <a href="#crisis" data-go="crisis">Myasthenic crisis</a>. [[MGFACard]]</p>
    <div class="hook"><b>Exam hook</b>Thymectomy is <b>elective</b>: guidance says to operate when the person is stable.</div></div>
   <div class="card"><span class="ev est">Pathology</span><h4>Thymoma: types, stages and antibodies</h4>
    <p>About 10 to 20% of people with MG have a thymoma (a pooled 21% across 49 studies, higher in men and after 40), and 30 to 44% of people with a thymoma have MG. WHO types run A, AB, B1, B2, B3; MG is rare with type A and common with cortical type B. [[Okuno2025,Mao2012,Romi2011]]</p>
    <p>Masaoka stage I is encapsulated, II through the capsule, III into neighbouring organs, IVa spread over pleura or pericardium, IVb spread by lymph or blood; Koga later rebalanced stages I and II. [[Masaoka1981,Koga1994]]</p>
    <p>Titin antibodies occur in about 95% and RyR antibodies in about 70% of thymoma MG, against 58% and 14% in late-onset and 10% and 0% in early-onset MG. In someone under 60 they strongly suggest a thymoma. Thymomas usually lack AIRE, a gene the thymus needs to teach tolerance. [[Romi2011,Strobel2007]]</p>
    <p>MG can start after a thymoma is removed: 8% across 13 cohorts, more often with AChR antibodies before surgery (risk ratio 5.53). In one series 10 of 33 seropositive patients developed it, against 0 of 90 seronegative. [[Tang2023,Yamada2015]]</p></div>
   <div class="card"><span class="ev early">No randomised comparison</span><h4>Open, VATS or robotic</h4>
    <p>A meta-analysis of 26 studies (3,588 patients) found no difference in complete stable remission at 1, 3 or 5 years between open and minimally invasive thymectomy, with shorter stays and less blood loss but longer operations for minimally invasive surgery. A 4-centre cohort found no difference in QMG or prednisone over 2 years, with a hospital stay of 2.5 against 5 days. [[LeeY2023,Beller2025]]</p>
    <p>In a matched single-centre comparison, robotic surgery had fewer in-hospital complications than open surgery (6.8% against 21.1%). [[Soder2023]]</p>
    <p><b>Where sources disagree:</b> the consensus panel is permissive about less invasive approaches in experienced centres, while the AAN advisory says people should be told it is uncertain whether MGTX's benefit carries over. [[Narayanaswami2021,Gronseth2020]]</p></div>
   <div class="card"><span class="ev est">Mechanism</span><h4>Why removing a gland can help</h4>
    <p>The hyperplastic early-onset MG thymus behaves like a tertiary lymphoid organ, with new vessels, chemokines and ectopic germinal centres; its myoid cells carry AChR and can present it to B cells. Regulatory T cells from MG thymus are functionally defective. More ectopic germinal centres in the removed gland predicted a better outcome after surgery. [[Cron2018,Kao1977b,Balandina2005,Sarkkinen2022]]</p>
    <p>The thymus is thought to play little part in MuSK MG: most MuSK thymi resemble normal ones. [[Leite2005,Marx2013]]</p>
    <div class="pt"><b>In plain words</b>In many younger people with MG, the thymus seems to train and house the cells that make the harmful antibodies. Taking it out removes one source.</div></div>
   <div class="card"><span class="ev est">After MGTX</span><h4>Cost, uptake and long-term remission</h4>
    <p>A UK lifetime model built on MGTX data found thymectomy plus prednisolone both cheaper and better than prednisolone alone: 0.52 more quality-adjusted life years and £13,014 saved per person. [[Lord2026]]</p>
    <p>Yet uptake has not grown: in US surgical data thymectomy for MG rose until about 2019 to 2020 and then fell; in Japan it fell from 375 cases in 2001 to 97 in 2023. [[Carrera2026,Nakajima2026]]</p>
    <p>Drug-free remission is not guaranteed: in a post hoc MGTX analysis, 64% of the thymectomy arm against 38% with prednisone alone reached sustained minimal manifestations with prednisone stopped over 5 years, and a review notes that many people in routine care never reach complete stable remission. [[Lee2020,Rath2023]] The <a href="#cure" data-go="cure">Toward a cure</a> module puts this beside newer approaches.</p></div>
   <div class="card"><span class="ev est">History</span><h4>Seventy-five years to a trial</h4>
    <p>Sauerbruch removed thymic tissue from a young woman with MG in 1911, and Blalock removed a thymic tumour in 1936 and reported a planned series in 1941. For decades the only evidence was retrospective: the 2000 AAN review found 21 flawed cohorts, and a 2013 Cochrane review found no randomised trials. MGTX in 2016 was the first. [[Singh2018,Blalock1939,Blalock1941,Gronseth2000,Cea2013,Wolfe2016]]</p>
    <p>The full story is in <a href="#history" data-go="history">History &amp; people</a>.</p></div>`;
};
