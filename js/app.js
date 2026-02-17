// Imports
import { groceryItems } from "./data.js";
import { createItems } from "./items.js";
import { createForm } from "./form.js";

// Constants
const STORAGE_KEY = "grocery-items";

// State
let items = groceryItems;
let editId = null;


// ======================
// Utility Functions
// ======================

// Generate unique ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}


// ======================
// Local Storage Functions
// ======================

function loadItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return groceryItems;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : groceryItems;
  } catch (error) {
    return groceryItems;
  }
}

function saveItems() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function getLocalStorage() {
  const list = localStorage.getItem("grocery-list");
  if (list) {
    return JSON.parse(list);
  }
  return [];
}

function setLocalStorage(itemsArray) {
  localStorage.setItem("grocery-list", JSON.stringify(itemsArray));
}


// ======================
// Core Functions
// ======================

// Add Item
export function addItem(itemName) {
  const newItem = {
    name: itemName,
    completed: false,
    id: generateId(),
  };

  items = [...items, newItem];
  setLocalStorage(items);
  render();

  setTimeout(() => alert("Item Added Successfully!"), 0);
}

// Edit Completed
export function editCompleted(id) {
  items = items.map((item) => {
    if (item.id === id) {
      return { ...item, completed: !item.completed };
    }
    return item;
  });

  setLocalStorage(items);
  render();
}

// Delete Item
export function deleteItem(id) {
  items = items.filter((item) => item.id !== id);

  setLocalStorage(items);
  render();

  setTimeout(() => {
    alert("Item deleted successfully!");
  }, 0);
}

// Update Item Name
export function updateItemName(newName) {
  items = items.map((item) => {
    if (item.id === editId) {
      return { ...item, name: newName };
    }
    return item;
  });

  editId = null;
  setLocalStorage(items);
  render();

  setTimeout(() => alert("Item Updated Successfully!"), 0);
}

// Set Edit ID
export function setEditId(itemId) {
  editId = itemId;
  render();

  setTimeout(() => {
    const input = document.querySelector(".form-input");
    if (input) {
      input.focus();
    }
  }, 0);
}


// ======================
// Render Function
// ======================

function render() {
  const app = document.getElementById("app");
  app.innerHTML = " ";

  const formElement = createForm(
    editId,
    editId ? items.find((item) => item.id === editId) : null
  );

  const itemsElement = createItems(items);

  app.append(formElement);
  app.append(itemsElement);
}


// Initial Render
render();
