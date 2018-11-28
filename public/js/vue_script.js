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
    custInfo: {
      name: "",
      email: "",
      gender: [],
      },
    checked: [],
    gender: [],
    burgerOrder: []
    // spara allt i samma lista med olika platser! custInfo[plats 1 å 2 osv]


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
          orderItems: [this.burgerOrder],
          customerInfo: [this.custInfo]
        });
      },

      displayOrder: function (event) {
        console.log(this.custInfo);
        this.orderLocation = { x: event.clientX-10 - event.currentTarget.getBoundingClientRect().left,
          y: event.clientY-10 - event.currentTarget.getBoundingClientRect().top};
      }
    }
  });
