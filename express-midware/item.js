const items = require("./fakeDB");

class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;
    items.push(this);
  }

  static getAllItems() {
    return items;
  }

  static findItem(name) {
    const Item = items.find((item) => item.name === name);
    if (Item === undefined) {
      throw { message: "Item Not Found", status: 404 };
    }
    return Item;
  }

  static updateItem(name, data) {
    let foundItem = Item.findItem(name);
    if (foundItem === undefined) {
      throw {message: "Not Found", status: 404}
    }
    foundItem.name = data.name;
    foundItem.price = data.price;

    return foundItem;
  }
  static removeItem(name) {
    let itemIndex = items.findIndex(item => item.name === name);
    if (itemIndex === -1) {
      throw {message: "Item Not Found", status: 404}
    }
    items.splice(itemIndex, 1);
  }
}
module.exports = Item;
