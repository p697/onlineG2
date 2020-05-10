import React from 'react';
import {
  View,
  Image,
} from 'remax/wechat';
import {
  ChartIcon1,
  ChartIcon2,
  ChartIcon3
} from '@/assets/images'
import { AppContext } from '@/app'
import './floatcard.scss'

export default () => {

  return (
      <View className="floatcard">
        <View className="floatcard-blank"></View>
        <View className="floatcard-cell">
          <Image className="floatcard-icon" src={ChartIcon1}></Image>
          <View className="floatcard-text">课程统计</View>
        </View>
        <View className="floatcard-cell">
          <Image className="floatcard-icon" src={ChartIcon2}></Image>
          <View className="floatcard-text">事件统计</View>
        </View>
        <View className="floatcard-cell">
          <Image className="floatcard-icon" src={ChartIcon3}></Image>
          <View className="floatcard-text">综合统计</View>
        </View>
        <View className="floatcard-blank"></View>
      </View>
  );
};
