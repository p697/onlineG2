import React, { useState, useEffect } from 'react';
import {
  View,
  redirectTo,
  getStorage,
  getStorageSync,
  setStorage,
  setNavigationBarColor,
  showNavigationBarLoading,
  request,
} from 'remax/wechat';
import { AppContext } from '@/app'
import './index.scss'

import WeekDayList from './coms/weekdaylist/weekdaylist'
import HeaderText from './coms/headertext/headertext'
import TimeList from './coms/timelist/timelist'
import Eventlist from './coms/eventlist/eventlist'
import PresentTimeLine from './coms/presenttimeline/presenttimeline'
import { formatEvents } from './tools/formatevents'


export default () => {
  const app = React.useContext(AppContext)
  const [eventsData, setEventsData] = useState([])
  const [thisWeek, setThisWeek] = useState('0')

  useEffect(() => {
    getStorage({
      key: 'userInfo',
      success(res) {
        requestAll(res.data.userKey)  // 获取个人信息成功，获取时间和事件
        // 更新context
        let context = app.context
        context.userInfo = res.data
        app.setContext(context)
      },
      fail(res) {
        redirectTo({ url: '../login/index' })
      }
    })
    setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#f8f8f8',
    })
    showNavigationBarLoading()
  },
    [])

  const requestAll = (userKey) => {
    getEvent(userKey)
    getThisWeek(userKey)
  }

  const getEvent = (userKey) => {
    request({
      url: 'https://api.cavano.vip/get_event',
      method: 'POST',
      data: {
        userKey: userKey
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      success(res) {

        let eventsData = loadClassEvents(res.data.obj.business_data)  // 这里实现格式化接受的课表 + 添加本地事件
        // console.log(eventsData)
        setEventsData(eventsData)  // 更新页面
        // 更新context
        let context = app.context
        context.eventsData = eventsData
        context.changeEventsData = (newData) => {
          //  这里是放在context里的函数，添加或更新自定义事件的处理逻辑
          eventsData = formatEvents([newData], eventsData)
          setEventsData(eventsData)
          let context = app.context
          context.eventsData = eventsData
          context.localEventsData = formatEvents([newData], context.localEventsData)
          app.setContext(context)
          setStorage({  // 将自定义事件存储在本地
            key: 'localEventsData',
            data: context.localEventsData
          })
        }
        app.setContext(context)
        // 每隔1分钟重新渲染一次
        intervalRefreah()
      }
    })
  }

  // 格式化接受的课程信息，加上本地事件
  const loadClassEvents = (classEvents) => {
    let eventsData = ['', '', '', '', '', '', '', '']
    const localEvents = getLocalEvents()
    eventsData = formatEvents(localEvents, eventsData)
    eventsData = formatEvents(classEvents, eventsData)
    return eventsData
  }

  const getThisWeek = (userKey) => {
    request({
      url: 'https://api.cavano.vip/get_weekinfo',
      method: 'POST',
      data: {
        userKey: userKey
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      success(res) {
        setThisWeek(res.data.obj.business_data.cur_week_index)  // 更新页面
        // 更新context
        let context = app.context
        context.semesterInfo = {
          semester: res.data.obj.business_data.cur_semester_code,
          thisweek: res.data.obj.business_data.cur_week_index,
        }
        app.setContext(context)
      }
    })
  }

  const getLocalEvents = () => {
    let data = []
    try {
      var value = getStorageSync('localEventsData')
      if (value) {
        let context = app.context
        context.localEventsData = value
        app.setContext(context)
        if (value) {
          data = value
        }
      }
    } catch (e) {
      console.log(e)
    }
    return data
  }

  const intervalRefreah = () => {
    const refresh = () => {
      setEventsData(app.context.eventsData)
    }
    setInterval(() => {
      refresh()
    }, 60000);
  }

  return (
    <View className="event">
      <View className="event-fixradius"></View>
      <View className="event-header">
        <HeaderText thisWeek={thisWeek} />
        <WeekDayList />
      </View>

      <View className="event-content">
        <PresentTimeLine />
        <TimeList />
        <Eventlist
          eventsData={eventsData}
        />
      </View>
    </View>
  );
};
