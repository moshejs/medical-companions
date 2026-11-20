/* ---- the junction drawing kit ----
   Shared glyphs so every module draws the same junction the same way. Each returns an SVG string. */
/* acetylcholine: a small gold dot */
const achDot=(x,y,r=2.6,o=1)=>`<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" style="fill:var(--ach);opacity:${(+o).toFixed(2)}"/>`;
/* a synaptic vesicle with n ACh dots inside */
function vesicle(x,y,r=9,o=1,n=5){let s=`<g transform="translate(${f1(x)} ${f1(y)})" style="opacity:${(+o).toFixed(2)}"><circle r="${r}" style="fill:var(--vesicle);stroke:var(--ach);stroke-width:1.2"/>`;
  for(let i=0;i<n;i++){const a=i/n*Math.PI*2+.4,q=r*.45;s+=`<circle cx="${f1(Math.cos(a)*q)}" cy="${f1(Math.sin(a)*q)}" r="${f1(r*.2)}" style="fill:var(--ach)"/>`}return s+'</g>'}
/* an acetylcholine receptor seen from the side, mouth up; open=0..1 widens the pore; st overrides the colour */
function achr(x,y,w=12,open=0,o=1,st='var(--achr)'){const g=lerp(1.2,3.4,open);return `<g transform="translate(${f1(x)} ${f1(y)})" style="opacity:${(+o).toFixed(2)}"><path d="M${f1(-w/2)} 0V${f1(-w*1.1)}Q${f1(-w/2)} ${f1(-w*1.4)} ${f1(-g)} ${f1(-w*1.35)}V0Z" style="fill:${st}"/><path d="M${f1(w/2)} 0V${f1(-w*1.1)}Q${f1(w/2)} ${f1(-w*1.4)} ${f1(g)} ${f1(-w*1.35)}V0Z" style="fill:${st}"/></g>`}
/* an IgG antibody: a Y, arms toward angle (radians, 0 = up) */
function igg(x,y,s=10,ang=0,o=1,col='var(--ab)'){return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(ang*180/Math.PI)})" style="opacity:${(+o).toFixed(2)}"><path d="M0 ${f1(s)}V0M0 0L${f1(-s*.7)} ${f1(-s*.75)}M0 0L${f1(s*.7)} ${f1(-s*.75)}" style="fill:none;stroke:${col};stroke-width:${f1(s*.26)};stroke-linecap:round"/></g>`}
/* an eye with its upper lid: droop 0 (open) .. 1 (closed). The lid's lower margin slides down over the eye. */
function eyelid(x,y,w=60,droop=0,o=1){const h=w*.34,top=-h*1.25,lid=lerp(top,h*1.1,clamp(droop));
  return `<g transform="translate(${f1(x)} ${f1(y)})" style="opacity:${(+o).toFixed(2)}"><path d="M${f1(-w/2-6)} ${f1(top*.9)}Q0 ${f1(top*1.75)} ${f1(w/2+6)} ${f1(top*.9)}" style="fill:none;stroke:var(--memb);stroke-width:1.4;stroke-linecap:round"/><path d="M${f1(-w/2)} 0Q0 ${f1(top)} ${f1(w/2)} 0Q0 ${f1(-top)} ${f1(-w/2)} 0Z" style="fill:var(--panel);stroke:var(--ink);stroke-width:1.6"/><circle r="${f1(h*.62)}" style="fill:var(--nerve)"/><circle r="${f1(h*.28)}" style="fill:var(--ink)"/><path d="M${f1(-w/2)} 0Q0 ${f1(top)} ${f1(w/2)} 0Q0 ${f1(lid)} ${f1(-w/2)} 0Z" style="fill:var(--muscle);stroke:var(--memb);stroke-width:1.6;stroke-linejoin:round"/></g>`}
