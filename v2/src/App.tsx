
import { useState, useEffect, useReducer, useCallback } from 'react';
import './App.css';
import Clock from './components/Clock';
import ShowHistory from './components/ShowHistory';
import Title from './components/Title';
import { AppContextInterface, AppState, BrowserHistoryContext } from './context/useBrowserHistoryContext';
import reducerFunction from './reducer/historyReducer';
import data from './components/test-data/data.json'


interface IHistoryItem{
  domain: string;
  items: any[];
  count: number;
}

function App() {

  const [state, dispatch] = useReducer(reducerFunction, {
    history: []
  } as AppState)

  const context = { state, dispatch } as AppContextInterface

  const setHistory = useCallback((historyItems: Array<IHistoryItem>) => {
    dispatch({ type: 'ADDED_HISTORY', value: historyItems });
  }, [])

  const loadTestData = useCallback( () => {
    setHistory(data);
  }, [setHistory])
  
  const loadHistoryFromChrome = useCallback(() => {
    const getDomain = (url:string) => {
      const domain = url.split('/')[2];
      return domain.split(':')[0];
    }
    const midnight = new Date();
    midnight.setHours(0, 0, 0, 0);
    // eslint-disable-next-line no-undef
    chrome.history.search({
      'text': '',              // Return every history item....
      'startTime': midnight.getTime()  // that was accessed less than one week ago.
    }, (historyItems) => {
      
      // aggregate items based on url
      const historyItemsByUrl = historyItems.reduce((acc, item) => {
        const url = item.url as string;
        const domain = getDomain(url);
        if (!acc[domain]) {
          acc[domain] = [];
        }
        acc[domain].push(item);
        return acc;
      }
        , {} as any);
      //convert object to array
      const items = Object.keys(historyItemsByUrl)
        .map(key => {
          if (!key) return null;
          return {
            domain: key,
            items: historyItemsByUrl[key],
            count: historyItemsByUrl[key]?.length
          } as IHistoryItem;
        })
        .filter(f => f)
        .filter(f => {
          const urlsToIgnore = [
            'www.google.com',
            'messages.google.com',
            'github.com'
          ];
          if (!f || !f.domain) return false;
          return !urlsToIgnore.includes(f.domain);
        })
        .sort((a, b) => {
          if (!a || !b) return 0;
          return b.count - a.count;
        })
        .filter((f, i) => i < 8)
        .filter(f => {
         return f ? f.count > 1 : false;
        });  
      setHistory(items as Array<IHistoryItem>);
  });

  }, [setHistory])
  useEffect(() => {
    // eslint-disable-next-line no-undef
    if (chrome?.history) {
      loadHistoryFromChrome();
    }
    else {
      loadTestData();
    }
  }, [loadHistoryFromChrome, loadTestData]);


  return (
    <BrowserHistoryContext.Provider value={context}>
      <div className="App">
        <Title/>
        <Clock/>
        <ShowHistory />
      </div>
    </BrowserHistoryContext.Provider>
  );
}

export default App;
