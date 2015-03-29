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

