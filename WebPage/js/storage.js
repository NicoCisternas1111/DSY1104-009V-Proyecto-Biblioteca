// js/storage.js
var CART_KEY = "cart_v1";

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}
function saveCart(cart) { localStorage.setItem(CART_KEY, JSON.stringify(cart)); }

function addToCart(item) {
  var cart = getCart();
  var found = cart.find(function(x){ return x.id === item.id; });
  if (found) found.qty += item.qty; else cart.push(item);
  saveCart(cart);
  updateCartBadge();
}

function setQty(id, qty) {
  var cart = getCart();
  var it = cart.find(function(x){ return x.id === id; });
  if (!it) return;
  it.qty = Math.max(1, qty|0);
  saveCart(cart);
  updateCartBadge();
}

function removeFromCart(id) {
  saveCart(getCart().filter(function(x){ return x.id !== id; }));
  updateCartBadge();
}

function cartTotal() {
  return getCart().reduce(function(s,i){ return s + i.price * i.qty; }, 0);
}

function formatCLP(v) {
  return new Intl.NumberFormat('es-CL',{ style:'currency', currency:'CLP', maximumFractionDigits:0 }).format(v);
}

// Badge (numerito en navbar)
function updateCartBadge() {
  var badge = document.querySelector("[data-cart-badge]");
  if (!badge) return;
  var count = getCart().reduce(function(s,i){ return s + (i.qty||0); }, 0);
  badge.textContent = count > 99 ? "99+" : String(count);
  badge.classList.toggle("d-none", count === 0);
}

document.addEventListener("DOMContentLoaded", updateCartBadge);