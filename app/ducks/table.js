import {
  FETCH_TABLE_SUCCESS,
  FETCH_TABLE_BEGIN,
  FETCH_TABLE_END,
  TABLE_CHANGED
} from '../lib/actions/table'
import { ADMIN_SIGNED_OUT } from 'ducks/admin'

const initialState = {
  items: {},
  loading: false,
  error: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TABLE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      }

    case FETCH_TABLE_END:
      return {
        ...state,
        loading: false,
        error: null
      }

    case FETCH_TABLE_SUCCESS:
      return {
        ...state,
        items: action.items,
        loading: false,
        error: null
      }

    case TABLE_CHANGED: {
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
