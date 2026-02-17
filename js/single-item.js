import { editCompleted, deleteItem, setEditId } from "./app.js";

// Create SingleItem Element
export function createSingleItem(item) {
  const div = document.createElement("div");
  div.className = "single-item";

  div.innerHTML = `
    <input type="checkbox" ${item.completed ? "checked" : ""} />
    <p style="text-decoration: ${item.completed ? "line-through" : "none"}">
      ${item.name}
    </p>
    <button class="btn icon-btn edit-btn" type="button">
      <i class="fa-regular fa-pen-to-square"></i>
    </button>
    <button class="btn icon-btn remove-btn" type="button">
      <i class="fa-regular fa-trash-can"></i>
    </button>
  `;

  //  event listener for checkbox
  const checkbox = div.querySelector("input[type='checkbox']");
  checkbox.addEventListener("change", () => editCompleted(item.id));

  //event listener for delete button

  const removeBtn = div.querySelector(".remove-btn");
  removeBtn.addEventListener("click", () => deleteItem(item.id));

  //event listener for the edit button
  const editBtn = div.querySelector(".edit-btn");
  editBtn.addEventListener("click", () => setEditId(item.id));

  return div;
}
