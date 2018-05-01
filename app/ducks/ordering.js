import {
  FETCH_ORDERING_BEGIN,
  FETCH_ORDERING_SUCCESS,
  FETCH_ORDERING_ERROR,
  ORDERING_CHANGED
} from '../lib/actions/ordering'

import { ADMIN_SIGNED_OUT } from 'ducks/admin'

const initialState = {
  items: [],
  loading: false,
  error: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDERING_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      }

    case FETCH_ORDERING_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.items
      }

    case FETCH_ORDERING_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        items: []
      }

    case ORDERING_CHANGED: {
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
