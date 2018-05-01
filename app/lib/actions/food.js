import request from 'request-promise'
import { showNotification } from './showNotification'
import { makeRequestOptions } from '../requestHeader'

export const FETCH_FOOD_BEGIN = 'FETCH_FOOD_BEGIN'
export const FETCH_FOOD_SUCCESS = 'FETCH_FOOD_SUCCESS'
export const FETCH_FOOD_ERROR = 'FETCH_FOOD_ERROR'

export const fetchFoodsBegin = () => ({
  type: FETCH_FOOD_BEGIN
})

export const fetchFoodsSuccess = foods => ({
  type: FETCH_FOOD_SUCCESS,
  items: foods
})

export const fetchFoodsError = error => ({
  type: FETCH_FOOD_ERROR,
  error: error
})

export const fetchFoods = params => {
  return dispatch => {
    dispatch(fetchFoodsBegin())
    request(makeRequestOptions({limit: 100000}, 'foods')).then(body => {
      if (body.code === 401 || body.code === 400 || body.code === 414) {
        showNotification('topRight', 'error', 'Quá trình xác thực xảy ra lỗi!')
      } else {
        dispatch(fetchFoodsSuccess(body.data.items))
      }
    })
    .catch(err => dispatch(fetchFoodsError(err)))
  }
}

export const changeFoodStatus = (foodId, status) => {
  return dispatch => {
    const params = {foodId: foodId, status: status}

    request(makeRequestOptions(params, 'changeFoodStatus')).then(body => {
      if (body.code === 401 || body.code === 400) {
        showNotification('topRight', 'error', 'Quá trình cập nhập xảy ra lỗi!')
      } else {
        dispatch(fetchFoods())
      }

      return null
    })
    .catch(err => dispatch(fetchFoodsError(err)))
  }
}
