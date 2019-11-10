function Controller() {
  const apiURL = "http://localhost:8008";
  const baseEndpoint = `${apiURL}/todos`;

  const buildItemEndpoint = itemId => `${baseEndpoint}/${itemId}`;

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
    betterFetch(baseEndpoint).then(sortInitialItems);

  this.handleCreateItem = text => {
    if (!text) {
      throw new Error("ToDo text is empty");
    }

    return postJSON(baseEndpoint, { text });
  };

  this.handleCompleteItem = itemId => {
    const endpoint = buildItemEndpoint(itemId);

    return betterFetch(endpoint, {
      method: "PATCH",
    });
  };

  this.handleDeleteItem = itemId => {
    const endpoint = buildItemEndpoint(itemId);

    return betterFetch(endpoint, {
      method: "DELETE",
    });
  };
}
