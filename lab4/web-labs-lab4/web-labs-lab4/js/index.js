const object_container = document.getElementById("orders_list");
const input_search = document.getElementById("input_search");
const count_price = document.getElementById("count_price");

const add_button = document.getElementById("submit_btn");
const search_button = document.getElementById("search_btn");
const cancel_button = document.getElementById("cancel_search_btn");
const sort_button = document.getElementById("sort_objects");
const count_price_btn = document.getElementById("count_price_btn");
const edit_btn = document.getElementById("edit_btn");

const mainPage = document.getElementById("main_page");
const createPage = document.getElementById("create_page");
const editPage = document.getElementById("edit_page");

const CLOSE_CLASSNAME = "close";
const OPEN_CLASSNAME = "open";

const parfume_name_input = document.getElementById("parfume_name_input");
const Volume_input = document.getElementById("Volume_input");
const brand_input = document.getElementById("brand_input");
const order_date_input = document.getElementById("order_date_input");
const price_input = document.getElementById("price_input");

const edit_parfume_name_input = document.getElementById("edit_parfume_name_input");
const edit_Volume_input = document.getElementById("edit_Volume_input");
const edit_brand_input = document.getElementById("edit_brand_input") || document.querySelector("#edit_form #brand_input");
const edit_order_date_input = document.getElementById("edit_order_date_input");
const edit_price_input = document.getElementById("edit_price_input");

let objects = [
  { id: 1, parfume_name: "Giorgio Armani Sì", Volume: "50 ml",  brand: "Armani",        order_date: "2024-12-25", price: "200" },
  { id: 2, parfume_name: "Yves Saint Laurent Libre", Volume: "40 ml",  brand: "YSL",           order_date: "2024-11-30", price: "400" },
  { id: 3, parfume_name: "Roberto Cavalli Eau de Parfum", Volume: "60 ml",  brand: "Cavalli",       order_date: "2024-10-05", price: "700" },
  { id: 4, parfume_name: "Jo Malone Peony & Blush Suede", Volume: "100 ml", brand: "Jo Malone",     order_date: "2024-09-18", price: "1000" },
  { id: 5, parfume_name: "Jo Malone Peony & Laguna", Volume: "150 ml", brand: "Jo Malone",     order_date: "2024-09-18", price: "500" }
];

let current_objects = objects.slice();
let id = Math.max(...objects.map(o => o.id), 0) + 1;
let currentId = -1;


const object_template = ({ id, parfume_name, Volume, brand, order_date, price }) => `
<li id="${id}" class="item">
  <div class="card">
    <h4 class="card-type">Name: ${parfume_name}</h4>
    <h4 class="card-price">Volume: ${Volume}</h4>
    <h4 class="card-brand">Brand: ${brand}</h4>
    <h4 class="card-production-date">Date: ${order_date}</h4>
    <h4 class="card-production-date">Price: ${price}$</h4>
    <div class="block_btn">
      <button id="edit_btn${id}" type="button" class="btn-primary btn_card" onclick="clickEdit(${id})">Edit</button>
      <button type="button" class="btn_card_cansel" onclick="clickDelete(${id})">Delete</button>
    </div>
  </div>
</li>`;

const object_count_template = (count) => `<h4>${count}$</h4>`;

const add_object_to_page = (obj) => {
  object_container.insertAdjacentHTML("beforeend", object_template(obj));
};

const object_list_search = (list) => {
  object_container.innerHTML = "";
  current_objects = list;
  for (const obj of list) add_object_to_page(obj);
};

const add_count_price = (sum) => {
  count_price.innerHTML = "";
  count_price.insertAdjacentHTML("beforeend", object_count_template(sum));
};

function toggleMainPage() {
  mainPage.classList.remove(CLOSE_CLASSNAME);
  createPage.classList.remove(OPEN_CLASSNAME);
  editPage.classList.remove(OPEN_CLASSNAME);
}

function toggleCreatePage() {
  mainPage.classList.add(CLOSE_CLASSNAME);
  createPage.classList.add(OPEN_CLASSNAME);
  editPage.classList.remove(OPEN_CLASSNAME);
}

function toggleEdit() {
  mainPage.classList.add(CLOSE_CLASSNAME);
  createPage.classList.remove(OPEN_CLASSNAME);
  editPage.classList.add(OPEN_CLASSNAME);
}

window.toggleMainPage = toggleMainPage;
window.toggleCreatePage = toggleCreatePage;

const getValues = () => ({
  parfume_name: parfume_name_input.value.trim(),
  Volume: Volume_input.value.trim(),
  brand: brand_input.value.trim(),
  order_date: order_date_input.value,
  price: price_input.value.trim(),
});

const getEditValues = () => ({
  parfume_name: edit_parfume_name_input.value.trim(),
  Volume: edit_Volume_input.value.trim(),
  brand: edit_brand_input ? edit_brand_input.value.trim() : "",
  order_date: edit_order_date_input.value,
  price: edit_price_input.value.trim(),
});

const add_object = ({ parfume_name, Volume, brand, order_date, price }) => {
  const new_object = { id, parfume_name, Volume, brand, order_date, price };
  id += 1;
  objects.push(new_object);
  object_list_search(objects);
};

add_button.addEventListener("click", (e) => {
  e.preventDefault();
  const v = getValues();
  if (!v.parfume_name || !v.Volume || !v.brand || !v.order_date || !v.price) {
    alert("The fields must not be empty!");
    return;
  }
  if (Number(v.price) <= 0) {
    alert("The price must be positive!");
    return;
  }
  add_object(v);
  parfume_name_input.value = "";
  Volume_input.value = "";
  brand_input.value = "";
  order_date_input.value = "";
  price_input.value = "";
  toggleMainPage();
});

search_button.addEventListener("click", () => {
  const q = input_search.value.toLowerCase().trim();
  const list = objects.filter(o => o.parfume_name.toLowerCase().includes(q));
  object_list_search(list);
});

cancel_button.addEventListener("click", () => {
  input_search.value = "";
  object_list_search(objects);
});

sort_button.addEventListener("change", function () {
  if (this.checked) {
    const list = current_objects.slice().sort((a, b) => Number(a.price) - Number(b.price));
    object_container.innerHTML = "";
    for (const obj of list) add_object_to_page(obj);
  } else {
    object_list_search(current_objects);
  }
});

count_price_btn.addEventListener("click", () => {
  const sum = current_objects.reduce((acc, o) => acc + (Number(o.price) || 0), 0);
  add_count_price(sum);
});

edit_btn.addEventListener("click", (e) => {
  e.preventDefault();
  const v = getEditValues();
  if (!v.parfume_name || !v.Volume || !v.brand || !v.order_date || !v.price) {
    alert("The fields must not be empty!");
    return;
  }
  if (Number(v.price) <= 0) {
    alert("The price must be positive!");
    return;
  }
  const obj = objects.find(o => o.id === currentId);
  if (!obj) return;
  obj.parfume_name = v.parfume_name;
  obj.Volume = v.Volume;
  obj.brand = v.brand;
  obj.order_date = v.order_date;
  obj.price = v.price;
  object_list_search(objects);
  toggleMainPage();
});

function clickEdit(idToEdit) {
  currentId = idToEdit;
  const obj = objects.find(o => o.id === currentId);
  if (!obj) return;
  edit_parfume_name_input.value = obj.parfume_name;
  edit_Volume_input.value = obj.Volume;
  if (edit_brand_input) edit_brand_input.value = obj.brand;
  edit_order_date_input.value = obj.order_date;
  edit_price_input.value = obj.price;
  toggleEdit();
}

function clickDelete(idToDelete) {
  const idx = objects.findIndex(o => o.id === idToDelete);
  if (idx > -1) {
    objects.splice(idx, 1);
    object_list_search(objects);
  }
}

window.clickEdit = clickEdit;
window.clickDelete = clickDelete;

document.addEventListener("DOMContentLoaded", () => {
  object_list_search(objects);
});
