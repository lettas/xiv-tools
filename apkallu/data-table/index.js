require('insert-css')(require('./style.css'))
module.exports = {
  template: require('./template.html'),
  replace: true,

  compiled: function() {
    var self = this;
    var SAVE_KEY = 'apkallu.userdata';

    (function initialize(){
        self.data.forEach(function(row) {
            self.userdata.completed.$add(row.no, false);
        });
    })();

    (function loadUserdata() {
      var savedata = JSON.parse(localStorage.getItem(SAVE_KEY));
      var userdata = self.userdata;
      mergeObjects(userdata, savedata);
      self.userdata = userdata;

      function mergeObjects(o1, o2) {
        for(var key in o2) {
          o1[key] = o2[key];
        }
      }
    })();

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
        localStorage.setItem(SAVE_KEY, savedata);
    }, true);
  },

  methods: {
    toggleCompleted: function(row) {
      var origin = this.userdata.completed[row.no];
      this.userdata.completed[row.no] = !origin;
    }
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
        completed: {},
      },
      data: require('../data/sightseeing.js')
    };
  }
}

