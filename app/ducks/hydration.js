const HYDRATION_COMPLETED = 'HYDRATION_COMPLETED'

const defaultState = {
  completed: false
}

const hydrationReducer = (state = defaultState, action) => {
  const { type } = action
  switch (type) {
    case HYDRATION_COMPLETED:
      return {
        ...state,
        completed: true
      }
    default:
      return state
  }
}

export default hydrationReducer

export const markHydrationCompleted = () => {
  return { type: HYDRATION_COMPLETED }
}
