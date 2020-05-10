import React, { useState, useEffect } from 'react';
import {
  View,
  setNavigationBarColor,
  hideNavigationBarLoading,
} from 'remax/wechat';
import { AppContext } from '@/app'
import './eventlist.scss'
import EditEvent from '../editevent/editevent'
import EventBox from './eventbox'


export default (props) => {
  // const app = React.useContext(AppContext)
  const [eventsObj, setEventsObj] = useState([])
  const [focusEventData, setFocusEventData] = useState({ time_start: '' })
  const classTimeList = [
    '08:00',
    '10:10',
    'noon',
    '14:30',
    '16:30',
    'dusk',
    '19:00',
    'night'
  ]
  const timeListCode = [
    0,
    110,
    240,
    390,
    500,
    620,
    650,
    760,
    840
  ]
  const getPresentTimeCode = () => {
    let now = new Date()
    let hour = now.getHours()
    let minute = now.getMinutes()
    return (hour - 8) * 60 + minute
  }

  useEffect(() => {
    setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#f8f8f8',
    })
  },
    [])

  useEffect(() => {
    // console.log(props.eventsData)
    initEventList(props.eventsData)
  },
    [props.eventsData, focusEventData])
  // 天坑啊！！！！！！！！！！！！！！

  const initEventList = (eventsData) => {
    const presentTimeCode = getPresentTimeCode()
    const colors = [
      'blue',
      'yellow',
      'purple',
      'green',
      'brown',
    ]
    let lastColor = ''
    const eventsObj = classTimeList.map((time, index) => {
      let existEvent = false
      let eventData = {
        time_start: time,
        time_end: index < classTimeList.length - 1 ? classTimeList[index + 1] : 'sleep'
      }
      let clsname = 'eventlist-eventbox eventlist-eventbox-'
      // console.log(eventsData)  
      eventsData.forEach(evtData => {
        if (time == evtData.time_start && evtData.event_title) {
          existEvent = true
          eventData = evtData
          eventData.time_end = index < classTimeList.length - 1 ? classTimeList[index + 1] : 'sleep'
        }
      });
      if (existEvent) {
        // 这个for循环来整一个与上一次不重复的颜色
        for (let c = 0; c < 100; c++) {
          let newColor = colors[Math.floor((Math.random() * colors.length))]
          if (lastColor != newColor) {
            // console.log(newColor)
            lastColor = newColor
            break
          }
        }
        if (presentTimeCode > timeListCode[index + 1]) {
          lastColor = 'gray'
        }  // 这里添加判断事件是否已经过时了

        return <EventBox 
          lastColor={lastColor}
          time={time}
          eventData={eventData}
          setFocusEventData={setFocusEventData}
          key={index}
        />
      }

      if (time == 'noon') {
        clsname += 'none eventlist-eventbox-noon'
      }
      else if (time == 'dusk') {
        clsname += 'none eventlist-eventbox-dusk'
      }
      else if (time == 'night') {
        clsname += 'none eventlist-eventbox-night'
      }
      else {
        clsname += 'none'
      }
      return (<View
        className={clsname}
        key={index}
        onClick={e => clickEventBox(eventData)}
      ></View>)
    })
    setEventsObj(eventsObj)
    hideNavigationBarLoading()
    return true
  }

  const clickEventBox = (eventData) => {
    setFocusEventData(eventData)
  }

  return (
    <View className="eventlist">
      <EditEvent
        eventData={focusEventData}
        close={() => setFocusEventData({ time_start: '' })}
      />
      {eventsObj}
    </View>
  );
};
