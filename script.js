let items = [];

// generate invoice number + date
document.getElementById("invoiceNo").innerText = Math.floor(Math.random() * 100000);
document.getElementById("date").innerText = new Date().toLocaleDateString();

// load saved data
if (localStorage.getItem("billItems")) {
  items = JSON.parse(localStorage.getItem("billItems"));
  renderTable();
}

function addItem() {
  const name = document.getElementById("name").value;
  const price = parseFloat(document.getElementById("price").value);
  const qty = parseInt(document.getElementById("qty").value);

  if (!name || price <= 0 || qty <= 0) {
    alert("Enter valid data!");
    return;
  }

  const item = {
    name,
    price,
    qty,
    total: price * qty
  };

  items.push(item);
  saveData();
  renderTable();

  // clear inputs
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("qty").value = "";
}

function renderTable() {
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";

  items.forEach((item, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.price}</td>
      <td>${item.qty}</td>
      <td>${item.total}</td>
      <td><button class="delete-btn" onclick="deleteItem(${index})">Delete</button></td>
    `;

    tbody.appendChild(row);
  });

  calculateTotal();
}

function deleteItem(index) {
  items.splice(index, 1);
  saveData();
  renderTable();
}

function calculateTotal() {
  let subtotal = items.reduce((sum, item) => sum + item.total, 0);
  let tax = subtotal * 0.10;
  let discount = parseFloat(document.getElementById("discount").value) || 0;

  let grandTotal = subtotal + tax - discount;

  document.getElementById("subtotal").innerText = subtotal.toFixed(2);
  document.getElementById("tax").innerText = tax.toFixed(2);
  document.getElementById("grandTotal").innerText = grandTotal.toFixed(2);
}

function saveData() {
  localStorage.setItem("billItems", JSON.stringify(items));
}

function printInvoice() {
  window.print();
}