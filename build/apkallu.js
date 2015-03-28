(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var main = new Vue({
  el: '#main',
  components: {
    dataTable: require('./data-table'),
  }
});


},{"./data-table":2}],2:[function(require,module,exports){
module.exports = {
  template: require('./template.html'),
  replace: true,

  compiled: function() {
    var self = this;
    this.columns.forEach(function(key) {
      self.reversed.$add(key, false);
    });
  },

  methods: {
    sortBy: function(key) {
      this.sortKey = key;
      this.reversed[key] = !this.reversed[key];
    }
  },

  data: function() {
    return {
      reversed: {},
      columns: ['no', 'name', 'zone', 'time', 'weather', 'emote', 'comment'],
      columnName: {
        no: 'No', name: 'タイトル', zone: '場所', time: '時間帯', weather: '天候', emote: 'エモート', comment: '備考'
      },
      data: require('../data/sightseeing.js')
    };
  }
}


},{"../data/sightseeing.js":4,"./template.html":3}],3:[function(require,module,exports){
module.exports = '<table>\n  <thead>\n    <tr>\n      <th v-repeat="key: columns" v-on="click: sortBy(key)" v-class="active: sortKey == key">\n        {{columnName[key]}}\n        <span class="arrow" v-class="reversed[key] ? \'dsc\' : \'asc\'">\n      </th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr v-repeat="entry: data | orderBy sortKey reversed[sortKey]">\n      <td>{{entry.no}}</td>\n      <td>{{entry.name}}</td>\n      <td>{{entry.zone}}({{entry.coordX}},{{entry.coordY}})</td>\n      <td>{{entry.openedAt}}-{{entry.closedAt}}</td>\n      <td>{{entry.weather}}</td>\n      <td>{{entry.emote}}</td>\n      <td>{{entry.comment}}</td>\n    </tr>\n  </tbody>\n</table>\n';
},{}],4:[function(require,module,exports){
module.exports = [
  {no: 1, name: 'ある商人が見た景色', zone: 'リムサ・ロミンサ：上甲板層', coordX: 9, coordY: 7, openedAt: '08:00', closedAt: '12:00', weather: '晴れ', emote: '見渡す', comment: ''},
  {no: 2, name: 'ある海賊が見た景色', zone: 'リムサ・ロミンサ：下甲板層', coordX: 7, coordY: 15, openedAt: '18:00', closedAt: '05:00', weather: '快晴', emote: '見渡す', comment: ''}
]

},{}]},{},[1]);
