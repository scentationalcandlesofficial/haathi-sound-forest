(function(){
"use strict";
/* ======================= CONTENT ======================= */
const ORDER=['s','a','t','i','p','n','c','k','e','h','r','m','d','g','o','u','l','f','b'];
const LET=['s','a','t','i','p','n','c','e','h','r','m','d','g','o','u','l','f','b'];
const ALPHA='abcdefghijklmnopqrstuvwxyz'.split('');
const GROUP={s:1,a:1,t:1,i:1,p:1,n:1,c:2,k:2,e:2,h:2,r:2,m:2,d:2,g:3,o:3,u:3,l:3,f:3,b:3};
const SHOW={s:'sss',a:'a',t:'t',i:'i',p:'p',n:'nnn',c:'k',k:'k',e:'e',h:'h',r:'rrr',m:'mmm',d:'d',g:'g',o:'o',u:'u',l:'lll',f:'fff',b:'b'};
const NAME={s:'ess',a:'ay',t:'tee',i:'eye',p:'pee',n:'en',c:'see',k:'kay',e:'ee',h:'aitch',r:'are',m:'em',d:'dee',g:'jee',o:'oh',u:'you',l:'el',f:'ef',b:'bee'};
const WORDS={
 s:[['sun','☀️'],['snake','🐍'],['sock','🧦']], a:[['ant','🐜'],['apple','🍎']], t:[['tiger','🐅'],['tomato','🍅'],['tent','⛺']],
 i:[['insect','🐛'],['iguana','🦎']], p:[['peacock','🦚'],['parrot','🦜'],['pencil','✏️']], n:[['nest','🪺'],['nose','👃'],['nut','🥜']],
 c:[['cat','🐈'],['car','🚗'],['cow','🐄']], k:[['kite','🪁'],['key','🔑'],['kangaroo','🦘']], e:[['egg','🥚'],['elephant','🐘']],
 h:[['hat','👒'],['house','🏠'],['horse','🐎']], r:[['rabbit','🐇'],['rose','🌹'],['rocket','🚀']], m:[['mango','🥭'],['monkey','🐒'],['moon','🌙']],
 d:[['duck','🦆'],['drum','🥁'],['dog','🐕']], g:[['goat','🐐'],['gift','🎁'],['grapes','🍇']], o:[['octopus','🐙'],['orange','🍊'],['ox','🐂']],
 u:[['umbrella','☂️'],['up','⬆️']], l:[['lion','🦁'],['leaf','🍃'],['lemon','🍋']], f:[['fish','🐟'],['frog','🐸'],['fox','🦊']], b:[['ball','⚽'],['bus','🚌'],['banana','🍌']]
};
const CVC=['cat','sun','bus','hat','dog','pig','map','bed','leg','bat','rat','nut','log','ten','hut','sat','pin','tap','pan','tin','nap','man','mud','hen','red'];
const CVC_CLIP=new Set(['cat','sun','bus','hat','dog','pig','map','bed','leg','bat','rat','nut','log','ten','hut']);
const KEYW=l=>WORDS[l][0];
const SAME={c:'k',k:'c'};
const ACTION={s:'Hiss like a pressure cooker',a:'Open wide like biting an apple',t:'Tap your toes',i:'Itchy insect! Scratch your arm',p:'Pop bubbles with a finger',n:'Wag your finger: no, no',c:'Click your fingers',k:'Kick a ball',e:'Crack an egg on your knee',h:'Breathe on your hand like hot chai',r:'Drive an auto-rickshaw',m:'Rub your tummy: yummy mango',d:'Beat a dhol on your lap',g:'Gulp some water',o:'Make a big O with your arms',u:'Put up an umbrella',l:'Lick a kulfi',f:'Fan your face',b:'Bounce a ball'};
const HOWTO={s:'a long hiss, <b>sssss</b>',a:'short <b>a</b> as in ant',t:'a quick whispered <b>t</b>, no "uh"',i:'short <b>i</b> as in insect',p:'a puff of air, <b>p</b>, no "uh"',n:'a hum, <b>nnnn</b>',c:'a whispered <b>k</b> as in kite (also used for k)',e:'short <b>e</b> as in egg',h:'a breathy <b>h</b>, like fogging a mirror',r:'a growl, <b>rrrr</b>',m:'a hum, <b>mmmm</b>',d:'a short <b>d</b>, no "uh"',g:'a short <b>g</b> as in goat',o:'short <b>o</b> as in octopus',u:'short <b>u</b> as in umbrella',l:'<b>llll</b>, tongue up',f:'<b>ffff</b>, like blowing',b:'a short <b>b</b>, lips pop, no "uh"'};
const COUNT_THINGS=[{k:'ladoo',label:'ladoos'},{k:'🥭',label:'mangoes'},{k:'🍌',label:'bananas'},{k:'🪔',label:'diyas'},{k:'🦆',label:'ducks'},{k:'🌸',label:'flowers'},{k:'⭐',label:'stars'},{k:'🐟',label:'fish'}];
const SHAPES={oval:'<ellipse cx="50" cy="50" rx="45" ry="29"/>',diamond:'<path d="M50 6L90 50L50 94L10 50Z"/>',hexagon:'<path d="M28 12H72L94 50L72 88H28L6 50Z"/>',crescent:'<path d="M64 8A43 43 0 1 0 64 92A34 34 0 1 1 64 8Z"/>',circle:'<circle cx="50" cy="50" r="40"/>',square:'<rect x="12" y="12" width="76" height="76" rx="4"/>',triangle:'<path d="M50 10 L92 88 H8 Z"/>',rectangle:'<rect x="6" y="26" width="88" height="48" rx="4"/>',star:'<path d="M50 6l12 30 32 2-25 20 9 32-28-18-28 18 9-32L6 38l32-2z"/>',heart:'<path d="M50 88C10 60 6 34 22 22c12-9 24-2 28 8 4-10 16-17 28-8 16 12 12 38-28 66z"/>'};
/* the shapes asked about grow by level; the screen always shows 6 shapes to choose from */
const SHAPESETS=[['circle','square','triangle'],['circle','square','triangle','rectangle'],['circle','square','triangle','rectangle','star','heart','oval'],['circle','square','triangle','rectangle','star','heart','oval','diamond','hexagon','crescent']];
const SHAPE_COL=['#d94f8a','#3a8fd9','#7a9a1f','#b5651d','#147a8a','#c8364b','#f6a821','#2f8a5f','#8a5cc2','#e07a12'];
const BEAD={r:['#e2563f','circle'],b:['#147a8a','circle'],y:['#f6a821','circle'],g:['#2f8a5f','square'],p:['#8a5cc2','triangle']};
const REGIONS=[
 {id:'forest',name:'Mango Forest',clip:'P_reg_forest',friend:['🦚','peacock'],sky:'#d9f0d5'},
 {id:'river',name:'River Ghat',clip:'P_reg_river',friend:['🐬','dolphin'],sky:'#d6eef3'},
 {id:'mela',name:'Mela Ground',clip:'P_reg_mela',friend:['🐫','camel'],sky:'#fde9cf'},
 {id:'station',name:'Train Station',clip:'P_reg_station',friend:['🦜','parrot'],sky:'#e6e3f4'},
 {id:'beach',name:'Beach',clip:'P_reg_beach',friend:['🐅','tiger'],sky:'#fff3d6'},
 {id:'hills',name:'Snowy Hills',clip:'P_reg_hills',friend:['🐂','yak'],sky:'#eef4fb'}
];
const SHOP_ITEMS=[['🍎','apple'],['🎈','balloon'],['🍦','ice cream'],['🪁','kite'],['🧸','teddy'],['🥭','mango'],['🍌','banana']];

/* ======================= STORE ======================= */
const KEY='haathi-journey-v3';
let S=load();
/* the new design is the app. The old map is kept in the code only as an emergency fallback: ?new=0 in the address shows it on this phone, ?new=1 returns. */
let NEWUI=true;try{const q=new URLSearchParams(location.search).get('new');if(q==='0')localStorage.setItem('haathi-newui','0');else if(q==='1')localStorage.removeItem('haathi-newui');NEWUI=localStorage.getItem('haathi-newui')!=='0'}catch(e){}
/* families who used the old design get one note in Grown-ups about what changed */
if(S.profile&&NEWUI){try{if(!localStorage.getItem('haathi-nd-note')){localStorage.setItem('haathi-nd-note',(S.chapters&&S.chapters.some(c=>!c.adv))?'show':'seen')}}catch(e){}}else if(!S.profile){try{localStorage.setItem('haathi-nd-note','seen')}catch(e){}}
const ndNote=()=>{try{return localStorage.getItem('haathi-nd-note')==='show'}catch(e){return false}};
function blank(){return {profile:null,chapters:[],intro:[],lastIntroCh:-9,sounds:{},sk:{},minutes:{},settings:{sfx:true,unlock:false,consent:false},said:0,likes:{},fbPrefs:{},device:null,lastSync:0,sentFb:0}}
function load(){try{const r=localStorage.getItem(KEY);if(r){const o=Object.assign(blank(),JSON.parse(r));o.settings=Object.assign(blank().settings,o.settings);o.likes=o.likes||{};o.fbPrefs=o.fbPrefs||{};return o}}catch(e){}return blank()}
function loadHindi(){if(window.__hiLoaded||window.__hiLoading||!(S.settings&&S.settings.lang==='hi'))return;window.__hiLoading=1;const sc=document.createElement('script');sc.src='clips-hi.js';sc.onerror=()=>{window.__hiLoading=0};document.head.appendChild(sc)}
function badge(){['btn-parent','nd-parent'].forEach(id=>{const b=$(id);if(b)b.classList.toggle('has-news',(S.unseen||0)>0||ndNote()||sgPending())})}
function renderProgress(){const el=$('p-progress');if(!el)return;const nm=S.profile?S.profile.name:'Your child';
  const modes=['letters','numbers','writing','discover'].map(k=>`<span class="chip">${{letters:'Letters',numbers:'Numbers',writing:'Writing',discover:'Discover'}[k]}: <b>${MODE_NAMES[modeOf(k)]}</b></span>`).join(' ');
  const ch=(S.changes||[]).slice(-12).reverse();
  const rows=Object.keys(SK).filter(id=>S.sk[id]&&S.sk[id].n).sort((a,b)=>(S.sk[b].last||'').localeCompare(S.sk[a].last||'')).slice(0,14).map(id=>{const s=S.sk[id];const last=(S.changes||[]).filter(c=>c.id===id&&c.kind==='level').slice(-1)[0];
    const tr=last?(last.to>last.from?'<span class="up">▲ up</span>':'<span class="down">▼ down</span>')+` <small>${last.d.slice(5)}</small>`:'<small>steady</small>';
    return `<tr><td>${SK[id].name}</td><td>${SK[id].lab(param(id))}</td><td>${tr}</td><td>${Math.round(s.p*100)}%</td></tr>`}).join('');
  el.innerHTML=`<p>${modes}</p><h4>Recent changes</h4>${ch.length?`<ul class="why">${ch.map(c=>`<li><small>${c.d.slice(5)}</small> ${c.kind==='mode'?'🔀 ':''}${c.txt}</li>`).join('')}</ul>`:'<p class="note">No changes yet. Levels move after a few games.</p>'}
    <h4>Skills played recently</h4>${rows?`<div style="overflow-x:auto"><table class="eng-table"><tr><th>Skill</th><th>Now</th><th>Last change</th><th>Right first try</th></tr>${rows}</table></div>`:'<p class="note">Play a few games first.</p>'}`}
function applyNums(){document.body.classList.toggle('nonum',S.settings&&S.settings.countNums===false)}
/* once a child switch has begun, nothing may write the old child's progress over the new one while the page reloads */
let FROZEN=false;
function save(){if(FROZEN)return;try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
/* ---- several children on one phone: the active child lives in KEY, the others are parked under KEY::id ---- */
const KIDS_KEY='haathi-kids-v1';
function kidsIdx(){let k=null;try{k=JSON.parse(localStorage.getItem(KIDS_KEY)||'null')}catch(e){}
  if(!k)k={list:[],active:null};if(S.profile&&!k.active){k.active='k'+Date.now().toString(36);k.list.push({id:k.active,name:S.profile.name,age:S.profile.age})}
  const me=k.list.find(x=>x.id===k.active);if(me&&S.profile){me.name=S.profile.name;me.age=S.profile.age}
  try{localStorage.setItem(KIDS_KEY,JSON.stringify(k))}catch(e){}return k}
function parkActive(k){if(k.active&&S.profile){save();try{localStorage.setItem(KEY+'::'+k.active,JSON.stringify(S))}catch(e){}}}
function switchKid(id){const k=kidsIdx();if(id===k.active)return;parkActive(k);let st=null;try{st=localStorage.getItem(KEY+'::'+id)}catch(e){}
  if(!st)return;FROZEN=true;try{localStorage.setItem(KEY,st);k.active=id;localStorage.setItem(KIDS_KEY,JSON.stringify(k))}catch(e){}location.reload()}
function addKid(){const k=kidsIdx();parkActive(k);FROZEN=true;try{localStorage.removeItem(KEY);k.active=null;localStorage.setItem(KIDS_KEY,JSON.stringify(k))}catch(e){}location.reload()}
function removeKid(id){const k=kidsIdx();if(id===k.active)return;k.list=k.list.filter(x=>x.id!==id);try{localStorage.removeItem(KEY+'::'+id);localStorage.setItem(KIDS_KEY,JSON.stringify(k))}catch(e){}renderKids()}
function renderKids(){const el=$('kids-list');if(!el)return;const k=kidsIdx();el.innerHTML='';
  k.list.forEach(c=>{const r=document.createElement('div');r.className='kidrow'+(c.id===k.active?' on':'');r.innerHTML=`<b>${(c.name||'Child').replace(/</g,'')} · age ${c.age}</b>`;
    if(c.id===k.active){const t=document.createElement('span');t.className='note';t.textContent='playing now';r.appendChild(t)}
    else{const p=document.createElement('button');p.className='pill-btn small primary';p.textContent='Play as';p.onclick=()=>switchKid(c.id);r.appendChild(p);
      const d=document.createElement('button');d.className='pill-btn small';d.textContent='Remove';d.onclick=()=>{if(d.dataset.sure){removeKid(c.id)}else{d.dataset.sure=1;d.textContent='Tap again to remove'}};r.appendChild(d)}
    el.appendChild(r)})}
const dkey=dt=>dt.getFullYear()+'-'+String(dt.getMonth()+1).padStart(2,'0')+'-'+String(dt.getDate()).padStart(2,'0');
const today=()=>dkey(new Date());
const daysBetween=(a,b)=>Math.round((new Date(b)-new Date(a))/864e5);
const rnd=a=>a[Math.floor(Math.random()*a.length)];
const ri=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const $=id=>document.getElementById(id);
const sleep=ms=>new Promise(r=>setTimeout(r,ms));

/* ======================= LEARNING ENGINE ======================= */
/* Each skill has levels. p = running estimate of first-try success (0..1).
   Level up: 4+ tries at this level and p >= 0.8. Level down: 3+ tries and p < 0.35. */
const SK={
 count:{sub:'Maths',name:'Counting objects',levels:[5,10,15,20,30],lab:v=>'to '+v,unlock:()=>true,node:v=>({t:'count',max:v})},
 numfind:{sub:'Maths',name:'Recognising numbers',levels:[5,10,20,30,50,100],lab:v=>'1 to '+v,unlock:()=>true,node:v=>({t:'numfind',max:v})},
 dice:{sub:'Maths',name:'Quick look (dots)',levels:[3,6,10],lab:v=>'up to '+v,unlock:()=>true,node:v=>({t:'dice',max:v})},
 shape:{sub:'Maths',name:'Shapes',levels:[0,1,2,3],lab:v=>SHAPESETS[v].length+' shapes',unlock:()=>true,node:v=>({t:'shape',set:SHAPESETS[v]})},
 pattern:{sub:'Maths',name:'Patterns',levels:[0,1,2],lab:v=>['AB','AB, ABC','mixed'][v],unlock:()=>true,node:v=>({t:'pattern',lvl:v})},
 length:{sub:'Maths',name:'Longer, shorter, taller',levels:[0,1],lab:v=>['longer','longer/shorter/taller'][v],unlock:()=>true,node:v=>({t:'length',lvl:v})},
 more:{sub:'Maths',name:'Which has more',levels:[5,10,20,30],lab:v=>'to '+v,unlock:()=>lv('count')>=1,node:v=>({t:'more',max:v})},
 next:{sub:'Maths',name:'Before and after',levels:[10,20,30,50,100],lab:v=>'to '+v,unlock:()=>lv('count')>=1,node:v=>({t:'next',max:v})},
 bigger:{sub:'Maths',name:'Bigger number',levels:[10,20,30,50,100],lab:v=>'to '+v,unlock:()=>lv('numfind')>=1,node:v=>({t:'bigger',max:v})},
 missing:{sub:'Maths',name:'Missing number',levels:[10,20,30,50,100],lab:v=>'to '+v,unlock:()=>((S.profile&&S.profile.age)||4)>=5||(pr('next')>=.6&&n_('next')>=3),node:v=>({t:'missing',max:v})},
 add:{sub:'Maths',name:'Adding',levels:[5,10,20,30,50],lab:v=>'within '+v,unlock:()=>((S.profile&&S.profile.age)||4)>=5||(lv('count')>=1&&pr('more')>=.6&&n_('more')>=3),node:v=>({t:'add',max:v})},
 takeaway:{sub:'Maths',name:'Taking away',levels:[5,10,20,30,50],lab:v=>'within '+v,unlock:()=>((S.profile&&S.profile.age)||4)>=5||(pr('add')>=.6&&n_('add')>=3),node:v=>({t:'takeaway',max:v})},
 share:{sub:'Maths',name:'Sharing fairly',levels:[6,10,20],lab:v=>'up to '+v,unlock:()=>lv('count')>=1,node:v=>({t:'share',max:v})},
 shop:{sub:'Maths',name:'Mela shop (coins)',levels:[5,10,11],lab:v=>v===11?'₹1, ₹2, ₹5 coins':'₹1 coins to '+v,unlock:()=>lv('numfind')>=1,node:v=>({t:'shop',lvl:v})},
 wpre:{sub:'Writing',name:'Pre-writing patterns',levels:['line','circle','cross','zigzag','wave','loops','cups','bridges','mountains','stairs','rainbow','spiral'],lab:v=>v,unlock:()=>true,node:v=>({t:'wpre',k:v})},
 wshape:{sub:'Writing',name:'Drawing shapes',levels:['square','triangle','rectangle','star'],lab:v=>v,unlock:()=>lv('wpre')>=2,node:v=>({t:'wshape',k:v})},
 wletter:{sub:'Writing',name:'Small letters',levels:[0],lab:()=>'letters met so far',unlock:()=>true,node:()=>({t:'wletter',l:weakestLetter(true)})},
 wnum:{sub:'Writing',name:'Writing numbers',levels:[5,10,20,30,50,99],lab:v=>'1 to '+v,unlock:()=>true,node:v=>({t:'wnum',n:ri(Math.max(1,v>10?11:1),v)})},
 wcap:{sub:'Writing',name:'Big letters',levels:[0],lab:()=>'capitals of letters met',unlock:()=>S.intro.length>=6,node:()=>({t:'wcap',l:rnd(S.intro)})},
 wname:{sub:'Writing',name:'Writing my name',levels:[0],lab:()=>'own name',unlock:()=>((S.profile&&S.profile.age)||4)>=5||S.intro.length>=4&&n_('wletter')>=3,node:()=>({t:'wname'})},
 wword:{sub:'Writing',name:'Writing words',levels:[0],lab:()=>'3-letter words',unlock:()=>((S.profile&&S.profile.age)||4)>=6||S.intro.length>=6&&pr('wletter')>=.6,node:()=>({t:'wword',w:pickWord()})},
 dots:{sub:'Writing',name:'Dot-to-dot',levels:[5,9,10],lab:v=>'up to '+v+' dots',unlock:()=>true,node:v=>({t:'dots',max:v})},
 tens:{sub:'Maths',name:'Tens and ones (place value)',levels:[20,50,99],lab:v=>'to '+v,unlock:()=>lv('count')>=3||((S.profile&&S.profile.age)||4)>=5,node:v=>({t:'tens',max:v})},
 clock:{sub:'Maths',name:'Telling time',levels:[0,1],lab:v=>['o\'clock','o\'clock and half past'][v],unlock:()=>((S.profile&&S.profile.age)||4)>=6||lv('count')>=4,node:v=>({t:'clock',lvl:v})},
 tenmore:{sub:'Maths',name:'10 more, 10 less',levels:[50,99],lab:v=>'to '+v,unlock:()=>((S.profile&&S.profile.age)||4)>=6||lv('tens')>=1,node:v=>({t:'tenmore',max:v})},
 fewer:{sub:'Maths',name:'Which has fewer',levels:[5,10,20,30],lab:v=>'to '+v,unlock:()=>((S.profile&&S.profile.age)||4)>=4||n_('more')>=3,node:v=>({t:'fewer',max:v})},
 smaller:{sub:'Maths',name:'Smaller number',levels:[10,20,30,50,100],lab:v=>'0 to '+v,unlock:()=>lv('numfind')>=1,node:v=>({t:'smaller',max:v})},
 matchgroup:{sub:'Maths',name:'Match number to group',levels:[5,10,15],lab:v=>'to '+v,unlock:()=>true,node:v=>({t:'matchgroup',max:v})},
 maketen:{sub:'Maths',name:'Make 5 and make 10',levels:[5,10],lab:v=>'make '+v,unlock:()=>((S.profile&&S.profile.age)||4)>=5||n_('add')>=3,node:v=>({t:'maketen',max:v})},
 beats:{sub:'Maths',name:'Counting drum beats',levels:[4,6,8],lab:v=>'up to '+v,unlock:()=>true,node:v=>({t:'beats',max:v})},
 rocket:{sub:'Maths',name:'Counting down',levels:[5,10],lab:v=>'from '+v,unlock:()=>((S.profile&&S.profile.age)||4)>=4||lv('count')>=1,node:v=>({t:'rocket',max:v})},
 order:{sub:'Maths',name:'Numbers in order',levels:[5,10,15],lab:v=>'1 to '+v,unlock:()=>true,node:v=>({t:'order',max:v})},
 frog:{sub:'Maths',name:'Number line hops',levels:[10,20],lab:v=>'0 to '+v,unlock:()=>((S.profile&&S.profile.age)||4)>=5||n_('add')>=3,node:v=>({t:'frog',max:v})},
 skip:{sub:'Maths',name:'Skip counting',levels:[10,5,2],lab:v=>'in '+v+'s',unlock:()=>((S.profile&&S.profile.age)||4)>=5||lv('count')>=2,node:v=>({t:'skip',max:v})},
 hiding:{sub:'Maths',name:'Hiding ladoos (number bonds)',levels:[5,10],lab:v=>'within '+v,unlock:()=>((S.profile&&S.profile.age)||4)>=5||n_('add')>=3,node:v=>({t:'hiding',max:v})},
 oddshape:{sub:'Maths',name:'Odd shape out',levels:[0],lab:()=>'shapes',unlock:()=>true,node:()=>({t:'oddshape'})},
 sortcolour:{sub:'Maths',name:'Sorting by colour',levels:[0],lab:()=>'2 colours',unlock:()=>true,node:()=>({t:'sortcolour'})},
 size:{sub:'Maths',name:'Bigger and smaller',levels:[0],lab:()=>'size',unlock:()=>true,node:()=>({t:'size'})},
 heavy:{sub:'Maths',name:'Heavy and light',levels:[0],lab:()=>'weight',unlock:()=>true,node:()=>({t:'heavy'})},
 queue:{sub:'Maths',name:'First and last',levels:[0],lab:()=>'position',unlock:()=>true,node:()=>({t:'queue'})},
 money:{sub:'Maths',name:'Which purse has more',levels:[5,11],lab:v=>v===11?'₹1, ₹2, ₹5':'₹1 coins',unlock:()=>lv('numfind')>=1,node:v=>({t:'money',max:v})},
 double:{sub:'Maths',name:'Doubles',levels:[3,5],lab:v=>'up to '+v+'+'+v,unlock:()=>((S.profile&&S.profile.age)||4)>=5||n_('add')>=3,node:v=>({t:'double',max:v})},
 countshapes:{sub:'Maths',name:'Counting shapes',levels:[5,8],lab:v=>'up to '+v,unlock:()=>true,node:v=>({t:'countshapes',max:v})},
 maze:{sub:'Writing',name:'Road maze',levels:[0],lab:()=>'pencil control',unlock:()=>true,node:()=>({t:'maze'})},
 tracepic:{sub:'Writing',name:'Tracing pictures',levels:[0],lab:()=>'outlines',unlock:()=>true,node:()=>({t:'tracepic'})},
 drawshapes:{sub:'Writing',name:'Drawing with shapes',levels:[0],lab:()=>'pictures',unlock:()=>lv('wpre')>=1,node:()=>({t:'drawshapes'})},
 finishpic:{sub:'Writing',name:'Finish the picture',levels:[0],lab:()=>'mirror half',unlock:()=>lv('wpre')>=1,node:()=>({t:'finishpic'})},
 wrainbow:{sub:'Writing',name:'Rainbow writing',levels:[0],lab:()=>'letters met',unlock:()=>((S.profile&&S.profile.age)||4)>=4||n_('wletter')>=4,node:()=>({t:'wrainbow'})},
 wheard:{sub:'Writing',name:'Write what you hear',levels:[0],lab:()=>'letters met',unlock:()=>((S.profile&&S.profile.age)||4)>=5||(n_('wletter')>=6&&pr('wletter')>=.7),node:()=>({t:'wheard'})},
 countwrite:{sub:'Writing',name:'Count and write',levels:[5,9],lab:v=>'1 to '+v,unlock:()=>true,node:v=>({t:'countwrite',max:v})},
 wcopy:{sub:'Writing',name:'Copying letters and numbers',levels:[0],lab:()=>'copy',unlock:()=>n_('wletter')>=2,node:()=>({t:'wcopy'})},
 wlines:{sub:'Writing',name:'Straight lines',levels:[0],lab:()=>'dot to dot',unlock:()=>true,node:()=>({t:'wlines'})},
 joinmatch:{sub:'Writing',name:'Join the pairs',levels:[0],lab:()=>'lines',unlock:()=>S.intro.length>=3,node:()=>({t:'joinmatch'})},
 colour:{sub:'Writing',name:'Colouring',levels:[0],lab:()=>'fine motor',unlock:()=>true,node:()=>({t:'colour'})},
 wfamily:{sub:'Writing',name:'Letter families',levels:[0],lab:()=>'letters that start the same way',unlock:()=>ageR()>=5||(n_('wletter')>=8&&pr('wletter')>=.75),node:()=>({t:'wfamily'})},
 wfirst:{sub:'Writing',name:'Write the first letter',levels:[0],lab:()=>'first letters',unlock:()=>ageR()>=4||n_('wletter')>=4,node:()=>({t:'wfirst'})},
 wcopyword:{sub:'Writing',name:'Copy a word',levels:[0],lab:()=>'words',unlock:()=>ageR()>=5,node:()=>({t:'wcopyword'})},
 wsentence:{sub:'Writing',name:'Copy a sentence',levels:[0],lab:()=>'short sentences',unlock:()=>ageR()>=6,node:()=>({t:'wsentence'})},
 wsurface:{sub:'Writing',name:'Rangoli, sand and chalk',levels:[0],lab:()=>'fun surfaces',unlock:()=>true,node:()=>({t:'wsurface'})},
 nlplace:{sub:'Maths',name:'Number line',levels:[10,20,100],lab:v=>'0 to '+v,unlock:()=>ageR()>=5||lv('next')>=1,node:v=>({t:'nlplace',max:v})},
 evenodd:{sub:'Maths',name:'Even and odd',levels:[10,20,50],lab:v=>'up to '+v,unlock:()=>ageR()>=6,node:v=>({t:'evenodd',max:v})},
 groups:{sub:'Maths',name:'Equal groups (tables)',levels:[3,5,10],lab:v=>'up to '+v+' groups of 2, 5, 10',unlock:()=>ageR()>=7||(ageR()>=6&&lv('skip')>=1),node:v=>({t:'groups',max:v})},
 barchart:{sub:'Maths',name:'Picture graphs',levels:[5,9],lab:v=>'up to '+v+' each',unlock:()=>ageR()>=5,node:v=>({t:'barchart',max:v})},
 calendar:{sub:'Maths',name:'Days and months',levels:[0,1],lab:v=>v?'days and months':'days of the week',unlock:()=>ageR()>=6,node:v=>({t:'calendar'})},
 wdict:{sub:'Writing',name:'Listen and write',levels:[0],lab:()=>'dictation',unlock:()=>true,node:()=>({t:'wdict'})},
 wlabel:{sub:'Writing',name:'Label the picture',levels:[0],lab:()=>'picture names',unlock:()=>true,node:()=>({t:'wlabel'})},
 wnumword:{sub:'Writing',name:'Number words',levels:[0],lab:()=>'one to ten',unlock:()=>true,node:()=>({t:'wnumword'})},
 wcapname:{sub:'Writing',name:'Capital letters for names',levels:[0,1],lab:v=>v?'on your own':'with guides',unlock:()=>true,node:()=>({t:'wcapname'})},
 wfill:{sub:'Writing',name:'Write the missing word',levels:[0],lab:()=>'sentences',unlock:()=>true,node:()=>({t:'wfill'})},
 wplural:{sub:'Writing',name:'One and many (add s)',levels:[0,1],lab:v=>v?'on your own':'with guides',unlock:()=>true,node:()=>({t:'wplural'})},
 add2:{sub:'Maths',name:'Adding tens and ones',levels:[50,99,100],lab:v=>v===100?'within 100, with carrying':'within '+v,unlock:()=>true,node:v=>({t:'add2',max:Math.min(99,v)})},
 sub2:{sub:'Maths',name:'Taking away tens and ones',levels:[50,99,100],lab:v=>v===100?'within 100, with borrowing':'within '+v,unlock:()=>true,node:v=>({t:'sub2',max:Math.min(99,v)})},
 missadd:{sub:'Maths',name:'Missing number sums',levels:[10,20],lab:v=>'within '+v,unlock:()=>true,node:v=>({t:'missadd',max:v})},
 coins:{sub:'Maths',name:'Counting money',levels:[20,50],lab:v=>v>20?'₹1 to ₹10 coins, up to ₹50':'₹1, ₹2, ₹5 coins, up to ₹20',unlock:()=>true,node:v=>({t:'coins',max:v})},
 measure:{sub:'Maths',name:'Measuring with a ruler',levels:[10,15],lab:v=>'up to '+v+' cm',unlock:()=>true,node:v=>({t:'measure',max:v})},
 story:{sub:'Maths',name:'Story sums',levels:[0,1],lab:v=>v?'words only':'with pictures',unlock:()=>true,node:()=>({t:'story'})},
 fraction:{sub:'Maths',name:'Halves and quarters',levels:[0,1],lab:v=>v?'halves and quarters':'halves',unlock:()=>true,node:()=>({t:'fraction'})},
 read:{sub:'Reading',name:'Reading words',levels:[3,4,5],lab:v=>'words up to '+v+' letters',unlock:()=>readUnlock(),node:()=>({t:'readpic'})}
};
/* letter games: picked by the chapter planner from what is unlocked */
const LGAMES={bubbles:()=>true,snack:()=>true,picletter:()=>true,letterpic:()=>true,samesound:()=>true,oddsound:()=>S.intro.length>=2,fishing:()=>true,stones:()=>true,mole:()=>true,hunt:()=>true,
 sortsound:()=>S.intro.length>=2,memory:()=>S.intro.length>=3,bigsmall:()=>true,sameletter:()=>true,shadow:()=>true,hidden:()=>true,nextletter:()=>strongL(),missingletter:()=>strongL(),
 rhyme:()=>true,buildword:()=>strongL(),firstmissing:()=>ageR()>=4&&S.intro.length>=4};
/* alphabet order and word building start at 5, or earlier only for a child who has clearly mastered 10+ letters */
function strongL(){return ageR()>=5||(S.intro.length>=10&&letterSkill()>=.75)}
function pickLetterGame(exclude){let c=Object.keys(LGAMES).filter(g=>g!==exclude&&inPlay('letters',g));if(!c.length)c=Object.keys(LGAMES).filter(g=>tierOf('letters',g)===modeOf('letters'))
  let best=null,bs=-9;c.forEach(g=>{const sc=Math.random()*1.4+Math.max(-.5,Math.min(.5,prefBonus(g)))-recentPenalty(g);if(sc>bs){bs=sc;best=g}});return best||'bubbles'}
/* every level or mode change is written down for the grown-ups panel */
function logChange(id,from,to,kind,why){S.changes=S.changes||[];const sk=SK[id];S.changes.push({d:today(),id,from,to,kind:kind||'level',why:why||'',
  txt:kind==='mode'?why:`${sk?sk.name:id}: ${sk?sk.lab(sk.levels[Math.min(from,sk.levels.length-1)]):from} → ${sk?sk.lab(sk.levels[Math.min(to,sk.levels.length-1)]):to}`});if(S.changes.length>60)S.changes=S.changes.slice(-60);S.unseen=(S.unseen||0)+1}
function st(id){return S.sk[id]||(S.sk[id]={lvl:0,p:.5,n:0,ln:0,last:null,up:null})}
const lv=id=>(S.sk[id]||{lvl:0}).lvl, pr=id=>(S.sk[id]||{p:0}).p, n_=id=>(S.sk[id]||{n:0}).n;
function learn(id,ok){if(!SK[id])return;const s=st(id);s.n++;s.ln++;s.p=s.p+.25*((ok?1:0)-s.p);s.last=today();s.streak=ok?(s.streak||0)+1:0;s.miss=ok?0:(s.miss||0)+1;
  const L=SK[id].levels.length;
  const was=s.lvl;
  if(s.lvl<L-1&&((s.ln>=5&&s.p>=.8)||s.streak>=6)){s.lvl++;s.ln=0;s.p=.6;s.streak=0;s.up=today();s.justUp=1}
  else if(s.lvl>0&&((s.ln>=3&&s.p<.35)||s.miss>=3)){s.lvl--;s.ln=0;s.p=.5;s.miss=0}
  if(s.lvl!==was){s.changedAt=Date.now();logChange(id,was,s.lvl)}
  save()}
/* ---- starting point by age, so a 4-year-old starts at 1-10, not 1-3 ---- */
/* Starting levels by age. Maths follows Head Start ELOF (3-5), US Kindergarten (5-6) and Grade 1 (6-7) standards;
   writing follows typical pre-writing milestones (cross ~4y1m, square ~4y6m, triangle ~5y3m). Levels then adapt to the child. */
const PLACE={
 3:{count:0,numfind:0,dice:0,matchgroup:0,order:0,beats:0,wpre:0,dots:0},
 4:{count:1,numfind:1,dice:1,more:0,fewer:0,next:0,bigger:0,smaller:0,matchgroup:1,order:0,rocket:0,beats:0,shape:1,pattern:1,wnum:1,wpre:3,dots:0,countshapes:0},
 5:{count:3,numfind:2,dice:2,more:1,fewer:1,next:1,bigger:1,smaller:1,missing:1,add:1,takeaway:1,matchgroup:2,order:1,rocket:1,beats:1,hiding:1,maketen:1,shop:1,
    tens:0,skip:0,shape:2,pattern:2,length:1,countshapes:1,wnum:2,wpre:6,dots:1,countwrite:1},
 6:{count:4,numfind:4,dice:2,more:3,fewer:3,next:3,bigger:3,smaller:3,missing:3,add:2,takeaway:2,matchgroup:2,order:2,rocket:1,beats:2,hiding:1,maketen:1,shop:2,share:1,
    tens:1,skip:1,frog:1,money:1,double:1,clock:0,tenmore:0,read:0,nlplace:1,evenodd:0,groups:0,barchart:0,calendar:0,shape:3,pattern:2,length:1,countshapes:1,wnum:3,wpre:11,dots:2,countwrite:1},
 7:{count:4,numfind:5,dice:2,more:3,fewer:3,next:4,bigger:4,smaller:4,missing:4,add:4,takeaway:4,matchgroup:2,order:2,rocket:1,beats:2,hiding:1,maketen:1,shop:2,share:2,
    tens:2,skip:2,frog:1,money:1,double:1,clock:1,tenmore:1,read:1,nlplace:2,evenodd:1,groups:1,barchart:1,calendar:1,shape:3,pattern:2,length:1,countshapes:1,wnum:5,wpre:11,dots:2,countwrite:1}};
const LETTERS_BY_AGE={3:3,4:6,5:10,6:18,7:18};
function placeByAge(){S.modes={};const age=Math.min(7,Math.max(3,(S.profile&&S.profile.age)||4));const P=PLACE[age];
  Object.keys(P).forEach(id=>{if(!SK[id])return;const s=st(id);const tgt=Math.min(P[id],SK[id].levels.length-1);if(s.lvl<tgt){s.lvl=tgt;s.ln=0;s.p=Math.max(s.p,.55)}});
  const want=LETTERS_BY_AGE[age];while(S.intro.length<want){const l=LET.find(x=>!S.intro.includes(x));if(!l)break;S.intro.push(l)}S.placed=3;save()}
/* shuffled deck: every value comes up once before any repeats */
const DECKS={};
function deck(key,pool){let d=DECKS[key];const sig=pool.length+':'+pool[0]+':'+pool[pool.length-1];if(!d||d.sig!==sig||!d.left.length){const last=d&&d.lastV;d={sig,left:shuffle(pool),lastV:last};if(d.left.length>1&&d.left[0]===last)d.left.push(d.left.shift());DECKS[key]=d}const v=d.left.shift();d.lastV=v;return v}
const range=(a,b)=>Array.from({length:Math.max(0,b-a+1)},(_,i)=>a+i);
function letterSkill(){const L=S.intro.filter(l=>rec(l).att.length>=3);if(!L.length)return 0;return L.reduce((t,l)=>t+accuracy(l),0)/L.length}
const param=id=>SK[id].levels[Math.min(lv(id),SK[id].levels.length-1)];
function unlocked(id){return S.settings.unlock||SK[id].unlock()}
/* letters */
const REVIEW=[1,3,7,14];
function rec(l){return S.sounds[l]||(S.sounds[l]={att:[],mastered:null,stage:0,lastReview:null})}
function status(l){const r=S.sounds[l];if(!r||!r.att.length)return 'none';if(r.mastered){const due=REVIEW[Math.min(r.stage,3)];return daysBetween(r.lastReview||r.mastered,today())>=due?'due':'mast'}return 'prac'}
function accuracy(l){const a=rec(l).att.slice(-5);return a.length?a.filter(x=>x.ok).length/a.length:0}
function recordLetter(l,ok,opts,game){const r=rec(l),s0=status(l);r.att.push({ok,opts,g:game,d:today()});if(r.att.length>40)r.att=r.att.slice(-40);
  if(s0==='due'&&ok){r.stage=Math.min(r.stage+1,3);r.lastReview=today()}
  const l5=r.att.slice(-5);
  if(!r.mastered){const sc=l5.reduce((s,a)=>s+(a.ok?(a.opts>=3?1:.6):0),0);if(l5.length>=5&&sc>=3.5&&new Set(l5.map(a=>a.g)).size>=2&&new Set(l5.map(a=>a.d)).size>=2){r.mastered=today();r.lastReview=today()}}
  else{const l2=r.att.slice(-2);if(l2.length===2&&!l2[0].ok&&!l2[1].ok&&l2[0].d!==l2[1].d){r.mastered=null;r.stage=0}}
  save()}
function weakestLetter(forWriting){const L=S.intro.length?S.intro:['s'];
  const due=L.filter(l=>status(l)==='due');if(due.length&&!forWriting)return rnd(due);
  return L.slice().sort((a,b)=>(accuracy(a)+rec(a).att.length*.02)-(accuracy(b)+rec(b).att.length*.02))[0]}
function pickWord(){const ok=CVC.filter(w=>[...w].every(c=>S.intro.includes(c)||(c==='c'&&S.intro.includes('k'))));return rnd(ok.length?ok:CVC.slice(0,6))}
function readyForNewLetter(chIdx){if(S.intro.length>=LET.length)return false;if(S.intro.length<2)return true;
  const tried=S.intro.filter(l=>rec(l).att.length>=2);const settled=tried.length>=Math.min(4,S.intro.length)&&tried.every(l=>accuracy(l)>=.6);return settled||chIdx-S.lastIntroCh>=2}
/* ---- preferences: child's faces + parent ratings + all-families config ---- */
let CFG={weights:{},notes:[]};
if(window.fetch)fetch('config.json',{cache:'no-cache'}).then(r=>r.ok?r.json():null).then(j=>{if(j)CFG=Object.assign(CFG,j)}).catch(()=>{});
const GROUP_OF=id=>SK[id]?SK[id].sub:(['bubbles','snack','meet'].includes(id)?'Letters':'');
function likeScore(t){const L=S.likes[t];if(!L)return 0;const n=L.up+L.mid+L.down;if(!n)return 0;return (L.up-L.down)/n*Math.min(1,n/3)}
function prefBonus(id){let b=likeScore(id)*.6;const g=GROUP_OF(id);const r=S.fbPrefs[g==='Maths'?'maths':g==='Writing'?'write':''];if(r)b+=(r-3)*.15;
  const w=CFG.weights&&CFG.weights[id];if(typeof w==='number')b+=(w-1)*.5;return b}
/* chapter composer */
function recentPenalty(id){let p=0;const last=S.chapters.slice(-4);last.forEach((c,i)=>{if(c.nodes.some(n=>(n.skill||n.t)===id))p+=[.3,.6,1,1.7][i+4-last.length]});return p}
function score(id){return baseScore(id)+Math.max(-.5,Math.min(.5,prefBonus(id)))-recentPenalty(id)}
function baseScore(id){const s=S.sk[id];if(!s||!s.n)return 1.7+Math.random()*.7;const age=s.last?Math.min(7,daysBetween(s.last,today())):7;return (1-s.p)*1.3+age*.12+Math.random()*.9}
function why(id){const s=S.sk[id];const nm=SK[id].name;if(likeScore(id)>.4&&s&&s.n)return `Enjoyed: ${nm} (child gave it smiles)`;if(!s||!s.n)return `New game: ${nm}`;if(s.p<.6)return `Extra practice: ${nm} (${Math.round(s.p*100)}% right lately)`;if(s.up&&daysBetween(s.up,today())<=2)return `Levelled up: ${nm}, now ${SK[id].lab(param(id))}`;return `Keeping it fresh: ${nm}`}
function compose(){if(NEWUI)return composeAdv();
  const idx=S.chapters.length,reasons=[],nodes=[];
  let newL=null;if(modeOf('letters')<2&&readyForNewLetter(idx)){newL=LET.find(l=>!S.intro.includes(l));if(newL){S.intro.push(newL);S.lastIntroCh=idx;if(newL==='c'&&!S.intro.includes('k')){} }}
  const lg=likeScore('bubbles')+(CFG.weights.bubbles||1)-likeScore('snack')-(CFG.weights.snack||1);const lp=lg>.2?'bubbles':lg<-.2?'snack':rnd(['bubbles','snack']);
  const L1=newL?{t:'meet',l:newL}:{t:pickLetterGame(),focus:weakestLetter(),pool:S.intro.slice()};
  if(READ_G[L1.t])reasons.push(`Reading: ${READ_G[L1.t][0]} (${SK.read.lab(param('read'))})`);else if(newL)reasons.push(`New letter: ${newL} (${KEYW(newL)[0]})`);else reasons.push(`Letter practice: ${L1.focus} (${Math.round(accuracy(L1.focus)*100)}% right lately)`);
  const f2=weakestLetter();const L2={t:pickLetterGame(L1.t),focus:newL||f2,pool:S.intro.slice()};
  reasons.push(READ_G[L2.t]?`Reading: ${READ_G[L2.t][0]}`:newL?`Hear and find the new letter in a game`:`Letter practice: ${f2}`);
  const maths=Object.keys(SK).filter(id=>SK[id].sub==='Maths'&&inPlay('numbers',id)).sort((a,b)=>score(b)-score(a)).slice(0,(S.profile&&S.profile.age>=5)?3:2);
  maths.forEach(id=>reasons.push(why(id)));
  const wOther=Object.keys(SK).filter(id=>SK[id].sub==='Writing'&&id!=='wletter'&&inPlay('writing',id)).sort((a,b)=>score(b)-score(a))[0];
  const W1=modeOf('writing')===2?{t:'wcopyword',skill:'wcopyword'}:{t:'wletter',l:newL||weakestLetter(true),skill:'wletter'};reasons.push(W1.l?`Write the letter ${W1.l}`:'Copy a word');
  reasons.push(why(wOther));
  /* about one chapter in four swaps the last maths game for an easier review game */
  if(maths.length>1&&modeOf('numbers')>0&&Math.random()<.25){const rv=Object.keys(SK).filter(id=>SK[id].sub==='Maths'&&tierOf('numbers',id)<modeOf('numbers')).sort((a,b)=>score(b)-score(a))[0];if(rv){maths[maths.length-1]=rv;reasons.push('Quick review: '+SK[rv].name)}}
  const mN=maths.map(id=>Object.assign(SK[id].node(param(id)),{skill:id}));
  const wN=Object.assign(SK[wOther].node(param(wOther)),{skill:wOther});
  nodes.push(L1,mN[0],W1,L2,mN[1],wN);if(mN[2])nodes.push(mN[2]);
  {const ds=DSC.sections.filter(x=>inPlay('discover',x.id)).map(x=>'d_'+x.id).sort((a,b)=>score(b)-score(a));if(ds.length){const dn=dNode(ds[0].slice(2));nodes.splice(3,0,dn);reasons.push(S.sk[ds[0]]&&S.sk[ds[0]].n?why(ds[0]):`New topic: ${DSEC[ds[0].slice(2)].name}`)}}
  const region=Math.floor(idx/3)%REGIONS.length;
  if(idx%3===2)nodes.push({t:'friend',r:region});
  S.chapters.push({id:idx,region,nodes:nodes.map(n=>Object.assign(n,{stars:null})),reasons,done:false,date:today()});
  if(S.chapters.length>40)S.chapters=S.chapters.slice(-40);
  save();
}
function curChapter(){let c=S.chapters[S.chapters.length-1];if(!c||c.done){compose();c=S.chapters[S.chapters.length-1]}else if(NEWUI&&!c.adv){ensureAdv();c=S.chapters[S.chapters.length-1]}return c}
function curNodeIdx(c){return c.nodes.findIndex(n=>n.stars==null)}

/* ======================= AUDIO ======================= */
/* Release 9. Voice lines are decoded only when they are needed and kept in a small cache. Before, every line (about
   40 minutes of speech) was decoded at start: on a phone that is hundreds of MB, and each new line waited behind the
   backlog until it timed out, so Haathi went silent. A paused or interrupted sound system (screen lock, a call,
   Bluetooth) is woken up, and rebuilt if it stays stuck. Slower speech for little ones is time-stretched, so the voice
   keeps its pitch. Effects go through their own, softer channel so they never drown the voice. */
const VOICE=(window.HAATHI_VOICES&&window.HAATHI_VOICES.A)||{};
{const R=window.HAATHI_REAL||{};for(const k in R)VOICE['RS_'+k]=R[k]}
let actx=null,master=null,vbus=null,fxbus=null;const BUF=new Map(),DEC=new Map(),REC={};let recLoaded=false,bufBytes=0;const BUF_MAX=40e6;
const AUDLOG=[];function alog(m){AUDLOG.push(new Date().toTimeString().slice(0,8)+' '+m);if(AUDLOG.length>40)AUDLOG.shift()}
const FXVOL=()=>S.settings&&S.settings.fxSoft===false?1:.65;
function mkCtx(){const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return null;const c=new AC();const m=c.createGain();
  try{const k=c.createDynamicsCompressor();k.threshold.value=-16;k.knee.value=12;k.ratio.value=3;k.attack.value=.004;k.release.value=.25;m.connect(k);k.connect(c.destination)}catch(e){m.connect(c.destination)}
  const v=c.createGain(),f=c.createGain();f.gain.value=FXVOL();v.connect(m);f.connect(m);
  c.onstatechange=()=>{alog('sound '+c.state);if(c===actx&&c.state!=='running'&&c.state!=='closed'&&!document.hidden)setTimeout(()=>{if(c===actx&&c.state!=='running'&&!document.hidden)try{c.resume()}catch(e){}},400)};
  actx=c;master=m;vbus=v;fxbus=f;return c}
function unlockAudio(){try{
  if(!actx&&!mkCtx())return;
  if(actx.state!=='running')actx.resume();
  const b=actx.createBuffer(1,1,22050),s=actx.createBufferSource();s.buffer=b;s.connect(master);s.start(0);
  if(!recLoaded){recLoaded=true;loadRecordings()}
  wakeLockOn();
}catch(e){alog('unlock failed '+e.message)}}
async function wakeAudio(){if(!actx)return false;if(actx.state==='running')return true;
  try{await Promise.race([actx.resume(),sleep(700)])}catch(e){}
  if(actx.state==='running')return true;
  /* still stuck (an iPhone after a call stays 'interrupted', some phones lose the output after Bluetooth changes): start a fresh one */
  const ua=navigator.userActivation;if(document.hidden||(ua&&!ua.hasBeenActive))return false;
  try{stopVoice();const old=actx;mkCtx();alog('sound rebuilt');if(old&&old.close)old.close().catch(()=>{});await Promise.race([actx.resume(),sleep(600)])}catch(e){}
  return actx.state==='running'}
function b64ToBuf(b){const bin=atob(b),u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);return u.buffer}
function decodeAB(ab,ms){return new Promise(res=>{let done=false;const f=v=>{if(!done){done=true;res(v)}};setTimeout(()=>f(null),ms||9000);try{const p=actx.decodeAudioData(ab,f,()=>f(null));if(p&&p.catch)p.catch(()=>f(null))}catch(e){f(null)}})}
/* how fast Haathi talks: Settings "Haathi's speed"; by default ages 3 and 4 hear it a bit slower */
function vSpeed(){const v=S.settings&&S.settings.vspeed;if(v==='normal')return 1;if(v==='slow')return .86;if(v==='slower')return .78;return ((S.profile&&S.profile.age)||5)<=4?.86:1}
const PACE=()=>vSpeed()<1?1.3:1;
const STRETCHY=k=>!/^(S_|R_|RS_)/.test(k);
function bufPut(ck,d){if(BUF.has(ck))return;BUF.set(ck,d);bufBytes+=d.length*d.numberOfChannels*4;
  for(const [k,b] of BUF){if(bufBytes<=BUF_MAX)break;BUF.delete(k);bufBytes-=b.length*b.numberOfChannels*4}}
function decodeOne(k,extra){if(!VOICE[k]||!actx)return Promise.resolve(null);const sp=STRETCHY(k)?Math.round(vSpeed()*(extra||1)*100)/100:1;const ck=k+'@'+sp;
  const hit=BUF.get(ck);if(hit){BUF.delete(ck);BUF.set(ck,hit);return Promise.resolve(hit)}
  if(DEC.has(ck))return DEC.get(ck);
  const p=(async()=>{let d=await decodeAB(b64ToBuf(VOICE[k]));if(!d){alog('decode retry '+k);await sleep(150);d=await decodeAB(b64ToBuf(VOICE[k]),12000)}
    if(!d){alog('decode failed '+k);return null}if(sp<.995)d=tStretch(d,sp);bufPut(ck,d);return d})();
  DEC.set(ck,p);p.then(()=>DEC.delete(ck),()=>DEC.delete(ck));return p}
/* WSOLA time-stretch: longer sound, same pitch. 28 ms frames, half overlap, the next frame is chosen within 8 ms to line
   up with the last one, so there are no clicks. About 20 ms of work for a 3 second line. */
function tStretch(buf,speed){try{const sr=buf.sampleRate,ch=buf.numberOfChannels,N=Math.round(sr*.028)&~1,H=N>>1,tol=Math.round(sr*.008),inL=buf.length;
  if(inL<N*2)return buf;const src=[];for(let c=0;c<ch;c++)src.push(buf.getChannelData(c));const mono=src[0];
  const cap=Math.ceil(inL/speed)+N,acc=[];for(let c=0;c<ch;c++)acc.push(new Float32Array(cap));
  const win=new Float32Array(N);for(let i=0;i<N;i++)win[i]=.5-.5*Math.cos(2*Math.PI*i/N);
  let prev=0,op=0,k=0;
  for(;;k++,op+=H){const ideal=Math.round(k*H*speed);if(ideal+N>=inL||op+N>cap)break;let best=ideal;
    if(k>0){const nat=prev+H;let bc=-Infinity;const lo=Math.max(0,ideal-tol),hi=Math.min(inL-N-1,ideal+tol);
      for(let d=lo;d<=hi;d+=2){let c=0;for(let i=0;i<H;i+=4)c+=mono[nat+i]*mono[d+i];if(c>bc){bc=c;best=d}}}
    for(let c=0;c<ch;c++){const s=src[c],o=acc[c];for(let i=0;i<N;i++)o[op+i]+=s[best+i]*win[i]}prev=best}
  const L=Math.max(1,op+H);const out=actx.createBuffer(ch,L,sr);for(let c=0;c<ch;c++)out.getChannelData(c).set(acc[c].subarray(0,L));return out}catch(e){alog('stretch failed');return buf}}
let vTok=0,playing=[];
function stopVoice(){vTok++;playing.forEach(s=>{try{s.stop()}catch(e){}});playing=[]}
function playBuf(buf,rate){return new Promise(res=>{let done=false;const fin=()=>{if(done)return;done=true;playing=playing.filter(x=>x!==s);res()};const s=actx.createBufferSource();s.buffer=buf;s.playbackRate.value=rate||1;s.connect(vbus||master);s.onended=fin;playing.push(s);
  setTimeout(fin,Math.ceil(buf.duration/(rate||1)*1000)+600);try{s.start()}catch(e){fin()}})}
/* a voice line started inside one game never 'finishes' into a different game */
function say(seq,caption,opt){const r=RUN;return new Promise(res=>{sayRaw(seq,caption,opt).then(v=>{if(RUN===r||!r)res(v)})})}
/* a real recording (sounds.js) replaces Haathi saying the animal's sound, when there is one */
const realKey=it=>it.startsWith('SND_')&&VOICE['RS_'+it.slice(4)]?'RS_'+it.slice(4):it;
const hiKey=it=>S.settings&&S.settings.lang==='hi'&&it.startsWith('P_')&&window.HAATHI_VOICES&&HAATHI_VOICES.A['H'+it]?'H'+it:it;
async function sayRaw(seq,caption,opt){
  opt=opt||{};stopVoice();const tok=vTok;if(caption!=null&&$('cap'))$('cap').textContent=caption;const pace=PACE();
  /* opt.slow: the model word or sound is said a little slower again; instructions keep the normal pace */
  const ex=it=>opt.slow&&!/^H?P_/.test(it)?.9:1;
  if(actx)seq.forEach(it=>{if(typeof it==='string'&&!it.startsWith('R_')){const k=realKey(hiKey(it));decodeOne(k,ex(k))}});
  for(let it of seq){if(tok!==vTok)return;
    if(typeof it==='number'){await sleep(Math.round(it*pace));continue}
    if(typeof it==='function'){it();continue}
    it=realKey(hiKey(it));
    if(window.__SAY)window.__SAY.push(it);
    let buf=null;if(it.startsWith('R_'))buf=recBuf(it.slice(2));else if(actx)buf=await decodeOne(it,ex(it));
    if(tok!==vTok)return;
    if(buf&&actx&&actx.state!=='running')await wakeAudio();
    if(tok!==vTok)return;
    if(buf&&actx&&actx.state==='running'){sndHint(false);await playBuf(buf,1);await sleep(70)}
    else if(actx&&!document.hidden){alog('not played '+it+(buf?' (sound '+actx.state+')':' (no audio)'));if(buf)sndHint(true)}}
}
/* if the phone keeps the sound off, a small button asks for one tap, which is all a browser needs to turn it back on */
function sndHint(on){let b=$('snd-hint');if(!on){if(b)b.hidden=true;return}
  if(!b){b=document.createElement('button');b.id='snd-hint';b.className='snd-hint';b.innerHTML='🔇 <span>Tap for sound</span>';document.body.appendChild(b);
    b.onclick=async()=>{b.hidden=true;unlockAudio();await wakeAudio();if(RUN&&RUN.prompt)RUN.prompt()}}
  b.hidden=false}
let wlock=null;
async function wakeLockOn(){if(devS().keepOn===false||!navigator.wakeLock||document.hidden||wlock)return;try{wlock=await navigator.wakeLock.request('screen');wlock.addEventListener('release',()=>{wlock=null})}catch(e){}}
function recBuf(l){return REC[l]||REC[SAME[l]]||null}
const hasRec=l=>!!recBuf(l);
const W=w=>'W_'+w, N=n=>'N_'+n, L_=l=>'L_'+l;
function tone(f,t0,dur,type,vol,f2){if(!actx||!S.settings.sfx)return;const o=actx.createOscillator(),g=actx.createGain();o.type=type||'sine';o.frequency.setValueAtTime(f,t0);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t0+dur);g.gain.setValueAtTime(.0001,t0);g.gain.exponentialRampToValueAtTime(vol||.2,t0+.015);g.gain.exponentialRampToValueAtTime(.0001,t0+dur);o.connect(g);g.connect(fxbus||master);o.start(t0);o.stop(t0+dur+.05)}
function noise(t0,dur,vol,fq){if(!actx||!S.settings.sfx)return;const n=actx.createBuffer(1,Math.floor(actx.sampleRate*dur),actx.sampleRate),d=n.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*(1-i/d.length);const s=actx.createBufferSource();s.buffer=n;const f=actx.createBiquadFilter();f.type='bandpass';f.frequency.value=fq||1200;const g=actx.createGain();g.gain.value=vol||.2;s.connect(f);f.connect(g);g.connect(fxbus||master);s.start(t0)}
const T=()=>actx?actx.currentTime:0;
const FX={
 tap(){tone(660,T(),.08,'triangle',.12,880)}, pop(){tone(500,T(),.12,'sine',.3,1400);noise(T(),.08,.25,2500)},
 chomp(){[0,.18,.36].forEach(d=>{tone(180,T()+d,.1,'square',.12,90);noise(T()+d,.06,.2,600)})},
 chime(){[523,659,784,1047].forEach((f,i)=>tone(f,T()+i*.09,.35,'triangle',.16))},
 fanfare(){[523,659,784,659,784,1047].forEach((f,i)=>tone(f,T()+i*.12,.3,'square',.08));tone(1047,T()+.75,.8,'triangle',.15)},
 boing(){tone(300,T(),.35,'sine',.18,150);tone(220,T()+.12,.3,'sine',.12,330)},
 tick(n){tone(500+Math.min(n,30)*25,T(),.1,'triangle',.14)}, coin(){tone(1300,T(),.08,'square',.06);tone(1800,T()+.07,.15,'square',.05)},
 sparkle(){for(let i=0;i<5;i++)tone(1400+Math.random()*1400,T()+i*.05,.12,'sine',.06)}, swish(){noise(T(),.25,.12,1800)},
 trumpet(){if(!actx||!S.settings.sfx)return;const t=T(),o=actx.createOscillator(),f=actx.createBiquadFilter(),g=actx.createGain();o.type='sawtooth';o.frequency.setValueAtTime(240,t);o.frequency.exponentialRampToValueAtTime(520,t+.25);o.frequency.setValueAtTime(520,t+.6);o.frequency.exponentialRampToValueAtTime(380,t+1);f.type='lowpass';f.frequency.setValueAtTime(600,t);f.frequency.linearRampToValueAtTime(2400,t+.3);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.22,t+.08);g.gain.setValueAtTime(.22,t+.8);g.gain.exponentialRampToValueAtTime(.0001,t+1.1);o.connect(f);f.connect(g);g.connect(fxbus||master);o.start(t);o.stop(t+1.2)}
};

/* ---- Sound Studio ---- */
function idb(){return new Promise((res,rej)=>{try{const r=indexedDB.open('haathi-rec',1);r.onupgradeneeded=()=>r.result.createObjectStore('rec');r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)}catch(e){rej(e)}})}
async function idbAll(){try{const db=await idb();return await new Promise(res=>{const out={};const c=db.transaction('rec').objectStore('rec').openCursor();c.onsuccess=()=>{const cur=c.result;if(cur){out[cur.key]=cur.value;cur.continue()}else res(out)};c.onerror=()=>res(out)})}catch(e){return {}}}
async function idbPut(k,v){try{const db=await idb();await new Promise(res=>{const tx=db.transaction('rec','readwrite');tx.objectStore('rec').put(v,k);tx.oncomplete=res;tx.onerror=res})}catch(e){}}
async function idbDel(k){try{const db=await idb();await new Promise(res=>{const tx=db.transaction('rec','readwrite');tx.objectStore('rec').delete(k);tx.oncomplete=res;tx.onerror=res})}catch(e){}}
async function loadRecordings(){const all=await idbAll();for(const k in all){const d=await decodeAB(all[k].slice?all[k].slice(0):all[k]);if(d)REC[k]=d}}
function trimNorm(buf){const ch=buf.getChannelData(0),sr=buf.sampleRate;let peak=0;for(let i=0;i<ch.length;i++)peak=Math.max(peak,Math.abs(ch[i]));
  const th=Math.max(.02,peak*.08);let a=0,b=ch.length-1;while(a<b&&Math.abs(ch[a])<th)a++;while(b>a&&Math.abs(ch[b])<th)b--;
  a=Math.max(0,a-Math.floor(sr*.03));b=Math.min(ch.length-1,b+Math.floor(sr*.06));b=Math.min(b,a+Math.floor(sr*1.6));
  const len=b-a+1,out=new Float32Array(len),g=peak>0?.9/peak:1;for(let i=0;i<len;i++){const fi=Math.min(1,i/(sr*.01),(len-i)/(sr*.02));out[i]=ch[a+i]*g*fi}return {data:out,sr}}
function wav(data,sr){const b=new ArrayBuffer(44+data.length*2),v=new DataView(b);const w=(o,s)=>{for(let i=0;i<s.length;i++)v.setUint8(o+i,s.charCodeAt(i))};
  w(0,'RIFF');v.setUint32(4,36+data.length*2,true);w(8,'WAVE');w(12,'fmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,1,true);v.setUint32(24,sr,true);v.setUint32(28,sr*2,true);v.setUint16(32,2,true);v.setUint16(34,16,true);w(36,'data');v.setUint32(40,data.length*2,true);
  for(let i=0;i<data.length;i++)v.setInt16(44+i*2,Math.max(-1,Math.min(1,data[i]))*32767,true);return b}
let recTarget=null;
$('rec-file').addEventListener('change',async e=>{const f=e.target.files&&e.target.files[0];e.target.value='';if(!f||!recTarget)return;unlockAudio();
  const row=document.querySelector(`[data-studio="${recTarget}"] .st`);if(row)row.textContent='Processing…';
  try{const d=await decodeAB(await f.arrayBuffer());if(!d)throw 0;const t=trimNorm(d);const ab=wav(t.data,t.sr);await idbPut(recTarget,ab);const dd=await decodeAB(ab.slice(0));if(dd)REC[recTarget]=dd;renderStudio();say(['R_'+recTarget])}
  catch(err){if(row)row.textContent="Couldn't read that file. Try an .m4a, .mp3 or .wav recording."}});
function renderStudio(){
  $('studio').innerHTML=ORDER.filter(l=>l!=='k').map(l=>`<div class="studio-row" data-studio="${l}"><div class="l">${l}${l==='c'?'/k':''}</div>
    <div class="hint">Say ${HOWTO[l]}.<br><span class="st ${REC[l]?'ok':''}">${REC[l]?'Recorded':'Using the word "'+KEYW(l)[0]+'" for now'}</span></div>
    <div class="btns"><button class="pill-btn small primary" data-rec="${l}">${REC[l]?'Redo':'Record'}</button>${REC[l]?`<button class="pill-btn small" data-play="${l}">Play</button><button class="pill-btn small danger" data-del="${l}">Delete</button>`:''}</div></div>`).join('');
  $('studio').querySelectorAll('[data-rec]').forEach(b=>b.onclick=()=>{recTarget=b.dataset.rec;$('rec-file').click()});
  $('studio').querySelectorAll('[data-play]').forEach(b=>b.onclick=()=>{unlockAudio();say(['R_'+b.dataset.play])});
  $('studio').querySelectorAll('[data-del]').forEach(b=>b.onclick=async()=>{const l=b.dataset.del;await idbDel(l);delete REC[l];renderStudio()});
}

/* ======================= FX & ART ======================= */
function burst(el,n){if(!el||matchMedia('(prefers-reduced-motion: reduce)').matches)return;const r=el.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;const cols=['#f6a821','#147a8a','#2f8a5f','#c8364b','#8a5cc2'];
  for(let i=0;i<(n||14);i++){const s=document.createElement('i');s.className='spark';const a=Math.random()*6.28,d=60+Math.random()*90;s.style.left=cx+'px';s.style.top=cy+'px';s.style.background=rnd(cols);s.style.setProperty('--tx',Math.cos(a)*d+'px');s.style.setProperty('--ty',Math.sin(a)*d+'px');document.body.appendChild(s);setTimeout(()=>s.remove(),950)}}
function confetti(){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const c=$('confetti'),x=c.getContext('2d');if(!x)return;c.width=innerWidth;c.height=innerHeight;const cols=['#f6a821','#147a8a','#2f8a5f','#c8364b','#8a5cc2'];
  const ps=Array.from({length:100},()=>({x:Math.random()*c.width,y:-20-Math.random()*240,v:2+Math.random()*4,r:5+Math.random()*7,c:rnd(cols),w:Math.random()*6}));let f=0;
  (function st(){x.clearRect(0,0,c.width,c.height);ps.forEach(p=>{p.y+=p.v;p.x+=Math.sin((f+p.w)*.1)*1.5;x.fillStyle=p.c;x.fillRect(p.x,p.y,p.r,p.r*1.6)});if(++f<160)requestAnimationFrame(st);else x.clearRect(0,0,c.width,c.height)})()}
function anim(el,cls,ms){if(!el)return;el.classList.remove(cls);void el.offsetWidth;el.classList.add(cls);setTimeout(()=>el.classList.remove(cls),ms||900)}
function haathi(mood){return haathiBase(mood).replace(/<\/svg>\s*$/,dressSVG()+'</svg>')}
function haathiBase(mood){
  const mouth=mood==='open'?'<ellipse cx="118" cy="150" rx="16" ry="12" fill="#7b2f3d"/><ellipse cx="118" cy="155" rx="9" ry="5" fill="#e0707f"/>':mood==='sleep'?'<path d="M106 148q12 6 24 0" stroke="#3a4a5a" stroke-width="4" fill="none" stroke-linecap="round"/>':'<path d="M102 144q16 16 32 0" stroke="#3a4a5a" stroke-width="4" fill="#7b2f3d" stroke-linecap="round"/>';
  const eyes=mood==='sleep'?'<path d="M80 98q9 7 18 0M138 98q9 7 18 0" stroke="#22303c" stroke-width="5" fill="none" stroke-linecap="round"/>':'<g class="h-eyes"><circle cx="89" cy="98" r="10" fill="#22303c"/><circle cx="147" cy="98" r="10" fill="#22303c"/><circle cx="92.5" cy="94" r="3.5" fill="#fff"/><circle cx="150.5" cy="94" r="3.5" fill="#fff"/></g>';
  return `<svg viewBox="0 0 236 250" role="img" aria-label="Haathi the elephant"><ellipse cx="118" cy="240" rx="80" ry="9" fill="rgba(0,0,0,.08)"/>
  <g class="h-ear-l"><ellipse cx="44" cy="104" rx="42" ry="56" fill="var(--haathi-d)"/><ellipse cx="48" cy="106" rx="28" ry="40" fill="var(--haathi-ear)"/></g>
  <g class="h-ear-r"><ellipse cx="192" cy="104" rx="42" ry="56" fill="var(--haathi-d)"/><ellipse cx="188" cy="106" rx="28" ry="40" fill="var(--haathi-ear)"/></g>
  <rect x="64" y="160" width="108" height="76" rx="34" fill="var(--haathi-d)"/><rect x="78" y="214" width="26" height="24" rx="10" fill="var(--haathi)"/><rect x="132" y="214" width="26" height="24" rx="10" fill="var(--haathi)"/>
  <circle cx="118" cy="104" r="70" fill="var(--haathi)"/><path d="M60 60q58-46 116 0" stroke="#f6a821" stroke-width="14" fill="none" stroke-linecap="round"/>
  <path d="M68 58l-4 14M88 44l-2 14M118 38v14M148 44l2 14M168 58l4 14" stroke="#c8364b" stroke-width="5" stroke-linecap="round"/><circle cx="118" cy="38" r="10" fill="#c8364b"/><circle cx="118" cy="38" r="4" fill="#fff4dd"/>
  ${eyes}<ellipse cx="72" cy="126" rx="12" ry="7" fill="#f0b7c0" opacity=".75"/><ellipse cx="164" cy="126" rx="12" ry="7" fill="#f0b7c0" opacity=".75"/>${mouth}
  <g class="h-trunk"><path d="M118 112c0 30-4 58 10 74c10 11 26 6 26-6" stroke="var(--haathi)" stroke-width="22" fill="none" stroke-linecap="round"/><path d="M112 136h14M113 152h14" stroke="var(--haathi-d)" stroke-width="3" stroke-linecap="round"/></g></svg>`}
const lchar=(l,cls)=>`<div class="lchar ${cls||''} ${GROUP[l.toLowerCase()]?'c'+GROUP[l.toLowerCase()]:'c2'}"><div class="eyes"><i></i><i></i></div><span class="glyph">${l}</span><div class="mouth"></div></div>`;
const shapeSVG=(k,col)=>`<svg viewBox="0 0 100 100"><g fill="${col}">${SHAPES[k]}</g></svg>`;
/* object size follows how many there are: few objects are drawn big, many are drawn smaller. `small` (inside cards/plates) steps down one size */
const objSz=(count,small)=>{const i=small==='plate'?(count<=2?2:count<=4?3:count<=9?4:5):small?(count<=1?2:count<=4?3:count<=9?4:5):(count<=5?1:count<=10?2:count<=20?3:4);return 's'+i};
const objHTML=(k,n,small,sz)=>{const c=sz||(small===true?'s4':small||'s2');return k==='ladoo'?`<span class="obj ladoo ${c}" data-i="${n}"></span>`:`<span class="obj ${c}" data-i="${n}">${k}</span>`};
const STAR='<svg viewBox="0 0 24 24"><path d="M12 2l3 7 7 .6-5.3 4.7 1.6 7.2L12 17.8 5.7 21.5l1.6-7.2L2 9.6 9 9z" fill="#f6a821" stroke="#d9800b" stroke-width="1.2"/></svg>';
const STAR_OFF='<svg viewBox="0 0 24 24"><path d="M12 2l3 7 7 .6-5.3 4.7 1.6 7.2L12 17.8 5.7 21.5l1.6-7.2L2 9.6 9 9z" fill="#e8eee9" stroke="#c9d6cc" stroke-width="1.2"/></svg>';
const ICON={back:'<svg viewBox="0 0 24 24" fill="none" stroke="#1f6b4a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
 ear:'<svg viewBox="0 0 24 24" fill="none" stroke="#147a8a" stroke-width="2.6" stroke-linecap="round"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/></svg>',
 next:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',
 check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10"/></svg>'};
document.querySelectorAll('[data-back]').forEach(b=>{b.innerHTML=ICON.back;b.onclick=()=>{FX.tap();go(NEWUI&&current==='corner'?'lib':'map')}});
$('play-back').innerHTML=ICON.back;$('st-back').innerHTML=ICON.back;$('play-hear').innerHTML=ICON.ear;

/* ======================= NAV, TIMER, GATE ======================= */
let current=null;const CHILD=['map','corner','play','home','path','lib'];
function go(name){if(name==='map'&&NEWUI)name='home';{const h=$('nd-hand');if(h)h.hidden=true}if(name!=='story'&&typeof stStop==='function'&&window.SR_ACTIVE!==false){try{stStop()}catch(e){}}document.querySelectorAll('.screen').forEach(s=>s.hidden=true);$('s-'+name).hidden=false;current=name;stopVoice();
  ({start:renderStart,setup:renderSetup,map:renderMap,parent:renderParent,home:renderHome,path:renderPath,lib:renderLib}[name]||(()=>{}))()}
let sessSec=0;
setInterval(()=>{if(document.hidden||!S.profile||!CHILD.includes(current)||!$('bye').hidden||!$('gate').hidden)return;sessSec++;const d=today();S.minutes[d]=(S.minutes[d]||0)+1/60;if(sessSec%15===0)save();if(sessSec>=S.profile.limit*60)bedtime()},1000);
function bedtime(){save();stopVoice();$('bye-haathi').innerHTML=haathi('sleep');$('bye').hidden=false;$('bye-text').textContent=`Great playing today, ${S.profile.name}. Haathi needs a nap. See you tomorrow!`;say(['P_bye'],null)}
$('bye-more').onclick=()=>openGate(()=>{sessSec=Math.max(0,S.profile.limit*60-300);$('bye').hidden=true;go('map')});
let gateCb=null,gateAns=0;
function openGate(cb){gateCb=cb;const a=ri(6,9),b=ri(3,7);gateAns=a*b;$('gate-q').textContent=`${a} × ${b} = ?`;$('gate-a').value='';$('gate-msg').hidden=true;$('gate').hidden=false;setTimeout(()=>$('gate-a').focus(),50)}
$('gate-cancel').onclick=()=>{$('gate').hidden=true};
function gateTry(){if(parseInt($('gate-a').value,10)===gateAns){$('gate').hidden=true;const c=gateCb;gateCb=null;c&&c()}else{$('gate-msg').hidden=false;$('gate-a').value=''}}
$('gate-ok').onclick=gateTry;$('gate-a').onkeydown=e=>{if(e.key==='Enter')gateTry()};
$('btn-parent').onclick=()=>{FX.tap();openGate(()=>go('parent'))};

/* ======================= START & SETUP ======================= */
function renderStart(){r2Who();$('start-haathi').innerHTML=haathi('happy');if(S.profile)$('cap-start').textContent=`Hi ${S.profile.name}! Turn the volume up.`}
function begin(){unlockAudio();FX.trumpet();if(!S.profile){go('setup');return}go('map');const nu=markDay();setTimeout(()=>say(['P_welcome',200,NEWUI?'P_nd_home':'P_map_hi'],null).then(()=>{if(nu)say(['P_dress'],`Haathi can now wear: ${nu.name}! Open the sticker book.`)}),600)}
applyNums();loadHindi();$('btn-start').onclick=begin;$('btn-book').onclick=()=>{unlockAudio();FX.tap();openBook()};$('start-haathi').onclick=begin;
$('kid-add').onclick=()=>{FX.tap();addKid()};
{const b=$('btn-who');if(S.profile){const k=kidsIdx();b.hidden=false;b.textContent=`Playing as ${S.profile.name||'child'} (age ${S.profile.age}) · Change child or age`;b.onclick=()=>{FX.tap();openGate(()=>{PT_NEXT='settings';go('parent');setTimeout(()=>{const p=$('kids-panel');if(p&&p.scrollIntoView)p.scrollIntoView({behavior:'smooth'})},80)})}}}
let setupAge=4;
function renderSetup(){const ac=$('agechips');ac.innerHTML='';[3,4,5,6,7].forEach(a=>{const b=document.createElement('button');b.textContent=a;b.setAttribute('aria-pressed',a===setupAge);b.onclick=()=>{setupAge=a;FX.tap();renderSetup()};ac.appendChild(b)})}
$('btn-setup-done').onclick=()=>{unlockAudio();gc('/new-child/age-'+setupAge,'New child aged '+setupAge);S.profile={name:$('in-name').value.trim()||'friend',age:setupAge,limit:+$('in-limit').value,created:today()};S.settings.consent=$('in-consent').checked;
  placeByAge();
  save();go('map');setTimeout(()=>{FX.trumpet();say([300,'P_hello',300,NEWUI?'P_nd_home':'P_map_hi'],null)},400)};

/* ======================= MAP ======================= */
function nodeIcon(n){const t=n.t;if(t.startsWith('d_')&&DSEC[n.sec])return DSEC[n.sec].icon;if(t==='move')return '🤸';if(t==='cards'&&DSEC[n.sec])return DSEC[n.sec].icon;return ({meet:n.l,bubbles:'○',snack:'🥭',count:'123',numfind:'?',more:'>',add:'+',takeaway:'−',shape:'▲',pattern:'•◦',dice:'⚂',next:'→',bigger:'9>',missing:'_',share:'½',shop:'₹',length:'↔',
  wpre:'〰',wshape:'✎□',wletter:'✎'+(n.l||''),wnum:'✎'+(n.n||''),wcap:'✎'+(n.l||'').toUpperCase(),wname:'✎Aa',wword:'✎ab',dots:'⋯',friend:REGIONS[n.r||0].friend[0]})[t]||'?'}
const WRITE_T=new Set(['dots','slate','maze','tracepic','drawshapes','finishpic','countwrite','joinmatch','colour']);
const SUBJ=n=>n.t.startsWith('d_')?'discover':LGAMES[n.t]||n.t==='meet'?'letter':n.t==='friend'?'friend':(n.t[0]==='w'||WRITE_T.has(n.t))?'write':'number';
function nodeColor(n){const s=SUBJ(n);if(s==='discover')return '#2f8a5f';return s==='letter'?'#147a8a':s==='number'?'#e07a12':s==='write'?'#8a5cc2':'#f6a821'}
function renderMap(){if(S.profile)markDay();badge();{const lc=document.querySelector('[data-corner="letters"]');if(lc){lc.querySelector('span').textContent=modeOf('letters')===2?'Reading':'Letters';lc.querySelector('b').textContent=modeOf('letters')===2?'Read':'abc'}}
  const cur=curChapter();const W=Math.min(560,$('map-scroll').clientWidth||360);
  const chs=S.chapters.slice(-4);let y=0,svg='';const pos=[],meta=[];
  const GAP=100,HEAD=86;
  chs.forEach((ch,ci)=>{const R=REGIONS[ch.region];const n=ch.nodes.length;const h=HEAD+n*GAP+20;
    svg+=`<rect x="0" y="${y}" width="${W}" height="${h}" fill="${R.sky}"/>`+scenery(R.id,W,y,h)+
      `<rect x="${W/2-140}" y="${y+14}" width="280" height="54" rx="27" fill="#fff" opacity=".93"/><text x="${W/2}" y="${y+38}" text-anchor="middle" font-family="Baloo 2,sans-serif" font-weight="800" font-size="20" fill="#1f6b4a">Chapter ${ch.id+1}</text><text x="${W/2}" y="${y+58}" text-anchor="middle" font-family="Baloo 2,sans-serif" font-weight="600" font-size="14" fill="#4b6457">${R.name}</text>`;
    ch.nodes.forEach((nd,i)=>{const g=pos.length;pos.push([W/2+Math.sin(g*.9)*W*.27,y+HEAD+i*GAP+44]);meta.push({ch,i,nd})});
    y+=h});
  // teaser stops
  for(let k=0;k<2;k++){pos.push([W/2+Math.sin(pos.length*.9)*W*.27,y+40+k*GAP]);meta.push(null)}y+=2*GAP+40;
  const d=pos.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)).join('');
  svg+=`<path d="${d}" fill="none" stroke="#fff" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" opacity=".85"/><path d="${d}" fill="none" stroke="#d8c6a2" stroke-width="6" stroke-dasharray="2 12" stroke-linecap="round"/>`;
  const ci=curNodeIdx(cur);let curPos=0;
  meta.forEach((m,g)=>{const[x,yy]=pos[g];
    if(!m){svg+=`<g class="node locked"><circle cx="${x}" cy="${yy}" r="30" fill="#e4ebe6" stroke="#c9d6cc" stroke-width="4"/><text x="${x}" y="${yy+9}" text-anchor="middle" font-size="26" fill="#9aaba0">?</text></g>`;return}
    const done=m.nd.stars!=null,isCur=m.ch===cur&&m.i===ci;if(isCur)curPos=g;const col=nodeColor(m.nd),ic=nodeIcon(m.nd),locked=!done&&!isCur;const fs=ic.length>2?17:ic.length>1?21:28;
    svg+=`<g class="node ${isCur?'cur':''} ${locked?'locked':''}" data-c="${m.ch.id}" data-i="${m.i}" role="button" aria-label="Stop">
      ${isCur?`<circle class="ring" cx="${x}" cy="${yy}" r="40" fill="${col}" opacity=".3"/>`:''}<circle cx="${x}" cy="${yy+5}" r="33" fill="rgba(0,0,0,.12)"/>
      <circle cx="${x}" cy="${yy}" r="33" fill="${locked?'#f2f5f3':done?col:'#fff'}" stroke="${col}" stroke-width="5"/>
      <text x="${x}" y="${yy+fs*.36}" text-anchor="middle" font-size="${fs}" fill="${locked?'#9aaba0':done?'#fff':col}">${ic}</text>
      ${done?`<g transform="translate(${x-30} ${yy+24})">${[0,1,2].map(k=>`<g transform="translate(${k*20} 0) scale(.8)">${k<m.nd.stars?STAR:STAR_OFF}</g>`).join('')}</g>`:''}</g>`;
    if(isCur)svg+=`<g transform="translate(${x+24} ${yy-70}) scale(.32)">${haathi('happy').replace(/^<svg[^>]*>|<\/svg>$/g,'')}</g>`});
  $('map-scroll').innerHTML=`<svg viewBox="0 0 ${W} ${y}" style="height:${y}px">${svg}</svg>`;
  $('map-scroll').querySelectorAll('.node[data-c]').forEach(g=>g.addEventListener('click',()=>{unlockAudio();const ch=S.chapters.find(c=>c.id===+g.dataset.c),i=+g.dataset.i;
    if(g.classList.contains('locked')){FX.boing();anim(g,'wiggle',500);return}FX.tap();playChapterNode(ch,i)}));
  requestAnimationFrame(()=>{const sc=$('map-scroll');sc.scrollTop=Math.max(0,pos[curPos][1]*(sc.clientWidth/W)-sc.clientHeight/2)});
  const regionsDone=Math.floor(S.chapters.filter(c=>c.done).length/3);
  $('friends').innerHTML=REGIONS.map((R,r)=>`<span class="slot ${r<regionsDone?'':'empty'}">${r<regionsDone?R.friend[0]:'?'}</span>`).join('');
  $('starcount').innerHTML=STAR+S.chapters.reduce((a,c)=>a+c.nodes.reduce((b,n)=>b+(n.stars||0),0),0);
  $('go-label').textContent='Play';
}
function scenery(id,W,y,h){let s='';for(let i=0;i<6;i++){const x=(i%2?W*.9:W*.1)+((i*37)%30-15),yy=y+110+i*(h-140)/6;
  if(id==='forest')s+=`<rect x="${x-4}" y="${yy}" width="8" height="26" fill="#8a5a33"/><circle cx="${x}" cy="${yy-6}" r="22" fill="#2f8a5f"/><circle cx="${x+8}" cy="${yy-2}" r="5" fill="#f6a821"/>`;
  else if(id==='river')s+=`<path d="M${x-30} ${yy}q15-10 30 0t30 0" stroke="#5fb6c6" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  else if(id==='mela')s+=`<path d="M${x-22} ${yy+18}L${x} ${yy-14}L${x+22} ${yy+18}Z" fill="${i%2?'#c8364b':'#f6a821'}"/>`;
  else if(id==='station')s+=`<rect x="${x-24}" y="${yy-8}" width="48" height="22" rx="5" fill="${i%2?'#e2563f':'#147a8a'}"/><circle cx="${x-12}" cy="${yy+16}" r="5" fill="#333"/><circle cx="${x+12}" cy="${yy+16}" r="5" fill="#333"/>`;
  else if(id==='beach')s+=`<path d="M${x} ${yy+20}q-4-24 6-38" stroke="#8a5a33" stroke-width="5" fill="none"/><path d="M${x+6} ${yy-18}q-18-4-24 6M${x+6} ${yy-18}q18-6 24 4" stroke="#2f8a5f" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  else s+=`<path d="M${x-30} ${yy+18}L${x} ${yy-24}L${x+30} ${yy+18}Z" fill="#9fb7cf"/><path d="M${x-10} ${yy-10}L${x} ${yy-24}L${x+10} ${yy-10}Z" fill="#fff"/>`}return s}
$('btn-go').onclick=()=>{unlockAudio();FX.tap();const c=curChapter();playChapterNode(c,curNodeIdx(c))};
document.querySelectorAll('[data-corner]').forEach(b=>b.onclick=()=>{unlockAudio();FX.tap();openCorner(b.dataset.corner)});
function playChapterNode(ch,i){const n=ch.nodes[i];if(NEWUI&&i===0&&n.stars==null)gc('/adv/start','Adventure started');syncNode(n);if(LGAMES[n.t])n.pool=S.intro.slice();const first=i===0&&n.stars==null;startRun(n,{chapter:ch.id,i,first})}

/* ======================= ACTIVITY RUNNER ======================= */
let RUN=null;
const ROUNDS={meet:1,friend:1,slate:1,move:1,
 /* multi-step games: each round is already several taps */
 memory:3,sortsound:3,stones:3,mole:3,rocket:3,order:3,sortcolour:3,share:4,shop:5,hunt:5,fishing:5,buildword:5,beats:6,wfamily:4,wfirst:4,wcopyword:3,wsentence:4,wsurface:3,wdict:4,wlabel:4,wnumword:4,wcapname:4,wfill:4,wplural:4,add2:6,sub2:6,missadd:6,coins:6,measure:6,story:6,fraction:6,nlplace:6,groups:6,barchart:4,calendar:6,crossword:3,wordsearch:3,jumble:6,spell:6,
 /* writing */
 wletter:3,wcap:3,wnum:3,wrainbow:3,wpre:4,wshape:3,wword:2,dots:3,maze:4,tracepic:4,drawshapes:3,finishpic:3,wcopy:4,wheard:4,countwrite:5,wlines:3,joinmatch:3,colour:2,wname:8};
const DEFAULT_ROUNDS=8;
function setRounds(){const r=$('rounds');r.innerHTML='';for(let i=0;i<RUN.rounds;i++){const e=document.createElement('i');if(i<RUN.round)e.className='ok';else if(i===RUN.round)e.className='on';r.appendChild(e)}}
function actions(list){const a=$('actions');a.innerHTML='';list.forEach(([cls,label,fn,icon,id])=>{const b=document.createElement('button');b.className='big-btn '+cls;if(id)b.id=id;b.innerHTML=(icon||'')+label;b.onclick=()=>{unlockAudio();FX.tap();fn()};a.appendChild(b)})}
$('play-hear').onclick=()=>{unlockAudio();FX.tap();RUN&&RUN.prompt&&RUN.prompt()};
$('play-restart').onclick=()=>{unlockAudio();FX.tap();if(!RUN)return;const n=Object.assign({},RUN.node);Object.keys(n).forEach(k=>{if(k[0]==='_'||['seq','si','fam','stars'].includes(k))delete n[k]});stopVoice();startRun(n,RUN.from)};
$('p-reload').onclick=()=>{save();location.reload()};
$('p-reset').onclick=()=>{const b=$('p-reset');if(!b.dataset.sure){b.dataset.sure=1;b.textContent='Tap again to start over (stars, stickers and levels for '+S.profile.name+' will be cleared)';return}
  const keep={profile:S.profile,settings:S.settings,device:S.device};S=Object.assign(blank(),keep);placeByAge();save();location.reload()};
$('play-back').onclick=()=>{FX.tap();const f=RUN&&RUN.from;RUN=null;backFrom(f)};
const TITLES={tens:'Tens and ones',clock:'Telling time',tenmore:'10 more, 10 less',bigsmall:'Big and small letters',sameletter:'Same letter',oddsound:'Odd one out',samesound:'Same first sound?',picletter:'Picture to letter',letterpic:'Letter to picture',fishing:'Letter fishing',nextletter:'Next letter',missingletter:'Missing letter',sortsound:'Sound baskets',memory:'Memory pairs',rhyme:'Rhyme time',buildword:'Build a word',firstmissing:'First letter',hunt:'Letter hunt',mole:'Letter moles',hidden:'Hidden letter',stones:'River stones',shadow:'Letter shadows',
 fewer:'Which has fewer?',smaller:'Smaller number',matchgroup:'Match the number',maketen:'Make ten',beats:'Drum beats',rocket:'Rocket countdown',order:'Numbers in order',frog:'Frog hops',skip:'Skip counting',hiding:'Hiding ladoos',oddshape:'Odd shape out',sortcolour:'Colour baskets',size:'Big and small',heavy:'Heavy and light',queue:'First and last',money:'More money?',double:'Butterfly doubles',countshapes:'Count the shapes',
 maze:'Road maze',tracepic:'Trace a picture',drawshapes:'Draw with shapes',finishpic:'Finish the picture',wrainbow:'Rainbow writing',wheard:'Write what you hear',countwrite:'Count and write',wcopy:'Copy it',wlines:'Straight lines',joinmatch:'Join the pairs',colour:'Colouring',surprise:'Surprise!',
 move:'Move!',cards:'Picture cards',meet:'Meet a letter',bubbles:'Sound Bubbles',snack:"Haathi's Snack",count:'Count with me',numfind:'Number Balloons',more:'Which has more?',add:'Put them together',takeaway:'Monkey takes away',shape:'Shape Hunt',pattern:'What comes next?',dice:'Quick look',next:'Before and after',bigger:'Bigger number',missing:'Missing number',share:'Share fairly',shop:'Mela shop',length:'Long and short',
  wpre:'Draw patterns',wshape:'Draw shapes',wletter:'Write a letter',wcap:'Big letter',wnum:'Write a number',wname:'Write my name',wword:'Write a word',dots:'Dot-to-dot',slate:'Magic slate',friend:'A new friend!'};
function startRun(n,from){if(NEWUI)r2Prep(n,from);
  let rounds=n.rounds||ROUNDS[n.t]||(((S.profile&&S.profile.age)||4)<=3?5:DEFAULT_ROUNDS);if(SUBJ(n)==='write'&&rounds>2&&((S.fbPrefs.write||3)<=2||likeScore(n.t)<-.4))rounds=Math.max(2,rounds-1);if(n.t==='wname')rounds=Math.min(8,nameChars().length);if(n.merge&&MERGE[n.merge]&&!MERGE[n.merge].run)rounds=Math.max(rounds,MERGE[n.merge].subs.length);if(NEWUI&&n.pid)gc('/g/'+n.pid+'/start','Game started: '+n.pid);
  RUN={node:n,from,round:0,rounds,ok:[],prompt:null};
  go('play');$('play-title').textContent=n.title||TITLES[n.t];$('actions').innerHTML='';$('cap').textContent='';$('play-body').innerHTML='';
  let delay=250;if(from.first&&!NEWUI){const ch=S.chapters.find(c=>c.id===from.chapter);say(ch&&ch.id%3===0?[REGIONS[ch.region].clip,200,'P_chapter']:['P_chapter'],null);delay=1700}
  setTimeout(()=>{if(RUN&&RUN.node===n)nextRound()},delay);
}
function stair(ok){const id=RUN.node.skill||RUN.node.t;const sk=SK[id];if(!sk||sk.levels.length<2||id.startsWith('d_'))return;const s=st(id);if(RUN.startLvl==null)RUN.startLvl=s.lvl;
  if(s.changedAt&&Date.now()-s.changedAt<4000)return;RUN.c2=ok?(RUN.c2||0)+1:0;let to=s.lvl;
  if(ok&&RUN.c2>=2&&s.lvl<sk.levels.length-1){to=s.lvl+1;RUN.c2=0}else if(!ok&&s.lvl>Math.max(0,RUN.startLvl-1))to=s.lvl-1;
  if(to!==s.lvl){const was=s.lvl;s.lvl=to;s.ln=0;s.changedAt=Date.now();logChange(id,was,to,'level');RUN.stairMsg=to>was?'up':'down';save()}}
/* each round (and each map stop) uses the child's level right now, not the level when the chapter was planned */
function syncNode(n){const id=n.skill||n.t;const sk=SK[id];if(!sk||sk.levels.length<2||id.startsWith('d_'))return null;const f=sk.node(param(id));let changed=false;
  ['max','set','lvl'].forEach(k=>{if(f[k]!==undefined&&JSON.stringify(f[k])!==JSON.stringify(n[k])){n[k]=f[k];changed=true}});return changed}
function nextRound(){if(!RUN)return;setRounds();$('actions').innerHTML='';const ch=syncNode(RUN.node);
  if(ch&&RUN.stairMsg==='up'){FX.sparkle();const id=RUN.node.skill||RUN.node.t;$('cap').textContent='⭐ A bit harder now: '+SK[id].lab(param(id))}RUN.stairMsg=null;if(RUN.node.merge)mergeRound(RUN.node,RUN.round);ACT[RUN.node.t](RUN.node,RUN.round)}
function roundDone(ok){if(!RUN||RUN._lock===RUN.round)return;RUN._lock=RUN.round;RUN.ok.push(!!ok);stair(ok);RUN.round++;setRounds();if(RUN.round>=RUN.rounds)finishRun();else{const r=RUN;setTimeout(()=>{if(RUN===r)nextRound()},600)}}
const learnN=(n,ok)=>{const id=n.skill||(SK[n.t]?n.t:(typeof READ_G!=='undefined'&&READ_G[n.t])?'read':null);if(id)learn(id,ok)};
function finishRun(){
  const run=RUN,n=run.node;const stars=Math.max(1,Math.round(run.ok.filter(Boolean).length/run.ok.length*3));
  let nextFn=null,chDone=false;
  if(run.from.chapter!=null){const ch=S.chapters.find(c=>c.id===run.from.chapter);if(ch){const nd=ch.nodes[run.from.i];nd.stars=Math.max(nd.stars||0,stars);
      if(ch.nodes.every(x=>x.stars!=null)&&!ch.done){ch.done=true;chDone=true;compose()}save();
      const c2=curChapter(),ni=curNodeIdx(c2);nextFn=()=>playChapterNode(c2,ni)}}
  if(NEWUI){finishND(run,stars,chDone);return}
  const isFriend=n.t==='friend';const box=$('reward-box');
  const stk=n.t!=='friend'&&n.t!=='move'?awardSticker():null;
  box.innerHTML=isFriend?`<div class="big">${REGIONS[n.r].friend[0]}</div><h3>New friend!</h3><p>The ${REGIONS[n.r].friend[1]} joins your journey.</p>`:`<div class="stars3">${[0,1,2].map(k=>k<stars?STAR:STAR_OFF).join('')}</div><h3>${stars===3?'Superstar!':stars===2?'Great job!':'Well tried!'}</h3>`;
  if(n.t!=='friend')modeSuggest(n,stars,box);
  if(stk){box.insertAdjacentHTML('beforeend',`<div class="newstk"><span>${stk}</span><b>New sticker!</b></div>`);setTimeout(()=>say(['P_sticker'],null),900)}
  const nb=document.createElement('button');nb.className='big-btn go';nb.innerHTML=ICON.next.replace('currentColor','#fff')+(nextFn?'Next stop':'Again');
  nb.onclick=()=>{FX.tap();$('reward').hidden=true;const go2=()=>nextFn?nextFn():startRun(n,run.from);S.gamesSinceBreak=(S.gamesSinceBreak||0)+1;if(S.settings.moves!==false&&S.gamesSinceBreak>=3){S.gamesSinceBreak=0;save();moveBreak(go2)}else{save();go2()}};
  const hb=document.createElement('button');hb.className='big-btn soft';hb.textContent=run.from.corner?'Back':'Map';hb.onclick=()=>{FX.tap();$('reward').hidden=true;run.from.corner?openCorner(run.from.corner,run.from.sec):go('map')};
  if(!isFriend){const fq=document.createElement('div');fq.innerHTML='<p class="faces-q">Did you like this game?</p><div class="faces"><button data-f="up" aria-label="Loved it">😀</button><button data-f="mid" aria-label="Okay">😐</button><button data-f="down" aria-label="Did not like">🙁</button></div>';
    fq.querySelectorAll('button').forEach(b=>b.onclick=()=>{fq.querySelectorAll('button').forEach(x=>x.classList.remove('on'));b.classList.add('on');FX.tap();const L=S.likes[n.t]||(S.likes[n.t]={up:0,mid:0,down:0});if(fq.dataset.v)L[fq.dataset.v]--;L[b.dataset.f]++;fq.dataset.v=b.dataset.f;save()});box.appendChild(fq)}
  const row=document.createElement('div');row.className='row';row.append(hb,nb);box.appendChild(row);
  $('reward').hidden=false;confetti();FX.fanfare();sync(false);
  say(isFriend?[600,'P_new_friend',W(REGIONS[n.r].friend[1])]:[500,'P_star',300,rnd(['P_pr1','P_pr2','P_pr5','P_pr6'])],null);RUN=null}
const PRAISE_EN=['P_pr1','P_pr2','P_pr3','P_pr4','P_pr5','P_pr6','HX_pr1','HX_pr2','HX_pr3'];
const PRAISE=PRAISE_EN.slice(),RETRY=['P_listen_again','P_little_sound','P_close','P_together','HX_try1','HX_try2'];
const body=()=>$('play-body');
function once(fn){let first=true;return ok=>{if(first){first=false;fn(ok)}}}
const ACT={};

/* ---- LETTERS ---- */
function sndOf(l){return hasRec(l)?['R_'+l]:[W(KEYW(l)[0])]}
ACT.meet=(n)=>{const l=n.l,[w,pic]=KEYW(l);
  body().innerHTML=`<div class="meet-row">${lchar(l)}<div class="pic">${pic}</div></div><div class="word"><b>${w[0]}</b>${w.slice(1)}</div><div class="card-note">Action: <b>${ACTION[l]}</b></div>`;
  const ch=body().querySelector('.lchar');const talk=on=>()=>ch.classList.toggle('talk',on);
  const intro=()=>say(['P_called',L_(l),250,...(hasRec(l)?['P_but_says',talk(true),'R_'+l,350,'R_'+l,350,'R_'+l,talk(false),300,W(w)]:['P_letter_word',talk(true),300,W(w),400,W(w),talk(false)]),400,'P_do_action'],
    hasRec(l)?`This is ${NAME[l]}. It says ${SHOW[l]}, as in ${w}.`:`This is ${NAME[l]}. It starts the word ${w}.`).then(()=>ch.classList.remove('talk'));
  RUN.prompt=intro;FX.sparkle();intro().then(()=>{if(RUN&&RUN.node===n&&!sayTurn.on)sayTurn(l,w)});sayTurn.on=false;
  actions([['go','Next',()=>sayTurn(l,w),ICON.next]]);
};
function sayTurn(l,w){sayTurn.on=true;const little=vSpeed()<1;
  /* little ones hear the model once more, slower, with longer gaps (PACE) before it is their turn */
  const turn=()=>say(hasRec(l)?['P_say_with_me',300,'R_'+l,500,'R_'+l,...(little?[500,'R_'+l]:[]),500,'P_your_turn']:['P_say_first',300,W(w),500,...(little?[W(w),500]:[]),'P_your_turn'],hasRec(l)?`Say it with me: ${SHOW[l]}! Your turn!`:`Say the first sound of "${w}" together. Your turn!`,{slow:little});
  RUN.prompt=turn;turn();
  actions([['soft','Again',turn],...sayItAct(hasRec(l)?['R_'+l]:[W(w)],w),['star','Said it!',()=>{S.said=(S.said||0)+1;save();burst($('actions'),16);FX.chime();say(['P_great_saying'],'Wonderful saying!').then(()=>roundDone(true))}],['soft','Skip',()=>roundDone(true)]]);
}
ACT.bubbles=(n)=>{const pool=S.intro.length?S.intro:(n.pool&&n.pool.length?n.pool:['s']);
  const weak=n.focus&&pool.includes(n.focus)&&rec(n.focus).att.length>=2&&accuracy(n.focus)<.7;const t=weak&&Math.random()<.25?n.focus:deck('bub',pool);const cw=rnd(WORDS[t]);
  const others=shuffle([...shuffle(pool.filter(x=>x!==t&&SAME[t]!==x)).slice(0,2),...shuffle(LET.filter(x=>x!==t&&SAME[t]!==x&&!pool.includes(x)))].filter((x,i,a)=>a.indexOf(x)===i)).slice(0,nopt()-1);const letters=shuffle([t,...others]);const st=body();
  st.innerHTML=`<button class="pill-btn hearbtn" id="bh">${ICON.ear} Hear it</button>${hasRec(t)?'':`<div class="cue" style="position:absolute;top:64px;left:50%;transform:translateX(-50%);z-index:3"><span class="em">${cw[1]}</span>${cw[0]}</div>`}`;
  const H=$('stage').clientHeight||520;
  letters.forEach((l,i)=>{const b=document.createElement('button');b.className='bubble';b.innerHTML=`<span>${l}</span>`;b.style.left=`calc(${((i+.5)/letters.length*100).toFixed(1)}% - clamp(50px,13vw,70px))`;
    const dur=11+Math.random()*3;b.style.setProperty('--dur',dur+'s');b.style.setProperty('--h',H+'px');b.style.setProperty('--delay',(-dur*(.4+.25*i/letters.length))+'s');b.onclick=()=>pick(b,l);st.appendChild(b)});
  const prompt=()=>say(hasRec(t)?['P_bub_ask',300,'R_'+t,400,'R_'+t]:['P_bub_ask_word',300,W(cw[0])],hasRec(t)?`Pop the bubble that says ${SHOW[t]}`:`Pop the letter for the first sound in "${cw[0]}"`);
  RUN.prompt=prompt;$('bh').onclick=()=>{FX.tap();prompt()};
  let busy=false,wrong=false;const rec1=once(ok=>recordLetter(t,ok,3,'bubbles'));
  function pick(b,l){if(busy)return;const ok=l===t;rec1(ok);
    if(ok){busy=true;const m=getComputedStyle(b).transform;b.style.transform=m;b.style.animation='none';void b.offsetWidth;b.classList.add('pop');FX.pop();burst(b,18);
      say([350,...(hasRec(l)?['P_that_letter_says','R_'+l]:[W(KEYW(l)[0])]),250,rnd(PRAISE)],`Yes! ${l} for ${KEYW(l)[0]}!`).then(()=>roundDone(!wrong))}
    else{wrong=true;FX.boing();anim(b,'boing',500);if(NEWUI&&(pick.m=(pick.m||0)+1)>=2)st.querySelectorAll('.bubble').forEach(x=>{if(x.textContent===t)ndHint(x,true)});say([rnd(RETRY),300,...sndOf(t)],'Try another bubble!',{slow:true})}}
  setTimeout(prompt,300);
};
ACT.snack=(n)=>{
  const pool=S.intro.length?S.intro:(n.pool&&n.pool.length?n.pool:['s']);const weak=n.focus&&pool.includes(n.focus)&&rec(n.focus).att.length>=2&&accuracy(n.focus)<.7;const t=weak&&Math.random()<.25?n.focus:deck('snk',pool);const target=rnd(WORDS[t].filter(w=>w[0]!==KEYW(t)[0]).concat(WORDS[t].length<2?WORDS[t]:[]));
  const others=shuffle(ORDER.filter(x=>x!==t&&SAME[t]!==x)).slice(0,nopt()-1).map(l=>rnd(WORDS[l]));const items=shuffle([target,...others]);
  body().innerHTML=`<button class="haathi feed-h" id="fh" aria-label="Haathi">${haathi('open')}</button>${hasRec(t)?'':`<div class="cue"><span class="em">${KEYW(t)[1]}</span>starts like ${KEYW(t)[0]}</div>`}<div class="choices" id="cards"></div>`;
  const h=$('fh');let busy=false,wrong=false;const rec1=once(ok=>recordLetter(t,ok,3,'snack'));
  const prompt=()=>{anim(h,'dance');return say(hasRec(t)?['P_feed_ask',300,'R_'+t,400,'R_'+t]:['P_feed_ask_word',300,W(KEYW(t)[0])],hasRec(t)?`Something that starts with ${SHOW[t]}`:`Something that starts like "${KEYW(t)[0]}"`)};
  RUN.prompt=prompt;h.onclick=()=>{FX.boing();anim(h,'dance');say(['P_tickle'],'Hee hee!')};
  items.forEach(it=>{const d=document.createElement('button');d.className='pcard';d.textContent=it[1];d.setAttribute('aria-label',it[0]);bindDrag(d,it);$('cards').appendChild(d)});
  function choose(el,it){if(busy)return;const ok=it===target;rec1(ok);
    if(ok){busy=true;const hr=h.getBoundingClientRect(),er=el.getBoundingClientRect();el.classList.add('eaten');el.style.transform=`translate(${hr.left+hr.width/2-er.left-er.width/2}px,${hr.top+hr.height*.6-er.top-er.height/2}px) scale(.2)`;
      setTimeout(()=>{FX.chomp();anim(h,'chomp',600);h.innerHTML=haathi('happy')},380);setTimeout(()=>{FX.chime();anim(h,'dance');burst(h,16)},1000);
      say([1100,'P_yum',W(it[0]),...(hasRec(t)?['P_starts_with','R_'+t]:['P_starts_like',W(KEYW(t)[0])]),250,rnd(PRAISE)],`Yum! ${it[0]} starts like ${KEYW(t)[0]}!`).then(()=>roundDone(!wrong))}
    else{wrong=true;FX.boing();el.style.transform='';anim(el,'wiggle',500);anim(h,'nope',600);el.classList.remove('picked');if(NEWUI&&(choose.m=(choose.m||0)+1)>=2)ndHint([...document.querySelectorAll('#cards .pcard')].find(x=>x.getAttribute('aria-label')===target[0]));say(['P_hmm_thats',W(it[0]),300,rnd(RETRY)],`That's ${it[0]}. Try again!`)}}
  function bindDrag(el,it){let sx=0,sy=0,moved=false,id=null;
    el.addEventListener('pointerdown',e=>{if(busy)return;id=e.pointerId;try{el.setPointerCapture(id)}catch(_){}sx=e.clientX;sy=e.clientY;moved=false});
    el.addEventListener('pointermove',e=>{if(e.pointerId!==id)return;const dx=e.clientX-sx,dy=e.clientY-sy;if(!moved&&Math.hypot(dx,dy)>12){moved=true;el.classList.add('drag');FX.swish()}
      if(moved){el.style.transform=`translate(${dx}px,${dy}px) scale(1.08)`;h.classList.toggle('hover',over(e))}});
    const end=e=>{if(e.pointerId!==id)return;id=null;h.classList.remove('hover');
      if(moved){el.classList.remove('drag');if(over(e))choose(el,it);else el.style.transform=''}
      else if(el.classList.contains('picked'))choose(el,it);else{document.querySelectorAll('#cards .pcard').forEach(p=>p.classList.remove('picked'));el.classList.add('picked');FX.tap();say([W(it[0])],`${it[0]}. Tap again to feed Haathi.`)}};
    el.addEventListener('pointerup',end);el.addEventListener('pointercancel',end);el.addEventListener('click',e=>{if(e.detail===0)choose(el,it)})}
  function over(e){const r=h.getBoundingClientRect();return e.clientX>r.left-20&&e.clientX<r.right+20&&e.clientY>r.top&&e.clientY<r.bottom}
  setTimeout(prompt,350);
};

/* ---- MATHS ---- */
function layout(k,count,small){const sz=objSz(count,small&&count>20);let html='<div class="objs">';for(let t=0;t<count;t+=10){html+='<div class="tenrow">';for(let f=t;f<Math.min(t+10,count);f+=5){html+='<div class="five">';for(let i=f;i<Math.min(f+5,count);i++)html+=objHTML(k,i,small,sz);html+='</div>'}html+='</div>'}return html+'</div>'}
function numChoices(ans,max,el,onPick,lo,cap){lo=lo==null?1:lo;let locked=false,miss=0;const want=nopt();const hi=cap?Math.min(cap,Math.max(max,ans+2)):Math.max(max,ans+2);
  const pv=[];if(ans>=10){pv.push(ans+10,ans-10);const r=+String(ans).split('').reverse().join('');if(String(ans).length===2&&ans%10&&r!==ans)pv.push(r)}
  const set=new Set([ans]);shuffle(pv.filter(v=>v>=lo&&v<=hi&&v!==ans)).slice(0,ans>=13?1:0).forEach(v=>set.add(v));
  shuffle([ans-1,ans+1,ans-2,ans+2,ans+3,ans-3]).forEach(v=>{if(set.size<want&&v>=lo&&v<=hi)set.add(v)});let g=0;while(set.size<want&&g++<60)set.add(ri(lo,hi));
  shuffle([...set]).forEach(v=>{const b=document.createElement('button');b.className='pcard num';b.textContent=v;b.onclick=()=>{if(locked)return;if(v===ans)locked=true;else if(NEWUI&&++miss===2)ndHint([...el.children].find(x=>+x.textContent===ans));onPick(b,v)};el.appendChild(b)})}
async function countAlong(objs){for(let i=0;i<objs.length;i++){anim(objs[i],'dance',500);await say([N(i+1)],String(i+1))}}
function tapCount(objs,start){let c=start||0;objs.forEach(o=>o.onclick=()=>{if(o.classList.contains('counted'))return;c++;o.classList.add('counted');o.dataset.n=c;FX.tick(c);say([N(c)],String(c))});return ()=>c}
ACT.count=(n)=>{const max=n.max,count=deck('count'+max,range(max>10?Math.ceil(max*.35):2,max)),thing=rnd(COUNT_THINGS);
  body().innerHTML=layout(thing.k,count,count>10)+`<div class="choices" id="nc" hidden></div>`;
  let c=0;const objs=[...body().querySelectorAll('.obj')];let wrong=false;const L=once(ok=>learnN(n,ok));
  const prompt=()=>say(c<count?['P_count_tap']:['P_how_many'],c<count?`Tap each one and count!`:'How many are there?');RUN.prompt=prompt;prompt();
  objs.forEach(o=>o.onclick=()=>{if(o.classList.contains('counted'))return;c++;o.classList.add('counted');o.dataset.n=c;FX.tick(c);say([N(c)],String(c));
    if(c===count)setTimeout(()=>{const nc=$('nc');if(!nc||!RUN||RUN.node!==n)return;say(['P_how_many'],'How many are there?');nc.hidden=false;numChoices(count,max,nc,(b,v)=>{const ok=v===count;L(ok);
      if(ok){b.classList.add('right');FX.chime();burst(b,14);say([N(count),300,'P_well_counted'],`${count}! Great counting!`).then(()=>roundDone(!wrong))}
      else{wrong=true;FX.boing();anim(b,'wiggle',500);say(['P_count_again'],"Let's count together.").then(()=>countAlong(objs).then(()=>say(['P_how_many'],'How many?')))}})},600)})};
function floatPick(vals,cls,onPick){const st=body();const H=$('stage').clientHeight||520;vals.forEach((v,i)=>{const b=document.createElement('button');b.className='bubble '+cls;b.innerHTML=`<span>${v}</span>`;b.style.left=`calc(${((i+.5)/vals.length*100).toFixed(1)}% - clamp(50px,13vw,70px))`;
  const dur=11+Math.random()*3;b.style.setProperty('--dur',dur+'s');b.style.setProperty('--h',H+'px');b.style.setProperty('--delay',(-dur*(.4+.25*i/vals.length))+'s');b.onclick=()=>onPick(b,v);st.appendChild(b)})}
function popIt(b){const m=getComputedStyle(b).transform;b.style.transform=m;b.style.animation='none';void b.offsetWidth;b.classList.add('pop');FX.pop();burst(b,16)}
ACT.numfind=(n)=>{const max=n.max,t=deck('nf'+max,range(1,max));const set=new Set([t]);const near=[t+1,t-1,t+2,t-2];if(t>=10){near.unshift(t+10,t-10);const r=+String(t).split('').reverse().join('');if(String(t).length===2&&t%10&&r!==t)near.unshift(r)}
  shuffle(near.slice(0,t>=10?3:4)).concat(shuffle(near.slice(t>=10?3:4))).forEach(v=>{if(set.size<nopt()&&v>=1&&v<=Math.max(max,5))set.add(v)});while(set.size<nopt())set.add(ri(1,Math.max(max,5)));
  body().innerHTML=`<button class="pill-btn hearbtn" id="bh">${ICON.ear} Hear it</button>`;
  const prompt=()=>say(['P_find_number',200,N(t)],`Find the number ${t}`);RUN.prompt=prompt;$('bh').onclick=()=>{FX.tap();prompt()};
  let busy=false,wrong=false;const L=once(ok=>learnN(n,ok));
  floatPick(shuffle([...set]),'numb',(b,v)=>{if(busy)return;const ok=v===t;L(ok);
    if(ok){busy=true;popIt(b);say([N(t),250,rnd(PRAISE)],`Yes! ${t}!`).then(()=>roundDone(!wrong))}else{wrong=true;FX.boing();anim(b,'boing',500);if(NEWUI&&(RUN._nf=(RUN._nf||0)+1)>=2)body().querySelectorAll('.bubble').forEach(x=>{if(+x.textContent===t)ndHint(x,true)});say([N(v),300,'P_find_number',N(t)],`That's ${v}. Find ${t}!`)}});
  setTimeout(prompt,300)};
ACT.more=(n)=>{const max=n.max;let a=ri(1,max),b=ri(1,max);while(Math.abs(a-b)<Math.max(1,Math.round(max/5)))b=ri(1,max);
  body().innerHTML=`<div class="plates">${[a,b].map((v,i)=>`<button class="plate" data-p="${i}"><div class="pile">${Array.from({length:v},(_,k)=>objHTML('ladoo',k,0,objSz(v,'plate'))).join('')}</div></button>`).join('')}</div>`;
  const prompt=()=>say(['P_which_more'],'Which plate has more ladoos?');RUN.prompt=prompt;prompt();
  let wrong=false,busy=false;const L=once(ok=>learnN(n,ok));
  body().querySelectorAll('.plate').forEach(p=>p.onclick=()=>{if(busy)return;const v=p.dataset.p==='0'?a:b,ok=v===Math.max(a,b);L(ok);
    if(ok){busy=true;p.classList.add('right');FX.chime();burst(p,16);say(['P_yes_more',200,N(Math.max(a,b)),'P_and',N(Math.min(a,b))],`Yes! ${Math.max(a,b)} is more than ${Math.min(a,b)}.`).then(()=>roundDone(!wrong))}
    else{wrong=true;FX.boing();anim(p,'wiggle',500);say(['P_count_again'],"Let's count them.").then(()=>countAlong([...p.querySelectorAll('.obj')]).then(()=>say(['P_which_more'],'Which plate has more?')))}})};
ACT.add=(n)=>{const max=n.max;const total=deck('add'+max,range(max<=5?2:Math.ceil(max*.3),max)),a=ri(1,total-1),b=total-a;const thing=rnd(COUNT_THINGS.slice(0,4));const small=total>10;
  body().innerHTML=total>20?`<div class="eqn">${blocksHTML(a)}<span>+</span>${blocksHTML(b)}</div><div class="eqn"><span>${a}</span>+<span>${b}</span>=<span>?</span></div><div class="choices" id="nc"></div>`:`<div class="eqn"><div class="grp">${Array.from({length:a},(_,k)=>objHTML(thing.k,k,0,objSz(Math.max(a,b),true))).join('')}</div>+<div class="grp">${Array.from({length:b},(_,k)=>objHTML(thing.k,a+k,0,objSz(Math.max(a,b),true))).join('')}</div></div><div class="eqn"><span>${a}</span>+<span>${b}</span>=<span>?</span></div><div class="choices" id="nc"></div>`;
  const prompt=()=>say([N(a),'P_and',N(b),'P_more_word',300,'P_altogether'],`${a} and ${b} more. How many altogether? Tap them to count.`);RUN.prompt=prompt;prompt();
  const objs=[...body().querySelectorAll('.obj')];tapCount(objs);let wrong=false;const L=once(ok=>learnN(n,ok));
  numChoices(total,max,$('nc'),(btn,v)=>{const ok=v===total;L(ok);
    if(ok){btn.classList.add('right');body().querySelectorAll('.eqn span')[2].textContent=total;FX.chime();burst(btn,16);say([N(a),'P_and',N(b),'P_makes',N(total),250,rnd(PRAISE)],`${a} + ${b} = ${total}!`).then(()=>roundDone(!wrong))}
    else{wrong=true;FX.boing();anim(btn,'wiggle',500);say(['P_count_again'],"Let's count them all.").then(()=>countAlong(objs))}})};
ACT.takeaway=(n)=>{const max=n.max;const total=deck('ta'+max,range(Math.max(3,Math.ceil(max*.3)),max)),k=ri(1,Math.min(total-1,max<=5?2:Math.ceil(total/2))),left=total-k;
  if(total>20){return pickNum({top:`<div class="eqn">${blocksHTML(total)}</div><div class="eqn"><span>${total}</span>−<span>${k}</span>=<span>?</span></div>`,ans:left,max,lo:0,say:['P_monkey_took',N(k),300,'P_how_many_left'],cap:`${total} take away ${k}. How many are left?`,right:[N(total),'P_and',N(left)],rightCap:`${total} − ${k} = ${left}`,node:n})}
  body().innerHTML=`<div class="pic" style="font-size:64px">🐒</div>${layout('🥭',total,total>10)}<div class="eqn"><span>${total}</span>−<span>${k}</span>=<span>?</span></div><div class="choices" id="nc" hidden></div>`;
  const objs=[...body().querySelectorAll('.obj')];
  const prompt=()=>say(['P_monkey_took',N(k),300,'P_how_many_left'],`The monkey took ${k}. How many are left?`);RUN.prompt=prompt;
  say([N(total)],`${total} mangoes`).then(async()=>{await sleep(400);anim(body().querySelector('.pic'),'dance');FX.swish();objs.slice(-k).forEach((o,i)=>setTimeout(()=>o.classList.add('fly'),i*200));await sleep(900+k*200);if(!$('nc')||!RUN||RUN.node!==n)return;objs.slice(-k).forEach(o=>o.style.visibility='hidden');
    tapCount(objs.slice(0,left));prompt();$('nc').hidden=false;let wrong=false;const L=once(ok=>learnN(n,ok));
    numChoices(left,max,$('nc'),(btn,v)=>{const ok=v===left;L(ok);
      if(ok){btn.classList.add('right');body().querySelectorAll('.eqn span')[2].textContent=left;FX.chime();burst(btn,16);say([N(left),250,rnd(PRAISE)],`${total} − ${k} = ${left}!`).then(()=>roundDone(!wrong))}
      else{wrong=true;FX.boing();anim(btn,'wiggle',500);say(['P_count_again'],"Let's count what's left.").then(()=>countAlong(objs.slice(0,left)))}},0)})};
ACT.dice=(n)=>{const max=n.max,v=deck('dice'+max,range(1,max));let face;
  if(max<=6){const P={1:[[50,50]],2:[[28,28],[72,72]],3:[[25,25],[50,50],[75,75]],4:[[28,28],[72,28],[28,72],[72,72]],5:[[25,25],[75,25],[50,50],[25,75],[75,75]],6:[[28,22],[72,22],[28,50],[72,50],[28,78],[72,78]]};
    face=`<div class="dicebox">${P[v].map(([x,y])=>`<i style="left:${x}%;top:${y}%"></i>`).join('')}</div>`}
  else face=`<div class="tf">${Array.from({length:10},(_,i)=>`<b class="${i<v?'on':''}"></b>`).join('')}</div>`;
  body().innerHTML=face+`<div class="choices" id="nc"></div>`;
  const prompt=()=>say(['P_dice'],'How many dots? Try not to count one by one!');RUN.prompt=prompt;prompt();let wrong=false;const L=once(ok=>learnN(n,ok));
  numChoices(v,max,$('nc'),(btn,x)=>{const ok=x===v;L(ok);if(ok){btn.classList.add('right');FX.chime();burst(btn,14);say([N(v),250,rnd(PRAISE)],`${v}!`).then(()=>roundDone(!wrong))}else{wrong=true;FX.boing();anim(btn,'wiggle',500);say(['P_close'],'Look again!')}})};
ACT.next=(n)=>{const max=n.max;const after=Math.random()<.6;const v=after?deck('na'+max,range(1,max-1)):deck('nb'+max,range(2,max));const ans=after?v+1:v-1;
  body().innerHTML=`<div class="numline">${after?`<div class="cell">${v}</div><div class="cell q">?</div>`:`<div class="cell q">?</div><div class="cell">${v}</div>`}</div><div class="choices" id="nc"></div>`;
  const prompt=()=>say([after?'P_what_after':'P_what_before',N(v)],`What comes ${after?'after':'before'} ${v}?`);RUN.prompt=prompt;prompt();let wrong=false;const L=once(ok=>learnN(n,ok));
  numChoices(ans,max+1,$('nc'),(btn,x)=>{const ok=x===ans;L(ok);if(ok){btn.classList.add('right');body().querySelector('.cell.q').textContent=ans;body().querySelector('.cell.q').classList.remove('q');FX.chime();burst(btn,14);
      say(after?[N(v),N(ans)]:[N(ans),N(v)],after?`${v}, ${ans}!`:`${ans}, ${v}!`).then(()=>roundDone(!wrong))}else{wrong=true;FX.boing();anim(btn,'wiggle',500);say(['P_count_again'],"Let's count up together.").then(async()=>{for(let k=Math.max(1,Math.min(v,ans)-2);k<=Math.max(v,ans);k++)await say([N(k)],String(k))})}},after?2:0)};
ACT.missing=(n)=>{const max=n.max;const s0=deck('mis'+max,range(1,max-3)),seq=[s0,s0+1,s0+2,s0+3];const hole=ri(1,3),ans=seq[hole];
  body().innerHTML=`<div class="numline">${seq.map((v,i)=>i===hole?'<div class="cell q">?</div>':`<div class="cell">${v}</div>`).join('')}</div><div class="choices" id="nc"></div>`;
  const prompt=()=>say(['P_missing'],'Which number is missing?');RUN.prompt=prompt;prompt();let wrong=false;const L=once(ok=>learnN(n,ok));
  numChoices(ans,max,$('nc'),(btn,x)=>{const ok=x===ans;L(ok);if(ok){btn.classList.add('right');const q=body().querySelector('.cell.q');q.textContent=ans;q.classList.remove('q');FX.chime();burst(btn,14);
      say(seq.map(N),seq.join(', ')).then(()=>roundDone(!wrong))}else{wrong=true;FX.boing();anim(btn,'wiggle',500);say(seq.slice(0,hole).map(N),'Count along: '+seq.slice(0,hole).join(', ')+'…')}})};
ACT.bigger=(n)=>{const max=n.max;let a=deck('big'+max,range(1,max)),b;const close=Math.random()<Math.min(.7,.2+lv('bigger')*.15);
  if(close&&a>=12&&a%10&&String(a).length===2&&Math.random()<.4){const r=+String(a).split('').reverse().join('');b=r<=max&&r!==a?r:a+1}else b=close?a+rnd([-3,-2,-1,1,2,3]):ri(1,max);if(b<1||b>max||b===a)b=a===max?a-1:a+1;
  body().innerHTML=`<div class="choices">${[a,b].map(v=>`<button class="pcard num" data-v="${v}" style="font-size:clamp(56px,15vw,90px)">${v}</button>`).join('')}</div><div id="hint" class="objs" hidden></div>`;
  const prompt=()=>say(['P_bigger_num'],'Which number is bigger?');RUN.prompt=prompt;prompt();let wrong=false,busy=false;const L=once(ok=>learnN(n,ok));
  body().querySelectorAll('.pcard').forEach(c=>c.onclick=()=>{if(busy)return;const v=+c.dataset.v,ok=v===Math.max(a,b);L(ok);
    if(ok){busy=true;c.classList.add('right');FX.chime();burst(c,14);say([N(v),250,rnd(PRAISE)],`Yes! ${v} is bigger.`).then(()=>roundDone(!wrong))}
    else{wrong=true;FX.boing();anim(c,'wiggle',500);const h=$('hint');h.hidden=false;h.innerHTML=`<div class="tenrow" style="gap:20px"><div>${layout('ladoo',a,true)}</div><div>${layout('ladoo',b,true)}</div></div>`;say(['P_which_more'],'Look at the ladoos. Which has more?')}})};
ACT.share=(n)=>{const max=n.max;const half=ri(2,Math.floor(max/2)),total=half*2;let pile=total,A=0,B=0;
  body().innerHTML=`<div class="share"><div class="pile" id="pile"></div><div class="plates"><button class="plate" id="pA"><div><div class="who">🐘</div><div class="pile" id="iA"></div><div class="cnt" id="cA">0</div></div></button><button class="plate" id="pB"><div><div class="who">🐒</div><div class="pile" id="iB"></div><div class="cnt" id="cB">0</div></div></button></div><div class="choices" id="nc" hidden></div></div>`;
  const draw=()=>{$('pile').innerHTML=Array.from({length:pile},(_,k)=>objHTML('ladoo',k,total>10)).join('');$('iA').innerHTML=Array.from({length:A},(_,k)=>objHTML('ladoo',k,true)).join('');$('iB').innerHTML=Array.from({length:B},(_,k)=>objHTML('ladoo',k,true)).join('');$('cA').textContent=A;$('cB').textContent=B;
    $('iA').querySelectorAll('.obj').forEach(o=>o.onclick=e=>{e.stopPropagation();if(locked)return;A--;pile++;FX.swish();draw()});$('iB').querySelectorAll('.obj').forEach(o=>o.onclick=e=>{e.stopPropagation();if(locked)return;B--;pile++;FX.swish();draw()})};
  let locked=false,wrong=false;const L=once(ok=>learnN(n,ok));
  const give=w=>{if(locked||!pile)return;pile--;w==='A'?A++:B++;FX.tick(w==='A'?A:B);draw();if(!pile)check()};
  $('pA').onclick=()=>give('A');$('pB').onclick=()=>give('B');
  function check(){if(A===B){locked=true;FX.chime();burst($('pA'),10);burst($('pB'),10);say(['P_fair_yes',300,'P_how_many_each'],'Fair! How many does each friend get?');$('nc').hidden=false;
      numChoices(half,max,$('nc'),(btn,v)=>{const ok=v===half;L(ok);if(ok){btn.classList.add('right');FX.chime();say([N(half),250,rnd(PRAISE)],`${half} each!`).then(()=>roundDone(!wrong))}else{wrong=true;FX.boing();anim(btn,'wiggle',500);say(['P_count_again'],'Count one plate.')}})}
    else{wrong=true;L(false);FX.boing();say(['P_not_fair'],'Is that fair? Tap a ladoo on a plate to take it back.')}}
  const prompt=()=>say(['P_share'],`Share ${total} ladoos fairly. Tap a plate to give one ladoo.`);RUN.prompt=prompt;draw();prompt()};
ACT.shop=(n)=>{const lvl=n.lvl;const price=lvl===5?ri(1,5):ri(3,10);const item=rnd(SHOP_ITEMS);
  const coins=lvl===11?[5,2,2,1,1,1,5,2]:Array(lvl===5?7:12).fill(1);let paid=[];
  body().innerHTML=`<div class="shop"><div class="item">${item[0]}<span class="tag">₹${price}</span></div><div class="counter" id="ctr"><span style="color:var(--ink-soft);font-family:var(--f-display)">Put coins here</span></div><div class="purse" id="purse"></div><div class="row"><button class="big-btn go" id="pay">Pay ₹<span id="tot">0</span></button></div></div>`;
  let wrong=false,done=false;const L=once(ok=>learnN(n,ok));const purse=coins.map((v,i)=>({v,i,in:false}));
  const coinEl=c=>`<button class="coin c${c.v}" data-i="${c.i}">₹${c.v}</button>`;
  const draw=()=>{$('purse').innerHTML=purse.filter(c=>!c.in).map(coinEl).join('');const inC=purse.filter(c=>c.in);$('ctr').innerHTML=inC.length?inC.map(coinEl).join(''):'<span style="color:var(--ink-soft);font-family:var(--f-display)">Put coins here</span>';
    $('tot').textContent=inC.reduce((s,c)=>s+c.v,0);body().querySelectorAll('.coin').forEach(b=>b.onclick=()=>{if(done)return;const c=purse[+b.dataset.i];c.in=!c.in;FX.coin();draw();const t=purse.filter(x=>x.in).reduce((s,x)=>s+x.v,0);say([N(t)],null)})};
  draw();
  const prompt=()=>say(['P_costs',N(price),price===1?'P_rupee':'P_rupees',300,'P_pay'],`This ${item[1]} costs ₹${price}. Put the coins in to pay!`);RUN.prompt=prompt;prompt();
  $('pay').onclick=()=>{if(done)return;const t=purse.filter(x=>x.in).reduce((s,x)=>s+x.v,0);
    if(t===price){done=true;L(true&&!wrong);FX.coin();FX.chime();burst($('ctr'),16);say(['P_paid'],'You paid the right amount!').then(()=>roundDone(!wrong))}
    else{if(!wrong)L(false);wrong=true;FX.boing();say([t>price?'P_too_much':'P_keep_going'],t>price?'Too much! Take a coin back.':`Not enough yet. It costs ₹${price}.`)}}};
ACT.length=(n)=>{const lvl=n.lvl;const kind=lvl===0?'longer':rnd(['longer','shorter','taller']);let a=ri(30,95),b=ri(30,95);while(Math.abs(a-b)<18)b=ri(30,95);
  const cols=shuffle(['#e2563f','#147a8a','#f6a821','#2f8a5f']);const ans=kind==='shorter'?Math.min(a,b):Math.max(a,b);
  const thing=(v,i)=>kind==='taller'?`<button class="lenbtn" data-v="${v}"><svg width="70" height="${v*2.2}" viewBox="0 0 70 ${v*2.2}"><rect x="28" y="${v*2.2-30}" width="14" height="30" fill="#8a5a33"/><path d="M35 0 L68 ${v*2.2-26} H2 Z" fill="${cols[i]}"/></svg></button>`:
    `<button class="lenbtn" data-v="${v}"><svg width="${v*3}" height="34" viewBox="0 0 ${v*3} 34"><rect x="0" y="6" width="${v*3-26}" height="22" rx="4" fill="${cols[i]}"/><path d="M${v*3-26} 6 L${v*3} 17 L${v*3-26} 28Z" fill="#f3d7a6"/><path d="M${v*3-8} 13 L${v*3} 17 L${v*3-8} 21Z" fill="#333"/></svg></button>`;
  body().innerHTML=`<div class="lens ${kind==='taller'?'v':''}">${[a,b].map(thing).join('')}</div>`;
  const prompt=()=>say([kind==='longer'?'P_longer':kind==='shorter'?'P_shorter':'P_taller'],`Which one is ${kind}?`);RUN.prompt=prompt;prompt();let wrong=false,busy=false;const L=once(ok=>learnN(n,ok));
  body().querySelectorAll('.lenbtn').forEach(x=>x.onclick=()=>{if(busy)return;const ok=+x.dataset.v===ans;L(ok);if(ok){busy=true;FX.chime();burst(x,14);anim(x,'dance');say([rnd(PRAISE)],`Yes, that one is ${kind}!`).then(()=>roundDone(!wrong))}else{wrong=true;FX.boing();anim(x,'wiggle',500);say(['P_close'],'Look again!')}})};
ACT.shape=(n)=>{const set=n.set,t=deck('shp'+set.length,set);const opts=shuffle([t,...shuffle(Object.keys(SHAPES).filter(x=>x!==t)).slice(0,5)]);const cols=shuffle(SHAPE_COL);
  body().innerHTML=`<div class="haathi" style="width:110px;height:116px">${haathi('happy')}</div><div class="shapes">${opts.map((k,i)=>`<button class="shape" data-k="${k}" aria-label="${k}">${shapeSVG(k,cols[i])}</button>`).join('')}</div>`;
  const prompt=()=>say(['P_shape_find',W(t)],`Can you find the ${t}?`);RUN.prompt=prompt;prompt();let wrong=false,busy=false;const L=once(ok=>learnN(n,ok));
  body().querySelectorAll('.shape').forEach(b=>b.onclick=()=>{if(busy)return;const ok=b.dataset.k===t;L(ok);if(ok){busy=true;FX.chime();burst(b,16);anim(b,'dance');say([W(t),250,rnd(PRAISE)],`Yes, a ${t}!`).then(()=>roundDone(!wrong))}
    else{wrong=true;FX.boing();anim(b,'wiggle',500);say(['P_hmm_thats',W(b.dataset.k),300,'P_shape_find',W(t)],`That's a ${b.dataset.k}. Find the ${t}!`)}})};
ACT.pattern=(n)=>{const kinds=[['r','b'],['y','g'],['r','y','b'],['p','y'],['b','r','r']];const unit=n.lvl===0?rnd(kinds.slice(0,2)):n.lvl===1?rnd(kinds.slice(0,4)):rnd(kinds);
  const len=unit.length*2+(unit.length===2?2:1);const seq=Array.from({length:len},(_,i)=>unit[i%unit.length]);const ans=seq.pop();
  const bead=k=>`<span class="bead"><svg viewBox="0 0 100 100"><g fill="${BEAD[k][0]}">${SHAPES[BEAD[k][1]]}</g></svg></span>`;
  const optsK=[ans,...shuffle(Object.keys(BEAD).filter(k=>k!==ans)).slice(0,2)];
  body().innerHTML=`<div class="beads">${seq.map(bead).join('')}<span class="bead q">?</span></div><div class="choices">${shuffle(optsK).map(k=>`<button class="shape" data-k="${k}">${bead(k)}</button>`).join('')}</div>`;
  const prompt=()=>say(['P_pattern'],'What comes next?');RUN.prompt=prompt;prompt();let wrong=false,busy=false;const L=once(ok=>learnN(n,ok));
  body().querySelectorAll('.shape').forEach(b=>b.onclick=()=>{if(busy)return;const ok=b.dataset.k===ans;L(ok);if(ok){busy=true;const q=body().querySelector('.bead.q');if(q)q.outerHTML=bead(ans);FX.chime();burst(b,16);say(['P_pattern_yes'],'You finished the pattern!').then(()=>roundDone(!wrong))}
    else{wrong=true;FX.boing();anim(b,'wiggle',500);say(['P_close'],'Look again at the colours.')}})};

/* ---- WRITING ---- */
function ell(cx,cy,rx,ry,a0,a1,n){n=n||28;const p=[];for(let i=0;i<=n;i++){const t=(a0+(a1-a0)*i/n)*Math.PI/180;p.push([cx+rx*Math.cos(t),cy+ry*Math.sin(t)])}return p}
const arc=(cx,cy,r,a0,a1,n)=>ell(cx,cy,r,r,a0,a1,n);
function smooth(pts,it){it=it||2;for(let k=0;k<it;k++){const o=[pts[0]];for(let i=0;i<pts.length-1;i++){const p=pts[i],q=pts[i+1];o.push([.75*p[0]+.25*q[0],.75*p[1]+.25*q[1]],[.25*p[0]+.75*q[0],.25*p[1]+.75*q[1]])}o.push(pts[pts.length-1]);pts=o}return pts}
const LS={
 a:[arc(50,67,22,-30,-390),[[72,45],[72,90]]], b:[[[36,10],[36,90]],arc(55,67,21,-155,155)], c:[arc(53,67,22,-40,-320)],
 d:[arc(50,67,22,-30,-390),[[72,10],[72,90]]], e:[[[30,67],[72,67],...arc(51,67,21,0,-320).slice(1)]], f:[[...arc(57,24,10,-20,-180),[47,90]],[[34,48],[62,48]]],
 g:[arc(50,67,22,-30,-390),[[72,45],[72,100],...arc(58,100,14,0,160).slice(1)]], h:[[[36,10],[36,90]],[...arc(54,63,18,180,360),[72,90]]],
 i:[[[50,45],[50,90]],[[50,27],[50,30]]], j:[[[60,45],[60,100],...arc(46,100,14,0,160).slice(1)],[[60,27],[60,30]]],
 k:[[[36,10],[36,90]],[[68,45],[38,70],[70,90]]], l:[[[50,10],[50,82],[56,89],[64,90]]],
 m:[[[26,45],[26,90]],[...arc(38,61,12,180,360),[50,90]],[...arc(62,61,12,180,360),[74,90]]], n:[[[36,45],[36,90]],[...arc(54,63,18,180,360),[72,90]]],
 o:[arc(50,67,23,-90,-450)], p:[[[36,45],[36,112]],arc(55,67,20,-160,160)], q:[arc(50,67,22,-30,-390),[[72,45],[72,112],[80,106]]],
 r:[[[38,45],[38,90]],arc(54,63,16,180,300)], s:[smooth([[68,50],[60,45],[46,45],[36,51],[38,61],[50,66],[63,71],[69,80],[63,89],[47,91],[34,86]])],
 t:[[[50,18],[50,82],[56,89],[64,90]],[[36,45],[66,45]]], u:[[[34,45],[34,72],...arc(52,72,18,180,0).slice(1),[70,45],[70,90]]],
 v:[[[30,45],[50,90],[70,45]]], w:[[[22,45],[34,90],[50,58],[66,90],[78,45]]], x:[[[32,45],[68,90]],[[68,45],[32,90]]],
 y:[[[32,45],[50,82]],[[68,45],[44,108],[36,112]]], z:[[[32,45],[68,45],[32,90],[68,90]]]
};
const CS={
 A:[[[28,90],[50,10],[72,90]],[[37,60],[63,60]]], B:[[[32,10],[32,90]],smooth([[32,10],[56,10],[66,18],[66,32],[56,48],[32,48]]),smooth([[32,48],[60,48],[71,58],[71,78],[60,90],[32,90]])],
 C:[ell(56,50,26,40,-40,-320)], D:[[[32,10],[32,90]],smooth([[32,10],[52,10],[68,22],[72,50],[68,78],[52,90],[32,90]])], E:[[[68,10],[32,10],[32,90],[68,90]],[[32,50],[62,50]]],
 F:[[[68,10],[32,10],[32,90]],[[32,50],[60,50]]], G:[[...ell(54,50,26,40,-40,-360).slice(0,-1),[80,56],[62,56]]], H:[[[30,10],[30,90]],[[70,10],[70,90]],[[30,50],[70,50]]],
 I:[[[50,10],[50,90]],[[34,10],[66,10]],[[34,90],[66,90]]], J:[[[64,10],[64,70],...arc(48,70,16,0,170).slice(1)]], K:[[[32,10],[32,90]],[[70,10],[34,54],[72,90]]],
 L:[[[34,10],[34,90],[70,90]]], M:[[[24,90],[24,10],[50,60],[76,10],[76,90]]], N:[[[30,90],[30,10],[70,90],[70,10]]], O:[ell(50,50,28,40,-90,-450)],
 P:[[[32,10],[32,90]],smooth([[32,10],[58,10],[70,22],[70,38],[58,50],[32,50]])], Q:[ell(50,50,28,40,-90,-450),[[56,70],[76,92]]],
 R:[[[32,10],[32,90]],smooth([[32,10],[58,10],[70,22],[70,38],[58,50],[32,50]]),[[50,50],[72,90]]], S:[smooth([[70,20],[58,10],[40,10],[30,22],[34,38],[50,48],[66,58],[72,74],[62,88],[42,90],[28,80]])],
 T:[[[26,10],[74,10]],[[50,10],[50,90]]], U:[[[30,10],[30,66],...ell(50,66,20,24,180,0).slice(1),[70,10]]], V:[[[26,10],[50,90],[74,10]]],
 W:[[[18,10],[32,90],[50,30],[68,90],[82,10]]], X:[[[28,10],[72,90]],[[72,10],[28,90]]], Y:[[[28,10],[50,50]],[[72,10],[50,50],[50,90]]], Z:[[[28,10],[72,10],[28,90],[72,90]]]
};
const DIG={0:[ell(50,51,20,39,-90,-450)],1:[[[38,26],[52,12],[52,90]]],2:[[...smooth([[32,28],[38,16],[50,12],[62,16],[67,28],[62,42],[32,90]]),[70,90]]],
 3:[smooth([[34,18],[48,12],[62,16],[66,28],[60,42],[48,48],[62,54],[68,68],[62,84],[48,90],[32,84]])],4:[[[58,12],[30,66],[72,66]],[[58,40],[58,90]]],
 5:[[[64,12],[38,12],...smooth([[36,46],[50,42],[64,50],[68,66],[62,82],[48,90],[34,84]])]],6:[smooth([[62,16],[50,12],[38,24],[32,50],[34,74],[46,90],[60,88],[68,74],[64,58],[50,52],[38,58],[33,70]])],
 7:[[[32,12],[68,12],[44,90]]],8:[smooth([[62,22],[50,12],[38,20],[40,36],[60,58],[66,74],[56,90],[44,90],[34,76],[40,58],[60,36],[62,22]])],9:[ell(48,32,17,18,0,-360),[[65,32],[62,90]]]};
const PREP={line:[[[50,15],[50,100]]],circle:[arc(50,58,36,-90,-450,40)],cross:[[[50,15],[50,100]],[[14,58],[86,58]]],
 zigzag:[[[8,72],[22,42],[36,72],[50,42],[64,72],[78,42],[92,72]]],wave:[Array.from({length:41},(_,i)=>[8+i*2.1,58+18*Math.sin(i/40*Math.PI*4)])],
 loops:[Array.from({length:91},(_,i)=>{const t=i/90*6*Math.PI;return [14+t*3.6-9*Math.sin(t),66-18*(1-Math.cos(t))/2-6]})],
 square:[[[22,30],[78,30],[78,86],[22,86],[22,30]]],triangle:[[[50,18],[84,86],[16,86],[50,18]]],rectangle:[[[12,40],[88,40],[88,82],[12,82],[12,40]]],
 star:[(()=>{const p=[];for(let i=0;i<=10;i++){const a=-90+i*36,r=i%2?16:38;p.push([50+r*Math.cos(a*Math.PI/180),58+r*Math.sin(a*Math.PI/180)])}return p})()]};
const PREP_CLIP={line:'P_warm_line',circle:'P_warm_circle',cross:'P_warm_cross',zigzag:'P_draw_zigzag',wave:'P_draw_wave',loops:'P_draw_loops'};
const PREP_TXT={line:'Draw a line. Down, down, down!',circle:'Round and round!',cross:'Down, and across!',zigzag:'Zig, zag, zig, zag!',wave:'Up and down, like waves!',loops:'Loop, loop, loop!'};
/* compose several glyphs side by side in one writing box */
function joinGlyphs(glyphs,scale,step){const out=[];glyphs.forEach((g,i)=>g.forEach(st=>out.push(st.map(([x,y])=>[x*scale+i*step,y]))));return out}
function numStrokes(v){const ds=String(v).split('');if(ds.length===1)return {s:DIG[v],w:100};return {s:joinGlyphs(ds.map(d=>DIG[d]),.62,52),w:110}}
const MODES=['full','faint','own'];const modeFor=r=>(((S.profile&&S.profile.age)||4)<=3?['full','full','faint']:MODES)[r];
const MODE_CAP={full:'Watch the dot, then follow it with your finger.',faint:'Again, with fewer helper lines.',own:'Now on your own! Start at the green dot.'};
const MODE_CLIP={full:'P_watch_dot',faint:'P_fewer_helpers',own:'P_your_own'};
ACT.wpre=(n,round)=>{const k=round<2?n.k:(n._k2||(n._k2=fresh('wp2',PRE_ALL.filter(x=>x!==n.k))));const mode=round%2===0?'full':'faint';if(round===3)n._k2=null;writeGlyph(PREP[k],{w:100,mode,intro:[mode==='full'?PREP_CLIP[k]:'P_fewer_helpers'],cap:mode==='full'?PREP_TXT[k]:MODE_CAP.faint,lines:false,done:ok=>{learnN(n,ok);roundDone(ok)}})};
ACT.wshape=(n,round)=>{const k=round<2?n.k:fresh('ws2',['square','triangle','rectangle','star'].filter(x=>x!==n.k));const mode=round===1?'faint':'full';writeGlyph(PREP[k],{w:100,mode,intro:mode==='full'?['P_draw_shape',W(k)]:['P_fewer_helpers'],cap:`Draw a ${k}!`,lines:false,done:ok=>{learnN(n,ok);roundDone(ok)}})};
ACT.wletter=(n,round)=>{const l=n.l,mode=modeFor(round);writeGlyph(LS[l],{w:100,mode,intro:[MODE_CLIP[mode]],cap:`Write ${l}. `+MODE_CAP[mode],lines:true,done:ok=>{learnN(Object.assign({},n,{skill:'wletter'}),ok);if(round===2)airStep(l,sndOf(l),ok);else roundDone(ok)}})};
ACT.wcap=(n,round)=>{const L=n.l.toUpperCase(),mode=modeFor(round);writeGlyph(CS[L],{w:100,mode,intro:round===0?['P_capital',L_(n.l)]:[MODE_CLIP[mode]],cap:`Big ${L}. `+MODE_CAP[mode],lines:true,done:ok=>{learnN(n,ok);if(round===2)airStep(L,[L_(n.l)],ok);else roundDone(ok)}})};
ACT.wnum=(n,round)=>{const v=n.n,mode=modeFor(round),g=numStrokes(v);writeGlyph(g.s,{w:g.w,mode,intro:round===0?['P_draw_number',N(v)]:[MODE_CLIP[mode]],cap:`Write ${v}. `+MODE_CAP[mode],lines:false,done:ok=>{learnN(n,ok);if(round===2)airStep(String(v),[N(v)],ok);else roundDone(ok)}})};
function nameChars(){return ((S.profile&&S.profile.name)||'').replace(/[^A-Za-z]/g,'').slice(0,8).split('')}
ACT.wname=(n,round)=>{const cs=nameChars();if(!cs.length){roundDone(true);return}const c=cs[round];const g=round===0?CS[c.toUpperCase()]:LS[c.toLowerCase()];
  const shown=cs.map((x,i)=>`<span style="color:${i<round?'var(--leaf-2)':i===round?'var(--c-write)':'#c9d6cc'}">${i===0?x.toUpperCase():x.toLowerCase()}</span>`).join('');
  writeGlyph(g,{w:100,mode:'full',intro:round===0?['P_write_name']:['P_keep_going'],cap:`${S.profile.name}: write the ${round===0?'big ':''}${round===0?c.toUpperCase():c.toLowerCase()}`,lines:true,header:`<div class="word" style="font-size:34px;letter-spacing:4px">${shown}</div>`,done:ok=>{learnN(n,ok);roundDone(ok)}})};
ACT.wword=(n)=>{const w=n.w;writeGlyph(joinGlyphs([...w].map(c=>LS[c]),.6,56),{w:56*w.length+20,mode:'faint',intro:['P_write_word',...(CVC_CLIP.has(w)?[W(w)]:[])],cap:`Write the word "${w}"`,lines:true,done:ok=>{learnN(n,ok);if(CVC_CLIP.has(w))say([W(w)],w+'!');roundDone(ok)}})};
function airStep(ch,seq,ok){FX.chime();body().innerHTML=`<div class="air">${ch}</div><p class="card-note">Grown-up: draw it big in the air together, then on paper or in a sand tray.</p>`;
  RUN.prompt=()=>say(['P_air',300,...seq],'Now draw it in the air. Big, big, big!');RUN.prompt();actions([['go','Next',()=>roundDone(ok),ICON.next]])}
function samplePath(strokes,sc,ox,oy){const out=[];strokes.forEach(st=>{for(let i=0;i<st.length-1;i++){const a=st[i],b=st[i+1];const d=Math.hypot(b[0]-a[0],b[1]-a[1]);const n=Math.max(1,Math.ceil(d/2));for(let k=0;k<n;k++){const t=k/n;out.push([ox+(a[0]+(b[0]-a[0])*t)*sc,oy+(a[1]+(b[1]-a[1])*t)*sc])}}const e=st[st.length-1];out.push([ox+e[0]*sc,oy+e[1]*sc])});return out}
/* Writing: the child decides when they are finished. Nothing auto-advances while drawing.
   "I'm done" checks coverage; if a lot is missing, Haathi asks to keep going. */
function writeGlyph(strokes,o){
  body().innerHTML=(o.header||'')+`<div class="lw-wrap ${o.surface?'srf-'+o.surface:''}"><canvas id="lw"></canvas></div>`;
  const c=$('lw'),wrap=c.parentElement,dpr=Math.min(2,devicePixelRatio||1);const BW=o.w||100,BH=118;
  const Wd=Math.max(220,Math.min(wrap.clientWidth-8,BW>120?720:520)),Hd=Math.max(200,Math.min(wrap.clientHeight-8,480));
  c.style.width=Wd+'px';c.style.height=Hd+'px';c.width=Wd*dpr;c.height=Hd*dpr;const x=c.getContext('2d');if(!x)return;x.setTransform(dpr,0,0,dpr,0,0);
  const sc=Math.min(Wd/BW,Hd/BH)*.92,ox=(Wd-BW*sc)/2,oy=(Hd-115*sc)/2+4;const path=samplePath(strokes,sc,ox,oy);const R=Math.max(16,sc*(o.road?11:8.5));
  let hit=path.map(()=>false),ink=0,inkGood=0,ready=false,down=false,last=null,hue=0,lf=0,k=0,drawn=false;
  function guide(){x.clearRect(0,0,Wd,Hd);
    if(o.lines){x.strokeStyle='#e3efe6';x.lineWidth=2;[10,45,90].forEach(y=>{x.beginPath();x.moveTo(8,oy+y*sc);x.lineTo(Wd-8,oy+y*sc);x.stroke()})}
    x.lineCap='round';x.lineJoin='round';
    if(o.pre){x.strokeStyle='#4b6457';x.lineWidth=Math.max(5,sc*2.6);o.pre.forEach(st=>{x.beginPath();st.forEach((p,i)=>i?x.lineTo(ox+p[0]*sc,oy+p[1]*sc):x.moveTo(ox+p[0]*sc,oy+p[1]*sc));x.stroke()})}
    if(o.mode==='full'){x.strokeStyle=o.road?'#efe3c8':'#e4e0f1';x.lineWidth=sc*(o.road?18:11);strokes.forEach(st=>{x.beginPath();st.forEach((p,i)=>i?x.lineTo(ox+p[0]*sc,oy+p[1]*sc):x.moveTo(ox+p[0]*sc,oy+p[1]*sc));x.stroke()})}
    else if(o.mode==='faint'){x.strokeStyle='#cfc6e6';x.lineWidth=Math.max(3,sc*1.6);x.setLineDash([sc*2,sc*4]);strokes.forEach(st=>{x.beginPath();st.forEach((p,i)=>i?x.lineTo(ox+p[0]*sc,oy+p[1]*sc):x.moveTo(ox+p[0]*sc,oy+p[1]*sc));x.stroke()});x.setLineDash([])}
    if(o.ends){const a=strokes[0][0],z=strokes[strokes.length-1].slice(-1)[0];x.font=`${Math.max(26,sc*13)}px serif`;x.textAlign='center';x.textBaseline='middle';x.fillText(o.ends[0],ox+a[0]*sc,oy+a[1]*sc-sc*10);x.fillText(o.ends[1],ox+z[0]*sc,oy+z[1]*sc-sc*10)}
    strokes.forEach((st,i)=>{x.fillStyle='#2f8a5f';x.beginPath();x.arc(ox+st[0][0]*sc,oy+st[0][1]*sc,Math.max(9,sc*4),0,7);x.fill();x.fillStyle='#fff';x.font=`800 ${Math.max(11,sc*5)}px "Baloo 2",sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillText(i+1,ox+st[0][0]*sc,oy+st[0][1]*sc)})}
  const demo=()=>{if(!document.body.contains(c))return;if(k<path.length){x.fillStyle='rgba(138,92,194,.85)';x.beginPath();x.arc(path[k][0],path[k][1],sc*3,0,7);x.fill();k+=2;requestAnimationFrame(demo)}
    else setTimeout(()=>{if(!document.body.contains(c))return;guide();ready=true;say(['P_follow_dot',300,'P_tap_done'],"Your turn! Tap \"I'm done\" when you finish.")},400)};
  const start=()=>{k=0;ready=false;drawn=false;hit=path.map(()=>false);ink=0;inkGood=0;guide();say(o.intro,o.cap);if(o.mode==='full'){setTimeout(demo,900);setTimeout(()=>{if(!ready&&document.body.contains(c)){k=path.length;guide();ready=true}},9000)}else{ready=true;setTimeout(()=>{if(document.body.contains(c))say(['P_tap_done'],o.cap)},2200)}};
  RUN.prompt=start;start();
  c.addEventListener('contextrestored',()=>{x.setTransform(dpr,0,0,dpr,0,0);guide();ready=true});
  const pos=e=>{const r=c.getBoundingClientRect();return[(e.clientX-r.left)*(Wd/r.width),(e.clientY-r.top)*(Hd/r.height)]};
  const paint=(px,py)=>{hue=(hue+5)%360;const lw=Math.max(8,sc*7.5);x.lineCap='round';
    if(o.surface==='rangoli'){const cols=['#ff4f8b','#ffd23f','#3ec1d3','#ff8c42','#7bd389','#ffffff'];for(let q=0;q<7;q++){x.fillStyle=cols[(Math.random()*cols.length)|0];const a=Math.random()*7,r=Math.random()*lw*.7;x.beginPath();x.arc(px+Math.cos(a)*r,py+Math.sin(a)*r,Math.random()*2.6+1.2,0,7);x.fill()}}
    else if(o.surface==='sand'){x.strokeStyle='#8a6332';x.lineWidth=lw;x.beginPath();x.moveTo(...(last||[px,py]));x.lineTo(px+.1,py+.1);x.stroke();x.strokeStyle='rgba(255,236,190,.55)';x.lineWidth=lw*.3;x.beginPath();x.moveTo(...(last||[px,py]).map(v=>v-lw*.25));x.lineTo(px-lw*.25,py-lw*.25);x.stroke()}
    else if(o.surface==='chalk'){x.strokeStyle='rgba(255,255,255,.88)';x.lineWidth=lw*.8;x.beginPath();x.moveTo(...(last||[px,py]));x.lineTo(px+.1,py+.1);x.stroke();x.fillStyle='rgba(255,255,255,.5)';for(let q=0;q<3;q++){x.beginPath();x.arc(px+(Math.random()-.5)*lw,py+(Math.random()-.5)*lw,1.2,0,7);x.fill()}}
    else{x.strokeStyle=o.color||`hsl(${hue},80%,52%)`;x.lineWidth=lw;x.beginPath();x.moveTo(...(last||[px,py]));x.lineTo(px+.1,py+.1);x.stroke()}
    last=[px,py];
    ink++;let near=false;for(let i=0;i<path.length;i++){const d=Math.hypot(path[i][0]-px,path[i][1]-py);if(d<R)hit[i]=true;if(d<R*1.4)near=true}if(near)inkGood++;
    const now=performance.now();if(now-lf>120){lf=now;tone(380+cov()*900,T(),.06,'sine',.05)}};
  const cov=()=>hit.filter(Boolean).length/path.length;
  c.onpointerdown=e=>{if(!ready)return;unlockAudio();if(!drawn){drawn=true;stopVoice()}try{c.setPointerCapture(e.pointerId)}catch(_){}down=true;last=null;paint(...pos(e))};
  c.onpointermove=e=>{if(down)paint(...pos(e))};c.onpointerup=c.onpointercancel=()=>{down=false;last=null};
  const finish=()=>{const cv=cov(),neat=ink?inkGood/ink:0;
    if(!drawn){say(['P_your_turn'],'Your turn to draw!');return}
    if(cv<.6){FX.boing();say(['P_keep_going'],'Keep going! Finish it all, then tap "I\'m done".');return}
    const ok=cv>=.8&&neat>=.6;ready=false;FX.sparkle();burst(c,14);say([ok?rnd(PRAISE):'P_nice_drawing'],ok?'Beautiful writing!':'Nice try! It will get neater with practice.').then(()=>o.done(ok))};
  actions([['soft','Clear',()=>{guide();hit=path.map(()=>false);ink=0;inkGood=0;drawn=false;FX.swish()}],['soft','Show me',()=>{if(o.mode!=='full'){const m=o.mode;o.mode='full';k=0;ready=false;guide();setTimeout(demo,300);o.mode=m}else{k=0;ready=false;guide();setTimeout(demo,300)}}],['go',"I'm done",finish,ICON.check]]);
}
/* dot-to-dot */
const DOTPICS=[{w:'house',max:5,p:[[20,92],[20,52],[50,20],[80,52],[80,92]],fill:'#f6a821'},{w:'kite',max:5,p:[[50,12],[78,46],[50,92],[22,46]],fill:'#c8364b'},{w:'boat',max:5,p:[[10,60],[90,60],[74,86],[26,86]],fill:'#147a8a'},
 {w:'fish',max:9,p:[[8,52],[28,32],[56,30],[76,46],[94,30],[94,70],[76,56],[56,72],[28,70]],fill:'#e07a12'},{w:'mango',max:9,p:[[50,18],[70,26],[80,46],[76,70],[58,88],[38,86],[24,68],[24,44],[34,26]],fill:'#f6a821'},
 {w:'star',max:10,p:(()=>{const p=[];for(let i=0;i<10;i++){const a=-90+i*36,r=i%2?18:40;p.push([50+r*Math.cos(a*Math.PI/180),55+r*Math.sin(a*Math.PI/180)])}return p})(),fill:'#f6a821'}];
ACT.dots=(n)=>{const pic=rnd(DOTPICS.filter(d=>d.max<=n.max));body().innerHTML=`<div class="lw-wrap"><canvas id="lw"></canvas></div>`;
  const c=$('lw'),wrap=c.parentElement,dpr=Math.min(2,devicePixelRatio||1);const Wd=Math.max(220,Math.min(wrap.clientWidth-8,520)),Hd=Math.max(200,Math.min(wrap.clientHeight-8,480));
  c.style.width=Wd+'px';c.style.height=Hd+'px';c.width=Wd*dpr;c.height=Hd*dpr;const x=c.getContext('2d');if(!x)return;x.setTransform(dpr,0,0,dpr,0,0);
  const sc=Math.min(Wd,Hd)/100*.9,ox=(Wd-100*sc)/2,oy=(Hd-100*sc)/2;const P=pic.p.map(([a,b])=>[ox+a*sc,oy+b*sc]);let nxt=1,down=false,tip=null;const R=Math.max(22,sc*7);
  function draw(){x.clearRect(0,0,Wd,Hd);x.strokeStyle='#8a5cc2';x.lineWidth=6;x.lineCap='round';x.beginPath();for(let i=0;i<nxt;i++)i?x.lineTo(...P[i]):x.moveTo(...P[i]);if(tip&&down&&nxt<=P.length)x.lineTo(...tip);x.stroke();
    P.forEach((p,i)=>{x.fillStyle=i<nxt?'#2f8a5f':i===nxt?'#f6a821':'#fff';x.strokeStyle='#4b6457';x.lineWidth=2;x.beginPath();x.arc(p[0],p[1],13,0,7);x.fill();x.stroke();x.fillStyle=i<nxt?'#fff':'#173326';x.font='800 15px "Baloo 2",sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText(i+1,p[0],p[1]+1)})}
  draw();const prompt=()=>say(['P_dots_join'],'Join the dots. Start at number 1!');RUN.prompt=prompt;prompt();say.n=0;
  const pos=e=>{const r=c.getBoundingClientRect();return[(e.clientX-r.left)*(Wd/r.width),(e.clientY-r.top)*(Hd/r.height)]};
  const reach=p=>{if(nxt<P.length&&Math.hypot(p[0]-P[nxt][0],p[1]-P[nxt][1])<R){nxt++;FX.tick(nxt);say([N(nxt)],String(nxt));if(nxt===P.length)complete()}};
  c.onpointerdown=e=>{unlockAudio();try{c.setPointerCapture(e.pointerId)}catch(_){}down=true;const p=pos(e);tip=p;reach(p);draw()};c.onpointermove=e=>{if(!down)return;tip=pos(e);reach(tip);draw()};c.onpointerup=c.onpointercancel=()=>{down=false;draw()};
  function complete(){down=false;x.fillStyle=pic.fill;x.globalAlpha=.85;x.beginPath();P.forEach((p,i)=>i?x.lineTo(...p):x.moveTo(...p));x.closePath();x.fill();x.globalAlpha=1;x.strokeStyle='#8a5cc2';x.lineWidth=6;x.stroke();c.onpointerdown=null;
    learnN(n,true);FX.fanfare();burst(c,20);say([400,'P_picture_done',W(pic.w)],`A ${pic.w}!`).then(()=>roundDone(true))}};
ACT.slate=()=>{body().innerHTML=`<div class="slatebar" id="sb"></div><div class="lw-wrap slate"><canvas id="lw"></canvas></div>`;const cols=['#ffffff','#ffe066','#ff9ac1','#9be89b','#8fd3ff'];let col=cols[0];
  const c=$('lw'),wrap=c.parentElement,dpr=Math.min(2,devicePixelRatio||1);const Wd=Math.max(220,Math.min(wrap.clientWidth-8,640)),Hd=Math.max(200,Math.min(wrap.clientHeight-8,480));
  c.style.width=Wd+'px';c.style.height=Hd+'px';c.width=Wd*dpr;c.height=Hd*dpr;const x=c.getContext('2d');if(!x)return;x.setTransform(dpr,0,0,dpr,0,0);
  $('sb').innerHTML=cols.map((cc,i)=>`<button class="chalk ${i?'':'on'}" style="background:${cc}" data-c="${cc}" aria-label="chalk colour"></button>`).join('');
  $('sb').querySelectorAll('.chalk').forEach(b=>b.onclick=()=>{col=b.dataset.c;$('sb').querySelectorAll('.chalk').forEach(z=>z.classList.remove('on'));b.classList.add('on');FX.tap()});
  let down=false,last=null;const pos=e=>{const r=c.getBoundingClientRect();return[(e.clientX-r.left)*(Wd/r.width),(e.clientY-r.top)*(Hd/r.height)]};
  c.onpointerdown=e=>{try{c.setPointerCapture(e.pointerId)}catch(_){}down=true;last=pos(e)};c.onpointermove=e=>{if(!down)return;const p=pos(e);x.strokeStyle=col;x.lineWidth=7;x.lineCap='round';x.globalAlpha=.9;x.beginPath();x.moveTo(...last);x.lineTo(...p);x.stroke();last=p};c.onpointerup=c.onpointercancel=()=>{down=false};
  RUN.prompt=()=>say(['P_slate'],'Draw anything you like on your slate!');RUN.prompt();
  actions([['soft','Wipe clean',()=>{x.clearRect(0,0,Wd,Hd);FX.swish()}],['go',"I'm done",()=>roundDone(true),ICON.check]])};
ACT.friend=(n)=>{const R=REGIONS[n.r];body().innerHTML=`<div class="haathi dance" style="width:150px;height:160px">${haathi('happy')}</div><div class="pic" style="font-size:110px">${R.friend[0]}</div>`;
  FX.trumpet();RUN.prompt=()=>say(['P_new_friend',W(R.friend[1])],`You found a new friend: the ${R.friend[1]}!`);RUN.prompt().then(()=>roundDone(true))};

/* ======================= MORE GAMES (v5): 22 letter, 32 maths, 20 writing ======================= */
const RECENT={};
/* random pick that avoids repeating the last few picks of the same game */
function fresh(key,pool){const r=RECENT[key]||(RECENT[key]=[]);const ks=pool.map(x=>JSON.stringify(x));let c=pool.filter((x,i)=>!r.includes(ks[i]));if(!c.length)c=pool;const v=rnd(c);r.push(JSON.stringify(v));while(r.length>Math.max(0,Math.min(6,pool.length-1)))r.shift();return v}
const LP=()=>S.intro.length>=4?S.intro.slice():LET.slice(0,Math.max(6,S.intro.length));
const nopt=()=>{const age=(S.profile&&S.profile.age)||4;const id=RUN&&RUN.node&&(RUN.node.skill||RUN.node.t);if(age>=5)return 4;
  if(id&&SK[id])return lv(id)>=(age<=3?2:1)?4:3;return letterSkill()>=(age<=3?.8:.65)?4:3};
function others(pool,t,n,bad){return shuffle(pool.filter(x=>x!==t&&!(bad&&bad(x)))).slice(0,n)}
const notSame=t=>x=>SAME[t]===x;
const picH=e=>`<span style="font-size:clamp(46px,12vw,78px);line-height:1">${e}</span>`;
const letH=l=>`<span style="font-family:var(--f-letter);font-weight:700;font-size:clamp(50px,13vw,82px);color:var(--peacock);line-height:1">${l}</span>`;
const numH=v=>`<span style="font-family:var(--f-letter);font-weight:700;font-size:clamp(46px,12vw,78px);color:var(--c-number);line-height:1">${v}</span>`;
const bigShow=h=>`<div class="showcard">${h}</div>`;
function pickRound(o){
  if(window.__TRACE)window.__TRACE.push({g:RUN&&RUN.node&&RUN.node.t,cap:o.cap,top:(o.top||'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim(),items:o.items.map(i=>i.label||String(i.v)),ans:String(o.ans),ansLabel:(o.items.find(i=>i.v===o.ans)||{}).label});
  body().innerHTML=(o.top||'')+`<div class="choices ${o.cls||''}" id="pk"></div>`;
  RUN.prompt=()=>say(o.say,o.cap);const okBtn=()=>$('pk')?[...$('pk').children].find(x=>x._ok):null;let wrong=false,busy=false,miss=0;
  if(ndFirstTime()){const r=RUN;say(['P_nd_watch',()=>setTimeout(()=>{if(RUN===r&&$('pk')&&!busy){const e=okBtn();if(e){ndHint(e);setTimeout(()=>e.classList.remove('nd-hint'),3200)}}},40),250,...o.say],o.cap)}else RUN.prompt();
  const L=once(ok=>{if(o.letter)recordLetter(o.letter,ok,o.items.length,RUN.node.t);learnN(RUN.node,ok)});
  o.items.forEach(it=>{const b=document.createElement('button');b.className=o.itemCls||'pcard';b.innerHTML=it.h;b.setAttribute('aria-label',it.label||String(it.v));
    b.onclick=()=>{if(busy)return;const ok=it.v===o.ans;L(ok);
      if(ok){busy=true;b.classList.add('right');FX.chime();burst(b,14);if(o.onRight)o.onRight(b);const r0=RUN;say(o.right||[rnd(PRAISE)],o.rightCap||'Yes!').then(()=>{if(o.after&&RUN===r0)o.after(()=>roundDone(!wrong));else roundDone(!wrong)})}
      else{wrong=true;miss++;FX.boing();anim(b,'wiggle',500);if(NEWUI&&miss>=2){ndHint(okBtn());say(['P_nd_here'],'Here it is. Tap it!')}else say(o.wrong?o.wrong(it):[rnd(RETRY)],o.wrongCap||'Try again!')}};
    b._ok=it.v===o.ans;$('pk').appendChild(b)});
}
function alive(t){return RUN&&RUN.node&&RUN.node.t===t&&document.body.contains(body())}

/* ---------- LETTERS ---------- */
const CONFUSE={b:'dpq',d:'bpq',p:'qbd',q:'pdb',m:'nw',n:'mhu',u:'nv',h:'nk',a:'oe',e:'ac',o:'ac',c:'oe',i:'lj',l:'it',t:'fl',f:'tl',s:'zc',g:'qy',r:'nv',k:'hx'};
const CVCE={cat:'🐈',hat:'👒',bat:'🦇',rat:'🐀',dog:'🐕',log:'🪵',nut:'🥜',hut:'🛖',sun:'☀️',bus:'🚌',pig:'🐖',map:'🗺️',bed:'🛏️',leg:'🦵',ten:'🔟'};
const RHY=[['cat','hat','bat','rat'],['dog','log'],['nut','hut']];
ACT.bigsmall=()=>{const t=fresh('bigsmall',ALPHA);const opts=shuffle([t,...others(ALPHA,t,nopt()-1)]);
  pickRound({top:bigShow(letH(t.toUpperCase())),items:opts.map(v=>({h:letH(v),v})),ans:t,say:['P_match_big',L_(t)],cap:`Big ${t.toUpperCase()}. Find the small ${t}!`,right:[L_(t),250,rnd(PRAISE)],rightCap:`${t.toUpperCase()} and ${t}!`})};
ACT.sameletter=()=>{const t=fresh('same',Object.keys(CONFUSE));const opts=shuffle([t,...shuffle(CONFUSE[t].split('')).slice(0,nopt()-1)]);
  pickRound({top:bigShow(letH(t)),items:opts.map(v=>({h:letH(v),v})),ans:t,say:['P_same_letter'],cap:'Find the same letter!',right:[L_(t),250,rnd(PRAISE)],rightCap:`Yes, ${t}!`})};
ACT.oddsound=()=>{let pool=LP().filter(l=>WORDS[l].length>=2);if(!pool.length)pool=['s','t','p'];const a=fresh('odd',pool);const b=rnd(LET.filter(x=>x!==a&&SAME[a]!==x));
  const [w1,w2]=shuffle(WORDS[a]).slice(0,2),w3=rnd(WORDS[b]);const items=shuffle([w1,w2,w3]);
  pickRound({items:items.map(w=>({h:picH(w[1]),v:w[0],label:w[0]})),ans:w3[0],say:['P_odd_sound',300,...items.map(w=>W(w[0]))],cap:'Which one starts with a different sound?',letter:a,
    right:[W(w3[0]),250,rnd(PRAISE)],rightCap:`Yes! ${w3[0]} starts differently.`,wrong:it=>[W(it.v),300,'P_listen_again',...items.map(w=>W(w[0]))]})};
ACT.samesound=()=>{const a=fresh('ss',LP());const same=Math.random()<.5&&WORDS[a].length>=2;const w1=WORDS[a][0];const w2=same?rnd(WORDS[a].slice(1)):rnd(WORDS[rnd(LET.filter(x=>x!==a&&SAME[a]!==x))]);
  pickRound({top:`<div class="meet-row"><div class="pic">${w1[1]}</div><div class="pic">${w2[1]}</div></div>`,items:[{h:'<span style="font-size:58px">👍</span>',v:true,label:'yes'},{h:'<span style="font-size:58px">👎</span>',v:false,label:'no'}],ans:same,
    say:['P_same_sound_q',300,W(w1[0]),W(w2[0])],cap:`${w1[0]} and ${w2[0]}: the same first sound?`,letter:a,right:[same?'P_yes_same':'P_no_diff'],rightCap:same?'Yes! They start the same!':'Right! They start differently!'})};
ACT.picletter=()=>{const t=fresh('pl',LP());const w=rnd(WORDS[t]);const opts=shuffle([t,...others(LET,t,nopt()-1,notSame(t))]);
  pickRound({top:bigShow(picH(w[1])),items:opts.map(v=>({h:letH(v),v})),ans:t,say:['P_pic_letter',W(w[0])],cap:`${w[0]}: which letter does it start with?`,letter:t,right:[W(w[0]),250,rnd(PRAISE)],rightCap:`${w[0]} starts with ${t}!`})};
ACT.letterpic=()=>{const t=fresh('lp',LP());const w=rnd(WORDS[t]);const items=shuffle([w,...others(LET,t,nopt()-1,notSame(t)).map(l=>rnd(WORDS[l]))]);
  pickRound({top:bigShow(lchar(t)),items:items.map(x=>({h:picH(x[1]),v:x[0],label:x[0]})),ans:w[0],say:['P_letter_pic',...sndOf(t)],cap:`Which picture starts with ${t}?`,letter:t,right:[W(w[0]),250,rnd(PRAISE)],rightCap:`${w[0]} starts with ${t}!`,wrong:it=>['P_hmm_thats',W(it.v)]})};
ACT.fishing=()=>{const t=fresh('fish',LP());const ls=shuffle([t,t,...others(LET,t,3,notSame(t))]);let got=0,wrong=false;const rec1=once(ok=>recordLetter(t,ok,3,'fishing'));
  body().innerHTML=`<div class="pond" id="pond"></div>`;
  ls.forEach((l,i)=>{const f=document.createElement('button');f.className='fishb'+(i%2?' rev':'');f.style.top=(6+i*18)+'%';f.style.setProperty('--dur',(10+Math.random()*5)+'s');f.style.animationDelay=(-Math.random()*10)+'s';f.innerHTML=`<span>🐟</span><b>${l}</b>`;
    f.onclick=()=>{if(f.dataset.done)return;if(l===t){f.dataset.done=1;got++;rec1(true);FX.pop();burst(f,12);f.classList.add('caught');if(got>=2)say([...sndOf(t),250,rnd(PRAISE)],`You caught the ${t} fish!`).then(()=>roundDone(!wrong));else say(['P_pr3'],'One more!')}
      else{wrong=true;rec1(false);FX.boing();anim(f,'wiggle',500);say([rnd(RETRY),...sndOf(t)],'Try another fish!')}};$('pond').appendChild(f)});
  RUN.prompt=()=>say(['P_fish',...sndOf(t)],`Catch 2 fish with the letter for "${KEYW(t)[0]}"`);RUN.prompt()};
ACT.nextletter=()=>{const i=fresh('nl',[...Array(23).keys()]);const seq=ALPHA.slice(i,i+3),ans=ALPHA[i+3];const opts=shuffle([ans,...others(ALPHA,ans,nopt()-1)]);
  pickRound({top:`<div class="numline">${seq.map(c=>`<div class="cell" style="color:var(--peacock)">${c}</div>`).join('')}<div class="cell q">?</div></div>`,items:opts.map(v=>({h:letH(v),v})),ans,
    say:['P_next_letter',300,...seq.map(L_)],cap:'Which letter comes next?',right:[...seq.map(L_),L_(ans)],rightCap:seq.join(', ')+', '+ans+'!'})};
ACT.missingletter=()=>{const i=fresh('ml',[...Array(23).keys()]);const seq=ALPHA.slice(i,i+4);const h=ri(1,2),ans=seq[h];const opts=shuffle([ans,...others(ALPHA,ans,nopt()-1)]);
  pickRound({top:`<div class="numline">${seq.map((c,k)=>k===h?'<div class="cell q">?</div>':`<div class="cell" style="color:var(--peacock)">${c}</div>`).join('')}</div>`,items:opts.map(v=>({h:letH(v),v})),ans,
    say:['P_missing_letter'],cap:'Which letter is missing?',right:seq.map(L_),rightCap:seq.join(', ')})};
ACT.sortsound=()=>{let pool=LP().filter(l=>WORDS[l].length>=2);if(pool.length<2)pool=['s','m','t','p'];const a=fresh('sort',pool);const b=rnd(pool.filter(x=>x!==a&&SAME[a]!==x));
  const pics=shuffle([...shuffle(WORDS[a]).slice(0,2).map(w=>[w,a]),...shuffle(WORDS[b]).slice(0,2).map(w=>[w,b])]);let k=0,wrong=false,tried=false;
  body().innerHTML=`<div class="pic" id="sp"></div><div class="baskets">${[a,b].map(l=>`<button class="basket" data-l="${l}"><b>${l}</b><span>🧺</span><i></i></button>`).join('')}</div>`;
  const show=()=>{if(!$('sp'))return;tried=false;$('sp').textContent=pics[k][0][1];say([W(pics[k][0][0])],pics[k][0][0])};
  RUN.prompt=()=>say(['P_sort_sound'],'Put each picture in the basket that starts the same way!').then(()=>{if(alive('sortsound')&&k<pics.length)show()});RUN.prompt();
  body().querySelectorAll('.basket').forEach(bk=>bk.onclick=()=>{if(k>=pics.length)return;const [w,l]=pics[k];const ok=bk.dataset.l===l;if(!tried){tried=true;recordLetter(l,ok,2,'sortsound')}
    if(ok){FX.chime();bk.querySelector('i').textContent+=w[1];k++;if(k>=pics.length){burst(bk,14);learnN(RUN.node,!wrong);say([rnd(PRAISE)],'All sorted!').then(()=>roundDone(!wrong))}else show()}
    else{wrong=true;FX.boing();anim(bk,'wiggle',500);say(['P_listen_again',W(w[0])],'Listen again: '+w[0])}})};
ACT.memory=()=>{const ls=shuffle(LP()).slice(0,3);const cards=shuffle([...ls.map(l=>({k:l,h:letH(l),t:'l'})),...ls.map(l=>({k:l,h:picH(KEYW(l)[1]),t:'p'}))]);let open=[],done=0,lock=false,tries=0;
  body().innerHTML=`<div class="memgrid" id="mg"></div>`;
  cards.forEach(c=>{const b=document.createElement('button');b.className='mem';b.innerHTML=`<div class="front">${c.h}</div><div class="back">🐘</div>`;
    b.onclick=()=>{if(lock||b.classList.contains('open'))return;b.classList.add('open');FX.tap();say([c.t==='p'?W(KEYW(c.k)[0]):L_(c.k)],c.t==='p'?KEYW(c.k)[0]:c.k);open.push([b,c]);
      if(open.length===2){lock=true;tries++;const [[b1,c1],[b2,c2]]=open;setTimeout(()=>{if(c1.k===c2.k&&c1.t!==c2.t){b1.classList.add('matched');b2.classList.add('matched');FX.chime();done++;
        if(done===3){learnN(RUN.node,tries<=5);say([rnd(PRAISE)],'All pairs found!').then(()=>roundDone(tries<=5))}}else{b1.classList.remove('open');b2.classList.remove('open');FX.boing()}open=[];lock=false},1000)}};$('mg').appendChild(b)});
  RUN.prompt=()=>say(['P_memory'],'Find the pairs: each letter with its picture!');RUN.prompt()};
ACT.rhyme=()=>{const fam=rnd(RHY);const [t,ans]=shuffle(fam).slice(0,2);const items=shuffle([ans,...shuffle(Object.keys(CVCE).filter(w=>!fam.includes(w))).slice(0,nopt()-1)]);
  pickRound({top:bigShow(picH(CVCE[t])),items:items.map(w=>({h:picH(CVCE[w]),v:w,label:w})),ans,say:['P_rhyme',W(t)],cap:`Which word rhymes with "${t}"?`,
    right:[W(t),W(ans),250,'P_rhymes_yes'],rightCap:`${t}, ${ans}. They rhyme!`,wrong:it=>[W(it.v),W(t),300,'P_listen_again']})};
ACT.buildword=()=>{const w=fresh('bw',Object.keys(CVCE));const tiles=shuffle([...w,...others(ALPHA.filter(c=>!w.includes(c)),'',2)]);let pos=0,wrong=false;
  body().innerHTML=`<div class="pic">${CVCE[w]}</div><div class="slots">${[...w].map(()=>'<span class="slot"></span>').join('')}</div><div class="tiles2" id="tl"></div>`;
  tiles.forEach(c=>{const b=document.createElement('button');b.className='ltile';b.textContent=c;
    b.onclick=()=>{if(b.disabled||pos>=w.length)return;if(c===w[pos]){b.disabled=true;b.classList.add('used');body().querySelectorAll('.slot')[pos].textContent=c;pos++;FX.tick(pos);say([hasRec(c)?'R_'+c:L_(c)],c);
      if(pos===w.length){learnN(RUN.node,!wrong);FX.chime();burst(body().querySelector('.slots'),16);say([400,W(w),250,rnd(PRAISE)],w+'!').then(()=>roundDone(!wrong))}}
      else{wrong=true;FX.boing();anim(b,'wiggle',500);say(['P_listen_again',W(w)],'Listen: '+w)}};$('tl').appendChild(b)});
  RUN.prompt=()=>say(['P_build_word',W(w)],`Build the word "${w}"`);RUN.prompt()};
ACT.firstmissing=()=>{const w=fresh('fm',Object.keys(CVCE));const ans=w[0];const opts=shuffle([ans,...others(ALPHA,ans,nopt()-1,x=>'aeiou'.includes(x))]);
  pickRound({top:`<div class="pic">${CVCE[w]}</div><div class="word"><b>_</b>${w.slice(1)}</div>`,items:opts.map(v=>({h:letH(v),v})),ans,say:['P_first_missing',W(w)],cap:`"${w}": which letter is missing at the start?`,
    right:[W(w),250,rnd(PRAISE)],rightCap:`${w}!`,letter:LET.includes(ans)?ans:null})};
ACT.hunt=()=>{const t=fresh('hunt',LP());const n=ri(3,4);const cells=shuffle([...Array(n).fill(t),...Array.from({length:12-n},()=>rnd(ALPHA.filter(x=>x!==t&&SAME[t]!==x)))]);let found=0,wrong=false;
  body().innerHTML=`<div class="showcard">${letH(t)}</div><div class="huntgrid" id="hg"></div>`;
  cells.forEach(c=>{const b=document.createElement('button');b.textContent=c;b.onclick=()=>{if(b.classList.contains('got')||found>=n)return;if(c===t){b.classList.add('got');found++;FX.tick(found);burst(b,8);
      if(found===n){recordLetter(t,!wrong,3,'hunt');learnN(RUN.node,!wrong);say([rnd(PRAISE)],`You found all ${n}!`).then(()=>roundDone(!wrong))}}else{wrong=true;FX.boing();anim(b,'wiggle',500)}};$('hg').appendChild(b)});
  RUN.prompt=()=>say(['P_hunt',L_(t)],`Tap every ${t}. There are ${n}!`);RUN.prompt()};
ACT.mole=()=>{const t=fresh('mole',LP());let hits=0,wrong=false,timer=null;
  body().innerHTML=`<div class="holes" id="ho">${Array(6).fill(0).map(()=>`<div class="hole"><button class="mole"><span>🐹</span><b></b></button></div>`).join('')}</div>`;
  const moles=[...body().querySelectorAll('.mole')];
  const pop=()=>{if(!alive('mole')||!$('ho')){clearInterval(timer);return}moles.forEach(m=>m.classList.remove('up'));const pick=shuffle(moles).slice(0,ri(2,3));const hasT=Math.random()<.7;
    pick.forEach((m,i)=>{m.dataset.l=(i===0&&hasT)?t:rnd(LET.filter(x=>x!==t&&SAME[t]!==x));m.querySelector('b').textContent=m.dataset.l;m.classList.add('up')})};
  moles.forEach(m=>m.onclick=()=>{if(!m.classList.contains('up')||hits>=3)return;m.classList.remove('up');if(m.dataset.l===t){hits++;FX.pop();burst(m,10);
      if(hits>=3){clearInterval(timer);recordLetter(t,!wrong,3,'mole');learnN(RUN.node,!wrong);say([rnd(PRAISE)],'You got them!').then(()=>roundDone(!wrong))}}else{wrong=true;FX.boing()}});
  RUN.prompt=()=>say(['P_mole',...sndOf(t)],`Tap the moles with ${t}. Get 3!`);RUN.prompt();setTimeout(()=>{pop();timer=setInterval(pop,2800)},1500)};
ACT.hidden=()=>{const t=fresh('hid',ALPHA);const opts=shuffle([t,...others(ALPHA,t,nopt()-1)]);
  pickRound({top:`<div class="hidebox"><span>${t}</span><i>🍃</i></div>`,items:opts.map(v=>({h:letH(v),v})),ans:t,say:['P_hidden'],cap:'A leaf is hiding a letter. Which one?',
    onRight:()=>{const h=body().querySelector('.hidebox');h&&h.classList.add('reveal')},right:[L_(t),250,rnd(PRAISE)],rightCap:`It was ${t}!`})};
ACT.stones=()=>{const t=fresh('st',LP());const rows=4;let r=0,wrong=false;const html=[];
  for(let i=0;i<rows;i++){const ls=shuffle([t,...others(LET,t,2,notSame(t))]);html.push(`<div class="srow" data-r="${i}">${ls.map(l=>`<button class="stone" data-l="${l}">${l}</button>`).join('')}</div>`)}
  body().innerHTML=`<div class="river"><div class="bank">🥭</div>${html.reverse().join('')}<div class="bank">🐘</div></div>`;
  body().querySelectorAll('.stone').forEach(s=>s.onclick=()=>{const row=+s.parentElement.dataset.r;if(row!==r)return;
    if(s.dataset.l===t){s.classList.add('step');FX.tick(r+1);r++;if(r===rows){recordLetter(t,!wrong,3,'stones');learnN(RUN.node,!wrong);FX.fanfare();say(['P_yum',rnd(PRAISE)],'Haathi crossed the river!').then(()=>roundDone(!wrong))}}
    else{wrong=true;FX.boing();anim(s,'wiggle',500);say([rnd(RETRY),...sndOf(t)],'Try another stone!')}});
  RUN.prompt=()=>say(['P_stones',...sndOf(t)],`Help Haathi cross! Step only on ${t}, starting at the bottom.`);RUN.prompt()};
ACT.shadow=()=>{const t=fresh('sh',ALPHA);const opts=shuffle([t,...others(ALPHA,t,nopt()-1)]);
  pickRound({top:`<div class="showcard shadowl">${t}</div>`,items:opts.map(v=>({h:letH(v),v})),ans:t,say:['P_shadow'],cap:'Which letter made this shadow?',right:[L_(t),250,rnd(PRAISE)],rightCap:`${t}!`})};

/* ---------- MATHS ---------- */
function blocksHTML(v){const t=Math.floor(v/10),o=v%10;return `<div class="blocks">${Array(t).fill('<span class="rod">'+'<i></i>'.repeat(10)+'</span>').join('')}<span class="ones">${'<i></i>'.repeat(o)}</span></div>`}
function pickNum(o){body().innerHTML=o.top+'<div class="choices" id="nc"></div>';RUN.prompt=()=>say(o.say,o.cap);RUN.prompt();let wrong=false;const L=once(ok=>learnN(o.node,ok));
  numChoices(o.ans,o.max,$('nc'),(b,v)=>{const ok=v===o.ans;L(ok);if(ok){b.classList.add('right');const q=[...body().querySelectorAll('.eqn span')].pop();if(q&&q.textContent==='?')q.textContent=o.ans;FX.chime();burst(b,14);say(o.right||[N(o.ans),250,rnd(PRAISE)],o.rightCap||'Yes!').then(()=>roundDone(!wrong))}
    else{wrong=true;FX.boing();anim(b,'wiggle',500);say(['P_find_bigger_place'],'Look at the tens first, then the ones.')}},o.lo)}
ACT.tens=(n)=>{const v=deck('tens'+n.max,range(11,n.max));const t=Math.floor(v/10),o=v%10;
  pickNum({top:blocksHTML(v)+`<div class="card-note" id="tn">Each long bar is <b>10</b>. Each small cube is <b>1</b>.</div>`,ans:v,max:n.max,say:['P_tens_ones'],cap:'How many? Count the tens, then the ones.',
    right:[N(t),'P_tens','P_and',N(o),'P_ones',300,N(v)],rightCap:`${t} tens and ${o} ones make ${v}`,node:n})};
const pileH=(k,v,small)=>{const sz=objSz(v,small);return `<div class="pile">${Array.from({length:v},(_,i)=>objHTML(k,i,small,sz)).join('')}</div>`};
ACT.fewer=(n)=>{const max=n.max;let a=ri(1,max),b=ri(1,max);while(Math.abs(a-b)<Math.max(1,Math.round(max/5)))b=ri(1,max);const th=rnd(COUNT_THINGS);
  pickRound({items:[a,b].map(v=>({h:pileH(th.k,v,'plate'),v,label:v+' '+th.label})),itemCls:'plate',cls:'plates',ans:Math.min(a,b),say:['P_which_less'],cap:'Which plate has fewer?',
    right:[N(Math.min(a,b)),'P_less_than',N(Math.max(a,b))],rightCap:`${Math.min(a,b)} is fewer than ${Math.max(a,b)}.`,wrong:()=>['P_count_again']})};
ACT.smaller=(n)=>{const max=n.max;let a=deck('sm'+max,range(0,max)),b=Math.random()<.5?a+rnd([-3,-2,-1,1,2,3]):ri(0,max);if(b<0||b>max||b===a)b=a===max?a-1:a+1;
  pickRound({items:[a,b].map(v=>({h:numH(v),v})),ans:Math.min(a,b),say:['P_smaller_num'],cap:'Which number is smaller?',right:[N(Math.min(a,b)),250,rnd(PRAISE)],rightCap:`${Math.min(a,b)} is smaller.`})};
ACT.matchgroup=(n)=>{const max=n.max;const t=fresh('mg'+max,[...Array(max).keys()].map(i=>i+1));const set=new Set([t]);while(set.size<3)set.add(ri(1,max));const th=rnd(COUNT_THINGS);
  pickRound({top:bigShow(numH(t)),items:shuffle([...set]).map(v=>({h:pileH(th.k,v,true),v,label:String(v)})),itemCls:'pcard grp',ans:t,say:['P_match_group',N(t)],cap:`Which group has ${t}?`,
    right:[N(t),250,rnd(PRAISE)],rightCap:`Yes, ${t}!`,wrong:()=>['P_count_again']})};
ACT.maketen=(n)=>{const tot=n.max;const have=fresh('mt'+tot,[...Array(tot-1).keys()].map(i=>i+1)),ans=tot-have;
  body().innerHTML=`<div class="tf">${Array.from({length:tot},(_,i)=>`<b class="${i<have?'on':''}"></b>`).join('')}</div><div class="choices" id="nc"></div>`;
  RUN.prompt=()=>say([tot===10?'P_make_ten':'P_make_five'],`How many more to make ${tot}?`);RUN.prompt();let wrong=false;const L=once(ok=>learnN(n,ok));
  numChoices(ans,tot,$('nc'),(b,v)=>{const ok=v===ans;L(ok);if(ok){b.classList.add('right');body().querySelectorAll('.tf b:not(.on)').forEach(x=>x.classList.add('on'));FX.chime();
      say([N(have),'P_and',N(ans),'P_makes',N(tot)],`${have} + ${ans} = ${tot}`).then(()=>roundDone(!wrong))}else{wrong=true;FX.boing();anim(b,'wiggle',500);say(['P_count_again'],'Count the empty spaces.')}},1,tot-1)};
function drum(){if(!actx)return;{const b=BUF.get('RS_drum@1');if(b){try{const s=actx.createBufferSource();s.buffer=b;s.connect(fxbus||master);s.start()}catch(e){}return}}const s0=S.settings.sfx;S.settings.sfx=true;tone(110,T(),.25,'sine',.5,60);noise(T(),.12,.25,300);S.settings.sfx=s0}
ACT.beats=(n)=>{if(actx)decodeOne('RS_drum');const v=fresh('beats',[...Array(n.max).keys()].map(i=>i+1));body().innerHTML=`<div class="pic" id="drum" style="font-size:110px">🥁</div><div class="choices" id="nc" hidden></div>`;
  let wrong=false;const L=once(ok=>learnN(n,ok));
  const play=async()=>{const nc=$('nc');if(nc)nc.hidden=true;await say(['P_beats'],'Listen to the drum. How many beats?');await sleep(300);
    for(let i=0;i<v;i++){if(!alive('beats'))return;drum();anim($('drum'),'chomp',400);await sleep(700)}if($('nc'))$('nc').hidden=false};
  RUN.prompt=play;play();
  numChoices(v,n.max,$('nc'),(b,x)=>{const ok=x===v;L(ok);if(ok){b.classList.add('right');FX.chime();say([N(v),250,rnd(PRAISE)],`${v} beats!`).then(()=>roundDone(!wrong))}
    else{wrong=true;FX.boing();anim(b,'wiggle',500);setTimeout(play,400)}})};
function orderGame(n,down){const top=n.max;let nxt=down?top:1,wrong=false;const nums=shuffle([...Array(top).keys()].map(i=>i+1));
  body().innerHTML=`${down?'<div class="pic" id="rk" style="font-size:80px;transition:transform 1.4s ease-in">🚀</div>':''}<div class="numgrid" id="ng"></div>`;
  nums.forEach(v=>{const b=document.createElement('button');b.className='pcard num small';b.textContent=v;
    b.onclick=()=>{if(b.classList.contains('right'))return;if(v===nxt){b.classList.add('right');FX.tick(down?top-v+1:v);say([N(v)],String(v));nxt+=down?-1:1;
        if(down?nxt===0:nxt>top){learnN(n,!wrong);FX.fanfare();if(down)$('rk').style.transform='translateY(-120vh)';say(down?[600,'N_0','P_blastoff']:[500,'P_well_counted'],down?'Blast off!':'Great counting!').then(()=>roundDone(!wrong))}}
      else{wrong=true;FX.boing();anim(b,'wiggle',500);say(['P_rocket_hint',N(nxt)],`Find ${nxt}`)}};$('ng').appendChild(b)});
  RUN.prompt=()=>say(down?['P_rocket',N(top)]:['P_order'],down?`Count down for the rocket! Start at ${top}.`:'Tap the numbers in order. Start at 1!');RUN.prompt()}
ACT.rocket=n=>orderGame(n,true);ACT.order=n=>orderGame(n,false);
ACT.frog=(n)=>{const max=n.max;const a=ri(0,max-2),b=ri(1,Math.min(3+lv('frog')*2,max-a)),ans=a+b;
  body().innerHTML=`<div class="nline">${Array.from({length:max+1},(_,i)=>`<span class="tick"><i>${i===a?'🐸':''}</i><b>${i}</b></span>`).join('')}</div><div class="card-note">The frog is on <b>${a}</b>. It hops <b>${b}</b>.</div><div class="choices" id="nc"></div>`;
  RUN.prompt=()=>say(['P_frog_on',N(a),'P_frog_hops',N(b),300,'P_where_land'],`Frog on ${a} hops ${b}. Where does it land?`);RUN.prompt();let wrong=false;const L=once(ok=>learnN(n,ok));
  numChoices(ans,max,$('nc'),async(btn,v)=>{const ok=v===ans;L(ok);if(ok){btn.classList.add('right');for(let k=1;k<=b;k++){if(!alive('frog'))return;const ts=body().querySelectorAll('.tick i');ts.forEach(x=>x.textContent='');ts[a+k].textContent='🐸';FX.tick(k);await say([N(a+k)],String(a+k))}
      FX.chime();say([rnd(PRAISE)],`${a} + ${b} = ${ans}`).then(()=>roundDone(!wrong))}else{wrong=true;FX.boing();anim(btn,'wiggle',500);say(['P_count_again'],'Hop along with your finger!')}},0)};
ACT.skip=(n)=>{const step=n.max;const maxStart=Math.max(0,Math.floor(30/step)-3);const s0=ri(0,maxStart);const seq=[0,1,2,3].map(k=>(s0+k)*step);const ans=seq[3];
  const opts=shuffle([...new Set([ans,ans+step,Math.max(1,ans-1),ans+1])]).slice(0,3);if(!opts.includes(ans))opts[0]=ans;
  pickRound({top:`<div class="numline">${seq.slice(0,3).map(v=>`<div class="cell">${v}</div>`).join('')}<div class="cell q">?</div></div>`,items:shuffle(opts).map(v=>({h:numH(v),v})),ans,
    say:[step===10?'P_count_tens':step===5?'P_count_fives':'P_count_twos',300,...seq.slice(0,3).map(N)],cap:`Count in ${step}s. What comes next?`,right:seq.map(N),rightCap:seq.join(', ')})};
ACT.hiding=(n)=>{const tot=n.max;const hid=fresh('hid'+tot,[...Array(tot-1).keys()].map(i=>i+1)),vis=tot-hid;
  body().innerHTML=`<div class="card-note">There are <b>${tot}</b> ladoos altogether.</div><div class="tenrow" style="align-items:center">${pileH('ladoo',vis)}<div class="bowl" id="bw">🥣</div></div><div class="choices" id="nc"></div>`;
  RUN.prompt=()=>say(['P_hiding'],`${tot} ladoos altogether. How many are hiding under the bowl?`);RUN.prompt();let wrong=false;const L=once(ok=>learnN(n,ok));
  numChoices(hid,tot,$('nc'),(b,v)=>{const ok=v===hid;L(ok);if(ok){b.classList.add('right');$('bw').innerHTML=pileH('ladoo',hid,true);FX.chime();say([N(vis),'P_and',N(hid),'P_makes',N(tot)],`${vis} + ${hid} = ${tot}`).then(()=>roundDone(!wrong))}
    else{wrong=true;FX.boing();anim(b,'wiggle',500);say(['P_close'],`Count on from ${vis} to ${tot} with your fingers.`)}},1,tot-1)};
ACT.oddshape=()=>{const ks=Object.keys(SHAPES);const a=rnd(ks),b=rnd(ks.filter(x=>x!==a));const cols=shuffle(SHAPE_COL);const col=Math.random()<.5;
  const items=shuffle([0,1,2,3].map(i=>({k:i===0?b:a,c:col?cols[0]:cols[i]})));
  pickRound({items:items.map(x=>({h:`<div style="width:72%;height:72%">${shapeSVG(x.k,x.c)}</div>`,v:x.k,label:x.k})),ans:b,say:['P_odd_shape'],cap:'Which one is different?',right:[W(b),250,rnd(PRAISE)],rightCap:`The ${b} is different!`})};
ACT.sortcolour=(n)=>{const CL=[['red','#e2563f'],['blue','#147a8a'],['yellow','#f6a821'],['green','#2f8a5f'],['purple','#8a5cc2']];const two=shuffle(CL).slice(0,2);const ks=Object.keys(SHAPES);
  const items=shuffle([0,1,2,3,4,5].map(i=>({c:two[i%2],k:rnd(ks)})));let k=0,wrong=false;
  body().innerHTML=`<div class="shape" id="cur" style="width:120px"></div><div class="baskets">${two.map(c=>`<button class="basket" data-c="${c[0]}" style="border-color:${c[1]}"><b style="background:${c[1]};color:#fff">${c[0]}</b><span>🧺</span><i></i></button>`).join('')}</div>`;
  const show=()=>{if($('cur'))$('cur').innerHTML=shapeSVG(items[k].k,items[k].c[1])};show();
  RUN.prompt=()=>say(['P_sort_colour'],'Put each one in the basket with the same colour!');RUN.prompt();
  body().querySelectorAll('.basket').forEach(bk=>bk.onclick=()=>{if(k>=items.length)return;if(bk.dataset.c===items[k].c[0]){FX.chime();bk.querySelector('i').innerHTML+=`<span style="display:inline-block;width:22px;height:22px">${shapeSVG(items[k].k,items[k].c[1])}</span>`;k++;
      if(k>=items.length){learnN(n,!wrong);burst(bk,14);say([rnd(PRAISE)],'All sorted!').then(()=>roundDone(!wrong))}else show()}else{wrong=true;FX.boing();anim(bk,'wiggle',500)}})};
ACT.size=(n)=>{const e=rnd(['🐘','🥭','⚽','🌸','🐟','🏠','🍎','🦆','🚌','🪁']);const kind=Math.random()<.5?'bigger':'smaller';const items=shuffle([{s:ri(100,130),v:'big'},{s:ri(40,58),v:'small'}]);
  pickRound({items:items.map(x=>({h:`<span style="font-size:${x.s}px;line-height:1">${e}</span>`,v:x.v,label:x.v})),itemCls:'pcard wide',ans:kind==='bigger'?'big':'small',say:[kind==='bigger'?'P_bigger_obj':'P_smaller_obj'],cap:`Which one is ${kind}?`})};
const HEAVY=[['🐘','🐭'],['🪨','🪶'],['🍉','🍇'],['🚚','🚲'],['🐄','🐔'],['📦','🎈'],['🛋️','🧸'],['🐅','🐈']];
ACT.heavy=(n)=>{const [h,l]=fresh('heavy',HEAVY);const kind=Math.random()<.5?'heavier':'lighter';
  pickRound({top:'<div class="pic" style="font-size:60px">⚖️</div>',items:shuffle([{e:h,v:'h'},{e:l,v:'l'}]).map(x=>({h:picH(x.e),v:x.v})),ans:kind==='heavier'?'h':'l',say:[kind==='heavier'?'P_heavier':'P_lighter'],cap:`Which one is ${kind}?`})};
ACT.queue=(n)=>{const an=shuffle(['🐘','🐒','🦚','🐄','🐐','🦆','🐅','🐫','🐕']).slice(0,4);const kind=Math.random()<.5?'first':'last';const ans=kind==='first'?an[0]:an[3];
  pickRound({top:'<div class="card-note">The line starts at the flag 🚩</div>',cls:'queue',items:an.map(e=>({h:`<span style="font-size:clamp(40px,11vw,64px);display:inline-block;transform:scaleX(-1)">${e}</span>`,v:e})),itemCls:'pcard small',
    ans,say:[kind==='first'?'P_first_line':'P_last_line'],cap:`Who is ${kind} in the line?`})};
ACT.money=(n)=>{const set=n.max>=11?[1,2,5]:[1];const purse=()=>Array.from({length:ri(2,4)},()=>rnd(set));let a=purse(),b=purse();const sum=c=>c.reduce((x,y)=>x+y,0);if(sum(a)===sum(b))b.push(1);const s=[sum(a),sum(b)];
  pickRound({items:[a,b].map((c,i)=>({h:`<div class="purse">${c.map(v=>`<span class="coin c${v}">₹${v}</span>`).join('')}</div>`,v:i})),itemCls:'pcard grp',ans:s[0]>s[1]?0:1,say:['P_more_money'],cap:'Which purse has more money?',
    right:[N(Math.max(...s)),'P_rupees'],rightCap:`₹${Math.max(...s)} is more than ₹${Math.min(...s)}.`})};
ACT.double=(n)=>{const v=fresh('dbl'+n.max,[...Array(n.max).keys()].map(i=>i+1)),ans=v*2;const dots=`<div class="wing">${Array(v).fill('<i></i>').join('')}</div>`;
  body().innerHTML=`<div class="bfly">${dots}<span>🐛</span>${dots}</div><div class="choices" id="nc"></div>`;
  RUN.prompt=()=>say(['P_double'],'Both wings have the same spots. How many spots altogether?');RUN.prompt();let wrong=false;const L=once(ok=>learnN(n,ok));
  numChoices(ans,ans+3,$('nc'),(b,x)=>{const ok=x===ans;L(ok);if(ok){b.classList.add('right');FX.chime();say([N(v),'P_and',N(v),'P_makes',N(ans)],`${v} + ${v} = ${ans}`).then(()=>roundDone(!wrong))}else{wrong=true;FX.boing();anim(b,'wiggle',500);say(['P_count_again'],'Count all the spots.')}})};
ACT.countshapes=(n)=>{const ks=['circle','square','triangle','star','heart'];const t=rnd(ks);const c=ri(2,n.max);const list=shuffle([...Array(c).fill(t),...Array.from({length:ri(2,4)},()=>rnd(ks.filter(k=>k!==t)))]);
  body().innerHTML=`<div class="shapegrid">${list.map(k=>`<span class="obj" style="width:clamp(40px,11vw,58px)">${shapeSVG(k,SHAPE_COL[ks.indexOf(k)])}</span>`).join('')}</div><div class="choices" id="nc"></div>`;
  tapCount([...body().querySelectorAll('.shapegrid .obj')].filter((o,i)=>list[i]===t));
  RUN.prompt=()=>say(['P_hm_'+t],`How many ${t}s? Tap them to count.`);RUN.prompt();let wrong=false;const L=once(ok=>learnN(n,ok));
  numChoices(c,n.max+2,$('nc'),(b,x)=>{const ok=x===c;L(ok);if(ok){b.classList.add('right');FX.chime();say([N(c),250,rnd(PRAISE)],`${c} ${t}s!`).then(()=>roundDone(!wrong))}else{wrong=true;FX.boing();anim(b,'wiggle',500);say(['P_count_again'],'Tap each one and count.')}})};

function clockSVG(h,m){const ha=((h%12)+m/60)*30,ma=m*6;const num=Array.from({length:12},(_,i)=>{const a=(i+1)*30*Math.PI/180;return `<text x="${50+38*Math.sin(a)}" y="${53.5-38*Math.cos(a)}" text-anchor="middle" font-size="9" font-family="Baloo 2,sans-serif" font-weight="700" fill="#173326">${i+1}</text>`}).join('');
  return `<svg viewBox="0 0 100 100" style="width:min(220px,56vw)"><circle cx="50" cy="50" r="47" fill="#fff" stroke="#1f6b4a" stroke-width="4"/>${num}<line x1="50" y1="50" x2="${50+22*Math.sin(ha*Math.PI/180)}" y2="${50-22*Math.cos(ha*Math.PI/180)}" stroke="#c8364b" stroke-width="5" stroke-linecap="round"/><line x1="50" y1="50" x2="${50+34*Math.sin(ma*Math.PI/180)}" y2="${50-34*Math.cos(ma*Math.PI/180)}" stroke="#147a8a" stroke-width="3" stroke-linecap="round"/><circle cx="50" cy="50" r="3" fill="#173326"/></svg>`}
ACT.clock=(n)=>{const half=n.lvl>=1&&Math.random()<.5;const h=deck('clk',range(1,12));const m=half?30:0;const lab=(hh,mm)=>`${hh}:${mm?'30':'00'}`;
  const opts=[[h,m],[h%12+1,m],[h,half?0:30]].concat([[((h+5)%12)+1,m]]);const uniq=[];opts.forEach(o=>{if(!uniq.some(u=>u[0]===o[0]&&u[1]===o[1]))uniq.push(o)});
  pickRound({top:clockSVG(h,m)+'<div class="card-note">Short red hand: hour. Long blue hand: minutes.</div>',items:shuffle(uniq.slice(0,nopt())).map(([hh,mm])=>({h:`<span style="font-family:var(--f-display);font-weight:800;font-size:clamp(26px,7vw,36px);color:var(--c-number)">${lab(hh,mm)}</span>`,v:hh*100+mm,label:lab(hh,mm)})),
    ans:h*100+m,say:['P_what_time'],cap:'What time is it?',right:[`T_${h}_${m?'30':'00'}`,250,rnd(PRAISE)],rightCap:half?`Half past ${h}`:`${h} o'clock`,wrong:()=>['P_short_hand']})};
ACT.tenmore=(n)=>{const more=Math.random()<.5;const v=deck('tm'+n.max,more?range(1,n.max-10):range(11,n.max));const ans=more?v+10:v-10;
  pickNum({top:`${blocksHTML(v)}<div class="eqn"><span>${v}</span><span>${more?'+':'−'}</span><span>10</span><span>=</span><span>?</span></div>`,ans,max:n.max,lo:1,say:[more?'P_ten_more':'P_ten_less',N(v)],cap:`What is ten ${more?'more':'less'} than ${v}?`,right:[N(ans),250,rnd(PRAISE)],rightCap:`${v} ${more?'+':'−'} 10 = ${ans}. Only the tens changed!`,node:n})};

/* ---------- WRITING ---------- */
Object.assign(PREP,{
 spiral:[Array.from({length:120},(_,i)=>{const t=i/119*5*Math.PI;const r=3+t*2.3;return [50+r*Math.cos(t),58+r*Math.sin(t)]})],
 rainbow:[arc(50,84,38,180,360,30),arc(50,84,27,180,360,24),arc(50,84,16,180,360,18)],
 cups:[[...arc(18,52,10.5,180,0,12),...arc(39,52,10.5,180,0,12).slice(1),...arc(60,52,10.5,180,0,12).slice(1),...arc(81,52,10.5,180,0,12).slice(1)]],
 mountains:[[[6,90],[20,26],[34,90],[48,26],[62,90],[76,26],[92,90]]],
 stairs:[[[10,94],[10,76],[28,76],[28,58],[46,58],[46,40],[64,40],[64,22],[86,22]]],
 bridges:[[...arc(18,76,10.5,180,360,12),...arc(39,76,10.5,180,360,12).slice(1),...arc(60,76,10.5,180,360,12).slice(1),...arc(81,76,10.5,180,360,12).slice(1)]]
});
Object.assign(PREP_CLIP,{spiral:'P_draw_spiral',rainbow:'P_draw_rainbow',cups:'P_draw_cups',mountains:'P_draw_mountains',stairs:'P_draw_stairs',bridges:'P_draw_bridges'});
Object.assign(PREP_TXT,{spiral:'Round and round, like a snail!',rainbow:'Up and over, like a rainbow!',cups:'Down and up, like little cups!',mountains:'Up and down, big mountains!',stairs:'Step, step, up the stairs!',bridges:'Up and over, little bridges!'});
const PRE_ALL=['line','circle','cross','zigzag','wave','loops','spiral','rainbow','cups','mountains','stairs','bridges'];
const mirror=s=>s.map(([x,y])=>[100-x,y]);
function mazePath(){const pts=[[8,ri(20,96)]];const n=5;for(let i=1;i<=n;i++)pts.push([8+i*(84/n),i%2?ri(16,48):ri(66,100)]);return [smooth(pts,3)]}
const TRACEPICS=[...DOTPICS.map(d=>({w:d.w,s:[[...d.p,d.p[0]]]})),{w:'heart',s:[smooth([[50,40],[38,26],[22,30],[16,46],[28,66],[50,88],[72,66],[84,46],[78,30],[62,26],[50,40]],2)]},
 {w:'sun',s:[arc(50,58,18,-90,-450,30),[[50,30],[50,18]],[[50,86],[50,98]],[[22,58],[10,58]],[[78,58],[90,58]],[[30,38],[22,30]],[[70,38],[78,30]],[[30,78],[22,86]],[[70,78],[78,86]]]}];
const SHAPEPICS=[{w:'house',s:[[[24,96],[24,58],[76,58],[76,96],[24,96]],[[18,60],[50,26],[82,60]],[[44,96],[44,76],[56,76],[56,96]]]},
 {w:'icecream',s:[[[30,56],[50,104],[70,56],[30,56]],arc(50,46,20,180,360,20)]},
 {w:'tree',s:[[[44,104],[44,74],[56,74],[56,104]],arc(50,48,28,90,450,30)]},
 {w:'flower',s:[arc(50,44,8,0,360,16),arc(50,24,10,90,450,16),arc(70,44,10,180,540,16),arc(50,64,10,-90,270,16),arc(30,44,10,0,360,16),[[50,74],[50,108]]]}];
const HALVES=[{w:'heart',pre:[smooth([[50,40],[38,26],[22,30],[16,46],[28,66],[50,88]],2)]},{w:'butterfly',pre:[smooth([[50,40],[34,18],[14,24],[16,50],[38,58],[50,58],[30,74],[22,94],[42,92],[50,72]],2)]},
 {w:'tree',pre:[[[50,14],[18,70],[44,70],[44,100],[50,100]]]},{w:'house',pre:[[[50,22],[16,56],[24,56],[24,100],[50,100]]]}];
ACT.maze=(n,round)=>{writeGlyph(mazePath(),{w:100,mode:'full',road:true,ends:['🐘','🥭'],intro:['P_maze'],cap:'Help Haathi reach the mango! Follow the road.',lines:false,done:ok=>{learnN(n,ok);roundDone(ok)}})};
ACT.tracepic=(n,round)=>{if(round%2===0)n._p=fresh('tp',TRACEPICS);const p=n._p;writeGlyph(p.s,{w:100,mode:round%2===0?'full':'faint',intro:round%2===0?['P_trace_pic',W(p.w)]:['P_fewer_helpers'],cap:`Trace the ${p.w}!`,lines:false,done:ok=>{learnN(n,ok);roundDone(ok)}})};
ACT.drawshapes=(n)=>{const p=fresh('ds',SHAPEPICS);writeGlyph(p.s,{w:100,mode:'full',intro:['P_draw_shape',W(p.w)],cap:`Draw a ${p.w==='icecream'?'ice cream':p.w} with shapes!`,lines:false,done:ok=>{learnN(n,ok);roundDone(ok)}})};
ACT.finishpic=(n)=>{const p=fresh('fp',HALVES);writeGlyph(p.pre.map(mirror),{w:100,mode:'faint',pre:p.pre,intro:['P_finish_pic'],cap:`Finish the ${p.w}! Draw the other side.`,lines:false,done:ok=>{learnN(n,ok);roundDone(ok)}})};
const RAINBOW=['#e2563f','#f6a821','#147a8a'];
ACT.wrainbow=(n,round)=>{if(!n.l)n.l=fresh('wr',S.intro.length?S.intro:['a','s','t']);writeGlyph(LS[n.l],{w:100,mode:round===0?'full':'faint',color:RAINBOW[round],intro:round===0?['P_rainbow']:['P_keep_going'],cap:`Rainbow ${n.l}: ${['red','yellow','blue'][round]} this time!`,lines:true,done:ok=>{learnN(n,ok);roundDone(ok)}})};
ACT.wheard=(n)=>{const l=fresh('wh',LP());const [w,pic]=KEYW(l);writeGlyph(LS[l],{w:100,mode:'own',header:`<div class="cue"><span class="em">${pic}</span>${w}</div>`,intro:['P_write_heard',W(w)],cap:`Write the letter for the first sound in "${w}". The green dots show where to start.`,lines:true,
  done:ok=>{learnN(n,ok);recordLetter(l,ok,3,'wheard');airStep(l,sndOf(l),ok)}})};
ACT.countwrite=(n)=>{const v=fresh('cw'+n.max,[...Array(n.max).keys()].map(i=>i+1));const g=numStrokes(v);const th=rnd(COUNT_THINGS);
  writeGlyph(g.s,{w:g.w,mode:'faint',header:`<div style="margin-bottom:4px">${pileH(th.k,v,true)}</div>`,intro:['P_count_write'],cap:'Count them, then write the number!',lines:false,done:ok=>{learnN(n,ok);say([N(v)],String(v));roundDone(ok)}})};
ACT.wcopy=(n)=>{const isNum=Math.random()<.35;const ch=isNum?String(ri(1,9)):fresh('wc',S.intro.length?S.intro:ALPHA.slice(0,8));const strokes=isNum?DIG[ch]:LS[ch];
  writeGlyph(strokes,{w:100,mode:'own',header:`<div class="copymodel">${ch}</div>`,intro:['P_copy'],cap:`Look at the ${ch} and copy it in the box. Start at the green dot.`,lines:!isNum,done:ok=>{learnN(n,ok);roundDone(ok)}})};
ACT.wlines=(n)=>{const L=[[[14,30],[86,30]],[[20,20],[20,100]],[[40,96],[86,40]],[[14,70],[86,70]],[[54,24],[90,96]]];const pick=shuffle(L).slice(0,3);
  writeGlyph(pick,{w:100,mode:'faint',intro:['P_lines'],cap:'Draw a straight line from dot to dot!',lines:false,done:ok=>{learnN(n,ok);roundDone(ok)}})};
ACT.joinmatch=(n)=>{const ls=shuffle(LP()).slice(0,3);const right=shuffle(ls.slice());let made=0,wrong=false,start=null,line=null;
  body().innerHTML=`<div class="join" id="jn"><svg id="jsv"></svg><div class="jcol">${ls.map(l=>`<button class="jitem" data-l="${l}" data-s="L">${KEYW(l)[1]}</button>`).join('')}</div><div class="jcol">${right.map(l=>`<button class="jitem jl" data-l="${l}" data-s="R">${l}</button>`).join('')}</div></div>`;
  const jn=$('jn'),sv=$('jsv');const rel=e=>{const r=jn.getBoundingClientRect();return [e.clientX-r.left,e.clientY-r.top]};const ctr=el=>{const r=el.getBoundingClientRect(),q=jn.getBoundingClientRect();return [r.left-q.left+r.width/2,r.top-q.top+r.height/2]};
  const mk=(a,b,col)=>{const l=document.createElementNS('http://www.w3.org/2000/svg','line');l.setAttribute('x1',a[0]);l.setAttribute('y1',a[1]);l.setAttribute('x2',b[0]);l.setAttribute('y2',b[1]);l.setAttribute('stroke',col);l.setAttribute('stroke-width','8');l.setAttribute('stroke-linecap','round');sv.appendChild(l);return l};
  jn.querySelectorAll('[data-s="L"]').forEach(b=>b.addEventListener('pointerdown',e=>{if(b.classList.contains('done'))return;e.preventDefault();start=b;line=mk(ctr(b),rel(e),'#8a5cc2');try{jn.setPointerCapture(e.pointerId)}catch(_){}FX.tap();say([W(KEYW(b.dataset.l)[0])],KEYW(b.dataset.l)[0])}));
  jn.addEventListener('pointermove',e=>{if(!line)return;const p=rel(e);line.setAttribute('x2',p[0]);line.setAttribute('y2',p[1])});
  const end=e=>{if(!line)return;const el=document.elementFromPoint(e.clientX,e.clientY);const tgt=el&&el.closest&&el.closest('[data-s="R"]');
    if(tgt&&tgt.dataset.l===start.dataset.l&&!tgt.classList.contains('done')){const c=ctr(tgt);line.setAttribute('x2',c[0]);line.setAttribute('y2',c[1]);line.setAttribute('stroke','#2f8a5f');start.classList.add('done');tgt.classList.add('done');FX.chime();made++;
      if(made===3){learnN(n,!wrong);say([rnd(PRAISE)],'All joined!').then(()=>roundDone(!wrong))}}
    else{if(tgt){wrong=true;FX.boing();anim(tgt,'wiggle',500)}line.remove()}line=null;start=null};
  jn.addEventListener('pointerup',end);jn.addEventListener('pointercancel',()=>{if(line)line.remove();line=null});
  RUN.prompt=()=>say(['P_join_match'],'Draw a line from each picture to its letter!');RUN.prompt()};
const COLOURPICS={
 house:'<rect data-r x="20" y="48" width="60" height="44" /><path data-r d="M12 50 L50 16 L88 50Z"/><rect data-r x="44" y="66" width="14" height="26"/><rect data-r x="26" y="58" width="12" height="12"/><rect data-r x="64" y="58" width="12" height="12"/><circle data-r cx="86" cy="14" r="8"/><rect data-r x="0" y="92" width="100" height="8"/>',
 fish:'<ellipse data-r cx="46" cy="50" rx="30" ry="18"/><path data-r d="M74 50 L94 34 L94 66Z"/><path data-r d="M40 32 L52 18 L58 34Z"/><circle data-r cx="30" cy="46" r="4"/><circle data-r cx="14" cy="22" r="5"/><circle data-r cx="22" cy="12" r="3"/>',
 flower:'<circle data-r cx="50" cy="20" r="11"/><circle data-r cx="70" cy="34" r="11"/><circle data-r cx="62" cy="56" r="11"/><circle data-r cx="38" cy="56" r="11"/><circle data-r cx="30" cy="34" r="11"/><circle data-r cx="50" cy="40" r="10"/><rect data-r x="47" y="60" width="6" height="26"/><ellipse data-r cx="62" cy="76" rx="10" ry="5"/><path data-r d="M32 86 H68 L62 100 H38Z"/>',
 kite:'<path data-r d="M50 6 L50 46 L20 46Z"/><path data-r d="M50 6 L80 46 L50 46Z"/><path data-r d="M20 46 L50 46 L50 92Z"/><path data-r d="M80 46 L50 46 L50 92Z"/><path data-r d="M42 96 L50 92 L42 88Z"/><path data-r d="M58 100 L50 96 L58 92Z"/>'};
ACT.colour=(n)=>{const k=fresh('col',Object.keys(COLOURPICS));const PAL=['#e2563f','#f6a821','#ffd84d','#2f8a5f','#147a8a','#8fd3ff','#8a5cc2','#ff9ac1','#8a5a33'];let col=PAL[0];
  body().innerHTML=`<div class="slatebar">${PAL.map((c,i)=>`<button class="chalk ${i?'':'on'}" style="background:${c}" data-c="${c}" aria-label="colour"></button>`).join('')}</div><svg class="colourpic" viewBox="0 0 100 100"><g fill="#fff" stroke="#4b6457" stroke-width="1.6">${COLOURPICS[k]}</g></svg>`;
  body().querySelectorAll('.chalk').forEach(b=>b.onclick=()=>{col=b.dataset.c;body().querySelectorAll('.chalk').forEach(z=>z.classList.remove('on'));b.classList.add('on');FX.tap()});
  const filled=new Set();body().querySelectorAll('[data-r]').forEach((r,i)=>r.addEventListener('click',()=>{r.setAttribute('fill',col);filled.add(i);FX.pop()}));
  RUN.prompt=()=>say(['P_colour'],'Pick a colour, then tap a part of the picture.');RUN.prompt();
  actions([['go',"I'm done",()=>{if(filled.size<3){say(['P_keep_going'],'Colour a few more parts!');return}learnN(n,true);FX.sparkle();say([rnd(PRAISE)],'Beautiful colours!').then(()=>roundDone(true))},ICON.check]])};

/* ======================= DISCOVER: 26 topics about the world ======================= */
const DSC=window.DISCOVER||{sections:[],reg:{},match:{},sort:{},order:{},sounds:{},quiz:{},mcq:{}};DSC.mcq=DSC.mcq||{};
const DSEC={};DSC.sections.forEach(s=>DSEC[s.id]=s);
const DI=k=>DSC.reg[k]||{e:'❓',n:k,f:'',c:''};
const DN=k=>'D_'+k, DF=k=>DI(k).f?['F_'+k]:[];
const ageNow=()=>(S.profile&&S.profile.age)||4;
const GLABEL={learn:'Learn',find:'Find it',odd:'Odd one out',colour:'What colour?',memory:'Memory',sound:'Animal sounds',quiz:'True or false?',sort:'Sorting',match:'Matching',order:'In order',mcq:'Quiz time'};
const GICON={learn:'📖',find:'🔍',odd:'🙃',colour:'🎨',memory:'🃏',sound:'🔊',quiz:'👍',sort:'🧺',match:'🔗',order:'1️⃣',mcq:'❓'};
const inAge=s=>ageNow()>=s.age&&ageNow()<=(s.maxAge||99);
DSC.sections.forEach(s=>{SK['d_'+s.id]={sub:'Discover',name:s.name,levels:[0,1,2],lab:v=>['starter set','more items','all items'][v],unlock:()=>inAge(s),node:()=>dNode(s.id)}});
/* ordered topics (life cycles, planets, science ideas) are taught in sequence; where some items carry the idea and others are examples, teach the ideas */
function learnList(id){const it=DSEC[id].items;const f=it.filter(i=>i.f);return (f.length>=3&&f.length<it.length?f:it).map(i=>i.k)}
/* odd-one-out only borrows plain, picturable things (no festivals, dates, ideas) */
const ODD_SRC=['fruits','vegetables','farm','wild','birds','sea','bugs','vehicles','clothes','home','music'];
const FAMILY={home:'home',clothes:'home',farm:'animal',wild:'animal',birds:'animal',sea:'animal',bugs:'animal',animalsci:'animal',cycles:'animal',fruits:'food',vegetables:'food',food:'food',foodgroups:'food',plants:'food',sky:'space',space:'space',world:'space',weather:'space'};
function dPool(id){const s=DSEC[id];const sz=[6,10,99][Math.min(2,lv('d_'+id))]+(ageNow()>=5?4:0);return s.items.slice(0,Math.max(4,sz)).map(i=>i.k)}
function gLabel(g){const [t,a]=g.split(':');if(t==='sort')return DSC.sort[a].name;if(t==='match')return DSC.match[a].name;if(t==='order')return DSC.order[a].name;return GLABEL[t]}
const GAME_AGE={'order:months':6};const dGames=s=>s.games.filter(g=>S.settings.unlock||ageNow()>=(GAME_AGE[g]||0));
function dNode(id,g){const s=DSEC[id];if(!g){const tried=S.sk['d_'+id]&&S.sk['d_'+id].n;const gs=dGames(s).filter(x=>x!=='learn');g=!tried&&s.games.includes('learn')?'learn':fresh('dg'+id,gs.length?gs:s.games)}
  const [t,arg]=g.split(':');const n={t:'d_'+t,sec:id,arg,skill:'d_'+id,title:s.name+': '+gLabel(g)};
  if(t==='learn')n.rounds=s.learnPairs?DSC.match[s.learnPairs].pairs.length:s.learnOrder?Math.min(10,learnList(id).length):Math.min(8,dPool(id).length);if(t==='memory'||t==='sort')n.rounds=1;if(t==='order')n.rounds=(DSC.order[arg].steps.length>4?3:2);if(t==='quiz')n.rounds=Math.min(8,(DSC.quiz[id]||[]).length);if(t==='mcq')n.rounds=Math.min(8,(DSC.mcq[id]||[]).length);
  return n}
const dCard=(k,big)=>`<span style="font-size:${big?'clamp(70px,20vw,120px)':'clamp(44px,12vw,72px)'};line-height:1">${DI(k).e}</span>`;
const dWithName=k=>`<div style="display:flex;flex-direction:column;align-items:center;gap:4px">${dCard(k)}<b style="font-family:var(--f-display);font-size:15px;color:var(--ink-soft)">${DI(k).n}</b></div>`;
function dOpts(pool,t,n){return shuffle([t,...shuffle(pool.filter(x=>x!==t&&DI(x).e!==DI(t).e)).slice(0,n-1)])}
ACT.d_learn=(n,round)=>{const LP=DSEC[n.sec].learnPairs&&DSC.match[DSEC[n.sec].learnPairs];
  if(LP){if(!n._ord)n._ord=shuffle(LP.pairs.map(p=>[p[0],p[3].split(':')[0]]));const [a,c]=n._ord[round%n._ord.length];
    body().innerHTML=`<div class="learncard" style="flex-direction:row;gap:18px;flex-wrap:wrap;justify-content:center"><div style="display:flex;flex-direction:column;align-items:center">${dCard(a,true)}<div class="word" style="font-size:clamp(26px,7vw,38px)">${DI(a).n}</div></div><div style="font-size:44px;align-self:center;color:var(--peacock)">↔</div><div style="display:flex;flex-direction:column;align-items:center">${dCard(c,true)}<div class="word" style="font-size:clamp(26px,7vw,38px)">${DI(c).n}</div></div></div><div class="card-note">${DI(a).n} and ${DI(c).n.toLowerCase()} are opposites.</div>`;
    RUN.prompt=()=>say([...(round===0?['P_d_learn','SEC_'+n.sec,300]:[]),DN(a),500,DN(c),400,'P_d_opp'],`${DI(a).n} and ${DI(c).n.toLowerCase()} are opposites.`);RUN.prompt();
    actions([['soft','Hear again',()=>RUN.prompt()],['go','Next',()=>{learnN(n,true);roundDone(true)},ICON.next]]);return}
  if(!n._ord)n._ord=DSEC[n.sec].learnOrder?learnList(n.sec):shuffle(dPool(n.sec));const k=n._ord[round%n._ord.length];const sf=(DSEC[n.sec].items.find(i=>i.k===k)||{}).f||'';const it=Object.assign({},DI(k),{f:sf});const DF=k=>sf&&sf===DI(k).f?['F_'+k]:[];
  body().innerHTML=`<div class="learncard">${dCard(k,true)}<div class="word" style="font-size:clamp(28px,7vw,40px)">${it.n}</div>${it.f?`<div class="card-note">${it.f}</div>`:''}</div>`;
  RUN.prompt=()=>say([...(round===0?['P_d_learn','SEC_'+n.sec,300]:[]),DN(k),300,...DF(k),...(DSEC[n.sec].voiceLearn&&DSC.sounds[k]?[300,'SND_'+k]:[])],it.f||it.n);RUN.prompt();anim(body().querySelector('.learncard'),'dance');
  actions([['soft','Hear again',()=>RUN.prompt()],['go','Next',()=>{learnN(n,true);roundDone(true)},ICON.next]])};
ACT.d_find=(n)=>{const pool=dPool(n.sec);const t=deck('df'+n.sec+pool.length,pool);const fc=DSEC[n.sec].findClip;
  pickRound({items:dOpts(pool,t,nopt()).map(k=>({h:dCard(k),v:k,label:DI(k).n})),ans:t,say:[fc||'P_d_find',DN(t)],cap:fc?`Who looks ${DI(t).n.toLowerCase()}?`:`Can you find the ${DI(t).n.toLowerCase()}?`,right:[DN(t),300,...DF(t)],rightCap:DI(t).f||`Yes, the ${DI(t).n.toLowerCase()}!`,wrong:it=>['P_hmm_thats',DN(it.v)]})};
ACT.d_odd=(n)=>{const s=DSEC[n.sec];const pool=dPool(n.sec);const three=shuffle(pool).slice(0,Math.max(2,nopt()-1));
  const others=DSC.sections.filter(x=>x.id!==n.sec&&ODD_SRC.includes(x.id)&&(!FAMILY[n.sec]||FAMILY[x.id]!==FAMILY[n.sec])&&x.age<=Math.max(ageNow(),s.age)&&!['colours','days','routine','cycles','science','opposites','safety','india'].includes(x.id)).flatMap(x=>x.items.map(i=>i.k)).filter(k=>!s.items.some(i=>i.k===k));
  const odd=rnd(others);const items=shuffle([...three,odd]);
  pickRound({top:`<div class="card-note">These are ${s.name.toLowerCase()}. One is not!</div>`,items:items.map(k=>({h:dWithName(k),v:k,label:DI(k).n})),itemCls:'pcard grp',ans:odd,say:['P_d_odd'],cap:'Which one does not belong?',right:[DN(odd),250,rnd(PRAISE)],rightCap:`Yes! The ${DI(odd).n.toLowerCase()} does not belong.`,wrong:it=>[DN(it.v),300,'P_d_odd']})};
const COLS={red:'#e2563f',blue:'#2f6fd0',yellow:'#f6c821',green:'#2f8a5f',orange:'#f08a24',purple:'#8a5cc2',brown:'#8a5a33',white:'#ffffff',black:'#222222',pink:'#ff9ac1'};
ACT.d_colour=(n)=>{const pool=DSEC[n.sec].items.filter(i=>i.c).map(i=>i.k);const t=deck('dc'+n.sec,pool);const c=DI(t).c;const opts=shuffle([c,...shuffle(Object.keys(COLS).filter(x=>x!==c)).slice(0,nopt()-1)]);
  pickRound({top:bigShow(dCard(t,true)),items:opts.map(x=>({h:`<span class="cdot" style="background:${COLS[x]}"></span>`,v:x,label:x})),ans:c,say:['P_d_colour',DN(t)],cap:`What colour is the ${DI(t).n.toLowerCase()}?`,right:[DN(c),250,rnd(PRAISE)],rightCap:`${DI(t).n} is ${c}!`,wrong:it=>[DN(it.v),300,'P_listen_again']})};
ACT.d_memory=(n)=>{const pairs=ageNow()<=3?3:ageNow()===4?4:6;const ks=shuffle(dPool(n.sec)).slice(0,pairs);const cards=shuffle([...ks,...ks]);let open=[],done=0,lock=false,tries=0;
  body().innerHTML=`<div class="memgrid" id="mg" style="grid-template-columns:repeat(${pairs>4?4:pairs===4?4:3},1fr)"></div>`;
  cards.forEach(k=>{const b=document.createElement('button');b.className='mem';b.innerHTML=`<div class="front">${dCard(k)}</div><div class="back">${DSEC[n.sec].icon}</div>`;
    b.onclick=()=>{if(lock||b.classList.contains('open'))return;b.classList.add('open');FX.tap();say([DN(k)],DI(k).n);open.push([b,k]);
      if(open.length===2){lock=true;tries++;const [[b1,k1],[b2,k2]]=open;setTimeout(()=>{if(k1===k2){b1.classList.add('matched');b2.classList.add('matched');FX.chime();done++;
        if(done===pairs){const ok=tries<=pairs+3;learnN(n,ok);say([rnd(PRAISE)],'All pairs found!').then(()=>roundDone(ok))}}else{b1.classList.remove('open');b2.classList.remove('open');FX.boing()}open=[];lock=false},900)}};$('mg').appendChild(b)});
  RUN.prompt=()=>say(['P_d_memory'],'Find the matching pairs!');RUN.prompt()};
ACT.d_sound=(n)=>{const pool=dPool(n.sec).filter(k=>DSC.sounds[k]);const all=DSEC[n.sec].items.map(i=>i.k).filter(k=>DSC.sounds[k]);const t=deck('ds'+n.sec,pool.length>=3?pool:all);
  pickRound({items:dOpts(pool.length>=3?pool:all,t,nopt()).map(k=>({h:dCard(k),v:k,label:DI(k).n})),ans:t,say:['P_d_says',300,'SND_'+t],cap:VOICE['RS_'+t]?'Who makes this sound?':`Who says "${DSC.sounds[t]}"`,right:[DN(t),300,'SND_'+t],rightCap:`The ${DI(t).n.toLowerCase()} says ${DSC.sounds[t]}`,wrong:it=>[DN(it.v),300,'P_listen_again','SND_'+t]})};
ACT.d_quiz=(n,round)=>{const qs=DSC.quiz[n.sec]||[];const q=deck('dq'+n.sec,qs.map(x=>x[0]));const [id,v,text]=qs.find(x=>x[0]===q);
  pickRound({top:`<div class="card-note" style="font-size:clamp(18px,4.6vw,24px)">${text}</div>`,items:[{h:'<span style="font-size:56px">👍</span>',v:1,label:'true'},{h:'<span style="font-size:56px">👎</span>',v:0,label:'not true'}],ans:v,
    say:['Q_'+id,...(round===0?[300,'P_d_quiz']:[])],cap:text,right:[v?'P_d_true':'P_d_false'],rightCap:v?"Yes! That's true!":"Right! That's not true!",wrong:()=>['P_d_wrong_t','Q_'+id]})};
ACT.d_sort=(n)=>{const sp=DSC.sort[n.arg];const per=ageNow()<=3?2:3;const items=shuffle(sp.bins.flatMap(b=>shuffle(b.items).slice(0,sp.bins.length>2?2:per).map(k=>[k,b.k])));let k=0,wrong=false,tried=false;
  body().innerHTML=`<div class="learncard" id="cur" style="padding:6px 20px"></div><div class="baskets">${sp.bins.map(b=>`<button class="basket" data-b="${b.k}"><span>${b.e}</span><b style="font-size:18px;font-family:var(--f-display)">${b.n}</b><i></i></button>`).join('')}</div>`;
  const show=()=>{if(!$('cur'))return;tried=false;$('cur').innerHTML=dWithName(items[k][0]);say([DN(items[k][0])],DI(items[k][0]).n)};
  RUN.prompt=()=>say(['SQ_'+n.arg,300,'P_d_sort'],sp.name+' Put each one in the right basket.').then(()=>{if(alive('d_sort')&&k<items.length)show()});RUN.prompt();
  body().querySelectorAll('.basket').forEach(bk=>bk.onclick=()=>{if(k>=items.length)return;const [it,b]=items[k];const ok=bk.dataset.b===b;if(!tried){tried=true;learnN(n,ok)}
    if(ok){FX.chime();bk.querySelector('i').textContent+=DI(it).e;k++;if(k>=items.length){burst(bk,14);say([rnd(PRAISE)],'All sorted!').then(()=>roundDone(!wrong))}else setTimeout(show,300)}
    else{wrong=true;FX.boing();anim(bk,'wiggle',500);say([DN(it),300,'P_listen_again'],'Try the other basket!')}})};
ACT.d_match=(n)=>{const m=DSC.match[n.arg];const pairs=m.pairs.map(p=>[p[0],p[3].split(':')[0]]);const [l,r]=deck('dm'+n.arg,pairs.map(p=>p.join('|'))).split('|');
  const rights=m.pool?DSEC[m.pool].items.map(i=>i.k):[...new Set(pairs.map(p=>p[1]))];const av=(m.avoid&&m.avoid[l])||[];const opts=shuffle([r,...shuffle(rights.filter(x=>x!==r&&x!==l&&!av.includes(x))).slice(0,nopt()-1)]);
  pickRound({top:bigShow(dWithName(l)),items:opts.map(k=>({h:dWithName(k),v:k,label:DI(k).n})),itemCls:'pcard grp',ans:r,say:['MQ_'+n.arg,300,DN(l)],cap:`${m.q} ${DI(l).n}`,right:[DN(l),300,DN(r),250,rnd(PRAISE)],rightCap:`${DI(l).n}: ${DI(r).n}!`,wrong:it=>[DN(it.v),300,'P_listen_again']})};
ACT.d_order=(n)=>{const o=DSC.order[n.arg];let steps=o.steps;const win=ageNow()<=4?4:5;if(steps.length>win){const s0=ri(0,steps.length-win);steps=steps.slice(s0,s0+win)}
  const isText=['days','months'].includes(n.arg);let pos=0,wrong=false;
  const tile=k=>isText?`<b style="font-family:var(--f-display);font-size:clamp(16px,4.2vw,22px)">${DI(k).n}</b>`:dWithName(k);
  body().innerHTML=`<div class="orderrow" id="or">${steps.map(()=>'<span class="oslot"></span>').join('<i>→</i>')}</div><div class="choices" id="oc"></div>`;
  shuffle(steps).forEach(k=>{const b=document.createElement('button');b.className='pcard grp';b.innerHTML=tile(k);b.onclick=()=>{if(b.disabled)return;
    if(k===steps[pos]){b.disabled=true;b.style.visibility='hidden';$('or').querySelectorAll('.oslot')[pos].innerHTML=tile(k);pos++;FX.tick(pos);say([DN(k)],DI(k).n);
      if(pos===steps.length){learnN(n,!wrong);FX.chime();burst($('or'),16);say([400,...steps.flatMap(x=>[DN(x),150]),rnd(PRAISE)],steps.map(x=>DI(x).n).join(' → ')).then(()=>roundDone(!wrong))}}
    else{wrong=true;FX.boing();anim(b,'wiggle',500);say([pos===0?'P_d_order':'P_d_next'],pos===0?'What comes first?':'What comes next?')}};$('oc').appendChild(b)});
  RUN.prompt=()=>say(['OQ_'+n.arg,300,'P_d_order'],o.name+'. What comes first?');RUN.prompt()};
ACT.d_mcq=(n)=>{const qs=DSC.mcq[n.sec]||[];const qid=deck('dmc'+n.sec,qs.map(x=>x[0]));const [id,a,ds,text]=qs.find(x=>x[0]===qid);const opts=shuffle([a,...ds]);
  pickRound({top:`<div class="card-note" style="font-size:clamp(18px,4.6vw,24px)">${text}</div>`,items:opts.map(k=>({h:dWithName(k),v:k,label:DI(k).n})),itemCls:'pcard grp',ans:a,say:['MC_'+id],cap:text,right:[DN(a),300,...DF(a),250,rnd(PRAISE)],rightCap:DI(a).f||`Yes! ${DI(a).n}!`,wrong:it=>[DN(it.v),300,'P_listen_again','MC_'+id]})};
function openDiscover(secId){const b=$('corner-body');b.innerHTML='';
  if(!secId){$('corner-title').textContent='Discover';b.appendChild(modeTabs('discover',()=>openDiscover()));const dm=modeOf('discover');
    const sur=document.createElement('button');sur.className='go-btn';sur.style.cssText='width:100%;max-width:640px;animation:none';const open=DSC.sections.filter(s=>tierOf('discover',s.id)===dm);
    sur.innerHTML=`🎲 Surprise me <span style="font-size:15px;font-weight:600">(${open.length} topics open)</span>`;sur.onclick=()=>{unlockAudio();FX.sparkle();const s=fresh('dsur',open.map(x=>x.id));say(['P_surprise'],null);setTimeout(()=>startRun(dNode(s),{corner:'discover',sec:s}),700)};b.appendChild(sur);
    const g=document.createElement('div');g.className='tiles';b.appendChild(g);
    open.forEach(s=>{const lk=false;const t=document.createElement('button');t.className='tile';if(lk)t.style.opacity='.42';
      t.innerHTML=`<div class="ico">${s.icon}</div><span>${s.name}</span>`;
      t.onclick=()=>{unlockAudio();if(lk){FX.boing();anim(t,'wiggle',500);return}FX.tap();say(['SEC_'+s.id],null);openDiscover(s.id)};g.appendChild(t)});
    const p=document.createElement('p');p.className='card-note';p.textContent=`${open.length} ${MODE_NAMES[dm]} topics. Switch Easy, Medium or Hard with the tabs at the top.`;b.appendChild(p);
    say(['P_d_pick'],null);return}
  const s=DSEC[secId];$('corner-title').textContent=s.name;
  const back=document.createElement('button');back.className='pill-btn small';back.textContent=NEWUI?'← My world':'← All topics';back.onclick=()=>{FX.tap();NEWUI?openShelf('world'):openDiscover()};b.appendChild(back);
  const hero=document.createElement('div');hero.className='learncard';hero.style.cssText='flex-direction:row;gap:10px;flex-wrap:wrap;justify-content:center;max-width:640px';
  hero.innerHTML=s.items.slice(0,12).map(i=>`<span style="font-size:34px">${i.e}</span>`).join('');b.appendChild(hero);
  const g=document.createElement('div');g.className='tiles';b.appendChild(g);
  if(NEWUI&&CARD_DECKS.includes(secId)){const t=document.createElement('button');t.className='tile';t.innerHTML='<div class="ico">🃏</div><span>Picture cards</span>';t.onclick=()=>{unlockAudio();FX.tap();startRun(cardNode(secId,'cards'),{corner:'discover',sec:secId})};g.appendChild(t)}
  dGames(s).forEach(gm=>{const t0=gm.split(':')[0];const t=document.createElement('button');t.className='tile';t.innerHTML=`<div class="ico">${GICON[t0]}</div><span>${gLabel(gm)}</span>`;
    t.onclick=()=>{unlockAudio();FX.tap();startRun(dNode(secId,gm),{corner:'discover',sec:secId})};g.appendChild(t)});
}

/* ======================= READING (ages 6 to 7): words, not single letters ======================= */
/* Reading games never say the target word before the child answers: the point is to read it. */
const RB={cat:'🐈',dog:'🐕',pig:'🐖',hen:'🐔',cow:'🐄',fox:'🦊',bat:'🦇',rat:'🐀',ant:'🐜',bee:'🐝',owl:'🦉',sun:'☀️',bus:'🚌',car:'🚗',van:'🚐',cup:'☕',pen:'🖊️',bed:'🛏️',hat:'👒',cap:'🧢',
 box:'📦',bag:'👜',map:'🗺️',egg:'🥚',nut:'🥜',leg:'🦵',ear:'👂',eye:'👁️',key:'🔑',ten:'🔟',web:'🕸️',log:'🪵',hut:'🛖',bug:'🐞',
 moon:'🌙',star:'⭐',tree:'🌳',leaf:'🍃',rose:'🌹',ship:'🚢',boat:'⛵',kite:'🪁',ball:'⚽',doll:'🪆',drum:'🥁',bell:'🔔',book:'📕',milk:'🥛',cake:'🎂',corn:'🌽',pear:'🍐',frog:'🐸',duck:'🦆',goat:'🐐',
 lion:'🦁',bear:'🐻',deer:'🦌',crab:'🦀',fish:'🐟',hand:'✋',foot:'🦶',nose:'👃',sock:'🧦',shoe:'👟',ring:'💍',lock:'🔒',fork:'🍴',bird:'🐦',king:'🤴',rain:'🌧️',lips:'👄',gift:'🎁',coat:'🧥',
 apple:'🍎',mango:'🥭',snake:'🐍',tiger:'🐅',horse:'🐎',house:'🏠',train:'🚆',clock:'🕒',chair:'🪑',sheep:'🐑',teeth:'🦷',plant:'🪴',bread:'🍞',cloud:'☁️',zebra:'🦓',lemon:'🍋',camel:'🐫',onion:'🧅',
 robot:'🤖',shirt:'👕',brush:'🪥',chick:'🐥',shell:'🐚',juice:'🧃',spoon:'🥄',panda:'🐼',truck:'🚚',whale:'🐳',mouse:'🐭'};
const RWORDS=Object.keys(RB);
const READ_G={readpic:['Read and match','📖'],picword:['Picture to word','🖼️'],jumble:['Jumbled words','🔀'],misspos:['Fill the gap','c_t'],spell:['Listen and spell','👂'],
 sight:['Sight words','👀'],sentence:['Finish the sentence','✍️'],crossword:['Mini crossword','✚'],wordsearch:['Word search','🔎'],rhymeread:['Rhyming words','🎵'],digraph:['sh, ch, th','sh']};
const RHYME_T=[['cat','hat','bat','rat','mat'],['dog','log','frog','fog'],['sun','bun','run','fun'],['hen','ten','pen','men'],['pig','big','wig','dig'],['top','mop','hop','shop'],
 ['cake','lake','make','snake'],['ring','king','sing','wing'],['bed','red','fed'],['bug','jug','mug','hug'],['bee','tree','see','three'],['star','car','jar','far'],['boat','goat','coat'],
 ['moon','spoon','soon'],['bell','shell','well','tell'],['ball','tall','wall','call']];
const DIGRAPH={sh:['ship','shoe','fish','shell','sheep','shirt','brush'],ch:['chick','cheese','chair','cherry','chips','watch'],th:['thumb','three','teeth','bath']};
const DG_E={ship:'🚢',shoe:'👟',fish:'🐟',shell:'🐚',sheep:'🐑',shirt:'👕',brush:'🪥',chick:'🐥',cheese:'🧀',chair:'🪑',cherry:'🍒',chips:'🍟',watch:'⌚',thumb:'👍',three:'3️⃣',teeth:'🦷',bath:'🛁'};
const SIGHT=['the','and','is','it','in','to','you','my','we','can','see','he','she','go','no','look','come','here','play','said','are','for','like','this','what','was','they','have','all','big','little','up','down','on','at'];
const SENT=[['The ___ can fly.','bird',['cow','pig']],['A fish can ___.','swim',['read','sing']],['I see with my ___.','eyes',['ears','feet']],['I hear with my ___.','ears',['eyes','hands']],
 ['The sun is ___.','hot',['cold','wet']],['Ice is very ___.','cold',['hot','red']],['A cow gives us ___.','milk',['eggs','rice']],['A hen lays ___.','eggs',['milk','nuts']],
 ['We sleep on a ___.','bed',['cup','bus']],['I wear a ___ on my head.','hat',['sock','shoe']],['Grass is ___.','green',['red','blue']],['I drink water from a ___.','cup',['bed','hat']],
 ['At night we see the ___.','moon',['sun','rain']],['A dog can ___.','run',['fly','read']],['Five and five make ___.','ten',['six','two']],['We read a ___.','book',['cake','shoe']]];
const RTRY=['P_r_try','P_close','P_together'];
const ageR=()=>(S.profile&&S.profile.age)||4;
const readUnlock=()=>ageR()>=6||(ageR()>=5&&S.intro.length>=10&&letterSkill()>=.75);
Object.keys(READ_G).forEach(g=>LGAMES[g]=readUnlock);
const wordH=(w,sz)=>`<span style="font-family:var(--f-letter);font-weight:700;font-size:${sz||'clamp(30px,8vw,46px)'};color:var(--peacock);line-height:1.1;letter-spacing:.04em">${w}</span>`;
/* word pool sized by the reading level: 3 letters, then 3 to 4, then 4 to 5 */
function rPool(){const mx=param('read');const p=RWORDS.filter(w=>w.length<=mx&&w.length>=Math.max(3,mx-1));return p.length>=6?p:RWORDS.filter(w=>w.length<=mx)}
const lookAlike=(t,pool,n)=>shuffle(pool.filter(w=>w!==t&&RB[w]!==RB[t])).sort((a,b)=>(Math.abs(a.length-t.length)-(a[0]===t[0]?1:0)-(a.slice(-1)===t.slice(-1)?.5:0))-(Math.abs(b.length-t.length)-(b[0]===t[0]?1:0)-(b.slice(-1)===t.slice(-1)?.5:0))).slice(0,n);
ACT.readpic=()=>{const t=deck('rp'+param('read'),rPool());const opts=shuffle([t,...lookAlike(t,RWORDS,nopt()-1)]);
  pickRound({top:bigShow(wordH(t,'clamp(44px,12vw,72px)')),items:opts.map(w=>({h:picH(RB[w]),v:w,label:w})),ans:t,say:['P_r_readpic'],cap:'Read the word. Which picture is it?',
    right:[W(t),250,rnd(PRAISE)],rightCap:`Yes! ${t}!`,wrong:it=>[W(it.v),300,'P_r_try']})};
ACT.picword=()=>{const t=deck('pw'+param('read'),rPool());const opts=shuffle([t,...lookAlike(t,rPool(),nopt()-1)]);
  pickRound({top:bigShow(picH(RB[t])),items:opts.map(w=>({h:wordH(w),v:w,label:w})),ans:t,say:['P_r_picword'],cap:'Which word goes with the picture?',
    right:[W(t),250,rnd(PRAISE)],rightCap:`Yes! ${t}!`,wrong:()=>[rnd(RTRY)]})};
ACT.misspos=()=>{const t=deck('mp'+param('read'),rPool());const h=ri(0,t.length-1),ans=t[h];const opts=shuffle([ans,...others(ALPHA,ans,nopt()-1,x=>t.includes(x))]);
  pickRound({top:`<div class="pic">${RB[t]}</div><div class="word">${[...t].map((c,i)=>i===h?'<b>_</b>':c).join('')}</div>`,items:opts.map(v=>({h:letH(v),v})),ans,say:['P_missing_letter'],cap:'Which letter is missing?',
    right:[W(t),250,rnd(PRAISE)],rightCap:`${t}!`,wrong:()=>[rnd(RTRY)]})};
/* tile speller shared by jumbled words and listen-and-spell */
function spellRound(w,o){const extra=o.extra?others(ALPHA.filter(c=>!w.includes(c)),'',o.extra):[];let tiles=shuffle([...w,...extra]);if(!o.extra&&tiles.join('')===w)tiles=[...w].reverse();let pos=0,wrong=false;
  body().innerHTML=`<div class="pic" id="spic">${o.pic?RB[w]||DG_E[w]||'':'❓'}</div><div class="slots">${[...w].map(()=>'<span class="slot"></span>').join('')}</div><div class="tiles2" id="tl"></div>`;
  tiles.forEach(c=>{const b=document.createElement('button');b.className='ltile';b.textContent=c;
    b.onclick=()=>{if(b.disabled||pos>=w.length)return;if(c===w[pos]){b.disabled=true;b.classList.add('used');body().querySelectorAll('.slot')[pos].textContent=c;pos++;FX.tick(pos);
      if(pos===w.length){learnN(RUN.node,!wrong);FX.chime();if(!o.pic&&$('spic'))$('spic').textContent=RB[w]||'⭐';burst(body().querySelector('.slots'),16);say([400,W(w),250,rnd(PRAISE)],w+'!').then(()=>roundDone(!wrong))}}
      else{wrong=true;FX.boing();anim(b,'wiggle',500);say(o.hint(),o.hintCap)}};$('tl').appendChild(b)});
  RUN.prompt=()=>say(o.say,o.cap);RUN.prompt()}
ACT.jumble=()=>{const w=deck('jb'+param('read'),rPool());spellRound(w,{pic:true,extra:0,say:['P_r_jumble'],cap:'The letters are jumbled! Put them in order.',hint:()=>[rnd(RTRY)],hintCap:'Look at the picture and try again!'})};
ACT.spell=()=>{const w=deck('sp'+param('read'),rPool());spellRound(w,{pic:false,extra:2,say:['P_r_spell',300,W(w)],cap:'Listen and spell the word.',hint:()=>['P_listen_again',W(w)],hintCap:'Listen again'})};
ACT.sight=()=>{const t=deck('sw',SIGHT);const sim=SIGHT.filter(x=>x!==t).sort((a,b)=>(Math.abs(a.length-t.length)-(a[0]===t[0]?1:0))-(Math.abs(b.length-t.length)-(b[0]===t[0]?1:0)));
  const opts=shuffle([t,...shuffle(sim.slice(0,6)).slice(0,nopt()-1)]);
  pickRound({items:opts.map(w=>({h:wordH(w),v:w,label:w})),ans:t,say:['P_r_sight',300,'SW_'+t],cap:'Find the word you hear.',right:['SW_'+t,250,rnd(PRAISE)],rightCap:`Yes! "${t}"`,wrong:it=>['SW_'+it.v,300,'P_listen_again','SW_'+t]})};
ACT.sentence=()=>{const i=deck('sen',SENT.map((_,k)=>k));const [s,a,ds]=SENT[i];const opts=shuffle([a,...ds]);
  pickRound({top:`<div class="card-note" style="font-size:clamp(22px,5.6vw,32px);font-weight:700;color:var(--ink)">${s.replace('___','<u style="color:var(--peacock)">&nbsp;?&nbsp;&nbsp;</u>')}</div>`,items:opts.map(w=>({h:wordH(w),v:w,label:w})),ans:a,
    say:['P_r_sentence'],cap:'Read the sentence. Which word fits?',right:['SEN_'+i,250,rnd(PRAISE)],rightCap:s.replace('___',a),wrong:()=>[rnd(RTRY)]})};
ACT.rhymeread=()=>{const fam=fresh('rr',RHYME_T);const [t,a]=shuffle(fam).slice(0,2);const pool=RHYME_T.filter(f=>f!==fam).flat().filter(w=>w.slice(-2)!==t.slice(-2));
  const opts=shuffle([a,...shuffle(pool.filter(w=>w[0]===t[0]||w.length===t.length)).concat(shuffle(pool)).filter((x,k,arr)=>arr.indexOf(x)===k).slice(0,nopt()-1)]);
  pickRound({top:bigShow(wordH(t,'clamp(44px,12vw,72px)')),items:opts.map(w=>({h:wordH(w),v:w,label:w})),ans:a,say:['P_r_rhyme'],cap:'Which word rhymes with this one?',
    right:[W(t),W(a),250,'P_rhymes_yes'],rightCap:`${t}, ${a}. They rhyme!`,wrong:it=>[W(it.v),W(t),300,'P_r_try']})};
ACT.digraph=()=>{const all=Object.entries(DIGRAPH).flatMap(([d,ws])=>ws.map(w=>[w,d]));const [w,d]=fresh('dg',all);
  pickRound({top:`<div class="pic">${DG_E[w]}</div><div class="word">${w.replace(d,'<b>__</b>')}</div>`,items:Object.keys(DIGRAPH).map(x=>({h:wordH(x,'clamp(40px,11vw,60px)'),v:x,label:x})),ans:d,
    say:['P_r_digraph',300,W(w)],cap:'Which two letters make the sound?',right:[W(w),250,rnd(PRAISE)],rightCap:`${w}: ${d}!`,wrong:()=>['P_listen_again',W(w)]})};
/* mini crossword: 2 words (3 for stronger readers) crossing on a shared letter, picture clues */
function makeCross(){const pool=shuffle(rPool().length>=8?rPool():RWORDS.filter(w=>w.length<=5));const want=lv('read')>=1?3:2;
  for(const A of pool){if(A.length<3)continue;const out=[{w:A,r:0,c:0,d:'a'}];const used=new Set();
    for(const B of pool){if(out.length>=want)break;if(out.some(o=>o.w===B))continue;
      for(let i=0;i<A.length&&out.length<want;i++){if(used.has(i)||used.has(i-1)||used.has(i+1))continue;const j=B.indexOf(A[i]);if(j<0)continue;out.push({w:B,r:-j,c:i,d:'d'});used.add(i);break}}
    if(out.length>=want){const r0=Math.min(...out.map(o=>o.r)),rows=Math.max(...out.map(o=>o.r+(o.d==='d'?o.w.length:1)))-r0;out.forEach(o=>o.r-=r0);return {words:out,rows,cols:A.length}}}
  return null}
const cellsOf=o=>[...o.w].map((ch,k)=>[o.d==='a'?o.r:o.r+k,o.d==='a'?o.c+k:o.c,ch]);
ACT.crossword=()=>{const X=makeCross();if(!X){ACT.jumble();return}let cur=0,pos=0,wrong=false;const filled={};
  body().innerHTML=`<div class="xclues" id="xc"></div><div class="xgrid" id="xg" style="grid-template-columns:repeat(${X.cols},1fr)"></div><div class="tiles2" id="tl"></div>`;
  const grid={};X.words.forEach((o,wi)=>cellsOf(o).forEach(([r,c,ch])=>{grid[r+','+c]=ch}));
  for(let r=0;r<X.rows;r++)for(let c=0;c<X.cols;c++){const e=document.createElement('span');e.className=grid[r+','+c]?'xc':'xc off';e.id='x'+r+'_'+c;$('xg').appendChild(e)}
  X.words.forEach((o,wi)=>{const b=document.createElement('button');b.className='xclue';b.id='xq'+wi;b.innerHTML=`<span>${RB[o.w]}</span><small>${o.d==='a'?'across':'down'}</small>`;b.onclick=()=>{if(b.classList.contains('done'))return;FX.tap();selWord(wi)};$('xc').appendChild(b)});
  const skipFilled=()=>{const cs=cellsOf(X.words[cur]);while(pos<cs.length&&filled[cs[pos][0]+','+cs[pos][1]])pos++};
  function selWord(wi){cur=wi;pos=0;skipFilled();body().querySelectorAll('.xc').forEach(e=>e.classList.remove('on'));cellsOf(X.words[cur]).forEach(([r,c])=>$('x'+r+'_'+c).classList.add('on'));
    body().querySelectorAll('.xclue').forEach((e,k)=>e.classList.toggle('sel',k===cur));const w=X.words[cur].w;const need=cellsOf(X.words[cur]).filter(([r,c])=>!filled[r+','+c]).map(x=>x[2]);
    $('tl').innerHTML='';shuffle([...need,...others(ALPHA.filter(c=>!w.includes(c)),'',2)]).forEach(ch=>{const t=document.createElement('button');t.className='ltile';t.textContent=ch;t.onclick=()=>tap(t,ch);$('tl').appendChild(t)});
    say([W(w)],null)}
  function tap(t,ch){const cs=cellsOf(X.words[cur]);if(t.disabled||pos>=cs.length)return;const [r,c,want]=cs[pos];
    if(ch===want){t.disabled=true;t.classList.add('used');filled[r+','+c]=1;$('x'+r+'_'+c).textContent=ch;pos++;FX.tick(pos);skipFilled();
      if(pos>=cs.length){$('xq'+cur).classList.add('done');FX.chime();const nx=X.words.findIndex((o,k)=>!$('xq'+k).classList.contains('done'));
        if(nx<0){learnN(RUN.node,!wrong);burst($('xg'),18);say([rnd(PRAISE)],'Crossword done!').then(()=>roundDone(!wrong))}else say([W(X.words[cur].w),300,'P_r_next'],'Now the next word!').then(()=>{if(alive('crossword'))selWord(nx)})}}
    else{wrong=true;FX.boing();anim(t,'wiggle',500)}}
  RUN.prompt=()=>say(['P_r_cross'],'Fill the crossword. Each picture is a word.').then(()=>{if(alive('crossword')&&pos===0)selWord(cur)});RUN.prompt()};
/* word search: find 3 hidden words, across or down */
ACT.wordsearch=()=>{const N=5;let words,G;
  for(let tries=0;tries<60;tries++){G=Array.from({length:N},()=>Array(N).fill(''));words=[];const cand=shuffle(rPool().filter(w=>w.length<=N));
    for(const w of cand){if(words.length>=3)break;for(let k=0;k<25;k++){const d=Math.random()<.5?'a':'d';const r=ri(0,d==='d'?N-w.length:N-1),c=ri(0,d==='a'?N-w.length:N-1);
      const cs=[...w].map((ch,i)=>[d==='a'?r:r+i,d==='a'?c+i:c,ch]);if(cs.every(([y,x])=>!G[y][x])){cs.forEach(([y,x,ch])=>G[y][x]=ch);words.push({w,cs});break}}}
    if(words.length>=3)break}
  for(let y=0;y<N;y++)for(let x=0;x<N;x++)if(!G[y][x])G[y][x]=rnd('abcdefghiklmnoprstuw'.split(''));
  let sel=[],found=0,wrong=false;
  body().innerHTML=`<div class="xclues">${words.map((o,k)=>`<div class="xclue" id="wq${k}"><span>${RB[o.w]}</span><small>${o.w}</small></div>`).join('')}</div><div class="huntgrid" id="hg" style="grid-template-columns:repeat(${N},1fr)"></div>`;
  const key=(y,x)=>y+','+x;
  for(let y=0;y<N;y++)for(let x=0;x<N;x++){const b=document.createElement('button');b.textContent=G[y][x];b.dataset.k=key(y,x);
    b.onclick=()=>{if(b.classList.contains('got'))return;if(b.classList.contains('pick')){b.classList.remove('pick');sel=sel.filter(s=>s!==b.dataset.k);return}
      sel.push(b.dataset.k);b.classList.add('pick');FX.tap();
      const fits=words.filter(o=>!o.done&&sel.every(s=>o.cs.some(([yy,xx])=>key(yy,xx)===s)));
      if(!fits.length){wrong=true;FX.boing();setTimeout(()=>{body().querySelectorAll('.pick').forEach(e=>e.classList.remove('pick'));sel=[]},350);return}
      const hit=fits.find(o=>o.cs.length===sel.length);
      if(hit){hit.done=true;found++;body().querySelectorAll('.pick').forEach(e=>{e.classList.remove('pick');e.classList.add('got')});sel=[];const qi=words.indexOf(hit);$('wq'+qi).classList.add('done');FX.chime();burst($('wq'+qi),10);
        if(found===words.length){learnN(RUN.node,!wrong);say([W(hit.w),300,rnd(PRAISE)],'All words found!').then(()=>roundDone(!wrong))}else say([W(hit.w),250,'P_r_found'],`${hit.w}! Find the next one.`)}};
    $('hg').appendChild(b)}
  RUN.prompt=()=>say(['P_r_search'],'Find the hidden words. Tap each letter.');RUN.prompt()};

/* ======================= MORE WRITING ======================= */
/* letter families: letters that start with the same movement are practised together (common handwriting-teaching groups) */
const FAMS={curly:{name:'Curly caterpillar letters',ls:'cadgoqesf',clip:'P_fam_curly'},ladder:{name:'Long ladder letters',ls:'lituyj',clip:'P_fam_ladder'},
 robot:{name:'One-armed robot letters',ls:'rnmhbkp',clip:'P_fam_robot'},zigzag:{name:'Zigzag letters',ls:'zvwx',clip:'P_fam_zigzag'}};
ACT.wfamily=(n,round)=>{if(!n.fam)n.fam=fresh('wfam',Object.keys(FAMS));const F=FAMS[n.fam];if(!n.seq){const rest=shuffle([...F.ls.slice(1)]);n.seq=[F.ls[0],...rest].slice(0,4)}
  const l=n.seq[round%n.seq.length];const row=[...F.ls].map(c=>`<b style="font-family:var(--f-letter);font-size:clamp(26px,7vw,38px);padding:0 6px;border-radius:10px;${c===l?'background:var(--mango);color:#3b2400':'color:var(--ink-soft)'}">${c}</b>`).join('');
  writeGlyph(LS[l],{w:100,mode:round===0?'full':'faint',header:`<div class="card-note" style="margin-bottom:2px"><b>${F.name}</b></div><div style="display:flex;flex-wrap:wrap;justify-content:center">${row}</div>`,
    intro:round===0?[F.clip,300,L_(l)]:['P_keep_going',L_(l)],cap:`${F.name}: write ${l}`,lines:true,done:ok=>{learnN(n,ok);roundDone(ok)}})};
/* picture to first letter: the picture is the only clue (tap to hear its name) */
/* under 6: only words starting with letters the child has already met */
function firstPool(){if(ageR()>=6)return RWORDS.filter(w=>LS[w[0]]).map(w=>[w,RB[w]]);const met=S.intro.length?S.intro:['s','a','t'];return met.flatMap(l=>WORDS[l]||[]).filter(([w])=>LS[w[0]])}
ACT.wfirst=(n)=>{const fp=firstPool();const [w,e]=deck('wf'+(ageR()>=6?6:4)+fp.length,fp);const l=w[0];
  writeGlyph(LS[l],{w:100,mode:ageR()<=4?'faint':'own',header:`<button class="cue" id="wfpic" style="font-size:clamp(54px,15vw,84px);background:none;border:0">${e}</button>`,
    intro:['P_wfirst',300,W(w)],cap:`What is this? Write the first letter of its name.`,lines:true,done:ok=>{learnN(n,ok);say([W(w),250,L_(l)],`${w} starts with ${l}`).then(()=>roundDone(ok))}});
  const p=$('wfpic');if(p)p.onclick=()=>say([W(w)],w)};
/* copy a word (5+) */
const glyphOf=c=>c===c.toUpperCase()&&CS[c]?CS[c]:LS[c];
function wordGlyph(w){return joinGlyphs([...w].map(glyphOf),.6,56)}
ACT.wcopyword=(n,round)=>{const pool=ageR()>=6?RWORDS.filter(w=>w.length<=(lv('read')>=1?5:4)):Object.keys(CVCE);const w=deck('cw'+pool.length,pool);
  writeGlyph(wordGlyph(w),{w:56*w.length+20,mode:round===0&&ageR()<=5?'faint':'own',header:`<div style="display:flex;align-items:center;gap:12px;justify-content:center"><span style="font-size:clamp(40px,11vw,60px)">${RB[w]||CVCE[w]||''}</span>${wordH(w,'clamp(36px,10vw,54px)')}</div>`,
    intro:['P_copy_word',300,W(w)],cap:`Copy the word "${w}"`,lines:true,done:ok=>{learnN(n,ok);say([W(w)],w+'!').then(()=>roundDone(ok))}})};
/* copy a sentence (6+), one word per round, the whole sentence stays on screen */
const CSENT=['I can run','I see a cat','The sun is hot','We can play','My dog can jump','I like mango','A fish can swim','The cow eats grass','I can read a book','The bus is red'];
ACT.wsentence=(n,round)=>{if(n.si==null){n.si=deck('csn',CSENT.map((_,i)=>i));n.rounds=CSENT[n.si].split(' ').length;RUN.rounds=n.rounds;setRounds()}
  const ws=CSENT[n.si].split(' '),w=ws[round];const top=ws.map((x,i)=>`<span style="padding:0 4px;border-radius:8px;${i===round?'background:var(--mango);color:#3b2400':i<round?'color:var(--leaf)':'color:var(--ink-soft)'}">${x}</span>`).join(' ')+'.';
  writeGlyph(wordGlyph(w),{w:Math.max(100,56*w.length+20),mode:'own',header:`<div style="font-family:var(--f-letter);font-weight:700;font-size:clamp(24px,6.4vw,34px);text-align:center">${top}</div>`,
    intro:round===0?['P_copy_sent',300,'CSN_'+n.si]:['P_r_next'],cap:`Copy the word "${w}"`,lines:true,done:ok=>{learnN(n,ok);if(round===ws.length-1)say([400,'CSN_'+n.si,250,rnd(PRAISE)],CSENT[n.si]+'.').then(()=>roundDone(ok));else roundDone(ok)}})};
/* fun surfaces: rangoli powder, sand tray, chalkboard */
const SURF={rangoli:{name:'Rangoli writing',clip:'P_surf_rangoli'},sand:{name:'Sand tray writing',clip:'P_surf_sand'},chalk:{name:'Chalkboard writing',clip:'P_surf_chalk'}};
ACT.wsurface=(n,round)=>{const sf=Object.keys(SURF)[round%3];const big=ageR()>=6;const ch=big?fresh('wsw',RWORDS.filter(w=>w.length===3)):fresh('wsl',S.intro.length?S.intro:['a','s','t','c']);
  writeGlyph(big?wordGlyph(ch):LS[ch],{w:big?56*ch.length+20:100,mode:ageR()<=4?'full':'faint',surface:sf,header:`<div class="card-note"><b>${SURF[sf].name}</b></div>`,intro:[SURF[sf].clip,300,big?W(ch):L_(ch)],cap:`${SURF[sf].name}: write ${ch}`,lines:false,done:ok=>{learnN(n,ok);roundDone(ok)}})};

/* ======================= MORE MATHS ======================= */
/* where does the number go on the number line? */
ACT.nlplace=(n)=>{const M=n.max,step=M>20?10:1;const marks=[];for(let v=0;v<=M;v+=step)marks.push(v);const lab=v=>v===0||v===M||(M<=10?v%5===0:M<=20?v%5===0:v%50===0);
  const t=fresh('nl'+M,marks.filter(v=>!lab(v)));let wrong=false;const L=once(ok=>learnN(n,ok));
  body().innerHTML=`<div class="showcard">${numH(t)}</div><div class="nline" id="nl"><div class="nl-bar"></div></div>`;
  marks.forEach((v,i)=>{const b=document.createElement('button');b.className='nl-tick';b.style.left=(6+i/(marks.length-1)*88)+'%';b.innerHTML=`<i></i><span>${lab(v)?v:''}</span>`;b.setAttribute('aria-label','spot '+i);
    b.onclick=()=>{if(b.disabled)return;const ok=v===t;L(ok);if(ok){b.classList.add('right');b.querySelector('span').textContent=v;FX.chime();burst(b,12);say([N(t),250,rnd(PRAISE)],`${t} goes here!`).then(()=>roundDone(!wrong))}
      else{wrong=true;FX.boing();anim(b,'wiggle',500);b.querySelector('span').textContent=v;b.classList.add('miss');say([N(v),300,'P_try_again_nl'],`That spot is ${v}. Try again!`)}};$('nl').appendChild(b)});
  RUN.prompt=()=>say(['P_nl',300,N(t)],`Where does ${t} go on the number line?`);RUN.prompt()};
/* even or odd: with pictures the pairs show the answer; at the higher level only the number */
const eoSz=v=>v<=6?'s2':v<=12?'s3':'s4';
ACT.evenodd=(n)=>{const max=n.max;const v=deck('eo'+max,range(2,max));const even=v%2===0;const abstract=lv('evenodd')>=1&&max>20;const th=rnd(COUNT_THINGS);
  const pairs=abstract?'':`<div class="pairs">${Array.from({length:Math.ceil(v/2)},(_,i)=>`<div class="pr">${objHTML(th.k,i*2,0,eoSz(v))}${i*2+1<v?objHTML(th.k,i*2+1,0,eoSz(v)):'<span class="obj lone '+eoSz(v)+'">❔</span>'}</div>`).join('')}</div>`;
  pickRound({top:(abstract?bigShow(numH(v)):`<div class="card-note">${v} ${th.label}</div>`)+pairs,items:[{h:'<b style="font-size:26px;font-family:var(--f-display)">Even</b>',v:1,label:'even'},{h:'<b style="font-size:26px;font-family:var(--f-display)">Odd</b>',v:0,label:'odd'}],
    ans:even?1:0,say:[abstract?'P_eo_num':'P_eo',300,N(v)],cap:abstract?`Is ${v} even or odd?`:`${v} ${th.label}. Can everyone find a partner? Even or odd?`,right:[N(v),300,even?'P_even':'P_odd'],rightCap:even?`${v} is even. Everyone has a partner!`:`${v} is odd. One is left without a partner!`,wrong:()=>['P_count_again']})};
/* equal groups: the start of tables (2, 5, 10) */
ACT.groups=(n)=>{const tb=rnd([2,5,10]),g=ri(2,n.max),ans=tb*g;const th=rnd(COUNT_THINGS);const one=tb===10?blocksHTML(10):`<div class="pile">${Array.from({length:tb},(_,i)=>objHTML(th.k,i,0,objSz(tb,true))).join('')}</div>`;
  body().innerHTML=`<div class="gplates${g>=4?' many':''}">${Array.from({length:g},()=>`<div class="gplate">${one}</div>`).join('')}</div><div class="eqn"><span>${g} groups of ${tb}</span>=<span>?</span></div><div class="choices" id="nc"></div>`;
  RUN.prompt=()=>say([N(g),'P_groups_of',N(tb),300,'P_altogether'],`${g} groups of ${tb}. How many altogether?`);RUN.prompt();let wrong=false;const L=once(ok=>learnN(n,ok));
  numChoices(ans,ans+tb,$('nc'),(b,v)=>{const ok=v===ans;L(ok);if(ok){b.classList.add('right');[...body().querySelectorAll('.eqn span')].pop().textContent=ans;FX.chime();say([N(g),'P_groups_of',N(tb),'P_makes',N(ans)],`${g} × ${tb} = ${ans}`).then(()=>roundDone(!wrong))}
    else{wrong=true;FX.boing();anim(b,'wiggle',500);say(['P_skip_hint'],`Count in ${tb}s: `+Array.from({length:g},(_,i)=>(i+1)*tb).join(', '))}},tb)};
/* picture bar chart */
const BAR_THINGS=[['🥭','mangoes'],['🍌','bananas'],['🍎','apples'],['🍇','grapes'],['🥕','carrots'],['🌸','flowers']];
ACT.barchart=(n,round)=>{const k=ageR()>=7?4:3,mx=n.max;let cats,cnt;do{cats=shuffle(BAR_THINGS).slice(0,k);cnt=cats.map(()=>ri(1,mx))}while(new Set(cnt).size<k);
  const types=['most','fewest','count',...(lv('barchart')>=1?['more']:[])];const q=types[round%types.length];
  const chart=`<div class="bars">${cats.map((c,i)=>`<div class="bcol"><div class="bstack">${Array(cnt[i]).fill(`<span>${c[0]}</span>`).join('')}</div><b>${c[1]}</b></div>`).join('')}</div>`;
  if(q==='most'||q==='fewest'){const want=q==='most'?Math.max(...cnt):Math.min(...cnt);const ans=cats[cnt.indexOf(want)][1];
    pickRound({top:chart,items:cats.map(c=>({h:`<span style="font-size:44px">${c[0]}</span>`,v:c[1],label:c[1]})),ans,say:[q==='most'?'P_bar_most':'P_bar_fewest'],cap:q==='most'?'Which one has the most?':'Which one has the fewest?',right:[N(want),250,rnd(PRAISE)],rightCap:`${ans}: ${want}!`,wrong:()=>['P_count_again']});return}
  let ans,cap,sayq;if(q==='count'){const i=ri(0,k-1);ans=cnt[i];cap=`How many ${cats[i][1]}?`;sayq=['P_bar_count'];body().innerHTML=chart;body().querySelectorAll('.bcol')[i].classList.add('hl')}
  else{let a=0,b=1;cnt.forEach((v,i)=>{if(v>cnt[a])a=i});cnt.forEach((v,i)=>{if(i!==a&&(b===a||v<cnt[b]))b=i});ans=cnt[a]-cnt[b];cap=`How many more ${cats[a][1]} than ${cats[b][1]}?`;sayq=['P_bar_more'];body().innerHTML=chart;body().querySelectorAll('.bcol')[a].classList.add('hl');body().querySelectorAll('.bcol')[b].classList.add('hl2')}
  body().insertAdjacentHTML('beforeend',`<div class="card-note" style="font-size:20px"><b>${cap}</b></div><div class="choices" id="nc"></div>`);RUN.prompt=()=>say(sayq,cap);RUN.prompt();let wrong=false;const L=once(ok=>learnN(n,ok));
  numChoices(ans,mx,$('nc'),(b,v)=>{const ok=v===ans;L(ok);if(ok){b.classList.add('right');FX.chime();say([N(ans),250,rnd(PRAISE)],`${ans}!`).then(()=>roundDone(!wrong))}else{wrong=true;FX.boing();anim(b,'wiggle',500);say(['P_count_again'],'Count again.')}},q==='more'?0:1)};
/* calendar: days and months in order */
const DAYS=['mon','tue','wed','thu','fri','sat','sun_d'],MONS=['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
ACT.calendar=(n,round)=>{const hard=lv('calendar')>=1;const kinds=['after','before',...(hard?['two','month']:[])];const q=kinds[round%kinds.length];const L=q==='month'?MONS:DAYS;const i=ri(0,L.length-1);
  const ans=L[(i+(q==='before'?-1:q==='two'?2:1)+L.length)%L.length];const opts=shuffle([ans,...shuffle(L.filter(x=>x!==ans&&x!==L[i])).slice(0,nopt()-1)]);
  const page=`<div class="calpage"><small style="font-family:var(--f-display);color:var(--ink-soft)">${q==='month'?'Month':'Day'}</small><b>${DI(L[i]).n}</b></div>`;
  const cap={after:`Which day comes after ${DI(L[i]).n}?`,before:`Which day comes before ${DI(L[i]).n}?`,two:`Which day is two days after ${DI(L[i]).n}?`,month:`Which month comes after ${DI(L[i]).n}?`}[q];
  pickRound({top:page,items:opts.map(k=>({h:`<b style="font-family:var(--f-display);font-size:clamp(17px,4.6vw,22px)">${DI(k).n}</b>`,v:k,label:DI(k).n})),ans,
    say:[{after:'P_cal_after',before:'P_cal_before',two:'P_cal_two',month:'P_cal_month'}[q],DN(L[i])],cap,right:[DN(ans),250,rnd(PRAISE)],rightCap:`${DI(ans).n}!`,wrong:()=>['P_count_again']})};

/* ======================= HARD WRITING (6-7) ======================= */
const blanks=w=>`<div style="display:flex;gap:8px;justify-content:center">${[...w].map(()=>'<span style="width:clamp(22px,6vw,32px);border-bottom:4px solid var(--ink-soft);height:6px"></span>').join('')}</div>`;
/* listen and write: the word is only heard, then the picture appears */
ACT.wdict=(n)=>{const pool=RWORDS.filter(w=>w.length<=(lv('read')>=1?5:4));const w=deck('wd'+pool.length,pool);
  writeGlyph(wordGlyph(w),{w:56*w.length+20,mode:'own',header:`<button class="cue" id="wdhear" style="font-size:22px">🔊 Hear it again</button>${blanks(w)}`,intro:['P_hw_dict',300,W(w)],cap:`Listen and write the word (${w.length} letters).`,lines:true,
    done:ok=>{learnN(n,ok);say([W(w),250,rnd(PRAISE)],`${w} ${RB[w]}`).then(()=>roundDone(ok))}});const h=$('wdhear');if(h)h.onclick=()=>say([W(w)],null)};
/* label the picture: picture and the number of letters, no word shown */
ACT.wlabel=(n)=>{const pool=RWORDS.filter(w=>w.length<=(lv('read')>=1?5:4));const w=deck('wl'+pool.length,pool);
  writeGlyph(wordGlyph(w),{w:56*w.length+20,mode:'own',header:`<div style="font-size:clamp(50px,14vw,76px);line-height:1">${RB[w]}</div>${blanks(w)}`,intro:['P_hw_label'],cap:`What is this? Write its name (${w.length} letters).`,lines:true,
    done:ok=>{learnN(n,ok);say([W(w),250,rnd(PRAISE)],w+'!').then(()=>roundDone(ok))}})};
/* number words */
const NUMW=['zero','one','two','three','four','five','six','seven','eight','nine','ten'];
ACT.wnumword=(n)=>{const v=deck('nw',range(1,10));const w=NUMW[v];
  writeGlyph(wordGlyph(w),{w:56*w.length+20,mode:'faint',header:`<div style="display:flex;align-items:center;gap:14px;justify-content:center">${numH(v)}<span style="font-size:24px">=</span>${wordH(w,'clamp(32px,9vw,48px)')}</div>`,intro:['P_hw_numword',300,N(v)],cap:`Write ${v} in words: ${w}`,lines:true,
    done:ok=>{learnN(n,ok);say([N(v),250,rnd(PRAISE)],`${v}: ${w}`).then(()=>roundDone(ok))}})};
/* names of people and places start with a capital letter */
const PROPER=[['Ravi','👦'],['Sita','👧'],['Asha','👩'],['Delhi','🏛️'],['India','🇮🇳'],['Goa','🏖️'],['Holi','🎨'],['Ganga','🌊'],['Agra','🕌'],['Diwali','🪔']];
ACT.wcapname=(n)=>{const [w,e]=deck('pn',PROPER);
  writeGlyph(wordGlyph(w),{w:56*w.length+20,mode:lv('wcapname')>=1?'own':'faint',header:`<div style="display:flex;align-items:center;gap:12px;justify-content:center"><span style="font-size:clamp(40px,11vw,60px)">${e}</span>${wordH(w,'clamp(34px,9vw,50px)')}</div><div class="card-note">Names of people and places start with a <b>capital letter</b>.</div>`,
    intro:['P_hw_capital',300,W(w.toLowerCase())],cap:`Write ${w}. Start with a capital ${w[0]}!`,lines:true,done:ok=>{learnN(n,ok);say([W(w.toLowerCase()),250,rnd(PRAISE)],w+'!').then(()=>roundDone(ok))}})};
/* write the missing word in a sentence (picture clue) */
const FILLS=['I see a','I have a','Look at the','This is a','I like the'];
ACT.wfill=(n)=>{const w=deck('wfl',RWORDS.filter(x=>x.length<=4&&!/^[aeiou]/.test(x)));const s0=rnd(FILLS);
  writeGlyph(wordGlyph(w),{w:56*w.length+20,mode:'own',header:`<div style="font-family:var(--f-letter);font-weight:700;font-size:clamp(22px,6vw,32px)">${s0} <u style="color:var(--peacock)">&nbsp;${'?'.repeat(1)}&nbsp;</u>. <span style="font-size:1.4em">${RB[w]}</span></div>`,intro:['P_hw_fill'],cap:`${s0} ___. Write the missing word.`,lines:true,
    done:ok=>{learnN(n,ok);say([W(w),250,rnd(PRAISE)],`${s0} ${w}.`).then(()=>roundDone(ok))}})};
/* one cat, two cats: add s for more than one */
const PLURAL=['cat','dog','hat','pen','cup','bed','bag','egg','nut','bug','kite','ball','bell','book','duck','frog','goat','sock','ring','star','tree','fish'].filter(w=>w!=='fish');
ACT.wplural=(n)=>{const w=deck('pl',PLURAL);const p=w+'s';
  writeGlyph(wordGlyph(p),{w:56*p.length+20,mode:lv('wplural')>=1?'own':'faint',header:`<div style="display:flex;gap:18px;align-items:center;justify-content:center;font-family:var(--f-letter);font-weight:700;font-size:clamp(20px,5.6vw,28px)"><div style="text-align:center"><div style="font-size:1.8em">${RB[w]}</div>one ${w}</div><div style="text-align:center"><div style="font-size:1.8em">${RB[w]}${RB[w]}</div>two ?</div></div>`,
    intro:['P_hw_plural',300,W(w)],cap:`One ${w}, two ${p}. Write ${p}.`,lines:true,done:ok=>{learnN(n,ok);say(['W_'+p,250,rnd(PRAISE)],`two ${p}!`).then(()=>roundDone(ok))}})};

/* ======================= HARD MATHS (6-7) ======================= */
/* two-digit adding and taking away with tens and ones blocks; regrouping only at the top level */
ACT.add2=(n)=>{const rg=lv('add2')>=2;let a,b;do{a=ri(11,n.max-10);b=ri(10,n.max-a)}while(!rg&&(a%10)+(b%10)>9);const ans=a+b;let wrong=false;const L=once(ok=>learnN(n,ok));
  body().innerHTML=`<div class="eqn">${blocksHTML(a)}<span>+</span>${blocksHTML(b)}</div><div class="eqn"><span>${a}</span>+<span>${b}</span>=<span>?</span></div><div class="choices" id="nc"></div>`;
  RUN.prompt=()=>say(['P_add2'],`${a} + ${b}. Add the tens, then the ones.`);RUN.prompt();
  numChoices(ans,n.max,$('nc'),(bt,v)=>{const ok=v===ans;L(ok);if(ok){bt.classList.add('right');[...body().querySelectorAll('.eqn span')].pop().textContent=ans;FX.chime();say([N(a),'P_and',N(b),'P_makes',N(ans)],`${a} + ${b} = ${ans}`).then(()=>roundDone(!wrong))}
    else{wrong=true;FX.boing();anim(bt,'wiggle',500);say(['P_add2'],`Tens: ${Math.floor(a/10)} + ${Math.floor(b/10)}. Ones: ${a%10} + ${b%10}.`)}},10)};
ACT.sub2=(n)=>{const rg=lv('sub2')>=2;let a,b;do{a=ri(20,n.max);b=ri(10,a-5)}while(!rg&&(b%10)>(a%10));const ans=a-b;let wrong=false;const L=once(ok=>learnN(n,ok));
  body().innerHTML=`<div class="eqn">${blocksHTML(a)}</div><div class="eqn"><span>${a}</span>−<span>${b}</span>=<span>?</span></div><div class="choices" id="nc"></div>`;
  RUN.prompt=()=>say(['P_sub2'],`${a} − ${b}. Take away the ones, then the tens.`);RUN.prompt();
  numChoices(ans,n.max,$('nc'),(bt,v)=>{const ok=v===ans;L(ok);if(ok){bt.classList.add('right');[...body().querySelectorAll('.eqn span')].pop().textContent=ans;FX.chime();say([N(a),'P_take_away',N(b),'P_leaves',N(ans)],`${a} − ${b} = ${ans}`).then(()=>roundDone(!wrong))}
    else{wrong=true;FX.boing();anim(bt,'wiggle',500);say(['P_sub2'],`Ones: ${a%10} − ${b%10}. Tens: ${Math.floor(a/10)} − ${Math.floor(b/10)}.`)}},0)};
/* missing number in a sum: 7 + ? = 10 */
ACT.missadd=(n)=>{const mx=n.max;const sub=Math.random()<.4;let a,b,c,ans,eq;
  if(!sub){c=ri(5,mx);a=ri(1,c-1);ans=c-a;eq=Math.random()<.5?[a,'+','?','=',c]:['?','+',a,'=',c]}else{a=ri(5,mx);ans=ri(1,a-1);c=a-ans;eq=[a,'−','?','=',c]}
  let wrong=false;const L=once(ok=>learnN(n,ok));
  body().innerHTML=`<div class="eqn" style="font-size:clamp(36px,10vw,56px)">${eq.map(x=>`<span${x==='?'?' class="q" style="color:var(--mango-deep)"':''}>${x}</span>`).join('')}</div><div class="choices" id="nc"></div>`;
  RUN.prompt=()=>say(['P_missing'],'Which number is missing?');RUN.prompt();
  numChoices(ans,mx,$('nc'),(bt,v)=>{const ok=v===ans;L(ok);if(ok){bt.classList.add('right');body().querySelector('.eqn .q').textContent=ans;FX.chime();say([N(ans),250,rnd(PRAISE)],eq.join(' ').replace('?',ans)).then(()=>roundDone(!wrong))}
    else{wrong=true;FX.boing();anim(bt,'wiggle',500);say(['P_count_again'],'Try counting on with your fingers.')}},1)};
/* count the money: ₹1, ₹2, ₹5, ₹10 coins */
ACT.coins=(n)=>{const set=n.max>20?[10,5,2,1]:[5,2,1];let c;do{c=Array.from({length:ri(3,6)},()=>rnd(set)).sort((x,y)=>y-x)}while(c.reduce((s,v)=>s+v,0)>n.max);const ans=c.reduce((s,v)=>s+v,0);let wrong=false;const L=once(ok=>learnN(n,ok));
  body().innerHTML=`<div class="purse" style="max-width:92vw">${c.map(v=>`<span class="coin c${v}">₹${v}</span>`).join('')}</div><div class="card-note" style="font-size:20px"><b>How much money?</b></div><div class="choices" id="nc"></div>`;
  RUN.prompt=()=>say(['P_coins'],'How much money is there? Start with the biggest coin.');RUN.prompt();
  numChoices(ans,n.max,$('nc'),(bt,v)=>{const ok=v===ans;L(ok);if(ok){bt.classList.add('right');FX.coin();say([N(ans),'P_rupees',250,rnd(PRAISE)],`₹${ans}`).then(()=>roundDone(!wrong))}
    else{wrong=true;FX.boing();anim(bt,'wiggle',500);say(['P_coins'],'Add them one by one: '+c.map(v=>'₹'+v).join(' + '))}},1)};
/* measure with a ruler in centimetres */
const MEASURE=[['✏️','pencil'],['🖍️','crayon'],['🔑','key'],['🥄','spoon'],['🐛','caterpillar'],['🍌','banana'],['🪥','toothbrush']];
ACT.measure=(n)=>{const len=ri(3,n.max);const [e,nm]=rnd(MEASURE);const start=lv('measure')>=1&&Math.random()<.5?ri(1,3):0;let wrong=false;const L=once(ok=>learnN(n,ok));const U=100/16;
  body().innerHTML=`<div class="ruler-wrap"><div class="r-obj" style="left:${start*U}%;width:${len*U}%"><span>${e}</span></div><div class="ruler">${Array.from({length:17},(_,i)=>`<i style="left:${i*U}%"><b>${i}</b></i>`).join('')}</div></div><div class="card-note" style="font-size:20px"><b>How long is the ${nm}?</b>${start?' (It does not start at 0!)':''}</div><div class="choices" id="nc"></div>`;
  RUN.prompt=()=>say(['P_measure'],`How long is the ${nm}? Count the centimetres.`);RUN.prompt();
  numChoices(len,n.max+2,$('nc'),(bt,v)=>{const ok=v===len;L(ok);if(ok){bt.classList.add('right');FX.chime();say([N(len),'P_cm',250,rnd(PRAISE)],`${len} centimetres!`).then(()=>roundDone(!wrong))}
    else{wrong=true;FX.boing();anim(bt,'wiggle',500);say(['P_measure_hint'],start?`It starts at ${start} and ends at ${start+len}. Count the jumps.`:'Look where it ends.')}},1)};
/* story sums: read or listen, then answer (pictures help) */
const STORIES=[['Ravi has 5 mangoes. He gets 3 more. How many mangoes now?','🥭',5,'+',3],['There are 9 birds on a tree. 4 fly away. How many are left?','🐦',9,'-',4],
 ['Sita has 6 balloons. Her friend gives her 6 more. How many balloons now?','🎈',6,'+',6],['Mom makes 12 ladoos. We eat 5. How many are left?','ladoo',12,'-',5],
 ['There are 7 ducks in the pond. 8 more come. How many ducks now?','🦆',7,'+',8],['Asha has 15 marbles. She gives 6 to her brother. How many does she have now?','🔵',15,'-',6],
 ['A bus has 10 people. 7 more get on. How many people now?','🧑',10,'+',7],['There are 14 kites. 8 get stuck in a tree. How many are still flying?','🪁',14,'-',8],
 ['Ravi reads 4 books on Monday and 5 books on Tuesday. How many books in all?','📕',4,'+',5],['There are 11 apples. Ravi eats 2. How many are left?','🍎',11,'-',2],
 ['Two friends each have 5 sweets. How many sweets altogether?','🍬',5,'+',5],['There are 16 fish. 9 swim away. How many are left?','🐟',16,'-',9]];
ACT.story=(n)=>{const i=deck('sty',STORIES.map((_,k)=>k));const [t,e,a,op,b]=STORIES[i];const ans=op==='+'?a+b:a-b;let wrong=false;const L=once(ok=>learnN(n,ok));
  const pics=op==='+'?`<div class="eqn"><div class="grp">${Array.from({length:a},(_,k)=>objHTML(e,k,0,a+b>14?'s5':'s4')).join('')}</div>+<div class="grp">${Array.from({length:b},(_,k)=>objHTML(e,a+k,0,a+b>14?'s5':'s4')).join('')}</div></div>`:`<div class="eqn"><div class="grp">${Array.from({length:a},(_,k)=>k>=a-b?`<span style="opacity:.25">${objHTML(e,k,0,a+b>14?'s5':'s4')}</span>`:objHTML(e,k,0,a+b>14?'s5':'s4')).join('')}</div></div>`;
  body().innerHTML=`<div class="card-note" style="font-size:clamp(18px,4.8vw,24px);max-width:560px"><b>${t}</b></div>${lv('story')>=1?'':pics}<div class="choices" id="nc"></div>`;
  RUN.prompt=()=>say(['STY_'+i],t);RUN.prompt();
  numChoices(ans,Math.max(a,ans)+3,$('nc'),(bt,v)=>{const ok=v===ans;L(ok);if(ok){bt.classList.add('right');FX.chime();say([N(ans),250,rnd(PRAISE)],`${a} ${op==='+'?'+':'−'} ${b} = ${ans}`).then(()=>roundDone(!wrong))}
    else{wrong=true;FX.boing();anim(bt,'wiggle',500);say(['P_story_hint'],op==='+'?'More means add. Put them together.':'Away or left means take away.')}},0)};
/* halves and quarters */
const FRAC_SHAPES=['circle','square','rect'];
function fracSVG(shape,parts,shaded,equal){const C='#f6a821',E='#fff',S='#4b6457';let g='';
  if(shape==='circle'){const cut=equal?null:parts===2?[0,230,360]:[0,150,210,290,360];for(let i=0;i<parts;i++){const a0=(cut?cut[i]:i*360/parts)-90,a1=(cut?cut[i+1]:(i+1)*360/parts)-90;const p=a=>[50+40*Math.cos(a*Math.PI/180),50+40*Math.sin(a*Math.PI/180)];const [x0,y0]=p(a0),[x1,y1]=p(a1);g+=`<path d="M50 50L${x0} ${y0}A40 40 0 ${a1-a0>180?1:0} 1 ${x1} ${y1}Z" fill="${i<shaded?C:E}" stroke="${S}" stroke-width="2.5"/>`}}
  else{const w=shape==='rect'?84:72,h=shape==='rect'?52:72,x0=50-w/2,y0=50-h/2;const ws=equal?Array(parts).fill(w/parts):[w*.7,...Array(parts-1).fill(w*.3/(parts-1))];let x=x0;ws.forEach((ww,i)=>{g+=`<rect x="${x}" y="${y0}" width="${ww}" height="${h}" fill="${i<shaded?C:E}" stroke="${S}" stroke-width="2.5"/>`;x+=ww})}
  return `<svg viewBox="0 0 100 100" width="100%" height="100%">${g}</svg>`}
ACT.fraction=(n)=>{const q=lv('fraction')>=1&&Math.random()<.5?'quarter':'half';const parts=q==='half'?2:4;const sh=rnd(FRAC_SHAPES);
  const right={v:'r',h:fracSVG(sh,parts,1,true)};const wr=[{v:'u',h:fracSVG(rnd(FRAC_SHAPES),parts,1,false)},{v:'o',h:fracSVG(rnd(FRAC_SHAPES),q==='half'?4:2,1,true)},{v:'t',h:fracSVG(rnd(FRAC_SHAPES),parts,parts===2?2:2,true)}];
  pickRound({items:shuffle([right,...wr.slice(0,nopt()-1)]).map((x,k)=>({h:`<div style="width:clamp(80px,22vw,120px);aspect-ratio:1">${x.h}</div>`,v:x.v,label:'shape '+(k+1)})),itemCls:'pcard grp',ans:'r',
    say:[q==='half'?'P_half':'P_quarter'],cap:q==='half'?'Which one shows one half coloured? (2 equal parts, 1 coloured)':'Which one shows one quarter coloured? (4 equal parts, 1 coloured)',right:[q==='half'?'P_half_yes':'P_quarter_yes'],rightCap:q==='half'?'Yes! 2 equal parts, 1 is coloured. That is one half.':'Yes! 4 equal parts, 1 is coloured. That is one quarter.',wrong:()=>['P_equal_parts']})};

/* ======================= STICKERS, DAYS PLAYED, HAATHI'S WARDROBE, MOVEMENT BREAKS ======================= */
const STICKERS=['🦁','🐯','🐘','🦒','🦓','🐼','🐨','🐵','🦊','🐰','🐻','🐸','🐢','🐬','🐳','🦋','🐝','🐞','🦚','🦜','🦉','🐧','🦩','🐙','🦀','🪔','🪁','🎨','🌙','⭐','🌈','🚂','🚀','🛺','🥭','🍉','🍦','🎈','🎁','🏏'];
const DRESS=[{id:'cap',e:'🧢',name:'Cap',slot:'head',days:2},{id:'flower',e:'🌺',name:'Flower',slot:'ear',days:3},{id:'shades',e:'🕶️',name:'Sunglasses',slot:'eyes',days:5},{id:'garland',e:'🌼',name:'Marigold garland',slot:'neck',days:7},
 {id:'crown',e:'👑',name:'Crown',slot:'head',days:10},{id:'bow',e:'🎀',name:'Bow',slot:'ear',days:14},{id:'tophat',e:'🎩',name:'Top hat',slot:'head',days:21},{id:'medal',e:'🏅',name:'Medal',slot:'neck',days:30}];
const SLOT_POS={head:[118,44,58],ear:[196,74,40],eyes:[118,106,62],neck:[118,176,30]};
function daysPlayed(){return (S.days||[]).length}
function streak(){const d=new Set(S.days||[]);let s=0;const t=new Date();if(!d.has(dkey(t)))t.setDate(t.getDate()-1);while(d.has(dkey(t))){s++;t.setDate(t.getDate()-1)}return s}
function markDay(){S.days=S.days||[];const t=today();if(!S.days.includes(t)){S.days.push(t);if(S.days.length>400)S.days=S.days.slice(-400);const nu=DRESS.find(x=>x.days===S.days.length);save();return nu||null}return null}
function dressSVG(){const w=S&&S.wear;if(!w)return '';return Object.entries(w).map(([slot,id])=>{const it=DRESS.find(x=>x.id===id);if(!it)return '';const [x,y,f]=SLOT_POS[slot];
  if(slot==='neck')return [-44,-22,0,22,44].map(dx=>`<text x="${x+dx}" y="${y+Math.abs(dx)*-.25}" font-size="${f}" text-anchor="middle" dominant-baseline="central">${it.e}</text>`).join('');
  return `<text x="${x}" y="${y}" font-size="${f}" text-anchor="middle" dominant-baseline="central">${it.e}</text>`}).join('')}
function awardSticker(){S.stickers=S.stickers||[];const left=STICKERS.filter(s=>!S.stickers.includes(s));const s=left.length?rnd(left):rnd(STICKERS);S.stickers.push(s);save();return s}
function openBook(){const ov=$('book');const have=S.stickers||[];const dp=daysPlayed();S.wear=S.wear||{};
  ov.innerHTML=`<div class="box" style="max-width:560px;max-height:92vh;overflow:auto">
    <h3>${S.profile?S.profile.name+"'s":'My'} sticker book</h3><p class="note">${new Set(have).size} of ${STICKERS.length} stickers · 🔥 ${streak()} day${streak()===1?'':'s'} in a row · played on ${dp} day${dp===1?'':'s'}</p>
    <div class="stk">${STICKERS.map(s=>`<span class="${have.includes(s)?'got':''}">${have.includes(s)?s:'?'}</span>`).join('')}</div>${r5Book()}
    <h3 style="margin-top:12px">Haathi's wardrobe</h3><p class="note">Play on more days to unlock new things for Haathi to wear. Tap to put on or take off.</p>
    <div class="wardrobe"><div class="haathi" style="width:130px;height:138px" id="wd-h">${haathi('happy')}</div><div class="wd-items">${DRESS.map(d=>`<button class="wd ${dp>=d.days?'':'lock'} ${S.wear[d.slot]===d.id?'on':''}" data-id="${d.id}"><span>${dp>=d.days?d.e:'🔒'}</span><small>${dp>=d.days?d.name:'Day '+d.days}</small></button>`).join('')}</div></div>
    <button class="big-btn go" id="book-close" style="margin-top:12px">Back</button></div>`;
  ov.hidden=false;$('book-close').onclick=()=>{FX.tap();ov.hidden=true;renderStart&&renderStart();if(!$('s-map').hidden)renderMap();if(!$('s-home').hidden)renderHome()};
  ov.querySelectorAll('.wd').forEach(b=>b.onclick=()=>{const d=DRESS.find(x=>x.id===b.dataset.id);if(dp<d.days){FX.boing();anim(b,'wiggle',500);return}FX.tap();if(S.wear[d.slot]===d.id)delete S.wear[d.slot];else S.wear[d.slot]=d.id;save();openBook()})}
const MOVES=[['🦘','Jump 5 times!',5],['🤸','Touch your toes 5 times!',5],['🦒','Stretch up high like a giraffe!',5],['🐦','Flap your arms like a bird!',6],['🐘','Stomp like an elephant!',6],['👏','Clap 10 times!',10],['🦩','Hop on one foot 3 times!',3],['🌀','Spin around slowly 3 times!',3]];
function moveBreak(then){const i=fresh('mv',MOVES.map((_,k)=>k));const [e,t,cnt]=MOVES[i];const ov=$('book');
  ov.innerHTML=`<div class="box movebox"><div class="mv-e">${e}</div><h3>${t}</h3><div class="mv-n" id="mvn"></div><button class="big-btn soft" id="mv-skip">Skip</button></div>`;ov.hidden=false;let done=false;
  const end=()=>{if(done)return;done=true;ov.hidden=true;then()};$('mv-skip').onclick=()=>{FX.tap();stopVoice();end()};
  (async()=>{await sayRaw(['P_mv_intro',300,'P_mv_'+i],t);for(let k=1;k<=cnt;k++){if(done)return;$('mvn').textContent=k;anim($('mvn'),'bumpn',300);FX.tick(k);await sayRaw([N(k)],String(k));await new Promise(r=>setTimeout(r,650))}
    if(done)return;FX.fanfare();await sayRaw(['P_mv_done'],'Great moving!');setTimeout(end,600)})()}


/* ======================= EASY / MEDIUM / HARD ======================= */
/* Every game sits in one mode. Age only picks the starting mode for each corner; the child or a grown-up can switch with the tabs. */
const MODE_NAMES=['Easy','Medium','Hard'];
const TIER={
 letters:{meet:0,bubbles:0,snack:0,picletter:0,letterpic:0,samesound:0,oddsound:0,fishing:0,stones:0,mole:0,hunt:0,sortsound:0,memory:0,bigsmall:0,sameletter:0,shadow:0,hidden:0,rhyme:0,
  firstmissing:1,nextletter:1,missingletter:1,buildword:1,readpic:1,picword:1,sight:1,digraph:1,
  jumble:2,misspos:2,spell:2,sentence:2,crossword:2,wordsearch:2,rhymeread:2},
 numbers:{count:0,numfind:0,dice:0,matchgroup:0,order:0,beats:0,more:0,fewer:0,shape:0,countshapes:0,oddshape:0,pattern:0,sortcolour:0,size:0,heavy:0,length:0,queue:0,
  rocket:1,bigger:1,smaller:1,next:1,missing:1,add:1,takeaway:1,hiding:1,maketen:1,share:1,shop:1,money:1,double:1,frog:1,skip:1,nlplace:1,barchart:1,
  tens:2,tenmore:2,clock:2,evenodd:2,groups:2,calendar:2,add2:2,sub2:2,missadd:2,coins:2,measure:2,story:2,fraction:2},
 writing:{slate:0,colour:0,maze:0,wlines:0,wpre:0,tracepic:0,dots:0,wletter:0,wnum:0,joinmatch:0,wsurface:0,countwrite:0,wrainbow:0,
  wshape:1,drawshapes:1,finishpic:1,wcap:1,wfirst:1,wfamily:1,wname:1,wcopy:1,wheard:1,
  wword:2,wcopyword:2,wsentence:2,wdict:2,wlabel:2,wnumword:2,wcapname:2,wfill:2,wplural:2}};
const MODE_NOTE={letters:['Sounds and letters','First letters and simple words','Reading words and sentences'],numbers:['Counting, shapes and sizes','Comparing, adding and taking away','Tens, time, even and odd, tables'],
 writing:['Lines, tracing and small letters','Shapes, capitals and first letters','Writing words and sentences'],discover:['Picture topics: fruits, animals, colours','Helpers, weather, festivals, science fun','Science and knowledge quizzes']};
function tierOf(kind,id){if(kind==='discover'){const s=DSEC[id];return !s?1:s.age<=3?0:s.age<=5?1:2}const t=TIER[kind]&&TIER[kind][id];return t==null?1:t}
function modeOf(kind){S.modes=S.modes||{};if(S.modes[kind]==null){const a=ageR();S.modes[kind]=a<=4?0:a===5?1:2}return S.modes[kind]}
function setMode(kind,m){S.modes=S.modes||{};S.modes[kind]=m;save()}
function kindOfNode(n){if(!n)return null;if(n.t.startsWith('d_'))return 'discover';if(TIER.letters[n.t]!=null)return 'letters';const id=n.skill||n.t;if(TIER.numbers[id]!=null)return 'numbers';if(TIER.writing[id]!=null)return 'writing';return null}
/* for the daily map: games from the current mode, with an occasional easier game for review */
function inPlay(kind,id){if(kind==='writing'&&id==='wname'&&!nameChars().length)return false;if(id==='oddsound'||id==='sortsound')if(S.intro.length<2)return false;if(id==='memory'&&S.intro.length<3)return false;
  return tierOf(kind,id)===modeOf(kind)}
function modeTabs(kind,onPick){const m=modeOf(kind);const w=document.createElement('div');w.className='modetabs';
  MODE_NAMES.forEach((nm,i)=>{const b=document.createElement('button');b.className='mtab'+(i===m?' on':'');b.innerHTML=`<b>${['🌱','🌿','🌳'][i]} ${nm}</b><small>${MODE_NOTE[kind][i]}</small>`;b.onclick=()=>{unlockAudio();FX.tap();setMode(kind,i);onPick()};w.appendChild(b)});return w}
/* after a game: if most recent games in this mode got 3 stars, offer the next mode (never forced) */
function modeSuggest(n,stars,box){const kind=kindOfNode(n);if(!kind)return;S.tierLog=S.tierLog||{};const m=modeOf(kind);const L=S.tierLog[kind]=(S.tierLog[kind]||[]).filter(x=>x.m===m);L.push({m,s:stars});if(L.length>10)L.shift();save();
  const KN={letters:'Letters',numbers:'Numbers',writing:'Writing',discover:'Discover'}[kind];
  const up=m<2&&L.length>=8&&L.slice(-8).filter(x=>x.s===3).length>=6,down=m>0&&L.length>=5&&L.slice(-5).filter(x=>x.s<=1).length>=3;if(!up&&!down)return;
  const to=up?m+1:m-1,why=up?'6 of the last 8 games got 3 stars':'3 of the last 5 games got only 1 star';
  if(S.settings.autoMode===false){logChange(kind,m,to,'mode',`${KN} looks ready for ${MODE_NAMES[to]} (${why}). Auto-move is off, so nothing changed.`);S.tierLog[kind]=[];save();return}
  setMode(kind,to);S.tierLog[kind]=[];logChange(kind,m,to,'mode',`${KN} moved ${up?'up':'down'} from ${MODE_NAMES[m]} to ${MODE_NAMES[to]} (${why}).`);save();
  const d=document.createElement('div');d.className='gnote';d.innerHTML=up?`<b>⭐ ${KN} is now ${MODE_NAMES[to]}!</b>`:`<b>${KN} is now ${MODE_NAMES[to]}</b>`;
  d.insertAdjacentHTML('beforeend',`<small>For grown-ups: moved because ${why}. You can change it any time with the tabs, or turn this off in Grown-ups.</small>`);box.appendChild(d)}


/* ======================= PICTURE CARDS (the flash cards parents use with 2 to 4 year olds) ======================= */
const CARD_DECKS=['fruits','vegetables','indianfood','vehicles','farm','wild','birds','voices','sea','bugs','body','colours','clothes','home','music','helpers','feelings','food'];
const hasVoices=id=>DSEC[id]&&DSEC[id].items.filter(i=>DSC.sounds[i.k]).length>=3;
ACT.cards=(n,round)=>{const sc=DSEC[n.sec];if(!n._ord)n._ord=shuffle(sc.items.map(i=>i.k)).slice(0,12);const k=n._ord[round%n._ord.length];const it=DI(k);const snd=DSC.sounds[k];
  body().innerHTML=`<div class="fc-wrap"><div class="fcard" id="fc"><div class="fc-pic">${it.e}</div><div class="fc-name">${it.n}</div>${snd?`<div class="fc-snd">🔊 ${snd}</div>`:''}<div class="fc-count">${round+1} / ${n._ord.length}</div></div></div><p class="card-note">Tap the card to hear it again. Swipe or tap Next for the next card.</p>`;
  const c=$('fc');RUN.prompt=()=>say([...(round===0?['SEC_'+n.sec,400]:[]),DN(k),...(snd?[450,'SND_'+k]:VOICE['RS_'+k]?[450,'RS_'+k]:[]),...(round%3===1?[700,'P_your_turn']:[])],it.n);RUN.prompt();anim(c,'dance');
  const next=()=>{if(c.dataset.done)return;c.dataset.done=1;learnN(n,true);FX.swish&&FX.swish();c.classList.add('fly');setTimeout(()=>roundDone(true),250)};
  let x0=null,moved=false;c.onpointerdown=e=>{x0=e.clientX;moved=false};c.onpointermove=e=>{if(x0!=null&&Math.abs(e.clientX-x0)>12){moved=true;c.style.transform=`translateX(${e.clientX-x0}px) rotate(${(e.clientX-x0)/20}deg)`}};
  c.onpointerup=c.onpointercancel=e=>{const dx=x0==null?0:e.clientX-x0;x0=null;c.style.transform='';if(Math.abs(dx)>60)next()};
  c.onclick=()=>{if(moved)return;FX.tap();anim(c,'bumpn',300);say([DN(k),...(snd?[300,'SND_'+k]:VOICE['RS_'+k]?[300,'RS_'+k]:[])],it.n)};
  actions([['soft','Hear again',()=>RUN.prompt()],...sayItAct([DN(k)],it.n),['go','Next card',next,ICON.next]])};
function cardNode(id,g){const sc=DSEC[id];const n={sec:id,skill:'d_'+id,title:sc.name};
  if(g==='cards')return Object.assign(n,{t:'cards',rounds:Math.min(12,sc.items.length),title:sc.name+': Picture cards'});
  return Object.assign(dNode(id,g),{title:sc.name+': '+{find:'Find the card',memory:'Memory cards',sound:'Whose voice?'}[g]})}
function openCards(deck){const b=$('corner-body');b.innerHTML='';const from={corner:'cards',sec:deck};
  if(!deck){$('corner-title').textContent='Picture Cards';
    const v=document.createElement('button');v.className='go-btn';v.style.cssText='width:100%;max-width:640px;animation:none';v.innerHTML='🔊 Whose voice is this? <span style="font-size:15px;font-weight:600">(animals and birds)</span>';
    v.onclick=()=>{unlockAudio();FX.tap();startRun(cardNode('voices','sound'),{corner:'cards',sec:'voices'})};b.appendChild(v);
    const g=document.createElement('div');g.className='tiles';b.appendChild(g);
    CARD_DECKS.filter(id=>DSEC[id]).forEach(id=>{const s=DSEC[id];const t=document.createElement('button');t.className='tile deck';t.innerHTML=`<div class="ico">${s.items.slice(0,3).map(i=>i.e).join('')}</div><span>${s.name}</span><small class="note">${s.items.length} cards</small>`;
      t.onclick=()=>{unlockAudio();FX.tap();say(['SEC_'+id],null);openCards(id)};g.appendChild(t)});
    const p=document.createElement('p');p.className='card-note';p.textContent='Picture cards for little ones: look, listen and say the name. Then find the card, play memory, or guess whose voice it is.';b.appendChild(p);say(['P_d_pick'],null);return}
  const s=DSEC[deck];$('corner-title').textContent=s.name;
  const back=document.createElement('button');back.className='pill-btn small';back.textContent='← All cards';back.onclick=()=>{FX.tap();openCards()};b.appendChild(back);
  const hero=document.createElement('div');hero.className='learncard';hero.style.cssText='flex-direction:row;gap:10px;flex-wrap:wrap;justify-content:center;max-width:640px';hero.innerHTML=s.items.slice(0,12).map(i=>`<span style="font-size:34px">${i.e}</span>`).join('');b.appendChild(hero);
  const g=document.createElement('div');g.className='tiles';b.appendChild(g);
  [['cards','🃏','Picture cards'],['find','🔍','Find the card'],['memory','🧠','Memory cards'],...(hasVoices(deck)?[['sound','🔊','Whose voice?']]:[])].forEach(([gm,ic,lb])=>{const t=document.createElement('button');t.className='tile';t.innerHTML=`<div class="ico">${ic}</div><span>${lb}</span>`;
    t.onclick=()=>{unlockAudio();FX.tap();startRun(cardNode(deck,gm),from)};g.appendChild(t)})}

/* ======================= BEDTIME BEDTIME ======================= */
/* Picture-book stories: a drawn scene per page, narration per page (downloaded the first time a story is opened, then offline).
   Read to me = narration with words lit up and pages turning by themselves. I'll read = no sound, a grown-up reads aloud.
   Story time does not count towards the game time limit. */
const BEDTIME=window.HAATHI_STORIES||[];
/* ---------- scenes: soft drawn backgrounds + characters ---------- */
const SKY={day:['#bfe6ff','#f2fbff'],night:['#141a3d','#3b3f7a']};
let SKID=0;
function bgSVG(key){const night=/N$/.test(key)||key==='skyN';const k=key.replace(/N$/,'');const [s1,s2]=night?SKY.night:SKY.day;const gid='sk'+(++SKID);let g=`<defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${s1}"/><stop offset="1" stop-color="${s2}"/></linearGradient></defs><rect width="400" height="300" fill="url(#${gid})"/>`;
  const hill=(c1,c2)=>`<path d="M0 190 Q90 150 180 185 T400 175 V300 H0Z" fill="${c1}"/><path d="M0 225 Q120 195 230 222 T400 215 V300 H0Z" fill="${c2}"/>`;
  const tree=(x,y,s,c)=>`<rect x="${x-4*s}" y="${y}" width="${8*s}" height="${30*s}" rx="3" fill="#8a5a3b"/><circle cx="${x}" cy="${y-6*s}" r="${22*s}" fill="${c}"/><circle cx="${x-14*s}" cy="${y+4*s}" r="${14*s}" fill="${c}"/><circle cx="${x+14*s}" cy="${y+4*s}" r="${14*s}" fill="${c}"/>`;
  const hut=(x,y,c)=>`<rect x="${x}" y="${y}" width="56" height="40" fill="${c}" rx="3"/><path d="M${x-8} ${y+2} L${x+28} ${y-26} L${x+64} ${y+2}Z" fill="#b5653a"/><rect x="${x+21}" y="${y+16}" width="14" height="24" fill="#6b4226"/>`;
  switch(k){
   case 'forest':g+=hill('#8fcf7a','#6fb85f')+tree(60,170,1.3,'#4f9a4a')+tree(340,160,1.5,'#3f8a42')+tree(300,190,.9,'#5aa857')+tree(110,200,.8,'#5aa857');break;
   case 'river':g+=`<path d="M0 170 Q100 150 200 168 T400 160 V300 H0Z" fill="#8fcf7a"/><path d="M0 220 Q120 200 230 222 T400 210 V270 Q260 258 140 272 T0 268Z" fill="#6ec1e4"/><path d="M40 238 q12 -6 24 0 M180 246 q12 -6 24 0 M300 236 q12 -6 24 0" stroke="#fff" stroke-width="3" fill="none" opacity=".7"/>`+tree(330,150,1.2,'#4f9a4a');break;
   case 'pond':g+=`<rect y="170" width="400" height="130" fill="#8fcf7a"/><ellipse cx="200" cy="240" rx="150" ry="42" fill="#6ec1e4"/><ellipse cx="120" cy="236" rx="18" ry="6" fill="#4f9a4a"/><ellipse cx="270" cy="250" rx="16" ry="5" fill="#4f9a4a"/>`;break;
   case 'village':g+=hill('#cfe3a0','#e8d3a0')+hut(40,170,'#f3c98b')+hut(300,165,'#f0b9a0')+`<path d="M170 300 Q200 240 230 200" stroke="#d9b98a" stroke-width="26" fill="none"/>`+tree(250,170,.8,'#5aa857');break;
   case 'home':g=`<rect width="400" height="300" fill="${night?'#2a2f5c':'#f6e3c6'}"/><rect y="220" width="400" height="80" fill="${night?'#3a3150':'#c9965f'}"/><rect x="250" y="40" width="100" height="90" rx="6" fill="${night?'#141a3d':'#bfe6ff'}" stroke="${night?'#5b5f9a':'#fff'}" stroke-width="8"/><path d="M240 36 q30 70 0 104 M360 36 q-30 70 0 104" stroke="${night?'#7a5a8a':'#e8798a'}" stroke-width="10" fill="none"/>`;break;
   case 'palace':g+=`<rect y="230" width="400" height="70" fill="#e8d3a0"/><rect x="90" y="120" width="220" height="110" fill="#f6d27a"/><circle cx="200" cy="112" r="40" fill="#f2c14e"/><rect x="194" y="58" width="12" height="20" fill="#e8a33a"/><rect x="70" y="110" width="30" height="120" fill="#f2c14e"/><rect x="300" y="110" width="30" height="120" fill="#f2c14e"/><path d="M180 230 V180 Q200 158 220 180 V230Z" fill="#b5653a"/>`;break;
   case 'court':g=`<rect width="400" height="300" fill="#7a2f3a"/><rect y="230" width="400" height="70" fill="#5a2028"/><path d="M160 300 L180 230 H220 L240 300Z" fill="#c8364b"/>${[40,120,280,360].map(x=>`<rect x="${x-10}" y="40" width="20" height="190" fill="#f2c14e"/>`).join('')}<path d="M150 230 V120 Q200 70 250 120 V230" fill="none" stroke="#f2c14e" stroke-width="10"/>`;break;
   case 'school':g=`<rect width="400" height="300" fill="#f9f1d8"/><rect y="230" width="400" height="70" fill="#d9b98a"/><rect x="110" y="40" width="180" height="100" rx="6" fill="#2f5a46" stroke="#8a5a3b" stroke-width="8"/><text x="130" y="80" font-size="22" fill="#fff" font-family="sans-serif">A B C 1 2 3</text>`;break;
   case 'garden':g+=`<rect y="190" width="400" height="110" fill="#8fcf7a"/>`+tree(330,150,1.4,'#4f9a4a')+[40,90,150,210,260].map((x,i)=>`<circle cx="${x}" cy="${250+(i%2)*14}" r="8" fill="${['#ff8fb1','#ffd23f','#ff8c42','#c58fff','#ff6b6b'][i]}"/>`).join('');break;
   case 'mountain':g+=`<path d="M-20 230 L90 90 L200 230Z" fill="#9aa9c2"/><path d="M120 230 L250 60 L380 230Z" fill="#7d8fae"/><path d="M230 86 L250 60 L270 86 L258 80 L250 90 L242 80Z" fill="#fff"/><rect y="226" width="400" height="74" fill="#8fcf7a"/>`;break;
   case 'sea':g+=`<rect y="160" width="400" height="90" fill="#4fa8d8"/><path d="M0 180 q20 -8 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" stroke="#fff" stroke-width="3" fill="none" opacity=".6"/><rect y="250" width="400" height="50" fill="#f3dfa8"/>`;break;
   case 'field':g+=`<rect y="200" width="400" height="100" fill="#b9d97a"/><path d="M0 230 H400" stroke="#a0c060" stroke-width="2"/>${[30,90,150,210,270,330,390].map(x=>`<rect x="${x}" y="196" width="6" height="34" fill="#c89a5a"/>`).join('')}<rect y="204" width="400" height="5" fill="#c89a5a"/>`;break;
   case 'sky':break;}
  if(night&&!['home','court','school'].includes(k))g+=`<rect width="400" height="300" fill="#0b1030" opacity="${k==='sky'?0:.42}"/>`;
  return {svg:g,night}}
function addons(list,night){return list.map(a=>{switch(a){
  case 'sun':return '<circle cx="345" cy="52" r="26" fill="#ffd23f"/><circle cx="345" cy="52" r="36" fill="#ffd23f" opacity=".25"/>';
  case 'moon':return '<circle cx="340" cy="52" r="34" fill="#fff6c9" opacity=".15"/><path d="M346 26 A26 26 0 1 0 346 78 A34 34 0 0 1 346 26Z" fill="#fff6c9"/>';
  case 'stars':return Array.from({length:22},(_,i)=>`<circle cx="${(i*97)%400}" cy="${(i*53)%150+8}" r="${i%3?1.6:2.6}" fill="#fff" opacity="${.5+((i*7)%5)/10}"/>`).join('');
  case 'clouds':return [[80,60,1],[250,40,.8]].map(([x,y,s])=>`<g fill="#fff" opacity=".92"><ellipse cx="${x}" cy="${y}" rx="${36*s}" ry="${16*s}"/><ellipse cx="${x+24*s}" cy="${y-10*s}" rx="${24*s}" ry="${16*s}"/><ellipse cx="${x-22*s}" cy="${y-6*s}" rx="${18*s}" ry="${12*s}"/></g>`).join('');
  case 'rain':return `<g stroke="#9ec9ff" stroke-width="2.4" opacity=".75">${Array.from({length:40},(_,i)=>`<line x1="${(i*41)%400}" y1="${(i*67)%260}" x2="${(i*41)%400-6}" y2="${(i*67)%260+16}"/>`).join('')}</g>`;}return ''}).join('')}
function sceneHTML(spec){const [bg,acts]=spec.split('|');const [b,...adds]=bg.split('+');const B=bgSVG(b);
  /* characters are drawn inside the picture, so they scale with it on any screen */
  const actors=(acts?acts.split(';'):[]).filter(Boolean).map(a=>{const [e,pos]=a.split('@');const [x,y,sz,f]=pos.split(',').map((v,i)=>i<3?+v:v);const X=x*4,Y=y*3,F=sz*3.8;
    return `<text class="act" x="${X}" y="${Y}" font-size="${F}" text-anchor="middle" dominant-baseline="central"${f?` transform="translate(${2*X} 0) scale(-1 1)"`:''}>${e}</text>`}).join('');
  return `<div class="scene${B.night?' nightscene':''}"><svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">${B.svg}${addons(adds,B.night)}${actors}</svg></div>`}

/* ---------- library ---------- */
const ST_GROUPS=['All','Ramayana','Mahabharata','Gita','Puranas and folk','Panchatantra','Aesop','Folk tale','Feelings','Clever and funny','Sleepy'];
const SERIES_ORDER={Ramayana:0,Mahabharata:1,Gita:2};
const stSort=(a,b)=>((b.v2?1:0)-(a.v2?1:0))||((SERIES_ORDER[a.series]??9)-(SERIES_ORDER[b.series]??9))||((a.ep||0)-(b.ep||0));
function openStories(){const b=$('corner-body');$('corner-title').textContent='Bedtime Stories';b.innerHTML='';const f=S.storyFilter||(S.storyFilter={g:'All',a:0});
  const chips=document.createElement('div');chips.className='st-chips';
  [['a',0,'All ages'],['a',3,'Age 3+'],['a',5,'Age 5+']].concat(ST_PILOT?[['a',6,'Age 6+']]:[]).concat(ST_GROUPS.map(g=>['g',g,g==='All'?'All stories':g])).forEach(([k,v,lab])=>{if(k==='g'&&v==='All')return;const c=document.createElement('button');c.className='st-chip'+(f[k]===v?' on':'');c.textContent=lab;
    c.onclick=()=>{FX.tap();f[k]=f[k]===v&&k==='g'?'All':v;save();openStories()};chips.appendChild(c)});b.appendChild(chips);
  const list=BEDTIME.filter(s=>(f.g==='All'||s.group===f.g)&&(!f.a||s.age===f.a)).sort(stSort);
  const g=document.createElement('div');g.className='st-grid';b.appendChild(g);
  list.forEach(s=>{const t=document.createElement('button');t.className='st-card';const done=(S.storiesRead||{})[s.id];
    t.innerHTML=`<div class="st-cover">${s.v2?scene2(s,0,true):sceneHTML(s.pages[0].s)}</div>${s.series?`<span class="st-ep">${s.series} · Episode ${s.ep}</span>`:''}<b>${s.title}</b><small>${s.series?'':s.group+' · '}${s.v2?'ages '+s.band:s.age+'+'} · ${stPagesOf(s)} pages${done?' · ✓ read':''}</small>`;
    t.onclick=()=>{unlockAudio();FX.tap();openStory(s.id)};g.appendChild(t)});
  if(!list.length)b.insertAdjacentHTML('beforeend','<p class="card-note">No stories match. Try another filter.</p>');
  b.insertAdjacentHTML('beforeend','<p class="card-note">Tip: stories are best shared. Read together, then talk about the question at the end. For sleep, use the 🌙 night mode, or switch the screen off with "Lights off" and just listen.</p>')}

/* ---------- reader ---------- */
let SR=null;const stAudio=new Audio();stAudio.preload='auto';
function stUrl(key){return 'stories/audio/'+key+'.mp3'}
async function stBlob(key){SR.blobs=SR.blobs||{};if(SR.blobs[key])return SR.blobs[key];try{const r=await fetch(stUrl(key));if(!r.ok)throw 0;const u=URL.createObjectURL(await r.blob());SR.blobs[key]=u;return u}catch(e){return null}}
function stPrefetch(s){(async()=>{const keys=[s.id+'_t',...s.pages.flatMap((p,i)=>p.sh?[s.id+'_'+i+'_sh',s.id+'_'+i]:[s.id+'_'+i]),s.id+'_e'];for(const k of keys){if(!SR||SR.id!==s.id)return;await stBlob(k)}})()}
function openStory(id){const s=BEDTIME.find(x=>x.id===id);if(!s)return;stopVoice();if(SR)stStop();SR={id,s,p:-1,mode:S.settings.storyMode||'read',night:S.settings.storyNight!==false,blobs:{}};go('story');stPrefetch(s);stRender()}
function stKey(){const {s,p}=SR;return p<0?s.id+'_t':p>=s.pages.length?s.id+'_e':s.id+'_'+p}
function stRender(){const {s,p}=SR;const el=$('s-story');el.classList.toggle('night',SR.night);$('st-title').textContent=s.title;
  $('st-night').textContent=SR.night?'🌙':'☀️';$('st-mode').textContent=SR.mode==='read'?'🔊 Read to me':'📖 I\'ll read';
  let pic,txt;
  if(p<0){pic=sceneHTML(s.pages[0].s);txt=`${s.series?`<div class="st-sub">${s.series} · Episode ${s.ep}</div>`:''}<div class="st-cover-title">${s.title}</div><div class="st-sub">${s.series?'':s.group+' · '}for age ${s.age}+</div>${s.source?`<div class="st-src">From: ${s.source}</div>`:''}`}
  else if(p>=s.pages.length){pic=sceneHTML('skyN+stars|🌙@50,36,20'+(s.pages[0].s.split('|')[1]||'').split(';').slice(0,1).map(a=>';'+a.replace(/@[\d.]+,[\d.]+,[\d.]+/,'@50,74,22')).join(''));
    const nx=s.series&&BEDTIME.find(x=>x.series===s.series&&x.ep===s.ep+1);SR.next=nx&&nx.id;
    txt=`<div class="st-cover-title">${nx?`End of episode ${s.ep}`:'The End'}</div>${s.moral?`<p class="st-moral">${s.moral}</p>`:''}<p class="st-talk">💬 ${s.talk}</p><div class="st-endbtns">${nx?`<button class="pill-btn primary" id="st-nextep">Next: ${nx.title} ▶</button>`:''}<button class="pill-btn" id="st-again">Read again</button><button class="pill-btn" id="st-more">Another story</button><button class="pill-btn primary" id="st-sleep">🌙 Goodnight</button></div>`;
    S.storiesRead=S.storiesRead||{};S.storiesRead[s.id]=today();save()}
  else{pic=sceneHTML(s.pages[p].s);txt=(s.pages[p].sh?`<div class="st-shloka">${s.pages[p].sh.replace(/।\s*/,'।<br>')}</div>`:'')+`<p class="st-text" id="st-text">${s.pages[p].t.split(/(\s+)/).map(w=>/\s/.test(w)?w:`<span>${w}</span>`).join('')}</p>`}
  $('st-pic').innerHTML=pic;$('st-words').innerHTML=txt;
  $('st-dots').innerHTML=Array.from({length:s.pages.length+2},(_,i)=>`<i class="${i-1===p?'on':''}"></i>`).join('');
  $('st-prev').disabled=p<0;$('st-next').disabled=p>=s.pages.length;
  if(p>=s.pages.length){if(SR.next)$('st-nextep').onclick=()=>{FX.tap();openStory(SR.next)};$('st-again').onclick=()=>{FX.tap();SR.p=-1;stRender()};$('st-more').onclick=()=>{stStop();FX.tap();go('corner');openStories()};$('st-sleep').onclick=()=>{stStop();stLights(true)}}
  stPlay()}
async function stPlay(){stAudio.pause();clearTimeout(SR&&SR.tm);$('st-play').textContent='▶';if(!SR||SR.mode!=='read')return;const pg=SR.s.pages[SR.p];SR.queue=pg&&pg.sh&&!SR.shDone?[SR.s.id+'_'+SR.p+'_sh']:[];SR.shDone=false;const key=SR.queue.length?SR.queue.shift():stKey();if(pg&&pg.sh&&key.endsWith('_sh'))SR.inSh=true;else SR.inSh=false;const myP=SR.p;const u=await stBlob(key);if(!SR||SR.p!==myP)return;
  if(!u){$('st-play').textContent='▶';return}stAudio.src=u;try{stAudio.preservesPitch=true;stAudio.webkitPreservesPitch=true}catch(e){}stAudio.defaultPlaybackRate=stAudio.playbackRate=Math.max(.88,vSpeed());try{await stAudio.play();$('st-play').textContent='⏸'}catch(e){$('st-play').textContent='▶'}}
function stStop(){stAudio.pause();if(SR)clearTimeout(SR.tm);$('st-play').textContent='▶'}
/* light up the words roughly in step with the voice */
stAudio.ontimeupdate=()=>{const t=$('st-text');if(!t||!stAudio.duration||(SR&&SR.inSh))return;const ws=[...t.querySelectorAll('span')];const lead=.25,tail=.4;const f=Math.max(0,Math.min(1,(stAudio.currentTime-lead)/Math.max(.1,stAudio.duration-lead-tail)));
  const tot=ws.reduce((a,w)=>a+w.textContent.length+1,0);let acc=0,cut=f*tot;ws.forEach(w=>{acc+=w.textContent.length+1;w.classList.toggle('lit',acc<=cut+2)})};
stAudio.onended=()=>{$('st-play').textContent='▶';if(!SR||SR.mode!=='read')return;if(SR.inSh){SR.inSh=false;SR.shDone=true;const r=SR,pp=SR.p;SR.tm=setTimeout(()=>{if(SR===r&&SR.p===pp)stPlay()},500);return}const t=$('st-text');if(t)t.querySelectorAll('span').forEach(w=>w.classList.add('lit'));
  if(SR.p<SR.s.pages.length){const r=SR;SR.tm=setTimeout(()=>{if(SR===r){SR.p++;stRender()}},1300)}};
function stLights(off){const o=$('st-lights');o.hidden=!off;if(off){o.onclick=()=>{o.hidden=true}}}
$('st-back').onclick=()=>{FX.tap();stStop();SR=null;go('corner');openStories()};
$('st-prev').onclick=()=>{if(SR.p>-1){FX.tap();SR.p--;stRender()}};
$('st-next').onclick=()=>{if(SR.p<SR.s.pages.length){FX.tap();SR.p++;stRender()}};
$('st-play').onclick=()=>{unlockAudio();if(SR.mode!=='read'){SR.mode='read';S.settings.storyMode='read';save();stRender();return}if(stAudio.paused){if(stAudio.src&&stAudio.currentTime>0&&!stAudio.ended)stAudio.play().then(()=>$('st-play').textContent='⏸').catch(()=>{});else stPlay()}else stStop()};
$('st-mode').onclick=()=>{FX.tap();SR.mode=SR.mode==='read'?'self':'read';S.settings.storyMode=SR.mode;save();if(SR.mode!=='read')stStop();stRender()};
$('st-night').onclick=()=>{FX.tap();SR.night=!SR.night;S.settings.storyNight=SR.night;save();$('s-story').classList.toggle('night',SR.night);$('st-night').textContent=SR.night?'🌙':'☀️'};
$('st-off').onclick=()=>{FX.tap();stLights(true)};
/* swipe pages */
{let x0=null;$('st-pic').addEventListener('pointerdown',e=>x0=e.clientX);$('st-pic').addEventListener('pointerup',e=>{if(x0==null||!SR)return;const dx=e.clientX-x0;x0=null;if(dx<-50)$('st-next').click();else if(dx>50)$('st-prev').click()})}

/* ======================= PRACTICE CORNERS ======================= */
const CORNER={
 letters:[['meet','Meet a letter','abc'],['bubbles','Sound Bubbles','○'],['snack',"Haathi's Snack",'🥭'],['picletter','Picture to letter','🐍s'],['letterpic','Letter to picture','s🐍'],['samesound','Same first sound?','👍'],
  ['oddsound','Odd one out','🙃'],['fishing','Letter fishing','🐟'],['stones','River stones','🪨'],['mole','Letter moles','🐹'],['hunt','Letter hunt','🔍'],['sortsound','Sound baskets','🧺'],['memory','Memory pairs','🃏'],
  ['bigsmall','Big and small','Aa'],['sameletter','Same letter','b d'],['shadow','Letter shadows','🌑'],['hidden','Hidden letter','🍃'],['nextletter','Next letter','abc?'],['missingletter','Missing letter','a_c'],
  ['rhyme','Rhyme time','🎵'],['firstmissing','First letter','_at'],['buildword','Build a word','c-a-t']],
 numbers:[['count','Count with me','123'],['tens','Tens and ones','▮▮▪'],['tenmore','10 more, 10 less','±10'],['clock','Telling time','🕒'],['nlplace','Number line','0—10'],['evenodd','Even or odd','2 4 6'],['groups','Equal groups','3×5'],['barchart','Picture graphs','📊'],['calendar','Days and months','📅'],['add2','Adding tens','23+14'],['sub2','Taking away tens','45−12'],['missadd','Missing number sums','7+?=10'],['coins','Counting money','₹'],['measure','Ruler','📏'],['story','Story sums','📖+'],['fraction','Halves and quarters','◐'],['numfind','Number balloons','🎈'],['dice','Quick look','⚂'],['matchgroup','Match the number','3=•••'],['order','Numbers in order','1→9'],['rocket','Rocket countdown','🚀'],
  ['beats','Drum beats','🥁'],['more','Which has more?','>'],['fewer','Which has fewer?','<'],['bigger','Bigger number','9>4'],['smaller','Smaller number','2<7'],['next','Before and after','→'],['missing','Missing number','4_6'],
  ['skip','Skip counting','10,20'],['frog','Frog hops','🐸'],['add','Adding','+'],['takeaway','Taking away','−'],['double','Butterfly doubles','🦋'],['hiding','Hiding ladoos','🥣'],['maketen','Make 5 and 10','▦'],
  ['share','Share fairly','½'],['shop','Mela shop','₹'],['money','More money?','👛'],['shape','Shape hunt','▲'],['countshapes','Count the shapes','⭐'],['oddshape','Odd shape out','◆'],['pattern','Patterns','•◦•'],
  ['sortcolour','Colour baskets','🎨'],['size','Big and small','🐘'],['heavy','Heavy and light','⚖️'],['length','Long and short','↔'],['queue','First and last','🚩']],
 writing:[['slate','Magic slate','✎'],['colour','Colouring','🖍️'],['maze','Road maze','🛣️'],['wlines','Straight lines','⁄'],['wpre','Patterns','〰'],['wshape','Draw shapes','□'],['drawshapes','Draw with shapes','🏠'],
  ['tracepic','Trace a picture','🪁'],['finishpic','Finish the picture','🦋'],['dots','Dot-to-dot','⋯'],['wletter','Small letters','✎a'],['wcap','Big letters','✎A'],['wrainbow','Rainbow writing','🌈'],['wcopy','Copy it','👀'],
  ['wheard','Write what you hear','👂'],['wnum','Write numbers','✎7'],['countwrite','Count and write','3✎'],['joinmatch','Join the pairs','🔗'],['wname','My name','Aa'],['wword','Write a word','ab'],
  ['wfamily','Letter families','cadg'],['wfirst','Write the first letter','🐍✎'],['wsurface','Rangoli, sand, chalk','🎨'],['wcopyword','Copy a word','✎cat'],['wsentence','Copy a sentence','✎I can'],
  ['wdict','Listen and write','👂✎'],['wlabel','Label the picture','🐈✎'],['wnumword','Number words','3=three'],['wcapname','Capitals for names','Ravi'],['wfill','Write the missing word','I see a _'],['wplural','One and many','cats']]
};
const COL_OF={letters:'#147a8a',numbers:'#e07a12',writing:'#8a5cc2'};
function cornerNode(id,kind){const pool=S.intro.length?S.intro:['s','a'];
  if(id==='meet')return {t:'meet',l:fresh('meet',ORDER)};
  if(LGAMES[id])return {t:id,pool,focus:weakestLetter()};
  if(id==='wletter')return {t:'wletter',l:fresh('wl',S.intro.length>=3?S.intro:ALPHA),skill:'wletter'};
  if(id==='wcap')return {t:'wcap',l:fresh('wc2',ALPHA),skill:'wcap'};
  if(id==='wnum')return {t:'wnum',n:fresh('wn',[...Array(param('wnum')+1).keys()]),skill:'wnum'};
  if(id==='wpre')return {t:'wpre',k:fresh('wp',PRE_ALL),skill:'wpre'};
  if(id==='wshape')return {t:'wshape',k:fresh('ws',['square','triangle','rectangle','star']),skill:'wshape'};
  if(id==='wword')return {t:'wword',w:pickWord(),skill:'wword'};
  if(id==='wname')return {t:'wname',skill:'wname'};
  if(id==='slate')return {t:'slate'};
  if(SK[id])return Object.assign(SK[id].node(param(id)),{skill:id});
  return {t:id}}
function cornerLocked(id){if(S.settings.unlock)return false;if(id==='wname')return !nameChars().length;if(LGAMES[id])return !LGAMES[id]();if(SK[id])return !unlocked(id);return false}
function openCorner(kind,sec){if(NEWUI){if(kind==='discover'||kind==='cards'){if(sec){go('corner');openDiscover(sec)}else openShelf('world')}else openShelf(kind==='stories'?'stories':kind==='writing'?'make':'play');return}
  go('corner');if(kind==='discover'){openDiscover(sec);return}if(kind==='cards'){openCards(sec);return}if(kind==='stories'){openStories();return}const b=$('corner-body');const from={corner:kind};b.innerHTML='';
  const m=modeOf(kind);$('corner-title').textContent=kind==='letters'&&m===2?'Reading':{letters:'Letters',numbers:'Numbers',writing:'Writing'}[kind];
  b.appendChild(modeTabs(kind,()=>openCorner(kind)));
  const all=kind==='letters'?[...CORNER.letters,...Object.keys(READ_G).map(g=>[g,...READ_G[g]])]:CORNER[kind];
  const list=all.filter(([id])=>tierOf(kind,id)===m&&!(id==='wname'&&!nameChars().length));
  const sur=document.createElement('button');sur.className='go-btn';sur.style.cssText='width:100%;max-width:640px;animation:none';sur.innerHTML=`🎲 Surprise me <span style="font-size:15px;font-weight:600">(${list.length} ${MODE_NAMES[m].toLowerCase()} games)</span>`;
  sur.onclick=()=>{unlockAudio();FX.sparkle();const id=fresh('sur-'+kind+m,list.map(x=>x[0]));say(['P_surprise'],null);setTimeout(()=>startRun(cornerNode(id,kind),from),700)};b.appendChild(sur);
  const g=document.createElement('div');g.className='tiles';b.appendChild(g);
  list.forEach(([id,label,ico])=>{const t=document.createElement('button');t.className='tile';
    t.innerHTML=`<div class="ico" style="color:${COL_OF[kind]};font-size:${ico.length>3?22:34}px">${ico}</div><span>${label}</span>`;
    t.onclick=()=>{unlockAudio();FX.tap();startRun(cornerNode(id,kind),from)};g.appendChild(t)});
  const p=document.createElement('p');p.className='card-note';p.textContent=`${list.length} ${MODE_NAMES[m]} games. Switch Easy, Medium or Hard with the tabs at the top. Every game picks new questions at random, and the numbers inside each game still grow with your child.`;b.appendChild(p);
  if(kind==='letters'&&m<2){const h=document.createElement('h3');h.textContent='Meet any letter';h.style.cssText='font-family:var(--f-display);color:var(--leaf);margin:8px 0 0';b.appendChild(h);
    const gp=document.createElement('div');gp.className='grid-pick';ORDER.forEach(l=>{const x=document.createElement('button');x.textContent=l;x.onclick=()=>{unlockAudio();FX.tap();startRun({t:'meet',l},from)};gp.appendChild(x)});b.appendChild(gp)}
  say(['P_pick'],null)}

/* ======================= PARENT ======================= */
async function aiPlan(){const z=$('ai-zone');let sample=null;try{sample=window.claude&&await window.claude.use('sample')}catch(e){}
  if(!sample){z.innerHTML='';return}
  z.innerHTML='<button class="pill-btn primary" id="ai-btn">Ask Claude for a 7-day home plan</button><p class="note" style="margin-top:8px">Sends only skill names and scores, never your child\'s name.</p><div id="ai-out" class="note" hidden></div>';
  $('ai-btn').onclick=async()=>{const out=$('ai-out');out.hidden=false;out.textContent='Thinking…';
    const lines=Object.keys(SK).filter(id=>S.sk[id]&&S.sk[id].n).map(id=>`${SK[id].name}: level ${SK[id].lab(param(id))}, ${Math.round(S.sk[id].p*100)}% recent first-try, ${S.sk[id].n} tries`);
    const letters=S.intro.map(l=>`${l}: ${status(l)}, ${Math.round(accuracy(l)*100)}%`).join('; ');
    const prompt=`You are an early-years teacher in India. A child aged ${S.profile.age} uses a phonics, maths and writing app. Current data:\n${lines.join('\n')}\nLetters met: ${letters||'none'}.\nWrite a 7-day home plan for the parent: one short off-screen activity per day (5 to 10 minutes) using everyday Indian household items, aimed at the weakest skills, and one line per day on what to say. Plain text, numbered Day 1 to Day 7, under 220 words, no emoji, no em dashes, no diagnosis.`;
    try{const r=await sample(prompt,{onText:({text})=>{out.textContent=text}});out.textContent=r.text}catch(e){out.textContent=e&&e.code==='not_granted'?'Permission was not given, so no plan was made.':"Couldn't get a plan right now. Try again later."}}}
function renderParent(){renderKids();renderProgress();S.unseen=0;save();badge();
  let wk=0;for(let i=0;i<7;i++){const dt=new Date();dt.setDate(dt.getDate()-i);wk+=S.minutes[dkey(dt)]||0}
  const stars=S.chapters.reduce((a,c)=>a+c.nodes.reduce((b,n)=>b+(n.stars||0),0),0),mast=ORDER.filter(l=>['mast','due'].includes(status(l))).length;
  $('p-stats').innerHTML=[[Math.round(S.minutes[today()]||0),'min today'],[Math.round(wk),'min this week'],[S.chapters.filter(c=>c.done).length,'chapters done'],[stars,'stars'],[S.intro.length,'letters met'],[mast,'sounds mastered']].map(([v,k])=>`<div class="stat"><b>${v}</b><span>${k}</span></div>`).join('');
  const strong=Object.keys(SK).filter(id=>S.sk[id]&&S.sk[id].n>=4&&S.sk[id].p>=.75).map(id=>SK[id].name),weak=Object.keys(SK).filter(id=>S.sk[id]&&S.sk[id].n>=3&&S.sk[id].p<.55).map(id=>SK[id].name);
  $('p-summary').innerHTML=`<b>Going well:</b> ${strong.length?strong.join(', '):'still collecting evidence'}.<br><b>Needs practice:</b> ${weak.length?weak.join(', '):'nothing flagged yet'}.<br>Said sounds aloud ${S.said||0} times. Recorded sounds: ${Object.keys(REC).length} of 18.`;
  const wl=S.intro.filter(l=>rec(l).att.length>=3).sort((a,b)=>accuracy(a)-accuracy(b))[0];const tips=[];
  if(wl)tips.push(`Letters: play "I spy something that starts like ${KEYW(wl)[0]}". Say the sound, not the name "${NAME[wl]}".`);
  if(weak.includes('Counting objects')||!S.sk.count)tips.push('Counting: count rotis, spoons or stairs together, touching each one.');else tips.push('Counting: count past 10 together, like cars at a signal.');
  if(S.sk.share&&S.sk.share.p<.6)tips.push('Sharing: share biscuits between two teddies, "one for you, one for you".');
  tips.push('Writing: lines, circles and crosses in a tray of sand or atta, big and slow.');
  $('p-tip').innerHTML=tips.map(t=>'• '+t).join('<br>');aiPlan();
  const ch=curChapter();$('p-why').innerHTML=ch.reasons.map(r=>`<li>${r}</li>`).join('');
  $('p-eng').innerHTML='<tr><th>Skill</th><th>Level</th><th>Recent</th></tr>'+Object.keys(SK).map(id=>{const s=S.sk[id],un=unlocked(id);
    const chip=!un?'<span class="chip locked">locked</span>':!s||!s.n?'<span class="chip new">not tried</span>':s.p>=.75?'<span class="chip strong">strong</span>':s.p<.55?'<span class="chip weak">practising</span>':'';
    return `<tr><td>${SK[id].sub}: ${SK[id].name}${chip}</td><td>${SK[id].lab(param(id))}</td><td>${s&&s.n?`<div class="bar"><i style="width:${Math.round(s.p*100)}%"></i></div>${Math.round(s.p*100)}% · ${s.n} tries`:'–'}</td></tr>`}).join('');
  $('p-map').innerHTML=ORDER.map(l=>{const st=S.intro.includes(l)||S.intro.includes(SAME[l])?status(l):'none',lab={none:S.intro.includes(l)?'met':'not yet',prac:'practising',mast:'mastered',due:'review'}[st];return `<div class="scell st-${st}"><div class="l">${l}</div><div class="s">${lab}</div></div>`}).join('');
  $('ps-name').value=S.profile.name;$('ps-age').value=S.profile.age;$('ps-limit').value=S.profile.limit;$('ps-sfx').checked=S.settings.sfx!==false;$('ps-countnums').checked=S.settings.countNums!==false;$('ps-moves').checked=S.settings.moves!==false;$('ps-automode').checked=S.settings.autoMode!==false;$('ps-lang').value=S.settings.lang||'en';$('ps-unlock').checked=!!S.settings.unlock;$('ps-consent').checked=!!S.settings.consent;$('ps-mic').checked=!!S.settings.mic;$('ps-tilt').checked=S.settings.tilt!==false;{const nn=$('nd-note');if(nn){nn.hidden=!ndNote();$('nd-note-ok').onclick=()=>{try{localStorage.setItem('haathi-nd-note','seen')}catch(e){}nn.hidden=true;badge()}}}['letters','numbers','writing','discover'].forEach(k=>{$('ps-m-'+k).value=modeOf(k)});renderLikes();
  renderStudio();resetZone();renderFeedback();r5Parent()}
$('ps-save').addEventListener('click',()=>setTimeout(()=>{kidsIdx();renderKids()},0));
$('ps-save').onclick=()=>{S.profile.name=$('ps-name').value.trim()||S.profile.name;const oldAge=S.profile.age;S.profile.age=+$('ps-age').value;if(S.profile.age!==oldAge)placeByAge();S.profile.limit=+$('ps-limit').value;S.settings.sfx=$('ps-sfx').checked;S.settings.countNums=$('ps-countnums').checked;S.settings.moves=$('ps-moves').checked;S.settings.autoMode=$('ps-automode').checked;S.settings.lang=$('ps-lang').value;loadHindi();applyNums();S.settings.unlock=$('ps-unlock').checked;S.settings.consent=$('ps-consent').checked;S.settings.tilt=$('ps-tilt').checked;{const c=$('ps-sg');if(c)S.settings.showGrown=c.checked}
  {const want=$('ps-mic').checked;if(want&&!S.settings.mic&&navigator.mediaDevices&&navigator.mediaDevices.getUserMedia){navigator.mediaDevices.getUserMedia({audio:true}).then(st=>{st.getTracks().forEach(t=>t.stop());S.settings.mic=true;save()}).catch(()=>{S.settings.mic=false;save();const c=$('ps-mic');if(c)c.checked=false})}else S.settings.mic=want&&!!S.settings.mic}
  ['letters','numbers','writing','discover'].forEach(k=>{const v=+$('ps-m-'+k).value,was=modeOf(k);if(v!==was){setMode(k,v);if(S.tierLog)S.tierLog[k]=[];logChange(k,was,v,'mode',`${{letters:'Letters',numbers:'Numbers',writing:'Writing',discover:'Discover'}[k]} set to ${MODE_NAMES[v]} by a grown-up.`);S.unseen=0}});
  save();r5Today();r5AreasRender();r5Week();badge();$('ps-saved').hidden=false;setTimeout(()=>$('ps-saved').hidden=true,1600)};
function resetZone(){const z=$('reset-zone');z.innerHTML='<button class="pill-btn danger" id="p-reset">Reset all progress</button>';
  $('p-reset').onclick=()=>{z.innerHTML='<p>This deletes chapters, stars and skill levels (recordings are kept). It cannot be undone.</p><div class="row" style="justify-content:flex-start"><button class="pill-btn" id="r-no">Keep progress</button><button class="pill-btn danger" id="r-yes">Delete progress</button></div>';
    $('r-no').onclick=resetZone;$('r-yes').onclick=()=>{S=blank();save();sessSec=0;go('setup')}}}

/* ======================= REVIEWER FEEDBACK ======================= */
const FB_Q=[['fun','Fun for my child'],['learn','Helped learning'],['easy','Easy for my child to use alone'],['voice','Voice and sounds'],['write','Writing activities'],['maths','Maths games']];
const fb={};
function fbText(){const v=id=>$(id).value.trim();const st=FB_Q.map(([k,l])=>`${l}: ${fb[k]?'★'.repeat(fb[k])+'☆'.repeat(5-fb[k]):'not rated'}`).join('\n');
  let t=`Haathi's Sound Forest feedback\n${v('fb-name')?'From: '+v('fb-name')+'\n':''}Child's age: ${$('fb-age').value}\n\n${st}\n\nEnjoyed: ${v('fb-liked')||'-'}\nConfusing/broken: ${v('fb-hard')||'-'}\nIdeas/price: ${v('fb-idea')||'-'}`;
  if($('fb-sum').checked){let wk=0;for(let i=0;i<7;i++){const dt=new Date();dt.setDate(dt.getDate()-i);wk+=S.minutes[dkey(dt)]||0}
    const tot=Object.values(S.minutes).reduce((a,b)=>a+b,0);const sk=Object.keys(SK).filter(id=>S.sk[id]&&S.sk[id].n).map(id=>`${SK[id].name} ${Math.round(S.sk[id].p*100)}% (${SK[id].lab(param(id))})`).join('; ');
    t+=`\n\nProgress: ${Math.round(tot)} min total, ${Math.round(wk)} min this week, ${Object.keys(S.minutes).length} days played, ${S.chapters.filter(c=>c.done).length} chapters, ${S.intro.length} letters met, recorded sounds ${Object.keys(REC).length}.\nSkills: ${sk||'none yet'}`}
  return t}
function fbUpdate(){const t=fbText();$('fb-wa').href='https://wa.me/'+FB_WA+'?text='+encodeURIComponent(t);$('fb-preview').value=t}
function renderFeedback(){const box=$('fb-stars');box.innerHTML=FB_Q.map(([k,l])=>`<div class="field"><label>${l}</label><div class="row" style="justify-content:flex-start;gap:4px" data-q="${k}">${[1,2,3,4,5].map(i=>`<button class="star-b" data-v="${i}" aria-label="${i} of 5" style="width:40px;height:40px">${i<=(fb[k]||0)?STAR:STAR_OFF}</button>`).join('')}</div></div>`).join('');
  box.querySelectorAll('[data-q]').forEach(r=>r.querySelectorAll('button').forEach(b=>b.onclick=()=>{fb[r.dataset.q]=+b.dataset.v;S.fbPrefs[r.dataset.q]=+b.dataset.v;save();renderFeedback()}));
  ['fb-name','fb-age','fb-liked','fb-hard','fb-idea','fb-sum'].forEach(id=>{$(id).oninput=fbUpdate;$(id).onchange=fbUpdate});fbUpdate()}
$('fb-wa').addEventListener('click',()=>{gc('/feedback-sent','Feedback sent');fbUpdate();sendFeedback();const n=$('fb-note');n.hidden=false;n.textContent='If WhatsApp did not open, tap "Copy text" and paste it into a message.'});
$('fb-copy').onclick=async()=>{fbUpdate();sendFeedback();const n=$('fb-note');n.hidden=false;try{await navigator.clipboard.writeText(fbText());n.textContent='Copied. Paste it into WhatsApp or email.'}catch(e){const p=$('fb-preview');p.hidden=false;p.focus();p.select();n.textContent='Select the text below and copy it.'}};

/* ======================= ANONYMOUS SYNC (only with parent consent) ======================= */
/* ---- anonymous usage counts (GoatCounter): no names, no cookies, no child data. Only: app opened, child's age group, shares, feedback sent. ---- */
const GC='rajat';        // GoatCounter site code, e.g. 'haathi' for haathi.goatcounter.com; empty = nothing is counted
const FB_WA='917827208494';     // WhatsApp number for feedback with country code, digits only, e.g. '91XXXXXXXXXX'; empty = parent picks the chat
function gc(path,title,daily){if(!GC||!navigator.onLine)return;try{if(daily){const k='gc-'+path+'-'+today();if(localStorage.getItem(k))return;localStorage.setItem(k,'1')}
  new Image().src=`https://${GC}.goatcounter.com/count?p=${encodeURIComponent(path)}&t=${encodeURIComponent(title||path)}&e=true&r=${encodeURIComponent(document.referrer||'')}&rnd=${Date.now()}`}catch(e){}}
setTimeout(()=>{gc('/open','App opened',true);if(S.profile)gc('/active/age-'+S.profile.age,'Child aged '+S.profile.age+' played today',true)},1500);
const ENDPOINT='';  // Google Apps Script web-app URL; empty = nothing is ever sent
function devId(){if(!S.device){S.device='d'+Math.random().toString(36).slice(2,10)+Date.now().toString(36).slice(-4);save()}return S.device}
function snapshot(){const tot=Object.values(S.minutes).reduce((a,b)=>a+b,0);const sk={};Object.keys(S.sk).forEach(id=>{const x=S.sk[id];if(x.n)sk[id]={lvl:x.lvl,p:Math.round(x.p*100),n:x.n}});
  return {app:'v5',age:S.profile&&S.profile.age,days:Object.keys(S.minutes).length,minutes:Math.round(tot),chapters:S.chapters.filter(c=>c.done).length,letters:S.intro.length,
    mastered:ORDER.filter(l=>['mast','due'].includes(status(l))).length,said:S.said||0,recorded:Object.keys(REC).length,skills:sk,likes:S.likes,ratings:S.fbPrefs}}
function post(type,data){if(!ENDPOINT||!S.settings.consent||!S.profile)return;try{fetch(ENDPOINT,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain'},body:JSON.stringify({type,device:devId(),at:new Date().toISOString(),data})}).catch(()=>{})}catch(e){}}
function sync(force){if(!ENDPOINT||!S.settings.consent)return;const now=Date.now();if(!force&&now-(S.lastSync||0)<20*60*1000)return;S.lastSync=now;save();post('progress',snapshot())}
function sendFeedback(){const v=id=>$(id).value.trim();post('feedback',Object.assign({ratings:Object.assign({},fb),enjoyed:v('fb-liked'),problems:v('fb-hard'),ideas:v('fb-idea'),childAge:$('fb-age').value},snapshot()))}
function renderLikes(){const rows=Object.keys(S.likes).map(t=>[t,likeScore(t),S.likes[t]]).filter(r=>r[2].up+r[2].mid+r[2].down).sort((a,b)=>b[1]-a[1]);
  const nm=t=>TITLES[t]||t;$('p-likes').innerHTML=rows.length?`<b>Loves:</b> ${rows.filter(r=>r[1]>.3).map(r=>nm(r[0])).join(', ')||'not clear yet'}<br><b>Not keen on:</b> ${rows.filter(r=>r[1]<-.3).map(r=>nm(r[0])).join(', ')||'nothing so far'}<br><span style="font-size:13px">From the faces your child taps after each game. Liked games come up more often; weak skills still get practice.</span>`:'After each game your child can tap a face. Their likes will show here and shape the next chapters.';
  const g=$('p-global');if(CFG.notes&&CFG.notes.length){g.hidden=false;g.innerHTML='<b>Updates from all families\' feedback:</b><br>'+CFG.notes.map(x=>'• '+x).join('<br>')}}

/* ======================= SHARE ======================= */
const SHARE_URL='https://scentationalcandlesofficial.github.io/haathi-sound-forest/';
const SHARE_TEXT="Try Haathi's Sound Forest: a free learning game for kids aged 3 to 7 (letter sounds, maths, writing, and 26 topics about the world). No sign-up. Tip: open the link in Chrome (or Safari on iPhone), then tap \"Install the app\" to put it on your home screen.";
$('share-wa').href='https://wa.me/?text='+encodeURIComponent(SHARE_TEXT+' '+SHARE_URL);
function shareNote(t){const n=$('share-note');if(n){n.hidden=false;n.textContent=t}}
async function copyLink(){try{await navigator.clipboard.writeText(SHARE_URL);shareNote('Link copied. Paste it into any chat.');return true}catch(e){shareNote('Copy this link: '+SHARE_URL);return false}}
async function shareGame(){unlockAudio();FX.tap();
  if(navigator.share){try{await navigator.share({title:"Haathi's Sound Forest",text:SHARE_TEXT,url:SHARE_URL});return}catch(e){if(e&&e.name==='AbortError')return}}
  if(!(await copyLink()))window.open('https://wa.me/?text='+encodeURIComponent(SHARE_TEXT+' '+SHARE_URL),'_blank')}
$('btn-share').onclick=()=>{gc('/share','Shared the app');shareGame()};$('btn-share-start').onclick=()=>{gc('/share','Shared the app');shareGame()};$('share-copy').onclick=()=>{FX.tap();copyLink()};

/* ======================= INSTALL HELP ======================= */
let installEvt=null;
const UA=navigator.userAgent||'';
const isIOS=/iPhone|iPad|iPod/i.test(UA)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
const inApp=/FBAN|FBAV|FB_IAB|Instagram|WhatsApp|Line\/|Snapchat|; wv\)/i.test(UA);
/* installed: the home-screen app opens in fullscreen (Release 9.2) or standalone display mode; the browser never goes full screen any more */
const isStandalone=()=>!!(window.matchMedia&&(matchMedia('(display-mode: fullscreen)').matches||matchMedia('(display-mode: standalone)').matches||matchMedia('(display-mode: minimal-ui)').matches))||navigator.standalone===true;
function installHelp(html){const h=$('install-help');h.hidden=false;h.innerHTML=html}
function refreshInstall(){const b=$('btn-install');if(!b)return;if(isStandalone()){b.hidden=true;$('install-help').hidden=true;return}b.hidden=false}
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installEvt=e;refreshInstall()});
window.addEventListener('appinstalled',()=>{gc('/installed','App installed');installEvt=null;refreshInstall();installHelp('Installed! Find <b>Haathi</b> on your home screen.')});
$('btn-install').onclick=async()=>{FX.tap();
  if(installEvt){installEvt.prompt();try{await installEvt.userChoice}catch(e){}installEvt=null;return}
  if(inApp){installHelp(`You opened this inside another app (like WhatsApp), which can't install apps.<br><b>Tap ⋮ or ··· at the top, then "Open in Chrome"</b>${isIOS?' (or "Open in Safari")':''}. Then tap Install again.<br><span style="font-size:13px">Or copy the link: ${SHARE_URL}</span>`);return}
  if(isIOS){installHelp(`On iPhone or iPad, use <b>Safari</b>:<br>1. Tap the <b>Share</b> button (square with an arrow ⬆️).<br>2. Scroll and tap <b>Add to Home Screen</b>.<br>3. Tap <b>Add</b>.`);return}
  installHelp(`In <b>Chrome</b>: tap the <b>⋮</b> menu (top right), then <b>Install app</b> or <b>Add to Home screen</b>.<br>Using another browser? Open this link in Chrome: ${SHARE_URL}`)};
refreshInstall();

/* ======================= NEW DESIGN (preview, release 1A) ======================= */
/* One Play button, a 5-stop daily adventure and a Library with four doors. Off by default: switch it on in Grown-ups,
   or open the app with ?new=1. The classic map and corners are untouched and read the same saved progress. */
const ND_ICO={};Object.keys(CORNER).forEach(k=>CORNER[k].forEach(([id,,ico])=>ND_ICO[id]=ico));Object.keys(READ_G).forEach(g=>ND_ICO[g]=READ_G[g][1]);
function ndIcon(n){if(n.t==='move')return '🤸';{const r=r2Icon(n);if(r)return r}if(n.t==='meet')return n.l;if((n.t==='cards'||n.t.startsWith('d_'))&&DSEC[n.sec])return DSEC[n.sec].icon;return ND_ICO[n.skill]||ND_ICO[n.t]||nodeIcon(n)}
/* the daily adventure: world warm-up, letters or numbers, a movement stop, the other subject, then something to make */
function composeAdv(carry){
  const idx=S.chapters.length,reasons=[];
  let newL=carry||null;
  if(!newL&&modeOf('letters')<2&&readyForNewLetter(idx)){newL=LET.find(l=>!S.intro.includes(l));if(newL){S.intro.push(newL);S.lastIntroCh=idx}}
  /* stop 1: picture cards, and every third day a topic game */
  const dm=modeOf('discover');let warm=null;
  /* older children (My world on Hard) always get a topic game; picture cards are for the little ones */
  if(dm>=2||(dm===1?idx%2===1:idx%3===2)){const ds=DSC.sections.filter(x=>inPlay('discover',x.id)).map(x=>x.id).sort((a,b)=>score('d_'+b)-score('d_'+a));if(ds.length){warm=dNode(ds[0]);if((warm.rounds||DEFAULT_ROUNDS)>6)warm.rounds=6;reasons.push('Warm-up topic: '+DSEC[ds[0]].name)}}
  if(!warm){const decks=CARD_DECKS.filter(id=>DSEC[id]&&id!=='voices'&&tierOf('discover',id)<=dm);const deck=fresh('advdeck',decks.length?decks:CARD_DECKS.filter(id=>DSEC[id]));
    warm=Object.assign(cardNode(deck,'cards'),{rounds:Math.min(6,DSEC[deck].items.length),_ord:shuffle(DSEC[deck].items.map(i=>i.k)).slice(0,6)});reasons.push('Warm-up: picture cards, '+DSEC[deck].name)}
  /* letters and numbers: one is stop 2, the other is stop 4, swapping each day */
  let L;
  if(newL){L={t:'meet',l:newL};reasons.push(`New letter: ${newL} (${KEYW(newL)[0]})`)}
  else{L={t:pickLetterGame(),focus:weakestLetter(),pool:S.intro.slice()};reasons.push(READ_G[L.t]?`Reading: ${READ_G[L.t][0]}`:`Letter practice: ${L.focus} (${Math.round(accuracy(L.focus)*100)}% right lately)`)}
  const maths=Object.keys(SK).filter(id=>SK[id].sub==='Maths'&&inPlay('numbers',id)).sort((a,b)=>score(b)-score(a));
  const mid=maths[0]||'count';let M=Object.assign(SK[mid].node(param(mid)),{skill:mid});
  if(modeOf('numbers')<=1&&idx%4===1){M={t:modeOf('numbers')?'race20':'race'};reasons.push('Number path race: a board game for number order')}else reasons.push(why(mid));
  /* stop 5: write the letter of the day, or another writing game, turn by turn */
  let W;const wOther=Object.keys(SK).filter(id=>SK[id].sub==='Writing'&&id!=='wletter'&&inPlay('writing',id)).sort((a,b)=>score(b)-score(a))[0];
  if(newL||idx%2===0||!wOther){W=modeOf('writing')===2?{t:'wcopyword',skill:'wcopyword'}:{t:'wletter',l:newL||weakestLetter(true),skill:'wletter'};reasons.push(W.l?`Write the letter ${W.l}`:'Copy a word')}
  else{W=Object.assign(SK[wOther].node(param(wOther)),{skill:wOther});reasons.push(why(wOther))}
  const first=idx%2===0?[L,M]:[M,L];
  const nodes=[warm,first[0],{t:'move'},first[1],W];
  S.chapters.push({id:idx,region:Math.floor(idx/3)%REGIONS.length,nodes:nodes.map(n=>Object.assign(n,{stars:null})),reasons,done:false,date:today(),adv:true});
  if(S.chapters.length>40)S.chapters=S.chapters.slice(-40);
  save();
}
/* a chapter planned for the classic map becomes a 5-stop adventure the first time the new design opens it */
function ensureAdv(){const c=S.chapters[S.chapters.length-1];if(!c||c.done||c.adv)return;const meet=c.nodes.find(n=>n.t==='meet'&&n.stars==null);S.chapters.pop();composeAdv(meet&&meet.l)}
ACT.move=(n)=>{body().innerHTML='';$('cap').textContent='';moveBreak(()=>{if(RUN&&RUN.node===n)roundDone(true)})};
function ndDots(c){const d=c.nodes.filter(n=>n.stars!=null).length;return c.nodes.map((n,i)=>`<i class="${i<d?'on':''}"></i>`).join('')}

/* ---- home: one choice ---- */
function renderHome(){if(S.profile)markDay();badge();r5Home();const c=curChapter();const started=c.nodes.some(n=>n.stars!=null);
  $('nd-parent').innerHTML=$('btn-parent').innerHTML;$('nd-haathi').innerHTML=haathi('happy');$('nd-dots').innerHTML=ndDots(c);
  const nm=S.profile&&S.profile.name&&S.profile.name!=='friend'?', '+S.profile.name:'';const h=new Date().getHours();
  $('nd-bubble').textContent=S.advDone===today()&&!started?`All done for today${nm}! See you tomorrow.`:`${h<12?'Good morning':h<17?'Good afternoon':'Good evening'}${nm}! Shall we play?`}
$('nd-parent').onclick=()=>{FX.tap();openGate(()=>go('parent'))};
$('nd-play').onclick=()=>{unlockAudio();FX.tap();go('path')};
$('nd-lib').onclick=()=>{unlockAudio();FX.tap();go('lib')};
$('nd-haathi').onclick=()=>{unlockAudio();FX.tap();openBook()};

/* ---- today's adventure: the path ---- */
function renderPath(){const c=curChapter(),ci=curNodeIdx(c),el=$('nd-path');const ML=[5,33,58,33,5,33,58,33,5];
  $('nd-path-bubble').textContent=`Stop ${ci+1} of ${c.nodes.length}. Tap the glowing one!`;
  el.innerHTML=c.nodes.map((nd,i)=>{const done=nd.stars!=null,cur=i===ci,ic=ndIcon(nd);const len=[...ic].length;
    return `<div class="nd-prow" style="padding-left:${ML[i%ML.length]}%"><button class="nd-node ${done?'done':cur?'cur':''}" data-i="${i}" ${cur?'':'disabled'} aria-label="Stop ${i+1}${done?', done':cur?', tap to play':''}">${done?ICON.check:`<span style="font-size:${len>4?'15':len>2?'21':'clamp(28px,5vh,38px)'}${len>2?'px':''}">${ic}</span>`}</button>${cur?`<span class="nd-mini">${haathi('happy')}</span>`:''}</div>`}).join('');
  const b=el.querySelector('.nd-node.cur');if(b)b.onclick=()=>{unlockAudio();FX.tap();playChapterNode(c,ci)};
  requestAnimationFrame(()=>{const R=el.getBoundingClientRect();if(!R.width)return;const pts=[...el.querySelectorAll('.nd-node')].map(x=>{const r=x.getBoundingClientRect();return (r.left+r.width/2-R.left).toFixed(0)+','+(r.top+r.height/2-R.top).toFixed(0)}).join(' ');
    el.insertAdjacentHTML('afterbegin',`<svg viewBox="0 0 ${R.width.toFixed(0)} ${R.height.toFixed(0)}" aria-hidden="true"><polyline points="${pts}" fill="none" stroke="#9fd3b0" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1 18"/></svg>`)});
  setTimeout(()=>{if(current==='path')say(['P_map_hi'],null)},350)}
$('nd-path-home').onclick=()=>{FX.tap();go('home')};

/* ---- library: four picture doors ---- */
function renderLib(){setTimeout(()=>{if(current==='lib')say(['P_nd_lib'],null)},300)}
$('nd-lib-home').onclick=()=>{FX.tap();go('home')};
document.querySelectorAll('[data-door]').forEach(b=>b.onclick=()=>{unlockAudio();FX.tap();openShelf(b.dataset.door,true)});
let ND_PAGE={};
function ndPlays(id){return (S.plays&&S.plays[id])||0}
/* a shelf shows 8 picture tiles at a time: up to 4 the child has played most and 4 not tried yet; the round arrow brings the next 8 */
function openShelf(kind,speak){go('corner');const b=$('corner-body');b.innerHTML='';
  if(speak)setTimeout(()=>{if(current==='corner')say(['P_nd_'+kind],null)},250);
  if(kind==='stories'){openStories();return}
  $('corner-title').textContent={play:'Play',make:'Make',world:'My world'}[kind];
  let items=[];
  if(kind==='world'){const dm=modeOf('discover');const ids=DSC.sections.filter(s=>tierOf('discover',s.id)===dm).map(s=>s.id);DSC.sections.forEach(s=>{if(tierOf('discover',s.id)<dm&&!ids.includes(s.id))ids.push(s.id)});CARD_DECKS.forEach(id=>{if(DSEC[id]&&!ids.includes(id))ids.push(id)});
    items=ids.map(id=>({id:'d_'+id,ico:DSEC[id].icon,label:DSEC[id].name,n:(S.sk['d_'+id]&&S.sk['d_'+id].n)||0,run:()=>{say(['SEC_'+id],null);openDiscover(id)}}))}
  else{const kinds=kind==='make'?['writing']:['letters','numbers'];
    const seenTile={};kinds.forEach(k=>{const m=modeOf(k);const all=k==='letters'?[...CORNER.letters,...Object.keys(READ_G).map(g=>[g,...READ_G[g]])]:CORNER[k];
      all.filter(([id])=>tierOf(k,id)===m&&!cornerLocked(id)).forEach(([id,label,ico])=>{const t=r2Tile(id,label,ico);if(seenTile[t.key])return;seenTile[t.key]=1;items.push({id:t.key,ico:t.ico,label:t.label,n:ndPlays(t.key),col:COL_OF[k],run:()=>startRun(cornerNode(id,k),{corner:k})})})})}
  r5Shelf(kind,items);
  const fav=items.filter(x=>x.n>0).sort((a,c)=>c.n-a.n),nw=items.filter(x=>x.n===0);
  const pages=Math.max(1,Math.ceil(items.length/8));const p=(ND_PAGE[kind]||0)%pages;
  /* every page has up to four favourites and four new games; every game sits on exactly one page */
  const fq=fav.slice(),nq=nw.slice(),pg=[];for(let i=0;i<pages;i++){const s=[...fq.splice(0,4),...nq.splice(0,4)];while(s.length<8&&(fq.length||nq.length))s.push(fq.length?fq.shift():nq.shift());pg.push(s)}
  const show=pg[p].map(x=>Object.assign(x,{tag:x.n?'❤️':'✨'}));
  const g=document.createElement('div');g.className='tiles nd-shelf';b.appendChild(g);
  show.forEach(x=>{const t=document.createElement('button');t.className='tile nd';const len=[...x.ico].length;
    t.innerHTML=`<div class="ico" style="${x.col?'color:'+x.col+';':''}font-size:${len>3?22:len>1&&x.col?30:44}px">${x.ico}</div><span>${x.label}</span><i class="nd-tag" aria-hidden="true">${x.tag}</i>`;
    t.onclick=()=>{unlockAudio();FX.tap();x.run()};g.appendChild(t)});
  if(pages>1){const m=document.createElement('button');m.className='nd-more';m.setAttribute('aria-label','More');m.textContent='🔄';m.onclick=()=>{unlockAudio();FX.tap();ND_PAGE[kind]=p+1;openShelf(kind)};b.appendChild(m);
    b.insertAdjacentHTML('beforeend',`<p class="card-note">${p+1} of ${pages}. ❤️ played before, ✨ not tried yet. Levels are set in Grown-ups.</p>`)}
}
/* where the back arrow of a game leads */
function backFrom(f){f=f||{};
  if(!NEWUI){f.corner?openCorner(f.corner,f.sec):go('map');return}
  if(f.chapter!=null){go('path');return}
  if(f.corner==='discover'||f.corner==='cards'){if(f.sec){go('corner');openDiscover(f.sec)}else openShelf('world');return}
  if(f.corner==='stories'){openShelf('stories');return}
  if(f.corner){openShelf(f.corner==='writing'?'make':'play');return}
  go('home')}

/* ---- after a game: one cheer, one button. Stars are still counted for the engine and for Grown-ups, but the child sees a path filling up ---- */
function finishND(run,stars,chDone){const n=run.node,box=$('reward-box'),adv=run.from.chapter!=null;
  const pid=n.pid||n.t;S.plays=S.plays||{};S.plays[pid]=(S.plays[pid]||0)+1;gc('/g/'+pid+'/done','Game finished: '+pid);if(chDone)gc('/adv/done','Adventure finished');
  /* meeting a letter and the board game are not tests, so they do not push Easy/Medium/Hard up */
  if(n.t!=='move'&&n.t!=='friend'&&n.t!=='meet'&&n.t!=='race'&&n.t!=='race20')modeSuggest(n,stars,document.createElement('div'));
  r5Finish(run,chDone,pid);if(chDone){S.advDone=today();S.advCount=(S.advCount||0)+1}
  save();sync(false);RUN=null;
  if(n.t==='move'&&!chDone){go('path');return}
  const ch=adv?S.chapters.find(c=>c.id===run.from.chapter):null;const stk=chDone?awardSticker():null;
  box.innerHTML=chDone?`<div class="nd-fin" aria-hidden="true">🎉</div><div class="nd-stk">${stk}</div><h3>New sticker!</h3><div class="haathi" style="width:120px;height:128px">${haathi('happy')}</div><p class="note">Tap Haathi on the home screen to open the sticker book.</p>`
    :`<div class="haathi" style="width:150px;height:160px">${haathi('happy')}</div><h3>${stars===3?'Superstar!':stars===2?'Great job!':'Well tried!'}</h3>${ch?`<div class="nd-dots big">${ndDots(ch)}</div>`:''}`;
  /* in an adventure the child is asked once, at the end, which stop was the best; free play keeps the three faces */
  if(chDone&&ch){const bq=document.createElement('div');bq.className='nd-best';bq.innerHTML='<p class="faces-q">Which stop did you like best?</p><div class="faces">'+ch.nodes.map((x,i)=>x.t==='move'?'':`<button data-i="${i}" aria-label="Stop ${i+1}">${ndIcon(x)}</button>`).join('')+'</div>';
    bq.querySelectorAll('button').forEach(b=>b.onclick=()=>{if(bq.dataset.v!=null)return;bq.dataset.v=b.dataset.i;b.classList.add('on');FX.tap();likeIds(ch.nodes[+b.dataset.i]).forEach(id=>{const L=S.likes[id]||(S.likes[id]={up:0,mid:0,down:0});L.up++});save()});box.appendChild(bq)}
  if(n.t!=='move'&&!adv){const fq=document.createElement('div');fq.innerHTML='<div class="faces"><button data-f="up" aria-label="Loved it">😀</button><button data-f="mid" aria-label="Okay">😐</button><button data-f="down" aria-label="Did not like">🙁</button></div>';
    fq.querySelectorAll('button').forEach(b=>b.onclick=()=>{fq.querySelectorAll('button').forEach(x=>x.classList.remove('on'));b.classList.add('on');FX.tap();likeIds(n).forEach(id=>{const L=S.likes[id]||(S.likes[id]={up:0,mid:0,down:0});if(fq.dataset.v)L[fq.dataset.v]--;L[b.dataset.f]++});fq.dataset.v=b.dataset.f;save()});box.appendChild(fq)}
  const row=document.createElement('div');row.className='row';
  const mk=(cls,html,label,fn)=>{const x=document.createElement('button');x.className='big-btn '+cls+' nd-big';x.innerHTML=html;x.setAttribute('aria-label',label);x.onclick=()=>{FX.tap();$('reward').hidden=true;fn()};row.appendChild(x)};
  if(chDone)mk('go','🏠','Home',()=>{go('home');if(!sgOffer())say(['P_nd_seeyou'],null)});
  else if(adv)mk('go',ICON.next.replace('currentColor','#fff'),'Next stop',()=>go('path'));
  else{mk('soft',ICON.back,'Back',()=>backFrom(run.from));mk('go','↻','Play again',()=>startRun(n,run.from))}
  box.appendChild(row);$('reward').hidden=false;confetti();FX.fanfare();
  say(chDone?[500,'P_nd_done',700,'P_nd_best']:[500,rnd(PRAISE_EN)],null)}

/* ---- help: after two misses the right answer glows and a hand points at it; the first time a game is met, the hand shows the first answer ---- */
function ndHand(el,ms){if(!el||!document.body.contains(el))return;let h=$('nd-hand');if(!h){h=document.createElement('div');h.id='nd-hand';h.textContent='👆';h.setAttribute('aria-hidden','true');document.body.appendChild(h)}
  const r=el.getBoundingClientRect();h.hidden=false;h.style.left=(r.left+r.width/2-14)+'px';h.style.top=(r.top+r.height*.5)+'px';h.classList.add('ndtap');clearTimeout(ndHand.t);ndHand.t=setTimeout(()=>{h.hidden=true},ms||3200)}
function ndHint(el,float){if(!el)return;el.classList.add(float?'nd-hintb':'nd-hint');if(!float)ndHand(el)}
function ndFirstTime(){if(!NEWUI||!RUN||RUN.round!==0)return false;const t=RUN.node.t;S.demo=S.demo||{};if(S.demo[t])return false;S.demo[t]=1;save();return true}

/* ======================= RELEASE 2: merged games, tile games, three new games ======================= */
/* Look-alike games fold into one game that mixes its questions. The old games stay in the code as the question makers. */
const MERGE={
 piclet:{t:'Picture and letter',ico:'🐍s',subs:['picletter','letterpic']},
 twins:{t:'Letter twins',ico:'Aa',subs:['bigsmall','sameletter']},
 detective:{t:'Letter detective',ico:'🔎',subs:['shadow','hidden']},
 abctrain:{t:'Alphabet train',ico:'🚂',subs:['nextletter','missingletter']},
 readmatch:{t:'Read and match',ico:'📖',subs:['readpic','picword']},
 countall:{t:'Count with me',ico:'123',subs:['count','countshapes']},
 morefewer:{t:'More or fewer?',ico:'<>',subs:['more','fewer']},
 compare:{t:'Compare it',ico:'⚖️',subs:['size','heavy','length']},
 bigsmallnum:{t:'Bigger or smaller',ico:'9>4',subs:['bigger','smaller']},
 neighbours:{t:'Number neighbours',ico:'4_6',subs:['next','missing']},
 hops:{t:'Skip-count hops',ico:'🐸',subs:['frog','skip']},
 mela:{t:'Mela shop',ico:'₹',subs:['shop','money']},
 tenssums:{t:'Tens sums',ico:'±10',subs:['add2','sub2']},
 strokes:{t:'First strokes',ico:'〰',run:1,subs:['wlines','wpre']},
 shapesdraw:{t:'Shapes',ico:'□',run:1,subs:['wshape','drawshapes']},
 letters3:{t:'Small letters',ico:'✎a',run:1,subs:['wletter','wrainbow','wsurface','wcopy']},
 hearwrite:{t:'Hear it, write it',ico:'👂✎',subs:['wheard','wfirst']}
};
const MERGE_OF={};Object.keys(MERGE).forEach(g=>MERGE[g].subs.forEach(s=>MERGE_OF[s]=g));
/* five finger-writing games become tile games */
const REPL={wcopyword:['wtiles','copy','Build the word','🔡'],wnumword:['wtiles','num','Number words','3=three'],wplural:['wtiles','plural','One and many','cats'],wsentence:['sentbuild','','Sentence builder','🧩'],wcapname:['sentbuild','','Sentence builder','🧩']};
const kindOfId=id=>TIER.letters[id]!=null?'letters':TIER.numbers[id]!=null?'numbers':'writing';
TIER.letters.roll=0;LGAMES.roll=()=>true;CORNER.letters.push(['roll','Roll the ladoo','🟠']);
TIER.numbers.race=0;TIER.numbers.race20=1;CORNER.numbers.push(['race','Number path race','🎲'],['race20','Number path to 20','🎲20']);
Object.assign(ROUNDS,{wtiles:4,sentbuild:3,race:1,race20:1,roll:5});
Object.assign(TITLES,{wtiles:'Build the word',sentbuild:'Sentence builder',race:'Number path race',race20:'Number path to 20',roll:'Roll the ladoo'});
Object.assign(ND_ICO,{roll:'🟠',race:'🎲',race20:'🎲',wtiles:'🔡',sentbuild:'🧩'});
function r2Tile(id,label,ico){const g=MERGE_OF[id];if(g)return {key:g,label:MERGE[g].t,ico:MERGE[g].ico};if(REPL[id])return {key:REPL[id][0]==='sentbuild'?'sentbuild':id,label:REPL[id][2],ico:REPL[id][3]};return {key:id,label,ico}}
function r2Icon(n){const g=n.merge||MERGE_OF[n.t];if(g&&MERGE[g])return MERGE[g].ico;if(REPL[n.t])return REPL[n.t][3];if(n.t==='wtiles')return n.skill&&REPL[n.skill]?REPL[n.skill][3]:'🔡';return null}
/* called when a game starts: swap in the tile game, or mark the game as part of a merged one */
const mergeSubs=g=>{const subs=g.subs.filter(s=>{const k=kindOfId(s);return tierOf(k,s)<=modeOf(k)&&!cornerLocked(s)});return subs.length?subs:[g.subs[0]]};
function r2Prep(n,from){
  if(REPL[n.t]){const r=REPL[n.t];n.pid=r[0]==='sentbuild'?'sentbuild':n.t;n.skill=n.skill||n.t;n.variant=r[1];n.title=r[2];n.t=r[0];delete n.rounds}
  if(MERGE_OF[n.t]&&!n.merge){n.merge=MERGE_OF[n.t];n._first=n.t}
  if(n.merge){const g=MERGE[n.merge];
    /* writing games that fade their help over three rounds stay whole: from the shelf the tile plays a different one each time; an adventure keeps the one it chose */
    if(g.run&&from&&from.chapter==null){const subs=mergeSubs(g),sub=subs[ndPlays(n.merge)%subs.length];if(sub!==n.t){const keep={merge:n.merge,_first:n._first};Object.keys(n).forEach(k=>delete n[k]);Object.assign(n,cornerNode(sub,kindOfId(sub)),keep)}}
    n.title=g.t;n.pid=n.merge}
  if(!n.pid)n.pid=n.t}
/* each round of a merged game takes the next kind of question, at the child's current level for that kind */
function mergeRound(n,round){const g=MERGE[n.merge];if(!g||g.run)return;const subs=mergeSubs(g);
  let i=subs.indexOf(n._first);if(i<0)i=0;const sub=subs[(round+i)%subs.length];
  if(round===0&&sub===n.t)return;
  const keep={merge:n.merge,_first:n._first,title:n.title,stars:n.stars,pid:n.pid};Object.keys(n).forEach(k=>delete n[k]);Object.assign(n,cornerNode(sub,kindOfId(sub)),keep);RUN.startLvl=null;RUN.c2=0}
const likeIds=x=>x.merge&&MERGE[x.merge]?MERGE[x.merge].subs:[x.skill&&REPL[x.skill]?x.skill:x.t];

/* ---- word tiles: tap the letters in order. Used for copying a word, number words and plurals ---- */
function tileWord(o){const w=o.w,pre=o.pre||0;let pos=pre,wrong=false,miss=0;
  if(window.__TRACE)window.__TRACE.push({g:'wtiles',cap:o.cap,items:o.tiles.slice(),ans:w});
  body().innerHTML=`${o.header?`<div class="tw-head">${o.header}</div>`:''}<div class="slots tw">${[...w].map((c,i)=>`<span class="slot">${i<pre?c:''}</span>`).join('')}</div><div class="tiles2" id="tl"></div>`;
  o.tiles.forEach(c=>{const b=document.createElement('button');b.className='ltile'+(c.length>1?' wt':'');b.textContent=c;
    b.onclick=()=>{if(b.disabled||pos>=w.length)return;
      if(w.startsWith(c,pos)){b.disabled=true;b.classList.remove('nd-hint');b.classList.add('used');const sl=body().querySelectorAll('.slot');[...c].forEach((ch,k)=>{sl[pos+k].textContent=ch});pos+=c.length;FX.tick(pos);
        if(pos>=w.length){FX.chime();burst(body().querySelector('.slots'),16);o.onDone(!wrong)}}
      else{wrong=true;miss++;FX.boing();anim(b,'wiggle',500);if(NEWUI&&miss>=2)ndHint([...$('tl').children].find(x=>!x.disabled&&w.startsWith(x.textContent,pos)));say(['P_listen_again',...(o.again||[])],'Try another tile.')}};
    $('tl').appendChild(b)});
  RUN.prompt=()=>say(o.intro,o.cap);RUN.prompt()}
ACT.wtiles=(n)=>{const v=n.variant||'copy';const L=once(ok=>learnN(n,ok));const extra=(w,k)=>others(ALPHA.filter(c=>!w.includes(c)),'',k);
  if(v==='num'){const num=deck('nw',range(1,10)),w=NUMW[num];
    tileWord({w,header:bigShow(numH(num)),tiles:shuffle([...w,...extra(w,2)]),intro:['P_hw_numword',300,N(num),300,'P_tile_build'],again:[N(num)],cap:`Build the word for ${num}`,onDone:ok=>{L(ok);say([N(num),250,rnd(PRAISE)],`${num}: ${w}`).then(()=>roundDone(ok))}});return}
  if(v==='plural'){const w=deck('pl',PLURAL),p=w+'s',full=lv('wplural')>=1;
    tileWord({w:p,pre:full?0:w.length,header:`<div style="display:flex;gap:18px;align-items:center;justify-content:center;font-family:var(--f-letter);font-weight:700;font-size:clamp(20px,5.6vw,28px)"><div style="text-align:center"><div style="font-size:1.8em">${RB[w]}</div>one ${w}</div><div style="text-align:center"><div style="font-size:1.8em">${RB[w]}${RB[w]}</div>two ?</div></div>`,
      tiles:full?shuffle([...p,...extra(p,2)]):shuffle(['s','es','ing']),intro:['P_hw_plural',300,W(w)],again:[W(w)],cap:`One ${w}, two ...? ${full?'Build the word.':'Tap the ending.'}`,onDone:ok=>{L(ok);say(['W_'+p,250,rnd(PRAISE)],`two ${p}!`).then(()=>roundDone(ok))}});return}
  const pool=ageR()>=6?RWORDS.filter(x=>x.length<=(lv('read')>=1?5:4)):Object.keys(CVCE);const w=deck('cw'+pool.length,pool);
  tileWord({w,header:`<div style="display:flex;align-items:center;gap:12px;justify-content:center"><span style="font-size:clamp(40px,11vw,60px)">${RB[w]||CVCE[w]||''}</span>${wordH(w,'clamp(32px,9vw,48px)')}</div>`,tiles:shuffle([...w,...extra(w,2)]),intro:['P_copy_word',300,W(w),300,'P_tile_build'],again:[W(w)],cap:`Build the word "${w}"`,onDone:ok=>{L(ok);say([W(w)],w+'!').then(()=>roundDone(ok))}})};

/* ---- sentence builder: word tiles in order, then the capital letter, then the full stop ---- */
ACT.sentbuild=(n)=>{const si=deck('sb',CSENT.map((_,i)=>i)),words=CSENT[si].split(' '),low=words.map((x,i)=>i===0&&x!=='I'?x.toLowerCase():x);const L=once(ok=>learnN(n,ok));let pos=0,wrong=false,miss=0,step=0;
  if(window.__TRACE)window.__TRACE.push({g:'sentbuild',cap:CSENT[si],items:low.slice(),ans:CSENT[si]+'.'});
  body().innerHTML=`<button class="pill-btn hearbtn" id="bh" style="position:static;transform:none">${ICON.ear} Hear it</button><div class="slots sb" id="sbs"></div><div class="tiles2" id="tl"></div>`;
  const slots=$('sbs');const hear=()=>say(['CSN_'+si],'Listen, then put the words in order.');$('bh').onclick=()=>{FX.tap();hear()};
  shuffle(low.map(x=>x)).forEach(x=>{const b=document.createElement('button');b.className='ltile wt';b.textContent=x;
    b.onclick=()=>{if(b.disabled||step)return;
      if(x===low[pos]){b.disabled=true;b.classList.remove('nd-hint');b.classList.add('used');const s=document.createElement('button');s.className='ltile wt placed';s.textContent=x;slots.appendChild(s);pos++;FX.tick(pos);if(pos===low.length)capStep()}
      else{wrong=true;miss++;FX.boing();anim(b,'wiggle',500);if(NEWUI&&miss>=2)ndHint([...$('tl').children].find(y=>!y.disabled&&y.textContent===low[pos]));say(['P_listen_again','CSN_'+si],'Listen again.')}};
    $('tl').appendChild(b)});
  function capStep(){step=1;const first=slots.firstChild;$('tl').innerHTML='';if(low[0]===words[0]){stopStep();return}
    say(['P_sb_cap'],'A sentence starts with a big letter. Tap the first word.');if(NEWUI)ndHint(first);
    first.onclick=()=>{if(step!==1)return;first.textContent=words[0];first.classList.remove('nd-hint');FX.chime();stopStep()};
    [...slots.children].slice(1).forEach(o=>{o.onclick=()=>{if(step===1){wrong=true;FX.boing();anim(o,'wiggle',500)}}})}
  function stopStep(){step=2;say(['P_sb_stop'],'Now add the full stop.');
    ['.','?',','].forEach(c=>{const b=document.createElement('button');b.className='ltile';b.textContent=c;b.setAttribute('aria-label',c==='.'?'full stop':c==='?'?'question mark':'comma');
      b.onclick=()=>{if(step!==2)return;if(c==='.'){step=3;const s=document.createElement('span');s.className='ltile wt placed';s.textContent='.';slots.appendChild(s);b.disabled=true;FX.chime();burst(slots,16);L(!wrong);say([300,'CSN_'+si,250,rnd(PRAISE)],CSENT[si]+'.').then(()=>roundDone(!wrong))}
        else{wrong=true;FX.boing();anim(b,'wiggle',500)}};$('tl').appendChild(b)})}
  RUN.prompt=hear;say(['P_sb_order',300,'CSN_'+si],'Listen, then put the words in order.')};

/* ---- number path race: a numbered board game against Haathi. Moving and saying the numbers is the point; nobody is marked down for losing ---- */
ACT.race=(n)=>{const max=n.max||10,spinMax=max>10?3:2;let me=0,h=0,busy=false,over=false;
  body().innerHTML=`<div class="rc-wrap"><div class="rc-col${max>10?' big':''}"><div class="rc-starts"><span id="rc-s0">⭐</span><span id="rc-s1">🐘</span></div><div class="rc-board${max>10?' big':''}" id="rcb">${range(1,max).map(v=>`<div class="rc-sq${v===max?' end':''}" data-n="${v}"><b>${v}</b></div>`).join('')}</div></div><button class="rc-spin" id="rcs" aria-label="Spin">?</button></div>`;
  const sq=v=>body().querySelector(`.rc-sq[data-n="${v}"]`);const live=()=>RUN&&RUN.node===n&&document.body.contains($('rcb'));
  const place=()=>{body().querySelectorAll('.rc-tok').forEach(x=>x.remove());$('rc-s0').style.visibility=me?'hidden':'visible';$('rc-s1').style.visibility=h?'hidden':'visible';
    if(me)sq(me).insertAdjacentHTML('beforeend','<span class="rc-tok" aria-label="You">⭐</span>');if(h)sq(h).insertAdjacentHTML('beforeend','<span class="rc-tok h" aria-label="Haathi">🐘</span>')};
  const move=async(who,steps)=>{for(let k=0;k<steps;k++){if(!live())return;if((who?h:me)>=max)break;if(who)h++;else me++;const v=who?h:me;place();anim(sq(v),'bumpn',300);FX.tick(v);await sayRaw([N(v)],String(v));await sleep(220)}};
  const spinTo=v=>{const b=$('rcs');b.textContent=v;anim(b,'rcturn',600)};
  const end=win=>{over=true;if(win){FX.fanfare&&FX.chime();burst($('rcb'),18)}sayRaw([win?'P_race_win':'P_race_lose'],win?'You got there first! You win!':'I got there first this time. Well played!').then(()=>{if(live())roundDone(true)})};
  $('rcs').onclick=async()=>{if(busy||over)return;busy=true;$('rcs').disabled=true;const v=ri(1,spinMax);spinTo(v);await sleep(650);await move(0,v);if(!live())return;if(me>=max){end(true);return}
    await sayRaw(['P_race_me'],'My turn!');if(!live())return;const hv=Math.random()<.6?1:ri(1,spinMax);spinTo(hv);await sleep(650);await move(1,hv);if(!live())return;if(h>=max){end(false);return}
    busy=false;$('rcs').disabled=false;say(['P_race_you'],'Your turn! Tap the spinner.')};
  if(window.__TRACE)window.__TRACE.push({g:'race',cap:'First to '+max+' wins',items:['spin 1 to '+spinMax],ans:'reach '+max});
  RUN.prompt=()=>say(['P_race_start'],'First to the end wins! Tap the spinner.');RUN.prompt();place()};
ACT.race20=n=>ACT.race(Object.assign(n,{max:20}));

/* ---- roll the ladoo: tilt the phone (or hold a finger on the tray) to roll the ladoo to the right letter ---- */
ACT.roll=(n)=>{const pool=S.intro.length?S.intro:(n.pool&&n.pool.length?n.pool:['s']);const t=deck('roll',pool);const cw=rnd(WORDS[t]);
  const opts=shuffle([t,...shuffle(LET.filter(x=>x!==t&&SAME[t]!==x)).slice(0,2)]);
  if(window.__TRACE)window.__TRACE.push({g:'roll',cap:'Roll the ladoo to '+t,items:opts.slice(),ans:t});
  const canTilt=S.settings.tilt!==false&&ageR()>=4&&typeof DeviceOrientationEvent!=='undefined';const ask=canTilt&&typeof DeviceOrientationEvent.requestPermission==='function';
  body().innerHTML=`<div class="rl-tray" id="rlt">${opts.map((l,k)=>`<div class="rl-plate" data-v="${l}" style="left:calc(${(k*33.3+16.6).toFixed(1)}% - var(--rp)/2)">${l}</div>`).join('')}<div class="rl-ball" id="rlb"></div>${hasRec(t)?'':`<div class="cue rl-cue"><span class="em">${cw[1]}</span>${cw[0]}</div>`}${ask?'<button class="pill-btn small rl-tilt" id="rlp">📱 Tilt</button>':''}</div>`;
  const tray=$('rlt'),ball=$('rlb');const prompt=()=>say(hasRec(t)?['P_roll_ask',300,'R_'+t,400,'R_'+t]:['P_roll_ask_word',300,W(cw[0])],hasRec(t)?`Roll the ladoo to ${SHOW[t]}`:`Roll the ladoo to the first sound in "${cw[0]}"`);RUN.prompt=prompt;
  const rec1=once(ok=>recordLetter(t,ok,3,'roll'));let wrong=false,miss=0,locked=false,touched=false;
  const R=tray.getBoundingClientRect();let x=R.width/2-23,y=R.height*.56,vx=0,vy=0,tx=null,ty=null,gx=0,gy=0;
  const pt=e=>{const b=tray.getBoundingClientRect();tx=e.clientX-b.left;ty=e.clientY-b.top;touched=true};
  tray.onpointerdown=e=>{if(e.target.id==='rlp')return;pt(e);try{tray.setPointerCapture(e.pointerId)}catch(_){}};tray.onpointermove=e=>{if(tx!==null)pt(e)};tray.onpointerup=tray.onpointercancel=()=>{tx=ty=null};
  const ori=e=>{if(e.gamma==null||e.beta==null)return;touched=true;gx=Math.max(-1,Math.min(1,e.gamma/28));gy=Math.max(-1,Math.min(1,(e.beta-35)/28))};
  if(canTilt){window.addEventListener('deviceorientation',ori);if(ask)$('rlp').onclick=()=>{try{DeviceOrientationEvent.requestPermission().then(()=>{const b=$('rlp');if(b)b.remove()}).catch(()=>{})}catch(_){}}}
  const stop=()=>window.removeEventListener('deviceorientation',ori);
  const plates=[...tray.querySelectorAll('.rl-plate')];
  const loop=()=>{if(!RUN||RUN.node!==n||!document.body.contains(ball)){stop();return}
    if(!locked){let ax=gx*.5,ay=gy*.5;if(tx!==null){const dx=tx-(x+23),dy=ty-(y+23),d=Math.hypot(dx,dy)||1;ax+=dx/d*.45;ay+=dy/d*.45}
      vx=(vx+ax)*.94;vy=(vy+ay)*.94;x+=vx;y+=vy;const W2=tray.clientWidth-46,H2=tray.clientHeight-46;
      if(x<0){x=0;vx=-vx*.4}if(x>W2){x=W2;vx=-vx*.4}if(y<0){y=0;vy=-vy*.4}if(y>H2){y=H2;vy=-vy*.4}
      ball.style.transform=`translate(${x.toFixed(1)}px,${y.toFixed(1)}px)`;
      for(const p of plates){const cx=p.offsetLeft+p.offsetWidth/2,cy=p.offsetTop+p.offsetHeight/2;if(Math.hypot(cx-(x+23),cy-(y+23))<p.offsetWidth*.39){
        if(p.dataset.v===t){locked=true;rec1(!wrong);p.classList.add('right');FX.chime();burst(p,16);stop();say([...(hasRec(t)?['P_that_letter_says','R_'+t]:[W(KEYW(t)[0])]),250,rnd(PRAISE)],`Yes! ${t} for ${KEYW(t)[0]}!`).then(()=>roundDone(!wrong))}
        else if(!p._hit){p._hit=1;wrong=true;miss++;rec1(false);FX.boing();anim(p,'wiggle',500);vy=4;vx=-vx;y+=26;setTimeout(()=>{p._hit=0},700);if(NEWUI&&miss>=2)plates.forEach(q=>{if(q.dataset.v===t)q.classList.add('nd-hintb')});say([rnd(RETRY),300,...sndOf(t)],'Try another plate!',{slow:true})}
        break}}}
    requestAnimationFrame(loop)};
  ball.style.transform=`translate(${x}px,${y}px)`;requestAnimationFrame(loop);setTimeout(prompt,300);
  if(RUN.round===0){const r=RUN;setTimeout(()=>{if(RUN===r&&RUN.node===n&&!touched&&document.body.contains(ball))say(['P_roll_hint'],'Hold your finger where the ladoo should go.')},7000)}};

/* ---- say it, hear it: the child says the word and hears Haathi, then their own voice. Played once and thrown away; never stored or sent ---- */
const micOn=()=>!!(S.settings&&S.settings.mic)&&!!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia&&window.MediaRecorder);
let sayRec=null;
async function sayIt(model,capText){if(sayRec)return;stopVoice();let stream;
  try{stream=await navigator.mediaDevices.getUserMedia({audio:true})}catch(e){S.settings.mic=false;save();if($('cap'))$('cap').textContent='The microphone is off. A grown-up can switch it on in Grown-ups.';return}
  const chunks=[];let rec;try{rec=new MediaRecorder(stream)}catch(e){stream.getTracks().forEach(t=>t.stop());return}
  sayRec=rec;const ov=document.createElement('div');ov.id='sayit';ov.innerHTML='<button class="si-btn" aria-label="Stop recording">🎤</button><p>Say it now!</p>';document.body.appendChild(ov);
  const stop=()=>{try{if(rec.state==='recording')rec.stop()}catch(e){}};ov.querySelector('button').onclick=stop;const tm=setTimeout(stop,3500);
  rec.ondataavailable=e=>{if(e.data&&e.data.size)chunks.push(e.data)};
  rec.onstop=async()=>{clearTimeout(tm);stream.getTracks().forEach(t=>t.stop());ov.remove();sayRec=null;const url=URL.createObjectURL(new Blob(chunks,{type:rec.mimeType||'audio/webm'}));
    await sayRaw(['P_sayit_listen',250,...model],capText||null,{slow:vSpeed()<1});try{const a=new Audio(url);a.onended=()=>URL.revokeObjectURL(url);await a.play()}catch(e){URL.revokeObjectURL(url)}};
  try{rec.start()}catch(e){stop();ov.remove();sayRec=null}}
const sayItAct=(model,cap)=>micOn()?[['star','🎤 Say it',()=>sayIt(model,cap)]]:[];

/* ---- start screen: Haathi and one button. Sharing and installing live in Grown-ups. Two or more children pick their name ---- */
function r2Who(){const b=$('btn-who');if(!b)return;b.hidden=true;const k=kidsIdx();let row=$('who-row');if(!row){row=document.createElement('div');row.id='who-row';row.className='who-row';b.parentNode.insertBefore(row,b)}row.innerHTML='';
  if(k.list.length<2)return;k.list.forEach(c=>{const nm=(c.name||'Child').replace(/</g,'');const x=document.createElement('button');x.className='whob'+(c.id===k.active?' on':'');x.innerHTML=`<b>${nm.slice(0,1).toUpperCase()}</b><span>${nm}</span>`;x.setAttribute('aria-label','Play as '+nm);
    x.onclick=()=>{FX.tap();if(c.id===k.active)begin();else switchKid(c.id)};row.appendChild(x)})}
{const sp=$('btn-share')&&$('btn-share').closest('.panel');if(sp&&$('btn-install')){sp.appendChild($('btn-install'));sp.appendChild($('install-help'))}const ss=$('btn-share-start');if(ss)ss.hidden=true}

/* ======================= RELEASE 3: the "Improve" changes of the full review ======================= */
/* A press that moves more than 10 px becomes a drag; anything shorter stays a tap, so every game here works both ways. */
function dragTo(el,sel,onDrop){let st=null,drag=false;el.style.touchAction='none';el.classList.add('dragme');
  const reset=()=>{st=null;drag=false;el.classList.remove('dragging');el.style.transform=''};
  el.addEventListener('pointerdown',e=>{if(el.disabled)return;st=[e.clientX,e.clientY];drag=false;try{el.setPointerCapture(e.pointerId)}catch(_){}});
  el.addEventListener('pointermove',e=>{if(!st)return;const dx=e.clientX-st[0],dy=e.clientY-st[1];if(!drag&&Math.hypot(dx,dy)<10)return;drag=true;el.classList.add('dragging');el.style.transform=`translate(${dx}px,${dy}px) scale(1.08)`});
  el.addEventListener('pointerup',e=>{if(!st)return;const was=drag;reset();if(!was)return;el._dragged=Date.now();
    const pe=el.style.pointerEvents;el.style.pointerEvents='none';const hit=document.elementFromPoint(e.clientX,e.clientY);el.style.pointerEvents=pe;onDrop(hit&&hit.closest?hit.closest(sel):null)});
  el.addEventListener('pointercancel',reset)}
const justDragged=el=>!!el._dragged&&Date.now()-el._dragged<400;

/* ---- Sound baskets and Colour baskets: drag the thing into the basket, or tap the basket ---- */
ACT.sortsound=()=>{let pool=LP().filter(l=>WORDS[l].length>=2);if(pool.length<2)pool=['s','m','t','p'];const a=fresh('sort',pool);const b=rnd(pool.filter(x=>x!==a&&SAME[a]!==x));
  const pics=shuffle([...shuffle(WORDS[a]).slice(0,2).map(w=>[w,a]),...shuffle(WORDS[b]).slice(0,2).map(w=>[w,b])]);let k=0,wrong=false,tried=false,miss=0;
  body().innerHTML=`<div class="pic" id="sp"></div><div class="baskets">${[a,b].map(l=>`<button class="basket" data-l="${l}"><b>${l}</b><span>🧺</span><i></i></button>`).join('')}</div>`;
  const bks=()=>[...body().querySelectorAll('.basket')];
  const show=()=>{const p=$('sp');if(!p)return;tried=false;miss=0;p.textContent=pics[k][0][1];p.dataset.l=pics[k][1];anim(p,'dance',500);say([W(pics[k][0][0])],pics[k][0][0])};
  RUN.prompt=()=>say(['P_sort_sound'],'Drag or tap: put each picture in the basket that starts the same way!').then(()=>{if(alive('sortsound')&&k<pics.length)show()});RUN.prompt();
  const put=bk=>{if(k>=pics.length)return;const [w,l]=pics[k];const ok=bk.dataset.l===l;if(!tried){tried=true;recordLetter(l,ok,2,'sortsound')}
    if(ok){bks().forEach(x=>x.classList.remove('nd-hint'));FX.chime();bk.querySelector('i').textContent+=w[1];k++;
      if(k>=pics.length){$('sp').textContent='';burst(bk,14);learnN(RUN.node,!wrong);say([rnd(PRAISE)],'All sorted!').then(()=>roundDone(!wrong))}else show()}
    else{wrong=true;miss++;FX.boing();anim(bk,'wiggle',500);if(NEWUI&&miss>=2)ndHint(bks().find(x=>x.dataset.l===l));say(['P_listen_again',W(w[0])],'Listen again: '+w[0])}};
  bks().forEach(bk=>bk.onclick=()=>put(bk));dragTo($('sp'),'.basket',bk=>{if(bk)put(bk)})};
ACT.sortcolour=(n)=>{const CL=[['red','#e2563f'],['blue','#147a8a'],['yellow','#f6a821'],['green','#2f8a5f'],['purple','#8a5cc2']];const two=shuffle(CL).slice(0,2);const ks=Object.keys(SHAPES);
  const items=shuffle([0,1,2,3,4,5].map(i=>({c:two[i%2],k:rnd(ks)})));let k=0,wrong=false,miss=0;
  body().innerHTML=`<div class="shape" id="cur" style="width:120px"></div><div class="baskets">${two.map(c=>`<button class="basket" data-c="${c[0]}" style="border-color:${c[1]}"><b style="background:${c[1]};color:#fff">${c[0]}</b><span>🧺</span><i></i></button>`).join('')}</div>`;
  const bks=()=>[...body().querySelectorAll('.basket')];
  const show=()=>{const e=$('cur');if(!e)return;miss=0;e.innerHTML=shapeSVG(items[k].k,items[k].c[1]);e.dataset.c=items[k].c[0]};show();
  RUN.prompt=()=>say(['P_sort_colour'],'Drag or tap: put each one in the basket with the same colour!');RUN.prompt();
  const put=bk=>{if(k>=items.length)return;
    if(bk.dataset.c===items[k].c[0]){bks().forEach(x=>x.classList.remove('nd-hint'));FX.chime();bk.querySelector('i').innerHTML+=`<span style="display:inline-block;width:22px;height:22px">${shapeSVG(items[k].k,items[k].c[1])}</span>`;k++;
      if(k>=items.length){$('cur').innerHTML='';learnN(n,!wrong);burst(bk,14);say([rnd(PRAISE)],'All sorted!').then(()=>roundDone(!wrong))}else show()}
    else{wrong=true;miss++;FX.boing();anim(bk,'wiggle',500);if(NEWUI&&miss>=2)ndHint(bks().find(x=>x.dataset.c===items[k].c[0]))}};
  bks().forEach(bk=>bk.onclick=()=>put(bk));dragTo($('cur'),'.basket',bk=>{if(bk)put(bk)})};

/* ---- Numbers in order: the numbers go into a line, by dragging or tapping ---- */
ACT.order=(n)=>{const top=n.max;let nxt=1,wrong=false,miss=0;const nums=shuffle(range(1,top));
  if(window.__TRACE)window.__TRACE.push({g:'order',cap:'numbers in a line',items:nums.slice(),ans:String(top)});
  body().innerHTML=`<div class="oline${top>10?' many':''}" id="ol">${range(1,top).map(()=>'<span class="ol-s"></span>').join('')}</div><div class="numgrid${top>10?' many':''}" id="ng"></div>`;
  nums.forEach(v=>{const b=document.createElement('button');b.className='pcard num small';b.textContent=v;b.dataset.v=v;
    const pick=()=>{if(b.classList.contains('gone')||nxt>top)return;
      if(v===nxt){miss=0;[...$('ng').children].forEach(x=>x.classList.remove('nd-hint'));const sl=$('ol').children[v-1];sl.textContent=v;sl.classList.add('in');anim(sl,'dance',400);b.classList.add('gone');b.disabled=true;FX.tick(v);say([N(v)],String(v));nxt++;
        if(nxt>top){learnN(n,!wrong);FX.fanfare();say([500,'P_well_counted'],'Great counting!').then(()=>roundDone(!wrong))}}
      else{wrong=true;miss++;FX.boing();anim(b,'wiggle',500);if(NEWUI&&miss>=2)ndHint([...$('ng').children].find(x=>+x.dataset.v===nxt));say(['P_rocket_hint',N(nxt)],`Find ${nxt}`)}};
    b.onclick=()=>{if(justDragged(b))return;pick()};dragTo(b,'#ol',t=>{if(t)pick()});$('ng').appendChild(b)});
  RUN.prompt=()=>say(['P_order_line'],'Put the numbers in a line. Drag them or tap them. Start at 1!');RUN.prompt()};

/* ---- Rhyme time by ear: Haathi names every picture; the written words come only after the answer ---- */
const RPIC=Object.assign({},CVCE,{pen:'🖊️',hen:'🐔',bug:'🐛',mug:'☕',hug:'🤗',cap:'🧢',fox:'🦊',box:'📦',king:'🤴',ring:'💍',ball:'⚽',wall:'🧱',cake:'🎂',lake:'🏞️'});
const RHY2=[['cat','hat','bat','rat'],['dog','log'],['nut','hut'],['pen','hen','ten'],['bug','mug','hug'],['cap','map'],['fox','box'],['king','ring'],['ball','wall'],['cake','lake']];
ACT.rhyme=()=>{const fam=fresh('rhy',RHY2);const [t,ans]=shuffle(fam).slice(0,2);const rime=w=>w.slice(1);
  const items=shuffle([ans,...shuffle(Object.keys(RPIC).filter(w=>rime(w)!==rime(t))).slice(0,nopt()-1)]);
  const bump=k=>()=>{const e=$('pk')&&$('pk').children[k];if(e)anim(e,'dance',600)};
  const word=w=>`<span class="rw">${picH(RPIC[w])}<b>${w[0]}<u>${rime(w)}</u></b></span>`;
  pickRound({top:bigShow(picH(RPIC[t])),items:items.map(w=>({h:picH(RPIC[w]),v:w,label:w})),ans,
    say:['P_rhyme',W(t),400,...items.flatMap((w,k)=>[bump(k),W(w),350])],cap:'Listen. Which one rhymes?',
    onRight:()=>{const sc=body().querySelector('.showcard');if(sc)sc.innerHTML=`<div class="rhy-words">${word(t)}${word(ans)}</div>`},
    right:[W(t),W(ans),250,'P_rhymes_yes'],rightCap:`${t}, ${ans}. They rhyme!`,wrong:it=>[W(it.v),W(t),300,'P_listen_again']})};

/* ---- Sight words: with the microphone switched on, the child says the word and hears it back ---- */
ACT.sight=()=>{const t=deck('sw',SIGHT);const sim=SIGHT.filter(x=>x!==t).sort((a,b)=>(Math.abs(a.length-t.length)-(a[0]===t[0]?1:0))-(Math.abs(b.length-t.length)-(b[0]===t[0]?1:0)));
  const opts=shuffle([t,...shuffle(sim.slice(0,6)).slice(0,nopt()-1)]);
  pickRound({items:opts.map(w=>({h:wordH(w),v:w,label:w})),ans:t,say:['P_r_sight',300,'SW_'+t],cap:'Find the word you hear.',right:['SW_'+t,250,rnd(PRAISE)],rightCap:`Yes! "${t}"`,wrong:it=>['SW_'+it.v,300,'P_listen_again','SW_'+t],
    after:micOn()?next=>{body().innerHTML=bigShow(wordH(t,'clamp(44px,13vw,72px)'));RUN.prompt=()=>say(['P_sayit_go'],'Tap the red button and say it!');RUN.prompt();
      actions([...sayItAct(['SW_'+t],t),['go','Next',()=>{actions([]);next()},ICON.next]])}:null})};

/* ---- Number line: slide Haathi along the line (finger or tilt), or tap the spot ---- */
ACT.nlplace=(n)=>{const M=n.max,step=M>20?10:1;const marks=[];for(let v=0;v<=M;v+=step)marks.push(v);const lab=v=>v===0||v===M||(M<=10?v%5===0:M<=20?v%5===0:v%50===0);
  const t=fresh('nl'+M,marks.filter(v=>!lab(v)));let wrong=false,miss=0,done=false;const L=once(ok=>learnN(n,ok));const last=marks.length-1;
  if(window.__TRACE)window.__TRACE.push({g:'nlplace',cap:'number line',items:marks.slice(),ans:String(t)});
  const canTilt=S.settings.tilt!==false&&ageR()>=4&&typeof DeviceOrientationEvent!=='undefined';const ask=canTilt&&typeof DeviceOrientationEvent.requestPermission==='function';
  body().innerHTML=`<div class="showcard">${numH(t)}</div><div class="nline nl2" id="nl"><div class="nl-bar"></div><button class="nl-h" id="nlh" aria-label="Slide Haathi along the line">🐘</button></div><div class="nl-x" id="nlx">${ask?'<button class="pill-btn small" id="nlp">📱 Tilt</button>':''}</div>`;
  const H=$('nlh');let pos=0,dragging=false,sx=0,movedPx=0,g=0,tiltSeen=false;
  const ori=e=>{if(e.gamma==null)return;g=Math.max(-1,Math.min(1,e.gamma/26));if(!tiltSeen&&Math.abs(e.gamma)>.01){tiltSeen=true;const x=$('nlx');if(x&&!$('nlq')){const b=document.createElement('button');b.className='big-btn go';b.id='nlq';b.textContent='Here!';b.onclick=()=>{FX.tap();judge(Math.round(pos*last))};x.appendChild(b)}}};
  const stop=()=>window.removeEventListener('deviceorientation',ori);
  const ticks=marks.map((v,i)=>{const b=document.createElement('button');b.className='nl-tick';b.dataset.v=v;b.style.left=(6+i/last*88)+'%';b.innerHTML=`<i></i><span>${lab(v)?v:''}</span>`;b.setAttribute('aria-label','spot '+i);b.onclick=()=>judge(i);$('nl').appendChild(b);return b});
  const place=p=>{pos=Math.max(0,Math.min(1,p));H.style.left=(6+pos*88)+'%';const i=Math.round(pos*last);ticks.forEach((x,k)=>x.classList.toggle('near',k===i));return i};
  function judge(i){if(done)return;const b=ticks[i],v=marks[i];place(i/last);const ok=v===t;L(ok);
    if(ok){done=true;stop();ticks.forEach(x=>x.classList.remove('nd-hint'));b.classList.add('right');b.querySelector('span').textContent=v;FX.chime();burst(b,12);say([N(t),250,rnd(PRAISE)],`${t} goes here!`).then(()=>roundDone(!wrong))}
    else{wrong=true;miss++;FX.boing();anim(b,'wiggle',500);b.querySelector('span').textContent=v;b.classList.add('miss');if(NEWUI&&miss>=2)ndHint(ticks[marks.indexOf(t)]);say([N(v),300,'P_try_again_nl'],`That spot is ${v}. Try again!`)}}
  const at=e=>{const r=$('nl').getBoundingClientRect();return((e.clientX-r.left)/r.width-.06)/.88};
  H.onpointerdown=e=>{if(done)return;dragging=true;sx=e.clientX;movedPx=0;try{H.setPointerCapture(e.pointerId)}catch(_){}H.classList.add('dragging')};
  H.onpointermove=e=>{if(!dragging)return;movedPx=Math.max(movedPx,Math.abs(e.clientX-sx));if(movedPx>6)place(at(e))};
  H.onpointerup=e=>{if(!dragging)return;dragging=false;H.classList.remove('dragging');if(movedPx>6)judge(place(at(e)))};
  H.onpointercancel=()=>{dragging=false;H.classList.remove('dragging')};
  if(canTilt){window.addEventListener('deviceorientation',ori);if(ask)$('nlp').onclick=()=>{try{DeviceOrientationEvent.requestPermission().then(()=>{const b=$('nlp');if(b)b.remove()}).catch(()=>{})}catch(_){}};
    let lt=0;const loop=ts=>{if(!RUN||RUN.node!==n||!document.body.contains(H)){stop();return}const dt=Math.min(.05,(ts-lt)/1000||0);lt=ts;if(tiltSeen&&!dragging&&!done&&Math.abs(g)>.08)place(pos+g*.55*dt);requestAnimationFrame(loop)};requestAnimationFrame(loop)}
  place(0);RUN.prompt=()=>say(['P_nl_slide',300,N(t)],`Where does ${t} go? Slide Haathi there, or tap the spot.`);RUN.prompt()};

/* ---- Equal groups: from age 7 every second round is a times-table fact without pictures ---- */
const groupsPic=ACT.groups;
ACT.groups=(n,round)=>{if(!(ageR()>=7&&round%2===1))return groupsPic(n,round);
  const tb=rnd([2,5,10]),g=fresh('tt'+tb,range(1,n.max<=3?5:10)),ans=tb*g;let wrong=false;const L=once(ok=>learnN(n,ok));
  if(window.__TRACE)window.__TRACE.push({g:'groups',cap:`${g} × ${tb}`,items:[g,tb],ans:String(ans)});
  body().innerHTML=`<div class="eqn tt"><span>${g}</span>×<span>${tb}</span>=<span id="tta">?</span></div><div class="ttrow" id="ttr">${range(1,g).map(i=>`<span class="cell">${i*tb}</span>`).join('')}</div><div class="choices" id="nc"></div>`;
  RUN.prompt=()=>say([N(g),'P_times',N(tb)],`${g} × ${tb} = ?`);RUN.prompt();
  numChoices(ans,ans+tb,$('nc'),(b,v)=>{const ok=v===ans;L(ok);
    if(ok){b.classList.add('right');$('tta').textContent=ans;$('ttr').classList.add('show');FX.chime();say([N(g),'P_times',N(tb),'P_makes',N(ans)],`${g} × ${tb} = ${ans}`).then(()=>roundDone(!wrong))}
    else{wrong=true;FX.boing();anim(b,'wiggle',500);$('ttr').classList.add('show');say(['P_skip_hint'],`Count in ${tb}s: `+range(1,g).map(i=>i*tb).join(', '))}},tb)};

/* ---- Story sums: with pictures, the child can act the story out by moving the things (drag or tap) ---- */
ACT.story=(n)=>{const i=deck('sty',STORIES.map((_,k)=>k));const [t,e,a,op,b]=STORIES[i];const ans=op==='+'?a+b:a-b;let wrong=false,moved=0;const L=once(ok=>learnN(n,ok));
  const sz=a+b>14?'s5':'s4',pic=lv('story')<1,plus=op==='+';
  if(window.__TRACE)window.__TRACE.push({g:'story',cap:t,items:[a,op,b],ans:String(ans)});
  const mv=k=>`<button class="mv" data-k="${k}">${objHTML(e,k,0,sz)}</button>`,st=k=>objHTML(e,k,0,sz);
  const badge=`<div class="act-n" id="an">${a}</div>`;const pics=!pic?'':plus?`<div class="eqn act"><div class="grp" id="ga">${badge}${range(0,a-1).map(st).join('')}</div><div class="grp from" id="gb">${range(a,a+b-1).map(mv).join('')}</div></div>`
    :`<div class="eqn act"><div class="grp" id="ga">${badge}${range(0,a-1).map(mv).join('')}</div><div class="grp away" id="gb"></div></div>`;
  body().innerHTML=`<div class="card-note" style="font-size:clamp(18px,4.8vw,24px);max-width:560px"><b>${t}</b></div>${pics}<div class="choices" id="nc"></div>`;
  const left=()=>[...body().querySelectorAll('.mv:not(.done)')];
  if(pic){const go=m=>{if(!m||m.classList.contains('done'))return;if(moved>=b){anim(m,'wiggle',400);FX.boing();return}
      moved++;m.classList.add('done');m.classList.remove('nd-hint');m.disabled=true;$(plus?'ga':'gb').appendChild(m);const now=plus?a+moved:a-moved;$('an').textContent=now;anim($('an'),'dance',400);FX.tick(moved);say([N(now)],String(now))};
    left().forEach(m=>{m.onclick=ev=>{ev.stopPropagation();if(justDragged(m))return;go(m)};dragTo(m,plus?'#ga':'#gb',t2=>{if(t2)go(m)})});
    /* small fingers: tapping the pile itself moves the next one */
    $(plus?'gb':'ga').onclick=()=>go(left()[0])}
  RUN.prompt=()=>say(['STY_'+i,...(pic&&RUN.round===0?[300,'P_story_act']:[])],t);RUN.prompt();
  numChoices(ans,Math.max(a,ans)+3,$('nc'),(bt,v)=>{const ok=v===ans;L(ok);if(ok){bt.classList.add('right');FX.chime();say([N(ans),250,rnd(PRAISE)],`${a} ${plus?'+':'−'} ${b} = ${ans}`).then(()=>roundDone(!wrong))}
    else{wrong=true;FX.boing();anim(bt,'wiggle',500);if(pic&&moved<b)ndHint(left()[0],true);say(['P_story_hint'],plus?'More means add. Put them together.':'Away or left means take away.')}},0)};

/* ---- Magic slate grows into a small Make sandbox: chalk, rangoli, stamps and shapes ---- */
ACT.slate=()=>{const cols=['#ffffff','#ffe066','#ff9ac1','#9be89b','#8fd3ff'];let col=cols[0],tool='draw';
  const TOOLS=[['draw','✏️','Draw'],['rangoli','✨','Rangoli'],['s⭐','⭐','Star stamp'],['s🌸','🌸','Flower stamp'],['s🐘','🐘','Elephant stamp'],['s🦋','🦋','Butterfly stamp'],['hcircle','◯','Circle'],['hsquare','▢','Square'],['htri','△','Triangle']];
  body().innerHTML=`<div class="slatebar" id="sb"></div><div class="slatebar tools" id="st"></div><div class="lw-wrap slate"><canvas id="lw"></canvas></div>`;
  $('sb').innerHTML=cols.map((cc,i)=>`<button class="chalk ${i?'':'on'}" style="background:${cc}" data-c="${cc}" aria-label="chalk colour"></button>`).join('');
  $('st').innerHTML=TOOLS.map(([id,ic,lab],i)=>`<button class="stool ${i?'':'on'}" data-t="${id}" aria-label="${lab}">${ic}</button>`).join('');
  const c=$('lw'),wrap=c.parentElement,dpr=Math.min(2,devicePixelRatio||1);const Wd=Math.max(220,Math.min(wrap.clientWidth-8,640)),Hd=Math.max(180,Math.min(wrap.clientHeight-8,480));
  c.style.width=Wd+'px';c.style.height=Hd+'px';c.width=Wd*dpr;c.height=Hd*dpr;const x=c.getContext('2d');if(!x)return;x.setTransform(dpr,0,0,dpr,0,0);const cx=Wd/2,cy=Hd/2;
  $('sb').querySelectorAll('.chalk').forEach(b=>b.onclick=()=>{col=b.dataset.c;$('sb').querySelectorAll('.chalk').forEach(z=>z.classList.remove('on'));b.classList.add('on');FX.tap()});
  $('st').querySelectorAll('.stool').forEach(b=>b.onclick=()=>{tool=b.dataset.t;$('st').querySelectorAll('.stool').forEach(z=>z.classList.remove('on'));b.classList.add('on');FX.tap();
    if(tool==='rangoli'){x.globalAlpha=1;x.fillStyle=col;x.beginPath();x.arc(cx,cy,4,0,Math.PI*2);x.fill();say(['P_rangoli'],'Rangoli! Draw a line and watch it bloom all around.')}});
  const seg=(p,q)=>{x.strokeStyle=col;x.lineCap='round';x.globalAlpha=.9;
    if(tool!=='rangoli'){x.lineWidth=7;x.beginPath();x.moveTo(p[0],p[1]);x.lineTo(q[0],q[1]);x.stroke();return}
    x.lineWidth=4;for(let k=0;k<8;k++){const an=k*Math.PI/4,c2=Math.cos(an),s2=Math.sin(an);for(const m of [1,-1]){const f=pt=>{const dx=(pt[0]-cx)*m,dy=pt[1]-cy;return[cx+dx*c2-dy*s2,cy+dx*s2+dy*c2]};const p2=f(p),q2=f(q);x.beginPath();x.moveTo(p2[0],p2[1]);x.lineTo(q2[0],q2[1]);x.stroke()}}};
  const stampAt=p=>{x.globalAlpha=1;if(tool[0]==='s'){x.font='48px serif';x.textAlign='center';x.textBaseline='middle';x.fillText(tool.slice(1),p[0],p[1])}
    else{const r=30;x.strokeStyle=col;x.lineWidth=6;x.lineJoin='round';x.beginPath();if(tool==='hcircle')x.arc(p[0],p[1],r,0,Math.PI*2);else if(tool==='hsquare')x.rect(p[0]-r,p[1]-r,r*2,r*2);else{x.moveTo(p[0],p[1]-r);x.lineTo(p[0]+r,p[1]+r*.8);x.lineTo(p[0]-r,p[1]+r*.8);x.closePath()}x.stroke()}FX.tick(1)};
  let down=false,last=null;const pos=e=>{const r=c.getBoundingClientRect();return[(e.clientX-r.left)*(Wd/r.width),(e.clientY-r.top)*(Hd/r.height)]};
  c.onpointerdown=e=>{try{c.setPointerCapture(e.pointerId)}catch(_){}if(tool==='draw'||tool==='rangoli'){down=true;last=pos(e)}else stampAt(pos(e))};
  c.onpointermove=e=>{if(!down)return;const p=pos(e);seg(last,p);last=p};c.onpointerup=c.onpointercancel=()=>{down=false};
  window.__slate={tool:()=>tool};
  RUN.prompt=()=>say(['P_slate'],'Draw anything you like on your slate!');RUN.prompt();
  actions([['soft','Wipe clean',()=>{x.clearRect(0,0,Wd,Hd);FX.swish()}],['go',"I'm done",()=>roundDone(true),ICON.check]])};

/* ---- Label the picture and Write the missing word: tiles first, then the word is written once ---- */
const writeOnce=(n,w,header,ok1,capDone)=>writeGlyph(wordGlyph(w),{w:56*w.length+20,mode:'own',header,intro:['P_now_write'],cap:`Now write it once: ${w}`,lines:true,
  done:ok=>{learnN(n,ok&&ok1);say([W(w),250,rnd(PRAISE)],capDone).then(()=>roundDone(ok&&ok1))}});
ACT.wlabel=(n)=>{const pool=RWORDS.filter(w=>w.length<=(lv('read')>=1?5:4));const w=deck('wl'+pool.length,pool);const r=RUN;
  tileWord({w,header:`<span style="font-size:clamp(50px,14vw,76px);line-height:1">${RB[w]}</span>`,tiles:shuffle([...w,...others(ALPHA.filter(c=>!w.includes(c)),'',2)]),intro:['P_label_tiles'],again:[W(w)],cap:'What is this? Build its name with the tiles.',
    onDone:ok1=>say([400,W(w)],w).then(()=>{if(RUN!==r||!alive('wlabel'))return;writeOnce(n,w,`<div class="wo-head"><span style="font-size:clamp(34px,9vw,50px);line-height:1">${RB[w]}</span>${wordH(w,'clamp(30px,8vw,44px)')}</div>`,ok1,w+'!')})})};
ACT.wfill=(n)=>{const pool=RWORDS.filter(x=>x.length<=4&&!/^[aeiou]/.test(x));const w=deck('wfl',pool);const s0=rnd(FILLS);const r=RUN;let wrong=false,miss=0,busy=false;
  const opts=shuffle([w,...shuffle(pool.filter(x=>x!==w&&x[0]!==w[0])).slice(0,2)]);
  if(window.__TRACE)window.__TRACE.push({g:'wfill',cap:`${s0} ___.`,items:opts.slice(),ans:w});
  const head=f=>`<div class="wf-s">${s0} <u>${f||'&nbsp;?&nbsp;'}</u>. <span style="font-size:1.4em">${RB[w]}</span></div>`;
  body().innerHTML=head()+`<div class="tiles2" id="tl"></div>`;
  opts.forEach(o=>{const b=document.createElement('button');b.className='ltile wt';b.textContent=o;
    b.onclick=()=>{if(busy)return;if(o===w){busy=true;[...$('tl').children].forEach(x=>x.classList.remove('nd-hint'));b.classList.add('used');body().querySelector('.wf-s u').textContent=w;FX.chime();
        say([W(w)],`${s0} ${w}.`).then(()=>{if(RUN!==r||!alive('wfill'))return;writeOnce(n,w,head(w),!wrong,`${s0} ${w}.`)})}
      else{wrong=true;miss++;FX.boing();anim(b,'wiggle',500);if(NEWUI&&miss>=2)ndHint([...$('tl').children].find(x=>x.textContent===w));say([W(o),300,'P_listen_again'],'Try another word.')}};
    $('tl').appendChild(b)});
  RUN.prompt=()=>say(['P_fill_tile'],`${s0} ___. Which word is missing? Tap it.`);RUN.prompt()};
Object.assign(ROUNDS,{wlabel:3,wfill:3});

/* ======================= RELEASE 4: rewritten stories and the new story reader =======================
   On for everyone. Opening the app once with ?stories=old brings back the original 54 stories on that phone (emergency fallback); ?stories=new undoes that. */
const ST_PILOT=(()=>{try{const q=new URLSearchParams(location.search).get('stories');if(q==='new')localStorage.removeItem('haathi-stories-pilot');if(q==='old')localStorage.setItem('haathi-stories-pilot','0');return localStorage.getItem('haathi-stories-pilot')!=='0'}catch(e){return true}})();
function stPilotMerge(){(window.HAATHI_STORIES_PILOT||[]).forEach(s=>{const i=BEDTIME.findIndex(x=>x.id===s.base||x.id===s.id);if(i>=0)BEDTIME[i]=s;else BEDTIME.push(s)});if(!$('s-corner').hidden&&$('corner-title').textContent==='Bedtime Stories')openStories()}
if(ST_PILOT){const sc=document.createElement('script');sc.src='stories/pilot.js';sc.onload=stPilotMerge;document.head.appendChild(sc)}
const stFx=new Audio();stFx.preload='auto';
const stArt=k=>{const f=(window.HAATHI_STORY_ART||{})[k];return f?f():''};
const stPagesOf=s=>s.v2?s.pages.filter(p=>!p.ask&&!p.ctx).length:s.pages.length;

/* one character or thing in a picture: emoji or :castkey, then @x,y,size and optional  < flip  ~move  #hidden-until  !tap-fires  %hidden-after  *look  =name */
function st2Sprite(s,tok,idx){const m=tok.match(/^(.*?)@([\d.]+),([\d.]+),([\d.]+)(.*)$/);if(!m)return'';
  const x=+m[2]*4,y=+m[3]*4.4,F=+m[4]*4.2;let who=m[1],flip=false,an='',grp='',trig='',hide='',label=null,cls='';
  m[5].replace(/([<~#!%=*])([^<~#!%=*]*)/g,(_,k,v)=>{if(k==='<')flip=true;else if(k==='~')an=v;else if(k==='#')grp=v;else if(k==='!')trig=v;else if(k==='%')hide=v;else if(k==='*')cls=v;else label=v;return''});
  let e=who,acc='',at='',name=label;
  if(who[0]===':'){const c=(s.cast||[]).find(c=>c.k===who.slice(1));if(c){e=c.e;acc=c.acc||'';at=c.at||'';if(label==null)name=c.n}}
  if(name==='-'||name==null)name='';
  /* a plain pole, for things emoji cannot show */
  if(who==='[stick]')return `<rect x="${x-F/2}" y="${y-4}" width="${F}" height="8" rx="4" fill="#8a6a3b"/><rect x="${x-F/2}" y="${y-4}" width="${F}" height="3" rx="1.5" fill="#a9865a"/>`;
  if(who==='[pole]')return `<rect x="${x-5}" y="${y-F/2}" width="10" height="${F}" rx="5" fill="#8a6a3b"/><rect x="${x-5}" y="${y-F/2}" width="4" height="${F}" rx="2" fill="#a9865a"/>`;
  const accH=acc?`<text x="${at==='top'?0:F*.46}" y="${at==='top'?-F*.5:F*.18}" font-size="${F*.46}" text-anchor="middle" dominant-baseline="central">${acc}</text>`:'';
  const tag=name?`<text class="tag" y="${Math.min(F*.62+9,432-y)}" text-anchor="middle">${name}</text>`:'';
  const attrs=(grp?` data-g="${grp}"`:'')+(trig?` data-tap="${trig}"`:'')+(hide?` data-h="${hide}"`:'');
  return `<g transform="translate(${x} ${y})"><g class="sp${an?' a-'+an:''}${cls?' c-'+cls:''}"${attrs} style="animation-delay:${((idx*7)%5)*.18}s">${trig?`<circle class="ring" r="${F*.62}"/>`:''}<text class="act" font-size="${F}" text-anchor="middle" dominant-baseline="central"${flip?' transform="scale(-1 1)"':''}>${e}</text>${accH}${tag}</g></g>`}
function scene2(s,i,thumb){let k=i;while(k>0&&s.pages[k]&&s.pages[k].ask)k--;const pg=s.pages[k]||{};const spec=pg.s||'';let inner='',night=false;
  if(spec.startsWith('v:'))inner=stArt(spec.slice(2));
  else{const [bg,acts]=spec.split('|');const [b,...adds]=(bg||'home').split('+');const B=bgSVG(b);night=B.night;
    inner=`<svg x="0" y="0" width="400" height="440" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">${B.svg}</svg>${addons(adds,B.night)}${(acts?acts.split(';'):[]).filter(Boolean).map((t,j)=>st2Sprite(s,t,j)).join('')}`}
  return `<div class="scene scene2${night?' nightscene':''}"><svg viewBox="0 0 400 440" preserveAspectRatio="xMidYMid ${thumb?'slice':'meet'}">${inner}</svg></div>`}
const st2Words=(t,cls)=>t.split(/(\s+)/).map(w=>!w?'':/^\s+$/.test(w)?w:`<span${cls||''}>${w}</span>`).join('');
const st2Text=(s,t)=>t.split(/(\{[^}]+\})/).map(seg=>seg[0]==='{'?st2Words(seg.slice(1,-1),` class="gw" data-w="${Object.keys(s.words).indexOf(seg.slice(1,-1))}"`):st2Words(seg)).join('');

const stRender1=stRender;
stRender=function(){const el=$('s-story'),v2=!!(SR&&SR.s.v2);el.classList.toggle('v2',v2);el.dataset.band=v2?SR.s.band.replace(/\D/g,''):'';stFx.pause();if(!v2)return stRender1();
  const {s,p}=SR,n=s.pages.length,pg=s.pages[p];el.classList.toggle('night',SR.night);$('st-title').textContent=s.title;SR.answered=false;SR.miss=0;
  $('st-night').textContent=SR.night?'🌙':'☀️';$('st-mode').textContent=SR.mode==='read'?'🔊 Read to me':'📖 I\'ll read';
  let pic,txt;
  if(p<0){pic=scene2(s,0);txt=`${s.series?`<div class="st-sub">${s.series} · Episode ${s.ep}</div>`:''}<div class="st-cover-title">${s.title}</div><div class="st-cast">${s.cast.map(c=>`<div class="st-who"><span class="st-face">${c.e.startsWith('v:')?stArt(c.e.slice(2)):c.e+(c.acc?`<i class="${c.at==='top'?'top':''}">${c.acc}</i>`:'')}</span><b>${c.n}</b><small>${c.d}</small></div>`).join('')}</div><div class="st-sub">For ages ${s.band}${s.source?' · From: '+s.source:''}</div>`}
  else if(p>=n){pic=scene2(s,0);const nx=s.series&&BEDTIME.find(x=>x.series===s.series&&x.ep===s.ep+1);SR.next=nx&&nx.id;
    txt=`<div class="st-cover-title">${nx?`End of episode ${s.ep}`:'The End'}</div><p class="st-moral">${s.moral}</p><p class="st-talk">💬 ${s.talk}</p><div class="st-endbtns">${nx?`<button class="pill-btn primary" id="st-nextep">Next: ${nx.title} ▶</button>`:''}<button class="pill-btn" id="st-again">Read again</button><button class="pill-btn" id="st-more">Another story</button><button class="pill-btn primary" id="st-sleep">🌙 Goodnight</button></div>`;
    S.storiesRead=S.storiesRead||{};S.storiesRead[s.id]=today();save();gc('/story/'+s.id+'/done','Story finished')}
  else if(pg.ask){pic=scene2(s,p);txt=`<p class="st-q" id="st-text">${st2Words(pg.ask)}</p><div class="st-opts">${pg.opts.map((o,i)=>`<button class="st-opt" data-i="${i}"><span>${o[0]}</span>${o[1]}</button>`).join('')}</div>`}
  else{pic=scene2(s,p);txt=(pg.ctx?`<div class="st-ctx">${pg.ctx}</div>`:'')+(pg.sh?`<div class="st-shloka">${pg.sh.replace(/।\s*/,'।<br>')}</div>`:'')+`<p class="st-text" id="st-text">${st2Text(s,pg.t)}</p><div class="st-gloss" id="st-gloss" hidden></div>`}
  $('st-pic').innerHTML=pic;$('st-pic').classList.toggle('asking',!!(pg&&pg.ask));$('st-words').innerHTML=txt;$('st-words').scrollTop=0;
  $('st-dots').innerHTML=Array.from({length:n+2},(_,i)=>`<i class="${i-1===p?'on':''}${s.pages[i-1]&&s.pages[i-1].ask?' q':''}"></i>`).join('');
  $('st-prev').disabled=p<0;$('st-next').disabled=p>=n;
  if(p>=n){if(SR.next)$('st-nextep').onclick=()=>{FX.tap();openStory(SR.next)};$('st-again').onclick=()=>{FX.tap();SR.p=-1;stRender()};$('st-more').onclick=()=>{stStop();FX.tap();go('corner');openStories()};$('st-sleep').onclick=()=>{stStop();stLights(true)}}
  if(pg&&pg.ask)$('st-words').querySelectorAll('.st-opt').forEach(b=>b.onclick=()=>st2Answer(b,+b.dataset.i));
  $('st-words').querySelectorAll('.gw').forEach(w=>w.onclick=()=>st2Gloss(+w.dataset.w));
  stPlay()};
/* a pause-and-ask page: a wrong tap is never punished; after two misses the right answer glows */
function st2Answer(b,i){const pg=SR.s.pages[SR.p];if(SR.answered)return;const ok=pg.ok==null||i===pg.ok;
  if(!ok){FX.boing();anim(b,'wiggle',500);SR.miss=(SR.miss||0)+1;if(SR.miss>=2){const r=$('st-words').querySelector(`.st-opt[data-i="${pg.ok}"]`);if(r)r.classList.add('hint')}return}
  SR.answered=true;stStop();b.classList.add('right');FX.chime();const r=SR,pp=SR.p;const nextPage=()=>{if(SR===r&&SR.p===pp){SR.p++;stRender()}};
  $('st-words').insertAdjacentHTML('beforeend',`<p class="st-yes">${pg.yes}</p>`);
  if(SR.mode!=='read'){SR.tm=setTimeout(nextPage,2800);return}
  stBlob(SR.s.id+'_'+pp+'y').then(u=>{if(SR!==r||SR.p!==pp)return;if(!u){SR.tm=setTimeout(nextPage,1800);return}stFx.src=u;stFx.onended=()=>{SR.tm=setTimeout(nextPage,900)};stFx.play().catch(()=>{SR.tm=setTimeout(nextPage,1800)})})}
/* an explained word: tap it to see and hear what it means */
function st2Gloss(k){const s=SR.s,w=Object.keys(s.words)[k],g=$('st-gloss');if(!g||!w)return;stStop();FX.tap();g.hidden=false;g.innerHTML=`<b>${w}</b> ${s.words[w]}`;const r=SR,pp=SR.p;
  stBlob(s.id+'_w'+k).then(u=>{if(u&&SR===r&&SR.p===pp){stFx.src=u;stFx.onended=null;stFx.play().catch(()=>{})}})}
/* a question waits for an answer instead of turning the page; with the screen off nobody can answer, so it moves on */
const stEnded1=stAudio.onended;
stAudio.onended=()=>{const pg=SR&&SR.s.v2&&SR.s.pages[SR.p];if(pg&&pg.ask&&!SR.answered){$('st-play').textContent='▶';const t=$('st-text');if(t)t.querySelectorAll('span').forEach(w=>w.classList.add('lit'));
    if(!$('st-lights').hidden){const r=SR;SR.tm=setTimeout(()=>{if(SR===r){SR.p++;stRender()}},2500)}return}stEnded1()};
const stPrefetch1=stPrefetch;
stPrefetch=function(s){if(!s.v2)return stPrefetch1(s);gc('/story/'+s.id+'/start','Story opened');
  (async()=>{const keys=[s.id+'_t',...s.pages.flatMap((p,i)=>p.ask?[s.id+'_'+i,s.id+'_'+i+'y']:p.sh?[s.id+'_'+i+'_sh',s.id+'_'+i]:[s.id+'_'+i]),s.id+'_e',...Object.keys(s.words).map((_,k)=>s.id+'_w'+k)];for(const k of keys){if(!SR||SR.id!==s.id)return;await stBlob(k)}})()};
/* things in the picture that can be tapped */
$('st-pic').addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-tap]');if(!t||!SR||!SR.s.v2)return;if((t.dataset.g&&!t.classList.contains('on'))||t.classList.contains('done')||t.classList.contains('gone'))return;
  SR.taps=(SR.taps||0)+1;FX.tick(SR.taps%8+1);const trig=t.dataset.tap;if(!t.dataset.re)t.classList.add('done');t.classList.remove('tapped');void t.getBoundingClientRect();t.classList.add('tapped');t.addEventListener('animationend',()=>t.classList.remove('tapped'),{once:true});
  const again=a=>{a.style.animationName='none';void a.getBoundingClientRect();a.style.animationName=''};
  $('st-pic').querySelectorAll(`[data-g="${trig}"]`).forEach(x=>{x.classList.add('on');if(x.classList.contains('sp'))again(x);x.querySelectorAll('.sp').forEach(again)});
  $('st-pic').querySelectorAll(`[data-h="${trig}"]`).forEach(x=>x.classList.add('gone'))});

/* ======================= RELEASE 5: Grown-ups in three tabs, Show a grown-up, Guess it! ======================= */
/* ---- small helpers ---- */
let PT_NEXT=null;
const r5E=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const r5Name=()=>{const n=S.profile&&S.profile.name;return n&&n!=='friend'?n:'Your child'};
const r5Last7=()=>{const a=[];for(let i=6;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);a.push(d)}return a};
const r5Mon=d=>d.toLocaleDateString('en-IN',{month:'short'});
const r5Ago=k=>{if(!k)return 'a while ago';const n=daysBetween(k,today());return n<=0?'today':n===1?'yesterday':n+' days ago'};
const r5Ten=p=>Math.max(0,Math.min(10,Math.round(p*10)));
const r5AreaOf=id=>({Maths:'numbers',Writing:'writing',Reading:'reading',Discover:'world'}[SK[id]&&SK[id].sub]||'numbers');
function r5Title(p){if(MERGE[p])return MERGE[p].t;if(REPL[p])return REPL[p][2];if(TITLES[p])return TITLES[p];if(p==='cards')return 'Picture cards';if(p.slice(0,2)==='d_'&&DSEC[p.slice(2)])return DSEC[p.slice(2)].name;return p}

/* ---- tabs ---- */
function ptTab(t){document.querySelectorAll('#s-parent .pt-tabs button').forEach(b=>b.setAttribute('aria-selected',b.dataset.pt===t?'true':'false'));
  document.querySelectorAll('#s-parent .pt-pane').forEach(p=>p.hidden=p.dataset.pane!==t);const sc=$('s-parent');if(sc)sc.scrollTop=0}
document.querySelectorAll('#s-parent .pt-tabs button').forEach(b=>b.onclick=()=>{FX.tap();ptTab(b.dataset.pt)});

/* ---- Show a grown-up: one small thing to tell or do with a parent, once a day, after the first adventure ---- */
const SG_COL={red:'🔴',blue:'🔵',green:'🟢',yellow:'🟡'};
const SG_T={
 start:{min:3,cat:'letters',arg:c=>c.l,pic:a=>`<span class="lc">${a}</span>`,txt:a=>`Tell a grown-up three things that start like <b>${a}</b>, as in ${KEYW(a)[0]}.`,say:a=>['P_sg_start',150,...sndOf(a)]},
 back:{min:4,cat:'letters',arg:c=>c.l,pic:a=>`<span class="lc">${a}</span>`,txt:a=>`Draw the letter <b>${a}</b> on a grown-up's back with your finger. Can they guess it?`,say:()=>['P_sg_back']},
 rhyme:{min:5,cat:'letters',arg:()=>rnd(RHY)[0],pic:()=>'🎵',txt:a=>`Together, think of a word that rhymes with <b>${a}</b>.`,say:a=>['P_sg_rhyme',150,W(a)]},
 count:{min:3,cat:'numbers',arg:()=>ageR()<=4?5:10,pic:()=>'🔢',txt:a=>`Count ${a===5?'five':'ten'} things in the room together.`,say:a=>['P_sg_count'+a]},
 jump:{min:3,cat:'move',arg:()=>ageR()<=4?5:10,pic:()=>'🤸',txt:a=>`Jump ${a===5?'five':'ten'} times together and count out loud.`,say:a=>['P_sg_jump'+a]},
 air:{min:3,cat:'move',arg:()=>0,pic:()=>'⭕',txt:()=>'Draw a big circle in the air together. Then a big cross.',say:()=>['P_sg_air']},
 fav:{min:3,cat:'talk',arg:()=>0,pic:()=>'💬',txt:()=>'Tell a grown-up which stop you liked best today, and why.',say:()=>['P_sg_fav']},
 hug:{min:3,cat:'talk',arg:()=>0,pic:()=>'🤗',txt:()=>'Give a grown-up a big hug, and tell them one thing you learned today.',say:()=>['P_sg_hug']},
 colour:{min:3,cat:'world',arg:()=>rnd(Object.keys(SG_COL)),pic:a=>SG_COL[a],txt:a=>`Together, find three ${a} things.`,say:a=>['P_sg_'+a]},
 shapes:{min:4,cat:'world',arg:()=>0,pic:()=>'🔷',txt:()=>'Together, find something round and something square.',say:()=>['P_sg_shapes']}
};
const sgPlain=g=>SG_T[g.k]?SG_T[g.k].txt(g.a).replace(/<[^>]+>/g,''):'';
function sgPending(){try{return !!(S.profile&&S.settings.showGrown!==false&&S.sg&&S.sg.d===today()&&!S.sg.done&&SG_T[S.sg.k])}catch(e){return false}}
function sgPick(ch){const age=ageR();let l=(ch&&ch.nodes.map(n=>n.t==='meet'?n.l:null).find(Boolean))||(ch&&ch.nodes.map(n=>n.focus).find(Boolean))||(S.intro.length?weakestLetter():'s');if(!WORDS[l])l='s';
  const log=(S.sgLog||[]).map(x=>x.k).filter(k=>SG_T[k]);const keys=Object.keys(SG_T).filter(k=>SG_T[k].min<=age);
  const recent=log.slice(-Math.min(6,keys.length-1));let c=keys.filter(k=>!recent.includes(k));if(!c.length)c=keys;
  const lastCat=log.length?SG_T[log[log.length-1]].cat:null;const c2=c.filter(k=>SG_T[k].cat!==lastCat);if(c2.length)c=c2;
  const k=rnd(c);return {d:today(),k,a:SG_T[k].arg({l})}}
/* called from the end of every game: keeps a 3-week count of games per day for the weekly summary, and sets up the day's task */
function r5Finish(run,chDone,pid){const t=today();S.pd=S.pd||{};const o=S.pd[t]||(S.pd[t]={});o[pid]=(o[pid]||0)+1;const ks=Object.keys(S.pd).sort();while(ks.length>21)delete S.pd[ks.shift()];
  if(!chDone)return;const first=S.advDone!==t;S.advLog=S.advLog||[];S.advLog.push(t);if(S.advLog.length>90)S.advLog=S.advLog.slice(-90);
  if(first&&S.settings.showGrown!==false&&!(S.sg&&S.sg.d===t)){S.sg=sgPick(S.chapters.find(c=>c.id===run.from.chapter));S.sgLog=S.sgLog||[];S.sgLog.push({d:t,k:S.sg.k});if(S.sgLog.length>30)S.sgLog=S.sgLog.slice(-30)}}
function sgComplete(quiet){const g=S.sg;if(!g||g.done)return;g.done=1;S.together=(S.together||0)+1;const e=(S.sgLog||[]).filter(x=>x.d===g.d).pop();if(e)e.done=1;save();gc('/sg/done','Show a grown-up: done together');badge();
  if(quiet)return;const ov=$('sg');
  ov.innerHTML=`<div class="sg-box" role="dialog" aria-label="Together sticker"><div class="sg-pic">🤝</div><h3>Together sticker!</h3><p class="sg-task">${S.together} together sticker${S.together===1?'':'s'} so far. They are in the sticker book.</p><button class="big-btn go" id="sg-ok" aria-label="Home">🏠</button></div>`;
  confetti();FX.fanfare();say([300,'P_sg_done'],null);$('sg-ok').onclick=()=>{FX.tap();ov.hidden=true;stopVoice();if(current==='home')renderHome()}}
function sgOpen(){if(!sgPending())return false;const g=S.sg,T=SG_T[g.k],ov=$('sg');
  ov.innerHTML=`<div class="sg-box" role="dialog" aria-label="Show a grown-up"><div class="sg-pic">${T.pic(g.a)}</div><h3>Show a grown-up!</h3><p class="sg-task">${T.txt(g.a)}</p>
    <button class="sg-hold" id="sg-hold" aria-label="Grown-up: press and hold when you have done it together"><i></i><span>🤝</span><small id="sg-hold-t">Grown-up: press and hold</small></button>
    <div class="sg-row"><button class="round" id="sg-hear" aria-label="Hear it again">${ICON.ear}</button><button class="pill-btn" id="sg-later">Later</button></div></div>`;
  ov.hidden=false;if(!g.shown){g.shown=1;save();gc('/sg/shown','Show a grown-up: shown')}
  const talk=intro=>{const hint=intro&&(S.sgHint||0)<3;if(hint){S.sgHint=(S.sgHint||0)+1;save()}say([...(intro?['P_sg_find',350]:[]),...T.say(g.a),...(hint?[600,'P_sg_hold']:[])],null)};
  const hb=$('sg-hold');let ht=null;
  const down=e=>{if(e&&e.preventDefault)e.preventDefault();if(ht)return;unlockAudio();hb.classList.add('holding');$('sg-hold-t').textContent='Keep holding';FX.tick(4);ht=setTimeout(()=>{ht=null;sgComplete()},2000)};
  const up=()=>{if(!ht)return;clearTimeout(ht);ht=null;hb.classList.remove('holding');const t=$('sg-hold-t');if(t)t.textContent='Grown-up: press and hold'};
  hb.onpointerdown=down;hb.onpointerup=up;hb.onpointerleave=up;hb.onpointercancel=up;hb.oncontextmenu=e=>e.preventDefault();
  hb.onkeydown=e=>{if((e.key==='Enter'||e.key===' ')&&!e.repeat)down(e)};hb.onkeyup=up;
  $('sg-hear').onclick=()=>{unlockAudio();FX.tap();talk(false)};
  $('sg-later').onclick=()=>{unlockAudio();FX.tap();up();ov.hidden=true;if(!g.later){g.later=1;save();gc('/sg/later','Show a grown-up: later')}say(['P_sg_later'],null);if(current==='home')renderHome()};
  talk(true);return true}
/* the finale's Home button: the card comes up by itself only the first time; after that it waits behind the letter button on the home screen */
function sgOffer(){return sgPending()&&!S.sg.shown?sgOpen():false}
function r5Home(){const b=$('nd-sg');if(b)b.hidden=!sgPending()}
{const b=$('nd-sg');if(b)b.onclick=()=>{unlockAudio();FX.tap();sgOpen()}}
function r5Book(){const n=S.together||0;if(!n&&S.settings.showGrown===false)return '';
  return `<h3 style="margin-top:12px">Together stickers</h3><p class="note">${n?`<span style="font-size:24px;letter-spacing:2px">${'🤝'.repeat(Math.min(n,30))}</span>${n>30?' and '+(n-30)+' more':''}<br>`:''}${n} so far. One each day, for showing a grown-up after the adventure.</p>`}

/* ---- Grown-ups, Today: a 30-second read ---- */
const SG_BANK={
 letters:[l=>`Play I spy with the sound "${l}" (as in ${KEYW(l)[0]}). Take turns to find three things that start with it. Say the sound, not the letter name.`,
   l=>`Sound hunt: walk through one room and touch three things that start with the sound "${l}" (as in ${KEYW(l)[0]}).`,
   l=>`Draw the letter ${l} on each other's back with a finger and guess it. Then swap.`],
 numbers:['Count the rotis or spoons at the next meal together, touching each one as you count.','Count the stairs going up, and count backwards coming down.','Make two small piles of buttons or peanuts. Ask which pile has more, then count both to check.','Share six biscuits between two plates, one at a time. Ask if both plates have the same.'],
 writing:['Draw big lines, circles and crosses with a finger in a plate of atta or rice.','Paint the first letter of your child\'s name on the floor with a wet finger or a brush and plain water.','Draw a zigzag road on paper and let your child drive a crayon along it without leaving the road.'],
 world:['Stand at a window and name five things you can both see. Ask one "why" question about one of them.','Sort the washing together: whose is it, and what colour is it?','Name the vegetables while you cook, and let your child touch and smell each one.'],
 reading:['Read one short page together and slide a finger under each word as you say it.','Find three words on a packet or a signboard, and say the first sound of each together.']
};
function r5Insight(){const t=today(),wk=r5Last7().map(dkey);const ids=Object.keys(SK).filter(id=>S.sk[id]&&S.sk[id].n>=3);let good=null,weak=null,area=null,letter=null;
  const ups=(S.changes||[]).filter(c=>c.d===t&&(c.kind||'level')==='level'&&c.to>c.from&&SK[c.id]);
  if(ups.length)good=`Moved up a level today in ${SK[ups[ups.length-1].id].name}.`;
  if(!good){const lt=ORDER.map(l=>({l,a:((S.sounds[l]||{}).att||[]).filter(x=>x.d===t)})).filter(x=>x.a.length>=2&&x.a.every(y=>y.ok)).sort((a,b)=>b.a.length-a.a.length)[0];if(lt)good=`The sound "${lt.l}" (as in ${KEYW(lt.l)[0]}): right every time today.`}
  if(!good){const a=ids.filter(id=>S.sk[id].last===t&&S.sk[id].p>=.7).sort((x,y)=>S.sk[y].p-S.sk[x].p)[0];if(a)good=`${SK[a].name}: right first time about ${r5Ten(S.sk[a].p)} times in 10 lately.`}
  if(!good){const a=ids.filter(id=>S.sk[id].p>=.75).sort((x,y)=>(S.sk[y].last||'').localeCompare(S.sk[x].last||'')||S.sk[y].p-S.sk[x].p)[0];if(a)good=`${SK[a].name} is going well (last played ${r5Ago(S.sk[a].last)}).`}
  if(!good)good=S.advDone===t?'Finished today\'s adventure.':'Nothing to report yet. This fills in after a few games.';
  const rec7=id=>S.sk[id].last&&wk.includes(S.sk[id].last)?1:0;
  const w=ids.filter(id=>S.sk[id].p<.55).sort((x,y)=>(rec7(y)-rec7(x))||S.sk[x].p-S.sk[y].p)[0];
  const wl=(S.intro||[]).filter(l=>S.sounds[l]&&S.sounds[l].att.length>=3&&accuracy(l)<.6).sort((a,b)=>accuracy(a)-accuracy(b))[0];
  if(wl&&(!w||accuracy(wl)<=S.sk[w].p)){const a=S.sounds[wl].att.slice(-5);weak=`The sound "${wl}" (as in ${KEYW(wl)[0]}): right ${a.filter(x=>x.ok).length} of the last ${a.length} tries.`;area='letters';letter=wl}
  else if(w){weak=`${SK[w].name}: right first time about ${r5Ten(S.sk[w].p)} times in 10. It will come back in the next adventures.`;area=r5AreaOf(w)}
  else weak='Nothing flagged yet.';
  return {good,weak,area,letter}}
function r5Activity(ins){const day=Math.floor(new Date(today()).getTime()/864e5);const area=ins.area||['letters','numbers','writing','world'][day%4];const list=SG_BANK[area]||SG_BANK.numbers;const x=list[day%list.length];
  let l=ins.letter||(S.intro.length?weakestLetter():'s');if(!WORDS[l])l='s';return typeof x==='function'?x(l):x}
const r5Guess=()=>startRun({t:'guessit',pid:'guessit',title:'Guess it!'},{});
function r5Today(msg){const el=$('pt-today');if(!el||!S.profile)return;const t=today(),nm=r5E(r5Name()),ins=r5Insight();
  const min=Math.round(S.minutes[t]||0),c=curChapter(),dn=c.nodes.filter(n=>n.stars!=null).length;
  const adv=S.advDone===t?'Done':dn?`${dn} of ${c.nodes.length}`:'Not yet';const days=new Set(S.days||[]);
  const dots=r5Last7().map((d,i)=>`<i class="${days.has(dkey(d))?'on':''}${i===6?' now':''}">${d.toLocaleDateString('en-IN',{weekday:'short'}).slice(0,2)}</i>`).join('');
  const g=S.sg&&S.sg.d===t&&SG_T[S.sg.k]?S.sg:null;const idea=r5E(r5Activity(ins));let together;
  if(g&&!g.done&&S.settings.showGrown!==false)together=`<p class="pt-task">${nm} was asked to show you this today:<br><b>${r5E(sgPlain(g))}</b></p><div class="pt-btns"><button class="pill-btn primary" id="pt-sg-ok">We did it</button></div><p class="note">Pressing the button gives ${nm} a together sticker. Another idea for later: ${idea}</p>`;
  else together=`${g&&g.done?`<p class="note">Done together today: ${r5E(sgPlain(g))} ${msg?'<b>Together sticker added.</b>':''}</p>`:''}<p class="pt-task">${idea}</p>`;
  el.innerHTML=`<div class="panel"><p class="pt-date">${new Date().toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long'})} · ${nm}, age ${S.profile.age}</p>
      <div class="pt-nums"><div><b>${min}</b><span>minute${min===1?'':'s'} today</span></div><div><b>${adv}</b><span>today's adventure</span></div><div><b>${streak()}</b><span>day${streak()===1?'':'s'} in a row</span></div></div>
      <div class="pt-days" aria-label="Days played in the last 7 days">${dots}</div></div>
    <div class="panel"><div class="pt-row"><span aria-hidden="true">⭐</span><p><b>Went well</b><br>${r5E(ins.good)}</p></div><div class="pt-row"><span aria-hidden="true">🎯</span><p><b>To practise</b><br>${r5E(ins.weak)}</p></div></div>
    <div class="panel pt-do"><h3>Do together: 2 minutes, away from the phone</h3>${together}</div>
    ${S.profile.age>=4?`<div class="panel"><h3>A game for two: Guess it!</h3><p>You hold the phone on your forehead. ${nm} sees a picture and describes it without saying its name, and you guess. Two minutes.</p><div class="pt-btns"><button class="pill-btn primary" id="pt-guess">Play Guess it!</button></div></div>`:''}`;
  const ok=$('pt-sg-ok');if(ok)ok.onclick=()=>{FX.tap();sgComplete(true);r5Today(true)};
  const gb=$('pt-guess');if(gb)gb.onclick=()=>{unlockAudio();FX.tap();r5Guess()}}

/* ---- Grown-ups, Progress: five plain areas ---- */
const PT_ST=['Getting started','Growing','Confident'];
function r5Areas(){const list=(ids,none)=>{const tried=ids.filter(id=>S.sk[id]&&S.sk[id].n>=3),tries=ids.reduce((a,id)=>a+((S.sk[id]&&S.sk[id].n)||0),0);
    const strong=tried.filter(id=>S.sk[id].p>=.7),weak=tried.filter(id=>S.sk[id].p<.55);
    const st=tries<12||tried.length<2?0:(tried.length>=4&&tries>=30&&strong.length/tried.length>=.6&&weak.length/tried.length<=.2)?2:1;
    const nm=a=>a.sort((x,y)=>(S.sk[y].last||'').localeCompare(S.sk[x].last||'')).slice(0,2).map(id=>SK[id].name).join(', ');
    const eg=!tries?none:[strong.length?'Going well: '+nm(strong)+'.':'',weak.length?'Working on: '+nm(weak)+'.':'',`${tries} tries across ${ids.filter(id=>S.sk[id]&&S.sk[id].n).length} of ${ids.length} games.`].filter(Boolean).join(' ');
    return {st,eg}};
  const bySub=s=>Object.keys(SK).filter(id=>SK[id].sub===s);
  /* sounds and letters */
  const inPlayL=ORDER.filter(l=>S.intro.includes(l)||S.intro.includes(SAME[l])),prac=ORDER.filter(l=>S.sounds[l]&&S.sounds[l].att.length>=3),mast=ORDER.filter(l=>['mast','due'].includes(status(l)));
  const trick=prac.filter(l=>accuracy(l)<.6).sort((a,b)=>accuracy(a)-accuracy(b))[0];
  const A=[{n:'Sounds and letters',st:prac.length<3?0:mast.length>=Math.max(4,Math.ceil(inPlayL.length*.6))?2:1,
    eg:`Letter sounds in play: ${inPlayL.length} of ${ORDER.length}${inPlayL.length?' ('+inPlayL.slice(0,8).join(', ')+(inPlayL.length>8?', ...':'')+')':''}. Mastered: ${mast.length}.${trick?` Trickiest right now: "${trick}" (as in ${KEYW(trick)[0]}).`:''}`}];
  /* reading */
  {const s=S.sk.read,opened=Object.keys(S.storiesRead||{}).length;const stn=`Stories opened: ${opened}.${tbShown()?` Tiny books read: ${Object.keys(tbS().read).length} of ${TBOOKS().length}, now on ${TB_LV[tbLevel()]}.`:''}`;
   if(!(s&&s.n)&&!readUnlock())A.push({n:'Reading',st:0,eg:`Word-reading games open at age 6, or at 5 once about 10 letter sounds are going well. Stories can be listened to at any age. ${stn}`});
   else A.push({n:'Reading',st:!s||s.n<12?0:s.p>=.7?2:1,eg:s&&s.n?`Reading words: ${SK.read.lab(param('read'))}, right first time about ${r5Ten(s.p)} times in 10. ${stn}`:`Word-reading games are open but not played yet. ${stn}`})}
  const n=list(bySub('Maths'),'No number games played yet.'),w=list(bySub('Writing'),'No writing games played yet.'),d=list(bySub('Discover'),'No topics played yet.');
  A.push({n:'Numbers',st:n.st,eg:n.eg},{n:'Writing',st:w.st,eg:w.eg},{n:'My world',st:d.st,eg:d.eg});return A}
function r5AreasRender(){const el=$('pt-areas');if(!el||!S.profile)return;
  el.innerHTML=`<h3>How ${r5E(r5Name())} is doing</h3>`+r5Areas().map(a=>`<div class="pt-area"><b>${a.n}</b><span class="pt-st s${a.st}">${PT_ST[a.st]}</span><small>${r5E(a.eg)}</small></div>`).join('')+
    `<p class="note"><b>How to read this.</b> Getting started: only a few tries so far. Confident: at least four games in the area have been played a fair amount, and most are answered right on the first try at the current level. Growing: everything in between. The questions get harder as your child improves, so an area can go from Confident back to Growing. That is normal. This is a guide from play on this phone, not a test.</p>`}

/* ---- Grown-ups, Progress: the week in a few lines, made on the phone, sent by the parent ---- */
function r5WeekText(){const D=r5Last7(),keys=D.map(dkey),nm=r5Name();
  const range=D[0].getMonth()===D[6].getMonth()?`${D[0].getDate()} to ${D[6].getDate()} ${r5Mon(D[6])}`:`${D[0].getDate()} ${r5Mon(D[0])} to ${D[6].getDate()} ${r5Mon(D[6])}`;
  const played=keys.filter(k=>(S.days||[]).includes(k)).length,min=Math.round(keys.reduce((a,k)=>a+(S.minutes[k]||0),0));
  const adv=(S.advLog||[]).filter(d=>keys.includes(d)).length,tog=(S.sgLog||[]).filter(x=>x.done&&keys.includes(x.d)).length;
  const ups=[...new Set((S.changes||[]).filter(c=>keys.includes(c.d)&&(c.kind||'level')==='level'&&c.to>c.from&&SK[c.id]).map(c=>SK[c.id].name))].slice(-3);
  const mas=ORDER.filter(l=>S.sounds[l]&&S.sounds[l].mastered&&keys.includes(S.sounds[l].mastered));
  const cnt={};keys.forEach(k=>{const o=(S.pd||{})[k];if(o)Object.keys(o).forEach(p=>{if(p!=='move')cnt[p]=(cnt[p]||0)+o[p]})});const fav=Object.keys(cnt).sort((a,b)=>cnt[b]-cnt[a])[0];
  const L=[`${nm==='Your child'?'My child':nm}'s week with Haathi (${range})`];
  if(!played)L.push('No play in the last 7 days.');
  else{L.push(`Played on ${played} of 7 days, about ${min} minute${min===1?'':'s'} in all.`);
    L.push(`Adventures finished: ${adv}.${tog?` Done together with a grown-up: ${tog}.`:''}`);
    {const tr=tbReadIn(keys);if(tr)L.push(`Tiny books read: ${tr}.`)}
    if(ups.length)L.push(`Moved up a level in: ${ups.join(', ')}.`);
    if(mas.length)L.push(`Letter sounds mastered: ${mas.join(', ')}.`);
    if(!ups.length&&!mas.length)L.push('No level changes this week. Steady practice.');
    if(fav)L.push(`Most played game: ${r5Title(fav)}.`)}
  L.push(`To try together: ${r5Activity(r5Insight())}`);L.push(`Haathi's Sound Forest, a free learning game for ages 3 to 7: ${SHARE_URL}`);return L.join('\n')}
function r5Copy(txt,done){const fb=()=>{try{const ta=document.createElement('textarea');ta.value=txt;ta.style.cssText='position:fixed;opacity:0;left:0;top:0';document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove();done(true)}catch(e){done(false)}};
  try{if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(txt).then(()=>done(true)).catch(fb);return}}catch(e){}fb()}
function r5Week(){const el=$('pt-week');if(!el||!S.profile)return;const txt=r5WeekText();
  el.innerHTML=`<h3>This week, ready to share</h3><pre class="pt-pre" id="pt-week-txt"></pre><div class="pt-btns"><button class="pill-btn primary" id="pt-wa">Send on WhatsApp</button><button class="pill-btn" id="pt-copy">Copy text</button></div><p class="note">This is written on this phone from the last 7 days of play. Nothing leaves the phone until you press send in WhatsApp, and you choose who gets it. You can edit the message there first.</p>`;
  $('pt-week-txt').textContent=txt;
  $('pt-wa').onclick=()=>{FX.tap();gc('/parent/share','Weekly summary: WhatsApp pressed');try{window.open('https://wa.me/?text='+encodeURIComponent(txt),'_blank','noopener')}catch(e){}};
  $('pt-copy').onclick=()=>{FX.tap();r5Copy(txt,ok=>{const b=$('pt-copy');if(!b)return;b.textContent=ok?'Copied':'Could not copy';setTimeout(()=>{const x=$('pt-copy');if(x)x.textContent='Copy text'},1600)})}}
function r5Parent(){ptTab(PT_NEXT||'today');PT_NEXT=null;gc('/parent/open','Grown-ups page opened',true);const c=$('ps-sg');if(c)c.checked=S.settings.showGrown!==false;r5Today();r5AreasRender();r5Week()}

/* ---- Guess it!: a game for two. The grown-up holds the phone on their forehead and guesses what the child describes ---- */
Object.assign(ROUNDS,{guessit:1});Object.assign(TITLES,{guessit:'Guess it!'});Object.assign(ND_ICO,{guessit:'🙈'});
const GS_DECKS=a=>a<=4?['farm','wild','fruits','vehicles','home']:['farm','wild','fruits','vehicles','home','vegetables','birds','sea','bugs','clothes','helpers','indianfood','music','body'];
function gsCards(){const seen={},out=[];GS_DECKS(ageR()).forEach(id=>{if(DSEC[id])DSEC[id].items.forEach(i=>{const d=DI(i.k);if(d.e&&d.n&&d.e!=='❓'&&!seen[d.n]){seen[d.n]=1;out.push({e:d.e,n:d.n})}})});return shuffle(out)}
function r5Shelf(kind,items){if(kind==='play'&&ageR()>=4)items.push({id:'guessit',ico:'🙈',label:'Guess it!',n:ndPlays('guessit'),run:()=>startRun({t:'guessit',pid:'guessit',title:'Guess it!'},{corner:'letters'})})}
ACT.guessit=n=>{const run=RUN,b=body();$('cap').textContent='';const root=document.createElement('div');root.className='gs-wrap';b.innerHTML='';b.appendChild(root);
  const alive=()=>RUN===run&&document.body.contains(root);const TOTAL=n.secs||120;
  const canTilt=S.settings.tilt!==false&&typeof DeviceOrientationEvent!=='undefined',ask=canTilt&&typeof DeviceOrientationEvent.requestPermission==='function';
  let cards=gsCards(),ci=-1,cur=null,got=[],playing=false,locked=false,armed=false,iv=null,wl=null,over=false,tEnd=0;
  const rel=()=>{try{if(wl){wl.release();wl=null}}catch(_){}};
  /* held upright on a forehead the phone reads about 90. Tipped so the screen faces the floor it reads towards 180, tipped to the ceiling towards 0. It has to come back upright before the next tip counts */
  const ori=e=>{if(e.beta==null||!playing||locked)return;const v=e.beta;if(!armed){if(v>60&&v<120)armed=true;return}
    if(v>=135||v<=-135){armed=false;mark(true)}else if(v<=40&&v>=-40){armed=false;mark(false)}};
  const stop=()=>{over=true;playing=false;if(iv){clearInterval(iv);iv=null}window.removeEventListener('deviceorientation',ori);rel()};
  const show=()=>{ci++;if(ci>=cards.length){cards=gsCards();ci=0}cur=cards[ci];$('gs-p').textContent=cur.e;$('gs-n').textContent=cur.n;armed=false};
  const mark=ok=>{if(!playing||locked||!alive())return;locked=true;if(ok){got.push(cur);FX.chime()}else FX.swish();try{if(navigator.vibrate)navigator.vibrate(ok?[60,40,60]:40)}catch(_){}
    $('gs-s').textContent=got.length;const f=document.createElement('div');f.className='gs-flash '+(ok?'ok':'skip');f.textContent=ok?'✓':'➜';f.setAttribute('aria-hidden','true');root.appendChild(f);
    setTimeout(()=>{if(!alive())return;f.remove();locked=false;if(playing)show()},650)};
  const finish=()=>{const ok=alive();stop();if(!ok)return;S.guessBest=Math.max(S.guessBest||0,got.length);save();RUN.prompt=null;
    root.innerHTML=`<div class="gs-count">${got.length}</div><h3>guessed in ${TOTAL===120?'2 minutes':TOTAL+' seconds'}!</h3><div class="gs-list">${got.map(c=>`<span>${c.e}</span>`).join('')}</div><p class="gs-tip">Best so far: ${S.guessBest}</p>`;
    FX.trumpet();say([300,'P_guess_end'],null);actions([['go','Done',()=>roundDone(true),'']])};
  const play=()=>{if(!alive())return;RUN.prompt=null;
    root.innerHTML=`<div class="gs-bar"><i id="gs-t"></i></div><div class="gs-score" id="gs-s" aria-label="Right guesses">0</div><div class="gs-pic" id="gs-p"></div><div class="gs-name" id="gs-n"></div><div class="gs-btns"><button class="gs-skip" id="gs-x" aria-label="Pass">➜</button><button class="gs-ok" id="gs-y" aria-label="Right guess">✓</button></div>`;
    $('gs-x').onclick=()=>mark(false);$('gs-y').onclick=()=>mark(true);playing=true;locked=false;show();tEnd=Date.now()+TOTAL*1000;let last=0;
    iv=setInterval(()=>{if(!alive()){stop();return}const left=tEnd-Date.now(),bar=$('gs-t');if(bar)bar.style.width=Math.max(0,left/(TOTAL*10))+'%';
      const s=Math.ceil(left/1000);if(s<=10&&s>0&&s!==last){last=s;FX.tick(12-s)}if(left<=0)finish()},200)};
  const count=k=>{if(!alive()){stop();return}if(k===0){say(['P_guess_go'],null);play();return}root.innerHTML=`<p class="gs-tip">Phone on your forehead!</p><div class="gs-count">${k}</div>`;FX.tick(8-k);setTimeout(()=>count(k-1),1000)};
  const begin=()=>{$('actions').innerHTML='';stopVoice();
    /* listening is harmless when the phone gives no readings; on phones that ask first (iPhone), this tap is what lets them start */
    if(canTilt){window.addEventListener('deviceorientation',ori);if(ask){try{const r=DeviceOrientationEvent.requestPermission();if(r&&r.catch)r.catch(()=>{})}catch(_){}}}
    try{if(navigator.wakeLock&&navigator.wakeLock.request)navigator.wakeLock.request('screen').then(x=>{wl=x;if(over||!alive())rel()}).catch(()=>{})}catch(_){}
    count(n.lead==null?5:n.lead)};
  root.innerHTML=`<div class="gs-steps"><div><span aria-hidden="true">🙆</span><p><b>Grown-up:</b> hold the phone upright on your forehead, with the screen facing your child.</p></div><div><span aria-hidden="true">🗣️</span><p><b>Child:</b> look at the picture and tell them about it. Do not say its name!</p></div><div><span aria-hidden="true">👍</span><p>${canTilt?'Right guess: tip the phone down to the floor, or your child taps ✓. To pass: tip it up to the ceiling, or tap ➜.':'Right guess: your child taps ✓. To pass: tap ➜.'}</p></div></div>`;
  RUN.prompt=()=>say(['P_guess_intro'],null);RUN.prompt();actions([['go','Start',begin,'']])};

/* ======================= RELEASE 6: Tiny books, "I read" on stories ======================= */
/* ---- new picture backgrounds for the books: market, street, roof, rail, kitchen ---- */
const TB_BG={
 market:n=>`<rect y="226" width="400" height="74" fill="#e8d3a0"/>`+[[24,'#e2563f'],[214,'#2f8a5f']].map(([x,c])=>`<rect x="${x+8}" y="128" width="6" height="100" fill="#8a5a3b"/><rect x="${x+152}" y="128" width="6" height="100" fill="#8a5a3b"/><path d="M${x} 128 H${x+166} L${x+156} 160 H${x+10}Z" fill="${c}"/>${[0,1,2,3,4].map(i=>`<path d="M${x+14+i*30} 128 h15 l-2 32 h-15Z" fill="#fff" opacity=".85"/>`).join('')}<rect x="${x+8}" y="192" width="150" height="36" rx="4" fill="#b07a45"/><rect x="${x+8}" y="192" width="150" height="6" fill="#c9965f"/>`).join(''),
 street:n=>{const w=n?'#ffd27a':'#fff9e0';return [[0,92,110,'#f2c4a0'],[110,62,90,'#c9d8e8'],[200,100,100,'#f6e3a8'],[300,72,100,'#e8b4c4']].map(([x,y,wd,c])=>`<rect x="${x}" y="${y}" width="${wd}" height="${232-y}" fill="${c}"/>`+[0,1,2].map(r=>[0,1].map(k=>`<rect x="${x+16+k*(wd/2)}" y="${y+18+r*42}" width="${wd/2-30}" height="24" rx="3" fill="${w}"/>`).join('')).join('')).join('')+`<rect y="228" width="400" height="14" fill="#cfc7b8"/><rect y="242" width="400" height="58" fill="#7d838c"/>${[0,1,2,3,4,5,6].map(i=>`<rect x="${i*64+10}" y="270" width="34" height="5" fill="#fff" opacity=".85"/>`).join('')}`},
 roof:n=>`<rect x="0" y="196" width="130" height="44" fill="#d9c8b0"/><rect x="250" y="206" width="150" height="34" fill="#cbb89c"/><rect x="316" y="160" width="58" height="10" rx="4" fill="#1f2326"/><rect x="320" y="168" width="50" height="62" rx="6" fill="#2f3438"/><rect y="236" width="400" height="64" fill="#e9e1d3"/><rect y="228" width="400" height="12" fill="#d4c9b5"/>`,
 rail:n=>`<rect y="190" width="400" height="110" fill="#b9d97a"/><rect y="236" width="400" height="34" fill="#a39d94"/>${Array.from({length:17},(_,i)=>`<rect x="${i*24+2}" y="238" width="10" height="30" fill="#6b4a2f"/>`).join('')}<rect y="243" width="400" height="5" fill="#5a5f66"/><rect y="259" width="400" height="5" fill="#5a5f66"/>`,
 kitchen:n=>`<rect width="400" height="300" fill="${n?'#2a2f5c':'#f6e3c6'}"/><rect x="40" y="40" width="90" height="80" rx="6" fill="${n?'#141a3d':'#bfe6ff'}" stroke="${n?'#5b5f9a':'#fff'}" stroke-width="8"/><rect x="230" y="70" width="150" height="8" fill="#9a6b45"/>${[250,290,330].map((x,i)=>`<rect x="${x}" y="40" width="24" height="30" rx="5" fill="${['#e8a33a','#d9534f','#5aa857'][i]}"/>`).join('')}<rect y="196" width="400" height="12" fill="#c9965f"/><rect y="206" width="400" height="94" fill="${n?'#3a3150':'#9a6b45'}"/><rect x="60" y="178" width="110" height="18" rx="4" fill="#3b3f45"/>`};
const bgSVG0=bgSVG;
bgSVG=function(key){const night=/N$/.test(key);const k=key.replace(/N$/,'');if(!TB_BG[k])return bgSVG0(key);
  const [s1,s2]=night?SKY.night:SKY.day;const gid='sk'+(++SKID);let g=k==='kitchen'?'':`<defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${s1}"/><stop offset="1" stop-color="${s2}"/></linearGradient></defs><rect width="400" height="300" fill="url(#${gid})"/>`;
  g+=TB_BG[k](night);if(night&&k!=='kitchen')g+=`<rect width="400" height="300" fill="#0b1030" opacity="${k==='street'?.3:.42}"/>`;return {svg:g,night}};

/* ---- the books ---- */
const TB_LV=['Starter','Level 1','Level 2','Level 3'],TB_AGE=['age 4','age 5','ages 5 and 6','ages 6 and 7'];
const TBOOKS=()=>window.HAATHI_BOOKS||[];
const tbWkey=w=>w.toLowerCase().replace(/[^a-z']/g,'').replace(/^'+|'+$/g,'');
function tbS(){return S.tb||(S.tb={lvl:null,read:{},help:{},offer:{}})}
/* the level starts from age; a grown-up can set it, and the child can accept a harder level after 3 books read with little help */
function tbLevel(){const t=tbS();if(t.lvl!=null)return t.lvl;const a=ageR();return a<=4?0:a===5?1:a===6?2:3}
const tbShown=()=>TBOOKS().length>0&&(ageR()>=4||tbS().lvl!=null);
const tbEasy=(id,b)=>{const h=tbS().help[id];return h!=null&&h<=Math.max(1,Math.round(b.words*.1))};
function tbOfferDue(){const t=tbS(),L=tbLevel();if(L>=3)return false;const n=TBOOKS().filter(b=>b.lvl===L&&t.read[b.id]&&tbEasy(b.id,b)).length;return n>=3&&n>=(t.offer[L]||0)+3}
function tbPick(){const L=tbLevel(),t=tbS();const at=TBOOKS().filter(b=>b.lvl===L);if(!at.length)return null;const un=at.find(b=>!t.read[b.id]);if(un)return un;return at.slice().sort((a,b)=>(t.read[a.id]||'').localeCompare(t.read[b.id]||''))[0]}

/* ---- sound: page reading, single words, and the child's own voice (played once, then thrown away) ---- */
const tbAudio=new Audio();tbAudio.preload='auto';const TBB={};
async function tbBlob(path){if(TBB[path])return TBB[path];try{const r=await fetch(path);if(!r.ok)throw 0;const u=URL.createObjectURL(await r.blob());TBB[path]=u;return u}catch(e){return null}}
function tbStopAudio(){try{tbAudio.pause()}catch(e){}tbAudio.ontimeupdate=null;tbAudio.onended=null;const t=document.querySelector('#tb-words .tb-text');if(t)t.classList.remove('reading')}
let RECNOW=null;
/* starts recording; btn becomes a stop button. done(true) after the child has heard themselves */
async function recPage(btn,done){if(RECNOW)return;stopVoice();tbStopAudio();if(typeof stStop==='function'&&SR)stStop();let stream;
  try{stream=await navigator.mediaDevices.getUserMedia({audio:true})}catch(e){S.settings.mic=false;save();done(false);return}
  const chunks=[];let rec;try{rec=new MediaRecorder(stream)}catch(e){stream.getTracks().forEach(t=>t.stop());done(false);return}
  const keep={html:btn.innerHTML,label:btn.getAttribute('aria-label'),fn:btn.onclick};
  const stop=()=>{try{if(rec.state==='recording')rec.stop()}catch(e){}};RECNOW={stop,rec};
  btn.classList.add('rec-on');btn.innerHTML='⏹';btn.setAttribute('aria-label','Stop');btn.onclick=()=>{FX.tap();stop()};const tm=setTimeout(stop,45000);
  rec.ondataavailable=e=>{if(e.data&&e.data.size)chunks.push(e.data)};
  rec.onstop=async()=>{clearTimeout(tm);stream.getTracks().forEach(t=>t.stop());RECNOW=null;btn.classList.remove('rec-on');btn.innerHTML=keep.html;btn.setAttribute('aria-label',keep.label||'');btn.onclick=keep.fn;
    if(rec._cancel){chunks.length=0;return}
    const url=URL.createObjectURL(new Blob(chunks,{type:rec.mimeType||'audio/webm'}));chunks.length=0;
    await sayRaw(['P_tb_you'],null);await new Promise(res=>{try{const a=new Audio(url);a.onended=res;a.onerror=res;a.play().catch(res)}catch(e){res()}});
    URL.revokeObjectURL(url);done(true)};
  try{rec.start()}catch(e){stop();done(false)}}
function recCancel(){if(RECNOW){try{RECNOW.rec._cancel=1;RECNOW.stop()}catch(e){}RECNOW=null}}

/* ---- the reader ---- */
let TB=null;
const tbWords=t=>t.split(/(\s+)/).map(w=>!w?'':/^\s+$/.test(w)?w:`<span data-w="${tbWkey(w)}">${w}</span>`).join('');
function tbOpen(id,from){const b=TBOOKS().find(x=>x.id===id);if(!b)return false;stopVoice();tbStopAudio();recCancel();
  TB={b,p:-1,from:from||{},tried:{},tapped:{},help:0,hearTold:false,s:{cast:b.cast,pages:b.pages.map(p=>({s:p.s}))}};go('book');tbRender();
  gc('/tb/'+id+'/start','Tiny book opened');setTimeout(()=>{if(TB&&TB.b===b&&TB.p<0)sayRaw(['P_tb_intro'],null)},350);
  (async()=>{for(let i=0;i<b.pages.length;i++){if(!TB||TB.b!==b)return;await tbBlob(`books/audio/${b.id}_${i}.mp3`)}})();return true}
function tbBack(){tbStopAudio();recCancel();stopVoice();const f=TB&&TB.from;TB=null;
  if(f&&f.run){const r=f.run;if(RUN===r){const fr=RUN.from;RUN=null;backFrom(fr);return}}
  go('corner');openStories()}
function tbRender(){if(!TB)return;const {b,p}=TB,n=b.pages.length;tbStopAudio();
  const el=$('s-book');el.dataset.lvl=b.lvl;$('tb-title').textContent=b.title;
  $('tb-dots').innerHTML=Array.from({length:n+2},(_,i)=>`<i class="${i-1===p?'on':''}"></i>`).join('');
  const ctl=$('tb-ctl');ctl.innerHTML='';const btn=(cls,html,label,fn,id)=>{const x=document.createElement('button');x.className=cls;x.innerHTML=html;x.setAttribute('aria-label',label);if(id)x.id=id;x.onclick=()=>{unlockAudio();fn(x)};ctl.appendChild(x);return x};
  if(p<0){$('tb-pic').innerHTML=scene2({cast:b.cast,pages:[{s:b.cover}]},0);
    $('tb-words').innerHTML=`<p class="tb-text tb-title">${tbWords(b.title)}</p><p class="tb-sub">${TB_LV[b.lvl]} · ${b.pages.length} pages</p>`;
    btn('big-btn go tb-go','📖 Read','Start reading',()=>{FX.tap();stopVoice();TB.p=0;tbRender()})}
  else if(p>=n){$('tb-pic').innerHTML=scene2({cast:b.cast,pages:[{s:b.cover}]},0);const t=tbS();const first=!t.read[b.id];
    t.read[b.id]=today();t.help[b.id]=t.help[b.id]==null?TB.help:Math.min(t.help[b.id],TB.help);save();
    if(!TB.doneSaid){TB.doneSaid=1;gc('/tb/'+b.id+'/done','Tiny book finished');confetti();FX.fanfare()}
    const offer=!TB.from.run&&tbOfferDue();
    $('tb-words').innerHTML=`<p class="tb-done">You read the whole book!</p><p class="tb-sub">${r5E(b.title)} · ${b.words} words${first?' · new on your shelf ✓':''}</p>${offer?`<div class="tb-offer"><p>You are reading so well! Try harder books?</p><div class="pt-btns"><button class="pill-btn primary" id="tb-up">Yes, harder books</button><button class="pill-btn" id="tb-stay">Not yet</button></div></div>`:''}`;
    if(!TB.endSaid){TB.endSaid=1;sayRaw(offer?['P_tb_done',500,'P_tb_up']:['P_tb_done'],null)}
    if(offer){const L=tbLevel();$('tb-up').onclick=()=>{FX.chime();t.lvl=L+1;t.offer[L]=99;save();logChange('tb',L,L+1,'mode',`Tiny books: moved up to ${TB_LV[L+1]} after 3 books read with little help.`);$('tb-words').querySelector('.tb-offer').innerHTML=`<p>Now on ${TB_LV[L+1]}. New books are on the shelf!</p>`};
      $('tb-stay').onclick=()=>{FX.tap();t.offer[L]=TBOOKS().filter(x=>x.lvl===L&&t.read[x.id]&&tbEasy(x.id,x)).length;save();$('tb-words').querySelector('.tb-offer').remove()}}
    if(TB.from.run)btn('big-btn go tb-go','✓ Done','Done',()=>{FX.tap();const r=TB.from.run;TB=null;if(RUN===r){go('play');roundDone(true)}else go('path')});
    else{btn('pill-btn','↻ Read again','Read again',()=>{FX.tap();TB.p=-1;TB.tried={};TB.help=0;TB.tapped={};TB.endSaid=0;TB.doneSaid=0;tbRender()});btn('pill-btn primary','📚 Another book','Another book',()=>{FX.tap();tbBack()})}}
  else{const pg=b.pages[p];$('tb-pic').innerHTML=scene2(TB.s,p);$('tb-words').innerHTML=`<p class="tb-text">${tbWords(pg.t)}</p>`;
    $('tb-words').querySelectorAll('.tb-text span').forEach(sp=>sp.onclick=()=>tbWord(sp));
    const tried=!!TB.tried[p];
    btn('round','◀','Previous page',()=>{FX.tap();recCancel();TB.p--;tbRender()});
    const mic=micOn();
    btn('big-btn '+(mic?'star':'go')+' tb-try'+(tried?'':' tb-pulse'),mic?'🎤':'✋ I read it!',mic?'Read it to me':'I read it',x=>{if(mic){FX.tap();recPage(x,ok=>{if(!TB||TB.p!==p)return;if(!ok&&!micOn()){tbRender();return}tbTried(p)})}else{FX.chime();tbTried(p)}},'tb-try');
    const h=btn('round tb-hear'+(tried?' tb-pulse':''),'🔊','Hear Haathi read it',()=>{FX.tap();tbHear()},'tb-hear');h.hidden=!tried;
    btn('round tb-next'+(tried?' tb-pulse':''),'▶','Next page',()=>{FX.tap();recCancel();TB.p++;tbRender()},'tb-next');
    if(p===0&&!TB.toldTry){TB.toldTry=1;setTimeout(()=>{if(TB&&TB.p===0&&!RECNOW)sayRaw([mic?'P_tb_mic':'P_tb_self'],null)},300)}}}
function tbTried(p){if(!TB||TB.p!==p)return;TB.tried[p]=1;const h=$('tb-hear'),nx=$('tb-next'),tr=$('tb-try');if(h){h.hidden=false;h.classList.add('tb-pulse')}if(nx)nx.classList.add('tb-pulse');if(tr)tr.classList.remove('tb-pulse');
  if(!TB.hearTold){TB.hearTold=true;sayRaw(['P_tb_hear'],null)}}
async function tbWord(sp){if(!TB)return;const k=sp.dataset.w;if(!k)return;stopVoice();tbStopAudio();const key=TB.p+':'+k;if(!TB.tapped[key]){TB.tapped[key]=1;TB.help++}
  sp.classList.remove('tapped');void sp.offsetWidth;sp.classList.add('tapped');const u=await tbBlob(`books/audio/w/${k.replace(/'/g,'_')}.mp3`);if(!u||!TB)return;tbAudio.src=u;tbAudio.play().catch(()=>{})}
async function tbHear(){if(!TB)return;stopVoice();const {b,p}=TB;const u=await tbBlob(`books/audio/${b.id}_${p}.mp3`);if(!u||!TB||TB.p!==p)return;
  const t=document.querySelector('#tb-words .tb-text');if(!t)return;const ws=[...t.querySelectorAll('span')];ws.forEach(w=>w.classList.remove('lit'));t.classList.add('reading');
  tbAudio.src=u;tbAudio.ontimeupdate=()=>{if(!tbAudio.duration)return;const lead=.25,tail=.4;const f=Math.max(0,Math.min(1,(tbAudio.currentTime-lead)/Math.max(.1,tbAudio.duration-lead-tail)));
    const tot=ws.reduce((a,w)=>a+w.textContent.length+1,0);let acc=0,cut=f*tot;ws.forEach(w=>{acc+=w.textContent.length+1;w.classList.toggle('lit',acc<=cut+2)})};
  tbAudio.onended=()=>{ws.forEach(w=>w.classList.add('lit'));t.classList.remove('reading');const nx=$('tb-next');if(nx)nx.classList.add('tb-pulse')};tbAudio.play().catch(()=>{})}
$('tb-back').innerHTML=ICON.back;$('tb-back').onclick=()=>{FX.tap();tbBack()};
CHILD.push('book');
document.addEventListener('visibilitychange',()=>{if(document.hidden){tbStopAudio();recCancel()}});

/* ---- in an adventure: a Tiny book is one stop ---- */
Object.assign(ROUNDS,{tinybook:1});Object.assign(TITLES,{tinybook:'Tiny book'});Object.assign(ND_ICO,{tinybook:'📗'});
ACT.tinybook=n=>{if(!tbOpen(n.book,{run:RUN})){const b=tbPick();if(b){n.book=b.id;if(tbOpen(b.id,{run:RUN}))return}roundDone(true)}};
/* ages 5 to 7: a Tiny book takes the letters or reading stop every other adventure. A day that meets a new letter keeps it, and the book comes next time */
function tbAdv(){const c=S.chapters[S.chapters.length-1];if(!c||!c.adv||ageR()<5||!TBOOKS().length)return;
  const prev=S.chapters[S.chapters.length-2];if(prev&&prev.nodes.some(n=>n.t==='tinybook'))return;
  const i=c.nodes.findIndex((n,k)=>(k===1||k===3)&&(LGAMES[n.t]||READ_G[n.t])&&n.stars==null);if(i<0)return;
  const b=tbPick();if(!b)return;const old=c.nodes[i];c.nodes[i]={t:'tinybook',book:b.id,stars:null};
  const r=c.reasons.findIndex(x=>/^(Reading|Letter practice)/.test(x));const txt=`Tiny book: ${b.title} (${TB_LV[b.lvl]})`;if(r>=0)c.reasons[r]=txt;else c.reasons.push(txt);save()}
const composeAdv0=composeAdv;composeAdv=function(carry){composeAdv0(carry);try{tbAdv()}catch(e){}};

/* ---- the shelf: "Books I can read" sits above the stories ---- */
const openStories0=openStories;
openStories=function(){openStories0();if(!tbShown())return;const b=$('corner-body'),t=tbS(),L=tbLevel();
  const mine=TBOOKS().filter(x=>x.lvl===L),easy=TBOOKS().filter(x=>x.lvl<L);
  const sec=document.createElement('div');sec.className='tb-shelf';
  const card=x=>`<button class="tb-card" data-id="${x.id}"><div class="tb-cv">${scene2({cast:x.cast,pages:[{s:x.cover}]},0,true)}</div><b>${x.title}</b><small>${TB_LV[x.lvl]}${t.read[x.id]?' · ✓ read':''}</small></button>`;
  sec.innerHTML=`<h3 class="tb-h">📗 Books I can read <small>${TB_LV[L]}</small></h3><div class="tb-row">${mine.map(card).join('')}</div>${easy.length?`<details class="tb-easy"><summary>Easier books</summary><div class="tb-row">${easy.map(card).join('')}</div></details>`:''}<h3 class="tb-h">🌙 Stories to listen to</h3>`;
  b.insertBefore(sec,b.firstChild);sec.querySelectorAll('.tb-card').forEach(c=>c.onclick=()=>{unlockAudio();FX.tap();tbOpen(c.dataset.id,{})});
  if(!t.shelfSeen){t.shelfSeen=1;save();setTimeout(()=>{if(current==='corner')sayRaw(['P_tb_shelf'],null)},900)}};

/* ---- "I read" on the stories, ages 6 and 7, when a grown-up has switched the microphone on ---- */
const stRender6=stRender;
stRender=function(){stRender6();const b=$('st-ir');if(!b||!SR)return;const pg=SR.s.pages[SR.p];
  const ok=micOn()&&ageR()>=6&&SR.s.v2&&SR.p>=0&&pg&&!pg.ask&&!pg.ctx&&pg.t;b.hidden=!ok;b.classList.remove('rec-on');b.innerHTML='🎤';b.setAttribute('aria-label','I read: read this page aloud');
  b.onclick=()=>{unlockAudio();FX.tap();const pp=SR.p;recPage(b,()=>{if(SR&&SR.p===pp&&!micOn())b.hidden=true})}};
{const ost=$('st-back').onclick;$('st-back').onclick=()=>{recCancel();ost&&ost()}}
['st-prev','st-next'].forEach(id=>{const o=$(id).onclick;$(id).onclick=()=>{recCancel();o&&o()}});

/* ---- Grown-ups: level setting, and Tiny books in Progress and the weekly summary ---- */
{const sel=$('ps-tb');if(sel){const rp=renderParent;renderParent=function(){rp();const t=tbS();sel.value=t.lvl==null?'auto':String(t.lvl)};
  $('ps-save').addEventListener('click',()=>{const t=tbS(),v=sel.value,was=tbLevel();t.lvl=v==='auto'?null:+v;const now=tbLevel();if(now!==was)logChange('tb',was,now,'mode',`Tiny books set to ${TB_LV[now]} by a grown-up.`);save();r5AreasRender();r5Today()})}}
const tbReadIn=keys=>Object.values(tbS().read).filter(d=>keys.includes(d)).length;

/* ======================= RELEASE 7: six new games (Step E) ======================= */
/* shared: tap an item, or drag it onto a target. A short press counts as a tap */
function dragTap(el,target,onDrop){let st=null,ghost=null;
  el.onpointerdown=e=>{if(el.disabled)return;e.preventDefault();st={x:e.clientX,y:e.clientY,id:e.pointerId,moved:false};try{el.setPointerCapture(e.pointerId)}catch(_){}};
  el.onpointermove=e=>{if(!st)return;const dx=e.clientX-st.x,dy=e.clientY-st.y;if(!st.moved&&Math.hypot(dx,dy)>10){st.moved=true;ghost=el.cloneNode(true);ghost.classList.add('dt-ghost');document.body.appendChild(ghost)}
    if(ghost){ghost.style.left=e.clientX+'px';ghost.style.top=e.clientY+'px'}};
  const end=e=>{if(!st)return;const s=st;st=null;if(ghost){ghost.remove();ghost=null}if(e.type==='pointercancel')return;
    const t=typeof target==='function'?target():target;let over=false;if(t){const r=t.getBoundingClientRect();over=e.clientX>=r.left-10&&e.clientX<=r.right+10&&e.clientY>=r.top-10&&e.clientY<=r.bottom+10}
    if(!s.moved||over)onDrop(el)};
  el.onpointerup=end;el.onpointercancel=end;el.oncontextmenu=e=>e.preventDefault()}
const r7Alive=(n,el)=>RUN&&RUN.node===n&&document.body.contains(el);
const motionOn=()=>S.settings.tilt!==false;

/* ---------------------------------------------------------------- Shake and count (ages 3 and 4) */
const DAFLI=`<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="44" fill="#b9793f"/><circle cx="50" cy="50" r="36" fill="#f6e2b8"/>${[0,1,2,3,4,5].map(i=>{const a=i*Math.PI/3,x=50+40*Math.cos(a),y=50+40*Math.sin(a);return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6" fill="#e8c46a" stroke="#a4801f" stroke-width="2"/>`}).join('')}<circle cx="50" cy="50" r="7" fill="#e7cf9c"/></svg>`;
ACT.shakecount=n=>{const max=n.max||5,target=deck('sk'+max,range(max>5?4:1,max)),run=RUN;let count=0,wrong=false,busy=false;const L=once(ok=>learnN(n,ok));
  const ask=motionOn()&&typeof DeviceMotionEvent!=='undefined'&&typeof DeviceMotionEvent.requestPermission==='function';
  body().innerHTML=`<div class="sk-wrap"><div class="sk-ask" aria-label="Put ${target} ladoos in the jar"><b>${target}</b><span>${objHTML('ladoo',0,'s4')}</span></div>
    <div class="sk-row"><button class="sk-daf" id="sk-daf" aria-label="Dafli: tap to drop a ladoo">${DAFLI}</button><div class="sk-jar" id="sk-jar"><div class="sk-in" id="sk-in"></div></div></div>
    ${ask?'<button class="pill-btn small" id="sk-perm">📱 Shake</button>':''}</div>`;
  const jar=$('sk-in'),daf=$('sk-daf');
  const prompt=()=>say(['P_sk_go',250,N(target),...(run.round===0?[400,'P_sk_how']:[])],`Put ${target} ladoo${target>1?'s':''} in the jar!`);RUN.prompt=prompt;prompt();
  const add=()=>{if(busy||!r7Alive(n,jar))return;if(count>=20)return;count++;const d=document.createElement('span');d.className='obj ladoo s4 sk-l';d.setAttribute('role','button');d.setAttribute('aria-label','Take this ladoo out');
    d.onclick=()=>{if(busy)return;d.remove();count--;FX.swish();say([N(count)],String(count))};jar.appendChild(d);FX.pop();anim(daf,'sk-hit',260);say([N(count)],String(count))};
  daf.onclick=()=>{unlockAudio();add()};
  let last=null,lastT=0;const mot=e=>{if(!r7Alive(n,jar)){window.removeEventListener('devicemotion',mot);return}const a=e.accelerationIncludingGravity;if(!a||a.x==null)return;
    if(last){const d=Math.abs(a.x-last.x)+Math.abs(a.y-last.y)+Math.abs(a.z-last.z),t=Date.now();if(d>20&&t-lastT>380){lastT=t;add()}}last={x:a.x,y:a.y,z:a.z}};
  if(motionOn()&&typeof DeviceMotionEvent!=='undefined'){if(ask)$('sk-perm').onclick=()=>{try{DeviceMotionEvent.requestPermission().then(r=>{if(r==='granted'){window.addEventListener('devicemotion',mot);const b=$('sk-perm');if(b)b.remove()}}).catch(()=>{})}catch(_){}};else window.addEventListener('devicemotion',mot)}
  actions([['go','',()=>{if(busy)return;if(count===target){busy=true;L(!wrong);window.removeEventListener('devicemotion',mot);FX.chime();burst(jar,16);say([N(target),250,rnd(PRAISE)],`${target}! Well done!`).then(()=>{if(RUN===run)roundDone(!wrong)})}
    else{wrong=true;L(false);FX.boing();anim(jar,'wiggle',500);say(count>target?['P_sk_over']:['P_sk_less',300,'P_sk_go',250,N(target)],count>target?'Too many! Tap a ladoo to take it out.':'Not yet! The jar needs more.')}},ICON.check||'✓','sk-done']])};

/* ---------------------------------------------------------------- Haathi's dhaba (ages 3 to 5) */
const SAMOSA='<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M50 12L90 84H10Z" fill="#e1a84b" stroke="#a8702a" stroke-width="5" stroke-linejoin="round"/><path d="M50 30L74 76" stroke="#c98b3a" stroke-width="4"/></svg>';
const JALEBI='<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M50 52c0-6 8-6 8 0s-10 12-16 4-2-20 10-20 22 10 20 24-16 26-32 22-26-20-20-36 26-26 40-20" fill="none" stroke="#f39a1e" stroke-width="9" stroke-linecap="round"/></svg>';
const DH_FOOD={roti:{e:'🫓',n:'roti'},dal:{e:'🍲',n:'dal'},rice:{e:'🍚',n:'rice'},samosa:{h:SAMOSA,n:'samosa'},ladoo:{h:'<span class="obj ladoo s3" style="margin:0"></span>',n:'ladoo'},jalebi:{h:JALEBI,n:'jalebi'},chai:{e:'☕',n:'chai'},lassi:{e:'🥛',n:'lassi'},egg:{e:'🥚',n:'egg'}};
const dhPic=k=>{const f=DH_FOOD[k];return f.h||`<span class="dh-e">${f.e}</span>`};
const DH_GUEST=['🐒','🐄','🐇','🐐','🦚','🐻','🐼','🦊','🐯','🦒'];
const dhSay=(k,q)=>[N(q),'P_dh_f_'+k+(q===1?'1':'N')];
const dhTxt=(k,q)=>{const s={roti:['roti','rotis'],dal:['bowl of dal','bowls of dal'],rice:['plate of rice','plates of rice'],samosa:['samosa','samosas'],ladoo:['ladoo','ladoos'],jalebi:['jalebi','jalebis'],chai:['cup of chai','cups of chai'],lassi:['glass of lassi','glasses of lassi'],egg:['boiled egg','boiled eggs']}[k];return q+' '+s[q===1?0:1]};
ACT.dhaba=n=>{const run=RUN,dishes=n.dishes||1,max=n.max||3;const keys=shuffle(Object.keys(DH_FOOD));const ord=keys.slice(0,dishes).map(k=>({k,q:ri(1,max)}));
  const shelf=shuffle([...ord.map(o=>o.k),...keys.slice(dishes,dishes+(dishes===1?2:2))]);const guest=rnd(DH_GUEST);const plate={};let wrong=false,busy=false;const L=once(ok=>learnN(n,ok));
  body().innerHTML=`<div class="dh-wrap"><div class="dh-top"><span class="dh-guest">${guest}</span><div class="dh-bubble">${ord.map(o=>`<span class="dh-o" data-k="${o.k}" data-q="${o.q}"><b>${o.q}</b>${dhPic(o.k)}</span>`).join('<i>+</i>')}</div></div>
    <div class="dh-thali" id="dh-thali" aria-label="Thali"></div><div class="dh-shelf" id="dh-shelf"></div></div>`;
  const thali=$('dh-thali'),sh=$('dh-shelf');
  const sayOrder=()=>say([...(run.round===0?['P_dh_hello',300]:[]),'P_dh_want',...ord.flatMap((o,i)=>[...(i?['P_and']:[]),...dhSay(o.k,o.q)]),'P_dh_please',...(run.round===0?[400,'P_dh_serve']:[])],ord.map(o=>dhTxt(o.k,o.q)).join(' and ')+', please!');
  RUN.prompt=sayOrder;sayOrder();
  const draw=()=>{thali.innerHTML=Object.keys(plate).filter(k=>plate[k]>0).map(k=>`<div class="dh-pile">${Array.from({length:plate[k]},()=>`<button class="dh-item" data-k="${k}" aria-label="Take off one ${DH_FOOD[k].n}">${dhPic(k)}</button>`).join('')}</div>`).join('');
    thali.querySelectorAll('.dh-item').forEach(b=>b.onclick=()=>{if(busy)return;plate[b.dataset.k]--;FX.swish();draw()})};
  shelf.forEach(k=>{const b=document.createElement('button');b.className='dh-food';b.dataset.k=k;b.innerHTML=dhPic(k)+`<small>${DH_FOOD[k].n}</small>`;b.setAttribute('aria-label','Add '+DH_FOOD[k].n);sh.appendChild(b);
    dragTap(b,thali,()=>{if(busy||!r7Alive(n,thali))return;const tot=Object.values(plate).reduce((a,c)=>a+c,0);if(tot>=14)return;plate[k]=(plate[k]||0)+1;FX.pop();draw();anim(thali,'dh-bump',300)})});
  actions([['star','Serve',()=>{if(busy)return;const ok=ord.every(o=>(plate[o.k]||0)===o.q)&&Object.keys(plate).every(k=>!plate[k]||ord.some(o=>o.k===k));
    if(ok){busy=true;L(!wrong);FX.chime();burst(thali,18);const g=body().querySelector('.dh-guest');if(g)g.textContent='😋';say(['P_dh_thanks',250,rnd(PRAISE)],'Yum! Thank you!').then(()=>{if(RUN===run)roundDone(!wrong)})}
    else{wrong=true;L(false);FX.boing();anim(thali,'wiggle',500);say(['P_dh_wrong',300,'P_dh_want',...ord.flatMap((o,i)=>[...(i?['P_and']:[]),...dhSay(o.k,o.q)]),'P_dh_please'],'Not quite. '+ord.map(o=>dhTxt(o.k,o.q)).join(' and ')+', please!')}},'🛎️ ','dh-serve']])};
ACT.dhaba2=n=>ACT.dhaba(Object.assign(n,{dishes:2}));

/* ---------------------------------------------------------------- Who am I? riddles (ages 4 to 6) */
const RID=window.HAATHI_RIDDLES||{};const RIDB={};
async function ridPlay(k,i){const p=`riddles/audio/${k}_${i}.mp3`;let u=RIDB[p];if(!u){try{const r=await fetch(p);if(!r.ok)throw 0;u=RIDB[p]=URL.createObjectURL(await r.blob())}catch(e){return}}
  stopVoice();await new Promise(res=>{try{const a=r7Aud;a.onended=res;a.onerror=res;a.src=u;a.play().catch(res)}catch(e){res()}})}
const r7Aud=new Audio();
GAME_AGE.whoami=4;GLABEL.whoami='Who am I?';GICON.whoami='🕵️';
DSC.sections.forEach(s=>{if(['fruits','vegetables','farm','wild','birds','sea','bugs','vehicles','helpers','sky'].includes(s.id)&&s.items.filter(i=>RID[i.k]).length>=4&&!s.games.includes('whoami'))s.games.push('whoami')});
ACT.d_whoami=n=>{const run=RUN,sec=DSEC[n.sec];const all=(sec?sec.items.map(i=>i.k):Object.keys(RID)).filter(k=>DI(k).e&&DI(k).e!=='❓');const pool=all.filter(k=>RID[k]);
  const k=deck('who'+(n.sec||''),pool);const opts=shuffle([k,...others(all,k,Math.max(2,nopt()-1))]);let clue=0,wrong=false,busy=false,miss=0;const L=once(ok=>learnN(n,ok));
  body().innerHTML=`<div class="who-top"><span class="who-q">🕵️ Who am I?</span><span class="who-dots" id="who-dots">${[0,1,2].map(i=>`<i class="${i===0?'on':''}"></i>`).join('')}</span><button class="pill-btn small" id="who-more">💡 Another clue</button></div><p class="who-clue" id="who-clue"></p><div class="choices" id="pk"></div>`;
  const cl=$('who-clue'),more=$('who-more');
  const show=i=>{cl.textContent=RID[k][i];$('who-dots').querySelectorAll('i').forEach((d,j)=>d.classList.toggle('on',j<=i));more.disabled=i>=2;more.classList.toggle('dim',i>=2)};
  const give=async(i,intro)=>{show(i);if(intro)await say(['P_who_intro'],null);else if(i>0)await say(['P_who_more'],null);if(RUN!==run||busy)return;await ridPlay(k,i)};
  RUN.prompt=()=>give(clue,false);give(0,true);
  more.onclick=()=>{unlockAudio();FX.tap();if(busy||clue>=2)return;clue++;give(clue,false)};
  opts.forEach(x=>{const d=DI(x);const b=document.createElement('button');b.className='pcard who-card';b.innerHTML=`<span>${d.e}</span><small>${d.n}</small>`;b.setAttribute('aria-label',d.n);b._ok=x===k;
    b.onclick=()=>{if(busy)return;unlockAudio();if(x===k){busy=true;L(!wrong);b.classList.add('right');FX.chime();burst(b,14);try{r7Aud.pause()}catch(e){}say(['P_who_was',DN(k),300,rnd(PRAISE)],`It was the ${d.n.toLowerCase()}!`).then(()=>{if(RUN===run)roundDone(!wrong)})}
      else{wrong=true;miss++;L(false);FX.boing();anim(b,'wiggle',500);b.disabled=true;b.classList.add('dim');if(clue<2){clue++;give(clue,false)}else{const r=[...$('pk').children].find(c=>c._ok);ndHint(r);say(['P_nd_here'],'Here it is. Tap it!')}}};
    $('pk').appendChild(b)})};

/* ---------------------------------------------------------------- Sound blender (age 5) */
const BLEND_W={cat:'🐈',hat:'👒',bat:'🦇',rat:'🐀',dog:'🐕',log:'🪵',nut:'🥜',hut:'🛖',sun:'☀️',bus:'🚌',pig:'🐖',map:'🗺️',bed:'🛏️',leg:'🦵',ten:'🔟',bag:'👜',bug:'🐛',cap:'🧢',hen:'🐔',pen:'🖊️',cup:'☕'};
/* the grown-up's own recorded sound when there is one; otherwise Haathi's */
const pureSnd=l=>hasRec(l)?'R_'+l:'S_'+l;
ACT.blender=n=>{const run=RUN;const w=deck('blend',Object.keys(BLEND_W));const opts=shuffle([w,...others(Object.keys(BLEND_W),w,Math.max(2,nopt()-1))]);let wrong=false,busy=false,heard=new Set(),joined=false;const L=once(ok=>recordLetter(w[0],ok,opts.length,'blender'));
  body().innerHTML=`<div class="bl-track" id="bl-track"><div class="bl-rail"></div>${[...w].map((c,i)=>`<button class="bl-tile" data-i="${i}" aria-label="Sound ${c}">${c}</button>`).join('')}<span class="bl-ball" id="bl-ball" aria-hidden="true">👆</span></div><div class="bl-word" id="bl-word" hidden>${w}</div><div class="choices bl-pk" id="pk" hidden></div>`;
  const tr=$('bl-track'),tiles=[...tr.querySelectorAll('.bl-tile')],ball=$('bl-ball');
  const prompt=()=>say(joined?['P_bl_pick']:['P_bl_slide'],joined?'Which picture is it?':'Slide your finger over the letters!');RUN.prompt=prompt;prompt();
  const play=i=>{tiles.forEach((t,j)=>t.classList.toggle('lit',j===i));heard.add(i);say([pureSnd(w[i])],w[i])};
  tiles.forEach((t,i)=>t.onclick=e=>{if(e.detail!==0)return;unlockAudio();play(i)});
  let drag=false,lastI=-1;const pos=e=>{const r=tr.getBoundingClientRect();const x=Math.max(0,Math.min(r.width,e.clientX-r.left));ball.style.left=x+'px';
    const i=tiles.findIndex(t=>{const b=t.getBoundingClientRect();return e.clientX>=b.left&&e.clientX<=b.right});if(i>=0&&i!==lastI){lastI=i;play(i)}
    if(x>=r.width-6&&heard.size===w.length&&!joined)join()};
  tr.onpointerdown=e=>{unlockAudio();drag=true;lastI=-1;try{tr.setPointerCapture(e.pointerId)}catch(_){}pos(e)};
  tr.onpointermove=e=>{if(drag)pos(e)};tr.onpointerup=tr.onpointercancel=()=>{drag=false;if(heard.size===w.length&&!joined)join()};
  const join=()=>{if(joined||!r7Alive(n,tr))return;joined=true;tiles.forEach(t=>t.classList.add('lit'));FX.sparkle&&FX.sparkle();$('bl-word').hidden=false;
    say(['P_bl_join',300,...[...w].map(c=>pureSnd(c)),250,W(w),400,'P_bl_pick'],w).then(()=>{if(RUN!==run)return;const pk=$('pk');pk.hidden=false;
      opts.forEach(x=>{const b=document.createElement('button');b.className='pcard';b.innerHTML=BLEND_W[x];b.setAttribute('aria-label',x);b._ok=x===w;
        b.onclick=()=>{if(busy)return;if(x===w){busy=true;L(!wrong);b.classList.add('right');FX.chime();burst(b,14);say([W(w),250,rnd(PRAISE)],`${w}!`).then(()=>{if(RUN===run)roundDone(!wrong)})}
          else{wrong=true;L(false);FX.boing();anim(b,'wiggle',500);say([...[...w].map(c=>pureSnd(c)),250,W(w)],w)}};pk.appendChild(b)})})};
  if(run.round===0)setTimeout(()=>{if(RUN===run&&!heard.size)ball.classList.add('bl-demo')},1600)};

/* ---------------------------------------------------------------- Act-it-out sums (ages 5 to 7) */
const AO={birds:{op:'+',e:'🐦',home:'🌳',hc:'ao-tree',a:'P_ao_birds_a',b:['#','P_ao_birds_b'],q:'P_ao_birds_q',ta:(a)=>`${a} bird${a>1?'s':''} sit on the tree.`,tb:b=>`${b} more fly in. Move them onto the tree!`,tq:'How many birds are on the tree now?'},
  fish:{op:'+',e:'🐟',home:'',hc:'ao-pond',a:'P_ao_fish_a',b:['#','P_ao_fish_b'],q:'P_ao_fish_q',ta:a=>`${a} fish swim in the pond.`,tb:b=>`${b} more jump in. Move them into the pond!`,tq:'How many fish are in the pond now?'},
  ladoo:{op:'-',e:'ladoo',home:'',hc:'ao-plate',a:'P_ao_ladoo_a',b:['P_ao_ladoo_b1','#','P_ao_ladoo_b2'],q:'P_ao_ladoo_q',ta:a=>`${a} ladoos are on the plate.`,tb:b=>`Haathi is hungry. Give him ${b}!`,tq:'How many ladoos are left on the plate?'},
  mango:{op:'-',e:'🥭',home:'🌳',hc:'ao-tree',a:'P_ao_mango_a',b:['#','P_ao_mango_b'],q:'P_ao_mango_q',ta:a=>`${a} mangoes hang on the tree.`,tb:b=>`${b} fall down. Tap them to make them fall!`,tq:'How many mangoes are still on the tree?'}};
ACT.actout=n=>{const run=RUN,max=n.max||10;const kind=deck('ao'+max,Object.keys(AO));const sc=AO[kind];let a,b;
  if(sc.op==='+'){b=ri(1,max>10?5:3);a=ri(max>10?5:1,max-b)}else{b=ri(1,max>10?5:3);a=ri(b+(max>10?3:1),max)}
  const ans=sc.op==='+'?a+b:a-b;let moved=0,wrong=false,busy=false;const L=once(ok=>learnN(n,ok));const obj=i=>sc.e==='ladoo'?`<span class="obj ladoo s3"></span>`:`<span class="ao-e">${sc.e}</span>`;
  body().innerHTML=`<div class="ao-wrap ao-${kind}"><div class="ao-home ${sc.hc}" id="ao-home">${sc.home?`<span class="ao-bg">${sc.home}</span>`:''}<div class="ao-in" id="ao-in">${Array.from({length:sc.op==='+'?a:a},(_,i)=>`<span class="ao-o${sc.op==='-'?' ao-t':''}" data-i="${i}">${obj(i)}</span>`).join('')}</div></div>
    ${sc.op==='+'?`<div class="ao-out" id="ao-out">${Array.from({length:b},(_,i)=>`<button class="ao-o ao-mv" aria-label="Move me">${obj(i)}</button>`).join('')}</div>`:`<div class="ao-out ao-haathi" id="ao-out">${kind==='ladoo'?'<span class="ao-hh">🐘</span>':'<span class="ao-ground"></span>'}</div>`}
    <div class="choices" id="ao-ch" hidden></div></div>`;
  const home=$('ao-in'),out=$('ao-out');
  const seqB=()=>sc.b.flatMap(x=>x==='#'?[N(b)]:[x]);
  const story=()=>say([N(a),sc.a,300,...seqB()],`${sc.ta(a)} ${sc.tb(b)}`);
  const ask=()=>{const ch=$('ao-ch');if(!ch||!ch.hidden)return;ch.hidden=false;say([sc.q],sc.tq);
    numChoices(ans,Math.max(max,a),ch,(btn,v)=>{if(busy)return;const ok=v===ans;L(ok);
      if(ok){busy=true;btn.classList.add('right');FX.chime();burst(btn,14);say([N(ans),300,rnd(PRAISE)],`${ans}!`).then(()=>{if(RUN===run)roundDone(!wrong)})}
      else{wrong=true;FX.boing();anim(btn,'wiggle',500);say(['P_count_again'],"Let's count together.")}},0)};
  RUN.prompt=()=>moved>=b?say([sc.q],sc.tq):story();story();
  const done1=()=>{moved++;if(moved>=b)setTimeout(()=>{if(r7Alive(n,home))ask()},450)};
  if(sc.op==='+')out.querySelectorAll('.ao-mv').forEach(el=>dragTap(el,home,()=>{if(el.disabled||!r7Alive(n,home))return;el.disabled=true;const s=document.createElement('span');s.className='ao-o ao-new';s.innerHTML=obj(0);home.appendChild(s);el.style.visibility='hidden';FX.pop();done1()}));
  else home.querySelectorAll('.ao-t').forEach(el=>{const go=()=>{if(moved>=b||el.classList.contains('gone')||!r7Alive(n,home))return;el.classList.add('gone');FX.swish();if(kind==='ladoo'){const s=document.createElement('span');s.className='ao-eaten';s.innerHTML=obj(0);out.appendChild(s)}else{const s=document.createElement('span');s.className='ao-fallen';s.innerHTML=obj(0);out.appendChild(s)}done1()};
    el.setAttribute('role','button');el.setAttribute('aria-label',kind==='ladoo'?'Give to Haathi':'Make it fall');dragTap(el,kind==='ladoo'?out:null,go)})};
ACT.actout20=n=>ACT.actout(Object.assign(n,{max:20}));

/* ---------------------------------------------------------------- Slide to the number (ages 6 and 7) */
ACT.slide=n=>{const run=RUN,max=n.max||20;const target=deck('sl'+max,range(1,max-1).filter(v=>max<=20||v%10!==0));let v=0,vel=0,gx=0,wrong=false,busy=false,miss=0,drag=false;const L=once(ok=>learnN(n,ok));
  const step=max<=20?5:10;const canTilt=motionOn()&&typeof DeviceOrientationEvent!=='undefined',ask=canTilt&&typeof DeviceOrientationEvent.requestPermission==='function';
  body().innerHTML=`<div class="sl-wrap"><div class="sl-ask">Take Haathi to <b>${target}</b></div><div class="sl-line" id="sl-line"><div class="sl-bar"></div>${range(0,max).map(i=>`<i class="sl-tick${i%step===0?' big':''}" style="left:${i/max*100}%">${i%step===0?`<span>${i}</span>`:''}</i>`).join('')}<span class="sl-h" id="sl-h">🐘</span><span class="sl-show" id="sl-show" hidden></span></div>${ask?'<button class="pill-btn small" id="sl-perm">📱 Tilt</button>':''}</div>`;
  const line=$('sl-line'),hh=$('sl-h');
  const prompt=()=>say(['P_sl_go',N(target),...(run.round===0?[400,'P_sl_how']:[])],`Take Haathi to ${target}!`);RUN.prompt=prompt;prompt();
  const place=()=>{hh.style.left=(v/max*100)+'%'};place();
  const fromX=e=>{const r=line.getBoundingClientRect();v=Math.max(0,Math.min(max,(e.clientX-r.left)/r.width*max));vel=0;place()};
  line.onpointerdown=e=>{unlockAudio();drag=true;try{line.setPointerCapture(e.pointerId)}catch(_){}fromX(e)};line.onpointermove=e=>{if(drag)fromX(e)};line.onpointerup=line.onpointercancel=()=>{drag=false};
  const ori=e=>{if(e.gamma==null)return;gx=Math.max(-1,Math.min(1,e.gamma/30))};
  if(canTilt){window.addEventListener('deviceorientation',ori);if(ask)$('sl-perm').onclick=()=>{try{DeviceOrientationEvent.requestPermission().then(()=>{const b=$('sl-perm');if(b)b.remove()}).catch(()=>{})}catch(_){}}}
  const stop=()=>window.removeEventListener('deviceorientation',ori);
  const loop=()=>{if(!r7Alive(n,line)){stop();return}if(!drag&&!busy&&Math.abs(gx)>.06){vel=vel*.9+gx*max*.0008;v=Math.max(0,Math.min(max,v+vel));place()}else vel*=.8;requestAnimationFrame(loop)};requestAnimationFrame(loop);
  actions([['go','',()=>{if(busy)return;const at=Math.round(v);v=at;place();const sh=$('sl-show');sh.hidden=false;sh.textContent=at;sh.style.left=(at/max*100)+'%';
    if(at===target){busy=true;L(!wrong);stop();FX.chime();burst(hh,16);say([N(target),300,rnd(PRAISE)],`${target}! Well done!`).then(()=>{if(RUN===run)roundDone(!wrong)})}
    else{wrong=true;miss++;L(false);FX.boing();anim(hh,'wiggle',500);if(NEWUI&&miss>=2){const t=line.querySelectorAll('.sl-tick')[target];if(t)t.classList.add('sl-hint')}
      say([at<target?'P_sl_up':'P_sl_down',300,'P_sl_go',N(target)],at<target?`That is ${at}. Go a bit further!`:`That is ${at}. Go back a little!`)}},ICON.check||'✓','sl-done']])};

/* ---------------------------------------------------------------- register */
Object.assign(SK,{
 shakecount:{sub:'Maths',name:'Shake and count',levels:[5,10],lab:v=>'to '+v,unlock:()=>true,node:v=>({t:'shakecount',max:v})},
 dhaba:{sub:'Maths',name:"Haathi's dhaba",levels:[1,2],lab:v=>v===1?'one dish':'two dishes',unlock:()=>true,node:v=>({t:'dhaba',dishes:v,max:3})},
 dhaba2:{sub:'Maths',name:"Haathi's dhaba, bigger orders",levels:[3,5],lab:v=>'up to '+v+' of each',unlock:()=>true,node:v=>({t:'dhaba2',max:v})},
 actout:{sub:'Maths',name:'Act-it-out sums',levels:[10],lab:()=>'to 10',unlock:()=>true,node:v=>({t:'actout',max:v})},
 actout20:{sub:'Maths',name:'Act-it-out sums to 20',levels:[20],lab:()=>'to 20',unlock:()=>true,node:v=>({t:'actout20',max:v})},
 slide:{sub:'Maths',name:'Slide to the number',levels:[20,100],lab:v=>'0 to '+v,unlock:()=>true,node:v=>({t:'slide',max:v})}});
Object.assign(TIER.numbers,{shakecount:0,dhaba:0,dhaba2:1,actout:1,actout20:2,slide:2});
CORNER.numbers.push(['shakecount','Shake and count','🪘'],['dhaba',"Haathi's dhaba",'🍛'],['dhaba2',"Haathi's dhaba",'🍛'],['actout','Act-it-out sums','🐦+'],['actout20','Act-it-out sums','🐦+'],['slide','Slide to the number','🐘↔']);
TIER.letters.blender=1;LGAMES.blender=()=>true;CORNER.letters.push(['blender','Sound blender','c·a·t']);
Object.assign(ROUNDS,{shakecount:4,dhaba:4,dhaba2:4,actout:4,actout20:4,slide:5,blender:4,d_whoami:5});
Object.assign(TITLES,{shakecount:'Shake and count',dhaba:"Haathi's dhaba",dhaba2:"Haathi's dhaba",actout:'Act-it-out sums',actout20:'Act-it-out sums',slide:'Slide to the number',blender:'Sound blender',d_whoami:'Who am I?'});
Object.assign(ND_ICO,{shakecount:'🪘',dhaba:'🍛',dhaba2:'🍛',actout:'🐦',actout20:'🐦',slide:'🐘',blender:'🔤',d_whoami:'🕵️'});

/* ======================= RELEASE 8: Make sandbox (Rangoli, Draw, Story scene, My makes) ======================= */
/* ---- My makes: the 12 newest pictures of each child, kept on this phone only (IndexedDB) ---- */
let MKDB=null;
function mkDB(){if(MKDB)return MKDB;MKDB=new Promise((res,rej)=>{try{const r=indexedDB.open('haathi-makes',1);r.onupgradeneeded=()=>{const d=r.result;if(!d.objectStoreNames.contains('makes')){const st=d.createObjectStore('makes',{keyPath:'id'});st.createIndex('kid','kid')}};r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)}catch(e){rej(e)}});MKDB.catch(()=>{MKDB=null});return MKDB}
const mkKid=()=>{try{return kidsIdx().active||'k0'}catch(e){return 'k0'}};
async function mkList(kid){try{const d=await mkDB();return await new Promise((res,rej)=>{const out=[];const rq=d.transaction('makes').objectStore('makes').index('kid').openCursor(IDBKeyRange.only(kid||mkKid()));
  rq.onsuccess=()=>{const c=rq.result;if(c){out.push(c.value);c.continue()}else res(out.sort((a,b)=>b.t-a.t))};rq.onerror=()=>rej(rq.error)})}catch(e){return []}}
async function mkDel(id){try{const d=await mkDB();await new Promise((res,rej)=>{const tx=d.transaction('makes','readwrite');tx.objectStore('makes').delete(id);tx.oncomplete=res;tx.onerror=()=>rej(tx.error)})}catch(e){}}
async function mkPut(rec){const d=await mkDB();await new Promise((res,rej)=>{const tx=d.transaction('makes','readwrite');tx.objectStore('makes').put(rec);tx.oncomplete=res;tx.onerror=()=>rej(tx.error)});
  const all=await mkList(rec.kid);for(const x of all.slice(12))await mkDel(x.id)}
/* removing a child in Grown-ups also removes that child's pictures */
{const rk=removeKid;removeKid=function(id){rk(id);mkList(id).then(l=>l.forEach(x=>mkDel(x.id)))}}

/* ---- the screen ---- */
const MK={mode:null,cv:null,x:null,W:0,H:0,dpr:1,col:'#ff6fa8',size:8,tool:'pen',stamp:null,undo:[],dirty:false,scene:null,sel:null,copy:null,saved:false};
const MK_NAMES={rangoli:'Rangoli maker',draw:'Draw',scene:'Story scene',gallery:'My makes'};
const MK_RCOL=['#ff6fa8','#ff8c1a','#ffd23f','#3fc380','#33a1fd','#9b5de5','#ffffff','#e63946'];
const MK_DCOL=['#222222','#e63946','#ff8c1a','#ffd23f','#3fc380','#1e88e5','#9b5de5','#ff6fa8','#8d5524','#ffffff'];
const MK_RSTAMP=['●','🌸','🌼','🪔','⭐','💠','🔶','🍃'];
const MK_DSTAMP=['⭐','🌸','🦋','🐘','🌈','☀️','🌙','❤️','🚗','🌳','🐟','🎈'];
const MK_BG=[['forest','🌳'],['village','🏡'],['home','🏠'],['river','🏞️'],['garden','🌷'],['school','🏫'],['market','🛒'],['street','🚗'],['roof','🪁'],['field','🌾'],['sea','🌊'],['mountain','⛰️']];
const MK_TRAY={animals:['🐘','🐒','🦚','🐄','🐐','🐕','🐈','🐇','🦁','🐯','🐸','🦆','🐟','🦋','🐦','🐍','🐢','🐔'],
  people:['👧🏽','👦🏽','👩🏽','👨🏽','👵🏽','👴🏽','👶🏽','🧕🏽','👮🏽‍♀️','👩🏽‍🌾','👨🏽‍🍳','🧑🏽‍🏫','👩🏽‍⚕️','🧑🏽‍🚒'],
  things:['🌳','🌴','🌸','🏠','⛺','🚗','🛺','🚌','🚂','⛵','🪁','⚽','🎈','☀️','🌙','⭐','☁️','🌈','🍎','🥭','🪔','🎂','🎁','🪑']};
CHILD.push('make');
const mkSay=k=>sayRaw([k],null);
function mkOpen(mode){stopVoice();MK.mode=mode;MK.undo=[];MK.dirty=false;MK.sel=null;MK.copy=null;MK.saved=false;MK.tool='pen';MK.stamp=null;go('make');$('mk-title').textContent=MK_NAMES[mode];
  $('s-make').dataset.mode=mode;$('mk-tools').innerHTML='';$('mk-act').innerHTML='';$('mk-stage').innerHTML='';
  if(mode==='gallery'){mkGallery();return}
  requestAnimationFrame(()=>{if(MK.mode!==mode)return;if(mode==='scene')mkScene();else mkPaint(mode)});
  gc('/mk/'+mode+'/open','Make: '+MK_NAMES[mode]);setTimeout(()=>{if(MK.mode===mode)mkSay(mode==='rangoli'?'P_mk_rangoli':mode==='draw'?'P_mk_draw':'P_mk_scene')},300)}
function mkBack(){stopVoice();const m=MK.mode;MK.mode=null;openShelf('make')}
$('mk-back').innerHTML=ICON.back;$('mk-back').onclick=()=>{FX.tap();if(MK.mode==='gallery'&&$('mk-stage').querySelector('.mk-big')){mkGallery();return}mkBack()};
$('mk-hear').innerHTML=ICON.ear;$('mk-hear').onclick=()=>{unlockAudio();FX.tap();const m=MK.mode;if(m)mkSay(m==='rangoli'?(MK.copy?'P_mk_copy':'P_mk_rangoli'):m==='draw'?'P_mk_draw':m==='scene'?'P_mk_scene':'P_mk_gallery')};
function mkBtn(parent,cls,html,label,fn){const b=document.createElement('button');b.className=cls;b.innerHTML=html;b.setAttribute('aria-label',label);b.onclick=()=>{unlockAudio();fn(b)};parent.appendChild(b);return b}
function mkActs(list){const a=$('mk-act');a.innerHTML='';list.forEach(([cls,html,label,fn])=>mkBtn(a,cls,html,label,fn))}

/* ---- painting: Rangoli (eight-way mirror) and Draw ---- */
const MK_T=[[1,0,0,1],[-1,0,0,1],[1,0,0,-1],[-1,0,0,-1],[0,1,1,0],[0,-1,1,0],[0,1,-1,0],[0,-1,-1,0]];
function mkPaint(mode,measured){if(!measured){MK.col=mode==='rangoli'?MK_RCOL[0]:MK_DCOL[1];MK.size=mode==='rangoli'?7:8;mkTools(mode);requestAnimationFrame(()=>{if(MK.mode===mode)mkPaint(mode,true)});return}
  const st=$('mk-stage');const r=st.getBoundingClientRect();let W=Math.max(200,Math.floor(r.width-6)),H=Math.max(200,Math.floor(r.height-6));if(mode==='rangoli'){W=H=Math.min(W,H,640)}else{W=Math.min(W,900);H=Math.min(H,900)}
  const dpr=Math.min(2,devicePixelRatio||1);Object.assign(MK,{W,H,dpr});
  st.innerHTML=`<div class="mk-cwrap ${mode}" style="width:${W}px;height:${H}px"><canvas id="mk-cv"></canvas>${mode==='rangoli'?'<canvas id="mk-guide" aria-hidden="true"></canvas>':''}<div class="mk-copy" id="mk-copy" hidden></div></div>`;
  const cv=$('mk-cv');[cv,$('mk-guide')].forEach(c=>{if(!c)return;c.width=W*dpr;c.height=H*dpr;c.style.width=W+'px';c.style.height=H+'px'});
  const x=cv.getContext('2d');MK.cv=cv;MK.x=x;if(!x)return;x.setTransform(dpr,0,0,dpr,0,0);x.lineCap='round';x.lineJoin='round';
  mkClear();if(mode==='rangoli')mkGuide();
  let down=null,moved=false;const P=e=>{const b=cv.getBoundingClientRect();return [(e.clientX-b.left)*(W/b.width),(e.clientY-b.top)*(H/b.height)]};
  cv.onpointerdown=e=>{e.preventDefault();try{cv.setPointerCapture(e.pointerId)}catch(_){}mkSnap();down=P(e);moved=false;if(MK.tool==='stamp')return;mkLine(down,down)};
  cv.onpointermove=e=>{if(!down||MK.tool==='stamp')return;const p=P(e);if(Math.hypot(p[0]-down[0],p[1]-down[1])<1.5)return;moved=true;mkLine(down,p);down=p};
  cv.onpointerup=cv.onpointercancel=e=>{if(down&&MK.tool==='stamp'&&e.type==='pointerup')mkStampAt(down);down=null}}
function mkClear(){const {x,W,H}=MK;if(!x)return;x.save();x.globalCompositeOperation='source-over';x.fillStyle=MK.mode==='rangoli'?'#5b1f2e':'#ffffff';x.fillRect(0,0,W,H);x.restore()}
function mkGuide(){const g=$('mk-guide');if(!g)return;const c=g.getContext('2d'),{W,H,dpr}=MK;c.setTransform(dpr,0,0,dpr,0,0);c.clearRect(0,0,W,H);c.strokeStyle='rgba(255,255,255,.18)';c.lineWidth=1.5;c.setLineDash([5,7]);
  c.beginPath();c.moveTo(W/2,0);c.lineTo(W/2,H);c.moveTo(0,H/2);c.lineTo(W,H/2);c.moveTo(0,0);c.lineTo(W,H);c.moveTo(W,0);c.lineTo(0,H);c.stroke();c.beginPath();c.arc(W/2,H/2,W*.42,0,Math.PI*2);c.stroke();
  c.setLineDash([]);c.fillStyle='rgba(255,255,255,.06)';c.beginPath();c.moveTo(W/2,H/2);c.lineTo(W/2,0);c.lineTo(0,0);c.closePath();c.fill()}
function mkSnap(){const {x,cv}=MK;if(!x)return;try{MK.undo.push(x.getImageData(0,0,cv.width,cv.height));if(MK.undo.length>6)MK.undo.shift()}catch(e){}}
function mkPts(p){if(MK.mode!=='rangoli')return [p];const cx=MK.W/2,cy=MK.H/2,dx=p[0]-cx,dy=p[1]-cy;return MK_T.map(([a,b,c,d])=>[cx+a*dx+b*dy,cy+c*dx+d*dy])}
function mkLine(a,b){const {x}=MK;if(!x)return;MK.dirty=true;x.save();if(MK.tool==='erase'){x.globalCompositeOperation='source-over';x.strokeStyle=MK.mode==='rangoli'?'#5b1f2e':'#ffffff'}else x.strokeStyle=MK.col;
  x.lineWidth=MK.tool==='erase'?MK.size*2.5:MK.size;const A=mkPts(a),B=mkPts(b);for(let i=0;i<A.length;i++){x.beginPath();x.moveTo(A[i][0],A[i][1]);x.lineTo(B[i][0]+.01,B[i][1]);x.stroke()}x.restore()}
function mkStampAt(p){const {x}=MK;if(!x||!MK.stamp)return;MK.dirty=true;const sz=MK.mode==='rangoli'?MK.size*4+14:MK.size*5+22;x.save();x.textAlign='center';x.textBaseline='middle';x.font=`${sz}px "Noto Color Emoji","Apple Color Emoji","Segoe UI Emoji",sans-serif`;
  mkPts(p).forEach(q=>{if(MK.stamp==='●'){x.fillStyle=MK.col;x.beginPath();x.arc(q[0],q[1],sz*.32,0,Math.PI*2);x.fill()}else x.fillText(MK.stamp,q[0],q[1])});x.restore();FX.pop()}
function mkTools(mode){const t=$('mk-tools');t.innerHTML='';const cols=mode==='rangoli'?MK_RCOL:MK_DCOL,stamps=mode==='rangoli'?MK_RSTAMP:MK_DSTAMP;
  const row1=document.createElement('div');row1.className='mk-row1';t.appendChild(row1);const row2=document.createElement('div');row2.className='mk-row2';t.appendChild(row2);
  const pick=(sel,b)=>{t.querySelectorAll(sel).forEach(z=>z.classList.remove('on'));b.classList.add('on')};
  cols.forEach((c,i)=>{const b=mkBtn(row1,'mk-col'+(i===(mode==='rangoli'?0:1)?' on':''),'',`Colour ${i+1}`,b=>{FX.tap();MK.col=c;if(MK.tool==='erase')MK.tool='pen';pick('.mk-col',b);if(MK.tool==='pen')pick('.mk-tool',$('mk-pen'))});b.style.background=c});
  [[5,'S'],[9,'M'],[16,'L']].forEach(([s,l],i)=>{const b=mkBtn(row1,'mk-size'+(i===(mode==='rangoli'?0:1)?' on':''),`<i style="width:${s+4}px;height:${s+4}px"></i>`,`Size ${l}`,b=>{FX.tap();MK.size=s;pick('.mk-size',b)})});
  const pen=mkBtn(row2,'mk-tool on','✏️','Draw lines',b=>{FX.tap();MK.tool='pen';MK.stamp=null;pick('.mk-tool',b)});pen.id='mk-pen';
  mkBtn(row2,'mk-tool','🧽','Rub out',b=>{FX.tap();MK.tool='erase';MK.stamp=null;pick('.mk-tool',b)});
  stamps.forEach(s=>mkBtn(row2,'mk-tool mk-stamp',s==='●'?'<i class="mk-dot"></i>':s,'Stamp '+s,b=>{FX.tap();MK.tool='stamp';MK.stamp=s;pick('.mk-tool',b)}));
  const acts=[['round','↶','Undo',()=>{FX.swish();const u=MK.undo.pop();if(u&&MK.x)MK.x.putImageData(u,0,0)}],['round','🗑️','Start again',()=>{mkSnap();mkClear();MK.dirty=false;FX.swish()}]];
  if(mode==='rangoli'&&ageR()>=6)acts.push(['pill-btn','🎯 Copy','Copy a rangoli',()=>{FX.tap();mkCopy()}]);
  acts.push(['big-btn go mk-done',ICON.check||'✓','Done, keep it',()=>mkDone()]);mkActs(acts)}

/* ---- copy-this-rangoli challenges for ages 6 and 7 (not scored) ---- */
const MK_COPY=[[{t:'line',a:[0,-.8,.56,-.56],c:'#ffd23f',w:7},{t:'stamp',e:'🌸',p:[.35,-.35]},{t:'stamp',e:'●',p:[0,0],c:'#ff6fa8',w:16}],
  [{t:'line',a:[0,-.25,0,-.75],c:'#3fc380',w:9},{t:'stamp',e:'🪔',p:[.5,-.5]},{t:'line',a:[.2,-.2,.62,-.2],c:'#ffffff',w:5}],
  [{t:'line',a:[.1,-.1,.7,-.7],c:'#ff8c1a',w:9},{t:'line',a:[0,-.6,.42,-.6],c:'#33a1fd',w:7},{t:'stamp',e:'🌼',p:[0,-.85]},{t:'stamp',e:'●',p:[.3,-.3],c:'#ffffff',w:9}]];
function mkCopy(){const box=$('mk-copy');if(!box)return;const i=(S.mkCopyN=(S.mkCopyN||0)+1)%MK_COPY.length;save();const n=96;
  box.innerHTML=`<canvas width="${n*2}" height="${n*2}" style="width:${n}px;height:${n}px"></canvas><small>Copy me</small>`;box.hidden=false;const c=box.querySelector('canvas').getContext('2d');c.scale(2,2);
  c.fillStyle='#5b1f2e';c.fillRect(0,0,n,n);c.lineCap='round';const ctr=n/2,R=n/2;const pts=(px,py)=>MK_T.map(([a,b,cc,d])=>[ctr+(a*px+b*py)*R,ctr+(cc*px+d*py)*R]);
  MK_COPY[i].forEach(op=>{if(op.t==='line'){c.strokeStyle=op.c;c.lineWidth=op.w*n/MK.W*1.6;const A=pts(op.a[0],op.a[1]),B=pts(op.a[2],op.a[3]);A.forEach((p,k)=>{c.beginPath();c.moveTo(p[0],p[1]);c.lineTo(B[k][0],B[k][1]);c.stroke()})}
    else{c.textAlign='center';c.textBaseline='middle';c.font='12px sans-serif';pts(op.p[0],op.p[1]).forEach(p=>{if(op.e==='●'){c.fillStyle=op.c;c.beginPath();c.arc(p[0],p[1],op.w*n/MK.W,0,Math.PI*2);c.fill()}else c.fillText(op.e,p[0],p[1])})}});
  MK.copy=i;mkSay('P_mk_copy')}

/* ---- Story scene: a place, then animals, people and things ---- */
function mkScene(){const st=$('mk-stage');MK.scene=MK.scene&&MK.scene.keep?MK.scene:{bg:'forest',night:false,items:[]};st.innerHTML='';
  const t=$('mk-tools');t.innerHTML='';const row1=document.createElement('div');row1.className='mk-row1 mk-bgs';t.appendChild(row1);const tabs=document.createElement('div');tabs.className='mk-tabs';t.appendChild(tabs);const tray=document.createElement('div');tray.className='mk-row2 mk-tray';t.appendChild(tray);
  MK_BG.forEach(([k,ic])=>{const b=mkBtn(row1,'mk-bgb'+(k===MK.scene.bg?' on':''),ic,'Place: '+k,b=>{FX.tap();MK.scene.bg=k;row1.querySelectorAll('.mk-bgb').forEach(z=>z.classList.remove('on'));b.classList.add('on');mkDrawBg()})});
  mkBtn(row1,'mk-bgb mk-night'+(MK.scene.night?' on':''),'🌙','Night',b=>{FX.tap();MK.scene.night=!MK.scene.night;b.classList.toggle('on',MK.scene.night);mkDrawBg()});
  const showTray=k=>{tray.innerHTML='';MK_TRAY[k].forEach(e=>mkBtn(tray,'mk-stk',e,'Add '+e,()=>{FX.pop();mkAdd(e)}));tabs.querySelectorAll('button').forEach(b=>b.classList.toggle('on',b.dataset.k===k))};
  [['animals','🐾 Animals'],['people','🧒🏽 People'],['things','🌳 Things']].forEach(([k,l])=>{const b=mkBtn(tabs,'mk-tab',l,l,()=>{FX.tap();showTray(k)});b.dataset.k=k});showTray('animals');
  mkActs([['round','↶','Take off the last one',()=>{FX.swish();MK.scene.items.pop();MK.sel=null;mkItems()}],['round','🗑️','Start again',()=>{FX.swish();MK.scene.items=[];MK.sel=null;mkItems()}],['big-btn go mk-done',ICON.check||'✓','Done, keep it',()=>mkDone()]]);
  requestAnimationFrame(()=>{if(MK.mode!=='scene')return;const r=st.getBoundingClientRect();let W=Math.floor(r.width-6),H=Math.floor(W*.75);if(H>r.height-6){H=Math.floor(r.height-6);W=Math.floor(H/.75)}MK.W=W;MK.H=H;
  st.innerHTML=`<div class="mk-scene" id="mk-scene" style="width:${W}px;height:${H}px"><svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" id="mk-bg"></svg><div class="mk-items" id="mk-items"></div><div class="mk-selbar" id="mk-selbar" hidden></div></div>`;
  mkDrawBg();mkItems();
  $('mk-scene').onpointerdown=e=>{if(e.target.closest('.mk-it,.mk-selbar'))return;MK.sel=null;mkItems()}})}
function mkDrawBg(){const g=$('mk-bg');if(!g)return;const r=bgSVG(MK.scene.bg+(MK.scene.night?'N':''));g.innerHTML=r.svg;MK.dirty=true}
function mkAdd(e){const it={e,x:30+Math.random()*40,y:50+Math.random()*25,s:16,f:false};MK.scene.items.push(it);MK.sel=it;MK.dirty=true;mkItems()}
function mkItems(){const box=$('mk-items'),bar=$('mk-selbar');if(!box)return;box.innerHTML='';const {W,H}=MK;
  MK.scene.items.forEach(it=>{const d=document.createElement('div');d.className='mk-it'+(it===MK.sel?' sel':'');d.textContent=it.e;d.style.left=it.x+'%';d.style.top=it.y+'%';d.style.fontSize=(it.s/100*W)+'px';if(it.f)d.style.transform='translate(-50%,-50%) scaleX(-1)';
    let st=null;d.onpointerdown=e=>{e.preventDefault();e.stopPropagation();try{d.setPointerCapture(e.pointerId)}catch(_){}const b=$('mk-scene').getBoundingClientRect();st={b,ox:it.x-(e.clientX-b.left)/b.width*100,oy:it.y-(e.clientY-b.top)/b.height*100};if(MK.sel!==it){MK.sel=it;box.querySelectorAll('.mk-it').forEach(z=>z.classList.remove('sel'));d.classList.add('sel');mkSelBar()}};
    d.onpointermove=e=>{if(!st)return;it.x=Math.max(0,Math.min(100,(e.clientX-st.b.left)/st.b.width*100+st.ox));it.y=Math.max(0,Math.min(100,(e.clientY-st.b.top)/st.b.height*100+st.oy));d.style.left=it.x+'%';d.style.top=it.y+'%';mkSelBar()};
    d.onpointerup=d.onpointercancel=()=>{st=null};box.appendChild(d)});mkSelBar()}
function mkSelBar(){const bar=$('mk-selbar');if(!bar)return;const it=MK.sel;if(!it||!MK.scene.items.includes(it)){bar.hidden=true;return}bar.hidden=false;{const sc=$('mk-scene'),bw=bar.offsetWidth||170,sw=sc?sc.clientWidth:MK.W;bar.style.left=Math.max(bw/2+2,Math.min(sw-bw/2-2,it.x/100*sw))+'px'}bar.style.top=Math.max(0,it.y-it.s/0.75*0.55-11)+'%';
  if(!bar.dataset.built){bar.dataset.built=1;[['➕','Bigger',()=>{MK.sel.s=Math.min(44,MK.sel.s*1.25)}],['➖','Smaller',()=>{MK.sel.s=Math.max(6,MK.sel.s/1.25)}],['↔️','Turn round',()=>{MK.sel.f=!MK.sel.f}],['🗑️','Take off',()=>{MK.scene.items=MK.scene.items.filter(z=>z!==MK.sel);MK.sel=null}]].forEach(([h,l,fn])=>mkBtn(bar,'mk-sb',h,l,()=>{FX.tap();if(!MK.sel)return;fn();mkItems()}))}}
async function mkSceneImg(){const W=800,H=600,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');const r=bgSVG(MK.scene.bg+(MK.scene.night?'N':''));
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">${r.svg}</svg>`;
  await new Promise(res=>{const im=new Image();im.onload=()=>{x.drawImage(im,0,0,W,H);res()};im.onerror=res;im.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg)});
  x.textAlign='center';x.textBaseline='middle';MK.scene.items.forEach(it=>{x.save();x.translate(it.x/100*W,it.y/100*H);if(it.f)x.scale(-1,1);x.font=`${it.s/100*W}px "Noto Color Emoji","Apple Color Emoji","Segoe UI Emoji",sans-serif`;x.fillText(it.e,0,0);x.restore()});return c.toDataURL('image/jpeg',.85)}
function mkPaintImg(){const {cv,W,H}=MK;const s=Math.min(1,800/Math.max(W,H));const c=document.createElement('canvas');c.width=Math.round(W*s);c.height=Math.round(H*s);const x=c.getContext('2d');x.drawImage(cv,0,0,c.width,c.height);return c.toDataURL('image/jpeg',.85)}

/* ---- keep it ---- */
async function mkDone(){const m=MK.mode;const empty=m==='scene'?!MK.scene.items.length:!MK.dirty;if(empty){FX.boing();mkSay('P_mk_empty');return}
  let img=null;try{img=m==='scene'?await mkSceneImg():mkPaintImg()}catch(e){}
  if(img){try{await mkPut({id:'m'+Date.now().toString(36),kid:mkKid(),type:m,t:Date.now(),d:today(),img})}catch(e){img=null}}
  gc('/mk/'+m+'/done','Make: finished a '+MK_NAMES[m]);confetti();FX.fanfare();sayRaw(m==='scene'?['P_mk_saved',400,'P_mk_tell']:['P_mk_saved'],null);MK.saved=true;
  mkActs([['pill-btn','🖼️ My makes','My makes',()=>{FX.tap();mkOpen('gallery')}],['pill-btn primary','✨ Make a new one','Make a new one',()=>{FX.tap();mkOpen(m)}]]);
  if(!img){const a=$('mk-act');a.insertAdjacentHTML('afterbegin','<p class="note">This phone could not keep the picture.</p>')}}

/* ---- My makes ---- */
async function mkGallery(){const st=$('mk-stage');st.innerHTML='<p class="note">Loading…</p>';const list=await mkList();if(MK.mode!=='gallery')return;
  st.innerHTML=list.length?`<div class="mk-grid">${list.map(r=>`<button class="mk-th" data-id="${r.id}" aria-label="${MK_NAMES[r.type]||'Picture'} from ${r.d}"><img src="${r.img}" alt=""><small>${MK_NAMES[r.type]||''}</small></button>`).join('')}</div>`:`<p class="mk-none">Nothing here yet. Make a rangoli, a drawing or a story scene, then press ✓.</p>`;
  $('mk-tools').innerHTML=`<p class="mk-note">These pictures stay on this phone. The 12 newest are kept.</p>`;
  st.querySelectorAll('.mk-th').forEach(b=>b.onclick=()=>{FX.tap();mkView(list.find(r=>r.id===b.dataset.id))});mkActs([]);if(list.length)mkSay('P_mk_gallery')}
function mkView(r){if(!r)return;const st=$('mk-stage');st.innerHTML=`<div class="mk-big"><img src="${r.img}" alt="${MK_NAMES[r.type]||'Picture'}"><small>${MK_NAMES[r.type]||''} · ${r.d}</small></div>`;let arm=false;
  mkActs([['round','🗑️','Delete this picture',b=>{if(!arm){arm=true;FX.tap();b.classList.add('mk-arm');b.innerHTML='🗑️?';setTimeout(()=>{arm=false;if(document.body.contains(b)){b.classList.remove('mk-arm');b.innerHTML='🗑️'}},2500);return}FX.swish();mkDel(r.id).then(mkGallery)}],
    ['pill-btn primary','⬇️ Save to phone','Grown-up: save to phone',()=>{FX.tap();openGate(()=>mkExport(r))}]])}
async function mkExport(r){const name=`haathi-${r.type}-${r.d}.jpg`;let blob=null;try{blob=await (await fetch(r.img)).blob()}catch(e){}if(!blob)return;
  try{const f=new File([blob],name,{type:'image/jpeg'});if(navigator.canShare&&navigator.canShare({files:[f]})){await navigator.share({files:[f],title:'A picture from Haathi'});gc('/mk/export','Make: saved to phone');return}}catch(e){if(e&&e.name==='AbortError')return}
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},2000);gc('/mk/export','Make: saved to phone')}

/* ---- the Make shelf: the sandbox sits on top; the Magic slate tile is replaced by Draw ---- */
{const r5s=r5Shelf;r5Shelf=function(kind,items){r5s(kind,items);if(kind==='make'){const i=items.findIndex(x=>x.id==='slate');if(i>=0)items.splice(i,1)}}}
{const os=openShelf;openShelf=function(kind,speak){os(kind,speak);if(kind!=='make')return;const b=$('corner-body');const sec=document.createElement('div');sec.className='mk-home';
  sec.innerHTML=`<h3 class="tb-h">🎨 Make anything</h3><div class="mk-tiles">${[['rangoli','🌸','Rangoli'],['draw','🖍️','Draw'],['scene','🏞️','Story scene'],['gallery','🖼️','My makes']].map(([m,i,l])=>`<button class="mk-tile" data-m="${m}"><span>${i}</span><b>${l}</b></button>`).join('')}</div><h3 class="tb-h">✏️ Writing games</h3>`;
  b.insertBefore(sec,b.firstChild);sec.querySelectorAll('.mk-tile').forEach(t=>t.onclick=()=>{unlockAudio();FX.tap();mkOpen(t.dataset.m)})}}
document.addEventListener('visibilitychange',()=>{if(document.hidden&&MK.mode)stopVoice()});

/* ======================= RELEASE 9: child lock, steady sound, speed by age, problem report ======================= */
const R9_VER='r9.4 / haathi-v44';
/* device-wide switches (not per child): child lock, keep the screen on, lock guide seen */
const DEV_KEY='haathi-device';
function devS(){let d=null;try{d=JSON.parse(localStorage.getItem(DEV_KEY)||'null')}catch(e){}return Object.assign({lock:true,keepOn:true,guide:false},d||{})}
function devSet(p){const d=Object.assign(devS(),p);try{localStorage.setItem(DEV_KEY,JSON.stringify(d))}catch(e){}return d}
const lockOn=()=>devS().lock!==false;

/* ---- what the report can say: recent errors and the last screens (no names, nothing the child made) ---- */
const ERRLOG=[];function elog(m){ERRLOG.push(new Date().toTimeString().slice(0,8)+' '+String(m).slice(0,160));if(ERRLOG.length>12)ERRLOG.shift()}
window.addEventListener('error',e=>elog((e.message||'error')+(e.filename?' @'+e.filename.split('/').pop()+':'+e.lineno:'')));
window.addEventListener('unhandledrejection',e=>elog('promise: '+((e.reason&&e.reason.message)||e.reason)));
const TRAIL=[];
{const g0=go;go=function(name){g0(name);const nm=current;if(nm!=='parent'){const g=nm==='play'&&RUN&&RUN.node?': '+(RUN.node.title||TITLES[RUN.node.t]||RUN.node.t):'';TRAIL.push(nm+g);if(TRAIL.length>8)TRAIL.shift()}
  document.documentElement.classList.toggle('r9lock',lockOn()&&nm!=='parent'&&nm!=='setup');sndHint(false);updMaybe()}}
/* ---- updates (9.3): a new version takes over at the next calm moment (home screen, or coming back to the app),
   instead of needing the app to be closed and opened twice ---- */
let updPending=false;
function updMaybe(){if(updPending&&['start','home','map'].includes(current))location.reload()}
if('serviceWorker' in navigator){const hadCtrl=!!navigator.serviceWorker.controller;
  navigator.serviceWorker.addEventListener('controllerchange',()=>{if(!hadCtrl)return;updPending=true;updMaybe()});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)return;try{navigator.serviceWorker.getRegistration().then(r=>{if(r)r.update()}).catch(()=>{})}catch(e){}updMaybe()})}


/* ---- picture-card titles: more than 6 rounds show a small bar and "3/12" instead of a column of dots ---- */
{const sr0=setRounds;setRounds=function(){const r=$('rounds');document.body.classList.toggle('r9many',!!RUN&&RUN.rounds>6);if(!RUN||RUN.rounds<=6){r.classList.remove('r9c');return sr0()}
  r.className='rounds r9c';const done=Math.min(RUN.round,RUN.rounds);r.innerHTML=`<span class="r9bar"><i style="width:${Math.round(100*done/RUN.rounds)}%"></i></span><span class="r9cnt">${Math.min(RUN.round+1,RUN.rounds)}/${RUN.rounds}</span>`;r.setAttribute('aria-label',`Round ${Math.min(RUN.round+1,RUN.rounds)} of ${RUN.rounds}`)}}

/* ---- child lock: full screen, upright, Back stays inside the game. The Home button needs the phone's own pinning ---- */
const touchDev=()=>!!(window.matchMedia&&matchMedia('(pointer:coarse)').matches);
/* Back stays inside the game (9.4). Chrome lets the Back button skip a page that adds history steps without a real tap
   since the last Back, and then Back leaves the app (on a pinned phone the app was left stuck and blank). So a step is
   added only right after a tap, one per tap, with up to 5 in reserve, and Back uses one up; nothing is added on Back.
   Where Chrome has CloseWatcher (version 126 and later), Back goes to that first and the history steps are the reserve. */
let trapDepth=0;const TRAP_MAX=5;
function lockArm(){if(!lockOn()||!S.profile||trapDepth>=TRAP_MAX)return;try{history.pushState({h9:Date.now()},'');trapDepth++}catch(e){}}
let cw=null;
function cwArm(){if(cw||!lockOn()||!S.profile||typeof window.CloseWatcher!=='function')return;try{cw=new CloseWatcher();cw.onclose=()=>{cw=null;r9Back();setTimeout(cwArm,0)}}catch(e){cw=null}}
function cwOff(){if(cw){const c=cw;cw=null;try{c.onclose=null;c.destroy()}catch(e){}}}
/* Game mode (9.2): the installed app opens full screen by itself (manifest display: fullscreen), with the phone's bars
   hidden and no notice. The page no longer asks the browser for full screen: that showed Chrome's "drag from the top to
   exit" notice on every tap, and Back left full screen at once. Back is kept inside the game either way. */
document.addEventListener('pointerup',()=>{if(!S.profile)return;lockArm();cwArm()},{capture:true,passive:true});
window.addEventListener('popstate',()=>{if(trapDepth>0)trapDepth--;if(!lockOn()||!S.profile)return;r9Back()});
document.addEventListener('contextmenu',e=>{if(lockOn()&&current!=='parent')e.preventDefault()});
function r9Toast(t){let el=$('r9toast');if(!el){el=document.createElement('div');el.id='r9toast';el.className='r9toast';el.setAttribute('role','status');document.body.appendChild(el)}el.textContent=t;el.hidden=false;clearTimeout(r9Toast.tm);r9Toast.tm=setTimeout(()=>{el.hidden=true},2800)}
/* the phone's Back button does what the game's own back arrow does; on the home screen it does nothing */
function r9Back(){
  if(!$('gate').hidden){$('gate').hidden=true;return}
  if(!$('r9lock').hidden||!$('bye').hidden)return;
  for(const id of ['book','reward']){const el=$(id);if(el&&!el.hidden){const c=el.querySelector('[data-close],.close,.bk-close,button[aria-label*="lose"]');if(c)c.click();return}}
  const sgv=$('sg');if(sgv&&!sgv.hidden){const c=sgv.querySelector('[data-close],.close,button[aria-label*="lose"],button[aria-label*="ack"]');if(c){c.click();return}}
  const mk=document.querySelector('.mk-overlay:not([hidden])');if(mk){const c=mk.querySelector('button');if(c){c.click();return}}
  const map={play:'play-back',story:'st-back',make:'mk-back',book:'tb-back',path:'nd-path-home',lib:'nd-lib-home'};
  if(map[current]&&$(map[current])){$(map[current]).click();return}
  if(current==='corner'||current==='parent'){const b=document.querySelector('#s-'+current+' [data-back]');if(b){b.click();return}}
  /* on the home screen Back simply does nothing, with no message */}

/* ---- the lock guide: Android app pinning, iPhone Guided Access ---- */
function lockSteps(){const ios=/iPhone|iPad|iPod/.test(navigator.userAgent),and=/Android/.test(navigator.userAgent);
  return `<div class="r9steps"><details ${ios?'':'open'}><summary>Android phone</summary><ol>
    <li>Open <b>Settings</b> and search for <b>pin</b>. Turn on <b>App pinning</b> (Samsung calls it <b>Pin windows</b> or <b>Pin app</b>), and turn on <b>Ask for PIN before unpinning</b>.</li>
    <li>Open Haathi.</li>
    <li>Open the recent apps screen: swipe up from the bottom and hold, or tap the square button.</li>
    <li>Tap the Haathi icon at the top of its window, then <b>Pin</b>.</li>
    <li>To leave: swipe up and hold (or hold Back and the square button together), then enter your PIN.</li></ol></details>
  <details ${ios&&!and?'open':''}><summary>iPhone</summary><ol>
    <li>Open <b>Settings &gt; Accessibility &gt; Guided Access</b> and turn it on. Tap <b>Passcode Settings</b> and set a passcode.</li>
    <li>Open Haathi.</li>
    <li>Press the side button three times quickly (the Home button on older iPhones), then tap <b>Start</b>.</li>
    <li>To leave: press it three times again, enter the passcode, tap <b>End</b>.</li></ol></details>
  <p class="note">Also turn on <b>Do Not Disturb</b>, so calls and messages do not pop up over the game. Menu names differ a little between phone makers.</p></div>`}
function showLockGuide(after,btn){$('r9lock-steps').innerHTML=lockSteps();$('r9lock-ok').textContent=btn||'Done';$('r9lock').hidden=false;
  $('r9lock-ok').onclick=()=>{FX.tap();devSet({guide:true});$('r9lock').hidden=true;lockNote();if(after)after()}}
function lockNote(){const n=$('lock-note');if(n)n.hidden=!!devS().guide}
$('lock-note-how').onclick=()=>{FX.tap();showLockGuide()};
$('lock-note-ok').onclick=()=>{FX.tap();devSet({guide:true});lockNote()};
/* first setup on this phone: show the guide once, before the child gets the phone */
{const b=$('btn-setup-done');const o=b.onclick;b.onclick=e=>{if(!devS().guide&&!kidsIdx().list.length)showLockGuide(()=>o.call(b,e),'Continue');else o.call(b,e)}}

/* ---- Grown-ups: speed, softer effects, lock switches, sound check, problem report ---- */
let r9Model='';
try{if(navigator.userAgentData&&navigator.userAgentData.getHighEntropyValues)navigator.userAgentData.getHighEntropyValues(['model','platformVersion']).then(v=>{r9Model=[v.model,v.platformVersion&&('OS '+v.platformVersion)].filter(Boolean).join(', ')}).catch(()=>{})}catch(e){}
function uaShort(){const u=navigator.userAgent;const a=u.match(/Android ([\d.]+);\s*([^;)]*)/),i=u.match(/(iPhone|iPad)[^)]*OS (\d+[_\d]*)/),c=u.match(/(Chrome|CriOS|Firefox|FxiOS|SamsungBrowser|Version)\/(\d+)/);
  return [a?'Android '+a[1]+(a[2]&&a[2]!=='K'?', '+a[2]:''):i?i[1]+' iOS '+i[2].replace(/_/g,'.'):(navigator.platform||'other'),r9Model,c?c[1].replace('Version','Safari')+' '+c[2]:''].filter(Boolean).join(' · ')}
function r9Report(){const d=devS();
  return ['Haathi problem report','What happened: '+(($('fx-what')&&$('fx-what').value.trim())||'(not written)'),'App: '+R9_VER,'Phone: '+uaShort(),
    'Screen: '+innerWidth+'x'+innerHeight+' @'+(Math.round(devicePixelRatio*100)/100)+(isStandalone()?' (installed app'+(matchMedia('(display-mode: fullscreen)').matches?', full screen)':', not full screen yet)'):' (in browser)'),
    'Settings: age '+(S.profile?S.profile.age:'-')+', speed '+(S.settings.vspeed||'auto')+', language '+(S.settings.lang||'en')+', lock '+(d.lock!==false?'on':'off'),
    'Last screens: '+(TRAIL.join(' > ')||'-'),
    'Sound: '+(actx?actx.state+', '+actx.sampleRate+' Hz, '+BUF.size+' lines ready':'not started yet'),
    'Sound log: '+(AUDLOG.slice(-10).join(' | ')||'none'),
    'Errors: '+(ERRLOG.slice(-6).join(' | ')||'none')].join('\n')}
function gmStatus(){const el=$('gm-status'),b=$('gm-install');if(!el)return;const inst=isStandalone(),fs=window.matchMedia&&matchMedia('(display-mode: fullscreen)').matches;
  el.innerHTML=inst?(fs?'<b>Game mode is on.</b> Haathi is installed and opens full screen.':'<b>Almost there.</b> Haathi is installed, and the phone will switch it to full screen within a day or two. To get it now, remove Haathi from the home screen and install it again.'):'<b>Game mode needs Haathi installed</b> on this phone. Install it, then open Haathi from the home screen icon.';
  if(b)b.hidden=inst;const v=$('app-ver');if(v)v.textContent='Haathi version '+R9_VER.split(' ')[0].slice(1)}
function r9Fill(){const d=devS();$('ps-vspeed').value=S.settings.vspeed||'auto';$('ps-fxsoft').checked=S.settings.fxSoft!==false;$('ps-lock').checked=d.lock!==false;$('ps-keepon').checked=d.keepOn!==false;
  $('lock-steps').innerHTML=lockSteps();lockNote();gmStatus();$('fx-result').hidden=true}
{const rp=renderParent;renderParent=function(){rp();r9Fill()}}
$('ps-save').addEventListener('click',()=>{S.settings.vspeed=$('ps-vspeed').value;S.settings.fxSoft=$('ps-fxsoft').checked;if(fxbus)fxbus.gain.value=FXVOL();save()});
$('gm-install').onclick=()=>{FX.tap();const b=$('btn-install');if(b)b.click()};
$('ps-lock').onchange=()=>{const on=$('ps-lock').checked;devSet({lock:on});if(!on)cwOff();gc('/parent/lock-'+(on?'on':'off'),'Child lock '+(on?'on':'off'))};
$('ps-keepon').onchange=()=>{const on=$('ps-keepon').checked;devSet({keepOn:on});if(!on&&wlock){try{wlock.release()}catch(e){}wlock=null}};
$('ps-hearspeed').onclick=()=>{unlockAudio();FX.tap();const old=S.settings.vspeed;S.settings.vspeed=$('ps-vspeed').value;const age=S.profile.age;S.profile.age=+$('ps-age').value||age;
  sayRaw(['P_say_with_me',300,'W_sun'],null).then(()=>{S.settings.vspeed=old;S.profile.age=age})};
$('fx-check').onclick=async()=>{unlockAudio();const r=$('fx-result');r.hidden=false;r.textContent='Checking…';const ok=await wakeAudio();const s0=S.settings.sfx;S.settings.sfx=true;FX.chime();S.settings.sfx=s0;await sleep(500);await sayRaw(['P_welcome'],null);
  gc('/parent/soundcheck-'+(ok?'ok':'blocked'),'Sound check');
  r.textContent=ok&&actx.state==='running'?'Sound is on. You should have heard a chime and Haathi. If not: turn the volume up, switch off silent mode, disconnect Bluetooth headphones, then press Reload.':'The phone is holding the sound back. Tap Sound check once more. If it stays silent, press Reload.'};
$('fx-reload2').onclick=()=>{const b=$('p-reload');if(b)b.click();else location.reload()};
$('fx-wa').onclick=()=>{FX.tap();gc('/parent/report','Problem report sent');$('fx-wa').href='https://wa.me/?text='+encodeURIComponent(r9Report())};
$('fx-copy').onclick=async()=>{FX.tap();const t=r9Report();let ok=false;try{await navigator.clipboard.writeText(t);ok=true}catch(e){}const pv=$('fx-preview');pv.value=t;pv.hidden=false;if(!ok){pv.focus();pv.select()}$('fx-result').hidden=false;$('fx-result').textContent=ok?'Copied. Paste it into a message.':'Select the text below and copy it.'};
{const b0=badge;badge=function(){b0();if(!devS().guide&&S.profile)['btn-parent','nd-parent'].forEach(id=>{const b=$(id);if(b)b.classList.add('has-news')})}}
/* ---- Letter detective, leaf game: the leaf now covers the letter's own shape, and tapping it peeks a little more.
   Before, it covered the bottom of the card, so a, c, e, o and s all showed the same small arc and could not be told apart. */
const LEAF_SVG='<svg viewBox="0 0 200 120" preserveAspectRatio="none" aria-hidden="true"><path d="M0 46 Q100 -30 200 46 L200 120 L0 120 Z" fill="#3f9b5e"/><path d="M0 46 Q100 -30 200 46" fill="none" stroke="#2d7a47" stroke-width="5"/><path d="M100 8 L100 120" stroke="#9fd8a8" stroke-width="5" stroke-linecap="round"/><path d="M100 40 L58 22 M100 40 L142 22 M100 70 L48 50 M100 70 L152 50 M100 100 L44 82 M100 100 L156 82" stroke="#8fcf98" stroke-width="4" stroke-linecap="round" fill="none"/></svg>';
ACT.hidden=()=>{const t=fresh('hid',ALPHA);const opts=shuffle([t,...others(ALPHA,t,nopt()-1)]);const little=((S.profile&&S.profile.age)||4)<=4;
  let frac=little?.42:.32,peeks=0;
  const place=()=>{const hb=$('hb');if(!hb)return;const sp=hb.querySelector('span'),bl=hb.querySelector('.r9bl'),lf=hb.querySelector('.r9leaf');if(!sp||!bl||!lf)return;
    const box=hb.getBoundingClientRect();let top=null,bot=null;
    try{const cv=place.cv||(place.cv=document.createElement('canvas'));const x=cv.getContext('2d');const cs=getComputedStyle(sp);x.font=`${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;const m=x.measureText(t);
      const base=bl.getBoundingClientRect().top-box.top;if(m&&isFinite(m.actualBoundingBoxAscent)){top=base-m.actualBoundingBoxAscent;bot=base+(m.actualBoundingBoxDescent||0)}}catch(e){}
    if(top==null){const r=sp.getBoundingClientRect();top=r.top-box.top+r.height*.25;bot=r.top-box.top+r.height*.8}
    const y=frac>=1?box.height+4:Math.max(0,top+(bot-top)*frac-box.height*.07);lf.style.transform=`translateY(${Math.round(y)}px)`};
  const peek=auto=>{if(frac>=1)return;peeks++;frac=Math.min(1,frac+(little?.22:.18));FX.swish();const lf=$('hb')&&$('hb').querySelector('.r9leaf');if(lf){lf.classList.remove('r9tease');anim(lf.querySelector('svg'),'wiggle',400)}place();if(!auto)gc('/g/hidden/peek','Leaf peek')};
  pickRound({top:`<div class="hidebox r9hide" id="hb"><span>${t}<b class="r9bl"></b></span><button class="r9leaf r9tease" type="button" aria-label="Tap the leaf to peek">${LEAF_SVG}</button></div><p class="r9peek">Tap the leaf to peek</p>`,
    items:opts.map(v=>({h:letH(v),v})),ans:t,say:['P_hidden',300,'P_hid_peek'],cap:'A leaf is hiding a letter. Tap the leaf to peek!',
    wrong:()=>{peek(true);return [rnd(RETRY),300,'P_hid_peek']},
    onRight:()=>{frac=1;place();const p=body().querySelector('.r9peek');if(p)p.hidden=true;if(!peeks)FX.sparkle()},
    /* read when the right letter is tapped, so the praise knows whether the child peeked */
    get right(){return peeks?[L_(t),250,rnd(PRAISE)]:[L_(t),250,'P_hid_nopeek']},get rightCap(){return peeks?`It was ${t}!`:`It was ${t}! You did not even peek!`}});
  const hb=$('hb');if(!hb)return;hb.querySelector('.r9leaf').onclick=()=>peek(false);
  requestAnimationFrame(place);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(place)};
const R9T={trap:()=>({trapDepth,cw:!!cw}),vSpeed,tStretch,devS,devSet,r9Back,r9Report,lockSteps,BUF:()=>BUF,AUDLOG,ERRLOG,TRAIL,decodeOne,cardNode,setRounds:()=>setRounds(),wakeAudio,lockOn,sndHint,showLockGuide};

/* ======================= BOOT ======================= */
if(S.profile&&S.placed!==3)placeByAge();
document.addEventListener('visibilitychange',()=>{if(document.hidden){save();stopVoice();sync(false);document.querySelectorAll('canvas').forEach(c=>c.dispatchEvent(new PointerEvent('pointercancel')))}else{if(actx&&actx.state!=='running')wakeAudio();wakeLockOn()}});
window.addEventListener('pageshow',()=>{if(actx&&actx.state!=='running')wakeAudio()});
document.addEventListener('pointerdown',()=>{if(actx&&actx.state!=='running')actx.resume()},{passive:true});
window.__haathi={MERGE,REPL,mergeRound,micOn,cornerNode,cornerLocked,stPilotMerge,openStory,openStories,SR:()=>SR,BEDTIME,tierOf:id=>tierOf(kindOfId(id),id),newUI:v=>{if(v!=null)NEWUI=!!v;return NEWUI},composeAdv,go,ACT,roundDone:ok=>roundDone(ok),RUN:()=>RUN,curChapter,placeByAge:()=>placeByAge(),SK,LS,CS,DIG,PREP,DOTPICS,S:()=>S,compose,learn,startRun,sceneHTML,openStory,r5:{sgPick,sgOpen,sgPending,r5WeekText,r5Areas,r5Insight,gsCards,SG_T,SG_BANK},r6:{tbOpen,tbS,tbLevel,TB:()=>TB,tbOfferDue,tbPick,scene2,TBOOKS,ndIcon},r7:{BLEND_W,RID,AO,DH_FOOD,pureSnd,openShelf,dNode},r8:{MK,mkOpen,mkList,mkDone,mkAdd,mkPut,mkDel,mkKid},r9:R9T};
go('start');
})();
