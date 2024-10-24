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

chrome.runtime.onInstalled.addListener(async () => {
  const proxies = await fetchProxies();
  if (proxies.length > 0) {
    await setProxy(proxies[0]); // Устанавливаем первый прокси из списка
  }
});
