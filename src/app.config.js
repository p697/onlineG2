module.exports = {
  pages: [
    'pages/event/index',
    'pages/mine/index',
    'pages/login/index',
    'pages/schedule/index',
  ],
  window: {
    navigationBarTextStyle: 'black',
    navigationBarBackgroundColor: '#ffffff'
  },
  sitemapLocation: "sitemap.json",
  tabBar: {
    custom: false,
    color: "#7A7E83",
    selectedColor: "#31C4CC",
    borderStyle: "white",
    backgroundColor: "#ffffff",
    list: [
      {
        pagePath: "pages/event/index",
        iconPath: "assets/images/login/tab-event.png",
        selectedIconPath: "assets/images/login/tab-event-yes.png",
        // text: "事件"
        text: " "
      },
      {
        pagePath: "pages/schedule/index",
        iconPath: "assets/images/login/tab-schedule.png",
        selectedIconPath: "assets/images/login/tab-schedule-yes.png",
        // text: "课表"
        text: " "
      },
      {
        pagePath: "pages/mine/index",
        iconPath: "assets/images/login/tab-mine.png",
        selectedIconPath: "assets/images/login/tab-mine-yes.png",
        // text: "我的"
        text: " "
      }
    ]
  },
};
