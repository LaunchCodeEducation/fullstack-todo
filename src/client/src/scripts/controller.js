function Controller(model) {
  const sortInitialItems = items =>
    items.reduce(
      (filteredItems, item) => {
        if (item.completed) {
          filteredItems.completed = [...filteredItems.completed, item];
        } else {
          filteredItems.incomplete = [...filteredItems.incomplete, item];
        }

        return filteredItems;
      },
      { completed: [], incomplete: [] },
    );

  this.handleGetCurrentItems = async () =>
    model.getItems().then(sortInitialItems);

  this.handleCreateItem = todoText => {
    if (!todoText) {
      throw new Error("ToDo text is empty");
    }

    return model.addItem(todoText);
  };

  this.handleCompleteItem = itemId => model.markItemComplete(itemId);

  this.handleDeleteItem = itemId => model.deleteItem(itemId);
}
