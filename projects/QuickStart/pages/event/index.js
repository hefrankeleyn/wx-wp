// pages/event/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    handleTap1: function(options) {
        console.log("handleTap 1!..." + options);
    },
    handleTap2: function(options) {
        console.log("handleTap 2!..." + options);
    },
    handleTap3: function(options) {
        console.log("handleTap 3!..." + options);
    },
    handleTap4: function(options) {
        console.log("handleTap 4!..." + options);
    },
    showInfo: function() {
        let sysInfo = wx.getSystemInfo();
        console.log(sysInfo);
        let res01 = wx.canIUse('openBluetoothAdapter');
        console.log(res01);
        // if (wx.openBluetoothAdapter) {
        //     wx.openBluetoothAdapter()
        //   } else {
        //     // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
        //     wx.showModal({
        //       title: '提示',
        //       content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
        //     })
        //   }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})