// pagesA/houseDetails/houseDetails.js

const app = getApp()
const promisify = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:[],
    videoUrl:'',
    showModalStatus: false,
    showShareStatus:false,
    name:'',
    minPrice:'',
    maxPrice:'',
    caseAttrs:[],
    imgUrls:[],
    hasVideo:false
  },

  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200,  //动画时长
      timingFunction: "linear", //线性
      delay: 0  //0则不延迟
    });

    // 第2步：这个动画实例赋给当前的动画实例
    this.animation = animation;

    // 第3步：执行第一组动画：Y轴偏移240px后(盒子高度是240px)，停
    animation.translateY(240).step();

    // 第4步：导出动画对象赋给数据对象储存
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画
    setTimeout(function () {
      // 执行第二组动画：Y轴不偏移，停
      animation.translateY(0).step()
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
      this.setData({
        animationData: animation
      })

      //关闭抽屉
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示抽屉
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  },


  powerDrawera: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.asd(currentStatu)
  },
  asd: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200,  //动画时长
      timingFunction: "linear", //线性
      delay: 0  //0则不延迟
    });

    // 第2步：这个动画实例赋给当前的动画实例
    this.animation = animation;

    // 第3步：执行第一组动画：Y轴偏移240px后(盒子高度是240px)，停
    animation.translateY(240).step();

    // 第4步：导出动画对象赋给数据对象储存
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画
    setTimeout(function () {
      // 执行第二组动画：Y轴不偏移，停
      animation.translateY(0).step()
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
      this.setData({
        animationData: animation
      })

      //关闭抽屉
      if (currentStatu == "close") {
        this.setData(
          {
            showShareStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示抽屉
    if (currentStatu == "open") {
      this.setData(
        {
          showShareStatus: true
        }
      );
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =  this;
    var appid = 'wxc8ae8a95d1037798';
    var sec = '332df9a18a1895670f342625d39a4caa';
    var scene = decodeURIComponent(options.scene)

    //获取分享二维码
    wx.request({
      url: app.api_url2 + '/case/qrCode/'+options.cid,
      success:function(res){
        that.setData({
          src:res.data.data
        })
      }
    })
    //获取房源详情
    wx.request({
      url: app.api_url2 +'/case/info',
      data:{
        cid:options.cid
      },
      success(res){
        var caseUrl = res.data.data.cover
        var newArry = caseUrl.split(",");
        var a = res.data.data.mobileDetail.split(',')
        var caseDe = []
        var casnshu = { 'url': a }
        caseDe.push(casnshu)
        that.setData({
          cover: res.data.data.cover,
          videoUrl:res.data.data.video,
          imgUrls: res.data.data.caseImageList,
          name: res.data.data.name,
          shareUrl:res.data.data.cover,
          cid:res.data.data.cid,
          minPrice: res.data.data.minPrice,
          maxPrice: res.data.data.maxPrice,
          caseAttrs: res.data.data.caseAttrs,
          mobileDetail: caseDe[0].url
        })
        console.log('video:' + that.data.videoUrl);
        if (that.data.videoUrl != undefined && that.data.videoUrl != ''){
          that.setData({
            hasVideo:true
          }) 
          console.log('hasVideo:' + that.data.hasVideo);
        }
        wx.setNavigationBarTitle({
          title: that.data.name
        })
      }
    })
  },

  //跳转首页
  goHome:function(){
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },

  //跳转预约页面
  goAppointment:function(){
    wx.navigateTo({
      url: '/pagesA/appointment/appointment?housing='+this.data.name+'&price='+this.data.price,
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

  savePic: function () {
    console.log(13212)
    let that = this;
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: that.data.windowWidth * 2,
      height: that.data.contentHeight * 2,
      canvasId: "shareCanvas",
      success: function (res) {
        // util.savePicToAlbum(res.tempFilePath);
        wx.hideLoading();
        var tempFilePath = res.tempFilePath;
        that.setData({
          canvasUrl: tempFilePath
        });
        if (tempFilePath !== "") {
          wx.hideLoading();
          wx.previewImage({
            current: that.data.canvasUrl, // 当前显示图片的http链接
            urls: [that.data.canvasUrl], // 需要预览的图片http链接列表
            success: function (_res) {
              console.log("预览成功啦");
            }
          });
        }
      }
    });
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
    return {
      title: this.data.name,
      path: '/pagesA/houseDetails/houseDetails?cid='+this.data.cid,
      imageUrl: this.data.shareUrl,
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  },


  getuserpic: function (res) {
    let rpx = 1;
    wx.getSystemInfo({
      success(res) {
        rpx = res.windowWidth / 375;
      },
    })

    const wxGetImageInfo = promisify.promisify(wx.getImageInfo)
    const ctx = wx.createCanvasContext('shareCanvas')

    var that = this;
  
    ctx.drawImage('../../res/imgs/iiiii.jpg', 0, 0, 400 * rpx, 1000 * rpx)
    let image = this.data.shareUrl
    var imag = this.data.src
    wx.getImageInfo({
      src:imag,
      success: res => {
        let temp = res.path
        ctx.drawImage(temp, 200 * rpx, 360 * rpx, 100 * rpx, 115 * rpx)
      }
    })
    wx.getImageInfo({ // 或者用wx.downloadFile
      src: image,
      success: res => {
        let tempPath = res.path
        // 开始绘制canvas
        ctx.setFillStyle('#333')
        ctx.font = 'normal 18px sans-serif';
        ctx.fillText(this.data.name, 20 * rpx, 350 * rpx)
        ctx.setFillStyle('red')
        ctx.font = 'normal 18px sans-serif';
        ctx.fillText("￥" + this.data.price, 20 * rpx, 390 * rpx)
        ctx.setFillStyle('#333')
        ctx.font = 'normal 12px sans-serif';
        ctx.fillText("长按识别小程序码访问", 20 * rpx, 440 * rpx)
        ctx.setFillStyle('#666')
        ctx.font = 'normal 10px sans-serif';
        ctx.fillText("金廷基业", 20 * rpx, 460 * rpx)
        ctx.drawImage(tempPath, 20 * rpx, 20 * rpx, 300 * rpx, 300 * rpx)
        ctx.stroke()
        ctx.draw()
      }
    })
  },
  ewshow: function () {
    this.getuserpic()
    this.setData({
      twoshow: true,
      showShareStatus: false
    })
  },
  ewhiden: function () {
    this.setData({
      twoshow: false
    })
  },
  save: function () {
    let _this = this;
    const wxCanvasToTempFilePath = promisify.promisify(wx.canvasToTempFilePath)
    const wxSaveImageToPhotosAlbum = promisify.promisify(wx.saveImageToPhotosAlbum)
    wxCanvasToTempFilePath({
      canvasId: 'shareCanvas'
    }, this).then(res => {
      wx.saveImageToPhotosAlbum({
        filePath: res.tempFilePath,
        success: function (data) {
          console.log(res.tempFilePath)
          wx.hideLoading()
          wx.showModal({
            title: '提示',
            content: '您的推广二维码已存入手机相册，赶快分享给好友吧',
            showCancel: false,
          })
          _this.setData({
            twoshow: false
          })
        },
        fail: function (err) {
          if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
            // 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
            wx.showModal({
              title: '提示',
              content: '需要您授权保存相册',
              showCancel: false,
              success: modalSuccess => {
                wx.openSetting({
                  success(settingdata) {
                    console.log("settingdata", settingdata)
                    if (settingdata.authSetting['scope.writePhotosAlbum']) {
                      wx.showModal({
                        title: '提示',
                        content: '获取权限成功,再次点击图片即可保存',
                        showCancel: false,
                      })
                    } else {
                      wx.showModal({
                        title: '提示',
                        content: '获取权限失败，将无法保存到相册哦~',
                        showCancel: false,
                      })
                    }
                  },
                  fail(failData) {
                    console.log("failData", failData)
                  },
                  complete(finishData) {
                    console.log("finishData", finishData)
                  }
                })
              }
            })
          }
        },
        complete(res) {
          wx.hideLoading()
        }
      })
    }).then(res => {
      // wx.showToast({
      //   title: '已保存到相册'
      // })
      // this.setData({
      //   twoshow: false
      // })
    })
  },
})