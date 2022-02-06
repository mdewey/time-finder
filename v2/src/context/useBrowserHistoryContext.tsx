import { createContext, useContext } from 'react'


export interface AppState {
  history: Array<any>
}

export interface AppContextInterface {
  state: AppState
  dispatch: any
}

// Used to setup the provider
export const BrowserHistoryContext = createContext<AppContextInterface>(
  {} as AppContextInterface
)

// Used to be able to get data from the context
export const useBrowserHistoryContext = () => useContext(BrowserHistoryContext)