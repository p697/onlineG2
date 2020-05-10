import React, { useState, useEffect } from 'react';
import {
  View,
} from 'remax/wechat';
import { AppContext } from '@/app'
import './timelist.scss'


export default () => {
  const tlist = [
    '08:00',
    '10:00',
    '12:00',
    '14:00',
    '16:00',
    '18:00',
    '20:00',
    '22:00'
  ]

  const tlistObj = tlist.map((time, index) => {
      return (
        <View className="timelist-timecolumn-timebox" key={index}>
          {time}
        </View>
      )
  })

  const trowObj = tlist.map((time, index) => {
    return (
      <View className="timelist-timerow-row" key={index}></View>
    )
  })

  return (
    <View className="timelist">
      <View className="timelist-timecolumn">
        {tlistObj}
      </View>
      <View className="timelist-timerow">
        {trowObj}
      </View>
    </View>
  );
};
