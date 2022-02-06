import React  from 'react';
import { useBrowserHistoryContext } from '../context/useBrowserHistoryContext';


const ShowHistory = (): JSX.Element => {
  const context = useBrowserHistoryContext()
  const { history } = context.state
  return <ol id="history">
    {history.map((item, index) => {
      const { domain, count } = item;
      return <li key={index}><span>{domain}</span><span>{count}</span></li>;
    })}
  </ol>

}

export default ShowHistory;
