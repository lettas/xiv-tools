(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('insert-css')(require('./style.css'))
var main = new Vue({
  el: '#main',
  components: {
    scratchTicket: require('./scratch-ticket'),
    payloadTable: require('./payload-table'),
  }
});


},{"./payload-table":2,"./scratch-ticket":3,"./style.css":4,"insert-css":5}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){
arguments[4][2][0].apply(exports,arguments)
},{"dup":2}],4:[function(require,module,exports){
module.exports = '#main {\n  width: 820px;\n  margin: 0 auto;\n}\n\n.description {\n  font-size: small;\n  color: #8E8E8E;\n  text-align: left;\n}\n\n#update {\n  width: 100%;\n  margin-top: 20px;\n  padding: 0;\n}\n\n#update h2 {\n  font-size: medium;\n  margin: 2px 0;\n}\n\n.history {\n  font-size: small;\n}\n\n#footer {\n  width: 100%;\n  height: 50px;\n  bottom: 0;\n}\n\n.copyright {\n  font-size: x-small;\n  color: #8E8E8E;\n  text-align: right;\n}\n';
},{}],5:[function(require,module,exports){
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
