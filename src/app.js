import * as React from 'react'
import './app.css';

export const AppContext = React.createContext({})

const App = ({ children }) => {
  const [context, setContext] = React.useState({
    userInfo: {
      userKey: ''
    },
    semesterInfo: {},
    eventsData: ['', '', '', '', '', '', '', ''],  // 目前是8个
    localEventsData: ['', '', '', '', '', '', '', ''],
    changeEventsData: () => { }
  })


  return (
    <AppContext.Provider
      value={{
        context,
        setContext
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default App;
