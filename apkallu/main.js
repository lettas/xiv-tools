require('insert-css')(require('./style.css'))
var main = new Vue({
  el: '#main',
  components: {
    dataTable: require('./data-table'),
  }
});

