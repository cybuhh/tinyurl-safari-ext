async function getActiveTabTitle() {
  const tabQuery = { active: true, currentWindow: true };
  let tabs;
  if (typeof chrome !== "undefined" && chrome.tabs) {
    tabs = await chrome.tabs.query(tabQuery);
  } else if (typeof browser !== "undefined" && browser.tabs) {
    tabs = await browser.tabs.query(tabQuery);
  }
  if (tabs && tabs[0]) {
    return {
      title: tabs[0].title,
      url: tabs[0].url,
    };
  }
  return null;
}

async function getApiToken() {
  return new Promise(resolve => {
    chrome.storage.local.get('settings', ({ settings = {} }) => {
      resolve(settings.apiToken || '');
    });
  });
}

async function shortenUrl() {
  const apiToken = await getApiToken();
  const { title, url } = await getActiveTabTitle() || {};
  const payload = {
    url,
    "description": title,
    "domain": "tinyurl.com"
  };

  const request = await fetch(`https://api.tinyurl.com/create?api_token=${apiToken}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload)
  });
  const json = await request.json();

  return json.data.tiny_url;
}

const icon = document.getElementById('icon')
const copyBtn = document.getElementById('actionButton');

try {
  const shortUrl = await shortenUrl();
  icon.classList.remove('loader');
  icon.classList.add('icon', 'icon-copy');
  
  copyBtn.addEventListener('click', ()=> {
    navigator.clipboard.writeText(shortUrl);
    window.close();
  });
} catch {
  icon.classList.remove('loader');
  icon.classList.add('icon', 'icon-close');
}
