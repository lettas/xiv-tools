(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('insert-css')(require('./style.css'))
var main = new Vue({
  el: '#main',
  components: {
    scratchTicket: require('./scratch-ticket'),
    payoutTable: require('./payout-table'),
  }
});


},{"./payout-table":2,"./scratch-ticket":6,"./style.css":7,"insert-css":8}],2:[function(require,module,exports){
require('insert-css')(require('./style.css'))
module.exports = {
  template: require('./template.html'),
  replace: true,

  data: function() {
    return {
      data: require('./payouts.js')
    };
  }
}

},{"./payouts.js":3,"./style.css":4,"./template.html":5,"insert-css":8}],3:[function(require,module,exports){
module.exports = [
  { no:  6, reward: 10000 },
  { no:  7, reward:    36 },
  { no:  8, reward:   720 },
  { no:  8, reward:   360 },
  { no: 10, reward:    80 },
  { no: 11, reward:   252 },
  { no: 12, reward:   108 },
  { no: 13, reward:    72 },
  { no: 14, reward:    54 },
  { no: 15, reward:   180 },
  { no: 16, reward:    72 },
  { no: 17, reward:   180 },
  { no: 18, reward:   119 },
  { no: 19, reward:    36 },
  { no: 20, reward:   306 },
  { no: 21, reward:  1080 },
  { no: 22, reward:   144 },
  { no: 23, reward:  1800 },
  { no: 24, reward:  3600 }
];

},{}],4:[function(require,module,exports){
module.exports = '';
},{}],5:[function(require,module,exports){
module.exports = '<div id="payouts">\n  <div class="list-body">\n    <div class="list-row list-header pure-g">\n      <div class="list-entry list-entry-no pure-u-1-2">No</div>\n      <div class="list-entry list-entry-name pure-u-1-2">報酬</div>\n    </div>\n    <div class="list-row pure-g" v-repeat="entry: data">\n      <div class="list-entry list-entry-no pure-u-1-2">{{entry.no}}</div>\n      <div class="list-entry list-entry-reward pure-u-1-2">{{entry.reward}}</div>\n    </div>\n  </div>\n</div>\n\n';
},{}],6:[function(require,module,exports){

},{}],7:[function(require,module,exports){
module.exports = '#main {\n  width: 80%;\n  margin: 0 auto;\n}\n\n.description {\n  font-size: small;\n  color: #8E8E8E;\n  text-align: left;\n}\n\n#update {\n  width: 100%;\n  margin-top: 20px;\n  padding: 0;\n}\n\n#update h2 {\n  font-size: medium;\n  margin: 2px 0;\n}\n\n.history {\n  font-size: small;\n}\n\n#footer {\n  width: 100%;\n  height: 50px;\n  bottom: 0;\n}\n\n.copyright {\n  font-size: x-small;\n  color: #8E8E8E;\n  text-align: right;\n}\n';
},{}],8:[function(require,module,exports){
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
