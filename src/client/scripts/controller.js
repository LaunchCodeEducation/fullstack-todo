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

  this.handleGetItems = () => {
    const allItems = model.getItems();

    return sortInitialItems(allItems);
  };

  this.handleCreateItem = todoText => model.addItem(todoText);

  this.handleCompleteItem = itemId => model.markItemComplete(itemId);

  this.handleDeleteItem = itemId => model.deleteItem(itemId);
}
