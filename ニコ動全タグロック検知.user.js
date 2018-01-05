// ==UserScript==
// @name ニコ動全タグロック検知(改良版)
// @version 1.0.0.1.a
// @description ニコニコ動画で動画の再生ページを開く際、全てのタグがロックされている場合に確認ダイアログが表示され、閲覧をキャンセルできます。これにより、全てのタグがロックされていることが多い釣り動画の判別の助けになります。(armedpatriot.blog.fc2.com様の改良版です。)
// @run-at document-start
// @match http://www.nicovideo.jp/watch/sm*
// @grant GM_xmlhttpRequest
// @connect ext.nicovideo.jp
// ==/UserScript==

(function() {
    'use strict';
    GM_xmlhttpRequest({
        method: "GET",
        url: "http://ext.nicovideo.jp/api/getthumbinfo/"+location.pathname.split('/')[2],
        onload: function(res) {
            if((res.responseText.match(new RegExp('tag lock="1"', "g")) || []).length>9){
                if(window.confirm("この動画は全てのタグがロックされています。\n\n釣り動画の可能性がありますが、閲覧を続行しますか？\n(キャンセルを押すと自動的に前のページにリダイレクトします。)")===false){
                    window.history.back(-1);
                }
            }
        }
    });
})();