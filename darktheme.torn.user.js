// ==UserScript==
// @name         Dark Theme for Torn
// @namespace    paulwratt.torn
// @version      1.03
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
//    '.d .action-log .log-list li.color-3 .message-wrap { background: #626262 !important; }' +
      '.d .action-log .log-list li .message-wrap { background: #626262 !important; }' +
// below are tweaks
      '.d .forums-thread-wrap .thread-list .column-wrap .poster-wrap { background: #424242 !important; }' +
      '.d a.user.name, .d a.user.faction, .d .t-blue-cont a, .d .t-blue a, .d .t-blue { color: #57a1c5 !important; }' +
      'div.profile-sign a { color: #57a1c5 !important; text-decoration: none !important; }' +
      'div.profile-sign a:visited { color: #c57557 !important; text-decoration: none !important; }' +
      ''
    );
  }
  
})();
