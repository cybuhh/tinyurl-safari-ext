async function load() {
  chrome.storage.local.get('settings', ({ settings = {} }) => {
    document.getElementById("apiToken").value = settings.apiToken || '';
  });
  document.getElementById('appName').textContent = chrome.runtime.getManifest().name;
}

async function save() {
  const settings = {
    apiToken: document.getElementById("apiToken").value
  };
  await chrome.storage.local.set({settings});
  document.getElementById("status").textContent = "Settings saved!";
  setTimeout(() => { document.getElementById("status").textContent = ""; }, 2000);
}

document.addEventListener("DOMContentLoaded", load);
document.getElementById("save").addEventListener("click", save);
