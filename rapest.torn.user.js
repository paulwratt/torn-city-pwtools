// ==UserScript==
// @name         ReAttack Pest for Torn City
// @namespace    paulwratt.tornCity
// @version      1.01
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

   ///////////////////////////////////////////////////////////////////////////////////////////////////
   // Utilities
   ///////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a button in Torn-style
   * @param  {String} text   The text of the button
   * @return {jQuery}
   */
  function pw_htmlIconButton(text,ID) {
    var profileButton = 'profile-button-';
    var profileButtonTitle = 'RApest: ';
    var profileButtonURL = 'https://www.torn.com/';
    if (text == 'B') {
      profileButton = profileButton + 'addEnemy';
      profileButtonTitle = profileButtonTitle + 'Add to Blacklist';
      profileButtonURL = profileButtonURL + 'blacklist.php#/p=add&amp;XID='+ID;
    } else if (text == 'F') {
      profileButton = profileButton + 'addFriend';
      profileButtonTitle = profileButtonTitle + 'Add to Friendslist';
      profileButtonURL = profileButtonURL + 'friendlist.php#/p=add&amp;XID='+ID;
    }
    return '<a title="'+profileButtonTitle+'" class="profile-button '+profileButton+'  active" href="'+profileButtonURL+'"><i class="icon"></i></a>';
  }


  function pw_wrapButtons(profileID) {
    GM_addStyle((<><![CDATA[
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
.d .profile-buttons .buttons-list .profile-button .icon {
    background-image: url(/images/v2/sidebar_icons_desktop_2017.png);
    width: 24px;
    height: 24px;
    display: inline-block;
    pointer-events: none;
    cursor: pointer;
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

    var btnFriend = pw_htmlIconButton('F', profileID);
    var btnEnemy = pw_htmlIconButton('B', profileID);
    var btnList = '<div class="buttons-list">'+btnFriend+btnEnemy+'</div>';
    var btnWrapper = document.createElement('div');
    btnWrapper.className = 'profile-buttons';
    btnWrapper.innerHTML = btnList;
    return btnWrapper;
  }

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
          var newButtons = pw_wrapButtons(muggedID);
          var muggedMsg = mugged[0].nextSibling.nextSibling;
          muggedMsg.appendChild(newButtons);
        }
      }
    }

})();

} // iframe/logged in
