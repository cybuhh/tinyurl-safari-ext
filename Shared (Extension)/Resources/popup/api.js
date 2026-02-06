import { getApiToken } from "./storage.js";

export async function shortenUrl({ url, alias, description }) {
  const apiToken = await getApiToken();
  const fetchUrl = `https://api.tinyurl.com/create?api_token=${apiToken}`;
  const payload = {
    url,
    alias: alias.length >= 5 ? alias : "",
    description,
    domain: "tinyurl.com",
  };

  const request = await fetch(fetchUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const json = await request.json();

  return json.data.tiny_url;
}
