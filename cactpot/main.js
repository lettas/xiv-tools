require('insert-css')(require('./style.css'))
var main = new Vue({
  el: '#main',
  components: {
    scratchTicket: require('./scratch-ticket'),
    payoutTable: require('./payout-table'),
  }
});

