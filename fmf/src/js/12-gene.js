/* =============== 1.2 the gene & inheritance =============== */
const GN_CLSN={P:'Pathogenic',LP:'Likely pathogenic',VUS:'Uncertain significance',LB:'Likely benign',B:'Benign',none:'No variant'};
const GN_CLSC={P:'var(--bad)',LP:'var(--terra)',VUS:'var(--warn)',LB:'var(--good)',B:'var(--good)',none:'var(--muted)'};
const GN_VARS=[
 {id:'M694V',aa:694,cls:'P',ex:'Exon 10 · B30.2',
  pop:'The commonest variant in non-Ashkenazi Jews; predominant in North African Jews and absent in Ashkenazim. [[Lancieri2023,GershoniBaruch2001]] 51.4% of variant alleles in 1,090 genotyped Turkish patients [[Tunca2005]], 38.1% in Greek patients [[Giaglis2007]], 39.6% in pooled data [[Papadopoulos2008]]. Estimated age about 2,108 years by hidden Markov model, or a most recent common ancestor about 3,541 years ago by the Gamma method in the same paper, with a positive-selection signal. [[Park2020]]',
  sev:'M694V/M694V meant earlier onset, more arthritis, more erysipelas-like erythema and higher colchicine needs than other common genotypes (Shinar 2000). [[Shinar2000]] In 90 Armenian patients M694V homozygosity was linked to renal amyloidosis (Cazeneuve 1999) [[Cazeneuve1999]], but in the Turkish registry of 2,838 patients it was not (Tunca 2005). [[Tunca2005]] Among M694V homozygotes, male sex and arthritic attacks raised amyloidosis risk. [[GershoniBaruch2003]]'},
 {id:'M680I',aa:680,cls:'P',ex:'Exon 10 · B30.2',
  pop:'Concentrated in Arab patients. [[GershoniBaruch2001]] 14.4% of variant alleles in Turkish patients [[Tunca2005]] and 19.7% in Greek patients [[Giaglis2007]]; 5% of healthy Turks carry it. [[Yilmaz2001]] Two DNA changes give the same protein change (c.2040G>C and c.2040G>A). [[Infevers2026]]',
  sev:'Genotypes with two variants at the 680–694 hot spot tend to be severe; SHARE rates two common variants, especially at 680–694, as predicting more severe disease (level B). [[Touitou2001,Giancane2015]]'},
 {id:'M694I',aa:694,cls:'P',ex:'Exon 10 · B30.2',
  pop:'Concentrated in Arab patients. [[GershoniBaruch2001]] In Japan the common genotypes are E148Q/M694I and M694I with no second variant, and disease is milder. [[Migita2012]]',
  sev:'One of the four "clearly pathogenic" exon-10 variants. [[Shinar2012]] Same residue as M694V, a different replacement amino acid.'},
 {id:'K695R',aa:695,cls:'VUS',ex:'Exon 10 · B30.2',
  pop:'About 1–1.6% allele frequency in Europeans and Finns in gnomAD. [[gnomAD]] Also found in Ashkenazi Jews. [[Aksentijevich1999]]',
  sev:'Linked to mild disease or incomplete penetrance. [[Lancieri2023,Aksentijevich1999]] Older guidance grouped it with A744S and R761H as hot-spot variants. [[Shinar2012]]'},
 {id:'V726A',aa:726,cls:'P',ex:'Exon 10 · B30.2',
  pop:'Common in Ashkenazi and Iraqi Jews and in Arabs (the commonest variant in Arab patients). [[GershoniBaruch2001,Lancieri2023]] 12.8% of Iraqi Jews carry it. [[GershoniBaruch2001]] The only variant in Hardy–Weinberg equilibrium in pooled data, suggesting it is the oldest; estimated age about 2,192 years by hidden Markov model, or a most recent common ancestor about 3,372 years ago by the Gamma method. [[Papadopoulos2008,Park2020]]',
  sev:'V726A/V726A and M694V/V726A were among the genotypes with later onset and less arthritis than M694V/M694V. [[Shinar2000]] Most people with V726A/E148Q stay asymptomatic. [[GershoniBaruch2001]]'},
 {id:'A744S',aa:744,cls:'LB',ex:'Exon 10 · B30.2',
  pop:'About 1% allele frequency in Ashkenazi Jews in gnomAD. [[gnomAD]]',
  sev:'Likely benign in Infevers on 2026-10-16, although Shinar 2012 still listed it among hot-spot variants to report. A clear example of classes changing over time. [[Infevers2026,Shinar2012]]'},
 {id:'R761H',aa:761,cls:'P',ex:'Exon 10 · B30.2',
  pop:'Listed among the exon-10 variants that standard panels report. [[Shinar2012]] The research sources used here give no population frequency for it.',
  sev:'Shinar 2012 grouped it with A744S and K695R; Infevers listed it as pathogenic on 2026-10-16. [[Shinar2012,Infevers2026]]'},
 {id:'E148Q',aa:148,cls:'VUS',ex:'Exon 2',
  pop:'The commonest variant in Ashkenazi Jews. [[Lancieri2023]] 12% of healthy Turks carry it, but it is only 3.6% of Turkish patient alleles. [[Yilmaz2001]] About 29% allele frequency in East Asians in gnomAD; up to 20% in Asian countries. [[gnomAD,Shinar2012]] No positive-selection signal, unlike M694V and V726A. [[Park2020]]',
  sev:'The mildest and least penetrant variant. [[Touitou2001]] SHARE: E148Q as the only variant does not support an FMF diagnosis (level B). [[Giancane2015,Ozen2017]]'},
 {id:'S242R',aa:242,cls:'LP',ex:'Exon 2 · linker after PYD',
  pop:'Found in families with a dominantly inherited disease. [[Masters2016]]',
  sev:'Not FMF. One copy removes a 14-3-3 binding site on pyrin and causes PAAND, pyrin-associated autoinflammation with neutrophilic dermatosis (OMIM 608068), which responds to IL-1-targeted therapy rather than behaving as colchicine-responsive FMF. [[Masters2016,Schnappauf2019,UniProtO15553]] See <a href="#mech" data-go="mech">Pyrin, animated</a>.'}
];
const GN_Z=[
 {from:0,at:.1,k:'Level 1 · Chromosome',t:'Chromosome 16',
  txt:'In 1992, linkage analysis in 27 non-Ashkenazi Jewish families placed the FMF gene on the short arm (p) of chromosome 16, with a maximum LOD score of 19.86. [[Pras1992]]',
  pt:'Everyone has two copies of chromosome 16, one from each parent. The FMF gene sits near the tip of its short arm.',
  hook:'<i>MEFV</i> location: <b>16p13.3</b>. [[Lancieri2023]]'},
 {from:.2,at:.3,k:'Level 2 · Band',t:'Band 16p13.3',
  txt:'In 1997 two consortia cloned the gene independently. The French FMF Consortium named the protein marenostrin, from <i>mare nostrum</i>. The International FMF Consortium named it pyrin and found its 3.7-kb transcript almost only in granulocytes. The whole <i>MEFV</i> region is about 15 kb. [[FrenchFMF1997,IntFMF1997,Booty2009]]',
  pt:'Two research teams found the gene in the same year and gave the protein two names.',
  hook:'Pyrin = marenostrin, made mainly in <b>granulocytes</b> (neutrophils).'},
 {from:.4,at:.5,k:'Level 3 · Gene',t:'MEFV: 10 exons',
  txt:'<i>MEFV</i> has 10 exons. Exon 10 encodes the C-terminal B30.2 domain and carries most FMF-causing variants. Standard screening covers exons 2, 3, 5 and 10. [[Lancieri2023,Touitou2001,Shinar2012]]',
  pt:'The gene is split into 10 coding pieces. Most disease-causing changes sit in the last piece, exon 10.',
  hook:'Hot spot = <b>exon 10</b>: M694V, M680I, V726A, M694I.'},
 {from:.6,at:.7,k:'Level 4 · Protein',t:'Pyrin: 781 amino acids',
  txt:'UniProt coordinates: pyrin domain (PYD) 1–92, a bZIP-like basic region 266–280, B-box zinc finger 370–412, coiled-coil (CC) 413–442 and B30.2/SPRY 580–775. Reviews give slightly different boundaries, for example B30.2 597–776. The PYD binds the adaptor ASC; FMF variants cluster in B30.2. [[UniProtO15553,Lancieri2023,Richards2001]] How this fires the alarm is in <a href="#mech" data-go="mech">Pyrin, animated</a>.',
  pt:'The protein has distinct parts. The front end (PYD) plugs into the alarm machinery. The back end (B30.2) is where FMF changes cluster.',
  hook:'FMF variants are <b>gain of function</b>: in mice, pyrin knockout gave no disease, while human B30.2 variants caused IL-1β-driven inflammation. [[Chae2011]]'},
 {from:.8,at:1,k:'Level 5 · Variants',t:'Tap a pin',
  txt:'Five founder variants (M694V, V726A, M694I, M680I, E148Q) accounted for 74% of FMF chromosomes in typical Armenian, Arab, Jewish and Turkish patients. Pin colour shows the Infevers class on 2026-10-16. Classes change as evidence accumulates. [[Touitou2001,Infevers2026]]',
  pt:'Each pin is a single-letter change in the protein. M694V means the methionine at position 694 is replaced by valine.',
  hook:'Name format: original amino acid, position, new amino acid. <b>M694V</b> = Met694Val.'}
];
const GN_CROSS=[
 {id:'cc',n:'Carrier × carrier',a:['V','+'],b:['V','+'],la:'carrier',lb:'carrier',
  txt:'25% two variants, 50% carriers, 25% neither. Not every child with two variants becomes ill, because penetrance is incomplete (phenotype III). [[GeneReviews,Kogan2001]]'},
 {id:'ca',n:'Carrier × two variants',a:['V','V'],b:['V','+'],la:'two variants',lb:'carrier',
  txt:'50% two variants, 50% carriers. FMF then shows up in every generation and can look dominant: pseudodominance. [[Cazeneuve1999]]'},
 {id:'an',n:'Two variants × non-carrier',a:['V','V'],b:['+','+'],la:'two variants',lb:'non-carrier',
  txt:'100% carriers, no child with two variants. Carriers are usually healthy, though some people with one variant do have FMF-like attacks (see the cards below). [[Booty2009,Jeru2013]]'},
 {id:'cn',n:'Carrier × non-carrier',a:['V','+'],b:['+','+'],la:'carrier',lb:'non-carrier',
  txt:'50% carriers, 50% neither, no child with two variants.'},
 {id:'dn',n:'Dominant-acting variant × non-carrier',a:['D','+'],b:['+','+'],la:'one M694del or T577 variant',lb:'non-carrier',
  txt:'50% inherit the dominant-acting variant and can develop disease from that single copy, with variable penetrance. M694del causes dominant FMF (Booth 2000; 21 UK patients, Rowczenio 2015). Heterozygous T577 variants cause a dominant autoinflammatory disease that responded to colchicine (Stoffels 2014). [[Booth2000,Rowczenio2015,Stoffels2014]]'}
];
const GN_P=[
 {from:0,at:.1,k:'Step 1 · Parents',t:'Two copies each',
  txt:'Each person has two copies of <i>MEFV</i>, one on each chromosome 16. FMF is classically autosomal recessive: disease usually needs a variant on both copies. [[GeneReviews,FrenchFMF1997]]',
  pt:'Everyone has two copies of the gene. Usually both must be changed for FMF.',
  hook:'Recessive: two hits needed. Carriers (one hit) are usually healthy.'},
 {from:.15,at:.34,k:'Step 2 · Gametes',t:'Each parent passes one copy',
  txt:'Egg and sperm cells carry only one copy of each chromosome. Which copy a child receives is a 50:50 chance, decided again at every pregnancy.',
  pt:'Each parent hands down one of their two copies, at random.',
  hook:'Each pregnancy is an independent coin toss from each parent. Having one affected child does not change the odds for the next.'},
 {from:.38,at:.64,k:'Step 3 · Children',t:'Four equally likely combinations',
  txt:'Each box pairs one copy from each parent. The four boxes are equally likely, so each is 25% of the outcomes for any one child.',
  pt:'There are four equally likely ways the copies can combine.',
  hook:'A Punnett square shows <b>probabilities per child</b>, not how many children a family will have of each type.'},
 {from:.8,at:.98,k:'Step 4 · The odds',t:'What the square predicts',txt:'',pt:'The percentages are chances for each pregnancy.',
  hook:'Pseudodominance: affected parent × carrier gives <b>50%</b> two-variant children, so a recessive disease can look dominant. [[Cazeneuve1999]]'}
];
const GN_AL=[['M694V','P',694],['M680I','P',680],['M694I','P',694],['V726A','P',726],['R761H','P',761],['M694del','P',694],['E148Q','VUS',148],['K695R','VUS',695],['A744S','LB',744],['P369S','LB',369],['none','none',0]];
inits.gene=()=>{
  /* ---------- 1. zoom ---------- */
  const svg=$('#gnSvg'),rg=$('#gnT');let sel='M694V';
  const EX=[[60,14],[120,70],[230,34],[300,14],[350,22],[410,14],[455,14],[495,12],[535,22],[590,90]];
  const PORD=['E148Q','S242R','M680I','M694V','M694I','K695R','V726A','A744S','R761H'];
  function draw(t){
    /* narrow: same five levels, stacked in a taller 400-wide column. GX/GW squeeze
       the 60–680 tracks into 18–382; the hot-spot inset keeps its wide geometry
       (it is 360 units across either way) so the pins never crowd. */
    const N=vb(svg,'720 420','400 492');
    const GX=x=>N?18+(x-60)*364/620:x, GW=w=>N?w*364/620:w;
    const ax=a=>GX(60+(a-1)*620/780);
    const IX=a=>N?lerp(18,382,(a-670)/100):lerp(300,660,(a-670)/100);
    const IY=N?410:352;                       /* inset bar top */
    const BY=N?246:236;                       /* protein bar top */
    const PY=N?BY-34:226;                     /* "pyrin · 781 aa" baseline */
    const PIN={E148Q:{x:ax(148),y0:BY+22,hy:N?BY+56:290,lx:ax(148),ly:N?BY+72:304,a:'middle',sub:'exon 2'},
      S242R:{x:ax(242),y0:BY+22,hy:N?BY+56:290,lx:ax(242),ly:N?BY+72:304,a:'middle',sub:'PAAND'},
      M680I:{x:IX(680),y0:IY,hy:IY-24,lx:IX(680),ly:IY-34,a:'middle'},
      M694V:{x:IX(694),y0:IY,hy:IY-58,lx:IX(694),ly:IY-66,a:'middle'},
      M694I:{x:IX(694),y0:IY,hy:IY-18,lx:IX(694)+8,ly:IY-15,a:'start'},
      V726A:{x:IX(726),y0:IY,hy:IY-24,lx:IX(726),ly:IY-34,a:'middle'},
      R761H:{x:IX(761),y0:IY,hy:IY-24,lx:IX(761),ly:IY-34,a:'middle'},
      K695R:{x:IX(695),y0:IY+12,hy:IY+30,lx:IX(695),ly:IY+48,a:'middle'},
      A744S:{x:IX(744),y0:IY+12,hy:IY+30,lx:IX(744),ly:IY+48,a:'middle'}};
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    const o1=ramp(t,0,.06),o2=ramp(t,.2,.27),o3=ramp(t,.4,.47),o4=ramp(t,.6,.67),o5=ramp(t,.8,.84);
    /* L1 chromosome */
    s+=`<g style="opacity:${f1(o1)}"><text x="${GX(60)}" y="22" class="t-lbl">Chromosome 16</text>`;
    s+=`<rect x="${f1(GX(60))}" y="32" width="${f1(GW(232))}" height="22" rx="11" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.2"/><rect x="${f1(GX(306))}" y="32" width="${f1(GW(374))}" height="22" rx="11" style="fill:var(--panel-2);stroke:var(--muted);stroke-width:1.2"/>`;
    [[92,14],[140,10],[186,18],[236,12],[340,16],[398,22],[470,12],[520,26],[592,14],[640,12]].forEach(([x,w])=>s+=`<rect x="${f1(GX(x))}" y="33" width="${f1(GW(w))}" height="20" style="fill:var(--muted);opacity:.35"/>`);
    s+=`<path d="M${f1(GX(290))} 36L${f1(GX(299))} 43L${f1(GX(308))} 36M${f1(GX(290))} 50L${f1(GX(299))} 43L${f1(GX(308))} 50" style="fill:none;stroke:var(--muted);stroke-width:1.2"/>`;
    s+=`<text x="${f1(GX(N?150:176))}" y="70" class="t-xs t-mid">short arm (p)</text><text x="${f1(GX(493))}" y="70" class="t-xs t-mid">long arm (q)</text><text x="${f1(GX(299))}" y="70" class="t-xs t-mid">centromere</text>`;
    s+=`<rect x="${f1(GX(58))}" y="29" width="${f1(N?15:20)}" height="28" rx="4" style="fill:none;stroke:var(--terra);stroke-width:2.2"/></g>`;
    /* L2 band */
    if(o2>0){s+=`<g style="opacity:${f1(o2)}"><path d="M${f1(GX(60))} 57L${f1(GX(78))} 57L${f1(GX(680))} 98L${f1(GX(60))} 98Z" style="fill:var(--terra);opacity:.08"/>`;
      s+=`<text x="${f1(GX(60))}" y="92" class="t-sm" style="fill:var(--terra)">16p13.3 · tip of the short arm</text>`;
      s+=`<line x1="${f1(GX(60))}" y1="105" x2="${f1(GX(680))}" y2="105" style="stroke:var(--muted);stroke-width:2"/>`;
      [[90,30],[150,18],[200,40],[268,22],[420,26],[470,40],[540,20],[590,34],[640,22]].forEach(([x,w])=>s+=`<rect x="${f1(GX(x))}" y="100" width="${f1(GW(w))}" height="10" rx="2" style="fill:var(--panel-2);stroke:var(--line)"/>`);
      s+=`<rect x="${f1(GX(330))}" y="97" width="${f1(GW(56))}" height="16" rx="3" style="fill:var(--terra)"/><text x="${f1(GX(358))}" y="128" class="t-sm t-mid" style="fill:var(--terra);font-weight:600">MEFV · about 15 kb</text></g>`}
    /* L3 exons */
    if(o3>0){s+=`<g style="opacity:${f1(o3)}"><path d="M${f1(GX(330))} 113L${f1(GX(386))} 113L${f1(GX(680))} 158L${f1(GX(60))} 158Z" style="fill:var(--terra);opacity:.07"/>`;
      s+=`<line x1="${f1(GX(60))}" y1="170" x2="${f1(GX(680))}" y2="170" style="stroke:var(--muted);stroke-width:1.5"/>`;
      EX.forEach(([x,w],i)=>{const hi=i===9;s+=`<rect x="${f1(GX(x))}" y="160" width="${f1(GW(w))}" height="20" rx="3" style="fill:${hi?'var(--terra)':'var(--sea)'};opacity:${hi?1:.75}"/><text x="${f1(GX(x)+GW(w)/2)}" y="194" class="t-xs t-mid" ${hi?'style="fill:var(--terra);font-weight:700"':''}>${i+1}</text>`});
      s+=`<text x="${f1(GX(635))}" y="154" class="t-xs t-mid" style="fill:var(--terra);font-weight:700">exon 10</text><text x="${f1(GX(60))}" y="154" class="t-xs">exons (sizes schematic)</text></g>`}
    /* L4 protein */
    if(o4>0){s+=`<g style="opacity:${f1(o4)}">`;
      s+=`<path d="M${f1(GX(590))} 180L${f1(ax(580))} ${BY}M${f1(GX(680))} 180L${f1(ax(775))} ${BY}" style="stroke:var(--terra);stroke-width:1.2;stroke-dasharray:4 3"/>`;
      s+=`<text x="${f1(GX(60))}" y="${PY}" class="t-sm">pyrin · 781 aa</text>`;
      s+=`<rect x="${f1(GX(60))}" y="${BY}" width="${f1(GW(620))}" height="22" rx="5" style="fill:var(--panel-2);stroke:var(--line)"/>`;
      const D=[[1,92,'PYD','var(--sea)'],[266,280,'','var(--gold)'],[370,412,'B-box','var(--crocus)'],[413,442,'CC','var(--muted)'],[580,775,'B30.2','var(--terra)']];
      D.forEach(([a,b,l,c])=>{const x=ax(a),w=ax(b)-ax(a);s+=`<rect x="${f1(x)}" y="${BY}" width="${f1(w)}" height="22" rx="4" style="fill:${c};opacity:.85"/>`;
        if(l&&(!N||l==='PYD'||l==='B30.2'))s+=`<text x="${f1(x+w/2)}" y="${BY+15}" class="t-xs t-mid" style="fill:var(--panel);font-weight:700">${l}</text>`});
      /* the small domains have no room for labels inside the narrow bar: list them instead */
      if(N)s+=`<text x="18" y="${PY+12}" class="t-xs"><tspan style="fill:var(--gold)">bZIP</tspan> 266–280 · <tspan style="fill:var(--crocus)">B-box</tspan> 370–412 · <tspan style="fill:var(--muted)">CC</tspan> 413–442</text>`;
      else s+=`<text x="${f1(ax(273))}" y="${BY-6}" class="t-xs t-mid" style="fill:var(--gold);font-weight:700">bZIP</text>`;
      /* narrow: the 600/781 ticks sit where the hot-spot cone and the exon leaders
         converge, so the ruler stops at 400 (the length is in the label above) */
      (N?[[1,'1'],[200,'200'],[400,'400']]:[[1,'1'],[200,'200'],[400,'400'],[600,'600'],[781,'781']]).forEach(([a,l])=>s+=`<text x="${f1(ax(a))}" y="${BY+36}" class="t-xs t-mid">${l}</text>`);
      s+='</g>'}
    /* L5 pins */
    if(o5>0){s+=`<g style="opacity:${f1(o5)}">`;
      s+=`<path d="M${f1(ax(670))} ${BY+22}L${f1(IX(670))} ${IY}M${f1(ax(770))} ${BY+22}L${f1(IX(770))} ${IY}" style="stroke:var(--muted);stroke-width:1;stroke-dasharray:3 3"/>`;
      s+=`<rect x="${f1(IX(670))}" y="${IY}" width="${f1(IX(770)-IX(670))}" height="12" rx="3" style="fill:var(--terra);opacity:.3"/>`;
      [680,700,720,740,760].forEach(a=>s+=`<line x1="${f1(IX(a))}" x2="${f1(IX(a))}" y1="${IY}" y2="${IY+12}" style="stroke:var(--panel);stroke-width:1"/>`);
      s+=`<text x="${f1(IX(670))}" y="${IY+64}" class="t-xs">B30.2 hot spot, aa 670–770 (magnified)</text>`;
      PORD.forEach((id,i)=>{const P=PIN[id],V=GN_VARS.find(v=>v.id===id),o=ramp(t,.8+i*.018,.83+i*.018);if(o<=0)return;
        const on=id===sel,c=GN_CLSC[V.cls],hy=lerp(P.y0,P.hy,ease(o));
        s+=`<g class="clk" data-v="${id}" role="button" aria-label="${id}" style="opacity:${f1(o)}"><line x1="${f1(P.x)}" x2="${f1(P.x)}" y1="${P.y0}" y2="${f1(hy)}" style="stroke:${c};stroke-width:1.6"/>`;
        s+=`<circle cx="${f1(P.x)}" cy="${f1(hy)}" r="${on?7:5.5}" style="fill:${c};stroke:${on?'var(--ink)':'none'};stroke-width:2"/>`;
        s+=`<circle cx="${f1(P.x)}" cy="${f1(hy)}" r="13" style="fill:transparent"/>`;
        s+=`<text x="${f1(P.lx)}" y="${P.ly}" class="t-xs" style="text-anchor:${P.a};fill:${on?'var(--ink)':c};font-weight:700">${id}</text>`;
        if(P.sub)s+=`<text x="${f1(P.lx)}" y="${P.ly+11}" class="t-xs t-mid">${P.sub}</text>`;
        s+='</g>'});
      s+='</g>'}
    svg.innerHTML=s;
    const p=phaseOf(GN_Z,t);setSt(p);$('#gnNote').innerHTML=noteHTML(GN_Z[p]);
  }
  const stop=playWire(rg,$('#gnPlay'),draw,15000,'Replay','gene');
  const setSt=stepWire($('#gnSteps'),GN_Z,rg,draw,stop);
  function pick(id){sel=id;const V=GN_VARS.find(v=>v.id===id);
    $$('[data-vc]',$('#gnChips')).forEach(b=>b.setAttribute('aria-pressed',b.dataset.vc===id));
    $('#gnVar').innerHTML=`<span class="kicker">${V.ex} · residue ${V.aa}</span><h4>${V.id} <span class="gn-cls ${V.cls}">Infevers, read 2026-10-16: ${GN_CLSN[V.cls]}</span></h4><dl><dt>Where it is common</dt><dd>${V.pop}</dd><dt>Severity and notes</dt><dd>${V.sev}</dd></dl>`;
    if(+rg.value<.84){rg.value=1}draw(+rg.value)}
  $('#gnChips').innerHTML=GN_VARS.map(v=>`<button class="btn" data-vc="${v.id}" aria-pressed="false"><span style="color:${GN_CLSC[v.cls]}">●</span> ${v.id}</button>`).join('');
  $('#gnLegend').innerHTML=['P','LP','VUS','LB'].map(c=>`<span><i style="background:${GN_CLSC[c]}"></i>${GN_CLSN[c]}</span>`).join('');
  $('#gnChips').addEventListener('click',e=>{const b=e.target.closest('[data-vc]');if(b){stop();pick(b.dataset.vc)}});
  svg.addEventListener('click',e=>{const g=e.target.closest('[data-v]');if(g){stop();pick(g.dataset.v)}});
  draw(+rg.value);
  (()=>{const V=GN_VARS[0];$$('[data-vc]',$('#gnChips')).forEach(b=>b.setAttribute('aria-pressed',b.dataset.vc===V.id));
    $('#gnVar').innerHTML=`<span class="kicker">${V.ex} · residue ${V.aa}</span><h4>${V.id} <span class="gn-cls ${V.cls}">Infevers, read 2026-10-16: ${GN_CLSN[V.cls]}</span></h4><dl><dt>Where it is common</dt><dd>${V.pop}</dd><dt>Severity and notes</dt><dd>${V.sev}</dd></dl>`})();

  /* ---------- 2. Punnett ---------- */
  const ps=$('#gnPun'),rp=$('#gnPT');let X=GN_CROSS[0];
  const chip=(x,y,a,r=14)=>{const c=a==='V'?'var(--terra)':a==='D'?'var(--bad)':'var(--sea)';return `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" style="fill:${c}"/><text x="${f1(x)}" y="${f1(y+4.5)}" class="t-lbl t-mid" style="fill:var(--panel)">${a==='D'?'Δ':a}</text>`};
  const kind=(a,b)=>(a==='D'||b==='D')?'dom':(a==='V'&&b==='V')?'two':(a==='V'||b==='V')?'car':'none';
  const KN={two:['two variants','var(--terra-soft)','var(--terra)'],car:['carrier','var(--gold-soft)','var(--gold)'],none:['no variant','var(--sea-soft)','var(--sea)'],dom:['dominant variant','var(--bad-soft)','var(--bad)']};
  function drawP(t){
    /* narrow: both parents stack above a square grid, and the odds move underneath */
    const N=vb(ps,'720 400','400 668');
    const CX=N?[205,315]:[290,410],RY=N?[265,375]:[197,292],HX=N?118:190,HY=N?188:128;
    const GX0=N?150:230,GY0=N?210:150,CW=N?110:120,CH=N?110:95;
    const P1=N?[[175,48],[225,48]]:[[325,52],[375,52]],P2=N?[[175,114],[225,114]]:[[55,245],[105,245]];
    const B1=N?[140,30]:[290,34],B2=N?[140,96]:[20,227];
    let s=`<rect x="0" y="0" width="100%" height="100%" style="fill:var(--field)"/>`;
    s+=`<rect x="${B1[0]}" y="${B1[1]}" width="120" height="36" rx="18" style="fill:var(--panel);stroke:var(--line)"/><text x="${B1[0]+60}" y="${B1[1]-10}" class="t-sm t-mid">Parent 1: ${X.la}</text>`;
    s+=`<rect x="${B2[0]}" y="${B2[1]}" width="120" height="36" rx="18" style="fill:var(--panel);stroke:var(--line)"/><text x="${B2[0]+60}" y="${B2[1]-10}" class="t-sm t-mid">Parent 2: ${X.lb}</text>`;
    const g=ease(ramp(t,.15,.34));
    /* grid */
    const go=ramp(t,.1,.18);
    s+=`<g style="opacity:${f1(go)}">${N?`<text x="18" y="192" class="t-xs">gametes from parent 1</text><text x="${HX}" y="310" class="t-xs t-mid">gametes</text><text x="${HX}" y="321" class="t-xs t-mid">parent 2</text>`:`<text x="350" y="104" class="t-xs t-mid">gametes from parent 1</text><text x="${HX}" y="160" class="t-xs t-mid">gametes</text><text x="${HX}" y="171" class="t-xs t-mid">parent 2</text>`}`;
    for(let r=0;r<2;r++)for(let c=0;c<2;c++){const k=kind(X.a[c],X.b[r]),fo=ramp(t,.64+(r*2+c)*.03,.72+(r*2+c)*.03);
      s+=`<rect x="${GX0+c*CW}" y="${GY0+r*CH}" width="${CW}" height="${CH}" style="fill:${fo>0?KN[k][1]:'var(--panel)'};stroke:var(--line);stroke-width:1.5"/>`;
      if(fo>0)s+=`<rect x="${GX0+2+c*CW}" y="${GY0+2+r*CH}" width="${CW-4}" height="${CH-4}" style="fill:none;stroke:${KN[k][2]};stroke-width:2;opacity:${f1(fo)}"/><text x="${CX[c]}" y="${RY[r]+(N?36:34)}" class="t-xs t-mid" style="fill:${KN[k][2]};font-weight:700;opacity:${f1(fo)}">${KN[k][0]}</text>`}
    s+='</g>';
    /* parents' alleles moving to gamete headers */
    P1.forEach(([x,y],i)=>{s+=chip(x,y,X.a[i],12);if(g>0){const hx=lerp(x,CX[i],g),hy=lerp(y,HY,g);s+=`<circle cx="${f1(hx)}" cy="${f1(hy)}" r="${f1(16+4*g)}" style="fill:none;stroke:var(--muted);stroke-dasharray:3 3;opacity:${f1(g)}"/>`+chip(hx,hy,X.a[i])}});
    P2.forEach(([x,y],i)=>{s+=chip(x,y,X.b[i],12);if(g>0){const hx=lerp(x,HX,g),hy=lerp(y,RY[i],g);s+=`<circle cx="${f1(hx)}" cy="${f1(hy)}" r="${f1(16+4*g)}" style="fill:none;stroke:var(--muted);stroke-dasharray:3 3;opacity:${f1(g)}"/>`+chip(hx,hy,X.b[i])}});
    /* fertilization: copies fly into cells */
    for(let r=0;r<2;r++)for(let c=0;c<2;c++){const k=r*2+c,f=ease(ramp(t,.38+k*.06,.5+k*.06));if(f<=0)continue;
      s+=chip(lerp(CX[c],CX[c]-18,f),lerp(HY,RY[r]-4,f),X.a[c],13)+chip(lerp(HX,CX[c]+18,f),lerp(RY[r],RY[r]-4,f),X.b[r],13)}
    /* odds panel */
    const op=ramp(t,.8,.88);
    if(op>0){const cnt={};for(let r=0;r<2;r++)for(let c=0;c<2;c++){const k=kind(X.a[c],X.b[r]);cnt[k]=(cnt[k]||0)+1}
      const ox=N?18:496;
      s+=`<g style="opacity:${f1(op)}"><text x="${ox}" y="${N?456:160}" class="t-sm">per child</text>`;
      ['dom','two','car','none'].filter(k=>cnt[k]).forEach((k,i)=>{const y=N?490+i*44:196+i*58,pc=cnt[k]*25*ease(ramp(t,.84,.97));
        s+=`<text x="${ox}" y="${y}" class="t-big" style="fill:${KN[k][2]};font-size:26px">${Math.round(pc)}%</text><text x="${N?96:ox}" y="${N?y:y+16}" class="t-xs">${KN[k][0]}</text>`;
        const bx=N?200:556,bw=N?130:56;
        s+=`<rect x="${bx}" y="${y-14}" width="${bw}" height="10" rx="5" style="fill:var(--panel-2)"/><rect x="${bx}" y="${y-14}" width="${f1(bw*pc/100)}" height="10" rx="5" style="fill:${KN[k][2]}"/>`});
      s+='</g>'}
    /* legend */
    const ly=N?624:378,lx0=N?26:40;
    s+=chip(lx0,ly,'V',9)+`<text x="${lx0+14}" y="${ly+4}" class="t-xs">FMF variant</text>`+chip(150,ly,'+',9)+`<text x="164" y="${ly+4}" class="t-xs">usual copy</text>`;
    if(X.id==='dn')s+=chip(N?lx0:260,N?ly+24:ly,'D',9)+`<text x="${(N?lx0:260)+14}" y="${(N?ly+24:ly)+4}" class="t-xs">dominant-acting variant (M694del, T577)</text>`;
    ps.innerHTML=s;
    const p=phaseOf(GN_P,t);setP(p);const P=Object.assign({},GN_P[p]);if(p===3)P.txt=X.txt;$('#gnPNote').innerHTML=noteHTML(P);
  }
  const stopP=playWire(rp,$('#gnPPlay'),drawP,12000,'Replay','gene');
  const setP=stepWire($('#gnPSteps'),GN_P,rp,drawP,stopP);
  $('#gnCross').innerHTML=GN_CROSS.map((c,i)=>`<button class="btn" data-cx="${i}" aria-pressed="${i===0}">${c.n}</button>`).join('');
  const readP=()=>$('#gnPRead').innerHTML=`<span><b>${X.n}</b></span><span>${X.txt}</span>`;
  $('#gnCross').addEventListener('click',e=>{const b=e.target.closest('[data-cx]');if(!b)return;X=GN_CROSS[+b.dataset.cx];
    $$('[data-cx]',$('#gnCross')).forEach(x=>x.setAttribute('aria-pressed',x===b));readP();drawP(+rp.value)});
  readP();drawP(+rp.value);

  /* ---------- 3. read a genetic result ---------- */
  const s1=$('#gnA1'),s2=$('#gnA2');
  const opts=GN_AL.map(([n])=>`<option value="${n}">${n==='none'?'No variant found':n}</option>`).join('');
  s1.innerHTML=opts;s2.innerHTML=opts;s1.value='M694V';s2.value='none';
  const ST=[['Pathogenic',12,'var(--bad)'],['Likely pathogenic',38,'var(--terra)'],['VUS',176,'var(--warn)'],['Likely benign',143,'var(--good)'],['Benign',14,'var(--sea)'],['Not classified',20,'var(--muted)'],['Unsolved',9,'var(--line)']];
  $('#gnStack').innerHTML=ST.map(([n,v,c])=>`<i style="width:${(v/412*100).toFixed(2)}%;background:${c}" title="${n}: ${v}"></i>`).join('');
  $('#gnStackLeg').innerHTML=ST.map(([n,v,c])=>`<span><i style="background:${c}"></i>${n} ${v}</span>`).join('')+'<span>[[Infevers2026]]</span>';
  const grp=c=>(c==='P'||c==='LP')?'path':c==='VUS'?'vus':'out';
  function interp(){
    const A=GN_AL.find(x=>x[0]===s1.value),B=GN_AL.find(x=>x[0]===s2.value);
    const ga=grp(A[1]),gb=grp(B[1]),gs=[ga,gb].sort().join('+');
    let v,cl,txt;
    if(gs==='path+path'){cl='conf';v=A[0]===B[0]?'Confirmatory genotype (homozygous)':'Confirmatory genotype (compound heterozygous, if in trans)';
      txt='Two pathogenic or likely pathogenic variants on both copies (biallelic). In the Eurofever/PRINTO 2019 criteria this plus <b>at least 1 of 4</b> clinical items (episodes of 1–3 days, arthritis, chest pain, abdominal pain) classifies as FMF, once two prerequisites hold: acute-phase reactants raised during flares, and other causes considered with at least 6 months of recurrent activity. [[Gattorno2019]]'+(A[0]!==B[0]?' Two different variants count only if they sit on different copies (in trans); testing parents is the usual way to show this.':'')}
    else if(gs==='path+vus'){cl='non';v='Non-confirmatory genotype: pathogenic + VUS';txt='One pathogenic variant plus one of uncertain significance, in trans. The criteria then need <b>at least 2 of 4</b> clinical items. [[Gattorno2019,Lancieri2023]]'}
    else if(gs==='vus+vus'){cl='non';v='Non-confirmatory genotype: two VUS';txt='Two variants of uncertain significance on both copies. The criteria need <b>at least 2 of 4</b> clinical items. GeneReviews notes that two VUS neither establish nor rule out FMF. [[Gattorno2019,GeneReviews]]'}
    else if(gs==='out+path'){cl='non';v='Non-confirmatory genotype: a single pathogenic variant';txt='One pathogenic variant, no second qualifying variant. The criteria need <b>at least 2 of 4</b> clinical items. One lab summarizes this as "at least a carrier", who may still have symptoms. [[Gattorno2019,ARUP2023]]'}
    else if(gs==='out+vus'){cl='none';v='Not a qualifying genotype: one VUS only';txt='A single VUS is neither confirmatory nor non-confirmatory. Classification would rest on the clinical-only set (at least 6 of 9 items). A VUS result is inconclusive. [[Gattorno2019,ARUP2023]]'}
    else{cl='none';v='No qualifying variant';txt='Benign and likely-benign variants are excluded from the criteria. With no pathogenic variant FMF is less likely but not excluded: about 10–20% of FMF patients carry no <i>MEFV</i> variant. The clinical-only set (at least 6 of 9 items) can still classify FMF. [[Gattorno2019,BenZvi2015,ARUP2023]]'}
    const ex=[];const has=n=>A[0]===n||B[0]===n;
    if(A[0]==='M694V'&&B[0]==='M694V')ex.push('SHARE: M694V homozygotes have a "very high probability" of severe disease (level B), and those without symptoms should be followed closely (level A). [[Giancane2015,Ozen2017]]');
    if(has('M694del'))ex.push('M694del can act dominantly: a single copy has caused autosomal-dominant FMF with variable penetrance. [[Booth2000,Rowczenio2015]]');
    if(has('E148Q')&&(gs==='out+vus'||(A[0]==='E148Q'&&B[0]==='E148Q')))ex.push('SHARE: E148Q as the only variant does not support an FMF diagnosis (level B). [[Giancane2015,Ozen2017]]');
    if(has('E148Q')||has('K695R'))ex.push('E148Q and K695R are linked to mild disease or low penetrance. [[Touitou2001,Lancieri2023]]');
    if(has('A744S')||has('P369S'))ex.push('A744S and P369S are likely benign in Infevers 2026, so the criteria ignore them. Older lists treated them differently. [[Infevers2026,Shinar2012]]');
    const row=x=>`<div><b style="font-family:var(--mono);min-width:5.5em">${x[0]==='none'?'—':x[0]}</b><span class="gn-cls ${x[1]}">${x[0]==='none'?'No variant found':GN_CLSN[x[1]]}</span></div>`;
    $('#gnOut').innerHTML=`<div class="gn-al"><span class="kicker">Infevers class today</span>${row(A)}${row(B)}</div>
      <div class="gn-verdict ${cl}"><span class="kicker">Eurofever/PRINTO 2019 genotype</span><b class="v">${v}</b><p>${txt}</p></div>
      ${ex.length?`<ul style="margin:0;padding-left:18px;display:flex;flex-direction:column;gap:6px">${ex.map(x=>`<li>${x}</li>`).join('')}</ul>`:''}
      <div class="pt"><b>In plain words</b>FMF is diagnosed from symptoms; the gene test supports it but cannot rule it out. About 10–20% of people with typical FMF have no variant found, and up to about 25% have only one. [[Giancane2015,BenZvi2015,GeneReviews]]</div>
      <div class="hook"><b>Exam hook</b>Eurofever/PRINTO criteria are <b>classification</b> criteria for research, not a diagnostic test for one patient. Variant classes change over time: the classes shown here are the ones Infevers listed on 2026-10-16. [[Gattorno2019,Infevers2026]]</div>
      <p><a href="#dx" data-go="dx">Try the criteria calculator in Diagnosis &amp; criteria →</a></p>`;
    /* chromosome sketch */
    const rx=a=>70+a/781*270;let s='';
    [[A,40,'copy 1'],[B,92,'copy 2']].forEach(([x,y,l])=>{s+=`<text x="8" y="${y+4}" class="t-xs">${l}</text><rect x="70" y="${y-7}" width="270" height="14" rx="7" style="fill:var(--panel-2);stroke:var(--line)"/>`;
      s+=`<rect x="${f1(rx(580))}" y="${y-7}" width="${f1(rx(775)-rx(580))}" height="14" rx="3" style="fill:var(--terra);opacity:.18"/>`;
      if(x[0]==='none')s+=`<text x="205" y="${y+4}" class="t-xs t-mid">no variant found</text>`;
      else{const c=GN_CLSC[x[1]];s+=`<line x1="${f1(rx(x[2]))}" x2="${f1(rx(x[2]))}" y1="${y-7}" y2="${y-16}" style="stroke:${c};stroke-width:2"/><circle cx="${f1(rx(x[2]))}" cy="${y}" r="6" style="fill:${c}"/><text x="${f1(Math.min(rx(x[2]),316))}" y="${y-20}" class="t-xs t-mid" style="fill:${c};font-weight:700">${x[0]}</text>`}});
    s+=`<text x="${f1((rx(580)+rx(775))/2)}" y="116" class="t-xs t-mid">B30.2 (exon 10)</text>`;
    $('#gnRes').innerHTML=s;
  }
  s1.addEventListener('change',interp);s2.addEventListener('change',interp);interp();

  /* ---------- 4. cards ---------- */
  $('#gnCards').innerHTML=`
   <div class="card"><h4>Phenotype II: amyloidosis first</h4><p>AA amyloidosis as the first or only sign, in someone who never had attacks. [[Melikoglu2000,GeneReviews]] It is rare, and estimates differ: at most 0.3% of the 2,838-patient Turkish registry, about 0.6% in a later review whose authors doubt it is a separate entity, and no biopsy-proven case among 461 relatives of FMF-amyloidosis patients. [[Tunca2005,GulBenChetrit2025,Melikoglu2000]] SHARE advises following people with two pathogenic variants and no symptoms, and considering treatment when amyloidosis risk factors are present (level B). [[Giancane2015,Ozen2017]]</p></div>
   <div class="card"><h4>One variant, real symptoms</h4><p>Up to about 25% of people with FMF have only one identifiable variant [[GeneReviews,MarekYagel2009]]; 12% in one Turkish cohort [[Lachmann2006]] and 32% in a referral cohort. [[Tanatar2020]] Booty 2009 resequenced the whole 15-kb region in 46 such patients and found no second variant; one variant plus typical symptoms was judged enough to diagnose FMF and try colchicine. [[Booty2009]] Jéru 2013 saw heterozygosity as a susceptibility factor rather than Mendelian FMF. [[Jeru2013]] Gene dose matters. [[Federici2012]]</p></div>
   <div class="card"><h4>Truly dominant variants</h4><ul><li><b>M694del</b>: dominant FMF with variable penetrance (Booth 2000); one patient had AA amyloidosis. [[Booth2000]] A UK screen of about 3,500 patients found 21, all North-Western European, sharing a founder about 550 years old; median onset 18, excellent colchicine response. [[Rowczenio2015]]</li><li><b>T577N/S/A</b>, just before B30.2: dominant autoinflammation; T577N was absent from about 6,800 controls; colchicine-responsive. [[Stoffels2014]]</li><li>One lab also lists I692del as dominant with reduced penetrance. [[ARUP2023]]</li></ul></div>
   <div class="card"><h4>Genotype and severity</h4><p>M694V homozygotes: earlier onset, more arthritis (Shinar 2000). [[Shinar2000]] Amyloidosis link: yes in 90 Armenians (Cazeneuve 1999) [[Cazeneuve1999]], no in 2,838 Turks, where amyloidosis still affected 12.9% of the cohort (Tunca 2005). [[Tunca2005]] Among 124 M694V homozygotes, male sex (OR 2.37) and arthritic attacks (OR 3.27) raised amyloidosis risk. [[GershoniBaruch2003]]</p><div class="hook"><b>Exam hook</b>Studies disagree on M694V and amyloidosis; country of origin is itself a risk factor in SHARE. [[Giancane2015]]</div></div>
   <div class="card"><h4>What panels test</h4><p>Many labs test in two steps: common pathogenic variants first, then the full coding sequence. Screening covers exons 2, 3, 5 and 10; searching other exons in clinically definite FMF adds little. [[Shinar2012]]</p><ul><li>Exon 2: E148Q, E167D, T267I, R202Q</li><li>Exon 3: P369S, R408Q · Exon 5: F479L · Exon 9: I591T</li><li>Exon 10: M680I, M694V, M694I, V726A, A744S, R761H, I692del, K695R</li></ul></div>
   <div class="card"><h4>Limits of testing</h4><p>About 10–20% of FMF patients carry no <i>MEFV</i> variant, with a classic but milder picture than M694V homozygotes. [[BenZvi2015]] One lab estimates full sequencing sensitivity at 75–90%; deep intronic and regulatory variants are missed, and large deletions or duplications have not been reported as causes. [[ARUP2023]] FMF remains a clinical diagnosis (SHARE, level B). [[Giancane2015]]</p></div>
   <div class="card"><h4>OMIM numbers</h4><ul><li><b>249100</b> FMF, autosomal recessive</li><li><b>134610</b> FMF, autosomal dominant</li><li><b>608107</b> the <i>MEFV</i> gene</li><li><b>608068</b> PAAND</li></ul><p>[[UniProtO15553]]</p></div>
   <div class="card"><h4>PAAND is not FMF</h4><p>S242R removes a 14-3-3 binding site directly, so one copy causes a dominant disease with neutrophilic dermatosis, prolonged fever and myalgia. It responds to IL-1-targeted therapy rather than behaving as colchicine-responsive FMF. [[Masters2016,Schnappauf2019]]</p></div>`;
};
