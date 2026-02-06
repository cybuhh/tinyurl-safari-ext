export async function getActiveTabDetails() {
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
