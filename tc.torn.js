/*
tc.torn.js - generic script insert for Torn City
             builds an object from current page data (that has side-panel)
see: https://github.com/paulwratt/torn-city-pwtools/master/tc.torn.js.md
*/

var tc = { ver: 1, debug: false, long: false, scripts: false, timers: true, t: 0,
       p: { n: '', id: '0', d: 0, l: { l: 0, u: false }, p: 0, m: 0,  }, 
       e: { c:0, m:0, t: '0:00' }, n: { c:0, m:0, t: '0:00' }, h: { c:0, m:0, t: '0:00' }, l: { c:0, m:0, t: '0:00' },
       f: { id: '0', c: { c: 0, m : 0, t: '0:00' } },
       s: {}
     };

var tornCity = null;

function tc_LongForm() {
  if ( tc.long == false || tornCity != null) return;
  tornCity = { time: 0, 
               player: { name: '', 
                         id: 0,
                         money: 0,
                         points: 0,
                         merits: 0,
                         level:   { lvl: 0, up: false }
                       },
               energy:  { cur: 0, max: 0, time: '0:00' },
               nerve:   { cur: 0, max: 0, time: '0:00' },
               happy:   { cur: 0, max: 0, time: '0:00' },
               life:    { cur: 0, max: 0, time: '0:00' },
               faction: { id: 0,
                          chain: { cur: 0, max: 0, time: '0:00' }
                        },
               scripts: {}
             };
}

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

function tc_watchValues(){
// values
tc_observer.observe( energyValue, eValue );
tc_observer.observe( nerveValue,  nValue );
tc_observer.observe( happyValue,  hValue );
tc_observer.observe( lifeValue,   lValue );
tc_observer.observe( chainValue,  cValue );
}

function tc_attachTimers(){
// timers
tc_observer.observe( energyTimer, eTimer );
tc_observer.observe( nerveTimer,  nTimer );
tc_observer.observe( happyTimer,  hTimer );
tc_observer.observe( lifeTimer,   lTimer );
tc_observer.observe( chainTimer,  cTimer );
}

function tc_detectScripts(){
  //
}

function tc_Populate(){
  tc.t = 0;
  if ( tc.scripts == true ) tc_detectScripts();
  if ( tc.long == true ) {
    if ( tornCity == null ) tc_LongForm();
    tornCity.time = tc.t;
    tornCity.player.name   = tc.p.n;
    tornCity.player.id     = tc.p.id;
    tornCity.player.money  = tc.p.d;
    tornCity.player.points = tc.p.p;
    tornCity.player.merits = tc.p.m;
    tornCity.player.level.lvl = tc.p.l.l;
    tornCity.player.level.up  = tc.p.l.u;
    tornCity.energy.cur   = tc.e.c;
    tornCity.energy.max   = tc.e.m;
    tornCity.energy.timer = tc.e.t;
    tornCity.nerve.cur   = tc.n.c;
    tornCity.nerve.max   = tc.n.m;
    tornCity.nerve.timer = tc.n.t;
    tornCity.happy.cur   = tc.h.c;
    tornCity.happy.max   = tc.h.m;
    tornCity.happy.timer = tc.h.t;
    tornCity.life.cur   = tc.l.c;
    tornCity.life.max   = tc.l.m;
    tornCity.life.timer = tc.l.t;
    tornCity.faction.id   = tc.f.id;
    tornCity.faction.chain.cur   = tc.f.c.c;
    tornCity.faction.chain.max   = tc.f.c.m;
    tornCity.faction.chain.timer = tc.f.c.t;
  }
  tc_whatValues();
}

setTimeout('tc_Populate(); if ( tc.timers == true ) tc_attachTimers();',2000);
// https://github.com/paulwratt/torn-city-pwtools/raw/master/tc.torn.js
