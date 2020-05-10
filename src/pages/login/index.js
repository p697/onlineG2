import React, { useState, useEffect } from 'react'
import {
  View,
  Input,
  Button,
  Image,
  OpenData,
  request,
  switchTab,
  setStorage,
  hideHomeButton,
  setNavigationBarColor
} from 'remax/wechat'
import './index.scss'
import {
  UsernameIcon,
  PasswordIcon,
  EyeOpenIcon,
  EyeCloseIcon,
  UsernameFocusIcon,
  PasswordFocusIcon,
} from '@/assets/images/index'
import Toptips from 'weui-miniprogram/miniprogram_dist/toptips/toptips'

import { AppContext } from '@/app'


export default () => {
  const app = React.useContext(AppContext)
  const [username, setUsername] = useState()
  const [usernameFocus, setUsernameFocus] = useState(false)
  const [password, setPassword] = useState()
  const [passwordFocus, setPasswordFocus] = useState(false)
  const [eye, setEye] = useState(false)
  const [wait, setWait] = useState(false)
  const [loginTip, setLoginTip] = useState({ show: false })

  useEffect(() => {
    setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#9ca8b8',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
    hideHomeButton()  // 隐藏左上角首页按钮
  },
    [])

  const handleLoginClick = () => {
    if (wait) { return }
    setWait(true)
    request({
      url: 'https://api.cavano.vip/login',
      method: 'POST',
      data: {
        username: username,
        password: password
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      success(res) {
        // 登录返回值
        if (res.data.code == 200) {
          let context = app.context
          context.userInfo = res.data.obj
          app.setContext(context)  // 更新context
          setStorage({
            key: "userInfo",
            data: res.data.obj
          })  // 登陆成功就存数据到本地
          switchTab({ url: '../event/index' })
        }
        else {
          // 登陆失败
          setLoginTip({
            show: true,
            type: 'error',
            msg: res.data.error,
          })
          setTimeout(() => {
            setLoginTip({ show: false, msg: res.data.error, })
          }, 2000)
        }
        setWait(false)
        // console.log(res.data);
      }
    })
  }

  return (
    <View className="login" key="login">
      <View className="login-card">
        <View className="login-avatarbox">
          <View className="login-avatar">
            <OpenData type="userAvatarUrl"></OpenData>
          </View>
        </View>
        <View className="login-inputbox">
          <View className="login-inputbox-icon">
            <Image
              src={usernameFocus ? UsernameFocusIcon : UsernameIcon}
              className="login-icon"
            />
          </View>
          <View className={usernameFocus ? "login-inputbox-input login-inputbox-focus" : "login-inputbox-input"}>
            <Input
              onInput={e => setUsername(e.detail.value)}
              className="login-input"
              placeholder="请输入学号"
              value={username}
              onBlur={() => setUsernameFocus(true)}
            // onFocus={() => setUsernameFocus(true)}  小程序手机端bug，onFocus(bindfocus)延迟太高无法使用
            // onBlur={() => setUsernameFocus(false)}
            />
          </View>
        </View>
        <View className="login-inputbox">
          <View className="login-inputbox-icon">
            <Image
              src={passwordFocus ? PasswordFocusIcon : PasswordIcon}
              className="login-icon"
            />
          </View>
          <View className={passwordFocus ? "login-inputbox-input login-inputbox-focus" : "login-inputbox-input"}>
            <Input
              onInput={e => setPassword(e.detail.value)}
              className="login-input"
              placeholder="请输入密码"
              type={eye ? "text" : "password"}
              value={password}
              onBlur={() => setPasswordFocus(true)}
            // onFocus={() => setPasswordFocus(true)}
            // onBlur={() => setPasswordFocus(false)}
            />
          </View>
          <Image
            src={eye ? EyeOpenIcon : EyeCloseIcon}
            className="login-eye"
            onClick={e => setEye(!eye)}
          />
        </View>
        <Button
          onClick={handleLoginClick}
          className="login-button"
          loading={wait}
        >登录
        </Button>
      </View>
      <Toptips show={loginTip.show} msg={loginTip.msg} type={loginTip.type}></Toptips>
    </View>
  )
}
