import { groceryItems } from "./data.js";
import { createItems } from "./items.js";

let items = groceryItems;

import { createForm } from "./form.js";

let editId = null;

// Render App
function render() {
  const app = document.getElementById("app");
  app.innerHTML = " ";

  const formElement = createForm(
    editId,
    editId ? items.find((item) => item.id === editId) : null,
  ); // edited line
  const itemsElement = createItems(items);

  app.append(formElement);
  app.append(itemsElement);
}
render();

// Generate unique ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

// Add Item Function
export function addItem(itemName) {
  const newItem = {
    name: itemName,
    completed: false,
    id: generateId(),
  };
  items = [...items, newItem];
  render();
  setTimeout(() => alert("Item Added Successfully!"), 0);
}

// Edit Completed Function
export function editCompleted(id) {
  items = items.map((item) => {
    if (item.id === id) {
      return { ...item, completed: !item.completed };
    }
    return item;
  });
  render();
}

//delete function
export function deleteItem(id) {
  items = items.filter((item) => item.id !== id);

  render();

  setTimeout(() => {
    alert("Item deleted successfully!");
  }, 0);
}

export function updateItemName(newName) {
  items = items.map((item) => {
    if (item.id === editId) {
      return { ...item, name: newName };
    }
    return item;
  });
  editId = null;
  render();
  setTimeout(() => alert("Item Updated Successfully!"), 0);
}


// Set Edit ID Function
export function setEditId(itemId) {
  editId = itemId;
  render();

  // Focus input after render
  setTimeout(() => {
    const input = document.querySelector(".form-input");
    if (input) {
      input.focus();
    }
  }, 0);
}
