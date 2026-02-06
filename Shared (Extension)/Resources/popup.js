import { getActiveTabDetails } from "./browser.js";
import { handleCreateButton, handleCopyButton } from "./buttonsHandlers.js";
import { createButton, descriptionInput, copyButton } from "./ui.js";

createButton.addEventListener("click", handleCreateButton);
copyButton.addEventListener("click", handleCopyButton);
// clearButton.addEventListener("click", handleClearButton);

const { title } = (await getActiveTabDetails()) || {};
descriptionInput.value = title;
