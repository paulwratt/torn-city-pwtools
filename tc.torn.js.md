## tc.torn.js - generic object reference for Torn City
Inserts a script block into current torn page, builds an object from current page data (that has side-panel), using _jQuery_ to find those objects, attaches "change" watchers.

Can be manually inserted via object construction:
```javascript
var tcScript = document.createElement('script');
tcScript.src = 'https://github.com/paulwratt/torn-city-pwtools/raw/master/tc.torn.js';
document.head.appendChild(tcScript);
```

or via Userscript:
```javascript
@require      https://github.com/paulwratt/torn-city-pwtools/raw/master/tc.torn.js`
```

generates short form, and optionally a long form, generic Torn City reference object, without the need for an API key:
```javascript
tc.ver   = 1 - version of tc/tornCity objects
tc.debug = false - console output (bool)
tc.long  = false - generate long form objects (bool)
tc.scripts = false - detect Userscripts & Extensions
tc.timers  = false - attack timer watchers
tc.t     = tornCity.time = Torn City time (UTC)
tc.p.n   = tornCity.player.name = player name (str)
tc.p.id  = tornCity.player.id = player profile id (num)
tc.p.d   = tornCity.player.money = current money (str)
tc.p.l.l = tornCity.player.level.lvl = current level (num)
tc.p.l.u = tornCity.player.level.up = can level up (bool)
tc.p.p   = tornCity.player.points = available TC points (num)
tc.p.m   = tornCity.player.merits = available TC merits (num)
tc.e.c   = tornCity.energy.cur = current energy (num)
tc.e.m   = tornCity.energy.max = maximum energy (num)
tc.e.t   = tornCity.energy.timer = energy timer (str)
tc.n.c   = tornCity.nerve.cur = current nerve (num)
tc.n.m   = tornCity.nerve.max = maximum nerve (num)
tc.n.t   = tornCity.nerve.timer = nerve timer (str)
tc.h.c   = tornCity.happy.cur = current happy (num)
tc.h.m   = tornCity.happy.max = maximum happy (num)
tc.h.t   = tornCity.happy.timer = happy timer (str)
tc.l.c   = tornCity.life.cur = current life (num)
tc.l.m   = tornCity.life.max = maximum life (num)
tc.l.t   = tornCity.life.timer = life timer (str)
tc.f.id  = tornCity.factoin.id = faction profile id (num) (0 if not in faction)
tc.f.c.c = tornCity.faction.chain.cur = current chain (num)
tc.f.c.m = tornCity.faction.chain.max = maximum chain (num)
tc.f.c.t = tornCity.faction.chain.timer = chain timer (str)
tc.s.*   = tornCity.player.scripts.* = array of objects, Userscripts & Extensions
```

setting `tc.debug` to `true` will output info to the console, as it happens.

setting `tc.long` to `true` will generate `tornCity.*` with long form names of `tc.*`.

setting `tc.scripts` to `true` will try to detect any know torn scripts. 
