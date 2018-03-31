// ==UserScript==
// @name         ReAttack Pest for Torn City
// @namespace    paulwratt.tornCity
// @version      2.07
// @description  Allows add user to Friends or Black list after _mugging_ someone
// @author       paulwratt [2027970]
// @homepage     https://paulwratt.github.io/torn-city-pwtools/
// @updateURL    https://github.com/paulwratt/torn-city-pwtools/raw/master/rapest.torn.user.js
// @include      https://www.torn.com/loader.php?sid=attackLog&ID=*
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
  function pw_RAaddStyles() {
    var isFCuser = (typeof pwFightClub == 'undefined' ? -1 : 1);  // is FightClub Userscript present
    if ( isFCuser == 1 ) {
      GM_addStyle((<><![CDATA[
.d .profile-buttons .buttons-list .profile-button.profile-button-Fight.active .icon {
    background-position: -6px -823px;
}
.d .profile-buttons .buttons-list .profile-button.profile-button-Chain.active .icon {
    background-position: -6px -4px;
}
.d .profile-buttons .buttons-list .profile-button.profile-button-addFriend.active .icon {
    background-position: -7px -205px;
}
.d .profile-buttons .buttons-list .profile-button.profile-button-addEnemy.active .icon {
    background-position: -7px -239px;
}
.d .profile-buttons .buttons-list .profile-button.profile-button-addFriend.disabled .icon {
    background-position: -294px -84px;
    cursor: default;
}
.d .profile-buttons .buttons-list .profile-button.profile-button-addEnemy.disabled .icon {
    background-position: -336px -84px;
    cursor: default;
}
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
.d .profile-buttons .buttons-list .profile-button.profile-button-Fight.active .icon {
    background-position: -6px -823px;
}
.d .profile-buttons .buttons-list .profile-button.profile-button-Chain.active .icon {
    background-position: -6px -4px;
}
.d .profile-buttons .buttons-list .profile-button.profile-button-addFriend.active .icon {
    background-position: -7px -205px;
}
.d .profile-buttons .buttons-list .profile-button.profile-button-addEnemy.active .icon {
    background-position: -7px -239px;
}
.d .profile-buttons .buttons-list .profile-button.profile-button-addFriend.disabled .icon {
    background-position: -294px -84px;
    cursor: default;
}
.d .profile-buttons .buttons-list .profile-button.profile-button-addEnemy.disabled .icon {
    background-position: -336px -84px;
    cursor: default;
}
]]></>).toString());
    }
  }

  /**
   * Returns a 'Add' button in Torn-style
   * @param  {String} t  The type of the button
   * @param  {String} ID The torn profile XID
   * @return {String} as HTML
   */
  function pw_RAhtmlIconButtonAdd(t,ID) {
    var profileButton = 'profile-button-';
    var profileButtonColor = '';
    var profileButtonTitle = 'RApest: ';
    var profileButtonURL = 'https://www.torn.com/';
    if (t == 'B') {
      profileButton = profileButton + 'addFriend';
      profileButtonColor = 'profile-button-black ';
      profileButtonTitle = profileButtonTitle + 'Add to Blacklist';
      profileButtonURL = profileButtonURL + 'blacklist.php#/p=add&amp;XID='+ID;
    } else if (t == 'F') {
      profileButton = profileButton + 'addFriend';
      profileButtonTitle = profileButtonTitle + 'Add to Friendslist';
      profileButtonURL = profileButtonURL + 'friendlist.php#/p=add&amp;XID='+ID;
    }
    return '<a title="'+profileButtonTitle+'" class="profile-button '+profileButtonColor+profileButton+'  active" href="'+profileButtonURL+'"><i class="icon"></i></a>';
  }

  /**
   * Returns a 'Remove' button in Torn-style
   * @param  {String} t  The type of the button
   * @return {String} as HTML
   */
  function pw_RAhtmlIconButtonRemove(t) {
    var profileButton = 'profile-button-';
    var profileButtonColor = '';
    var profileButtonTitle = 'RApest: ';
    var profileButtonURL = 'https://www.torn.com/';
    if (t == 'B') {
      profileButton = profileButton + 'addEnemy';
      profileButtonColor = 'profile-button-black ';
      profileButtonTitle = profileButtonTitle + 'Remove from Blacklist';
      profileButtonURL = profileButtonURL + 'blacklist.php';
    } else if (t == 'F') {
      profileButton = profileButton + 'addEnemy';
      profileButtonTitle = profileButtonTitle + 'Remove from Friendslist';
      profileButtonURL = profileButtonURL + 'friendlist.php';
    }
    return '<a target="rapest" title="'+profileButtonTitle+'" class="profile-button '+profileButtonColor+profileButton+'  active" href="'+profileButtonURL+'"><i class="icon"></i></a>';
  }

  /**
   * Creates a 'Add'/'Remove' button strip
   * @param  {String} ID   The torn profile XID
   * @return {Node}
   */
  function pw_RAwrapMuggedButtons(profileID) {
    pw_RAaddStyles();
    var btnFriendAdd = pw_RAhtmlIconButtonAdd('F', profileID);
    var btnFriendRemove = pw_RAhtmlIconButtonRemove('F');
    var btnEnemyAdd = pw_RAhtmlIconButtonAdd('B', profileID);
    var btnEnemyRemove = pw_RAhtmlIconButtonRemove('B');
    var btnList = '<div class="buttons-list">'+btnFriendAdd+btnFriendRemove+btnEnemyRemove+btnEnemyAdd+'</div>';
    var btnWrapper = document.createElement('div');
    btnWrapper.className = 'profile-buttons';
    btnWrapper.innerHTML = btnList;
    return btnWrapper;
  }

  function pw_RAwriteNameListFinder(){
    var pwScript = document.createElement('script');
    var pwCode = document.createTextNode((<><![CDATA[

  var pw_RApest = true;
  
  /**
   * Returns a 'Fight' button in Torn-style
   * @param  {String} t  The type of the button (A)TM or (R)eChain
   * @param  {String} ID The torn profile XID
   * @return {String} as HTML
   */
  function pw_RAhtmlIconButton(t,ID) {
    var profileButton = 'profile-button-';
    var profileButtonColor = '';
    var profileButtonTitle = 'RApest: ';
    var profileButtonURL = 'https://www.torn.com/';
    if (t == 'A') {
      profileButton = profileButton + 'Fight';
      profileButtonTitle = profileButtonTitle + 'Use ATM';
      profileButtonURL = profileButtonURL + 'loader2.php?sid=getInAttack&amp;user2ID='+ID;
    } else if (t == 'R') {
      profileButton = profileButton + 'Chain';
      profileButtonTitle = profileButtonTitle + 'ReChain';
      profileButtonURL = profileButtonURL + 'loader2.php?sid=getInAttack&amp;user2ID='+ID;
    }
    return '<a target=rape title="'+profileButtonTitle+'" class="profile-button '+profileButtonColor+profileButton+' active right" href="'+profileButtonURL+'"><i class="icon"></i></a>';
  }

  /**
   * Creates a 'Fight' button (strip)
   * @param  {String} ID The torn profile XID
   * @return {Node}
   */
  function pw_RAwrapAttackButton(profileID,buttonType) {
    var btnFight = pw_RAhtmlIconButton(buttonType, profileID);
    var btnList = '<div class="buttons-list">'+btnFight+'</div>';
    var btnWrapper = document.createElement('div');
    btnWrapper.className = 'profile-buttons';
    btnWrapper.style.float = 'right';
    btnWrapper.innerHTML = btnList;
    return btnWrapper;
  }

  /**
   * Adds in the 'Fight' buttons in the Torn-style
   * @param  {NodeList} nl The elements of the Friend/Blacklist
   * @return {null}
   */
  function pw_RAprocessNameList(nl) {
    var isATM = -1;             // description contains 'ATM' == 0
    var isFF = -1;              // description contains 'FF:' == 0
    var isOK = 0;               // status OK == 1
    var link = null;            // profile link
    var XID = '';               // profile id
    var xBut = 'A';             // default button type (ATM)
    var newFightButton = null;  // button to insert into page
    for (i=0; i<nl.length; i++) {
      isATM = nl[i].getElementsByClassName('text')[0].innerText.indexOf('ATM');
      isFF = nl[i].getElementsByClassName('text')[0].innerText.indexOf('FF:');
      isOK = nl[i].getElementsByClassName('t-green').length;
      if (isOK == 1 && (isATM !== -1 || isFF !== -1)) {
        link = nl[i].getElementsByTagName('a')[0];
        XID = link.href.substr(link.href.indexOf('XID=')+4);
        if (isFF > -1) { xBut = 'R'; } // make it a ReChain button
        newFightButton = pw_RAwrapAttackButton(XID,xBut);
        link.insertBefore(newFightButton,link.childNodes[0]);
      }
      xBut = 'A'; // reset to default button type (ATM)
    }
  }

  /**
   * Find list of names, repeat every 3 seconds until found
   * @param  {String} w Type of list ('friend' or 'black')
   * @return {null}
   */
  function pw_RAfindNameList() {
    var nameList = document.getElementsByClassName('user-info-blacklist-wrap');
    if (nameList.length == 0) {
      setTimeout('pw_RAfindNameList()',3000);
    }else if (nameList[0].hasChildNodes()) {
      pw_RAprocessNameList(nameList[0].children);
    }else{
      setTimeout('pw_RAfindNameList()',3000);
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


  /**
   * Parses a string containing HTML and returns a jQuery Object
   * @param  {string} str HTML
   * @return {jQUery}
   */
    function parseHTML(str) {
      var tmp = document.implementation.createHTMLDocument();
      tmp.body.innerHTML = str;
      return $(tmp.body);
    }

  /**
   * Wraps GM_xmlhttpRequest in a Promise
   * @param {object} options GM_xmlhttpRequest options; don't set onload, onerror, onabort or ontimeout
   * @return {Promise}
   */
    var gmRequest = (function(GM_xmlhttpRequest) {
      return function(options) {
        return new Promise(function(resolve, reject) {
          var details = Object.assign(options, {
            onload: function(response) {
              // parse json if the response is in json-format
              if (response.responseHeaders.match(/Content-Type: application\/json/i)) {
                try {
                  response.responseJSON = JSON.parse(response.responseText);
                } catch (e) {
                  reject('Couldn\'t parse JSON: ' + e + '. Input: ' + response.responseText);
                }
              } else if (response.responseHeaders.match(/Content-Type: text\/html/i)) {
                response.responseHTML = parseHTML(response.responseText);
              }

              resolve(response);
            },
            onerror: reject,
            onabort: reject,
            ontimeout: reject
          });

          GM_xmlhttpRequest(details);
        });
      };
    }(GM_xmlhttpRequest));

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // Main
    ///////////////////////////////////////////////////////////////////////////////////////////////////

    var currentPage = window.location.href;

    if (currentPage.indexOf('torn.com/') !== -1) {
      if (currentPage.indexOf('torn.com/loader.php?sid=attackLog&ID=') !== -1) {
        var mugged = document.getElementsByClassName('attacking-events-mug');
        if (mugged.length > 0) {
          var muggedID = mugged[0].nextSibling.nextSibling.children[0].children[1].href.split('=')[1];
          var newMuggedButtons = pw_RAwrapMuggedButtons(muggedID);
          var muggedMsg = mugged[0].nextSibling.nextSibling;
          muggedMsg.appendChild(newMuggedButtons);
        }
      }else if (currentPage.indexOf('torn.com/blacklist.php') !== -1 || currentPage.indexOf('torn.com/friendlist.php') !== -1) {
        pw_addStyles();
        pw_RAwriteNameListFinder();
        setTimeout('pw_RAfindNameList()',3000);
      }
    }

})();

} // iframe/logged in
