/*
tc.torn.js - generic script insert for Torn City
builds an object from current page data (that has side-panel)

tc.t     = tornCity.time = Torn City time
tc.p.n   = tornCity.player.name = player name
tc.p.id  = tornCity.player.id = player profile id
tc.p.d   = tornCity.player.money = current $'s
tc.p.l.l = tornCity.player.level.lvl = current level
tc.p.l.u = tornCity.player.level.up = can level up
tc.p.p   = tornCity.player.points = available TC points
tc.p.m   = tornCity.player.merits = available TC merits
tc.p.s.* = tornCity.player.scripts.* = array of objects, identify current Userscripts & Extensions
tc.e.c   = tornCity.energy.cur = current energy
tc.e.m   = tornCity.energy.max = maximum energy
tc.n.c   = tornCity.nerve.cur = current nerve
tc.n.m   = tornCity.nerve.max = maximum nerve
tc.h.c   = tornCity.happy.cur = current happy
tc.h.m   = tornCity.happy.max = maximum happy
tc.l.c   = tornCity.life.cur = current life
tc.l.m   = tornCity.life.max = maximum life
tc.f.c.c = tornCity.faction.chain.cur = current chain
tc.f.c.m = tornCity.faction.chain.max = maximum chain
tc.f.id  = tornCity.factoin.id = faction profile id
tc.f     = t.f.id == '0' if not in faction

*/

tc = { debug: false, long: false, t: 0,
       p: { n: '', id: '0', d: 0, l: { l: 0, u: false }, p: 0, m: 0, s: {},  }, 
       e: { c:0, m:0, t: '0:00' }, n: { c:0, m:0, t: '0:00' }, h: { c:0, m:0, t: '0:00' }, l: { c:0, m:0, t: '0:00' },
       f: { id: '0', c: { c: 0, m : 0, t: '0:00' } }
     };
tornCity = {};

// find chain timer object
var energyValue = $('#barEnergy').find("p[class^='bar-value']").get(0);
var energyTimer = $('#barEnergy').find("p[class^='bar-descr']").get(0);

var nerveValue = $('#barNerve').find("p[class^='bar-value']").get(0);
var nerveTimer = $('#barNerve').find("p[class^='bar-descr']").get(0);

var happyValue = $('#barHappy').find("p[class^='bar-value']").get(0);
var happyTimer = $('#barHappy').find("p[class^='bar-descr']").get(0);

var lifeValue = $('#barLife').find("p[class^='bar-value']").get(0);
var lifeTimer = $('#barLife').find("p[class^='bar-descr']").get(0);

var chainValue = $('#barChain').find("p[class^='bar-value']").get(0);
var chainTimer = $('#barChain').find("p[class^='bar-timeleft']").get(0);

// create an observer instance
var tc_observer = new MutationObserver(function(mutations) {
  m.v = mutation.target.innerText;
  m.t = mutation.type;
  mutations.forEach(function(mutation) {
    if (m.t == 'nerveValue') {
      if (m.v.indexOf('/') == -1) {
        v = m.v.split('/');
        tc.n.c = v[0];
        tc.n.m = v[1];
      }else{
        tc.n.c = m.v;
      }
      if (tc.debug) console.log("nerve values were updated");
    }
    if (m.t == 'chainValue') {
      if (m.v.indexOf('/') == -1) {
        v = m.v.split('/');
        tc.f.c.c = v[0];
        tc.f.c.m = v[1];
      }else{
        tc.f.c.c = m.v;
      }
      if (tc.debug) console.log("chain values were updated");
    }
    if (m.t == 'nerveTimer') {
      tc.f.c.t = m.v;
      if (tc.debug) console.log("nerve timer was updated");
    }
    if (m.t == 'chainTimer') {
      tc.f.c.t = m.v;
      if (tc.debug) console.log("chain timer was updated");
    }
  });
});

// Configuration of the observer.
// For possible options see:
//  https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver

// cur/max
var eValue = { energyValue:true };
var nValue = { nerveValue:true };
var hValue = { happyValue:true };
var lValue = { lifeValue:true };
var cValue = { chainValue:true };
// 0:00 or FULL
var eTimer = { energyTimer:true };
var nTimer = { nerveTimer:true };
var hTimer = { happyTimer:true };
var lTimer = { lifeTimer:true };
var cTimer = { chainTimer:true };

// pass in the target node, as well as the observer options

// values
tc_observer.observe( energyValue, eValue );
tc_observer.observe( nerveValue,  nValue );
tc_observer.observe( happyValue,  hValue );
tc_observer.observe( lifeValue,   lValue );
tc_observer.observe( chainValue,  cValue );
// timers
tc_observer.observe( energyTimer, eTimer );
tc_observer.observe( nerveTimer,  nTimer );
tc_observer.observe( happyTimer,  hTimer );
tc_observer.observe( lifeTimer,   lTimer );
tc_observer.observe( chainTimer,  cTimer );

// https://github.com/paulwratt/torn-city-pwtools/raw/master/tc.torn.js
