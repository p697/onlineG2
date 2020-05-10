import React, { useState, useEffect } from 'react';
import {
  View,
} from 'remax/wechat';
import { AppContext } from '@/app'
import './presenttimeline.scss'


export default () => {
  const [top, setTop] = useState(82)

  const refresh = () => {
    let now = new Date()
    let hour = now.getHours()
    let minute = now.getMinutes()
    let marginTop = 82 + ((hour - 8) * 60 + minute) * 918 / 840
    // console.log(marginTop)
    setTop(marginTop)
  }

  useEffect(() => {
    refresh()
    setInterval(() => {
      refresh()
    }, 60000);
  },
    [])

  return (
    <View className="ptimeline" style={{ top: top }}>
      <View className="ptimeline-dot"></View>
      <View className="ptimeline-line"></View>
      <View className="ptimeline-dot"></View>
    </View>
  );
};
