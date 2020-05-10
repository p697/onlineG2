import React, { useState, useEffect } from 'react';
import {
  View,
} from 'remax/wechat';
import { AppContext } from '@/app'
import './weekdaylist.scss'

import WeekDayCom from './weekdaycom'

export default () => {
  const [weekDayComs, setWeekDayComs] = useState()

  useEffect(() => {
    const now = new Date()
    const weekday = now.getDay()
    const weekdays = [1, 2, 3, 4, 5, 6, 0]
    const datelist = weekdays.map((day) => {
      let dayObj = new Date(now.getFullYear(), now.getMonth(), now.getDate() - weekday + day);
      return (
        dayObj.getDate()
      )
    })
    const WeekDayComs = weekdays.map((day) => {
      return (
        <WeekDayCom
          now={day == weekday ? true : false}
          date={day == 0 ? datelist[6] : datelist[day - 1]}
          day={day}
          key={day}
        />
      )
    })
    setWeekDayComs(WeekDayComs)
  },
    [])

  return (
    <View className="weekdaylist">
      {weekDayComs}
    </View>
  );
};
