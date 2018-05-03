import { ADMIN_SIGNED_OUT } from 'ducks/admin'

export const CHANGE_MODAL_STATUS = 'CHANGE_MODAL_STATUS'

export const changeOrderModal = value => dispatch => {
  dispatch({type: CHANGE_MODAL_STATUS, orderModal: value})
}

const initialState = {
  orderModal: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_MODAL_STATUS:
      return {
        ...state,
        orderModal: action.orderModal
      }

    case ADMIN_SIGNED_OUT:
      return {...initialState}
    default:
      return state
  }
}

export default reducer
