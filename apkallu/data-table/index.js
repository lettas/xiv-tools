require('insert-css')(require('./style.css'))
module.exports = {
  template: require('./template.html'),
  replace: true,

  compiled: function() {
  },

  methods: {
  },

  data: function() {
    return {
      visible: { zone: false, coord: false, time: false, weather: false, emote: false, comment: false },
      data: require('../data/sightseeing.js')
    };
  }
}

