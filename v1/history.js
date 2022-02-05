const historyDiv = document.querySelector('#history');


const addHistoryItems = (items) => {
  items.forEach(item => {
    addHistoryItem(item);
  });
}


const addHistoryItem = (domain, item) => {
  const html = createHistoryListItem(domain, item);
  historyDiv.appendChild(createHistoryNode(html));
}

const createHistoryNode = (item) => {
  const template = document.createElement('template');
  template.innerHTML = item;
  return template.content.childNodes[0];
}

const createHistoryListItem = (item) => {
  const { domain, count } = item;
  return `<li><span>${domain}</span><span>${count}</span></li> `;
}

const getDomain = (url) => {
  const domain = url.split('/')[2];
  return domain.split(':')[0];
}

(() => {
  const msSinceMidnight = new Date() - new Date().setHours(0, 0, 0, 0);
  chrome.history.search({
    'text': '',              // Return every history item....
    'startTime': msSinceMidnight  // that was accessed less than one week ago.
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
    Object.keys(historyItemsByUrl)
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
      .filter(f => f.count > 1)
      .forEach(domain => {
        console.log(domain)
        addHistoryItem(domain);
      });

  });
})();


