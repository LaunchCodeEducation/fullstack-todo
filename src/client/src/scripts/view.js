function View(controller) {
  // select elements managed by the View layer
  const createItemTextInput = document.querySelector("#todo-text");
  const createItemButton = document.querySelector("#create-item-button");
  const completedList = document.querySelector("#completed-list");
  const incompleteList = document.querySelector("#incomplete-list");

  // can be expanded to check the type of error and render appropriate error messages in the UI
  const handleError = error => console.error({ error });

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

    controller
      .handleCreateItem(newItemText)
      .then(newItem => {
        createItemTextInput.value = ""; // reset input value

        const itemComponent = buildItemComponent(newItem, clickHandler);
        appendItemToList(itemComponent, incompleteList);
      })
      .catch(handleError);
  };

  const moveItemToCompletedList = itemButton =>
    controller
      .handleCompleteItem(itemButton.id)
      .then(updatedItem => {
        updateItemButton(updatedItem, itemButton);

        const itemComponent = getItemComponent(itemButton);
        appendItemToList(itemComponent, completedList);
      })
      .catch(handleError);

  const removeItem = itemButton =>
    controller
      .handleDeleteItem(itemButton.id)
      .then(() => getItemComponent(itemButton).remove())
      .catch(handleError);

  //-- HANDLERS --//
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
    controller
      .handleGetCurrentItems()
      .then(items => {
        renderList(items.completed, completedList);
        renderList(items.incomplete, incompleteList);
      })
      .catch(handleError);
  };
}
