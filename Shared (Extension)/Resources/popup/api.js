const getApiToken = () => new Promise((resolve) => {
  chrome.storage.local.get("settings", ({ settings = {} }) => {
    resolve(settings.apiToken || "");
  });
});

export async function shortenUrl({ url, alias, description }) {
//  return new Promise((resolve, reject) => {
    // reject(new Error("foo"));
//    setTimeout(() => resolve("foo"), 1500);
//  });

  const apiToken = await getApiToken();
  const payload = {
    url,
    alias: alias.length >= 5 ? alias : '',
    description,
    domain: "tinyurl.com"
  };

  const request = await fetch(
    `https://api.tinyurl.com/create?api_token=${apiToken}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }
  );
  const json = await request.json();

  return json.data.tiny_url;
}
