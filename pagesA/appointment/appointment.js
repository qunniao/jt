// pagesA/appointment/appointment.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.housing == undefined){
      options.housing = ''
    }
    if (options.price == undefined) {
      options.price = ''
    }
    this.setData({
      housing: options.housing,
      price:options.price
    })
  },

  changeOil: function (e) {
    this.setData({
      num: e.target.dataset.num
    })
  },

  //立即预约
  submit:function(){
    var that = this;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (that.data.num == 1){
      var type = [{"房源":that.data.housing},{"价格":that.data.price},{"类型":"商铺"}]
      that.setData({
        content: type
      })
    } else if (that.data.num == 2) {
      var type = [{ "房源": that.data.housing }, { "价格": that.data.price }, { "类型": "住宅" }]
      that.setData({
        content: type
      })
    } else if (that.data.num == 3) {
      var type = [{ "房源": that.data.housing }, { "价格": that.data.price }, { "类型": "公寓" }]
      that.setData({
        content: type
      })
    } 
    if (that.data.name == undefined){
      wx.showToast({
        title: '请输入联系人姓名',
        icon:'none'
      })
      return false;
    } else if (that.data.phone == undefined) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
      return false;
    } else if (!myreg.test(that.data.phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      })
      return false;
    } else {
      wx.request({
        url: app.api_url2 + '/forms/save',
        method: 'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        data: {
          name: that.data.name,
          phone: that.data.phone,
          content: JSON.stringify(that.data.content)
        },
        success(res) {
          wx.showToast({
            title: '预约成功！',
            icon: 'success',
            duration: 2000,
          })
          // setTimeout(function () {
          //   wx.reLaunch({
          //     url: '/pages/index/index',
          //   })
          // }, 2000)
        }
      })
    }
    
  },

  //获取姓名
  userName:function(e){
    this.setData({
      name: e.detail.value
    })
  },

  //获取手机号
  userPhone: function (e) {
    this.setData({
      phone: e.detail.value
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