const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:0,
    isIPX: app.globalData.isIPX,
    navData: [
      {
        text: "首页",  //文本
        current: 0,
        iconPath: '../../res/imgs/home1.png',
        selectedIconPath: '../../res/imgs/home2.png',
      },
      {
        text: "全部房源",  //文本
        current: 1,
        iconPath: '../../res/imgs/allHouse.png',
        selectedIconPath: '../../res/imgs/allHouse2.png',
      },
      {
        text: "公司介绍",  //文本
        current: 2,
        iconPath: '../../res/imgs/company2.png',
        selectedIconPath: '../../res/imgs/company1.png',
      },
      {
        text: "我",  //文本
        current: 3,
        iconPath: '../../res/imgs/me1.png',
        selectedIconPath: '../../res/imgs/me2.png',
      }
    ],
    imgUrls:[],
    imgUrlsa: [],
    firstType:[],
    yewu:[],
    indicatorDots:false,
    indicatorDotsa:false,
    autoplay:true,
    autoplaya:false,
    interval: 5000,
    dangqian: 0,
    duration:1000,
    qwe:2,
    caseCurrent:1,
    circular:true,
    afterColor:'#232323',
    introductionList:[],
    num:0,
    house:[{
      caseAttrs:[]
    }],
    allHouse:[],
    intro:'',
    userInfo: {
      avatarUrl: "",//用户头像
      nickName: "",//用户昵称
    },
    images: '../../res/imgs/top2.png',
    region: ['', '', ''],
    city:'杭州'
  },

  //点击预览办公环境图片
  previewImg: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var bangong = []
    for (var i in that.data.imgUrlsa){
      bangong.push(that.data.imgUrlsa[i])
    }
    wx.previewImage({
      current: bangong[index],     //当前图片地址
      urls: bangong,               //所有要预览的图片的地址集合 数组形式
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  bindPickerCity: function (e) {
    var that = this;
    that.setData({
      region:e.detail.value,
      city: e.detail.value[1].substring(0, 2)
    })
    wx.request({
      url: app.api_url2 + '/case/list',
      data: {
        current: 1,
        size: 20,
        address: that.data.city
      },
      success(res) {
        that.setData({
          allHouse: res.data.data.records
        })
      }
    })
  },

  shangyizhang: function (event) {
    this.setData({
      dangqian: this.data.dangqian-1
    })
    if(this.data.dangqian == -1){
      this.setData({
        dangqian: 3
      })
    }
  },

  xiayizhang:function(){
    this.setData({
      dangqian: this.data.dangqian + 1
    })
    if (this.data.dangqian == 6) {
      this.setData({
        dangqian: 0
      })
    }
  },

  //切换tabbar
  tabbar: function (e) {
    var _this = this;
    this.setData({
      current: e.currentTarget.dataset.current,
    })
  },

  changeOil: function (e) {
    console.log(e.currentTarget.dataset.num);
    var that = this;
    that.setData({
      num: e.currentTarget.dataset.num
    })
    if(e.currentTarget.dataset.num == 0){
      wx.request({
        url: app.api_url2 + '/case/list',
        data: {
          current: 1,
          size: 20,
          address: that.data.city
        },
        success(res) {
          that.setData({
            allHouse: res.data.data.records
          })
        }
      })
    }
    if (e.currentTarget.dataset.num == 1){
      wx.request({
        url: app.api_url2 + '/case/list',
        data: {
          current: 1,
          size: 20,
          sortType: 0,
          address: that.data.city
        },
        success(res){
          that.setData({
            allHouse: res.data.data.records
          })
        }
      })
    } else if (e.currentTarget.dataset.num == 2){
      wx.request({
        url: app.api_url2 + '/case/list',
        data: {
          current: 1,
          size: 20,
          sortType: 1,
          address: that.data.city
        },
        success(res) {
          that.setData({
            allHouse: res.data.data.records
          })
        }
      })
    } else if (e.currentTarget.dataset.num == 3 && this.data.images == '../../res/imgs/top2.png'){
      wx.request({
        url: app.api_url2 + '/case/list',
        data: {
          current: 1,
          size: 20,
          sortType: 2,
          address: that.data.city
        },
        success(res) {
          that.setData({
            allHouse: res.data.data.records,
            images:'../../res/imgs/top.png'
          })
        }
      })
    } else if (e.currentTarget.dataset.num == 3 && this.data.images == '../../res/imgs/top.png') {
      wx.request({
        url: app.api_url2 + '/case/list',
        data: {
          current: 1,
          size: 20,
          sortType: 3,
          address: that.data.city
        },
        success(res) {
          that.setData({
            allHouse: res.data.data.records,
            images: '../../res/imgs/top2.png'
          })
        }
      })
    }
  },

  //跳转地图
  goMap:function(){
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        wx.openLocation({
          latitude: 30.2353000000,
          longitude: 120.2522800000,
          name: "杭州金廷基业房地产营销策划有限公司",
          address: "浙江省杭州市萧山区宁围街道盈丰路博地中心B座2701-2室"
        })
      }
    })
  },

  //跳转根据案例分类获取案例列表
  goHouseClassification: function (event) {
    console.log(event.currentTarget.dataset.bid)
    if (event.currentTarget.dataset.bid == 4){
      wx.navigateTo({
        url: '/pagesA/company/company',
      })
    }else {
      wx.navigateTo({
        url: '/pagesA/houseClassification/houseClassification?bid=' + event.currentTarget.dataset.bid + '&labalName=' + event.currentTarget.dataset.name,
      })
    }
    
  },

  //跳转搜索页面
  goSearch:function(){
    wx.navigateTo({
      url: '/pagesA/search/search',
    })
  },
  
  //跳转详情页
  goHouseDetails: function (event){
    console.log(event)
    wx.navigateTo({
      url: '/pagesA/houseDetails/houseDetails?cid=' + event.currentTarget.dataset.cid,
    })
  },

  //跳转预约看房
  goAppointment:function(){
    wx.navigateTo({
      url: '/pagesA/appointment/appointment',
    })
  },

  //跳转买房流程
  goProcess:function(){
    wx.navigateTo({
      url: '/pagesA/process/process',
    })
  },

  //登录
  bindGetUserInfo: function () {
    var _this = this;
    //调用登录接口
    wx.login({
      success: function (res_login) {
        if (res_login.code) {
          wx.getUserInfo({
            success: function (res) {
              wx.request({
                url: app.api_url2 + '/user/wxLogin',
                header: { 'Content-Type': 'application/x-www-form-urlencoded' },
                method: 'POST',
                data: {
                  code: res_login.code,
                  encryptedData: res.encryptedData,
                  iv: res.iv
                },
                success: res => {
                  wx.hideLoading();
                }
              })
            },
            fail: function () {

            }
          })

        }
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log("huanjing:" + that.data.dangqian)

    that.loadInfo();

    // 判断是否已经授权
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {//授权了，可以获取用户信息了
          
        } else {//未授权，跳到授权页面
          
        }
      }
    });
    /**
     * 获取用户信息
     */
    wx.getUserInfo({
      success: function (res) {
        console.log('成功了');
        var avatarUrl = 'userInfo.avatarUrl';
        var nickName = 'userInfo.nickName';
        that.setData({
          [avatarUrl]: res.userInfo.avatarUrl,
          [nickName]: res.userInfo.nickName,
        })
      },
      fail:function(){
        console.log("失败了")
      }
    })

    //获取首页轮播图
    wx.request({
      url: app.api_url2 +'/banners/list',
      success(res){
        that.setData({
          imgUrls:res.data.data
        })
      }
    })

    //获取公司信息
    wx.request({
      url: app.api_url2 +'/companyInfos/info',
      success(res){
        that.setData({
          intro: res.data.data[0].intro,
          yewu: JSON.parse(res.data.data[0].businessJson),
          imgUrlsa: res.data.data[0].environmentJson.split(','),
          weChat: res.data.data[0].wxNumber,
          phone: res.data.data[0].phone,
          address: res.data.data[0].address
        })
        console.log(that.data.imgUrlsa)
      }
    })
    

    //获取案例类型
    wx.request({
      url: app.api_url2 + '/caseLabel/list',
      success(res){
        that.setData({
          firstType:res.data.data
        })
      }
    })

    //获取首页房源列表
    wx.request({
      url: app.api_url2 + '/case',
      data: {
        page: 1
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          house: res.data.data
        })
        console.log('首页：'+that.data.house)
      }
    })

    //获取全部房源页面房源列表
    wx.request({
      url: app.api_url2 +'/case/list',
      data:{
        current:1,
        size:10,
        address:'杭州'
      },
      success(res){
        that.setData({
          allHouse: res.data.data.records
        })
      }
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

  loadInfo: function () {
    var page = this
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标 
      success: function (res) {
        // success 
        var longitude = res.longitude
        var latitude = res.latitude
        page.loadCity(longitude, latitude)
      },
      fail: function () {
        // fail 
      },
      complete: function () {
        // complete 
      }
    })
  },
  loadCity: function (longitude, latitude) {
    var page = this
    wx.request({
      url: 'https://api.map.baidu.com/geocoder/v2/?ak=v=2.0&ak=YcOGuCXZOmSuEC3cKfDTbDlI&location=' + latitude + ',' + longitude + '&output=json',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // success 
        console.log(res);
        var city = res.data.result.addressComponent.city.substring(0,2);
        page.setData({ city: city });
      },
      fail: function () {
        // fail 
      },
      complete: function () {
        // complete 
      }
    })
  } ,  

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
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.onLoad();
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    if(that.data.current == 1){
      var caseCurrent = that.data.caseCurrent + 1;
      that.setData({
        caseCurrent: caseCurrent
      })
      wx.request({
        url: app.api_url2 + '/case/list',
        data: {
          current: caseCurrent,
          size: 10,
          sortType: 0,
          address: that.data.city
        },
        success(res) {
          wx.hideLoading();
          that.setData({
            allHouse: that.data.allHouse.concat(res.data.data.records)
          })
          if (res.data.data.records.length == 0) {
            wx.showToast({
              title: '没有更多了',
              icon: 'none'
            })
          }
        }
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})