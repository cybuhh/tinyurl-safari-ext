import { getApiToken, setApiToken } from './storage.js';

async function load() {
  try {
    const apiToken = await getApiToken();

    const apiTokenInput = document.getElementById("apiToken");
    if (apiTokenInput) apiTokenInput.value = apiToken || '';

    const appNameElem = document.getElementById('appName');
    if (appNameElem) {
      appNameElem.textContent = chrome.runtime.getManifest().name;
    }
  } catch (error) {
    document.getElementById("status").textContent = "Failed to load settings!";
  }
}

async function save() {
  const apiTokenInput = document.getElementById("apiToken");
  if (!apiTokenInput) return;

  const apiToken = apiTokenInput.value;
  if (!apiToken) {
    document.getElementById("status").textContent = "API token cannot be empty!";
    return;
  }

  try {
    await setApiToken(apiToken);
    document.getElementById("status").textContent = "Settings saved!";
  } catch (error) {
    document.getElementById("status").textContent = "Failed to save settings!";
  }
  setTimeout(() => { document.getElementById("status").textContent = ""; }, 2000);
}

document.addEventListener("DOMContentLoaded", load);
document.getElementById("save").addEventListener("click", save);
