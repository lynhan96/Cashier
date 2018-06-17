import * as firebase from 'firebase'
import { getAdminData, getNotificationState } from 'lib/Constant'

import { viewWebBrowserNotification } from 'ducks/webBrowserNotification'

export const FETCH_NOTIFICATION_SUCCESS = 'FETCH_NOTIFICATION_SUCCESS'
export const NOTIFICATION_CHANGED = 'NOTIFICATION_CHANGED'

export const fetchNotificationSuccess = items => ({
  type: FETCH_NOTIFICATION_SUCCESS,
  items
})

export const fetchNotifications = () => (dispatch) => {
  if (getAdminData() == null) {
    return
  }

  const ref = firebase.database().ref(getAdminData().vid + '/notifications/')

  ref.orderByChild('type').equalTo('cashier').once('value', (result) => {
    dispatch(fetchNotificationSuccess(result.val()))
  })

  ref.orderByChild('type').equalTo('cashier').on('child_added', (result) => {
    const notifications = getNotificationState().items

    if (result.val() !== null && !notifications[result.val().id]) {
      const title = 'Bạn có thông báo mới'
      const options = {
        tag: Date.now(),
        body: result.val().message,
        icon: 'images/Notifications_button_24.png',
        lang: 'en',
        dir: 'ltr',
        sound: 'sound/sound.mp3'
      }

      let items = getNotificationState().items
      items[result.val().id] = result.val()

      dispatch(fetchNotificationSuccess(items))

      dispatch(viewWebBrowserNotification(title, options))
    }
  })
}

export const markReadMessage = (messageId) => (dispatch) => {
  const notifications = getNotificationState().items
  let currentNotification = notifications[messageId]
  currentNotification.read = 'yes'

  firebase.database().ref(getAdminData().vid + '/notifications/').child(messageId).set(currentNotification)
}
