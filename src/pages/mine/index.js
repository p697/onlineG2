import React, { useState, useEffect } from 'react';
import {
  View,
  OpenData,
  setNavigationBarColor,
} from 'remax/wechat';
import { AppContext } from '@/app'
import './index.scss'
import {
  SetIcon,
  AboutIcon,
  LogoutIcon,
  ArrowRightIcon
} from '@/assets/images/index'

import FloatCard from './coms/floatcard/floatcard'
import Content from './coms/content/content'

export default () => {
  const app = React.useContext(AppContext)

  useEffect(() => {
    setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#9CA8B8',
    })
    console.log(app.context)
  },
  [])

  return (
    <View className="mine" key="mine">
      <View className="mine-header">
        <View className="mine-header-avatar">
          <OpenData type="userAvatarUrl"></OpenData>
        </View>
        <View className="mine-header-name">
          {app.context.userInfo.business_data.user_name}
        </View>
        <View className="mine-header-code">
          {app.context.userInfo.business_data.adminclass_name}
        </View>
      </View>

      <FloatCard />

      <Content />

    </View>
  );
};
