const API_URL = "http://localhost:8088/orders";

let state = {
  items: [],
  query: "",
  sort: "price",
  orderAsc: true,     
  limit: 0,           
  offset: 0
};

function toggleMainPage() {
  document.getElementById("main_page").style.display = "grid";
  document.getElementById("create_page").style.display = "none";
  document.getElementById("edit_page").style.display = "none";
}
function toggleCreatePage() {
  document.getElementById("main_page").style.display = "none";
  document.getElementById("create_page").style.display = "block";
  document.getElementById("edit_page").style.display = "none";
}
function toggleEditPage() {
  document.getElementById("main_page").style.display = "none";
  document.getElementById("create_page").style.display = "none";
  document.getElementById("edit_page").style.display = "block";
}

function toggleEmptyState(hasItems) {
  const empty = document.getElementById("empty_state");
  if (empty) empty.style.display = hasItems ? "none" : "block";
}

async function fetchPerfumes() {
  const params = new URLSearchParams();

  if (state.query?.trim()) params.set("q", state.query.trim());
  if (state.sort) params.set("sort", state.sort);
  params.set("order", state.orderAsc ? "asc" : "desc");
  if (state.limit && Number(state.limit) > 0) {
    params.set("limit", String(Number(state.limit)));
    params.set("offset", String(Math.max(0, Number(state.offset) || 0)));
  }

  const url = `${API_URL}${params.toString() ? "?" + params.toString() : ""}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
    state.items = await res.json();
    renderList(state.items);
  } catch (err) {
    console.error("Error fetching perfumes:", err);
    state.items = [];
    renderList([]);
  }
}

function renderList(list) {
  const container = document.getElementById("orders_list");
  container.innerHTML = "";
  if (!list || list.length === 0) {
    toggleEmptyState(false);
    return;
  }
  toggleEmptyState(true);

  list.forEach((p) => {
    const li = document.createElement("li");
    li.className = "perfume-card";
    li.innerHTML = `
      <img src="img/cardphoto.png" alt="${p.parfume_name}">
      <h4>${p.parfume_name}</h4>
      <p><b>Notes:</b> ${p.Volume}</p>
      <p><b>Brand:</b> ${p.brand}</p>
      <p><b>Release date:</b> ${p.order_date}</p>
      <p class="price"><b>Price:</b> $${p.price}</p>
      <div class="buttons">
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
      </div>
    `;
    li.querySelector(".edit").addEventListener("click", () => editPerfume(p.id));
    li.querySelector(".delete").addEventListener("click", () => deletePerfume(p.id));
    container.appendChild(li);
  });
}

document.getElementById("add_form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const newPerfume = {
    parfume_name: document.getElementById("parfume_name_input").value.trim(),
    Volume: document.getElementById("Volume_input").value.trim(),
    brand: document.getElementById("brand_input").value.trim(),
    order_date: document.getElementById("order_date_input").value,
    price: Number(document.getElementById("price_input").value),
  };

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPerfume),
  });

  if (!res.ok) {
    alert("Create failed");
    return;
  }

  toggleMainPage();
  document.getElementById("add_form").reset();
  await fetchPerfumes();
});

async function deletePerfume(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) {
    alert("Delete failed");
    return;
  }
  await fetchPerfumes();
}

let editingId = null;
function editPerfume(id) {
  const p = state.items.find((x) => x.id === id);
  if (!p) return;
  editingId = id;
  toggleEditPage();

  document.getElementById("edit_parfume_name_input").value = p.parfume_name;
  document.getElementById("edit_Volume_input").value = p.Volume;
  document.getElementById("edit_brand_input").value = p.brand;
  document.getElementById("edit_order_date_input").value = p.order_date;
  document.getElementById("edit_price_input").value = p.price;
}

document.getElementById("edit_form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const updated = {
    parfume_name: document.getElementById("edit_parfume_name_input").value.trim(),
    Volume: document.getElementById("edit_Volume_input").value.trim(),
    brand: document.getElementById("edit_brand_input").value.trim(),
    order_date: document.getElementById("edit_order_date_input").value,
    price: Number(document.getElementById("edit_price_input").value),
  };

  const res = await fetch(`${API_URL}/${editingId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updated),
  });

  if (!res.ok) {
    alert("Update failed");
    return;
  }

  toggleMainPage();
  await fetchPerfumes();
});

document.getElementById("sort_objects").addEventListener("change", () => {
  state.orderAsc = document.getElementById("sort_objects").checked;
  fetchPerfumes();
});

document.getElementById("search_btn").addEventListener("click", () => {
  state.query = document.getElementById("input_search").value || "";
  fetchPerfumes();
});

document.getElementById("cancel_search_btn").addEventListener("click", () => {
  state.query = "";
  const input = document.getElementById("input_search");
  if (input) input.value = "";
  state.offset = 0;
  fetchPerfumes();
});


toggleMainPage();
fetchPerfumes();
