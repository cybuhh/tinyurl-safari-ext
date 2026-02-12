import {
  deleyedResetGenerateButton,
  deleyedResetCopyButton,
  setGenerateButtonIcon,
  descriptionInput,
  shortUrlInput,
  aliasInput,
} from "./ui.js";
import { shortenUrl } from "./api.js";
import { getActiveTabDetails } from "./browser.js";
import { ICONS } from "./consts.js";

export async function handleCreateButton() {
  const { title, url } = (await getActiveTabDetails()) || {};
  const description = descriptionInput.value || title;
  const alias = aliasInput.value;
  setGenerateButtonIcon(ICONS.loading);

  try {
    const shortUrl = await shortenUrl({ url, description, alias });
    if (!shortUrl) {
      throw Error("Error generating short url");
    }
    shortUrlInput.value = shortUrl;
    setGenerateButtonIcon(ICONS.success);
  } catch {
    setGenerateButtonIcon(ICONS.error);
  } finally {
    deleyedResetGenerateButton();
  }
}

export async function handleCopyButton() {
  navigator.clipboard.writeText(shortUrlInput.value);
  setCopyButtonIcon(ICONS.copied);
  deleyedResetCopyButton();
}

export async function handleClearButton(ev) {
  ev.target
    .closest(".popup__fieldset")
    .querySelector(".popup__input")
    .value = "";
}
