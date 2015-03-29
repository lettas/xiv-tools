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
      data: require('../data/sightseeing.js')
    };
  }
}

