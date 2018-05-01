import React from 'react'
import { connect } from 'react-redux'

import SideBar from 'components/layout/SideBar'
import Header from 'components/layout/Header'
import { ToastContainer } from 'react-toastify'
import Transition from 'react-transition-group/Transition'
import '../public/lib/cms/css/animate.css'
import '../public/lib/cms/css/hover.min.css'
import '../public/lib/cms/css/custom.css'
import 'styles/website.less'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import WebBrowserNotification from 'components/WebBrowserNotification'

const ZoomInAndOut = ({ children, position, ...props }) => (
  <Transition
    {...props}
    timeout={800}
    onEnter={ node => node.classList.add('zoomIn', 'animate')}
    onExit={node => {
      node.classList.remove('zoomIn', 'animate')
      node.classList.add('zoomOut', 'animate')
    }}
  >
    {children}
  </Transition>
)

const App = (props) => {
  const { children, signedIn } = props

  return (
     <MuiThemeProvider>
      <div className='wrapper'>
        <SideBar/>
        <div className='main-panel'>
          <Header />
          {children}
          {signedIn ? <WebBrowserNotification /> : <div/>}
          <ToastContainer transition={ZoomInAndOut}/>
        </div>
      </div>
    </MuiThemeProvider>
  )
}

const mapStateToProps = (state) => state.admin

export default connect(mapStateToProps)(App)
