var PRODUCTO = {
  id: "isbn-9789560000001",
  title: "El Valle de los Caballos",
  author: "Jean M. Auel",
  description: "La inteligencia y la curiosidad de Ayla la impulsan a seguir su propio camino.",
  price: 12990,
  image: "https://www.lachilenalibros.cl/4152-large_default/el-valle-de-los-caballos.jpg"
};

function renderProduct(p) {
  var img = document.getElementById("book-image");
  var t   = document.getElementById("book-title");
  var a   = document.getElementById("book-author");
  var d   = document.getElementById("book-desc");
  var pr  = document.getElementById("book-price");

  if (img) img.src = p.image;
  if (t)   t.textContent = p.title;
  if (a)   a.textContent = p.author;
  if (d)   d.textContent = p.description;
  if (pr)  pr.textContent = formatCLP(p.price);
}

document.addEventListener("DOMContentLoaded", function(){
  renderProduct(PRODUCTO);

  var minus = document.getElementById("qty-minus");
  var plus  = document.getElementById("qty-plus");
  var qtyEl = document.getElementById("qty");
  var btn   = document.getElementById("btn-add");

  if (minus) minus.addEventListener("click", function(){
    qtyEl.value = Math.max(1, parseInt(qtyEl.value||"1",10) - 1);
  });
  if (plus) plus.addEventListener("click", function(){
    qtyEl.value = Math.max(1, parseInt(qtyEl.value||"1",10) + 1);
  });
  if (btn) btn.addEventListener("click", function(){
    var q = Math.max(1, parseInt(qtyEl.value||"1",10));
    addToCart({
      id: PRODUCTO.id,
      title: PRODUCTO.title,
      author: PRODUCTO.author,
      price: PRODUCTO.price,
      image: PRODUCTO.image,
      qty: q
    });
    btn.disabled = true; btn.textContent = "Agregado ✓";
    setTimeout(function(){ btn.disabled = false; btn.textContent = "Agregar al carrito"; }, 900);
  });
});
