function renderCart() {
  var body   = document.getElementById("cart-body");
  var totals = document.getElementById("cart-totals");
  var empty  = document.getElementById("cart-empty");
  var cart   = getCart();

  body.innerHTML = "";
  if (cart.length === 0) {
    empty.classList.remove("d-none");
    totals.classList.add("d-none");
    updateCartBadge();
    return;
  }
  empty.classList.add("d-none");
  totals.classList.remove("d-none");

  cart.forEach(function(item){
    var tr = document.createElement("tr");
    tr.innerHTML = `
      <td><img src="${item.image}" alt="" style="width:64px;height:64px;object-fit:cover;border-radius:.375rem"></td>
      <td><strong>${item.title}</strong><div class="text-muted small">${item.author||""}</div></td>
      <td>${formatCLP(item.price)}</td>
      <td>
        <div class="d-flex align-items-center">
          <button class="btn btn-sm btn-outline-secondary" data-act="minus" data-id="${item.id}">−</button>
          <input class="form-control mx-2" data-id="${item.id}" type="number" min="1" value="${item.qty}" style="width:80px">
          <button class="btn btn-sm btn-outline-secondary" data-act="plus" data-id="${item.id}">+</button>
        </div>
      </td>
      <td class="fw-semibold">${formatCLP(item.price * item.qty)}</td>
      <td><button class="btn btn-sm btn-outline-danger" data-act="remove" data-id="${item.id}">Eliminar</button></td>
    `;
    body.appendChild(tr);
  });

  document.getElementById("total").textContent = formatCLP(cartTotal());
  updateCartBadge();
}

document.addEventListener("DOMContentLoaded", function(){
  renderCart();

  document.getElementById("cart-body").addEventListener("click", function(e){
    var act = e.target.getAttribute("data-act");
    if (!act) return;
    var id = e.target.getAttribute("data-id");
    var cart = getCart();
    var item = cart.find(function(x){ return x.id === id; });
    if (!item) return;

    if (act === "remove") removeFromCart(id);
    if (act === "minus") setQty(id, Math.max(1, item.qty - 1));
    if (act === "plus")  setQty(id, item.qty + 1);

    renderCart();
  });

  document.getElementById("cart-body").addEventListener("change", function(e){
    if (!e.target.matches('input[type="number"][data-id]')) return;
    var id = e.target.getAttribute("data-id");
    var val = Math.max(1, parseInt(e.target.value||"1",10));
    setQty(id, val);
    renderCart();
  });

  
  document.getElementById("btn-empty").addEventListener("click", function(){
    saveCart([]);
    renderCart();
  });
  document.getElementById("btn-checkout").addEventListener("click", function(){
    alert("Demo: aquí iría tu flujo de pago.");
  });
});
