function View(controller) {
  // select elements managed by the View layer
  const createItemTextInput = document.querySelector("#todo-text");
  const createItemButton = document.querySelector("#create-item-button");
  const completedList = document.querySelector("#completed-list");
  const incompleteList = document.querySelector("#incomplete-list");

  //-- UTILS --//
  const getItemComponent = itemButton => itemButton.parentElement;

  const appendItemToList = (itemComponent, targetList) =>
    targetList.appendChild(itemComponent);

  const renderList = (items, targetList) => {
    for (item of items) {
      const itemComponent = buildItemComponent(item, handleActionButtonClick);
      appendItemToList(itemComponent, targetList);
    }
  };

  //-- ACTIONS --//
  const addNewItem = clickHandler => {
    const newItemText = createItemTextInput.value;
    if (!newItemText) return; // exit early if text is empty

    createItemTextInput.value = ""; // reset input value

    const newItem = controller.handleCreateItem(newItemText);
    const itemComponent = buildItemComponent(newItem, clickHandler);

    appendItemToList(itemComponent, incompleteList);
  };

  const moveItemToCompletedList = itemButton => {
    const updatedItem = controller.handleCompleteItem(itemButton.id);
    updateItemButton(updatedItem, itemButton);

    const itemComponent = getItemComponent(itemButton);
    appendItemToList(itemComponent, completedList);
  };

  const removeItem = itemButton => {
    controller.handleDeleteItem(itemButton.id);

    // removes item component node from DOM
    getItemComponent(itemButton).remove();
  };

  //-- ACTION HANDLER --//
  const handleActionButtonClick = function(event) {
    const { target } = event; // the clicked button

    // every button has a custom "action-type" attribute configured
    switch (target.getAttribute("action-type")) {
      case "create":
        event.preventDefault(); // prevent form default behavior
        return addNewItem(handleActionButtonClick);
      case "complete":
        return moveItemToCompletedList(target);
      case "delete":
        return removeItem(target);
    }
  };

  // only exposed method: initializes the View layer
  // all other functions are only accessible internally
  this.init = () => {
    configureCreateItemButton(createItemButton, handleActionButtonClick);

    const items = controller.handleGetItems();
    renderList(items.completed, completedList);
    renderList(items.incomplete, incompleteList);
  };
}
