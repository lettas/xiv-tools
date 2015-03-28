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
    gridData: require('./data/sightseeing.js')
  }
});

sightseeing = require('./data/sightseeing.js');

