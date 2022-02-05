import React, {useEffect, useState} from 'react';

const ShowHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const getDomain = (url) => {
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
        const url = item.url;
        const domain = getDomain(url);
        if (!acc[domain]) {
          acc[domain] = [];
        }
        acc[domain].push(item);
        return acc;
      }
        , {});
      //convert object to array
      const items = Object.keys(historyItemsByUrl)
        .map(key => {
          if (!key) return null;
          return {
            domain: key,
            items: historyItemsByUrl[key],
            count: historyItemsByUrl[key]?.length
          }
        })
        .filter(f => f)
        .filter(f => {
          const urlsToIgnore = [
            'www.google.com',
            'messages.google.com',
            'github.com'
          ];
          return !urlsToIgnore.includes(f.domain);
        })
        .sort((a, b) => {
          return b.count - a.count;
        })
        .filter((f, i) => i < 10)
        .filter(f => f.count > 1);  
        setHistory(items);      
    });
  
  }, []);


  return (
      <ol id="history">
        {history.map((item, index) => {
          const { domain, count } = item;
          return <li key={index}><span>{domain}</span><span>{count}</span></li>
        })}
      </ol>
  );
}

export default ShowHistory;
