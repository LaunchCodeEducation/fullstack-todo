const buildButton = (id, text = "", classes = "") => {
  const button = document.createElement("button");

  button.id = id;
  button.innerText = text;
  button.className = classes;

  return button;
};

const buildListItem = (
  text = "",
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

const buildItemButtonText = item => `${item.completed ? "✘" : "✓"}`;

const buildItemButtonStyle = item => {
  const buttonColor = item.completed ? "danger" : "primary";

  return `mui-btn mui-btn--small mui-btn--${buttonColor} mui-btn--fab`;
};

const configureItemActionButton = (item, itemActionButton) => {
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
  const itemActionButton = buildButton(item.id);
  configureItemActionButton(item, itemButton, clickHandler);

  return itemActionButton;
};

const buildItemComponent = (item, clickHandler) => {
  const listItem = buildListItem(item.text);
  const itemButton = buildItemButton(item, clickHandler);
  listItem.insertAdjacentElement("afterbegin", itemButton);

  return listItem;
};
