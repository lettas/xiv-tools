require('insert-css')(require('./style.css'))
var main = new Vue({
  el: '#main',
  components: {
    cactpot: require('./cactpot-main'),
  }
});

