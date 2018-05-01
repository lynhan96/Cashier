import request from 'request-promise'
import { showNotification } from './showNotification'
import { makeRequestOptions } from '../requestHeader'

export const FETCH_FOOD_CATEGORIES_BEGIN = 'FETCH_FOOD_CATEGORIES_BEGIN'
export const FETCH_FOOD_CATEGORIES_SUCCESS = 'FETCH_FOOD_CATEGORIES_SUCCESS'
export const FETCH_FOOD_CATEGORIES_ERROR = 'FETCH_FOOD_CATEGORIES_ERROR'

export const fetchFoodCategoriesBegin = () => ({
  type: FETCH_FOOD_CATEGORIES_BEGIN
})

export const fetchFoodCategoriesSuccess = foodCategories => ({
  type: FETCH_FOOD_CATEGORIES_SUCCESS,
  foodCategories: foodCategories
})

export const fetchFoodCategoriesError = error => ({
  type: FETCH_FOOD_CATEGORIES_ERROR,
  error: error
})

export const fetchFoodCategories = params => {
  return dispatch => {
    dispatch(fetchFoodCategoriesBegin())
    request(makeRequestOptions(params, 'foodCategories')).then(body => {
      if (body.code === 401 || body.code === 400 || body.code === 414) {
        showNotification('topRight', 'error', 'Quá trình xác thực xảy ra lỗi!')
      } else {
        dispatch(fetchFoodCategoriesSuccess(body.data.items))
      }
    })
    .catch(err => dispatch(fetchFoodCategoriesError(err)))
  }
}
