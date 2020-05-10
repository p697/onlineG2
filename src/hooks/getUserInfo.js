import React, { useState, useEffect } from 'react'
import { Button } from 'remax/wechat';

export default (userInfoDone) => {


  const testScope = () => {
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          console.log('没有权限，发起请求')
          
          wx.authorize({
            scope: 'scope.record',
            success () {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              // wx.startRecord()
            }
          })
        }
        else {
          getInfo()
        }
      }
    })
  }

  const getInfo = () => {
    if (testScope) {}
    wx.getUserInfo({
      success(res) {
        userInfoDone(res.userInfo)
      },
      fail(res) {
        userInfoDone(null)
      }
    })
  }

  return testScope()
}



