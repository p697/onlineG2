import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  Input,
} from 'remax/wechat';
import {
  ConfirmIcon,
  ConfirmSucIcon,
} from '@/assets/images/index'
import { AppContext } from '@/app'
import './editevent.scss'

import { formatEvents } from '../../tools/formatevents'


export default (props) => {
  const app = React.useContext(AppContext)
  const [confirm, setConfirm] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [clsname, setClsname] = useState('editeventpage')

  useEffect(() => {
    setClsname(props.eventData.time_start ? 'editeventpage editeventpage-show' : 'editeventpage')
    setTitle(props.eventData.event_title)
    setContent(props.eventData.event_content)
  },
    [props.eventData])

  const handleConfirm = () => {
    setConfirm(true)

    let newData = {
      event_title: title,
      event_content: content,
      time_start: props.eventData.time_start,
      time_end: props.eventData.time_end
    }
    
    app.context.changeEventsData(newData)  
    // 这里是关键，存储在context里的changeEventsData函数，带着已有的eventsData和新增的newData去/events/index.js执行重新渲染

    setTimeout(() => {
      props.close()
      setConfirm(false)
    }, 200);
  }

  const handleTitle = (str) => {
    setTitle(str)
  }

  const handleContent = (str) => {
    setContent(str)
  }


  return (
    <View className={clsname}>
      <View className="editevent">

        <View className="editevent-inputbox">
          <Input
            onInput={e => handleTitle(e.detail.value)}
            className="editevent-inputbox-input"
            value={title}
          />
          <Input
            onInput={e => handleContent(e.detail.value)}
            className="editevent-inputbox-input"
            value={content}
          />
        </View>
        <View className="editevent-confirmbox">
          <View className="editevent-confirmbox-time">
            {props.eventData.time_start + '-' + props.eventData.time_end}
          </View>
          <Image
            className="editevent-confirmbox-image"
            onClick={handleConfirm}
            src={confirm ? ConfirmSucIcon : ConfirmIcon}
          />
        </View>

      </View>
      <View className="clickdie" onClick={() => props.close()}></View>
    </View>

  );
};
