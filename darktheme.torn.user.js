// ==UserScript==
// @name         Dark Theme for Torn
// @namespace    paulwratt.torn
// @version      1.06
// @description  10 lines of CSS and one darkened image, to appease Nobody[237547] and Chedburn[1]
// @author       paulwratt [2027970]
// @homepage     https://paulwratt.github.io/torn-city-pwtools/
// @updateURL    https://github.com/paulwratt/torn-city-pwtools/raw/master/darktheme.torn.user.js
// @include      *torn.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
  'use strict';

// this color scheme substitutes #f2f2f2 with #828282, and darker are then #626262, slightly darker still #525252

  if (location.href.indexOf('torn.com') !== -1) {
    GM_addStyle('' +
      'body.d, body.r { background: #111 url(https://paulwratt.github.io/torn-city-pwtools/imgs/bg_regular_dark.jpg) top left repeat !important; }' +
      '.d .profile-container, .d .gym-container .gym-box, .d .menu-body, .d .cont-gray10, .d .cont-gray { background-color: #626262 !important; }' +
      '.d .preferences-container #prefs-tab-menu .headers li { background: linear-gradient(to bottom,#dfdfdf 0,#828282 100%) !important; }' +
      '.d .preferences-container #prefs-tab-menu .headers li.delimiter { background: #626262 none !important; }' +
      '.d .info-msg-cont.grey, .d .info-msg-cont { background: linear-gradient(to bottom,#dfdfdf 0,#828282 100%) !important; }' +
      '.d .users-list>li.expanded { background: #626262 !important; }' +
      '.d .users-list>li { background: #626262 !important; }' +
      '.d .users-list>li:hover { background: #828282 !important; }' +
      '.d .travel-agency-travelling .stage>div.fade-left, .d .travel-agency-travelling .stage>div.fade-right { display: none !important; }' +
      '.d .forums-thread-wrap .thread-list>li .post-delimiter { background: #626262 !important; }' +
      '.d .container-body { background: #626262 !important; }' +
      '.d .container-body:hover { background: #828282 !important; }' +
//    '.d .action-log .log-list li.color-3 .message-wrap { background: #626262 !important; }' +
      '.d .action-log .log-list li .message-wrap { background: #626262 !important; }' +
      '.d .sortable-list .info-cont-wrap .divider span { background: #626262 !important; }' +
// sidebar
      '#sidebar>div>div>div>div>div>div { background: #525252 !important; }'+
      '#sidebar>div>div>div>div>div>div p>a { color: #57a1c5 !important; }'+
      '#nav-home>div, #nav-items>div, #nav-city>div, #nav-job>div, #nav-gym>div, #nav-properties>div, #nav-education>div, ' +
      '#nav-crimes>div, #nav-missions>div, #nav-newspaper>div, #nav-jail>div, #nav-hospital>div, #nav-casino>div, ' +
      '#nav-forums>div, #nav-hall_of_fame>div, #nav-my_faction>div, #nav-recruit_citizens>div, #nav-community_events>div ' +
      ' { background: #626262 !important; }'+
      '#nav-home>div:hover, #nav-items>div:hover, #nav-city>div:hover, #nav-job>div:hover, #nav-gym>div:hover, #nav-properties>div:hover, #nav-education>div:hover, ' +
      '#nav-crimes>div:hover, #nav-missions>div:hover, #nav-newspaper>div:hover, #nav-jail>div:hover, #nav-hospital>div:hover, #nav-casino>div:hover, ' +
      '#nav-forums>div:hover, #nav-hall_of_fame>div:hover, #nav-my_faction>div:hover, #nav-recruit_citizens>div:hover, #nav-community_events>div:hover ' +
      ' { background: #828282 !important; }'+
      '#nav-friends>div:hover, #nav-enemies>div:hover { background: #626262 !important; }'+
// below are tweaks
      '.d .forums-thread-wrap .thread-list .column-wrap .poster-wrap { background: #424242 !important; }' +
      '.d a.user.name, .d a.user.faction, .d .t-blue-cont a, .d .t-blue a, .d .t-blue { color: #57a1c5 !important; }' +
      'div.profile-sign a { color: #57a1c5 !important; text-decoration: none !important; }' +
      'div.profile-sign a:visited { color: #c57557 !important; text-decoration: none !important; }' +
// patches for TornStats
      'div.profile-container.basic-info.bottom-round>div>table>tbody>tr>td>table>tbody>tr>td>a { color: #57a1c5 !important; text-decoration: none !important; }' +
      ''
    );
  }
  
})();
