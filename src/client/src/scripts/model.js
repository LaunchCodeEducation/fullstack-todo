function Model() {
  const apiURL = "http://localhost:8008";
  const baseEndpoint = `${apiURL}/todos`;

  const buildItemEndpoint = itemId => `${baseEndpoint}/${itemId}`;

  this.getItems = () => betterFetch(baseEndpoint);

  this.addItem = text => postJSON(baseEndpoint, { text });

  this.markItemComplete = itemId => {
    const endpoint = buildItemEndpoint(itemId);
    return betterFetch(endpoint, {
      method: "PATCH",
    });
  };

  this.deleteItem = itemId => {
    const endpoint = buildItemEndpoint(itemId);
    return betterFetch(endpoint, {
      method: "DELETE",
    });
  };
}
