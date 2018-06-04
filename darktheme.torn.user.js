// ==UserScript==
// @name         Dark Theme for Torn
// @namespace    paulwratt.torn
// @version      1.21
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
      '.d .container-body-list>li.red .container-body { background: #525252 !important; }' +
      '.d .container-body-list>li.red .container-body:hover { background: #828282 !important; }' +
      '.d .fm-list>li { background: #626262 !important; }' +
      '.d .fm-list>li.new { background: #525252 !important; }' +
      '.d .fm-list>li:hover { background: #828282 !important; }' +
// white gradient bars/buttons
//    '.d .white-grad, .d .white-grad-tabs>li, .d .white-grad-tabs>li.disabled:hover, .d .white-grad-tabs>li.ui-state-disabled:hover, .d .fm-list>li.new, ' +
//    '.d .thread-list .action-wrap>li, .d .thread-list .action-wrap>li.like.disabled:hover, .d .thread-list .action-wrap>li.dislike.disabled:hover, ' +
//    '.d .forums-thread-wrap .action-wrap>li.quote.disabled:hover, .d .forums-thread-wrap .action-wrap>li.report.disabled:hover, '+
//    '.d .forums-thread-wrap .action-wrap>li.edit.disabled:hover, .d .forums-thread-wrap .action-wrap>li.lock.disabled:hover, ' +
//    '.d .forums-thread-wrap .action-wrap>li.delete.disabled:hover, .d .forums-thread-wrap .action-wrap>li.move.disabled:hover, ' +
//    '.d .forums-thread-wrap .action-wrap>li.ban.disabled:hover, .d .customize-items-list>li>span, ' +
//    '.d .content-wrapper.logged-out-sidebar .thread-list .action-wrap>li:hover, .d .stock-main-wrap .stock-list .item .ui-accordion-header-active, ' +
//    '.d .stock-main-wrap .stock-list .item .stock-tabs>li.ui-tabs-active, .d .sortable-list .latest-messages .list-cont-bg>li.new ' +
      '.d .white-grad { background: linear-gradient(to bottom,#626262 0,#525252 100%) !important; }' +
// fixups
      '.d .faction-main-wrap .title-toggle.active+.cont-toggle a { color: #57a1c5 !important; text-decoration: none !important; pointer: }' +
      '.d .faction-main-wrap .title-toggle.active+.cont-toggle a:visited { color: #c57557 !important; text-decoration: none !important; }' +
      '.d .chain-attacks-title { background-color: #626262 !important; }' +
      '.d .chain-attacks-list { background-color: #525252 !important; }' +
      '.d .f-war-list.war-new>li { background-color: #525252 !important; }' +
      '.d .f-war-list.war-new>li:hover { background-color: #626262 !important; }' +
      '.d .f-war-list.war-new>li.inactive, .d .f-war-list.war-new>li.inactive:hover { background: #111 url(https://paulwratt.github.io/torn-city-pwtools/imgs/bg_regular_dark.jpg) top left repeat !important; }' +
      '.d .f-war-list.war-new .faction-war-info { background-color: #525252 !important; }' +
      '.d .f-war-list.war-new .faction-names { background-color: #626262 !important; }' +
      '.d .f-war-list.war-new .faction-war .tab-menu-cont .members-list { background-color: #525252 !important; }' +
      '.d .f-war-list.war-new .faction-war .tab-menu-cont .members-cont:not(.profile-mode) .join:hover { background: #626262 !important; }' +
//    '.d .action-log .log-list li.color-3 .message-wrap { background: #626262 !important; }' +
      '.d .action-log .log-list li .message-wrap { background: #626262 !important; }' +
      '.d .blacklist .user-info-blacklist-wrap li:hover { background: #828282 !important; }' +
      '.d .specials-cont .item:hover { background-color: #828282 !important; }' +
      '.d .specials-cont>li:hover { background-color: #828282 !important; }' +
      '.d .module-desc .info li { color: rgb(242, 242, 242) !important; }' +
      '.d .points-market .users-point-sell>li:hover { background-color: #828282 !important; }' +
      '.d .properties-list>li { background-color: #525252 !important; }' +
      '.d .properties-list>li:hover { background-color: #626262 !important; }' +
      '.d .properties-list>li.act { background-color: #828282 !important; }' +
      '.d .quick-links-wrap .columns > li .rows > li:hover { background-color: #828282 !important; }' +
      '.d .quick-links-wrap .columns > li .rows > li.title { background-color: #525252 !important; }' +
      '.d .items-wrap .items-footer { background-color: #525252 !important; }' +
      '.d .items-wrap .items-cont>li { background-color: #626262 !important; }' +
      '.d .items-wrap .items-cont>li:hover { background-color: #828282 !important; }' +
      '.d .items-wrap .items-cont>li.disabled { background-color: #525252 !important; }' +
      '.d .armoury-tabs .item-list>li.item-give-act, .d .armoury-tabs .item-list>li.item-loan-act, .d .armoury-tabs .item-list>li.item-retrieve-act, ' +
      '.d .armoury-tabs .item-list>li.item-info-act, .d .armoury-tabs .item-list>li.item-use-act ' +
      ' { background-color: #828282 !important; }' +
      '.d .armoury-tabs .item-list .item-action .give.active, .d .armoury-tabs .item-list .item-action .loan.active, ' +
      '.d .armoury-tabs .item-list .item-action .retrieve.active, .d .armoury-tabs .item-list .item-action .use.active' +
      ' { color: #57a1c5 !important; }' +
      '.d .specials-cont-wrap .specials-cont>li.act { background-color: #828282 !important; }' +
      '.d .chart-placeholder { background-color: #828282 !important; }' +
      '.d .manage-company .funds .funds-cont { background-color: #828282 !important; }' +
      '.d .items-wrap .items-cont>li.act { background-color: #828282 !important; }' +
      '.d .show-item-info .item-cont .item-wrap { background-color: #828282 !important; }' +
      '.d .info-cont li, .d .additional-info li { background-color: #828282 !important; }' +
      '.d .info-wrap .t-delimiter { background: linear-gradient(to bottom,#828282 0,rgba(242,242,242,0) 100%) !important; }' +
      '.d .info-wrap .b-delimiter { background: linear-gradient(to bottom,rgba(242,242,242,0) 0,#828282 100%) !important; }' +
      '.d .show-item-info .item-cont .info-msg { background-color: #828282 !important; }' +
      '.d .items-list>li.act { background-color: #828282 !important; }' +
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
      '.d .f-war-list.war-new .faction-war .tab-menu-cont .members-list .level { color:#323232 !important; }'+
// patches for TornStats
      'div.profile-container.basic-info.bottom-round>div>table>tbody>tr>td>table>tbody>tr>td>a { color: #57a1c5 !important; text-decoration: none !important; }' +
// patches for DocTorn
      '.d .sortable-list .doctorn-widget__body .info-cont-wrap .divider span{ background: rgb(242, 242, 242) !important; }' +
      ''
    );
  }
  
})();
