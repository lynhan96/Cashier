import {
  FETCH_NOTIFICATION_SUCCESS,
  NOTIFICATION_CHANGED
} from '../lib/actions/notification'
import { ADMIN_SIGNED_OUT } from 'ducks/admin'

const initialState = {
  items: {},
  loading: false,
  error: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOTIFICATION_SUCCESS:
      return {
        ...state,
        items: action.items,
        loading: true,
        error: null
      }

    case NOTIFICATION_CHANGED: {
      const { id } = action.item

      return {
        ...state,
        items: {
          ...state.items,
          [id]: action.item
        }
      }
    }

    case ADMIN_SIGNED_OUT:
      return {...initialState}
    default:
      return state
  }
}

export default reducer
