// ==UserScript==
// @name         Spy Faction for TornStats
// @namespace    paulwratt.tornstats
// @version      1.03
// @description  Fixed position Torn window to scroll spys
// @author       paulwratt [2027970]
// @homepage     https://paulwratt.github.io/torn-city-pwtools/
// @updateURL    https://github.com/paulwratt/torn-city-pwtools/raw/master/tornstats/spyfaction.ts.user.js
// @include      *tornstats.com/spyhq.php?action=faction*
// @run-at       document-start
// @grant        GM_addStyle
// ==/UserScript==

(function() {
  'use strict';

  var pwt_tsCSS = '';

  if (location.href.indexOf('tornstats.com') !== -1) {
    
    pwt_tsCSS = (<><![CDATA[
    #warbase {
      position: fixed !important;
      left: 45vw !important;
      height: 100vh !important;
      width: 500px !important;
    }
]]></>).toString();

if (typeof GM_addStyle != "undefined") {
	GM_addStyle(pwt_tsCSS);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(pwt_tsCSS);
} else if (typeof addStyle != "undefined") {
	addStyle(pwt_tsCSS);
} else {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(pwt_tsCSS));
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		heads[0].appendChild(node);
	} else {
		// no head yet, stick it whereever
		document.documentElement.appendChild(node);
	}
  }
    
}
  
})();
