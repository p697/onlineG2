import React, { useState, useEffect } from 'react';
import {
  View,
} from 'remax/wechat';
import { AppContext } from '@/app'
import './headertext.scss'


export default (props) => {
  const [thisweek, setThisWeek] = useState('0')
  const dateCn = () => {
    let now = new Date()
    let month = now.getMonth() + 1
    let date = now.getDate()
    return month + '月' + date + '日'
  }

  useEffect(() => {
    if (props.thisWeek != thisweek) {
      setThisWeek(props.thisWeek)
    }
  })

  return (
    <View className="headertext">
      <View className="headertext-bigtitle">
        {dateCn()} &nbsp;第{thisweek}周
      </View>
      {/* <View className="headertext-bigtitle">
        &nbsp; &nbsp; &nbsp; &nbsp; 第{thisweek}周
      </View> */}
      {/* <View className="headertext-smalltitle">
        今日有 <View className="headertext-smalltitle-number">1</View> 门课
      </View> */}
    </View>
  );
};
