const buildButton = (id, text, classes = "") => {
  const button = document.createElement("button");

  button.id = id;
  button.innerText = text;
  button.className = classes;

  return button;
};

const buildListItem = (text, classes = "") => {
  const listItem = document.createElement("li");

  listItem.innerText = text;
  listItem.className = classes;

  return listItem;
};

const buildItemButtonText = item => `[${item.completed ? "✘" : "✓"}]`;

const configureItemButtonAction = (item, itemButton) =>
  itemButton.setAttribute(
    "action-type",
    item.completed ? "delete" : "complete",
  );

const buildItemButton = (item, clickHandler) => {
  const buttonText = buildItemButtonText(item);
  const itemButton = buildButton(item.id, buttonText);

  itemButton.addEventListener("click", clickHandler);
  configureItemButtonAction(item, itemButton);

  return itemButton;
};

const updateItemButton = (item, itemButton) => {
  itemButton.innerText = buildItemButtonText(item);
  configureItemButtonAction(item, itemButton);
};

const buildItemComponent = (item, clickHandler) => {
  const listItem = buildListItem(item.text);
  const itemButton = buildItemButton(item, clickHandler);
  listItem.appendChild(itemButton);

  return listItem;
};

const configureCreateItemButton = (createItemButton, clickHandler) => {
  createItemButton.setAttribute("action-type", "create");
  createItemButton.addEventListener("click", clickHandler);
};
