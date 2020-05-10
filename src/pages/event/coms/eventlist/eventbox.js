import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
} from 'remax/wechat';
import { AppContext } from '@/app'
import './eventlist.scss'
import { DeleteIcon } from '@/assets/images/index'


export default (props) => {
  const app = React.useContext(AppContext)
  const [deleteImgCls, setDeleteImgCls] = useState('eventlist-eventbox-deleteimg-none')

  let eventData = props.eventData
  let time = props.time
  let clsname = 'eventlist-eventbox eventlist-eventbox-' + props.lastColor + ' eventlist-eventbox-' + time
  let showTitle = ''
  let showEvent = ''
  let deleteClsname = ''
  let eventInfoClsname = 'eventlist-eventbox-eventinfo'
  if (time != 'dusk' && time != 'night') {
    showTitle = eventData.event_title
    showEvent = eventData.event_content
    deleteClsname = 'eventlist-eventbox-delete'
  }
  if (time == 'noon') {
    deleteClsname += ' eventlist-eventbox-delete-noon'
  }

  const clickEventBox = (eventData) => {
    props.setFocusEventData(eventData)
  }

  const clickDeleteBox = () => {
    setDeleteImgCls('eventlist-eventbox-deleteimg eventlist-eventbox-deleteimg-show')
    setTimeout(() => {
      setDeleteImgCls('eventlist-eventbox-deleteimg eventlist-eventbox-deleteimg-none')
    }, 1000);

  }

  const handleDelete = () => {
    let delData = {
      time_start: eventData.time_start,
    }
    app.context.changeEventsData(delData)
  }

  return (
    <View className={clsname}>
      <View className={deleteClsname} onClick={e => clickDeleteBox()}>
        <Image
          className={deleteImgCls}
          src={DeleteIcon}
          onClick={e => handleDelete()}
        />
      </View>
      <View className={eventInfoClsname} onClick={e => clickEventBox(eventData)}>
        <View className="eventlist-eventbox-title">
          {showTitle}
        </View>
        <View className="eventlist-eventbox-content">
          {showEvent}
        </View>
      </View>
    </View>
  );
};
