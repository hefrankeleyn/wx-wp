// pages/movableareaview/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
        x3: 0,
        y3: 0,
        scale: 2,
    },

    tap2(e) {
        let kind =  parseInt(e.currentTarget.dataset.kind)
        if (!kind){
          this.setData({
            scale: 3
          })
        }else{
          this.setData({
            scale: 0
          })
        }
        
      },

    onChange(e) {
        console.log(e.detail)
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