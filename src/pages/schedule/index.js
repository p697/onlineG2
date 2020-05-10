import React from 'react';
import { View, Text, Image, Button, redirectTo } from 'remax/wechat';
import './index.scss'
import { AppContext } from '@/app'
export default () => {
  return (
    <View className='app' key="schedule">
      <View>这里是课表</View>
      <View className='box1'></View>
      <View className='box2'></View>
      <View className='box3'></View>
    </View>
  );
}