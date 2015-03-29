(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('insert-css')(require('./style.css'))
var main = new Vue({
  el: '#main',
  components: {
    header: require('./header'),
    dataTable: require('./data-table'),
  }
});


},{"./data-table":2,"./header":6,"./style.css":9,"insert-css":10}],2:[function(require,module,exports){
require('insert-css')(require('./style.css'))
module.exports = {
  template: require('./template.html'),
  replace: true,

  compiled: function() {
    var self = this;
    this.$watch('extention.shows', function(showsExtention) {
        if (showsExtention) {
          self.extention.limit = -1;
        }
        else {
          self.extention.limit = 20;
        }
    });
  },

  filters: {
    limitation: function(rows) {
      var n = this.extention.limit;
      if (n > 0) {
        return rows.filter(function(row) { return row.no <= n });
      }
      else {
        return rows;
      }
    }
  },

  data: function() {
    return {
      extention: { shows: false, limit: 20 },
      visible: { zone: false, coord: false, time: false, weather: false, emote: false, comment: false },
      data: require('../data/sightseeing.js')
    };
  }
}


},{"../data/sightseeing.js":5,"./style.css":3,"./template.html":4,"insert-css":10}],3:[function(require,module,exports){
module.exports = '#list {\n  width: 100%;\n  font-size: x-small;\n}\n\n.extention-control {\n  font-size: x-small;\n  vertical-align: middle;\n  text-align: right;\n  margin: 2px 0;\n}\n\n.extention-control > label {\n  padding-left: 2px;\n}\n\n#list .list-body {\n  width: 100%;\n  border-style: solid;\n  border-color: #8E8E8E;\n  border-width: 0 1px 1px 0;\n  overflow: hidden;\n}\n\n#list .list-header {\n  background-color: #00496E;\n  color: #FFFFFF;\n  font-weight: 500;\n}\n\n#list .list-completed {\n  background-color: #393939;\n  color: #8E8E8E;\n}\n\n#list .list-uncompleted {\n  background-color: #FFFFFF;\n  color: #1C1C1C;\n  -webkit-transition: background 0.2s ease-in-out;\n  -moz-transition: background 0.2s ease-in-out;\n  -ms-transition: background 0.2s ease-in-out;\n  -o-transition: background 0.2s ease-in-out;\n}\n\n#list .list-uncompleted:hover {\n  background-color: #FCEDAA;\n  color: #1C1C1C;\n  -webkit-transition: background 0.2s ease-in-out;\n  -moz-transition: background 0.2s ease-in-out;\n  -ms-transition: background 0.2s ease-in-out;\n  -o-transition: background 0.2s ease-in-out;\n}\n\n#list .list-row {\n  width: 100%;\n  margin: 0;\n  padding: 0;\n  text-align: left;\n  vertical-align: middle;\n  border-style: solid;\n  border-color: #8E8E8E;\n  border-width: 1px 0 0 1px;\n}\n\n#list .list-entry {\n  padding: 4px;\n}\n\n#list .list-entry > input {\n  vertical-align: middle;\n}\n\n#list .list-entry > label {\n  padding-left: 2px;\n  vertical-align: middle;\n}\n';
},{}],4:[function(require,module,exports){
module.exports = '<div id="list">\n  <div class="extention-control">\n    <input id="extention-shows" type="checkbox" v-model="extention.shows" /><label for="extention-shows">No.20以降を表示する</label>\n  </div>\n  <div class="list-body">\n    <div class="list-row list-header pure-g">\n      <div class="list-entry list-entry-no pure-u-1-24">No</div>\n      <div class="list-entry list-entry-name pure-u-4-24">タイトル</div>\n      <div class="list-entry list-entry-comment pure-u-5-24"><input id="visible-comment" type="checkbox" v-model="visible.comment" /><label for="visible-comment">コメント</label></div>\n      <div class="list-entry list-entry-zone pure-u-4-24"><input id="visible-zone" type="checkbox" v-model="visible.zone" /><label for="visible-zone">エリア</label></div>\n      <div class="list-entry list-entry-coord pure-u-2-24"><input id="visible-coord" type="checkbox" v-model="visible.coord" /><label for="visible-coord">座標</label></div>\n      <div class="list-entry list-entry-time pure-u-2-24"><input id="visible-time" type="checkbox" v-model="visible.time" /><label for="visible-time">時間帯</label></div>\n      <div class="list-entry list-entry-time pure-u-2-24"><input id="visible-weather" type="checkbox" v-model="visible.weather" /><label for="visible-weather">天候</label></div>\n      <div class="list-entry list-entry-emote pure-u-2-24"><input id="visible-emote" type="checkbox" v-model="visible.emote" /><label for="visible-emote">エモート</label></div>\n    </div>\n    <div class="list-row pure-g {{entry.isCompleted ? \'list-completed\' : \'list-uncompleted\'}}" v-repeat="entry: data | limitation">\n      <div class="list-entry list-entry-no pure-u-1-24">{{entry.no}}</div>\n      <div class="list-entry list-entry-name pure-u-4-24">{{entry.name}}</div>\n      <div class="list-entry list-entry-comment pure-u-5-24"><span v-if="!visible.comment">***</span><span v-if="visible.comment">{{entry.comment}}</span></div>\n      <div class="list-entry list-entry-zone pure-u-4-24"><span v-if="!visible.zone">***</span><span v-if="visible.zone">{{entry.zone}}</span></div>\n      <div class="list-entry list-entry-coord pure-u-2-24"><span v-if="!visible.coord">***</span><span v-if="visible.coord">X{{entry.coordX}},Y{{entry.coordY}}</span></div>\n      <div class="list-entry list-entry-time pure-u-2-24"><span v-if="!visible.time">***</span><span v-if="visible.time">{{entry.openedAt}}-{{entry.closedAt}}</span></div>\n      <div class="list-entry list-entry-time pure-u-2-24"><span v-if="!visible.weather">***</span><span v-if="visible.weather">{{entry.weather}}</span></div>\n      <div class="list-entry list-entry-emote pure-u-2-24"><span v-if="!visible.emote">***</span><span v-if="visible.emote">{{entry.emote}}</span></div>\n    </div>\n  </div>\n</div>\n';
},{}],5:[function(require,module,exports){
module.exports = [{"no":"1","weather":"晴れ","emote":"見わたす","detail":"バラクーダ埠頭","zone":"リムサ・ロミンサ：上甲板層","coordX":"09","coordY":"07","openedAt":"08:00","closedAt":"11:59","name":"ある商人が見た景色。","comment":"眼下を見やれば、そこには赤き帆の軍艦が三隻。海都「リムサ・ロミンサ」の底力を感じた。"},{"no":"2","weather":"快晴","emote":"見わたす","detail":"海賊船「アスタリシア号」","zone":"リムサ・ロミンサ：下甲板層","coordX":"07","coordY":"15","openedAt":"18:00","closedAt":"04:59","name":"ある海賊が見た景色。","comment":"酒を飲めば気分は大物。ヤバい奴らの縄張りで、大物気取りで港を一望。翌日、目が覚めたら吊されていた。"},{"no":"3","weather":"雨","emote":"祈る","detail":"シーソング石窟の慰霊碑","zone":"中央ラノシア","coordX":"20","coordY":"19","openedAt":"05:00","closedAt":"07:59","name":"ある船乗りが見た景色。","comment":"出漁前の俺だけの儀式。朝日届かぬ薄暗い洞穴で、逝った仲間に黙祷する。静かな雨音を、鎮魂歌に代えて。"},{"no":"4","weather":"晴れ","emote":"見わたす","detail":"スカイリフト","zone":"中央ラノシア","coordX":"16","coordY":"17","openedAt":"12:00","closedAt":"16:59","name":"ある荷運び人が見た景色。","comment":"辛い力仕事の合間、休憩中に見る景色が好きだ。青空に浮かぶ気球の美しさよ。"},{"no":"5","weather":"曇り","emote":"見わたす","detail":"ラザグラン街道","zone":"中央ラノシア","coordX":"25","coordY":"27","openedAt":"08:00","closedAt":"11:59","name":"ある警備兵が見た景色。","comment":"灰色の空のように気分が晴れないときは、高所に登る。先人が拓いた街道を見て、開拓の苦労に思いを馳せる。"},{"no":"6","weather":"晴れ","emote":"見わたす","detail":"ソルトストランド","zone":"低地ラノシア","coordX":"23","coordY":"40","openedAt":"18:00","closedAt":"04:59","name":"ある漁師が見た景色。","comment":"旅浪の神に見守られ、釣り糸を垂らす。眼下に見える塩の柱を目に、5年前の惨劇を思う。"},{"no":"7","weather":"霧","emote":"見わたす","detail":"レッドルースター牧場の畑","zone":"低地ラノシア","coordX":"33","coordY":"19","openedAt":"05:00","closedAt":"07:59","name":"ある農夫が見た景色。","comment":"農夫の朝は早い。門の上に立ち、朝霧に濡れた畑を見て、地味な野良仕事に備えて心を奮い立たせるのが日課だ。"},{"no":"8","weather":"晴れ","emote":"見わたす","detail":"ブルワーズ灯台","zone":"西ラノシア","coordX":"29","coordY":"30","openedAt":"05:00","closedAt":"07:59","name":"ある灯台守が見た景色。","comment":"青い空、青い海。船を導いていた灯台の灯りを消したあと、エールをひっかけながら見る海の眺めは最高だ。"},{"no":"9","weather":"曇り","emote":"見わたす","detail":"革細工師ギルド","zone":"グリダニア：旧市街","coordX":"12","coordY":"08","openedAt":"12:00","closedAt":"16:59","name":"ある革細工師が見た景色。","comment":"子供だった頃、よく工房内を一望できる場所に立って、職人たちが働く姿を眺めたものだ。空が陰り、肌寒い日は特にな。"},{"no":"10","weather":"快晴","emote":"見わたす","detail":"アプカル滝","zone":"グリダニア：旧市街","coordX":"10","coordY":"06","openedAt":"18:00","closedAt":"04:59","name":"ある少年が見た景色。","comment":"ざーざー流れる滝が、お気に入りの場所。寝たふりをして家を抜けだして、秘密の道を通って、大人が来れない高いところに行くんだ。"},{"no":"11","weather":"晴れ","emote":"座る","detail":"ベントブランチ牧場","zone":"黒衣森：中央森林","coordX":"21","coordY":"21","openedAt":"12:00","closedAt":"16:59","name":"ある牧童が見た景色。","comment":"お天道様の日射しをうけて、気球のモーグリも気持ちよさそう。そんな日は、ついつい腰を下ろして休みたくなるね。"},{"no":"12","weather":"晴れ","emote":"祈る","detail":"十二神大聖堂","zone":"黒衣森：東部森林","coordX":"17","coordY":"18","openedAt":"08:00","closedAt":"11:59","name":"ある園芸師が見た景色。","comment":"陽光を受けると泉の水が輝いて、庭園は荘厳な空気に満ちる。そんな光景を見れば、不信心なヤツだって、祈りを捧げたくなるだろう。"},{"no":"13","weather":"快晴","emote":"見わたす","detail":"シルフの仮宿","zone":"黒衣森：東部森林","coordX":"22","coordY":"26","openedAt":"18:00","closedAt":"04:59","name":"ある博物学者が見た景色。","comment":"空を飛ぶシルフ族のキモチを、少しでも良く知りたいと、よじ登った屋根の上。闇夜にぼんやり浮かぶ街灯の美しさが忘れられない。"},{"no":"14","weather":"晴れ","emote":"敬礼する","detail":"ロイヤルプロムナード","zone":"ウルダハ","coordX":"11","coordY":"11","openedAt":"05:00","closedAt":"07:59","name":"ある近衛騎士が見た景色。","comment":"長い夜警を終え、三騎士を示す3枚の銀盤の上に立つ。交代の同僚に敬礼を交わし、吹き抜けから見える青空を見つつ、眠るために宿舎に戻るのだ。"},{"no":"15","weather":"曇り","emote":"見わたす","detail":"ゴールドコート","zone":"ウルダハ","coordX":"11","coordY":"11","openedAt":"12:00","closedAt":"16:59","name":"ある軽業師が見た景色。","comment":"ケチな市民から投げ銭を得るには、雲を吹き飛ばすような芸が必須。吹き抜けの庭を跳び、東の街灯に華麗に飛び乗り、道行く奴らを見渡してやろう。"},{"no":"16","weather":"晴れ(快晴も可)","emote":"見わたす","detail":"交易都市「ウルダハ」","zone":"西ザナラーン","coordX":"22","coordY":"22","openedAt":"18:00","closedAt":"04:59","name":"ある冒険者が見た景色。","comment":"ノフィカの井戸の足場の上から、砂都を見渡してみろ。そうすりゃ、星空にも勝るほど、まばゆく輝く「荒野の宝石」が見えるだろう。"},{"no":"17","weather":"霧","emote":"見わたす","detail":"シラディハ遺跡","zone":"中央ザナラーン","coordX":"15","coordY":"22","openedAt":"08:00","closedAt":"11:59","name":"ある冒険者が見た景色。","comment":"想定外の霧で道に迷い、脚を滑らせ崖をずり落ちたとき、眼前に現れたのは亡国の残滓。いささか肝を冷やしたよ。"},{"no":"18","weather":"雨(暴雨も可)","emote":"なぐさめる","detail":"グゥーブーの骸","zone":"東ザナラーン","coordX":"19","coordY":"24","openedAt":"17:00","closedAt":"17:59","name":"ある園芸師が見た景色。","comment":"渇きし大地に降り注ぐ慈雨は、美しき花々を咲き誇らせていた。まるで、座した骸を慰めるかのように。"},{"no":"19","weather":"曇り","emote":"見わたす","detail":"見えざる都","zone":"東ザナラーン","coordX":"14","coordY":"18","openedAt":"08:00","closedAt":"11:59","name":"ある冒険者が見た景色。","comment":"討伐任務を終え、崩れ去った建物の上に立ち、ふと見上げると、そこには垂れ込める雲の下、岩から顔を出す遺跡が見えた。"},{"no":"20","weather":"晴れ","emote":"祈る","detail":"ハイブリッジ","zone":"東ザナラーン","coordX":"21","coordY":"20","openedAt":"05:00","closedAt":"07:59","name":"ある商人が見た景色。","comment":"砂都から森都へ向かう道中、石橋で一泊。翌日、朝日を受けた古の王たちは、実に荘厳であった。"},{"no":"21","weather":"晴れ","emote":"見わたす","detail":"ささやきの谷","zone":"中央ラノシア","coordX":"20","coordY":"13","openedAt":"12:00","closedAt":"16:59","name":"ある農夫から聞いた噂。","comment":"取っておきの酒盛り場。常に水しぶきが舞い、太陽が照っても涼しいらしい。"},{"no":"22","weather":"快晴","emote":"見わたす","detail":"サマーフォード庄","zone":"中央ラノシア","coordX":"25","coordY":"17","openedAt":"5:00","closedAt":"7:59","name":"酒場で耳にした噂話。","comment":"元海賊は酒が入れば喧嘩を始める。ランプの上に登って高みの見物を決め込むのがいい。"},{"no":"23","weather":"雨","emote":"見わたす","detail":"グレイフリート風車群","zone":"低地ラノシア","coordX":"31","coordY":"12","openedAt":"12:00","closedAt":"16:59","name":"ある商人から聞いた噂。","comment":"雨宿りのために駆け込んだ建物に、蛮族がやって来た。慌てて屋根の上に登って、逃げ道を探したらしい。"},{"no":"24","weather":"快晴","emote":"座る","detail":"隠れ滝","zone":"東ラノシア","coordX":"32","coordY":"23","openedAt":"8:00","closedAt":"11:59","name":"ある女性から聞いた噂。","comment":"椅子に腰を下ろした客から注がれる視線は、照りつける太陽よりも熱いとのこと。"},{"no":"25","weather":"雨","emote":"見わたす","detail":"白鴎塔","zone":"東ラノシア","coordX":"29","coordY":"33","openedAt":"18:00","closedAt":"4:59","name":"ある傭兵から聞いた噂。","comment":"雨天時は見通しが悪くなる。だから、海からの脅威を警戒するには、高所から見張るのが一番だ。"},{"no":"26","weather":"快晴","emote":"祈る","detail":"エールポートのリムレーン像","zone":"西ラノシア","coordX":"26","coordY":"26","openedAt":"17:00","closedAt":"17:59","name":"ある醸造職人から聞いた噂。","comment":"酒樽を積んだ船は、悠然と出港する。見送る人々は、美しき女神に祈りを捧げていた。"},{"no":"27","weather":"暴風","emote":"見わたす","detail":"船の墓場","zone":"西ラノシア","coordX":"17","coordY":"36","openedAt":"18:00","closedAt":"4:59","name":"ある灯台守から聞いた噂。","comment":"散乱する漂流物、忍び寄る恐ろしき気配。あんなところは、夜に行くべきではない。"},{"no":"28","weather":"晴れ","emote":"見わたす","detail":"キャンプ・スカルバレー","zone":"西ラノシア","coordX":"22","coordY":"22","openedAt":"8:00","closedAt":"11:59","name":"酒場で耳にした噂話。","comment":"防衛拠点は、敵を警戒するため見晴らしがいいらしい。だが、入り込む勇気はない。"},{"no":"29","weather":"快晴","emote":"見わたす","detail":"南北防波壁","zone":"西ラノシア","coordX":"19","coordY":"23","openedAt":"12:00","closedAt":"16:59","name":"酒場で耳にした噂話。","comment":"大事な備品を無くしたとき、天幕によじ登って探した。意外と潰れないものだ。"},{"no":"30","weather":"晴れ","emote":"見わたす","detail":"キャンプ・ブロンズレイク","zone":"高地ラノシア","coordX":"30","coordY":"22","openedAt":"17:00","closedAt":"17:59","name":"酒場で耳にした噂話。","comment":"湯あたりしたら、風に当たって涼むといい。そこから見える景色も風情があって最高だ。"},{"no":"31","weather":"快晴","emote":"見わたす","detail":"サラオスの亡骸","zone":"高地ラノシア","coordX":"13","coordY":"21","openedAt":"12:00","closedAt":"16:59","name":"ある博物学者から聞いた噂。","comment":"勇壮なる大いなる存在に思いを馳せるには、そのよく晴れた日に先端に登るべし。"},{"no":"32","weather":"雷雨","emote":"見わたす","detail":"ジジルン交易商店","zone":"高地ラノシア","coordX":"29","coordY":"25","openedAt":"18:00","closedAt":"4:59","name":"酒場で耳にした噂話。","comment":"魔貝に追われて、よじ登って一夜を明かした。降りるときは、かなり勇気がいった。"},{"no":"33","weather":"晴れ","emote":"見わたす","detail":"ニーム浮遊遺跡","zone":"外地ラノシア","coordX":"12","coordY":"15","openedAt":"18:00","closedAt":"4:59","name":"ある冒険者から聞いた噂。","comment":"空に浮かぶ遺跡は忘れがたいほど神秘的。輝くクリスタルの光は、地上に光る星のよう。"},{"no":"34","weather":"曇り","emote":"見わたす","detail":"キャンプ・オーバールック","zone":"外地ラノシア","coordX":"17","coordY":"16","openedAt":"5:00","closedAt":"7:59","name":"酒場で耳にした噂話。","comment":"輸送路を脅かす存在を警戒するには、壁の上の茂みに隠れて見張るといい。"},{"no":"35","weather":"快晴","emote":"見わたす","detail":"ウ・ガマロ武装鉱山","zone":"外地ラノシア","coordX":"23","coordY":"11","openedAt":"12:00","closedAt":"16:59","name":"ある兵士から聞いた噂。","comment":"白昼堂々と行われた敵拠点への強襲作戦。溶鉱炉に登って、敵兵をコケにしたらしい。"},{"no":"36","weather":"雨","emote":"座る","detail":"隠者の庵","zone":"外地ラノシア","coordX":"15","coordY":"10","openedAt":"18:00","closedAt":"4:59","name":"ある冒険者から聞いた噂。","comment":"人嫌いの変わり者は、終始不在。勝手に座り込んで、休んでもバレはしない。"},{"no":"37","weather":"晴れ","emote":"見わたす","detail":"カーラインカフェと大水車","zone":"グリダニア新市街","coordX":"14","coordY":"14","openedAt":"8:00","closedAt":"11:59","name":"酒場で耳にした噂話。","comment":"去りゆく者を見送りながら、勇壮な水車が回る姿を見るのはオツなものだ。"},{"no":"38","weather":"雨","emote":"見わたす","detail":"槍術士ギルド","zone":"グリダニア旧市街","coordX":"14","coordY":"05","openedAt":"5:00","closedAt":"7:59","name":"ある衛士から聞いた噂。","comment":"技を盗めと言われたため、特等席で見物しようとしたが、馬鹿げたことは止めろと怒鳴られた。"},{"no":"39","weather":"雨","emote":"見わたす","detail":"バノック練兵所","zone":"中央森林","coordX":"23","coordY":"19","openedAt":"5:00","closedAt":"7:59","name":"ある衛士から聞いた噂。","comment":"姿を消した部下を見つけるのは簡単。切り株よりも上から見下ろせばいいだけだから。"},{"no":"40","weather":"快晴","emote":"見わたす","detail":"ハウケタ御用邸","zone":"中央森林","coordX":"13","coordY":"23","openedAt":"18:00","closedAt":"4:59","name":"ある冒険者から聞いた噂。","comment":"妖異に追われ、気付いた時には大樹の根の上にいたらしい。振り返ると、窓からは不気味な光が漏れていた。"},{"no":"41","weather":"晴れ","emote":"見わたす","detail":"長老の木","zone":"中央森林","coordX":"16","coordY":"22","openedAt":"12:00","closedAt":"16:59","name":"ある幻術士から聞いた噂。","comment":"天気の良い日には、精霊の声に耳を傾けるため森に向かう。大いなる古木を見下ろす場所に。"},{"no":"42","weather":"快晴","emote":"見わたす","detail":"虹架けの滝","zone":"中央森林","coordX":"26","coordY":"18","openedAt":"11:00から3時間程度","closedAt":"11:00から3時間程度","name":"ある幻術士から聞いた噂。","comment":"水と光が織りなす幻想的な橋は、人と森の精霊を繋ぐ融和の証と考えられている。"},{"no":"43","weather":"雷","emote":"見わたす","detail":"ゆりかごの大樹","zone":"東部森林","coordX":"21","coordY":"10","openedAt":"18:00","closedAt":"4:59","name":"ある博物学者が見た景色。","comment":"種族違えども、産まれ行く命を守らんとする意志は同じ。その光に未来を見た。"},{"no":"44","weather":"雷雨","emote":"見わたす","detail":"酒房「バスカロンドラザーズ」","zone":"南部森林","coordX":"17","coordY":"20","openedAt":"8:00","closedAt":"11:59","name":"ある酔客から聞いた噂。","comment":"深酒をした翌日、豪雨にさらされた場所で目覚めた。どうやってたどり着いたのかは覚えていない。"},{"no":"45","weather":"快晴","emote":"見わたす","detail":"サウスシュラウド・ランディング","zone":"南部森林","coordX":"14","coordY":"33","openedAt":"8:00","closedAt":"11:59","name":"酒場で耳にした噂話。","comment":"施設を放棄した連中は、まさかあんな使われ方をされるとは思わなかっただろう。"},{"no":"46","weather":"霧","emote":"見わたす","detail":"ウルズの恵み","zone":"南部森林","coordX":"33","coordY":"23","openedAt":"12:00","closedAt":"16:59","name":"ある幻術士から聞いた噂。","comment":"淡い光に包まれた聖なる森の一角。霧に包まれると、さらに神秘的な雰囲気となる。"},{"no":"47","weather":"晴れ","emote":"見わたす","detail":"クォーリーミル","zone":"南部森林","coordX":"25","coordY":"21","openedAt":"5:00","closedAt":"7:59","name":"ある猟師から聞いた噂。","comment":"地元こそが最高の景色。煤を除去しているときに見る、集落は心暖まるものがある。"},{"no":"48","weather":"晴れ","emote":"見わたす","detail":"イクサル軍伐採所","zone":"北部森林","coordX":"18","coordY":"19","openedAt":"12:00","closedAt":"16:59","name":"ある哨兵から聞いた噂。","comment":"切り出され、打ち込まれた木の上に立ち、怒りに震える。森の現状を現す光景らしい。"},{"no":"49","weather":"快晴","emote":"見わたす","detail":"メテオの陰地","zone":"北部森林","coordX":"15","coordY":"32","openedAt":"18:00","closedAt":"4:59","name":"ある衛士から聞いた噂。","comment":"天を突く三日月型の異物。その異質な存在感には、ただただ圧倒されるばかりだ。"},{"no":"50","weather":"曇り","emote":"見渡す","detail":"アルダースプリングス","zone":"北部森林","coordX":"15","coordY":"27","openedAt":"8:00","closedAt":"11:59","name":"ある山師から聞いた噂。","comment":"心臓が強いと自負するなら、限界まで先へ進むといい。突き出した根の先っぽまで。"},{"no":"51","weather":"快晴","emote":"見わたす","detail":"カステッルム・マリヌム","zone":"西ザナラーン","coordX":"08","coordY":"05","openedAt":"17:00","closedAt":"17:59","name":"ある兵士から聞いた噂。","comment":"強行偵察中、高所から望む敵補給基地は、沈みゆく陽光に照らされて不気味に光っていた。"},{"no":"52","weather":"晴れ","emote":"指差し","detail":"ベスパーベイのロロリト像","zone":"西ザナラーン","coordX":"12","coordY":"14","openedAt":"12:00","closedAt":"16:59","name":"酒場で耳にした噂話。","comment":"金持ちの家の上で、大金持ちのまねごとを。これで金運が増せばいいのだが。"},{"no":"53","weather":"砂塵","emote":"見わたす","detail":"ブラックブラッシュ停留所","zone":"中央ザナラーン","coordX":"21","coordY":"17","openedAt":"18:00","closedAt":"4:59","name":"ある鉄道員から聞いた噂。","comment":"設備の保守点検は辛い。夜半までかかり、高所から施設を点検することもある。"},{"no":"54","weather":"快晴","emote":"座る","detail":"ナル大門","zone":"中央ザナラーン","coordX":"18","coordY":"26","openedAt":"12:00","closedAt":"16:59","name":"酒場で耳にした噂話。","comment":"仕事も酒も飲む金もないときは、ぼーっとするしかない。布の上で、荒野を眺めながら。"},{"no":"55","weather":"快晴","emote":"見わたす","detail":"バーニングウォール","zone":"東ザナラーン","coordX":"30","coordY":"26","openedAt":"12:00","closedAt":"16:59","name":"酒場で耳にした噂話。","comment":"絶景を見たと自慢したいなら、クリスタルの上から辺りを一望するといいだろう。"},{"no":"56","weather":"晴れ","emote":"見わたす","detail":"ゴールドバザー","zone":"東ザナラーン","coordX":"10","coordY":"16","openedAt":"8:00","closedAt":"11:59","name":"ある採掘師から聞いた噂。","comment":"寂れた場所で狙うのは一攫千金。柵の上に登り、日が高いうちに試掘場所を探すらしい。"},{"no":"57","weather":"暴雨","emote":"祈る","detail":"ザルの祠","zone":"東ザナラーン","coordX":"25","coordY":"14","openedAt":"18:00","closedAt":"4:59","name":"ある聖職者から聞いた噂。","comment":"来世の利益を得たいなら、静かに祈るといい。豪雨のような懺悔の涙が、魂を救うとのこと。"},{"no":"58","weather":"霧","emote":"祈る","detail":"ナルの祠","zone":"南ザナラーン","coordX":"12","coordY":"22","openedAt":"5:00","closedAt":"7:59","name":"ある聖職者から聞いた噂。","comment":"現世の利益を得たいなら、盛大に祈るといい。霧中に彷徨う魂は、喜捨によって救われるそうだ。"},{"no":"59","weather":"晴れ","emote":"見わたす","detail":"ザハラク戦陣","zone":"南ザナラーン","coordX":"19","coordY":"20","openedAt":"5:00","closedAt":"7:59","name":"ある兵士から聞いた噂。","comment":"荒野の風は岩をも削る。風化した柱状の岩の上で、ひたすらに敵陣を監視するらしい。"},{"no":"60","weather":"灼熱波","emote":"見わたす","detail":"ビエルゴズ･ストライク","zone":"南ザナラーン","coordX":"21","coordY":"38","openedAt":"12:00","closedAt":"16:59","name":"ある採掘師から聞いた噂。","comment":"強烈な日射しと廃熱にやられヘタばりそうだが、古代アラグの遺跡は宝の山だ。"},{"no":"61","weather":"晴れ","emote":"見わたす","detail":"カルン埋没寺院","zone":"南ザナラーン","coordX":"23","coordY":"11","openedAt":"12:00","closedAt":"16:59","name":"酒場で耳にした噂話。","comment":"当時の構造を調べるには、傾いた遺構の上に登って確認するのが手っ取り早い。"},{"no":"62","weather":"灼熱波","emote":"活を入れる","detail":"ミノタウロスマルム","zone":"南ザナラーン","coordX":"14","coordY":"26","openedAt":"5:00","closedAt":"7:59","name":"ある兵士から聞いた噂。","comment":"熱波如きで訓練を休むのは愚か者。真の漢は、気合で乗り越え、肉体を鍛え続ける。その姿こそ絶景。"},{"no":"63","weather":"快晴","emote":"敬礼","detail":"東方監視塔","zone":"北ザナラーン","coordX":"22","coordY":"25","openedAt":"5:00","closedAt":"7:59","name":"ある兵士から聞いた噂。","comment":"見張りの敵は己の眠気。眠くなったらどうするか。旗先に立ってビシッと敬礼、この度胸試しで眠気を覚ます。"},{"no":"64","weather":"晴れ","emote":"見わたす","detail":"青燐水パイプライン","zone":"北ザナラーン","coordX":"20","coordY":"29","openedAt":"18:00","closedAt":"4:59","name":"ある兵士から聞いた噂。","comment":"落とし格子の整備には時間がかかる。晴れていれば眺めはいいが、落っこちたら一大事だ。"},{"no":"65","weather":"晴れ","emote":"見わたす","detail":"ブルーフォグ","zone":"北ザナラーン","coordX":"20","coordY":"22","openedAt":"12:00","closedAt":"16:59","name":"ある作業員から聞いた噂。","comment":"青い霧は、未だに慣れない。霧が晴れたら作業をサボって、高所から渓谷を一望する方が好きだ。"},{"no":"66","weather":"曇り","emote":"見わたす","detail":"ラウバーン緩衝地","zone":"北ザナラーン","coordX":"19","coordY":"17","openedAt":"8:00","closedAt":"11:59","name":"ある兵士から聞いた噂。","comment":"厚い雲が覆っていても、ダラガブの爪はよく目立つ。哨戒任務でよく訪れる場所らしい。"},{"no":"67","weather":"霧","emote":"見わたす","detail":"アマジナ霊銀山跡","zone":"北ザナラーン","coordX":"26","coordY":"22","openedAt":"18:00","closedAt":"4:59","name":"ある冒険者から聞いた噂。","comment":"不気味な連中に捕まりかけたことがある。霧に紛れ逃げ出して、崩れた柱を伝って脱出したらしい。"},{"no":"68","weather":"快晴","emote":"見わたす","detail":"剣ヶ峰","zone":"クルザス","coordX":"25","coordY":"29","openedAt":"17:00","closedAt":"17:59","name":"ある技師から聞いた噂。","comment":"整備作業は、日暮れまでに終える必要がある。周辺の景色など、見ているヒマはない。"},{"no":"69","weather":"霧","emote":"見わたす","detail":"アドネール占星台","zone":"クルザス","coordX":"25","coordY":"29","openedAt":"18:00","closedAt":"4:59","name":"酒場で耳にした噂話。","comment":"滑って落ちて、ひっかかった。九死一生とは、まさにこの事を言うのだろう。"},{"no":"70","weather":"吹雪","emote":"見わたす","detail":"ドラゴン族の骸","zone":"クルザス","coordX":"11","coordY":"15","openedAt":"8:00","closedAt":"11:59","name":"ある騎兵から聞いた噂。","comment":"その骸を見ると、どんなに寒い日でも、バリスタがドラゴンを貫いた瞬間を思い出し、熱くなる。"},{"no":"71","weather":"晴れ","emote":"見わたす","detail":"皇都「イシュガルド」","zone":"クルザス","coordX":"12","coordY":"17","openedAt":"5:00","closedAt":"7:59","name":"ある騎兵から聞いた噂。","comment":"蒼天に浮かぶ故郷を見て、決意を新たにする。厳しさを増す戦いに備えるために。"},{"no":"72","weather":"快晴","emote":"見わたす","detail":"巨石の丘","zone":"クルザス","coordX":"07","coordY":"28","openedAt":"17:00","closedAt":"17:59","name":"ある騎兵から聞いた噂。","comment":"近づけば見上げるほどの巨石も、そこに行けば、全体像を見下ろすことができるらしい。"},{"no":"73","weather":"吹雪","emote":"見わたす","detail":"ハルオーネの秘石","zone":"クルザス","coordX":"07","coordY":"31","openedAt":"18:00","closedAt":"4:59","name":"ある騎兵から聞いた噂。","comment":"聖なる石の前に立つと、天よりの視線を感じる。きっと、身が引き締まる思いをするだろう。"},{"no":"74","weather":"晴れ","emote":"見わたす","detail":"スノークローク大氷壁","zone":"クルザス","coordX":"02","coordY":"21","openedAt":"8:00","closedAt":"11:59","name":"ある調査員から聞いた噂。","comment":"西の端で思うのは、西方に残された人々のことばかり。陽光でも凍った涙は溶けはしない。"},{"no":"75","weather":"晴れ","emote":"見わたす","detail":"キャンプ・ドラゴンヘッド","zone":"クルザス","coordX":"26","coordY":"17","openedAt":"12:00","closedAt":"16:59","name":"ある騎兵から聞いた噂。","comment":"雪降ろしは重労働だが、見晴らしだけは抜群だ。屋根を白から緑に変える日々が続く。"},{"no":"76","weather":"快晴","emote":"見わたす","detail":"スチールヴィジル","zone":"クルザス","coordX":"28","coordY":"10","openedAt":"5:00","closedAt":"7:59","name":"酒場で耳にした噂話。","comment":"スチールヴィジルの状況が知りたいなら、足下に気をつけながら様子を覗うべきだ。"},{"no":"77","weather":"妖霧","emote":"見わたす","detail":"カストルム・セントリ","zone":"モードゥナ","coordX":"09","coordY":"13","openedAt":"12:00","closedAt":"16:59","name":"ある脱走兵から聞いた噂。","comment":"基地の内側には、発着場がある。物資が運び出されるのを見送る日々だった。"},{"no":"78","weather":"晴れ","emote":"見わたす","detail":"クリスタルタワー","zone":"モードゥナ","coordX":"27","coordY":"08","openedAt":"18:00","closedAt":"4:59","name":"ある冒険者から聞いた噂。","comment":"木々までもがクリスタルと化した地から、天を突くクリスタルの柱が見えるらしい。"},{"no":"79","weather":"快晴","emote":"見わたす","detail":"早霜峠","zone":"モードゥナ","coordX":"18","coordY":"17","openedAt":"12:00","closedAt":"16:59","name":"ある冒険者から聞いた噂。","comment":"大規模な結晶化現象がもたらしたのは、一面の青。クリスタルの上より一望できる。"},{"no":"80","weather":"晴れ","emote":"座る","detail":"黙約の塔","zone":"モードゥナ","coordX":"26","coordY":"11","openedAt":"17:00","closedAt":"17:59","name":"酒場で耳にした噂話。","comment":"「アグリウス」は一見の価値があるが湖畔は危険。じっくり眺めたいなら、木登りを勧める。"}]

},{}],6:[function(require,module,exports){
require('insert-css')(require('./style.css'))
module.exports = {
  template: require('./template.html'),
  replace: true,
}



},{"./style.css":7,"./template.html":8,"insert-css":10}],7:[function(require,module,exports){
module.exports = '';
},{}],8:[function(require,module,exports){
module.exports = '<section id="header">\n  <h1>探検手帳(ネタバレ防止機能付き)</h1>\n</section>\n';
},{}],9:[function(require,module,exports){
module.exports = '#main {\n  width: 820px;\n  margin: 0 auto;\n}\n';
},{}],10:[function(require,module,exports){
var inserted = {};

module.exports = function (css, options) {
    if (inserted[css]) return;
    inserted[css] = true;
    
    var elem = document.createElement('style');
    elem.setAttribute('type', 'text/css');

    if ('textContent' in elem) {
      elem.textContent = css;
    } else {
      elem.styleSheet.cssText = css;
    }
    
    var head = document.getElementsByTagName('head')[0];
    if (options && options.prepend) {
        head.insertBefore(elem, head.childNodes[0]);
    } else {
        head.appendChild(elem);
    }
};

},{}]},{},[1]);
