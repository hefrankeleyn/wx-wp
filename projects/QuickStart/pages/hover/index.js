// pages/hover/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        loading: false
    },
    clickLoadingButton: function() {
        console.log("触发了点击操作...");
        this.setData({
            // 将loading状态显示出来
            loading: true
        });
        // 执行耗时的操作，执行完再充值loading
    },
    showToastWithSuccessOption:function(){
        // 显示Toast
        wx.showToast({
            title: "已发送",
            icon: "success",
            duration: 1500
        });
        // 隐藏Toast
        // wx.hideToast()
    },
    showModalByError:function(){
        wx.showModal({
          title: '出现错误',
          content: '告知当前状态，信息和解决方法',
          cancelText: '次要内容',
          success: (res) => {
            if (res.cancel) {
                console.log('success, 用户点击次要操作')
            }
        
            if (res.confirm) {
                console.log('success, 用户点击主操作')
            }
          },
          complete: (res) => {
            if (res.cancel) {
                console.log('用户点击次要操作')
            }
        
            if (res.confirm) {
                console.log('用户点击主操作')
            }
          }
        })
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
        console.log("进行了下滑刷新操作.....")
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        console.log("下拉到底了...");
        console.log("触发了上拉触底事件");
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})