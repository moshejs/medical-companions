/* =============== 3.1 McDonald criteria calculator =============== */
const DX_SITES=[
 {id:'pv',n:'Periventricular',ab:'PV',lab:'periventricular',dis:1,brain:1,max:8,def:3,pan:'ax'},
 {id:'jc',n:'Cortical / juxtacortical',ab:'JC',lab:'juxtacortical',dis:1,brain:1,max:4,def:1,pan:'ax'},
 {id:'it',n:'Infratentorial',ab:'IT',lab:'infratentorial',dis:1,brain:1,max:3,def:1,pan:'sg'},
 {id:'sc',n:'Spinal cord',ab:'SC',lab:'spinal cord',dis:1,brain:0,max:4,def:1,pan:'sg'},
 {id:'on',n:'Optic nerve',ab:'ON',lab:'optic nerves',dis:1,brain:0,max:2,def:1,pan:'or'},
 {id:'dw',n:'Deep white matter',ab:'WM',lab:'deep WM',dis:0,brain:1,max:6,def:3,pan:'ax'}
];
const DX_BR=['pv','jc','it','dw'],DX_ALL=['pv','jc','it','sc','on','dw'];
/* lesion positions in each panel's own coordinates: x, y, r, rotation */
const DX_POS={
 pv:[ [90,128,6,0],[150,128,6,0],[90,154,6,0],[150,154,6,0],[92,180,6,0],[148,180,6,0],[97,202,5,0],[143,202,5,0] ],
 jc:[ [47,123,5,-25],[188,108,5,30],[60,222,5,40],[184,216,5,-38] ],
 dw:[ [63,160,5,10],[177,166,5,-10],[76,98,5,30],[164,94,5,-30],[84,236,5,-20],[157,242,5,20] ],
 it:[ [67,160,5,90],[92,150,4.5,35],[124,180,6,0] ],
 sc:[ [83,238,5,90],[83,282,5,90],[83,320,5,90],[83,358,5,90] ],
 on:[ [55,75,5,58],[95,75,5,-58] ]
};
const DX_STEPS=[
 {from:0,at:.05,k:'Step 1',t:'Is it a typical attack?',
  txt:`An attack is patient-reported symptoms with corroborating objective findings, typical of an inflammatory demyelinating event, lasting at least 24 hours without fever or infection. A first such event is a clinically isolated syndrome (CIS) [[Solomon2026]]. In about 85% of young adults with MS the disease begins as a CIS of the optic nerve, brainstem or spinal cord [[Miller2005]]. The 2017 criteria apply mainly to a typical CIS [[Thompson2018]]. 2024 has two entry routes: an attack or objective progression (Figure 3), and incidental MRI findings or symptoms not specific to MS (Figure 2) [[Montalban2025]].`,
  pt:`First the doctor asks whether the episode looks like MS: symptoms that come on over hours to days, last at least a day, and show up when you are examined, without a fever or infection to explain them.`,
  hook:`No objective findings, no attack. Treating atypical symptoms as attacks, and accepting attacks without objective evidence, were leading causes of misdiagnosis [[Solomon2016]].`},
 {from:.25,at:.3,k:'Step 2',t:'Dissemination in space',
  txt:`2017: at least one T2 lesion in at least 2 of 4 areas: periventricular, cortical/juxtacortical, infratentorial, spinal cord. Symptomatic lesions count, except a symptomatic optic nerve lesion in optic neuritis [[Thompson2018,Filippi2023]]. 2024: typical lesions in 2 of 5 topographies, with the optic nerve as the fifth, symptomatic or not [[IACCTMS2025Slides,Saidha2025]]. A periventricular lesion touches the lateral ventricle with no white matter between; symmetric central pontine lesions suggest small-vessel disease and do not count [[Solomon2026,Filippi2019]].`,
  pt:`The scan has to show damage in more than one part of the nervous system. Spots deep in the white matter, away from the ventricles and the cortex, do not count: many people without MS have them.`,
  hook:`MAGNIMS: a lesion should be ≥3 mm in its long axis to count. Periventricular MS lesions run perpendicular to the ventricles (Dawson's fingers) [[Filippi2019]].`},
 {from:.5,at:.55,k:'Step 3',t:'Dissemination in time, or CSF',
  txt:`2017 DIT: enhancing and non-enhancing lesions together at any time, or a new T2 or enhancing lesion on follow-up, or a second attack. In a typical CIS with DIS, CSF-specific oligoclonal bands substitute for DIT [[Thompson2018,Filippi2023]]. 2024: DIS plus DIT or DIS plus positive CSF (OCB or κ-FLC index ≥6.1) is enough. With lesions in only one site, the case also needs a central vein sign (Select-6) or a paramagnetic rim lesion [[IACCTMS2025Slides,Deisenhammer2025]].`,
  pt:`Next, the damage has to have happened at more than one time: an old spot next to an active one, a new spot on a later scan, or a second attack. A spinal fluid test showing immune activity inside the nervous system can stand in for that.`,
  hook:`2017: OCB can replace DIT. 2024: κ-FLC can replace OCB; CVS and PRL can raise specificity but are never required [[Thompson2018,IACCTMS2025Slides]].`},
 {from:.75,at:.8,k:'Step 4',t:'No better explanation',
  txt:`MS is a diagnosis of exclusion; misdiagnosis and underdiagnosis both harm patients, and the diagnosis should be reassessed periodically [[IACCTMS2025Slides]]. In Figure 3, if better explanations have not been excluded, the next step is to monitor for new neurological or imaging changes, not to diagnose [[Montalban2025]]. Pooled MS misdiagnosis is about 15% [[Zurrer2024]].`,
  pt:`Last, the doctor checks that nothing else explains the findings better: migraine, blood-vessel disease, other inflammatory or infectious conditions. No calculator can do this part.`,
  hook:`"Criteria met" always carries the rider "if there is no better explanation". Migraine was the commonest true diagnosis in people misdiagnosed with MS [[Solomon2016,Kaisey2019]].`}
];
const DX_PRESET={
 on:{pres:'attack',att:1,obj:1,L:{on:{n:1,gd:1},pv:{n:3},jc:{n:1}},sel:'on'},
 pp:{pres:'prog',prog:true,ocb:true,L:{pv:{n:2},sc:{n:2}},sel:'sc'},
 ris:{pres:'incid',ocb:true,L:{pv:{n:4,cvs:3},jc:{n:2,cvs:1},it:{n:1},sc:{n:1},dw:{n:2,cvs:2}},sel:'pv'},
 mig:{pres:'incid',vasc:true,better:true,L:{dw:{n:5},jc:{n:1}},sel:'dw'},
 clr:{L:{},sel:'pv'}
};
function dxBlank(){const L={};DX_ALL.forEach(k=>L[k]={n:0,gd:0,nw:0,cvs:0,prl:0});
  return {ver:'2024',pres:'attack',att:1,obj:1,hist:false,clin2:false,prog:false,ocb:false,kflc:'',rnfl:'',gcipl:'',vep:false,age:'adult',vasc:false,adem:false,better:false,L,sel:'pv'}}
function dxNum(v){if(v===''||v==null)return null;const x=parseFloat(v);return isNaN(x)?null:x}
const dxM=b=>b?'✓':'✗';
/* the rules: returns four steps (status, two short lines for the drawing, one cited sentence) and a verdict */
function dxEval(S,ver){
  const L=S.L,n=k=>L[k].n,sum=(ks,f)=>ks.reduce((a,k)=>a+L[k][f],0);
  const kf=dxNum(S.kflc),kpos=kf!=null&&kf>=6.1;
  const rn=dxNum(S.rnfl),gc=dxNum(S.gcipl),oct=(rn!=null&&rn>=6)||(gc!=null&&gc>=4);
  const wm=sum(DX_BR,'n'),cvsP=sum(DX_BR,'cvs'),prl=sum(DX_BR,'prl');
  /* Select-6: >=6 CVS+ white-matter lesions, OR (fewer than 10 white-matter lesions and CVS+ outnumber CVS-) */
  const cvs6=cvsP>=6||(wm<10&&cvsP>wm-cvsP),prl1=prl>=1;
  const child=S.age==='u12'||S.age==='u18',old=S.age==='o50'||S.vasc;
  const pres=S.pres,att=pres==='attack'?S.att:0,NB=S.better;
  const st=[],warn=[];let V,ok=false;
  const abbr=ks=>ks.map(k=>DX_SITES.find(x=>x.id===k).ab).join(' + ');
  const full=ks=>ks.map(k=>DX_SITES.find(x=>x.id===k).lab).join(', ');
  const s4=NB?{st:'no',a:'Better explanation present',b:'Do not diagnose MS',long:`You ticked that a better explanation is present or not yet excluded. The criteria cannot be applied until it is [[Solomon2026]].`}
             :{st:'warn',a:'Clinician judgement',b:'No calculator can decide this',long:`Needs a full workup for other diagnoses; see The differential. The verdict is conditional on it [[Solomon2026]].`};
  if(ver==='2017'){
    const A=['pv','jc','it','sc'].filter(k=>n(k)>0),disM=A.length>=2;
    const ex=['pv','jc','it','sc','dw'],gd=sum(ex,'gd'),ne=ex.reduce((a,k)=>a+L[k].n-L[k].gd,0),nw=sum(ex,'nw');
    const ditM=(gd>0&&ne>0)||nw>0;
    const onNote=n('on')>0?' The optic nerve lesion does not count in 2017.':'';
    if(pres==='incid'){
      st.push({st:'no',a:'Incidental MRI / non-specific',b:'2017 has no route for this',long:`2017 starts from a typical attack (CIS) or a progressive course [[Thompson2018]]. Incidental lesions alone remain a radiologically isolated syndrome; a route for RIS is new in 2024 [[Montalban2025]].`});
      st.push({st:'skip',a:'Not applied',b:`MRI: ${A.length} of 4 areas`,long:`Lesions in ${A.length} of the 4 areas, but the 2017 table is not entered.`});
      st.push({st:'skip',a:'Not applied',b:S.ocb?'CSF OCB positive':'',long:`Not reached.`});
      st.push(s4);
      V={cls:'no',t:'Not MS under the 2017 criteria',s1:'Not met',s2:'2017 has no RIS route',why:`The 2017 criteria apply to a typical attack or a progressive course. An incidental MRI finding is a radiologically isolated syndrome. Switch to 2024 to see the new Figure 2 route.`};
    }else if(pres==='prog'){
      const a=n('pv')+n('jc')+n('it')>0,b=n('sc')>=2,c=S.ocb,cnt=a+b+c;
      st.push({st:S.prog?'ok':'no',a:S.prog?'Progression ≥1 year':'Progression under 1 year',b:'PPMS: needs 2 of (a) (b) (c)',long:`PPMS needs 1 year of disability progression, independent of relapse, plus 2 of 3: (a) ≥1 T2 lesion in a brain area typical of MS, (b) ≥2 spinal cord lesions, (c) CSF-specific OCB [[Thompson2018,Filippi2023]].${S.prog?'':' Tick the 12-month box when it applies.'}`});
      st.push({st:(a||b)?'ok':'no',a:`(a) brain lesion ${dxM(a)}`,b:`(b) ≥2 cord lesions ${dxM(b)} (${n('sc')})`,long:`(a) brain lesion in PV, JC or IT: ${a?'yes':'no'}. (b) two or more cord lesions: ${b?'yes':'no'} (${n('sc')} drawn).${onNote}`});
      st.push({st:cnt>=2?'ok':'no',a:`(c) CSF OCB ${dxM(c)}`,b:`${cnt} of 3 (need 2)`,long:`(c) CSF-specific oligoclonal bands: ${c?'yes':'no'}. Total ${cnt} of 3; 2 are needed. κ-FLC is not part of 2017.`});
      st.push(s4);
      const met=S.prog&&cnt>=2;ok=met;
      if(met)V={cls:'yes',t:'Criteria met (if no better explanation)',s1:'Criteria met',s2:'if no better explanation',why:`2017 PPMS: a year of progression plus ${[a&&'a brain lesion',b&&'two cord lesions',c&&'CSF oligoclonal bands'].filter(Boolean).join(' and ')}.`};
      else if(!S.prog)V={cls:'maybe',t:'Not yet: a year of progression is needed',s1:'Not yet',s2:'needs 1 year of progression',why:`PPMS is diagnosed only after one year of progression, judged looking back or forward.`};
      else V={cls:'no',t:'Criteria not met',s1:'Not met',s2:`${cnt} of 3 PPMS items`,why:`Only ${cnt} of the 3 PPMS items is shown; 2 are needed.`};
    }else{
      const row=att>=2?(S.obj>=2?1:(S.hist?2:3)):(S.obj>=2?4:5);
      const needDIS=row===3||row===5,needDIT=row===4||row===5,clinD=att>=2&&S.clin2;
      const RT={1:'nothing more needed',2:'nothing more needed',3:'needs DIS',4:'needs DIT',5:'needs DIS and DIT'};
      st.push({st:'ok',a:`${att>=2?'≥2 attacks':'1 attack'}, ${S.obj>=2?'≥2 lesions':'1 lesion'} on exam`,b:`Table row ${row}: ${RT[row]}`,long:`${att>=2?'Two or more attacks':'One attack'} with objective clinical evidence of ${S.obj>=2?'two or more lesions':'one lesion'}${row===2?', plus clear-cut historical evidence of an earlier attack elsewhere':''}: row ${row} of the 2017 table, which ${RT[row].replace('DIS','dissemination in space').replace('DIT','dissemination in time')} [[Thompson2018,Filippi2023]].`});
      let disOK=true;
      if(!needDIS)st.push({st:'skip',a:row===4?'Clinical: ≥2 lesions on exam':`Shown clinically (row ${row})`,b:`MRI: ${A.length} of 4 areas`,long:`Not needed for row ${row}: the clinical findings already show dissemination in space.`});
      else{disOK=clinD||disM;
        st.push({st:disOK?'ok':'no',a:`MRI: ${A.length} of 4 areas (need 2)`,b:clinD?'+ later attack at a new site':(n('on')>0?'ON lesion: not a 2017 area':(A.length?'Areas: '+abbr(A):'No lesions in the 4 areas')),long:`MRI areas with lesions: ${A.length?full(A):'none'} (${A.length} of 4).${clinD?' A later attack at a different site also shows DIS.':''}${onNote}`});
        if(old&&disOK&&!clinD&&A.includes('pv')&&n('pv')<3&&A.length-1<2)warn.push(`Dissemination in space here rests on fewer than 3 periventricular lesions. For older people or those with vascular risk factors, the 2017-era MAGNIMS advice was to require ≥3 periventricular lesions [[Filippi2023,Solomon2026]].`);
      }
      let ditOK=true;
      if(!needDIT)st.push({st:'skip',a:'Not needed for this row',b:ditM?'(MRI DIT also shown)':'',long:`Not needed for row ${row}: two or more attacks already show dissemination in time.`});
      else{ditOK=ditM||(S.ocb&&(row===4||disOK));
        st.push({st:ditOK?'ok':'no',a:ditM?(nw>0?'MRI: new lesion on follow-up':'MRI: Gd+ and Gd− together'):'MRI DIT: not shown',b:S.ocb?'CSF OCB positive: substitutes':'CSF OCB negative or not done',long:`MRI DIT: ${ditM?(nw>0?'a new lesion on the follow-up scan':'enhancing and non-enhancing lesions together'):'not shown'}${n('on')>0&&L.on.gd>0?' (the enhancing optic nerve lesion does not count in 2017)':''}. CSF-specific OCB: ${S.ocb?'positive, which substitutes for DIT in a typical CIS with DIS':'negative or not done'} [[Thompson2018]].`});
      }
      st.push(s4);
      const met=disOK&&ditOK;ok=met;
      if(met)V={cls:'yes',t:'Criteria met (if no better explanation)',s1:'Criteria met',s2:'if no better explanation',why:`2017, row ${row}${needDIS?': dissemination in space '+(clinD?'by a later attack':'on MRI'):''}${needDIT?(needDIS?' and':':')+' dissemination in time '+(ditM?'on MRI':'replaced by CSF oligoclonal bands'):''}${!needDIS&&!needDIT?': the clinical picture alone is enough':''}.`};
      else if(!disOK)V={cls:'no',t:'Criteria not met: no dissemination in space',s1:'Not met',s2:'no dissemination in space',why:`Lesions are needed in at least 2 of the 4 areas, or a later attack at a different site. Without dissemination in space, CSF bands cannot stand in for time.`};
      else V={cls:'maybe',t:'Not yet: dissemination in time is missing',s1:'Not yet',s2:'dissemination in time missing',why:`Space is shown. A new T2 or enhancing lesion on a follow-up scan, enhancing and non-enhancing lesions together, a second attack, or CSF-specific oligoclonal bands would complete it.`};
      if(met&&warn.length)V={...V,cls:'maybe',t:'Criteria met, but read with caution',s1:'Met · caution',s2:'see the age warning'};
    }
    if(child)warn.push(`In 110 children with non-encephalopathic demyelinating syndromes, 2017 had sensitivity 83% and specificity 73% (2010: 49% and 87%) [[Wong2019]].`);
  }else{
    const onAny=n('on')>0||oct||S.vep;
    const ids=['on','jc','pv','it','sc'].filter(k=>k==='on'?onAny:n(k)>0);
    /* clinical DIS: a second attack in a different location, later (clin2) or clear-cut historical (hist) */
    const csf=S.ocb||kpos,clinD=att>=2&&(S.clin2||S.hist);
    const sitesN=Math.min(5,ids.length+(clinD?1:0));
    const gdA=sum(DX_ALL,'gd'),neA=DX_ALL.reduce((a,k)=>a+L[k].n-L[k].gd,0),nwA=sum(DX_ALL,'nw');
    const dit=gdA>0||nwA>0||att>=2,ditG=(gdA>0&&neA>0)||nwA>0||att>=2;
    /* after ADEM in a child the criteria wait for a second attack and/or new T2 lesions (>90 days) */
    const ademAll=child&&S.adem&&pres!=='incid',adem=ademAll&&!(att>=2||nwA>0);
    if(ademAll&&!adem)warn.push(`After ADEM in a child, the criteria apply only once there is a second typical attack and/or new T2 lesions in typical places more than 90 days after ADEM onset. This verdict assumes that timing [[IACCTMS2025Slides]].`);
    const onBy=onAny?[n('on')>0&&'MRI',oct&&'OCT',S.vep&&'VEP'].filter(Boolean).join(', '):'';
    const siteLong=`Sites with typical lesions: ${ids.length?ids.map(k=>k==='on'?'optic nerve ('+onBy+')':DX_SITES.find(x=>x.id===k).lab).join(', '):'none'}${clinD?', plus a second attack at a different site (clinical DIS)':''}: ${sitesN} of 5 [[IACCTMS2025Slides,Solomon2026]].${n('dw')>0?' Deep white-matter lesions are not one of the five.':''}`;
    let met=false,metG=false,miss='';
    if(pres!=='incid'){
      const okEntry=pres==='attack'||S.prog;
      if(adem)st.push({st:'warn',a:'ADEM in a child',b:'Wait: 2nd attack or new lesions',long:`In a child presenting with ADEM, MS criteria can be applied only after a second attack typical of MS and/or new T2 lesions in typical places more than 90 days after ADEM onset [[IACCTMS2025Slides]].`});
      else if(ademAll&&okEntry)st.push({st:'ok',a:'After ADEM: criteria apply',b:'if >90 days after ADEM onset',long:`After ADEM in a child, the MS criteria can be applied once there is a second typical attack and/or new T2 lesions in typical places more than 90 days after ADEM onset [[IACCTMS2025Slides]].`});
      else st.push({st:okEntry?'ok':'no',a:pres==='attack'?'Typical attack → Figure 3':(S.prog?'≥12 months progression':'Progression under 12 months'),b:pres==='attack'?'Entry (a): an attack':(S.prog?'Entry (b) → Figure 3':'PPMS needs ≥12 months'),long:pres==='attack'?`An attack with symptoms and signs characteristic of MS enters Figure 3 [[Montalban2025]].`:`Objective progression enters Figure 3; PPMS still needs clinical progression over at least 12 months [[IACCTMS2025Slides]].`});
      const brA=sitesN>=2||(pres==='prog'&&S.prog&&n('sc')>=2);
      st.push({st:(brA||sitesN===1)?'ok':'no',a:`${sitesN} of 5 sites${clinD?' (1 clinical)':''}`,b:brA?(sitesN>=2?'Branch A: ≥2 sites':'Branch A: ≥2 cord + 12 mo'):(sitesN===1?'Branch B: 1 site':'No typical lesions'),long:siteLong+(brA?' This is Branch A.':(sitesN===1?' One site: Branch B, which needs paired evidence.':''))});
      if(brA){const four=ids.length>=4;met=csf||cvs6||dit||four;metG=csf||cvs6||ditG||four;
        st.push({st:met?'ok':'no',a:met?'Branch A: at least 1 route':'Branch A: no route yet',b:`CSF${dxM(csf)} CVS${dxM(cvs6)} DIT${dxM(dit)} 4–5 sites${dxM(four)}`,long:`Branch A needs one of: positive CSF (${csf?'yes':'no'}), CVS Select-6 (${cvs6?'yes':'no'}), DIT (${dit?'yes':'no'}) or lesions in 4–5 locations (${four?'yes':'no'}) [[Montalban2025,IACCTMS2025Slides]].`});
        miss='Lesions are in 2 or more sites, but there is no positive CSF, Select-6 central vein sign, dissemination in time, or 4–5 sites yet.'}
      else if(sitesN===1){const p1=csf||dit,p2=cvs6||prl1;met=p1&&p2;metG=(csf||ditG)&&p2;
        st.push({st:met?'ok':'no',a:`(CSF or DIT)${dxM(p1)} + (CVS or PRL)${dxM(p2)}`,b:`CSF${dxM(csf)} DIT${dxM(dit)} CVS${dxM(cvs6)} PRL${dxM(prl1)}`,long:`Branch B needs one pair: CSF + CVS, CSF + PRL, DIT + CVS or DIT + PRL. Here CSF ${csf?'yes':'no'}, DIT ${dit?'yes':'no'}, Select-6 ${cvs6?'yes':'no'}, PRL ${prl1?'yes':'no'}. The CVS or PRL lesion may lie outside the five topographies [[Montalban2025,Solomon2026]].`});
        miss='With lesions in one site, the case needs (positive CSF or DIT) and (Select-6 CVS or at least one paramagnetic rim lesion).'}
      else st.push({st:'skip',a:'Not reached',b:'',long:`No typical lesions in any of the five sites.`});
      st.push(s4);
      if(adem)V={cls:'maybe',t:'Wait: an ADEM presentation',s1:'Wait',s2:'after a 2nd attack or new lesions',why:`After ADEM in a child, the criteria apply only after a second typical attack and/or new T2 lesions more than 90 days after onset.`};
      else if(!okEntry)V={cls:'maybe',t:'Not yet: 12 months of progression are needed',s1:'Not yet',s2:'needs 12 months of progression',why:`Primary progressive MS still requires clinical progression over at least 12 months.`};
      else if(met)V={cls:'yes',t:'Criteria met (if no better explanation)',s1:'Criteria met',s2:'if no better explanation',why:`2024, Figure 3, Branch ${brA?'A':'B'}: ${sitesN} site${sitesN>1?'s':''} plus ${[csf&&'positive CSF',cvs6&&'a Select-6 central vein sign',prl1&&!brA&&'a paramagnetic rim lesion',dit&&'dissemination in time',brA&&ids.length>=4&&'lesions in 4–5 locations'].filter(Boolean).join(', ')}.`};
      else V={cls:sitesN>=1||brA?'maybe':'no',t:sitesN>=1||brA?'Not yet':'Criteria not met',s1:sitesN>=1||brA?'Not yet':'Not met',s2:sitesN>=1||brA?(brA?'needs CSF, CVS, DIT or 4–5 sites':'needs a paired route'):'no typical lesions',why:sitesN>=1||brA?miss:'No typical lesions in any of the five sites.'};
      ok=met&&!adem&&okEntry;
    }else{
      st.push({st:'ok',a:'Incidental / non-specific',b:'→ Figure 2 (incl. RIS)',long:`Incidental imaging findings suggestive of demyelination, or symptoms not specific to MS (for example paroxysmal symptoms or seizures), enter Figure 2 once better explanations are excluded [[Montalban2025,IACCTMS2025Slides]].`});
      const two=ids.length>=2;
      st.push({st:two?'ok':'no',a:`${ids.length} of 5 sites (need 2)`,b:two?'Areas: '+abbr(ids):'One site does not qualify',long:siteLong.replace(/, plus a second attack[^:]*/,'')});
      const d2=gdA>0||nwA>0;met=two&&(csf||cvs6||d2);metG=two&&(csf||cvs6||(gdA>0&&neA>0)||nwA>0);
      if(two)st.push({st:met?'ok':'no',a:met?'At least 1 route':'No route yet',b:`CSF${dxM(csf)} CVS${dxM(cvs6)} DIT${dxM(d2)}`,long:`Figure 2 needs one of: positive CSF (${csf?'yes':'no'}), CVS Select-6 (${cvs6?'yes':'no'}) or DIT (${d2?'yes':'no'}). Here 4–5 sites alone are not enough and PRL is not a listed route [[Montalban2025,Samara2025]].`});
      else st.push({st:'skip',a:'Not reached',b:'',long:`Not reached: Figure 2 needs lesions in at least two sites.`});
      st.push(s4);
      if(met)V={cls:'yes',t:'Criteria met (if no better explanation)',s1:'Criteria met',s2:'if no better explanation',why:`2024, Figure 2: ${ids.length} sites plus ${[csf&&'positive CSF',cvs6&&'a Select-6 central vein sign',d2&&'dissemination in time'].filter(Boolean).join(', ')}. This route is new and debated: see below.`};
      else if(two)V={cls:'maybe',t:'Not yet',s1:'Not yet',s2:'needs CSF, CVS or DIT',why:`Lesions are in 2 or more sites. Figure 2 also needs positive CSF, a Select-6 central vein sign, or dissemination in time. Lesions in 4–5 sites alone do not qualify on this route.`};
      else V={cls:'no',t:'Criteria not met',s1:'Not met',s2:'needs lesions in ≥2 sites',why:`On the incidental or non-specific route, lesions must be present in at least 2 of the 5 sites.`};
      ok=met;
    }
    if(met&&!metG&&V.cls==='yes'){
      warn.push(`This verdict uses the Figure 3 footnote reading of DIT (any enhancing lesion). Under the companion glossary's stricter reading (enhancing and non-enhancing lesions together) DIT would not be met here [[Solomon2026]].`)}
    if(!ok&&!adem&&dxEval(S,'2017').ok)warn.push(pres==='prog'
      ?`This case meets 2017 but not 2024. That is expected for some primary progressive cases: unlike 2017, 2024 asks a progressive case with brain and cord lesions for DIT, a central vein sign or positive CSF, and lesions in one site need paired evidence [[Solomon2026,Montalban2025]].`
      :`This case meets 2017 but not 2024 as modelled here. The companion review says that, apart from some primary progressive cases, everyone who meets 2017 also meets 2024 [[Solomon2026]]. The gap comes from purely clinical evidence (lesions shown on examination or by history but not on MRI): this calculator counts it for 2024 only as a second attack at a different site, because the 2024 full text could not be checked.`);
    if(old&&ok){const conf=[n('sc')>0&&'a spinal cord lesion',csf&&'positive CSF',cvs6&&'CVS positivity'].filter(Boolean);
      if(!conf.length){warn.push(`Aged 50 or over, or with vascular risk, vascular disease or a headache disorder: extra confirmation is "strongly recommended": a spinal cord lesion, positive CSF, or CVS positivity. None is shown here [[IACCTMS2025Slides,Solomon2026]].`);
        if(V.cls==='yes')V={...V,cls:'maybe',t:'Criteria met on paper: extra confirmation strongly recommended',s1:'Met · confirm',s2:'cord lesion, CSF or CVS advised'}}
      else warn.push(`Age or vascular safeguard: the strongly recommended extra confirmation is present (${conf.join(', ')}) [[IACCTMS2025Slides]].`)}
    if(child){if(S.age==='u12')warn.push(`Under 12: MOG-IgG testing by cell-based assay is strongly recommended in every child with incident CNS demyelination [[IACCTMS2025Slides]].`);
      else warn.push(`From age 12, MOG-IgG testing is recommended for presentations not specific to MS or suggestive of MOGAD [[IACCTMS2025Slides]].`);
      if(wm>0)warn.push(`Under 18, a central vein in more than 50% of T2 lesions strongly supports MS: here ${cvsP} of ${wm} (${Math.round(cvsP/wm*100)}%) [[IACCTMS2025Slides,Solomon2026]]. OCT and VEP performance in children is less clear [[Samara2025]].`)}
  }
  if(NB&&V.cls!=='no')V={cls:'no',t:'Do not diagnose: a better explanation',s1:'Not MS (yet)',s2:'better explanation not excluded',why:`The rules ${V.cls==='yes'?'would be met':'are not fully met anyway'}, but MS is a diagnosis of exclusion. Figure 3 says to monitor for new changes while better explanations are worked up.`};
  else if(NB)V={...V,s2:'and a better explanation exists',why:V.why+' A better explanation is also present or not yet excluded.'};
  V.warn=warn;
  return {st,V,ok,tot:{wm,cvsP,prl,cvs6,gd:sum(DX_ALL,'gd'),nw:sum(DX_ALL,'nw'),kpos,kf,oct,csfPos:S.ocb||kpos}};
}
/* ---- drawing helpers (shared with 3.2) ---- */
function dxEllD(cx,cy,rx,ry,amp=0,fr=0,ph=0){let d='';for(let i=0;i<=96;i++){const a=i/96*Math.PI*2,m=1-amp*(1+Math.sin(fr*a+ph))/2;d+=(i?'L':'M')+f1(cx+Math.cos(a)*rx*m)+' '+f1(cy+Math.sin(a)*ry*m)}return d+'Z'}
/* an axial T2-FLAIR-style brain at the level of the lateral ventricles, local box 240 x 300 */
function dxAxial(){let g=`<rect width="240" height="300" rx="10" class="mri"/>`;
  g+=`<path d="${dxEllD(120,158,106,130)}" style="fill:none;stroke:var(--mri-gm);stroke-width:3;opacity:.45"/>`;
  g+=`<path d="${dxEllD(120,158,98,122,.05,17,.4)}" style="fill:var(--mri-gm)"/>`;
  g+=`<path d="${dxEllD(120,158,86,110,.12,17,.4)}" style="fill:var(--mri-wm)"/>`;
  g+=`<path d="M120 30V70M120 246V288" style="stroke:var(--mri-csf);stroke-width:4"/>`;
  const v='M113 108 C101 110 97 128 98 150 C99 170 96 188 104 202 L110 200 C106 186 111 168 112 150 C113 130 116 118 115 108 Z';
  g+=`<path d="${v}" style="fill:var(--mri-csf)"/><path d="${v}" transform="translate(240 0) scale(-1 1)" style="fill:var(--mri-csf)"/>`;
  return g}
/* a sagittal brain, brainstem, cerebellum and cervical cord, local box 200 x 392 */
function dxSagittal(){let g=`<rect width="200" height="392" rx="10" class="mri"/>`;
  const cer='M16 112 C12 56 62 16 110 20 C158 24 190 64 186 106 C184 132 170 146 150 148 L40 148 C24 146 18 132 16 112 Z';
  g+=`<path d="${cer}" style="fill:var(--mri-gm)"/><path d="${cer}" transform="translate(20 18) scale(.8)" style="fill:var(--mri-wm)"/>`;
  g+=`<path d="M52 100 C70 76 130 74 150 96 C130 88 72 88 56 104 Z" style="fill:var(--mri-csf)"/>`;
  g+=`<ellipse cx="122" cy="176" rx="36" ry="25" style="fill:var(--mri-gm)"/>`;
  for(let i=0;i<5;i++){const a=-.9+i*.45;g+=`<path d="M104 176 L${f1(104+Math.cos(a)*30)} ${f1(176+Math.sin(a)*20)}" style="stroke:var(--mri-wm);stroke-width:3;stroke-linecap:round"/>`}
  g+=`<path d="M70 136 C62 156 64 172 72 186 L72 214 L90 214 L90 186 C96 170 96 152 90 136 Z" style="fill:var(--mri-wm)"/>`;
  g+=`<path d="M90 160 L103 168 L90 178 Z" style="fill:var(--mri-csf)"/>`;
  g+=`<rect x="66" y="212" width="30" height="178" style="fill:var(--mri-csf)"/><rect x="72" y="208" width="18" height="182" rx="8" style="fill:var(--mri-wm)"/>`;
  for(let i=0;i<7;i++)g+=`<rect x="36" y="${222+i*24}" width="24" height="18" rx="4" style="fill:var(--mri-gm);opacity:.65"/>`;
  return g}
/* both eyes, optic nerves and chiasm seen from above, local box 150 x 104 */
function dxOrbits(){let g=`<rect width="150" height="104" rx="10" class="mri"/>`;
  [40,110].forEach(x=>{g+=`<circle cx="${x}" cy="38" r="17" style="fill:var(--mri-csf);stroke:var(--mri-gm);stroke-width:2"/><ellipse cx="${x}" cy="23" rx="7" ry="3" style="fill:var(--mri-gm)"/>`});
  g+=`<path d="M44 55 Q52 82 75 94 Q98 82 106 55" style="fill:none;stroke:var(--mri-wm);stroke-width:7;stroke-linecap:round"/>`;
  g+=`<path d="M75 94 L62 103 M75 94 L88 103" style="stroke:var(--mri-wm);stroke-width:6"/>`;
  return g}
/* one lesion with its flags; local coordinates; t drives the step-3 pulse and the follow-up scan */
function dxLes(x,y,r,rot,seed,f,t,grow){const sc=grow==null?1:grow;if(sc<=0)return'';const rr=r*sc;
  const newOn=ramp(t,.53,.6),showNew=!f.nw||newOn>0;let g='';
  if(f.nw&&newOn<1)g+=`<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(r*1.5)}" ry="${f1(r*1.1)}" transform="rotate(${rot} ${x} ${y})" style="fill:none;stroke:var(--mri-gm);stroke-width:1;stroke-dasharray:2 2;opacity:${f1(1-newOn)}"/>`;
  if(showNew){const k=f.nw?ease(newOn):1;
    g+=`<g transform="rotate(${rot} ${f1(x)} ${f1(y)})">${lesion(x,y,rr*k,seed,1)}`;
    if(f.cvs)g+=`<line x1="${f1(x-rr*1.05*k)}" x2="${f1(x+rr*1.05*k)}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:var(--mri-bg);stroke-width:1.4;stroke-linecap:round"/>`;
    if(f.prl)g+=`<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(rr*1.1*k)}" ry="${f1(rr*.78*k)}" style="fill:none;stroke:var(--mri-bg);stroke-width:1.8"/>`;
    g+='</g>';
    if(f.gd){const p=bump(t,.5,.75),R=rr*(1.55+.5*p*(.6+.4*Math.sin(t*90)));g+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(R*k)}" style="fill:none;stroke:var(--gd);stroke-width:${f1(1.6+p)}"/>`}
    if(f.nw)g+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(rr*1.9*k)}" style="fill:none;stroke:var(--pulse);stroke-width:1.4;stroke-dasharray:3 2"/>`;
  }
  return g}
const DX_LAY={
 w:{vb:'720 414',ax:{x:8,y:8,k:1},or:{x:8,y:316,k:130/150},csf:{x:146,y:316,w:102,h:90},sg:{x:256,y:8,k:.9},tot:{x:258,y:380,one:1},lad:{x:444,y:8,w:268,bh:70,gap:8,vh:64}},
 n:{vb:'400 1240',ax:{x:32,y:8,k:1.4},sg:{x:8,y:436,k:1},or:{x:216,y:436,k:176/150},csf:{x:216,y:566,w:176,h:104},tot:{x:216,y:694},lad:{x:8,y:836,w:384,bh:70,gap:8,vh:66}}
};
inits.dx=()=>{
  const svg=$('#dxSvg'),rg=$('#dxT');let S=dxBlank();const grow={};let R17,R24,R;
  svg.innerHTML='<g id="dxGA"></g><g id="dxGH"></g>';const gA=$('#dxGA'),gH=$('#dxGH');let hitKey='';
  const site=id=>DX_SITES.find(x=>x.id===id);
  const tf=P=>`translate(${P.x} ${P.y}) scale(${f1(P.k*1000)/1000})`;
  function flags(k,i){const o=S.L[k],n=o.n;return{gd:i<o.gd,cvs:i<o.cvs,prl:i>=o.gd&&i<o.gd+o.prl,nw:i>=n-o.nw}}
  function lesionsOf(k,t){const o=S.L[k];let g='';const gr=grow[k]?ease(clamp((performance.now()-grow[k])/520)):1;
    for(let i=0;i<o.n;i++){const [x,y,r,rot]=DX_POS[k][i];g+=dxLes(x,y,r,rot,i*7+k.charCodeAt(0),flags(k,i),t,gr)}return g}
  function counted(k){if(!S.L[k].n&&!(k==='on'&&R.tot.oct))return null;if(k==='dw')return false;
    if(R===R17||S.ver==='2017')return k!=='on';return true}
  function mark(k,t){if(t<.3)return'';const c=counted(k);return c==null?'':(c?' ✓':' ✗')}
  function draw(t){
    const N=vb(svg,DX_LAY.w.vb,DX_LAY.n.vb),Y=N?DX_LAY.n:DX_LAY.w;let s='';
    const sweep=t>=.25&&t<.5?ramp(t,.25,.47):-1;
    /* --- axial --- */
    const A=Y.ax,P=(x,y)=>[A.x+x*A.k,A.y+y*A.k];
    s+=`<g transform="${tf(A)}">${dxAxial()}${['dw','jc','pv'].map(k=>lesionsOf(k,t)).join('')}`;
    if(sweep>=0)s+=`<rect x="4" y="${f1(sweep*292)}" width="232" height="8" style="fill:var(--pulse);opacity:.28"/><line x1="4" x2="236" y1="${f1(sweep*292+4)}" y2="${f1(sweep*292+4)}" style="stroke:var(--pulse);stroke-width:1.2"/>`;
    s+=`</g>`;
    {const [x0,y0]=P(0,0),[x1,y1]=P(240,300);
      const lead=(tx,ty,k)=>{const [lx,ly]=P(...k);return `<line x1="${f1(tx)}" y1="${f1(ty)}" x2="${f1(lx)}" y2="${f1(ly)}" style="stroke:var(--mri-gm);stroke-width:1;stroke-dasharray:2 3"/>`};
      s+=lead(x0+40,y0+20,[47,116])+lead(x1-40,y0+20,[150,121])+lead(x0+30,y1-22,[80,236]);
      s+=`<text x="${f1(x0+8)}" y="${f1(y0+15)}" class="t-mri">juxtacortical${mark('jc',t)}</text>`;
      s+=`<text x="${f1(x1-8)}" y="${f1(y0+15)}" class="t-mri t-end">periventricular${mark('pv',t)}</text>`;
      s+=`<text x="${f1(x0+8)}" y="${f1(y1-9)}" class="t-mri">deep WM · not DIS</text>`;
      s+=`<text x="${f1(x1-8)}" y="${f1(y1-9)}" class="t-mri t-end">AXIAL</text>`}
    /* --- sagittal --- */
    const G=Y.sg,Q=(x,y)=>[G.x+x*G.k,G.y+y*G.k];
    s+=`<g transform="${tf(G)}">${dxSagittal()}${['it','sc'].map(k=>lesionsOf(k,t)).join('')}`;
    if(sweep>=0)s+=`<rect x="4" y="${f1(sweep*384)}" width="192" height="8" style="fill:var(--pulse);opacity:.28"/>`;
    s+=`</g>`;
    {const [x0,y0]=Q(0,0);s+=`<text x="${f1(x0+8)}" y="${f1(y0+15)}" class="t-mri">SAGITTAL</text>`;
      [['C2',0],['C4',2],['C6',4],['T1',6]].forEach(([l,i])=>{const [lx,ly]=Q(8,235+i*24);s+=`<text x="${f1(lx)}" y="${f1(ly)}" class="t-mri">${l}</text>`});
      const [ix,iy]=Q(100,218),[cx,cy]=Q(100,300);
      s+=`<text x="${f1(ix)}" y="${f1(iy)}" class="t-mri">infratentorial</text><text x="${f1(ix)}" y="${f1(iy+13)}" class="t-mri">${mark('it',t).trim()}</text>`;
      s+=`<text x="${f1(cx)}" y="${f1(cy)}" class="t-mri">spinal cord</text><text x="${f1(cx)}" y="${f1(cy+13)}" class="t-mri">${mark('sc',t).trim()}</text>`;
      const [a1,b1]=Q(118,194),[a2,b2]=Q(104,208);s+=`<line x1="${f1(a1)}" y1="${f1(b1)}" x2="${f1(a2)}" y2="${f1(b2)}" style="stroke:var(--mri-gm);stroke-dasharray:2 3"/>`}
    /* --- orbits --- */
    const O=Y.or;s+=`<g transform="${tf(O)}">${dxOrbits()}${lesionsOf('on',t)}${S.ver==='2024'&&(R.tot.oct||S.vep)?`<path d="M44 55 Q52 82 75 94 Q98 82 106 55" style="fill:none;stroke:var(--pulse);stroke-width:13;stroke-linecap:round;stroke-dasharray:3 4;opacity:${f1(.35+.3*bump(t,.25,.5))}"/>`:''}</g>`;
    {s+=`<text x="${O.x+7}" y="${O.y+14}" class="t-mri">OPTIC NERVES${mark('on',t)}</text>`;
      }
    /* --- CSF gel --- */
    {const C=Y.csf,p=ramp(t,.52,.64);s+=`<rect x="${C.x}" y="${C.y}" width="${C.w}" height="${C.h}" rx="10" style="fill:var(--panel-2);stroke:var(--line)"/>`;
      s+=`<text x="${C.x+8}" y="${C.y+15}" class="t-xs">CSF · IEF</text>`;
      const lx=C.x+(N?52:38),lw=C.w-(N?60:44),ly=[C.y+(N?26:22),C.y+(N?46:38)];
      s+=`<text x="${C.x+8}" y="${ly[0]+10}" class="t-xs">CSF</text><text x="${C.x+8}" y="${ly[1]+10}" class="t-xs">${N?'serum':'ser.'}</text>`;
      ly.forEach(y=>{s+=`<rect x="${lx}" y="${y}" width="${lw}" height="13" rx="3" style="fill:var(--panel);stroke:var(--line)"/>`});
      for(let i=0;i<5;i++){const bx=lx+lw*(.2+i*.15);s+=`<rect x="${f1(bx)}" y="${ly[0]+2}" width="2" height="9" style="fill:var(--muted);opacity:.25"/><rect x="${f1(bx)}" y="${ly[1]+2}" width="2" height="9" style="fill:var(--muted);opacity:.25"/>`;
        if(S.ocb&&i<4)s+=`<rect x="${f1(bx+lw*.07)}" y="${ly[0]+1}" width="2.6" height="${f1(11*clamp(p*5-i))}" style="fill:var(--bcell)"/>`}
      const ty=C.y+C.h-(N?26:24);const kfT=R.tot.kf==null?'not done':f1(R.tot.kf)+(R.tot.kpos?' ≥6.1':' <6.1');
      s+=`<text x="${C.x+8}" y="${ty}" class="t-xs" style="fill:${S.ocb?'var(--ink)':'var(--muted)'}">OCB: ${S.ocb?'positive':(N?'negative or not done':'no')}</text>`;
      s+=`<text x="${C.x+8}" y="${ty+14}" class="t-xs" style="fill:${R.tot.kpos?'var(--ink)':'var(--muted)'}">κ-FLC: ${kfT}</text>`}
    /* --- totals --- */
    {const T=Y.tot,o=R.tot;
      if(T.one)s+=`<text x="${T.x}" y="${T.y}" class="t-xs">WM lesions ${o.wm} · CVS+ ${o.cvsP} · PRL ${o.prl}</text><text x="${T.x}" y="${T.y+15}" class="t-xs">Gd+ ${o.gd} · new on follow-up ${o.nw}</text>`;
      else[`White-matter lesions: ${o.wm}`,`Central vein sign: ${o.cvsP}`,`Paramagnetic rim: ${o.prl}`,`Enhancing (Gd+): ${o.gd}`,`New on follow-up: ${o.nw}`,`Select-6 CVS: ${o.cvs6?'yes':'no'}`].forEach((l,i)=>{s+=`<text x="${T.x}" y="${T.y+i*19}" class="t-sm">${l}</text>`})}
    /* --- the ladder --- */
    {const D=Y.lad,F=[0,.25,.5,.75],TT=['Typical attack?','Space (DIS)','Time (DIT) or CSF','No better explanation'];
      const IC={ok:['✓','var(--good)','var(--good-soft)'],no:['✗','var(--bad)','var(--bad-soft)'],skip:['–','var(--muted)','var(--panel-2)'],warn:['?','var(--warn)','var(--warn-soft)']};
      s+=`<text x="${D.x}" y="${D.y+8}" class="t-xs">McDONALD ${S.ver} · ${S.pres==='incid'?(S.ver==='2024'?'FIGURE 2':'INCIDENTAL'):(S.ver==='2024'?'FIGURE 3':(S.pres==='prog'?'PPMS':'ATTACK TABLE'))}</text>`;
      R.st.forEach((q,i)=>{const y=D.y+16+i*(D.bh+D.gap),p=ramp(t,F[i],F[i]+.12),ic=IC[q.st],on=t>=F[i];
        s+=`<rect x="${D.x}" y="${y}" width="${D.w}" height="${D.bh}" rx="10" style="fill:var(--panel);stroke:${on?ic[1]:'var(--line)'};stroke-width:${on?1.6:1};${on?'':'stroke-dasharray:4 3'}"/>`;
        if(p>0)s+=`<rect x="${D.x}" y="${y}" width="${f1(D.w*p)}" height="${D.bh}" rx="10" style="fill:${ic[2]};opacity:.55"/>`;
        s+=`<circle cx="${D.x+18}" cy="${y+18}" r="11" style="fill:${on?ic[2]:'var(--panel-2)'};stroke:${on?ic[1]:'var(--line)'}"/><text x="${D.x+18}" y="${y+22.5}" class="t-lbl t-mid" style="fill:${on?ic[1]:'var(--muted)'}">${on?ic[0]:i+1}</text>`;
        s+=`<text x="${D.x+36}" y="${y+23}" class="t-lbl" style="fill:${on?'var(--ink)':'var(--muted)'}">${TT[i]}</text>`;
        if(on){const o=f1(clamp(p*1.6));s+=`<text x="${D.x+36}" y="${y+43}" class="t-sm" style="fill:var(--ink);opacity:${o}">${q.a}</text><text x="${D.x+36}" y="${y+60}" class="t-sm" style="opacity:${o}">${q.b}</text>`}
        else s+=`<text x="${D.x+36}" y="${y+46}" class="t-sm">waiting…</text>`;
        if(i<3)s+=`<path d="M${D.x+18} ${y+D.bh+1} v${D.gap-2}" style="stroke:var(--line);stroke-width:2"/>`});
      const vy=D.y+16+4*(D.bh+D.gap)+2,pv=ramp(t,.88,.95),V=R.V,vc={yes:['var(--good)','var(--good-soft)'],no:['var(--bad)','var(--bad-soft)'],maybe:['var(--warn)','var(--warn-soft)']}[V.cls];
      s+=`<rect x="${D.x}" y="${vy}" width="${D.w}" height="${D.vh}" rx="12" style="fill:${pv>0?vc[1]:'var(--panel)'};stroke:${pv>0?vc[0]:'var(--line)'};stroke-width:${pv>0?2:1};${pv>0?'':'stroke-dasharray:4 3'}"/>`;
      if(pv>0)s+=`<text x="${D.x+14}" y="${vy+27}" class="t-big" style="fill:${vc[0]};opacity:${f1(pv)}">${V.s1}</text><text x="${D.x+14}" y="${vy+48}" class="t-sm" style="fill:var(--ink);opacity:${f1(pv)}">${V.s2}</text>`;
      else s+=`<text x="${D.x+14}" y="${vy+37}" class="t-sm">verdict appears after step 4</text>`}
    gA.innerHTML=s;drawHit(N,Y);
    const p=phaseOf(DX_STEPS,t);setSt(p);note(p);
  }
  function drawHit(N,Y){const key=(N?'n':'w')+DX_ALL.map(k=>S.L[k].n).join(',');if(key===hitKey)return;hitKey=key;
    const fo=document.activeElement&&document.activeElement.closest&&document.activeElement.closest('[data-site]');const fk=fo&&svg.contains(fo)?fo.dataset.site:null;
    const g=(k,shape)=>{const o=S.L[k],X=site(k);return `<g data-site="${k}" tabindex="0" role="button" aria-pressed="${o.n>0}" aria-label="${X.n}: ${o.n} lesion${o.n===1?'':'s'}${X.dis?'':', not a dissemination-in-space site'}. Press to ${o.n?'remove':'place'} lesions.">${shape}</g>`};
    const ring=`M24 158 a96 120 0 1 0 192 0 a96 120 0 1 0 -192 0 Z M46 158 a74 96 0 1 0 148 0 a74 96 0 1 0 -148 0 Z`;
    let h=`<g transform="${tf(Y.ax)}">${g('dw',`<ellipse class="dx-hl" cx="120" cy="158" rx="82" ry="106"/>`)}${g('jc',`<path class="dx-hl" fill-rule="evenodd" d="${ring}"/>`)}${g('pv',`<ellipse class="dx-hl" cx="120" cy="158" rx="40" ry="58"/>`)}</g>`;
    h+=`<g transform="${tf(Y.sg)}">${g('it',`<path class="dx-hl" d="M66 136 C58 156 60 172 68 188 L94 188 C120 204 160 200 160 176 C160 150 120 146 96 150 L94 136 Z"/>`)}${g('sc',`<rect class="dx-hl" x="60" y="206" width="42" height="182" rx="8"/>`)}</g>`;
    h+=`<g transform="${tf(Y.or)}">${g('on',`<ellipse class="dx-hl" cx="75" cy="74" rx="58" ry="28"/>`)}</g>`;
    gH.innerHTML=h;if(fk){const el=gH.querySelector(`[data-site="${fk}"]`);el&&el.focus()}}
  function note(p){const P=DX_STEPS[p],V=R.V,q=R.st[p];
    $('#dxNote').innerHTML=`<div class="verdict ${V.cls}"><span class="kicker">McDonald ${S.ver} · live verdict</span><strong>${V.t}</strong><span>${V.why}</span>${V.warn.map(w=>`<span class="dx-w">${w}</span>`).join('')}</div>`
      +noteHTML({k:P.k,t:P.t,txt:P.txt+`</p><p><b>For this case:</b> ${q.long}`,pt:P.pt,hook:P.hook})}
  /* ---- the inputs ---- */
  function syncUI(){
    $$('[data-ver]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.ver===S.ver));
    $$('[data-pres]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.pres===S.pres));
    $$('[data-att]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.att===S.att));
    $$('[data-obj]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.obj===S.obj));
    $$('[data-age]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.age===S.age));
    $('#dxAttFs').disabled=S.pres!=='attack';$('#dxClin2').disabled=S.att<2;$('#dxHist').disabled=S.att<2;
    $('#dxProg').disabled=S.pres!=='prog';$('#dxAdem').disabled=!(S.age==='u12'||S.age==='u18');
    [['dxHist','hist'],['dxClin2','clin2'],['dxProg','prog'],['dxOcb','ocb'],['dxVep','vep'],['dxVasc','vasc'],['dxAdem','adem'],['dxBetter','better']].forEach(([id,k])=>{$('#'+id).checked=!!S[k]});
    [['dxKflc','kflc'],['dxRnfl','rnfl'],['dxGcipl','gcipl']].forEach(([id,k])=>{if($('#'+id).value!==String(S[k]))$('#'+id).value=S[k]});
  }
  function siteUI(){
    $('#dxSiteBtns').innerHTML=DX_SITES.map(X=>`<button class="btn" data-sb="${X.id}" aria-pressed="${S.L[X.id].n>0}">${X.n}${S.L[X.id].n?' · '+S.L[X.id].n:''}</button>`).join('');
    const X=site(S.sel),o=S.L[S.sel];if($('#dxSel').value!==S.sel)$('#dxSel').value=S.sel;
    const rows=[['n','Lesions here',X.max],['gd','of which enhance (Gd+)',o.n],['nw','of which are new on the follow-up scan',o.n]];
    if(X.brain)rows.push(['cvs','of which show a central vein',o.n],['prl','of which have a paramagnetic rim (non-enhancing)',o.n-o.gd]);
    $('#dxDetRows').innerHTML=rows.map(([f,l,mx])=>`<div class="dx-row"><span>${l}</span><span class="dx-sp"><button data-f="${f}" data-d="-1" aria-label="Fewer: ${l}" ${o[f]<=0?'disabled':''}>−</button><output aria-live="polite">${o[f]}</output><button data-f="${f}" data-d="1" aria-label="More: ${l}" ${o[f]>=mx?'disabled':''}>+</button></span></div>`).join('')
      +(X.brain?'':`<p class="dx-def">${S.sel==='on'?'Central vein and rim signs are assessed in brain white matter, not the optic nerve.':'Central vein and rim signs are assessed in brain white matter, so they are not offered for the cord.'}</p>`);
    const T=R24.tot;$('#dxCvsO').innerHTML=`<b>${T.cvsP}</b>&nbsp;of ${T.wm} white-matter lesions show a central vein → Select-6 <b>${T.cvs6?'met':'not met'}</b> · <b>${T.prl}</b>&nbsp;paramagnetic rim lesion${T.prl===1?'':'s'} → PRL <b>${T.prl>=1?'met':'not met'}</b>`;
    const kf=dxNum(S.kflc);$('#dxKflcO').textContent=kf==null?'':(kf>=6.1?'positive (≥6.1)':'below 6.1');
    $('#dxOnO').textContent=R24.tot.oct||S.vep||S.L.on.n?'Optic nerve currently counts as a 2024 site.':'';
  }
  function trace(){const one=(ver,Rv,ttl)=>{const V=Rv.V,cls={ok:'ok',no:'no',skip:'skip',warn:'warn'};
      return `<div class="card${S.ver===ver?' on':''}"><span class="kicker">${ttl}</span><h4>${V.t}</h4><span><span class="dx-pill ${V.cls}">${{yes:'met',no:'not met',maybe:'not yet / caution'}[V.cls]}</span></span><ol>${Rv.st.map((q,i)=>`<li><i class="${cls[q.st]}" aria-label="${{ok:'met',no:'not met',skip:'not applied',warn:'judgement'}[q.st]}">${{ok:'✓',no:'✗',skip:'–',warn:'?'}[q.st]}</i><span><b>${DX_STEPS[i].t.replace(/\?$/,'')}.</b> ${q.long}</span></li>`).join('')}</ol></div>`};
    $('#dxTrace').innerHTML=one('2017',R17,'2017 McDonald (Thompson 2018)')+one('2024',R24,'2024 McDonald (Montalban 2025)')}
  function update(){R17=dxEval(S,'2017');R24=dxEval(S,'2024');R=S.ver==='2017'?R17:R24;syncUI();siteUI();trace();hitKey='';draw(+rg.value)}
  function bumpGrow(k){grow[k]=performance.now();animate(540,()=>draw(+rg.value),()=>{delete grow[k];draw(+rg.value)})}
  function toggle(k){const o=S.L[k];if(o.n){S.L[k]={n:0,gd:0,nw:0,cvs:0,prl:0}}else{o.n=site(k).def;bumpGrow(k)}S.sel=k;update()}
  $('#dxSel').innerHTML=DX_SITES.map(X=>`<option value="${X.id}">${X.n}${X.dis?'':' (not a DIS site)'}</option>`).join('');
  $('#dxSel').addEventListener('change',e=>{S.sel=e.target.value;update()});
  $('#dxDetRows').addEventListener('click',e=>{const b=e.target.closest('[data-f]');if(!b||b.disabled)return;const o=S.L[S.sel],f=b.dataset.f,X=site(S.sel);
    const before=o.n;o[f]=Math.max(0,o[f]+ +b.dataset.d);
    o.n=Math.min(X.max,o.n);['gd','nw','cvs'].forEach(q=>o[q]=Math.min(o[q],o.n));o.prl=Math.min(o.prl,o.n-o.gd);
    if(!X.brain){o.cvs=0;o.prl=0}
    if(o.n>before)bumpGrow(S.sel);update();
    const again=$(`#dxDetRows [data-f="${f}"][data-d="${b.dataset.d}"]`);again&&!again.disabled&&again.focus()});
  $('#dxSiteBtns').addEventListener('click',e=>{const b=e.target.closest('[data-sb]');if(!b)return;const k=b.dataset.sb;toggle(k);const nb=$(`#dxSiteBtns [data-sb="${k}"]`);nb&&nb.focus()});
  gH.addEventListener('click',e=>{const g=e.target.closest('[data-site]');if(g)toggle(g.dataset.site)});
  gH.addEventListener('keydown',e=>{const g=e.target.closest('[data-site]');if(g&&(e.key==='Enter'||e.key===' ')){e.preventDefault();toggle(g.dataset.site)}});
  const pick=(attr,key,num)=>$$(`[${attr}]`).forEach(b=>b.addEventListener('click',()=>{S[key]=num?+b.getAttribute(attr):b.getAttribute(attr);if(key==='att'&&S.att<2){S.hist=false;S.clin2=false}update()}));
  pick('data-ver','ver');pick('data-pres','pres');pick('data-att','att',1);pick('data-obj','obj',1);pick('data-age','age');
  [['dxHist','hist'],['dxClin2','clin2'],['dxProg','prog'],['dxOcb','ocb'],['dxVep','vep'],['dxVasc','vasc'],['dxAdem','adem'],['dxBetter','better']].forEach(([id,k])=>$('#'+id).addEventListener('change',e=>{S[k]=e.target.checked;update()}));
  [['dxKflc','kflc'],['dxRnfl','rnfl'],['dxGcipl','gcipl']].forEach(([id,k])=>$('#'+id).addEventListener('input',e=>{S[k]=e.target.value;update()}));
  $$('[data-dxp]').forEach(b=>b.addEventListener('click',()=>{const P=DX_PRESET[b.dataset.dxp],ver=S.ver;S=dxBlank();S.ver=ver;
    Object.keys(P).forEach(k=>{if(k!=='L')S[k]=P[k]});Object.keys(P.L).forEach(k=>Object.assign(S.L[k],P.L[k]));
    const ks=Object.keys(P.L);ks.forEach(k=>grow[k]=performance.now());
    stop();rg.value=0;update();animate(560,()=>draw(+rg.value),()=>{ks.forEach(k=>delete grow[k]);draw(+rg.value)});if(b.dataset.dxp!=='clr')$('#dxPlay').click()}));
  const stop=playWire(rg,$('#dxPlay'),draw,15000,'Replay','dx');
  const setSt=stepWire($('#dxSteps'),DX_STEPS,rg,draw,stop);
  /* performance cards */
  const bars=rows=>`<div class="dx-bars">${rows.map(r=>r.h?`<span class="h">${r.h}</span>`:`<span>${r.l}</span><i><b style="width:${r.v}%;background:${r.c||'var(--brand)'}"></b></i><span>${r.t||r.v+'%'}</span>`).join('')}</div>`;
  const C=(tag,h,body,b)=>`<div class="card"><span class="ev ${tag==='e'?'est':'early'}">${tag==='e'?'Established':'Early evidence'}</span><h4>${h}</h4>${b?bars(b):''}<p>${body}</p></div>`;
  $('#dxPerf').innerHTML=[
   C('e','2017 vs 2010 in typical CIS',`229 Dutch patients, mean follow-up 65.3 months, against clinically definite MS. 54% met 2017 at baseline vs 26% for 2010, but 33% of those diagnosed under 2017 and followed ≥5 years had no second attack [[vanderVuurstdeVries2018]].`,[{h:'Sensitivity'},{l:'2017',v:68},{l:'2010',v:36,c:'var(--muted)'},{h:'Specificity'},{l:'2017',v:61,c:'var(--gold)'},{l:'2010',v:85,c:'var(--muted)'}]),
   C('e','2017 vs 2010 across Europe',`785 people with CIS in 9 MAGNIMS centres, DIS plus DIT at 36 months. AUC 0.61 vs 0.63. Median time to diagnosis: 3.2 months (2017), 13.0 (2010), 58.5 for clinically definite MS [[Filippi2022]].`,[{h:'Sensitivity'},{l:'2017',v:83},{l:'2010',v:66,c:'var(--muted)'},{h:'Specificity'},{l:'2017',v:39,c:'var(--gold)'},{l:'2010',v:60,c:'var(--muted)'}]),
   C('x','2024 vs 2017 in a London clinic',`274 people with suspected MS: 2024 diagnosed 220 at the first workup vs 172 under 2017, median 40 vs 84 days. Against a 2017 diagnosis at follow-up (mean 15.3 months): accuracy 83.6%. Extra diagnoses came from RIS or non-specific symptoms (23), ≥4 regions (15) and the optic nerve (10) [[Brownlee2026]].`,[{l:'sensitivity',v:92.6},{l:'specificity',v:57.8,c:'var(--gold)'}]),
   C('e','Oligoclonal bands',`Meta-analysis of 71 articles: OCB in 87.7% of 12,253 people with MS and 68.6% of 2,685 with CIS. OCB-positive CIS had an odds ratio of 9.88 for conversion to MS [[Dobson2013]].`,[{l:'MS',v:87.7},{l:'CIS',v:68.6}]),
   C('e','κ-FLC index vs OCB',`Meta-analysis of 32 studies: no significant difference in accuracy; the discriminating cut-off was 6.1 [[Hegen2023]]. Concordance between the two is close to 90% [[Deisenhammer2025]].`,[{h:'κ-FLC index'},{l:'sens',v:88},{l:'spec',v:89,c:'var(--gold)'},{h:'OCB'},{l:'sens',v:85,c:'var(--muted)'},{l:'spec',v:92,c:'var(--muted)'}]),
   C('e','Central vein sign',`1,051 people in 14 centres: the 40% CVS rule had accuracy 81.5%; CVS AUC 0.89 vs 0.77 for cortical lesions [[Cagol2024]]. <span class="ev early">Early evidence</span> In a pilot, Select-6 had sensitivity 0.71 and specificity 0.86; Select-3, 0.83 and 0.48 [[Toljan2024]].`,[{l:'sens',v:78.7},{l:'spec',v:86,c:'var(--gold)',t:'86.0%'}]),
   C('e','Paramagnetic rim lesions',`In 254 MS, 91 mimics and 217 older controls, ≥1 PRL was almost never seen without MS, but most people with MS had none [[Meaton2022]]. In 438 people, PRLs were seen in 52% with MS vs 7% without [[Maggi2020]].`,[{l:'spec',v:99.7,c:'var(--gold)'},{l:'sens',v:24,t:'24.0%'}]),
   C('e','Misdiagnosis',`A 2024 meta-analysis found MS misdiagnosis in 5%–41% across studies; pooled 15% (95% CI 9–26%), and women were 2.1 times more likely to be misdiagnosed [[Zurrer2024]]. See The differential for the usual mimics.`,[{l:'pooled',v:15,c:'var(--bad)'}])
  ].join('');
  redraws.dx=(prev=>()=>{prev&&prev();hitKey='';draw(+rg.value)})(redraws.dx);
  update();
};
