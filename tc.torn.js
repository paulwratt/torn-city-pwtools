/*
tc.torn.js - generic script insert for Torn City
builds an object from current page data (that has side-panel)

see: https://github.com/paulwratt/torn-city-pwtools/raw/master/tc.torn.js.md

*/

var tc = { debug: false, long: false, t: 0,
       p: { n: '', id: '0', d: 0, l: { l: 0, u: false }, p: 0, m: 0, s: {},  }, 
       e: { c:0, m:0, t: '0:00' }, n: { c:0, m:0, t: '0:00' }, h: { c:0, m:0, t: '0:00' }, l: { c:0, m:0, t: '0:00' },
       f: { id: '0', c: { c: 0, m : 0, t: '0:00' } }
     };

var tornCity = null;

function tc_LongForm() {
  tornCity = { time: 0, 
               player: { name: '', 
                         id: '',
                         money: 0,
                         level:   { lvl: 0, up: false },
                         points: 0,
                         merits: 0,
                         scripts: {},
                       },
               energy:  { cur: 0, max: 0, time: '0:00' },
               nerve:   { cur: 0, max: 0, time: '0:00' },
               happy:   { cur: 0, max: 0, time: '0:00' },
               life:    { cur: 0, max: 0, time: '0:00' },
               faction: { id: 0,
                          chain: { cur: 0, max: 0, time: '0:00' }
                        }
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
