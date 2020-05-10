import React from 'react';
import {
  View,
  Image,
  removeStorage,
  redirectTo,
} from 'remax/wechat';
import { AppContext } from '@/app'
import './content.scss'
import {
  SetIcon,
  AboutIcon,
  LogoutIcon,
  ArrowRightIcon
} from '@/assets/images/index'


export default () => {

  const handleLogout = () => {
    wx.showModal({
      title: '警告',
      content: '目前版本并无线上同步功能，登出将失去所有本地数据。确认登出吗？',
      success (res) {
        if (res.confirm) {
          removeStorage({key: 'userInfo'})
          redirectTo({url: '../../../../login/index'})
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  }

  return (
    <View className="content">
      <View className="content-card">
        <View className="content-card-iconbox">
          <Image
            className="content-card-icon"
            src={SetIcon}
          />
        </View>
        <View className="content-card-text">设置</View>
        <View className="content-card-iconbox">
          <Image
            className="content-card-icon"
            src={ArrowRightIcon}
          />
        </View>
      </View>

      <View className="content-card">
        <View className="content-card-iconbox">
          <Image
            className="content-card-icon"
            src={AboutIcon}
          />
        </View>
        <View className="content-card-text">关于</View>
        <View className="content-card-iconbox">
          <Image
            className="content-card-icon"
            src={ArrowRightIcon}
          />
        </View>
      </View>

      <View 
        className="content-card content-logoutcard"
        onClick={handleLogout}
      >
        <View className="content-card-iconbox">
          <Image
            className="content-card-icon"
            src={LogoutIcon}
          />
        </View>
        <View className="content-card-text">登出</View>
        <View className="content-card-iconbox">
          <Image
            className="content-card-icon"
            src={ArrowRightIcon}
          />
        </View>
      </View>
    </View>
  );
};
