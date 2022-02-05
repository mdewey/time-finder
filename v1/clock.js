(() => {
  setInterval(() => {
    const today = new Date();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    document.querySelector('#clock').innerHTML = time;
  }, 500)
})();
