// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    text: 'Hello world！',
  },
  onClick: function() {
      this.setData({
        text: "Hello mini program!"
      })
  }
})
