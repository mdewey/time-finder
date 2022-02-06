// state is the current value of our state object

import {
  AppState,
} from '../context/useBrowserHistoryContext'

type Action =
  | { type: 'ADDED_HISTORY'; value: Array<any> }


// action is the data we received from our dispatch
const reducerFunction = (state: AppState, action: Action): AppState => {
  console.log({ action, state })
  switch (action.type) {
    case 'ADDED_HISTORY':
      return { ...state, history: [...action.value] }
    default:
      return {...state}
  }
}

export default reducerFunction