require('insert-css')(require('./style.css'))
module.exports = {
  _savekey: 'apkallu.userdata',
  template: require('./template.html'),
  replace: true,

  compiled: function() {
    var self = this;

    function loadUserdata() {
      var savedata = JSON.parse(localStorage.getItem(self._savekey));
      var userdata = self.userdata;
      mergeObjects(userdata, savedata);
      self.userdata = userdata;
    }

    function mergeObjects(o1, o2) {
      for(var key in o2) {
        o1[key] = o2[key];
      }
    }

    loadUserdata();

    this.$watch('userdata.extention.shows', function(showsExtention) {
        if (showsExtention) {
          self.userdata.extention.limit = -1;
        }
        else {
          self.userdata.extention.limit = 20;
        }
    });

    this.$watch('userdata', function(userdata) {
        var savedata = JSON.stringify(userdata);
        localStorage.setItem(self._savekey, savedata);
    }, true);
  },

  filters: {
    limitation: function(rows) {
      var n = this.userdata.extention.limit;
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
      userdata: {
        extention: { shows: false, limit: 20 },
        visible: { zone: false, coord: false, time: false, weather: false, emote: false, comment: false },
      },
      data: require('../data/sightseeing.js')
    };
  }
}

