(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
Vue.component('data-grid', {
  template: '#data-grid-template',
  replace: true,

  data: function() {
    return {
      columns: null,
      columnName: null,
      sortKey: '',
      reversed: {}
    };
  },

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
});

var main = new Vue({
  el: '#main',
  data: {
    gridColumns: ['no', 'name', 'zone', 'time', 'weather', 'emote', 'comment'],
    gridColumnName: {
      no: 'No', name: 'タイトル', zone: '場所', time: '時間帯', weather: '天候', emote: 'エモート', comment: '備考'
    },
    gridData: [
      {no: 1, name: 'ある商人が見た景色', zone: 'リムサ・ロミンサ：上甲板層', coordX: 9, coordY: 7, openedAt: '08:00', closedAt: '12:00', weather: '晴れ', emote: '見渡す', comment: ''},
      {no: 2, name: 'ある海賊が見た景色', zone: 'リムサ・ロミンサ：下甲板層', coordX: 7, coordY: 15, openedAt: '18:00', closedAt: '05:00', weather: '快晴', emote: '見渡す', comment: ''},
    ]
  }
});

},{}]},{},[1]);
