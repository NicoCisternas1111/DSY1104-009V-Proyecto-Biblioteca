function parseCLPFromText(text) {
  if (!text) return 0;
  const onlyDigits = text.replace(/[^0-9]/g, ""); // quita $, puntos, espacios
  return parseInt(onlyDigits || "0", 10);
}

document.addEventListener("click", function (e) {
  const btn = e.target.closest(".btn-add-home");
  if (!btn) return;

  e.preventDefault();

  const card = btn.closest(".card");
  const id     = btn.dataset.id     || ("id-" + Math.random().toString(36).slice(2));
  const title  = btn.dataset.title  || card?.querySelector(".card-title")?.textContent?.trim() || "Producto";
  const author = btn.dataset.author || ""; // agrega un nodo .card-text-author si quieres
  const image  = btn.dataset.image  || card?.querySelector("img")?.src || "";
  let price    = 0;

  if (btn.dataset.price) {
    price = parseInt(btn.dataset.price, 10) || 0;
  } else {
    const priceText = card?.querySelector("h6, .price, .card-subtitle")?.textContent || "";
    price = parseCLPFromText(priceText);
  }

  addToCart({ id, title, author, price, image, qty: 1 });

  const original = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<i class="bi bi-check2"></i> Agregado';
  setTimeout(() => { btn.disabled = false; btn.innerHTML = original; }, 900);
});