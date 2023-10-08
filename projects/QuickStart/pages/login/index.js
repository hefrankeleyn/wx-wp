// pages/login/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        loginCode: '',
        myData: {
            a: 'aa',
            b: 'bb'
          }
    },
    setDataTestButton: function(){
        this.setData({
            "myData": {
                "a": "这个字符串在WXML中用到了"
            }
        })
        this._myData = {
            "b": "这个字符串未在WXML中用到，而且它很长…………………………"
        }
    },
    consoleLogMyData: function() {
        console.log(this.data.myData)
    },
    fetchLoginCode: function() {
        wx.login({
          success: (res) => {
            this.setData({loginCode:res.code});
          },
        })
    },
    drawMyCanvas: function(){
        const ctx = wx.createCanvasContext('myCanvas')  
        ctx.setFillStyle('red')
        ctx.fillRect(10, 10, 150, 75)
        ctx.draw()
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