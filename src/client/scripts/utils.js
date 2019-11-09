const buildButton = (id, text, classes = "") => {
  const button = document.createElement("button");

  button.id = id;
  button.innerText = text;
  button.className = classes;

  return button;
};

const buildListItem = (
  text,
  classes = "mui-panel mui--text-dark mui--text-display1",
) => {
  const listItem = document.createElement("li");
  listItem.className = classes;

  const textSpan = document.createElement("span");
  textSpan.classList.add("item-text");
  textSpan.innerText = text;

  listItem.appendChild(textSpan);
  return listItem;
};

const buildItemButtonStyle = item =>
  `mui-btn mui-btn--small mui-btn--${
    item.completed ? "danger" : "primary"
  } mui-btn--fab`;

const buildItemButtonText = item => `${item.completed ? "✘" : "✓"}`;

const configureItemButtonAction = (item, itemButton) =>
  itemButton.setAttribute(
    "action-type",
    item.completed ? "delete" : "complete",
  );

const buildItemButton = (item, clickHandler) => {
  const buttonText = buildItemButtonText(item);
  const buttonStyle = buildItemButtonStyle(item);
  const itemButton = buildButton(item.id, buttonText, buttonStyle);

  itemButton.addEventListener("click", clickHandler);
  configureItemButtonAction(item, itemButton);

  return itemButton;
};

const updateItemButton = (item, itemButton) => {
  itemButton.innerText = buildItemButtonText(item);
  itemButton.className = buildItemButtonStyle(item);
  configureItemButtonAction(item, itemButton);
};

const buildItemComponent = (item, clickHandler) => {
  const listItem = buildListItem(item.text);
  const itemButton = buildItemButton(item, clickHandler);
  listItem.insertAdjacentElement("afterbegin", itemButton);

  return listItem;
};

const configureCreateItemButton = (createItemButton, clickHandler) => {
  createItemButton.setAttribute("action-type", "create");
  createItemButton.addEventListener("click", clickHandler);
};
