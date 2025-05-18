let cart = [];

const quantityInput = document.querySelector('.quantity-input') || document.getElementById('quantity');

function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  if (!cartCount) return;
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
}

function displayCart() {
  const cartItemsList = document.getElementById('cart-items');
  const totalPrice = document.getElementById('total-price');
  if (!cartItemsList || !totalPrice) return;

  cartItemsList.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const li = document.createElement('li');
    li.textContent = `${item.name} - ₹${item.price} × ${item.quantity} = ₹${itemTotal}`;
    cartItemsList.appendChild(li);
  });

  totalPrice.textContent = `Total: ₹${total}`;
}

document.querySelector('.add-cart').addEventListener('click', function (event) {
  event.preventDefault();
  const quantity = parseInt(quantityInput?.value) || 1;

  const product = {
    name: "Avocado Night Cream",
    price: 249,
    quantity: quantity
  };

  const existing = cart.find(item => item.name === product.name);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push(product);
  }

  updateCartCount();
  displayCart();
  alert(`${quantity} x ${product.name} added to cart!`);
});

document.querySelector('.buy-now').addEventListener('click', function (event) {
  event.preventDefault();
  const quantity = parseInt(quantityInput?.value) || 1;

  const product = {
    name: "Avocado Night Cream",
    price: 249,
    quantity: quantity
  };

  alert(`Proceeding to buy ${quantity} x ${product.name} for ₹${product.price * quantity}`);
  // Here you can integrate payment gateway logic next
});

document.getElementById('open-cart')?.addEventListener('click', function () {
  displayCart();
  document.getElementById('cart-modal').style.display = 'flex';
  document.getElementById('cart-overlay').style.display = 'block';
});

document.getElementById('close-cart')?.addEventListener('click', function () {
  document.getElementById('cart-modal').style.display = 'none';
  document.getElementById('cart-overlay').style.display = 'none';
});

document.getElementById('checkout-btn')?.addEventListener('click', function () {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let summary = "You are buying:\n\n";
  let total = 0;

  cart.forEach(item => {
    summary += `${item.quantity} x ${item.name} = ₹${item.quantity * item.price}\n`;
    total += item.quantity * item.price;
  });

  summary += `\nTotal: ₹${total}`;
  alert(summary);
  // Add your checkout/payment logic here
});

