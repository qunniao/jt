// pagesA/houseClassification/houseClassification.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    caseLista:[],
    display:"none"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: options.labalName
    })
    wx.request({
      url: app.api_url2 + '/case',
      data:{
        page:1,
        bid:options.bid
      },
      success(res){
        that.setData({
          caseLista: res.data.data
        })
        if(that.data.caseLista.length == 0){
          that.setData({
            display:'block'
          })
        }
      }
    })
  },

  //跳转详情页
  goHouseDetails:function(event){
    wx.navigateTo({
      url: '/pagesA/houseDetails/houseDetails?cid=' + event.currentTarget.dataset.cid,
    })
  },

  //跳转搜索页面
  goSearch:function(){
    wx.navigateTo({
      url: '/pagesA/search/search',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})