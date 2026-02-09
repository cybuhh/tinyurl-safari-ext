import { getActiveTabDetails } from "./browser.js";
import {
  handleCreateButton,
  handleCopyButton,
  handleClearButton,
} from "./buttonsHandlers.js";
import {
  createButton,
  descriptionInput,
  copyButton,
  clearButtons,
} from "./ui.js";

createButton.addEventListener("click", handleCreateButton);
copyButton.addEventListener("click", handleCopyButton);
clearButtons.forEach(button => button.addEventListener("click", handleClearButton));

const { title } = (await getActiveTabDetails()) || {};
descriptionInput.value = title;
