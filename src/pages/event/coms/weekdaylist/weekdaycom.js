import React, {useState, useEffect} from 'react';
import {
  View,
} from 'remax/wechat';

import { AppContext } from '@/app'
import './weekdaylist.scss'

export default (props) => {
  const [dayCn, setDayCn] = useState()
  const comClassName = props.now ? "weekdaylist-com weekdaylist-com-now" : "weekdaylist-com"
  const dateClassName = props.now ? "weekdaylist-com-date weekdaylist-com-nowdate" : "weekdaylist-com-date"
  const dayCnClassName = props.now ? "weekdaylist-com-daycn weekdaylist-com-nowdaycn" : "weekdaylist-com-daycn"
  useEffect(() => {
    let dayCn = ""
    switch (props.day) {
      case 1: dayCn = "周一" 
        break
      case 2: dayCn = "周二"
        break
      case 3: dayCn = "周三"
        break
      case 4: dayCn = "周四"
      break
      case 5: dayCn = "周五"
        break
      case 6: dayCn = "周六"
        break
      case 0: dayCn = "周日"
    }
    setDayCn(dayCn)
  },
  [])

  return (
    <View className={comClassName}>
      <View className={dayCnClassName}>
        {dayCn}
      </View>
      <View className={dateClassName}>
        {props.date}
      </View>
    </View>
  );
};
