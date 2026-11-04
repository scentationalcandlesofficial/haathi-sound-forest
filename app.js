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
 i:[['insect','🐛']], p:[['peacock','🦚'],['parrot','🦜'],['pencil','✏️']], n:[['nest','🪺'],['nose','👃'],['nut','🥜']],
 c:[['cat','🐈'],['car','🚗'],['cow','🐄']], k:[['kite','🪁'],['key','🔑'],['kangaroo','🦘']], e:[['egg','🥚'],['elephant','🐘']],
 h:[['hat','👒'],['house','🏠'],['horse','🐎']], r:[['rabbit','🐇'],['rose','🌹'],['rocket','🚀']], m:[['mango','🥭'],['monkey','🐒'],['moon','🌙']],
 d:[['duck','🦆'],['drum','🥁'],['dog','🐕']], g:[['goat','🐐'],['gift','🎁'],['grapes','🍇']], o:[['octopus','🐙'],['orange','🍊'],['ox','🐂']],
 u:[['umbrella','☂️']], l:[['lion','🦁'],['leaf','🍃'],['lemon','🍋']], f:[['fish','🐟'],['frog','🐸'],['fox','🦊']], b:[['ball','⚽'],['bus','🚌'],['banana','🍌']]
};
const CVC=['cat','sun','bus','hat','dog','pig','map','bed','leg','bat','rat','nut','log','ten','hut','sat','pin','tap','pan','tin','nap','man','mud','hen','red'];
const CVC_CLIP=new Set(['cat','sun','bus','hat','dog','pig','map','bed','leg','bat','rat','nut','log','ten','hut']);
const KEYW=l=>WORDS[l][0];
const SAME={c:'k',k:'c'};
const ACTION={s:'Hiss like a pressure cooker',a:'Open wide like biting an apple',t:'Tap your toes',i:'Itchy insect! Scratch your arm',p:'Pop bubbles with a finger',n:'Wag your finger: no, no',c:'Click your fingers',k:'Kick a ball',e:'Crack an egg on your knee',h:'Breathe on your hand like hot chai',r:'Drive an auto-rickshaw',m:'Rub your tummy: yummy mango',d:'Beat a dhol on your lap',g:'Gulp some water',o:'Make a big O with your arms',u:'Put up an umbrella',l:'Lick a kulfi',f:'Fan your face',b:'Bounce a ball'};
const HOWTO={s:'a long hiss, <b>sssss</b>',a:'short <b>a</b> as in ant',t:'a quick whispered <b>t</b>, no "uh"',i:'short <b>i</b> as in insect',p:'a puff of air, <b>p</b>, no "uh"',n:'a hum, <b>nnnn</b>',c:'a whispered <b>k</b> as in kite (also used for k)',e:'short <b>e</b> as in egg',h:'a breathy <b>h</b>, like fogging a mirror',r:'a growl, <b>rrrr</b>',m:'a hum, <b>mmmm</b>',d:'a short <b>d</b>, no "uh"',g:'a short <b>g</b> as in goat',o:'short <b>o</b> as in octopus',u:'short <b>u</b> as in umbrella',l:'<b>llll</b>, tongue up',f:'<b>ffff</b>, like blowing',b:'a short <b>b</b>, lips pop, no "uh"'};
const COUNT_THINGS=[{k:'ladoo',label:'ladoos'},{k:'🥭',label:'mangoes'},{k:'🍌',label:'bananas'},{k:'🪔',label:'diyas'},{k:'🦆',label:'ducks'},{k:'🌸',label:'flowers'},{k:'⭐',label:'stars'},{k:'🐟',label:'fish'}];
const SHAPES={circle:'<circle cx="50" cy="50" r="40"/>',square:'<rect x="12" y="12" width="76" height="76" rx="4"/>',triangle:'<path d="M50 10 L92 88 H8 Z"/>',rectangle:'<rect x="6" y="26" width="88" height="48" rx="4"/>',star:'<path d="M50 6l12 30 32 2-25 20 9 32-28-18-28 18 9-32L6 38l32-2z"/>',heart:'<path d="M50 88C10 60 6 34 22 22c12-9 24-2 28 8 4-10 16-17 28-8 16 12 12 38-28 66z"/>'};
const SHAPESETS=[['circle','square','triangle'],['circle','square','triangle','rectangle'],['star','heart','circle','triangle'],['rectangle','square','star','heart','circle','triangle']];
const SHAPE_COL=['#147a8a','#c8364b','#f6a821','#2f8a5f','#8a5cc2','#e07a12'];
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
function blank(){return {profile:null,chapters:[],intro:[],lastIntroCh:-9,sounds:{},sk:{},minutes:{},settings:{sfx:true,unlock:false,consent:false},said:0,likes:{},fbPrefs:{},device:null,lastSync:0,sentFb:0}}
function load(){try{const r=localStorage.getItem(KEY);if(r){const o=Object.assign(blank(),JSON.parse(r));o.settings=Object.assign(blank().settings,o.settings);o.likes=o.likes||{};o.fbPrefs=o.fbPrefs||{};return o}}catch(e){}return blank()}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
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
 missing:{sub:'Maths',name:'Missing number',levels:[10,20,30,50,100],lab:v=>'to '+v,unlock:()=>pr('next')>=.6&&n_('next')>=3,node:v=>({t:'missing',max:v})},
 add:{sub:'Maths',name:'Adding',levels:[5,10,20,30,50],lab:v=>'within '+v,unlock:()=>lv('count')>=1&&pr('more')>=.6&&n_('more')>=3,node:v=>({t:'add',max:v})},
 takeaway:{sub:'Maths',name:'Taking away',levels:[5,10,20,30,50],lab:v=>'within '+v,unlock:()=>pr('add')>=.6&&n_('add')>=3,node:v=>({t:'takeaway',max:v})},
 share:{sub:'Maths',name:'Sharing fairly',levels:[6,10,20],lab:v=>'up to '+v,unlock:()=>lv('count')>=1,node:v=>({t:'share',max:v})},
 shop:{sub:'Maths',name:'Mela shop (coins)',levels:[5,10,11],lab:v=>v===11?'₹1, ₹2, ₹5 coins':'₹1 coins to '+v,unlock:()=>lv('numfind')>=1,node:v=>({t:'shop',lvl:v})},
 wpre:{sub:'Writing',name:'Pre-writing patterns',levels:['line','circle','cross','zigzag','wave','loops','cups','bridges','mountains','stairs','rainbow','spiral'],lab:v=>v,unlock:()=>true,node:v=>({t:'wpre',k:v})},
 wshape:{sub:'Writing',name:'Drawing shapes',levels:['square','triangle','rectangle','star'],lab:v=>v,unlock:()=>lv('wpre')>=2,node:v=>({t:'wshape',k:v})},
 wletter:{sub:'Writing',name:'Small letters',levels:[0],lab:()=>'letters met so far',unlock:()=>true,node:()=>({t:'wletter',l:weakestLetter(true)})},
 wnum:{sub:'Writing',name:'Writing numbers',levels:[5,10,20,30,50,99],lab:v=>'1 to '+v,unlock:()=>true,node:v=>({t:'wnum',n:ri(Math.max(1,v>10?11:1),v)})},
 wcap:{sub:'Writing',name:'Big letters',levels:[0],lab:()=>'capitals of letters met',unlock:()=>S.intro.length>=6,node:()=>({t:'wcap',l:rnd(S.intro)})},
 wname:{sub:'Writing',name:'Writing my name',levels:[0],lab:()=>'own name',unlock:()=>S.intro.length>=4&&n_('wletter')>=3,node:()=>({t:'wname'})},
 wword:{sub:'Writing',name:'Writing words',levels:[0],lab:()=>'3-letter words',unlock:()=>S.intro.length>=6&&pr('wletter')>=.6,node:()=>({t:'wword',w:pickWord()})},
 dots:{sub:'Writing',name:'Dot-to-dot',levels:[5,9,10],lab:v=>'up to '+v+' dots',unlock:()=>true,node:v=>({t:'dots',max:v})},
 tens:{sub:'Maths',name:'Tens and ones (place value)',levels:[20,50,99],lab:v=>'to '+v,unlock:()=>lv('count')>=3||((S.profile&&S.profile.age)||4)>=5,node:v=>({t:'tens',max:v})},
 fewer:{sub:'Maths',name:'Which has fewer',levels:[5,10,20,30],lab:v=>'to '+v,unlock:()=>true,node:v=>({t:'fewer',max:v})},
 smaller:{sub:'Maths',name:'Smaller number',levels:[10,20,30,50,100],lab:v=>'0 to '+v,unlock:()=>lv('numfind')>=1,node:v=>({t:'smaller',max:v})},
 matchgroup:{sub:'Maths',name:'Match number to group',levels:[5,10,15],lab:v=>'to '+v,unlock:()=>true,node:v=>({t:'matchgroup',max:v})},
 maketen:{sub:'Maths',name:'Make 5 and make 10',levels:[5,10],lab:v=>'make '+v,unlock:()=>lv('count')>=1,node:v=>({t:'maketen',max:v})},
 beats:{sub:'Maths',name:'Counting drum beats',levels:[4,6,8],lab:v=>'up to '+v,unlock:()=>true,node:v=>({t:'beats',max:v})},
 rocket:{sub:'Maths',name:'Counting down',levels:[5,10],lab:v=>'from '+v,unlock:()=>true,node:v=>({t:'rocket',max:v})},
 order:{sub:'Maths',name:'Numbers in order',levels:[5,10,15],lab:v=>'1 to '+v,unlock:()=>true,node:v=>({t:'order',max:v})},
 frog:{sub:'Maths',name:'Number line hops',levels:[10,20],lab:v=>'0 to '+v,unlock:()=>lv('count')>=1,node:v=>({t:'frog',max:v})},
 skip:{sub:'Maths',name:'Skip counting',levels:[10,5,2],lab:v=>'in '+v+'s',unlock:()=>lv('count')>=2,node:v=>({t:'skip',max:v})},
 hiding:{sub:'Maths',name:'Hiding ladoos (number bonds)',levels:[5,10],lab:v=>'within '+v,unlock:()=>lv('count')>=1,node:v=>({t:'hiding',max:v})},
 oddshape:{sub:'Maths',name:'Odd shape out',levels:[0],lab:()=>'shapes',unlock:()=>true,node:()=>({t:'oddshape'})},
 sortcolour:{sub:'Maths',name:'Sorting by colour',levels:[0],lab:()=>'2 colours',unlock:()=>true,node:()=>({t:'sortcolour'})},
 size:{sub:'Maths',name:'Bigger and smaller',levels:[0],lab:()=>'size',unlock:()=>true,node:()=>({t:'size'})},
 heavy:{sub:'Maths',name:'Heavy and light',levels:[0],lab:()=>'weight',unlock:()=>true,node:()=>({t:'heavy'})},
 queue:{sub:'Maths',name:'First and last',levels:[0],lab:()=>'position',unlock:()=>true,node:()=>({t:'queue'})},
 money:{sub:'Maths',name:'Which purse has more',levels:[5,11],lab:v=>v===11?'₹1, ₹2, ₹5':'₹1 coins',unlock:()=>lv('numfind')>=1,node:v=>({t:'money',max:v})},
 double:{sub:'Maths',name:'Doubles',levels:[3,5],lab:v=>'up to '+v+'+'+v,unlock:()=>n_('add')>=3,node:v=>({t:'double',max:v})},
 countshapes:{sub:'Maths',name:'Counting shapes',levels:[5,8],lab:v=>'up to '+v,unlock:()=>true,node:v=>({t:'countshapes',max:v})},
 maze:{sub:'Writing',name:'Road maze',levels:[0],lab:()=>'pencil control',unlock:()=>true,node:()=>({t:'maze'})},
 tracepic:{sub:'Writing',name:'Tracing pictures',levels:[0],lab:()=>'outlines',unlock:()=>true,node:()=>({t:'tracepic'})},
 drawshapes:{sub:'Writing',name:'Drawing with shapes',levels:[0],lab:()=>'pictures',unlock:()=>lv('wpre')>=1,node:()=>({t:'drawshapes'})},
 finishpic:{sub:'Writing',name:'Finish the picture',levels:[0],lab:()=>'mirror half',unlock:()=>lv('wpre')>=1,node:()=>({t:'finishpic'})},
 wrainbow:{sub:'Writing',name:'Rainbow writing',levels:[0],lab:()=>'letters met',unlock:()=>S.intro.length>=2,node:()=>({t:'wrainbow'})},
 wheard:{sub:'Writing',name:'Write what you hear',levels:[0],lab:()=>'letters met',unlock:()=>S.intro.length>=4,node:()=>({t:'wheard'})},
 countwrite:{sub:'Writing',name:'Count and write',levels:[5,9],lab:v=>'1 to '+v,unlock:()=>true,node:v=>({t:'countwrite',max:v})},
 wcopy:{sub:'Writing',name:'Copying letters and numbers',levels:[0],lab:()=>'copy',unlock:()=>n_('wletter')>=2,node:()=>({t:'wcopy'})},
 wlines:{sub:'Writing',name:'Straight lines',levels:[0],lab:()=>'dot to dot',unlock:()=>true,node:()=>({t:'wlines'})},
 joinmatch:{sub:'Writing',name:'Join the pairs',levels:[0],lab:()=>'lines',unlock:()=>S.intro.length>=3,node:()=>({t:'joinmatch'})},
 colour:{sub:'Writing',name:'Colouring',levels:[0],lab:()=>'fine motor',unlock:()=>true,node:()=>({t:'colour'})}
};
/* letter games: picked by the chapter planner from what is unlocked */
const LGAMES={bubbles:()=>true,snack:()=>true,picletter:()=>true,letterpic:()=>true,samesound:()=>true,oddsound:()=>S.intro.length>=2,fishing:()=>true,stones:()=>true,mole:()=>true,hunt:()=>true,
 sortsound:()=>S.intro.length>=2,memory:()=>S.intro.length>=3,bigsmall:()=>true,sameletter:()=>true,shadow:()=>true,hidden:()=>true,nextletter:()=>S.intro.length>=6,missingletter:()=>S.intro.length>=6,
 rhyme:()=>true,buildword:()=>S.intro.length>=6,firstmissing:()=>S.intro.length>=4};
function pickLetterGame(exclude){const c=Object.keys(LGAMES).filter(g=>g!==exclude&&(S.settings.unlock||LGAMES[g]()));
  let best=null,bs=-9;c.forEach(g=>{const sc=Math.random()*1.4+Math.max(-.5,Math.min(.5,prefBonus(g)))-recentPenalty(g);if(sc>bs){bs=sc;best=g}});return best||'bubbles'}
function st(id){return S.sk[id]||(S.sk[id]={lvl:0,p:.5,n:0,ln:0,last:null,up:null})}
const lv=id=>(S.sk[id]||{lvl:0}).lvl, pr=id=>(S.sk[id]||{p:0}).p, n_=id=>(S.sk[id]||{n:0}).n;
function learn(id,ok){if(!SK[id])return;const s=st(id);s.n++;s.ln++;s.p=s.p+.25*((ok?1:0)-s.p);s.last=today();s.streak=ok?(s.streak||0)+1:0;s.miss=ok?0:(s.miss||0)+1;
  const L=SK[id].levels.length;
  if(s.lvl<L-1&&((s.ln>=5&&s.p>=.8)||s.streak>=6)){s.lvl++;s.ln=0;s.p=.6;s.streak=0;s.up=today();s.justUp=1}
  else if(s.lvl>0&&((s.ln>=3&&s.p<.35)||s.miss>=3)){s.lvl--;s.ln=0;s.p=.5;s.miss=0}
  save()}
/* ---- starting point by age, so a 4-year-old starts at 1-10, not 1-3 ---- */
const PLACE={3:{count:0,numfind:0,matchgroup:0},4:{count:1,numfind:1,dice:1,more:1,matchgroup:1,wnum:1},
 5:{count:3,numfind:2,dice:2,more:2,next:1,bigger:1,smaller:1,add:1,takeaway:0,matchgroup:2,wnum:2,beats:1,order:1,rocket:1},
 6:{count:4,numfind:3,dice:2,more:3,next:2,bigger:2,smaller:2,missing:1,add:2,takeaway:1,matchgroup:2,wnum:3,tens:1,skip:1,maketen:1,frog:1,money:1,double:1,beats:2,order:2,rocket:1,countwrite:1},
 7:{count:4,numfind:5,dice:2,more:3,next:4,bigger:4,smaller:4,missing:3,add:4,takeaway:3,matchgroup:2,wnum:5,tens:2,skip:2,maketen:1,frog:1,money:1,double:1,beats:2,order:2,rocket:1,countwrite:1}};
const LETTERS_BY_AGE={3:3,4:6,5:10,6:14,7:18};
function placeByAge(){const age=Math.min(7,Math.max(3,(S.profile&&S.profile.age)||4));const P=PLACE[age];
  Object.keys(P).forEach(id=>{if(!SK[id])return;const s=st(id);const tgt=Math.min(P[id],SK[id].levels.length-1);if(s.lvl<tgt){s.lvl=tgt;s.ln=0;s.p=Math.max(s.p,.55)}});
  const want=LETTERS_BY_AGE[age];while(S.intro.length<want){const l=LET.find(x=>!S.intro.includes(x));if(!l)break;S.intro.push(l)}S.placed=2;save()}
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
function compose(){
  const idx=S.chapters.length,reasons=[],nodes=[];
  let newL=null;if(readyForNewLetter(idx)){newL=LET.find(l=>!S.intro.includes(l));if(newL){S.intro.push(newL);S.lastIntroCh=idx;if(newL==='c'&&!S.intro.includes('k')){} }}
  const lg=likeScore('bubbles')+(CFG.weights.bubbles||1)-likeScore('snack')-(CFG.weights.snack||1);const lp=lg>.2?'bubbles':lg<-.2?'snack':rnd(['bubbles','snack']);
  const L1=newL?{t:'meet',l:newL}:{t:pickLetterGame(),focus:weakestLetter(),pool:S.intro.slice()};
  if(newL)reasons.push(`New letter: ${newL} (${KEYW(newL)[0]})`);else reasons.push(`Letter practice: ${L1.focus} (${Math.round(accuracy(L1.focus)*100)}% right lately)`);
  const f2=weakestLetter();const L2={t:pickLetterGame(L1.t),focus:newL||f2,pool:S.intro.slice()};
  reasons.push(newL?`Hear and find the new letter in a game`:`Letter practice: ${f2}`);
  const maths=Object.keys(SK).filter(id=>SK[id].sub==='Maths'&&SK[id].unlock()).sort((a,b)=>score(b)-score(a)).slice(0,(S.profile&&S.profile.age>=5)?3:2);
  maths.forEach(id=>reasons.push(why(id)));
  const wOther=Object.keys(SK).filter(id=>SK[id].sub==='Writing'&&id!=='wletter'&&SK[id].unlock()).sort((a,b)=>score(b)-score(a))[0];
  const W1={t:'wletter',l:newL||weakestLetter(true),skill:'wletter'};reasons.push(`Write the letter ${W1.l}`);
  reasons.push(why(wOther));
  const mN=maths.map(id=>Object.assign(SK[id].node(param(id)),{skill:id}));
  const wN=Object.assign(SK[wOther].node(param(wOther)),{skill:wOther});
  nodes.push(L1,mN[0],W1,L2,mN[1],wN);if(mN[2])nodes.push(mN[2]);
  {const ds=DSC.sections.filter(x=>unlocked('d_'+x.id)).map(x=>'d_'+x.id).sort((a,b)=>score(b)-score(a));if(ds.length){const dn=dNode(ds[0].slice(2));nodes.splice(3,0,dn);reasons.push(S.sk[ds[0]]&&S.sk[ds[0]].n?why(ds[0]):`New topic: ${DSEC[ds[0].slice(2)].name}`)}}
  const region=Math.floor(idx/3)%REGIONS.length;
  if(idx%3===2)nodes.push({t:'friend',r:region});
  S.chapters.push({id:idx,region,nodes:nodes.map(n=>Object.assign(n,{stars:null})),reasons,done:false,date:today()});
  if(S.chapters.length>40)S.chapters=S.chapters.slice(-40);
  save();
}
function curChapter(){let c=S.chapters[S.chapters.length-1];if(!c||c.done){compose();c=S.chapters[S.chapters.length-1]}return c}
function curNodeIdx(c){return c.nodes.findIndex(n=>n.stars==null)}

/* ======================= AUDIO ======================= */
const VOICE=(window.HAATHI_VOICES&&window.HAATHI_VOICES.A)||{};
let actx=null,master=null;const BUF={},REC={};let decoding=null;
function unlockAudio(){try{
  if(!actx){const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;actx=new AC();master=actx.createGain();master.connect(actx.destination)}
  if(actx.state!=='running')actx.resume();
  const b=actx.createBuffer(1,1,22050),s=actx.createBufferSource();s.buffer=b;s.connect(master);s.start(0);
  if(!decoding){decoding=decodeAll();loadRecordings()}
}catch(e){}}
function b64ToBuf(b){const bin=atob(b),u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);return u.buffer}
function decodeAB(ab){return new Promise(res=>{let done=false;const f=v=>{if(!done){done=true;res(v)}};setTimeout(()=>f(null),4000);try{const p=actx.decodeAudioData(ab,f,()=>f(null));if(p&&p.catch)p.catch(()=>f(null))}catch(e){f(null)}})}
async function decodeOne(k){if(BUF[k])return BUF[k];if(!VOICE[k]||!actx)return null;const d=await decodeAB(b64ToBuf(VOICE[k]));if(d)BUF[k]=d;return d}
async function decodeAll(){for(const k of Object.keys(VOICE).sort((a,b)=>(a[0]==='P'?-1:1)-(b[0]==='P'?-1:1)))await decodeOne(k)}
let vTok=0,playing=[];
function stopVoice(){vTok++;playing.forEach(s=>{try{s.stop()}catch(e){}});playing=[]}
function playBuf(buf,rate){return new Promise(res=>{let done=false;const fin=()=>{if(done)return;done=true;playing=playing.filter(x=>x!==s);res()};const s=actx.createBufferSource();s.buffer=buf;s.playbackRate.value=rate||1;s.connect(master);s.onended=fin;playing.push(s);
  setTimeout(fin,Math.ceil(buf.duration/(rate||1)*1000)+600);try{s.start()}catch(e){fin()}})}
/* a voice line started inside one game never 'finishes' into a different game */
function say(seq,caption,opt){const r=RUN;return new Promise(res=>{sayRaw(seq,caption,opt).then(v=>{if(RUN===r||!r)res(v)})})}
async function sayRaw(seq,caption,opt){
  opt=opt||{};stopVoice();const tok=vTok;if(caption!=null&&$('cap'))$('cap').textContent=caption;
  for(const it of seq){if(tok!==vTok)return;
    if(typeof it==='number'){await sleep(it);continue}
    if(typeof it==='function'){it();continue}
    let buf=null;if(it.startsWith('R_'))buf=recBuf(it.slice(2));else{buf=BUF[it];if(!buf&&actx)buf=await decodeOne(it)}
    if(tok!==vTok)return;
    if(buf&&actx&&actx.state!=='running'){try{actx.resume()}catch(e){}await sleep(150)}
    if(buf&&actx&&actx.state==='running'){await playBuf(buf,opt.slow?.9:1);await sleep(70)}}
}
function recBuf(l){return REC[l]||REC[SAME[l]]||null}
const hasRec=l=>!!recBuf(l);
const W=w=>'W_'+w, N=n=>'N_'+n, L_=l=>'L_'+l;
function tone(f,t0,dur,type,vol,f2){if(!actx||!S.settings.sfx)return;const o=actx.createOscillator(),g=actx.createGain();o.type=type||'sine';o.frequency.setValueAtTime(f,t0);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t0+dur);g.gain.setValueAtTime(.0001,t0);g.gain.exponentialRampToValueAtTime(vol||.2,t0+.015);g.gain.exponentialRampToValueAtTime(.0001,t0+dur);o.connect(g);g.connect(master);o.start(t0);o.stop(t0+dur+.05)}
function noise(t0,dur,vol,fq){if(!actx||!S.settings.sfx)return;const n=actx.createBuffer(1,Math.floor(actx.sampleRate*dur),actx.sampleRate),d=n.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*(1-i/d.length);const s=actx.createBufferSource();s.buffer=n;const f=actx.createBiquadFilter();f.type='bandpass';f.frequency.value=fq||1200;const g=actx.createGain();g.gain.value=vol||.2;s.connect(f);f.connect(g);g.connect(master);s.start(t0)}
const T=()=>actx?actx.currentTime:0;
const FX={
 tap(){tone(660,T(),.08,'triangle',.12,880)}, pop(){tone(500,T(),.12,'sine',.3,1400);noise(T(),.08,.25,2500)},
 chomp(){[0,.18,.36].forEach(d=>{tone(180,T()+d,.1,'square',.12,90);noise(T()+d,.06,.2,600)})},
 chime(){[523,659,784,1047].forEach((f,i)=>tone(f,T()+i*.09,.35,'triangle',.16))},
 fanfare(){[523,659,784,659,784,1047].forEach((f,i)=>tone(f,T()+i*.12,.3,'square',.08));tone(1047,T()+.75,.8,'triangle',.15)},
 boing(){tone(300,T(),.35,'sine',.18,150);tone(220,T()+.12,.3,'sine',.12,330)},
 tick(n){tone(500+Math.min(n,30)*25,T(),.1,'triangle',.14)}, coin(){tone(1300,T(),.08,'square',.06);tone(1800,T()+.07,.15,'square',.05)},
 sparkle(){for(let i=0;i<5;i++)tone(1400+Math.random()*1400,T()+i*.05,.12,'sine',.06)}, swish(){noise(T(),.25,.12,1800)},
 trumpet(){if(!actx||!S.settings.sfx)return;const t=T(),o=actx.createOscillator(),f=actx.createBiquadFilter(),g=actx.createGain();o.type='sawtooth';o.frequency.setValueAtTime(240,t);o.frequency.exponentialRampToValueAtTime(520,t+.25);o.frequency.setValueAtTime(520,t+.6);o.frequency.exponentialRampToValueAtTime(380,t+1);f.type='lowpass';f.frequency.setValueAtTime(600,t);f.frequency.linearRampToValueAtTime(2400,t+.3);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.22,t+.08);g.gain.setValueAtTime(.22,t+.8);g.gain.exponentialRampToValueAtTime(.0001,t+1.1);o.connect(f);f.connect(g);g.connect(master);o.start(t);o.stop(t+1.2)}
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
function haathi(mood){
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
const objHTML=(k,n,small)=>k==='ladoo'?`<span class="obj ladoo ${small?'small':''}" data-i="${n}"></span>`:`<span class="obj ${small?'small':''}" data-i="${n}">${k}</span>`;
const STAR='<svg viewBox="0 0 24 24"><path d="M12 2l3 7 7 .6-5.3 4.7 1.6 7.2L12 17.8 5.7 21.5l1.6-7.2L2 9.6 9 9z" fill="#f6a821" stroke="#d9800b" stroke-width="1.2"/></svg>';
const STAR_OFF='<svg viewBox="0 0 24 24"><path d="M12 2l3 7 7 .6-5.3 4.7 1.6 7.2L12 17.8 5.7 21.5l1.6-7.2L2 9.6 9 9z" fill="#e8eee9" stroke="#c9d6cc" stroke-width="1.2"/></svg>';
const ICON={back:'<svg viewBox="0 0 24 24" fill="none" stroke="#1f6b4a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
 ear:'<svg viewBox="0 0 24 24" fill="none" stroke="#147a8a" stroke-width="2.6" stroke-linecap="round"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/></svg>',
 next:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',
 check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10"/></svg>'};
document.querySelectorAll('[data-back]').forEach(b=>{b.innerHTML=ICON.back;b.onclick=()=>{FX.tap();go('map')}});
$('play-back').innerHTML=ICON.back;$('play-hear').innerHTML=ICON.ear;

/* ======================= NAV, TIMER, GATE ======================= */
let current=null;const CHILD=['map','corner','play'];
function go(name){document.querySelectorAll('.screen').forEach(s=>s.hidden=true);$('s-'+name).hidden=false;current=name;stopVoice();
  ({start:renderStart,setup:renderSetup,map:renderMap,parent:renderParent}[name]||(()=>{}))()}
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
function renderStart(){$('start-haathi').innerHTML=haathi('happy');if(S.profile)$('cap-start').textContent=`Hi ${S.profile.name}! Turn the volume up.`}
function begin(){unlockAudio();FX.trumpet();if(!S.profile){go('setup');return}go('map');setTimeout(()=>say(['P_welcome',200,'P_map_hi'],null),600)}
$('btn-start').onclick=begin;$('start-haathi').onclick=begin;
let setupAge=4;
function renderSetup(){const ac=$('agechips');ac.innerHTML='';[3,4,5,6,7].forEach(a=>{const b=document.createElement('button');b.textContent=a;b.setAttribute('aria-pressed',a===setupAge);b.onclick=()=>{setupAge=a;FX.tap();renderSetup()};ac.appendChild(b)})}
$('btn-setup-done').onclick=()=>{unlockAudio();S.profile={name:$('in-name').value.trim()||'friend',age:setupAge,limit:+$('in-limit').value,created:today()};S.settings.consent=$('in-consent').checked;
  placeByAge();
  save();go('map');setTimeout(()=>{FX.trumpet();say([300,'P_hello',300,'P_map_hi'],null)},400)};

/* ======================= MAP ======================= */
function nodeIcon(n){const t=n.t;if(t.startsWith('d_')&&DSEC[n.sec])return DSEC[n.sec].icon;return ({meet:n.l,bubbles:'○',snack:'🥭',count:'123',numfind:'?',more:'>',add:'+',takeaway:'−',shape:'▲',pattern:'•◦',dice:'⚂',next:'→',bigger:'9>',missing:'_',share:'½',shop:'₹',length:'↔',
  wpre:'〰',wshape:'✎□',wletter:'✎'+(n.l||''),wnum:'✎'+(n.n||''),wcap:'✎'+(n.l||'').toUpperCase(),wname:'✎Aa',wword:'✎ab',dots:'⋯',friend:REGIONS[n.r||0].friend[0]})[t]||'?'}
const WRITE_T=new Set(['dots','slate','maze','tracepic','drawshapes','finishpic','countwrite','joinmatch','colour']);
const SUBJ=n=>n.t.startsWith('d_')?'discover':LGAMES[n.t]||n.t==='meet'?'letter':n.t==='friend'?'friend':(n.t[0]==='w'||WRITE_T.has(n.t))?'write':'number';
function nodeColor(n){const s=SUBJ(n);if(s==='discover')return '#2f8a5f';return s==='letter'?'#147a8a':s==='number'?'#e07a12':s==='write'?'#8a5cc2':'#f6a821'}
function renderMap(){
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
function playChapterNode(ch,i){const n=ch.nodes[i];const first=i===0&&n.stars==null;startRun(n,{chapter:ch.id,i,first})}

/* ======================= ACTIVITY RUNNER ======================= */
let RUN=null;
const ROUNDS={meet:1,friend:1,slate:1,
 /* multi-step games: each round is already several taps */
 memory:3,sortsound:3,stones:3,mole:3,rocket:3,order:3,sortcolour:3,share:4,shop:5,hunt:5,fishing:5,buildword:5,beats:6,
 /* writing */
 wletter:3,wcap:3,wnum:3,wrainbow:3,wpre:4,wshape:3,wword:2,dots:3,maze:4,tracepic:4,drawshapes:3,finishpic:3,wcopy:4,wheard:4,countwrite:5,wlines:3,joinmatch:3,colour:2,wname:8};
const DEFAULT_ROUNDS=8;
function setRounds(){const r=$('rounds');r.innerHTML='';for(let i=0;i<RUN.rounds;i++){const e=document.createElement('i');if(i<RUN.round)e.className='ok';else if(i===RUN.round)e.className='on';r.appendChild(e)}}
function actions(list){const a=$('actions');a.innerHTML='';list.forEach(([cls,label,fn,icon,id])=>{const b=document.createElement('button');b.className='big-btn '+cls;if(id)b.id=id;b.innerHTML=(icon||'')+label;b.onclick=()=>{unlockAudio();FX.tap();fn()};a.appendChild(b)})}
$('play-hear').onclick=()=>{unlockAudio();FX.tap();RUN&&RUN.prompt&&RUN.prompt()};
$('play-back').onclick=()=>{FX.tap();const f=RUN&&RUN.from;RUN=null;f&&f.corner?openCorner(f.corner,f.sec):go('map')};
const TITLES={tens:'Tens and ones',bigsmall:'Big and small letters',sameletter:'Same letter',oddsound:'Odd one out',samesound:'Same first sound?',picletter:'Picture to letter',letterpic:'Letter to picture',fishing:'Letter fishing',nextletter:'Next letter',missingletter:'Missing letter',sortsound:'Sound baskets',memory:'Memory pairs',rhyme:'Rhyme time',buildword:'Build a word',firstmissing:'First letter',hunt:'Letter hunt',mole:'Letter moles',hidden:'Hidden letter',stones:'River stones',shadow:'Letter shadows',
 fewer:'Which has fewer?',smaller:'Smaller number',matchgroup:'Match the number',maketen:'Make ten',beats:'Drum beats',rocket:'Rocket countdown',order:'Numbers in order',frog:'Frog hops',skip:'Skip counting',hiding:'Hiding ladoos',oddshape:'Odd shape out',sortcolour:'Colour baskets',size:'Big and small',heavy:'Heavy and light',queue:'First and last',money:'More money?',double:'Butterfly doubles',countshapes:'Count the shapes',
 maze:'Road maze',tracepic:'Trace a picture',drawshapes:'Draw with shapes',finishpic:'Finish the picture',wrainbow:'Rainbow writing',wheard:'Write what you hear',countwrite:'Count and write',wcopy:'Copy it',wlines:'Straight lines',joinmatch:'Join the pairs',colour:'Colouring',surprise:'Surprise!',
 meet:'Meet a letter',bubbles:'Sound Bubbles',snack:"Haathi's Snack",count:'Count with me',numfind:'Number Balloons',more:'Which has more?',add:'Put them together',takeaway:'Monkey takes away',shape:'Shape Hunt',pattern:'What comes next?',dice:'Quick look',next:'Before and after',bigger:'Bigger number',missing:'Missing number',share:'Share fairly',shop:'Mela shop',length:'Long and short',
  wpre:'Draw patterns',wshape:'Draw shapes',wletter:'Write a letter',wcap:'Big letter',wnum:'Write a number',wname:'Write my name',wword:'Write a word',dots:'Dot-to-dot',slate:'Magic slate',friend:'A new friend!'};
function startRun(n,from){
  let rounds=n.rounds||ROUNDS[n.t]||DEFAULT_ROUNDS;if(SUBJ(n)==='write'&&rounds>2&&((S.fbPrefs.write||3)<=2||likeScore(n.t)<-.4))rounds=Math.max(2,rounds-1);if(n.t==='wname')rounds=Math.min(8,nameChars().length);
  RUN={node:n,from,round:0,rounds,ok:[],prompt:null};
  go('play');$('play-title').textContent=n.title||TITLES[n.t];$('actions').innerHTML='';$('cap').textContent='';$('play-body').innerHTML='';
  let delay=250;if(from.first){const ch=S.chapters.find(c=>c.id===from.chapter);say(ch&&ch.id%3===0?[REGIONS[ch.region].clip,200,'P_chapter']:['P_chapter'],null);delay=1700}
  setTimeout(()=>{if(RUN&&RUN.node===n)nextRound()},delay);
}
function nextRound(){if(!RUN)return;setRounds();$('actions').innerHTML='';{const id=RUN.node.skill||RUN.node.t;if(SK[id]&&RUN.node.max!=null&&typeof param(id)==='number'&&RUN.node.max!==param(id)){const up=param(id)>RUN.node.max;RUN.node.max=param(id);if(up){FX.sparkle();$('cap').textContent='Level up! Numbers up to '+RUN.node.max}}}ACT[RUN.node.t](RUN.node,RUN.round)}
function roundDone(ok){if(!RUN||RUN._lock===RUN.round)return;RUN._lock=RUN.round;RUN.ok.push(!!ok);RUN.round++;setRounds();if(RUN.round>=RUN.rounds)finishRun();else{const r=RUN;setTimeout(()=>{if(RUN===r)nextRound()},600)}}
const learnN=(n,ok)=>{if(n.skill||SK[n.t])learn(n.skill||n.t,ok)};
function finishRun(){
  const run=RUN,n=run.node;const stars=Math.max(1,Math.round(run.ok.filter(Boolean).length/run.ok.length*3));
  let nextFn=null;
  if(run.from.chapter!=null){const ch=S.chapters.find(c=>c.id===run.from.chapter);if(ch){const nd=ch.nodes[run.from.i];nd.stars=Math.max(nd.stars||0,stars);
      if(ch.nodes.every(x=>x.stars!=null)&&!ch.done){ch.done=true;compose()}save();
      const c2=curChapter(),ni=curNodeIdx(c2);nextFn=()=>playChapterNode(c2,ni)}}
  const isFriend=n.t==='friend';const box=$('reward-box');
  box.innerHTML=isFriend?`<div class="big">${REGIONS[n.r].friend[0]}</div><h3>New friend!</h3><p>The ${REGIONS[n.r].friend[1]} joins your journey.</p>`:`<div class="stars3">${[0,1,2].map(k=>k<stars?STAR:STAR_OFF).join('')}</div><h3>${stars===3?'Superstar!':stars===2?'Great job!':'Well tried!'}</h3>`;
  const nb=document.createElement('button');nb.className='big-btn go';nb.innerHTML=ICON.next.replace('currentColor','#fff')+(nextFn?'Next stop':'Again');
  nb.onclick=()=>{FX.tap();$('reward').hidden=true;nextFn?nextFn():startRun(n,run.from)};
  const hb=document.createElement('button');hb.className='big-btn soft';hb.textContent=run.from.corner?'Back':'Map';hb.onclick=()=>{FX.tap();$('reward').hidden=true;run.from.corner?openCorner(run.from.corner,run.from.sec):go('map')};
  if(!isFriend){const fq=document.createElement('div');fq.innerHTML='<p class="faces-q">Did you like this game?</p><div class="faces"><button data-f="up" aria-label="Loved it">😀</button><button data-f="mid" aria-label="Okay">😐</button><button data-f="down" aria-label="Did not like">🙁</button></div>';
    fq.querySelectorAll('button').forEach(b=>b.onclick=()=>{fq.querySelectorAll('button').forEach(x=>x.classList.remove('on'));b.classList.add('on');FX.tap();const L=S.likes[n.t]||(S.likes[n.t]={up:0,mid:0,down:0});if(fq.dataset.v)L[fq.dataset.v]--;L[b.dataset.f]++;fq.dataset.v=b.dataset.f;save()});box.appendChild(fq)}
  const row=document.createElement('div');row.className='row';row.append(hb,nb);box.appendChild(row);
  $('reward').hidden=false;confetti();FX.fanfare();sync(false);
  say(isFriend?[600,'P_new_friend',W(REGIONS[n.r].friend[1])]:[500,'P_star',300,rnd(['P_pr1','P_pr2','P_pr5','P_pr6'])],null);RUN=null}
const PRAISE=['P_pr1','P_pr2','P_pr3','P_pr4','P_pr5','P_pr6'],RETRY=['P_listen_again','P_little_sound','P_close','P_together'];
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
function sayTurn(l,w){sayTurn.on=true;
  const turn=()=>say(hasRec(l)?['P_say_with_me',300,'R_'+l,500,'R_'+l,500,'P_your_turn']:['P_say_first',300,W(w),500,'P_your_turn'],hasRec(l)?`Say it with me: ${SHOW[l]}! Your turn!`:`Say the first sound of "${w}" together. Your turn!`);
  RUN.prompt=turn;turn();
  actions([['soft','Again',turn],['star','Said it!',()=>{S.said=(S.said||0)+1;save();burst($('actions'),16);FX.chime();say(['P_great_saying'],'Wonderful saying!').then(()=>roundDone(true))}],['soft','Skip',()=>roundDone(true)]]);
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
    else{wrong=true;FX.boing();anim(b,'boing',500);say([rnd(RETRY),300,...sndOf(t)],'Try another bubble!',{slow:true})}}
  setTimeout(prompt,300);
};
ACT.snack=(n)=>{
  const pool=S.intro.length?S.intro:(n.pool&&n.pool.length?n.pool:['s']);const weak=n.focus&&pool.includes(n.focus)&&rec(n.focus).att.length>=2&&accuracy(n.focus)<.7;const t=weak&&Math.random()<.25?n.focus:deck('snk',pool);const target=rnd(WORDS[t]);
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
    else{wrong=true;FX.boing();el.style.transform='';anim(el,'wiggle',500);anim(h,'nope',600);el.classList.remove('picked');say(['P_hmm_thats',W(it[0]),300,rnd(RETRY)],`That's ${it[0]}. Try again!`)}}
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
function layout(k,count,small){let html='<div class="objs">';for(let t=0;t<count;t+=10){html+='<div class="tenrow">';for(let f=t;f<Math.min(t+10,count);f+=5){html+='<div class="five">';for(let i=f;i<Math.min(f+5,count);i++)html+=objHTML(k,i,small);html+='</div>'}html+='</div>'}return html+'</div>'}
function numChoices(ans,max,el,onPick,lo){lo=lo==null?1:lo;let locked=false;const want=nopt();const hi=Math.max(max,ans+2);
  const pv=[];if(ans>=10){pv.push(ans+10,ans-10);const r=+String(ans).split('').reverse().join('');if(String(ans).length===2&&ans%10&&r!==ans)pv.push(r)}
  const set=new Set([ans]);shuffle(pv.filter(v=>v>=lo&&v<=hi&&v!==ans)).slice(0,ans>=13?1:0).forEach(v=>set.add(v));
  shuffle([ans-1,ans+1,ans-2,ans+2,ans+3,ans-3]).forEach(v=>{if(set.size<want&&v>=lo&&v<=hi)set.add(v)});let g=0;while(set.size<want&&g++<60)set.add(ri(lo,hi));
  shuffle([...set]).forEach(v=>{const b=document.createElement('button');b.className='pcard num';b.textContent=v;b.onclick=()=>{if(locked)return;if(v===ans)locked=true;onPick(b,v)};el.appendChild(b)})}
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
    if(ok){busy=true;popIt(b);say([N(t),250,rnd(PRAISE)],`Yes! ${t}!`).then(()=>roundDone(!wrong))}else{wrong=true;FX.boing();anim(b,'boing',500);say([N(v),300,'P_find_number',N(t)],`That's ${v}. Find ${t}!`)}});
  setTimeout(prompt,300)};
ACT.more=(n)=>{const max=n.max;let a=ri(1,max),b=ri(1,max);while(Math.abs(a-b)<Math.max(1,Math.round(max/5)))b=ri(1,max);
  body().innerHTML=`<div class="plates">${[a,b].map((v,i)=>`<button class="plate" data-p="${i}"><div class="pile">${Array.from({length:v},(_,k)=>objHTML('ladoo',k,v>10)).join('')}</div></button>`).join('')}</div>`;
  const prompt=()=>say(['P_which_more'],'Which plate has more ladoos?');RUN.prompt=prompt;prompt();
  let wrong=false,busy=false;const L=once(ok=>learnN(n,ok));
  body().querySelectorAll('.plate').forEach(p=>p.onclick=()=>{if(busy)return;const v=p.dataset.p==='0'?a:b,ok=v===Math.max(a,b);L(ok);
    if(ok){busy=true;p.classList.add('right');FX.chime();burst(p,16);say(['P_yes_more',200,N(Math.max(a,b)),'P_and',N(Math.min(a,b))],`Yes! ${Math.max(a,b)} is more than ${Math.min(a,b)}.`).then(()=>roundDone(!wrong))}
    else{wrong=true;FX.boing();anim(p,'wiggle',500);say(['P_count_again'],"Let's count them.").then(()=>countAlong([...p.querySelectorAll('.obj')]).then(()=>say(['P_which_more'],'Which plate has more?')))}})};
ACT.add=(n)=>{const max=n.max;const total=deck('add'+max,range(max<=5?2:Math.ceil(max*.3),max)),a=ri(1,total-1),b=total-a;const thing=rnd(COUNT_THINGS.slice(0,4));const small=total>10;
  body().innerHTML=total>20?`<div class="eqn">${blocksHTML(a)}<span>+</span>${blocksHTML(b)}</div>`:`<div class="eqn"><div class="grp">${Array.from({length:a},(_,k)=>objHTML(thing.k,k,small)).join('')}</div>+<div class="grp">${Array.from({length:b},(_,k)=>objHTML(thing.k,a+k,small)).join('')}</div></div><div class="eqn"><span>${a}</span>+<span>${b}</span>=<span>?</span></div><div class="choices" id="nc"></div>`;
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
ACT.shape=(n)=>{const set=n.set,t=rnd(set);const opts=shuffle([t,...shuffle(set.filter(x=>x!==t)).slice(0,2)]);const cols=shuffle(SHAPE_COL);
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
const MODES=['full','faint','own'];
const MODE_CAP={full:'Watch the dot, then follow it with your finger.',faint:'Again, with fewer helper lines.',own:'Now on your own! Start at the green dot.'};
const MODE_CLIP={full:'P_watch_dot',faint:'P_fewer_helpers',own:'P_your_own'};
ACT.wpre=(n,round)=>{const k=round<2?n.k:(n._k2||(n._k2=fresh('wp2',PRE_ALL.filter(x=>x!==n.k))));const mode=round%2===0?'full':'faint';if(round===3)n._k2=null;writeGlyph(PREP[k],{w:100,mode,intro:[mode==='full'?PREP_CLIP[k]:'P_fewer_helpers'],cap:mode==='full'?PREP_TXT[k]:MODE_CAP.faint,lines:false,done:ok=>{learnN(n,ok);roundDone(ok)}})};
ACT.wshape=(n,round)=>{const k=round<2?n.k:fresh('ws2',['square','triangle','rectangle','star'].filter(x=>x!==n.k));const mode=round===1?'faint':'full';writeGlyph(PREP[k],{w:100,mode,intro:mode==='full'?['P_draw_shape',W(k)]:['P_fewer_helpers'],cap:`Draw a ${k}!`,lines:false,done:ok=>{learnN(n,ok);roundDone(ok)}})};
ACT.wletter=(n,round)=>{const l=n.l,mode=MODES[round];writeGlyph(LS[l],{w:100,mode,intro:[MODE_CLIP[mode]],cap:`Write ${l}. `+MODE_CAP[mode],lines:true,done:ok=>{learnN(Object.assign({},n,{skill:'wletter'}),ok);if(round===2)airStep(l,sndOf(l),ok);else roundDone(ok)}})};
ACT.wcap=(n,round)=>{const L=n.l.toUpperCase(),mode=MODES[round];writeGlyph(CS[L],{w:100,mode,intro:round===0?['P_capital',L_(n.l)]:[MODE_CLIP[mode]],cap:`Big ${L}. `+MODE_CAP[mode],lines:true,done:ok=>{learnN(n,ok);if(round===2)airStep(L,[L_(n.l)],ok);else roundDone(ok)}})};
ACT.wnum=(n,round)=>{const v=n.n,mode=MODES[round],g=numStrokes(v);writeGlyph(g.s,{w:g.w,mode,intro:round===0?['P_draw_number',N(v)]:[MODE_CLIP[mode]],cap:`Write ${v}. `+MODE_CAP[mode],lines:false,done:ok=>{learnN(n,ok);if(round===2)airStep(String(v),[N(v)],ok);else roundDone(ok)}})};
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
  body().innerHTML=(o.header||'')+`<div class="lw-wrap"><canvas id="lw"></canvas></div>`;
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
  const start=()=>{k=0;ready=false;drawn=false;hit=path.map(()=>false);ink=0;inkGood=0;guide();say(o.intro,o.cap);if(o.mode==='full'){setTimeout(demo,900);setTimeout(()=>{if(!ready&&document.body.contains(c)){k=path.length;guide();ready=true}},9000)}else{ready=true;setTimeout(()=>say(['P_tap_done'],o.cap),2200)}};
  RUN.prompt=start;start();
  c.addEventListener('contextrestored',()=>{x.setTransform(dpr,0,0,dpr,0,0);guide();ready=true});
  const pos=e=>{const r=c.getBoundingClientRect();return[(e.clientX-r.left)*(Wd/r.width),(e.clientY-r.top)*(Hd/r.height)]};
  const paint=(px,py)=>{hue=(hue+5)%360;x.strokeStyle=o.color||`hsl(${hue},80%,52%)`;x.lineWidth=Math.max(8,sc*7.5);x.lineCap='round';x.beginPath();x.moveTo(...(last||[px,py]));x.lineTo(px+.1,py+.1);x.stroke();last=[px,py];
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
  body().innerHTML=(o.top||'')+`<div class="choices ${o.cls||''}" id="pk"></div>`;
  RUN.prompt=()=>say(o.say,o.cap);RUN.prompt();
  let wrong=false,busy=false;const L=once(ok=>{if(o.letter)recordLetter(o.letter,ok,o.items.length,RUN.node.t);learnN(RUN.node,ok)});
  o.items.forEach(it=>{const b=document.createElement('button');b.className=o.itemCls||'pcard';b.innerHTML=it.h;b.setAttribute('aria-label',it.label||String(it.v));
    b.onclick=()=>{if(busy)return;const ok=it.v===o.ans;L(ok);
      if(ok){busy=true;b.classList.add('right');FX.chime();burst(b,14);if(o.onRight)o.onRight(b);say(o.right||[rnd(PRAISE)],o.rightCap||'Yes!').then(()=>roundDone(!wrong))}
      else{wrong=true;FX.boing();anim(b,'wiggle',500);say(o.wrong?o.wrong(it):[rnd(RETRY)],o.wrongCap||'Try again!')}};
    $('pk').appendChild(b)});
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
const pileH=(k,v,small)=>`<div class="pile">${Array.from({length:v},(_,i)=>objHTML(k,i,small)).join('')}</div>`;
ACT.fewer=(n)=>{const max=n.max;let a=ri(1,max),b=ri(1,max);while(Math.abs(a-b)<Math.max(1,Math.round(max/5)))b=ri(1,max);const th=rnd(COUNT_THINGS);
  pickRound({items:[a,b].map(v=>({h:pileH(th.k,v,v>10),v,label:v+' '+th.label})),itemCls:'plate',cls:'plates',ans:Math.min(a,b),say:['P_which_less'],cap:'Which plate has fewer?',
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
      say([N(have),'P_and',N(ans),'P_makes',N(tot)],`${have} + ${ans} = ${tot}`).then(()=>roundDone(!wrong))}else{wrong=true;FX.boing();anim(b,'wiggle',500);say(['P_count_again'],'Count the empty spaces.')}},1)};
function drum(){if(!actx)return;const s0=S.settings.sfx;S.settings.sfx=true;tone(110,T(),.25,'sine',.5,60);noise(T(),.12,.25,300);S.settings.sfx=s0}
ACT.beats=(n)=>{const v=fresh('beats',[...Array(n.max).keys()].map(i=>i+1));body().innerHTML=`<div class="pic" id="drum" style="font-size:110px">🥁</div><div class="choices" id="nc" hidden></div>`;
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
    else{wrong=true;FX.boing();anim(b,'wiggle',500);say(['P_close'],`Count on from ${vis} to ${tot} with your fingers.`)}})};
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
const DSC=window.DISCOVER||{sections:[],reg:{},match:{},sort:{},order:{},sounds:{},quiz:{}};
const DSEC={};DSC.sections.forEach(s=>DSEC[s.id]=s);
const DI=k=>DSC.reg[k]||{e:'❓',n:k,f:'',c:''};
const DN=k=>'D_'+k, DF=k=>DI(k).f?['F_'+k]:[];
const ageNow=()=>(S.profile&&S.profile.age)||4;
const GLABEL={learn:'Learn',find:'Find it',odd:'Odd one out',colour:'What colour?',memory:'Memory',sound:'Animal sounds',quiz:'True or false?',sort:'Sorting',match:'Matching',order:'In order'};
const GICON={learn:'📖',find:'🔍',odd:'🙃',colour:'🎨',memory:'🃏',sound:'🔊',quiz:'👍',sort:'🧺',match:'🔗',order:'1️⃣'};
DSC.sections.forEach(s=>{SK['d_'+s.id]={sub:'Discover',name:s.name,levels:[0,1,2],lab:v=>['starter set','more items','all items'][v],unlock:()=>ageNow()>=s.age,node:()=>dNode(s.id)}});
function dPool(id){const s=DSEC[id];const sz=[6,10,99][Math.min(2,lv('d_'+id))]+(ageNow()>=5?4:0);return s.items.slice(0,Math.max(4,sz)).map(i=>i.k)}
function gLabel(g){const [t,a]=g.split(':');if(t==='sort')return DSC.sort[a].name;if(t==='match')return DSC.match[a].name;if(t==='order')return DSC.order[a].name;return GLABEL[t]}
function dNode(id,g){const s=DSEC[id];if(!g){const tried=S.sk['d_'+id]&&S.sk['d_'+id].n;const gs=s.games.filter(x=>x!=='learn');g=!tried&&s.games.includes('learn')?'learn':fresh('dg'+id,gs.length?gs:s.games)}
  const [t,arg]=g.split(':');const n={t:'d_'+t,sec:id,arg,skill:'d_'+id,title:s.name+': '+gLabel(g)};
  if(t==='learn')n.rounds=Math.min(8,dPool(id).length);if(t==='memory'||t==='sort')n.rounds=1;if(t==='order')n.rounds=(DSC.order[arg].steps.length>4?3:2);if(t==='quiz')n.rounds=Math.min(8,(DSC.quiz[id]||[]).length);
  return n}
const dCard=(k,big)=>`<span style="font-size:${big?'clamp(70px,20vw,120px)':'clamp(44px,12vw,72px)'};line-height:1">${DI(k).e}</span>`;
const dWithName=k=>`<div style="display:flex;flex-direction:column;align-items:center;gap:4px">${dCard(k)}<b style="font-family:var(--f-display);font-size:15px;color:var(--ink-soft)">${DI(k).n}</b></div>`;
function dOpts(pool,t,n){return shuffle([t,...shuffle(pool.filter(x=>x!==t&&DI(x).e!==DI(t).e)).slice(0,n-1)])}
ACT.d_learn=(n,round)=>{if(!n._ord)n._ord=shuffle(dPool(n.sec));const k=n._ord[round%n._ord.length];const it=DI(k);
  body().innerHTML=`<div class="learncard">${dCard(k,true)}<div class="word" style="font-size:clamp(28px,7vw,40px)">${it.n}</div>${it.f?`<div class="card-note">${it.f}</div>`:''}</div>`;
  RUN.prompt=()=>say([...(round===0?['P_d_learn','SEC_'+n.sec,300]:[]),DN(k),300,...DF(k)],it.f||it.n);RUN.prompt();anim(body().querySelector('.learncard'),'dance');
  actions([['soft','Hear again',()=>RUN.prompt()],['go','Next',()=>{learnN(n,true);roundDone(true)},ICON.next]])};
ACT.d_find=(n)=>{const pool=dPool(n.sec);const t=deck('df'+n.sec+pool.length,pool);
  pickRound({items:dOpts(pool,t,nopt()).map(k=>({h:dCard(k),v:k,label:DI(k).n})),ans:t,say:['P_d_find',DN(t)],cap:`Can you find the ${DI(t).n.toLowerCase()}?`,right:[DN(t),300,...DF(t)],rightCap:DI(t).f||`Yes, the ${DI(t).n.toLowerCase()}!`,wrong:it=>['P_hmm_thats',DN(it.v)]})};
ACT.d_odd=(n)=>{const s=DSEC[n.sec];const pool=dPool(n.sec);const three=shuffle(pool).slice(0,Math.max(2,nopt()-1));
  const others=DSC.sections.filter(x=>x.id!==n.sec&&x.age<=Math.max(ageNow(),s.age)&&!['colours','days','routine','cycles','science','opposites','safety','india'].includes(x.id)).flatMap(x=>x.items.map(i=>i.k)).filter(k=>!s.items.some(i=>i.k===k));
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
  pickRound({items:dOpts(pool.length>=3?pool:all,t,nopt()).map(k=>({h:dCard(k),v:k,label:DI(k).n})),ans:t,say:['P_d_says',300,'SND_'+t],cap:`Who says "${DSC.sounds[t]}"`,right:[DN(t),300,'SND_'+t],rightCap:`The ${DI(t).n.toLowerCase()} says ${DSC.sounds[t]}`,wrong:it=>[DN(it.v),300,'P_listen_again','SND_'+t]})};
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
  const rights=[...new Set(pairs.map(p=>p[1]))];const opts=shuffle([r,...shuffle(rights.filter(x=>x!==r&&x!==l)).slice(0,nopt()-1)]);
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
function openDiscover(secId){const b=$('corner-body');b.innerHTML='';
  if(!secId){$('corner-title').textContent='Discover';
    const sur=document.createElement('button');sur.className='go-btn';sur.style.cssText='width:100%;max-width:640px;animation:none';const open=DSC.sections.filter(s=>S.settings.unlock||ageNow()>=s.age);
    sur.innerHTML=`🎲 Surprise me <span style="font-size:15px;font-weight:600">(${open.length} topics open)</span>`;sur.onclick=()=>{unlockAudio();FX.sparkle();const s=fresh('dsur',open.map(x=>x.id));say(['P_surprise'],null);setTimeout(()=>startRun(dNode(s),{corner:'discover',sec:s}),700)};b.appendChild(sur);
    const g=document.createElement('div');g.className='tiles';b.appendChild(g);
    DSC.sections.forEach(s=>{const lk=!S.settings.unlock&&ageNow()<s.age;const t=document.createElement('button');t.className='tile';if(lk)t.style.opacity='.42';
      t.innerHTML=`<div class="ico">${s.icon}</div><span>${s.name}</span><small class="agebadge">${s.age}+</small>`;
      t.onclick=()=>{unlockAudio();if(lk){FX.boing();anim(t,'wiggle',500);return}FX.tap();say(['SEC_'+s.id],null);openDiscover(s.id)};g.appendChild(t)});
    const p=document.createElement('p');p.className='card-note';p.textContent=`${DSC.sections.length} topics. Faded ones are for older children (age shown on each); grown-ups can unlock them in settings.`;b.appendChild(p);
    say(['P_d_pick'],null);return}
  const s=DSEC[secId];$('corner-title').textContent=s.name;
  const back=document.createElement('button');back.className='pill-btn small';back.textContent='← All topics';back.onclick=()=>{FX.tap();openDiscover()};b.appendChild(back);
  const hero=document.createElement('div');hero.className='learncard';hero.style.cssText='flex-direction:row;gap:10px;flex-wrap:wrap;justify-content:center;max-width:640px';
  hero.innerHTML=s.items.slice(0,12).map(i=>`<span style="font-size:34px">${i.e}</span>`).join('');b.appendChild(hero);
  const g=document.createElement('div');g.className='tiles';b.appendChild(g);
  s.games.forEach(gm=>{const t0=gm.split(':')[0];const t=document.createElement('button');t.className='tile';t.innerHTML=`<div class="ico">${GICON[t0]}</div><span>${gLabel(gm)}</span>`;
    t.onclick=()=>{unlockAudio();FX.tap();startRun(dNode(secId,gm),{corner:'discover',sec:secId})};g.appendChild(t)});
}

/* ======================= PRACTICE CORNERS ======================= */
const CORNER={
 letters:[['meet','Meet a letter','abc'],['bubbles','Sound Bubbles','○'],['snack',"Haathi's Snack",'🥭'],['picletter','Picture to letter','🐍s'],['letterpic','Letter to picture','s🐍'],['samesound','Same first sound?','👍'],
  ['oddsound','Odd one out','🙃'],['fishing','Letter fishing','🐟'],['stones','River stones','🪨'],['mole','Letter moles','🐹'],['hunt','Letter hunt','🔍'],['sortsound','Sound baskets','🧺'],['memory','Memory pairs','🃏'],
  ['bigsmall','Big and small','Aa'],['sameletter','Same letter','b d'],['shadow','Letter shadows','🌑'],['hidden','Hidden letter','🍃'],['nextletter','Next letter','abc?'],['missingletter','Missing letter','a_c'],
  ['rhyme','Rhyme time','🎵'],['firstmissing','First letter','_at'],['buildword','Build a word','c-a-t']],
 numbers:[['count','Count with me','123'],['tens','Tens and ones','▮▮▪'],['numfind','Number balloons','🎈'],['dice','Quick look','⚂'],['matchgroup','Match the number','3=•••'],['order','Numbers in order','1→9'],['rocket','Rocket countdown','🚀'],
  ['beats','Drum beats','🥁'],['more','Which has more?','>'],['fewer','Which has fewer?','<'],['bigger','Bigger number','9>4'],['smaller','Smaller number','2<7'],['next','Before and after','→'],['missing','Missing number','4_6'],
  ['skip','Skip counting','10,20'],['frog','Frog hops','🐸'],['add','Adding','+'],['takeaway','Taking away','−'],['double','Butterfly doubles','🦋'],['hiding','Hiding ladoos','🥣'],['maketen','Make 5 and 10','▦'],
  ['share','Share fairly','½'],['shop','Mela shop','₹'],['money','More money?','👛'],['shape','Shape hunt','▲'],['countshapes','Count the shapes','⭐'],['oddshape','Odd shape out','◆'],['pattern','Patterns','•◦•'],
  ['sortcolour','Colour baskets','🎨'],['size','Big and small','🐘'],['heavy','Heavy and light','⚖️'],['length','Long and short','↔'],['queue','First and last','🚩']],
 writing:[['slate','Magic slate','✎'],['colour','Colouring','🖍️'],['maze','Road maze','🛣️'],['wlines','Straight lines','⁄'],['wpre','Patterns','〰'],['wshape','Draw shapes','□'],['drawshapes','Draw with shapes','🏠'],
  ['tracepic','Trace a picture','🪁'],['finishpic','Finish the picture','🦋'],['dots','Dot-to-dot','⋯'],['wletter','Small letters','✎a'],['wcap','Big letters','✎A'],['wrainbow','Rainbow writing','🌈'],['wcopy','Copy it','👀'],
  ['wheard','Write what you hear','👂'],['wnum','Write numbers','✎7'],['countwrite','Count and write','3✎'],['joinmatch','Join the pairs','🔗'],['wname','My name','Aa'],['wword','Write a word','ab']]
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
function openCorner(kind,sec){go('corner');if(kind==='discover'){openDiscover(sec);return}const b=$('corner-body');const from={corner:kind};b.innerHTML='';
  $('corner-title').textContent={letters:'Letters',numbers:'Numbers',writing:'Writing'}[kind];
  const list=CORNER[kind];const open=list.filter(([id])=>!cornerLocked(id));
  const sur=document.createElement('button');sur.className='go-btn';sur.style.cssText='width:100%;max-width:640px;animation:none';sur.innerHTML=`🎲 Surprise me <span style="font-size:15px;font-weight:600">(${open.length} games open)</span>`;
  sur.onclick=()=>{unlockAudio();FX.sparkle();const id=fresh('sur-'+kind,open.map(x=>x[0]));say(['P_surprise'],null);setTimeout(()=>startRun(cornerNode(id,kind),from),700)};b.appendChild(sur);
  const g=document.createElement('div');g.className='tiles';b.appendChild(g);
  list.forEach(([id,label,ico])=>{const lk=cornerLocked(id);const t=document.createElement('button');t.className='tile';if(lk)t.style.opacity='.42';
    t.innerHTML=`<div class="ico" style="color:${COL_OF[kind]};font-size:${ico.length>3?22:34}px">${ico}</div><span>${label}</span>`;
    t.onclick=()=>{unlockAudio();if(lk){FX.boing();anim(t,'wiggle',500);return}FX.tap();startRun(cornerNode(id,kind),from)};g.appendChild(t)});
  const p=document.createElement('p');p.className='card-note';p.textContent=`${list.length} games here. Faded ones open as your child learns. Every game picks new questions at random and avoids repeating the last few.`;b.appendChild(p);
  if(kind==='letters'){const h=document.createElement('h3');h.textContent='Meet any letter';h.style.cssText='font-family:var(--f-display);color:var(--leaf);margin:8px 0 0';b.appendChild(h);
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
function renderParent(){
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
  $('ps-name').value=S.profile.name;$('ps-age').value=S.profile.age;$('ps-limit').value=S.profile.limit;$('ps-sfx').checked=S.settings.sfx!==false;$('ps-unlock').checked=!!S.settings.unlock;$('ps-consent').checked=!!S.settings.consent;renderLikes();
  renderStudio();resetZone();renderFeedback()}
$('ps-save').onclick=()=>{S.profile.name=$('ps-name').value.trim()||S.profile.name;const oldAge=S.profile.age;S.profile.age=+$('ps-age').value;if(S.profile.age!==oldAge)placeByAge();S.profile.limit=+$('ps-limit').value;S.settings.sfx=$('ps-sfx').checked;S.settings.unlock=$('ps-unlock').checked;S.settings.consent=$('ps-consent').checked;save();$('ps-saved').hidden=false;setTimeout(()=>$('ps-saved').hidden=true,1600)};
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
function fbUpdate(){const t=fbText();$('fb-wa').href='https://wa.me/?text='+encodeURIComponent(t);$('fb-preview').value=t}
function renderFeedback(){const box=$('fb-stars');box.innerHTML=FB_Q.map(([k,l])=>`<div class="field"><label>${l}</label><div class="row" style="justify-content:flex-start;gap:4px" data-q="${k}">${[1,2,3,4,5].map(i=>`<button class="star-b" data-v="${i}" aria-label="${i} of 5" style="width:40px;height:40px">${i<=(fb[k]||0)?STAR:STAR_OFF}</button>`).join('')}</div></div>`).join('');
  box.querySelectorAll('[data-q]').forEach(r=>r.querySelectorAll('button').forEach(b=>b.onclick=()=>{fb[r.dataset.q]=+b.dataset.v;S.fbPrefs[r.dataset.q]=+b.dataset.v;save();renderFeedback()}));
  ['fb-name','fb-age','fb-liked','fb-hard','fb-idea','fb-sum'].forEach(id=>{$(id).oninput=fbUpdate;$(id).onchange=fbUpdate});fbUpdate()}
$('fb-wa').addEventListener('click',()=>{fbUpdate();sendFeedback();const n=$('fb-note');n.hidden=false;n.textContent='If WhatsApp did not open, tap "Copy text" and paste it into a message.'});
$('fb-copy').onclick=async()=>{fbUpdate();sendFeedback();const n=$('fb-note');n.hidden=false;try{await navigator.clipboard.writeText(fbText());n.textContent='Copied. Paste it into WhatsApp or email.'}catch(e){const p=$('fb-preview');p.hidden=false;p.focus();p.select();n.textContent='Select the text below and copy it.'}};

/* ======================= ANONYMOUS SYNC (only with parent consent) ======================= */
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
$('btn-share').onclick=shareGame;$('btn-share-start').onclick=shareGame;$('share-copy').onclick=()=>{FX.tap();copyLink()};

/* ======================= INSTALL HELP ======================= */
let installEvt=null;
const UA=navigator.userAgent||'';
const isIOS=/iPhone|iPad|iPod/i.test(UA)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
const inApp=/FBAN|FBAV|FB_IAB|Instagram|WhatsApp|Line\/|Snapchat|; wv\)/i.test(UA);
const isStandalone=()=>(window.matchMedia&&matchMedia('(display-mode: standalone)').matches)||navigator.standalone===true;
function installHelp(html){const h=$('install-help');h.hidden=false;h.innerHTML=html}
function refreshInstall(){const b=$('btn-install');if(!b)return;if(isStandalone()){b.hidden=true;$('install-help').hidden=true;return}b.hidden=false}
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installEvt=e;refreshInstall()});
window.addEventListener('appinstalled',()=>{installEvt=null;refreshInstall();installHelp('Installed! Find <b>Haathi</b> on your home screen.')});
$('btn-install').onclick=async()=>{FX.tap();
  if(installEvt){installEvt.prompt();try{await installEvt.userChoice}catch(e){}installEvt=null;return}
  if(inApp){installHelp(`You opened this inside another app (like WhatsApp), which can't install apps.<br><b>Tap ⋮ or ··· at the top, then "Open in Chrome"</b>${isIOS?' (or "Open in Safari")':''}. Then tap Install again.<br><span style="font-size:13px">Or copy the link: ${SHARE_URL}</span>`);return}
  if(isIOS){installHelp(`On iPhone or iPad, use <b>Safari</b>:<br>1. Tap the <b>Share</b> button (square with an arrow ⬆️).<br>2. Scroll and tap <b>Add to Home Screen</b>.<br>3. Tap <b>Add</b>.`);return}
  installHelp(`In <b>Chrome</b>: tap the <b>⋮</b> menu (top right), then <b>Install app</b> or <b>Add to Home screen</b>.<br>Using another browser? Open this link in Chrome: ${SHARE_URL}`)};
refreshInstall();

/* ======================= BOOT ======================= */
if(S.profile&&S.placed!==2)placeByAge();
document.addEventListener('visibilitychange',()=>{if(document.hidden){save();stopVoice();sync(false);document.querySelectorAll('canvas').forEach(c=>c.dispatchEvent(new PointerEvent('pointercancel')))}else{if(actx&&actx.state!=='running')try{actx.resume()}catch(e){}}});
window.addEventListener('pageshow',()=>{if(actx&&actx.state!=='running')try{actx.resume()}catch(e){}});
document.addEventListener('pointerdown',()=>{if(actx&&actx.state!=='running')actx.resume()},{passive:true});
window.__haathi={placeByAge:()=>placeByAge(),SK,LS,CS,DIG,PREP,DOTPICS,S:()=>S,compose,learn,startRun};
go('start');
})();
