console.log("demojs/index.js ...");
var multiplyBy2 = require("./modeA.js");
var result = multiplyBy2(4);
console.log(result);
var common = require('./common.js');
Page({
    helloMINA: function() {
        common.sayHello("MINA");
      },
      goodbyeMINA: function() {
        common.sayGoodbye('MINA')
      },
      switchPage: function() {
          wx.switchTab({
            url: '/pages/demo/demo',
          })
      }
})