(()=>{
/* The runtime every companion shares (tools/core/, spliced in by tools/build.py for every
   companion and language). The script is these parts and the companion's own js files, in file-name
   order: 00-core.js (here: helpers), the companion's 01-config.js (PREFIX, MODS, GROUPS), its
   02-draw.js (its drawing kit, if any), 03-router.js (routing, nav, theme, the player),
   the companion's module scripts, and 99-boot.js. */
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const store={get(k,d){try{const v=localStorage.getItem(PREFIX+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(PREFIX+k,JSON.stringify(v))}catch(e){}}};
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
function marker(id,color='var(--muted)',size=7){return `<marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="${size}" markerHeight="${size}" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:${color}"/></marker>`}
const SOURCES=[{"key": "AANEM2020Benson", "text": "Newswise. Estelle Benson receives AANEM 2020 Public Recognition Award. Web page, https://www.newswise.com/articles/estelle-benson-receives-aanem-2020-public-recognition-award, states she is co-founder and acted after her husband's GBS diagnosis in 1979. (unverified: press release, no bibliographic record; read 2026-11-09)", "link": "https://www.newswise.com/articles/estelle-benson-receives-aanem-2020-public-recognition-award,", "areas": ["A"], "unverified": true}, {"key": "Abrahao2024", "text": "Abrahao A, Tenório PHM, Rodrigues M, Mello M, Nascimento OJM. Guillain-Barré syndrome and checkpoint inhibitor therapy: insights from pharmacovigilance data. BMJ Neurol Open. 2024;6(1):e000544. PMID 38501128; PMCID PMC10946360; doi:10.1136/bmjno-2023-000544.", "link": "https://doi.org/10.1136/bmjno-2023-000544", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "AbuRumeileh2021", "text": "Abu-Rumeileh S, Abdelhak A, Foschi M, Tumani H, Otto M. Guillain-Barré syndrome spectrum associated with COVID-19: an up-to-date systematic review of 73 cases. J Neurol. 2021;268(4):1133-1170. PMID 32840686; PMCID PMC7445716; doi:10.1007/s00415-020-10124-x.", "link": "https://doi.org/10.1007/s00415-020-10124-x", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "AceroGarces2024", "text": "Acero-Garces D, Zuluaga-Lotero D, Ortiz-Muñoz D, Arango GP, Moyano M, Vargas-Manotas J, et al. Long-term outcomes of patients affected by Guillain-Barré syndrome in Colombia after the Zika virus epidemic. J Neurol Sci. 2024;463:123140. PMID 39047509; PMCID PMC11338696; doi:10.1016/j.jns.2024.123140.", "link": "https://doi.org/10.1016/j.jns.2024.123140", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Afifi1994", "text": "Afifi AK. The landry-guillain-barré strohl syndrome 1859 to 1992 a historical perspective. J Family Community Med. 1994;1(1):30-4. PMID 23008532; PMCID PMC3437179.", "link": "https://pubmed.ncbi.nlm.nih.gov/23008532/", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Alam1998", "text": "Alam TA, Chaudhry V, Cornblath DR. Electrophysiological studies in the Guillain-Barré syndrome: distinguishing subtypes by published criteria. Muscle Nerve. 1998;21(10):1275-9. PMID 9736055; doi:10.1002/(sici)1097-4598(199810)21:10<1275::aid-mus5>3.0.co;2-8.", "link": "https://doi.org/10.1002/(sici)1097-4598(199810)21:10<1275::aid-mus5>3.0.co", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Albers2004", "text": "Albers JW, Fink JK. Porphyric neuropathy. Muscle Nerve. 2004;30(4):410-22. PMID 15372536; doi:10.1002/mus.20137.", "link": "https://doi.org/10.1002/mus.20137", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Alberti2011", "text": "Albertí MA, Alentorn A, Martínez-Yelamos S, Martínez-Matos JA, Povedano M, Montero J, et al. Very early electrodiagnostic findings in Guillain-Barré syndrome. J Peripher Nerv Syst. 2011;16(2):136-42. PMID 21692913; doi:10.1111/j.1529-8027.2011.00338.x.", "link": "https://doi.org/10.1111/j.1529-8027.2011.00338.x", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Alessandro2022", "text": "Alessandro L, Castiglione JI, Brand P, Bruno V, Barroso F. Treatment-related fluctuations in Guillain-Barré syndrome​: clinical features and predictors of recurrence. Arq Neuropsiquiatr. 2022;80(5):516-522. PMID 35195232; PMCID PMC9238334; doi:10.1590/0004-282X-ANP-2021-0226.", "link": "https://doi.org/10.1590/0004-282x-anp-2021-0226", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "AlHakem2023", "text": "Al-Hakem H, Doets AY, Stino AM, Zivkovic SA, Andersen H, Willison HJ, et al. CSF Findings in Relation to Clinical Characteristics, Subtype, and Disease Course in Patients With Guillain-Barré Syndrome. Neurology. 2023;100(23):e2386-e2397. PMID 37076309; PMCID PMC10256127; doi:10.1212/WNL.0000000000207282.", "link": "https://doi.org/10.1212/wnl.0000000000207282", "areas": ["C", "D"], "unverified": false, "validated": "PubMed"}, {"key": "Ali2024", "text": "Ali T, Hkima Abou Fakher F, Alawir M, Allababidi A, Sheikh Hasan A. Management of severe pediatric Guillain-Barré syndrome in a low-income country: efficacy and safety of therapeutic plasma exchange in pediatric patients: a retrospective study. BMC Pediatr. 2024;24(1):818. PMID 39695474; PMCID PMC11657456; doi:10.1186/s12887-024-05298-6.", "link": "https://doi.org/10.1186/s12887-024-05298-6", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Alnaeem2025", "text": "Alnaeem MM, Al-Qudimat AR, Talafha D, Alqaisi O. Assessing the impact of a second IVIG dose on patients with Guillain-Barré Syndrome: A synthesis without meta-analysis (SWiM). Qatar Med J. 2025;2025(3):88. PMID 41030879; PMCID PMC12477822; doi:10.5339/qmj.2025.88.", "link": "https://doi.org/10.5339/qmj.2025.88", "areas": ["I"], "unverified": false, "validated": "PubMed"}, {"key": "Alshekhlee2008", "text": "Alshekhlee A, Hussain Z, Sultan B, Katirji B. Guillain-Barré syndrome: incidence and mortality rates in US hospitals. Neurology. 2008;70(18):1608-13. PMID 18443311; doi:10.1212/01.wnl.0000310983.38724.d4.", "link": "https://doi.org/10.1212/01.wnl.0000310983.38724.d4", "areas": ["A", "F", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Alshekhlee2008Immuno", "text": "Alshekhlee A, Hussain Z, Sultan B, Katirji B. Immunotherapy for Guillain-Barré syndrome in the US hospitals. J Clin Neuromuscul Dis. 2008;10(1):4-10. PMID 18772694; doi:10.1097/CND.0b013e318182b5ce.", "link": "https://doi.org/10.1097/cnd.0b013e318182b5ce", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Altmann2020", "text": "Altmann P, De Simoni D, Kaider A, Ludwig B, Rath J, Leutmezer F, et al. Increased serum neurofilament light chain concentration indicates poor outcome in Guillain-Barré syndrome. J Neuroinflammation. 2020;17(1):86. PMID 32183837; PMCID PMC7079539; doi:10.1186/s12974-020-01737-0.", "link": "https://doi.org/10.1186/s12974-020-01737-0", "areas": ["D", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Amatya2013", "text": "Amatya B, Khan F, Whishaw M, Pallant JF. Guillain-Barré syndrome: prevalence and long-term factors impacting bladder function in an Australian community cohort. J Clin Neurol. 2013;9(3):144-50. PMID 23894237; PMCID PMC3722465; doi:10.3988/jcn.2013.9.3.144.", "link": "https://doi.org/10.3988/jcn.2013.9.3.144", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Anandan2017", "text": "Anandan C, Khuder SA, Koffman BM. Prevalence of autonomic dysfunction in hospitalized patients with Guillain-Barré syndrome. Muscle Nerve. 2017;56(2):331-333. PMID 28039863; doi:10.1002/mus.25551.", "link": "https://doi.org/10.1002/mus.25551", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Anderson2005", "text": "Anderson KE, Bloomer JR, Bonkovsky HL, et al. Recommendations for the diagnosis and treatment of the acute porphyrias. Ann Intern Med. 2005;142(6):439-450. PMID 15767622. doi:10.7326/0003-4819-142-6-200503150-00010.", "link": "https://doi.org/10.7326/0003-4819-142-6-200503150-00010", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Andrews2023", "text": "Andrews AW, Bohannon RW. Improvements and Residual Limitations Experienced by Patients With Guillain-Barré Syndrome Undergoing Inpatient Rehabilitation. Am J Phys Med Rehabil. 2023;102(6):541-544. PMID 36897800; doi:10.1097/PHM.0000000000002230.", "link": "https://doi.org/10.1097/phm.0000000000002230", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Arends2024", "text": "Arends S, Drenthen J, de Koning L, van den Bergh P, Hadden RDM, Kuwabara S, et al. Electrodiagnostic subtyping in Guillain-Barré syndrome patients in the International Guillain-Barré Outcome Study. Eur J Neurol. 2024;31(9):e16335. PMID 38965709; PMCID PMC11295174; doi:10.1111/ene.16335.", "link": "https://doi.org/10.1111/ene.16335", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Arends2026", "text": "Arends S, de Koning L, Drenthen J, Zhu M, van den Bergh PYK, Hadden RM, et al. Dynamics of Nerve Conduction Studies in Patients With Guillain-Barré Syndrome. Muscle Nerve. 2026;73(5):832-842. PMID 41656826; PMCID PMC13047943; doi:10.1002/mus.70152.", "link": "https://doi.org/10.1002/mus.70152", "areas": ["C", "D"], "unverified": false, "validated": "PubMed"}, {"key": "Asbury1969", "text": "Asbury AK, Arnason BG, Adams RD. The inflammatory lesion in idiopathic polyneuritis. Its role in pathogenesis. Medicine (Baltimore). 1969;48(3):173-215. PMID 5769741; doi:10.1097/00005792-196905000-00001.", "link": "https://doi.org/10.1097/00005792-196905000-00001", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Asbury1990", "text": "Asbury AK, Cornblath DR. Assessment of current diagnostic criteria for Guillain-Barré syndrome. Ann Neurol. 1990;27 Suppl:S21-4. PMID 2194422; doi:10.1002/ana.410270707.", "link": "https://doi.org/10.1002/ana.410270707", "areas": ["A", "D"], "unverified": false, "validated": "PubMed"}, {"key": "Badry2019", "text": "Badry R. Prognostic Value of \"A\" Waves in Patients With Guillain Barre Syndrome. J Clin Neurophysiol. 2019;36(5):385-388. PMID 31033653; doi:10.1097/WNP.0000000000000592.", "link": "https://doi.org/10.1097/wnp.0000000000000592", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Bae2014", "text": "Bae JS, Yuki N, Kuwabara S, Kim JK, Vucic S, Lin CS, et al. Guillain-Barré syndrome in Asia. J Neurol Neurosurg Psychiatry. 2014;85(8):907-13. PMID 24357682; doi:10.1136/jnnp-2013-306212.", "link": "https://doi.org/10.1136/jnnp-2013-306212", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Baker2012NZ", "text": "Baker MG, Kvalsvig A, Zhang J, Lake R, Sears A, Wilson N. Declining Guillain-Barré syndrome after campylobacteriosis control, New Zealand, 1988-2010. Emerg Infect Dis. 2012;18(2):226-33. PMID 22304786; PMCID PMC3310455; doi:10.3201/eid1802.111126.", "link": "https://doi.org/10.3201/eid1802.111126", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Bamford2002", "text": "Bamford NS, Trojaborg W, Sherbany AA, De Vivo DC. Congenital Guillain-Barré syndrome associated with maternal inflammatory bowel disease is responsive to intravenous immunoglobulin. Eur J Paediatr Neurol. 2002;6(2):115-9. PMID 11995958; doi:10.1053/ejpn.2002.0557.", "link": "https://doi.org/10.1053/ejpn.2002.0557", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Bansal2026", "text": "Bansal D, Randhawa MS, Iyer R, Kesavan S, Angurana SK, Nallasamy K, et al. Axonal Versus Demyelinating Guillain-Barré Syndrome Subtypes in Critically Ill Children: Clinical and Autonomic Profiles. Pediatr Neurol. 2026;175:168-173. PMID 41389764; doi:10.1016/j.pediatrneurol.2025.11.016.", "link": "https://doi.org/10.1016/j.pediatrneurol.2025.11.016", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Baudel2020", "text": "Baudel JL, Vigneron C, Pras-Landre V, Joffre J, Marjot F, Ait-Oufella H, et al. Transfusion-related acute lung injury (TRALI) after intravenous immunoglobulins: French multicentre study and literature review. Clin Rheumatol. 2020;39(2):541-546. PMID 31760541; doi:10.1007/s10067-019-04832-7.", "link": "https://doi.org/10.1007/s10067-019-04832-7", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Baxter2012", "text": "Baxter R, Lewis N, Bakshi N, Vellozzi C, Klein NP; CISA Network. Recurrent Guillain-Barre syndrome following vaccination. Clin Infect Dis. 2012;54(6):800-4. PMID 22267712; doi:10.1093/cid/cir960.", "link": "https://doi.org/10.1093/cid/cir960", "areas": ["B", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Bayu2024", "text": "Bayu HT, Demilie AE, Molla MT, Kumie FT, Endeshaw AS. Mortality and its predictors among patients with Guillain-Barré syndrome in the intensive care unit of a low-income country, Ethiopia: a multicenter retrospective cohort study. Front Neurol. 2024;15:1484661. PMID 39559822; PMCID PMC11571968; doi:10.3389/fneur.2024.1484661.", "link": "https://doi.org/10.3389/fneur.2024.1484661", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "BazanRodriguez2023", "text": "Bazán-Rodríguez L, Ruiz-Avalos JA, de Saráchaga AJ, Martinez-Jimenez E, López-Hernández JC, Vargas-Cañas S. Dysautonomia and related outcomes in Guillain-Barre syndrome. Auton Neurosci. 2023;245:103070. PMID 36634383; doi:10.1016/j.autneu.2022.103070.", "link": "https://doi.org/10.1016/j.autneu.2022.103070", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Bell2025", "text": "Bell K, Summers SJ, Moffitt J, Hill G. The Psychological Effects of Guillain-Barré Syndrome: A Grounded Theory Study. Qual Health Res. 2025;35(12):1354-1364. PMID 39652376; PMCID PMC12379044; doi:10.1177/10497323241304641.", "link": "https://doi.org/10.1177/10497323241304641", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Berciano2017", "text": "Berciano J. Spinal nerve involvement in early Guillain-Barré syndrome: The Haymaker and Kernohan's legacy. J Neurol Sci. 2017;382:1-9. PMID 29110997; doi:10.1016/j.jns.2017.09.017.", "link": "https://doi.org/10.1016/j.jns.2017.09.017", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Berciano2017Proximal", "text": "Berciano J, Sedano MJ, Pelayo-Negro AL, García A, Orizaola P, Gallardo E, et al. Proximal nerve lesions in early Guillain-Barré syndrome: implications for pathogenesis and disease classification. J Neurol. 2017;264(2):221-236. PMID 27314967; doi:10.1007/s00415-016-8204-2.", "link": "https://doi.org/10.1007/s00415-016-8204-2", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Berciano2020", "text": "Berciano J, Orizaola P, Gallardo E, Pelayo-Negro AL, Sánchez-Juan P, Infante J, et al. Very early Guillain-Barré syndrome: A clinical-electrophysiological and ultrasonographic study. Clin Neurophysiol Pract. 2020;5:1-9. PMID 31886449; PMCID PMC6923288; doi:10.1016/j.cnp.2019.11.003.", "link": "https://doi.org/10.1016/j.cnp.2019.11.003", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Berciano2024", "text": "Berciano J. The pathophysiological role of endoneurial inflammatory edema in early classical Guillain-Barré syndrome. Clin Neurol Neurosurg. 2024;237:108131. PMID 38308937; doi:10.1016/j.clineuro.2024.108131.", "link": "https://doi.org/10.1016/j.clineuro.2024.108131", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Bernsen1997Health", "text": "Bernsen RA, Jacobs HM, de Jager AE, van der Meché FG. Residual health status after Guillain-Barré syndrome. J Neurol Neurosurg Psychiatry. 1997;62(6):637-40. PMID 9219755; PMCID PMC1074153; doi:10.1136/jnnp.62.6.637.", "link": "https://doi.org/10.1136/jnnp.62.6.637", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Bernsen1999Daily", "text": "Bernsen RA, de Jager AE, Schmitz PI, van der Meché FG. Residual physical outcome and daily living 3 to 6 years after Guillain-Barré syndrome. Neurology. 1999;53(2):409-10. PMID 10430437; doi:10.1212/wnl.53.2.409.", "link": "https://doi.org/10.1212/wnl.53.2.409", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Bernsen2001", "text": "Bernsen RA, Jager AE, Schmitz PI, van der Meché FG. Long-term sensory deficit after Guillain-Barré syndrome. J Neurol. 2001;248(6):483-6. PMID 11499638; doi:10.1007/s004150170157.", "link": "https://doi.org/10.1007/s004150170157", "areas": ["A", "G"], "unverified": false, "validated": "PubMed", "aliases": ["Bernsen2001Sensory"]}, {"key": "Bernsen2002Work", "text": "Bernsen RA, de Jager AE, Schmitz PI, van der Meché FG. Long-term impact on work and private life after Guillain-Barré syndrome. J Neurol Sci. 2002;201(1-2):13-17. PMID 12163188; doi:10.1016/s0022-510x(02)00158-2.", "link": "https://doi.org/10.1016/s0022-510x(02)00158-2", "areas": ["G", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Bernsen2006Relatives", "text": "Bernsen RA, de Jager AE, van der Meché FG, Suurmeijer TP. The effects of Guillain-Barré syndrome on the close relatives of patients during the first year. J Neurol Sci. 2006;244(1-2):69-75. PMID 16476450; doi:10.1016/j.jns.2006.01.002.", "link": "https://doi.org/10.1016/j.jns.2006.01.002", "areas": ["G", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Bernsen2010Psychosocial", "text": "Bernsen RA, de Jager AE, Kuijer W, van der Meché FG, Suurmeijer TP. Psychosocial dysfunction in the first year after Guillain-Barré syndrome. Muscle Nerve. 2010;41(4):533-9. PMID 19941334; doi:10.1002/mus.21536.", "link": "https://doi.org/10.1002/mus.21536", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Bersano2006", "text": "Bersano A, Carpo M, Allaria S, Franciotta D, Citterio A, Nobile-Orazio E. Long term disability and social status change after Guillain-Barré syndrome. J Neurol. 2006;253(2):214-8. PMID 16096809; doi:10.1007/s00415-005-0958-x.", "link": "https://doi.org/10.1007/s00415-005-0958-x", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Bi2026", "text": "Bi Z, Ye X, Liu P, Lu M, Liu H, Chen M. Efgartigimod for Guillain-Barré syndrome: a retrospective analysis of efficacy and safety. Ther Adv Neurol Disord. 2026;19:17562864261419026. PMID 41696674; PMCID PMC12901846; doi:10.1177/17562864261419026.", "link": "https://doi.org/10.1177/17562864261419026", "areas": ["I"], "unverified": false, "validated": "PubMed"}, {"key": "Bickerstaff1951", "text": "Bickerstaff ER, Cloake PC. Mesencephalitis and rhombencephalitis. Br Med J. 1951;2(4723):77-81. PMID 14848512; PMCID PMC2069534; doi:10.1136/bmj.2.4723.77.", "link": "https://doi.org/10.1136/bmj.2.4723.77", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Bickerstaff1957", "text": "Bickerstaff ER. Brain-stem encephalitis; further observations on a grave syndrome with benign prognosis. Br Med J. 1957;1(5032):1384-7. PMID 13436795; PMCID PMC1973653; doi:10.1136/bmj.1.5032.1384.", "link": "https://doi.org/10.1136/bmj.1.5032.1384", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Black2009", "text": "Black S, Eskola J, Siegrist CA, Halsey N, MacDonald N, Law B, et al. Importance of background rates of disease in assessment of vaccine safety during mass immunisation with pandemic H1N1 influenza vaccines. Lancet. 2009;374(9707):2115-2122. PMID 19880172; PMCID PMC2861912; doi:10.1016/S0140-6736(09)61877-8.", "link": "https://doi.org/10.1016/s0140-6736(09)61877-8", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Bogliun2002", "text": "Bogliun G, Beghi E, Guillain-Barrè Syndrome Registry Study Group. Validity of hospital discharge diagnoses for public health surveillance of the Guillain-Barrè syndrome. Neurol Sci. 2002;23(3):113-7. PMID 12391495; doi:10.1007/s100720200036.", "link": "https://doi.org/10.1007/s100720200036", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Bondi2021", "text": "Bondi M, Engel-Haber E, Wolff J, Grosman-Rimon L, Bloch A, Zeilig G. Functional outcomes following inpatient rehabilitation of Guillain-Barré syndrome patients: Intravenous immunoglobulins versus plasma exchange. NeuroRehabilitation. 2021;48(4):543-551. PMID 34024788; doi:10.3233/NRE-201640.", "link": "https://doi.org/10.3233/nre-201640", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Boostani2019", "text": "Boostani R, Ramezanzadeh F, Saeidi M, Khodabandeh M. A follow-up study on Guillain-Barre syndrome and validation of Brighton criteria. Iran J Neurol. 2019;18(2):64-69. PMID 31565202; PMCID PMC6755501.", "link": "https://pubmed.ncbi.nlm.nih.gov/31565202/", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Bose2022", "text": "Bose S, Loo LK, Rajabally YA. Causes and consequences of diagnostic delay in Guillain-Barré syndrome in a UK tertiary center. Muscle Nerve. 2022;65(5):547-552. PMID 35075673; doi:10.1002/mus.27506.", "link": "https://doi.org/10.1002/mus.27506", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Bourque2019", "text": "Bourque PR, Brooks J, McCudden CR, Warman-Chardon J, Breiner A. Age matters: Impact of data-driven CSF protein upper reference limits in Guillain-Barré syndrome. Neurol Neuroimmunol Neuroinflamm. 2019;6(4):e576. PMID 31355312; PMCID PMC6624106; doi:10.1212/NXI.0000000000000576.", "link": "https://doi.org/10.1212/nxi.0000000000000576", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Bourque2020", "text": "Bourque PR, Brooks J, Warman-Chardon J, Breiner A. Cerebrospinal fluid total protein in Guillain-Barré syndrome variants: correlations with clinical category, severity, and electrophysiology. J Neurol. 2020;267(3):746-751. PMID 31734909; doi:10.1007/s00415-019-09634-0.", "link": "https://doi.org/10.1007/s00415-019-09634-0", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Bragazzi2021", "text": "Bragazzi NL, Kolahi AA, Nejadghaderi SA, Lochner P, Brigo F, Naldi A, et al. Global, regional, and national burden of Guillain-Barré syndrome and its underlying causes from 1990 to 2019. J Neuroinflammation. 2021;18(1):264. PMID 34763713; PMCID PMC8581128; doi:10.1186/s12974-021-02319-4.", "link": "https://doi.org/10.1186/s12974-021-02319-4", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Breiner2019JNeurol", "text": "Breiner A, Moher D, Brooks J, Cheng W, Hegen H, Deisenhammer F, et al. Adult CSF total protein upper reference limits should be age-partitioned and significantly higher than 0.45 g/L: a systematic review. J Neurol. 2019;266(3):616-624. PMID 30617996; doi:10.1007/s00415-018-09174-z.", "link": "https://doi.org/10.1007/s00415-018-09174-z", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Breiner2019MuscleNerve", "text": "Breiner A, Bourque PR, Allen JA. Updated cerebrospinal fluid total protein reference values improve chronic inflammatory demyelinating polyneuropathy diagnosis. Muscle Nerve. 2019;60(2):180-183. PMID 30989684; doi:10.1002/mus.26488.", "link": "https://doi.org/10.1002/mus.26488", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Brettle1978", "text": "Brettle RP, Gross M, Legg NJ, Lockwood M, Pallis C. Treatment of acute polyneuropathy by plasma exchange. Lancet. 1978;2(8099):1100. PMID 82118; doi:10.1016/s0140-6736(78)91837-8.", "link": "https://doi.org/10.1016/s0140-6736(78)91837-8", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Brooks2019", "text": "Brooks JA, McCudden C, Breiner A, Bourque PR. Causes of albuminocytological dissociation and the impact of age-adjusted cerebrospinal fluid protein reference intervals: a retrospective chart review of 2627 samples collected at tertiary care centre. BMJ Open. 2019;9(2):e025348. PMID 30765408; PMCID PMC6398735; doi:10.1136/bmjopen-2018-025348.", "link": "https://doi.org/10.1136/bmjopen-2018-025348", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Buchwald1999", "text": "Buchwald B, de Baets M, Luijckx GJ, Toyka KV. Neonatal Guillain-Barré syndrome: blocking antibodies transmitted from mother to child. Neurology. 1999;53(6):1246-53. PMID 10522880; doi:10.1212/wnl.53.6.1246.", "link": "https://doi.org/10.1212/wnl.53.6.1246", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Buchwald2002", "text": "Buchwald B, Ahangari R, Weishaupt A, Toyka KV. Intravenous immunoglobulins neutralize blocking antibodies in Guillain-Barré syndrome. Ann Neurol. 2002;51(6):673-80. PMID 12112071; doi:10.1002/ana.10205.", "link": "https://doi.org/10.1002/ana.10205", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Burns2001", "text": "Burns TM, Lawn ND, Low PA, Camilleri M, Wijdicks EF. Adynamic ileus in severe Guillain-Barré syndrome. Muscle Nerve. 2001;24(7):963-5. PMID 11410925; doi:10.1002/mus.1095.", "link": "https://doi.org/10.1002/mus.1095", "areas": ["F", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Busl2023", "text": "Busl KM, Fried H, Muehlschlegel S, Wartenberg KE, Rajajee V, Alexander SA, et al. Guidelines for Neuroprognostication in Adults with Guillain-Barré Syndrome. Neurocrit Care. 2023;38(3):564-583. PMID 36964442; PMCID PMC10241707; doi:10.1007/s12028-023-01707-3.", "link": "https://doi.org/10.1007/s12028-023-01707-3", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Bussmann2007", "text": "Bussmann JB, Garssen MP, van Doorn PA, Stam HJ. Analysing the favourable effects of physical exercise: relationships between physical fitness, fatigue and functioning in Guillain-Barré syndrome and chronic inflammatory demyelinating polyneuropathy. J Rehabil Med. 2007;39(2):121-5. PMID 17351693; doi:10.2340/16501977-0007.", "link": "https://doi.org/10.2340/16501977-0007", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Byun1998", "text": "Byun WM, Park WK, Park BH, Ahn SH, Hwang MS, Chang JC. Guillain-Barré syndrome: MR imaging findings of the spine in eight patients. Radiology. 1998;208(1):137-41. PMID 9646804; doi:10.1148/radiology.208.1.9646804.", "link": "https://doi.org/10.1148/radiology.208.1.9646804", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Cai2025", "text": "Cai H, Zhou F, Li T, Li Z, Luo J, Hu J, et al. Intravenous Efgartigimod or Intravenous Immunoglobulin in Guillain-Barre Syndrome: An Observational Multicenter Study. J Peripher Nerv Syst. 2025;30(4):e70072. PMID 41287201; doi:10.1111/jns.70072.", "link": "https://doi.org/10.1111/jns.70072", "areas": ["I"], "unverified": false, "validated": "PubMed"}, {"key": "Campbell2022", "text": "Campbell CI, McGonigal R, Barrie JA, Delaere J, Bracke L, Cunningham ME, et al. Complement inhibition prevents glial nodal membrane injury in a GM1 antibody-mediated mouse model. Brain Commun. 2022;4(6):fcac306. PMID 36523267; PMCID PMC9746686; doi:10.1093/braincomms/fcac306.", "link": "https://doi.org/10.1093/braincomms/fcac306", "areas": ["B", "I"], "unverified": false, "validated": "PubMed"}, {"key": "CaoLormeau2016", "text": "Cao-Lormeau VM, Blake A, Mons S, Lastère S, Roche C, Vanhomwegen J, et al. Guillain-Barré Syndrome outbreak associated with Zika virus infection in French Polynesia: a case-control study. Lancet. 2016;387(10027):1531-1539. PMID 26948433; PMCID PMC5444521; doi:10.1016/S0140-6736(16)00562-6.", "link": "https://doi.org/10.1016/s0140-6736(16)00562-6", "areas": ["A", "B", "D", "I"], "unverified": false, "validated": "PubMed"}, {"key": "Capasso2010", "text": "Capasso M, Notturno F, Manzoli C, Yuki N, Uncini A. Reversible conduction failure in pharyngeal-cervical-brachial variant of Guillain-Barré syndrome. Muscle Nerve. 2010;42(4):608-12. PMID 20878742; doi:10.1002/mus.21801.", "link": "https://doi.org/10.1002/mus.21801", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Capasso2011", "text": "Capasso M, Notturno F, Manzoli C, Uncini A. Involvement of sensory fibres in axonal subtypes of Guillain-Barre syndrome. J Neurol Neurosurg Psychiatry. 2011;82(6):664-70. PMID 21444320; doi:10.1136/jnnp.2010.238311.", "link": "https://doi.org/10.1136/jnnp.2010.238311", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Chakraborty2020", "text": "Chakraborty T, Kramer CL, Wijdicks EFM, Rabinstein AA. Dysautonomia in Guillain-Barré Syndrome: Prevalence, Clinical Spectrum, and Outcomes. Neurocrit Care. 2020;32(1):113-120. PMID 31297663; doi:10.1007/s12028-019-00781-w.", "link": "https://doi.org/10.1007/s12028-019-00781-w", "areas": ["D", "F"], "unverified": false, "validated": "PubMed"}, {"key": "Chan2017", "text": "Chan YC, Punzalan-Sotelo AM, Kannan TA, Shahrizaila N, Umapathi T, Goh EJH, et al. Electrodiagnosis of reversible conduction failure in Guillain-Barré syndrome. Muscle Nerve. 2017;56(5):919-924. PMID 28093784; doi:10.1002/mus.25577.", "link": "https://doi.org/10.1002/mus.25577", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Chen2016NCSRef", "text": "Chen S, Andary M, Buschbacher R, Del Toro D, Smith B, So Y, et al. Electrodiagnostic reference values for upper and lower limb nerve conduction studies in adult populations. Muscle Nerve. 2016;54(3):371-7. PMID 27238640; doi:10.1002/mus.25203.", "link": "https://doi.org/10.1002/mus.25203", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Cheng1998", "text": "Cheng Q, Jiang GX, Fredrikson S, Link H, de Pedro-Cuesta J. Increased incidence of Guillain-Barré syndrome postpartum. Epidemiology. 1998;9(6):601-4. PMID 9799167; doi:10.1097/00001648-199811000-00006.", "link": "https://doi.org/10.1097/00001648-199811000-00006", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Chevret2017", "text": "Chevret S, Hughes RA, Annane D. Plasma exchange for Guillain-Barré syndrome. Cochrane Database Syst Rev. 2017;2(2):CD001798. PMID 28241090; PMCID PMC6464100; doi:10.1002/14651858.CD001798.pub3.", "link": "https://doi.org/10.1002/14651858.cd001798.pub3", "areas": ["E", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Chevrolet1991", "text": "Chevrolet JC, Deléamont P. Repeated vital capacity measurements as predictive parameters for mechanical ventilation need and weaning success in the Guillain-Barré syndrome. Am Rev Respir Dis. 1991;144(4):814-8. PMID 1928954; doi:10.1164/ajrccm/144.4.814.", "link": "https://doi.org/10.1164/ajrccm/144.4.814", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Chiba1992", "text": "Chiba A, Kusunoki S, Shimizu T, Kanazawa I. Serum IgG antibody to ganglioside GQ1b is a possible marker of Miller Fisher syndrome. Ann Neurol. 1992;31(6):677-9. PMID 1514781; doi:10.1002/ana.410310619.", "link": "https://doi.org/10.1002/ana.410310619", "areas": ["A", "C"], "unverified": false, "validated": "PubMed"}, {"key": "Chiba1993", "text": "Chiba A, Kusunoki S, Obata H, Machinami R, Kanazawa I. Serum anti-GQ1b IgG antibody is associated with ophthalmoplegia in Miller Fisher syndrome and Guillain-Barré syndrome: clinical and immunohistochemical studies. Neurology. 1993;43(10):1911-7. PMID 8413947; doi:10.1212/wnl.43.10.1911.", "link": "https://doi.org/10.1212/wnl.43.10.1911", "areas": ["C", "D"], "unverified": false, "validated": "PubMed"}, {"key": "Cochen2005", "text": "Cochen V, Arnulf I, Demeret S, Neulat ML, Gourlet V, Drouot X, et al. Vivid dreams, hallucinations, psychosis and REM sleep in Guillain-Barré syndrome. Brain. 2005;128(Pt 11):2535-45. PMID 16000335; doi:10.1093/brain/awh585.", "link": "https://doi.org/10.1093/brain/awh585", "areas": ["F", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Coirier2022", "text": "Coirier V, Lesouhaitier M, Reizine F, Painvin B, Quelven Q, Maamar A, et al. Tolerance and complications of therapeutic plasma exchange by centrifugation: A single center experience. J Clin Apher. 2022;37(1):54-64. PMID 34786746; doi:10.1002/jca.21950.", "link": "https://doi.org/10.1002/jca.21950", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Collins2010", "text": "Collins MP, Dyck PJ, Gronseth GS, Guillevin L, Hadden RD, Heuss D, et al. Peripheral Nerve Society Guideline on the classification, diagnosis, investigation, and immunosuppressive therapy of non-systemic vasculitic neuropathy: executive summary. J Peripher Nerv Syst. 2010;15(3):176-84. PMID 21040139; doi:10.1111/j.1529-8027.2010.00281.x.", "link": "https://doi.org/10.1111/j.1529-8027.2010.00281.x", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Colls2003", "text": "Colls BM. Guillain-Barré syndrome and hyponatraemia. Intern Med J. 2003;33(1-2):5-9. PMID 12534871; doi:10.1046/j.1445-5994.2002.00322.x.", "link": "https://doi.org/10.1046/j.1445-5994.2002.00322.x", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Cornblath1987", "text": "Cornblath DR, McArthur JC, Kennedy PG, Witte AS, Griffin JW. Inflammatory demyelinating peripheral neuropathies associated with human T-cell lymphotropic virus type III infection. Ann Neurol. 1987;21(1):32-40. PMID 3030188; doi:10.1002/ana.410210107.", "link": "https://doi.org/10.1002/ana.410210107", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Cornblath1988", "text": "Cornblath DR, Mellits ED, Griffin JW, McKhann GM, Albers JW, Miller RG, et al. Motor conduction studies in Guillain-Barré syndrome: description and prognostic value. Ann Neurol. 1988;23(4):354-9. PMID 3382170; doi:10.1002/ana.410230407.", "link": "https://doi.org/10.1002/ana.410230407", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Crescioli2025", "text": "Crescioli S, Kaplon H, Wang L, Visweswaraiah J, Kapoor V, Reichert JM. Antibodies to watch in 2025. MAbs. 2025;17(1):2443538. PMID 39711140; PMCID PMC12952251; doi:10.1080/19420862.2024.2443538.", "link": "https://doi.org/10.1080/19420862.2024.2443538", "areas": ["I"], "unverified": false, "validated": "Europe PMC"}, {"key": "Crescioli2026", "text": "Crescioli S, Kaplon H, Chenoweth A, Hsu YS, Pinto K, Kapoor V, et al. Antibodies to watch in 2026. MAbs. 2026;18(1):2614669. PMID 41560619; PMCID PMC12826703; doi:10.1080/19420862.2026.2614669.", "link": "https://doi.org/10.1080/19420862.2026.2614669", "areas": ["I"], "unverified": false, "validated": "Europe PMC"}, {"key": "Dalakas1998", "text": "Dalakas MC. Mechanism of action of intravenous immunoglobulin and therapeutic considerations in the treatment of autoimmune neurologic diseases. Neurology. 1998;51(6 Suppl 5):S2-8. PMID 9851723; doi:10.1212/wnl.51.6_suppl_5.s2.", "link": "https://doi.org/10.1212/wnl.51.6_suppl_5.s2", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Dalakas2014", "text": "Dalakas MC. Mechanistic effects of IVIg in neuroinflammatory diseases: conclusions based on clinicopathologic correlations. J Clin Immunol. 2014;34 Suppl 1:S120-6. PMID 24722854; doi:10.1007/s10875-014-0024-5.", "link": "https://doi.org/10.1007/s10875-014-0024-5", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Dalman1994", "text": "Dalman JE, Verhagen WI. Cardiac arrest in Guillain-Barré syndrome and the use of suxamethonium. Acta Neurol Belg. 1994;94(4):259-61. PMID 7839804.", "link": "https://pubmed.ncbi.nlm.nih.gov/7839804/", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Darweesh2014", "text": "Darweesh SK, Polinder S, Mulder MJ, Baena CP, van Leeuwen N, Franco OH, et al. Health-related quality of life in Guillain-Barré syndrome patients: a systematic review. J Peripher Nerv Syst. 2014;19(1):24-35. PMID 24456426; doi:10.1111/jns5.12051.", "link": "https://doi.org/10.1111/jns5.12051", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Daum2014", "text": "Daum C, Hubschmid M, Aybek S. The value of 'positive' clinical signs for weakness, sensory and gait disorders in conversion disorder: a systematic and narrative review. J Neurol Neurosurg Psychiatry. 2014;85(2):180-90. PMID 23467417; doi:10.1136/jnnp-2012-304607.", "link": "https://doi.org/10.1136/jnnp-2012-304607", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Davidson2017", "text": "Davidson AI, Halstead SK, Goodfellow JA, Chavada G, Mallik A, Overell J, et al. Inhibition of complement in Guillain-Barré syndrome: the ICA-GBS study. J Peripher Nerv Syst. 2017;22(1):4-12. PMID 27801990; doi:10.1111/jns.12194.", "link": "https://doi.org/10.1111/jns.12194", "areas": ["E", "I"], "unverified": false, "validated": "PubMed"}, {"key": "Davidson2022Falls", "text": "Davidson I, Parker ZJ. Falls in people post-Guillain-Barré syndrome in the United Kingdom: A national cross-sectional survey of community based adults. Health Soc Care Community. 2022;30(5):e2590-e2603. PMID 35015326; PMCID PMC9546005; doi:10.1111/hsc.13703.", "link": "https://doi.org/10.1111/hsc.13703", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "deBoisanger2016", "text": "de Boisanger L. Outcomes for patients with Guillain-Barré syndrome requiring mechanical ventilation: a literature review. Ir J Med Sci. 2016;185(1):11-5. PMID 26443749; doi:10.1007/s11845-015-1365-7.", "link": "https://doi.org/10.1007/s11845-015-1365-7", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "deJager1991", "text": "de Jager AE, Minderhoud JM. Residual signs in severe Guillain-Barré syndrome: analysis of 57 patients. J Neurol Sci. 1991;104(2):151-6. PMID 1940971; doi:10.1016/0022-510x(91)90304-p.", "link": "https://doi.org/10.1016/0022-510x(91)90304-p", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "DeLeonMunoz2026", "text": "De León-Muñoz A, Ávila-Gandía V, Andreu-Caravaca L. Impact of Physical Exercise Programs on Fatigue and Functional Capacity in People With Guillain-Barré Syndrome and Chronic Inflammatory Demyelinating Polyneuropathy: A Systematic Review. Arch Phys Med Rehabil. 2026;107(5):1067-1078. PMID 41038424; doi:10.1016/j.apmr.2025.09.013.", "link": "https://doi.org/10.1016/j.apmr.2025.09.013", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Derksen2014", "text": "Derksen A, Ritter C, Athar P, Kieseier BC, Mancias P, Hartung HP, et al. Sural sparing pattern discriminates Guillain-Barré syndrome from its mimics. Muscle Nerve. 2014;50(5):780-4. PMID 24616124; PMCID PMC4431612; doi:10.1002/mus.24226.", "link": "https://doi.org/10.1002/mus.24226", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Devi2023", "text": "Devi AK, Randhawa MS, Bansal A, Angurana SK, Malhi P, Nallasamy K, et al. Long-Term Neurological, Behavioral, Functional, Quality of Life, and School Performance Outcomes in Children With Guillain-Barré Syndrome Admitted to PICU. Pediatr Neurol. 2023;140:18-24. PMID 36587490; doi:10.1016/j.pediatrneurol.2022.11.002.", "link": "https://doi.org/10.1016/j.pediatrneurol.2022.11.002", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Dhar2008", "text": "Dhar R, Stitt L, Hahn AF. The morbidity and outcome of patients with Guillain-Barré syndrome admitted to the intensive care unit. J Neurol Sci. 2008;264(1-2):121-8. PMID 17881005; doi:10.1016/j.jns.2007.08.005.", "link": "https://doi.org/10.1016/j.jns.2007.08.005", "areas": ["F", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Dionne2010", "text": "Dionne A, Nicolle MW, Hahn AF. Clinical and electrophysiological parameters distinguishing acute-onset chronic inflammatory demyelinating polyneuropathy from acute inflammatory demyelinating polyneuropathy. Muscle Nerve. 2010;41(2):202-7. PMID 19882646; doi:10.1002/mus.21480.", "link": "https://doi.org/10.1002/mus.21480", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Dirlikov2018", "text": "Dirlikov E, Major CG, Medina NA, Lugo-Robles R, Matos D, Muñoz-Jordan JL, et al. Clinical Features of Guillain-Barré Syndrome With vs Without Zika Virus Infection, Puerto Rico, 2016. JAMA Neurol. 2018;75(9):1089-1097. PMID 29799940; PMCID PMC6143122; doi:10.1001/jamaneurol.2018.1058.", "link": "https://doi.org/10.1001/jamaneurol.2018.1058", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Doets2018", "text": "Doets AY, Verboon C, van den Berg B, Harbo T, Cornblath DR, Willison HJ, et al. Regional variation of Guillain-Barré syndrome. Brain. 2018;141(10):2866-2877. PMID 30247567; doi:10.1093/brain/awy232.", "link": "https://doi.org/10.1093/brain/awy232", "areas": ["A", "B", "C", "D", "F", "G", "I"], "unverified": false, "validated": "PubMed"}, {"key": "Doets2020", "text": "Doets AY, Hughes RA, Brassington R, Hadden RD, Pritchard J. Pharmacological treatment other than corticosteroids, intravenous immunoglobulin and plasma exchange for Guillain-Barré syndrome. Cochrane Database Syst Rev. 2020;1(1):CD008630. PMID 31981368; PMCID PMC6984651; doi:10.1002/14651858.CD008630.pub5.", "link": "https://doi.org/10.1002/14651858.cd008630.pub5", "areas": ["E", "I"], "unverified": false, "validated": "PubMed"}, {"key": "Doets2022", "text": "Doets AY, Walgaard C, Lingsma HF, Islam B, Papri N, Yamagishi Y, et al. International Validation of the Erasmus Guillain-Barré Syndrome Respiratory Insufficiency Score. Ann Neurol. 2022;91(4):521-531. PMID 35106830; PMCID PMC9306880; doi:10.1002/ana.26312.", "link": "https://doi.org/10.1002/ana.26312", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Doets2022mEGOS", "text": "Doets AY, Lingsma HF, Walgaard C, Islam B, Papri N, Davidson A, et al. Predicting Outcome in Guillain-Barré Syndrome: International Validation of the Modified Erasmus GBS Outcome Score. Neurology. 2022;98(5):e518-e532. PMID 34937789; PMCID PMC8826467; doi:10.1212/WNL.0000000000013139.", "link": "https://doi.org/10.1212/wnl.0000000000013139", "areas": ["G", "I"], "unverified": false, "validated": "PubMed"}, {"key": "Drenthen2013", "text": "Drenthen J, Jacobs BC, Maathuis EM, van Doorn PA, Visser GH, Blok JH. Residual fatigue in Guillain-Barre syndrome is related to axonal loss. Neurology. 2013;81(21):1827-31. PMID 24163277; doi:10.1212/01.wnl.0000436073.21406.e6.", "link": "https://doi.org/10.1212/01.wnl.0000436073.21406.e6", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Drory2012", "text": "Drory VE, Bronipolsky T, Bluvshtein V, Catz A, Korczyn AD. Occurrence of fatigue over 20 years after recovery from Guillain-Barré syndrome. J Neurol Sci. 2012;316(1-2):72-5. PMID 22336700; doi:10.1016/j.jns.2012.01.024.", "link": "https://doi.org/10.1016/j.jns.2012.01.024", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Durand2006", "text": "Durand MC, Porcher R, Orlikowski D, Aboab J, Devaux C, Clair B, et al. Clinical and electrophysiological predictors of respiratory failure in Guillain-Barré syndrome: a prospective study. Lancet Neurol. 2006;5(12):1021-8. PMID 17110282; doi:10.1016/S1474-4422(06)70603-2.", "link": "https://doi.org/10.1016/s1474-4422(06)70603-2", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "DutchGBS1994", "text": "Dutch Guillain-Barré Study Group. Treatment of Guillain-Barré syndrome with high-dose immune globulins combined with methylprednisolone: a pilot study. Ann Neurol. 1994;35(6):749-52. PMID 8210234; doi:10.1002/ana.410350618.", "link": "https://doi.org/10.1002/ana.410350618", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Edlow2010", "text": "Edlow JA. Tick paralysis. Curr Treat Options Neurol. 2010;12(3):167-77. PMID 20842579; doi:10.1007/s11940-010-0068-7.", "link": "https://doi.org/10.1007/s11940-010-0068-7", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "ElBayoumi2011", "text": "El-Bayoumi MA, El-Refaey AM, Abdelkader AM, El-Assmy MM, Alwakeel AA, El-Tahan HM. Comparison of intravenous immunoglobulin and plasma exchange in treatment of mechanically ventilated children with Guillain Barré syndrome: a randomized study. Crit Care. 2011;15(4):R164. PMID 21745374; PMCID PMC3387601; doi:10.1186/cc10305.", "link": "https://doi.org/10.1186/cc10305", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "ElMhandi2007", "text": "El Mhandi L, Calmels P, Camdessanché JP, Gautheron V, Féasson L. Muscle strength recovery in treated Guillain-Barré syndrome: a prospective study for the first 18 months after onset. Am J Phys Med Rehabil. 2007;86(9):716-24. PMID 17709995; doi:10.1097/PHM.0b013e31813e0b67.", "link": "https://doi.org/10.1097/phm.0b013e31813e0b67", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Elovaara2008", "text": "Elovaara I, Apostolski S, van Doorn P, Gilhus NE, Hietaharju A, Honkaniemi J, et al. EFNS guidelines for the use of intravenous immunoglobulin in treatment of neurological diseases: EFNS task force on the use of intravenous immunoglobulin in treatment of neurological diseases. Eur J Neurol. 2008;15(9):893-908. PMID 18796075; doi:10.1111/j.1468-1331.2008.02246.x.", "link": "https://doi.org/10.1111/j.1468-1331.2008.02246.x", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Espay2018", "text": "Espay AJ, Aybek S, Carson A, Edwards MJ, Goldstein LH, Hallett M, et al. Current Concepts in Diagnosis and Treatment of Functional Neurological Disorders. JAMA Neurol. 2018;75(9):1132-1141. PMID 29868890; PMCID PMC7293766; doi:10.1001/jamaneurol.2018.1264.", "link": "https://doi.org/10.1001/jamaneurol.2018.1264", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Estrade2019", "text": "Estrade S, Guiomard C, Fabry V, Baudou E, Cances C, Chaix Y, et al. Prognostic factors for the sequelae and severity of Guillain-Barré syndrome in children. Muscle Nerve. 2019;60(6):716-723. PMID 31531862; doi:10.1002/mus.26706.", "link": "https://doi.org/10.1002/mus.26706", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Estublier2024", "text": "Estublier B, Colineaux H, Arnaud C, Cintas P, Baudou E, Chaix Y, et al. Long-term outcomes of paediatric Guillain-Barré syndrome. Dev Med Child Neurol. 2024;66(2):176-186. PMID 37501281; doi:10.1111/dmcn.15693.", "link": "https://doi.org/10.1111/dmcn.15693", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "FDA-Asceniv", "text": "ASCENIV (immune globulin intravenous, human-slra) 10% liquid. US prescribing information. openFDA drug label record, set ID d74f4360-3b51-496c-96fb-84c3976958d2, effective 2026-04-30.", "link": "", "areas": ["E"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Bivigam", "text": "BIVIGAM (immune globulin intravenous, human) 10% liquid. US prescribing information. openFDA drug label record, set ID a2244aa0-a6d0-11df-b385-0002a5d5c51b, effective 2025-05-05.", "link": "", "areas": ["E"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-GammagardLiquid", "text": "GAMMAGARD LIQUID (immune globulin infusion, human). US prescribing information. openFDA drug label record, set ID 9d42adca-0dd7-4df7-864d-5a7feee52130, effective 2011-07-22 (historical snapshot).", "link": "", "areas": ["E"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-GamunexC", "text": "GAMUNEX-C (immune globulin injection, human) 10% liquid. US prescribing information. openFDA drug label record, set ID ade6b84a-e95b-0a49-3296-f56208fdf35b, effective 2010-10-25 (historical snapshot).", "link": "", "areas": ["E"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Privigen", "text": "PRIVIGEN (immune globulin intravenous, human) 10% liquid. US prescribing information. openFDA drug label record, set ID 7e5649da-75be-4a42-8eeb-4aeba562c401, effective 2011-02-16 (historical snapshot).", "link": "", "areas": ["E"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-Quelicin", "text": "QUELICIN (succinylcholine chloride) injection, US prescribing information; NDA008845; effective 2026-08-18; set id fb08161e-7711-406d-e7b3-ea4515c07983.", "link": "", "areas": ["F"], "unverified": false, "validated": "openFDA"}, {"key": "FDA-RSVGBS2025", "text": "US Food and Drug Administration. FDA Requires Guillain-Barré Syndrome (GBS) Warning in the Prescribing Information for RSV Vaccines Abrysvo and Arexvy. Center for Biologics Evaluation and Research safety communication, content current as of 7 January 2025.", "link": "", "areas": ["B"], "unverified": false, "validated": "FDA website — fda.gov/vaccines-blood-biologics/safety-availability-biologics; vaccine labels are not carried in the openFDA drug/label endpoint"}, {"key": "Feasby1986", "text": "Feasby TE, Gilbert JJ, Brown WF, Bolton CF, Hahn AF, Koopman WF, et al. An acute axonal form of Guillain-Barré polyneuropathy. Brain. 1986;109 ( Pt 6):1115-26. PMID 3790970; doi:10.1093/brain/109.6.1115.", "link": "https://doi.org/10.1093/brain/109.6.1115", "areas": ["A", "C"], "unverified": false, "validated": "PubMed"}, {"key": "Feldman1990", "text": "Feldman JM. Cardiac arrest after succinylcholine administration in a pregnant patient recovered from Guillain-Barré syndrome. Anesthesiology. 1990;72(5):942-4. PMID 2339807; doi:10.1097/00000542-199005000-00026.", "link": "https://doi.org/10.1097/00000542-199005000-00026", "areas": ["F", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Fergusson1981", "text": "Fergusson RJ, Wright DJ, Willey RF, Crompton GK, Grant IW. Suxamethonium is dangerous in polyneuropathy. Br Med J (Clin Res Ed). 1981;282(6260):298-9. PMID 6779993; PMCID PMC1504077; doi:10.1136/bmj.282.6260.298.", "link": "https://doi.org/10.1136/bmj.282.6260.298", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Fisher1956", "text": "Fisher M. An unusual variant of acute idiopathic polyneuritis (syndrome of ophthalmoplegia, ataxia and areflexia). N Engl J Med. 1956;255(2):57-65. PMID 13334797; doi:10.1056/NEJM195607122550201.", "link": "https://doi.org/10.1056/nejm195607122550201", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Flachenecker1996", "text": "Flachenecker P, Müllges W, Wermuth P, Hartung HP, Reiners K. Eyeball pressure testing in the evaluation of serious bradyarrhythmias in Guillain-Barré syndrome. Neurology. 1996;47(1):102-8. PMID 8710061; doi:10.1212/wnl.47.1.102.", "link": "https://doi.org/10.1212/wnl.47.1.102", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Fletcher2000", "text": "Fletcher DD, Lawn ND, Wolter TD, Wijdicks EF. Long-term outcome in patients with Guillain-Barré syndrome requiring mechanical ventilation. Neurology. 2000;54(12):2311-5. PMID 10881259; doi:10.1212/wnl.54.12.2311.", "link": "https://doi.org/10.1212/wnl.54.12.2311", "areas": ["F", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Fleurance2025", "text": "Fleurance A, Joseph L, Dehoux L, Barnerias C, Hully M, Kossorotoff M, et al. Efficacy and Safety of Plasmapheresis in Children With Acute Transverse or Flaccid Myelitis, and Guillain-Barré Syndrome. Eur J Neurol. 2025;32(11):e70406. PMID 41251130; PMCID PMC12624416; doi:10.1111/ene.70406.", "link": "https://doi.org/10.1111/ene.70406", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Fokke2014", "text": "Fokke C, van den Berg B, Drenthen J, Walgaard C, van Doorn PA, Jacobs BC. Diagnosis of Guillain-Barré syndrome and validation of Brighton criteria. Brain. 2014;137(Pt 1):33-43. PMID 24163275; doi:10.1093/brain/awt285.", "link": "https://doi.org/10.1093/brain/awt285", "areas": ["A", "C", "D"], "unverified": false, "validated": "PubMed"}, {"key": "Fokkink2017", "text": "Fokkink WR, Walgaard C, Kuitwaard K, Tio-Gillen AP, van Doorn PA, Jacobs BC. Association of Albumin Levels With Outcome in Intravenous Immunoglobulin-Treated Guillain-Barré Syndrome. JAMA Neurol. 2017;74(2):189-196. PMID 28027337; doi:10.1001/jamaneurol.2016.4480.", "link": "https://doi.org/10.1001/jamaneurol.2016.4480", "areas": ["E", "I"], "unverified": false, "validated": "PubMed"}, {"key": "Forsberg2004Impairment", "text": "Forsberg A, Press R, Einarsson U, de Pedro-Cuesta J, Widén Holmqvist L, Swedish Epidemiological Study Group. Impairment in Guillain-Barré syndrome during the first 2 years after onset: a prospective study. J Neurol Sci. 2004;227(1):131-8. PMID 15546603; doi:10.1016/j.jns.2004.09.021.", "link": "https://doi.org/10.1016/j.jns.2004.09.021", "areas": ["G", "A", "F"], "unverified": false, "validated": "PubMed", "aliases": ["Forsberg2004"]}, {"key": "Forsberg2005Disability", "text": "Forsberg A, Press R, Einarsson U, de Pedro-Cuesta J, Holmqvist LW. Disability and health-related quality of life in Guillain-Barré syndrome during the first two years after onset: a prospective study. Clin Rehabil. 2005;19(8):900-9. PMID 16323390; doi:10.1191/0269215505cr918oa.", "link": "https://doi.org/10.1191/0269215505cr918oa", "areas": ["G", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Forsberg2006Burden", "text": "Forsberg A, de Pedro-Cuesta J, Widén Holmqvist L. Use of healthcare, patient satisfaction and burden of care in Guillain-Barre syndrome. J Rehabil Med. 2006;38(4):230-6. PMID 16801205; doi:10.1080/16501970600582997.", "link": "https://doi.org/10.1080/16501970600582997", "areas": ["G", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Forsberg2012Decade", "text": "Forsberg A, Press R, Holmqvist LW. Residual disability 10 years after falling ill in Guillain-Barré syndrome: a prospective follow-up study. J Neurol Sci. 2012;317(1-2):74-9. PMID 22425539; doi:10.1016/j.jns.2012.02.026.", "link": "https://doi.org/10.1016/j.jns.2012.02.026", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Forsberg2015Balance", "text": "Forsberg A, Widén-Holmqvist L, Ahlström G. Balancing everyday life two years after falling ill with Guillain-Barré syndrome: a qualitative study. Clin Rehabil. 2015;29(6):601-10. PMID 25200880; doi:10.1177/0269215514549564.", "link": "https://doi.org/10.1177/0269215514549564", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Fragiel2021", "text": "Fragiel M, Miró Ò, Llorens P, Jiménez S, Piñera P, Burillo G, et al. Incidence, clinical, risk factors and outcomes of Guillain-Barré in Covid-19. Ann Neurol. 2021;89(3):598-603. PMID 33295021; doi:10.1002/ana.25987.", "link": "https://doi.org/10.1002/ana.25987", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Freiha2026", "text": "Freiha J, Min YG, Osman C, Rajabally YA. Guillain-Barré Syndrome: Progress in Diagnosis, Biomarkers, Neuroimaging and Management. Immunotargets Ther. 2026;15:390161. PMID 41947943; PMCID PMC13052254; doi:10.2147/ITT.S390161.", "link": "https://doi.org/10.2147/itt.s390161", "areas": ["I"], "unverified": false, "validated": "PubMed"}, {"key": "Freitas2017", "text": "Freitas MRG, Vidal CM, Orsini M. Guillain-Barré syndrome: celebrating a century. Arq Neuropsiquiatr. 2017;75(8):600-603. PMID 28813091; doi:10.1590/0004-282X20170093.", "link": "https://doi.org/10.1590/0004-282x20170093", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "FrenchCooperative1992", "text": "French Cooperative Group on Plasma Exchange in Guillain-Barré Syndrome. Plasma exchange in Guillain-Barré syndrome: one-year follow-up. Ann Neurol. 1992;32(1):94-7. PMID 1642477; doi:10.1002/ana.410320115.", "link": "https://doi.org/10.1002/ana.410320115", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "FrenchCooperative1997", "text": "French Cooperative Group on Plasma Exchange in Guillain-Barré Syndrome. Appropriate number of plasma exchanges in Guillain-Barré syndrome. Ann Neurol. 1997;41(3):298-306. PMID 9066350; doi:10.1002/ana.410410304.", "link": "https://doi.org/10.1002/ana.410410304", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "FrenchPE1987", "text": "French Cooperative Group on Plasma Exchange in Guillain-Barré Syndrome. Efficiency of plasma exchange in Guillain-Barré syndrome: role of replacement fluids. French Cooperative Group on Plasma Exchange in Guillain-Barré syndrome. Ann Neurol. 1987;22(6):753-61. PMID 2893583; doi:10.1002/ana.410220612.", "link": "https://doi.org/10.1002/ana.410220612", "areas": ["A", "E"], "unverified": false, "validated": "PubMed", "aliases": ["FrenchCooperative1987"]}, {"key": "Frenzen2008", "text": "Frenzen PD. Economic cost of Guillain-Barré syndrome in the United States. Neurology. 2008;71(1):21-7. PMID 18591502; doi:10.1212/01.wnl.0000316393.54258.d1.", "link": "https://doi.org/10.1212/01.wnl.0000316393.54258.d1", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Funakoshi2009", "text": "Funakoshi K, Kuwabara S, Odaka M, Hirata K, Yuki N. Clinical predictors of mechanical ventilation in Fisher/Guillain-Barré overlap syndrome. J Neurol Neurosurg Psychiatry. 2009;80(1):60-4. PMID 18948360; doi:10.1136/jnnp.2008.154351.", "link": "https://doi.org/10.1136/jnnp.2008.154351", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Gaber2002", "text": "Gaber TA, Kirker SG, Jenner JR. Current practice of prophylactic anticoagulation in Guillain-Barré syndrome. Clin Rehabil. 2002;16(2):190-3. PMID 11926177; doi:10.1191/0269215502cr475oa.", "link": "https://doi.org/10.1191/0269215502cr475oa", "areas": ["F", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Gagliardi2021", "text": "Gagliardi D, Faravelli I, Podestà MA, Brusa R, Mauri E, Saccomanno D, et al. Sodium Levels Predict Disability at Discharge in Guillain-Barré Syndrome: A Retrospective Cohort Study. Front Neurol. 2021;12:729252. PMID 34557155; PMCID PMC8453067; doi:10.3389/fneur.2021.729252.", "link": "https://doi.org/10.3389/fneur.2021.729252", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Garssen2004Training", "text": "Garssen MP, Bussmann JB, Schmitz PI, Zandbergen A, Welter TG, Merkies IS, et al. Physical training and fatigue, fitness, and quality of life in Guillain-Barré syndrome and CIDP. Neurology. 2004;63(12):2393-5. PMID 15623709; doi:10.1212/01.wnl.0000148589.87107.9c.", "link": "https://doi.org/10.1212/01.wnl.0000148589.87107.9c", "areas": ["G", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Garssen2006Amantadine", "text": "Garssen MP, Schmitz PI, Merkies IS, Jacobs BC, van der Meché FG, van Doorn PA. Amantadine for treatment of fatigue in Guillain-Barre syndrome: a randomised, double blind, placebo controlled, crossover trial. J Neurol Neurosurg Psychiatry. 2006;77(1):61-5. PMID 16361594; PMCID PMC2117395; doi:10.1136/jnnp.2004.046227.", "link": "https://doi.org/10.1136/jnnp.2004.046227", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Garssen2006Fatigue", "text": "Garssen MP, Van Koningsveld R, Van Doorn PA. Residual fatigue is independent of antecedent events and disease severity in Guillain-Barré syndrome. J Neurol. 2006;253(9):1143-6. PMID 16998652; doi:10.1007/s00415-006-0163-6.", "link": "https://doi.org/10.1007/s00415-006-0163-6", "areas": ["G", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Garssen2006NCS", "text": "Garssen MP, van Doorn PA, Visser GH. Nerve conduction studies in relation to residual fatigue in Guillain-Barré syndrome. J Neurol. 2006;253(7):851-6. PMID 16845568; doi:10.1007/s00415-006-0962-9.", "link": "https://doi.org/10.1007/s00415-006-0962-9", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Garssen2007Central", "text": "Garssen MP, Schillings ML, Van Doorn PA, Van Engelen BG, Zwarts MJ. Contribution of central and peripheral factors to residual fatigue in Guillain-Barré syndrome. Muscle Nerve. 2007;36(1):93-9. PMID 17238173; doi:10.1002/mus.20739.", "link": "https://doi.org/10.1002/mus.20739", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "GBSFoundationHistory", "text": "PatientWorthy. Helpful Resources for CIDP Patients. Web page, https://patientworthy.com/?p=125673, states the foundation \"was founded in 1980 by Estelle and Robert Benson\". (unverified: patient-news web page, no bibliographic record; read 2026-11-09)", "link": "https://patientworthy.com/?p=125673,", "areas": ["A"], "unverified": true}, {"key": "GBSSteroidTrial1993", "text": "Guillain-Barré Syndrome Steroid Trial Group. Double-blind trial of intravenous methylprednisolone in Guillain-Barré syndrome. Lancet. 1993;341(8845):586-90. PMID 8094828.", "link": "https://pubmed.ncbi.nlm.nih.gov/8094828/", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "GBSStudyGroup1985", "text": "The Guillain-Barré Syndrome Study Group. Plasmapheresis and acute Guillain-Barré syndrome. The Guillain-Barré syndrome Study Group. Neurology. 1985;35(8):1096-104. PMID 4022342.", "link": "https://pubmed.ncbi.nlm.nih.gov/4022342/", "areas": ["A", "E"], "unverified": false, "validated": "PubMed"}, {"key": "Geleijns2004", "text": "Geleijns K, Brouwer BA, Jacobs BC, Houwing-Duistermaat JJ, van Duijn CM, van Doorn PA. The occurrence of Guillain-Barre syndrome within families. Neurology. 2004;63(9):1747-50. PMID 15534275; doi:10.1212/01.wnl.0000143055.09646.31.", "link": "https://doi.org/10.1212/01.wnl.0000143055.09646.31", "areas": ["A", "B"], "unverified": false, "validated": "PubMed"}, {"key": "Geurtsvankessel2013", "text": "Geurtsvankessel CH, Islam Z, Mohammad QD, Jacobs BC, Endtz HP, Osterhaus AD. Hepatitis E and Guillain-Barre syndrome. Clin Infect Dis. 2013;57(9):1369-70. PMID 23899686; doi:10.1093/cid/cit512.", "link": "https://doi.org/10.1093/cid/cit512", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Ghazanfar2020", "text": "Ghazanfar H, Qazi R, Ghazanfar A, Iftekhar S. Significance of Brighton Criteria in the Early Diagnosis and Management of Guillain-Barré Syndrome. Cureus. 2020;12(5):e8318. PMID 32607301; PMCID PMC7320636; doi:10.7759/cureus.8318.", "link": "https://doi.org/10.7759/cureus.8318", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Gilhus2019", "text": "Gilhus NE, Tzartos S, Evoli A, Palace J, Burns TM, Verschuuren JJGM. Myasthenia gravis. Nat Rev Dis Primers. 2019;5(1):30. PMID 31048702. doi:10.1038/s41572-019-0079-y.", "link": "https://doi.org/10.1038/s41572-019-0079-y", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Goodfellow2016", "text": "Goodfellow JA, Willison HJ. Guillain-Barré syndrome: a century of progress. Nat Rev Neurol. 2016;12(12):723-731. PMID 27857121; doi:10.1038/nrneurol.2016.172.", "link": "https://doi.org/10.1038/nrneurol.2016.172", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Gordon2001", "text": "Gordon PH, Wilbourn AJ. Early electrodiagnostic findings in Guillain-Barré syndrome. Arch Neurol. 2001;58(6):913-7. PMID 11405806; doi:10.1001/archneur.58.6.913.", "link": "https://doi.org/10.1001/archneur.58.6.913", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Gorson1996", "text": "Gorson KC, Ropper AH, Muriello MA, Blair R. Prospective evaluation of MRI lumbosacral nerve root enhancement in acute Guillain-Barré syndrome. Neurology. 1996;47(3):813-7. PMID 8797486; doi:10.1212/wnl.47.3.813.", "link": "https://doi.org/10.1212/wnl.47.3.813", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Gorson2025", "text": "Gorson KC. Evolving understanding of Guillain-Barré syndrome pathophysiology and the central role of the classical complement pathway in axonal injury. Front Neurol. 2025;16:1572949. PMID 40438570; PMCID PMC12117664; doi:10.3389/fneur.2025.1572949. Funded by Annexon Biosciences.", "link": "https://doi.org/10.3389/fneur.2025.1572949", "areas": ["I"], "unverified": false, "validated": "PubMed"}, {"key": "GrattanSmith1997", "text": "Grattan-Smith PJ, Morris JG, Johnston HM, Yiannikas C, Malik R, Russell R, et al. Clinical and neurophysiological features of tick paralysis. Brain. 1997;120 ( Pt 11):1975-87. PMID 9397015; doi:10.1093/brain/120.11.1975.", "link": "https://doi.org/10.1093/brain/120.11.1975", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Green2018", "text": "Green C, Baker T, Subramaniam A. Predictors of respiratory failure in patients with Guillain-Barré syndrome: a systematic review and meta-analysis. Med J Aust. 2018;208(4):181-188. PMID 29490222; doi:10.5694/mja17.00552.", "link": "https://doi.org/10.5694/mja17.00552", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Griffin1995", "text": "Griffin JW, Li CY, Ho TW, Xue P, Macko C, Gao CY, et al. Guillain-Barré syndrome in northern China. The spectrum of neuropathological changes in clinically defined cases. Brain. 1995;118 ( Pt 3):577-95. PMID 7600080; doi:10.1093/brain/118.3.577.", "link": "https://doi.org/10.1093/brain/118.3.577", "areas": ["A", "C"], "unverified": false, "validated": "PubMed"}, {"key": "Griffin1996AMSAN", "text": "Griffin JW, Li CY, Ho TW, Tian M, Gao CY, Xue P, et al. Pathology of the motor-sensory axonal Guillain-Barré syndrome. Ann Neurol. 1996;39(1):17-28. PMID 8572662; doi:10.1002/ana.410390105.", "link": "https://doi.org/10.1002/ana.410390105", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Griffin1996Nodal", "text": "Griffin JW, Li CY, Macko C, Ho TW, Hsieh ST, Xue P, et al. Early nodal changes in the acute motor axonal neuropathy pattern of the Guillain-Barré syndrome. J Neurocytol. 1996;25(1):33-51. PMID 8852937; doi:10.1007/BF02284784.", "link": "https://doi.org/10.1007/bf02284784", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Grimm2014", "text": "Grimm A, Décard BF, Axer H. Ultrasonography of the peripheral nervous system in the early stage of Guillain-Barré syndrome. J Peripher Nerv Syst. 2014;19(3):234-41. PMID 25418824; doi:10.1111/jns.12091.", "link": "https://doi.org/10.1111/jns.12091", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Grimm2016", "text": "Grimm A, Décard BF, Schramm A, Pröbstel AK, Rasenack M, Axer H, et al. Ultrasound and electrophysiologic findings in patients with Guillain-Barré syndrome at disease onset and over a period of six months. Clin Neurophysiol. 2016;127(2):1657-1663. PMID 26220732; doi:10.1016/j.clinph.2015.06.032.", "link": "https://doi.org/10.1016/j.clinph.2015.06.032", "areas": ["C", "I"], "unverified": false, "validated": "PubMed"}, {"key": "Guillain1916", "text": "Guillain G, Barré JA, Strohl A. [Radiculoneuritis syndrome with hyperalbuminosis of cerebrospinal fluid without cellular reaction. Notes on clinical features and graphs of tendon reflexes. 1916]. Ann Med Interne (Paris). 1999;150(1):24-32. PMID 10400560. Reprint of the original 1916 paper in Bull Soc Med Hop Paris.", "link": "https://pubmed.ncbi.nlm.nih.gov/10400560/", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Gupta2010Orthosis", "text": "Gupta A, Taly AB, Srivastava A, Murali T. Guillain-Barre Syndrome &#x2013; rehabilitation outcome, residual deficits and requirement of lower limb orthosis for locomotion at 1 year follow-up. Disabil Rehabil. 2010;32(23):1897-902. PMID 20331413; doi:10.3109/09638281003734474.", "link": "https://doi.org/10.3109/09638281003734474", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Hadden1998", "text": "Hadden RD, Cornblath DR, Hughes RA, Zielasek J, Hartung HP, Toyka KV, et al. Electrophysiological classification of Guillain-Barré syndrome: clinical associations and outcome. Plasma Exchange/Sandoglobulin Guillain-Barré Syndrome Trial Group. Ann Neurol. 1998;44(5):780-8. PMID 9818934; doi:10.1002/ana.410440512.", "link": "https://doi.org/10.1002/ana.410440512", "areas": ["A", "C"], "unverified": false, "validated": "PubMed"}, {"key": "Hadden2001", "text": "Hadden RD, Karch H, Hartung HP, Zielasek J, Weissbrich B, Schubert J, et al. Preceding infections, immune factors, and outcome in Guillain-Barré syndrome. Neurology. 2001;56(6):758-65. PMID 11274311; doi:10.1212/wnl.56.6.758.", "link": "https://doi.org/10.1212/wnl.56.6.758", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "HaferMacko1996AIDP", "text": "Hafer-Macko CE, Sheikh KA, Li CY, Ho TW, Cornblath DR, McKhann GM, et al. Immune attack on the Schwann cell surface in acute inflammatory demyelinating polyneuropathy. Ann Neurol. 1996;39(5):625-35. PMID 8619548; doi:10.1002/ana.410390512.", "link": "https://doi.org/10.1002/ana.410390512", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "HaferMacko1996AMAN", "text": "Hafer-Macko C, Hsieh ST, Li CY, Ho TW, Sheikh K, Cornblath DR, et al. Acute motor axonal neuropathy: an antibody-mediated attack on axolemma. Ann Neurol. 1996;40(4):635-44. PMID 8871584; doi:10.1002/ana.410400414.", "link": "https://doi.org/10.1002/ana.410400414", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Hafsteinsdottir2024", "text": "Hafsteinsdóttir B, Farman H, Lagerström N, Zetterberg H, Andersen O, Novakova L, et al. Neurofilament light chain as a diagnostic and prognostic biomarker in Guillain-Barré syndrome. J Neurol. 2024;271(11):7282-7293. PMID 39249104; PMCID PMC11561089; doi:10.1007/s00415-024-12679-5.", "link": "https://doi.org/10.1007/s00415-024-12679-5", "areas": ["D", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Halstead2008", "text": "Halstead SK, Zitman FM, Humphreys PD, Greenshields K, Verschuuren JJ, Jacobs BC, et al. Eculizumab prevents anti-ganglioside antibody-mediated neuropathy in a murine model. Brain. 2008;131(Pt 5):1197-208. PMID 18184663; doi:10.1093/brain/awm316.", "link": "https://doi.org/10.1093/brain/awm316", "areas": ["B", "I"], "unverified": false, "validated": "PubMed"}, {"key": "Hanson2022", "text": "Hanson KE, Goddard K, Lewis N, Fireman B, Myers TR, Bakshi N, et al. Incidence of Guillain-Barré Syndrome After COVID-19 Vaccination in the Vaccine Safety Datalink. JAMA Netw Open. 2022;5(4):e228879. PMID 35471572; PMCID PMC9044108; doi:10.1001/jamanetworkopen.2022.8879.", "link": "https://doi.org/10.1001/jamanetworkopen.2022.8879", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Hao2019", "text": "Hao Y, Wang W, Jacobs BC, Qiao B, Chen M, Liu D, et al. Antecedent infections in Guillain-Barré syndrome: a single-center, prospective study. Ann Clin Transl Neurol. 2019;6(12):2510-2517. PMID 31714025; PMCID PMC6917331; doi:10.1002/acn3.50946.", "link": "https://doi.org/10.1002/acn3.50946", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Harbo2019", "text": "Harbo T, Markvardsen LK, Hellfritzsch MB, Severinsen K, Nielsen JF, Andersen H. Neuromuscular electrical stimulation in early rehabilitation of Guillain-Barré syndrome: A pilot study. Muscle Nerve. 2019;59(4):481-484. PMID 30549053; doi:10.1002/mus.26396.", "link": "https://doi.org/10.1002/mus.26396", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Haymaker1949", "text": "Haymaker WE, Kernohan JW. The Landry-Guillain-Barré syndrome; a clinicopathologic report of 50 fatal cases and a critique of the literature. Medicine (Baltimore). 1949;28(1):59-141. PMID 18115402.", "link": "https://pubmed.ncbi.nlm.nih.gov/18115402/", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Helfferich2022", "text": "Helfferich J, Roodbol J, de Wit MC, Brouwer OF, Jacobs BC, 2016 Enterovirus D68 Acute Flaccid Myelitis Working Group and the Dutch Pediatric GBS Study Group. Acute flaccid myelitis and Guillain-Barré syndrome in children: A comparative study with evaluation of diagnostic criteria. Eur J Neurol. 2022;29(2):593-604. PMID 34747551; PMCID PMC9299116; doi:10.1111/ene.15170.", "link": "https://doi.org/10.1111/ene.15170", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Henderson2003", "text": "Henderson RD, Lawn ND, Fletcher DD, McClelland RL, Wijdicks EF. The morbidity of Guillain-Barré syndrome admitted to the intensive care unit. Neurology. 2003;60(1):17-21. PMID 12530364; doi:10.1212/01.wnl.0000035640.84053.5b.", "link": "https://doi.org/10.1212/01.wnl.0000035640.84053.5b", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Hicks2010", "text": "Hicks CW, Kay B, Worley SE, Moodley M. A clinical picture of Guillain-Barré syndrome in children in the United States. J Child Neurol. 2010;25(12):1504-10. PMID 20823034; doi:10.1177/0883073810370481.", "link": "https://doi.org/10.1177/0883073810370481", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Hiew2017", "text": "Hiew FL, Rajabally YA. Malignancy in Guillain-Barré syndrome: A twelve-year single-center study. J Neurol Sci. 2017;375:275-278. PMID 28320147; doi:10.1016/j.jns.2017.02.024.", "link": "https://doi.org/10.1016/j.jns.2017.02.024", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Hiew2017Fruste", "text": "Hiew FL, Ramlan R, Viswanathan S, Puvanarajah S. Guillain-Barré Syndrome, variants & forms fruste: Reclassification with new criteria. Clin Neurol Neurosurg. 2017;158:114-118. PMID 28514704; doi:10.1016/j.clineuro.2017.05.006.", "link": "https://doi.org/10.1016/j.clineuro.2017.05.006", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Hiraga2005", "text": "Hiraga A, Mori M, Ogawara K, Kojima S, Kanesaka T, Misawa S, et al. Recovery patterns and long term prognosis for axonal Guillain-Barré syndrome. J Neurol Neurosurg Psychiatry. 2005;76(5):719-22. PMID 15834034; PMCID PMC1739613; doi:10.1136/jnnp.2004.051136.", "link": "https://doi.org/10.1136/jnnp.2004.051136", "areas": ["C", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Hiraga2005Neurology", "text": "Hiraga A, Kuwabara S, Ogawara K, Misawa S, Kanesaka T, Koga M, et al. Patterns and serial changes in electrodiagnostic abnormalities of axonal Guillain-Barré syndrome. Neurology. 2005;64(5):856-60. PMID 15753422; doi:10.1212/01.WNL.0000153071.71335.E9.", "link": "https://doi.org/10.1212/01.wnl.0000153071.71335.e9", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Ho1995", "text": "Ho TW, Mishu B, Li CY, Gao CY, Cornblath DR, Griffin JW, et al. Guillain-Barré syndrome in northern China. Relationship to Campylobacter jejuni infection and anti-glycolipid antibodies. Brain. 1995;118 ( Pt 3):597-605. PMID 7600081; doi:10.1093/brain/118.3.597.", "link": "https://doi.org/10.1093/brain/118.3.597", "areas": ["A", "C"], "unverified": false, "validated": "PubMed"}, {"key": "Ho1997Recovery", "text": "Ho TW, Li CY, Cornblath DR, Gao CY, Asbury AK, Griffin JW, et al. Patterns of recovery in the Guillain-Barre syndromes. Neurology. 1997;48(3):695-700. PMID 9065550; doi:10.1212/wnl.48.3.695.", "link": "https://doi.org/10.1212/wnl.48.3.695", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Ho1997Terminal", "text": "Ho TW, Hsieh ST, Nachamkin I, Willison HJ, Sheikh K, Kiehlbauch J, et al. Motor nerve terminal degeneration provides a potential mechanism for rapid recovery in acute motor axonal neuropathy after Campylobacter infection. Neurology. 1997;48(3):717-24. PMID 9065554; doi:10.1212/wnl.48.3.717.", "link": "https://doi.org/10.1212/wnl.48.3.717", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Ho1999", "text": "Ho TW, Willison HJ, Nachamkin I, Li CY, Veitch J, Ung H, et al. Anti-GD1a antibody is associated with axonal but not demyelinating forms of Guillain-Barré syndrome. Ann Neurol. 1999;45(2):168-73. PMID 9989618; doi:10.1002/1531-8249(199902)45:2<168::aid-ana6>3.0.co;2-6.", "link": "https://doi.org/10.1002/1531-8249(199902)45:2<168::aid-ana6>3.0.co", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Hughes1978", "text": "Hughes RA, Newsom-Davis JM, Perkin GD, Pierce JM. Controlled trial prednisolone in acute polyneuropathy. Lancet. 1978;2(8093):750-3. PMID 80682; doi:10.1016/s0140-6736(78)92644-2.", "link": "https://doi.org/10.1016/s0140-6736(78)92644-2", "areas": ["A", "E"], "unverified": false, "validated": "PubMed"}, {"key": "Hughes1997", "text": "Hughes RA, Rees JH. Clinical and epidemiologic features of Guillain-Barré syndrome. J Infect Dis. 1997;176 Suppl 2:S92-8. PMID 9396689; doi:10.1086/513793.", "link": "https://doi.org/10.1086/513793", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Hughes2003", "text": "Hughes RA, Wijdicks EF, Barohn R, Benson E, Cornblath DR, Hahn AF, et al. Practice parameter: immunotherapy for Guillain-Barré syndrome: report of the Quality Standards Subcommittee of the American Academy of Neurology. Neurology. 2003;61(6):736-40. PMID 14504313; doi:10.1212/wnl.61.6.736.", "link": "https://doi.org/10.1212/wnl.61.6.736", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Hughes2005", "text": "Hughes RA, Wijdicks EF, Benson E, Cornblath DR, Hahn AF, Meythaler JM, et al. Supportive care for patients with Guillain-Barré syndrome. Arch Neurol. 2005;62(8):1194-8. PMID 16087757; doi:10.1001/archneur.62.8.1194.", "link": "https://doi.org/10.1001/archneur.62.8.1194", "areas": ["F", "G", "H"], "unverified": false, "validated": "PubMed", "aliases": ["Hughes2005Supportive"]}, {"key": "Hughes2007", "text": "Hughes RA, Swan AV, Raphaël JC, Annane D, van Koningsveld R, van Doorn PA. Immunotherapy for Guillain-Barré syndrome: a systematic review. Brain. 2007;130(Pt 9):2245-57. PMID 17337484; doi:10.1093/brain/awm004.", "link": "https://doi.org/10.1093/brain/awm004", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Hughes2014", "text": "Hughes RA, Swan AV, van Doorn PA. Intravenous immunoglobulin for Guillain-Barré syndrome. Cochrane Database Syst Rev. 2014;2014(9):CD002063. PMID 25238327; PMCID PMC6781841; doi:10.1002/14651858.CD002063.pub6.", "link": "https://doi.org/10.1002/14651858.cd002063.pub6", "areas": ["E", "G", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Hughes2016", "text": "Hughes RA, Brassington R, Gunn AA, van Doorn PA. Corticosteroids for Guillain-Barré syndrome. Cochrane Database Syst Rev. 2016;10(10):CD001446. PMID 27775812; PMCID PMC6464149; doi:10.1002/14651858.CD001446.pub5.", "link": "https://doi.org/10.1002/14651858.cd001446.pub5", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Ibrahim2018", "text": "Ibrahim J, Grapperon AM, Manfredonia F, van den Bergh PY, Attarian S, Rajabally YA. Serial electrophysiology in Guillain-Barré syndrome: A retrospective cohort and case-by-case multicentre analysis. Acta Neurol Scand. 2018;137(3):335-340. PMID 29164611; doi:10.1111/ane.12872.", "link": "https://doi.org/10.1111/ane.12872", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Illes2017", "text": "Illes Z, Blaabjerg M. Cerebrospinal fluid findings in Guillain-Barré syndrome and chronic inflammatory demyelinating polyneuropathies. Handb Clin Neurol. 2017;146:125-138. PMID 29110767; doi:10.1016/B978-0-12-804279-3.00009-5.", "link": "https://doi.org/10.1016/b978-0-12-804279-3.00009-5", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Inan2024", "text": "Inan B, Bekircan-Kurt CE, Demirci M, Erdem-Ozdamar S, Tan E. Differentiating recurrent Guillain-Barre syndrome and acute-onset chronic inflammatory polyneuropathy: literature review. Acta Neurol Belg. 2024;124(5):1467-1475. PMID 38664341; doi:10.1007/s13760-024-02557-2.", "link": "https://doi.org/10.1007/s13760-024-02557-2", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Ishaque2017", "text": "Ishaque T, Islam MB, Ara G, Endtz HP, Mohammad QD, Jacobs BC, et al. High mortality from Guillain-Barré syndrome in Bangladesh. J Peripher Nerv Syst. 2017;22(2):121-126. PMID 28447405; doi:10.1111/jns.12215.", "link": "https://doi.org/10.1111/jns.12215", "areas": ["A", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Islam2010", "text": "Islam Z, Jacobs BC, van Belkum A, Mohammad QD, Islam MB, Herbrink P, et al. Axonal variant of Guillain-Barre syndrome associated with Campylobacter infection in Bangladesh. Neurology. 2010;74(7):581-7. PMID 20157160; doi:10.1212/WNL.0b013e3181cff735.", "link": "https://doi.org/10.1212/wnl.0b013e3181cff735", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Islam2017", "text": "Islam MB, Islam Z, Rahman S, Endtz HP, Vos MC, van der Jagt M, et al. Small volume plasma exchange for Guillain-Barré syndrome in resource poor settings: a safety and feasibility study. Pilot Feasibility Stud. 2017;3:40. PMID 28975040; PMCID PMC5622586; doi:10.1186/s40814-017-0185-0.", "link": "https://doi.org/10.1186/s40814-017-0185-0", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Islam2018", "text": "Islam B, Islam Z, Rahman S, Endtz HP, Vos MC, van der Jagt M, et al. Small volume plasma exchange for Guillain-Barré syndrome in resource-limited settings: a phase II safety and feasibility study. BMJ Open. 2018;8(8):e022862. PMID 30121613; PMCID PMC6104782; doi:10.1136/bmjopen-2018-022862.", "link": "https://doi.org/10.1136/bmjopen-2018-022862", "areas": ["E", "I"], "unverified": false, "validated": "PubMed"}, {"key": "Italian1996", "text": "Italian Guillain-Barré Study Group. The prognosis and main prognostic indicators of Guillain-Barré syndrome. A multicentre prospective study of 297 patients. The Italian Guillain-Barré Study Group. Brain. 1996;119 ( Pt 6):2053-61. PMID 9010009.", "link": "https://pubmed.ncbi.nlm.nih.gov/9010009/", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Ito2008", "text": "Ito M, Kuwabara S, Odaka M, Misawa S, Koga M, Hirata K, et al. Bickerstaff's brainstem encephalitis and Fisher syndrome form a continuous spectrum: clinical analysis of 581 cases. J Neurol. 2008;255(5):674-82. PMID 18274803; doi:10.1007/s00415-008-0775-0.", "link": "https://doi.org/10.1007/s00415-008-0775-0", "areas": ["C", "D"], "unverified": false, "validated": "PubMed"}, {"key": "Jacobs1998", "text": "Jacobs BC, Rothbarth PH, van der Meché FG, Herbrink P, Schmitz PI, de Klerk MA, et al. The spectrum of antecedent infections in Guillain-Barré syndrome: a case-control study. Neurology. 1998;51(4):1110-5. PMID 9781538; doi:10.1212/wnl.51.4.1110.", "link": "https://doi.org/10.1212/wnl.51.4.1110", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Jacobs2017", "text": "Jacobs BC, van den Berg B, Verboon C, Chavada G, Cornblath DR, Gorson KC, et al. International Guillain-Barré Syndrome Outcome Study: protocol of a prospective observational cohort study on clinical and biological predictors of disease course and outcome in Guillain-Barré syndrome. J Peripher Nerv Syst. 2017;22(2):68-76. PMID 28406555; doi:10.1111/jns.12209.", "link": "https://doi.org/10.1111/jns.12209", "areas": ["A", "I"], "unverified": false, "validated": "PubMed"}, {"key": "Jiang1996", "text": "Jiang GX, de Pedro-Cuesta J, Strigård K, Olsson T, Link H. Pregnancy and Guillain-Barré syndrome: a nationwide register cohort study. Neuroepidemiology. 1996;15(4):192-200. PMID 8817501; doi:10.1159/000109907.", "link": "https://doi.org/10.1159/000109907", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Jin2015", "text": "Jin PP, Sun LL, Ding BJ, Qin N, Zhou B, Xia F, et al. Human Leukocyte Antigen DQB1 (HLA-DQB1) Polymorphisms and the Risk for Guillain-Barré Syndrome: A Systematic Review and Meta-Analysis. PLoS One. 2015;10(7):e0131374. PMID 26204120; PMCID PMC4512729; doi:10.1371/journal.pone.0131374.", "link": "https://doi.org/10.1371/journal.pone.0131374", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Jin2020", "text": "Jin PH, Shin SC, Dhamoon MS. Risk of thrombotic events after inpatient intravenous immunoglobulin or plasma exchange for neurologic disease: A case-crossover study. Muscle Nerve. 2020;62(3):327-332. PMID 32270520; doi:10.1002/mus.26884.", "link": "https://doi.org/10.1002/mus.26884", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Kalita2016", "text": "Kalita J, Ranjan A, Misra UK. Outcome of Guillain-Barre syndrome patients with respiratory paralysis. QJM. 2016;109(5):319-23. PMID 26475599; PMCID PMC4888327; doi:10.1093/qjmed/hcv190.", "link": "https://doi.org/10.1093/qjmed/hcv190", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Kalita2020SBC", "text": "Kalita J, Kumar M, Misra UK. Serial single breath count is a reliable tool for monitoring respiratory functions in Guillain-Barré Syndrome. J Clin Neurosci. 2020;72:50-56. PMID 31982274; doi:10.1016/j.jocn.2020.01.032.", "link": "https://doi.org/10.1016/j.jocn.2020.01.032", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Kalita2024", "text": "Kalita J, Mahajan R, Kumar M. Effect of intravenous immunoglobulin and plasmapheresis on nerve conduction parameters compared to the natural course of Guillain-Barré syndrome. J Clin Neurosci. 2024;125:76-82. PMID 38759351; doi:10.1016/j.jocn.2024.05.016.", "link": "https://doi.org/10.1016/j.jocn.2024.05.016", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "KannanKanikannan2014", "text": "Kannan Kanikannan MA, Durga P, Venigalla NK, Kandadai RM, Jabeen SA, Borgohain R. Simple bedside predictors of mechanical ventilation in patients with Guillain-Barre syndrome. J Crit Care. 2014;29(2):219-23. PMID 24378177; doi:10.1016/j.jcrc.2013.10.026.", "link": "https://doi.org/10.1016/j.jcrc.2013.10.026", "areas": ["F", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Kanzaki2008", "text": "Kanzaki M, Kaida K, Ueda M, Morita D, Hirakawa M, Motoyoshi K, et al. Ganglioside complexes containing GQ1b as targets in Miller Fisher and Guillain-Barre syndromes. J Neurol Neurosurg Psychiatry. 2008;79(10):1148-52. PMID 18339728; doi:10.1136/jnnp.2007.142950.", "link": "https://doi.org/10.1136/jnnp.2007.142950", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Keddie2021", "text": "Keddie S, Pakpoor J, Mousele C, Pipis M, Machado PM, Foster M, et al. Epidemiological and cohort study finds no association between COVID-19 and Guillain-Barré syndrome. Brain. 2021;144(2):682-693. PMID 33313649; PMCID PMC7799186; doi:10.1093/brain/awaa433.", "link": "https://doi.org/10.1093/brain/awaa433", "areas": ["A", "B", "I"], "unverified": false, "validated": "PubMed"}, {"key": "Kesici2019", "text": "Kesici S, Tanyıldız M, Yetimakman F, Bayrakci B. A Novel Treatment Strategy for Severe Guillain-Barré Syndrome: Zipper Method. J Child Neurol. 2019;34(5):277-283. PMID 30696330; doi:10.1177/0883073819826225.", "link": "https://doi.org/10.1177/0883073819826225", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Khan2010Cochrane", "text": "Khan F, Ng L, Amatya B, Brand C, Turner-Stokes L. Multidisciplinary care for Guillain-Barré syndrome. Cochrane Database Syst Rev. 2010;2010(10):CD008505. PMID 20927774; PMCID PMC11621594; doi:10.1002/14651858.CD008505.pub2.", "link": "https://doi.org/10.1002/14651858.cd008505.pub2", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Khan2010Factors", "text": "Khan F, Pallant JF, Ng L, Bhasker A. Factors associated with long-term functional outcomes and psychological sequelae in Guillain-Barre syndrome. J Neurol. 2010;257(12):2024-31. PMID 20625757; doi:10.1007/s00415-010-5653-x.", "link": "https://doi.org/10.1007/s00415-010-5653-x", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Khan2011RCT", "text": "Khan F, Pallant JF, Amatya B, Ng L, Gorelik A, Brand C. Outcomes of high- and low-intensity rehabilitation programme for persons in chronic phase after Guillain-Barré syndrome: a randomized controlled trial. J Rehabil Med. 2011;43(7):638-46. PMID 21667009; doi:10.2340/16501977-0826.", "link": "https://doi.org/10.2340/16501977-0826", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Khan2012Review", "text": "Khan F, Amatya B. Rehabilitation interventions in patients with acute demyelinating inflammatory polyneuropathy: a systematic review. Eur J Phys Rehabil Med. 2012;48(3):507-22. PMID 22820829.", "link": "https://pubmed.ncbi.nlm.nih.gov/22820829/", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Kimachi2017", "text": "Kimachi T, Yuki N, Kokubun N, Yamaguchi S, Wakerley BR. Paraparetic Guillain-Barré syndrome: Nondemyelinating reversible conduction failure restricted to the lower limbs. Muscle Nerve. 2017;55(2):281-285. PMID 27397635; doi:10.1002/mus.25242.", "link": "https://doi.org/10.1002/mus.25242", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Kiper2025", "text": "Kiper P, Chevrot M, Godart J, Cieślik B, Kiper A, Regazzetti M, et al. Physical Exercise in Guillain-Barré Syndrome: A Scoping Review. J Clin Med. 2025;14(8):. PMID 40283485; PMCID PMC12028042; doi:10.3390/jcm14082655.", "link": "https://doi.org/10.3390/jcm14082655", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Kleyweg1991", "text": "Kleyweg RP, van der Meché FG. Treatment related fluctuations in Guillain-Barré syndrome after high-dose immunoglobulins or plasma-exchange. J Neurol Neurosurg Psychiatry. 1991;54(11):957-60. PMID 1800666; PMCID PMC1014615; doi:10.1136/jnnp.54.11.957.", "link": "https://doi.org/10.1136/jnnp.54.11.957", "areas": ["E", "G"], "unverified": false, "validated": "PubMed", "aliases": ["Kleyweg1991TRF"]}, {"key": "Kleyweg1991MRC", "text": "Kleyweg RP, van der Meché FG, Schmitz PI. Interobserver agreement in the assessment of muscle strength and functional abilities in Guillain-Barré syndrome. Muscle Nerve. 1991;14(11):1103-9. PMID 1745285; doi:10.1002/mus.880141111.", "link": "https://doi.org/10.1002/mus.880141111", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Koga2002", "text": "Koga M, Yoshino H, Morimatsu M, Yuki N. Anti-GT1a IgG in Guillain-Barré syndrome. J Neurol Neurosurg Psychiatry. 2002;72(6):767-71. PMID 12023422; PMCID PMC1737908; doi:10.1136/jnnp.72.6.767.", "link": "https://doi.org/10.1136/jnnp.72.6.767", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Koga2006", "text": "Koga M, Gilbert M, Takahashi M, Li J, Koike S, Hirata K, et al. Comprehensive analysis of bacterial risk factors for the development of Guillain-Barre syndrome after Campylobacter jejuni enteritis. J Infect Dis. 2006;193(4):547-55. PMID 16425134; doi:10.1086/499969.", "link": "https://doi.org/10.1086/499969", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Kokubun2010", "text": "Kokubun N, Nishibayashi M, Uncini A, Odaka M, Hirata K, Yuki N. Conduction block in acute motor axonal neuropathy. Brain. 2010;133(10):2897-908. PMID 20855419; doi:10.1093/brain/awq260.", "link": "https://doi.org/10.1093/brain/awq260", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Kokubun2013CNP", "text": "Kokubun N, Shahrizaila N, Koga M, Hirata K, Yuki N. The demyelination neurophysiological criteria can be misleading in Campylobacter jejuni-related Guillain-Barré syndrome. Clin Neurophysiol. 2013;124(8):1671-9. PMID 23514735; doi:10.1016/j.clinph.2013.02.010.", "link": "https://doi.org/10.1016/j.clinph.2013.02.010", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Kokubun2013JNS", "text": "Kokubun N, Shahrizaila N, Hirata K, Yuki N. Reversible conduction failure is distinct from neurophysiological patterns of recovery in mild demyelinating Guillain-Barré syndrome. J Neurol Sci. 2013;326(1-2):111-4. PMID 23394975; doi:10.1016/j.jns.2013.01.015.", "link": "https://doi.org/10.1016/j.jns.2013.01.015", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Koo2016", "text": "Koo YS, Shin HY, Kim JK, Nam TS, Shin KJ, Bae JS, et al. Early Electrodiagnostic Features of Upper Extremity Sensory Nerves Can Differentiate Axonal Guillain-Barré Syndrome from Acute Inflammatory Demyelinating Polyneuropathy. J Clin Neurol. 2016;12(4):495-501. PMID 27819421; PMCID PMC5063878; doi:10.3988/jcn.2016.12.4.495.", "link": "https://doi.org/10.3988/jcn.2016.12.4.495", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Korinthenberg2005", "text": "Korinthenberg R, Schessl J, Kirschner J, Mönting JS. Intravenously administered immunoglobulin in the treatment of childhood Guillain-Barré syndrome: a randomized trial. Pediatrics. 2005;116(1):8-14. PMID 15995024; doi:10.1542/peds.2004-1324.", "link": "https://doi.org/10.1542/peds.2004-1324", "areas": ["E", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Korinthenberg2007", "text": "Korinthenberg R, Schessl J, Kirschner J. Clinical presentation and course of childhood Guillain-Barré syndrome: a prospective multicentre study. Neuropediatrics. 2007;38(1):10-7. PMID 17607598; doi:10.1055/s-2007-981686.", "link": "https://doi.org/10.1055/s-2007-981686", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Korinthenberg2020", "text": "Korinthenberg R, Sejvar JJ. The Brighton Collaboration case definition: Comparison in a retrospective and prospective cohort of children with Guillain-Barré syndrome. J Peripher Nerv Syst. 2020;25(4):344-349. PMID 32869396; doi:10.1111/jns.12411.", "link": "https://doi.org/10.1111/jns.12411", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Korinthenberg2020Guideline", "text": "Korinthenberg R, Trollmann R, Felderhoff-Müser U, Bernert G, Hackenberg A, Hufnagel M, et al. Diagnosis and treatment of Guillain-Barré Syndrome in childhood and adolescence: An evidence- and consensus-based guideline. Eur J Paediatr Neurol. 2020;25:5-16. PMID 31941581; doi:10.1016/j.ejpn.2020.01.003.", "link": "https://doi.org/10.1016/j.ejpn.2020.01.003", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Kornhuber1999", "text": "Kornhuber ME, Bischoff C, Mentrup H, Conrad B. Multiple A waves in Guillain-Barré syndrome. Muscle Nerve. 1999;22(3):394-9. PMID 10086901; doi:10.1002/(sici)1097-4598(199903)22:3<394::aid-mus13>3.0.co;2-v.", "link": "https://doi.org/10.1002/(sici)1097-4598(199903)22:3<394::aid-mus13>3.0.co", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Kortvelyessy2020", "text": "Körtvelyessy P, Kuhle J, Düzel E, Vielhaber S, Schmidt C, Heinius A, et al. Ratio and index of Neurofilament light chain indicate its origin in Guillain-Barré Syndrome. Ann Clin Transl Neurol. 2020;7(11):2213-2220. PMID 33030817; PMCID PMC7664266; doi:10.1002/acn3.51207.", "link": "https://doi.org/10.1002/acn3.51207", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Krief2023", "text": "Krief N, Gabriel R, Cauquil C, Adams D, Fargeot G, Maisonobe T, et al. Clinical features and maternal and fetal outcomes in women with Guillain-Barré syndrome in pregnancy. J Neurol. 2023;270(9):4498-4506. PMID 37294323; PMCID PMC10252168; doi:10.1007/s00415-023-11808-w.", "link": "https://doi.org/10.1007/s00415-023-11808-w", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Kuijf2005", "text": "Kuijf ML, van Doorn PA, Tio-Gillen AP, Geleijns K, Ang CW, Hooijkaas H, et al. Diagnostic value of anti-GM1 ganglioside serology and validation of the INCAT-ELISA. J Neurol Sci. 2005;239(1):37-44. PMID 16154154; doi:10.1016/j.jns.2005.07.009.", "link": "https://doi.org/10.1016/j.jns.2005.07.009", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Kuitwaard2009JNNP", "text": "Kuitwaard K, van Koningsveld R, Ruts L, Jacobs BC, van Doorn PA. Recurrent Guillain-Barré syndrome. J Neurol Neurosurg Psychiatry. 2009;80(1):56-9. PMID 18931012; doi:10.1136/jnnp.2008.156463.", "link": "https://doi.org/10.1136/jnnp.2008.156463", "areas": ["A", "E", "G", "H"], "unverified": false, "validated": "PubMed", "aliases": ["Kuitwaard2009Recurrent"]}, {"key": "Kuitwaard2009JPNS", "text": "Kuitwaard K, Bos-Eyssen ME, Blomkwist-Markens PH, van Doorn PA. Recurrences, vaccinations and long-term symptoms in GBS and CIDP. J Peripher Nerv Syst. 2009;14(4):310-5. PMID 20021573; doi:10.1111/j.1529-8027.2009.00243.x.", "link": "https://doi.org/10.1111/j.1529-8027.2009.00243.x", "areas": ["A", "B", "E", "G"], "unverified": false, "validated": "PubMed", "aliases": ["Kuitwaard2009", "Kuitwaard2009Survey", "Kuitwaard2009Vaccine"]}, {"key": "Kuitwaard2009Pharm", "text": "Kuitwaard K, de Gelder J, Tio-Gillen AP, Hop WC, van Gelder T, van Toorenenbergen AW, et al. Pharmacokinetics of intravenous immunoglobulin and outcome in Guillain-Barré syndrome. Ann Neurol. 2009;66(5):597-603. PMID 19938102; doi:10.1002/ana.21737.", "link": "https://doi.org/10.1002/ana.21737", "areas": ["E", "G"], "unverified": false, "validated": "PubMed", "aliases": ["Kuitwaard2009IgG"]}, {"key": "Kumar2026", "text": "Kumar A, Saini L, Gunasekaran PK, Tiwari S, Agarwal S, Gupta R, et al. Fine Motor Outcomes in Children with Guillain-Barré Syndrome. Indian J Pediatr. 2026;93(3):282-287. PMID 41417155; doi:10.1007/s12098-025-05891-2.", "link": "https://doi.org/10.1007/s12098-025-05891-2", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Kumta2022", "text": "Kumta N, Carter A, Schuller P, Evans H, Graffunder A. Locked-in Guillain-Barré syndrome: 'my living nightmare'. Pract Neurol. 2022;22(2):126-128. PMID 34716224; doi:10.1136/practneurol-2021-003110.", "link": "https://doi.org/10.1136/practneurol-2021-003110", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Kushner2023", "text": "Kushner DS, Johnson-Greene D, Felix ER, Miller C, Cordero MK, Thomashaw SA. Predictors of discharge to home/community following inpatient-rehabilitation in a US national sample of Guillain-Barre-Syndrome patients. PLoS One. 2023;18(5):e0286296. PMID 37228065; PMCID PMC10212147; doi:10.1371/journal.pone.0286296.", "link": "https://doi.org/10.1371/journal.pone.0286296", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Kusunoki2011", "text": "Kusunoki S, Kaida K. Antibodies against ganglioside complexes in Guillain-Barré syndrome and related disorders. J Neurochem. 2011;116(5):828-32. PMID 21214559; doi:10.1111/j.1471-4159.2010.07029.x.", "link": "https://doi.org/10.1111/j.1471-4159.2010.07029.x", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Kuwabara1998", "text": "Kuwabara S, Asahina M, Koga M, Mori M, Yuki N, Hattori T. Two patterns of clinical recovery in Guillain-Barré syndrome with IgG anti-GM1 antibody. Neurology. 1998;51(6):1656-60. PMID 9855518; doi:10.1212/wnl.51.6.1656.", "link": "https://doi.org/10.1212/wnl.51.6.1656", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Kuwabara1998GM1", "text": "Kuwabara S, Yuki N, Koga M, Hattori T, Matsuura D, Miyake M, et al. IgG anti-GM1 antibody is associated with reversible conduction failure and axonal degeneration in Guillain-Barré syndrome. Ann Neurol. 1998;44(2):202-8. PMID 9708542; doi:10.1002/ana.410440210.", "link": "https://doi.org/10.1002/ana.410440210", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Kuwabara1999", "text": "Kuwabara S, Ogawara K, Koga M, Mori M, Hattori T, Yuki N. Hyperreflexia in Guillain-Barré syndrome: relation with acute motor axonal neuropathy and anti-GM1 antibody. J Neurol Neurosurg Psychiatry. 1999;67(2):180-4. PMID 10406985; PMCID PMC1736477; doi:10.1136/jnnp.67.2.180.", "link": "https://doi.org/10.1136/jnnp.67.2.180", "areas": ["C", "D"], "unverified": false, "validated": "PubMed"}, {"key": "Kuwabara2001", "text": "Kuwabara S, Ogawara K, Mizobuchi K, Mori M, Hattori T. Mechanisms of early and late recovery in acute motor axonal neuropathy. Muscle Nerve. 2001;24(2):288-91. PMID 11180213; doi:10.1002/1097-4598(200102)24:2<288::aid-mus150>3.0.co;2-h.", "link": "https://doi.org/10.1002/1097-4598(200102)24:2<288::aid-mus150>3.0.co", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Kuwabara2004Cj", "text": "Kuwabara S, Ogawara K, Misawa S, Koga M, Mori M, Hiraga A, et al. Does Campylobacter jejuni infection elicit \"demyelinating\" Guillain-Barre syndrome?. Neurology. 2004;63(3):529-33. PMID 15304587; doi:10.1212/01.wnl.0000133205.05169.04.", "link": "https://doi.org/10.1212/01.wnl.0000133205.05169.04", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Kuwabara2004Sensory", "text": "Kuwabara S, Ogawara K, Misawa S, Mizobuchi K, Sung JY, Kitano Y, et al. Sensory nerve conduction in demyelinating and axonal Guillain-Barré syndromes. Eur Neurol. 2004;51(4):196-8. PMID 15159599; doi:10.1159/000078485.", "link": "https://doi.org/10.1159/000078485", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Kuwabara2013", "text": "Kuwabara S, Yuki N. Axonal Guillain-Barré syndrome: concepts and controversies. Lancet Neurol. 2013;12(12):1180-8. PMID 24229616; doi:10.1016/S1474-4422(13)70215-1.", "link": "https://doi.org/10.1016/s1474-4422(13)70215-1", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Kuwabara2017", "text": "Kuwabara S, Sekiguchi Y, Misawa S. Electrophysiology in Fisher syndrome. Clin Neurophysiol. 2017;128(1):215-219. PMID 27923188; doi:10.1016/j.clinph.2016.11.009.", "link": "https://doi.org/10.1016/j.clinph.2016.11.009", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Kuwabara2024", "text": "Kuwabara S, Kusunoki S, Kuwahara M, Yamano Y, Nishida Y, Ishida H, et al. Efficacy and safety of eculizumab in Guillain-Barré syndrome: A phase 3, multicenter, double-blind, randomized, placebo-controlled clinical trial. J Peripher Nerv Syst. 2024;29(3):339-349. PMID 38987228; doi:10.1111/jns.12646.", "link": "https://doi.org/10.1111/jns.12646", "areas": ["I"], "unverified": false, "validated": "PubMed"}, {"key": "Kwong2013", "text": "Kwong JC, Vasa PP, Campitelli MA, Hawken S, Wilson K, Rosella LC, et al. Risk of Guillain-Barré syndrome after seasonal influenza vaccination and influenza health-care encounters: a self-controlled study. Lancet Infect Dis. 2013;13(9):769-76. PMID 23810252; doi:10.1016/S1473-3099(13)70104-X.", "link": "https://doi.org/10.1016/s1473-3099(13)70104-x", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Latronico2011", "text": "Latronico N, Bolton CF. Critical illness polyneuropathy and myopathy: a major cause of muscle weakness and paralysis. Lancet Neurol. 2011;10(10):931-41. PMID 21939902; doi:10.1016/S1474-4422(11)70178-8.", "link": "https://doi.org/10.1016/s1474-4422(11)70178-8", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Lawn1999", "text": "Lawn ND, Wijdicks EF. Tracheostomy in Guillain-Barré syndrome. Muscle Nerve. 1999;22(8):1058-62. PMID 10417787; doi:10.1002/(sici)1097-4598(199908)22:8<1058::aid-mus8>3.0.co;2-g.", "link": "https://doi.org/10.1002/(sici)1097-4598(199908)22:8<1058::aid-mus8>3.0.co", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Lawn2001", "text": "Lawn ND, Fletcher DD, Henderson RD, Wolter TD, Wijdicks EF. Anticipating mechanical ventilation in Guillain-Barré syndrome. Arch Neurol. 2001;58(6):893-8. PMID 11405803; doi:10.1001/archneur.58.6.893.", "link": "https://doi.org/10.1001/archneur.58.6.893", "areas": ["F", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Lawton2019", "text": "Lawton AJ, Lee KA, Cheville AL, Ferrone ML, Rades D, Balboni TA, et al. Assessment and Management of Patients With Metastatic Spinal Cord Compression: A Multidisciplinary Review. J Clin Oncol. 2019;37(1):61-71. PMID 30395488; doi:10.1200/JCO.2018.78.1211.", "link": "https://doi.org/10.1200/jco.2018.78.1211", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "LeGuennec2014", "text": "Le Guennec L, Brisset M, Viala K, Essardy F, Maisonobe T, Rohaut B, et al. Post-traumatic stress symptoms in Guillain-Barré syndrome patients after prolonged mechanical ventilation in ICU: a preliminary report. J Peripher Nerv Syst. 2014;19(3):218-23. PMID 25403788; doi:10.1111/jns.12087.", "link": "https://doi.org/10.1111/jns.12087", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Leonhard2019", "text": "Leonhard SE, Mandarakas MR, Gondim FAA, Bateman K, Ferreira MLB, Cornblath DR, et al. Diagnosis and management of Guillain-Barré syndrome in ten steps. Nat Rev Neurol. 2019;15(11):671-683. PMID 31541214; PMCID PMC6821638; doi:10.1038/s41582-019-0250-9.", "link": "https://doi.org/10.1038/s41582-019-0250-9", "areas": ["A", "B", "C", "D", "E", "F", "G", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Leonhard2022IGOS", "text": "Leonhard SE, van der Eijk AA, Andersen H, Antonini G, Arends S, Attarian S, et al. An International Perspective on Preceding Infections in Guillain-Barré Syndrome: The IGOS-1000 Cohort. Neurology. 2022;99(12):e1299-e1313. PMID 35981895; doi:10.1212/WNL.0000000000200885.", "link": "https://doi.org/10.1212/wnl.0000000000200885", "areas": ["A", "B", "C"], "unverified": false, "validated": "PubMed"}, {"key": "Leonhard2024", "text": "Leonhard SE, Papri N, Querol L, Rinaldi S, Shahrizaila N, Jacobs BC. Guillain-Barré syndrome. Nat Rev Dis Primers. 2024;10(1):97. PMID 39702645; doi:10.1038/s41572-024-00580-4.", "link": "https://doi.org/10.1038/s41572-024-00580-4", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Levison2022Mortality", "text": "Levison LS, Thomsen RW, Andersen H. Increased mortality following Guillain-Barré syndrome: A population-based cohort study. Eur J Neurol. 2022;29(4):1145-1154. PMID 34874588; doi:10.1111/ene.15204.", "link": "https://doi.org/10.1111/ene.15204", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Levison2023Depression", "text": "Levison LS, Thomsen RW, Andersen H. Increased risk of depression after Guillain-Barré syndrome. Muscle Nerve. 2023;67(6):497-505. PMID 36906822; doi:10.1002/mus.27816.", "link": "https://doi.org/10.1002/mus.27816", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Liang2026RSV", "text": "Liang C, Judy J, Chilson EL, Kelly SP, Liu Q, Maynard JD, et al. Estimating Risk of Guillain-Barré Syndrome in US Medicare-enrolled Older Adults Following Medically Attended Respiratory Syncytial Virus Disease: A Self-controlled Case Series Analysis. Clin Infect Dis. 2026;82(4):e799-e806. PMID 41234154; PMCID PMC13169517; doi:10.1093/cid/ciaf621.", "link": "https://doi.org/10.1093/cid/ciaf621", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Lin2005", "text": "Lin SH. Thyrotoxic periodic paralysis. Mayo Clin Proc. 2005;80(1):99-105. PMID 15667036; doi:10.1016/S0025-6196(11)62965-0.", "link": "https://doi.org/10.1016/s0025-6196(11)62965-0", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Liu2015", "text": "Liu J, Wang LN, McNicol ED. Pharmacological treatment for pain in Guillain-Barré syndrome. Cochrane Database Syst Rev. 2015;2015(4):CD009950. PMID 25855461; PMCID PMC6361619; doi:10.1002/14651858.CD009950.pub3.", "link": "https://doi.org/10.1002/14651858.cd009950.pub3", "areas": ["F", "G"], "unverified": false, "validated": "PubMed", "aliases": ["Liu2015Pain"]}, {"key": "Liu2021Ultrasound", "text": "Liu L, Ye Y, Wang L, Song X, Cao J, Qi Y, et al. Nerve ultrasound evaluation of Guillain-Barré syndrome subtypes in northern China. Muscle Nerve. 2021;64(5):560-566. PMID 34355400; doi:10.1002/mus.27386.", "link": "https://doi.org/10.1002/mus.27386", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Liu2025Sensory", "text": "Liu S, Chu H, Peng B, Zeng Y, Liu J, Lu Z, et al. Clinical and electrophysiological features of pure sensory Guillain-Barré syndrome: retrospective analysis of 22 patients across 14 provinces in Southern China. BMC Neurol. 2025;25(1):87. PMID 40050755; PMCID PMC11883962; doi:10.1186/s12883-025-04103-w.", "link": "https://doi.org/10.1186/s12883-025-04103-w", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Lloyd2026RSV", "text": "Lloyd PC, Shah PB, Zhang HT, Shah N, Nair N, Wan Z, et al. Safety monitoring of health outcomes following RSVPreF3 + AS01 and RSVPreF vaccination among Medicare beneficiaries aged 65 years and older in the United States, 2023-2024. Vaccine. 2026;79:128459. PMID 41833132; doi:10.1016/j.vaccine.2026.128459.", "link": "https://doi.org/10.1016/j.vaccine.2026.128459", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "LopezHernandez2022", "text": "López-Hernández JC, Galnares-Olalde JA, Gutiérrez A, Estrada SA, García-Grimshaw M, Vargas-Cañas ES. Guillain-Barre syndrome in Mexico: clinical features and validation of Brighton Collaboration Group criteria. Rev Neurol. 2022;74(8):258-264. PMID 35383873; PMCID PMC11502191; doi:10.33588/rn.7408.2021437.", "link": "https://doi.org/10.33588/rn.7408.2021437", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Luijten2021", "text": "Luijten LWG, Leonhard SE, van der Eijk AA, Doets AY, Appeltshauser L, Arends S, et al. Guillain-Barré syndrome after SARS-CoV-2 infection in an international prospective cohort study. Brain. 2021;144(11):3392-3404. PMID 34553216; PMCID PMC8677532; doi:10.1093/brain/awab279.", "link": "https://doi.org/10.1093/brain/awab279", "areas": ["A", "I"], "unverified": false, "validated": "PubMed"}, {"key": "Luijten2023", "text": "Luijten LWG, Doets AY, Arends S, Dimachkie MM, Gorson KC, Islam B, et al. Modified Erasmus GBS Respiratory Insufficiency Score: a simplified clinical tool to predict the risk of mechanical ventilation in Guillain-Barré syndrome. J Neurol Neurosurg Psychiatry. 2023;94(4):300-308. PMID 36428088; doi:10.1136/jnnp-2022-329937.", "link": "https://doi.org/10.1136/jnnp-2022-329937", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Lunemann2015", "text": "Lünemann JD, Nimmerjahn F, Dalakas MC. Intravenous immunoglobulin in neurology--mode of action and clinical efficacy. Nat Rev Neurol. 2015;11(2):80-9. PMID 25561275; doi:10.1038/nrneurol.2014.253.", "link": "https://doi.org/10.1038/nrneurol.2014.253", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Luo2020", "text": "Luo H, Hong S, Li M, Wang L, Jiang L. Risk factors for mechanical ventilation in children with Guillain-Barré syndrome. Muscle Nerve. 2020;62(2):214-218. PMID 32367533; doi:10.1002/mus.26905.", "link": "https://doi.org/10.1002/mus.26905", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Maheshwari2018", "text": "Maheshwari A, Sharma RR, Prinja S, Hans R, Modi M, Sharma N, et al. Cost-minimization analysis in the Indian subcontinent for treating Guillain Barre Syndrome patients with therapeutic plasma exchange as compared to intravenous immunoglobulin. J Clin Apher. 2018;33(6):631-637. PMID 30329175; doi:10.1002/jca.21646.", "link": "https://doi.org/10.1002/jca.21646", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "MartinAguilar2020", "text": "Martín-Aguilar L, Camps-Renom P, Lleixà C, Pascual-Goñi E, Díaz-Manera J, Rojas-García R, et al. Serum neurofilament light chain predicts long-term prognosis in Guillain-Barré syndrome patients. J Neurol Neurosurg Psychiatry. 2020. PMID 33154183; doi:10.1136/jnnp-2020-323899.", "link": "https://doi.org/10.1136/jnnp-2020-323899", "areas": ["D", "G", "I"], "unverified": false, "validated": "PubMed"}, {"key": "Martins2010", "text": "Martins RP, Barbarot N, Coquerel N, Baruteau AE, Kolev I, Vérin M. Takotsubo cardiomyopathy associated with Guillain-Barré syndrome: a differential diagnosis from dysautonomia not to be missed. J Neurol Sci. 2010;291(1-2):100-2. PMID 20117795; doi:10.1016/j.jns.2010.01.005.", "link": "https://doi.org/10.1016/j.jns.2010.01.005", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "MasaCalles2018", "text": "Masa-Calles J, Torner N, López-Perea N, Torres de Mier MV, Fernández-Martínez B, Cabrerizo M, et al. Acute flaccid paralysis (AFP) surveillance: challenges and opportunities from 18 years' experience, Spain, 1998 to 2015. Euro Surveill. 2018;23(47):1700423. PMID 30482263; PMCID PMC6341937; doi:10.2807/1560-7917.ES.2018.23.47.1700423.", "link": "https://doi.org/10.2807/1560-7917.es.2018.23.47.1700423", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Mayman2026", "text": "Mayman N, Schneider ALC, Karam C. Re-treatment of Guillain-Barré syndrome (GBS) in the post-SID-GBS trial era. J Neurol Sci. 2026;491:126209. PMID 42858721; doi:10.1016/j.jns.2026.126209.", "link": "https://doi.org/10.1016/j.jns.2026.126209", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "McCarthy2001", "text": "McCarthy N, Giesecke J. Incidence of Guillain-Barré syndrome following infection with Campylobacter jejuni. Am J Epidemiol. 2001;153(6):610-4. PMID 11257070; doi:10.1093/aje/153.6.610.", "link": "https://doi.org/10.1093/aje/153.6.610", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "McGonigal2022", "text": "McGonigal R, Campbell CI, Barrie JA, Yao D, Cunningham ME, Crawford CL, et al. Schwann cell nodal membrane disruption triggers bystander axonal degeneration in a Guillain-Barré syndrome mouse model. J Clin Invest. 2022;132(14):e158524. PMID 35671105; PMCID PMC9282931; doi:10.1172/JCI158524.", "link": "https://doi.org/10.1172/jci158524", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "McGrogan2009", "text": "McGrogan A, Madle GC, Seaman HE, de Vries CS. The epidemiology of Guillain-Barré syndrome worldwide. A systematic literature review. Neuroepidemiology. 2009;32(2):150-63. PMID 19088488; doi:10.1159/000184748.", "link": "https://doi.org/10.1159/000184748", "areas": ["A", "H"], "unverified": false, "validated": "PubMed"}, {"key": "McKhann1991", "text": "McKhann GM, Cornblath DR, Ho T, Li CY, Bai AY, Wu HS, et al. Clinical and electrophysiological aspects of acute paralytic disease of children and young adults in northern China. Lancet. 1991;338(8767):593-7. PMID 1679153; doi:10.1016/0140-6736(91)90606-p.", "link": "https://doi.org/10.1016/0140-6736(91)90606-p", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "McKhann1993", "text": "McKhann GM, Cornblath DR, Griffin JW, Ho TW, Li CY, Jiang Z, et al. Acute motor axonal neuropathy: a frequent cause of acute flaccid paralysis in China. Ann Neurol. 1993;33(4):333-42. PMID 8489203; doi:10.1002/ana.410330402.", "link": "https://doi.org/10.1002/ana.410330402", "areas": ["A", "C"], "unverified": false, "validated": "PubMed"}, {"key": "Memon2026", "text": "Memon AB, Lisak RP. Use of Therapeutic Plasma Exchange in Autoimmune Neuromuscular Disorders. Muscle Nerve. 2026;74(2):302-316. PMID 41928376; doi:10.1002/mus.70216.", "link": "https://doi.org/10.1002/mus.70216", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Merkies1999", "text": "Merkies IS, Schmitz PI, Samijn JP, van der Meché FG, van Doorn PA. Fatigue in immune-mediated polyneuropathies. European Inflammatory Neuropathy Cause and Treatment (INCAT) Group. Neurology. 1999;53(8):1648-54. PMID 10563607; doi:10.1212/wnl.53.8.1648.", "link": "https://doi.org/10.1212/wnl.53.8.1648", "areas": ["A", "G"], "unverified": false, "validated": "PubMed", "aliases": ["Merkies1999Fatigue"]}, {"key": "Meythaler1997", "text": "Meythaler JM. Rehabilitation of Guillain-Barré syndrome. Arch Phys Med Rehabil. 1997;78(8):872-9. PMID 9344309; doi:10.1016/s0003-9993(97)90203-3.", "link": "https://doi.org/10.1016/s0003-9993(97)90203-3", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "MierYTeranRomero2018", "text": "Mier-Y-Teran-Romero L, Delorey MJ, Sejvar JJ, Johansson MA. Guillain-Barré syndrome risk among individuals infected with Zika virus: a multi-country assessment. BMC Med. 2018;16(1):67. PMID 29759069; PMCID PMC5952697; doi:10.1186/s12916-018-1052-4.", "link": "https://doi.org/10.1186/s12916-018-1052-4", "areas": ["A", "B"], "unverified": false, "validated": "PubMed"}, {"key": "Miller1988", "text": "Miller RG, Peterson GW, Daube JR, Albers JW. Prognostic value of electrodiagnosis in Guillain-Barré syndrome. Muscle Nerve. 1988;11(7):769-74. PMID 3405243; doi:10.1002/mus.880110714.", "link": "https://doi.org/10.1002/mus.880110714", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Min2024", "text": "Min YG, Hong YH, Rajabally YA, Sung JJ. Timing of intravenous immunoglobulin treatment and outcome in Guillain-Barré syndrome: Is time nerve? Muscle Nerve. 2024;70(6):1215-1222. PMID 39360628; doi:10.1002/mus.28271.", "link": "https://doi.org/10.1002/mus.28271", "areas": ["I"], "unverified": false, "validated": "PubMed"}, {"key": "Misawa2018", "text": "Misawa S, Kuwabara S, Sato Y, Yamaguchi N, Nagashima K, Katayama K, et al. Safety and efficacy of eculizumab in Guillain-Barré syndrome: a multicentre, double-blind, randomised phase 2 trial. Lancet Neurol. 2018;17(6):519-529. PMID 29685815; doi:10.1016/S1474-4422(18)30114-5.", "link": "https://doi.org/10.1016/s1474-4422(18)30114-5", "areas": ["E", "I"], "unverified": false, "validated": "PubMed"}, {"key": "Mohammad2025", "text": "Mohammad QD, Islam Z, Papri N, Hayat S, Jahan I, Azad KAK, et al. Results From a Phase 1 Study Evaluating the Safety, Tolerability, Pharmacokinetics, Pharmacodynamics, and Efficacy of ANX005, a C1q Inhibitor, in Patients With Guillain-Barré Syndrome. J Peripher Nerv Syst. 2025;30(1):e70009. PMID 40000167; PMCID PMC11886941; doi:10.1111/jns.70009.", "link": "https://doi.org/10.1111/jns.70009", "areas": ["I"], "unverified": false, "validated": "PubMed"}, {"key": "Mori2000Hinfluenzae", "text": "Mori M, Kuwabara S, Miyake M, Noda M, Kuroki H, Kanno H, et al. Haemophilus influenzae infection and Guillain-Barré syndrome. Brain. 2000;123(Pt 10):2171-8. PMID 11004133; doi:10.1093/brain/123.10.2171.", "link": "https://doi.org/10.1093/brain/123.10.2171", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Mori2001MFS", "text": "Mori M, Kuwabara S, Fukutake T, Yuki N, Hattori T. Clinical features and prognosis of Miller Fisher syndrome. Neurology. 2001;56(8):1104-6. PMID 11320188; doi:10.1212/wnl.56.8.1104.", "link": "https://doi.org/10.1212/wnl.56.8.1104", "areas": ["C", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Mori2007", "text": "Mori M, Kuwabara S, Fukutake T, Hattori T. Intravenous immunoglobulin therapy for Miller Fisher syndrome. Neurology. 2007;68(14):1144-6. PMID 17404197; doi:10.1212/01.wnl.0000258673.31824.61.", "link": "https://doi.org/10.1212/01.wnl.0000258673.31824.61", "areas": ["E", "I", "G"], "unverified": false, "validated": "PubMed", "aliases": ["Mori2007MFS"]}, {"key": "Moulin1997", "text": "Moulin DE, Hagen N, Feasby TE, Amireh R, Hahn A. Pain in Guillain-Barré syndrome. Neurology. 1997;48(2):328-31. PMID 9040715; doi:10.1212/wnl.48.2.328.", "link": "https://doi.org/10.1212/wnl.48.2.328", "areas": ["F", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Mulkey2010", "text": "Mulkey SB, Glasier CM, El-Nabbout B, Walters WD, Ionita C, McCarthy MH, et al. Nerve root enhancement on spinal MRI in pediatric Guillain-Barré syndrome. Pediatr Neurol. 2010;43(4):263-9. PMID 20837305; doi:10.1016/j.pediatrneurol.2010.05.011.", "link": "https://doi.org/10.1016/j.pediatrneurol.2010.05.011", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Muller2003", "text": "Müller HD, Beckmann A, Schröder JM. Inflammatory infiltrates in the spinal cord of patients with Guillain-Barré syndrome. Acta Neuropathol. 2003;106(6):509-17. PMID 13680278; doi:10.1007/s00401-003-0768-0.", "link": "https://doi.org/10.1007/s00401-003-0768-0", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Munayco2019", "text": "Munayco CV, Soto Cabezas MG, Reyes MF, Arica Gutiérrez JA, Napanga Saldaña O. [Epidemiology of guillain-barré syndrome in Peru]. Rev Peru Med Exp Salud Publica. 2019;36(1):10-16. PMID 31116321; doi:10.17843/rpmesp.2019.361.3729.", "link": "https://doi.org/10.17843/rpmesp.2019.361.3729", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Munayco2020", "text": "Munayco CV, Gavilan RG, Ramirez G, Loayza M, Miraval ML, Whitehouse E, et al. Large Outbreak of Guillain-Barré Syndrome, Peru, 2019. Emerg Infect Dis. 2020;26(11):2778-2780. PMID 33079047; PMCID PMC7588531; doi:10.3201/eid2611.200127.", "link": "https://doi.org/10.3201/eid2611.200127", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Murphy2020", "text": "Murphy OC, Pardo CA. Acute Flaccid Myelitis: A Clinical Review. Semin Neurol. 2020;40(2):211-218. PMID 32143233; doi:10.1055/s-0040-1705123.", "link": "https://doi.org/10.1055/s-0040-1705123", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Murphy2021", "text": "Murphy OC, Messacar K, Benson L, Bove R, Carpenter JL, Crawford T, et al. Acute flaccid myelitis: cause, diagnosis, and management. Lancet. 2021;397(10271):334-346. PMID 33357469; PMCID PMC7909727; doi:10.1016/S0140-6736(20)32723-9.", "link": "https://doi.org/10.1016/s0140-6736(20)32723-9", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Mygland2010", "text": "Mygland A, Ljøstad U, Fingerle V, Rupprecht T, Schmutzhard E, Steiner I, et al. EFNS guidelines on the diagnosis and management of European Lyme neuroborreliosis. Eur J Neurol. 2010;17(1):8-16, e1-4. PMID 19930447; doi:10.1111/j.1468-1331.2009.02862.x.", "link": "https://doi.org/10.1111/j.1468-1331.2009.02862.x", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Nachamkin2008", "text": "Nachamkin I, Shadomy SV, Moran AP, Cox N, Fitzgerald C, Ung H, et al. Anti-ganglioside antibody induction by swine (A/NJ/1976/H1N1) and other influenza vaccines: insights into vaccine-associated Guillain-Barré syndrome. J Infect Dis. 2008;198(2):226-33. PMID 18522505; doi:10.1086/589624.", "link": "https://doi.org/10.1086/589624", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Nagashima2004", "text": "Nagashima T, Koga M, Odaka M, Hirata K, Yuki N. Clinical correlates of serum anti-GT1a IgG antibodies. J Neurol Sci. 2004;219(1-2):139-45. PMID 15050449; doi:10.1016/j.jns.2004.01.005.", "link": "https://doi.org/10.1016/j.jns.2004.01.005", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Nagashima2007", "text": "Nagashima T, Koga M, Odaka M, Hirata K, Yuki N. Continuous spectrum of pharyngeal-cervical-brachial variant of Guillain-Barré syndrome. Arch Neurol. 2007;64(10):1519-23. PMID 17923636; doi:10.1001/archneur.64.10.1519.", "link": "https://doi.org/10.1001/archneur.64.10.1519", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Nasreen2025", "text": "Nasreen S, Jiang Y, Lu H, Lee A, Cutland CL, Gentile A, et al. Risk of Guillain-Barré syndrome after COVID-19 vaccination or SARS-CoV-2 infection: A multinational self-controlled case series study. Vaccine. 2025;60:127291. PMID 40440921; doi:10.1016/j.vaccine.2025.127291.", "link": "https://doi.org/10.1016/j.vaccine.2025.127291", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "NCT01582763", "text": "Erasmus Medical Center. International Guillain-Barré Syndrome Outcome Study (IGOS). ClinicalTrials.gov NCT01582763; observational; completed (primary completion 2024-09-01); enrolment 2000.", "link": "", "areas": ["I"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT03943589", "text": "Hansa Biopharma AB. An Open-label, Single Arm, Multi-centre, Phase II Study Investigating Safety, Tolerability, Efficacy, Pharmacodynamics and Pharmacokinetics of Imlifidase in Patients With Guillain-Barré Syndrome, in Comparison With Matched Control Patients. ClinicalTrials.gov NCT03943589; completed 2024-02-27; enrolment 30; results posted.", "link": "", "areas": ["I"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT04701164", "text": "Annexon, Inc. Efficacy and Safety of ANX005 in Subjects With Guillain-Barré Syndrome. ClinicalTrials.gov NCT04701164; phase 3; completed (primary completion 2024-04-20); enrolment 242; Bangladesh and Philippines; no results posted (last update 2025-05-29).", "link": "", "areas": ["I"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT04752566", "text": "Alexion Pharmaceuticals, Inc. A Phase 3, Prospective, Multicenter, Double Blind, Randomized, Placebo Controlled Study to Evaluate the Efficacy and Safety of Eculizumab in Patients With Guillain-Barré Syndrome (GBS). ClinicalTrials.gov NCT04752566; completed 2022-08-03; enrolment 57; results posted.", "link": "", "areas": ["I"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT05114941", "text": "The First Affiliated Hospital of Zhengzhou University. Comparison of the Efficacy and Safety of Immunoadsorption and Intravenous Immunoglobulin for Guillain-Barre Syndrome (GBS-PRAISING). ClinicalTrials.gov NCT05114941; not yet recruiting (last update 2025-03-12); estimated enrolment 204.", "link": "", "areas": ["I"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT05494619", "text": "Hoffmann-La Roche. A Study to Evaluate the Efficacy, Safety, Pharmacokinetics, and Pharmacodynamics of Crovalimab in Participants With Guillain-Barré Syndrome (GBS). ClinicalTrials.gov NCT05494619; phase 3; withdrawn, enrolment 0.", "link": "", "areas": ["I"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT05701189", "text": "Chafic Karam. Evaluating Efgartigimod in Patients With Guillain-Barré Syndrome. ClinicalTrials.gov NCT05701189; phase 2; withdrawn (enrolment difficulty), enrolment 0.", "link": "", "areas": ["I"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT07020819", "text": "Annexon, Inc. An Open Label Clinical Study to Evaluate Tanruprubart (Also Commonly Known as ANX005) in Participants With Guillain-Barré Syndrome (FORWARD Study). ClinicalTrials.gov NCT07020819; phase 3; recruiting (last update 2026-10-26); estimated enrolment 30.", "link": "", "areas": ["I"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT07806916", "text": "Beijing Tiantan Hospital. Efficacy and Safety of Efgartigimod in the Treatment of Guillain-Barré Syndrome (GREAT). ClinicalTrials.gov NCT07806916; phase 2; not yet recruiting (last update 2026-09-18); estimated enrolment 110.", "link": "", "areas": ["I"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "NCT07821762", "text": "argenx. A Study of Empasiprubart as Add-On Therapy to IVIg in Adult Participants With Guillain-Barré Syndrome. ClinicalTrials.gov NCT07821762; phase 2; not yet recruiting (last update 2026-10-28); estimated enrolment 63.", "link": "", "areas": ["I"], "unverified": false, "validated": "ClinicalTrials.gov"}, {"key": "Nedkova2021", "text": "Nedkova V, Gutiérrez-Gutiérrez G, Navacerrada-Barrero FJ, Berciano J, Casasnovas C. Re-evaluating the accuracy of optimized electrodiagnostic criteria in very early Guillain-Barré syndrome: a sequential study. Acta Neurol Belg. 2021;121(5):1141-1150. PMID 33599939; doi:10.1007/s13760-021-01603-7.", "link": "https://doi.org/10.1007/s13760-021-01603-7", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Netto2011Mortality", "text": "Netto AB, Taly AB, Kulkarni GB, Rao UG, Rao S. Mortality in mechanically ventilated patients of Guillain Barré Syndrome. Ann Indian Acad Neurol. 2011;14(4):262-6. PMID 22346014; PMCID PMC3271464; doi:10.4103/0972-2327.91942.", "link": "https://doi.org/10.4103/0972-2327.91942", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Netto2011Prognosis", "text": "Netto AB, Taly AB, Kulkarni GB, Uma Maheshwara Rao GS, Rao S. Prognosis of patients with Guillain-Barré syndrome requiring mechanical ventilation. Neurol India. 2011;59(5):707-11. PMID 22019655; doi:10.4103/0028-3886.86545.", "link": "https://doi.org/10.4103/0028-3886.86545", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Netto2017", "text": "Netto AB, Taly AB, Kulkarni GB, Uma Maheshwara Rao GS, Rao S. Complications in mechanically ventilated patients of Guillain-Barre syndrome and their prognostic value. J Neurosci Rural Pract. 2017;8(1):68-73. PMID 28149085; PMCID PMC5225726; doi:10.4103/0976-3147.193542.", "link": "https://doi.org/10.4103/0976-3147.193542", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Netto2025", "text": "Netto AB, Chandrahasa N, Koshy SS, Taly AB. Hyponatremia in Guillain-Barre Syndrome: A Review of Its Pathophysiology and Management. Can J Neurol Sci. 2025;52(1):9-19. PMID 38361453; doi:10.1017/cjn.2024.27.", "link": "https://doi.org/10.1017/cjn.2024.27", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Nguyen1999", "text": "Nguyen DK, Agenarioti-Bélanger S, Vanasse M. Pain and the Guillain-Barré syndrome in children under 6 years old. J Pediatr. 1999;134(6):773-6. PMID 10356150; doi:10.1016/s0022-3476(99)70297-0.", "link": "https://doi.org/10.1016/s0022-3476(99)70297-0", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Nguyen2006", "text": "Nguyen TN, Badjatia N, Malhotra A, Gibbons FK, Qureshi MM, Greenberg SA. Factors predicting extubation success in patients with Guillain-Barré syndrome. Neurocrit Care. 2006;5(3):230-4. PMID 17290095; PMCID PMC3817284; doi:10.1385/NCC:5:3:230.", "link": "https://doi.org/10.1385/ncc:5:3:230", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Nikolaus2022", "text": "Nikolaus M, Kühne F, Tietze A, Thumfart J, Kempf C, Gratopp A, et al. Modified Zipper Method, a Promising Treatment Option in Severe Pediatric Immune-Mediated Neurologic Disorders. J Child Neurol. 2022;37(6):505-516. PMID 35435761; PMCID PMC9160959; doi:10.1177/08830738221089476.", "link": "https://doi.org/10.1177/08830738221089476", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "NINCDS1978", "text": "No authors listed (NINCDS criteria). Criteria for diagnosis of Guillain-Barré syndrome. Ann Neurol. 1978;3(6):565-6. PMID 677829; doi:10.1002/ana.410030628.", "link": "https://doi.org/10.1002/ana.410030628", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Odaka2001", "text": "Odaka M, Yuki N, Hirata K. Anti-GQ1b IgG antibody syndrome: clinical and immunological range. J Neurol Neurosurg Psychiatry. 2001;70(1):50-5. PMID 11118247; PMCID PMC1763462; doi:10.1136/jnnp.70.1.50.", "link": "https://doi.org/10.1136/jnnp.70.1.50", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Odaka2003", "text": "Odaka M, Yuki N, Yamada M, Koga M, Takemi T, Hirata K, et al. Bickerstaff's brainstem encephalitis: clinical features of 62 cases and a subgroup associated with Guillain-Barré syndrome. Brain. 2003;126(Pt 10):2279-90. PMID 12847079; doi:10.1093/brain/awg233.", "link": "https://doi.org/10.1093/brain/awg233", "areas": ["A", "C"], "unverified": false, "validated": "PubMed"}, {"key": "Ogawara2000", "text": "Ogawara K, Kuwabara S, Mori M, Hattori T, Koga M, Yuki N. Axonal Guillain-Barré syndrome: relation to anti-ganglioside antibodies and Campylobacter jejuni infection in Japan. Ann Neurol. 2000;48(4):624-31. PMID 11026446.", "link": "https://pubmed.ncbi.nlm.nih.gov/11026446/", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Ogna2017", "text": "Ogna A, Prigent H, Lejaille M, Samb P, Sharshar T, Annane D, et al. Swallowing and swallowing-breathing interaction as predictors of intubation in Guillain-Barré syndrome. Brain Behav. 2017;7(2):e00611. PMID 28239521; PMCID PMC5318364; doi:10.1002/brb3.611.", "link": "https://doi.org/10.1002/brb3.611", "areas": ["F", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Okahara2024", "text": "Okahara S, Bowe R, Wong P, Johnson M. Caesarean section for a primipara with Guillain-Barré syndrome under combined spinal epidural anaesthesia. BMJ Case Rep. 2024;17(6):e260285. PMID 38926128; doi:10.1136/bcr-2024-260285.", "link": "https://doi.org/10.1136/bcr-2024-260285", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Orlikowski2004", "text": "Orlikowski D, Prigent H, Sharshar T, Lofaso F, Raphael JC. Respiratory dysfunction in Guillain-Barré Syndrome. Neurocrit Care. 2004;1(4):415-22. PMID 16174943; doi:10.1385/NCC:1:4:415.", "link": "https://doi.org/10.1385/ncc:1:4:415", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Orlikowski2006", "text": "Orlikowski D, Sharshar T, Porcher R, Annane D, Raphael JC, Clair B. Prognosis and risk factors of early onset pneumonia in ventilated patients with Guillain-Barré syndrome. Intensive Care Med. 2006;32(12):1962-9. PMID 17019557; doi:10.1007/s00134-006-0332-1.", "link": "https://doi.org/10.1007/s00134-006-0332-1", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Orlikowski2011", "text": "Orlikowski D, Porcher R, Sivadon-Tardy V, Quincampoix JC, Raphaël JC, Durand MC, et al. Guillain-Barré syndrome following primary cytomegalovirus infection: a prospective cohort study. Clin Infect Dis. 2011;52(7):837-44. PMID 21427390; doi:10.1093/cid/cir074.", "link": "https://doi.org/10.1093/cid/cir074", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Osterman1984", "text": "Osterman PO, Fagius J, Lundemo G, Pihlstedt P, Pirskanen R, Sidén A, et al. Beneficial effects of plasma exchange in acute inflammatory polyradiculoneuropathy. Lancet. 1984;2(8415):1296-9. PMID 6150321; doi:10.1016/s0140-6736(84)90819-5.", "link": "https://doi.org/10.1016/s0140-6736(84)90819-5", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Overell2007", "text": "Overell JR, Hsieh ST, Odaka M, Yuki N, Willison HJ. Treatment for Fisher syndrome, Bickerstaff's brainstem encephalitis and related disorders. Cochrane Database Syst Rev. 2007;2007(1):CD004761. PMID 17253522; PMCID PMC8407391; doi:10.1002/14651858.CD004761.pub2.", "link": "https://doi.org/10.1002/14651858.cd004761.pub2", "areas": ["C", "I"], "unverified": false, "validated": "PubMed"}, {"key": "Pacheco2016", "text": "Pacheco LD, Saad AF, Hankins GD, Chiosi G, Saade G. Guillain-Barré Syndrome in Pregnancy. Obstet Gynecol. 2016;128(5):1105-1110. PMID 27741183; doi:10.1097/AOG.0000000000001716.", "link": "https://doi.org/10.1097/aog.0000000000001716", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Pandey2002", "text": "Pandey CK, Bose N, Garg G, Singh N, Baronia A, Agarwal A, et al. Gabapentin for the treatment of pain in guillain-barré syndrome: a double-blinded, placebo-controlled, crossover study. Anesth Analg. 2002;95(6):1719-23, table of contents. PMID 12456446; doi:10.1097/00000539-200212000-00046.", "link": "https://doi.org/10.1097/00000539-200212000-00046", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Pandey2005", "text": "Pandey CK, Raza M, Tripathi M, Navkar DV, Kumar A, Singh UK. The comparative evaluation of gabapentin and carbamazepine for pain management in Guillain-Barré syndrome patients in the intensive care unit. Anesth Analg. 2005;101(1):220-5, table of contents. PMID 15976235; doi:10.1213/01.ANE.0000152186.89020.36.", "link": "https://doi.org/10.1213/01.ane.0000152186.89020.36", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Papri2021", "text": "Papri N, Islam Z, Leonhard SE, Mohammad QD, Endtz HP, Jacobs BC. Guillain-Barré syndrome in low-income and middle-income countries: challenges and prospects. Nat Rev Neurol. 2021;17(5):285-296. PMID 33649531; PMCID PMC7920001; doi:10.1038/s41582-021-00467-y.", "link": "https://doi.org/10.1038/s41582-021-00467-y", "areas": ["A", "E", "H", "I"], "unverified": false, "validated": "PubMed"}, {"key": "Papri2022mEGOS", "text": "Papri N, Doets AY, Mohammad QD, Endtz HP, Lingsma HF, Jacobs BC, et al. Validation and adjustment of modified Erasmus GBS outcome score in Bangladesh. Ann Clin Transl Neurol. 2022;9(8):1264-1275. PMID 35908170; PMCID PMC9380155; doi:10.1002/acn3.51627.", "link": "https://doi.org/10.1002/acn3.51627", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Papri2023", "text": "Papri N, Islam Z, Ara G, Saha T, Leonhard SE, Endtz HP, et al. Management of Guillain-Barré syndrome in Bangladesh: Clinical practice, limitations and recommendations for low- and middle-income countries. J Peripher Nerv Syst. 2023;28(4):564-577. PMID 37698165; doi:10.1111/jns.12597.", "link": "https://doi.org/10.1111/jns.12597", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Papri2024", "text": "Papri N, Doets AY, Luijten L, Mohammad QD, Endtz HP, Lingsma HF, et al. Prediction of respiratory failure and prolonged mechanical ventilation in Guillain-Barré syndrome: A prospective cohort study in Bangladesh. J Peripher Nerv Syst. 2024;29(4):428-440. PMID 39581760; doi:10.1111/jns.12673.", "link": "https://doi.org/10.1111/jns.12673", "areas": ["F", "I"], "unverified": false, "validated": "PubMed"}, {"key": "Papri2024Pain", "text": "Papri N, Mohammed A, Rahman MM, Hasan I, Azam R, Saha T, et al. Pain determinants and quality of life in Guillain-Barre syndrome: a prospective cohort study. BMJ Neurol Open. 2024;6(2):e000925. PMID 39687605; PMCID PMC11647308; doi:10.1136/bmjno-2024-000925.", "link": "https://doi.org/10.1136/bmjno-2024-000925", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Papri2026Mood", "text": "Papri N, Tabassum A, Saha T, Ara G, Rahman M, Hossain S, et al. Anxiety and depression and their impact on functional recovery and quality of life in Guillain-Barré syndrome: a prospective cohort study in Bangladesh. BMJ Open. 2026;16(8):e111943. PMID 42562577; PMCID PMC13448593; doi:10.1136/bmjopen-2025-111943.", "link": "https://doi.org/10.1136/bmjopen-2025-111943", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Parra2016", "text": "Parra B, Lizarazo J, Jiménez-Arango JA, Zea-Vera AF, González-Manrique G, Vargas J, et al. Guillain-Barré Syndrome Associated with Zika Virus Infection in Colombia. N Engl J Med. 2016;375(16):1513-1523. PMID 27705091; doi:10.1056/NEJMoa1605564.", "link": "https://doi.org/10.1056/nejmoa1605564", "areas": ["A", "I"], "unverified": false, "validated": "PubMed"}, {"key": "Patone2021", "text": "Patone M, Handunnetthi L, Saatci D, Pan J, Katikireddi SV, Razvi S, et al. Neurological complications after first dose of COVID-19 vaccines and SARS-CoV-2 infection. Nat Med. 2021;27(12):2144-2153. PMID 34697502; PMCID PMC8629105; doi:10.1038/s41591-021-01556-7.", "link": "https://doi.org/10.1038/s41591-021-01556-7", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Patra2022", "text": "Patra AK, Das M, Choudhury SS, Goswami M, Vanlalzami K. Outcome of Guillain-Barré Syndrome (GBS) During Peripartum Period: A Hospital-Based Observational Study. Ann Indian Acad Neurol. 2022;25(3):417-421. PMID 35936642; PMCID PMC9350787; doi:10.4103/aian.aian_362_22.", "link": "https://doi.org/10.4103/aian.aian_362_22", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Pena2015", "text": "Peña L, Moreno CB, Gutierrez-Alvarez AM. Pain management in Guillain-Barre syndrome: a systematic review. Neurologia. 2015;30(7):433-8. PMID 24929444; doi:10.1016/j.nrl.2014.04.009.", "link": "https://doi.org/10.1016/j.nrl.2014.04.009", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Pentland1994", "text": "Pentland B, Donald SM. Pain in the Guillain-Barré syndrome: a clinical review. Pain. 1994;59(2):159-164. PMID 7892013; doi:10.1016/0304-3959(94)90068-X.", "link": "https://doi.org/10.1016/0304-3959(94)90068-x", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Pfeiffer1999", "text": "Pfeiffer G, Schiller B, Kruse J, Netzer J. Indicators of dysautonomia in severe Guillain-Barré syndrome. J Neurol. 1999;246(11):1015-22. PMID 10631632; doi:10.1007/s004150050506.", "link": "https://doi.org/10.1007/s004150050506", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Piradov2001", "text": "Piradov MA, Pirogov VN, Popova LM, Avdunina IA. Diphtheritic polyneuropathy: clinical analysis of severe forms. Arch Neurol. 2001;58(9):1438-42. PMID 11559316; doi:10.1001/archneur.58.9.1438.", "link": "https://doi.org/10.1001/archneur.58.9.1438", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Pontiff2021", "text": "Pontiff K, Woodward C, McMahon P. Tick Paralysis Case Series: An 11-Year Institutional Case Series. Pediatr Emerg Care. 2021;37(12):589-592. PMID 34908374; doi:10.1097/PEC.0000000000002572.", "link": "https://doi.org/10.1097/pec.0000000000002572", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Poropatich2010", "text": "Poropatich KO, Walker CL, Black RE. Quantifying the association between Campylobacter infection and Guillain-Barré syndrome: a systematic review. J Health Popul Nutr. 2010;28(6):545-52. PMID 21261199; PMCID PMC2995022; doi:10.3329/jhpn.v28i6.6602.", "link": "https://doi.org/10.3329/jhpn.v28i6.6602", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "PSGBS1997", "text": "Plasma Exchange/Sandoglobulin Guillain-Barré Syndrome Trial Group. Randomised trial of plasma exchange, intravenous immunoglobulin, and combined treatments in Guillain-Barré syndrome. Plasma Exchange/Sandoglobulin Guillain-Barré Syndrome Trial Group. Lancet. 1997;349(9047):225-30. PMID 9014908.", "link": "https://pubmed.ncbi.nlm.nih.gov/9014908/", "areas": ["A", "G", "E"], "unverified": false, "validated": "PubMed", "aliases": ["PESGBS1997"]}, {"key": "Puentes2021", "text": "Puentes D, Teijelo D, Stiep TS, Mannava S, Margolesky J. Takotsubo Cardiomyopathy as a Manifestation of Dysautonomia in Guillain-Barré Syndrome: A Case Series and Review of the Literature. Cureus. 2021;13(6):e16069. PMID 34345553; PMCID PMC8324066; doi:10.7759/cureus.16069.", "link": "https://doi.org/10.7759/cureus.16069", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Qinrong2023", "text": "Qinrong H, Yuxia C, Ling L, Huayu L, Lei X, Xiaoli L, et al. Reliability and validity of prognostic indicators for Guillain-Barré syndrome in children. Dev Med Child Neurol. 2023;65(4):563-570. PMID 36175376; doi:10.1111/dmcn.15418.", "link": "https://doi.org/10.1111/dmcn.15418", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Rabinstein2003", "text": "Rabinstein AA, Wijdicks EF. Warning signs of imminent respiratory failure in neurological patients. Semin Neurol. 2003;23(1):97-104. PMID 12870111; doi:10.1055/s-2003-40757.", "link": "https://doi.org/10.1055/s-2003-40757", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Radkowski2024", "text": "Radkowski P, Oniszczuk H, Opolska J, Podlińska I, Pawluczuk M, Onichimowski D. A Review of Muscle Relaxants in Anesthesia in Patients with Neuromuscular Disorders Including Guillain-Barré Syndrome, Myasthenia Gravis, Duchenne Muscular Dystrophy, Charcot-Marie-Tooth Disease, and Inflammatory Myopathies. Med Sci Monit. 2024;30:e945675. PMID 39618072; PMCID PMC11623016; doi:10.12659/MSM.945675.", "link": "https://doi.org/10.12659/msm.945675", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Rajabally2012", "text": "Rajabally YA, Uncini A. Outcome and its predictors in Guillain-Barre syndrome. J Neurol Neurosurg Psychiatry. 2012;83(7):711-8. PMID 22566597; doi:10.1136/jnnp-2011-301882.", "link": "https://doi.org/10.1136/jnnp-2011-301882", "areas": ["A", "F", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Rajabally2015", "text": "Rajabally YA, Durand MC, Mitchell J, Orlikowski D, Nicolas G. Electrophysiological diagnosis of Guillain-Barré syndrome subtype: could a single study suffice?. J Neurol Neurosurg Psychiatry. 2015;86(1):115-9. PMID 24816419; doi:10.1136/jnnp-2014-307815.", "link": "https://doi.org/10.1136/jnnp-2014-307815", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Rajabally2022", "text": "Rajabally YA. Immunoglobulin and Monoclonal Antibody Therapies in Guillain-Barré Syndrome. Neurotherapeutics. 2022;19(3):885-896. PMID 35648286; PMCID PMC9159039; doi:10.1007/s13311-022-01253-4.", "link": "https://doi.org/10.1007/s13311-022-01253-4", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Ramos2021", "text": "Ramos AP, Leonhard SE, Halstead SK, Cuba MA, Castañeda CC, Dioses JA, et al. Guillain-Barré Syndrome Outbreak in Peru 2019 Associated With Campylobacter jejuni Infection. Neurol Neuroimmunol Neuroinflamm. 2021;8(2):e952. PMID 33547152; PMCID PMC8057064; doi:10.1212/NXI.0000000000000952.", "link": "https://doi.org/10.1212/nxi.0000000000000952", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Rao2021", "text": "Rao AK, Sobel J, Chatham-Stephens K, Luquez C. Clinical Guidelines for Diagnosis and Treatment of Botulism, 2021. MMWR Recomm Rep. 2021;70(2):1-30. PMID 33956777. PMCID PMC8112830; doi:10.15585/mmwr.rr7002a1.", "link": "https://doi.org/10.15585/mmwr.rr7002a1", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Rath2021", "text": "Rath J, Zulehner G, Schober B, Grisold A, Krenn M, Cetin H, et al. Cerebrospinal fluid analysis in Guillain-Barré syndrome: value of albumin quotients. J Neurol. 2021;268(9):3294-3300. PMID 33651153; PMCID PMC8357680; doi:10.1007/s00415-021-10479-9.", "link": "https://doi.org/10.1007/s00415-021-10479-9", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Razali2016", "text": "Razali SNO, Arumugam T, Yuki N, Rozalli FI, Goh KJ, Shahrizaila N. Serial peripheral nerve ultrasound in Guillain-Barré syndrome. Clin Neurophysiol. 2016;127(2):1652-1656. PMID 26228791; doi:10.1016/j.clinph.2015.06.030.", "link": "https://doi.org/10.1016/j.clinph.2015.06.030", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Rees1995", "text": "Rees JH, Soudain SE, Gregson NA, Hughes RA. Campylobacter jejuni infection and Guillain-Barré syndrome. N Engl J Med. 1995;333(21):1374-9. PMID 7477117; doi:10.1056/NEJM199511233332102.", "link": "https://doi.org/10.1056/nejm199511233332102", "areas": ["A", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Reeves2014", "text": "Reeves HM, Winters JL. The mechanisms of action of plasma exchange. Br J Haematol. 2014;164(3):342-51. PMID 24172059; doi:10.1111/bjh.12629.", "link": "https://doi.org/10.1111/bjh.12629", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Reilly1991", "text": "Reilly M, Hutchinson M. Suxamethonium is contraindicated in the Guillain-Barré syndrome. J Neurol Neurosurg Psychiatry. 1991;54(11):1018-9. PMID 1800653; PMCID PMC1014636; doi:10.1136/jnnp.54.11.1018-a.", "link": "https://doi.org/10.1136/jnnp.54.11.1018-a", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Rekand2009", "text": "Rekand T, Gramstad A, Vedeler CA. Fatigue, pain and muscle weakness are frequent after Guillain-Barré syndrome and poliomyelitis. J Neurol. 2009;256(3):349-54. PMID 19266144; doi:10.1007/s00415-009-0018-z.", "link": "https://doi.org/10.1007/s00415-009-0018-z", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "ReyesVega2023", "text": "Reyes-Vega MF, Soto-Cabezas MG, Soriano-Moreno AN, Valle-Campos A, Aquino-Peña F, Flores-Jaime N, et al. Clinical features of Guillain-Barré syndrome and factors associated with mortality during the 2019 outbreak in Peru. J Neurol. 2023;270(1):369-376. PMID 36098840; doi:10.1007/s00415-022-11331-4.", "link": "https://doi.org/10.1007/s00415-022-11331-4", "areas": ["A", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Roe2025", "text": "Roe T, Gordon A, Gourd N, Thomas C, Ward J, Osman C, et al. Immunoglobulin unresponsive Guillain-Barré syndrome: rinse or repeat? A systematic review. BMJ Neurol Open. 2025;7(1):e000907. PMID 39950094; PMCID PMC11822392; doi:10.1136/bmjno-2024-000907.", "link": "https://doi.org/10.1136/bmjno-2024-000907", "areas": ["I"], "unverified": false, "validated": "PubMed"}, {"key": "Roodbol2011", "text": "Roodbol J, de Wit MC, Walgaard C, de Hoog M, Catsman-Berrevoets CE, Jacobs BC. Recognizing Guillain-Barre syndrome in preschool children. Neurology. 2011;76(9):807-10. PMID 21357832; doi:10.1212/WNL.0b013e31820e7b62.", "link": "https://doi.org/10.1212/wnl.0b013e31820e7b62", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Roodbol2014Kids", "text": "Roodbol J, de Wit MC, Aarsen FK, Catsman-Berrevoets CE, Jacobs BC. Long-term outcome of Guillain-Barré syndrome in children. J Peripher Nerv Syst. 2014;19(2):121-6. PMID 24863162; doi:10.1111/jns5.12068.", "link": "https://doi.org/10.1111/jns5.12068", "areas": ["G", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Roodbol2017", "text": "Roodbol J, de Wit MY, van den Berg B, Kahlmann V, Drenthen J, Catsman-Berrevoets CE, et al. Diagnosis of Guillain-Barré syndrome in children and validation of the Brighton criteria. J Neurol. 2017;264(5):856-861. PMID 28251358; PMCID PMC5413522; doi:10.1007/s00415-017-8429-8.", "link": "https://doi.org/10.1007/s00415-017-8429-8", "areas": ["D", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Roodbol2023", "text": "Roodbol J, Korinthenberg R, Venema E, de Wit MY, Lingsma HF, Catsman-Berrevoets CE, et al. Predicting respiratory failure and outcome in pediatric Guillain-Barré syndrome. Eur J Paediatr Neurol. 2023;44:18-24. PMID 36931152; doi:10.1016/j.ejpn.2023.02.007.", "link": "https://doi.org/10.1016/j.ejpn.2023.02.007", "areas": ["G", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Ropper1990", "text": "Ropper AH, Wijdicks EF. Blood pressure fluctuations in the dysautonomia of Guillain-Barré syndrome. Arch Neurol. 1990;47(6):706-8. PMID 2346398; doi:10.1001/archneur.1990.00530060120029.", "link": "https://doi.org/10.1001/archneur.1990.00530060120029", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Royal2009", "text": "Royal E, Reynolds FA, Houlden H. What are the experiences of adults returning to work following recovery from Guillain-Barré syndrome? An interpretative phenomenological analysis. Disabil Rehabil. 2009;31(22):1817-27. PMID 19479500; doi:10.1080/09638280902822294.", "link": "https://doi.org/10.1080/09638280902822294", "areas": ["G", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Rudant2018", "text": "Rudant J, Dupont A, Mikaeloff Y, Bolgert F, Coste J, Weill A. Surgery and risk of Guillain-Barré syndrome: A French nationwide epidemiologic study. Neurology. 2018;91(13):e1220-e1227. PMID 30143563; doi:10.1212/WNL.0000000000006246.", "link": "https://doi.org/10.1212/wnl.0000000000006246", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Rudolph2008", "text": "Rudolph T, Larsen JP, Farbu E. The long-term functional status in patients with Guillain-Barré syndrome. Eur J Neurol. 2008;15(12):1332-7. PMID 19049550; doi:10.1111/j.1468-1331.2008.02311.x.", "link": "https://doi.org/10.1111/j.1468-1331.2008.02311.x", "areas": ["F", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Rumalla2017", "text": "Rumalla K, Reddy AY, Letchuman V, Mittal MK. Hyponatremia in Guillain-Barré Syndrome. J Clin Neuromuscul Dis. 2017;18(4):207-217. PMID 28538251; doi:10.1097/CND.0000000000000157.", "link": "https://doi.org/10.1097/cnd.0000000000000157", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Ruts2005", "text": "Ruts L, van Koningsveld R, van Doorn PA. Distinguishing acute-onset CIDP from Guillain-Barré syndrome with treatment related fluctuations. Neurology. 2005;65(1):138-40. PMID 16009902; doi:10.1212/01.wnl.0000167549.09664.b8.", "link": "https://doi.org/10.1212/01.wnl.0000167549.09664.b8", "areas": ["D", "E"], "unverified": false, "validated": "PubMed"}, {"key": "Ruts2007Pain", "text": "Ruts L, van Koningsveld R, Jacobs BC, van Doorn PA. Determination of pain and response to methylprednisolone in Guillain-Barré syndrome. J Neurol. 2007;254(10):1318-22. PMID 17426908; PMCID PMC2778673; doi:10.1007/s00415-006-0515-2.", "link": "https://doi.org/10.1007/s00415-006-0515-2", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Ruts2010", "text": "Ruts L, Drenthen J, Jacobs BC, van Doorn PA, Dutch GBS Study Group. Distinguishing acute-onset CIDP from fluctuating Guillain-Barre syndrome: a prospective study. Neurology. 2010;74(21):1680-6. PMID 20427754; doi:10.1212/WNL.0b013e3181e07d14.", "link": "https://doi.org/10.1212/wnl.0b013e3181e07d14", "areas": ["D", "E", "G"], "unverified": false, "validated": "PubMed", "aliases": ["Ruts2010Fluct"]}, {"key": "Ruts2010Pain", "text": "Ruts L, Drenthen J, Jongen JL, Hop WC, Visser GH, Jacobs BC, et al. Pain in Guillain-Barre syndrome: a long-term follow-up study. Neurology. 2010;75(16):1439-47. PMID 20861454; doi:10.1212/WNL.0b013e3181f88345.", "link": "https://doi.org/10.1212/wnl.0b013e3181f88345", "areas": ["D", "F", "G", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Ruts2012", "text": "Ruts L, van Doorn PA, Lombardi R, Haasdijk ED, Penza P, Tulen JHM, et al. Unmyelinated and myelinated skin nerve damage in Guillain-Barré syndrome: correlation with pain and recovery. Pain. 2012;153(2):399-409. PMID 22154920; doi:10.1016/j.pain.2011.10.037.", "link": "https://doi.org/10.1016/j.pain.2011.10.037", "areas": ["D", "F", "G"], "unverified": false, "validated": "PubMed", "aliases": ["Ruts2012Pain"]}, {"key": "Ryabinkina2016", "text": "Ryabinkina YV, Piradov MA, Gnedovskaya EV, Suponeva NA, Prokazova PR. [Venous thromboembolism in patients with Guillain-Barre syndrome]. Zh Nevrol Psikhiatr Im S S Korsakova. 2016;116(5):13-18. PMID 27240174; doi:10.17116/jnevro20161165113-18.", "link": "https://doi.org/10.17116/jnevro20161165113-18", "areas": ["F", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Ryan2005", "text": "Ryan MM. Guillain-Barré syndrome in childhood. J Paediatr Child Health. 2005;41(5-6):237-41. PMID 15953319; doi:10.1111/j.1440-1754.2005.00602.x.", "link": "https://doi.org/10.1111/j.1440-1754.2005.00602.x", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Saifudheen2011", "text": "Saifudheen K, Jose J, Gafoor VA, Musthafa M. Guillain-Barre syndrome and SIADH. Neurology. 2011;76(8):701-4. PMID 21339497; doi:10.1212/WNL.0b013e31820d8b40.", "link": "https://doi.org/10.1212/wnl.0b013e31820d8b40", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Sakakibara1997", "text": "Sakakibara R, Hattori T, Kuwabara S, Yamanishi T, Yasuda K. Micturitional disturbance in patients with Guillain-Barré syndrome. J Neurol Neurosurg Psychiatry. 1997;63(5):649-53. PMID 9408108; PMCID PMC2169821; doi:10.1136/jnnp.63.5.649.", "link": "https://doi.org/10.1136/jnnp.63.5.649", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Sakakibara2009", "text": "Sakakibara R, Uchiyama T, Kuwabara S, Mori M, Ito T, Yamamoto T, et al. Prevalence and mechanism of bladder dysfunction in Guillain-Barré Syndrome. Neurourol Urodyn. 2009;28(5):432-7. PMID 19260087; doi:10.1002/nau.20663.", "link": "https://doi.org/10.1002/nau.20663", "areas": ["F", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Salmon2013", "text": "Salmon DA, Proschan M, Forshee R, Gargiullo P, Bleser W, Burwen DR, et al. Association between Guillain-Barré syndrome and influenza A (H1N1) 2009 monovalent inactivated vaccines in the USA: a meta-analysis. Lancet. 2013;381(9876):1461-8. PMID 23498095; doi:10.1016/S0140-6736(12)62189-8.", "link": "https://doi.org/10.1016/s0140-6736(12)62189-8", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Schonberger1979", "text": "Schonberger LB, Bregman DJ, Sullivan-Bolyai JZ, Keenlyside RA, Ziegler DW, Retailliau HF, et al. Guillain-Barre syndrome following vaccination in the National Influenza Immunization Program, United States, 1976--1977. Am J Epidemiol. 1979;110(2):105-23. PMID 463869; doi:10.1093/oxfordjournals.aje.a112795.", "link": "https://doi.org/10.1093/oxfordjournals.aje.a112795", "areas": ["A", "B"], "unverified": false, "validated": "PubMed"}, {"key": "Schroder2019", "text": "Schröder JB, Marian T, Muhle P, Claus I, Thomas C, Ruck T, et al. Intubation, tracheostomy, and decannulation in patients with Guillain-Barré-syndrome-does dysphagia matter? Muscle Nerve. 2019;59(2):194-200. PMID 30390307; doi:10.1002/mus.26377.", "link": "https://doi.org/10.1002/mus.26377", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Sedano2019", "text": "Sedano MJ, Orizaola P, Gallardo E, García A, Pelayo-Negro AL, Sánchez-Juan P, et al. A unicenter, prospective study of Guillain-Barré syndrome in Spain. Acta Neurol Scand. 2019;139(6):546-554. PMID 30929269; doi:10.1111/ane.13092.", "link": "https://doi.org/10.1111/ane.13092", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Sejvar2005", "text": "Sejvar JJ, Bode AV, Marfin AA, Campbell GL, Ewing D, Mazowiecki M, et al. West Nile virus-associated flaccid paralysis. Emerg Infect Dis. 2005;11(7):1021-7. PMID 16022775; PMCID PMC3371783; doi:10.3201/eid1107.040991.", "link": "https://doi.org/10.3201/eid1107.040991", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Sejvar2011", "text": "Sejvar JJ, Baughman AL, Wise M, Morgan OW. Population incidence of Guillain-Barré syndrome: a systematic review and meta-analysis. Neuroepidemiology. 2011;36(2):123-33. PMID 21422765; PMCID PMC5703046; doi:10.1159/000324710.", "link": "https://doi.org/10.1159/000324710", "areas": ["A", "B", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Sejvar2011Brighton", "text": "Sejvar JJ, Kohl KS, Gidudu J, Amato A, Bakshi N, Baxter R, et al. Guillain-Barré syndrome and Fisher syndrome: case definitions and guidelines for collection, analysis, and presentation of immunization safety data. Vaccine. 2011;29(3):599-612. PMID 20600491; doi:10.1016/j.vaccine.2010.06.003.", "link": "https://doi.org/10.1016/j.vaccine.2010.06.003", "areas": ["B", "D"], "unverified": false, "validated": "PubMed"}, {"key": "Sejvar2011Flu", "text": "Sejvar JJ, Pfeifer D, Schonberger LB. Guillain-barré syndrome following influenza vaccination: causal or coincidental?. Curr Infect Dis Rep. 2011;13(4):387-98. PMID 21681501; doi:10.1007/s11908-011-0194-8.", "link": "https://doi.org/10.1007/s11908-011-0194-8", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Sekiguchi2016", "text": "Sekiguchi Y, Mori M, Misawa S, Sawai S, Yuki N, Beppu M, et al. How often and when Fisher syndrome is overlapped by Guillain-Barré syndrome or Bickerstaff brainstem encephalitis?. Eur J Neurol. 2016;23(6):1058-63. PMID 26969889; doi:10.1111/ene.12983.", "link": "https://doi.org/10.1111/ene.12983", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Shah2022", "text": "Shah N, Shrivastava M, Kumar S, Nagi RS. Supervised, individualised exercise reduces fatigue and improves strength and quality of life more than unsupervised home exercise in people with chronic Guillain-Barré syndrome: a randomised trial. J Physiother. 2022;68(2):123-129. PMID 35396175; doi:10.1016/j.jphys.2022.03.007.", "link": "https://doi.org/10.1016/j.jphys.2022.03.007", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Shahrizaila2011", "text": "Shahrizaila N, Goh KJ, Kokubun N, Abdullah S, Yuki N. Serial nerve conduction studies provide insight into the pathophysiology of Guillain-Barré and Fisher syndromes. J Neurol Sci. 2011;309(1-2):26-30. PMID 21849173; doi:10.1016/j.jns.2011.07.042.", "link": "https://doi.org/10.1016/j.jns.2011.07.042", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Shahrizaila2013", "text": "Shahrizaila N, Goh KJ, Abdullah S, Kuppusamy R, Yuki N. Two sets of nerve conduction studies may suffice in reaching a reliable electrodiagnosis in Guillain-Barré syndrome. Clin Neurophysiol. 2013;124(7):1456-9. PMID 23395599; doi:10.1016/j.clinph.2012.12.047.", "link": "https://doi.org/10.1016/j.clinph.2012.12.047", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Shahrizaila2013JNNP", "text": "Shahrizaila N, Yuki N. Bickerstaff brainstem encephalitis and Fisher syndrome: anti-GQ1b antibody syndrome. J Neurol Neurosurg Psychiatry. 2013;84(5):576-83. PMID 22984203; doi:10.1136/jnnp-2012-302824.", "link": "https://doi.org/10.1136/jnnp-2012-302824", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Shahrizaila2014", "text": "Shahrizaila N, Kokubun N, Sawai S, Umapathi T, Chan YC, Kuwabara S, et al. Antibodies to single glycolipids and glycolipid complexes in Guillain-Barré syndrome subtypes. Neurology. 2014;83(2):118-24. PMID 24920848; PMCID PMC4117169; doi:10.1212/WNL.0000000000000577.", "link": "https://doi.org/10.1212/wnl.0000000000000577", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Shahrizaila2021", "text": "Shahrizaila N, Lehmann HC, Kuwabara S. Guillain-Barré syndrome. Lancet. 2021;397(10280):1214-1228. PMID 33647239; doi:10.1016/S0140-6736(21)00517-1.", "link": "https://doi.org/10.1016/s0140-6736(21)00517-1", "areas": ["A", "B", "D"], "unverified": false, "validated": "PubMed"}, {"key": "Shang2020", "text": "Shang P, Zhu M, Baker M, Feng J, Zhou C, Zhang HL. Mechanical ventilation in Guillain-Barré syndrome. Expert Rev Clin Immunol. 2020;16(11):1053-1064. PMID 33112177; doi:10.1080/1744666X.2021.1840355.", "link": "https://doi.org/10.1080/1744666x.2021.1840355", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Sharma2015", "text": "Sharma SR, Sharma N, Masaraf H, Singh SA. Guillain-Barré syndrome complicating pregnancy and correlation with maternal and fetal outcome in North Eastern India: A retrospective study. Ann Indian Acad Neurol. 2015;18(2):215-8. PMID 26019422; PMCID PMC4445200; doi:10.4103/0972-2327.150608.", "link": "https://doi.org/10.4103/0972-2327.150608", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Sharshar2003", "text": "Sharshar T, Chevret S, Bourdain F, Raphaël JC. Early predictors of mechanical ventilation in Guillain-Barré syndrome. Crit Care Med. 2003;31(1):278-83. PMID 12545029; doi:10.1097/00003246-200301000-00044.", "link": "https://doi.org/10.1097/00003246-200301000-00044", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Sharshar2012", "text": "Sharshar T, Polito A, Porcher R, Merhbene T, Blanc M, Antona M, et al. Relevance of anxiety in clinical practice of Guillain-Barre syndrome: a cohort study. BMJ Open. 2012;2(4). PMID 22923622; PMCID PMC3432836; doi:10.1136/bmjopen-2012-000893.", "link": "https://doi.org/10.1136/bmjopen-2012-000893", "areas": ["F", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Shniper2022", "text": "Shniper M, Elkayam K, Bluvshtein V, Gelernter I, Rozenblum R, Catz A, et al. Ability Realization Improves During Inpatient Rehabilitation for Guillain-Barré Syndrome. Am J Phys Med Rehabil. 2022;101(10):954-959. PMID 34954739; doi:10.1097/PHM.0000000000001944.", "link": "https://doi.org/10.1097/phm.0000000000001944", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Shui2012", "text": "Shui IM, Rett MD, Weintraub E, Marcy M, Amato AA, Sheikh SI, et al. Guillain-Barré syndrome incidence in a large United States cohort (2000-2009). Neuroepidemiology. 2012;39(2):109-15. PMID 22846726; doi:10.1159/000339248.", "link": "https://doi.org/10.1159/000339248", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Siconolfi2025", "text": "Siconolfi G, Vitali F, Sciarrone MA, Guglielmino V, Primiano G, Luigetti M. Neurofilament Light Chain Levels as Diagnostic and Prognostic Biomarkers in Guillain-Barré Syndrome: An Updated Systematic Review and Meta-Analysis. Neurol Ther. 2025;14(6):2387-2410. PMID 40976818; PMCID PMC12623590; doi:10.1007/s40120-025-00830-x.", "link": "https://doi.org/10.1007/s40120-025-00830-x", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "SimatosArsenault2016", "text": "Simatos Arsenault N, Vincent PO, Yu BH, Bastien R, Sweeney A. Influence of Exercise on Patients with Guillain-Barré Syndrome: A Systematic Review. Physiother Can. 2016;68(4):367-376. PMID 27904236; PMCID PMC5125499; doi:10.3138/ptc.2015-58.", "link": "https://doi.org/10.3138/ptc.2015-58", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Sipila2017", "text": "Sipilä JO, Kauko T, Soilu-Hänninen M. Admission sodium level and prognosis in adult Guillain-Barré syndrome. Int J Neurosci. 2017;127(4):344-349. PMID 26971365; doi:10.3109/00207454.2016.1163551.", "link": "https://doi.org/10.3109/00207454.2016.1163551", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Siriwardena2022", "text": "Siriwardena AN, Akanuwe JNA, Botan V, Laparidou D, Curtis F, Jackson J, et al. Patient-reported symptoms and experience following Guillain-Barré syndrome and related conditions: Questionnaire development and validation. Health Expect. 2022;25(1):223-231. PMID 34597442; PMCID PMC8849366; doi:10.1111/hex.13367.", "link": "https://doi.org/10.1111/hex.13367", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Sobue1997", "text": "Sobue G, Li M, Terao S, Aoki S, Ichimura M, Ieda T, et al. Axonal pathology in Japanese Guillain-Barré syndrome: a study of 15 autopsied cases. Neurology. 1997;48(6):1694-700. PMID 9191789; doi:10.1212/wnl.48.6.1694.", "link": "https://doi.org/10.1212/wnl.48.6.1694", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Solomon2003", "text": "Solomon T, Willison H. Infectious causes of acute flaccid paralysis. Curr Opin Infect Dis. 2003;16(5):375-81. PMID 14501988; doi:10.1097/00001432-200310000-00002.", "link": "https://doi.org/10.1097/00001432-200310000-00002", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Statland2018", "text": "Statland JM, Fontaine B, Hanna MG, Johnson NE, Kissel JT, Sansone VA, et al. Review of the Diagnosis and Treatment of Periodic Paralysis. Muscle Nerve. 2018;57(4):522-530. PMID 29125635; PMCID PMC5867231; doi:10.1002/mus.26009.", "link": "https://doi.org/10.1002/mus.26009", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Stevens2009", "text": "Stevens RD, Marshall SA, Cornblath DR, Hoke A, Needham DM, de Jonghe B, et al. A framework for diagnosing and classifying intensive care unit-acquired weakness. Crit Care Med. 2009;37(10 Suppl):S299-308. PMID 20046114; doi:10.1097/CCM.0b013e3181b6ef67.", "link": "https://doi.org/10.1097/ccm.0b013e3181b6ef67", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Stino2024", "text": "Stino AM, Reynolds EL, Watanabe M, Callaghan BC. Intravenous immunoglobulin and plasma exchange prescribing patterns for Guillain-Barre Syndrome in the United States-2001 to 2018. Muscle Nerve. 2024;70(6):1192-1199. PMID 39324188; PMCID PMC11560546; doi:10.1002/mus.28265.", "link": "https://doi.org/10.1002/mus.28265", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Storgaard2025", "text": "Storgaard JH, Qerama E, Stouge A, Tankisi H, Harbo T, Andersen H, et al. High-frequency nerve ultrasound in Guillain-Barré syndrome. Clin Neurophysiol. 2025;179:2110985. PMID 40896929; doi:10.1016/j.clinph.2025.2110985.", "link": "https://doi.org/10.1016/j.clinph.2025.2110985", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Stowe2009", "text": "Stowe J, Andrews N, Wise L, Miller E. Investigation of the temporal association of Guillain-Barre syndrome with influenza vaccine and influenzalike illness using the United Kingdom General Practice Research Database. Am J Epidemiol. 2009;169(3):382-8. PMID 19033158; doi:10.1093/aje/kwn310.", "link": "https://doi.org/10.1093/aje/kwn310", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Stowe2025RSV", "text": "Stowe J, Watson CH, Ramsay ME, Andrews NJ. Assessing the risk of Guillain-Barré syndrome in older adults after bivalent RSV pre-F vaccination in England. Nat Commun. 2025;16(1):11496. PMID 41381510; PMCID PMC12748555; doi:10.1038/s41467-025-66280-z.", "link": "https://doi.org/10.1038/s41467-025-66280-z", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Strauss2009", "text": "Strauss J, Aboab J, Rottmann M, Porcher R, Polito A, Ikka L, et al. Plasma cortisol levels in Guillain-Barré syndrome. Crit Care Med. 2009;37(8):2436-40. PMID 19531948; doi:10.1097/CCM.0b013e3181a0fdfc.", "link": "https://doi.org/10.1097/ccm.0b013e3181a0fdfc", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Sulli2021", "text": "Sulli S, Scala L, Berardi A, Conte A, Baione V, Belvisi D, et al. The efficacy of rehabilitation in people with Guillain-Barrè syndrome: a systematic review of randomized controlled trials. Expert Rev Neurother. 2021;21(4):455-461. PMID 33567916; doi:10.1080/14737175.2021.1890034.", "link": "https://doi.org/10.1080/14737175.2021.1890034", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Surve2024", "text": "Surve RM, Sharma KK, Sharma P, Nisal R, Pendharkar HS, Kulkarni GB. PRESenting a Challenge: Posterior Reversible Encephalopathy Syndrome in Pediatric Patients With Guillain-Barré Syndrome: A Case Series and Review of Literature. Pediatr Neurol. 2024;156:162-169. PMID 38788278; doi:10.1016/j.pediatrneurol.2024.04.018.", "link": "https://doi.org/10.1016/j.pediatrneurol.2024.04.018", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Susanti2026", "text": "Susanti V, Trisyani Y, Nuraeni A. Living Through Acute Helplessness and Ongoing Recovery: A Phenomenological Study of Patients with Guillain-Barré Syndrome Undergoing Therapeutic Plasma Exchange. Patient Prefer Adherence. 2026;20:628967. PMID 42802807; PMCID PMC13616178; doi:10.2147/PPA.S628967.", "link": "https://doi.org/10.2147/ppa.s628967", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Susuki2004", "text": "Susuki K, Atsumi M, Koga M, Hirata K, Yuki N. Acute facial diplegia and hyperreflexia: A Guillain-Barré syndrome variant. Neurology. 2004;62(5):825-7. PMID 15007144; doi:10.1212/01.wnl.0000113717.88589.6f.", "link": "https://doi.org/10.1212/01.wnl.0000113717.88589.6f", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Susuki2007", "text": "Susuki K, Rasband MN, Tohyama K, Koibuchi K, Okamoto S, Funakoshi K, et al. Anti-GM1 antibodies cause complement-mediated disruption of sodium channel clusters in peripheral motor nerve fibers. J Neurosci. 2007;27(15):3956-67. PMID 17428969; PMCID PMC6672537; doi:10.1523/JNEUROSCI.4401-06.2007.", "link": "https://doi.org/10.1523/jneurosci.4401-06.2007", "areas": ["B", "C"], "unverified": false, "validated": "PubMed"}, {"key": "Susuki2009", "text": "Susuki K, Koga M, Hirata K, Isogai E, Yuki N. A Guillain-Barré syndrome variant with prominent facial diplegia. J Neurol. 2009;256(11):1899-905. PMID 19633904; doi:10.1007/s00415-009-5254-8.", "link": "https://doi.org/10.1007/s00415-009-5254-8", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Sykora2008", "text": "Sykora M, Diedler J, Hacke W, Veltkamp R. Intrapulmonary right-left shunts in Guillain-Barré syndrome with severe dysautonomia. Neurocrit Care. 2008;9(3):374-7. PMID 18481227; doi:10.1007/s12028-008-9101-z.", "link": "https://doi.org/10.1007/s12028-008-9101-z", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Tam2007", "text": "Tam CC, O'Brien SJ, Petersen I, Islam A, Hayward A, Rodrigues LC. Guillain-Barré syndrome and preceding infection with campylobacter, influenza and Epstein-Barr virus in the general practice research database. PLoS One. 2007;2(4):e344. PMID 17406668; PMCID PMC1828628; doi:10.1371/journal.pone.0000344.", "link": "https://doi.org/10.1371/journal.pone.0000344", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Tamborska2022", "text": "Tamborska AA, Singh B, Leonhard SE, Hodel EM, Stowe J, Watson-Fargie T, et al. Guillain-Barré syndrome following SARS-CoV-2 vaccination in the UK: a prospective surveillance study. BMJ Neurol Open. 2022;4(2):e000309. PMID 35856053; PMCID PMC9277028; doi:10.1136/bmjno-2022-000309.", "link": "https://doi.org/10.1136/bmjno-2022-000309", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Tan2019Autonomic", "text": "Tan CY, Shahrizaila N, Yeoh KY, Goh KJ, Tan MP. Heart rate variability and baroreflex sensitivity abnormalities in Guillain-Barré syndrome: a pilot study. Clin Auton Res. 2019;29(3):339-348. PMID 29654380; doi:10.1007/s10286-018-0525-z.", "link": "https://doi.org/10.1007/s10286-018-0525-z", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Tan2020", "text": "Tan CY, Razali SNO, Goh KJ, Shahrizaila N. Diagnosis of Guillain-Barré syndrome and validation of the Brighton criteria in Malaysia. J Peripher Nerv Syst. 2020;25(3):256-264. PMID 32511817; doi:10.1111/jns.12398.", "link": "https://doi.org/10.1111/jns.12398", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Taylor2024", "text": "Taylor S, Czuzoj-Shulman N, Spence AR, Abenhaim HA. Maternal and newborn outcomes in pregnancies complicated by Guillain-Barré syndrome. J Perinat Med. 2024;52(8):870-877. PMID 39166984; doi:10.1515/jpm-2023-0310.", "link": "https://doi.org/10.1515/jpm-2023-0310", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Terayama2024", "text": "Terayama A, Kuwahara M, Yoshikawa K, Yamagishi Y, Samukawa M, Yamashita S, et al. Takotsubo cardiomyopathy in Guillain-Barré syndrome. J Neurol. 2024;271(7):4067-4074. PMID 38573364; doi:10.1007/s00415-024-12295-3.", "link": "https://doi.org/10.1007/s00415-024-12295-3", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Tetsuka2020", "text": "Tetsuka S, Suzuki T, Ogawa T, Hashimoto R, Kato H. Spinal Epidural Abscess: A Review Highlighting Early Diagnosis and Management. JMA J. 2020;3(1):29-40. PMID 33324773; PMCID PMC7733760; doi:10.31662/jmaj.2019-0038.", "link": "https://doi.org/10.31662/jmaj.2019-0038", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Tham2018", "text": "Tham SL, Prasad K, Umapathi T. Guillain-Barré syndrome mimics. Brain Behav. 2018;8(5):e00960. PMID 29761013; PMCID PMC5943729; doi:10.1002/brb3.960.", "link": "https://doi.org/10.1002/brb3.960", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Thille2025", "text": "Thille AW, Bayon C, Gauvrit M, Saccheri C, Labruyere M, Beduneau G, et al. Characteristics of ventilator weaning in patients intubated for Guillain-Barré syndrome or myasthenia gravis: a nationwide multicenter study. Intensive Care Med. 2025;51(11):2054-2064. PMID 41114833; doi:10.1007/s00134-025-08159-7.", "link": "https://doi.org/10.1007/s00134-025-08159-7", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Thille2026", "text": "Thille AW, Bayon C, Gauvrit M, Saccheri C, Labruyere M, Beduneau G, et al. Effects of direct tracheostomy on ventilator weaning in patients intubated for Guillain-Barré syndrome. Ann Intensive Care. 2026;16:100124. PMID 42592412; PMCID PMC13463968; doi:10.1016/j.aicoj.2026.100124.", "link": "https://doi.org/10.1016/j.aicoj.2026.100124", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Thomma2025", "text": "Thomma RCM, Luijten LWG, van Tilburg SJ, Wiegers EJA, Teunissen CE, Vermunt L, et al. Neurofilament light chain improves clinical prognostic models for Guillain-Barré syndrome. J Neurol Neurosurg Psychiatry. 2025;96(11):1099-1108. PMID 40316442; PMCID PMC12573411; doi:10.1136/jnnp-2025-336046.", "link": "https://doi.org/10.1136/jnnp-2025-336046", "areas": ["D", "G", "I"], "unverified": false, "validated": "PubMed"}, {"key": "Thomma2025Brain", "text": "Thomma RCM, Halstead SK, de Koning LC, Wiegers EJA, Gourlay DS, Tio-Gillen AP, et al. Large-scale profiling of antibody reactivity to glycolipids in patients with Guillain-Barré syndrome. Brain. 2025;148(11):4000-4015. PMID 40096525; PMCID PMC12588681; doi:10.1093/brain/awaf102.", "link": "https://doi.org/10.1093/brain/awaf102", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "TMCWG2002", "text": "Transverse Myelitis Consortium Working Group. Proposed diagnostic criteria and nosology of acute transverse myelitis. Neurology. 2002;59(4):499-505. PMID 12236201; doi:10.1212/wnl.59.4.499.", "link": "https://doi.org/10.1212/wnl.59.4.499", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Top2015", "text": "Top KA, Desai S, Moore D, Law BJ, Vaudry W, Halperin SA, et al. Guillain-Barré Syndrome After Immunization in Canadian Children (1996-2012). Pediatr Infect Dis J. 2015;34(12):1411-3. PMID 26379167; doi:10.1097/INF.0000000000000903.", "link": "https://doi.org/10.1097/inf.0000000000000903", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Tripathi2000", "text": "Tripathi M, Kaushik S. Carbamezapine for pain management in Guillain-Barré syndrome patients in the intensive care unit. Crit Care Med. 2000;28(3):655-8. PMID 10752810; doi:10.1097/00003246-200003000-00009.", "link": "https://doi.org/10.1097/00003246-200003000-00009", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Umapathi2015", "text": "Umapathi T, Li Z, Verma K, Yuki N. Sural-sparing is seen in axonal as well as demyelinating forms of Guillain-Barré syndrome. Clin Neurophysiol. 2015;126(12):2376-80. PMID 25743269; doi:10.1016/j.clinph.2015.01.016.", "link": "https://doi.org/10.1016/j.clinph.2015.01.016", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Uncini2010", "text": "Uncini A, Manzoli C, Notturno F, Capasso M. Pitfalls in electrodiagnosis of Guillain-Barré syndrome subtypes. J Neurol Neurosurg Psychiatry. 2010;81(10):1157-63. PMID 20870864; doi:10.1136/jnnp.2010.208538.", "link": "https://doi.org/10.1136/jnnp.2010.208538", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Uncini2013", "text": "Uncini A, Susuki K, Yuki N. Nodo-paranodopathy: beyond the demyelinating and axonal classification in anti-ganglioside antibody-mediated neuropathies. Clin Neurophysiol. 2013;124(10):1928-34. PMID 23639374; doi:10.1016/j.clinph.2013.03.025.", "link": "https://doi.org/10.1016/j.clinph.2013.03.025", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Uncini2017", "text": "Uncini A, Ippoliti L, Shahrizaila N, Sekiguchi Y, Kuwabara S. Optimizing the electrodiagnostic accuracy in Guillain-Barré syndrome subtypes: Criteria sets and sparse linear discriminant analysis. Clin Neurophysiol. 2017;128(7):1176-1183. PMID 28521265; doi:10.1016/j.clinph.2017.03.048.", "link": "https://doi.org/10.1016/j.clinph.2017.03.048", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Uncini2018", "text": "Uncini A, Vallat JM. Autoimmune nodo-paranodopathies of peripheral nerve: the concept is gaining ground. J Neurol Neurosurg Psychiatry. 2018;89(6):627-635. PMID 29248893; doi:10.1136/jnnp-2017-317192.", "link": "https://doi.org/10.1136/jnnp-2017-317192", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Uncini2022", "text": "Uncini A, Mathis S, Vallat JM. New classification of autoimmune neuropathies based on target antigens and involved domains of myelinated fibres. J Neurol Neurosurg Psychiatry. 2022;93(1):57-67. PMID 34373238; doi:10.1136/jnnp-2021-326889.", "link": "https://doi.org/10.1136/jnnp-2021-326889", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Uncini2023", "text": "Uncini A. Autoimmune nodo-paranodopathies 10 years later: Clinical features, pathophysiology and treatment. J Peripher Nerv Syst. 2023;28 Suppl 3:S23-S35. PMID 37272673; doi:10.1111/jns.12569.", "link": "https://doi.org/10.1111/jns.12569", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Vajsar2003", "text": "Vajsar J, Fehlings D, Stephens D. Long-term outcome in children with Guillain-Barré syndrome. J Pediatr. 2003;142(3):305-9. PMID 12640380; doi:10.1067/mpd.2003.115.", "link": "https://doi.org/10.1067/mpd.2003.115", "areas": ["G", "H"], "unverified": false, "validated": "PubMed"}, {"key": "vanDenBerg2013", "text": "van den Berg B, Bunschoten C, van Doorn PA, Jacobs BC. Mortality in Guillain-Barre syndrome. Neurology. 2013;80(18):1650-4. PMID 23576619; doi:10.1212/WNL.0b013e3182904fcc.", "link": "https://doi.org/10.1212/wnl.0b013e3182904fcc", "areas": ["A", "F", "G"], "unverified": false, "validated": "PubMed", "aliases": ["vandenBerg2013Mortality"]}, {"key": "vanDenBerg2014", "text": "van den Berg B, Walgaard C, Drenthen J, Fokke C, Jacobs BC, van Doorn PA. Guillain-Barré syndrome: pathogenesis, diagnosis, treatment and prognosis. Nat Rev Neurol. 2014;10(8):469-82. PMID 25023340; doi:10.1038/nrneurol.2014.121.", "link": "https://doi.org/10.1038/nrneurol.2014.121", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "vanDenBerg2014HEV", "text": "van den Berg B, van der Eijk AA, Pas SD, Hunter JG, Madden RG, Tio-Gillen AP, et al. Guillain-Barré syndrome associated with preceding hepatitis E virus infection. Neurology. 2014;82(6):491-7. PMID 24415572; doi:10.1212/WNL.0000000000000111.", "link": "https://doi.org/10.1212/wnl.0000000000000111", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "vanDenBerg2018", "text": "van den Berg B, Storm EF, Garssen MJP, Blomkwist-Markens PH, Jacobs BC. Clinical outcome of Guillain-Barré syndrome after prolonged mechanical ventilation. J Neurol Neurosurg Psychiatry. 2018;89(9):949-954. PMID 29627773; doi:10.1136/jnnp-2018-317968.", "link": "https://doi.org/10.1136/jnnp-2018-317968", "areas": ["F", "G"], "unverified": false, "validated": "PubMed", "aliases": ["vandenBerg2018Ventilation"]}, {"key": "VandenBergh2021", "text": "Van den Bergh PYK, van Doorn PA, Hadden RDM, Avau B, Vankrunkelsven P, Allen JA, et al. European Academy of Neurology/Peripheral Nerve Society guideline on diagnosis and treatment of chronic inflammatory demyelinating polyradiculoneuropathy: Report of a joint Task Force-Second revision. Eur J Neurol. 2021;28(11):3556-3583. PMID 34327760; doi:10.1111/ene.14959.", "link": "https://doi.org/10.1111/ene.14959", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "vanDerMeche1992", "text": "van der Meché FG, Schmitz PI. A randomized trial comparing intravenous immune globulin and plasma exchange in Guillain-Barré syndrome. Dutch Guillain-Barré Study Group. N Engl J Med. 1992;326(17):1123-9. PMID 1552913; doi:10.1056/NEJM199204233261705.", "link": "https://doi.org/10.1056/nejm199204233261705", "areas": ["A", "E", "G"], "unverified": false, "validated": "PubMed"}, {"key": "vanderPijl2018", "text": "van der Pijl J, Wilmshurst JM, van Dijk M, Argent A, Booth J, Zampoli M. Acute flaccid paralysis in South African children: Causes, respiratory complications and neurological outcome. J Paediatr Child Health. 2018;54(3):247-253. PMID 28960591; doi:10.1111/jpc.13709.", "link": "https://doi.org/10.1111/jpc.13709", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "VandeWalle2025", "text": "Van de Walle I, Bracke L, Olesen HG, van Bragt T, Cadour S, De Decker P, et al. Randomized phase I trial outcomes show safe and sustainable inhibition of classical and lectin complement pathways by empasiprubart. Nat Commun. 2025;16(1):7639. PMID 40819168; PMCID PMC12357863; doi:10.1038/s41467-025-62925-1.", "link": "https://doi.org/10.1038/s41467-025-62925-1", "areas": ["I"], "unverified": false, "validated": "PubMed"}, {"key": "vanDoorn2008", "text": "van Doorn PA, Ruts L, Jacobs BC. Clinical features, pathogenesis, and treatment of Guillain-Barré syndrome. Lancet Neurol. 2008;7(10):939-50. PMID 18848313; doi:10.1016/S1474-4422(08)70215-1.", "link": "https://doi.org/10.1016/s1474-4422(08)70215-1", "areas": ["A", "G"], "unverified": false, "validated": "PubMed"}, {"key": "vanDoorn2010", "text": "van Doorn PA, Kuitwaard K, Walgaard C, van Koningsveld R, Ruts L, Jacobs BC. IVIG treatment and prognosis in Guillain-Barré syndrome. J Clin Immunol. 2010;30 Suppl 1(Suppl 1):S74-8. PMID 20396937; PMCID PMC2883091; doi:10.1007/s10875-010-9407-4.", "link": "https://doi.org/10.1007/s10875-010-9407-4", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "vanDoorn2023", "text": "van Doorn PA, Van den Bergh PYK, Hadden RDM, Avau B, Vankrunkelsven P, Attarian S, et al. European Academy of Neurology/Peripheral Nerve Society Guideline on diagnosis and treatment of Guillain-Barré syndrome. Eur J Neurol. 2023;30(12):3646-3674. PMID 37814552; doi:10.1111/ene.16073. Also published in J Peripher Nerv Syst, PMID 37814551.", "link": "https://doi.org/10.1111/ene.16073", "areas": ["A", "B", "C", "D", "E", "F", "G", "H"], "unverified": false, "validated": "PubMed"}, {"key": "vanKoningsveld2004", "text": "van Koningsveld R, Schmitz PI, Meché FG, Visser LH, Meulstee J, van Doorn PA. Effect of methylprednisolone when added to standard treatment with intravenous immunoglobulin for Guillain-Barré syndrome: randomised trial. Lancet. 2004;363(9404):192-6. PMID 14738791; doi:10.1016/s0140-6736(03)15324-x.", "link": "https://doi.org/10.1016/s0140-6736(03)15324-x", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "vanKoningsveld2007", "text": "van Koningsveld R, Steyerberg EW, Hughes RA, Swan AV, van Doorn PA, Jacobs BC. A clinical prognostic scoring system for Guillain-Barré syndrome. Lancet Neurol. 2007;6(7):589-94. PMID 17537676; doi:10.1016/S1474-4422(07)70130-8.", "link": "https://doi.org/10.1016/s1474-4422(07)70130-8", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "vanTilburg2024", "text": "van Tilburg SJ, Teunissen CE, Maas CCHM, Thomma RCM, Walgaard C, Heijst H, et al. Dynamics and prognostic value of serum neurofilament light chain in Guillain-Barré syndrome. EBioMedicine. 2024;102:105072. PMID 38518653; PMCID PMC10980997; doi:10.1016/j.ebiom.2024.105072.", "link": "https://doi.org/10.1016/j.ebiom.2024.105072", "areas": ["D", "G", "I"], "unverified": false, "validated": "PubMed"}, {"key": "vanTilburg2025", "text": "van Tilburg SJ, Huizinga R, Kuitwaard K, Sassen SDT, Walgaard C, van Doorn PA, et al. If it does not help, it might hurt: Pharmacodynamics of a second IVIg course in Guillain-Barré syndrome. Ann Clin Transl Neurol. 2025;12(5):966-975. PMID 40084606; PMCID PMC12093351; doi:10.1002/acn3.52313.", "link": "https://doi.org/10.1002/acn3.52313", "areas": ["E", "I", "G"], "unverified": false, "validated": "PubMed", "aliases": ["vanTilburg2025SID"]}, {"key": "Vellozzi2014AJPH", "text": "Vellozzi C, Iqbal S, Stewart B, Tokars J, DeStefano F. Cumulative risk of Guillain-Barré syndrome among vaccinated and unvaccinated populations during the 2009 H1N1 influenza pandemic. Am J Public Health. 2014;104(4):696-701. PMID 24524517; PMCID PMC4025712; doi:10.2105/AJPH.2013.301651.", "link": "https://doi.org/10.2105/ajph.2013.301651", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Vellozzi2014CID", "text": "Vellozzi C, Iqbal S, Broder K. Guillain-Barre syndrome, influenza, and influenza vaccination: the epidemiologic evidence. Clin Infect Dis. 2014;58(8):1149-55. PMID 24415636; doi:10.1093/cid/ciu005.", "link": "https://doi.org/10.1093/cid/ciu005", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Veltsista2023", "text": "Veltsista D, Kefalopoulou Z, Kintos V, Chroni E. Identical late motor responses in early Guillain-Barré syndrome: A-waves and repeater F-waves. J Peripher Nerv Syst. 2023;28(1):41-46. PMID 36453598; doi:10.1111/jns.12522.", "link": "https://doi.org/10.1111/jns.12522", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Verboon2017", "text": "Verboon C, van Doorn PA, Jacobs BC. Treatment dilemmas in Guillain-Barré syndrome. J Neurol Neurosurg Psychiatry. 2017;88(4):346-352. PMID 27837102; doi:10.1136/jnnp-2016-314862.", "link": "https://doi.org/10.1136/jnnp-2016-314862", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Verboon2017MFS", "text": "Verboon C, van Berghem H, van Doorn PA, Ruts L, Jacobs BC. Prediction of disease progression in Miller Fisher and overlap syndromes. J Peripher Nerv Syst. 2017;22(4):446-450. PMID 29065229; doi:10.1111/jns.12238.", "link": "https://doi.org/10.1111/jns.12238", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Verboon2019", "text": "Verboon C, Doets AY, Galassi G, Davidson A, Waheed W, Péréon Y, et al. Current treatment practice of Guillain-Barré syndrome. Neurology. 2019;93(1):e59-e76. PMID 31175208; doi:10.1212/WNL.0000000000007719.", "link": "https://doi.org/10.1212/wnl.0000000000007719", "areas": ["A", "E", "I"], "unverified": false, "validated": "PubMed"}, {"key": "Verboon2020", "text": "Verboon C, van den Berg B, Cornblath DR, Venema E, Gorson KC, Lunn MP, et al. Original research: Second IVIg course in Guillain-Barré syndrome with poor prognosis: the non-randomised ISID study. J Neurol Neurosurg Psychiatry. 2020;91(2):113-121. PMID 31586949; doi:10.1136/jnnp-2019-321496.", "link": "https://doi.org/10.1136/jnnp-2019-321496", "areas": ["E", "I"], "unverified": false, "validated": "PubMed"}, {"key": "Verboon2021", "text": "Verboon C, Harbo T, Cornblath DR, Hughes RAC, van Doorn PA, Lunn MP, et al. Intravenous immunoglobulin treatment for mild Guillain-Barré syndrome: an international observational study. J Neurol Neurosurg Psychiatry. 2021;92(10):1080-1088. PMID 34103340; PMCID PMC8458059; doi:10.1136/jnnp-2020-325815.", "link": "https://doi.org/10.1136/jnnp-2020-325815", "areas": ["E", "I"], "unverified": false, "validated": "PubMed"}, {"key": "Visser1998", "text": "Visser LH, van der Meché FG, Meulstee J, van Doorn PA. Risk factors for treatment related clinical fluctuations in Guillain-Barré syndrome. Dutch Guillain-Barré study group. J Neurol Neurosurg Psychiatry. 1998;64(2):242-4. PMID 9489539; PMCID PMC2169950; doi:10.1136/jnnp.64.2.242.", "link": "https://doi.org/10.1136/jnnp.64.2.242", "areas": ["E", "G"], "unverified": false, "validated": "PubMed", "aliases": ["Visser1998TRF"]}, {"key": "Viswanathan2026", "text": "Viswanathan R, Shinde P, Lavania M, Mathapati B, Chaudhary ML, Sapkal GN, et al. A Large Community Outbreak of Guillain-Barré Syndrome in Pune City, India, 2025. Am J Trop Med Hyg. 2026;115(3):603-611. PMID 42447854; PMCID PMC13539765; doi:10.4269/ajtmh.25-0679.", "link": "https://doi.org/10.4269/ajtmh.25-0679", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Vogrig2022", "text": "Vogrig A, Muñiz-Castrillo S, Farina A, Honnorat J, Joubert B. How to diagnose and manage neurological toxicities of immune checkpoint inhibitors: an update. J Neurol. 2022;269(3):1701-1714. PMID 34708250; doi:10.1007/s00415-021-10870-6.", "link": "https://doi.org/10.1007/s00415-021-10870-6", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Voth2026", "text": "Voth J, Gerstmeyer J, Meuth SG, Zu Hörste GM, Willison AG, Konen FF, et al. Real-world hospitalization and readmission trajectory after Guillain-Barré syndrome in the United States. BMC Neurol. 2026;26(1). PMID 42983686; PMCID PMC13733053; doi:10.1186/s12883-026-05499-9.", "link": "https://doi.org/10.1186/s12883-026-05499-9", "areas": ["F", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Waclawik2018", "text": "Waclawik AJ. The Legacy of the Seminal Publication by Guillain, Barré, and Strohl: The History Behind the Eponym. WMJ. 2018;117(4):160-163. PMID 30407766.", "link": "https://pubmed.ncbi.nlm.nih.gov/30407766/", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Wakerley2014", "text": "Wakerley BR, Uncini A, Yuki N. Guillain-Barré and Miller Fisher syndromes--new diagnostic classification. Nat Rev Neurol. 2014;10(9):537-44. PMID 25072194; doi:10.1038/nrneurol.2014.138.", "link": "https://doi.org/10.1038/nrneurol.2014.138", "areas": ["C", "D"], "unverified": false, "validated": "PubMed"}, {"key": "Wakerley2015", "text": "Wakerley BR, Yuki N. Mimics and chameleons in Guillain-Barré and Miller Fisher syndromes. Pract Neurol. 2015;15(2):90-9. PMID 25239628; doi:10.1136/practneurol-2014-000937.", "link": "https://doi.org/10.1136/practneurol-2014-000937", "areas": ["C", "D"], "unverified": false, "validated": "PubMed"}, {"key": "Wakerley2015Polyneuritis", "text": "Wakerley BR, Yuki N. Polyneuritis cranialis: oculopharyngeal subtype of Guillain-Barré syndrome. J Neurol. 2015;262(9):2001-12. PMID 25712542; doi:10.1007/s00415-015-7678-7.", "link": "https://doi.org/10.1007/s00415-015-7678-7", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Wakerley2016", "text": "Wakerley BR, Kokubun N, Funakoshi K, Nagashima T, Hirata K, Yuki N. Clinical classification of 103 Japanese patients with Guillain-Barré syndrome. J Neurol Sci. 2016;369:43-47. PMID 27653863; doi:10.1016/j.jns.2016.08.002.", "link": "https://doi.org/10.1016/j.jns.2016.08.002", "areas": ["C", "D"], "unverified": false, "validated": "PubMed"}, {"key": "Waksman1955", "text": "Waksman BH, Adams RD. Allergic neuritis: an experimental disease of rabbits induced by the injection of peripheral nervous tissue and adjuvants. J Exp Med. 1955;102(2):213-36. PMID 13242745; PMCID PMC2136504; doi:10.1084/jem.102.2.213.", "link": "https://doi.org/10.1084/jem.102.2.213", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Walgaard2010", "text": "Walgaard C, Lingsma HF, Ruts L, Drenthen J, van Koningsveld R, Garssen MJ, et al. Prediction of respiratory insufficiency in Guillain-Barré syndrome. Ann Neurol. 2010;67(6):781-7. PMID 20517939; doi:10.1002/ana.21976.", "link": "https://doi.org/10.1002/ana.21976", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Walgaard2011", "text": "Walgaard C, Lingsma HF, Ruts L, van Doorn PA, Steyerberg EW, Jacobs BC. Early recognition of poor prognosis in Guillain-Barre syndrome. Neurology. 2011;76(11):968-75. PMID 21403108; PMCID PMC3059137; doi:10.1212/WNL.0b013e3182104407.", "link": "https://doi.org/10.1212/wnl.0b013e3182104407", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Walgaard2017", "text": "Walgaard C, Lingsma HF, van Doorn PA, van der Jagt M, Steyerberg EW, Jacobs BC. Tracheostomy or Not: Prediction of Prolonged Mechanical Ventilation in Guillain-Barré Syndrome. Neurocrit Care. 2017;26(1):6-13. PMID 27538676; PMCID PMC5227005; doi:10.1007/s12028-016-0311-5.", "link": "https://doi.org/10.1007/s12028-016-0311-5", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Walgaard2021", "text": "Walgaard C, Jacobs BC, Lingsma HF, Steyerberg EW, van den Berg B, Doets AY, et al. Second intravenous immunoglobulin dose in patients with Guillain-Barré syndrome with poor prognosis (SID-GBS): a double-blind, randomised, placebo-controlled trial. Lancet Neurol. 2021;20(4):275-283. PMID 33743237; doi:10.1016/S1474-4422(20)30494-4.", "link": "https://doi.org/10.1016/s1474-4422(20)30494-4", "areas": ["E", "G", "I"], "unverified": false, "validated": "PubMed"}, {"key": "Wang2015Hyponatremia", "text": "Wang Y, Liu J. Hyponatremia is a predictor for poor outcome in Guillain-Barré syndrome. Neurol Res. 2015;37(4):347-51. PMID 25366666; doi:10.1179/1743132814Y.0000000455.", "link": "https://doi.org/10.1179/1743132814y.0000000455", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Watrin2016", "text": "Watrin L, Ghawché F, Larre P, Neau JP, Mathis S, Fournier E. Guillain-Barré Syndrome (42 Cases) Occurring During a Zika Virus Outbreak in French Polynesia. Medicine (Baltimore). 2016;95(14):e3257. PMID 27057874; PMCID PMC4998790; doi:10.1097/MD.0000000000003257.", "link": "https://doi.org/10.1097/md.0000000000003257", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Webb2015", "text": "Webb AJ, Brain SA, Wood R, Rinaldi S, Turner MR. Seasonal variation in Guillain-Barré syndrome: a systematic review, meta-analysis and Oxfordshire cohort study. J Neurol Neurosurg Psychiatry. 2015;86(11):1196-201. PMID 25540247; doi:10.1136/jnnp-2014-309056.", "link": "https://doi.org/10.1136/jnnp-2014-309056", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Weiss2002", "text": "Weiss H, Rastan V, Müllges W, Wagner RF, Toyka KV. Psychotic symptoms and emotional distress in patients with Guillain-Barré syndrome. Eur Neurol. 2002;47(2):74-8. PMID 11844894; doi:10.1159/000047956.", "link": "https://doi.org/10.1159/000047956", "areas": ["F", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Weiss2025", "text": "Weiss N, Marois C, Le Guennec L, Rohaut B, Demeret S. Critical insights for intensivists on Guillain-Barré syndrome. Ann Intensive Care. 2025;15(1):67. PMID 40394364; PMCID PMC12092332; doi:10.1186/s13613-025-01464-w.", "link": "https://doi.org/10.1186/s13613-025-01464-w", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Wendell2011", "text": "Wendell LC, Levine JM. Myasthenic crisis. Neurohospitalist. 2011;1(1):16-22. PMID 23983833. PMCID PMC3726100; doi:10.1177/1941875210382918.", "link": "https://doi.org/10.1177/1941875210382918", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "White2014", "text": "White CM, van Doorn PA, Garssen MP, Stockley RC. Interventions for fatigue in peripheral neuropathy. Cochrane Database Syst Rev. 2014;2014(12):CD008146. PMID 25519471; PMCID PMC10793713; doi:10.1002/14651858.CD008146.pub2.", "link": "https://doi.org/10.1002/14651858.cd008146.pub2", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Wiegers2025", "text": "Wiegers EJA, Jacobs BC. New insights in the immune treatment of Guillain-Barré syndrome. Curr Opin Neurol. 2025;38(5):471-477. PMID 40748027; PMCID PMC12419018; doi:10.1097/WCO.0000000000001408.", "link": "https://doi.org/10.1097/wco.0000000000001408", "areas": ["I"], "unverified": false, "validated": "PubMed"}, {"key": "Wijdicks2003", "text": "Wijdicks EF, Henderson RD, McClelland RL. Emergency intubation for respiratory failure in Guillain-Barré syndrome. Arch Neurol. 2003;60(7):947-8. PMID 12873850; doi:10.1001/archneur.60.7.947.", "link": "https://doi.org/10.1001/archneur.60.7.947", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Williams2014", "text": "Williams ME, Balogun RA. Principles of separation: indications and therapeutic targets for plasma exchange. Clin J Am Soc Nephrol. 2014;9(1):181-90. PMID 24178973; PMCID PMC3878701; doi:10.2215/CJN.04680513.", "link": "https://doi.org/10.2215/cjn.04680513", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Willison2016", "text": "Willison HJ, Jacobs BC, van Doorn PA. Guillain-Barré syndrome. Lancet. 2016;388(10045):717-27. PMID 26948435; doi:10.1016/S0140-6736(16)00339-1.", "link": "https://doi.org/10.1016/s0140-6736(16)00339-1", "areas": ["A", "B", "D"], "unverified": false, "validated": "PubMed"}, {"key": "Winer1988", "text": "Winer JB, Hughes RA. Identification of patients at risk of arrhythmia in the Guillain-Barré syndrome. Q J Med. 1988;68(257):735-9. PMID 3256902.", "link": "https://pubmed.ncbi.nlm.nih.gov/3256902/", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Winters2011", "text": "Winters JL, Brown D, Hazard E, Chainani A, Andrzejewski C Jr. Cost-minimization analysis of the direct costs of TPE and IVIg in the treatment of Guillain-Barré syndrome. BMC Health Serv Res. 2011;11:101. PMID 21575219; PMCID PMC3121582; doi:10.1186/1472-6963-11-101.", "link": "https://doi.org/10.1186/1472-6963-11-101", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Witsch2013", "text": "Witsch J, Galldiks N, Bender A, Kollmar R, Bösel J, Hobohm C, et al. Long-term outcome in patients with Guillain-Barré syndrome requiring mechanical ventilation. J Neurol. 2013;260(5):1367-74. PMID 23299621; doi:10.1007/s00415-012-6806-x.", "link": "https://doi.org/10.1007/s00415-012-6806-x", "areas": ["F", "G"], "unverified": false, "validated": "PubMed"}, {"key": "Wright2026", "text": "Wright B, Eiffert SR, Cirincione A, Nardin J, Howard JF Jr, Traub RE. Patient Outcomes Among Medicare Beneficiaries With Guillain-Barré Syndrome. J Peripher Nerv Syst. 2026;31(1):e70094. PMID 41466101; PMCID PMC12748927; doi:10.1111/jns.70094.", "link": "https://doi.org/10.1111/jns.70094", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Wu2015", "text": "Wu X, Li C, Zhang B, Shen D, Li T, Liu K, et al. Predictors for mechanical ventilation and short-term prognosis in patients with Guillain-Barré syndrome. Crit Care. 2015;19(1):310. PMID 26330143; PMCID PMC4557605; doi:10.1186/s13054-015-1037-z.", "link": "https://doi.org/10.1186/s13054-015-1037-z", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Wu2016", "text": "Wu X, Shen D, Li T, Zhang B, Li C, Mao M, et al. Distinct Clinical Characteristics of Pediatric Guillain-Barré Syndrome: A Comparative Study between Children and Adults in Northeast China. PLoS One. 2016;11(3):e0151611. PMID 26974666; PMCID PMC4790924; doi:10.1371/journal.pone.0151611.", "link": "https://doi.org/10.1371/journal.pone.0151611", "areas": ["H"], "unverified": false, "validated": "PubMed"}, {"key": "Xu2024", "text": "Xu L, Zhao C, Bao Y, Liu Y, Liang Y, Wei J, et al. Variation in worldwide incidence of Guillain-Barré syndrome: a population-based study in urban China and existing global evidence. Front Immunol. 2024;15:1415986. PMID 39318625; PMCID PMC11420027; doi:10.3389/fimmu.2024.1415986.", "link": "https://doi.org/10.3389/fimmu.2024.1415986", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Yakubu2026", "text": "Yakubu AO, Atafo GI, Effiong MG, Anifalaje OK, Fakiyesi T, Nwaze CE. Guillain-Barré syndrome in pregnancy: A systematic review of published case reports and case series with obstetric and neonatal outcomes. Am J Obstet Gynecol MFM. 2026;8(5):101937. PMID 41839317; doi:10.1016/j.ajogmf.2026.101937.", "link": "https://doi.org/10.1016/j.ajogmf.2026.101937", "areas": ["E", "H"], "unverified": false, "validated": "PubMed"}, {"key": "Yao2018", "text": "Yao S, Chen H, Zhang Q, Shi Z, Liu J, Lian Z, et al. Pain during the acute phase of Guillain-Barré syndrome. Medicine (Baltimore). 2018;97(34):e11595. PMID 30142753; PMCID PMC6113041; doi:10.1097/MD.0000000000011595.", "link": "https://doi.org/10.1097/md.0000000000011595", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Ye2010Epidemic", "text": "Ye Y, Zhu D, Wang K, Wu J, Feng J, Ma D, et al. Clinical and electrophysiological features of the 2007 Guillain-Barré syndrome epidemic in northeast China. Muscle Nerve. 2010;42(3):311-4. PMID 20589890; doi:10.1002/mus.21701.", "link": "https://doi.org/10.1002/mus.21701", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Ye2013China", "text": "Ye Y, Wang K, Deng F, Xing Y. Electrophysiological subtypes and prognosis of Guillain-Barré syndrome in northeastern China. Muscle Nerve. 2013;47(1):68-71. PMID 23042578; doi:10.1002/mus.23477.", "link": "https://doi.org/10.1002/mus.23477", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Yi2022", "text": "Yi SW, Lee JH, Hong JM, Choi YC, Park HJ. Incidence, Disability, and Mortality in Patients With Guillain-Barré Syndrome in Korea: A Nationwide Population-Based Study. J Clin Neurol. 2022;18(1):48-58. PMID 35021276; PMCID PMC8762496; doi:10.3988/jcn.2022.18.1.48.", "link": "https://doi.org/10.3988/jcn.2022.18.1.48", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Yikilmaz2010", "text": "Yikilmaz A, Doganay S, Gumus H, Per H, Kumandas S, Coskun A. Magnetic resonance imaging of childhood Guillain-Barre syndrome. Childs Nerv Syst. 2010;26(8):1103-8. PMID 20556395; doi:10.1007/s00381-010-1197-8.", "link": "https://doi.org/10.1007/s00381-010-1197-8", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Yonezawa2020", "text": "Yonezawa N, Jo T, Matsui H, Fushimi K, Yasunaga H. Effect of Early Tracheostomy on Mortality of Mechanically Ventilated Patients with Guillain-Barré Syndrome: A Nationwide Observational Study. Neurocrit Care. 2020;33(3):759-768. PMID 32291575; PMCID PMC7223482; doi:10.1007/s12028-020-00965-9.", "link": "https://doi.org/10.1007/s12028-020-00965-9", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Yuki1990", "text": "Yuki N, Yoshino H, Sato S, Miyatake T. Acute axonal polyneuropathy associated with anti-GM1 antibodies following Campylobacter enteritis. Neurology. 1990;40(12):1900-2. PMID 2247243; doi:10.1212/wnl.40.12.1900.", "link": "https://doi.org/10.1212/wnl.40.12.1900", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Yuki1993", "text": "Yuki N, Taki T, Inagaki F, Kasama T, Takahashi M, Saito K, et al. A bacterium lipopolysaccharide that elicits Guillain-Barré syndrome has a GM1 ganglioside-like structure. J Exp Med. 1993;178(5):1771-5. PMID 8228822; PMCID PMC2191246; doi:10.1084/jem.178.5.1771.", "link": "https://doi.org/10.1084/jem.178.5.1771", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Yuki1993GQ1b", "text": "Yuki N, Sato S, Tsuji S, Ohsawa T, Miyatake T. Frequent presence of anti-GQ1b antibody in Fisher's syndrome. Neurology. 1993;43(2):414-7. PMID 8437711; doi:10.1212/wnl.43.2.414.", "link": "https://doi.org/10.1212/wnl.43.2.414", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Yuki1996", "text": "Yuki N, Miyagi F. Possible mechanism of intravenous immunoglobulin treatment on anti-GM1 antibody-mediated neuropathies. J Neurol Sci. 1996;139(1):160-2. PMID 8836989.", "link": "https://pubmed.ncbi.nlm.nih.gov/8836989/", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Yuki1999AMSAN", "text": "Yuki N, Kuwabara S, Koga M, Hirata K. Acute motor axonal neuropathy and acute motor-sensory axonal neuropathy share a common immunological profile. J Neurol Sci. 1999;168(2):121-6. PMID 10526194; doi:10.1016/s0022-510x(99)00180-x.", "link": "https://doi.org/10.1016/s0022-510x(99)00180-x", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Yuki1999China", "text": "Yuki N, Ho TW, Tagawa Y, Koga M, Li CY, Hirata K, et al. Autoantibodies to GM1b and GalNAc-GD1a: relationship to Campylobacter jejuni infection and acute motor axonal neuropathy in China. J Neurol Sci. 1999;164(2):134-8. PMID 10402024; doi:10.1016/s0022-510x(99)00056-8.", "link": "https://doi.org/10.1016/s0022-510x(99)00056-8", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Yuki2001", "text": "Yuki N, Yamada M, Koga M, Odaka M, Susuki K, Tagawa Y, et al. Animal model of axonal Guillain-Barré syndrome induced by sensitization with GM1 ganglioside. Ann Neurol. 2001;49(6):712-20. PMID 11409422.", "link": "https://pubmed.ncbi.nlm.nih.gov/11409422/", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Yuki2004", "text": "Yuki N, Susuki K, Koga M, Nishimoto Y, Odaka M, Hirata K, et al. Carbohydrate mimicry between human ganglioside GM1 and Campylobacter jejuni lipooligosaccharide causes Guillain-Barre syndrome. Proc Natl Acad Sci U S A. 2004;101(31):11404-9. PMID 15277677; PMCID PMC509213; doi:10.1073/pnas.0402391101.", "link": "https://doi.org/10.1073/pnas.0402391101", "areas": ["A", "B", "C"], "unverified": false, "validated": "PubMed"}, {"key": "Yuki2007", "text": "Yuki N, Kuwabara S. Axonal Guillain-Barré syndrome: carbohydrate mimicry and pathophysiology. J Peripher Nerv Syst. 2007;12(4):238-49. PMID 18042134; doi:10.1111/j.1529-8027.2007.00153.x.", "link": "https://doi.org/10.1111/j.1529-8027.2007.00153.x", "areas": ["C"], "unverified": false, "validated": "PubMed"}, {"key": "Yuki2012JNeurol", "text": "Yuki N, Kokubun N, Kuwabara S, Sekiguchi Y, Ito M, Odaka M, et al. Guillain-Barré syndrome associated with normal or exaggerated tendon reflexes. J Neurol. 2012;259(6):1181-90. PMID 22143612; doi:10.1007/s00415-011-6330-4.", "link": "https://doi.org/10.1007/s00415-011-6330-4", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Zaeem2019", "text": "Zaeem Z, Siddiqi ZA, Zochodne DW. Autonomic involvement in Guillain-Barré syndrome: an update. Clin Auton Res. 2019;29(3):289-299. PMID 30019292; doi:10.1007/s10286-018-0542-y.", "link": "https://doi.org/10.1007/s10286-018-0542-y", "areas": ["D", "F"], "unverified": false, "validated": "PubMed"}, {"key": "Zaki2023", "text": "Zaki HA, Iftikhar H, Najam M, Masood M, Al-Marri NDR, Elgassim MAM, et al. Plasma exchange (PE) versus intravenous immunoglobulin (IVIG) for the treatment of Guillain-Barré syndrome (GBS) in patients with severe symptoms: A systematic review and meta-analysis. eNeurologicalSci. 2023;31:100468. PMID 37288440; PMCID PMC10242495; doi:10.1016/j.ensci.2023.100468.", "link": "https://doi.org/10.1016/j.ensci.2023.100468", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Zeilig2006", "text": "Zeilig G, Weingarden HP, Levy R, Peer I, Ohry A, Blumen N. Heterotopic ossification in Guillain-Barré syndrome: incidence and effects on functional outcome with long-term follow-up. Arch Phys Med Rehabil. 2006;87(1):92-5. PMID 16401445; doi:10.1016/j.apmr.2005.07.308.", "link": "https://doi.org/10.1016/j.apmr.2005.07.308", "areas": ["G"], "unverified": false, "validated": "PubMed"}, {"key": "Zeng2019", "text": "Zeng Y, Liu Y, Xie Y, Liang J, Xiao Z, Lu Z. Clinical Features and the Validation of the Brighton Criteria in Guillain-Barré Syndrome: Retrospective Analysis of 72 Hospitalized Patients in Three Years. Eur Neurol. 2019;81(5-6):231-238. PMID 31574518; doi:10.1159/000503101.", "link": "https://doi.org/10.1159/000503101", "areas": ["D"], "unverified": false, "validated": "PubMed"}, {"key": "Zhang2016ExpNeurol", "text": "Zhang G, Massaad CA, Gao T, Pillai L, Bogdanova N, Ghauri S, et al. Sialylated intravenous immunoglobulin suppress anti-ganglioside antibody mediated nerve injury. Exp Neurol. 2016;282:49-55. PMID 27208700; PMCID PMC5351292; doi:10.1016/j.expneurol.2016.05.020.", "link": "https://doi.org/10.1016/j.expneurol.2016.05.020", "areas": ["E"], "unverified": false, "validated": "PubMed"}, {"key": "Zhang2025", "text": "Zhang H, Zhai F, Su M, Zhang Y, Ma J, Zhao J, et al. Comparison of intravenous efgartigimod and intravenous immunoglobulin in patients with Guillain-Barré syndrome. Orphanet J Rare Dis. 2025;20(1):529. PMID 41121372; PMCID PMC12542069; doi:10.1186/s13023-025-04060-0.", "link": "https://doi.org/10.1186/s13023-025-04060-0", "areas": ["I"], "unverified": false, "validated": "PubMed"}, {"key": "Zhao2020", "text": "Zhao Y, Zhu R, Tian D, Liu X. Genetic polymorphisms in Guillain-Barré Syndrome: A field synopsis and systematic meta-analysis. Autoimmun Rev. 2020;19(11):102665. PMID 32949724; doi:10.1016/j.autrev.2020.102665.", "link": "https://doi.org/10.1016/j.autrev.2020.102665", "areas": ["B"], "unverified": false, "validated": "PubMed"}, {"key": "Zheng2022", "text": "Zheng P, Tian DC, Xiu Y, Wang Y, Shi FD. Incidence of Guillain-Barré syndrome (GBS) in China: A national population-based study. Lancet Reg Health West Pac. 2022;18:100302. PMID 35024648; PMCID PMC8661041; doi:10.1016/j.lanwpc.2021.100302.", "link": "https://doi.org/10.1016/j.lanwpc.2021.100302", "areas": ["A"], "unverified": false, "validated": "PubMed"}, {"key": "Zochodne1994", "text": "Zochodne DW. Autonomic involvement in Guillain-Barré syndrome: a review. Muscle Nerve. 1994;17(10):1145-55. PMID 7935521; doi:10.1002/mus.880171004.", "link": "https://doi.org/10.1002/mus.880171004", "areas": ["F"], "unverified": false, "validated": "PubMed"}, {"key": "Zuluaga2025", "text": "Zuluaga Lotero D, Ortiz Muñoz D, Acero-Garces DO, Arango GP, Parra B, García-Perdomo HA. Frequency of residual fatigue in the recovery phase of Guillain-Barré syndrome: a systematic review and meta-analysis. Neurol Res. 2025;47(11):1023-1033. PMID 40441868; doi:10.1080/01616412.2025.2511097.", "link": "https://doi.org/10.1080/01616412.2025.2511097", "areas": ["G"], "unverified": false, "validated": "PubMed"}];
/* guillain-barre-syndrome: its storage prefix, and its modules in nav order with their groups. tools/build.py reads MODS;
   the shared runtime (tools/core/) builds the nav, the home page's unit list and the pager from them. */
const PREFIX='gbsc:';
const MODS=[
 {id:'home',t:'Start here',g:0,n:'00',d:''},
 {id:'what',t:'What GBS is',g:1,n:'1.1',d:'Weakness that climbs, how common it is, and why most people recover'},
 {id:'triggers',t:'Triggers',g:1,n:'1.2',d:'Campylobacter, CMV, EBV, Zika, SARS-CoV-2 and the infection a few weeks before'},
 {id:'mimicry',t:'Molecular mimicry',g:1,n:'1.3',d:'How a gut bacterium\'s sugar coat turns antibodies against nerve gangliosides'},
 {id:'subtypes',t:'Subtypes: AIDP & AMAN',g:1,n:'1.4',d:'Myelin or axon: the variants, how they damage nerve and where each is common'},
 {id:'mfs',t:'Miller Fisher & other variants',g:1,n:'1.5',d:'Eyes, balance and reflexes: anti-GQ1b, Bickerstaff and the regional variants'},
 {id:'course',t:'The course over time',g:1,n:'1.6',d:'Onset, nadir within four weeks, plateau and the long recovery'},
 {id:'signs',t:'Signs & red flags',g:2,n:'2.1',d:'The usual picture, pain and sensory symptoms, and what suggests another diagnosis'},
 {id:'criteria',t:'Diagnostic criteria',g:2,n:'2.2',d:'Brighton levels of certainty and the NINDS criteria, as a teaching tool'},
 {id:'csf',t:'Lumbar puncture & CSF',g:2,n:'2.3',d:'Albuminocytologic dissociation, why it can be normal early, and antibodies'},
 {id:'ncs',t:'Nerve conduction studies',g:2,n:'2.4',d:'Slowing, block and small responses: what the tests show and when'},
 {id:'ddx',t:'Look-alikes',g:2,n:'2.5',d:'Spinal cord disease, myasthenia, botulism, CIDP and other mimics compared'},
 {id:'breathing',t:'Breathing & the 20/30/40 rule',g:3,n:'3.1',d:'Why breathing fails, vital capacity, EGRIS and when ventilation is considered'},
 {id:'ivig',t:'IVIg',g:3,n:'3.2',d:'How immunoglobulin may work, the trials, the published regimen and its risks'},
 {id:'plex',t:'Plasma exchange',g:3,n:'3.3',d:'Removing antibodies from blood: trials, sessions, timing and comparing with IVIg'},
 {id:'whatnot',t:'Steroids, repeats & relapses',g:3,n:'3.4',d:'What failed, the second IVIg dose, treatment-related fluctuations and A-CIDP'},
 {id:'autonomic',t:'Autonomic storms',g:3,n:'3.5',d:'Swinging blood pressure, heart rhythm, bowel and bladder problems'},
 {id:'icu',t:'Intensive care & pain',g:3,n:'3.6',d:'Ventilation, tracheostomy, clots, pressure areas, communication and pain'},
 {id:'prognosis',t:'Prognosis: EGOS & mEGOS',g:4,n:'4.1',d:'Who walks again and when: the published scores as teaching calculators'},
 {id:'rehab',t:'Rehabilitation & recovery',g:4,n:'4.2',d:'Regrowing nerve, exercise, equipment and the recovery curve over years'},
 {id:'after',t:'Life after GBS',g:4,n:'4.3',d:'Fatigue, pain, mood, work, family and recurrence'},
 {id:'children',t:'Children & pregnancy',g:5,n:'5.1',d:'How GBS differs in children and what is reported in pregnancy'},
 {id:'vaccines',t:'Vaccines & GBS',g:5,n:'5.2',d:'1976 swine flu, COVID-19 and RSV vaccines: absolute risks and revaccination'},
 {id:'nursing',t:'Nursing care',g:5,n:'5.3',d:'Neuro and respiratory observations, swallow, skin, bowels, teaching and hope'},
 {id:'frontier',t:'Research frontier',g:5,n:'5.4',d:'Complement inhibitors, IgG-cleaving enzymes and trials, with evidence labels'},
 {id:'history',t:'History & people',g:6,n:'6.1',d:'From Guillain, Barré and Strohl in 1916 to the IGOS cohort'},
 {id:'review',t:'Flashcards & mnemonics',g:6,n:'6.2',d:'Flip cards by part'},
 {id:'quiz',t:'Quiz',g:6,n:'6.3',d:'Questions with explanations'},
 {id:'glossary',t:'Glossary',g:6,n:'6.4',d:'Every term, searchable'},
 {id:'sources',t:'Sources',g:6,n:'6.5',d:'Every reference behind the guide'}
];
const GROUPS={1:['Understanding GBS','g-und','c-und'],2:['Diagnosis','g-dx','c-dx'],3:['Acute care','g-rx','c-rx'],4:['Recovery','g-rec','c-rec'],5:['Special situations & care','g-care','c-care'],6:['Context & review','g-ix','c-ix']};
/* ---- drawing kit for the GBS Companion ----
   All colours come from CSS tokens, so they follow the theme. Every function returns an SVG string, or an object
   with .svg (and usually .at, named anchor points in the caller's SVG coordinates), to concatenate into an <svg>'s
   innerHTML. Everything is schematic: no glyph encodes a measured value unless the caller passes one in, and the
   kit holds no clinical numbers (no thresholds, doses, time windows, scores or trial results). Pass them in from
   the research, with the citation in the surrounding text. Clip paths use fresh ids on every call, so any number
   of glyphs can share a page. Text labels stay a fixed size whatever the scale.

   ORIENTATION. A nerve runs LEFT to RIGHT: the cell body (spinal cord) is off to the left, the muscle off to the
   right, so impulses travel rightwards. A body seen from the front: the person's right is on the viewer's left.

   ---- nerve ----
   nerveFibre(x,y,w,o)  a myelinated motor axon from x to x+w, centre line at y, cut lengthwise: axon core, myelin
                        internodes with lamellae and Schwann-cell nuclei, and nodes of Ranvier between them.
     o.h      outer height of a myelin segment (default 36). o.n number of internodes (default 5).
     o.demy   0..1, or an array with one value per internode: myelin stripped from the paranodes inward (AIDP).
              At 1 the segment is bare axon. o.mac (number or array, 0..1 per internode): a macrophage on it.
     o.remy   0..1 or array: thin new myelin (shorter, paler internodes) grows over the bare stretch.
     o.nodeHit 0..1, or an array with one value per node: the axolemma at that node is attacked (AMAN): antibodies,
              complement and a red, injured node. o.ab false hides the antibodies.
     o.cut    0..1: the axon breaks at that fraction of the length and the distal part degenerates (pale, beaded,
              myelin in ovoids). o.regrow 0..1: a growth cone advances from the break.
     o.pulse  0..1 or null: the impulse's position. o.snap true (default) draws it at the nearest node behind it
              (saltatory); false draws it where it is. o.block index of a node where the impulse stops (a bar).
     o.dim    0..1 fades the whole fibre (context drawing).
     Returns {svg, at:{nodes:[[x,y],...], segs:[[x0,x1],...], top, bot, cut:[x,y]}, X:fraction->x}.

   nodeZoom(x,y,s,o)    close-up of one node of Ranvier. (x,y) = top left; s = scale, 1 = 300 wide, 190 tall.
                        Myelin ends with paranodal loops on each side, the axon below, sodium channels (--nav)
                        clustered in the node gap, gangliosides standing on the membrane.
     o.mode   'aman' (default: gangliosides on the axolemma at the node) | 'aidp' (on the myelin's outer surface).
     o.ab     0..1 antibodies arrive and bind the gangliosides. o.c3 0..1 complement deposits and membrane attack
              pores. o.nav 0..1 the share of sodium channels lost. o.mac 0..1 a macrophage pushes in (in 'aidp' it
              strips myelin; in 'aman' it slides into the periaxonal space). o.labels true names the parts.
     Returns {svg, at:{node,axon,left,right,gang:[[x,y],...]}, w, h}.

   ganglioside(x,y,s,o) a ganglioside standing on a membrane at (x,y), pointing up (o.ang to rotate): a ceramide
                        tail below the line and a sugar chain above it. o.kind 'GM1' | 'GD1a' | 'GD1b' | 'GT1a' |
                        'GQ1b' sets the number of sialic acids (diamonds, 1 to 4). o.col overrides the sugar colour
                        (default --ganglioside; use var(--los) on a bacterium: the same hue on purpose).
   antibody(x,y,s,o)    an IgG molecule, arms up and stem down, with its tip at (x,y) the antigen-binding end.
                        o.ang rotation in degrees, o.col (default --antibody), o.op.
   mac(x,y,r,o)         a complement membrane attack complex, a ring pore seen from above, at (x,y).
   c3dots(x,y,w,n,seed) n small complement deposits scattered along a stretch of membrane.
   macrophage(x,y,r,o)  an amoeboid macrophage centred at (x,y): pseudopods, nucleus, granules. o.seed, o.reach
                        (0..1 how far one pseudopod stretches to the right, o.dir 'r'|'l'|'d').
   campy(x,y,s,o)       Campylobacter jejuni: a curved, spiral rod with a flagellum at each pole, coated with
                        lipo-oligosaccharide sugar beads (--los). (x,y) = centre, s = length. o.ang, o.los false hides
                        the coat, o.ph (0..1) wiggles the flagella.
   virus(x,y,r,o)       a generic enveloped virus with spikes, for CMV, EBV, Zika, influenza or SARS-CoV-2.

   ---- body ----
   bodyFront(x,y,s,o)   a front body outline, centred at x with the top of the head at y, s = height (146 local).
     o.level   0..1 ascending weakness: a --weak wash rises from the feet (0) to the top of the head (1). Hands
               hang low, so they weaken with the trunk, as in GBS. o.zones {legs,arms,trunk,face,eyes} 0..1 for
               other patterns (Miller Fisher: eyes; pharyngeal-cervical-brachial: face, arms, neck). Both may combine.
     o.tingle  0..1 sensory marks at the hands and feet. o.vent true: a breathing tube at the mouth.
     o.pain    0..1 a pain mark in the lower back. o.col overrides the wash colour. o.labels true names the zones.
     Returns {svg, at:{head,eyes,mouth,chest,hand,foot,back}, h}.

   lungs(x,y,s,o)       trachea, two lungs and the diaphragm, front view. (x,y) = top left; s = scale, 1 = 140 wide,
                        120 tall. o.fill 0..1 inflation, o.weak 0..1 the diaphragm washed --weak (a weak breathing muscle),
                        o.tube true an endotracheal tube in the trachea.
     Returns {svg, at:{trachea,left,right,diaphragm}, w, h}.

   ---- shared helpers (from the Stroke Companion's kit, unchanged) ----
   clock(cx,cy,r,min,o)  a clock face with hands at min minutes and a filled sector: o {full (60), col, label, ticks, h0}.
   icons(x,y,o)          an icon array (a 'hundred people' block): o {n (100), cols (10), k (highlighted), size, gap, col,
                         base, shape:'dot'}. Returns {svg,h,at}.
   curve(x,y,w,h,f,o)    a plotted function in a box: o {x0,x1,y0,y1,upto,col,fill,bands,dot,lw,dash}. Returns {svg,X,Y,at}.
   monoFn(P)             monotone cubic through cited points (space nested arrays: see the brief). Returns f(x).
   tline(x,y,w,o)        a horizontal time axis: o {min,max,step,fmt,label,big}. Returns {svg,X}.
   gauge(cx,cy,r,v,max,o) a half-dial gauge: o {bands,label,big}.
   ladder(x,y,w,h,steps,o) rising stairs, one per label: o {at,col,done}. Returns {svg,top(i)}.
   pill(x,y,s,o)         a tablet: o {ang,col,txt,round}.
   person(x,y,s,fill,o)  a person pictogram, (x,y) its top centre.
   smoothPath(P,closed)  Catmull-Rom path through points.   inPoly(p,P) point in polygon.   ptsD(P) polyline path.
   bezPts(segs,N)        sample a chain of cubic Beziers.   marker(id,color) (core) an arrowhead for <defs>.
   kitLabel(x,y,text,o)  a small label with a halo so it reads on any drawing: o {a:'m'|'e', halo (var(--panel))}.
   blob(cx,cy,r,seed,o)  an irregular closed path string: o {n (18), rough (.16), sq}. */
function smoothPath(P,closed=true){const n=P.length;let d=`M${f1(P[0][0])} ${f1(P[0][1])}`;
  for(let i=0;i<(closed?n:n-1);i++){const p0=P[closed?(i-1+n)%n:Math.max(0,i-1)],p1=P[i],p2=P[(i+1)%n],p3=P[closed?(i+2)%n:Math.min(n-1,i+2)];
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
/* ---- kit internals ---- */
let _kid=0;
const kid=p=>p+'_'+(++_kid);
function kitLabel(x,y,t,o={}){return `<text x="${f1(x)}" y="${f1(y)}" class="t-xs${o.a==='m'?' t-mid':o.a==='e'?' t-end':''}" style="fill:var(--ink);font-weight:700;paint-order:stroke;stroke:${o.halo||'var(--panel)'};stroke-width:3px;stroke-linejoin:round">${t}</text>`}
/* Catmull-Rom points through P, k per span */
function crPts(P,closed=true,k=6){const n=P.length,out=[],m=closed?n:n-1;
  for(let i=0;i<m;i++){const a=P[closed?(i-1+n)%n:Math.max(0,i-1)],b=P[i],c=P[(i+1)%n],d=P[closed?(i+2)%n:Math.min(n-1,i+2)];
    for(let j=0;j<k;j++){const t=j/k,u=t*t,v=u*t,f=q=>.5*(2*b[q]+(c[q]-a[q])*t+(2*a[q]-5*b[q]+4*c[q]-d[q])*u+(3*b[q]-a[q]-3*c[q]+d[q])*v);out.push([f(0),f(1)])}}
  if(!closed)out.push(P[n-1]);return out}
/* rolling bumps along a dense closed outline: rounded gyri meeting at narrow dips */
function gyrate(P,amp,per,seed=1){const n=P.length,rr=rng(seed),ph=[rr()*6,rr()*6];let s=0;const out=[];
  for(let i=0;i<n;i++){const a=P[(i-1+n)%n],b=P[i],c=P[(i+1)%n],dx=c[0]-a[0],dy=c[1]-a[1],l=Math.hypot(dx,dy)||1;s+=Math.hypot(b[0]-a[0],b[1]-a[1])/2;
    const w=s/per+.28*Math.sin(s/per*.9+ph[0]),h=Math.pow(Math.abs(Math.sin(Math.PI*w)),.55)-.55,k=amp*h*(1+.3*Math.sin(s/per*.37+ph[1]));
    out.push([b[0]+dy/l*k,b[1]-dx/l*k])}
  return out}
/* an irregular closed path, for lesions and clots */
function blob(cx,cy,r,seed=1,o={}){const n=o.n||18,ro=o.rough==null?.16:o.rough,rr=rng(seed),P=[];
  for(let i=0;i<n;i++){const a=i/n*Math.PI*2,k=1+(rr()-.5)*ro*2;P.push([cx+Math.cos(a)*r*k,cy+Math.sin(a)*r*k*(o.sq||1)])}
  return smoothPath(P)}

/* ---- brainSide: local box 300 x 250, facing left ---- */
/* ---- nerve ---- */
const NV_SIAL={GM1:1,GD1a:2,GD1b:2,GT1a:3,GQ1b:4};
const nvArr=(v,n)=>Array.from({length:n},(_,i)=>Array.isArray(v)?clamp(v[i]||0):clamp(v||0));
function ganglioside(x,y,s=24,o={}){const k=s/24,col=o.col||'var(--ganglioside)',ns=NV_SIAL[o.kind||'GM1']||1;
  let g=`<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.ang||0)}) scale(${k.toFixed(3)})" style="opacity:${o.op==null?1:o.op}">`;
  g+=`<path d="M-1.6 0V6M1.6 0V6" style="stroke:var(--muted);stroke-width:1.2;stroke-linecap:round"/>`;
  g+=`<path d="M0 0V-18" style="stroke:${col};stroke-width:1.4"/>`;
  [-4,-9,-14,-19].forEach((yy,i)=>{g+=`<circle cx="0" cy="${yy}" r="${i===3?2.4:2.1}" style="fill:${col}"/>`});
  for(let i=0;i<ns;i++){const yy=-7-i*4.6,xx=i%2?-4.6:4.6;g+=`<path d="M0 ${f1(yy+1)}L${f1(xx*.55)} ${f1(yy)}" style="stroke:${col};stroke-width:1"/><rect x="${f1(xx-1.9)}" y="${f1(yy-1.9)}" width="3.8" height="3.8" transform="rotate(45 ${f1(xx)} ${f1(yy)})" style="fill:var(--panel);stroke:${col};stroke-width:1.2"/>`}
  return g+'</g>'}
function antibody(x,y,s=18,o={}){const k=s/18,col=o.col||'var(--antibody)';
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.ang||0)}) scale(${k.toFixed(3)})" style="opacity:${o.op==null?1:o.op}"><path d="M-7 0L0 7.5L7 0M0 7.5V18" style="fill:none;stroke:${col};stroke-width:3.2;stroke-linecap:round;stroke-linejoin:round"/><path d="M-4.4 -1.8L-8.8 2.4M4.4 -1.8L8.8 2.4" style="stroke:${col};stroke-width:2;stroke-linecap:round;opacity:.65"/></g>`}
function mac(x,y,r=5,o={}){return `<g style="opacity:${o.op==null?1:o.op}"><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="fill:none;stroke:var(--complement);stroke-width:${f1(r*.55)}"/><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r*.38)}" style="fill:var(--panel)"/></g>`}
function c3dots(x,y,w,n,seed=3){const rr=rng(seed);let s='';for(let i=0;i<n;i++){s+=`<circle cx="${f1(x+rr()*w)}" cy="${f1(y+(rr()-.5)*6)}" r="${f1(1.6+rr()*1.2)}" style="fill:var(--complement)"/>`}return s}
function macrophage(x,y,r=16,o={}){const rr=rng(o.seed||7),P=[],n=14,reach=clamp(o.reach||0),dir=o.dir||'r',da=dir==='l'?Math.PI:dir==='d'?Math.PI/2:0;
  for(let i=0;i<n;i++){const a=i/n*Math.PI*2;let k=1+(rr()-.5)*.34+(i%4===0?.22:0);const dd=Math.cos(a-da);if(dd>.8)k+=reach*1.1*(dd-.8)/.2;P.push([x+Math.cos(a)*r*k,y+Math.sin(a)*r*k*.86])}
  let s=`<path d="${smoothPath(P)}" style="fill:var(--macrophage);opacity:.92;stroke:var(--ink);stroke-width:1"/>`;
  s+=`<path d="${blob(x-r*.12,y+r*.06,r*.36,o.seed||7,{n:10,rough:.22})}" style="fill:var(--ink);opacity:.35"/>`;
  for(let i=0;i<5;i++){s+=`<circle cx="${f1(x+(rr()-.5)*r*1.1)}" cy="${f1(y+(rr()-.5)*r*.9)}" r="${f1(1.2+rr())}" style="fill:var(--ink);opacity:.3"/>`}
  return s}
function campy(x,y,s=60,o={}){const k=s/60,id=kid('cj'),ph=(o.ph||0)*Math.PI*2;
  const body='M-28 4C-22 -10 -12 -10 -4 0S14 10 22 -2C25 -7 28 -8 30 -6';
  let g=`<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.ang||0)}) scale(${k.toFixed(3)})">`;
  const fl=(sx,sy,dir)=>{let d=`M${sx} ${sy}`;for(let i=1;i<=10;i++){d+=`L${f1(sx+dir*i*2.6)} ${f1(sy+Math.sin(i*.9+ph)*3)}`}return d};
  g+=`<path d="${fl(-30,5,-1)}" style="fill:none;stroke:var(--bact);stroke-width:1.2"/><path d="${fl(31,-6,1)}" style="fill:none;stroke:var(--bact);stroke-width:1.2"/>`;
  g+=`<path d="${body}" style="fill:none;stroke:var(--ink);stroke-width:9.4;stroke-linecap:round;opacity:.5"/><path d="${body}" style="fill:none;stroke:var(--bact);stroke-width:8;stroke-linecap:round"/>`;
  if(o.los!==false){[[-24,-4,-30],[-14,-9,-10],[-4,-6,10],[8,4,170],[18,4,160],[26,-12,-20],[-20,10,180],[0,9,180]].forEach(([a,b,an])=>{g+=ganglioside(a,b,10,{ang:an,kind:'GM1',col:'var(--los)'})})}
  return g+'</g>'}
function virus(x,y,r=12,o={}){const col=o.col||'var(--virus)';let s='';
  for(let i=0;i<12;i++){const a=i/12*Math.PI*2;s+=`<line x1="${f1(x+Math.cos(a)*r)}" y1="${f1(y+Math.sin(a)*r)}" x2="${f1(x+Math.cos(a)*r*1.35)}" y2="${f1(y+Math.sin(a)*r*1.35)}" style="stroke:${col};stroke-width:1.6"/><circle cx="${f1(x+Math.cos(a)*r*1.38)}" cy="${f1(y+Math.sin(a)*r*1.38)}" r="${f1(r*.12)}" style="fill:${col}"/>`}
  return s+`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" style="fill:${col};opacity:.55;stroke:${col};stroke-width:1.4"/><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r*.5)}" style="fill:none;stroke:var(--ink);stroke-width:1;opacity:.4"/>`}
function nerveFibre(x,y,w,o={}){const n=o.n||5,h=o.h||36,gap=Math.max(6,h*.24),ah=h*.36,sw=(w-gap*(n+1))/n,dim=o.dim==null?1:1-clamp(o.dim)*.7;
  const demy=nvArr(o.demy,n),remy=nvArr(o.remy,n),macs=nvArr(o.mac,n),hit=nvArr(o.nodeHit,n+1),cut=o.cut==null?null:clamp(o.cut),X=f=>x+f*w;
  const segs=[],nodes=[];for(let i=0;i<=n;i++){const nx=x+gap/2+i*(sw+gap);nodes.push([nx,y]);if(i<n)segs.push([nx+gap/2,nx+gap/2+sw])}
  const cx=cut==null?null:X(cut),regrow=clamp(o.regrow||0);
  let s=`<g style="opacity:${f1(dim)}">`;
  /* axon core */
  if(cx==null)s+=`<rect x="${f1(x)}" y="${f1(y-ah/2)}" width="${f1(w)}" height="${f1(ah)}" rx="${f1(ah/2)}" style="fill:var(--axon);stroke:var(--axon-line);stroke-width:1.2"/>`;
  else{s+=`<rect x="${f1(x)}" y="${f1(y-ah/2)}" width="${f1(cx-x-3)}" height="${f1(ah)}" rx="${f1(ah/2)}" style="fill:var(--axon);stroke:var(--axon-line);stroke-width:1.2"/>`;
    const rr=rng(11);for(let bx=cx+6;bx<x+w-4;bx+=ah*1.1){s+=`<ellipse cx="${f1(bx)}" cy="${f1(y+(rr()-.5)*2)}" rx="${f1(ah*.42)}" ry="${f1(ah*.34)}" style="fill:var(--axon);stroke:var(--axon-line);stroke-width:1;opacity:.45;stroke-dasharray:2 2"/>`}
    s+=`<path d="M${f1(cx-3)} ${f1(y-ah/2-3)}L${f1(cx+1)} ${f1(y-2)}L${f1(cx-4)} ${f1(y+2)}L${f1(cx)} ${f1(y+ah/2+3)}" style="fill:none;stroke:var(--damage);stroke-width:2"/>`;
    if(regrow>0){const gx=cx+regrow*(x+w-cx-10);s+=`<rect x="${f1(cx-3)}" y="${f1(y-ah*.3)}" width="${f1(gx-cx+3)}" height="${f1(ah*.6)}" rx="${f1(ah*.3)}" style="fill:var(--axon);stroke:var(--rec);stroke-width:1.4"/><path d="M${f1(gx)} ${f1(y-ah*.5)}l6 -4M${f1(gx)} ${f1(y)}l8 0M${f1(gx)} ${f1(y+ah*.5)}l6 4" style="stroke:var(--rec);stroke-width:1.6;stroke-linecap:round"/>`}}
  /* myelin internodes */
  segs.forEach(([a,b],i)=>{const mid=(a+b)/2,distal=cx!=null&&mid>cx;
    if(distal){const rr=rng(20+i);for(let k=0;k<3;k++){const ox=a+sw*(.18+k*.32);s+=`<ellipse cx="${f1(ox)}" cy="${f1(y)}" rx="${f1(sw*.12)}" ry="${f1(h*.36)}" style="fill:var(--myelin);stroke:var(--myelin-line);stroke-width:1;opacity:.6"/>`}return}
    const d=demy[i],keep=1-d,half=sw/2*keep;
    if(keep>.02){const x0=mid-half,x1=mid+half,r=Math.min(h/2,half);
      s+=`<rect x="${f1(x0)}" y="${f1(y-h/2)}" width="${f1(x1-x0)}" height="${f1(h)}" rx="${f1(r)}" style="fill:var(--myelin);stroke:var(--myelin-line);stroke-width:1.4"/>`;
      for(let l=1;l<=3;l++){const yy=h/2*(.42+l*.15);s+=`<path d="M${f1(x0+r*.7)} ${f1(y-yy)}H${f1(x1-r*.7)}M${f1(x0+r*.7)} ${f1(y+yy)}H${f1(x1-r*.7)}" style="stroke:var(--myelin-line);stroke-width:.7;opacity:.55"/>`}
      s+=`<rect x="${f1(x0+r*.35)}" y="${f1(y-ah/2)}" width="${f1(Math.max(0,x1-x0-r*.7))}" height="${f1(ah)}" style="fill:var(--axon)"/>`;
      if(keep>.5)s+=`<ellipse cx="${f1(mid)}" cy="${f1(y-h/2+h*.13)}" rx="${f1(Math.min(9,half*.4))}" ry="${f1(h*.08)}" style="fill:var(--schwann)"/>`}
    if(d>0&&d<1){/* ragged stripped ends */const rr=rng(30+i);[mid-half,mid+half].forEach(ex=>{for(let k=0;k<3;k++)s+=`<circle cx="${f1(ex+(rr()-.5)*8)}" cy="${f1(y+(rr()-.5)*h*.8)}" r="${f1(1.4+rr()*1.4)}" style="fill:var(--myelin);stroke:var(--myelin-line);stroke-width:.7"/>`})}
    if(remy[i]>0){const rw=sw*.42*remy[i],rh=h*.66;[[a+2,a+2+rw],[b-2-rw,b-2]].forEach(([p,q])=>{if(q-p>2)s+=`<rect x="${f1(p)}" y="${f1(y-rh/2)}" width="${f1(q-p)}" height="${f1(rh)}" rx="${f1(Math.min(rh/2,(q-p)/2))}" style="fill:var(--remyelin);stroke:var(--myelin-line);stroke-width:1"/><rect x="${f1(p+2)}" y="${f1(y-ah/2)}" width="${f1(Math.max(0,q-p-4))}" height="${f1(ah)}" style="fill:var(--axon)"/>`})}
    if(macs[i]>0)s+=`<g style="opacity:${f1(macs[i])}">${macrophage(mid,y-h/2-h*.25,h*.36,{seed:5+i,reach:macs[i],dir:'d'})}</g>`});
  /* nodes */
  nodes.forEach(([nx],i)=>{const v=hit[i],distal=cx!=null&&nx>cx;if(distal)return;
    s+=`<rect x="${f1(nx-gap/2+1)}" y="${f1(y-ah/2-1.5)}" width="${f1(gap-2)}" height="${f1(ah+3)}" rx="2" style="fill:${v>.3?'var(--damage)':'var(--node)'};opacity:${f1(.55+.45*Math.max(v,.4))}"/>`;
    if(v>0){if(o.ab!==false){s+=antibody(nx-3,y-ah/2-2,11,{ang:-20,op:v})+antibody(nx+3,y+ah/2+2,11,{ang:160,op:v})}
      if(v>.5)s+=mac(nx,y-ah/2-16,3.4,{op:(v-.5)*2})}});
  /* impulse */
  let pX=null;if(o.pulse!=null){const p=clamp(o.pulse),px=X(p);pX=px;if(o.snap!==false){let best=nodes[0][0];nodes.forEach(([nx])=>{if(nx<=px+1)best=nx});pX=best}
    if(o.block!=null&&nodes[o.block]&&pX>nodes[o.block][0])pX=nodes[o.block][0];
    s+=`<circle cx="${f1(pX)}" cy="${f1(y)}" r="${f1(ah*.9)}" style="fill:var(--impulse);opacity:.35"/><circle cx="${f1(pX)}" cy="${f1(y)}" r="${f1(ah*.45)}" style="fill:var(--impulse);stroke:var(--ink);stroke-width:1"/>`}
  if(o.block!=null&&nodes[o.block]){const bx=nodes[o.block][0]+gap*.5+2;s+=`<line x1="${f1(bx)}" x2="${f1(bx)}" y1="${f1(y-h*.7)}" y2="${f1(y+h*.7)}" style="stroke:var(--damage);stroke-width:3;stroke-linecap:round"/>`}
  s+='</g>';
  return {svg:s,at:{nodes,segs,top:y-h/2,bot:y+h/2,cut:cx==null?null:[cx,y],pulse:pX},X}}
function nodeZoom(x,y,s=1,o={}){const k=s,mode=o.mode||'aman',ab=clamp(o.ab||0),c3=clamp(o.c3||0),navL=clamp(o.nav||0),mc=clamp(o.mac||0),id=kid('nz');
  const P=(a,b)=>[x+a*k,y+b*k],q=(a,b)=>`${f1(x+a*k)} ${f1(y+b*k)}`;
  /* local: axon membrane (axolemma) top at 110, axon 110..170; myelin left 0..112, right 188..300, from 30 to 110 */
  let g=`<rect x="${f1(x)}" y="${f1(y+110*k)}" width="${f1(300*k)}" height="${f1(62*k)}" style="fill:var(--axon);stroke:var(--axon-line);stroke-width:1.2"/>`;
  g+=`<line x1="${f1(x)}" x2="${f1(x+300*k)}" y1="${f1(y+110*k)}" y2="${f1(y+110*k)}" style="stroke:var(--axon-line);stroke-width:2"/>`;
  const strip=mode==='aidp'?mc:0;
  [[0,112,1],[188,300,-1]].forEach(([a,b,dir])=>{const inner=dir>0?b:a;const shift=strip*40*dir;
    const x0=Math.min(a,b),x1=Math.max(a,b);
    const xa=dir>0?x0:x1+0,xb=inner-shift;const L=Math.min(xa,xb),R=Math.max(xa,xb);
    if(R-L>4)g+=`<rect x="${f1(x+L*k)}" y="${f1(y+30*k)}" width="${f1((R-L)*k)}" height="${f1(78*k)}" style="fill:var(--myelin);stroke:var(--myelin-line);stroke-width:1.4"/>`;
    for(let l=0;l<5;l++){const yy=38+l*14;g+=`<path d="M${q(L+6,yy)}H${f1(x+(R-6)*k)}" style="stroke:var(--myelin-line);stroke-width:.8;opacity:.5"/>`}
    /* paranodal loops */
    for(let l=0;l<5;l++){const yy=40+l*14,cxl=xb-dir*6;g+=`<ellipse cx="${f1(x+cxl*k)}" cy="${f1(y+yy*k)}" rx="${f1(7*k)}" ry="${f1(6*k)}" style="fill:var(--myelin);stroke:var(--myelin-line);stroke-width:1"/>`}});
  /* sodium channels in the node */
  for(let i=0;i<6;i++){const cxn=126+i*9.6,lost=i/6<navL;g+=`<rect x="${f1(x+(cxn-2.6)*k)}" y="${f1(y+104*k)}" width="${f1(5.2*k)}" height="${f1(12*k)}" rx="${f1(2*k)}" style="fill:${lost?'var(--panel-2)':'var(--nav)'};stroke:${lost?'var(--line)':'var(--ink)'};stroke-width:.8;opacity:${lost?.6:1}"/>`}
  /* gangliosides */
  const gs=mode==='aidp'?[[20,30],[60,30],[95,30],[205,30],[240,30],[280,30]]:[[124,110],[138,110],[152,110],[166,110],[178,110]];
  const gang=[];gs.forEach(([a,b],i)=>{gang.push(P(a,b));g+=ganglioside(x+a*k,y+b*k,16*k,{kind:'GM1'})});
  /* antibodies descend */
  gs.forEach(([a,b],i)=>{if(ab<=0)return;const d=(1-ab)*60;g+=antibody(x+a*k,y+(b-19-d)*k,13*k,{ang:180,op:Math.min(1,ab*1.6)})});
  if(c3>0){g+=`<g style="opacity:${f1(c3)}">`+c3dots(x+(mode==='aidp'?10:118)*k,y+(mode==='aidp'?24:100)*k,(mode==='aidp'?280:66)*k,mode==='aidp'?14:10,9);
    (mode==='aidp'?[[40,30],[260,30]]:[[132,110],[170,110]]).forEach(([a,b])=>{g+=mac(x+a*k,y+(b+2)*k,5*k)});g+='</g>';
    if(mode==='aman'&&c3>.6)g+=`<rect x="${f1(x+118*k)}" y="${f1(y+108*k)}" width="${f1(64*k)}" height="${f1(5*k)}" style="fill:var(--damage);opacity:${f1((c3-.6)*2.2)}"/>`}
  if(mc>0){const mx=mode==='aidp'?150:150,my=mode==='aidp'?14:74;g+=`<g style="opacity:${f1(Math.min(1,mc*1.5))}">${macrophage(x+mx*k,y+(my-(1-mc)*30)*k,24*k,{seed:4,reach:mc,dir:'d'})}</g>`}
  if(o.labels){g+=kitLabel(x+56*k,y+24*k,'myelin',{a:'m'})+kitLabel(x+150*k,y+(mode==='aidp'?98:92)*k-(mode==='aman'&&ab>0?0:0),'node',{a:'m'})+kitLabel(x+150*k,y+150*k,'axon',{a:'m'})+kitLabel(x+150*k,y+132*k,'sodium channels',{a:'m'})}
  return {svg:g,at:{node:P(150,110),axon:P(150,145),left:P(56,70),right:P(244,70),gang},w:300*k,h:190*k}}

/* ---- body ---- */
const BODY_PATH='M0 -50C7 -50 11 -45 11 -39C11 -35 9 -31 6 -29V-25C14 -24 21 -22 24 -16C26 -8 29 8 31 22C32 26 31 28 28 28C26 28 25 26 24 23L19 -2L17 6L18 24L18 52C18 60 15 72 14 90C14 94 12 96 8 96C4 96 3 94 3 90L2 52L0 34L-2 52L-3 90C-3 94 -4 96 -8 96C-12 96 -14 94 -14 90C-15 72 -18 60 -18 52L-18 24L-17 6L-19 -2L-24 23C-25 26 -26 28 -28 28C-31 28 -32 26 -31 22C-29 8 -26 -8 -24 -16C-21 -22 -14 -24 -6 -25V-29C-9 -31 -11 -35 -11 -39C-11 -45 -7 -50 0 -50Z';
function bodyFront(x,y,s=146,o={}){const k=s/146,id=kid('bf'),col=o.col||'var(--weak)',lv=clamp(o.level||0),Z=o.zones||{};
  const T=(a,b)=>[x+a*k,y+(b+50)*k];
  let g=`<g transform="translate(${f1(x)} ${f1(y+50*k)}) scale(${k.toFixed(3)})"><clipPath id="${id}"><path d="${BODY_PATH}"/></clipPath><path d="${BODY_PATH}" style="fill:var(--skin)"/><g clip-path="url(#${id})">`;
  if(lv>0){const top=lerp(97,-51,lv);g+=`<rect x="-40" y="${f1(top)}" width="80" height="${f1(97-top+2)}" style="fill:${col};opacity:.72"/><line x1="-40" x2="40" y1="${f1(top)}" y2="${f1(top)}" style="stroke:${col};stroke-width:${f1(1.6/k)}"/>`}
  const zr={legs:[[-20,30,40,70]],arms:[[-34,-20,15,50],[19,-20,15,50]],trunk:[[-18,-25,36,58]],face:[[-12,-50,24,22]],neck:[[-8,-30,16,8]]};
  Object.keys(zr).forEach(z=>{if(Z[z]>0)zr[z].forEach(([a,b,w,h])=>{g+=`<rect x="${a}" y="${b}" width="${w}" height="${h}" style="fill:${col};opacity:${f1(clamp(Z[z])*.72)}"/>`})});
  g+=`</g><path d="${BODY_PATH}" style="fill:none;stroke:var(--ink);stroke-width:${f1(1.3/k)};stroke-linejoin:round"/>`;
  /* eyes and mouth */
  const ez=clamp(Z.eyes||0);
  [-4,4].forEach(ex=>{g+=`<ellipse cx="${ex}" cy="-41" rx="1.9" ry="${f1(1.3-ez*.8)}" style="fill:var(--ink)"/>`;if(ez>0)g+=`<path d="M${ex-3} -43.5Q${ex} ${f1(-44.5+ez*2.2)} ${ex+3} -43.5" style="fill:none;stroke:${col};stroke-width:${f1(1.4/k)};opacity:${f1(ez)}"/>`});
  g+=`<path d="M-3 -34.5Q0 -33.2 3 -34.5" style="fill:none;stroke:var(--ink);stroke-width:${f1(.9/k)}"/>`;
  if(o.vent)g+=`<path d="M0 -34V-31Q0 -27 6 -27H34" style="fill:none;stroke:var(--device);stroke-width:${f1(2.4/k)};stroke-linecap:round"/>`;
  const tg=clamp(o.tingle||0);if(tg>0){[[-30,30],[30,30],[-9,99],[9,99]].forEach(([a,b])=>{g+=`<path d="M${a-4} ${b+3}l2 -3l2 3l2 -3l2 3" style="fill:none;stroke:var(--accent);stroke-width:${f1(1.3/k)};opacity:${f1(tg)}"/>`})}
  const pn=clamp(o.pain||0);if(pn>0)g+=`<path d="M-6 14l3 -4l3 4l3 -4l3 4" style="fill:none;stroke:var(--damage);stroke-width:${f1(1.6/k)};opacity:${f1(pn)}"/>`;
  g+='</g>';
  if(o.labels){g+=kitLabel(x-38*k,y+(50+60)*k,'legs',{a:'e'})+kitLabel(x+38*k,y+(50+10)*k,'arms')+kitLabel(x+16*k,y+(50-42)*k,'face')}
  return {svg:g,at:{head:T(0,-40),eyes:T(0,-41),mouth:T(0,-34),chest:T(0,-12),hand:T(30,26),foot:T(-9,94),back:T(0,14)},h:146*k}}
function lungs(x,y,s=1,o={}){const k=s,f=clamp(o.fill==null?.5:o.fill),wk=clamp(o.weak||0),sc=.86+.14*f,dy=(1-f)*8;
  const P=(a,b)=>`${f1(x+a*k)} ${f1(y+b*k)}`;
  const lobe=(cx,dir)=>{const w=44*sc,h=78*sc,top=22,cy=top+h/2;return `M${P(cx,top)}C${P(cx+dir*w*.9,top+4)} ${P(cx+dir*w*1.05,cy+20)} ${P(cx+dir*w*.85,top+h-dy)}C${P(cx+dir*w*.5,top+h+4-dy)} ${P(cx+dir*6,top+h-4-dy)} ${P(cx,top+h*.7)}Z`};
  let g=`<path d="${lobe(62,-1)}" style="fill:var(--lung);stroke:var(--ink);stroke-width:1.2;opacity:${f1(.65+.35*f)}"/><path d="${lobe(78,1)}" style="fill:var(--lung);stroke:var(--ink);stroke-width:1.2;opacity:${f1(.65+.35*f)}"/>`;
  g+=`<path d="M${P(70,0)}L${P(70,30)}M${P(70,30)}L${P(60,42)}M${P(70,30)}L${P(80,42)}" style="fill:none;stroke:var(--ink);stroke-width:${f1(5*k)};stroke-linecap:round;opacity:.35"/>`;
  const dyd=106-dy*1.2;
  g+=`<path d="M${P(8,dyd+8)}Q${P(70,dyd-22+dy*1.6)} ${P(132,dyd+8)}" style="fill:none;stroke:${wk>0?'var(--weak)':'var(--muscle)'};stroke-width:${f1(6*k)};stroke-linecap:round;opacity:${f1(.6+.4*Math.max(wk,.5))}"/>`;
  if(o.tube)g+=`<path d="M${P(70,-14)}L${P(70,26)}" style="stroke:var(--device);stroke-width:${f1(3*k)};stroke-linecap:round"/>`;
  return {svg:g,at:{trachea:[x+70*k,y+12*k],left:[x+96*k,y+60*k],right:[x+44*k,y+60*k],diaphragm:[x+70*k,y+(dyd-6)*k]},w:140*k,h:120*k}}
/* =============== routing (shared: tools/core/03-router.js) =============== */
const inits={},onShow={},onHide={};let cur=null;
/* Each module is its own page, so search engines can index it: the body names the
   module (data-page) and the way back up to the companion's first page (data-root).
   A page that carries every module, like the artifact, has no data-page and switches
   modules by #hash. */
const PAGE=document.body.dataset.page||'',UP=document.body.dataset.root||'';
const href=id=>PAGE?(id==='home'?UP||'./':UP+id+'/'):'#'+id;
function go(id,hash,replace){const u=href(id)+(location.protocol==='file:'?'index.html':'')+(hash||'');replace?location.replace(u):location.assign(u)}
/* the first page opened in a tab (not one reached by a click inside the guide) may reopen the module last read */
let fresh=false;try{fresh=!sessionStorage.getItem(PREFIX+'tab');sessionStorage.setItem(PREFIX+'tab','1')}catch(e){}
(function buildNav(){
  const amp=s=>s.replace(/&/g,'&amp;');
  let h='';
  for(const g of Object.keys(GROUPS).map(Number)){
    h+=`<div class="navgroup ${GROUPS[g][1]}"><h3>${amp(GROUPS[g][0])}</h3><ol>`;
    MODS.filter(m=>m.g===g).forEach(m=>{h+=`<li><a class="navbtn" href="${href(m.id)}" data-go="${m.id}"><span class="n">${m.n}</span><span>${amp(m.t)}</span></a></li>`});
    h+='</ol></div>';
  }
  $('#navgroups').innerHTML=h;
  let u='';
  Object.keys(GROUPS).map(Number).forEach(g=>{
    u+=`<div class="unit"><p class="eyebrow">Part ${g}</p><h2>${amp(GROUPS[g][0])}</h2><ol>`;
    MODS.filter(m=>m.g===g).forEach(m=>{u+=`<li><button data-go="${m.id}"><span class="n">${m.n}</span><b>${amp(m.t)}</b><small>${m.d}</small></button></li>`});
    u+='</ol></div>';
  });
  if($('#homeUnits'))$('#homeUnits').innerHTML=u;
  MODS.forEach((m,i)=>{
    const sec=$('#m-'+m.id);if(!sec)return;
    if(m.g)sec.classList.add(GROUPS[m.g][2]);
    if(m.id==='home')return;
    const p=MODS[i-1],n=MODS[i+1];
    const pg=document.createElement('div');pg.className='pager';
    pg.innerHTML=(p?`<button data-go="${p.id}"><small>← Previous</small><span>${amp(p.t)}</span></button>`:'')+(n?`<button class="next" data-go="${n.id}"><small>Next →</small><span>${amp(n.t)}</span></button>`:'');
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
  /* the skip link focuses the main column when that can take focus (it has a tabindex); otherwise the browser follows #main */
  const sk=e.target.closest('.skip'),mn=sk&&$('#main');if(mn&&mn.hasAttribute('tabindex')){e.preventDefault();mn.focus();return}
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
/* =============== home: an infection, a cross-reacting attack on the nerve, the climb of weakness, and the long way back =============== */
/* Everything drawn here is a schematic with no figures: the time axis and the weakness level have no scale.
   Module 1.6 tells the course with sources. */
const HOME_CAP='Schematic, not to scale: no times or proportions are shown here. Module 1.6 gives them, with sources.';
const HOME_PH=[
  {from:0,t:'An infection first',sub:'often a gut or chest infection, a few weeks before',k:'infection'},
  {from:.16,t:'Antibodies cross-react',sub:'some made against the germ also bind the nerve',k:'attack'},
  {from:.32,t:'Weakness climbs',sub:'from the feet upward, with tingling, over days',k:'climb'},
  {from:.5,t:'The weakest point',sub:'within four weeks; some need help to breathe',k:'nadir'},
  {from:.64,t:'A plateau',sub:'no worse, not yet better',k:'plateau'},
  {from:.78,t:'The long way back',sub:'myelin repairs, axons regrow, strength returns',k:'recovery'}];
/* the weakness level, 0..1, along the schematic course */
function homeLevel(t){if(t<.32)return 0;if(t<.52)return .82*ease(ramp(t,.32,.52));if(t<.76)return .82;return lerp(.82,.12,ease(ramp(t,.76,1)))}
inits.home=()=>{
  const svg=$('#heroSvg'),rg=$('#heroT'),cap=$('#heroCap');
  function draw(t){const N=vb(svg,'520 300','400 540'),p=phaseOf(HOME_PH,t),P=HOME_PH[p];
    const L=N?{tx:12,ty:24,bx:150,by:62,bs:200,gx:182,gy:120,nx:16,ny:332,nw:368,cx:30,cy:404,cw:356,ch:80,lx:12,ly:518,lw:376}
             :{tx:14,ty:24,bx:70,by:52,bs:190,gx:150,gy:110,nx:170,ny:118,nw:336,cx:184,cy:176,cw:320,ch:62,lx:14,ly:270,lw:492};
    const lv=homeLevel(t),inf=1-ramp(t,.18,.3),hit=ramp(t,.16,.3)*(1-ramp(t,.8,.98)),remy=ramp(t,.8,1),demy=ramp(t,.2,.4)*(1-ramp(t,.82,1)*.0);
    let s=`<text x="${L.tx}" y="${L.ty}" class="t-big" style="font-size:19px;fill:${p>=5?'var(--rec)':p>=1?'var(--brand)':'var(--ink)'}">${P.t}</text><text x="${L.tx}" y="${L.ty+15}" class="t-sm">${P.sub}</text>`;
    /* the body */
    const B=bodyFront(L.bx,L.by,L.bs,{level:lv,tingle:ramp(t,.3,.36)*(1-ramp(t,.84,.96)),vent:t>=.5&&t<.76});
    s+=B.svg;
    if(inf>0){const g=B.at.chest;s+=`<g style="opacity:${f1(inf)}">`+campy(g[0]+(N?70:62),g[1]+38,46,{ang:-12,ph:t*8})+kitLabel(g[0]+(N?70:62),g[1]+70,'gut infection',{a:'m'})+'</g>'}
    if(t>=.5&&t<.76)s+=kitLabel(B.at.mouth[0]+36,B.at.mouth[1]-10,'breathing support',{});
    /* the nerve */
    const nv=nerveFibre(L.nx,L.ny,L.nw,{n:5,h:30,nodeHit:[0,hit,hit*.8,hit,0,0],demy:[demy*.6,demy,demy*.3,0,0],remy:[remy,remy,remy*.7,0,0],mac:[0,demy*(1-remy),0,0,0],pulse:t>=.5&&t<.76?null:((t*9)%1),block:t>.3&&t<.86?1:undefined});
    s+=`<text x="${N?L.nx:L.nx+150}" y="${L.ny-34}" class="t-xs" style="fill:var(--ink);font-weight:700">a motor nerve fibre</text>`+nv.svg;
    if(hit>.3)s+=kitLabel(nv.at.nodes[2][0],L.ny+34,'antibodies at the node',{a:'m'});
    else if(remy>.3)s+=kitLabel(nv.at.nodes[2][0],L.ny+34,'thin new myelin',{a:'m'});
    /* the disability course */
    const c=curve(L.cx,L.cy,L.cw,L.ch,homeLevel,{upto:t,col:'var(--weak)',fill:true,dot:true});
    s+=c.svg+`<text x="${L.cx}" y="${L.cy-6}" class="t-xs" style="fill:var(--ink);font-weight:700">weakness over time (schematic)</text>`;
    /* phase strip */
    const sw=L.lw/HOME_PH.length;
    HOME_PH.forEach((q,i)=>{const on=i===p,x=L.lx+i*sw;s+=`<rect x="${f1(x+1)}" y="${L.ly}" width="${f1(sw-2)}" height="6" rx="3" style="fill:${on?'var(--brand)':'var(--panel-2)'}"/><text x="${f1(x+sw/2)}" y="${L.ly+20}" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:700':''}">${q.k}</text>`});
    const mx=L.lx+L.lw*t;s+=`<circle cx="${f1(mx)}" cy="${L.ly+3}" r="5.5" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;
    svg.innerHTML=s;
    if(cap.textContent!==HOME_CAP)cap.textContent=HOME_CAP;
    rg.setAttribute('aria-valuetext',`${P.t}: ${P.sub}`)}
  playWire(rg,$('#heroPlay'),draw,20000,'Replay','home');draw(+rg.value);
};
/* =============== 1.1 what GBS is =============== */
/* Player: one person's peripheral nerves through infection, attack, climbing weakness, the worst point and recovery.
   Everything in that drawing is schematic: the order follows the sources, the timing and bar levels do not encode data. */
const WH_STEPS=[
 {from:0,at:.06,s:'nerves',k:'Where',t:'The peripheral nerves',
  txt:'GBS is a rare but potentially fatal immune-mediated disease of the peripheral nerves and nerve roots, usually triggered by an infection. <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup> These are the nerves outside the brain and spinal cord. Besides weakness and changed sensation, GBS can affect the cranial nerves of the face and throat, breathing, the autonomic nerves that steady blood pressure, heart rate, bowel and bladder, and it often causes pain. <sup class="c" data-ref="vanDoorn2023,Leonhard2019" title="Source 266,473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">266,473</a></sup> On the right, an impulse jumps from node to node along a healthy, myelinated fibre.',
  pt:'Nerves carry messages between the spinal cord and the muscles and skin. In GBS the immune system attacks these nerves, not the brain or spinal cord.',
  hook:'An acute <b>polyradiculoneuropathy</b>: many nerve roots (radiculo-) and nerves (neuropathy) at once. <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>'},
 {from:.15,at:.22,s:'infection',k:'Weeks before',t:'An infection first',
  txt:'In IGOS, 76% reported an illness or other event in the weeks before the weakness. <sup class="c" data-ref="Doets2018" title="Source 102"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102</a></sup> Blood tests in its first 1,000 participants found recent <i>Campylobacter jejuni</i> in 30%, <i>Mycoplasma pneumoniae</i> in 10%, cytomegalovirus in 4%, hepatitis E virus in 3% and Epstein-Barr virus in 1%. <sup class="c" data-ref="Leonhard2022IGOS" title="Source 267"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2022IGOS">267</a></sup> The infection before GBS can spread between people; the immune reaction that follows is not described as catching. <sup class="c" data-ref="Leonhard2019,Papri2021" title="Source 266,347"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266,347</a></sup>',
  pt:'Many people had a stomach bug or a chest infection in the weeks before the weakness started. GBS itself does not pass from person to person.',
  hook:'<i>C. jejuni</i> was the commonest recent infection on IGOS serology, in 30%. <sup class="c" data-ref="Leonhard2022IGOS" title="Source 267"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2022IGOS">267</a></sup> See <a href="#triggers" data-go="triggers">Triggers</a>.'},
 {from:.31,at:.38,s:'attack',k:'The attack',t:'The immune system turns on the nerve',
  txt:'A <i>C. jejuni</i> strain from a person with GBS carried a sugar structure like the nerve ganglioside GM1, and immunising rabbits with that material reproduced the disease: an immune response to the germ that also fits the nerve. <sup class="c" data-ref="Yuki1993,Yuki2004" title="Source 526,532"><a href="/guillain-barre-syndrome/sources/#src-Yuki1993">526,532</a></sup> The damage takes two main forms. The myelin sheath is stripped (demyelinating), or the axon itself is injured at the nodes (axonal). In IGOS the demyelinating subtype was found in 55% in Europe/Americas and the axonal one in 6%. <sup class="c" data-ref="Doets2018" title="Source 102"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102</a></sup> Here antibodies bind the nodes and a macrophage strips myelin.',
  pt:'The body\'s defences, built to fight the germ, mistake part of the nerve for it and damage the nerve. Messages then travel slowly or not at all.',
  hook:'Mimicry shown: a GM1-like structure on <i>C. jejuni</i> (1993), and the disease reproduced in rabbits (2004). <sup class="c" data-ref="Yuki1993,Yuki2004" title="Source 526,532"><a href="/guillain-barre-syndrome/sources/#src-Yuki1993">526,532</a></sup> See <a href="#mimicry" data-go="mimicry">Molecular mimicry</a>.'},
 {from:.47,at:.55,s:'climb',k:'Over days',t:'Weakness climbs',
  txt:'All 494 adults in a Dutch cohort developed weakness on both sides, generally in arms and legs; it stayed in the legs in 6% and in the arms in 1%. <sup class="c" data-ref="Fokke2014" title="Source 131"><a href="/guillain-barre-syndrome/sources/#src-Fokke2014">131</a></sup> Weakness is always bilateral, but it can start in the legs, the arms or all limbs at once. <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup> Reflexes were reduced in weak limbs in 91% at first and in everyone during follow-up, although 2% kept normal reflexes in weak arms. <sup class="c" data-ref="Fokke2014" title="Source 131"><a href="/guillain-barre-syndrome/sources/#src-Fokke2014">131</a></sup> Severe pain, or a problem with a single cranial nerve, can come before the weakness. <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>',
  pt:'Weakness and tingling usually start in the feet and legs and spread upward over days. Both sides are affected. The knee and ankle jerks fade.',
  hook:'Classic GBS: rapidly progressive, symmetrical weakness with sensory signs and absent or reduced reflexes. <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup> A minority, especially with AMAN, keep normal or even brisk reflexes. <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>'},
 {from:.64,at:.71,s:'worst',k:'Within 4 weeks',t:'The worst point',
  txt:'Most people reach their worst point, the nadir, within 2 weeks: 80% of Dutch adults by 2 weeks, 97% by 4 weeks and all by 6 weeks. <sup class="c" data-ref="Fokke2014" title="Source 131"><a href="/guillain-barre-syndrome/sources/#src-Fokke2014">131</a></sup> About 20% develop breathing failure and need a ventilator, up to 22% within the first week of admission. <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup> In IGOS, 19% were ventilated, and 76% in Europe/Americas could not walk unaided at their worst. <sup class="c" data-ref="Doets2018" title="Source 102"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102</a></sup> Blood pressure and heart rate can swing when the autonomic nerves are involved. <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>',
  pt:'The weakest point usually comes within 2 weeks. Many people cannot walk then, and about 1 in 5 need a machine to help them breathe for a while.',
  hook:'Nadir within 2 weeks in most and, by definition, within 4 weeks. <sup class="c" data-ref="Leonhard2019,Hughes1997" title="Source 195,266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">195,266</a></sup> Ventilation in about 20%. <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup> Breathing is covered in <a href="#breathing" data-go="breathing">Breathing &amp; the 20/30/40 rule</a>.'},
 {from:.8,at:.9,s:'recovery',k:'Months to years',t:'Most people recover',
  txt:'A plateau of days, weeks or months follows, then recovery. <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup> About 80% regain independent walking by 6 months. <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup> In IGOS, 79% in Europe/Americas walked unaided at 6 months and 83% at 1 year. <sup class="c" data-ref="Doets2018" title="Source 102"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102</a></sup> Mortality is 3 to 10% even with the best medical care. <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup> Most people recover extensively, especially in the first year, and remaining problems can still improve more than 5 years after onset. <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>',
  pt:'Then comes a flat stretch, and then a slow recovery. Most people walk on their own again. Tiredness and pain can last longer, even when strength comes back.',
  hook:'GBS is monophasic; treatment-related fluctuations and relapses occur in a minority. <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup> About 5% are later re-diagnosed with acute-onset CIDP. <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>'}
];
/* symptom rows in the player: which zone each reads */
const WH_ROWS=[{n:'leg weakness',z:'legs'},{n:'arm weakness',z:'arms'},{n:'breathing muscles',z:'breath'},{n:'face weakness',z:'face'},{n:'reflexes lost',z:'refl'}];
const WH_WORDS=['none','mild','marked','severe'];
const WH_FIB={nerves:'impulses jump from node to node',infection:'the nerve is still healthy',attack:'antibodies bind the nodes',climb:'myelin stripped: signals slow or stop',worst:'signals blocked',recovery:'thin new myelin: signals return'};
const WH_LBL={brain1:'brain and',brain2:'spinal cord: spared',nerve1:'peripheral nerves',nerve2:'and roots: attacked',vent:'breathing support',chest:'chest infection',gut:'gut infection',climb:'weakness rises from the feet',fibre:'one motor nerve fibre, magnified',bars:'how affected (schematic)'};
/* nerve paths in the body glyph's local frame (146 tall, centre x 0), the viewer's left side; mirrored for the right */
const WH_NV={arm:[ [0,-24],[-8,-23],[-16,-20],[-21,-14],[-23,-4],[-25,8],[-27,20] ],
  leg:[ [0,16],[-3,22],[-7,30],[-9,44],[-9,60],[-9,76],[-9,90] ],
  breath:[ [0,-20],[-6,-16],[-12,-12],[-16,-6] ],
  face:[ [0,-31],[-4,-34],[-7,-38] ]};
function whLv(t){if(t<.36)return 0;if(t<.66)return .82*ease(ramp(t,.36,.66));if(t<.82)return .82;return lerp(.82,.1,ease(ramp(t,.82,1)))}
function whZones(lv){return {legs:clamp(lv/.35),arms:clamp((lv-.3)/.3),breath:clamp((lv-.55)/.22),face:clamp((lv-.66)/.3),refl:clamp(lv/.25)}}
function whAlong(P,f){const L=[];let tot=0;for(let i=1;i<P.length;i++){const d=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);L.push(d);tot+=d}
  let r=clamp(f)*tot;for(let i=0;i<L.length;i++){if(r<=L[i]){const u=L[i]?r/L[i]:0;return [lerp(P[i][0],P[i+1][0],u),lerp(P[i][1],P[i+1][1],u)]}r-=L[i]}return P[P.length-1]}
function whWord(v){return WH_WORDS[v<.08?0:v<.4?1:v<.75?2:3]}

/* incidence by age: Western model <sup class="c" data-ref="Sejvar2011" title="Source 404"><a href="/guillain-barre-syndrome/sources/#src-Sejvar2011">404</a></sup>; urban China 2017 bands <sup class="c" data-ref="Xu2024" title="Source 517"><a href="/guillain-barre-syndrome/sources/#src-Xu2024">517</a></sup> */
const WH_M=[ [5,.80],[25,1.18],[45,1.73],[65,2.54],[85,3.72] ];
const WH_F=[ [5,.45],[25,.66],[45,.97],[65,1.42],[85,2.09] ];
const WH_CN=[{a0:0,a1:18,v:.16},{a0:19,a1:29,v:.20},{a0:30,a1:39,v:.40},{a0:40,a1:49,v:.45},{a0:50,a1:59,v:.78},{a0:60,a1:69,v:1.03},{a0:70,a1:90,v:1.12}];
const WH_SX={all:'everyone',m:'men',f:'women'};
const whMf=monoFn(WH_M),whFf=monoFn(WH_F);
function whRate(a,sx){if(sx==='m')return whMf(clamp(a,5,85));if(sx==='f')return whFf(clamp(a,5,85));return Math.exp(-12.0771+.01813*a)*1e5}
const WH_CAP_AGE='Lines: the Western meta-analysis model. Everyone: the published formula. Men and women: lines drawn through the published model points at ages 5, 25, 45, 65 and 85. Dashed steps: urban China, 2017, by age band. Rates per 100,000 person-years, not counts. <sup class="c" data-ref="Sejvar2011,Xu2024" title="Source 404,517"><a href="/guillain-barre-syndrome/sources/#src-Sejvar2011">404,517</a></sup>';
const WH_CAP_REG='Each bar names what it measured: hospital admissions, treated cases, coded diagnoses and pooled estimates are not quite the same measure, so compare with care. A pale extension marks a published range. Tap or focus a bar for its source.';
/* incidence by country or region, per 100,000 a year */
const WH_INC=[
 {n:'Bangladesh, Iran, Curaçao',m:'highest reported range',lo:2.1,hi:3.0,
  txt:'The highest reported incidences, 2.1 to 3.0 per 100,000 persons per year, come from Iran, Curaçao and Bangladesh. Reported incidence worldwide spans 0.16 to 3.0. The true incidence in many low-income and middle-income countries remains unknown, and publications from Africa are especially scarce. <sup class="c" data-ref="Papri2021" title="Source 347"><a href="/guillain-barre-syndrome/sources/#src-Papri2021">347</a></sup>'},
 {n:'New Zealand',m:'first hospital admissions, 1988–2010',v:2.32,
  txt:'An average of 2.32 first hospital admissions for GBS per 100,000 people per year, 1988 to 2010, from 2,056 admissions. After poultry regulation cut <i>Campylobacter</i> contamination, GBS admissions fell 13%. <sup class="c" data-ref="Baker2012NZ" title="Source 26"><a href="/guillain-barre-syndrome/sources/#src-Baker2012NZ">26</a></sup>'},
 {n:'United Kingdom',m:'treated in hospital, 2016–2019',lo:1.65,hi:1.88,
  txt:'1.65 to 1.88 per 100,000 per year treated in hospital, 2016 to 2019, from national immunoglobulin records. In spring 2020, during lockdown, cases fell by roughly a third to a half against the same months of earlier years. <sup class="c" data-ref="Keddie2021" title="Source 220"><a href="/guillain-barre-syndrome/sources/#src-Keddie2021">220</a></sup>'},
 {n:'United States',m:'age-standardised, 2000–2009',v:1.72,
  txt:'About 1.72 per 100,000 person-years, age-standardised, in the Vaccine Safety Datalink, 2000 to 2009, after correcting for diagnosis codes that were right only 55% of the time. Rates were 15% higher in winter and spring than in summer. <sup class="c" data-ref="Shui2012" title="Source 419"><a href="/guillain-barre-syndrome/sources/#src-Shui2012">419</a></sup> In hospital discharge data, 2000 to 2004, adult incidence was 1.65 to 1.79. <sup class="c" data-ref="Alshekhlee2008" title="Source 13"><a href="/guillain-barre-syndrome/sources/#src-Alshekhlee2008">13</a></sup>'},
 {n:'Europe and North America',m:'reported range',lo:.84,hi:1.91,
  txt:'Studies from Europe and North America report 0.84 to 1.91 per 100,000 per year. In these ageing populations GBS is most frequent between 50 and 80 years, at 2.0 to 4.0 per 100,000 per year. <sup class="c" data-ref="Papri2021" title="Source 347"><a href="/guillain-barre-syndrome/sources/#src-Papri2021">347</a></sup>'},
 {n:'World',m:'2024 meta-analysis, 122 articles',v:1.12,
  txt:'1.12 per 100,000 person-years (95% CI 0.98 to 1.27): 1.38 in males and 0.99 in females. Across countries, more enteric infection went with more GBS. <sup class="c" data-ref="Xu2024" title="Source 517"><a href="/guillain-barre-syndrome/sources/#src-Xu2024">517</a></sup>'},
 {n:'Western countries',m:'2011 meta-analysis, median',v:1.11,lo:.81,hi:1.89,
  txt:'Sixteen North American and European studies, 1,643 cases and 152.7 million person-years: crude incidence 0.81 to 1.89 per 100,000 person-years, median 1.11. The model built from them gives the age curve in the other view. <sup class="c" data-ref="Sejvar2011" title="Source 404"><a href="/guillain-barre-syndrome/sources/#src-Sejvar2011">404</a></sup>'},
 {n:'Peru, 2015–2017',m:'hospital discharges, before the outbreak',lo:.62,hi:.92,
  txt:'0.62 (2015), 0.92 (2016) and 0.91 (2017) per 100,000 from hospital discharge data, before the 2019 outbreak, when the rate in affected areas reached nearly 25 times the expected level. <sup class="c" data-ref="Munayco2019,Munayco2020" title="Source 306,307"><a href="/guillain-barre-syndrome/sources/#src-Munayco2019">306,307</a></sup>'},
 {n:'Mainland China',m:'all tertiary hospitals, 2016–2019',v:.698,
  txt:'0.698 per 100,000 person-years from 38,861 people at all 1,665 tertiary hospitals: 0.233 in children and 0.829 in adults, peaking at 70 to 74 years. Only tertiary hospitals were covered, so this may undercount. <sup class="c" data-ref="Zheng2022" title="Source 542"><a href="/guillain-barre-syndrome/sources/#src-Zheng2022">542</a></sup>'},
 {n:'Urban China',m:'insurance records, 2013–2017',lo:.41,hi:.58,
  txt:'0.41 to 0.58 per 100,000 person-years from 1.44 billion insured person-years and 3,534 cases. <sup class="c" data-ref="Xu2024" title="Source 517"><a href="/guillain-barre-syndrome/sources/#src-Xu2024">517</a></sup>'},
 {n:'Brazil',m:'approximate',v:.40,lab:'0.40',
  txt:'About 0.40 per 100,000 per year, one of the lowest reported. <sup class="c" data-ref="Papri2021" title="Source 347"><a href="/guillain-barre-syndrome/sources/#src-Papri2021">347</a></sup>'}
];
/* IGOS regions <sup class="c" data-ref="Doets2018" title="Source 102"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102</a></sup> */
const WH_IG=[
 {n:'Europe/Americas',sh:'Europe/Am.',
  txt:'715 participants. The commonest form was sensorimotor (69%); Miller Fisher syndrome or overlap 11%. Median time from weakness to treatment 4 days, and IVIg was the first treatment in 86%. Median time to walking independently: 63 days. <sup class="c" data-ref="Doets2018" title="Source 102"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102</a></sup>'},
 {n:'Asia (not Bangladesh)',sh:'Asia',
  txt:'69 participants from Japan, Malaysia and Taiwan. Sensorimotor 43%, and Miller Fisher syndrome or overlap 22%, the highest share. Median time to treatment 5 days. Median time to walking independently: 39 days. <sup class="c" data-ref="Doets2018" title="Source 102"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102</a></sup>'},
 {n:'Bangladesh',sh:'Bangladesh',
  txt:'125 participants, median age 28 against 55 in Europe/Americas. Pure motor GBS was the main form (69%). Median MRC sum score at the worst point was 16 out of 60, against 46 in Europe/Americas. 86% received no immunotherapy. Median time to walking independently: 95 days. <sup class="c" data-ref="Doets2018" title="Source 102"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102</a></sup>'}
];
const WH_IGM=[
 {n:'Needed a ventilator',v:[17,25,29]},
 {n:'Unable to walk alone at worst',v:[76,76,93]},
 {n:'Axonal subtype',v:[6,6,36]},
 {n:'No immunotherapy at first',v:[7,13,86]},
 {n:'Walking unaided at 6 months',v:[79,88,62]},
 {n:'Walking unaided at 1 year',v:[83,91,69]},
 {n:'Died during follow-up',v:[5,2,17]}
];
const WH_IG_LEG='In each row, top to bottom: Europe/Americas, Asia, Bangladesh';

inits.what=()=>{
  /* ---------- the player ---------- */
  const svg=$('#whSvg'),rg=$('#whT');
  function nerveG(k,x,y,Z,t,blockOn){
    let s=`<g transform="translate(${f1(x)} ${f1(y+50*k)}) scale(${k.toFixed(3)})">`;
    s+=`<ellipse cx="0" cy="-42" rx="6.5" ry="4.6" style="fill:var(--myelin-line);opacity:.35"/><path d="M0 -36V18" style="stroke:var(--myelin-line);stroke-width:2.2;stroke-linecap:round;opacity:.8"/>`;
    Object.keys(WH_NV).forEach(z=>{const v=z==='breath'?Z.breath:Z[z]||0;[1,-1].forEach(sd=>{const P=WH_NV[z].map(p=>[p[0]*sd,p[1]]);
      s+=`<path d="${ptsD(P)}" style="fill:none;stroke:var(--node);stroke-width:1.1;stroke-linecap:round;stroke-linejoin:round"/>`;
      if(v>0)s+=`<path d="${ptsD(P)}" style="fill:none;stroke:var(--damage);stroke-width:1.3;stroke-dasharray:2 1.6;opacity:${f1(v)}"/>`;
      if(z==='arm'||z==='leg'){const zz=z==='arm'?Z.arms:Z.legs,f=(t*5+(sd>0?0:.5))%1,cap=zz>.5&&blockOn?.4:1,ff=Math.min(f,cap),q=whAlong(P,ff);
        s+=`<circle cx="${f1(q[0])}" cy="${f1(q[1])}" r="1.7" style="fill:var(--impulse);stroke:var(--ink);stroke-width:.4;opacity:${f1(f>cap?.35:1)}"/>`}})});
    return s+'</g>'}
  function draw(t){
    const N=vb(svg,'720 400','400 640');
    const L=N?{bx:118,by:34,bs:240,lx:196,la:'s',brainY:[46,58],brainTo:[128,47],ventY:92,ventTo:[176,72],vir:[300,126],virY:154,cj:[300,198],cjY:226,nerveY:[250,262],nerveTo:[134,216],climbY:298,
               fx:16,fw:368,fy:362,fh:30,flY:318,fsY:404,bhY:436,r0:458,rh:30,rlx:16,rbx:160,rbw:170,rwx:338,sx:16,sw:368,sy:604}
             :{bx:200,by:36,bs:290,lx:14,la:'s',brainY:[52,64],brainTo:[186,54],ventY:110,ventTo:[194,68],vir:[62,148],virY:176,cj:[62,208],cjY:234,nerveY:[280,292],nerveTo:[182,255],climbY:350,
               fx:300,fw:404,fy:96,fh:34,flY:44,fsY:140,bhY:170,r0:192,rh:32,rlx:300,rbx:440,rbw:196,rwx:644,sx:300,sw:404,sy:352};
    const p=phaseOf(WH_STEPS,t),P=WH_STEPS[p],lv=whLv(t),Z=whZones(lv),k=L.bs/146;
    const vent=t>=.62&&t<.86,blockOn=t>.47&&t<.88,inf=ramp(t,.13,.17)*(1-ramp(t,.3,.34));
    let s='';
    /* body, its nerves and labels */
    const B=bodyFront(L.bx,L.by,L.bs,{level:lv,tingle:ramp(t,.33,.4)*(1-ramp(t,.9,1)),vent});
    s+=B.svg+nerveG(k,L.bx,L.by,Z,t,blockOn);
    const lead=(x1,y1,x2,y2)=>`<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" style="stroke:var(--muted);stroke-width:1"/>`;
    const lw=N?0:118;/* wide labels sit left of the body, so leaders start at their right end */
    s+=`<text x="${L.lx}" y="${L.brainY[0]}" class="t-xs" style="fill:var(--ink);font-weight:700">${WH_LBL.brain1}</text><text x="${L.lx}" y="${L.brainY[1]}" class="t-xs" style="fill:var(--good);font-weight:700">${WH_LBL.brain2}</text>`;
    s+=lead(N?L.lx-4:L.lx+lw,L.brainY[0]+2,L.brainTo[0],L.brainTo[1]);
    s+=`<text x="${L.lx}" y="${L.nerveY[0]}" class="t-xs" style="fill:var(--ink);font-weight:700">${WH_LBL.nerve1}</text><text x="${L.lx}" y="${L.nerveY[1]}" class="t-xs" style="fill:${t>=.31?'var(--bad)':'var(--ink)'};font-weight:700">${WH_LBL.nerve2}</text>`;
    s+=lead(N?L.lx-4:L.lx+lw,L.nerveY[0]-3,L.nerveTo[0],L.nerveTo[1]);
    if(vent){s+=`<text x="${L.lx}" y="${L.ventY}" class="t-xs" style="fill:var(--ink);font-weight:700">${WH_LBL.vent}</text>`+lead(N?L.lx-4:L.lx+100,L.ventY-3,L.ventTo[0],L.ventTo[1])}
    if(inf>0){s+=`<g style="opacity:${f1(inf)}">`+virus(L.vir[0],L.vir[1],11)+kitLabel(L.vir[0],L.virY,WH_LBL.chest,{a:'m'})+campy(L.cj[0],L.cj[1],50,{ang:-10,ph:t*8})+kitLabel(L.cj[0],L.cjY,WH_LBL.gut,{a:'m'})+'</g>'}
    if(t>=.47&&t<.8)s+=kitLabel(L.bx,L.climbY,WH_LBL.climb,{a:'m'});
    /* the fibre */
    const hit=ramp(t,.31,.4)*(1-ramp(t,.8,.95)),demy=ramp(t,.36,.6),remy=ramp(t,.84,1);
    const nv=nerveFibre(L.fx,L.fy,L.fw,{n:5,h:L.fh,nodeHit:[0,hit*.6,hit,hit*.8,hit*.4,0],demy:[demy*.5,demy,demy*.7,demy*.3,0],remy:[remy,remy,remy,remy*.6,0],mac:[0,demy*(1-remy),0,0,0],pulse:(t*9)%1,block:blockOn?2:undefined});
    s+=`<text x="${L.fx}" y="${L.flY}" class="t-xs" style="fill:var(--ink);font-weight:700">${WH_LBL.fibre}</text>`+nv.svg;
    s+=kitLabel(L.fx+L.fw/2,L.fsY,WH_FIB[P.s],{a:'m'});
    /* symptom bars */
    s+=`<text x="${L.rlx}" y="${L.bhY}" class="t-xs" style="fill:var(--ink);font-weight:700">${WH_LBL.bars}</text>`;
    WH_ROWS.forEach((r,i)=>{const y=L.r0+i*L.rh,v=Z[r.z];
      s+=`<text x="${L.rlx}" y="${y+4}" class="t-sm" style="fill:var(--ink)">${r.n}</text><rect x="${L.rbx}" y="${y-6}" width="${L.rbw}" height="12" rx="6" style="fill:var(--panel-2)"/>`;
      if(v>0)s+=`<rect x="${L.rbx}" y="${y-6}" width="${f1(Math.max(12,L.rbw*v))}" height="12" rx="6" style="fill:var(--weak)"/>`;
      s+=`<text x="${L.rwx}" y="${y+4}" class="t-xs" style="${v>=.75?'fill:var(--ink);font-weight:700':''}">${whWord(v)}</text>`});
    /* phase strip */
    const sw=L.sw/WH_STEPS.length;
    WH_STEPS.forEach((q,i)=>{const on=i===p,x=L.sx+i*sw;s+=`<rect x="${f1(x+1)}" y="${L.sy}" width="${f1(sw-2)}" height="6" rx="3" style="fill:${on?'var(--brand)':'var(--panel-2)'}"/><text x="${f1(x+sw/2)}" y="${L.sy+20}" class="t-xs t-mid" style="${on?'fill:var(--ink);font-weight:700':''}">${q.s}</text>`});
    s+=`<circle cx="${f1(L.sx+L.sw*t)}" cy="${L.sy+3}" r="5.5" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;
    svg.innerHTML=s;
    setSt(p);$('#whNote').innerHTML=noteHTML(P);
  }
  const stop=playWire(rg,$('#whPlay'),draw,22000,'Replay','what');
  const setSt=stepWire($('#whSteps'),WH_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- incidence: by age or by country ---------- */
  const isv=$('#whInc'),age=$('#whAge'),aOut=$('#whAgeOut'),cap=$('#whIncCap'),inote=$('#whIncNote');
  let view='age',sx='all',china=false,sel=6;
  function drawAge(){
    const N=vb(isv,'720 360','400 340');
    const L=N?{x:46,y:34,w:330,h:240,tk:20,yt:16}:{x:62,y:34,w:620,h:250,tk:10,yt:16};
    const X=a=>L.x+L.w*a/90,Y=v=>L.y+L.h-L.h*v/4;
    let s=`<rect x="${L.x}" y="${L.y}" width="${L.w}" height="${L.h}" style="fill:var(--field)"/>`;
    for(let v=0;v<=4;v++){s+=`<line x1="${L.x}" x2="${L.x+L.w}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/><text x="${L.x-6}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}</text>`}
    for(let a=0;a<=90;a+=L.tk){s+=`<line x1="${f1(X(a))}" x2="${f1(X(a))}" y1="${L.y+L.h}" y2="${L.y+L.h+4}" class="axis"/><text x="${f1(X(a))}" y="${L.y+L.h+16}" class="t-xs t-mid">${a}</text>`}
    s+=`<text x="${L.x+L.w}" y="${L.y+L.h+30}" class="t-xs t-end">age (years)</text><text x="${L.x}" y="${L.yt}" class="t-xs" style="fill:var(--ink);font-weight:700">new cases per 100,000 person-years</text>`;
    s+=`<line x1="${L.x}" x2="${L.x+L.w}" y1="${L.y+L.h}" y2="${L.y+L.h}" class="axis"/><line x1="${L.x}" x2="${L.x}" y1="${L.y}" y2="${L.y+L.h}" class="axis"/>`;
    if(china){WH_CN.forEach(b=>{s+=`<path d="M${f1(X(b.a0))} ${f1(Y(b.v))}H${f1(X(Math.min(90,b.a1+1)))}" style="stroke:var(--accent);stroke-width:2.4;stroke-dasharray:5 3"/>`});
      s+=`<text x="${f1(X(90)-2)}" y="${f1(Y(1.12)+16)}" class="t-xs t-end" style="fill:var(--ink);font-weight:700">urban China, 2017</text>`}
    const line=(f,a0,a1,col,on,dash)=>{let d='';for(let a=a0;a<=a1;a+=1){d+=(a===a0?'M':'L')+f1(X(a))+' '+f1(Y(f(a)))}return `<path d="${d}" style="fill:none;stroke:${col};stroke-width:${on?3:1.8};opacity:${on?1:.45};stroke-linejoin:round${dash?';stroke-dasharray:'+dash:''}"/>`};
    s+=line(a=>whRate(a,'all'),0,90,'var(--brand)',sx==='all');
    s+=line(whMf,5,85,'var(--care)',sx==='m','7 3');
    s+=line(whFf,5,85,'var(--rx)',sx==='f','2 3');
    s+=`<text x="${f1(X(90)-2)}" y="${f1(Y(whRate(90,'all'))-9)}" class="t-xs t-end" style="fill:var(--ink);font-weight:${sx==='all'?700:500}">everyone</text>`;
    s+=`<text x="${f1(X(85)+4)}" y="${f1(Y(3.72)+3)}" class="t-xs" style="fill:var(--ink);font-weight:${sx==='m'?700:500}">men</text>`;
    s+=`<text x="${f1(X(85)+4)}" y="${f1(Y(2.09)+12)}" class="t-xs" style="fill:var(--ink);font-weight:${sx==='f'?700:500}">women</text>`;
    WH_M.concat(WH_F).forEach(([a,v])=>{s+=`<circle cx="${f1(X(a))}" cy="${f1(Y(v))}" r="2.4" style="fill:var(--panel);stroke:var(--muted);stroke-width:1.2"/>`});
    const a=+age.value,aa=sx==='all'?a:clamp(a,5,85),r=whRate(aa,sx);
    s+=`<line x1="${f1(X(aa))}" x2="${f1(X(aa))}" y1="${L.y}" y2="${L.y+L.h}" style="stroke:var(--ink);stroke-width:1;stroke-dasharray:3 3"/><circle cx="${f1(X(aa))}" cy="${f1(Y(r))}" r="6" style="fill:var(--accent);stroke:var(--panel);stroke-width:2"/>`;
    const lx=X(aa)>L.x+L.w-70?X(aa)-10:X(aa)+10;
    s+=kitLabel(lx,Y(r)-10,r.toFixed(2),{a:X(aa)>L.x+L.w-70?'e':''});
    isv.innerHTML=s;
    const one=Math.round(1e5/r/100)*100;
    aOut.textContent=a+' years';
    inote.innerHTML=`<div class="kicker">Western model · ${WH_SX[sx]}</div><h4>Age ${aa}: ${r.toFixed(2)} per 100,000 person-years</h4>`+
      `<p class="wh-big">1 in ${one.toLocaleString('en-GB')}</p><p>That is roughly 1 new case a year among this many people of this age (calculated here from the model). <sup class="c" data-ref="Sejvar2011" title="Source 404"><a href="/guillain-barre-syndrome/sources/#src-Sejvar2011">404</a></sup></p>`+
      (sx==='all'?'<p>Everyone: rate = exp(−12.0771 + 0.01813 × age) × 100,000, from the pooled Western studies. Incidence rises about 20% with every 10 years of age. <sup class="c" data-ref="Sejvar2011" title="Source 404"><a href="/guillain-barre-syndrome/sources/#src-Sejvar2011">404</a></sup></p>':'<p>Men and women: the published model points at ages 5, 25, 45, 65 and 85, with the line drawn between them. The male to female rate ratio is 1.78. <sup class="c" data-ref="Sejvar2011" title="Source 404"><a href="/guillain-barre-syndrome/sources/#src-Sejvar2011">404</a></sup></p>')+
      (sx!=='all'&&(a<5||a>85)?'<p>The sex-specific points cover ages 5 to 85, so the reading stops there.</p>':'')+
      (china?'<p>Urban China, 2017: the rate also rises with age but from a lower base, 0.16 under 19 and 1.12 at 70 and over. <sup class="c" data-ref="Xu2024" title="Source 517"><a href="/guillain-barre-syndrome/sources/#src-Xu2024">517</a></sup> Where young people make up most of the population, as in Bangladesh, China, India, Brazil, Ethiopia and Tanzania, most cases occur at 21 to 35 years. <sup class="c" data-ref="Papri2021" title="Source 347"><a href="/guillain-barre-syndrome/sources/#src-Papri2021">347</a></sup></p>':'')+
      '<p>The age slope is debated: 20% per decade in this model, against 50% per decade in US data that relied on diagnosis codes. <sup class="c" data-ref="Sejvar2011,Shui2012" title="Source 404,419"><a href="/guillain-barre-syndrome/sources/#src-Sejvar2011">404,419</a></sup></p>';
  }
  function drawReg(){
    const N=vb(isv,'720 360','400 600');
    const L=N?{x0:16,bw:300,y0:44,rh:50}:{x0:310,bw:300,y0:46,rh:28};
    const X=v=>L.x0+L.bw*v/3.2;
    let s=`<text x="16" y="18" class="t-xs" style="fill:var(--ink);font-weight:700">new cases per 100,000 a year, as each study measured it</text>`;
    [0,1,2,3].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${L.y0-10}" y2="${L.y0+WH_INC.length*L.rh-8}" class="grid"/><text x="${f1(X(v))}" y="${L.y0-14}" class="t-xs t-mid">${v}</text>`});
    WH_INC.forEach((r,i)=>{const y=L.y0+i*L.rh,on=i===sel,by=N?y+28:y+2,hi=r.hi||r.v,lo=r.v!=null?r.v:r.lo;
      s+=`<g class="clk" tabindex="0" role="button" aria-pressed="${on}" aria-label="${r.n}, ${r.m}" data-i="${i}">`;
      s+=`<rect class="fr" x="8" y="${N?y-4:y-3}" width="${N?384:704}" height="${N?L.rh-4:L.rh-3}" rx="7" style="fill:${on?'var(--brand-soft)':'transparent'};stroke:${on?'var(--brand)':'transparent'};stroke-width:1.4"/>`;
      s+=`<text x="16" y="${N?y+10:y+8}" class="t-sm" style="fill:var(--ink);font-weight:700">${r.n}</text><text x="16" y="${N?y+22:y+19}" class="t-xs">${r.m}</text>`;
      s+=`<rect x="${L.x0}" y="${by}" width="${f1(X(lo)-L.x0)}" height="12" rx="3" style="fill:var(--brand)"/>`;
      if(r.hi)s+=`<rect x="${f1(X(lo))}" y="${by}" width="${f1(X(r.hi)-X(lo))}" height="12" rx="3" style="fill:var(--brand);opacity:.35"/>`;
      if(r.v!=null&&r.lo!=null)s+=`<path d="M${f1(X(r.lo))} ${by+6}H${f1(X(r.hi))}" style="stroke:var(--ink);stroke-width:1.4"/>`;
      const val=r.lab||(r.v!=null?(r.lo!=null?`${r.v} (${r.lo.toFixed(2)}–${r.hi.toFixed(2)})`:String(r.v)):`${r.lo.toFixed(2)}–${r.hi.toFixed(2)}`);
      s+=`<text x="${f1(X(hi)+6)}" y="${by+10}" class="t-xs" style="fill:var(--ink);font-weight:700">${val}</text></g>`});
    isv.innerHTML=s;
    const r=WH_INC[sel];inote.innerHTML=`<div class="kicker">${r.m}</div><h4>${r.n}</h4><p>${r.txt}</p>`;
  }
  function drawInc(){if(view==='age')drawAge();else drawReg();cap.innerHTML=view==='age'?WH_CAP_AGE:WH_CAP_REG}
  const pickReg=i=>{sel=i;drawReg()};
  isv.addEventListener('click',e=>{const g=e.target.closest('[data-i]');if(g)pickReg(+g.dataset.i)});
  isv.addEventListener('keydown',e=>{const g=e.target.closest('[data-i]');if(!g)return;if(e.key==='Enter'||e.key===' '){e.preventDefault();pickReg(+g.dataset.i);const n=isv.querySelector(`[data-i="${g.dataset.i}"]`);n&&n.focus()}});
  const setView=v=>{view=v;$('#whVAge').setAttribute('aria-pressed',v==='age');$('#whVReg').setAttribute('aria-pressed',v==='reg');$('#whAgeCtrls').hidden=v!=='age';drawInc()};
  $('#whVAge').addEventListener('click',()=>setView('age'));$('#whVReg').addEventListener('click',()=>setView('reg'));
  $$('[data-sx]',$('#whAgeCtrls')).forEach(b=>b.addEventListener('click',()=>{sx=b.dataset.sx;$$('[data-sx]',$('#whAgeCtrls')).forEach(x=>x.setAttribute('aria-pressed',x===b));drawAge()}));
  $('#whChina').addEventListener('click',e=>{china=!china;e.currentTarget.setAttribute('aria-pressed',china);drawAge()});
  age.addEventListener('input',drawAge);
  drawInc();

  /* ---------- IGOS regions ---------- */
  const gsv=$('#whReg'),gnote=$('#whRegNote'),gb=$('#whRegBtns');let reg=0,grow=1,stopG=null;
  gb.innerHTML=WH_IG.map((r,i)=>`<button class="btn" data-r="${i}" aria-pressed="${i===0}">${r.n}</button>`).join('');
  function drawIG(){
    const N=vb(gsv,'720 380','400 510');
    const L=N?{lx:16,x0:16,bw:250,y0:40,rh:66,b0:18}:{lx:16,x0:250,bw:340,y0:40,rh:48,b0:4};
    let s=`<text x="16" y="20" class="t-xs" style="fill:var(--ink);font-weight:700">${WH_IG_LEG}</text>`;
    WH_IGM.forEach((m,i)=>{const y=L.y0+i*L.rh;
      s+=`<text x="${L.lx}" y="${N?y+11:y+21}" class="t-sm" style="fill:var(--ink);font-weight:700">${m.n}</text>`;
      m.v.forEach((v,j)=>{const on=j===reg,by=y+L.b0+j*13,w=L.bw*v/100*(on?grow:1);
        s+=`<rect x="${L.x0}" y="${by}" width="${f1(L.bw)}" height="11" rx="3" style="fill:var(--panel-2)"/><rect x="${L.x0}" y="${by}" width="${f1(Math.max(2,w))}" height="11" rx="3" style="fill:${on?'var(--brand)':'var(--muted)'};opacity:${on?1:.4}"/>`;
        s+=`<text x="${f1(L.x0+L.bw+6)}" y="${by+9}" class="t-xs" style="${on?'fill:var(--ink);font-weight:700':''}">${v}% ${WH_IG[j].sh}</text>`})});
    gsv.innerHTML=s;
    const r=WH_IG[reg];gnote.innerHTML=`<div class="kicker">IGOS region</div><h4>${r.n}</h4><p>${r.txt}</p>`;
  }
  gb.addEventListener('click',e=>{const b=e.target.closest('[data-r]');if(!b)return;reg=+b.dataset.r;$$('[data-r]',gb).forEach(x=>x.setAttribute('aria-pressed',x===b));
    stopG&&stopG();stopG=animate(700,q=>{grow=ease(q);drawIG()},()=>{stopG=null;grow=1})});
  drawIG();
  const prev=redraws.what;redraws.what=()=>{prev&&prev();drawInc();drawIG()};
  const prevH=onHide.what;onHide.what=()=>{prevH&&prevH();stopG&&stopG();stopG=null;grow=1};
};
/* =============== 1.4 Subtypes: AIDP, AMAN and AMSAN =============== */
/* Main scene: two motor fibres (AIDP above, AMAN below) and a node close-up, through six steps.
   Second scene: a 100-dot block per cohort for subtype shares. Numbers come from research pass C. */
const SB_STEPS=[
 {from:0,at:.06,k:'Step 1 · healthy nerve',t:'A healthy motor fibre',
  txt:'A myelinated motor fibre carries the signal from the spinal cord (left) to the muscle (right). Myelin insulates the axon, and the signal jumps between the gaps in it, the nodes of Ranvier, where sodium channels cluster <sup class="c" data-ref="Susuki2007" title="Source 437"><a href="/guillain-barre-syndrome/sources/#src-Susuki2007">437</a></sup>. In GBS the immune attack can land on the myelin (AIDP) or on the axon at the node (AMAN and AMSAN). In 12 people examined at autopsy in northern China, 3 had AIDP, 6 an axonal pattern and 3 only very mild changes despite paralysis, which points to block at the node or the nerve terminal <sup class="c" data-ref="Griffin1995" title="Source 166"><a href="/guillain-barre-syndrome/sources/#src-Griffin1995">166</a></sup>.',
  pt:'A nerve is like an electric cable. The nodes of Ranvier are small gaps in the insulation, where the signal jumps along.',
  hook:'AIDP targets the Schwann cell surface and myelin; AMAN targets the axolemma at the node of Ranvier <sup class="c" data-ref="HaferMacko1996AIDP,HaferMacko1996AMAN" title="Source 175,176"><a href="/guillain-barre-syndrome/sources/#src-HaferMacko1996AIDP">175,176</a></sup>.'},
 {from:.15,at:.27,k:'Step 2 · AIDP',t:'AIDP: the attack on myelin',
  txt:'In 3 people autopsied 3 to 9 days after onset, the complement products C3d and C5b-9 (the membrane attack complex) lay along the outer surface of the Schwann cell. Myelin broke into vesicles before macrophages invaded it, so the authors suggest antibody binds the Schwann cell surface first <span class="ev early">Early evidence</span> <sup class="c" data-ref="HaferMacko1996AIDP" title="Source 175"><a href="/guillain-barre-syndrome/sources/#src-HaferMacko1996AIDP">175</a></sup>. Lymphocytes infiltrate and macrophages strip the myelin <sup class="c" data-ref="Griffin1995" title="Source 166"><a href="/guillain-barre-syndrome/sources/#src-Griffin1995">166</a></sup>. Nerve tests then show reduced velocities, abnormal temporal dispersion or partial motor block <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.',
  pt:'In AIDP the immune system damages the insulation around the nerve. Where the insulation is lost, signals slow down or stop.',
  hook:'AIDP: complement on the outer Schwann cell surface and vesicular myelin change, then macrophages strip the myelin <sup class="c" data-ref="HaferMacko1996AIDP" title="Source 175"><a href="/guillain-barre-syndrome/sources/#src-HaferMacko1996AIDP">175</a></sup>.'},
 {from:.33,at:.46,k:'Step 3 · AMAN',t:'AMAN: the attack at the node',
  txt:'In 7 fatal AMAN cases, IgG and the complement product C3d were bound to the axolemma of motor fibres, most often at the node <sup class="c" data-ref="HaferMacko1996AMAN" title="Source 176"><a href="/guillain-barre-syndrome/sources/#src-HaferMacko1996AMAN">176</a></sup>. The earliest change was a lengthened node with distorted paranodal myelin; macrophages then entered at the node and slid into the space under the myelin, which stayed intact <sup class="c" data-ref="Griffin1996Nodal" title="Source 168"><a href="/guillain-barre-syndrome/sources/#src-Griffin1996Nodal">168</a></sup>. In an animal model, sodium channel clusters at lengthened nodes were disrupted or lost <span class="ev est">Established in the model</span> <sup class="c" data-ref="Susuki2007" title="Source 437"><a href="/guillain-barre-syndrome/sources/#src-Susuki2007">437</a></sup>. There is little demyelination or lymphocytic inflammation, and sensory fibres are spared <sup class="c" data-ref="HaferMacko1996AMAN" title="Source 176"><a href="/guillain-barre-syndrome/sources/#src-HaferMacko1996AMAN">176</a></sup>.',
  pt:'In AMAN the antibodies attack the nerve fibre itself, at the small gaps in the insulation. The signal stops at those gaps.',
  hook:'AMAN earliest pathology: nodal lengthening, then macrophages in the periaxonal space under an intact myelin sheath <sup class="c" data-ref="Griffin1996Nodal" title="Source 168"><a href="/guillain-barre-syndrome/sources/#src-Griffin1996Nodal">168</a></sup>.'},
 {from:.52,at:.62,k:'Step 4 · two courses',t:'A block that lifts, or an axon that breaks',
  txt:'Of 18 people with AMAN studied serially, 12 (67%) had definite or probable conduction block. It reversed in 7 and was followed by axonal degeneration in 6 (one person had both). Every block had gone or begun to resolve within 3 weeks, with no sign of remyelination <sup class="c" data-ref="Kokubun2010" title="Source 232"><a href="/guillain-barre-syndrome/sources/#src-Kokubun2010">232</a></sup>. Clinical and antibody profiles did not differ, so the authors see reversible block, block then degeneration, and degeneration without block as one continuum <sup class="c" data-ref="Kokubun2010" title="Source 232"><a href="/guillain-barre-syndrome/sources/#src-Kokubun2010">232</a></sup>. In the animal model, channels redistributed during recovery <sup class="c" data-ref="Susuki2007" title="Source 437"><a href="/guillain-barre-syndrome/sources/#src-Susuki2007">437</a></sup>.',
  pt:'Sometimes antibodies only stop the signal at the gaps for a while. When that clears up, strength can come back quickly. If the nerve fibre itself breaks, it has to regrow.',
  hook:'Reversible conduction failure: a block or small response that recovers fast, with no remyelination signature <sup class="c" data-ref="Kuwabara1998GM1,Kokubun2010" title="Source 232,252"><a href="/guillain-barre-syndrome/sources/#src-Kuwabara1998GM1">232,252</a></sup>.'},
 {from:.69,at:.77,k:'Step 5 · AMSAN',t:'AMSAN: sensory axons too',
  txt:'Autopsies of 4 people with AMSAN, who died 7, 7, 18 and 60 days after onset, showed Wallerian-like degeneration in ventral and dorsal roots and peripheral nerves, with minimal demyelination or lymphocytes in the 3 early cases. The 60-day case had extensive loss of large fibres with little remyelination <sup class="c" data-ref="Griffin1996AMSAN" title="Source 167"><a href="/guillain-barre-syndrome/sources/#src-Griffin1996AMSAN">167</a></sup>. AMAN and AMSAN share an antibody profile, IgG to GM1, GM1b and GD1a <sup class="c" data-ref="Yuki1999AMSAN" title="Source 529"><a href="/guillain-barre-syndrome/sources/#src-Yuki1999AMSAN">529</a></sup>, and the authors read AMSAN as the most severe end of one spectrum of attack on axons <sup class="c" data-ref="Griffin1996AMSAN" title="Source 167"><a href="/guillain-barre-syndrome/sources/#src-Griffin1996AMSAN">167</a></sup>.',
  pt:'In AMSAN the attack hits the nerve fibres that carry feeling as well as the ones that move muscles.',
  hook:'The first axonal GBS report: 5 people with electrically inexcitable motor nerves, all unable to move arms and legs; 3 of the 4 who survived recovered poorly <sup class="c" data-ref="Feasby1986" title="Source 124"><a href="/guillain-barre-syndrome/sources/#src-Feasby1986">124</a></sup>.'},
 {from:.85,at:.95,k:'Step 6 · recovery',t:'Repair: new myelin, or a regrowing axon',
  txt:'In northern China, the median time to walk 5 metres with help was 31 days in AMAN (n = 32) and 32 days in AIDP (n = 8), too fast for regrowth along a whole nerve <sup class="c" data-ref="Ho1997Recovery" title="Source 191"><a href="/guillain-barre-syndrome/sources/#src-Ho1997Recovery">191</a></sup>. Proposed reasons are repair at the node and regrowth of short motor nerve terminals <span class="ev early">Early evidence</span> <sup class="c" data-ref="Ho1997Recovery,Griffin1996Nodal" title="Source 168,191"><a href="/guillain-barre-syndrome/sources/#src-Ho1997Recovery">168,191</a></sup>. In Japan, 14% with AMAN (6 of 44) and 6% with AIDP (2 of 33) could not walk alone at 6 months; 4 of those 6 walked by one year and 2 at 28 and 57 months <sup class="c" data-ref="Hiraga2005" title="Source 188"><a href="/guillain-barre-syndrome/sources/#src-Hiraga2005">188</a></sup>. Repaired myelin leaves slow, dispersed components on nerve tests, which reversible failure lacks <sup class="c" data-ref="Kuwabara1998GM1" title="Source 252"><a href="/guillain-barre-syndrome/sources/#src-Kuwabara1998GM1">252</a></sup>.',
  pt:'If the nerve fibre itself is badly damaged it has to regrow, and that can take many months. Some people keep improving for years. These numbers describe groups of people. They cannot tell you exactly what will happen to you.',
  hook:'AMAN can recover as fast as AIDP: a median 31 against 32 days to walk 5 m with help <sup class="c" data-ref="Ho1997Recovery" title="Source 191"><a href="/guillain-barre-syndrome/sources/#src-Ho1997Recovery">191</a></sup>.'}
];
/* every visible SVG string */
const SB_TX={laneA:'AIDP · attack on myelin',laneB:'AMAN · attack on the axon at the node',laneB4:'AMSAN · motor and sensory axons',
  zoomT:'Close-up: one node of Ranvier',strip:'macrophage strips myelin',remy:'thin new myelin',hit:'antibodies and complement at the nodes',
  cord:'from spinal cord',muscle:'to muscle',mxT:'Which fibres are hit',mxM:'Motor',mxS:'Sensory',
  recT1:'Days to walk 5 m with help, median',recS1:'northern China',recT2:'Cannot walk alone at 6 months',recS2:'Japan',recN:'Group figures, not a forecast for one person.'};
const SB_ST=[['signal on time','signal on time'],['slowed, then blocked','healthy, for comparison'],['slowed or blocked','blocked at the nodes'],
  ['slowed or blocked','two possible courses'],['slowed or blocked','both axons degenerate'],['new thin myelin','fast or slow recovery']];
const SB_DUAL={3:['reversible conduction failure','axon breaks: Wallerian-like degeneration'],4:['motor axon','sensory axon'],5:['block lifted: fast recovery','regrowing axon: slow recovery']};
const SB_CAP=[['Sodium channels cluster in the node gap;','gangliosides stand on the membrane.'],
  ['AIDP: antibody and complement on the','Schwann cell surface; myelin is stripped.'],
  ['AMAN: IgG and complement on the axon','at the node; sodium channels are lost.'],
  ['The antibody clears and channels return','(animal model), or the axon breaks.']];
const SB_MX=[['AIDP','myelin','myelin'],['AMAN','axon','spared'],['AMSAN','axon','axon']];
const SB_REC=[[ ['AMAN',31,'31 days'],['AIDP',32,'32 days'] ],[ ['AMAN',14,'14% (6 of 44)'],['AIDP',6,'6% (2 of 33)'] ]];
const SB_LG=['antibody','complement pore','macrophage','node of Ranvier','sodium channel','impulse'];
/* cohorts: v = shares (demyelinating, axonal, other) as printed; d = dots out of 100 */
const SB_CATS=[['Demyelinating','AIDP pattern'],['Axonal','AMAN or AMSAN pattern'],['Other','equivocal, inexcitable, normal or unclassified']];
const SB_REG=[
 {id:'eu',b:'IGOS: Europe and the Americas, 573 studies',d:[55,6,39],l:['55%','6%','39%'],
  cap:'<b>International GBS Outcome Study (IGOS), first 1,000 inclusions.</b> Of 573 people with nerve studies in Europe and the Americas, 55% (312) were classed as demyelinating and 6% (33) as axonal. The 39% shown as other is the remainder, derived here <sup class="c" data-ref="Doets2018" title="Source 102"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102</a></sup>.'},
 {id:'asia',b:'IGOS: Asia without Bangladesh, 65 studies',d:[45,6,49],l:['45%','6%','49%'],
  cap:'<b>IGOS, Asia excluding Bangladesh.</b> 45% (29 of 65) demyelinating and 6% (4 of 65) axonal; the other 49% is the remainder <sup class="c" data-ref="Doets2018" title="Source 102"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102</a></sup>. Only 65 Asian studies were analysed, and reviews report AMAN in 30–65% of people in Asia and Central and South America <sup class="c" data-ref="Kuwabara2013" title="Source 257"><a href="/guillain-barre-syndrome/sources/#src-Kuwabara2013">257</a></sup>.'},
 {id:'bd',b:'IGOS: Bangladesh, 94 studies',d:[40,36,24],l:['40%','36%','24%'],
  cap:'<b>IGOS, Bangladesh.</b> 40% (38 of 94) demyelinating and 36% (34 of 94) axonal, so demyelinating was still the most common subtype in every IGOS region. The commonest clinical variant there was pure motor, in 69% <sup class="c" data-ref="Doets2018" title="Source 102"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102</a></sup>.'},
 {id:'trial',b:'Plasma Exchange/Sandoglobulin trial, 369 people',d:[69,3,28],l:['69%','3%','28%'],
  cap:'<b>The 1990s Plasma Exchange/Sandoglobulin trial.</b> 369 people tested within 15 days of onset and classed by Hadden\'s criteria: 69% demyelinating, 3% axonal, 3% inexcitable, 2% normal and 23% equivocal <sup class="c" data-ref="Hadden1998" title="Source 173"><a href="/guillain-barre-syndrome/sources/#src-Hadden1998">173</a></sup>. In the same cohort 16% had pure motor GBS, more often with IgG anti-GM1 and preceding diarrhoea <sup class="c" data-ref="Hadden1998" title="Source 173"><a href="/guillain-barre-syndrome/sources/#src-Hadden1998">173</a></sup>.'},
 {id:'china',b:'Northern China, 1991–92, 129 people',d:[24,65,11],l:['24%','65%','11%'],
  cap:'<b>Northern China, 1991–92.</b> AMAN 65%, AIDP 24% and unclassifiable 11% <sup class="c" data-ref="Ho1995" title="Source 190"><a href="/guillain-barre-syndrome/sources/#src-Ho1995">190</a></sup>. The northern Chinese epidemics came mostly in summer, in children and young adults in rural areas <sup class="c" data-ref="McKhann1993" title="Source 291"><a href="/guillain-barre-syndrome/sources/#src-McKhann1993">291</a></sup>.'},
 {id:'japan',b:'Japan, 97 consecutive people',d:[34,45,21],l:['34%','45%','21%'],
  cap:'<b>Japan, 97 consecutive people.</b> AMAN 45%, AIDP 34% and unclassified 21% <sup class="c" data-ref="Hiraga2005" title="Source 188"><a href="/guillain-barre-syndrome/sources/#src-Hiraga2005">188</a></sup>.'},
 {id:'spain',b:'Spain, 56 people, serial studies',d:[62,29,9],l:['62.5%','28.5%','9%'],
  cap:'<b>Spain, 56 consecutive people with serial studies.</b> 62.5% demyelinating, 28.5% axonal, 1.8% inexcitable, 1.8% equivocal and 5.4% normal <sup class="c" data-ref="Sedano2019" title="Source 402"><a href="/guillain-barre-syndrome/sources/#src-Sedano2019">402</a></sup>. In an Italian series, serial studies moved people mostly from AIDP or equivocal to axonal <sup class="c" data-ref="Uncini2010" title="Source 456"><a href="/guillain-barre-syndrome/sources/#src-Uncini2010">456</a></sup>.'}
];
inits.subtypes=()=>{
  const svg=$('#sbSvg'),rg=$('#sbT');
  const tx=(x,y,s,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`;
  const INK='fill:var(--ink);font-weight:700';
  function legend(x,y,cols,dx,dy){let s='';
    SB_LG.forEach((l,i)=>{const cx=x+(i%cols)*dx,cy=y+Math.floor(i/cols)*dy;
      if(i===0)s+=antibody(cx+7,cy-14,12);
      else if(i===1)s+=mac(cx+7,cy-5,5);
      else if(i===2)s+=macrophage(cx+8,cy-5,8,{seed:3});
      else if(i===3)s+=`<rect x="${f1(cx+3)}" y="${f1(cy-12)}" width="8" height="12" rx="2" style="fill:var(--node)"/>`;
      else if(i===4)s+=`<rect x="${f1(cx+4)}" y="${f1(cy-12)}" width="5" height="12" rx="2" style="fill:var(--nav);stroke:var(--ink);stroke-width:.8"/>`;
      else s+=`<circle cx="${f1(cx+7)}" cy="${f1(cy-6)}" r="6" style="fill:var(--impulse);stroke:var(--ink);stroke-width:1"/>`;
      s+=tx(cx+20,cy-2,l)});
    return s}
  function matrix(x,y,w){let s=tx(x,y,SB_TX.mxT,'t-lbl');const c1=x+w*.47,c2=x+w*.81;
    s+=tx(c1,y+28,SB_TX.mxM,'t-sm t-mid',INK)+tx(c2,y+28,SB_TX.mxS,'t-sm t-mid',INK);
    SB_MX.forEach((r,i)=>{const yy=y+44+i*36;
      s+=`<rect x="${f1(x-4)}" y="${f1(yy-2)}" width="${f1(w+4)}" height="32" rx="8" style="fill:${i===2?'var(--panel-2)':'none'}"/>`;
      s+=tx(x+4,yy+19,r[0],'t-lbl');
      [r[1],r[2]].forEach((v,j)=>{const cx=j?c2:c1,fill=v==='myelin'?'var(--brand-soft)':v==='axon'?'var(--warn-soft)':'var(--panel)',col=v==='myelin'?'var(--brand)':v==='axon'?'var(--warn)':'var(--muted)';
        s+=`<rect x="${f1(cx-34)}" y="${f1(yy+3)}" width="68" height="22" rx="6" style="fill:${fill};stroke:var(--line)"/>`+tx(cx,yy+18,v,'t-sm t-mid',`fill:${col};font-weight:700`)})});
    return s}
  function recovery(x,y,w){let s='';const bx=x+52,bw=w-52-104;
    [[SB_TX.recT1,SB_TX.recS1,40],[SB_TX.recT2,SB_TX.recS2,20]].forEach(([tt,sb,mx],k)=>{const yy=y+k*96;
      s+=tx(x,yy,tt,'t-lbl')+tx(x,yy+15,sb,'t-xs');
      SB_REC[k].forEach((r,i)=>{const by=yy+26+i*24,ww=bw*r[1]/mx;
        s+=tx(x,by+12,r[0],'t-sm',INK)+`<rect x="${f1(bx)}" y="${f1(by)}" width="${f1(ww)}" height="16" rx="4" style="fill:${i?'var(--brand)':'var(--accent)'};opacity:.85"/>`+tx(bx+ww+6,by+12,r[2],'t-sm')})});
    return s+tx(x,y+196,SB_TX.recN,'t-xs')}
  function draw(t){
    const N=vb(svg,'720 352','400 690'),p=phaseOf(SB_STEPS,t);
    const L=N?{fx:12,fw:376,aT:24,aS:40,aY:100,bT:176,bS:192,bY:258,bY1:250,bY2:312,px:12,py:350,pw:376,zx:50,zy:366,zs:1,cy:578,lx:14,ly:640,lc:3,ldx:128,ldy:28}
             :{fx:16,fw:424,aT:24,aS:24,aY:88,bT:166,bS:166,bY:232,bY1:214,bY2:276,px:468,py:24,pw:236,zx:468,zy:40,zs:.787,cy:212,lx:16,ly:340,lc:6,ldx:118,ldy:0};
    const ph=(t*30)%1,st=SB_ST[p];
    let s='';
    /* orientation */
    s+=tx(L.fx,N?L.aY+52:L.aY+50,SB_TX.cord,'t-xs')+tx(L.fx+L.fw,N?L.aY+52:L.aY+50,SB_TX.muscle,'t-xs t-end');
    /* lane A: AIDP */
    const aD=ramp(t,.17,.3),rm=ramp(t,.86,.97),aMac=ramp(t,.19,.26)*(1-rm),dimA=p>=2&&p<=4?.55:0;
    s+=tx(L.fx,L.aT,SB_TX.laneA,'t-lbl',p===1||p===5?'fill:var(--brand)':'');
    s+=N?tx(L.fx,L.aS,st[0],'t-sm'):tx(L.fx+L.fw,L.aT,st[0],'t-sm t-end');
    const A=nerveFibre(L.fx,L.aY,L.fw,{n:5,h:34,demy:[aD*.35,aD,aD*.9,aD*.25,0],mac:[0,aMac,aMac*.8,0,0],remy:[rm*.6,rm,rm,rm*.5,0],
      pulse:ph,snap:aD<.3||rm>.6,block:aD>.7&&rm<.6?1:undefined,dim:dimA});
    s+=A.svg;
    if(p>=1&&p<=4&&aMac>.3)s+=kitLabel((A.at.nodes[2][0]+A.at.nodes[3][0])/2,L.aY+36,SB_TX.strip,{a:'m'});
    if(p===5&&rm>.3)s+=kitLabel((A.at.nodes[1][0]+A.at.nodes[2][0])/2,L.aY+36,SB_TX.remy,{a:'m'});
    /* lane B: AMAN, then two courses, AMSAN, recovery */
    const nh=ramp(t,.35,.46),dimB=p===1?.55:0,pat=v=>[0,v*.6,v,v,v*.6,0];
    s+=tx(L.fx,L.bT,p===4?SB_TX.laneB4:SB_TX.laneB,'t-lbl',p>=2&&p<=4?'fill:var(--warn)':'');
    s+=N?tx(L.fx,L.bS,st[1],'t-sm'):tx(L.fx+L.fw,L.bT,st[1],'t-sm t-end');
    if(p<=2){const B=nerveFibre(L.fx,L.bY,L.fw,{n:5,h:34,nodeHit:pat(nh),pulse:ph,block:nh>.6?1:undefined,dim:dimB});
      s+=B.svg;if(p===2&&nh>.3)s+=kitLabel(B.at.nodes[2][0],L.bY+34,SB_TX.hit,{a:'m'})}
    else{const lab=SB_DUAL[p];let o1,o2;
      if(p===3){const clr=1-ramp(t,.58,.66),cutOn=ramp(t,.55,.6)>.5;
        o1={nodeHit:pat(clr),block:clr>.5?1:undefined};
        o2={nodeHit:pat(cutOn?.4:1),cut:cutOn?.44:null,block:cutOn?2:1}}
      else if(p===4){o1={nodeHit:pat(.3),cut:.44,block:2};o2={nodeHit:pat(.3),cut:.44,block:2,demy:0}}
      else{o1={nodeHit:pat(0)};o2={cut:.44,regrow:ramp(t,.87,1),block:2}}
      [[L.bY1,o1,lab[0]],[L.bY2,o2,lab[1]]].forEach(([yy,o,lb])=>{s+=tx(L.fx,yy-30,lb,'t-sm',INK)+nerveFibre(L.fx,yy,L.fw,Object.assign({n:5,h:26,pulse:ph},o)).svg})}
    /* side panel */
    if(p<=3){const zo=p===0?{mode:'aman'}:p===1?{mode:'aidp',ab:ramp(t,.17,.21),c3:ramp(t,.2,.24),mac:ramp(t,.23,.31)}
        :p===2?{mode:'aman',ab:ramp(t,.35,.39),c3:ramp(t,.38,.42),nav:ramp(t,.41,.47),mac:ramp(t,.45,.51)}
        :{mode:'aman',ab:1-ramp(t,.58,.66),c3:1-ramp(t,.58,.66),nav:1-ramp(t,.6,.68)};
      zo.labels=true;
      s+=tx(L.px,L.py,SB_TX.zoomT,'t-lbl');
      s+=`<rect x="${f1(L.zx-2)}" y="${f1(L.zy-2)}" width="${f1(300*L.zs+4)}" height="${f1(190*L.zs+4)}" rx="8" style="fill:var(--field);stroke:var(--line)"/>`;
      s+=nodeZoom(L.zx,L.zy,L.zs,zo).svg;
      SB_CAP[p].forEach((c,i)=>{s+=tx(L.px,L.cy+i*15,c,'t-xs')})}
    else if(p===4)s+=matrix(L.px,L.py,L.pw);
    else s+=recovery(L.px,L.py,L.pw);
    s+=legend(L.lx,L.ly,L.lc,L.ldx,L.ldy);
    svg.innerHTML=s;
    setSt(p);$('#sbNote').innerHTML=noteHTML(SB_STEPS[p]);
  }
  const stop=playWire(rg,$('#sbPlay'),draw,16000,'Replay','subtypes');
  const setSt=stepWire($('#sbSteps'),SB_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- cohorts: 100 dots ---------- */
  const rs=$('#sbReg'),rc=$('#sbRegCap');let rCur='eu',rPrev='eu',rq=1,rStop=null;
  const cats=d=>{const a=[];for(let i=0;i<100;i++)a.push(i<d[0]?0:i<d[0]+d[1]?1:2);return a};
  function dot(cx,cy,k,r=7){
    if(k===0)return `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r)}" style="fill:var(--brand)"/>`;
    if(k===1)return `<rect x="${f1(cx-r*.75)}" y="${f1(cy-r*.75)}" width="${f1(r*1.5)}" height="${f1(r*1.5)}" transform="rotate(45 ${f1(cx)} ${f1(cy)})" style="fill:var(--accent)"/>`;
    return `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r*.72)}" style="fill:none;stroke:var(--muted);stroke-width:1.6"/>`}
  function drawReg(){const N=vb(rs,'720 250','400 450'),D=SB_REG.find(d=>d.id===rCur),P=SB_REG.find(d=>d.id===rPrev);
    const ca=cats(D.d),cp=cats(P.d),G=N?{x:100,y:44}:{x:24,y:40},R=N?{x:12,y:282,w:376}:{x:268,y:66,w:436};
    let s=tx(N?12:24,22,D.b,'t-lbl');
    for(let i=0;i<100;i++){const c=i%10,r=Math.floor(i/10),k=i<rq*100?ca[i]:cp[i];s+=dot(G.x+c*20+10,G.y+r*20+10,k)}
    SB_CATS.forEach((c,k)=>{const yy=R.y+k*58;
      s+=dot(R.x+8,yy-5,k,7)+tx(R.x+24,yy+2,D.l[k],'t-big','font-size:20px');
      s+=tx(R.x+96,yy-4,c[0],'t-lbl')+tx(R.x+96,yy+10,c[1],'t-xs');
      const bw=(R.w-96)*D.d[k]/100;s+=`<rect x="${f1(R.x+96)}" y="${f1(yy+17)}" width="${f1(R.w-96)}" height="7" rx="3.5" style="fill:var(--panel-2)"/><rect x="${f1(R.x+96)}" y="${f1(yy+17)}" width="${f1(bw)}" height="7" rx="3.5" style="fill:${k===0?'var(--brand)':k===1?'var(--accent)':'var(--muted)'}"/>`});
    rs.innerHTML=s;rc.innerHTML=D.cap;
    $$('[data-sbreg]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.sbreg===rCur))}
  $$('[data-sbreg]').forEach(b=>b.addEventListener('click',()=>{if(b.dataset.sbreg===rCur)return;if(rStop)rStop();
    rPrev=rCur;rCur=b.dataset.sbreg;rq=0;rStop=animate(800,u=>{rq=ease(u);drawReg()},()=>{rStop=null;rPrev=rCur})}));
  const prevR=redraws.subtypes;redraws.subtypes=()=>{prevR&&prevR();drawReg()};
  drawReg();
};
/* =============== 1.5 Miller Fisher syndrome and other variants =============== */
/* Main scene: one course of MFS against a day axis (the first two weeks stretched): body, eyes close-up,
   triad status rows, then why the eyes and balance (anatomy), and a Gantt of the published medians.
   Second scene: the 60 people of Sekiguchi 2016, by overlap. Numbers from research pass C. */
const MF_STEPS=[
 {from:0,at:.06,k:'Before onset',t:'An infection, then anti-GQ1b antibodies',
  txt:'In the first report, IgG against the ganglioside GQ1b was raised early in all 6 people with typical MFS, fell with time, and was absent in controls, including people with GBS <sup class="c" data-ref="Chiba1992" title="Source 77"><a href="/guillain-barre-syndrome/sources/#src-Chiba1992">77</a></sup>. Positivity differs by series: 95% (18 of 19) <sup class="c" data-ref="Chiba1993" title="Source 78"><a href="/guillain-barre-syndrome/sources/#src-Chiba1993">78</a></sup>, 81% (13 of 16) <sup class="c" data-ref="Yuki1993GQ1b" title="Source 527"><a href="/guillain-barre-syndrome/sources/#src-Yuki1993GQ1b">527</a></sup> and 83% of 466 people with Fisher syndrome, of whom 21% had recent <i>Campylobacter jejuni</i> <sup class="c" data-ref="Ito2008" title="Source 209"><a href="/guillain-barre-syndrome/sources/#src-Ito2008">209</a></sup>.',
  pt:'Many people have an infection first. The immune system then makes antibodies that also stick to the nerves that move the eyes and to nerve cells that sense body position.',
  hook:'Fisher syndrome antibody: anti-GQ1b, cross-reacting with GT1a <sup class="c" data-ref="Chiba1993" title="Source 78"><a href="/guillain-barre-syndrome/sources/#src-Chiba1993">78</a></sup>.'},
 {from:.17,at:.21,k:'Days 0 to 3',t:'The triad: eyes, balance, reflexes',
  txt:'MFS is defined by ophthalmoplegia, ataxia and areflexia. In 50 consecutive people, pupil abnormalities, drooping eyelids (ptosis) and facial palsy were frequent, while sensory loss was unusual despite profound ataxia <sup class="c" data-ref="Mori2001MFS" title="Source 301"><a href="/guillain-barre-syndrome/sources/#src-Mori2001MFS">301</a></sup>. Its estimated share of the GBS spectrum is 5–25% <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.',
  pt:'Miller Fisher syndrome affects the eyes, balance and reflexes. Eye movements are weak, walking is unsteady and reflexes are missing.',
  hook:'Triad of MFS: ophthalmoplegia, ataxia, areflexia <sup class="c" data-ref="Mori2001MFS" title="Source 301"><a href="/guillain-barre-syndrome/sources/#src-Mori2001MFS">301</a></sup>.'},
 {from:.24,at:.3,k:'Days 0 to 7',t:'The first week: watch for spread',
  txt:'In 60 consecutive people who began with the triad alone, half stayed pure and half overlapped: with pharyngeal-cervical-brachial weakness in 23%, conventional GBS in 15% and Bickerstaff brainstem encephalitis in 12%. The overlaps began at a median of day 5, 3 and 3, and every one within 7 days <sup class="c" data-ref="Sekiguchi2016" title="Source 407"><a href="/guillain-barre-syndrome/sources/#src-Sekiguchi2016">407</a></sup>. In a Dutch cohort, 10 of 23 (43%) developed limb weakness, all in the first week, with no early predictor <sup class="c" data-ref="Verboon2017MFS" title="Source 482"><a href="/guillain-barre-syndrome/sources/#src-Verboon2017MFS">482</a></sup>. Overlap needed ventilation in 24% of one series <sup class="c" data-ref="Funakoshi2009" title="Source 145"><a href="/guillain-barre-syndrome/sources/#src-Funakoshi2009">145</a></sup>.',
  pt:'Miller Fisher syndrome can spread to the arms, legs, swallowing or breathing in the first week. That is why doctors watch closely at first.',
  hook:'Fisher overlap occurs in the first week: monitor at least 7 days <sup class="c" data-ref="Sekiguchi2016,Verboon2017MFS" title="Source 407,482"><a href="/guillain-barre-syndrome/sources/#src-Sekiguchi2016">407,482</a></sup>.'},
 {from:.36,at:.42,k:'Why these signs',t:'Why the eyes and balance',
  txt:'A monoclonal anti-GQ1b antibody stained the paranodal regions of the human oculomotor, trochlear and abducens nerves, and oculomotor nerve contained more GQ1b than spinal roots; every anti-GQ1b serum also reacted with GT1a <sup class="c" data-ref="Chiba1993" title="Source 78"><a href="/guillain-barre-syndrome/sources/#src-Chiba1993">78</a></sup>. The other lesion site is the group Ia neurons in the dorsal root ganglion: ataxia and areflexia reflect an impaired proprioceptive afferent system <sup class="c" data-ref="Kuwabara2017" title="Source 258"><a href="/guillain-barre-syndrome/sources/#src-Kuwabara2017">258</a></sup>. Anti-GQ1b was found in 5 of 6 people with GBS and ophthalmoplegia, and in none of 23 without it <sup class="c" data-ref="Chiba1993" title="Source 78"><a href="/guillain-barre-syndrome/sources/#src-Chiba1993">78</a></sup>.',
  pt:'The antibodies stick to the nerves that move the eyes, and to nerve cells that tell the brain where the body is. That is why the eyes and balance are hit.',
  hook:'MFS lesion sites: the oculomotor nerves and group Ia neurons in the dorsal root ganglion <sup class="c" data-ref="Kuwabara2017" title="Source 258"><a href="/guillain-barre-syndrome/sources/#src-Kuwabara2017">258</a></sup>.'},
 {from:.5,at:.6,k:'About a month',t:'The antibody fades, then balance returns',
  txt:'Antibody titres peak at clinical presentation and can be undetectable as early as about one month after onset, so a late sample may miss them <sup class="c" data-ref="Overell2007" title="Source 343"><a href="/guillain-barre-syndrome/sources/#src-Overell2007">343</a></sup>. In an untreated series of 28 (Mori, as summarised by Cochrane), ataxia had gone at a median of 32 days, with a range of 8 to 271 <sup class="c" data-ref="Overell2007" title="Source 343"><a href="/guillain-barre-syndrome/sources/#src-Overell2007">343</a></sup>.',
  pt:'The antibody level falls over weeks. In the published series, balance came back before eye movements did.',
  hook:'Timing matters: anti-GQ1b titres peak at presentation and can be undetectable by about one month <sup class="c" data-ref="Overell2007" title="Source 343"><a href="/guillain-barre-syndrome/sources/#src-Overell2007">343</a></sup>.'},
 {from:.76,at:.88,k:'Months 2 to 6',t:'Eye movements return',
  txt:'In the same untreated series, ophthalmoplegia had gone at a median of 88 days, with a range of 29 to 165 <sup class="c" data-ref="Overell2007" title="Source 343"><a href="/guillain-barre-syndrome/sources/#src-Overell2007">343</a></sup>. In a later cohort of 92, 96% (89 people) had complete remission of ophthalmoplegia and ataxia at one year, with no deaths recorded <sup class="c" data-ref="Overell2007" title="Source 343"><a href="/guillain-barre-syndrome/sources/#src-Overell2007">343</a></sup>. Most people with pure MFS recover completely without treatment within 6 months <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.',
  pt:'Most people with Miller Fisher syndrome recover fully, usually within 6 months. These numbers describe groups of people. They cannot tell you exactly what will happen to you.',
  hook:'Untreated MFS: ataxia gone at a median 32 days, ophthalmoplegia at 88 days <sup class="c" data-ref="Overell2007" title="Source 343"><a href="/guillain-barre-syndrome/sources/#src-Overell2007">343</a></sup>.'}
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
  cap:'<b>Stayed pure: 30 of 60 (50%).</b> The triad of ophthalmoplegia, ataxia and areflexia without wider weakness <sup class="c" data-ref="Sekiguchi2016" title="Source 407"><a href="/guillain-barre-syndrome/sources/#src-Sekiguchi2016">407</a></sup>.'},
 {id:'pcb',n:14,share:'23%',t:'Pharyngeal-cervical-brachial overlap',d:'median day 5 (range 1–7)',z:{eyes:1,face:.7,neck:1,arms:1},
  cap:'<b>Pharyngeal-cervical-brachial overlap: 23%.</b> Throat, neck and arm weakness joined the triad at a median of day 5 (range 1–7) <sup class="c" data-ref="Sekiguchi2016" title="Source 407"><a href="/guillain-barre-syndrome/sources/#src-Sekiguchi2016">407</a></sup>. Anti-GT1a IgG was found in 51% of people with this variant <sup class="c" data-ref="Nagashima2007" title="Source 313"><a href="/guillain-barre-syndrome/sources/#src-Nagashima2007">313</a></sup>.'},
 {id:'gbs',n:9,share:'15%',t:'Overlap with classic GBS',d:'median day 3 (range 1–4)',z:{eyes:1,legs:1,arms:1},
  cap:'<b>Overlap with conventional GBS: 15%.</b> Limb weakness joined the triad at a median of day 3 (range 1–4) <sup class="c" data-ref="Sekiguchi2016" title="Source 407"><a href="/guillain-barre-syndrome/sources/#src-Sekiguchi2016">407</a></sup>. Descending tetraparesis and early titubation marked those who needed ventilation in another series <sup class="c" data-ref="Funakoshi2009" title="Source 145"><a href="/guillain-barre-syndrome/sources/#src-Funakoshi2009">145</a></sup>.'},
 {id:'bbe',n:7,share:'12%',t:'Overlap with Bickerstaff encephalitis',d:'median day 3 (range 1–5)',z:{eyes:1},bbe:1,
  cap:'<b>Overlap with Bickerstaff brainstem encephalitis: 12%.</b> Drowsiness or brisk reflexes joined the triad at a median of day 3 (range 1–5) <sup class="c" data-ref="Sekiguchi2016,Odaka2003" title="Source 335,407"><a href="/guillain-barre-syndrome/sources/#src-Sekiguchi2016">335,407</a></sup>.'}];
const MF_OVALL={t:'All 60 people with Fisher syndrome',d:'every overlap began within 7 days',
  cap:'<b>60 consecutive people with Fisher syndrome</b> all started with the triad alone; 50% stayed pure and 50% overlapped, every overlap within 7 days of onset <sup class="c" data-ref="Sekiguchi2016" title="Source 407"><a href="/guillain-barre-syndrome/sources/#src-Sekiguchi2016">407</a></sup>. Dot counts are rounded from the published percentages.'};
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
  const stop=playWire(rg,$('#mfPlay'),draw,16000,'Replay','mfs');
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
/* =============== 1.6 the course over time =============== */
/* Time axis: the first 8 weeks are stretched (linear), months and years squeezed (logarithmic), so the slider spends
   its first 55% on days 0-56 and the rest on day 56 to day 730. */
const CO_T8=.55,CO_END=730;
function coDay(t){return t<=CO_T8?56*t/CO_T8:56*Math.pow(CO_END/56,(t-CO_T8)/(1-CO_T8))}
function coTOf(d){return d<=56?d/56*CO_T8:CO_T8+(1-CO_T8)*Math.log(d/56)/Math.log(CO_END/56)}
/* the schematic course: rises to the Italian mean nadir (day 12), holds to the mean first improvement (day 28),
   falls towards the mean clinical recovery (day 200), with a long tail. Shape illustrative <sup class="c" data-ref="Italian1996" title="Source 208"><a href="/guillain-barre-syndrome/sources/#src-Italian1996">208</a></sup> */
function coLv(d){if(d<=12)return .06+.94*(1-Math.pow(1-d/12,2));if(d<=28)return 1;
  if(d<=200)return 1-.78*ease(Math.log(d/28)/Math.log(200/28));return .22-.12*clamp(Math.log(d/200)/Math.log(CO_END/200))}
const CO_STEPS=[
 {from:0,at:.012,k:'Day 0',t:'Weakness begins',
  txt:'Weakness, often with tingling or pain, starts in both legs or all four limbs. In IGOS the median time from onset of weakness to hospital admission was 3 days (IQR 2 to 6). <sup class="c" data-ref="Doets2018" title="Source 102"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102</a></sup> Maximum weakness within 24 hours of onset should prompt a search for another diagnosis, <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup> and the EAN/PNS guideline lists no further worsening after 24 hours as making GBS less likely. <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>',
  pt:'Weakness usually builds over several days, not minutes. People often reach hospital within a few days of it starting.',
  hook:'Nadir in under 24 hours: think of another diagnosis. <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>'},
 {from:.03,at:.06,k:'The first days',t:'Progression',
  txt:'Weakness climbs. In 67 Dutch children (median age 5) the progressive phase lasted a median of 6 days, <sup class="c" data-ref="Roodbol2017" title="Source 382"><a href="/guillain-barre-syndrome/sources/#src-Roodbol2017">382</a></sup> and in 156 children the median from weakness to nadir was 8 days. <sup class="c" data-ref="Helfferich2022" title="Source 183"><a href="/guillain-barre-syndrome/sources/#src-Helfferich2022">183</a></sup> In the 2013 to 2014 Zika outbreak in French Polynesia, the median installation phase was 6 days. <sup class="c" data-ref="CaoLormeau2016" title="Source 68"><a href="/guillain-barre-syndrome/sources/#src-CaoLormeau2016">68</a></sup> In the Italian cohort, 73% had reached their plateau by 1 week and 98% by 4 weeks. <sup class="c" data-ref="Italian1996" title="Source 208"><a href="/guillain-barre-syndrome/sources/#src-Italian1996">208</a></sup>',
  pt:'For most people, weakness keeps increasing for some days, up to about 2 weeks.',
  hook:'Children: progressive phase median 6 days, under 4 weeks in all. <sup class="c" data-ref="Roodbol2017" title="Source 382"><a href="/guillain-barre-syndrome/sources/#src-Roodbol2017">382</a></sup>'},
 {from:.09,at:.118,k:'Mean day 12',t:'The worst point',
  txt:'In 297 Italian people followed prospectively, the mean time to nadir was 12 days. <sup class="c" data-ref="Italian1996" title="Source 208"><a href="/guillain-barre-syndrome/sources/#src-Italian1996">208</a></sup> Of 494 Dutch adults, 80% had reached nadir by 2 weeks, 97% by 4 weeks and all by 6 weeks. <sup class="c" data-ref="Fokke2014" title="Source 131"><a href="/guillain-barre-syndrome/sources/#src-Fokke2014">131</a></sup> The EAN/PNS guideline requires worsening for no more than 4 weeks and notes that progression almost never exceeds 4 weeks. <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup> In IGOS, 19% were ventilated. <sup class="c" data-ref="Doets2018" title="Source 102"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102</a></sup>',
  pt:'The weakest point usually comes within about 2 weeks, and almost always within 4.',
  hook:'Nadir: 80% by 2 weeks, 97% by 4 weeks, 100% by 6 weeks (494 Dutch adults). <sup class="c" data-ref="Fokke2014" title="Source 131"><a href="/guillain-barre-syndrome/sources/#src-Fokke2014">131</a></sup>'},
 {from:.14,at:.2,k:'Days to weeks',t:'The plateau',
  txt:'After the progressive phase comes a plateau lasting days, weeks or months. <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup> Its length is thinly reported: in French Polynesia the median was 4 days (IQR 3 to 10). <sup class="c" data-ref="CaoLormeau2016" title="Source 68"><a href="/guillain-barre-syndrome/sources/#src-CaoLormeau2016">68</a></sup> In a small series of 6 treated people, a longer plateau went with less recovery of knee and elbow strength. <sup class="c" data-ref="ElMhandi2007" title="Source 112"><a href="/guillain-barre-syndrome/sources/#src-ElMhandi2007">112</a></sup>',
  pt:'Then comes a flat stretch: no worse, not yet better. It can be short or long.',
  hook:'Plateau: median 4 days in the French Polynesia outbreak, the best direct figure. <sup class="c" data-ref="CaoLormeau2016" title="Source 68"><a href="/guillain-barre-syndrome/sources/#src-CaoLormeau2016">68</a></sup>'},
 {from:.27,at:.3,k:'Mean day 28',t:'Recovery begins',
  txt:'In the Italian cohort the mean time to first improvement was 28 days; improvement had begun within the first week in 36% and within 4 weeks in 85%. <sup class="c" data-ref="Italian1996" title="Source 208"><a href="/guillain-barre-syndrome/sources/#src-Italian1996">208</a></sup> Up to two-thirds of deaths in GBS occur in the recovery phase, mostly from heart and breathing problems, so monitoring continues after the nadir. <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup> In a Dutch cohort, 67% of deaths came in the recovery phase. <sup class="c" data-ref="vanDenBerg2013" title="Source 463"><a href="/guillain-barre-syndrome/sources/#src-vanDenBerg2013">463</a></sup>',
  pt:'Improvement usually starts within a few weeks. Checks and care continue, because problems can still happen while things get better.',
  hook:'Up to two-thirds of deaths occur in the recovery phase. <sup class="c" data-ref="Leonhard2019,vanDenBerg2013" title="Source 266,463"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266,463</a></sup>'},
 {from:.4,at:.47,k:'Up to 8 weeks',t:'Watching for a dip',
  txt:'Treatment-related fluctuations, worsening within 2 months after a first improvement or stabilisation on treatment, occur in 6 to 10%. <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup> In 170 people followed prospectively, the first fluctuation always came within 8 weeks of onset (median 18 days, range 10 to 54). <sup class="c" data-ref="Ruts2010" title="Source 391"><a href="/guillain-barre-syndrome/sources/#src-Ruts2010">391</a></sup> Worsening after 8 weeks, or 3 or more times, raises acute-onset CIDP, the final diagnosis in about 5%. <sup class="c" data-ref="Ruts2010,vanDoorn2023" title="Source 391,473"><a href="/guillain-barre-syndrome/sources/#src-Ruts2010">391,473</a></sup> The explorer further down shows the patterns.',
  pt:'Some people get a bit worse again after first improving. This can be part of GBS. Worsening that goes on past about 8 weeks may point to a related long-term condition, CIDP.',
  hook:'A-CIDP: 3 or more fluctuations, or worsening 8 weeks or more after onset. <sup class="c" data-ref="Ruts2010,vanDoorn2023" title="Source 391,473"><a href="/guillain-barre-syndrome/sources/#src-Ruts2010">391,473</a></sup>'},
 {from:.55,at:.757,k:'Months',t:'The long climb back',
  txt:'Mean time to clinical recovery in the Italian cohort was 200 days; 57% had recovered at 6 months, 70% at 12 months and 82% at 24 months. <sup class="c" data-ref="Italian1996" title="Source 208"><a href="/guillain-barre-syndrome/sources/#src-Italian1996">208</a></sup> About 80% regain independent walking by 6 months. <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup> In IGOS the median time to walking independently was 63 days in Europe/Americas, 39 in Asia and 95 in Bangladesh. <sup class="c" data-ref="Doets2018" title="Source 102"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102</a></sup> In 76 people treated in intensive care it was 198 days. <sup class="c" data-ref="Dhar2008" title="Source 99"><a href="/guillain-barre-syndrome/sources/#src-Dhar2008">99</a></sup>',
  pt:'Recovery is usually slow, over months. Most of the gain comes in the first year.',
  hook:'Italian cohort means: nadir 12 days, first improvement 28, clinical recovery 200. <sup class="c" data-ref="Italian1996" title="Source 208"><a href="/guillain-barre-syndrome/sources/#src-Italian1996">208</a></sup>'},
 {from:.86,at:.95,k:'Years',t:'Gains continue',
  txt:'In a Swedish cohort of 42, recovery happened mainly in the first year, and motor and sensory problems were each still detectable in more than half at 2 years. <sup class="c" data-ref="Forsberg2004Impairment" title="Source 133"><a href="/guillain-barre-syndrome/sources/#src-Forsberg2004Impairment">133</a></sup> Among people treated in intensive care, 19% improved by at least one functional grade after 1 year. <sup class="c" data-ref="Fletcher2000" title="Source 129"><a href="/guillain-barre-syndrome/sources/#src-Fletcher2000">129</a></sup> Recovery from remaining complaints may still occur more than 5 years after onset, <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup> and in one intensive care cohort as late as 10 years. <sup class="c" data-ref="Dhar2008" title="Source 99"><a href="/guillain-barre-syndrome/sources/#src-Dhar2008">99</a></sup>',
  pt:'Progress can keep coming for years. Tiredness, pain or some weakness can remain, even after a good recovery.',
  hook:'Fastest in the first year, but recovery can continue for more than 5 years. <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>'}
];
const CO_TICKS=[{d:0,l:'0'},{d:7,l:'1 wk',w:1},{d:14,l:'2 wk'},{d:28,l:'4 wk'},{d:56,l:'8 wk'},{d:182,l:'6 mo'},{d:365,l:'1 yr'},{d:730,l:'2 yr'}];
const CO_MARK=[{d:12,n:'1'},{d:28,n:'2'},{d:200,n:'3'}];
const CO_FS=[{d:0,l:'a healthy fibre'},{d:1,l:'myelin being stripped'},{d:12,l:'signals blocked'},{d:28,l:'thin new myelin forming'},{d:200,l:'thin new myelin'}];
const CO_LBL={a:'disability over time (schematic)',b:'share of people (dots published, lines schematic)',worse:'worse',better:'better',x:'time since weakness began',fibre:'nerve fibre'};
const CO_UNIT={d:'Day',m:'Month',y:'Year'};
/* cumulative series: published points with the sentence each one supports */
const CO_SER=[
 {id:'nad',lab:'worst point reached',col:'var(--rx)',dash:'',none:'Worst point: the first published point is at 2 weeks. <sup class="c" data-ref="Fokke2014" title="Source 131"><a href="/guillain-barre-syndrome/sources/#src-Fokke2014">131</a></sup>',
  P:[{d:14,v:80,txt:'80% of Dutch adults had reached their worst point by 2 weeks. <sup class="c" data-ref="Fokke2014" title="Source 131"><a href="/guillain-barre-syndrome/sources/#src-Fokke2014">131</a></sup>'},{d:28,v:97,txt:'97% had reached their worst point by 4 weeks. <sup class="c" data-ref="Fokke2014" title="Source 131"><a href="/guillain-barre-syndrome/sources/#src-Fokke2014">131</a></sup>'},{d:42,v:100,txt:'All had reached their worst point by 6 weeks. <sup class="c" data-ref="Fokke2014" title="Source 131"><a href="/guillain-barre-syndrome/sources/#src-Fokke2014">131</a></sup>'}]},
 {id:'imp',lab:'improvement begun',col:'var(--accent)',dash:'7 4',none:'Improvement: the first published point is at 1 week. <sup class="c" data-ref="Italian1996" title="Source 208"><a href="/guillain-barre-syndrome/sources/#src-Italian1996">208</a></sup>',
  P:[{d:7,v:36,txt:'Improvement had begun in 36% of the Italian cohort by 1 week. <sup class="c" data-ref="Italian1996" title="Source 208"><a href="/guillain-barre-syndrome/sources/#src-Italian1996">208</a></sup>'},{d:28,v:85,txt:'Improvement had begun in 85% by 4 weeks. <sup class="c" data-ref="Italian1996" title="Source 208"><a href="/guillain-barre-syndrome/sources/#src-Italian1996">208</a></sup>'}]},
 {id:'rec',lab:'clinically recovered',col:'var(--rec)',dash:'2 3',none:'Recovery: the first published point is at 1 week. <sup class="c" data-ref="Italian1996" title="Source 208"><a href="/guillain-barre-syndrome/sources/#src-Italian1996">208</a></sup>',
  P:[{d:7,v:4,txt:'4% of the Italian cohort had clinically recovered at 1 week. <sup class="c" data-ref="Italian1996" title="Source 208"><a href="/guillain-barre-syndrome/sources/#src-Italian1996">208</a></sup>'},{d:28,v:24,txt:'24% had clinically recovered at 4 weeks. <sup class="c" data-ref="Italian1996" title="Source 208"><a href="/guillain-barre-syndrome/sources/#src-Italian1996">208</a></sup>'},{d:182,v:57,txt:'57% had clinically recovered at 6 months. <sup class="c" data-ref="Italian1996" title="Source 208"><a href="/guillain-barre-syndrome/sources/#src-Italian1996">208</a></sup>'},{d:365,v:70,txt:'70% had clinically recovered at 12 months. <sup class="c" data-ref="Italian1996" title="Source 208"><a href="/guillain-barre-syndrome/sources/#src-Italian1996">208</a></sup>'},{d:730,v:82,txt:'82% had clinically recovered at 24 months. <sup class="c" data-ref="Italian1996" title="Source 208"><a href="/guillain-barre-syndrome/sources/#src-Italian1996">208</a></sup>'}]}
];
/* the Swedish cohort, n=42 <sup class="c" data-ref="Forsberg2004Impairment,Forsberg2005Disability" title="Source 133,134"><a href="/guillain-barre-syndrome/sources/#src-Forsberg2004Impairment">133,134</a></sup> */
const CO_SW_T=['2 weeks','1 year','2 years'];
const CO_SW=[
 {n:'Could not walk 10 m alone',v:[62,10,7]},
 {n:'Overall strength below normal',v:[100,62,55]},
 {n:'Grip strength below normal',v:[98,38,31]},
 {n:'Sensation affected',v:[93,55,52]},
 {n:'Face muscles affected',v:[38,14,12]},
 {n:'Needed help with personal care',v:[76,14,12]},
 {n:'Needed help with household tasks',v:[98,28,26]}
];
const CO_SW_HEAD='% of the 42 people at each examination; dashed outline: the 2-week value';
const CO_SW_NOTE=[
 {k:'2 weeks',t:'Early on, nearly everything is affected',txt:'At 2 weeks almost everyone had weaker muscles and changed sensation, 62% could not walk 10 metres on their own, and everyone who had been working was unable to work. <sup class="c" data-ref="Forsberg2004Impairment,Forsberg2005Disability" title="Source 133,134"><a href="/guillain-barre-syndrome/sources/#src-Forsberg2004Impairment">133,134</a></sup>'},
 {k:'1 year',t:'Most of the recovery has happened',txt:'By 1 year, 10% could not walk 10 metres alone and 14% needed help with personal care. Yet 62% still had below-normal strength and 55% changed sensation: walking returns before strength is fully back. <sup class="c" data-ref="Forsberg2004Impairment,Forsberg2005Disability" title="Source 133,134"><a href="/guillain-barre-syndrome/sources/#src-Forsberg2004Impairment">133,134</a></sup>'},
 {k:'2 years',t:'Slower change, real gains',txt:'Between 1 and 2 years the figures moved only a little. Motor and sensory problems were each still detectable in more than half, and 17% of those who had worked before were unable to work. <sup class="c" data-ref="Forsberg2004Impairment,Forsberg2005Disability" title="Source 133,134"><a href="/guillain-barre-syndrome/sources/#src-Forsberg2004Impairment">133,134</a></sup> Recovery from remaining complaints can still occur more than 5 years after onset. <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>'}
];
/* fluctuation patterns: schematic shapes in weeks; tx = treatment marks; pk = worsening peaks */
const CO_FL=[
 {id:'mono',n:'One course',P:[ [0,0],[1.7,1],[3,1],[6,.74],[10,.5],[16,.35] ],tx:[1],pk:[],
  k:'Monophasic',t:'One rise, a plateau, recovery',
  txt:'This is the usual pattern. In 494 Dutch adults, 95% had a monophasic course, and 10% of those had a treatment-related fluctuation within it. <sup class="c" data-ref="Fokke2014" title="Source 131"><a href="/guillain-barre-syndrome/sources/#src-Fokke2014">131</a></sup> Among 67 Dutch children, 97% had a monophasic course. <sup class="c" data-ref="Roodbol2017" title="Source 382"><a href="/guillain-barre-syndrome/sources/#src-Roodbol2017">382</a></sup>'},
 {id:'trf',n:'Treatment-related fluctuation',P:[ [0,0],[1.6,1],[2.4,.98],[3.6,.72],[4.6,.93],[5.4,.9],[8,.62],[12,.45],[16,.38] ],tx:[1,4.6],pk:[4.6],
  k:'Treatment-related fluctuation',t:'Better, then worse again, within 8 weeks',
  txt:'Worsening within 2 months after a first improvement or stabilisation on treatment, in 6 to 10%. <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup> In 170 people the first fluctuation came at a median of 18 days (range 10 to 54), always within 8 weeks; 31% of those had a second and none a third. <sup class="c" data-ref="Ruts2010" title="Source 391"><a href="/guillain-barre-syndrome/sources/#src-Ruts2010">391</a></sup> It was not related to whether plasma exchange or IVIg was given. <sup class="c" data-ref="Visser1998" title="Source 486"><a href="/guillain-barre-syndrome/sources/#src-Visser1998">486</a></sup> The EAN/PNS guideline suggests considering repeat treatment, on observational evidence (quoted as published, not as instructions). <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>'},
 {id:'acidp',n:'Acute-onset CIDP pattern',P:[ [0,0],[2,.9],[4,.66],[5.8,.88],[7.4,.7],[10,.97],[12,.95],[16,.82] ],tx:[1,5.8,10],pk:[5.8,10],
  k:'Acute-onset CIDP',t:'Worse again past 8 weeks, or 3 or more times',
  txt:'About 5% of people first diagnosed with GBS turn out to have A-CIDP. <sup class="c" data-ref="vanDoorn2023,Leonhard2019" title="Source 266,473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">266,473</a></sup> Further worsening after 8 weeks had a sensitivity of 100% and specificity of 92%; 3 or more fluctuations, 52% and 96%. <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup> A-CIDP cannot be confirmed unless worsening continues at least 8 weeks after onset. <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup> Marked sensory signs and no facial, swallowing or breathing weakness make it possibly more likely. <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>'}
];
const CO_FL_LBL={x:'weeks since weakness began',w8:'8 weeks from onset',tx:'treatment',worse:'worse',better:'better'};

inits.course=()=>{
  /* ---------- the course player ---------- */
  const svg=$('#coSvg'),rg=$('#coT'),read=$('#coRead');
  const serF=S=>{const P=[{d:0,v:0}].concat(S.P);return d=>{if(d>=P[P.length-1].d)return P[P.length-1].v;let i=0;while(d>P[i+1].d)i++;return lerp(P[i].v,P[i+1].v,(d-P[i].d)/(P[i+1].d-P[i].d))}};
  const SF=CO_SER.map(serF);
  function draw(t){
    const N=vb(svg,'720 400','400 640');
    const L=N?{bx:70,by:24,bs:170,dx:150,dy:58,da:'',py:78,fx:150,fw:234,fy:142,fh:24,fly:102,fsy:182,ax:40,aw:344,ay:244,ah:122,aty:232,bx2:40,by2:420,bh:170,bty:406,tky:606,tly:624}
             :{bx:84,by:36,bs:186,dx:84,dy:262,da:'t-mid',py:282,fx:12,fw:144,fy:334,fh:22,fly:298,fsy:368,ax:190,aw:514,ay:34,ah:128,aty:24,bx2:190,by2:214,bh:140,bty:204,tky:370,tly:388};
    const d=coDay(t),p=phaseOf(CO_STEPS,t),P=CO_STEPS[p],X=dd=>L.ax+L.aw*coTOf(dd);
    const YA=v=>L.ay+L.ah-6-(L.ah-22)*v,YB=v=>L.by2+L.bh-L.bh*v/110;
    let s='';
    /* body, day readout, fibre */
    s+=bodyFront(L.bx,L.by,L.bs,{level:coLv(d)*.8,tingle:d<200?.8:.3}).svg;
    const dTxt=d<56?`${CO_UNIT.d} ${Math.round(d)}`:d<365?`${CO_UNIT.m} ${Math.round(d/30.44)}`:`${CO_UNIT.y} ${(d/365).toFixed(1)}`;
    s+=`<text x="${L.dx}" y="${L.dy}" class="t-big ${L.da}" style="font-size:26px">${dTxt}</text><text x="${L.dx}" y="${L.py}" class="t-sm ${L.da}" style="fill:var(--ink)">${P.k}</text>`;
    const demy=ramp(d,1,12),remy=ramp(Math.log(Math.max(d,1)),Math.log(28),Math.log(200));
    const nv=nerveFibre(L.fx,L.fy,L.fw,{n:N?4:3,h:L.fh,demy:[demy*.8,demy,demy*.6,demy*.3],remy:[remy,remy,remy,remy],mac:[0,demy*(1-remy),0,0],pulse:(t*40)%1,block:d>=6&&d<30?1:undefined});
    let fs=CO_FS[0].l;CO_FS.forEach(f=>{if(d>=f.d)fs=f.l});
    s+=`<text x="${L.fx}" y="${L.fly}" class="t-xs" style="fill:var(--ink);font-weight:700">${CO_LBL.fibre}</text>`+nv.svg+kitLabel(L.fx+L.fw/2,L.fsy,fs,{a:'m'});
    /* shared grid */
    const grid=(y,h)=>CO_TICKS.filter(k=>!(N&&k.w)).map(k=>`<line x1="${f1(X(k.d))}" x2="${f1(X(k.d))}" y1="${y}" y2="${y+h}" class="grid"/>`).join('');
    /* panel A: schematic course */
    s+=`<text x="${L.ax}" y="${L.aty}" class="t-xs" style="fill:var(--ink);font-weight:700">${CO_LBL.a}</text><rect x="${L.ax}" y="${L.ay}" width="${L.aw}" height="${L.ah}" style="fill:var(--field)"/>`+grid(L.ay,L.ah);
    s+=`<text x="${L.ax-6}" y="${L.ay+12}" class="t-xs t-end">${CO_LBL.worse}</text><text x="${L.ax-6}" y="${L.ay+L.ah-2}" class="t-xs t-end">${CO_LBL.better}</text>`;
    const pathA=(t1)=>{let q='';const n=Math.max(2,Math.round(220*t1));for(let i=0;i<=n;i++){const tt=t1*i/n,dd=coDay(tt);q+=(i?'L':'M')+f1(X(dd))+' '+f1(YA(coLv(dd)))}return q};
    s+=`<path d="${pathA(1)}" style="fill:none;stroke:var(--weak);stroke-width:1.6;stroke-dasharray:3 4;opacity:.55"/>`;
    const pa=pathA(t);s+=`<path d="${pa}L${f1(X(d))} ${L.ay+L.ah}L${L.ax} ${L.ay+L.ah}Z" style="fill:var(--weak);opacity:.18"/><path d="${pa}" style="fill:none;stroke:var(--weak);stroke-width:3;stroke-linejoin:round"/>`;
    CO_MARK.forEach(m=>{const on=d>=m.d,x=X(m.d),y=YA(coLv(m.d));s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="8" style="fill:${on?'var(--brand)':'var(--panel)'};stroke:var(--brand);stroke-width:1.6"/><text x="${f1(x)}" y="${f1(y+3.5)}" class="t-xs t-mid" style="fill:${on?'var(--on-brand)':'var(--ink)'};font-weight:700">${m.n}</text>`});
    /* panel B: cumulative shares */
    s+=`<text x="${L.bx2}" y="${L.bty}" class="t-xs" style="fill:var(--ink);font-weight:700">${CO_LBL.b}</text><rect x="${L.bx2}" y="${L.by2}" width="${L.aw}" height="${L.bh}" style="fill:var(--field)"/>`+grid(L.by2,L.bh);
    [0,50,100].forEach(v=>{s+=`<line x1="${L.bx2}" x2="${L.bx2+L.aw}" y1="${f1(YB(v))}" y2="${f1(YB(v))}" class="grid"/><text x="${L.bx2-6}" y="${f1(YB(v)+3)}" class="t-xs t-end">${v}%</text>`});
    CO_SER.forEach((S,j)=>{const f=SF[j],end=S.P[S.P.length-1].d;
      const path=(dmax)=>{let q='';const t1=coTOf(Math.min(dmax,end)),n=Math.max(2,Math.round(200*t1));for(let i=0;i<=n;i++){const dd=coDay(t1*i/n);q+=(i?'L':'M')+f1(X(dd))+' '+f1(YB(f(dd)))}return q};
      s+=`<path d="${path(end)}" style="fill:none;stroke:${S.col};stroke-width:1.4;opacity:.3${S.dash?';stroke-dasharray:'+S.dash:''}"/>`;
      if(d>0)s+=`<path d="${path(d)}" style="fill:none;stroke:${S.col};stroke-width:3;stroke-linejoin:round${S.dash?';stroke-dasharray:'+S.dash:''}"/>`;
      S.P.forEach(q=>{const on=d>=q.d;s+=`<circle cx="${f1(X(q.d))}" cy="${f1(YB(q.v))}" r="${on?4.2:3.2}" style="fill:${on?S.col:'var(--panel)'};stroke:${S.col};stroke-width:1.6"/>`});
      const ex=X(end),ev=S.P[S.P.length-1].v,reached=d>=end;
      const lp=S.id==='nad'?[ex+6,YB(ev)+4,'']:S.id==='imp'?[ex+6,YB(ev)+14,'']:[ex-2,YB(ev)-9,'t-end'];
      s+=`<text x="${f1(lp[0])}" y="${f1(lp[1])}" class="t-xs ${lp[2]}" style="fill:var(--ink);font-weight:700;opacity:${reached?1:.6}">${S.lab}</text>`});
    /* now line and axis */
    s+=`<line x1="${f1(X(d))}" x2="${f1(X(d))}" y1="${L.ay-4}" y2="${L.by2+L.bh+4}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:4 3"/>`;
    s+=`<line x1="${L.bx2}" x2="${L.bx2+L.aw}" y1="${L.by2+L.bh}" y2="${L.by2+L.bh}" class="axis"/>`;
    CO_TICKS.filter(k=>!(N&&k.w)).forEach(k=>{const x=X(k.d),last=k.d===CO_END;s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${L.by2+L.bh}" y2="${L.by2+L.bh+4}" class="axis"/><text x="${f1(last?x+2:x)}" y="${L.tky}" class="t-xs ${last?'t-end':'t-mid'}">${k.l}</text>`});
    s+=`<text x="${L.bx2+L.aw}" y="${L.tly}" class="t-xs t-end">${CO_LBL.x}</text>`;
    s+=`<circle cx="${f1(X(d))}" cy="${f1(YA(coLv(d)))}" r="5" style="fill:var(--weak);stroke:var(--panel);stroke-width:2"/>`;
    svg.innerHTML=s;
    setSt(p);$('#coNote').innerHTML=noteHTML(P);
    read.innerHTML=CO_SER.map(S=>{let tx=S.none;S.P.forEach(q=>{if(d>=q.d)tx=q.txt});return `<p><i class="${S.id}" aria-hidden="true"></i><span>${tx}</span></p>`}).join('');
  }
  const stop=playWire(rg,$('#coPlay'),draw,24000,'Replay','course');
  const setSt=stepWire($('#coSteps'),CO_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- the Swedish cohort ---------- */
  const ssv=$('#coSw'),sb=$('#coSwBtns'),snote=$('#coSwNote');let si=0,cur=CO_SW.map(r=>r.v[0]),stopS=null;
  sb.innerHTML=CO_SW_T.map((x,i)=>`<button class="btn" data-w="${i}" aria-pressed="${i===0}">${x}</button>`).join('');
  function drawSw(){
    const N=vb(ssv,'720 330','400 370');
    const L=N?{x0:16,bw:310,y0:40,rh:46,ly:12,by:18}:{x0:290,bw:340,y0:42,rh:40,ly:16,by:5};
    let s=`<text x="16" y="20" class="t-xs" style="fill:var(--ink);font-weight:700">${CO_SW_HEAD}</text>`;
    CO_SW.forEach((r,i)=>{const y=L.y0+i*L.rh,v=cur[i],g=r.v[0];
      s+=`<text x="16" y="${y+L.ly}" class="t-sm" style="fill:var(--ink);font-weight:700">${r.n}</text>`;
      s+=`<rect x="${L.x0}" y="${y+L.by}" width="${L.bw}" height="14" rx="4" style="fill:var(--panel-2)"/><rect x="${L.x0}" y="${y+L.by}" width="${f1(Math.max(3,L.bw*v/100))}" height="14" rx="4" style="fill:var(--rec)"/>`;
      if(si>0)s+=`<rect x="${L.x0}" y="${y+L.by-2}" width="${f1(L.bw*g/100)}" height="18" rx="5" style="fill:none;stroke:var(--ink);stroke-width:1.2;stroke-dasharray:4 3;opacity:.7"/>`;
      s+=`<text x="${L.x0+L.bw+6}" y="${y+L.by+11}" class="t-xs" style="fill:var(--ink);font-weight:700">${Math.round(v)}%</text>`});
    ssv.innerHTML=s;
    const n=CO_SW_NOTE[si];snote.innerHTML=`<div class="kicker">${n.k}</div><h4>${n.t}</h4><p>${n.txt}</p>`;
  }
  sb.addEventListener('click',e=>{const b=e.target.closest('[data-w]');if(!b)return;si=+b.dataset.w;$$('[data-w]',sb).forEach(x=>x.setAttribute('aria-pressed',x===b));
    const from=cur.slice(),to=CO_SW.map(r=>r.v[si]);stopS&&stopS();stopS=animate(700,q=>{const e2=ease(q);cur=from.map((v,i)=>lerp(v,to[i],e2));drawSw()},()=>{stopS=null;cur=to;drawSw()})});
  drawSw();

  /* ---------- fluctuation explorer ---------- */
  const fsv=$('#coFl'),frg=$('#coFlT'),fb=$('#coFlBtns'),fnote=$('#coFlNote');let fi=0;
  const FF=CO_FL.map(c=>monoFn(c.P));
  fb.innerHTML=CO_FL.map((c,i)=>`<button class="btn" data-f="${i}" aria-pressed="${i===0}">${c.n}</button>`).join('');
  function drawFl(t){
    const N=vb(fsv,'720 300','400 320');
    const L=N?{x:40,w:344,y:52,h:200,tk:4,ty:268,xl:286}:{x:56,w:644,y:46,h:194,tk:2,ty:256,xl:274};
    const c=CO_FL[fi],f=FF[fi],wk=16*t,X=w=>L.x+L.w*w/16,Y=v=>L.y+L.h-8-(L.h-30)*v;
    let s=`<text x="${L.x}" y="18" class="t-sm" style="fill:var(--ink);font-weight:700">${c.k}</text>`;
    s+=`<rect x="${L.x}" y="${L.y}" width="${L.w}" height="${L.h}" style="fill:var(--field)"/>`;
    for(let w=0;w<=16;w+=L.tk){s+=`<line x1="${f1(X(w))}" x2="${f1(X(w))}" y1="${L.y+L.h}" y2="${L.y+L.h+4}" class="axis"/><text x="${f1(X(w))}" y="${L.ty}" class="t-xs t-mid">${w}</text>`}
    s+=`<line x1="${L.x}" x2="${L.x+L.w}" y1="${L.y+L.h}" y2="${L.y+L.h}" class="axis"/><text x="${L.x+L.w}" y="${L.xl}" class="t-xs t-end">${CO_FL_LBL.x}</text>`;
    s+=`<text x="${L.x-6}" y="${L.y+12}" class="t-xs t-end">${CO_FL_LBL.worse}</text><text x="${L.x-6}" y="${L.y+L.h-2}" class="t-xs t-end">${CO_FL_LBL.better}</text>`;
    s+=`<rect x="${f1(X(8))}" y="${L.y}" width="${f1(X(16)-X(8))}" height="${L.h}" style="fill:var(--warn-soft);opacity:.6"/><line x1="${f1(X(8))}" x2="${f1(X(8))}" y1="${L.y}" y2="${L.y+L.h}" style="stroke:var(--ink);stroke-width:1.4;stroke-dasharray:5 4"/>`;
    s+=`<text x="${f1(X(8)+5)}" y="${L.y+L.h-12}" class="t-xs" style="fill:var(--ink);font-weight:700">${CO_FL_LBL.w8}</text>`;
    let full='',cur2='';for(let i=0;i<=160;i++){const w=16*i/160,pt=f1(X(w))+' '+f1(Y(f(w)));full+=(i?'L':'M')+pt;if(w<=wk)cur2+=(i?'L':'M')+pt}
    s+=`<path d="${full}" style="fill:none;stroke:var(--weak);stroke-width:1.4;stroke-dasharray:3 4;opacity:.5"/>`;
    if(cur2)s+=`<path d="${cur2}" style="fill:none;stroke:var(--weak);stroke-width:3.2;stroke-linejoin:round"/>`;
    c.tx.forEach(w=>{if(wk<w)return;const x=X(w);s+=`<path d="M${f1(x-6)} ${L.y+2}L${f1(x+6)} ${L.y+2}L${f1(x)} ${L.y+12}Z" style="fill:var(--rx)"/><text x="${f1(x)}" y="${L.y-6}" class="t-xs t-mid" style="fill:var(--ink);font-weight:700">${CO_FL_LBL.tx}</text>`});
    c.pk.forEach((w,i)=>{if(wk<w)return;const x=X(w)+16,y=Y(f(w))+2;s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="8" style="fill:var(--bad-soft);stroke:var(--bad);stroke-width:1.6"/><text x="${f1(x)}" y="${f1(y+3.5)}" class="t-xs t-mid" style="fill:var(--bad);font-weight:700">${i+1}</text>`});
    s+=`<circle cx="${f1(X(wk))}" cy="${f1(Y(f(wk)))}" r="5" style="fill:var(--weak);stroke:var(--panel);stroke-width:2"/>`;
    fsv.innerHTML=s;
    fnote.innerHTML=`<div class="kicker">${c.k}</div><h4>${c.t}</h4><p>${c.txt}</p>`;
  }
  const stopF=playWire(frg,$('#coFlPlay'),drawFl,7000,'Replay','course');
  fb.addEventListener('click',e=>{const b=e.target.closest('[data-f]');if(!b)return;fi=+b.dataset.f;$$('[data-f]',fb).forEach(x=>x.setAttribute('aria-pressed',x===b));
    stopF();frg.value=0;drawFl(0);$('#coFlPlay').click()});
  drawFl(+frg.value);
  const prev=redraws.course;redraws.course=()=>{prev&&prev();drawSw()};
  const prevH=onHide.course;onHide.course=()=>{prevH&&prevH();stopS&&stopS();stopS=null;cur=CO_SW.map(r=>r.v[si])};
};
/* =============== 2.1 Signs & red flags =============== */
/* Three pieces: the main player (the classic picture unfolding on a body, a knee-jerk panel and IGOS entry bars,
   ending on red flags), a regional feature explorer (IGOS), and a red-flag sorter with a body map.
   Every number comes from research pass D; the body drawing is schematic. */
const SG_STEPS=[
 {from:0,at:.06,k:'Step 1 · before the weakness',sv:'Tingling and pain come first',sub:'often in the feet and hands, sometimes the back',
  t:'Tingling and pain often come first',
  txt:`Classic GBS begins with tingling (paraesthesias) or numbness in the feet and hands, with weakness at the same time or soon after <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>. In 156 people followed prospectively, 36% had pain in the 2 weeks before any weakness <sup class="c" data-ref="Ruts2010Pain" title="Source 392"><a href="/guillain-barre-syndrome/sources/#src-Ruts2010Pain">392</a></sup>. Severe diffuse pain, or an isolated cranial nerve problem, can come before the weakness <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`,
  pt:`It often starts with pins and needles in the toes and fingers. Many people also ache in the back or legs, sometimes before they feel weak.`,
  hook:`Pain precedes weakness in about one-third (36%) <sup class="c" data-ref="Ruts2010Pain" title="Source 392"><a href="/guillain-barre-syndrome/sources/#src-Ruts2010Pain">392</a></sup>.`},
 {from:.16,at:.24,k:'Step 2 · legs',sv:'Weakness starts in the legs',sub:'both sides, getting worse over days',
  t:'Weakness starts in both legs',
  txt:`Weakness usually starts in the legs and spreads to the arms and the muscles supplied by the cranial nerves <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>. All 494 adults in a Dutch cohort had weakness on both sides; it stayed in the legs in 6% and in the arms in 1% <sup class="c" data-ref="Fokke2014" title="Source 131"><a href="/guillain-barre-syndrome/sources/#src-Fokke2014">131</a></sup>. It is always bilateral but can be uneven, mainly proximal or mainly distal, and can start in the arms or in all four limbs at once <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`,
  pt:`The legs usually get weak first, on both sides. Stairs, getting up from a chair and walking get harder over a few days.`,
  hook:`Required: progressive weakness of arms and legs, which may start in the legs <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>.`},
 {from:.32,at:.4,k:'Step 3 · reflexes',sv:'Reflexes fade',sub:'knee and ankle jerks shrink, then vanish',
  t:'Tendon reflexes shrink or disappear',
  txt:`Reflexes in weak limbs were reduced at first assessment in 91% of the Dutch adults and in all of them later <sup class="c" data-ref="Fokke2014" title="Source 131"><a href="/guillain-barre-syndrome/sources/#src-Fokke2014">131</a></sup>. At entry to the International GBS Outcome Study (IGOS), the legs were areflexic in 77%, hyporeflexic in 20%, normal in 2% and brisk in 2% <sup class="c" data-ref="Doets2018" title="Source 102"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102</a></sup>. About 1 in 10 keep normal or brisk reflexes, most often with pure motor weakness and the axonal subtype AMAN <sup class="c" data-ref="Yuki2012JNeurol" title="Source 534"><a href="/guillain-barre-syndrome/sources/#src-Yuki2012JNeurol">534</a></sup>.`,
  pt:`A doctor taps just below the knee with a small hammer. In GBS the leg usually barely moves, or does not move at all. A few people keep normal reflexes.`,
  hook:`Preserved or brisk reflexes in about 10%, particularly pure motor AMAN <sup class="c" data-ref="Yuki2012JNeurol" title="Source 534"><a href="/guillain-barre-syndrome/sources/#src-Yuki2012JNeurol">534</a></sup>.`},
 {from:.48,at:.56,k:'Step 4 · arms and face',sv:'It climbs to the arms and face',sub:'hands, face, swallowing, eye movements',
  t:'Arms, face and swallowing',
  txt:`In IGOS, 50% had cranial nerve involvement at entry: 46% in Europe and the Americas, 64% in Asia and 67% in Bangladesh <sup class="c" data-ref="Doets2018" title="Source 102"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102</a></sup>. Cranial nerve involvement, especially weakness of both sides of the face, is a strongly supportive feature <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>. Sensory deficits were present at entry in 59% <sup class="c" data-ref="Doets2018" title="Source 102"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102</a></sup>.`,
  pt:`Weakness can reach the hands, the face and the muscles used to swallow and speak. Some people cannot close their eyes fully or smile evenly.`,
  hook:`Bilateral facial palsy is strongly supportive in the NINDS criteria as adapted <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`},
 {from:.64,at:.71,k:'Step 5 · autonomic and breathing',sv:'Blood pressure, heart and breathing',sub:'the dangerous part, watched closely',
  t:'Autonomic nerves and breathing muscles',
  txt:`Dysautonomia can bring swings in blood pressure or heart rate, pupil changes and bowel or bladder problems <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>. It was present at IGOS entry in 25% <sup class="c" data-ref="Doets2018" title="Source 102"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102</a></sup>, and figures range up to two-thirds depending on definition and setting <sup class="c" data-ref="Chakraborty2020,Zaeem2019" title="Source 71,535"><a href="/guillain-barre-syndrome/sources/#src-Chakraborty2020">71,535</a></sup>. About 20% develop respiratory failure, and it can occur without breathlessness <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`,
  pt:`GBS can affect the nerves that control blood pressure, heart rate, bowels and bladder, and the muscles used for breathing. That is why people are watched closely in hospital.`,
  hook:`Respiratory failure can develop without dyspnoea, so breathing is measured, not only asked about <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`},
 {from:.8,at:.9,k:'Step 6 · red flags',sv:'Red flags point elsewhere',sub:'findings that cast doubt on GBS',
  t:'Red flags: findings that cast doubt',
  txt:`A consensus list of features that cast doubt on GBS includes a sharp sensory level, bladder or bowel dysfunction at onset or persisting, fever at onset, hyperreflexia or clonus, extensor plantar responses, marked persistent asymmetry, a worst point within 24 hours, and CSF cells above 50×10⁶/l <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>. They prompt a search for another cause; they do not exclude GBS on their own <sup class="c" data-ref="AlHakem2023,vanDoorn2023" title="Source 10,473"><a href="/guillain-barre-syndrome/sources/#src-AlHakem2023">10,473</a></sup>.`,
  pt:`Some findings make doctors think of other illnesses, such as a spinal cord problem. A clear line on the body below which feeling is lost is one of them.`,
  hook:`A nadir under 24 h, or progression beyond 4 weeks, makes GBS doubtful <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`}
];
/* IGOS entry frequencies shown as bars in the main player; each appears with its step */
const SG_BARS=[
 {l:'sensory deficits',v:59,from:0},
 {l:'pain',v:55,from:0},
 {l:'leg reflexes absent',v:77,from:.32},
 {l:'cranial nerve involvement',v:50,from:.48},
 {l:'autonomic dysfunction',v:25,from:.64}];
const SG_FLAGLIST=['sharp sensory level on the trunk','bladder or bowel trouble at onset','fever at onset','upgoing toes, clonus, brisk reflexes','marked, persistent asymmetry','worst point within 24 hours'];
const SG_TXT={bars:'At IGOS entry, % of people',reflex:'Knee jerk (schematic)',flags:'Findings that cast doubt',tap:'tap',resp:'response',
  rw:['absent','reduced','normal'],tingle:'tingling',back:'aching back',legs:'weak legs',arms:'weak arms',face:'face',bp:'blood pressure',breath:'breathing'};
/* the weakness level along the schematic course (0 feet .. 1 head) and the reflex size (1 normal .. 0 absent) */
function sgLevel(t){if(t<.16)return 0;if(t<.3)return .36*ease(ramp(t,.16,.3));if(t<.48)return .36+.06*ramp(t,.3,.48);if(t<.62)return lerp(.42,.84,ease(ramp(t,.48,.62)));return .84}
function sgRefl(t){return 1-.88*ease(ramp(t,.3,.44))}

/* the regional explorer: IGOS, % at entry and at the worst point (nadir); null = not reported in the source */
const SG_FX_ROWS=[
 {l:'Sensory deficits',sl:'Sensory deficits',entry:{all:59,ea:65,as:54,bd:28},nadir:{all:null,ea:69,as:59,bd:29}},
 {l:'Pain',sl:'Pain',entry:{all:55,ea:58,as:12,bd:62},nadir:{all:null,ea:57,as:17,bd:63}},
 {l:'Cranial nerve involvement',sl:'Cranial nerves',entry:{all:50,ea:46,as:64,bd:67},nadir:{all:null,ea:49,as:68,bd:68}},
 {l:'Autonomic dysfunction',sl:'Autonomic',entry:{all:25,ea:27,as:10,bd:22},nadir:{all:null,ea:29,as:17,bd:28}},
 {l:'Cannot walk unaided',sl:'Cannot walk unaided',entry:{all:null,ea:null,as:null,bd:null},nadir:{all:79,ea:76,as:76,bd:93}}];
const SG_FX_CAP={
 entry:{all:'All IGOS participants at study entry (about 890 to 924 with data, depending on the feature) <sup class="c" data-ref="Doets2018" title="Source 102"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102</a></sup>.',
  ea:'Europe and the Americas, at study entry <sup class="c" data-ref="Doets2018" title="Source 102"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102</a></sup>.',as:'Asia (excluding Bangladesh), at study entry. Pain was far less often recorded here <sup class="c" data-ref="Doets2018" title="Source 102"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102</a></sup>.',
  bd:'Bangladesh, at study entry. Pure motor GBS was the commonest variant here, and sensory deficits were least common <sup class="c" data-ref="Doets2018" title="Source 102"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102</a></sup>.'},
 nadir:{all:'At the worst point the paper gives regional figures only. The overall 79% unable to walk (643 of 815) is summed here from the table rows; IGOS is not population-based <sup class="c" data-ref="Doets2018" title="Source 102"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102</a></sup>.',
  ea:'Europe and the Americas, at the worst point: 478 of 626 could not walk unaided <sup class="c" data-ref="Doets2018" title="Source 102"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102</a></sup>.',as:'Asia, at the worst point: 50 of 66 could not walk unaided <sup class="c" data-ref="Doets2018" title="Source 102"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102</a></sup>.',
  bd:'Bangladesh, at the worst point: 100 of 107 (93%) could not walk unaided <sup class="c" data-ref="Doets2018" title="Source 102"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102</a></sup>.'},
 nr:'not reported'};

/* the red-flag sorter: v = 'yes' (fits GBS), 'maybe' (possible, less typical), 'no' (red flag) */
const SG_VERD={yes:['Fits GBS','yes'],maybe:['Possible in GBS, less typical','maybe'],no:['Red flag: look for another cause','no']};
const SG_VSHORT={yes:'fits GBS',maybe:'possible',no:'red flag'};
const SG_FLAGS=[
 {b:'Tingling in the feet and hands first',v:'yes',at:'ends',txt:`Classic GBS begins with distal paraesthesias or sensory loss, with weakness at the same time or after <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`},
 {b:'Back or leg pain before the weakness',v:'yes',at:'back',txt:`36% of 156 people had pain in the 2 weeks before weakness <sup class="c" data-ref="Ruts2010Pain" title="Source 392"><a href="/guillain-barre-syndrome/sources/#src-Ruts2010Pain">392</a></sup>. Severe diffuse pain can precede the weakness <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`},
 {b:'Both legs weak, one a little more',v:'yes',at:'legs',txt:`Weakness is always bilateral but can be asymmetrical <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>. What casts doubt is marked, persistent asymmetry <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`},
 {b:'Marked, persistent asymmetry',v:'no',at:'leg1',txt:`Listed among features that cast doubt on the diagnosis <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>. Asymmetric flaccid weakness, especially with fever, suggests an anterior horn cell infection such as West Nile virus <sup class="c" data-ref="Sejvar2005" title="Source 403"><a href="/guillain-barre-syndrome/sources/#src-Sejvar2005">403</a></sup>.`},
 {b:'Normal or brisk knee jerks',v:'maybe',at:'knees',txt:`Reflexes can stay present or brisk in up to 10% <sup class="c" data-ref="Wakerley2015,Yuki2012JNeurol" title="Source 492,534"><a href="/guillain-barre-syndrome/sources/#src-Wakerley2015">492,534</a></sup>. The guideline says initial hyperreflexia does not exclude GBS but makes it less likely <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>; hyperreflexia or clonus is on the consensus list of doubts <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`},
 {b:'Both sides of the face weak',v:'yes',at:'face',txt:`Cranial nerve involvement, especially bilateral facial palsy, is strongly supportive in the NINDS criteria as adapted <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`},
 {b:'A sharp sensory level on the trunk',v:'no',at:'level',txt:`A sharp sensory level casts doubt on GBS <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>. With extensor plantars, hyperreflexia and a cord lesion on MRI it points to transverse myelitis or another cord cause <sup class="c" data-ref="TMCWG2002,vanDoorn2023" title="Source 452,473"><a href="/guillain-barre-syndrome/sources/#src-TMCWG2002">452,473</a></sup>.`},
 {b:'Bladder or bowel trouble at the start',v:'no',at:'pelvis',txt:`Bladder or bowel dysfunction at onset, or persisting, casts doubt <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>. The guideline adds that bladder or bowel dysfunction does not exclude GBS <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>.`},
 {b:'Fever when the weakness begins',v:'no',at:'head',txt:`Fever at onset casts doubt on GBS <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>. Fever was present in 91% of people with West Nile virus paralysis <sup class="c" data-ref="Sejvar2005" title="Source 403"><a href="/guillain-barre-syndrome/sources/#src-Sejvar2005">403</a></sup>.`},
 {b:'Severe breathing trouble, little limb weakness',v:'no',at:'chest',txt:`Severe respiratory dysfunction with limited limb weakness at onset casts doubt <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>; it points away from GBS and towards conditions such as myasthenic crisis <sup class="c" data-ref="vanDoorn2023,Wendell2011" title="Source 473,505"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473,505</a></sup>.`},
 {b:'Worst point within 24 hours',v:'no',at:'t24',txt:`Maximum disability within 24 hours of onset should prompt consideration of other diagnoses <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>. Brighton levels 1 to 3 require 12 hours to 28 days from onset to nadir <sup class="c" data-ref="LopezHernandez2022,Ghazanfar2020" title="Source 158,277"><a href="/guillain-barre-syndrome/sources/#src-LopezHernandez2022">158,277</a></sup>.`},
 {b:'Still getting worse after 4 weeks',v:'no',at:'t4w',txt:`Continued progression for more than 4 weeks casts doubt <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>, and continued worsening beyond 4 weeks prompts consideration of acute-onset CIDP <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>.`},
 {b:'Over 50 white cells in the spinal fluid',v:'no',at:'lp',txt:`CSF cells above 50×10⁶/l cast doubt <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>. Even so, mild pleocytosis and rare counts of 50 or more are compatible with GBS after a thorough search for other causes <sup class="c" data-ref="AlHakem2023" title="Source 10"><a href="/guillain-barre-syndrome/sources/#src-AlHakem2023">10</a></sup>.`},
 {b:'Upgoing toes (extensor plantars)',v:'no',at:'feet',txt:`Extensor plantar responses cast doubt on GBS <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup> and are a discriminator for transverse myelitis <sup class="c" data-ref="TMCWG2002" title="Source 452"><a href="/guillain-barre-syndrome/sources/#src-TMCWG2002">452</a></sup>.`},
 {b:'Confusion or drowsiness',v:'no',at:'head',txt:`Altered consciousness casts doubt, except in Bickerstaff brainstem encephalitis <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`},
 {b:'Abdominal pain',v:'no',at:'belly',txt:`Abdominal pain is on the consensus list of doubts <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>. With psychological features and neuropathy, it is a clue to acute porphyria <sup class="c" data-ref="Albers2004" title="Source 7"><a href="/guillain-barre-syndrome/sources/#src-Albers2004">7</a></sup>.`},
 {b:'Low sodium on a blood test',v:'maybe',at:'arm',txt:`Abnormal routine blood tests make GBS less likely, though hyponatraemia may occur in GBS <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>.`},
 {b:'Nystagmus or vomiting',v:'maybe',at:'eyes',txt:`The guideline lists nystagmus and vomiting among findings that make GBS less likely <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>.`},
 {b:'No infection in the weeks before',v:'yes',at:'none',txt:`About one-third report none of the queried antecedent events, so their absence does not exclude GBS <sup class="c" data-ref="Leonhard2019,vanDoorn2023" title="Source 266,473"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266,473</a></sup>.`},
 {b:'A young child who refuses to walk',v:'yes',at:'legs',txt:`Children under 6 can present with poorly localised pain, refusal to bear weight, irritability, meningism or unsteady gait <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`}];

inits.signs=()=>{
  const T=(x,y,s,c='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${s}</text>`;
  const INK='fill:var(--ink);font-weight:700';
  /* ---------- main player ---------- */
  const svg=$('#sgSvg'),rg=$('#sgT'),note=$('#sgNote');let setSt=()=>{};
  function reflexPanel(x,y,w,h,r,t,on){
    let s=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="10" style="fill:var(--field);stroke:var(--line)"/>`;
    const word=SG_TXT.rw[r>.7?2:r>.28?1:0];
    s+=T(x+10,y+16,SG_TXT.reflex,'t-xs',INK)+T(x+w-10,y+16,word,'t-sm t-end',`fill:${r>.7?'var(--ink)':'var(--dx)'};font-weight:700`);
    /* a bent leg: thigh, knee, shin that kicks when struck */
    const u=on?(t*9)%1:.6,kick=r*24*bump(u,.22,.55),kx=x+58,ky=y+h*.5;
    s+=`<path d="M${f1(x+14)} ${f1(ky-12)}L${f1(kx)} ${f1(ky)}" style="stroke:var(--skin);stroke-width:13;stroke-linecap:round"/>`;
    const a=(12+kick)*Math.PI/180,sx=kx+Math.sin(a)*-6,sy=ky+Math.cos(a)*36;
    s+=`<path d="M${f1(kx)} ${f1(ky)}L${f1(kx-Math.sin(a)*-38)} ${f1(ky+Math.cos(a)*38)}" style="stroke:var(--skin);stroke-width:11;stroke-linecap:round"/>`;
    s+=`<path d="M${f1(x+14)} ${f1(ky-12)}L${f1(kx)} ${f1(ky)}L${f1(kx-Math.sin(a)*-38)} ${f1(ky+Math.cos(a)*38)}" style="fill:none;stroke:var(--ink);stroke-width:1;opacity:.5"/>`;
    /* the hammer swings onto the tendon below the knee */
    const sw=u<.22?lerp(-40,0,ease(u/.22)):lerp(0,-40,ease(ramp(u,.22,.6))),ha=sw*Math.PI/180,hx=kx+12,hy=ky+10,px=hx+Math.cos(ha)*30,py=hy-Math.sin(ha)*30-2;
    s+=`<line x1="${f1(px)}" y1="${f1(py)}" x2="${f1(px+Math.cos(ha+Math.PI/2)*-2+22)}" y2="${f1(py-18)}" style="stroke:var(--device);stroke-width:2.4;stroke-linecap:round"/><rect x="${f1(px-9)}" y="${f1(py-4)}" width="18" height="8" rx="3" style="fill:var(--device)"/>`;
    /* the response trace */
    const tx0=x+112,tx1=x+w-12,by=y+h-18,amp=(h-44)*r;let d='';
    const prog=on?clamp((u-.2)/.5):1;
    for(let i=0;i<=80;i++){const v=i/80;if(v>prog)break;const g=Math.exp(-Math.pow((v-.45)/.07,2)),gn=Math.exp(-Math.pow((v-.6)/.06,2));d+=(i?'L':'M')+f1(lerp(tx0,tx1,v))+' '+f1(by-amp*g+amp*.25*gn)}
    s+=`<line x1="${f1(tx0)}" x2="${f1(tx1)}" y1="${f1(by)}" y2="${f1(by)}" class="grid"/>`;
    if(d)s+=`<path d="${d}" style="fill:none;stroke:var(--dx);stroke-width:2.2;stroke-linejoin:round"/>`;
    s+=T(tx0,by+12,SG_TXT.tap)+T(tx1,by+12,SG_TXT.resp,'t-xs t-end');
    return s}
  function draw(t){const N=vb(svg,'720 400','400 664'),p=phaseOf(SG_STEPS,t),P=SG_STEPS[p];
    const L=N?{tx:12,ty:22,bx:200,by:58,bs:250,lr:262,ll:140,px:14,pw:372,ry:330,rh:104,gy:462,gr:34}
             :{tx:16,ty:24,bx:150,by:66,bs:300,lr:226,ll:76,px:330,pw:374,ry:58,rh:108,gy:194,gr:34};
    const lv=sgLevel(t),r=sgRefl(t),k=L.bs/146,Pt=(a,b)=>[L.bx+a*k,L.by+(b+50)*k];
    const tg=ramp(t,.02,.08),pain=ramp(t,.03,.1)*(1-ramp(t,.6,.7)*.6),face=ramp(t,.54,.62),flags=ramp(t,.8,.85);
    let s=T(L.tx,L.ty,P.sv,'t-big',`fill:${p===5?'var(--bad)':'var(--ink)'}`)+T(L.tx,L.ty+16,P.sub,'t-sm');
    const B=bodyFront(L.bx,L.by,L.bs,{level:lv,tingle:tg,pain,zones:{face:face*.8}});
    s+=B.svg;
    /* labels around the body (short, so they never reach the panels) */
    const lab=(x,y,txt,a)=>kitLabel(x,y,txt,a?{a}:{});
    if(tg>.3&&p<5){const h=B.at.hand,f=B.at.foot;s+=lab(L.lr,h[1]+4,SG_TXT.tingle)+`<path d="M${f1(h[0]+8)} ${f1(h[1])}H${f1(L.lr-4)}" class="arrow" style="stroke-width:1"/>`;
      s+=lab(L.lr,f[1]-4,SG_TXT.tingle)+`<path d="M${f1(f[0]+30*k)} ${f1(f[1]-8)}H${f1(L.lr-4)}" class="arrow" style="stroke-width:1"/>`}
    if(pain>.3&&p<5){const b=B.at.back;s+=lab(L.ll,b[1]+4,SG_TXT.back,'e')}
    if(p>=1&&p<5){const lg=Pt(-12,62);s+=lab(L.ll,lg[1],SG_TXT.legs,'e')}
    if(p>=3&&p<5){const ar=Pt(-30,4);s+=lab(L.ll,ar[1],SG_TXT.arms,'e');const fc=Pt(0,-40);s+=lab(L.lr,fc[1]+2,SG_TXT.face)+`<path d="M${f1(fc[0]+14*k)} ${f1(fc[1]-2)}H${f1(L.lr-4)}" class="arrow" style="stroke-width:1"/>`}
    if(p===4){const c=Pt(6,-14),beat=1+.18*Math.max(0,Math.sin(t*120));
      s+=`<path d="M${f1(c[0])} ${f1(c[1]+7*beat)}C${f1(c[0]-11*beat)} ${f1(c[1]-1)} ${f1(c[0]-6*beat)} ${f1(c[1]-9*beat)} ${f1(c[0])} ${f1(c[1]-3)}C${f1(c[0]+6*beat)} ${f1(c[1]-9*beat)} ${f1(c[0]+11*beat)} ${f1(c[1]-1)} ${f1(c[0])} ${f1(c[1]+7*beat)}Z" style="fill:var(--heart);stroke:var(--ink);stroke-width:1"/>`;
      s+=lab(L.lr,c[1]-6,SG_TXT.bp)+lab(L.lr,c[1]+10,SG_TXT.breath)+`<path d="M${f1(c[0]+12)} ${f1(c[1])}H${f1(L.lr-4)}" class="arrow" style="stroke-width:1"/>`}
    /* red flags: numbered marks on the body */
    if(flags>0){const mk=(x,y,n)=>`<circle cx="${f1(x)}" cy="${f1(y)}" r="9" style="fill:var(--panel);stroke:var(--bad);stroke-width:2"/>`+T(x,y+3.5,n,'t-xs t-mid','fill:var(--bad);font-weight:700');
      const lvY=Pt(0,2)[1];let g=`<g style="opacity:${f1(flags)}"><line x1="${f1(L.bx-26*k)}" x2="${f1(L.bx+26*k)}" y1="${f1(lvY)}" y2="${f1(lvY)}" style="stroke:var(--bad);stroke-width:2.2;stroke-dasharray:5 3"/>`;
      const p1=Pt(-26,2),p2=Pt(0,32),p3=Pt(0,-56),p4=Pt(9,99),p5=Pt(-9,62);
      g+=mk(p1[0]-12,p1[1],'1')+mk(p2[0],p2[1],'2')+mk(p3[0]+18,p3[1]+4,'3')+mk(p4[0]+16,p4[1]-4,'4')+mk(p5[0],p5[1],'5')+'</g>';s+=g}
    /* reflex panel */
    s+=reflexPanel(L.px,L.ry,L.pw,L.rh,r,t,p>=2&&p<5);
    /* bars or the red-flag list */
    const bo=1-flags;
    if(bo>0){let g=`<g style="opacity:${f1(bo)}">`+T(L.px,L.gy,SG_TXT.bars,'t-xs',INK);
      SG_BARS.forEach((b,i)=>{const a=ramp(t,b.from,b.from+.05);if(a<=0)return;const yy=L.gy+14+i*L.gr,w=L.pw*b.v/100*ease(a);
        g+=`<g style="opacity:${f1(Math.min(1,a*2))}">`+T(L.px,yy+9,b.l,'t-sm','fill:var(--ink)')+T(L.px+L.pw,yy+9,b.v+'%','t-sm t-end','fill:var(--ink);font-weight:700');
        g+=`<rect x="${f1(L.px)}" y="${f1(yy+14)}" width="${f1(L.pw)}" height="9" rx="4.5" style="fill:var(--panel-2)"/><rect x="${f1(L.px)}" y="${f1(yy+14)}" width="${f1(w)}" height="9" rx="4.5" style="fill:var(--dx)"/></g>`});
      s+=g+'</g>'}
    if(flags>0){let g=`<g style="opacity:${f1(flags)}">`+T(L.px,L.gy,SG_TXT.flags,'t-xs','fill:var(--bad);font-weight:700');
      SG_FLAGLIST.forEach((f,i)=>{const yy=L.gy+22+i*26,a=clamp(ramp(t,.82,.9)*6-i);
        g+=`<g style="opacity:${f1(a)}"><circle cx="${f1(L.px+9)}" cy="${f1(yy)}" r="9" style="fill:var(--panel);stroke:var(--bad);stroke-width:2"/>`+T(L.px+9,yy+3.5,i<5?String(i+1):'⏱','t-xs t-mid','fill:var(--bad);font-weight:700')+T(L.px+26,yy+4,f,'t-sm','fill:var(--ink)')+'</g>'});
      s+=g+'</g>'}
    svg.innerHTML=s;setSt(p);note.innerHTML=noteHTML(P)}
  const stop=playWire(rg,$('#sgPlay'),draw,16000,'Replay','signs');
  setSt=stepWire($('#sgSteps'),SG_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- regional explorer ---------- */
  const fx=$('#sgFx'),fcap=$('#sgFxCap');let reg='all',when='entry',shown=SG_FX_ROWS.map(()=>0),stopFx=null;
  function target(){return SG_FX_ROWS.map(r=>r[when][reg])}
  function drawFx(vals){const N=vb(fx,'720 260','400 330'),tg=target();
    const L=N?{lx:14,bx:14,bw:318,vx:386,y0:20,rh:62,lab:0}:{lx:16,bx:250,bw:400,vx:704,y0:28,rh:46,lab:1};
    let s='';
    SG_FX_ROWS.forEach((r,i)=>{const y=L.y0+i*L.rh,v=vals[i],nr=tg[i]==null,bh=14;
      const by=L.lab?y-4:y+12;
      s+=T(L.lx,L.lab?y+7:y+6,N?r.sl:r.l,'t-sm','fill:var(--ink)');
      s+=`<rect x="${f1(L.bx)}" y="${f1(by)}" width="${f1(L.bw)}" height="${bh}" rx="7" style="fill:var(--panel-2)"/>`;
      if(nr){s+=T(L.bx+10,by+11,SG_FX_CAP.nr,'t-xs','font-style:italic')}
      else{s+=`<rect x="${f1(L.bx)}" y="${f1(by)}" width="${f1(Math.max(0,L.bw*v/100))}" height="${bh}" rx="7" style="fill:var(--dx)"/>`;
        s+=T(L.vx,by+11,Math.round(v)+'%','t-lbl t-end')}
      for(let g=25;g<100;g+=25)s+=`<line x1="${f1(L.bx+L.bw*g/100)}" x2="${f1(L.bx+L.bw*g/100)}" y1="${f1(by)}" y2="${f1(by+bh)}" style="stroke:var(--panel);stroke-width:1.5;opacity:.7"/>`});
    const ay=L.y0+SG_FX_ROWS.length*L.rh+(L.lab?2:8);
    [0,50,100].forEach(g=>{s+=T(L.bx+L.bw*g/100,ay,g+'%','t-xs '+(g===0?'':g===100?'t-end':'t-mid'))});
    fx.innerHTML=s}
  function updFx(){const tg=target(),from=shown.slice();if(stopFx)stopFx();
    stopFx=animate(450,u=>{shown=from.map((v,i)=>tg[i]==null?0:lerp(v,tg[i],ease(u)));drawFx(shown)},()=>{stopFx=null});
    fcap.innerHTML=SG_FX_CAP[when][reg];
    $$('[data-sgr]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.sgr===reg));
    $$('[data-sgw]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.sgw===when))}
  $$('[data-sgr]').forEach(b=>b.addEventListener('click',()=>{reg=b.dataset.sgr;updFx()}));
  $$('[data-sgw]').forEach(b=>b.addEventListener('click',()=>{when=b.dataset.sgw;updFx()}));
  shown=target().map(v=>v==null?0:v);drawFx(shown);fcap.innerHTML=SG_FX_CAP[when][reg];

  /* ---------- red-flag sorter ---------- */
  const map=$('#sgMap'),fl=$('#sgFlags'),fn=$('#sgFlagNote');let sel=6;
  fl.innerHTML=SG_FLAGS.map((f,i)=>`<button class="btn" data-sgf="${i}" aria-pressed="false">${f.b}</button>`).join('');
  function drawMap(){vb(map,'400 380','400 380');const F=SG_FLAGS[sel],bx=200,by=14,bs=262,k=bs/146,Pt=(a,b)=>[bx+a*k,by+(b+50)*k];
    const col={yes:'var(--good)',maybe:'var(--warn)',no:'var(--bad)'}[F.v];
    let s=bodyFront(bx,by,bs,{level:0,pain:F.at==='back'?1:0,tingle:F.at==='ends'?1:0}).svg;
    const ring=(x,y)=>`<circle cx="${f1(x)}" cy="${f1(y)}" r="12" style="fill:none;stroke:${col};stroke-width:2.6"/>`;
    const pts={ends:[ [-30,28],[30,28],[-9,94],[9,94]],back:[ [0,14]],legs:[ [-9,60],[9,60]],leg1:[ [-9,60]],knees:[ [-9,54],[9,54]],face:[ [-7,-37],[7,-37]],
      pelvis:[ [0,34]],head:[ [0,-46]],chest:[ [0,-12]],feet:[ [-9,94],[9,94]],belly:[ [0,10]],arm:[ [-27,6]],eyes:[ [-4,-41],[4,-41]],lp:[ [0,24]]};
    let lx=null,ly=null;
    if(F.at==='level'){const y=Pt(0,2)[1];s+=`<line x1="${f1(bx-30*k)}" x2="${f1(bx+30*k)}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:${col};stroke-width:2.6;stroke-dasharray:6 4"/>`;lx=bx+32*k;ly=y+4}
    else if(pts[F.at]){pts[F.at].forEach(([a,b])=>{const q=Pt(a,b);s+=ring(q[0],q[1])});const q=Pt(...pts[F.at][pts[F.at].length-1]);lx=q[0]+16;ly=q[1]+4}
    if(F.at==='lp'){const q=Pt(0,24);s+=`<path d="M${f1(q[0]+60)} ${f1(q[1]-20)}L${f1(q[0]+12)} ${f1(q[1])}" style="stroke:var(--device);stroke-width:2.4;stroke-linecap:round"/>`}
    /* the time strip: onset to 6 weeks, with the usual window to the worst point */
    const tx=40,tw=320,ty=342,X=d=>tx+tw*d/42;
    s+=`<rect x="${f1(X(1))}" y="${ty-9}" width="${f1(X(28)-X(1))}" height="18" rx="4" style="fill:var(--dx-soft)"/>`;
    s+=tline(tx,ty,tw,{min:0,max:42,step:7,fmt:v=>v?v/7+' wk':'onset'}).svg;
    s+=T(X(14.5),ty-13,'worst point usually here','t-xs t-mid','fill:var(--dx);font-weight:700');
    if(F.at==='t24'){s+=ring(X(.5),ty);lx=X(.5)+16;ly=ty-14}
    if(F.at==='t4w'){s+=`<path d="M${f1(X(28))} ${ty}H${f1(X(36))}" style="stroke:${col};stroke-width:3;stroke-linecap:round"/>`+ring(X(36),ty);lx=X(36)-8;ly=ty-16}
    if(lx!=null){const w=SG_VSHORT[F.v].length*6+10,ex=Math.min(lx,392-w);s+=kitLabel(ex,ly,SG_VSHORT[F.v])}
    if(F.at==='none')s+=kitLabel(bx,by+bs+4,'no body site: from the history',{a:'m'});
    map.innerHTML=s;
    const V=SG_VERD[F.v];fn.innerHTML=`<div class="kicker">Finding ${sel+1} of ${SG_FLAGS.length}</div><h4>${F.b}</h4><p class="verdict ${V[1]}">${V[0]}</p><p>${F.txt}</p>`;
    $$('[data-sgf]',fl).forEach(b=>b.setAttribute('aria-pressed',+b.dataset.sgf===sel))}
  fl.addEventListener('click',e=>{const b=e.target.closest('[data-sgf]');if(!b)return;sel=+b.dataset.sgf;drawMap()});
  drawMap();
  const prev=redraws.signs;redraws.signs=()=>{prev&&prev();drawFx(shown);drawMap()};
};
/* =============== 2.2 Diagnostic criteria =============== */
/* The main player ticks a schematic case file and climbs the Brighton ladder (level 4 up to level 1), then shows
   when the tests were done (Mexican cohort medians) and how a Dutch cohort spread across the levels.
   The calculator applies the grid as reproduced by LopezHernandez2022 and Ghazanfar2020 (the original, Sejvar 2011,
   could not be read by the research pass), and highlights the level in six cohorts. */
const CR_STEPS=[
 {from:0,at:.06,k:'Step 1 · why',sv:'Why case definitions exist',sub:'a shared yardstick for research and safety studies',
  t:'Why case definitions exist',
  txt:`The Brighton Collaboration published case definitions for GBS and Fisher syndrome for collecting and analysing immunisation safety data <sup class="c" data-ref="Sejvar2011Brighton" title="Source 405"><a href="/guillain-barre-syndrome/sources/#src-Sejvar2011Brighton">405</a></sup>. The NINDS criteria and Brighton were both designed to study epidemiological links between GBS and vaccination; a consensus panel judged NINDS better suited to clinicians and Brighton useful for grading certainty <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>. The original Brighton paper could not be read for this guide, so the grid follows two published reproductions <sup class="c" data-ref="LopezHernandez2022,Ghazanfar2020" title="Source 158,277"><a href="/guillain-barre-syndrome/sources/#src-LopezHernandez2022">158,277</a></sup>.`,
  pt:`Doctors and researchers use checklists so that "GBS" means the same thing in different hospitals and studies.`,
  hook:`NINDS suits clinicians; Brighton grades certainty <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`},
 {from:.16,at:.33,k:'Step 2 · clinical core',sv:'The clinical core: level 3',sub:'four items from the bedside alone',
  t:'The clinical core reaches level 3',
  txt:`Level 4 needs only that no alternative diagnosis has been found, with any other item present or absent. Levels 1, 2 and 3 all require bilateral flaccid limb weakness, reduced or absent reflexes in the weak limbs, a single phase with 12 hours to 28 days from onset to the worst point, and no alternative diagnosis. Level 3 needs these clinical features only <sup class="c" data-ref="LopezHernandez2022,Ghazanfar2020" title="Source 158,277"><a href="/guillain-barre-syndrome/sources/#src-LopezHernandez2022">158,277</a></sup>.`,
  pt:`Weak arms or legs on both sides, missing reflexes and the right time course are enough for the lowest levels of certainty.`,
  hook:`Brighton time window: 12 hours to 28 days from onset to nadir <sup class="c" data-ref="LopezHernandez2022,Ghazanfar2020" title="Source 158,277"><a href="/guillain-barre-syndrome/sources/#src-LopezHernandez2022">158,277</a></sup>.`},
 {from:.4,at:.48,k:'Step 3 · spinal fluid',sv:'Spinal fluid: level 2',sub:'fewer than 50 cells per µl',
  t:'A CSF cell count under 50 reaches level 2',
  txt:`Level 2 adds a CSF cell count under 50/µl, with raised protein optional. If CSF was not collected or is unavailable, nerve conduction must be consistent with GBS instead <sup class="c" data-ref="LopezHernandez2022" title="Source 277"><a href="/guillain-barre-syndrome/sources/#src-LopezHernandez2022">277</a></sup>. A count above 50 is a red flag that prompts a search for other causes <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`,
  pt:`A lumbar puncture that shows few white cells in the spinal fluid adds certainty.`,
  hook:`Level 2: cells under 50/µl, protein optional; or, without CSF, consistent nerve conduction <sup class="c" data-ref="LopezHernandez2022" title="Source 277"><a href="/guillain-barre-syndrome/sources/#src-LopezHernandez2022">277</a></sup>.`},
 {from:.56,at:.66,k:'Step 4 · protein and nerves',sv:'Protein and nerve tests: level 1',sub:'the highest certainty needs both',
  t:'Raised protein plus consistent nerve conduction: level 1',
  txt:`Level 1 adds a CSF cell count under 50/µl, CSF protein above normal, and nerve conduction consistent with a GBS subtype <sup class="c" data-ref="LopezHernandez2022,Ghazanfar2020" title="Source 158,277"><a href="/guillain-barre-syndrome/sources/#src-LopezHernandez2022">158,277</a></sup>. Nerve conduction was compatible with a neuropathy in 99% of a Dutch cohort, yet only 59% met criteria for a distinct subtype <sup class="c" data-ref="Fokke2014" title="Source 131"><a href="/guillain-barre-syndrome/sources/#src-Fokke2014">131</a></sup>.`,
  pt:`The highest level needs both a spinal fluid result and nerve tests that fit GBS.`,
  hook:`Brighton level 1 needs both CSF and nerve conduction support; level 3 is clinical only <sup class="c" data-ref="LopezHernandez2022" title="Source 277"><a href="/guillain-barre-syndrome/sources/#src-LopezHernandez2022">277</a></sup>.`},
 {from:.72,at:.8,k:'Step 5 · timing',sv:'Timing changes the level',sub:'tests done later show more',
  t:'Timing shapes the level',
  txt:`In 248 Mexican patients, those who reached level 1 had their lumbar puncture later (median day 8 against day 4) and nerve conduction later (median day 9 against day 6) than the others <sup class="c" data-ref="LopezHernandez2022" title="Source 277"><a href="/guillain-barre-syndrome/sources/#src-LopezHernandez2022">277</a></sup>. CSF protein can be normal early, and nerve conduction may be normal in the first days <sup class="c" data-ref="Doets2018,vanDoorn2023" title="Source 102,473"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102,473</a></sup>.`,
  pt:`Tests done in the first days can still look normal, so an early test can leave the level lower than it would be a week later.`,
  hook:`A normal CSF protein in week 1 does not rule out GBS <sup class="c" data-ref="Doets2018" title="Source 102"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102</a></sup>.`},
 {from:.86,at:.94,k:'Step 6 · certainty',sv:'Certainty, not severity',sub:'how a Dutch cohort spread across levels',
  t:'Level reflects certainty, not severity',
  txt:`Among Dutch adults with complete data (n=335), 61% reached level 1, 33% level 2, none level 3 and 6% level 4. People at different levels did not differ in preceding events, first symptoms or outcome <sup class="c" data-ref="Fokke2014" title="Source 131"><a href="/guillain-barre-syndrome/sources/#src-Fokke2014">131</a></sup>. And the grid is not fully specific: 8% of children with acute flaccid myelitis met it when the "no alternative diagnosis" item was left out <sup class="c" data-ref="Helfferich2022" title="Source 183"><a href="/guillain-barre-syndrome/sources/#src-Helfferich2022">183</a></sup>.`,
  pt:`A lower Brighton level means less test evidence, not a milder illness.`,
  hook:`Most Dutch adults reached level 1 or 2 (61% and 33%) <sup class="c" data-ref="Fokke2014" title="Source 131"><a href="/guillain-barre-syndrome/sources/#src-Fokke2014">131</a></sup>.`}];
/* the case file: g = group header index, at = t when the box ticks */
const CR_GROUPS=['Clinical core','Spinal fluid','Nerve conduction'];
const CR_ITEMS=[
 {l:'No alternative diagnosis',sl:'No alternative diagnosis',g:0,at:.2},
 {l:'Bilateral flaccid limb weakness',sl:'Bilateral flaccid weakness',g:0,at:.24},
 {l:'Reflexes reduced or absent in weak limbs',sl:'Reduced or absent reflexes',g:0,at:.28},
 {l:'One phase, 12 h to 28 days to worst point',sl:'One phase, 12 h to 28 days',g:0,at:.32},
 {l:'CSF white cells under 50/µl',sl:'CSF cells under 50/µl',g:1,at:.46},
 {l:'CSF protein above normal',sl:'CSF protein raised',g:1,at:.6},
 {l:'Consistent with a GBS subtype',sl:'Consistent with GBS',g:2,at:.64}];
const CR_FOKKE=[61,33,0,6];  /* levels 1..4, Dutch adults <sup class="c" data-ref="Fokke2014" title="Source 131"><a href="/guillain-barre-syndrome/sources/#src-Fokke2014">131</a></sup> */
const CR_TXT={file:'Case file',ladder:'Brighton level reached',none:'no level yet',day:'days from weakness onset',
  r1:'reached level 1',r2:'other levels',lp:'LP',ncs:'NCS',lvl:'Level',fokke:'Dutch adults'};
/* Mexican cohort medians (days): lumbar puncture and nerve conduction <sup class="c" data-ref="LopezHernandez2022" title="Source 277"><a href="/guillain-barre-syndrome/sources/#src-LopezHernandez2022">277</a></sup> */
const CR_TIMES={l1:{lp:8,ncs:9},oth:{lp:4,ncs:6}};

/* calculator: the six cohorts and their level shares (null = not given in the source) */
const CR_COH=[
 {n:'Dutch adults',m:'n=335, complete data',v:[61,33,0,6]},
 {n:'Malaysian GBS',m:'n=84',v:[67,25,4,5]},
 {n:'Malaysian MFS',m:'n=25',v:[20,56,8,16]},
 {n:'Single hospital',m:'n=61, classic GBS',v:[60.66,34.42,4.92,0]},
 {n:'Mexican GBS',m:'n=173, complete data',v:[54.6,45,null,.6]},
 {n:'Iranian cohort',m:'level 3 not given',v:[41.4,51.6,null,7]}];
const CR_LVCOL=[ ['var(--dx-soft)','var(--dx)'],['var(--care-soft)','var(--care)'],['var(--accent-soft)','var(--accent)'],['var(--panel-2)','var(--muted)'] ];
const CR_OUT={
 0:{h:'No Brighton level',b:`Every level, including level 4, requires that no alternative diagnosis has been found <sup class="c" data-ref="LopezHernandez2022,Ghazanfar2020" title="Source 158,277"><a href="/guillain-barre-syndrome/sources/#src-LopezHernandez2022">158,277</a></sup>. When another cause explains the picture, the case definition does not apply.`},
 4:{h:'Level 4',b:`Level 4 requires only that no alternative diagnosis has been found, with any other item present or absent <sup class="c" data-ref="LopezHernandez2022,Ghazanfar2020" title="Source 158,277"><a href="/guillain-barre-syndrome/sources/#src-LopezHernandez2022">158,277</a></sup>. Here at least one of the clinical core items is missing, so levels 1 to 3 are out of reach.`},
 3:{h:'Level 3',b:`The clinical core is met: bilateral flaccid weakness, reduced or absent reflexes, one phase of 12 hours to 28 days, and no alternative diagnosis. Level 3 needs these clinical features only, with CSF and nerve conduction not contributing <sup class="c" data-ref="LopezHernandez2022,Ghazanfar2020" title="Source 158,277"><a href="/guillain-barre-syndrome/sources/#src-LopezHernandez2022">158,277</a></sup>.`},
 2:{h:'Level 2',b:`The clinical core plus a CSF cell count under 50/µl, with raised protein optional; or, if CSF was not collected, nerve conduction consistent with GBS <sup class="c" data-ref="LopezHernandez2022" title="Source 277"><a href="/guillain-barre-syndrome/sources/#src-LopezHernandez2022">277</a></sup>.`},
 1:{h:'Level 1',b:`The clinical core, CSF cells under 50/µl, CSF protein above normal and nerve conduction consistent with a GBS subtype: the highest level of diagnostic certainty <sup class="c" data-ref="LopezHernandez2022,Ghazanfar2020" title="Source 158,277"><a href="/guillain-barre-syndrome/sources/#src-LopezHernandez2022">158,277</a></sup>.`},
 cells:`A count of 50/µl or more keeps the case out of levels 1 and 2 in this grid, and it is a red flag that prompts a thorough search for other causes <sup class="c" data-ref="Leonhard2019,AlHakem2023" title="Source 10,266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">10,266</a></sup>.`,
 early:`If the lumbar puncture or nerve conduction was done in the first days, a normal result is common in GBS, and repeating them later can change the level <sup class="c" data-ref="Doets2018,vanDoorn2023,LopezHernandez2022" title="Source 102,277,473"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102,277,473</a></sup>.`,
 pop:`In Dutch adults with complete data, the share at this level was`};

inits.criteria=()=>{
  const T=(x,y,s,c='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${s}</text>`;
  const INK='fill:var(--ink);font-weight:700';
  /* ---------- main player ---------- */
  const svg=$('#crSvg'),rg=$('#crT'),note=$('#crNote');let setSt=()=>{};
  function levelAt(t){const on=CR_ITEMS.map(it=>t>=it.at);if(!on[0])return 0;if(!(on[1]&&on[2]&&on[3]))return 4;if(on[5]&&on[6])return 1;if(on[4])return 2;return 3}
  function draw(t){const N=vb(svg,'720 400','400 690'),p=phaseOf(CR_STEPS,t),P=CR_STEPS[p];
    const L=N?{tx:12,ty:22,cx:14,cy:62,cw:372,hx:14,lx:20,ly:318,lw:360,lh:176,tlx:96,tlw:286,tly:612,dmax:10,pw:26}
             :{tx:16,ty:24,cx:16,cy:66,cw:340,hx:16,lx:392,ly:62,lw:312,lh:220,tlx:120,tlw:584,tly:356,dmax:14,pw:30};
    const lv=levelAt(t);
    let s=T(L.tx,L.ty,P.sv,'t-big')+T(L.tx,L.ty+16,P.sub,'t-sm');
    /* the case file */
    const dimFile=p===4?.45:1;let y=L.cy,g=`<g style="opacity:${dimFile}">`+T(L.cx,y,CR_TXT.file.toUpperCase(),'t-xs','letter-spacing:.1em;font-weight:700');y+=8;let lastG=-1;
    CR_ITEMS.forEach((it,i)=>{if(it.g!==lastG){lastG=it.g;y+=18;g+=T(L.cx,y,CR_GROUPS[it.g],'t-xs','fill:var(--dx);font-weight:700')}
      y+=24;const a=ramp(t,it.at,it.at+.02),on=a>=1;
      g+=`<rect x="${f1(L.cx)}" y="${f1(y-13)}" width="16" height="16" rx="4" style="fill:${on?'var(--dx)':'var(--panel)'};stroke:${on?'var(--dx)':'var(--line)'};stroke-width:1.5"/>`;
      if(a>0)g+=`<path d="M${f1(L.cx+3.5)} ${f1(y-5)}l3.5 3.5l6 -7" style="fill:none;stroke:var(--panel);stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:16;stroke-dashoffset:${f1(16*(1-a))}"/>`;
      g+=T(L.cx+26,y,N?it.sl:it.l,'t-sm',on?'fill:var(--ink);font-weight:700':'')});
    s+=g+'</g>';
    /* the ladder: level 4 lowest (left) up to level 1 (right) */
    const sw=L.lw/4,sh=(L.lh-34)/4;s+=T(L.lx,L.ly,CR_TXT.ladder,'t-xs',INK);
    const baseY=L.ly+L.lh;
    for(let i=0;i<4;i++){const level=4-i,x=L.lx+i*sw,top=baseY-(i+1)*sh,on=lv&&lv<=level,cur=lv===level;
      const C=CR_LVCOL[level-1];
      s+=`<rect x="${f1(x+2)}" y="${f1(top)}" width="${f1(sw-6)}" height="${f1(baseY-top)}" rx="7" style="fill:${on?C[0]:'var(--panel)'};stroke:${cur?C[1]:'var(--line)'};stroke-width:${cur?2.4:1.2}"/>`;
      s+=T(x+sw/2-1,top+16,CR_TXT.lvl+' '+level,'t-sm t-mid',on?'fill:var(--ink);font-weight:700':'');
      if(p===5){const v=CR_FOKKE[level-1],a=ramp(t,.87,.9);s+=`<g style="opacity:${f1(a)}">`+T(x+sw/2-1,top+36,v+'%','t-lbl t-mid')+'</g>'}}
    if(p===5)s+=T(L.lx+L.lw,baseY+16,CR_TXT.fokke+', n=335','t-xs t-end');
    if(lv){const i=4-lv,x=L.lx+i*sw+sw/2-1,top=baseY-(i+1)*sh;const bob=Math.sin(t*40)*1.2;s+=person(x,top-30+bob,26,'var(--ink)')}
    else s+=T(L.lx,baseY+16,CR_TXT.none,'t-xs');
    /* the timeline of tests (Mexican medians) */
    const X=d=>L.tlx+L.tlw*d/L.dmax,ty=L.tly,tla=p>=4?1:.4;
    let tl=`<g style="opacity:${tla}">`+tline(L.tlx,ty,L.tlw,{min:0,max:L.dmax,step:2,fmt:v=>v}).svg+T(L.tlx+L.tlw,ty+30,CR_TXT.day,'t-xs t-end');
    const cur=p===4?lerp(0,L.dmax,ramp(t,.72,.84)):p>4?L.dmax:0;
    [ ['l1',ty-38,CR_TXT.r1],['oth',ty-18,CR_TXT.r2] ].forEach(([k2,yy,lab])=>{tl+=T(L.hx,yy+4,lab,'t-xs',INK);
      ['lp','ncs'].forEach(e=>{const d=CR_TIMES[k2][e],vis=cur>=d||p<4;const xx=X(d);
        tl+=`<g style="opacity:${vis?1:.25}"><rect x="${f1(xx-L.pw/2)}" y="${f1(yy-7)}" width="${L.pw}" height="15" rx="7.5" style="fill:${k2==='l1'?'var(--dx-soft)':'var(--panel-2)'};stroke:${k2==='l1'?'var(--dx)':'var(--line)'}"/>`+T(xx,yy+4,CR_TXT[e],'t-xs t-mid','fill:var(--ink);font-weight:700')+'</g>'})});
    if(p===4)tl+=`<line x1="${f1(X(cur))}" x2="${f1(X(cur))}" y1="${f1(ty-50)}" y2="${f1(ty+4)}" style="stroke:var(--dx);stroke-width:2"/><circle cx="${f1(X(cur))}" cy="${f1(ty)}" r="5" style="fill:var(--dx)"/>`;
    s+=tl+'</g>';
    svg.innerHTML=s;setSt(p);note.innerHTML=noteHTML(P)}
  const stop=playWire(rg,$('#crPlay'),draw,16000,'Replay','criteria');
  setSt=stepWire($('#crSteps'),CR_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- Brighton teaching calculator ---------- */
  const coh=$('#crCoh'),out=$('#crOut'),ids=['crW','crR','crM','crA','crC','crN'];
  function calc(){const v=Object.fromEntries(ids.map(i=>[i,$('#'+i).value]));
    if(v.crA!=='1')return {lv:0,v};
    const core=v.crW==='1'&&v.crR==='1'&&v.crM==='1';
    if(!core)return {lv:4,v};
    if(v.crC==='raised'&&v.crN==='yes')return {lv:1,v};
    if(v.crC==='raised'||v.crC==='normal')return {lv:2,v};
    if(v.crC==='none'&&v.crN==='yes')return {lv:2,v};
    return {lv:3,v}}
  function drawCoh(lv){const N=vb(coh,'720 300','400 440');
    const L=N?{lx:14,bx:14,bw:372,y0:18,rh:70,bh:24,lab:1}:{lx:16,bx:220,bw:484,y0:22,rh:44,bh:26,lab:0};
    let s='';
    CR_COH.forEach((c,i)=>{const y=L.y0+i*L.rh,by=L.lab?y+22:y;
      s+=T(L.lx,L.lab?y+8:by+11,c.n,'t-sm','fill:var(--ink);font-weight:700')+T(L.lab?L.lx+c.n.length*6.8+8:L.lx,L.lab?y+8:by+24,c.m,'t-xs');
      let x=L.bx;c.v.forEach((v,j)=>{if(v==null||v<=0)return;const w=L.bw*v/100,C=CR_LVCOL[j],sel=lv===j+1;
        s+=`<rect x="${f1(x)}" y="${f1(by)}" width="${f1(Math.max(1,w-1))}" height="${L.bh}" rx="4" style="fill:${C[0]};stroke:${C[1]};stroke-width:${sel?2.6:1};opacity:${lv&&!sel?.45:1}"/>`;
        const lab=w>=74?`L${j+1} ${v}%`:w>=36?v+'%':'';
        if(lab)s+=T(x+w/2,by+L.bh/2+3.5,lab,'t-xs t-mid',`fill:${j===3?'var(--ink)':C[1]};font-weight:700;opacity:${lv&&!sel?.6:1}`);
        x+=w})});
    coh.innerHTML=s}
  function upd(){const r=calc(),O=CR_OUT[r.lv];let h=`<div class="kicker">Brighton grid, as reproduced</div><p class="big-num">${O.h}</p><p>${O.b}</p>`;
    if(r.lv&&r.lv<=3){const pct=CR_FOKKE[r.lv-1];h+=`<p>${CR_OUT.pop} <b>${pct}%</b> <sup class="c" data-ref="Fokke2014" title="Source 131"><a href="/guillain-barre-syndrome/sources/#src-Fokke2014">131</a></sup>.</p>`}
    if(r.v.crC==='cells')h+=`<div class="hook"><b>Red flag</b>${CR_OUT.cells}</div>`;
    if(r.lv>=2&&(r.v.crC==='normal'||r.v.crN==='no'||r.v.crC==='none'||r.v.crN==='none'))h+=`<p class="stage-cap">${CR_OUT.early}</p>`;
    out.innerHTML=h;drawCoh(r.lv)}
  ids.forEach(i=>$('#'+i).addEventListener('change',upd));
  upd();
  const prev=redraws.criteria;redraws.criteria=()=>{prev&&prev();upd()};
};
/* =============== 2.3 Lumbar puncture & CSF =============== */
/* Main player: a lumbar puncture, a magnified sample whose protein specks multiply with the days (schematic), and a
   chart of the published windows for raised protein (Fokke2014, Doets2018), then cell counts (AlHakem2023).
   Widgets: a sample reader against fixed and age-adjusted limits (Bourque2019), and an icon array of sensitivity. */
const CS_STEPS=[
 {from:0,at:.06,k:'Step 1 · the sample',sv:'A sample from the lower back',sub:'spinal fluid taken from the lower back',
  t:'Lumbar puncture: a sample of spinal fluid',
  txt:`A lumbar puncture takes a sample of cerebrospinal fluid (CSF) from the spinal canal in the lower back. In GBS the classic result is raised protein with a normal cell count, albuminocytological dissociation <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>. As published, the guideline advises CSF examination particularly when the diagnosis is uncertain or another cause must be excluded <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>.`,
  pt:`A doctor takes a little fluid from the lower back with a thin needle. The lab measures the protein and counts the white cells in it.`,
  hook:`Albuminocytological dissociation: raised protein, normal cell count <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`},
 {from:.16,at:.3,k:'Step 2 · days 0 to 3',sv:'Days 0 to 3: often still normal',sub:'about half are raised this early',
  t:'In the first days, protein is often still normal',
  txt:`Protein was raised in 49% on the first day after weakness began in a Dutch cohort of 494 <sup class="c" data-ref="Fokke2014" title="Source 131"><a href="/guillain-barre-syndrome/sources/#src-Fokke2014">131</a></sup>. In IGOS, 50% were raised within 3 days, with a median of 0.45 g/l (IQR 0.33–0.73) <sup class="c" data-ref="Doets2018" title="Source 102"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102</a></sup>. A normal protein this early does not exclude GBS <sup class="c" data-ref="Leonhard2019,vanDoorn2023" title="Source 266,473"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266,473</a></sup>.`,
  pt:`In the first few days the fluid can look normal, and the person can still have GBS.`,
  hook:`A normal CSF protein in week 1 does not rule out GBS: about 50% are raised within 3 days <sup class="c" data-ref="Doets2018" title="Source 102"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102</a></sup>.`},
 {from:.36,at:.46,k:'Step 3 · the first week',sv:'The first week: rising',sub:'normal in 30 to 50% during week 1',
  t:'Through the first week, protein rises',
  txt:`Protein is normal in 30–50% of people in the first week and in 10–30% in the second <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>. In Ottawa, first-week sensitivity was 70% with the fixed 0.45 g/l limit and 45% with age-adjusted limits <sup class="c" data-ref="Bourque2019" title="Source 53"><a href="/guillain-barre-syndrome/sources/#src-Bourque2019">53</a></sup>.`,
  pt:`As the days pass, more people have a high protein level.`,
  hook:`Normal protein: 30–50% in week 1, 10–30% in week 2 <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`},
 {from:.52,at:.64,k:'Step 4 · after the first week',sv:'After a week: mostly raised',sub:'84% after day 7, 88% after 2 weeks',
  t:'After the first week, most samples are raised',
  txt:`In IGOS, 84% were raised after 7 days, with a median of 0.98 g/l (IQR 0.59–1.84) <sup class="c" data-ref="Doets2018" title="Source 102"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102</a></sup>. In the Dutch cohort, 88% were raised after 2 weeks <sup class="c" data-ref="Fokke2014" title="Source 131"><a href="/guillain-barre-syndrome/sources/#src-Fokke2014">131</a></sup>. The larger IGOS analysis found dissociation in 57% at 4 days or fewer and 84% beyond 4 days <sup class="c" data-ref="AlHakem2023" title="Source 10"><a href="/guillain-barre-syndrome/sources/#src-AlHakem2023">10</a></sup>.`,
  pt:`By the second week, most people with GBS have a high protein level in the spinal fluid.`,
  hook:`Raised protein: 49% on day 1, 88% after 2 weeks <sup class="c" data-ref="Fokke2014" title="Source 131"><a href="/guillain-barre-syndrome/sources/#src-Fokke2014">131</a></sup>.`},
 {from:.7,at:.78,k:'Step 5 · cells',sv:'White cells stay low',sub:'usually under 5 per µl',
  t:'White cells usually stay under 5 per microlitre',
  txt:`In the IGOS analysis of 1,500 patients, 83% had under 5 cells/µl, 16% had 5–49 and 1% had 50 or more <sup class="c" data-ref="AlHakem2023" title="Source 10"><a href="/guillain-barre-syndrome/sources/#src-AlHakem2023">10</a></sup>. Marked pleocytosis above 50/µl suggests leptomeningeal malignancy or infectious or inflammatory disease of the cord or roots <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>, though rare counts of 50 or more are compatible with GBS after a thorough search for other causes <sup class="c" data-ref="AlHakem2023" title="Source 10"><a href="/guillain-barre-syndrome/sources/#src-AlHakem2023">10</a></sup>.`,
  pt:`The fluid usually has very few white cells. Many white cells make doctors look for an infection or another illness.`,
  hook:`CSF over 50 cells/µl should send you looking for another diagnosis <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>.`},
 {from:.86,at:.93,k:'Step 6 · caveats',sv:'Not specific, and IVIg muddies it',sub:'many conditions raise protein',
  t:'Raised protein is not specific',
  txt:`Among 2,627 samples with raised protein and few cells, a diagnosis explaining the protein was found in 57% <sup class="c" data-ref="Brooks2019" title="Source 59"><a href="/guillain-barre-syndrome/sources/#src-Brooks2019">59</a></sup>, so raised protein has many causes. After IVIg, both protein and cell count may be artefactually raised <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>.`,
  pt:`A high protein level is a clue, not proof. It can be high for other reasons, and treatment with IVIg can change the result.`,
  hook:`Albuminocytological dissociation is not specific to GBS <sup class="c" data-ref="Brooks2019" title="Source 59"><a href="/guillain-barre-syndrome/sources/#src-Brooks2019">59</a></sup>.`}];
/* published windows for raised protein (% of people), drawn as points or bars; d0..d1 in days from weakness onset */
const CS_WIN=[
 {s:'f',d0:1,d1:1,v:49,show:1,lab:'49% day 1',pos:'below'},
 {s:'i',d0:0,d1:3,v:50,show:2,lab:'50% by day 3',pos:'above'},
 {s:'i',d0:7,d1:21,v:84,show:7.5,lab:'84% after day 7',pos:'below'},
 {s:'f',d0:14,d1:21,v:88,show:14.5,lab:'88% after 2 wk',pos:'above'}];
const CS_CELLS=[83,16,1];
const CS_TXT={canal:'spinal canal: CSF',vert:'vertebra',needle:'needle',mag:'magnified sample',ivig:'after IVIg?',
  prot:'protein',cell:'white cell',chart:'Raised CSF protein, % of people',lf:'Dutch cohort',li:'IGOS',
  cells:'White cells, IGOS 1,500',c1:'under 5/µl: 83%',c2:'5–49: 16% · 50+: 1%',day:'days',
  early:['IGOS median,','days 0–3:','0.45 g/l'],mid:['rising','(schematic)'],late:['IGOS median,','after day 7:','0.98 g/l']};
function csDay(t){if(t<.16)return 0;if(t<.36)return 3*ramp(t,.16,.36);if(t<.52)return lerp(3,7,ramp(t,.36,.52));return lerp(7,21,ramp(t,.52,.68))}

/* the sample reader */
const CS_AGE={30:.54,40:.57,50:.60,60:.63,70:.67};  /* Ottawa age-adjusted upper limits, g/l <sup class="c" data-ref="Bourque2019" title="Source 53"><a href="/guillain-barre-syndrome/sources/#src-Bourque2019">53</a></sup> */
const CS_CELLBAND=['under 5','5–49','50 or more'];
const CS_RD={
 aboveBoth:`Above both the fixed 0.45 g/l limit and the age-adjusted limit for this age <sup class="c" data-ref="Bourque2019" title="Source 53"><a href="/guillain-barre-syndrome/sources/#src-Bourque2019">53</a></sup>.`,
 aboveFixed:`Above the fixed 0.45 g/l limit, but at or below the age-adjusted limit for this age, so it would be read as normal under age-adjusted limits <sup class="c" data-ref="Bourque2019" title="Source 53"><a href="/guillain-barre-syndrome/sources/#src-Bourque2019">53</a></sup>.`,
 below:`Not raised by either limit.`,
 early0:`In the first 3 days, about half of people with GBS still have a normal protein (50% raised in IGOS) <sup class="c" data-ref="Doets2018" title="Source 102"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102</a></sup>; a normal result does not exclude GBS <sup class="c" data-ref="Leonhard2019,vanDoorn2023" title="Source 266,473"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266,473</a></sup>.`,
 early1:`In the first week, protein is normal in 30–50% of people with GBS <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`,
 late:`After the first week most people with GBS have raised protein: 84% after day 7 in IGOS <sup class="c" data-ref="Doets2018" title="Source 102"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102</a></sup>.`,
 c0:`Under 5 cells/µl: the usual finding in GBS (83% in IGOS) <sup class="c" data-ref="AlHakem2023" title="Source 10"><a href="/guillain-barre-syndrome/sources/#src-AlHakem2023">10</a></sup>.`,
 c1:`5–9 cells/µl: "rarely 5–50" in the guideline's words <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>; 16% of IGOS had 5–49 <sup class="c" data-ref="AlHakem2023" title="Source 10"><a href="/guillain-barre-syndrome/sources/#src-AlHakem2023">10</a></sup>.`,
 c2:`10–49 cells/µl: mild pleocytosis is compatible with GBS but should prompt consideration of infectious polyradiculitis <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`,
 c3:`50/µl or more: very rare in GBS (1% in IGOS) <sup class="c" data-ref="AlHakem2023" title="Source 10"><a href="/guillain-barre-syndrome/sources/#src-AlHakem2023">10</a></sup> and a red flag that suggests leptomeningeal malignancy, or infectious or inflammatory disease of the cord or roots <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`,
 ivig:`After IVIg, CSF protein and cell count may be artefactually raised <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>.`,
 acd:`Raised protein with under 5 cells: the classic dissociation. It is still not specific: many other conditions raise protein <sup class="c" data-ref="Brooks2019" title="Source 59"><a href="/guillain-barre-syndrome/sources/#src-Brooks2019">59</a></sup>.`};
/* the sensitivity icon array: % of people with GBS above the limit (Ottawa) <sup class="c" data-ref="Bourque2019" title="Source 53"><a href="/guillain-barre-syndrome/sources/#src-Bourque2019">53</a></sup>; an array is a range */
const CS_SENS={fixed:{d3:null,w1:70,w2:[74,87]},age:{d3:32,w1:45,w2:[74,87]}};
const CS_SCAP={
 fixed:{d3:`For days 0–3 the Ottawa paper reports sensitivity only for age-adjusted limits <sup class="c" data-ref="Bourque2019" title="Source 53"><a href="/guillain-barre-syndrome/sources/#src-Bourque2019">53</a></sup>.`,
  w1:`First week, fixed 0.45 g/l limit: 70% of people with GBS had raised protein <sup class="c" data-ref="Bourque2019" title="Source 53"><a href="/guillain-barre-syndrome/sources/#src-Bourque2019">53</a></sup>.`,
  w2:`Second week: every limit reached statistically similar sensitivities of 74–87% <sup class="c" data-ref="Bourque2019" title="Source 53"><a href="/guillain-barre-syndrome/sources/#src-Bourque2019">53</a></sup>.`},
 age:{d3:`Days 0–3, age-adjusted limits: 32% of people with GBS had raised protein <sup class="c" data-ref="Bourque2019" title="Source 53"><a href="/guillain-barre-syndrome/sources/#src-Bourque2019">53</a></sup>.`,
  w1:`First week, age-adjusted limits: 45% <sup class="c" data-ref="Bourque2019" title="Source 53"><a href="/guillain-barre-syndrome/sources/#src-Bourque2019">53</a></sup>.`,
  w2:`Second week: every limit reached statistically similar sensitivities of 74–87% <sup class="c" data-ref="Bourque2019" title="Source 53"><a href="/guillain-barre-syndrome/sources/#src-Bourque2019">53</a></sup>.`},
 nr:'not reported for this limit',of:'of 100 people with GBS'};

inits.csf=()=>{
  const T=(x,y,s,c='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${s}</text>`;
  const INK='fill:var(--ink);font-weight:700';
  const rr=rng(23),SPK=Array.from({length:40},()=>[rr(),rr()]),CEL=[ [.3,.62],[.7,.3],[.55,.85] ];
  /* ---------- main player ---------- */
  const svg=$('#csSvg'),rg=$('#csT'),note=$('#csNote');let setSt=()=>{};
  function spine(t){let s='';
    s+=`<rect x="40" y="58" width="14" height="256" rx="4" style="fill:var(--skin)"/>`;
    [92,152,212,272].forEach(y=>{s+=`<rect x="62" y="${y-18}" width="50" height="36" rx="12" style="fill:var(--panel-2);stroke:var(--ink);stroke-width:1;opacity:.9"/>`});
    s+=`<rect x="122" y="54" width="30" height="262" rx="6" style="fill:var(--csf);stroke:var(--line)"/>`;
    for(let i=0;i<4;i++){let d=`M${128+i*6} 60`;for(let y=60;y<=312;y+=12)d+=`L${f1(128+i*6+Math.sin(y/14+i)*1.6)} ${y}`;s+=`<path d="${d}" style="fill:none;stroke:var(--axon-line);stroke-width:1;opacity:.7"/>`}
    [92,152,212,272].forEach(y=>{s+=`<rect x="162" y="${y-24}" width="64" height="48" rx="9" style="fill:var(--panel-2);stroke:var(--ink);stroke-width:1"/>`});
    [122,182,242].forEach(y=>{s+=`<line x1="164" x2="224" y1="${y}" y2="${y}" style="stroke:var(--muted);stroke-width:3;opacity:.5"/>`});
    /* needle */
    const adv=ease(ramp(t,.01,.08)),tip=lerp(46,140,adv),tail=tip-118;
    s+=`<line x1="${f1(tail)}" y1="182" x2="${f1(tip)}" y2="182" style="stroke:var(--device);stroke-width:2.6;stroke-linecap:round"/><rect x="${f1(tail-12)}" y="176" width="14" height="12" rx="3" style="fill:var(--device)"/>`;
    /* drips into a small tube under the hub */
    const fill=ramp(t,.07,.15),hx=tail-5;
    if(adv>=1){for(let k=0;k<3;k++){const u=((t*30)+k/3)%1;if(t<.16||t>.2)s+=`<circle cx="${f1(hx)}" cy="${f1(196+u*26)}" r="2.4" style="fill:var(--csf);stroke:var(--dx);stroke-width:.8;opacity:${f1(1-u*.6)}"/>`}}
    s+=`<path d="M${f1(hx-11)} 226V292Q${f1(hx-11)} 302 ${f1(hx)} 302Q${f1(hx+11)} 302 ${f1(hx+11)} 292V226" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.2"/>`;
    if(fill>0){const top=lerp(298,240,fill);s+=`<path d="M${f1(hx-10)} ${f1(top)}V292Q${f1(hx-10)} 301 ${f1(hx)} 301Q${f1(hx+10)} 301 ${f1(hx+10)} 292V${f1(top)}Z" style="fill:var(--csf)"/>`}
    s+=kitLabel(137,330,CS_TXT.canal,{a:'m'})+kitLabel(194,345,CS_TXT.vert,{a:'m'})+kitLabel(Math.max(2,tail-12),170,CS_TXT.needle);
    return {svg:s,tube:[hx,240]}}
  function draw(t){const N=vb(svg,'720 400','400 712'),p=phaseOf(CS_STEPS,t),P=CS_STEPS[p],day=csDay(t);
    const L=N?{tx:12,ty:22,mx:282,my:76,mw:56,mh:212,cx:46,cy:400,cw:338,ch:190,ry:310}
             :{tx:16,ty:24,mx:262,my:76,mw:56,mh:212,cx:410,cy:70,cw:294,ch:198,ry:310};
    let s=T(L.tx,L.ty,P.sv,'t-big')+T(L.tx,L.ty+16,P.sub,'t-sm');
    const S=spine(t);s+=S.svg;
    /* magnified tube */
    const fill=ramp(t,.07,.15),mx=L.mx,my=L.my,mw=L.mw,mh=L.mh;
    s+=T(mx+mw/2,my-10,p===5?CS_TXT.ivig:CS_TXT.mag,'t-xs t-mid',p===5?'fill:var(--warn);font-weight:700':INK);
    s+=`<path d="M${mx} ${my}V${my+mh-mw/2}A${mw/2} ${mw/2} 0 0 0 ${mx+mw} ${my+mh-mw/2}V${my}" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.4"/>`;
    if(fill>0){const top=lerp(my+mh-4,my+24,fill),id='csClip';
      s+=`<clipPath id="${id}"><path d="M${mx+2} ${f1(top)}V${my+mh-mw/2}A${mw/2-2} ${mw/2-2} 0 0 0 ${mx+mw-2} ${my+mh-mw/2}V${f1(top)}Z"/></clipPath><rect x="${mx}" y="${f1(top)}" width="${mw}" height="${mh}" style="fill:var(--csf)" clip-path="url(#${id})"/>`;
      const n=Math.round(lerp(4,26,ramp(day,1,12)))+(p===5?6:0);
      SPK.slice(0,n).forEach(([a,b],i)=>{const x=mx+8+a*(mw-16),y=lerp(top+10,my+mh-12,b);
        s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="2.6" style="fill:var(--protein);${p===5&&i>=n-6?'stroke:var(--warn);stroke-dasharray:2 1.5;fill-opacity:.4':''}" clip-path="url(#${id})"/>`});
      CEL.slice(0,p>=4?2:1).forEach(([a,b])=>{const x=mx+8+a*(mw-16),y=lerp(top+10,my+mh-14,b);s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="6" style="fill:var(--cell);stroke:var(--ink);stroke-width:.8"/><circle cx="${f1(x-1)}" cy="${f1(y)}" r="2.4" style="fill:var(--ink);opacity:.45"/>`})}
    /* legend and readout under the tube */
    const ly=L.ry;s+=`<circle cx="${mx+4}" cy="${ly-3}" r="2.8" style="fill:var(--protein)"/>`+T(mx+12,ly,CS_TXT.prot)+`<circle cx="${mx+4}" cy="${ly+12}" r="5" style="fill:var(--cell);stroke:var(--ink);stroke-width:.8"/>`+T(mx+12,ly+15,CS_TXT.cell);
    if(fill>.5){const R=day<=3?CS_TXT.early:day<=7?CS_TXT.mid:CS_TXT.late;R.forEach((r,i)=>{s+=T(mx-4,ly+36+i*13,r,i===R.length-1?'t-sm':'t-xs',i===R.length-1?INK:'')})}
    /* the chart */
    const c=curve(L.cx,L.cy,L.cw,L.ch,()=>0,{x0:0,x1:21,y0:0,y1:100,upto:0}),X=c.X,Y=c.Y;
    s+=c.svg+T(L.cx,L.cy-8,CS_TXT.chart,'t-xs',INK);
    [50,100].forEach(v=>{s+=`<line x1="${f1(L.cx)}" x2="${f1(L.cx+L.cw)}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/>`+T(L.cx-5,Y(v)+3,v+'%','t-xs t-end')});
    s+=T(L.cx-5,Y(0)+3,'0','t-xs t-end');
    [0,7,14,21].forEach(d=>{s+=T(X(d),L.cy+L.ch+14,d?d/7+' wk':'onset','t-xs t-mid')});
    const dim=p===5?.5:1;let g=`<g style="opacity:${dim}">`;
    CS_WIN.forEach(w=>{const a=ramp(day,w.show-.5,w.show);if(a<=0)return;const col=w.s==='f'?'var(--accent)':'var(--dx)',y=Y(w.v);
      g+=`<g style="opacity:${f1(a)}">`;
      if(w.d0===w.d1)g+=`<rect x="${f1(X(w.d0)-5)}" y="${f1(y-5)}" width="10" height="10" transform="rotate(45 ${f1(X(w.d0))} ${f1(y)})" style="fill:${col};stroke:var(--panel);stroke-width:1.5"/>`;
      else g+=`<rect x="${f1(X(w.d0))}" y="${f1(y-3.5)}" width="${f1(X(w.d1)-X(w.d0))}" height="7" rx="3.5" style="fill:${col};${w.s==='f'?'opacity:.85':''}"/>`;
      const lx=w.d0===w.d1?X(w.d0)+8:X(w.d0)+2;g+=kitLabel(lx,w.pos==='above'?y-9:y+17,w.lab,{halo:'var(--field)'});g+='</g>'});
    g+='</g>';s+=g;
    if(day>0&&day<21||p>=1&&p<=3){const x=X(day);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${f1(L.cy)}" y2="${f1(L.cy+L.ch)}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:3 3"/>`}
    /* legend */
    const lgy=L.cy+L.ch+32;s+=`<rect x="${f1(L.cx)}" y="${f1(lgy-8)}" width="9" height="9" transform="rotate(45 ${f1(L.cx+4.5)} ${f1(lgy-3.5)})" style="fill:var(--accent)"/>`+T(L.cx+14,lgy,CS_TXT.lf)+`<rect x="${f1(L.cx+110)}" y="${f1(lgy-7)}" width="22" height="7" rx="3.5" style="fill:var(--dx)"/>`+T(L.cx+138,lgy,CS_TXT.li);
    /* cells bar */
    const ca=ramp(t,.7,.74);if(ca>0){const by=lgy+30;let x=L.cx;let cg=`<g style="opacity:${f1(ca)}">`+T(L.cx,by-6,CS_TXT.cells,'t-xs',INK);
      const cols=[ ['var(--dx-soft)','var(--dx)'],['var(--warn-soft)','var(--warn)'],['var(--bad-soft)','var(--bad)'] ];
      CS_CELLS.forEach((v,i)=>{const w=L.cw*v/100*ease(ca);cg+=`<rect x="${f1(x)}" y="${f1(by)}" width="${f1(Math.max(2,w))}" height="14" style="fill:${cols[i][0]};stroke:${cols[i][1]};stroke-width:1.2"/>`;x+=w});
      cg+=T(L.cx,by+28,CS_TXT.c1,'t-xs','fill:var(--ink)')+T(L.cx+L.cw,by+28,CS_TXT.c2,'t-xs t-end','fill:var(--ink)');s+=cg+'</g>'}
    svg.innerHTML=s;setSt(p);note.innerHTML=noteHTML(P)}
  const stop=playWire(rg,$('#csPlay'),draw,16000,'Replay','csf');
  setSt=stepWire($('#csSteps'),CS_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- sample reader ---------- */
  const rd=$('#csRead'),ro=$('#csReadOut'),pv=$('#csProtV');
  function readUpd(){const age=+$('#csAge').value,pr=+$('#csProt').value,ce=+$('#csCells').value,dy=+$('#csDay').value,iv=$('#csIvig').checked,lim=CS_AGE[age];
    pv.textContent=pr.toFixed(2)+' g/l';
    vb(rd,'400 200','400 200');const x0=16,x1=384,X=v=>x0+(x1-x0)*v/2;
    let s=T(x0,14,'CSF protein, g/l','t-xs',INK);
    s+=`<rect x="${x0}" y="56" width="${x1-x0}" height="14" rx="7" style="fill:var(--panel-2)"/><rect x="${x0}" y="56" width="${f1(X(pr)-x0)}" height="14" rx="7" style="fill:${pr>lim?'var(--protein)':'var(--dx)'};opacity:.8"/>`;
    [0,.5,1,1.5,2].forEach(v=>{s+=T(X(v),100,v.toFixed(1),'t-xs '+(v===0?'':v===2?'t-end':'t-mid'))});
    s+=`<line x1="${f1(X(.45))}" x2="${f1(X(.45))}" y1="48" y2="76" style="stroke:var(--ink);stroke-width:2"/>`+T(X(.45)-4,46,'fixed 0.45','t-xs t-end',INK);
    s+=`<line x1="${f1(X(lim))}" x2="${f1(X(lim))}" y1="52" y2="80" style="stroke:var(--ink);stroke-width:2;stroke-dasharray:3 2"/>`+T(X(lim)+4,88,`age ${age}: ${lim.toFixed(2)}`,'t-xs',INK);
    const vx=X(pr);s+=`<path d="M${f1(vx-6)} 42L${f1(vx+6)} 42L${f1(vx)} 52Z" style="fill:var(--ink)"/>`+T(Math.min(Math.max(vx,x0+30),x1-30),34,pr.toFixed(2)+' g/l','t-sm t-mid',INK);
    /* cells */
    const band=ce===0?0:ce===3?2:1,sw=(x1-x0)/3,cy=134;s+=T(x0,124,'White cells per µl','t-xs',INK);
    const cols=[ ['var(--dx-soft)','var(--dx)'],['var(--warn-soft)','var(--warn)'],['var(--bad-soft)','var(--bad)'] ];
    CS_CELLBAND.forEach((b,i)=>{const on=i===band;s+=`<rect x="${f1(x0+i*sw+1)}" y="${cy}" width="${f1(sw-2)}" height="24" rx="5" style="fill:${cols[i][0]};stroke:${cols[i][1]};stroke-width:${on?2.6:1};opacity:${on?1:.5}"/>`+T(x0+i*sw+sw/2,cy+16,b,'t-xs t-mid',`fill:${cols[i][1]};font-weight:700`)});
    s+=`<path d="M${f1(x0+band*sw+sw/2-6)} ${cy+36}L${f1(x0+band*sw+sw/2+6)} ${cy+36}L${f1(x0+band*sw+sw/2)} ${cy+28}Z" style="fill:var(--ink)"/>`+T(x0+band*sw+sw/2,cy+50,'this sample','t-xs t-mid',INK);
    rd.innerHTML=s;
    const L=[pr>lim?CS_RD.aboveBoth:pr>.45?CS_RD.aboveFixed:CS_RD.below];
    if(pr<=lim)L.push(dy===0?CS_RD.early0:dy===1?CS_RD.early1:CS_RD.late);
    L.push(CS_RD['c'+ce]);
    if(pr>.45&&ce===0)L.push(CS_RD.acd);
    if(iv)L.push(CS_RD.ivig);
    ro.innerHTML=`<div class="kicker">What the sources say</div><h4>${pr.toFixed(2)} g/l, ${CS_CELLBAND[band]} cells/µl</h4><ul class="csout">${L.map(x=>`<li>${x}</li>`).join('')}</ul>`}
  ['csAge','csCells','csDay','csIvig'].forEach(i=>$('#'+i).addEventListener('change',readUpd));$('#csProt').addEventListener('input',readUpd);
  readUpd();

  /* ---------- sensitivity icon array ---------- */
  const se=$('#csSens'),scap=$('#csSensCap');let lim='fixed',win='w1';
  function sensDraw(){const N=vb(se,'720 130','400 330'),v=CS_SENS[lim][win],lo=v==null?0:Array.isArray(v)?v[0]:v,hi=v==null?0:Array.isArray(v)?v[1]:v;
    const cols=N?10:20,sz=N?17:15,gp=N?6:4,x0=16,y0=16;let s='';
    for(let i=0;i<100;i++){const cx=x0+(i%cols)*(sz+gp)+sz/2,cy=y0+Math.floor(i/cols)*(sz+gp)+sz/2,on=i<lo,mid=i>=lo&&i<hi;
      s+=`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(sz*.42)}" style="fill:${on?'var(--dx)':mid?'var(--dx-soft)':'var(--panel-2)'};stroke:${mid?'var(--dx)':'none'};stroke-width:1.2;${mid?'stroke-dasharray:2 2':''}"/>`}
    const tx=N?x0:x0+cols*(sz+gp)+28,ty=N?y0+10*(sz+gp)+34:y0+30;
    s+=T(tx,ty,v==null?'—':Array.isArray(v)?`${v[0]}–${v[1]}%`:v+'%','t-big','font-size:34px;fill:var(--dx)');
    s+=T(tx,ty+22,v==null?CS_SCAP.nr:CS_SCAP.of,'t-sm');
    if(Array.isArray(v))s+=`<circle cx="${tx+6}" cy="${ty+42}" r="6" style="fill:var(--dx-soft);stroke:var(--dx);stroke-dasharray:2 2"/>`+T(tx+18,ty+46,'range across limits','t-xs');
    se.innerHTML=s;scap.innerHTML=CS_SCAP[lim][win];
    $$('[data-csl]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.csl===lim));$$('[data-csw]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.csw===win))}
  $$('[data-csl]').forEach(b=>b.addEventListener('click',()=>{lim=b.dataset.csl;sensDraw()}));
  $$('[data-csw]').forEach(b=>b.addEventListener('click',()=>{win=b.dataset.csw;sensDraw()}));
  sensDraw();
  const prev=redraws.csf;redraws.csf=()=>{prev&&prev();readUpd();sensDraw()};
};
/* =============== 2.4 Nerve conduction studies =============== */
/* Main scene: a median-nerve study (arm, oscilloscope, readout) through six steps, with three sets of trace values.
   Second scene: a one-nerve criteria explorer (Hadden against Rajabally). Numbers from research pass C. */
const NC_STEPS=[
 {from:0,at:.1,k:'Step 1 · distal',t:'Stimulate at the wrist',
  txt:'A brief pulse at the wrist fires the motor fibres of the median nerve, and an electrode over the thumb muscles records the compound muscle action potential (CMAP). The distal motor latency (DML) is the time to its onset, and its height is the amplitude. In one published reference chart, the median nerve DML upper limit is 4.5 ms and the amplitude lower limit 4.1 mV; the lower limit falls with age, from 5.9 mV at 19–39 years to 3.8 mV at 60–79 <sup class="c" data-ref="Chen2016NCSRef" title="Source 73"><a href="/guillain-barre-syndrome/sources/#src-Chen2016NCSRef">73</a></sup>. In the Korean first studies, median DML was 4.0 ms in axonal GBS and 5.7 ms in AIDP <sup class="c" data-ref="Koo2016" title="Source 235"><a href="/guillain-barre-syndrome/sources/#src-Koo2016">235</a></sup>.',
  pt:'A nerve test sends small electric pulses along a nerve and measures the response.',
  hook:'The most common demyelinating feature in IGOS was a prolonged DML, in 55.6% of people <sup class="c" data-ref="Arends2024" title="Source 20"><a href="/guillain-barre-syndrome/sources/#src-Arends2024">20</a></sup>.'},
 {from:.2,at:.3,k:'Step 2 · proximal',t:'Stimulate at the elbow: velocity',
  txt:'A pulse at the elbow gives a later response. The distance between the two sites divided by the difference in latency is the conduction velocity: over 250 mm, 50 m/s takes 5.0 ms and 35 m/s takes 7.1 ms (arithmetic, with the distance chosen for this demo) <sup class="c" data-ref="Chen2016NCSRef" title="Source 73"><a href="/guillain-barre-syndrome/sources/#src-Chen2016NCSRef">73</a></sup>. The median motor velocity lower limit in the reference chart is 49 m/s <sup class="c" data-ref="Chen2016NCSRef" title="Source 73"><a href="/guillain-barre-syndrome/sources/#src-Chen2016NCSRef">73</a></sup>. The Korean medians were 51.2 m/s in axonal GBS and 43.8 m/s in AIDP <sup class="c" data-ref="Koo2016" title="Source 235"><a href="/guillain-barre-syndrome/sources/#src-Koo2016">235</a></sup>.',
  pt:'The test times how long the signal takes between two points. Where the insulation is damaged, the signal is slower.',
  hook:'Hadden demyelinating velocity: under 90% of the lower limit, or under 85% if the distal CMAP is below half the lower limit, in at least two nerves <sup class="c" data-ref="Arends2024" title="Source 20"><a href="/guillain-barre-syndrome/sources/#src-Arends2024">20</a></sup>.'},
 {from:.38,at:.46,k:'Step 3 · compare',t:'Block and dispersion',
  txt:'If the elbow response is much smaller than the wrist response, some fibres are blocked in between. Hadden counts a proximal-to-distal ratio under 0.5 (with a distal CMAP of at least 20% of the lower limit) as demyelinating; Rajabally uses 0.7, but only alongside a demyelinating feature in another nerve <sup class="c" data-ref="Arends2024" title="Source 20"><a href="/guillain-barre-syndrome/sources/#src-Arends2024">20</a></sup>. The ratio is unreliable when the distal CMAP is under 1 mV <sup class="c" data-ref="Berciano2020" title="Source 36"><a href="/guillain-barre-syndrome/sources/#src-Berciano2020">36</a></sup>. A longer, lower response means fibres arrive out of step (temporal dispersion): proximal duration was 9.8 ms in AIDP against 6.4 ms in axonal GBS <sup class="c" data-ref="Koo2016" title="Source 235"><a href="/guillain-barre-syndrome/sources/#src-Koo2016">235</a></sup>. Block does not prove demyelination: reversible block is common in AMAN <sup class="c" data-ref="Kokubun2010" title="Source 232"><a href="/guillain-barre-syndrome/sources/#src-Kokubun2010">232</a></sup>.',
  pt:'If fewer signals arrive from the elbow than from the wrist, something between the two points is blocking the way.',
  hook:'Hadden block: proximal-to-distal ratio under 0.5, with a distal CMAP at least 20% of the lower limit <sup class="c" data-ref="Arends2024" title="Source 20"><a href="/guillain-barre-syndrome/sources/#src-Arends2024">20</a></sup>.'},
 {from:.55,at:.63,k:'Step 4 · late responses',t:'F waves: a round trip to the cord',
  txt:'Part of the pulse runs back up to the spinal cord, re-fires a few motor neurons and returns as a small, late F wave, so it tests the proximal nerve and roots, where GBS lesions often start <sup class="c" data-ref="Berciano2017Proximal" title="Source 35"><a href="/guillain-barre-syndrome/sources/#src-Berciano2017Proximal">35</a></sup>. In the first week (31 people), an absent H reflex (97%) and abnormal F waves (84%) were the commonest abnormalities <sup class="c" data-ref="Gordon2001" title="Source 161"><a href="/guillain-barre-syndrome/sources/#src-Gordon2001">161</a></sup>. Hadden counts an F-wave latency over 120% of the upper limit as demyelinating <sup class="c" data-ref="Arends2024" title="Source 20"><a href="/guillain-barre-syndrome/sources/#src-Arends2024">20</a></sup>. Multiple A waves were seen in 13 of 14 people in the first week <sup class="c" data-ref="Kornhuber1999" title="Source 240"><a href="/guillain-barre-syndrome/sources/#src-Kornhuber1999">240</a></sup>.',
  pt:'Part of the test checks the signal\'s trip up to the spinal cord and back. That is often the first part to look abnormal.',
  hook:'Earliest sensitive signs are in late responses: absent H reflex 97%, abnormal F wave 84% in the first week <sup class="c" data-ref="Gordon2001" title="Source 161"><a href="/guillain-barre-syndrome/sources/#src-Gordon2001">161</a></sup>.'},
 {from:.7,at:.78,k:'Step 5 · sensory',t:'Sensory nerves and sural sparing',
  txt:'Sensory nerve action potentials (SNAPs) come from sensory fibres. The sural sparing pattern is an abnormal arm SNAP with a normal sural SNAP: against 38 mimics it was the most specific feature, with ulnar-sural specificity 0.95 and sensitivity 0.41 at one centre <sup class="c" data-ref="Derksen2014" title="Source 97"><a href="/guillain-barre-syndrome/sources/#src-Derksen2014">97</a></sup>. In the Korean medians, the ulnar SNAP was 14.0 µV in axonal GBS and 1.8 µV in AIDP, while the sural was similar <sup class="c" data-ref="Koo2016" title="Source 235"><a href="/guillain-barre-syndrome/sources/#src-Koo2016">235</a></sup>. Reference lower limits: median 11, ulnar 10, sural 4 µV <sup class="c" data-ref="Chen2016NCSRef" title="Source 73"><a href="/guillain-barre-syndrome/sources/#src-Chen2016NCSRef">73</a></sup>. The pattern also occurs in axonal GBS and MFS <sup class="c" data-ref="Umapathi2015" title="Source 455"><a href="/guillain-barre-syndrome/sources/#src-Umapathi2015">455</a></sup>.',
  pt:'The test also checks nerves that carry feeling. In GBS the arm nerves can be hit while a nerve at the ankle is spared.',
  hook:'Sural sparing is specific (about 0.9) but insensitive (about 0.3 to 0.4) <sup class="c" data-ref="Derksen2014" title="Source 97"><a href="/guillain-barre-syndrome/sources/#src-Derksen2014">97</a></sup>.'},
 {from:.86,at:.94,k:'Step 6 · repeat',t:'A second study, weeks later',
  txt:'Studies in the first week can be normal, and a repeat 2–3 weeks later can help <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>. In IGOS, 37.0% of people with a normal or equivocal first study showed polyneuropathy on the second (Hadden), and subtype changed in 37.8% <sup class="c" data-ref="Arends2026" title="Source 21"><a href="/guillain-barre-syndrome/sources/#src-Arends2026">21</a></sup>. Reversible conduction failure is defined at the second study: one proposal needs, for example, a 50% rise in distal amplitude <sup class="c" data-ref="Chan2017" title="Source 72"><a href="/guillain-barre-syndrome/sources/#src-Chan2017">72</a></sup>. AIDP distal latencies tend to rise during the acute phase <sup class="c" data-ref="Shahrizaila2011" title="Source 409"><a href="/guillain-barre-syndrome/sources/#src-Shahrizaila2011">409</a></sup>. The second-study traces here are schematic.',
  pt:'A normal nerve test in the first days does not rule out GBS. The test may be repeated, and the label for your type can change.',
  hook:'Normal nerve studies in the first week do not exclude GBS <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.'}
];
/* trace values: Koo 2016 medians (aidp, axonal); rcf and every "b" (second study) are schematic, chosen for the demo */
const NC_PAT={
 aidp:{lab:'Traces: AIDP group medians (Koo 2016)',dl:5.7,cv:43.8,dA:3.5,pA:3.0,dD:8.4,pD:9.8,snap:[5.3,1.8,15.6],b:{dl:6.6,dA:3.4,dD:9}},
 axonal:{lab:'Traces: axonal GBS group medians (Koo 2016)',dl:4.0,cv:51.2,dA:3.9,pA:3.5,dD:6.2,pD:6.4,snap:[18.3,14.0,13.5],b:{dl:4.0,dA:2.5,dD:6.2}},
 rcf:{lab:'Traces: reversible block, schematic values',dl:4.0,cv:51.2,dA:2.0,pA:0.9,dD:6.2,pD:6.4,snap:[18.3,14.0,13.5],b:{dl:4.0,dA:3.2,dD:6.2,pA:3.0}}};
const NC_REF={dml:4.5,amp:4.1,cv:49,snap:[11,10,4],dist:250};
const NC_TX={cord:'spinal cord',elbow:'elbow',wrist:'wrist',rec:'recording: thumb muscles',dist:'250 mm (demo distance)',
  scope:'muscle response',ms:'ms after the pulse',mv:'mV',limA:'lower limit 4.1 mV',limL:'DML limit 4.5',
  dTr:'wrist',pTr:'elbow',first:'1st study',second:'2nd study (schematic)',lat:'difference in latency',latT:'distal motor latency',amp:'amplitude',dur:'duration',
  fT:'F waves: four sweeps (schematic, no scale)',fM:'M',fF:'F',fAx:'time (schematic)',
  sT:'Sensory responses (SNAP), µV',sNames:['median','ulnar','sural'],lim:'limit',
  roT:'Readout',
  rows:{dml:'Distal motor latency',amp:'Distal amplitude',cv:'Conduction velocity',rat:'Proximal / distal amplitude',dur:'Duration, distal / proximal',
    h:'Absent H reflex, first week',f:'Abnormal F waves, first week',fr:'Hadden F-wave rule',sn:['Median SNAP','Ulnar SNAP','Sural SNAP'],ch:'Distal amplitude, 1st to 2nd',chp:'Change'},
  lims:{dml:'upper limit 4.5 ms',amp:'lower limit 4.1 mV',cv:'lower limit 49 m/s',rat:'Hadden block: under 0.5',dur:'no cut-off shown',h:'Gordon 2001, 31 people',f:'Gordon 2001, 31 people',fr:'over 120% of upper limit',sn:['lower limit 11 µV','lower limit 10 µV','lower limit 4 µV'],ch:'',chp:'Chan 2017: rise of 50% or more'},
  st:{ok:'within limit',hi:'beyond limit',lo:'below limit',blk:'block by Hadden',nob:'no Hadden block',meet:'meets the 50% rise',miss:'no 50% rise',none:''}};
/* criteria explorer */
const NC_PRE={aidp:{dml:5.7,mcv:43.8,amp:3.5,rat:.86},axonal:{dml:4.0,mcv:51.2,amp:3.9,rat:.9},block:{dml:4.0,mcv:51.2,amp:2.0,rat:.45},tiny:{dml:4.2,mcv:50,amp:.6,rat:.9}};
const NC_CR={feat:['Distal motor latency','Conduction velocity','Proximal / distal ratio','Distal CMAP amplitude'],
  on:'demyelinating feature',off:'not met',na:'not assessable: distal CMAP under 20% of the lower limit',
  rOnly:'counts only with a demyelinating feature in another nerve',ax:'axonal feature, if no demyelinating feature',unob:'unobtainable: under 10% of the lower limit',
  rAx:'Rajabally axonal rules not modelled here',
  sum:{hD:'<b>Hadden:</b> this nerve has at least one demyelinating feature. The criteria need one in at least two nerves <sup class="c" data-ref="Arends2024" title="Source 20"><a href="/guillain-barre-syndrome/sources/#src-Arends2024">20</a></sup>.',
    hA:'<b>Hadden:</b> a small response without demyelinating features counts towards axonal, which needs at least two nerves <sup class="c" data-ref="Arends2024" title="Source 20"><a href="/guillain-barre-syndrome/sources/#src-Arends2024">20</a></sup>.',
    hU:'<b>Hadden:</b> the response is unobtainable; one demyelinating feature in one nerve is allowed in the axonal class when the distal CMAP is under 10% of the lower limit <sup class="c" data-ref="Arends2024" title="Source 20"><a href="/guillain-barre-syndrome/sources/#src-Arends2024">20</a></sup>.',
    hN:'<b>Hadden:</b> no demyelinating or axonal feature in this nerve.',
    rD:'<b>Rajabally:</b> this nerve has a demyelinating feature by its stricter cut-offs (latency over 150% of the upper limit, velocity under 70% of the lower limit) <sup class="c" data-ref="Arends2024" title="Source 20"><a href="/guillain-barre-syndrome/sources/#src-Arends2024">20</a></sup>.',
    rN:'<b>Rajabally:</b> no demyelinating feature by its stricter cut-offs <sup class="c" data-ref="Arends2024" title="Source 20"><a href="/guillain-barre-syndrome/sources/#src-Arends2024">20</a></sup>.'},
  sc:[{lab:'Distal motor latency',u:'ms',mn:2,mx:10,f:2},{lab:'Conduction velocity',u:'m/s',mn:20,mx:65,f:1},{lab:'Distal CMAP amplitude',u:'mV',mn:0,mx:8,f:2},{lab:'Proximal / distal ratio',u:'',mn:0,mx:1.2,f:2}],
  mk:{uln:'ULN 4.5',lln:'LLN 49',llnA:'LLN 4.1',h:'Hadden',r:'Rajabally',p80:'80%',p50:'50%',p20:'20%',p10:'10%'}};
inits.ncs=()=>{
  const svg=$('#ncSvg'),rg=$('#ncT');let pat='aidp';
  const tx=(x,y,s,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`;
  const INK='fill:var(--ink);font-weight:700';
  /* a CMAP: negative-up biphasic wave, onset L ms, amplitude A mV, duration D ms */
  const cmap=(ms,L,A,D)=>{const u=(ms-L)/D;if(u<0||u>1)return 0;return u<.45?A*Math.sin(Math.PI*u/.45):-A*.35*Math.sin(Math.PI*(u-.45)/.55)};
  function arm(A,f){/* f: {stim:'wrist'|'elbow'|null, pos:[x,y]|null} */
    let s='';const y=A.y;
    s+=`<rect x="${f1(A.c0)}" y="${f1(y-30)}" width="${f1(A.c1-A.c0)}" height="60" rx="8" style="fill:var(--panel-2);stroke:var(--line)"/>`+tx(A.c0,y+46,NC_TX.cord,'t-xs');
    const armD=`M${f1(A.sh)} ${f1(y-4)}L${f1(A.el)} ${f1(y+4)}L${f1(A.wr)} ${f1(y+4)}`;
    s+=`<path d="${armD}" style="fill:none;stroke:var(--ink);stroke-width:${A.th+2};stroke-linecap:round;stroke-linejoin:round"/><path d="${armD}" style="fill:none;stroke:var(--skin);stroke-width:${A.th};stroke-linecap:round;stroke-linejoin:round"/>`;
    s+=`<ellipse cx="${f1(A.hc)}" cy="${f1(y+6)}" rx="${f1(A.hr)}" ry="${f1(A.th*.62)}" style="fill:var(--skin);stroke:var(--ink);stroke-width:1"/><ellipse cx="${f1(A.hc+A.hr*.3)}" cy="${f1(y-A.th*.55)}" rx="7" ry="${f1(A.th*.4)}" transform="rotate(28 ${f1(A.hc+A.hr*.3)} ${f1(y-A.th*.55)})" style="fill:var(--skin);stroke:var(--ink);stroke-width:1"/>`;
    s+=`<path d="M${f1(A.c1)} ${f1(y)}L${f1(A.el)} ${f1(y+6)}L${f1(A.wr)} ${f1(y+6)}L${f1(A.hc-6)} ${f1(y+2)}" style="fill:none;stroke:var(--axon-line);stroke-width:3;stroke-linejoin:round"/>`;
    /* recording electrode */
    s+=`<circle cx="${f1(A.hc-6)}" cy="${f1(y+2)}" r="6" style="fill:var(--device);stroke:var(--ink)"/><path d="M${f1(A.hc-6)} ${f1(y-4)}V${f1(y-A.th)}" style="stroke:var(--device);stroke-width:2"/>`+tx(A.hc-6,y-A.th-6,NC_TX.rec,'t-xs t-mid');
    /* stimulators */
    [[A.el,NC_TX.elbow,'elbow'],[A.wr,NC_TX.wrist,'wrist']].forEach(([sx,lb,k])=>{const on=f.stim===k;
      s+=`<rect x="${f1(sx-14)}" y="${f1(y+A.th*.5+6)}" width="28" height="12" rx="4" style="fill:${on?'var(--accent)':'var(--panel-2)'};stroke:var(--ink);stroke-width:1"/><path d="M${f1(sx-6)} ${f1(y+A.th*.5+6)}V${f1(y+8)}M${f1(sx+6)} ${f1(y+A.th*.5+6)}V${f1(y+8)}" style="stroke:var(--ink);stroke-width:1.4"/>`;
      if(on)s+=`<path d="M${f1(sx+18)} ${f1(y+A.th*.5+4)}l6 6h-5l6 7" style="fill:none;stroke:var(--accent);stroke-width:2"/>`;
      s+=tx(sx,y+A.th*.5+32,lb,'t-sm t-mid',on?INK:'')});
    /* distance bracket */
    const by=y-A.th*.5-12;s+=`<path d="M${f1(A.el)} ${f1(by+5)}V${f1(by)}H${f1(A.wr)}V${f1(by+5)}" style="fill:none;stroke:var(--muted);stroke-width:1.2"/>`+tx((A.el+A.wr)/2,by-5,NC_TX.dist,'t-xs t-mid');
    if(f.pos)s+=`<circle cx="${f1(f.pos[0])}" cy="${f1(f.pos[1])}" r="9" style="fill:var(--impulse);opacity:.4"/><circle cx="${f1(f.pos[0])}" cy="${f1(f.pos[1])}" r="5" style="fill:var(--impulse);stroke:var(--ink)"/>`;
    return s}
  /* point along the nerve from a to b (x positions), straight segments at the nerve's height */
  const nvY=(A,x)=>x<=A.el?lerp(A.y,A.y+6,(x-A.c1)/(A.el-A.c1)):x<=A.wr?A.y+6:lerp(A.y+6,A.y+2,(x-A.wr)/(A.hc-6-A.wr));
  const along=(A,a,b,u)=>{const x=lerp(a,b,clamp(u));return [x,nvY(A,x)]};
  function scope(S,P,step,u){let s='';const X=ms=>S.x+S.w*ms/24,Y=mv=>S.y+S.h-40-(S.h-60)*mv/6;
    s+=`<rect x="${f1(S.x)}" y="${f1(S.y)}" width="${f1(S.w)}" height="${f1(S.h)}" rx="6" style="fill:var(--field);stroke:var(--line)"/>`;
    const base=Y(0);s+=`<line x1="${f1(S.x)}" x2="${f1(S.x+S.w)}" y1="${f1(base)}" y2="${f1(base)}" class="axis"/>`;
    for(let v=0;v<=24;v+=4)s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${f1(S.y+S.h-5)}" y2="${f1(S.y+S.h)}" class="axis"/>`+tx(X(v),S.y+S.h+12,v,'t-xs t-mid');
    s+=tx(S.x+S.w,S.y+S.h+26,NC_TX.ms,'t-xs t-end');
    [2,4,6].forEach(v=>{s+=`<line x1="${f1(S.x)}" x2="${f1(S.x+S.w)}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/>`+tx(S.x-4,Y(v)+3,v,'t-xs t-end')});
    s+=tx(S.x-4,S.y+10,NC_TX.mv,'t-xs t-end');
    const path=(L,A,D,upto,col,w,dash)=>{let d='';for(let ms=0;ms<=upto+1e-6;ms+=.1)d+=(ms?'L':'M')+f1(X(ms))+' '+f1(Y(cmap(ms,L,A,D)));return `<path d="${d}" style="fill:none;stroke:${col};stroke-width:${w};stroke-linejoin:round${dash?';stroke-dasharray:'+dash:''}"/>`};
    const pl=P.dl+NC_REF.dist/P.cv;
    if(step===0){const up=24*clamp(u/.8);
      s+=`<line x1="${f1(X(NC_REF.dml))}" x2="${f1(X(NC_REF.dml))}" y1="${f1(S.y+6)}" y2="${f1(base)}" class="grid"/>`+tx(X(NC_REF.dml)+3,S.y+14,NC_TX.limL,'t-xs');
      s+=`<line x1="${f1(S.x)}" x2="${f1(S.x+S.w)}" y1="${f1(Y(NC_REF.amp))}" y2="${f1(Y(NC_REF.amp))}" style="stroke:var(--warn);stroke-width:1;stroke-dasharray:4 3"/>`+tx(S.x+S.w-4,Y(NC_REF.amp)-4,NC_TX.limA,'t-xs t-end');
      s+=path(P.dl,P.dA,P.dD,up,'var(--dx)',2.4);
      if(up>P.dl+P.dD*.45){const px=X(P.dl+P.dD*.225);
        const ly=S.y+S.h-12;s+=`<path d="M${f1(X(0))} ${f1(ly)}H${f1(X(P.dl))}M${f1(X(P.dl))} ${f1(ly-4)}V${f1(ly+4)}" style="stroke:var(--ink);stroke-width:1.4"/>`+tx(X(P.dl)+5,ly+3,NC_TX.latT,'t-xs');
        s+=`<path d="M${f1(px+16)} ${f1(base)}V${f1(Y(P.dA))}" style="stroke:var(--ink);stroke-width:1.4"/>`+tx(px+20,(base+Y(P.dA))/2,NC_TX.amp,'t-xs')}}
    else if(step===1||step===2){const up=step===1?24*clamp(u/.8):24;
      s+=path(P.dl,P.dA,P.dD,24,'var(--dx)',step===1?1.4:2.4,step===1?'4 3':'');
      s+=path(pl,P.pA,P.pD,up,'var(--accent)',2.4);
      s+=tx(X(P.dl+P.dD*.2)-6,Y(P.dA)-6,NC_TX.dTr,'t-xs t-end','fill:var(--dx);font-weight:700');
      if(up>pl+1)s+=tx(X(pl+P.pD*.2)+6,Y(P.pA)-6,NC_TX.pTr,'t-xs','fill:var(--accent);font-weight:700');
      if(step===1&&up>pl){const yy=S.y+22;s+=`<path d="M${f1(X(P.dl))} ${f1(yy)}H${f1(X(pl))}" style="stroke:var(--ink);stroke-width:1.4"/><path d="M${f1(X(P.dl))} ${f1(yy-4)}V${f1(yy+4)}M${f1(X(pl))} ${f1(yy-4)}V${f1(yy+4)}" style="stroke:var(--ink);stroke-width:1.4"/>`+tx(X(pl)+6,yy+3,NC_TX.lat,'t-xs')}
      if(step===2){s+=tx(X(P.dl)-6,S.y+28,NC_TX.dur,'t-xs t-end');[[P.dl,P.dD,'var(--dx)',S.y+18],[pl,P.pD,'var(--accent)',S.y+28]].forEach(([L,D,c,yy])=>{s+=`<path d="M${f1(X(L))} ${f1(yy)}H${f1(X(L+D))}" style="stroke:${c};stroke-width:4;stroke-linecap:round"/>`})}}
    else if(step===5){const B=P.b;
      s+=path(P.dl,P.dA,P.dD,24,'var(--dx)',1.6,'4 3')+path(B.dl,B.dA,B.dD,24*clamp(u/.8),'var(--brand)',2.6);
      s+=tx(S.x+8,S.y+16,NC_TX.first,'t-xs','fill:var(--dx);font-weight:700')+tx(S.x+8,S.y+29,NC_TX.second,'t-xs','fill:var(--brand);font-weight:700')}
    return s}
  function fwave(S,u){let s=`<rect x="${f1(S.x)}" y="${f1(S.y)}" width="${f1(S.w)}" height="${f1(S.h)}" rx="6" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=tx(S.x+8,S.y+16,NC_TX.fT,'t-xs',INK);const rr=rng(5),rows=4,rh=(S.h-50)/rows,up=clamp(u/.85);
    for(let r=0;r<rows;r++){const by=S.y+36+rh*(r+.6),fl=.62+rr()*.06,fa=.25+rr()*.25,show=up>r/rows;if(!show)continue;
      let d='';for(let i=0;i<=200;i++){const x=i/200,v=Math.exp(-Math.pow((x-.1)/.025,2))*1-Math.exp(-Math.pow((x-.14)/.03,2))*.4+Math.exp(-Math.pow((x-fl)/.02,2))*fa-Math.exp(-Math.pow((x-fl-.035)/.02,2))*fa*.6;
        d+=(i?'L':'M')+f1(S.x+10+x*(S.w-20))+' '+f1(by-v*rh*.55)}
      s+=`<path d="${d}" style="fill:none;stroke:var(--dx);stroke-width:1.6"/>`}
    s+=tx(S.x+10+.1*(S.w-20),S.y+S.h-8,NC_TX.fM,'t-sm t-mid',INK)+tx(S.x+10+.65*(S.w-20),S.y+S.h-8,NC_TX.fF,'t-sm t-mid',INK)+tx(S.x+S.w-6,S.y+S.h+14,NC_TX.fAx,'t-xs t-end');
    return s}
  function snaps(S,P,u){let s=`<rect x="${f1(S.x)}" y="${f1(S.y)}" width="${f1(S.w)}" height="${f1(S.h)}" rx="6" style="fill:var(--field);stroke:var(--line)"/>`;
    s+=tx(S.x+8,S.y+16,NC_TX.sT,'t-xs',INK);const bw=S.w/3,base=S.y+S.h-24,Y=v=>base-(S.h-60)*v/20,g=ease(clamp(u/.6));
    P.snap.forEach((v,i)=>{const cx=S.x+bw*(i+.5),lim=NC_REF.snap[i],low=v<lim;
      s+=`<rect x="${f1(cx-22)}" y="${f1(Y(v*g))}" width="44" height="${f1(base-Y(v*g))}" rx="4" style="fill:${low?'var(--warn)':'var(--dx)'};opacity:.8"/>`;
      s+=`<line x1="${f1(cx-34)}" x2="${f1(cx+34)}" y1="${f1(Y(lim))}" y2="${f1(Y(lim))}" style="stroke:var(--ink);stroke-width:1.6;stroke-dasharray:4 3"/>`+tx(cx+36,Y(lim)+3,NC_TX.lim,'t-xs');
      s+=tx(cx,Y(v*g)-6,(v*g).toFixed(1),'t-sm t-mid',INK)+tx(cx,base+14,NC_TX.sNames[i],'t-sm t-mid')});
    return s}
  function readout(R,P,step){const T=NC_TX,rw=[],st=T.st,fx=(v,d=1)=>v.toFixed(d);
    if(step<=2||step===5){rw.push([T.rows.dml,fx(P.dl)+' ms',T.lims.dml,P.dl>NC_REF.dml?st.hi:st.ok,P.dl>NC_REF.dml]);
      rw.push([T.rows.amp,fx(P.dA)+' mV',T.lims.amp,P.dA<NC_REF.amp?st.lo:st.ok,P.dA<NC_REF.amp])}
    if(step===1||step===2)rw.push([T.rows.cv,fx(P.cv)+' m/s',T.lims.cv,P.cv<NC_REF.cv?st.lo:st.ok,P.cv<NC_REF.cv]);
    if(step===2){const r=P.pA/P.dA;rw.push([T.rows.rat,fx(r,2),T.lims.rat,r<.5&&P.dA>=.82?st.blk:st.nob,r<.5]);rw.push([T.rows.dur,fx(P.dD)+' / '+fx(P.pD)+' ms',T.lims.dur,st.none,false])}
    if(step===3){rw.push([T.rows.h,'97%',T.lims.h,st.none,false]);rw.push([T.rows.f,'84%',T.lims.f,st.none,false]);rw.push([T.rows.fr,'',T.lims.fr,st.none,false])}
    if(step===4)P.snap.forEach((v,i)=>{rw.push([T.rows.sn[i],fx(v)+' µV',T.lims.sn[i],v<NC_REF.snap[i]?st.lo:st.ok,v<NC_REF.snap[i]])});
    if(step===5){const B=P.b,ch=(B.dA-P.dA)/P.dA*100;rw.length=0;
      rw.push([T.rows.dml,fx(P.dl)+' → '+fx(B.dl)+' ms',T.lims.dml,B.dl>NC_REF.dml?st.hi:st.ok,B.dl>NC_REF.dml]);
      rw.push([T.rows.ch,fx(P.dA)+' → '+fx(B.dA)+' mV',T.lims.ch,st.none,false]);
      rw.push([T.rows.chp,(ch>=0?'+':'')+Math.round(ch)+'%',T.lims.chp,ch>=50?st.meet:st.miss,ch<50])}
    let s=tx(R.x,R.y,T.roT,'t-lbl');
    rw.forEach((r,i)=>{const yy=R.y+12+i*R.dy;
      s+=`<rect x="${f1(R.x)}" y="${f1(yy)}" width="${f1(R.w)}" height="${f1(R.dy-5)}" rx="7" style="fill:${r[4]?'var(--warn-soft)':'var(--panel-2)'}"/>`;
      s+=tx(R.x+8,yy+13,r[0],'t-xs',INK)+tx(R.x+8,yy+32,r[1],'t-big','font-size:15px');
      s+=tx(R.x+R.w-8,yy+25,r[3],'t-xs t-end',r[4]?'fill:var(--warn);font-weight:700':'fill:var(--good);font-weight:700')+tx(R.x+R.w-8,yy+35,r[2],'t-xs t-end')});
    return s}
  function draw(t){
    const N=vb(svg,'720 440','400 690'),p=phaseOf(NC_STEPS,t),P=NC_PAT[pat];
    const A=N?{c0:6,c1:30,sh:50,el:142,wr:286,hc:350,hr:32,y:84,th:32}:{c0:16,c1:52,sh:78,el:250,wr:520,hc:590,hr:40,y:84,th:40};
    const S=N?{x:34,y:196,w:350,h:186}:{x:42,y:196,w:392,h:172};
    const R=N?{x:12,y:430,w:376,dy:44}:{x:466,y:192,w:240,dy:44};
    const st=NC_STEPS[p],nx=NC_STEPS[p+1]?NC_STEPS[p+1].from:1.0001,u=ramp(t,st.from,nx-.02);
    const pl=P.dl+NC_REF.dist/P.cv,f={stim:null,pos:null};
    if(p===0||p===4||p===5){f.stim='wrist';const ms=24*clamp(u/.8);if(p!==4&&ms<P.dl)f.pos=along(A,A.wr,A.hc-6,ms/P.dl);if(p===4&&u<.35)f.pos=along(A,A.hc-6,A.wr,u/.35)}
    else if(p===1||p===2){f.stim='elbow';const ms=24*clamp(u/.8);if(p===1&&ms<pl)f.pos=along(A,A.el,A.hc-6,ms/pl)}
    else{f.stim='wrist';const q=(u*1.6)%1;f.pos=q<.5?along(A,A.wr,A.c1,q/.5):along(A,A.c1,A.hc-6,(q-.5)/.5)}
    let s=arm(A,f);
    s+=tx(S.x,S.y-10,P.lab,'t-sm',INK);
    if(p===3)s+=fwave(S,u);else if(p===4)s+=snaps(S,P,u);else s+=scope(S,P,p,u);
    s+=readout(R,P,p);
    svg.innerHTML=s;
    setSt(p);$('#ncNote').innerHTML=noteHTML(NC_STEPS[p]);
    $$('[data-ncp]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.ncp===pat));
  }
  const stop=playWire(rg,$('#ncPlay'),draw,18000,'Replay','ncs');
  const setSt=stepWire($('#ncSteps'),NC_STEPS,rg,draw,stop);
  $$('[data-ncp]').forEach(b=>b.addEventListener('click',()=>{pat=b.dataset.ncp;draw(+rg.value)}));
  draw(+rg.value);

  /* ---------- criteria explorer ---------- */
  const cs=$('#ncCalc'),ins={dml:$('#ncDml'),mcv:$('#ncMcv'),amp:$('#ncAmp'),rat:$('#ncRat')},outs={dml:$('#ncDmlO'),mcv:$('#ncMcvO'),amp:$('#ncAmpO'),rat:$('#ncRatO')};
  function evalNerve(v){const pct=v.amp/NC_REF.amp*100,C=NC_CR;
    const hDml=v.dml>(pct>=50?4.95:5.40),hMcv=v.mcv<(pct>=50?44.1:41.65),hRat=pct>=20&&v.rat<.5,rDml=v.dml>6.75,rMcv=v.mcv<34.3,rRat=v.rat<.7;
    const unob=v.amp<.41,hDemy=hDml||hMcv||hRat,hAx=!unob&&v.amp<3.28&&!hDemy;
    return {pct,thr:{dml:pct>=50?4.95:5.40,mcv:pct>=50?44.1:41.65},rows:[
      [C.feat[0],hDml?C.on:C.off,hDml,rDml?C.on:C.off,rDml],
      [C.feat[1],hMcv?C.on:C.off,hMcv,rMcv?C.on:C.off,rMcv],
      [C.feat[2],pct<20?C.na:hRat?C.on:C.off,hRat,rRat?C.rOnly:C.off,rRat],
      [C.feat[3],unob?C.unob:hAx?C.ax:C.off,unob||hAx,unob?C.unob:C.rAx,unob]],
      sum:[unob?C.sum.hU:hDemy?C.sum.hD:hAx?C.sum.hA:C.sum.hN,(rDml||rMcv)?C.sum.rD:C.sum.rN]}}
  function drawCalc(){const N=vb(cs,'720 282','400 350'),v={dml:+ins.dml.value,mcv:+ins.mcv.value,amp:+ins.amp.value,rat:+ins.rat.value},E=evalNerve(v),M=NC_CR.mk;
    outs.dml.textContent=v.dml.toFixed(2)+' ms';outs.mcv.textContent=v.mcv.toFixed(1)+' m/s';outs.amp.textContent=v.amp.toFixed(2)+' mV';outs.rat.textContent=v.rat.toFixed(2);
    const G=N?{ax:20,aw:360,rh:84,top:8}:{ax:200,aw:440,rh:66,top:10};
    const mks=[
      [[4.5,M.uln,'a','var(--muted)'],[E.thr.dml,M.h+' '+(+E.thr.dml.toFixed(2)),'b','var(--dx)'],[6.75,M.r+' 6.75','a','var(--accent)']],
      [[49,M.lln,'a','var(--muted)'],[E.thr.mcv,M.h+' '+(+E.thr.mcv.toFixed(2)),'b','var(--dx)'],[34.3,M.r+' 34.3','a','var(--accent)']],
      [[4.1,M.llnA,'a','var(--muted)'],[3.28,M.p80,'b','var(--dx)'],[2.05,M.p50,'a','var(--muted)'],[.82,M.p20,'b','var(--muted)'],[.41,M.p10,'a','var(--muted)']],
      [[.5,M.h+' 0.5','a','var(--dx)'],[.7,M.r+' 0.7','b','var(--accent)']]];
    const bad=[v.dml>E.thr.dml,v.mcv<E.thr.mcv,v.rat<.5&&E.pct>=20,v.amp<3.28];
    let s='';
    NC_CR.sc.forEach((c,i)=>{const r=G.top+i*G.rh,val=[v.dml,v.mcv,v.amp,v.rat][i],X=q=>G.ax+G.aw*(q-c.mn)/(c.mx-c.mn);
      const ay=N?r+46:r+34,vs=val.toFixed(c.f)+(c.u?' '+c.u:'');
      if(N){s+=tx(G.ax,r+14,c.lab,'t-sm',INK)+tx(G.ax+G.aw,r+14,vs,'t-sm t-end',bad[i]?'fill:var(--bad);font-weight:700':INK)}
      else{s+=tx(16,r+28,c.lab,'t-sm',INK)+tx(16,r+44,vs,'t-big',bad[i]?'font-size:15px;fill:var(--bad)':'font-size:15px')}
      s+=`<line x1="${f1(G.ax)}" x2="${f1(G.ax+G.aw)}" y1="${f1(ay)}" y2="${f1(ay)}" style="stroke:var(--line);stroke-width:6;stroke-linecap:round"/>`;
      mks[i].forEach(([q,lb,pos,col])=>{const x=X(q);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${f1(ay-8)}" y2="${f1(ay+8)}" style="stroke:${col};stroke-width:2"/>`+tx(x,pos==='a'?ay-12:ay+20,lb,'t-xs t-mid',`fill:${col==='var(--muted)'?'var(--muted)':col};font-weight:700`)});
      const vx=X(clamp(val,c.mn,c.mx));s+=`<circle cx="${f1(vx)}" cy="${f1(ay)}" r="7" style="fill:${bad[i]?'var(--bad)':'var(--ink)'};stroke:var(--panel);stroke-width:2"/>`});
    cs.innerHTML=s;
    $('#ncRes').innerHTML=E.rows.map(r=>`<tr><th>${r[0]}</th><td class="${r[2]?'on':'off'}">${r[1]}</td><td class="${r[4]?'on':'off'}">${r[3]}</td></tr>`).join('');
    $('#ncSum').innerHTML=E.sum.map(x=>`<p>${x}</p>`).join('')}
  Object.values(ins).forEach(el=>el.addEventListener('input',()=>{$$('[data-ncpre]').forEach(b=>b.setAttribute('aria-pressed','false'));drawCalc()}));
  $$('[data-ncpre]').forEach(b=>b.addEventListener('click',()=>{const P=NC_PRE[b.dataset.ncpre];Object.keys(P).forEach(k=>{ins[k].value=P[k]});
    $$('[data-ncpre]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawCalc()}));
  const prevR=redraws.ncs;redraws.ncs=()=>{prevR&&prevR();drawCalc()};
  drawCalc();
};
/* =============== 2.5 Look-alikes =============== */
/* Main player: the motor pathway as seven stops (rows), a signal travelling down it, and a card for the highlighted
   stop with its mimics and clues; rows are clickable (the step buttons are the keyboard route). Widgets: a GBS-versus-
   mimic comparison table, and a schematic fluctuation / A-CIDP course with the published 8-week and 3-event prompts. */
const DD_ROWS=[
 {k:'brain',n:'Brain and brainstem',sn:'Brain, brainstem'},
 {k:'cord',n:'Spinal cord',sn:'Spinal cord'},
 {k:'horn',n:'Anterior horn cells',sn:'Anterior horn'},
 {k:'nerve',n:'Roots and nerves: GBS',sn:'Roots, nerves: GBS'},
 {k:'nmj',n:'Neuromuscular junction',sn:'Junction'},
 {k:'muscle',n:'Muscle and potassium',sn:'Muscle, potassium'},
 {k:'toxin',n:'Toxins',sn:'Toxins'}];
/* the card for each stop: mimic chips, clue lines (short, they are drawn in the SVG) */
const DD_CARD={
 brain:{m:['brainstem stroke','Wernicke encephalopathy'],c:['mistaken for Miller Fisher or Bickerstaff','drowsiness or confusion (except Bickerstaff)','nystagmus, vomiting']},
 cord:{m:['transverse myelitis','cord compression','epidural abscess'],c:['a sharp sensory level','upgoing toes, brisk reflexes','bladder or bowel trouble early','back pain; whole-spine MRI']},
 horn:{m:['poliomyelitis','acute flaccid myelitis','West Nile virus'],c:['fever, asymmetric weakness','many CSF white cells','cord grey matter on MRI']},
 nerve:{m:['GBS','acute-onset CIDP','vasculitis','porphyria','diphtheria','HIV, Lyme','drugs, toxins','critical illness'],c:['GBS: both sides, reflexes fade','vasculitis: patchy, painful','porphyria: abdominal pain']},
 nmj:{m:['myasthenic crisis','Lambert-Eaton syndrome'],c:['breathing fails, limbs fairly strong','reflexes that improve with exercise']},
 muscle:{m:['periodic paralysis','thyrotoxic periodic paralysis','critical illness myopathy'],c:['episodes with a potassium change','weakness arising in intensive care']},
 toxin:{m:['botulism','tick paralysis'],c:['botulism: descends, no fever, alert','tick: search the whole body']}};
const DD_STEPS=[
 {from:0,at:.05,site:'nerve',k:'Stop 1 · roots and nerves',sv:'Roots and nerves: where GBS acts',sub:'and other neuropathies that act there too',
  t:'Roots and nerves: GBS and other neuropathies',
  txt:`GBS is an acute polyradiculoneuropathy, a disease of the nerve roots and peripheral nerves <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>. Other neuropathies can look similar: about 5% first diagnosed with GBS turn out to have acute-onset CIDP <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>; vasculitic neuropathy is asymmetric or multifocal and painful <sup class="c" data-ref="Collins2010" title="Source 81"><a href="/guillain-barre-syndrome/sources/#src-Collins2010">81</a></sup>; acute porphyria brings abdominal pain, psychological features and proximal asymmetric weakness <sup class="c" data-ref="Albers2004" title="Source 7"><a href="/guillain-barre-syndrome/sources/#src-Albers2004">7</a></sup> and is confirmed by a markedly raised urinary porphobilinogen <sup class="c" data-ref="Anderson2005" title="Source 18"><a href="/guillain-barre-syndrome/sources/#src-Anderson2005">18</a></sup>.`,
  pt:`GBS damages the nerves that run from the spinal cord to the muscles. A few other nerve diseases can look like it at first.`,
  hook:`Abdominal pain, psychological features and neuropathy: urinary porphobilinogen <sup class="c" data-ref="Albers2004,Anderson2005" title="Source 7,18"><a href="/guillain-barre-syndrome/sources/#src-Albers2004">7,18</a></sup>.`},
 {from:.14,at:.19,site:'cord',k:'Stop 2 · spinal cord',sv:'Spinal cord: the commonest worry',sub:'myelitis, compression, abscess',
  t:'The spinal cord',
  txt:`Transverse myelitis is a focal inflammatory cord disorder causing motor, sensory and autonomic dysfunction; a sensory level, extensor plantars, hyperreflexia and a cord lesion on MRI point to it <sup class="c" data-ref="TMCWG2002,vanDoorn2023" title="Source 452,473"><a href="/guillain-barre-syndrome/sources/#src-TMCWG2002">452,473</a></sup>. In metastatic cord compression, new or worsening back pain may come before motor, sensory, bowel or bladder deficits, and whole-spine MRI is recommended <sup class="c" data-ref="Lawton2019" title="Source 264"><a href="/guillain-barre-syndrome/sources/#src-Lawton2019">264</a></sup>. In spinal epidural abscess, fever, back pain and neurological symptoms come together in only about 10%, though most have severe localised back pain <sup class="c" data-ref="Tetsuka2020" title="Source 446"><a href="/guillain-barre-syndrome/sources/#src-Tetsuka2020">446</a></sup>.`,
  pt:`Problems in the spinal cord can also cause weak legs. A clear line on the body below which feeling is lost points to the cord.`,
  hook:`Sensory level + extensor plantars + hyperreflexia = think cord <sup class="c" data-ref="TMCWG2002,vanDoorn2023" title="Source 452,473"><a href="/guillain-barre-syndrome/sources/#src-TMCWG2002">452,473</a></sup>.`},
 {from:.28,at:.33,site:'horn',k:'Stop 3 · anterior horn',sv:'Anterior horn cells: viral paralysis',sub:'polio, acute flaccid myelitis, West Nile',
  t:'Anterior horn cells: polio-like illnesses',
  txt:`Poliomyelitis and acute flaccid myelitis affect the anterior horn cells, with a feverish or respiratory prodrome, flaccid limb weakness and grey-matter changes in the cord on MRI <sup class="c" data-ref="Murphy2020,Murphy2021" title="Source 308,309"><a href="/guillain-barre-syndrome/sources/#src-Murphy2020">308,309</a></sup>. In children, acute flaccid myelitis reached its worst point faster than GBS (median 3 against 8 days) and was asymmetric in 58% against 0% <sup class="c" data-ref="Helfferich2022" title="Source 183"><a href="/guillain-barre-syndrome/sources/#src-Helfferich2022">183</a></sup>. Of 32 people with West Nile virus paralysis, 84% had an asymmetric polio-like syndrome and 13% a Guillain-Barré-like one; fever was present in 91% <sup class="c" data-ref="Sejvar2005" title="Source 403"><a href="/guillain-barre-syndrome/sources/#src-Sejvar2005">403</a></sup>.`,
  pt:`Some viruses attack the nerve cells inside the spinal cord. The weakness is often uneven and comes with a fever.`,
  hook:`Asymmetric flaccid weakness, fever and many CSF cells: think anterior horn cell infection <sup class="c" data-ref="Sejvar2005" title="Source 403"><a href="/guillain-barre-syndrome/sources/#src-Sejvar2005">403</a></sup>.`},
 {from:.42,at:.47,site:'nmj',k:'Stop 4 · junction',sv:'Neuromuscular junction',sub:'myasthenia and Lambert-Eaton',
  t:'The neuromuscular junction',
  txt:`Myasthenia gravis is an antibody-mediated disease of the postsynaptic junction, with localised or general weakness <sup class="c" data-ref="Gilhus2019" title="Source 159"><a href="/guillain-barre-syndrome/sources/#src-Gilhus2019">159</a></sup>. Myasthenic crisis is worsening weakness causing respiratory failure that needs ventilation <sup class="c" data-ref="Wendell2011" title="Source 505"><a href="/guillain-barre-syndrome/sources/#src-Wendell2011">505</a></sup>, so severe breathing failure with only mild limb weakness points away from GBS <sup class="c" data-ref="vanDoorn2023,Leonhard2019" title="Source 266,473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">266,473</a></sup>. One person labelled GBS had Lambert-Eaton syndrome: a static 3-week course, ptosis, proximal weakness, normal sensation, and reflexes that improved with exercise <sup class="c" data-ref="Tham2018" title="Source 447"><a href="/guillain-barre-syndrome/sources/#src-Tham2018">447</a></sup>.`,
  pt:`Myasthenia affects the place where nerve meets muscle. It can make breathing fail while the arms and legs are still fairly strong.`,
  hook:`Severe respiratory failure with mild limb weakness at onset is a red flag for GBS <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`},
 {from:.56,at:.61,site:'toxin',k:'Stop 5 · toxins',sv:'Toxins: botulism and ticks',sub:'two mimics with a direct remedy',
  t:'Toxins: botulism and tick paralysis',
  txt:`Botulism starts with cranial nerve palsies, then a bilateral, symmetric, descending flaccid paralysis, proximal before distal, over hours to a few days; people stay alert, and sensory deficits and pain are rare <sup class="c" data-ref="Rao2021" title="Source 371"><a href="/guillain-barre-syndrome/sources/#src-Rao2021">371</a></sup>. Tick paralysis brings a prodrome, unsteady gait, then ascending symmetric flaccid paralysis, with normal conduction velocity and sensory studies <sup class="c" data-ref="GrattanSmith1997" title="Source 164"><a href="/guillain-barre-syndrome/sources/#src-GrattanSmith1997">164</a></sup>. Removing the tick leads to rapid improvement, and one expert advises never settling on GBS without searching the whole body for a tick <sup class="c" data-ref="Edlow2010" title="Source 110"><a href="/guillain-barre-syndrome/sources/#src-Edlow2010">110</a></sup>.`,
  pt:`A toxin from bacteria (botulism) or a tick bite can cause paralysis. Finding and removing a tick can make a person better quickly.`,
  hook:`Botulism descends, without fever, in an alert person <sup class="c" data-ref="Rao2021" title="Source 371"><a href="/guillain-barre-syndrome/sources/#src-Rao2021">371</a></sup>.`},
 {from:.7,at:.75,site:'muscle',k:'Stop 6 · muscle',sv:'Muscle and potassium',sub:'periodic paralysis, critical illness',
  t:'Muscle and potassium',
  txt:`Periodic paralysis causes episodes of flaccid weakness, often triggered by diet or by rest after exercise, with a documented potassium change during attacks <sup class="c" data-ref="Statland2018" title="Source 426"><a href="/guillain-barre-syndrome/sources/#src-Statland2018">426</a></sup>. Thyrotoxic periodic paralysis typically affects an adult man without a family history, with high systolic pressure, a fast heart rate and low potassium; potassium can restore strength rapidly, with a risk of rebound high potassium <sup class="c" data-ref="Lin2005" title="Source 272"><a href="/guillain-barre-syndrome/sources/#src-Lin2005">272</a></sup>. Critical illness polyneuropathy and myopathy cause weakness and failure to wean that arise during critical illness <sup class="c" data-ref="Latronico2011" title="Source 261"><a href="/guillain-barre-syndrome/sources/#src-Latronico2011">261</a></sup>.`,
  pt:`Low potassium in the blood, or weakness that starts in intensive care, can also look like GBS.`,
  hook:`Periodic paralysis: episodes, with potassium change during attacks <sup class="c" data-ref="Statland2018" title="Source 426"><a href="/guillain-barre-syndrome/sources/#src-Statland2018">426</a></sup>.`},
 {from:.84,at:.9,site:'brain',k:'Stop 7 · brain and brainstem',sv:'Brain and brainstem',sub:'mimics of the eye and balance variants',
  t:'Brain and brainstem: mimics of the variants',
  txt:`Miller Fisher syndrome and pharyngeal-cervical-brachial GBS are often mistaken for brainstem stroke, botulism or myasthenia, and Bickerstaff encephalitis for Wernicke's encephalopathy <sup class="c" data-ref="Wakerley2015" title="Source 492"><a href="/guillain-barre-syndrome/sources/#src-Wakerley2015">492</a></sup>. Altered consciousness casts doubt on GBS except in Bickerstaff encephalitis <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>, and nystagmus or vomiting make GBS less likely <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>. In several mimics of Miller Fisher syndrome, encephalopathy and nystagmus were the clues to Wernicke's encephalopathy with beriberi neuropathy <sup class="c" data-ref="Tham2018" title="Source 447"><a href="/guillain-barre-syndrome/sources/#src-Tham2018">447</a></sup>.`,
  pt:`Some brain problems, such as a small stroke in the brainstem, can look like the GBS variants that affect the eyes and balance.`,
  hook:`Miller Fisher look-alikes: brainstem stroke, botulism, myasthenia; Bickerstaff look-alike: Wernicke's <sup class="c" data-ref="Wakerley2015" title="Source 492"><a href="/guillain-barre-syndrome/sources/#src-Wakerley2015">492</a></sup>.`}];
const DD_GL={nerve:'a nerve fibre in GBS (schematic)',cord:'a sensory level',horn:'uneven weakness, fever',toxin:'from the head downward',muscle:'weakness in episodes',brain:'eyes, balance, alertness',nmj:'antibodies at the',nmj2:'junction (myasthenia)'};
const DD_TXT={path:'THE MOTOR PATHWAY',mim:'Look-alikes here',clue:'Clues that point here',click:'click a stop'};

/* the comparison explorer: rows of {f feature, g GBS, m mimic}; '' = no comparable figure in the sources */
const DD_CMP=[
 {k:'tm',b:'Transverse myelitis',rows:[
  {f:'Where',g:`Nerve roots and peripheral nerves <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>`,m:`Focal inflammation of the spinal cord <sup class="c" data-ref="TMCWG2002" title="Source 452"><a href="/guillain-barre-syndrome/sources/#src-TMCWG2002">452</a></sup>`},
  {f:'Sensation',g:`Tingling from the feet and hands; relatively mild signs <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>`,m:`A sensory level <sup class="c" data-ref="TMCWG2002,vanDoorn2023" title="Source 452,473"><a href="/guillain-barre-syndrome/sources/#src-TMCWG2002">452,473</a></sup>`},
  {f:'Reflexes and plantars',g:`Reduced or absent reflexes <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>`,m:`Hyperreflexia and extensor plantars <sup class="c" data-ref="TMCWG2002,vanDoorn2023" title="Source 452,473"><a href="/guillain-barre-syndrome/sources/#src-TMCWG2002">452,473</a></sup>`},
  {f:'Test that helps',g:`CSF protein, nerve conduction <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>`,m:`Cord lesion on MRI <sup class="c" data-ref="TMCWG2002,vanDoorn2023" title="Source 452,473"><a href="/guillain-barre-syndrome/sources/#src-TMCWG2002">452,473</a></sup>`}],
  cap:`Whole-spine MRI with contrast can help exclude transverse myelitis, compression or tumour <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>.`},
 {k:'cc',b:'Cord compression',rows:[
  {f:'First symptom',g:`Tingling, pain or weakness <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>`,m:`New or worsening back pain may come first <sup class="c" data-ref="Lawton2019" title="Source 264"><a href="/guillain-barre-syndrome/sources/#src-Lawton2019">264</a></sup>`},
  {f:'Then',g:`Weakness of both sides rising over days <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>`,m:`Motor, sensory, bowel or bladder deficits <sup class="c" data-ref="Lawton2019" title="Source 264"><a href="/guillain-barre-syndrome/sources/#src-Lawton2019">264</a></sup>`},
  {f:'Test that helps',g:`Whole-spine MRI only to exclude other causes in atypical cases <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>`,m:`Whole-spine MRI recommended <sup class="c" data-ref="Lawton2019" title="Source 264"><a href="/guillain-barre-syndrome/sources/#src-Lawton2019">264</a></sup>`},
  {f:'Epidural abscess',g:'',m:`Fever, back pain and neurological symptoms together in only about 10%; gadolinium MRI is the most useful test <sup class="c" data-ref="Tetsuka2020" title="Source 446"><a href="/guillain-barre-syndrome/sources/#src-Tetsuka2020">446</a></sup>`}],
  cap:`Bladder or bowel dysfunction at onset casts doubt on GBS <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`},
 {k:'mg',b:'Myasthenic crisis',rows:[
  {f:'Disease',g:`Immune attack on nerves and roots <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>`,m:`Antibody-mediated disease of the postsynaptic junction <sup class="c" data-ref="Gilhus2019" title="Source 159"><a href="/guillain-barre-syndrome/sources/#src-Gilhus2019">159</a></sup>`},
  {f:'Breathing',g:`About 20% develop respiratory failure, alongside limb weakness <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>`,m:`Crisis: worsening weakness with respiratory failure needing ventilation <sup class="c" data-ref="Wendell2011" title="Source 505"><a href="/guillain-barre-syndrome/sources/#src-Wendell2011">505</a></sup>`},
  {f:'Pattern at onset',g:`Limb weakness leads <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>`,m:`Severe breathing failure with mild limb weakness points away from GBS <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>`},
  {f:'Sensation',g:`Sensory deficits in 59% at IGOS entry <sup class="c" data-ref="Doets2018" title="Source 102"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102</a></sup>`,m:''}],
  cap:`Miller Fisher syndrome and pharyngeal-cervical-brachial GBS are often mistaken for myasthenia <sup class="c" data-ref="Wakerley2015" title="Source 492"><a href="/guillain-barre-syndrome/sources/#src-Wakerley2015">492</a></sup>.`},
 {k:'bot',b:'Botulism',rows:[
  {f:'Direction',g:`Usually starts in the legs and spreads up <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>`,m:`Cranial nerves first, then descending, proximal before distal <sup class="c" data-ref="Rao2021" title="Source 371"><a href="/guillain-barre-syndrome/sources/#src-Rao2021">371</a></sup>`},
  {f:'Tempo',g:`Most reach the worst point within 2 weeks <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>`,m:`Hours to a few days <sup class="c" data-ref="Rao2021" title="Source 371"><a href="/guillain-barre-syndrome/sources/#src-Rao2021">371</a></sup>`},
  {f:'Eyes',g:`Cranial nerve involvement in 50% at IGOS entry <sup class="c" data-ref="Doets2018" title="Source 102"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102</a></sup>`,m:`Ptosis 81%, diplopia 75%, dilated pupils 37% <sup class="c" data-ref="Rao2021" title="Source 371"><a href="/guillain-barre-syndrome/sources/#src-Rao2021">371</a></sup>`},
  {f:'Sensation',g:`Sensory deficits in 59% at IGOS entry <sup class="c" data-ref="Doets2018" title="Source 102"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102</a></sup>`,m:`Sensory deficits or paraesthesias in 17% <sup class="c" data-ref="Rao2021" title="Source 371"><a href="/guillain-barre-syndrome/sources/#src-Rao2021">371</a></sup>`},
  {f:'Fever, alertness',g:`Fever at onset casts doubt on GBS <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>`,m:`Afebrile 99%; altered mental status 8% <sup class="c" data-ref="Rao2021" title="Source 371"><a href="/guillain-barre-syndrome/sources/#src-Rao2021">371</a></sup>`},
  {f:'CSF',g:`Protein raised in 84% after day 7 <sup class="c" data-ref="Doets2018" title="Source 102"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102</a></sup>`,m:`Typically normal; mild protein rises are infrequent <sup class="c" data-ref="Rao2021" title="Source 371"><a href="/guillain-barre-syndrome/sources/#src-Rao2021">371</a></sup>`},
  {f:'Nerve test',g:`Conduction consistent with polyneuropathy, may be normal early <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>`,m:`High-rate (30–50 Hz) repetitive stimulation classically shows an increment; early studies can be normal <sup class="c" data-ref="Rao2021" title="Source 371"><a href="/guillain-barre-syndrome/sources/#src-Rao2021">371</a></sup>`}],
  cap:`Figures for botulism are from 332 confirmed cases <sup class="c" data-ref="Rao2021" title="Source 371"><a href="/guillain-barre-syndrome/sources/#src-Rao2021">371</a></sup>.`},
 {k:'tick',b:'Tick paralysis',rows:[
  {f:'Course',g:`Ascending weakness over days <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>`,m:`Prodrome, unsteady gait, then ascending symmetric flaccid paralysis <sup class="c" data-ref="GrattanSmith1997" title="Source 164"><a href="/guillain-barre-syndrome/sources/#src-GrattanSmith1997">164</a></sup>`},
  {f:'Eyes',g:`Cranial nerves in 50% at IGOS entry <sup class="c" data-ref="Doets2018" title="Source 102"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102</a></sup>`,m:`Early ophthalmoplegia in Australian cases <sup class="c" data-ref="GrattanSmith1997" title="Source 164"><a href="/guillain-barre-syndrome/sources/#src-GrattanSmith1997">164</a></sup>`},
  {f:'Nerve conduction',g:`Consistent with polyneuropathy <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>`,m:`Normal conduction velocity and sensory studies; low-amplitude motor responses <sup class="c" data-ref="GrattanSmith1997" title="Source 164"><a href="/guillain-barre-syndrome/sources/#src-GrattanSmith1997">164</a></sup>`},
  {f:'What changes it',g:`Immunotherapy and supportive care <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>`,m:`Removal brings rapid improvement <sup class="c" data-ref="Edlow2010" title="Source 110"><a href="/guillain-barre-syndrome/sources/#src-Edlow2010">110</a></sup>; Australian cases can worsen for 24–48 h after removal <sup class="c" data-ref="GrattanSmith1997" title="Source 164"><a href="/guillain-barre-syndrome/sources/#src-GrattanSmith1997">164</a></sup>`}],
  cap:`In 9 Louisiana children with tick paralysis, 4 had a delayed diagnosis; all recovered fully after removal <sup class="c" data-ref="Pontiff2021" title="Source 360"><a href="/guillain-barre-syndrome/sources/#src-Pontiff2021">360</a></sup>.`},
 {k:'afm',b:'Acute flaccid myelitis (children)',rows:[
  {f:'Time to worst point',g:`Median 8 days (156 children)`,m:`Median 3 days (26 children)`},
  {f:'Asymmetric weakness',g:`0%`,m:`58%`},
  {f:'Sensory deficits',g:`40%`,m:`0%`},
  {f:'CSF',g:`Fewer cells, more protein`,m:`More cells, less protein`},
  {f:'MRI',g:`No cord lesion`,m:`Cord lesions, only in myelitis`}],
  cap:`All rows from one Dutch comparison <sup class="c" data-ref="Helfferich2022" title="Source 183"><a href="/guillain-barre-syndrome/sources/#src-Helfferich2022">183</a></sup>. Nerve root enhancement can occur in acute flaccid myelitis too, so it does not settle the question alone <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`},
 {k:'wnv',b:'West Nile virus',rows:[
  {f:'Pattern',g:`Weakness of both sides, can be asymmetric <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>`,m:`Asymmetric polio-like syndrome in 84%; Guillain-Barré-like in 13% <sup class="c" data-ref="Sejvar2005" title="Source 403"><a href="/guillain-barre-syndrome/sources/#src-Sejvar2005">403</a></sup>`},
  {f:'Other signs',g:`Fever at onset casts doubt <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>`,m:`Fever 91%, tremor 66%, altered mental status 50% <sup class="c" data-ref="Sejvar2005" title="Source 403"><a href="/guillain-barre-syndrome/sources/#src-Sejvar2005">403</a></sup>`},
  {f:'CSF',g:`Usually under 5 cells/µl <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>`,m:`Median 108 leukocytes/mm³ (range 0–740), protein 98 mg/dl <sup class="c" data-ref="Sejvar2005" title="Source 403"><a href="/guillain-barre-syndrome/sources/#src-Sejvar2005">403</a></sup>`},
  {f:'Tempo',g:`Most reach the worst point within 2 weeks <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>`,m:`Median 1 day to the worst point (polio-like), 4 days (Guillain-Barré-like) <sup class="c" data-ref="Sejvar2005" title="Source 403"><a href="/guillain-barre-syndrome/sources/#src-Sejvar2005">403</a></sup>`}],
  cap:`32 Colorado patients with West Nile virus paralysis <sup class="c" data-ref="Sejvar2005" title="Source 403"><a href="/guillain-barre-syndrome/sources/#src-Sejvar2005">403</a></sup>.`},
 {k:'por',b:'Acute porphyria',rows:[
  {f:'Overlap',g:`Weakness, sensory symptoms, raised CSF protein <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>`,m:`Can resemble GBS in symptoms, signs and CSF <sup class="c" data-ref="Albers2004" title="Source 7"><a href="/guillain-barre-syndrome/sources/#src-Albers2004">7</a></sup>`},
  {f:'Clues',g:`Abdominal pain casts doubt on GBS <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>`,m:`Abdominal pain, psychological features, proximal asymmetric weakness, axonal electrodiagnosis <sup class="c" data-ref="Albers2004" title="Source 7"><a href="/guillain-barre-syndrome/sources/#src-Albers2004">7</a></sup>`},
  {f:'Test that helps',g:'',m:`Markedly raised urinary porphobilinogen on a single sample confirms rapidly <sup class="c" data-ref="Anderson2005" title="Source 18"><a href="/guillain-barre-syndrome/sources/#src-Anderson2005">18</a></sup>`}],
  cap:`One mimic in a tertiary series had abdominal pain, tea-coloured urine, encephalopathy and a seizure before flaccid weakness of all four limbs <sup class="c" data-ref="Tham2018" title="Source 447"><a href="/guillain-barre-syndrome/sources/#src-Tham2018">447</a></sup>.`},
 {k:'kpp',b:'Low potassium, periodic paralysis',rows:[
  {f:'Course',g:`One phase, worst point within 4 weeks <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>`,m:`Episodes of flaccid weakness, often after diet triggers or rest after exercise <sup class="c" data-ref="Statland2018" title="Source 426"><a href="/guillain-barre-syndrome/sources/#src-Statland2018">426</a></sup>`},
  {f:'Blood test',g:`Routine blood tests usually normal; hyponatraemia may occur <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>`,m:`Documented potassium change during attacks <sup class="c" data-ref="Statland2018" title="Source 426"><a href="/guillain-barre-syndrome/sources/#src-Statland2018">426</a></sup>`},
  {f:'Thyrotoxic form',g:'',m:`Adult man, no family history, high systolic pressure, fast heart rate, low potassium with low urinary potassium; rebound high potassium is a risk with treatment <sup class="c" data-ref="Lin2005" title="Source 272"><a href="/guillain-barre-syndrome/sources/#src-Lin2005">272</a></sup>`}],
  cap:`Blood tests including electrolytes are part of the published first work-up for everyone suspected <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`},
 {k:'cidp',b:'Acute-onset CIDP',rows:[
  {f:'Worsening',g:`First fluctuation within 8 weeks, median 18 days <sup class="c" data-ref="Ruts2010" title="Source 391"><a href="/guillain-barre-syndrome/sources/#src-Ruts2010">391</a></sup>`,m:`Again after 8 weeks, or 3 or more times <sup class="c" data-ref="Ruts2010,vanDoorn2023" title="Source 391,473"><a href="/guillain-barre-syndrome/sources/#src-Ruts2010">391,473</a></sup>`},
  {f:'Cranial and breathing',g:`Cranial nerves in 50% at IGOS entry <sup class="c" data-ref="Doets2018" title="Source 102"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102</a></sup>`,m:`No facial, bulbar or respiratory weakness makes A-CIDP more likely <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>`},
  {f:'Sensation',g:`Relatively mild sensory signs <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>`,m:`Marked sensory abnormality, including sensory ataxia <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>`},
  {f:'How common',g:'',m:`About 5% of people first diagnosed with GBS <sup class="c" data-ref="vanDoorn2023,Leonhard2019" title="Source 266,473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">266,473</a></sup>`}],
  cap:`Up to 16% of CIDP may present acutely <sup class="c" data-ref="Dionne2010" title="Source 100"><a href="/guillain-barre-syndrome/sources/#src-Dionne2010">100</a></sup>.`}];

/* schematic courses for the fluctuation widget: weeks -> disability (0 well .. 1 worst); ev = weeks when a new
   deterioration starts (the first GBS fluctuation sits at the published median, 18 days) */
const DD_FL={
 gbs:{pts:[ [0,0],[1,.5],[1.8,.74],[2.6,.5],[3.3,.68],[5,.46],[8,.28],[11,.18],[14,.12] ],ev:[2.6],tx:1.6,late:null,
  done:`One deterioration, within 8 weeks: the pattern of a treatment-related fluctuation in GBS. In the prospective study, the first fluctuation always came within 8 weeks (median 18 days) and none had more than two <sup class="c" data-ref="Ruts2010" title="Source 391"><a href="/guillain-barre-syndrome/sources/#src-Ruts2010">391</a></sup>.`},
 cidp:{pts:[ [0,0],[1.5,.5],[2.4,.62],[3,.44],[4,.62],[5,.44],[6.2,.6],[7.5,.42],[9.6,.68],[11,.56],[14,.6] ],ev:[3,5,7.5],tx:2,late:8.2,
  done:`Three deteriorations, the last continuing past week 8: both published prompts for A-CIDP. Worsening after 8 weeks has a sensitivity of 100% and specificity of 92%; 3 or more fluctuations, 52% and 96% <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>.`}};
const DD_FLTXT={wk:'Week {w} of 14. Scrub or press Play to follow the course.',y:'disability (schematic)',x:'weeks from weakness onset',w8:'8 weeks',tx:'treatment',n:'deteriorations so far',late:'worsening after week 8',yes:'yes',no:'not yet',better:'better',worse:'worse'};

inits.ddx=()=>{
  const T=(x,y,s,c='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${s}</text>`;
  const INK='fill:var(--ink);font-weight:700';
  /* ---------- main player ---------- */
  const svg=$('#ddSvg'),rg=$('#ddT'),note=$('#ddNote');let setSt=()=>{},stop=()=>{};
  function chips(x,y,w,list,N){let s='',cx=x,cy=y;const h=22;
    list.forEach((m,i)=>{const cw=m.length*6.3+18;if(cx+cw>x+w){cx=x;cy+=h+6}
      const gbs=m==='GBS';s+=`<rect x="${f1(cx)}" y="${f1(cy)}" width="${f1(cw)}" height="${h}" rx="11" style="fill:${gbs?'var(--dx-soft)':'var(--panel-2)'};stroke:${gbs?'var(--dx)':'var(--line)'}"/>`+T(cx+cw/2,cy+15,m,'t-sm t-mid',gbs?'fill:var(--dx);font-weight:700':'fill:var(--ink)');cx+=cw+6});
    return {svg:s,y:cy+h}}
  /* a small drawing for each stop, centred in the free space at the bottom of the card (cx, cy = its centre) */
  function glyph(k,cx,cy,w,t){const bs=118,by=cy-bs/2,kk=bs/146,P=(a,b)=>[cx-50+a*kk,by+(b+50)*kk],bx=cx-50;let s='';
    const lab=(txt)=>kitLabel(bx+34,cy+4,txt);
    if(k==='nerve'){const W=Math.min(w,320);return T(cx-W/2,cy-40,DD_GL.nerve,'t-xs',INK)+nerveFibre(cx-W/2,cy,W,{n:4,h:26,demy:[.6,.9,.4,0],mac:[0,.8,0,0],pulse:(t*8)%1,block:2}).svg}
    if(k==='cord'){s=bodyFront(bx,by,bs,{level:.42}).svg;const ly=P(0,2)[1];return s+`<line x1="${f1(bx-26)}" x2="${f1(bx+26)}" y1="${f1(ly)}" y2="${f1(ly)}" style="stroke:var(--bad);stroke-width:2.2;stroke-dasharray:4 3"/>`+lab(DD_GL.cord)}
    if(k==='horn'){s=bodyFront(bx,by,bs).svg;const a=P(-17,34),b=P(-3,94);return s+`<rect x="${f1(a[0])}" y="${f1(a[1])}" width="${f1(b[0]-a[0])}" height="${f1(b[1]-a[1])}" rx="5" style="fill:var(--weak);opacity:.7"/>`+lab(DD_GL.horn)}
    if(k==='toxin')return bodyFront(bx,by,bs,{zones:{eyes:1,face:.9,neck:.8,arms:.6,trunk:.35}}).svg+lab(DD_GL.toxin);
    if(k==='muscle')return bodyFront(bx,by,bs,{zones:{legs:.8,arms:.8,trunk:.4}}).svg+lab(DD_GL.muscle);
    if(k==='brain')return bodyFront(bx,by,bs,{zones:{eyes:1,face:.5}}).svg+lab(DD_GL.brain);
    if(k==='nmj'){const x0=cx-120,y=cy;s+=`<path d="M${x0} ${y-34}H${x0+70}Q${x0+96} ${y-34} ${x0+100} ${y-14}" style="fill:none;stroke:var(--axon-line);stroke-width:7;stroke-linecap:round"/>`;
      s+=`<ellipse cx="${x0+104}" cy="${y-8}" rx="26" ry="14" style="fill:var(--axon);stroke:var(--axon-line);stroke-width:1.4"/>`;
      s+=`<rect x="${x0+40}" y="${y+12}" width="130" height="30" rx="8" style="fill:var(--muscle);opacity:.85"/>`;
      for(let i=0;i<6;i++){const rx=x0+78+i*10;s+=`<rect x="${rx-2.5}" y="${y+6}" width="5" height="9" rx="2" style="fill:var(--nav);stroke:var(--ink);stroke-width:.6"/>`;if(i%2===0)s+=antibody(rx,y+5,12,{ang:180})}
      return s+kitLabel(x0+176,y+4,DD_GL.nmj)+kitLabel(x0+176,y+18,DD_GL.nmj2)}
    return ''}
  function draw(t){const N=vb(svg,'720 400','400 680'),p=phaseOf(DD_STEPS,t),P=DD_STEPS[p],site=P.site;
    const L=N?{tx:12,ty:22,rx:14,ry:50,rw:372,rh:30,rg:4,dx:14,dy:300,dw:372,dh:366}
             :{tx:16,ty:24,rx:16,ry:56,rw:224,rh:42,rg:6,dx:258,dy:56,dw:446,dh:330};
    let s=T(L.tx,L.ty,P.sv,'t-big')+T(L.tx,L.ty+16,P.sub,'t-sm');
    /* pathway rows */
    const lx=L.rx+12,y0=L.ry+L.rh/2,y1=L.ry+(DD_ROWS.length-2)*(L.rh+L.rg)+L.rh/2;
    s+=`<line x1="${lx}" x2="${lx}" y1="${f1(y0)}" y2="${f1(y1)}" style="stroke:var(--line);stroke-width:3"/>`;
    DD_ROWS.forEach((r,i)=>{const y=L.ry+i*(L.rh+L.rg),on=r.k===site,tox=r.k==='toxin';
      s+=`<g class="clk" data-dds="${r.k}"><rect x="${f1(L.rx)}" y="${f1(y)}" width="${f1(L.rw)}" height="${L.rh}" rx="9" style="fill:${on?'var(--dx-soft)':'var(--panel)'};stroke:${on?'var(--dx)':'var(--line)'};stroke-width:${on?2:1};${tox?'stroke-dasharray:5 3':''}"/>`;
      s+=`<circle cx="${lx}" cy="${f1(y+L.rh/2)}" r="${on?7:5}" style="fill:${on?'var(--dx)':'var(--panel-2)'};stroke:var(--ink);stroke-width:1"/>`;
      s+=T(lx+16,y+L.rh/2+4,N?r.sn:r.n,'t-sm',on?'fill:var(--dx);font-weight:700':'fill:var(--ink)')+'</g>'});
    /* the travelling signal (brain to muscle) */
    const u=(t*6)%1,sy=lerp(y0,y1,u);s+=`<circle cx="${lx}" cy="${f1(sy)}" r="4" style="fill:var(--impulse);stroke:var(--ink);stroke-width:1"/>`;
    /* the card */
    const C=DD_CARD[site],a=1;s+=`<rect x="${L.dx}" y="${L.dy}" width="${L.dw}" height="${L.dh}" rx="12" style="fill:var(--panel);stroke:var(--dx);stroke-width:1.4"/>`;
    const ix=L.dx+14,iw=L.dw-28;let cy=L.dy+22;
    s+=T(ix,cy,DD_TXT.mim.toUpperCase(),'t-xs','letter-spacing:.1em;fill:var(--dx);font-weight:700');
    const ch=chips(ix,cy+8,iw,C.m,N);s+=ch.svg;cy=ch.y+24;
    s+=T(ix,cy,DD_TXT.clue.toUpperCase(),'t-xs','letter-spacing:.1em;fill:var(--dx);font-weight:700');
    C.c.forEach((c,i)=>{const yy=cy+22+i*22,ap=clamp(ramp(t,P.from,P.from+.06)*C.c.length-i);
      s+=`<g style="opacity:${f1(.25+.75*ap)}"><path d="M${ix} ${yy-5}l4 4l7 -8" style="fill:none;stroke:var(--dx);stroke-width:2;stroke-linecap:round"/>`+T(ix+18,yy,c,'t-lbl','font-weight:500')+'</g>'});
    const top=cy+22+C.c.length*22,bot=L.dy+L.dh-8,gc=(top+bot)/2;
    if(bot-top>=(site==='nerve'?60:126))s+=`<g style="opacity:${f1(ramp(t,P.from,P.from+.04))}">`+glyph(site,L.dx+L.dw/2,gc,iw,t)+'</g>';
    svg.innerHTML=s;setSt(p);note.innerHTML=noteHTML(P)}
  stop=playWire(rg,$('#ddPlay'),draw,21000,'Replay','ddx');
  setSt=stepWire($('#ddSteps'),DD_STEPS,rg,draw,stop);
  svg.addEventListener('click',e=>{const g=e.target.closest('[data-dds]');if(!g)return;const i=DD_STEPS.findIndex(s=>s.site===g.dataset.dds);if(i<0)return;stop();rg.value=DD_STEPS[i].at;draw(DD_STEPS[i].at)});
  draw(+rg.value);

  /* ---------- comparison explorer ---------- */
  const pick=$('#ddPick'),tb=$('#ddCmp'),hd=$('#ddMimicHead'),cc=$('#ddCmpCap');let cur=3;
  pick.innerHTML=DD_CMP.map((c,i)=>`<button class="btn" data-ddm="${i}" aria-pressed="false">${c.b}</button>`).join('');
  function cmpUpd(){const C=DD_CMP[cur];hd.textContent=C.b;
    tb.innerHTML=C.rows.map(r=>`<tr><th>${r.f}</th><td>${r.g||'—'}</td><td>${r.m||'—'}</td></tr>`).join('');
    cc.innerHTML=C.cap;$$('[data-ddm]',pick).forEach(b=>b.setAttribute('aria-pressed',+b.dataset.ddm===cur))}
  pick.addEventListener('click',e=>{const b=e.target.closest('[data-ddm]');if(!b)return;cur=+b.dataset.ddm;cmpUpd()});
  cmpUpd();

  /* ---------- fluctuation or A-CIDP ---------- */
  const fl=$('#ddFl'),frg=$('#ddFlT'),fcap=$('#ddFlCap');let sc='gbs';const fns={gbs:monoFn(DD_FL.gbs.pts),cidp:monoFn(DD_FL.cidp.pts)};
  function flDraw(t){const N=vb(fl,'720 300','400 380'),F=DD_FL[sc],f=fns[sc],wk=14*t;
    const L=N?{x:40,y:20,w:344,h:220,ry:300}:{x:56,y:20,w:480,h:220,rx:560};
    const c=curve(L.x,L.y,L.w,L.h,f,{x0:0,x1:14,y0:0,y1:1,upto:wk,col:'var(--weak)',fill:true,dot:true}),X=c.X,Y=c.Y;let s=c.svg;
    for(let w=0;w<=14;w+=2)s+=T(X(w),L.y+L.h+14,w,'t-xs t-mid');
    s+=T(L.x+L.w,L.y+L.h+30,DD_FLTXT.x,'t-xs t-end');
    s+=T(L.x-6,Y(1)+10,DD_FLTXT.worse,'t-xs t-end')+T(L.x-6,Y(0),DD_FLTXT.better,'t-xs t-end');
    s+=`<line x1="${f1(X(8))}" x2="${f1(X(8))}" y1="${L.y}" y2="${L.y+L.h}" style="stroke:var(--bad);stroke-width:1.6;stroke-dasharray:5 4"/>`+kitLabel(X(8)+5,L.y+14,DD_FLTXT.w8,{halo:'var(--field)'});
    s+=`<path d="M${f1(X(F.tx))} ${L.y+L.h}V${L.y+L.h-14}" style="stroke:var(--rx);stroke-width:2"/>`+kitLabel(X(F.tx)+4,L.y+L.h-18,DD_FLTXT.tx,{halo:'var(--field)'});
    let n=0,late=false;F.ev.forEach((e,i)=>{if(wk<e+.15)return;n++;const x=X(e),y=Y(f(e));
      s+=`<circle cx="${f1(x)}" cy="${f1(y+16)}" r="9" style="fill:var(--panel);stroke:var(--bad);stroke-width:2"/>`+T(x,y+19.5,i+1,'t-xs t-mid','fill:var(--bad);font-weight:700')});
    if(F.late!=null&&wk>=F.late)late=true;
    /* counter */
    const rx=N?L.x:L.rx,ry=N?L.ry:L.y+20;
    s+=T(rx,ry,DD_FLTXT.n,'t-xs')+T(rx,ry+28,String(n),'t-big','font-size:28px;fill:'+(n>=3?'var(--bad)':'var(--ink)'));
    s+=T(N?rx+170:rx,N?ry:ry+60,DD_FLTXT.late,'t-xs')+T(N?rx+170:rx,N?ry+26:ry+86,late?DD_FLTXT.yes:DD_FLTXT.no,'t-lbl',late?'fill:var(--bad)':'');
    fl.innerHTML=s;
    fcap.innerHTML=t>=.999?F.done:DD_FLTXT.wk.replace('{w}',wk.toFixed(1))}
  const fstop=playWire(frg,$('#ddFlPlay'),flDraw,12000,'Replay','ddx');
  $$('[data-ddc]').forEach(b=>b.addEventListener('click',()=>{fstop();sc=b.dataset.ddc;$$('[data-ddc]').forEach(x=>x.setAttribute('aria-pressed',x===b));flDraw(+frg.value)}));
  flDraw(+frg.value);
  const prev=redraws.ddx;redraws.ddx=()=>{prev&&prev();cmpUpd()};
};
/* =============== 3.1 Breathing & the 20/30/40 rule =============== */
/* Widgets: the falling vital capacity (main player), the 20/30/40 checker, the Green 2018 forest plot, EGRIS and mEGRIS.
   The VC curve and the single-breath count are schematic; every threshold drawn is a published value cited in the HTML. */
const BR_INT=.8; /* the timeline point where the schematic person is intubated */
const BR_VC=monoFn([ [0,45],[.2,44],[.35,38.5],[.5,30],[.62,22.5],[.7,19],[BR_INT,15.2] ]);
const BR_SBC=monoFn([ [0,30],[.3,28],[.5,22],[.62,19.5],[.7,17],[.77,14],[BR_INT,13] ]);
const BR_LINES=[
 {v:31.5,t:'a fall of more than 30%',col:'var(--warn)'},
 {v:20,t:'20 mL/kg: Lawn\'s risk line',col:'var(--accent)'},
 {v:15,t:'15: imminent failure range',col:'var(--bad)'},
 {v:10,t:'10: ventilation almost inevitable',col:'var(--bad)'}];
const BR_STEPS=[
 {from:0,at:.05,k:'Admission',t:'Measure, do not wait',
  txt:'Weakness is climbing. Vital capacity (VC), the most air that can be blown out after a full breath, is still near this person\'s starting value. The EAN/PNS guideline\'s good practice point is to check forced vital capacity three to six times a day depending on severity, and about every 4 hours while it is falling <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>.',
  pt:'You may be asked to blow hard into a tube, or to count aloud on one breath, many times a day. It feels repetitive. It is how a team spots a change early <sup class="c" data-ref="vanDoorn2023,Leonhard2019" title="Source 266,473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">266,473</a></sup>.'},
 {from:.18,at:.3,k:'Hours to days',t:'A silent fall',
  txt:'VC starts to drop, but the person does not feel short of breath. Classical signs of respiratory distress come too late to guide care <sup class="c" data-ref="Orlikowski2004" title="Source 339"><a href="/guillain-barre-syndrome/sources/#src-Orlikowski2004">339</a></sup>, and failure can occur without breathlessness <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>. In one small series, VC fell over the 48 hours before failure in everyone who needed intubation <sup class="c" data-ref="Chevrolet1991" title="Source 76"><a href="/guillain-barre-syndrome/sources/#src-Chevrolet1991">76</a></sup>.',
  hook:'Breathlessness can be absent: serial VC comes first <sup class="c" data-ref="Orlikowski2004,Leonhard2019" title="Source 266,339"><a href="/guillain-barre-syndrome/sources/#src-Orlikowski2004">266,339</a></sup>.'},
 {from:.44,at:.5,k:'A warning line',t:'More than 30% down',
  txt:'Lawn\'s rule counts a fall of more than 30% in VC, MIP or MEP as a risk sign on its own <sup class="c" data-ref="Lawn2001" title="Source 263"><a href="/guillain-barre-syndrome/sources/#src-Lawn2001">263</a></sup>. The EAN/PNS guideline calls a fall over 30% below predicted baseline a concern, and a fall over 30% within 24 hours likely means immediate transfer to intensive care <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>. The single breath count is shrinking too: under 20 is a useful transfer tool <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>.',
  pt:'Numbers that keep dropping matter even when the person feels all right.'},
 {from:.6,at:.67,k:'20 mL/kg',t:'The 20 mL/kg line',
  txt:'Below 20 mL/kg the 20/30/40 rule flags risk of respiratory failure <sup class="c" data-ref="Lawn2001" title="Source 263"><a href="/guillain-barre-syndrome/sources/#src-Lawn2001">263</a></sup>, and the EAN/PNS guideline says elective ventilation should be considered at 20 mL/kg or less <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>. Planning ahead lets intubation happen calmly instead of in an emergency.',
  hook:'20/30/40: VC under 20 mL/kg, MIP under 30, MEP under 40 cmH₂O, or a fall over 30% <sup class="c" data-ref="Lawn2001" title="Source 263"><a href="/guillain-barre-syndrome/sources/#src-Lawn2001">263</a></sup>.'},
 {from:.73,at:.765,k:'Imminent',t:'Imminent failure',
  txt:'The ten-steps guideline lists signs of imminent respiratory insufficiency: breathless at rest or while talking, cannot count to 15 in one breath, accessory muscle use, a raised breathing or heart rate, VC under 15 to 20 mL/kg or under 1 L, or an abnormal blood gas or oximetry <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>. In one series of 10, intubation came at a mean of 15.2 mL/kg <sup class="c" data-ref="Chevrolet1991" title="Source 76"><a href="/guillain-barre-syndrome/sources/#src-Chevrolet1991">76</a></sup>.',
  hook:'Cannot count to 15 on one breath is a sign of imminent failure <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.'},
 {from:BR_INT,at:.9,k:'Ventilated',t:'The ventilator takes over',
  txt:'A tube now carries air to the lungs and the ventilator does the work of the weak muscles. At 10 mL/kg or less, ventilation is described as almost inevitable <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>. In 81 intubated people, early pneumonia was more likely when intubation came more than 2 days after admission <sup class="c" data-ref="Orlikowski2006" title="Source 340"><a href="/guillain-barre-syndrome/sources/#src-Orlikowski2006">340</a></sup>. Module 3.6 follows the time in intensive care.',
  pt:'Being on a breathing machine is a support, not a failure. Many people who needed one walk again, though it can take a long time <sup class="c" data-ref="Fletcher2000,vanDenBerg2018" title="Source 129,466"><a href="/guillain-barre-syndrome/sources/#src-Fletcher2000">129,466</a></sup>.'}];
/* 20/30/40 rows: published thresholds <sup class="c" data-ref="Lawn2001" title="Source 263"><a href="/guillain-barre-syndrome/sources/#src-Lawn2001">263</a></sup> */
const BR_RULE=[
 {id:'brVc',lab:'Vital capacity',sh:'VC',unit:'mL/kg',max:60,th:20,below:true},
 {id:'brMip',lab:'Max. inspiratory pressure',sh:'MIP',unit:'cmH₂O',max:100,th:30,below:true},
 {id:'brMep',lab:'Max. expiratory pressure',sh:'MEP',unit:'cmH₂O',max:120,th:40,below:true},
 {id:'brFall',lab:'Fall from first value',sh:'Fall',unit:'%',max:70,th:30,below:false}];
const BR_RULE_TXT={none:'None of the four limbs is crossed. In Lawn\'s series, the rule flags risk only when at least one is <sup class="c" data-ref="Lawn2001" title="Source 263"><a href="/guillain-barre-syndrome/sources/#src-Lawn2001">263</a></sup>.',
 some:'At least one limb of the rule is crossed. In Lawn\'s series of 114 people in intensive care, this marked a risk of respiratory failure. It describes a group, not a decision for one person <sup class="c" data-ref="Lawn2001" title="Source 263"><a href="/guillain-barre-syndrome/sources/#src-Lawn2001">263</a></sup>.'};
/* Green 2018 pooled odds ratios with 95% CI */
const BR_FOREST=[
 {t:'Bulbar weakness',or:9.0,lo:3.94,hi:20.6,v:'9.0 (3.94–20.6)'},
 {t:'Neck weakness',or:6.36,lo:2.32,hi:17.5,v:'6.36 (2.32–17.5)'},
 {t:'Autonomic instability',or:6.40,lo:2.83,hi:14.5,v:'6.40 (2.83–14.5)'},
 {t:'Facial weakness',or:3.74,lo:2.05,hi:6.81,v:'3.74 (2.05–6.81)'}];
/* EGRIS bands, % ventilated within 1 week <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup> */
const BR_EG_BANDS=[
 {lo:0,hi:2,k:4,t:'Low',r:'0 to 2',col:'var(--good)'},
 {lo:3,hi:4,k:24,t:'Intermediate',r:'3 to 4',col:'var(--warn)'},
 {lo:5,hi:7,k:65,t:'High',r:'5 to 7',col:'var(--bad)'}];
const BR_EG_OUT=[
 'Score {s} of 7: the low band (0 to 2). In the guideline\'s figures, about 4 in 100 people in this band needed ventilation within 1 week <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.',
 'Score {s} of 7: the intermediate band (3 to 4). In the guideline\'s figures, about 24 in 100 people in this band needed ventilation within 1 week <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.',
 'Score {s} of 7: the high band (5 or more). In the guideline\'s figures, about 65 in 100 people in this band needed ventilation within 1 week <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.'];
const BR_MG_OUT='mEGRIS total: {s} of 32.';
const BR_MG_EX='This matches the paper\'s worked example: bulbar weakness (5), admitted 1 day after onset (6), neck flexion grade 4 (2) and hip flexion 3 on each side (4) make 17. The paper gives predicted risks of 17% within 1 day and 26% within 3 days; for 1 week its text says 35% and its figure caption 32% <sup class="c" data-ref="Luijten2023" title="Source 279"><a href="/guillain-barre-syndrome/sources/#src-Luijten2023">279</a></sup>.';
const BR_MG_NOEX='Higher totals mean higher predicted risk in the derivation cohort. The paper converts totals into risks (0 to 100%) with a figure not reproduced here; set the inputs to its worked example (bulbar yes, 1 day, neck 4, hips 3 and 3) to see the quoted figures <sup class="c" data-ref="Luijten2023" title="Source 279"><a href="/guillain-barre-syndrome/sources/#src-Luijten2023">279</a></sup>.';

inits.breathing=()=>{
  /* ---------- main player ---------- */
  const svg=$('#brSvg'),rg=$('#brT');let setSt=()=>{};
  function draw(t){
    const N=vb(svg,'720 380','400 656');
    const L=N?{hx:12,hy:20,bx:70,by:34,bs:180,lx:146,ly:56,ls:1.4,qx:12,qy:250,sx:12,sy:306,sw:376,cx:44,cy:368,cw:340,ch:226,rx:12,ry:646}
             :{hx:14,hy:22,bx:72,by:40,bs:206,lx:140,ly:72,ls:1.2,qx:14,qy:274,sx:14,sy:330,sw:286,cx:352,cy:40,cw:348,ch:244,rx:352,ry:342};
    const vent=t>=BR_INT,tc=Math.min(t,BR_INT),vc=BR_VC(tc),a=clamp(vc/45),sbc=Math.round(BR_SBC(tc));
    const ph=.5+.5*Math.sin(t*Math.PI*2*44);
    let s=`<text x="${L.hx}" y="${L.hy}" class="t-xs" style="fill:var(--ink);font-weight:700;letter-spacing:.06em">THE PERSON</text>`;
    s+=bodyFront(L.bx,L.by,L.bs,{level:lerp(.3,.78,ease(ramp(t,0,BR_INT))),vent}).svg;
    const fill=vent?lerp(.3,.92,ph):lerp(.5-a*.46,.5+a*.46,ph);
    const Lg=lungs(L.lx,L.ly,L.ls,{fill,weak:vent?.8:1-a,tube:vent});s+=Lg.svg;
    s+=kitLabel(Lg.at.diaphragm[0],Lg.at.diaphragm[1]+(N?30:26),vent?'weak diaphragm, rested':a<.6?'diaphragm weakening':'diaphragm',{a:'m'});
    /* how it feels */
    const fl=vent?'Supported by the ventilator':t>=.73?'Yes, and neck muscles help':'Not yet: signs come late';
    s+=`<text x="${L.qx}" y="${L.qy}" class="t-sm">Feels short of breath?</text><text x="${L.qx}" y="${L.qy+18}" class="t-lbl">${fl}</text>`;
    /* single breath count */
    const SX=v=>L.sx+L.sw*v/30;
    s+=`<text x="${L.sx}" y="${L.sy-10}" class="t-xs" style="fill:var(--ink);font-weight:700;letter-spacing:.06em">SINGLE BREATH COUNT</text>`;
    s+=`<rect x="${L.sx}" y="${L.sy}" width="${L.sw}" height="14" rx="7" style="fill:var(--panel-2)"/>`;
    if(!vent){const col=sbc<15?'var(--bad)':sbc<20?'var(--warn)':'var(--good)';s+=`<rect x="${L.sx}" y="${L.sy}" width="${f1(SX(sbc)-L.sx)}" height="14" rx="7" style="fill:${col}"/>`;
      s+=`<text x="${L.sx+L.sw}" y="${L.sy-10}" class="t-sm t-end" style="fill:var(--ink);font-weight:700">counts to ${sbc}</text>`}
    else s+=`<text x="${L.sx+L.sw}" y="${L.sy-10}" class="t-sm t-end" style="fill:var(--ink);font-weight:700">no count: tube in</text>`;
    [0,15,20].forEach(v=>{const x=SX(v);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${L.sy-3}" y2="${L.sy+17}" style="stroke:var(--ink);stroke-width:${v?1.4:0}"/><text x="${f1(x)}" y="${L.sy+30}" class="t-xs t-mid">${v}</text>`});
    /* the VC chart */
    const C=curve(L.cx,L.cy,L.cw,L.ch,BR_VC,{x0:0,x1:1,y0:0,y1:50,upto:tc,col:'var(--rx)',dot:!vent,lw:3});
    s+=C.svg;
    [0,10,20,30,40,50].forEach(y=>{s+=`<text x="${L.cx-6}" y="${f1(C.Y(y)+3)}" class="t-xs t-end">${y}</text>`});
    s+=`<text x="${L.cx}" y="${L.cy-8}" class="t-xs" style="fill:var(--ink);font-weight:700">vital capacity, mL/kg</text>`;
    s+=`<text x="${L.cx+L.cw}" y="${L.cy+L.ch+15}" class="t-xs t-end">time: schematic, no scale</text>`;
    BR_LINES.forEach(l=>{const y=C.Y(l.v);s+=`<line x1="${L.cx}" x2="${L.cx+L.cw}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:${l.col};stroke-width:1.4;stroke-dasharray:6 4"/>`+kitLabel(L.cx+6,y-4,l.t,{halo:'var(--field)'})});
    if(vent){const x=C.X(BR_INT),w=L.cx+L.cw-x;
      s+=`<rect x="${f1(x)}" y="${L.cy}" width="${f1(w)}" height="${L.ch}" style="fill:var(--device);opacity:.14"/><line x1="${f1(x)}" x2="${f1(x)}" y1="${L.cy}" y2="${L.cy+L.ch}" style="stroke:var(--device);stroke-width:2"/>`;
      s+=kitLabel(x-5,L.cy+14,'intubated',{a:'e',halo:'var(--field)'})+kitLabel(x+w/2,L.cy+L.ch*.42,'ventilator',{a:'m',halo:'var(--field)'})}
    const dn=Math.round(100*(1-vc/45));
    s+=`<text x="${L.rx}" y="${L.ry}" class="t-sm">${vent?'VC at intubation about 15 mL/kg':`VC about ${Math.round(vc)} mL/kg, ${dn}% below start`}</text>`;
    svg.innerHTML=s;
    const p=phaseOf(BR_STEPS,t);setSt(p);$('#brNote').innerHTML=noteHTML(BR_STEPS[p]);
  }
  const stop=playWire(rg,$('#brPlay'),draw,16000,'Replay','breathing');
  setSt=stepWire($('#brSteps'),BR_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- 20/30/40 checker ---------- */
  const rs=$('#brRule');
  function drawRule(){
    const N=vb(rs,'720 230','400 330');
    const L=N?{x:12,w:300,y0:24,dy:76,lab:0,bar:22,st:388}:{x:250,w:330,y0:30,dy:52,lab:0,bar:0,st:706};
    let s='',hit=0;
    BR_RULE.forEach((r,i)=>{const v=+$('#'+r.id).value,on=r.below?v<r.th:v>r.th,y=L.y0+i*L.dy,by=y+L.bar,X=u=>L.x+L.w*u/r.max;
      $('#'+r.id+'O').textContent=v;if(on)hit++;
      const lx=N?12:14;
      s+=`<text x="${lx}" y="${y+(N?4:15)}" class="t-lbl">${N?r.sh+' · '+r.unit:r.lab}</text>`;
      if(!N)s+=`<text x="${lx}" y="${y+30}" class="t-xs">${r.unit}</text>`;
      s+=`<rect x="${L.x}" y="${by+4}" width="${L.w}" height="16" rx="8" style="fill:var(--panel-2)"/>`;
      s+=`<rect x="${L.x}" y="${by+4}" width="${f1(Math.max(4,X(v)-L.x))}" height="16" rx="8" style="fill:${on?'var(--bad)':'var(--good)'};opacity:.85"/>`;
      const tx=X(r.th);s+=`<line x1="${f1(tx)}" x2="${f1(tx)}" y1="${by-2}" y2="${by+26}" style="stroke:var(--ink);stroke-width:2"/><text x="${f1(tx)}" y="${by+38}" class="t-xs t-mid" style="fill:var(--ink)">${r.below?'under ':'over '}${r.th}</text>`;
      s+=`<text x="${L.st}" y="${N?y+4:by+16}" class="t-sm t-end" style="fill:var(--ink);font-weight:700">${v}${r.unit==='%'?'%':''}: ${on?'crosses':'clear'}</text>`});
    rs.innerHTML=s;
    $('#brRuleOut').innerHTML=`<b>${hit} of 4 crossed.</b> `+(hit?BR_RULE_TXT.some:BR_RULE_TXT.none);
  }
  BR_RULE.forEach(r=>$('#'+r.id).addEventListener('input',drawRule));

  /* ---------- forest plot ---------- */
  const fs=$('#brForest');
  function drawForest(){
    const N=vb(fs,'720 210','400 300');
    const L=N?{px:12,pw:270,y0:30,dy:62,lab:-16,vx:388,ax:282}:{px:230,pw:330,y0:34,dy:38,lab:4,vx:706,ax:196};
    const lmin=Math.log(1),lmax=Math.log(25),X=v=>L.px+L.pw*(Math.log(v)-lmin)/(lmax-lmin);
    let s='';const yb=L.y0+BR_FOREST.length*L.dy-L.dy/2+8;
    [1,2,5,10,20].forEach(v=>{const x=X(v);s+=`<line x1="${f1(x)}" x2="${f1(x)}" y1="${L.y0-14}" y2="${yb}" style="stroke:var(--line);stroke-width:${v===1?2:1}${v===1?'':';stroke-dasharray:2 4'}"/><text x="${f1(x)}" y="${yb+14}" class="t-xs t-mid">${v}</text>`});
    s+=`<text x="${L.px+L.pw}" y="${yb+28}" class="t-xs t-end">odds ratio, log scale (1 = no difference)</text>`;
    BR_FOREST.forEach((r,i)=>{const y=L.y0+i*L.dy;
      s+=`<text x="${N?L.px:14}" y="${y+L.lab}" class="t-lbl">${r.t}</text>`;
      s+=`<line x1="${f1(X(r.lo))}" x2="${f1(X(r.hi))}" y1="${y}" y2="${y}" style="stroke:var(--ink);stroke-width:2"/><rect x="${f1(X(r.or)-6)}" y="${y-6}" width="12" height="12" style="fill:var(--rx)"/>`;
      s+=`<text x="${L.vx}" y="${y+4}" class="t-sm t-end" style="fill:var(--ink)">${r.v}</text>`});
    fs.innerHTML=s;
  }

  /* ---------- EGRIS ---------- */
  const es=$('#brEgSvg');
  function drawEg(){
    const sc=+$('#brEgDays').value + +$('#brEgFb').value + +$('#brEgMrc').value,bi=sc<=2?0:sc<=4?1:2,B=BR_EG_BANDS[bi];
    const N=vb(es,'720 230','400 490');
    const L=N?{gx:200,gy:120,gr:96,ix:80,iy:226,cols:10,sz:20}:{gx:140,gy:132,gr:112,ix:312,iy:48,cols:20,sz:16};
    let s=gauge(L.gx,L.gy,L.gr,sc,7,{bands:BR_EG_BANDS.map(b=>({to:b.hi+(b.hi===7?0:.5),col:b.col}))});
    s+=`<text x="${L.gx}" y="${L.gy+40}" class="t-big t-mid" style="font-size:30px">${sc} of 7</text>`;
    s+=`<text x="${L.gx}" y="${L.gy+62}" class="t-lbl t-mid">${B.t} band (${B.r})</text>`;
    const I=icons(L.ix,L.iy,{n:100,cols:L.cols,k:B.k,size:L.sz,gap:N?4:3,col:'var(--rx)'});s+=I.svg;
    s+=`<text x="${L.ix}" y="${L.iy-12}" class="t-xs" style="fill:var(--ink);font-weight:700">${B.k} in 100 ventilated within 1 week, in this band</text>`;
    es.innerHTML=s;
    $('#brEgOut').innerHTML=BR_EG_OUT[bi].replace('{s}',sc);
  }
  ['#brEgDays','#brEgFb','#brEgMrc'].forEach(id=>$(id).addEventListener('change',drawEg));

  /* ---------- mEGRIS ---------- */
  function drawMg(){
    const hip=+$('#brMgHipR').value + +$('#brMgHipL').value,sc=+$('#brMgBul').value + +$('#brMgDays').value + +$('#brMgNeck').value+(10-hip);
    $('#brMgBar').style.width=(100*sc/32).toFixed(1)+'%';
    const ex=+$('#brMgBul').value===5&&+$('#brMgDays').value===6&&+$('#brMgNeck').value===2&&+$('#brMgHipR').value===3&&+$('#brMgHipL').value===3;
    $('#brMgOut').innerHTML=`<b>${BR_MG_OUT.replace('{s}',sc)}</b> `+(ex?BR_MG_EX:BR_MG_NOEX);
  }
  ['#brMgBul','#brMgDays','#brMgNeck','#brMgHipR','#brMgHipL'].forEach(id=>$(id).addEventListener('change',drawMg));

  drawRule();drawForest();drawEg();drawMg();
  const prev=redraws.breathing;redraws.breathing=()=>{prev&&prev();drawRule();drawForest();drawEg()};
};
/* =============== 3.2 IVIg =============== */
/* Three players: the main story (pool, course, the attack it meets, proposed actions, IgG levels, the trial verdict),
   a regimen arithmetic explorer, and a clickable map of the label warnings. Every number is from research pass E;
   drawings are schematic. The IgG panel joins published medians with straight lines and says so. */
const IV_STEPS=[
 {from:0,at:.05,k:'Step 1 · the product',sv:'Pooled from many donors',sub:'polyclonal IgG from thousands of people',
  t:'Antibodies pooled from many donors',
  txt:'IVIg is polyclonal serum IgG pooled from thousands of donors; the Bivigam label states not less than 1,000 donors per pool <sup class="c" data-ref="Lunemann2015,FDA-Bivigam" title="Source 118,280"><a href="/guillain-barre-syndrome/sources/#src-Lunemann2015">118,280</a></sup>. Because it is a blood product, labels also warn of a theoretical risk of transmissible agents, such as CJD <sup class="c" data-ref="FDA-Bivigam" title="Source 118"><a href="/guillain-barre-syndrome/sources/#src-FDA-Bivigam">118</a></sup>.',
  pt:'IVIg is a drip of antibodies collected from many blood donors <sup class="c" data-ref="Lunemann2015" title="Source 280"><a href="/guillain-barre-syndrome/sources/#src-Lunemann2015">280</a></sup>.',
  hook:'IVIg = pooled polyclonal IgG, at least 1,000 donors per pool on the Bivigam label <sup class="c" data-ref="FDA-Bivigam" title="Source 118"><a href="/guillain-barre-syndrome/sources/#src-FDA-Bivigam">118</a></sup>.'},
 {from:.16,at:.24,k:'Step 2 · the course',sv:'Five days, 2 g/kg in all',sub:'0.4 g/kg a day for 5 days, as published',
  t:'The published course: 0.4 g/kg a day for 5 days',
  txt:'The 2023 EAN/PNS guideline strongly recommends starting IVIg as soon as possible in people unable to walk unaided (GBS disability score 3 or more) within 2 weeks of onset of weakness, and weakly recommends the standard 0.4 g/kg/day for 5 days over shorter, longer or 2-day courses <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>. The total is 2 g/kg: at 70 kg, 28 g a day and 140 g in all (arithmetic) <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>. Quoted as published, not as instructions.',
  pt:'It is usually given once a day for 5 days <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>.',
  hook:'IVIg 0.4 g/kg/day × 5 days = 2 g/kg, within 2 weeks of onset <sup class="c" data-ref="vanDoorn2023,Leonhard2019" title="Source 266,473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">266,473</a></sup>.'},
 {from:.33,at:.4,k:'Step 3 · the target',sv:'What it meets at the nerve',sub:'antibodies on the node, complement, macrophages',
  t:'The attack IVIg meets',
  txt:'In the antibody-mediated forms of GBS, anti-ganglioside antibodies bind the nerve membrane and complement is activated, ending in membrane attack complexes; macrophages then move in. This module asks how a flood of donor IgG might interrupt that chain. Module 1.3 shows the attack itself.',
  pt:'In GBS, the body\'s own antibodies stick to the nerve and call in other parts of the immune system that damage it.',
  hook:'IVIg and plasma exchange both target the antibody-driven part of the attack; neither repairs nerve directly.'},
 {from:.5,at:.58,k:'Step 4 · how it might work',sv:'Three proposed actions',sub:'none proven in people with GBS',
  t:'How IVIg might work: the mechanism is not settled',
  txt:'A 2015 review says IVIg\'s mechanisms "are poorly understood" <span class="ev est">Established</span> <sup class="c" data-ref="Lunemann2015" title="Source 280"><a href="/guillain-barre-syndrome/sources/#src-Lunemann2015">280</a></sup>. Proposed actions include blocking complement and membrane attack complex formation, saturating macrophage Fc receptors, neutralising pathogenic cytokines and antibodies, and speeding antibody breakdown <span class="ev hyp">Hypothesis</span> <sup class="c" data-ref="Dalakas1998,Rajabally2022" title="Source 87,369"><a href="/guillain-barre-syndrome/sources/#src-Dalakas1998">87,369</a></sup>. Anti-idiotype neutralisation has lab support: IVIg reduced the nerve-blocking activity of GBS sera on mouse muscle, and Fab fragments worked as well as whole IVIg <span class="ev early">Early evidence</span> <sup class="c" data-ref="Buchwald2002,Yuki1996" title="Source 61,528"><a href="/guillain-barre-syndrome/sources/#src-Buchwald2002">61,528</a></sup>.',
  pt:'Nobody knows exactly how IVIg helps. It may mop up the harmful antibodies, or stop other parts of the immune system from doing damage <sup class="c" data-ref="Lunemann2015,Rajabally2022" title="Source 280,369"><a href="/guillain-barre-syndrome/sources/#src-Lunemann2015">280,369</a></sup>.',
  hook:'IVIg mechanism: proposed, not proven; many actions come from lab or animal work, not human tissue <sup class="c" data-ref="Dalakas2014" title="Source 88"><a href="/guillain-barre-syndrome/sources/#src-Dalakas2014">88</a></sup>.'},
 {from:.67,at:.76,k:'Step 5 · in the blood',sv:'IgG rises, then falls',sub:'median serum IgG in the SID-GBS trial',
  t:'Serum IgG after one course, and after two',
  txt:'In the SID-GBS pharmacokinetic analysis, median IgG went from 12.5 g/L at baseline to 21.2 g/L at week 2 and 15.4 g/L at week 4 after one course; with a second course it reached 35.5 g/L at week 2 <sup class="c" data-ref="vanTilburg2025" title="Source 477"><a href="/guillain-barre-syndrome/sources/#src-vanTilburg2025">477</a></sup>. In 174 Dutch people the rise at 2 weeks varied widely (mean 7.8 g/L, SD 5.6), and a small rise was linked to slower recovery <sup class="c" data-ref="Kuitwaard2009Pharm" title="Source 246"><a href="/guillain-barre-syndrome/sources/#src-Kuitwaard2009Pharm">246</a></sup>. Yet a second course raised IgG without improving outcome <sup class="c" data-ref="vanTilburg2025,Walgaard2021" title="Source 477,499"><a href="/guillain-barre-syndrome/sources/#src-vanTilburg2025">477,499</a></sup>.',
  pt:'After IVIg, the antibody level in the blood goes up and then slowly comes down again. How high it goes differs a lot between people <sup class="c" data-ref="Kuitwaard2009Pharm" title="Source 246"><a href="/guillain-barre-syndrome/sources/#src-Kuitwaard2009Pharm">246</a></sup>.',
  hook:'Low ΔIgG is associated with poor outcome, but giving more IVIg (SID-GBS) did not help <sup class="c" data-ref="Kuitwaard2009Pharm,Walgaard2021" title="Source 246,499"><a href="/guillain-barre-syndrome/sources/#src-Kuitwaard2009Pharm">246,499</a></sup>.'},
 {from:.84,at:.93,k:'Step 6 · the verdict',sv:'As good as plasma exchange',sub:'the head-to-head trials and Cochrane',
  t:'Equal to plasma exchange, easier to complete',
  txt:'In the Dutch trial, 53% improved by a grade or more at 4 weeks with IVIg against 34% with plasma exchange <sup class="c" data-ref="vanDerMeche1992" title="Source 468"><a href="/guillain-barre-syndrome/sources/#src-vanDerMeche1992">468</a></sup>. In the larger 1997 trial, mean improvement was 0.8 grade with IVIg and 0.9 with plasma exchange, a difference that was not significant <sup class="c" data-ref="PSGBS1997" title="Source 362"><a href="/guillain-barre-syndrome/sources/#src-PSGBS1997">362</a></sup>. Cochrane found 0.02 grade more improvement with IVIg (95% CI -0.20 to 0.25) and IVIg "significantly much more likely to be completed" <sup class="c" data-ref="Hughes2014" title="Source 199"><a href="/guillain-barre-syndrome/sources/#src-Hughes2014">199</a></sup>.',
  pt:'IVIg and plasma exchange work about equally well. IVIg is often chosen because it is easier to give <sup class="c" data-ref="vanDoorn2023,Leonhard2019" title="Source 266,473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">266,473</a></sup>.',
  hook:'IVIg = plasma exchange in efficacy; no adequate placebo-controlled adult IVIg trial exists, so the evidence is indirect <sup class="c" data-ref="Hughes2014,vanDoorn2023" title="Source 199,473"><a href="/guillain-barre-syndrome/sources/#src-Hughes2014">199,473</a></sup>.'}
];
/* labels drawn inside the SVGs */
const IV_L={
  donors:'donors',pool:'one pool',bag:'IVIg',polyW:['polyclonal IgG','pooled from thousands','of donors'],polyN:['polyclonal IgG from','thousands of donors'],
  label1000:'Bivigam label: at least 1,000 per pool',
  day:'Day',perDay:'0.4 g/kg',total:'course total',zero:'0',twoG:'2 g/kg',
  ex70:'Arithmetic at 70 kg: 28 g a day, 140 g in all',exGuide:'Published window: within 2 weeks of onset',
  exGuideN:'Window: within 2 weeks of onset',
  attack1:'anti-ganglioside antibodies bind the node',attack2:'complement punches pores',macro:'macrophage',
  attackN1:'antibodies bind the node,',attackN2:'complement punches pores',
  act:[
   {t:'Neutralise the antibody',tag:'EARLY EVIDENCE',cls:'early',l:['donor IgG binds the','harmful antibody\'s tips','(anti-idiotype; lab data)']},
   {t:'Block complement',tag:'HYPOTHESIS',cls:'hyp',l:['fewer membrane attack','pores form','(inferred across diseases)']},
   {t:'Busy the macrophage',tag:'HYPOTHESIS',cls:'hyp',l:['donor IgG fills the','Fc receptors it uses','to grab coated targets']}],
  harm:'harmful antibody',donor:'donor IgG',gangl:'ganglioside left free',
  igY:'serum IgG, g/L',igX:'days from first dose',wk:['baseline','week 2','week 4'],
  one:'one course (median, IQR)',two:'second course (median, IQR)',days15:'IVIg days 1 to 5',
  igNote1:'Lines join medians; the path',igNote2:'between them was not measured.',
  igK1:'Rise at 2 weeks (174 people):',igK2:'mean 7.8 g/L, SD 5.6',igK3:'A small rise went with slower',igK4:'recovery, but a second course',igK5:'did not improve outcome.',
  v1:'Dutch trial 1992: improved 1 grade or more at 4 weeks',v1N:['Dutch trial 1992: improved','1 grade or more at 4 weeks'],
  v2:'1997 trial: mean grade improvement at 4 weeks',v2N:['1997 trial: mean grade','improvement at 4 weeks'],
  v3:'Cochrane 2014: IVIg minus plasma exchange (5 trials, 536 people)',v3N:['Cochrane 2014: IVIg minus plasma','exchange (5 trials, 536 people)'],
  pe:'Plasma exchange',ivig:'IVIg',both:'PE then IVIg',favPE:'favours PE',favIV:'favours IVIg',grade:'grade'
};
/* the regimen explorer: courses compared in the guideline, quoted as published */
const IV_REG={
  std:{n:5,d:.4,name:'Standard: 0.4 g/kg a day for 5 days',
    s:'The 2023 EAN/PNS guideline weakly recommends this standard course over a low-dose, high-dose or 2-day course <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>. The 1992 and 1997 trials used it <sup class="c" data-ref="vanDerMeche1992,PSGBS1997" title="Source 362,468"><a href="/guillain-barre-syndrome/sources/#src-vanDerMeche1992">362,468</a></sup>.'},
  low:{n:3,d:.4,name:'Lower: 0.4 g/kg a day for 3 days',
    s:'The EAN/PNS panel considered the evidence too thin to support a lower dose than standard <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>. In a trial of 3 versus 6 days in 39 people who could not have plasma exchange, improvement was non-significantly faster with 6 days (low certainty) <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>.'},
  high:{n:6,d:.4,name:'Higher: 0.4 g/kg a day for 6 days',
    s:'In that 39-person trial, 6 days gave non-significantly faster improvement, with a significant difference only in the ventilated subgroup (low certainty). The panel did not support a higher dose than standard <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>.'},
  two:{n:2,d:1,name:'Two days: 1 g/kg a day for 2 days',
    s:'In a German trial in children, 2 days versus 5 days made no significant difference to recovery (median time to unaided walking 19 versus 13 days), but early transient worsening was more frequent with 2 days: 5 of 23 against 0 of 23 <sup class="c" data-ref="Korinthenberg2005" title="Source 236"><a href="/guillain-barre-syndrome/sources/#src-Korinthenberg2005">236</a></sup>. The EAN/PNS panel found the evidence too thin to support a 2-day course <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>.'}
};
const IV_DOSE_TPL='At {w} kg: {d} g a day for {n} days, {T} g in all ({k} g/kg).';
/* the safety map: label warnings, quoted from the US labels */
const IV_SAFE=[
  {id:'clot',lab:'Blood clots',short:'Clots',t:'Thrombosis (boxed warning)',
   s:'All current labels carry a boxed warning for thrombosis, renal dysfunction and acute renal failure <sup class="c" data-ref="FDA-Bivigam,FDA-Asceniv" title="Source 117,118"><a href="/guillain-barre-syndrome/sources/#src-FDA-Bivigam">117,118</a></sup>. Label risk factors include advanced age, prolonged immobilisation, hypercoagulable states, past thrombosis, oestrogens, central venous catheters, hyperviscosity and cardiovascular risk factors; thrombosis can occur without any <sup class="c" data-ref="FDA-Bivigam" title="Source 118"><a href="/guillain-barre-syndrome/sources/#src-FDA-Bivigam">118</a></sup>. In US admissions data, the odds of venous thromboembolism in the 30 days after IVIg for neurological disease were raised (OR 3.33, 95% CI 1.34 to 8.30), as they were after plasma exchange (OR 4.29) <sup class="c" data-ref="Jin2020" title="Source 214"><a href="/guillain-barre-syndrome/sources/#src-Jin2020">214</a></sup>.'},
  {id:'kid',lab:'Kidneys',short:'Kidneys',t:'Renal dysfunction and acute renal failure (boxed warning)',
   s:'Label risk factors for renal failure: pre-existing renal insufficiency, diabetes, age over 65, volume depletion, sepsis, paraproteinaemia and nephrotoxic drugs. Risk is reported as higher with sucrose-containing products <sup class="c" data-ref="FDA-GamunexC,FDA-Bivigam" title="Source 118,120"><a href="/guillain-barre-syndrome/sources/#src-FDA-GamunexC">118,120</a></sup>.'},
  {id:'head',lab:'Head',short:'Head',t:'Headache and aseptic meningitis',
   s:'Aseptic meningitis syndrome usually begins within several hours to 2 days of treatment, may be more frequent with high doses (2 g/kg) or rapid infusion, and has remitted within several days of stopping <sup class="c" data-ref="FDA-Bivigam" title="Source 118"><a href="/guillain-barre-syndrome/sources/#src-FDA-Bivigam">118</a></sup>. Headache was among the common reactions in an immunodeficiency trial, which was not a GBS population at GBS doses <sup class="c" data-ref="FDA-Bivigam" title="Source 118"><a href="/guillain-barre-syndrome/sources/#src-FDA-Bivigam">118</a></sup>.'},
  {id:'lung',lab:'Lungs',short:'Lungs',t:'Transfusion-related acute lung injury',
   s:'Labels warn of transfusion-related acute lung injury (TRALI), typically 1 to 6 hours after treatment <sup class="c" data-ref="FDA-Bivigam" title="Source 118"><a href="/guillain-barre-syndrome/sources/#src-FDA-Bivigam">118</a></sup>.'},
  {id:'blood',lab:'Red cells',short:'Red cells',t:'Haemolysis and thicker blood',
   s:'Blood group antibodies in the product can coat red cells. Named risk factors: high doses (for example 2 g/kg or more, single or divided), non-O blood group and underlying inflammatory disease <sup class="c" data-ref="FDA-Asceniv" title="Source 117"><a href="/guillain-barre-syndrome/sources/#src-FDA-Asceniv">117</a></sup>. Labels also warn of hyperproteinaemia, raised serum viscosity and true or pseudo-hyponatraemia <sup class="c" data-ref="FDA-Bivigam" title="Source 118"><a href="/guillain-barre-syndrome/sources/#src-FDA-Bivigam">118</a></sup>.'},
  {id:'allergy',lab:'Allergy',short:'Allergy',t:'Hypersensitivity and IgA deficiency',
   s:'Labels contraindicate IVIg after anaphylaxis or a severe systemic reaction to human immune globulin, and in IgA-deficient people with anti-IgA antibodies and a history of hypersensitivity <sup class="c" data-ref="FDA-Bivigam,FDA-Asceniv,FDA-GamunexC" title="Source 117,118,120"><a href="/guillain-barre-syndrome/sources/#src-FDA-Bivigam">117,118,120</a></sup>.'}
];
inits.ivig=()=>{
  const tx=(x,y,s,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`;
  const INK='fill:var(--ink);font-weight:600';
  /* an infusion bag with a liquid level and IgG molecules inside */
  function ivBag(x,y,w,h,lvl,seed){const r=rng(seed||3),ly=y+18+(h-26)*(1-lvl);
    let s=`<rect x="${f1(x+w/2-7)}" y="${f1(y-10)}" width="14" height="12" rx="4" style="fill:none;stroke:var(--device);stroke-width:2"/>`;
    s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="14" style="fill:var(--panel);stroke:var(--device);stroke-width:2"/>`;
    if(lvl>0)s+=`<rect x="${f1(x+4)}" y="${f1(ly)}" width="${f1(w-8)}" height="${f1(y+h-4-ly)}" rx="10" style="fill:var(--ivig);opacity:.22"/>`;
    const n=Math.round(10*lvl);for(let i=0;i<n;i++){const ax=x+14+r()*(w-28),ay=ly+10+r()*Math.max(4,(y+h-ly-30));s+=antibody(ax,ay,11,{ang:(r()-.5)*90,col:'var(--ivig)'})}
    s+=`<rect x="${f1(x+w/2-5)}" y="${f1(y+h)}" width="10" height="10" style="fill:var(--device)"/>`;
    s+=tx(x+w/2,y+16,IV_L.bag,'t-lbl t-mid');
    return s}
  function arrow(x1,y1,x2,y2){return `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" class="arrow" marker-end="url(#ivAr)"/>`}
  /* ---------- main player ---------- */
  const svg=$('#ivSvg'),rg=$('#ivT');
  function draw(t){
    const N=vb(svg,'720 400','400 640'),p=phaseOf(IV_STEPS,t),P=IV_STEPS[p];
    const nx=IV_STEPS[p+1]?IV_STEPS[p+1].from:1.0001,u=ramp(t,P.from,nx-.02),fade=ramp(t,P.from,P.from+.03);
    let s=`<defs>${marker('ivAr','var(--muted)')}</defs>`;
    s+=tx(16,28,P.sv,'t-big','font-size:18px')+tx(16,46,P.sub,'t-sm');
    s+=`<g style="opacity:${f1(.25+.75*fade)}">`;
    if(p===0){/* donors to one pool */
      const L=N?{ix:68,iy:72,sz:20,ax1:200,ay1:270,ax2:200,ay2:300,bx:140,by:318,bw:120,bh:170,lx:200,ly:530}:{ix:30,iy:84,sz:20,ax1:310,ay1:190,ax2:370,ay2:190,bx:392,by:84,bw:130,bh:220,lx:548,ly:150};
      const I=icons(L.ix,L.iy,{n:60,cols:10,size:L.sz,gap:7,k:Math.round(ease(u)*60),col:'var(--ivig)',base:'var(--line)'});
      s+=I.svg+tx(L.ix,L.iy+I.h+10,IV_L.donors,'t-sm');
      s+=arrow(L.ax1,L.ay1,L.ax2,L.ay2);
      s+=ivBag(L.bx,L.by,L.bw,L.bh,.15+.85*ease(u),5);
      if(N){IV_L.polyN.forEach((l,i)=>{s+=tx(L.lx,L.ly+i*18,l,'t-lbl t-mid')});s+=tx(L.lx,L.ly+48,IV_L.label1000,'t-xs t-mid')}
      else{IV_L.polyW.forEach((l,i)=>{s+=tx(L.lx,L.ly+i*20,l,'t-lbl')});s+=tx(L.lx,L.ly+76,IV_L.label1000,'t-xs')}
    }
    else if(p===1){/* five days */
      const L=N?{bx:24,by:84,bw:70,bh:120,dx:116,dy:74,dw:264,dh:42,gap:8,col:true,tx:20,ty:376,tw:360,gy:440}
               :{bx:30,by:84,bw:90,bh:140,dx:170,dy:84,dw:96,dh:100,gap:8,col:false,tx:170,ty:246,tw:512,gy:330};
      s+=ivBag(L.bx,L.by,L.bw,L.bh,1-.8*u,7);
      const lx=L.bx+L.bw/2;
      if(L.col){s+=`<path d="M${f1(lx)} ${f1(L.by+L.bh+10)}V${f1(L.by+L.bh+40)}" style="fill:none;stroke:var(--ivig);stroke-width:3"/>`}
      else{s+=`<path d="M${f1(lx)} ${f1(L.by+L.bh+10)}V${f1(L.by+L.bh+24)}H${f1(L.dx-18)}V${f1(L.dy+L.dh/2)}H${f1(L.dx-4)}" style="fill:none;stroke:var(--ivig);stroke-width:3;stroke-linejoin:round"/>`}
      for(let i=0;i<5;i++){const f=ramp(u,i/5,(i+.9)/5);
        const x=L.col?L.dx:L.dx+i*(L.dw+L.gap),y=L.col?L.dy+i*(L.dh+L.gap):L.dy;
        s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(L.dw)}" height="${f1(L.dh)}" rx="8" style="fill:var(--panel-2);stroke:var(--line)"/>`;
        if(f>0)s+=L.col?`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(L.dw*f)}" height="${f1(L.dh)}" rx="8" style="fill:var(--ivig);opacity:.35"/>`
                        :`<rect x="${f1(x)}" y="${f1(y+L.dh*(1-f))}" width="${f1(L.dw)}" height="${f1(L.dh*f)}" rx="8" style="fill:var(--ivig);opacity:.35"/>`;
        if(L.col){s+=tx(x+12,y+26,IV_L.day+' '+(i+1),'t-lbl')+tx(x+L.dw-12,y+26,IV_L.perDay,'t-sm t-end','fill:var(--ink)')}
        else{s+=tx(x+L.dw/2,y+24,IV_L.day+' '+(i+1),'t-lbl t-mid')+tx(x+L.dw/2,y+L.dh-14,IV_L.perDay,'t-sm t-mid','fill:var(--ink)')}}
      /* running total */
      const tw=L.tw,ty=L.ty,tot=clamp(u/.98);
      s+=tx(L.tx,ty-8,IV_L.total,'t-sm');
      s+=`<rect x="${f1(L.tx)}" y="${f1(ty)}" width="${f1(tw)}" height="22" rx="6" style="fill:var(--panel-2);stroke:var(--line)"/><rect x="${f1(L.tx)}" y="${f1(ty)}" width="${f1(tw*tot)}" height="22" rx="6" style="fill:var(--ivig);opacity:.55"/>`;
      s+=tx(L.tx,ty+38,IV_L.zero,'t-xs')+tx(L.tx+tw,ty+38,IV_L.twoG,'t-xs t-end');
      s+=tx(L.tx+Math.max(30,tw*tot),ty+16,(2*tot).toFixed(1)+' g/kg','t-sm t-end','fill:var(--ink);font-weight:700');
      s+=tx(L.tx,L.gy,IV_L.ex70,'t-sm','fill:var(--ink)')+tx(L.tx,L.gy+20,N?IV_L.exGuideN:IV_L.exGuide,'t-sm');
    }
    else if(p===2){/* the attack */
      const L=N?{zx:20,zy:70,zs:1.2,mx:310,my:380,mr:30,cx:200,cy:450}:{zx:60,zy:68,zs:1.35,mx:610,my:170,mr:36,cx:265,cy:360};
      const Z=nodeZoom(L.zx,L.zy,L.zs,{mode:'aman',ab:ease(ramp(u,0,.45)),c3:ease(ramp(u,.35,.8)),nav:.35*ramp(u,.5,1),labels:true});
      s+=Z.svg;
      s+=`<g style="opacity:${f1(ramp(u,.55,.9))}">`+macrophage(L.mx,L.my,L.mr,{seed:4,reach:.6,dir:'l'})+kitLabel(L.mx,L.my+L.mr+18,IV_L.macro,{a:'m'})+'</g>';
      if(N){s+=tx(L.cx-180,L.cy+20,IV_L.attackN1,'t-sm','fill:var(--ink)')+tx(L.cx-180,L.cy+38,IV_L.attackN2,'t-sm','fill:var(--ink)')}
      else s+=tx(L.cx,L.cy+20,IV_L.attack1+'; '+IV_L.attack2,'t-sm t-mid','fill:var(--ink)');
    }
    else if(p===3){/* three proposed actions */
      IV_L.act.forEach((A,i)=>{const a=ease(ramp(u,i*.22,i*.22+.4));
        const x=N?16:16+i*233,y=N?62+i*190:66,w=N?368:222,h=N?178:310;
        const dc=N?[x+96,y+112]:[x+w/2,y+160];
        s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="12" style="fill:var(--panel);stroke:var(--line)"/>`;
        s+=tx(x+12,y+22,A.t,'t-lbl');
        const tagW=A.tag.length*6.2+12,tagC=A.cls==='early'?'warn':'rx';
        s+=`<rect x="${f1(x+12)}" y="${f1(y+30)}" width="${f1(tagW)}" height="16" rx="4" style="fill:var(--${tagC}-soft)"/>`+tx(x+18,y+41.5,A.tag,'t-xs',`fill:var(--${tagC});font-weight:700`);
        const [cx,cy]=dc;
        if(i===0){/* anti-idiotype */
          s+=`<line x1="${f1(cx-70)}" x2="${f1(cx+(N?14:70))}" y1="${f1(cy+52)}" y2="${f1(cy+52)}" style="stroke:var(--axon-line);stroke-width:3"/>`;
          const gx=cx+(N?0:40);
          s+=ganglioside(gx,cy+52,1.4,{kind:'GM1'});
          s+=antibody(cx-34,cy-6,24,{});
          s+=antibody(cx-34,cy-6-(1-a)*36,24,{ang:180,col:'var(--ivig)',op:.2+.8*a});
          s+=kitLabel(cx-16,cy+14,IV_L.harm,{});s+=`<g style="opacity:${f1(a)}">`+kitLabel(cx-16,cy-22,IV_L.donor,{})+(N?kitLabel(gx+22,cy+56,IV_L.gangl,{}):kitLabel(gx,cy+72,IV_L.gangl,{a:'m'}))+'</g>';
        }else if(i===1){/* complement */
          s+=`<rect x="${f1(cx-80)}" y="${f1(cy+20)}" width="160" height="12" rx="6" style="fill:var(--axon);stroke:var(--axon-line)"/>`;
          [-50,-10,30,62].forEach((dx,k)=>{s+=mac(cx+dx,cy+26,6,{op:1-a*.85})});
          s+=`<g style="opacity:${f1(1-a*.7)}">`+c3dots(cx-75,cy+12,150,9,4+i)+'</g>';
          [-60,-25,10,45,72].forEach((dx,k)=>{s+=antibody(cx+dx,cy-30+(k%2)*14-(1-a)*30,16,{ang:(k-2)*16,col:'var(--ivig)',op:a})});
        }else{/* Fc receptors */
          s+=macrophage(cx,cy+6,34,{seed:9});
          [-60,-20,20,60].forEach((deg,k)=>{const r=Math.PI*(deg-90)/180,px=cx+Math.cos(r)*36,py=cy+6+Math.sin(r)*36,d=(1-a)*24;
            s+=antibody(px+Math.cos(r)*(20+d),py+Math.sin(r)*(20+d),18,{ang:deg,col:'var(--ivig)',op:.15+.85*a})});
        }
        const lx=N?x+196:x+12,ly=N?y+76:y+250;
        A.l.forEach((l,k)=>{s+=tx(lx,ly+k*16,l,'t-sm','fill:var(--ink)')});
      });
    }
    else if(p===4){/* IgG levels */
      const L=N?{x:56,y:76,w:318,h:250,tx:20,ty:380}:{x:70,y:72,w:400,h:270,tx:500,ty:96};
      const X=d=>L.x+L.w*d/30,Y=g=>L.y+L.h-L.h*g/45;
      s+=`<rect x="${f1(L.x)}" y="${f1(L.y)}" width="${f1(L.w)}" height="${f1(L.h)}" style="fill:var(--field)"/>`;
      s+=`<rect x="${f1(X(0))}" y="${f1(L.y)}" width="${f1(X(5)-X(0))}" height="${f1(L.h)}" style="fill:var(--ivig);opacity:.12"/>`+tx(X(.6),L.y+14,IV_L.days15,'t-xs');
      [0,10,20,30,40].forEach(g=>{s+=`<line x1="${f1(L.x)}" x2="${f1(L.x+L.w)}" y1="${f1(Y(g))}" y2="${f1(Y(g))}" class="grid"/>`+tx(L.x-6,Y(g)+3,g,'t-xs t-end')});
      [0,14,28].forEach((d,i)=>{s+=tx(X(d),L.y+L.h+16,IV_L.wk[i],'t-xs t-mid')});
      s+=`<line x1="${f1(L.x)}" x2="${f1(L.x+L.w)}" y1="${f1(L.y+L.h)}" y2="${f1(L.y+L.h)}" class="axis"/><line x1="${f1(L.x)}" x2="${f1(L.x)}" y1="${f1(L.y)}" y2="${f1(L.y+L.h)}" class="axis"/>`;
      s+=tx(L.x,L.y-8,IV_L.igY,'t-xs')+tx(L.x+L.w,L.y+L.h+32,IV_L.igX,'t-xs t-end');
      const series=[{P:[ [0,12.5,12.5,12.5],[14,21.2,18.1,23.2],[28,15.4,13.6,17.2] ],col:'var(--ivig)',dash:'',a:ramp(u,0,.5),lab:IV_L.one},
                    {P:[ [0,12.1,12.1,12.1],[14,35.5,30.9,42.7],[28,19.4,15.9,21.9] ],col:'var(--rx)',dash:'6 4',a:ramp(u,.5,.95),lab:IV_L.two}];
      series.forEach((S,si)=>{if(S.a<=0)return;const pts=S.P.map(q=>[X(q[0]),Y(q[1])]);
        const k=S.a*2,seg=Math.min(2,k);let d=`M${f1(pts[0][0])} ${f1(pts[0][1])}`;
        for(let j=1;j<=2;j++){const f=clamp(seg-(j-1));if(f<=0)break;const a0=pts[j-1],a1=pts[j];d+=`L${f1(lerp(a0[0],a1[0],f))} ${f1(lerp(a0[1],a1[1],f))}`}
        s+=`<path d="${d}" style="fill:none;stroke:${S.col};stroke-width:2.6${S.dash?';stroke-dasharray:'+S.dash:''}"/>`;
        S.P.forEach((q,j)=>{if(j>seg+.01)return;const px=X(q[0])+(si?5:-5);
          if(q[2]!==q[3])s+=`<line x1="${f1(px)}" x2="${f1(px)}" y1="${f1(Y(q[2]))}" y2="${f1(Y(q[3]))}" style="stroke:${S.col};stroke-width:2"/>`;
          s+=`<circle cx="${f1(px)}" cy="${f1(Y(q[1]))}" r="5" style="fill:${S.col};stroke:var(--panel);stroke-width:2"/>`;
          if(j>0)s+=si?kitLabel(px+10,Y(q[1])+4,q[1].toFixed(1),{}):kitLabel(px-8,Y(q[1])+(j===1?-8:18),q[1].toFixed(1),{a:'e'})});
      });
      /* legend and notes */
      const lx=L.tx,ly=L.ty;
      s+=`<line x1="${f1(lx)}" x2="${f1(lx+24)}" y1="${f1(ly)}" y2="${f1(ly)}" style="stroke:var(--ivig);stroke-width:2.6"/>`+tx(lx+30,ly+4,IV_L.one,'t-sm','fill:var(--ink)');
      s+=`<g style="opacity:${f1(.25+.75*ramp(u,.5,.6))}"><line x1="${f1(lx)}" x2="${f1(lx+24)}" y1="${f1(ly+20)}" y2="${f1(ly+20)}" style="stroke:var(--rx);stroke-width:2.6;stroke-dasharray:6 4"/>`+tx(lx+30,ly+24,IV_L.two,'t-sm','fill:var(--ink)')+'</g>';
      const notes=[IV_L.igNote1,IV_L.igNote2,'',IV_L.igK1,IV_L.igK2,'',IV_L.igK3,IV_L.igK4,IV_L.igK5];
      notes.forEach((l,i)=>{if(l)s+=tx(lx,ly+52+i*17,l,i===3||i===4?'t-sm':'t-xs',i===4?'fill:var(--ink);font-weight:700':'')});
    }
    else{/* verdict */
      const bx=N?20:250,bw=N?300:330,lw=N?0:230,rowH=24;
      const blocks=N?[66,250,440]:[66,186,306];
      const bar=(x,y,w,frac,col,lab,val)=>`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="16" rx="4" style="fill:var(--panel-2)"/><rect x="${f1(x)}" y="${f1(y)}" width="${f1(w*frac)}" height="16" rx="4" style="fill:${col}"/>`+tx(x+w*frac+6,y+12.5,val,'t-sm','fill:var(--ink);font-weight:700');
      const a1=ease(ramp(u,0,.35)),a2=ease(ramp(u,.25,.6)),a3=ease(ramp(u,.5,.9));
      /* block 1 */
      let y=blocks[0];
      if(N){IV_L.v1N.forEach((l,i)=>{s+=tx(16,y+i*16,l,'t-lbl')});y+=30}else{s+=tx(16,y,IV_L.v1,'t-lbl');y+=14}
      [[IV_L.pe,34,'var(--plasma)'],[IV_L.ivig,53,'var(--ivig)']].forEach(([n,v,c],i)=>{const yy=y+i*rowH+(N?18:0);
        if(N)s+=tx(bx,yy-4,n,'t-xs');else s+=tx(bx-10,yy+12.5,n,'t-sm t-end','fill:var(--ink)');
        s+=bar(bx,yy,bw,v/100*a1,c,n,Math.round(v*a1)+'%')});
      /* block 2 */
      y=blocks[1];
      if(N){IV_L.v2N.forEach((l,i)=>{s+=tx(16,y+i*16,l,'t-lbl')});y+=30}else{s+=tx(16,y,IV_L.v2,'t-lbl');y+=14}
      [[IV_L.pe,.9,'var(--plasma)'],[IV_L.ivig,.8,'var(--ivig)'],[IV_L.both,1.1,'var(--muted)']].forEach(([n,v,c],i)=>{const yy=y+i*rowH+(N?18+i*6:0);
        if(N)s+=tx(bx,yy-4,n,'t-xs');else s+=tx(bx-10,yy+12.5,n,'t-sm t-end','fill:var(--ink)');
        s+=bar(bx,yy,bw,v/1.5*a2,c,n,(v*a2).toFixed(1))});
      /* block 3: a one-row forest */
      y=blocks[2];
      if(N){IV_L.v3N.forEach((l,i)=>{s+=tx(16,y+i*16,l,'t-lbl')});y+=34}else{s+=tx(16,y,IV_L.v3,'t-lbl');y+=18}
      const fx=N?40:250,fw=N?320:330,F=v=>fx+fw*(v+.5);
      s+=`<line x1="${f1(fx)}" x2="${f1(fx+fw)}" y1="${f1(y+30)}" y2="${f1(y+30)}" class="axis"/>`;
      [-.5,-.25,0,.25,.5].forEach(v=>{s+=`<line x1="${f1(F(v))}" x2="${f1(F(v))}" y1="${f1(y+26)}" y2="${f1(y+34)}" class="axis"/>`+tx(F(v),y+46,v===0?'0':(v>0?'+':'')+v,'t-xs t-mid')});
      s+=`<line x1="${f1(F(0))}" x2="${f1(F(0))}" y1="${f1(y)}" y2="${f1(y+30)}" style="stroke:var(--muted);stroke-dasharray:3 3"/>`;
      s+=`<g style="opacity:${f1(a3)}"><line x1="${f1(F(-.20))}" x2="${f1(F(.25))}" y1="${f1(y+12)}" y2="${f1(y+12)}" style="stroke:var(--ink);stroke-width:2.4"/><rect x="${f1(F(.02)-6)}" y="${f1(y+6)}" width="12" height="12" style="fill:var(--ivig);stroke:var(--ink)"/></g>`;
      s+=tx(F(-.5),y+62,IV_L.favPE,'t-xs')+tx(F(.5),y+62,IV_L.favIV,'t-xs t-end');
    }
    s+='</g>';
    svg.innerHTML=s;
    setSt(p);$('#ivNote').innerHTML=noteHTML(P);
  }
  let setSt=()=>{};
  const stop=playWire(rg,$('#ivPlay'),draw,22000,'Replay','ivig');
  setSt=stepWire($('#ivSteps'),IV_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- regimen arithmetic ---------- */
  const dsvg=$('#ivDoseSvg'),wIn=$('#ivW');let reg='std';
  function drawDose(){
    const N=vb(dsvg,'720 250','400 300'),R=IV_REG[reg],w=+wIn.value,g=R.d*w,T=g*R.n;
    const L=N?{x0:20,cw:56,gap:6,base:200,maxH:120,tY:262,tx:20,tw:360}:{x0:40,cw:80,gap:14,base:170,maxH:120,tY:206,tx:40,tw:560};
    let s='';
    s+=tx(L.x0,24,R.name,'t-lbl');
    for(let i=0;i<6;i++){const x=L.x0+i*(L.cw+L.gap),on=i<R.n,h=on?L.maxH*R.d:0;
      s+=`<rect x="${f1(x)}" y="${f1(L.base-L.maxH)}" width="${f1(L.cw)}" height="${f1(L.maxH)}" rx="6" style="fill:var(--panel-2);opacity:.6"/>`;
      if(on){s+=`<rect x="${f1(x)}" y="${f1(L.base-h)}" width="${f1(L.cw)}" height="${f1(h)}" rx="6" style="fill:var(--ivig);opacity:.7"/>`;
        s+=tx(x+L.cw/2,L.base-h-8,Math.round(g)+' g','t-sm t-mid','fill:var(--ink);font-weight:700');
        s+=tx(x+L.cw/2,L.base-h+16,R.d+' g/kg','t-xs t-mid','fill:var(--ink)')}
      s+=tx(x+L.cw/2,L.base+16,IV_L.day+' '+(i+1),'t-xs t-mid')}
    /* total against the standard 2 g/kg */
    const tot=R.d*R.n,TW=L.tw,mx=2.4;
    s+=`<rect x="${f1(L.tx)}" y="${f1(L.tY)}" width="${f1(TW)}" height="14" rx="5" style="fill:var(--panel-2)"/><rect x="${f1(L.tx)}" y="${f1(L.tY)}" width="${f1(TW*tot/mx)}" height="14" rx="5" style="fill:var(--ivig)"/>`;
    s+=`<line x1="${f1(L.tx+TW*2/mx)}" x2="${f1(L.tx+TW*2/mx)}" y1="${f1(L.tY-6)}" y2="${f1(L.tY+20)}" style="stroke:var(--ink);stroke-width:2"/>`;
    s+=tx(L.tx+TW*2/mx,L.tY-10,IV_L.twoG,'t-xs t-mid','fill:var(--ink)');
    if(!N)s+=tx(L.tx+TW+10,L.tY+11,tot.toFixed(1)+' g/kg','t-sm','fill:var(--ink);font-weight:700');
    dsvg.innerHTML=s;
    $('#ivDoseOut').textContent=IV_DOSE_TPL.replace('{w}',w).replace('{d}',Math.round(g)).replace('{n}',R.n).replace('{T}',Math.round(T)).replace('{k}',tot.toFixed(1));
    $('#ivDoseSay').innerHTML=R.s;
    $$('[data-ivr]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.ivr===reg));
  }
  $$('[data-ivr]').forEach(b=>b.addEventListener('click',()=>{reg=b.dataset.ivr;drawDose()}));
  wIn.addEventListener('input',drawDose);
  drawDose();

  /* ---------- safety map ---------- */
  const ssvg=$('#ivSafeSvg');let sel=0;
  function drawSafe(){
    const N=vb(ssvg,'720 330','400 420');
    const B=N?bodyFront(200,22,330,{}):bodyFront(360,16,290,{});
    const A=B.at,leg=[A.foot[0],lerp(A.back[1],A.foot[1],.62)];
    const pts={clot:leg,kid:[A.back[0]+(N?14:12),A.back[1]],head:[A.head[0],A.head[1]-(N?10:8)],lung:[A.chest[0]-(N?18:16),A.chest[1]],blood:A.hand,allergy:A.mouth};
    /* label slots: left and right columns */
    const slots=N?{head:[12,60],lung:[12,150],clot:[12,300],allergy:[388,60],kid:[388,170],blood:[388,250]}
                 :{head:[150,50],lung:[150,140],clot:[150,270],allergy:[570,50],kid:[570,150],blood:[570,232]};
    let s=B.svg;
    IV_SAFE.forEach((S,i)=>{const p=pts[S.id],sl=slots[S.id],on=i===sel,right=sl[0]>(N?200:360),lab=N?S.short:S.lab;
      const ex=right?sl[0]-(N?0:0):sl[0];
      s+=`<g data-ivs="${i}" style="cursor:pointer">`;
      s+=`<path d="M${f1(right?sl[0]-4-lab.length*(N?7:7.6):sl[0]+4+lab.length*(N?7:7.6))} ${f1(sl[1]-4)}L${f1(p[0])} ${f1(p[1])}" style="fill:none;stroke:${on?'var(--rx)':'var(--muted)'};stroke-width:${on?2:1.2};stroke-dasharray:${on?'none':'3 3'}"/>`;
      s+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="${on?9:6}" style="fill:${on?'var(--rx)':'var(--panel)'};stroke:var(--rx);stroke-width:2"/>`;
      s+=`<text x="${f1(ex)}" y="${f1(sl[1])}" class="t-lbl${right?' t-end':''}" style="fill:${on?'var(--rx)':'var(--ink)'}">${lab}</text>`;
      s+='</g>'});
    ssvg.innerHTML=s;
    const S=IV_SAFE[sel];$('#ivSafeNote').innerHTML=`<h4>${S.t}</h4><p>${S.s}</p>`;
    $$('[data-ivsb]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.ivsb===sel));
  }
  ssvg.addEventListener('click',e=>{const g=e.target.closest('[data-ivs]');if(!g)return;sel=+g.dataset.ivs;drawSafe()});
  $$('[data-ivsb]').forEach(b=>b.addEventListener('click',()=>{sel=+b.dataset.ivsb;drawSafe()}));
  drawSafe();
  const prev=redraws.ivig;redraws.ivig=()=>{prev&&prev();drawDose();drawSafe()};
};
/* =============== 3.3 Plasma exchange =============== */
/* Three players: the apheresis circuit with a removal chart (main), the French 1997 "how many exchanges" explorer,
   and a clickable forest plot of the 2017 Cochrane review. Removal curves follow the general first-order apheresis
   model in Williams 2014; the rebound between sessions is illustrative and labelled so. */
const PX_STEPS=[
 {from:0,at:.05,k:'Step 1 · access',sv:'Blood leaves through a line',sub:'usually a large catheter in a big vein',
  t:'A line into a large vein',
  txt:'Plasma exchange draws blood out, separates the plasma, and returns the blood cells with a replacement fluid. It removes high-molecular-weight substances from plasma, including autoantibodies, immune complexes and immunoglobulin paraproteins <sup class="c" data-ref="Williams2014" title="Source 509"><a href="/guillain-barre-syndrome/sources/#src-Williams2014">509</a></sup>. It often needs a central venous catheter, whose risks include severe sepsis and catheter-related deep vein thrombosis <sup class="c" data-ref="Islam2018" title="Source 207"><a href="/guillain-barre-syndrome/sources/#src-Islam2018">207</a></sup>.',
  pt:'Plasma exchange takes out the liquid part of the blood and replaces it, to remove harmful antibodies. It often needs a large line in a vein <sup class="c" data-ref="vanDoorn2023,Islam2018" title="Source 207,473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">207,473</a></sup>.',
  hook:'Plasma exchange = remove plasma (with antibodies and immune complexes), return cells, replace volume <sup class="c" data-ref="Williams2014" title="Source 509"><a href="/guillain-barre-syndrome/sources/#src-Williams2014">509</a></sup>.'},
 {from:.16,at:.24,k:'Step 2 · separation',sv:'The machine splits the blood',sub:'plasma one way, cells the other',
  t:'The separator splits plasma from cells',
  txt:'A centrifuge or filter separates plasma from the blood cells. Severe cardiovascular autonomic instability is a relative contraindication with discontinuous machines, because of large volume shifts; this is less of a problem with continuous-flow machines <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>.',
  pt:'A machine spins the blood so the liquid part separates from the cells.',
  hook:'Autonomic instability: a relative contraindication to discontinuous plasma exchange <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>.'},
 {from:.32,at:.4,k:'Step 3 · removal',sv:'Plasma, with antibodies, goes',sub:'into a waste bag, with what it carries',
  t:'The plasma, and what it carries, is discarded',
  txt:'Removing plasma takes out circulating autoantibodies and immune complexes <sup class="c" data-ref="Williams2014" title="Source 509"><a href="/guillain-barre-syndrome/sources/#src-Williams2014">509</a></sup>. Plasma exchange may also change lymphocyte numbers and function and the Th1/Th2 balance, but "much remains unknown" about how it works <span class="ev hyp">Hypothesis</span> <sup class="c" data-ref="Reeves2014" title="Source 375"><a href="/guillain-barre-syndrome/sources/#src-Reeves2014">375</a></sup>.',
  pt:'The removed liquid carries some of the antibodies that are attacking the nerves away with it <sup class="c" data-ref="Williams2014" title="Source 509"><a href="/guillain-barre-syndrome/sources/#src-Williams2014">509</a></sup>.',
  hook:'Mechanism: antibody and immune complex removal is direct; immune modulation is proposed <sup class="c" data-ref="Williams2014,Reeves2014" title="Source 375,509"><a href="/guillain-barre-syndrome/sources/#src-Williams2014">375,509</a></sup>.'},
 {from:.48,at:.56,k:'Step 4 · replacement',sv:'Albumin replaces the plasma',sub:'cells go back with a replacement fluid',
  t:'Cells go back, with albumin in place of plasma',
  txt:'In the French trial, albumin and fresh frozen plasma worked equally well, but fresh frozen plasma brought more incidents and complications, and the authors recommended abandoning it <sup class="c" data-ref="FrenchPE1987" title="Source 143"><a href="/guillain-barre-syndrome/sources/#src-FrenchPE1987">143</a></sup>. In a general apheresis series (not GBS-specific), hypotension occurred in 15.2% of sessions and hypocalcaemia in 19.6%; allergic reactions (3%) occurred only with fresh frozen plasma <sup class="c" data-ref="Coirier2022" title="Source 80"><a href="/guillain-barre-syndrome/sources/#src-Coirier2022">80</a></sup>.',
  pt:'The cells go back into the body with a protein solution in place of the liquid that was taken. Blood pressure can drop during a session, and the team monitors this <sup class="c" data-ref="Coirier2022" title="Source 80"><a href="/guillain-barre-syndrome/sources/#src-Coirier2022">80</a></sup>.',
  hook:'Replacement fluid: albumin; fresh frozen plasma gave more complications without better results <sup class="c" data-ref="FrenchPE1987" title="Source 143"><a href="/guillain-barre-syndrome/sources/#src-FrenchPE1987">143</a></sup>.'},
 {from:.64,at:.75,k:'Step 5 · one session',sv:'Each volume removes a share',sub:'a general first-order model, not GBS data',
  t:'Diminishing returns within one session',
  txt:'Each exchange removes a fixed proportion of what is present. Processing one plasma volume removes 63% of a substance, a second removes 23% more and a third 9% more: 63%, 86% and 95% in all, in a first-order model that ignores redistribution and new synthesis <sup class="c" data-ref="Williams2014" title="Source 509"><a href="/guillain-barre-syndrome/sources/#src-Williams2014">509</a></sup>. No validated GBS-specific measure of antibody removal per session was found, so this is a general model <sup class="c" data-ref="Williams2014" title="Source 509"><a href="/guillain-barre-syndrome/sources/#src-Williams2014">509</a></sup>.',
  pt:'Each round of cleaning takes out a smaller amount than the one before.',
  hook:'1, 2, 3 plasma volumes: about 63%, 86%, 95% removed (first-order model) <sup class="c" data-ref="Williams2014" title="Source 509"><a href="/guillain-barre-syndrome/sources/#src-Williams2014">509</a></sup>.'},
 {from:.81,at:.9,k:'Step 6 · the course',sv:'Rebound, then the next session',sub:'IgG returns from the tissues between sessions',
  t:'Why it takes several sessions over days',
  txt:'IgG lies partly outside the bloodstream and returns between sessions, so several exchanges are needed; a general apheresis review expects six exchanges to bring circulating IgG down to about one-fifth or one-sixth of baseline <sup class="c" data-ref="Williams2014" title="Source 509"><a href="/guillain-barre-syndrome/sources/#src-Williams2014">509</a></sup>. The 2023 EAN/PNS guideline strongly recommends four to five exchanges over 1 to 2 weeks, 12 to 15 L in total, for people unable to walk unaided, within 4 weeks of onset <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>; the ten-steps guideline quotes 200 to 250 mL plasma/kg over five sessions <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>. Quoted as published, not as instructions.',
  pt:'It is usually done four or five times over 1 to 2 weeks <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>.',
  hook:'Plasma exchange: 4 to 5 exchanges, 12 to 15 L over 1 to 2 weeks (or 200 to 250 mL/kg over five), within 4 weeks <sup class="c" data-ref="vanDoorn2023,Leonhard2019" title="Source 266,473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">266,473</a></sup>.'}
];
const PX_L={
  cath:'central line',sep:'separator',waste:'plasma removed',alb:'albumin',cells:'cells returned',ret:'back to the body',
  blood:'blood out',plasmaW:'plasma',
  chY:'share left in plasma',chX:'plasma volumes processed in one session',chXN:'plasma volumes, one session',
  rem:['63% removed','86% removed','95% removed'],model:'General first-order model; ignores redistribution and synthesis',
  modelN:'General model, not GBS data',
  swY:'circulating IgG',swX:'days',sess:'exchange',band:'one-fifth to one-sixth',swNote:'Schematic: rebound size illustrative; end level after six exchanges from Williams 2014',
  swNoteN1:'Schematic: rebound size illustrative;',swNoteN2:'end level from Williams 2014',reb:'rebound from tissues'
};
/* French 1997: how many exchanges, by severity */
const PX_NUM={
  mild:{name:'Mild (91 people)',arms:[{n:0,lab:'No exchanges'},{n:2,lab:'Two exchanges'}],
    rows:[{m:'Median days to onset of motor recovery',v:[8,4],max:12,unit:' days',better:'lower'}],
    s:'In mildly affected people, two exchanges beat none: median time to onset of motor recovery 4 against 8 days <sup class="c" data-ref="FrenchCooperative1997" title="Source 142"><a href="/guillain-barre-syndrome/sources/#src-FrenchCooperative1997">142</a></sup>. Cochrane reports the same comparison as 6 against 10 days in 91 people, and the reason for the difference could not be checked from the abstracts <sup class="c" data-ref="Chevret2017" title="Source 75"><a href="/guillain-barre-syndrome/sources/#src-Chevret2017">75</a></sup>.'},
  moderate:{name:'Moderate (304 people)',arms:[{n:2,lab:'Two exchanges'},{n:4,lab:'Four exchanges'}],
    rows:[{m:'Median days to walk with aid',v:[24,20],max:30,unit:' days',better:'lower'},{m:'Full strength at 1 year',v:[46,64],max:100,unit:'%',better:'higher'}],
    s:'In moderately affected people, four exchanges beat two: median time to walk with aid 20 against 24 days, and full strength at 1 year in 64% against 46% <sup class="c" data-ref="FrenchCooperative1997" title="Source 142"><a href="/guillain-barre-syndrome/sources/#src-FrenchCooperative1997">142</a></sup>.'},
  vent:{name:'Ventilated (161 people)',arms:[{n:4,lab:'Four exchanges'},{n:6,lab:'Six exchanges'}],rows:[],
    none:'Six were no better than four',
    s:'In people on a ventilator, six exchanges were no better than four <sup class="c" data-ref="FrenchCooperative1997" title="Source 142"><a href="/guillain-barre-syndrome/sources/#src-FrenchCooperative1997">142</a></sup>. Group sizes from the 2023 EAN/PNS guideline <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>.'}
};
/* Cochrane 2017: plasma exchange against supportive care */
const PX_FOREST=[
  {k:'Improved 1+ grade at 4 weeks',kn:'Improved 1+ grade, 4 weeks',rr:1.64,lo:1.37,hi:1.96,s:'Improvement by one or more disability grades at 4 weeks: RR 1.64 (95% CI 1.37 to 1.96; 5 trials, 623 people) <sup class="c" data-ref="Chevret2017" title="Source 75"><a href="/guillain-barre-syndrome/sources/#src-Chevret2017">75</a></sup>.'},
  {k:'Walking with aid at 4 weeks',kn:'Walking with aid, 4 weeks',rr:1.60,lo:1.19,hi:2.15,s:'Recovered walking with aid at 4 weeks: RR 1.60 (95% CI 1.19 to 2.15; 3 trials, 349 people) <sup class="c" data-ref="Chevret2017" title="Source 75"><a href="/guillain-barre-syndrome/sources/#src-Chevret2017">75</a></sup>.'},
  {k:'Walking without aid',kn:'Walking without aid',rr:1.72,lo:1.06,hi:2.79,s:'Recovered walking without aid: RR 1.72 (95% CI 1.06 to 2.79; 3 trials, 349 people) <sup class="c" data-ref="Chevret2017" title="Source 75"><a href="/guillain-barre-syndrome/sources/#src-Chevret2017">75</a></sup>.'},
  {k:'Needing a ventilator',kn:'Needing a ventilator',rr:.53,lo:.39,hi:.74,s:'Need for ventilation: RR 0.53 (95% CI 0.39 to 0.74; 5 trials, 623 people). Fewer people needed a ventilator with plasma exchange <sup class="c" data-ref="Chevret2017" title="Source 75"><a href="/guillain-barre-syndrome/sources/#src-Chevret2017">75</a></sup>.'},
  {k:'Full strength at 1 year',kn:'Full strength, 1 year',rr:1.24,lo:1.07,hi:1.45,s:'Full muscle strength at 1 year: RR 1.24 (95% CI 1.07 to 1.45; 5 trials, 404 people) <sup class="c" data-ref="Chevret2017" title="Source 75"><a href="/guillain-barre-syndrome/sources/#src-Chevret2017">75</a></sup>.'},
  {k:'Severe motor sequelae',kn:'Severe motor sequelae',rr:.65,lo:.44,hi:.96,s:'Severe motor sequelae: RR 0.65 (95% CI 0.44 to 0.96; 6 trials, 649 people) <sup class="c" data-ref="Chevret2017" title="Source 75"><a href="/guillain-barre-syndrome/sources/#src-Chevret2017">75</a></sup>.'},
  {k:'Death',kn:'Death',rr:.86,lo:.45,hi:1.65,s:'Death: RR 0.86 (95% CI 0.45 to 1.65). The interval crosses 1, so this neither confirms nor refutes a lower risk of death <sup class="c" data-ref="Chevret2017" title="Source 75"><a href="/guillain-barre-syndrome/sources/#src-Chevret2017">75</a></sup>. Neither IVIg nor plasma exchange has been shown to reduce mortality <sup class="c" data-ref="Hughes2007" title="Source 198"><a href="/guillain-barre-syndrome/sources/#src-Hughes2007">198</a></sup>.'},
  {k:'Relapse by end of follow-up',kn:'Relapse, end of follow-up',rr:2.89,lo:1.05,hi:7.93,s:'Relapse by the end of follow-up was more frequent with plasma exchange: RR 2.89 (95% CI 1.05 to 7.93). The interval is wide, and long-term outcomes still favoured plasma exchange <sup class="c" data-ref="Chevret2017" title="Source 75"><a href="/guillain-barre-syndrome/sources/#src-Chevret2017">75</a></sup>.'}
];
const PX_FT={less:'less likely with plasma exchange',more:'more likely with plasma exchange',lessN:'less likely',moreN:'more likely',rr:'risk ratio (log scale)'};
inits.plex=()=>{
  const tx=(x,y,s,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`;
  /* polyline helpers: length and the point at a fraction */
  const plen=P=>{let l=0;for(let i=1;i<P.length;i++)l+=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);return l};
  function pat(P,f){let L=plen(P)*clamp(f);for(let i=1;i<P.length;i++){const d=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);if(L<=d||i===P.length-1){const k=d?clamp(L/d):0;return [lerp(P[i-1][0],P[i][0],k),lerp(P[i-1][1],P[i][1],k)]}L-=d}return P[P.length-1]}
  function tube(P,col,on,t,dot,n){let s=`<path d="${ptsD(P)}" style="fill:none;stroke:var(--device);stroke-width:7;stroke-linejoin:round;stroke-linecap:round;opacity:.35"/><path d="${ptsD(P)}" style="fill:none;stroke:${on>0?col:'var(--line)'};stroke-width:3.4;stroke-linejoin:round;stroke-linecap:round;opacity:${f1(.3+.7*on)}"/>`;
    if(on>0){const k=n||Math.max(3,Math.round(plen(P)/34));for(let i=0;i<k;i++){const p=pat(P,((i/k)+t*6)%1);s+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="3.4" style="fill:${dot};stroke:var(--panel);stroke-width:1;opacity:${f1(on)}"/>`}}
    return s}
  function bag(x,y,w,h,lvl,fill,lab,abN,seed){const r=rng(seed||2),ly=y+16+(h-22)*(1-lvl);
    let s=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="12" style="fill:var(--panel);stroke:var(--device);stroke-width:2"/>`;
    if(lvl>0)s+=`<rect x="${f1(x+4)}" y="${f1(ly)}" width="${f1(w-8)}" height="${f1(y+h-4-ly)}" rx="9" style="fill:${fill};opacity:.55"/>`;
    for(let i=0;i<abN;i++){s+=antibody(x+12+r()*(w-24),ly+6+r()*Math.max(2,(y+h-ly-26)),11,{ang:(r()-.5)*120})}
    s+=kitLabel(x+w/2,y+h+15,lab,{a:'m'});return s}
  /* the removal model */
  const PX_G=Math.pow(.18,1/6)/Math.exp(-1);
  function swLevel(d){let pre=1;for(let i=0;i<6;i++){const s0=2*i;if(d<s0)return pre;const post=pre*Math.exp(-1),nxt=post*PX_G;
      if(d<s0+2){const k=1.6;return post+(nxt-post)*(1-Math.exp(-k*(d-s0)))/(1-Math.exp(-2*k))}pre=nxt}return pre}
  /* ---------- main player ---------- */
  const svg=$('#pxSvg'),rg=$('#pxT');let setSt=()=>{};
  function draw(t){
    const N=vb(svg,'720 440','400 720'),p=phaseOf(PX_STEPS,t),P=PX_STEPS[p];
    const sep=ramp(t,.16,.24),out=ramp(t,.32,.38),rep=ramp(t,.48,.54),flow=ramp(t,.02,.08);
    let s='';
    s+=tx(16,28,P.sv,'t-big','font-size:18px')+tx(16,46,P.sub,'t-sm');
    /* layout */
    const L=N?{bx:62,by:64,bs:150,dr:[220,150],r:40,wb:[292,200,84,96],ab:[30,276,76,80],J:[220,372],
               cx:44,cy:438,cw:330,ch:200}
             :{bx:76,by:62,bs:176,dr:[330,150],r:46,wb:[470,52,92,104],ab:[600,52,84,94],J:[560,214],
               cx:70,cy:290,cw:560,ch:110};
    const B=bodyFront(L.bx,L.by,L.bs,{});s+=B.svg;
    const nk=[B.at.mouth[0]+6,B.at.mouth[1]+(N?16:18)];
    const [dx,dy]=L.dr,r=L.r,[wx,wy,ww,wh]=L.wb,[ax,ay,aw,ah]=L.ab,[jx,jy]=L.J;
    const outP=N?[nk,[150,nk[1]],[150,dy],[dx-r,dy]]:[nk,[200,nk[1]],[200,dy],[dx-r,dy]];
    const plP=N?[[dx+r,dy],[wx+ww/2,dy],[wx+ww/2,wy]]:[[dx,dy-r],[dx,wy+wh/2],[wx,wy+wh/2]];
    const ceP=N?[[dx,dy+r],[dx,jy]]:[[dx+r,dy],[jx,dy],[jx,jy]];
    const alP=N?[[ax+aw,ay+ah/2],[jx-34,ay+ah/2],[jx-34,jy],[jx,jy]]:[[ax+aw/2,ay+ah],[ax+aw/2,jy],[jx,jy]];
    const reP=N?[[jx,jy],[jx,jy+20],[14,jy+20],[14,nk[1]+8],[nk[0]-4,nk[1]+8]]:[[jx,jy],[jx,252],[150,252],[150,nk[1]+10],[nk[0]+4,nk[1]+10]];
    s+=tube(outP,'var(--blood)',flow,t,'var(--blood)');
    s+=tube(plP,'var(--plasma)',out,t,'var(--plasma)');
    s+=tube(ceP,'var(--blood)',sep,t,'var(--blood)');
    s+=tube(alP,'var(--care)',rep,t,'var(--care)');
    s+=tube(reP,'var(--blood)',Math.max(sep*.6,rep),t,'var(--blood)');
    /* the separator drum */
    const rot=(t*2600)%360;
    s+=`<circle cx="${f1(dx)}" cy="${f1(dy)}" r="${f1(r+6)}" style="fill:var(--panel);stroke:var(--device);stroke-width:2"/>`;
    s+=`<circle cx="${f1(dx)}" cy="${f1(dy)}" r="${f1(r)}" style="fill:var(--blood);opacity:${f1(.25+.25*flow)}"/>`;
    if(sep>0)s+=`<circle cx="${f1(dx)}" cy="${f1(dy)}" r="${f1(r*.62*sep)}" style="fill:var(--plasma);opacity:.85"/>`;
    s+=`<g transform="rotate(${f1(rot*Math.min(1,flow*2))} ${f1(dx)} ${f1(dy)})">`;for(let i=0;i<3;i++){const a=i*2*Math.PI/3;s+=`<line x1="${f1(dx)}" y1="${f1(dy)}" x2="${f1(dx+Math.cos(a)*r*.92)}" y2="${f1(dy+Math.sin(a)*r*.92)}" style="stroke:var(--device);stroke-width:2.4;stroke-linecap:round"/>`}s+='</g>';
    s+=`<circle cx="${f1(dx)}" cy="${f1(dy)}" r="5" style="fill:var(--device)"/>`;
    /* bags */
    const abN=Math.round(8*out*(p>=4?1:ramp(t,.32,.5)));
    s+=bag(wx,wy,ww,wh,.08+.8*out*ramp(t,.32,.6),'var(--plasma)',PX_L.waste,abN,4);
    s+=`<g style="opacity:${f1(.35+.65*rep)}">`+bag(ax,ay,aw,ah,.85-.4*rep*ramp(t,.48,.8),'var(--care)',PX_L.alb,0,6)+'</g>';
    /* labels */
    s+=kitLabel(nk[0]+10,nk[1]-10,PX_L.cath,{});
    s+=kitLabel(dx,dy+r+(N?-r*2-14:22),PX_L.sep,{a:'m'});
    if(!N){s+=kitLabel(dx+r+48,dy+20,PX_L.cells,{a:'m'});s+=kitLabel(240,nk[1]-8,PX_L.blood,{a:'m'});s+=kitLabel(360,248,PX_L.ret,{a:'m'})}
    else{s+=kitLabel(dx+8,wy+wh+40,PX_L.cells,{});s+=kitLabel(150,jy+36,PX_L.ret,{a:'m'})}
    /* chart */
    const cx=L.cx,cy=L.cy,cw=L.cw,ch=L.ch;
    if(p<5){/* within one session */
      const v=p<2?0:p===2?lerp(0,.5,ramp(t,.34,.46)):p===3?lerp(.5,1,ramp(t,.5,.62)):lerp(1,3,ramp(t,.65,.78));
      const C=curve(cx,cy,cw,ch,x=>Math.exp(-x),{x0:0,x1:3,y0:0,y1:1,upto:Math.max(.001,v),col:'var(--plasma)',fill:true,dot:true});
      s+=`<path d="${(()=>{let d='';for(let i=0;i<=60;i++){const x=3*i/60;d+=(i?'L':'M')+f1(C.X(x))+' '+f1(C.Y(Math.exp(-x)))}return d})()}" style="fill:none;stroke:var(--muted);stroke-width:1.2;stroke-dasharray:3 4"/>`+C.svg;
      [1,2,3].forEach((x,i)=>{s+=`<line x1="${f1(C.X(x))}" x2="${f1(C.X(x))}" y1="${f1(cy+ch)}" y2="${f1(cy+ch+5)}" class="axis"/>`+tx(C.X(x),cy+ch+16,x,'t-xs t-mid');
        if(v>=x-.001){const yy=C.Y(Math.exp(-x));s+=`<circle cx="${f1(C.X(x))}" cy="${f1(yy)}" r="4" style="fill:var(--plasma);stroke:var(--ink)"/>`+kitLabel(C.X(x)+(i===2?-6:6),yy-(N?10+ (2-i)*0:8),PX_L.rem[i],{a:i===2?'e':''})}});
      s+=tx(cx-6,cy+5,'100%','t-xs t-end')+tx(cx-6,cy+ch,'0','t-xs t-end');
      s+=tx(cx,cy-8,PX_L.chY,'t-xs')+tx(cx+cw,cy+ch+30,N?PX_L.chXN:PX_L.chX,'t-xs t-end');
      s+=tx(cx,cy+ch+(N?46:44),N?PX_L.modelN:PX_L.model,'t-xs','font-style:italic');
    }else{/* sawtooth over the course */
      const u=ramp(t,.82,.97),upto=-1+13*u;
      const C=curve(cx,cy,cw,ch,swLevel,{x0:-1,x1:12,y0:0,y1:1.25,upto:Math.max(-.99,upto),col:'var(--antibody)',lw:2.4,dot:true});
      s+=`<rect x="${f1(cx)}" y="${f1(C.Y(.2))}" width="${f1(cw)}" height="${f1(C.Y(1/6)-C.Y(.2))}" style="fill:var(--good);opacity:.25"/>`;
      s+=C.svg;
      s+=tx(C.X(-.8),C.Y(1/6)+11,PX_L.band,'t-xs','fill:var(--ink)');
      for(let i=0;i<6;i++){const d=2*i;s+=`<line x1="${f1(C.X(d))}" x2="${f1(C.X(d))}" y1="${f1(cy+ch)}" y2="${f1(cy+ch+5)}" class="axis"/>`+tx(C.X(d),cy+ch+16,d,'t-xs t-mid');
        if(upto>=d)s+=`<path d="M${f1(C.X(d))} ${f1(cy+12)}l-5 -8h10z" style="fill:var(--plasma);stroke:var(--device)"/>`}
      s+=tx(C.X(12),cy+ch+16,12,'t-xs t-mid');
      if(upto>3)s+=kitLabel(C.X(3),C.Y(swLevel(3))-12,PX_L.reb,{a:'m'});
      s+=tx(cx-6,C.Y(1)+3,'100%','t-xs t-end')+tx(cx-6,cy+ch,'0','t-xs t-end');
      s+=tx(cx,cy-8,PX_L.swY,'t-xs')+tx(cx+cw,cy+ch+30,PX_L.swX,'t-xs t-end');
      if(N){s+=tx(cx,cy+ch+46,PX_L.swNoteN1,'t-xs','font-style:italic')+tx(cx,cy+ch+60,PX_L.swNoteN2,'t-xs','font-style:italic')}
      else s+=tx(cx,cy+ch+44,PX_L.swNote,'t-xs','font-style:italic');
    }
    svg.innerHTML=s;
    setSt(p);$('#pxNote').innerHTML=noteHTML(P);
  }
  const stop=playWire(rg,$('#pxPlay'),draw,22000,'Replay','plex');
  setSt=stepWire($('#pxSteps'),PX_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- how many exchanges ---------- */
  const nsvg=$('#pxNumSvg');let grp='moderate';
  function drawNum(){
    const N=vb(nsvg,'720 200','400 400'),G=PX_NUM[grp];
    let s=tx(16,24,G.name,'t-lbl');
    const armY=N?[56,120]:[60,110];
    G.arms.forEach((A,i)=>{const y=armY[i];s+=tx(16,y,A.lab,'t-sm','fill:var(--ink);font-weight:700');
      for(let k=0;k<6;k++){const x=(N?20:20)+k*24,on=k<A.n;s+=`<path d="M${f1(x+8)} ${f1(y+10)}c-6 8 -7 12 -7 15a7 7 0 0 0 14 0c0 -3 -1 -7 -7 -15z" style="fill:${on?'var(--plasma)':'none'};stroke:${on?'var(--device)':'var(--line)'};stroke-width:1.4"/>`}
      if(A.n===0)s+=tx(20,y+30,'0','t-sm','fill:var(--ink)')});
    if(G.rows.length){G.rows.forEach((R,ri)=>{
      const x0=N?20:220+ri*250,y0=N?190+ri*110:44,w=N?330:220;
      s+=tx(x0,y0,R.m,'t-xs','fill:var(--ink);font-weight:700');
      G.arms.forEach((A,i)=>{const v=R.v[i],y=y0+14+i*42,bw=w*v/R.max,best=(R.better==='lower')===(v===Math.min(...R.v));
        s+=`<rect x="${f1(x0)}" y="${f1(y)}" width="${f1(w)}" height="18" rx="4" style="fill:var(--panel-2)"/><rect x="${f1(x0)}" y="${f1(y)}" width="${f1(bw)}" height="18" rx="4" style="fill:${best?'var(--good)':'var(--muted)'};opacity:.8"/>`;
        s+=tx(x0+bw+6,y+13,v+R.unit,'t-sm','fill:var(--ink);font-weight:700');
        s+=tx(x0,y+31,A.lab,'t-xs')});
    })}else{s+=tx(N?20:220,N?200:96,G.none,'t-lbl','fill:var(--ink)')}
    nsvg.innerHTML=s;
    $('#pxNumNote').innerHTML=G.s;
    $$('[data-pxn]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.pxn===grp));
  }
  $$('[data-pxn]').forEach(b=>b.addEventListener('click',()=>{grp=b.dataset.pxn;drawNum()}));
  drawNum();

  /* ---------- forest plot ---------- */
  const fsvg=$('#pxForestSvg');let fsel=0;
  function drawForest(){
    const N=vb(fsvg,'720 380','400 560');
    const L=N?{x:24,w:300,y0:40,rh:58,lab:-14,vx:390}:{x:290,w:340,y0:40,rh:36,lab:0,vx:704};
    const lg=v=>Math.log2(v),X=v=>L.x+L.w*(lg(v)+2)/5;
    let s='';
    const yEnd=L.y0+PX_FOREST.length*L.rh;
    PX_FOREST.forEach((F,i)=>{const y=L.y0+i*L.rh+(N?14:0),on=i===fsel;
      s+=`<g data-pxf="${i}" style="cursor:pointer">`;
      s+=`<rect x="4" y="${f1(y-(N?30:16))}" width="${N?392:712}" height="${f1(N?L.rh-4:L.rh-4)}" rx="8" style="fill:${on?'var(--rx-soft)':'transparent'}"/>`;
      if(N)s+=tx(L.x,y-14,F.kn,'t-sm','fill:var(--ink);font-weight:'+(on?700:500));
      else s+=tx(16,y+4,F.k,'t-sm','fill:var(--ink);font-weight:'+(on?700:500));
      s+=`<line x1="${f1(X(1))}" x2="${f1(X(1))}" y1="${f1(y-(N?9:L.rh/2))}" y2="${f1(y+(N?14:L.rh/2))}" style="stroke:var(--muted);stroke-width:1.4"/>`;
      s+=`<line x1="${f1(X(F.lo))}" x2="${f1(X(F.hi))}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:var(--ink);stroke-width:2.2"/>`;
      s+=`<rect x="${f1(X(F.rr)-6)}" y="${f1(y-6)}" width="12" height="12" style="fill:${F.rr<1?'var(--care)':'var(--rx)'};stroke:var(--ink)"/>`;
      s+=tx(L.vx,y+4,F.rr.toFixed(2),'t-sm t-end','fill:var(--ink);font-weight:700');
      s+='</g>'});
    [.25,.5,1,2,4,8].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${f1(yEnd)}" y2="${f1(yEnd+5)}" class="axis"/>`+tx(X(v),yEnd+17,v,'t-xs t-mid')});
    s+=`<line x1="${f1(L.x)}" x2="${f1(L.x+L.w)}" y1="${f1(yEnd)}" y2="${f1(yEnd)}" class="axis"/>`;
    s+=tx(X(1)-8,yEnd+34,N?PX_FT.lessN:PX_FT.less,'t-xs t-end')+tx(X(1)+8,yEnd+34,N?PX_FT.moreN:PX_FT.more,'t-xs');
    s+=tx(L.x+L.w/2,yEnd+50,PX_FT.rr,'t-xs t-mid');
    fsvg.innerHTML=s;
    $('#pxForestNote').innerHTML=`<h4>${PX_FOREST[fsel].k}</h4><p>${PX_FOREST[fsel].s}</p>`;
    $$('[data-pxfb]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.pxfb===fsel));
  }
  fsvg.addEventListener('click',e=>{const g=e.target.closest('[data-pxf]');if(!g)return;fsel=+g.dataset.pxf;drawForest()});
  $$('[data-pxfb]').forEach(b=>b.addEventListener('click',()=>{fsel=+b.dataset.pxfb;drawForest()}));
  drawForest();
  const prev=redraws.plex;redraws.plex=()=>{prev&&prev();drawNum();drawForest()};
};
/* =============== 3.4 Steroids, repeats & relapses =============== */
/* Three players: courses over time (usual course, no early improvement, treatment-related fluctuations, A-CIDP and
   recurrence), an A-CIDP rule explorer, and a "what was tried" explorer of forest plots. Curves are schematic
   shapes between published time anchors (8 weeks, the 10 to 54 day range, the 18-day median); they carry no data. */
const WN_STEPS=[
 {from:0,at:.15,k:'Course 1 · the usual shape',sv:'The usual course with treatment',sub:'worse to a nadir, a plateau, then recovery',
  t:'Treatment speeds recovery; it does not switch GBS off',
  txt:'IVIg or plasma exchange speeds recovery but does not cure everyone: about 20% of treated people cannot walk at 6 months and about 5% die as a consequence of GBS (population statistics) <sup class="c" data-ref="Leonhard2024" title="Source 268"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2024">268</a></sup>. 60 to 80% can walk independently 6 months after onset, with or without treatment <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>. Neither treatment has been shown to reduce mortality <sup class="c" data-ref="Hughes2007,Chevret2017" title="Source 75,198"><a href="/guillain-barre-syndrome/sources/#src-Hughes2007">75,198</a></sup>.',
  pt:'These treatments help you recover faster. They do not switch the illness off straight away <sup class="c" data-ref="Hughes2014,Chevret2017" title="Source 75,199"><a href="/guillain-barre-syndrome/sources/#src-Hughes2014">75,199</a></sup>.',
  hook:'About 20% die or have persistent disability despite immunotherapy <sup class="c" data-ref="Hughes2007" title="Source 198"><a href="/guillain-barre-syndrome/sources/#src-Hughes2007">198</a></sup>.'},
 {from:.17,at:.31,k:'Course 2 · no early gain',sv:'No better by 4 weeks',sub:'common, and not proof that treatment failed',
  t:'No improvement in the first 4 weeks is common',
  txt:'About 40% of people on standard plasma exchange or IVIg do not improve in the first 4 weeks. This does not mean the treatment failed, because progression might have been worse without it <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>. In IGOS, 235 people (32%) did not improve after their initial treatment <sup class="c" data-ref="Verboon2019" title="Source 483"><a href="/guillain-barre-syndrome/sources/#src-Verboon2019">483</a></sup>. The guideline does not suggest switching to the other treatment, for lack of trial evidence <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>.',
  pt:'You may not improve in the first weeks, even with treatment. This is common, and it does not mean the treatment failed <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.',
  hook:'Worsening or no change at 4 weeks does not equal treatment failure: about 40% do not improve early <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.'},
 {from:.33,at:.48,k:'Course 3 · fluctuation',sv:'Better, then worse again',sub:'a treatment-related fluctuation',
  t:'A treatment-related fluctuation',
  txt:'A treatment-related fluctuation is progression within 2 months after initial improvement or stabilisation from treatment; it must be told apart from progression with no initial response <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>. The usual view is that the treatment wears off while inflammation is still active <span class="ev hyp">Hypothesis</span> <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>. In a prospective Dutch study the first fluctuation always came within 8 weeks of onset, median day 18 (range 10 to 54) <sup class="c" data-ref="Ruts2010" title="Source 391"><a href="/guillain-barre-syndrome/sources/#src-Ruts2010">391</a></sup>. The guideline suggests considering re-treatment with IVIg or plasma exchange (observational evidence only) <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>.',
  pt:'If you get better and then worse again within a couple of months, tell your team. A repeat treatment may be considered <sup class="c" data-ref="Leonhard2019,vanDoorn2023" title="Source 266,473"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266,473</a></sup>.',
  hook:'Fluctuation: worse again within 2 months of improving on treatment; 6 to 10% <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.'},
 {from:.5,at:.64,k:'Course 4 · a second dip',sv:'A second fluctuation',sub:'some have two; in one study none had more',
  t:'Two fluctuations, but not three',
  txt:'Of 16 people with a fluctuation in the prospective study, 5 (31%) had a second, and none had more <sup class="c" data-ref="Ruts2010" title="Source 391"><a href="/guillain-barre-syndrome/sources/#src-Ruts2010">391</a></sup>. Risk was unrelated to the type of treatment; nobody with a preceding gut infection, mainly distal weakness, an acute motor neuropathy or anti-GM1 antibodies fluctuated <sup class="c" data-ref="Visser1998" title="Source 486"><a href="/guillain-barre-syndrome/sources/#src-Visser1998">486</a></sup>. In IGOS, 36 of 53 people with a fluctuation (68%) were re-treated <sup class="c" data-ref="Verboon2019" title="Source 483"><a href="/guillain-barre-syndrome/sources/#src-Verboon2019">483</a></sup>.',
  pt:'Some people dip twice. Doctors watch closely, because more dips can point to a different condition.',
  hook:'Up to two fluctuations fit GBS; a third points towards A-CIDP <sup class="c" data-ref="Ruts2010" title="Source 391"><a href="/guillain-barre-syndrome/sources/#src-Ruts2010">391</a></sup>.'},
 {from:.67,at:.81,k:'Course 5 · A-CIDP',sv:'Worse after 8 weeks: A-CIDP?',sub:'acute-onset chronic inflammatory demyelinating polyneuropathy',
  t:'When it keeps coming back: acute-onset CIDP',
  txt:'About 5% of people first diagnosed with GBS turn out to have acute-onset CIDP (A-CIDP) <sup class="c" data-ref="Ruts2010,vanDoorn2023" title="Source 391,473"><a href="/guillain-barre-syndrome/sources/#src-Ruts2010">391,473</a></sup>. A-CIDP should be considered with deterioration more than 8 weeks after onset, or three or more episodes of worsening <sup class="c" data-ref="Ruts2010" title="Source 391"><a href="/guillain-barre-syndrome/sources/#src-Ruts2010">391</a></sup>. Further worsening after 8 weeks had a sensitivity of 100% and a specificity of 92%; three or more fluctuations, 52% and 96% <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>. People with A-CIDP were less severely affected, did not need ventilation and rarely had cranial nerve involvement <sup class="c" data-ref="Ruts2010" title="Source 391"><a href="/guillain-barre-syndrome/sources/#src-Ruts2010">391</a></sup>.',
  pt:'If you get worse after 8 weeks, doctors may check for a related long-term condition called CIDP <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>.',
  hook:'A-CIDP: worsening 8 weeks or more after onset, or 3 or more episodes <sup class="c" data-ref="Ruts2010,vanDoorn2023" title="Source 391,473"><a href="/guillain-barre-syndrome/sources/#src-Ruts2010">391,473</a></sup>.'},
 {from:.84,at:.97,k:'Course 6 · years later',sv:'GBS again, years later',sub:'a recurrence after recovery',
  t:'Recurrence is uncommon',
  txt:'Relapses of GBS occur in 2 to 5% <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>. In a survey, 9 of 245 people had a confirmed recurrence (3.7%, arithmetic) <sup class="c" data-ref="Kuitwaard2009JPNS" title="Source 245"><a href="/guillain-barre-syndrome/sources/#src-Kuitwaard2009JPNS">245</a></sup>. A series of 32 people with recurrent GBS (81 episodes) defined it as at least 2 months between episodes after full recovery, or 4 months after partial recovery; they were younger (mean 34.2 against 46.9 years), and recurrence was more frequent under 30, with milder symptoms and in Miller Fisher syndrome <sup class="c" data-ref="Kuitwaard2009JNNP" title="Source 244"><a href="/guillain-barre-syndrome/sources/#src-Kuitwaard2009JNNP">244</a></sup>.',
  pt:'Getting GBS a second time is uncommon, at about 2 to 5 in 100 people <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.',
  hook:'Fluctuation 6 to 10%, A-CIDP about 5%, recurrence 2 to 5% <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.'}
];
const WN_L={
  y1:'weaker',y0:'stronger',x:'weeks from onset of weakness',xN:'weeks from onset',
  tx:'first treatment',retx:'re-treatment considered',retxN:'re-treat?',nadir:'nadir',
  w4:'4 weeks',w8:'8 weeks',band:'first fluctuations: day 10 to 54',bandN:'day 10 to 54',med:'median day 18',
  forty:'about 40% not yet better',usual:'usual course',
  second:'second fluctuation',acidp:'worse after 8 weeks',acidpN:'after 8 weeks',
  rec:'years later',recT:'2 to 5 in 100',recL1:'after full recovery,',recL2:'a new episode',
  sch:'Schematic shapes: only the time marks are published'
};
/* key points of each schematic course: [day, level 0..1] */
const WN_C={
  base:[ [0,0],[4,.45],[10,.8],[24,.8],[40,.6],[70,.38],[112,.2] ],
  late:[ [0,0],[4,.5],[11,.84],[44,.84],[62,.66],[90,.46],[112,.36] ],
  trf1:[ [0,0],[4,.45],[9,.72],[15,.54],[19,.78],[26,.62],[45,.46],[80,.3],[112,.2] ],
  trf2:[ [0,0],[4,.45],[9,.72],[15,.54],[19,.78],[27,.6],[33,.52],[39,.72],[48,.55],[80,.33],[112,.22] ],
  acidp:[ [0,0],[4,.4],[9,.64],[15,.5],[19,.7],[27,.52],[33,.5],[39,.68],[50,.5],[62,.48],[73,.7],[86,.56],[112,.5] ],
  full:[ [0,0],[4,.45],[10,.8],[24,.8],[45,.5],[80,.14],[112,.02] ]
};
const WN_KEY=['base','late','trf1','trf2','acidp','full'];
/* the A-CIDP rule explorer */
const WN_RULE={
  fl:'Fits a treatment-related fluctuation',ac:'Published rule: consider A-CIDP',
  why8W:['Worsening after 8 weeks:','sensitivity 100%, specificity 92%'],why3W:['3 or more episodes:','sensitivity 52%, specificity 96%'],
  why8N:['After 8 weeks: sensitivity 100%,','specificity 92%'],why3N:['3 or more: sensitivity 52%,','specificity 96%'],
  ok:'Within 8 weeks and fewer than 3 episodes',okN:['Within 8 weeks,','fewer than 3 episodes'],
  sFl:'Worsening that comes within 8 weeks of onset and fewer than three times fits a treatment-related fluctuation of GBS. The guideline suggests considering re-treatment with IVIg or plasma exchange; there is no randomised trial, only observational data <sup class="c" data-ref="Leonhard2019,vanDoorn2023" title="Source 266,473"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266,473</a></sup>.',
  sAc:'By the published rule, A-CIDP should be considered with deterioration after 8 weeks from onset or three or more episodes of worsening, especially if the person can still walk, lacks cranial nerve weakness and has CIDP-like nerve conduction <sup class="c" data-ref="Ruts2010" title="Source 391"><a href="/guillain-barre-syndrome/sources/#src-Ruts2010">391</a></sup>. A-CIDP cannot be confirmed unless worsening continues at least 8 weeks after onset, and it is then treated as CIDP (as published) <sup class="c" data-ref="vanDoorn2023,VandenBergh2021" title="Source 467,473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">467,473</a></sup>.',
  ep:'episode'
};
/* "what was tried": forest-style views */
const WN_TRIED={
  ster:{t:'Corticosteroids: change in disability grade at 4 weeks',tN:['Corticosteroids: disability','change at 4 weeks'],
    lo:-1.6,hi:1.6,ticks:[-1.5,-1,-.5,0,.5,1,1.5],left:'less improvement with steroids',right:'more improvement',leftN:'less improvement',rightN:'more',log:false,
    rows:[{k:'All steroids (6 trials, 587 people)',kn:'All (6 trials, 587)',v:-.36,a:-.88,b:.16},{k:'Oral (4 trials, 120 people)',kn:'Oral (4 trials, 120)',v:-.82,a:-1.47,b:-.17},{k:'Intravenous (2 trials, 467 people)',kn:'IV (2 trials, 467)',v:.17,a:-.06,b:.39}],
    s:'Cochrane 2016: overall 0.36 grade less improvement with corticosteroids, not significant. Oral steroids (very low quality) gave 0.82 grade less improvement, the signal for possible harm; intravenous steroids made no significant difference. Diabetes needing insulin was more common (RR 2.21) and hypertension less common (RR 0.15) with steroids <sup class="c" data-ref="Hughes2016" title="Source 200"><a href="/guillain-barre-syndrome/sources/#src-Hughes2016">200</a></sup>. The 2023 EAN/PNS guideline strongly recommends against oral corticosteroids and weakly against IV methylprednisolone, alone or added to IVIg <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>.'},
  sid:{t:'A second IVIg course: better disability score at 4 weeks (odds ratio)',tN:['Second IVIg course: odds','ratio, better at 4 weeks'],
    lo:.125,hi:8,ticks:[.125,.25,.5,1,2,4,8],left:'favours one course',right:'favours a second',leftN:'one course',rightN:'second',log:true,
    rows:[{k:'SID-GBS, randomised (93 people)',kn:'SID-GBS, randomised',v:1.4,a:.6,b:3.3},{k:'ISID early second course (not randomised)',kn:'ISID early (not random)',v:.70,a:.16,b:3.04},{k:'ISID late second course (not randomised)',kn:'ISID late (not random)',v:.66,a:.18,b:2.5}],
    bars:{t:'Serious adverse events, first 30 days',a:['Second course',35],b:['Placebo',16]},
    s:'SID-GBS gave people with a poor prognosis (mEGOS 6 or more) a second 2 g/kg course or placebo 7 to 9 days after inclusion: adjusted common odds ratio 1.4 (95% CI 0.6 to 3.3; P=0.45), with serious adverse events in 35% against 16%, including thromboembolic events, and four deaths in the second-course group 13 to 24 weeks after randomisation <sup class="c" data-ref="Walgaard2021" title="Source 499"><a href="/guillain-barre-syndrome/sources/#src-Walgaard2021">499</a></sup>. The non-randomised ISID study found no benefit either <sup class="c" data-ref="Verboon2020" title="Source 484"><a href="/guillain-barre-syndrome/sources/#src-Verboon2020">484</a></sup>. The guideline strongly recommends one standard course only for a poor prognosis <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>.'},
  other:{t:'Other drugs: mean difference in disability grade, as reported',tN:['Other drugs: mean','difference, as reported'],
    lo:-2,hi:2,ticks:[-2,-1,0,1,2],left:'',right:'',log:false,
    rows:[{k:'Interferon beta-1a (19 people)',kn:'Interferon beta-1a (19)',v:-.1,a:-1.58,b:1.38},{k:'Eculizumab (2 trials, 41 people)',kn:'Eculizumab (2 trials, 41)',v:-.23,a:-1.79,b:1.34}],
    s:'Cochrane 2020 found six trials of five other interventions with 151 participants in all, all very low certainty, none showing a clinically important difference <sup class="c" data-ref="Doets2020" title="Source 103"><a href="/guillain-barre-syndrome/sources/#src-Doets2020">103</a></sup>. The guideline weakly recommends against eculizumab and strongly against alemtuzumab, BDNF, CSF filtration, cyclophosphamide, interferon beta-1a, muromonab-CD3, mycophenolate mofetil and tripterygium polyglycoside <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>. Complement inhibitors still under study are covered in module 5.4.'}
};
inits.whatnot=()=>{
  const tx=(x,y,s,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`;
  const FN={};WN_KEY.forEach(k=>{FN[k]=monoFn(WN_C[k])});
  /* ---------- main player ---------- */
  const svg=$('#wnSvg'),rg=$('#wnT');let setSt=()=>{};
  function draw(t){
    const N=vb(svg,'720 400','400 600'),p=phaseOf(WN_STEPS,t),P=WN_STEPS[p];
    const nx=WN_STEPS[p+1]?WN_STEPS[p+1].from:1.0001,u=ramp(t,P.from+.01,nx-.03);
    const L=N?{x:44,y:84,w:340,h:240,rx:44,ry:420,rw:340,rh:110}:{x:56,y:84,w:500,h:250,rx:584,ry:84,rw:122,rh:250};
    const X=d=>L.x+L.w*d/112,Y=v=>L.y+L.h-L.h*v;
    let s=tx(16,28,P.sv,'t-big','font-size:18px')+tx(16,46,P.sub,'t-sm');
    s+=`<rect x="${f1(L.x)}" y="${f1(L.y)}" width="${f1(L.w)}" height="${f1(L.h)}" style="fill:var(--field)"/>`;
    /* time anchors */
    if(p>=1){s+=`<line x1="${f1(X(28))}" x2="${f1(X(28))}" y1="${f1(L.y)}" y2="${f1(L.y+L.h)}" class="grid"/>`+tx(X(28)+4,L.y+12,WN_L.w4,'t-xs')}
    if(p>=2&&p<=4){s+=`<rect x="${f1(X(10))}" y="${f1(L.y+L.h-16)}" width="${f1(X(54)-X(10))}" height="16" style="fill:var(--warn);opacity:.22"/>`+tx(X(10)+4,L.y+L.h-4.5,N?WN_L.bandN:WN_L.band,'t-xs','fill:var(--ink)');
      s+=`<line x1="${f1(X(18))}" x2="${f1(X(18))}" y1="${f1(L.y+L.h-28)}" y2="${f1(L.y+L.h-17)}" style="stroke:var(--warn);stroke-width:2.4"/>`}
    if(p>=2){const strong=p===4;s+=`<line x1="${f1(X(56))}" x2="${f1(X(56))}" y1="${f1(L.y)}" y2="${f1(L.y+L.h)}" style="stroke:${strong?'var(--rx)':'var(--muted)'};stroke-width:${strong?2.4:1.2};stroke-dasharray:${strong?'none':'4 4'}"/>`+tx(X(56)+4,L.y+12,WN_L.w8,'t-xs',strong?'fill:var(--rx);font-weight:700':'')}
    /* axes */
    s+=`<line x1="${f1(L.x)}" x2="${f1(L.x+L.w)}" y1="${f1(L.y+L.h)}" y2="${f1(L.y+L.h)}" class="axis"/><line x1="${f1(L.x)}" x2="${f1(L.x)}" y1="${f1(L.y)}" y2="${f1(L.y+L.h)}" class="axis"/>`;
    for(let w=0;w<=16;w+=2)s+=`<line x1="${f1(X(w*7))}" x2="${f1(X(w*7))}" y1="${f1(L.y+L.h)}" y2="${f1(L.y+L.h+4)}" class="axis"/>`+tx(X(w*7),L.y+L.h+15,w,'t-xs t-mid');
    s+=tx(L.x+L.w,L.y+L.h+30,N?WN_L.xN:WN_L.x,'t-xs t-end');
    s+=tx(L.x-6,L.y+10,'↑','t-sm t-end')+tx(L.x+4,L.y-6,WN_L.y1,'t-xs')+tx(L.x-6,L.y+L.h-4,'↓','t-sm t-end');
    s+=tx(L.x,L.y+L.h+44,WN_L.sch,'t-xs','font-style:italic');
    /* treatments */
    const txBar=(d0,d1,lab,a,yo)=>`<g style="opacity:${f1(a)}"><rect x="${f1(X(d0))}" y="${f1(L.y+4+(yo||0))}" width="${f1(X(d1)-X(d0))}" height="10" rx="3" style="fill:var(--ivig)"/></g>`+(lab?`<g style="opacity:${f1(a)}">${kitLabel(X(d1)+4,L.y+13+(yo||0),lab,{})}</g>`:'');
    const key=WN_KEY[p],f=FN[key],upto=p===5?112:112*ease(u);
    /* ghost of the usual course */
    if(p>=1&&p<=4){let d='';for(let i=0;i<=112;i+=2)d+=(i?'L':'M')+f1(X(i))+' '+f1(Y(FN.base(i)));s+=`<path d="${d}" style="fill:none;stroke:var(--muted);stroke-width:1.4;stroke-dasharray:4 4;opacity:.7"/>`;
      s+=tx(X(112)-4,Y(FN.base(112))+16,WN_L.usual,'t-xs t-end')}
    s+=txBar(2,6,p===0?WN_L.tx:'',ramp(upto,2,4));
    if(p>=2&&p<=4)s+=txBar(20,24,p===2?(N?WN_L.retxN:WN_L.retx):'',ramp(upto,20,22),14);
    if(p>=3&&p<=4)s+=txBar(40,44,'',ramp(upto,40,42),14);
    /* the curve */
    {let d='';const n=Math.max(2,Math.round(upto/1));for(let i=0;i<=n;i++){const dd=upto*i/n;d+=(i?'L':'M')+f1(X(dd))+' '+f1(Y(f(dd)))}
      s+=`<path d="${d}" style="fill:none;stroke:var(--rx);stroke-width:3;stroke-linejoin:round;stroke-linecap:round"/>`;
      s+=`<circle cx="${f1(X(upto))}" cy="${f1(Y(f(upto)))}" r="5" style="fill:var(--rx);stroke:var(--panel);stroke-width:2"/>`}
    /* step labels */
    const lab=(d,txt,dy,a)=>upto>=d?kitLabel(X(d),Y(f(d))-(dy||12),txt,{a:a||'m'}):'';
    if(p===0)s+=lab(12,WN_L.nadir);
    if(p===1&&upto>=28)s+=kitLabel(X(28)+6,Y(f(28))-12,WN_L.forty,{});
    if(p===2)s+=lab(18,WN_L.med,14);
    if(p===3||p===4)s+=lab(39,WN_L.second,14);
    if(p===4)s+=lab(73,N?WN_L.acidpN:WN_L.acidp,14);
    /* recurrence panel */
    const ra=p===5?ease(ramp(t,.86,.95)):0;
    if(p===5){const rx=L.rx,ry=L.ry,rw=L.rw,rh=L.rh;
      s+=`<g style="opacity:${f1(.25+.75*ra)}"><rect x="${f1(rx)}" y="${f1(ry)}" width="${f1(rw)}" height="${f1(rh)}" style="fill:var(--field)"/>`;
      if(!N)s+=`<path d="M${f1(L.x+L.w+6)} ${f1(L.y+L.h+6)}l8 -12M${f1(L.x+L.w+14)} ${f1(L.y+L.h+6)}l8 -12" style="stroke:var(--muted);stroke-width:1.6"/>`;
      const rf=d=>FN.base(Math.min(112,d*1.6))*.75,RX=v=>rx+rw*v,RY=v=>ry+rh-rh*v;
      let d='';for(let i=0;i<=40;i++){const v=i/40,k=ramp(v,.35,1);d+=(i?'L':'M')+f1(RX(v))+' '+f1(RY(k>0?rf(k*70):0))}
      s+=`<path d="${d}" style="fill:none;stroke:var(--rx);stroke-width:3;stroke-linejoin:round"/>`;
      s+=tx(rx+6,ry+14,WN_L.rec,'t-xs','fill:var(--ink);font-weight:700');
      if(N){s+=tx(rx+rw-6,ry+14,WN_L.recT,'t-lbl t-end','fill:var(--rx)');s+=tx(rx,ry+rh+16,WN_L.recL1+' '+WN_L.recL2,'t-xs')}
      else{s+=tx(rx+rw/2,ry+rh+18,WN_L.recT,'t-lbl t-mid','fill:var(--rx)');s+=tx(rx+rw/2,ry+rh+34,WN_L.recL1,'t-xs t-mid')+tx(rx+rw/2,ry+rh+47,WN_L.recL2,'t-xs t-mid')}
      s+='</g>'}
    svg.innerHTML=s;
    setSt(p);$('#wnNote').innerHTML=noteHTML(P);
  }
  const stop=playWire(rg,$('#wnPlay'),draw,24000,'Replay','whatnot');
  setSt=stepWire($('#wnSteps'),WN_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- A-CIDP rule ---------- */
  const rsvg=$('#wnRuleSvg');let nEp=2,late=false;
  function drawRule(){
    const N=vb(rsvg,'720 200','400 300');
    const L=N?{x:20,w:360,y:70}:{x:30,w:420,y:80};
    const X=d=>L.x+L.w*d/112;
    const days=late?[ [70],[18,70],[18,38,70] ][nEp-1]:[ [18],[18,38],[18,38,50] ][nEp-1];
    const isA=late||nEp>=3;
    let s=`<line x1="${f1(L.x)}" x2="${f1(L.x+L.w)}" y1="${f1(L.y)}" y2="${f1(L.y)}" class="axis"/>`;
    s+=`<rect x="${f1(X(56))}" y="${f1(L.y-34)}" width="${f1(X(112)-X(56))}" height="34" style="fill:var(--rx-soft)"/>`;
    s+=`<line x1="${f1(X(56))}" x2="${f1(X(56))}" y1="${f1(L.y-40)}" y2="${f1(L.y+6)}" style="stroke:var(--rx);stroke-width:2"/>`+tx(X(56)+4,L.y-42,WN_L.w8,'t-xs','fill:var(--rx);font-weight:700');
    for(let w=0;w<=16;w+=4)s+=`<line x1="${f1(X(w*7))}" x2="${f1(X(w*7))}" y1="${f1(L.y)}" y2="${f1(L.y+5)}" class="axis"/>`+tx(X(w*7),L.y+18,w,'t-xs t-mid');
    s+=tx(L.x+L.w,L.y+32,WN_L.xN,'t-xs t-end');
    days.forEach((d,i)=>{s+=`<path d="M${f1(X(d))} ${f1(L.y-4)}l-8 -16h16z" style="fill:var(--rx);stroke:var(--panel);stroke-width:1.4"/>`+tx(X(d),L.y-24,String(i+1),'t-xs t-mid','fill:var(--ink);font-weight:700')});
    /* verdict */
    const vx=N?20:480,vy=N?140:40;
    const lines=[];
    if(late)(N?WN_RULE.why8N:WN_RULE.why8W).forEach(l=>lines.push(l));
    if(nEp>=3)(N?WN_RULE.why3N:WN_RULE.why3W).forEach(l=>lines.push(l));
    if(!isA)(N?WN_RULE.okN:[WN_RULE.ok]).forEach(l=>lines.push(l));
    s+=`<rect x="${f1(vx-8)}" y="${f1(vy-18)}" width="${N?368:236}" height="${f1(36+lines.length*17)}" rx="10" style="fill:${isA?'var(--rx-soft)':'var(--good-soft)'}"/>`;
    s+=tx(vx,vy,isA?WN_RULE.ac:WN_RULE.fl,'t-sm',`fill:${isA?'var(--rx)':'var(--good)'};font-weight:700`);
    lines.forEach((l,i)=>{s+=tx(vx,vy+22+i*17,l,'t-xs','fill:var(--ink)')});
    rsvg.innerHTML=s;
    $('#wnRuleNote').innerHTML=isA?WN_RULE.sAc:WN_RULE.sFl;
    $$('[data-wne]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.wne===nEp));
    $$('[data-wnt]').forEach(b=>b.setAttribute('aria-pressed',(b.dataset.wnt==='late')===late));
  }
  $$('[data-wne]').forEach(b=>b.addEventListener('click',()=>{nEp=+b.dataset.wne;drawRule()}));
  $$('[data-wnt]').forEach(b=>b.addEventListener('click',()=>{late=b.dataset.wnt==='late';drawRule()}));
  drawRule();

  /* ---------- what was tried ---------- */
  const tsvg=$('#wnTriedSvg');let view='ster';
  function drawTried(){
    const V=WN_TRIED[view],nb=V.bars?1:0,N=vb(tsvg,'720 '+(nb?340:250),'400 '+(nb?500:400));
    const L=N?{x:24,w:350,y0:N&&V.tN?78:60,rh:56}:{x:330,w:340,y0:62,rh:40};
    const sc=V.log?(v=>Math.log2(v)):(v=>v),X=v=>L.x+L.w*(sc(v)-sc(V.lo))/(sc(V.hi)-sc(V.lo));
    let s='';
    if(N)V.tN.forEach((l,i)=>{s+=tx(16,22+i*17,l,'t-lbl')});else s+=tx(16,24,V.t,'t-lbl');
    const ref=V.log?1:0;
    V.rows.forEach((R,i)=>{const y=L.y0+i*L.rh+(N?16:0);
      if(N)s+=tx(L.x,y-14,R.kn,'t-sm','fill:var(--ink)');else s+=tx(16,y+4,R.k,'t-sm','fill:var(--ink)');
      s+=`<line x1="${f1(X(ref))}" x2="${f1(X(ref))}" y1="${f1(y-(N?8:L.rh/2))}" y2="${f1(y+(N?12:L.rh/2))}" style="stroke:var(--muted);stroke-width:1.4"/>`;
      s+=`<line x1="${f1(X(R.a))}" x2="${f1(X(R.b))}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:var(--ink);stroke-width:2.2"/><rect x="${f1(X(R.v)-6)}" y="${f1(y-6)}" width="12" height="12" style="fill:var(--rx);stroke:var(--ink)"/>`;
      s+=tx(N?L.x+L.w:X(V.hi)+8,N?y-14:y+4,(R.v>0&&!V.log?'+':'')+R.v.toFixed(2),N?'t-sm t-end':'t-sm','fill:var(--ink);font-weight:700')});
    const yA=L.y0+V.rows.length*L.rh+(N?0:-10);
    s+=`<line x1="${f1(L.x)}" x2="${f1(L.x+L.w)}" y1="${f1(yA)}" y2="${f1(yA)}" class="axis"/>`;
    V.ticks.forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${f1(yA)}" y2="${f1(yA+5)}" class="axis"/>`+tx(X(v),yA+17,(v>0&&!V.log?'+':'')+v,'t-xs t-mid')});
    if(V.left)s+=tx(X(ref)-8,yA+33,N?V.leftN:V.left,'t-xs t-end')+tx(X(ref)+8,yA+33,N?V.rightN:V.right,'t-xs');
    if(V.bars){const B=V.bars,by=yA+(N?66:58),bx=N?24:330,bw=N?300:300;
      s+=tx(16,by,B.t,'t-sm','fill:var(--ink);font-weight:700');
      [B.a,B.b].forEach(([n,v],i)=>{const y=by+14+i*(N?42:30);
        if(N)s+=tx(bx,y+31,n,'t-xs');else s+=tx(bx-10,y+13,n,'t-sm t-end','fill:var(--ink)');
        s+=`<rect x="${f1(bx)}" y="${f1(y)}" width="${f1(bw)}" height="18" rx="4" style="fill:var(--panel-2)"/><rect x="${f1(bx)}" y="${f1(y)}" width="${f1(bw*v/100)}" height="18" rx="4" style="fill:${i?'var(--muted)':'var(--rx)'};opacity:.85"/>`+tx(bx+bw*v/100+6,y+13,v+'%','t-sm','fill:var(--ink);font-weight:700')})}
    tsvg.innerHTML=s;
    $('#wnTriedNote').innerHTML=V.s;
    $$('[data-wnv]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.wnv===view));
  }
  $$('[data-wnv]').forEach(b=>b.addEventListener('click',()=>{view=b.dataset.wnv;drawTried()}));
  drawTried();
  const prev=redraws.whatnot;redraws.whatnot=()=>{prev&&prev();drawRule();drawTried()};
};
/* =============== 3.5 Autonomic storms =============== */
/* Widgets: one schematic day on a monitor (main player) and the body-system explorer with two datasets.
   The traces are illustrative; the dashed limits are Pfeiffer 1999's published values, cited in the HTML. */
const AU_SBP=monoFn([ [0,128],[2.5,130],[4,104],[5,112],[7,196],[9,204],[10.5,190],[11.6,176],[12,150],[12.4,122],[13.5,118],[15,92],[16.5,78],[18,84],[19.5,110],[21,126],[24,130] ]);
const AU_HR=monoFn([ [0,86],[3,88],[4.5,96],[7,132],[9.5,138],[11.6,128],[11.9,70],[12.05,30],[12.25,28],[12.5,62],[13.5,74],[15,56],[16.5,44],[18,50],[19.5,78],[21,88],[24,86] ]);
const AU_SYM=monoFn([ [0,.4],[3,.45],[7,.95],[11.5,.85],[13,.5],[15.5,.2],[18,.25],[21,.45],[24,.45] ]);
const AU_VAG=monoFn([ [0,.4],[11.7,.35],[12.1,1],[12.6,.5],[15.5,.85],[18,.7],[21,.45],[24,.45] ]);
const AU_HEART='M0 .85C-.2 .65 -1 .2 -1 -.3C-1 -.75 -.55 -.95 -.25 -.85C-.1 -.8 0 -.65 0 -.55C0 -.65 .1 -.8 .25 -.85C.55 -.95 1 -.75 1 -.3C1 .2 .2 .65 0 .85Z';
const AU_EVT=[ {h:0,t:'steady for now'},{h:3.2,t:'surge: sympathetic overactivity'},{h:11.7,t:'tracheal suction: a brief pause'},{h:12.8,t:'settling after the pause'},{h:14.5,t:'pressure and heart rate fall'},{h:19,t:'settling, still monitored'} ];
const AU_LINES={sbp:[ {v:165,t:'mean above 165',up:true},{v:85,t:'minimum below 85',up:false} ],hr:[ {v:125,t:'mean above 125',up:true},{v:48,t:'below 48: bradycardia',up:false} ]};
const AU_STEPS=[
 {from:0,at:.06,k:'Background',t:'Nerves that run the organs',
  txt:'Autonomic fibres, sympathetic and parasympathetic, run alongside the motor nerves and can be hit by the same attack. Features involve the heart and vessels, sweating and the gut <sup class="c" data-ref="Zochodne1994" title="Source 543"><a href="/guillain-barre-syndrome/sources/#src-Zochodne1994">543</a></sup>. Estimates of how often range from 10 to 50%, depending on the definition <sup class="c" data-ref="Weiss2025" title="Source 504"><a href="/guillain-barre-syndrome/sources/#src-Weiss2025">504</a></sup>.',
  pt:'These are the nerves that work without you thinking: heartbeat, blood pressure, sweating, bowels and bladder.'},
 {from:.13,at:.29,k:'Sympathetic surge',t:'Pressure and pulse race',
  txt:'In Pfeiffer\'s ventilated cohort, all 16 people whose mean systolic pressure was above 165 mmHg also had persistent tachycardia (mean over 125) or were on beta-blockers <sup class="c" data-ref="Pfeiffer1999" title="Source 358"><a href="/guillain-barre-syndrome/sources/#src-Pfeiffer1999">358</a></sup>. In one detailed case, rises in pressure behaved like sympathetic overactivity <sup class="c" data-ref="Ropper1990" title="Source 384"><a href="/guillain-barre-syndrome/sources/#src-Ropper1990">384</a></sup>.'},
 {from:.36,at:.42,k:'The swing',t:'The daily range widens',
  txt:'The gap between the day\'s highest and lowest systolic pressure has passed 85 mmHg, as it did in 27 of 36 ventilated people. Except in one person, every bradycardia was preceded by a day like this, so a wide swing is a warning sign <sup class="c" data-ref="Pfeiffer1999" title="Source 358"><a href="/guillain-barre-syndrome/sources/#src-Pfeiffer1999">358</a></sup>. A failed baroreflex buffer may explain the speed of the swings <sup class="c" data-ref="Ropper1990" title="Source 384"><a href="/guillain-barre-syndrome/sources/#src-Ropper1990">384</a></sup>.',
  hook:'A daily systolic range above 85 mmHg preceded bradycardia <sup class="c" data-ref="Pfeiffer1999" title="Source 358"><a href="/guillain-barre-syndrome/sources/#src-Pfeiffer1999">358</a></sup>.'},
 {from:.485,at:.504,k:'A trigger',t:'Suction, then a slow heart',
  txt:'Tracheal suction stimulates the vagus nerve. Serious arrhythmias were often preceded by brief asystole after suction, and occurred only in ventilated people <sup class="c" data-ref="Winer1988" title="Source 511"><a href="/guillain-barre-syndrome/sources/#src-Winer1988">511</a></sup>. Minor stimulation such as suction, intubation, mouth care or bathing can provoke severe bradycardia; some teams keep atropine ready, as a 2025 review reports <sup class="c" data-ref="Weiss2025" title="Source 504"><a href="/guillain-barre-syndrome/sources/#src-Weiss2025">504</a></sup>.',
  hook:'Suctioning can trigger asystole in severe dysautonomia <sup class="c" data-ref="Winer1988,Weiss2025" title="Source 504,511"><a href="/guillain-barre-syndrome/sources/#src-Winer1988">504,511</a></sup>.'},
 {from:.6,at:.69,k:'Vagal side',t:'Pressure falls',
  txt:'Three people in Pfeiffer\'s cohort had hypotension (minimum systolic under 85 mmHg) with unprovoked bradycardia <sup class="c" data-ref="Pfeiffer1999" title="Source 358"><a href="/guillain-barre-syndrome/sources/#src-Pfeiffer1999">358</a></sup>. Falls in pressure can behave like a vasodepressor reflex with a "vagotomised" heart <sup class="c" data-ref="Ropper1990" title="Source 384"><a href="/guillain-barre-syndrome/sources/#src-Ropper1990">384</a></sup>. Sepsis, bleeding and pulmonary embolism must be excluded before blaming dysautonomia <sup class="c" data-ref="Weiss2025" title="Source 504"><a href="/guillain-barre-syndrome/sources/#src-Weiss2025">504</a></sup>.'},
 {from:.8,at:.92,k:'Recovery phase',t:'Still watched in recovery',
  txt:'Up to two-thirds of deaths occur in the recovery phase, and the guideline stresses monitoring people who have recently left intensive care <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>. In 527 Dutch patients, 10 of 15 deaths came after neurological improvement had begun <sup class="c" data-ref="vanDenBerg2013" title="Source 463"><a href="/guillain-barre-syndrome/sources/#src-vanDenBerg2013">463</a></sup>.',
  pt:'The checks do not stop just because strength is coming back. That is normal care, not a sign that something is wrong <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.'}];
/* body-system explorer */
const AU_DS={
 mayo:{t:'Mayo Clinic: among people with dysautonomia',max:50,rows:[ {t:'ileus',v:42,o:'gut'},{t:'hypertension',v:39,o:'bp'},{t:'hypotension',v:37,o:'bp'},{t:'fever',v:29,o:'temp'},{t:'tachycardia or bradycardia',v:27,o:'heart'},{t:'urinary retention',v:24,o:'bladder'} ]},
 us:{t:'US inpatients, billing codes (n=2,587)',max:50,rows:[ {t:'diarrhoea or constipation',v:15.5,o:'gut'},{t:'hyponatraemia',v:14.9,o:'na'},{t:'SIADH',v:4.8,o:'na'},{t:'bradycardia',v:4.7,o:'heart'},{t:'urinary retention',v:3.9,o:'bladder'} ]}};
const AU_ORG={
 heart:{p:[5,-14],l:'heart',a:'s',t:'Heart rate and rhythm',txt:'About 23% have a heart rate over 100, rising to 75% on a ventilator (review figure) <sup class="c" data-ref="Weiss2025" title="Source 504"><a href="/guillain-barre-syndrome/sources/#src-Weiss2025">504</a></sup>. Serious arrhythmias occurred in 11 of 33 ventilated people in one series <sup class="c" data-ref="Winer1988" title="Source 511"><a href="/guillain-barre-syndrome/sources/#src-Winer1988">511</a></sup>. Takotsubo, a reversible stress weakness of the heart muscle, is also reported <sup class="c" data-ref="Terayama2024" title="Source 445"><a href="/guillain-barre-syndrome/sources/#src-Terayama2024">445</a></sup>.'},
 bp:{p:[-25,4],l:'vessels',a:'e',t:'Blood pressure',txt:'Both high and low pressure, sometimes in the same day. A daily systolic range above 85 mmHg was a warning sign for bradycardia <sup class="c" data-ref="Pfeiffer1999" title="Source 358"><a href="/guillain-barre-syndrome/sources/#src-Pfeiffer1999">358</a></sup>.'},
 gut:{p:[2,8],l:'gut',a:'s',t:'Gut',txt:'Ileus (a gut that stops moving) led the Mayo list at 42% <sup class="c" data-ref="Chakraborty2020" title="Source 71"><a href="/guillain-barre-syndrome/sources/#src-Chakraborty2020">71</a></sup>, but in another series most ileus had other causes, such as opioids, immobility or previous surgery <sup class="c" data-ref="Burns2001" title="Source 62"><a href="/guillain-barre-syndrome/sources/#src-Burns2001">62</a></sup>.'},
 bladder:{p:[0,24],l:'bladder',a:'s',t:'Bladder',txt:'Urinary dysfunction in 27.7% and retention in 9.2% of 65 consecutive patients, commoner in AIDP than AMAN <sup class="c" data-ref="Sakakibara2009" title="Source 398"><a href="/guillain-barre-syndrome/sources/#src-Sakakibara2009">398</a></sup>. Bladder trouble at the very start is a red flag for another diagnosis <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.'},
 temp:{p:[-28,24],l:'skin',a:'e',t:'Temperature and sweating',txt:'Fever was recorded in 29% of people with dysautonomia at Mayo <sup class="c" data-ref="Chakraborty2020" title="Source 71"><a href="/guillain-barre-syndrome/sources/#src-Chakraborty2020">71</a></sup>, and sweating (sudomotor) changes are part of the classic picture <sup class="c" data-ref="Zochodne1994" title="Source 543"><a href="/guillain-barre-syndrome/sources/#src-Zochodne1994">543</a></sup>.'},
 na:{p:[0,-46],l:'brain',a:'s',t:'Sodium and the brain',txt:'Low sodium is common and its mechanism is debated <sup class="c" data-ref="Netto2025" title="Source 329"><a href="/guillain-barre-syndrome/sources/#src-Netto2025">329</a></sup>. Altered consciousness should prompt thought of low sodium or PRES, a brain swelling linked to pressure swings <sup class="c" data-ref="Weiss2025" title="Source 504"><a href="/guillain-barre-syndrome/sources/#src-Weiss2025">504</a></sup>.'}};

inits.autonomic=()=>{
  /* ---------- main player ---------- */
  const svg=$('#auSvg'),rg=$('#auT');let setSt=()=>{};
  function draw(t){
    const N=vb(svg,'720 380','400 640');
    const L=N?{hx:12,hy:20,cx:62,cy:86,cr:40,r1x:136,r2x:268,ry:54,gx:136,gy:112,dx:12,dy:150,dw:376,ey:216,
               px:44,pw:340,sy:262,sh:140,hy2:452,hh:116,xl:600,cap:626}
             :{hx:14,hy:22,cx:84,cy:96,cr:52,r1x:14,r2x:134,ry:182,gx:14,gy:244,dx:14,dy:282,dw:230,ey:356,
               px:304,pw:400,sy:40,sh:146,hy2:222,hh:116,xl:356,cap:372};
    const h=24*t;
    let s=`<text x="${L.hx}" y="${L.hy}" class="t-xs" style="fill:var(--ink);font-weight:700;letter-spacing:.06em">THE AUTONOMIC BALANCE</text>`;
    /* heart beating at the schematic rate */
    const hr=AU_HR(h),sbp=AU_SBP(h),beat=Math.pow(Math.max(0,Math.sin(t*Math.PI*2*hr*.5)),8),sc=L.cr*(1+.08*beat);
    s+=`<path d="${AU_HEART}" transform="translate(${f1(L.cx)} ${f1(L.cy)}) scale(${f1(sc)})" style="fill:var(--heart);stroke:var(--ink);stroke-width:${(1.4/sc).toFixed(3)}"/>`;
    /* readouts */
    let mn=1e9,mx=-1e9;for(let u=0;u<=h+1e-9;u+=.1){const v=AU_SBP(u);if(v<mn)mn=v;if(v>mx)mx=v}const rng=Math.round(mx-mn);
    s+=`<text x="${L.r1x}" y="${L.ry}" class="t-xs">SYSTOLIC BP</text><text x="${L.r1x}" y="${L.ry+20}" class="t-big" style="font-size:19px">${Math.round(sbp)} mmHg</text>`;
    s+=`<text x="${L.r2x}" y="${L.ry}" class="t-xs">HEART RATE</text><text x="${L.r2x}" y="${L.ry+20}" class="t-big" style="font-size:19px">${Math.round(hr)} /min</text>`;
    s+=`<text x="${L.gx}" y="${L.gy}" class="t-xs">TODAY'S SYSTOLIC RANGE</text><text x="${L.gx}" y="${L.gy+20}" class="t-lbl">${rng} mmHg${rng>85?': over 85, a warning':''}</text>`;
    /* drive bars */
    [ ['sympathetic drive',AU_SYM(h),'var(--rx)'],['vagal drive',AU_VAG(h),'var(--care)'] ].forEach((d,i)=>{const y=L.dy+i*32;
      s+=`<text x="${L.dx}" y="${y}" class="t-xs" style="fill:var(--ink)">${d[0]} (schematic)</text><rect x="${L.dx}" y="${y+5}" width="${L.dw}" height="10" rx="5" style="fill:var(--panel-2)"/><rect x="${L.dx}" y="${y+5}" width="${f1(L.dw*d[1])}" height="10" rx="5" style="fill:${d[2]}"/>`});
    let ev=AU_EVT[0];AU_EVT.forEach(e=>{if(h>=e.h)ev=e});
    s+=`<text x="${L.dx}" y="${L.ey}" class="t-sm">now: <tspan style="fill:var(--ink);font-weight:700">${ev.t}</tspan></text>`;
    /* traces */
    const plot=(y0,hh,lo,hi,f,lines,title,col)=>{const C=curve(L.px,y0,L.pw,hh,f,{x0:0,x1:24,y0:lo,y1:hi,upto:h,col,dot:true,lw:2.2});let g=C.svg;
      g+=`<text x="${L.px}" y="${y0-7}" class="t-xs" style="fill:var(--ink);font-weight:700">${title}</text>`;
      [lo,Math.round((lo+hi)/2),hi].forEach(v=>{g+=`<text x="${L.px-5}" y="${f1(C.Y(v)+3)}" class="t-xs t-end">${v}</text>`});
      lines.forEach(l=>{const y=C.Y(l.v);g+=`<line x1="${L.px}" x2="${L.px+L.pw}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:${l.up?'var(--bad)':'var(--care)'};stroke-width:1.3;stroke-dasharray:6 4"/>`;
        g+=l.up?kitLabel(L.px+L.pw-4,y-4,l.t,{a:'e',halo:'var(--field)'}):kitLabel(L.px+4,y+12,l.t,{halo:'var(--field)'})});
      return {g,C}};
    const P1=plot(L.sy,L.sh,40,220,AU_SBP,AU_LINES.sbp,'systolic blood pressure, mmHg','var(--rx)');
    if(h>0){const ya=P1.C.Y(mx),yb=P1.C.Y(mn);s+=`<rect x="${L.px}" y="${f1(ya)}" width="${L.pw}" height="${f1(yb-ya)}" style="fill:${rng>85?'var(--bad)':'var(--muted)'};opacity:.08"/>`}
    s+=P1.g;
    s+=plot(L.hy2,L.hh,20,160,AU_HR,AU_LINES.hr,'heart rate, beats per minute','var(--care)').g;
    if(h>=11.7&&h<13.2){const C2=curve(L.px,L.hy2,L.pw,L.hh,AU_HR,{x0:0,x1:24,y0:20,y1:160});const x=C2.X(12.1);
      s+=kitLabel(x,L.hy2+L.hh-6,'suction',{a:'m',halo:'var(--field)'})}
    const T=tline(L.px,L.xl-14,L.pw,{min:0,max:24,step:6,fmt:v=>v});s+=T.svg.replace(/<line[^>]*class="axis"\/>/,'');
    s+=`<text x="${L.px+L.pw}" y="${L.cap}" class="t-xs t-end">hours of one schematic day</text>`;
    svg.innerHTML=s;
    const p=phaseOf(AU_STEPS,t);setSt(p);$('#auNote').innerHTML=noteHTML(AU_STEPS[p]);
  }
  const stop=playWire(rg,$('#auPlay'),draw,22000,'Replay','autonomic');
  setSt=stepWire($('#auSteps'),AU_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- body-system explorer ---------- */
  const os=$('#auOrg');let org='heart',ds='mayo';
  function drawOrg(){
    const N=vb(os,'720 330','400 620');
    const D=AU_DS[ds],O=AU_ORG[org];
    const L=N?{bx:200,by:16,bs:250,tx:12,ty:300,lx:12,lw:300,y0:330,dy:46,vx:388}:{bx:120,by:22,bs:290,tx:270,ty:24,lx:270,lw:330,y0:52,dy:44,vx:706};
    const B=bodyFront(L.bx,L.by,L.bs,{});let s=B.svg;const k=L.bs/146,T=(a,b)=>[L.bx+a*k,L.by+(b+50)*k];
    Object.keys(AU_ORG).forEach(id=>{const q=AU_ORG[id],[x,y]=T(q.p[0],q.p[1]),on=id===org;
      s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${on?9:6}" style="fill:${on?'var(--rx)':'var(--panel)'};stroke:var(--ink);stroke-width:1.6"/>`;
      s+=kitLabel(q.a==='e'?x-13:x+13,y+4,q.l,{a:q.a==='e'?'e':''})});
    s+=`<text x="${L.tx}" y="${L.ty}" class="t-xs" style="fill:var(--ink);font-weight:700">${D.t}</text>`;
    D.rows.forEach((r,i)=>{const y=L.y0+i*L.dy,on=r.o===org,w=L.lw*r.v/D.max;
      s+=`<text x="${L.lx}" y="${y}" class="t-sm" style="${on?'fill:var(--ink);font-weight:700':''}">${r.t}</text>`;
      s+=`<rect x="${L.lx}" y="${y+6}" width="${L.lw}" height="14" rx="4" style="fill:var(--panel-2)"/><rect x="${L.lx}" y="${y+6}" width="${f1(w)}" height="14" rx="4" style="fill:${on?'var(--rx)':'var(--muted)'};opacity:${on?1:.45}"/>`;
      s+=`<text x="${f1(L.lx+w+6)}" y="${y+17}" class="t-sm" style="fill:var(--ink)">${r.v}%</text>`});
    if(!D.rows.some(r=>r.o===org))s+=`<text x="${L.lx}" y="${L.y0+D.rows.length*L.dy}" class="t-sm">not counted in this dataset</text>`;
    os.innerHTML=s;
    $('#auOrgOut').innerHTML=`<b>${O.t}</b>${O.txt}`;
  }
  const mod=$('#m-autonomic');
  $$('[data-org]',mod).forEach(b=>b.addEventListener('click',()=>{org=b.dataset.org;$$('[data-org]',mod).forEach(x=>x.setAttribute('aria-pressed',x===b));drawOrg()}));
  $$('[data-ds]',mod).forEach(b=>b.addEventListener('click',()=>{ds=b.dataset.ds;$$('[data-ds]',mod).forEach(x=>x.setAttribute('aria-pressed',x===b));drawOrg()}));
  drawOrg();
  const prev=redraws.autonomic;redraws.autonomic=()=>{prev&&prev();drawOrg()};
};
/* =============== 3.6 Intensive care & pain =============== */
/* Widgets: a schematic ventilator stay (main player), the Walgaard 2017 week-one rows, and the Pandey 2005 pain trial
   (second player). The stay is illustrative; weaning lines, medians and trial values are published and cited in the HTML. */
const IC_DAYS=70;
const IC_VC=monoFn([ [0,6],[10,6.5],[18,8],[24,12],[28,16],[32,20],[40,23],[70,27] ]);
const IC_TRACH=11,IC_WEAN=20,IC_OFF=31,IC_DECAN=36;
const IC_WEANL=[
 {v:7,t:'7: no weaning success below',col:'var(--bad)',below:false},
 {v:13,t:'13.0: mean, not extubated',col:'var(--warn)',below:true},
 {v:15,t:'15: extubation came above',col:'var(--accent)',below:false},
 {v:21.9,t:'21.9: mean, extubated',col:'var(--good)',below:false}];
const IC_MED=[ {t:'Dutch, n=150',m:28,lo:12,hi:60,v:'28 (12–60)'},{t:'IGOS',m:20,lo:10,hi:54,v:'20 (10–54)'} ];
const IC_BADGES=['pneumonia','blood clots','pressure areas','dry eyes','pain','hallucinations'];
const IC_AIR={oral:'tube through the mouth',trach:'tracheostomy',none:'breathing unaided'};
const IC_MODE={full:'full support',wean:'weaning trials',off:'off'};
const IC_STEPS=[
 {from:0,at:.02,k:'Day 0',t:'Intubation, planned if possible',
  txt:'Emergency intubation was uncommon at Mayo (7 of 43), but one person had brain injury from lack of oxygen after a respiratory arrest <sup class="c" data-ref="Wijdicks2003" title="Source 508"><a href="/guillain-barre-syndrome/sources/#src-Wijdicks2003">508</a></sup>. Early pneumonia was more likely when intubation came more than 2 days after admission <sup class="c" data-ref="Orlikowski2006" title="Source 340"><a href="/guillain-barre-syndrome/sources/#src-Orlikowski2006">340</a></sup>. Succinylcholine carries a risk of cardiac arrest from high potassium in denervated muscle <sup class="c" data-ref="FDA-Quelicin" title="Source 122"><a href="/guillain-barre-syndrome/sources/#src-FDA-Quelicin">122</a></sup>.',
  hook:'Delayed intubation (over 2 days) independently predicted early pneumonia <sup class="c" data-ref="Orlikowski2006" title="Source 340"><a href="/guillain-barre-syndrome/sources/#src-Orlikowski2006">340</a></sup>.'},
 {from:.07,at:.1,k:'Day 7',t:'Week one: a long haul?',
  txt:'One week after intubation, people who could not lift their arms from the bed had an 87% chance of ventilation for 14 days or more, and 96% with axonal or unexcitable nerves as well <sup class="c" data-ref="Walgaard2017" title="Source 498"><a href="/guillain-barre-syndrome/sources/#src-Walgaard2017">498</a></sup>. Explore the published rows below the player.',
  pt:'Doctors may talk about how long the breathing machine is likely to be needed. That estimate comes from groups of people and can be wrong for one person.'},
 {from:.14,at:.17,k:'Days 9 to 14',t:'The tracheostomy question',
  txt:'A tube through the front of the neck is more comfortable than one through the mouth for a long stay. At Mayo, 87% of 60 had a tracheostomy, a median 9 days after intubation <sup class="c" data-ref="Lawn1999" title="Source 262"><a href="/guillain-barre-syndrome/sources/#src-Lawn1999">262</a></sup>. In Japan, early tracheostomy did not change mortality <sup class="c" data-ref="Yonezawa2020" title="Source 524"><a href="/guillain-barre-syndrome/sources/#src-Yonezawa2020">524</a></sup>. There is no randomised trial.'},
 {from:.28,at:.36,k:'Weeks 3 to 4',t:'Weaning trials',
  txt:'Weaning usually starts once general improvement has begun <sup class="c" data-ref="Weiss2025" title="Source 504"><a href="/guillain-barre-syndrome/sources/#src-Weiss2025">504</a></sup>. In one small series no weaning trial succeeded below 7 mL/kg and extubation came above 15 mL/kg <sup class="c" data-ref="Chevrolet1991" title="Source 76"><a href="/guillain-barre-syndrome/sources/#src-Chevrolet1991">76</a></sup>. In 44 people, VC was 21.9 mL/kg in those extubated successfully vs 13.0 in the rest, and negative inspiratory force −50.3 vs −28.6 cmH₂O <sup class="c" data-ref="Nguyen2006" title="Source 331"><a href="/guillain-barre-syndrome/sources/#src-Nguyen2006">331</a></sup>.',
  hook:'A VC gain above 4 mL/kg had 82% sensitivity for successful extubation <sup class="c" data-ref="Nguyen2006" title="Source 331"><a href="/guillain-barre-syndrome/sources/#src-Nguyen2006">331</a></sup>.'},
 {from:.44,at:.48,k:'About a month',t:'Off the ventilator',
  txt:'Ventilation lasted a median 28 days (IQR 12 to 60) in 150 Dutch patients, 71% needing 14 days or more <sup class="c" data-ref="Walgaard2017" title="Source 498"><a href="/guillain-barre-syndrome/sources/#src-Walgaard2017">498</a></sup>, and a median 20 days (IQR 10 to 54) in IGOS <sup class="c" data-ref="Luijten2023" title="Source 279"><a href="/guillain-barre-syndrome/sources/#src-Luijten2023">279</a></sup>. In a French nationwide cohort, 26% of extubation attempts ended in reintubation <sup class="c" data-ref="Thille2025" title="Source 448"><a href="/guillain-barre-syndrome/sources/#src-Thille2025">448</a></sup>.'},
 {from:.56,at:.7,k:'After intensive care',t:'After intensive care',
  txt:'Monitoring continues on the ward: up to two-thirds of deaths occur in the recovery phase <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>. Recovery after ventilation can be long: at Mayo, 79% of survivors eventually walked independently <sup class="c" data-ref="Fletcher2000" title="Source 129"><a href="/guillain-barre-syndrome/sources/#src-Fletcher2000">129</a></sup>, and some first walked again more than a year later <sup class="c" data-ref="vanDenBerg2018" title="Source 466"><a href="/guillain-barre-syndrome/sources/#src-vanDenBerg2018">466</a></sup>.',
  pt:'Many people who needed a ventilator walk again, though it can take a long time. These are group figures, not a forecast <sup class="c" data-ref="Fletcher2000,vanDenBerg2018" title="Source 129,466"><a href="/guillain-barre-syndrome/sources/#src-Fletcher2000">129,466</a></sup>.'}];
/* Walgaard 2017 Table 2: chance of MV for 14 days or more, judged 1 week after intubation */
const IC_PMV=[
 {k:87,t:'Cannot lift arms from the bed at 1 week',out:'87 in 100 people in this group were still ventilated at 14 days <sup class="c" data-ref="Walgaard2017" title="Source 498"><a href="/guillain-barre-syndrome/sources/#src-Walgaard2017">498</a></sup>.'},
 {k:96,t:'Cannot lift arms, axonal or unexcitable nerves',out:'96 in 100 people in this group were still ventilated at 14 days <sup class="c" data-ref="Walgaard2017" title="Source 498"><a href="/guillain-barre-syndrome/sources/#src-Walgaard2017">498</a></sup>.'},
 {k:90,t:'Can lift arms, axonal or unexcitable nerves',out:'90 in 100 people in this group were still ventilated at 14 days <sup class="c" data-ref="Walgaard2017" title="Source 498"><a href="/guillain-barre-syndrome/sources/#src-Walgaard2017">498</a></sup>.'},
 {k:67,t:'Can lift arms, demyelinating or equivocal',more:[ ['14 days',67],['21 days',48],['28 days',34] ],
  out:'67 in 100 at 14 days, 48 at 21 days and 34 at 28 days in this group, from the paper\'s Table 2; the abstract gives 69% for all who could lift their arms <sup class="c" data-ref="Walgaard2017" title="Source 498"><a href="/guillain-barre-syndrome/sources/#src-Walgaard2017">498</a></sup>.'}];
/* Pandey 2005 medians, NRS 0-10, days 1-7 */
const IC_PAIN=[
 {t:'gabapentin',v:[3.5,2.5,2.0,2.0,2.0,2.0,2.0],col:'var(--rec)',dash:''},
 {t:'carbamazepine',v:[6.0,6.0,5.0,4.0,4.0,3.5,3.0],col:'var(--care)',dash:'8 5'},
 {t:'placebo',v:[6.0,6.0,6.0,6.0,6.0,6.0,6.0],col:'var(--muted)',dash:'2 5'}];

inits.icu=()=>{
  /* ---------- main player ---------- */
  const svg=$('#icSvg'),rg=$('#icT');let setSt=()=>{};
  function draw(t){
    const N=vb(svg,'720 408','400 684');
    const L=N?{ax:12,lx:12,ly:44,ls:1.1,st:198,dl:216,vx:200,vy:34,vw:188,vh:84,md:138,bx:200,bt:166,bw:92,cl:286,cx:30,cy:300,ch:220,cr:388,cv:542,dt:576,mx:100,mw:272,my:592,ml:12,axy:648}
             :{ax:14,lx:24,ly:46,ls:1.15,st:212,dl:232,vx:220,vy:34,vw:190,vh:84,md:138,bx:220,bt:166,bw:94,cl:22,cx:452,cy:36,ch:220,cr:706,cv:276,dt:308,mx:130,mw:540,my:322,ml:14,axy:372};
    const d=IC_DAYS*t,vc=IC_VC(d),a=clamp(vc/30);
    const air=d<IC_TRACH?'oral':d<IC_DECAN?'trach':'none',mode=d<IC_WEAN?'full':d<IC_OFF?'wean':'off';
    const ph=.5+.5*Math.sin(t*Math.PI*2*60);
    const H=(x,y,tx)=>`<text x="${x}" y="${y}" class="t-xs" style="fill:var(--ink);font-weight:700;letter-spacing:.06em">${tx}</text>`;
    let s=H(L.ax,22,'AIRWAY');
    const fill=mode==='full'?lerp(.3,.9,ph):mode==='wean'?lerp(.45-a*.3,.55+a*.3,ph):lerp(.5-a*.45,.5+a*.45,ph);
    const Lg=lungs(L.lx,L.ly,L.ls,{fill,weak:1-a,tube:air==='oral'});s+=Lg.svg;
    if(air==='trach'){const [tx,ty]=Lg.at.trachea;s+=`<path d="M${f1(tx)} ${f1(ty-4)}Q${f1(tx-6)} ${f1(ty-16)} ${f1(tx-30)} ${f1(ty-16)}" style="fill:none;stroke:var(--device);stroke-width:4;stroke-linecap:round"/><rect x="${f1(tx-36)}" y="${f1(ty-22)}" width="10" height="12" rx="2" style="fill:var(--device)"/>`}
    s+=`<text x="${L.ax}" y="${L.st}" class="t-lbl">${IC_AIR[air]}</text><text x="${L.ax}" y="${L.dl}" class="t-sm">day ${Math.round(d)} of a schematic stay</text>`;
    /* ventilator */
    s+=H(L.vx,22,'VENTILATOR');
    s+=`<rect x="${L.vx}" y="${L.vy}" width="${L.vw}" height="${L.vh}" rx="8" style="fill:var(--panel-2);stroke:var(--device);stroke-width:1.6"/><rect x="${L.vx+8}" y="${L.vy+8}" width="${L.vw-16}" height="${L.vh-16}" rx="4" style="fill:var(--field)"/>`;
    if(mode!=='off'){const amp=mode==='full'?22:10,yc=L.vy+L.vh/2+6;let p='';for(let i=0;i<=60;i++){const u=i/60,x=L.vx+12+u*(L.vw-24),w=((u*3+t*40)%1);const y=yc-amp*(w<.35?Math.sin(w/.35*Math.PI):0);p+=(i?'L':'M')+f1(x)+' '+f1(y)}
      s+=`<path d="${p}" style="fill:none;stroke:var(--care);stroke-width:2"/>`}
    else s+=`<line x1="${L.vx+12}" x2="${L.vx+L.vw-12}" y1="${L.vy+L.vh/2+6}" y2="${L.vy+L.vh/2+6}" style="stroke:var(--muted);stroke-width:1.5;stroke-dasharray:3 4"/>`;
    s+=`<text x="${L.vx}" y="${L.md}" class="t-sm">support: <tspan style="fill:var(--ink);font-weight:700">${IC_MODE[mode]}</tspan></text>`;
    /* badges */
    const act=d<IC_DECAN;s+=H(L.bx,L.bt,act?'WATCHED FOR':'STILL WATCHED ON THE WARD');
    IC_BADGES.forEach((b,i)=>{const x=L.bx+(i%2)*(L.bw+6),y=L.bt+10+Math.floor(i/2)*28,on=act||b==='pain';
      s+=`<rect x="${x}" y="${y}" width="${L.bw}" height="22" rx="6" style="fill:${on?'var(--rx-soft)':'var(--panel-2)'};stroke:${on?'var(--rx)':'var(--line)'};stroke-width:1.2"/><text x="${x+L.bw/2}" y="${y+15}" class="t-xs t-mid" style="fill:var(--ink)">${b}</text>`});
    /* VC for weaning */
    s+=H(N?12:L.cx-12,L.cl,'VITAL CAPACITY, mL/kg');
    const Y=v=>L.cy+L.ch-L.ch*v/30;
    s+=`<rect x="${L.cx}" y="${L.cy}" width="22" height="${L.ch}" rx="4" style="fill:var(--panel-2);stroke:var(--line)"/><rect x="${L.cx}" y="${f1(Y(vc))}" width="22" height="${f1(L.cy+L.ch-Y(vc))}" rx="4" style="fill:var(--rec)"/>`;
    [0,10,20,30].forEach(v=>{s+=`<text x="${L.cx-4}" y="${f1(Y(v)+3)}" class="t-xs t-end">${v}</text>`});
    IC_WEANL.forEach(l=>{const y=Y(l.v);s+=`<line x1="${L.cx}" x2="${L.cr}" y1="${f1(y)}" y2="${f1(y)}" style="stroke:${l.col};stroke-width:1.4;stroke-dasharray:6 4"/>`+kitLabel(L.cx+30,l.below?y+12:y-4,l.t)});
    s+=`<text x="${N?12:L.cx-12}" y="${L.cv}" class="t-sm">now about ${Math.round(vc)} mL/kg (schematic)</text>`;
    /* days scale with published medians */
    s+=H(L.ml,L.dt,'DAYS VENTILATED: PUBLISHED MEDIANS, IQR');
    const X=v=>L.mx+L.mw*v/IC_DAYS;
    IC_MED.forEach((m,i)=>{const y=L.my+i*26;s+=`<text x="${L.ml}" y="${y+9}" class="t-sm" style="fill:var(--ink)">${m.t}</text><rect x="${f1(X(m.lo))}" y="${y}" width="${f1(X(m.hi)-X(m.lo))}" height="11" rx="3" style="fill:var(--rx-soft);stroke:var(--rx)"/><line x1="${f1(X(m.m))}" x2="${f1(X(m.m))}" y1="${y-3}" y2="${y+14}" style="stroke:var(--ink);stroke-width:2.4"/><text x="${f1(X(m.hi)+5)}" y="${y+9}" class="t-xs" style="fill:var(--ink)">${m.v}</text>`});
    const T=tline(L.mx,L.axy,L.mw,{min:0,max:IC_DAYS,step:10,label:'days'});s+=T.svg;
    const cx=X(d);s+=`<line x1="${f1(cx)}" x2="${f1(cx)}" y1="${L.my-8}" y2="${L.axy}" style="stroke:var(--brand);stroke-width:2"/><circle cx="${f1(cx)}" cy="${L.axy}" r="5" style="fill:var(--brand);stroke:var(--panel);stroke-width:2"/>`;
    svg.innerHTML=s;
    const p=phaseOf(IC_STEPS,t);setSt(p);$('#icNote').innerHTML=noteHTML(IC_STEPS[p]);
  }
  const stop=playWire(rg,$('#icPlay'),draw,24000,'Replay','icu');
  setSt=stepWire($('#icSteps'),IC_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- week-one rows ---------- */
  const ps=$('#icPmv'),mod=$('#m-icu');let row=0;
  function drawPmv(){
    const R=IC_PMV[row],N=vb(ps,'720 210',R.more?'400 430':'400 348');
    const L=N?{ix:12,iy:40,cols:10,sz:22,gap:4,tx:12,ty:22,bx:12,by:320,bw:300}:{ix:14,iy:40,cols:20,sz:16,gap:3,tx:14,ty:22,bx:420,by:50,bw:200};
    let s=`<text x="${L.tx}" y="${L.ty}" class="t-xs" style="fill:var(--ink);font-weight:700">${R.k} in 100 still ventilated at 14 days</text>`;
    s+=icons(L.ix,L.iy,{n:100,cols:L.cols,k:R.k,size:L.sz,gap:L.gap,col:'var(--rx)'}).svg;
    if(R.more){const bx=N?L.bx:L.bx;s+=`<text x="${bx}" y="${L.by-12}" class="t-xs" style="fill:var(--ink);font-weight:700">same group, later</text>`;
      R.more.forEach(([lab,v],i)=>{const y=L.by+i*30;s+=`<text x="${bx}" y="${y+11}" class="t-sm">${lab}</text><rect x="${bx+66}" y="${y}" width="${L.bw}" height="14" rx="4" style="fill:var(--panel-2)"/><rect x="${bx+66}" y="${y}" width="${f1(L.bw*v/100)}" height="14" rx="4" style="fill:var(--rx)"/><text x="${f1(bx+66+L.bw*v/100+6)}" y="${y+11}" class="t-sm" style="fill:var(--ink)">${v}%</text>`})}
    const gy=N?(R.more?418:338):(R.more?168:70),gx=N?12:420;
    s+=`<circle cx="${gx+6}" cy="${gy-4}" r="6" style="fill:var(--rx)"/><text x="${gx+18}" y="${gy}" class="t-sm" style="fill:var(--ink)">still on the ventilator</text><circle cx="${gx+(N?196:6)}" cy="${(N?gy:gy+22)-4}" r="6" style="fill:var(--line)"/><text x="${gx+(N?208:18)}" y="${N?gy:gy+22}" class="t-sm" style="fill:var(--ink)">off by day 14</text>`;
    ps.innerHTML=s;$('#icPmvOut').innerHTML=R.out;
  }
  $$('[data-pmv]',mod).forEach(b=>b.addEventListener('click',()=>{row=+b.dataset.pmv;$$('[data-pmv]',mod).forEach(x=>x.setAttribute('aria-pressed',x===b));drawPmv()}));
  drawPmv();

  /* ---------- pain trial ---------- */
  const qs=$('#icPain'),qr=$('#icPainT');
  function drawPain(u){
    const N=vb(qs,'720 300','400 420'),day=1+6*u;
    const L=N?{px:40,py:96,pw:330,ph:260,lx:12,ly:18,ldy:24}:{px:56,py:30,pw:460,ph:220,lx:548,ly:60,ldy:34};
    const fns=IC_PAIN.map(sr=>monoFn(sr.v.map((v,i)=>[i+1,v])));
    let s='';
    IC_PAIN.forEach((sr,i)=>{const C=curve(L.px,L.py,L.pw,L.ph,fns[i],{x0:1,x1:7,y0:0,y1:10,upto:day,col:sr.col,dash:sr.dash,dot:true,lw:3});
      s+=i?C.svg.replace(/^<rect[^>]*\/>/,'').replace(/<line[^>]*class="axis"\/><line[^>]*class="axis"\/>/,''):C.svg;
      if(!i){[0,2,4,6,8,10].forEach(v=>{s+=`<text x="${L.px-6}" y="${f1(C.Y(v)+3)}" class="t-xs t-end">${v}</text>`});
        for(let k=1;k<=7;k++)s+=`<text x="${f1(C.X(k))}" y="${L.py+L.ph+15}" class="t-xs t-mid">${k}</text>`;
        s+=`<text x="${L.px+L.pw}" y="${L.py+L.ph+30}" class="t-xs t-end">day of treatment</text><text x="${L.px}" y="${L.py-8}" class="t-xs" style="fill:var(--ink);font-weight:700">median pain score, 0 to 10</text>`}});
    const di=Math.min(6,Math.floor(day+1e-6)-1);
    IC_PAIN.forEach((sr,i)=>{const x=N?L.lx+(i%2)*190:L.lx,y=N?L.ly+Math.floor(i/2)*L.ldy:L.ly+i*L.ldy;
      s+=`<line x1="${x}" x2="${x+30}" y1="${y-4}" y2="${y-4}" style="stroke:${sr.col};stroke-width:3${sr.dash?';stroke-dasharray:'+sr.dash:''}"/><text x="${x+38}" y="${y}" class="t-sm" style="fill:var(--ink)">${sr.t} ${sr.v[di].toFixed(1)}</text>`});
    s+=`<text x="${N?L.lx:L.lx}" y="${N?L.ly+2*L.ldy+8:L.ly+3*L.ldy+6}" class="t-xs">values on day ${di+1}</text>`;
    qs.innerHTML=s;
  }
  playWire(qr,$('#icPainPlay'),drawPain,9000,'Replay','icu');
  drawPain(+qr.value);
  const prev=redraws.icu;redraws.icu=()=>{prev&&prev();drawPmv()};
};
/* =============== 4.1 Prognosis: EGOS & mEGOS =============== */
/* Three widgets: (1) the main player, two blocks of 100 people regaining walking over time, scaled from
   published cohort proportions (pass G); (2) a points calculator for mEGOS at admission, mEGOS at day 7 and
   EGOS, which shows how the published tables add up and never gives a per-person risk; (3) mortality bars
   in three views. Every number is from research file G; movement between published time points is schematic. */
const PG_AX=[
 {l:'4 weeks',s:'4 wk'},{l:'3 months',s:'3 mo'},{l:'6 months',s:'6 mo'},{l:'1 year',s:'1 yr'},{l:'2 years and later',s:'later'}];
/* each step: the two panels. v = people in 100 not yet walking alone (scaled from the published proportion) */
const PG_STEPS=[
 {from:0,at:.04,k:'Week 4',t:'Four weeks: most cannot yet walk alone',sv:'Four weeks after onset',
  P:[{h:'Netherlands',sub:'all treated with IVIg or plasma exchange',v:55,big:'55%',c1:'could not',c2:'walk alone',n:'217 of 394'},
     {h:'Bangladesh',sub:'86% supportive care only',v:66,big:'66%',c1:'could not',c2:'walk alone',n:'321 of 489'}],
  txt:'In the Dutch cohort used to build mEGOS, everyone was treated with IVIg or plasma exchange, and 55% (217 of 394) still could not walk independently at 4 weeks. In a Bangladeshi cohort of 506 people, where 86% had supportive care only, the figure was 66% (321 of 489) <sup class="c" data-ref="Papri2022mEGOS" title="Source 348"><a href="/guillain-barre-syndrome/sources/#src-Papri2022mEGOS">348</a></sup>. Most people reach their weakest point within 2 weeks <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>, so at 4 weeks many are only starting to recover.',
  pt:'A month after GBS starts, more than half of people still cannot walk on their own. That is expected, and it is not the end of the story <sup class="c" data-ref="Papri2022mEGOS,Leonhard2019" title="Source 266,348"><a href="/guillain-barre-syndrome/sources/#src-Papri2022mEGOS">266,348</a></sup>.',
  hook:'Unable to walk independently means a GBS disability score above 2 <sup class="c" data-ref="Papri2022mEGOS" title="Source 348"><a href="/guillain-barre-syndrome/sources/#src-Papri2022mEGOS">348</a></sup>.'},
 {from:.2,at:.3,k:'Month 3',t:'Three months: walking returns for many',sv:'Three months after onset',
  P:[{h:'Netherlands',sub:'all treated with IVIg or plasma exchange',v:29,big:'29%',c1:'could not',c2:'walk alone',n:'111 of 389'},
     {h:'Bangladesh',sub:'86% supportive care only',v:44,big:'44%',c1:'could not',c2:'walk alone',n:'211 of 484'}],
  txt:'By 3 months the share unable to walk independently had fallen to 29% (111 of 389) in the Dutch cohort and 44% (211 of 484) in Bangladesh <sup class="c" data-ref="Papri2022mEGOS" title="Source 348"><a href="/guillain-barre-syndrome/sources/#src-Papri2022mEGOS">348</a></sup>. The cohorts differed in more than treatment: median age 28 against 52 years, and preceding diarrhoea in 51% against 23% <sup class="c" data-ref="Papri2022mEGOS" title="Source 348"><a href="/guillain-barre-syndrome/sources/#src-Papri2022mEGOS">348</a></sup>.',
  pt:'Three months in, about 7 in 10 people in the Dutch group were walking on their own again <sup class="c" data-ref="Papri2022mEGOS" title="Source 348"><a href="/guillain-barre-syndrome/sources/#src-Papri2022mEGOS">348</a></sup>.',
  hook:'mEGOS predicts inability to walk unaided at 4 weeks, 3 months and 6 months <sup class="c" data-ref="Walgaard2011" title="Source 497"><a href="/guillain-barre-syndrome/sources/#src-Walgaard2011">497</a></sup>.'},
 {from:.42,at:.52,k:'Month 6',t:'Six months: about 8 in 10 walk alone',sv:'Six months after onset',
  P:[{h:'Netherlands',sub:'all treated with IVIg or plasma exchange',v:19,big:'19%',c1:'could not',c2:'walk alone',n:'74 of 388'},
     {h:'Bangladesh',sub:'86% supportive care only',v:29,big:'29%',c1:'could not',c2:'walk alone',n:'141 of 480'}],
  txt:'At 6 months, 19% (74 of 388) of the Dutch cohort and 29% (141 of 480) of the Bangladeshi cohort could not walk independently <sup class="c" data-ref="Papri2022mEGOS" title="Source 348"><a href="/guillain-barre-syndrome/sources/#src-Papri2022mEGOS">348</a></sup>. Across studies, about 80% of people with GBS regain independent walking at 6 months <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>, and about 20% are still unable to walk unaided despite treatment <sup class="c" data-ref="vanDoorn2008" title="Source 471"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2008">471</a></sup>.',
  pt:'About 8 in 10 people can walk on their own by 6 months after GBS starts. This is a group figure, not a promise for one person <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.',
  hook:'About 80% walk independently at 6 months; about 20% do not, despite treatment <sup class="c" data-ref="Leonhard2019,vanDoorn2008" title="Source 266,471"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266,471</a></sup>.'},
 {from:.64,at:.74,k:'Year 1 · IGOS',t:'One year, around the world',sv:'One year: the IGOS cohort',
  P:[{h:'IGOS: Europe and Americas',sub:'a different, international cohort',v:17,big:'83%',c1:'walked',c2:'unaided',n:'334 of 404'},
     {h:'IGOS: Bangladesh',sub:'a different, international cohort',v:31,big:'69%',c1:'walked',c2:'unaided',n:'67 of 97'}],
  txt:'The panels now switch to the International GBS Outcome Study (IGOS). Among its first 1000 inclusions, the share walking unaided at 1 year was 83% (334 of 404) in Europe and the Americas, 69% (67 of 97) in Bangladesh and 91% (31 of 34) in the rest of Asia <sup class="c" data-ref="Doets2018" title="Source 102"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102</a></sup>. Mortality in IGOS also differed by region, 17% in Bangladesh against 5% in Europe and the Americas <sup class="c" data-ref="Doets2018" title="Source 102"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102</a></sup>.',
  pt:'A year after GBS, most people in every region were walking without help, but fewer in Bangladesh, where treatment and intensive care are harder to get <sup class="c" data-ref="Doets2018,Papri2022mEGOS" title="Source 102,348"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102,348</a></sup>.',
  hook:'Regional differences in IGOS: walking unaided at 1 year 91% (Asia without Bangladesh), 83% (Europe/Americas), 69% (Bangladesh) <sup class="c" data-ref="Doets2018" title="Source 102"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102</a></sup>.'},
 {from:.84,at:.95,k:'Later',t:'After the first year: slower gains that still count',sv:'Later: gains continue',
  P:[{h:'Sweden, 2 years',sub:'42 adults followed from onset',v:7,big:'7%',c1:'could not',c2:'walk 10 m alone',n:'from 62% at 2 weeks'},
     {h:'After prolonged ventilation',sub:'26 people, median 93 days ventilated',v:42,big:'58%',c1:'walked unaided',c2:'at last follow-up',n:'31% after year 1'}],
  txt:'In a Swedish cohort of 42 adults, 62% could not walk 10 m independently at 2 weeks, 10% at 1 year and 7% at 2 years; recovery came mainly in the first year <sup class="c" data-ref="Forsberg2004Impairment" title="Source 133"><a href="/guillain-barre-syndrome/sources/#src-Forsberg2004Impairment">133</a></sup>. In a group with prolonged ventilation (median 93 days), 58% walked unaided at the last follow-up, and 31% got there more than a year after diagnosis <sup class="c" data-ref="vanDenBerg2018" title="Source 466"><a href="/guillain-barre-syndrome/sources/#src-vanDenBerg2018">466</a></sup>. Recovery from residual complaints may still happen more than 5 years after onset <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.',
  pt:'Recovery can keep going for years. Some people first walk again more than a year after becoming ill <sup class="c" data-ref="vanDenBerg2018,Hiraga2005" title="Source 188,466"><a href="/guillain-barre-syndrome/sources/#src-vanDenBerg2018">188,466</a></sup>.',
  hook:'Most recovery happens in the first year, but late gains are real: beyond 1 year, 19% of ICU survivors improved by at least one grade <sup class="c" data-ref="Forsberg2004Impairment,Fletcher2000" title="Source 129,133"><a href="/guillain-barre-syndrome/sources/#src-Forsberg2004Impairment">129,133</a></sup>.'}
];
const PG_LEG={walk:'walking alone',not:'not yet walking alone'};
/* calculator tables, as published (Papri2022mEGOS, Busl2023) */
const PG_SC={
 adm:{name:'mEGOS at admission',max:9,age:[0,1,2],dia:[0,1],str:[0,2,4,6],sl:'MRC sum score',thr:6},
 d7:{name:'mEGOS at day 7',max:12,age:[0,1,2],dia:[0,1],str:[0,3,6,9],sl:'MRC sum score',thr:6},
 egos:{name:'EGOS at 2 weeks',max:7,age:[0,.5,1],dia:[0,1],str:null,sl:'Disability score',thr:null}};
const PG_CAP={
 adm:'mEGOS at admission adds age, preceding diarrhoea and the MRC sum score, for a range of 0 to 9. In the development data it separated outcomes with an AUC of 0.73 to 0.77 <sup class="c" data-ref="Walgaard2011" title="Source 497"><a href="/guillain-barre-syndrome/sources/#src-Walgaard2011">497</a></sup>. A higher total means a higher estimated chance, in a group of people like the cohort, of being unable to walk unaided at 4 weeks, 3 months and 6 months.',
 d7:'mEGOS at day 7 uses the same items with heavier weights for muscle strength, for a range of 0 to 12. A week of watching sharpens the estimate: AUC 0.84 to 0.87 <sup class="c" data-ref="Walgaard2011" title="Source 497"><a href="/guillain-barre-syndrome/sources/#src-Walgaard2011">497</a></sup>. The SID-GBS trial used mEGOS of 6 or more to define a poor prognosis <sup class="c" data-ref="Walgaard2021" title="Source 499"><a href="/guillain-barre-syndrome/sources/#src-Walgaard2021">499</a></sup>.',
 egos:'EGOS is scored 2 weeks after hospital entry from age, diarrhoea within 4 weeks and the GBS disability score, for a range of 1 to 7. In the derivation cohort, predicted inability to walk independently at 6 months ran from 1% at the lowest score to 83% at the highest (AUC 0.85) <sup class="c" data-ref="vanKoningsveld2007" title="Source 475"><a href="/guillain-barre-syndrome/sources/#src-vanKoningsveld2007">475</a></sup>. In a Swedish cohort of 29 it only partly predicted disability at 2 and 10 years <sup class="c" data-ref="Forsberg2012Decade" title="Source 136"><a href="/guillain-barre-syndrome/sources/#src-Forsberg2012Decade">136</a></sup>.'};
const PG_THR='6 or more: SID-GBS poor prognosis';
const PG_EG=['score 1: about 1%','score 7: 83%'];
const PG_POP='Population figures from the derivation cohorts, never a forecast for one person.';
/* mortality views */
const PG_MORT={
 phase:{unit:'Share of 15 deaths in a Dutch cohort of 527',max:100,col:'var(--weak)',rows:[
   {l:'Progressive phase',v:20,n:'3 deaths'},{l:'Plateau',v:13,n:'2 deaths'},{l:'Recovery phase',v:67,n:'10 deaths'}],
   cap:'Of 15 deaths among 527 Dutch trial and cohort patients, 3 (20%) came in the progressive phase, 2 (13%) in the plateau and 10 (67%) in the recovery phase. Only 7 (47%) died in intensive care <sup class="c" data-ref="vanDenBerg2013" title="Source 463"><a href="/guillain-barre-syndrome/sources/#src-vanDenBerg2013">463</a></sup>. Deaths are most often from heart and breathing complications <sup class="c" data-ref="Leonhard2019,vanDoorn2008" title="Source 266,471"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266,471</a></sup>.'},
 region:{unit:'Deaths in the IGOS cohort, by region',max:20,col:'var(--rx)',rows:[
   {l:'Bangladesh',v:17,n:'19 of 114'},{l:'Europe and the Americas',v:5,n:'23 of 486'},{l:'Asia, not Bangladesh',v:2,n:'1 of 45'}],
   cap:'In IGOS, 17% died in Bangladesh, 5% in Europe and the Americas and 2% elsewhere in Asia <sup class="c" data-ref="Doets2018" title="Source 102"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102</a></sup>. In a Dhaka cohort of 407, 12% died at a median of 18 days, and the lack of a ventilator when needed was the strongest risk factor (HR 11.9); 10 deaths were due to no ventilator being available <sup class="c" data-ref="Ishaque2017" title="Source 204"><a href="/guillain-barre-syndrome/sources/#src-Ishaque2017">204</a></sup>. Mortality among ventilated people ranged from 8.3 to 20% across seven studies <sup class="c" data-ref="deBoisanger2016" title="Source 94"><a href="/guillain-barre-syndrome/sources/#src-deBoisanger2016">94</a></sup>.'},
 den:{unit:'Deaths in Denmark: 2414 people with GBS and 23,909 matched people',max:10,col:'var(--rx)',rows:[
   {l:'GBS, first 6 months',v:4.8,n:''},{l:'Matched, first 6 months',v:.8,n:'',pop:1},{l:'GBS, 6 months to 4 years',v:7.6,n:'HR 1.5'},{l:'Matched, 6 months to 4 years',v:5.8,n:'',pop:1}],
   cap:'In a Danish population cohort, deaths in the first 6 months were 4.8% after GBS against 0.8% in matched people, and from 6 months to 4 years 7.6% against 5.8% (HR 1.5). After 4 years the risk matched the general population (HR 1.1) <sup class="c" data-ref="Levison2022Mortality" title="Source 269"><a href="/guillain-barre-syndrome/sources/#src-Levison2022Mortality">269</a></sup>. In US hospitals, in-hospital mortality was 2.58%, and intubation was a predictor (adjusted OR 5.09) <sup class="c" data-ref="Alshekhlee2008" title="Source 13"><a href="/guillain-barre-syndrome/sources/#src-Alshekhlee2008">13</a></sup>.'}};

/* walking after ventilation (vanDenBerg2018): figures in 100 walking unaided */
const PG_VENT={
 m6:{P:[{h:'Shorter ventilation',sub:'trial patients, walking at 6 months',v:76,big:'76%'},{h:'Ventilated over 2 months',sub:'trial patients, walking at 6 months',v:18,big:'18%'}],
  cap:'Of 526 trial patients, 28% were ventilated and 6% needed ventilation for more than 2 months. At 6 months, 18% of those with prolonged ventilation walked unaided, against 76% after shorter ventilation (P&lt;0.001) <sup class="c" data-ref="vanDenBerg2018" title="Source 466"><a href="/guillain-barre-syndrome/sources/#src-vanDenBerg2018">466</a></sup>.'},
 last:{P:[{h:'Shorter ventilation',sub:'no later figure in this study',v:76,big:'76%'},{h:'Long-ventilated group',sub:'26 people, at last follow-up',v:58,big:'58%'}],
  cap:'In a separate group of 26 people ventilated for a median of 93 days, 58% walked unaided at the last follow-up, and 31% reached this more than 1 year after diagnosis. Prolonged ventilation is a slower road, not a closed one <sup class="c" data-ref="vanDenBerg2018" title="Source 466"><a href="/guillain-barre-syndrome/sources/#src-vanDenBerg2018">466</a></sup>. In a 20-year intensive care series, 79% of survivors regained independent walking <sup class="c" data-ref="Fletcher2000" title="Source 129"><a href="/guillain-barre-syndrome/sources/#src-Fletcher2000">129</a></sup>.'}};
const PG_VLEG='walking unaided';
inits.prognosis=()=>{
  const T=(x,y,s,c='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${s}</text>`;
  const INK='fill:var(--ink);font-weight:700';
  /* ---------- 1. main player: two blocks of 100 ---------- */
  const svg=$('#pgSvg'),rg=$('#pgT'),note=$('#pgNote');let setSt=()=>{};
  function pgVal(t,p,j){const S=PG_STEPS[p];if(p===0)return S.P[j].v;return lerp(PG_STEPS[p-1].P[j].v,S.P[j].v,ease(ramp(t,S.from,S.at)))}
  function pgPos(t){const A=PG_STEPS.map(s=>s.at);if(t<=A[0])return 0;for(let i=0;i<A.length-1;i++)if(t<=A[i+1])return i+(t-A[i])/(A[i+1]-A[i]);return A.length-1}
  function pgGrid(x,y,v){const k=100-Math.round(v);let s='';
    for(let i=0;i<100;i++){const cx=x+(i%10)*20+7.5,cy=y+Math.floor(i/10)*22;
      s+=i<k?person(cx,cy,15,'var(--rec)'):`<circle cx="${f1(cx)}" cy="${f1(cy+8)}" r="4.6" style="fill:var(--weak);opacity:.85"/>`}
    return s}
  function pgPanel(x,y,P,v,N){let s=T(x,y,P.h,'t-lbl')+T(x,y+16,P.sub);
    s+=pgGrid(x,y+30,v);
    const bx=x+215;s+=T(bx,y+96,P.big,'t-big','font-size:34px;fill:var(--ink)')+T(bx,y+118,P.c1,'t-sm')+T(bx,y+133,P.c2,'t-sm')+T(bx,y+156,P.n,'t-xs');
    return s}
  function draw(t){
    const N=vb(svg,'720 400','400 690');
    const L=N?{tx:16,ty:26,ts:17,ax0:30,ax1:370,ay:60,p:[ [16,104],[16,384] ],ly:676}
             :{tx:20,ty:28,ts:18,ax0:70,ax1:650,ay:60,p:[ [20,112],[372,112] ],ly:388};
    const p=phaseOf(PG_STEPS,t),S=PG_STEPS[p];
    let s=T(L.tx,L.ty,S.sv,'t-big',`font-size:${L.ts}px`);
    /* time axis */
    const n=PG_AX.length,X=i=>L.ax0+(L.ax1-L.ax0)*i/(n-1),pos=pgPos(t);
    s+=`<line x1="${L.ax0}" x2="${L.ax1}" y1="${L.ay}" y2="${L.ay}" style="stroke:var(--line);stroke-width:3;stroke-linecap:round"/>`;
    s+=`<line x1="${L.ax0}" x2="${f1(lerp(L.ax0,L.ax1,pos/(n-1)))}" y1="${L.ay}" y2="${L.ay}" style="stroke:var(--rec);stroke-width:3;stroke-linecap:round"/>`;
    PG_AX.forEach((a,i)=>{const on=Math.abs(pos-i)<.02||i===p&&t>=S.at;s+=`<circle cx="${f1(X(i))}" cy="${L.ay}" r="${on?6:4}" style="fill:${i<=pos+.01?'var(--rec)':'var(--panel)'};stroke:var(--rec);stroke-width:1.6"/>`+T(X(i),L.ay+20,N?a.s:a.l,'t-xs t-mid',i===p?INK:'')});
    s+=`<circle cx="${f1(lerp(L.ax0,L.ax1,pos/(n-1)))}" cy="${L.ay}" r="7.5" style="fill:var(--ink);stroke:var(--panel);stroke-width:2.4"/>`;
    /* the two panels */
    S.P.forEach((P,j)=>{s+=pgPanel(L.p[j][0],L.p[j][1],P,pgVal(t,p,j),N)});
    /* legend: shape as well as colour */
    s+=person(L.tx+6,L.ly-12,14,'var(--rec)')+T(L.tx+18,L.ly,PG_LEG.walk,'t-sm')+`<circle cx="${L.tx+150}" cy="${L.ly-4}" r="4.6" style="fill:var(--weak)"/>`+T(L.tx+160,L.ly,PG_LEG.not,'t-sm');
    svg.innerHTML=s;
    setSt(p);note.innerHTML=noteHTML(S);
  }
  const stop=playWire(rg,$('#pgPlay'),draw,16000,'Replay','prognosis');
  setSt=stepWire($('#pgSteps'),PG_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- 2. EGOS / mEGOS points calculator ---------- */
  const cs=$('#pgCalcSvg'),cc=$('#pgCalcCap'),sA=$('#pgAge'),sD=$('#pgDia'),sM=$('#pgMrc'),sG=$('#pgGbs');
  let mode='adm',shown={a:1,d:0,m:2},stopC=null;
  const fmt=v=>Math.abs(v-Math.round(v))<.01?String(Math.round(v)):v.toFixed(1);
  function pgTarget(){const C=PG_SC[mode];return {a:C.age[+sA.value],d:C.dia[+sD.value],m:C.str?C.str[+sM.value]:+sG.value}}
  function drawCalc(V){
    const N=vb(cs,'720 196','400 200'),C=PG_SC[mode];
    const L=N?{x0:16,x1:384,ty:26,ly:54,lx:[16,110,230],by:72,bh:32}:{x0:20,x1:700,ty:28,ly:56,lx:[20,190,380],by:74,bh:34};
    const X=v=>L.x0+(L.x1-L.x0)*v/C.max,tot=V.a+V.d+V.m;
    let s=T(L.x0,L.ty,`${C.name}: ${fmt(tot)} of ${C.max}`,'t-big','font-size:18px');
    const seg=[{v:V.a,c:'var(--dx)',l:`Age +${fmt(V.a)}`},{v:V.d,c:'var(--accent)',l:`Diarrhoea +${fmt(V.d)}`},{v:V.m,c:'var(--weak)',l:`${C.sl} +${fmt(V.m)}`}];
    seg.forEach((g,i)=>{s+=`<rect x="${L.lx[i]}" y="${L.ly-10}" width="12" height="12" rx="2" style="fill:${g.c}"/>`+T(L.lx[i]+17,L.ly,g.l,'t-sm','fill:var(--ink)')});
    s+=`<rect x="${L.x0}" y="${L.by}" width="${L.x1-L.x0}" height="${L.bh}" rx="6" style="fill:var(--panel-2);stroke:var(--line)"/>`;
    let acc=0;seg.forEach((g,i)=>{if(g.v>.001){s+=`<rect x="${f1(X(acc)+(acc>0?1:0))}" y="${L.by+3}" width="${f1(Math.max(0,X(acc+g.v)-X(acc)-(acc>0?1:0)))}" height="${L.bh-6}" rx="4" style="fill:${g.c};opacity:.9"/>`}acc+=g.v});
    for(let i=0;i<=C.max;i++){s+=`<line x1="${f1(X(i))}" x2="${f1(X(i))}" y1="${L.by+L.bh+2}" y2="${L.by+L.bh+8}" class="axis"/>`+T(X(i),L.by+L.bh+20,i,'t-xs t-mid')}
    const tx=X(tot);s+=`<line x1="${f1(tx)}" x2="${f1(tx)}" y1="${L.by-6}" y2="${L.by+L.bh+6}" style="stroke:var(--ink);stroke-width:2.4"/><path d="M${f1(tx-6)} ${L.by-12}L${f1(tx+6)} ${L.by-12}L${f1(tx)} ${L.by-4}Z" style="fill:var(--ink)"/>`;
    const ly=L.by+L.bh+44;
    if(C.thr){const hx=X(C.thr);s+=`<line x1="${f1(hx)}" x2="${f1(hx)}" y1="${L.by}" y2="${L.by+L.bh}" style="stroke:var(--rx);stroke-width:2;stroke-dasharray:4 3"/>`+T(hx,ly,PG_THR,'t-xs t-mid','fill:var(--rx);font-weight:700')}
    else s+=T(X(1),ly,PG_EG[0],'t-xs t-mid','fill:var(--ink);font-weight:700')+T(L.x1,ly,PG_EG[1],'t-xs t-end','fill:var(--ink);font-weight:700');
    s+=T(L.x0,ly+(N?36:30),PG_POP,'t-xs');
    cs.innerHTML=s;
  }
  function calcUpdate(anim){const C=PG_SC[mode],tg=pgTarget(),from={...shown};
    cc.innerHTML=`<b>${C.name}: ${fmt(tg.a+tg.d+tg.m)} of ${C.max}.</b> `+PG_CAP[mode];
    if(stopC)stopC();
    if(!anim){shown=tg;drawCalc(shown);return}
    stopC=animate(450,q=>{const e=ease(q);shown={a:lerp(from.a,tg.a,e),d:lerp(from.d,tg.d,e),m:lerp(from.m,tg.m,e)};drawCalc(shown)},()=>{shown=tg;drawCalc(shown);stopC=null})}
  function setMode(m){mode=m;$$('[data-pgs]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.pgs===m));
    const eg=m==='egos';sM.closest('label').hidden=eg;sG.closest('label').hidden=!eg;calcUpdate(true)}
  $$('[data-pgs]').forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.pgs)));
  [sA,sD,sM,sG].forEach(el=>el.addEventListener('change',()=>calcUpdate(true)));
  calcUpdate(false);

  /* ---------- 3. mortality bars ---------- */
  const ms=$('#pgMortSvg'),mc=$('#pgMortCap');let mm='phase',mShown=[0,0,0,0],stopM=null;
  function drawMort(W){
    const N=vb(ms,'720 230','400 270'),M=PG_MORT[mm];
    let s=T(N?16:20,22,M.unit,'t-sm','fill:var(--ink);font-weight:700');
    M.rows.forEach((r,i)=>{const w=W[i]||0;
      if(N){const y=48+i*52,bw=270*w/M.max;s+=T(16,y,r.l,'t-sm','fill:var(--ink)');
        s+=`<rect x="16" y="${y+8}" width="270" height="18" rx="4" style="fill:var(--panel-2)"/><rect x="16" y="${y+8}" width="${f1(bw)}" height="18" rx="4" style="fill:${r.pop?'var(--device)':M.col};opacity:.85"/>`;
        s+=T(16+bw+8,y+22,`${fmt(r.v)}%`,'t-lbl')+(r.n?T(16+bw+56,y+22,r.n,'t-xs'):'')}
      else{const y=44+i*42,bw=330*w/M.max;s+=T(20,y+19,r.l,'t-sm','fill:var(--ink)');
        s+=`<rect x="230" y="${y+5}" width="330" height="20" rx="4" style="fill:var(--panel-2)"/><rect x="230" y="${y+5}" width="${f1(bw)}" height="20" rx="4" style="fill:${r.pop?'var(--device)':M.col};opacity:.85"/>`;
        s+=T(230+bw+8,y+20,`${fmt(r.v)}%`,'t-lbl')+(r.n?T(230+bw+56,y+20,r.n,'t-xs'):'')}});
    s+=T(N?16:20,N?262:222,'Bars share one scale within each view, not across views.','t-xs');
    ms.innerHTML=s}
  function setMort(m,anim){mm=m;$$('[data-pgm]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.pgm===m));
    const M=PG_MORT[m],tg=M.rows.map(r=>r.v),from=mShown.slice();mc.innerHTML=M.cap;
    if(stopM)stopM();
    if(!anim){mShown=tg;drawMort(mShown);return}
    stopM=animate(500,q=>{const e=ease(q);mShown=tg.map((v,i)=>lerp(Math.min(from[i]||0,M.max),v,e));drawMort(mShown)},()=>{mShown=tg;drawMort(mShown);stopM=null})}
  $$('[data-pgm]').forEach(b=>b.addEventListener('click',()=>setMort(b.dataset.pgm,true)));
  setMort('phase',false);

  /* ---------- 4. walking after ventilation ---------- */
  const vs=$('#pgVentSvg'),vc=$('#pgVentCap');let vm='m6',vShown=[76,18],stopV=null;
  function drawV(W){
    const N=vb(vs,'720 260','400 500'),V=PG_VENT[vm];
    const pos=N?[ [16,24],[16,264] ]:[ [20,24],[380,24] ];
    let s='';V.P.forEach((P,j)=>{const [x,y]=pos[j],k=Math.round(W[j]);
      s+=T(x,y,P.h,'t-lbl')+T(x,y+15,P.sub,'t-xs');
      for(let i=0;i<100;i++){const cx=x+(i%10)*17+6,cy=y+28+Math.floor(i/10)*19;s+=i<k?person(cx,cy,13,'var(--rec)'):`<circle cx="${f1(cx)}" cy="${f1(cy+7)}" r="4" style="fill:var(--weak);opacity:.85"/>`}
      s+=T(x+190,y+100,Math.round(W[j])+'%','t-big','font-size:32px;fill:var(--ink)')+T(x+190,y+120,PG_VLEG,'t-sm')});
    vs.innerHTML=s}
  function setV(m,anim){vm=m;$$('[data-pgv]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.pgv===m));const tg=PG_VENT[m].P.map(P=>P.v),from=vShown.slice();vc.innerHTML=PG_VENT[m].cap;
    if(stopV)stopV();if(!anim||RM){vShown=tg;drawV(tg);return}
    stopV=animate(800,q=>{const e=ease(q);vShown=tg.map((v,i)=>lerp(from[i],v,e));drawV(vShown)},()=>{vShown=tg;drawV(tg);stopV=null})}
  $$('[data-pgv]').forEach(b=>b.addEventListener('click',()=>setV(b.dataset.pgv,true)));
  setV('m6',false);
  const prev=redraws.prognosis;redraws.prognosis=()=>{prev&&prev();drawCalc(shown);drawMort(mShown);drawV(vShown)};
};
/* =============== 4.2 Rehabilitation & recovery =============== */
/* Three widgets: (1) the main player, two years of one Swedish cohort (Forsberg 2004/2005: values at 2 weeks,
   1 year and 2 years, joined by straight lines) beside a body outline and the care setting; (2) two routes of
   nerve recovery drawn with the kit's nerveFibre (reversible block, axonal regrowth), each with its own sources;
   (3) an exercise-schedule comparer against the published programmes. Numbers from research G and C. */
const RH_MEAS=[
 {id:'walk',l:'Cannot walk 10 m alone',sh:'Cannot walk 10 m',v:[62,10,7],col:'var(--rec)',dash:''},
 {id:'str',l:'Below full overall strength',sh:'Below full strength',v:[100,62,55],col:'var(--weak)',dash:'7 4'},
 {id:'grip',l:'Weaker grip than normal',sh:'Weak grip',v:[98,38,31],col:'var(--muscle)',dash:'2 3'},
 {id:'sens',l:'Sensation affected',sh:'Sensation affected',v:[93,55,52],col:'var(--accent)',dash:'10 3 2 3'},
 {id:'face',l:'Face muscles affected',sh:'Face affected',v:[38,14,12],col:'var(--dx)',dash:'4 4'},
 {id:'adl',l:'Needs help with personal care',sh:'Help with personal care',v:[76,14,12],col:'var(--rx)',dash:''},
 {id:'iadl',l:'Dependent in instrumental tasks',sh:'Instrumental tasks',v:[98,28,26],col:'var(--care)',dash:'1 3'}];
const RH_MO=[.5,12,24];
const RH_TICK=[{m:.5,l:'2 wk'},{m:6,l:'6 mo'},{m:12,l:'1 yr'},{m:24,l:'2 yr'},{m:28,l:'later'}];
const RH_LIST='Swedish cohort of 42 adults';
const RH_LATEST=['Published at 2 weeks','Published at 1 year','Published at 2 years'];
const RH_LATER='after 2 years: no figure';
const RH_LATERW={w:'after 2 years',n:'later'};
const RH_WASH='weakness wash: schematic';
const RH_STEPS=[
 {from:0,at:.04,mo:.5,k:'2 weeks · acute ward',t:'The start: weakest, and rehabilitation begins',sv:'Two weeks after onset',set:'Acute ward',lv:.62,
  txt:'In a Swedish prospective cohort of 42 adults (mean age 52; 21% ventilated), 62% could not walk 10 m independently at 2 weeks, overall strength was below normal in everyone, and sensation was affected in 93% <sup class="c" data-ref="Forsberg2004Impairment" title="Source 133"><a href="/guillain-barre-syndrome/sources/#src-Forsberg2004Impairment">133</a></sup>. 76% depended on others for personal care, and all who had been working were unable to work <sup class="c" data-ref="Forsberg2005Disability" title="Source 134"><a href="/guillain-barre-syndrome/sources/#src-Forsberg2005Disability">134</a></sup>. The guideline calls arranging rehabilitation a crucial step, first to reduce disability <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.',
  pt:'In the first weeks most people need help with their personal care. Rehabilitation starts early, first to reduce disability <sup class="c" data-ref="Forsberg2005Disability,Leonhard2019" title="Source 134,266"><a href="/guillain-barre-syndrome/sources/#src-Forsberg2005Disability">134,266</a></sup>.',
  hook:'About 40% of people hospitalised with GBS need inpatient rehabilitation; prior ventilation most strongly predicts a longer stay <sup class="c" data-ref="Meythaler1997" title="Source 294"><a href="/guillain-barre-syndrome/sources/#src-Meythaler1997">294</a></sup>.'},
 {from:.14,at:.26,mo:3,k:'Months · inpatient rehabilitation',t:'Inpatient rehabilitation: function returns',sv:'Inpatient rehabilitation',set:'Rehabilitation unit',lv:.48,
  txt:'In an Israeli cohort, people spent on average 20 days on acute wards and 61 days in rehabilitation; total FIM rose 30 points <sup class="c" data-ref="Bondi2021" title="Source 50"><a href="/guillain-barre-syndrome/sources/#src-Bondi2021">50</a></sup>. Swedish hospital stays averaged 82 days <sup class="c" data-ref="Forsberg2006Burden" title="Source 135"><a href="/guillain-barre-syndrome/sources/#src-Forsberg2006Burden">135</a></sup>. At the end of US inpatient rehabilitation, 87.5% were independent in communication but only 24.7% in walking and moving about <sup class="c" data-ref="Andrews2023" title="Source 19"><a href="/guillain-barre-syndrome/sources/#src-Andrews2023">19</a></sup>.',
  pt:'By the end of a rehabilitation stay, most people could communicate on their own, but only about 1 in 4 could walk and move about without help <sup class="c" data-ref="Andrews2023" title="Source 19"><a href="/guillain-barre-syndrome/sources/#src-Andrews2023">19</a></sup>.',
  hook:'Gain in bed, chair and wheelchair transfers was the strongest predictor of going home from inpatient rehabilitation <sup class="c" data-ref="Kushner2023" title="Source 249"><a href="/guillain-barre-syndrome/sources/#src-Kushner2023">249</a></sup>.'},
 {from:.34,at:.44,mo:6,k:'First 6 months',t:'The first six months bring the fastest gains',sv:'The first six months',set:'Home, outpatient therapy',lv:.32,
  txt:'In a small series of 6 treated people, measured strength rose fastest in the first 6 months and more slowly from 6 to 18 months <sup class="c" data-ref="ElMhandi2007" title="Source 112"><a href="/guillain-barre-syndrome/sources/#src-ElMhandi2007">112</a></sup>. Across cohorts, about 80% walk independently by 6 months <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>. The chart has no Swedish data point here: its straight lines simply join 2 weeks to 1 year.',
  pt:'Most of the strength comes back in the first months. The lines between dots on the chart are drawn straight, so they only hint at the real shape <sup class="c" data-ref="ElMhandi2007,Forsberg2004Impairment" title="Source 112,133"><a href="/guillain-barre-syndrome/sources/#src-ElMhandi2007">112,133</a></sup>.',
  hook:'A longer plateau went with less strength recovery in knees and elbows (rho -0.82, n = 6) <sup class="c" data-ref="ElMhandi2007" title="Source 112"><a href="/guillain-barre-syndrome/sources/#src-ElMhandi2007">112</a></sup>.'},
 {from:.52,at:.62,mo:12,k:'1 year',t:'One year: most recovery has happened',sv:'One year after onset',set:'Home and work',lv:.18,
  txt:'At 1 year, 10% could not walk 10 m alone, strength was still below full in 62%, grip in 38%, and sensation was affected in 55% <sup class="c" data-ref="Forsberg2004Impairment" title="Source 133"><a href="/guillain-barre-syndrome/sources/#src-Forsberg2004Impairment">133</a></sup>. Dependence in personal care had fallen from 76% to 14% <sup class="c" data-ref="Forsberg2005Disability" title="Source 134"><a href="/guillain-barre-syndrome/sources/#src-Forsberg2005Disability">134</a></sup>. The authors concluded that recovery came mainly in the first year <sup class="c" data-ref="Forsberg2004Impairment" title="Source 133"><a href="/guillain-barre-syndrome/sources/#src-Forsberg2004Impairment">133</a></sup>.',
  pt:'By a year, most people manage their own care and walk, even if they are not as strong as before <sup class="c" data-ref="Forsberg2005Disability,Forsberg2004Impairment" title="Source 133,134"><a href="/guillain-barre-syndrome/sources/#src-Forsberg2005Disability">133,134</a></sup>.',
  hook:'Large gains in quality of life come in the first year, but not clearly after it <sup class="c" data-ref="Darweesh2014" title="Source 90"><a href="/guillain-barre-syndrome/sources/#src-Darweesh2014">90</a></sup>.'},
 {from:.7,at:.8,mo:24,k:'2 years',t:'Two years: slower change, real limits for some',sv:'Two years after onset',set:'Home and work',lv:.14,
  txt:'At 2 years, 7% could not walk 10 m alone, strength was below full in 55% and sensation affected in 52%: motor and sensory problems were each still detectable in more than half <sup class="c" data-ref="Forsberg2004Impairment" title="Source 133"><a href="/guillain-barre-syndrome/sources/#src-Forsberg2004Impairment">133</a></sup>. 12% depended on help for personal care and 17% of those who had worked were unable to work <sup class="c" data-ref="Forsberg2005Disability" title="Source 134"><a href="/guillain-barre-syndrome/sources/#src-Forsberg2005Disability">134</a></sup>.',
  pt:'Two years on, most people are independent, but more than half still notice some weakness or numbness <sup class="c" data-ref="Forsberg2004Impairment" title="Source 133"><a href="/guillain-barre-syndrome/sources/#src-Forsberg2004Impairment">133</a></sup>.',
  hook:'Swedish 2-year figures: 7% unable to walk 10 m; over 50% with detectable motor and sensory impairment <sup class="c" data-ref="Forsberg2004Impairment" title="Source 133"><a href="/guillain-barre-syndrome/sources/#src-Forsberg2004Impairment">133</a></sup>.'},
 {from:.86,at:.96,mo:28,k:'Years later',t:'Years later: gains still happen',sv:'Years later',set:'Years after',lv:.1,
  txt:'Recovery from remaining problems may still happen more than 5 years after onset <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>. In 76 intensive care patients, recovery could come as late as 10 years after onset <sup class="c" data-ref="Dhar2008" title="Source 99"><a href="/guillain-barre-syndrome/sources/#src-Dhar2008">99</a></sup>, and 19% of ICU survivors improved by at least one grade after 1 year <sup class="c" data-ref="Fletcher2000" title="Source 129"><a href="/guillain-barre-syndrome/sources/#src-Fletcher2000">129</a></sup>. In 47 rehabilitation inpatients, independence scores kept rising, to 95 at a mean of 7.5 years <sup class="c" data-ref="Shniper2022" title="Source 418"><a href="/guillain-barre-syndrome/sources/#src-Shniper2022">418</a></sup>.',
  pt:'It is never simply over at one or two years. Some people keep getting stronger for many years <sup class="c" data-ref="Leonhard2019,Dhar2008" title="Source 99,266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">99,266</a></sup>.',
  hook:'Recovery can continue for years; follow-up of at least 24 months has been suggested <sup class="c" data-ref="ElMhandi2007,Leonhard2019" title="Source 112,266"><a href="/guillain-barre-syndrome/sources/#src-ElMhandi2007">112,266</a></sup>.'}];
/* nerve routes */
const RH_ROUTES={
 block:{lab:['antibodies at the nodes','the block clears'],time:'days to weeks',tl:['onset','weeks'],
  cap:'Where antibodies (for example IgG anti-GM1) stop conduction at the node without destroying the axon, blocks disappeared or began to resolve within 3 weeks, with no sign of remyelination <sup class="c" data-ref="Kokubun2010,Kuwabara1998GM1" title="Source 232,252"><a href="/guillain-barre-syndrome/sources/#src-Kokubun2010">232,252</a></sup>. In northern China, people with AMAN walked 5 m with help after a median of 31 days, as fast as with AIDP: too fast for regrowth of the whole nerve. Reversal at the node and regrowth of nerve terminals in the muscle are the proposed reasons <span class="ev early">Early evidence</span> <sup class="c" data-ref="Ho1997Recovery,Griffin1996Nodal" title="Source 168,191"><a href="/guillain-barre-syndrome/sources/#src-Ho1997Recovery">168,191</a></sup>.'},
 regrow:{lab:['axon broken','growth cone advancing'],time:'months, sometimes years',tl:['onset','years'],
  cap:'Where the axon degenerates, it must regrow from the break. In 7 people with AMAN, strength began to return in week 4 without more motor units, suggesting early sprouting from surviving fibres and later nerve regeneration <sup class="c" data-ref="Kuwabara2001" title="Source 254"><a href="/guillain-barre-syndrome/sources/#src-Kuwabara2001">254</a></sup>. Sensory responses that rose over months also suggested regeneration <sup class="c" data-ref="Capasso2011" title="Source 70"><a href="/guillain-barre-syndrome/sources/#src-Capasso2011">70</a></sup>. Of 6 people with slowly recovering AMAN, 4 walked by 1 year and 2 at 28 and 57 months <sup class="c" data-ref="Hiraga2005" title="Source 188"><a href="/guillain-barre-syndrome/sources/#src-Hiraga2005">188</a></sup>.'}};
const RH_MUS=['muscle','responds'];
/* exercise schedules */
const RH_REV={min:[45,60],ses:[3,4],wk:12};
const RH_SHAH={min:60,ses:[2,3],wk:12};
const RH_ROWS=[{k:'min',l:'Minutes per session',max:90},{k:'ses',l:'Sessions per week',max:5},{k:'wk',l:'Weeks',max:24}];
const RH_LEG={rev:'band: 2026 review',shah:'Shah 2022 trial',you:'this schedule'};
const RH_IN={min:'Session length is inside the 45 to 60 minutes the review described.',ses:'Sessions per week are inside the 3 to 4 the review described.',wk:'The length is at least the 12 weeks the review described.'};
const RH_OUT={min:'Session length is outside the 45 to 60 minutes the review described.',ses:'Sessions per week are outside the 3 to 4 the review described.',wk:'The length is shorter than the 12 weeks the review described.'};
const RH_DOSECAP='The 2026 review (13 studies, 173 people, GBS and CIDP) linked the best results to supervised, individual, multicomponent sessions of 45 to 60 minutes, 3 to 4 times a week, for at least 12 weeks, and cautioned that study designs differed widely <sup class="c" data-ref="DeLeonMunoz2026" title="Source 96"><a href="/guillain-barre-syndrome/sources/#src-DeLeonMunoz2026">96</a></sup>. The Shah trial used 60 minutes, 2 to 3 times a week, for 12 weeks <sup class="c" data-ref="Shah2022" title="Source 408"><a href="/guillain-barre-syndrome/sources/#src-Shah2022">408</a></sup>; the bicycle study also ran 12 weeks <sup class="c" data-ref="Garssen2004Training" title="Source 148"><a href="/guillain-barre-syndrome/sources/#src-Garssen2004Training">148</a></sup>.';
const RH_DAYS=[ [2],[1,4],[0,2,4],[0,1,3,5],[0,1,2,3,4] ];

inits.rehab=()=>{
  const T=(x,y,s,c='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${s}</text>`;
  const INK='fill:var(--ink);font-weight:700';
  /* ---------- 1. main player ---------- */
  const svg=$('#rhSvg'),rg=$('#rhT'),note=$('#rhNote');let setSt=()=>{};
  const on=new Set(['walk','str','sens','adl']);
  function rhMonth(t){const P=[ [0,.5] ].concat(RH_STEPS.map(s=>[s.at,s.mo])).concat([ [1,28] ]);
    for(let i=0;i<P.length-1;i++)if(t<=P[i+1][0])return lerp(P[i][1],P[i+1][1],P[i+1][0]>P[i][0]?(t-P[i][0])/(P[i+1][0]-P[i][0]):1);return 28}
  function rhLv(t){const p=phaseOf(RH_STEPS,t),S=RH_STEPS[p];if(p===0)return S.lv;return lerp(RH_STEPS[p-1].lv,S.lv,ease(ramp(t,S.from,S.at)))}
  function rhAt(M,m){if(m<=RH_MO[0])return M.v[0];if(m>=RH_MO[2])return M.v[2];const i=m<RH_MO[1]?0:1;return lerp(M.v[i],M.v[i+1],(m-RH_MO[i])/(RH_MO[i+1]-RH_MO[i]))}
  function draw(t){
    const N=vb(svg,'720 400','400 664');
    const L=N?{tx:16,ty:26,cx:16,cy:42,cw:196,bx:330,by:40,bs:124,wy:178,gx:44,gy:196,gw:336,gh:210,lx:16,ly:472,lc:2,cap:652}
             :{tx:20,ty:28,cx:20,cy:44,cw:160,bx:100,by:94,bs:196,wy:312,gx:228,gy:56,gw:290,gh:266,lx:544,ly:66,lc:1,cap:390};
    const p=phaseOf(RH_STEPS,t),S=RH_STEPS[p],m=rhMonth(t);
    let s=T(L.tx,L.ty,S.sv,'t-big','font-size:18px');
    /* setting chip and body */
    s+=`<rect x="${L.cx}" y="${L.cy}" width="${L.cw}" height="26" rx="13" style="fill:var(--rec-soft);stroke:var(--rec)"/>`+T(L.cx+L.cw/2,L.cy+17,S.set,'t-sm t-mid','fill:var(--rec);font-weight:700');
    s+=bodyFront(L.bx,L.by,L.bs,{level:rhLv(t)}).svg+T(L.bx,L.wy,RH_WASH,'t-xs t-mid');
    /* chart */
    const X=v=>L.gx+L.gw*v/28,Y=v=>L.gy+L.gh*(1-v/100);
    s+=`<rect x="${L.gx}" y="${L.gy}" width="${L.gw}" height="${L.gh}" style="fill:var(--field)"/><rect x="${f1(X(24))}" y="${L.gy}" width="${f1(X(28)-X(24))}" height="${L.gh}" style="fill:var(--panel-2)"/>`;
    [0,50,100].forEach(v=>{s+=`<line x1="${L.gx}" x2="${L.gx+L.gw}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/>`+T(L.gx-6,Y(v)+3,v+'%','t-xs t-end')});
    s+=`<line x1="${L.gx}" x2="${L.gx+L.gw}" y1="${L.gy+L.gh}" y2="${L.gy+L.gh}" class="axis"/>`;
    RH_TICK.forEach(k=>{s+=`<line x1="${f1(X(k.m))}" x2="${f1(X(k.m))}" y1="${L.gy+L.gh}" y2="${L.gy+L.gh+5}" class="axis"/>`+T(X(k.m),L.gy+L.gh+17,k.l,'t-xs t-mid')});
    s+=T(X(26),L.gy+16,N?RH_LATERW.n:RH_LATERW.w,'t-xs t-mid');
    const mm=Math.min(m,24);
    RH_MEAS.forEach(M=>{if(!on.has(M.id))return;let d='';const n=40;for(let i=0;i<=n;i++){const q=lerp(.5,mm,i/n);d+=(i?'L':'M')+f1(X(q))+' '+f1(Y(rhAt(M,q)))}
      s+=`<path d="${d}" style="fill:none;stroke:${M.col};stroke-width:2.6;stroke-linejoin:round${M.dash?';stroke-dasharray:'+M.dash:''}"/>`;
      RH_MO.forEach((q,i)=>{if(q<=m+.01)s+=`<circle cx="${f1(X(q))}" cy="${f1(Y(M.v[i]))}" r="4" style="fill:${M.col};stroke:var(--panel);stroke-width:1.6"/>`})});
    s+=`<line x1="${f1(X(m))}" x2="${f1(X(m))}" y1="${L.gy}" y2="${L.gy+L.gh}" style="stroke:var(--ink);stroke-width:1.2;stroke-dasharray:3 3"/>`;
    /* the list: latest published value for each measure shown */
    const li=m>=23.99?2:m>=11.99?1:0;
    s+=T(L.lx,L.ly-18,RH_LIST,'t-xs',INK)+T(L.lx,L.ly-6,m>24.01?RH_LATER:RH_LATEST[li],'t-xs');
    let r=0;RH_MEAS.forEach(M=>{if(!on.has(M.id))return;const c=r%L.lc,y=L.ly+14+Math.floor(r/L.lc)*(N?36:40),x=L.lx+c*192;r++;
      s+=`<line x1="${x}" x2="${x+22}" y1="${y+8}" y2="${y+8}" style="stroke:${M.col};stroke-width:3${M.dash?';stroke-dasharray:'+M.dash:''}"/>`;
      s+=T(x+28,y+4,N?M.sh:M.l,'t-xs','fill:var(--ink)')+T(x+28,y+20,M.v[li]+'%','t-lbl')});
    if(!on.size)s+=T(L.lx,L.ly+20,'Pick a measure above the chart.','t-xs');
    s+=T(N?16:20,L.cap,'Sources: Forsberg 2004 and 2005; values are shares of the cohort.','t-xs');
    svg.innerHTML=s;setSt(p);note.innerHTML=noteHTML(S);
  }
  const stop=playWire(rg,$('#rhPlay'),draw,18000,'Replay','rehab');
  setSt=stepWire($('#rhSteps'),RH_STEPS,rg,draw,stop);
  $$('[data-rhm]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.rhm;on.has(k)?on.delete(k):on.add(k);b.setAttribute('aria-pressed',on.has(k));draw(+rg.value)}));
  draw(+rg.value);

  /* ---------- 2. two routes back ---------- */
  const ns=$('#rhNerve'),nr=$('#rhNT'),ncap=$('#rhNCap');let route='block';
  function drawN(t){
    const N=vb(ns,'720 240','400 266'),R=RH_ROUTES[route];
    const L=N?{x:16,w:290,y:96,h:28,mx:318,mw:70,ty:196,tw:368,lab:62}:{x:30,w:520,y:100,h:36,mx:568,mw:122,ty:196,tw:660,lab:58};
    const loop=(t*7)%1;let o={n:5,h:L.h,pulse:loop},rec=0;
    if(route==='block'){const hit=1-ease(ramp(t,.25,.75));rec=1-hit;o.nodeHit=[0,hit,hit,hit*.8,0,0];if(hit>.25)o.block=1}
    else{const g=ease(ramp(t,.12,.92));rec=g>=.98?1:0;o.cut=.42;o.regrow=g;if(g<.98)o.pulse=Math.min(loop,.4)}
    const F=nerveFibre(L.x,L.y,L.w,o);let s=F.svg;
    s+=T(L.x,24,N?'spinal cord side':'from the spinal cord','t-xs')+T(L.x+L.w,24,N?'':'to the muscle','t-xs t-end');
    /* muscle */
    const act=rec*(loop>.85?1:.5),sq=1-.12*act*(route==='block'||rec>0?1:0);
    s+=`<g transform="translate(${f1(L.mx+L.mw/2)} ${L.y}) scale(${f1(sq)} 1)"><rect x="${f1(-L.mw/2)}" y="${-L.h*1.1}" width="${L.mw}" height="${f1(L.h*2.2)}" rx="${f1(L.h*.8)}" style="fill:var(--muscle);opacity:${f1(.45+.5*rec)};stroke:var(--ink);stroke-width:1"/>`;
    for(let i=-2;i<=2;i++)s+=`<line x1="${f1(-L.mw/2+10)}" x2="${f1(L.mw/2-10)}" y1="${f1(i*L.h*.36)}" y2="${f1(i*L.h*.36)}" style="stroke:var(--ink);stroke-width:.8;opacity:.35"/>`;
    s+='</g>'+kitLabel(L.mx+L.mw/2,L.y+L.h*1.1+16,rec>.5?RH_MUS.join(' '):RH_MUS[0],{a:'m'});
    /* labels on the fibre */
    const lab=route==='block'?(rec<.5?R.lab[0]:R.lab[1]):(rec<1&&t>.12?R.lab[1]:R.lab[0]);
    const cx=F.at.cut?F.at.cut[0]:L.x+L.w/2,lx=route==='block'?F.at.nodes[2][0]:(rec<1&&t>.12?Math.min(cx+(o.regrow||0)*(L.x+L.w-cx-10),L.x+L.w-60):cx);
    s+=kitLabel(lx,L.y-L.h/2-22,lab,{a:'m'});
    /* time strip */
    s+=`<line x1="${L.x}" x2="${L.x+L.tw}" y1="${L.ty}" y2="${L.ty}" class="axis"/><line x1="${L.x}" x2="${f1(L.x+L.tw*t)}" y1="${L.ty}" y2="${L.ty}" style="stroke:var(--rec);stroke-width:3"/><circle cx="${f1(L.x+L.tw*t)}" cy="${L.ty}" r="6" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;
    s+=T(L.x,L.ty+20,R.tl[0],'t-xs')+T(L.x+L.tw,L.ty+20,R.tl[1],'t-xs t-end')+T(L.x+L.tw/2,L.ty+20,R.time,'t-sm t-mid',INK);
    s+=T(L.x,N?L.ty+50:L.ty+38,'Schematic: the two time strips have different scales.','t-xs');
    ns.innerHTML=s;ncap.innerHTML=R.cap}
  const stopN=playWire(nr,$('#rhNPlay'),drawN,9000,'Replay','rehab');
  $$('[data-rhr]').forEach(b=>b.addEventListener('click',()=>{route=b.dataset.rhr;$$('[data-rhr]').forEach(x=>x.setAttribute('aria-pressed',x===b));stopN();nr.value=.05;drawN(.05)}));
  drawN(+nr.value);

  /* ---------- 3. exercise schedule comparer ---------- */
  const ds=$('#rhDose'),dc=$('#rhDoseCap'),sMin=$('#rhMin'),sSes=$('#rhSes'),sWk=$('#rhWk');let fill=1,stopD=null;
  function drawD(f){
    const N=vb(ds,'720 236','400 376'),P={min:+sMin.value,ses:+sSes.value,wk:+sWk.value};
    const L=N?{cx:16,cy:46,cw:368,ch:112,rx:16,ry:204,rw:368,rs:54,leg:366}:{cx:20,cy:46,cw:330,ch:126,rx:400,ry:56,rw:300,rs:58,leg:226};
    const cell=L.cw/24,rowh=L.ch/7;let s=T(L.cx,24,'Weeks across, days down','t-xs',INK);
    for(let w=0;w<24;w++)for(let d=0;d<7;d++){const x=L.cx+w*cell,y=L.cy+d*rowh,inPlan=w<P.wk,sess=inPlan&&RH_DAYS[P.ses-1].includes(d),shown=w<P.wk*f;
      s+=`<rect x="${f1(x+1)}" y="${f1(y+1)}" width="${f1(cell-2)}" height="${f1(rowh-2)}" rx="2" style="fill:${inPlan?'var(--panel-2)':'var(--field)'};stroke:var(--line);stroke-width:.6"/>`;
      if(sess&&shown){const hh=(rowh-4)*P.min/90;s+=`<rect x="${f1(x+2)}" y="${f1(y+rowh-2-hh)}" width="${f1(cell-4)}" height="${f1(hh)}" rx="1.5" style="fill:var(--rec)"/>`}}
    s+=T(L.cx,L.cy+L.ch+16,`${P.min*P.ses*P.wk} minutes in all`,'t-sm',INK)+T(L.cx+L.cw,L.cy+L.ch+16,'bar height: session length','t-xs t-end');
    RH_ROWS.forEach((R,i)=>{const y=L.ry+i*L.rs,v=P[R.k],X=q=>L.rx+L.rw*q/R.max;
      s+=T(L.rx,y,R.l,'t-sm','fill:var(--ink)')+T(L.rx+L.rw,y,String(v),'t-lbl t-end');
      s+=`<rect x="${L.rx}" y="${y+8}" width="${L.rw}" height="10" rx="5" style="fill:var(--panel-2)"/>`;
      const band=R.k==='wk'?[RH_REV.wk,R.max]:RH_REV[R.k];s+=`<rect x="${f1(X(band[0]))}" y="${y+8}" width="${f1(Math.max(4,X(band[1])-X(band[0])))}" height="10" rx="5" style="fill:var(--rec);opacity:.45"/>`;
      const sh=RH_SHAH[R.k];(Array.isArray(sh)?sh:[sh]).forEach(q=>{const x=X(q);s+=`<path d="M${f1(x)} ${y+20}l5 7l-5 7l-5 -7z" style="fill:var(--accent);stroke:var(--panel);stroke-width:1"/>`});
      s+=`<circle cx="${f1(X(v))}" cy="${y+13}" r="6" style="fill:var(--ink);stroke:var(--panel);stroke-width:2"/>`;
      s+=T(L.rx,y+30,'0','t-xs')+T(L.rx+L.rw,y+30,String(R.max),'t-xs t-end')});
    const ly=L.leg,lx=N?L.rx:L.cx;
    s+=`<rect x="${lx}" y="${ly-9}" width="18" height="10" rx="5" style="fill:var(--rec);opacity:.45"/>`+T(lx+24,ly,RH_LEG.rev,'t-xs')
      +`<path d="M${lx+136} ${ly-11}l5 7l-5 7l-5 -7z" style="fill:var(--accent)"/>`+T(lx+146,ly,RH_LEG.shah,'t-xs')
      +`<circle cx="${lx+256}" cy="${ly-4}" r="5" style="fill:var(--ink)"/>`+T(lx+266,ly,RH_LEG.you,'t-xs');
    ds.innerHTML=s;
    const ok={min:P.min>=RH_REV.min[0]&&P.min<=RH_REV.min[1],ses:P.ses>=RH_REV.ses[0]&&P.ses<=RH_REV.ses[1],wk:P.wk>=RH_REV.wk};
    dc.innerHTML=`<b>${P.min} minutes · ${P.ses} per week · ${P.wk} weeks.</b> `+['min','ses','wk'].map(k=>ok[k]?RH_IN[k]:RH_OUT[k]).join(' ')+' '+RH_DOSECAP}
  [sMin,sSes,sWk].forEach(el=>el.addEventListener('change',()=>{if(stopD)stopD();stopD=animate(700,q=>{fill=q;drawD(q)},()=>{fill=1;stopD=null})}));
  drawD(1);
  const prev=redraws.rehab;redraws.rehab=()=>{prev&&prev();drawD(fill)};
};
/* =============== 4.3 Life after GBS =============== */
/* Three widgets: (1) the main player, a timeline from before the weakness to 10+ years, where each stop
   lights up one published proportion in a block of 100 figures (each stop is a different study, labelled);
   (2) the fatigue-frequency controversy as selectable bars; (3) recurrence risk on a 1000-dot grid.
   Numbers from research G, H and F (pain parts). */
const AF_NODES=[{l:'before',s:'before'},{l:'acute',s:'acute'},{l:'3 months',s:'3 mo'},{l:'1 year',s:'1 yr'},{l:'2 years',s:'2 yr'},{l:'3–6 years',s:'3–6 yr'},{l:'10+ years',s:'10+ yr'}];
const AF_STEPS=[
 {from:0,at:.04,k:'Before weakness · pain',t:'Pain can come first',sv:'Before the weakness',th:'Pain',col:'var(--rx)',v:36,big:'36%',c1:'had pain in the 2 weeks',c2:'before weakness began',src:'Netherlands, 156 people',
  txt:'In a prospective Dutch cohort of 156 people, 36% reported pain in the 2 weeks before weakness began <sup class="c" data-ref="Ruts2010Pain" title="Source 392"><a href="/guillain-barre-syndrome/sources/#src-Ruts2010Pain">392</a></sup>. In an IVIg trial sample, 55% of 223 had pain at randomisation, and for 70% of them it started before the weakness <sup class="c" data-ref="Ruts2007Pain" title="Source 390"><a href="/guillain-barre-syndrome/sources/#src-Ruts2007Pain">390</a></sup>. Pain first can delay the diagnosis, especially in young children <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.',
  pt:'Pain is common in GBS, and it can start before the weakness <sup class="c" data-ref="Ruts2010Pain" title="Source 392"><a href="/guillain-barre-syndrome/sources/#src-Ruts2010Pain">392</a></sup>.',
  hook:'Pain can come before weakness: 36% reported it in the preceding 2 weeks <sup class="c" data-ref="Ruts2010Pain" title="Source 392"><a href="/guillain-barre-syndrome/sources/#src-Ruts2010Pain">392</a></sup>.'},
 {from:.11,at:.18,k:'Acute phase · pain',t:'In the acute phase, most people hurt',sv:'The acute phase',th:'Pain',col:'var(--rx)',v:66,big:'66%',c1:'had pain in the',c2:'acute phase',src:'Netherlands, 156 people',
  txt:'Pain was present in the acute phase in 66% of the Dutch cohort, mostly moderate to severe, across all variants including Miller Fisher syndrome <sup class="c" data-ref="Ruts2010Pain" title="Source 392"><a href="/guillain-barre-syndrome/sources/#src-Ruts2010Pain">392</a></sup>. In Bangladesh 71% had pain at enrolment <sup class="c" data-ref="Papri2024Pain" title="Source 351"><a href="/guillain-barre-syndrome/sources/#src-Papri2024Pain">351</a></sup>. In a Canadian series of 55, 89.1% had pain at some point and 74.5% needed opioids <sup class="c" data-ref="Moulin1997" title="Source 303"><a href="/guillain-barre-syndrome/sources/#src-Moulin1997">303</a></sup>. How it is counted matters: a retrospective Chinese study found only 34.5% <sup class="c" data-ref="Yao2018" title="Source 519"><a href="/guillain-barre-syndrome/sources/#src-Yao2018">519</a></sup>.',
  pt:'Pain is common and real, even when weakness is the main problem. Please say if you hurt <sup class="c" data-ref="Ruts2010Pain" title="Source 392"><a href="/guillain-barre-syndrome/sources/#src-Ruts2010Pain">392</a></sup>.',
  hook:'Pain is present in about two-thirds acutely and over a third at 1 year <sup class="c" data-ref="Ruts2010Pain" title="Source 392"><a href="/guillain-barre-syndrome/sources/#src-Ruts2010Pain">392</a></sup>.'},
 {from:.25,at:.32,k:'First months · mood',t:'The first months are hardest on mood',sv:'Around three months',th:'Mood',col:'var(--care)',v:53,big:'53%',c1:'had symptoms of',c2:'depression at week 13',src:'Bangladesh, 111 people',
  txt:'In a Bangladeshi cohort (111 analysed), depression was found in 53% at week 13 and 41% at week 26, and anxiety in 45% and 36% <sup class="c" data-ref="Papri2026Mood" title="Source 352"><a href="/guillain-barre-syndrome/sources/#src-Papri2026Mood">352</a></sup>. In Danish population data the hazard of depression was highest in the first 3 months, 20.5 times that of the general population <sup class="c" data-ref="Levison2023Depression" title="Source 270"><a href="/guillain-barre-syndrome/sources/#src-Levison2023Depression">270</a></sup>. At admission the most stressful things were fear of staying paralysed, uncertainty and fear of intubation <sup class="c" data-ref="Sharshar2012" title="Source 417"><a href="/guillain-barre-syndrome/sources/#src-Sharshar2012">417</a></sup>.',
  pt:'Low mood and worry are common, especially in the first months. Asking for help with them is part of recovery <sup class="c" data-ref="Levison2023Depression,Leonhard2019" title="Source 266,270"><a href="/guillain-barre-syndrome/sources/#src-Levison2023Depression">266,270</a></sup>.',
  hook:'Depression risk is highest in the first 3 months and normalises after 2 years in Danish data <sup class="c" data-ref="Levison2023Depression" title="Source 270"><a href="/guillain-barre-syndrome/sources/#src-Levison2023Depression">270</a></sup>.'},
 {from:.39,at:.46,k:'1 year · pain',t:'At one year, pain is still common',sv:'One year after onset',th:'Pain',col:'var(--rx)',v:38,big:'38%',c1:'still had pain',c2:'at 1 year',src:'Netherlands, 156 people',
  txt:'At 1 year, 38% of the Dutch cohort still had pain, mostly moderate to severe <sup class="c" data-ref="Ruts2010Pain" title="Source 392"><a href="/guillain-barre-syndrome/sources/#src-Ruts2010Pain">392</a></sup>; the guideline review notes severe pain at 1 year in at least a third, sometimes lasting more than 10 years <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>. In Bangladesh pain fell from 71% to 38% at week 13 and 26% at week 26 <sup class="c" data-ref="Papri2024Pain" title="Source 351"><a href="/guillain-barre-syndrome/sources/#src-Papri2024Pain">351</a></sup>. Pain intensity at admission did not predict outcome <sup class="c" data-ref="Moulin1997" title="Source 303"><a href="/guillain-barre-syndrome/sources/#src-Moulin1997">303</a></sup>.',
  pt:'For many people pain fades over the first year, but for about a third it is still there at a year. Medicines may help, though the research is small <sup class="c" data-ref="Ruts2010Pain,vanDoorn2023" title="Source 392,473"><a href="/guillain-barre-syndrome/sources/#src-Ruts2010Pain">392,473</a></sup>.',
  hook:'Methylprednisolone did not reduce pain in GBS <sup class="c" data-ref="Ruts2007Pain,Liu2015" title="Source 273,390"><a href="/guillain-barre-syndrome/sources/#src-Ruts2007Pain">273,390</a></sup>.'},
 {from:.53,at:.6,k:'2 years · work',t:'Two years: back to work, mostly',sv:'Two years after onset',th:'Work',col:'var(--accent)',v:17,big:'17%',c1:'of those who had worked',c2:'still could not work',src:'Sweden, 42 adults',
  txt:'In the Swedish cohort, everyone who had been working was unable to work at 2 weeks, and 17% were still unable to work at 2 years <sup class="c" data-ref="Forsberg2005Disability" title="Source 134"><a href="/guillain-barre-syndrome/sources/#src-Forsberg2005Disability">134</a></sup>. At 2 years, 26% still depended on informal help <sup class="c" data-ref="Forsberg2006Burden" title="Source 135"><a href="/guillain-barre-syndrome/sources/#src-Forsberg2006Burden">135</a></sup>. In Danish data, depression risk after 2 years matched that of the general population (HR 0.8) <sup class="c" data-ref="Levison2023Depression" title="Source 270"><a href="/guillain-barre-syndrome/sources/#src-Levison2023Depression">270</a></sup>.',
  pt:'By two years most people who worked before are working again, though some need help at home for longer <sup class="c" data-ref="Forsberg2005Disability,Forsberg2006Burden" title="Source 134,135"><a href="/guillain-barre-syndrome/sources/#src-Forsberg2005Disability">134,135</a></sup>.',
  hook:'All Swedish people working before GBS were off work at 2 weeks; 17% were still unable to work at 2 years <sup class="c" data-ref="Forsberg2005Disability" title="Source 134"><a href="/guillain-barre-syndrome/sources/#src-Forsberg2005Disability">134</a></sup>.'},
 {from:.67,at:.74,k:'3 to 6 years · daily life',t:'Years on, life has often changed',sv:'Three to six years after onset',th:'Daily life',col:'var(--accent)',v:63,big:'63%',c1:'reported a change in work,',c2:'leisure, home or partner',src:'Netherlands, 122 people',
  txt:'Of 122 people from the Dutch trial, 63% reported one or more changes in lifestyle, work, leisure or their partner\'s life, including people who had physically recovered <sup class="c" data-ref="Bernsen1999Daily" title="Source 39"><a href="/guillain-barre-syndrome/sources/#src-Bernsen1999Daily">39</a></sup>. 38% of those with jobs had to change them <sup class="c" data-ref="Bernsen2002Work" title="Source 41"><a href="/guillain-barre-syndrome/sources/#src-Bernsen2002Work">41</a></sup>. Muscle aches and cramps persisted in 48%, linked to sensory loss rather than weakness <sup class="c" data-ref="Bernsen2001" title="Source 40"><a href="/guillain-barre-syndrome/sources/#src-Bernsen2001">40</a></sup>.',
  pt:'Even after the body has largely recovered, many people find their work, hobbies or family life have changed <sup class="c" data-ref="Bernsen1999Daily,Bernsen2002Work" title="Source 39,41"><a href="/guillain-barre-syndrome/sources/#src-Bernsen1999Daily">39,41</a></sup>.',
  hook:'Psychosocial function can be impaired even with no or mild residual signs at 3 to 6 years <sup class="c" data-ref="Bernsen1997Health" title="Source 38"><a href="/guillain-barre-syndrome/sources/#src-Bernsen1997Health">38</a></sup>.'},
 {from:.81,at:.9,k:'10 years and more · fatigue and pain',t:'A decade on: tiredness and pain for many',sv:'Ten years and more',th:'Fatigue and pain',col:'var(--weak)',v:70,big:'about 70%',c1:'reported pain or',c2:'severe fatigue',src:'Dutch patient society, 245 people',
  txt:'In questionnaires from 245 members of the Dutch patient society at a median of 10 years (70% responded), about 70% reported pain or severe fatigue, with lower quality of life <sup class="c" data-ref="Kuitwaard2009JPNS" title="Source 245"><a href="/guillain-barre-syndrome/sources/#src-Kuitwaard2009JPNS">245</a></sup>. People who join a patient society may not be typical. More than 20 years after GBS, 10 of 24 people reported severe fatigue <sup class="c" data-ref="Drory2012" title="Source 107"><a href="/guillain-barre-syndrome/sources/#src-Drory2012">107</a></sup>, and at 10 years 52% of a Swedish cohort had limits in walking <sup class="c" data-ref="Forsberg2012Decade" title="Source 136"><a href="/guillain-barre-syndrome/sources/#src-Forsberg2012Decade">136</a></sup>.',
  pt:'Tiredness and pain can last for many years, even after a good recovery. That is not imagined, and it is worth raising with your care team <sup class="c" data-ref="Kuitwaard2009JPNS,Leonhard2019" title="Source 245,266"><a href="/guillain-barre-syndrome/sources/#src-Kuitwaard2009JPNS">245,266</a></sup>.',
  hook:'Fatigue unrelated to motor deficits is reported in 60 to 80% and is often among the most disabling complaints <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.'}];
const AF_FOOT='One study per stop, scaled to 100 people: not one cohort, not a forecast.';
/* fatigue studies */
const AF_FAT=[
 {k:'merkies',l:'Merkies 1999',v:80,lab:'80%',
  cap:'<b>Merkies 1999:</b> severe fatigue in 80% of 113 people with past GBS, CIDP or MGUS neuropathy, including 81 to 86% of those with normal strength or sensation. A mixed clinic group, not GBS alone <sup class="c" data-ref="Merkies1999" title="Source 293"><a href="/guillain-barre-syndrome/sources/#src-Merkies1999">293</a></sup>.'},
 {k:'garssen',l:'Garssen 2006',v:60,lab:'60%',
  cap:'<b>Garssen 2006:</b> severe fatigue (mean Fatigue Severity Scale 5.0 or more) in 60% of 100 people after GBS, more often in women and people over 50, with no relation to disability at nadir, the preceding infection or time since GBS <sup class="c" data-ref="Garssen2006Fatigue" title="Source 150"><a href="/guillain-barre-syndrome/sources/#src-Garssen2006Fatigue">150</a></sup>.'},
 {k:'zul',l:'Zuluaga 2025, pooled',v:32,lab:'32%',
  cap:'<b>Zuluaga 2025:</b> a meta-analysis of 12 studies (1498 people) pooled a frequency of 32% (95% CI 22 to 44%), with very high heterogeneity (I squared 93%): 39% in high-income and 8% in low-to-middle-income countries <sup class="c" data-ref="Zuluaga2025" title="Source 544"><a href="/guillain-barre-syndrome/sources/#src-Zuluaga2025">544</a></sup>.'},
 {k:'zul',l:'  high-income',v:39,lab:'39%',sub:1},
 {k:'zul',l:'  lower-income',v:8,lab:'8%',sub:1},
 {k:'witsch',l:'Witsch 2013',v:30.4,lab:'30.4%',
  cap:'<b>Witsch 2013:</b> severe fatigue in 30.4% of 110 people who had needed ventilation, at a mean of 52.6 months <sup class="c" data-ref="Witsch2013" title="Source 513"><a href="/guillain-barre-syndrome/sources/#src-Witsch2013">513</a></sup>.'},
 {k:'drory',l:'Drory 2012',v:100*10/24,lab:'10 of 24',
  cap:'<b>Drory 2012:</b> more than 20 years after GBS, 10 of 24 people reported severe fatigue (Fatigue Severity Scale above 5) <sup class="c" data-ref="Drory2012" title="Source 107"><a href="/guillain-barre-syndrome/sources/#src-Drory2012">107</a></sup>.'}];
const AF_BAND='guideline review: 60 to 80%';
const AF_FATNOTE='Definitions, selection and settings differ between studies.';
/* recurrence */
const AF_REC={
 gbs:{lo:20,hi:50,big:'2 to 5 in 100',l1:'people with GBS',l2:'have it again',
  cap:'Recurrent GBS affects 2 to 5% of people with GBS: rare, but higher than the 0.1% lifetime risk in the general population <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>. Recurrences were defined as at least 2 months apart after full recovery, or 4 months after partial recovery <sup class="c" data-ref="Kuitwaard2009JNNP" title="Source 244"><a href="/guillain-barre-syndrome/sources/#src-Kuitwaard2009JNNP">244</a></sup>. The lighter dots show the spread between 2% and 5%.'},
 cal:{lo:11,hi:11,big:'11 in 1000',l1:'in a Californian cohort',l2:'of 550 people',
  cap:'In a Californian cohort of 550 people followed through 2008, 1.1% had a second diagnosis of GBS, none within 2 months of a vaccine <sup class="c" data-ref="Baxter2012" title="Source 30"><a href="/guillain-barre-syndrome/sources/#src-Baxter2012">30</a></sup>.'},
 pop:{lo:1,hi:1,big:'1 in 1000',l1:'lifetime risk of GBS',l2:'in the general population',
  cap:'The guideline review puts the lifetime risk of GBS in the general population at 0.1% <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>. One dot in a thousand.'}};
const AF_RKEY={solid:'counted',light:'range',base:'one person in 1000'};

/* pain over the first year: month of each published point (before weakness drawn at -0.5) */
const AF_PAIN=[
 {k:'nl',l:'Netherlands',pts:[ [-.5,36,'b'],[.5,66,'l'],[12,38,'bl'] ],col:'var(--rx)',dash:''},
 {k:'bd',l:'Bangladesh',pts:[ [.5,71,'a'],[3,38,'a'],[6,26,'a'] ],col:'var(--accent)',dash:'7 4'}];
const AF_PAX=[{m:-.5,l:'before',a:'t-end'},{m:.5,l:'onset',a:''},{m:3,l:'3 mo'},{m:6,l:'6 mo'},{m:12,l:'1 yr'}];
const AF_PY='with pain';
const AF_PLO={b:[0,18,'t-mid'],l:[-9,4,'t-end'],a:[0,-10,'t-mid'],bl:[-6,18,'t-end']};
inits.after=()=>{
  const T=(x,y,s,c='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${c}"${st?` style="${st}"`:''}>${s}</text>`;
  const INK='fill:var(--ink);font-weight:700';
  /* ---------- 1. main player ---------- */
  const svg=$('#afSvg'),rg=$('#afT'),note=$('#afNote');let setSt=()=>{};
  function afPos(t){const A=AF_STEPS.map(s=>s.at);if(t<=A[0])return 0;for(let i=0;i<A.length-1;i++)if(t<=A[i+1])return i+(t-A[i])/(A[i+1]-A[i]);return A.length-1}
  function afVal(t,p){const S=AF_STEPS[p];if(p===0)return S.v;return lerp(AF_STEPS[p-1].v,S.v,ease(ramp(t,S.from,S.at)))}
  function draw(t){
    const N=vb(svg,'720 400','400 606');
    const L=N?{tx:16,ty:26,chx:16,chy:38,ax0:28,ax1:372,ay:126,gx:95,gy:172,bx:16,by:446,foot:594}
             :{tx:20,ty:30,chx:0,chy:12,ax0:44,ax1:676,ay:100,gx:40,gy:140,bx:300,by:210,foot:390};
    const p=phaseOf(AF_STEPS,t),S=AF_STEPS[p],pos=afPos(t),n=AF_NODES.length,X=i=>lerp(L.ax0,L.ax1,i/(n-1));
    let s=T(L.tx,L.ty,S.sv,'t-big','font-size:18px');
    /* theme chip: words, not colour */
    const cw=Math.max(70,S.th.length*7.4+26),chx=N?L.chx:700-cw;
    s+=`<rect x="${f1(chx)}" y="${L.chy}" width="${f1(cw)}" height="24" rx="12" style="fill:var(--panel-2);stroke:${S.col};stroke-width:1.6"/>`+T(chx+cw/2,L.chy+16,S.th,'t-sm t-mid',INK);
    /* the road */
    s+=`<line x1="${L.ax0}" x2="${L.ax1}" y1="${L.ay}" y2="${L.ay}" style="stroke:var(--line);stroke-width:4;stroke-linecap:round"/>`;
    const px=lerp(L.ax0,L.ax1,pos/(n-1));
    s+=`<line x1="${L.ax0}" x2="${f1(px)}" y1="${L.ay}" y2="${L.ay}" style="stroke:var(--rec);stroke-width:4;stroke-linecap:round"/>`;
    AF_NODES.forEach((a,i)=>{const done=i<=pos+.01;s+=`<circle cx="${f1(X(i))}" cy="${L.ay}" r="${i===p?6.5:4.5}" style="fill:${done?'var(--rec)':'var(--panel)'};stroke:var(--rec);stroke-width:1.6"/>`+T(X(i),L.ay+20,N?a.s:a.l,'t-xs t-mid',i===p?INK:'')});
    const bob=RM?0:Math.abs(Math.sin(t*90))*2.5;
    s+=person(px,L.ay-34-bob,24,'var(--ink)');
    /* block of 100 */
    const k=Math.round(afVal(t,p));
    for(let i=0;i<100;i++){const cx=L.gx+(i%10)*21+8,cy=L.gy+Math.floor(i/10)*23;s+=person(cx,cy,16,i<k?S.col:'var(--line)',{op:i<k?1:.9})}
    /* the figure */
    s+=T(L.bx,L.by,S.big,'t-big',`font-size:${N?40:46}px;fill:var(--ink)`)+T(L.bx,L.by+28,S.c1,'t-lbl')+T(L.bx,L.by+46,S.c2,'t-lbl')+T(L.bx,L.by+70,S.src,'t-xs');
    s+=`<rect x="${L.bx}" y="${L.by+84}" width="14" height="14" rx="3" style="fill:${S.col}"/>`+T(L.bx+20,L.by+95,'figure with the problem, scaled to 100','t-xs');
    s+=T(L.tx,L.foot,AF_FOOT,'t-xs');
    svg.innerHTML=s;setSt(p);note.innerHTML=noteHTML(S);
  }
  const stop=playWire(rg,$('#afPlay'),draw,21000,'Replay','after');
  setSt=stepWire($('#afSteps'),AF_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- 2. fatigue studies ---------- */
  const fs=$('#afFatSvg'),fc=$('#afFatCap');let sel='garssen',glow=1,stopF=null;
  function drawF(g){
    const N=vb(fs,'720 312','400 392');
    const L=N?{lx:16,bx:16,bw:300,y0:54,rh:42,lab:0}:{lx:20,bx:220,bw:400,y0:48,rh:33,lab:1};
    const X=v=>L.bx+L.bw*v/100;
    let s=T(L.lx,22,'Share of people with fatigue, by study','t-sm',INK);
    /* guideline band */
    const top=L.y0-12,bot=L.y0+AF_FAT.length*L.rh-8;
    s+=`<rect x="${f1(X(60))}" y="${top}" width="${f1(X(80)-X(60))}" height="${bot-top}" style="fill:var(--warn-soft)"/>`+T((X(60)+X(80))/2,top-4,AF_BAND,'t-xs t-mid','fill:var(--warn);font-weight:700');
    [0,50,100].forEach(v=>{s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${top}" y2="${bot}" class="grid"/>`+T(X(v),bot+13,v+'%','t-xs t-mid')});
    AF_FAT.forEach((r,i)=>{const y=L.y0+i*L.rh,on=r.k===sel,w=L.bw*r.v/100;
      const ly=L.lab?y+12:y,by=L.lab?y:y+9;
      s+=`<g data-aff="${r.k}">`;
      s+=T(L.lx,ly,r.l.trim(),r.sub?'t-xs':'t-sm',on?INK:'fill:var(--ink)');
      if(on)s+=`<rect x="${L.bx-3}" y="${by-3}" width="${f1(w+6)}" height="22" rx="6" style="fill:none;stroke:var(--ink);stroke-width:${f1(1+1.5*g)};opacity:${f1(.4+.6*g)}"/>`;
      s+=`<rect x="${L.bx}" y="${by}" width="${f1(w)}" height="16" rx="4" style="fill:${r.sub?'var(--weak)':'var(--brand)'};opacity:${on?1:.55}"/>`;
      s+=T(L.bx+w+8,by+13,r.lab,'t-lbl')+'</g>'});
    s+=T(L.lx,N?384:306,AF_FATNOTE,'t-xs');
    fs.innerHTML=s}
  function setF(k,anim){sel=k;$$('button[data-aff]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.aff===k));fc.innerHTML=AF_FAT.find(r=>r.k===k&&r.cap).cap;
    if(stopF)stopF();if(!anim){glow=1;drawF(1);return}stopF=animate(600,q=>{glow=q;drawF(q)},()=>{glow=1;stopF=null})}
  $$('button[data-aff]').forEach(b=>b.addEventListener('click',()=>setF(b.dataset.aff,true)));
  fs.addEventListener('click',e=>{const g=e.target.closest('[data-aff]');if(g)setF(g.dataset.aff,true)});
  setF('garssen',false);

  /* ---------- 3. recurrence on 1000 dots ---------- */
  const rs=$('#afRecSvg'),rc=$('#afRecCap');let rk='gbs',rf=1,stopR=null;
  function drawR(f){
    const N=vb(rs,'720 260','400 372'),R=AF_REC[rk];
    const L=N?{gx:22,gy:24,d:9,tx:16,ty:276}:{gx:24,gy:24,d:9,tx:420,ty:84};
    let s='';const lo=Math.round(R.lo*f),hi=Math.round(R.hi*f);
    for(let i=0;i<1000;i++){const cx=L.gx+(i%40)*L.d,cy=L.gy+Math.floor(i/40)*L.d,c=i<lo?'var(--rx)':i<hi?'var(--rx)':'var(--line)',op=i<lo?1:i<hi?.4:1;
      s+=`<circle cx="${cx}" cy="${cy}" r="${i<hi?3.4:2.4}" style="fill:${c};opacity:${op}"/>`}
    s+=T(L.tx,L.ty,R.big,'t-big',`font-size:${N?30:34}px;fill:var(--ink)`)+T(L.tx,L.ty+26,R.l1,'t-lbl')+T(L.tx,L.ty+44,R.l2,'t-lbl');
    const ky=L.ty+(N?68:80);
    s+=`<circle cx="${L.tx+5}" cy="${ky-4}" r="3.4" style="fill:var(--rx)"/>`+T(L.tx+14,ky,AF_RKEY.solid,'t-xs');
    if(R.hi>R.lo)s+=`<circle cx="${L.tx+85}" cy="${ky-4}" r="3.4" style="fill:var(--rx);opacity:.4"/>`+T(L.tx+94,ky,AF_RKEY.light,'t-xs');
    s+=`<circle cx="${L.tx+5}" cy="${ky+14}" r="2.4" style="fill:var(--line)"/>`+T(L.tx+14,ky+18,AF_RKEY.base,'t-xs');
    rs.innerHTML=s}
  function setR(k,anim){rk=k;$$('[data-afr]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.afr===k));rc.innerHTML=AF_REC[k].cap;
    if(stopR)stopR();if(!anim){rf=1;drawR(1);return}stopR=animate(900,q=>{rf=q;drawR(q)},()=>{rf=1;stopR=null})}
  $$('[data-afr]').forEach(b=>b.addEventListener('click',()=>setR(b.dataset.afr,true)));
  setR('gbs',false);

  /* ---------- 4. pain over the first year ---------- */
  const ps=$('#afPainSvg'),pr=$('#afPainT');const pOn=new Set(['nl','bd']);
  function drawP(t){
    const N=vb(ps,'720 270','400 300');
    const L=N?{x:44,y:30,w:330,h:200}:{x:60,y:30,w:560,h:180};
    const X=m=>L.x+L.w*(m+1)/13,Y=v=>L.y+L.h*(1-v/100),mNow=lerp(-1,12,t);
    let s=`<rect x="${L.x}" y="${L.y}" width="${L.w}" height="${L.h}" style="fill:var(--field)"/>`;
    [0,50,100].forEach(v=>{s+=`<line x1="${L.x}" x2="${L.x+L.w}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/>`+T(L.x-6,Y(v)+3,v+'%','t-xs t-end')});
    s+=T(L.x,L.y-10,AF_PY,'t-xs');
    AF_PAX.forEach(a=>{s+=`<line x1="${f1(X(a.m))}" x2="${f1(X(a.m))}" y1="${L.y+L.h}" y2="${L.y+L.h+5}" class="axis"/>`+T(X(a.m)+(a.a==='t-end'?4:a.a===''?-4:0),L.y+L.h+18,a.l,'t-xs '+(a.a===undefined?'t-mid':a.a))});
    AF_PAIN.forEach(C=>{if(!pOn.has(C.k))return;const P=C.pts;let d='';
      for(let i=0;i<P.length;i++){if(P[i][0]>mNow){if(i>0){const a=P[i-1],b=P[i],q=(mNow-a[0])/(b[0]-a[0]);d+='L'+f1(X(mNow))+' '+f1(Y(lerp(a[1],b[1],q)))}break}d+=(i?'L':'M')+f1(X(P[i][0]))+' '+f1(Y(P[i][1]))}
      if(d)s+=`<path d="${d}" style="fill:none;stroke:${C.col};stroke-width:2.8;stroke-linejoin:round${C.dash?';stroke-dasharray:'+C.dash:''}"/>`;
      P.forEach(q=>{if(q[0]>mNow+.01)return;const px=X(q[0]),py=Y(q[1]),o=AF_PLO[q[2]];
        s+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="4.5" style="fill:${C.col};stroke:var(--panel);stroke-width:1.6"/>`+T(px+o[0],py+o[1],q[1]+'%','t-sm '+o[2],'fill:var(--ink)')})});
    s+=`<line x1="${f1(X(mNow))}" x2="${f1(X(mNow))}" y1="${L.y}" y2="${L.y+L.h}" style="stroke:var(--ink);stroke-width:1;stroke-dasharray:3 3"/>`;
    const ly=L.y+L.h+(N?44:42);let lx=L.x;
    AF_PAIN.forEach(C=>{s+=`<line x1="${lx}" x2="${lx+24}" y1="${ly-4}" y2="${ly-4}" style="stroke:${C.col};stroke-width:3${C.dash?';stroke-dasharray:'+C.dash:''};opacity:${pOn.has(C.k)?1:.3}"/>`+T(lx+30,ly,C.l,'t-sm','fill:var(--ink)');lx+=150});
    ps.innerHTML=s}
  playWire(pr,$('#afPainPlay'),drawP,7000,'Replay','after');
  $$('[data-afp]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.afp;pOn.has(k)?pOn.delete(k):pOn.add(k);b.setAttribute('aria-pressed',pOn.has(k));drawP(+pr.value)}));
  drawP(+pr.value);
  const prev=redraws.after;redraws.after=()=>{prev&&prev();drawF(glow);drawR(rf);drawP(+pr.value)};
};
/* =============== 5.1 Children & pregnancy =============== */
/* Four scenes: a child's course day by day (main player, anchored on the prospective German cohort), why young
   children are misdiagnosed, a cohort explorer (ventilation, subtype mix, a year of recovery) and the risk around
   pregnancy and birth (a forest plot of the two Swedish registers). Curves between published anchors are schematic.
   Every number comes from research pass H (and pass E for treatment), cited in the strings below. */

/* ---- labels drawn inside the SVGs ---- */
const CHD_TX={
  day:'day',axis:'days since the first symptom (square-root scale)',axisN:'days since first symptom',
  weaker:'weaker',walk:'walks unaided',schem:'Schematic curve between published medians',
  ev:[{d:7,l:'worst',r:0},{d:13,l:'better',r:1},{d:27,l:'walks',r:0},{d:118,l:'symptom-free',r:1}],
  ivig:'IVIg drip',pain:'leg and back pain',
  dxTitle:{pre:'Under 6 years: 23 children',old:'6 to 18 years: 32 children'},
  dxMis:'first misdiagnosed',dxOk:'GBS suspected first',
  dxPat:'symptoms to paediatrician',dxDoc:'paediatrician to suspecting GBS',dxDays:'median days',
  dxNone:'suspected at once (median 0 days)',
  pgPreg:'pregnancy',pgTri:['1st trimester','2nd trimester','3rd trimester'],pgTriN:['T1','T2','T3'],
  pgBirth:'birth',pg30:'30 days',pg90:'90 days',pgNow:'you are here',
  pgRows:['During pregnancy','0 to 30 days after birth','0 to 90 days after birth'],
  pgVals:['0.89 (0.52–1.53) · 0.86 (0.40–1.84)','2.93 (1.20–7.11) · 2.21 (0.55–8.94)','1.37 (0.64–2.91) · 1.47 (0.54–3.99)'],
  pgRef:'1 = no change',pgLo:'lower risk',pgHi:'higher risk',pgAxis:'rate ratio (log scale)',
  pgKey:['● Sweden 1978–93','■ Sweden 1973–83']
};

/* ---- main player: a child's course ---- */
const CHD_DK=[ [0,0],[.3,7],[.55,13],[.72,27],[.88,118],[1,288] ];
const chdWk=monoFn([ [0,0],[2,.22],[7,.86],[13,.86],[27,.44],[60,.17],[118,.04],[288,.02] ]);
function chdDay(t){for(let i=1;i<CHD_DK.length;i++){const a=CHD_DK[i-1],b=CHD_DK[i];if(t<=b[0])return lerp(a[1],b[1],(t-a[0])/(b[0]-a[0]))}return 288}
const CHD_STEPS=[
 {from:0,at:.04,k:'Step 1 · first signs',t:'Pain, or not wanting to walk',sub:'young children rarely say "my legs are weak"',
  fh:'FIRST MISDIAGNOSED · Rotterdam <sup class="c" data-ref="Roodbol2011" title="Source 380"><a href="/guillain-barre-syndrome/sources/#src-Roodbol2011">380</a></sup>',
  facts:[{l:'Preschool children (15 of 23)',v:68,s:'68%'},{l:'Children 6 to 18 (6 of 32)',v:21,s:'21%'},{l:'Neuropathic pain, German study',v:79,s:'79%'}],
  txt:'In a prospective German-speaking study of 95 children (median age 6.2 years), the first symptom was usually a gait disturbance or neuropathic pain, and 79% had neuropathic pain at some point <sup class="c" data-ref="Korinthenberg2007" title="Source 237"><a href="/guillain-barre-syndrome/sources/#src-Korinthenberg2007">237</a></sup>. Children under 6 can present with poorly localised pain, refusal to bear weight, irritability, meningism or an unsteady gait <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>. In Rotterdam, 68% of preschool children were first misdiagnosed, against 21% of older children <sup class="c" data-ref="Roodbol2011" title="Source 380"><a href="/guillain-barre-syndrome/sources/#src-Roodbol2011">380</a></sup>.',
  pt:'In young children the first sign is often pain in the back or legs, or not wanting to walk, so GBS can be missed at first <sup class="c" data-ref="Roodbol2011,Nguyen1999" title="Source 330,380"><a href="/guillain-barre-syndrome/sources/#src-Roodbol2011">330,380</a></sup>.',
  hook:'Children under 6 often present with pain, refusal to walk or irritability rather than weakness <sup class="c" data-ref="Leonhard2019,Roodbol2011" title="Source 266,380"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266,380</a></sup>.'},
 {from:.12,at:.22,k:'Step 2 · the climb',t:'Weakness climbs for about a week',sub:'median 7 days of worsening in the German study',
  fh:'IN THE 6 WEEKS BEFORE · 95 children <sup class="c" data-ref="Korinthenberg2007" title="Source 237"><a href="/guillain-barre-syndrome/sources/#src-Korinthenberg2007">237</a></sup>',
  facts:[{l:'An infection (70 of 95)',v:73.7,s:'70 of 95'},{l:'A vaccination (8 of 95)',v:8.4,s:'8 of 95'}],
  txt:'Of the 95 German-speaking children, 70 had an infection and 8 a vaccination in the 6 weeks before; symptoms progressed for a median of 7 days <sup class="c" data-ref="Korinthenberg2007" title="Source 237"><a href="/guillain-barre-syndrome/sources/#src-Korinthenberg2007">237</a></sup>. In 67 Dutch children the progressive phase lasted a median 6 days, and 70% presented with weakness of all four limbs <sup class="c" data-ref="Roodbol2017" title="Source 382"><a href="/guillain-barre-syndrome/sources/#src-Roodbol2017">382</a></sup>. Compared with adults in Northeast China, children reached their worst point a little sooner (6.3 vs 7.3 days) <sup class="c" data-ref="Wu2016" title="Source 516"><a href="/guillain-barre-syndrome/sources/#src-Wu2016">516</a></sup>.',
  pt:'Weakness usually gets worse for about a week, often starting in the legs <sup class="c" data-ref="Korinthenberg2007" title="Source 237"><a href="/guillain-barre-syndrome/sources/#src-Korinthenberg2007">237</a></sup>.',
  hook:'Median progression in children: 7 days (German prospective study) <sup class="c" data-ref="Korinthenberg2007" title="Source 237"><a href="/guillain-barre-syndrome/sources/#src-Korinthenberg2007">237</a></sup>.'},
 {from:.29,at:.33,k:'Step 3 · the worst point',t:'The worst point',sub:'what the German children had at nadir',
  fh:'AT THE WORST POINT · 95 children <sup class="c" data-ref="Korinthenberg2007" title="Source 237"><a href="/guillain-barre-syndrome/sources/#src-Korinthenberg2007">237</a></sup>',
  facts:[{l:'Could not walk',v:60,s:'60%'},{l:'Cranial nerve involvement',v:46,s:'46%'},{l:'Could not use their arms',v:24,s:'24%'},{l:'Autonomic dysfunction',v:51,s:'51%'}],
  txt:'At the worst point, 60% could not walk, 24% could not use their arms, 46% had cranial nerve involvement and 51% autonomic dysfunction <sup class="c" data-ref="Korinthenberg2007" title="Source 237"><a href="/guillain-barre-syndrome/sources/#src-Korinthenberg2007">237</a></sup>. In a US series, autonomic problems included blood pressure and pulse changes, bowel or bladder control and priapism (46%) <sup class="c" data-ref="Hicks2010" title="Source 185"><a href="/guillain-barre-syndrome/sources/#src-Hicks2010">185</a></sup>. 79% of the German children had neuropathic pain, half of them severe <sup class="c" data-ref="Korinthenberg2007" title="Source 237"><a href="/guillain-barre-syndrome/sources/#src-Korinthenberg2007">237</a></sup>.',
  pt:'At the worst point many children cannot walk for a while, and many have pain <sup class="c" data-ref="Korinthenberg2007" title="Source 237"><a href="/guillain-barre-syndrome/sources/#src-Korinthenberg2007">237</a></sup>.',
  hook:'About half of children have autonomic dysfunction at some point (51% German, 46% US) <sup class="c" data-ref="Korinthenberg2007,Hicks2010" title="Source 185,237"><a href="/guillain-barre-syndrome/sources/#src-Korinthenberg2007">185,237</a></sup>.'},
 {from:.4,at:.45,k:'Step 4 · breathing & treatment',t:'Breathing support and IVIg',sub:'IVIg is usually the first-line treatment in children',
  fh:'NEEDED VENTILATION · by cohort',
  facts:[{l:'German-speaking & Dutch, 421 children <sup class="c" data-ref="Roodbol2023" title="Source 383"><a href="/guillain-barre-syndrome/sources/#src-Roodbol2023">383</a></sup>',v:19,s:'19%'},{l:'German prospective, 95 <sup class="c" data-ref="Korinthenberg2007" title="Source 237"><a href="/guillain-barre-syndrome/sources/#src-Korinthenberg2007">237</a></sup>',v:13,s:'13%'},{l:'Chinese, 142 <sup class="c" data-ref="Qinrong2023" title="Source 364"><a href="/guillain-barre-syndrome/sources/#src-Qinrong2023">364</a></sup>',v:12.68,s:'12.68%'},{l:'One Indian PICU, 224 (selected) <sup class="c" data-ref="Bansal2026" title="Source 28"><a href="/guillain-barre-syndrome/sources/#src-Bansal2026">28</a></sup>',v:54.9,s:'54.9%'}],
  txt:'In 421 children from German-speaking countries and the Netherlands, 79 (19%) needed mechanical ventilation and one died <sup class="c" data-ref="Roodbol2023" title="Source 383"><a href="/guillain-barre-syndrome/sources/#src-Roodbol2023">383</a></sup>; other cohorts report 13% <sup class="c" data-ref="Korinthenberg2007" title="Source 237"><a href="/guillain-barre-syndrome/sources/#src-Korinthenberg2007">237</a></sup>, 12.68% <sup class="c" data-ref="Qinrong2023" title="Source 364"><a href="/guillain-barre-syndrome/sources/#src-Qinrong2023">364</a></sup> and 54.9% in one Indian paediatric ICU, a selected critically ill group <sup class="c" data-ref="Bansal2026" title="Source 28"><a href="/guillain-barre-syndrome/sources/#src-Bansal2026">28</a></sup>. The ten-steps guideline sees no indication to deviate from adult treatment in children; IVIg is usually first line because plasma exchange is available only in experienced centres and seems to cause more discomfort and complications in children <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.',
  pt:'About 1 child in 5 in European studies needed a breathing machine for a while. Children are usually treated with immunoglobulin (IVIg) through a drip <sup class="c" data-ref="Roodbol2023,Leonhard2019" title="Source 266,383"><a href="/guillain-barre-syndrome/sources/#src-Roodbol2023">266,383</a></sup>.',
  hook:'About 1 in 5 children with GBS in European cohorts needs ventilation (19% of 421) <sup class="c" data-ref="Roodbol2023" title="Source 383"><a href="/guillain-barre-syndrome/sources/#src-Roodbol2023">383</a></sup>.'},
 {from:.54,at:.6,k:'Step 5 · turning point',t:'Improvement begins',sub:'median day 13 in the German study',
  fh:'GERMAN IVIG TRIAL · early transient deterioration <sup class="c" data-ref="Korinthenberg2005" title="Source 236"><a href="/guillain-barre-syndrome/sources/#src-Korinthenberg2005">236</a></sup>',
  facts:[{l:'1 g/kg on 2 days (5 of 23)',v:21.7,s:'5 of 23'},{l:'0.4 g/kg on 5 days (0 of 23)',v:0,s:'0 of 23'}],
  txt:'Improvement began at a median of day 13 <sup class="c" data-ref="Korinthenberg2007" title="Source 237"><a href="/guillain-barre-syndrome/sources/#src-Korinthenberg2007">237</a></sup>. In the German paediatric trial (doses as published, not instructions), 1 g/kg over 2 days and 0.4 g/kg over 5 days gave similar recovery (median 19 vs 13 days to unaided walking, not significant), but early transient deterioration was more frequent with the 2-day regimen <sup class="c" data-ref="Korinthenberg2005" title="Source 236"><a href="/guillain-barre-syndrome/sources/#src-Korinthenberg2005">236</a></sup>.',
  pt:'Most children start to get better after about two weeks <sup class="c" data-ref="Korinthenberg2007" title="Source 237"><a href="/guillain-barre-syndrome/sources/#src-Korinthenberg2007">237</a></sup>.',
  hook:'In the German paediatric IVIg trial, the 2-day regimen caused more early transient deterioration than the 5-day regimen (5/23 vs 0/23) <sup class="c" data-ref="Korinthenberg2005" title="Source 236"><a href="/guillain-barre-syndrome/sources/#src-Korinthenberg2005">236</a></sup>.'},
 {from:.7,at:.725,k:'Step 6 · walking',t:'Walking again',sub:'median day 27 in the German study',
  fh:'WALKING INDEPENDENTLY AT 6 MONTHS · indirect comparison',
  facts:[{l:'Chinese children, 142 <sup class="c" data-ref="Qinrong2023" title="Source 364"><a href="/guillain-barre-syndrome/sources/#src-Qinrong2023">364</a></sup>',v:94.37,s:'94.37%'},{l:'Adults, about <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>',v:80,s:'about 80%'}],
  txt:'Unaided walking returned after a median 27 days in the German children <sup class="c" data-ref="Korinthenberg2007" title="Source 237"><a href="/guillain-barre-syndrome/sources/#src-Korinthenberg2007">237</a></sup>; 94.37% of 142 Chinese children walked independently at 6 months <sup class="c" data-ref="Qinrong2023" title="Source 364"><a href="/guillain-barre-syndrome/sources/#src-Qinrong2023">364</a></sup>. About 80% of adults walk independently at 6 months <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>. Cohorts differ in setting and definitions, so children seem to fare better, but this is an indirect comparison.',
  pt:'Most children walk again within weeks, and usually recover faster than adults <sup class="c" data-ref="Korinthenberg2007,Qinrong2023" title="Source 237,364"><a href="/guillain-barre-syndrome/sources/#src-Korinthenberg2007">237,364</a></sup>.',
  hook:'Lower disability at nadir was the strongest predictor of independent walking in 421 European children (at one month OR 0.43) <sup class="c" data-ref="Roodbol2023" title="Source 383"><a href="/guillain-barre-syndrome/sources/#src-Roodbol2023">383</a></sup>.'},
 {from:.84,at:.95,k:'Step 7 · months later',t:'Months later',sub:'at the end of observation, 288 days',
  fh:'AT 288 DAYS · German prospective study <sup class="c" data-ref="Korinthenberg2007" title="Source 237"><a href="/guillain-barre-syndrome/sources/#src-Korinthenberg2007">237</a></sup>',
  facts:[{l:'Symptom-free',v:75,s:'75%'},{l:'Residual symptoms, daily life unaffected',v:21,s:'21%'},{l:'More severe disability (CIDP or myelitis)',v:4,s:'4%'}],
  txt:'Children followed long term were symptom-free after a median 118 days; at 288 days 75% were symptom-free, 21% had residual symptoms that did not affect daily functioning, and the 4% with more severe disability had CIDP or concurrent myelitis <sup class="c" data-ref="Korinthenberg2007" title="Source 237"><a href="/guillain-barre-syndrome/sources/#src-Korinthenberg2007">237</a></sup>. Years later, many still report tingling, pain or tiredness: 67% of French children at a median 6 years 4 months, mostly minor <sup class="c" data-ref="Estublier2024" title="Source 116"><a href="/guillain-barre-syndrome/sources/#src-Estublier2024">116</a></sup>.',
  pt:'Most children recover well. Some still have tingling, pain or tiredness years later <sup class="c" data-ref="Korinthenberg2007,Estublier2024" title="Source 116,237"><a href="/guillain-barre-syndrome/sources/#src-Korinthenberg2007">116,237</a></sup>.',
  hook:'Long-term sequelae are common even after good recovery: 67% at a median 6 years, mostly minor <sup class="c" data-ref="Estublier2024" title="Source 116"><a href="/guillain-barre-syndrome/sources/#src-Estublier2024">116</a></sup>.'}
];

/* ---- misdiagnosis explorer (Roodbol 2011) ---- */
const CHD_DX={
  pre:{n:23,k:15,pat:5,doc:3,cap:'<b>Under 6 years.</b> 15 of 23 preschool children (68%) were first given another diagnosis. They reached a paediatrician as fast as older children (median 5 days), but the doctor took a median 3 days to suspect GBS, more than a week in a quarter, up to 22 days <sup class="c" data-ref="Roodbol2011" title="Source 380"><a href="/guillain-barre-syndrome/sources/#src-Roodbol2011">380</a></sup>. Refusal to walk and leg pain were the most frequent first symptoms (65%) <sup class="c" data-ref="Roodbol2011" title="Source 380"><a href="/guillain-barre-syndrome/sources/#src-Roodbol2011">380</a></sup>.'},
  old:{n:32,k:6,pat:5,doc:0,cap:'<b>6 to 18 years.</b> 6 of 32 older children (21%) were first misdiagnosed (p = 0.001 against preschool children). Patient delay was the same (median 5 days), but GBS was suspected at once: a median doctor\'s delay of 0 days <sup class="c" data-ref="Roodbol2011" title="Source 380"><a href="/guillain-barre-syndrome/sources/#src-Roodbol2011">380</a></sup>.'}
};

/* ---- cohort explorer ---- */
const CHD_CO={
  vent:{h:'Children who needed mechanical ventilation',rows:[
    {l:'German-speaking & Dutch (421)',v:19,s:'19%'},{l:'German prospective (95)',v:13,s:'13%'},
    {l:'China (142)',v:12.68,s:'12.68%'},{l:'One Indian PICU (224)',v:54.9,s:'54.9%'}],
    cap:'Ventilation rates depend on who is counted. 19% of 421 children in German-speaking and Dutch cohorts <sup class="c" data-ref="Roodbol2023" title="Source 383"><a href="/guillain-barre-syndrome/sources/#src-Roodbol2023">383</a></sup>, 13% in the German prospective study <sup class="c" data-ref="Korinthenberg2007" title="Source 237"><a href="/guillain-barre-syndrome/sources/#src-Korinthenberg2007">237</a></sup>, 12.68% of 142 Chinese children <sup class="c" data-ref="Qinrong2023" title="Source 364"><a href="/guillain-barre-syndrome/sources/#src-Qinrong2023">364</a></sup>, but 54.9% (and tracheostomy 24.2%) in one Indian paediatric intensive care unit, a selected critically ill group <sup class="c" data-ref="Bansal2026" title="Source 28"><a href="/guillain-barre-syndrome/sources/#src-Bansal2026">28</a></sup>.'},
  sub:{h:'Subtype mix: myelin (AIDP) or axon (AMAN, AMSAN)',rows:[
    {l:'Germany, prospective (95)',seg:[{k:'dem',v:74,s:'demyelinating 74%'},{k:'ax',v:11,s:'purely axonal 11%'}]},
    {l:'France (110)',seg:[{k:'dem',v:70,s:'AIDP 70%'},{k:'ax',v:16,s:'AMAN 16%'}]},
    {l:'North India PICU (224)',seg:[{k:'ax',v:61.6,s:'AMAN 61.6%'},{k:'dem',v:20.1,s:'AIDP 20.1%'},{k:'ax2',v:8,s:'AMSAN 8%'}]},
    {l:'India, 1-year follow-up (52)',seg:[{k:'ax',v:50,s:'AMAN 50%'}]}],
    cap:'As in adults, the mix depends on region and setting: mostly demyelinating in European cohorts (74% in Germany, 70% AIDP in France), mostly axonal in Indian cohorts (AMAN 61.6% in a PICU, 50% in a follow-up study) <span class="ev est">Established</span> for the regional pattern <sup class="c" data-ref="Korinthenberg2007,Estrade2019,Bansal2026,Kumar2026" title="Source 28,115,237,247"><a href="/guillain-barre-syndrome/sources/#src-Korinthenberg2007">28,115,237,247</a></sup>. The grey remainder is not classified in these figures.'},
  rec:{h:'A year of recovery in 52 Indian children (half AMAN)',x:['discharge','6 months','1 year'],ser:[
    {l:'GBS disability score 2 or more',v:[100,51.9,19.2],c:'var(--care)',m:'c'},
    {l:'Arm (ONLS) score above 2: fine motor',v:[46.2,26.9,7.7],c:'var(--accent)',m:'s'}],
    cap:'All 52 children had a GBS disability score of 2 or more at discharge, 51.9% at 6 months and 19.2% at 1 year. Fine motor problems lasted in some: an arm score above 2 fell from 46.2% to 26.9% and 7.7% <sup class="c" data-ref="Kumar2026" title="Source 247"><a href="/guillain-barre-syndrome/sources/#src-Kumar2026">247</a></sup>. In 421 European children, lower disability at nadir was the strongest predictor of walking <sup class="c" data-ref="Roodbol2023" title="Source 383"><a href="/guillain-barre-syndrome/sources/#src-Roodbol2023">383</a></sup>.'}
};

/* ---- pregnancy player ---- */
const CHD_PG=[
 {from:0,at:.27,k:'Step 1 · pregnancy',t:'During pregnancy: risk not raised',
  txt:'In Swedish women aged 15 to 49 (1978 to 1993), the age-adjusted rate ratio for GBS during pregnancy was 0.89 (95% CI 0.52 to 1.53) <sup class="c" data-ref="Cheng1998" title="Source 74"><a href="/guillain-barre-syndrome/sources/#src-Cheng1998">74</a></sup>; an earlier register (1973 to 1983) gave 0.86 (0.40 to 1.84) <sup class="c" data-ref="Jiang1996" title="Source 212"><a href="/guillain-barre-syndrome/sources/#src-Jiang1996">212</a></sup>. When GBS does start in pregnancy, onset was spread across trimesters in 16 French women (31%, 31%, 38%) <sup class="c" data-ref="Krief2023" title="Source 242"><a href="/guillain-barre-syndrome/sources/#src-Krief2023">242</a></sup>, while 52.5% of 101 published case reports began in the third trimester <sup class="c" data-ref="Yakubu2026" title="Source 518"><a href="/guillain-barre-syndrome/sources/#src-Yakubu2026">518</a></sup>.',
  pt:'GBS in pregnancy is uncommon, and pregnancy itself does not seem to raise the risk <sup class="c" data-ref="Cheng1998" title="Source 74"><a href="/guillain-barre-syndrome/sources/#src-Cheng1998">74</a></sup>.',
  hook:'Rate ratio in pregnancy 0.89: not raised <sup class="c" data-ref="Cheng1998" title="Source 74"><a href="/guillain-barre-syndrome/sources/#src-Cheng1998">74</a></sup>.'},
 {from:.5,at:.555,k:'Step 2 · birth',t:'Around the birth',
  txt:'In the US National Inpatient Sample (1999 to 2015), 291 of 13,792,544 births were to women with GBS, 2.1 per 100,000 births, rising from 1.26 to 3.8 per 100,000 over the period <sup class="c" data-ref="Taylor2024" title="Source 444"><a href="/guillain-barre-syndrome/sources/#src-Taylor2024">444</a></sup>. In 36 peripartum women in Assam, 28 had onset before and 8 after delivery; 6 of the 8 developed weakness on the day of delivery <sup class="c" data-ref="Patra2022" title="Source 355"><a href="/guillain-barre-syndrome/sources/#src-Patra2022">355</a></sup>.',
  pt:'Most women with GBS around the time of birth fall ill before the baby arrives <sup class="c" data-ref="Patra2022" title="Source 355"><a href="/guillain-barre-syndrome/sources/#src-Patra2022">355</a></sup>.',
  hook:'Maternal GBS: 2.1 per 100,000 US births, 1999 to 2015 <sup class="c" data-ref="Taylor2024" title="Source 444"><a href="/guillain-barre-syndrome/sources/#src-Taylor2024">444</a></sup>.'},
 {from:.58,at:.66,k:'Step 3 · first month',t:'The first 30 days after birth',
  txt:'In the first 30 days after delivery the rate ratio was 2.93 (95% CI 1.20 to 7.11) <sup class="c" data-ref="Cheng1998" title="Source 74"><a href="/guillain-barre-syndrome/sources/#src-Cheng1998">74</a></sup>. The authors conclude the risk rises after delivery, particularly in the first 2 weeks postpartum <span class="ev early">Early evidence</span> <sup class="c" data-ref="Cheng1998" title="Source 74"><a href="/guillain-barre-syndrome/sources/#src-Cheng1998">74</a></sup>. The earlier register points the same way, 2.21 (0.55 to 8.94), but its interval includes 1 <sup class="c" data-ref="Jiang1996" title="Source 212"><a href="/guillain-barre-syndrome/sources/#src-Jiang1996">212</a></sup>.',
  pt:'The risk seems highest in the first weeks after the baby is born <sup class="c" data-ref="Cheng1998" title="Source 74"><a href="/guillain-barre-syndrome/sources/#src-Cheng1998">74</a></sup>.',
  hook:'GBS risk is not raised during pregnancy but rises after delivery: rate ratio 2.93 in the first 30 days postpartum <sup class="c" data-ref="Cheng1998" title="Source 74"><a href="/guillain-barre-syndrome/sources/#src-Cheng1998">74</a></sup>.'},
 {from:.76,at:.9,k:'Step 4 · three months',t:'Up to 90 days after birth',
  txt:'Over the first 90 days the rate ratio was 1.37 (0.64 to 2.91) <sup class="c" data-ref="Cheng1998" title="Source 74"><a href="/guillain-barre-syndrome/sources/#src-Cheng1998">74</a></sup>, and over 3 months in the earlier register 1.47 (0.54 to 3.99) <sup class="c" data-ref="Jiang1996" title="Source 212"><a href="/guillain-barre-syndrome/sources/#src-Jiang1996">212</a></sup>: the same direction, but neither interval excludes 1. Whether the postpartum rise is real is still debated: significant at 30 days in one register only <sup class="c" data-ref="Cheng1998,Jiang1996" title="Source 74,212"><a href="/guillain-barre-syndrome/sources/#src-Cheng1998">74,212</a></sup>.',
  pt:'After the first month, the extra risk is no longer clear in these studies <sup class="c" data-ref="Cheng1998,Jiang1996" title="Source 74,212"><a href="/guillain-barre-syndrome/sources/#src-Cheng1998">74,212</a></sup>.',
  hook:'Two Swedish registers, same direction: only the 30-day ratio in the 1978–93 cohort excludes 1 <sup class="c" data-ref="Cheng1998,Jiang1996" title="Source 74,212"><a href="/guillain-barre-syndrome/sources/#src-Cheng1998">74,212</a></sup>.'}
];
const CHD_PGR=[ [ [.89,.52,1.53],[.86,.40,1.84] ],[ [2.93,1.20,7.11],[2.21,.55,8.94] ],[ [1.37,.64,2.91],[1.47,.54,3.99] ] ];

inits.children=()=>{
  const tx=(x,y,s,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`;
  const INK='fill:var(--ink);font-weight:700';
  /* a labelled bar: label left and value right on one line, the bar under them */
  function bar(x,y,w,f,lbl,val,col='var(--care)'){
    return tx(x,y,lbl,'t-xs',INK)+tx(x+w,y,val,'t-xs t-end',INK)+`<rect x="${f1(x)}" y="${f1(y+5)}" width="${f1(w)}" height="9" rx="4.5" style="fill:var(--panel-2)"/>`+(f>0?`<rect x="${f1(x)}" y="${f1(y+5)}" width="${f1(Math.max(4,w*clamp(f)))}" height="9" rx="4.5" style="fill:${col}"/>`:'')}
  const stripCite=s=>s.replace(/\s*<sup class="c".*?<\/sup>/g,'');
  /* the IVIg bag on a drip stand */
  function drip(x,y,a,hand){let s=`<g style="opacity:${f1(a)}"><line x1="${f1(x+14)}" y1="${f1(y-14)}" x2="${f1(x+14)}" y2="${f1(y)}" style="stroke:var(--device);stroke-width:2"/>`;
    s+=`<rect x="${f1(x)}" y="${f1(y)}" width="28" height="40" rx="7" style="fill:var(--ivig);opacity:.35;stroke:var(--device);stroke-width:1.4"/><rect x="${f1(x+3)}" y="${f1(y+12)}" width="22" height="25" rx="5" style="fill:var(--ivig);opacity:.8"/>`;
    s+=`<path d="M${f1(x+14)} ${f1(y+40)}C${f1(x+14)} ${f1(y+90)} ${f1(hand[0]+30)} ${f1(hand[1]-10)} ${f1(hand[0]+2)} ${f1(hand[1])}" style="fill:none;stroke:var(--device);stroke-width:1.6"/>`;
    return s+kitLabel(x+14,y+56,CHD_TX.ivig,{a:'m'})+'</g>'}

  /* ---------- main: a child's course ---------- */
  const svg=$('#chdSvg'),rg=$('#chdT');let setSt=()=>{};
  function draw(t){
    const N=vb(svg,'720 400','400 690'),p=phaseOf(CHD_STEPS,t),P=CHD_STEPS[p],day=chdDay(t),lv=chdWk(day);
    const L=N?{tx:12,bx:78,by:62,bs:190,dx:150,dy:78,cx:40,cy:316,cw:345,ch:150,sy:520,cols:1,cw2:376,rowH:40}
             :{tx:14,bx:96,by:66,bs:224,dx:168,dy:84,cx:252,cy:84,cw:440,ch:178,sy:316,cols:2,cw2:336,rowH:38};
    let s=tx(L.tx,24,P.t,'t-big','font-size:19px;fill:var(--care)')+tx(L.tx,41,P.sub,'t-sm');
    /* the child */
    const pain=ramp(t,0,.04)*(1-ramp(t,.5,.62)),tg=ramp(t,.03,.1)*(1-ramp(t,.8,.95));
    const B=bodyFront(L.bx,L.by,L.bs,{level:lv,pain,tingle:tg});s+=B.svg;
    if(t<.2){const a=pain*(1-ramp(t,.14,.2));s+=`<g style="opacity:${f1(a)}">`+kitLabel(B.at.back[0]+L.bs*.24,B.at.back[1]+4,CHD_TX.pain,{})+'</g>'}
    const dA=ramp(t,.36,.4)*(1-ramp(t,.6,.66));if(dA>0)s+=drip(L.dx,L.dy,dA,B.at.hand);
    /* the course chart on a square-root day axis */
    const C=curve(L.cx,L.cy,L.cw,L.ch,u=>chdWk(288*u*u),{upto:Math.sqrt(day/288),col:'var(--care)',fill:true,dot:true,lw:3});
    s+=C.svg;const XD=d=>L.cx+L.cw*Math.sqrt(d/288);
    const yW=C.Y(.44);s+=`<line x1="${f1(L.cx)}" x2="${f1(L.cx+L.cw)}" y1="${f1(yW)}" y2="${f1(yW)}" class="grid"/>`+tx(L.cx+L.cw-4,yW-5,CHD_TX.walk,'t-xs t-end');
    s+=tx(L.cx+5,L.cy+13,CHD_TX.weaker+' ↑','t-xs');
    CHD_TX.ev.forEach(e=>{const xx=XD(e.d),on=day>=e.d-.01;s+=`<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${f1(L.cy)}" y2="${f1(L.cy+L.ch)}" class="grid" style="opacity:${on?1:.4}"/>`;
      s+=tx(xx,L.cy-(e.r?7:20),e.l,'t-xs t-mid',on?INK:'opacity:.55')});
    [0,7,13,27,118,288].forEach(d=>{s+=tx(XD(d),L.cy+L.ch+14,d,'t-xs t-mid')});
    s+=tx(L.cx+L.cw,L.cy+L.ch+29,N?CHD_TX.axisN:CHD_TX.axis,'t-xs t-end');
    s+=tx(L.cx,L.cy+L.ch+29,CHD_TX.schem,'t-xs',`opacity:${N?0:1}`);
    s+=tx(L.cx+L.cw,L.cy-(N?34:34),CHD_TX.day+' '+Math.round(day),'t-lbl t-end','fill:var(--care)');
    /* the numbers strip */
    const g=ease(ramp(t,P.from,P.from+.05));
    s+=`<line x1="${f1(L.tx)}" x2="${f1(N?388:706)}" y1="${f1(L.sy-14)}" y2="${f1(L.sy-14)}" class="axis"/>`+tx(L.tx,L.sy,stripCite(P.fh),'t-xs','letter-spacing:.06em');
    P.facts.forEach((f,i)=>{const c=L.cols===2?i%2:0,r=L.cols===2?Math.floor(i/2):i;
      s+=bar(L.tx+c*(L.cw2+34),L.sy+20+r*L.rowH,L.cw2,g*f.v/100,stripCite(f.l),f.s,i===0?'var(--care)':'var(--accent)')});
    svg.innerHTML=s;setSt(p);$('#chdNote').innerHTML=noteHTML(P);
  }
  const stop=playWire(rg,$('#chdPlay'),draw,16000,'Replay','children');
  setSt=stepWire($('#chdSteps'),CHD_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- misdiagnosis in young children ---------- */
  const dsv=$('#chdDxSvg'),dcap=$('#chdDxCap');let dg='pre',dA=1,dStop=null;
  function drawDx(){const N=vb(dsv,'720 230','400 400'),D=CHD_DX[dg];
    const L=N?{ix:14,iy:44,cols:10,sz:20,tx:14,ty:24,lx:14,ly:142,bx:14,by:220,bw:372}:{ix:14,iy:44,cols:12,sz:20,tx:14,ty:24,lx:14,ly:142,bx:340,by:56,bw:360};
    let s=tx(L.tx,L.ty,CHD_TX.dxTitle[dg],'t-lbl');
    const k=Math.round(D.k*dA);
    const I=icons(L.ix,L.iy,{n:D.n,cols:L.cols,k,size:L.sz,gap:5,col:'var(--accent)',base:'var(--care)'});s+=I.svg;
    const ly=L.iy+I.h+16;
    s+=`<rect x="${f1(L.lx)}" y="${f1(ly-9)}" width="10" height="10" rx="2" style="fill:var(--accent)"/>`+tx(L.lx+15,ly,`${D.k} ${CHD_TX.dxMis}`,'t-xs',INK);
    s+=`<rect x="${f1(L.lx+150)}" y="${f1(ly-9)}" width="10" height="10" rx="2" style="fill:var(--care)"/>`+tx(L.lx+165,ly,`${D.n-D.k} ${CHD_TX.dxOk}`,'t-xs',INK);
    /* delay bars on a 0..10 day scale */
    const X=d=>L.bx+L.bw*d/10;
    s+=tx(L.bx,L.by,CHD_TX.dxDays,'t-xs','letter-spacing:.06em');
    const r1=L.by+26,r2=L.by+78;
    s+=tx(L.bx,r1-8,CHD_TX.dxPat,'t-xs',INK)+`<rect x="${f1(L.bx)}" y="${f1(r1)}" width="${f1(X(D.pat)-L.bx)}" height="16" rx="5" style="fill:var(--care)"/>`+tx(X(D.pat)+6,r1+12,D.pat,'t-lbl');
    s+=tx(X(D.pat),r2-8,D.doc?CHD_TX.dxDoc:CHD_TX.dxNone,'t-xs',INK);
    const dw=(X(D.pat+D.doc*dA)-X(D.pat));
    s+=`<rect x="${f1(X(D.pat))}" y="${f1(r2)}" width="${f1(Math.max(3,dw))}" height="16" rx="5" style="fill:var(--accent)"/>`+tx(X(D.pat)+Math.max(3,dw)+6,r2+12,(D.doc*dA).toFixed(0),'t-lbl');
    s+=`<line x1="${f1(X(D.pat))}" x2="${f1(X(D.pat))}" y1="${f1(r1)}" y2="${f1(r2+16)}" class="grid"/>`;
    const tl=tline(L.bx,r2+40,L.bw,{min:0,max:10,step:1,label:'days'});s+=tl.svg;
    dsv.innerHTML=s;dcap.innerHTML=D.cap;
    $$('[data-chdx]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.chdx===dg))}
  $$('[data-chdx]').forEach(b=>b.addEventListener('click',()=>{dg=b.dataset.chdx;if(dStop)dStop();dStop=animate(900,q=>{dA=ease(q);drawDx()},()=>{dStop=null})}));
  drawDx();

  /* ---------- cohort explorer ---------- */
  const csv=$('#chdCoSvg'),ccap=$('#chdCoCap');let cv='vent',cA=1,cStop=null;
  function drawCo(){const N=vb(csv,'720 300','400 400'),V=CHD_CO[cv];let s=tx(14,22,V.h,'t-lbl');
    if(cv==='vent'||cv==='sub'){
      const L=N?{lx:14,bx:14,bw:372,y0:56,rh:64,lab:'above'}:{lx:14,bx:250,bw:440,y0:60,rh:60,lab:'left'};
      const X=v=>L.bx+L.bw*v/100;
      s+=`<line x1="${f1(L.bx)}" x2="${f1(L.bx)}" y1="${f1(L.y0-12)}" y2="${f1(L.y0+3*L.rh+(N?24:12))}" class="axis"/>`;
      V.rows.forEach((r,i)=>{const y=L.y0+i*L.rh,by=L.lab==='left'?y-6:y+8;
        s+=tx(L.lx,L.lab==='left'?y+6:y,r.l,'t-sm',INK);
        s+=`<rect x="${f1(L.bx)}" y="${f1(by)}" width="${f1(L.bw)}" height="16" rx="4" style="fill:var(--panel-2)"/>`;
        if(cv==='vent'){s+=`<rect x="${f1(L.bx)}" y="${f1(by)}" width="${f1(L.bw*r.v/100*cA)}" height="16" rx="4" style="fill:${i===3?'var(--accent)':'var(--care)'}"/>`+tx(X(r.v*cA)+6,by+12,r.s,'t-sm',INK)}
        else{let x0=L.bx;const parts=[];r.seg.forEach(sg=>{const w=L.bw*sg.v/100*cA;s+=`<rect x="${f1(x0)}" y="${f1(by)}" width="${f1(w)}" height="16" style="fill:${sg.k==='dem'?'var(--care)':sg.k==='ax'?'var(--accent)':'var(--rx)'}"/>`;x0+=w;parts.push(sg.s)});
          s+=tx(L.bx,by+30,parts.join(' · '),'t-xs',INK)}});
      if(cv==='vent'){[0,25,50,75,100].forEach(v=>{s+=tx(X(v),L.y0+3*L.rh+(N?38:28),v+'%','t-xs t-mid')})}
    }else{
      const L=N?{x:44,y:70,w:320,h:250,ly:44}:{x:250,y:60,w:420,h:180,ly:40};
      const X=i=>L.x+L.w*i/2,Y=v=>L.y+L.h-L.h*v/100;
      s+=`<rect x="${L.x}" y="${L.y}" width="${L.w}" height="${L.h}" style="fill:var(--field)"/>`;
      [0,50,100].forEach(v=>{s+=`<line x1="${L.x}" x2="${L.x+L.w}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" class="grid"/>`+tx(L.x-6,Y(v)+3,v+'%','t-xs t-end')});
      V.x.forEach((l,i)=>{s+=tx(X(i),L.y+L.h+16,l,'t-xs t-mid'+(i===0?'':'' ),INK)});
      V.ser.forEach((sr,j)=>{const P=sr.v.map((v,i)=>[X(i),Y(v*cA)]);s+=`<path d="${ptsD(P)}" style="fill:none;stroke:${sr.c};stroke-width:3;stroke-linejoin:round"/>`;
        P.forEach((p,i)=>{s+=sr.m==='c'?`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="5" style="fill:${sr.c}"/>`:`<rect x="${f1(p[0]-4.5)}" y="${f1(p[1]-4.5)}" width="9" height="9" style="fill:${sr.c}"/>`;
          s+=tx(p[0]+(i===2?-8:8),p[1]-8,(sr.v[i]*cA).toFixed(1).replace('.0',''),'t-xs'+(i===2?' t-end':''),INK)});
        const lx=N?14:14,ly=N?L.ly+(j?0:-14)+L.y+L.h+20:L.y+20+j*36;
        if(N){const yy=L.y+L.h+40+j*18;s+=(sr.m==='c'?`<circle cx="${lx+5}" cy="${yy-4}" r="5" style="fill:${sr.c}"/>`:`<rect x="${lx}" y="${yy-8.5}" width="9" height="9" style="fill:${sr.c}"/>`)+tx(lx+16,yy,sr.l,'t-xs',INK)}
        else{s+=(sr.m==='c'?`<circle cx="${lx+5}" cy="${ly-4}" r="5" style="fill:${sr.c}"/>`:`<rect x="${lx}" y="${ly-8.5}" width="9" height="9" style="fill:${sr.c}"/>`)+tx(lx+16,ly,sr.l.split(':')[0],'t-xs',INK)+(sr.l.includes(':')?tx(lx+16,ly+13,sr.l.split(':')[1].trim(),'t-xs'):'')}});
    }
    csv.innerHTML=s;ccap.innerHTML=V.cap;
    $$('[data-chco]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.chco===cv))}
  $$('[data-chco]').forEach(b=>b.addEventListener('click',()=>{cv=b.dataset.chco;if(cStop)cStop();cStop=animate(800,q=>{cA=ease(q);drawCo()},()=>{cStop=null})}));
  drawCo();

  /* ---------- pregnancy and the weeks after birth ---------- */
  const psv=$('#chdPgSvg'),prg=$('#chdPgT');let setPg=()=>{};
  function drawPg(t){const N=vb(psv,'720 400','400 620'),p=phaseOf(CHD_PG,t);
    const L=N?{tx:20,tw:360,ty:64,fx:30,fw:350,fy:150,rh:140,lab:'above'}:{tx:30,tw:660,ty:64,fx:300,fw:390,fy:140,rh:66,lab:'left'};
    const TX=u=>L.tx+L.tw*u;let s='';
    /* the timeline: pregnancy 0..0.55, birth at 0.55, 30 days at 0.75, 90 days at 1 */
    const segs=[[0,.183],[.183,.367],[.367,.55]];
    segs.forEach((g,i)=>{s+=`<rect x="${f1(TX(g[0])+1)}" y="${L.ty-10}" width="${f1(TX(g[1])-TX(g[0])-2)}" height="20" rx="5" style="fill:var(--care-soft);stroke:var(--care);stroke-width:1"/>`+tx((TX(g[0])+TX(g[1]))/2,L.ty+4,(N?CHD_TX.pgTriN:CHD_TX.pgTri)[i],'t-xs t-mid',INK)});
    s+=`<rect x="${f1(TX(.55)+1)}" y="${L.ty-10}" width="${f1(TX(.75)-TX(.55)-2)}" height="20" rx="5" style="fill:var(--accent-soft);stroke:var(--accent);stroke-width:1"/><rect x="${f1(TX(.75)+1)}" y="${L.ty-10}" width="${f1(TX(1)-TX(.75)-2)}" height="20" rx="5" style="fill:var(--panel-2);stroke:var(--line);stroke-width:1"/>`;
    s+=tx((TX(.55)+TX(.75))/2,L.ty+4,CHD_TX.pg30,'t-xs t-mid',INK)+tx((TX(.75)+TX(1))/2,L.ty+4,CHD_TX.pg90,'t-xs t-mid',INK);
    s+=tx(TX(0),L.ty-18,CHD_TX.pgPreg,'t-xs','letter-spacing:.06em');
    /* birth: a swaddled baby */
    const bx=TX(.55);s+=`<line x1="${f1(bx)}" x2="${f1(bx)}" y1="${L.ty-22}" y2="${L.ty+14}" style="stroke:var(--ink);stroke-width:1.6"/><circle cx="${f1(bx)}" cy="${L.ty-30}" r="5" style="fill:var(--skin);stroke:var(--ink);stroke-width:1"/><path d="M${f1(bx-6)} ${L.ty-27}Q${f1(bx)} ${L.ty-16} ${f1(bx+6)} ${L.ty-27}" style="fill:var(--care-soft);stroke:var(--ink);stroke-width:1"/>`+tx(bx+10,L.ty-28,CHD_TX.pgBirth,'t-xs',INK);
    /* the moving marker */
    const mx=TX(t);s+=`<path d="M${f1(mx)} ${L.ty+14}l-6 10h12z" style="fill:var(--ink)"/>`+tx(clamp(mx,L.tx+30,L.tx+L.tw-30),L.ty+38,CHD_TX.pgNow,'t-xs t-mid',INK);
    /* forest plot */
    const lo=Math.log(.25),hi=Math.log(10),FX=v=>L.fx+L.fw*(Math.log(v)-lo)/(hi-lo);
    const act=t<.55?[0]:t<.75?[1,2]:[2];
    const fe=L.fy+L.rh*3+(N?-30:-14);
    CHD_TX.pgRows.forEach((r,i)=>{const y=L.fy+i*L.rh,on=act.includes(i),py=N?y+40:y+8;
      if(on)s+=`<rect x="${N?8:12}" y="${f1(N?y-16:y-18)}" width="${N?384:696}" height="${N?L.rh-22:L.rh-6}" rx="8" style="fill:var(--care-soft)"/>`;
      s+=tx(N?16:24,N?y:y,r,'t-lbl',on?'':'opacity:.75')+tx(N?16:24,N?y+15:y+16,CHD_TX.pgVals[i],'t-xs',on?INK:'');
      s+=`<line x1="${f1(FX(1))}" x2="${f1(FX(1))}" y1="${f1(py-16)}" y2="${f1(py+24)}" style="stroke:var(--muted);stroke-width:1.2;stroke-dasharray:4 3"/>`;
      CHD_PGR[i].forEach((e,j)=>{const yy=py+(j?12:-4);const a=on?1:.55;
        s+=`<g style="opacity:${a}"><line x1="${f1(FX(e[1]))}" x2="${f1(FX(e[2]))}" y1="${f1(yy)}" y2="${f1(yy)}" style="stroke:var(--ink);stroke-width:1.6"/>`;
        s+=j?`<rect x="${f1(FX(e[0])-5)}" y="${f1(yy-5)}" width="10" height="10" style="fill:var(--accent)"/>`:`<circle cx="${f1(FX(e[0]))}" cy="${f1(yy)}" r="5.5" style="fill:var(--care)"/>`;s+='</g>'})});
    const ay=fe+8;s+=`<line x1="${L.fx}" x2="${L.fx+L.fw}" y1="${f1(ay)}" y2="${f1(ay)}" class="axis"/>`;
    [.25,.5,1,2,4,8].forEach(v=>{s+=`<line x1="${f1(FX(v))}" x2="${f1(FX(v))}" y1="${f1(ay-3)}" y2="${f1(ay+3)}" class="axis"/>`+tx(FX(v),ay+15,v,'t-xs t-mid')});
    s+=tx(FX(1),ay+29,CHD_TX.pgRef,'t-xs t-mid',INK)+tx(L.fx,ay+29,'← '+CHD_TX.pgLo,'t-xs')+tx(L.fx+L.fw,ay+29,CHD_TX.pgHi+' →','t-xs t-end');
    s+=tx(L.fx+L.fw,ay+43,CHD_TX.pgAxis,'t-xs t-end');
    s+=tx(N?16:24,ay+43,CHD_TX.pgKey[0],'t-xs',INK)+tx(N?16:24,ay+57,CHD_TX.pgKey[1],'t-xs',INK);
    psv.innerHTML=s;setPg(p);$('#chdPgNote').innerHTML=noteHTML(CHD_PG[p]);
  }
  const pstop=playWire(prg,$('#chdPgPlay'),drawPg,12000,'Replay','children');
  setPg=stepWire($('#chdPgSteps'),CHD_PG,prg,drawPg,pstop);
  drawPg(+prg.value);
  const prev=redraws.children;redraws.children=()=>{prev&&prev();drawDx();drawCo()};
};
/* =============== 5.3 Nursing care =============== */
/* Two players and a reveal set: one round of bedside checks around a person in bed (main player: eight stations,
   each with its own small animated monitor), a single-breath-count explorer that shows which published threshold a
   count crosses, and three common misunderstandings. Monitor drawings are schematic; numbers come from passes H and F. */

const NSG_TX={
  check:'CHECK',of:'of 8',schem:'schematic',stronger:'stronger',perCheck:'one dot per check',
  count:'count on one breath',vc:'VC, ml/kg',vc20:'20',vc15:'15',
  mouth:'mouth',wind:'windpipe',food:'food pipe',safe:'swallowed safely',silent:'into the windpipe, no cough',
  ecg:'ECG',suction:'suction',pause:'pause',bp:'systolic BP over one day',range:'daily range above 85 mmHg',
  bladder:'bladder filling',retention:'retention?',bowel:'bowel',moving:'contents moving',ileus:'ileus: gut stops',
  heel:'heel: pressure area',calf:'calf vein: clot (DVT)',turn:'change position',
  say:'I am going to turn you now.',hear:'can hear and see',dream:'vivid dreams, hallucinations',pain:'pain',
  stages:['ICU','ward','rehab','home'],watch:'still watched: rhythm, BP, mucus plugs',
  sbcSay:'on one breath',sbcNow:'reached',sbcAxis:'single breath count',
  sbcSrc:{k:'Kalita 2020 · 94 people · early evidence',g:'ten-steps guideline',e:'EAN/PNS guideline'}
};

/* the eight stations: (a,b) is the anchor on the body in bodyFront's local units; side l or r */
const NSG_STEPS=[
 {from:0,at:.05,k:'Check 1 · strength',t:'Strength and disability',sub:'is weakness still spreading?',a:[30,26],side:'r',dy:0,
  facts:[{l:'Need ventilation in first week of admission',v:22,s:'up to 22%'},{l:'Also checked: swallow, cough, ECG, BP, bladder, bowel'}],
  txt:'Monitoring in the ten-steps guideline covers muscle strength and disability, swallowing and coughing, ECG, heart rate, blood pressure, and bowel and bladder function; how often depends on how fast the person is worsening, autonomic involvement, the phase of the illness and the setting <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>. Up to 22% of people with GBS need ventilation within the first week of admission <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.',
  pt:'Nurses check strength, breathing, swallowing, heart, blood pressure, bladder and bowels again and again, because GBS can change fast <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.',
  hook:'How often to check depends on the rate of deterioration, autonomic involvement, the disease phase and the setting <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.'},
 {from:.125,at:.17,k:'Check 2 · breathing',t:'Breathing',sub:'measured, because breathlessness can come late',a:[6,-14],side:'r',dy:0,
  facts:[{l:'20/30/40: VC < 20 ml/kg, MIP < 30, MEP < 40 cmH2O'},{l:'Imminent: VC below 15 to 20 ml/kg or below 1 l'},{l:'Imminent: cannot count to 15 on one breath'}],
  txt:'Not all people heading for respiratory insufficiency feel breathless, so respiratory function is measured routinely <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>. Signs of imminent insufficiency: breathlessness at rest or while talking, inability to count to 15 in one breath, accessory muscle use, a rising breathing or heart rate, vital capacity below 15 to 20 ml/kg or below 1 l, or abnormal blood gases or oximetry <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>. The 20/30/40 rule flags risk at VC below 20 ml/kg, MIP below 30 cmH2O, MEP below 40 cmH2O, or a fall of more than 30% in any of these <sup class="c" data-ref="Lawn2001" title="Source 263"><a href="/guillain-barre-syndrome/sources/#src-Lawn2001">263</a></sup>.',
  pt:'Nurses check breathing often, sometimes by asking you to count out loud on one breath. Getting breathless when talking is a warning sign <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.',
  hook:'Inability to count to 15 in one breath signals imminent respiratory insufficiency <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>. 20/30/40: VC, MIP, MEP <sup class="c" data-ref="Lawn2001" title="Source 263"><a href="/guillain-barre-syndrome/sources/#src-Lawn2001">263</a></sup>.'},
 {from:.25,at:.29,k:'Check 3 · swallow and cough',t:'Swallow and cough',sub:'food or drink can go the wrong way silently',a:[0,-34],side:'l',dy:0,
  facts:[{l:'Swallowing impaired early after ICU admission',v:80,s:'over 80%'},{l:'Needed a tracheostomy (88 people)',v:39.7,s:'39.7%'},{l:'Of those, decannulated right after weaning',v:40,s:'40%'}],
  txt:'Bulbar and facial palsy bring choking, nutrition problems and hospital-acquired pneumonia <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>. Swallowing was impaired in over 80% early after ICU admission, and only about half of those with piecemeal swallowing had clinically apparent problems <sup class="c" data-ref="Ogna2017" title="Source 337"><a href="/guillain-barre-syndrome/sources/#src-Ogna2017">337</a></sup>. In 88 people, 39.7% needed a tracheostomy; 40% of them were decannulated right after weaning, and dysphagia, especially lost sensation in the larynx and pharynx, was the main reason for staying cannulated <sup class="c" data-ref="Schroder2019" title="Source 401"><a href="/guillain-barre-syndrome/sources/#src-Schroder2019">401</a></sup>.',
  pt:'Weak throat muscles can let food or drink go the wrong way without a cough, so swallowing is checked carefully <sup class="c" data-ref="Ogna2017" title="Source 337"><a href="/guillain-barre-syndrome/sources/#src-Ogna2017">337</a></sup>.',
  hook:'Respiratory muscle weakness drives intubation; neurogenic dysphagia drives prolonged cannulation <sup class="c" data-ref="Schroder2019" title="Source 401"><a href="/guillain-barre-syndrome/sources/#src-Schroder2019">401</a></sup>.'},
 {from:.375,at:.42,k:'Check 4 · heart and blood pressure',t:'Heart and blood pressure',sub:'autonomic nerves can swing both',a:[-8,-8],side:'l',dy:6,
  facts:[{l:'Serious arrhythmia, ventilated (11 of 33)',v:33.3,s:'11 of 33'},{l:'Warning sign: daily systolic range above 85 mmHg'}],
  txt:'In 100 people, 11 of 33 who were ventilated had serious arrhythmias, often preceded by wide pulse or blood pressure swings and transient asystole after tracheal suction <sup class="c" data-ref="Winer1988" title="Source 511"><a href="/guillain-barre-syndrome/sources/#src-Winer1988">511</a></sup>. Every bradycardia episode but one was preceded by a daily systolic range above 85 mmHg <sup class="c" data-ref="Pfeiffer1999" title="Source 358"><a href="/guillain-barre-syndrome/sources/#src-Pfeiffer1999">358</a></sup>. Minor stimulation such as suction, mouth care or bathing can provoke severe bradycardia, and some teams keep atropine ready (an expert review, quoted as published, not an instruction) <sup class="c" data-ref="Weiss2025" title="Source 504"><a href="/guillain-barre-syndrome/sources/#src-Weiss2025">504</a></sup>.',
  pt:'GBS can affect the nerves that control heart rate and blood pressure, so these are watched closely, even during simple care like suction <sup class="c" data-ref="Leonhard2019,Winer1988" title="Source 266,511"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266,511</a></sup>.',
  hook:'Suctioning can trigger asystole in severe dysautonomia <sup class="c" data-ref="Winer1988,Weiss2025" title="Source 504,511"><a href="/guillain-barre-syndrome/sources/#src-Winer1988">504,511</a></sup>. A daily systolic range above 85 mmHg preceded bradycardia <sup class="c" data-ref="Pfeiffer1999" title="Source 358"><a href="/guillain-barre-syndrome/sources/#src-Pfeiffer1999">358</a></sup>.'},
 {from:.5,at:.54,k:'Check 5 · bladder and bowel',t:'Bladder and bowel',sub:'retention and a gut that stops moving',a:[0,18],side:'l',dy:6,
  facts:[{l:'Urinary dysfunction (65 people)',v:27.7,s:'27.7%'},{l:'Urinary retention',v:9.2,s:'9.2%'},{l:'Adynamic ileus, severe GBS (17 of 114)',v:15,s:'15%'}],
  txt:'Urinary dysfunction occurred in 27.7% of 65 consecutive people, including retention in 9.2%; it was commoner in AIDP (39%) than AMAN (19%) <sup class="c" data-ref="Sakakibara2009" title="Source 398"><a href="/guillain-barre-syndrome/sources/#src-Sakakibara2009">398</a></sup>. Adynamic ileus occurred in 15% of 114 people with severe GBS; it coincided with cardiovascular dysautonomia in only 5, while ventilation, immobility, earlier abdominal surgery or rising opioid doses were implicated in others, and medical management worked in all <sup class="c" data-ref="Burns2001" title="Source 62"><a href="/guillain-barre-syndrome/sources/#src-Burns2001">62</a></sup>. The guideline lists urinary retention as a complication to watch for in everyone, and constipation with immobility <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.',
  pt:'GBS can make it hard to pass urine or open the bowels, so both are checked <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.',
  hook:'Bladder or bowel dysfunction at onset, or persisting through the course, is a red flag for another diagnosis <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>; urinary retention is a complication to watch for in everyone <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.'},
 {from:.625,at:.67,k:'Check 6 · skin, position and clots',t:'Skin, position and clots',sub:'the hazards of lying still',a:[-10,70],side:'l',dy:0,
  facts:[{l:'Clots found clinically, UK (73 people)',v:7,s:'7%'},{l:'DVT on ultrasound screening, ICU (65)',v:52,s:'52%'},{l:'DVT in US Medicare claims (16,280)',v:9,s:'9%'}],
  txt:'Immobility brings pressure ulcers and compression neuropathy, and prolonged severe weakness brings contractures and ossification; the standard prevention used for any bed-bound person is recommended <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>. A 2005 consensus group recommended heparin and graduated pressure stockings for bed-bound adults in the acute phase, from observational data and expert opinion, not trials <sup class="c" data-ref="Hughes2005" title="Source 197"><a href="/guillain-barre-syndrome/sources/#src-Hughes2005">197</a></sup>. Clot rates depend on how they are looked for: 7% clinically <sup class="c" data-ref="Gaber2002" title="Source 146"><a href="/guillain-barre-syndrome/sources/#src-Gaber2002">146</a></sup>, 52% with ultrasound screening in an ICU despite heparin <sup class="c" data-ref="Ryabinkina2016" title="Source 394"><a href="/guillain-barre-syndrome/sources/#src-Ryabinkina2016">394</a></sup>, and 9% in US claims, calculated as 100 minus the 91% who avoided DVT <sup class="c" data-ref="Wright2026" title="Source 514"><a href="/guillain-barre-syndrome/sources/#src-Wright2026">514</a></sup>.',
  pt:'Lying still for a long time can harm the skin and cause blood clots in the legs, so position, skin and legs are checked <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.',
  hook:'VTE rates vary with the method: 7% clinical, 52% duplex-screened, 9% claims <sup class="c" data-ref="Gaber2002,Ryabinkina2016,Wright2026" title="Source 146,394,514"><a href="/guillain-barre-syndrome/sources/#src-Gaber2002">146,394,514</a></sup>.'},
 {from:.75,at:.79,k:'Check 7 · pain, mind and words',t:'Pain, mind and words',sub:'paralysed is not the same as unaware',a:[0,-44],side:'r',dy:-6,
  facts:[{l:'Pain in the acute phase (156 people)',v:66,s:'66%'},{l:'Mental status changes (16% of ICU controls)',v:31,s:'31%'},{l:'Anxiety, severe ICU group (49 people)',v:82,s:'82%'}],
  txt:'People with GBS, even with complete paralysis, usually have intact consciousness, vision and hearing, so what is said at the bedside matters, and procedures should be explained <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>. Pain was present in the acute phase in 66% <sup class="c" data-ref="Ruts2010Pain" title="Source 392"><a href="/guillain-barre-syndrome/sources/#src-Ruts2010Pain">392</a></sup>. Mental status changes occurred in 31% against 16% of ICU controls, often starting as the eyes closed, a median 9 days after onset, and lasting a median 8 days <sup class="c" data-ref="Cochen2005" title="Source 79"><a href="/guillain-barre-syndrome/sources/#src-Cochen2005">79</a></sup>. Anxiety (82%) and depressive episodes (67%) were common in a severe neuro-ICU group <sup class="c" data-ref="Weiss2002" title="Source 503"><a href="/guillain-barre-syndrome/sources/#src-Weiss2002">503</a></sup>.',
  pt:'Even someone who cannot move or speak can usually hear and understand everything. Talk to them, and explain what you are doing <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.',
  hook:'A paralysed person with GBS is usually fully conscious and can hear: speak accordingly at the bedside <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.'},
 {from:.875,at:.92,k:'Check 8 · after intensive care',t:'After intensive care',sub:'the risk does not end at the worst point',a:[9,94],side:'r',dy:-4,
  facts:[{l:'Deaths that occur in the recovery phase',v:66.7,s:'up to two-thirds'},{l:'Readmitted within 90 days (2,587 adults)',v:14.1,s:'14.1%'},{l:'Of readmissions, within 15 days',v:46.7,s:'46.7%'}],
  txt:'Up to two-thirds of deaths occur in the recovery phase, mostly from cardiovascular and respiratory dysfunction, so arrhythmias, blood pressure shifts and mucus-plug distress are watched for, especially soon after ICU discharge <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>. Among 2,587 US adults, 14.1% were readmitted within 90 days, 46.7% of those within 15 days, and discharge to a facility rather than home raised the odds (OR 1.70) <sup class="c" data-ref="Voth2026" title="Source 489"><a href="/guillain-barre-syndrome/sources/#src-Voth2026">489</a></sup>.',
  pt:'The dangerous time does not always end with the worst weakness, so checks continue during recovery <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.',
  hook:'Up to two-thirds of GBS deaths happen in the recovery phase, often after ICU discharge <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.'}
];

/* single breath count thresholds, as published; dir: le, lt, ge, or null for a marker without a direction */
const NSG_SBC=[
 {n:5,dir:'le',l:'5 or less: ventilation predicted (sens 90.6%, spec 95.2%)',ln:'5: ventilation predicted, sens 90.6%, spec 95.2%',s:'k'},
 {n:7,dir:'ge',l:'7 or more: blood gases stayed acceptable in all',ln:'7 or more: blood gases stayed acceptable',s:'k'},
 {n:13,dir:null,l:'13: admission cut-off, NPV 88.5% for ruling out ventilation',ln:'13: admission cut-off, NPV 88.5%',s:'k'},
 {n:15,dir:'lt',l:'Under 15: a sign of imminent respiratory insufficiency',ln:'Under 15: imminent insufficiency',s:'g'},
 {n:19,dir:'le',l:'19 or less: predicts the need for ventilation',ln:'19 or less: predicts ventilation',s:'g'},
 {n:20,dir:'lt',l:'Under 20: a useful bedside tool for ICU transfer',ln:'Under 20: a tool for ICU transfer',s:'e'}
];
const NSG_SBCT=[4,10,14,18,25];
const NSG_SBCCAP={
  4:'<b>Breath runs out at 4.</b> Every published line is crossed: below Kalita\'s 5 and 7 <sup class="c" data-ref="Kalita2020SBC" title="Source 216"><a href="/guillain-barre-syndrome/sources/#src-Kalita2020SBC">216</a></sup>, below the guideline\'s 15 and 19 <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup> and below EAN/PNS\'s 20 <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>.',
  10:'<b>Breath runs out at 10.</b> Above Kalita\'s blood-gas point of 7 <sup class="c" data-ref="Kalita2020SBC" title="Source 216"><a href="/guillain-barre-syndrome/sources/#src-Kalita2020SBC">216</a></sup>, but under 15, which the ten-steps guideline lists as a sign of imminent insufficiency <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.',
  14:'<b>Breath runs out at 14.</b> Just under 15, the ten-steps sign of imminent insufficiency, and under 19, which predicts ventilation <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.',
  18:'<b>Breath runs out at 18.</b> Past 15, but still 19 or less, which the ten-steps guideline says predicts the need for ventilation <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>, and under the EAN/PNS line of 20 for ICU transfer <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>.',
  25:'<b>Breath lasts to 25.</b> Past every published line. One count is one moment: the studies used serial counts, and thresholds from different studies are not interchangeable <sup class="c" data-ref="Kalita2020SBC,Leonhard2019" title="Source 216,266"><a href="/guillain-barre-syndrome/sources/#src-Kalita2020SBC">216,266</a></sup>.'
};

inits.nursing=()=>{
  const tx=(x,y,s,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`;
  const INK='fill:var(--ink);font-weight:700';
  const W=Math.PI*2;
  function bar(x,y,w,f,lbl,val,col='var(--care)'){
    if(f==null)return `<circle cx="${f1(x+3)}" cy="${f1(y-3.5)}" r="3" style="fill:var(--care)"/>`+tx(x+11,y,lbl,'t-xs',INK);
    return tx(x,y,lbl,'t-xs',INK)+tx(x+w,y,val,'t-xs t-end',INK)+`<rect x="${f1(x)}" y="${f1(y+5)}" width="${f1(w)}" height="9" rx="4.5" style="fill:var(--panel)"/>`+(f>0?`<rect x="${f1(x)}" y="${f1(y+5)}" width="${f1(Math.max(4,w*clamp(f)))}" height="9" rx="4.5" style="fill:${col}"/>`:'')}

  /* ---- the eight monitor drawings, each inside the box (x,y,w,h), animated by u in 0..1 ---- */
  const VIS=[
    /* 1 strength: dots per check (schematic) */
    (x,y,w,h,u)=>{const V=[.88,.74,.6,.5,.47,.49],n=Math.min(6,1+Math.floor(u*6.5)),X=i=>x+24+i*(w-48)/5,Y=v=>y+h-20-(h-40)*v;
      let s=`<line x1="${f1(x+10)}" x2="${f1(x+w)}" y1="${f1(y+h-14)}" y2="${f1(y+h-14)}" class="axis"/><line x1="${f1(x+10)}" x2="${f1(x+10)}" y1="${f1(y+6)}" y2="${f1(y+h-14)}" class="axis"/>`;
      s+=tx(x+16,y+12,NSG_TX.stronger+' ↑','t-xs')+tx(x+w,y+h-1,NSG_TX.perCheck+' ('+NSG_TX.schem+')','t-xs t-end');
      const P=V.slice(0,n).map((v,i)=>[X(i),Y(v)]);if(P.length>1)s+=`<path d="${ptsD(P)}" style="fill:none;stroke:var(--care);stroke-width:2.4"/>`;
      P.forEach((p,i)=>{s+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="${i===n-1?7:5}" style="fill:${i===n-1?'var(--accent)':'var(--care)'};stroke:var(--panel);stroke-width:2"/>`});
      return s},
    /* 2 breathing: lungs, a count, a falling VC bar */
    (x,y,w,h,u)=>{const br=.5+.5*Math.sin(u*W*3),Lg=lungs(x+4,y+18,.92,{fill:br,weak:u*.6});let s=Lg.svg;
      const cnt=Math.floor(u*24)%13+1;s+=tx(x+150,y+40,NSG_TX.count,'t-xs')+tx(x+150,y+82,cnt,'t-big','font-size:36px;fill:var(--care)');
      const bx=x+w-46,by=y+8,bh=h-30,vc=lerp(45,22,ease(u)),Y=v=>by+bh-bh*v/60;
      s+=`<rect x="${f1(bx)}" y="${f1(by)}" width="22" height="${f1(bh)}" rx="5" style="fill:var(--panel)"/><rect x="${f1(bx)}" y="${f1(Y(vc))}" width="22" height="${f1(by+bh-Y(vc))}" rx="5" style="fill:var(--care)"/>`;
      [ [20,NSG_TX.vc20],[15,NSG_TX.vc15] ].forEach(([v,l])=>{s+=`<line x1="${f1(bx-6)}" x2="${f1(bx+28)}" y1="${f1(Y(v))}" y2="${f1(Y(v))}" style="stroke:var(--bad);stroke-width:1.6;stroke-dasharray:3 2"/>`+tx(bx-9,Y(v)+3,l,'t-xs t-end',INK)});
      s+=tx(bx+11,by+bh+14,NSG_TX.vc,'t-xs t-mid')+tx(x+150,y+h-6,NSG_TX.schem,'t-xs');
      return s},
    /* 3 swallow: a droplet goes down the food pipe, then silently into the windpipe */
    (x,y,w,h,u)=>{const mx=x+60,my=y+20,wx=x+56,fx=x+120,bot=y+h-22;let s='';
      s+=`<path d="M${f1(mx-34)} ${f1(my)}Q${f1(mx)} ${f1(my-14)} ${f1(mx+40)} ${f1(my+6)}" style="fill:none;stroke:var(--ink);stroke-width:2"/>`+tx(mx-34,my-8,NSG_TX.mouth,'t-xs');
      s+=`<path d="M${f1(wx-10)} ${f1(my+24)}V${f1(bot)}M${f1(wx+10)} ${f1(my+24)}V${f1(bot)}" style="stroke:var(--device);stroke-width:2"/>`;
      for(let r=my+32;r<bot;r+=12)s+=`<line x1="${f1(wx-10)}" x2="${f1(wx+10)}" y1="${f1(r)}" y2="${f1(r)}" style="stroke:var(--device);stroke-width:1;opacity:.6"/>`;
      s+=`<path d="M${f1(fx-9)} ${f1(my+24)}V${f1(bot)}M${f1(fx+9)} ${f1(my+24)}V${f1(bot)}" style="stroke:var(--gut);stroke-width:2.4"/>`;
      s+=`<path d="M${f1(mx+20)} ${f1(my+4)}Q${f1(x+90)} ${f1(my+8)} ${f1(fx)} ${f1(my+24)}M${f1(mx+12)} ${f1(my+4)}Q${f1(wx)} ${f1(my+10)} ${f1(wx)} ${f1(my+24)}" style="fill:none;stroke:var(--muted);stroke-width:1.2;stroke-dasharray:3 3"/>`;
      s+=tx(wx,bot+14,NSG_TX.wind,'t-xs t-mid',INK)+tx(fx,bot+14,NSG_TX.food,'t-xs t-mid',INK);
      const two=u>=.5,q=two?ramp(u,.55,.95):ramp(u,.05,.45),tx0=two?wx:fx,dyY=lerp(my+10,bot-6,q),dxX=lerp(mx+16,tx0,Math.min(1,q*3));
      s+=`<path d="M${f1(dxX)} ${f1(dyY-7)}Q${f1(dxX+6)} ${f1(dyY+2)} ${f1(dxX)} ${f1(dyY+5)}Q${f1(dxX-6)} ${f1(dyY+2)} ${f1(dxX)} ${f1(dyY-7)}Z" style="fill:var(--ivig)"/>`;
      s+=kitLabel(x+150,y+60,two?NSG_TX.silent:NSG_TX.safe,{});
      if(two)s+=`<path d="M${f1(x+146)} ${f1(y+56)}L${f1(wx+14)} ${f1(dyY)}" style="stroke:var(--bad);stroke-width:1.4;stroke-dasharray:3 2"/>`;
      return s},
    /* 4 heart: a scrolling ECG with a pause after suction, and a swinging systolic trace */
    (x,y,w,h,u)=>{let s=tx(x,y+10,NSG_TX.ecg,'t-xs',INK);const ey=y+44,per=46,off=u*per*6,pauseX=x+w*.62;let d='';
      for(let px=0;px<=w-30;px+=2){const xx=x+30+px,ph=((px+off)%per)/per;let v=0;
        const inPause=Math.abs(xx-pauseX)<34&&u>.3;if(!inPause){if(ph>.4&&ph<.44)v=-6;else if(ph>=.44&&ph<.48)v=26;else if(ph>=.48&&ph<.52)v=-10;else if(ph>.7&&ph<.8)v=5*Math.sin((ph-.7)/.1*Math.PI)}
        d+=(px?'L':'M')+f1(xx)+' '+f1(ey-v)}
      s+=`<path d="${d}" style="fill:none;stroke:var(--rx);stroke-width:1.8;stroke-linejoin:round"/>`;
      if(u>.3)s+=kitLabel(pauseX,ey+24,NSG_TX.suction+' → '+NSG_TX.pause,{a:'m'});
      const by=y+86,bh=h-104;s+=tx(x,by-6,NSG_TX.bp,'t-xs',INK);
      const f=v=>.5+.42*Math.sin(v*W*1.6+.6)*Math.cos(v*W*.4);let dd='';const up=Math.max(.02,u);
      for(let i=0;i<=80;i++){const v=i/80*up;dd+=(i?'L':'M')+f1(x+30+(w-60)*v)+' '+f1(by+bh-bh*f(v))}
      s+=`<rect x="${f1(x+30)}" y="${f1(by)}" width="${f1(w-60)}" height="${f1(bh)}" style="fill:var(--panel)"/><path d="${dd}" style="fill:none;stroke:var(--blood);stroke-width:2"/>`;
      const hiY=by+bh*.06,loY=by+bh*.94,rx=x+w-22;s+=`<g style="opacity:${f1(ramp(u,.5,.7))}"><path d="M${f1(rx)} ${f1(hiY)}V${f1(loY)}M${f1(rx-5)} ${f1(hiY)}H${f1(rx+5)}M${f1(rx-5)} ${f1(loY)}H${f1(rx+5)}" style="stroke:var(--ink);stroke-width:1.6"/>`+tx(x+w,by-6,NSG_TX.range,'t-xs t-end',INK)+'</g>';
      return s},
    /* 5 bladder and bowel */
    (x,y,w,h,u)=>{const cx=x+70,cy=y+h/2,r=lerp(24,46,ease(ramp(u,0,.6)));let s='';
      s+=`<path d="${blob(cx,cy,r,5,{n:14,rough:.08})}" style="fill:var(--csf);stroke:var(--ink);stroke-width:1.4"/><path d="M${f1(cx-4)} ${f1(cy+r-2)}V${f1(cy+r+16)}M${f1(cx+4)} ${f1(cy+r-2)}V${f1(cy+r+16)}" style="stroke:var(--ink);stroke-width:1.4"/>`;
      s+=tx(cx,y+12,NSG_TX.bladder,'t-xs t-mid',INK)+(u>.5?kitLabel(cx,cy+4,NSG_TX.retention,{a:'m'}):'');
      const gx=x+170,gw=w-190,gy=y+40;const p=`M${f1(gx)} ${f1(gy)}H${f1(gx+gw)}Q${f1(gx+gw+14)} ${f1(gy+14)} ${f1(gx+gw)} ${f1(gy+28)}H${f1(gx)}Q${f1(gx-14)} ${f1(gy+42)} ${f1(gx)} ${f1(gy+56)}H${f1(gx+gw)}Q${f1(gx+gw+14)} ${f1(gy+70)} ${f1(gx+gw)} ${f1(gy+84)}H${f1(gx)}`;
      s+=`<path d="${p}" style="fill:none;stroke:var(--gut);stroke-width:12;stroke-linecap:round;opacity:.8"/>`;
      const mv=u<.5?u*2:1;for(let i=0;i<5;i++){const q=(i/5+mv*.6)%1,row=Math.floor(q*4),fr=(q*4)%1,xx=row%2?gx+gw-fr*gw:gx+fr*gw;s+=`<circle cx="${f1(xx)}" cy="${f1(gy+row*28)}" r="3.5" style="fill:var(--ink);opacity:.6"/>`}
      s+=tx(gx+gw/2,y+12,NSG_TX.bowel,'t-xs t-mid',INK)+kitLabel(gx+gw/2,gy+124,u<.5?NSG_TX.moving:NSG_TX.ileus,{a:'m'});
      return s},
    /* 6 skin and clots: a leg with a pressure heel and a growing clot, and a turning arrow */
    (x,y,w,h,u)=>{const lx=x+10,ly=y+70,lw=w*.66;let s='';
      const leg=`M${f1(lx)} ${f1(ly-22)}C${f1(lx+lw*.35)} ${f1(ly-26)} ${f1(lx+lw*.5)} ${f1(ly-20)} ${f1(lx+lw*.62)} ${f1(ly-24)}C${f1(lx+lw*.78)} ${f1(ly-28)} ${f1(lx+lw*.86)} ${f1(ly-16)} ${f1(lx+lw*.9)} ${f1(ly-14)}L${f1(lx+lw)} ${f1(ly-40)}L${f1(lx+lw+12)} ${f1(ly-36)}L${f1(lx+lw+8)} ${f1(ly+14)}C${f1(lx+lw*.9)} ${f1(ly+20)} ${f1(lx+lw*.7)} ${f1(ly+22)} ${f1(lx+lw*.55)} ${f1(ly+18)}C${f1(lx+lw*.4)} ${f1(ly+14)} ${f1(lx+lw*.2)} ${f1(ly+22)} ${f1(lx)} ${f1(ly+20)}Z`;
      s+=`<path d="${leg}" style="fill:var(--skin);stroke:var(--ink);stroke-width:1.4"/>`;
      s+=`<path d="M${f1(lx+6)} ${f1(ly)}C${f1(lx+lw*.4)} ${f1(ly+4)} ${f1(lx+lw*.7)} ${f1(ly-2)} ${f1(lx+lw*.92)} ${f1(ly)}" style="fill:none;stroke:var(--blood);stroke-width:3;opacity:.55"/>`;
      const cg=ramp(u,.25,.8);if(cg>0)s+=`<path d="${blob(lx+lw*.58,ly+1,4+cg*6,9,{n:10,rough:.3,sq:.6})}" style="fill:var(--blood)"/>`;
      const hx=lx+lw+4,hy=ly+12,pr=.4+.6*Math.abs(Math.sin(u*W));s+=`<circle cx="${f1(hx)}" cy="${f1(hy)}" r="9" style="fill:var(--bad-soft);stroke:var(--bad);stroke-width:1.6;opacity:${f1(pr)}"/>`;
      s+=tx(lx+lw*.3,ly+40,NSG_TX.calf,'t-xs t-mid',INK)+tx(hx,hy+26,NSG_TX.heel,'t-xs t-end',INK);
      const ax=x+w-34,ay=y+h-48,an=u*360*2;s+=`<g transform="rotate(${f1(an)} ${f1(ax)} ${f1(ay)})"><path d="M${f1(ax+18)} ${f1(ay)}A18 18 0 1 1 ${f1(ax)} ${f1(ay-18)}" style="fill:none;stroke:var(--care);stroke-width:3"/><path d="M${f1(ax)} ${f1(ay-25)}L${f1(ax+8)} ${f1(ay-18)}L${f1(ax)} ${f1(ay-11)}Z" style="fill:var(--care)"/></g>`+tx(ax,ay+36,NSG_TX.turn,'t-xs t-mid',INK);
      return s},
    /* 7 pain, mind and words */
    (x,y,w,h,u)=>{const hx=x+70,hy=y+h-60;let s='';
      s+=`<rect x="${f1(x+10)}" y="${f1(hy+18)}" width="120" height="16" rx="8" style="fill:var(--panel)"/>`;
      s+=`<circle cx="${f1(hx)}" cy="${f1(hy)}" r="24" style="fill:var(--skin);stroke:var(--ink);stroke-width:1.4"/>`;
      const shut=u>.5;s+=shut?`<path d="M${f1(hx-12)} ${f1(hy-4)}h8M${f1(hx+4)} ${f1(hy-4)}h8" style="stroke:var(--ink);stroke-width:1.8"/>`:`<circle cx="${f1(hx-8)}" cy="${f1(hy-4)}" r="2.2" style="fill:var(--ink)"/><circle cx="${f1(hx+8)}" cy="${f1(hy-4)}" r="2.2" style="fill:var(--ink)"/>`;
      s+=`<path d="M${f1(hx-6)} ${f1(hy+9)}h12" style="stroke:var(--ink);stroke-width:1.4"/>`;
      if(!shut){const a=ramp(u,.04,.14)*(1-ramp(u,.44,.5));s+=`<g style="opacity:${f1(a)}"><path d="M${f1(x+140)} ${f1(y+6)}h${f1(w-150)}a8 8 0 0 1 8 8v26a8 8 0 0 1 -8 8h${f1(-(w-184))}l-26 18l6 -18h-14a8 8 0 0 1 -8 -8v-26a8 8 0 0 1 8 -8z" style="fill:var(--care-soft);stroke:var(--care);stroke-width:1.4"/>`+tx(x+148,y+31,NSG_TX.say,'t-sm',INK)+'</g>';
        s+=kitLabel(hx+30,hy+46,NSG_TX.hear,{})}
      else{const a=ramp(u,.55,.68);s+=`<g style="opacity:${f1(a)}">`;[ [40,-46,14],[66,-62,18],[96,-74,22] ].forEach(([dx,dy,r],i)=>{s+=`<circle cx="${f1(hx+dx)}" cy="${f1(hy+dy)}" r="${r}" style="fill:var(--brand-soft);stroke:var(--brand);stroke-width:1.2"/>`});
        for(let i=0;i<3;i++){const sx=hx+86+i*10,sy=hy-78+Math.sin(u*W*2+i)*4;s+=`<path d="M${f1(sx)} ${f1(sy-5)}l1.6 3.4l3.6 .4l-2.7 2.4l.8 3.6l-3.3 -1.9l-3.3 1.9l.8 -3.6l-2.7 -2.4l3.6 -.4z" style="fill:var(--accent)"/>`}
        s+=kitLabel(hx+130,hy-50,NSG_TX.dream,{})+'</g>'}
      s+=`<path d="M${f1(hx+36)} ${f1(hy+18)}l4 -6l4 6l4 -6l4 6" style="fill:none;stroke:var(--damage);stroke-width:2;opacity:${f1(.5+.5*Math.sin(u*W*4))}"/>`+tx(hx+62,hy+18,NSG_TX.pain,'t-xs',INK);
      return s},
    /* 8 after ICU: a path from ICU to home with a watch band after discharge */
    (x,y,w,h,u)=>{const ty=y+70,X=v=>x+16+(w-32)*v;let s='';const st=NSG_TX.stages,cut=[0,.28,.62,.84,1];
      st.forEach((l,i)=>{s+=`<rect x="${f1(X(cut[i])+1)}" y="${f1(ty-12)}" width="${f1(X(cut[i+1])-X(cut[i])-2)}" height="24" rx="6" style="fill:${i===0?'var(--rx-soft)':i===3?'var(--rec-soft)':'var(--care-soft)'};stroke:var(--line)"/>`+tx((X(cut[i])+X(cut[i+1]))/2,ty+4,l,'t-xs t-mid',INK)});
      const bw=ramp(u,.2,.5);s+=`<rect x="${f1(X(.28))}" y="${f1(ty+20)}" width="${f1((X(.62)-X(.28))*bw)}" height="10" rx="5" style="fill:var(--warn);opacity:.55"/>`;
      if(bw>.6)s+=kitLabel(X(.28),ty+48,NSG_TX.watch,{});
      const px=X(clamp(u*1.05));s+=`<circle cx="${f1(px)}" cy="${f1(ty-26)}" r="7" style="fill:var(--accent);stroke:var(--panel);stroke-width:2"/><path d="M${f1(px)} ${f1(ty-19)}V${f1(ty-13)}" style="stroke:var(--accent);stroke-width:2"/>`;
      return s}
  ];

  /* ---------- main: the observation round ---------- */
  const svg=$('#nsgSvg'),rg=$('#nsgT');let setSt=()=>{};
  function draw(t){
    const N=vb(svg,'720 440','400 880'),p=phaseOf(NSG_STEPS,t),P=NSG_STEPS[p],u=clamp((t-P.from)/((NSG_STEPS[p+1]?NSG_STEPS[p+1].from:1)-P.from));
    const L=N?{bx0:104,bx1:296,by0:58,by1:404,cx:200,cy:92,cs:290,lc:80,rc:320,mx:12,my:420,mw:376,mh:450,vx:28,vy:480,vw:344,vh:200,fy:712,fw:344,fr:44}
             :{bx0:50,bx1:230,by0:58,by1:428,cx:140,cy:94,cs:310,lc:26,rc:254,mx:286,my:58,mw:420,mh:370,vx:302,vy:112,vw:388,vh:190,fy:322,fw:388,fr:34};
    let s=tx(N?12:14,24,P.t,'t-big','font-size:19px;fill:var(--care)')+tx(N?12:14,41,P.sub,'t-sm');
    /* the bed, seen from above */
    s+=`<rect x="${L.bx0}" y="${L.by0}" width="${L.bx1-L.bx0}" height="${L.by1-L.by0}" rx="16" style="fill:var(--panel-2);stroke:var(--line);stroke-width:1.4"/><rect x="${L.bx0+30}" y="${L.by0+8}" width="${L.bx1-L.bx0-60}" height="22" rx="10" style="fill:var(--panel);stroke:var(--line)"/>`;
    const k=L.cs/146,B=bodyFront(L.cx,L.cy,L.cs,{level:.62,tingle:.6,pain:p===6?.5+.5*Math.sin(u*W*4):0,vent:false}),A=(a,b)=>[L.cx+a*k,L.cy+(b+50)*k];s+=B.svg;
    s+=`<rect x="${L.bx0+8}" y="${f1(A(0,40)[1])}" width="${L.bx1-L.bx0-16}" height="${f1(L.by1-8-A(0,40)[1])}" rx="12" style="fill:var(--care-soft);opacity:.55"/>`;
    /* station markers with leader lines */
    NSG_STEPS.forEach((S,i)=>{const an=A(S.a[0],S.a[1]),mx=S.side==='l'?L.lc:L.rc,my=an[1]+S.dy*k,on=i===p,done=i<p;
      s+=`<line x1="${f1(mx+(S.side==='l'?13:-13))}" y1="${f1(my)}" x2="${f1(an[0])}" y2="${f1(an[1])}" style="stroke:${on?'var(--care)':'var(--muted)'};stroke-width:${on?2:1};stroke-dasharray:${on?'none':'3 3'}"/><circle cx="${f1(an[0])}" cy="${f1(an[1])}" r="3" style="fill:${on?'var(--care)':'var(--muted)'}"/>`;
      if(on)s+=`<circle cx="${f1(mx)}" cy="${f1(my)}" r="${f1(15+4*Math.abs(Math.sin(u*W*2)))}" style="fill:none;stroke:var(--care);stroke-width:1.6;opacity:.5"/>`;
      s+=`<circle cx="${f1(mx)}" cy="${f1(my)}" r="13" style="fill:${on?'var(--care)':done?'var(--care-soft)':'var(--panel)'};stroke:var(--care);stroke-width:1.6"/>`+tx(mx,my+4.5,i+1,'t-lbl t-mid',on?'fill:var(--on-brand)':'fill:var(--care)')});
    /* the monitor */
    s+=`<rect x="${L.mx}" y="${L.my}" width="${L.mw}" height="${L.mh}" rx="14" style="fill:var(--panel-2);stroke:var(--line);stroke-width:1.2"/>`;
    s+=tx(L.vx,L.my+22,`${NSG_TX.check} ${p+1} ${NSG_TX.of}`,'t-xs','letter-spacing:.1em')+tx(L.vx,L.my+42,P.t,'t-lbl');
    s+=VIS[p](L.vx,L.vy,L.vw,L.vh,u);
    s+=`<line x1="${L.vx}" x2="${L.vx+L.fw}" y1="${L.fy-18}" y2="${L.fy-18}" class="axis"/>`;
    const g=ease(ramp(u,0,.35));P.facts.forEach((f,i)=>{s+=bar(L.vx,L.fy+i*L.fr,L.fw,f.v==null?null:g*f.v/100,f.l,f.s||'',i===0?'var(--care)':'var(--accent)')});
    svg.innerHTML=s;setSt(p);$('#nsgNote').innerHTML=noteHTML(P);
  }
  const stop=playWire(rg,$('#nsgPlay'),draw,32000,'Replay','nursing');
  setSt=stepWire($('#nsgSteps'),NSG_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- the single breath count ---------- */
  const bsv=$('#nsgSbSvg'),brg=$('#nsgSbT'),bcap=$('#nsgSbCap');let tgt=14;
  const applies=(c,T)=>T.dir==='le'?c<=T.n:T.dir==='lt'?c<T.n:T.dir==='ge'?c>=T.n:false;
  function drawSb(t){const N=vb(bsv,'720 330','400 600'),c=Math.min(tgt,Math.floor(tgt*t+1e-6)),run=t<1&&c<tgt;
    const L=N?{lx:14,ly:66,ls:.86,cx:262,cy:150,nx:22,nw:356,ny:226,ry:290,rh:52,two:true}:{lx:20,ly:70,ls:1.05,cx:100,cy:258,nx:232,nw:460,ny:60,ry:124,rh:34,two:true};
    let s='';const Lg=lungs(L.lx,L.ly,L.ls,{fill:1-.9*c/25});s+=Lg.svg;
    /* the count, said aloud */
    const said=[];for(let i=Math.max(1,c-3);i<=c;i++)said.push(i);
    const bx=N?L.lx+136:L.lx,by=N?L.ly:L.ly-46,bw=N?236:160;
    s+=`<rect x="${f1(bx)}" y="${f1(by-4)}" width="${bw}" height="28" rx="10" style="fill:var(--care-soft);stroke:var(--care)"/>`+tx(bx+10,by+14,(said.length?said.join(', '):'…')+(run?' …':''),'t-sm',INK);
    s+=tx(N?L.cx:L.cx,N?L.cy:L.cy,c,'t-big t-mid','font-size:40px;fill:var(--care)')+tx(N?L.cx:L.cx,(N?L.cy:L.cy)+18,NSG_TX.sbcSay,'t-xs t-mid');
    /* the number line */
    const X=v=>L.nx+L.nw*v/25;
    s+=`<rect x="${f1(L.nx)}" y="${f1(L.ny-6)}" width="${f1(L.nw)}" height="12" rx="6" style="fill:var(--panel-2)"/><rect x="${f1(L.nx)}" y="${f1(L.ny-6)}" width="${f1(Math.max(0,X(c)-L.nx))}" height="12" rx="6" style="fill:var(--care)"/>`;
    for(let v=0;v<=25;v+=5)s+=tx(X(v),L.ny+22,v,'t-xs t-mid');
    NSG_SBC.forEach(T=>{s+=`<path d="M${f1(X(T.n))} ${f1(L.ny-8)}l-5 -9h10z" style="fill:var(--ink)"/>`+tx(X(T.n),L.ny-20,T.n,'t-xs t-mid',INK)});
    s+=tx(L.nx+L.nw,L.ny+36,NSG_TX.sbcAxis,'t-xs t-end');
    /* the rows */
    NSG_SBC.forEach((T,i)=>{const y=L.ry+i*L.rh,on=applies(c,T),nd=T.dir===null;
      s+=nd?`<path d="M${f1(L.nx+6)} ${f1(y-10)}l6 6l-6 6l-6 -6z" style="fill:none;stroke:var(--muted);stroke-width:1.4"/>`:`<circle cx="${f1(L.nx+6)}" cy="${f1(y-4)}" r="6" style="fill:${on?'var(--care)':'none'};stroke:var(--care);stroke-width:1.6"/>`;
      s+=tx(L.nx+20,y,N?T.ln:T.l,'t-sm',on?INK:'')+tx(L.two?L.nx+20:L.nx+L.nw,L.two?y+15:y,NSG_TX.sbcSrc[T.s],'t-xs'+(L.two?'':' t-end'))});
    bsv.innerHTML=s;
    $$('[data-sbt]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.sbt===tgt));bcap.innerHTML=NSG_SBCCAP[tgt];
    brg.setAttribute('aria-valuetext',String(c));
  }
  const bstop=playWire(brg,$('#nsgSbPlay'),drawSb,6000,'Replay','nursing');
  $$('[data-sbt]').forEach(b=>b.addEventListener('click',()=>{bstop();tgt=+b.dataset.sbt;brg.value=1;drawSb(1)}));
  drawSb(+brg.value);

  /* ---------- misunderstandings: reveal ---------- */
  $$('[data-nsmy]').forEach(b=>b.addEventListener('click',()=>{const on=b.getAttribute('aria-pressed')!=='true';b.setAttribute('aria-pressed',on);
    const a=$('#'+b.getAttribute('aria-controls'));a.hidden=!on}));
};
/* =============== 5.4 Research frontier =============== */
/* Three pieces: (1) where new drugs act on the antibody and complement attack at a node of Ranvier (main stepper),
   (2) a trial explorer with animated bars of published group results, (3) neurofilament light (NfL) leaking from a
   broken axon into blood, with the published medians and proposed cut-offs on a log strip.
   Every number comes from research pass I (frontier) or E (immunotherapy). Drawings are schematic. */
const FN_STEPS=[
 {from:0,at:.06,k:'Step 1 · why look further',t:'Two treatments for 30 years',sub:'IVIg and plasma exchange help, but not fully',
  txt:'IVIg and plasma exchange have been the only proven immune treatments for GBS for 30 years, and a substantial proportion of people still recover incompletely <span class="ev est">Established</span> <sup class="c" data-ref="Wiegers2025" title="Source 507"><a href="/guillain-barre-syndrome/sources/#src-Wiegers2025">507</a></sup>. New trials aim at two steps of the attack: the IgG antibodies that bind the nerve, and complement, the protein cascade those antibodies switch on <sup class="c" data-ref="Wiegers2025" title="Source 507"><a href="/guillain-barre-syndrome/sources/#src-Wiegers2025">507</a></sup>. Such trials are hard to run: GBS is acute and rare, people must be enrolled fast, the disease varies, and testing a new drug without standard care is ethically difficult <sup class="c" data-ref="Wiegers2025" title="Source 507"><a href="/guillain-barre-syndrome/sources/#src-Wiegers2025">507</a></sup>.',
  pt:'Doctors have used the same two treatments for GBS for about 30 years. They help, but some people still recover slowly or not fully <sup class="c" data-ref="Wiegers2025" title="Source 507"><a href="/guillain-barre-syndrome/sources/#src-Wiegers2025">507</a></sup>.',
  hook:'IVIg and plasma exchange are still the only proven immune treatments for GBS <sup class="c" data-ref="Wiegers2025" title="Source 507"><a href="/guillain-barre-syndrome/sources/#src-Wiegers2025">507</a></sup>.'},
 {from:.16,at:.22,k:'Step 2 · the target',t:'Antibodies switch on complement at the nerve',sub:'IgG binds the node; the cascade ends in pores',
  txt:'In a mouse model of Miller Fisher syndrome, anti-GQ1b antibodies with human serum paralysed breathing through complement activation at the diaphragm nerve terminals, and the anti-C5 antibody eculizumab prevented this <span class="ev early">Early evidence</span> (animal data) <sup class="c" data-ref="Halstead2008" title="Source 178"><a href="/guillain-barre-syndrome/sources/#src-Halstead2008">178</a></sup>. A mouse model with anti-GM1 antibody at the nodal membrane was used to test early blockade with the anti-C2 antibody ARGX-117 <sup class="c" data-ref="Campbell2022" title="Source 67"><a href="/guillain-barre-syndrome/sources/#src-Campbell2022">67</a></sup>. Complement is also deposited on myelin in AIDP, where no specific antibody is known, which is one argument for complement as a target across subtypes <span class="ev hyp">Hypothesis</span> <sup class="c" data-ref="Freiha2026" title="Source 139"><a href="/guillain-barre-syndrome/sources/#src-Freiha2026">139</a></sup>.',
  pt:'Researchers are testing new medicines. Some try to clear the harmful antibodies faster. Others try to switch off complement, a part of the immune system that damages nerves <sup class="c" data-ref="Wiegers2025" title="Source 507"><a href="/guillain-barre-syndrome/sources/#src-Wiegers2025">507</a></sup>.',
  hook:'Tanruprubart blocks C1q, the first step of the classical pathway; eculizumab blocks C5, the last step before the membrane attack complex <sup class="c" data-ref="Freiha2026" title="Source 139"><a href="/guillain-barre-syndrome/sources/#src-Freiha2026">139</a></sup>.'},
 {from:.32,at:.4,k:'Step 3 · fewer antibodies',t:'Clear the IgG faster',sub:'cut IgG, or stop the body recycling it',
  txt:'Imlifidase is an enzyme from <i>Streptococcus pyogenes</i> that cleaves all four subclasses of human IgG; it is already approved for highly sensitised kidney transplant candidates <sup class="c" data-ref="Freiha2026,Wiegers2025" title="Source 139,507"><a href="/guillain-barre-syndrome/sources/#src-Freiha2026">139,507</a></sup>. Its GBS trial had a single arm, so there is no randomised result <span class="ev early">Early evidence</span> <sup class="c" data-ref="NCT03943589" title="Source 316"><a href="/guillain-barre-syndrome/sources/#src-NCT03943589">316</a></sup>. Efgartigimod blocks the neonatal Fc receptor (FcRn), which normally recycles IgG, so IgG is broken down faster. It has shown benefit in CIDP, but no randomised GBS trial has reported <span class="ev hyp">Hypothesis</span> in GBS <sup class="c" data-ref="Freiha2026" title="Source 139"><a href="/guillain-barre-syndrome/sources/#src-Freiha2026">139</a></sup>.',
  pt:'These medicines lower the amount of the harmful antibody in the blood, either by cutting it up or by letting the body break it down faster <sup class="c" data-ref="Freiha2026" title="Source 139"><a href="/guillain-barre-syndrome/sources/#src-Freiha2026">139</a></sup>.',
  hook:'Imlifidase cleaves IgG; efgartigimod blocks FcRn so IgG is broken down faster. Neither has a randomised GBS result <sup class="c" data-ref="Freiha2026" title="Source 139"><a href="/guillain-barre-syndrome/sources/#src-Freiha2026">139</a></sup>.'},
 {from:.49,at:.57,k:'Step 4 · block early',t:'Stop complement at its first step',sub:'C1q (tanruprubart) or C2 (empasiprubart)',
  txt:'Tanruprubart (ANX005) is a humanised antibody that blocks C1q, the first protein of the classical complement pathway, upstream of C5 <sup class="c" data-ref="Freiha2026,Crescioli2026" title="Source 86,139"><a href="/guillain-barre-syndrome/sources/#src-Freiha2026">86,139</a></sup>. In its phase 3 trial in Bangladesh and the Philippines, the 30 mg/kg dose was reported to meet the week-8 primary endpoint with 2.4-fold higher odds of improvement than placebo; the 75 mg/kg dose did not <span class="ev early">Early evidence</span>: company-reported, with no peer-reviewed trial paper yet <sup class="c" data-ref="Crescioli2026" title="Source 86"><a href="/guillain-barre-syndrome/sources/#src-Crescioli2026">86</a></sup>. Empasiprubart (ARGX-117) blocks C2 in the classical and lectin pathways; a placebo-controlled add-on trial with IVIg is planned <sup class="c" data-ref="VandeWalle2025,NCT07821762" title="Source 324,470"><a href="/guillain-barre-syndrome/sources/#src-VandeWalle2025">324,470</a></sup>.',
  pt:'Another medicine, tanruprubart, looked helpful in a large trial in Bangladesh and the Philippines. The full results are not yet published in a medical journal, and it has not been compared with usual treatment <sup class="c" data-ref="Freiha2026,Crescioli2026" title="Source 86,139"><a href="/guillain-barre-syndrome/sources/#src-Freiha2026">86,139</a></sup>.',
  hook:'In the tanruprubart phase 3 trial the control arm had no IVIg or plasma exchange, so it compared drug with placebo, not with standard care <sup class="c" data-ref="Freiha2026,Wiegers2025" title="Source 139,507"><a href="/guillain-barre-syndrome/sources/#src-Freiha2026">139,507</a></sup>.'},
 {from:.65,at:.73,k:'Step 5 · block late',t:'Block C5: the target fell, function did not',sub:'eculizumab hit C5, yet recovery was not faster',
  txt:'Eculizumab blocks C5. In the Japanese phase 3 trial (57 adults, all also given IVIg), serum C5 fell by 99.99% one hour after the dose and stayed suppressed to week 5, yet the primary endpoint, time to being able to run, was not met: hazard ratio 0.9 (95% CI 0.45–1.97) <span class="ev est">Established</span>: no benefit shown <sup class="c" data-ref="Kuwabara2024" title="Source 259"><a href="/guillain-barre-syndrome/sources/#src-Kuwabara2024">259</a></sup>. The earlier JET-GBS phase 2 trial also missed its predefined threshold <sup class="c" data-ref="Misawa2018" title="Source 298"><a href="/guillain-barre-syndrome/sources/#src-Misawa2018">298</a></sup>. Why C1q blockade looked better is unresolved: it acts further upstream <span class="ev hyp">Hypothesis</span> <sup class="c" data-ref="Freiha2026,Gorson2025" title="Source 139,163"><a href="/guillain-barre-syndrome/sources/#src-Freiha2026">139,163</a></sup>, or the trial populations simply differed <sup class="c" data-ref="Kuwabara2024,Wiegers2025" title="Source 259,507"><a href="/guillain-barre-syndrome/sources/#src-Kuwabara2024">259,507</a></sup>.',
  pt:'One complement medicine, eculizumab, did not help in two trials in Japan <sup class="c" data-ref="Kuwabara2024,Misawa2018" title="Source 259,298"><a href="/guillain-barre-syndrome/sources/#src-Kuwabara2024">259,298</a></sup>.',
  hook:'Eculizumab (anti-C5) failed its primary endpoint in both JET-GBS and the 57-patient phase 3 trial despite near-complete C5 blockade <sup class="c" data-ref="Misawa2018,Kuwabara2024" title="Source 259,298"><a href="/guillain-barre-syndrome/sources/#src-Misawa2018">259,298</a></sup>.'},
 {from:.84,at:.92,k:'Step 6 · the scoreboard',t:'Where the evidence stands',sub:'IVIg and plasma exchange remain the proven options',
  txt:'The 2023 EAN/PNS guideline does not recommend eculizumab for GBS <sup class="c" data-ref="Wiegers2025" title="Source 507"><a href="/guillain-barre-syndrome/sources/#src-Wiegers2025">507</a></sup>; it weakly recommends against it <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>. Tanruprubart had FDA Fast Track and Orphan Drug designations and an EMA orphan designation, with an EU marketing application planned for January 2026; its current approval status was not confirmed for this guide <sup class="c" data-ref="Crescioli2026" title="Source 86"><a href="/guillain-barre-syndrome/sources/#src-Crescioli2026">86</a></sup>. Imlifidase and efgartigimod still lack randomised GBS results <sup class="c" data-ref="Freiha2026" title="Source 139"><a href="/guillain-barre-syndrome/sources/#src-Freiha2026">139</a></sup>. All outcome figures here are group statistics from trials, not predictions for any one person.',
  pt:'For now, IVIg and plasma exchange are the proven treatments. The new medicines are still being tested, and some results are not yet published in full <sup class="c" data-ref="Wiegers2025,Freiha2026" title="Source 139,507"><a href="/guillain-barre-syndrome/sources/#src-Wiegers2025">139,507</a></sup>.',
  hook:'IVIg and plasma exchange remain the only proven immune treatments; the 2023 guideline does not recommend eculizumab <sup class="c" data-ref="Wiegers2025" title="Source 507"><a href="/guillain-barre-syndrome/sources/#src-Wiegers2025">507</a></sup>.'}
];
/* the attack, top to bottom */
const FN_ROWS=['IgG antibody','C1q','C2','C3','C5','MAC pore'];
const FN_HEAD={att:'THE ATTACK, STEP BY STEP',drug:'DRUGS IN GBS TRIALS',attN:'THE ATTACK',zoom:'ONE NODE OF RANVIER, CLOSE-UP',sc:'STANDARD TODAY',sc1:'IVIg',sc2:'plasma exchange',sc3:'in use for 30 years',cutL:'IgG cut into pieces',my:'myelin',nd:'node',na:'sodium channels',ax:'axon'};
const FN_CHIPS=[{l:'IgG on the node',k:'ab'},{l:'C3 deposits',k:'c3'},{l:'MAC pores',k:'mac'}];
const FN_LVL={hi:'HIGH',lo:'LOW'};
const FN_CAP=['Schematic: where each drug is designed to act.','It does not show that a drug works.'];
/* drug badges: row = cascade row, slot for the two IgG drugs; st = the step that introduces it */
const FN_DRUGS=[
 {n:'imlifidase',m:'cuts IgG',s:'Early evidence · 1 arm',row:0,slot:0,st:2,col:'var(--warn)'},
 {n:'efgartigimod',m:'blocks FcRn recycling',s:'Hypothesis in GBS',row:0,slot:1,st:2,col:'var(--rx)'},
 {n:'tanruprubart',m:'anti-C1q antibody',s:'Early evidence',row:1,st:3,col:'var(--warn)'},
 {n:'empasiprubart',m:'anti-C2 antibody',s:'Trial not yet recruiting',row:2,st:3,col:'var(--muted)'},
 {n:'eculizumab',m:'anti-C5 antibody',s:'Phase 3: no benefit',row:4,st:4,col:'var(--bad)'}
];

/* ---- trial explorer: published group results, one outcome per trial ---- */
const FX_TRIALS={
 jet:{b:'JET-GBS · eculizumab',m:'Walking independently at week 4',mn:'Walking independently, week 4',
  d:'Phase 2, Japan · 34 people unable to walk · randomised 2:1 · all also had IVIg',dn:'Phase 2, Japan · 34 people · all had IVIg',
  rows:[{l:'eculizumab + IVIg (23)',ln:'eculizumab + IVIg · 90% CI 42–78',v:61,lo:42,hi:78,vt:'61% (90% CI 42–78)',vn:'61%'},
        {l:'placebo + IVIg (11)',ln:'placebo + IVIg · 90% CI 20–73',v:45,lo:20,hi:73,vt:'45% (90% CI 20–73)',vn:'45%',ctl:1}],
  thr:50,thrL:'dashed line: the lower 90% CI bound had to clear 50%',thrN:'dashed: lower CI bound had to clear 50%',
  f:`<dl class="kv"><div><dt>Design</dt><dd>34 people unable to walk independently, randomised 2:1 to IVIg plus eculizumab (23) or IVIg plus placebo (11) <sup class="c" data-ref="Misawa2018" title="Source 298"><a href="/guillain-barre-syndrome/sources/#src-Misawa2018">298</a></sup>.</dd></div><div><dt>Result</dt><dd>At week 4, 61% (90% CI 42–78) on eculizumab and 45% (20–73) on placebo walked independently. The predefined response threshold, a lower 90% CI bound above 50%, was not met, and the design made no statistical comparison with placebo <sup class="c" data-ref="Misawa2018" title="Source 298"><a href="/guillain-barre-syndrome/sources/#src-Misawa2018">298</a></sup>.</dd></div><div><dt>Evidence</dt><dd><span class="ev early">Early evidence</span> Cochrane pooled it with the 8-person UK ICA-GBS trial (41 participants): it is uncertain whether eculizumab improves disability at 4 weeks, very low certainty <sup class="c" data-ref="Doets2020,Davidson2017" title="Source 92,103"><a href="/guillain-barre-syndrome/sources/#src-Doets2020">92,103</a></sup>.</dd></div></dl>`},
 ecu3:{b:'Phase 3 · eculizumab',m:'Able to run (functional grade 1 or less)',mn:'Able to run (grade 1 or less)',
  d:'Phase 3, Japan · 57 adults with severe GBS · randomised 2:1 · all also had IVIg',dn:'Phase 3, Japan · 57 adults · all had IVIg',
  rows:[{l:'eculizumab · week 8',v:100*12/37,vt:'12 of 37'},{l:'placebo · week 8',v:100*7/20,vt:'7 of 20',ctl:1},
        {l:'eculizumab · week 24',v:100*20/37,vt:'20 of 37'},{l:'placebo · week 24',v:100*13/20,vt:'13 of 20',ctl:1}],
  f:`<dl class="kv"><div><dt>Design</dt><dd>57 adults with severe GBS within 2 weeks of onset, randomised 2:1 to eculizumab (37) or placebo (20), weekly for 4 weeks, with IVIg <sup class="c" data-ref="Kuwabara2024" title="Source 259"><a href="/guillain-barre-syndrome/sources/#src-Kuwabara2024">259</a></sup>.</dd></div><div><dt>Result</dt><dd>Primary endpoint, time to functional grade 1 or less (able to run), not met: hazard ratio 0.9 (95% CI 0.45–1.97; p=0.89). Registry medians were 112 days with eculizumab and 168 with placebo <sup class="c" data-ref="Kuwabara2024,NCT04752566" title="Source 259,318"><a href="/guillain-barre-syndrome/sources/#src-Kuwabara2024">259,318</a></sup>.</dd></div><div><dt>Why it matters</dt><dd>Serum C5 fell by 99.99% within an hour: the drug hit its target, yet function did not improve. No new safety signals; the registry lists one death in the eculizumab group <sup class="c" data-ref="Kuwabara2024,NCT04752566" title="Source 259,318"><a href="/guillain-barre-syndrome/sources/#src-Kuwabara2024">259,318</a></sup>.</dd></div><div><dt>Evidence</dt><dd><span class="ev est">Established</span> no benefit shown <sup class="c" data-ref="Kuwabara2024" title="Source 259"><a href="/guillain-barre-syndrome/sources/#src-Kuwabara2024">259</a></sup>.</dd></div></dl>`},
 anx1:{b:'Phase 1 · ANX005',m:'Able to run at week 8 (exploratory group)',mn:'Able to run, week 8 (exploratory)',
  d:'Phase 1, Bangladesh · 50 people with no access to IVIg or plasma exchange',dn:'Phase 1, Bangladesh · no IVIg or plasma exchange',
  rows:[{l:'ANX005 (18)',v:100*5/18,vt:'28% (5 of 18)'},{l:'placebo (8)',v:0,vt:'0% (0 of 8)',ctl:1}],
  f:`<dl class="kv"><div><dt>Design</dt><dd>Escalating single doses of ANX005 (38 people) or placebo (12) in recent-onset GBS; participants had no access to IVIg or plasma exchange <sup class="c" data-ref="Mohammad2025" title="Source 299"><a href="/guillain-barre-syndrome/sources/#src-Mohammad2025">299</a></sup>.</dd></div><div><dt>Safety</dt><dd>No dose-limiting toxicity up to 100 mg/kg and no deaths. Infusion-related rash in 76% (29/38) versus 8% (1/12), all grade 1 or 2; serious adverse events 5% versus 25%, none treatment-related <sup class="c" data-ref="Mohammad2025" title="Source 299"><a href="/guillain-barre-syndrome/sources/#src-Mohammad2025">299</a></sup>.</dd></div><div><dt>Result</dt><dd>Mean MRC sum score gain to day 8 was 11.8 versus 3.9 points (p=0.09). Groups were too small for significance <sup class="c" data-ref="Mohammad2025" title="Source 299"><a href="/guillain-barre-syndrome/sources/#src-Mohammad2025">299</a></sup>.</dd></div><div><dt>Who took part</dt><dd>Mean age 31, all Asian, 75% classified as AMAN, mean baseline MRC sum score 15.5: unlike typical European or North American cohorts. <span class="ev early">Early evidence</span> <sup class="c" data-ref="Mohammad2025" title="Source 299"><a href="/guillain-barre-syndrome/sources/#src-Mohammad2025">299</a></sup></dd></div></dl>`},
 tan3:{b:'Phase 3 · tanruprubart',m:'GBS disability score 0 at week 26 (company-reported)',mn:'GBS-DS 0 at week 26 (company data)',
  d:'Phase 3, Bangladesh and Philippines · 242 enrolled · no IVIg or plasma exchange in either arm',dn:'Phase 3 · 242 enrolled · no standard care',
  rows:[{l:'tanruprubart 30 mg/kg',v:22,vt:'22%'},{l:'placebo',v:9,vt:'9%',ctl:1}],
  f:`<dl class="kv"><div><dt>Design</dt><dd>Randomised, quadruple-masked, two single-dose arms against placebo; age 16 and over, weakness for 10 days or less, GBS disability score 3 to 5; primary outcome the score at week 8. Completed April 2024; no results posted on the registry <sup class="c" data-ref="NCT04701164" title="Source 317"><a href="/guillain-barre-syndrome/sources/#src-NCT04701164">317</a></sup>.</dd></div><div><dt>Reported result</dt><dd>30 mg/kg met the primary endpoint with 2.4-fold higher odds of improvement; 75 mg/kg did not <sup class="c" data-ref="Crescioli2026" title="Source 86"><a href="/guillain-barre-syndrome/sources/#src-Crescioli2026">86</a></sup>. For 30 mg/kg: independent walking a median 31 days earlier, 28 fewer days on a ventilator, and a score of 0 at week 26 in 22% versus 9% (OR 4.1, 95% CI 1.42–12.04) <sup class="c" data-ref="Gorson2025" title="Source 163"><a href="/guillain-barre-syndrome/sources/#src-Gorson2025">163</a></sup>.</dd></div><div><dt>Caution</dt><dd>The control arm had no standard care, so the trial cannot show how tanruprubart compares with IVIg or plasma exchange <sup class="c" data-ref="Freiha2026" title="Source 139"><a href="/guillain-barre-syndrome/sources/#src-Freiha2026">139</a></sup>. The figures come from a manufacturer-funded review and industry surveys, not a peer-reviewed trial paper. <span class="ev early">Early evidence</span> <sup class="c" data-ref="Gorson2025,Crescioli2026" title="Source 86,163"><a href="/guillain-barre-syndrome/sources/#src-Gorson2025">86,163</a></sup></dd></div></dl>`},
 iml:{b:'Phase 2 · imlifidase',m:'Walking unaided after imlifidase then IVIg (no control arm)',mn:'Walking unaided (no control arm)',
  d:'Phase 2, single arm · 30 treated, 27 in the efficacy analysis · France, UK, Netherlands',dn:'Phase 2, single arm · 27 analysed',
  rows:[{l:'day 7',v:100*10/27,vt:'10 of 27'},{l:'day 57',v:100*18/27,vt:'18 of 27'},{l:'day 180',v:100*23/27,vt:'23 of 27'},{l:'day 360',v:100*24/27,vt:'24 of 27'}],
  f:`<dl class="kv"><div><dt>Design</dt><dd>Open label, one arm: adults within 10 days of onset and unable to walk 10 m unaided had one dose of imlifidase (0.25 mg/kg), then a standard IVIg course at least 48 hours later. Nobody walked unaided at baseline (0 of 27) <sup class="c" data-ref="NCT03943589" title="Source 316"><a href="/guillain-barre-syndrome/sources/#src-NCT03943589">316</a></sup>.</dd></div><div><dt>Result</dt><dd>Median time to improve one disability grade 6 days (range 3–16), two grades 16 days (8–92). Mean MRC sum score rose from 39.1 to 50.0 by day 8 and 54.1 by day 180 <sup class="c" data-ref="NCT03943589" title="Source 316"><a href="/guillain-barre-syndrome/sources/#src-NCT03943589">316</a></sup>.</dd></div><div><dt>Safety</dt><dd>Of 30 treated, 7 had serious adverse events, including pulmonary embolism, pneumonia, acute kidney injury and respiratory failure; 1 died <sup class="c" data-ref="NCT03943589" title="Source 316"><a href="/guillain-barre-syndrome/sources/#src-NCT03943589">316</a></sup>.</dd></div><div><dt>Evidence</dt><dd><span class="ev early">Early evidence</span> registry-posted, no control arm; the comparison with matched IVIg-treated IGOS patients is unpublished <sup class="c" data-ref="NCT03943589,Wiegers2025,Freiha2026" title="Source 139,316,507"><a href="/guillain-barre-syndrome/sources/#src-NCT03943589">139,316,507</a></sup>.</dd></div></dl>`},
 efg:{b:'Series · efgartigimod',m:'Response at week 2 (observational, not randomised)',mn:'Response at week 2 (observational)',
  d:'China · 22 people, 11 per group · treatment chosen, not randomised',dn:'China · 22 people · not randomised',
  rows:[{l:'efgartigimod (11)',v:90.9,vt:'90.9%'},{l:'IVIg (11)',v:81.8,vt:'81.8%',ctl:1}],
  f:`<dl class="kv"><div><dt>Result</dt><dd>Median time to disability-score improvement 4 days with efgartigimod and 8 with IVIg; the authors state comparative efficacy cannot be established <sup class="c" data-ref="Cai2025" title="Source 66"><a href="/guillain-barre-syndrome/sources/#src-Cai2025">66</a></sup>.</dd></div><div><dt>Other series</dt><dd>A two-centre retrospective study (21 people) found no difference in its primary outcome (OR 0.67, 95% CI 0.10–4.48) <sup class="c" data-ref="Zhang2025" title="Source 540"><a href="/guillain-barre-syndrome/sources/#src-Zhang2025">540</a></sup>. A single-centre series (36 people) reported a median 6 days to grade 2 or less when efgartigimod was first-line, against 25 days when it followed IVIg or plasma exchange <sup class="c" data-ref="Bi2026" title="Source 45"><a href="/guillain-barre-syndrome/sources/#src-Bi2026">45</a></sup>.</dd></div><div><dt>Trials</dt><dd>A US randomised trial was withdrawn with nobody enrolled <sup class="c" data-ref="NCT05701189" title="Source 321"><a href="/guillain-barre-syndrome/sources/#src-NCT05701189">321</a></sup>; the Chinese GREAT trial (about 110 adults, against IVIg) is not yet recruiting <sup class="c" data-ref="NCT07806916" title="Source 323"><a href="/guillain-barre-syndrome/sources/#src-NCT07806916">323</a></sup>.</dd></div><div><dt>Evidence</dt><dd><span class="ev early">Early evidence</span> no randomised trial has reported <sup class="c" data-ref="Freiha2026" title="Source 139"><a href="/guillain-barre-syndrome/sources/#src-Freiha2026">139</a></sup>.</dd></div></dl>`}
};
const FX_AX='share of the group, %';

/* ---- neurofilament light ---- */
const NF_TXT={h1:'AXON DAMAGE RELEASES NfL',h2:'SERUM NfL OVER TIME (SCHEMATIC)',blood:'blood',brk:'axon breaks',hi:'high',lo:'low',band:'healthy range',
  ax:['onset','2 wk','4 wk','26 wk','1 yr'],
  med:'MEDIANS AT ENTRY, SPANISH IGOS COHORT · pg/mL, LOG SCALE',medN:'MEDIANS AT ENTRY · pg/mL, LOG SCALE',
  cut:'PROPOSED CUT-OFFS · pg/mL, LOG SCALE · NOT VALIDATED FOR ONE PERSON',cutN:'PROPOSED CUT-OFFS · pg/mL · NOT VALIDATED'};
const NF_MED=[{v:9.83,l:'controls 9.83',up:1},{v:46.79,l:'other variants 46.79',ln:'others 46.79',up:0},{v:55.49,l:'all GBS 55.49',up:1},{v:190.55,l:'AMAN 190.55',up:0}];
const NF_CUT=[{v:34,l:'able to run below 34',up:1},{v:248,l:'unable to run above 248',up:0},{v:319,l:'unable to walk above 319',up:1}];
const NF_CAP=[
 'Damage: when axons are injured, neurofilament light chain (NfL) is released and can be measured in blood. It is a marker of axonal damage <sup class="c" data-ref="MartinAguilar2020" title="Source 283"><a href="/guillain-barre-syndrome/sources/#src-MartinAguilar2020">283</a></sup>.',
 'High early: in a Spanish IGOS cohort, median serum NfL was 55.49 pg/mL in GBS against 9.83 in healthy controls, and 190.55 in AMAN against 46.79 in other variants <sup class="c" data-ref="MartinAguilar2020" title="Source 283"><a href="/guillain-barre-syndrome/sources/#src-MartinAguilar2020">283</a></sup>. In 281 SID-GBS patients, high NfL at 2 weeks was associated with being unable to walk at 4 weeks (OR 1.74, 95% CI 1.27–2.45) <sup class="c" data-ref="vanTilburg2024" title="Source 476"><a href="/guillain-barre-syndrome/sources/#src-vanTilburg2024">476</a></sup>.',
 'Back to normal: in the Spanish cohort, serum NfL had returned to normal by 1 year <sup class="c" data-ref="MartinAguilar2020" title="Source 283"><a href="/guillain-barre-syndrome/sources/#src-MartinAguilar2020">283</a></sup>. The shape of the curve here is schematic; only the high early values and the return to normal are reported.'];
/* schematic level, 0..1, along a not-to-scale time axis */
const NF_F=monoFn([ [0,.08],[.1,.55],[.2,.82],[.3,.86],[.5,.6],[.7,.32],[.85,.16],[1,.1] ]);

inits.frontier=()=>{
  const tx=(x,y,s,cls='t-xs',st='')=>`<text x="${f1(x)}" y="${f1(y)}" class="${cls}"${st?` style="${st}"`:''}>${s}</text>`;
  const INK='fill:var(--ink);font-weight:700';
  /* ---------- 1. where the drugs act ---------- */
  const svg=$('#fnSvg'),rg=$('#fnT'),note=$('#fnNote');
  function state(t){
    const cut=ramp(t,.33,.42)*(1-ramp(t,.46,.5)),c1=ramp(t,.5,.57)*(1-ramp(t,.62,.65)),c5=ramp(t,.66,.73)*(1-ramp(t,.81,.84));
    const lit=FN_ROWS.map((_,i)=>{const b=ramp(t,.02+i*.022,.06+i*.022);const blk=Math.max(cut,i>=1?c1:0,i>=4?c5:0);return b*(1-.85*blk)});
    return {cut,c1,c5,lit,ab:ramp(t,0,.06)*(1-.88*cut),nav:ramp(t,.1,.2)*.5}}
  function draw(t){
    const N=vb(svg,'720 380','400 680'),S=state(t),p=phaseOf(FN_STEPS,t),P=FN_STEPS[p];
    const L=N?{ty:22,nx:50,ny:58,ns:1,zl:52,chX:12,chY:258,chW:120,cap:648,bx:12,bw:120,dx:146,dw:242,hy:314,rc:[356,419,467,515,563,611],sl:[337,375],scY:320}
             :{ty:24,nx:24,ny:62,ns:1.12,zl:58,chX:14,chY:296,chW:112,cap:346,bx:392,bw:118,dx:530,dw:176,hy:24,rc:[80,143,191,239,287,335],sl:[61,99],scY:44};
    let s=`<defs>${marker('fnAr','var(--muted)',6)}</defs>`;
    s+=tx(N?12:14,L.ty,P.t,'t-big')+tx(N?12:14,L.ty+16,P.sub,'t-sm');
    /* node close-up */
    s+=tx(N?12:14,L.zl,FN_HEAD.zoom,'t-xs','letter-spacing:.08em');
    const Z=nodeZoom(L.nx,L.ny,L.ns,{mode:'aman',ab:S.ab,c3:S.lit[5],nav:S.nav});s+=Z.svg;
    const k=L.ns;
    s+=kitLabel(L.nx+56*k,L.ny+24*k,FN_HEAD.my,{a:'m'})+kitLabel(L.nx+244*k,L.ny+24*k,FN_HEAD.my,{a:'m'})+kitLabel(L.nx+150*k,L.ny+138*k,FN_HEAD.na,{a:'m'})+kitLabel(L.nx+150*k,L.ny+160*k,FN_HEAD.ax,{a:'m'});
    if(S.cut<.05)s+=kitLabel(L.nx+150*k,L.ny+22*k,FN_HEAD.nd,{a:'m'});
    const dep=clamp(S.lit[3]-S.lit[5]);
    if(dep>.02)s+=`<g style="opacity:${f1(dep)}">${c3dots(L.nx+118*k,L.ny+100*k,66*k,10,9)}</g>`;
    if(S.cut>.02){Z.at.gang.forEach((g,i)=>{s+=antibody(g[0]+(i%2?8:-8)*S.cut,g[1]-22*k-S.cut*24*k-(i%3)*4,9*k,{ang:180+(i%2?50:-50),op:.75*S.cut})});
      s+=kitLabel(L.nx+150*k,L.ny+22*k,FN_HEAD.cutL,{a:'m'})}
    /* status chips */
    const lv={ab:S.ab,c3:S.lit[3],mac:S.lit[5]};
    FN_CHIPS.forEach((c,i)=>{const x=L.chX+i*(L.chW+8),y=L.chY,hi=lv[c.k]>.5;
      s+=`<rect x="${x}" y="${y}" width="${L.chW}" height="34" rx="8" style="fill:${hi?'var(--bad-soft)':'var(--panel-2)'};stroke:var(--line)"/>`;
      s+=tx(x+8,y+13,c.l)+tx(x+8,y+28,hi?FN_LVL.hi:FN_LVL.lo,'t-sm',`fill:${hi?'var(--bad)':'var(--ink)'};font-weight:700`)});
    s+=tx(N?12:14,L.cap,FN_CAP[0])+tx(N?12:14,L.cap+14,FN_CAP[1]);
    /* the cascade */
    s+=tx(L.bx,L.hy,N?FN_HEAD.attN:FN_HEAD.att,'t-xs','letter-spacing:.08em')+tx(L.dx,L.hy,FN_HEAD.drug,'t-xs','letter-spacing:.08em');
    const cx=L.bx+L.bw/2;
    for(let i=0;i<FN_ROWS.length-1;i++){const a=Math.min(S.lit[i],S.lit[i+1]);
      s+=`<line x1="${f1(cx)}" y1="${L.rc[i]+16}" x2="${f1(cx)}" y2="${L.rc[i+1]-17}" style="stroke:var(--muted);stroke-width:1.6;opacity:${f1(.3+.7*a)}" marker-end="url(#fnAr)"/>`}
    FN_ROWS.forEach((r,i)=>{const y=L.rc[i]-15,a=.3+.7*S.lit[i],col=i===0?'var(--antibody)':'var(--complement)';
      s+=`<g style="opacity:${f1(a)}"><rect x="${L.bx}" y="${y}" width="${L.bw}" height="30" rx="8" style="fill:var(--panel);stroke:${col};stroke-width:2"/><rect x="${L.bx}" y="${y}" width="7" height="30" rx="3" style="fill:${col}"/>`;
      s+=tx(L.bx+16,y+20,r,'t-lbl')+'</g>'});
    /* a packet of activation flowing down */
    const ph=(t*7)%1,kk=Math.min(4,Math.floor(ph*5)),fr=ph*5-kk,pa=Math.min(S.lit[kk],S.lit[kk+1]);
    if(pa>.4)s+=`<circle cx="${f1(cx)}" cy="${f1(lerp(L.rc[kk]+16,L.rc[kk+1]-17,fr))}" r="4.5" style="fill:var(--complement);stroke:var(--panel);stroke-width:1.5;opacity:${f1(pa)}"/>`;
    /* standard care box, early steps */
    const sca=1-ramp(t,.28,.32);
    if(sca>0){const y=L.scY;s+=`<g style="opacity:${f1(sca)}"><rect x="${L.dx}" y="${y}" width="${L.dw}" height="72" rx="10" style="fill:var(--care-soft);stroke:var(--care)"/>`+
      tx(L.dx+10,y+16,FN_HEAD.sc,'t-xs','fill:var(--care);font-weight:700;letter-spacing:.08em')+tx(L.dx+10,y+34,FN_HEAD.sc1,'t-lbl')+tx(L.dx+10,y+50,FN_HEAD.sc2,'t-lbl')+tx(L.dx+10,y+64,FN_HEAD.sc3)+'</g>'}
    /* drug badges */
    FN_DRUGS.forEach(d=>{const st=FN_STEPS[d.st],op=ramp(t,st.from-.01,st.from+.04);if(op<=0)return;
      const on=p===d.st,all=p===5,cy=d.row===0?L.sl[d.slot]:L.rc[d.row],y=cy-17,blk=on||all;
      const ex=L.bx+L.bw;
      s+=`<g style="opacity:${f1(op*(on||all?1:.55))}">`;
      s+=`<path d="M${ex+2} ${L.rc[d.row]}L${L.dx-6} ${cy}" style="fill:none;stroke:${blk?'var(--care)':'var(--muted)'};stroke-width:${blk?2.4:1.4}"/>`;
      s+=`<line x1="${ex+3}" x2="${ex+3}" y1="${L.rc[d.row]-9}" y2="${L.rc[d.row]+9}" style="stroke:${blk?'var(--care)':'var(--muted)'};stroke-width:${blk?4:2};stroke-linecap:round"/>`;
      s+=`<rect x="${L.dx}" y="${y}" width="${L.dw}" height="34" rx="8" style="fill:${on?'var(--care-soft)':'var(--panel)'};stroke:${blk?'var(--care)':'var(--line)'};stroke-width:${on?2:1.2}"/>`;
      s+=tx(L.dx+9,y+15,d.n,'t-lbl');
      s+=all?tx(L.dx+9,y+28,d.s,'t-xs',`fill:${d.col};font-weight:700`):tx(L.dx+9,y+28,d.m);
      s+='</g>'});
    svg.innerHTML=s;setSt(p);note.innerHTML=noteHTML(P)}
  const stop=playWire(rg,$('#fnPlay'),draw,16000,'Replay','frontier');
  const setSt=stepWire($('#fnSteps'),FN_STEPS,rg,draw,stop);
  draw(+rg.value);

  /* ---------- 2. trial explorer ---------- */
  const xs=$('#fxSvg'),xf=$('#fxFacts');let cur='jet',gr=1,xStop=null;
  function drawX(){
    const T=FX_TRIALS[cur],n=T.rows.length;
    const L=NARROW()?{y0:72,dy:50,bx:12,bw:300,bh:14}:{y0:76,dy:38,bx:248,bw:380,bh:16};
    L.ax=L.y0+(n-1)*L.dy+L.bh+16;L.tk=L.ax+16;L.thr=L.tk+(NARROW()?24:22);
    const H=Math.round((T.thr||!NARROW()?L.thr:L.tk)+12),N=vb(xs,'720 '+H,'400 '+H);
    const X=v=>L.bx+L.bw*v/100;
    let s=tx(N?12:14,22,N?T.mn:T.m,'t-lbl')+tx(N?12:14,40,N?T.dn:T.d,'t-sm');
    /* axis and grid */
    for(let v=0;v<=100;v+=25){s+=`<line x1="${f1(X(v))}" x2="${f1(X(v))}" y1="${L.y0-18}" y2="${L.ax}" class="grid"/>`+tx(X(v),L.tk,v+'%','t-xs t-mid')}
    s+=`<line x1="${L.bx}" x2="${L.bx+L.bw}" y1="${L.ax}" y2="${L.ax}" class="axis"/>`;
    if(!N)s+=tx(L.bx+L.bw,L.thr,FX_AX,'t-xs t-end');
    if(T.thr){s+=`<line x1="${f1(X(T.thr))}" x2="${f1(X(T.thr))}" y1="${L.y0-18}" y2="${L.ax}" style="stroke:var(--ink);stroke-width:1.4;stroke-dasharray:5 4"/>`+tx(N?12:L.bx,L.thr,N?T.thrN:T.thrL,'t-xs',INK)}
    T.rows.forEach((r,i)=>{const y=L.y0+i*L.dy,v=r.v*gr,col=r.ctl?'var(--muted)':'var(--care)';
      if(N)s+=tx(12,y-6,r.ln||r.l,'t-sm',r.ctl?'':'fill:var(--ink)');else s+=tx(L.bx-10,y+12,r.l,'t-sm t-end',r.ctl?'':'fill:var(--ink)');
      const by=y,bh=L.bh;
      s+=`<rect x="${L.bx}" y="${by}" width="${f1(Math.max(1.5,L.bw*v/100))}" height="${bh}" rx="4" style="fill:${col};opacity:${r.ctl?.5:.9}"/>`;
      let end=X(v);
      if(r.lo!=null&&gr>.98){const yy=by+bh/2;s+=`<path d="M${f1(X(r.lo))} ${f1(yy)}H${f1(X(r.hi))}M${f1(X(r.lo))} ${f1(yy-6)}V${f1(yy+6)}M${f1(X(r.hi))} ${f1(yy-6)}V${f1(yy+6)}" style="stroke:var(--ink);stroke-width:1.6"/>`;end=Math.max(end,X(r.hi))}
      s+=tx(end+7,by+bh-3,N?(r.vn||r.vt):r.vt,'t-sm',INK)});
    xs.innerHTML=s;
    $$('[data-fx]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.fx===cur));
    xf.innerHTML=T.f}
  $$('[data-fx]').forEach(b=>b.addEventListener('click',()=>{cur=b.dataset.fx;if(xStop)xStop();
    xStop=animate(700,q=>{gr=ease(q);drawX()},()=>{xStop=null})}));
  drawX();

  /* ---------- 3. neurofilament light ---------- */
  const ns=$('#nfSvg'),nr=$('#nfT'),nc=$('#nfCap');let nfMode='med';
  function drawN(t){
    const N=vb(ns,'720 350','400 460');
    const L=N?{h1:20,fx:12,fy:62,fw:376,vy:100,cx:44,cy:186,cw:340,ch:116,h2:172,sh:352,ax0:30,ax1:380,ay:404}
             :{h1:22,fx:14,fy:70,fw:336,vy:112,cx:398,cy:40,cw:306,ch:150,h2:22,sh:250,ax0:44,ax1:700,ay:296};
    let s='';
    s+=tx(L.fx,L.h1,NF_TXT.h1,'t-xs','letter-spacing:.08em');
    const broke=t>.1,F=nerveFibre(L.fx,L.fy,L.fw,{n:4,h:28,cut:broke?.55:undefined,regrow:ramp(t,.62,1)});s+=F.svg;
    const bp=F.at.cut||[L.fx+L.fw*.55,L.fy];
    if(broke&&t<.6)s+=kitLabel(bp[0],L.fy-22,NF_TXT.brk,{a:'m'});
    /* blood vessel */
    s+=`<rect x="${L.fx}" y="${L.vy}" width="${L.fw}" height="34" rx="17" style="fill:var(--blood);opacity:.16"/><rect x="${L.fx}" y="${L.vy}" width="${L.fw}" height="34" rx="17" style="fill:none;stroke:var(--blood);stroke-width:1.6"/>`;
    s+=kitLabel(L.fx+14,L.vy+21,NF_TXT.blood,{});
    const lvl=broke?NF_F(t):NF_F(0)*.6,np=Math.round(lvl*30),rr=rng(5);
    for(let i=0;i<30;i++){const px=L.fx+60+rr()*(L.fw-74),py=L.vy+8+rr()*18,sp=rr();if(i>=np)continue;
      const xx=L.fx+60+((px-L.fx-60+t*240*(.5+sp))%(L.fw-74));s+=`<circle cx="${f1(xx)}" cy="${f1(py)}" r="2.6" style="fill:var(--protein);stroke:var(--ink);stroke-width:.6"/>`}
    if(broke&&t<.62)for(let j=0;j<3;j++){const f=((t*5)+j/3)%1;s+=`<circle cx="${f1(bp[0]+(j-1)*5)}" cy="${f1(lerp(L.fy+12,L.vy+12,f))}" r="2.6" style="fill:var(--protein);stroke:var(--ink);stroke-width:.6;opacity:${f1(1-f*.4)}"/>`}
    /* time course */
    s+=tx(N?12:L.cx,L.h2,NF_TXT.h2,'t-xs','letter-spacing:.08em');
    const C=curve(L.cx,L.cy,L.cw,L.ch,NF_F,{upto:t,col:'var(--care)',fill:true,dot:true,bands:[{from:0,to:.16,col:'var(--good)',label:NF_TXT.band}]});s+=C.svg;
    s+=tx(L.cx-6,L.cy+10,NF_TXT.hi,'t-xs t-end')+tx(L.cx-6,L.cy+L.ch,NF_TXT.lo,'t-xs t-end');
    [0,.2,.3,.7,1].forEach((u,i)=>{s+=tx(C.X(u),L.cy+L.ch+14,NF_TXT.ax[i],'t-xs'+(i===0?'':i===4?' t-end':' t-mid'))});
    /* log strip */
    const lg=v=>Math.log10(v),A=v=>L.ax0+(L.ax1-L.ax0)*(lg(v)-lg(5))/(lg(500)-lg(5));
    s+=tx(N?12:14,L.sh,nfMode==='med'?(N?NF_TXT.medN:NF_TXT.med):(N?NF_TXT.cutN:NF_TXT.cut),'t-xs',INK+';letter-spacing:.06em');
    s+=`<line x1="${L.ax0}" x2="${L.ax1}" y1="${L.ay}" y2="${L.ay}" class="axis"/>`;
    [10,30,100,300].forEach(v=>{s+=`<line x1="${f1(A(v))}" x2="${f1(A(v))}" y1="${L.ay-4}" y2="${L.ay+4}" class="axis"/>`+tx(A(v),L.ay+38,v,'t-xs t-mid')});
    const pts=nfMode==='med'?NF_MED:NF_CUT;
    pts.forEach(m=>{const x=A(m.v),lab=N&&m.ln?m.ln:m.l,hw=lab.length*2.9,y=m.up?L.ay-12:L.ay+20;
      let cls='t-xs t-mid',lx=x;if(x+hw>L.ax1+12){cls='t-xs t-end';lx=Math.min(x+6,(N?392:712))}else if(x-hw<8){cls='t-xs';lx=Math.max(8,x-6)}
      s+=nfMode==='med'?`<circle cx="${f1(x)}" cy="${L.ay}" r="5" style="fill:var(--care);stroke:var(--panel);stroke-width:1.5"/>`
        :`<line x1="${f1(x)}" x2="${f1(x)}" y1="${L.ay-8}" y2="${L.ay+8}" style="stroke:var(--ink);stroke-width:2.4;stroke-dasharray:3 2"/>`;
      s+=tx(lx,y,lab,cls,INK)});
    ns.innerHTML=s;
    const ph=t<.33?0:t<.66?1:2;nc.innerHTML=NF_CAP[ph];
    nr.setAttribute('aria-valuetext',NF_CAP[ph].replace(/<[^>]+>/g,'').split(':')[0])}
  playWire(nr,$('#nfPlay'),drawN,12000,'Replay','frontier');
  $$('[data-nf]').forEach(b=>b.addEventListener('click',()=>{nfMode=b.dataset.nf;$$('[data-nf]').forEach(c=>c.setAttribute('aria-pressed',c===b));drawN(+nr.value)}));
  drawN(+nr.value);
  const prev=redraws.frontier;redraws.frontier=()=>{prev&&prev();drawX()};
};
/* =============== 6.1 history & people =============== */
/* Nine eras share the slider equally; within an era the year runs from its y0 to the next era's y0. */
const HI_END=2026;
const HI_STEPS=[
 {y0:1855,main:1859,k:'Before 1916',pp:'Octave Landry and others',t:'Before the name',
  cap:['Landry, 1859: a paralysis that climbs','from the legs, in ten patients','1891: Quincke describes lumbar puncture'],
  txt:'In 1859 Octave Landry described "ascending paralysis" in ten patients, stressing motor paralysis and a poor prognosis. He noted convalescence from illness, childbirth and cold as circumstances, and treated with massage, liniments and electric stimulation. <sup class="c" data-ref="Afifi1994" title="Source 5"><a href="/guillain-barre-syndrome/sources/#src-Afifi1994">5</a></sup> Duménil, Osler and Grainger Stewart reported similar cases before 1916, without lumbar puncture. <sup class="c" data-ref="Freitas2017" title="Source 140"><a href="/guillain-barre-syndrome/sources/#src-Freitas2017">140</a></sup> Quincke described lumbar puncture in 1891. <sup class="c" data-ref="Afifi1994" title="Source 5"><a href="/guillain-barre-syndrome/sources/#src-Afifi1994">5</a></sup>',
  pt:'Doctors described a paralysis that climbed up the body long before it had its modern name.',
  hook:'Landry, 1859: "ascending paralysis". <sup class="c" data-ref="Afifi1994" title="Source 5"><a href="/guillain-barre-syndrome/sources/#src-Afifi1994">5</a></sup>'},
 {y0:1916,main:1916,k:'1916',pp:'Guillain, Barré and Strohl',t:'1916: the spinal fluid clue',
  cap:['Two soldiers with paralysis','CSF protein high, cells normal','reflexes recorded by Strohl'],
  txt:'In 1916 Guillain, Barré and Strohl reported two French soldiers with acute flaccid paralysis, high protein in the cerebrospinal fluid (CSF) and normal cell counts. <sup class="c" data-ref="Guillain1916,Goodfellow2016,Waclawik2018" title="Source 160,171,490"><a href="/guillain-barre-syndrome/sources/#src-Guillain1916">160,171,490</a></sup> The paper appeared in the bulletin of the Paris hospital medical society and did not mention Landry. <sup class="c" data-ref="Afifi1994" title="Source 5"><a href="/guillain-barre-syndrome/sources/#src-Afifi1994">5</a></sup> Strohl contributed recordings of the tendon reflexes, an early step towards bedside electrodiagnosis; later papers dropped his name, for reasons that are disputed. <sup class="c" data-ref="Waclawik2018,Afifi1994" title="Source 5,490"><a href="/guillain-barre-syndrome/sources/#src-Waclawik2018">5,490</a></sup>',
  pt:'The name comes from French doctors who, in 1916, found lots of protein but few cells in the spinal fluid of two soldiers with paralysis.',
  hook:'Albuminocytological dissociation dates from the 1916 report, in two soldiers. <sup class="c" data-ref="Goodfellow2016,Waclawik2018" title="Source 160,490"><a href="/guillain-barre-syndrome/sources/#src-Goodfellow2016">160,490</a></sup> See <a href="#csf" data-go="csf">Lumbar puncture &amp; CSF</a>.'},
 {y0:1949,main:1949,k:'1949 to 1955',pp:'Haymaker, Kernohan; Waksman, Adams',t:'Where is the lesion?',
  cap:['1949: early lesions in the spinal nerves','1955: allergic neuritis in rabbits','an immune cause is suggested'],
  txt:'Haymaker and Kernohan reported 50 fatal cases in 1949 (32 died between days 2 and 10). They placed the early lesions in the spinal nerves and brought Landry\'s paralysis, acute febrile polyneuritis and GBS under one heading. <sup class="c" data-ref="Haymaker1949,Berciano2017" title="Source 34,182"><a href="/guillain-barre-syndrome/sources/#src-Haymaker1949">34,182</a></sup> Bickerstaff and Cloake described mesencephalitis and rhombencephalitis in 1951. <sup class="c" data-ref="Bickerstaff1951" title="Source 46"><a href="/guillain-barre-syndrome/sources/#src-Bickerstaff1951">46</a></sup> In 1955 Waksman and Adams produced experimental allergic neuritis in rabbits with peripheral nerve tissue and adjuvants, with raised CSF protein and usually normal cells: their model pointed to an immune cause. <sup class="c" data-ref="Waksman1955,Afifi1994" title="Source 5,495"><a href="/guillain-barre-syndrome/sources/#src-Waksman1955">5,495</a></sup>',
  pt:'Doctors found where the damage starts, in the nerve roots, and showed in animals that the immune system can cause it.',
  hook:'Experimental allergic neuritis (1955): the animal model that pointed to an immune cause. <sup class="c" data-ref="Waksman1955" title="Source 495"><a href="/guillain-barre-syndrome/sources/#src-Waksman1955">495</a></sup>'},
 {y0:1956,main:1956,k:'1956 to 1969',pp:'Fisher; Bickerstaff; Asbury, Arnason, Adams',t:'Variants and inflammation',
  cap:['1956: eyes, balance, reflexes (Fisher)','1957: a brainstem form (Bickerstaff)','1969: immune cells and stripped myelin'],
  txt:'Fisher described ophthalmoplegia, ataxia and areflexia in 1956, as a variant of acute idiopathic polyneuritis. <sup class="c" data-ref="Fisher1956" title="Source 127"><a href="/guillain-barre-syndrome/sources/#src-Fisher1956">127</a></sup> Bickerstaff followed in 1957 with "a grave syndrome with benign prognosis"; a 2003 series of 62 cases found anti-GQ1b IgG in 66%. <sup class="c" data-ref="Bickerstaff1957,Odaka2003" title="Source 47,335"><a href="/guillain-barre-syndrome/sources/#src-Bickerstaff1957">47,335</a></sup> In 1969 Asbury, Arnason and Adams showed inflammatory cells around small veins with segmental demyelination across roots, ganglia, cranial nerves, plexuses and peripheral nerves, and disputed oedema as the main lesion. <sup class="c" data-ref="Asbury1969,Afifi1994" title="Source 5,22"><a href="/guillain-barre-syndrome/sources/#src-Asbury1969">5,22</a></sup>',
  pt:'Doctors recognised forms that affect the eyes and balance, and saw immune cells gathered in damaged nerves.',
  hook:'The Miller Fisher triad: ophthalmoplegia, ataxia, areflexia (1956). <sup class="c" data-ref="Fisher1956" title="Source 127"><a href="/guillain-barre-syndrome/sources/#src-Fisher1956">127</a></sup> See <a href="#mfs" data-go="mfs">Miller Fisher &amp; other variants</a>.'},
 {y0:1976,main:1976,k:'1976',pp:'Schonberger and colleagues',t:'1976: the swine flu vaccine',
  cap:['16 December 1976: programme suspended','1,098 cases, 532 recently vaccinated','about 1 extra case per 100,000'],
  txt:'The US swine influenza vaccination programme was suspended on 16 December 1976 after reports of GBS. Surveillance found 1,098 cases, 532 of them recently vaccinated. The attributable risk was just under 1 case per 100,000 vaccinations in adults, concentrated within 5 weeks of vaccination. <sup class="c" data-ref="Schonberger1979" title="Source 400"><a href="/guillain-barre-syndrome/sources/#src-Schonberger1979">400</a></sup> Later influenza vaccine studies suggest about 1 additional case per million vaccinations. <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup> Why 1976 differed is unresolved: vaccines of that era and later ones induced anti-GM1 antibodies in mice, and <i>C. jejuni</i> was not found in the 1976 vaccines. <span class="ev early">Early evidence</span> <sup class="c" data-ref="Nachamkin2008,Sejvar2011Flu" title="Source 311,406"><a href="/guillain-barre-syndrome/sources/#src-Nachamkin2008">311,406</a></sup>',
  pt:'In 1976 a flu vaccine in the United States was linked to a small rise in GBS, about 1 extra case for every 100,000 people vaccinated. Later flu vaccines carry a much smaller risk.',
  hook:'1976: about 1 extra case per 100,000 vaccinations; later influenza vaccines about 1 per million. <sup class="c" data-ref="Schonberger1979,Leonhard2019" title="Source 266,400"><a href="/guillain-barre-syndrome/sources/#src-Schonberger1979">266,400</a></sup> See <a href="#vaccines" data-go="vaccines">Vaccines &amp; GBS</a>.'},
 {y0:1978,main:1978,k:'1978 to 1985',pp:'NINCDS; Hughes; Brettle and colleagues',t:'Criteria and the first treatments',
  cap:['1978: NINCDS diagnostic criteria','1978: prednisolone trial, no benefit','1978 to 1985: plasma exchange works'],
  txt:'The NINCDS diagnostic criteria were published in 1978, prompted by the need for firm criteria after the vaccine episode, and reaffirmed with expanded electrodiagnostic criteria in 1990. <sup class="c" data-ref="NINCDS1978,Afifi1994,Asbury1990" title="Source 5,23,333"><a href="/guillain-barre-syndrome/sources/#src-NINCDS1978">5,23,333</a></sup> Also in 1978, a randomised trial of prednisolone in 40 people concluded that steroid treatment "is not beneficial and can be detrimental". <sup class="c" data-ref="Hughes1978" title="Source 194"><a href="/guillain-barre-syndrome/sources/#src-Hughes1978">194</a></sup> Plasma exchange was first reported from Hammersmith Hospital in 1978, <sup class="c" data-ref="Brettle1978,Afifi1994" title="Source 5,58"><a href="/guillain-barre-syndrome/sources/#src-Brettle1978">5,58</a></sup> and the US trial of 245 people confirmed its benefit in 1985. <sup class="c" data-ref="GBSStudyGroup1985" title="Source 155"><a href="/guillain-barre-syndrome/sources/#src-GBSStudyGroup1985">155</a></sup>',
  pt:'Doctors agreed how to diagnose GBS, learned that steroid tablets did not help, and found that cleaning antibodies out of the blood (plasma exchange) did.',
  hook:'Steroids: no benefit (1978). Plasma exchange: benefit confirmed in 245 people (1985). <sup class="c" data-ref="Hughes1978,GBSStudyGroup1985" title="Source 155,194"><a href="/guillain-barre-syndrome/sources/#src-Hughes1978">155,194</a></sup>'},
 {y0:1986,main:1993,k:'1986 to 1995',pp:'Feasby; Yuki; McKhann; Griffin; Chiba',t:'Axons, antibodies and Campylobacter',
  cap:['1986: an axonal form is proposed','1990 to 1993: C. jejuni and anti-GM1','1993: AMAN named, mimicry shown'],
  txt:'Feasby and colleagues proposed an acute axonal form in 1986. <sup class="c" data-ref="Feasby1986" title="Source 124"><a href="/guillain-barre-syndrome/sources/#src-Feasby1986">124</a></sup> Yuki and colleagues linked anti-GM1 antibodies after <i>C. jejuni</i> enteritis to axonal GBS in 1990, <sup class="c" data-ref="Yuki1990" title="Source 525"><a href="/guillain-barre-syndrome/sources/#src-Yuki1990">525</a></sup> and in 1993 showed that a <i>C. jejuni</i> strain from a person with GBS carried a GM1-like structure, the first demonstration of this mimicry. <sup class="c" data-ref="Yuki1993" title="Source 526"><a href="/guillain-barre-syndrome/sources/#src-Yuki1993">526</a></sup> McKhann and colleagues studied summer epidemics in northern China and named acute motor axonal neuropathy (AMAN) in 1993; autopsies gave it a structural basis in 1995. <sup class="c" data-ref="McKhann1991,McKhann1993,Griffin1995" title="Source 166,290,291"><a href="/guillain-barre-syndrome/sources/#src-McKhann1991">166,290,291</a></sup> Chiba linked anti-GQ1b to Miller Fisher syndrome in 1992. <sup class="c" data-ref="Chiba1992" title="Source 77"><a href="/guillain-barre-syndrome/sources/#src-Chiba1992">77</a></sup> Meanwhile the French trial confirmed plasma exchange (1987) and the Dutch trial found IVIg at least as effective (1992). <sup class="c" data-ref="FrenchPE1987,vanDerMeche1992" title="Source 143,468"><a href="/guillain-barre-syndrome/sources/#src-FrenchPE1987">143,468</a></sup>',
  pt:'Researchers found that a common gut germ carries a sugar that looks like part of the nerve, so antibodies made against the germ can hit the nerve.',
  hook:'In 129 Chinese patients (1991 to 1992), 65% had AMAN; 66% of 38 tested had recent <i>C. jejuni</i> evidence, against 16% of village controls. <sup class="c" data-ref="Ho1995" title="Source 190"><a href="/guillain-barre-syndrome/sources/#src-Ho1995">190</a></sup>'},
 {y0:1996,main:1997,k:'1996 to 2011',pp:'Plasma Exchange/Sandoglobulin Trial Group; Yuki',t:'Equal treatments, proof in animals',
  cap:['1997: plasma exchange and IVIg equal','combining them: no significant gain','2004: mimicry reproduced in rabbits'],
  txt:'A trial of 383 people in 1997 found plasma exchange and IVIg equivalent, with no significant advantage from combining them. <sup class="c" data-ref="PSGBS1997" title="Source 362"><a href="/guillain-barre-syndrome/sources/#src-PSGBS1997">362</a></sup> Mean improvement at 4 weeks was 0.9 grades with plasma exchange, 0.8 with IVIg and 1.1 with both. <sup class="c" data-ref="PSGBS1997" title="Source 362"><a href="/guillain-barre-syndrome/sources/#src-PSGBS1997">362</a></sup> Its nerve conduction analysis classified 69% as demyelinating and 3% as axonal. <sup class="c" data-ref="Hadden1998" title="Source 173"><a href="/guillain-barre-syndrome/sources/#src-Hadden1998">173</a></sup> In 2004 Yuki\'s group induced the disease in rabbits with the <i>C. jejuni</i> material. <sup class="c" data-ref="Yuki2004" title="Source 532"><a href="/guillain-barre-syndrome/sources/#src-Yuki2004">532</a></sup>',
  pt:'Big trials showed the two main treatments work about equally well, and experiments in animals confirmed how the germ sets off the attack.',
  hook:'Plasma exchange = IVIg; combining them added no significant benefit (1997). <sup class="c" data-ref="PSGBS1997" title="Source 362"><a href="/guillain-barre-syndrome/sources/#src-PSGBS1997">362</a></sup>'},
 {y0:2012,main:2012,k:'2012 onwards',pp:'The IGOS Consortium and many others',t:'A global view',
  cap:['2012: IGOS starts recruiting','2019 and 2023: international guidelines','outbreaks: Zika, Peru, Pune'],
  txt:'The International GBS Outcome Study (IGOS) began recruiting in May 2012; by January 2017 it had more than 1,400 participants from 143 centres in 19 countries on 5 continents. <sup class="c" data-ref="Jacobs2017" title="Source 211"><a href="/guillain-barre-syndrome/sources/#src-Jacobs2017">211</a></sup> Its first regional analysis appeared in 2018. <sup class="c" data-ref="Doets2018" title="Source 102"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102</a></sup> The Zika epidemics of 2013 and 2015 prompted a globally applicable guideline in 2019, <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup> and EAN and PNS published an evidence-graded guideline in 2023. <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup> Outbreaks continue, as in Peru in 2019 and Pune in 2025. <sup class="c" data-ref="Munayco2020,Viswanathan2026" title="Source 307,487"><a href="/guillain-barre-syndrome/sources/#src-Munayco2020">307,487</a></sup> A century on, complement inhibition became the first targeted immunotherapy to enter trials. <sup class="c" data-ref="Goodfellow2016" title="Source 160"><a href="/guillain-barre-syndrome/sources/#src-Goodfellow2016">160</a></sup>',
  pt:'Today doctors in many countries pool their data to learn what helps, and new treatments are being tested.',
  hook:'IGOS: 143 centres, 19 countries, 5 continents by 2017. <sup class="c" data-ref="Jacobs2017" title="Source 211"><a href="/guillain-barre-syndrome/sources/#src-Jacobs2017">211</a></sup> See <a href="#frontier" data-go="frontier">Research frontier</a>.'}
];
HI_STEPS.forEach((s,i)=>{const y1=i<HI_STEPS.length-1?HI_STEPS[i+1].y0:HI_END;s.from=i/HI_STEPS.length;s.at=s.from+(s.main-s.y0)/(y1-s.y0)/HI_STEPS.length+.004});
const HI_MS=[
 {y:1859,l:'Landry',txt:'Octave Landry describes "ascending paralysis" in ten patients. <sup class="c" data-ref="Afifi1994" title="Source 5"><a href="/guillain-barre-syndrome/sources/#src-Afifi1994">5</a></sup>'},
 {y:1891,l:'Quincke',txt:'Quincke describes lumbar puncture, the test behind the 1916 finding. <sup class="c" data-ref="Afifi1994" title="Source 5"><a href="/guillain-barre-syndrome/sources/#src-Afifi1994">5</a></sup>'},
 {y:1916,l:'Guillain, Barré, Strohl',txt:'Two soldiers with paralysis, lost reflexes, high CSF protein and normal cells. <sup class="c" data-ref="Guillain1916,Goodfellow2016,Waclawik2018" title="Source 160,171,490"><a href="/guillain-barre-syndrome/sources/#src-Guillain1916">160,171,490</a></sup>'},
 {y:1949,l:'Haymaker, Kernohan',txt:'50 fatal cases; early lesions located in the spinal nerves. <sup class="c" data-ref="Haymaker1949,Berciano2017" title="Source 34,182"><a href="/guillain-barre-syndrome/sources/#src-Haymaker1949">34,182</a></sup>'},
 {y:1951,l:'Bickerstaff, Cloake',txt:'Mesencephalitis and rhombencephalitis described. <sup class="c" data-ref="Bickerstaff1951" title="Source 46"><a href="/guillain-barre-syndrome/sources/#src-Bickerstaff1951">46</a></sup>'},
 {y:1955,l:'Waksman, Adams',txt:'Experimental allergic neuritis, an animal model. <sup class="c" data-ref="Waksman1955" title="Source 495"><a href="/guillain-barre-syndrome/sources/#src-Waksman1955">495</a></sup>'},
 {y:1956,l:'Fisher',txt:'Ophthalmoplegia, ataxia and areflexia described as a variant. <sup class="c" data-ref="Fisher1956" title="Source 127"><a href="/guillain-barre-syndrome/sources/#src-Fisher1956">127</a></sup>'},
 {y:1957,l:'Bickerstaff',txt:'Brainstem encephalitis with a benign prognosis. <sup class="c" data-ref="Bickerstaff1957" title="Source 47"><a href="/guillain-barre-syndrome/sources/#src-Bickerstaff1957">47</a></sup>'},
 {y:1969,l:'Asbury, Arnason, Adams',txt:'An inflammatory lesion with segmental demyelination. <sup class="c" data-ref="Asbury1969" title="Source 22"><a href="/guillain-barre-syndrome/sources/#src-Asbury1969">22</a></sup>'},
 {y:1976,l:'Swine flu vaccine',txt:'The US swine influenza vaccine programme is suspended over GBS. <sup class="c" data-ref="Schonberger1979" title="Source 400"><a href="/guillain-barre-syndrome/sources/#src-Schonberger1979">400</a></sup>'},
 {y:1978,l:'NINCDS criteria',txt:'NINCDS diagnostic criteria published. <sup class="c" data-ref="NINCDS1978" title="Source 333"><a href="/guillain-barre-syndrome/sources/#src-NINCDS1978">333</a></sup>'},
 {y:1978,l:'Prednisolone trial',txt:'A randomised trial finds no benefit from prednisolone. <sup class="c" data-ref="Hughes1978" title="Source 194"><a href="/guillain-barre-syndrome/sources/#src-Hughes1978">194</a></sup>'},
 {y:1978,l:'Plasma exchange',txt:'First report of plasma exchange, from Hammersmith Hospital. <sup class="c" data-ref="Brettle1978" title="Source 58"><a href="/guillain-barre-syndrome/sources/#src-Brettle1978">58</a></sup>'},
 {y:1985,l:'US plasmapheresis trial',txt:'Plasma exchange benefit shown in 245 people. <sup class="c" data-ref="GBSStudyGroup1985" title="Source 155"><a href="/guillain-barre-syndrome/sources/#src-GBSStudyGroup1985">155</a></sup>'},
 {y:1986,l:'Axonal form',txt:'Feasby and colleagues propose an acute axonal form. <sup class="c" data-ref="Feasby1986" title="Source 124"><a href="/guillain-barre-syndrome/sources/#src-Feasby1986">124</a></sup>'},
 {y:1987,l:'French trial',txt:'Plasma exchange confirmed in 220 people; albumin favoured as replacement fluid. <sup class="c" data-ref="FrenchPE1987" title="Source 143"><a href="/guillain-barre-syndrome/sources/#src-FrenchPE1987">143</a></sup>'},
 {y:1990,l:'Anti-GM1',txt:'Anti-GM1 antibodies after <i>C. jejuni</i> in axonal GBS. <sup class="c" data-ref="Yuki1990" title="Source 525"><a href="/guillain-barre-syndrome/sources/#src-Yuki1990">525</a></sup>'},
 {y:1990,l:'Criteria revised',txt:'Criteria reaffirmed, with electrodiagnosis expanded. <sup class="c" data-ref="Asbury1990" title="Source 23"><a href="/guillain-barre-syndrome/sources/#src-Asbury1990">23</a></sup>'},
 {y:1991,l:'Northern China',txt:'The summer paralytic disease of northern China characterised. <sup class="c" data-ref="McKhann1991" title="Source 290"><a href="/guillain-barre-syndrome/sources/#src-McKhann1991">290</a></sup>'},
 {y:1992,l:'Dutch IVIg trial',txt:'IVIg at least as effective as plasma exchange: 53% vs 34% improved by a grade at 4 weeks. <sup class="c" data-ref="vanDerMeche1992" title="Source 468"><a href="/guillain-barre-syndrome/sources/#src-vanDerMeche1992">468</a></sup>'},
 {y:1992,l:'Anti-GQ1b',txt:'Anti-GQ1b IgG in all six people with Miller Fisher syndrome tested, and in no controls. <sup class="c" data-ref="Chiba1992" title="Source 77"><a href="/guillain-barre-syndrome/sources/#src-Chiba1992">77</a></sup>'},
 {y:1993,l:'AMAN named',txt:'Acute motor axonal neuropathy named as a distinct syndrome. <sup class="c" data-ref="McKhann1993" title="Source 291"><a href="/guillain-barre-syndrome/sources/#src-McKhann1993">291</a></sup>'},
 {y:1993,l:'GM1-like sugar',txt:'A GM1-like structure found on <i>C. jejuni</i>. <sup class="c" data-ref="Yuki1993" title="Source 526"><a href="/guillain-barre-syndrome/sources/#src-Yuki1993">526</a></sup>'},
 {y:1995,l:'Autopsies',txt:'Autopsies in northern China give AMAN a structural basis. <sup class="c" data-ref="Griffin1995" title="Source 166"><a href="/guillain-barre-syndrome/sources/#src-Griffin1995">166</a></sup>'},
 {y:1997,l:'PE and IVIg equal',txt:'Plasma exchange and IVIg equivalent in 383 people. <sup class="c" data-ref="PSGBS1997" title="Source 362"><a href="/guillain-barre-syndrome/sources/#src-PSGBS1997">362</a></sup>'},
 {y:2004,l:'Rabbit model',txt:'Mimicry reproduced in rabbits. <sup class="c" data-ref="Yuki2004" title="Source 532"><a href="/guillain-barre-syndrome/sources/#src-Yuki2004">532</a></sup>'},
 {y:2012,l:'IGOS',txt:'The International GBS Outcome Study starts recruiting. <sup class="c" data-ref="Jacobs2017" title="Source 211"><a href="/guillain-barre-syndrome/sources/#src-Jacobs2017">211</a></sup>'},
 {y:2013,l:'Zika',txt:'Zika outbreak and GBS in French Polynesia: 42 people. <sup class="c" data-ref="CaoLormeau2016" title="Source 68"><a href="/guillain-barre-syndrome/sources/#src-CaoLormeau2016">68</a></sup>'},
 {y:2019,l:'Global guideline',txt:'A ten-step guideline for clinicians worldwide. <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>'},
 {y:2019,l:'Peru outbreak',txt:'683 cases across nine departments. <sup class="c" data-ref="Munayco2020,Ramos2021" title="Source 307,370"><a href="/guillain-barre-syndrome/sources/#src-Munayco2020">307,370</a></sup>'},
 {y:2023,l:'EAN/PNS guideline',txt:'An evidence-graded guideline. <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>'},
 {y:2025,l:'Pune outbreak',txt:'230 cases with 12 deaths. <sup class="c" data-ref="Viswanathan2026" title="Source 487"><a href="/guillain-barre-syndrome/sources/#src-Viswanathan2026">487</a></sup>'}
];
/* glyph labels, one set per era */
const HI_G={
 asc:'ascending paralysis',lp:'1891: lumbar puncture',
 sol:'two soldiers',refl:'reflex recording (Strohl)',prot:'protein: high',cell:'cells: normal',csf:'spinal fluid',
 root:'spinal nerve root',rab:'1955: the same picture in rabbits',
 fis1:'eyes, balance,',fis2:'reflexes (1956)',infl:'immune cells, stripped myelin (1969)',
 vax:'vaccine',bar:'GBS cases found by surveillance: 1,098',barv:'532 recently vaccinated',cal1:'16',cal2:'Dec',cal3:'programme suspended',
 crit:['criteria','1978'],ster:['steroids','no benefit'],plex:['plasma exchange','benefit'],
 cj:'<tspan style="font-style:italic">C. jejuni</tspan> sugar coat',gm1:'the same sugar on the nerve (GM1)',
 trh:'mean improvement at 4 weeks (grades)',tr:[{n:'plasma exchange',v:.9},{n:'IVIg',v:.8},{n:'both',v:1.1}],rab2:'2004: disease reproduced in rabbits',
 map:'schematic grid: longitude and latitude',eq:'equator',igos:'IGOS by 2017: 143 centres, 19 countries, 5 continents'
};
const HI_PINS=[{n:'French Polynesia 2013',y:2013,lon:-149,lat:-17,a:'below'},{n:'Peru 2019',y:2019,lon:-77,lat:-12,a:'above'},{n:'Pune 2025',y:2025,lon:74,lat:18.5,a:'above'}];
const HI_DEC_W=[1860,1880,1900,1920,1940,1960,1980,2000,2020],HI_DEC_N=[1860,1900,1940,1980,2020];
function hiYear(t){const n=HI_STEPS.length,i=Math.min(n-1,Math.floor(clamp(t)*n)),u=clamp(t)*n-i,y1=i<n-1?HI_STEPS[i+1].y0:HI_END;return lerp(HI_STEPS[i].y0,y1,clamp(u))}
function hiTOf(y){const n=HI_STEPS.length;for(let i=n-1;i>=0;i--){if(y>=HI_STEPS[i].y0){const y1=i<n-1?HI_STEPS[i+1].y0:HI_END;return (i+(y-HI_STEPS[i].y0)/(y1-HI_STEPS[i].y0))/n}}return 0}
/* small glyphs of this module */
function hiTube(x,y,w,h,o={}){const r=w/2;let s=`<path d="M${f1(x)} ${f1(y)}V${f1(y+h-r)}A${f1(r)} ${f1(r)} 0 0 0 ${f1(x+w)} ${f1(y+h-r)}V${f1(y)}" style="fill:none;stroke:var(--ink);stroke-width:1.6"/>`;
  const top=y+h*.22;s=`<path d="M${f1(x+1.5)} ${f1(top)}V${f1(y+h-r)}A${f1(r-1.5)} ${f1(r-1.5)} 0 0 0 ${f1(x+w-1.5)} ${f1(y+h-r)}V${f1(top)}Z" style="fill:var(--csf)"/>`+s;
  const rr=rng(17);for(let i=0;i<(o.prot||0);i++){s+=`<circle cx="${f1(x+4+rr()*(w-8))}" cy="${f1(top+6+rr()*(h*.72-14))}" r="2.4" style="fill:var(--protein)"/>`}
  [ [.35,.5],[.65,.78] ].forEach(([a,b])=>{s+=`<circle cx="${f1(x+w*a)}" cy="${f1(top+(y+h-top)*b)}" r="4.2" style="fill:var(--cell);stroke:var(--ink);stroke-width:.8"/>`});
  return s}
function hiVial(x,y,s){return `<rect x="${f1(x)}" y="${f1(y+s*.22)}" width="${f1(s*.5)}" height="${f1(s*.78)}" rx="${f1(s*.06)}" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.4"/><rect x="${f1(x+2)}" y="${f1(y+s*.45)}" width="${f1(s*.5-4)}" height="${f1(s*.53)}" rx="${f1(s*.04)}" style="fill:var(--ivig);opacity:.7"/><rect x="${f1(x-2)}" y="${f1(y)}" width="${f1(s*.5+4)}" height="${f1(s*.22)}" rx="3" style="fill:var(--device)"/>`}
function hiClip(x,y,w,h){let s=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="5" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.4"/><rect x="${f1(x+w*.3)}" y="${f1(y-5)}" width="${f1(w*.4)}" height="10" rx="3" style="fill:var(--device)"/>`;
  for(let i=0;i<4;i++){const yy=y+16+i*(h-24)/4;s+=`<path d="M${f1(x+8)} ${f1(yy)}l3 3l5 -6" style="fill:none;stroke:var(--good);stroke-width:1.8"/><line x1="${f1(x+20)}" x2="${f1(x+w-8)}" y1="${f1(yy)}" y2="${f1(yy)}" style="stroke:var(--muted);stroke-width:1.4"/>`}return s}
function hiPlex(cx,cy,s){const w=s,h=s*.8;return `<path d="M${f1(cx-w*.9)} ${f1(cy-h*.2)}H${f1(cx-w/2)}M${f1(cx+w/2)} ${f1(cy-h*.2)}H${f1(cx+w*.9)}" style="stroke:var(--blood);stroke-width:3;stroke-linecap:round"/><rect x="${f1(cx-w/2)}" y="${f1(cy-h/2)}" width="${f1(w)}" height="${f1(h)}" rx="6" style="fill:var(--filter);stroke:var(--ink);stroke-width:1.2"/><rect x="${f1(cx-w*.3)}" y="${f1(cy-h*.3)}" width="${f1(w*.6)}" height="${f1(h*.22)}" rx="3" style="fill:var(--panel)"/><path d="M${f1(cx)} ${f1(cy+h/2)}V${f1(cy+h*.75)}" style="stroke:var(--plasma);stroke-width:3"/><rect x="${f1(cx-w*.18)}" y="${f1(cy+h*.75)}" width="${f1(w*.36)}" height="${f1(h*.36)}" rx="4" style="fill:var(--plasma);stroke:var(--ink);stroke-width:1"/>`}

inits.history=()=>{
  const svg=$('#hiSvg'),rg=$('#hiT'),ms=$('#hiMs'),yb=$('#hiYears');
  yb.innerHTML=HI_MS.map((m,i)=>`<button class="tag" data-m="${i}" aria-pressed="false">${m.y} · ${m.l}</button>`).join('');
  const V=[
    /* 0 Landry, Quincke */
    (B,N,u,yr)=>{let s=bodyFront(B.x+70,B.y+6,200,{level:.85*ease(clamp(u/.8)),tingle:ramp(u,.05,.2)}).svg+kitLabel(B.x+150,B.y+46,HI_G.asc,{});
      if(yr>=1891){const o=ramp(yr,1891,1900),x0=B.x+170,y0=B.y+118;s+=`<g style="opacity:${f1(o)}"><rect x="${x0}" y="${y0}" width="96" height="20" rx="4" style="fill:var(--panel);stroke:var(--device);stroke-width:1.6"/><rect x="${x0+60}" y="${y0+3}" width="34" height="14" rx="2" style="fill:var(--csf)"/><path d="M${x0-26} ${y0+10}H${x0}M${x0+96} ${y0+10}H${x0+150}" style="stroke:var(--device);stroke-width:2.2;stroke-linecap:round"/>`+kitLabel(x0+62,y0+42,HI_G.lp,{a:'m'})+'</g>'}
      return s},
    /* 1 1916 */
    (B,N,u)=>{let s=person(B.x+48,B.y+24,96,'var(--muted)')+person(B.x+120,B.y+24,96,'var(--muted)')+kitLabel(B.x+84,B.y+140,HI_G.sol,{a:'m'});
      let d='';for(let i=0;i<=40;i++){const x=B.x+20+i*3.5,amp=i>14&&i<20?(1-u)*14:0;d+=(i?'L':'M')+f1(x)+' '+f1(B.y+172-amp*Math.sin((i-14)*Math.PI/6))}
      s+=`<path d="${d}" style="fill:none;stroke:var(--impulse);stroke-width:2"/>`+kitLabel(B.x+90,B.y+198,HI_G.refl,{a:'m'});
      s+=hiTube(B.x+228,B.y+14,34,176,{prot:Math.round(4+28*ramp(u,.05,.7))})+kitLabel(B.x+245,B.y+8,HI_G.csf,{a:'m'});
      s+=kitLabel(B.x+272,B.y+90,HI_G.prot,{})+kitLabel(B.x+272,B.y+130,HI_G.cell,{});return s},
    /* 2 1949-1955 */
    (B,N,u,yr)=>{const dm=ramp(u,.1,.8);let s=kitLabel(B.x+10,B.y+20,HI_G.root,{});
      s+=nerveFibre(B.x+10,B.y+96,B.w-20,{n:4,h:40,demy:[dm*.9,dm,dm*.6,dm*.3],mac:[0,dm,dm*.5,0],pulse:(u*6)%1,block:dm>.5?1:undefined}).svg;
      if(yr>=1955)s+=kitLabel(B.x+B.w/2,B.y+170,HI_G.rab,{a:'m'});return s},
    /* 3 1956-1969 */
    (B,N,u,yr)=>{const e=ramp(u,.05,.3);let s=bodyFront(B.x+60,B.y+8,168,{zones:{eyes:e,legs:e*.25}}).svg;
      s+=kitLabel(B.x+60,B.y+198,HI_G.fis1,{a:'m'})+kitLabel(B.x+60,B.y+212,HI_G.fis2,{a:'m'});
      const inf=ramp(yr,1969,1975),fx=B.x+140,fw=B.w-146;
      s+=nerveFibre(fx,B.y+96,fw,{n:3,h:36,demy:[inf*.6,inf,inf*.4],mac:[0,inf,0]}).svg;
      if(inf>0){const rr=rng(5);for(let i=0;i<7;i++){s+=`<circle cx="${f1(fx+10+rr()*(fw-20))}" cy="${f1(B.y+96+(rr()>.5?1:-1)*(28+rr()*10))}" r="5" style="fill:var(--tcell);stroke:var(--ink);stroke-width:.8;opacity:${f1(inf)}"/>`}
        s+=kitLabel(fx+fw/2,B.y+160,HI_G.infl,{a:'m'})}return s},
    /* 4 1976 */
    (B,N,u)=>{let s=hiVial(B.x+30,B.y+40,96)+kitLabel(B.x+54,B.y+160,HI_G.vax,{a:'m'});
      const bx=B.x+120,bw=B.w-130,g=ease(ramp(u,.1,.7));
      s+=kitLabel(bx,B.y+56,HI_G.bar,{})+`<rect x="${bx}" y="${B.y+66}" width="${f1(bw)}" height="24" rx="5" style="fill:var(--panel-2);stroke:var(--line)"/><rect x="${bx}" y="${B.y+66}" width="${f1(bw*532/1098*g)}" height="24" rx="5" style="fill:var(--weak)"/>`;
      s+=kitLabel(bx,B.y+110,HI_G.barv,{});
      const o=ramp(u,.6,.8);s+=`<g style="opacity:${f1(o)}"><rect x="${bx}" y="${B.y+132}" width="56" height="58" rx="6" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.4"/><rect x="${bx}" y="${B.y+132}" width="56" height="15" rx="6" style="fill:var(--rx)"/><text x="${bx+28}" y="${B.y+144}" class="t-xs t-mid" style="fill:var(--panel);font-weight:700">${HI_G.cal2}</text><text x="${bx+28}" y="${B.y+180}" class="t-big t-mid" style="font-size:24px">${HI_G.cal1}</text></g>`+`<g style="opacity:${f1(o)}">`+kitLabel(bx+66,B.y+166,HI_G.cal3,{})+'</g>';return s},
    /* 5 1978-1985 */
    (B,N,u)=>{const cx=[B.x+B.w/6,B.x+B.w/2,B.x+B.w*5/6],op=[ramp(u,0,.2),ramp(u,.25,.45),ramp(u,.5,.7)];
      let s=`<g style="opacity:${f1(op[0])}">${hiClip(cx[0]-30,B.y+50,60,78)}</g>`;
      s+=`<g style="opacity:${f1(op[1])}">${pill(cx[1],B.y+90,56,{col:'var(--muted)'})}<path d="M${f1(cx[1]-30)} ${B.y+62}L${f1(cx[1]+30)} ${B.y+118}M${f1(cx[1]+30)} ${B.y+62}L${f1(cx[1]-30)} ${B.y+118}" style="stroke:var(--bad);stroke-width:3;stroke-linecap:round"/></g>`;
      s+=`<g style="opacity:${f1(op[2])}">${hiPlex(cx[2],B.y+84,50)}</g>`;
      [HI_G.crit,HI_G.ster,HI_G.plex].forEach((l,i)=>{s+=`<g style="opacity:${f1(op[i])}">`+kitLabel(cx[i],B.y+172,l[0],{a:'m'})+kitLabel(cx[i],B.y+186,l[1],{a:'m'})+'</g>'});return s},
    /* 6 1986-1995: mimicry */
    (B,N,u)=>{const k=N?.76:.8,nx=B.x+130,ab=ramp(u,.3,.7);let s=campy(B.x+56,B.y+70,64,{ang:-8,ph:u*6})+kitLabel(B.x+66,B.y+126,HI_G.cj,{a:'m'});
      const nz=nodeZoom(nx,B.y+14,k,{mode:'aman',ab,c3:ramp(u,.65,.95),nav:ramp(u,.75,1)*.6});s+=nz.svg;
      if(u>.08&&u<.5){const q=ramp(u,.08,.45);s+=antibody(lerp(B.x+100,nx+150*k,q),lerp(B.y+70,B.y+40,q),16,{ang:lerp(-60,180,q)})}
      s+=kitLabel(nx+150*k,B.y+14+190*k+16,HI_G.gm1,{a:'m'});return s},
    /* 7 1996-2011: trial bars */
    (B,N,u,yr)=>{const x0=B.x+118,bw=B.w-170,g=ease(ramp(u,.05,.5));let s=kitLabel(B.x,B.y+20,HI_G.trh,{});
      HI_G.tr.forEach((r,i)=>{const y=B.y+42+i*42;s+=`<text x="${B.x}" y="${y+16}" class="t-sm" style="fill:var(--ink);font-weight:700">${r.n}</text><rect x="${x0}" y="${y}" width="${f1(bw)}" height="22" rx="5" style="fill:var(--panel-2)"/><rect x="${x0}" y="${y}" width="${f1(Math.max(2,bw*r.v/1.2*g))}" height="22" rx="5" style="fill:var(--rx)"/><text x="${f1(x0+bw*r.v/1.2*g+6)}" y="${y+16}" class="t-xs" style="fill:var(--ink);font-weight:700">${r.v.toFixed(1)}</text>`});
      if(yr>=2004)s+=kitLabel(B.x+B.w/2,B.y+194,HI_G.rab2,{a:'m'});return s},
    /* 8 2012 on: map grid and pins */
    (B,N,u,yr)=>{const mx=B.x+6,mw=B.w-12,my=B.y+24,mh=150,X=lo=>mx+mw*(lo+180)/360,Y=la=>my+mh*(60-la)/110;
      let s=`<rect x="${mx}" y="${my}" width="${mw}" height="${mh}" rx="6" style="fill:var(--field);stroke:var(--line)"/>`;
      for(let lo=-120;lo<=120;lo+=60)s+=`<line x1="${f1(X(lo))}" x2="${f1(X(lo))}" y1="${my}" y2="${my+mh}" class="grid"/>`;
      [30,-30].forEach(la=>{s+=`<line x1="${mx}" x2="${mx+mw}" y1="${f1(Y(la))}" y2="${f1(Y(la))}" class="grid"/>`});
      s+=`<line x1="${mx}" x2="${mx+mw}" y1="${f1(Y(0))}" y2="${f1(Y(0))}" style="stroke:var(--muted);stroke-width:1"/><text x="${mx+mw-4}" y="${f1(Y(0)-4)}" class="t-xs t-end">${HI_G.eq}</text>`;
      s+=`<text x="${mx}" y="${B.y+14}" class="t-xs">${HI_G.map}</text>`;
      HI_PINS.forEach(p=>{if(yr<p.y)return;const x=X(p.lon),y=Y(p.lat),o=ramp(yr,p.y,p.y+1.5);s+=`<g style="opacity:${f1(o)}"><circle cx="${f1(x)}" cy="${f1(y)}" r="9" style="fill:var(--bad);opacity:.25"/><circle cx="${f1(x)}" cy="${f1(y)}" r="4.5" style="fill:var(--bad);stroke:var(--panel);stroke-width:1.5"/>`+kitLabel(x-6,p.a==='below'?y+18:y-10,p.n,{})+'</g>'});
      s+=kitLabel(B.x,B.y+200,HI_G.igos,{});return s}
  ];
  function draw(t){
    const N=vb(svg,'720 370','400 450');
    const L=N?{B:{x:16,y:76,w:368,h:220},cx:16,cy:318,cl:20,ax0:24,aw:352,ay:410,dec:HI_DEC_N}
             :{B:{x:16,y:76,w:384,h:220},cx:420,cy:110,cl:22,ax0:30,aw:660,ay:330,dec:HI_DEC_W};
    const n=HI_STEPS.length,p=phaseOf(HI_STEPS,t),P=HI_STEPS[p],yr=hiYear(t),u=clamp(t*n-p);
    const AX=y=>y<=1920?L.ax0+L.aw*.18*(y-1855)/65:L.ax0+L.aw*(.18+.82*(y-1920)/(HI_END-1920));
    let s=`<text x="16" y="44" class="t-big" style="font-size:32px;fill:var(--brand)">${Math.floor(yr)}</text><text x="${N?110:120}" y="30" class="t-sm" style="fill:var(--ink);font-weight:700">${P.t}</text><text x="${N?110:120}" y="46" class="t-xs">${P.pp}</text>`;
    s+=V[p](L.B,N,u,yr);
    P.cap.forEach((c,i)=>{s+=`<text x="${L.cx}" y="${L.cy+i*L.cl}" class="t-sm" style="fill:var(--ink)">${c}</text>`});
    /* timeline axis */
    const y1=p<n-1?HI_STEPS[p+1].y0:HI_END;
    s+=`<rect x="${f1(AX(P.y0))}" y="${L.ay-6}" width="${f1(AX(y1)-AX(P.y0))}" height="12" rx="6" style="fill:var(--brand-soft)"/><line x1="${L.ax0}" x2="${L.ax0+L.aw}" y1="${L.ay}" y2="${L.ay}" class="axis"/>`;
    L.dec.forEach(d=>{s+=`<line x1="${f1(AX(d))}" x2="${f1(AX(d))}" y1="${L.ay+4}" y2="${L.ay+9}" class="axis"/><text x="${f1(AX(d))}" y="${L.ay+22}" class="t-xs t-mid">${d}</text>`});
    const seen={};HI_MS.forEach(m=>{if(seen[m.y])return;seen[m.y]=1;const on=m.y<=yr;s+=`<circle cx="${f1(AX(m.y))}" cy="${L.ay}" r="3.4" style="fill:${on?'var(--brand)':'var(--panel)'};stroke:${on?'var(--brand)':'var(--muted)'};stroke-width:1.2"/>`});
    const cx=AX(yr);s+=`<path d="M${f1(cx-6)} ${L.ay-18}L${f1(cx+6)} ${L.ay-18}L${f1(cx)} ${L.ay-8}Z" style="fill:var(--ink)"/>`;
    svg.innerHTML=s;
    setSt(p);$('#hiNote').innerHTML=noteHTML(P);
    let last=-1;HI_MS.forEach((m,i)=>{if(m.y<=yr)last=m.y});
    const cur=HI_MS.filter(m=>m.y===last);
    ms.innerHTML=cur.map(m=>`<p><b>${m.y} · ${m.l}</b> ${m.txt}</p>`).join('');
    $$('[data-m]',yb).forEach(b=>{const m=HI_MS[+b.dataset.m];b.setAttribute('aria-pressed',m.y===last)});
  }
  const stop=playWire(rg,$('#hiPlay'),draw,36000,'Replay','history');
  const setSt=stepWire($('#hiSteps'),HI_STEPS,rg,draw,stop);
  yb.addEventListener('click',e=>{const b=e.target.closest('[data-m]');if(!b)return;stop();const y=HI_MS[+b.dataset.m].y,t=Math.min(1,hiTOf(y)+.0015);rg.value=t;draw(t)});
  draw(+rg.value);
};
/* =============== 6.2 flashcards & mnemonics =============== */
/* part names come from GROUPS in 01-config.js. Scope: triggers, molecular mimicry and vaccines are not covered here. */
const GBRV_PARTN=Object.fromEntries(Object.entries(GROUPS).map(([k,v])=>[k,`Part ${k} · ${v[0]}`]));
const GBRV_FC=[
 /* ---- Part 1: what, subtypes, mfs, course ---- */
 [1,`How does the 2023 EAN/PNS guideline define GBS?`,`As an acute polyradiculoneuropathy. Besides weakness and sensory disturbance, people may have cranial nerve involvement, respiratory insufficiency, autonomic dysfunction and pain <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>.`],
 [1,`What is the commonest cause of acute flaccid paralysis worldwide?`,`GBS <sup class="c" data-ref="Shahrizaila2021" title="Source 413"><a href="/guillain-barre-syndrome/sources/#src-Shahrizaila2021">413</a></sup>. About 100,000 people develop it each year worldwide <sup class="c" data-ref="Willison2016" title="Source 510"><a href="/guillain-barre-syndrome/sources/#src-Willison2016">510</a></sup>.`],
 [1,`How common is GBS in Western countries?`,`Median 1.11 per 100,000 person-years (range 0.81 to 1.89), rising 20% for every 10 years of age <sup class="c" data-ref="Sejvar2011" title="Source 404"><a href="/guillain-barre-syndrome/sources/#src-Sejvar2011">404</a></sup>.`],
 [1,`What share need ventilation, and what share die?`,`About 20% need mechanical ventilation, and 3 to 10% die even with the best care <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>. These are population figures.`],
 [1,`When do most deaths in GBS happen?`,`Up to two-thirds come in the recovery phase <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>. In the Dutch cohort, 67% of deaths were in recovery and only 47% in intensive care <sup class="c" data-ref="vanDenBerg2013" title="Source 463"><a href="/guillain-barre-syndrome/sources/#src-vanDenBerg2013">463</a></sup>.`],
 [1,`What does AIDP attack, and what does AMAN attack?`,`AIDP: the Schwann cell surface and myelin. AMAN: the axon membrane (axolemma) at the node of Ranvier <sup class="c" data-ref="HaferMacko1996AIDP,HaferMacko1996AMAN" title="Source 175,176"><a href="/guillain-barre-syndrome/sources/#src-HaferMacko1996AIDP">175,176</a></sup>.`],
 [1,`What is the earliest change seen in AMAN?`,`Lengthening of the node of Ranvier. Macrophages then enter at the node and move into the periaxonal space, under myelin that stays intact <sup class="c" data-ref="Griffin1996Nodal" title="Source 168"><a href="/guillain-barre-syndrome/sources/#src-Griffin1996Nodal">168</a></sup>.`],
 [1,`How common is the axonal subtype in Bangladesh and in Europe/Americas in IGOS?`,`36% in Bangladesh against 6% in Europe/Americas. Demyelinating was still the commonest subtype in every region <sup class="c" data-ref="Doets2018" title="Source 102"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102</a></sup>.`],
 [1,`What is reversible conduction failure?`,`A block or a low motor response that recovers quickly, with no sign of remyelination. It is attributed to impaired conduction at the nodes <sup class="c" data-ref="Kuwabara1998GM1,Kokubun2010" title="Source 232,252"><a href="/guillain-barre-syndrome/sources/#src-Kuwabara1998GM1">232,252</a></sup>.`],
 [1,`Does AMAN always recover slowly?`,`No. In northern China, median time to walk 5 m with help was 31 days in AMAN and 32 days in AIDP <sup class="c" data-ref="Ho1997Recovery" title="Source 191"><a href="/guillain-barre-syndrome/sources/#src-Ho1997Recovery">191</a></sup>.`],
 [1,`What is the Miller Fisher syndrome triad?`,`Ophthalmoplegia, ataxia and areflexia <sup class="c" data-ref="Mori2001MFS" title="Source 301"><a href="/guillain-barre-syndrome/sources/#src-Mori2001MFS">301</a></sup>. Its antibody is anti-GQ1b, which cross-reacts with GT1a <sup class="c" data-ref="Chiba1993" title="Source 78"><a href="/guillain-barre-syndrome/sources/#src-Chiba1993">78</a></sup>.`],
 [1,`How long should someone with Miller Fisher syndrome be watched for spread?`,`At least 7 days. In 60 people every overlap began within 7 days <sup class="c" data-ref="Sekiguchi2016" title="Source 407"><a href="/guillain-barre-syndrome/sources/#src-Sekiguchi2016">407</a></sup>, and in a Dutch cohort 43% developed limb weakness, all in week 1 <sup class="c" data-ref="Verboon2017MFS" title="Source 482"><a href="/guillain-barre-syndrome/sources/#src-Verboon2017MFS">482</a></sup>.`],
 [1,`What separates Bickerstaff brainstem encephalitis from Miller Fisher syndrome?`,`Disturbed consciousness or hyperreflexia, on top of ophthalmoplegia and ataxia <sup class="c" data-ref="Odaka2003" title="Source 335"><a href="/guillain-barre-syndrome/sources/#src-Odaka2003">335</a></sup>.`],
 [1,`Which antibody goes with the pharyngeal-cervical-brachial variant?`,`IgG anti-GT1a, in 51% of 100 people <sup class="c" data-ref="Nagashima2007" title="Source 313"><a href="/guillain-barre-syndrome/sources/#src-Nagashima2007">313</a></sup>.`],
 [1,`How fast do adults reach the nadir?`,`Within 2 weeks in 80%, 4 weeks in 97% and 6 weeks in all, in 494 Dutch adults <sup class="c" data-ref="Fokke2014" title="Source 131"><a href="/guillain-barre-syndrome/sources/#src-Fokke2014">131</a></sup>.`],

 /* ---- Part 2: signs, criteria, csf, ncs, ddx ---- */
 [2,`What two features are required by the NINDS criteria, as adapted?`,`Progressive bilateral weakness of arms and legs, and absent or decreased reflexes in affected limbs <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`],
 [2,`Which timings make GBS doubtful?`,`A nadir within 24 hours, or progression beyond 4 weeks <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`],
 [2,`How often does pain come before weakness?`,`In about one-third: 36% in the 2 weeks before weakness <sup class="c" data-ref="Ruts2010Pain" title="Source 392"><a href="/guillain-barre-syndrome/sources/#src-Ruts2010Pain">392</a></sup>.`],
 [2,`What separates Brighton level 1 from level 3?`,`Level 1 needs both CSF and nerve conduction support. Level 3 is clinical features only <sup class="c" data-ref="LopezHernandez2022" title="Source 277"><a href="/guillain-barre-syndrome/sources/#src-LopezHernandez2022">277</a></sup>.`],
 [2,`How does CSF protein change with time?`,`Raised in 49% on the first day and 88% after 2 weeks <sup class="c" data-ref="Fokke2014" title="Source 131"><a href="/guillain-barre-syndrome/sources/#src-Fokke2014">131</a></sup>. In IGOS: 50% within 3 days, 84% after 7 days <sup class="c" data-ref="Doets2018" title="Source 102"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102</a></sup>.`],
 [2,`What CSF cell count should prompt a search for another diagnosis?`,`More than 50 cells/µl <sup class="c" data-ref="Leonhard2019,vanDoorn2023" title="Source 266,473"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266,473</a></sup>.`],
 [2,`Is albuminocytological dissociation specific to GBS?`,`No. Among 2,627 samples with raised protein and few cells, a diagnosis explained it in only 57% <sup class="c" data-ref="Brooks2019" title="Source 59"><a href="/guillain-barre-syndrome/sources/#src-Brooks2019">59</a></sup>.`],
 [2,`Which antibody is tested in suspected Miller Fisher syndrome?`,`Anti-GQ1b, sensitivity 88 to 100% <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>. Treatment should not wait for antibody results <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`],
 [2,`What are the earliest nerve conduction signs in week 1?`,`Late responses: absent H reflex in 97% and abnormal F waves in 84% <sup class="c" data-ref="Gordon2001" title="Source 161"><a href="/guillain-barre-syndrome/sources/#src-Gordon2001">161</a></sup>.`],
 [2,`What is sural sparing?`,`Abnormal median or ulnar sensory responses with a normal sural response <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>. It is specific but insensitive <sup class="c" data-ref="Derksen2014" title="Source 97"><a href="/guillain-barre-syndrome/sources/#src-Derksen2014">97</a></sup>.`],
 [2,`Which nerve conduction finding predicted poor outcome in the North American trial?`,`A mean distal CMAP of 0 to 20% of the lower limit of normal <sup class="c" data-ref="Cornblath1988" title="Source 84"><a href="/guillain-barre-syndrome/sources/#src-Cornblath1988">84</a></sup>.`],
 [2,`How does botulism differ from GBS?`,`It descends from the cranial nerves, without fever (afebrile in 99%), in a person who stays alert <sup class="c" data-ref="Rao2021" title="Source 371"><a href="/guillain-barre-syndrome/sources/#src-Rao2021">371</a></sup>.`],
 [2,`What should be searched for before a GBS diagnosis is final?`,`A tick, over the whole body <sup class="c" data-ref="Edlow2010" title="Source 110"><a href="/guillain-barre-syndrome/sources/#src-Edlow2010">110</a></sup>. Removal brings rapid improvement, though Australian cases can worsen for 24 to 48 hours first <sup class="c" data-ref="GrattanSmith1997" title="Source 164"><a href="/guillain-barre-syndrome/sources/#src-GrattanSmith1997">164</a></sup>.`],
 [2,`Abdominal pain, psychological features and a neuropathy: what test is named?`,`Urinary porphobilinogen, for acute porphyria <sup class="c" data-ref="Albers2004,Anderson2005" title="Source 7,18"><a href="/guillain-barre-syndrome/sources/#src-Albers2004">7,18</a></sup>.`],
 [2,`When should acute-onset CIDP (A-CIDP) be suspected?`,`With worsening 8 weeks or more after onset, or 3 or more fluctuations <sup class="c" data-ref="Ruts2010,vanDoorn2023" title="Source 391,473"><a href="/guillain-barre-syndrome/sources/#src-Ruts2010">391,473</a></sup>.`],

 /* ---- Part 3: breathing, ivig, plex, whatnot, autonomic, icu ---- */
 [3,`What is the 20/30/40 rule?`,`Risk of respiratory failure with vital capacity below 20 mL/kg, MIP below 30 cmH2O, MEP below 40 cmH2O, or a fall of more than 30% <sup class="c" data-ref="Lawn2001" title="Source 263"><a href="/guillain-barre-syndrome/sources/#src-Lawn2001">263</a></sup>.`],
 [3,`Why measure breathing when the person says they feel fine?`,`Distress signs come late and breathlessness can be absent, so serial vital capacity comes first <sup class="c" data-ref="Orlikowski2004,Leonhard2019" title="Source 266,339"><a href="/guillain-barre-syndrome/sources/#src-Orlikowski2004">266,339</a></sup>.`],
 [3,`What three items make up EGRIS?`,`Days from onset to admission, facial or bulbar weakness, and MRC sum score; range 0 to 7 <sup class="c" data-ref="Doets2022" title="Source 104"><a href="/guillain-barre-syndrome/sources/#src-Doets2022">104</a></sup>. A score of 5 or more means about 65% risk of ventilation within a week <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`],
 [3,`Which single sign had the highest odds ratio for ventilation in the French model?`,`Inability to cough: odds ratio 9.09 <sup class="c" data-ref="Sharshar2003" title="Source 416"><a href="/guillain-barre-syndrome/sources/#src-Sharshar2003">416</a></sup>.`],
 [3,`What is the published IVIg regimen?`,`0.4 g/kg/day for 5 days, 2 g/kg in total <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>.`],
 [3,`What are the treatment windows tested in trials?`,`IVIg within 2 weeks of onset; plasma exchange within 4 weeks <sup class="c" data-ref="Leonhard2019,vanDoorn2023" title="Source 266,473"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266,473</a></sup>.`],
 [3,`Which is better, IVIg or plasma exchange?`,`Neither. They are equally effective, so the choice is driven by access and the person's circumstances <sup class="c" data-ref="vanDoorn2023,Hughes2014" title="Source 199,473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">199,473</a></sup>.`],
 [3,`What does plasma exchange do to the need for ventilation?`,`Risk ratio 0.53 against supportive care; improvement by a grade or more at 4 weeks, risk ratio 1.64 <sup class="c" data-ref="Chevret2017" title="Source 75"><a href="/guillain-barre-syndrome/sources/#src-Chevret2017">75</a></sup>.`],
 [3,`How many exchanges? (French trial, 1997)`,`Mild: two beat none. Moderate: four beat two. Ventilated: six were no better than four <sup class="c" data-ref="FrenchCooperative1997" title="Source 142"><a href="/guillain-barre-syndrome/sources/#src-FrenchCooperative1997">142</a></sup>.`],
 [3,`Do corticosteroids help GBS?`,`No. Steroids alone do not help, and oral steroids may slow recovery <sup class="c" data-ref="Hughes2016" title="Source 200"><a href="/guillain-barre-syndrome/sources/#src-Hughes2016">200</a></sup>.`],
 [3,`Does a second IVIg course help a poor prognosis?`,`No. In SID-GBS there was no benefit and more serious adverse events, 35% against 16% <sup class="c" data-ref="Walgaard2021" title="Source 499"><a href="/guillain-barre-syndrome/sources/#src-Walgaard2021">499</a></sup>.`],
 [3,`What is a treatment-related fluctuation?`,`Worsening within 2 months after first improving or stabilising on treatment. It affects 6 to 10% <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`],
 [3,`Which blood pressure pattern warned of bradycardia in ventilated people?`,`A daily systolic range above 85 mmHg <sup class="c" data-ref="Pfeiffer1999" title="Source 358"><a href="/guillain-barre-syndrome/sources/#src-Pfeiffer1999">358</a></sup>.`],
 [3,`Why is succinylcholine a concern after GBS?`,`It can cause hyperkalaemic cardiac arrest after denervation <sup class="c" data-ref="FDA-Quelicin" title="Source 122"><a href="/guillain-barre-syndrome/sources/#src-FDA-Quelicin">122</a></sup>, even within a month of apparent recovery <sup class="c" data-ref="Feldman1990" title="Source 125"><a href="/guillain-barre-syndrome/sources/#src-Feldman1990">125</a></sup>.`],
 [3,`At 1 week of ventilation, what predicts at least 14 days on the ventilator?`,`Being unable to lift the arms from the bed: 87% chance <sup class="c" data-ref="Walgaard2017" title="Source 498"><a href="/guillain-barre-syndrome/sources/#src-Walgaard2017">498</a></sup>.`],
 [3,`What does the EAN/PNS guideline say about pain drugs?`,`Gabapentinoids or tricyclics first, then carbamazepine; opioids with care <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>. Methylprednisolone does not treat GBS pain <sup class="c" data-ref="Liu2015" title="Source 273"><a href="/guillain-barre-syndrome/sources/#src-Liu2015">273</a></sup>.`],
 [3,`Does no improvement in 4 weeks mean treatment failed?`,`Not necessarily. About 40% do not improve in the first 4 weeks despite treatment <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`],

 /* ---- Part 4: prognosis, rehab, after ---- */
 [4,`How many people walk independently 6 months after GBS?`,`About 80%. About 20% cannot walk unaided, despite treatment <sup class="c" data-ref="Leonhard2019,vanDoorn2008" title="Source 266,471"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266,471</a></sup>.`],
 [4,`What are the inputs of EGOS?`,`Age, preceding diarrhoea and the GBS disability score at 2 weeks; range 1 to 7 <sup class="c" data-ref="vanKoningsveld2007,Busl2023" title="Source 63,475"><a href="/guillain-barre-syndrome/sources/#src-vanKoningsveld2007">63,475</a></sup>.`],
 [4,`What are the inputs of mEGOS?`,`Age, preceding diarrhoea and MRC sum score. Range 0 to 9 at admission and 0 to 12 at day 7 <sup class="c" data-ref="Papri2022mEGOS,Busl2023" title="Source 63,348"><a href="/guillain-barre-syndrome/sources/#src-Papri2022mEGOS">63,348</a></sup>.`],
 [4,`What outcome do EGOS and mEGOS predict?`,`Inability to walk unaided, not death or ventilation <sup class="c" data-ref="vanKoningsveld2007,Walgaard2011" title="Source 475,497"><a href="/guillain-barre-syndrome/sources/#src-vanKoningsveld2007">475,497</a></sup>.`],
 [4,`Is mEGOS more accurate at admission or at day 7?`,`At day 7: AUC 0.84 to 0.87, against 0.73 to 0.77 at admission <sup class="c" data-ref="Walgaard2011" title="Source 497"><a href="/guillain-barre-syndrome/sources/#src-Walgaard2011">497</a></sup>.`],
 [4,`Do people who needed a ventilator walk again?`,`Often. 79% of survivors in one ICU series walked independently <sup class="c" data-ref="Fletcher2000" title="Source 129"><a href="/guillain-barre-syndrome/sources/#src-Fletcher2000">129</a></sup>.`],
 [4,`What about ventilation beyond 2 months?`,`At 6 months, 18% walked unaided against 76% with shorter ventilation <sup class="c" data-ref="vanDenBerg2018" title="Source 466"><a href="/guillain-barre-syndrome/sources/#src-vanDenBerg2018">466</a></sup>. Some walked after more than a year.`],
 [4,`Can recovery continue after the first year?`,`Yes. Most recovery is in the first year, but gains can still come more than 5 years after onset <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`],
 [4,`What does serum neurofilament light add?`,`High levels early go with poorer walking outcome and add to mEGOS, but not to breathing prediction <sup class="c" data-ref="vanTilburg2024,Thomma2025" title="Source 450,476"><a href="/guillain-barre-syndrome/sources/#src-vanTilburg2024">450,476</a></sup>.`],
 [4,`How common is fatigue after GBS, and what helps?`,`60 to 80%, not explained by weakness <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>. Amantadine failed <sup class="c" data-ref="Garssen2006Amantadine" title="Source 149"><a href="/guillain-barre-syndrome/sources/#src-Garssen2006Amantadine">149</a></sup>; 12 weeks of cycling cut fatigue by 20% <sup class="c" data-ref="Garssen2004Training" title="Source 148"><a href="/guillain-barre-syndrome/sources/#src-Garssen2004Training">148</a></sup>.`],
 [4,`What did the largest rehabilitation RCT show?`,`High-intensity rehabilitation over 12 months improved FIM function in 68% against 32% <sup class="c" data-ref="Khan2011RCT" title="Source 224"><a href="/guillain-barre-syndrome/sources/#src-Khan2011RCT">224</a></sup>.`],
 [4,`When is the risk of depression highest after GBS?`,`In the first 3 months (hazard ratio 20.5). After 2 years it matched the general population <sup class="c" data-ref="Levison2023Depression" title="Source 270"><a href="/guillain-barre-syndrome/sources/#src-Levison2023Depression">270</a></sup>.`],
 [4,`How does GBS affect work?`,`3 to 6 years on, 38% of those with jobs had to change them <sup class="c" data-ref="Bernsen2002Work" title="Source 41"><a href="/guillain-barre-syndrome/sources/#src-Bernsen2002Work">41</a></sup>.`],

 /* ---- Part 5: children, nursing, frontier ---- */
 [5,`How do children under 6 often present?`,`With pain, refusal to walk or irritability rather than weakness <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>. 68% of preschool children were first misdiagnosed in one series <sup class="c" data-ref="Roodbol2011" title="Source 380"><a href="/guillain-barre-syndrome/sources/#src-Roodbol2011">380</a></sup>.`],
 [5,`How many children with GBS need ventilation?`,`About 1 in 5: 19% of 421 in European cohorts <sup class="c" data-ref="Roodbol2023" title="Source 383"><a href="/guillain-barre-syndrome/sources/#src-Roodbol2023">383</a></sup>.`],
 [5,`Which feature strongly predicted ventilation in children in one Chinese cohort?`,`Autonomic dysfunction, odds ratio 70.4 <sup class="c" data-ref="Wu2016" title="Source 516"><a href="/guillain-barre-syndrome/sources/#src-Wu2016">516</a></sup>.`],
 [5,`What did the German paediatric IVIg trial find about the 2-day regimen?`,`No difference in recovery, but more early transient deterioration than the 5-day regimen (5 of 23 against 0 of 23) <sup class="c" data-ref="Korinthenberg2005" title="Source 236"><a href="/guillain-barre-syndrome/sources/#src-Korinthenberg2005">236</a></sup>.`],
 [5,`Does pregnancy raise the risk of GBS?`,`Not during pregnancy, but it rises after delivery: rate ratio 2.93 in the first 30 days <sup class="c" data-ref="Cheng1998" title="Source 74"><a href="/guillain-barre-syndrome/sources/#src-Cheng1998">74</a></sup>.`],
 [5,`Are IVIg and plasma exchange allowed in pregnancy?`,`Neither is contraindicated; IVIg might be preferred because plasma exchange needs more monitoring <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`],
 [5,`Can a fully paralysed person with GBS hear?`,`Usually yes: consciousness, vision and hearing are intact, so bedside talk matters <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`],
 [5,`What did severely affected people find hardest in the ICU?`,`Losing communication. 90% named contact with relatives as most helpful <sup class="c" data-ref="Weiss2002" title="Source 503"><a href="/guillain-barre-syndrome/sources/#src-Weiss2002">503</a></sup>.`],
 [5,`Why do venous clot rates vary so much between studies?`,`Method: 7% on clinical diagnosis, 52% on ultrasound screening, 9% in claims data <sup class="c" data-ref="Gaber2002,Ryabinkina2016,Wright2026" title="Source 146,394,514"><a href="/guillain-barre-syndrome/sources/#src-Gaber2002">146,394,514</a></sup>.`],
 [5,`What happened in the eculizumab trials?`,`Both JET-GBS and the phase 3 trial missed their primary endpoints, despite near-complete C5 blockade <sup class="c" data-ref="Misawa2018,Kuwabara2024" title="Source 259,298"><a href="/guillain-barre-syndrome/sources/#src-Misawa2018">259,298</a></sup>.`],
 [5,`Where do tanruprubart and eculizumab act?`,`Tanruprubart blocks C1q, the first step of the classical complement pathway; eculizumab blocks C5, the last step before the membrane attack complex <sup class="c" data-ref="Freiha2026" title="Source 139"><a href="/guillain-barre-syndrome/sources/#src-Freiha2026">139</a></sup>.`],
 [5,`What is the key limit of the tanruprubart phase 3 trial?`,`Its control arm had no IVIg or plasma exchange, so it compared drug with placebo, not with standard care <sup class="c" data-ref="Freiha2026,Wiegers2025" title="Source 139,507"><a href="/guillain-barre-syndrome/sources/#src-Freiha2026">139,507</a></sup>.`],
 [5,`How do imlifidase and efgartigimod lower IgG?`,`Imlifidase cleaves IgG; efgartigimod blocks FcRn so IgG is broken down faster. Neither has a randomised GBS result <sup class="c" data-ref="Freiha2026" title="Source 139"><a href="/guillain-barre-syndrome/sources/#src-Freiha2026">139</a></sup>.`],

 /* ---- Part 6: history ---- */
 [6,`What did Guillain, Barré and Strohl report in 1916?`,`Two soldiers with acute flaccid paralysis, high CSF protein and normal cell counts <sup class="c" data-ref="Guillain1916,Goodfellow2016,Waclawik2018" title="Source 160,171,490"><a href="/guillain-barre-syndrome/sources/#src-Guillain1916">160,171,490</a></sup>.`],
 [6,`Who described "ascending paralysis" in 1859?`,`Octave Landry, in ten patients <sup class="c" data-ref="Afifi1994" title="Source 5"><a href="/guillain-barre-syndrome/sources/#src-Afifi1994">5</a></sup>.`],
 [6,`What was André Strohl's contribution?`,`The myographic studies of tendon reflexes, an early step towards electrodiagnosis. Later papers dropped his name <sup class="c" data-ref="Waclawik2018,Afifi1994" title="Source 5,490"><a href="/guillain-barre-syndrome/sources/#src-Waclawik2018">5,490</a></sup>.`],
 [6,`What did Waksman and Adams show in 1955?`,`Experimental allergic neuritis in rabbits, a model pointing to an immune cause <sup class="c" data-ref="Waksman1955,Afifi1994" title="Source 5,495"><a href="/guillain-barre-syndrome/sources/#src-Waksman1955">5,495</a></sup>.`],
 [6,`When were plasma exchange and IVIg proved?`,`Plasma exchange: first report 1978, US trial 1985 <sup class="c" data-ref="Brettle1978,GBSStudyGroup1985" title="Source 58,155"><a href="/guillain-barre-syndrome/sources/#src-Brettle1978">58,155</a></sup>. IVIg: Dutch trial 1992 <sup class="c" data-ref="vanDerMeche1992" title="Source 468"><a href="/guillain-barre-syndrome/sources/#src-vanDerMeche1992">468</a></sup>.`],
 [6,`Who proposed an acute axonal form, and when?`,`Feasby and colleagues in 1986: five quadriplegic people with inexcitable motor nerves <sup class="c" data-ref="Feasby1986" title="Source 124"><a href="/guillain-barre-syndrome/sources/#src-Feasby1986">124</a></sup>. AMAN was named in 1993 <sup class="c" data-ref="McKhann1993" title="Source 291"><a href="/guillain-barre-syndrome/sources/#src-McKhann1993">291</a></sup>.`],
 [6,`What did the 1978 prednisolone trial conclude?`,`That steroid treatment is not beneficial and can be detrimental <sup class="c" data-ref="Hughes1978" title="Source 194"><a href="/guillain-barre-syndrome/sources/#src-Hughes1978">194</a></sup>.`]
];
/* the 20/30/40 rule, EGRIS and mEGOS are published names; every other phrase here is written for this guide */
const GBRV_MN=[
 ["20/30/40",1,`Vital capacity below <b>20</b> mL/kg, maximal inspiratory pressure below <b>30</b> cmH2O, maximal expiratory pressure below <b>40</b> cmH2O, or a fall of more than 30% in any of them <sup class="c" data-ref="Lawn2001" title="Source 263"><a href="/guillain-barre-syndrome/sources/#src-Lawn2001">263</a></sup>. Played below.`],
 ["EGRIS",1,`A published ventilation risk score with three items: days from onset to admission, facial or bulbar weakness, and MRC sum score, 0 to 7 points <sup class="c" data-ref="Doets2022" title="Source 104"><a href="/guillain-barre-syndrome/sources/#src-Doets2022">104</a></sup>. A score of 5 or more carries about 65% risk of ventilation within a week <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`],
 ["mEGOS",1,`A published walking-outcome score: age, preceding diarrhoea and MRC sum score, 0 to 9 at admission or 0 to 12 at day 7 <sup class="c" data-ref="Papri2022mEGOS,Busl2023" title="Source 63,348"><a href="/guillain-barre-syndrome/sources/#src-Papri2022mEGOS">63,348</a></sup>.`],
 ["Two weeks, four weeks",0,`The trial windows: IVIg started within <b>2</b> weeks of onset, plasma exchange within <b>4</b> weeks <sup class="c" data-ref="Leonhard2019,vanDoorn2023" title="Source 266,473"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266,473</a></sup>. Four weeks is also when nearly everyone has reached the nadir: 97% <sup class="c" data-ref="Fokke2014" title="Source 131"><a href="/guillain-barre-syndrome/sources/#src-Fokke2014">131</a></sup>.`],
 ["Point four for five",0,`IVIg as published: <b>0.4</b> g/kg a day for <b>5</b> days, 2 g/kg in total <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>.`],
 ["Eyes, balance, reflexes",0,`Miller Fisher syndrome: ophthalmoplegia (eyes), ataxia (balance) and areflexia (reflexes) <sup class="c" data-ref="Mori2001MFS" title="Source 301"><a href="/guillain-barre-syndrome/sources/#src-Mori2001MFS">301</a></sup>. Its antibody, anti-GQ1b, is on the eye-movement nerves <sup class="c" data-ref="Chiba1993" title="Source 78"><a href="/guillain-barre-syndrome/sources/#src-Chiba1993">78</a></sup>.`],
 ["Myelin or node",0,`AIDP attacks the Schwann cell surface and <b>myelin</b>; AMAN attacks the axon membrane at the <b>node</b> of Ranvier <sup class="c" data-ref="HaferMacko1996AIDP,HaferMacko1996AMAN" title="Source 175,176"><a href="/guillain-barre-syndrome/sources/#src-HaferMacko1996AIDP">175,176</a></sup>.`],
 ["Over fifty, think again",0,`CSF with more than <b>50</b> cells/µl points away from GBS and prompts a search for another cause <sup class="c" data-ref="Leonhard2019,vanDoorn2023" title="Source 266,473"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266,473</a></sup>.`],
 ["Eight weeks or three strikes",0,`Suspect acute-onset CIDP with worsening <b>8</b> weeks or more after onset, or <b>3</b> or more fluctuations <sup class="c" data-ref="Ruts2010,vanDoorn2023" title="Source 391,473"><a href="/guillain-barre-syndrome/sources/#src-Ruts2010">391,473</a></sup>.`],
 ["Two-thirds after the worst",0,`Up to <b>two-thirds</b> of deaths come in the recovery phase, after the weakest point, often after leaving intensive care <sup class="c" data-ref="Leonhard2019,vanDenBerg2013" title="Source 266,463"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266,463</a></sup>.`]
];
/* the four tiles: the number, the measure, the rule as published, and the schematic start and end readings drawn */
const GBRV_RULE=[
 ['20','Vital capacity (VC)','below 20 mL/kg'],
 ['30','Inspiratory pressure (MIP)','below 30 cmH2O'],
 ['40','Expiratory pressure (MEP)','below 40 cmH2O'],
 ['30%','Any of the three','falls by more than 30%']
];
/* EAN/PNS vital capacity triggers, quoted as published */
const GBRV_FVC=[
 {v:20,t:'20 mL/kg or less',d:'consider elective ventilation'},
 {v:10,t:'10 mL/kg or less',d:'ventilation almost inevitable'}
];
const GBRV_HEAD=['20: vital capacity','30: breathing in','40: breathing out','Or a fall of more than 30%','The single breath count','EAN/PNS: vital capacity triggers'];
const GBRV_CAP=[
 ['Below 20 mL/kg flags a risk','of respiratory failure'],
 ['Below 30 cmH2O flags a risk',''],
 ['Below 40 cmH2O flags a risk',''],
 ['A 30% drop counts,','even above the lines'],
 ['Count aloud from 1','in a single breath'],
 ['Thresholds quoted as published,','never as instructions']
];
const GBRV_STEPS=[
 {from:0,at:.05,k:'20',t:'Vital capacity below 20 mL/kg',txt:`Vital capacity below 20 mL/kg flags a risk of respiratory failure <sup class="c" data-ref="Lawn2001" title="Source 263"><a href="/guillain-barre-syndrome/sources/#src-Lawn2001">263</a></sup>. In a small serial study, vital capacity fell over the 48 hours before failure, and intubation came at 15.2 mL/kg on average, while people who were not intubated stayed above 40 mL/kg <sup class="c" data-ref="Chevrolet1991" title="Source 76"><a href="/guillain-barre-syndrome/sources/#src-Chevrolet1991">76</a></sup>.`,pt:'Vital capacity is the most air you can blow out after the deepest breath. When it drops below 20 for each kilogram of body weight, breathing may be about to fail.',hook:'20/30/40: VC below 20 mL/kg, MIP below 30 cmH2O, MEP below 40 cmH2O, or a fall of more than 30%. <sup class="c" data-ref="Lawn2001" title="Source 263"><a href="/guillain-barre-syndrome/sources/#src-Lawn2001">263</a></sup>'},
 {from:1/6,at:1/6+.05,k:'30',t:'Inspiratory pressure below 30 cmH2O',txt:`A maximal inspiratory pressure below 30 cmH2O is the second flag <sup class="c" data-ref="Lawn2001" title="Source 263"><a href="/guillain-barre-syndrome/sources/#src-Lawn2001">263</a></sup>. Breathing fails because both the breathing-in and breathing-out muscles weaken <sup class="c" data-ref="Orlikowski2004" title="Source 339"><a href="/guillain-barre-syndrome/sources/#src-Orlikowski2004">339</a></sup>.`,pt:'This measures how hard you can suck in. A weak pull means the breathing-in muscles, such as the diaphragm, are tiring.'},
 {from:2/6,at:2/6+.05,k:'40',t:'Expiratory pressure below 40 cmH2O',txt:`A maximal expiratory pressure below 40 cmH2O is the third <sup class="c" data-ref="Lawn2001" title="Source 263"><a href="/guillain-barre-syndrome/sources/#src-Lawn2001">263</a></sup>. A poor cough and bulbar weakness lead to aspiration pneumonia and collapsed lung segments <sup class="c" data-ref="Orlikowski2004" title="Source 339"><a href="/guillain-barre-syndrome/sources/#src-Orlikowski2004">339</a></sup>. Inability to cough had the highest odds ratio, 9.09, in the French model <sup class="c" data-ref="Sharshar2003" title="Source 416"><a href="/guillain-barre-syndrome/sources/#src-Sharshar2003">416</a></sup>.`,pt:'This measures how hard you can blow out, which is what a cough needs. A weak cough cannot clear the chest.',hook:'Inability to cough carried the highest odds ratio for ventilation (9.09) in the French model. <sup class="c" data-ref="Sharshar2003" title="Source 416"><a href="/guillain-barre-syndrome/sources/#src-Sharshar2003">416</a></sup>'},
 {from:3/6,at:3/6+.05,k:'30%',t:'Or a fall of more than 30%',txt:`A fall of more than 30% in any of the three also counts <sup class="c" data-ref="Lawn2001" title="Source 263"><a href="/guillain-barre-syndrome/sources/#src-Lawn2001">263</a></sup>. No clinical feature predicted the pattern of decline in that series, but serial testing found those at risk. The source was 114 consecutive ICU patients with severe GBS at one centre <sup class="c" data-ref="Lawn2001" title="Source 263"><a href="/guillain-barre-syndrome/sources/#src-Lawn2001">263</a></sup>.`,pt:'The trend matters as much as the number. A big drop is a warning even if the reading is still above the line.'},
 {from:4/6,at:4/6+.05,k:'Count',t:'The single breath count',txt:`Not being able to count to 15 in one breath is one sign of imminent respiratory insufficiency in the ten-steps guideline, which also gives a count of 19 or less as predicting ventilation <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>. The EAN/PNS guideline calls a count under 20 a useful bedside tool for ICU transfer <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>.`,pt:'Taking one deep breath and counting out loud is a quick bedside check. Signs of distress come late, and a person may not feel breathless at all, so the numbers are checked again and again <sup class="c" data-ref="Orlikowski2004,Leonhard2019" title="Source 266,339"><a href="/guillain-barre-syndrome/sources/#src-Orlikowski2004">266,339</a></sup>.',hook:'Respiratory failure in GBS can come without breathlessness: measure, do not wait for distress. <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>'},
 {from:5/6,at:5/6+.05,k:'Triggers',t:'What the 2023 guideline adds',txt:`EAN/PNS, as published: a fall of more than 30% in 24 hours likely means immediate ICU transfer, and a 50% fall in under 24 hours likely means ventilation. Elective ventilation is considered at a vital capacity of 20 mL/kg or less, and at 10 mL/kg or less it is almost inevitable <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>.`,pt:'These are the guideline\'s published triggers, quoted for learning. Anyone with GBS who has trouble breathing or swallowing needs emergency care <sup class="c" data-ref="Leonhard2019,vanDoorn2023" title="Source 266,473"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266,473</a></sup>.',hook:'EAN/PNS: elective ventilation considered at FVC 20 mL/kg or less; almost inevitable at 10 mL/kg or less. <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>'}
];
inits.review=()=>{
  let filt='all',deck=[],i=0;
  const F=[['all','All cards'],...Object.keys(GBRV_PARTN).map(k=>[k,'Part '+k])];
  $('#fcFilter').innerHTML=F.map(([k,l])=>`<button class="btn" data-ff="${k}" aria-pressed="${k==='all'}">${l}</button>`).join('');
  const fc=$('#fc');
  function build(shuf){deck=GBRV_FC.filter(c=>filt==='all'||String(c[0])===filt);if(shuf){const r=rng(Date.now()%1e6);for(let k=deck.length-1;k>0;k--){const j=Math.floor(r()*(k+1));[deck[k],deck[j]]=[deck[j],deck[k]]}}i=0;render()}
  function render(){const c=deck[i];fc.classList.remove('flip');
    $('#fcTagF').textContent=GBRV_PARTN[c[0]]+' · question';$('#fcTagB').textContent=GBRV_PARTN[c[0]]+' · answer';
    $('#fcFront').textContent=c[1];$('#fcBack').innerHTML=c[2];$('#fcCount').textContent=`${i+1} / ${deck.length}`;$('#fcBar').style.width=((i+1)/deck.length*100)+'%'}
  const flip=()=>fc.classList.toggle('flip');
  fc.addEventListener('click',e=>{if(e.target.closest('sup.c'))return;flip()});$('#fcFlip').onclick=flip;
  const next=()=>{i=(i+1)%deck.length;render()},prev=()=>{i=(i-1+deck.length)%deck.length;render()};
  $('#fcNext').onclick=next;$('#fcPrev').onclick=prev;$('#fcShuf').onclick=()=>build(true);
  $('#fcFilter').addEventListener('click',e=>{const b=e.target.closest('[data-ff]');if(!b)return;filt=b.dataset.ff;$$('[data-ff]').forEach(x=>x.setAttribute('aria-pressed',x===b));build(false)});
  document.addEventListener('keydown',e=>{if(cur!=='review')return;if(e.target.closest('input')||(e.target.closest('button')&&e.target!==fc))return;
    if(e.key===' '||e.key==='Enter'){e.preventDefault();flip()}else if(e.key==='ArrowRight')next();else if(e.key==='ArrowLeft')prev()});
  build(false);
  $('#mnList').innerHTML=GBRV_MN.map(m=>`<div class="card"><span class="tag ${m[1]?'good':'accent'}">${m[1]?'published name':'memory aid written for this guide'}</span><b class="big">${m[0]}</b><p>${m[2]}</p></div>`).join('');

  /* ---- mnemonic in motion: the 20/30/40 rule ---- */
  const svg=$('#gbrvSvg'),rg=$('#gbrvT');
  const tx=(x,y,c,txt,st='',a='')=>`<text class="${c}" x="${f1(x)}" y="${f1(y)}"${a?` text-anchor="${a}"`:''}${st?` style="${st}"`:''}>${txt}</text>`;
  /* schematic readings for each measure: start and end of the fall drawn in that phase (not data) */
  const RD=[[44,17],[72,25],[88,34]];
  /* how far each reading has fallen at time t, 0..1, so earlier tiles stay at their end value */
  const fallK=(k,p,u)=>k<p?1:k>p?0:ease(ramp(u,.05,.75));
  function draw(t){
    const N=vb(svg,'720 410','400 690');
    const p=phaseOf(GBRV_STEPS,t),u=clamp((t-GBRV_STEPS[p].from)*6);
    const L=N?{x:12,y:34,w:376,rh:43,th:37,ty:228}:{x:16,y:44,w:300,rh:56,th:48,ty:300};
    const R=N?{x:12,y:282,w:376,h:398}:{x:332,y:14,w:372,h:382};
    let s=tx(L.x,L.y-13,'rv-a','20/30/40: three numbers and a fall');
    let lit=0;
    GBRV_RULE.forEach(([n,word,rule],k)=>{
      const y=L.y+k*L.rh,hot=k===p,on=k<3?fallK(k,p,u)>.82||p>=4:(p>3||(p===3&&u>.6));
      if(on)lit++;
      s+=`<g style="opacity:${hot?1:on?.9:.55}">`;
      s+=`<rect x="${L.x}" y="${y}" width="${L.w}" height="${L.th}" rx="9" style="fill:var(${hot?'--brand-soft':'--panel'});stroke:var(${hot?'--brand':'--line'});stroke-width:${hot?1.8:1.1}"/>`;
      const cr=N?15:17,cy=y+L.th/2;
      s+=`<circle cx="${L.x+cr+6}" cy="${cy}" r="${cr}" style="fill:var(${hot?'--brand':'--muted'})"/>`+tx(L.x+cr+6,cy+5,n.length>2?'rv-m':'rv-n',n,'','middle');
      const x2=L.x+cr*2+14;
      s+=tx(x2,y+(N?15:20),'rv-c',word,'font-weight:700')+tx(x2,y+(N?31:38),'rv-b',rule);
      s+=tx(L.x+L.w-10,cy+5,'rv-c',on?'flag':'',on?'font-weight:700;fill:var(--rx)':'','end');
      s+='</g>'});
    s+=tx(L.x,L.ty,'rv-b',`Flags raised so far: ${lit} of 4`);
    const bw=(L.w-3*8)/4;
    for(let k=0;k<4;k++){const on=k<lit;s+=`<rect x="${f1(L.x+k*(bw+8))}" y="${L.ty+8}" width="${f1(bw)}" height="22" rx="5" style="fill:var(${on?'--rx':'--panel-2'});stroke:var(--line)"/>`+tx(L.x+k*(bw+8)+bw/2,L.ty+24,on?'rv-m':'rv-b',GBRV_RULE[k][0],'','middle')}
    if(!N)s+=tx(L.x,L.ty+58,'rv-b','Any one flag counts. Readings drawn are schematic.')+tx(L.x,L.ty+76,'rv-b','The rule comes from one ICU series of 114 people.');
    /* explainer panel */
    const W=R.w,cx=W/2,H=R.h;
    s+=`<g transform="translate(${R.x} ${R.y})"><rect x="0" y="0" width="${W}" height="${H}" rx="12" style="fill:var(--panel-2);opacity:.55"/>`;
    s+=tx(16,30,'rv-a',GBRV_HEAD[p]);
    const cp=GBRV_CAP[p];s+=tx(cx,H-(cp[1]?44:24),'rv-c',cp[0],'','middle')+(cp[1]?tx(cx,H-22,'rv-c',cp[1],'','middle'):'');
    if(p===0){
      const v=lerp(RD[0][0],RD[0][1],fallK(0,0,u)),on=v<20;
      const lg=lungs(18,78,1.15,{fill:clamp((v-8)/38),weak:on?1:clamp((32-v)/12)});
      s+=lg.svg+tx(18+lg.w/2,78+lg.h+30,'rv-c',`VC ${Math.round(v)} mL/kg`,'font-weight:700','middle');
      const mx=W-128,my=66,mh=210,mw=40,Y=val=>my+mh-mh*val/50;
      s+=`<rect x="${mx}" y="${my}" width="${mw}" height="${mh}" rx="6" style="fill:var(--panel);stroke:var(--line)"/>`;
      s+=`<rect x="${mx+3}" y="${f1(Y(v))}" width="${mw-6}" height="${f1(my+mh-3-Y(v))}" rx="4" style="fill:var(${on?'--rx':'--brand'});opacity:.8"/>`;
      [0,10,20,30,40,50].forEach(g=>{s+=`<line class="axis" x1="${mx+mw}" x2="${mx+mw+6}" y1="${f1(Y(g))}" y2="${f1(Y(g))}"/>`+tx(mx+mw+10,Y(g)+4,'rv-b',String(g),g===20?'font-weight:700;fill:var(--ink)':'')});
      s+=`<line x1="${mx-10}" x2="${mx+mw}" y1="${f1(Y(20))}" y2="${f1(Y(20))}" style="stroke:var(--rx);stroke-width:2;stroke-dasharray:5 3"/>`;
      s+=tx(mx+mw/2,my+mh+20,'rv-b','mL/kg','','middle');
      s+=tx(mx+mw/2,my-10,'rv-a',on?'flag':'','fill:var(--rx)','middle');
    }else if(p===1||p===2){
      const k=p,mx=k===1?80:100,thr=k===1?30:40,v=lerp(RD[k][0],RD[k][1],fallK(k,p,u)),on=v<thr,gy=212,gr=N?118:112;
      s+=gauge(cx,gy,gr,v,mx,{bands:[{to:thr,col:'var(--rx)'},{to:mx,col:'var(--panel-2)'}],big:true});
      s+=tx(cx,gy+32,'rv-b',k===1?'cmH2O, sucking in hard':'cmH2O, blowing out hard','','middle');
      s+=tx(cx,gy+52,'rv-b',`red arc: below ${thr}`,'','middle');
      s+=tx(cx,gy+80,'rv-a',on?'flag':'','fill:var(--rx)','middle');
      s+=tx(cx,72,'rv-b','schematic reading','','middle');
    }else if(p===3){
      const k=ease(ramp(u,.05,.85)),f=x=>1-.38*ease(clamp(x/.85));
      const c=curve(54,70,W-84,196,f,{upto:k,y0:.4,y1:1.05,col:'var(--brand)',dot:true,bands:[{from:.4,to:.7,col:'var(--rx)'}]});
      s+=c.svg;
      s+=tx(48,c.Y(1)+4,'rv-b','100%','','end')+tx(48,c.Y(.7)+4,'rv-b','70%','font-weight:700;fill:var(--ink)','end');
      s+=`<line x1="54" x2="${W-30}" y1="${f1(c.Y(.7))}" y2="${f1(c.Y(.7))}" style="stroke:var(--rx);stroke-width:2;stroke-dasharray:5 3"/>`;
      s+=kitLabel(62,c.Y(.47),'more than 30% down',{});
      s+=tx(54,286,'rv-b','share of the first reading, over days (schematic)');
      const cur2=f(k);s+=tx(W-30,62,'rv-c',`now ${Math.round(cur2*100)}%`,cur2<.7?'font-weight:700;fill:var(--rx)':'font-weight:700','end');
    }else if(p===4){
      const c=Math.max(1,Math.round(lerp(1,13,ease(ramp(u,.05,.8))))),n=20,x0=16,cw=(W-32)/n,cy=168;
      s+=person(46,58,86,'var(--brand)');
      const bx=96,by=60,bwid=W-bx-16;
      s+=`<path d="M${bx+10} ${by}H${bx+bwid-10}Q${bx+bwid} ${by} ${bx+bwid} ${by+10}V${by+46}Q${bx+bwid} ${by+56} ${bx+bwid-10} ${by+56}H${bx+22}L${bx+4} ${by+70}V${by+56}Q${bx} ${by+56} ${bx} ${by+46}V${by+10}Q${bx} ${by} ${bx+10} ${by}Z" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.4"/>`;
      s+=tx(bx+bwid/2,by+34,'rv-a',`"... ${c}"`,'','middle');
      for(let q=1;q<=n;q++){const x=x0+(q-1)*cw,on=q<=c,mark=q===15||q===20;
        s+=`<rect x="${f1(x+1)}" y="${cy}" width="${f1(cw-2)}" height="26" rx="4" style="fill:var(${on?'--brand':'--panel'});stroke:var(${mark?'--rx':'--line'});stroke-width:${mark?2:1}"/>`;
        s+=tx(x+cw/2,cy+17,on?'rv-m':'rv-q',String(q),'','middle')}
      const m15=x0+14.5*cw,m20=x0+19.5*cw;
      s+=`<line x1="${f1(m15)}" x2="${f1(m15)}" y1="${cy+28}" y2="${cy+52}" style="stroke:var(--rx);stroke-width:1.6"/><line x1="${f1(m20)}" x2="${f1(m20)}" y1="${cy+28}" y2="${cy+92}" style="stroke:var(--rx);stroke-width:1.6"/>`;
      s+=tx(m15-6,cy+66,'rv-c','Cannot reach 15:','font-weight:700','end')+tx(m15-6,cy+82,'rv-b','imminent failure (ten steps)','','end');
      s+=tx(m20-6,cy+106,'rv-c','Under 20:','font-weight:700','end')+tx(m20-6,cy+122,'rv-b','ICU-transfer tool (EAN/PNS)','','end');
    }else{
      const x0=28,x1=W-28,ay=96,X=v=>x0+(x1-x0)*(40-v)/40,v=lerp(36,8,ease(ramp(u,.05,.85)));
      s+=`<rect x="${f1(X(20))}" y="${ay-10}" width="${f1(X(0)-X(20))}" height="20" rx="4" style="fill:var(--rx-soft);stroke:var(--rx)"/>`;
      s+=`<line class="axis" x1="${x0}" y1="${ay}" x2="${x1}" y2="${ay}"/>`;
      [40,30,20,10,0].forEach(g=>{s+=`<line class="axis" x1="${f1(X(g))}" y1="${ay-6}" x2="${f1(X(g))}" y2="${ay+6}"/>`+tx(X(g),ay+28,'rv-b',String(g),g===20||g===10?'font-weight:700;fill:var(--ink)':'','middle')});
      s+=tx(cx,ay+48,'rv-b','vital capacity, mL/kg (falling to the right)','','middle');
      s+=`<circle cx="${f1(X(v))}" cy="${ay}" r="8" style="fill:var(--brand);stroke:var(--panel);stroke-width:2"/>`+tx(X(v),ay-18,'rv-c',`${Math.round(v)}`,'font-weight:700','middle');
      GBRV_FVC.forEach((r,j)=>{const y=164+j*50,hit=v<=r.v;
        s+=`<rect x="16" y="${y}" width="${W-32}" height="42" rx="8" style="fill:var(${hit?'--rx-soft':'--panel'});stroke:var(${hit?'--rx':'--line'});stroke-width:${hit?1.8:1}"/>`;
        s+=tx(28,y+18,'rv-c',r.t,'font-weight:700')+tx(28,y+34,'rv-b',r.d)});
      s+=tx(16,282,'rv-b','Also: a fall of more than 30% in 24 hours')+tx(16,298,'rv-b','likely means immediate ICU transfer.');
    }
    s+='</g>';svg.innerHTML=s;
    setSt(p);$('#gbrvNote').innerHTML=noteHTML(GBRV_STEPS[p]);
    rg.setAttribute('aria-valuetext',`${GBRV_STEPS[p].k}: ${GBRV_STEPS[p].t}`)}
  const stop=playWire(rg,$('#gbrvPlay'),draw,26000,'Replay','review');
  const setSt=stepWire($('#gbrvSteps'),GBRV_STEPS,rg,draw,stop);
  draw(+rg.value);
};

/* =============== 6.3 quiz =============== */
/* [part, question, options, index of the right option, cited explanation] */
const GBQZ_Q=[
 /* Part 1 */
 [1,`The EAN/PNS guideline describes GBS as an acute:`,[`Myopathy`,`Polyradiculoneuropathy`,`Myelopathy`,`Encephalitis`],1,`"An acute polyradiculoneuropathy", affecting nerve roots and peripheral nerves <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>.`],
 [1,`Worldwide, GBS is the commonest cause of:`,[`Acute flaccid paralysis`,`Stroke in the young`,`Chronic neuropathy`,`Spinal cord compression`],0,`It is described as the commonest cause of acute flaccid paralysis worldwide <sup class="c" data-ref="Shahrizaila2021" title="Source 413"><a href="/guillain-barre-syndrome/sources/#src-Shahrizaila2021">413</a></sup>.`],
 [1,`In the Western meta-analysis, GBS incidence rises with each 10 years of age by about:`,[`2%`,`50%`,`20%`,`It falls with age`],2,`20% per decade, from 0.62 at 0-9 years to 2.66 at 80-89 years per 100,000 person-years <sup class="c" data-ref="Sejvar2011" title="Source 404"><a href="/guillain-barre-syndrome/sources/#src-Sejvar2011">404</a></sup>.`],
 [1,`What share of people with GBS need mechanical ventilation, by the consensus guideline?`,[`About 2%`,`About 20%`,`About 50%`,`About 75%`],1,`About 20%, up to 22% in the first week of admission <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`],
 [1,`In the Dutch cohort, most deaths came in which phase?`,[`Progressive`,`Plateau`,`Recovery`,`Before admission`],2,`67% were in the recovery phase, 20% progressive and 13% plateau <sup class="c" data-ref="vanDenBerg2013" title="Source 463"><a href="/guillain-barre-syndrome/sources/#src-vanDenBerg2013">463</a></sup>.`],
 [1,`In the Dhaka cohort, the strongest risk factor for death was:`,[`Female sex`,`Pure motor variant`,`Age under 20`,`No ventilator when one was needed`],3,`Hazard ratio 11.9 <sup class="c" data-ref="Ishaque2017" title="Source 204"><a href="/guillain-barre-syndrome/sources/#src-Ishaque2017">204</a></sup>.`],
 [1,`In AMAN, antibodies and complement bind mainly to:`,[`The axon membrane at the node of Ranvier`,`The Schwann cell surface`,`Muscle fibres`,`The spinal cord`],0,`IgG and C3d were bound to the motor axolemma, most often at the node <sup class="c" data-ref="HaferMacko1996AMAN" title="Source 176"><a href="/guillain-barre-syndrome/sources/#src-HaferMacko1996AMAN">176</a></sup>.`],
 [1,`In IGOS, which subtype was commonest in every region, including Bangladesh?`,[`Axonal`,`Demyelinating`,`Inexcitable`,`Equivocal`],1,`Demyelinating: 55% in Europe/Americas, 45% in Asia and 40% in Bangladesh <sup class="c" data-ref="Doets2018" title="Source 102"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102</a></sup>.`],
 [1,`The axonal share in Bangladesh in IGOS was about:`,[`6%`,`90%`,`36%`,`1%`],2,`36%, against 6% in Europe/Americas <sup class="c" data-ref="Doets2018" title="Source 102"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102</a></sup>.`],
 [1,`Reversible conduction failure is best described as:`,[`Permanent axon loss`,`Slow remyelination over months`,`A block that resolves fast without signs of remyelination`,`A muscle disease`],2,`Fast resolution without remyelinating slow components <sup class="c" data-ref="Kuwabara1998GM1,Kokubun2010" title="Source 232,252"><a href="/guillain-barre-syndrome/sources/#src-Kuwabara1998GM1">232,252</a></sup>.`],
 [1,`Median time to walk 5 m with help in AMAN against AIDP in northern China was:`,[`31 against 32 days`,`90 against 30 days`,`1 year against 1 month`,`7 against 70 days`],0,`About the same: 31 and 32 days <sup class="c" data-ref="Ho1997Recovery" title="Source 191"><a href="/guillain-barre-syndrome/sources/#src-Ho1997Recovery">191</a></sup>.`],
 [1,`The Miller Fisher syndrome triad is:`,[`Fever, rash, headache`,`Ophthalmoplegia, ataxia, areflexia`,`Weakness, sensory level, incontinence`,`Ptosis, dysphagia, hyperreflexia`],1,`Ophthalmoplegia, ataxia and areflexia <sup class="c" data-ref="Mori2001MFS" title="Source 301"><a href="/guillain-barre-syndrome/sources/#src-Mori2001MFS">301</a></sup>.`],
 [1,`In 60 people with Fisher syndrome, overlap with other forms began within:`,[`7 days`,`4 weeks`,`3 months`,`It never overlapped`],0,`Every overlap occurred within 7 days, so monitoring for at least a week is advised <sup class="c" data-ref="Sekiguchi2016,Verboon2017MFS" title="Source 407,482"><a href="/guillain-barre-syndrome/sources/#src-Sekiguchi2016">407,482</a></sup>.`],
 [1,`Bickerstaff brainstem encephalitis adds which feature to ophthalmoplegia and ataxia?`,[`Sural sparing`,`Pure sensory loss`,`Disturbed consciousness or hyperreflexia`,`Fever above 40 °C`],2,`Disturbed consciousness or hyperreflexia <sup class="c" data-ref="Odaka2003" title="Source 335"><a href="/guillain-barre-syndrome/sources/#src-Odaka2003">335</a></sup>.`],
 [1,`In 494 Dutch adults, what share had reached the nadir within 4 weeks?`,[`50%`,`80%`,`65%`,`97%`],3,`80% by 2 weeks, 97% by 4 weeks, all by 6 weeks <sup class="c" data-ref="Fokke2014" title="Source 131"><a href="/guillain-barre-syndrome/sources/#src-Fokke2014">131</a></sup>.`],
 [1,`The pharyngeal-cervical-brachial variant is most linked to IgG against:`,[`GT1a`,`Acetylcholine receptor`,`Aquaporin-4`,`NMDA receptor`],0,`Anti-GT1a IgG in 51% of 100 people <sup class="c" data-ref="Nagashima2007" title="Source 313"><a href="/guillain-barre-syndrome/sources/#src-Nagashima2007">313</a></sup>.`],
 /* Part 2 */
 [2,`Which pair is required by the NINDS criteria, as adapted?`,[`Fever and rash`,`Progressive bilateral limb weakness and reduced reflexes`,`Raised CSF cells and a sensory level`,`Ptosis and diplopia`],1,`Progressive bilateral weakness and absent or decreased reflexes in affected limbs <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`],
 [2,`Which makes GBS doubtful?`,[`Pain before weakness`,`Bilateral facial palsy`,`A nadir reached within 24 hours`,`Raised CSF protein`],2,`A nadir under 24 hours, or progression beyond 4 weeks <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`],
 [2,`Normal or brisk reflexes occur in about what share of people with GBS?`,[`None`,`10%`,`50%`,`90%`],1,`About 10%, mostly with pure motor AMAN <sup class="c" data-ref="Yuki2012JNeurol" title="Source 534"><a href="/guillain-barre-syndrome/sources/#src-Yuki2012JNeurol">534</a></sup>.`],
 [2,`Pain came before weakness in about what share in the Dutch prospective study?`,[`5%`,`36%`,`80%`,`100%`],1,`36% in the 2 weeks before weakness; 66% in the acute phase <sup class="c" data-ref="Ruts2010Pain" title="Source 392"><a href="/guillain-barre-syndrome/sources/#src-Ruts2010Pain">392</a></sup>.`],
 [2,`Brighton level 1 needs:`,[`Clinical features only`,`A positive antibody test`,`Both CSF and nerve conduction support`,`Brain MRI`],2,`Level 1 adds CSF and nerve conduction support; level 3 is clinical only <sup class="c" data-ref="LopezHernandez2022" title="Source 277"><a href="/guillain-barre-syndrome/sources/#src-LopezHernandez2022">277</a></sup>.`],
 [2,`A normal CSF protein in week 1:`,[`Excludes GBS`,`Does not exclude GBS`,`Proves Miller Fisher syndrome`,`Means the sample was wrong`],1,`About 50% are raised within 3 days and 84% after 7 days <sup class="c" data-ref="Doets2018" title="Source 102"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102</a></sup>.`],
 [2,`A CSF white cell count above which level should prompt a search for another diagnosis?`,[`5 cells/µl`,`1 cell/µl`,`500 cells/µl`,`50 cells/µl`],3,`More than 50 cells/µl <sup class="c" data-ref="Leonhard2019,vanDoorn2023" title="Source 266,473"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266,473</a></sup>.`],
 [2,`In 2,627 samples with raised protein and few cells, a diagnosis explained it in:`,[`57%`,`100%`,`5%`,`99%`],0,`57%, so albuminocytological dissociation is not specific <sup class="c" data-ref="Brooks2019" title="Source 59"><a href="/guillain-barre-syndrome/sources/#src-Brooks2019">59</a></sup>.`],
 [2,`In suspected Miller Fisher syndrome, which antibody is requested?`,[`Anti-AChR`,`Anti-GM1`,`Anti-GQ1b`,`Anti-MOG`],2,`Anti-GQ1b, with sensitivity of 88-100% <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>.`],
 [2,`Should treatment wait for anti-ganglioside antibody results?`,[`Yes, always`,`No`,`Only in children`,`Only for plasma exchange`],1,`Do not wait for antibody results before treating <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`],
 [2,`In the first week, the commonest abnormal nerve conduction finding was:`,[`Conduction block`,`Slowed velocity`,`Absent H reflex`,`Normal study`],2,`Absent H reflex 97%, abnormal F waves 84%, conduction block only 13% <sup class="c" data-ref="Gordon2001" title="Source 161"><a href="/guillain-barre-syndrome/sources/#src-Gordon2001">161</a></sup>.`],
 [2,`The sural sparing pattern is:`,[`Sensitive but not specific`,`Specific but not sensitive`,`Neither`,`Only seen in AMAN`],1,`Specificity about 0.9, sensitivity about 0.3 to 0.4 <sup class="c" data-ref="Derksen2014" title="Source 97"><a href="/guillain-barre-syndrome/sources/#src-Derksen2014">97</a></sup>.`],
 [2,`Applied to the same IGOS studies, Hadden and Rajabally criteria:`,[`Agree completely`,`Give very different axonal shares`,`Cannot be compared`,`Both find no axonal cases`],1,`Axonal 9.8% by Hadden and 30.0% by Rajabally; they agreed in 68.3% <sup class="c" data-ref="Arends2024" title="Source 20"><a href="/guillain-barre-syndrome/sources/#src-Arends2024">20</a></sup>.`],
 [2,`Botulism differs from GBS because it usually:`,[`Ascends from the feet`,`Causes high fever`,`Descends from the cranial nerves in an alert person`,`Raises CSF cells above 500`],2,`Descending paralysis, afebrile in 99%, with alertness kept <sup class="c" data-ref="Rao2021" title="Source 371"><a href="/guillain-barre-syndrome/sources/#src-Rao2021">371</a></sup>.`],
 [2,`Before finalising a GBS diagnosis, one expert advises searching the body for:`,[`A tick`,`A rash`,`Needle marks`,`Lymph nodes`],0,`Tick paralysis improves rapidly after removal <sup class="c" data-ref="Edlow2010" title="Source 110"><a href="/guillain-barre-syndrome/sources/#src-Edlow2010">110</a></sup>.`],
 [2,`Abdominal pain, psychological features and neuropathy should prompt testing for:`,[`Thyroid antibodies`,`Urinary porphobilinogen`,`Blood cultures`,`Lyme serology only`],1,`Acute porphyria is confirmed by a markedly raised urinary porphobilinogen <sup class="c" data-ref="Albers2004,Anderson2005" title="Source 7,18"><a href="/guillain-barre-syndrome/sources/#src-Albers2004">7,18</a></sup>.`],
 [2,`Asymmetric flaccid weakness with fever and marked pleocytosis suggests:`,[`Classic GBS`,`Miller Fisher syndrome`,`Functional weakness`,`An anterior horn cell infection such as West Nile virus`],3,`Fever in 91% and median CSF white cells 108/mm³ in West Nile paralysis <sup class="c" data-ref="Sejvar2005" title="Source 403"><a href="/guillain-barre-syndrome/sources/#src-Sejvar2005">403</a></sup>.`],
 [2,`A-CIDP is suspected after worsening at or beyond:`,[`8 weeks from onset`,`3 days from onset`,`1 year from onset`,`2 weeks from onset`],0,`8 weeks or more, or 3 or more fluctuations <sup class="c" data-ref="Ruts2010,vanDoorn2023" title="Source 391,473"><a href="/guillain-barre-syndrome/sources/#src-Ruts2010">391,473</a></sup>.`],
 /* Part 3 */
 [3,`In the 20/30/40 rule, the "20" refers to:`,[`Breaths per minute`,`Vital capacity in mL/kg`,`Days from onset`,`MRC sum score`],1,`VC below 20 mL/kg; MIP below 30 and MEP below 40 cmH2O <sup class="c" data-ref="Lawn2001" title="Source 263"><a href="/guillain-barre-syndrome/sources/#src-Lawn2001">263</a></sup>.`],
 [3,`Why is breathing measured even when the person does not feel breathless?`,[`Breathlessness can be absent and distress signs come late`,`To prove the diagnosis`,`Because it predicts walking`,`Because it is quicker than asking`],0,`Respiratory failure can occur without breathlessness <sup class="c" data-ref="Leonhard2019,Orlikowski2004" title="Source 266,339"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266,339</a></sup>.`],
 [3,`EGRIS scores which three items?`,[`Age, diarrhoea, disability score`,`Onset-to-admission days, facial or bulbar weakness, MRC sum score`,`CSF protein, cells, glucose`,`Heart rate, blood pressure, sodium`],1,`Range 0 to 7 <sup class="c" data-ref="Doets2022" title="Source 104"><a href="/guillain-barre-syndrome/sources/#src-Doets2022">104</a></sup>.`],
 [3,`An EGRIS of 5 or more carries about what risk of ventilation within a week?`,[`4%`,`24%`,`99%`,`65%`],3,`0-2: 4%, 3-4: 24%, 5 or more: 65% <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`],
 [3,`In the French model, the single sign with the highest odds ratio for ventilation was:`,[`Cannot stand`,`Raised liver enzymes`,`Cannot cough`,`Cannot lift elbows`],2,`Odds ratio 9.09 <sup class="c" data-ref="Sharshar2003" title="Source 416"><a href="/guillain-barre-syndrome/sources/#src-Sharshar2003">416</a></sup>.`],
 [3,`The published IVIg regimen for GBS is:`,[`2 g/kg as one 1-hour dose`,`0.4 g/kg/day for 5 days`,`1 g/kg weekly for a year`,`0.1 g/kg/day for 20 days`],1,`0.4 g/kg/day for 5 days, 2 g/kg in total <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>.`],
 [3,`In trials, IVIg was started within ___ and plasma exchange within ___ of onset.`,[`4 weeks; 2 weeks`,`2 days; 2 weeks`,`2 weeks; 4 weeks`,`6 months; 1 year`],2,`IVIg within 2 weeks; plasma exchange within 4 weeks <sup class="c" data-ref="Leonhard2019,vanDoorn2023" title="Source 266,473"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266,473</a></sup>.`],
 [3,`IVIg against plasma exchange, by Cochrane and the guideline:`,[`IVIg clearly better`,`Plasma exchange clearly better`,`Equally effective`,`Neither works`],2,`Equally effective; the choice is driven by access and the person's circumstances <sup class="c" data-ref="vanDoorn2023,Hughes2014" title="Source 199,473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">199,473</a></sup>.`],
 [3,`Plasma exchange against supportive care: risk ratio for needing ventilation?`,[`0.53`,`1.64`,`2.89`,`1.00`],0,`0.53 (95% CI 0.39-0.74) <sup class="c" data-ref="Chevret2017" title="Source 75"><a href="/guillain-barre-syndrome/sources/#src-Chevret2017">75</a></sup>.`],
 [3,`In ventilated people in the 1997 French trial, six exchanges compared with four were:`,[`Much better`,`No better`,`Harmful to everyone`,`Never tested`],1,`Six were no better than four <sup class="c" data-ref="FrenchCooperative1997" title="Source 142"><a href="/guillain-barre-syndrome/sources/#src-FrenchCooperative1997">142</a></sup>.`],
 [3,`Corticosteroids alone in GBS:`,[`Speed recovery`,`Do not help, and oral steroids may delay recovery`,`Prevent recurrence`,`Replace IVIg`],1,`Cochrane, six trials and 587 participants <sup class="c" data-ref="Hughes2016" title="Source 200"><a href="/guillain-barre-syndrome/sources/#src-Hughes2016">200</a></sup>.`],
 [3,`Plasma exchange followed straight away by IVIg:`,[`Doubles the benefit`,`Adds no significant benefit`,`Is recommended for everyone`,`Is the zipper method`],1,`No significant advantage in the 1997 trial <sup class="c" data-ref="PSGBS1997,Hughes2014" title="Source 199,362"><a href="/guillain-barre-syndrome/sources/#src-PSGBS1997">199,362</a></sup>.`],
 [3,`In SID-GBS, a second IVIg course for a poor prognosis gave:`,[`Faster walking`,`No benefit and more serious adverse events`,`Fewer deaths`,`Cure in half`],1,`Serious adverse events 35% against 16% <sup class="c" data-ref="Walgaard2021" title="Source 499"><a href="/guillain-barre-syndrome/sources/#src-Walgaard2021">499</a></sup>.`],
 [3,`Treatment-related fluctuations affect about:`,[`50%`,`0.1%`,`6-10%`,`30%`],2,`6 to 10%, within 2 months of treatment <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`],
 [3,`The IVIg class boxed warning covers:`,[`Thrombosis and kidney failure`,`Hair loss`,`Hearing loss`,`Liver failure`],0,`Thrombosis, renal dysfunction and acute renal failure <sup class="c" data-ref="FDA-Bivigam" title="Source 118"><a href="/guillain-barre-syndrome/sources/#src-FDA-Bivigam">118</a></sup>.`],
 [3,`In ventilated people, bradycardia episodes were preceded by a daily systolic range above:`,[`20 mmHg`,`200 mmHg`,`5 mmHg`,`85 mmHg`],3,`Above 85 mmHg in all but one person <sup class="c" data-ref="Pfeiffer1999" title="Source 358"><a href="/guillain-barre-syndrome/sources/#src-Pfeiffer1999">358</a></sup>.`],
 [3,`Succinylcholine is a concern after GBS because of:`,[`Hypoglycaemia`,`Hyperkalaemic cardiac arrest`,`Seizures`,`Allergy to eggs`],1,`Severe hyperkalaemia after denervation <sup class="c" data-ref="FDA-Quelicin,Feldman1990" title="Source 122,125"><a href="/guillain-barre-syndrome/sources/#src-FDA-Quelicin">122,125</a></sup>.`],
 [3,`Unable to lift the arms at 1 week of ventilation: chance of 14 days or more on the ventilator?`,[`87%`,`10%`,`50%`,`2%`],0,`87%, rising to 96% with axonal or inexcitable nerves <sup class="c" data-ref="Walgaard2017" title="Source 498"><a href="/guillain-barre-syndrome/sources/#src-Walgaard2017">498</a></sup>.`],
 [3,`Early tracheostomy in a Japanese national cohort:`,[`Halved mortality`,`Did not lower mortality`,`Doubled mortality`,`Was never done`],1,`Risk difference 0.4% for in-hospital mortality <sup class="c" data-ref="Yonezawa2020" title="Source 524"><a href="/guillain-barre-syndrome/sources/#src-Yonezawa2020">524</a></sup>.`],
 [3,`Methylprednisolone for pain in GBS:`,[`Prevents pain`,`Is first-line`,`Did not reduce pain`,`Was never studied`],2,`No difference in developing pain (RR 0.89) <sup class="c" data-ref="Liu2015" title="Source 273"><a href="/guillain-barre-syndrome/sources/#src-Liu2015">273</a></sup>.`],
 [3,`Hallucinations in GBS are linked to:`,[`Brain tumours`,`Autonomic dysfunction and REM sleep abnormality`,`Low IQ`,`Plasma exchange only`],1,`Risk factors included autonomic dysfunction and ventilation <sup class="c" data-ref="Cochen2005" title="Source 79"><a href="/guillain-barre-syndrome/sources/#src-Cochen2005">79</a></sup>.`],
 /* Part 4 */
 [4,`About what share walk independently 6 months after GBS?`,[`20%`,`50%`,`80%`,`100%`],2,`About 80%; about 20% cannot, despite treatment <sup class="c" data-ref="Leonhard2019,vanDoorn2008" title="Source 266,471"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266,471</a></sup>.`],
 [4,`EGOS and mEGOS predict:`,[`Death`,`Need for ventilation`,`Recurrence`,`Inability to walk unaided`],3,`Their endpoint is inability to walk unaided <sup class="c" data-ref="vanKoningsveld2007,Walgaard2011" title="Source 475,497"><a href="/guillain-barre-syndrome/sources/#src-vanKoningsveld2007">475,497</a></sup>.`],
 [4,`Which is NOT an mEGOS input?`,[`Age`,`Preceding diarrhoea`,`CSF protein`,`MRC sum score`],2,`Age, preceding diarrhoea and MRC sum score <sup class="c" data-ref="Papri2022mEGOS,Busl2023" title="Source 63,348"><a href="/guillain-barre-syndrome/sources/#src-Papri2022mEGOS">63,348</a></sup>.`],
 [4,`mEGOS discriminates best when scored:`,[`At admission`,`At day 7`,`At 1 year`,`Before symptoms`],1,`AUC 0.84-0.87 at day 7 against 0.73-0.77 at admission <sup class="c" data-ref="Walgaard2011" title="Source 497"><a href="/guillain-barre-syndrome/sources/#src-Walgaard2011">497</a></sup>.`],
 [4,`In a 20-year ICU series, what share of ventilated survivors walked independently?`,[`79%`,`9%`,`29%`,`100%`],0,`79% <sup class="c" data-ref="Fletcher2000" title="Source 129"><a href="/guillain-barre-syndrome/sources/#src-Fletcher2000">129</a></sup>.`],
 [4,`In 281 trial patients, high serum neurofilament light early was linked to:`,[`Better walking`,`Poorer walking outcome`,`More breathing failure`,`Nothing`],1,`It predicted inability to walk, but not respiratory failure <sup class="c" data-ref="vanTilburg2024,Thomma2025" title="Source 450,476"><a href="/guillain-barre-syndrome/sources/#src-vanTilburg2024">450,476</a></sup>.`],
 [4,`Fatigue after GBS:`,[`Is rare`,`Is explained by weakness`,`Is found in 60-80% and not explained by weakness`,`Is cured by amantadine`],2,`60-80% <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>; amantadine was not better than placebo <sup class="c" data-ref="Garssen2006Amantadine" title="Source 149"><a href="/guillain-barre-syndrome/sources/#src-Garssen2006Amantadine">149</a></sup>.`],
 [4,`The largest rehabilitation RCT (79 people) found that high-intensity rehabilitation improved function in:`,[`68% against 32%`,`5% against 4%`,`100% against 0%`,`32% against 68%`],0,`FIM function over 12 months <sup class="c" data-ref="Khan2011RCT" title="Source 224"><a href="/guillain-barre-syndrome/sources/#src-Khan2011RCT">224</a></sup>.`],
 [4,`In the Danish study, the risk of depression after GBS was highest:`,[`After 10 years`,`In the first 3 months`,`Only in children`,`It was never raised`],1,`Hazard ratio 20.5 in the first 3 months; normal after 2 years <sup class="c" data-ref="Levison2023Depression" title="Source 270"><a href="/guillain-barre-syndrome/sources/#src-Levison2023Depression">270</a></sup>.`],
 [4,`3 to 6 years after GBS, what share of people with jobs had to change them?`,[`3%`,`38%`,`90%`,`None`],1,`38% <sup class="c" data-ref="Bernsen2002Work" title="Source 41"><a href="/guillain-barre-syndrome/sources/#src-Bernsen2002Work">41</a></sup>.`],
 [4,`Recurrent GBS is more common in:`,[`Older people`,`Younger people and Miller Fisher syndrome`,`People treated with IVIg`,`Nobody: it never recurs`],1,`Mean age 34.2 against 46.9 years <sup class="c" data-ref="Kuitwaard2009JNNP" title="Source 244"><a href="/guillain-barre-syndrome/sources/#src-Kuitwaard2009JNNP">244</a></sup>.`],
 [4,`Heterotopic ossification in a rehabilitation cohort affected:`,[`6%`,`60%`,`0%`,`96%`],0,`4 of 65, all with reduced hip movement <sup class="c" data-ref="Zeilig2006" title="Source 537"><a href="/guillain-barre-syndrome/sources/#src-Zeilig2006">537</a></sup>.`],
 /* Part 5 */
 [5,`Preschool children with GBS were first misdiagnosed in about:`,[`68%`,`5%`,`21%`,`100%`],0,`68% against 21% of older children <sup class="c" data-ref="Roodbol2011" title="Source 380"><a href="/guillain-barre-syndrome/sources/#src-Roodbol2011">380</a></sup>.`],
 [5,`About what share of children with GBS in European cohorts needed ventilation?`,[`1%`,`19%`,`50%`,`90%`],1,`79 of 421 (19%) <sup class="c" data-ref="Roodbol2023" title="Source 383"><a href="/guillain-barre-syndrome/sources/#src-Roodbol2023">383</a></sup>.`],
 [5,`In the German paediatric trial, the 2-day IVIg regimen caused more:`,[`Deaths`,`Early transient deterioration`,`Kidney failure`,`Recurrence`],1,`5 of 23 against 0 of 23 <sup class="c" data-ref="Korinthenberg2005" title="Source 236"><a href="/guillain-barre-syndrome/sources/#src-Korinthenberg2005">236</a></sup>.`],
 [5,`GBS risk around pregnancy is highest:`,[`In the first trimester`,`Throughout pregnancy`,`In the first 30 days after delivery`,`It is unchanged`],2,`Rate ratio 2.93 in the first 30 days postpartum <sup class="c" data-ref="Cheng1998" title="Source 74"><a href="/guillain-barre-syndrome/sources/#src-Cheng1998">74</a></sup>.`],
 [5,`A fully paralysed person with GBS:`,[`Usually cannot hear`,`Is usually unconscious`,`Usually hears and sees normally`,`Cannot feel pain`],2,`Consciousness, vision and hearing are usually intact <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`],
 [5,`What did 49 severely affected people find hardest in intensive care?`,[`The food`,`Losing communication`,`Noise`,`Visiting hours`],1,`Loss of communication; 90% found contact with relatives most helpful <sup class="c" data-ref="Weiss2002" title="Source 503"><a href="/guillain-barre-syndrome/sources/#src-Weiss2002">503</a></sup>.`],
 [5,`Urinary dysfunction is commoner in:`,[`AMAN`,`AIDP`,`Miller Fisher syndrome only`,`Neither`],1,`39% in AIDP against 19% in AMAN <sup class="c" data-ref="Sakakibara2009" title="Source 398"><a href="/guillain-barre-syndrome/sources/#src-Sakakibara2009">398</a></sup>.`],
 [5,`Eculizumab in GBS trials:`,[`Met its endpoints`,`Missed its primary endpoints`,`Was never tested`,`Is now first-line`],1,`JET-GBS and the phase 3 trial both missed <sup class="c" data-ref="Misawa2018,Kuwabara2024" title="Source 259,298"><a href="/guillain-barre-syndrome/sources/#src-Misawa2018">259,298</a></sup>.`],
 [5,`Tanruprubart blocks:`,[`C5`,`FcRn`,`C1q`,`IgG cleavage`],2,`C1q, the first step of the classical pathway <sup class="c" data-ref="Freiha2026" title="Source 139"><a href="/guillain-barre-syndrome/sources/#src-Freiha2026">139</a></sup>.`],
 [5,`The tanruprubart phase 3 control arm received:`,[`IVIg`,`Plasma exchange`,`Eculizumab`,`Placebo, without IVIg or plasma exchange`],3,`So it cannot show how the drug compares with standard care <sup class="c" data-ref="Freiha2026,Wiegers2025" title="Source 139,507"><a href="/guillain-barre-syndrome/sources/#src-Freiha2026">139,507</a></sup>.`],
 /* Part 6 */
 [6,`Guillain, Barré and Strohl's 1916 report described:`,[`Two soldiers with paralysis, high CSF protein and normal cells`,`A vaccine reaction`,`A brain tumour`,`Polio in children`],0,`Two French soldiers <sup class="c" data-ref="Guillain1916,Goodfellow2016,Waclawik2018" title="Source 160,171,490"><a href="/guillain-barre-syndrome/sources/#src-Guillain1916">160,171,490</a></sup>.`],
 [6,`Who described "ascending paralysis" in 1859?`,[`Miller Fisher`,`Octave Landry`,`Guillain`,`Bickerstaff`],1,`Landry, in ten patients <sup class="c" data-ref="Afifi1994" title="Source 5"><a href="/guillain-barre-syndrome/sources/#src-Afifi1994">5</a></sup>.`],
 [6,`The 1955 experimental allergic neuritis model, by Waksman and Adams, pointed to:`,[`A genetic cause`,`A toxic cause`,`An immune cause`,`A vascular cause`],2,`An immune cause <sup class="c" data-ref="Waksman1955,Afifi1994" title="Source 5,495"><a href="/guillain-barre-syndrome/sources/#src-Waksman1955">5,495</a></sup>.`],
 [6,`IVIg was first shown at least as effective as plasma exchange in:`,[`1916`,`1955`,`1978`,`1992`],3,`The Dutch trial of 150 people <sup class="c" data-ref="vanDerMeche1992" title="Source 468"><a href="/guillain-barre-syndrome/sources/#src-vanDerMeche1992">468</a></sup>.`],
 [6,`An acute axonal form of GBS was proposed by Feasby and colleagues in:`,[`1986`,`1916`,`2012`,`1859`],0,`Five quadriplegic people with inexcitable motor nerves <sup class="c" data-ref="Feasby1986" title="Source 124"><a href="/guillain-barre-syndrome/sources/#src-Feasby1986">124</a></sup>.`]
];
inits.quiz=()=>{
  const F=[['mix','Mixed (20)'],...Object.keys(GBRV_PARTN).map(k=>[k,'Part '+k])];
  $('#qFilter').innerHTML=F.map(([k,l])=>`<button class="btn" data-qf="${k}" aria-pressed="${k==='mix'}">${l}</button>`).join('');
  let list=[],i=0,score=0,missed=[],answered=false;
  function start(k){const r=rng(Date.now()%1e6);let L=GBQZ_Q.filter(q=>k==='mix'||String(q[0])===k).slice();for(let a=L.length-1;a>0;a--){const j=Math.floor(r()*(a+1));[L[a],L[j]]=[L[j],L[a]]}
    list=k==='mix'?L.slice(0,20):L;i=0;score=0;missed=[];q()}
  function q(){answered=false;$('#qBar').style.width=(i/list.length*100)+'%';
    if(i>=list.length){const pct=Math.round(score/list.length*100);
      $('#qCard').innerHTML=`<div class="kicker">Finished</div><div class="q">You scored ${score} / ${list.length} (${pct}%)</div><p>${pct>=85?'Excellent work.':pct>=65?'Solid. Review the ones you missed below.':'Worth another pass through the modules, then try again.'}</p>`+
       (missed.length?`<dl class="kv">${missed.map(m=>`<div><dt>${m[1]}</dt><dd><b>${m[2][m[3]]}.</b> ${m[4]}</dd></div>`).join('')}</dl>`:'')+`<div class="ctrls"><button class="btn primary" id="qAgain">Try again</button><button class="btn" data-go="review">Go to flashcards</button></div>`;
      $('#qAgain').onclick=()=>start($('[data-qf][aria-pressed="true"]').dataset.qf);return}
    const Q=list[i];
    $('#qCard').innerHTML=`<div class="readout"><span>question <b>${i+1} / ${list.length}</b></span><span>score <b>${score}</b></span><span>${GBRV_PARTN[Q[0]]}</span></div><div class="q">${Q[1]}</div><div class="opts">${Q[2].map((o,j)=>`<button class="opt" data-o="${j}"><span class="l">${'ABCD'[j]}</span><span>${o}</span></button>`).join('')}</div><div id="qFb"></div>`;
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
/* [term, cited definition, module id] */
const GBGL_T=[
 ["20/30/40 rule",`Risk of respiratory failure with vital capacity below 20 mL/kg, MIP below 30 cmH2O, MEP below 40 cmH2O, or a fall of more than 30% <sup class="c" data-ref="Lawn2001" title="Source 263"><a href="/guillain-barre-syndrome/sources/#src-Lawn2001">263</a></sup>.`,"breathing"],
 ["A-CIDP (acute-onset CIDP)",`Chronic inflammatory demyelinating polyradiculoneuropathy that starts like GBS. Suspected with worsening 8 weeks or more after onset or 3 or more fluctuations; about 5% of people first diagnosed with GBS <sup class="c" data-ref="Ruts2010,vanDoorn2023" title="Source 391,473"><a href="/guillain-barre-syndrome/sources/#src-Ruts2010">391,473</a></sup>.`,"whatnot"],
 ["A waves",`Late motor responses of identical latency and shape. Multiple A waves were seen in 13 of 14 people in the first week <sup class="c" data-ref="Kornhuber1999" title="Source 240"><a href="/guillain-barre-syndrome/sources/#src-Kornhuber1999">240</a></sup>.`,"ncs"],
 ["Acute flaccid myelitis",`An anterior horn cell disease of children. Against GBS: faster nadir (3 against 8 days), asymmetric weakness and cord lesions on MRI <sup class="c" data-ref="Helfferich2022" title="Source 183"><a href="/guillain-barre-syndrome/sources/#src-Helfferich2022">183</a></sup>.`,"ddx"],
 ["Acute flaccid paralysis (AFP)",`Sudden floppy weakness. GBS is its commonest cause worldwide <sup class="c" data-ref="Shahrizaila2021" title="Source 413"><a href="/guillain-barre-syndrome/sources/#src-Shahrizaila2021">413</a></sup>, and AFP surveillance, built for polio, covers children under 15 <sup class="c" data-ref="Papri2021" title="Source 347"><a href="/guillain-barre-syndrome/sources/#src-Papri2021">347</a></sup>.`,"what"],
 ["Adynamic ileus",`A paralysed bowel. 15% of 114 people with severe GBS; only some cases were autonomic, others followed ventilation, surgery or rising opioid doses <sup class="c" data-ref="Burns2001" title="Source 62"><a href="/guillain-barre-syndrome/sources/#src-Burns2001">62</a></sup>.`,"autonomic"],
 ["AIDP",`Acute inflammatory demyelinating polyradiculoneuropathy. Complement lies along the outer Schwann cell surface, and macrophages strip myelin <sup class="c" data-ref="HaferMacko1996AIDP" title="Source 175"><a href="/guillain-barre-syndrome/sources/#src-HaferMacko1996AIDP">175</a></sup>.`,"subtypes"],
 ["Albumin replacement",`The replacement fluid favoured over fresh frozen plasma in plasma exchange, after the French trial found more complications with plasma <sup class="c" data-ref="FrenchPE1987" title="Source 143"><a href="/guillain-barre-syndrome/sources/#src-FrenchPE1987">143</a></sup>.`,"plex"],
 ["Albuminocytological dissociation",`Raised CSF protein with a normal cell count, first reported in 1916 <sup class="c" data-ref="Goodfellow2016" title="Source 160"><a href="/guillain-barre-syndrome/sources/#src-Goodfellow2016">160</a></sup>. Not specific: a diagnosis explained raised protein in only 57% of 2,627 samples <sup class="c" data-ref="Brooks2019" title="Source 59"><a href="/guillain-barre-syndrome/sources/#src-Brooks2019">59</a></sup>.`,"csf"],
 ["Amantadine",`A drug tried for fatigue after GBS. It was not better than placebo in a crossover RCT of 80 people <sup class="c" data-ref="Garssen2006Amantadine" title="Source 149"><a href="/guillain-barre-syndrome/sources/#src-Garssen2006Amantadine">149</a></sup>.`,"after"],
 ["AMAN",`Acute motor axonal neuropathy. IgG and complement bind the motor axon membrane, mostly at the node of Ranvier, with little demyelination <sup class="c" data-ref="HaferMacko1996AMAN" title="Source 176"><a href="/guillain-barre-syndrome/sources/#src-HaferMacko1996AMAN">176</a></sup>. Named in 1993 <sup class="c" data-ref="McKhann1993" title="Source 291"><a href="/guillain-barre-syndrome/sources/#src-McKhann1993">291</a></sup>.`,"subtypes"],
 ["AMSAN",`Acute motor and sensory axonal neuropathy: Wallerian-like degeneration of motor and sensory fibres, the severe end of the axonal spectrum <sup class="c" data-ref="Griffin1996AMSAN" title="Source 167"><a href="/guillain-barre-syndrome/sources/#src-Griffin1996AMSAN">167</a></sup>.`,"subtypes"],
 ["Anti-ganglioside antibodies",`Antibodies against nerve gangliosides. Routine testing is not advised in typical motor-sensory GBS; a negative result does not exclude GBS <sup class="c" data-ref="vanDoorn2023,Leonhard2019" title="Source 266,473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">266,473</a></sup>.`,"csf"],
 ["Anti-GM1",`An antibody linked to AMAN. IgG anti-GM1 sensitivity for all GBS ranges 20-69%, with specificity 94-98% <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>.`,"csf"],
 ["Anti-GQ1b",`The Miller Fisher syndrome antibody, cross-reacting with GT1a <sup class="c" data-ref="Chiba1993" title="Source 78"><a href="/guillain-barre-syndrome/sources/#src-Chiba1993">78</a></sup>. Sensitivity 88-100% <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>.`,"mfs"],
 ["Anti-GT1a",`The antibody most linked to pharyngeal-cervical-brachial weakness: 51% of 100 people <sup class="c" data-ref="Nagashima2007" title="Source 313"><a href="/guillain-barre-syndrome/sources/#src-Nagashima2007">313</a></sup>.`,"mfs"],
 ["Areflexia",`Absent tendon reflexes. Reduced in paretic limbs in 91% at first and in all during follow-up in a Dutch cohort <sup class="c" data-ref="Fokke2014" title="Source 131"><a href="/guillain-barre-syndrome/sources/#src-Fokke2014">131</a></sup>.`,"signs"],
 ["Autonomic dysfunction (dysautonomia)",`Unstable blood pressure and heart rate, pupil changes, and bowel or bladder dysfunction <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>. 25% at entry in IGOS <sup class="c" data-ref="Doets2018" title="Source 102"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102</a></sup>.`,"autonomic"],
 ["Axolemma",`The axon's outer membrane. In AMAN it is the site where IgG and complement bind <sup class="c" data-ref="HaferMacko1996AMAN" title="Source 176"><a href="/guillain-barre-syndrome/sources/#src-HaferMacko1996AMAN">176</a></sup>.`,"subtypes"],
 ["Bickerstaff brainstem encephalitis",`Ophthalmoplegia and ataxia with disturbed consciousness or hyperreflexia; anti-GQ1b in 66% <sup class="c" data-ref="Odaka2003" title="Source 335"><a href="/guillain-barre-syndrome/sources/#src-Odaka2003">335</a></sup>.`,"mfs"],
 ["Bifacial weakness with paraesthesias",`A localised GBS variant, under 5% of the spectrum, which does not meet commonly used criteria <sup class="c" data-ref="Leonhard2019,Wakerley2014" title="Source 266,491"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266,491</a></sup>.`,"mfs"],
 ["Botulism",`A mimic with descending paralysis from the cranial nerves, afebrile in 99%, in an alert person <sup class="c" data-ref="Rao2021" title="Source 371"><a href="/guillain-barre-syndrome/sources/#src-Rao2021">371</a></sup>.`,"ddx"],
 ["Brighton criteria",`Levels of diagnostic certainty, 1 to 4, first written for vaccine safety data <sup class="c" data-ref="Sejvar2011Brighton" title="Source 405"><a href="/guillain-barre-syndrome/sources/#src-Sejvar2011Brighton">405</a></sup>. Level 1 needs CSF and nerve conduction support; level 3 is clinical only <sup class="c" data-ref="LopezHernandez2022" title="Source 277"><a href="/guillain-barre-syndrome/sources/#src-LopezHernandez2022">277</a></sup>.`,"criteria"],
 ["Bulbar weakness",`Weakness of swallowing and speech muscles. Odds ratio 9.0 for ventilation in a meta-analysis <sup class="c" data-ref="Green2018" title="Source 165"><a href="/guillain-barre-syndrome/sources/#src-Green2018">165</a></sup>.`,"breathing"],
 ["C1q",`The first protein of the classical complement pathway, the target of tanruprubart <sup class="c" data-ref="Freiha2026" title="Source 139"><a href="/guillain-barre-syndrome/sources/#src-Freiha2026">139</a></sup>.`,"frontier"],
 ["C5",`A late complement protein, the target of eculizumab; blocking it did not improve function in trials <sup class="c" data-ref="Kuwabara2024" title="Source 259"><a href="/guillain-barre-syndrome/sources/#src-Kuwabara2024">259</a></sup>.`,"frontier"],
 ["Carbamazepine",`An anticonvulsant used for neuropathic pain. EAN/PNS weakly recommends it after gabapentinoids or tricyclics <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>.`,"icu"],
 ["Cauda equina enhancement",`Contrast uptake by lumbar nerve roots on MRI, often anterior; sensitive but not specific <sup class="c" data-ref="Gorson1996,Byun1998,Leonhard2019" title="Source 65,162,266"><a href="/guillain-barre-syndrome/sources/#src-Gorson1996">65,162,266</a></sup>.`,"ncs"],
 ["CMAP (compound muscle action potential)",`The muscle response to nerve stimulation. A distal CMAP of 0-20% of the lower limit of normal predicted poor outcome <sup class="c" data-ref="Cornblath1988" title="Source 84"><a href="/guillain-barre-syndrome/sources/#src-Cornblath1988">84</a></sup>.`,"ncs"],
 ["Complement",`An immune protein cascade that punches pores in membranes. Complement products were found on the axon in AMAN and on the Schwann cell in AIDP <sup class="c" data-ref="HaferMacko1996AMAN,HaferMacko1996AIDP" title="Source 175,176"><a href="/guillain-barre-syndrome/sources/#src-HaferMacko1996AMAN">175,176</a></sup>.`,"frontier"],
 ["Conduction block",`Failure of an impulse to pass a nerve segment. It can be axonal in mechanism, so it does not prove AIDP <sup class="c" data-ref="Kokubun2010,Uncini2010" title="Source 232,456"><a href="/guillain-barre-syndrome/sources/#src-Kokubun2010">232,456</a></sup>.`,"ncs"],
 ["Corticosteroids",`Steroid drugs. Alone they do not help GBS, and oral steroids may delay recovery <sup class="c" data-ref="Hughes2016" title="Source 200"><a href="/guillain-barre-syndrome/sources/#src-Hughes2016">200</a></sup>.`,"whatnot"],
 ["CSF (cerebrospinal fluid)",`The fluid around the brain and spinal cord, sampled by lumbar puncture. Raised protein in 49% on day 1 and 88% after 2 weeks <sup class="c" data-ref="Fokke2014" title="Source 131"><a href="/guillain-barre-syndrome/sources/#src-Fokke2014">131</a></sup>.`,"csf"],
 ["Demyelination",`Loss of the myelin sheath. The pattern of AIDP, still the commonest subtype in all IGOS regions <sup class="c" data-ref="Doets2018" title="Source 102"><a href="/guillain-barre-syndrome/sources/#src-Doets2018">102</a></sup>.`,"subtypes"],
 ["Diaphragm",`The main breathing-in muscle. Breathing fails as both inspiratory and expiratory muscles weaken <sup class="c" data-ref="Orlikowski2004" title="Source 339"><a href="/guillain-barre-syndrome/sources/#src-Orlikowski2004">339</a></sup>.`,"breathing"],
 ["Dysphagia",`Difficulty swallowing. Swallowing impairment was found in over 80% early after ICU admission, often not clinically obvious <sup class="c" data-ref="Ogna2017" title="Source 337"><a href="/guillain-barre-syndrome/sources/#src-Ogna2017">337</a></sup>.`,"nursing"],
 ["EAN/PNS guideline",`The 2023 evidence-graded GBS guideline of the European Academy of Neurology and Peripheral Nerve Society <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>.`,"ivig"],
 ["Eculizumab",`An anti-C5 antibody. It missed its primary endpoint in JET-GBS and in a 57-person phase 3 trial <sup class="c" data-ref="Misawa2018,Kuwabara2024" title="Source 259,298"><a href="/guillain-barre-syndrome/sources/#src-Misawa2018">259,298</a></sup>.`,"frontier"],
 ["Efgartigimod",`An FcRn blocker that speeds IgG breakdown. No randomised GBS result yet <sup class="c" data-ref="Freiha2026" title="Source 139"><a href="/guillain-barre-syndrome/sources/#src-Freiha2026">139</a></sup>.`,"frontier"],
 ["EGOS",`A score of age, preceding diarrhoea and disability at 2 weeks, 1 to 7, predicting inability to walk at 6 months <sup class="c" data-ref="vanKoningsveld2007" title="Source 475"><a href="/guillain-barre-syndrome/sources/#src-vanKoningsveld2007">475</a></sup>.`,"prognosis"],
 ["EGRIS",`A ventilation risk score: onset-to-admission days, facial or bulbar weakness, MRC sum score; 0 to 7 <sup class="c" data-ref="Doets2022" title="Source 104"><a href="/guillain-barre-syndrome/sources/#src-Doets2022">104</a></sup>. 5 or more means about 65% risk in a week <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`,"breathing"],
 ["Electrodiagnosis",`Nerve conduction and related studies. Not required for diagnosis but recommended where possible <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`,"ncs"],
 ["Experimental allergic neuritis",`An animal model of immune nerve inflammation, made by Waksman and Adams in 1955 <sup class="c" data-ref="Waksman1955" title="Source 495"><a href="/guillain-barre-syndrome/sources/#src-Waksman1955">495</a></sup>.`,"history"],
 ["F wave",`A late motor response that travels up to the spinal cord and back. Abnormal in 84% in the first week <sup class="c" data-ref="Gordon2001" title="Source 161"><a href="/guillain-barre-syndrome/sources/#src-Gordon2001">161</a></sup>.`,"ncs"],
 ["Fatigue",`Tiredness found in 60-80% after GBS, not explained by residual weakness <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`,"after"],
 ["FcRn (neonatal Fc receptor)",`A receptor that recycles IgG. Blocking it, as efgartigimod does, speeds IgG breakdown <sup class="c" data-ref="Freiha2026" title="Source 139"><a href="/guillain-barre-syndrome/sources/#src-Freiha2026">139</a></sup>.`,"frontier"],
 ["Fluctuation (treatment-related)",`Worsening within 2 months after first improving or stabilising on treatment, in 6-10% <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`,"whatnot"],
 ["FVC (forced vital capacity)",`The air blown out forcefully after a full breath. EAN/PNS: elective ventilation is considered at 20 mL/kg or less <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>.`,"breathing"],
 ["Gabapentin",`A drug for neuropathic pain. In 18 ventilated people, pain fell from 7.22 to 2.33 on day 2 against placebo <sup class="c" data-ref="Pandey2002" title="Source 345"><a href="/guillain-barre-syndrome/sources/#src-Pandey2002">345</a></sup>.`,"icu"],
 ["Ganglioside",`A sugar-bearing lipid on nerve membranes, the target of anti-ganglioside antibodies. Anti-GQ1b stained the paranodes of eye-movement nerves <sup class="c" data-ref="Chiba1993" title="Source 78"><a href="/guillain-barre-syndrome/sources/#src-Chiba1993">78</a></sup>.`,"subtypes"],
 ["GBS disability score",`A 0 (no disability) to 6 (death) scale <sup class="c" data-ref="vanTilburg2024" title="Source 476"><a href="/guillain-barre-syndrome/sources/#src-vanTilburg2024">476</a></sup>. A score above 2 defines being unable to walk independently <sup class="c" data-ref="Papri2022mEGOS" title="Source 348"><a href="/guillain-barre-syndrome/sources/#src-Papri2022mEGOS">348</a></sup>.`,"prognosis"],
 ["GBS|CIDP Foundation International",`The international patient association for GBS, offering support, education, research funding and advocacy <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`,"after"],
 ["Guillain-Barré syndrome",`An acute, usually monophasic, immune-mediated polyradiculoneuropathy <sup class="c" data-ref="vanDoorn2023,Shahrizaila2021" title="Source 413,473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">413,473</a></sup>. Also written Guillain-Barre, without the accent.`,"what"],
 ["H reflex",`A spinal reflex recorded electrically. Absent in 97% in the first week <sup class="c" data-ref="Gordon2001" title="Source 161"><a href="/guillain-barre-syndrome/sources/#src-Gordon2001">161</a></sup>; present H reflexes make GBS less likely <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>.`,"ncs"],
 ["Hadden criteria",`Nerve conduction criteria for subtypes, needing a feature in at least two nerves <sup class="c" data-ref="Arends2024" title="Source 20"><a href="/guillain-barre-syndrome/sources/#src-Arends2024">20</a></sup>.`,"ncs"],
 ["Hallucinations",`Vivid, often hypnagogic experiences in 31% of 139 people, linked to autonomic dysfunction and REM sleep change <sup class="c" data-ref="Cochen2005" title="Source 79"><a href="/guillain-barre-syndrome/sources/#src-Cochen2005">79</a></sup>.`,"nursing"],
 ["Heterotopic ossification",`Bone forming in soft tissue. 4 of 65 people (6%) in rehabilitation, all with reduced hip movement <sup class="c" data-ref="Zeilig2006" title="Source 537"><a href="/guillain-barre-syndrome/sources/#src-Zeilig2006">537</a></sup>.`,"rehab"],
 ["Hyponatraemia",`Low blood sodium. SIADH in 48% of 50 people <sup class="c" data-ref="Saifudheen2011" title="Source 396"><a href="/guillain-barre-syndrome/sources/#src-Saifudheen2011">396</a></sup>; IVIg can cause pseudohyponatraemia <sup class="c" data-ref="Colls2003" title="Source 82"><a href="/guillain-barre-syndrome/sources/#src-Colls2003">82</a></sup>.`,"autonomic"],
 ["IGOS",`The International GBS Outcome Study, a prospective cohort started in May 2012 <sup class="c" data-ref="Jacobs2017" title="Source 211"><a href="/guillain-barre-syndrome/sources/#src-Jacobs2017">211</a></sup>.`,"history"],
 ["Imlifidase",`An enzyme that cleaves IgG. A single-arm phase 2 study gave it before IVIg; no randomised result yet <sup class="c" data-ref="NCT03943589,Freiha2026" title="Source 139,316"><a href="/guillain-barre-syndrome/sources/#src-NCT03943589">139,316</a></sup>.`,"frontier"],
 ["Inexcitable nerve",`A nerve that gives no motor response. Dead or unable to walk unaided at 48 weeks: 50% with inexcitable nerves against 15% in the rest <sup class="c" data-ref="Hadden1998" title="Source 173"><a href="/guillain-barre-syndrome/sources/#src-Hadden1998">173</a></sup>.`,"ncs"],
 ["IVIg (intravenous immunoglobulin)",`Pooled IgG from at least 1,000 donors <sup class="c" data-ref="FDA-Bivigam" title="Source 118"><a href="/guillain-barre-syndrome/sources/#src-FDA-Bivigam">118</a></sup>. Published regimen 0.4 g/kg/day for 5 days <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>.`,"ivig"],
 ["IVIg boxed warning",`Thrombosis, renal dysfunction and acute renal failure <sup class="c" data-ref="FDA-Bivigam" title="Source 118"><a href="/guillain-barre-syndrome/sources/#src-FDA-Bivigam">118</a></sup>.`,"ivig"],
 ["Landry's paralysis",`"Ascending paralysis" described by Octave Landry in 1859 <sup class="c" data-ref="Afifi1994" title="Source 5"><a href="/guillain-barre-syndrome/sources/#src-Afifi1994">5</a></sup>.`,"history"],
 ["Lumbar puncture",`A needle sample of CSF from the lower back, done mainly to exclude other causes <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`,"csf"],
 ["Membrane attack complex",`The complement pore that damages membranes; eculizumab blocks the step just before it <sup class="c" data-ref="Freiha2026" title="Source 139"><a href="/guillain-barre-syndrome/sources/#src-Freiha2026">139</a></sup>.`,"frontier"],
 ["mEGOS",`Modified EGOS: age, preceding diarrhoea and MRC sum score; 0-9 at admission, 0-12 at day 7 <sup class="c" data-ref="Papri2022mEGOS,Busl2023" title="Source 63,348"><a href="/guillain-barre-syndrome/sources/#src-Papri2022mEGOS">63,348</a></sup>.`,"prognosis"],
 ["mEGRIS",`Modified EGRIS using bulbar weakness, onset-to-admission days, neck flexion and hip flexion; 0 to 32 <sup class="c" data-ref="Luijten2023" title="Source 279"><a href="/guillain-barre-syndrome/sources/#src-Luijten2023">279</a></sup>.`,"breathing"],
 ["MEP (maximal expiratory pressure)",`Peak blowing-out pressure. Below 40 cmH2O is the "40" of the 20/30/40 rule <sup class="c" data-ref="Lawn2001" title="Source 263"><a href="/guillain-barre-syndrome/sources/#src-Lawn2001">263</a></sup>.`,"breathing"],
 ["Miller Fisher syndrome",`Ophthalmoplegia, ataxia and areflexia <sup class="c" data-ref="Mori2001MFS" title="Source 301"><a href="/guillain-barre-syndrome/sources/#src-Mori2001MFS">301</a></sup>, described by Fisher in 1956 <sup class="c" data-ref="Fisher1956" title="Source 127"><a href="/guillain-barre-syndrome/sources/#src-Fisher1956">127</a></sup>.`,"mfs"],
 ["MIP (maximal inspiratory pressure)",`Peak sucking-in pressure. Below 30 cmH2O is the "30" of the 20/30/40 rule <sup class="c" data-ref="Lawn2001" title="Source 263"><a href="/guillain-barre-syndrome/sources/#src-Lawn2001">263</a></sup>.`,"breathing"],
 ["Monophasic course",`One episode that does not return. 95% of 494 Dutch adults had a monophasic course <sup class="c" data-ref="Fokke2014" title="Source 131"><a href="/guillain-barre-syndrome/sources/#src-Fokke2014">131</a></sup>.`,"course"],
 ["MRC sum score",`Strength of 12 muscle groups, 0 (quadriplegic) to 60 (normal) <sup class="c" data-ref="vanTilburg2024" title="Source 476"><a href="/guillain-barre-syndrome/sources/#src-vanTilburg2024">476</a></sup>; near-perfect interobserver agreement <sup class="c" data-ref="Kleyweg1991MRC" title="Source 229"><a href="/guillain-barre-syndrome/sources/#src-Kleyweg1991MRC">229</a></sup>.`,"prognosis"],
 ["Myelin",`The insulating sheath around fast-conducting nerve fibres, attacked in AIDP <sup class="c" data-ref="HaferMacko1996AIDP" title="Source 175"><a href="/guillain-barre-syndrome/sources/#src-HaferMacko1996AIDP">175</a></sup>.`,"subtypes"],
 ["Nadir",`The weakest point. Reached within 2 weeks in 80% and 4 weeks in 97% <sup class="c" data-ref="Fokke2014" title="Source 131"><a href="/guillain-barre-syndrome/sources/#src-Fokke2014">131</a></sup>.`,"course"],
 ["Nerve conduction study (NCS)",`Electrical tests of nerve speed and response size. May be normal in the first week <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`,"ncs"],
 ["Nerve ultrasound",`Imaging that shows enlarged nerves early, including the vagus and cervical spinal nerves <sup class="c" data-ref="Grimm2016" title="Source 170"><a href="/guillain-barre-syndrome/sources/#src-Grimm2016">170</a></sup>. Not routine <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>.`,"ncs"],
 ["Neurofilament light chain (NfL)",`A blood marker of axonal damage. High levels early go with poorer walking outcome (Early evidence) <sup class="c" data-ref="vanTilburg2024" title="Source 476"><a href="/guillain-barre-syndrome/sources/#src-vanTilburg2024">476</a></sup>.`,"frontier"],
 ["NINDS criteria",`Diagnostic criteria first published in 1978 and reaffirmed in 1990 <sup class="c" data-ref="NINCDS1978,Asbury1990" title="Source 23,333"><a href="/guillain-barre-syndrome/sources/#src-NINCDS1978">23,333</a></sup>.`,"criteria"],
 ["Node of Ranvier",`The gap between myelin segments where sodium channels sit. The earliest AMAN change is nodal lengthening <sup class="c" data-ref="Griffin1996Nodal" title="Source 168"><a href="/guillain-barre-syndrome/sources/#src-Griffin1996Nodal">168</a></sup>.`,"subtypes"],
 ["Nodal-paranodal antibodies",`Antibodies to NF155, Caspr1 or contactin-1, considered with poor response, continued worsening or relapse <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>.`,"csf"],
 ["Ophthalmoplegia",`Paralysis of eye movements, closely tied to anti-GQ1b <sup class="c" data-ref="Chiba1993" title="Source 78"><a href="/guillain-barre-syndrome/sources/#src-Chiba1993">78</a></sup>.`,"mfs"],
 ["Pain",`Present before weakness in 36%, in the acute phase in 66% and at 1 year in 38% <sup class="c" data-ref="Ruts2010Pain" title="Source 392"><a href="/guillain-barre-syndrome/sources/#src-Ruts2010Pain">392</a></sup>.`,"icu"],
 ["Paraparetic GBS",`Leg weakness and areflexia without arm, cranial or breathing involvement <sup class="c" data-ref="Kimachi2017" title="Source 226"><a href="/guillain-barre-syndrome/sources/#src-Kimachi2017">226</a></sup>. Leg-only weakness in 6% of a Dutch cohort <sup class="c" data-ref="Fokke2014" title="Source 131"><a href="/guillain-barre-syndrome/sources/#src-Fokke2014">131</a></sup>.`,"mfs"],
 ["Periaxonal space",`The space between axon and myelin, which macrophages enter in AMAN <sup class="c" data-ref="Griffin1996Nodal" title="Source 168"><a href="/guillain-barre-syndrome/sources/#src-Griffin1996Nodal">168</a></sup>.`,"subtypes"],
 ["Pharyngeal-cervical-brachial weakness",`A localised variant affecting throat, neck and arms, with anti-GT1a in 51% <sup class="c" data-ref="Nagashima2007" title="Source 313"><a href="/guillain-barre-syndrome/sources/#src-Nagashima2007">313</a></sup>.`,"mfs"],
 ["Plasma exchange",`Removing plasma and its antibodies. Within 4 weeks; 200-250 mL/kg over five sessions <sup class="c" data-ref="Leonhard2019,vanDoorn2023" title="Source 266,473"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266,473</a></sup>.`,"plex"],
 ["Plateau",`The phase after the nadir: no worse, not yet better, lasting days to weeks or months <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`,"course"],
 ["Porphobilinogen",`A urine test that confirms acute porphyria, a GBS mimic <sup class="c" data-ref="Anderson2005" title="Source 18"><a href="/guillain-barre-syndrome/sources/#src-Anderson2005">18</a></sup>.`,"ddx"],
 ["Pressure ulcer",`Skin breakdown from immobility, prevented with standard care for any bed-bound person <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`,"nursing"],
 ["Pseudohyponatraemia",`A falsely low sodium reading, which can follow IVIg <sup class="c" data-ref="Colls2003,Gagliardi2021" title="Source 82,147"><a href="/guillain-barre-syndrome/sources/#src-Colls2003">82,147</a></sup>.`,"autonomic"],
 ["Pure motor GBS",`Weakness with normal sensory studies and examination: 16% of a trial cohort <sup class="c" data-ref="Hadden1998" title="Source 173"><a href="/guillain-barre-syndrome/sources/#src-Hadden1998">173</a></sup>; about 70% in Bangladesh <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`,"subtypes"],
 ["Rajabally criteria",`Stricter nerve conduction criteria that classify more people as axonal from a single study <sup class="c" data-ref="Rajabally2015,Arends2024" title="Source 20,368"><a href="/guillain-barre-syndrome/sources/#src-Rajabally2015">20,368</a></sup>.`,"ncs"],
 ["Recurrence",`A new episode of GBS after recovery, in 2-5% <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>, more often in younger people and Miller Fisher syndrome <sup class="c" data-ref="Kuitwaard2009JNNP" title="Source 244"><a href="/guillain-barre-syndrome/sources/#src-Kuitwaard2009JNNP">244</a></sup>.`,"after"],
 ["Red flags",`Features that cast doubt on GBS, such as a sensory level, fever at onset, nadir under 24 hours or CSF cells above 50 <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`,"signs"],
 ["Reversible conduction failure",`A block or low response that recovers within days or weeks without remyelination <sup class="c" data-ref="Kuwabara1998GM1,Kokubun2010" title="Source 232,252"><a href="/guillain-barre-syndrome/sources/#src-Kuwabara1998GM1">232,252</a></sup>.`,"subtypes"],
 ["Schwann cell",`The cell that makes myelin in peripheral nerves. In AIDP, complement lies along its outer surface <sup class="c" data-ref="HaferMacko1996AIDP" title="Source 175"><a href="/guillain-barre-syndrome/sources/#src-HaferMacko1996AIDP">175</a></sup>.`,"subtypes"],
 ["SID-GBS",`The Dutch trial of a second IVIg course for a poor prognosis: no benefit, more serious adverse events <sup class="c" data-ref="Walgaard2021" title="Source 499"><a href="/guillain-barre-syndrome/sources/#src-Walgaard2021">499</a></sup>.`,"whatnot"],
 ["Single breath count",`Counting aloud in one breath. Under 20 is a useful ICU-transfer tool per EAN/PNS <sup class="c" data-ref="vanDoorn2023" title="Source 473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">473</a></sup>; not reaching 15 signals imminent failure <sup class="c" data-ref="Leonhard2019" title="Source 266"><a href="/guillain-barre-syndrome/sources/#src-Leonhard2019">266</a></sup>.`,"nursing"],
 ["Small-volume plasma exchange",`A low-cost method that separates plasma by sedimentation in a blood bag, studied in Bangladesh; not endorsed until efficacy is shown <sup class="c" data-ref="Islam2018,vanDoorn2023" title="Source 207,473"><a href="/guillain-barre-syndrome/sources/#src-Islam2018">207,473</a></sup>.`,"plex"],
 ["SNAP (sensory nerve action potential)",`The sensory nerve response. Abnormal in 85% of AIDP and 6% of AMAN in one series <sup class="c" data-ref="Kuwabara2004Sensory" title="Source 256"><a href="/guillain-barre-syndrome/sources/#src-Kuwabara2004Sensory">256</a></sup>.`,"ncs"],
 ["Succinylcholine",`A muscle relaxant that can cause hyperkalaemic cardiac arrest after denervation <sup class="c" data-ref="FDA-Quelicin,Feldman1990" title="Source 122,125"><a href="/guillain-barre-syndrome/sources/#src-FDA-Quelicin">122,125</a></sup>.`,"autonomic"],
 ["Sural sparing",`Abnormal median or ulnar sensory responses with a normal sural response; specific but insensitive <sup class="c" data-ref="vanDoorn2023,Derksen2014" title="Source 97,473"><a href="/guillain-barre-syndrome/sources/#src-vanDoorn2023">97,473</a></sup>.`,"ncs"],
 ["Takotsubo cardiomyopathy",`A reversible stress-related weakness of the heart muscle reported in GBS, mean onset 6.5 days after GBS onset in 8 cases <sup class="c" data-ref="Terayama2024" title="Source 445"><a href="/guillain-barre-syndrome/sources/#src-Terayama2024">445</a></sup>.`,"autonomic"],
 ["Tanruprubart (ANX005)",`An anti-C1q antibody. A phase 3 trial against placebo in Bangladesh and the Philippines enrolled 242 <sup class="c" data-ref="NCT04701164,Freiha2026" title="Source 139,317"><a href="/guillain-barre-syndrome/sources/#src-NCT04701164">139,317</a></sup>.`,"frontier"],
 ["Tick paralysis",`A mimic with ascending paralysis that improves rapidly once the tick is removed <sup class="c" data-ref="Edlow2010,GrattanSmith1997" title="Source 110,164"><a href="/guillain-barre-syndrome/sources/#src-Edlow2010">110,164</a></sup>.`,"ddx"],
 ["Tracheostomy",`A breathing tube through the neck. Early tracheostomy did not lower mortality in a Japanese cohort <sup class="c" data-ref="Yonezawa2020" title="Source 524"><a href="/guillain-barre-syndrome/sources/#src-Yonezawa2020">524</a></sup>.`,"icu"],
 ["Transverse myelitis",`An inflammatory cord disorder: sensory level, extensor plantars and hyperreflexia point to it <sup class="c" data-ref="TMCWG2002,vanDoorn2023" title="Source 452,473"><a href="/guillain-barre-syndrome/sources/#src-TMCWG2002">452,473</a></sup>.`,"ddx"],
 ["Venous thromboembolism",`Clots in deep veins or lungs. Rates vary by method: 7% clinical, 52% on screening <sup class="c" data-ref="Gaber2002,Ryabinkina2016" title="Source 146,394"><a href="/guillain-barre-syndrome/sources/#src-Gaber2002">146,394</a></sup>.`,"nursing"],
 ["Vital capacity",`The largest breath that can be blown out. Below 20 mL/kg is the "20" of the 20/30/40 rule <sup class="c" data-ref="Lawn2001" title="Source 263"><a href="/guillain-barre-syndrome/sources/#src-Lawn2001">263</a></sup>.`,"breathing"],
 ["Wallerian degeneration",`Breakdown of the axon beyond an injury. Wallerian-like degeneration of motor fibres was seen in AMAN autopsies <sup class="c" data-ref="McKhann1993,Griffin1995" title="Source 166,291"><a href="/guillain-barre-syndrome/sources/#src-McKhann1993">166,291</a></sup>.`,"subtypes"],
 ["Zipper method",`Alternating plasma exchange and IVIg, reported in nine ventilated children (Early evidence); EAN/PNS wants an RCT first <sup class="c" data-ref="Kesici2019,vanDoorn2023" title="Source 221,473"><a href="/guillain-barre-syndrome/sources/#src-Kesici2019">221,473</a></sup>.`,"plex"]
];
inits.glossary=()=>{
  const inp=$('#glSearch');const tname=id=>{const m=MODS.find(x=>x.id===id);return m?m.t:''};
  /* drop citation markup and fold dashes away, so '20/30/40', 'a-cidp' or 'a cidp' match */
  const norm=s=>s.replace(/<sup[^>]*>.*?<\/sup>/g,'').replace(/<[^>]+>/g,'').toLowerCase().replace(/[-–‐\s]/g,'');
  const L0=GBGL_T.slice().sort((a,b)=>a[0].localeCompare(b[0]));
  function render(){const q=norm(inp.value.trim());const L=L0.filter(g=>!q||norm(g[0]).includes(q)||norm(g[1]).includes(q));
    $('#glList').innerHTML=L.map(g=>`<div><b>${g[0]}</b>${g[1]} <button class="btn ghost" style="padding:3px 9px;font-size:12px;margin-top:6px" data-go="${g[2]}">→ ${tname(g[2])}</button></div>`).join('')||'<p>No matching terms.</p>';
    $('#glCount').textContent=`${L.length} of ${GBGL_T.length} terms`}
  inp.addEventListener('input',render);render();
};

/* =============== 6.5 sources =============== */
const GBSR_AREAN={A:'Epidemiology, burden, presentation & history',B:'Triggers, vaccines & molecular mimicry',C:'Subtypes, nerve pathology & electrophysiology',D:'Clinical course, diagnostic criteria, CSF & differential',E:'Immunotherapy: IVIg, plasma exchange, steroids & fluctuations',F:'Respiratory failure, autonomic dysfunction, pain & intensive care',G:'Prognosis, recovery, rehabilitation & long-term outcomes',H:'Children, pregnancy, nursing care & living with GBS',I:'Research frontier'};
const GBSR_SVC=['PubMed','Europe PMC','Crossref','ClinicalTrials.gov','openFDA'];
const gbsrSvc=s=>s.unverified?[]:GBSR_SVC.filter(x=>(s.validated||'').includes(x));
/* a link cut at a parenthesis inside the DOI is rebuilt from the DOI in the citation text; a trailing comma is dropped */
const gbsrLink=s=>{let l=(s.link||'').replace(/[,.;]+$/,'');if(l.split('(').length!==l.split(')').length){const m=s.text.match(/doi:\s*(\S+?)\.?(?=\s|$)/);l=m?'https://doi.org/'+m[1]:''}return l};
inits.sources=()=>{
  let area='all';const inp=$('#srcSearch');
  /* only areas that hold at least one source get a filter button */
  const used=Object.keys(GBSR_AREAN).filter(a=>SOURCES.some(s=>(s.areas||[]).includes(a)));
  $('#srcFilter').innerHTML=[ ['all','All'] ].concat(used.map(a=>[a,GBSR_AREAN[a]])).map(([k,l])=>`<button class="btn" data-sa="${k}" aria-pressed="${k==='all'}">${l}</button>`).join('');
  const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  /* counts come from the list itself, so they stay right when sources change */
  const nAll=SOURCES.length,nChk=SOURCES.filter(s=>s.unverified).length,by={};
  SOURCES.forEach(s=>gbsrSvc(s).forEach(v=>{by[v]=(by[v]||0)+1}));
  const svcTxt=GBSR_SVC.filter(v=>by[v]).map(v=>`${v} ${by[v]}`).join(' · ');
  $('#srcStats').innerHTML=`${nAll} sources in all. ${nAll-nChk} were confirmed against a database before inclusion (some by more than one: ${svcTxt}). Marked <span class="tag warn">check</span> (not cited anywhere in the guide): ${nChk}.`;
  function render(){const q=inp.value.trim().toLowerCase();let n=0;
    $('#srcList').innerHTML=SOURCES.map((s,i)=>{const show=(area==='all'||(s.areas||[]).includes(area))&&(!q||s.text.toLowerCase().includes(q)||s.key.toLowerCase().includes(q)||(s.aliases||[]).some(a=>a.toLowerCase().includes(q)));if(!show)return'';n++;
      const sv=gbsrSvc(s).map(v=>`<span class="tag good" title="${esc('Validated: '+s.validated)}"><span class="sr">validated by </span>${esc(v)}</span>`).join('');
      const lk=gbsrLink(s);
      return `<li id="src-${s.key}" value="${i+1}"><span class="key">[${i+1}] ${esc(s.key)}${s.aliases?' · also '+s.aliases.map(esc).join(', '):''}</span><span>${esc(s.text)}</span>${lk?`<a href="${esc(lk)}" target="_blank" rel="noopener">${esc(lk)}</a>`:''}${s.note?`<span class="srcnote">${esc(s.note)}</span>`:''}<span class="mods">${(s.areas||[]).map(a=>`<span class="tag">${GBSR_AREAN[a]||a}</span>`).join('')}${sv}${s.unverified?'<span class="tag warn">not matched in a research database</span>':''}</span></li>`}).join('');
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
