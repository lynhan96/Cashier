import {
  FETCH_FOOD_CATEGORIES_BEGIN,
  FETCH_FOOD_CATEGORIES_SUCCESS,
  FETCH_FOOD_CATEGORIES_ERROR
} from '../lib/actions/foodCategory'

import { ADMIN_SIGNED_OUT } from 'ducks/admin'

const initialState = {
  items: [],
  loading: false,
  error: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FOOD_CATEGORIES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      }

    case FETCH_FOOD_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.foodCategories
      }

    case FETCH_FOOD_CATEGORIES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        items: []
      }

    case ADMIN_SIGNED_OUT:
      return {...initialState}
    default:
      return state
  }
}

export default reducer
