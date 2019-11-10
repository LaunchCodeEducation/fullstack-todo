const buildItemButtonText = item => `${item.completed ? "✘" : "✓"}`;

const buildItemButtonStyle = item => {
  const buttonColor = item.completed ? "danger" : "primary";

  return `mui-btn mui-btn--small mui-btn--${buttonColor} mui-btn--fab`;
};

const configureItemActionButton = (item, itemActionButton, clickHandler) => {
  itemActionButton.innerText = buildItemButtonText(item);
  itemActionButton.setAttribute(
    "action-type",
    item.completed ? "delete" : "complete",
  );

  itemActionButton.className = buildItemButtonStyle(item);
  itemActionButton.addEventListener("click", clickHandler);
};

const configureCreateItemButton = (createItemButton, clickHandler) => {
  createItemButton.setAttribute("action-type", "create");
  createItemButton.addEventListener("click", clickHandler);
};

const buildItemActionButton = (item, clickHandler) => {
  const itemActionButton = document.createElement("button");
  itemActionButton.id = item.id;

  configureItemActionButton(item, itemActionButton, clickHandler);

  return itemActionButton;
};

const buildItemComponent = (item, clickHandler) => {
  const itemText = document.createElement("span");
  itemText.classList.add("item-text");
  itemText.innerText = item.text;

  const itemActionButton = buildItemActionButton(item, clickHandler);

  const itemComponent = document.createElement("li");
  itemComponent.appendChild(itemText);
  itemComponent.insertAdjacentElement("afterbegin", itemActionButton);
  itemComponent.className = "mui-panel mui--text-dark mui--text-display1";

  return itemComponent;
};
