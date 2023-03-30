const form = document.querySelector(".form");
const nameInput = document.querySelector("#name");
const price = document.querySelector("#price");
const itemId = document.querySelector("#itemId");
const list = document.querySelector(".item__List");
const totalBox = document.querySelector(".total__box");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!nameInput.value || !price.value) {
    alert("Malumot kiriting");
  } else if (itemId.value) {
    item = JSON.parse(localStorage.getItem(itemId.value));
    item.name = nameInput.value;
    item.price = price.value;
  } else {
    item = {
      name: nameInput.value,
      price: price.value,
    };

    itemId.value = `item ${Date.now()}`;
  }

  localStorage.setItem(itemId.value, JSON.stringify(item));

  form.reset();
  itemId.value = "";
  renderList();
});

function renderList() {
  list.innerHTML = "";
  let totalPrice = 0;

  for (const key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      const item = JSON.parse(localStorage.getItem(key));

      const li = document.createElement("li");
      li.classList.add("item");

      const itemBox = document.createElement("div");
      itemBox.classList.add("item__box");
      itemBox.innerHTML = `<span>${item.name}</span>  <span>${item.price}</span>`;

      const groupBtn = document.createElement("div");
      groupBtn.classList.add("group__btn");

      const editBtn = document.createElement("button");
      editBtn.classList.add("edit__btn");
      editBtn.textContent = `edit`;

      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("delete__btn");
      deleteBtn.textContent = `Delete`;

      groupBtn.appendChild(editBtn);
      groupBtn.appendChild(deleteBtn);
      li.appendChild(itemBox);
      li.appendChild(groupBtn);
      list.appendChild(li);

      editBtn.addEventListener("click", () => {
        nameInput.value = item.name;
        price.value = item.price;
        itemId.value = key;
      });

      itemBox.addEventListener("click", () => {
        itemBox.classList.toggle("line");
      });

      deleteBtn.addEventListener("click", () => {
        localStorage.removeItem(key);
        renderList();
      });
      totalPrice += Number(item.price);
    }
  }

  const totalItem = document.createElement("h4");
  totalItem.classList.add("total-title");
  totalItem.innerHTML = `Total: ${totalPrice} $`;

  console.log(totalItem);

  list.appendChild(totalItem);
}

renderList();
