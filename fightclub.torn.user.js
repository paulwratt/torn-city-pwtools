// ==UserScript==
// @name         Fight Club for Torn City
// @namespace    paulwratt.tornCity
// @version      1.07
// @description  Adds attack button to Fiends/Black lists
// @author       paulwratt [2027970]
// @homepage     https://paulwratt.github.io/torn-city-pwtools/
// @updateURL    https://github.com/paulwratt/torn-city-pwtools/raw/master/fightclub.torn.user.js
// @include      https://www.torn.com/friendlist.php*
// @include      https://www.torn.com/blacklist.php*
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

   ///////////////////////////////////////////////////////////////////////////////////////////////////
   // Utilities
   ///////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Creates  the Torn-style
   * @return {null}
   */
  function pw_FCaddStyles() {
    var isRApest = (typeof pw_RApest == 'undefined' ? -1 : 1);  // is RApest Userscript present
    if ( isRApest == 1 ) {
      GM_addStyle((<><![CDATA[
.d .profile-buttons .buttons-list .profile-button.profile-button-Attack.active .icon {
    background-position: -6px -823px;
}
]]></>).toString());
    } else {
      GM_addStyle((<><![CDATA[
.d .blacklist .expander a.user.faction, .r .blacklist .expander a.user.faction,
.d .blacklist .expander span.user.faction, .r .blacklist .expander span.user.faction {
    margin: 0px;
    margin-left: 0px;
    margin-right: 0px;
    min-width: 25px;
}
.d .blacklist .expander a.user.name, .r .blacklist .expander a.user.name {
    margin: 0px;
}
.d .blacklist .expander a.user.name .profile-buttons {
    display: float;
    margin-top: 3px;
    margin-left: 2px;
}
.d .blacklist .user-info-blacklist-wrap .expander {
    width: 286px;
}
.r .blacklist .user-info-blacklist-wrap .expand {
    width: 0px;
}
.d .blacklist .user-info-blacklist-wrap .level{
    padding: 0px;
    padding-top: 1px;
    padding-right: 8px;
}
.r .blacklist .user-info-blacklist-wrap .acc-body .delete {
    margin-left: 4px;
}
.r .blacklist .user-info-blacklist-wrap .level {
    w idth: 103px;
}
.d .profile-buttons .buttons-list {
    font: inherit;
    font-size: 100%;
    min-height: 24px;
}
.d .profile-buttons .buttons-list .profile-button {
    font-size: 20px;
    width: 24px;
    height: 24px;
    margin-right: 5px;
    margin-bottom: 2px;
    box-sizing: border-box;
    padding: 1px 0 0 1px;
    cursor: pointer;
    background: linear-gradient(to bottom, #ebebeb 0%, #dddddd 100%);
    box-shadow: 0 0px 2px 0 rgba(0, 0, 0, 0.5), inset 0 1px 0px 0px rgba(255, 255, 255, 0.5);
    border-radius: 5px;
}
.d .profile-buttons .buttons-list .profile-button.profile-button-black{
    background: linear-gradient(to bottom, #777777 0%, #333333 100%);
}
.d .profile-buttons .buttons-list .profile-button .icon {
    background-image: url(/images/v2/sidebar_icons_desktop_2017.png);
    width: 24px;
    height: 24px;
    display: inline-block;
    pointer-events: none;
    cursor: pointer;
}
.d .profile-buttons .buttons-list .profile-button.profile-button-Attack.active .icon {
    background-position: -6px -823px;
}
]]></>).toString());
    }
  }

  function pw_FCwriteNameListFinder(){
    var pwScript = document.createElement('script');
    var pwCode = document.createTextNode((<><![CDATA[

  var pw_FightClub = true;

  /**
   * Returns a 'FightClub' button as html
   * @param  {String} ID The torn profile XID
   * @return {String} as HTML
   */
  function pw_htmlFightClubButton(ID) {
    var profileButtonURL = 'https://www.torn.com/loader2.php?sid=getInAttack&amp;user2ID='+ID;
    }
    return '<a target=rape title="FightClub: Attack & Leave" class="profile-button profile-button-Attack active right" href="'+profileButtonURL+'"><i class="icon"></i></a>';
  }

  /**
   * Creates a 'FightClub' button (with wrapper)
   * @param  {String} ID The torn profile XID
   * @return {Node}
   */
  function pw_wrapFightClubButton(profileID) {
    var btnFight = pw_htmlFightClubButton(profileID);
    var btnList = '<div class="buttons-list">'+btnFight+'</div>';
    var btnWrapper = document.createElement('div');
    btnWrapper.className = 'profile-buttons';
    btnWrapper.style.float = 'right';
    btnWrapper.innerHTML = btnList;
    return btnWrapper;
  }

  /**
   * Adds in the 'FightClub' buttons in the Torn-style
   * @param  {NodeList} nl The elements of the Friend/Blacklist
   * @return {null}
   */
  function pw_FCprocessNameList(nl) {
    var isRApest = (typeof pw_RApest == 'undefined' ? -1 : 1);  // is RApest Userscript present
    var isATM = -1;                                            // description contains 'ATM' >= 0
    var isFF = -1;                                             // description contains 'FF:' >= 0
    var isOK = 0;                                              // status OK == 1
    var link = null;                                           // profile link
    var XID = '';                                              // profile id
    var newFightClubButton = null;                             // button to insert into page
    for (i=0; i<nl.length; i++) {
      isATM = nl[i].getElementsByClassName('text')[0].innerText.indexOf('ATM');
      isFF = nl[i].getElementsByClassName('text')[0].innerText.indexOf('FF:');
      isOK = nl[i].getElementsByClassName('t-green').length;
      if ((isOK == 1 && isRApest == -1) || (isOK == 1 && isRApest == 1 && isATM == -1 && isFF == -1)) {
        link = nl[i].getElementsByTagName('a')[0];
        XID = link.href.substr(link.href.indexOf('XID=')+4);
        newFightClubButton = pw_wrapFightClubButton(XID);
        link.insertBefore(newFightClubButton,link.childNodes[0]);
      }
    }
  }

  /**
   * Find list of names, repeat every 3 seconds until found
   * @param  {String} w Type of list ('friend' or 'black')
   * @return {null}
   */
  function pw_FCfindNameList() {
    var nameList = document.getElementsByClassName('user-info-blacklist-wrap');
    if (nameList.length == 0) {
      setTimeout('pw_FCfindNameList()',5000);
    }else if (nameList[0].hasChildNodes()) {
      pw_FCprocessNameList(nameList[0].children);
    }else{
      setTimeout('pw_FCfindNameList()',5000);
    }
  }
]]></>).toString());
    pwScript.appendChild(pwCode);
    document.head.appendChild(pwScript);
  }

// https://www.torn.com/loader2.php?sid=getInAttack&user2ID=1612828
// console.log(document.getElementsByClassName('user-info-blacklist-wrap').length);
// console.log(document.getElementsByClassName('user-info-blacklist-wrap')[0].children.length);
// console.log(document.getElementsByClassName('user-info-blacklist-wrap')[0].children[9].getElementsByClassName('text')[0].innerText.indexOf('ATM')); (==0)
// console.log(document.getElementsByClassName('user-info-blacklist-wrap')[0].children[9].getElementsByTagName('a')[0].href);

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // Main
    ///////////////////////////////////////////////////////////////////////////////////////////////////

    var currentPage = window.location.href;

    if (currentPage.indexOf('torn.com/') !== -1) {
       if (currentPage.indexOf('torn.com/blacklist.php') !== -1 || currentPage.indexOf('torn.com/friendlist.php') !== -1) {
        pw_FCaddStyles();
        pw_FCwriteNameListFinder();
        setTimeout('pw_FCfindNameList()',3000);
      }
    }

})();

} // iframe/logged in
