// ==UserScript==
// @name         ReAttack Pest for Torn City
// @namespace    paulwratt.tornCity
// @version      0.01
// @description  Allows add user to Friends or Black list after _mugging_ someone
// @author       paulwratt [2027970]
// @homepage     https://paulwratt.github.io/torn-city-pwtools/
// @updateURL    https://github.com/paulwratt/torn-city-pwtools/raw/master/rapest.torn.user.js
// @include      https://www.torn.com/loader.php?sid=attackLog&ID=*
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.8.2/moment.min.js
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

// only run if logged in or if in an iframe
if (!(window === window.top && $('li.logout').length === 0)) {

(function() {
    'use strict';

    // Your code here...
})();

} // iframe/logged in
