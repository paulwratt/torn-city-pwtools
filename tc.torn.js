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
tc.f     = length 0 if not in faction

*/

// find chain timer object
var chainTimer = $('#barChain').find("p[class^='bar-timeleft']").get(0);

// create an observer instance
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.type == 'characterData') {
      // do something
      console.log("chain timer was updated");
    }
  });
});

// Configuration of the observer.
// For possible options see:
//  https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
var config = { characterData:true };

// pass in the target node, as well as the observer options
observer.observe(chainTimer, config);

// https://github.com/paulwratt/torn-city-pwtools/raw/master/tc.torn.js
