import { RESET_DELAY, ICONS } from "./consts.js";

export const setGenerateButtonIcon = (classList) =>
  (document.getElementById("generateButtonIcon").classList = classList);
export const setCopyButtonIcon = (classList) =>
  (document.getElementById("copyButtonIcon").classList = classList);

export function deleyedResetGenerateButton() {
  setTimeout(() => {
    setGenerateButtonIcon(ICONS.generate);
  }, RESET_DELAY);
}

export function deleyedResetCopyButton() {
  setTimeout(() => {
    setCopyButtonIcon(ICONS.copy);
  }, RESET_DELAY);
}

export const descriptionInput = document.getElementById("descriptionInput");
export const createButton = document.getElementById("createButton");
export const copyButton = document.getElementById("copyButton");
export const clearButton = document.getElementById("clearButton");
export const shortUrlInput = document.getElementById("shortUrl");
export const aliasInput = document.getElementById("aliasInput");
