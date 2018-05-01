import * as firebase from 'firebase'
import { getAdminData, getNotificationState } from 'lib/Constant'

export const FETCH_NOTIFICATION_SUCCESS = 'FETCH_NOTIFICATION_SUCCESS'
export const NOTIFICATION_CHANGED = 'NOTIFICATION_CHANGED'
import { viewWebBrowserNotification } from 'ducks/webBrowserNotification'

export const fetchNotificationSuccess = items => ({
  type: FETCH_NOTIFICATION_SUCCESS,
  items
})

export const fetchNotifications = () => (dispatch) => {
  const ref = firebase.database().ref(getAdminData().vid + '/notifications/')

  ref.orderByChild('type').equalTo('kitchen').on('value', (result) => {
    dispatch(fetchNotificationSuccess(result.val()))
  })

  ref.orderByChild('type').equalTo('kitchen').on('child_added', (result) => {
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
