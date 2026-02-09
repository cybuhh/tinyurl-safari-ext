const SETTINGS_KEY = "settings";

const getStorage = (key) =>
  new Promise((resolve, reject) => {
    chrome.storage.local.get(key, (result) => {
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }
      resolve(result);
    });
  });

export async function getApiToken() {
  const { settings = {} } = await getStorage(SETTINGS_KEY);
  const { apiToken } = settings;
  return apiToken;
}

export function setApiToken(apiToken) {
  const settings = { apiToken };
  return chrome.storage.local.set({ settings });
}
