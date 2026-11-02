/* =============== 3.3 DSM-5-TR & ICD-11 criteria =============== */
/* paraphrased criteria (DSM-5-TR, cross-checked against the ESCAP 2021 summary); never quoted */
const CR_BOX={
 A1:{n:'A1',l:['Social-emotional','reciprocity'],d:'back-and-forth conversation, sharing interests or feelings, starting or answering interaction'},
 A2:{n:'A2',l:['Nonverbal','communication'],d:'eye contact, gestures, facial expression and body language, and understanding them'},
 A3:{n:'A3',l:['Relationships'],d:'developing, keeping and understanding relationships'},
 B1:{n:'B1',l:['Repetitive','movement/speech'],ln:['Repetitive','acts, speech'],d:'stereotyped or repetitive movements, use of objects or speech'},
 B2:{n:'B2',l:['Sameness,','routines'],d:'insistence on sameness, inflexible routines or ritualised behaviour'},
 B3:{n:'B3',l:['Intense','interests'],d:'highly restricted, fixated interests, unusual in intensity or focus'},
 B4:{n:'B4',l:['Sensory','reactivity'],d:'hyper- or hyporeactivity to sensory input, or unusual sensory interests'},
 C:{n:'C',l:['Early development'],l2:['Onset in development'],d:'present in the early developmental period; may only show when social demands exceed capacities, or be masked later'},
 D:{n:'D',l:['Significant impact'],l2:['Impairment'],d:'clinically significant impairment in social, occupational or other important areas'},
 E:{n:'E',l:['Not better explained'],d:'not better explained by intellectual developmental disorder or global developmental delay'}};
const CR_LV=['requiring support','requiring substantial support','requiring very substantial support'];
const CR_LANG=['mild or no impairment of functional language','impaired functional language','absence of functional language'];
const CR_HIST=[
 {from:0,at:.05,k:'Before 1980',t:'Not yet an official category',
  txt:`In 1979 Lorna Wing and Judith Gould surveyed children in Camberwell, London, and found that children with "Kanner's early childhood autism" shared many features with other socially impaired children. Classifying by the quality of social interaction laid the groundwork for the spectrum idea. [[WingGould1979]]`,
  pt:`Before 1980 there were descriptions of autism in research, but no official diagnosis in the American manual.`,
  hook:`Wing &amp; Gould 1979 (Camberwell): the basis of the spectrum concept. [[WingGould1979]]`},
 {from:.09,at:.16,k:'1980 · DSM-III',t:'Infantile autism enters the manual',
  txt:`In 1980 autism entered the American Psychiatric Association's DSM-III as an official diagnostic category for the first time, and Kanner reviewed the criteria that year. [[Rosen2021,Harris2018Kanner]] In 1981 Wing's clinical account brought Asperger's syndrome to English-language readers, grouping it with early childhood autism. [[Wing1981]]`,
  pt:`For the first time clinicians shared one written definition of autism.`,
  hook:`DSM-III (1980): the first official DSM category for autism. [[Rosen2021]]`},
 {from:.37,at:.45,k:'1994 · DSM-IV',t:'Splitting into subtypes',
  txt:`DSM-IV added Asperger's disorder in 1994. [[BarahonaCorrea2015]] Autism was split across separate diagnoses including autistic disorder, Asperger's disorder, childhood disintegrative disorder and pervasive developmental disorder not otherwise specified (PDD-NOS). [[Fuentes2021ESCAP]] In Denmark the 1994 criteria change alone explained about a third of the later rise in recorded prevalence. [[Hansen2015Reporting]]`,
  pt:`For almost 20 years, people could be given one of several different autism-related labels.`,
  hook:`DSM-IV (1994): Asperger's disorder added; subtypes included autistic disorder, Asperger's, CDD and PDD-NOS. [[BarahonaCorrea2015,Fuentes2021ESCAP]]`},
 {from:.75,at:.8,k:'2013 · DSM-5',t:'One spectrum',
  txt:`DSM-5 merged autistic disorder, Asperger's disorder, childhood disintegrative disorder and PDD-NOS into one diagnosis, autism spectrum disorder, with two core domains, and placed it among the neurodevelopmental disorders. [[Fuentes2021ESCAP,APA2013]] People with a well-established DSM-IV diagnosis keep the diagnosis as autism spectrum disorder. [[Fuentes2021ESCAP]] A new category, social (pragmatic) communication disorder, covers social communication difficulties without restricted, repetitive behaviours. [[Norbury2014]] Estimates of who would lose a diagnosis ranged from about 40% to 9%; a later meta-analysis found a 20.8% fall. [[McPartland2012,Huerta2012,Kulage2020]]`,
  pt:`Asperger's and the other labels became one name: autism spectrum disorder. Support needs are now described with levels instead.`,
  hook:`DSM-5 (2013): "lumping" after DSM-IV's "splitting". [[Volkmar2014,Rosen2021]]`},
 {from:.86,at:.95,k:'2019–2022 · ICD-11 and DSM-5-TR',t:'Two manuals line up',
  txt:`ICD-11 was approved by the World Health Assembly in May 2019, and health reporting under it began on 1 January 2022. [[Reed2019ICD11]] Like DSM-5, it has one autism spectrum disorder with two domains, subdivided by intellectual development and functional language (6A02.0–6A02.5). [[Fuentes2021ESCAP,Chahboun2022]] DSM-5-TR (2022) clarified that all three A criteria are needed. [[APA2022]]`,
  pt:`Today the American and the WHO manuals describe autism in a similar way, with different ways of recording support needs.`,
  hook:`ICD-11 6A02: subdivided by intellectual development × functional language, not by DSM support levels. [[Fuentes2021ESCAP]]`}];

inits.criteria=()=>{
  const svg=$('#crSvg');let sys='dsm',pulse=1,stopP=null;
  const on=new Set(),sp=new Set();let lvS=0,lvR=0;
  const lang=()=>+$('#crLang').value;
  /* geometry for both layouts */
  function geo(N){
    if(!N)return{
      A:{A1:[16,50,124,54],A2:[148,50,124,54],A3:[280,50,124,54]},
      B:{B1:[16,154,96,54],B2:[118,154,96,54],B3:[220,154,96,54],B4:[322,154,96,54]},
      gA:[456,77],gB:[456,181],J:[512,129],
      C:[548,40,158,40],D:[548,96,158,40],E:[548,152,158,76],
      V:[400,246,306,58],lv:[16,254,360],chips:[16,352,690],title:[16,18]};
    return{
      A:{A1:[10,40,122,54],A2:[139,40,122,54],A3:[268,40,122,54]},
      B:{B1:[10,172,88,54],B2:[102,172,88,54],B3:[194,172,88,54],B4:[286,172,88,54]},
      gA:[200,124],gB:[200,268],J:[200,306],
      C:[10,324,380,40],D:[10,374,380,40],E:[10,424,380,76],
      V:[10,512,380,62],lv:[10,600,380],chips:[10,690,380],title:[10,22]}}
  const bez=(p,t)=>{const u=1-t;return[u*u*u*p[0]+3*u*u*t*p[2]+3*u*t*t*p[4]+t*t*t*p[6],u*u*u*p[1]+3*u*u*t*p[3]+3*u*t*t*p[5]+t*t*t*p[7]]};
  function conn(p,lit,col){let g=`<path d="M${f1(p[0])} ${f1(p[1])}C${f1(p[2])} ${f1(p[3])} ${f1(p[4])} ${f1(p[5])} ${f1(p[6])} ${f1(p[7])}" style="fill:none;stroke:${lit?col:'var(--line)'};stroke-width:${lit?2.4:1.4}${lit?'':';stroke-dasharray:4 3'}"/>`;
    if(lit&&pulse<1){const q=bez(p,pulse);g+=`<circle cx="${f1(q[0])}" cy="${f1(q[1])}" r="4" style="fill:${col}"/>`}return g}
  function box(k,r,lit,lines,sub){const [x,y,w,h]=r;
    let g=`<g class="clk" data-crb="${k}" role="button" tabindex="0" aria-pressed="${lit}" aria-label="${k}: ${CR_BOX[k]?CR_BOX[k].d:''}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" style="fill:${lit?'var(--accent-soft)':'var(--panel)'};stroke:${lit?'var(--accent)':'var(--line)'};stroke-width:${lit?2:1.2}"/>`;
    g+=`<text x="${x+8}" y="${y+15}" class="t-xs" style="fill:${lit?'var(--accent)':'var(--muted)'};font-weight:700">${k}${lit?' ✓':''}</text>`;
    lines.forEach((l,i)=>g+=`<text x="${x+8}" y="${y+30+i*13}" class="t-xs" style="fill:var(--ink)">${l}</text>`);
    if(sub)g+=sub;return g+'</g>'}
  function gate(c,ok,label,val){return `<circle cx="${c[0]}" cy="${c[1]}" r="24" style="fill:${ok?'var(--accent)':'var(--panel)'};stroke:${ok?'var(--accent)':'var(--muted)'};stroke-width:1.6"/><text x="${c[0]}" y="${c[1]-3}" class="t-xs t-mid" style="fill:${ok?'var(--bg)':'var(--muted)'};font-weight:700">${label}</text><text x="${c[0]}" y="${c[1]+10}" class="t-xs t-mid" style="fill:${ok?'var(--bg)':'var(--ink)'}">${val}</text>`}
  function state(){const nA=['A1','A2','A3'].filter(k=>on.has(k)).length,nB=['B1','B2','B3','B4'].filter(k=>on.has(k)).length;
    const okA=sys==='dsm'?nA===3:nA>0,okB=sys==='dsm'?nB>=2:nB>0,okC=on.has('C'),okD=on.has('D'),okE=sys==='dsm'?on.has('E'):true;
    return{nA,nB,okA,okB,okC,okD,okE,all:okA&&okB&&okC&&okD&&okE,code:'6A02.'+(lang()*2+(sp.has('id')?1:0))}}
  function draw(){
    const N=vb(svg,'720 410','400 780'),Gm=geo(N),S=state(),icd=sys==='icd';
    let s=`<text x="${Gm.title[0]}" y="${Gm.title[1]}" class="t-sm" style="fill:var(--accent)">${icd?'ICD-11 6A02 · AUTISM SPECTRUM DISORDER':'DSM-5-TR · AUTISM SPECTRUM DISORDER'}</text>`;
    if(!N)s+=`<text x="704" y="22" class="t-xs t-end">paraphrased · teaching only</text>`;
    /* connectors first */
    const Acol='var(--accent)';
    for(const k in Gm.A){const [x,y,w,h]=Gm.A[k],bx=x+w/2,by=y+h;
      const p=N?[bx,by,bx,by+18,Gm.gA[0],Gm.gA[1]-44,Gm.gA[0],Gm.gA[1]-24]:[bx,by,bx,by+26,Gm.gA[0]-60,Gm.gA[1],Gm.gA[0]-24,Gm.gA[1]];s+=conn(p,on.has(k),Acol)}
    for(const k in Gm.B){const [x,y,w,h]=Gm.B[k],bx=x+w/2,by=y+h;
      const p=N?[bx,by,bx,by+22,Gm.gB[0]+(bx<200?-30:30),Gm.gB[1]-30,Gm.gB[0]+(bx<200?-17:17),Gm.gB[1]-17]:[bx,by,bx,by+26,Gm.gB[0]-60,Gm.gB[1],Gm.gB[0]-24,Gm.gB[1]];s+=conn(p,on.has(k),Acol)}
    const J=Gm.J;
    if(N){s+=`<path d="M224 124H372Q390 124 390 142V288Q390 306 372 306H206" style="fill:none;stroke:${S.okA?Acol:'var(--line)'};stroke-width:${S.okA?2.4:1.4}${S.okA?'':';stroke-dasharray:4 3'}"/>`;
      s+=conn([Gm.gB[0],Gm.gB[1]+24,J[0],J[1]-10,J[0],J[1]-10,J[0],J[1]-6],S.okB,Acol)}
    else{s+=conn([Gm.gA[0]+24,Gm.gA[1],J[0]-20,Gm.gA[1],J[0],J[1]-30,J[0],J[1]],S.okA,Acol);s+=conn([Gm.gB[0]+24,Gm.gB[1],J[0]-20,Gm.gB[1],J[0],J[1]+30,J[0],J[1]],S.okB,Acol)}
    const C=Gm.C,D=Gm.D,E=Gm.E,V=Gm.V,ab=S.okA&&S.okB;
    if(N)s+=conn([J[0],J[1],J[0],J[1]+8,J[0],C[1]-8,J[0],C[1]],ab,Acol);
    else s+=conn([J[0],J[1],J[0]+20,J[1],C[0]-30,C[1]+C[3]/2,C[0],C[1]+C[3]/2],ab,Acol);
    const mid=r=>r[0]+r[2]/2;
    s+=conn([mid(C),C[1]+C[3],mid(C),C[1]+C[3]+6,mid(D),D[1]-6,mid(D),D[1]],ab&&S.okC,Acol);
    s+=conn([mid(D),D[1]+D[3],mid(D),D[1]+D[3]+6,mid(E),E[1]-6,mid(E),E[1]],ab&&S.okC&&S.okD,Acol);
    s+=conn(N?[mid(E),E[1]+E[3],mid(E),E[1]+E[3]+4,mid(V),V[1]-4,mid(V),V[1]]:[mid(E),E[1]+E[3],mid(E),E[1]+E[3]+12,V[0]+V[2]-60,V[1]-12,V[0]+V[2]-60,V[1]],S.all,Acol);
    /* boxes */
    if(icd){const dom=(r,t)=>`<text x="${r[0]}" y="${r[1]-6}" class="t-xs" style="fill:var(--accent)">${t}</text>`;
      s+=dom(Gm.A.A1,'DOMAIN 1 · social interaction &amp; communication')+dom(Gm.B.B1,N?'DOMAIN 2 · restricted, repetitive':'DOMAIN 2 · restricted, repetitive, inflexible')}
    else{s+=`<text x="${Gm.A.A1[0]}" y="${Gm.A.A1[1]-6}" class="t-xs" style="fill:var(--accent)">A · SOCIAL COMMUNICATION &amp; INTERACTION · ALL 3</text><text x="${Gm.B.B1[0]}" y="${Gm.B.B1[1]-6}" class="t-xs" style="fill:var(--accent)">B · RESTRICTED, REPETITIVE · AT LEAST 2 OF 4</text>`}
    for(const k in Gm.A)s+=box(k,Gm.A[k],on.has(k),CR_BOX[k].l);
    for(const k in Gm.B)s+=box(k,Gm.B[k],on.has(k),CR_BOX[k].ln||CR_BOX[k].l);
    s+=gate(Gm.gA,S.okA,icd?'D1':'A',icd?(S.nA?'✓':'–'):S.nA+'/3');
    s+=gate(Gm.gB,S.okB,icd?'D2':'B',icd?(S.nB?'✓':'–'):S.nB+'/4');
    s+=`<circle cx="${J[0]}" cy="${J[1]}" r="6" style="fill:${ab?'var(--accent)':'var(--panel)'};stroke:var(--muted)"/>`;
    s+=box('C',C,on.has('C'),icd?CR_BOX.C.l2:CR_BOX.C.l);
    s+=box('D',D,on.has('D'),icd?CR_BOX.D.l2:CR_BOX.D.l);
    if(!icd)s+=box('E',E,on.has('E'),N?['Not better explained by intellectual','disability or global developmental delay']:['Not better explained','by intellectual','disability']);
    else{const [x,y,w,h]=E,cw=(w-12)/2,chh=(h-24)/3;
      s+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" style="fill:var(--panel);stroke:var(--line)"/><text x="${x+6}" y="${y+12}" class="t-xs">${N?'subtype: ID no / yes × language':'ID: no | yes  ×  language'}</text>`;
      for(let l=0;l<3;l++)for(let d=0;d<2;d++){const c='6A02.'+(l*2+d),hit=c===S.code,cx=x+4+d*(cw+4),cy=y+20+l*chh;
        s+=`<rect x="${f1(cx)}" y="${f1(cy)}" width="${f1(cw)}" height="${f1(chh-2)}" rx="4" style="fill:${hit?'var(--accent)':'var(--panel-2)'}"/><text x="${f1(cx+cw/2)}" y="${f1(cy+chh/2+2)}" class="t-xs t-mid" style="fill:${hit?'var(--bg)':'var(--ink)'}">${c}${N?' · '+['lang ok','lang impaired','no lang'][l]:''}</text>`}}
    /* verdict node */
    const vc=S.all?'var(--good)':'var(--muted)';
    s+=`<rect x="${V[0]}" y="${V[1]}" width="${V[2]}" height="${V[3]}" rx="12" style="fill:${S.all?'var(--good-soft)':'var(--panel-2)'};stroke:${vc};stroke-width:${S.all?2:1.2}"/>`;
    s+=`<text x="${V[0]+12}" y="${V[1]+22}" class="t-lbl" style="fill:${S.all?'var(--good)':'var(--ink)'}">${S.all?(icd?'Fits the published structure: '+S.code:'Meets the published structure'):'Does not meet the published structure'}</text>`;
    s+=`<text x="${V[0]+12}" y="${V[1]+42}" class="t-xs">${S.all?'on paper only: clinicians judge each criterion':icd?'needs both domains, onset and impairment':'needs A 3/3, B ≥2/4, and C, D, E'}</text>`;
    /* support levels or ICD note */
    const L=Gm.lv;
    if(!icd){s+=`<text x="${L[0]}" y="${L[1]}" class="t-xs" style="fill:var(--accent)">SUPPORT LEVELS · RATED SEPARATELY</text>`;
      [ ['Social communication',lvS],['Restricted, repetitive',lvR] ].forEach(([n,v],i)=>{const y=L[1]+14+i*34,bw=(L[2]-8)/3;
        s+=`<text x="${L[0]}" y="${y+9}" class="t-xs" style="fill:var(--ink)">${n}: Level ${v+1}${N?', '+CR_LV[v]:''}</text>`;
        for(let k=0;k<3;k++)s+=`<rect x="${f1(L[0]+k*(bw+4))}" y="${y+14}" width="${f1(bw)}" height="9" rx="4.5" style="fill:${k<=v?'var(--accent)':'var(--panel-2)'}"/>`})}
    else{s+=`<text x="${L[0]}" y="${L[1]}" class="t-xs" style="fill:var(--accent)">NO DSM SUPPORT LEVELS IN ICD-11</text><text x="${L[0]}" y="${L[1]+16}" class="t-xs" style="fill:var(--ink)">recorded instead: intellectual development</text><text x="${L[0]}" y="${L[1]+30}" class="t-xs" style="fill:var(--ink)">and functional language (${CR_LANG[lang()].split(' of ')[0]})</text>`}
    /* specifier chips */
    const ch=Gm.chips,chips=[];
    if(!icd){chips.push((sp.has('id')?'with':'without')+' intellectual impairment');chips.push((lang()>0?'with':'without')+' language impairment');
      if(sp.has('gen'))chips.push('known genetic/medical condition');if(sp.has('ndd'))chips.push('another neurodevelopmental, mental or behavioural condition');if(sp.has('cat'))chips.push('with catatonia')}
    else{chips.push((sp.has('id')?'with':'no')+' disorder of intellectual development');chips.push(CR_LANG[lang()])}
    s+=`<text x="${ch[0]}" y="${ch[1]-8}" class="t-xs" style="fill:var(--accent)">${icd?'SUBTYPE AXES':'SPECIFIERS'}</text>`;
    let cx=ch[0],cy=ch[1];chips.forEach(c=>{const w=c.length*6.7+14;if(cx+w>ch[0]+ch[2]){cx=ch[0];cy+=22}
      s+=`<rect x="${f1(cx)}" y="${cy}" width="${f1(w)}" height="17" rx="8.5" style="fill:var(--accent-soft);stroke:var(--accent)"/><text x="${f1(cx+7)}" y="${cy+12}" class="t-xs" style="fill:var(--ink)">${c}</text>`;cx+=w+6});
    svg.innerHTML=s;
    note(S);
  }
  function note(S){const icd=sys==='icd',why=[];
    if(!icd){if(S.nA<3)why.push(`A: ${S.nA} of 3 selected. All three are needed, currently or by history. [[APA2022]]`);
      if(S.nB<2)why.push(`B: ${S.nB} of 4 selected. At least two are needed. [[APA2022,Fuentes2021ESCAP]]`);
      if(!S.okC)why.push(`C: signs must be present in the early developmental period, even if they only became clear later or were masked. [[APA2022,Fuentes2021ESCAP]]`);
      if(!S.okD)why.push(`D: the differences must cause clinically significant impairment in current functioning. [[APA2022]]`);
      if(!S.okE)why.push(`E: not better explained by intellectual developmental disorder or global developmental delay. When both are present, social communication should be below the expected level for general development. [[APA2022]]`)}
    else{if(!S.okA)why.push(`Domain 1 (social interaction and communication): nothing selected.`);if(!S.okB)why.push(`Domain 2 (restricted, repetitive, inflexible patterns): nothing selected.`);
      if(!S.okC)why.push(`Onset in the developmental period: not selected.`);if(!S.okD)why.push(`Impairment, usually seen across settings: not selected. [[Fuentes2021ESCAP]]`)}
    let h=`<div class="kicker">${icd?'ICD-11 · teaching drawing':'DSM-5-TR · teaching drawing'}</div><h4>${S.all?(icd?'Fits the structure of '+S.code:'Meets the published structure'):'Does not meet the published structure'}</h4>`;
    h+=`<div class="verdict ${S.all?'yes':S.nA+S.nB>0?'maybe':'no'}">${S.all?'Every part of the structure is selected.':'Missing: '+(why.length)+' part'+(why.length===1?'':'s')}</div>`;
    if(why.length)h+=`<ul>${why.map(w=>`<li>${w}</li>`).join('')}</ul>`;
    if(!icd&&S.nA===3&&S.nB===0)h+=`<div class="hook"><b>Exam hook</b>Social communication differences with no restricted, repetitive behaviours, now or in the past, point to social (pragmatic) communication disorder rather than autism. [[Norbury2014,Fuentes2021ESCAP]]</div>`;
    if(S.all){const st=icd?`${S.code}: autism spectrum disorder ${sp.has('id')?'with':'without'} disorder of intellectual development, with ${CR_LANG[lang()]}.`:
      `Autism spectrum disorder, ${CR_LV[lvS]} (Level ${lvS+1}) for social communication and ${CR_LV[lvR]} (Level ${lvR+1}) for restricted, repetitive behaviours; ${sp.has('id')?'with':'without'} accompanying intellectual impairment; ${lang()>0?'with':'without'} accompanying language impairment${sp.has('gen')?'; associated with a known genetic or other medical condition or environmental factor':''}${sp.has('ndd')?'; associated with another neurodevelopmental, mental or behavioural problem':''}${sp.has('cat')?'; with catatonia':''}.`;
      h+=`<div class="cr-stmt"><b>How it would be recorded</b>${st}</div>`;
      h+=`<p>${icd?'ICD-11 subdivides by intellectual development and functional language; the validity and stability of the six combinations had not yet been shown when the ESCAP guidance was written. [[Fuentes2021ESCAP]]':'Severity is rated separately for the two domains. DSM-5 does not define what "substantial" support means, a point the ESCAP guidance criticises. [[APA2022,Fuentes2021ESCAP]]'}</p>`}
    h+=`<div class="pt"><b>%t:note.plain%</b>${icd?'The WHO manual describes the same two areas, then records whether the person also has an intellectual disability and how much they use language.':'Autism is diagnosed when differences in social communication and repetitive or sensory patterns started early and make everyday life harder. A diagnosis also describes how much support someone needs.'}</div>`;
    $('#crNote').innerHTML=h}
  function kick(){const icd=sys==='icd';$('#crAk').textContent=icd?'Domain 1':'A · all 3';$('#crBk').textContent=icd?'Domain 2':'B · 2 of 4';$('#crCk').textContent=icd?'Timing':'C–E';
    $('#crEbtn').hidden=icd;$('#crLvRow').style.opacity=icd?.45:1}
  function sync(){$$('[data-cr]').forEach(b=>b.setAttribute('aria-pressed',on.has(b.dataset.cr)));
    $$('[data-crsp]').forEach(b=>b.setAttribute('aria-pressed',sp.has(b.dataset.crsp)));
    $$('[data-lv]').forEach(b=>{const k=b.dataset.lv;b.setAttribute('aria-pressed',k[0]==='s'?+k[1]-1===lvS:+k[1]-1===lvR)})}
  function changed(){sync();if(stopP)stopP();stopP=animate(650,p=>{pulse=p;draw()},()=>{pulse=1;stopP=null})}
  function tog(k){on.has(k)?on.delete(k):on.add(k);changed()}
  $$('[data-cr]').forEach(b=>b.addEventListener('click',()=>tog(b.dataset.cr)));
  svg.addEventListener('click',e=>{const g=e.target.closest('[data-crb]');if(g)tog(g.dataset.crb)});
  svg.addEventListener('keydown',e=>{const g=e.target.closest('[data-crb]');if(g&&(e.key==='Enter'||e.key===' ')){e.preventDefault();tog(g.dataset.crb);setTimeout(()=>{const n=svg.querySelector(`[data-crb="${g.dataset.crb}"]`);n&&n.focus()},0)}});
  $$('[data-crsp]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.crsp;sp.has(k)?sp.delete(k):sp.add(k);changed()}));
  $$('[data-lv]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.lv;if(k[0]==='s')lvS=+k[1]-1;else lvR=+k[1]-1;changed()}));
  $('#crLang').addEventListener('change',changed);
  $$('[data-crs]').forEach(b=>b.addEventListener('click',()=>{sys=b.dataset.crs;$$('[data-crs]').forEach(x=>x.setAttribute('aria-pressed',x===b));kick();changed()}));
  const PRE={meets:['A1','A2','A3','B2','B4','C','D','E'],scd:['A1','A2','A3','C','D','E'],clear:[]};
  $$('[data-crp]').forEach(b=>b.addEventListener('click',()=>{on.clear();PRE[b.dataset.crp].forEach(k=>on.add(k));changed()}));
  if(onHide.criteria){const prev=onHide.criteria;onHide.criteria=()=>{prev();stopP&&stopP()}}else onHide.criteria=()=>{stopP&&stopP()};
  redraws.criteria=()=>draw();
  sync();kick();draw();

  /* ---- names over time ---- */
  const hs=$('#crHSvg'),hr=$('#crHT');let setH=()=>{};
  const yr=t=>1975+50*t;
  function drawH(t){const N=vb(hs,'720 300','400 340'),Y=yr(t);
    const x0=N?14:40,x1=N?386:690,X=y=>lerp(x0,x1,(y-1975)/50),ax=N?306:266;let s='';
    for(let y=1975;y<=2025;y+=N?10:5){s+=`<line x1="${f1(X(y))}" x2="${f1(X(y))}" y1="34" y2="${ax}" class="grid"/><text x="${f1(X(y))}" y="${ax+16}" class="t-xs t-mid">${y}</text>`}
    s+=`<line x1="${x0}" x2="${x1}" y1="${ax}" y2="${ax}" class="axis"/>`;
    const bar=(y0,y1,lane,label,col,sh)=>{if(Y<y0)return '';const a=X(y0),b=X(Math.min(y1,Y)),h=N?20:22,yy=lane;
      let g=`<rect x="${f1(a)}" y="${yy}" width="${f1(Math.max(2,b-a))}" height="${h}" rx="6" style="fill:${col};opacity:${sh||.9}"/>`;
      if(b-a>label.length*6.7+10)g+=`<text x="${f1(a+6)}" y="${yy+h/2+3.5}" class="t-xs" style="fill:var(--bg);font-weight:600">${label}</text>`;
      else if(y0>=2013)g+=`<text x="${f1(a-5)}" y="${yy+h/2+3.5}" class="t-xs t-end" style="fill:var(--ink)">${label}</text>`;
      else g+=`<text x="${f1(b+5)}" y="${yy+h/2+3.5}" class="t-xs" style="fill:var(--ink)">${label}</text>`;return g};
    const L=N?{a:40,b:66,c:92,d:118,asd:79,scd:150,icd:196,lvl:176}:{a:40,b:68,c:96,d:124,asd:82,scd:162,icd:214,lvl:192};
    /* before 1980 */
    s+=`<rect x="${f1(X(1975))}" y="${L.a}" width="${f1(X(Math.min(1980,Y))-X(1975))}" height="${N?20:22}" rx="6" style="fill:none;stroke:var(--muted);stroke-dasharray:4 3"/>`;
    if(Y<1980)s+=`<text x="${f1(X(1975)+6)}" y="${L.a+15}" class="t-xs">no official DSM category</text>`;
    const wy=N?[L.d+40,0]:[L.b+15,L.c+15];
    if(Y>=1979)s+=`<circle cx="${f1(X(1979))}" cy="${wy[0]-4}" r="4" style="fill:var(--brand)"/><text x="${f1(X(1979)+7)}" y="${wy[0]}" class="t-xs" style="fill:var(--brand)">1979 Wing &amp; Gould</text>`;
    if(Y>=1981&&!N)s+=`<circle cx="${f1(X(1981))}" cy="${wy[1]-4}" r="4" style="fill:var(--brand)"/><text x="${f1(X(1981)+7)}" y="${wy[1]}" class="t-xs" style="fill:var(--brand)">1981 Wing on Asperger</text>`;
    s+=bar(1980,1994,L.a,N?'DSM-III autism':'DSM-III: infantile autism','var(--accent)');
    /* 1994-2013 subtypes, which converge into one bar in 2013 */
    const k=ease(ramp(Y,2012,2014.5));
    const sub=[ [L.a,N?'Autistic dis.':'Autistic disorder'],[L.b,N?'Asperger’s':'Asperger’s disorder'],[L.c,'PDD-NOS'],[L.d,N?'CDD':'Childhood disintegrative'] ];
    sub.forEach(([lane,n])=>s+=bar(1994,2013,lane,n,'var(--accent)',.75));
    if(Y>=2013){sub.forEach(([lane])=>{const yy=lerp(lane,L.asd+((N?20:22)-12)/2,k);s+=`<path d="M${f1(X(2013))} ${lane+(N?10:11)}C${f1(X(2014.5))} ${lane+(N?10:11)} ${f1(X(2014))} ${f1(L.asd+(N?20:22)/2)} ${f1(X(2015.5))} ${f1(L.asd+(N?20:22)/2)}" style="fill:none;stroke:var(--accent);stroke-width:1.4;opacity:${f1(.3+.5*k)}"/>`});
      const a=X(2013),b=X(Math.min(2025,Y)),h=(N?20:22)*1.6;s+=`<rect x="${f1(a+ (N?6:10))}" y="${f1(L.asd-4)}" width="${f1(Math.max(2,b-a-(N?6:10)))}" height="${f1(h)}" rx="8" style="fill:var(--accent)"/>`;
      if(b-a>(N?40:120))s+=`<text x="${f1(a+(N?10:16))}" y="${f1(L.asd+h/2)}" class="t-xs" style="fill:var(--bg);font-weight:700">${N?'ASD':'ASD: one spectrum'}</text>`;
      s+=bar(2013,2025,L.scd,N?'SCD':'Social (pragmatic) communication disorder','var(--warn)',.85);
      if(!N||Y>=2013)s+=bar(2013,2025,L.lvl,N?'Levels 1–3':'Support levels 1–3','var(--accent)',.45)}
    if(Y>=2019){s+=bar(2019,2025,L.icd,N?'ICD-11':'ICD-11 6A02 (approved 2019)','var(--neuro)',.85)}
    if(Y>=2022)s+=`<circle cx="${f1(X(2022))}" cy="${L.icd+30}" r="4" style="fill:var(--ink)"/><text x="${f1(X(2022)-8)}" y="${L.icd+34}" class="t-xs t-end" style="fill:var(--ink)">2022: ICD-11 in effect · DSM-5-TR</text>`;
    s+=`<line x1="${f1(X(Y))}" x2="${f1(X(Y))}" y1="30" y2="${ax}" style="stroke:var(--ink);stroke-width:1.4;opacity:.45"/><text x="${f1(clamp(X(Y),x0+20,x1-20))}" y="22" class="t-sm t-mid" style="fill:var(--ink)">${Math.floor(Y)}</text>`;
    hs.innerHTML=s;const ph=phaseOf(CR_HIST,t);setH(ph);$('#crHNote').innerHTML=noteHTML(CR_HIST[ph])}
  const stopH=playWire(hr,$('#crHPlay'),drawH,16000,'%t:player.replay%','criteria');
  setH=stepWire($('#crHSteps'),CR_HIST,hr,drawH,stopH);
  drawH(+hr.value);
};
