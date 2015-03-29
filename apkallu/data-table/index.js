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
      mask: { zone: true, coordinate: true, time: true, weather: true, emote: true, comment: true },
      data: require('../data/sightseeing.js')
    };
  }
}

