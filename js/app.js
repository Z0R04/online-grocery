import { groceryItems } from "./data.js";
import { createItems } from "./items.js";

let items = groceryItems;

// Render App
function render() {
  const app = document.getElementById("app");
  app.innerHTML = "";

  const itemsElement = createItems(items);
  app.appendChild(itemsElement);
}
render();

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
