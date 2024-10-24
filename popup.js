document.getElementById('changeProxy').addEventListener('click', async () => {
  const proxies = await fetchProxies();
  const randomProxy = proxies[Math.floor(Math.random() * proxies.length)];
  await setProxy(randomProxy);
  alert(`Proxy changed to: ${randomProxy}`);
});

async function fetchProxies() {
  const response = await fetch('https://api.dkon.app/proxys/proxy.txt');
  const text = await response.text();
  return text.split('\n').filter(proxy => proxy.trim() !== '');
}

async function setProxy(proxy) {
  const config = {
    mode: "fixed_servers",
    rules: {
      singleProxy: {
        scheme: "http",
        host: proxy.split(':')[0],
        port: parseInt(proxy.split(':')[1])
      },
      bypassList: ["localhost"]
    }
  };
  await chrome.proxy.settings.set({ value: config, scope: 'regular' });
}
