import {
  FETCH_BOOKING_BEGIN,
  FETCH_BOOKING_SUCCESS,
  FETCH_BOOKING_ERROR,
  FETCH_BOOKING_SORT_VALUE,
  FETCH_BOOKING_TOTAL_PAGE
} from 'lib/actions/booking'

import { ADMIN_SIGNED_OUT } from 'ducks/admin'

const initialState = {
  items: [],
  loading: false,
  error: null,
  totalPage: 0,
  sortBy: 'id',
  sortType: 'AtoZ'
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKING_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      }

    case FETCH_BOOKING_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.items
      }

    case FETCH_BOOKING_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        items: []
      }

    case FETCH_BOOKING_SORT_VALUE:
      return {
        ...state,
        sortBy: action.sortBy,
        sortType: action.sortType
      }

    case FETCH_BOOKING_TOTAL_PAGE:
      return {
        ...state,
        totalPage: action.totalPage
      }

    case ADMIN_SIGNED_OUT:
      return {...initialState}
    default:
      return state
  }
}

export default reducer
