import { groceryItems } from "./data.js";
import { createItems } from "./items.js";

let items = groceryItems;

import { createForm } from "./form.js";

// Render App
function render() {
  const app = document.getElementById("app");
  app.innerHTML = "";

  const formElement = createForm();
  const itemsElement = createItems(items);

  app.appendChild(formElement);
  app.appendChild(itemsElement);
}
render();
// Generate unique ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
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
