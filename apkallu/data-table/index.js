require('insert-css')(require('./style.css'))
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

