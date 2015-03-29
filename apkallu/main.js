require('insert-css')(require('./style.css'))
var main = new Vue({
  el: '#main',
  components: {
    header: require('./header'),
    dataTable: require('./data-table'),
    footer: require('./footer'),
  }
});

