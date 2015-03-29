require('insert-css')(require('./style.css'))
module.exports = {
  template: require('./template.html'),
  replace: true,

  compiled: function() {
  },

  filters: {
    numberFilter: function(rows, n) {
      return rows.filter(function(row) { return row.no <= (n - 0) });
    }
  },

  data: function() {
    return {
      visible: { zone: false, coord: false, time: false, weather: false, emote: false, comment: false },
      data: require('../data/sightseeing.js')
    };
  }
}

