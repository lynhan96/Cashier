import { ADMIN_SIGNED_OUT } from 'ducks/admin'
const SHOW_WEB_NOTIFICATION_SUCCESS = 'SHOW_WEB_NOTIFICATION_SUCCESS'
const RESET_WEB_NOTIFICATION_SUCCESS = 'RESET_WEB_NOTIFICATION_SUCCESS'

export const viewWebBrowserNotification = (title, options) => dispatch => {
  dispatch({type: SHOW_WEB_NOTIFICATION_SUCCESS, title: title, options: options})
}

export const resetWebBrowserNotification = () => dispatch => {
  dispatch({type: RESET_WEB_NOTIFICATION_SUCCESS})
}

const initialState = {
  ignore: true,
  title: '',
  options: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_WEB_NOTIFICATION_SUCCESS:
      return {
        ...state,
        options: action.options,
        ignore: false,
        title: action.title
      }

    case RESET_WEB_NOTIFICATION_SUCCESS:
      return {...initialState}

    case ADMIN_SIGNED_OUT:
      return {...initialState}
    default:
      return state
  }
}

export default reducer
