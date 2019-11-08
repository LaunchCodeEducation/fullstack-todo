function Model() {
  // mock data store
  const store = {
    nextId: 0, // "auto-incrementing" id
    items: [], // stored items
  };

  // private constructor
  function ToDo(text, id) {
    this.id = id;
    this.text = text;
    this.completed = false;

    this.setComplete = function() {
      this.completed = true;
    };
  }

  //-- public CRUD methods --//
  this.getItems = () => store.items;

  this.addItem = itemText => {
    const id = ++store.nextId;
    const newToDo = new ToDo(itemText, id);

    store.items = [...store.items, newToDo];

    return newToDo;
  };

  this.markItemComplete = itemId => {
    const targetItem = store.items.find(item => item.id === Number(itemId));
    if (!targetItem) {
      throw new Error(`item with id ${itemId} not found`);
    }

    targetItem.setComplete();
    return targetItem;
  };

  this.deleteItem = itemId => {
    store.items = store.items.filter(item => item.id !== Number(itemId));
  };
}
