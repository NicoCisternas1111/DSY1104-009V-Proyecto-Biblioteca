// js/storage.js
const CART_KEY = "cart_v1";

export function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}

export function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.dispatchEvent(new Event('storage')); // Dispara un evento para que el header se actualice
}


export function addToCart(item) {
  let cart = getCart();
  const found = cart.find(x => x.id === item.id);
  if (found) {
    found.qty = (found.qty || 0) + item.qty;
  } else {
    cart.push(item);
  }
  saveCart(cart);
}

export function setQty(id, qty) {
  let cart = getCart();
  const it = cart.find(x => x.id === id);
  if (!it) return;
  it.qty = Math.max(1, qty | 0);
  saveCart(cart);
}

export function removeFromCart(id) {
  saveCart(getCart().filter(x => x.id !== id));
}

export function cartTotal() {
  return getCart().reduce((s, i) => s + i.price * i.qty, 0);
}

export function formatCLP(v) {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(v);
}