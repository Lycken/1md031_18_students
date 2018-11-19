'use strict';
var socket = io();

var vm = new Vue({
  el: '#myID',
  data: {
    arbitraryVariableName: 'Välj en burgare',
    burgers: food,
    response: '',
    orders: {},
    orderLocation: {},
    checked: [],
    gender: [],
    email: [],
    fullname: []

  },
  created: function () {
    socket.on('initialize', function (data) {
      this.orders = data.orders;
    }.bind(this));

    socket.on('currentQueue', function (data) {
      this.orders = data.orders;
    }.bind(this));
  },
  methods: {
    markDone: function() {
      this.response = 'HURRAH'
    },

    orderDone: function() {
      this.response = 'Button Clicked'
    },

    //ska location komma härifrån?
    getNext: function () {
      var lastOrder = Object.keys(this.orders).reduce( function (last, next) {
        return Math.max(last, next);
      }, 0);
      return lastOrder + 1;
    },
    addOrder: function (event) {
      socket.emit("addOrder", {orderId: this.getNext(),
        details: this.orderLocation,
          orderItems: [this.checked],
          customerInfo: [this.gender]
        });
      },

      displayOrder: function (event) {
        console.log(this.checked);
        console.log(this.gender);
        this.orderLocation = { x: event.clientX-10 - event.currentTarget.getBoundingClientRect().left,
          y: event.clientY-10 - event.currentTarget.getBoundingClientRect().top};
      }
    }
  });
